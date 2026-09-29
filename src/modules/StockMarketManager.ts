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

declare const Game: any;
declare const Beautify: (num: number) => string;

import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
import { BUILDING_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

interface GoodData {
  min: number;        // Minimum price seen
  max: number;        // Maximum price seen
  delta: number;      // Price change threshold (5 for slow goods, 2 for fast)
  sellHigh: number;   // Sell when price > this (very expensive)
  sellLow: number;    // Sell when price > this (reasonable)
  buyHigh: number;    // Buy when price < this (affordable)
  buyMedium: number;  // Buy when price < this (reasonable)
  buyLow: number;     // Buy when price < this (very cheap)
}

export class StockMarketManager {
  private goodsList: Map<number, GoodData> = new Map();
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Main handler - called periodically (every 15 seconds)
   */
  handleStockMarket(): void {
    // Wait 1 hour after reset/reincarnation before trading
    if (Date.now() < this.context.resetTime + 3600000) return;

    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK])) return;
    if (this.context.wantAscend) return; // Don't trade before ascending

    const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;

    // Buy brokers to increase stock limits
    this.buyBrokers(market);

    // Upgrade offices to unlock more goods
    this.upgradeOffices(market);

    // Buy 500 of each stock for achievement (459)
    this.buyForAchievement(market);

    // Get loan for "Debt evasion" achievement
    this.tryDebtEvasion();

    // Initialize price thresholds if needed
    if (this.goodsList.size === 0) {
      this.initializeGoodsList(market);
    }

    // Trade based on price movements
    this.tradeGoods(market);
  }

  /**
   * Night mode trading - aggressive buying/selling
   * Called from NightMode.activateNightAtStocks()
   */
  handleNightTrading(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK])) return;

    const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;

    // First do normal trading
    this.handleStockMarket();

    // Then do aggressive night trading
    for (const goodKey in market.goods) {
      const good = market.goods[goodKey];
      const price = market.getGoodPrice(good);
      const goodData = this.goodsList.get(good.id);

      if (!goodData) continue;

      // Buy all if affordable
      if (price < goodData.buyHigh) {
        market.buyGood(good.id, 10000);
      }

      // Sell all if reasonable price
      if (price > goodData.sellLow) {
        market.sellGood(good.id, 10000);
      }
    }
  }

  /**
   * Buy brokers to increase stock limits
   */
  private buyBrokers(market: any): void {
    if (market.brokers < market.getMaxBrokers()) {
      const price = market.getBrokerPrice();
      if (100 * price < Game.cookies) {
        const buyButton = document.getElementById('bankBrokersBuy');
        if (buyButton) {
          buyButton.click();
        }
      }
    }
  }

  /**
   * Upgrade offices to unlock more goods
   */
  private upgradeOffices(market: any): void {
    if (market.officeLevel < market.offices.length - 1) {
      const office = market.offices[market.officeLevel];
      if (office.cost &&
        Game.ObjectsById[BUILDING_IDS.CURSOR].amount >= office.cost[0] &&
        Game.ObjectsById[BUILDING_IDS.CURSOR].level >= office.cost[1]) {
        const upgradeButton = document.getElementById('bankOfficeUpgrade');
        if (upgradeButton) {
          upgradeButton.click();
        }
      }
    }
  }

  /**
   * Buy 500 of each stock for "No nobility in poverty" achievement
   */
  private buyForAchievement(market: any): void {
    // Achievement 459 = "No nobility in poverty" (own 500 of each stock)
    const lastGood = market.goodsById[market.goodsById.length - 1];
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.NO_NOBILITY_IN_POVERTY].won &&
        market.getGoodMaxStock(lastGood) > 1000) {
      for (const goodKey in market.goods) {
        const good = market.goods[goodKey];
        const needed = 500 - good.stock;
        if (needed > 0) {
          market.buyGood(good.id, needed);
        }
      }
    }
  }

  /**
   * Try to get "Debt evasion" achievement by ascending with loan
   */
  private tryDebtEvasion(): void {
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.DEBT_EVASION].won && !this.context.plantPending) {
      const loanButton = document.getElementById('bankLoan2');
      if (loanButton) {
        loanButton.click();
        // Wait 30 seconds then ascend
        setTimeout(() => {
          this.context.triggerAscend('trying debt evasion');
        }, 30 * 1000);
      }
    }
  }

  /**
   * Initialize price thresholds for all goods
   */
  private initializeGoodsList(market: any): void {
    for (const goodKey in market.goods) {
      const good = market.goods[goodKey];
      const price = market.getGoodPrice(good);
      const restingVal = market.getRestingVal(good.id);
      const highMark = restingVal + 1;
      const lowMark = restingVal / 3; // Could also use 2
      const distance = highMark - lowMark;

      this.goodsList.set(good.id, {
        min: price,
        max: price,
        delta: good.id > 3 ? 5 : 2, // Slow goods: 5, fast goods: 2
        sellHigh: highMark,
        sellLow: highMark - distance / 4,
        buyHigh: lowMark + distance / 2,
        buyMedium: lowMark + distance / 4,
        buyLow: lowMark,
      });
    }
  }

  /**
   * Trade goods based on price movements and thresholds
   */
  private tradeGoods(market: any): void {
    for (const goodKey in market.goods) {
      const good = market.goods[goodKey];
      const price = market.getGoodPrice(good);
      const maxStock = market.getGoodMaxStock(good);
      const goodData = this.goodsList.get(good.id);

      if (!goodData) continue;

      // Update min/max prices
      if (goodData.min > price) goodData.min = price;
      if (goodData.max < price) goodData.max = price;

      // BUY logic - when price is rising and below threshold
      if (good.stock < maxStock) {
        // Price is rising (current price > min + delta) and affordable
        if (price - goodData.delta > goodData.min && price < goodData.buyHigh) {
          if (goodData.min < goodData.buyLow) {
            // Very cheap - buy all
            market.buyGood(good.id, 10000);
            goodData.max = price;
          } else if (goodData.min < goodData.buyMedium) {
            // Reasonable - buy 80%
            const buyAmount = Math.floor(maxStock * 0.8 - good.stock);
            market.buyGood(good.id, buyAmount);
            goodData.max = price;
          } else if (goodData.min < goodData.buyHigh) {
            // Affordable - buy 60%
            const buyAmount = Math.floor(maxStock * 0.6 - good.stock);
            market.buyGood(good.id, buyAmount);
            goodData.max = price;
          }
        }
      }

      // SELL logic - when price is dropping and above threshold
      if (good.stock > 0) {
        // Price is dropping (current price < max - delta) and reasonable
        if (price + goodData.delta < goodData.max && price > goodData.sellLow) {
          if (goodData.max > goodData.sellHigh) {
            // Very expensive - sell all
            market.sellGood(good.id, 10000);
            goodData.min = price;
          } else if (goodData.max > goodData.sellLow) {
            // Reasonable - sell 70%
            const sellAmount = Math.floor(good.stock - maxStock * 0.3);
            market.sellGood(good.id, sellAmount);
            goodData.min = price;
          }
        }
      }
    }
  }

  /**
   * Get current stock market manager status
   */
  getStatus(): ModuleStatus {
    // Check for cooldown period after reset
    const cooldownRemaining = Math.floor((this.context.resetTime + 3600000 - Date.now()) / 1000 / 60);
    if (cooldownRemaining > 0) {
      return {
        module: 'Stock Market',
        status: 'waiting',
        currentAction: 'Cooldown after reset',
        reason: 'Wait 1 hour after reincarnation before trading',
        nextAction: `Will start in ${cooldownRemaining} minutes`,
        icon: '📈',
        details: {
          'Cooldown': `${cooldownRemaining}m remaining`
        }
      };
    }

    // Check if stock market is unlocked
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK])) {
      return {
        module: 'Stock Market',
        status: 'disabled',
        currentAction: 'Not unlocked',
        reason: 'Need Bank minigame unlocked (Cursor level 12)',
        icon: '📈',
        details: {
          'Cursor Level': Game.ObjectsById[BUILDING_IDS.CURSOR]?.level || 0,
          'Minigame': 'Not ready'
        }
      };
    }

    // Don't trade before ascending
    if (this.context.wantAscend) {
      return {
        module: 'Stock Market',
        status: 'waiting',
        currentAction: 'Preparing to ascend',
        reason: 'Avoiding trades before ascension',
        icon: '📈',
        details: {
          'Status': 'Pre-ascension'
        }
      };
    }

    const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;
    const brokers = market.brokers;
    const maxBrokers = market.getMaxBrokers();
    const officeLevel = market.officeLevel;
    const maxOfficeLevel = market.offices.length - 1;

    // Count active trading
    let goodsWithStock = 0;
    let totalValue = 0;

    for (const goodKey in market.goods) {
      const good = market.goods[goodKey];
      totalValue += good.stock * market.getGoodPrice(good);
      if (good.stock > 0) goodsWithStock++;
    }

    // Check for achievement pursuit
    const lastGood = market.goodsById[market.goodsById.length - 1];
    const pursuingAchievement = !Game.AchievementsById[ACHIEVEMENT_IDS.NO_NOBILITY_IN_POVERTY].won &&
                                market.getGoodMaxStock(lastGood) > 1000;

    if (pursuingAchievement) {
      return {
        module: 'Stock Market',
        status: 'active',
        currentAction: 'Working on achievement',
        reason: 'Buying 500 of each stock for "Dude, sweet" achievement',
        icon: '📈',
        details: {
          'Brokers': `${brokers}/${maxBrokers}`,
          'Office Level': `${officeLevel}/${maxOfficeLevel}`,
          'Portfolio Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue)
        }
      };
    }

    // Check if we need to upgrade infrastructure
    if (brokers < maxBrokers || officeLevel < maxOfficeLevel) {
      return {
        module: 'Stock Market',
        status: 'active',
        currentAction: 'Upgrading infrastructure',
        reason: brokers < maxBrokers ? 'Buying brokers' : 'Upgrading office',
        nextAction: `Then start trading (${this.goodsList.size} goods tracked)`,
        icon: '📈',
        details: {
          'Brokers': `${brokers}/${maxBrokers}`,
          'Office Level': `${officeLevel}/${maxOfficeLevel}`
        }
      };
    }

    // Active trading
    if (this.goodsList.size === 0) {
      return {
        module: 'Stock Market',
        status: 'active',
        currentAction: 'Initializing trading',
        reason: 'Setting up price thresholds',
        icon: '📈',
        details: {
          'Brokers': brokers,
          'Office Level': officeLevel
        }
      };
    }

    return {
      module: 'Stock Market',
      status: 'active',
      currentAction: 'Trading stocks',
      reason: 'Buying low, selling high',
      nextAction: `Tracking ${this.goodsList.size} goods`,
      icon: '📈',
      details: {
        'Brokers': brokers,
        'Portfolio Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue),
        'Goods Owned': goodsWithStock,
        'Goods Tracked': this.goodsList.size,
        'Strategy': 'Momentum-based'
      }
    };
  }
}
