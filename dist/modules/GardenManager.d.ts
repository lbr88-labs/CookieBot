/**
 * Manages Garden (Farm minigame) plant harvesting and planting
 *
 * The Garden is a complex minigame with 34 plants that must be unlocked through
 * mutations (planting parent plants next to each other). The bot systematically
 * unlocks all plants and harvests cookie-dropping plants.
 *
 * Strategy:
 * - Divide garden into 4 sectors (2x2 grid of 3x3 plots each)
 * - Plant parent plants to create mutations for new plants
 * - Harvest plants that drop cookies when CpS multiplier is high
 * - Sacrifice garden for "Seedless to nay" achievement when all plants unlocked
 * - Convert garden for sugar lumps when ready for endgame
 *
 * Original implementation: lines 1010-1499 in cookieAutoPlayBeta.js
 */
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
export declare class GardenManager {
    private plantList;
    private plantPending;
    private harvestPlant;
    private plantsMissing;
    private plantCookies;
    private wantGardenSacrifice;
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Safely confirm a prompt, handling cases where the game loop might be paused
     */
    private safeConfirm;
    /**
     * Freeze or unfreeze the garden
     * @param freeze true to freeze, false to unfreeze
     */
    freezeGarden(freeze: boolean): void;
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleGarden(): void;
    /**
     * Harvest mature and dying plants
     * Original: AutoPlay.harvesting (lines 1452-1484)
     */
    private harvesting;
    /**
     * Determine which plant to grow for cookie production (after mutations complete)
     * Original: AutoPlay.seedCalendar (lines 1329-1393)
     */
    private seedCalendar;
    /**
     * Check if plant is unlocked OR currently growing in garden
     * Original: AutoPlay.havePlant (lines 1110-1117)
     */
    private havePlant;
    /**
     * Batch plant seeds with cost validation
     * Original: AutoPlay.plantSeeds (lines 1274-1327)
     */
    private plantSeeds;
    /**
     * Get human-readable sector name
     * Original: AutoPlay.sectorText (lines 1103-1108)
     */
    private sectorText;
    /**
     * Plant seeds to unlock new plants through mutations
     * Original: AutoPlay.planting (lines 1159-1220)
     */
    private planting;
    /**
     * Find next plant to work on for a specific sector
     * Returns true if a plant goal was set, false otherwise
     * Original: AutoPlay.findPlants (lines 1119-1157)
     */
    private findPlants;
    /**
     * Plant parent plants in a sector to create mutations
     * Original: AutoPlay.plantSector (lines 1222-1251)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3)
     */
    private plantSector;
    /**
     * Check if ready to sacrifice garden for "Seedless to nay" achievement
     */
    private gardenSacrificeReady;
    /**
     * Check if garden is ready (all plants and upgrades unlocked)
     */
    private gardenReady;
    /**
     * Clean dying plants from garden to make room for new mutations
     * Original: AutoPlay.cleaningGarden (lines 1395-1412)
     */
    private cleaningGarden;
    /**
     * Harvest a plant and clean sector if needed
     */
    private harvest;
    /**
     * Clean a specific sector of the garden (3x3 grid)
     * Original: AutoPlay.cleanSector (lines 1414-1434)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3): 0=bottom-right, 1=bottom-left, 2=top-right, 3=top-left
     * @param plant0 - Target plant name ('dummy', 'all', 'queenbeetLump', 'everdaisy', or regular plant)
     */
    private cleanSector;
    /**
     * Plant a seed at a specific location
     * Original: AutoPlay.plantSeed (lines 1256-1272)
     *
     * @param garden - Garden minigame object
     * @param seed - Plant key to plant
     * @param whereX - X coordinate (0-5)
     * @param whereY - Y coordinate (0-5)
     */
    private plantSeed;
    /**
     * Clean (harvest) a seed from a specific tile
     * Original: AutoPlay.cleanSeed (lines 1439-1448)
     *
     * @param garden - Garden minigame object
     * @param x - X coordinate
     * @param y - Y coordinate
     */
    private cleanSeed;
    /**
     * Switch soil type for the garden
     * Original: AutoPlay.switchSoil (lines 1492-1498)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (only switches for sector 0)
     * @param which - Soil type name ('dirt', 'fertilizer', 'clay', 'woodchips')
     */
    private switchSoil;
    /**
     * Check if all upgrades in list are unlocked
     */
    private allUnlocked;
    /**
     * Log activity message
     */
    private logActivity;
    /**
     * Get plant pending status (for AutoPlay.plantPending)
     */
    isPlantPending(): boolean;
    /**
     * Get current module status for dashboard
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=GardenManager.d.ts.map