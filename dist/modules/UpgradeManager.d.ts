/**
 * Manages upgrade purchases and decision making
 * Migrated from cookieAutoPlayBeta.js "Handle Upgrades" section (lines 617-659)
 */
export interface UpgradeManagerContext {
    now: number;
    savingsGoal: number;
    canUseLumps: boolean;
    nextAchievement: number | null;
    nextPurchase: string | null;
    nextPurchaseType: 'upgrade' | 'building' | null;
    nextPurchasePrice: number | null;
    nextPurchasePP: number | null;
    hyperActive: boolean;
    logAction: (action: string, details?: string) => void;
    addActivity: (activity: string) => void;
}
export declare class UpgradeManager {
    private context;
    constructor(context: UpgradeManagerContext);
    /**
     * Main upgrade handling function
     * Iterates through all unlocked upgrades and purchases them if conditions are met
     */
    handleUpgrades(): void;
    /**
     * Purchase an upgrade if we have enough cookies
     * @param upgrade - The upgrade to purchase
     * @param bypass - Whether to bypass the popup (default true)
     */
    buyUpgrade(upgrade: Upgrade, bypass?: boolean): void;
    /**
     * Determines if an upgrade should be avoided based on special conditions
     * @param upgrade - The upgrade to check
     * @returns true if the upgrade should not be purchased
     */
    private shouldAvoidBuy;
    /**
     * Special handling for Sugar frenzy upgrade
     * Only purchase after 3 days into the run
     */
    private handleSugarFrenzy;
    /**
     * Format a number with appropriate suffixes (million, billion, etc.)
     * @param num - Number to format
     * @returns Formatted string
     */
    private formatNumber;
    /**
     * Get information about the next upgrade to purchase
     * Used for dashboard display
     */
    getNextUpgradeInfo(): {
        name: string | null;
        price: number | null;
        canAfford: boolean;
    };
    /**
     * Check if a specific upgrade should be prioritized
     * @param upgradeName - Name of the upgrade
     * @returns true if upgrade should be prioritized
     */
    isPrioritized(upgradeName: string): boolean;
    /**
     * Update the context with new values
     * Called by main AutoPlay loop
     */
    updateContext(context: Partial<UpgradeManagerContext>): void;
}
//# sourceMappingURL=UpgradeManager.d.ts.map