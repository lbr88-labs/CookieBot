/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// UNUSED EXPORTS: default

;// ./src/modules/GoldenCookieHandler.ts
/**
 * Handles Golden Cookies, Reindeer, and other shimmers
 * Migrated from cookieAutoPlayBeta.js "Handle Cookies and Golden Cookies" section
 */
class GoldenCookieHandler {
    constructor(config, logAction, addActivity, grindingCheat) {
        this.cheatMax = 0;
        this.cheatMaxTime = Date.now();
        this.hyperActive = false;
        this.wantAscend = false;
        this.now = Date.now();
        this.config = config || { GoldenClickMode: 0, CheatGolden: 0 };
        this.logAction = logAction || (() => { });
        this.addActivity = addActivity || (() => { });
        this.grindingCheat = grindingCheat || (() => false);
    }
    /**
     * Update runtime state
     */
    updateState(now, wantAscend) {
        this.now = now;
        this.wantAscend = wantAscend;
    }
    /**
     * Returns whether the bot is in hyperactive mode (frequent updates needed)
     */
    isHyperActive() {
        return this.hyperActive;
    }
    /**
     * Reset hyperactive flag (call at start of each cycle)
     */
    resetHyperActive() {
        this.hyperActive = false;
    }
    /**
     * Main handler for golden cookies and reindeer
     * Pops first golden cookie or reindeer based on configuration
     */
    handleGoldenCookies() {
        if (!this.config.GoldenClickMode || this.config.GoldenClickMode === 0)
            return;
        // Grab fortune cookie from ticker
        if (Game.TickerEffect) {
            Game.tickerL.click();
        }
        // Check if multiple golden cookies are active (hyperactive mode)
        if (Game.shimmerTypes['golden'].n >= 2) {
            this.hyperActive = true;
        }
        // Wait for Four-leaf cookie achievement if close
        if (Game.shimmerTypes['golden'].n >= 4 &&
            !Game.Achievements['Four-leaf cookie'].won) {
            return; // wait for achievement
        }
        // Process all shimmers
        for (const sx in Game.shimmers) {
            const s = Game.shimmers[sx];
            this.hyperActive = true; // check whether full activity
            // Handle cookie storm drops (aggressive mode only)
            if (s.force === 'cookie storm drop' && this.config.GoldenClickMode === 2) {
                s.pop();
                this.logAction('Clicked cookie storm drop', s.type);
            }
            // Click non-golden shimmers, or golden cookies that are about to expire
            if (s.type !== 'golden' ||
                s.life < Game.fps ||
                !Game.Achievements['Early bird'].won) {
                this.clickShimmerWithTracking(s);
                return;
            }
            // Click golden cookies that have been around for a while (if we have Fading luck)
            if (s.life / Game.fps < s.dur - 2 &&
                Game.Achievements['Fading luck'].won) {
                this.clickShimmerWithTracking(s);
                return;
            }
        }
        // Try to cheat golden cookies if configured
        this.cheatGoldenCookies();
    }
    /**
     * Click a shimmer and track the cookies gained
     */
    clickShimmerWithTracking(shimmer) {
        // Track cookies before clicking for Lucky/Lucky Frenzy bonus calculation
        const cookiesBefore = Game.cookies;
        shimmer.pop();
        const cookiesGained = Game.cookies - cookiesBefore;
        // Check if this was a Lucky or Lucky Frenzy golden cookie
        if (shimmer.type === 'golden' && cookiesGained > 0 && typeof Beautify !== 'undefined') {
            const bonusType = shimmer.force || 'fading luck';
            // Lucky and Lucky Frenzy both have "lucky" in their force name
            if (bonusType.toLowerCase().includes('lucky')) {
                this.logAction(`Clicked ${bonusType} golden cookie`, `💰 +${Beautify(cookiesGained)} cookies`);
                return;
            }
        }
        // Log regular shimmer click
        if (shimmer.type === 'golden') {
            this.logAction('Clicked golden cookie', shimmer.force || 'fading luck');
        }
        else {
            this.logAction(`Clicked ${shimmer.type}`, shimmer.force || 'shimmer');
        }
    }
    /**
     * Cheat golden cookies by advancing their spawn timer
     */
    cheatGoldenCookies() {
        if (!this.config.CheatGolden || this.config.CheatGolden === 0)
            return;
        // Don't cheat if Lucky payout isn't bought and we have enough heavenly chips
        if (!Game.Upgrades['Lucky payout'].bought && Game.heavenlyChips > 77777777) {
            return;
        }
        let level = 10 + 30 * (this.config.CheatGolden - 1);
        if (this.config.CheatGolden === 1) {
            // Auto cheat mode
            if (this.wantAscend)
                return; // already cheated enough
            if (!this.grindingCheat())
                return; // only cheat in grinding
            const daysInRun = (this.now - Game.startDate) / 1000 / 60 / 60 / 24;
            if (daysInRun < 20)
                return; // cheat only after 20 days
            level = ((3 * daysInRun) << 0) - 20;
            if (level > 100)
                level = 100;
            const timeToNextLevel = (2 * 60 * 60 * 1000) / ((level - this.cheatMax + 8) / 10);
            if (this.now - this.cheatMaxTime >= timeToNextLevel) {
                this.cheatMaxTime = this.now;
                this.cheatMax++;
            }
            if (level > this.cheatMax)
                level = this.cheatMax;
            this.cheatMax = level;
        }
        this.addActivity(`Cheating golden cookies at level ${level}.`);
        const levelTime = (Game.shimmerTypes.golden.maxTime * level) / 140;
        if (Game.shimmerTypes.golden.time < levelTime) {
            Game.shimmerTypes.golden.time = levelTime;
        }
        /* golden cookie with building special:
        const newShimmer = new Game.shimmer("golden");
        newShimmer.force = "building special";
        */
    }
    /**
     * Check if we're in a frenzy buff state
     */
    hasFrenzyBuff() {
        return ('Click frenzy' in Game.buffs ||
            'Dragonflight' in Game.buffs ||
            'Cursed finger' in Game.buffs ||
            'Frenzy' in Game.buffs ||
            'Elder frenzy' in Game.buffs ||
            'Dragon Harvest' in Game.buffs);
    }
    /**
     * Check if we have a specific buff active
     */
    hasBuff(buffName) {
        return buffName in Game.buffs;
    }
    /**
     * Get remaining time for a buff in seconds
     */
    getBuffTimeRemaining(buffName) {
        if (buffName in Game.buffs) {
            return Math.ceil(Game.buffs[buffName].time / Game.fps);
        }
        return 0;
    }
    /**
     * Get current golden cookie handler status
     */
    getStatus() {
        // Check if golden cookie clicking is enabled
        if (!this.config.GoldenClickMode || this.config.GoldenClickMode === 0) {
            return {
                module: 'Golden Cookies',
                status: 'disabled',
                currentAction: 'Disabled in config',
                reason: 'GoldenClickMode is set to 0 (off)',
                icon: '✨',
                details: {
                    'Mode': 'Off'
                }
            };
        }
        const goldenCount = Game.shimmerTypes['golden']?.n || 0;
        const activeShimmers = Game.shimmers.length;
        // Check for Four-leaf cookie achievement attempt
        if (!Game.Achievements['Four-leaf cookie'].won &&
            Game.Objects['Wizard tower']?.amount > 500 &&
            Game.Upgrades['Distilled essence of redoubled luck']?.bought) {
            return {
                module: 'Golden Cookies',
                status: 'waiting',
                currentAction: 'Attempting Four-leaf cookie',
                reason: `Need 4 golden cookies on screen (currently ${goldenCount})`,
                nextAction: goldenCount >= 2 ? 'Will cast Hand of Fate' : 'Waiting for more golden cookies',
                icon: '✨',
                details: {
                    'Golden Cookies': goldenCount,
                    'Target': 4,
                    'Wizard Towers': Game.Objects['Wizard tower']?.amount || 0
                }
            };
        }
        // Check for active buffs
        const activeFrenzy = this.hasFrenzyBuff();
        const activeBuff = this.getActiveBuff();
        // Check for cheating mode
        if (this.config.CheatGolden && this.config.CheatGolden > 0) {
            const level = this.config.CheatGolden === 1 ? 'Auto' : this.config.CheatGolden;
            return {
                module: 'Golden Cookies',
                status: 'active',
                currentAction: 'Clicking golden cookies',
                reason: `Cheating enabled (level ${level})`,
                nextAction: activeFrenzy ? `Active: ${activeBuff}` : 'Waiting for golden cookies',
                icon: '✨',
                details: {
                    'Mode': this.config.GoldenClickMode === 2 ? 'Aggressive' : 'Normal',
                    'Cheat Level': level,
                    'Active Shimmers': activeShimmers,
                    'Golden Cookies': goldenCount,
                    'Active Buff': activeBuff || 'None'
                }
            };
        }
        // Normal mode
        if (activeShimmers > 0) {
            return {
                module: 'Golden Cookies',
                status: 'active',
                currentAction: 'Clicking shimmers',
                reason: this.config.GoldenClickMode === 2 ? 'Aggressive mode (includes storm drops)' : 'Normal mode',
                nextAction: activeFrenzy ? `Active buff: ${activeBuff}` : undefined,
                icon: '✨',
                details: {
                    'Mode': this.config.GoldenClickMode === 2 ? 'Aggressive' : 'Normal',
                    'Active Shimmers': activeShimmers,
                    'Golden Cookies': goldenCount,
                    'Active Buff': activeBuff || 'None',
                    'HyperActive': this.hyperActive
                }
            };
        }
        return {
            module: 'Golden Cookies',
            status: 'idle',
            currentAction: 'Waiting for golden cookies',
            reason: this.config.GoldenClickMode === 2 ? 'Aggressive mode' : 'Normal mode',
            icon: '✨',
            details: {
                'Mode': this.config.GoldenClickMode === 2 ? 'Aggressive' : 'Normal',
                'Golden Cookies': goldenCount,
                'Active Buff': activeBuff || 'None'
            }
        };
    }
    /**
     * Get the name of the currently active buff (if any)
     */
    getActiveBuff() {
        const buffOrder = [
            'Elder frenzy',
            'Click frenzy',
            'Dragonflight',
            'Dragon Harvest',
            'Frenzy',
            'Cursed finger',
            'Building special'
        ];
        for (const buff of buffOrder) {
            if (buff in Game.buffs) {
                return buff;
            }
        }
        return null;
    }
}

;// ./src/modules/SavingsManager.ts
/**
 * Manages cookie savings and reserves (Lucky, Lucky Frenzy)
 *
 * This module handles the calculation of savings goals based on different strategies:
 * - NONE (0): No savings
 * - AUTO (1): Automatically ramp up savings over time
 * - LUCKY (2): Save for Lucky golden cookie (100 minutes of CPS)
 * - LUCKY_FRENZY (3): Save for Lucky Frenzy (700 minutes of CPS)
 */
class SavingsManager {
    constructor(config = {}, logStatus = () => { }) {
        this.savingsGoal = 0;
        this.savingsStart = 0;
        this.now = 0;
        // Constants for AUTO savings strategy
        this.START_TIME = 30 * 60 * 1000; // 30 minutes before starting to save
        this.TARGET_TIME = 400 * 60 * 1000; // 400 minutes to reach target amount
        // Reserve multipliers
        this.LUCKY_MULTIPLIER = 100; // 100 minutes of CPS
        this.FRENZY_MULTIPLIER = 7; // 7x for Lucky Frenzy
        this.config = config;
        this.logStatus = logStatus;
        this.savingsStart = Game.startDate;
    }
    /**
     * Initialize savings tracking (called on ascension)
     */
    initializeSavings(currentTime) {
        this.savingsStart = currentTime;
        this.now = currentTime;
    }
    /**
     * Update current time (called each game loop)
     */
    setCurrentTime(currentTime) {
        this.now = currentTime;
    }
    /**
     * Main savings calculation logic
     * Migrated from AutoPlay.handleSavings (line 388-448 in cookieAutoPlayBeta.js)
     */
    handleSavings() {
        // Do not save in reborn mode
        if (Game.ascensionMode === 1) {
            this.savingsGoal = 0;
            return;
        }
        const strategy = this.config?.SavingStrategy ?? 1;
        // NONE: No savings
        if (strategy === 0) {
            this.savingsGoal = 0;
            return;
        }
        // LUCKY: Save for Lucky golden cookie (100 minutes of CPS)
        if (strategy === 2) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
            return;
        }
        // LUCKY FRENZY: Save for Lucky Frenzy (700 minutes of CPS)
        if (strategy === 3) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER * this.FRENZY_MULTIPLIER;
            return;
        }
        // AUTO: Linearly ramp up savings to target over time
        // Wait 30 minutes before starting to save, then ramp up over 400 minutes
        const elapsedTime = this.now - this.savingsStart - this.START_TIME;
        // Calculate scaling factor (0 to 1) based on elapsed time
        // Math.max(0, ...) fix ensures we don't get negative values
        const scaling = Math.max(0, Math.min(elapsedTime / this.TARGET_TIME, 1));
        // Still in startup period
        if (elapsedTime < 0) {
            this.savingsGoal = 0;
            this.logStatus('reserve:startup', 'No reserve yet (startup period)');
            return;
        }
        // Wait for golden cookie upgrades before saving
        // Upgrade IDs: 52 (Lucky day), 53 (Serendipity)
        if (Game.UpgradesById[52].bought && Game.UpgradesById[53].bought) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
        }
        else {
            this.savingsGoal = 0;
            this.logStatus('reserve:waiting-upgrades', 'Waiting for golden cookie upgrades');
            return;
        }
        // Upgrade to Lucky Frenzy if "Get lucky" upgrade is bought
        // Upgrade ID: 86 (Get lucky)
        if (Game.UpgradesById[86].bought) {
            this.savingsGoal *= this.FRENZY_MULTIPLIER;
        }
        // Scale goal based on elapsed time (linearly ramp up)
        if (elapsedTime < this.TARGET_TIME) {
            this.savingsGoal *= scaling;
            // Calculate actual savings progress (cookies saved vs goal)
            const actualProgress = Math.min(100, (Game.cookies / this.savingsGoal) * 100);
            const progressPct = actualProgress.toFixed(0);
            // Log progress in 10% increments
            this.logStatus('reserve:building-' + Math.floor(Number(progressPct) / 10) * 10, 'Reserve growing: ' + progressPct + '% saved');
        }
        else {
            this.logStatus('reserve:maintaining', 'Reserve at max');
        }
        // Auto-adjustment: if fallen behind savings plan, reset the start time
        // This handles cases where the bot was stopped or a big purchase was made
        const fractionSaved = Game.cookies / this.savingsGoal;
        // Division by zero check: only adjust if scaling > 0
        if (fractionSaved < 0.8 && scaling > 0) {
            this.savingsStart = this.now - this.START_TIME - this.TARGET_TIME * fractionSaved / scaling;
        }
    }
    /**
     * Get the current savings goal
     */
    getSavingsGoal() {
        return this.savingsGoal;
    }
    /**
     * Get the reserve for Lucky cookie (100 minutes of CPS)
     */
    getLuckyReserve() {
        return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
    }
    /**
     * Get the reserve for Lucky Frenzy (700 minutes of CPS)
     */
    getLuckyFrenzyReserve() {
        return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER * this.FRENZY_MULTIPLIER;
    }
    /**
     * Get available cookies after accounting for savings
     */
    getAvailableCookies() {
        return Math.max(0, Game.cookies - this.savingsGoal);
    }
    /**
     * Check if we have enough cookies for a purchase (accounting for savings)
     */
    canAfford(price) {
        return price < Game.cookies - this.savingsGoal;
    }
}

;// ./src/modules/PurchaseManager.ts
/**
 * Manages purchase strategy for both buildings and upgrades
 * Migrated from cookieAutoPlayBeta.js sections:
 * - CookieMonster Strategy (line 470)
 * - Handle Buildings (line 661)
 * - Handle Upgrades (line 617)
 */
class PurchaseManager {
    constructor(callbacks) {
        this.savingsGoal = 0;
        this.now = 0;
        this.cpsMult = 1;
        this.canUseLumps = false;
        this.nextAchievement = 0;
        this.logAction = () => { };
        this.addActivity = () => { };
        this.setHyperActive = null;
        this.setDeadline = null;
        this.state = {
            nextPurchase: null,
            nextPurchaseType: null,
            nextPurchasePP: null,
            nextPurchasePrice: null,
            buy10: false,
        };
        if (callbacks?.logAction) {
            this.logAction = callbacks.logAction;
        }
        if (callbacks?.addActivity) {
            this.addActivity = callbacks.addActivity;
        }
        if (callbacks?.setHyperActive) {
            this.setHyperActive = callbacks.setHyperActive;
        }
        if (callbacks?.setDeadline) {
            this.setDeadline = callbacks.setDeadline;
        }
    }
    /**
     * Update state values before processing
     */
    setState(savingsGoal, now, cpsMult, canUseLumps = false, nextAchievement = 0) {
        this.savingsGoal = savingsGoal;
        this.now = now;
        this.cpsMult = cpsMult;
        this.canUseLumps = canUseLumps;
        this.nextAchievement = nextAchievement;
    }
    /**
     * Get current purchase info for dashboard
     */
    getPurchaseInfo() {
        if (!this.state.nextPurchase)
            return null;
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
    bestBuy() {
        // If cookie monster isn't installed, use fallback strategy
        if (typeof CookieMonsterData === 'undefined') {
            // Fallback methods will set purchase tracking if they find something
            this.handleBuildingsFallback();
            this.handleUpgrades(); // Original line 477
            return false;
        }
        // This happens with cursed finger
        if (this.cpsMult === 0) {
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
    bestBuyCookieMonster() {
        // Safety check for CookieMonster data
        if (!CookieMonsterData?.Cache || !CookieMonsterData?.Upgrades || !CookieMonsterData?.Objects1) {
            this.clearPurchaseTracking();
            return false;
        }
        // Initialize with cursor, when cps = 0 all pp = inf
        let best = Game.ObjectsById[0]?.name || 'Cursor';
        let minpp = Infinity;
        let type = 'building';
        // Override values for certain upgrades with 'infinite' pp
        // These values are multiplied by game.cps below
        const overrides = {
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
            Game.isMinigameReady(Game.Objects?.["Temple"]) &&
            Game.Objects?.["Temple"]?.minigame?.slot?.[0] === 10 && // Rigidel is in slot 0
            Game.BuildingsOwned % 10 === 0 && (this.now - Game.startDate) > 2 * 60 * 1000)
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
        if (Game.Achievements["Hardcore"].won || Game.UpgradesOwned !== 0) {
            for (const u of Game.UpgradesInStore) {
                if (!this.shouldAvoidBuy(u) && !u.bought) {
                    // Safety check: ensure upgrade exists in CookieMonster data
                    if (!CookieMonsterData.Upgrades[u.name])
                        continue;
                    if (CookieMonsterData.Upgrades[u.name].pp < 1) {
                        if (this.buyUpgrade(u))
                            haveBought = true;
                    }
                    else if (CookieMonsterData.Upgrades[u.name].pp < minpp) {
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
        }
        else {
            this.state.nextPurchasePrice = Game.Upgrades[best].getPrice();
        }
        // Attempt to buy the best item (building or upgrade)
        if (type === 'building') {
            if (this.buyBuilding(Game.Objects[best], buy_amt, buy_amt)) {
                haveBought = true;
            }
        }
        else if (type === 'upgrade') {
            if (this.buyUpgrade(Game.Upgrades[best], true)) {
                haveBought = true;
            }
        }
        // Sugar frenzy check (original lines 602-605)
        if (this.canUseLumps && Game.Upgrades["Sugar frenzy"].unlocked &&
            !Game.Upgrades["Sugar frenzy"].bought &&
            (this.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
            Game.Upgrades["Sugar frenzy"].buy();
        }
        // Nothing bought, within first 10 minutes, have neverclick
        if (!haveBought) {
            if ((this.now - Game.startDate) < 10 * 60 * 1000 &&
                Game.Achievements['Neverclick'].won) {
                // Wait five seconds before next step
                if (this.setDeadline)
                    this.setDeadline(this.now + 5000);
            }
            this.addActivity('Waiting to buy ' + best);
        }
        return haveBought;
    }
    /**
     * Fallback strategy when CookieMonster is not available
     * Uses simple CPS/price ratio to determine best building
     */
    handleBuildingsFallback() {
        let buyAmount = 100;
        let checkAmount = 1;
        // Only change buy mode if necessary and no menu is open (prevents closing menus)
        if (Game.buyMode === -1 && (!Game.onMenu || Game.onMenu === '')) {
            Game.storeBulkButton(0);
        }
        if ((this.now - Game.startDate) > 10 * 60 * 1000) {
            buyAmount = 1; // buy single after 10 minutes
            const maxBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
            if (maxBuilding.getSumPrice(100) < Game.cookies - this.savingsGoal) {
                buyAmount = 100;
            }
            else if (maxBuilding.getSumPrice(10) < Game.cookies - this.savingsGoal) {
                buyAmount = 10;
            }
        }
        if (Game.resets && Game.ascensionMode !== 1 &&
            Game.isMinigameReady(Game.Objects["Temple"]) &&
            Game.Objects["Temple"].minigame.slot[0] === 10 && // Rigidel is in slot 0
            Game.BuildingsOwned % 10 === 0 && (this.now - Game.startDate) > 2 * 60 * 1000) {
            buyAmount = checkAmount = 10;
        }
        // Calculate relative strength of cookie production (CPC = cookies per cookie)
        let cpc = 0;
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const me = Game.ObjectsById[i];
            if (me.locked)
                continue;
            const mycpc = me.storedCps / me.price;
            if (mycpc > cpc)
                cpc = mycpc;
        }
        // Track best building for dashboard
        let bestBuilding = null;
        // Early game: if no buildings owned yet, buy the cheapest available
        if (Game.BuildingsOwned === 0) {
            for (let i = 0; i < Game.ObjectsById.length; i++) {
                const me = Game.ObjectsById[i];
                if (me.locked)
                    continue;
                if (!bestBuilding) {
                    bestBuilding = me;
                    this.state.nextPurchase = me.name;
                    this.state.nextPurchaseType = 'building';
                    this.state.nextPurchasePrice = me.getPrice();
                    this.state.nextPurchasePP = null;
                }
                if (this.buyBuilding(me, checkAmount, buyAmount))
                    return;
            }
        }
        else {
            // Normal game: use efficiency-based buying
            for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
                const me = Game.ObjectsById[i];
                if (me.locked)
                    continue;
                if (me.storedCps / me.price > cpc / 2 || me.amount % 50 >= 40) {
                    if (!bestBuilding) {
                        bestBuilding = me;
                        this.state.nextPurchase = me.name;
                        this.state.nextPurchaseType = 'building';
                        this.state.nextPurchasePrice = me.getPrice();
                        this.state.nextPurchasePP = null; // No payback calculation without Cookie Monster
                    }
                    // This checks price, sets deadline
                    if (this.buyBuilding(me, checkAmount, buyAmount))
                        return;
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
    buyBuilding(building, checkAmount = 1, buyAmount = 1) {
        if (!building)
            return false;
        const price = building.getSumPrice(checkAmount);
        if (price < Game.cookies - this.savingsGoal) {
            building.buy(buyAmount);
            this.logAction('Bought ' + building.name + (buyAmount > 1 ? ' x' + buyAmount : ''), Beautify(price) + ' cookies');
            if (this.setHyperActive)
                this.setHyperActive(); // might buy more soon
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
    calculatePP(building, amount = 1) {
        const price = building.getSumPrice(amount);
        const cpsIncrease = building.storedCps * amount;
        if (cpsIncrease === 0)
            return Infinity;
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
    getBestBuilding() {
        if (typeof CookieMonsterData === 'undefined' || !CookieMonsterData?.Objects1) {
            return this.getBestBuildingFallback();
        }
        let bestBuilding = null;
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
    getBestBuildingFallback() {
        let bestBuilding = null;
        let bestRatio = 0;
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const building = Game.ObjectsById[i];
            if (building.locked)
                continue;
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
    checkDragon(buildingName) {
        // Determine if buying the building is efficient based on sacrifices to Krumblor
        if (!Game.Achievements['Here be dragon'].won) {
            return true; // don't limit when first fully training
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
    clearPurchaseTracking() {
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
    buyUpgrade(upgrade, bypass = true) {
        if (upgrade.getPrice() < Game.cookies - this.savingsGoal) {
            const price = upgrade.getPrice();
            upgrade.buy(bypass);
            this.logAction('Upgraded: ' + upgrade.name, Beautify(price) + ' cookies');
            if (this.setHyperActive)
                this.setHyperActive(); // might buy more soon
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
    shouldAvoidBuy(upgrade) {
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
                return this.nextAchievement !== 432 || // "Thick-skinned" achievement ID
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
    handleUpgrades() {
        if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0)
            return;
        // Track best upgrade for dashboard
        let bestUpgrade = null;
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
                this.buyUpgrade(e, true); // checks price, bypass = true
            }
        }
        // Sugar frenzy check (original lines 637-640)
        if (this.canUseLumps && Game.Upgrades["Sugar frenzy"].unlocked &&
            !Game.Upgrades["Sugar frenzy"].bought &&
            (this.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
            Game.Upgrades["Sugar frenzy"].buy();
        }
    }
    /**
     * Get building purchase status for dashboard
     */
    getBuildingStatus() {
        const hasCookieMonster = typeof CookieMonsterData !== 'undefined';
        // In Born Again mode (ascensionMode = 1), no upgrades exist - buy buildings normally
        // In normal mode with 0 upgrades, buildings are blocked until first upgrade purchased
        const inBornAgain = Game.ascensionMode === 1;
        if (!inBornAgain && !Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0) {
            return {
                module: 'Buildings',
                status: 'blocked',
                currentAction: 'Blocked until first upgrade',
                reason: 'Cannot efficiently buy buildings without upgrades',
                nextAction: 'Will resume after first upgrade purchased',
                icon: '🏢',
                details: {
                    'Blocked By': 'No upgrades owned',
                    'Mode': 'Normal'
                }
            };
        }
        // Check if in cursed finger mode
        if (this.cpsMult === 0) {
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
            const canAfford = this.state.nextPurchasePrice && this.state.nextPurchasePrice < (Game.cookies - this.savingsGoal);
            return {
                module: 'Buildings',
                status: canAfford ? 'active' : 'waiting',
                currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
                reason: hasCookieMonster
                    ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
                    : 'Using fallback strategy',
                icon: '🏢',
                details: {
                    'Next Building': this.state.nextPurchase,
                    'Price': typeof Beautify !== 'undefined' ? Beautify(this.state.nextPurchasePrice || 0) : (this.state.nextPurchasePrice || 0),
                    'Available': typeof Beautify !== 'undefined' ? Beautify(Game.cookies - this.savingsGoal) : (Game.cookies - this.savingsGoal),
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
    getUpgradeStatus() {
        const hasCookieMonster = typeof CookieMonsterData !== 'undefined';
        // In Born Again mode (ascensionMode = 1), NO upgrades exist at all
        const inBornAgain = Game.ascensionMode === 1;
        if (inBornAgain) {
            return {
                module: 'Upgrades',
                status: 'disabled',
                currentAction: 'Not available',
                reason: 'Born Again mode has no upgrades',
                icon: '⬆️',
                details: {
                    'Mode': 'Born Again',
                    'Upgrades': 'Not available in this mode'
                }
            };
        }
        // In normal mode with 0 upgrades, bot doesn't auto-buy first upgrade (Hardcore protection)
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
                status: 'waiting',
                currentAction: 'Waiting for first upgrade',
                reason: 'Bot does not auto-buy first upgrade (Hardcore protection)',
                nextAction: availableUpgrades > 0 ? `${availableUpgrades} upgrade${availableUpgrades !== 1 ? 's' : ''} available - purchase manually` : 'No upgrades unlocked yet',
                icon: '⬆️',
                details: {
                    'Hardcore Won': false,
                    'Upgrades Owned': 0,
                    'Available': availableUpgrades,
                    'Cookies': typeof Beautify !== 'undefined' ? Beautify(Game.cookies) : Game.cookies
                }
            };
        }
        // Check if in cursed finger mode
        if (this.cpsMult === 0) {
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
            const canAfford = this.state.nextPurchasePrice && this.state.nextPurchasePrice < (Game.cookies - this.savingsGoal);
            return {
                module: 'Upgrades',
                status: canAfford ? 'active' : 'waiting',
                currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
                reason: hasCookieMonster
                    ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
                    : 'Using fallback strategy',
                icon: '⬆️',
                details: {
                    'Next Upgrade': this.state.nextPurchase,
                    'Price': typeof Beautify !== 'undefined' ? Beautify(this.state.nextPurchasePrice || 0) : (this.state.nextPurchasePrice || 0),
                    'Available': typeof Beautify !== 'undefined' ? Beautify(Game.cookies - this.savingsGoal) : (Game.cookies - this.savingsGoal),
                    'Savings Goal': typeof Beautify !== 'undefined' ? Beautify(this.savingsGoal) : this.savingsGoal
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

;// ./src/utils/Logger.ts
/**
 * Centralized logging system for CookieBot
 * Provides unified activity logging and status logging across all modules
 */
/**
 * Singleton logger instance
 * Provides centralized logging for all modules
 */
class LoggerService {
    constructor() { }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }
    /**
     * Initialize logger with callbacks from AutoPlay
     * Should be called once during AutoPlay construction
     */
    initialize(callbacks) {
        this.callbacks = callbacks;
    }
    /**
     * Log an action with optional details
     * @param action - Action description
     * @param details - Optional details (e.g., price, count)
     */
    logAction(action, details) {
        if (this.callbacks?.logAction) {
            this.callbacks.logAction(action, details);
        }
        else {
            console.log(`[Action] ${action}${details ? ': ' + details : ''}`);
        }
    }
    /**
     * Log a status update
     * @param type - Status type (e.g., 'wrinkler', 'dragon', 'ascend')
     * @param message - Status message
     * @param details - Optional details
     */
    logStatus(type, message, details) {
        if (this.callbacks?.logStatus) {
            this.callbacks.logStatus(type, message, details);
        }
        else {
            console.log(`[${type}] ${message}${details ? ': ' + details : ''}`);
        }
    }
    /**
     * Add an activity message to the activity log
     * @param activity - Activity description
     * @returns true if activity was added, false if it already existed
     */
    addActivity(activity) {
        if (this.callbacks?.addActivity) {
            return this.callbacks.addActivity(activity);
        }
        else {
            console.log(`[Activity] ${activity}`);
            return true;
        }
    }
    /**
     * Check if logger is initialized
     */
    isInitialized() {
        return !!this.callbacks;
    }
}
// Export singleton instance
const Logger = LoggerService.getInstance();

;// ./src/modules/SeasonHandler.ts
/**
 * Handles seasonal events and upgrades
 */

/**
 * Helper function to create a range of numbers (inclusive)
 */
function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
class SeasonHandler {
    constructor() {
        // Season upgrade IDs
        this.valentineUpgrades = range(169, 174).concat([645]);
        this.christmasUpgrades = [168]; // just wait for dominion
        this.easterUpgrades = range(210, 229);
        this.halloweenUpgrades = range(134, 140);
        this.elfClickTimeout = null;
        this.allSeasonUpgrades = this.valentineUpgrades
            .concat(this.christmasUpgrades)
            .concat(this.easterUpgrades)
            .concat(this.halloweenUpgrades);
    }
    /**
     * Main season handling logic
     * Manages Santa upgrades, Christmas elf achievement, and season cycling
     */
    handleSeasons() {
        // Handle Santa development
        this.handleSanta();
        // Handle Christmas elf achievement
        this.handleChristmasElf();
        // Handle season cycling
        this.cycleSeason();
    }
    /**
     * Develop Santa upgrades
     */
    handleSanta() {
        if (!!Game.Upgrades["A festive hat"].bought &&
            !Game.Upgrades["Santa's dominion"].unlocked) {
            // Upgrade Santa
            Game.specialTab = "santa";
            Game.UpgradeSanta();
            Game.ToggleSpecialMenu(0);
        }
    }
    /**
     * Handle Christmas elf achievement detection
     * Skip if no grandmas bought yet (elf can't appear without grandmas)
     */
    handleChristmasElf() {
        // Skip if not Christmas season
        if (Game.season !== "christmas")
            return;
        // Skip if achievement already won
        if (!!Game.Achievements["Baby it's old outside"].won)
            return;
        // Skip if no grandmas purchased yet (elf can't appear without grandmas)
        // This is the fix for the menu closing issue
        if (Game.Objects["Grandma"].amount === 0)
            return;
        // Close any open menu
        if (Game.onMenu)
            Game.ShowMenu("");
        // Scroll grandma canvas into view
        Game.Objects["Grandma"].canvas.parentElement?.scrollIntoView();
        // Find elf grandma
        const elfGrandmas = Game.Objects["Grandma"].pics.filter((p) => p.pic === "elfGrandma.png");
        if (elfGrandmas.length > 0) {
            const elfGranny = elfGrandmas[0];
            const xPos = elfGranny.x + 32;
            const yPos = elfGranny.y + 32;
            // Set mouse position and trigger click
            Game.Objects["Grandma"].mousePos = [xPos, yPos];
            Game.Objects["Grandma"].mouseOn = true;
            Game.mouseDown = 1;
            // Release click after 1 second
            this.elfClickTimeout = window.setTimeout(() => this.unElf(), 1000);
        }
    }
    /**
     * Release the elf click and scroll back to ticker
     */
    unElf() {
        Game.mouseDown = 0;
        Game.tickerL.scrollIntoView();
    }
    /**
     * Handle season cycling between Christmas -> Valentine -> Easter -> Halloween
     */
    cycleSeason() {
        // Don't cycle if season switcher not bought
        if (!Game.Upgrades["Season switcher"].bought)
            return; // bought is number, falsy check works
        // Don't cycle in Born Again mode
        if (Game.ascensionMode === 1)
            return;
        // Don't cycle if too many season switches already
        if (Game.seasonUses > 20)
            return;
        // Check if current season is finished
        if (this.seasonFinished(Game.season)) {
            // Cycle to next season
            switch (Game.season) {
                case "christmas":
                    Game.Upgrades["Lovesick biscuit"].buy(); // to valentine
                    break;
                case "valentines":
                    Game.Upgrades["Bunny biscuit"].buy(); // to easter
                    break;
                case "easter":
                    Game.Upgrades["Ghostly biscuit"].buy(); // to halloween
                    break;
                default:
                    Game.Upgrades["Festive biscuit"].buy(); // to christmas
                    break;
            }
        }
        else if (!this.allUnlocked(this.allSeasonUpgrades)) {
            // Still waiting for upgrades in current season
            Logger.addActivity(`Waiting for all results in ${Game.season}.`);
        }
    }
    /**
     * Check if all upgrades in a list are unlocked
     */
    allUnlocked(upgradeIds) {
        return upgradeIds.every((id) => Game.UpgradesById[id].unlocked);
    }
    /**
     * Check if a season is finished (all upgrades collected)
     */
    seasonFinished(season) {
        if (season === "")
            return true;
        switch (season) {
            case "valentines":
                return this.allUnlocked(this.valentineUpgrades);
            case "christmas":
                // If all season upgrades are unlocked, stay in Christmas
                if (this.allUnlocked(this.allSeasonUpgrades))
                    return false;
                // Otherwise check if Christmas-specific upgrades are done
                return this.allUnlocked(this.christmasUpgrades);
            case "easter":
                return (!!Game.Achievements["Hide & seek champion"].won &&
                    this.allUnlocked(this.easterUpgrades));
            case "halloween":
                return this.allUnlocked(this.halloweenUpgrades);
            default:
                return true;
        }
    }
    /**
     * Cleanup method to clear any pending timeouts
     */
    cleanup() {
        if (this.elfClickTimeout !== null) {
            clearTimeout(this.elfClickTimeout);
            this.elfClickTimeout = null;
        }
    }
    /**
     * Get current season handler status
     */
    getStatus() {
        const currentSeason = Game.season || 'none';
        // Check if season switcher is unlocked
        if (!Game.Upgrades["Season switcher"].bought) {
            return {
                module: 'Season',
                status: 'disabled',
                currentAction: 'Season switcher not unlocked',
                reason: 'Need to unlock Season switcher upgrade',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Season Switcher': 'Not unlocked'
                }
            };
        }
        // Check Born Again mode
        if (Game.ascensionMode === 1) {
            return {
                module: 'Season',
                status: 'disabled',
                currentAction: 'Born Again mode',
                reason: 'Season cycling disabled in Born Again',
                icon: '🎄',
                details: {
                    'Mode': 'Born Again',
                    'Current Season': currentSeason === '' ? 'None' : currentSeason
                }
            };
        }
        // Check for too many switches
        if (Game.seasonUses > 20) {
            return {
                module: 'Season',
                status: 'idle',
                currentAction: 'Season switching limit reached',
                reason: 'Already switched 20+ times',
                nextAction: 'Staying in current season',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Switches': Game.seasonUses
                }
            };
        }
        // Check for Santa development
        if (Game.Upgrades["A festive hat"].bought &&
            !Game.Upgrades["Santa's dominion"].unlocked) {
            return {
                module: 'Season',
                status: 'active',
                currentAction: 'Developing Santa',
                reason: 'Upgrading Santa for dominion',
                nextAction: 'Will cycle seasons after',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Santa': 'Upgrading'
                }
            };
        }
        // Check for Christmas elf achievement
        if (currentSeason === 'christmas' &&
            !Game.Achievements["Baby it's old outside"].won &&
            Game.Objects["Grandma"].amount > 0) {
            const elfGrandmas = Game.Objects["Grandma"].pics.filter((p) => p.pic === "elfGrandma.png");
            if (elfGrandmas.length > 0) {
                return {
                    module: 'Season',
                    status: 'active',
                    currentAction: 'Hunting Christmas elf',
                    reason: 'Working on "Baby it\'s old outside" achievement',
                    icon: '🎄',
                    details: {
                        'Current Season': 'Christmas',
                        'Elf Detected': true
                    }
                };
            }
        }
        // Check if current season is finished
        const seasonDone = this.seasonFinished(currentSeason);
        const allSeasonUpgradesUnlocked = this.allUnlocked(this.allSeasonUpgrades);
        if (!seasonDone) {
            // Still collecting upgrades in current season
            const seasonUpgrades = currentSeason === 'valentines' ? this.valentineUpgrades
                : currentSeason === 'christmas' ? this.christmasUpgrades
                    : currentSeason === 'easter' ? this.easterUpgrades
                        : currentSeason === 'halloween' ? this.halloweenUpgrades
                            : [];
            const unlockedCount = seasonUpgrades.filter(id => Game.UpgradesById[id].unlocked).length;
            const totalCount = seasonUpgrades.length;
            return {
                module: 'Season',
                status: 'waiting',
                currentAction: `Collecting ${currentSeason} upgrades`,
                reason: `${unlockedCount}/${totalCount} upgrades collected`,
                nextAction: seasonDone ? 'Will switch to next season' : 'Waiting for more drops',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Upgrades': `${unlockedCount}/${totalCount}`,
                    'Finished': seasonDone
                }
            };
        }
        // Season is finished - ready to switch
        const nextSeason = currentSeason === 'christmas' ? 'valentines'
            : currentSeason === 'valentines' ? 'easter'
                : currentSeason === 'easter' ? 'halloween'
                    : 'christmas';
        return {
            module: 'Season',
            status: 'active',
            currentAction: 'Switching seasons',
            reason: `${currentSeason} completed`,
            nextAction: `Switching to ${nextSeason}`,
            icon: '🎄',
            details: {
                'Current Season': currentSeason === '' ? 'None' : currentSeason,
                'Next Season': nextSeason,
                'All Upgrades': allSeasonUpgradesUnlocked ? 'Yes' : 'No'
            }
        };
    }
}

;// ./src/modules/SugarLumpManager.ts
/**
 * Manages sugar lump harvesting and spending
 *
 * Handles:
 * - Automatic lump harvesting at optimal times
 * - Auto-spending lumps on building levels for minigames
 * - Lump type manipulation for achievements (when cheating enabled)
 */
// Sugar lump types
var LumpType;
(function (LumpType) {
    LumpType[LumpType["Normal"] = 0] = "Normal";
    LumpType[LumpType["Bifurcated"] = 1] = "Bifurcated";
    LumpType[LumpType["Golden"] = 2] = "Golden";
    LumpType[LumpType["Meaty"] = 3] = "Meaty";
    LumpType[LumpType["Caramelized"] = 4] = "Caramelized";
})(LumpType || (LumpType = {}));
// Building IDs for level 1 order (unlocking minigames)
const LEVEL_1_ORDER = [2, 6, 7, 5]; // Farm, Wizard tower, Temple, Bank (Garden, Grimoire, Pantheon, Stock Market)
// Lump-related achievement IDs (307-320, plus 336, 427, 447, 525, 396, 268, 271)
const LUMP_RELATED_ACHIEVEMENTS = [
    307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
    336, 427, 447, 525, 396, 268, 271
];
class SugarLumpManager {
    /**
     * Constructor - expects 1 argument: state object
     * @param state AutoPlayState for accessing game state
     */
    constructor(state) {
        this.minLumpsOK = false;
        this.cheatLumps = false;
        this.canUseLumps = false;
        // Extended config for sugar lumps
        this.cheatLumpsLevel = 0;
        this.state = state;
        // Default activity logger - should be overridden via setAddActivity if needed
        this.addActivity = (msg) => console.log(`[SugarLumps] ${msg}`);
    }
    /**
     * Set the activity logging callback
     * @param addActivity Callback to log activities
     */
    setAddActivity(addActivity) {
        this.addActivity = addActivity;
    }
    /**
     * Set the cheat lumps level
     * @param level CheatLumps configuration level
     */
    setCheatLumpsLevel(level) {
        this.cheatLumpsLevel = level;
    }
    /**
     * Main sugar lump handler - called periodically with no parameters
     */
    handleSugarLumps() {
        // Type assertions for Game properties not yet in type definitions
        const game = Game;
        if (!game.canLumps())
            return; // Do not work with sugar lumps before enabled
        if (Game.ascensionMode === 1)
            return; // No sugar lumps in born again mode
        const now = this.state.now;
        const age = now - game.lumpT;
        // Hand-pick normal lumps when mature for "Hand-picked" achievement
        if (age >= game.lumpMatureAge &&
            game.lumpCurrentType === LumpType.Normal &&
            this.minLumpsOK &&
            !Game.Achievements["Hand-picked"].won) {
            this.harvestLump();
        }
        // Normal harvesting when ripe
        if (age >= game.lumpRipeAge) {
            this.harvestLump();
        }
        // Apply lump time cheats if enabled
        this.cheatSugarLumps(age);
        // Auto-spend lumps on building levels
        this.useLump();
    }
    /**
     * Harvest a sugar lump by clicking it
     */
    harvestLump() {
        const game = Game;
        game.clickLump();
        this.useLump(); // Immediately try to use the harvested lump
    }
    /**
     * Accelerate sugar lump growth and manipulate types (cheating)
     */
    cheatSugarLumps(age) {
        const game = Game;
        this.cheatLumps = false;
        if (this.cheatLumpsLevel === 0)
            return;
        let cheatReduction = 25;
        // Level 1: Only cheat during endgame for lump achievements
        if (this.cheatLumpsLevel === 1) {
            // Check if we're in end phase and not finished
            if (typeof AutoPlay !== 'undefined') {
                if (AutoPlay.finished)
                    return;
                if (typeof AutoPlay.endPhase === 'function' && !AutoPlay.endPhase())
                    return;
            }
            // If all lump achievements are done, no need to cheat
            if (LUMP_RELATED_ACHIEVEMENTS.every((a) => Game.AchievementsById[a].won)) {
                return;
            }
            // Apply 625x speedup when targeting lump achievements
            if (typeof AutoPlay !== 'undefined' && 'nextAchievement' in AutoPlay) {
                if (LUMP_RELATED_ACHIEVEMENTS.includes(AutoPlay.nextAchievement)) {
                    cheatReduction *= 25; // 25 * 25 = 625x total speedup
                }
            }
        }
        this.cheatLumps = true;
        this.addActivity('Cheating sugar lumps.');
        // Set cheat reduction based on level
        if (this.cheatLumpsLevel === 2)
            cheatReduction = 25;
        if (this.cheatLumpsLevel === 3)
            cheatReduction = 25 * 25;
        if (this.cheatLumpsLevel === 4)
            cheatReduction = 25 * 25 * 25;
        // Accelerate lump growth by reducing time
        const cheatDelay = game.lumpRipeAge / cheatReduction;
        if (age < game.lumpRipeAge - cheatDelay) {
            game.lumpT -= cheatDelay * (cheatReduction - 1);
        }
        // Max level: manipulate lump types for achievements (RNG manipulation)
        if (this.cheatLumpsLevel === 4) {
            if (!Game.Achievements["Sugar sugar"].won) {
                // Bifurcated sugar lumps
                game.lumpCurrentType = LumpType.Bifurcated;
            }
            else if (!Game.Achievements["Sweetmeats"].won &&
                game.elderWrath > 0) {
                // Meaty sugar lumps (grandmapocalypse only)
                game.lumpCurrentType = LumpType.Meaty;
            }
            else if (!Game.Achievements["Maillard reaction"].won) {
                // Caramelized sugar lumps
                game.lumpCurrentType = LumpType.Caramelized;
            }
            else {
                // Golden sugar lumps by default (give the most lumps when harvested)
                game.lumpCurrentType = LumpType.Golden;
            }
        }
    }
    /**
     * Auto-spend lumps on building levels (recursive)
     * Priority:
     * 1. Level 1 for minigame buildings (Garden, Grimoire, Pantheon, Stock Market)
     * 2. Farm to level 9 (for Garden)
     * 3. Cursor to level 12 (for Stock Market)
     * 4. All buildings to level 10
     * 5. Cursor to level 20 (for Luminous Gloves achievement)
     */
    useLump() {
        this.canUseLumps = false;
        if (!Game.lumps)
            return;
        // Step 1: Get level 1 for minigame buildings
        for (const buildingId of LEVEL_1_ORDER) {
            const building = Game.ObjectsById[buildingId];
            if (!building.level && Game.lumps) {
                building.levelUp();
                this.useLump(); // Recursive call
                return;
            }
        }
        // Step 2: Bring Farm (Garden) to level 9
        const farm = Game.Objects["Farm"];
        if (farm.level < 9) {
            if (farm.level < Game.lumps) {
                farm.levelUp();
                this.useLump();
            }
            return;
        }
        // After Garden is level 9, we have minimum lumps OK
        this.minLumpsOK = true;
        // Keep reserve lumps before endgame
        const endPhase = (typeof AutoPlay !== 'undefined' && typeof AutoPlay.endPhase === 'function')
            ? AutoPlay.endPhase()
            : false;
        const lumpLimit = endPhase ? 0 : 100;
        // Step 3: Bring Cursor (Stock Market) to level 12
        const cursor = Game.Objects["Cursor"];
        if (cursor.level < 12) {
            if (cursor.level + lumpLimit < Game.lumps) {
                cursor.levelUp();
                this.useLump();
            }
            return;
        }
        // Step 4: Bring all buildings to level 10 (reverse order for efficiency)
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const building = Game.ObjectsById[i];
            if (building.level < 10) {
                if (building.level + lumpLimit < Game.lumps) {
                    building.levelUp();
                    this.useLump();
                    return;
                }
            }
        }
        // All buildings are at least level 10
        this.canUseLumps = true;
        // Step 5: Bring Cursor to level 20 for "Luminous gloves" achievement
        if (cursor.level < 20) {
            if (cursor.level + 100 < Game.lumps) {
                cursor.levelUp();
                this.useLump();
                return;
            }
            else {
                this.canUseLumps = false;
            }
        }
    }
    /**
     * Get whether we can spend lumps freely (all priority upgrades done)
     */
    getCanUseLumps() {
        return this.canUseLumps;
    }
    /**
     * Get whether minimum lump requirements are met
     */
    getMinLumpsOK() {
        return this.minLumpsOK;
    }
    /**
     * Get whether we're currently cheating lumps
     */
    isCheatLumps() {
        return this.cheatLumps;
    }
    /**
     * Get current sugar lump manager status
     */
    getStatus() {
        const game = Game;
        // Check if lumps are unlocked
        if (!game.canLumps()) {
            return {
                module: 'Sugar Lumps',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to bake 1 billion cookies first',
                icon: '🍬',
                details: {
                    'Cookies Baked': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.cookiesEarned)) : Math.floor(Game.cookiesEarned)
                }
            };
        }
        // Check for Born Again mode
        if (Game.ascensionMode === 1) {
            return {
                module: 'Sugar Lumps',
                status: 'disabled',
                currentAction: 'Born Again mode',
                reason: 'Sugar lumps disabled in Born Again',
                icon: '🍬',
                details: {
                    'Mode': 'Born Again'
                }
            };
        }
        const now = this.state.now;
        const age = now - game.lumpT;
        const matureAge = game.lumpMatureAge;
        const ripeAge = game.lumpRipeAge;
        const timeUntilRipe = Math.max(0, ripeAge - age);
        const minutesUntilRipe = Math.floor(timeUntilRipe / 1000 / 60);
        const hoursUntilRipe = Math.floor(minutesUntilRipe / 60);
        const lumpType = ['Normal', 'Bifurcated', 'Golden', 'Meaty', 'Caramelized'][game.lumpCurrentType] || 'Unknown';
        // Check if cheating lumps
        if (this.cheatLumps) {
            const speedup = this.cheatLumpsLevel === 1 ? '25x or 625x'
                : this.cheatLumpsLevel === 2 ? '25x'
                    : this.cheatLumpsLevel === 3 ? '625x'
                        : '15625x';
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Cheating lumps',
                reason: `${speedup} speedup + type manipulation`,
                nextAction: `Harvesting in ${minutesUntilRipe}m`,
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Cheat Level': this.cheatLumpsLevel,
                    'Time': `${minutesUntilRipe}m`
                }
            };
        }
        // Check if waiting for mature (Hand-picked achievement)
        if (age >= matureAge && game.lumpCurrentType === 0 &&
            this.minLumpsOK && !Game.Achievements["Hand-picked"].won) {
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Harvesting mature lump',
                reason: 'Working on Hand-picked achievement',
                nextAction: 'Will harvest normal lumps when mature',
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Age': 'Mature',
                    'Achievement': 'Hand-picked'
                }
            };
        }
        // Check if ready to harvest
        if (age >= ripeAge) {
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Harvesting lump',
                reason: 'Lump is ripe',
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Age': 'Ripe'
                }
            };
        }
        // Check auto-spending status
        const farm = Game.Objects["Farm"];
        const cursor = Game.Objects["Cursor"];
        let spendingStatus = '';
        if (!farm || farm.level < 9) {
            spendingStatus = `Upgrading Farm to level 9 (current: ${farm?.level || 0})`;
        }
        else if (!this.minLumpsOK) {
            spendingStatus = 'Garden at level 9';
        }
        else if (cursor.level < 12) {
            spendingStatus = `Upgrading Cursor to level 12 (current: ${cursor.level})`;
        }
        else if (!this.canUseLumps) {
            spendingStatus = 'Upgrading all buildings to level 10';
        }
        else if (cursor.level < 20) {
            spendingStatus = 'Upgrading Cursor to level 20 (Luminous gloves)';
        }
        else {
            spendingStatus = 'All priority upgrades done';
        }
        // Growing
        return {
            module: 'Sugar Lumps',
            status: 'waiting',
            currentAction: 'Growing lump',
            reason: hoursUntilRipe > 0 ? `${hoursUntilRipe}h ${minutesUntilRipe % 60}m until ripe` : `${minutesUntilRipe}m until ripe`,
            nextAction: spendingStatus,
            icon: '🍬',
            details: {
                'Lumps': Game.lumps,
                'Type': lumpType,
                'Time': `${hoursUntilRipe}h ${minutesUntilRipe % 60}m`,
                'Auto-Spending': spendingStatus
            }
        };
    }
}

;// ./src/modules/WrinklerManager.ts
/**
 * Manages wrinkler popping strategy
 *
 * This module handles:
 * - Deciding when to pop wrinklers (all at once or one at a time)
 * - Finding the best wrinkler to pop based on cookies sucked
 * - Detecting shiny wrinklers (type === 1)
 * - Calculating wrinkler value
 * - Managing wrinkler-related achievements
 */

class WrinklerManager {
    constructor(state) {
        this.wantedAchievements = [];
        this.nextAchievement = 0;
        this.state = state;
    }
    /**
     * Set dependencies (called after construction to avoid circular dependencies)
     */
    setDependencies(seasonHandler, wantedAchievements, nextAchievement) {
        this.seasonHandler = seasonHandler;
        this.wantedAchievements = wantedAchievements;
        this.nextAchievement = nextAchievement;
    }
    /**
     * Update state (called periodically from AutoPlay)
     */
    updateState(nextAchievement) {
        this.nextAchievement = nextAchievement;
    }
    /**
     * Main wrinkler handling logic
     * Runs periodically to manage wrinkler popping strategy
     */
    handleWrinklers() {
        this.state.poppingWrinklers = false;
        // Don't handle wrinklers until One mind is bought (unlocks wrinklers)
        if (!Game.Upgrades["One mind"].bought) {
            return;
        }
        // Determine if we should pop all wrinklers
        const shouldPopAll = this.shouldPopAllWrinklers();
        if (shouldPopAll) {
            this.popAllWrinklers();
        }
        else {
            this.handleSingleWrinklerPopping();
        }
    }
    /**
     * Determine if we should pop all wrinklers at once
     * This is done for:
     * - Easter/Halloween seasons (for cookie drops)
     * - Unholy bait achievement (Moistburster)
     * - End phase achievement (Last Chance to See)
     */
    shouldPopAllWrinklers() {
        // Pop during easter or halloween if season not finished
        let doPop = (Game.season === "easter" || Game.season === "halloween");
        doPop = doPop && !this.seasonFinished();
        // Pop if we have Unholy bait and haven't won Moistburster achievement
        // Game.Upgrades[...].bought returns number (0 or 1), so convert to boolean
        doPop = doPop ||
            (!!Game.Upgrades["Unholy bait"].bought && !Game.Achievements["Moistburster"].won);
        // Pop in end phase if we haven't won Last Chance to See achievement
        doPop = doPop ||
            (this.isEndPhase() && !Game.Achievements["Last Chance to See"].won);
        return doPop;
    }
    /**
     * Pop all attached wrinklers
     */
    popAllWrinklers() {
        this.state.poppingWrinklers = true;
        this.state.wrinklerTime = this.state.now;
        Logger.addActivity("Popping wrinklers for droppings and/or achievements.");
        Logger.logStatus('wrinkler', 'Popping all wrinklers');
        // Pop all attached wrinklers (close === 1)
        Game.wrinklers.forEach((w) => {
            if (w.close === 1) {
                w.hp = 0; // Setting hp to 0 pops the wrinkler
            }
        });
    }
    /**
     * Handle single wrinkler popping strategy
     * Pops one wrinkler every 2 hours
     */
    handleSingleWrinklerPopping() {
        // Handle Wrinkler poker achievement (pop wrinkler #3)
        if (!Game.Achievements['Wrinkler poker'].won && Game.wrinklers[3].close === 1) {
            Game.wrinklers[3].selected = 1;
            l('backgroundLeftCanvas').click();
        }
        // Find the next wrinkler to pop (highest sucked value)
        this.findNextWrinkler();
        // Calculate time since last pop
        const minutesSinceLastPop = Math.floor((this.state.now - this.state.wrinklerTime) / 1000 / 60);
        Logger.addActivity(`Popping one wrinkler per two hours, last ${minutesSinceLastPop} minutes ago.`);
        // Pop the selected wrinkler if it's time (2 hours = 2*60*60*1000 ms)
        if (this.state.nextWrinkler !== -1) {
            const twoHoursInMs = 2 * 60 * 60 * 1000;
            if (this.state.now - this.state.wrinklerTime >= twoHoursInMs) {
                Game.wrinklers[this.state.nextWrinkler].hp = 0; // Pop the wrinkler
                this.state.wrinklerTime = this.state.now;
                Logger.logStatus('wrinkler', 'Popped single wrinkler');
            }
        }
    }
    /**
     * Find the next wrinkler to pop
     * Selects the wrinkler with the most cookies sucked
     * If there's an empty spot, don't pop any wrinkler (let it fill up)
     */
    findNextWrinkler() {
        let nextId = -1;
        let maxSucked = 0;
        for (const w of Game.wrinklers) {
            // Check if there's an empty spot (not attached, but within max wrinklers)
            if (w.close === 0 && w.id < Game.getWrinklersMax()) {
                // Empty spot found - don't pop any wrinkler, let it fill up
                this.state.nextWrinkler = -1;
                return;
            }
            // Track wrinkler with most cookies sucked
            if (w.sucked > maxSucked) {
                maxSucked = w.sucked;
                nextId = w.id;
            }
        }
        this.state.nextWrinkler = nextId;
    }
    /**
     * Check if a wrinkler is shiny
     * Shiny wrinklers have type === 1 and are rarer/more valuable
     */
    isShinyWrinkler(wrinkler) {
        return wrinkler.type === 1;
    }
    /**
     * Calculate the value (cookies) stored in a wrinkler
     * This is the amount of cookies that would be returned when popped
     * Shiny wrinklers return 3x the normal amount
     */
    getWrinklerValue(wrinkler) {
        if (wrinkler.close === 0) {
            return 0; // Not attached
        }
        // Base value is the amount sucked
        let value = wrinkler.sucked;
        // Wrinklers return 1.1x what they sucked
        value *= 1.1;
        // Shiny wrinklers return 3x
        if (this.isShinyWrinkler(wrinkler)) {
            value *= 3;
        }
        return value;
    }
    /**
     * Get total value stored in all wrinklers
     */
    getTotalWrinklerValue() {
        return Game.wrinklers.reduce((total, w) => {
            return total + this.getWrinklerValue(w);
        }, 0);
    }
    /**
     * Count attached wrinklers
     */
    getAttachedWrinklerCount() {
        return Game.wrinklers.filter((w) => w.close === 1).length;
    }
    /**
     * Count shiny wrinklers
     */
    getShinyWrinklerCount() {
        return Game.wrinklers.filter((w) => w.close === 1 && this.isShinyWrinkler(w)).length;
    }
    // ============ Helper methods ============
    /**
     * Check if current season is finished (all upgrades collected)
     * Delegates to SeasonHandler
     */
    seasonFinished() {
        if (!this.seasonHandler) {
            // Fallback if dependencies not set yet
            return false;
        }
        return this.seasonHandler.seasonFinished(Game.season);
    }
    /**
     * Check if we're in the end phase (all achievements collected)
     * Returns true when nextAchievement is NOT in the wantedAchievements list
     * (meaning we've completed all wanted achievements and moved to the end phase)
     */
    isEndPhase() {
        return this.wantedAchievements.indexOf(this.nextAchievement) < 0;
    }
    /**
     * Get current wrinkler manager status
     */
    getStatus() {
        // Check if wrinklers are unlocked
        if (!Game.Upgrades["One mind"].bought) {
            return {
                module: 'Wrinklers',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to purchase "One mind" upgrade',
                icon: '🐛',
                details: {
                    'Grandmapocalypse': 'Not started'
                }
            };
        }
        const attachedCount = this.getAttachedWrinklerCount();
        const shinyCount = this.getShinyWrinklerCount();
        const totalValue = this.getTotalWrinklerValue();
        const maxWrinklers = Game.getWrinklersMax();
        // Check if popping all wrinklers
        if (this.state.poppingWrinklers) {
            return {
                module: 'Wrinklers',
                status: 'active',
                currentAction: 'Popping all wrinklers',
                reason: Game.season === 'easter' || Game.season === 'halloween'
                    ? 'Season drops'
                    : Game.Upgrades["Unholy bait"].bought && !Game.Achievements["Moistburster"].won
                        ? 'Moistburster achievement'
                        : 'Last Chance to See achievement',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Shiny': shinyCount,
                    'Total Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue)
                }
            };
        }
        // Check for Wrinkler poker achievement
        if (!Game.Achievements['Wrinkler poker'].won && Game.wrinklers[3].close === 1) {
            return {
                module: 'Wrinklers',
                status: 'active',
                currentAction: 'Popping wrinkler #3',
                reason: 'Working on Wrinkler poker achievement',
                nextAction: 'Then rotate popping every 2 hours',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Max Wrinklers': maxWrinklers
                }
            };
        }
        // Regular rotation mode
        const minutesSinceLastPop = Math.floor((this.state.now - this.state.wrinklerTime) / 1000 / 60);
        const minutesUntilNext = 120 - minutesSinceLastPop;
        if (this.state.nextWrinkler === -1) {
            return {
                module: 'Wrinklers',
                status: 'waiting',
                currentAction: 'Waiting for spots to fill',
                reason: `${attachedCount}/${maxWrinklers} wrinklers attached`,
                nextAction: 'Will pop one every 2 hours when full',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Max Wrinklers': maxWrinklers,
                    'Shiny': shinyCount
                }
            };
        }
        return {
            module: 'Wrinklers',
            status: minutesUntilNext <= 0 ? 'active' : 'waiting',
            currentAction: minutesUntilNext <= 0 ? 'Popping oldest wrinkler' : 'Rotating wrinklers',
            reason: `Pop one every 2 hours (last ${minutesSinceLastPop}m ago)`,
            nextAction: minutesUntilNext > 0 ? `Next pop in ${minutesUntilNext} minutes` : undefined,
            icon: '🐛',
            details: {
                'Attached': attachedCount,
                'Shiny': shinyCount,
                'Total Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue),
                'Next Pop': minutesUntilNext > 0 ? `${minutesUntilNext}m` : 'Now'
            }
        };
    }
}

;// ./src/modules/AchievementHandler.ts
/**
 * Handles achievement hunting (small achievements, ascension-related)
 */
class AchievementHandler {
    /**
     * Handle small achievements that can be obtained through simple interactions
     */
    handleSmallAchievements() {
        // Tabloid addiction - click news ticker 50 times
        if (!Game.Achievements['Tabloid addiction'].won) {
            for (let i = 0; i < 50; i++) {
                Game.tickerL.click();
            }
        }
        // Here you go - click the achievement itself
        if (!Game.Achievements['Here you go'].won) {
            Game.Achievements['Here you go'].click();
        }
        // Tiny cookie - click the tiny cookie
        if (!Game.Achievements['Tiny cookie'].won) {
            Game.ClickTinyCookie();
        }
        // God complex - name bakery "Orteil"
        const bakeryName = Game.bakeryName;
        if (!Game.Achievements['God complex'].won) {
            Game.bakeryName = 'Orteil';
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
            Game.bakeryName = bakeryName;
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // What's in a name - add robot name to bakery name
        if (!Game.Achievements["What's in a name"].won) {
            Game.bakeryName = AutoPlay.robotName + bakeryName;
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // Remove robot name if it's still there
        if (Game.bakeryName.slice(0, AutoPlay.robotName.length) === AutoPlay.robotName) {
            Game.bakeryName = Game.bakeryName.slice(AutoPlay.robotName.length);
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // Cheated cookies taste awful - get this after all other achievements
        if (AutoPlay.endPhase() && !Game.Achievements['Cheated cookies taste awful'].won) {
            Game.Win('Cheated cookies taste awful');
        }
        // Third-party - using a third-party tool
        if (!Game.Achievements['Third-party'].won) {
            Game.Win('Third-party');
        }
        // Olden days - find the forgotten madeleine
        if (!Game.Achievements['Olden days'].won) {
            const currentMenu = Game.onMenu;
            Game.ShowMenu('log');
            const menuDivs = l('menu')?.getElementsByTagName('div');
            if (menuDivs) {
                const madeleine = menuDivs[menuDivs.length - 1];
                madeleine.scrollIntoView();
                madeleine.click();
                Game.tickerL.scrollIntoView();
            }
            Game.ShowMenu(currentMenu);
            AutoPlay.info('found the forgotten madeleine at the very bottom of the "Info" menu');
        }
        // Cookie-dunker - dunk the cookie in milk
        if (!Game.Achievements['Cookie-dunker'].won && Game.milkProgress > 1 && Game.milkHd > 0.34) {
            if (AutoPlay.backupHeight) {
                Game.LeftBackground.canvas.height = AutoPlay.backupHeight;
                AutoPlay.backupHeight = 0;
            }
            else {
                AutoPlay.backupHeight = Game.LeftBackground.canvas.height;
                Game.LeftBackground.canvas.height = 400;
                setTimeout(() => this.undunkCookie(), 20 * 1000);
            }
        }
        // Stifling the press - mute the news ticker
        if (!Game.Achievements['Stifling the press'].won) {
            const savedNarrowSize = Game.tickerTooNarrow;
            Game.tickerTooNarrow = Game.windowW + 10;
            Game.tickerL.click();
            Game.tickerTooNarrow = savedNarrowSize;
        }
        // No time like the present - send and redeem a gift
        if (!Game.Achievements['No time like the present'].won &&
            Game.Has('Wrapping paper') && !Game.hasBuff('Gifted out')) {
            if (!AutoPlay.giftCode) {
                Game.promptGiftSend();
                const giftAmountEl = l('giftAmount');
                const giftMessageEl = l('giftMessage');
                const giftCodeEl = l('giftCode');
                const confirmBtn = l('promptOption0');
                if (giftAmountEl && giftMessageEl && giftCodeEl && confirmBtn) {
                    giftAmountEl.value = '42';
                    giftMessageEl.value = 'A gift for myself';
                    confirmBtn.click();
                    AutoPlay.giftCode = giftCodeEl.value;
                    confirmBtn.click();
                    AutoPlay.info('Created present with code ' + AutoPlay.giftCode);
                    setTimeout(() => this.redeemPresent(), 61 * 60 * 1000); // wait an hour
                }
            }
            else {
                Game.promptGiftRedeem();
                const giftCodeEl = l('giftCode');
                const confirmBtn = l('promptOption0');
                if (giftCodeEl && confirmBtn) {
                    giftCodeEl.value = String(AutoPlay.giftCode);
                    AutoPlay.giftCode = 0;
                    confirmBtn.click();
                }
            }
        }
        // In her likeness - customize the You building
        // Only after player has at least one You building (fixes issue #97)
        if (!Game.Achievements['In her likeness'].won && Game.Objects.You.amount > 0) {
            Game.YouCustomizer.load('9,6,-,3,-,0,3', true);
            // This is already correct, but we need to trigger the change
            Game.YouCustomizer.offsetGene('head', -1);
        }
    }
    /**
     * Undunk the cookie after getting the achievement
     */
    undunkCookie() {
        if (!Game.Achievements['Cookie-dunker'].won) {
            setTimeout(() => this.undunkCookie(), 20 * 1000);
            return;
        }
        Game.LeftBackground.canvas.height = AutoPlay.backupHeight;
        AutoPlay.backupHeight = 0;
    }
    /**
     * Redeem a previously sent gift
     */
    redeemPresent() {
        AutoPlay.info('Redeeming present with code ' + AutoPlay.giftCode);
        if (AutoPlay.giftCode) {
            Game.promptGiftRedeem();
            const giftCodeEl = l('giftCode');
            const confirmBtn = l('promptOption0');
            if (giftCodeEl && confirmBtn) {
                giftCodeEl.value = String(AutoPlay.giftCode);
                AutoPlay.giftCode = 0;
                confirmBtn.click(); // redeem
                confirmBtn.click(); // close window
            }
        }
    }
    /**
     * Check if we're in the end phase of achievement hunting
     */
    endPhase() {
        return AutoPlay.wantedAchievements.indexOf(AutoPlay.nextAchievement) < 0;
    }
    /**
     * Check if we're in grinding mode (hunting last 10 achievements)
     */
    grinding() {
        const grindingStart = AutoPlay.wantedAchievements[AutoPlay.wantedAchievements.length - 10];
        if (Game.AchievementsById[grindingStart].won) {
            // Grind for the last 7 big achievements
            if (!this.endPhase()) {
                AutoPlay.addActivity('Grinding cookies - do not sleep at night.');
                return true;
            }
        }
        return false;
    }
    /**
     * Check if we should use cheats during grinding (last 8 achievements)
     */
    grindingCheat() {
        if (!this.grinding())
            return false;
        const cheatingStart = AutoPlay.wantedAchievements[AutoPlay.wantedAchievements.length - 8];
        if (Game.AchievementsById[cheatingStart].won) {
            // Cheat for the last 5 big achievements
            return true;
        }
        return false;
    }
    /**
     * Find the next achievement to pursue
     */
    findNextAchievement() {
        AutoPlay.wantAscend = false;
        this.handleSmallAchievements();
        for (let i = 0; i < AutoPlay.wantedAchievements.length; i++) {
            if (!Game.AchievementsById[AutoPlay.wantedAchievements[i]].won) {
                AutoPlay.nextAchievement = AutoPlay.wantedAchievements[i];
                AutoPlay.setMainActivity('Trying to get achievement: ' +
                    Game.AchievementsById[AutoPlay.nextAchievement].ddesc.replace(/<q>.*?<\/q>/ig, ''));
                return;
            }
        }
        this.checkAllAchievementsOK();
    }
    /**
     * Check if all achievements have been obtained
     */
    checkAllAchievementsOK() {
        // Check regular achievements (excluding dungeon and one-year legacy)
        for (const key in Game.Achievements) {
            const achievement = Game.Achievements[key];
            if (!achievement.won &&
                achievement.pool !== 'dungeon' &&
                achievement.id !== 367 &&
                !AutoPlay.lateAchievements.includes(achievement.id)) {
                AutoPlay.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                    achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                    ', try to get it now.');
                AutoPlay.nextAchievement = achievement.id;
                return false;
            }
        }
        // Check late achievements
        for (const achievementId of AutoPlay.lateAchievements) {
            const achievement = Game.AchievementsById[achievementId];
            if (!achievement.won && achievement.pool !== 'dungeon' && achievement.id !== 367) {
                AutoPlay.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                    achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                    ', try to get it now.');
                AutoPlay.nextAchievement = achievement.id;
                return false;
            }
        }
        // Check prestige upgrades
        for (const key in Game.Upgrades) {
            const upgrade = Game.Upgrades[key];
            if (upgrade.pool === 'prestige' && !upgrade.bought) {
                AutoPlay.nextAchievement = 99; // Follow the white rabbit (from dungeons)
                AutoPlay.setMainActivity('Prestige upgrade ' + upgrade.name + ' is missing, waiting to buy it.');
                return false;
            }
        }
        // Wait for one-year legacy achievement
        if (!Game.Achievements['So much to do so much to see'].won) {
            const achievement = Game.Achievements['So much to do so much to see'];
            AutoPlay.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                ', try to get it now.');
            AutoPlay.nextAchievement = achievement.id;
            return false;
        }
        // All achievements complete!
        AutoPlay.finished = true;
        AutoPlay.setMainActivity('My job is done here, have a nice day. I am still idling along.');
        AutoPlay.nextAchievement = 99; // Follow the white rabbit (from dungeons)
        return true;
    }
    /**
     * Main handler called periodically
     */
    handleAchievements() {
        // Find next achievement if current one is complete
        if (Game.AchievementsById[AutoPlay.nextAchievement].won) {
            this.findNextAchievement();
        }
    }
    /**
     * Get achievement handler status
     */
    getStatus() {
        if (AutoPlay.finished) {
            return {
                module: 'Achievements',
                status: 'idle',
                currentAction: 'All achievements complete',
                reason: 'Job done, idling along',
                icon: '🏆',
                details: {
                    'Status': 'Complete'
                }
            };
        }
        const achievement = Game.AchievementsById[AutoPlay.nextAchievement];
        if (!achievement) {
            return {
                module: 'Achievements',
                status: 'active',
                currentAction: 'Tracking achievements',
                reason: 'Looking for next achievement',
                icon: '🏆',
                details: {}
            };
        }
        const totalAchievements = Object.keys(Game.Achievements).length;
        const wonCount = Object.values(Game.Achievements).filter((a) => a.won).length;
        return {
            module: 'Achievements',
            status: 'active',
            currentAction: `Working on: ${achievement.name}`,
            reason: achievement.ddesc.replace(/<q>.*?<\/q>/ig, '').substring(0, 50),
            nextAction: this.grinding() ? 'Grinding mode (no sleep)' : undefined,
            icon: '🏆',
            details: {
                'Current': achievement.name,
                'Progress': `${wonCount}/${totalAchievements}`,
                'Grinding': this.grinding(),
                'Cheating': this.grindingCheat()
            }
        };
    }
}

;// ./src/modules/AscensionManager.ts
/**
 * Manages ascension decisions and heavenly upgrades
 */
// Priority upgrades for heavenly cookie purchases
const PRIO_UPGRADES = [363, 323, 411, 412, 413, 264, 265, 266, 267, 268, 520, 181, 282, 283, 284, 291, 393, 394];
class AscensionManager {
    constructor(context) {
        this.context = context;
        this.state = {
            ascendLimit: 0.9 * Math.floor(2 * (1 - Game.ascendMeterPercent)),
            onAscend: false,
            loggedAchievements: {},
            neverclickWarn: true,
            resetTime: Date.now()
        };
    }
    /**
     * Main handler for ascension logic
     * Checks achievements, prestige levels, and decides when to ascend
     */
    handleAscend() {
        // Check for newly won achievements
        this.checkAchievements();
        // Handle reincarnation if we're on the ascend screen
        if (Game.OnAscend) {
            this.doReincarnate();
            this.context.findNextAchievement();
            this.context.setDeadline(0); // reactivate all activities
            this.context.now = Date.now();
            this.state.onAscend = false;
            this.state.loggedAchievements = {}; // Reset achievement tracking for new run
            return;
        }
        // Continue ascension process if timer is ready
        if (this.state.onAscend && Game.AscendTimer === 0) {
            Game.Ascend(true);
        }
        // Update achievement goals for first run
        if (Game.ascensionMode === 0 && Game.prestige === 0) {
            this.canContinue(); // update achievement goals
        }
        // Check if target achievement was won
        if (Game.AchievementsById[this.context.nextAchievement].won) {
            this.handleAchievementWon();
            return;
        }
        // Check if reborn mode failed
        if (Game.ascensionMode === 1 && !this.canContinue() && !Game.AchievementsById[this.context.nextAchievement].won) {
            this.doAscend("reborn mode did not work, retry.");
            return;
        }
        // Don't ascend right before night
        if (this.context.preNightMode() && this.context.Config.NightMode && this.context.Config.NightMode > 0) {
            return;
        }
        // Check for endless cycle achievement (1000 ascends)
        if (this.checkEndlessCycle()) {
            return;
        }
        // Check for reincarnation achievement (100 ascends)
        if (this.checkReincarnation()) {
            return;
        }
        // Check for time-based ascension (days in run)
        if (this.checkTimeBasedAscension()) {
            return;
        }
        // Check for lucky digit/number/payout upgrades
        if (this.checkLuckyUpgrades()) {
            return;
        }
        // Check for season switcher
        if (!Game.Upgrades["Season switcher"].bought &&
            this.context.nextAchievement === 108 && Game.ascendMeterLevel > 1111) {
            this.doAscend("getting season switcher.");
            return;
        }
    }
    /**
     * Handle heavenly upgrade purchases during ascension
     */
    handleHeavenlyUpgrades() {
        this.buyHeavenlyUpgrades();
    }
    /**
     * Check all achievements and log newly won ones
     */
    checkAchievements() {
        for (const key in Game.Achievements) {
            const achiev = Game.Achievements[key];
            if (achiev.won && !this.state.loggedAchievements[achiev.id]) {
                // This achievement was just won
                this.state.loggedAchievements[achiev.id] = true;
                this.context.logAction('Achievement unlocked', achiev.name + ' - ' + achiev.ddesc.replace(/<q>.*?<\/q>/ig, ''));
            }
        }
    }
    /**
     * Handle when the target achievement is won
     */
    handleAchievementWon() {
        const achiev = Game.AchievementsById[this.context.nextAchievement];
        this.context.logStatus('achievement', 'Unlocked: ' + achiev.name);
        // Check if this is first ascension and if we should wait for 365+ prestige
        const isFirstRun = (Game.prestige === 0);
        const currentPrestige = Game.ascendMeterLevel;
        const isHardcoreAchievement = (achiev.id === Game.Achievements["Hardcore"].id ||
            achiev.id === Game.Achievements["Neverclick"].id ||
            achiev.id === Game.Achievements["True Neverclick"].id);
        if (isFirstRun && currentPrestige < 365 && !isHardcoreAchievement) {
            // Don't ascend yet - need to reach 365+ prestige for first ascension
            this.context.logStatus('prestige', 'Waiting for 365+ prestige before first ascension (currently ' + Math.floor(currentPrestige) + ')');
            return;
        }
        const date = new Date();
        date.setTime(this.context.now - Game.startDate);
        const legacyTime = Game.sayTime(date.getTime() / 1000 * Game.fps, -1);
        date.setTime(this.context.now - Game.fullDate);
        const fullTime = Game.sayTime(date.getTime() / 1000 * Game.fps, -1);
        this.doAscend("have achievement: " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '') +
            " after " + legacyTime + "(total: " + fullTime + ")");
    }
    /**
     * Check for endless cycle achievement (1000 ascends)
     */
    checkEndlessCycle() {
        if (this.context.endPhase() && !Game.Achievements["Endless cycle"].won &&
            !Game.ascensionMode && Game.Upgrades["Sucralosia Inutilis"].bought &&
            Game.Upgrades['Lucky payout'].bought) {
            // this costs approx. 1 minute per ascend
            this.context.activities = "Going for 1000 ascends.";
            this.context.hyperActive = true; // full activity
            this.context.wantAscend = true; // avoid buying plants
            if (Game.ascendMeterLevel > 0) {
                this.doAscend("go for 1000 ascends");
                return true;
            }
        }
        return false;
    }
    /**
     * Check for reincarnation achievement (100 ascends)
     */
    checkReincarnation() {
        if (Game.Upgrades["Permanent upgrade slot V"].bought &&
            !Game.Achievements["Reincarnation"].won && !Game.ascensionMode) {
            // this costs 3+2 minute per 2 ascend
            this.context.activities = "Going for 100 ascends.";
            this.context.hyperActive = true; // full activity
            this.context.wantAscend = true; // avoid buying plants
            if (Game.ascendMeterLevel > 0 &&
                this.state.ascendLimit < Game.ascendMeterLevel * Game.ascendMeterPercent) {
                this.doAscend("go for 100 ascends");
                return true;
            }
        }
        return false;
    }
    /**
     * Check if it's time to ascend based on days in run
     */
    checkTimeBasedAscension() {
        const daysInRun = (this.context.now - Game.startDate) / 1000 / 60 / 60 / 24;
        // Stock market profit check
        if (this.context.nextAchievement === 463 && daysInRun > 10 &&
            Game.Objects["Bank"].minigame && Game.Objects["Bank"].minigame.profit > daysInRun * 300000) {
            this.context.addActivity("Making money in stock market for achievements.");
            return false;
        }
        // Calculate maximum days in run
        const maxDaysInRun = Math.pow(40 * (Game.prestige + 1000000000) / (Game.ascendMeterLevel + 1), 2);
        if (!this.context.wantAscend && daysInRun > 20) {
            this.context.addActivity("Still " + Beautify(maxDaysInRun - daysInRun) +
                " days until next hard ascend.");
        }
        if (daysInRun > maxDaysInRun && daysInRun > 20) {
            // do not ascend if the first digit of the total cookies is a 9
            let x = Game.cookiesEarned;
            while (x > 10)
                x /= 10;
            if (x < 9) {
                this.doAscend("ascend after " + Math.floor(daysInRun) +
                    " days just while waiting for next achievement.");
                return true;
            }
        }
        return false;
    }
    /**
     * Check for lucky digit/number/payout heavenly upgrades
     */
    checkLuckyUpgrades() {
        // Lucky digit (prestige % 10 == 7)
        if (!Game.Upgrades["Lucky digit"].bought && Game.heavenlyChips > 777 &&
            Game.ascendMeterLevel > 0 && Game.ascendMeterLevel < 20 &&
            ((Game.prestige + Game.ascendMeterLevel) % 10 === 7)) {
            this.doAscend("ascend for heavenly upgrade lucky digit.");
            return true;
        }
        // Lucky number (prestige % 1000 == 777)
        if (!Game.Upgrades["Lucky number"].bought && Game.heavenlyChips > 77777 &&
            Game.ascendMeterLevel > 0 && Game.ascendMeterLevel < 200 &&
            ((Game.prestige + Game.ascendMeterLevel) % 1000 === 777)) {
            this.doAscend("ascend for heavenly upgrade lucky number.");
            return true;
        }
        // Lucky payout (need six 7s in prestige)
        if (!Game.Upgrades["Lucky payout"].bought && Game.heavenlyChips > 77777777) {
            const newPrestige = Game.prestige + Game.ascendMeterLevel;
            this.context.wantAscend = true; // avoid buying plants
            this.context.hyperActive = true; // full activity
            this.context.addActivity("Trying to get heavenly upgrade Lucky Payout.");
            const sevenCount = (newPrestige + '').split('7').length - 1;
            if (Math.ceil(sevenCount) >= 4) {
                this.doAscend("ascend for heavenly upgrade lucky payout.");
                return true;
            }
        }
        return false;
    }
    /**
     * Check if we can continue with special achievement runs
     * Returns true if working on special achievement, false otherwise
     */
    canContinue() {
        let needAchievement = false;
        let targetActivity = '';
        this.context.workingOnSpecialAchievement = false; // Clear flag by default
        // Check if Hardcore/Neverclick mode is enabled (AUTO = 1, SKIP = 0)
        const shouldAttemptHardcore = this.context.Config.HardcoreMode === 1;
        // True Neverclick (0 clicks)
        if (shouldAttemptHardcore && !Game.Achievements["True Neverclick"].won && Game.cookieClicks === 0) {
            const achiev = Game.Achievements["True Neverclick"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
            if (this.state.neverclickWarn) {
                Game.Prompt('<h3>Attention</h3><div class="block">' +
                    '<p>Cookie Bot is trying to get the true neverclick achievement.</p>' +
                    '<p>Please do not click cookies now.</p>' +
                    '</div>', ['OK']);
            }
            this.state.neverclickWarn = false;
            needAchievement = true;
        }
        // Neverclick (<=15 clicks)
        else if (shouldAttemptHardcore && !Game.Achievements["Neverclick"].won && Game.cookieClicks <= 15) {
            const achiev = Game.Achievements["Neverclick"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
            needAchievement = true;
        }
        // Hardcore (0 upgrades)
        else if (shouldAttemptHardcore && !Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0) {
            const achiev = Game.Achievements["Hardcore"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
            needAchievement = true;
        }
        if (needAchievement) {
            // Only update if the goal changed
            if (this.context.mainActivity !== targetActivity) {
                this.context.setMainActivity(targetActivity);
                this.context.activities = targetActivity; // Also update activities to match
            }
            this.context.workingOnSpecialAchievement = true; // Flag to skip adding extra activity hints
            return true;
        }
        // Speed baking achievements
        if (!Game.Achievements["Speed baking I"].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 35)) {
            const achiev = Game.Achievements["Speed baking I"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
        }
        else if (!Game.Achievements["Speed baking II"].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 25)) {
            const achiev = Game.Achievements["Speed baking II"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
            // threefold clicking speed
            for (let i = 1; i < 3; i++) {
                setTimeout(() => { Game.ClickCookie(0, Game.computedMouseCps); }, 60 * i);
            }
        }
        else if (!Game.Achievements["Speed baking III"].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 15)) {
            const achiev = Game.Achievements["Speed baking III"];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '');
            // fivefold clicking speed
            for (let i = 1; i < 5; i++) {
                setTimeout(() => { Game.ClickCookie(0, Game.computedMouseCps); }, 30 * i);
            }
        }
        else {
            return false;
        }
        // Only update if the goal changed
        if (this.context.mainActivity !== targetActivity) {
            this.context.setMainActivity(targetActivity);
            this.context.activities = targetActivity; // Also update activities to match
        }
        this.context.workingOnSpecialAchievement = true; // Flag to skip adding extra activity hints
        this.context.hyperActive = true; // full activity for speed baking
        return true;
    }
    /**
     * Public method to trigger ascension with a reason
     * Used by special achievement logic like runJustRight()
     */
    triggerAscend(reason) {
        this.doAscend(reason);
    }
    /**
     * Perform the actual ascension
     */
    doAscend(reason) {
        if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0)
            return;
        if (this.state.onAscend || Game.OnAscend)
            return;
        this.context.logStatus('ascend', reason);
        this.context.wantAscend = this.context.plantPending;
        this.context.addActivity("Preparing to ascend.");
        // Do not ascend when waiting for a plant
        if (this.context.wantAscend)
            return;
        // Do not ascend during sugar frenzy/blessing
        if (Game.hasBuff("Sugar frenzy"))
            return;
        if (Game.hasBuff("Sugar blessing"))
            return;
        this.context.setDeadline(0); // full activity to monitor ascension
        // Pop wrinklers if they're close to ready
        if (Game.wrinklers.some((w) => w.close)) {
            this.context.assignSpirit(0, "scorn", 1);
            this.context.delay = 10;
        }
        Game.wrinklers.forEach((w) => { if (w.close === 1)
            w.hp = 0; });
        // Harvest garden
        if (Game.isMinigameReady && Game.isMinigameReady(Game.Objects["Farm"])) {
            Game.Objects["Farm"].minigame.harvestAll();
        }
        // Sell all stock market goods
        if (Game.isMinigameReady && Game.isMinigameReady(Game.Objects["Bank"])) {
            const market = Game.Objects["Bank"].minigame;
            for (const g in market.goods) {
                market.sellGood(market.goods[g].id, 10000);
            }
        }
        // Buy chocolate egg if available
        if (Game.Upgrades["Chocolate egg"].unlocked &&
            !Game.Upgrades["Chocolate egg"].bought) {
            // Set first aura to earth shatterer
            if (Game.dragonLevel >= 9) {
                Game.specialTab = "dragon";
                Game.SetDragonAura(5, 0);
                Game.ConfirmPrompt();
                Game.ToggleSpecialMenu(0);
            }
            Game.ObjectsById.forEach((e) => { e.sell(e.amount); });
            Game.Upgrades["Chocolate egg"].buy();
            this.context.delay = 10;
        }
        else {
            this.context.info(reason);
            // Log prestige gain
            const prestigeGain = Game.ascendMeterLevel;
            const newPrestige = Game.prestige + prestigeGain;
            if (typeof Beautify !== 'undefined' && prestigeGain > 0) {
                this.context.logAction('Ascending', reason + ' | Prestige: ' + Beautify(Game.prestige) + ' → ' +
                    Beautify(newPrestige) + ' (+' + Beautify(prestigeGain) + ')');
            }
            else {
                this.context.logAction('Ascending', reason);
            }
            this.context.delay = 15;
            // Call logging before ascension if available
            if (typeof AutoPlay.logging === 'function') {
                AutoPlay.logging();
            }
            Game.Ascend(true);
            this.state.onAscend = true;
        }
    }
    /**
     * Handle reincarnation (after ascending)
     */
    doReincarnate() {
        this.state.onAscend = false;
        this.context.delay = 10;
        this.buyHeavenlyUpgrades();
        // Choose ascension mode
        if (!Game.Achievements["Neverclick"].won || !Game.Achievements["Hardcore"].won) {
            Game.PickAscensionMode();
            Game.nextAscensionMode = 1;
            Game.ConfirmPrompt();
        }
        if (this.context.endPhase() && this.context.mustRebornAscend()) {
            Game.PickAscensionMode();
            Game.nextAscensionMode = 1;
            Game.ConfirmPrompt();
        }
        Game.Reincarnate(true);
        this.state.resetTime = Date.now(); // save the current date for things that need to be delayed after reincarnating
        // Reset savings start time after reincarnation
        if ('savingsStart' in this.state) {
            this.state.savingsStart = this.context.now;
        }
        this.state.neverclickWarn = true;
        this.state.ascendLimit = 0.9 * Math.floor(2 * (1 - Game.ascendMeterPercent));
    }
    /**
     * Buy all available heavenly upgrades
     */
    buyHeavenlyUpgrades() {
        const upgradesPurchased = [];
        // Buy priority upgrades first
        PRIO_UPGRADES.forEach((id) => {
            const upgrade = Game.UpgradesById[id];
            if (upgrade && upgrade.canBePurchased && !upgrade.bought && upgrade.buy(true)) {
                this.context.info("buying " + upgrade.name);
                upgradesPurchased.push(upgrade.name);
            }
        });
        // Buy all other available upgrades
        for (const key in Game.UpgradesById) {
            const upgrade = Game.UpgradesById[key];
            if (upgrade && upgrade.canBePurchased && !upgrade.bought && upgrade.buy(true)) {
                this.context.info("buying " + upgrade.name);
                upgradesPurchased.push(upgrade.name);
            }
        }
        // Log all purchased heavenly upgrades
        if (upgradesPurchased.length > 0) {
            this.context.logAction('Purchased heavenly upgrades', upgradesPurchased.join(', '));
        }
        // Assign permanent slots
        this.assignPermanentSlot(1, this.context.kittens);
        this.assignPermanentSlot(2, this.context.maxBuildings);
        if (!Game.Achievements["Reincarnation"].won) { // for many ascends
            this.assignPermanentSlot(0, this.context.cursors);
            this.assignPermanentSlot(3, [52]); // lucky day
            this.assignPermanentSlot(4, [53]); // serendipity
        }
        else { // collect rare things
            this.assignPermanentSlot(0, this.context.butterBiscuits);
            this.assignPermanentSlot(3, [226]); // omelette
            this.assignPermanentSlot(4, this.context.expensive);
        }
    }
    /**
     * Assign a permanent upgrade slot
     */
    assignPermanentSlot(slot, options) {
        // Check if slot is unlocked (base ID is 264)
        if (!Game.UpgradesById[264 + slot].bought)
            return;
        Game.AssignPermanentSlot(slot);
        // Try to assign the best available upgrade from options (highest priority last)
        for (let i = options.length - 1; i >= 0; i--) {
            if (Game.UpgradesById[options[i]].bought) {
                Game.PutUpgradeInPermanentSlot(options[i], slot);
                break;
            }
        }
        Game.ConfirmPrompt();
    }
    /**
     * Get current ascension state (for external access)
     */
    getState() {
        return { ...this.state };
    }
    /**
     * Get current ascension manager status
     */
    getStatus() {
        // Check if on ascension screen
        if (Game.OnAscend) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Buying heavenly upgrades',
                reason: 'On ascension screen',
                nextAction: 'Will reincarnate',
                icon: '🌟',
                details: {
                    'Heavenly Chips': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.heavenlyChips)) : Math.floor(Game.heavenlyChips),
                    'Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige)) : Math.floor(Game.prestige),
                    'On Ascend Screen': true
                }
            };
        }
        // Check if ascending
        if (this.state.onAscend) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Ascending',
                reason: 'Ascension in progress',
                nextAction: 'Wait for ascension screen',
                icon: '🌟',
                details: {
                    'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.ascendMeterLevel)) : Math.floor(Game.ascendMeterLevel),
                    'New Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige + Game.ascendMeterLevel)) : Math.floor(Game.prestige + Game.ascendMeterLevel)
                }
            };
        }
        const currentPrestige = Game.prestige;
        const prestigeGain = Game.ascendMeterLevel;
        const targetAchievement = Game.AchievementsById[this.context.nextAchievement];
        const daysInRun = (this.context.now - Game.startDate) / 1000 / 60 / 60 / 24;
        // Check for special achievement attempts
        if (this.context.workingOnSpecialAchievement) {
            let achievementName = '';
            if (Game.cookieClicks === 0 && !Game.Achievements["True Neverclick"].won) {
                achievementName = 'True Neverclick (0 clicks)';
            }
            else if (Game.cookieClicks <= 15 && !Game.Achievements["Neverclick"].won) {
                achievementName = 'Neverclick (≤15 clicks)';
            }
            else if (Game.UpgradesOwned === 0 && !Game.Achievements["Hardcore"].won) {
                achievementName = 'Hardcore (0 upgrades)';
            }
            else {
                achievementName = 'Speed baking';
            }
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: `Working on ${achievementName}`,
                reason: 'Special achievement run',
                nextAction: 'Will ascend when complete',
                icon: '🌟',
                details: {
                    'Achievement': achievementName,
                    'Cookie Clicks': Game.cookieClicks,
                    'Upgrades Owned': Game.UpgradesOwned,
                    'Days in Run': daysInRun.toFixed(1)
                }
            };
        }
        // Check for endless cycle (1000 ascends)
        if (this.context.endPhase() && !Game.Achievements["Endless cycle"].won &&
            !Game.ascensionMode && Game.Upgrades["Sucralosia Inutilis"].bought) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for 1000 ascends',
                reason: 'Endless cycle achievement',
                nextAction: 'Rapid ascension mode',
                icon: '🌟',
                details: {
                    'Resets': Game.resets,
                    'Target': 1000,
                    'Remaining': 1000 - Game.resets
                }
            };
        }
        // Check for reincarnation (100 ascends)
        if (Game.Upgrades["Permanent upgrade slot V"].bought &&
            !Game.Achievements["Reincarnation"].won && !Game.ascensionMode) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for 100 ascends',
                reason: 'Reincarnation achievement',
                nextAction: 'Rapid ascension mode',
                icon: '🌟',
                details: {
                    'Resets': Game.resets,
                    'Target': 100,
                    'Remaining': 100 - Game.resets
                }
            };
        }
        // Check for lucky upgrades
        if (!Game.Upgrades["Lucky payout"].bought && Game.heavenlyChips > 77777777) {
            const sevenCount = ((Game.prestige + prestigeGain) + '').split('7').length - 1;
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for Lucky payout',
                reason: `Need six 7s in prestige (currently ${sevenCount})`,
                nextAction: sevenCount >= 4 ? 'Close! Will ascend soon' : 'Grinding prestige',
                icon: '🌟',
                details: {
                    'Sevens': sevenCount,
                    'Target': 6,
                    'Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige + prestigeGain)) : Math.floor(Game.prestige + prestigeGain)
                }
            };
        }
        // Normal mode - waiting for target achievement
        if (targetAchievement && !targetAchievement.won) {
            return {
                module: 'Ascension',
                status: 'waiting',
                currentAction: `Working on ${targetAchievement.name}`,
                reason: targetAchievement.ddesc.replace(/<q>.*?<\/q>/ig, ''),
                nextAction: `Will ascend when achieved`,
                icon: '🌟',
                details: {
                    'Current Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(currentPrestige)) : Math.floor(currentPrestige),
                    'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(prestigeGain)) : Math.floor(prestigeGain),
                    'Days in Run': daysInRun.toFixed(1),
                    'Target Achievement': targetAchievement.name
                }
            };
        }
        // Idle - no specific ascension plan
        return {
            module: 'Ascension',
            status: 'idle',
            currentAction: 'Playing normally',
            reason: 'No immediate ascension planned',
            nextAction: 'Will ascend when beneficial',
            icon: '🌟',
            details: {
                'Current Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(currentPrestige)) : Math.floor(currentPrestige),
                'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(prestigeGain)) : Math.floor(prestigeGain),
                'Days in Run': daysInRun.toFixed(1),
                'Resets': Game.resets
            }
        };
    }
}

;// ./src/modules/DragonManager.ts
/**
 * Manages dragon training and aura selection
 *
 * The Dragon (Krumblor) is unlocked after purchasing "A crumbly egg" upgrade.
 * Dragon levels unlock through various sacrifices and achievements.
 * Dragons provide powerful auras that boost game performance.
 */

/**
 * Dragon aura indices
 */
var DragonAura;
(function (DragonAura) {
    DragonAura[DragonAura["None"] = 0] = "None";
    DragonAura[DragonAura["BreathOfMilk"] = 1] = "BreathOfMilk";
    DragonAura[DragonAura["DragonCursor"] = 2] = "DragonCursor";
    DragonAura[DragonAura["ElderBattalion"] = 3] = "ElderBattalion";
    DragonAura[DragonAura["ReaperOfFields"] = 4] = "ReaperOfFields";
    DragonAura[DragonAura["Dragonflight"] = 5] = "Dragonflight";
    DragonAura[DragonAura["AncestralMetamorphosis"] = 6] = "AncestralMetamorphosis";
    DragonAura[DragonAura["UnholyDominion"] = 7] = "UnholyDominion";
    DragonAura[DragonAura["FierceHoarder"] = 8] = "FierceHoarder";
    DragonAura[DragonAura["DragonGod"] = 9] = "DragonGod";
    DragonAura[DragonAura["ArcaneAura"] = 10] = "ArcaneAura";
    DragonAura[DragonAura["FierceHoarder2"] = 11] = "FierceHoarder2";
    DragonAura[DragonAura["DragonOrb"] = 12] = "DragonOrb";
    DragonAura[DragonAura["ReaperOfFields2"] = 13] = "ReaperOfFields2";
    DragonAura[DragonAura["RadiantAppetite"] = 15] = "RadiantAppetite";
    DragonAura[DragonAura["DragonsCurve"] = 17] = "DragonsCurve"; // Sugar lumps ripen 5% faster
})(DragonAura || (DragonAura = {}));
/**
 * Lump harvest achievement IDs (266-272 and 396)
 * These achievements require specific lump types or harvesting conditions
 */
const LUMP_HARVEST_ACHIEVEMENTS = [266, 267, 268, 269, 270, 271, 272, 396];
/**
 * Dragon drop items from petting
 */
const DRAGON_DROPS = [
    'Dragon scale',
    'Dragon claw',
    'Dragon fang',
    'Dragon teddy bear'
];
/**
 * Aura names for logging
 */
const AURA_NAMES = {
    0: 'None',
    1: 'Breath of Milk',
    2: 'Dragon Cursor',
    3: 'Elder Battalion',
    4: 'Reaper of Fields',
    5: 'Dragonflight',
    6: 'Ancestral Metamorphosis',
    7: 'Unholy Dominion',
    8: 'Fierce Hoarder',
    9: 'Dragon God',
    10: 'Arcane Aura',
    15: 'Radiant Appetite',
    17: "Dragon's Curve"
};
class DragonManager {
    /**
     * Main handler for all dragon-related activities
     * Should be called periodically from the main AutoPlay loop
     */
    handleDragon() {
        // Only proceed if dragon egg is unlocked
        if (!Game.Upgrades['A crumbly egg'].unlocked) {
            return;
        }
        // Train dragon to next level if possible
        this.trainDragon();
        // Pet dragon for drops
        this.petDragon();
        // Select optimal auras based on current dragon level
        this.selectBestAuras();
    }
    /**
     * Train dragon to the next level
     * Handles building sacrifices required for leveling
     */
    trainDragon() {
        const maxLevel = Game.dragonLevels.length - 1;
        // Check if dragon can be leveled up
        if (Game.dragonLevel >= maxLevel) {
            return;
        }
        const currentLevelData = Game.dragonLevels[Game.dragonLevel];
        if (!currentLevelData.cost()) {
            return; // Don't have resources to level up
        }
        // Determine what needs to be done after upgrading
        let buildingToRestock = null;
        let shouldBuy150 = false;
        // Levels 5-20: Sacrifice 100 of a specific building (one per level)
        if (Game.dragonLevel >= 5 && Game.dragonLevel < maxLevel - 3) {
            const buildingIndex = Game.dragonLevel - 5;
            buildingToRestock = Game.ObjectsById[buildingIndex];
        }
        // Last 3 levels before max: Sacrifice 50/200/200 of all buildings
        else if (Game.dragonLevel >= maxLevel - 3) {
            shouldBuy150 = true;
        }
        // Upgrade the dragon
        Game.specialTab = 'dragon';
        Game.UpgradeDragon();
        Game.ToggleSpecialMenu(0);
        // Handle post-upgrade restocking
        if (shouldBuy150) {
            // After sacrificing 50 or 200 of all buildings, buy back to 150
            // Ensure Farm exists for garden minigame
            if (Game.Objects['Farm'].amount === 0) {
                Game.Objects['Farm'].buy(1);
            }
            // Note: handleMinigames would need to be called here
            // For now, just buy buildings
            for (const building of Game.ObjectsById) {
                const needed = 150 - building.amount;
                if (needed > 0) {
                    building.buy(needed);
                }
            }
        }
        else if (buildingToRestock) {
            // After sacrificing 100 of a specific building, buy 50 back immediately
            const needed = 50 - buildingToRestock.amount;
            if (needed > 0) {
                buildingToRestock.buy(needed);
            }
        }
    }
    /**
     * Select the best auras based on current game state and dragon level
     */
    selectBestAuras() {
        // Set primary aura
        if (Game.dragonLevel >= 5) {
            this.setPrimaryAura();
        }
        // Set secondary aura (only available at max level)
        if (Game.dragonLevel >= Game.dragonLevels.length - 1) {
            this.setSecondaryAura();
        }
    }
    /**
     * Set the primary dragon aura (slot 0)
     * Strategy:
     * - Level 5+: Breath of Milk (kitten boost)
     * - Level 19+: Radiant Appetite (golden cookie boost)
     * - Level 21+: Dragon's Curve (lump ripening) OR Radiant Appetite
     */
    setPrimaryAura() {
        let desiredAura = DragonAura.None;
        if (Game.dragonLevel >= 5) {
            desiredAura = DragonAura.BreathOfMilk;
        }
        if (Game.dragonLevel >= 19) {
            desiredAura = DragonAura.RadiantAppetite;
        }
        if (Game.dragonLevel >= 21) {
            desiredAura = DragonAura.DragonsCurve;
            // Switch to Radiant Appetite if we have plenty of lumps
            // and not actively hunting lump harvest achievements
            const hasPlentLumps = Game.lumps > 99;
            const needsLumpAchievement = this.isHuntingLumpAchievement();
            if (hasPlentLumps && !needsLumpAchievement) {
                desiredAura = DragonAura.RadiantAppetite;
            }
        }
        // Only change if different from current
        if (Game.dragonAura !== desiredAura) {
            Game.specialTab = 'dragon';
            Game.SetDragonAura(desiredAura, 0);
            Game.ConfirmPrompt();
            Game.ToggleSpecialMenu(0);
            const auraName = AURA_NAMES[desiredAura] || 'Unknown';
            Logger.logStatus('dragon', `Dragon aura 1: ${auraName}`);
        }
    }
    /**
     * Set the secondary dragon aura (slot 1)
     * Always set to Breath of Milk for the kitten boost
     */
    setSecondaryAura() {
        const desiredAura = DragonAura.BreathOfMilk;
        // Only change if different from current
        if (Game.dragonAura2 !== desiredAura) {
            Game.specialTab = 'dragon';
            Game.SetDragonAura(desiredAura, 1);
            Game.ConfirmPrompt();
            Game.ToggleSpecialMenu(0);
            Logger.logStatus('dragon', 'Dragon aura 2: Breath of Milk');
        }
    }
    /**
     * Pet the dragon to get special drops
     * Available at dragon level 8+
     * Drops: Dragon scale, Dragon claw, Dragon fang, Dragon teddy bear
     */
    petDragon() {
        if (Game.dragonLevel < 8) {
            return; // Can't pet dragon yet
        }
        // Check if there are any drops we haven't obtained yet
        for (const drop of DRAGON_DROPS) {
            if (!Game.Has(drop) && !Game.HasUnlocked(drop)) {
                // Still have drops to collect
                Logger.addActivity('Petting the dragon.');
                Game.specialTab = 'dragon';
                Game.ToggleSpecialMenu(1);
                Game.ClickSpecialPic();
                Game.ToggleSpecialMenu(0);
                return; // Only pet once per cycle
            }
        }
    }
    /**
     * Check if buying a specific building is efficient based on dragon sacrifices
     * Used by BuildingManager to avoid buying too many buildings during sacrifice phases
     *
     * @param buildingName - Name of the building to check
     * @returns true if safe to buy, false if would interfere with dragon training
     */
    checkDragonLimits(buildingName) {
        // Don't limit purchases until "Here be dragon" achievement is won
        if (!Game.Achievements['Here be dragon'].won) {
            return true;
        }
        const building = Game.Objects[buildingName];
        if (!building) {
            return true;
        }
        // Haven't sacrificed the first 100 of this building yet
        // Limit to 100 so we have exactly 100 to sacrifice
        if (Game.dragonLevel - 5 <= building.id) {
            return building.amount < 100;
        }
        // Waiting to sacrifice 50 of all buildings
        // Limit to 50 so we have exactly 50 to sacrifice
        if (Game.dragonLevel < Game.dragonLevels.length - 2) {
            return building.amount < 50;
        }
        // Waiting to sacrifice 200 of all buildings
        // Limit to 200 so we have exactly 200 to sacrifice
        if (Game.dragonLevel < Game.dragonLevels.length - 1) {
            return building.amount < 200;
        }
        // Fully trained or no restrictions
        return true;
    }
    /**
     * Check if we're currently hunting lump harvest achievements
     * This affects aura selection - we want Dragon's Curve for faster ripening
     *
     * @returns true if hunting lump-related achievements
     */
    isHuntingLumpAchievement() {
        // Lump harvest achievements: IDs 266-272 and 396
        // These require harvesting lumps at specific maturity levels
        if (typeof AutoPlay !== 'undefined' && 'nextAchievement' in AutoPlay) {
            return LUMP_HARVEST_ACHIEVEMENTS.includes(AutoPlay.nextAchievement);
        }
        return false;
    }
    /**
     * Get current dragon manager status
     */
    getStatus() {
        // Check if dragon egg is unlocked
        if (!Game.Upgrades['A crumbly egg'].unlocked) {
            return {
                module: 'Dragon',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to purchase "A crumbly egg" upgrade',
                icon: '🐉',
                details: {
                    'Dragon': 'Not unlocked'
                }
            };
        }
        const maxLevel = Game.dragonLevels.length - 1;
        const currentLevel = Game.dragonLevel;
        const aura1 = AURA_NAMES[Game.dragonAura] || 'None';
        const aura2 = AURA_NAMES[Game.dragonAura2] || 'None';
        // Check if dragon can level up
        if (currentLevel < maxLevel) {
            const currentLevelData = Game.dragonLevels[currentLevel];
            const canLevel = currentLevelData.cost();
            if (canLevel) {
                // Determine what will be sacrificed
                let sacrificeDesc = '';
                if (currentLevel >= 5 && currentLevel < maxLevel - 3) {
                    const buildingIndex = currentLevel - 5;
                    const building = Game.ObjectsById[buildingIndex];
                    sacrificeDesc = `100 ${building.name}`;
                }
                else if (currentLevel >= maxLevel - 3) {
                    const amount = currentLevel === maxLevel - 3 ? 50 : 200;
                    sacrificeDesc = `${amount} of all buildings`;
                }
                return {
                    module: 'Dragon',
                    status: 'active',
                    currentAction: 'Leveling up dragon',
                    reason: `Level ${currentLevel} → ${currentLevel + 1}`,
                    nextAction: sacrificeDesc ? `Sacrifice: ${sacrificeDesc}` : 'Training dragon',
                    icon: '🐉',
                    details: {
                        'Level': currentLevel,
                        'Max Level': maxLevel,
                        'Aura 1': aura1,
                        'Aura 2': currentLevel >= maxLevel ? aura2 : 'Not unlocked'
                    }
                };
            }
            return {
                module: 'Dragon',
                status: 'waiting',
                currentAction: 'Waiting to level',
                reason: `Level ${currentLevel}/${maxLevel}`,
                nextAction: 'Need resources to level up',
                icon: '🐉',
                details: {
                    'Level': currentLevel,
                    'Aura 1': aura1,
                    'Aura 2': currentLevel >= maxLevel ? aura2 : 'Not unlocked'
                }
            };
        }
        // Dragon is max level - check for drops
        const missingDrops = DRAGON_DROPS.filter(drop => !Game.Has(drop) && !Game.HasUnlocked(drop));
        if (missingDrops.length > 0) {
            return {
                module: 'Dragon',
                status: 'active',
                currentAction: 'Petting for drops',
                reason: `${missingDrops.length} drops remaining`,
                nextAction: `Next: ${missingDrops[0]}`,
                icon: '🐉',
                details: {
                    'Level': 'Max',
                    'Aura 1': aura1,
                    'Aura 2': aura2,
                    'Drops Remaining': missingDrops.length
                }
            };
        }
        // Dragon is max level and has all drops - just managing auras
        const hasPlentLumps = Game.lumps > 99;
        const needsLumpAchievement = this.isHuntingLumpAchievement();
        const usingLumpAura = Game.dragonAura === DragonAura.DragonsCurve;
        return {
            module: 'Dragon',
            status: 'idle',
            currentAction: 'Managing auras',
            reason: usingLumpAura
                ? (needsLumpAchievement ? 'Optimizing for lump achievements' : hasPlentLumps ? 'Using lump aura despite having 99+ lumps' : 'Fast lump ripening')
                : (hasPlentLumps && !needsLumpAchievement ? 'Plenty lumps - using golden cookie aura' : 'Optimizing for golden cookies'),
            icon: '🐉',
            details: {
                'Level': 'Max',
                'Aura 1': aura1,
                'Aura 2': aura2,
                'Sugar Lumps': Game.lumps,
                'All Drops': 'Collected'
            }
        };
    }
}

;// ./src/modules/Dashboard.ts
/**
 * Manages UI dashboard and menu
 * Migrated from cookieAutoPlayBeta.js lines 2271-3068
 */
class Dashboard {
    constructor() {
        // Configuration system
        this.config = {};
        this.configData = {};
        this.configDefault = {};
        this.configPrefix = 'autoplayConfig';
        // Dashboard state
        this.dashboardCollapsed = false;
        this.dashboardObserver = null;
        this.resizeObserver = null;
        this.positionTimeout = null;
        // Activity tracking
        this.actionHistory = [];
        this.statusHistory = [];
        this.lastStatus = {};
        this.maxHistorySize = 20;
        // Display utilities
        this.colorTextPre = 'color: ';
        this.colorBlue = '#4169E1';
        this.initializeConfigData();
        this.setConfigDefaults();
        this.loadConfig();
    }
    /**
     * Initialize configuration options
     */
    initializeConfigData() {
        this.configData.BotMode = {
            label: ['IDLE', 'AUTO', 'MANUAL'],
            desc: 'Cookiebot global mode (work in progress)'
        };
        this.configData.NightMode = {
            label: ['OFF', 'AUTO', 'ON'],
            desc: 'Handling of night mode'
        };
        this.configData.ClickMode = {
            label: ['OFF', 'AUTO', 'LIGHT SPEED', 'RIDICULOUS SPEED', 'LUDICROUS SPEED'],
            desc: 'Clicking speed'
        };
        this.configData.GoldenClickMode = {
            label: ['OFF', 'AUTO', 'ALL'],
            desc: 'Golden Cookie clicking mode'
        };
        this.configData.SavingStrategy = {
            label: ['NONE', 'AUTO', 'LUCKY', 'LUCKY FRENZY'],
            desc: 'Saving strategy'
        };
        this.configData.CheatLumps = {
            label: ['OFF', 'AUTO', 'LITTLE', 'MEDIUM', 'MUCH'],
            desc: 'Cheating of sugar lumps'
        };
        this.configData.CheatGolden = {
            label: ['OFF', 'AUTO', 'LITTLE', 'MEDIUM', 'MUCH'],
            desc: 'Cheating of golden cookies'
        };
        this.configData.ShowDashboard = {
            label: ['HIDE', 'SHOW'],
            desc: 'Toggle dashboard visibility'
        };
        this.configData.HardcoreMode = {
            label: ['SKIP', 'AUTO'],
            desc: 'Hardcore/Neverclick achievements: SKIP (ignore them) or AUTO (attempt on first run)'
        };
        this.configData.CleanLog = {
            label: ['Clean Log'],
            desc: 'Cleaning the log'
        };
        this.configData.ShowLog = {
            label: ['Show Log'],
            desc: 'Showing the log'
        };
    }
    /**
     * Set default configuration values
     */
    setConfigDefaults() {
        this.configDefault = {
            BotMode: 1,
            NightMode: 1,
            ClickMode: 1,
            GoldenClickMode: 1,
            SavingStrategy: 1,
            CheatLumps: 1,
            CheatGolden: 1,
            ShowDashboard: 1,
            HardcoreMode: 1,
            CleanLog: 0,
            ShowLog: 0
        };
    }
    /**
     * Save configuration to localStorage
     */
    saveConfig(config) {
        try {
            window.localStorage.setItem(this.configPrefix, JSON.stringify(config));
        }
        catch (e) {
            console.error('Failed to save config:', e);
        }
    }
    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        try {
            const stored = window.localStorage.getItem(this.configPrefix);
            if (stored != null) {
                this.config = JSON.parse(stored);
                // Check values
                let modified = false;
                for (const key in this.configDefault) {
                    if (typeof this.config[key] === 'undefined' ||
                        this.config[key] < 0 ||
                        this.config[key] >= this.configData[key].label.length) {
                        modified = true;
                        this.config[key] = this.configDefault[key];
                    }
                }
                if (modified) {
                    this.saveConfig(this.config);
                }
            }
            else {
                // Default values
                this.restoreDefault();
            }
        }
        catch (e) {
            console.error('Failed to load config:', e);
        }
    }
    /**
     * Restore default configuration
     */
    restoreDefault() {
        this.config = {};
        this.saveConfig(this.configDefault);
        this.loadConfig();
        if (typeof Game !== 'undefined' && Game.UpdateMenu) {
            Game.UpdateMenu();
        }
    }
    /**
     * Toggle a configuration option
     */
    toggleConfig(configKey) {
        this.toggleConfigUp(configKey);
        const element = document.getElementById(this.configPrefix + configKey);
        if (element) {
            element.className = this.config[configKey] ? 'option' : 'option off';
        }
    }
    /**
     * Increment a configuration option
     */
    toggleConfigUp(configKey) {
        this.config[configKey]++;
        if (this.config[configKey] === this.configData[configKey].label.length) {
            this.config[configKey] = 0;
        }
        const element = document.getElementById(this.configPrefix + configKey);
        if (element) {
            element.innerHTML = this.getConfigDisplay(configKey);
        }
        this.saveConfig(this.config);
    }
    /**
     * Get display text for a configuration option
     */
    getConfigDisplay(configKey) {
        return this.configData[configKey].label[this.config[configKey]];
    }
    /**
     * Add menu preferences to the game menu
     */
    addMenuPref() {
        const header = (text) => {
            const div = document.createElement('div');
            div.className = 'listing';
            div.style.padding = '5px 16px';
            div.style.opacity = '0.7';
            div.style.fontSize = '17px';
            div.style.fontFamily = '"Kavoon", Georgia, serif';
            div.textContent = text;
            return div;
        };
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.className = `title ${this.colorTextPre}${this.colorBlue}`;
        div.textContent = 'Cookiebot Options';
        frag.appendChild(div);
        const listing = (configKey, clickFunc) => {
            const div = document.createElement('div');
            div.className = 'listing';
            const a = document.createElement('a');
            a.className = 'option';
            if (this.config[configKey] === 0) {
                a.className = 'option off';
            }
            a.id = this.configPrefix + configKey;
            a.onclick = clickFunc || (() => this.toggleConfig(configKey));
            a.textContent = this.getConfigDisplay(configKey);
            div.appendChild(a);
            const label = document.createElement('label');
            label.textContent = this.configData[configKey].desc;
            div.appendChild(label);
            return div;
        };
        frag.appendChild(listing('BotMode', () => this.setBotMode()));
        frag.appendChild(listing('NightMode'));
        frag.appendChild(listing('ClickMode'));
        frag.appendChild(listing('GoldenClickMode'));
        frag.appendChild(listing('SavingStrategy'));
        frag.appendChild(listing('HardcoreMode'));
        frag.appendChild(header('Cheating'));
        frag.appendChild(listing('CheatLumps'));
        frag.appendChild(listing('CheatGolden'));
        frag.appendChild(header('Display'));
        frag.appendChild(listing('ShowDashboard', () => this.toggleDashboardConfig()));
        frag.appendChild(header('Logging'));
        frag.appendChild(listing('CleanLog', () => this.cleanLog()));
        frag.appendChild(listing('ShowLog', () => this.showLog()));
        const menu = document.getElementById('menu');
        if (menu && menu.childNodes[2]) {
            const menuSection = menu.childNodes[2];
            const lastChild = menuSection.childNodes[menuSection.childNodes.length - 1];
            menuSection.insertBefore(frag, lastChild);
        }
    }
    /**
     * Set bot mode handler
     */
    setBotMode() {
        this.toggleConfig('BotMode');
        const modeName = this.configData.BotMode.label[this.config.BotMode];
        if (typeof AutoPlay !== 'undefined') {
            AutoPlay.info?.(`The bot has changed mode to ${modeName}`);
            this.logStatus('mode', `Mode: ${modeName}`);
        }
    }
    /**
     * Create the dashboard UI
     */
    createDashboard() {
        // Create container
        const dashboard = document.createElement('div');
        dashboard.id = 'cookieBotDashboard';
        // Create header with toggle button
        const header = document.createElement('div');
        header.style.cssText = 'padding: 8px 16px; background: rgba(0, 100, 0, 0.3); cursor: pointer; display: flex; justify-content: space-between; align-items: center;';
        header.innerHTML = '<span style="color: #6f6; font-size: 14px; font-weight: bold;">CookieBot Dashboard</span><span id="dashboardToggle" style="color: #6f6; font-size: 12px;">▼ Collapse</span>';
        // Create content area
        const content = document.createElement('div');
        content.id = 'dashboardContent';
        content.style.cssText = 'display: flex; padding: 12px; gap: 16px; max-height: 350px; overflow-y: auto;';
        // Three columns: Active Modules | Waiting/Idle Modules | Recent Activity
        content.innerHTML = `
      <div id="dashActiveModules" style="flex: 1; min-width: 280px;">
        <div style="color: #6f6; font-size: 13px; margin-bottom: 8px; font-weight: bold;">⚡ Active Modules</div>
        <div id="dashActiveContent" style="color: #fff; font-size: 11px; line-height: 1.5; max-height: 300px; overflow-y: auto;">Loading...</div>
      </div>
      <div id="dashWaitingModules" style="flex: 1; min-width: 280px;">
        <div style="color: #fc6; font-size: 13px; margin-bottom: 8px; font-weight: bold;">⏳ Waiting / Idle Modules</div>
        <div id="dashWaitingContent" style="color: #fff; font-size: 11px; line-height: 1.5; max-height: 300px; overflow-y: auto;">Loading...</div>
      </div>
      <div id="dashActivity" style="flex: 1; min-width: 240px;">
        <div style="color: #6f6; font-size: 13px; margin-bottom: 8px; font-weight: bold;">📋 Recent Activity</div>
        <div id="dashActivityContent" style="color: #fff; font-size: 11px; line-height: 1.4; max-height: 300px; overflow-y: auto;">No activity yet...</div>
      </div>
    `;
        // Add toggle functionality
        header.onclick = () => this.toggleDashboard();
        dashboard.appendChild(header);
        dashboard.appendChild(content);
        // Append to wrapper element
        const wrapper = document.getElementById('wrapper');
        if (wrapper) {
            wrapper.appendChild(dashboard);
        }
        else {
            document.body.appendChild(dashboard);
        }
        // Calculate bottom offset based on other bottom bars
        // Defer initial positioning to ensure DOM is fully settled
        setTimeout(() => {
            this.positionDashboard();
        }, 100);
        // Watch for new elements being added to wrapper (like Cookie Monster loading later)
        if (wrapper && typeof MutationObserver !== 'undefined') {
            this.dashboardObserver = new MutationObserver(() => {
                // Debounce to avoid multiple rapid calls
                if (this.positionTimeout) {
                    clearTimeout(this.positionTimeout);
                }
                this.positionTimeout = window.setTimeout(() => {
                    this.positionDashboard();
                }, 50);
            });
            this.dashboardObserver.observe(wrapper, { childList: true });
        }
        // Apply config setting for visibility
        if (this.config.ShowDashboard === 0) {
            dashboard.style.display = 'none';
        }
    }
    /**
     * Position dashboard at the bottom of the screen
     */
    positionDashboard() {
        const dashboard = document.getElementById('cookieBotDashboard');
        if (!dashboard)
            return;
        const wrapper = document.getElementById('wrapper');
        if (!wrapper)
            return;
        // Find all other bottom-positioned elements in the wrapper
        let bottomOffset = 0;
        const children = wrapper.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.id !== 'cookieBotDashboard') {
                const style = window.getComputedStyle(child);
                // Check if element is absolutely positioned at the bottom
                if (style.position === 'absolute' && style.bottom === '0px') {
                    const height = child.offsetHeight;
                    if (height > 0) {
                        bottomOffset += height;
                        // Watch this element for size changes
                        if (typeof ResizeObserver !== 'undefined' && !child.hasAttribute('data-cookiebot-watched')) {
                            child.setAttribute('data-cookiebot-watched', 'true');
                            if (!this.resizeObserver) {
                                this.resizeObserver = new ResizeObserver(() => {
                                    this.positionDashboard();
                                });
                            }
                            this.resizeObserver.observe(child);
                        }
                    }
                }
            }
        }
        // Apply positioning without wiping other styles
        dashboard.style.position = 'absolute';
        dashboard.style.bottom = `${bottomOffset}px`;
        dashboard.style.left = '0';
        dashboard.style.right = '0';
        dashboard.style.background = 'rgba(0, 0, 0, 0.9)';
        dashboard.style.borderTop = '2px solid #6f6';
        dashboard.style.zIndex = '10000';
        // Temporarily ensure dashboard is visible to measure height accurately
        const wasHidden = dashboard.style.display === 'none';
        if (wasHidden) {
            dashboard.style.display = 'block';
        }
        // Force reflow to ensure accurate measurement
        void dashboard.offsetHeight;
        // Get dashboard height (includes header + content if expanded, or just header if collapsed)
        const dashboardHeight = dashboard.offsetHeight;
        // Update #game div's bottom to account for all bottom bars including ours
        const game = document.getElementById('game');
        if (game) {
            const totalBottomHeight = bottomOffset + dashboardHeight;
            game.style.bottom = `${totalBottomHeight}px`;
        }
        // Hide dashboard if config says to
        if (this.config.ShowDashboard === 0) {
            dashboard.style.display = 'none';
        }
    }
    /**
     * Toggle dashboard collapse/expand
     */
    toggleDashboard() {
        const content = document.getElementById('dashboardContent');
        const toggle = document.getElementById('dashboardToggle');
        this.dashboardCollapsed = !this.dashboardCollapsed;
        if (this.dashboardCollapsed) {
            if (content)
                content.style.display = 'none';
            if (toggle)
                toggle.textContent = '▲ Expand';
        }
        else {
            if (content)
                content.style.display = 'flex';
            if (toggle)
                toggle.textContent = '▼ Collapse';
        }
        // Reposition to account for height change
        setTimeout(() => {
            this.positionDashboard();
        }, 0);
    }
    /**
     * Toggle dashboard visibility via config
     */
    toggleDashboardConfig() {
        this.toggleConfig('ShowDashboard');
        const dashboard = document.getElementById('cookieBotDashboard');
        if (dashboard) {
            dashboard.style.display = this.config.ShowDashboard ? 'block' : 'none';
            // Reposition to update game div's bottom
            setTimeout(() => {
                this.positionDashboard();
            }, 0);
        }
    }
    /**
     * Update dashboard content
     */
    updateDashboard() {
        if (!document.getElementById('cookieBotDashboard')) {
            return;
        }
        try {
            // Check if AutoPlay is available
            if (typeof AutoPlay === 'undefined') {
                return;
            }
            this.updateModuleColumns();
            this.updateActivity();
        }
        catch (e) {
            console.error('Dashboard update error:', e);
        }
    }
    /**
     * Helper to create a progress bar HTML
     */
    createProgressBar(percent, color = '#6f6') {
        const clampedPercent = Math.min(100, Math.max(0, percent));
        return `<div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-top: 4px;">
      <div style="width: ${clampedPercent}%; height: 100%; background: ${color}; transition: width 0.3s;"></div>
    </div>`;
    }
    /**
     * Helper to format time remaining
     */
    formatTimeRemaining(ms) {
        if (ms < 0)
            return 'Ready';
        const seconds = Math.floor(ms / 1000);
        if (seconds < 60)
            return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60)
            return `${minutes}m ${seconds % 60}s`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h ${minutes % 60}m`;
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }
    /**
     * Update both module columns (active and waiting/idle)
     */
    updateModuleColumns() {
        // Safety check for AutoPlay global
        if (typeof AutoPlay === 'undefined') {
            const activeContent = document.getElementById('dashActiveContent');
            const waitingContent = document.getElementById('dashWaitingContent');
            if (activeContent)
                activeContent.innerHTML = '<div style="color: #f66;">AutoPlay not initialized...</div>';
            if (waitingContent)
                waitingContent.innerHTML = '<div style="color: #f66;">AutoPlay not initialized...</div>';
            return;
        }
        try {
            // Collect statuses from all managers
            const statuses = {};
            // Get statuses from purchase manager (buildings and upgrades separately)
            if (AutoPlay.purchaseManager) {
                if (typeof AutoPlay.purchaseManager.getBuildingStatus === 'function') {
                    statuses.buildings = AutoPlay.purchaseManager.getBuildingStatus();
                }
                if (typeof AutoPlay.purchaseManager.getUpgradeStatus === 'function') {
                    statuses.upgrades = AutoPlay.purchaseManager.getUpgradeStatus();
                }
            }
            if (AutoPlay.gardenManager && typeof AutoPlay.gardenManager.getStatus === 'function') {
                statuses.garden = AutoPlay.gardenManager.getStatus();
            }
            if (AutoPlay.wrinklerManager && typeof AutoPlay.wrinklerManager.getStatus === 'function') {
                statuses.wrinklers = AutoPlay.wrinklerManager.getStatus();
            }
            if (AutoPlay.goldenCookieHandler && typeof AutoPlay.goldenCookieHandler.getStatus === 'function') {
                statuses.goldenCookies = AutoPlay.goldenCookieHandler.getStatus();
            }
            if (AutoPlay.dragonManager && typeof AutoPlay.dragonManager.getStatus === 'function') {
                statuses.dragon = AutoPlay.dragonManager.getStatus();
            }
            if (AutoPlay.pantheonManager && typeof AutoPlay.pantheonManager.getStatus === 'function') {
                statuses.pantheon = AutoPlay.pantheonManager.getStatus();
            }
            if (AutoPlay.grimoireManager && typeof AutoPlay.grimoireManager.getStatus === 'function') {
                statuses.grimoire = AutoPlay.grimoireManager.getStatus();
            }
            if (AutoPlay.stockMarketManager && typeof AutoPlay.stockMarketManager.getStatus === 'function') {
                statuses.stockMarket = AutoPlay.stockMarketManager.getStatus();
            }
            if (AutoPlay.sugarLumpManager && typeof AutoPlay.sugarLumpManager.getStatus === 'function') {
                statuses.sugarLumps = AutoPlay.sugarLumpManager.getStatus();
            }
            if (AutoPlay.ascensionManager && typeof AutoPlay.ascensionManager.getStatus === 'function') {
                statuses.ascension = AutoPlay.ascensionManager.getStatus();
            }
            if (AutoPlay.seasonHandler && typeof AutoPlay.seasonHandler.getStatus === 'function') {
                statuses.season = AutoPlay.seasonHandler.getStatus();
            }
            if (AutoPlay.achievementHandler && typeof AutoPlay.achievementHandler.getStatus === 'function') {
                statuses.achievements = AutoPlay.achievementHandler.getStatus();
            }
            // Render module statuses
            const moduleOrder = [
                'buildings',
                'upgrades',
                'garden',
                'wrinklers',
                'goldenCookies',
                'dragon',
                'pantheon',
                'grimoire',
                'stockMarket',
                'sugarLumps',
                'ascension',
                'season',
                'achievements'
            ];
            // Map status to colors
            const statusColors = {
                'idle': '#888',
                'active': '#6f6',
                'waiting': '#fc6',
                'blocked': '#f66',
                'disabled': '#666',
                'error': '#f00'
            };
            // Group modules by activity level
            const activeModules = [];
            const waitingModules = [];
            for (const key of moduleOrder) {
                const status = statuses[key];
                if (!status)
                    continue;
                if (status.status === 'active' || status.status === 'blocked') {
                    activeModules.push({ key, status });
                }
                else {
                    waitingModules.push({ key, status });
                }
            }
            // Render active modules
            let activeHtml = '';
            for (const { status } of activeModules) {
                const color = statusColors[status.status] || '#ccc';
                const icon = status.icon || '📦';
                activeHtml += '<div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.03); border-left: 3px solid ' + color + ';">';
                activeHtml += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">';
                activeHtml += '<span style="color: ' + color + '; font-weight: bold; font-size: 11px;">' + icon + ' ' + status.module + '</span>';
                activeHtml += '<span style="color: ' + color + '; font-size: 9px; text-transform: uppercase; opacity: 0.8;">' + status.status + '</span>';
                activeHtml += '</div>';
                activeHtml += '<div style="color: #ccc; font-size: 10px; margin-bottom: 2px;">' + status.currentAction + '</div>';
                activeHtml += '<div style="color: #888; font-size: 9px; margin-bottom: 4px;">' + status.reason + '</div>';
                if (status.nextAction) {
                    activeHtml += '<div style="color: #9cf; font-size: 9px; margin-top: 4px;">→ ' + status.nextAction + '</div>';
                }
                // Add progress bars and time calculations where applicable
                if (status.details && Object.keys(status.details).length > 0) {
                    activeHtml += '<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 9px;">';
                    // Special handling for buildings/upgrades with price and affordability
                    if ((status.module === 'Buildings' || status.module === 'Upgrades') && status.details['Price'] && status.details['Available']) {
                        const priceStr = String(status.details['Price']);
                        const availableStr = String(status.details['Available']);
                        // Try to parse numbers (strip commas/formatting)
                        const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
                        const available = parseFloat(availableStr.replace(/[^0-9.]/g, '')) || 0;
                        if (price > 0) {
                            const percent = Math.min(100, (available / price) * 100);
                            const color = percent >= 100 ? '#6f6' : '#fc6';
                            activeHtml += '<div style="color: #aaa; margin-top: 2px;">Affordability: ' + percent.toFixed(1) + '%</div>';
                            activeHtml += this.createProgressBar(percent, color);
                            // Show time remaining if not affordable
                            if (percent < 100 && Game.cookiesPs > 0) {
                                const needed = price - available;
                                const timeMs = (needed / Game.cookiesPs) * 1000;
                                activeHtml += '<div style="color: #fc6; font-size: 9px; margin-top: 2px;">⏱ ' + this.formatTimeRemaining(timeMs) + '</div>';
                            }
                        }
                    }
                    // Show other details
                    for (const [key, value] of Object.entries(status.details)) {
                        if (key !== 'Price' && key !== 'Available') {
                            activeHtml += '<div style="color: #888; margin-top: 1px;"><span style="color: #aaa;">' + key + ':</span> <span style="color: #ccc;">' + value + '</span></div>';
                        }
                    }
                    activeHtml += '</div>';
                }
                activeHtml += '</div>';
            }
            if (activeHtml === '') {
                activeHtml = '<div style="color: #888;">No active modules</div>';
            }
            // Render waiting/idle modules
            let waitingHtml = '';
            for (const { status } of waitingModules) {
                const color = statusColors[status.status] || '#ccc';
                const icon = status.icon || '📦';
                waitingHtml += '<div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.03); border-left: 3px solid ' + color + ';">';
                waitingHtml += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">';
                waitingHtml += '<span style="color: ' + color + '; font-weight: bold; font-size: 11px;">' + icon + ' ' + status.module + '</span>';
                waitingHtml += '<span style="color: ' + color + '; font-size: 9px; text-transform: uppercase; opacity: 0.8;">' + status.status + '</span>';
                waitingHtml += '</div>';
                waitingHtml += '<div style="color: #ccc; font-size: 10px; margin-bottom: 2px;">' + status.currentAction + '</div>';
                waitingHtml += '<div style="color: #888; font-size: 9px; margin-bottom: 4px;">' + status.reason + '</div>';
                if (status.nextAction) {
                    waitingHtml += '<div style="color: #9cf; font-size: 9px; margin-top: 4px;">→ ' + status.nextAction + '</div>';
                }
                // Add time calculations where applicable
                if (status.details && Object.keys(status.details).length > 0) {
                    waitingHtml += '<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 9px;">';
                    // Special handling for wrinklers with time until pop
                    if (status.module === 'Wrinklers' && typeof Game !== 'undefined' && Game.wrinklers) {
                        const maxWrinklers = 12;
                        const currentCount = Game.wrinklers.filter((w) => w.phase > 0).length;
                        if (currentCount < maxWrinklers) {
                            // Show progress for wrinkler spawning (they take time to spawn)
                            const percent = (currentCount / maxWrinklers) * 100;
                            waitingHtml += '<div style="color: #aaa; margin-top: 2px;">Wrinklers: ' + currentCount + '/' + maxWrinklers + '</div>';
                            waitingHtml += this.createProgressBar(percent, '#a8a');
                        }
                    }
                    // Special handling for sugar lumps with time until harvest
                    if (status.module === 'Sugar Lumps' && typeof Game !== 'undefined' && Game.lumpT) {
                        const timeUntilRipe = Game.lumpT - Date.now();
                        if (timeUntilRipe > 0) {
                            const totalTime = 20 * 60 * 60 * 1000; // 20 hours
                            const elapsed = totalTime - timeUntilRipe;
                            const percent = (elapsed / totalTime) * 100;
                            waitingHtml += '<div style="color: #aaa; margin-top: 2px;">Time until ripe:</div>';
                            waitingHtml += this.createProgressBar(percent, '#fc6');
                            waitingHtml += '<div style="color: #fc6; font-size: 9px; margin-top: 2px;">⏱ ' + this.formatTimeRemaining(timeUntilRipe) + '</div>';
                        }
                    }
                    // Show other details
                    for (const [key, value] of Object.entries(status.details)) {
                        waitingHtml += '<div style="color: #888; margin-top: 1px;"><span style="color: #aaa;">' + key + ':</span> <span style="color: #ccc;">' + value + '</span></div>';
                    }
                    waitingHtml += '</div>';
                }
                waitingHtml += '</div>';
            }
            if (waitingHtml === '') {
                waitingHtml = '<div style="color: #888;">No waiting/idle modules</div>';
            }
            // Update both columns
            const activeContent = document.getElementById('dashActiveContent');
            const waitingContent = document.getElementById('dashWaitingContent');
            if (activeContent) {
                activeContent.innerHTML = activeHtml;
            }
            if (waitingContent) {
                waitingContent.innerHTML = waitingHtml;
            }
        }
        catch (e) {
            console.error('Module status error:', e);
            const activeContent = document.getElementById('dashActiveContent');
            const waitingContent = document.getElementById('dashWaitingContent');
            if (activeContent)
                activeContent.innerHTML = '<div style="color: #f66;">Error loading module statuses</div>';
            if (waitingContent)
                waitingContent.innerHTML = '<div style="color: #f66;">Error loading module statuses</div>';
        }
    }
    /**
     * Update activity section
     */
    updateActivity() {
        let activityHtml = '';
        const combinedActivity = [];
        // Add status entries
        if (this.statusHistory && this.statusHistory.length > 0) {
            this.statusHistory.forEach((entry) => {
                const baseType = entry.type.split(':')[0];
                let color = '#ccc';
                let icon = '📊';
                let tooltip = '';
                if (baseType === 'goal') {
                    color = '#fc6';
                    icon = '🎯';
                    tooltip = "Bot's current goal or target (e.g., achievement, ascension, or upgrade milestone)";
                }
                else if (baseType === 'reserve') {
                    color = '#f96';
                    icon = '🍪';
                    tooltip = 'Golden cookie reserve status - the bot keeps cookies saved for Lucky/Lucky Frenzy bonuses';
                }
                else if (baseType === 'achievement') {
                    color = '#f66';
                    icon = '🏆';
                    tooltip = 'Achievement-related status update';
                }
                else if (baseType === 'mode') {
                    color = '#6f6';
                    icon = '⚙️';
                    tooltip = 'Bot mode or behavior change';
                }
                else if (baseType === 'ascend') {
                    color = '#f6f';
                    icon = '⬆️';
                    tooltip = 'Ascension-related status update';
                }
                else if (baseType === 'dragon') {
                    color = '#c9f';
                    icon = '🐉';
                    tooltip = 'Dragon aura change or update';
                }
                else if (baseType === 'wrinkler') {
                    color = '#a8a';
                    icon = '🪱';
                    tooltip = 'Wrinkler management status';
                }
                combinedActivity.push({
                    time: entry.time,
                    type: 'status',
                    color,
                    icon,
                    tooltip,
                    message: entry.message,
                    details: entry.details
                });
            });
        }
        // Add action entries
        if (this.actionHistory && this.actionHistory.length > 0) {
            this.actionHistory.forEach((entry) => {
                let color = '#ccc';
                let icon = '⚡';
                if (entry.action.includes('Bought') || entry.action.includes('Upgraded')) {
                    color = '#6f6';
                    icon = '🛒';
                }
                if (entry.action.includes('Clicked')) {
                    color = '#fc6';
                    icon = '👆';
                }
                if (entry.action.includes('Ascend') || entry.action.includes('Achievement')) {
                    color = '#f66';
                    icon = '🏆';
                }
                combinedActivity.push({
                    time: entry.time,
                    type: 'action',
                    color,
                    icon,
                    tooltip: 'Action performed by the bot',
                    message: entry.action,
                    details: entry.details
                });
            });
        }
        // Sort by time (newest first)
        combinedActivity.sort((a, b) => b.time.getTime() - a.time.getTime());
        // Generate HTML
        if (combinedActivity.length > 0) {
            combinedActivity.forEach((entry) => {
                const timeStr = entry.time.toLocaleTimeString();
                activityHtml += `<div style="margin-bottom: 4px; padding: 4px; background: rgba(255,255,255,0.05); border-left: 2px solid ${entry.color};" title="${entry.tooltip}"><span style="color: #888; font-size: 9px;">${timeStr}</span> <span style="color: ${entry.color};">${entry.icon} ${entry.message}</span>${entry.details ? ` <span style="color: #aaa; font-size: 10px;"> - ${entry.details}</span>` : ''}</div>`;
            });
        }
        else {
            activityHtml = '<div style="color: #888;">No activity yet...</div>';
        }
        const activityContent = document.getElementById('dashActivityContent');
        if (activityContent) {
            activityContent.innerHTML = activityHtml;
        }
    }
    /**
     * Log an action to the activity history
     */
    logAction(action, details) {
        try {
            const timestamp = new Date();
            const entry = {
                time: timestamp,
                action,
                details: details || ''
            };
            this.actionHistory.unshift(entry); // Add to beginning
            if (this.actionHistory.length > this.maxHistorySize) {
                this.actionHistory.pop(); // Remove oldest
            }
            this.updateDashboard(); // Refresh display
        }
        catch (e) {
            console.log('Log action error:', e);
        }
    }
    /**
     * Log a status update to the status history
     */
    logStatus(statusType, message, details) {
        try {
            // Only log if status changed
            const statusKey = `${statusType}:${message}`;
            if (this.lastStatus[statusType] === statusKey)
                return;
            this.lastStatus[statusType] = statusKey;
            const timestamp = new Date();
            const entry = {
                time: timestamp,
                type: statusType,
                message,
                details: details || ''
            };
            this.statusHistory.unshift(entry); // Add to beginning
            if (this.statusHistory.length > this.maxHistorySize) {
                this.statusHistory.pop(); // Remove oldest
            }
            this.updateDashboard(); // Refresh display
        }
        catch (e) {
            console.log('Log status error:', e);
        }
    }
    /**
     * Clean the log
     */
    cleanLog() {
        try {
            window.localStorage.setItem('autoplayLog', '');
        }
        catch (e) {
            console.error('Failed to clean log:', e);
        }
    }
    /**
     * Show the log
     */
    showLog() {
        let theLog = '';
        try {
            theLog = window.localStorage.getItem('autoplayLog') || '';
        }
        catch (e) {
            theLog = '';
        }
        if (typeof Game !== 'undefined' && Game.Prompt) {
            Game.Prompt('<h3>Cookie Bot Log</h3><div class="block">' +
                'This is the log of the bot with saves at important stages.<br>' +
                'Copy it and use it as you like.</div>' +
                '<div class="block"><textarea id="textareaPrompt" ' +
                'style="width:100%;height:128px;" readonly>' +
                theLog + '</textarea></div>', ['All done!']);
        }
    }
    /**
     * Render/update the dashboard
     */
    render() {
        // Check if dashboard exists, create if not
        if (!document.getElementById('cookieBotDashboard')) {
            this.createDashboard();
        }
        this.updateDashboard();
    }
    /**
     * Toggle dashboard visibility
     */
    toggle() {
        this.toggleDashboard();
    }
}

;// ./src/modules/NightMode.ts
/**
 * Handles night mode behavior - reduces bot activity during nighttime hours
 * Night mode makes the bot "sleep" between 11pm-7am to simulate human-like behavior
 *
 * Original logic from cookieAutoPlayBeta.js:
 * - Mode 0: OFF (never sleep)
 * - Mode 1: AUTO (sleep unless grinding)
 * - Mode 2: ON (always sleep during night)
 *
 * Night hours: 11pm (23:00) to 7am (07:00)
 * Active hours: 7am to 11pm
 */
class NightMode {
    /**
     * Constructor - expects config object
     * @param config AutoPlayConfig for accessing night mode settings
     */
    constructor(config) {
        this.isNight = false;
        this.config = config;
    }
    /**
     * Set callback for activity logging
     */
    setAddActivityCallback(callback) {
        this.addActivity = callback;
    }
    /**
     * Set callback for using sugar lumps
     */
    setUseLumpCallback(callback) {
        this.useLumpCallback = callback;
    }
    /**
     * Set callback for checking if grinding
     */
    setGrindingCheckCallback(callback) {
        this.grindinCheckCallback = callback;
    }
    /**
     * Set callback for handling golden cookies
     */
    setHandleGoldenCookiesCallback(callback) {
        this.handleGoldenCookiesCallback = callback;
    }
    /**
     * Set pantheon manager reference
     */
    setPantheonManager(pantheonManager) {
        this.pantheonManager = pantheonManager;
    }
    /**
     * Set stock market manager reference
     */
    setStockMarketManager(stockMarketManager) {
        this.stockMarketManager = stockMarketManager;
    }
    /**
     * Log activity message
     */
    logActivity(msg) {
        if (this.addActivity) {
            this.addActivity(msg);
        }
    }
    /**
     * Check if it's currently nighttime (after 10pm)
     * Used for pre-night preparation activities
     */
    isPreNightMode() {
        // Convert config value to numeric mode
        const mode = typeof this.config.nightMode === 'number'
            ? this.config.nightMode
            : (this.config.nightMode ? 1 : 0);
        // Only prepare for night if mode is not OFF
        if (mode === 0)
            return false;
        const hour = new Date().getHours();
        return hour >= 22;
    }
    /**
     * Main night mode logic - determines if bot should be active or sleeping
     * Mirrors original AutoPlay.nightMode() function
     * @returns true if bot should sleep, false if bot should be active
     */
    checkNightMode() {
        // Don't sleep if on ascension screen
        if (Game.OnAscend)
            return false;
        // Convert config value to numeric mode: 0=OFF, 1=AUTO, 2=ON
        const mode = typeof this.config.nightMode === 'number'
            ? this.config.nightMode
            : (this.config.nightMode ? 1 : 0);
        // Mode 0: OFF - never sleep
        if (mode === 0)
            return false;
        // Mode 1: AUTO - don't sleep while grinding for final achievements
        if (mode === 1 && this.grindinCheckCallback && this.grindinCheckCallback()) {
            return false;
        }
        // Mode 2: ON - always sleep during night hours (no grinding check)
        const hour = new Date().getHours();
        // Active hours: 7am to 11pm
        if (hour >= 7 && hour < 23) {
            if (this.isNight) {
                // Waking up - use any accumulated sugar lumps
                this.onWakeUp();
            }
            this.isNight = false;
            this.deactivateNightFeatures();
            return false;
        }
        // Night hours: 11pm to 7am
        if (this.isNight) {
            // Already sleeping
            this.logActivity('The bot is sleeping.');
            return true;
        }
        // Prepare for night
        this.prepareForNight(hour);
        this.isNight = true;
        return true;
    }
    /**
     * Prepare bot for nighttime - activate night features
     */
    prepareForNight(hour) {
        this.logActivity('Preparing for the night.');
        this.activateNightAtGarden(true);
        // Handle stock market night trading
        if (this.stockMarketManager) {
            this.stockMarketManager.handleNightTrading();
        }
        // Handle Golden Switch
        const goldenSwitchOff = Game.Upgrades["Golden switch [off]"];
        if (goldenSwitchOff && goldenSwitchOff.unlocked) {
            // Click any golden cookies before buying Golden Switch
            if (this.handleGoldenCookiesCallback) {
                this.handleGoldenCookiesCallback();
            }
            this.logActivity('Waiting for good time to buy Golden switch.');
            // Check for good time to buy golden switch
            // Wait if CPS multiplier is high or it's still early
            const cpsMult = this.getCurrentCpsMultiplier();
            if (cpsMult < 0.8 || hour < 7) {
                // Buy Shimmering veil if available
                const shimmeringVeilOff = Game.Upgrades["Shimmering veil [off]"];
                if (shimmeringVeilOff &&
                    shimmeringVeilOff.unlocked &&
                    shimmeringVeilOff.canBuy() &&
                    Game.Upgrades["Reinforced membrane"].bought) {
                    shimmeringVeilOff.buy();
                }
                goldenSwitchOff.buy();
            }
            // Don't activate spirits before golden switch is bought
            if (!goldenSwitchOff.bought)
                return;
        }
        // Activate night spirits via PantheonManager
        if (this.pantheonManager) {
            this.pantheonManager.activateNightSpirits();
        }
    }
    /**
     * Wake up from night mode
     */
    onWakeUp() {
        // Use any accumulated sugar lumps
        if (this.useLumpCallback) {
            this.useLumpCallback();
        }
    }
    /**
     * Deactivate night features when day starts
     */
    deactivateNightFeatures() {
        // Deactivate night spirits via PantheonManager
        if (this.pantheonManager) {
            this.pantheonManager.deactivateNightSpirits();
        }
        // Turn Golden Switch back on
        const goldenSwitchOn = Game.Upgrades["Golden switch [on]"];
        if (goldenSwitchOn && goldenSwitchOn.unlocked) {
            goldenSwitchOn.buy();
        }
        this.activateNightAtGarden(false);
    }
    /**
     * Freeze/unfreeze garden during night
     */
    activateNightAtGarden(activate) {
        if (!Game.isMinigameReady(Game.Objects["Farm"]))
            return;
        const garden = Game.Objects["Farm"].minigame;
        // Toggle freeze if needed
        if (activate !== garden.freeze) {
            const freezeButton = document.getElementById('gardenTool-2');
            if (freezeButton) {
                freezeButton.click();
            }
        }
    }
    /**
     * Get current CPS multiplier from active buffs
     * Simplified version - would need full buff calculation from Game.buffs
     */
    getCurrentCpsMultiplier() {
        // Check active buffs for CPS modifiers
        const gameBuffs = Game.buffs;
        if (gameBuffs && typeof gameBuffs === 'object') {
            // This is simplified - real implementation would sum all CPS modifiers
            // For now, return a reasonable default
            let mult = 1.0;
            for (const buffName in gameBuffs) {
                const buff = gameBuffs[buffName];
                if (buff && buff.multCpS) {
                    mult *= buff.multCpS;
                }
            }
            return mult;
        }
        return 1.0;
    }
    /**
     * Check if currently sleeping
     */
    isCurrentlySleeping() {
        return this.isNight;
    }
    /**
     * Toggle night mode
     */
    toggle() {
        this.config.nightMode = !this.config.nightMode;
    }
}

;// ./src/modules/PantheonManager.ts
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
class PantheonManager {
    constructor() {
        // Injected dependencies
        this.now = Date.now();
        this.poppingWrinklers = false;
        this.cheatLumps = false;
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     * Assigns optimal spirits based on current game state
     */
    handlePantheon() {
        if (!Game.isMinigameReady(Game.Objects['Temple']))
            return;
        const age = this.now - Game.lumpT;
        // Slot 0 (Diamond) - Most important slot
        if (this.poppingWrinklers) {
            // Scorn: Wrinklers give +15% more cookies
            this.assignSpirit(0, 'scorn', 0);
        }
        else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !this.cheatLumps) {
            // Order: Sugar lumps ripen 1 hour sooner (use when < 61 min from harvest)
            this.assignSpirit(0, 'order', 0);
        }
        else if (this.preNightMode() &&
            Game.lumpOverripeAge - age < 9 * 60 * 60000 &&
            (new Date()).getMinutes() === 59 &&
            !this.cheatLumps) {
            // Order: Also use at 59 minutes before midnight if lump about to over-ripen
            this.assignSpirit(0, 'order', 0);
        }
        else {
            // Mother: +5% CpS (default - best general purpose)
            this.assignSpirit(0, 'mother', 0);
        }
        // Slot 1 (Ruby) - Decadence makes buildings cheaper
        this.assignSpirit(1, 'decadence', 0);
        // Slot 2 (Jade) - Labor makes buildings produce more
        this.assignSpirit(2, 'labor', 0);
    }
    /**
     * Activate night mode spirits
     * Called from NightMode.prepareForNight()
     */
    activateNightSpirits() {
        if (!Game.isMinigameReady(Game.Objects['Temple']))
            return;
        // Remove day spirits
        this.removeSpirit(1, 'decadence');
        this.removeSpirit(2, 'labor');
        // Add night spirits (force=1 means use 1 swap if needed)
        this.assignSpirit(1, 'asceticism', 1); // Buildings/CpS -5% (saves money at night)
        this.assignSpirit(2, 'industry', 1); // Buildings +10% (better than Labor's +5%)
    }
    /**
     * Deactivate night mode spirits
     * Called from NightMode.deactivateNightFeatures()
     */
    deactivateNightSpirits() {
        if (!Game.isMinigameReady(Game.Objects['Temple']))
            return;
        // Just remove asceticism, let main logic handle others
        this.removeSpirit(1, 'asceticism');
    }
    /**
     * Assign a spirit to a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit (e.g., 'mother', 'decadence')
     * @param force If 1, forces use of 1 swap. If 0, requires 3 swaps available.
     */
    assignSpirit(slot, godName, force) {
        const pantheon = Game.Objects['Temple'].minigame;
        // Check if we have enough swaps (worship swaps recharge over time)
        if (pantheon.swaps + force < 3)
            return;
        // Check if spirit already in this slot
        if (pantheon.slot[slot] === pantheon.gods[godName].id)
            return;
        // Assign the spirit
        pantheon.slotHovered = slot;
        pantheon.dragging = pantheon.gods[godName];
        pantheon.dropGod();
    }
    /**
     * Remove a spirit from a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit to remove
     */
    removeSpirit(slot, godName) {
        const pantheon = Game.Objects['Temple'].minigame;
        // Check if this spirit is in the slot
        if (pantheon.slot[slot] !== pantheon.gods[godName].id)
            return;
        // Remove the spirit
        pantheon.slotHovered = -1;
        pantheon.dragging = pantheon.gods[godName];
        pantheon.dropGod();
    }
    /**
     * Check if it's pre-night mode (after 10pm)
     */
    preNightMode() {
        const hour = new Date().getHours();
        return hour >= 22;
    }
    /**
     * Update state from AutoPlay
     */
    updateState(now, poppingWrinklers, cheatLumps) {
        this.now = now;
        this.poppingWrinklers = poppingWrinklers;
        this.cheatLumps = cheatLumps;
    }
    /**
     * Get current pantheon manager status
     */
    getStatus() {
        // Check if pantheon is unlocked
        if (!Game.isMinigameReady(Game.Objects['Temple'])) {
            return {
                module: 'Pantheon',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Temple minigame unlocked (Temple level 1)',
                icon: '⛪',
                details: {
                    'Temple Level': Game.Objects['Temple']?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        const pantheon = Game.Objects['Temple'].minigame;
        const slot0 = pantheon.slot[0];
        const slot1 = pantheon.slot[1];
        const slot2 = pantheon.slot[2];
        // Get spirit names
        const getGodName = (id) => {
            if (id === -1)
                return 'Empty';
            for (const godName in pantheon.gods) {
                if (pantheon.gods[godName].id === id) {
                    return godName.charAt(0).toUpperCase() + godName.slice(1);
                }
            }
            return 'Unknown';
        };
        const spirit0 = getGodName(slot0);
        const spirit1 = getGodName(slot1);
        const spirit2 = getGodName(slot2);
        // Determine reason based on current setup
        const age = this.now - Game.lumpT;
        let reason = '';
        if (this.poppingWrinklers) {
            reason = 'Scorn for wrinkler bonus';
        }
        else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !this.cheatLumps) {
            reason = 'Order for faster lump ripening';
        }
        else {
            reason = 'Mother for CpS boost (default)';
        }
        // Check swap availability
        const swapsAvailable = pantheon.swaps;
        const needsSwaps = swapsAvailable < 3;
        return {
            module: 'Pantheon',
            status: needsSwaps ? 'waiting' : 'active',
            currentAction: needsSwaps ? 'Waiting for swaps' : 'Managing spirits',
            reason: reason,
            nextAction: needsSwaps ? `${swapsAvailable}/3 swaps available` : undefined,
            icon: '⛪',
            details: {
                'Diamond': spirit0,
                'Ruby': spirit1,
                'Jade': spirit2,
                'Swaps': swapsAvailable,
                'Strategy': this.poppingWrinklers ? 'Wrinkler boost' : 'Default'
            }
        };
    }
}

;// ./src/modules/GrimoireManager.ts
/**
 * Manages Grimoire (Wizard Tower minigame) spell casting
 *
 * The Grimoire allows casting spells that cost magic (mana) and recharge over time.
 * Key spells:
 * - Hand of Fate: Summons a golden cookie (can backfire into sugar lump)
 * - Conjure Baked Goods: Instant cookies (normally not worth it)
 *
 * Strategy:
 * - Cast Hand of Fate when we have 2+ golden cookies to get Four-leaf cookie achievement
 * - Cast Hand of Fate when at 95%+ magic to get backfire sugar lumps
 * - Cast spells during high CpS multiplier (>100x) to maximize value
 * - Use lump refill when we have 100+ lumps and canUseLumps
 */
class GrimoireManager {
    constructor() {
        // State tracking
        this.canUseLumps = false;
        this.cpsMult = 1.0;
    }
    /**
     * Main handler - called in high-activity phase (when hyperActive or deadline reached)
     * Casts grimoire spells when beneficial
     */
    handleGrimoires() {
        if (!Game.isMinigameReady(Game.Objects['Wizard tower']))
            return;
        const grimoire = Game.Objects['Wizard tower'].minigame;
        const wizardTower = Game.Objects['Wizard tower'];
        // Special case: Four-leaf cookie achievement
        // Try to get 4 golden cookies on screen at once
        if (!Game.Achievements['Four-leaf cookie'].won &&
            wizardTower.amount > 500 &&
            Game.Upgrades['Distilled essence of redoubled luck'].bought) {
            const handOfFate = grimoire.spells['hand of fate'];
            // Wait until we have 2 golden cookies, then cast to get a 3rd
            if (Game.shimmerTypes['golden'].n > 1 &&
                grimoire.magic >= grimoire.getSpellCost(handOfFate)) {
                grimoire.castSpell(handOfFate);
            }
            // If we have 3+ golden cookies and enough magic, sell towers to wait for achievement
            if (Game.shimmerTypes['golden'].n >= 3 &&
                grimoire.magic > 30 &&
                wizardTower.amount > 30) {
                wizardTower.sell(wizardTower.amount - grimoire.magic);
            }
            return; // Save magic for achievement attempt
        }
        // Try to get sugar lump from Hand of Fate backfire
        // Backfires at 95%+ magic have a chance to give a sugar lump
        const handOfFate = grimoire.spells['hand of fate'];
        if (Game.shimmerTypes['golden'].n &&
            grimoire.magic >= grimoire.getSpellCost(handOfFate) &&
            grimoire.magic / grimoire.magicM >= 0.95) {
            grimoire.castSpell(handOfFate);
        }
        // High CpS multiplier (>100x) - cast spells for maximum value
        if (this.cpsMult > 100) {
            // Cast Hand of Fate to get more golden cookies
            if (grimoire.magic >= grimoire.getSpellCost(handOfFate)) {
                grimoire.castSpell(handOfFate);
                return;
            }
            // Cast Conjure Baked Goods (normally not worth it, but ok during high multiplier)
            const conjureBakedGoods = grimoire.spells['conjure baked goods'];
            if (grimoire.magic >= grimoire.getSpellCost(conjureBakedGoods)) {
                grimoire.castSpell(conjureBakedGoods);
                return;
            }
            // Refill magic with sugar lump if we have plenty
            if (this.canUseLumps && Game.lumps > 100) {
                grimoire.lumpRefill.click();
            }
        }
    }
    /**
     * Update state from AutoPlay
     */
    updateState(canUseLumps, cpsMult) {
        this.canUseLumps = canUseLumps;
        this.cpsMult = cpsMult;
    }
    /**
     * Get current grimoire manager status
     */
    getStatus() {
        // Check if grimoire is unlocked
        if (!Game.isMinigameReady(Game.Objects['Wizard tower'])) {
            return {
                module: 'Grimoire',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Wizard tower minigame unlocked (Wizard tower level 1)',
                icon: '🔮',
                details: {
                    'Wizard Tower Level': Game.Objects['Wizard tower']?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        const grimoire = Game.Objects['Wizard tower'].minigame;
        const wizardTower = Game.Objects['Wizard tower'];
        const magicPercent = Math.floor((grimoire.magic / grimoire.magicM) * 100);
        // Check for Four-leaf cookie achievement attempt
        if (!Game.Achievements['Four-leaf cookie'].won &&
            wizardTower.amount > 500 &&
            Game.Upgrades['Distilled essence of redoubled luck'].bought) {
            const goldenCount = Game.shimmerTypes['golden']?.n || 0;
            return {
                module: 'Grimoire',
                status: goldenCount >= 2 ? 'active' : 'waiting',
                currentAction: 'Attempting Four-leaf cookie',
                reason: `Need 4 golden cookies (currently ${goldenCount})`,
                nextAction: goldenCount >= 2 ? 'Will cast Hand of Fate' : 'Waiting for more golden cookies',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'Golden Cookies': goldenCount,
                    'Target': 4,
                    'Wizard Towers': wizardTower.amount
                }
            };
        }
        // Check for backfire lump farming
        const handOfFate = grimoire.spells['hand of fate'];
        const hasGoldenCookie = Game.shimmerTypes['golden']?.n > 0;
        const canCastHand = grimoire.magic >= grimoire.getSpellCost(handOfFate);
        const highMagic = magicPercent >= 95;
        if (hasGoldenCookie && canCastHand && highMagic) {
            return {
                module: 'Grimoire',
                status: 'active',
                currentAction: 'Casting Hand of Fate',
                reason: 'Farming backfire sugar lumps (95%+ magic)',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'CpS Multiplier': `${this.cpsMult.toFixed(1)}x`,
                    'Strategy': 'Backfire farming'
                }
            };
        }
        // Check for high CpS multiplier (>100x)
        if (this.cpsMult > 100) {
            return {
                module: 'Grimoire',
                status: canCastHand ? 'active' : 'waiting',
                currentAction: canCastHand ? 'Casting spells' : 'Waiting for magic',
                reason: `High CpS multiplier (${this.cpsMult.toFixed(0)}x)`,
                nextAction: canCastHand ? 'Casting Hand of Fate & Conjure Baked Goods' : 'Recharging magic',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'CpS Multiplier': `${this.cpsMult.toFixed(1)}x`,
                    'Can Use Lumps': this.canUseLumps && Game.lumps > 100,
                    'Sugar Lumps': Game.lumps
                }
            };
        }
        // Idle - waiting for good conditions
        return {
            module: 'Grimoire',
            status: 'idle',
            currentAction: 'Waiting for good conditions',
            reason: 'Need high CpS multiplier (>100x) or backfire opportunity',
            nextAction: highMagic ? 'Ready for backfire attempt' : 'Recharging magic',
            icon: '🔮',
            details: {
                'Magic': `${magicPercent}%`,
                'CpS Multiplier': `${this.cpsMult.toFixed(1)}x`,
                'Threshold': '100x'
            }
        };
    }
}

;// ./src/constants/gameIds.ts
/**
 * Game object IDs for Cookie Clicker
 *
 * These constants provide type-safe access to game objects by ID.
 * Using constants instead of magic numbers improves code readability
 * and prevents typos.
 */
// ==================== Achievements ====================
const ACHIEVEMENT_IDS = {
    // Clicking achievements
    NEVERCLICK: 'Neverclick', // Don't click the big cookie for entire ascension
    TRUE_NEVERCLICK: 'True Neverclick', // Never click the big cookie (permanent)
    UNCANNY_CLICKER: 'Uncanny clicker', // 15 clicks per second for 10 seconds
    // Grandmapocalypse
    ELDER_NAP: 'Elder nap', // Pledge the elders once
    ELDER_SLUMBER: 'Elder slumber', // Pledge the elders 5 times
    ELDER_CALM: 'Elder calm', // Declare a covenant with the elders
    GRANDMAPOCALYPSE: 'Grandmapocalypse', // Awaken the grandmatriarchs
    // Progression
    HARDCORE: 'Hardcore', // Get to 1 billion cookies with no upgrades
    HERE_BE_DRAGON: 'Here be dragon', // Complete your dragon's training
    THICK_SKINNED: 'Thick-skinned', // Keep 10 wrinklers at once
    // Minigame specific
    FOUR_LEAF_COOKIE: 'Four-leaf cookie', // Have 4 golden cookies on screen at once
    SEEDLESS_TO_NAY: 382, // Harvest a garden with all plants unlocked
    DUDE_SWEET: 459, // Own 500 of each stock good
    DEBT_EVASION: 'Debt evasion', // Ascend with a loan
    JUST_RIGHT: 397, // Have exactly specific amounts of each building
    // Cookie Clicker meta
    TABLOID_ADDICTION: 'Tabloid addiction', // Click news ticker 50 times
    HERE_YOU_GO: 'Here you go', // Dismiss 50 notifications
    TINY_COOKIE: 'Tiny cookie', // Click tiny cookie
    GOD_COMPLEX: 'God complex', // Name yourself Orteil
    CHEATED_COOKIES_TASTE_AWFUL: 'Cheated cookies taste awful', // Open dev tools
    THIRD_PARTY: 'Third-party', // Use an add-on
    OLDEN_DAYS: 'Olden days', // Have Grandma use old sprite
    // Milk achievements
    COOKIE_DUNKER: 'Cookie-dunker', // Dunk the cookie in milk
    // News ticker
    STIFLING_THE_PRESS: 'Stifling the press', // Have 0 news ticker updates queued
    // Time-based
    NO_TIME_LIKE_THE_PRESENT: 'No time like the present', // Have all time-based achievements
    EARLY_BIRD: 'Early bird', // Click a golden cookie within 1 second of spawning
    FADING_LUCK: 'Fading luck', // Click a golden cookie within its last second
    // Ascension
    IN_HER_LIKENESS: 'In her likeness', // Have at least 1 of yourself
    // Minigames
    SO_MUCH_TO_DO_SO_MUCH_TO_SEE: 'So much to do so much to see', // Reach level 10 in all minigames
    // Wrinklers
    WRINKLER_POKER: 'Wrinkler poker', // Pop a wrinkler
};
// ==================== Upgrades ====================
const UPGRADE_IDS = {
    // Golden cookie upgrades
    LUCKY_DAY: 52, // Unlocks "Lucky" golden cookie effect
    SERENDIPITY: 53, // Unlocks "Lucky" golden cookie during frenzy
    GET_LUCKY: 86, // Golden cookies appear more often
    // Grandmapocalypse progression
    ONE_MIND: 71, // Research grandmapocalypse stage 1
    COMMUNAL_BRAINSWEEP: 73, // Research grandmapocalypse stage 2
    ELDER_PLEDGE: 74, // Temporarily delay grandmapocalypse
    ELDER_COVENANT: 84, // Permanently stop grandmapocalypse
    // Special upgrades
    CHOCOLATE_EGG: 227, // Easter egg that gives huge bonus when sold
    SHIMMERING_VEIL: 563, // Golden/wrath switch (off state)
    // Garden upgrades (soil types, plants, etc.)
    GARDEN_UPGRADES_START: 470,
    GARDEN_UPGRADES_END: 476,
};
// ==================== Buildings ====================
const BUILDING_IDS = {
    CURSOR: 0,
    GRANDMA: 1,
    FARM: 2,
    MINE: 3,
    FACTORY: 4,
    BANK: 5,
    TEMPLE: 6,
    WIZARD_TOWER: 7,
    SHIPMENT: 8,
    ALCHEMY_LAB: 9,
    PORTAL: 10,
    TIME_MACHINE: 11,
    ANTIMATTER_CONDENSER: 12,
    PRISM: 13,
    CHANCEMAKER: 14,
    FRACTAL_ENGINE: 15,
    JAVASCRIPT_CONSOLE: 16,
    IDLEVERSE: 17,
    CORTEX_BAKER: 18,
    YOU: 19,
};
// ==================== Building Names ====================
const BUILDING_NAMES = {
    CURSOR: 'Cursor',
    GRANDMA: 'Grandma',
    FARM: 'Farm',
    MINE: 'Mine',
    FACTORY: 'Factory',
    BANK: 'Bank',
    TEMPLE: 'Temple',
    WIZARD_TOWER: 'Wizard tower',
    SHIPMENT: 'Shipment',
    ALCHEMY_LAB: 'Alchemy lab',
    PORTAL: 'Portal',
    TIME_MACHINE: 'Time machine',
    ANTIMATTER_CONDENSER: 'Antimatter condenser',
    PRISM: 'Prism',
    CHANCEMAKER: 'Chancemaker',
    FRACTAL_ENGINE: 'Fractal engine',
    JAVASCRIPT_CONSOLE: 'Javascript console',
    IDLEVERSE: 'Idleverse',
    CORTEX_BAKER: 'Cortex baker',
    YOU: 'You',
};
// ==================== Pantheon Spirits ====================
const SPIRIT_IDS = {
    // Diamond slot (most powerful)
    HOLOBORE: 0, // +10% CpS
    MOKALSIUM: 1, // -25% cookie prices
    JEREMY: 2, // +10% building power
    DOTJEIESS: 3, // +5% golden cookie effects
    CYCLIUS: 4, // Cycles between -25% to +25% CpS
    GODZAMOK: 5, // Sell buildings for CpS bonus
    MURIDAL: 6, // +5% wrinkler reward
    SKRUUIA: 7, // +5% wrinkler reward
    VOMITRAX: 8, // Buildings +5%, CpS -5%
    SELEBRAK: 9, // Buildings -5%, CpS +5%
    RIGIDEL: 10, // Buildings cheaper with each 10 built
};
const SPIRIT_NAMES = {
    // Day spirits (normal operation)
    MOTHER: 'mother', // Holobore - +5% CpS
    DECADENCE: 'decadence', // Mokalsium - Buildings -1% price
    LABOR: 'labor', // Jeremy - Buildings +1% production
    // Night spirits (sleep mode)
    SCORN: 'scorn', // Skruuia - Wrinklers +15% cookies
    ORDER: 'order', // Dotjeiess - Sugar lumps ripen 1hr sooner
    ASCETICISM: 'asceticism', // Selebrak - Buildings -5%, CpS +5%
    INDUSTRY: 'industry', // Vomitrax - Buildings +10%, CpS -10%
    // Special spirits
    CYCLIUS: 'cyclius', // Cycles CpS modifier
    GODZAMOK: 'godzamok', // Sell buildings for temp CpS
    RIGIDEL: 'rigidel', // Discount every 10 buildings bought
};
// ==================== Dragon Auras ====================
const DRAGON_AURA_IDS = {
    BREATH_OF_MILK: 0, // Milk is 5% more powerful
    DRAGONS_FORTUNE: 1, // Golden cookies appear 5% more often
    RADIANT_APPETITE: 2, // Buildings produce 2% more
    DRAGONS_CURVE: 3, // Big cookie clicks are worth 5% more
    BREATH_OF_ETERNITY: 4, // Sugar lumps mature 5% sooner
    SUPREME_INTELLECT: 5, // Prisms produce 1% more per achievement
    EARTH_SHATTERER: 6, // Buildings produce 20% more (with Dragon Orbs)
    MIND_OVER_MATTER: 7, // Golden/wrath cookie effects last 5% longer
    FIERCE_HOARDER: 8, // -2% building prices
    REALITY_BENDING: 9, // Golden cookies last 5% longer
};
// ==================== Season Types ====================
const SEASON_NAMES = {
    NONE: '',
    CHRISTMAS: 'christmas',
    EASTER: 'easter',
    HALLOWEEN: 'halloween',
    VALENTINES: 'valentines',
};
// ==================== Garden Plants ====================
const PLANT_KEYS = {
    MEDDLEWEED: 'meddleweed',
    BROWN_MOLD: 'brownMold',
    CRUMBSPORE: 'crumbspore',
    BAKEBERRY: 'bakeberry',
    CHOCOROOT: 'chocoroot',
    WHITE_CHOCOROOT: 'whiteChocoroot',
    QUEENBEET: 'queenbeet',
    QUEENBEET_LUMP: 'queenbeetLump',
    DUKETATER: 'duketater',
    ELDERWORT: 'Elderwort',
    EVERDAISY: 'Everdaisy',
};
// Harvestable plants that drop cookies
const HARVESTABLE_PLANTS = [
    PLANT_KEYS.BAKEBERRY,
    PLANT_KEYS.CHOCOROOT,
    PLANT_KEYS.WHITE_CHOCOROOT,
    PLANT_KEYS.QUEENBEET,
    PLANT_KEYS.QUEENBEET_LUMP,
    PLANT_KEYS.DUKETATER,
];
/**
 * Plant mutation dependencies
 *
 * Each entry is [target, parent1, parent2] - plant parent1 and parent2 adjacent
 * to create the target plant through mutation.
 *
 * Ordered by planting priority:
 * - Index 0: dummy placeholder
 * - Index 1-2: Special expensive plants (queenbeetLump, everdaisy)
 * - Index 3+: Regular plants ordered by dependency level
 */
const PLANT_DEPENDENCIES = [
    ['dummy', 'dummy', 'dummy'], // Index 0: placeholder
    ['queenbeetLump', 'queenbeet', 'queenbeet'], // Index 1: Need queenbeet mature
    ['everdaisy', 'elderwort', 'tidygrass'], // Index 2: Need both unlocked
    // Queenbeet chain (most important)
    ['bakeberry', 'bakerWheat', 'bakerWheat'], // Level 1
    ['chocoroot', 'bakerWheat', 'brownMold'], // Level 1
    ['queenbeet', 'chocoroot', 'bakeberry'], // Level 2
    // Longest dependency chain
    ['thumbcorn', 'bakerWheat', 'bakerWheat'], // Level 1
    ['cronerice', 'bakerWheat', 'thumbcorn'], // Level 2
    ['gildmillet', 'thumbcorn', 'cronerice'], // Level 3
    ['clover', 'bakerWheat', 'gildmillet'], // Level 4
    ['shimmerlily', 'gildmillet', 'clover'], // Level 5
    ['elderwort', 'cronerice', 'shimmerlily'], // Level 6
    // Rest ordered by ripening times
    ['drowsyfern', 'chocoroot', 'keenmoss'], // Level 7
    ['duketater', 'queenbeet', 'queenbeet'], // Level 3
    ['tidygrass', 'bakerWheat', 'whiteChocoroot'], // Level 3
    ['nursetulip', 'whiskerbloom', 'whiskerbloom'], // Level 7
    ['doughshroom', 'crumbspore', 'crumbspore'], // Level 1
    ['wrinklegill', 'crumbspore', 'brownMold'], // Level 1
    ['shriekbulb', 'wrinklegill', 'elderwort'], // Level 7
    ['ichorpuff', 'crumbspore', 'elderwort'], // Level 7
    ['whiskerbloom', 'whiteChocoroot', 'shimmerlily'], // Level 6
    ['chimerose', 'whiskerbloom', 'shimmerlily'], // Level 7
    ['keenmoss', 'brownMold', 'greenRot'], // Level 6
    ['wardlichen', 'cronerice', 'whiteMildew'], // Level 3
    ['glovemorel', 'thumbcorn', 'crumbspore'], // Level 2
    ['whiteChocoroot', 'chocoroot', 'whiteMildew'], // Level 2
    ['whiteMildew', 'brownMold', 'brownMold'], // Level 1
    ['goldenClover', 'bakerWheat', 'gildmillet'], // Level 4
    ['greenRot', 'clover', 'whiteMildew'], // Level 5
    ['cheapcap', 'crumbspore', 'shimmerlily'], // Level 6
    ['foolBolete', 'greenRot', 'doughshroom'], // Level 6
];
// ==================== Stock Market Goods ====================
// Stock market good IDs match their index in market.goods array
const STOCK_GOOD_IDS = {
    CRL: 0, // Cookies (fast)
    CHC: 1, // Chocolate (fast)
    BTR: 2, // Butter (fast)
    SUG: 3, // Sugar (fast)
    NUT: 4, // Nuts (slow)
    SLT: 5, // Salt (slow)
    VNL: 6, // Vanilla (slow)
    EGG: 7, // Eggs (slow)
    CNM: 8, // Cinnamon (slow)
    CRM: 9, // Cream (slow)
    JAM: 10, // Jam (slow)
    WHT: 11, // Wheat (slow)
    HNY: 12, // Honey (slow)
    CKI: 13, // Cookie (slow)
    RCP: 14, // Recipe (slow)
    SBD: 15, // Sugar (slow)
    CRM2: 16, // Cream (slow)
};
// ==================== Grimoire Spells ====================
const SPELL_NAMES = {
    CONJURE_BAKED_GOODS: 'conjure baked goods',
    HAND_OF_FATE: 'hand of fate',
    STRETCH_TIME: 'stretch time',
    SPONTANEOUS_EDIFICE: 'spontaneous edifice',
    HAGGLER_LUCK: 'haggler\'s luck',
    SUMMON_CRAFTY_PIXIES: 'summon crafty pixies',
    GAMBLER_FEVER_DREAM: 'gambler\'s fever dream',
    RESURRECT_ABOMINATION: 'resurrect abomination',
    FORCE_THE_HAND_OF_FATE: 'force the hand of fate',
};
// ==================== Buff Names ====================
const BUFF_NAMES = {
    FRENZY: 'Frenzy',
    LUCKY: 'Lucky',
    CLICK_FRENZY: 'Click frenzy',
    DRAGONFLIGHT: 'Dragonflight',
    ELDER_FRENZY: 'Elder frenzy',
    CLOT: 'Clot',
    CURSED_FINGER: 'Cursed finger',
    BUILDING_SPECIAL: 'Building special',
    EVERYTHING_MUST_GO: 'Everything must go',
};
// ==================== Helper Arrays ====================
// Upgrades to avoid buying (for grandmapocalypse control)
const NON_ASCENSION_UPGRADES = (/* unused pure expression or super */ null && ([71, 72, 73, 87, 227]));
// Garden upgrade IDs
const GARDEN_UPGRADE_IDS = [470, 471, 472, 473, 474, 475, 476];
/**
 * Critical path achievements the bot works toward
 *
 * This is the ordered list of major achievements that define progression.
 * The bot focuses on these achievements in sequence.
 *
 * Last 10 achievements trigger "grinding" mode (no night sleep)
 * Last 8 achievements trigger "cheating" mode (aggressive golden cookie tactics)
 *
 * Final achievement: Just Right (397) - requires exact building counts
 */
const WANTED_ACHIEVEMENTS = [
    82, // Elder calm
    89, // 100 antimatter condensers
    108, // Halloween cookies unlocked
    // Bake X cookies achievements (progression milestones)
    225, 227, 229, 279, 280, 372, 373, 374, 375, 390, 391, 429, 451, 452, 453, 470, 471, 472,
    534, 535, 536, 578, 579, 586, 587, 592, 593,
    // End game achievements
    585, // Endless cycle (max CPS)
    575, // Overdose (max buildings of each type)
    397, // Just Right (exact building counts) - FINAL achievement
];
/**
 * Kitten upgrade IDs (boost CPS by milk percentage)
 */
const KITTEN_UPGRADES = (/* unused pure expression or super */ null && ([
    31, 32, 54, 108, 187, 320, 321, 322, 425, 442, 462, 494, 613, 766, 865,
]));
/**
 * Cursor upgrade IDs (special upgrades for cursor building)
 */
const CURSOR_UPGRADES = (/* unused pure expression or super */ null && ([
    0, 1, 2, 3, 4, 5, 6, 43, 82, 109, 188, 189, 660, 764, 873,
]));
/**
 * Sugar lump related achievements
 * These achievements require sugar lumps to complete
 * When all are achieved, the `finished` flag is set to true
 *
 * Includes:
 * - Building level achievements (307-319: level 10 for each building)
 * - Other lump-requiring achievements (336, 427, 447, 525, 396, 268, 271)
 */
const gameIds_LUMP_RELATED_ACHIEVEMENTS = [
    // Building level 10 achievements (307-319)
    307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
    // Other lump achievements
    336, // All natural sugar lumps - own at least 100 sugar lumps
    427, // Starchild - harvest a bifurcated sugar lump
    447, // Sugar sugar - harvest 100 sugar lumps
    525, // Eldeer - have one of every reindeer upgrade
    396, // Elder - have at least 600 grandmas
    268, // Getting even with your food - harvest 7 elderwort crops in one run
    271, // Bicentennial - reach 200 of everything
];

;// ./src/modules/GardenManager.ts
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

// Convert readonly arrays to regular arrays for runtime use
const HARVESTABLE_PLANTS_ARRAY = [...HARVESTABLE_PLANTS];
const GARDEN_UPGRADES = [...GARDEN_UPGRADE_IDS];
// @ts-ignore - Will be used when full planting logic is implemented
const _PLANT_DEPS = PLANT_DEPENDENCIES.map((dep) => [dep[0], dep[1], dep[2]]);
class GardenManager {
    constructor() {
        // State tracking
        this.plantList = [0, 0, 0, 0]; // Current plant goals for each sector
        this.plantPending = false; // Waiting for plant to mature
        this.harvestPlant = false; // Have harvestable plant waiting
        this.plantsMissing = true; // Still unlocked plants?
        this.plantCookies = false; // Harvest cookie-dropping plants?
        this.wantGardenSacrifice = false; // Want to sacrifice garden?
        // Injected state
        this.now = Date.now();
        this.cpsMult = 1.0;
        this.wantAscend = false;
        this.savingsGoal = 0;
        this.canUseLumps = false;
        this.finished = false;
        this.lumpRelatedAchievements = [];
        this.poppingWrinklers = false;
        // @ts-ignore - Will be used in plantSeed
        this._grindingCheat = false;
        // @ts-ignore - Will be used in plantSeed
        this._cheatGolden = 0;
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleGarden() {
        if (!Game.isMinigameReady(Game.Objects['Farm']))
            return;
        const garden = Game.Objects['Farm'].minigame;
        // Harvest mature plants and clean up
        this.harvesting(garden);
        // Plant seeds for mutations
        this.planting(garden);
        // Check if ready to sacrifice for "Seedless to nay" achievement (382)
        if (this.gardenSacrificeReady(garden)) {
            this.plantCookies = false;
            garden.askConvert();
            Game.ConfirmPrompt();
            this.plantList = [0, 0, 0, 0];
            return;
        }
        // Convert garden for sugar lumps when endgame and all plants unlocked
        if (!this.canUseLumps &&
            this.gardenReady(garden) &&
            !this.finished &&
            !this.harvestPlant &&
            !this.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
            this.plantCookies = false;
            garden.askConvert();
            Game.ConfirmPrompt();
            this.plantList = [0, 0, 0, 0];
        }
    }
    /**
     * Harvest mature and dying plants
     * Original: AutoPlay.harvesting (lines 1452-1484)
     */
    harvesting(garden) {
        this.cleaningGarden(garden);
        this.plantPending = false;
        this.harvestPlant = false;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                if (!garden.isTileUnlocked(x, y))
                    continue;
                const tile = garden.getTile(x, y);
                if (!tile[0])
                    continue; // Empty tile
                const plant = garden.plantsById[tile[0] - 1];
                // Harvest unlocked plants that are mature
                if (!plant.unlocked) {
                    this.plantPending = true;
                    this.logActivity(`${plant.name} is still growing, do not disturb!`);
                    if (tile[1] >= plant.mature) {
                        garden.harvest(x, y);
                    }
                }
                else if (HARVESTABLE_PLANTS_ARRAY.indexOf(plant.key) >= 0) {
                    // Harvestable plants that drop cookies
                    this.harvestPlant = true;
                    this.logActivity(`Waiting to harvest ${plant.name}.`);
                    if (garden.plantsUnlockedN === garden.plantsN && tile[1] >= plant.mature) {
                        // Harvest when CPS multiplier is high enough
                        if (this.cpsMult > 300) {
                            garden.harvest(x, y);
                        }
                    }
                }
                // Harvest cookie-dropping plants when mature
                if (this.plantCookies && tile[1] >= plant.mature) {
                    if (!this.plantsMissing || !garden.isTileUnlocked(x - (x % 3), y - (y % 3))) {
                        garden.harvest(x, y);
                    }
                }
                // Harvest plants that will die next tick (except immortal ones)
                if (plant.ageTick + plant.ageTickR + tile[1] >= 100) {
                    if (plant.name !== 'Elderwort' && plant.name !== 'Everdaisy') {
                        this.harvest(garden, x, y);
                    }
                }
            }
        }
    }
    /**
     * Determine which plant to grow for cookie production (after mutations complete)
     * Original: AutoPlay.seedCalendar (lines 1329-1393)
     */
    seedCalendar(garden, sector) {
        if (this.wantAscend || this.wantGardenSacrifice)
            return 'bakerWheat';
        if (sector === 0)
            this.plantsMissing = false;
        const doPrint = (sector === 0) || (sector !== 3 && Game.Objects['Farm'].level === sector + 6);
        // Priority order: Try to unlock cookie-dropping upgrades
        if (!Game.Upgrades['Ichor syrup'].unlocked && garden.plants['ichorpuff']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Ichor syrup.');
            this.plantCookies = true;
            return 'ichorpuff';
        }
        if (!Game.Upgrades['Green yeast digestives'].unlocked && garden.plants['greenRot']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Green yeast digestives.');
            this.plantCookies = true;
            return 'greenRot';
        }
        if (!Game.Upgrades['Duketater cookies'].unlocked && garden.plants['duketater']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Duketater cookies.');
            this.plantCookies = true;
            return 'duketater';
        }
        if (!Game.Upgrades['Elderwort biscuits'].unlocked && garden.plants['elderwort']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Elderwort cookies.');
            this.plantCookies = true;
            return 'elderwort';
        }
        if (!Game.Upgrades['Bakeberry cookies'].unlocked && garden.plants['bakeberry']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Bakeberry cookies.');
            this.plantCookies = true;
            return 'bakeberry';
        }
        if (!Game.Upgrades['Wheat slims'].unlocked && garden.plants['bakerWheat']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Wheat slims.');
            this.plantCookies = true;
            return 'bakerWheat';
        }
        if (!Game.Upgrades['Fern tea'].unlocked && garden.plants['drowsyfern']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Fern tea.');
            this.plantCookies = true;
            return 'drowsyfern';
        }
        // All cookie upgrades unlocked - use garden for CPS and sugar lumps
        this.plantCookies = false;
        this.switchSoil(garden, sector, this.plantPending ? 'fertilizer' : 'clay');
        if (this.poppingWrinklers && garden.plants['wrinklegill']?.unlocked) {
            return 'wrinklegill'; // faster wrinklers
        }
        // Use bakeberry if all lump achievements are done (1% CPS + harvest 30 mins)
        if (garden.plants['bakeberry']?.unlocked &&
            this.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
            return 'bakeberry';
        }
        // Whiskerbloom gives ~1.5% CPS
        if (garden.plants['whiskerbloom']?.unlocked)
            return 'whiskerbloom';
        return 'bakerWheat'; // fallback
    }
    /**
     * Check if plant is unlocked OR currently growing in garden
     * Original: AutoPlay.havePlant (lines 1110-1117)
     */
    havePlant(garden, plantKey) {
        // Safety check: ensure plantKey is valid and exists
        if (!plantKey || !garden.plants[plantKey])
            return false;
        if (garden.plants[plantKey].unlocked)
            return true;
        const plantID = garden.plants[plantKey].id + 1;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                if (garden.getTile(x, y)[0] === plantID)
                    return true;
            }
        }
        return false;
    }
    /**
     * Batch plant seeds with cost validation
     * Original: AutoPlay.plantSeeds (lines 1274-1327)
     */
    plantSeeds(garden, targets) {
        // Don't plant when CPS multiplier is too high (expensive)
        const grindingCheat = this._grindingCheat ? 1 : 0;
        const cheatGolden = this._cheatGolden > 1 ? 1 : 0;
        if (this.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
            this.logActivity('Do not buy plants now - it is too expensive.');
            return;
        }
        // Calculate costs and determine what to plant
        let cost = 0;
        const toPlant = [];
        let keepSeed = null;
        for (const target of targets) {
            let seed = target[0];
            const whereX = target[1];
            const whereY = target[2];
            // Handle reordering when something is in the way
            if (keepSeed) {
                const swap = seed;
                seed = keepSeed;
                keepSeed = swap;
            }
            // Check if valid position and can plant
            if (!garden.isTileUnlocked(whereX, whereY))
                continue;
            if (!garden.canPlant(garden.plants[seed]))
                continue;
            // Check if position is already occupied
            const oldPlant = garden.getTile(whereX, whereY)[0];
            if (oldPlant !== 0) {
                // Slot is already planted - clear it if different plant
                if (garden.plantsById[oldPlant - 1].key !== seed) {
                    this.cleanSeed(garden, whereX, whereY);
                    keepSeed = seed;
                    continue; // Jump over filled slot
                }
            }
            else {
                // Empty slot - add to planting list
                cost += garden.plants[seed].cost;
                toPlant.push([seed, whereX, whereY]);
            }
        }
        // Cost is in minutes of current CPS
        cost *= 60 * Game.cookiesPs;
        if (cost > Game.cookies - this.savingsGoal)
            return;
        // Plant all seeds
        for (const target of toPlant) {
            const seed = target[0];
            const whereX = target[1];
            const whereY = target[2];
            garden.useTool(garden.plants[seed].id, whereX, whereY);
        }
    }
    /**
     * Get human-readable sector name
     * Original: AutoPlay.sectorText (lines 1103-1108)
     */
    sectorText(sector) {
        if (Game.Objects['Farm'].level > 4) {
            return (sector < 2 ? 'bottom' : 'top') + (sector % 2 ? ' left' : ' right');
        }
        else if (Game.Objects['Farm'].level === 4) {
            return sector % 2 ? 'left' : 'right';
        }
        else {
            return 'middle';
        }
    }
    /**
     * Plant seeds to unlock new plants through mutations
     * Original: AutoPlay.planting (lines 1159-1220)
     */
    planting(garden) {
        // Wait for meddleweed (first plant that spawns randomly)
        if (!garden.plants['meddleweed']?.unlocked) {
            this.plantList = [0, 0, 0, 0];
            this.logActivity('Waiting for meddleweed.');
            this.switchSoil(garden, 0, 'fertilizer');
            return;
        }
        // Use meddleweed to get crumbspore and brownMold
        if (!garden.plants['crumbspore']?.unlocked || !garden.plants['brownMold']?.unlocked) {
            this.logActivity('Trying to get crumbspore and brown mold.');
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 6; y++) {
                    if (garden.isTileUnlocked(x, y)) {
                        this.plantSeed(garden, 'meddleweed', x, y);
                    }
                }
            }
            return;
        }
        // Set plantsMissing = true BEFORE calling findPlants (original line 1172)
        this.plantsMissing = true;
        // Try to find a plant to work on for sector 0
        if (!this.findPlants(garden, 0)) {
            // No plants to work on - fill with dummy plants
            this.plantList = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                this.plantSector(garden, i);
            }
            return;
        }
        // Global soil selection with fallback (original lines 1186-1191)
        // Priority: Fertilizer (if plantPending) > Wood Chips > Fertilizer (fallback) > Dirt
        let soil = 'dirt';
        if (this.plantPending && garden.parent.bought >= garden.soils['fertilizer'].req) {
            soil = 'fertilizer'; // if waiting on a plant to mature
        }
        else if (garden.parent.bought >= garden.soils['woodchips'].req) {
            soil = 'woodchips'; // best for mutation
        }
        else if (garden.parent.bought >= garden.soils['fertilizer'].req) {
            soil = 'fertilizer'; // fallback if can't afford woodchips
        }
        this.switchSoil(garden, 0, soil);
        const farmLevel = Game.Objects['Farm'].level;
        // Farm level < 4: Use simple middle column planting (original lines 1192-1198)
        if (farmLevel < 4) {
            const dep = PLANT_DEPENDENCIES[this.plantList[0]];
            const targets = [
                [dep[1], 3, 2],
                [dep[2], 3, 3],
            ];
            if (garden.isTileUnlocked(3, 4)) {
                targets.push([dep[1], 3, 4]);
            }
            this.plantSeeds(garden, targets);
            return;
        }
        // Farm level == 4: Use two columns (original lines 1200-1213)
        this.findPlants(garden, 1);
        if (farmLevel === 4) {
            if (this.plantList[1] === 0) {
                this.logActivity('ERROR 42?');
                return;
            }
            const dep0 = PLANT_DEPENDENCIES[this.plantList[0]];
            const dep1 = PLANT_DEPENDENCIES[this.plantList[1]];
            this.plantSeeds(garden, [
                [dep0[1], 4, 2],
                [dep0[2], 4, 3],
                [dep0[1], 4, 4],
            ]);
            this.plantSeeds(garden, [
                [dep1[1], 1, 2],
                [dep1[2], 1, 3],
                [dep1[1], 1, 4],
            ]);
            return;
        }
        // Farm level >= 5: Use all 4 sectors (original lines 1215-1219)
        this.findPlants(garden, 2);
        this.findPlants(garden, 3);
        for (let sector = 0; sector < 4; sector++) {
            this.plantSector(garden, sector);
        }
    }
    /**
     * Find next plant to work on for a specific sector
     * Returns true if a plant goal was set, false otherwise
     * Original: AutoPlay.findPlants (lines 1119-1157)
     */
    findPlants(garden, idx) {
        if (this.wantAscend)
            return false; // do not plant before ascend
        let couldPlant = 0;
        // Check if already assigned a plant to this sector
        if (this.plantList[idx] !== 0) {
            const oldPlant = PLANT_DEPENDENCIES[this.plantList[idx]][0];
            this.logActivity(`Trying to get plant ${garden.plants[oldPlant].name} on sector ${this.sectorText(idx)}.`);
            this.plantCookies = false;
            if (this.havePlant(garden, oldPlant)) {
                this.plantList[idx] = 0; // Got it, clear the goal
            }
            else {
                return true; // Still working on it
            }
        }
        // Try to plant expensive plants first (if possible) as they take longest time
        const chkx = idx % 2 ? 0 : 5;
        const chky = idx > 1 ? 0 : 5;
        if (garden.isTileUnlocked(chkx, chky)) {
            // only plant if the spot is big enough
            // Check for everdaisy
            if (!this.havePlant(garden, 'everdaisy') &&
                garden.plants['elderwort'].unlocked &&
                garden.plants['tidygrass'].unlocked) {
                if (this.plantList.includes(2)) {
                    couldPlant = 2; // Already planted elsewhere
                }
                else {
                    this.plantList[idx] = 2;
                    return true;
                }
            }
            // Check for queenbeetLump
            if (!this.havePlant(garden, 'queenbeetLump') &&
                garden.plants['queenbeet'].unlocked) {
                if (this.plantList.includes(1)) {
                    couldPlant = 1; // Already planted elsewhere
                }
                else {
                    this.plantList[idx] = 1;
                    return true;
                }
            }
        }
        // Plant normal plants - start at index 3 to skip dummy, queenbeetLump, everdaisy
        for (let i = 3; i < PLANT_DEPENDENCIES.length; i++) {
            const plant = PLANT_DEPENDENCIES[i][0];
            if (!this.havePlant(garden, plant) &&
                garden.plants[PLANT_DEPENDENCIES[i][1]].unlocked &&
                garden.plants[PLANT_DEPENDENCIES[i][2]].unlocked) {
                // Want it
                if (this.plantList.includes(i)) {
                    if (!couldPlant)
                        couldPlant = i; // already planted - remember it
                }
                else {
                    this.plantList[idx] = i;
                    return true;
                }
            }
        }
        if (!couldPlant)
            return false;
        this.plantList[idx] = couldPlant;
        return true;
    }
    /**
     * Plant parent plants in a sector to create mutations
     * Original: AutoPlay.plantSector (lines 1222-1251)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3)
     */
    plantSector(garden, sector) {
        const plantIndex = this.plantList[sector];
        if (plantIndex === 0)
            return;
        const [targetPlant, parent1, parent2] = PLANT_DEPENDENCIES[plantIndex];
        // Calculate sector position
        const X = sector % 2 ? 0 : 3;
        const Y = sector > 1 ? 0 : 3;
        // Special case: dummy means we're done with mutations, plant for cookies
        if (targetPlant === 'dummy') {
            const thePlant = this.seedCalendar(garden, sector);
            for (let x = X; x < X + 3; x++) {
                for (let y = Y; y < Y + 3; y++) {
                    this.plantSeed(garden, thePlant, x, y);
                }
            }
            return;
        }
        // Special case: queenbeetLump needs specific 4-tile pattern around center
        if (targetPlant === 'queenbeetLump') {
            // Plant parent1 and parent2 in alternating columns (left and right full)
            for (let y = Y; y < Y + 3; y++) {
                this.plantSeed(garden, parent1, X, y);
                this.plantSeed(garden, parent2, X + 2, y);
            }
            // Plant parent1 at top and parent2 at bottom of middle column
            this.plantSeed(garden, parent1, X + 1, Y);
            this.plantSeed(garden, parent2, X + 1, Y + 2);
            return;
        }
        // Special case: everdaisy needs both parents in left and right columns only
        if (targetPlant === 'everdaisy') {
            for (let y = Y; y < Y + 3; y++) {
                this.plantSeed(garden, parent1, X, y);
                this.plantSeed(garden, parent2, X + 2, y);
            }
            return;
        }
        // Default case: Plant only middle column (X+1) with alternating parents
        this.plantSeeds(garden, [
            [parent1, X + 1, Y],
            [parent2, X + 1, Y + 1],
            [parent1, X + 1, Y + 2],
        ]);
    }
    /**
     * Check if ready to sacrifice garden for "Seedless to nay" achievement
     */
    gardenSacrificeReady(garden) {
        this.wantGardenSacrifice = false;
        // Achievement 382 = "Seedless to nay" (sacrifice garden with all plants)
        if (!Game.AchievementsById[382].won && garden.plantsUnlockedN === garden.plantsN) {
            if (!this.harvestPlant) {
                return true;
            }
            this.wantGardenSacrifice = true;
            this.logActivity('Waiting for harvest before getting Seedless to Nay.');
        }
        return false;
    }
    /**
     * Check if garden is ready (all plants and upgrades unlocked)
     */
    gardenReady(garden) {
        return (Game.Objects['Farm'].level > 8 &&
            garden.plantsUnlockedN === garden.plantsN &&
            this.allUnlocked(GARDEN_UPGRADES));
    }
    /**
     * Clean dying plants from garden to make room for new mutations
     * Original: AutoPlay.cleaningGarden (lines 1395-1412)
     */
    cleaningGarden(garden) {
        const farmLevel = Game.Objects['Farm'].level;
        if (farmLevel < 4) {
            // Level < 4: Clean middle columns (2 and 4)
            if (this.plantList[0] === 0)
                return;
            for (let y = 2; y < 5; y++) {
                this.cleanSeed(garden, 2, y);
                this.cleanSeed(garden, 4, y);
            }
        }
        else if (farmLevel === 4) {
            // Level 4: Clean columns 2 and 3
            for (let y = 2; y < 5; y++) {
                this.cleanSeed(garden, 2, y);
                this.cleanSeed(garden, 3, y);
            }
        }
        else {
            // Level 5+: Clean all 4 sectors
            for (let sector = 0; sector < 4; sector++) {
                const plantGoal = PLANT_DEPENDENCIES[this.plantList[sector]][0];
                this.cleanSector(garden, sector, plantGoal);
            }
        }
    }
    /**
     * Harvest a plant and clean sector if needed
     */
    harvest(garden, x, y) {
        garden.harvest(x, y);
        const sector = (x < 3 ? 1 : 0) + (y < 3 ? 2 : 0);
        if (this.plantList[sector] === 1) {
            this.cleanSector(garden, sector, 'all');
        }
    }
    /**
     * Clean a specific sector of the garden (3x3 grid)
     * Original: AutoPlay.cleanSector (lines 1414-1434)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3): 0=bottom-right, 1=bottom-left, 2=top-right, 3=top-left
     * @param plant0 - Target plant name ('dummy', 'all', 'queenbeetLump', 'everdaisy', or regular plant)
     */
    cleanSector(garden, sector, plant0) {
        if (plant0 === 'dummy')
            return; // Don't clean when working on mutations
        // Calculate sector position (each sector is 3x3)
        const X = sector % 2 ? 0 : 3; // Left (0) or right (3)
        const Y = sector > 1 ? 0 : 3; // Top (0) or bottom (3)
        // Special case: queenbeetLump only needs center tile cleaned
        if (plant0 === 'queenbeetLump') {
            this.cleanSeed(garden, X + 1, Y + 1);
            return;
        }
        // Special case: everdaisy needs middle column cleaned
        if (plant0 === 'everdaisy') {
            for (let y = Y; y < Y + 3; y++) {
                this.cleanSeed(garden, X + 1, y);
            }
            return;
        }
        // Special case: clean all unlocked plants in sector
        if (plant0 === 'all') {
            for (let x = X; x < X + 3; x++) {
                for (let y = Y; y < Y + 3; y++) {
                    // Skip center tile
                    if (x !== X + 1 || y !== Y + 1) {
                        const tile = garden.getTile(x, y);
                        if (tile[0] >= 1 && garden.plantsById[tile[0] - 1].unlocked) {
                            garden.harvest(x, y);
                        }
                    }
                }
            }
            return;
        }
        // Default: clean left and right columns (for mutation patterns)
        for (let y = Y; y < Y + 3; y++) {
            this.cleanSeed(garden, X, y);
            this.cleanSeed(garden, X + 2, y);
        }
    }
    /**
     * Plant a seed at a specific location
     * Original: AutoPlay.plantSeed (lines 1256-1272)
     *
     * @param garden - Garden minigame object
     * @param seed - Plant key to plant
     * @param whereX - X coordinate (0-5)
     * @param whereY - Y coordinate (0-5)
     */
    plantSeed(garden, seed, whereX, whereY) {
        // Don't plant when CPS multiplier is too high (expensive)
        const grindingCheat = this._grindingCheat ? 1 : 0;
        const cheatGolden = this._cheatGolden > 1 ? 1 : 0;
        if (this.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
            this.logActivity('Do not buy plants now - it is too expensive.');
            return;
        }
        if (!garden.isTileUnlocked(whereX, whereY))
            return;
        const oldPlant = garden.getTile(whereX, whereY)[0];
        if (oldPlant !== 0) {
            // Tile is occupied - try to clean if different plant
            if (garden.plantsById[oldPlant - 1].key !== seed) {
                this.cleanSeed(garden, whereX, whereY);
            }
            return;
        }
        if (!garden.canPlant(garden.plants[seed]))
            return;
        // Check if we can afford (cost is in minutes of current CPS)
        const cost = garden.plants[seed].cost * 60 * Game.cookiesPs;
        if (cost > Game.cookies - this.savingsGoal)
            return;
        garden.useTool(garden.plants[seed].id, whereX, whereY);
    }
    /**
     * Clean (harvest) a seed from a specific tile
     * Original: AutoPlay.cleanSeed (lines 1439-1448)
     *
     * @param garden - Garden minigame object
     * @param x - X coordinate
     * @param y - Y coordinate
     */
    cleanSeed(garden, x, y) {
        if (!garden.isTileUnlocked(x, y))
            return;
        const tile = garden.getTile(x, y);
        if (tile[0] === 0)
            return; // Empty tile
        const plant = garden.plantsById[tile[0] - 1];
        // Don't clean plants that aren't unlocked yet and haven't matured
        if (!plant.unlocked && tile[1] <= plant.mature)
            return;
        // Don't clean harvestable plants that haven't matured yet
        if (HARVESTABLE_PLANTS_ARRAY.indexOf(plant.key) >= 0 && tile[1] && tile[1] <= plant.mature) {
            return;
        }
        garden.harvest(x, y);
    }
    /**
     * Switch soil type for the garden
     * Original: AutoPlay.switchSoil (lines 1492-1498)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (only switches for sector 0)
     * @param which - Soil type name ('dirt', 'fertilizer', 'clay', 'woodchips')
     */
    switchSoil(garden, sector, which) {
        if (sector)
            return; // Only switch for sector 0 (global soil)
        if (garden.nextSoil > this.now)
            return; // Soil change on cooldown
        const soil = garden.soils[which];
        if (!soil)
            return;
        // Check if already using this soil or don't have enough farms
        if (garden.soil === soil.id || garden.parent.bought < soil.req)
            return;
        // Click soil button using FireEvent to trigger game's click handler
        const soilButton = document.getElementById(`gardenSoil-${soil.id}`);
        if (soilButton) {
            soilButton.click();
        }
    }
    /**
     * Check if all upgrades in list are unlocked
     */
    allUnlocked(upgradeIds) {
        return upgradeIds.every((id) => Game.UpgradesById[id].bought);
    }
    /**
     * Log activity message
     */
    logActivity(msg) {
        if (this.addActivity) {
            this.addActivity(msg);
        }
    }
    /**
     * Update state from AutoPlay
     */
    updateState(state) {
        this.now = state.now;
        this.cpsMult = state.cpsMult;
        this.wantAscend = state.wantAscend;
        this.savingsGoal = state.savingsGoal;
        this.canUseLumps = state.canUseLumps;
        this.finished = state.finished;
        this.lumpRelatedAchievements = state.lumpRelatedAchievements;
        this.poppingWrinklers = state.poppingWrinklers;
        this._grindingCheat = state.grindingCheat;
        this._cheatGolden = state.cheatGolden;
    }
    /**
     * Set activity logging callback
     */
    setAddActivity(callback) {
        this.addActivity = callback;
    }
    /**
     * Get plant pending status (for AutoPlay.plantPending)
     */
    isPlantPending() {
        return this.plantPending;
    }
    /**
     * Get current module status for dashboard
     */
    getStatus() {
        // Check if garden is unlocked
        if (!Game.isMinigameReady(Game.Objects['Farm'])) {
            return {
                module: 'Garden',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Farm level 1 to unlock Garden minigame',
                icon: '🌱',
                details: {
                    'Farm Level': Game.Objects['Farm']?.level || 0,
                    'Minigame': 'Not unlocked'
                }
            };
        }
        const garden = Game.Objects['Farm'].minigame;
        // Check if ascending soon
        if (this.wantAscend) {
            return {
                module: 'Garden',
                status: 'waiting',
                currentAction: 'Preparing for ascension',
                reason: 'Not planting before ascend',
                icon: '⬆️',
                details: {
                    'Ascension Pending': true
                }
            };
        }
        // Check if waiting for plants
        if (!garden.plants['meddleweed']?.unlocked) {
            return {
                module: 'Garden',
                status: 'waiting',
                currentAction: 'Waiting for meddleweed',
                reason: 'First plant spawns randomly',
                icon: '🌱',
                details: {
                    'Soil': 'fertilizer',
                    'Waiting For': 'meddleweed'
                }
            };
        }
        // Check if getting starter plants
        if (!garden.plants['crumbspore']?.unlocked || !garden.plants['brownMold']?.unlocked) {
            return {
                module: 'Garden',
                status: 'active',
                currentAction: 'Planting meddleweed everywhere',
                reason: 'Getting crumbspore and brownMold',
                icon: '🌱',
                details: {
                    'Crumbspore': garden.plants['crumbspore']?.unlocked || false,
                    'BrownMold': garden.plants['brownMold']?.unlocked || false
                }
            };
        }
        // Check if working on specific plant
        const activePlants = this.plantList.filter(p => p !== 0);
        if (activePlants.length > 0) {
            const plantIndex = activePlants[0];
            const plantName = PLANT_DEPENDENCIES[plantIndex]?.[0] || 'unknown';
            return {
                module: 'Garden',
                status: 'active',
                currentAction: `Growing ${plantName}`,
                reason: this.plantsMissing ? 'Working towards all 34 plants' : 'Optimizing for cookies/lumps',
                nextAction: activePlants.length > 1 ? `Then ${activePlants.length - 1} more plants` : undefined,
                icon: '🌱',
                details: {
                    'Target Plant': plantName,
                    'Plants Unlocked': `${garden.plantsUnlockedN}/${garden.plantsN}`,
                    'Farm Level': Game.Objects['Farm'].level,
                    'Active Sectors': activePlants.length
                }
            };
        }
        // Check if ready for sacrifice
        if (garden.plantsUnlockedN === garden.plantsN && !Game.AchievementsById[382].won) {
            if (this.harvestPlant) {
                return {
                    module: 'Garden',
                    status: 'waiting',
                    currentAction: 'Waiting to harvest',
                    reason: 'Will sacrifice after harvesting cookie plants',
                    nextAction: 'Sacrifice for "Seedless to nay" achievement',
                    icon: '🏆',
                    details: {
                        'Plants Unlocked': 'All 34',
                        'Harvest Pending': true
                    }
                };
            }
            return {
                module: 'Garden',
                status: 'active',
                currentAction: 'Ready to sacrifice',
                reason: 'All plants unlocked',
                nextAction: 'Get "Seedless to nay" achievement',
                icon: '🏆',
                details: {
                    'Plants Unlocked': 'All 34'
                }
            };
        }
        // Idle/harvesting
        return {
            module: 'Garden',
            status: this.harvestPlant ? 'active' : 'idle',
            currentAction: this.harvestPlant ? 'Harvesting plants' : 'Monitoring garden',
            reason: this.plantsMissing ? 'All goals complete, waiting' : 'Optimizing production',
            icon: '🌿',
            details: {
                'Plants Unlocked': `${garden.plantsUnlockedN}/${garden.plantsN}`,
                'Harvest Ready': this.harvestPlant
            }
        };
    }
}

;// ./src/modules/StockMarketManager.ts
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
class StockMarketManager {
    constructor() {
        this.goodsList = new Map();
        this.resetTime = Date.now();
        this.wantAscend = false;
        this.plantPending = false;
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleStockMarket() {
        // Wait 1 hour after reset/reincarnation before trading
        if (Date.now() < this.resetTime + 3600000)
            return;
        if (!Game.isMinigameReady(Game.Objects['Bank']))
            return;
        if (this.wantAscend)
            return; // Don't trade before ascending
        const market = Game.Objects['Bank'].minigame;
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
    handleNightTrading() {
        if (!Game.isMinigameReady(Game.Objects['Bank']))
            return;
        const market = Game.Objects['Bank'].minigame;
        // First do normal trading
        this.handleStockMarket();
        // Then do aggressive night trading
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            const price = market.getGoodPrice(good);
            const goodData = this.goodsList.get(good.id);
            if (!goodData)
                continue;
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
    buyBrokers(market) {
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
    upgradeOffices(market) {
        if (market.officeLevel < market.offices.length - 1) {
            const office = market.offices[market.officeLevel];
            if (office.cost &&
                Game.Objects['Cursor'].amount >= office.cost[0] &&
                Game.Objects['Cursor'].level >= office.cost[1]) {
                const upgradeButton = document.getElementById('bankOfficeUpgrade');
                if (upgradeButton) {
                    upgradeButton.click();
                }
            }
        }
    }
    /**
     * Buy 500 of each stock for "Dude, sweet" achievement (459)
     */
    buyForAchievement(market) {
        // Achievement 459 = "Dude, sweet" (own 500 of each stock)
        const lastGood = market.goodsById[market.goodsById.length - 1];
        if (!Game.AchievementsById[459].won &&
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
    tryDebtEvasion() {
        if (!Game.Achievements['Debt evasion'].won && !this.plantPending) {
            const loanButton = document.getElementById('bankLoan2');
            if (loanButton) {
                loanButton.click();
                // Wait 30 seconds then ascend
                setTimeout(() => {
                    if (this.doAscend) {
                        this.doAscend('trying debt evasion');
                    }
                }, 30 * 1000);
            }
        }
    }
    /**
     * Initialize price thresholds for all goods
     */
    initializeGoodsList(market) {
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
    tradeGoods(market) {
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            const price = market.getGoodPrice(good);
            const maxStock = market.getGoodMaxStock(good);
            const goodData = this.goodsList.get(good.id);
            if (!goodData)
                continue;
            // Update min/max prices
            if (goodData.min > price)
                goodData.min = price;
            if (goodData.max < price)
                goodData.max = price;
            // BUY logic - when price is rising and below threshold
            if (good.stock < maxStock) {
                // Price is rising (current price > min + delta) and affordable
                if (price - goodData.delta > goodData.min && price < goodData.buyHigh) {
                    if (goodData.min < goodData.buyLow) {
                        // Very cheap - buy all
                        market.buyGood(good.id, 10000);
                        goodData.max = price;
                    }
                    else if (goodData.min < goodData.buyMedium) {
                        // Reasonable - buy 80%
                        const buyAmount = Math.floor(maxStock * 0.8 - good.stock);
                        market.buyGood(good.id, buyAmount);
                        goodData.max = price;
                    }
                    else if (goodData.min < goodData.buyHigh) {
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
                    }
                    else if (goodData.max > goodData.sellLow) {
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
     * Update state from AutoPlay
     */
    updateState(state) {
        this.resetTime = state.resetTime;
        this.wantAscend = state.wantAscend;
        this.plantPending = state.plantPending;
    }
    /**
     * Set ascension callback
     */
    setDoAscendCallback(callback) {
        this.doAscend = callback;
    }
    /**
     * Get current stock market manager status
     */
    getStatus() {
        // Check for cooldown period after reset
        const cooldownRemaining = Math.floor((this.resetTime + 3600000 - Date.now()) / 1000 / 60);
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
        if (!Game.isMinigameReady(Game.Objects['Bank'])) {
            return {
                module: 'Stock Market',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Bank minigame unlocked (Cursor level 12)',
                icon: '📈',
                details: {
                    'Cursor Level': Game.Objects['Cursor']?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        // Don't trade before ascending
        if (this.wantAscend) {
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
        const market = Game.Objects['Bank'].minigame;
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
            if (good.stock > 0)
                goodsWithStock++;
        }
        // Check for achievement pursuit
        const lastGood = market.goodsById[market.goodsById.length - 1];
        const pursuingAchievement = !Game.AchievementsById[459].won &&
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

;// ./src/AutoPlay.ts
/**
 * Main AutoPlay class that coordinates all modules
 */



// import { UpgradeManager } from './modules/UpgradeManager'; // Moved to BuildingManager












// import type { UpgradeManagerContext } from './modules/UpgradeManager'; // Moved to BuildingManager


class AutoPlay_AutoPlay {
    // Public accessors for state properties (proxies to this.state)
    get nextAchievement() { return this.state.nextAchievement; }
    set nextAchievement(value) { this.state.nextAchievement = value; }
    get finished() { return this.state.finished; }
    set finished(value) { this.state.finished = value; }
    get wantAscend() { return this.state.wantAscend; }
    set wantAscend(value) { this.state.wantAscend = value; }
    get mainActivity() {
        return this.state.mainActivity;
    }
    set mainActivity(value) { this.state.mainActivity = value; }
    get activities() {
        return this.state.activities;
    }
    set activities(value) { this.state.activities = value; }
    // Additional accessors for Dashboard
    get nextPurchase() {
        return this.state.nextPurchase;
    }
    set nextPurchase(value) { this.state.nextPurchase = value; }
    get nextPurchaseType() { return this.state.nextPurchaseType; }
    set nextPurchaseType(value) { this.state.nextPurchaseType = value; }
    get nextPurchasePrice() { return this.state.nextPurchasePrice; }
    set nextPurchasePrice(value) { this.state.nextPurchasePrice = value; }
    get nextPurchasePP() { return this.state.nextPurchasePP; }
    set nextPurchasePP(value) { this.state.nextPurchasePP = value; }
    get deadline() { return this.state.deadline; }
    set deadline(value) { this.state.deadline = value; }
    get now() { return this.state.now; }
    set now(value) { this.state.now = value; }
    get savingsGoal() { return this.config.savingsGoal; }
    set savingsGoal(value) { this.config.savingsGoal = value; }
    get hyperActive() { return this.state.hyperActive; }
    set hyperActive(value) { this.state.hyperActive = value; }
    get savingsStart() { return this.state.savingsStart; }
    set savingsStart(value) { this.state.savingsStart = value; }
    get statusInfo() { return this.state.statusInfo; }
    set statusInfo(value) { this.state.statusInfo = value; }
    get workingOnSpecialAchievement() { return this.state.workingOnSpecialAchievement; }
    set workingOnSpecialAchievement(value) { this.state.workingOnSpecialAchievement = value; }
    // Public methods expected by modules
    info(message) {
        console.log(`[CookieBot] ${message}`);
    }
    setMainActivity(activity) {
        // When mainActivity changes, reset activities to the new base
        if (this.state.mainActivity !== activity) {
            this.state.mainActivity = activity;
            this.state.activities = activity;
        }
    }
    addActivity(activity) {
        if (!this.state.activities.includes(activity)) {
            this.state.activities += '<div class="line"></div>' + activity;
            return true;
        }
        return false;
    }
    logAction(action, details) {
        if (this.dashboard) {
            this.dashboard.logAction(action, details);
        }
    }
    logStatus(category, message, details) {
        if (this.dashboard) {
            this.dashboard.logStatus(category, message, details);
        }
    }
    constructor() {
        // Shared context for upgrade manager (moved to BuildingManager)
        // private upgradeContext: UpgradeManagerContext;
        // Public properties for global AutoPlay access (needed by modules)
        this.wantedAchievements = [];
        this.lateAchievements = [];
        this.robotName = 'Automated ';
        this.backupHeight = 0;
        this.giftCode = 0;
        // Initialize default configuration
        this.config = this.getDefaultConfig();
        this.state = this.getDefaultState();
        // Initialize public achievement arrays
        this.wantedAchievements = [...WANTED_ACHIEVEMENTS];
        this.lateAchievements = [...gameIds_LUMP_RELATED_ACHIEVEMENTS];
        // Create dashboard FIRST so logging callbacks can use it
        this.dashboard = new Dashboard();
        // Helper methods for logging and activities (now dashboard exists)
        const logAction = (action, details) => {
            // Dashboard handles all action history tracking
            this.dashboard.logAction(action, details);
        };
        const logStatus = (type, message, details) => {
            // Dashboard handles all status history tracking
            this.dashboard.logStatus(type, message, details);
        };
        const addActivity = (activity) => {
            // Original uses string concatenation with HTML, not array
            // Check for duplicates before adding
            if (!this.state.activities.includes(activity)) {
                this.state.activities += '<div class="line"></div>' + activity;
                return true;
            }
            return false;
        };
        // Initialize centralized logger AFTER dashboard created
        Logger.initialize({
            logAction,
            logStatus,
            addActivity,
        });
        // Initialize modules with proper constructor arguments
        this.goldenCookieHandler = new GoldenCookieHandler({
            GoldenClickMode: this.config.autoGoldenCookie ? 1 : 0,
            CheatGolden: this.config.cheatGolden,
        }, logAction, addActivity, () => this.grindingCheat());
        this.savingsManager = new SavingsManager(this.config, logStatus);
        this.purchaseManager = new PurchaseManager({
            logAction,
            addActivity,
        });
        // Create upgrade manager context (moved to BuildingManager)
        // this.upgradeContext = {
        //   now: this.state.now,
        //   savingsGoal: this.config.savingsGoal,
        //   canUseLumps: false,
        //   nextAchievement: null,
        //   nextPurchase: null,
        //   nextPurchaseType: null,
        //   nextPurchasePrice: null,
        //   nextPurchasePP: null,
        //   hyperActive: false,
        //   logAction,
        //   addActivity,
        // };
        // this.upgradeManager = new UpgradeManager(this.upgradeContext); // Moved to BuildingManager
        this.seasonHandler = new SeasonHandler();
        this.sugarLumpManager = new SugarLumpManager(this.state);
        this.wrinklerManager = new WrinklerManager(this.state);
        this.achievementHandler = new AchievementHandler();
        // Create ascension context (simplified - will need full AutoPlayContext later)
        const ascensionContext = {
            now: this.state.now,
            nextAchievement: 0,
            wantedAchievements: [...WANTED_ACHIEVEMENTS],
            lumpHarvestAchievements: [],
            wantAscend: false,
            Config: {},
            mainActivity: '',
            activities: '',
            hyperActive: false,
            workingOnSpecialAchievement: false,
            plantPending: false,
            delay: 0,
            finished: false,
            kittens: [],
            maxBuildings: [],
            cursors: [],
            butterBiscuits: [],
            expensive: [],
            info: (msg) => console.log(msg),
            logAction,
            logStatus,
            addActivity,
            setMainActivity: (activity) => console.log(`Main: ${activity}`),
            setDeadline: (time) => console.log(`Deadline: ${time}`),
            findNextAchievement: () => { },
            endPhase: () => false,
            preNightMode: () => false,
            mustRebornAscend: () => false,
            assignSpirit: () => { },
        };
        this.ascensionManager = new AscensionManager(ascensionContext);
        this.dragonManager = new DragonManager();
        // Dashboard already created at top of constructor
        this.nightMode = new NightMode(this.config);
        this.pantheonManager = new PantheonManager();
        this.grimoireManager = new GrimoireManager();
        this.gardenManager = new GardenManager();
        this.stockMarketManager = new StockMarketManager();
        // Set up activity callback for modules that need it
        this.sugarLumpManager.setAddActivity(addActivity);
        this.nightMode.setAddActivityCallback(addActivity);
        this.gardenManager.setAddActivity(addActivity);
        // Set up wrinkler manager dependencies
        this.wrinklerManager.setDependencies(this.seasonHandler, [...WANTED_ACHIEVEMENTS], this.state.nextAchievement);
        // Set up pantheon manager reference for night mode
        this.nightMode.setPantheonManager(this.pantheonManager);
        // Set up stock market manager reference for night mode
        this.nightMode.setStockMarketManager(this.stockMarketManager);
    }
    /**
     * Initialize the bot
     */
    init() {
        if (this.state.isInitialized) {
            console.log('CookieBot already initialized');
            return;
        }
        console.log(`CookieBot v${AutoPlay_AutoPlay.version} initializing...`);
        // Load saved configuration
        this.loadConfig();
        // Find first achievement to work on
        this.achievementHandler.findNextAchievement();
        // Create dashboard UI
        this.dashboard.createDashboard();
        this.dashboard.updateDashboard();
        // Update dashboard every second for real-time stats
        setInterval(() => {
            this.dashboard.updateDashboard();
        }, 1000);
        // Hook into Game.UpdateMenu to add config options to preferences
        this.setupMenuHook();
        // Do an initial bestBuy check to populate purchase info for dashboard
        const Game = globalThis.Game;
        const cpsMult = Game.cookiesPs / Game.unbuffedCps;
        this.purchaseManager.setState(this.config.savingsGoal, Date.now(), cpsMult, this.sugarLumpManager.getCanUseLumps(), this.state.nextAchievement);
        this.purchaseManager.bestBuy();
        const purchaseInfo = this.purchaseManager.getPurchaseInfo();
        if (purchaseInfo) {
            this.state.nextPurchase = purchaseInfo.name;
            this.state.nextPurchaseType = purchaseInfo.type;
            this.state.nextPurchasePP = purchaseInfo.pp;
            this.state.nextPurchasePrice = purchaseInfo.price;
        }
        // Set up periodic execution
        this.scheduleNextRun();
        this.state.isInitialized = true;
        console.log('CookieBot initialized successfully');
    }
    /**
     * Hook into Game.UpdateMenu to add config options to preferences menu
     */
    setupMenuHook() {
        const Game = globalThis.Game;
        // Backup original UpdateMenu if not already backed up
        if (!Game.__originalUpdateMenu) {
            Game.__originalUpdateMenu = Game.UpdateMenu;
        }
        // Override UpdateMenu to inject our config options
        const self = this;
        Game.UpdateMenu = function () {
            // Call original UpdateMenu first
            Game.__originalUpdateMenu();
            // Add our config menu when on preferences screen
            if (Game.onMenu === 'prefs') {
                self.dashboard.addMenuPref();
            }
        };
    }
    /**
     * Main execution cycle - implements 8-phase model from original
     * Runs every 300ms via setInterval
     */
    periodic() {
        // Schedule next run FIRST so it always continues regardless of early returns
        this.scheduleNextRun();
        // Declare Game global
        const Game = globalThis.Game;
        // ===== Phase 0: Early exits for timers =====
        if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0)
            return;
        // ===== Phase 1: Delay handling =====
        if (this.state.delay > 0) {
            this.state.delay--;
            return;
        }
        // ===== Phase 2: Setup =====
        this.state.now = Date.now();
        // Handle "Just Right" achievement (special case)
        if (this.state.nextAchievement === 397) {
            this.runJustRight();
            return;
        }
        // Calculate CPS multiplier for later use
        const cpsMult = Game.cookiesPs / Game.unbuffedCps;
        // Update finished state - check if all lump-related achievements are complete
        this.state.finished = gameIds_LUMP_RELATED_ACHIEVEMENTS.every((id) => Game.AchievementsById[id].won);
        // ===== Phase 3: Night mode =====
        if (this.nightMode.checkNightMode() && !Game.ascensionMode) {
            // If sleeping, only cheat sugar lumps at level 4 and return
            if (this.config.cheatLumps === 4) {
                this.sugarLumpManager.handleSugarLumps();
            }
            return;
        }
        // ===== Phase 4: Fast actions (always run every 300ms) =====
        this.handleClicking();
        if (this.config.autoGoldenCookie) {
            this.goldenCookieHandler.handleGoldenCookies();
        }
        // Speed cheat sugar lumps if level 4
        if (this.config.cheatLumps === 4 && this.config.autoSugarLumps) {
            this.sugarLumpManager.handleSugarLumps();
        }
        // ===== Phase 5: High-activity phase =====
        if (this.state.hyperActive || (this.state.now >= this.state.deadline)) {
            this.state.hyperActive = false; // Reset flag, can be overwritten
            // Unified bestBuy logic (compares buildings and upgrades by PP)
            this.bestBuy();
            // Set hyperActive if CPS multiplier is very high
            if (cpsMult > 100) {
                this.state.hyperActive = true;
            }
            // Handle speed minigames (grimoire spells)
            this.handleSpeedMinigames();
        }
        // ===== Phase 6: Frequent ascension checks =====
        // Check ascend often in reborn and during ascend
        if (Game.ascensionMode === 1 || this.state.onAscend) {
            if (this.config.autoAscend) {
                this.ascensionManager.handleAscend();
                // Sync wantAscend state from ascension manager context
                this.state.wantAscend = this.ascensionManager.context.wantAscend;
            }
        }
        // Check ascend often for lucky payout
        if (!Game.Upgrades['Lucky payout'].bought && Game.heavenlyChips > 77777777) {
            if (this.config.autoAscend) {
                this.ascensionManager.handleAscend();
                // Sync wantAscend state from ascension manager context
                this.state.wantAscend = this.ascensionManager.context.wantAscend;
            }
        }
        // ===== Phase 7: Deadline check (end of high-activity) =====
        if (this.state.now < this.state.deadline) {
            return;
        }
        // ===== Phase 8: Periodic actions (every 15 seconds) =====
        // Set robot name in bakery
        const bakeryName = Game.bakeryNameL.textContent;
        const robotName = 'Automated ';
        if (bakeryName.slice(0, robotName.length) !== robotName) {
            Game.bakeryNameL.textContent = robotName + bakeryName;
        }
        // Reset activities to mainActivity at start of periodic phase
        // Activities will be added to throughout Phase 8 by various modules
        this.state.activities = this.state.mainActivity;
        // Skip status() when menu is open - it closes the menu
        if (!Game.onMenu) {
            this.status(false);
        }
        // Plant pending warning
        if (this.state.plantPending) {
            Logger.addActivity('Make sure to harvest the new plant before ascend!');
        }
        // Calculate dynamic deadline based on when next purchase is affordable
        let dynamicDeadline = 15000; // Default 15 seconds
        if (this.state.nextPurchasePrice && Game.cookiesPs > 0) {
            const availableCookies = Game.cookies - (this.config.savingsGoal || 0);
            const needsForPurchase = this.state.nextPurchasePrice - availableCookies;
            if (needsForPurchase > 0) {
                // Calculate seconds until affordable (with buffer to catch it early)
                let timeToAfford = (needsForPurchase / Game.cookiesPs) * 1000; // Convert to ms
                const bufferTime = 500; // Check 0.5s before affordable
                timeToAfford = Math.max(timeToAfford - bufferTime, 100);
                // Smart deadline calculation to avoid overshooting
                if (timeToAfford <= 15000) {
                    // Can check exactly when it's affordable
                    dynamicDeadline = timeToAfford;
                }
                else {
                    // For longer waits, check at intervals that lead up to affordable time
                    const remainder = timeToAfford % 15000;
                    if (remainder > 1000) {
                        // Check at the remainder time to align with affordable moment
                        dynamicDeadline = remainder;
                    }
                    else {
                        // Remainder is small, just use standard 15s interval
                        dynamicDeadline = 15000;
                    }
                }
                dynamicDeadline = Math.max(dynamicDeadline, 100); // Minimum 100ms
            }
            else {
                // Already affordable - check immediately
                dynamicDeadline = 100;
            }
        }
        this.state.deadline = this.state.now + dynamicDeadline;
        this.setDeadline(this.state.now + (this.state.now - Game.startDate) / 10); // Quick start
        // Skip dashboard update if user has a menu open
        if (!Game.onMenu || Game.onMenu === '') {
            this.dashboard.render();
        }
        // Run all periodic modules (every 15 seconds)
        // Sugar lumps (if not level 4, which runs in fast phase)
        if (this.config.cheatLumps !== 4 && this.config.autoSugarLumps) {
            this.sugarLumpManager.handleSugarLumps();
        }
        // Savings calculation
        if (this.config.savingsEnabled) {
            this.savingsManager.handleSavings();
        }
        // Seasons
        if (this.config.autoSeason) {
            this.seasonHandler.handleSeasons();
        }
        // Dragon
        this.dragonManager.handleDragon();
        // Small achievements
        this.achievementHandler.handleSmallAchievements();
        // Wrinklers
        if (this.config.autoWrinklers) {
            this.wrinklerManager.updateState(this.state.nextAchievement);
            this.wrinklerManager.handleWrinklers();
        }
        // Ascension
        if (this.config.autoAscend) {
            this.ascensionManager.handleAscend();
            // Sync wantAscend state from ascension manager context
            this.state.wantAscend = this.ascensionManager.context.wantAscend;
        }
        // Minigames (garden, pantheon, stock market)
        this.handleMinigames();
        // Handle notes
        this.handleNotes();
        // Add some more hints what the bot is doing (but only if not working on special achievements)
        if (!this.state.workingOnSpecialAchievement) {
            if (!Game.HasAchiev('Elder')) {
                Logger.addActivity('Getting 7 grandma types');
            }
            if (Game.HasAchiev('Elder') &&
                Game.Upgrades['Bingo center/Research facility'].unlocked &&
                Game.ascensionMode !== 1 &&
                !Game.Upgrades['Bingo center/Research facility'].bought) {
                Logger.addActivity('Funding the grandma research facility');
            }
        }
        // Note: scheduleNextRun() is called at the START of periodic(), not here
    }
    /**
     * Schedule the next periodic execution
     * Original runs at fixed 300ms interval via setInterval
     */
    scheduleNextRun() {
        setTimeout(() => this.periodic(), 300);
    }
    /**
     * Handle clicking - respects Neverclick/True Neverclick achievements
     * Click modes: 0=off, 1=normal, 2+=aggressive
     */
    handleClicking() {
        const Game = globalThis.Game;
        if (this.config.clickMode === 0)
            return;
        // Respect Neverclick achievement
        if (!Game.Achievements['Neverclick'].won && Game.cookieClicks <= 15) {
            return;
        }
        // Respect True Neverclick achievement in reborn endgame
        if (Game.ascensionMode === 1 && this.endPhase() &&
            !Game.Achievements['True Neverclick'].won && !Game.cookieClicks) {
            return;
        }
        // Uncanny clicker achievement (5 clicks in a row)
        if (!Game.Achievements['Uncanny clicker'].won) {
            for (let i = 1; i < 6; i++) {
                setTimeout(() => Game.ClickCookie(), 50 * i);
            }
        }
        // Aggressive clicking (mode 2+)
        if (this.config.clickMode > 1) {
            for (let i = 1; i < 10; i++) {
                setTimeout(() => this.speedClicking(), 30 * i);
            }
        }
        else {
            // Normal clicking (mode 1)
            Game.ClickCookie();
            // Extra clicks during frenzy buffs
            if ('Click frenzy' in Game.buffs ||
                'Dragonflight' in Game.buffs ||
                'Cursed finger' in Game.buffs) {
                for (let i = 1; i < 5; i++) {
                    setTimeout(() => Game.ClickCookie(), 30 * i);
                }
            }
        }
    }
    /**
     * Speed clicking with multiplier (for aggressive click modes)
     */
    speedClicking() {
        const Game = globalThis.Game;
        Game.ClickCookie();
        const clickCount = 1 << (10 * (this.config.clickMode - 2));
        Game.ClickCookie(0, clickCount * Game.computedMouseCps);
    }
    /**
     * Unified bestBuy - compares buildings AND upgrades by payback period
     * Delegates to BuildingManager which has full CookieMonster integration
     * Original: lines 471-615 in cookieAutoPlayBeta.js
     */
    bestBuy() {
        const Game = globalThis.Game;
        // Update BuildingManager state with current context
        const cpsMult = Game.cookiesPs / Game.unbuffedCps;
        this.purchaseManager.setState(this.config.savingsGoal, this.state.now, cpsMult, this.sugarLumpManager.getCanUseLumps(), this.state.nextAchievement);
        // Delegate to BuildingManager
        this.purchaseManager.bestBuy();
        // Sync purchase info from BuildingManager to AutoPlay state
        const purchaseInfo = this.purchaseManager.getPurchaseInfo();
        if (purchaseInfo) {
            this.state.nextPurchase = purchaseInfo.name;
            this.state.nextPurchaseType = purchaseInfo.type;
            this.state.nextPurchasePP = purchaseInfo.pp;
            this.state.nextPurchasePrice = purchaseInfo.price;
        }
        else {
            this.state.nextPurchase = null;
            this.state.nextPurchaseType = null;
            this.state.nextPurchasePP = null;
            this.state.nextPurchasePrice = null;
        }
    }
    /**
     * Check if an upgrade should be avoided
     * (Moved to BuildingManager.shouldAvoidBuy())
     */
    // @ts-ignore TS6133 - Legacy method, kept for reference
    avoidBuy(upgrade) {
        const Game = globalThis.Game;
        switch (upgrade.id) {
            case 71: // One mind
            case 73: // Communal brainsweep
                return Game.Achievements['Elder nap'].won &&
                    Game.Achievements['Grandmapocalypse'].won &&
                    Game.Achievements['Elder slumber'].won &&
                    Game.Achievements['Elder calm'].won;
            case 74: // Elder Pledge
                return Game.Achievements['Elder nap'].won &&
                    Game.Achievements['Elder slumber'].won &&
                    Game.Upgrades['Elder Covenant'].unlocked;
            case 84: // Elder Covenant
                return Game.Upgrades['Elder Pledge'].bought ||
                    Game.Achievements['Elder calm'].won;
            case 227: // Chocolate egg
                return true;
            case 563: // Shimmering veil
                return this.state.nextAchievement !== 432 ||
                    Game.Achievements['Thick-skinned'].won;
            default:
                return upgrade.pool === 'toggle';
        }
    }
    /**
     * Handle speed minigames - grimoire spells
     * Runs in high-activity phase
     */
    handleSpeedMinigames() {
        const Game = globalThis.Game;
        // Update grimoire state
        this.grimoireManager.updateState(this.sugarLumpManager.getCanUseLumps(), Game.cookiesPs / Game.unbuffedCps);
        // Cast grimoire spells
        this.grimoireManager.handleGrimoires();
    }
    /**
     * Handle periodic minigames - garden, pantheon, stock market
     * Runs every 15 seconds
     */
    handleMinigames() {
        const Game = globalThis.Game;
        if (Game.ascensionMode === 1)
            return; // No minigames in born again mode
        // Update pantheon state
        this.pantheonManager.updateState(this.state.now, this.state.poppingWrinklers, this.sugarLumpManager.isCheatLumps());
        // Handle pantheon spirit assignments
        this.pantheonManager.handlePantheon();
        // Update garden state
        this.gardenManager.updateState({
            now: this.state.now,
            cpsMult: Game.cookiesPs / Game.unbuffedCps,
            wantAscend: this.state.wantAscend,
            savingsGoal: this.config.savingsGoal,
            canUseLumps: this.sugarLumpManager.getCanUseLumps(),
            finished: this.state.finished,
            lumpRelatedAchievements: [...gameIds_LUMP_RELATED_ACHIEVEMENTS],
            poppingWrinklers: this.state.poppingWrinklers,
            grindingCheat: this.grindingCheat(),
            cheatGolden: this.config.cheatGolden,
        });
        // Handle garden planting and harvesting
        this.gardenManager.handleGarden();
        // Update plantPending state from garden
        this.state.plantPending = this.gardenManager.isPlantPending();
        // Update stock market state
        this.stockMarketManager.updateState({
            resetTime: this.state.resetTime || this.state.now,
            wantAscend: this.state.wantAscend,
            plantPending: this.state.plantPending,
        });
        // Handle stock market trading
        this.stockMarketManager.handleStockMarket();
    }
    /**
     * Handle notes - extend lifetime of game notifications
     */
    handleNotes() {
        const Game = globalThis.Game;
        for (const i in Game.Notes) {
            if (Game.Notes[i].quick === 0) {
                Game.Notes[i].life = 2000 * Game.fps;
                Game.Notes[i].quick = 1;
            }
        }
    }
    /**
     * Status check - calculate missing achievements/upgrades/lumps
     */
    status(_print = true) {
        const Game = globalThis.Game;
        let ach = 0;
        let sach = 0;
        let up = 0;
        let lum = 0;
        const nonUp = [71, 72, 73, 87, 227];
        // Count missing achievements
        for (const a in Game.Achievements) {
            const me = Game.Achievements[a];
            if (!me.won && me.pool !== 'dungeon') {
                if (me.pool === 'shadow')
                    sach++;
                ach++;
            }
        }
        // Count missing upgrades
        for (const i in Game.Upgrades) {
            const me = Game.Upgrades[i];
            if (!me.bought && me.pool !== 'debug' && me.pool !== 'toggle') {
                if (Game.resets && nonUp.includes(me.id))
                    continue;
                up++;
            }
        }
        // Count missing lumps for building levels
        for (const o in Game.Objects) {
            const me = Game.Objects[o];
            let maxl = 10;
            let myl = 0;
            if (me.id === 0)
                maxl = 12; // Cursors need level 12
            for (let l = me.level + 1; l <= maxl; l++) {
                myl += l;
            }
            lum += myl;
        }
        lum -= Game.lumps;
        if (lum < 0)
            lum = 0;
        // Store status info for dashboard
        this.state.statusInfo = {
            achievements: ach,
            shadowAchievements: sach,
            upgrades: up,
            lumps: lum,
        };
    }
    /**
     * Set deadline to earlier time if needed
     */
    setDeadline(d) {
        if (this.state.deadline > d) {
            this.state.deadline = d;
        }
    }
    /**
     * Check if we're in the endgame phase
     *
     * Returns true when the next achievement is NOT in the wanted list,
     * meaning we've completed all critical path achievements.
     *
     * Original: AutoPlay.endPhase()
     */
    endPhase() {
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        return wantedAchievements.indexOf(this.state.nextAchievement) < 0;
    }
    /**
     * Check if we're in grinding mode (working on final achievements)
     *
     * Grinding mode activates when we've completed all but the last 10 achievements.
     * During grinding, the bot:
     * - Does not sleep at night (stays active 24/7)
     * - Focuses on maximizing cookie production
     *
     * Original: AutoPlay.grinding()
     * @public - Used by NightMode to determine if bot should sleep
     */
    grinding() {
        const Game = globalThis.Game;
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        // Get achievement that starts grinding (10th from end)
        const grindingStart = wantedAchievements[wantedAchievements.length - 10];
        // If we've achieved the grinding start achievement
        if (Game.AchievementsById[grindingStart].won) {
            // And we're not yet in endPhase
            if (!this.endPhase()) {
                Logger.addActivity('Grinding cookies - do not sleep at night.');
                return true;
            }
        }
        return false;
    }
    /**
     * Check if we're in cheating/aggressive mode (working on final 5 achievements)
     *
     * Cheating mode activates when we've completed all but the last 8 achievements.
     * During cheating, the bot uses aggressive golden cookie tactics.
     *
     * Original: AutoPlay.grindingCheat()
     * @public - Used by GoldenCookieHandler for aggressive tactics
     */
    grindingCheat() {
        if (!this.grinding())
            return false;
        const Game = globalThis.Game;
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        // Get achievement that starts cheating (8th from end)
        const cheatingStart = wantedAchievements[wantedAchievements.length - 8];
        // If we've achieved the cheating start achievement
        if (Game.AchievementsById[cheatingStart].won) {
            return true;
        }
        return false;
    }
    /**
     * Run Just Right achievement special logic
     *
     * Achievement #397 "Just Right" requires:
     * - Exactly 1 trillion (10^12) cookies baked
     * - Specific building counts (each type has 10 more than the next)
     *
     * This is a multi-phase process:
     * 1. Build up to ~100B cookies with buildings/upgrades
     * 2. Sell buildings to reach exact cookie count
     * 3. Fine-tune by clicking or buying cursors
     * 4. Ascend when exact count reached
     *
     * Original: AutoPlay.runJustRight() (lines 172-223)
     */
    runJustRight() {
        const Game = globalThis.Game;
        // Don't let savings interfere with this achievement
        this.config.savingsGoal = 0;
        Logger.addActivity('Running just right.');
        // Handle ascension checks
        this.ascensionManager.handleAscend();
        // Sync wantAscend state from ascension manager context
        this.state.wantAscend = this.ascensionManager.context.wantAscend;
        // If "You" building exists, we need to start fresh
        const youBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
        if (youBuilding && youBuilding.amount) {
            this.ascensionManager.triggerAscend('Starting to ascend just right properly.');
            return;
        }
        const goal = 1000000000000; // 1 trillion exact
        const notBuy = [0, 1, 2, 3, 4, 5, 6, 129, 324]; // Upgrades to avoid
        // Phase 1: Build up phase (< 100B cookies)
        if (Game.cookies < goal / 10) {
            // Buy buildings (each type should have 10 more than the next)
            for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
                const building = Game.ObjectsById[i];
                const nextBuilding = Game.ObjectsById[i + 1];
                const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);
                if (building.getPrice() < Game.cookies && building.amount < targetAmount) {
                    building.buy(1);
                    return;
                }
            }
            // Buy upgrades (except blocked ones)
            for (const upgradeId in Game.UpgradesById) {
                const upgrade = Game.UpgradesById[upgradeId];
                if (upgrade.unlocked &&
                    !upgrade.bought &&
                    upgrade.canBuy() &&
                    upgrade.pool !== 'toggle' &&
                    notBuy.indexOf(upgrade.id) < 0) {
                    upgrade.buy(true);
                }
            }
        }
        else {
            // Phase 2: Precision phase (>= 100B cookies)
            const cookieDiff = goal - Game.cookies;
            if (Game.BuildingsOwned === 0) {
                // Phase 2a: All buildings sold - fine-tune cookie count
                if (cookieDiff < 0) {
                    // Overshot - increment counter for cursor adjustment
                    if (!this.state.runRightCount)
                        this.state.runRightCount = 0;
                    this.state.runRightCount++;
                }
                if (Math.round(Game.cookiesd) === goal) {
                    // Perfect! Ascend with success
                    this.ascensionManager.triggerAscend('Fixed run just right.');
                }
                else if (cookieDiff < -goal && this.state.now - Game.startDate > 60000) {
                    // Too far off after 1 minute - retry
                    this.ascensionManager.triggerAscend('ascend just right did not work, retry.');
                }
                else if (cookieDiff < -2000000000) {
                    // Way over - buy many cursors to burn cookies
                    Game.ObjectsById[0].buy(130 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < -6000000) {
                    // Over by 6M - buy cursors
                    Game.ObjectsById[0].buy(90 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < -30000) {
                    // Over by 30k - buy cursors
                    Game.ObjectsById[0].buy(50 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < 0) {
                    // Slightly over - buy few cursors
                    Game.ObjectsById[0].buy(22 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff > 10000000) {
                    // Need >10M - buy bank
                    Game.ObjectsById[5].buy(1);
                }
                else if (cookieDiff > 500000) {
                    // Need >500k - buy factory
                    Game.ObjectsById[4].buy(1);
                }
                else if (cookieDiff > 5000) {
                    // Need >5k - buy farm
                    Game.ObjectsById[2].buy(1);
                }
                else if (cookieDiff > 50) {
                    // Need >50 - buy cursor
                    Game.ObjectsById[0].buy(1);
                }
                else {
                    // Very close - just click
                    Game.ClickCookie();
                }
            }
            else {
                // Phase 2b: Still have buildings - sell them off
                if (cookieDiff / Game.cookiesPs > 1000) {
                    // Need more cookies first - buy a bank
                    Game.ObjectsById[5].buy(1);
                }
                // Sell excess buildings (keep 10 more than next type)
                for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
                    const building = Game.ObjectsById[i];
                    const nextBuilding = Game.ObjectsById[i + 1];
                    const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);
                    if (building.amount > targetAmount) {
                        building.sell(building.amount - targetAmount);
                        return;
                    }
                    // Sell buildings if their value would overshoot goal
                    if (building.amount > 0 &&
                        4 * building.getReverseSumPrice(building.amount) + Game.cookiesPs > cookieDiff) {
                        building.sell(100);
                    }
                }
            }
        }
    }
    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        try {
            const saved = localStorage.getItem('CookieBot_Config');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.config = { ...this.config, ...parsed };
                console.log('Configuration loaded from localStorage');
            }
        }
        catch (error) {
            console.error('Failed to load configuration:', error);
        }
    }
    /**
     * Save configuration to localStorage
     */
    saveConfig() {
        try {
            localStorage.setItem('CookieBot_Config', JSON.stringify(this.config));
            console.log('Configuration saved to localStorage');
        }
        catch (error) {
            console.error('Failed to save configuration:', error);
        }
    }
    /**
     * Get default configuration
     */
    getDefaultConfig() {
        return {
            nightMode: false,
            fontSize: 12,
            menuPos: [0, 0],
            autoGoldenCookie: true,
            autoReindeer: true,
            autoFrenzy: true,
            autoClickingFrenzy: true,
            autoElderFrenzy: false,
            autoSeason: true,
            autoAscend: false,
            autoSugarLumps: true,
            autoWrinklers: true,
            clickMode: 1, // 0=off, 1=normal, 2+=aggressive
            cheatLumps: 0, // 0=off, 1=auto, 2-4=manual levels
            cheatGolden: 0, // 0=off, 1=auto, 2+=manual levels
            buyMode: 'pp',
            minCookieBank: 0,
            savingsGoal: 0,
            savingsEnabled: true,
            SavingStrategy: 0, // 0=NONE, 1=AUTO, 2=LUCKY, 3=LUCKY_FRENZY
            seasonOrder: ['christmas', 'valentines', 'easter', 'halloween'],
            currentSeasonIndex: 0,
        };
    }
    /**
     * Get default state
     */
    getDefaultState() {
        const now = Date.now();
        return {
            version: AutoPlay_AutoPlay.version,
            now: now,
            lastCheck: 0,
            timeToNextBuy: 0,
            delay: 0,
            deadline: now + 15000, // Start with 15s deadline
            hyperActive: false,
            nextAchievement: 0,
            workingOnSpecialAchievement: false,
            plantPending: false,
            nextPurchase: null,
            nextPurchaseType: null,
            nextPurchasePP: null,
            nextPurchasePrice: null,
            buy10: false,
            onAscend: false,
            savingsStart: now,
            savingsFraction: 0,
            mainActivity: 'Doing nothing in particular.',
            activities: 'Doing nothing in particular.',
            menuVisible: false,
            nextWrinkler: -1,
            poppingWrinklers: false,
            wrinklerTime: now,
            wantAscend: false,
            finished: false,
            isInitialized: false,
        };
    }
    /**
     * Toggle dashboard visibility
     */
    toggleDashboard() {
        this.state.menuVisible = !this.state.menuVisible;
        this.dashboard.toggle();
    }
    /**
     * Toggle night mode
     */
    toggleNightMode() {
        this.nightMode.toggle();
        this.config.nightMode = !this.config.nightMode;
        this.saveConfig();
    }
    /**
     * Get current configuration (for external access)
     */
    getConfig() {
        return this.config;
    }
    /**
     * Update configuration (for external access)
     */
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        this.saveConfig();
    }
    /**
     * Get current state (for external access)
     */
    getState() {
        return this.state;
    }
}
// Version
AutoPlay_AutoPlay.version = '2.052-8';
/* harmony default export */ const src_AutoPlay = (AutoPlay_AutoPlay);

;// ./src/index.ts
/**
 * CookieBot - Automated Cookie Clicker Bot
 * Entry point for the application
 */

// Export AutoPlay class as default for webpack
/* harmony default export */ const src = ((/* unused pure expression or super */ null && (AutoPlay)));
// Auto-initialize when loaded and expose instance globally
if (typeof Game !== 'undefined' && Game.ready) {
    const bot = new src_AutoPlay();
    globalThis.AutoPlay = bot;
    bot.init();
}
else {
    console.log('CookieBot: Waiting for Cookie Clicker to be ready...');
    const checkReady = setInterval(() => {
        if (typeof Game !== 'undefined' && Game.ready) {
            clearInterval(checkReady);
            const bot = new src_AutoPlay();
            globalThis.AutoPlay = bot;
            bot.init();
        }
    }, 1000);
}

/******/ })()
;