const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const ts = require('typescript');

const projectRoot = path.resolve(__dirname, '..');
const scratchRoot = process.env.PAPERCLIP_RUN_SCRATCH_DIR || os.tmpdir();
const outputDir = fs.mkdtempSync(path.join(scratchRoot, 'stock-market-cooldown-'));
const realDateNow = Date.now;
const previousGame = global.Game;
const previousWindow = global.window;
const previousLocalStorage = global.localStorage;
const fixedNow = 2_000_000_000_000;
const oneMinute = 60_000;

function createGame(startDate) {
  return {
    startDate,
    ascendMeterPercent: 0,
    Achievements: {},
    ObjectsById: [],
    minigameReadinessChecks: 0,
    isMinigameReady() {
      this.minigameReadinessChecks++;
      return false;
    }
  };
}

function compileSources() {
  const configPath = path.join(projectRoot, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));

  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, projectRoot);
  const options = {
    ...parsed.options,
    outDir: outputDir,
    noEmit: false,
    declaration: false,
    declarationMap: false,
    sourceMap: false,
    module: ts.ModuleKind.CommonJS
  };
  const program = ts.createProgram(parsed.fileNames, options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const result = program.emit();
  const allDiagnostics = diagnostics.concat(result.diagnostics);
  const errors = allDiagnostics.filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    throw new Error(errors.map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('\n'));
  }
}

function getAutoPlayClass() {
  const candidates = [
    path.join(outputDir, 'AutoPlay.js'),
    path.join(outputDir, 'src', 'AutoPlay.js')
  ];
  const modulePath = candidates.find(candidate => fs.existsSync(candidate));
  if (!modulePath) throw new Error('Compiled AutoPlay.js not found');
  return require(modulePath).default;
}

function assertWaitingForCooldown(bot) {
  const status = bot.stockMarketManager.getStatus();
  assert.strictEqual(status.status, 'waiting');
  assert.strictEqual(status.reason, 'Wait 1 hour after reincarnation before trading');
  return status;
}

function assertCooldownCleared(bot) {
  const status = bot.stockMarketManager.getStatus();
  assert.notStrictEqual(status.reason, 'Wait 1 hour after reincarnation before trading');
}

try {
  Date.now = () => fixedNow;
  global.window = {
    localStorage: {
      getItem() { return null; },
      setItem() {}
    }
  };
  global.localStorage = global.window.localStorage;

  compileSources();
  const AutoPlay = getAutoPlayClass();

  // Establish an already-aged game run before constructing a fresh bot.
  const agedStart = fixedNow - 61 * oneMinute;
  const agedGame = createGame(agedStart);
  global.Game = agedGame;
  const agedBot = new AutoPlay();
  assert.strictEqual(agedBot.resetTime, agedStart);
  assertCooldownCleared(agedBot);

  // The trading handler must pass the same cooldown gate used by status.
  const readinessChecksBeforeTrade = agedGame.minigameReadinessChecks;
  agedBot.stockMarketManager.handleStockMarket();
  assert.strictEqual(agedGame.minigameReadinessChecks, readinessChecksBeforeTrade + 1);

  // A recently started run keeps its remaining cooldown on a fresh bot.
  const recentGame = createGame(fixedNow - 5 * oneMinute);
  global.Game = recentGame;
  const recentBot = new AutoPlay();
  const recentStatus = assertWaitingForCooldown(recentBot);
  assert.strictEqual(recentStatus.details.Cooldown, '55m remaining');
  recentBot.stockMarketManager.handleStockMarket();
  assert.strictEqual(recentGame.minigameReadinessChecks, 0);

  // Game.startDate is read live, so reincarnation after construction updates both paths.
  global.Game = agedGame;
  agedGame.startDate = fixedNow - 10 * oneMinute;
  assert.strictEqual(agedBot.resetTime, agedGame.startDate);
  assertWaitingForCooldown(agedBot);
  const blockedReadinessChecks = agedGame.minigameReadinessChecks;
  agedBot.stockMarketManager.handleStockMarket();
  assert.strictEqual(agedGame.minigameReadinessChecks, blockedReadinessChecks);

  agedGame.startDate = agedStart;
  assertCooldownCleared(agedBot);
  const resumedReadinessChecks = agedGame.minigameReadinessChecks;
  agedBot.stockMarketManager.handleStockMarket();
  assert.strictEqual(agedGame.minigameReadinessChecks, resumedReadinessChecks + 1);

  // Missing, nonnumeric, nonfinite, nonpositive and future dates use the prior context fallback.
  const invalidGame = createGame(Number.NaN);
  global.Game = invalidGame;
  const fallbackBot = new AutoPlay();
  assert.strictEqual(fallbackBot.resetTime, fixedNow);
  fallbackBot.state.resetTime = agedStart;
  for (const invalidDate of [undefined, '2000-01-01', Number.NaN, 0, -1, fixedNow + 1]) {
    invalidGame.startDate = invalidDate;
    assert.strictEqual(fallbackBot.resetTime, agedStart);
  }
  assertCooldownCleared(fallbackBot);

  // The getter remains safe in a unit context where Game has not been defined.
  delete global.Game;
  const stateOnlyBot = Object.create(AutoPlay.prototype);
  stateOnlyBot.state = { resetTime: 0, now: agedStart };
  assert.strictEqual(stateOnlyBot.resetTime, agedStart);

  console.log('Stock market cooldown regression passed.');
} finally {
  Date.now = realDateNow;
  if (previousGame === undefined) delete global.Game;
  else global.Game = previousGame;
  if (previousWindow === undefined) delete global.window;
  else global.window = previousWindow;
  if (previousLocalStorage === undefined) delete global.localStorage;
  else global.localStorage = previousLocalStorage;
  fs.rmSync(outputDir, { recursive: true, force: true });
}
