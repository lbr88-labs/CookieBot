/**
 * Manages wrinkler popping strategy
 *
 * This module handles:
 * - Deciding when to pop wrinklers (all at once or one at a time)
 * - Finding the best wrinkler to pop based on cookies sucked
 * - Detecting shiny wrinklers (type === 1)
 * - Calculating wrinkler value
 * - Managing wrinkler-related achievements
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class WrinklerManager {
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Main wrinkler handling logic
     * Runs periodically to manage wrinkler popping strategy
     */
    handleWrinklers(): void;
    /**
     * Determine if we should pop all wrinklers at once
     * This is done for:
     * - Easter/Halloween seasons (for cookie drops)
     * - Unholy bait achievement (Moistburster)
     * - End phase achievement (Last Chance to See)
     */
    private shouldPopAllWrinklers;
    /**
     * Pop all attached wrinklers
     */
    private popAllWrinklers;
    /**
     * Handle single wrinkler popping strategy
     * Pops one wrinkler every 2 hours
     */
    private handleSingleWrinklerPopping;
    /**
     * Find the next wrinkler to pop
     * Selects the wrinkler with the most cookies sucked
     * If there's an empty spot, don't pop any wrinkler (let it fill up)
     */
    private findNextWrinkler;
    /**
     * Check if a wrinkler is shiny
     * Shiny wrinklers have type === 1 and are rarer/more valuable
     */
    isShinyWrinkler(wrinkler: Wrinkler): boolean;
    /**
     * Calculate the value (cookies) stored in a wrinkler
     * This is the amount of cookies that would be returned when popped
     * Shiny wrinklers return 3x the normal amount
     */
    getWrinklerValue(wrinkler: Wrinkler): number;
    /**
     * Get total value stored in all wrinklers
     */
    getTotalWrinklerValue(): number;
    /**
     * Count attached wrinklers
     */
    getAttachedWrinklerCount(): number;
    /**
     * Count shiny wrinklers
     */
    getShinyWrinklerCount(): number;
    /**
     * Check if current season is finished (all upgrades collected)
     * Delegates to SeasonHandler
     */
    private seasonFinished;
    /**
     * Check if we're in the end phase (all achievements collected)
     * Returns true when nextAchievement is NOT in the wantedAchievements list
     * (meaning we've completed all wanted achievements and moved to the end phase)
     */
    private isEndPhase;
    /**
     * Get current wrinkler manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=WrinklerManager.d.ts.map