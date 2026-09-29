/**
 * Manages sugar lump harvesting and spending
 *
 * Handles:
 * - Automatic lump harvesting at optimal times
 * - Auto-spending lumps on building levels for minigames
 * - Lump type manipulation for achievements (when cheating enabled)
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class SugarLumpManager {
    private minLumpsOK;
    private cheatLumps;
    private canUseLumps;
    private context;
    private cheatLumpsLevel;
    /**
     * Constructor - expects 1 argument: context object
     * @param context AutoPlayContext for accessing game state
     */
    constructor(context: AutoPlayContext);
    /**
     * Set the activity logging callback
     * @param addActivity Callback to log activities
     */
    setAddActivity(_addActivity: (msg: string) => void): void;
    /**
     * Set the cheat lumps level
     * @param level CheatLumps configuration level
     */
    setCheatLumpsLevel(level: number): void;
    /**
     * Main sugar lump handler - called periodically with no parameters
     */
    handleSugarLumps(): void;
    /**
     * Harvest a sugar lump by clicking it
     */
    private harvestLump;
    /**
     * Accelerate sugar lump growth and manipulate types (cheating)
     */
    private cheatSugarLumps;
    /**
     * Auto-spend lumps on building levels (recursive)
     * Priority:
     * 1. Level 1 for minigame buildings (Garden, Grimoire, Pantheon, Stock Market)
     * 2. Farm to level 9 (for Garden)
     * 3. Cursor to level 12 (for Stock Market)
     * 4. All buildings to level 10
     * 5. Cursor to level 20 (for Luminous Gloves achievement)
     */
    private useLump;
    /**
     * Get whether we can spend lumps freely (all priority upgrades done)
     */
    getCanUseLumps(): boolean;
    /**
     * Get whether minimum lump requirements are met
     */
    getMinLumpsOK(): boolean;
    /**
     * Get whether we're currently cheating lumps
     */
    isCheatLumps(): boolean;
    /**
     * Get current sugar lump manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=SugarLumpManager.d.ts.map