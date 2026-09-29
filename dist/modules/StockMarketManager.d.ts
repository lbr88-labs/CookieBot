/**
 * Manages Stock Market (Bank minigame) trading logic
 *
 * The Stock Market allows buying and selling goods with fluctuating prices.
 * The bot tracks price movements and trades based on thresholds.
 *
 * Strategy:
 * - Buy brokers to increase stock limits
 * - Upgrade offices to unlock more goods
 * - Track min/max prices for each good
 * - Buy when price is rising and below threshold
 * - Sell when price is dropping and above threshold
 * - During night: aggressive buying at low prices, selling at high prices
 *
 * Original implementation: lines 1500-1591 in cookieAutoPlayBeta.js
 */
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
export declare class StockMarketManager {
    private goodsList;
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleStockMarket(): void;
    /**
     * Night mode trading - aggressive buying/selling
     * Called from NightMode.activateNightAtStocks()
     */
    handleNightTrading(): void;
    /**
     * Buy brokers to increase stock limits
     */
    private buyBrokers;
    /**
     * Upgrade offices to unlock more goods
     */
    private upgradeOffices;
    /**
     * Buy 500 of each stock for "No nobility in poverty" achievement
     */
    private buyForAchievement;
    /**
     * Try to get "Debt evasion" achievement by ascending with loan
     */
    private tryDebtEvasion;
    /**
     * Initialize price thresholds for all goods
     */
    private initializeGoodsList;
    /**
     * Trade goods based on price movements and thresholds
     */
    private tradeGoods;
    /**
     * Get current stock market manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=StockMarketManager.d.ts.map