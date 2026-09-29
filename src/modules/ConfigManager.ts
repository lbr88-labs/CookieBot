import type { Config, ConfigData, AutoPlayContext, ConfigOption } from '../types/autoplay';

declare const Game: any;

export class ConfigManager {
  private context: AutoPlayContext;

  // Configuration system
  private config: Config = {};
  private configData: ConfigData = {};
  private configDefault: Config = {};
  private configPrefix = 'autoplayConfig';
  private loadedConfig: Config = {};
  private optionsByCategory: { [category: string]: string[] } = {
    'General': [],
    'Cheating': [],
    'Display': [],
    'Logging': []
  };

  // Display utilities
  private colorTextPre = 'color: ';
  private colorBlue = '#4169E1';

  // Callbacks
  public onDashboardToggle: (() => void) | null = null;

  constructor(context: AutoPlayContext) {
    this.context = context;
    this.loadRawConfig();
  }

  /**
   * Get the current config object
   */
  getConfig(): Config {
    return this.config;
  }

  /**
   * Load raw configuration from localStorage
   */
  private loadRawConfig(): void {
    try {
      const stored = window.localStorage.getItem(this.configPrefix);
      if (stored != null) {
        this.loadedConfig = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load config:', e);
    }
  }

  /**
   * Register a configuration option
   */
  registerOption(key: string, option: ConfigOption, defaultValue: number, category: string = 'General'): void {
    this.configData[key] = option;
    this.configDefault[key] = defaultValue;

    // Add to category list if not already there
    if (!this.optionsByCategory[category]) {
      this.optionsByCategory[category] = [];
    }
    if (!this.optionsByCategory[category].includes(key)) {
      this.optionsByCategory[category].push(key);
    }

    // Determine max value based on option type
    let maxVal = 0;
    if (option.options) {
      maxVal = option.options.length;
    } else if (Array.isArray(option.label)) {
      maxVal = option.label.length;
    }

    // Apply value from loaded config or default
    if (typeof this.loadedConfig[key] !== 'undefined') {
      // Validate range
      if (this.loadedConfig[key] >= 0 && this.loadedConfig[key] < maxVal) {
        this.config[key] = this.loadedConfig[key];
      } else {
        this.config[key] = defaultValue;
      }
    } else {
      this.config[key] = defaultValue;
    }
  }

  /**
   * Save configuration to localStorage
   */
  private saveConfig(config: Config): void {
    try {
      // Create a copy and remove non-persistent settings
      const configToSave = { ...config };
      delete configToSave['GameSpeed'];
      
      window.localStorage.setItem(this.configPrefix, JSON.stringify(configToSave));
    } catch (e) {
      console.error('Failed to save config:', e);
    }
  }

  /**
   * Toggle a configuration option
   */
  private toggleConfig(configKey: string): void {
    this.toggleConfigUp(configKey);
    const element = document.getElementById(this.configPrefix + configKey);
    if (element) {
      element.className = this.config[configKey] ? 'option' : 'option off';
    }
  }

  /**
   * Increment a configuration option
   */
  private toggleConfigUp(configKey: string): void {
    const option = this.configData[configKey];
    let maxVal = 0;

    if (option.options) {
      maxVal = option.options.length;
    } else if (Array.isArray(option.label)) {
      maxVal = option.label.length;
    }

    this.config[configKey]++;
    if (this.config[configKey] >= maxVal) {
      this.config[configKey] = 0;
    }

    const element = document.getElementById(this.configPrefix + configKey);
    if (element) {
      element.innerHTML = this.getConfigDisplay(configKey);
    }
    this.saveConfig(this.config);
  }

  /**
   * Get display text for a configuration option
   */
  private getConfigDisplay(configKey: string): string {
    const option = this.configData[configKey];
    const value = this.config[configKey];

    if (option.options && option.options[value]) {
      return option.options[value].label;
    } else if (Array.isArray(option.label) && option.label[value]) {
      return option.label[value];
    }

    return 'Unknown';
  }

  /**
   * Update configuration (for external access)
   */
  updateConfig(updates: Partial<Config>): void {
    for (const key in updates) {
      const val = updates[key];
      if (typeof val === 'number') {
        this.config[key] = val;
      }
    }
    this.saveConfig(this.config);
  }

  /**
   * Add menu preferences to the game menu
   */
  addMenuPref(): void {
    const header = (text: string): HTMLElement => {
      const div = document.createElement('div');
      div.className = 'listing';
      div.style.padding = '5px 16px';
      div.style.opacity = '0.7';
      div.style.fontSize = '17px';
      div.style.fontFamily = '"Kavoon", Georgia, serif';
      div.textContent = text;
      return div;
    };

    const frag = document.createDocumentFragment();
    const div = document.createElement('div');
    div.className = `title ${this.colorTextPre}${this.colorBlue}`;
    div.textContent = 'Cookiebot Options';
    frag.appendChild(div);

    const listing = (configKey: string, clickFunc?: () => void): HTMLElement => {
      const div = document.createElement('div');
      div.className = 'listing';
      const a = document.createElement('a');
      a.className = 'option';
      if (this.config[configKey] === 0) {
        a.className = 'option off';
      }
      a.id = this.configPrefix + configKey;
      a.onclick = clickFunc || (() => this.toggleConfig(configKey));
      a.textContent = this.getConfigDisplay(configKey);
      div.appendChild(a);
      const label = document.createElement('label');
      label.textContent = this.configData[configKey].desc;
      div.appendChild(label);
      return div;
    };

    // Render options by category
    // Order: General, Cheating, Display, Logging, Others
    const categories = ['General', 'Cheating', 'Display', 'Logging'];

    // Add any other categories that might have been registered
    for (const cat in this.optionsByCategory) {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }

    for (const category of categories) {
      const options = this.optionsByCategory[category];
      if (options && options.length > 0) {
        if (category !== 'General') {
          frag.appendChild(header(category));
        }

        for (const key of options) {
          // Special handlers for specific keys
          let handler: (() => void) | undefined;

          if (key === 'BotMode') handler = () => this.setBotMode();
          else if (key === 'ShowDashboard') handler = () => this.toggleDashboardConfig();
          else if (key === 'GameSpeed') handler = () => this.setGameSpeed();

          frag.appendChild(listing(key, handler));
        }
      }
    }

    const menu = document.getElementById('menu');
    if (menu && menu.childNodes[2]) {
      const menuSection = menu.childNodes[2] as HTMLElement;
      const lastChild = menuSection.childNodes[menuSection.childNodes.length - 1];
      menuSection.insertBefore(frag, lastChild);
    }
  }

  /**
   * Set bot mode handler
   */
  private setBotMode(): void {
    this.toggleConfig('BotMode');
    const modeName = this.configData.BotMode.label[this.config.BotMode];
    if (this.context && this.context.info) {
      this.context.info(`The bot has changed mode to ${modeName}`);
      this.context.logStatus('mode', `Mode: ${modeName}`);
    }
  }

  /**
   * Set game speed handler
   */
  private setGameSpeed(): void {
    this.toggleConfig('GameSpeed');
    const index = this.config.GameSpeed;
    // Map index to FPS values: 0->30, 1->60, 2->144, 3->300
    const fpsMap = [30, 60, 144, 300];
    const newFps = fpsMap[index] || 30;
    
    if (typeof Game !== 'undefined') {
      Game.fps = newFps;
    }
    
    if (this.context && this.context.info) {
      this.context.info(`Game speed set to ${newFps} FPS`);
    }
  }

  /**
   * Toggle dashboard visibility via config
   */
  private toggleDashboardConfig(): void {
    this.toggleConfig('ShowDashboard');
    const dashboard = document.getElementById('cookieBotDashboard');
    if (dashboard) {
      dashboard.style.display = this.config.ShowDashboard ? 'block' : 'none';
      if (this.onDashboardToggle) {
        this.onDashboardToggle();
      }
    }
  }
}
