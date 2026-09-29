/**
 * Handles automatic clicking of the big cookie
 * Respects Neverclick and True Neverclick achievements
 * Original: AutoPlay.handleClicking (lines 360-384)
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export declare class ClickManager {
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Get current click mode (from live config)
     */
    private getClickMode;
    /**
     * Handle clicking - respects Neverclick/True Neverclick achievements
     * Original: AutoPlay.handleClicking (lines 360-378)
     */
    handleClicking(): void;
    /**
     * Speed clicking with multiplier (for aggressive click modes)
     * Original: AutoPlay.speedClicking (lines 380-383)
     */
    private speedClicking;
    /**
     * Get clicking status for dashboard
     */
    getStatus(): ModuleStatus;
    /**
     * Get human-readable click mode name
     */
    private getClickModeName;
}
//# sourceMappingURL=ClickManager.d.ts.map