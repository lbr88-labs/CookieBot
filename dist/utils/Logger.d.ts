/**
 * Centralized logging system for CookieBot
 * Provides unified activity logging and status logging across all modules
 */
export interface LoggerCallbacks {
    logAction: (action: string, details?: string) => void;
    logStatus: (type: string, message: string, details?: string) => void;
    addActivity: (activity: string) => boolean;
}
/**
 * Singleton logger instance
 * Provides centralized logging for all modules
 */
declare class LoggerService {
    private static instance;
    private callbacks?;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): LoggerService;
    /**
     * Initialize logger with callbacks from AutoPlay
     * Should be called once during AutoPlay construction
     */
    initialize(callbacks: LoggerCallbacks): void;
    /**
     * Log an action with optional details
     * @param action - Action description
     * @param details - Optional details (e.g., price, count)
     */
    logAction(action: string, details?: string): void;
    /**
     * Log a status update
     * @param type - Status type (e.g., 'wrinkler', 'dragon', 'ascend')
     * @param message - Status message
     * @param details - Optional details
     */
    logStatus(type: string, message: string, details?: string): void;
    /**
     * Add an activity message to the activity log
     * @param activity - Activity description
     * @returns true if activity was added, false if it already existed
     */
    addActivity(activity: string): boolean;
    /**
     * Check if logger is initialized
     */
    isInitialized(): boolean;
}
export declare const Logger: LoggerService;
export {};
//# sourceMappingURL=Logger.d.ts.map