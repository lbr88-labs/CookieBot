const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

const bundlePath = path.join(__dirname, '../dist/cookieAutoPlayBeta-latest.js');
const bundle = fs.readFileSync(bundlePath, 'utf8');
const bundleAst = ts.createSourceFile(bundlePath, bundle, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);

let ascensionManagerClass;
function findAscensionManagerClass(node) {
  if (ts.isClassDeclaration(node) && node.name && node.name.text === 'AscensionManager') {
    ascensionManagerClass = node;
  }
  ts.forEachChild(node, findAscensionManagerClass);
}
findAscensionManagerClass(bundleAst);
assert(ascensionManagerClass, 'The experimental TypeScript bundle must contain AscensionManager.');

function testManualAscensionScreenRemainsPlayerOwned() {
  const calls = {
    achievementChecks: 0,
    promptCloses: 0,
    upgradePurchases: 0,
    modeChanges: 0,
    modeConfirms: 0,
    reincarnations: 0,
    nextAchievementChanges: 0,
    deadlineChanges: 0
  };
  const Game = {
    ascendMeterPercent: 0.1,
    Achievements: {
      Neverclick: { won: false },
      Hardcore: { won: true },
      Reincarnation: { won: true }
    },
    OnAscend: true,
    promptOn: true,
    nextAscensionMode: 0,
    ClosePrompt() {
      calls.promptCloses++;
      this.promptOn = false;
    },
    PickAscensionMode() {
      calls.modeChanges++;
    },
    Reincarnate(confirm) {
      assert.strictEqual(confirm, true);
      calls.reincarnations++;
    }
  };
  const context = {
    onAscend: false,
    delay: 0,
    now: 123,
    configManager: { registerOption() {} },
    findNextAchievement() { calls.nextAchievementChanges++; },
    setDeadline() { calls.deadlineChanges++; },
    endPhase() { return false; },
    mustRebornAscend() { return false; }
  };
  const classSource = bundle.slice(ascensionManagerClass.getStart(bundleAst), ascensionManagerClass.end);
  const BundledAscensionManager = vm.runInNewContext(`(${classSource})`, { Game, Date });
  const manager = new BundledAscensionManager(context);
  manager.checkAchievements = () => { calls.achievementChecks++; };
  manager.getAchievementAscensionIntent = () => null;
  manager.buyHeavenlyUpgrades = () => { calls.upgradePurchases++; };
  manager.safeConfirm = () => { calls.modeConfirms++; };

  manager.handleAscend();

  assert.deepStrictEqual(calls, {
    achievementChecks: 0,
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
  assert.strictEqual(context.onAscend, false, 'A manual screen must remain outside bot ascension ownership.');
  assert.strictEqual(context.delay, 0);
}

function testBotOwnedAscensionStillCompletes() {
  const calls = { promptCloses: 0, upgradePurchases: 0, modeChanges: 0, modeConfirms: 0, reincarnations: 0 };
  const Game = {
    ascendMeterPercent: 0.1,
    Achievements: {
      Neverclick: { won: false },
      Hardcore: { won: true },
      Reincarnation: { won: true }
    },
    OnAscend: true,
    promptOn: true,
    nextAscensionMode: 0,
    ClosePrompt() {
      calls.promptCloses++;
      this.promptOn = false;
    },
    PickAscensionMode() {
      calls.modeChanges++;
    },
    Reincarnate(confirm) {
      assert.strictEqual(confirm, true);
      calls.reincarnations++;
    }
  };
  const context = {
    onAscend: true,
    delay: 0,
    now: 123,
    configManager: { registerOption() {} },
    findNextAchievement() {},
    setDeadline() {},
    endPhase() { return false; },
    mustRebornAscend() { return false; }
  };
  const classSource = bundle.slice(ascensionManagerClass.getStart(bundleAst), ascensionManagerClass.end);
  const BundledAscensionManager = vm.runInNewContext(`(${classSource})`, { Game, Date });
  const manager = new BundledAscensionManager(context);
  manager.checkAchievements = () => {};
  manager.getAchievementAscensionIntent = () => null;
  manager.buyHeavenlyUpgrades = () => { calls.upgradePurchases++; };
  manager.safeConfirm = () => { calls.modeConfirms++; };

  manager.handleAscend();

  assert.strictEqual(calls.promptCloses, 1);
  assert.strictEqual(calls.upgradePurchases, 1);
  assert.strictEqual(calls.modeChanges, 1);
  assert.strictEqual(calls.modeConfirms, 1);
  assert.strictEqual(calls.reincarnations, 1);
}

testManualAscensionScreenRemainsPlayerOwned();
testBotOwnedAscensionStillCompletes();
console.log('Experimental TypeScript bundle ascension ownership regression passed.');
