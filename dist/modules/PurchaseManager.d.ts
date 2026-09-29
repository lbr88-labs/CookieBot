/**
 * Manages purchase strategy for both buildings and upgrades
 * Migrated from cookieAutoPlayBeta.js sections:
 * - CookieMonster Strategy (line 470)
 * - Handle Buildings (line 661)
 * - Handle Upgrades (line 617)
 */
import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
export interface PurchaseInfo {
    name: string;
    type: 'building' | 'upgrade';
    pp: number | null;
    price: number;
}
export interface PurchaseManagerState {
    nextPurchase: string | null;
    nextPurchaseType: 'building' | 'upgrade' | null;
    nextPurchasePP: number | null;
    nextPurchasePrice: number | null;
    buy10: boolean;
}
export declare class PurchaseManager {
    private state;
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Get current purchase info for dashboard
     */
    getPurchaseInfo(): PurchaseInfo | null;
    /**
     * Main entry point: Use CookieMonster strategy if available, otherwise fallback
     */
    bestBuy(): boolean;
    /**
     * CookieMonster-based best buy strategy
     * Analyzes payback periods for buildings and determines the best purchase
     */
    private bestBuyCookieMonster;
    /**
     * Fallback strategy when CookieMonster is not available
     * Uses simple CPS/price ratio to determine best building
     */
    private handleBuildingsFallback;
    /**
     * Purchase a building if affordable
     * @param building - The building to purchase
     * @param checkAmount - Amount to check price for (default 1)
     * @param buyAmount - Amount to actually buy (default 1)
     * @returns true if purchase was made
     */
    buyBuilding(building: Building | null, checkAmount?: number, buyAmount?: number): boolean;
    /**
     * Calculate payback period for a building
     * PP = (time to afford) + (time to pay back investment)
     * Reserved for future use in enhanced strategy logic
     * @param building - The building to calculate for
     * @param amount - Number of buildings to buy
     * @returns Payback period in seconds
     */
    private calculatePP;
    /**
     * Get the best building based on CookieMonster data
     * @returns The best building to buy, or null if none available
     */
    getBestBuilding(): Building | null;
    /**
     * Fallback method to get best building without CookieMonster
     * @returns The best building based on CPS/price ratio
     */
    private getBestBuildingFallback;
    /**
     * Check if buying the building is efficient based on dragon sacrifices
     * @param buildingName - Name of the building to check
     * @returns true if we should buy this building
     */
    private checkDragon;
    /**
     * Clear purchase tracking info
     */
    private clearPurchaseTracking;
    /**
     * Purchase an upgrade if affordable
     * Original: AutoPlay.buyUpgrade (lines 461-468)
     * @param upgrade - The upgrade to purchase
     * @param bypass - Whether to bypass toggle (default true)
     * @returns true if purchase was made
     */
    buyUpgrade(upgrade: Upgrade, bypass?: boolean): boolean;
    /**
     * Determines if an upgrade should be avoided based on special conditions
     * Original: AutoPlay.avoidbuy (lines 351-378)
     * @param upgrade - The upgrade to check
     * @returns true if the upgrade should not be purchased
     */
    private shouldAvoidBuy;
    /**
     * Fallback upgrade handling when CookieMonster is not available
     * Original: AutoPlay.handleUpgrades (lines 617-641)
     */
    private handleUpgrades;
    /**
     * Get building purchase status for dashboard
     */
    getBuildingStatus(): ModuleStatus;
    /**
     * Get upgrade purchase status for dashboard
     */
    getUpgradeStatus(): ModuleStatus;
}
//# sourceMappingURL=PurchaseManager.d.ts.map