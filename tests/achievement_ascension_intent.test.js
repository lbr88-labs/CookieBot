const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'cookieAutoPlayBeta.js'), 'utf8');
const wantedStart = source.indexOf('AutoPlay.wantedAchievements =');
const wantedEnd = source.indexOf(';', wantedStart) + 1;
const ascensionStart = source.indexOf('AutoPlay.ascendLimit =');
const ascensionEnd = source.indexOf('AutoPlay.checkAllAchievementsOK = function()', ascensionStart);
assert(wantedStart >= 0 && wantedEnd > wantedStart, 'wanted-achievement list found');
assert(ascensionStart >= 0 && ascensionEnd > ascensionStart, 'ascension runtime found');

const wantedContext = { AutoPlay: {} };
vm.createContext(wantedContext);
vm.runInContext(source.slice(wantedStart, wantedEnd), wantedContext);
const wantedIds = Array.from(wantedContext.AutoPlay.wantedAchievements);
const markerKey = 'CookieBot_AchievementAscensionIntent_v1';
const now = 2_000_000_000_000;

function createStorage(initial) {
  const values = new Map(Object.entries(initial || {}));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    value(key) { return values.has(key) ? values.get(key) : null; }
  };
}

function achievement(id, name, won) {
  return { id, name: name || `Achievement ${id}`,
    won: won === true ? 1 : won === false ? 0 : won,
    ddesc: `<q>ignored</q>Description ${id}`, pool: '' };
}

function createGame(options) {
  options = options || {};
  const firstUnearned = options.firstUnearned === undefined ? 453 : options.firstUnearned;
  const targetIndex = wantedIds.indexOf(firstUnearned);
  const achievementsById = Object.create(null);
  const achievements = Object.create(null);
  wantedIds.forEach((id, index) => {
    const isWon = targetIndex >= 0 && index < targetIndex;
    const entry = achievement(id, undefined, isWon);
    achievementsById[id] = entry;
    achievements[entry.name] = entry;
  });
  [
    ['Hardcore', 9001], ['Neverclick', 9002], ['True Neverclick', 9003],
    ['Endless cycle', 9004], ['Reincarnation', 9005]
  ].forEach(([name, id]) => {
    const entry = achievement(id, name, false);
    achievementsById[id] = entry;
    achievements[name] = entry;
  });
  const buffs = Object.create(null);
  const upgrades = Object.create(null);
  [
    'Chocolate egg', 'Sucralosia Inutilis', 'Lucky payout',
    'Permanent upgrade slot V', 'Lucky digit', 'Lucky number', 'Season switcher'
  ].forEach(name => { upgrades[name] = { name, bought: false, unlocked: false }; });
  Object.values(upgrades).forEach(upgrade => {
    upgrade.buy = function() { this.bought = true; };
  });

  return {
    startDate: now - 60 * 60 * 1000,
    fullDate: now - 4 * 60 * 60 * 1000,
    resets: 4,
    now,
    ascendMeterPercent: 0,
    ascendMeterLevel: options.meter === undefined ? 400 : options.meter,
    prestige: options.prestige === undefined ? 1000 : options.prestige,
    heavenlyChips: 0,
    cookiesEarned: 0,
    ascensionMode: 0,
    dragonLevel: 0,
    AscendTimer: 0,
    ReincarnateTimer: 0,
    OnAscend: false,
    Achievements: achievements,
    AchievementsById: achievementsById,
    Upgrades: upgrades,
    Objects: { Farm: {}, Bank: { minigame: { profit: 0 } } },
    ObjectsById: [],
    wrinklers: [],
    buffs,
    ascendCalls: 0,
    ascendArguments: [],
    failingAscendCalls: 0,
    hasBuff(name) { return !!this.buffs[name]; },
    sayTime() { return 'time'; },
    isMinigameReady() { return false; },
    Ascend() {
      this.ascendCalls++;
      this.ascendArguments.push(Array.from(arguments));
      if (this.failingAscendCalls > 0) {
        this.failingAscendCalls--;
        throw new Error('synthetic Game.Ascend failure');
      }
    }
  };
}

function createRuntime(game, storage) {
  const statuses = [];
  const actions = [];
  const context = vm.createContext({
    Game: game,
    AutoPlay: {},
    window: { localStorage: storage },
    Beautify: String,
    Date,
    Math,
    isFinite
  });
  vm.runInContext(source.slice(wantedStart, wantedEnd), context);
  vm.runInContext(source.slice(ascensionStart, ascensionEnd), context);
  const bot = context.AutoPlay;
  bot.now = game.now;
  bot.Config = { NightMode: 0 };
  bot.plantPending = false;
  bot.handleSmallAchievements = function() {};
  bot.checkAllAchievementsOK = function() { this.nextAchievement = 99; };
  bot.canContinue = function() { return false; };
  bot.preNightMode = function() { return !!game.nightMode; };
  bot.info = function() {};
  bot.addActivity = function() {};
  bot.logStatus = function(type, message) { statuses.push({ type, message }); };
  bot.logAction = function(action, details) { actions.push({ action, details }); };
  bot.logging = function() {};
  bot.setDeadline = function() {};
  bot.assignSpirit = function() {};
  bot.statuses = statuses;
  bot.actions = actions;
  return { bot, game, storage, statuses, actions };
}

function readMarker(storage) {
  const raw = storage.value(markerKey);
  return raw === null ? null : JSON.parse(raw);
}

function armAndWin(runtime) {
  runtime.bot.findNextAchievement();
  assert.strictEqual(runtime.bot.nextAchievement, 453);
  assert.strictEqual(readMarker(runtime.storage).state, 'armed');
  runtime.game.AchievementsById[453].won = 1;
}

// Synthetic, nonprivate immediate-ascent setup and exact repro:
// 1. Create the in-memory Game below with an unearned target 453, prestige 1000,
//    meter 400, no timers/buffs/plant, and empty localStorage.
// 2. findNextAchievement arms target 453; marking its Cookie Clicker won bit as
//    numeric 1 makes that intent due.
// 3. handleAscend should invoke Game.Ascend(true) once and consume the marker.
// Run: node tests/achievement_ascension_intent.test.js
// This proves the call contract only; it does not simulate a live game transition.
{
  const storage = createStorage();
  const game = createGame({ prestige: 1000, meter: 400 });
  const runtime = createRuntime(game, storage);
  armAndWin(runtime);
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1, 'eligible due target starts one ascent immediately');
  assert.deepStrictEqual(game.ascendArguments[0], [true], 'achievement ascent uses the game API flag');
  assert.strictEqual(runtime.bot.onAscend, true, 'successful call transfers ownership to CookieBot');
  assert.strictEqual(storage.value(markerKey), null, 'successful call consumes the due marker');
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1, 'follow-up check cannot duplicate the ascent');
}

// An old save's already-won 453 has no intent to ascend; the next target is 470.
{
  const storage = createStorage();
  const runtime = createRuntime(createGame({ firstUnearned: 470 }), storage);
  runtime.bot.findNextAchievement();
  assert.strictEqual(runtime.bot.nextAchievement, 470);
  runtime.bot.handleAscend();
  assert.strictEqual(runtime.game.ascendCalls, 0);
  assert.strictEqual(readMarker(storage).state, 'armed');
  assert.strictEqual(readMarker(storage).targetId, 470);
}

// Armed targets become due before reselection and remain due across reloads and waits.
for (const guard of ['plant', 'Sugar frenzy', 'Sugar blessing']) {
  const storage = createStorage();
  const game = createGame();
  const firstRuntime = createRuntime(game, storage);
  armAndWin(firstRuntime);
  if (guard === 'plant') firstRuntime.bot.plantPending = true;
  else game.buffs[guard] = true;
  firstRuntime.bot.handleAscend();
  assert.strictEqual(readMarker(storage).state, 'due', `${guard}: armed target becomes due`);
  assert.strictEqual(game.ascendCalls, 0, `${guard}: first check waits`);

  const reloaded = createRuntime(game, storage);
  reloaded.bot.findNextAchievement();
  assert.strictEqual(reloaded.bot.nextAchievement, 453, `${guard}: due target survives reload`);
  if (guard === 'plant') reloaded.bot.plantPending = true;
  for (let i = 0; i < 3; i++) reloaded.bot.handleAscend();
  assert.strictEqual(readMarker(storage).state, 'due', `${guard}: repeated checks keep intent`);
  assert.strictEqual(game.ascendCalls, 0, `${guard}: repeated checks do not ascend`);
  assert(reloaded.statuses.some(entry => entry.type === 'ascend:waiting' &&
    entry.message.includes(guard === 'plant' ? 'plant' : guard)), `${guard}: wait status is visible`);

  if (guard === 'plant') reloaded.bot.plantPending = false;
  else game.buffs[guard] = false;
  reloaded.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1, `${guard}: one ascent starts after the guard clears`);
  assert.strictEqual(storage.value(markerKey), null, `${guard}: successful call consumes the marker`);
  reloaded.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1, `${guard}: repeated checks do not duplicate ascent`);
}

// Animation and Chocolate egg preparation keep intent until the actual call.
{
  const storage = createStorage();
  const game = createGame();
  const runtime = createRuntime(game, storage);
  armAndWin(runtime);
  game.AscendTimer = 1;
  runtime.bot.handleAscend();
  assert.strictEqual(readMarker(storage).state, 'due');
  assert.strictEqual(game.ascendCalls, 0);
  game.AscendTimer = 0;
  game.Upgrades['Chocolate egg'].unlocked = true;
  runtime.bot.handleAscend();
  assert.strictEqual(game.Upgrades['Chocolate egg'].bought, true);
  assert.strictEqual(readMarker(storage).state, 'due');
  assert.strictEqual(game.ascendCalls, 0);
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1);
  assert.strictEqual(storage.value(markerKey), null);
}

// Night mode and first-run prestige keep a due marker until their gates clear.
{
  const storage = createStorage();
  const game = createGame();
  const runtime = createRuntime(game, storage);
  armAndWin(runtime);
  runtime.bot.Config.NightMode = 1;
  game.nightMode = true;
  runtime.bot.handleAscend();
  assert.strictEqual(readMarker(storage).state, 'due');
  assert.strictEqual(game.ascendCalls, 0);
  game.nightMode = false;
  game.prestige = 0;
  game.ascendMeterLevel = 364;
  runtime.bot.handleAscend();
  assert.strictEqual(readMarker(storage).state, 'due');
  assert.strictEqual(game.ascendCalls, 0);
  game.ascendMeterLevel = 365;
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1);
}

// The first-ascension Hardcore exception remains active.
{
  const storage = createStorage();
  const game = createGame({ prestige: 0, meter: 364 });
  const runtime = createRuntime(game, storage);
  const hardcore = game.Achievements.Hardcore;
  hardcore.won = 1;
  runtime.bot.persistAchievementAscensionIntent({
    version: 1,
    state: 'due',
    targetId: hardcore.id,
    run: runtime.bot.getAchievementAscensionRun()
  });
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1);
}

// Malformed, stale, unknown-version, unknown-target and unearned-due records fail closed.
{
  const staleRun = { startDate: now - 1, fullDate: now - 4 * 60 * 60 * 1000, resets: 4 };
  const currentRun = { startDate: now - 60 * 60 * 1000,
    fullDate: now - 4 * 60 * 60 * 1000, resets: 4 };
  const invalidMarkers = [
    '{bad json',
    JSON.stringify({ version: 2, state: 'due', targetId: 453, run: currentRun }),
    JSON.stringify({ version: 1, state: 'due', targetId: 453, run: staleRun }),
    JSON.stringify({ version: 1, state: 'due', targetId: 999999, run: currentRun }),
    JSON.stringify({ version: 1, state: 'due', targetId: 470, run: currentRun })
  ];
  for (const marker of invalidMarkers) {
    const storage = createStorage({ [markerKey]: marker });
    const runtime = createRuntime(createGame({ firstUnearned: 470 }), storage);
    runtime.bot.findNextAchievement();
    assert.strictEqual(runtime.bot.nextAchievement, 470);
    runtime.bot.handleAscend();
    assert.strictEqual(runtime.game.ascendCalls, 0);
    const replacement = readMarker(storage);
    assert(replacement && replacement.version === 1 && replacement.state === 'armed' &&
      replacement.targetId === 470, 'invalid marker is removed before the next target is armed');
  }
}

// A thrown game call retains due intent and reports no successful ascent.
{
  const storage = createStorage();
  const game = createGame();
  const runtime = createRuntime(game, storage);
  armAndWin(runtime);
  game.failingAscendCalls = 1;
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1);
  assert.strictEqual(readMarker(storage).state, 'due');
  assert.strictEqual(runtime.bot.onAscend, false);
  assert.strictEqual(runtime.actions.filter(entry => entry.action === 'Ascending').length, 0);
  assert(runtime.statuses.some(entry => entry.type === 'ascend:waiting' &&
    entry.message.includes('call failed')));
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 2);
  assert.strictEqual(storage.value(markerKey), null);
  assert.strictEqual(runtime.actions.filter(entry => entry.action === 'Ascending').length, 1);
}

// Storage failures do not throw or erase in-session armed/due state.
{
  const unavailable = {
    getItem() { throw new Error('storage blocked'); },
    setItem() { throw new Error('storage blocked'); },
    removeItem() { throw new Error('storage blocked'); }
  };
  const game = createGame();
  const runtime = createRuntime(game, unavailable);
  runtime.bot.findNextAchievement();
  assert.strictEqual(runtime.bot.achievementAscensionIntent.state, 'armed');
  game.AchievementsById[453].won = 1;
  runtime.bot.plantPending = true;
  runtime.bot.handleAscend();
  assert.strictEqual(runtime.bot.achievementAscensionIntent.state, 'due');
  assert.strictEqual(game.ascendCalls, 0);
  runtime.bot.plantPending = false;
  runtime.bot.handleAscend();
  assert.strictEqual(game.ascendCalls, 1);
  assert.strictEqual(runtime.bot.achievementAscensionIntent, null);
}

// Only Cookie Clicker's numeric 0/1 values (or legacy booleans) are valid won bits.
{
  const storage = createStorage();
  const runtime = createRuntime(createGame(), storage);
  runtime.bot.findNextAchievement();
  const marker = runtime.bot.achievementAscensionIntent;
  marker.state = 'due';
  runtime.bot.persistAchievementAscensionIntent(marker);
  runtime.game.AchievementsById[453].won = 2;
  assert.strictEqual(runtime.bot.getAchievementAscensionIntent(), null);
  assert.strictEqual(storage.value(markerKey), null);
}

console.log('Achievement ascension intent regression passed.');
