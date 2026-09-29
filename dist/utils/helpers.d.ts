/**
 * Utility helper functions used across modules
 */
/**
 * Format large numbers with suffixes (Million, Billion, etc.)
 * Used as fallback when Beautify function is not available
 */
export declare function formatNumber(num: number): string;
/**
 * Format time duration into human-readable string
 * Examples: "30 seconds", "5.3 minutes", "2.5 hours", "1.2 days"
 */
export declare function formatTime(seconds: number): string;
/**
 * Format time duration into short format (e.g., "5m 30s")
 */
export declare function formatTimeShort(seconds: number): string;
/**
 * Clamp a value between min and max
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Get current timestamp in milliseconds
 */
export declare function getTimestamp(): number;
/**
 * Sleep for specified milliseconds
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Generate an array of integers from start to end (inclusive)
 * Example: range(1, 5) returns [1, 2, 3, 4, 5]
 */
export declare function range(start: number, end: number): number[];
/**
 * Set a deadline value, only updating if the new value is earlier
 */
export declare function setDeadline(currentDeadline: number, newDeadline: number): number;
/**
 * Get value from localStorage safely
 */
export declare function localStorageGet(key: string): string | null;
/**
 * Set value in localStorage safely
 */
export declare function localStorageSet(key: string, value: string): boolean;
/**
 * Append to a localStorage value safely
 */
export declare function localStorageAppend(key: string, value: string): boolean;
/**
 * Check if a string contains another string
 */
export declare function includes(haystack: string, needle: string): boolean;
/**
 * Strip HTML tags from a string
 */
export declare function stripHtmlTags(html: string, tag: string): string;
/**
 * Show an in-game notification and log to debug
 * Original: AutoPlay.info(s)
 */
export declare function info(message: string): void;
/**
 * Append debug log entry to localStorage
 * Original: AutoPlay.debugLogging(s)
 */
export declare function debugLogging(message: string, version?: string): void;
/**
 * Save game state to log (for important stages)
 * Original: AutoPlay.logging()
 */
export declare function logging(loggingInfo: number, version?: string): void;
/**
 * Clear the autoplay log
 * Original: AutoPlay.cleanLog()
 */
export declare function cleanLog(): void;
/**
 * Display the autoplay log in a game prompt
 * Original: AutoPlay.showLog()
 */
export declare function showLog(): void;
/**
 * Speed up game notifications (make them disappear faster)
 * Original: AutoPlay.handleNotes()
 */
export declare function handleNotes(): void;
/**
 * Analyze and report missing achievements, upgrades, and lumps
 * Original: AutoPlay.status(print)
 *
 * @param print - If true, shows notifications for each missing item
 * @returns Object with counts of missing items
 */
export declare function status(print?: boolean): {
    achievements: number;
    shadowAchievements: number;
    upgrades: number;
    lumps: number;
};
//# sourceMappingURL=helpers.d.ts.map