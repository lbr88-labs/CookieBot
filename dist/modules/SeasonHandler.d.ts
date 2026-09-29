/**
 * Handles seasonal events and upgrades
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class SeasonHandler {
    private context;
    private readonly valentineUpgrades;
    private readonly christmasUpgrades;
    private readonly easterUpgrades;
    private readonly halloweenUpgrades;
    private readonly allSeasonUpgrades;
    private elfClickTimeout;
    constructor(context: AutoPlayContext);
    /**
     * Main season handling logic
     * Manages Santa upgrades, Christmas elf achievement, and season cycling
     */
    handleSeasons(): void;
    /**
     * Develop Santa upgrades
     */
    private handleSanta;
    /**
     * Handle Christmas elf achievement detection
     * Skip if no grandmas bought yet (elf can't appear without grandmas)
     */
    private handleChristmasElf;
    /**
     * Release the elf click and scroll back to ticker
     */
    private unElf;
    /**
     * Handle season cycling between Christmas -> Valentine -> Easter -> Halloween
     */
    private cycleSeason;
    /**
     * Check if all upgrades in a list are unlocked
     */
    private allUnlocked;
    /**
     * Check if a season is finished (all upgrades collected)
     */
    seasonFinished(season: string): boolean;
    /**
     * Cleanup method to clear any pending timeouts
     */
    cleanup(): void;
    /**
     * Get current season handler status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=SeasonHandler.d.ts.map