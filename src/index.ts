/**
 * CookieBot - Automated Cookie Clicker Bot
 * Entry point for the application
 */

import AutoPlay from './AutoPlay';

// Export AutoPlay class as default for webpack
export default AutoPlay;

// Auto-initialize when loaded and expose instance globally
if (typeof Game !== 'undefined' && Game.ready) {
  const bot = new AutoPlay();
  (globalThis as any).AutoPlay = bot;
  bot.init();
} else {
  console.log('CookieBot: Waiting for Cookie Clicker to be ready...');
  const checkReady = setInterval(() => {
    if (typeof Game !== 'undefined' && Game.ready) {
      clearInterval(checkReady);
      const bot = new AutoPlay();
      (globalThis as any).AutoPlay = bot;
      bot.init();
    }
  }, 1000);
}
