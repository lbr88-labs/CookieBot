import type { AutoPlayContext } from '../types/autoplay';
import { UPGRADE_IDS } from '../constants/gameIds';

declare const Game: any;
declare const Beautify: (num: number) => string;

export class SavingsManager {
  private savingsGoal: number = 0;
  private savingsStart: number = 0;
  private context: AutoPlayContext;
  private now: number = 0;

  // Constants for AUTO savings strategy
  private readonly START_TIME = 30 * 60 * 1000;  // 30 minutes before starting to save
  private readonly TARGET_TIME = 400 * 60 * 1000; // 400 minutes to reach target amount

  // Reserve multipliers
  private readonly LUCKY_MULTIPLIER = 100;        // 100 minutes of CPS
  private readonly FRENZY_MULTIPLIER = 7;         // 7x for Lucky Frenzy

  constructor(context: AutoPlayContext) {
    this.context = context;
    this.savingsStart = Game.startDate;
    this.now = Game.startDate; // Initialize to start time to avoid 0-value bug

    // Register configuration options
    this.context.configManager.registerOption('SavingStrategy', {
      id: 'SavingStrategy',
      type: 'select',
      label: 'Saving Strategy',
      options: [
        { value: 0, label: 'NONE (Spend everything)' },
        { value: 1, label: 'AUTO (Smart ramp-up)' },
        { value: 2, label: 'LUCKY (Keep Lucky bank)' },
        { value: 3, label: 'LUCKY FRENZY (Keep Lucky Frenzy bank)' }
      ],
      default: 1,
      desc: 'How much cookies the bot keeps in reserve for golden cookie rewards.'
    }, 1, 'Strategy');
  }

  /**
   * Get current saving strategy (from live config)
   */
  private getSavingStrategy(): number {
    return this.context.Config.SavingStrategy ?? 1;
  }

  /**
   * Initialize savings tracking (called on ascension)
   */
  initializeSavings(currentTime: number): void {
    this.savingsStart = currentTime;
    this.now = currentTime;
  }

  /**
   * Update current time (called each game loop)
   */
  setCurrentTime(currentTime: number): void {
    this.now = currentTime;
  }

  /**
   * Main savings calculation logic
   * Migrated from AutoPlay.handleSavings (line 388-448 in cookieAutoPlayBeta.js)
   */
  handleSavings(): void {
    // Do not save in reborn mode
    if (Game.ascensionMode === 1) {
      this.savingsGoal = 0;
      return;
    }

    const strategy = this.getSavingStrategy();

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
      this.context.logStatus('reserve:startup', 'No reserve yet (startup period)');
      return;
    }

    // Wait for golden cookie upgrades before saving
    // Upgrade IDs: 52 (Lucky day), 53 (Serendipity)
    if (Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY].bought && Game.UpgradesById[UPGRADE_IDS.SERENDIPITY].bought) {
      this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
    } else {
      this.savingsGoal = 0;
      this.context.logStatus('reserve:waiting-upgrades', 'Waiting for golden cookie upgrades');
      return;
    }

    // Upgrade to Lucky Frenzy if "Get lucky" upgrade is bought
    // Upgrade ID: 86 (Get lucky)
    if (Game.UpgradesById[UPGRADE_IDS.GET_LUCKY].bought) {
      this.savingsGoal *= this.FRENZY_MULTIPLIER;
    }

    // Scale goal based on elapsed time (linearly ramp up)
    if (elapsedTime < this.TARGET_TIME) {
      this.savingsGoal *= scaling;

      // Calculate actual savings progress (cookies saved vs goal)
      const actualProgress = Math.min(100, (Game.cookies / this.savingsGoal) * 100);
      const progressPct = actualProgress.toFixed(0);

      // Log progress in 10% increments
      this.context.logStatus(
        'reserve:building-' + Math.floor(Number(progressPct) / 10) * 10,
        'Reserve growing: ' + progressPct + '% saved'
      );
    } else {
      this.context.logStatus('reserve:maintaining', 'Reserve at max');
    }

    // Auto-adjustment: if fallen behind savings plan, reset the start time
    const fractionSaved = Game.cookies / this.savingsGoal;

    // Division by zero check: only adjust if scaling > 0
    if (fractionSaved < 0.8 && scaling > 0) {
      // Calculate what the elapsed time SHOULD be to match current savings
      // fractionSaved = Current / Goal = Current / (Base * scaling)
      // We want newScaling such that Current = Base * newScaling
      // So newScaling = Current / Base = fractionSaved * scaling
      // newElapsedTime = newScaling * TARGET_TIME
      this.savingsStart = this.now - this.START_TIME - (this.TARGET_TIME * fractionSaved * scaling);
    }
  }

  /**
   * Get the current savings goal
   */
  getSavingsGoal(): number {
    return this.savingsGoal;
  }

  /**
   * Get the reserve for Lucky cookie (100 minutes of CPS)
   */
  getLuckyReserve(): number {
    return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
  }

  /**
   * Get the reserve for Lucky Frenzy (700 minutes of CPS)
   */
  getLuckyFrenzyReserve(): number {
    return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER * this.FRENZY_MULTIPLIER;
  }

  /**
   * Get available cookies after accounting for savings
   */
  getAvailableCookies(): number {
    return Math.max(0, Game.cookies - this.savingsGoal);
  }

  /**
   * Check if we have enough cookies for a purchase (accounting for savings)
   */
  canAfford(price: number): boolean {
    return price < Game.cookies - this.savingsGoal;
  }

  /**
   * Get status for dashboard display
   */
  getStatus(): any {
    const strategy = this.getSavingStrategy();
    const isActive = this.savingsGoal > 0;

    // Calculate thresholds
    const baseLucky = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
    const baseLuckyFrenzy = baseLucky * this.FRENZY_MULTIPLIER;
    const hasGetLucky = Game.UpgradesById[UPGRADE_IDS.GET_LUCKY] && Game.UpgradesById[UPGRADE_IDS.GET_LUCKY].bought;

    // Check why reserve might be disabled
    let disabledReason = '';
    const elapsedTime = this.now - this.savingsStart - this.START_TIME;

    if (Game.ascensionMode === 1) {
      disabledReason = 'Hardcore Mode';
    } else if (elapsedTime < 0) {
      const minutesRemaining = Math.ceil(Math.abs(elapsedTime) / 60 / 1000);
      disabledReason = `Startup Period (${minutesRemaining}m remaining)`;
    } else if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY]?.bought || !Game.UpgradesById[UPGRADE_IDS.SERENDIPITY]?.bought) {
      const missing = [];
      if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY]?.bought) missing.push('Lucky day');
      if (!Game.UpgradesById[UPGRADE_IDS.SERENDIPITY]?.bought) missing.push('Serendipity');
      disabledReason = `Missing upgrades: ${missing.join(', ')}`;
    }

    // Calculate scaling for AUTO mode
    let scaling = 1;
    if (strategy === 1 && elapsedTime >= 0) {
      scaling = Math.max(0, Math.min(elapsedTime / this.TARGET_TIME, 1));
    }

    const targetLucky = baseLucky * scaling;
    const targetLuckyFrenzy = baseLuckyFrenzy * scaling;

    // Build status object
    const status: any = {
      module: 'Savings',
      status: isActive ? 'active' : 'waiting',
      currentAction: isActive ? 'Reserve Active' : 'Reserve Disabled',
      reason: disabledReason || 'Saving for golden cookies',
      icon: '🍪',
      details: {
        'Strategy': ['NONE', 'AUTO', 'LUCKY', 'LUCKY FRENZY'][strategy] || 'UNKNOWN',
        'Reserve': typeof Beautify !== 'undefined' ? Beautify(this.savingsGoal) : this.savingsGoal.toString()
      }
    };

    // Add progress for Lucky threshold
    if (isActive || Game.unbuffedCps > 0) {
      const luckyPercent = Math.min(100, (Game.cookies / targetLucky) * 100);

      status.progress = {
        current: Game.cookies,
        target: targetLucky,
        percent: luckyPercent,
        label: 'Lucky Reserve'
      };

      status.progressColor = Game.cookies >= targetLucky ? '#6f6' : '#fc6';

      // Add Lucky Frenzy info to details if Get Lucky is unlocked
      if (hasGetLucky) {
        const frenzyPercent = Math.min(100, (Game.cookies / targetLuckyFrenzy) * 100);
        status.details['Lucky Frenzy'] = `${frenzyPercent.toFixed(1)}% (${typeof Beautify !== 'undefined' ? Beautify(targetLuckyFrenzy) : targetLuckyFrenzy.toString()})`;
      }

      // Show scaling progress for AUTO mode
      if (strategy === 1 && scaling < 1) {
        status.details['Ramp Progress'] = `${(scaling * 100).toFixed(1)}% (full at 400 min)`;
      }
    }

    return status;
  }
}
