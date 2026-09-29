/**
 * Utility helper functions used across modules
 */

import { UPGRADE_IDS } from '../constants/gameIds';

/**
 * Format large numbers with suffixes (Million, Billion, etc.)
 * Used as fallback when Beautify function is not available
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + ' billion';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + ' million';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + ' thousand';
  }
  return num.toFixed(0);
}

/**
 * Format time duration into human-readable string
 * Examples: "30 seconds", "5.3 minutes", "2.5 hours", "1.2 days"
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(0) + ' seconds';
  } else if (seconds < 3600) {
    return (seconds / 60).toFixed(1) + ' minutes';
  } else if (seconds < 86400) {
    return (seconds / 3600).toFixed(1) + ' hours';
  } else {
    return (seconds / 86400).toFixed(1) + ' days';
  }
}

/**
 * Format time duration into short format (e.g., "5m 30s")
 */
export function formatTimeShort(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get current timestamp in milliseconds
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate an array of integers from start to end (inclusive)
 * Example: range(1, 5) returns [1, 2, 3, 4, 5]
 */
export function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Set a deadline value, only updating if the new value is earlier
 */
export function setDeadline(currentDeadline: number, newDeadline: number): number {
  if (currentDeadline > newDeadline) {
    return newDeadline;
  }
  return currentDeadline;
}

/**
 * Get value from localStorage safely
 */
export function localStorageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return null;
  }
}

/**
 * Set value in localStorage safely
 */
export function localStorageSet(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

/**
 * Append to a localStorage value safely
 */
export function localStorageAppend(key: string, value: string): boolean {
  try {
    const before = window.localStorage.getItem(key) || '';
    window.localStorage.setItem(key, before + value);
    return true;
  } catch (e) {
    console.error('Error appending to localStorage:', e);
    return false;
  }
}

/**
 * Check if a string contains another string
 */
export function includes(haystack: string, needle: string): boolean {
  return haystack.includes(needle);
}

/**
 * Strip HTML tags from a string
 */
export function stripHtmlTags(html: string, tag: string): string {
  const regex = new RegExp(`<${tag}>.*?</${tag}>`, 'ig');
  return html.replace(regex, '');
}

/**
 * Show an in-game notification and log to debug
 * Original: AutoPlay.info(s)
 */
export function info(message: string): void {
  const Game = (globalThis as any).Game;
  if (Game && Game.Notify) {
    Game.Notify('CookieBot', message, 1, 100);
  }
  debugLogging('### ' + message);
}

/**
 * Append debug log entry to localStorage
 * Original: AutoPlay.debugLogging(s)
 */
export function debugLogging(message: string, version: string = '2.052.3'): void {
  try {
    const before = window.localStorage.getItem('autoplayLog') || '';
    const toAdd = `#debug logging autoplay V${version}: ${message}\n`;
    window.localStorage.setItem('autoplayLog', before + toAdd);
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Save game state to log (for important stages)
 * Original: AutoPlay.logging()
 */
export function logging(loggingInfo: number, version: string = '2.052.3'): void {
  if (!loggingInfo) return;

  try {
    const Game = (globalThis as any).Game;
    const before = window.localStorage.getItem('autoplayLog') || '';
    const toAdd = `#logging autoplay V${version} with ${loggingInfo}\n${Game.WriteSave(1)}\n`;
    window.localStorage.setItem('autoplayLog', before + toAdd);
  } catch (e) {
    // Silently fail if localStorage or Game.WriteSave unavailable
  }
}

/**
 * Clear the autoplay log
 * Original: AutoPlay.cleanLog()
 */
export function cleanLog(): void {
  try {
    window.localStorage.setItem('autoplayLog', '');
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Display the autoplay log in a game prompt
 * Original: AutoPlay.showLog()
 */
export function showLog(): void {
  const Game = (globalThis as any).Game;
  let theLog = '';

  try {
    theLog = window.localStorage.getItem('autoplayLog') || '';
  } catch (e) {
    theLog = '';
  }

  if (Game && Game.Prompt) {
    Game.Prompt(
      '<h3>Cookie Bot Log</h3><div class="block">' +
        'This is the log of the bot with saves at important stages.<br>' +
        'Copy it and use it as you like.</div>' +
        '<div class="block"><textarea id="textareaPrompt" ' +
        'style="width:100%;height:128px;" readonly>' +
        theLog +
        '</textarea></div>',
      ['All done!']
    );
  }
}

/**
 * Speed up game notifications (make them disappear faster)
 * Original: AutoPlay.handleNotes()
 */
export function handleNotes(): void {
  const Game = (globalThis as any).Game;
  if (!Game || !Game.Notes) return;

  for (const i in Game.Notes) {
    if (Game.Notes[i].quick === 0) {
      Game.Notes[i].life = 2000 * Game.fps;
      Game.Notes[i].quick = 1;
    }
  }
}

/**
 * Analyze and report missing achievements, upgrades, and lumps
 * Original: AutoPlay.status(print)
 *
 * @param print - If true, shows notifications for each missing item
 * @returns Object with counts of missing items
 */
export function status(
  print: boolean = false
): {
  achievements: number;
  shadowAchievements: number;
  upgrades: number;
  lumps: number;
} {
  const Game = (globalThis as any).Game;
  let ach = 0;
  let sach = 0;
  let up = 0;
  let lum = 0;

  // Upgrades to skip checking (grandmapocalypse, chocolate egg)
  const nonUp = [
    UPGRADE_IDS.ONE_MIND,
    UPGRADE_IDS.EXOTIC_NUTS,
    UPGRADE_IDS.COMMUNAL_BRAINSWEEP,
    UPGRADE_IDS.ARCANE_SUGAR,
    UPGRADE_IDS.CHOCOLATE_EGG
  ];

  // Check achievements
  for (const a in Game.Achievements) {
    const me = Game.Achievements[a];
    if (!me.won && me.pool !== 'dungeon') {
      // Missing achievement
      if (print) {
        // const desc = me.ddesc.replace(/<q>.*?<\/q>/gi, '');
        // info(`Missing achievement #${me.id}: ${desc}`);
      }
      if (me.pool === 'shadow') sach++;
      ach++;
    }
  }

  // Check upgrades
  for (const i in Game.Upgrades) {
    const me = Game.Upgrades[i];
    if (!me.bought && me.pool !== 'debug' && me.pool !== 'toggle') {
      if (Game.resets && nonUp.includes(me.id)) continue;
      if (print) {
        // info(`Upgrade ${me.name} is missing.`);
      }
      up++;
    }
  }

  // Check sugar lumps needed for buildings
  for (const o in Game.Objects) {
    const me = Game.Objects[o];
    let maxl = 10;
    let myl = 0;
    if (me.id === 0) maxl = 12; // Cursors need level 12

    // Calculate lumps needed for remaining levels
    for (let l = me.level + 1; l <= maxl; l++) {
      myl += l;
    }

    if (print && myl) {
      // info(`${myl} sugar lumps missing for ${me.name}.`);
    }
    lum += myl;
  }

  // Subtract current lumps
  lum -= Game.lumps;
  if (lum < 0) lum = 0;

  return {
    achievements: ach,
    shadowAchievements: sach,
    upgrades: up,
    lumps: lum,
  };
}
