/**
 * Manages purchase strategy for both buildings and upgrades
 * Migrated from cookieAutoPlayBeta.js sections:
 * - CookieMonster Strategy (line 470)
 * - Handle Buildings (line 661)
 * - Handle Upgrades (line 617)
 */

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { BUILDING_IDS, UPGRADE_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;
declare const Beautify: (num: number) => string;
declare const CookieMonsterData: any;

export interface PurchaseInfo {
  name: string;
  type: 'building' | 'upgrade';
  pp: number | null;  // Payback Period in seconds
  price: number;
}

export interface PurchaseManagerState {
  nextPurchase: string | null;
  nextPurchaseType: 'building' | 'upgrade' | null;
  nextPurchasePP: number | null;
  nextPurchasePrice: number | null;
  buy10: boolean;  // Whether to buy 10 buildings next time (when pp < 1)
}

export class PurchaseManager {
  private state: PurchaseManagerState;
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;
    this.state = {
      nextPurchase: null,
      nextPurchaseType: null,
      nextPurchasePP: null,
      nextPurchasePrice: null,
      buy10: false,
    };
  }


  /**
   * Get current purchase info for dashboard
   */
  getPurchaseInfo(): PurchaseInfo | null {
    if (!this.state.nextPurchase) return null;

    return {
      name: this.state.nextPurchase,
      type: this.state.nextPurchaseType || 'building',
      pp: this.state.nextPurchasePP,
      price: this.state.nextPurchasePrice || 0,
    };
  }

  /**
   * Main entry point: Use CookieMonster strategy if available, otherwise fallback
   */
  bestBuy(): boolean {
    // If cookie monster isn't installed, use fallback strategy
    if (typeof CookieMonsterData === 'undefined') {
      // Fallback methods will set purchase tracking if they find something
      this.handleBuildingsFallback();
      this.handleUpgrades(); // Original line 477
      return false;
    }

    // This happens with cursed finger
    if (this.context.cpsMult === 0) {
      // Clear purchase tracking during cursed finger
      this.clearPurchaseTracking();
      return false;
    }

    return this.bestBuyCookieMonster();
  }

  /**
   * CookieMonster-based best buy strategy
   * Analyzes payback periods for buildings and determines the best purchase
   */
  private bestBuyCookieMonster(): boolean {
    // Safety check for CookieMonster data
    if (!CookieMonsterData?.Cache || !CookieMonsterData?.Upgrades || !CookieMonsterData?.Objects1) {
      this.clearPurchaseTracking();
      return false;
    }

    // Initialize with cursor, when cps = 0 all pp = inf
    let best = Game.ObjectsById[BUILDING_IDS.CURSOR]?.name || 'Cursor';
    let minpp = Infinity;
    let type: 'building' | 'upgrade' = 'building';

    // Override values for certain upgrades with 'infinite' pp
    // These values are multiplied by game.cps below
    const overrides: { [key: string]: number } = {
      'Plastic mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Iron mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Titanium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Adamantium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Unobtainium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Eludium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Wishalloy mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Fantasteel mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Nevercrack mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Armythril mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Technobsidian mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Plasmarble mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
      'Lucky day': 0.5,
      'Serendipity': 0.5,
      'Get lucky': 0.5,
      'A crumbly egg': 0.5,
      'A festive hat': 0.1,
      'Reindeer baking grounds': 0.1,
      'Weighted sleighs': 0.1,
      'Ho ho ho-flavored frosting': 0.1,
      'Season savings': 0.01,
      'Toy workshop': 0.05,
      'Santa\'s bottomless bag': 0.1,
      'Santa\'s helpers': CookieMonsterData.Cache.AverageClicks * 0.1,
      'Golden goose egg': 0.05,
      'Faberge egg': 0.01,
      'Wrinklerspawn': 0.05,
      'Cookie egg': CookieMonsterData.Cache.AverageClicks * 0.1,
      'Omelette': 0.1,
      'Elder Pledge': 0.1, // avoidbuy will catch this if have achievement
    };

    // Change cookie monster values for some 'infinite' pp upgrades
    for (const u in CookieMonsterData.Upgrades) {
      if (u in overrides && Game.Upgrades?.[u]) {
        CookieMonsterData.Upgrades[u].bonus = overrides[u] * Game.cookiesPs;
        CookieMonsterData.Upgrades[u].pp =
          (Math.max(Game.Upgrades[u].getPrice() - (Game.cookies + CookieMonsterData.Cache.WrinklersTotal), 0) / Game.cookiesPs) +
          (Game.Upgrades[u].getPrice() / CookieMonsterData.Upgrades[u].bonus);
      }
    }

    // Determine building check object and buy amount
    let check_obj = CookieMonsterData.Objects1;
    let buy_amt = 1;

    if ((Game.resets && Game.ascensionMode !== 1 &&
      Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE]) &&
      Game.ObjectsById[BUILDING_IDS.TEMPLE]?.minigame?.slot?.[0] === 10 && // Rigidel is in slot 0
      Game.BuildingsOwned % 10 === 0 && (this.context.now - Game.startDate) > 2 * 60 * 1000)
        || this.state.buy10) {
      // if owned % 10 != 0, will just buy one
      buy_amt = 10;
      if (CookieMonsterData?.Objects10) {
        check_obj = CookieMonsterData.Objects10;
      }
    }

    let haveBought = false;

    // For the following, pp < 1 indicates we can pay off the cost in less
    // than a second. It's better to just buy it instead of checking it repeatedly
    // CheckDragon twice in case the pp < 1 case set us over the limit
    for (const b in check_obj) {
      if (this.checkDragon(b) && check_obj[b].pp < 1) {
        if (this.buyBuilding(Game.Objects[b], buy_amt, buy_amt)) {
          haveBought = true;
        }
      }
      if (check_obj[b].pp < minpp && this.checkDragon(b)) {
        minpp = check_obj[b].pp;
        best = b;
        type = 'building';
      }
    }

    // If payback period is very short, buy 10 buildings next time
    this.state.buy10 = minpp < 1;

    // Upgrades (original lines 571-584)
    if (Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE].won || Game.UpgradesOwned !== 0) {
      for (const u of Game.UpgradesInStore) {
        if (!this.shouldAvoidBuy(u) && !u.bought) {
          // Safety check: ensure upgrade exists in CookieMonster data
          if (!CookieMonsterData.Upgrades[u.name]) continue;

          if (CookieMonsterData.Upgrades[u.name].pp < 1) {
            if (this.buyUpgrade(u)) haveBought = true;
          } else if (CookieMonsterData.Upgrades[u.name].pp < minpp) {
            minpp = CookieMonsterData.Upgrades[u.name].pp;
            best = u.name;
            type = 'upgrade';
          }
        }
      }
    }

    // Store best purchase info for dashboard
    this.state.nextPurchase = best;
    this.state.nextPurchaseType = type;
    this.state.nextPurchasePP = minpp;
    if (type === 'building') {
      this.state.nextPurchasePrice = Game.Objects[best].getPrice();
    } else {
      this.state.nextPurchasePrice = Game.Upgrades[best].getPrice();
    }

    // Attempt to buy the best item (building or upgrade)
    if (type === 'building') {
      if (this.buyBuilding(Game.Objects[best], buy_amt, buy_amt)) {
        haveBought = true;
      }
    } else if (type === 'upgrade') {
      if (this.buyUpgrade(Game.Upgrades[best], true)) {
        haveBought = true;
      }
    }

    // Sugar frenzy check (original lines 602-605)
    if (this.context.canUseLumps && Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].unlocked &&
      !Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].bought &&
      (this.context.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
      Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].buy();
    }

    // Nothing bought, within first 10 minutes, have neverclick
    if (!haveBought) {
      if ((this.context.now - Game.startDate) < 10 * 60 * 1000 &&
        Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won) {
        // Wait five seconds before next step (scaled by FPS)
        const delay = 5000 * (this.context.fpsScale || 1);
        this.context.setDeadline(this.context.now + delay);
      }
      this.context.addActivity('Waiting to buy ' + best);
    }

    return haveBought;
  }

  /**
   * Fallback strategy when CookieMonster is not available
   * Uses simple CPS/price ratio to determine best building
   */
  private handleBuildingsFallback(): void {
    let buyAmount = 100;
    let checkAmount = 1;

    // Only change buy mode if necessary and no menu is open (prevents closing menus)
    if (Game.buyMode === -1 && (!Game.onMenu || Game.onMenu === '')) {
      Game.storeBulkButton(0);
    }

    if ((this.context.now - Game.startDate) > 10 * 60 * 1000) {
      buyAmount = 1; // buy single after 10 minutes
      const maxBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
      if (maxBuilding.getSumPrice(100) < Game.cookies - this.context.savingsGoal) {
        buyAmount = 100;
      } else if (maxBuilding.getSumPrice(10) < Game.cookies - this.context.savingsGoal) {
        buyAmount = 10;
      }
    }

    if (Game.resets && Game.ascensionMode !== 1 &&
        Game.isMinigameReady(Game.Objects["Temple"]) &&
        Game.Objects["Temple"].minigame.slot[0] === 10 && // Rigidel is in slot 0
      Game.BuildingsOwned % 10 === 0 && (this.context.now - Game.startDate) > 2 * 60 * 1000) {
      buyAmount = checkAmount = 10;
    }

    // Calculate relative strength of cookie production (CPC = cookies per cookie)
    let cpc = 0;
    for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
      const me = Game.ObjectsById[i];
      if (me.locked) continue;
      const mycpc = me.storedCps / me.price;
      if (mycpc > cpc) cpc = mycpc;
    }

    // Track best building for dashboard
    let bestBuilding: Building | null = null;

    // Early game: if no buildings owned yet, buy the cheapest available
    if (Game.BuildingsOwned === 0) {
      for (let i = 0; i < Game.ObjectsById.length; i++) {
        const me = Game.ObjectsById[i];
        if (me.locked) continue;
        if (!bestBuilding) {
          bestBuilding = me;
          this.state.nextPurchase = me.name;
          this.state.nextPurchaseType = 'building';
          this.state.nextPurchasePrice = me.getPrice();
          this.state.nextPurchasePP = null;
        }
        if (this.buyBuilding(me, checkAmount, buyAmount)) return;
      }
    } else {
      // Normal game: use efficiency-based buying
      for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
        const me = Game.ObjectsById[i];
        if (me.locked) continue;
        if (me.storedCps / me.price > cpc / 2 || me.amount % 50 >= 40) {
          if (!bestBuilding) {
            bestBuilding = me;
            this.state.nextPurchase = me.name;
            this.state.nextPurchaseType = 'building';
            this.state.nextPurchasePrice = me.getPrice();
            this.state.nextPurchasePP = null; // No payback calculation without Cookie Monster
          }
          // This checks price, sets deadline
          if (this.buyBuilding(me, checkAmount, buyAmount)) return;
        }
      }
    }

    // Rigidel special case: buy the cheapest building when not at multiple of 10
    if (Game.resets && Game.ascensionMode !== 1 &&
        Game.isMinigameReady(Game.Objects["Temple"]) &&
        Game.Objects["Temple"].minigame.slot[0] === 10 &&
        Game.BuildingsOwned % 10 !== 0) { // Rigidel is in slot 0, buy the cheapest
      let minIdx = 0;
      let minPrice = Game.ObjectsById[minIdx].price;
      for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
        if (Game.ObjectsById[i].price < minPrice) {
          minPrice = Game.ObjectsById[i].price;
          minIdx = i;
        }
      }
      this.buyBuilding(Game.ObjectsById[minIdx]);
    }
  }

  /**
   * Purchase a building if affordable
   * @param building - The building to purchase
   * @param checkAmount - Amount to check price for (default 1)
   * @param buyAmount - Amount to actually buy (default 1)
   * @returns true if purchase was made
   */
  buyBuilding(building: Building | null, checkAmount: number = 1, buyAmount: number = 1): boolean {
    if (!building) return false;

    const price = building.getSumPrice(checkAmount);
    if (price <= Game.cookies - this.context.savingsGoal) {
      building.buy(buyAmount);
      this.context.logAction(
        'Bought ' + building.name + (buyAmount > 1 ? ' x' + buyAmount : ''),
        Beautify(price) + ' cookies'
      );
      this.context.hyperActive = true; // might buy more soon
      return true;
    }
    return false;
  }

  /**
   * Calculate payback period for a building
   * PP = (time to afford) + (time to pay back investment)
   * Reserved for future use in enhanced strategy logic
   * @param building - The building to calculate for
   * @param amount - Number of buildings to buy
   * @returns Payback period in seconds
   */
  // @ts-ignore TS6133 - Reserved for future use
  private calculatePP(building: Building, amount: number = 1): number {
    const price = building.getSumPrice(amount);
    const cpsIncrease = building.storedCps * amount;

    if (cpsIncrease === 0) return Infinity;

    // Time to afford (if we don't have enough cookies yet)
    const timeToAfford = Math.max(price - Game.cookies, 0) / Game.cookiesPs;

    // Time to pay back the investment
    const timeToPayback = price / cpsIncrease;

    return timeToAfford + timeToPayback;
  }

  /**
   * Get the best building based on CookieMonster data
   * @returns The best building to buy, or null if none available
   */
  getBestBuilding(): Building | null {
    if (typeof CookieMonsterData === 'undefined' || !CookieMonsterData?.Objects1) {
      return this.getBestBuildingFallback();
    }

    let bestBuilding: Building | null = null;
    let minpp = Infinity;

    const check_obj = this.state.buy10 && CookieMonsterData?.Objects10
      ? CookieMonsterData.Objects10
      : CookieMonsterData.Objects1;

    for (const b in check_obj) {
      if (check_obj[b]?.pp != null && check_obj[b].pp < minpp && this.checkDragon(b)) {
        minpp = check_obj[b].pp;
        const building = Game.Objects?.[b];
        if (building) {
          bestBuilding = building;
        }
      }
    }

    return bestBuilding;
  }

  /**
   * Fallback method to get best building without CookieMonster
   * @returns The best building based on CPS/price ratio
   */
  private getBestBuildingFallback(): Building | null {
    let bestBuilding: Building | null = null;
    let bestRatio = 0;

    for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
      const building = Game.ObjectsById[i];
      if (building.locked) continue;

      const ratio = building.storedCps / building.price;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestBuilding = building;
      }
    }

    return bestBuilding;
  }

  /**
   * Check if buying the building is efficient based on dragon sacrifices
   * @param buildingName - Name of the building to check
   * @returns true if we should buy this building
   */
  private checkDragon(buildingName: string): boolean {
    // Determine if buying the building is efficient based on sacrifices to Krumblor
    if (!Game.Achievements['Here be dragon'].won) {
      return true;  // don't limit when first fully training
    }

    const building = Game.Objects[buildingName];

    // Haven't sacrificed first 100, buy no more than 100
    if (Game.dragonLevel - 5 <= building.id) {
      return building.amount < 100;
    }

    // Waiting to sacrifice 50 of all
    if (Game.dragonLevel < Game.dragonLevels.length - 2) {
      return building.amount < 50;
    }

    // Waiting to sacrifice 200 of all
    if (Game.dragonLevel < Game.dragonLevels.length - 1) {
      return building.amount < 200;
    }

    return true;
  }

  /**
   * Clear purchase tracking info
   */
  private clearPurchaseTracking(): void {
    this.state.nextPurchase = null;
    this.state.nextPurchaseType = null;
    this.state.nextPurchasePP = null;
    this.state.nextPurchasePrice = null;
  }

  /**
   * Purchase an upgrade if affordable
   * Original: AutoPlay.buyUpgrade (lines 461-468)
   * @param upgrade - The upgrade to purchase
   * @param bypass - Whether to bypass toggle (default true)
   * @returns true if purchase was made
   */
  buyUpgrade(upgrade: Upgrade, bypass: boolean = true): boolean {
    if (upgrade.getPrice() <= Game.cookies - this.context.savingsGoal) {
      const price = upgrade.getPrice();
      upgrade.buy(bypass);
      this.context.logAction('Upgraded: ' + upgrade.name, Beautify(price) + ' cookies');
      this.context.hyperActive = true; // might buy more soon
      return true;
    }
    return false;
  }

  /**
   * Determines if an upgrade should be avoided based on special conditions
   * Original: AutoPlay.avoidbuy (lines 351-378)
   * @param upgrade - The upgrade to check
   * @returns true if the upgrade should not be purchased
   */
  private shouldAvoidBuy(upgrade: Upgrade): boolean {
    switch (upgrade.id) {
      // Brainsweep and Elder Pact - wait for all grandmapocalypse achievements
      case 71: // One mind
      case 73: // Elder Pact
        return !!Game.Achievements["Elder nap"].won &&
               !!Game.Achievements["Grandmapocalypse"].won &&
               !!Game.Achievements["Elder slumber"].won &&
               !!Game.Achievements["Elder calm"].won;

      // Elder Pledge - wait for certain achievements and Elder Covenant
      case 74: // Elder Pledge
        return !!Game.Achievements["Elder nap"].won &&
               !!Game.Achievements["Elder slumber"].won &&
               !!Game.Upgrades["Elder Covenant"].unlocked;

      // Elder Covenant - wait until pledge is bought or calm achievement won
      case 84: // Elder Covenant
        return !!Game.Upgrades["Elder Pledge"].bought ||
               !!Game.Achievements["Elder calm"].won;

      // Chocolate egg - always avoid (used for ascension strategy)
      case 227: // Chocolate egg
        return true;

      // Shimmering veil - avoid unless working on specific achievement
      case 563: // Shimmering veil
        return this.context.nextAchievement !== 432 || // "Thick-skinned" achievement ID
               !!Game.Achievements["Thick-skinned"].won;

      // Avoid all toggle-pool upgrades by default
      default:
        return upgrade.pool === "toggle";
    }
  }

  /**
   * Fallback upgrade handling when CookieMonster is not available
   * Original: AutoPlay.handleUpgrades (lines 617-641)
   */
  private handleUpgrades(): void {
    if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0) return;

    // Track best upgrade for dashboard
    let bestUpgrade: Upgrade | null = null;
    for (const me in Game.UpgradesById) {
      const e = Game.UpgradesById[me];
      if (e.unlocked && !e.bought && !this.shouldAvoidBuy(e)) {
        if (!bestUpgrade) {
          bestUpgrade = e;
          this.state.nextPurchase = e.name;
          this.state.nextPurchaseType = 'upgrade';
          this.state.nextPurchasePrice = e.getPrice();
          this.state.nextPurchasePP = null; // No payback calculation without Cookie Monster
        }
        this.buyUpgrade(e, true);  // checks price, bypass = true
      }
    }

    // Sugar frenzy check (original lines 637-640)
    if (this.context.canUseLumps && Game.Upgrades["Sugar frenzy"].unlocked &&
        !Game.Upgrades["Sugar frenzy"].bought &&
      (this.context.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
      Game.Upgrades["Sugar frenzy"].buy();
    }
  }

  /**
   * Get building purchase status for dashboard
   */
  getBuildingStatus(): ModuleStatus {
    const hasCookieMonster = typeof CookieMonsterData !== 'undefined';

    // Buildings are always purchasable - Hardcore achievement only restricts upgrades, not buildings

    // Check if in cursed finger mode
    if (this.context.cpsMult === 0) {
      return {
        module: 'Buildings',
        status: 'waiting',
        currentAction: 'Paused',
        reason: 'Cursed Finger active (CPS = 0)',
        icon: '🏢',
        details: {
          'CPS Multiplier': 0
        }
      };
    }

    // Check if next purchase is a building
    if (this.state.nextPurchase && this.state.nextPurchaseType === 'building') {
      const price = this.state.nextPurchasePrice || 0;
      const available = Game.cookies - this.context.savingsGoal;
      const canAfford = price <= available;

      // Calculate progress
      const progressPercent = Math.min(100, (available / price) * 100);
      const progressColor = canAfford ? '#6f6' : (progressPercent > 50 ? '#fc6' : '#f66');

      // Calculate time remaining using CookieMonster's approach (if available)
      let timeRemaining: number | undefined;
      if (!canAfford && Game.cookiesPs > 0) {
        if (hasCookieMonster && CookieMonsterData?.Cache) {
          // Use CookieMonster's calculation: account for wrinkler cookies
          const totalAvailable = Game.cookies + CookieMonsterData.Cache.WrinklersTotal - this.context.savingsGoal;
          const shortfall = Math.max(price - totalAvailable, 0);
          timeRemaining = (shortfall / Game.cookiesPs) * 1000; // Convert to milliseconds
        } else {
          // Fallback: simple calculation without wrinklers
          const shortfall = price - available;
          timeRemaining = (shortfall / Game.cookiesPs) * 1000;
        }
      }

      return {
        module: 'Buildings',
        status: 'active',
        currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
        reason: hasCookieMonster
          ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
          : 'Using fallback strategy',
        icon: '🏢',
        progress: {
          current: available,
          target: price,
          percent: progressPercent,
          label: 'Cookies'
        },
        timeRemaining,
        progressColor,
        details: {
          'Next Building': this.state.nextPurchase,
          'Price': typeof Beautify !== 'undefined' ? Beautify(price) : price,
          'Available': typeof Beautify !== 'undefined' ? Beautify(available) : available,
          'Buy 10 Mode': this.state.buy10
        }
      };
    }

    // Not buying buildings currently
    return {
      module: 'Buildings',
      status: 'idle',
      currentAction: this.state.nextPurchaseType === 'upgrade' ? 'Upgrade has priority' : 'Evaluating options',
      reason: hasCookieMonster ? 'Cookie Monster strategy' : 'Fallback strategy',
      icon: '🏢',
      details: {
        'Strategy': hasCookieMonster ? 'Cookie Monster' : 'Fallback'
      }
    };
  }

  /**
   * Get upgrade purchase status for dashboard
   */
  getUpgradeStatus(): ModuleStatus {
    const hasCookieMonster = typeof CookieMonsterData !== 'undefined';

    // Bot doesn't auto-buy first upgrade unless Hardcore is won (protection for Hardcore achievement)
    // Original logic: if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned==0) return;
    if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0) {
      // Count available upgrades
      let availableUpgrades = 0;
      for (const key in Game.Upgrades) {
        const upgrade = Game.Upgrades[key];
        if (upgrade.unlocked && !upgrade.bought) {
          availableUpgrades++;
        }
      }

      return {
        module: 'Upgrades',
        status: 'idle',
        currentAction: 'Waiting for first upgrade purchase',
        reason: 'Bot does not auto-buy first upgrade (Hardcore achievement protection)',
        nextAction: availableUpgrades > 0 ? `${availableUpgrades} upgrade${availableUpgrades !== 1 ? 's' : ''} available to purchase manually` : 'No upgrades unlocked yet',
        icon: '⬆️',
        details: {
          'Hardcore Won': false,
          'Upgrades Owned': 0,
          'Available Upgrades': availableUpgrades,
          'Cookies': typeof Beautify !== 'undefined' ? Beautify(Game.cookies) : Game.cookies
        }
      };
    }

    // Check if in cursed finger mode
    if (this.context.cpsMult === 0) {
      return {
        module: 'Upgrades',
        status: 'waiting',
        currentAction: 'Paused',
        reason: 'Cursed Finger active (CPS = 0)',
        icon: '⬆️',
        details: {
          'CPS Multiplier': 0
        }
      };
    }

    // Check if next purchase is an upgrade
    if (this.state.nextPurchase && this.state.nextPurchaseType === 'upgrade') {
      const price = this.state.nextPurchasePrice || 0;
      const available = Game.cookies - this.context.savingsGoal;
      const canAfford = price <= available;

      // Calculate progress
      const progressPercent = Math.min(100, (available / price) * 100);
      const progressColor = canAfford ? '#6f6' : (progressPercent > 50 ? '#fc6' : '#f66');

      // Calculate time remaining using CookieMonster's approach (if available)
      let timeRemaining: number | undefined;
      if (!canAfford && Game.cookiesPs > 0) {
        if (hasCookieMonster && CookieMonsterData?.Cache) {
          // Use CookieMonster's calculation: account for wrinkler cookies
          const totalAvailable = Game.cookies + CookieMonsterData.Cache.WrinklersTotal - this.context.savingsGoal;
          const shortfall = Math.max(price - totalAvailable, 0);
          timeRemaining = (shortfall / Game.cookiesPs) * 1000; // Convert to milliseconds
        } else {
          // Fallback: simple calculation without wrinklers
          const shortfall = price - available;
          timeRemaining = (shortfall / Game.cookiesPs) * 1000;
        }
      }

      return {
        module: 'Upgrades',
        status: 'active',
        currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
        reason: hasCookieMonster
          ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
          : 'Using fallback strategy',
        icon: '⬆️',
        progress: {
          current: available,
          target: price,
          percent: progressPercent,
          label: 'Cookies'
        },
        timeRemaining,
        progressColor,
        details: {
          'Next Upgrade': this.state.nextPurchase,
          'Price': typeof Beautify !== 'undefined' ? Beautify(price) : price,
          'Available': typeof Beautify !== 'undefined' ? Beautify(available) : available,
          'Savings Goal': typeof Beautify !== 'undefined' ? Beautify(this.context.savingsGoal) : this.context.savingsGoal
        }
      };
    }

    // Not buying upgrades currently
    return {
      module: 'Upgrades',
      status: 'idle',
      currentAction: this.state.nextPurchaseType === 'building' ? 'Building has priority' : 'Evaluating options',
      reason: hasCookieMonster ? 'Cookie Monster strategy' : 'Fallback strategy',
      icon: '⬆️',
      details: {
        'Strategy': hasCookieMonster ? 'Cookie Monster' : 'Fallback',
        'Upgrades Owned': Game.UpgradesOwned
      }
    };
  }

}
