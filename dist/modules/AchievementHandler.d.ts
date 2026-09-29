/**
 * Handles achievement hunting (small achievements, ascension-related)
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class AchievementHandler {
    private context;
    private lastPromptTime;
    private originalBakeryName;
    constructor(context: AutoPlayContext);
    /**
     * Safely confirm a prompt, handling cases where the game loop might be paused
     */
    private safeConfirm;
    /**
     * Handle small achievements that can be obtained through simple interactions
     */
    handleSmallAchievements(): void;
    /**
     * Undunk the cookie after getting the achievement
     */
    private undunkCookie;
    /**
     * Redeem a previously sent gift
     */
    private redeemPresent;
    /**
     * Find the next achievement to pursue
     */
    findNextAchievement(): void;
    /**
     * Check if all achievements have been obtained
     */
    checkAllAchievementsOK(): boolean;
    /**
     * Main handler called periodically
     */
    handleAchievements(): void;
    /**
     * Check if we are in a rapid ascension mode (Endless Cycle or Reincarnation)
     */
    private isRapidAscending;
    /**
     * Get achievement handler status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=AchievementHandler.d.ts.map