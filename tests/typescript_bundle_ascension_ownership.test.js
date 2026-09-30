const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

const bundlePath = path.join(__dirname, '../dist/cookieAutoPlayBeta-latest.js');
const bundle = fs.readFileSync(bundlePath, 'utf8');
const bundleAst = ts.createSourceFile(bundlePath, bundle, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);

const bundledClasses = new Map();
function findBundledClasses(node) {
  if (ts.isClassDeclaration(node) && node.name) {
    bundledClasses.set(node.name.text, node);
  }
  ts.forEachChild(node, findBundledClasses);
}
findBundledClasses(bundleAst);

const ascensionManagerClass = bundledClasses.get('AscensionManager');
const autoPlayClass = bundledClasses.get('AutoPlay_AutoPlay');
assert(ascensionManagerClass, 'The experimental TypeScript bundle must contain AscensionManager.');
assert(autoPlayClass, 'The experimental TypeScript bundle must contain AutoPlay.');

const hookLogicMethod = autoPlayClass.members.find(member =>
  ts.isMethodDeclaration(member) && member.name.getText(bundleAst) === 'hookLogic'
);
assert(hookLogicMethod, 'The experimental TypeScript bundle must contain AutoPlay.hookLogic.');

const delayGetter = autoPlayClass.members.find(member =>
  ts.isGetAccessorDeclaration(member) && member.name.getText(bundleAst) === 'delay'
);
const delaySetter = autoPlayClass.members.find(member =>
  ts.isSetAccessorDeclaration(member) && member.name.getText(bundleAst) === 'delay'
);
assert(delayGetter && delaySetter, 'The experimental TypeScript bundle must proxy delay to AutoPlay state.');

const classSource = bundle.slice(ascensionManagerClass.getStart(bundleAst), ascensionManagerClass.end);
function createBundledAscensionManager(Game, context) {
  const Constructor = vm.runInNewContext(`(${classSource})`, {
    Game,
    Date,
    UPGRADE_IDS: { CHOCOLATE_EGG: 0 }
  });
  return new Constructor(context);
}

const hookLogicSource = bundle.slice(hookLogicMethod.getStart(bundleAst), hookLogicMethod.end);
function createBundledHookLogic(Game) {
  return vm.runInNewContext(`({${hookLogicSource}}).hookLogic`, {
    globalThis: { Game }
  });
}

const delayAccessorSource = bundle.slice(delayGetter.getStart(bundleAst), delayGetter.end) + ', ' +
  bundle.slice(delaySetter.getStart(bundleAst), delaySetter.end);
const delayAccessor = vm.runInNewContext(
  `Object.getOwnPropertyDescriptor(({${delayAccessorSource}}), 'delay')`
);

function makeContext(calls, onAscend = false) {
  const context = {
    state: { delay: 0 },
    onAscend,
    now: 123,
    configManager: { registerOption() {} },
    findNextAchievement() { calls.nextAchievementChanges++; },
    setDeadline() { calls.deadlineChanges++; },
    endPhase() { return false; },
    mustRebornAscend() { return false; },
    logAction() {},
    logStatus() {},
    addActivity() {},
    info() {},
    measureModule(name, callback) {
      if (name === 'AscensionManager' && Object.prototype.hasOwnProperty.call(calls, 'managerVisits')) {
        calls.managerVisits++;
      }
      callback();
    }
  };
  Object.defineProperty(context, 'delay', delayAccessor);
  return context;
}

function makeAscensionGame(calls, onAscend = true) {
  return {
    ascendMeterPercent: 0.1,
    ascendMeterLevel: 0,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    Achievements: {
      Neverclick: { id: 1, won: true },
      Hardcore: { id: 2, won: true },
      Reincarnation: { id: 3, won: false }
    },
    OnAscend: onAscend,
    promptOn: true,
    nextAscensionMode: 0,
    prestige: 0,
    wrinklers: [],
    UpgradesById: { 0: { unlocked: false, bought: false } },
    hasBuff() { return false; },
    ClosePrompt() {
      calls.promptCloses++;
      this.promptOn = false;
    },
    PickAscensionMode() {
      calls.modeChanges++;
    },
    Ascend(confirm) {
      assert.strictEqual(confirm, true, 'CookieBot must call Game.Ascend(true).');
      calls.ascendInvocations++;
      // Deliberately do not change OnAscend here. The game transition is a
      // separate event and is modeled explicitly in the positive regression.
    },
    Reincarnate(confirm) {
      assert.strictEqual(confirm, true);
      calls.reincarnations++;
    }
  };
}

function prepareManager(manager, calls) {
  manager.checkAchievements = () => { calls.achievementChecks++; };
  manager.getAchievementAscensionIntent = () => null;
  manager.buyHeavenlyUpgrades = () => { calls.upgradePurchases++; };
  manager.safeConfirm = () => { calls.modeConfirms++; };
}

function testManualAscensionScreenRemainsPlayerOwnedAcrossTicksAndReload() {
  const calls = {
    achievementChecks: 0,
    intentReads: 0,
    ascendInvocations: 0,
    promptCloses: 0,
    upgradePurchases: 0,
    modeChanges: 0,
    modeConfirms: 0,
    reincarnations: 0,
    nextAchievementChanges: 0,
    deadlineChanges: 0
  };
  const Game = makeAscensionGame(calls, true);
  const hookLogic = createBundledHookLogic(Game);

  const firstContext = makeContext(calls, false);
  firstContext.ascensionManager = createBundledAscensionManager(Game, firstContext);
  prepareManager(firstContext.ascensionManager, calls);
  firstContext.ascensionManager.getAchievementAscensionIntent = () => {
    calls.intentReads++;
    return { version: 1, state: 'due', targetId: 453, run: { startDate: 1, fullDate: 1, resets: 0 } };
  };

  // Repeated game ticks on a player-owned screen must be inert.
  for (let tick = 0; tick < 5; tick++) hookLogic.call(firstContext);

  // Reload with the same player screen open. New runtime state has no bot
  // ownership marker, so it must fail closed again.
  const reloadedContext = makeContext(calls, false);
  reloadedContext.ascensionManager = createBundledAscensionManager(Game, reloadedContext);
  prepareManager(reloadedContext.ascensionManager, calls);
  reloadedContext.ascensionManager.getAchievementAscensionIntent = () => {
    calls.intentReads++;
    return { version: 1, state: 'due', targetId: 453, run: { startDate: 1, fullDate: 1, resets: 0 } };
  };
  for (let tick = 0; tick < 5; tick++) hookLogic.call(reloadedContext);

  assert.deepStrictEqual(calls, {
    achievementChecks: 0,
    intentReads: 0,
    ascendInvocations: 0,
    promptCloses: 0,
    upgradePurchases: 0,
    modeChanges: 0,
    modeConfirms: 0,
    reincarnations: 0,
    nextAchievementChanges: 0,
    deadlineChanges: 0
  });
  assert.strictEqual(Game.promptOn, true, 'A manual screen must keep its player prompt open.');
  assert.strictEqual(Game.nextAscensionMode, 0, 'A manual screen must not change ascension mode.');
  assert.strictEqual(reloadedContext.onAscend, false, 'A reloaded manual screen must remain player-owned.');
  assert.strictEqual(reloadedContext.delay, 0, 'A manual screen must not change the bot delay.');
}

function testBotOwnedAscensionWaitsForTransitionAndDelayThenReincarnatesOnce() {
  const calls = {
    achievementChecks: 0,
    ascendInvocations: 0,
    promptCloses: 0,
    upgradePurchases: 0,
    modeChanges: 0,
    modeConfirms: 0,
    reincarnations: 0,
    nextAchievementChanges: 0,
    deadlineChanges: 0,
    managerVisits: 0
  };
  const Game = makeAscensionGame(calls, false);
  const context = makeContext(calls, false);
  const manager = createBundledAscensionManager(Game, context);
  context.ascensionManager = manager;
  prepareManager(manager, calls);
  const hookLogic = createBundledHookLogic(Game);

  manager.triggerAscend('synthetic early-game ownership regression');

  assert.strictEqual(calls.ascendInvocations, 1, 'CookieBot should request Game.Ascend(true) once.');
  assert.strictEqual(Game.OnAscend, false, 'An Ascend(true) invocation alone is not a game transition.');
  assert.strictEqual(context.onAscend, true, 'CookieBot owns the pending transition it initiated.');
  assert.strictEqual(context.delay, 15, 'The bot-owned transition keeps the established delay.');
  assert.strictEqual(calls.reincarnations, 0, 'Do not reincarnate before the game opens its ascend screen.');

  // Model the game's real transition separately from the bot invocation.
  assert.strictEqual(Game.prestige, 0, 'The synthetic setup starts in the early game.');
  assert.strictEqual(Game.ascendMeterLevel, 0, 'The synthetic setup has no real prestige gain.');
  Game.OnAscend = true;
  Game.AscendTimer = 2;
  hookLogic.call(context);
  assert.strictEqual(calls.managerVisits, 0, 'The ascension animation timer must block screen handling.');
  assert.strictEqual(context.delay, 15, 'Animation ticks must not consume the bot delay.');

  Game.AscendTimer = 0;
  Game.ReincarnateTimer = 2;
  hookLogic.call(context);
  assert.strictEqual(calls.managerVisits, 0, 'An active reincarnation timer must block screen handling.');
  assert.strictEqual(context.delay, 15, 'Reincarnation ticks must not consume the bot delay.');

  Game.AscendTimer = 0;
  Game.ReincarnateTimer = 0;
  for (let tick = 0; tick < 15; tick++) {
    hookLogic.call(context);
    assert.strictEqual(calls.managerVisits, 0, 'The ascension handler must wait through all 15 delay ticks.');
    assert.strictEqual(calls.reincarnations, 0, 'No reincarnation may occur during the delay.');
  }
  assert.strictEqual(context.delay, 0);

  hookLogic.call(context);
  assert.strictEqual(calls.managerVisits, 1, 'The handler runs after the delay expires.');
  assert.strictEqual(calls.reincarnations, 1, 'The bot-owned screen reincarnates once.');
  assert.strictEqual(calls.upgradePurchases, 1);
  assert.strictEqual(context.onAscend, false, 'Ownership clears after reincarnation is requested.');

  // Keep the mocked ascend screen open to exercise the next tick and the
  // fail-closed behavior after ownership has been consumed.
  for (let tick = 0; tick < 11; tick++) hookLogic.call(context);
  assert.strictEqual(calls.reincarnations, 1, 'Repeated ticks must not reincarnate the same screen twice.');
  assert.strictEqual(calls.upgradePurchases, 1, 'Repeated ticks must not repeat heavenly purchases.');
  assert.strictEqual(calls.ascendInvocations, 1, 'The owned path must not invoke Game.Ascend again.');
}

function testBotOwnedAscensionStillCompletes() {
  const calls = { promptCloses: 0, upgradePurchases: 0, modeChanges: 0, modeConfirms: 0, reincarnations: 0 };
  const Game = makeAscensionGame(calls, true);
  Game.Achievements.Neverclick.won = false;
  const context = makeContext(calls, true);
  Game.Reincarnate = function(confirm) {
    assert.strictEqual(confirm, true);
    assert.strictEqual(context.onAscend, true, 'Ownership clears only after the game accepts reincarnation.');
    calls.reincarnations++;
  };
  const manager = createBundledAscensionManager(Game, context);
  prepareManager(manager, calls);

  manager.handleAscend();

  assert.strictEqual(calls.promptCloses, 1);
  assert.strictEqual(calls.upgradePurchases, 1);
  assert.strictEqual(calls.modeChanges, 1);
  assert.strictEqual(calls.modeConfirms, 1);
  assert.strictEqual(Game.nextAscensionMode, 1);
  assert.strictEqual(calls.reincarnations, 1);
}

testManualAscensionScreenRemainsPlayerOwnedAcrossTicksAndReload();
testBotOwnedAscensionWaitsForTransitionAndDelayThenReincarnatesOnce();
testBotOwnedAscensionStillCompletes();
console.log('Experimental TypeScript bundle ascension ownership regressions passed.');
