/**
 * Manages ascension decisions and heavenly upgrades
 */
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
interface AscensionState {
    ascendLimit: number;
    loggedAchievements: {
        [key: number]: boolean;
    };
    neverclickWarn: boolean;
    resetTime: number;
}
export interface AchievementAscensionIntent {
    version: 1;
    state: 'armed' | 'due';
    targetId: number;
    run: {
        startDate: number;
        fullDate: number;
        resets: number;
    };
}
export declare class AscensionManager {
    private state;
    private context;
    private pendingAscension;
    private achievementAscensionIntent;
    private achievementAscensionIntentLoaded;
    private achievementAscensionStorageWarningLogged;
    private achievementAscensionCallStarted;
    constructor(context: AutoPlayContext);
    /**
     * Safely confirm a prompt, handling cases where the game loop might be paused
     */
    private safeConfirm;
    /**
     * Main handler for ascension logic
     * Checks achievements, prestige levels, and decides when to ascend
     */
    handleAscend(): void;
    /**
     * Handle heavenly upgrade purchases during ascension
     */
    handleHeavenlyUpgrades(): void;
    /**
     * Check all achievements and log newly won ones
     */
    private checkAchievements;
    /**
     * Handle when the target achievement is won
     */
    private handleAchievementWon;
    /**
     * Read and validate CookieBot's small run-bound achievement intent marker.
     * A won bit without this marker never becomes an ascension decision.
     */
    getAchievementAscensionIntent(): AchievementAscensionIntent | null;
    /** Arm the current unearned goal unless a due intent already has priority. */
    armAchievementAscensionIntent(targetId: number): AchievementAscensionIntent | null;
    /** Clear the marker only after the game accepted the ascent or it is invalid. */
    clearAchievementAscensionIntent(): void;
    private getAchievementAscensionRun;
    private isFiniteRun;
    private getAchievementAscensionTarget;
    private getAchievementAscensionStorage;
    private persistAchievementAscensionIntent;
    private removeAchievementAscensionStorage;
    private warnAchievementAscensionStorageUnavailable;
    private getAchievementAscensionWaitReason;
    /**
     * Check for endless cycle achievement (1000 ascends)
     */
    private checkEndlessCycle;
    /**
     * Check for reincarnation achievement (100 ascends)
     */
    private checkReincarnation;
    /**
     * Check if it's time to ascend based on days in run
     */
    private checkTimeBasedAscension;
    /**
     * Check for lucky digit/number/payout heavenly upgrades
     */
    private checkLuckyUpgrades;
    /**
     * Check if we can continue with special achievement runs
     * Returns true if working on special achievement, false otherwise
     */
    private canContinue;
    /**
     * Public method to trigger ascension with a reason
     * Used by special achievement logic like runJustRight()
     */
    triggerAscend(reason: string, log?: boolean): void;
    /**
     * Perform the actual ascension
     */
    private doAscend;
    /**
     * Handle reincarnation (after ascending)
     */
    private doReincarnate;
    /**
     * Buy all available heavenly upgrades
     */
    private buyHeavenlyUpgrades;
    /**
     * Assign a permanent upgrade slot
     */
    private assignPermanentSlot;
    /**
     * Get current ascension state (for external access)
     */
    getState(): AscensionState;
    /**
     * Get current ascension manager status
     */
    getStatus(): ModuleStatus;
    private getLiveAscensionWaitBlocker;
    private isHardcoreAchievement;
}
export {};
//# sourceMappingURL=AscensionManager.d.ts.map