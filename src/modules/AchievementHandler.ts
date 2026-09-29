/**
 * Handles achievement hunting (small achievements, ascension-related)
 */

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { BUILDING_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;
declare const l: (id: string) => HTMLElement | null;

export class AchievementHandler {
  private context: AutoPlayContext;
  private lastPromptTime: number = 0;
  private originalBakeryName: string = '';

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Safely confirm a prompt, handling cases where the game loop might be paused
   */
  private safeConfirm(): void {
    // Try synchronous confirm first (works if game is not paused)
    Game.ConfirmPrompt();

    // Fallback to async confirm (works if game loop is paused by the prompt)
    setTimeout(() => {
      if (Game.promptOn) {
        Game.ConfirmPrompt();
      }
    }, 100);

    this.lastPromptTime = Date.now();
  }

  /**
   * Handle small achievements that can be obtained through simple interactions
   */
  handleSmallAchievements(): void {
    // Throttle prompts to prevent spamming
    if (Date.now() - this.lastPromptTime < 2000) return;

    // Tabloid addiction - click news ticker 50 times
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.TABLOID_ADDICTION].won) {
      for (let i = 0; i < 50; i++) {
        Game.tickerL.click();
      }
    }

    // Here you go - click the achievement itself
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.HERE_YOU_GO].won) {
      Game.AchievementsById[ACHIEVEMENT_IDS.HERE_YOU_GO].click();
    }

    // Tiny cookie - click the tiny cookie
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.TINY_COOKIE].won) {
      Game.ClickTinyCookie();
    }

    // God complex - name bakery "Orteil"
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.GOD_COMPLEX].won) {
      if (Game.promptOn) return; // Wait for any existing prompt

      if (Game.bakeryName !== 'Orteil') {
        this.originalBakeryName = Game.bakeryName;
        Game.bakeryName = 'Orteil';
        Game.bakeryNamePrompt();
        this.safeConfirm();
        return; // Wait for next tick/prompt close
      }
    } else if (this.originalBakeryName && Game.bakeryName === 'Orteil') {
      // Restore name after getting the achievement
      if (Game.promptOn) return;
      Game.bakeryName = this.originalBakeryName;
      Game.bakeryNamePrompt();
      this.safeConfirm();
      this.originalBakeryName = '';
      return;
    }

    // What's in a name - add robot name to bakery name
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.WHATS_IN_A_NAME].won) {
      if (Game.promptOn) return;
      Game.bakeryName = this.context.robotName + Game.bakeryName;
      Game.bakeryNamePrompt();
      this.safeConfirm();
      return;
    }

    // Remove robot name if it's still there
    if (Game.bakeryName.slice(0, this.context.robotName.length) === this.context.robotName) {
      if (Game.promptOn) return;
      Game.bakeryName = Game.bakeryName.slice(this.context.robotName.length);
      Game.bakeryNamePrompt();
      this.safeConfirm();
      return;
    }

    // Cheated cookies taste awful - get this after all other achievements
    if (this.context.endPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.CHEATED_COOKIES_TASTE_AWFUL].won) {
      Game.Win('Cheated cookies taste awful');
    }

    // Third-party - using a third-party tool
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.THIRDPARTY].won) {
      Game.Win('Third-party');
    }

    // Olden days - find the forgotten madeleine
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.OLDEN_DAYS].won) {
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
      this.context.info('found the forgotten madeleine at the very bottom of the "Info" menu');
    }

    // Cookie-dunker - dunk the cookie in milk
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.COOKIEDUNKER].won && Game.milkProgress > 1 && Game.milkHd > 0.34) {
      if (this.context.backupHeight) {
        Game.LeftBackground.canvas.height = this.context.backupHeight;
        this.context.backupHeight = 0;
      } else {
        this.context.backupHeight = Game.LeftBackground.canvas.height;
        Game.LeftBackground.canvas.height = 400;
        setTimeout(() => this.undunkCookie(), 20 * 1000);
      }
    }

    // Stifling the press - mute the news ticker
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.STIFLING_THE_PRESS].won) {
      const savedNarrowSize = Game.tickerTooNarrow;
      Game.tickerTooNarrow = Game.windowW + 10;
      Game.tickerL.click();
      Game.tickerTooNarrow = savedNarrowSize;
    }

    // No time like the present - send and redeem a gift
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.NO_TIME_LIKE_THE_PRESENT].won &&
        Game.Has('Wrapping paper') && !Game.hasBuff('Gifted out') &&
      !this.context.wantAscend && !Game.OnAscend && !this.isRapidAscending()) {
      if (!this.context.giftCode) {
        Game.promptGiftSend();
        const giftAmountEl = l('giftAmount') as HTMLInputElement;
        const giftMessageEl = l('giftMessage') as HTMLTextAreaElement;
        const giftCodeEl = l('giftCode') as HTMLInputElement;
        const confirmBtn = l('promptOption0');

        if (giftAmountEl && giftMessageEl && giftCodeEl && confirmBtn) {
          giftAmountEl.value = '42';
          giftMessageEl.value = 'A gift for myself';
          confirmBtn.click();
          this.context.giftCode = giftCodeEl.value;
          confirmBtn.click();
          this.context.info('Created present with code ' + this.context.giftCode);
          setTimeout(() => this.redeemPresent(), 61 * 60 * 1000); // wait an hour
        }
      } else {
        Game.promptGiftRedeem();
        const giftCodeEl = l('giftCode') as HTMLInputElement;
        const confirmBtn = l('promptOption0');

        if (giftCodeEl && confirmBtn) {
          giftCodeEl.value = String(this.context.giftCode);
          this.context.giftCode = 0;
          confirmBtn.click();
        }
      }
    }

    // In her likeness - customize the You building
    // Only after player has at least one You building (fixes issue #97)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.IN_HER_LIKENESS].won && Game.ObjectsById[BUILDING_IDS.YOU].amount > 0) {
      Game.YouCustomizer.load('9,6,-,3,-,0,3', true);
      // This is already correct, but we need to trigger the change
      Game.YouCustomizer.offsetGene('head', -1);
    }
  }

  /**
   * Undunk the cookie after getting the achievement
   */
  private undunkCookie(): void {
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.COOKIEDUNKER].won) {
      setTimeout(() => this.undunkCookie(), 20 * 1000);
      return;
    }
    Game.LeftBackground.canvas.height = this.context.backupHeight;
    this.context.backupHeight = 0;
  }

  /**
   * Redeem a previously sent gift
   */
  private redeemPresent(): void {
    this.context.info('Redeeming present with code ' + this.context.giftCode);
    if (this.context.giftCode) {
      Game.promptGiftRedeem();
      const giftCodeEl = l('giftCode') as HTMLInputElement;
      const confirmBtn = l('promptOption0');

      if (giftCodeEl && confirmBtn) {
        giftCodeEl.value = String(this.context.giftCode);
        this.context.giftCode = 0;
        confirmBtn.click(); // redeem
        confirmBtn.click(); // close window
      }
    }
  }

  /**
   * Find the next achievement to pursue
   */
  findNextAchievement(): void {
    this.context.wantAscend = false;
    this.handleSmallAchievements();

    for (let i = 0; i < this.context.wantedAchievements.length; i++) {
      if (!Game.AchievementsById[this.context.wantedAchievements[i]].won) {
        this.context.nextAchievement = this.context.wantedAchievements[i];
        this.context.setMainActivity(
          'Trying to get achievement: ' +
          Game.AchievementsById[this.context.nextAchievement].ddesc.replace(/<q>.*?<\/q>/ig, '')
        );
        return;
      }
    }

    this.checkAllAchievementsOK();
  }

  /**
   * Check if all achievements have been obtained
   */
  checkAllAchievementsOK(): boolean {
    // Check regular achievements (excluding dungeon and one-year legacy)
    for (const key in Game.Achievements) {
      const achievement = Game.Achievements[key];
      if (!achievement.won &&
          achievement.pool !== 'dungeon' &&
          achievement.id !== 367 &&
        !this.context.lateAchievements.includes(achievement.id)) {
        this.context.setMainActivity(
          'Missing achievement #' + achievement.id + ': ' +
          achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
          ', try to get it now.'
        );
        this.context.nextAchievement = achievement.id;
        return false;
      }
    }

    // Check late achievements
    for (const achievementId of this.context.lateAchievements) {
      const achievement = Game.AchievementsById[achievementId];
      if (!achievement.won && achievement.pool !== 'dungeon' && achievement.id !== 367) {
        this.context.setMainActivity(
          'Missing achievement #' + achievement.id + ': ' +
          achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
          ', try to get it now.'
        );
        this.context.nextAchievement = achievement.id;
        return false;
      }
    }

    // Check prestige upgrades
    for (const key in Game.Upgrades) {
      const upgrade = Game.Upgrades[key];
      if (upgrade.pool === 'prestige' && !upgrade.bought) {
        this.context.nextAchievement = 99; // Follow the white rabbit (from dungeons)
        this.context.setMainActivity(
          'Prestige upgrade ' + upgrade.name + ' is missing, waiting to buy it.'
        );
        return false;
      }
    }

    // Wait for one-year legacy achievement
    if (!Game.Achievements['So much to do so much to see'].won) {
      const achievement = Game.Achievements['So much to do so much to see'];
      this.context.setMainActivity(
        'Missing achievement #' + achievement.id + ': ' +
        achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
        ', try to get it now.'
      );
      this.context.nextAchievement = achievement.id;
      return false;
    }

    // All achievements complete!
    this.context.finished = true;
    this.context.setMainActivity(
      'My job is done here, have a nice day. I am still idling along.'
    );
    this.context.nextAchievement = 99; // Follow the white rabbit (from dungeons)
    return true;
  }

  /**
   * Main handler called periodically
   */
  handleAchievements(): void {
    // Find next achievement if current one is complete
    if (Game.AchievementsById[this.context.nextAchievement].won) {
      this.findNextAchievement();
    }
  }

  /**
   * Check if we are in a rapid ascension mode (Endless Cycle or Reincarnation)
   */
  private isRapidAscending(): boolean {
    // Check if we are going for Endless Cycle (1000 ascensions)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.ENDLESS_CYCLE].won) {
      return true;
    }
    // Check if we are going for Reincarnation (100 ascensions)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.REINCARNATION].won) {
      return true;
    }
    return false;
  }

  /**
   * Get achievement handler status
   */
  getStatus(): ModuleStatus {
    if (this.context.finished) {
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

    const achievement = Game.AchievementsById[this.context.nextAchievement];
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
    const wonCount = Object.values(Game.Achievements).filter((a: any) => a.won).length;

    // Track progress for "bake X cookies" achievements
    let progress: { current: number; target: number; percent: number; label: string } | undefined;
    let timeRemaining: number | undefined;
    let progressColor: string | undefined;

    // Check for "bake X cookies in one ascension" achievements by pattern matching
    // Format: "Bake <b>1</b> cookie in one ascension." or "Bake <b>1 million</b> cookies in one ascension."
    const bakeCookiesMatch = achievement.ddesc.match(/bake <b>([\d,\.]+(?:\s+\w+)?)\s*<\/b>\s+cookies?\s+in one ascension\./i);
    if (bakeCookiesMatch) {
      // Parse the cookie threshold (handles numbers like "1 million", "1.5 billion", etc.)
      let cookieThreshold = 0;
      const valueStr = bakeCookiesMatch[1].trim();

      // Try to extract from Game.AchievementsById threshold if available
      if (achievement.threshold) {
        cookieThreshold = achievement.threshold;
      } else {
        // Fallback: parse the text (handles "1,000" or "1 million" or "1 septendecillion")
        const numMatch = valueStr.match(/^([\d,\.]+)/);
        if (numMatch) {
          cookieThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
          // Check for multipliers (million, billion, trillion, etc.)
          const lowerValue = valueStr.toLowerCase();
          if (lowerValue.includes('thousand')) cookieThreshold *= 1e3;
          else if (lowerValue.includes('million')) cookieThreshold *= 1e6;
          else if (lowerValue.includes('billion')) cookieThreshold *= 1e9;
          else if (lowerValue.includes('trillion')) cookieThreshold *= 1e12;
          else if (lowerValue.includes('quadrillion')) cookieThreshold *= 1e15;
          else if (lowerValue.includes('quintillion')) cookieThreshold *= 1e18;
          else if (lowerValue.includes('sextillion')) cookieThreshold *= 1e21;
          else if (lowerValue.includes('septillion')) cookieThreshold *= 1e24;
          else if (lowerValue.includes('octillion')) cookieThreshold *= 1e27;
          else if (lowerValue.includes('nonillion')) cookieThreshold *= 1e30;
          else if (lowerValue.includes('decillion')) cookieThreshold *= 1e33;
          else if (lowerValue.includes('undecillion')) cookieThreshold *= 1e36;
          else if (lowerValue.includes('duodecillion')) cookieThreshold *= 1e39;
          else if (lowerValue.includes('tredecillion')) cookieThreshold *= 1e42;
          else if (lowerValue.includes('quattuordecillion')) cookieThreshold *= 1e45;
          else if (lowerValue.includes('quindecillion')) cookieThreshold *= 1e48;
          else if (lowerValue.includes('sexdecillion')) cookieThreshold *= 1e51;
          else if (lowerValue.includes('septendecillion')) cookieThreshold *= 1e54;
          else if (lowerValue.includes('octodecillion')) cookieThreshold *= 1e57;
          else if (lowerValue.includes('novemdecillion')) cookieThreshold *= 1e60;
          else if (lowerValue.includes('vigintillion')) cookieThreshold *= 1e63;
        }
      }

      if (cookieThreshold > 0) {
        const currentCookies = Game.cookiesEarned;
        const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
        progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');

        progress = {
          current: currentCookies,
          target: cookieThreshold,
          percent: progressPercent,
          label: 'Cookies Baked'
        };

        // Calculate time remaining
        if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
          const remaining = cookieThreshold - currentCookies;
          timeRemaining = (remaining / Game.cookiesPs) * 1000; // Convert to milliseconds
        }
      }
    }
    // Check for "have X [building]" achievements
    // Format: "Have <b>1 cursor</b>." or "Have <b>100 cursors</b>."
    else if (achievement.ddesc.match(/have <b>[\d,]+\s+\w+?s?<\/b>/i)) {
      const ownMatch = achievement.ddesc.match(/have <b>([\d,]+)\s+(\w+?)s?<\/b>\./i);
      if (ownMatch) {
        const targetCount = parseInt(ownMatch[1].replace(/,/g, ''));
        const buildingName = ownMatch[2];

        // Find the building in Game.Objects
        let currentCount = 0;
        for (const objName in Game.Objects) {
          if (objName.toLowerCase() === buildingName.toLowerCase() ||
              objName.toLowerCase().includes(buildingName.toLowerCase()) ||
              buildingName.toLowerCase().includes(objName.toLowerCase())) {
            currentCount = Game.Objects[objName].amount;
            break;
          }
        }

        const progressPercent = Math.min(100, (currentCount / targetCount) * 100);
        progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');

        progress = {
          current: currentCount,
          target: targetCount,
          percent: progressPercent,
          label: `${buildingName} owned`
        };

        // Calculate time remaining based on CPS and building cost
        if (currentCount < targetCount && Game.cookiesPs > 0) {
          // Rough estimate: calculate cost of remaining buildings
          const building = Object.values(Game.Objects).find((obj: any) =>
            obj.name.toLowerCase().includes(buildingName.toLowerCase())
          ) as any;

          if (building) {
            let totalCost = 0;
            for (let i = currentCount; i < targetCount; i++) {
              totalCost += building.basePrice * Math.pow(building.priceIncrease || 1.15, i);
            }
            const cookiesNeeded = Math.max(0, totalCost - Game.cookies);
            if (cookiesNeeded > 0) {
              timeRemaining = (cookiesNeeded / Game.cookiesPs) * 1000;
            }
          }
        }
      }
    }
    // Check for "make X cookies from clicking" achievements
    // Format: "Make <b>1,000 cookies</b> from clicking."
    else if (achievement.ddesc.match(/make <b>[\d,\.]+(?:\s+\w+)?\s+cookies?<\/b>\s+from clicking\./i)) {
      const clickMatch = achievement.ddesc.match(/make <b>([\d,\.]+(?:\s+\w+)?)\s+cookies?<\/b>\s+from clicking\./i);
      if (clickMatch) {
        let cookieThreshold = 0;
        const valueStr = clickMatch[1].trim();

        // Try to extract from achievement threshold if available
        if (achievement.threshold) {
          cookieThreshold = achievement.threshold;
        } else {
          // Parse the text
          const numMatch = valueStr.match(/^([\d,\.]+)/);
          if (numMatch) {
            cookieThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
            const lowerValue = valueStr.toLowerCase();
            if (lowerValue.includes('thousand')) cookieThreshold *= 1e3;
            else if (lowerValue.includes('million')) cookieThreshold *= 1e6;
            else if (lowerValue.includes('billion')) cookieThreshold *= 1e9;
            else if (lowerValue.includes('trillion')) cookieThreshold *= 1e12;
          }
        }

        if (cookieThreshold > 0) {
          // Game.handmadeCookies tracks cookies made from clicking
          const currentClicks = Game.handmadeCookies || 0;
          const progressPercent = Math.min(100, (currentClicks / cookieThreshold) * 100);
          progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');

          progress = {
            current: currentClicks,
            target: cookieThreshold,
            percent: progressPercent,
            label: 'Cookies from clicking'
          };

          // Calculate time remaining (rough estimate based on current click rate)
          if (currentClicks < cookieThreshold) {
            // Estimate: if bot is clicking, use cookiesPerClick * clicksPerSecond
            const cookiesPerClick = Game.computedMouseCps || 1;
            const clicksPerSecond = 10; // Rough estimate for bot clicking
            const clickCps = cookiesPerClick * clicksPerSecond;
            if (clickCps > 0) {
              const remaining = cookieThreshold - currentClicks;
              timeRemaining = (remaining / clickCps) * 1000;
            }
          }
        }
      }
    }
    // Check for "bake X cookies per second" achievements
    // Format: "Bake <b>1</b> cookie per second." or "Bake <b>1,000</b> cookies per second."
    else if (achievement.ddesc.match(/bake <b>[\d,\.]+(?:\s+\w+)?\s*<\/b>\s+cookies?\s+per second\./i)) {
      const cpsMatch = achievement.ddesc.match(/bake <b>([\d,\.]+(?:\s+\w+)?)\s*<\/b>\s+cookies?\s+per second\./i);
      if (cpsMatch) {
        let cpsThreshold = 0;
        const valueStr = cpsMatch[1].trim();

        // Try to extract from achievement threshold if available
        if (achievement.threshold) {
          cpsThreshold = achievement.threshold;
        } else {
          // Parse the text
          const numMatch = valueStr.match(/^([\d,\.]+)/);
          if (numMatch) {
            cpsThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
            const lowerValue = valueStr.toLowerCase();
            if (lowerValue.includes('thousand')) cpsThreshold *= 1e3;
            else if (lowerValue.includes('million')) cpsThreshold *= 1e6;
            else if (lowerValue.includes('billion')) cpsThreshold *= 1e9;
            else if (lowerValue.includes('trillion')) cpsThreshold *= 1e12;
            else if (lowerValue.includes('quadrillion')) cpsThreshold *= 1e15;
            else if (lowerValue.includes('quintillion')) cpsThreshold *= 1e18;
            else if (lowerValue.includes('sextillion')) cpsThreshold *= 1e21;
            else if (lowerValue.includes('septillion')) cpsThreshold *= 1e24;
          }
        }

        if (cpsThreshold > 0) {
          const currentCps = Game.cookiesPs;
          const progressPercent = Math.min(100, (currentCps / cpsThreshold) * 100);
          progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');

          progress = {
            current: currentCps,
            target: cpsThreshold,
            percent: progressPercent,
            label: 'Cookies per second'
          };

          // Time remaining: CPS increases over time with purchases
          // For now, we can't easily predict when we'll hit the target CPS
          // So we'll show progress but no time estimate
          timeRemaining = undefined;
        }
      }
    }
    // Special achievements (Hardcore, Neverclick, True Neverclick)
    else if (achievement.id === 38 || achievement.id === 39 || achievement.id === 203) {
      // Hardcore (38), Neverclick (39), True Neverclick (203)
      const isHardcore = achievement.id === 38;
      const isNeverclick = achievement.id === 39;
      const isTrueNeverclick = achievement.id === 203;

      if (isHardcore) {
        // "Bake 1 billion cookies with no upgrades purchased"
        const cookieThreshold = 1000000000;
        const currentCookies = Game.cookiesEarned;
        const upgradesCheck = Game.UpgradesOwned === 0;

        const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
        progressColor = upgradesCheck ? (progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6')) : '#f66';

        progress = {
          current: currentCookies,
          target: cookieThreshold,
          percent: progressPercent,
          label: 'Cookies (No upgrades)'
        };

        if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
          const remaining = cookieThreshold - currentCookies;
          timeRemaining = (remaining / Game.cookiesPs) * 1000;
        }
      } else if (isNeverclick || isTrueNeverclick) {
        // Track cookie progress for Neverclick achievements
        const cookieThreshold = 1000000; // Neverclick threshold
        const currentCookies = Game.cookiesEarned;

        const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
        progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');

        progress = {
          current: currentCookies,
          target: cookieThreshold,
          percent: progressPercent,
          label: isNeverclick ? 'Cookies (≤15 clicks)' : 'Cookies (0 clicks)'
        };

        if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
          const remaining = cookieThreshold - currentCookies;
          timeRemaining = (remaining / Game.cookiesPs) * 1000;
        }
      }
    }

    return {
      module: 'Achievements',
      status: 'active',
      currentAction: `Working on: ${achievement.name}`,
      reason: achievement.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '').substring(0, 50),
      nextAction: this.context.grinding() ? 'Grinding mode (no sleep)' : undefined,
      icon: '🏆',
      progress,
      timeRemaining,
      progressColor,
      details: {
        'Current': achievement.name,
        'Progress': `${wonCount}/${totalAchievements}`,
        'Grinding': this.context.grinding(),
        'Cheating': this.context.grindingCheat()
      }
    };
  }
}
