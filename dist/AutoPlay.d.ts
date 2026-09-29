/**
 * Main AutoPlay class that coordinates all modules
 */
import type { AutoPlayConfig, AutoPlayState } from './types/autoplay';
export default class AutoPlay {
    static readonly version = "2.052-127";
    private config;
    private state;
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
        FPS: number;
        [key: string]: number;
    };
    private clickManager;
    private goldenCookieHandler;
    private savingsManager;
    private purchaseManager;
    private seasonHandler;
    private sugarLumpManager;
    private wrinklerManager;
    private achievementHandler;
    private ascensionManager;
    private dragonManager;
    private dashboard;
    private configManager;
    private nightMode;
    private pantheonManager;
    private grimoireManager;
    private gardenManager;
    private stockMarketManager;
    wantedAchievements: number[];
    lateAchievements: number[];
    robotName: string;
    backupHeight: number;
    giftCode: number | string;
    onAscend: boolean;
    loggingInfo: string | number;
    private tickCounter;
    kittens: number[];
    cursors: number[];
    maxBuildings: number[];
    butterBiscuits: number[];
    expensive: number[];
    get nextAchievement(): number;
    set nextAchievement(value: number);
    get finished(): boolean;
    set finished(value: boolean);
    get wantAscend(): boolean;
    set wantAscend(value: boolean);
    get mainActivity(): string;
    set mainActivity(value: string);
    get activities(): string;
    set activities(value: string);
    get nextPurchase(): string | null;
    set nextPurchase(value: string | null);
    get nextPurchaseType(): string | null;
    set nextPurchaseType(value: string | null);
    get nextPurchasePrice(): number | null;
    set nextPurchasePrice(value: number | null);
    get nextPurchasePP(): number | null;
    set nextPurchasePP(value: number | null);
    get deadline(): number;
    set deadline(value: number);
    get now(): number;
    set now(value: number);
    get savingsGoal(): number;
    set savingsGoal(value: number);
    get hyperActive(): boolean;
    set hyperActive(value: boolean);
    get savingsStart(): number;
    set savingsStart(value: number);
    get statusInfo(): import("./types/autoplay").StatusInfo | undefined;
    set statusInfo(value: import("./types/autoplay").StatusInfo | undefined);
    get workingOnSpecialAchievement(): boolean;
    set workingOnSpecialAchievement(value: boolean);
    get fpsScale(): number;
    get lastTickDuration(): number;
    get avgTickDuration(): number;
    get moduleTimings(): {
        [key: string]: number;
    };
    get cpsMult(): number;
    get canUseLumps(): boolean;
    get poppingWrinklers(): boolean;
    set poppingWrinklers(value: boolean);
    get resetTime(): number;
    get cheatGolden(): number;
    get wrinklerTime(): number;
    set wrinklerTime(value: number);
    get nextWrinkler(): number;
    set nextWrinkler(value: number);
    get lumpRelatedAchievements(): number[];
    get lumpHarvestAchievements(): number[];
    info(message: string): void;
    setMainActivity(activity: string): void;
    addActivity(activity: string): boolean;
    logAction(action: string, details?: string): void;
    logStatus(category: string, message: string, details?: string): void;
    /**
     * Log game state to localStorage (legacy feature)
     * Used during ascension to save state
     */
    logging(): void;
    /**
     * Find next achievement to target (delegates to AchievementHandler)
     */
    findNextAchievement(): void;
    constructor();
    /**
     * Trigger ascension (delegates to AscensionManager)
     */
    triggerAscend(msg: string, bypass?: boolean): void;
    seasonFinished(season: string): boolean;
    handleSugarLumps(): void;
    handleGoldenCookies(): void;
    activateNightSpirits(): void;
    deactivateNightSpirits(): void;
    assignSpirit(slot: number, spirit: string, force: number): void;
    handleNightTrading(): void;
    freezeGarden(freeze: boolean): void;
    /**
     * Initialize the bot
     */
    init(): void;
    /**
     * Register the bot as a native game mod
     */
    private registerGameMod;
    /**
     * Native logic hook - runs every game tick (30 times/sec)
     */
    private hookLogic;
    /**
     * Native draw hook - runs every frame
     */
    private hookDraw;
    /**
     * Native reincarnate hook - runs after ascension
     */
    private hookReincarnate;
    /**
     * Shared logic for slow/periodic tasks
     * Called by periodic() (legacy) and hookLogic() (native)
     */
    private runSlowLogic;
    /**
     * Hook into Game.UpdateMenu to add config options to preferences menu
     */
    private setupMenuHook;
    /**
     * Update tick execution statistics
     */
    private updateTickStats;
    /**
     * Measure execution time of a module
     */
    private measureModule;
    /**
     * Main execution cycle - implements 8-phase model from original
     * Runs every 300ms via setInterval
     */
    private periodic;
    /**
     * Schedule the next periodic execution
     * Original runs at fixed 300ms interval via setInterval
     */
    private scheduleNextRun;
    /**
     * Unified bestBuy - compares buildings AND upgrades by payback period
     * Delegates to BuildingManager which has full CookieMonster integration
     * Original: lines 471-615 in cookieAutoPlayBeta.js
     */
    private bestBuy;
    /**
     * Check if an upgrade should be avoided
     * (Moved to BuildingManager.shouldAvoidBuy())
     */
    /**
     * Handle speed minigames - grimoire spells
     * Runs in high-activity phase
     */
    private handleSpeedMinigames;
    /**
     * Handle periodic minigames - garden, pantheon, stock market
     * Runs every 15 seconds
     */
    private handleMinigames;
    /**
     * Handle notes - extend lifetime of game notifications
     */
    private handleNotes;
    /**
     * Status check - calculate missing achievements/upgrades/lumps
     */
    private status;
    /**
     * Set deadline to earlier time if needed
     */
    private setDeadline;
    /**
     * Check if we're in the endgame phase
     *
     * Returns true when the next achievement is NOT in the wanted list,
     * meaning we've completed all critical path achievements.
     *
     * Original: AutoPlay.endPhase()
     */
    endPhase(): boolean;
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
    grinding(): boolean;
    /**
     * Check if we're in cheating/aggressive mode (working on final 5 achievements)
     *
     * Cheating mode activates when we've completed all but the last 8 achievements.
     * During cheating, the bot uses aggressive golden cookie tactics.
     *
     * Original: AutoPlay.grindingCheat()
     * @public - Used by GoldenCookieHandler for aggressive tactics
     */
    grindingCheat(): boolean;
    /**
     * Check if it's currently pre-night mode (after 10pm)
     * Used by AscensionManager and other modules
     * @public - Used by modules that need to prepare for night
     */
    preNightMode(): boolean;
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
    private runJustRight;
    /**
     * Load configuration from localStorage
     */
    private loadConfig;
    /**
     * Save configuration to localStorage
     */
    saveConfig(): void;
    /**
     * Get default configuration
     */
    private getDefaultConfig;
    /**
     * Get default state
     */
    private getDefaultState;
    /**
     * Reset the bot state and configuration to defaults
     * Allows re-initialization
     */
    reset(): void;
    /**
     * Toggle dashboard visibility
     */
    toggleDashboard(): void;
    /**
     * Toggle night mode
     */
    toggleNightMode(): void;
    /**
     * Get current configuration (for external access)
     */
    getConfig(): AutoPlayConfig;
    /**
     * Update configuration (for external access)
     */
    updateConfig(updates: Partial<AutoPlayConfig>): void;
    /**
     * Get current state (for external access)
     */
    getState(): AutoPlayState;
}
//# sourceMappingURL=AutoPlay.d.ts.map