const fs = require('fs');
const path = require('path');
const { initializeFullEnvironment } = require('../utils/setup');

// Configuration for test cases
const TEST_CASES = [
  {
    filename: 'autoPlay01_covenant.txt',
    name: 'Elder Covenant Strategy',
    description: 'Bot should identify next steps after Elder Covenant achievement',
    // We expect the bot to be running and have a plan
    validate: (data) => {
      if (!data.isInitialized) return 'Bot not initialized';
      if (!data.nextPurchase && !data.nextAchievement) return 'Bot has no plan (no next purchase or achievement)';
      return true;
    }
  },
  {
    filename: 'autoPlay04_valentine.txt',
    name: 'Seasonal Strategy (Valentine)',
    description: 'Bot should handle Valentine season state',
    validate: (data) => {
      if (!data.isInitialized) return 'Bot not initialized';
      // In a season, we might expect specific upgrades or just general progression
      if (data.cps <= 0) return 'Game has 0 CpS';
      return true;
    }
  },
  {
    filename: 'autoPlay06_a_100oct.txt',
    name: 'Late Game Strategy (100 Octillion)',
    description: 'Bot should handle high-number late game state',
    validate: (data) => {
      if (!data.isInitialized) return 'Bot not initialized';
      if (data.cookies < 1e27) return 'Save did not load correctly (cookies too low)';
      return true;
    }
  },
  {
    filename: 'ascend_save.txt',
    name: 'Ascension State',
    description: 'Bot should handle ascension state correctly',
    validate: (data) => {
      if (!data.isInitialized) return 'Bot not initialized';
      // If we are stuck in ascension, we might see specific flags
      // But for now, let's just check if the bot is running
      return true;
    }
  }
];

(async () => {
  console.log('Starting Bot Decision Making Tests...');

  let browser, page;

  try {
    // Initialize environment using shared utility
    ({ browser, page } = await initializeFullEnvironment());

    // --- Run Test Cases ---
    let passed = 0;
    let failed = 0;

    for (const testCase of TEST_CASES) {
      process.stdout.write(`Test: ${testCase.name}... `);

      try {
        // 1. Read Save File
        const savePath = path.join(__dirname, '../../TestSaves', testCase.filename);
        if (!fs.existsSync(savePath)) {
          throw new Error(`Save file not found: ${testCase.filename}`);
        }
        const content = fs.readFileSync(savePath, 'utf8');

        // Extract last save block
        const saveBlocks = content.split('%21END%21')
          .map(block => block.split('\n').filter(l => l.trim() && !l.startsWith('#')).join('').trim())
          .filter(s => s.length > 0);

        if (saveBlocks.length === 0) throw new Error('No valid save data found in file');
        const lastSave = saveBlocks[saveBlocks.length - 1];

        // 2. Reset Bot & Import Save
        await page.evaluate(async (saveData) => {
          if (window.AutoPlay && window.AutoPlay.reset) {
            window.AutoPlay.reset();
          }
          Game.ImportSaveCode(saveData);
          // Re-initialize to restart the bot loop and state
          window.AutoPlay.init();
        }, lastSave);

        // 3. Wait for Bot to Analyze
        // Give it 2 seconds to run a few loops
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 4. Extract Data for Validation
        const botData = await page.evaluate(() => {
          const bot = window.AutoPlay;
          return {
            isInitialized: bot.state.isInitialized,
            nextPurchase: bot.nextPurchase,
            nextAchievement: bot.nextAchievement,
            cookies: Game.cookies,
            cps: Game.cookiesPs,
            season: Game.season
          };
        });

        // 5. Validate
        const result = testCase.validate(botData);
        if (result === true) {
          console.log('✓ PASS');
          // Optional: Log what the bot decided
          // console.log(`   -> Plan: Buy ${botData.nextPurchase || 'Nothing'}, Aim for ${botData.nextAchievement || 'Nothing'}`);
          passed++;
        } else {
          console.log('✗ FAIL');
          console.error(`   Reason: ${result}`);
          console.error(`   Data:`, botData);
          failed++;
        }

      } catch (error) {
        console.log('✗ ERROR');
        console.error(`   ${error.message}`);
        failed++;
      }
    }

    console.log(`\nSummary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);

  } catch (error) {
    console.error('Fatal Error:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
