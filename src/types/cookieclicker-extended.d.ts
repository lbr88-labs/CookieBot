// Extended type definitions for Cookie Clicker
// These are additions to the main cookieclicker.d.ts file

declare global {
  interface CookieClickerGame {
    bakeryName: string;
    milkProgress: number;
    milkHd: number;
    windowW: number;
    tickerTooNarrow: number;
    prestige: number;
    ascendMeterPercent: number;

    Notify: (title: string, message: string, type?: number, duration?: number) => void;
    Win: (achievementName: string) => void;
    ClickTinyCookie: () => void;
    bakeryNamePrompt: () => void;
    ConfirmPrompt: () => void;
    promptGiftSend: () => void;
    promptGiftRedeem: () => void;
    Has: (upgradeName: string) => boolean;
    hasBuff: (buffName: string) => boolean;
    RemoveAchiev: (achievementName: string) => void;
    AssignPermanentSlot: (slot: number) => void;

    LeftBackground: {
      canvas: HTMLCanvasElement;
    };
    bakeryNameL: {
      textContent: string;
    };

    YouCustomizer: {
      load: (genes: string, triggerNotification: boolean) => void;
      offsetGene: (gene: string, offset: number) => void;
    };
  }

  interface Achievement {
    ddesc: string;
    click: () => void;
  }
}

export {};
