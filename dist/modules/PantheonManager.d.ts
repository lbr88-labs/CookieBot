/**
 * Manages Pantheon (Temple minigame) spirit assignments
 *
 * The Pantheon has 3 slots for spirits that provide various bonuses:
 * - Slot 0 (Diamond): Most powerful effects
 * - Slot 1 (Ruby): Medium effects
 * - Slot 2 (Jade): Weakest effects
 *
 * Strategy:
 * - Slot 0: Mother (CpS boost) normally, Order (lump ripening) near harvest, Scorn (wrinkler boost) when popping
 * - Slot 1: Decadence (buildings cheaper) during day, Asceticism (buildings/CpS -5%) at night
 * - Slot 2: Labor (buildings +5%) during day, Industry (buildings +10%) at night
 */
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
export declare class PantheonManager {
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Main handler - called periodically (every 15 seconds)
     * Assigns optimal spirits based on current game state
     */
    handlePantheon(): void;
    /**
     * Activate night mode spirits
     * Called from NightMode.prepareForNight()
     */
    activateNightSpirits(): void;
    /**
     * Deactivate night mode spirits
     * Called from NightMode.deactivateNightFeatures()
     */
    deactivateNightSpirits(): void;
    /**
     * Assign a spirit to a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit (e.g., 'mother', 'decadence')
     * @param force If 1, forces use of 1 swap. If 0, requires 3 swaps available.
     */
    assignSpirit(slot: number, godName: string, force: number): void;
    /**
     * Remove a spirit from a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit to remove
     */
    private removeSpirit;
    /**
  
     * Get current pantheon manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=PantheonManager.d.ts.map