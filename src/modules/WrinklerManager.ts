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

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { Logger } from '../utils/Logger';
import { UPGRADE_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;
declare const Beautify: (num: number) => string;

export class WrinklerManager {
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Main wrinkler handling logic
   * Runs periodically to manage wrinkler popping strategy
   */
  handleWrinklers(): void {
    this.context.poppingWrinklers = false;

    // Don't handle wrinklers until One mind is bought (unlocks wrinklers)
    if (!Game.UpgradesById[UPGRADE_IDS.ONE_MIND].bought) {
      return;
    }

    // Determine if we should pop all wrinklers
    const shouldPopAll = this.shouldPopAllWrinklers();

    if (shouldPopAll) {
      this.popAllWrinklers();
    } else {
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
  private shouldPopAllWrinklers(): boolean {
    // Pop during easter or halloween if season not finished
    let doPop = (Game.season === "easter" || Game.season === "halloween");
    doPop = doPop && !this.seasonFinished();

    // Pop if we have Unholy bait and haven't won Moistburster achievement
    // Game.Upgrades[...].bought returns number (0 or 1), so convert to boolean
    doPop = doPop ||
      (!!Game.UpgradesById[UPGRADE_IDS.UNHOLY_BAIT].bought && !Game.AchievementsById[ACHIEVEMENT_IDS.MOISTBURSTER].won);

    // Pop in end phase if we haven't won Last Chance to See achievement
    doPop = doPop ||
      (this.isEndPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.LAST_CHANCE_TO_SEE].won);

    return doPop;
  }

  /**
   * Pop all attached wrinklers
   */
  private popAllWrinklers(): void {
    this.context.poppingWrinklers = true;
    this.context.wrinklerTime = this.context.now;

    Logger.addActivity("Popping wrinklers for droppings and/or achievements.");
    Logger.logStatus('wrinkler', 'Popping all wrinklers');

    // Pop all attached wrinklers (close === 1)
    Game.wrinklers.forEach((w: Wrinkler) => {
      if (w.close === 1) {
        w.hp = 0;  // Setting hp to 0 pops the wrinkler
      }
    });
  }

  /**
   * Handle single wrinkler popping strategy
   * Pops one wrinkler every 2 hours
   */
  private handleSingleWrinklerPopping(): void {
    // Handle Wrinkler poker achievement (pop wrinkler #3)
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.WRINKLER_POKER].won && Game.wrinklers[3].close === 1) {
      Game.wrinklers[3].selected = 1;
      l('backgroundLeftCanvas').click();
    }

    // Find the next wrinkler to pop (highest sucked value)
    this.findNextWrinkler();

    // Calculate time since last pop
    const minutesSinceLastPop = Math.floor((this.context.now - this.context.wrinklerTime) / 1000 / 60);
    Logger.addActivity(`Popping one wrinkler per two hours, last ${minutesSinceLastPop} minutes ago.`);

    // Pop the selected wrinkler if it's time (2 hours = 2*60*60*1000 ms)
    if (this.context.nextWrinkler !== -1) {
      const twoHoursInMs = 2 * 60 * 60 * 1000;
      if (this.context.now - this.context.wrinklerTime >= twoHoursInMs) {
        Game.wrinklers[this.context.nextWrinkler].hp = 0;  // Pop the wrinkler
        this.context.wrinklerTime = this.context.now;
        Logger.logStatus('wrinkler', 'Popped single wrinkler');
      }
    }
  }

  /**
   * Find the next wrinkler to pop
   * Selects the wrinkler with the most cookies sucked
   * If there's an empty spot, don't pop any wrinkler (let it fill up)
   */
  private findNextWrinkler(): void {
    let nextId = -1;
    let maxSucked = 0;

    for (const w of Game.wrinklers) {
      // Check if there's an empty spot (not attached, but within max wrinklers)
      if (w.close === 0 && w.id < Game.getWrinklersMax()) {
        // Empty spot found - don't pop any wrinkler, let it fill up
        this.context.nextWrinkler = -1;
        return;
      }

      // Track wrinkler with most cookies sucked
      if (w.sucked > maxSucked) {
        maxSucked = w.sucked;
        nextId = w.id;
      }
    }

    this.context.nextWrinkler = nextId;
  }

  /**
   * Check if a wrinkler is shiny
   * Shiny wrinklers have type === 1 and are rarer/more valuable
   */
  isShinyWrinkler(wrinkler: Wrinkler): boolean {
    return wrinkler.type === 1;
  }

  /**
   * Calculate the value (cookies) stored in a wrinkler
   * This is the amount of cookies that would be returned when popped
   * Shiny wrinklers return 3x the normal amount
   */
  getWrinklerValue(wrinkler: Wrinkler): number {
    if (wrinkler.close === 0) {
      return 0;  // Not attached
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
  getTotalWrinklerValue(): number {
    return Game.wrinklers.reduce((total: number, w: any) => {
      return total + this.getWrinklerValue(w);
    }, 0);
  }

  /**
   * Count attached wrinklers
   */
  getAttachedWrinklerCount(): number {
    return Game.wrinklers.filter((w: any) => w.close === 1).length;
  }

  /**
   * Count shiny wrinklers
   */
  getShinyWrinklerCount(): number {
    return Game.wrinklers.filter((w: any) => w.close === 1 && this.isShinyWrinkler(w)).length;
  }

  // ============ Helper methods ============

  /**
   * Check if current season is finished (all upgrades collected)
   * Delegates to SeasonHandler
   */
  private seasonFinished(): boolean {
    return this.context.seasonFinished(Game.season);
  }

  /**
   * Check if we're in the end phase (all achievements collected)
   * Returns true when nextAchievement is NOT in the wantedAchievements list
   * (meaning we've completed all wanted achievements and moved to the end phase)
   */
  private isEndPhase(): boolean {
    return this.context.wantedAchievements.indexOf(this.context.nextAchievement) < 0;
  }

  /**
   * Get current wrinkler manager status
   */
  getStatus(): ModuleStatus {
    // Check if wrinklers are unlocked
    if (!Game.UpgradesById[UPGRADE_IDS.ONE_MIND].bought) {
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
    if (this.context.poppingWrinklers) {
      return {
        module: 'Wrinklers',
        status: 'active',
        currentAction: 'Popping all wrinklers',
        reason: Game.season === 'easter' || Game.season === 'halloween'
          ? 'Season drops'
          : Game.UpgradesById[UPGRADE_IDS.UNHOLY_BAIT].bought && !Game.AchievementsById[ACHIEVEMENT_IDS.MOISTBURSTER].won
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
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.WRINKLER_POKER].won && Game.wrinklers[3].close === 1) {
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
    const minutesSinceLastPop = Math.floor((this.context.now - this.context.wrinklerTime) / 1000 / 60);
    const minutesUntilNext = 120 - minutesSinceLastPop;

    if (this.context.nextWrinkler === -1) {
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
