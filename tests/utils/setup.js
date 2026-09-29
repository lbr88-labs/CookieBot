const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Launches a configured Puppeteer browser instance
 */
async function launchBrowser(options = {}) {
  const headless = options.headless !== undefined ? options.headless : "new";
  const browserType = options.browser || 'chrome';

  const launchOptions = {
    headless: headless,
    args: [
      '--mute-audio',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1920,1080'
    ]
  };

  if (options.userDataDir) {
    launchOptions.userDataDir = options.userDataDir;
  }

  if (browserType === 'firefox') {
    launchOptions.browser = 'firefox';
    // Firefox doesn't support "new" headless mode yet, use boolean
    if (headless === "new") launchOptions.headless = true;
  }

  return await puppeteer.launch(launchOptions);
}

/**
 * Creates a new page with request interception (caching) and user agent set
 */
async function setupPage(browser, options = {}) {
  const page = await browser.newPage();

  // Set appropriate User Agent based on browser type
  if (options.browser === 'firefox') {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0');
  } else {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  }

  // Basic Stealth: Hide WebDriver property and other automation flags
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });

    // Mock plugins to look more like a real browser
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });

    // Mock languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  });

  // Request Interception & Caching - DISABLED to avoid Cloudflare detection
  // await page.setRequestInterception(true);
  // const cache = new Map();

  // page.on('request', request => {
  //   const url = request.url();
  //   if (cache.has(url)) {
  //     const cached = cache.get(url);
  //     const headers = {};
  //     const allowedHeaders = ['content-type', 'access-control-allow-origin', 'last-modified', 'etag', 'cache-control'];
  //     for (const [key, value] of Object.entries(cached.headers)) {
  //       if (allowedHeaders.includes(key.toLowerCase())) headers[key] = value;
  //     }
  //     request.respond({ status: cached.status, headers, body: cached.body });
  //     return;
  //   }
  //   request.continue();
  // });

  // page.on('response', async response => {
  //   const url = response.url();
  //   if ((url.includes('dashnet.org') || url.includes('CookieMonster')) && response.ok()) {
  //     try {
  //       const buffer = await response.buffer();
  //       cache.set(url, { status: response.status(), headers: response.headers(), body: buffer });
  //     } catch (e) { }
  //   }
  // });

  // Filter logs
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Failed to load resource') && text.includes('403')) return;
    if (options.logConsole) {
      console.log('BROWSER:', text);
    }
  });

  return page;
}

/**
 * Loads the Cookie Clicker game
 */
async function loadGame(page) {
  console.log('Loading Cookie Clicker...');
  try {
    await page.goto('https://orteil.dashnet.org/cookieclicker/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (e) {
    // Ignore NS_BINDING_ABORTED which happens during Cloudflare redirects/reloads
    if (e.message.includes('NS_BINDING_ABORTED') || e.message.includes('Navigation failed')) {
      console.log('Navigation interrupted (likely Cloudflare), waiting for game load...');
    } else {
      throw e;
    }
  }

  // Wait for the game object to be available
  try {
    await page.waitForFunction(() => typeof Game !== 'undefined' && Game.ready, { timeout: 120000 }); // Increased timeout for manual verification
  } catch (e) {
    console.log('Timed out waiting for Game.ready. If you are stuck on Cloudflare, please verify manually.');
    throw e;
  }
}

/**
 * Injects Cookie Monster mod
 */
async function injectCookieMonster(page) {
  console.log('Injecting Cookie Monster...');
  await page.evaluate(async () => {
    Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js');
  });
  await page.waitForFunction(() => typeof (window).CookieMonsterData !== 'undefined', { timeout: 30000 });
}

/**
 * Injects the CookieBot from the dist folder
 */
async function injectBot(page) {
  console.log('Injecting CookieBot...');
  const botPath = path.join(__dirname, '../../dist/cookieAutoPlayBeta-latest.js');
  const botCode = fs.readFileSync(botPath, 'utf8');
  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, botCode);
  await page.waitForFunction(() => typeof (window).AutoPlay !== 'undefined', { timeout: 5000 });
}

/**
 * Full initialization helper: Browser -> Page -> Game -> Mods -> Bot
 * Returns { browser, page }
 */
async function initializeFullEnvironment(options = {}) {
  const browser = await launchBrowser(options);
  try {
    const page = await setupPage(browser, options);
    await loadGame(page);
    await injectCookieMonster(page);
    await injectBot(page);
    return { browser, page };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

module.exports = {
  launchBrowser,
  setupPage,
  loadGame,
  injectCookieMonster,
  injectBot,
  initializeFullEnvironment
};
