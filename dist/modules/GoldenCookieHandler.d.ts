/**
 * Handles Golden Cookies, Reindeer, and other shimmers
 * Migrated from cookieAutoPlayBeta.js "Handle Cookies and Golden Cookies" section
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class GoldenCookieHandler {
    private context;
    private cheatMax;
    private cheatMaxTime;
    private hyperActive;
    constructor(context: AutoPlayContext);
    /**
     * Get current GoldenClickMode (from live config)
     */
    private getGoldenClickMode;
    /**
     * Get current CheatGolden (from live config)
     */
    private getCheatGolden;
    /**
     * Returns whether the bot is in hyperactive mode (frequent updates needed)
     */
    isHyperActive(): boolean;
    /**
     * Reset hyperactive flag (call at start of each cycle)
     */
    resetHyperActive(): void;
    /**
     * Main handler for golden cookies and reindeer
     * Pops first golden cookie or reindeer based on configuration
     */
    handleGoldenCookies(): void;
    /**
     * Click a shimmer and track the cookies gained
     */
    private clickShimmerWithTracking;
    /**
     * Cheat golden cookies by advancing their spawn timer
     */
    private cheatGoldenCookies;
    /**
     * Check if we're in a frenzy buff state
     */
    hasFrenzyBuff(): boolean;
    /**
     * Check if we have a specific buff active
     */
    hasBuff(buffName: string): boolean;
    /**
     * Get remaining time for a buff in seconds
     */
    getBuffTimeRemaining(buffName: string): number;
    /**
     * Get current golden cookie handler status
     */
    getStatus(): ModuleStatus;
    /**
     * Get the name of the currently active buff (if any)
     */
    private getActiveBuff;
}
//# sourceMappingURL=GoldenCookieHandler.d.ts.map