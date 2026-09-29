const fs = require('fs');
const path = require('path');
const { initializeFullEnvironment } = require('./utils/setup');

(async () => {
  console.log('Starting E2E Test...');

  let browser, page;

  try {
    // Initialize environment using shared utility
    // Note: initializeFullEnvironment already loads the game, injects Cookie Monster, and injects the Bot
    ({ browser, page } = await initializeFullEnvironment());

    // Enable console logging from the browser to the node terminal
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Failed to load resource') && text.includes('403')) {
        console.log('BROWSER [403 ERROR]:', text);
      } else {
        console.log('BROWSER:', text);
      }
    });

    // Log 403 responses to identify the blocked resources
    page.on('response', response => {
      if (response.status() === 403) {
        console.log(`NETWORK [403]: ${response.url()}`);
      }
    });

    // 4. Load a Test Save
    // Using autoPlay01_covenant.txt as a baseline test
    const savePath = path.join(__dirname, '../TestSaves/autoPlay01_covenant.txt');
    if (!fs.existsSync(savePath)) {
      throw new Error(`Save file not found at ${savePath}`);
    }
    const saveString = fs.readFileSync(savePath, 'utf8').trim();

    console.log('Importing save file...');
    await page.evaluate((save) => {
      Game.ImportSaveCode(save);
    }, saveString);

    // Wait a moment for save to apply
    await new Promise(r => setTimeout(r, 1000));

    // 6. Verify Bot Initialization
    console.log('Verifying bot initialization...');

    // Wait for AutoPlay global to exist
    await page.waitForFunction(() => typeof (window).AutoPlay !== 'undefined', { timeout: 5000 });

    // Check if bot is running
    const botStatus = await page.evaluate(() => {
      // In index.ts, window.AutoPlay is assigned the INSTANCE of the bot
      // (globalThis as any).AutoPlay = bot;

      const botInstance = (window).AutoPlay;

      if (botInstance && typeof botInstance === 'object') {
        // Check for version property on the instance or its constructor
        // AutoPlay.version is static, so we access it via constructor
        const version = botInstance.constructor.version || 'unknown';

        return {
          exists: true,
          version: version,
          isInitialized: botInstance.state ? botInstance.state.isInitialized : false
        };
      }
      return { exists: false };
    });

    if (botStatus.exists) {
      console.log(`✓ Bot class found. Version: ${botStatus.version}`);
    } else {
      throw new Error('Bot class AutoPlay not found in window context.');
    }

    // 7. Run for a short duration to check for crashes
    console.log('Running game loop for 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));

    console.log('✓ Test Passed: Bot loaded and ran without crashing.');

  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
