import type { Config, AutoPlayContext, ConfigOption } from '../types/autoplay';
export declare class ConfigManager {
    private context;
    private config;
    private configData;
    private configDefault;
    private configPrefix;
    private loadedConfig;
    private optionsByCategory;
    private colorTextPre;
    private colorBlue;
    onDashboardToggle: (() => void) | null;
    constructor(context: AutoPlayContext);
    /**
     * Get the current config object
     */
    getConfig(): Config;
    /**
     * Load raw configuration from localStorage
     */
    private loadRawConfig;
    /**
     * Register a configuration option
     */
    registerOption(key: string, option: ConfigOption, defaultValue: number, category?: string): void;
    /**
     * Save configuration to localStorage
     */
    private saveConfig;
    /**
     * Toggle a configuration option
     */
    private toggleConfig;
    /**
     * Increment a configuration option
     */
    private toggleConfigUp;
    /**
     * Get display text for a configuration option
     */
    private getConfigDisplay;
    /**
     * Update configuration (for external access)
     */
    updateConfig(updates: Partial<Config>): void;
    /**
     * Add menu preferences to the game menu
     */
    addMenuPref(): void;
    /**
     * Set bot mode handler
     */
    private setBotMode;
    /**
     * Set game speed handler
     */
    private setGameSpeed;
    /**
     * Toggle dashboard visibility via config
     */
    private toggleDashboardConfig;
}
//# sourceMappingURL=ConfigManager.d.ts.map