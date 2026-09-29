import type { AchievementHandler } from '../modules/AchievementHandler';
import type { AscensionManager } from '../modules/AscensionManager';
import type { ClickManager } from '../modules/ClickManager';
import type { DragonManager } from '../modules/DragonManager';
import type { GardenManager } from '../modules/GardenManager';
import type { GoldenCookieHandler } from '../modules/GoldenCookieHandler';
import type { GrimoireManager } from '../modules/GrimoireManager';
import type { NightMode } from '../modules/NightMode';
import type { PantheonManager } from '../modules/PantheonManager';
import type { PurchaseManager } from '../modules/PurchaseManager';
import type { SavingsManager } from '../modules/SavingsManager';
import type { SeasonHandler } from '../modules/SeasonHandler';
import type { StockMarketManager } from '../modules/StockMarketManager';
import type { SugarLumpManager } from '../modules/SugarLumpManager';
import type { WrinklerManager } from '../modules/WrinklerManager';
import type { ConfigManager } from '../modules/ConfigManager';

// AutoPlay state and configuration types

export interface AutoPlayConfig {
  // UI settings
  nightMode: boolean | number; // boolean for toggle, or 0=OFF, 1=AUTO, 2=ON (backward compat)
  fontSize: number;
  menuPos: [number, number];

  // Automation settings
  autoGoldenCookie: boolean;
  autoReindeer: boolean;
  autoFrenzy: boolean;
  autoClickingFrenzy: boolean;
  autoElderFrenzy: boolean;
  autoSeason: boolean;
  autoAscend: boolean;
  autoSugarLumps: boolean;
  autoWrinklers: boolean;
  fpsScaling: boolean;

  // Clicking settings
  clickMode: number; // 0=off, 1=normal, 2+=aggressive

  // Cheating settings
  cheatLumps: number; // 0=off, 1=auto, 2-4=manual levels
  cheatGolden: number; // 0=off, 1=auto, 2+=manual levels

  // Strategy settings
  buyMode: 'pp' | 'roi';
  minCookieBank: number;
  savingsGoal: number;
  savingsEnabled: boolean;
  SavingStrategy: number; // 0=NONE, 1=AUTO, 2=LUCKY, 3=LUCKY_FRENZY

  // Seasons
  seasonOrder: string[];
  currentSeasonIndex: number;
}

export interface AutoPlayContext {
  now: number;
  nextAchievement: number;
  wantedAchievements: number[];
  lumpHarvestAchievements: number[];
  lumpRelatedAchievements: number[];
  wantAscend: boolean;
  onAscend: boolean;
  Config: {
    BotMode: number;
    NightMode: number;
    ClickMode: number;
    GoldenClickMode: number;
    SavingStrategy: number;
    CheatLumps: number;
    CheatGolden: number;
    ShowDashboard: number;
    HardcoreMode: number;
    [key: string]: number;
  };
  mainActivity: string;
  activities: string;
  hyperActive: boolean;
  workingOnSpecialAchievement: boolean;
  plantPending: boolean;
  delay: number;
  deadline: number;
  finished: boolean;

  // Shared state properties
  cpsMult: number;
  savingsGoal: number;
  canUseLumps: boolean;
  poppingWrinklers: boolean;
  resetTime: number;
  cheatGolden: number;
  wrinklerTime: number;
  nextWrinkler: number;
  robotName: string;
  backupHeight: number;
  giftCode: number | string;
  lateAchievements: number[];
  runRightCount?: number;
  loggingInfo: string | number;
  logging: () => void;

  // Permanent slot arrays
  kittens: number[];
  maxBuildings: number[];
  cursors: number[];
  butterBiscuits: number[];
  expensive: number[];

  // Methods that need to be called
  info: (message: string) => void;
  logAction: (action: string, details?: string) => void;
  logStatus: (type: string, message: string, details?: string) => void;
  addActivity: (activity: string) => void;
  setMainActivity: (activity: string) => void;
  setDeadline: (time: number) => void;
  findNextAchievement: () => void;
  endPhase: () => boolean;
  grindingCheat: () => boolean;
  preNightMode: () => boolean;
  mustRebornAscend: () => boolean;
  assignSpirit: (slot: number, spirit: string, force: number) => void;
  triggerAscend: (msg: string, bypass?: boolean) => void;
  seasonFinished: (season: string) => boolean;
  grinding: () => boolean;
  handleSugarLumps: () => void;
  handleGoldenCookies: () => void;
  activateNightSpirits: () => void;
  deactivateNightSpirits: () => void;
  handleNightTrading: () => void;
  freezeGarden: (freeze: boolean) => void;

  // FPS Scaling
  fpsScale: number;

  // Performance tracking
  lastTickDuration: number;
  avgTickDuration: number;
  moduleTimings: { [key: string]: number };

  // Managers
  configManager: ConfigManager;
  clickManager?: ClickManager;
  purchaseManager?: PurchaseManager;
  gardenManager?: GardenManager;
  wrinklerManager?: WrinklerManager;
  goldenCookieHandler?: GoldenCookieHandler;
  dragonManager?: DragonManager;
  pantheonManager?: PantheonManager;
  grimoireManager?: GrimoireManager;
  stockMarketManager?: StockMarketManager;
  sugarLumpManager?: SugarLumpManager;
  ascensionManager?: AscensionManager;
  seasonHandler?: SeasonHandler;
  achievementHandler?: AchievementHandler;
  savingsManager?: SavingsManager;
  nightMode?: NightMode;
}

export interface AutoPlayState {
  version: string;
  now: number;
  lastCheck: number;
  timeToNextBuy: number;

  // Execution control
  delay: number; // Phase 1: Delay counter for pausing execution
  deadline: number; // Phase 7: Next time to run periodic tasks
  hyperActive: boolean; // Phase 5: High-activity mode flag

  // Achievement tracking
  nextAchievement: number; // Phase 2: Next achievement to work toward
  workingOnSpecialAchievement: boolean; // Phase 8: Special achievement flag
  plantPending: boolean; // Phase 8: Garden harvest warning

  // Purchase tracking
  nextPurchase: string | null; // Best next purchase item name
  nextPurchaseType: string | null; // 'building' or 'upgrade'
  nextPurchasePP: number | null; // Payback period in seconds
  nextPurchasePrice: number | null; // Price of next purchase
  buy10: boolean; // Flag to buy 10 buildings next time (Rigidel support)

  // Ascension tracking
  // onAscend: boolean; // Phase 6: Currently on ascension screen - Moved to AutoPlay class property


  // Status tracking
  statusInfo?: StatusInfo; // Cache for status() method results

  // Savings tracking
  savingsStart: number;
  savingsFraction: number;

  // Activity log
  mainActivity: string; // Base activity message, reset periodically
  activities: string; // HTML string that accumulates activity messages

  // Dashboard state
  menuVisible: boolean;

  // Wrinkler tracking
  nextWrinkler: number;
  poppingWrinklers: boolean;
  wrinklerTime: number;

  // Reset tracking
  resetTime?: number; // Time of last reincarnation

  // Ascension tracking
  wantAscend: boolean; // Preparing to ascend (avoid buying plants, etc.)
  finished: boolean; // All lump-related achievements complete

  // Temporary state
  isInitialized: boolean;

  // Performance tracking
  lastTickDuration: number;
  avgTickDuration: number;
  moduleTimings: { [key: string]: number };

  // Just Right achievement tracking
  runRightCount?: number; // Counter for cursor adjustment during Just Right achievement
}

export interface DashboardStats {
  cps: number;
  cookies: number;
  bankTarget: number;
  luckyReserve: number;
  luckyFrenzyReserve: number;
  nextBuyTime: number;
  nextBuyItem: string;
}

// Config data structure for menu
export interface ConfigOption {
  id?: string;
  type?: 'select' | 'toggle';
  label: string | string[]; // String for group label, or string[] for legacy value labels
  options?: { value: number; label: string }[];
  default?: number;
  desc: string;
}

export interface ConfigData {
  [key: string]: ConfigOption;
}

export interface Config {
  [key: string]: number;
}

// History entry types
export interface ActionHistoryEntry {
  time: Date;
  action: string;
  details?: string;
  count?: number;
}

export interface StatusHistoryEntry {
  time: Date;
  type: string; // 'goal', 'reserve', 'mode', 'achievement', 'ascend', 'dragon', 'wrinkler', etc.
  message: string;
  details?: string;
  count?: number;
}

export interface ActivityEntry {
  time: Date;
  type: 'status' | 'action';
  color: string;
  icon: string;
  tooltip: string;
  message: string;
  details?: string;
  count?: number;
}

export interface StatusInfo {
  achievements: number;
  shadowAchievements: number;
  upgrades: number;
  lumps: number;
}
