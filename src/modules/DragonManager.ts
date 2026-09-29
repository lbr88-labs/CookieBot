/**
 * Manages dragon training and aura selection
 *
 * The Dragon (Krumblor) is unlocked after purchasing "A crumbly egg" upgrade.
 * Dragon levels unlock through various sacrifices and achievements.
 * Dragons provide powerful auras that boost game performance.
 */

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { BUILDING_IDS, UPGRADE_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;

/**
 * Dragon aura indices
 */
enum DragonAura {
  None = 0,
  BreathOfMilk = 1,         // +5% milk
  DragonCursor = 2,          // +5 cookies per click per cursor
  ElderBattalion = 3,        // +1% CpS per grandma
  ReaperOfFields = 4,        // +3% CpS per farm
  Dragonflight = 5,          // Golden cookie effects last 10% longer
  AncestralMetamorphosis = 6, // Grandmas give 10% more CpS
  UnholyDominion = 7,        // Wrath cookie effects last 10% longer
  FierceHoarder = 8,         // +5% CpS per building
  DragonGod = 9,             // +5% to all building CpS
  ArcaneAura = 10,           // Golden cookies appear 5% more often
  FierceHoarder2 = 11,       // (duplicate in original)
  DragonOrb = 12,            // +2% prestige
  ReaperOfFields2 = 13,      // (duplicate in original)
  RadiantAppetite = 15,      // Golden/wrath cookies gain +2% CpS
  DragonsCurve = 17          // Sugar lumps ripen 5% faster
}

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
] as const;

/**
 * Aura names for logging
 */
const AURA_NAMES: Record<number, string> = {
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

export class DragonManager {
  private context: AutoPlayContext;
  private lastActionTime: number = 0;

  constructor(context: AutoPlayContext) {
    this.context = context;
  }

  /**
   * Main handler for all dragon-related activities
   * Should be called periodically from the main AutoPlay loop
   */
  handleDragon(): void {
    // Only proceed if dragon egg is unlocked
    if (!Game.UpgradesById[UPGRADE_IDS.A_CRUMBLY_EGG].unlocked) {
      return;
    }

    // Safety check: If a prompt is already open, don't try to open another one
    // This prevents "prompt on prompt" issues and potential game freezes
    if ((Game as any).promptOn) {
      return;
    }

    // Throttle dragon actions to avoid spamming when main loop is running fast (e.g. waiting for purchase)
    // 5 seconds cooldown
    if (Date.now() - this.lastActionTime < 5000) {
      return;
    }
    this.lastActionTime = Date.now();

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
  private trainDragon(): void {
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
    let buildingToRestock: Building | null = null;
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
      if (Game.ObjectsById[BUILDING_IDS.FARM].amount === 0) {
        Game.ObjectsById[BUILDING_IDS.FARM].buy(1);
      }

      // Note: handleMinigames would need to be called here
      // For now, just buy buildings
      for (const building of Game.ObjectsById) {
        const needed = 150 - building.amount;
        if (needed > 0) {
          building.buy(needed);
        }
      }
    } else if (buildingToRestock) {
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
  private selectBestAuras(): void {
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
  private setPrimaryAura(): void {
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

      // Try to confirm synchronously
      if (typeof (Game as any).ConfirmPrompt === 'function') {
        (Game as any).ConfirmPrompt();
      }

      Game.ToggleSpecialMenu(0);

      // Safety net: If prompt is still open (e.g. it was async or game paused hooks), 
      // confirm it from outside the hook using setTimeout
      setTimeout(() => {
        if ((Game as any).promptOn && typeof (Game as any).ConfirmPrompt === 'function') {
          (Game as any).ConfirmPrompt();
        }
      }, 100);

      const auraName = AURA_NAMES[desiredAura] || 'Unknown';
      this.context.logStatus('dragon', `Dragon aura 1: ${auraName}`);
    }
  }

  /**
   * Set the secondary dragon aura (slot 1)
   * Always set to Breath of Milk for the kitten boost
   */
  private setSecondaryAura(): void {
    const desiredAura = DragonAura.BreathOfMilk;

    // Only change if different from current
    if (Game.dragonAura2 !== desiredAura) {
      Game.specialTab = 'dragon';
      Game.SetDragonAura(desiredAura, 1);

      // Try to confirm synchronously
      if (typeof (Game as any).ConfirmPrompt === 'function') {
        (Game as any).ConfirmPrompt();
      }

      Game.ToggleSpecialMenu(0);

      // Safety net: If prompt is still open (e.g. it was async or game paused hooks), 
      // confirm it from outside the hook using setTimeout
      setTimeout(() => {
        if ((Game as any).promptOn && typeof (Game as any).ConfirmPrompt === 'function') {
          (Game as any).ConfirmPrompt();
        }
      }, 100);

      this.context.logStatus('dragon', 'Dragon aura 2: Breath of Milk');
    }
  }

  /**
   * Pet the dragon to get special drops
   * Available at dragon level 8+
   * Drops: Dragon scale, Dragon claw, Dragon fang, Dragon teddy bear
   */
  private petDragon(): void {
    if (Game.dragonLevel < 8) {
      return; // Can't pet dragon yet
    }

    // Check if there are any drops we haven't obtained yet
    for (const drop of DRAGON_DROPS) {
      if (!(Game as any).Has(drop) && !(Game as any).HasUnlocked(drop)) {
        // Still have drops to collect
        this.context.addActivity('Petting the dragon.');

        Game.specialTab = 'dragon';
        Game.ToggleSpecialMenu(1);
        (Game as any).ClickSpecialPic();
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
  checkDragonLimits(buildingName: string): boolean {
    // Don't limit purchases until "Here be dragon" achievement is won
    if (!Game.AchievementsById[ACHIEVEMENT_IDS.HERE_BE_DRAGON].won) {
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
  private isHuntingLumpAchievement(): boolean {
    // Lump harvest achievements: IDs 266-272 and 396
    // These require harvesting lumps at specific maturity levels
    return LUMP_HARVEST_ACHIEVEMENTS.includes(this.context.nextAchievement);
  }

  /**
   * Get current dragon manager status
   */
  getStatus(): ModuleStatus {
    // Check if dragon egg is unlocked
    if (!Game.UpgradesById[UPGRADE_IDS.A_CRUMBLY_EGG].unlocked) {
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
        } else if (currentLevel >= maxLevel - 3) {
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
    const missingDrops = DRAGON_DROPS.filter(
      drop => !(Game as any).Has(drop) && !(Game as any).HasUnlocked(drop)
    );

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
