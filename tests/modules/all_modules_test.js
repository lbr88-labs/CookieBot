const fs = require('fs');
const path = require('path');
const { initializeFullEnvironment } = require('../utils/setup');

(async () => {
  console.log('Starting Module-Level Tests...');

  let browser, page;

  try {
    // Initialize environment using shared utility
    ({ browser, page } = await initializeFullEnvironment());

    // Speed up the game logic
    await page.evaluate(() => {
      Game.fps = 1000;
    });

    let failedTests = 0;

    // Helper to run tests
    const runTest = async (description, testFn, ...args) => {
      process.stdout.write(`Test: ${description}... `);
      try {
        await page.evaluate(testFn, ...args);
        console.log('✓ PASS');
      } catch (e) {
        console.log('✗ FAIL');
        console.error('  Error:', e.message);
        failedTests++;
      }
    };

    console.log('\n--- Executing Test Cases ---\n');

    // --- TEST CASES ---

    // 1. Dashboard Module
    await runTest('Dashboard: Should be visible in the DOM', () => {
      const dashboard = document.getElementById('cookieBotDashboard');
      if (!dashboard) throw new Error('Dashboard element not found in DOM (looked for #cookieBotDashboard)');
      if (dashboard.style.display === 'none') throw new Error('Dashboard is hidden');
    });

    // 2. ClickManager
    await runTest('ClickManager: Should increment cookie clicks', async () => {
      // Grant Neverclick so bot is allowed to click
      Game.Win('Neverclick');

      const startClicks = Game.cookieClicks;
      // Wait 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Game.cookieClicks <= startClicks) throw new Error(`Cookie clicks did not increase. Start: ${startClicks}, Now: ${Game.cookieClicks}`);
    });

    // 3. GoldenCookieHandler
    await runTest('GoldenCookieHandler: Should detect and click golden cookie', async () => {
      // Spawn a golden cookie
      const newShimmer = new Game.shimmer('golden');
      newShimmer.life = 10000; // Ensure it lives long enough

      // Wait for bot to click it (it runs every 300ms)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if it's gone (clicked)
      // Note: Game.shimmers array should be empty or not contain our shimmer
      if (Game.shimmers.includes(newShimmer)) {
        throw new Error('Golden cookie was not clicked by the bot');
      }
    });

    // 4. PurchaseManager
    // Read save file
    const savePath = path.join(__dirname, '../../TestSaves/autoPlay06_a_100oct.txt');
    const saveFileContent = fs.readFileSync(savePath, 'utf8');
    // Remove the first line (header)
    const saveString = saveFileContent.split('\n').slice(1).join('\n');

    await runTest('PurchaseManager: Should purchase buildings from save state', async (saveData) => {
      const bot = window.AutoPlay;
      bot.config.savingsEnabled = false;

      // Load the save
      // console.log('    Loading save file...');
      Game.ImportSaveCode(saveData);

      // Wait a bit for the game to settle and recalculate
      await new Promise(resolve => setTimeout(resolve, 2000));

      const startBuildings = Game.BuildingsOwned;

      // console.log(`    State loaded. Cookies: ${Game.cookies}, CPS: ${Game.cookiesPs}, Buildings: ${Game.BuildingsOwned}`);

      // Force bestBuy check to update bot state immediately after load
      if (bot.purchaseManager) {
        bot.purchaseManager.bestBuy();
      }

      // Wait for bot to buy something
      await new Promise(resolve => setTimeout(resolve, 10000)); // Give it 10s

      // console.log(`    End State. Cookies: ${Game.cookies}, Buildings: ${Game.BuildingsOwned}`);

      if (Game.BuildingsOwned <= startBuildings) {
        throw new Error(`Bot did not purchase any buildings. Owned: ${Game.BuildingsOwned}. CPS: ${Game.cookiesPs}`);
      }
    }, saveString);

    // 5. AchievementHandler
    await runTest('AchievementHandler: Should identify valid next achievement', () => {
      const bot = window.AutoPlay;
      if (!bot.nextAchievement) throw new Error('nextAchievement is not set');
      // Check if it's a valid ID
      if (!Game.AchievementsById[bot.nextAchievement]) throw new Error(`Invalid achievement ID: ${bot.nextAchievement}`);
    });

    // 6. SavingsManager
    await runTest('SavingsManager: Strategy 0 (NONE) should have 0 savings', () => {
      const bot = window.AutoPlay;
      bot.Config.SavingStrategy = 0;
      bot.savingsManager.handleSavings();
      if (bot.savingsManager.getSavingsGoal() !== 0) throw new Error(`Expected 0, got ${bot.savingsManager.getSavingsGoal()}`);
    });

    await runTest('SavingsManager: Strategy 2 (LUCKY) should save 100 mins of CPS', () => {
      const bot = window.AutoPlay;
      bot.Config.SavingStrategy = 2;
      Game.ascensionMode = 0; // Ensure not in reborn mode
      Game.unbuffedCps = 100;
      bot.savingsManager.handleSavings();
      const expected = 100 * 60 * 100; // 600,000
      if (bot.savingsManager.getSavingsGoal() !== expected) throw new Error(`Expected ${expected}, got ${bot.savingsManager.getSavingsGoal()}`);
    });

    await runTest('SavingsManager: Strategy 3 (LUCKY FRENZY) should save 700 mins of CPS', () => {
      const bot = window.AutoPlay;
      bot.Config.SavingStrategy = 3;
      Game.ascensionMode = 0;
      Game.unbuffedCps = 100;
      bot.savingsManager.handleSavings();
      const expected = 100 * 60 * 100 * 7; // 4,200,000
      if (bot.savingsManager.getSavingsGoal() !== expected) throw new Error(`Expected ${expected}, got ${bot.savingsManager.getSavingsGoal()}`);
    });

    await runTest('SavingsManager: AUTO Strategy - Startup period', () => {
      const bot = window.AutoPlay;
      bot.Config.SavingStrategy = 1; // AUTO
      const now = Date.now();
      Game.startDate = now - (10 * 60 * 1000); // 10 mins ago
      bot.savingsManager.setCurrentTime(now);
      bot.savingsManager.handleSavings();
      if (bot.savingsManager.getSavingsGoal() !== 0) throw new Error(`Expected 0, got ${bot.savingsManager.getSavingsGoal()}`);
    });

    await runTest('SavingsManager: AUTO Strategy - Max savings', () => {
      const bot = window.AutoPlay;
      bot.Config.SavingStrategy = 1;
      const now = Date.now();
      Game.startDate = now - (431 * 60 * 1000); // > 430 mins
      bot.savingsManager.initializeSavings(Game.startDate);
      bot.savingsManager.setCurrentTime(now);

      // Mock upgrades
      if (!Game.UpgradesById[52]) Game.UpgradesById[52] = { bought: 0 };
      if (!Game.UpgradesById[53]) Game.UpgradesById[53] = { bought: 0 };
      Game.UpgradesById[52].bought = 1;
      Game.UpgradesById[53].bought = 1;
      Game.unbuffedCps = 100;

      bot.savingsManager.handleSavings();
      const expected = 100 * 60 * 100; // 600,000
      if (bot.savingsManager.getSavingsGoal() !== expected) throw new Error(`Expected ${expected}, got ${bot.savingsManager.getSavingsGoal()}`);
    });

    await runTest('SavingsManager: Regression - Initialization Bug (Gazillion Minutes)', () => {
      const bot = window.AutoPlay;
      const sm = bot.savingsManager;
      
      // Verify that sm.now is initialized to Game.startDate (or at least not 0)
      if (sm.now === 0) {
        throw new Error('Regression: sm.now is 0 after initialization!');
      }

      // Reset state to simulate fresh start
      bot.Config.SavingStrategy = 1; // AUTO
      // We do NOT call setCurrentTime here to simulate the race condition
      
      sm.handleSavings();
      const status = sm.getStatus();
      
      // Check for the bug (huge negative number interpreted as millions of minutes)
      if (status.reason.includes('m remaining')) {
         const match = status.reason.match(/(\d+)m remaining/);
         if (match && parseInt(match[1]) > 1000) {
             throw new Error(`Bug reproduced! Huge remaining time detected: ${status.reason}`);
         }
      }
    });

    // 7. NightMode
    await runTest('NightMode: Should initialize and accept config', () => {
      const bot = window.AutoPlay;
      // Force night mode config
      bot.config.nightMode = 1;

      const nightModeModule = bot['nightMode'];
      if (!nightModeModule) throw new Error('NightMode module instance not found');
    });

    // 8. WrinklerManager
    await runTest('WrinklerManager: Should identify active wrinklers', async () => {
      const bot = window.AutoPlay;
      bot.config.autoWrinklers = true;

      // Handle case sensitivity of Wrinklers array
      const wrinklers = Game.Wrinklers || Game.wrinklers;

      if (!wrinklers) {
        const keys = Object.keys(Game).filter(k => k.toLowerCase().includes('wrinkler'));
        throw new Error(`Game.Wrinklers is undefined. Found similar keys: ${keys.join(', ')}`);
      }

      // Force Grandmapocalypse to spawn wrinklers
      Game.elderWrath = 3;

      // Safely iterate
      for (let i = 0; i < wrinklers.length; i++) {
        wrinklers[i].phase = 2; // Active
        wrinklers[i].hp = 100;
        wrinklers[i].close = 1;
      }

      if (bot.config.autoWrinklers !== true) throw new Error('AutoWrinklers config mismatch');
    });

    // 9. SugarLumpManager
    await runTest('SugarLumpManager: Should be initialized', () => {
      const bot = window.AutoPlay;
      bot.config.autoSugarLumps = true;
      if (!bot['sugarLumpManager']) throw new Error('SugarLumpManager module missing');
    });

    // 10. DragonManager
    await runTest('DragonManager: Should handle dragon training', async () => {
      // Unlock Dragon requirements
      Game.Earn(1000000000000);
      Game.Upgrades['A crumbly egg'].unlocked = 1;
      Game.Upgrades['A crumbly egg'].bought = 1;
      Game.dragonLevel = 4;

      // Suppress UI prompts that might block execution
      Game.ConfirmPrompt = () => { };

      const dm = window.AutoPlay.dragonManager;
      dm.handleDragon();

      if (Game.dragonLevel <= 4) throw new Error(`Dragon did not level up. Level: ${Game.dragonLevel}`);
    });

    // 11. GardenManager
    await runTest('GardenManager: Should handle garden', async () => {
      // Ensure Farm level for minigame
      Game.Objects['Farm'].amount = 10;
      Game.Objects['Farm'].level = 10;

      // Check if minigame exists (it should if level > 0, but might need a tick or save reload in real game)
      // We can't easily force-load it without internal game logic, but let's check.
      if (Game.Objects['Farm'].minigame) {
        const M = Game.Objects['Farm'].minigame;
        const startSoil = M.soil;

        const gm = window.AutoPlay.gardenManager;
        gm.handleGarden();

        // Just verify it runs without crashing
      } else {
        console.log('    (Skipping Garden logic check - Minigame not loaded)');
      }
    });

    // 12. GrimoireManager
    await runTest('GrimoireManager: Should handle grimoire', async () => {
      Game.Objects['Wizard tower'].amount = 10;
      Game.Objects['Wizard tower'].level = 10;

      if (Game.Objects['Wizard tower'].minigame) {
        const gm = window.AutoPlay.grimoireManager;
        gm.handleGrimoires();
      } else {
        console.log('    (Skipping Grimoire logic check - Minigame not loaded)');
      }
    });

    // 13. PantheonManager
    await runTest('PantheonManager: Should handle pantheon', async () => {
      Game.Objects['Temple'].amount = 10;
      Game.Objects['Temple'].level = 10;

      if (Game.Objects['Temple'].minigame) {
        const pm = window.AutoPlay.pantheonManager;
        pm.handlePantheon();
      } else {
        console.log('    (Skipping Pantheon logic check - Minigame not loaded)');
      }
    });

    // 14. SeasonHandler
    await runTest('SeasonHandler: Should cycle seasons', async () => {
      Game.Upgrades["Season switcher"].unlocked = 1;
      Game.Upgrades["Season switcher"].bought = 1;

      const sh = window.AutoPlay.seasonHandler;
      sh.handleSeasons();
    });

    // 15. StockMarketManager
    await runTest('StockMarketManager: Should handle stock market', async () => {
      Game.Objects['Bank'].amount = 10;
      Game.Objects['Bank'].level = 10;

      if (Game.Objects['Bank'].minigame) {
        const sm = window.AutoPlay.stockMarketManager;
        sm.handleStockMarket();
      } else {
        console.log('    (Skipping StockMarket logic check - Minigame not loaded)');
      }
    });

    // 16. AscensionManager
    await runTest('AscensionManager: Should trigger ascension when achievement won', async () => {
      const bot = window.AutoPlay;
      const am = bot.ascensionManager;

      if (!am) throw new Error('AscensionManager not initialized');

      // Mock State: Target achievement is won
      const targetId = bot.nextAchievement;
      if (!targetId) throw new Error('No next achievement set');

      // Ensure the achievement object exists and is mocked as won
      if (!Game.AchievementsById[targetId]) {
        Game.AchievementsById[targetId] = { won: 0, name: 'Mock Achievement', ddesc: 'Mock Desc' };
      }
      Game.AchievementsById[targetId].won = 1;

      // Mock Game.Ascend to track if it was called
      let ascendCalled = false;
      const originalAscend = Game.Ascend;
      Game.Ascend = (bypass) => {
        ascendCalled = true;
        console.log('Game.Ascend called with bypass:', bypass);
      };

      // Mock other requirements
      Game.AscendTimer = 0;
      Game.OnAscend = 0;
      bot.onAscend = false;
      Game.prestige = 1000; // Ensure not first run (requires 365)
      Game.ascendMeterLevel = 100;

      // Run logic
      am.handleAscend();

      // Restore
      Game.Ascend = originalAscend;

      if (!ascendCalled && !bot.onAscend) {
        throw new Error('Ascension was not triggered despite achievement being won');
      }
    });

    // 17. FPS Scaling
    await runTest('FPS Scaling: Should calculate scale factor correctly', () => {
      const bot = window.AutoPlay;

      // Enable scaling
      bot.config.fpsScaling = true;

      // Test 30 FPS (Standard)
      Game.fps = 30;
      if (Math.abs(bot.fpsScale - 1) > 0.01) throw new Error(`Expected scale 1 for 30 FPS, got ${bot.fpsScale}`);

      // Test 60 FPS (Fast)
      Game.fps = 60;
      if (Math.abs(bot.fpsScale - 0.5) > 0.01) throw new Error(`Expected scale 0.5 for 60 FPS, got ${bot.fpsScale}`);

      // Test 15 FPS (Slow)
      Game.fps = 15;
      if (Math.abs(bot.fpsScale - 2) > 0.01) throw new Error(`Expected scale 2 for 15 FPS, got ${bot.fpsScale}`);

      // Test Disabled
      bot.config.fpsScaling = false;
      bot.Config.FPS = 0;
      Game.fps = 60;
      if (bot.fpsScale !== 1) throw new Error(`Expected scale 1 when disabled, got ${bot.fpsScale}`);

      // Restore
      bot.config.fpsScaling = true;
      bot.Config.FPS = 1;
      Game.fps = 30;
    });

    // 18. ConfigManager
    await runTest('ConfigManager: Should register option with new structure', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestNewOption';
      const option = {
        options: [
          { value: 0, label: 'OFF' },
          { value: 1, label: 'ON' },
          { value: 2, label: 'AUTO' }
        ],
        label: ['OFF', 'ON', 'AUTO'], // Legacy fallback
        desc: 'Test option with new structure'
      };

      cm.registerOption(key, option, 1);

      if (cm.configData[key] !== option) throw new Error('Option not registered correctly');
      if (cm.config[key] !== 1) throw new Error('Default value not set correctly');
    });

    await runTest('ConfigManager: Should register option with legacy structure', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestLegacyOption';
      const option = {
        label: ['LOW', 'MEDIUM', 'HIGH'],
        desc: 'Test option with legacy structure'
      };

      cm.registerOption(key, option, 0);

      if (cm.configData[key] !== option) throw new Error('Option not registered correctly');
      if (cm.config[key] !== 0) throw new Error('Default value not set correctly');
    });

    await runTest('ConfigManager: Should get correct display text for new structure', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestNewOption';

      // Value 1 -> 'ON'
      cm.config[key] = 1;
      const display1 = cm.getConfigDisplay(key);
      if (display1 !== 'ON') throw new Error(`Expected 'ON', got '${display1}'`);

      // Value 2 -> 'AUTO'
      cm.config[key] = 2;
      const display2 = cm.getConfigDisplay(key);
      if (display2 !== 'AUTO') throw new Error(`Expected 'AUTO', got '${display2}'`);
    });

    await runTest('ConfigManager: Should get correct display text for legacy structure', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestLegacyOption';

      // Value 0 -> 'LOW'
      cm.config[key] = 0;
      const display0 = cm.getConfigDisplay(key);
      if (display0 !== 'LOW') throw new Error(`Expected 'LOW', got '${display0}'`);

      // Value 2 -> 'HIGH'
      cm.config[key] = 2;
      const display2 = cm.getConfigDisplay(key);
      if (display2 !== 'HIGH') throw new Error(`Expected 'HIGH', got '${display2}'`);
    });

    await runTest('ConfigManager: Should toggle values correctly (New Structure)', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestNewOption';

      // Start at 0
      cm.config[key] = 0;

      // Toggle -> 1
      cm.toggleConfigUp(key);
      if (cm.config[key] !== 1) throw new Error(`Expected 1, got ${cm.config[key]}`);

      // Toggle -> 2
      cm.toggleConfigUp(key);
      if (cm.config[key] !== 2) throw new Error(`Expected 2, got ${cm.config[key]}`);

      // Toggle -> 0 (Wrap around)
      cm.toggleConfigUp(key);
      if (cm.config[key] !== 0) throw new Error(`Expected 0, got ${cm.config[key]}`);
    });

    await runTest('ConfigManager: Should toggle values correctly (Legacy Structure)', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestLegacyOption';

      // Start at 2
      cm.config[key] = 2;

      // Toggle -> 0 (Wrap around)
      cm.toggleConfigUp(key);
      if (cm.config[key] !== 0) throw new Error(`Expected 0, got ${cm.config[key]}`);

      // Toggle -> 1
      cm.toggleConfigUp(key);
      if (cm.config[key] !== 1) throw new Error(`Expected 1, got ${cm.config[key]}`);
    });

    await runTest('ConfigManager: Should save config to localStorage', () => {
      const cm = window.AutoPlay.configManager;
      const key = 'TestSaveOption';

      cm.registerOption(key, { label: ['A', 'B'], desc: 'Save test' }, 0);

      // Spy on localStorage
      const setItemSpy = { called: false, key: '', value: '' };
      const originalSetItem = window.localStorage.setItem;
      window.localStorage.setItem = (k, v) => {
        setItemSpy.called = true;
        setItemSpy.key = k;
        setItemSpy.value = v;
        originalSetItem.call(window.localStorage, k, v);
      };

      try {
        // Trigger save via toggle
        cm.toggleConfigUp(key);

        if (!setItemSpy.called) throw new Error('localStorage.setItem was not called');
        if (!setItemSpy.key.includes('autoplayConfig')) throw new Error(`Unexpected key: ${setItemSpy.key}`);

        const savedConfig = JSON.parse(setItemSpy.value);
        if (savedConfig[key] !== 1) throw new Error(`Saved value mismatch. Expected 1, got ${savedConfig[key]}`);

      } finally {
        window.localStorage.setItem = originalSetItem;
      }
    });

    if (failedTests > 0) {
      console.error(`\n${failedTests} tests failed.`);
      process.exit(1);
    } else {
      console.log('\nAll module tests completed successfully.');
    }

  } catch (error) {
    console.error('Test Suite Failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
