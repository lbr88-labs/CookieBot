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

declare const Game: any;

import { BUILDING_IDS, ACHIEVEMENT_IDS, UPGRADE_IDS } from '../constants/gameIds';
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';

export class GrimoireManager {
  // State tracking
  private context: AutoPlayContext;

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Main handler - called in high-activity phase (when hyperActive or deadline reached)
   * Casts grimoire spells when beneficial
   */
  handleGrimoires(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER])) return;

    const grimoire = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER].minigame;
    const wizardTower = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER];

    // Special case: Four-leaf cookie achievement
    // Try to get 4 golden cookies on screen at once
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.FOURLEAF_COOKIE].won &&
        wizardTower.amount > 500 &&
      Game.UpgradesById[UPGRADE_IDS.DISTILLED_ESSENCE_OF_REDOUBLED_LUCK].bought) {
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
    if (this.context.cpsMult > 100) {
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
      if (this.context.canUseLumps && Game.lumps > 100) {
        grimoire.lumpRefill.click();
      }
    }
  }

  /**

   * Get current grimoire manager status
   */
  getStatus(): ModuleStatus {
    // Check if grimoire is unlocked
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER])) {
      return {
        module: 'Grimoire',
        status: 'disabled',
        currentAction: 'Not unlocked',
        reason: 'Need Wizard Tower minigame unlocked (Level 1)',
        icon: '🧙',
        details: {
          'Wizard Tower Level': Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER]?.level || 0,
          'Minigame': 'Not ready'
        }
      };
    }

    const grimoire = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER].minigame;
    const wizardTower = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER];
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
          'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
          'Strategy': 'Backfire farming'
        }
      };
    }

    // Check for high CpS multiplier (>100x)
    if (this.context.cpsMult > 100) {
      return {
        module: 'Grimoire',
        status: canCastHand ? 'active' : 'waiting',
        currentAction: canCastHand ? 'Casting spells' : 'Waiting for magic',
        reason: `High CpS multiplier (${this.context.cpsMult.toFixed(0)}x)`,
        nextAction: canCastHand ? 'Casting Hand of Fate & Conjure Baked Goods' : 'Recharging magic',
        icon: '🔮',
        details: {
          'Magic': `${magicPercent}%`,
          'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
          'Can Use Lumps': this.context.canUseLumps && Game.lumps > 100,
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
        'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
        'Threshold': '100x'
      }
    };
  }
}
