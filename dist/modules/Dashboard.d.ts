import type { Config, AutoPlayContext } from '../types/autoplay';
import type { ConfigManager } from './ConfigManager';
export declare class Dashboard {
    private context;
    private configManager;
    private dashboardCollapsed;
    private dashboardObserver;
    private resizeObserver;
    private positionTimeout;
    private lastRenderTime;
    private renderInterval;
    private lastLayoutCheck;
    private actionHistory;
    private statusHistory;
    private lastStatus;
    private maxHistorySize;
    constructor(context: AutoPlayContext, configManager: ConfigManager);
    /**
     * Get the current config object (for AutoPlay.Config sync)
     */
    getConfig(): Config;
    /**
     * Add menu preferences to the game menu
     */
    addMenuPref(): void;
    /**
     * Create the dashboard UI
     */
    createDashboard(): void;
    /**
     * Position dashboard at the bottom of the screen
     */
    private positionDashboard;
    /**
     * Toggle dashboard collapse/expand
     */
    private toggleDashboard;
    /**
     * Update dashboard content
     */
    updateDashboard(): void;
    /**
     * Update the "next update" timer in the header
     */
    private updateNextUpdateTimer;
    /**
     * Helper to create a progress bar HTML
     */
    private createProgressBar;
    /**
     * Helper to format time remaining
     */
    private formatTimeRemaining;
    /**
     * Update both module columns (active and waiting/idle)
     */
    private updateModuleColumns;
    /**
     * Update activity section
     */
    private updateActivity;
    /**
     * Log an action to the activity history
     */
    logAction(action: string, details?: string): void;
    /**
     * Log a status update to the status history
     */
    logStatus(statusType: string, message: string, details?: string): void;
    /**
     * Check if layout needs fixing (e.g. if game overlaps dashboard)
     */
    private checkLayout;
    /**
     * Render/update the dashboard
     */
    render(): void;
    /**
     * Toggle dashboard visibility
     */
    toggle(): void;
}
//# sourceMappingURL=Dashboard.d.ts.map