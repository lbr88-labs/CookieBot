const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wrapperPath = path.join(__dirname, '../dist/CookieBot.user.js');
const bundlePath = path.join(__dirname, '../dist/cookieAutoPlayBeta-latest.js');
const wrapper = fs.readFileSync(wrapperPath, 'utf8');
const bundle = fs.readFileSync(bundlePath, 'utf8');
const bundleUrl = 'https://lbr88-labs.github.io/CookieBot/dist/cookieAutoPlayBeta-latest.js';
const intentKey = 'CookieBot_AchievementAscensionIntent_v1';
const oldSaveWonTarget = 453;

// This deterministic, nonprivate facade executes the shipped wrapper and
// bundle. Its synthetic save models the screen, prompt, transition timers,
// ascension fields, and achievement bits; it does not emulate Cookie Clicker's
// complete ImportSaveCode implementation or official-origin loader.

function createStorage(seed) {
  const values = new Map(seed || []);
  const writes = [];
  return {
    values,
    writes,
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) {
      writes.push({ operation: 'set', key });
      values.set(String(key), String(value));
    },
    removeItem(key) {
      writes.push({ operation: 'remove', key });
      values.delete(String(key));
    },
    key(index) { return Array.from(values.keys())[index] || null; },
    get length() { return values.size; }
  };
}

function createScheduler() {
  let nextId = 1;
  const timeouts = new Map();
  const intervals = new Map();

  return {
    timeouts,
    intervals,
    setTimeout(callback, delay = 0) {
      const id = nextId++;
      timeouts.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) { timeouts.delete(id); },
    setInterval(callback, delay = 0) {
      const id = nextId++;
      intervals.set(id, { callback, delay });
      return id;
    },
    clearInterval(id) { intervals.delete(id); },
    runInterval(id) {
      const timer = intervals.get(id);
      assert(timer, `expected interval ${id} to remain scheduled`);
      timer.callback();
    },
    runNextTimeout(delay) {
      const entry = Array.from(timeouts.entries()).find(([, timer]) => timer.delay === delay);
      assert(entry, `expected a scheduled ${delay}ms timeout`);
      const [id, timer] = entry;
      timeouts.delete(id);
      timer.callback();
    }
  };
}

function makeElement() {
  return {
    id: '',
    style: {},
    children: [],
    classList: { add() {}, remove() {}, toggle() {} },
    appendChild(child) { this.children.push(child); return child; },
    remove() {},
    querySelector() { return null; },
    getElementsByTagName() { return []; },
    addEventListener() {},
    removeEventListener() {},
    getBoundingClientRect() { return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }; }
  };
}

function createMutations() {
  return {
    cookieClicks: 0,
    tickerClicks: 0,
    achievementClicks: 0,
    tinyCookieClicks: 0,
    buildingPurchases: 0,
    upgradePurchases: 0,
    heavenlyPurchases: 0,
    pantheonActions: 0,
    minigameActions: 0,
    promptCloses: 0,
    promptConfirms: 0,
    ascends: 0,
    reincarnations: 0,
    intentWrites: 0
  };
}

function makeAchievement(id, won, mutations, name = `Achievement ${id}`) {
  return {
    id,
    name,
    won,
    pool: 'normal',
    ddesc: name,
    click() { mutations.achievementClicks++; }
  };
}

function createGame(options = {}) {
  const mutations = options.mutations || createMutations();
  const serialized = options.serialized || {};
  const achievementWon = serialized.achievementWon || [];
  const achievementsById = [];
  const achievements = {};
  for (let id = 0; id < 1000; id++) {
    const won = achievementWon.length ? Boolean(achievementWon[id]) : true;
    const achievement = makeAchievement(id, won, mutations);
    achievementsById[id] = achievement;
    achievements[achievement.name] = achievement;
  }
  const namedAchievements = {
    Neverclick: achievementsById[29],
    Hardcore: achievementsById[92],
    Reincarnation: achievementsById[206],
    'Here be dragon': makeAchievement(9990, true, mutations),
    'So much to do so much to see': makeAchievement(9991, true, mutations)
  };
  Object.assign(achievements, namedAchievements);

  const upgradesById = [];
  for (let id = 0; id < 1000; id++) {
    upgradesById[id] = {
      id,
      name: `Upgrade ${id}`,
      bought: true,
      unlocked: false,
      canBePurchased: false,
      getPrice() { return 100; },
      buy() { mutations.upgradePurchases++; return false; }
    };
  }
  upgradesById[363] = {
    id: 363,
    name: 'Synthetic Heavenly Upgrade',
    bought: false,
    unlocked: true,
    canBePurchased: true,
    getPrice() { return 1; },
    buy() {
      if (this.bought) return false;
      this.bought = true;
      mutations.heavenlyPurchases++;
      return true;
    }
  };

  const minigame = {
    slot: [],
    gods: {},
    harvestAll() { mutations.minigameActions++; },
    sellGood() { mutations.minigameActions++; },
    assignGod() { mutations.pantheonActions++; },
    useMagic() { mutations.minigameActions++; },
    castSpell() { mutations.minigameActions++; },
    click() { mutations.minigameActions++; }
  };
  const objectsById = [];
  for (let id = 0; id < 20; id++) {
    objectsById[id] = {
      id,
      name: id === 0 ? 'Cursor' : `Building ${id}`,
      amount: 0,
      level: 0,
      locked: id !== 0,
      price: 100 + id,
      storedCps: 0,
      minigame: id === 2 ? minigame : null,
      getPrice() { return this.price; },
      getSumPrice() { return this.price; },
      buy() { mutations.buildingPurchases++; },
      sell() {},
      each() {}
    };
  }
  const objects = { Temple: objectsById[2] };

  const game = {
    ready: serialized.ready === undefined ? true : serialized.ready,
    OnAscend: Boolean(serialized.OnAscend),
    AscendTimer: serialized.AscendTimer || 0,
    ReincarnateTimer: serialized.ReincarnateTimer || 0,
    ascendScreenIdentity: serialized.ascendScreenIdentity || 'synthetic-screen-1',
    promptIdentity: serialized.promptIdentity || 'synthetic-prompt-1',
    promptOn: serialized.promptOn === undefined ? true : serialized.promptOn,
    nextAscensionMode: serialized.nextAscensionMode || 0,
    ascensionMode: serialized.ascensionMode || 0,
    ascendMeterPercent: 0,
    ascendMeterLevel: 0,
    prestige: 0,
    heavenlyChips: 0,
    resets: 0,
    startDate: Date.now(),
    fullDate: Date.now(),
    cookies: 0,
    cookiesPs: 1,
    unbuffedCps: 1,
    cookieClicks: 16,
    computedMouseCps: 1,
    bakeryName: 'Synthetic Bakery',
    bakeryNameL: { textContent: 'Synthetic Bakery' },
    fps: 30,
    windowW: 1000,
    BuildingsOwned: 0,
    UpgradesOwned: 0,
    milkProgress: 0,
    milkHd: 0,
    buyMode: 0,
    onMenu: '',
    buffs: {},
    shimmerTypes: { golden: { n: 0 } },
    shimmers: [],
    Achievements: achievements,
    AchievementsById: achievementsById,
    Upgrades: { 'Sugar frenzy': { unlocked: false, bought: true, buy() { mutations.upgradePurchases++; } } },
    UpgradesById: upgradesById,
    UpgradesInStore: [],
    Objects: objects,
    ObjectsById: objectsById,
    wrinklers: [],
    TickerEffect: false,
    tickerL: { click() { mutations.tickerClicks++; }, scrollIntoView() {} },
    ClickCookie() { mutations.cookieClicks++; },
    ClickTinyCookie() { mutations.tinyCookieClicks++; },
    Win() {},
    ShowMenu() {},
    hasBuff() { return false; },
    Has() { return false; },
    isMinigameReady(building) { return Boolean(building && building.minigame); },
    storeBulkButton() {},
    UpdateMenu() {},
    ClosePrompt() { mutations.promptCloses++; this.promptOn = false; },
    ConfirmPrompt() { mutations.promptConfirms++; this.promptOn = false; },
    bakeryNamePrompt() { this.promptOn = true; },
    PickAscensionMode() { this.nextAscensionMode = 1; },
    AssignPermanentSlot() {},
    PutUpgradeInPermanentSlot() {},
    SetDragonAura() {},
    ToggleSpecialMenu() {},
    Ascend() { mutations.ascends++; },
    Reincarnate() {
      mutations.reincarnations++;
      this.OnAscend = false;
    },
    registerMod(_name, mod) {
      this.mod = mod;
      if (mod && mod.init) mod.init();
    },
    registerHook(kind, callback) {
      this.hooks = this.hooks || { logic: [], draw: [], reincarnate: [] };
      this.hooks[kind].push(callback);
    }
  };
  Object.assign(game, {
    OnAscend: Boolean(serialized.OnAscend),
    AscendTimer: serialized.AscendTimer || 0,
    ReincarnateTimer: serialized.ReincarnateTimer || 0,
    ascendScreenIdentity: serialized.ascendScreenIdentity || 'synthetic-screen-1',
    promptIdentity: serialized.promptIdentity || 'synthetic-prompt-1',
    promptOn: serialized.promptOn === undefined ? true : serialized.promptOn,
    nextAscensionMode: serialized.nextAscensionMode || 0,
    ascensionMode: serialized.ascensionMode || 0
  });
  game.LoadMod = (url) => {
    options.loadRequests.push(url);
    assert.strictEqual(url, bundleUrl, 'the shipped wrapper must request the stable TypeScript bundle URL');
    vm.runInContext(bundle, options.context, { filename: bundlePath });
  };

  return { game, mutations };
}

function serializeModeledSave(game) {
  return JSON.stringify({
    OnAscend: game.OnAscend,
    AscendTimer: game.AscendTimer,
    ReincarnateTimer: game.ReincarnateTimer,
    ascendScreenIdentity: game.ascendScreenIdentity,
    promptIdentity: game.promptIdentity,
    promptOn: game.promptOn,
    nextAscensionMode: game.nextAscensionMode,
    ascensionMode: game.ascensionMode,
    ascendMeterPercent: game.ascendMeterPercent,
    ascendMeterLevel: game.ascendMeterLevel,
    prestige: game.prestige,
    heavenlyChips: game.heavenlyChips,
    resets: game.resets,
    cookies: game.cookies,
    cookiesPs: game.cookiesPs,
    cookieClicks: game.cookieClicks,
    achievementWon: game.AchievementsById.map((achievement) => Boolean(achievement.won))
  });
}

function createRuntime(options = {}) {
  const storage = options.storage || createStorage();
  if (!storage.values.has('autoplayConfig')) {
    storage.values.set('autoplayConfig', JSON.stringify({
      UseGameHooks: options.useHooks ? 1 : 0,
      ClickMode: 1,
      GoldenClickMode: 0,
      CheatLumps: 0,
      CheatGolden: 0,
      BotMode: 1
    }));
  }
  const scheduler = createScheduler();
  const loadRequests = [];
  const context = vm.createContext({
    console,
    Date,
    Math,
    JSON,
    performance: { now: () => 0 },
    setTimeout: scheduler.setTimeout,
    clearTimeout: scheduler.clearTimeout,
    setInterval: scheduler.setInterval,
    clearInterval: scheduler.clearInterval,
    localStorage: storage,
    window: { localStorage: storage },
    document: {
      body: makeElement(),
      getElementById() { return null; },
      createElement() { return makeElement(); }
    }
  });
  const mutations = createMutations();
  const serialized = options.serialized || {};
  if (serialized.ready === undefined) serialized.ready = false;
  if (options.startupClickSideEffects) {
    serialized.achievementWon = Array.from({ length: 1000 }, () => true);
    serialized.achievementWon[243] = false; // Tabloid addiction
    serialized.achievementWon[204] = false; // Here you go
    serialized.achievementWon[132] = false; // Tiny cookie
    serialized.OnAscend = true;
    serialized.promptOn = true;
  }
  const { game, mutations: gameMutations } = createGame({
    mutations,
    serialized,
    loadRequests,
    context
  });
  context.Game = game;
  context.window.Game = game;
  const readyIntervalId = scheduler.setInterval(() => {}, -1);
  vm.runInContext(wrapper, context, { filename: wrapperPath });
  // The wrapper creates its own first 1000ms interval after the sentinel.
  const wrapperReadyIntervalId = Array.from(scheduler.intervals.entries())
    .find(([id, timer]) => id !== readyIntervalId && timer.delay === 1000)[0];

  return {
    context,
    game,
    storage,
    scheduler,
    mutations: gameMutations,
    loadRequests,
    wrapperReadyIntervalId
  };
}

function loadThroughWrapper(runtime) {
  assert.strictEqual(runtime.loadRequests.length, 0, 'the wrapper waits while Game.ready is false');
  runtime.game.ready = true;
  runtime.scheduler.runInterval(runtime.wrapperReadyIntervalId);
  assert.strictEqual(runtime.loadRequests.length, 1, 'the wrapper loads the real stable bundle once ready');
  assert(runtime.context.AutoPlay, 'the full bundle creates the live AutoPlay instance');
  return runtime.context.AutoPlay;
}

function runDefaultTick(runtime) {
  runtime.scheduler.runNextTimeout(300);
}

function assertNoPlayerOwnedMutations(runtime, baseline) {
  const actualCalls = Object.fromEntries(Object.entries(runtime.mutations).map(([key, value]) => [key, value]));
  assert.deepStrictEqual(actualCalls, baseline.mutations, 'gameplay, prompt, purchase, ascend, and reincarnate calls stay inert');
  assert.deepStrictEqual(JSON.stringify(runtime.context.AutoPlay.state), baseline.state, 'bot action state stays unchanged');
  assert.deepStrictEqual(Array.from(runtime.storage.values.entries()), baseline.storage, 'same-origin intent/config storage stays unchanged');
  assert.strictEqual(runtime.storage.writes.length, baseline.storageWrites, 'localStorage receives no writes');
  assert.strictEqual(serializeModeledSave(runtime.game), baseline.gameSave, 'modeled save and Ascend state stay unchanged');
  assert.strictEqual(runtime.context.AutoPlay.onAscend, baseline.botOwnership, 'bot ownership remains unchanged');
  assert.strictEqual(runtime.game.OnAscend, true, 'the player-owned Ascend screen remains open');
  assert.strictEqual(runtime.game.promptOn, true, 'the player prompt remains open');
  assert.strictEqual(runtime.game.nextAscensionMode, baseline.nextAscensionMode, 'the selected ascension mode stays unchanged');
  assert.strictEqual(runtime.game.ascendScreenIdentity, baseline.screenIdentity, 'the same ascend screen remains active');
  assert.strictEqual(runtime.game.promptIdentity, baseline.promptIdentity, 'the same prompt remains active');
}

function assertPlayerOwnedStartupIsInert(runtime, bot) {
  assert.deepStrictEqual(runtime.mutations, createMutations(), 'startup does not run gameplay or screen mutators');
  assert.strictEqual(runtime.storage.writes.length, 0, 'startup does not write config or achievement intent');
  assert.strictEqual(bot.state.isInitialized, false, 'gameplay initialization remains deferred');
  assert.strictEqual(bot.state.nextAchievement, 0);
  assert.strictEqual(bot.state.finished, false);
  assert.strictEqual(bot.state.wantAscend, false);
  assert.strictEqual(bot.state.hyperActive, false);
  assert.strictEqual(bot.state.mainActivity, 'Doing nothing in particular.');
  assert.strictEqual(bot.state.activities, 'Doing nothing in particular.');
  assert.strictEqual(bot.state.delay, 0);
  assert.strictEqual(bot.state.nextPurchase, null);
  assert.strictEqual(bot.state.nextPurchaseType, null);
  assert.strictEqual(bot.state.nextPurchasePP, null);
  assert.strictEqual(bot.state.nextPurchasePrice, null);
  assert.strictEqual(JSON.stringify(bot.state.moduleTimings), '{}');
  assert.strictEqual(bot.onAscend, false, 'startup does not claim the player-owned screen');
  assert.strictEqual(runtime.game.OnAscend, true);
  assert.strictEqual(runtime.game.promptOn, true);
}

function playerOwnedDefaultTicksAndReload() {
  const runtime = createRuntime({ startupClickSideEffects: true, useHooks: false });
  const bot = loadThroughWrapper(runtime);
  assertPlayerOwnedStartupIsInert(runtime, bot);
  bot.state.delay = 5; // Model an existing pause that must not be consumed by the screen.
  const baseline = {
    mutations: { ...runtime.mutations },
    state: JSON.stringify(bot.state),
    storage: Array.from(runtime.storage.values.entries()),
    storageWrites: runtime.storage.writes.length,
    gameSave: serializeModeledSave(runtime.game),
    botOwnership: bot.onAscend,
    nextAscensionMode: runtime.game.nextAscensionMode,
    screenIdentity: runtime.game.ascendScreenIdentity,
    promptIdentity: runtime.game.promptIdentity
  };

  for (let tick = 0; tick < 5; tick++) {
    runDefaultTick(runtime);
    assertNoPlayerOwnedMutations(runtime, baseline);
  }

  const syntheticSavedGame = JSON.parse(serializeModeledSave(runtime.game));
  const reloaded = createRuntime({
    startupClickSideEffects: false,
    useHooks: false,
    storage: runtime.storage,
    serialized: syntheticSavedGame
  });
  const reloadedBot = loadThroughWrapper(reloaded);
  assertPlayerOwnedStartupIsInert(reloaded, reloadedBot);
  reloadedBot.state.delay = 5;
  const reloadedBaseline = {
    mutations: { ...reloaded.mutations },
    state: JSON.stringify(reloadedBot.state),
    storage: Array.from(reloaded.storage.values.entries()),
    storageWrites: reloaded.storage.writes.length,
    gameSave: serializeModeledSave(reloaded.game),
    botOwnership: reloadedBot.onAscend,
    nextAscensionMode: reloaded.game.nextAscensionMode,
    screenIdentity: reloaded.game.ascendScreenIdentity,
    promptIdentity: reloaded.game.promptIdentity
  };
  for (let tick = 0; tick < 5; tick++) {
    runDefaultTick(reloaded);
    assertNoPlayerOwnedMutations(reloaded, reloadedBaseline);
  }

  reloaded.game.OnAscend = false;
  reloaded.game.promptOn = false;
  reloadedBot.state.delay = 0;
  runDefaultTick(reloaded);
  assert(reloaded.mutations.tickerClicks > 0, 'deferred achievement discovery resumes after player exit');
  assert(reloaded.mutations.cookieClicks > 0, 'normal default-timer gameplay resumes after player exit');
  assert.strictEqual(reloadedBot.state.isInitialized, true, 'deferred startup completes once the screen and timers clear');
  const exitIntent = reloaded.storage.getItem(intentKey);
  assert(!exitIntent || JSON.parse(exitIntent).state !== 'due',
    'deferred discovery does not infer due status from a bare won bit');
  const tickerClicksAfterStartup = reloaded.mutations.tickerClicks;
  runDefaultTick(reloaded);
  assert.strictEqual(reloaded.mutations.tickerClicks, tickerClicksAfterStartup,
    'deferred startup discovery runs only once');
}

function playerOwnedNativeHookTicks() {
  const runtime = createRuntime({ startupClickSideEffects: true, useHooks: true });
  const bot = loadThroughWrapper(runtime);
  assertPlayerOwnedStartupIsInert(runtime, bot);
  bot.state.delay = 5;
  assert(runtime.game.hooks && runtime.game.hooks.logic.length === 1, 'native logic hook stays registered');
  const baseline = {
    mutations: { ...runtime.mutations },
    state: JSON.stringify(bot.state),
    storage: Array.from(runtime.storage.values.entries()),
    storageWrites: runtime.storage.writes.length,
    gameSave: serializeModeledSave(runtime.game),
    botOwnership: bot.onAscend,
    nextAscensionMode: runtime.game.nextAscensionMode,
    screenIdentity: runtime.game.ascendScreenIdentity,
    promptIdentity: runtime.game.promptIdentity
  };
  for (let tick = 0; tick < 5; tick++) {
    runtime.game.hooks.logic[0]();
    assertNoPlayerOwnedMutations(runtime, baseline);
  }

  runtime.game.OnAscend = false;
  runtime.game.promptOn = false;
  runtime.game.hooks.logic[0]();
  assert(runtime.mutations.tickerClicks > 0, 'native-hook startup discovery resumes after player exit');
  assert(runtime.mutations.cookieClicks > 0, 'normal native-hook gameplay resumes after player exit');
  const tickerClicksAfterStartup = runtime.mutations.tickerClicks;
  runtime.game.hooks.logic[0]();
  assert.strictEqual(runtime.mutations.tickerClicks, tickerClicksAfterStartup,
    'native deferred startup discovery runs only once');
}

function oldSaveWonBitDoesNotBecomeAscensionIntent() {
  const won = Array.from({ length: 1000 }, () => true);
  won[oldSaveWonTarget] = true;
  const runtime = createRuntime({
    useHooks: false,
    serialized: { achievementWon: won, ascensionMode: 1, promptOn: false }
  });
  const bot = loadThroughWrapper(runtime);
  assert.notStrictEqual(bot.nextAchievement, oldSaveWonTarget, 'startup selects a goal beyond the old-save won achievement');
  runDefaultTick(runtime);
  const rawIntent = runtime.storage.getItem(intentKey);
  assert(!rawIntent || JSON.parse(rawIntent).state !== 'due', 'a bare won bit is not promoted to a due intent');
  assert.strictEqual(runtime.mutations.ascends, 0, 'old-save achievement state does not trigger an ascent');
}

function botOwnedAscensionStillCompletesWithoutOrdinaryGameplay() {
  const runtime = createRuntime({ useHooks: false });
  const bot = loadThroughWrapper(runtime);
  const clicksBefore = runtime.mutations.cookieClicks;
  // Keep the facade out of the end-phase-only API branch; this field is part
  // of the game fixture, and the selected target is already won.
  bot.nextAchievement = oldSaveWonTarget;
  runtime.game.OnAscend = true;
  runtime.game.ascendScreenIdentity = 'bot-owned-screen';
  bot.onAscend = true;
  runDefaultTick(runtime);
  assert.strictEqual(runtime.mutations.heavenlyPurchases, 1, 'bot-owned ascent can still buy an eligible heavenly upgrade');
  assert.strictEqual(runtime.mutations.reincarnations, 1, 'bot-owned ascent still reincarnates');
  assert.strictEqual(runtime.mutations.cookieClicks, clicksBefore, 'ordinary clicking stays paused on the bot-owned screen');
}

playerOwnedDefaultTicksAndReload();
playerOwnedNativeHookTicks();
oldSaveWonBitDoesNotBecomeAscensionIntent();
botOwnedAscensionStillCompletesWithoutOrdinaryGameplay();
console.log('Full TypeScript userscript wrapper and bundle ascension ownership regressions passed.');
