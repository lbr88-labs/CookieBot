const assert = require('assert');
const fs = require('fs');
const Module = require('module');
const path = require('path');
const ts = require('typescript');

require.extensions['.ts'] = (loadedModule, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;
  loadedModule._compile(output, filename);
};

const { AscensionManager } = require('../src/modules/AscensionManager.ts');

function loadAutoPlayForLoopTests() {
  const filename = path.resolve(__dirname, '../src/AutoPlay.ts');
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;
  const loadedModule = new Module(filename, module);
  loadedModule.filename = filename;
  loadedModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalLoad = Module._load;

  Module._load = function(request, parent, isMain) {
    if (parent === loadedModule && request.startsWith('./')) {
      return new Proxy({}, { get: () => class StubModule {} });
    }
    return originalLoad.call(this, request, parent, isMain);
  };

  try {
    loadedModule._compile(output, filename);
  } finally {
    Module._load = originalLoad;
  }
  return loadedModule.exports.default;
}

const AutoPlay = loadAutoPlayForLoopTests();
const delayedCallbacks = [];
const originalSetTimeout = global.setTimeout;
global.setTimeout = (callback) => {
  delayedCallbacks.push(callback);
  return delayedCallbacks.length;
};

function makeGame() {
  const calls = {
    closePrompt: 0,
    confirmPrompt: 0,
    modePick: 0,
    reincarnate: 0,
    reset: 0,
    ascend: 0,
    upgradeBuys: 0,
    clicks: 0,
    goldenCookies: 0,
    slowLogic: 0
  };
  const upgrades = {};
  for (let id = 264; id <= 268; id++) {
    upgrades[id] = { bought: 0, canBePurchased: false };
  }
  upgrades[363] = {
    bought: 0,
    canBePurchased: true,
    name: 'Synthetic heavenly upgrade',
    buy() {
      calls.upgradeBuys++;
      this.bought = 1;
      return true;
    }
  };
  const upgradesById = new Proxy(upgrades, {
    get(target, key) {
      if (key in target) return target[key];
      return { bought: 0, unlocked: false, canBePurchased: false };
    }
  });
  const achievements = [];
  achievements.Neverclick = { won: false };
  achievements.Hardcore = { won: false };
  achievements.Reincarnation = { won: false };

  const game = {
    calls,
    OnAscend: 1,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    promptOn: 1,
    ascensionMode: 0,
    prestige: 400,
    ascendMeterLevel: 20,
    ascendMeterPercent: 0.01,
    heavenlyChips: 0,
    resets: 10,
    startDate: Date.now(),
    fullDate: Date.now(),
    fps: 30,
    cookiesEarned: 0,
    cookieClicks: 100,
    UpgradesOwned: 100,
    Achievements: achievements,
    AchievementsById: new Proxy({}, {
      get(target, key) {
        if (!(key in target)) {
          target[key] = {
            id: Number(key),
            won: false,
            name: `Achievement ${key}`,
            ddesc: `Synthetic achievement ${key}`
          };
        }
        return target[key];
      }
    }),
    UpgradesById: upgradesById,
    ObjectsById: [],
    wrinklers: [],
    hasBuff: () => false,
    ClosePrompt() {
      calls.closePrompt++;
      this.promptOn = 0;
    },
    ConfirmPrompt() {
      calls.confirmPrompt++;
      this.promptOn = 0;
    },
    PickAscensionMode() {
      calls.modePick++;
    },
    AssignPermanentSlot() {},
    PutUpgradeInPermanentSlot() {},
    Reincarnate(quick) {
      assert.strictEqual(quick, true);
      calls.reincarnate++;
      this.OnAscend = 0;
      this.resets++;
      this.ReincarnateTimer = 3;
    },
    PlayerReincarnate() {
      this.OnAscend = 0;
      this.resets++;
      this.ReincarnateTimer = 3;
    },
    Reset() {
      calls.reset++;
    },
    Ascend(quick) {
      assert.strictEqual(quick, true);
      calls.ascend++;
      this.AscendTimer = 2;
    },
    sayTime: () => 'synthetic time',
    isMinigameReady: () => false,
    onMenu: false
  };
  return game;
}

function makeBot(game) {
  global.Game = game;
  const bot = Object.create(AutoPlay.prototype);
  bot.onAscend = false;
  bot.state = { delay: 0, nextAchievement: 1, moduleTimings: {} };
  Object.defineProperty(bot, 'delay', {
    configurable: true,
    get() { return this.state.delay; },
    set(value) { this.state.delay = value; }
  });
  bot.Config = { CheatLumps: 0, FPS: 0, NightMode: 0, HardcoreMode: 1 };
  bot.config = { cheatLumps: 0, autoSugarLumps: false, savingsEnabled: false, autoSeason: false, autoWrinklers: false };
  bot.configManager = { registerOption() {} };
  bot.clickManager = { handleClicking() { game.calls.clicks++; } };
  bot.goldenCookieHandler = { handleGoldenCookies() { game.calls.goldenCookies++; } };
  bot.sugarLumpManager = { handleSugarLumps() {} };
  bot.measureModule = (_name, callback) => callback();
  bot.scheduleNextRun = () => {};
  bot.updateTickStats = () => {};
  bot.runSlowLogic = () => { game.calls.slowLogic++; };
  bot.logStatus = (_module, message) => { (bot.statusMessages ||= []).push(message); };
  bot.logAction = () => {};
  bot.addActivity = () => {};
  bot.info = () => {};
  bot.assignSpirit = () => {};
  bot.setDeadline = (deadline) => { (bot.deadlines ||= []).push(deadline); };
  bot.findNextAchievement = () => { bot.findNextAchievementCalls = (bot.findNextAchievementCalls || 0) + 1; };
  bot.preNightMode = () => false;
  bot.endPhase = () => false;
  bot.mustRebornAscend = () => false;
  bot.plantPending = false;
  bot.now = Date.now();
  bot.mainActivity = '';
  bot.activities = '';
  bot.hyperActive = false;
  bot.wantAscend = false;
  bot.nextAchievement = 1;
  bot.workingOnSpecialAchievement = false;

  bot.ascensionManager = new AscensionManager(bot);
  return bot;
}

function runLoop(bot, loop) {
  if (loop === 'legacy') bot.periodic();
  else bot.hookLogic();
}

function runManualScreenTests(loop) {
  const game = makeGame();
  const bot = makeBot(game);
  bot.state.delay = 4;
  const originalDeadline = (bot.deadlines || []).length;
  const originalNow = bot.now;

  runLoop(bot, loop);
  runLoop(bot, loop);
  runLoop(bot, loop);

  assert.strictEqual(game.OnAscend, 1, `${loop}: manual screen remains open`);
  assert.strictEqual(game.promptOn, 1, `${loop}: prompt remains open`);
  assert.strictEqual(game.calls.closePrompt, 0, `${loop}: prompt was not closed`);
  assert.strictEqual(game.calls.upgradeBuys, 0, `${loop}: no heavenly upgrades were bought`);
  assert.strictEqual(game.calls.modePick, 0, `${loop}: no ascension mode was selected`);
  assert.strictEqual(game.calls.reincarnate, 0, `${loop}: no reincarnation was triggered`);
  assert.strictEqual(game.calls.reset, 0, `${loop}: game reset was not triggered`);
  assert.strictEqual(bot.findNextAchievementCalls || 0, 0, `${loop}: target was not reset`);
  assert.strictEqual((bot.deadlines || []).length, originalDeadline, `${loop}: deadline was not reset`);
  assert.strictEqual(bot.now, originalNow, `${loop}: run time was not reset`);
  assert.deepStrictEqual(bot.ascensionManager.getState().loggedAchievements, {}, `${loop}: achievement state was preserved`);
  assert.strictEqual(game.calls.clicks, 0, `${loop}: clicking paused on the screen`);
  assert.strictEqual(game.calls.goldenCookies, 0, `${loop}: golden-cookie actions paused on the screen`);
  assert.strictEqual(game.calls.slowLogic, 0, `${loop}: periodic modules paused on the screen`);
  assert.strictEqual(bot.state.delay, 4, `${loop}: manual screen does not consume bot delay state`);

  const status = bot.ascensionManager.getStatus();
  assert.strictEqual(status.status, 'waiting', `${loop}: status is waiting`);
  assert.match(status.currentAction, /Waiting for player/i, `${loop}: status says the bot is waiting for the player`);
  assert.strictEqual(bot.statusMessages.length, 1, `${loop}: manual wait status is not repeated every tick`);

  // A page/mod reload creates a fresh manager with no ownership marker.
  const reloadedBot = makeBot(game);
  runLoop(reloadedBot, loop);
  assert.strictEqual(game.OnAscend, 1, `${loop}: reload leaves the screen open`);
  assert.strictEqual(game.promptOn, 1, `${loop}: reload leaves the prompt open`);
  assert.strictEqual(game.calls.reincarnate, 0, `${loop}: reload does not restore bot ownership`);

  // The player's later reincarnation ends the wait; the bot refreshes its
  // transient target state after the run changes and then resumes normal loops.
  game.PlayerReincarnate();
  runLoop(reloadedBot, loop);
  assert.strictEqual(game.calls.clicks, 0, `${loop}: reincarnation animation still pauses automation`);
  game.ReincarnateTimer = 0;
  runLoop(reloadedBot, loop);
  assert.strictEqual(reloadedBot.findNextAchievementCalls, 1, `${loop}: player reincarnation refreshes the target once`);
  assert.strictEqual(game.calls.clicks, 1, `${loop}: normal clicking resumes after player reincarnation`);
}

function runAutomaticScreenTests(loop) {
  const game = makeGame();
  game.OnAscend = 0;
  game.promptOn = 0;
  const bot = makeBot(game);

  bot.ascensionManager.triggerAscend('synthetic automatic ascension', false);
  assert.strictEqual(game.calls.ascend, 1, `${loop}: Game.Ascend(true) is called once`);
  assert.strictEqual(bot.onAscend, true, `${loop}: ownership begins after Game.Ascend(true)`);

  // The active ascend timer prevents a repeated transition in either loop.
  runLoop(bot, loop);
  assert.strictEqual(game.calls.ascend, 1, `${loop}: active AscendTimer prevents a second ascent`);
  assert.strictEqual(game.calls.clicks, 0, `${loop}: automation pauses during the ascend timer`);

  game.AscendTimer = 0;
  game.OnAscend = 1;
  game.promptOn = 1;
  const initialDelay = bot.state.delay;
  runLoop(bot, loop);
  assert.strictEqual(bot.state.delay, initialDelay - 1, `${loop}: bot-owned screen preserves legacy delay`);
  assert.strictEqual(game.calls.reincarnate, 0, `${loop}: reincarnation waits for the existing delay`);

  while (bot.state.delay > 0) runLoop(bot, loop);
  runLoop(bot, loop);
  assert.strictEqual(game.calls.reincarnate, 1, `${loop}: bot-owned screen reincarnates once`);
  assert.strictEqual(game.calls.closePrompt, 1, `${loop}: bot-owned path may close its prompt`);
  assert.strictEqual(game.calls.upgradeBuys, 1, `${loop}: bot-owned path buys the available upgrade`);
  assert.strictEqual(game.calls.modePick, 1, `${loop}: bot-owned path preserves mode selection`);
  assert.strictEqual(bot.onAscend, false, `${loop}: ownership clears after reincarnation`);

  // The game may still be animating after its single reincarnation call.
  runLoop(bot, loop);
  runLoop(bot, loop);
  assert.strictEqual(game.calls.reincarnate, 1, `${loop}: ReincarnateTimer prevents a second call`);
  assert.strictEqual(game.calls.clicks, 0, `${loop}: automation stays paused during reincarnation`);

  game.ReincarnateTimer = 0;
  if (loop === 'legacy') {
    while (bot.state.delay > 0) runLoop(bot, loop);
  }
  runLoop(bot, loop);
  assert.strictEqual(game.calls.clicks, 1, `${loop}: automation resumes after bot reincarnation`);
}

function runOwnershipGuardTest() {
  const game = makeGame();
  game.OnAscend = 0;
  const bot = makeBot(game);
  bot.plantPending = true;

  bot.ascensionManager.triggerAscend('plant is pending', false);

  assert.strictEqual(bot.wantAscend, true, 'plant wait records intent');
  assert.strictEqual(bot.onAscend, false, 'wantAscend alone does not grant ownership');
  assert.strictEqual(game.calls.ascend, 0, 'plant wait does not invoke Game.Ascend');
}

try {
  for (const loop of ['legacy', 'native']) {
    runManualScreenTests(loop);
    runAutomaticScreenTests(loop);
  }
  runOwnershipGuardTest();
  console.log('Ascension ownership regressions passed (legacy timer and native hook).');
} finally {
  global.setTimeout = originalSetTimeout;
  delete global.Game;
}
