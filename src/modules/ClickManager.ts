/**
 * Handles automatic clicking of the big cookie
 * Respects Neverclick and True Neverclick achievements
 * Original: AutoPlay.handleClicking (lines 360-384)
 */

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;
declare const Beautify: (num: number) => string;

export class ClickManager {
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;

    // Register configuration options
    this.context.configManager.registerOption('ClickMode', {
      id: 'ClickMode',
      type: 'select',
      label: 'Click Mode',
      options: [
        { value: 0, label: 'OFF' },
        { value: 1, label: 'Normal (Human-like)' },
        { value: 2, label: 'Aggressive (Fast)' },
        { value: 3, label: 'Very Aggressive (Instant)' }
      ],
      default: 1,
      desc: 'How fast the bot clicks the big cookie.'
    }, 1, 'Clicking');
  }

  /**
   * Get current click mode (from live config)
   */
  private getClickMode(): number {
    return this.context.Config.ClickMode || 0;
  }

  /**
   * Handle clicking - respects Neverclick/True Neverclick achievements
   * Original: AutoPlay.handleClicking (lines 360-378)
   */
  handleClicking(): void {
    const clickMode = this.getClickMode();
    if (clickMode === 0) return;

    // Respect Neverclick achievement (max 15 clicks)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won && Game.cookieClicks <= 15) {
      return;
    }

    // Respect True Neverclick in Born Again endgame
    if (Game.ascensionMode === 1 && this.context.endPhase() &&
      !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won && !Game.cookieClicks) {
      return;
    }

    // Uncanny clicker achievement (5 clicks in a row within 1 second)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won) {
      for (let i = 1; i < 6; i++) {
        setTimeout(() => Game.ClickCookie(), 50 * i);
      }
    }

    // Aggressive clicking (mode 2+)
    if (clickMode > 1) {
      for (let i = 1; i < 10; i++) {
        setTimeout(() => this.speedClicking(), 30 * i);
      }
    } else {
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
   * Original: AutoPlay.speedClicking (lines 380-383)
   */
  private speedClicking(): void {
    const clickMode = this.getClickMode();
    Game.ClickCookie();
    const clickCount = 1 << (10 * (clickMode - 2));
    Game.ClickCookie(0, clickCount * Game.computedMouseCps);
  }

  /**
   * Get clicking status for dashboard
   */
  getStatus(): ModuleStatus {
    const clickMode = this.getClickMode();
    if (clickMode === 0) {
      return {
        module: 'Clicking',
        status: 'disabled',
        currentAction: 'Disabled',
        reason: 'Click mode set to OFF',
        icon: '👆',
        details: {
          'Mode': 'OFF'
        }
      };
    }

    // Check if blocked by Neverclick
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won && Game.cookieClicks <= 15) {
      return {
        module: 'Clicking',
        status: 'waiting',
        currentAction: 'Waiting for Neverclick',
        reason: 'Protecting Neverclick achievement (max 15 clicks)',
        nextAction: Game.cookieClicks === 15 ? 'Will resume after achievement unlocked' : undefined,
        icon: '👆',
        details: {
          'Clicks Used': `${Game.cookieClicks}/15`,
          'Neverclick Won': false,
          'Mode': this.getClickModeName()
        }
      };
    }

    // Check if blocked by True Neverclick in Born Again endgame
    if (Game.ascensionMode === 1 && this.context.endPhase() &&
      !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won && !Game.cookieClicks) {
      return {
        module: 'Clicking',
        status: 'waiting',
        currentAction: 'Waiting for True Neverclick',
        reason: 'Protecting True Neverclick achievement (0 clicks)',
        icon: '👆',
        details: {
          'Clicks': 0,
          'True Neverclick Won': false,
          'Mode': 'Born Again',
          'Click Mode': this.getClickModeName()
        }
      };
    }

    // Active clicking
    const clicksPerSecond = clickMode === 1 ? '~3-5' : '~10+';
    const hasFrenzy = 'Click frenzy' in Game.buffs || 'Dragonflight' in Game.buffs || 'Cursed finger' in Game.buffs;

    return {
      module: 'Clicking',
      status: 'active',
      currentAction: hasFrenzy ? 'Clicking (Frenzy active!)' : 'Auto-clicking big cookie',
      reason: this.getClickModeName(),
      nextAction: !Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won ? 'Working on Uncanny clicker achievement' : undefined,
      icon: '👆',
      details: {
        'Mode': this.getClickModeName(),
        'Clicks/sec': hasFrenzy ? '~15-20' : clicksPerSecond,
        'Total Clicks': typeof Beautify !== 'undefined' ? Beautify(Game.cookieClicks) : Game.cookieClicks,
        'Frenzy Active': hasFrenzy,
        'Uncanny Clicker': Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won
      }
    };
  }

  /**
   * Get human-readable click mode name
   */
  private getClickModeName(): string {
    const clickMode = this.getClickMode();
    switch (clickMode) {
      case 0: return 'OFF';
      case 1: return 'Normal';
      case 2: return 'Aggressive';
      case 3: return 'Very Aggressive';
      default: return `Level ${clickMode}`;
    }
  }
}
