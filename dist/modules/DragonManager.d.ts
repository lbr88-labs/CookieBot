/**
 * Manages dragon training and aura selection
 *
 * The Dragon (Krumblor) is unlocked after purchasing "A crumbly egg" upgrade.
 * Dragon levels unlock through various sacrifices and achievements.
 * Dragons provide powerful auras that boost game performance.
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class DragonManager {
    private context;
    private lastActionTime;
    constructor(context: AutoPlayContext);
    /**
     * Main handler for all dragon-related activities
     * Should be called periodically from the main AutoPlay loop
     */
    handleDragon(): void;
    /**
     * Train dragon to the next level
     * Handles building sacrifices required for leveling
     */
    private trainDragon;
    /**
     * Select the best auras based on current game state and dragon level
     */
    private selectBestAuras;
    /**
     * Set the primary dragon aura (slot 0)
     * Strategy:
     * - Level 5+: Breath of Milk (kitten boost)
     * - Level 19+: Radiant Appetite (golden cookie boost)
     * - Level 21+: Dragon's Curve (lump ripening) OR Radiant Appetite
     */
    private setPrimaryAura;
    /**
     * Set the secondary dragon aura (slot 1)
     * Always set to Breath of Milk for the kitten boost
     */
    private setSecondaryAura;
    /**
     * Pet the dragon to get special drops
     * Available at dragon level 8+
     * Drops: Dragon scale, Dragon claw, Dragon fang, Dragon teddy bear
     */
    private petDragon;
    /**
     * Check if buying a specific building is efficient based on dragon sacrifices
     * Used by BuildingManager to avoid buying too many buildings during sacrifice phases
     *
     * @param buildingName - Name of the building to check
     * @returns true if safe to buy, false if would interfere with dragon training
     */
    checkDragonLimits(buildingName: string): boolean;
    /**
     * Check if we're currently hunting lump harvest achievements
     * This affects aura selection - we want Dragon's Curve for faster ripening
     *
     * @returns true if hunting lump-related achievements
     */
    private isHuntingLumpAchievement;
    /**
     * Get current dragon manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=DragonManager.d.ts.map