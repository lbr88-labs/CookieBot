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

declare const Game: any;

import { HARVESTABLE_PLANTS, GARDEN_UPGRADE_IDS, PLANT_DEPENDENCIES, BUILDING_IDS, UPGRADE_IDS } from '../constants/gameIds';
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';

// Convert readonly arrays to regular arrays for runtime use
const HARVESTABLE_PLANTS_ARRAY = [...HARVESTABLE_PLANTS];
const GARDEN_UPGRADES = [...GARDEN_UPGRADE_IDS];
// @ts-ignore - Will be used when full planting logic is implemented
const _PLANT_DEPS: Array<[string, string, string]> = PLANT_DEPENDENCIES.map(
  (dep) => [dep[0], dep[1], dep[2]]
);

export class GardenManager {
  // State tracking
  private plantList: number[] = [0, 0, 0, 0]; // Current plant goals for each sector
  private plantPending: boolean = false; // Waiting for plant to mature
  private harvestPlant: boolean = false; // Have harvestable plant waiting
  private plantsMissing: boolean = true; // Still unlocked plants?
  private plantCookies: boolean = false; // Harvest cookie-dropping plants?
  private wantGardenSacrifice: boolean = false; // Want to sacrifice garden?

  private context: AutoPlayContext;

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
  }

  /**
   * Freeze or unfreeze the garden
   * @param freeze true to freeze, false to unfreeze
   */
  freezeGarden(freeze: boolean): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.FARM])) return;

    const garden = Game.ObjectsById[BUILDING_IDS.FARM].minigame;

    // Toggle freeze if needed
    if (freeze !== garden.freeze) {
      const freezeButton = document.getElementById('gardenTool-2');
      if (freezeButton) {
        freezeButton.click();
      }
    }
  }

  /**
   * Main handler - called periodically (every 15 seconds)
   */
  handleGarden(): void {
    if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.FARM])) return;

    const garden = Game.ObjectsById[BUILDING_IDS.FARM].minigame;

    // Harvest mature plants and clean up
    this.harvesting(garden);

    // Plant seeds for mutations
    this.planting(garden);

    // Check if ready to sacrifice for "Seedless to nay" achievement (382)
    if (this.gardenSacrificeReady(garden)) {
      if (Game.promptOn) return;
      this.plantCookies = false;
      garden.askConvert();
      this.safeConfirm();
      this.plantList = [0, 0, 0, 0];
      return;
    }

    // Convert garden for sugar lumps when endgame and all plants unlocked
    if (!this.context.canUseLumps &&
        this.gardenReady(garden) &&
      !this.context.finished &&
        !this.harvestPlant &&
      !this.context.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
      if (Game.promptOn) return;
      this.plantCookies = false;
      garden.askConvert();
      this.safeConfirm();
      this.plantList = [0, 0, 0, 0];
    }
  }

  /**
   * Harvest mature and dying plants
   * Original: AutoPlay.harvesting (lines 1452-1484)
   */
  private harvesting(garden: any): void {
    this.cleaningGarden(garden);
    this.plantPending = false;
    this.harvestPlant = false;

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        if (!garden.isTileUnlocked(x, y)) continue;

        const tile = garden.getTile(x, y);
        if (!tile[0]) continue; // Empty tile

        const plant = garden.plantsById[tile[0] - 1];

        // Harvest unlocked plants that are mature
        if (!plant.unlocked) {
          this.plantPending = true;
          this.logActivity(`${plant.name} is still growing, do not disturb!`);
          if (tile[1] >= plant.mature) {
            garden.harvest(x, y);
          }
        } else if (HARVESTABLE_PLANTS_ARRAY.indexOf(plant.key) >= 0) {
          // Harvestable plants that drop cookies
          this.harvestPlant = true;
          this.logActivity(`Waiting to harvest ${plant.name}.`);
          if (garden.plantsUnlockedN === garden.plantsN && tile[1] >= plant.mature) {
            // Harvest when CPS multiplier is high enough
            if (this.context.cpsMult > 300) {
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
  private seedCalendar(garden: any, sector: number): string {
    if (this.context.wantAscend || this.wantGardenSacrifice) return 'bakerWheat';

    if (sector === 0) this.plantsMissing = false;

    const doPrint = (sector === 0) || (sector !== 3 && Game.ObjectsById[BUILDING_IDS.FARM].level === sector + 6);

    // Priority order: Try to unlock cookie-dropping upgrades
    if (!Game.UpgradesById[UPGRADE_IDS.ICHOR_SYRUP].unlocked && garden.plants['ichorpuff']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Ichor syrup.');
      this.plantCookies = true;
      return 'ichorpuff';
    }
    if (!Game.UpgradesById[UPGRADE_IDS.GREEN_YEAST_DIGESTIVES].unlocked && garden.plants['greenRot']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Green yeast digestives.');
      this.plantCookies = true;
      return 'greenRot';
    }
    if (!Game.UpgradesById[UPGRADE_IDS.DUKETATER_COOKIES].unlocked && garden.plants['duketater']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Duketater cookies.');
      this.plantCookies = true;
      return 'duketater';
    }
    if (!Game.Upgrades['Elderwort biscuits'].unlocked && garden.plants['elderwort']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Elderwort cookies.');
      this.plantCookies = true;
      return 'elderwort';
    }
    if (!Game.Upgrades['Bakeberry cookies'].unlocked && garden.plants['bakeberry']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Bakeberry cookies.');
      this.plantCookies = true;
      return 'bakeberry';
    }
    if (!Game.Upgrades['Wheat slims'].unlocked && garden.plants['bakerWheat']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Wheat slims.');
      this.plantCookies = true;
      return 'bakerWheat';
    }
    if (!Game.Upgrades['Fern tea'].unlocked && garden.plants['drowsyfern']?.unlocked) {
      this.switchSoil(garden, sector, 'fertilizer');
      if (doPrint) this.logActivity('Trying to get Fern tea.');
      this.plantCookies = true;
      return 'drowsyfern';
    }

    // All cookie upgrades unlocked - use garden for CPS and sugar lumps
    this.plantCookies = false;
    this.switchSoil(garden, sector, this.plantPending ? 'fertilizer' : 'clay');

    if (this.context.poppingWrinklers && garden.plants['wrinklegill']?.unlocked) {
      return 'wrinklegill'; // faster wrinklers
    }

    // Use bakeberry if all lump achievements are done (1% CPS + harvest 30 mins)
    if (garden.plants['bakeberry']?.unlocked &&
      this.context.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
      return 'bakeberry';
    }

    // Whiskerbloom gives ~1.5% CPS
    if (garden.plants['whiskerbloom']?.unlocked) return 'whiskerbloom';

    return 'bakerWheat'; // fallback
  }

  /**
   * Check if plant is unlocked OR currently growing in garden
   * Original: AutoPlay.havePlant (lines 1110-1117)
   */
  private havePlant(garden: any, plantKey: string): boolean {
    // Safety check: ensure plantKey is valid and exists
    if (!plantKey || !garden.plants[plantKey]) return false;

    if (garden.plants[plantKey].unlocked) return true;

    const plantID = garden.plants[plantKey].id + 1;
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        if (garden.getTile(x, y)[0] === plantID) return true;
      }
    }
    return false;
  }

  /**
   * Batch plant seeds with cost validation
   * Original: AutoPlay.plantSeeds (lines 1274-1327)
   */
  private plantSeeds(garden: any, targets: Array<[string, number, number]>): void {
    // Don't plant when CPS multiplier is too high (expensive)
    const grindingCheat = this.context.grindingCheat() ? 1 : 0;
    const cheatGolden = this.context.cheatGolden > 1 ? 1 : 0;
    if (this.context.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
      this.logActivity('Do not buy plants now - it is too expensive.');
      return;
    }

    // Calculate costs and determine what to plant
    let cost = 0;
    const toPlant: Array<[string, number, number]> = [];
    let keepSeed: string | null = null;

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
      if (!garden.isTileUnlocked(whereX, whereY)) continue;
      if (!garden.canPlant(garden.plants[seed])) continue;

      // Check if position is already occupied
      const oldPlant = garden.getTile(whereX, whereY)[0];
      if (oldPlant !== 0) {
        // Slot is already planted - clear it if different plant
        if (garden.plantsById[oldPlant - 1].key !== seed) {
          this.cleanSeed(garden, whereX, whereY);
          keepSeed = seed;
          continue; // Jump over filled slot
        }
      } else {
        // Empty slot - add to planting list
        cost += garden.plants[seed].cost;
        toPlant.push([seed, whereX, whereY]);
      }
    }

    // Cost is in minutes of current CPS
    cost *= 60 * Game.cookiesPs;
    if (cost > Game.cookies - this.context.savingsGoal) return;

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
  private sectorText(sector: number): string {
    if (Game.Objects['Farm'].level > 4) {
      return (sector < 2 ? 'bottom' : 'top') + (sector % 2 ? ' left' : ' right');
    } else if (Game.Objects['Farm'].level === 4) {
      return sector % 2 ? 'left' : 'right';
    } else {
      return 'middle';
    }
  }

  /**
   * Plant seeds to unlock new plants through mutations
   * Original: AutoPlay.planting (lines 1159-1220)
   */
  private planting(garden: any): void {
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
    } else if (garden.parent.bought >= garden.soils['woodchips'].req) {
      soil = 'woodchips'; // best for mutation
    } else if (garden.parent.bought >= garden.soils['fertilizer'].req) {
      soil = 'fertilizer'; // fallback if can't afford woodchips
    }
    this.switchSoil(garden, 0, soil);

    const farmLevel = Game.Objects['Farm'].level;

    // Farm level < 4: Use simple middle column planting (original lines 1192-1198)
    if (farmLevel < 4) {

      const dep = PLANT_DEPENDENCIES[this.plantList[0]];
      const targets: Array<[string, number, number]> = [
        [dep[1] as string, 3, 2],
        [dep[2] as string, 3, 3],
      ];
      if (garden.isTileUnlocked(3, 4)) {
        targets.push([dep[1] as string, 3, 4]);
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
        [dep0[1] as string, 4, 2],
        [dep0[2] as string, 4, 3],
        [dep0[1] as string, 4, 4],
      ]);
      this.plantSeeds(garden, [
        [dep1[1] as string, 1, 2],
        [dep1[2] as string, 1, 3],
        [dep1[1] as string, 1, 4],
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
  private findPlants(garden: any, idx: number): boolean {
    if (this.context.wantAscend) return false; // do not plant before ascend

    let couldPlant = 0;

    // Check if already assigned a plant to this sector
    if (this.plantList[idx] !== 0) {
      const oldPlant = PLANT_DEPENDENCIES[this.plantList[idx]][0];
      this.logActivity(
        `Trying to get plant ${garden.plants[oldPlant].name} on sector ${this.sectorText(idx)}.`
      );
      this.plantCookies = false;
      if (this.havePlant(garden, oldPlant as string)) {
        this.plantList[idx] = 0; // Got it, clear the goal
      } else {
        return true; // Still working on it
      }
    }

    // Try to plant expensive plants first (if possible) as they take longest time
    const chkx = idx % 2 ? 0 : 5;
    const chky = idx > 1 ? 0 : 5;

    if (garden.isTileUnlocked(chkx, chky)) {
      // only plant if the spot is big enough
      // Check for everdaisy
      if (
        !this.havePlant(garden, 'everdaisy') &&
        garden.plants['elderwort'].unlocked &&
        garden.plants['tidygrass'].unlocked
      ) {
        if (this.plantList.includes(2)) {
          couldPlant = 2; // Already planted elsewhere
        } else {
          this.plantList[idx] = 2;
          return true;
        }
      }
      // Check for queenbeetLump
      if (
        !this.havePlant(garden, 'queenbeetLump') &&
        garden.plants['queenbeet'].unlocked
      ) {
        if (this.plantList.includes(1)) {
          couldPlant = 1; // Already planted elsewhere
        } else {
          this.plantList[idx] = 1;
          return true;
        }
      }
    }

    // Plant normal plants - start at index 3 to skip dummy, queenbeetLump, everdaisy
    for (let i = 3; i < PLANT_DEPENDENCIES.length; i++) {
      const plant = PLANT_DEPENDENCIES[i][0];
      if (
        !this.havePlant(garden, plant as string) &&
        garden.plants[PLANT_DEPENDENCIES[i][1]].unlocked &&
        garden.plants[PLANT_DEPENDENCIES[i][2]].unlocked
      ) {
        // Want it
        if (this.plantList.includes(i)) {
          if (!couldPlant) couldPlant = i; // already planted - remember it
        } else {
          this.plantList[idx] = i;
          return true;
        }
      }
    }

    if (!couldPlant) return false;
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
  private plantSector(garden: any, sector: number): void {
    const plantIndex = this.plantList[sector];
    if (plantIndex === 0) return;

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
        this.plantSeed(garden, parent1 as string, X, y);
        this.plantSeed(garden, parent2 as string, X + 2, y);
      }
      // Plant parent1 at top and parent2 at bottom of middle column
      this.plantSeed(garden, parent1 as string, X + 1, Y);
      this.plantSeed(garden, parent2 as string, X + 1, Y + 2);
      return;
    }

    // Special case: everdaisy needs both parents in left and right columns only
    if (targetPlant === 'everdaisy') {
      for (let y = Y; y < Y + 3; y++) {
        this.plantSeed(garden, parent1 as string, X, y);
        this.plantSeed(garden, parent2 as string, X + 2, y);
      }
      return;
    }

    // Default case: Plant only middle column (X+1) with alternating parents
    this.plantSeeds(garden, [
      [parent1 as string, X + 1, Y],
      [parent2 as string, X + 1, Y + 1],
      [parent1 as string, X + 1, Y + 2],
    ]);
  }

  /**
   * Check if ready to sacrifice garden for "Seedless to nay" achievement
   */
  private gardenSacrificeReady(garden: any): boolean {
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
  private gardenReady(garden: any): boolean {
    return (
      Game.Objects['Farm'].level > 8 &&
      garden.plantsUnlockedN === garden.plantsN &&
      this.allUnlocked(GARDEN_UPGRADES)
    );
  }

  /**
   * Clean dying plants from garden to make room for new mutations
   * Original: AutoPlay.cleaningGarden (lines 1395-1412)
   */
  private cleaningGarden(garden: any): void {
    const farmLevel = Game.Objects['Farm'].level;

    if (farmLevel < 4) {
      // Level < 4: Clean middle columns (2 and 4)
      if (this.plantList[0] === 0) return;
      for (let y = 2; y < 5; y++) {
        this.cleanSeed(garden, 2, y);
        this.cleanSeed(garden, 4, y);
      }
    } else if (farmLevel === 4) {
      // Level 4: Clean columns 2 and 3
      for (let y = 2; y < 5; y++) {
        this.cleanSeed(garden, 2, y);
        this.cleanSeed(garden, 3, y);
      }
    } else {
      // Level 5+: Clean all 4 sectors
      for (let sector = 0; sector < 4; sector++) {
        const plantGoal = PLANT_DEPENDENCIES[this.plantList[sector]][0] as string;
        this.cleanSector(garden, sector, plantGoal);
      }
    }
  }

  /**
   * Harvest a plant and clean sector if needed
   */
  private harvest(garden: any, x: number, y: number): void {
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
  private cleanSector(garden: any, sector: number, plant0: string): void {
    if (plant0 === 'dummy') return; // Don't clean when working on mutations

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
  private plantSeed(garden: any, seed: string, whereX: number, whereY: number): void {
    // Don't plant when CPS multiplier is too high (expensive)
    const grindingCheat = this.context.grindingCheat() ? 1 : 0;
    const cheatGolden = this.context.cheatGolden > 1 ? 1 : 0;
    if (this.context.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
      this.logActivity('Do not buy plants now - it is too expensive.');
      return;
    }

    if (!garden.isTileUnlocked(whereX, whereY)) return;

    const oldPlant = garden.getTile(whereX, whereY)[0];
    if (oldPlant !== 0) {
      // Tile is occupied - try to clean if different plant
      if (garden.plantsById[oldPlant - 1].key !== seed) {
        this.cleanSeed(garden, whereX, whereY);
      }
      return;
    }

    if (!garden.canPlant(garden.plants[seed])) return;

    // Check if we can afford (cost is in minutes of current CPS)
    const cost = garden.plants[seed].cost * 60 * Game.cookiesPs;
    if (cost > Game.cookies - this.context.savingsGoal) return;

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
  private cleanSeed(garden: any, x: number, y: number): void {
    if (!garden.isTileUnlocked(x, y)) return;

    const tile = garden.getTile(x, y);
    if (tile[0] === 0) return; // Empty tile

    const plant = garden.plantsById[tile[0] - 1];

    // Don't clean plants that aren't unlocked yet and haven't matured
    if (!plant.unlocked && tile[1] <= plant.mature) return;

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
  private switchSoil(garden: any, sector: number, which: string): void {
    if (sector) return; // Only switch for sector 0 (global soil)

    if (garden.nextSoil > this.context.now) return; // Soil change on cooldown

    const soil = garden.soils[which];
    if (!soil) return;

    // Check if already using this soil or don't have enough farms
    if (garden.soil === soil.id || garden.parent.bought < soil.req) return;

    // Click soil button using FireEvent to trigger game's click handler
    const soilButton = document.getElementById(`gardenSoil-${soil.id}`);
    if (soilButton) {
      soilButton.click();
    }
  }

  /**
   * Check if all upgrades in list are unlocked
   */
  private allUnlocked(upgradeIds: number[]): boolean {
    return upgradeIds.every((id) => Game.UpgradesById[id].bought);
  }

  /**
   * Log activity message
   */
  private logActivity(msg: string): void {
    this.context.addActivity(msg);
  }

  /**
   * Get plant pending status (for AutoPlay.plantPending)
   */
  isPlantPending(): boolean {
    return this.plantPending;
  }

  /**
   * Get current module status for dashboard
   */
  getStatus(): ModuleStatus {
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
    if (this.context.wantAscend) {
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
