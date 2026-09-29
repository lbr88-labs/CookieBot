/**
 * Standardized module status reporting interface
 * All managers should implement getStatus() returning this structure
 */
export type ModuleStatusType = 'idle' | 'active' | 'waiting' | 'blocked' | 'disabled' | 'error';
export interface ModuleStatus {
    /** Module name (e.g., "Garden", "Purchases", "Wrinklers") */
    module: string;
    /** Current operational status */
    status: ModuleStatusType;
    /** What the module is currently doing */
    currentAction: string;
    /** Why the module is in this state */
    reason: string;
    /** What the module plans to do next (if applicable) */
    nextAction?: string;
    /** Icon for dashboard display */
    icon?: string;
    /** Additional details (e.g., progress, timers, counts) */
    details?: {
        [key: string]: string | number | boolean;
    };
    /** Progress tracking (e.g., cookies saved, items purchased) */
    progress?: {
        current: number;
        target: number;
        percent: number;
        label?: string;
    };
    /** Time remaining until completion (in milliseconds) */
    timeRemaining?: number;
    /** Color for progress bar (e.g., "#6f6", "#fc6") */
    progressColor?: string;
}
/**
 * Collection of all module statuses
 */
export interface ModuleStatuses {
    clicking?: ModuleStatus;
    buildings?: ModuleStatus;
    upgrades?: ModuleStatus;
    garden?: ModuleStatus;
    wrinklers?: ModuleStatus;
    goldenCookies?: ModuleStatus;
    dragon?: ModuleStatus;
    pantheon?: ModuleStatus;
    grimoire?: ModuleStatus;
    stockMarket?: ModuleStatus;
    sugarLumps?: ModuleStatus;
    savings?: ModuleStatus;
    ascension?: ModuleStatus;
    season?: ModuleStatus;
    nightMode?: ModuleStatus;
    achievements?: ModuleStatus;
}
//# sourceMappingURL=moduleStatus.d.ts.map