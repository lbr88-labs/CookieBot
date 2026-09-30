const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const IDS = {
  BUILDING_IDS: { BANK: 1, FARM: 2 },
  UPGRADE_IDS: {
    SEASON_SWITCHER: 20,
    SUCRALOSIA_INUTILIS: 21,
    PERMANENT_UPGRADE_SLOT_V: 22,
    LUCKY_PAYOUT: 23,
    LUCKY_DIGIT: 24,
    LUCKY_NUMBER: 25,
    CHOCOLATE_EGG: 26
  },
  ACHIEVEMENT_IDS: {
    ENDLESS_CYCLE: 30,
    REINCARNATION: 31,
    TRUE_NEVERCLICK: 32,
    NEVERCLICK: 33,
    HARDCORE: 34,
    SPEED_BAKING_I: 35,
    SPEED_BAKING_II: 36,
    SPEED_BAKING_III: 37
  }
};

const sourcePath = path.join(__dirname, '../../src/modules/AscensionManager.ts');
const compiled = ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020
  }
}).outputText;

function createScenario() {
  const activeBuffs = new Set();
  const events = { status: [], actions: [], activities: [], ascends: 0 };
  let promptCloses = 0;
  let harvests = 0;
  let sales = 0;
  const upgrades = new Proxy({
    [IDS.UPGRADE_IDS.CHOCOLATE_EGG]: { bought: false, unlocked: false }
  }, {
    get(target, key) {
      if (!(key in target)) target[key] = { bought: false, unlocked: false };
      return target[key];
    }
  });
  const achievementsById = new Proxy({
    999: { won: false, name: 'Synthetic target', ddesc: 'reach the synthetic target' }
  }, {
    get(target, key) {
      if (!(key in target)) target[key] = { won: false, name: 'Synthetic target', ddesc: 'reach the synthetic target' };
      return target[key];
    }
  });
  const objects = [];
  objects[IDS.BUILDING_IDS.BANK] = {
    minigame: {
      goods: [{ id: 7 }],
      sellGood() { sales++; }
    }
  };
  objects[IDS.BUILDING_IDS.FARM] = {
    minigame: { harvestAll() { harvests++; } }
  };

  const Game = {
    ascendMeterPercent: 0.1,
    Achievements: {},
    AchievementsById: achievementsById,
    UpgradesById: upgrades,
    ObjectsById: objects,
    prestige: 1000000000,
    ascendMeterLevel: 20000000000,
    cookiesEarned: 8000000000000000000,
    heavenlyChips: 0,
    ascensionMode: 0,
    OnAscend: false,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    startDate: 0,
    promptOn: true,
    wrinklers: [],
    resets: 0,
    hasBuff(name) { return activeBuffs.has(name); },
    ClosePrompt() { promptCloses++; this.promptOn = false; },
    isMinigameReady() { return true; },
    Ascend(confirm) {
      assert.strictEqual(confirm, true);
      events.ascends++;
      this.AscendTimer = 5;
    }
  };

  const context = {
    now: 30 * 24 * 60 * 60 * 1000,
    nextAchievement: 999,
    onAscend: false,
    plantPending: false,
    wantAscend: false,
    Config: { NightMode: 0, HardcoreMode: 0 },
    activities: '',
    mainActivity: '',
    workingOnSpecialAchievement: false,
    configManager: { registerOption() {} },
    preNightMode() { return false; },
    endPhase() { return false; },
    findNextAchievement() {},
    setDeadline() {},
    assignSpirit() {},
    addActivity(activity) {
      if (!events.activities.includes(activity)) events.activities.push(activity);
      return true;
    },
    logStatus(type, message) { events.status.push({ type, message }); },
    logAction(action, details) { events.actions.push({ action, details }); },
    logging() {},
    info() {}
  };

  const moduleExports = {};
  const moduleRequire = (request) => {
    if (request === '../constants/gameIds') return IDS;
    throw new Error(`Unexpected module import: ${request}`);
  };
  new Function('exports', 'require', 'Game', 'Beautify', 'setTimeout', compiled)(
    moduleExports,
    moduleRequire,
    Game,
    String,
    setTimeout
  );

  return {
    manager: new moduleExports.AscensionManager(context),
    Game,
    context,
    activeBuffs,
    events,
    counts: {
      get promptCloses() { return promptCloses; },
      get harvests() { return harvests; },
      get sales() { return sales; }
    }
  };
}

function assertWaitingFor(scenario, blocker, reasonPart) {
  const status = scenario.manager.getStatus();
  assert.strictEqual(status.status, 'waiting');
  assert.strictEqual(status.details['Wait Guard'], blocker);
  assert.strictEqual(status.details['Pending Reason'], status.reason);
  assert(!('Days in Run' in status.details));
  assert(status.reason.includes(reasonPart), `Expected pending reason to include: ${reasonPart}`);
  assert.strictEqual(status.nextAction, `Waiting for ${blocker}`);
}

function testRepeatedSugarBlessingWaitAndAscend() {
  const scenario = createScenario();
  const { manager, Game, context, activeBuffs, events, counts } = scenario;
  const timeReason = 'ascend after 30 days';

  activeBuffs.add('Sugar blessing');
  manager.handleAscend();
  assertWaitingFor(scenario, 'Sugar blessing', timeReason);
  manager.handleAscend();
  assertWaitingFor(scenario, 'Sugar blessing', timeReason);

  assert.strictEqual(events.ascends, 0);
  assert.strictEqual(events.status.filter(({ type }) => type === 'ascend').length, 0);
  assert.strictEqual(events.actions.filter(({ action }) => action === 'Ascending').length, 0);
  assert(!events.activities.some((activity) => /preparing to ascend|ascension started/i.test(activity)));
  assert(!events.activities.some((activity) => /still .* days until/i.test(activity)));
  assert.strictEqual(counts.promptCloses, 0);
  assert.strictEqual(counts.harvests, 0);
  assert.strictEqual(counts.sales, 0);

  activeBuffs.clear();
  context.plantPending = true;
  manager.handleAscend();
  assertWaitingFor(scenario, 'plant', timeReason);
  context.plantPending = false;
  activeBuffs.add('Sugar frenzy');
  manager.handleAscend();
  assertWaitingFor(scenario, 'Sugar frenzy', timeReason);
  assert.strictEqual(events.ascends, 0);
  assert.strictEqual(events.status.filter(({ type }) => type === 'ascend').length, 0);
  assert.strictEqual(counts.promptCloses, 0);
  assert.strictEqual(counts.harvests, 0);
  assert.strictEqual(counts.sales, 0);

  // Losing time-based eligibility clears the old wait decision.
  activeBuffs.clear();
  context.now = 10 * 24 * 60 * 60 * 1000;
  manager.handleAscend();
  const nonEligibleStatus = manager.getStatus();
  assert(!nonEligibleStatus.reason.includes(timeReason));
  assert(!nonEligibleStatus.details || !('Wait Guard' in nonEligibleStatus.details));

  // If the buff expires between checks, the dashboard stops claiming it is blocking.
  context.now = 30 * 24 * 60 * 60 * 1000;
  activeBuffs.add('Sugar blessing');
  manager.handleAscend();
  activeBuffs.delete('Sugar blessing');
  const expiredBuffStatus = manager.getStatus();
  assert(!expiredBuffStatus.details || !('Wait Guard' in expiredBuffStatus.details));
  assert(!expiredBuffStatus.reason.includes(timeReason));

  manager.handleAscend();
  assert.strictEqual(events.ascends, 1);
  assert.strictEqual(events.status.filter(({ type }) => type === 'ascend').length, 1);
  assert.strictEqual(events.actions.filter(({ action }) => action === 'Ascending').length, 1);
  assert(events.activities.includes('Ascension started.'));
  assert.strictEqual(counts.promptCloses, 1);
  assert.strictEqual(counts.harvests, 1);
  assert.strictEqual(counts.sales, 1);
}

function testFailedGameCallDoesNotLogAscension() {
  const scenario = createScenario();
  const { manager, Game, activeBuffs, events } = scenario;
  activeBuffs.add('Sugar blessing');
  manager.handleAscend();
  activeBuffs.clear();
  Game.Ascend = () => { throw new Error('synthetic Game.Ascend failure'); };

  assert.throws(() => manager.handleAscend(), /synthetic Game.Ascend failure/);
  assert.strictEqual(events.status.filter(({ type }) => type === 'ascend').length, 0);
  assert.strictEqual(events.actions.filter(({ action }) => action === 'Ascending').length, 0);
  assert(!events.activities.includes('Ascension started.'));
}

function testPreThresholdActivityDoesNotTick() {
  const scenario = createScenario();
  scenario.Game.ascendMeterLevel = 6000000000;
  scenario.manager.handleAscend();
  scenario.manager.handleAscend();

  assert.deepStrictEqual(scenario.events.activities, ['Waiting for the hard ascend time threshold.']);
  assert.strictEqual(scenario.events.ascends, 0);
}

testRepeatedSugarBlessingWaitAndAscend();
testFailedGameCallDoesNotLogAscension();
testPreThresholdActivityDoesNotTick();
console.log('AscensionManager synthetic regression tests passed.');
