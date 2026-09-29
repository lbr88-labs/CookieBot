// Type definitions for Cookie Clicker game objects
// This is a partial definition - we'll expand as needed

interface CookieClickerGame {
  ready: boolean;
  version: number;
  beta: number;
  local: boolean;
  https: boolean;
  resPath: string;

  // Methods
  Launch: () => void;
  Init: () => void;
  Load: (callback: () => void) => void;
  Save: () => void;
  WriteSave: (type?: number) => string;
  LoadSave: (data?: string) => void;
  Reset: (hard?: boolean) => void;
  HardReset: (bypass?: number) => void;

  // UI
  l: HTMLElement;
  wrapper: HTMLElement;
  onMenu: string;
  ShowMenu: (menu: string) => void;
  ToggleSpecialMenu: (menu: number) => void;
  specialTab: string;
  Prompt: (content: string, options?: string[]) => void;
  ClosePrompt: () => void;
  Notify: (title: string, desc: string, icon?: [number, number] | number[], quick?: number) => void;
  Popup: (text: string, x?: number, y?: number) => void;

  // Game state
  T: number;
  drawT: number;
  loopT: number;
  fps: number;

  cookies: number;
  cookiesEarned: number;
  cookiesd: number;
  cookiesPs: number;
  cookiesPsRaw: number;
  cookiesPsRawHighest: number;
  cookiesReset: number;
  cookieClicks: number;
  goldenClicks: number;
  goldenClicksLocal: number;
  missedGoldenClicks: number;
  handmadeCookies: number;

  prestige: number;
  heavenlyChips: number;
  heavenlyChipsDisplayed: number;
  heavenlyChipsSpent: number;
  heavenlyCookies: number;
  permanentUpgrades: number[];
  ascensionMode: number;
  resets: number;

  lumps: number;
  lumpsTotal: number;
  lumpT: number;
  lumpRefill: number;
  lumpCurrentType: number;
  lumpMatureAge: number;
  lumpRipeAge: number;
  lumpOverripeAge: number;

  season: string;
  baseSeason: string;
  seasonT: number;
  seasonUses: number;

  elderWrath: number;
  elderWrathD: number;
  pledges: number;
  pledgeT: number;
  researchT: number;
  nextResearch: number;

  cookiesSucked: number;
  cpsSucked: number;
  wrinklersPopped: number;

  santaLevel: number;
  reindeerClicked: number;

  dragonLevel: number;
  dragonAura: number;
  dragonAura2: number;
  dragonLevels: DragonLevel[];

  fortuneGC: number;
  fortuneCPS: number;

  // Collections
  Objects: { [key: string]: Building };
  ObjectsById: Building[];
  ObjectsN: number;

  Upgrades: { [key: string]: Upgrade };
  UpgradesById: Upgrade[];
  UpgradesInStore: Upgrade[];
  UpgradesN: number;
  UpgradesOwned: number;

  Achievements: { [key: string]: Achievement };
  AchievementsById: Achievement[];
  AchievementsN: number;
  AchievementsOwned: number;

  Buffs: { [key: string]: Buff };
  hasBuff: (name: string) => Buff | false;
  gainBuff: (name: string, time: number, arg1?: number, arg2?: number, arg3?: number) => void;

  shimmerTypes: { [key: string]: ShimmerType };
  shimmers: Shimmer[];
  wrinklers: Wrinkler[];

  // Methods
  LoadMod: (url: string) => void;
  registerMod: (id: string, mod: any) => void;
  registerHook: (hook: string, func: Function) => void;

  Earn: (amount: number) => void;
  Spend: (amount: number) => void;

  Win: (what: string) => void;
  Unlock: (what: string) => void;
  Lock: (what: string) => void;
  Has: (what: string) => boolean;
  HasUnlocked: (what: string) => boolean;
  HasAchiev: (what: string) => number;

  UpgradeSanta: () => void;
  UpgradeDragon: () => void;
  SetDragonAura: (aura: number, slot: number) => void;

  CalculateGains: () => void;
  recalculateGains: number;

  // Helpers
  GetHeavenlyMultiplier: () => number;
  GetTieredCpsMult: (me: Building) => number;

  // Other
  prefs: Prefs;
  Loader: Loader;

  // Legacy/Helper
  unbuffedCps: number; // Calculated by mods usually
  mouseDown: number;
  keys: number[];

  // Added from existing d.ts
  RuinTheFun: () => void;
  CollectWrinklers: () => void;
  Ascend: (mode: number) => void;
  Reincarnate: (mode: number) => void;
  storeBulkButton: (mode: number) => void;
  isMinigameReady: (building: Building) => boolean;
  getWrinklersMax: () => number;
  ClickSpecialPic: () => void;
  ConfirmPrompt: () => void;
  tickerL: HTMLElement;

  // Minigame helpers
  modifyBuildingPrice: (building: Building, price: number) => number;
  eff: (name: string) => number;
  auraMult: (name: string) => number;
  hasGod: (name: string) => number;

  // Helper functions
  CountsAsUpgradeOwned: (pool: string) => boolean;
  CountsAsAchievementOwned: (pool: string) => boolean;
  BuildAscendTree: (upgrade: Upgrade) => void;
  setOnCrate: (what: any) => void;
  tooltip: {
    hide: () => void;
  };
  choiceSelectorOn: number;
  upgradesToRebuild: number;

  // Missing properties from original d.ts
  sesame: boolean;
  buyMode: number;
  OnAscend: boolean;
  startDate: number;
  BuildingsOwned: number;
}

interface Prefs {
  particles: number;
  numbers: number;
  autosave: number;
  autoupdate: number;
  milk: number;
  fancy: number;
  warn: number;
  cursors: number;
  focus: number;
  format: number;
  notifs: number;
  wobbly: number;
  monospace: number;
  filters: number;
  cookieSound: number;
  crates: number;
  showBackupWarning: number;
  extraButtons: number;
  askLumps: number;
  customGrandmas: number;
  timeout: number;
}

interface Loader {
  assets: any[];
  assetsLoading: any[];
  assetsLoaded: any[];
  Load: (assets: string[]) => void;
}

interface Minigame {
  onResize?: () => void;
  save?: () => string;
  load?: (str: string) => void;
  launch?: () => void;
  logic?: () => void;
  draw?: () => void;
  // Add specific minigame methods as needed (Garden, Grimoire, etc.)
  // Garden
  plants?: { [key: string]: any };
  plot?: any[];
  harvestAll?: () => void;
  // Grimoire
  spells?: { [key: string]: any };
  castSpell?: (spell: any, obj: any) => void;
  magic?: number;
  magicM?: number;
  // Pantheon
  gods?: { [key: string]: any };
  slot?: any[];
  // Market
  goods?: { [key: string]: any };
}

interface Buff {
  name: string;
  time: number;
  maxTime: number;
  multCpS: number;
  multClick: number;
  // Add other buff properties as needed
}

interface DragonLevel {
  name: string;
  action: string;
  costStr: () => string;
  cost: () => boolean;
}

interface Building {
  id: number;
  name: string;
  dname: string;
  displayName: string;
  single: string;
  plural: string;
  bsingle: string;
  bplural: string;
  actionName: string;
  desc: string;

  basePrice: number;
  price: number;
  bulkPrice: number;

  cps: number;
  baseCps: number;
  storedCps: number;
  storedTotalCps: number;

  amount: number;
  bought: number;
  highest: number;
  free: number;

  locked: number;
  level: number;
  vanilla: number;

  icon: number;
  iconColumn: number;
  art: { base: string; pic: string; bg: string };

  buyFunction?: () => void;
  sellFunction?: () => void;

  minigameUrl: number | string;
  minigameName: number | string;
  onMinigame: boolean;
  minigameLoaded: boolean;
  minigame?: Minigame;

  tieredUpgrades: any;
  tieredAchievs: any;
  synergies: any[];
  fortune: any;

  productionAchievs: { pow: number; achiev: Achievement }[];

  // Methods
  switchMinigame: (on: boolean) => void;
  getPrice: (n?: number) => number;
  getSumPrice: (amount: number) => number;
  getReverseSumPrice: (amount: number) => number;
  getSellMultiplier: () => number;
  buy: (amount?: number) => void;
  sell: (amount: number, bypass?: number) => void;
  refresh: () => void;
  mute: (val: number) => void;

  // Added from existing d.ts
  sacrifice: (amount: number) => void;
  levelUp: () => void;

  // Visuals
  canvas: HTMLCanvasElement;
  mousePos: [number, number];
  mouseOn: boolean;
  pics: { pic: string; x: number; y: number }[]; // Kept from old d.ts
}

interface Upgrade {
  id: number;
  name: string;
  dname: string;
  desc: string;
  baseDesc: string;

  basePrice: number;
  priceLumps: number;

  icon: [number, number];

  bought: number;
  unlocked: number;

  order: number;
  pool: string;
  power: number;
  vanilla: number;

  unlockAt: number;
  techUnlock: any[];
  parents: any[];
  type: string;
  tier: number;
  buildingTie: number | Building;

  kitten?: number;
  toggleInto?: string;

  // Methods
  getType: () => string;
  getPrice: () => number;
  canBuy: () => boolean;
  isVaulted: () => boolean;
  vault: () => void;
  unvault: () => void;
  click: (e?: any) => void;
  buy: (bypass?: boolean) => void;
  earn: () => void;

  // Functions
  buyFunction?: () => void;
  unlockFunction?: () => void;
  clickFunction?: () => boolean;
  choicesFunction?: () => any[];
  activateFunction?: () => void;
}

interface Achievement {
  id: number;
  name: string;
  dname: string;
  desc: string;
  baseDesc: string;

  icon: [number, number];

  won: number;
  disabled: number;

  order: number;
  pool: string;
  vanilla: number;
  type: string;

  // Methods
  click: () => void;
  getType: () => string;
  toggle: () => void;

  // Added from existing d.ts
  hide: number;
}

interface Shimmer {
  type: string;
  life: number;
  dur: number;
  force: string;
  wrath: number;
  l: HTMLElement;
  pop: (e?: any) => void;
}

interface ShimmerType {
  maxTime: number;
  minTime: number;
  time: number;
  spawnConditions?: () => boolean;
  initFunc?: (shimmer: Shimmer) => void;
  updateFunc?: (shimmer: Shimmer) => void;
  popFunc?: (shimmer: Shimmer) => void;
}

interface Wrinkler {
  id: number;
  close: number;  // 0 = not attached, 1 = attached
  sucked: number; // Amount of cookies sucked
  phase: number;  // Animation phase
  type: number;   // 0 = normal, 1 = shiny
  hp: number;     // Health points
  selected: number; // Whether wrinkler is selected for clicking
  x: number;
  y: number;
  r: number;
}

// CookieMonster data structures
interface CookieMonsterBuildingData {
  pp: number;  // Payback Period in seconds
  bonus: number;  // CPS bonus this building provides
  roi: number;  // Return on Investment
}

interface CookieMonsterUpgradeData {
  pp: number;  // Payback Period in seconds
  bonus: number;  // CPS bonus this upgrade provides
  roi: number;  // Return on Investment
}

interface CookieMonsterCache {
  AverageClicks: number;  // Average clicks per second
  WrinklersTotal: number;  // Total cookies stored in wrinklers
}

interface CookieMonsterDataType {
  Cache: CookieMonsterCache;
  Objects1: { [key: string]: CookieMonsterBuildingData };  // Data for buying 1 building
  Objects10: { [key: string]: CookieMonsterBuildingData };  // Data for buying 10 buildings
  Upgrades: { [key: string]: CookieMonsterUpgradeData };  // Data for upgrades
}

// Global Game object
declare const Game: CookieClickerGame;

// Global CookieMonster data (may be undefined if not installed)
declare const CookieMonsterData: CookieMonsterDataType | undefined;

// Global helper function to get elements by ID
declare function l(id: string): HTMLElement;
declare function loc(str: string, params?: any): string;
declare function choose(arr: any[]): any;
declare function Beautify(val: number, floats?: number): string;
