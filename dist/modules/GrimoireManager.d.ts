/**
 * Manages Grimoire (Wizard Tower minigame) spell casting
 *
 * The Grimoire allows casting spells that cost magic (mana) and recharge over time.
 * Key spells:
 * - Hand of Fate: Summons a golden cookie (can backfire into sugar lump)
 * - Conjure Baked Goods: Instant cookies (normally not worth it)
 *
 * Strategy:
 * - Cast Hand of Fate when we have 2+ golden cookies to get Four-leaf cookie achievement
 * - Cast Hand of Fate when at 95%+ magic to get backfire sugar lumps
 * - Cast spells during high CpS multiplier (>100x) to maximize value
 * - Use lump refill when we have 100+ lumps and canUseLumps
 */
import type { ModuleStatus } from '../types/moduleStatus';
import type { AutoPlayContext } from '../types/autoplay';
export declare class GrimoireManager {
    private context;
    constructor(context: AutoPlayContext);
    /**
     * Main handler - called in high-activity phase (when hyperActive or deadline reached)
     * Casts grimoire spells when beneficial
     */
    handleGrimoires(): void;
    /**
  
     * Get current grimoire manager status
     */
    getStatus(): ModuleStatus;
}
//# sourceMappingURL=GrimoireManager.d.ts.map