/**
 * Main AutoPlay class that coordinates all modules
 */

import { ClickManager } from './modules/ClickManager';
import { GoldenCookieHandler } from './modules/GoldenCookieHandler';
import { SavingsManager } from './modules/SavingsManager';
import { PurchaseManager } from './modules/PurchaseManager';
import { SeasonHandler } from './modules/SeasonHandler';
import { SugarLumpManager } from './modules/SugarLumpManager';
import { WrinklerManager } from './modules/WrinklerManager';
import { AchievementHandler } from './modules/AchievementHandler';
import { AscensionManager } from './modules/AscensionManager';
import { DragonManager } from './modules/DragonManager';
import { Dashboard } from './modules/Dashboard';
import { ConfigManager } from './modules/ConfigManager';
import { NightMode } from './modules/NightMode';
import { PantheonManager } from './modules/PantheonManager';
import { GrimoireManager } from './modules/GrimoireManager';
import { GardenManager } from './modules/GardenManager';
import { StockMarketManager } from './modules/StockMarketManager';
import type { AutoPlayConfig, AutoPlayState } from './types/autoplay';
import { WANTED_ACHIEVEMENTS, LUMP_RELATED_ACHIEVEMENTS, BUILDING_IDS, UPGRADE_IDS, ACHIEVEMENT_IDS } from './constants/gameIds';
import { Logger } from './utils/Logger';

export default class AutoPlay {
  // Version
  static readonly version = '2.052-127';

  // State
  private config: AutoPlayConfig;
  private state: AutoPlayState;

  // Public Config object (matches original AutoPlay.Config structure)
  // Dashboard and modules read from this
  public Config: {
    BotMode: number;
    NightMode: number;
    ClickMode: number;
    GoldenClickMode: number;
    SavingStrategy: number;
    CheatLumps: number;
    CheatGolden: number;
    ShowDashboard: number;
    HardcoreMode: number;
    FPS: number;
    [key: string]: number;
  };

  // Modules
  private clickManager: ClickManager;
  private goldenCookieHandler: GoldenCookieHandler;
  private savingsManager: SavingsManager;
  private purchaseManager: PurchaseManager;
  private seasonHandler: SeasonHandler;
  private sugarLumpManager: SugarLumpManager;
  private wrinklerManager: WrinklerManager;
  private achievementHandler: AchievementHandler;
  private ascensionManager: AscensionManager;
  private dragonManager: DragonManager;
  private dashboard: Dashboard;
  private configManager: ConfigManager;
  private nightMode: NightMode;
  private pantheonManager: PantheonManager;
  private grimoireManager: GrimoireManager;
  private gardenManager: GardenManager;
  private stockMarketManager: StockMarketManager;

  // Public properties for global AutoPlay access (needed by modules)
  wantedAchievements: number[] = [];
  lateAchievements: number[] = [];
  robotName: string = 'Automated ';
  backupHeight: number = 0;
  giftCode: number | string = 0;
  onAscend: boolean = false; // Flag to prevent duplicate ascension calls
  loggingInfo: string | number = 0;
  private tickCounter: number = 0; // For native mod hook scheduling

  // Permanent slot arrays
  kittens: number[] = [31, 32, 54, 108, 187, 320, 321, 322, 425, 442, 462, 494, 613, 766, 865];
  cursors: number[] = [0, 1, 2, 3, 4, 5, 6, 43, 82, 109, 188, 189, 660, 764, 873];
  maxBuildings: number[] = [826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 858];
  butterBiscuits: number[] = [334, 335, 336, 337, 400, 477, 478, 479, 497, 659, 699, 767, 862];
  expensive: number[] = [
    38, 39, 40, 41, 42, 55, 56, 80, 81, 88, 89, 90, 104, 105, 106, 107,
    120, 121, 122, 123, 150, 151, 256, 257, 258, 259, 260, 261, 262, 263,
    338, 339, 340, 341, 342, 343, 350, 351, 352, 403, 404, 405, 406, 407,
    444, 445, 446, 447, 448, 453, 454, 455, 456, 457, 458, 464, 465, 466, 467, 468, 469,
    498, 499, 500, 501, 535, 536, 538, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574,
    575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588,
    607, 608, 609, 615, 616, 617, 652, 653, 654, 655, 656, 657, 658,
    678, 679, 680, 681, 682, 721, 722, 723, 724,
    807, 808, 809, 810, 811, 812, 813, 814, 815, 816,
    820, 821, 822, 823, 867, 868, 869, 870, 871, 872
  ];

  // Public accessors for state properties (proxies to this.state)
  get nextAchievement(): number { return this.state.nextAchievement; }
  set nextAchievement(value: number) { this.state.nextAchievement = value; }

  get finished(): boolean { return this.state.finished; }
  set finished(value: boolean) { this.state.finished = value; }

  get wantAscend(): boolean { return this.state.wantAscend; }
  set wantAscend(value: boolean) { this.state.wantAscend = value; }

  get mainActivity(): string {
    return this.state.mainActivity;
  }
  set mainActivity(value: string) { this.state.mainActivity = value; }

  get activities(): string {
    return this.state.activities;
  }
  set activities(value: string) { this.state.activities = value; }

  // Additional accessors for Dashboard
  get nextPurchase(): string | null {
    return this.state.nextPurchase;
  }
  set nextPurchase(value: string | null) { this.state.nextPurchase = value; }

  get nextPurchaseType(): string | null { return this.state.nextPurchaseType; }
  set nextPurchaseType(value: string | null) { this.state.nextPurchaseType = value; }

  get nextPurchasePrice(): number | null { return this.state.nextPurchasePrice; }
  set nextPurchasePrice(value: number | null) { this.state.nextPurchasePrice = value; }

  get nextPurchasePP(): number | null { return this.state.nextPurchasePP; }
  set nextPurchasePP(value: number | null) { this.state.nextPurchasePP = value; }

  get deadline(): number { return this.state.deadline; }
  set deadline(value: number) { this.state.deadline = value; }

  get now(): number { return this.state.now; }
  set now(value: number) { this.state.now = value; }

  get savingsGoal(): number { return this.config.savingsGoal; }
  set savingsGoal(value: number) { this.config.savingsGoal = value; }

  get hyperActive(): boolean { return this.state.hyperActive; }
  set hyperActive(value: boolean) { this.state.hyperActive = value; }

  get savingsStart(): number { return this.state.savingsStart; }
  set savingsStart(value: number) { this.state.savingsStart = value; }

  get statusInfo() { return this.state.statusInfo; }
  set statusInfo(value) { this.state.statusInfo = value; }

  get workingOnSpecialAchievement(): boolean { return this.state.workingOnSpecialAchievement; }
  set workingOnSpecialAchievement(value: boolean) { this.state.workingOnSpecialAchievement = value; }

  get fpsScale(): number {
    // Use Dashboard config if available (0=OFF, 1=ON), otherwise fallback to internal config
    const enabled = (this.Config.FPS !== undefined) ? (this.Config.FPS === 1) : this.config.fpsScaling;
    if (!enabled) return 1;
    const Game = (globalThis as any).Game;
    if (Game && Game.fps && Game.fps > 0) {
      // Standard FPS is 30. If FPS is higher, scale factor is < 1 (faster)
      // e.g. 60 FPS -> 30/60 = 0.5
      return Math.max(0.1, 30 / Game.fps);
    }
    return 1;
  }

  get lastTickDuration(): number { return this.state.lastTickDuration; }
  get avgTickDuration(): number { return this.state.avgTickDuration; }
  get moduleTimings(): { [key: string]: number } { return this.state.moduleTimings; }

  // Public accessors for shared context
  get cpsMult(): number {
    const Game = (globalThis as any).Game;
    return Game.cookiesPs / Game.unbuffedCps;
  }

  get canUseLumps(): boolean {
    return this.sugarLumpManager.getCanUseLumps();
  }

  get poppingWrinklers(): boolean {
    return this.state.poppingWrinklers;
  }
  set poppingWrinklers(value: boolean) {
    this.state.poppingWrinklers = value;
  }

  get resetTime(): number {
    return this.state.resetTime || this.state.now;
  }

  get cheatGolden(): number {
    return this.config.cheatGolden;
  }

  get wrinklerTime(): number { return this.state.wrinklerTime; }
  set wrinklerTime(value: number) { this.state.wrinklerTime = value; }

  get nextWrinkler(): number { return this.state.nextWrinkler; }
  set nextWrinkler(value: number) { this.state.nextWrinkler = value; }

  get lumpRelatedAchievements(): number[] {
    return this.lateAchievements;
  }

  get lumpHarvestAchievements(): number[] {
    return this.lateAchievements;
  }

  // Public methods expected by modules
  info(message: string): void {
    console.log(`[CookieBot] ${message}`);
  }

  setMainActivity(activity: string): void {
    // When mainActivity changes, reset activities to the new base
    if (this.state.mainActivity !== activity) {
      this.state.mainActivity = activity;
      this.state.activities = activity;
    }
  }

  addActivity(activity: string): boolean {
    if (!this.state.activities.includes(activity)) {
      this.state.activities += '<div class="line"></div>' + activity;
      return true;
    }
    return false;
  }

  logAction(action: string, details?: string): void {
    if (this.dashboard) {
      this.dashboard.logAction(action, details);
    }
  }

  logStatus(category: string, message: string, details?: string): void {
    if (this.dashboard) {
      this.dashboard.logStatus(category, message, details);
    }
  }

  /**
   * Log game state to localStorage (legacy feature)
   * Used during ascension to save state
   */
  logging(): void {
    if (!this.loggingInfo) return;
    try {
      const Game = (globalThis as any).Game;
      const before = localStorage.getItem("autoplayLog") || "";
      const toAdd = "#logging autoplay V" + AutoPlay.version + " with " +
        this.loggingInfo + "\n" + Game.WriteSave(1) + "\n";
      this.loggingInfo = 0;
      localStorage.setItem("autoplayLog", before + toAdd);
    } catch (e) {
      console.error('Logging error:', e);
    }
  }

  /**
   * Find next achievement to target (delegates to AchievementHandler)
   */
  findNextAchievement(): void {
    if (this.achievementHandler) {
      this.achievementHandler.findNextAchievement();
    }
  }

  constructor() {
    // Initialize default configuration
    this.config = this.getDefaultConfig();
    this.state = this.getDefaultState();

    // Initialize public Config object (matches original structure)
    // This will be synchronized with Dashboard's config after Dashboard is created
    this.Config = {
      BotMode: 1,
      NightMode: 1,
      ClickMode: 1,
      GoldenClickMode: 1,
      SavingStrategy: 1,
      CheatLumps: 1,
      CheatGolden: 1,
      ShowDashboard: 1,
      HardcoreMode: 1,
      FPS: 1,
      UseGameHooks: 0
    };

    // Initialize public achievement arrays
    this.wantedAchievements = [...WANTED_ACHIEVEMENTS];
    this.lateAchievements = [...LUMP_RELATED_ACHIEVEMENTS];

    // Create ConfigManager and Dashboard
    this.configManager = new ConfigManager(this as any);

    // Register global options
    this.configManager.registerOption('BotMode', {
      options: [
        { value: 0, label: 'IDLE' },
        { value: 1, label: 'AUTO' },
        { value: 2, label: 'MANUAL' }
      ],
      label: ['IDLE', 'AUTO', 'MANUAL'], // Legacy support
      desc: 'Cookiebot global mode (work in progress)'
    }, 1);

    this.configManager.registerOption('GameSpeed', {
      options: [
        { value: 30, label: 'Normal (30 fps)' },
        { value: 60, label: 'Fast (60 fps)' },
        { value: 144, label: 'Faster (144 fps)' },
        { value: 300, label: 'Hyper (300 fps)' }
      ],
      label: ['Normal (30 fps)', 'Fast (60 fps)', 'Faster (144 fps)', 'Hyper (300 fps)'],
      desc: 'Adjust game speed (FPS). Warning: High speeds may crash the game. Not saved.'
    }, 0, 'Cheats');

    this.configManager.registerOption('FPS', {
      options: [
        { value: 0, label: 'OFF' },
        { value: 1, label: 'ON' }
      ],
      label: ['OFF', 'ON'], // Legacy support
      desc: 'Scale timers based on game FPS (smoother at >30fps)'
    }, 1);

    this.configManager.registerOption('UseGameHooks', {
      options: [
        { value: 0, label: 'OFF' },
        { value: 1, label: 'ON' }
      ],
      label: ['OFF', 'ON'], // Legacy support
      desc: 'Use native game hooks (logic/draw) instead of timers. WARNING: Might trigger "Cheated cookies" achievement.'
    }, 0);

    this.dashboard = new Dashboard(this as any, this.configManager);

    // Sync Config with ConfigManager's config system
    this.Config = this.configManager.getConfig() as typeof this.Config;

    // Helper methods for logging and activities (now dashboard exists)
    const logAction = (action: string, details?: string) => {
      // Dashboard handles all action history tracking
      this.dashboard.logAction(action, details);
    };

    const logStatus = (type: string, message: string, details?: string) => {
      // Dashboard handles all status history tracking
      this.dashboard.logStatus(type, message, details);
    };

    const addActivity = (activity: string): boolean => {
      // Original uses string concatenation with HTML, not array
      // Check for duplicates before adding
      if (!this.state.activities.includes(activity)) {
        this.state.activities += '<div class="line"></div>' + activity;
        return true;
      }
      return false;
    };

    // Initialize centralized logger AFTER dashboard created
    Logger.initialize({
      logAction,
      logStatus,
      addActivity,
    });

    // Initialize modules with proper constructor arguments
    // Use this.Config (original structure) instead of this.config (TypeScript structure)
    this.clickManager = new ClickManager(this as any);

    this.goldenCookieHandler = new GoldenCookieHandler(this as any);

    this.savingsManager = new SavingsManager(this as any);

    this.purchaseManager = new PurchaseManager(this as any);

    this.seasonHandler = new SeasonHandler(this as any);
    this.sugarLumpManager = new SugarLumpManager(this as any);
    this.wrinklerManager = new WrinklerManager(this as any);
    this.achievementHandler = new AchievementHandler(this as any);

    // Pass 'this' as context so AscensionManager can read live properties via getters
    // Cast to any to satisfy the AutoPlayContext interface (this has all required properties)
    this.ascensionManager = new AscensionManager(this as any);

    this.dragonManager = new DragonManager(this as any);
    // Dashboard already created at top of constructor
    this.nightMode = new NightMode(this as any);
    this.pantheonManager = new PantheonManager(this as any);
    this.grimoireManager = new GrimoireManager(this as any);
    this.gardenManager = new GardenManager(this as any);
    this.stockMarketManager = new StockMarketManager(this as any);

  }

  /**
   * Trigger ascension (delegates to AscensionManager)
   */
  triggerAscend(msg: string, bypass?: boolean): void {
    this.ascensionManager.triggerAscend(msg, bypass);
  }

  seasonFinished(season: string): boolean {
    return this.seasonHandler.seasonFinished(season);
  }

  handleSugarLumps(): void {
    this.sugarLumpManager.handleSugarLumps();
  }

  handleGoldenCookies(): void {
    this.goldenCookieHandler.handleGoldenCookies();
  }

  activateNightSpirits(): void {
    this.pantheonManager.activateNightSpirits();
  }

  deactivateNightSpirits(): void {
    this.pantheonManager.deactivateNightSpirits();
  }

  assignSpirit(slot: number, spirit: string, force: number): void {
    this.pantheonManager.assignSpirit(slot, spirit, force);
  }

  handleNightTrading(): void {
    this.stockMarketManager.handleNightTrading();
  }

  freezeGarden(freeze: boolean): void {
    this.gardenManager.freezeGarden(freeze);
  }

  /**
   * Initialize the bot
   */
  init(): void {
    if (this.state.isInitialized) {
      console.log('CookieBot already initialized');
      return;
    }

    console.log(`CookieBot v${AutoPlay.version} initializing...`);

    // Load saved configuration
    this.loadConfig();

    // Find first achievement to work on
    this.achievementHandler.findNextAchievement();

    // Create dashboard UI
    this.dashboard.createDashboard();
    this.dashboard.updateDashboard();

    // Update dashboard every second for real-time stats
    setInterval(() => {
      this.dashboard.render();
    }, 1000);

    // Hook into Game.UpdateMenu to add config options to preferences
    this.setupMenuHook();

    // Do an initial bestBuy check to populate purchase info for dashboard
    this.purchaseManager.bestBuy();
    const purchaseInfo = this.purchaseManager.getPurchaseInfo();
    if (purchaseInfo) {
      this.state.nextPurchase = purchaseInfo.name;
      this.state.nextPurchaseType = purchaseInfo.type;
      this.state.nextPurchasePP = purchaseInfo.pp;
      this.state.nextPurchasePrice = purchaseInfo.price;
    }

    // Check if we should use native game hooks or legacy timer
    if (this.Config.UseGameHooks === 1) {
      this.registerGameMod();
    } else {
      // Set up periodic execution
      this.scheduleNextRun();
    }

    this.state.isInitialized = true;
    console.log('CookieBot initialized successfully');
  }

  /**
   * Register the bot as a native game mod
   */
  private registerGameMod(): void {
    const Game = (globalThis as any).Game;
    if (!Game || !Game.registerMod) return;

    Game.registerMod('CookieBot', {
      init: () => {
        this.info('CookieBot native mod registered.');
        
        // Logic hook - runs every game tick (30 TPS)
        Game.registerHook('logic', () => this.hookLogic());
        
        // Draw hook - runs every frame
        Game.registerHook('draw', () => this.hookDraw());
        
        // Reincarnate hook - runs after ascension
        Game.registerHook('reincarnate', () => this.hookReincarnate());
      },
      save: () => {
        // We use our own config saving mechanism, but we could return a string here
        return JSON.stringify(this.config);
      },
      load: (str: string) => {
        // We load config separately, but could load here
        try {
          const data = JSON.parse(str);
          this.updateConfig(data);
        } catch (e) {}
      }
    });
  }

  /**
   * Native logic hook - runs every game tick (30 times/sec)
   */
  private hookLogic(): void {
    const Game = (globalThis as any).Game;

    // Special handling for ascension screen - allow AscensionManager to run
    if (Game.OnAscend) {
      // Don't run if reincarnating (timer active)
      if (Game.ReincarnateTimer > 0) return;

      // Respect delay even on ascension screen
      if (this.state.delay > 0) {
        this.state.delay--;
        return;
      }
      
      this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
      return;
    }

    // Pause during ascension/reincarnation animations
    if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0) {
      return;
    }

    this.tickCounter++;
    // const Game = (globalThis as any).Game; // Removed unused variable

    // Update time
    this.state.now = Date.now();

    // ===== Fast Actions (Every Tick) =====
    // These need to be as responsive as possible
    this.clickManager.handleClicking();
    this.goldenCookieHandler.handleGoldenCookies();
    
    // Speed cheat sugar lumps if level 4
    if (this.Config.CheatLumps === 4) {
      this.sugarLumpManager.handleSugarLumps();
    }

    // ===== Throttled Actions (Every 10 ticks / ~300ms) =====
    // This matches the original periodic() speed
    if (this.tickCounter % 10 === 0) {
      this.runSlowLogic();
    }
  }

  /**
   * Native draw hook - runs every frame
   */
  private hookDraw(): void {
    const Game = (globalThis as any).Game;

    // Pause during ascension/reincarnation
    if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0 || Game.OnAscend) {
      return;
    }

    // Dashboard handles its own throttling
    this.dashboard.render();
  }

  /**
   * Native reincarnate hook - runs after ascension
   */
  private hookReincarnate(): void {
    this.info('CookieBot detected reincarnation. Resetting state.');
    this.state = this.getDefaultState();
    this.state.isInitialized = true;
    // Re-apply config that might have been lost in state reset
    this.Config = this.dashboard.getConfig() as typeof this.Config;
  }

  /**
   * Shared logic for slow/periodic tasks
   * Called by periodic() (legacy) and hookLogic() (native)
   */
  private runSlowLogic(): void {
    const Game = (globalThis as any).Game;
    const startTime = performance.now();

    // Handle "Just Right" achievement (special case)
    if (this.state.nextAchievement === 397) {
      this.measureModule('JustRight', () => this.runJustRight());
      this.updateTickStats(startTime);
      return;
    }

    // Update finished state
    this.state.finished = LUMP_RELATED_ACHIEVEMENTS.every((id) => Game.AchievementsById[id].won);

    // Night mode check
    if (this.nightMode.checkNightMode() && !Game.ascensionMode) {
      this.updateTickStats(startTime);
      return;
    }

    // High-activity phase (Buying, Grimoire)
    if (this.state.hyperActive || (this.state.now >= this.state.deadline)) {
      this.state.hyperActive = false;
      this.measureModule('PurchaseManager', () => this.bestBuy());
      
      if (this.cpsMult > 100) {
        this.state.hyperActive = true;
      }
      
      this.measureModule('GrimoireManager', () => this.handleSpeedMinigames());
    }

    // Frequent ascension checks
    if (Game.ascensionMode === 1 || this.onAscend) {
      this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
    }
    if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought && Game.heavenlyChips > 77777777) {
      this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
    }

    // Deadline check
    if (this.state.now < this.state.deadline) {
      // If we are on the ascension screen, we MUST proceed to handleAscend
      if (!Game.OnAscend) {
        this.updateTickStats(startTime);
        return;
      }
    }

    // Periodic actions (every ~15 seconds in legacy, or every ~50 calls here)
    // We can just run them every time this function runs (every 300ms)
    // The modules themselves usually have internal checks or are cheap enough

    // Set robot name
    const bakeryName = (Game as any).bakeryNameL.textContent;
    const robotName = 'Automated ';
    if (bakeryName.slice(0, robotName.length) !== robotName) {
      (Game as any).bakeryNameL.textContent = robotName + bakeryName;
    }

    this.state.activities = this.state.mainActivity;

    if (!Game.onMenu) {
      this.status(false);
    }

    if (this.state.plantPending) {
      Logger.addActivity('Make sure to harvest the new plant before ascend!');
    }

    // Calculate dynamic deadline
    let dynamicDeadline = 5000 * this.fpsScale;
    if (this.state.nextPurchasePrice && Game.cookiesPs > 0) {
      const availableCookies = Game.cookies - (this.config.savingsGoal || 0);
      const needsForPurchase = this.state.nextPurchasePrice - availableCookies;

      if (needsForPurchase > 0) {
        let timeToAfford = (needsForPurchase / Game.cookiesPs) * 1000;
        const bufferTime = 500 * this.fpsScale;
        timeToAfford = Math.max(timeToAfford - bufferTime, 100 * this.fpsScale);
        
        const maxWait = 5000 * this.fpsScale;
        if (timeToAfford <= maxWait) {
          dynamicDeadline = timeToAfford;
        } else {
          const remainder = timeToAfford % maxWait;
          if (remainder > 1000 * this.fpsScale) {
            dynamicDeadline = remainder;
          } else {
            dynamicDeadline = maxWait;
          }
        }
        dynamicDeadline = Math.max(dynamicDeadline, 100 * this.fpsScale);
      } else {
        dynamicDeadline = 100 * this.fpsScale;
      }
    }

    this.state.deadline = this.state.now + dynamicDeadline;
    this.setDeadline(this.state.now + (this.state.now - Game.startDate) / 10);

    // Run periodic modules
    if (this.config.cheatLumps !== 4 && this.config.autoSugarLumps) {
      this.measureModule('SugarLumpManager', () => this.sugarLumpManager.handleSugarLumps());
    }

    if (this.config.savingsEnabled) {
      this.savingsManager.setCurrentTime(this.state.now);
      this.measureModule('SavingsManager', () => this.savingsManager.handleSavings());
    }

    if (this.config.autoSeason) {
      this.measureModule('SeasonHandler', () => this.seasonHandler.handleSeasons());
    }

    this.measureModule('DragonManager', () => this.dragonManager.handleDragon());

    if (this.config.autoWrinklers) {
      this.measureModule('WrinklerManager', () => this.wrinklerManager.handleWrinklers());
    }

    this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
    this.handleMinigames();
    this.handleNotes();

    if (!this.state.workingOnSpecialAchievement) {
      if (!Game.AchievementsById[ACHIEVEMENT_IDS.ELDER].won) {
        Logger.addActivity('Getting 7 grandma types');
      }
      if (Game.AchievementsById[ACHIEVEMENT_IDS.ELDER].won &&
        Game.UpgradesById[UPGRADE_IDS.BINGO_CENTERRESEARCH_FACILITY].unlocked &&
          Game.ascensionMode !== 1 &&
        !Game.UpgradesById[UPGRADE_IDS.BINGO_CENTERRESEARCH_FACILITY].bought) {
        Logger.addActivity('Funding the grandma research facility');
      }
    }

    this.updateTickStats(startTime);
  }

  /**
   * Hook into Game.UpdateMenu to add config options to preferences menu
   */
  private setupMenuHook(): void {
    const Game = (globalThis as any).Game;

    // Backup original UpdateMenu if not already backed up
    if (!(Game as any).__originalUpdateMenu) {
      (Game as any).__originalUpdateMenu = Game.UpdateMenu;
    }

    // Override UpdateMenu to inject our config options
    const self = this;
    Game.UpdateMenu = function() {
      // Call original UpdateMenu first
      (Game as any).__originalUpdateMenu();

      // Add our config menu when on preferences screen
      if (Game.onMenu === 'prefs') {
        self.dashboard.addMenuPref();
      }
    };
  }

  /**
   * Update tick execution statistics
   */
  private updateTickStats(startTime: number): void {
    const duration = performance.now() - startTime;
    this.state.lastTickDuration = duration;
    // Exponential moving average (alpha = 0.05 for smooth updates)
    if (this.state.avgTickDuration === 0) {
      this.state.avgTickDuration = duration;
    } else {
      this.state.avgTickDuration = (this.state.avgTickDuration * 0.95) + (duration * 0.05);
    }
  }

  /**
   * Measure execution time of a module
   */
  private measureModule(name: string, fn: () => void): void {
    const start = performance.now();
    try {
      fn();
    } finally {
      const duration = performance.now() - start;
      // Use exponential moving average for module timings too
      const currentAvg = this.state.moduleTimings[name] || 0;
      if (currentAvg === 0) {
        this.state.moduleTimings[name] = duration;
      } else {
        this.state.moduleTimings[name] = (currentAvg * 0.9) + (duration * 0.1);
      }
    }
  }

  /**
   * Main execution cycle - implements 8-phase model from original
   * Runs every 300ms via setInterval
   */
  private periodic(): void {
    // Schedule next run FIRST so it always continues regardless of early returns
    this.scheduleNextRun();

    const startTime = performance.now();

    // Declare Game global
    const Game = (globalThis as any).Game;

    // ===== Phase 0: Early exits for timers =====
    if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0) {
      this.updateTickStats(startTime);
      return;
    }

    // ===== Phase 1: Delay handling =====
    if (this.state.delay > 0) {
      this.state.delay--;
      this.updateTickStats(startTime);
      return;
    }

    // ===== Phase 2: Setup =====
    this.state.now = Date.now();

    // ===== Phase 4: Fast actions (always run every 300ms) =====
    this.measureModule('ClickManager', () => this.clickManager.handleClicking());
    this.measureModule('GoldenCookieHandler', () => this.goldenCookieHandler.handleGoldenCookies());

    // Speed cheat sugar lumps if level 4
    if (this.Config.CheatLumps === 4) {
      this.measureModule('SugarLumpManager', () => this.sugarLumpManager.handleSugarLumps());
    }

    // Run shared slow logic
    this.runSlowLogic();

    // Note: scheduleNextRun() is called at the START of periodic(), not here
    this.updateTickStats(startTime);
  }

  /**
   * Schedule the next periodic execution
   * Original runs at fixed 300ms interval via setInterval
   */
  private scheduleNextRun(): void {
    let delay = 300;
    // Use Dashboard config if available (0=OFF, 1=ON), otherwise fallback to internal config
    const fpsEnabled = (this.Config.FPS !== undefined) ? (this.Config.FPS === 1) : this.config.fpsScaling;
    if (fpsEnabled) {
      const Game = (globalThis as any).Game;
      if (Game && Game.fps && Game.fps > 0) {
        // Standard FPS is 30. If FPS is higher, run faster (lower delay).
        // e.g. 60 FPS -> 300 * (30/60) = 150ms
        delay = Math.floor(300 * (30 / Game.fps));
        // Clamp to reasonable minimum (e.g. 10ms) to prevent freezing
        delay = Math.max(10, delay);
      }
    }

    setTimeout(() => this.periodic(), delay);
  }


  /**
   * Unified bestBuy - compares buildings AND upgrades by payback period
   * Delegates to BuildingManager which has full CookieMonster integration
   * Original: lines 471-615 in cookieAutoPlayBeta.js
   */
  private bestBuy(): void {
    // Delegate to BuildingManager
    this.purchaseManager.bestBuy();

    // Sync purchase info from BuildingManager to AutoPlay state
    const purchaseInfo = this.purchaseManager.getPurchaseInfo();
    if (purchaseInfo) {
      this.state.nextPurchase = purchaseInfo.name;
      this.state.nextPurchaseType = purchaseInfo.type;
      this.state.nextPurchasePP = purchaseInfo.pp;
      this.state.nextPurchasePrice = purchaseInfo.price;
    } else {
      this.state.nextPurchase = null;
      this.state.nextPurchaseType = null;
      this.state.nextPurchasePP = null;
      this.state.nextPurchasePrice = null;
    }
  }

  /**
   * Check if an upgrade should be avoided
   * (Moved to BuildingManager.shouldAvoidBuy())
   */


  /**
   * Handle speed minigames - grimoire spells
   * Runs in high-activity phase
   */
  private handleSpeedMinigames(): void {
    // Cast grimoire spells
    this.grimoireManager.handleGrimoires();
  }

  /**
   * Handle periodic minigames - garden, pantheon, stock market
   * Runs every 15 seconds
   */
  private handleMinigames(): void {
    const Game = (globalThis as any).Game;
    if (Game.ascensionMode === 1) return; // No minigames in born again mode

    // Handle pantheon spirit assignments
    this.measureModule('PantheonManager', () => this.pantheonManager.handlePantheon());

    // Handle garden planting and harvesting
    this.measureModule('GardenManager', () => this.gardenManager.handleGarden());

    // Update plantPending state from garden
    this.state.plantPending = this.gardenManager.isPlantPending();

    // Handle stock market trading
    this.measureModule('StockMarketManager', () => this.stockMarketManager.handleStockMarket());
  }

  /**
   * Handle notes - extend lifetime of game notifications
   */
  private handleNotes(): void {
    const Game = (globalThis as any).Game;
    for (const i in Game.Notes) {
      if (Game.Notes[i].quick === 0) {
        Game.Notes[i].life = 2000 * Game.fps;
        Game.Notes[i].quick = 1;
      }
    }
  }

  /**
   * Status check - calculate missing achievements/upgrades/lumps
   */
  private status(_print: boolean = true): void {
    const Game = (globalThis as any).Game;
    let ach = 0;
    let sach = 0;
    let up = 0;
    let lum = 0;
    const nonUp = [71, 72, 73, 87, 227];

    // Count missing achievements
    for (const a in Game.Achievements) {
      const me = Game.Achievements[a];
      if (!me.won && me.pool !== 'dungeon') {
        if (me.pool === 'shadow') sach++;
        ach++;
      }
    }

    // Count missing upgrades
    for (const i in Game.Upgrades) {
      const me = Game.Upgrades[i];
      if (!me.bought && me.pool !== 'debug' && me.pool !== 'toggle') {
        if (Game.resets && nonUp.includes(me.id)) continue;
        up++;
      }
    }

    // Count missing lumps for building levels
    for (const o in Game.Objects) {
      const me = Game.Objects[o];
      let maxl = 10;
      let myl = 0;
      if (me.id === 0) maxl = 12; // Cursors need level 12
      for (let l = me.level + 1; l <= maxl; l++) {
        myl += l;
      }
      lum += myl;
    }
    lum -= Game.lumps;
    if (lum < 0) lum = 0;

    // Store status info for dashboard
    this.state.statusInfo = {
      achievements: ach,
      shadowAchievements: sach,
      upgrades: up,
      lumps: lum,
    };
  }

  /**
   * Set deadline to earlier time if needed
   */
  private setDeadline(d: number): void {
    if (this.state.deadline > d) {
      this.state.deadline = d;
    }
  }

  /**
   * Check if we're in the endgame phase
   *
   * Returns true when the next achievement is NOT in the wanted list,
   * meaning we've completed all critical path achievements.
   *
   * Original: AutoPlay.endPhase()
   */
  endPhase(): boolean {
    const wantedAchievements = WANTED_ACHIEVEMENTS as readonly number[];
    return wantedAchievements.indexOf(this.state.nextAchievement) < 0;
  }

  /**
   * Check if we're in grinding mode (working on final achievements)
   *
   * Grinding mode activates when we've completed all but the last 10 achievements.
   * During grinding, the bot:
   * - Does not sleep at night (stays active 24/7)
   * - Focuses on maximizing cookie production
   *
   * Original: AutoPlay.grinding()
   * @public - Used by NightMode to determine if bot should sleep
   */
  grinding(): boolean {
    const Game = (globalThis as any).Game;
    const wantedAchievements = WANTED_ACHIEVEMENTS as readonly number[];

    // Get achievement that starts grinding (10th from end)
    const grindingStart = wantedAchievements[wantedAchievements.length - 10];

    // If we've achieved the grinding start achievement
    if (Game.AchievementsById[grindingStart].won) {
      // And we're not yet in endPhase
      if (!this.endPhase()) {
        Logger.addActivity('Grinding cookies - do not sleep at night.');
        return true;
      }
    }
    return false;
  }

  /**
   * Check if we're in cheating/aggressive mode (working on final 5 achievements)
   *
   * Cheating mode activates when we've completed all but the last 8 achievements.
   * During cheating, the bot uses aggressive golden cookie tactics.
   *
   * Original: AutoPlay.grindingCheat()
   * @public - Used by GoldenCookieHandler for aggressive tactics
   */
  grindingCheat(): boolean {
    if (!this.grinding()) return false;

    const Game = (globalThis as any).Game;
    const wantedAchievements = WANTED_ACHIEVEMENTS as readonly number[];

    // Get achievement that starts cheating (8th from end)
    const cheatingStart = wantedAchievements[wantedAchievements.length - 8];

    // If we've achieved the cheating start achievement
    if (Game.AchievementsById[cheatingStart].won) {
      return true;
    }
    return false;
  }

  /**
   * Check if it's currently pre-night mode (after 10pm)
   * Used by AscensionManager and other modules
   * @public - Used by modules that need to prepare for night
   */
  preNightMode(): boolean {
    return this.nightMode.isPreNightMode();
  }

  /**
   * Run Just Right achievement special logic
   *
   * Achievement #397 "Just Right" requires:
   * - Exactly 1 trillion (10^12) cookies baked
   * - Specific building counts (each type has 10 more than the next)
   *
   * This is a multi-phase process:
   * 1. Build up to ~100B cookies with buildings/upgrades
   * 2. Sell buildings to reach exact cookie count
   * 3. Fine-tune by clicking or buying cursors
   * 4. Ascend when exact count reached
   *
   * Original: AutoPlay.runJustRight() (lines 172-223)
   */
  private runJustRight(): void {
    const Game = (globalThis as any).Game;

    // Don't let savings interfere with this achievement
    this.config.savingsGoal = 0;

    // Disable cheats to prevent interference with exact cookie counts
    if (this.Config.CheatGolden > 0) this.Config.CheatGolden = 0;
    if (this.Config.CheatLumps > 0) this.Config.CheatLumps = 0;
    if (this.config.autoGoldenCookie) this.config.autoGoldenCookie = false;
    if (this.config.autoReindeer) this.config.autoReindeer = false;
    if (this.Config.ClickMode !== 0) this.Config.ClickMode = 0;

    Logger.addActivity('Running just right.');

    // Handle ascension checks
    this.ascensionManager.handleAscend();

    // If "You" building exists, we need to start fresh
    const youBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
    if (youBuilding && youBuilding.amount) {
      this.ascensionManager.triggerAscend('Starting to ascend just right properly.');
      return;
    }

    const goal = 1000000000000; // 1 trillion exact
    const notBuy = [0, 1, 2, 3, 4, 5, 6, 129, 324]; // Upgrades to avoid

    // Phase 1: Build up phase (< 100B cookies)
    if (Game.cookies < goal / 10) {
      // Buy buildings (each type should have 10 more than the next)
      for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
        const building = Game.ObjectsById[i];
        const nextBuilding = Game.ObjectsById[i + 1];
        const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);

        if (building.getPrice() < Game.cookies && building.amount < targetAmount) {
          building.buy(1);
          return;
        }
      }

      // Buy upgrades (except blocked ones)
      for (const upgradeId in Game.UpgradesById) {
        const upgrade = Game.UpgradesById[upgradeId];
        if (
          upgrade.unlocked &&
          !upgrade.bought &&
          upgrade.canBuy() &&
          upgrade.pool !== 'toggle' &&
          notBuy.indexOf(upgrade.id) < 0
        ) {
          upgrade.buy(true);
        }
      }
    } else {
      // Phase 2: Precision phase (>= 100B cookies)
      const cookieDiff = goal - Game.cookies;

      if (Game.BuildingsOwned === 0) {
        // Phase 2a: All buildings sold - fine-tune cookie count
        if (cookieDiff < 0) {
          // Overshot - increment counter for cursor adjustment
          if (!this.state.runRightCount) this.state.runRightCount = 0;
          this.state.runRightCount++;
        }

        if (Math.round(Game.cookiesd) === goal) {
          // Perfect! Ascend with success
          this.ascensionManager.triggerAscend('Fixed run just right.', true);
        } else if (cookieDiff < -goal && this.state.now - Game.startDate > 60000) {
          // Too far off after 1 minute - retry
          this.ascensionManager.triggerAscend('ascend just right did not work, retry.', false);
        } else if (cookieDiff < -2000000000) {
          // Way over - buy many cursors to burn cookies
          Game.ObjectsById[BUILDING_IDS.CURSOR].buy(130 + (this.state.runRightCount || 0));
        } else if (cookieDiff < -6000000) {
          // Over by 6M - buy cursors
          Game.ObjectsById[BUILDING_IDS.CURSOR].buy(90 + (this.state.runRightCount || 0));
        } else if (cookieDiff < -30000) {
          // Over by 30k - buy cursors
          Game.ObjectsById[BUILDING_IDS.CURSOR].buy(50 + (this.state.runRightCount || 0));
        } else if (cookieDiff < 0) {
          // Slightly over - buy few cursors
          Game.ObjectsById[BUILDING_IDS.CURSOR].buy(22 + (this.state.runRightCount || 0));
        } else if (cookieDiff > 10000000) {
          // Need >10M - buy bank
          Game.ObjectsById[BUILDING_IDS.BANK].buy(1);
        } else if (cookieDiff > 500000) {
          // Need >500k - buy factory
          Game.ObjectsById[BUILDING_IDS.FACTORY].buy(1);
        } else if (cookieDiff > 5000) {
          // Need >5k - buy farm
          Game.ObjectsById[BUILDING_IDS.FARM].buy(1);
        } else if (cookieDiff > 50) {
          // Need >50 - buy cursor
          Game.ObjectsById[BUILDING_IDS.CURSOR].buy(1);
        } else {
          // Very close - just click
          Game.ClickCookie();
        }
      } else {
        // Phase 2b: Still have buildings - sell them off
        if (cookieDiff / Game.cookiesPs > 1000) {
          // Need more cookies first - buy a bank
          Game.ObjectsById[BUILDING_IDS.BANK].buy(1);
        }

        // Sell excess buildings (keep 10 more than next type)
        for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
          const building = Game.ObjectsById[i];
          const nextBuilding = Game.ObjectsById[i + 1];
          const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);

          if (building.amount > targetAmount) {
            building.sell(building.amount - targetAmount);
            return;
          }

          // Sell buildings if their value would overshoot goal
          if (
            building.amount > 0 &&
            4 * building.getReverseSumPrice(building.amount) + Game.cookiesPs > cookieDiff
          ) {
            building.sell(100);
          }
        }
      }
    }
  }

  /**
   * Load configuration from localStorage
   */
  private loadConfig(): void {
    try {
      const saved = localStorage.getItem('CookieBot_Config');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.config = { ...this.config, ...parsed };
        console.log('Configuration loaded from localStorage');
      }
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  }

  /**
   * Save configuration to localStorage
   */
  saveConfig(): void {
    try {
      localStorage.setItem('CookieBot_Config', JSON.stringify(this.config));
      console.log('Configuration saved to localStorage');
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): AutoPlayConfig {
    return {
      nightMode: false,
      fontSize: 12,
      menuPos: [0, 0],
      autoGoldenCookie: true,
      autoReindeer: true,
      autoFrenzy: true,
      autoClickingFrenzy: true,
      autoElderFrenzy: false,
      autoSeason: true,
      autoAscend: false,
      autoSugarLumps: true,
      autoWrinklers: true,
      fpsScaling: true,
      clickMode: 1, // 0=off, 1=normal, 2+=aggressive
      cheatLumps: 0, // 0=off, 1=auto, 2-4=manual levels
      cheatGolden: 0, // 0=off, 1=auto, 2+=manual levels
      buyMode: 'pp',
      minCookieBank: 0,
      savingsGoal: 0,
      savingsEnabled: true,
      SavingStrategy: 0, // 0=NONE, 1=AUTO, 2=LUCKY, 3=LUCKY_FRENZY
      seasonOrder: ['christmas', 'valentines', 'easter', 'halloween'],
      currentSeasonIndex: 0,
    };
  }

  /**
   * Get default state
   */
  private getDefaultState(): AutoPlayState {
    const now = Date.now();
    return {
      version: AutoPlay.version,
      now: now,
      lastCheck: 0,
      timeToNextBuy: 0,
      delay: 0,
      deadline: now + 15000, // Start with 15s deadline
      hyperActive: false,
      nextAchievement: 0,
      workingOnSpecialAchievement: false,
      plantPending: false,
      nextPurchase: null,
      nextPurchaseType: null,
      nextPurchasePP: null,
      nextPurchasePrice: null,
      buy10: false,
      savingsStart: now,
      savingsFraction: 0,
      mainActivity: 'Doing nothing in particular.',
      activities: 'Doing nothing in particular.',
      menuVisible: false,
      nextWrinkler: -1,
      poppingWrinklers: false,
      wrinklerTime: now,
      wantAscend: false,
      finished: false,
      isInitialized: false,
      lastTickDuration: 0,
      avgTickDuration: 0,
      moduleTimings: {},
    };
  }

  /**
   * Reset the bot state and configuration to defaults
   * Allows re-initialization
   */
  reset(): void {
    this.state = this.getDefaultState();
    this.config = this.getDefaultConfig();
    this.state.isInitialized = false;
    console.log('CookieBot reset to default state.');
  }

  /**
   * Toggle dashboard visibility
   */
  toggleDashboard(): void {
    this.state.menuVisible = !this.state.menuVisible;
    this.dashboard.toggle();
  }

  /**
   * Toggle night mode
   */
  toggleNightMode(): void {
    this.config.nightMode = !this.config.nightMode;
    this.saveConfig();
  }

  /**
   * Get current configuration (for external access)
   */
  getConfig(): AutoPlayConfig {
    return this.config;
  }

  /**
   * Update configuration (for external access)
   */
  updateConfig(updates: Partial<AutoPlayConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  /**
   * Get current state (for external access)
   */
  getState(): AutoPlayState {
    return this.state;
  }
}
