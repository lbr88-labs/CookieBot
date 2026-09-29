/**
 * Handles seasonal events and upgrades
 */

import type { AutoPlayContext } from '../types/autoplay';
import type { ModuleStatus } from '../types/moduleStatus';
import { BUILDING_IDS, UPGRADE_IDS, ACHIEVEMENT_IDS } from '../constants/gameIds';

declare const Game: any;

/**
 * Helper function to create a range of numbers (inclusive)
 */
function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export class SeasonHandler {
  private context: AutoPlayContext;
  // Season upgrade IDs
  private readonly valentineUpgrades: number[] = range(169, 174).concat([645]);
  private readonly christmasUpgrades: number[] = [168]; // just wait for dominion
  private readonly easterUpgrades: number[] = range(210, 229);
  private readonly halloweenUpgrades: number[] = range(134, 140);
  private readonly allSeasonUpgrades: number[];

  private elfClickTimeout: number | null = null;

  constructor(context: AutoPlayContext) {
    this.context = context;
    this.allSeasonUpgrades = this.valentineUpgrades
      .concat(this.christmasUpgrades)
      .concat(this.easterUpgrades)
      .concat(this.halloweenUpgrades);
  }

  /**
   * Main season handling logic
   * Manages Santa upgrades, Christmas elf achievement, and season cycling
   */
  handleSeasons(): void {
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
  private handleSanta(): void {
    if (
      !!Game.UpgradesById[UPGRADE_IDS.A_FESTIVE_HAT].bought &&
      !Game.UpgradesById[UPGRADE_IDS.SANTAS_DOMINION].unlocked
    ) {
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
  private handleChristmasElf(): void {
    // Skip if not Christmas season
    if (Game.season !== "christmas") return;

    // Skip if achievement already won
    if (!!Game.AchievementsById[ACHIEVEMENT_IDS.BABY_ITS_OLD_OUTSIDE].won) return;

    // Skip if no grandmas purchased yet (elf can't appear without grandmas)
    // This is the fix for the menu closing issue
    if (Game.ObjectsById[BUILDING_IDS.GRANDMA].amount === 0) return;

    // Close any open menu
    if (Game.onMenu) Game.ShowMenu("");

    // Scroll grandma canvas into view
    Game.ObjectsById[BUILDING_IDS.GRANDMA].canvas.parentElement?.scrollIntoView();

    // Find elf grandma
    const elfGrandmas = Game.ObjectsById[BUILDING_IDS.GRANDMA].pics.filter(
      (p: any) => p.pic === "elfGrandma.png"
    );

    if (elfGrandmas.length > 0) {
      const elfGranny = elfGrandmas[0];
      const xPos = elfGranny.x + 32;
      const yPos = elfGranny.y + 32;

      // Set mouse position and trigger click
      Game.ObjectsById[BUILDING_IDS.GRANDMA].mousePos = [xPos, yPos];
      Game.ObjectsById[BUILDING_IDS.GRANDMA].mouseOn = true;
      Game.mouseDown = 1;

      // Release click after 1 second
      this.elfClickTimeout = window.setTimeout(() => this.unElf(), 1000);
    }
  }

  /**
   * Release the elf click and scroll back to ticker
   */
  private unElf(): void {
    Game.mouseDown = 0;
    Game.tickerL.scrollIntoView();
  }

  /**
   * Handle season cycling between Christmas -> Valentine -> Easter -> Halloween
   */
  private cycleSeason(): void {
    // Don't cycle if season switcher not bought
    if (!Game.UpgradesById[UPGRADE_IDS.SEASON_SWITCHER].bought) return; // bought is number, falsy check works

    // Don't cycle in Born Again mode
    if (Game.ascensionMode === 1) return;

    // Don't cycle if too many season switches already
    if (Game.seasonUses > 20) return;

    // Check if current season is finished
    if (this.seasonFinished(Game.season)) {
      // Cycle to next season
      switch (Game.season) {
        case "christmas":
          Game.UpgradesById[UPGRADE_IDS.LOVESICK_BISCUIT].buy(); // to valentine
          break;
        case "valentines":
          Game.UpgradesById[UPGRADE_IDS.BUNNY_BISCUIT].buy(); // to easter
          break;
        case "easter":
          Game.UpgradesById[UPGRADE_IDS.GHOSTLY_BISCUIT].buy(); // to halloween
          break;
        default:
          Game.UpgradesById[UPGRADE_IDS.FESTIVE_BISCUIT].buy(); // to christmas
          break;
      }
    } else if (!this.allUnlocked(this.allSeasonUpgrades)) {
      // Still waiting for upgrades in current season
      this.context.addActivity(`Waiting for all results in ${Game.season}.`);
    }
  }

  /**
   * Check if all upgrades in a list are unlocked
   */
  private allUnlocked(upgradeIds: number[]): boolean {
    return upgradeIds.every((id) => Game.UpgradesById[id].unlocked);
  }

  /**
   * Check if a season is finished (all upgrades collected)
   */
  public seasonFinished(season: string): boolean {
    if (season === "") return true;

    switch (season) {
      case "valentines":
        return this.allUnlocked(this.valentineUpgrades);

      case "christmas":
        // If all season upgrades are unlocked, stay in Christmas
        if (this.allUnlocked(this.allSeasonUpgrades)) return false;
        // Otherwise check if Christmas-specific upgrades are done
        return this.allUnlocked(this.christmasUpgrades);

      case "easter":
        return (
          !!Game.Achievements["Hide & seek champion"].won &&
          this.allUnlocked(this.easterUpgrades)
        );

      case "halloween":
        return this.allUnlocked(this.halloweenUpgrades);

      default:
        return true;
    }
  }

  /**
   * Cleanup method to clear any pending timeouts
   */
  cleanup(): void {
    if (this.elfClickTimeout !== null) {
      clearTimeout(this.elfClickTimeout);
      this.elfClickTimeout = null;
    }
  }

  /**
   * Get current season handler status
   */
  getStatus(): ModuleStatus {
    const currentSeason = Game.season || 'none';

    // Check if season switcher is unlocked
    if (!Game.UpgradesById[UPGRADE_IDS.SEASON_SWITCHER].bought) {
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
    if (Game.UpgradesById[UPGRADE_IDS.A_FESTIVE_HAT].bought &&
      !Game.UpgradesById[UPGRADE_IDS.SANTAS_DOMINION].unlocked) {
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
      !Game.AchievementsById[ACHIEVEMENT_IDS.BABY_ITS_OLD_OUTSIDE].won &&
      Game.ObjectsById[BUILDING_IDS.GRANDMA].amount > 0) {
      const elfGrandmas = Game.ObjectsById[BUILDING_IDS.GRANDMA].pics.filter(
        (p: any) => p.pic === "elfGrandma.png"
      );

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
