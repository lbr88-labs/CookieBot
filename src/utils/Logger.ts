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
class LoggerService {
  private static instance: LoggerService;
  private callbacks?: LoggerCallbacks;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  /**
   * Initialize logger with callbacks from AutoPlay
   * Should be called once during AutoPlay construction
   */
  initialize(callbacks: LoggerCallbacks): void {
    this.callbacks = callbacks;
  }

  /**
   * Log an action with optional details
   * @param action - Action description
   * @param details - Optional details (e.g., price, count)
   */
  logAction(action: string, details?: string): void {
    if (this.callbacks?.logAction) {
      this.callbacks.logAction(action, details);
    }

    // Check for console logging config
    const bot = (window as any).AutoPlay;
    if (bot && bot.Config && bot.Config.ConsoleLog) {
      console.log(`[Action] ${action}${details ? ': ' + details : ''}`);
    }
  }

  /**
   * Log a status update
   * @param type - Status type (e.g., 'wrinkler', 'dragon', 'ascend')
   * @param message - Status message
   * @param details - Optional details
   */
  logStatus(type: string, message: string, details?: string): void {
    if (this.callbacks?.logStatus) {
      this.callbacks.logStatus(type, message, details);
    }

    // Check for console logging config
    const bot = (window as any).AutoPlay;
    if (bot && bot.Config && bot.Config.ConsoleLog) {
      console.log(`[${type}] ${message}${details ? ': ' + details : ''}`);
    }
  }

  /**
   * Add an activity message to the activity log
   * @param activity - Activity description
   * @returns true if activity was added, false if it already existed
   */
  addActivity(activity: string): boolean {
    let result = true;
    if (this.callbacks?.addActivity) {
      result = this.callbacks.addActivity(activity);
    }

    // Check for console logging config
    const bot = (window as any).AutoPlay;
    if (bot && bot.Config && bot.Config.ConsoleLog) {
      if (result) {
        console.log(`[Activity] ${activity}`);
      }
    }

    return result;
  }

  /**
   * Check if logger is initialized
   */
  isInitialized(): boolean {
    return !!this.callbacks;
  }
}

// Export singleton instance
export const Logger = LoggerService.getInstance();
