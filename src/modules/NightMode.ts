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

import type { AutoPlayContext } from '../types/autoplay';
import { UPGRADE_IDS } from '../constants/gameIds';

declare const Game: any;

export class NightMode {
  private isNight: boolean = false;
  private context: AutoPlayContext;

  /**
   * Constructor - expects context object
   * @param context AutoPlayContext for accessing game state
   */
  constructor(context: AutoPlayContext) {
    this.context = context;

    // Register configuration options
    this.context.configManager.registerOption('NightMode', {
      id: 'NightMode',
      type: 'select',
      label: 'Night Mode',
      options: [
        { value: 0, label: 'OFF' },
        { value: 1, label: 'AUTO (Sleep unless grinding)' },
        { value: 2, label: 'ON (Always sleep at night)' }
      ],
      default: 1,
      desc: 'Controls bot behavior during night hours (11pm-7am).'
    }, 1, 'General');
  }

  /**
   * Get current night mode (from live config)
   */
  private getNightMode(): number {
    return this.context.Config.NightMode || 0;
  }


  /**
   * Log activity message
   */
  private logActivity(msg: string): void {
    this.context.addActivity(msg);
  }

  /**
   * Check if it's currently nighttime (after 10pm)
   * Used for pre-night preparation activities
   */
  isPreNightMode(): boolean {
    // Read mode from Config (numeric: 0=OFF, 1=AUTO)
    const mode = this.getNightMode();

    // Only prepare for night if mode is not OFF
    if (mode === 0) return false;

    const hour = new Date().getHours();
    return hour >= 22;
  }

  /**
   * Main night mode logic - determines if bot should be active or sleeping
   * Mirrors original AutoPlay.nightMode() function
   * @returns true if bot should sleep, false if bot should be active
   */
  checkNightMode(): boolean {
    // Don't sleep if on ascension screen
    if (Game.OnAscend) return false;

    // Read mode from Config (numeric: 0=OFF, 1=AUTO)
    const mode = this.getNightMode();

    // Mode 0: OFF - never sleep
    if (mode === 0) return false;

    // Mode 1: AUTO - don't sleep while grinding for final achievements
    if (mode === 1 && this.context.grinding()) {
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
  private prepareForNight(hour: number): void {
    this.logActivity('Preparing for the night.');
    this.context.freezeGarden(true);

    // Handle stock market night trading
    this.context.handleNightTrading();

    // Handle Golden Switch
    const goldenSwitchOff = Game.UpgradesById[UPGRADE_IDS.GOLDEN_SWITCH_OFF];
    if (goldenSwitchOff && goldenSwitchOff.unlocked) {
      // Click any golden cookies before buying Golden Switch
      this.context.handleGoldenCookies();

      this.logActivity('Waiting for good time to buy Golden switch.');

      // Check for good time to buy golden switch
      // Wait if CPS multiplier is high or it's still early
      const cpsMult = this.getCurrentCpsMultiplier();
      if (cpsMult < 0.8 || hour < 7) {
        // Buy Shimmering veil if available
        const shimmeringVeilOff = Game.UpgradesById[UPGRADE_IDS.SHIMMERING_VEIL_OFF];
        if (shimmeringVeilOff &&
            shimmeringVeilOff.unlocked &&
            shimmeringVeilOff.canBuy() &&
          Game.UpgradesById[UPGRADE_IDS.REINFORCED_MEMBRANE].bought) {
          shimmeringVeilOff.buy();
        }
        goldenSwitchOff.buy();
      }

      // Don't activate spirits before golden switch is bought
      if (!goldenSwitchOff.bought) return;
    }

    // Activate night spirits via PantheonManager
    this.context.activateNightSpirits();
  }

  /**
   * Wake up from night mode
   */
  private onWakeUp(): void {
    // Use any accumulated sugar lumps
    this.context.handleSugarLumps();
  }

  /**
   * Deactivate night features when day starts
   */
  private deactivateNightFeatures(): void {
    // Deactivate night spirits via PantheonManager
    this.context.deactivateNightSpirits();

    // Turn Golden Switch back on
    const goldenSwitchOn = Game.UpgradesById[UPGRADE_IDS.GOLDEN_SWITCH_ON];
    if (goldenSwitchOn && goldenSwitchOn.unlocked) {
      goldenSwitchOn.buy();
    }

    this.context.freezeGarden(false);
  }

  /**
   * Freeze/unfreeze garden during night
   * @deprecated Use context.freezeGarden instead
   */
  /*
  private activateNightAtGarden(activate: boolean): void {
    this.context.freezeGarden(activate);
  }
  */


  /**
   * Get current CPS multiplier from active buffs
   * Simplified version - would need full buff calculation from Game.buffs
   */
  private getCurrentCpsMultiplier(): number {
    // Check active buffs for CPS modifiers
    const gameBuffs = (Game as any).buffs;
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
  isCurrentlySleeping(): boolean {
    return this.isNight;
  }


  /**
   * Get status for dashboard display
   */
  getStatus(): any {
    const isEnabled = this.getNightMode() > 0;
    const isActive = this.isNight;

    if (!isEnabled) {
      return {
        module: 'Night Mode',
        status: 'disabled',
        currentAction: 'Disabled',
        reason: 'Night mode is turned off in settings',
        icon: '🌙',
        details: {
          'Mode': 'OFF'
        }
      };
    }

    // Calculate night time range
    const nightStart = 1;  // 1 AM
    const nightEnd = 7;    // 7 AM
    const now = new Date();
    const currentHour = now.getHours();

    let timeUntilChange = 0;
    if (isActive) {
      // Currently night - calculate time until morning (7 AM)
      if (currentHour < nightEnd) {
        timeUntilChange = (nightEnd - currentHour) * 3600 * 1000;
      } else {
        // Past morning, so next morning
        timeUntilChange = (24 - currentHour + nightEnd) * 3600 * 1000;
      }
    } else {
      // Currently day - calculate time until night (1 AM)
      if (currentHour < nightStart) {
        timeUntilChange = (nightStart - currentHour) * 3600 * 1000;
      } else {
        // Past night start, so next night
        timeUntilChange = (24 - currentHour + nightStart) * 3600 * 1000;
      }
    }

    const status: any = {
      module: 'Night Mode',
      status: isActive ? 'active' : 'waiting',
      currentAction: isActive ? 'Sleeping' : 'Active',
      reason: isActive ? 'Resting during night hours (1 AM - 7 AM)' : 'Working during day hours',
      icon: isActive ? '😴' : '🌙',
      details: {
        'Mode': 'ON',
        'Status': isActive ? 'NIGHT' : 'DAY',
        'Hours': `${nightStart}:00 AM - ${nightEnd}:00 AM`
      },
      timeRemaining: timeUntilChange
    };

    return status;
  }
}
