const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'cookieAutoPlayBeta.js'), 'utf8');
const betaUrl = 'https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js';

function createHarness(options) {
  options = options || {};
  const calls = {
    closePrompt: 0,
    bakeryNamePrompt: 0,
    confirmPrompt: 0,
    tickerClicks: 0,
    findNextAchievement: 0,
    smallAchievementHandlers: 0,
    modePick: 0,
    reincarnate: 0,
    clicks: 0,
    goldenCookies: 0,
    justRight: 0,
    achievementsChecked: 0,
    achievementsFound: 0,
    upgradeBuys: 0,
    statuses: [],
    deadlineChanges: []
  };
  const storageCalls = { get: 0, set: 0, remove: 0 };
  const storage = {
    getItem() { storageCalls.get++; return null; },
    setItem() { storageCalls.set++; },
    removeItem() { storageCalls.remove++; }
  };
  const game = {
    ready: false,
    startDate: 1_000,
    fullDate: 2_000,
    resets: 7,
    ascendMeterPercent: 0,
    ascendMeterLevel: 500,
    prestige: 1_000,
    heavenlyChips: 0,
    cookiesPs: 1,
    unbuffedCps: 1,
    ascensionMode: 0,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    OnAscend: true,
    promptOn: 1,
    promptText: 'Player-owned prompt',
    bakeryName: options.prefixed ? 'Automated Synthetic bakery' : 'Synthetic bakery',
    bakeryNameL: { textContent: options.prefixed ? 'Automated Synthetic bakery' : 'Synthetic bakery' },
    onMenu: true,
    Achievements: {
      Hardcore: { won: true },
      Neverclick: { won: true }
    },
    Upgrades: { 'Lucky payout': { bought: true } },
    Notify() {},
    ClosePrompt() { calls.closePrompt++; this.promptOn = 0; },
    PickAscensionMode() { calls.modePick++; },
    bakeryNamePrompt() { calls.bakeryNamePrompt++; },
    ConfirmPrompt() { calls.confirmPrompt++; },
    tickerL: {
      click() { calls.tickerClicks++; },
      scrollIntoView() {}
    },
    hasBuff() { return false; },
    Reincarnate() {
      calls.reincarnate++;
      this.resets++;
      this.OnAscend = false;
      this.ReincarnateTimer = 2;
    }
  };
  const context = {
    Game: game,
    AutoPlay: {},
    window: { localStorage: storage },
    localStorageGet() { return null; },
    range(start, end) {
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    },
    setTimeout() { return 1; },
    setInterval() { return 1; },
    clearInterval() {},
    l() { return { innerHTML: '' }; },
    console,
    Date,
    Math,
    isFinite
  };
  vm.createContext(context);
  // Execute the shipped root payload, including its real run/ascension methods.
  vm.runInContext(source, context, { filename: 'cookieAutoPlayBeta.js', timeout: 2_000 });
  storageCalls.get = 0;
  storageCalls.set = 0;
  storageCalls.remove = 0;

  const bot = context.AutoPlay;
  bot.Config = { CheatLumps: 0, NightMode: 0 };
  bot.logStatus = (type, message) => calls.statuses.push({ type, message });
  bot.handleClicking = () => { calls.clicks++; };
  bot.handleGoldenCookies = () => { calls.goldenCookies++; };
  bot.runJustRight = () => { calls.justRight++; };
  bot.checkAchievements = () => { calls.achievementsChecked++; };
  bot.findNextAchievement = () => { calls.achievementsFound++; bot.nextAchievement = 470; };
  bot.buyHeavenlyUpgrades = () => { calls.upgradeBuys++; };
  bot.endPhase = () => false;
  bot.setDeadline = value => {
    calls.deadlineChanges.push(value);
    bot.deadline = value;
  };
  return { bot, game, calls, storageCalls };
}

function checkReadyReloadManualAscension() {
  const { bot, game, calls } = createHarness({ prefixed: true });
  const originalName = game.bakeryName;
  bot.nextAchievement = 470;
  bot.deadline = 123456789;
  game.promptOn = 1;

  // Simulate a saved manual ascension screen loading before the game becomes
  // ready, then exercise the real launch path after readiness.
  assert.strictEqual(game.bakeryName, originalName,
    'top-level initialization preserves the prefixed bakery name on manual screen');
  assert.strictEqual(calls.bakeryNamePrompt, 0,
    'top-level initialization does not open the bakery-name prompt');
  assert.strictEqual(calls.confirmPrompt, 0,
    'top-level initialization does not confirm the bakery-name prompt');

  const won = { won: true, pool: '', id: 999, ddesc: 'Already earned' };
  game.Achievements = new Proxy({
    'Tabloid addiction': { won: false, pool: '', id: 1, ddesc: 'Unfinished small achievement' }
  }, {
    get(target, key) { return Object.prototype.hasOwnProperty.call(target, key) ? target[key] : won; }
  });
  game.AchievementsById = new Proxy({ 0: won }, {
    get(target, key) { return Object.prototype.hasOwnProperty.call(target, key) ? target[key] : won; }
  });
  game.Upgrades = {};
  game.ready = true;
  game.version = bot.gameVersion;
  game.getDynamicTooltip = () => '';
  bot.Config = { CheatLumps: 0, NightMode: 0 };
  bot.info = () => {};
  bot.logStatus = () => {};
  bot.createDashboard = () => {};
  bot.updateDashboard = () => {};
  const findNextAchievement = bot.findNextAchievement;
  bot.findNextAchievement = function() {
    calls.findNextAchievement++;
    return findNextAchievement.apply(this, arguments);
  };
  const handleSmallAchievements = bot.handleSmallAchievements;
  bot.handleSmallAchievements = function() {
    calls.smallAchievementHandlers++;
    return handleSmallAchievements.apply(this, arguments);
  };

  bot.launch();
  bot.run();
  bot.run();

  assert.strictEqual(calls.findNextAchievement, 0,
    'ready launch defers target discovery on a restored manual screen');
  assert.strictEqual(calls.smallAchievementHandlers, 0,
    'unfinished small achievements are not handled on manual screen');
  assert.strictEqual(calls.tickerClicks, 0, 'manual startup does not click the ticker');
  assert.strictEqual(calls.bakeryNamePrompt, 0, 'manual startup does not open prompts');
  assert.strictEqual(calls.confirmPrompt, 0, 'manual startup does not confirm prompts');
  assert.strictEqual(game.bakeryName, originalName, 'manual startup preserves bakery name');
  assert.strictEqual(game.promptOn, 1, 'manual startup leaves the prompt open');
  assert.strictEqual(bot.nextAchievement, 470, 'manual startup preserves the target');
  assert.strictEqual(bot.deadline, 123456789, 'manual startup preserves the deadline');
}

function checkManualScreenAndReload() {
  const first = createHarness();
  const { bot, game, calls, storageCalls } = first;
  bot.nextAchievement = 470;
  bot.deadline = 123456789;
  bot.delay = 4;
  game.promptOn = 1;

  game.AscendTimer = 2;
  bot.run();
  assert.strictEqual(bot.delay, 4, 'ascension timer pauses without consuming bot delay');
  assert.strictEqual(game.promptOn, 1, 'timer pause leaves player prompt open');
  game.AscendTimer = 0;

  for (let tick = 0; tick < 3; tick++) bot.run();
  assert.strictEqual(game.OnAscend, true, 'manual screen remains open across ticks');
  assert.strictEqual(game.promptOn, 1, 'manual prompt remains open');
  assert.strictEqual(calls.closePrompt, 0, 'manual prompt is never closed');
  assert.strictEqual(calls.reincarnate, 0, 'manual screen is never reincarnated by the bot');
  assert.strictEqual(calls.modePick, 0, 'manual ascension mode is unchanged');
  assert.strictEqual(calls.upgradeBuys, 0, 'manual heavenly upgrades are unchanged');
  assert.strictEqual(calls.clicks, 0, 'no cookie clicks run on the manual screen');
  assert.strictEqual(calls.goldenCookies, 0, 'no golden-cookie actions run on the manual screen');
  assert.strictEqual(calls.achievementsChecked, 0, 'manual route does not change achievement target');
  assert.strictEqual(bot.nextAchievement, 470, 'manual route leaves the target unchanged');
  assert.strictEqual(bot.deadline, 123456789, 'manual route leaves the deadline unchanged');
  assert.strictEqual(bot.delay, 4, 'manual route leaves unrelated bot delay unchanged');
  assert.strictEqual(calls.deadlineChanges.length, 0, 'manual route does not reset the deadline');
  assert.strictEqual(storageCalls.get + storageCalls.set + storageCalls.remove, 0,
    'manual route does not inspect or modify persisted intent');
  assert.strictEqual(calls.statuses.length, 1, 'manual waiting status is reported once');
  assert.match(calls.statuses[0].message, /Waiting for the player/);

  // A fresh load loses the transient ownership marker and safely treats the
  // restored ascension screen as manual.
  const reloaded = createHarness();
  reloaded.bot.nextAchievement = 397;
  reloaded.bot.deadline = 987654321;
  reloaded.game.promptOn = 1;
  reloaded.bot.run();
  reloaded.bot.run();
  assert.strictEqual(reloaded.game.OnAscend, true, 'reload keeps the manual screen available');
  assert.strictEqual(reloaded.game.promptOn, 1, 'reload preserves the manual prompt');
  assert.strictEqual(reloaded.calls.reincarnate, 0, 'reload does not restore bot ownership');
  assert.strictEqual(reloaded.calls.closePrompt, 0, 'reload does not close the manual prompt');
  assert.strictEqual(reloaded.calls.modePick, 0, 'reload does not change ascension mode');
  assert.strictEqual(reloaded.calls.upgradeBuys, 0, 'reload does not buy heavenly upgrades');
  assert.strictEqual(reloaded.calls.justRight, 0, 'reload does not run special target actions');
  assert.strictEqual(reloaded.bot.nextAchievement, 397, 'reload does not rewrite the current target');
  assert.strictEqual(reloaded.bot.deadline, 987654321, 'reload does not rewrite the current deadline');
}

function checkBotOwnedAndPlayerResume() {
  const { bot, game, calls } = createHarness();
  bot.onAscend = true;
  bot.achievementAscensionCallStarted = true;
  bot.delay = 2;

  game.AscendTimer = 1;
  bot.run();
  assert.strictEqual(bot.delay, 2, 'active ascend animation pauses the bot delay');
  assert.strictEqual(calls.reincarnate, 0, 'active animation cannot reincarnate');
  game.AscendTimer = 0;

  bot.run();
  bot.run();
  assert.strictEqual(bot.delay, 0, 'bot-owned screen preserves the existing delay');
  assert.strictEqual(calls.reincarnate, 0, 'bot-owned screen waits for its configured delay');
  bot.run();
  assert.strictEqual(calls.reincarnate, 1, 'bot-owned ascent reincarnates once after the delay');
  assert.strictEqual(calls.upgradeBuys, 1, 'heavenly upgrades are bought for the bot-owned ascent');
  assert.strictEqual(bot.onAscend, false, 'ownership clears after reincarnation is requested');
  assert.strictEqual(bot.achievementAscensionCallStarted, false, 'achievement call marker is consumed');

  bot.run();
  assert.strictEqual(calls.reincarnate, 1, 'reincarnation timer prevents a duplicate call');
  game.ReincarnateTimer = 0;

  const manual = createHarness();
  manual.bot.nextAchievement = 453;
  manual.bot.deadline = 12345;
  manual.bot.manualAscensionRun = manual.game.resets;
  manual.game.OnAscend = false;
  manual.game.resets++;
  manual.bot.resumeAfterManualAscension();
  assert.strictEqual(manual.bot.manualAscensionRun, undefined, 'manual completion marker is cleared');
  assert.strictEqual(manual.calls.achievementsFound, 1, 'target is refreshed after player reincarnation');
  assert.strictEqual(manual.bot.nextAchievement, 470, 'player reincarnation resumes with a fresh target');
  assert.strictEqual(manual.bot.deadline, 0, 'deadline is reactivated after player reincarnation');

  manual.bot.deadline = Date.now() + 60_000;
  manual.bot.run();
  assert.strictEqual(manual.calls.clicks, 1, 'normal bot actions resume after player reincarnation');
  assert.strictEqual(manual.calls.goldenCookies, 1, 'normal loop resumes after player reincarnation');
}

function checkBetaLoaderTargets() {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const userscript = fs.readFileSync(path.join(root, 'CookieBot.user.js'), 'utf8');
  assert.match(readme, /beta browser bookmarklet loads the fork's beta monolith/);
  assert.ok(readme.includes(betaUrl), 'README bookmarklet points to the root beta monolith');
  assert.ok(userscript.includes(`Game.LoadMod('${betaUrl}')`),
    'root beta userscript points to the root beta monolith');

  const archive = path.join(root, 'CookieBotBeta4Steam.zip');
  const entries = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' })
    .trim().split(/\r?\n/).sort();
  assert.deepStrictEqual(entries, ['CookieBot Beta/info.txt', 'CookieBot Beta/main.js']);
  const steamLoader = execFileSync('unzip', ['-p', archive, 'CookieBot Beta/main.js'],
    { encoding: 'utf8' });
  assert.ok(steamLoader.includes(`Game.LoadMod('${betaUrl}')`),
    'beta Steam main.js points to the root beta monolith');
}

checkManualScreenAndReload();
checkReadyReloadManualAscension();
checkBotOwnedAndPlayerResume();
checkBetaLoaderTargets();
console.log('Root beta monolith ownership and browser/Steam loader checks passed.');
