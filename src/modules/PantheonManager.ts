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

declare const Game: any;

import { BUILDING_IDS } from '../constants/gameIds';
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';

export class PantheonManager {
  // Injected dependencies
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Main handler - called periodically (every 15 seconds)
   * Assigns optimal spirits based on current game state
   */
  handlePantheon(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE])) return;

    const age = this.context.now - Game.lumpT;

    // Slot 0 (Diamond) - Most important slot
    if (this.context.poppingWrinklers) {
      // Scorn: Wrinklers give +15% more cookies
      this.assignSpirit(0, 'scorn', 0);
    } else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !(this.context.Config.CheatLumps > 0)) {
      // Order: Sugar lumps ripen 1 hour sooner (use when < 61 min from harvest)
      this.assignSpirit(0, 'order', 0);
    } else if (this.context.preNightMode() &&
               Game.lumpOverripeAge - age < 9 * 60 * 60000 &&
               (new Date()).getMinutes() === 59 &&
      !(this.context.Config.CheatLumps > 0)) {
      // Order: Also use at 59 minutes before midnight if lump about to over-ripen
      this.assignSpirit(0, 'order', 0);
    } else {
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
  activateNightSpirits(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE])) return;

    // Remove day spirits
    this.removeSpirit(1, 'decadence');
    this.removeSpirit(2, 'labor');

    // Add night spirits (force=1 means use 1 swap if needed)
    this.assignSpirit(1, 'asceticism', 1); // Buildings/CpS -5% (saves money at night)
    this.assignSpirit(2, 'industry', 1);    // Buildings +10% (better than Labor's +5%)
  }

  /**
   * Deactivate night mode spirits
   * Called from NightMode.deactivateNightFeatures()
   */
  deactivateNightSpirits(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE])) return;

    // Just remove asceticism, let main logic handle others
    this.removeSpirit(1, 'asceticism');
  }

  /**
   * Assign a spirit to a pantheon slot
   * @param slot 0=Diamond, 1=Ruby, 2=Jade
   * @param godName Name of the spirit (e.g., 'mother', 'decadence')
   * @param force If 1, forces use of 1 swap. If 0, requires 3 swaps available.
   */
  public assignSpirit(slot: number, godName: string, force: number): void {
    const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;

    // Check if we have enough swaps (worship swaps recharge over time)
    if (pantheon.swaps + force < 3) return;

    // Check if spirit already in this slot
    if (pantheon.slot[slot] === pantheon.gods[godName].id) return;

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
  private removeSpirit(slot: number, godName: string): void {
    const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;

    // Check if this spirit is in the slot
    if (pantheon.slot[slot] !== pantheon.gods[godName].id) return;

    // Remove the spirit
    pantheon.slotHovered = -1;
    pantheon.dragging = pantheon.gods[godName];
    pantheon.dropGod();
  }

  /**

   * Get current pantheon manager status
   */
  getStatus(): ModuleStatus {
    // Check if pantheon is unlocked
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE])) {
      return {
        module: 'Pantheon',
        status: 'disabled',
        currentAction: 'Not unlocked',
        reason: 'Need Temple minigame unlocked (Level 1)',
        icon: '🏛️',
        details: {
          'Temple Level': Game.ObjectsById[BUILDING_IDS.TEMPLE]?.level || 0,
          'Minigame': 'Not ready'
        }
      };
    }

    const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;
    const slot0 = pantheon.slot[0];
    const slot1 = pantheon.slot[1];
    const slot2 = pantheon.slot[2];

    // Get spirit names
    const getGodName = (id: number): string => {
      if (id === -1) return 'Empty';
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
    const age = this.context.now - Game.lumpT;
    let reason = '';

    if (this.context.poppingWrinklers) {
      reason = 'Scorn for wrinkler bonus';
    } else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !(this.context.Config.CheatLumps > 0)) {
      reason = 'Order for faster lump ripening';
    } else {
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
        'Strategy': this.context.poppingWrinklers ? 'Wrinkler boost' : 'Default'
      }
    };
  }
}
