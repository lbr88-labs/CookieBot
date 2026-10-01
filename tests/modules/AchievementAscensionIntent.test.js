const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const packageVersion = require('../../package.json').version;

const INTENT_KEY = 'CookieBot_AchievementAscensionIntent_v1';
const TARGET_ID = 453;
const NEXT_TARGET_ID = 470;
const IDS = {
  BUILDING_IDS: { BANK: 1, FARM: 2 },
  UPGRADE_IDS: {
    CHOCOLATE_EGG: 26,
    SEASON_SWITCHER: 20,
    SUCRALOSIA_INUTILIS: 21,
    PERMANENT_UPGRADE_SLOT_V: 22,
    LUCKY_PAYOUT: 23,
    LUCKY_DIGIT: 24,
    LUCKY_NUMBER: 25
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

const intentPath = path.join(__dirname, '../../src/modules/AscensionManager.ts');
const handlerPath = path.join(__dirname, '../../src/modules/AchievementHandler.ts');
const autoplayPath = path.join(__dirname, '../../src/AutoPlay.ts');

function compileModule(sourcePath, moduleRequire, game, windowObject) {
  const compiled = ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;
  const moduleExports = {};
  new Function('exports', 'require', 'Game', 'Beautify', 'window', 'setTimeout', compiled)(
    moduleExports,
    moduleRequire,
    game,
    String,
    windowObject,
    setTimeout
  );
  return moduleExports;
}

function loadAscensionManager(game, windowObject) {
  return compileModule(intentPath, (request) => {
    if (request === '../constants/gameIds') return IDS;
    throw new Error(`Unexpected AscensionManager import: ${request}`);
  }, game, windowObject).AscensionManager;
}

function loadAchievementHandler(game, windowObject) {
  return compileModule(handlerPath, (request) => {
    if (request === '../constants/gameIds') return IDS;
    throw new Error(`Unexpected AchievementHandler import: ${request}`);
  }, game, windowObject).AchievementHandler;
}

class MemoryStorage {
  constructor(initial = {}) {
    this.values = new Map(Object.entries(initial));
  }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

function makeAchievement(id, won = 0) {
  if (won === true) won = 1;
  else if (won === false) won = 0;
  return { id, won, name: `Achievement ${id}`, ddesc: `description ${id}`, pool: 'normal' };
}

function createScenario(storage = new MemoryStorage(), options = {}) {
  const achievementsById = {
    [TARGET_ID]: makeAchievement(TARGET_ID, options.targetWon ?? 0),
    [NEXT_TARGET_ID]: makeAchievement(NEXT_TARGET_ID, false),
    [IDS.ACHIEVEMENT_IDS.TRUE_NEVERCLICK]: makeAchievement(IDS.ACHIEVEMENT_IDS.TRUE_NEVERCLICK, false),
    [IDS.ACHIEVEMENT_IDS.NEVERCLICK]: makeAchievement(IDS.ACHIEVEMENT_IDS.NEVERCLICK, false),
    [IDS.ACHIEVEMENT_IDS.HARDCORE]: makeAchievement(IDS.ACHIEVEMENT_IDS.HARDCORE, false)
  };
  const activeBuffs = new Set();
  const events = { statuses: [], actions: [], activities: [], ascends: 0, timeline: [] };
  const upgradesById = new Proxy({ [IDS.UPGRADE_IDS.CHOCOLATE_EGG]: { bought: false, unlocked: false } }, {
    get(target, key) {
      if (!(key in target)) target[key] = { bought: false, unlocked: false };
      return target[key];
    }
  });
  const Game = {
    version: '2.058',
    Achievements: Object.values(achievementsById),
    AchievementsById: achievementsById,
    Upgrades: {},
    UpgradesById: upgradesById,
    ObjectsById: [],
    startDate: 1000,
    fullDate: 2000,
    resets: 4,
    ascendMeterPercent: 0.1,
    ascendMeterLevel: options.ascendMeterLevel ?? 500,
    prestige: options.prestige ?? 10,
    ascensionMode: 0,
    OnAscend: false,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    heavenlyChips: 0,
    cookiesEarned: 1000,
    promptOn: false,
    wrinklers: [],
    dragonLevel: 0,
    hasBuff(name) { return activeBuffs.has(name); },
    has(name) { return Boolean(Game.Upgrades[name]?.bought); },
    isMinigameReady() { return false; },
    sayTime() { return '0s'; },
    ClosePrompt() { this.promptOn = false; },
    Ascend(confirm) {
      assert.strictEqual(confirm, true);
      events.timeline.push('Game.Ascend');
      events.ascends++;
      this.AscendTimer = 5;
    }
  };
  assert.strictEqual(Game.version, '2.058');

  const context = {
    now: 5000,
    nextAchievement: TARGET_ID,
    wantedAchievements: [TARGET_ID, NEXT_TARGET_ID],
    lateAchievements: [],
    lumpRelatedAchievements: [],
    wantAscend: false,
    onAscend: false,
    plantPending: false,
    delay: 0,
    Config: { NightMode: 0, HardcoreMode: 0 },
    activities: '',
    mainActivity: '',
    workingOnSpecialAchievement: false,
    finished: false,
    loggingInfo: 0,
    configManager: { registerOption() {} },
    setMainActivity(activity) { context.mainActivity = activity; },
    preNightMode() { return false; },
    endPhase() { return false; },
    findNextAchievement() { handler.findNextAchievement(); },
    setDeadline() {},
    assignSpirit() {},
    addActivity(activity) { events.activities.push(activity); },
    logStatus(type, message) {
      events.timeline.push(`status:${type}`);
      events.statuses.push({ type, message });
    },
    logAction(action, details) { events.actions.push({ action, details }); },
    info() {},
    logging() { context.loggingInfo = 0; }
  };

  const windowObject = { localStorage: storage };
  const AscensionManager = loadAscensionManager(Game, windowObject);
  const AchievementHandler = loadAchievementHandler(Game, windowObject);
  const manager = new AscensionManager(context);
  context.getAchievementAscensionIntent = () => manager.getAchievementAscensionIntent();
  context.armAchievementAscensionIntent = (targetId) => manager.armAchievementAscensionIntent(targetId);
  const handler = new AchievementHandler(context);
  handler.handleSmallAchievements = () => {};
  // Close the reference used by the context callback above.
  context.findNextAchievement = () => handler.findNextAchievement();

  if (options.throwAscend) {
    Game.Ascend = (confirm) => {
      assert.strictEqual(confirm, true);
      events.timeline.push('Game.Ascend');
      throw new Error('synthetic Game.Ascend failure');
    };
  }

  return { Game, context, manager, handler, activeBuffs, events, storage };
}

function armTarget(scenario) {
  scenario.handler.findNextAchievement();
  assert.strictEqual(scenario.context.nextAchievement, TARGET_ID);
  assert.deepStrictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)), {
    version: 1,
    state: 'armed',
    targetId: TARGET_ID,
    run: { startDate: 1000, fullDate: 2000, resets: 4 }
  });
}

function testOldWonTargetSelectsNextWithoutAscending() {
  const scenario = createScenario(new MemoryStorage(), { targetWon: true });
  scenario.handler.findNextAchievement();
  assert.strictEqual(scenario.context.nextAchievement, NEXT_TARGET_ID);
  assert.strictEqual(scenario.events.ascends, 0);
  assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).targetId, NEXT_TARGET_ID);
}

function testDueIntentSurvivesReloadAndWaitsForGuards() {
  const scenario = createScenario();
  armTarget(scenario);
  scenario.Game.AchievementsById[TARGET_ID].won = 1;
  scenario.activeBuffs.add('Sugar blessing');
  scenario.manager.handleAscend();
  assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).state, 'due');
  assert.strictEqual(scenario.events.ascends, 0);
  assert(scenario.events.statuses.some(({ type, message }) =>
    type === 'ascend:waiting' && message.includes('Sugar blessing')));

  // Simulate a new userscript instance on the same origin and same Cookie Clicker run.
  const reloaded = createScenario(scenario.storage);
  reloaded.Game.AchievementsById[TARGET_ID].won = 1;
  reloaded.activeBuffs.add('Sugar blessing');
  reloaded.handler.findNextAchievement();
  assert.strictEqual(reloaded.context.nextAchievement, TARGET_ID);
  assert.strictEqual(JSON.parse(reloaded.storage.getItem(INTENT_KEY)).state, 'due');
  reloaded.manager.handleAscend();
  assert.strictEqual(reloaded.events.ascends, 0);

  reloaded.activeBuffs.clear();
  reloaded.context.plantPending = true;
  reloaded.manager.handleAscend();
  assert.strictEqual(reloaded.manager.getStatus().status, 'waiting');
  assert.strictEqual(reloaded.manager.getStatus().details['Wait Guard'], 'plant');
  assert.strictEqual(JSON.parse(reloaded.storage.getItem(INTENT_KEY)).state, 'due');

  reloaded.context.plantPending = false;
  reloaded.activeBuffs.add('Sugar frenzy');
  reloaded.manager.handleAscend();
  assert.strictEqual(reloaded.manager.getStatus().details['Wait Guard'], 'Sugar frenzy');
  assert.strictEqual(JSON.parse(reloaded.storage.getItem(INTENT_KEY)).state, 'due');

  reloaded.activeBuffs.clear();
  reloaded.manager.handleAscend();
  assert.strictEqual(reloaded.events.ascends, 1);
  assert.strictEqual(reloaded.storage.getItem(INTENT_KEY), null);
  assert.strictEqual(reloaded.events.statuses.filter(({ type }) => type === 'ascend').length, 1);
  assert.strictEqual(reloaded.events.actions.filter(({ action }) => action === 'Ascending').length, 1);
  assert(reloaded.events.timeline.indexOf('Game.Ascend') <
    reloaded.events.timeline.indexOf('status:ascend'));

  reloaded.manager.handleAscend();
  assert.strictEqual(reloaded.events.ascends, 1);
}

function testFirstAscensionPrestigeGateRetainsDueIntent() {
  const scenario = createScenario(new MemoryStorage(), { prestige: 0, ascendMeterLevel: 300 });
  armTarget(scenario);
  scenario.Game.AchievementsById[TARGET_ID].won = 1;
  scenario.manager.canContinue = () => false;
  scenario.manager.handleAscend();
  assert.strictEqual(scenario.events.ascends, 0);
  assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).state, 'due');
  assert(scenario.events.statuses.some(({ type, message }) =>
    type === 'prestige' && message.includes('365+ prestige')));
  const prestigeStatus = scenario.manager.getStatus();
  assert.strictEqual(prestigeStatus.status, 'waiting');
  assert.strictEqual(prestigeStatus.details['Wait Guard'], 'prestige');
  assert.strictEqual(prestigeStatus.nextAction, 'Waiting for prestige');
  assert(prestigeStatus.reason.includes('have achievement'));

  scenario.Game.ascendMeterLevel = 365;
  scenario.manager.handleAscend();
  assert.strictEqual(scenario.events.ascends, 1);
  assert.strictEqual(scenario.storage.getItem(INTENT_KEY), null);
}

function testHardcoreTargetsReportPlantWaitAndAscendWhenClear() {
  const currentRun = { startDate: 1000, fullDate: 2000, resets: 4 };
  for (const targetId of [
    IDS.ACHIEVEMENT_IDS.HARDCORE,
    IDS.ACHIEVEMENT_IDS.NEVERCLICK,
    IDS.ACHIEVEMENT_IDS.TRUE_NEVERCLICK
  ]) {
    const scenario = createScenario(new MemoryStorage({ [INTENT_KEY]: JSON.stringify({
      version: 1,
      state: 'due',
      targetId,
      run: currentRun
    }) }), { prestige: 0, ascendMeterLevel: 300 });
    scenario.Game.AchievementsById[targetId].won = 1;
    scenario.context.nextAchievement = targetId;
    scenario.context.plantPending = true;
    scenario.manager.canContinue = () => false;

    scenario.manager.handleAscend();
    assert.strictEqual(scenario.events.ascends, 0);
    assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).state, 'due');
    const status = scenario.manager.getStatus();
    assert.strictEqual(status.status, 'waiting');
    assert.strictEqual(status.details['Wait Guard'], 'plant');
    assert.strictEqual(status.nextAction, 'Waiting for plant');

    scenario.context.plantPending = false;
    scenario.manager.handleAscend();
    assert.strictEqual(scenario.events.ascends, 1);
    assert.strictEqual(scenario.storage.getItem(INTENT_KEY), null);
    scenario.manager.handleAscend();
    assert.strictEqual(scenario.events.ascends, 1);
  }
}

function testFailedGameAscendRetainsIntentAndDoesNotReportAscent() {
  const scenario = createScenario(new MemoryStorage(), { throwAscend: true });
  armTarget(scenario);
  scenario.Game.AchievementsById[TARGET_ID].won = 1;
  scenario.manager.handleAscend();
  assert.strictEqual(scenario.events.ascends, 0);
  assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).state, 'due');
  assert.strictEqual(scenario.context.onAscend, false);
  assert.strictEqual(scenario.events.statuses.filter(({ type }) => type === 'ascend').length, 0);
  assert.strictEqual(scenario.events.actions.filter(({ action }) => action === 'Ascending').length, 0);
  assert(scenario.events.statuses.some(({ type, message }) =>
    type === 'ascend:waiting' && message.includes('call failed')));

  scenario.Game.Ascend = (confirm) => {
    assert.strictEqual(confirm, true);
    scenario.events.ascends++;
    scenario.Game.AscendTimer = 5;
  };
  scenario.manager.handleAscend();
  assert.strictEqual(scenario.events.ascends, 1);
  assert.strictEqual(scenario.storage.getItem(INTENT_KEY), null);
}

function testAnimationAndNightWaitsStayVisible() {
  for (const blocker of ['animation', 'night mode']) {
    const scenario = createScenario();
    armTarget(scenario);
    scenario.Game.AchievementsById[TARGET_ID].won = 1;
    if (blocker === 'animation') scenario.Game.AscendTimer = 2;
    else {
      scenario.context.Config.NightMode = 1;
      scenario.context.preNightMode = () => true;
    }

    scenario.manager.handleAscend();
    assert.strictEqual(scenario.events.ascends, 0);
    assert.strictEqual(JSON.parse(scenario.storage.getItem(INTENT_KEY)).state, 'due');
    const status = scenario.manager.getStatus();
    assert.strictEqual(status.status, 'waiting');
    assert.strictEqual(status.details['Wait Guard'], blocker);
    assert.strictEqual(status.nextAction, `Waiting for ${blocker}`);
  }
}

function testInvalidMarkersFailClosed() {
  const currentRun = { startDate: 1000, fullDate: 2000, resets: 4 };
  const invalidIntents = [
    '{not json',
    JSON.stringify({ version: 2, state: 'due', targetId: TARGET_ID, run: currentRun }),
    JSON.stringify({ version: 1, state: 'due', targetId: TARGET_ID, run: { ...currentRun, resets: 5 } }),
    JSON.stringify({ version: 1, state: 'due', targetId: 123456, run: currentRun }),
    JSON.stringify({ version: 1, state: 'due', targetId: NEXT_TARGET_ID, run: currentRun })
  ];

  for (const invalidIntent of invalidIntents) {
    const scenario = createScenario(new MemoryStorage({ [INTENT_KEY]: invalidIntent }), { targetWon: true });
    assert.strictEqual(scenario.manager.getAchievementAscensionIntent(), null);
    assert.strictEqual(scenario.storage.getItem(INTENT_KEY), null);
    scenario.handler.findNextAchievement();
    assert.strictEqual(scenario.context.nextAchievement, NEXT_TARGET_ID);
    assert.strictEqual(scenario.events.ascends, 0);
  }
}

function testInvalidAchievementWonValuesFailClosed() {
  const currentRun = { startDate: 1000, fullDate: 2000, resets: 4 };
  for (const won of [2, '1', null]) {
    const scenario = createScenario(new MemoryStorage({ [INTENT_KEY]: JSON.stringify({
      version: 1, state: 'due', targetId: TARGET_ID, run: currentRun
    }) }));
    scenario.Game.AchievementsById[TARGET_ID].won = won;
    assert.strictEqual(scenario.manager.getAchievementAscensionIntent(), null);
    assert.strictEqual(scenario.storage.getItem(INTENT_KEY), null);
    assert.strictEqual(scenario.events.ascends, 0);
  }
}

function testAutoPlayDelegatesIntentAccessToManager() {
  const fakeManager = {
    getAchievementAscensionIntent: () => ({ version: 1, state: 'due', targetId: TARGET_ID }),
    armAchievementAscensionIntent: (targetId) => ({ version: 1, state: 'armed', targetId })
  };
  const AutoPlay = compileModule(autoplayPath, () => ({}), {}, {}).default;
  const autoplay = Object.create(AutoPlay.prototype);
  autoplay.ascensionManager = fakeManager;
  assert.strictEqual(AutoPlay.version, packageVersion);
  assert.deepStrictEqual(autoplay.getAchievementAscensionIntent(),
    { version: 1, state: 'due', targetId: TARGET_ID });
  assert.deepStrictEqual(autoplay.armAchievementAscensionIntent(NEXT_TARGET_ID),
    { version: 1, state: 'armed', targetId: NEXT_TARGET_ID });
}

testOldWonTargetSelectsNextWithoutAscending();
testDueIntentSurvivesReloadAndWaitsForGuards();
testFirstAscensionPrestigeGateRetainsDueIntent();
testHardcoreTargetsReportPlantWaitAndAscendWhenClear();
testAnimationAndNightWaitsStayVisible();
testFailedGameAscendRetainsIntentAndDoesNotReportAscent();
testInvalidMarkersFailClosed();
testInvalidAchievementWonValuesFailClosed();
testAutoPlayDelegatesIntentAccessToManager();
console.log(`Achievement ascension intent TypeScript synthetic tests passed (Game 2.058, CookieBot ${packageVersion}).`);
