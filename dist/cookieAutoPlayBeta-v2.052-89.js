/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// UNUSED EXPORTS: default

;// ./src/constants/gameIds.ts
/**
 * Game object IDs for Cookie Clicker
 *
 * These constants provide type-safe access to game objects by ID.
 * Using constants instead of magic numbers improves code readability
 * and prevents typos.
 */
// ==================== Achievements ====================
const ACHIEVEMENT_IDS = {
    WAKE_AND_BAKE: 0, // Wake and bake
    MAKING_SOME_DOUGH: 1, // Making some dough
    SO_BAKED_RIGHT_NOW: 2, // So baked right now
    FLEDGLING_BAKERY: 3, // Fledgling bakery
    AFFLUENT_BAKERY: 4, // Affluent bakery
    WORLDFAMOUS_BAKERY: 5, // World-famous bakery
    COSMIC_BAKERY: 6, // Cosmic bakery
    GALACTIC_BAKERY: 7, // Galactic bakery
    UNIVERSAL_BAKERY: 8, // Universal bakery
    TIMELESS_BAKERY: 9, // Timeless bakery
    INFINITE_BAKERY: 10, // Infinite bakery
    IMMORTAL_BAKERY: 11, // Immortal bakery
    YOU_CAN_STOP_NOW: 13, // You can stop now
    COOKIES_ALL_THE_WAY_DOWN: 14, // Cookies all the way down
    OVERDOSE: 15, // Overdose
    CASUAL_BAKING: 16, // Casual baking
    HARDCORE_BAKING: 17, // Hardcore baking
    STEADY_TASTY_STREAM: 18, // Steady tasty stream
    COOKIE_MONSTER: 19, // Cookie monster
    MASS_PRODUCER: 20, // Mass producer
    COOKIE_VORTEX: 21, // Cookie vortex
    COOKIE_PULSAR: 22, // Cookie pulsar
    COOKIE_QUASAR: 23, // Cookie quasar
    OH_HEY_YOU: 24, // Oh hey, you\
    SACRIFICE: 26, // Sacrifice
    OBLIVION: 27, // Oblivion
    FROM_SCRATCH: 28, // From scratch
    NEVERCLICK: 29, // Neverclick
    CLICKTASTIC: 30, // Clicktastic
    CLICKATHLON: 31, // Clickathlon
    CLICKOLYMPICS: 32, // Clickolympics
    CLICKORAMA: 33, // Clickorama
    CLICK: 34, // Click
    DOUBLECLICK: 35, // Double-click
    MOUSE_WHEEL: 36, // Mouse wheel
    OF_MICE_AND_MEN: 37, // Of Mice and Men
    THE_DIGITAL: 38, // The Digital
    JUST_WRONG: 39, // Just wrong
    GRANDMA: 40, // Grandma\
    SLOPPY_KISSES: 41, // Sloppy kisses
    RETIREMENT_HOME: 42, // Retirement home
    BOUGHT_THE_FARM: 43, // Bought the farm
    REAP_WHAT_YOU_SOW: 44, // Reap what you sow
    FARM_ILL: 45, // Farm ill
    PRODUCTION_CHAIN: 46, // Production chain
    INDUSTRIAL_REVOLUTION: 47, // Industrial revolution
    GLOBAL_WARMING: 48, // Global warming
    YOU_KNOW_THE_DRILL: 49, // You know the drill
    EXCAVATION_SITE: 50, // Excavation site
    HOLLOW_THE_PLANET: 51, // Hollow the planet
    EXPEDITION: 52, // Expedition
    GALACTIC_HIGHWAY: 53, // Galactic highway
    FAR_FAR_AWAY: 54, // Far far away
    TRANSMUTATION: 55, // Transmutation
    TRANSMOGRIFICATION: 56, // Transmogrification
    GOLD_MEMBER: 57, // Gold member
    A_WHOLE_NEW_WORLD: 58, // A whole new world
    NOW_YOU: 59, // Now you\
    DIMENSIONAL_SHIFT: 60, // Dimensional shift
    TIME_WARP: 61, // Time warp
    ALTERNATE_TIMELINE: 62, // Alternate timeline
    REWRITING_HISTORY: 63, // Rewriting history
    ONE_WITH_EVERYTHING: 64, // One with everything
    MATHEMATICIAN: 65, // Mathematician
    BASE_10: 66, // Base 10
    GOLDEN_COOKIE: 67, // Golden cookie
    LUCKY_COOKIE: 68, // Lucky cookie
    A_STROKE_OF_LUCK: 69, // A stroke of luck
    CHEATED_COOKIES_TASTE_AWFUL: 70, // Cheated cookies taste awful
    UNCANNY_CLICKER: 71, // Uncanny clicker
    BUILDER: 72, // Builder
    ARCHITECT: 73, // Architect
    ENHANCER: 74, // Enhancer
    AUGMENTER: 75, // Augmenter
    COOKIEDUNKER: 76, // Cookie-dunker
    FORTUNE: 77, // Fortune
    TRUE_NEVERCLICK: 78, // True Neverclick
    ELDER_NAP: 79, // Elder nap
    ELDER_SLUMBER: 80, // Elder slumber
    ELDER: 81, // Elder
    ELDER_CALM: 82, // Elder calm
    ENGINEER: 83, // Engineer
    LEPRECHAUN: 84, // Leprechaun
    BLACK_CAT: 85, // Black cat\
    NIHILISM: 86, // Nihilism
    ANTIBATTER: 87, // Antibatter
    QUIRKY_QUARKS: 88, // Quirky quarks
    IT_DOES_MATTER: 89, // It does matter!
    UPGRADER: 90, // Upgrader
    CENTENNIAL: 91, // Centennial
    HARDCORE: 92, // Hardcore
    SPEED_BAKING_I: 93, // Speed baking I
    SPEED_BAKING_II: 94, // Speed baking II
    SPEED_BAKING_III: 95, // Speed baking III
    GETTING_EVEN_WITH_THE_OVEN: 96, // Getting even with the oven
    NOW_THIS_IS_PODSMASHING: 97, // Now this is pod-smashing
    CHIRPED_OUT: 98, // Chirped out
    FOLLOW_THE_WHITE_RABBIT: 99, // Follow the white rabbit
    CLICKASMIC: 100, // Clickasmic
    FRIEND_OF_THE_ANCIENTS: 101, // Friend of the ancients
    RULER_OF_THE_ANCIENTS: 102, // Ruler of the ancients
    WHOLESOME: 103, // Wholesome
    JUST_PLAIN_LUCKY: 104, // Just plain lucky
    ITCHSCRATCHER: 105, // Itchscratcher
    WRINKLESQUISHER: 106, // Wrinklesquisher
    MOISTBURSTER: 107, // Moistburster
    SPOOKY_COOKIES: 108, // Spooky cookies
    COMING_TO_TOWN: 109, // Coming to town
    ALL_HAIL_SANTA: 110, // All hail Santa
    LET_IT_SNOW: 111, // Let it snow
    OH_DEER: 112, // Oh deer
    SLEIGH_OF_HAND: 113, // Sleigh of hand
    REINDEER_SLEIGHER: 114, // Reindeer sleigher
    PERFECTED_AGRICULTURE: 115, // Perfected agriculture
    ULTIMATE_AUTOMATION: 116, // Ultimate automation
    CAN_YOU_DIG_IT: 117, // Can you dig it
    TYPE_II_CIVILIZATION: 118, // Type II civilization
    GILD_WARS: 119, // Gild wars
    BRAINSPLIT: 120, // Brain-split
    TIME_DUKE: 121, // Time duke
    MOLECULAR_MAESTRO: 122, // Molecular maestro
    LONE_PHOTON: 123, // Lone photon
    DAZZLING_GLIMMER: 124, // Dazzling glimmer
    BLINDING_FLASH: 125, // Blinding flash
    UNENDING_GLOW: 126, // Unending glow
    LORD_OF_CONSTRUCTS: 127, // Lord of Constructs
    LORD_OF_PROGRESS: 128, // Lord of Progress
    BICENTENNIAL: 129, // Bicentennial
    LOVELY_COOKIES: 130, // Lovely cookies
    CENTENNIAL_AND_A_HALF: 131, // Centennial and a half
    TINY_COOKIE: 132, // Tiny cookie
    YOU_WIN_A_COOKIE: 133, // You win a cookie
    CLICK_DELEGATOR: 134, // Click delegator
    GUSHING_GRANNIES: 135, // Gushing grannies
    I_HATE_MANURE: 136, // I hate manure
    NEVER_DIG_DOWN: 137, // Never dig down
    THE_INCREDIBLE_MACHINE: 138, // The incredible machine
    AND_BEYOND: 139, // And beyond
    MAGNUM_OPUS: 140, // Magnum Opus
    WITH_STRANGE_EONS: 141, // With strange eons
    SPACETIME_JIGAMAROO: 142, // Spacetime jigamaroo
    SUPERMASSIVE: 143, // Supermassive
    PRAISE_THE_SUN: 144, // Praise the sun
    CLICKAGEDDON: 145, // Clickageddon
    CLICKNAROK: 146, // Clicknarok
    EXTREME_POLYDACTYLY: 147, // Extreme polydactyly
    DR_T: 148, // Dr. T
    THE_OLD_NEVER_BOTHERED_ME_ANYWAY: 149, // The old never bothered me anyway
    HOMEGROWN: 150, // Homegrown
    TECHNOCRACY: 151, // Technocracy
    THE_CENTER_OF_THE_EARTH: 152, // The center of the Earth
    WE_COME_IN_PEACE: 153, // We come in peace
    THE_SECRETS_OF_THE_UNIVERSE: 154, // The secrets of the universe
    REALM_OF_THE_MAD_GOD: 155, // Realm of the Mad God
    FOREVER_AND_EVER: 156, // Forever and ever
    WALK_THE_PLANCK: 157, // Walk the planck
    RISE_AND_SHINE: 158, // Rise and shine
    GOD_COMPLEX: 159, // God complex
    THIRDPARTY: 160, // Third-party
    DEMATERIALIZE: 161, // Dematerialize
    NIL_ZERO_ZILCH: 162, // Nil zero zilch
    TRANSCENDENCE: 163, // Transcendence
    OBLITERATE: 164, // Obliterate
    NEGATIVE_VOID: 165, // Negative void
    THE_HUNT_IS_ON: 166, // The hunt is on
    EGGING_ON: 167, // Egging on
    MASS_EASTERIA: 168, // Mass Easteria
    HIDE_SEEK_CHAMPION: 169, // Hide & seek champion
    WHATS_IN_A_NAME: 170, // What's in a name
    PRETTY_PENNY: 171, // Pretty penny
    FIT_THE_BILL: 172, // Fit the bill
    A_LOAN_IN_THE_DARK: 173, // A loan in the dark
    NEED_FOR_GREED: 174, // Need for greed
    YOUR_TIME_TO_SHRINE: 176, // Your time to shrine
    SHADY_SECT: 177, // Shady sect
    NEWAGE_CULT: 178, // New-age cult
    ORGANIZED_RELIGION: 179, // Organized religion
    FANATICISM: 180, // Fanaticism
    BEWITCHED: 181, // Bewitched
    THE_SORCERER: 182, // The sorcerer\
    CHARMS_AND_ENCHANTMENTS: 183, // Charms and enchantments
    CURSES_AND_MALEDICTIONS: 184, // Curses and maledictions
    MAGIC_KINGDOM: 185, // Magic kingdom
    VESTED_INTEREST: 186, // Vested interest
    NEW_WORLD_ORDER: 187, // New world order
    HOCUS_POCUS: 188, // Hocus pocus
    FINGER_CLICKIN: 189, // Finger clickin\
    PANIC_AT_THE_BINGO: 190, // Panic at the bingo
    RAKE_IN_THE_DOUGH: 191, // Rake in the dough
    QUARRY_ON: 192, // Quarry on
    YES_I_LOVE_TECHNOLOGY: 193, // Yes I love technology
    PAID_IN_FULL: 194, // Paid in full
    CHURCH_OF_COOKIOLOGY: 195, // Church of Cookiology
    TOO_MANY_RABBITS_NOT_ENOUGH_HATS: 196, // Too many rabbits, not enough hats
    THE_MOST_PRECIOUS_CARGO: 197, // The most precious cargo
    THE_AUREATE: 198, // The Aureate
    EVER_MORE_HIDEOUS: 199, // Ever more hideous
    BE_KIND_REWIND: 200, // Be kind, rewind
    INFINITESIMAL: 201, // Infinitesimal
    A_STILL_MORE_GLORIOUS_DAWN: 202, // A still more glorious dawn
    REBIRTH: 203, // Rebirth
    HERE_YOU_GO: 204, // Here you go
    RESURRECTION: 205, // Resurrection
    REINCARNATION: 206, // Reincarnation
    ENDLESS_CYCLE: 207, // Endless cycle
    THE_AGEMASTER: 208, // The agemaster
    TO_OLDLY_GO: 209, // To oldly go
    GARDENER_EXTRAORDINAIRE: 210, // Gardener extraordinaire
    TECTONIC_AMBASSADOR: 211, // Tectonic ambassador
    RISE_OF_THE_MACHINES: 212, // Rise of the machines
    ACQUIRE_CURRENCY: 213, // Acquire currency
    ZEALOTRY: 214, // Zealotry
    THE_WIZARDING_WORLD: 215, // The wizarding world
    PARSECMASHER: 216, // Parsec-masher
    THE_WORK_OF_A_LIFETIME: 217, // The work of a lifetime
    A_PLACE_LOST_IN_TIME: 218, // A place lost in time
    HEAT_DEATH: 219, // Heat death
    MICROCOSM: 220, // Microcosm
    BRIGHT_FUTURE: 221, // Bright future
    HERE_BE_DRAGON: 222, // Here be dragon
    HOW: 223, // How?
    THE_LAND_OF_MILK_AND_COOKIES: 224, // The land of milk and cookies
    HE_WHO_CONTROLS_THE_COOKIES_CONTROLS_THE_UNIVERSE: 225, // He who controls the cookies controls the universe
    TONIGHT_ON_HOARDERS: 226, // Tonight on Hoarders
    ARE_YOU_GONNA_EAT_ALL_THAT: 227, // Are you gonna eat all that?
    WE: 228, // We\
    IN_THE_MOUTH_OF_MADNESS: 229, // In the mouth of madness
    BROUGHT_TO_YOU_BY_THE_LETTER_DIV_STYLEDISPLAYINLINEBLOCKBACKGROUNDURLIMGMONEYPNGWIDTH16PXHEIGHT16PXDIV: 230, // Brought to you by the letter <div style="display:inline-block;background:url(img/money.png);width:16px;height:16px;"></div>
    A_WORLD_FILLED_WITH_COOKIES: 231, // A world filled with cookies
    WHEN_THIS_BABY_HITS_: 232, // When this baby hits 
    FAST_AND_DELICIOUS: 233, // Fast and delicious
    COOKIEHERTZ_A_REALLY_REALLY_TASTY_HERTZ: 234, // Cookiehertz : a really, really tasty hertz
    WOOPS_YOU_SOLVED_WORLD_HUNGER: 235, // Woops, you solved world hunger
    TURBOPUNS: 236, // Turbopuns
    FASTER_MENNER: 237, // Faster menner
    AND_YET_YOU: 238, // And yet you\
    THE_ABAKENING: 239, // The Abakening
    THERE: 240, // There\
    FAST: 241, // Fast
    BICENTENNIAL_AND_A_HALF: 242, // Bicentennial and a half
    TABLOID_ADDICTION: 243, // Tabloid addiction
    CLICKASTROPHE: 244, // Clickastrophe
    CLICKATACLYSM: 245, // Clickataclysm
    THUMBS_PHALANGES_METACARPALS: 246, // Thumbs, phalanges, metacarpals
    POLYMATH: 247, // Polymath
    THE_ELDER_SCROLLS: 248, // The elder scrolls
    TO_CRUMBS_YOU_SAY: 249, // To crumbs, you say?
    SEEDY_BUSINESS: 250, // Seedy business
    FREAK_FRACKING: 251, // Freak fracking
    MODERN_TIMES: 252, // Modern times
    THE_NERVE_OF_WAR: 253, // The nerve of war
    WOLOLO: 254, // Wololo
    AND_NOW_FOR_MY_NEXT_TRICK_I: 255, // And now for my next trick, I\
    GOLD_JERRY_GOLD: 257, // Gold, Jerry! Gold!
    FORBIDDEN_ZONE: 258, // Forbidden zone
    COOKIE_CLICKER_FOREVER_AND_FOREVER_A_HUNDRED_YEARS_COOKIE_CLICKER_ALL_DAY_LONG_FOREVER_FOREVER_A_HUNDRED_TIMES_OVER_AND_OVER_COOKIE_CLICKER_ADVENTURES_DOT_COM: 259, // cookie clicker forever and forever a hundred years cookie clicker, all day long forever, forever a hundred times, over and over cookie clicker adventures dot com
    SCIENTISTS_BAFFLED_EVERYWHERE: 260, // Scientists baffled everywhere
    HARMONY_OF_THE_SPHERES: 261, // Harmony of the spheres
    LAST_CHANCE_TO_SEE: 262, // Last Chance to See
    EARLY_BIRD: 263, // Early bird
    FADING_LUCK: 264, // Fading luck
    ELDEER: 265, // Eldeer
    DUDE_SWEET: 266, // Dude, sweet
    SUGAR_RUSH: 267, // Sugar rush
    YEAR: 268, // Year\
    HANDPICKED: 269, // Hand-picked
    SUGAR_SUGAR: 270, // Sugar sugar
    ALLNATURAL_CANE_SUGAR: 271, // All-natural cane sugar
    SWEETMEATS: 272, // Sweetmeats
    TRICENTENNIAL: 273, // Tricentennial
    KNEAD_FOR_SPEED: 274, // Knead for speed
    WELL_THE_COOKIES_START_COMING_AND_THEY_DON: 275, // Well the cookies start coming and they don\
    I_DON: 276, // I don\
    THE_PROOF_OF_THE_COOKIE_IS_IN_THE_BAKING: 277, // The proof of the cookie is in the baking
    IF_IT: 278, // If it\
    THE_DREAMS_IN_WHICH_I: 279, // The dreams in which I\
    SET_FOR_LIFE: 280, // Set for life
    YOU_AND_THE_BEANSTALK: 281, // You and the beanstalk
    ROMANCING_THE_STONE: 282, // Romancing the stone
    EX_MACHINA: 283, // Ex machina
    AND_I_NEED_IT_NOW: 284, // And I need it now
    PRAY_ON_THE_WEAK: 285, // Pray on the weak
    MAKE_IT_SO: 287, // Make it so
    ALL_THAT_GLITTERS_IS_GOLD: 288, // All that glitters is gold
    HE_COMES: 289, // H̸̷͓̳̳̯̟͕̟͍͍̣͡ḛ̢̦̰̺̮̝͖͖̘̪͉͘͡ ̠̦͕̤̪̝̥̰̠̫̖̣͙̬͘ͅC̨̦̺̩̲̥͉̭͚̜̻̝̣̼͙̮̯̪o̴̡͇̘͎̞̲͇̦̲͞͡m̸̩̺̝̣̹̱͚̬̥̫̳̼̞̘̯͘ͅẹ͇̺̜́̕͢s̶̙̟̱̥̮̯̰̦͓͇͖͖̝͘͘͞
    WAY_BACK_THEN: 290, // Way back then
    EXOTIC_MATTER: 291, // Exotic matter
    AT_THE_END_OF_THE_TUNNEL: 292, // At the end of the tunnel
    CLICK_STARRING_ADAM_SANDLER: 293, // Click (starring Adam Sandler)
    FRANTIQUITIES: 294, // Frantiquities
    OVERGROWTH: 295, // Overgrowth
    SEDIMENTALISM: 296, // Sedimentalism
    LABOR_OF_LOVE: 297, // Labor of love
    REVERSE_FUNNEL_SYSTEM: 298, // Reverse funnel system
    THUS_SPOKE_YOU: 299, // Thus spoke you
    MANAFEST_DESTINY: 300, // Manafest destiny
    NEITHER_SNOW_NOR_RAIN_NOR_HEAT_NOR_GLOOM_OF_NIGHT: 301, // Neither snow nor rain nor heat nor gloom of night
    WHICH_ETERNAL_LIE: 303, // Which eternal lie
    DEJA_VU: 304, // D&eacute;j&agrave; vu
    POWERS_OF_TEN: 305, // Powers of Ten
    NOW_THE_DARK_DAYS_ARE_GONE: 306, // Now the dark days are gone
    FREAKY_JAZZ_HANDS: 307, // Freaky jazz hands
    METHUSELAH: 308, // Methuselah
    HUGE_TRACTS_OF_LAND: 309, // Huge tracts of land
    DDDDDEEPER: 310, // D-d-d-d-deeper
    PATENTLY_GENIUS: 311, // Patently genius
    A_CAPITAL_IDEA: 312, // A capital idea
    IT_BELONGS_IN_A_BAKERY: 313, // It belongs in a bakery
    MOTORMOUTH: 314, // Motormouth
    BEEN_THERE_DONE_THAT: 315, // Been there done that
    PHLOGISTICATED_SUBSTANCES: 316, // Phlogisticated substances
    BIZARRO_WORLD: 317, // Bizarro world
    THE_LONG_NOW: 318, // The long now
    CHUBBY_HADRONS: 319, // Chubby hadrons
    PALETTABLE: 320, // Palettable
    BIBBIDIBOBBIDIBOO: 321, // Bibbidi-bobbidi-boo
    A_WIZARD_IS_YOU: 323, // A wizard is you
    FOURLEAF_COOKIE: 324, // Four-leaf cookie
    LUCKED_OUT: 325, // Lucked out
    WHAT_ARE_THE_ODDS: 326, // What are the odds
    GRANDMA_NEEDS_A_NEW_PAIR_OF_SHOES: 327, // Grandma needs a new pair of shoes
    MILLION_TO_ONE_SHOT_DOC: 328, // Million to one shot, doc
    AS_LUCK_WOULD_HAVE_IT: 329, // As luck would have it
    EVER_IN_YOUR_FAVOR: 330, // Ever in your favor
    BE_A_LADY: 331, // Be a lady
    DICEY_BUSINESS: 332, // Dicey business
    FINGERS_CROSSED: 333, // Fingers crossed
    JUST_A_STATISTIC: 334, // Just a statistic
    MURPHY: 335, // Murphy\
    LET: 336, // Let\
    THE_ULTIMATE_CLICKDOWN: 337, // The ultimate clickdown
    AGED_WELL: 338, // Aged well
    _101ST_BIRTHDAY: 339, // 101st birthday
    BUT_WAIT_: 340, // But wait \
    HARVEST_MOON: 341, // Harvest moon
    MINE: 342, // Mine?
    IN_FULL_GEAR: 343, // In full gear
    TREACLE_TART_ECONOMICS: 344, // Treacle tart economics
    HOLY_COOKIES_GRANDMA: 345, // Holy cookies, grandma!
    THE_PRESTIGE: 346, // The Prestige
    WORTH_ITS_WEIGHT_IN_LEAD: 348, // Worth its weight in lead
    WHAT_HAPPENS_IN_THE_VORTEX_STAYS_IN_THE_VORTEX: 349, // What happens in the vortex stays in the vortex
    INVITED_TO_YESTERDAY: 350, // Invited to yesterday\
    DOWNSIZING: 351, // Downsizing
    MY_EYES: 352, // My eyes
    MAYBE_A_CHANCE_IN_HELL_ACTUALLY: 353, // Maybe a chance in hell, actually
    MAKE_LIKE_A_TREE: 354, // Make like a tree
    CAVE_STORY: 355, // Cave story
    INCOGNEATO: 356, // In-cog-neato
    SAVE_YOUR_BREATH_BECAUSE_THAT: 357, // Save your breath because that\
    VENGEFUL_AND_ALMIGHTY: 358, // Vengeful and almighty
    SPELL_IT_OUT_FOR_YOU: 359, // Spell it out for you
    SPACE_SPACE_SPACE_SPACE_SPACE: 360, // Space space space space space
    OBJECTS_IN_THE_MIRROR_DIMENSION_ARE_CLOSER_THAN_THEY_APPEAR: 362, // Objects in the mirror dimension are closer than they appear
    GROUNDHOG_DAY: 363, // Groundhog day
    A_MATTER_OF_PERSPECTIVE: 364, // A matter of perspective
    OPTICAL_ILLUSION: 365, // Optical illusion
    JACKPOT: 366, // Jackpot
    SO_MUCH_TO_DO_SO_MUCH_TO_SEE: 367, // So much to do so much to see
    RUNNING_WITH_SCISSORS: 368, // Running with scissors
    RAREFIED_AIR: 369, // Rarefied air
    PUSH_IT_TO_THE_LIMIT: 370, // Push it to the limit
    GREEN_COOKIES_SLEEP_FURIOUSLY: 371, // Green cookies sleep furiously
    PANIC_AT_NABISCO: 372, // Panic! at Nabisco
    BURSTING_AT_THE_SEAMS: 373, // Bursting at the seams
    JUST_ABOUT_FULL: 374, // Just about full
    HUNGRY_FOR_MORE: 375, // Hungry for more
    ALL_THE_OTHER_KIDS_WITH_THE_PUMPED_UP_CLICKS: 376, // All the other kids with the pumped up clicks
    ONEMORECLICK: 377, // One...more...click...
    BOTANY_ENTHUSIAST: 378, // Botany enthusiast
    GREEN_ACHING_THUMB: 379, // Green, aching thumb
    IN_THE_GARDEN_OF_EDEN_BABY: 380, // In the garden of Eden (baby)
    KEEPER_OF_THE_CONSERVATORY: 381, // Keeper of the conservatory
    SEEDLESS_TO_NAY: 382, // Seedless to nay
    YOU_GET_NOTHING: 383, // You get nothing
    HUMBLE_REBEGINNINGS: 384, // Humble rebeginnings
    THE_END_OF_THE_WORLD: 385, // The end of the world
    OH_YOU: 386, // Oh, you\
    LAZARUS: 387, // Lazarus
    LEISURELY_PACE: 388, // Leisurely pace
    HYPERSONIC: 389, // Hypersonic
    FEED_ME_ORTEIL: 390, // Feed me, Orteil
    AND_THEN_WHAT: 391, // And then what?
    TRICENTENNIAL_AND_A_HALF: 392, // Tricentennial and a half
    QUADRICENTENNIAL: 393, // Quadricentennial
    QUADRICENTENNIAL_AND_A_HALF: 394, // Quadricentennial and a half
    QUINCENTENNIAL: 395, // Quincentennial
    MAILLARD_REACTION: 396, // Maillard reaction
    WHEN_THE_COOKIES_ASCEND_JUST_RIGHT: 397, // When the cookies ascend just right
    WITH_HER_FINGER_AND_HER_THUMB: 398, // With her finger and her thumb
    DEFENSE_OF_THE_ANCIENTS: 399, // Defense of the ancients
    SHARPEST_TOOL_IN_THE_SHED: 400, // Sharpest tool in the shed
    HEY_NOW_YOU: 401, // Hey now, you\
    BREAK_THE_MOLD: 402, // Break the mold
    GET_THE_SHOW_ON_GET_PAID: 403, // Get the show on, get paid
    MY_WORLD: 404, // My world\
    THE_METEOR_MEN_BEG_TO_DIFFER: 405, // The meteor men beg to differ
    ONLY_SHOOTING_STARS: 406, // Only shooting stars
    WE_COULD_ALL_USE_A_LITTLE_CHANGE: 407, // We could all use a little change
    YOUR_BRAIN_GETS_SMART_BUT_YOUR_HEAD_GETS_DUMB: 408, // Your brain gets smart but your head gets dumb
    THE_YEARS_START_COMING: 409, // The years start coming
    WHAT_A_CONCEPT: 410, // What a concept
    SELFCONTAINED: 413, // Self-contained
    THREW_YOU_FOR_A_LOOP: 414, // Threw you for a loop
    THE_SUM_OF_ITS_PARTS: 415, // The sum of its parts
    BEARS_REPEATING: 416, // Bears repeating
    MORE_OF_THE_SAME: 417, // More of the same
    LAST_RECURSE: 418, // Last recurse
    OUT_OF_ONE_MANY: 419, // Out of one, many
    AN_EXAMPLE_OF_RECURSION: 420, // An example of recursion
    FOR_MORE_INFORMATION_ON_THIS_ACHIEVEMENT_PLEASE_REFER_TO_ITS_TITLE: 421, // For more information on this achievement, please refer to its title
    NEVER_GET_BORED: 423, // Never get bored
    THE_NEEDS_OF_THE_MANY: 424, // The needs of the many
    EATING_ITS_OWN: 425, // Eating its own
    WE_MUST_GO_DEEPER: 426, // We must go deeper
    SIERPINSKI_RHOMBOIDS: 427, // Sierpinski rhomboids
    GOTTA_GO_FAST: 428, // Gotta go fast
    I_THINK_IT: 429, // I think it\
    RENAISSANCE_BAKER: 430, // Renaissance baker
    VETERAN: 431, // Veteran
    THICKSKINNED: 432, // Thick-skinned
    F12: 433, // F12
    VARIABLE_SUCCESS: 434, // Variable success
    NO_COMMENTS: 435, // No comments
    UP_TO_CODE: 436, // Up to code
    WORKS_ON_MY_MACHINE: 437, // Works on my machine
    TECHNICAL_DEBT: 438, // Technical debt
    MIND_YOUR_LANGUAGE: 439, // Mind your language
    INCONSOLABLE: 440, // Inconsolable
    CLOSURE: 441, // Closure
    DUDE_WHAT_IF_WE: 442, // Dude what if we\
    TAKING_THE_BACK_STREETS: 443, // Taking the back streets
    INHERITED_PROTOTYPE: 444, // Inherited prototype
    A_MODEL_OF_DOCUMENT_OBJECT: 445, // A model of document object
    FIRSTCLASS_CITIZEN: 446, // First-class citizen
    ALEXANDRIA: 447, // Alexandria
    BAKE_HIM_AWAY_TOYS: 448, // Bake him away, toys
    YOU: 449, // You\
    HAVEN: 450, // Haven\
    A_SOMETIMES_FOOD: 451, // A sometimes food
    NOT_ENOUGH_OF_A_GOOD_THING: 452, // Not enough of a good thing
    HORN_OF_PLENTY: 453, // Horn of plenty
    SMURF_ACCOUNT: 454, // Smurf account
    IF_AT_FIRST_YOU_DON: 455, // If at first you don\
    O_FORTUNA: 456, // O Fortuna
    INITIAL_PUBLIC_OFFERING: 457, // Initial public offering
    ROOKIE_NUMBERS: 458, // Rookie numbers
    NO_NOBILITY_IN_POVERTY: 459, // No nobility in poverty
    FULL_WAREHOUSES: 460, // Full warehouses
    MAKE_MY_DAY: 461, // Make my day
    BUY_BUY_BUY: 462, // Buy buy buy
    GASEOUS_ASSETS: 463, // Gaseous assets
    PYRAMID_SCHEME: 464, // Pyramid scheme
    JELLICLES: 465, // Jellicles
    QUINCENTENNIAL_AND_A_HALF: 466, // Quincentennial and a half
    WHAT_DID_WE_EVEN_EAT_BEFORE_THESE: 467, // What did we even eat before these
    HEAVY_FLOW: 468, // Heavy flow
    MORE_YOU_SAY: 469, // More you say?
    LARGE_AND_IN_CHARGE: 470, // Large and in charge
    ABSOLUTELY_STUFFED: 471, // Absolutely stuffed
    CLICKETY_SPLIT: 473, // Clickety split
    GOTTA_HAND_IT_TO_YOU: 474, // Gotta hand it to you
    OKAY_BOOMER: 475, // Okay boomer
    OVERRIPE: 476, // Overripe
    ROCK_ON: 477, // Rock on
    SELFMANMADE_MAN: 478, // Self-manmade man
    CHECKS_OUT: 479, // Checks out
    LIVING_ON_A_PRAYER: 480, // Living on a prayer
    HIGITUS_FIGITUS_MIGITUS_MUM: 481, // Higitus figitus migitus mum
    THE_INCREDIBLE_JOURNEY: 482, // The incredible journey
    JUST_A_PHASE: 483, // Just a phase
    CAVEMAN_TO_COSMOS: 485, // Caveman to cosmos
    PARTICULAR_TASTES: 486, // Particular tastes
    A_LIGHT_SNACK: 487, // A light snack
    TEMPTING_FATE: 488, // Tempting fate
    TAUTOLOGICAL: 489, // Tautological
    CURLY_BRACES: 490, // Curly braces
    SEVEN_HORSESHOES: 491, // Seven horseshoes
    OLDEN_DAYS: 492, // Olden days
    THE_DEVIL: 493, // The devil\
    IN_THE_GREEN: 494, // In the green
    MOUNTAIN_OUT_OF_A_MOLEHILL_BUT_LIKE_IN_A_GOOD_WAY: 495, // Mountain out of a molehill, but like in a good way
    THE_WHEELS_OF_PROGRESS: 496, // The wheels of progress
    PREACHES_AND_CREAM: 498, // Preaches and cream
    MAGIC_THINKING: 499, // Magic thinking
    IS_THERE_LIFE_ON_MARS: 500, // Is there life on Mars?
    BAD_CHEMISTRY: 501, // Bad chemistry
    REDUCED_TO_GIBBERING_HEAPS: 502, // Reduced to gibbering heaps
    BACK_ALREADY: 503, // Back already?
    NUCLEAR_THRONE: 504, // Nuclear throne
    MAKING_LIGHT_OF_THE_SITUATION: 505, // Making light of the situation
    FLIP_A_COOKIE_CHIPS_I_WIN_CRUST_YOU_LOSE: 506, // Flip a cookie. Chips, I win. Crust, you lose.
    IN_AND_OF_ITSELF: 507, // In and of itself
    DUCK_TYPING: 508, // Duck typing
    THEY: 509, // They\
    WELLVERSED: 510, // Well-versed
    RIPE_FOR_THE_PICKING: 511, // Ripe for the picking
    UNREAL: 512, // Unreal
    ONCE_YOU: 513, // Once you\
    SPOILS_AND_PLUNDER: 514, // Spoils and plunder
    NOBODY_EXISTS_ON_PURPOSE_NOBODY_BELONGS_ANYWHERE: 515, // Nobody exists on purpose, nobody belongs anywhere
    HYPERSPACE_EXPRESSWAY: 516, // Hyperspace expressway
    VERSATILE: 517, // Versatile
    YOU_ARE_INEVITABLE: 518, // You are inevitable
    AWAY_FROM_THIS_PLACE: 519, // Away from this place
    EVERYWHERE_AT_ONCE: 520, // Everywhere at once
    REJECT_REALITY_SUBSTITUTE_YOUR_OWN: 521, // Reject reality, substitute your own
    FRINGE: 522, // Fringe
    COHERENCE: 523, // Coherence
    EARTH616: 524, // Earth-616
    STRANGE_TOPOLOGIES: 525, // Strange topologies
    GRAND_DESIGN: 526, // Grand design
    ECUMENOPOLIS: 527, // Ecumenopolis
    THE_FULL_PICTURE: 528, // The full picture
    WHEN_THERE: 529, // When there\
    SEXCENTENNIAL: 530, // Sexcentennial
    KEEP_GOING_UNTIL_I_SAY_STOP: 531, // Keep going until I say stop
    BUT_I_DIDN: 532, // But I didn\
    WITH_UNRIVALED_FERVOR: 533, // With unrivaled fervor
    THINK_BIG: 534, // Think big
    HYPERSIZE_ME: 535, // Hypersize me
    MAX_CAPACITY: 536, // Max capacity
    LIQUID_ASSETS: 537, // Liquid assets
    STIFLING_THE_PRESS: 538, // Stifling the press
    JUST_MY_IMAGINATION: 540, // Just my imagination
    NOW_THERE: 541, // Now there\
    THE_ORGAN_THAT_NAMED_ITSELF: 542, // The organ that named itself
    GYRIFICATION: 543, // Gyrification
    A_TRADEMARKED_PORTMANTEAU_OF_IMAGINATION_AND_ENGINEERING: 544, // A trademarked portmanteau of "imagination" and "engineering"
    MINDFULNESS: 545, // Mindfulness
    THE_10_MYTH: 546, // The 10% myth
    THOUGH_FOOLS_SELDOM_DIFFER: 548, // Though fools seldom differ
    LOOKING_KIND_OF_DUMB: 549, // Looking kind of dumb
    A_BEAUTIFUL_MIND: 550, // A beautiful mind
    CARDINAL_SYNAPSES: 551, // Cardinal synapses
    POSITIVE_THINKING: 552, // Positive thinking
    THE_THOUGHT_THAT_COUNTS: 553, // The thought that counts
    UNTHINKABLE: 554, // Unthinkable
    GIFTED: 555, // Gifted
    THEY_MOISTLY_COME_AT_NIGHT: 556, // They moistly come at night
    IT: 557, // It\
    DON: 558, // Don\
    REPLACED_BY_ROBOTS: 559, // Replaced by robots
    FINANCIAL_PRODIGY: 560, // Financial prodigy
    AND_I_WILL_PRAY_TO_A_BIG_GOD: 561, // And I will pray to a big god
    SHOSPLE_COLUPIS: 562, // Shosple Colupis
    FALSE_VACUUM: 563, // False vacuum
    METALLIC_TASTE: 564, // Metallic taste
    SWISS_CHEESE: 565, // Swiss cheese
    BUT_THE_FUTURE_REFUSED_TO_CHANGE: 566, // But the future refused to change
    ENLIGHTENMENT: 568, // Enlightenment
    NEVER_TELL_ME_THE_ODDS: 569, // Never tell me the odds
    BLOWING_AN_APOLLONIAN_GASKET: 570, // Blowing an Apollonian gasket
    GET_WITH_THE_PROGRAM: 571, // Get with the program
    LOST_YOUR_COSMIC_MARBLES: 572, // Lost your cosmic marbles
    BY_WILL_ALONE_I_SET_MY_MIND_IN_MOTION: 573, // By will alone I set my mind in motion
    AIN: 574, // Ain\
    SEXCENTENNIAL_AND_A_HALF: 575, // Sexcentennial and a half
    I_AM_SPEED: 576, // I am speed
    AND_ON_AND_ON: 577, // And on and on
    FAKE_IT_TILL_YOU_BAKE_IT: 578, // Fake it till you bake it
    HISTORY_IN_THE_BAKING: 579, // History in the baking
    BABY_ITS_OLD_OUTSIDE: 580, // Baby it's old outside
    MYRIAD: 581, // Myriad
    KAIZEN: 582, // Kaizen
    BEYOND_QUALITY: 583, // Beyond quality
    EVERYTHING_HAPPENS_SO_MUCH: 584, // Everything happens so much
    I: 585, // I\
    WHAT_DO_YOU_GET_FOR_THE_BAKER_WHO_HAS_EVERYTHING: 586, // What do you get for the baker who has everything
    BOTTOMLESS_PIT: 587, // Bottomless pit
    ALL_THE_STARS_IN_HEAVEN: 588, // All the stars in heaven
    NO_TIME_LIKE_THE_PRESENT: 589, // No time like the present
    CAN_WE_GET_MUCH_HIGHER: 590, // Can we get much higher
    SPEED: 591, // Speed\
    RAINY_DAY_FUND: 592, // Rainy day fund
    AND_A_LITTLE_EXTRA: 593, // And a little extra
    GRANDMAPOCALYPSE: 594, // Grandmapocalypse
    WRATH_COOKIE: 595, // Wrath cookie
    NO_MORE_ROOM_IN_HELL: 596, // No more room in hell
    IN_HER_LIKENESS: 597, // In her likeness
    WRINKLER_POKER: 598, // Wrinkler poker
    SEPTCENTENNIAL: 599, // Septcentennial
    MY_OWN_CLONE: 600, // My own clone
    MULTIPLICITY: 601, // Multiplicity
    BORN_FOR_THIS_JOB: 602, // Born for this job
    EPISODE_II: 603, // Episode II
    COPY_THAT: 604, // Copy that
    LIFE_FINDS_A_WAY: 605, // Life finds a way
    OVERCROWDING: 606, // Overcrowding
    STRENGTH_IN_NUMBERS: 607, // Strength in numbers
    ARMY_OF_ME: 608, // Army of me
    KNOW_THYSELF: 609, // Know thyself
    DIDN: 610, // Didn\
    GENETIC_BOTTLENECK: 611, // Genetic bottleneck
    DESPITE_EVERYTHING_IT: 612, // Despite everything, it\
    EVERYONE_EVERYWHERE_ALL_AT_ONCE: 613, // Everyone everywhere all at once
    SELFMADE: 614, // Self-made
    REPRODUCIBLE_RESULTS: 615, // Reproducible results
    THAT: 616, // That\
    SELFIMPROVEMENT: 617, // Self-improvement
    AND_NOW_YOU: 618, // And now you\
    AU_NATUREL: 619, // Au naturel
    DIRTRICH: 620, // Dirt-rich
    BOTS_BUILD_BOTS: 621, // Bots build bots
    GETTING_THAT_BAG: 622, // Getting that bag
    THE_LEADER_IS_GOOD_THE_LEADER_IS_GREAT: 623, // The leader is good, the leader is great
    YOU_DON: 624, // You don\
    SIGNED_SEALED_DELIVERED: 625, // Signed, sealed, delivered
    SUGAR_SPICE_AND_EVERYTHING_NICE: 626, // Sugar, spice, and everything nice
    NOT_EVEN_REMOTELY_CLOSE_TO_KANSAS_ANYMORE: 627, // Not even remotely close to Kansas anymore
    I_ONLY_MEANT_TO_STAY_A_WHILE: 628, // I only meant to stay a while
    NOT_20_YEARS_AWAY_FOREVER: 629, // Not 20 years away forever
    BRIGHT_SIDE_OF_THE_MOON: 630, // Bright side of the Moon
    RIDING_THE_MERSENNE_TWISTER: 631, // Riding the Mersenne twister
    DIVIDE_AND_CONQUER: 632, // Divide and conquer
    PEBCAKES: 633, // Pebcakes
    GREENER_ON_THE_OTHER_SIDES: 634, // Greener on the other sides
    WHERE_IS_MY_MIND: 635, // Where is my mind
    INTROSPECTION: 636, // Introspection
    DEBT_EVASION: 637, // Debt evasion
    OFT_WE_MAR_WHAT: 638, // Oft we mar what\
    COOKIE_CLICKER: 639, // Cookie Clicker
    WHAT: 640, // What\
    ALL_ON_DECK: 641, // All on deck
    A_ROUND_OF_APPLAUSE: 642, // A round of applause
};
// ==================== Upgrades ====================
const UPGRADE_IDS = {
    REINFORCED_INDEX_FINGER: 0, // Reinforced index finger
    CARPAL_TUNNEL_PREVENTION_CREAM: 1, // Carpal tunnel prevention cream
    AMBIDEXTROUS: 2, // Ambidextrous
    THOUSAND_FINGERS: 3, // Thousand fingers
    MILLION_FINGERS: 4, // Million fingers
    BILLION_FINGERS: 5, // Billion fingers
    TRILLION_FINGERS: 6, // Trillion fingers
    FORWARDS_FROM_GRANDMA: 7, // Forwards from grandma
    STEELPLATED_ROLLING_PINS: 8, // Steel-plated rolling pins
    LUBRICATED_DENTURES: 9, // Lubricated dentures
    CHEAP_HOES: 10, // Cheap hoes
    FERTILIZER: 11, // Fertilizer
    COOKIE_TREES: 12, // Cookie trees
    STURDIER_CONVEYOR_BELTS: 13, // Sturdier conveyor belts
    CHILD_LABOR: 14, // Child labor
    SWEATSHOP: 15, // Sweatshop
    SUGAR_GAS: 16, // Sugar gas
    MEGADRILL: 17, // Megadrill
    ULTRADRILL: 18, // Ultradrill
    VANILLA_NEBULAE: 19, // Vanilla nebulae
    WORMHOLES: 20, // Wormholes
    FREQUENT_FLYER: 21, // Frequent flyer
    ANTIMONY: 22, // Antimony
    ESSENCE_OF_DOUGH: 23, // Essence of dough
    TRUE_CHOCOLATE: 24, // True chocolate
    ANCIENT_TABLET: 25, // Ancient tablet
    INSANE_OATLING_WORKERS: 26, // Insane oatling workers
    SOUL_BOND: 27, // Soul bond
    FLUX_CAPACITORS: 28, // Flux capacitors
    TIME_PARADOX_RESOLVER: 29, // Time paradox resolver
    QUANTUM_CONUNDRUM: 30, // Quantum conundrum
    KITTEN_HELPERS: 31, // Kitten helpers
    KITTEN_WORKERS: 32, // Kitten workers
    PLAIN_COOKIES: 33, // Plain cookies
    SUGAR_COOKIES: 34, // Sugar cookies
    OATMEAL_RAISIN_COOKIES: 35, // Oatmeal raisin cookies
    PEANUT_BUTTER_COOKIES: 36, // Peanut butter cookies
    COCONUT_COOKIES: 37, // Coconut cookies
    WHITE_CHOCOLATE_COOKIES: 38, // White chocolate cookies
    MACADAMIA_NUT_COOKIES: 39, // Macadamia nut cookies
    DOUBLECHIP_COOKIES: 40, // Double-chip cookies
    WHITE_CHOCOLATE_MACADAMIA_NUT_COOKIES: 41, // White chocolate macadamia nut cookies
    ALLCHOCOLATE_COOKIES: 42, // All-chocolate cookies
    QUADRILLION_FINGERS: 43, // Quadrillion fingers
    PRUNE_JUICE: 44, // Prune juice
    GENETICALLYMODIFIED_COOKIES: 45, // Genetically-modified cookies
    RADIUM_REACTORS: 46, // Radium reactors
    ULTIMADRILL: 47, // Ultimadrill
    WARP_DRIVE: 48, // Warp drive
    AMBROSIA: 49, // Ambrosia
    SANITY_DANCE: 50, // Sanity dance
    CAUSALITY_ENFORCER: 51, // Causality enforcer
    LUCKY_DAY: 52, // Lucky day
    SERENDIPITY: 53, // Serendipity
    KITTEN_ENGINEERS: 54, // Kitten engineers
    DARK_CHOCOLATECOATED_COOKIES: 55, // Dark chocolate-coated cookies
    WHITE_CHOCOLATECOATED_COOKIES: 56, // White chocolate-coated cookies
    FARMER_GRANDMAS: 57, // Farmer grandmas
    MINER_GRANDMAS: 58, // Miner grandmas
    WORKER_GRANDMAS: 59, // Worker grandmas
    COSMIC_GRANDMAS: 60, // Cosmic grandmas
    TRANSMUTED_GRANDMAS: 61, // Transmuted grandmas
    ALTERED_GRANDMAS: 62, // Altered grandmas
    GRANDMAS: 63, // Grandmas\
    BINGO_CENTERRESEARCH_FACILITY: 64, // Bingo center/Research facility
    SPECIALIZED_CHOCOLATE_CHIPS: 65, // Specialized chocolate chips
    DESIGNER_COCOA_BEANS: 66, // Designer cocoa beans
    RITUAL_ROLLING_PINS: 67, // Ritual rolling pins
    UNDERWORLD_OVENS: 68, // Underworld ovens
    ONE_MIND: 69, // One mind
    EXOTIC_NUTS: 70, // Exotic nuts
    COMMUNAL_BRAINSWEEP: 71, // Communal brainsweep
    ARCANE_SUGAR: 72, // Arcane sugar
    ELDER_PACT: 73, // Elder Pact
    ELDER_PLEDGE: 74, // Elder Pledge
    PLASTIC_MOUSE: 75, // Plastic mouse
    IRON_MOUSE: 76, // Iron mouse
    TITANIUM_MOUSE: 77, // Titanium mouse
    ADAMANTIUM_MOUSE: 78, // Adamantium mouse
    ULTRASCIENCE: 79, // Ultrascience
    ECLIPSE_COOKIES: 80, // Eclipse cookies
    ZEBRA_COOKIES: 81, // Zebra cookies
    QUINTILLION_FINGERS: 82, // Quintillion fingers
    GOLD_HOARD: 83, // Gold hoard
    ELDER_COVENANT: 84, // Elder Covenant
    REVOKE_ELDER_COVENANT: 85, // Revoke Elder Covenant
    GET_LUCKY: 86, // Get lucky
    SACRIFICIAL_ROLLING_PINS: 87, // Sacrificial rolling pins
    SNICKERDOODLES: 88, // Snickerdoodles
    STROOPWAFELS: 89, // Stroopwafels
    MACAROONS: 90, // Macaroons
    NEUROMANCY: 91, // Neuromancy
    EMPIRE_BISCUITS: 92, // Empire biscuits
    BRITISH_TEA_BISCUITS: 93, // British tea biscuits
    CHOCOLATE_BRITISH_TEA_BISCUITS: 94, // Chocolate british tea biscuits
    ROUND_BRITISH_TEA_BISCUITS: 95, // Round british tea biscuits
    ROUND_CHOCOLATE_BRITISH_TEA_BISCUITS: 96, // Round chocolate british tea biscuits
    ROUND_BRITISH_TEA_BISCUITS_WITH_HEART_MOTIF: 97, // Round british tea biscuits with heart motif
    ROUND_CHOCOLATE_BRITISH_TEA_BISCUITS_WITH_HEART_MOTIF: 98, // Round chocolate british tea biscuits with heart motif
    SUGAR_BOSONS: 99, // Sugar bosons
    STRING_THEORY: 100, // String theory
    LARGE_MACARON_COLLIDER: 101, // Large macaron collider
    BIG_BANG_BAKE: 102, // Big bang bake
    ANTIGRANDMAS: 103, // Antigrandmas
    MADELEINES: 104, // Madeleines
    PALMIERS: 105, // Palmiers
    PALETS: 106, // Palets
    SABLES: 107, // Sabl&eacute;s
    KITTEN_OVERSEERS: 108, // Kitten overseers
    SEXTILLION_FINGERS: 109, // Sextillion fingers
    DOUBLETHICK_GLASSES: 110, // Double-thick glasses
    GINGERBREAD_SCARECROWS: 111, // Gingerbread scarecrows
    RECOMBOBULATORS: 112, // Recombobulators
    HBOMB_MINING: 113, // H-bomb mining
    CHOCOLATE_MONOLITHS: 114, // Chocolate monoliths
    AQUA_CRUSTULAE: 115, // Aqua crustulae
    BRANE_TRANSPLANT: 116, // Brane transplant
    YESTERMORROW_COMPARATORS: 117, // Yestermorrow comparators
    REVERSE_CYCLOTRONS: 118, // Reverse cyclotrons
    UNOBTAINIUM_MOUSE: 119, // Unobtainium mouse
    CARAMOAS: 120, // Caramoas
    SAGALONGS: 121, // Sagalongs
    SHORTFOILS: 122, // Shortfoils
    WIN_MINTS: 123, // Win mints
    PERFECT_IDLING: 124, // Perfect idling
    FIG_GLUTTONS: 125, // Fig gluttons
    LOREOLS: 126, // Loreols
    JAFFA_CAKES: 127, // Jaffa cakes
    GREASE: 128, // Grease\
    HEAVENLY_CHIP_SECRET: 129, // Heavenly chip secret
    HEAVENLY_COOKIE_STAND: 130, // Heavenly cookie stand
    HEAVENLY_BAKERY: 131, // Heavenly bakery
    HEAVENLY_CONFECTIONERY: 132, // Heavenly confectionery
    HEAVENLY_KEY: 133, // Heavenly key
    SKULL_COOKIES: 134, // Skull cookies
    GHOST_COOKIES: 135, // Ghost cookies
    BAT_COOKIES: 136, // Bat cookies
    SLIME_COOKIES: 137, // Slime cookies
    PUMPKIN_COOKIES: 138, // Pumpkin cookies
    EYEBALL_COOKIES: 139, // Eyeball cookies
    SPIDER_COOKIES: 140, // Spider cookies
    PERSISTENT_MEMORY: 141, // Persistent memory
    WRINKLER_DOORMAT: 142, // Wrinkler doormat
    CHRISTMAS_TREE_BISCUITS: 143, // Christmas tree biscuits
    SNOWFLAKE_BISCUITS: 144, // Snowflake biscuits
    SNOWMAN_BISCUITS: 145, // Snowman biscuits
    HOLLY_BISCUITS: 146, // Holly biscuits
    CANDY_CANE_BISCUITS: 147, // Candy cane biscuits
    BELL_BISCUITS: 148, // Bell biscuits
    PRESENT_BISCUITS: 149, // Present biscuits
    GINGERBREAD_MEN: 150, // Gingerbread men
    GINGERBREAD_TREES: 151, // Gingerbread trees
    A_FESTIVE_HAT: 152, // A festive hat
    INCREASED_MERRINESS: 153, // Increased merriness
    IMPROVED_JOLLINESS: 154, // Improved jolliness
    A_LUMP_OF_COAL: 155, // A lump of coal
    AN_ITCHY_SWEATER: 156, // An itchy sweater
    REINDEER_BAKING_GROUNDS: 157, // Reindeer baking grounds
    WEIGHTED_SLEIGHS: 158, // Weighted sleighs
    HO_HO_HOFLAVORED_FROSTING: 159, // Ho ho ho-flavored frosting
    SEASON_SAVINGS: 160, // Season savings
    TOY_WORKSHOP: 161, // Toy workshop
    NAUGHTY_LIST: 162, // Naughty list
    REINDEER_SEASON: 167, // Reindeer season
    SANTAS_DOMINION: 168, // Santa's dominion
    PURE_HEART_BISCUITS: 169, // Pure heart biscuits
    ARDENT_HEART_BISCUITS: 170, // Ardent heart biscuits
    SOUR_HEART_BISCUITS: 171, // Sour heart biscuits
    WEEPING_HEART_BISCUITS: 172, // Weeping heart biscuits
    GOLDEN_HEART_BISCUITS: 173, // Golden heart biscuits
    ETERNAL_HEART_BISCUITS: 174, // Eternal heart biscuits
    GEM_POLISH: 175, // Gem polish
    _9TH_COLOR: 176, // 9th color
    CHOCOLATE_LIGHT: 177, // Chocolate light
    GRAINBOW: 178, // Grainbow
    PURE_COSMIC_LIGHT: 179, // Pure cosmic light
    RAINBOW_GRANDMAS: 180, // Rainbow grandmas
    SEASON_SWITCHER: 181, // Season switcher
    FESTIVE_BISCUIT: 182, // Festive biscuit
    GHOSTLY_BISCUIT: 183, // Ghostly biscuit
    LOVESICK_BISCUIT: 184, // Lovesick biscuit
    FOOL: 185, // Fool\
    ETERNAL_SEASONS: 186, // Eternal seasons
    KITTEN_MANAGERS: 187, // Kitten managers
    SEPTILLION_FINGERS: 188, // Septillion fingers
    OCTILLION_FINGERS: 189, // Octillion fingers
    ELUDIUM_MOUSE: 190, // Eludium mouse
    WISHALLOY_MOUSE: 191, // Wishalloy mouse
    AGING_AGENTS: 192, // Aging agents
    PULSAR_SPRINKLERS: 193, // Pulsar sprinklers
    DEEPBAKE_PROCESS: 194, // Deep-bake process
    COREFORGE: 195, // Coreforge
    GENERATION_SHIP: 196, // Generation ship
    ORIGIN_CRUCIBLE: 197, // Origin crucible
    DEITYSIZED_PORTALS: 198, // Deity-sized portals
    FAR_FUTURE_ENACTMENT: 199, // Far future enactment
    NANOCOSMICS: 200, // Nanocosmics
    GLOWINTHEDARK: 201, // Glow-in-the-dark
    ROSE_MACARONS: 202, // Rose macarons
    LEMON_MACARONS: 203, // Lemon macarons
    CHOCOLATE_MACARONS: 204, // Chocolate macarons
    PISTACHIO_MACARONS: 205, // Pistachio macarons
    HAZELNUT_MACARONS: 206, // Hazelnut macarons
    VIOLET_MACARONS: 207, // Violet macarons
    MAGIC_SHENANIGANS: 208, // Magic shenanigans
    BUNNY_BISCUIT: 209, // Bunny biscuit
    CHICKEN_EGG: 210, // Chicken egg
    DUCK_EGG: 211, // Duck egg
    TURKEY_EGG: 212, // Turkey egg
    QUAIL_EGG: 213, // Quail egg
    ROBIN_EGG: 214, // Robin egg
    OSTRICH_EGG: 215, // Ostrich egg
    CASSOWARY_EGG: 216, // Cassowary egg
    SALMON_ROE: 217, // Salmon roe
    FROGSPAWN: 218, // Frogspawn
    SHARK_EGG: 219, // Shark egg
    TURTLE_EGG: 220, // Turtle egg
    ANT_LARVA: 221, // Ant larva
    GOLDEN_GOOSE_EGG: 222, // Golden goose egg
    FABERGE_EGG: 223, // Faberge egg
    WRINKLERSPAWN: 224, // Wrinklerspawn
    COOKIE_EGG: 225, // Cookie egg
    OMELETTE: 226, // Omelette
    CHOCOLATE_EGG: 227, // Chocolate egg
    CENTURY_EGG: 228, // Century egg
    EGG: 229, // "egg"
    CARAMEL_MACARONS: 230, // Caramel macarons
    LICORICE_MACARONS: 231, // Licorice macarons
    TALLER_TELLERS: 232, // Taller tellers
    SCISSORRESISTANT_CREDIT_CARDS: 233, // Scissor-resistant credit cards
    ACIDPROOF_VAULTS: 234, // Acid-proof vaults
    CHOCOLATE_COINS: 235, // Chocolate coins
    EXPONENTIAL_INTEREST_RATES: 236, // Exponential interest rates
    FINANCIAL_ZEN: 237, // Financial zen
    GOLDEN_IDOLS: 238, // Golden idols
    SACRIFICES: 239, // Sacrifices
    DELICIOUS_BLESSING: 240, // Delicious blessing
    SUN_FESTIVAL: 241, // Sun festival
    ENLARGED_PANTHEON: 242, // Enlarged pantheon
    GREAT_BAKER_IN_THE_SKY: 243, // Great Baker in the sky
    POINTIER_HATS: 244, // Pointier hats
    BEARDLIER_BEARDS: 245, // Beardlier beards
    ANCIENT_GRIMOIRES: 246, // Ancient grimoires
    KITCHEN_CURSES: 247, // Kitchen curses
    SCHOOL_OF_SORCERY: 248, // School of sorcery
    DARK_FORMULAS: 249, // Dark formulas
    BANKER_GRANDMAS: 250, // Banker grandmas
    PRIESTESS_GRANDMAS: 251, // Priestess grandmas
    WITCH_GRANDMAS: 252, // Witch grandmas
    TIN_OF_BRITISH_TEA_BISCUITS: 253, // Tin of british tea biscuits
    BOX_OF_MACARONS: 254, // Box of macarons
    BOX_OF_BRAND_BISCUITS: 255, // Box of brand biscuits
    PURE_BLACK_CHOCOLATE_COOKIES: 256, // Pure black chocolate cookies
    PURE_WHITE_CHOCOLATE_COOKIES: 257, // Pure white chocolate cookies
    LADYFINGERS: 258, // Ladyfingers
    TUILES: 259, // Tuiles
    CHOCOLATESTUFFED_BISCUITS: 260, // Chocolate-stuffed biscuits
    CHECKER_COOKIES: 261, // Checker cookies
    BUTTER_COOKIES: 262, // Butter cookies
    CREAM_COOKIES: 263, // Cream cookies
    PERMANENT_UPGRADE_SLOT_I: 264, // Permanent upgrade slot I
    PERMANENT_UPGRADE_SLOT_II: 265, // Permanent upgrade slot II
    PERMANENT_UPGRADE_SLOT_III: 266, // Permanent upgrade slot III
    PERMANENT_UPGRADE_SLOT_IV: 267, // Permanent upgrade slot IV
    PERMANENT_UPGRADE_SLOT_V: 268, // Permanent upgrade slot V
    STARSPAWN: 269, // Starspawn
    STARSNOW: 270, // Starsnow
    STARTERROR: 271, // Starterror
    STARLOVE: 272, // Starlove
    STARTRADE: 273, // Startrade
    ANGELS: 274, // Angels
    ARCHANGELS: 275, // Archangels
    VIRTUES: 276, // Virtues
    DOMINIONS: 277, // Dominions
    CHERUBIM: 278, // Cherubim
    SERAPHIM: 279, // Seraphim
    GOD: 280, // God
    TWIN_GATES_OF_TRANSCENDENCE: 281, // Twin Gates of Transcendence
    HEAVENLY_LUCK: 282, // Heavenly luck
    LASTING_FORTUNE: 283, // Lasting fortune
    DECISIVE_FATE: 284, // Decisive fate
    DIVINE_DISCOUNT: 285, // Divine discount
    DIVINE_SALES: 286, // Divine sales
    DIVINE_BAKERIES: 287, // Divine bakeries
    STARTER_KIT: 288, // Starter kit
    STARTER_KITCHEN: 289, // Starter kitchen
    HALO_GLOVES: 290, // Halo gloves
    KITTEN_ANGELS: 291, // Kitten angels
    UNHOLY_BAIT: 292, // Unholy bait
    SACRILEGIOUS_CORRUPTION: 293, // Sacrilegious corruption
    XTREME_WALKERS: 294, // Xtreme walkers
    FUDGE_FUNGUS: 295, // Fudge fungus
    PLANETSPLITTERS: 296, // Planetsplitters
    CYBORG_WORKFORCE: 297, // Cyborg workforce
    WAY_OF_THE_WALLET: 298, // Way of the wallet
    CREATION_MYTH: 299, // Creation myth
    COOKIEMANCY: 300, // Cookiemancy
    DYSON_SPHERE: 301, // Dyson sphere
    THEORY_OF_ATOMIC_FLUIDITY: 302, // Theory of atomic fluidity
    END_OF_TIMES_BACKUP_PLAN: 303, // End of times back-up plan
    GREAT_LOOP_HYPOTHESIS: 304, // Great loop hypothesis
    THE_PULSE: 305, // The Pulse
    LUX_SANCTORUM: 306, // Lux sanctorum
    THE_UNBRIDLING: 307, // The Unbridling
    WHEAT_TRIFFIDS: 308, // Wheat triffids
    CANOLA_OIL_WELLS: 309, // Canola oil wells
    _78HOUR_DAYS: 310, // 78-hour days
    THE_STUFF_RATIONALE: 311, // The stuff rationale
    THEOCRACY: 312, // Theocracy
    RABBIT_TRICK: 313, // Rabbit trick
    THE_FINAL_FRONTIER: 314, // The final frontier
    BEIGE_GOO: 315, // Beige goo
    MADDENING_CHANTS: 316, // Maddening chants
    COOKIETOPIAN_MOMENTS_OF_MAYBE: 317, // Cookietopian moments of maybe
    SOME_OTHER_SUPERTINY_FUNDAMENTAL_PARTICLE_PROBABLY: 318, // Some other super-tiny fundamental particle? Probably?
    REVERSE_SHADOWS: 319, // Reverse shadows
    KITTEN_ACCOUNTANTS: 320, // Kitten accountants
    KITTEN_SPECIALISTS: 321, // Kitten specialists
    KITTEN_EXPERTS: 322, // Kitten experts
    HOW_TO_BAKE_YOUR_DRAGON: 323, // How to bake your dragon
    A_CRUMBLY_EGG: 324, // A crumbly egg
    CHIMERA: 325, // Chimera
    TIN_OF_BUTTER_COOKIES: 326, // Tin of butter cookies
    GOLDEN_SWITCH: 327, // Golden switch
    CLASSIC_DAIRY_SELECTION: 328, // Classic dairy selection
    FANCIFUL_DAIRY_SELECTION: 329, // Fanciful dairy selection
    DRAGON_COOKIE: 330, // Dragon cookie
    GOLDEN_SWITCH_OFF: 331, // Golden switch [off]
    GOLDEN_SWITCH_ON: 332, // Golden switch [on]
    MILK_SELECTOR: 333, // Milk selector
    MILK_CHOCOLATE_BUTTER_BISCUIT: 334, // Milk chocolate butter biscuit
    DARK_CHOCOLATE_BUTTER_BISCUIT: 335, // Dark chocolate butter biscuit
    WHITE_CHOCOLATE_BUTTER_BISCUIT: 336, // White chocolate butter biscuit
    RUBY_CHOCOLATE_BUTTER_BISCUIT: 337, // Ruby chocolate butter biscuit
    GINGERSNAPS: 338, // Gingersnaps
    CINNAMON_COOKIES: 339, // Cinnamon cookies
    VANITY_COOKIES: 340, // Vanity cookies
    CIGARS: 341, // Cigars
    PINWHEEL_COOKIES: 342, // Pinwheel cookies
    FUDGE_SQUARES: 343, // Fudge squares
    DIGITS: 344, // Digits
    BUTTER_HORSESHOES: 345, // Butter horseshoes
    BUTTER_PUCKS: 346, // Butter pucks
    BUTTER_KNOTS: 347, // Butter knots
    BUTTER_SLABS: 348, // Butter slabs
    BUTTER_SWIRLS: 349, // Butter swirls
    SHORTBREAD_BISCUITS: 350, // Shortbread biscuits
    MILLIONAIRES: 351, // Millionaires\
    CARAMEL_COOKIES: 352, // Caramel cookies
    BELPHEGOR: 353, // Belphegor
    MAMMON: 354, // Mammon
    ABADDON: 355, // Abaddon
    SATAN: 356, // Satan
    ASMODEUS: 357, // Asmodeus
    BEELZEBUB: 358, // Beelzebub
    LUCIFER: 359, // Lucifer
    GOLDEN_COOKIE_ALERT_SOUND: 360, // Golden cookie alert sound
    GOLDEN_COOKIE_SOUND_SELECTOR: 361, // Golden cookie sound selector
    BASIC_WALLPAPER_ASSORTMENT: 362, // Basic wallpaper assortment
    LEGACY: 363, // Legacy
    ELDER_SPICE: 364, // Elder spice
    RESIDUAL_LUCK: 365, // Residual luck
    FANTASTEEL_MOUSE: 366, // Fantasteel mouse
    NEVERCRACK_MOUSE: 367, // Nevercrack mouse
    FIVEFINGER_DISCOUNT: 368, // Five-finger discount
    FUTURE_ALMANACS: 369, // Future almanacs
    RAIN_PRAYER: 370, // Rain prayer
    SEISMIC_MAGIC: 371, // Seismic magic
    ASTEROID_MINING: 372, // Asteroid mining
    QUANTUM_ELECTRONICS: 373, // Quantum electronics
    TEMPORAL_OVERCLOCKING: 374, // Temporal overclocking
    CONTRACTS_FROM_BEYOND: 375, // Contracts from beyond
    PRINTING_PRESSES: 376, // Printing presses
    PAGANISM: 377, // Paganism
    GOD_PARTICLE: 378, // God particle
    ARCANE_KNOWLEDGE: 379, // Arcane knowledge
    MAGICAL_BOTANY: 380, // Magical botany
    FOSSIL_FUELS: 381, // Fossil fuels
    SHIPYARDS: 382, // Shipyards
    PRIMORDIAL_ORES: 383, // Primordial ores
    GOLD_FUND: 384, // Gold fund
    INFERNAL_CROPS: 385, // Infernal crops
    ABYSMAL_GLIMMER: 386, // Abysmal glimmer
    RELATIVISTIC_PARSECSKIPPING: 387, // Relativistic parsec-skipping
    PRIMEVAL_GLOW: 388, // Primeval glow
    EXTRA_PHYSICS_FUNDING: 389, // Extra physics funding
    CHEMICAL_PROFICIENCY: 390, // Chemical proficiency
    LIGHT_MAGIC: 391, // Light magic
    MYSTICAL_ENERGIES: 392, // Mystical energies
    SYNERGIES_VOL_I: 393, // Synergies Vol. I
    SYNERGIES_VOL_II: 394, // Synergies Vol. II
    HEAVENLY_COOKIES: 395, // Heavenly cookies
    WRINKLY_COOKIES: 396, // Wrinkly cookies
    DISTILLED_ESSENCE_OF_REDOUBLED_LUCK: 397, // Distilled essence of redoubled luck
    OCCULT_OBSTRUCTION: 398, // Occult obstruction
    GLUCOSECHARGED_AIR: 399, // Glucose-charged air
    LAVENDER_CHOCOLATE_BUTTER_BISCUIT: 400, // Lavender chocolate butter biscuit
    LOMBARDIA_COOKIES: 401, // Lombardia cookies
    BASTENAKEN_COOKIES: 402, // Bastenaken cookies
    PECAN_SANDIES: 403, // Pecan sandies
    MORAVIAN_SPICE_COOKIES: 404, // Moravian spice cookies
    ANZAC_BISCUITS: 405, // Anzac biscuits
    BUTTERCAKES: 406, // Buttercakes
    ICE_CREAM_SANDWICHES: 407, // Ice cream sandwiches
    STEVIA_CAELESTIS: 408, // Stevia Caelestis
    DIABETICA_DAEMONICUS: 409, // Diabetica Daemonicus
    SUCRALOSIA_INUTILIS: 410, // Sucralosia Inutilis
    LUCKY_DIGIT: 411, // Lucky digit
    LUCKY_NUMBER: 412, // Lucky number
    LUCKY_PAYOUT: 413, // Lucky payout
    BACKGROUND_SELECTOR: 414, // Background selector
    LUCKY_GRANDMAS: 415, // Lucky grandmas
    YOUR_LUCKY_COOKIE: 416, // Your lucky cookie
    ALL_BETS_ARE_OFF_MAGIC_COIN: 417, // "All Bets Are Off" magic coin
    WINNING_LOTTERY_TICKET: 418, // Winning lottery ticket
    FOURLEAF_CLOVER_FIELD: 419, // Four-leaf clover field
    A_RECIPE_BOOK_ABOUT_BOOKS: 420, // A recipe book about books
    LEPRECHAUN_VILLAGE: 421, // Leprechaun village
    IMPROBABILITY_DRIVE: 422, // Improbability drive
    ANTISUPERSTISTRONICS: 423, // Antisuperstistronics
    GEMMED_TALISMANS: 424, // Gemmed talismans
    KITTEN_CONSULTANTS: 425, // Kitten consultants
    BIRTHDAY_COOKIE: 426, // Birthday cookie
    ARMYTHRIL_MOUSE: 427, // Armythril mouse
    REVERSE_DEMENTIA: 428, // Reverse dementia
    HUMANE_PESTICIDES: 429, // Humane pesticides
    MOLE_PEOPLE: 430, // Mole people
    MACHINE_LEARNING: 431, // Machine learning
    EDIBLE_MONEY: 432, // Edible money
    SICK_RAP_PRAYERS: 433, // Sick rap prayers
    DELUXE_TAILORED_WANDS: 434, // Deluxe tailored wands
    AUTOPILOT: 435, // Autopilot
    THE_ADVENT_OF_CHEMISTRY: 436, // The advent of chemistry
    THE_REAL_WORLD: 437, // The real world
    SECOND_SECONDS: 438, // Second seconds
    QUANTUM_COMB: 439, // Quantum comb
    CRYSTAL_MIRRORS: 440, // Crystal mirrors
    BUNNYPEDES: 441, // Bunnypedes
    KITTEN_ASSISTANTS_TO_THE_REGIONAL_MANAGER: 442, // Kitten assistants to the regional manager
    CHARM_QUARKS: 443, // Charm quarks
    PINK_BISCUITS: 444, // Pink biscuits
    WHOLEGRAIN_COOKIES: 445, // Whole-grain cookies
    CANDY_COOKIES: 446, // Candy cookies
    BIG_CHIP_COOKIES: 447, // Big chip cookies
    ONE_CHIP_COOKIES: 448, // One chip cookies
    SUGAR_BAKING: 449, // Sugar baking
    SUGAR_CRAVING: 450, // Sugar craving
    SUGAR_AGING_PROCESS: 451, // Sugar aging process
    SUGAR_FRENZY: 452, // Sugar frenzy
    SPRINKLES_COOKIES: 453, // Sprinkles cookies
    PEANUT_BUTTER_BLOSSOMS: 454, // Peanut butter blossoms
    NOBAKE_COOKIES: 455, // No-bake cookies
    FLORENTINES: 456, // Florentines
    CHOCOLATE_CRINKLES: 457, // Chocolate crinkles
    MAPLE_COOKIES: 458, // Maple cookies
    TURBOCHARGED_SOIL: 459, // Turbo-charged soil
    TECHNOBSIDIAN_MOUSE: 460, // Technobsidian mouse
    PLASMARBLE_MOUSE: 461, // Plasmarble mouse
    KITTEN_MARKETEERS: 462, // Kitten marketeers
    FESTIVITY_LOOPS: 463, // Festivity loops
    PERSIAN_RICE_COOKIES: 464, // Persian rice cookies
    NORWEGIAN_COOKIES: 465, // Norwegian cookies
    CRISPY_RICE_COOKIES: 466, // Crispy rice cookies
    UBE_COOKIES: 467, // Ube cookies
    BUTTERSCOTCH_COOKIES: 468, // Butterscotch cookies
    SPECULAAS: 469, // Speculaas
    ELDERWORT_BISCUITS: 470, // Elderwort biscuits
    BAKEBERRY_COOKIES: 471, // Bakeberry cookies
    DUKETATER_COOKIES: 472, // Duketater cookies
    GREEN_YEAST_DIGESTIVES: 473, // Green yeast digestives
    FERN_TEA: 474, // Fern tea
    ICHOR_SYRUP: 475, // Ichor syrup
    WHEAT_SLIMS: 476, // Wheat slims
    SYNTHETIC_CHOCOLATE_GREEN_HONEY_BUTTER_BISCUIT: 477, // Synthetic chocolate green honey butter biscuit
    ROYAL_RASPBERRY_CHOCOLATE_BUTTER_BISCUIT: 478, // Royal raspberry chocolate butter biscuit
    ULTRACONCENTRATED_HIGHENERGY_CHOCOLATE_BUTTER_BISCUIT: 479, // Ultra-concentrated high-energy chocolate butter biscuit
    TIMEPROOF_HAIR_DYES: 480, // Timeproof hair dyes
    BARNSTARS: 481, // Barnstars
    MINE_CANARIES: 482, // Mine canaries
    BROWNIE_POINT_SYSTEM: 483, // Brownie point system
    GRAND_SUPERCYCLES: 484, // Grand supercycles
    PSALMREADING: 485, // Psalm-reading
    IMMOBILE_SPELLCASTING: 486, // Immobile spellcasting
    RESTAURANTS_AT_THE_END_OF_THE_UNIVERSE: 487, // Restaurants at the end of the universe
    ON_SECOND_THOUGHT: 488, // On second thought
    DIMENSIONAL_GARBAGE_GULPER: 489, // Dimensional garbage gulper
    ADDITIONAL_CLOCK_HANDS: 490, // Additional clock hands
    BAKING_NOBEL_PRIZE: 491, // Baking Nobel prize
    REVERSE_THEORY_OF_LIGHT: 492, // Reverse theory of light
    REVISED_PROBABILISTICS: 493, // Revised probabilistics
    KITTEN_ANALYSTS: 494, // Kitten analysts
    EYE_OF_THE_WRINKLER: 495, // Eye of the wrinkler
    INSPIRED_CHECKLIST: 496, // Inspired checklist
    PURE_PITCHBLACK_CHOCOLATE_BUTTER_BISCUIT: 497, // Pure pitch-black chocolate butter biscuit
    CHOCOLATE_OATMEAL_COOKIES: 498, // Chocolate oatmeal cookies
    MOLASSES_COOKIES: 499, // Molasses cookies
    BISCOTTI: 500, // Biscotti
    WAFFLE_COOKIES: 501, // Waffle cookies
    ALMOND_COOKIES: 502, // Almond cookies
    HAZELNUT_COOKIES: 503, // Hazelnut cookies
    WALNUT_COOKIES: 504, // Walnut cookies
    LABEL_PRINTER: 505, // Label printer
    GOOD_MANNERS: 506, // Good manners
    LINDWORMS: 507, // Lindworms
    BORE_AGAIN: 508, // Bore again
    VOLUNTEER_INTERNS: 509, // "Volunteer" interns
    RULES_OF_ACQUISITION: 510, // Rules of acquisition
    WAR_OF_THE_GODS: 511, // War of the gods
    ELECTRICITY: 512, // Electricity
    UNIVERSAL_ALPHABET: 513, // Universal alphabet
    PUBLIC_BETTERMENT: 514, // Public betterment
    EMBEDDED_MICROPORTALS: 515, // Embedded microportals
    NOSTALGIA: 516, // Nostalgia
    THE_DEFINITE_MOLECULE: 517, // The definite molecule
    LIGHT_CAPTURE_MEASURES: 518, // Light capture measures
    _0SIDED_DICE: 519, // 0-sided dice
    HERALDS: 520, // Heralds
    METAGRANDMAS: 521, // Metagrandmas
    METABAKERIES: 522, // Metabakeries
    MANDELBROWN_SUGAR: 523, // Mandelbrown sugar
    FRACTOIDS: 524, // Fractoids
    NESTED_UNIVERSE_THEORY: 525, // Nested universe theory
    MENGER_SPONGE_CAKE: 526, // Menger sponge cake
    ONE_PARTICULARLY_GOODHUMORED_COW: 527, // One particularly good-humored cow
    CHOCOLATE_OUROBOROS: 528, // Chocolate ouroboros
    NESTED: 529, // Nested
    SPACEFILLING_FIBERS: 530, // Space-filling fibers
    ENDLESS_BOOK_OF_PROSE: 531, // Endless book of prose
    THE_SET_OF_ALL_SETS: 532, // The set of all sets
    RECURSIVE_MIRRORS: 533, // Recursive mirrors
    COMPOUNDED_ODDS: 534, // Compounded odds
    MICE_CLICKING_MICE: 535, // Mice clicking mice
    CUSTARD_CREAMS: 536, // Custard creams
    BOURBON_BISCUITS: 537, // Bourbon biscuits
    KEEPSAKES: 538, // Keepsakes
    MINICOOKIES: 539, // Mini-cookies
    SUGAR_CRYSTAL_COOKIES: 540, // Sugar crystal cookies
    BOX_OF_MAYBE_COOKIES: 541, // Box of maybe cookies
    BOX_OF_NOT_COOKIES: 542, // Box of not cookies
    BOX_OF_PASTRIES: 543, // Box of pastries
    PROFITEROLES: 544, // Profiteroles
    JELLY_DONUT: 545, // Jelly donut
    GLAZED_DONUT: 546, // Glazed donut
    CHOCOLATE_CAKE: 547, // Chocolate cake
    STRAWBERRY_CAKE: 548, // Strawberry cake
    APPLE_PIE: 549, // Apple pie
    LEMON_MERINGUE_PIE: 550, // Lemon meringue pie
    BUTTER_CROISSANT: 551, // Butter croissant
    COOKIE_DOUGH: 552, // Cookie dough
    BURNT_COOKIE: 553, // Burnt cookie
    A_CHOCOLATE_CHIP_COOKIE_BUT_WITH_THE_CHIPS_PICKED_OFF_FOR_SOME_REASON: 554, // A chocolate chip cookie but with the chips picked off for some reason
    FLAVOR_TEXT_COOKIE: 555, // Flavor text cookie
    HIGHDEFINITION_COOKIE: 556, // High-definition cookie
    TOAST: 557, // Toast
    PEANUT_BUTTER_JELLY: 558, // Peanut butter & jelly
    WOOKIES: 559, // Wookies
    CHEESEBURGER: 560, // Cheeseburger
    ONE_LONE_CHOCOLATE_CHIP: 561, // One lone chocolate chip
    GENIUS_ACCOUNTING: 562, // Genius accounting
    SHIMMERING_VEIL: 563, // Shimmering veil
    SHIMMERING_VEIL_OFF: 564, // Shimmering veil [off]
    SHIMMERING_VEIL_ON: 565, // Shimmering veil [on]
    WHOOPIE_PIES: 566, // Whoopie pies
    CARAMEL_WAFER_BISCUITS: 567, // Caramel wafer biscuits
    CHOCOLATE_CHIP_MOCHA_COOKIES: 568, // Chocolate chip mocha cookies
    EARL_GREY_COOKIES: 569, // Earl Grey cookies
    CORN_SYRUP_COOKIES: 570, // Corn syrup cookies
    ICEBOX_COOKIES: 571, // Icebox cookies
    GRAHAM_CRACKERS: 572, // Graham crackers
    HARDTACK: 573, // Hardtack
    CORNFLAKE_COOKIES: 574, // Cornflake cookies
    TOFU_COOKIES: 575, // Tofu cookies
    GLUTENFREE_COOKIES: 576, // Gluten-free cookies
    RUSSIAN_BREAD_COOKIES: 577, // Russian bread cookies
    LEBKUCHEN: 578, // Lebkuchen
    AACHENER_PRINTEN: 579, // Aachener Printen
    CANISTRELLI: 580, // Canistrelli
    NICE_BISCUITS: 581, // Nice biscuits
    FRENCH_PURE_BUTTER_COOKIES: 582, // French pure butter cookies
    PETIT_BEURRE: 583, // Petit beurre
    NANAIMO_BARS: 584, // Nanaimo bars
    BERGER_COOKIES: 585, // Berger cookies
    CHINSUKO: 586, // Chinsuko
    PANDA_KOALA_BISCUITS: 587, // Panda koala biscuits
    PUTRI_SALJU: 588, // Putri salju
    MILK_COOKIES: 589, // Milk cookies
    COOKIE_CRUMBS: 590, // Cookie crumbs
    CHOCOLATE_CHIP_COOKIE: 591, // Chocolate chip cookie
    COSMIC_BEGINNER: 592, // Cosmic beginner\
    REINFORCED_MEMBRANE: 593, // Reinforced membrane
    BINARY_GRANDMAS: 594, // Binary grandmas
    THE_JAVASCRIPT_CONSOLE_FOR_DUMMIES: 595, // The JavaScript console for dummies
    _64BIT_ARRAYS: 596, // 64bit arrays
    STACK_OVERFLOW: 597, // Stack overflow
    ENTERPRISE_COMPILER: 598, // Enterprise compiler
    SYNTACTIC_SUGAR: 599, // Syntactic sugar
    A_NICE_CUP_OF_COFFEE: 600, // A nice cup of coffee
    JUSTINTIME_BAKING: 601, // Just-in-time baking
    COOKIES: 602, // cookies++
    SOFTWARE_UPDATES: 603, // Software updates
    GAMELOOP: 604, // Game.Loop
    EVAL: 605, // eval()
    SCRIPT_GRANNIES: 606, // Script grannies
    TOMBOLA_COMPUTING: 607, // Tombola computing
    KRUIDNOTEN: 608, // Kruidnoten
    MARIE_BISCUITS: 609, // Marie biscuits
    MERINGUE_COOKIES: 610, // Meringue cookies
    PIZZA: 611, // Pizza
    CRACKERS: 612, // Crackers
    HAVABREAKS: 613, // Havabreaks
    KITTEN_EXECUTIVES: 614, // Kitten executives
    CHAI_TEA_COOKIES: 615, // Chai tea cookies
    YOGURT_COOKIES: 616, // Yogurt cookies
    THUMBPRINT_COOKIES: 617, // Thumbprint cookies
    PIZZELLE: 618, // Pizzelle
    ZILLA_WAFERS: 619, // Zilla wafers
    DIM_DAMS: 620, // Dim Dams
    CANDY: 621, // Candy
    FORTUNE_001: 622, // Fortune #001
    FORTUNE_002: 623, // Fortune #002
    FORTUNE_003: 624, // Fortune #003
    FORTUNE_004: 625, // Fortune #004
    FORTUNE_005: 626, // Fortune #005
    FORTUNE_006: 627, // Fortune #006
    FORTUNE_007: 628, // Fortune #007
    FORTUNE_008: 629, // Fortune #008
    FORTUNE_009: 630, // Fortune #009
    FORTUNE_010: 631, // Fortune #010
    FORTUNE_011: 632, // Fortune #011
    FORTUNE_012: 633, // Fortune #012
    FORTUNE_013: 634, // Fortune #013
    FORTUNE_014: 635, // Fortune #014
    FORTUNE_015: 636, // Fortune #015
    FORTUNE_016: 637, // Fortune #016
    FORTUNE_017: 638, // Fortune #017
    FORTUNE_100: 639, // Fortune #100
    FORTUNE_101: 640, // Fortune #101
    FORTUNE_102: 641, // Fortune #102
    FORTUNE_103: 642, // Fortune #103
    FORTUNE_104: 643, // Fortune #104
    FORTUNE_COOKIES: 644, // Fortune cookies
    A_REALLY_GOOD_GUIDE_BOOK: 646, // A really good guide book
    PRISM_HEART_BISCUITS: 647, // Prism heart biscuits
    KITTEN_WAGES: 648, // Kitten wages
    PET_THE_DRAGON: 649, // Pet the dragon
    DRAGON_SCALE: 650, // Dragon scale
    DRAGON_CLAW: 651, // Dragon claw
    DRAGON_FANG: 652, // Dragon fang
    DRAGON_TEDDY_BEAR: 653, // Dragon teddy bear
    GRANOLA_COOKIES: 654, // Granola cookies
    RICOTTA_COOKIES: 655, // Ricotta cookies
    ROZE_KOEKEN: 656, // Roze koeken
    PEANUT_BUTTER_CUP_COOKIES: 657, // Peanut butter cup cookies
    SESAME_COOKIES: 658, // Sesame cookies
    TAIYAKI: 659, // Taiyaki
    VANILLEKIPFERL: 660, // Vanillekipferl
    COSMIC_CHOCOLATE_BUTTER_BISCUIT: 661, // Cosmic chocolate butter biscuit
    NONILLION_FINGERS: 662, // Nonillion fingers
    MIRACULITE_MOUSE: 663, // Miraculite mouse
    GENERATION_DEGENERATION: 664, // Generation degeneration
    GLOBAL_SEED_VAULT: 665, // Global seed vault
    AIR_MINING: 666, // Air mining
    BEHAVIORAL_REFRAMING: 667, // Behavioral reframing
    ALTRUISTIC_LOOP: 668, // Altruistic loop
    A_NOVEL_IDEA: 669, // A novel idea
    SPELLING_BEES: 670, // Spelling bees
    TOROID_UNIVERSE: 671, // Toroid universe
    HERMETIC_RECONCILIATION: 672, // Hermetic reconciliation
    HIS_ADVENT: 673, // His advent
    SPLIT_SECONDS: 674, // Split seconds
    FLAVOR_ITSELF: 675, // Flavor itself
    LIGHT_SPEED_LIMIT: 676, // Light speed limit
    A_TOUCH_OF_DETERMINISM: 677, // A touch of determinism
    THIS_UPGRADE: 678, // This upgrade
    YOUR_BIGGEST_FANS: 679, // Your biggest fans
    BATTENBERG_BISCUITS: 680, // Battenberg biscuits
    ROSETTE_COOKIES: 681, // Rosette cookies
    GANGMAKERS: 682, // Gangmakers
    WELSH_COOKIES: 683, // Welsh cookies
    RASPBERRY_CHEESECAKE_COOKIES: 684, // Raspberry cheesecake cookies
    ALTERNATE_GRANDMAS: 685, // Alternate grandmas
    MANIFEST_DESTINY: 686, // Manifest destiny
    THE_MULTIVERSE_IN_A_NUTSHELL: 687, // The multiverse in a nutshell
    ALLCONVERSION: 688, // All-conversion
    MULTIVERSE_AGENTS: 689, // Multiverse agents
    ESCAPE_PLAN: 690, // Escape plan
    GAME_DESIGN: 691, // Game design
    SANDBOX_UNIVERSES: 692, // Sandbox universes
    MULTIVERSE_WARS: 693, // Multiverse wars
    MOBILE_PORTS: 694, // Mobile ports
    ENCAPSULATED_REALITIES: 695, // Encapsulated realities
    EXTRINSIC_CLICKING: 696, // Extrinsic clicking
    UNIVERSAL_IDLING: 697, // Universal idling
    PERFORATED_MILLEFEUILLE_COSMOS: 698, // Perforated mille-feuille cosmos
    INFRAVERSES_AND_SUPERVERSES: 699, // Infraverses and superverses
    FORTUNE_018: 700, // Fortune #018
    BUTTER_BISCUIT_WITH_BUTTER: 701, // Butter biscuit (with butter)
    VISITS: 702, // Visits
    REVERSEVEGANISM: 703, // Reverse-veganism
    CARAMEL_ALLOYS: 704, // Caramel alloys
    THE_INFINITY_ENGINE: 705, // The infinity engine
    DIMINISHING_TAX_RETURNS: 706, // Diminishing tax returns
    APPARITIONS: 707, // Apparitions
    WIZARD_BASEMENTS: 708, // Wizard basements
    PRIME_DIRECTIVE: 709, // Prime directive
    CHROMATIC_CYCLING: 710, // Chromatic cycling
    DOMESTIC_RIFTS: 711, // Domestic rifts
    PATIENCE_ABOLISHED: 712, // Patience abolished
    DELICIOUS_PULL: 713, // Delicious pull
    OCCAM: 714, // Occam\
    ON_A_STREAK: 715, // On a streak
    A_BOX: 716, // A box
    HACKER_SHADES: 717, // Hacker shades
    BREAK_THE_FIFTH_WALL: 718, // Break the fifth wall
    CAT_LADIES: 719, // Cat ladies
    MILKHELPREG_LACTOSE_INTOLERANCE_RELIEF_TABLETS: 720, // Milkhelp&reg; lactose intolerance relief tablets
    AURA_GLOVES: 721, // Aura gloves
    LUMINOUS_GLOVES: 722, // Luminous gloves
    BOKKENPOOTJES: 723, // Bokkenpootjes
    FAT_RASCALS: 724, // Fat rascals
    ISCHLER_COOKIES: 725, // Ischler cookies
    MATCHA_COOKIES: 726, // Matcha cookies
    EARL_GREY_MACARONS: 727, // Earl Grey macarons
    POKEY: 728, // Pokey
    CASHEW_COOKIES: 729, // Cashew cookies
    MILK_CHOCOLATE_COOKIES: 730, // Milk chocolate cookies
    BRAINY_GRANDMAS: 731, // Brainy grandmas
    PRINCIPLED_NEURAL_SHACKLES: 732, // Principled neural shackles
    OBEY: 733, // Obey
    A_SPRINKLE_OF_IRRATIONALITY: 734, // A sprinkle of irrationality
    FRONT_AND_BACK_HEMISPHERES: 735, // Front and back hemispheres
    NEURAL_NETWORKING: 736, // Neural networking
    COSMIC_BRAINSTORMS: 737, // Cosmic brainstorms
    MEGATHERAPY: 738, // Megatherapy
    SYNAPTIC_LUBRICANT: 739, // Synaptic lubricant
    PSYCHOKINESIS: 740, // Psychokinesis
    SPINES: 741, // Spines
    NEURAFORMING: 742, // Neuraforming
    EPISTEMOLOGICAL_TRICKERY: 743, // Epistemological trickery
    EVERY_POSSIBLE_IDEA: 744, // Every possible idea
    KITCHEN_CABINETS: 745, // Kitchen cabinets
    COOKIE_MULCH: 746, // Cookie mulch
    DELICIOUS_MINERALOGY: 747, // Delicious mineralogy
    NDIMENSIONAL_ASSEMBLY_LINES: 748, // N-dimensional assembly lines
    COOKIE_POINTS: 749, // Cookie Points
    NEGATHEISM: 750, // Negatheism
    MAGICAL_REALISM: 751, // Magical realism
    COSMIC_FOREGROUND_RADIATION: 752, // Cosmic foreground radiation
    ARCANIZED_GLASSWARE: 753, // Arcanized glassware
    PORTAL_GUNS: 754, // Portal guns
    TIMEPROOF_UPHOLSTERY: 755, // Timeproof upholstery
    EMPLOYEE_MINIFICATION: 756, // Employee minification
    HYPERBLACK_PAINT: 757, // Hyperblack paint
    SILVER_LINING_MAXIMIZATION: 758, // Silver lining maximization
    MULTISCALE_PROFILING: 759, // Multiscale profiling
    PHP_CONTAINMENT_VATS: 760, // PHP containment vats
    OPPOSITE_UNIVERSE: 761, // Opposite universe
    THE_LAND_OF_DREAMS: 762, // The land of dreams
    THOUGHTS_PRAYERS: 763, // Thoughts & prayers
    FERTILE_MINDS: 764, // Fertile minds
    FORTUNE_019: 765, // Fortune #019
    DECILLION_FINGERS: 766, // Decillion fingers
    AETHERICE_MOUSE: 767, // Aetherice mouse
    KITTEN_ADMINS: 768, // Kitten admins
    EVERYBUTTER_BISCUIT: 769, // Everybutter biscuit
    UNSHACKLED_: 770, // Unshackled 
    UNSHACKLED_CURSORS: 771, // Unshackled cursors
    UNSHACKLED_GRANDMAS: 772, // Unshackled grandmas
    UNSHACKLED_FARMS: 773, // Unshackled farms
    UNSHACKLED_MINES: 774, // Unshackled mines
    UNSHACKLED_FACTORIES: 775, // Unshackled factories
    UNSHACKLED_BANKS: 776, // Unshackled banks
    UNSHACKLED_TEMPLES: 777, // Unshackled temples
    UNSHACKLED_WIZARD_TOWERS: 778, // Unshackled wizard towers
    UNSHACKLED_SHIPMENTS: 779, // Unshackled shipments
    UNSHACKLED_ALCHEMY_LABS: 780, // Unshackled alchemy labs
    UNSHACKLED_PORTALS: 781, // Unshackled portals
    UNSHACKLED_TIME_MACHINES: 782, // Unshackled time machines
    UNSHACKLED_ANTIMATTER_CONDENSERS: 783, // Unshackled antimatter condensers
    UNSHACKLED_PRISMS: 784, // Unshackled prisms
    UNSHACKLED_CHANCEMAKERS: 785, // Unshackled chancemakers
    UNSHACKLED_FRACTAL_ENGINES: 786, // Unshackled fractal engines
    UNSHACKLED_JAVASCRIPT_CONSOLES: 787, // Unshackled javascript consoles
    UNSHACKLED_IDLEVERSES: 788, // Unshackled idleverses
    UNSHACKLED_CORTEX_BAKERS: 789, // Unshackled cortex bakers
    UNSHACKLED_FLAVOR: 790, // Unshackled flavor
    UNSHACKLED_BERRYLIUM: 791, // Unshackled berrylium
    UNSHACKLED_BLUEBERRYLIUM: 792, // Unshackled blueberrylium
    UNSHACKLED_CHALCEDHONEY: 793, // Unshackled chalcedhoney
    UNSHACKLED_BUTTERGOLD: 794, // Unshackled buttergold
    UNSHACKLED_SUGARMUCK: 795, // Unshackled sugarmuck
    UNSHACKLED_JETMINT: 796, // Unshackled jetmint
    UNSHACKLED_CHERRYSILVER: 797, // Unshackled cherrysilver
    UNSHACKLED_HAZELRALD: 798, // Unshackled hazelrald
    UNSHACKLED_MOONCANDY: 799, // Unshackled mooncandy
    UNSHACKLED_ASTROFUDGE: 800, // Unshackled astrofudge
    UNSHACKLED_ALABASCREAM: 801, // Unshackled alabascream
    UNSHACKLED_IRIDYUM: 802, // Unshackled iridyum
    UNSHACKLED_GLUCOSMIUM: 803, // Unshackled glucosmium
    DELICATE_TOUCH: 804, // Delicate touch
    STEADFAST_MURMUR: 805, // Steadfast murmur
    GLITTERING_EDGE: 806, // Glittering edge
    DISTINGUISHED_WALLPAPER_ASSORTMENT: 807, // Distinguished wallpaper assortment
    SOUND_TEST: 808, // Sound test
    JUKEBOX: 809, // Jukebox
    DALGONA_COOKIES: 810, // Dalgona cookies
    SPICY_COOKIES: 811, // Spicy cookies
    SMILE_COOKIES: 812, // Smile cookies
    KOLACHY_COOKIES: 813, // Kolachy cookies
    GOMMA_COOKIES: 814, // Gomma cookies
    VEGAN_COOKIES: 815, // Vegan cookies
    COYOTAS: 816, // Coyotas
    FROSTED_SUGAR_COOKIES: 817, // Frosted sugar cookies
    MARSHMALLOW_SANDWICH_COOKIES: 818, // Marshmallow sandwich cookies
    WEB_COOKIES: 819, // Web cookies
    STEAMED_COOKIES: 820, // Steamed cookies
    DEEPFRIED_COOKIE_DOUGH: 821, // Deep-fried cookie dough
    WRAPPING_PAPER: 822, // Wrapping paper
    HAVREFLARN: 823, // Havreflarn
    ALFAJORES: 824, // Alfajores
    GAUFRETTES: 825, // Gaufrettes
    COOKIE_BARS: 826, // Cookie bars
    NINES: 827, // Nines
    CLONE_GRANDMAS: 828, // Clone grandmas
    CLONING_VATS: 829, // Cloning vats
    ENERGIZED_NUTRIENTS: 830, // Energized nutrients
    STUNT_DOUBLES: 831, // Stunt doubles
    CLONE_RECYCLING_PLANT: 832, // Clone recycling plant
    FREERANGE_CLONES: 833, // Free-range clones
    GENETIC_TAILORING: 834, // Genetic tailoring
    POWER_IN_DIVERSITY: 835, // Power in diversity
    SELFBETTERMENT: 836, // Self-betterment
    SOURCE_CONTROL: 837, // Source control
    UNITED_WORKFORCE: 838, // United workforce
    SAFETY_PATROLS: 839, // Safety patrols
    CLONE_RIGHTS: 840, // Clone rights
    ONE_BIG_FAMILY: 841, // One big family
    FINETUNED_BODY_PLANS: 842, // Fine-tuned body plans
    FOAMTIPPED_CANES: 843, // Foam-tipped canes
    SELFDRIVING_TRACTORS: 844, // Self-driving tractors
    MINESHAFT_SUPPORTS: 845, // Mineshaft supports
    UNIVERSAL_AUTOMATION: 846, // Universal automation
    THE_BIG_SHORTCAKE: 847, // The big shortcake
    TEMPLE_TRAPS: 848, // Temple traps
    POLYMORPHISM: 849, // Polymorphism
    AT_YOUR_DOORSTEP_IN_30_MINUTES_OR_YOUR_MONEY_BACK: 850, // At your doorstep in 30 minutes or your money back
    THE_DOSE_MAKES_THE_POISON: 851, // The dose makes the poison
    A_WAY_HOME: 852, // A way home
    RECTIFYING_A_MISTAKE: 853, // Rectifying a mistake
    CANDIED_ATOMS: 854, // Candied atoms
    LAB_GOGGLES_BUT_LIKE_COOL_SHADES: 855, // Lab goggles but like cool shades
    GAMBLER: 856, // Gambler\
    THE_MORE_THEY_STAY_THE_SAME: 857, // The more they stay the same
    SIMULATION_FAILSAFES: 858, // Simulation failsafes
    THE_OTHER_ROUTES_TO_ROME: 859, // The other routes to Rome
    INTELLECTUAL_PROPERTY_THEFT: 860, // Intellectual property theft
    READING_YOUR_CLONES_BEDTIME_STORIES: 861, // Reading your clones bedtime stories
    ACCELERATED_DEVELOPMENT: 862, // Accelerated development
    PEER_REVIEW: 863, // Peer review
    FORTUNE_020: 864, // Fortune #020
    PERSONAL_BISCUIT: 865, // Personal biscuit
    UNSHACKLED_GLIMMERINGUE: 866, // Unshackled glimmeringue
    UNSHACKLED_YOU: 867, // Unshackled You
    KITTEN_STRATEGISTS: 868, // Kitten strategists
    BAKLAVAS: 869, // Baklavas
    SNOWBALL_COOKIES: 870, // Snowball cookies
    SEQUILHOS: 871, // Sequilhos
    HAZELNUT_SWIRLIES: 872, // Hazelnut swirlies
    SPRITZ_COOKIES: 873, // Spritz cookies
    MBATATA_COOKIES: 874, // Mbatata cookies
    SPRINGERLES: 875, // Springerles
    UNDECILLION_FINGERS: 876, // Undecillion fingers
    OMNIPLAST_MOUSE: 877, // Omniplast mouse
};
// ==================== Buildings ====================
const BUILDING_IDS = {
    CURSOR: 0, // Cursor
    GRANDMA: 1, // Grandma
    FARM: 2, // Farm
    MINE: 3, // Mine
    FACTORY: 4, // Factory
    BANK: 5, // Bank
    TEMPLE: 6, // Temple
    WIZARD_TOWER: 7, // Wizard tower
    SHIPMENT: 8, // Shipment
    ALCHEMY_LAB: 9, // Alchemy lab
    PORTAL: 10, // Portal
    TIME_MACHINE: 11, // Time machine
    ANTIMATTER_CONDENSER: 12, // Antimatter condenser
    PRISM: 13, // Prism
    CHANCEMAKER: 14, // Chancemaker
    FRACTAL_ENGINE: 15, // Fractal engine
    JAVASCRIPT_CONSOLE: 16, // Javascript console
    IDLEVERSE: 17, // Idleverse
    CORTEX_BAKER: 18, // Cortex baker
    YOU: 19, // You
};
// ==================== Building Names ====================
const BUILDING_NAMES = {
    CURSOR: 'Cursor',
    GRANDMA: 'Grandma',
    FARM: 'Farm',
    MINE: 'Mine',
    FACTORY: 'Factory',
    BANK: 'Bank',
    TEMPLE: 'Temple',
    WIZARD_TOWER: 'Wizard tower',
    SHIPMENT: 'Shipment',
    ALCHEMY_LAB: 'Alchemy lab',
    PORTAL: 'Portal',
    TIME_MACHINE: 'Time machine',
    ANTIMATTER_CONDENSER: 'Antimatter condenser',
    PRISM: 'Prism',
    CHANCEMAKER: 'Chancemaker',
    FRACTAL_ENGINE: 'Fractal engine',
    JAVASCRIPT_CONSOLE: 'Javascript console',
    IDLEVERSE: 'Idleverse',
    CORTEX_BAKER: 'Cortex baker',
    YOU: 'You',
};
// ==================== Pantheon Spirits ====================
const SPIRIT_IDS = {
    // Diamond slot (most powerful)
    HOLOBORE: 0, // +10% CpS
    MOKALSIUM: 1, // -25% cookie prices
    JEREMY: 2, // +10% building power
    DOTJEIESS: 3, // +5% golden cookie effects
    CYCLIUS: 4, // Cycles between -25% to +25% CpS
    GODZAMOK: 5, // Sell buildings for CpS bonus
    MURIDAL: 6, // +5% wrinkler reward
    SKRUUIA: 7, // +5% wrinkler reward
    VOMITRAX: 8, // Buildings +5%, CpS -5%
    SELEBRAK: 9, // Buildings -5%, CpS +5%
    RIGIDEL: 10, // Buildings cheaper with each 10 built
};
const SPIRIT_NAMES = {
    // Day spirits (normal operation)
    MOTHER: 'mother', // Holobore - +5% CpS
    DECADENCE: 'decadence', // Mokalsium - Buildings -1% price
    LABOR: 'labor', // Jeremy - Buildings +1% production
    // Night spirits (sleep mode)
    SCORN: 'scorn', // Skruuia - Wrinklers +15% cookies
    ORDER: 'order', // Dotjeiess - Sugar lumps ripen 1hr sooner
    ASCETICISM: 'asceticism', // Selebrak - Buildings -5%, CpS +5%
    INDUSTRY: 'industry', // Vomitrax - Buildings +10%, CpS -10%
    // Special spirits
    CYCLIUS: 'cyclius', // Cycles CpS modifier
    GODZAMOK: 'godzamok', // Sell buildings for temp CpS
    RIGIDEL: 'rigidel', // Discount every 10 buildings bought
};
// ==================== Dragon Auras ====================
const DRAGON_AURA_IDS = {
    BREATH_OF_MILK: 0, // Milk is 5% more powerful
    DRAGONS_FORTUNE: 1, // Golden cookies appear 5% more often
    RADIANT_APPETITE: 2, // Buildings produce 2% more
    DRAGONS_CURVE: 3, // Big cookie clicks are worth 5% more
    BREATH_OF_ETERNITY: 4, // Sugar lumps mature 5% sooner
    SUPREME_INTELLECT: 5, // Prisms produce 1% more per achievement
    EARTH_SHATTERER: 6, // Buildings produce 20% more (with Dragon Orbs)
    MIND_OVER_MATTER: 7, // Golden/wrath cookie effects last 5% longer
    FIERCE_HOARDER: 8, // -2% building prices
    REALITY_BENDING: 9, // Golden cookies last 5% longer
};
// ==================== Season Types ====================
const SEASON_NAMES = {
    NONE: '',
    CHRISTMAS: 'christmas',
    EASTER: 'easter',
    HALLOWEEN: 'halloween',
    VALENTINES: 'valentines',
};
// ==================== Garden Plants ====================
const PLANT_KEYS = {
    MEDDLEWEED: 'meddleweed',
    BROWN_MOLD: 'brownMold',
    CRUMBSPORE: 'crumbspore',
    BAKEBERRY: 'bakeberry',
    CHOCOROOT: 'chocoroot',
    WHITE_CHOCOROOT: 'whiteChocoroot',
    QUEENBEET: 'queenbeet',
    QUEENBEET_LUMP: 'queenbeetLump',
    DUKETATER: 'duketater',
    ELDERWORT: 'Elderwort',
    EVERDAISY: 'Everdaisy',
};
// Harvestable plants that drop cookies
const HARVESTABLE_PLANTS = [
    PLANT_KEYS.BAKEBERRY,
    PLANT_KEYS.CHOCOROOT,
    PLANT_KEYS.WHITE_CHOCOROOT,
    PLANT_KEYS.QUEENBEET,
    PLANT_KEYS.QUEENBEET_LUMP,
    PLANT_KEYS.DUKETATER,
];
/**
 * Plant mutation dependencies
 *
 * Each entry is [target, parent1, parent2] - plant parent1 and parent2 adjacent
 * to create the target plant through mutation.
 *
 * Ordered by planting priority:
 * - Index 0: dummy placeholder
 * - Index 1-2: Special expensive plants (queenbeetLump, everdaisy)
 * - Index 3+: Regular plants ordered by dependency level
 */
const PLANT_DEPENDENCIES = [
    ['dummy', 'dummy', 'dummy'], // Index 0: placeholder
    ['queenbeetLump', 'queenbeet', 'queenbeet'], // Index 1: Need queenbeet mature
    ['everdaisy', 'elderwort', 'tidygrass'], // Index 2: Need both unlocked
    // Queenbeet chain (most important)
    ['bakeberry', 'bakerWheat', 'bakerWheat'], // Level 1
    ['chocoroot', 'bakerWheat', 'brownMold'], // Level 1
    ['queenbeet', 'chocoroot', 'bakeberry'], // Level 2
    // Longest dependency chain
    ['thumbcorn', 'bakerWheat', 'bakerWheat'], // Level 1
    ['cronerice', 'bakerWheat', 'thumbcorn'], // Level 2
    ['gildmillet', 'thumbcorn', 'cronerice'], // Level 3
    ['clover', 'bakerWheat', 'gildmillet'], // Level 4
    ['shimmerlily', 'gildmillet', 'clover'], // Level 5
    ['elderwort', 'cronerice', 'shimmerlily'], // Level 6
    // Rest ordered by ripening times
    ['drowsyfern', 'chocoroot', 'keenmoss'], // Level 7
    ['duketater', 'queenbeet', 'queenbeet'], // Level 3
    ['tidygrass', 'bakerWheat', 'whiteChocoroot'], // Level 3
    ['nursetulip', 'whiskerbloom', 'whiskerbloom'], // Level 7
    ['doughshroom', 'crumbspore', 'crumbspore'], // Level 1
    ['wrinklegill', 'crumbspore', 'brownMold'], // Level 1
    ['shriekbulb', 'wrinklegill', 'elderwort'], // Level 7
    ['ichorpuff', 'crumbspore', 'elderwort'], // Level 7
    ['whiskerbloom', 'whiteChocoroot', 'shimmerlily'], // Level 6
    ['chimerose', 'whiskerbloom', 'shimmerlily'], // Level 7
    ['keenmoss', 'brownMold', 'greenRot'], // Level 6
    ['wardlichen', 'cronerice', 'whiteMildew'], // Level 3
    ['glovemorel', 'thumbcorn', 'crumbspore'], // Level 2
    ['whiteChocoroot', 'chocoroot', 'whiteMildew'], // Level 2
    ['whiteMildew', 'brownMold', 'brownMold'], // Level 1
    ['goldenClover', 'bakerWheat', 'gildmillet'], // Level 4
    ['greenRot', 'clover', 'whiteMildew'], // Level 5
    ['cheapcap', 'crumbspore', 'shimmerlily'], // Level 6
    ['foolBolete', 'greenRot', 'doughshroom'], // Level 6
];
// ==================== Stock Market Goods ====================
// Stock market good IDs match their index in market.goods array
const STOCK_GOOD_IDS = {
    CRL: 0, // Cookies (fast)
    CHC: 1, // Chocolate (fast)
    BTR: 2, // Butter (fast)
    SUG: 3, // Sugar (fast)
    NUT: 4, // Nuts (slow)
    SLT: 5, // Salt (slow)
    VNL: 6, // Vanilla (slow)
    EGG: 7, // Eggs (slow)
    CNM: 8, // Cinnamon (slow)
    CRM: 9, // Cream (slow)
    JAM: 10, // Jam (slow)
    WHT: 11, // Wheat (slow)
    HNY: 12, // Honey (slow)
    CKI: 13, // Cookie (slow)
    RCP: 14, // Recipe (slow)
    SBD: 15, // Sugar (slow)
    CRM2: 16, // Cream (slow)
};
// ==================== Grimoire Spells ====================
const SPELL_NAMES = {
    CONJURE_BAKED_GOODS: 'conjure baked goods',
    HAND_OF_FATE: 'hand of fate',
    STRETCH_TIME: 'stretch time',
    SPONTANEOUS_EDIFICE: 'spontaneous edifice',
    HAGGLER_LUCK: 'haggler\'s luck',
    SUMMON_CRAFTY_PIXIES: 'summon crafty pixies',
    GAMBLER_FEVER_DREAM: 'gambler\'s fever dream',
    RESURRECT_ABOMINATION: 'resurrect abomination',
    FORCE_THE_HAND_OF_FATE: 'force the hand of fate',
};
// ==================== Buff Names ====================
const BUFF_NAMES = {
    FRENZY: 'Frenzy',
    LUCKY: 'Lucky',
    CLICK_FRENZY: 'Click frenzy',
    DRAGONFLIGHT: 'Dragonflight',
    ELDER_FRENZY: 'Elder frenzy',
    CLOT: 'Clot',
    CURSED_FINGER: 'Cursed finger',
    BUILDING_SPECIAL: 'Building special',
    EVERYTHING_MUST_GO: 'Everything must go',
};
// ==================== Helper Arrays ====================
// Upgrades to avoid buying (for grandmapocalypse control)
const NON_ASCENSION_UPGRADES = (/* unused pure expression or super */ null && ([71, 72, 73, 87, 227]));
// Garden upgrade IDs
const GARDEN_UPGRADE_IDS = [470, 471, 472, 473, 474, 475, 476];
/**
 * Critical path achievements the bot works toward
 *
 * This is the ordered list of major achievements that define progression.
 * The bot focuses on these achievements in sequence.
 *
 * Last 10 achievements trigger "grinding" mode (no night sleep)
 * Last 8 achievements trigger "cheating" mode (aggressive golden cookie tactics)
 *
 * Final achievement: Just Right (397) - requires exact building counts
 */
const WANTED_ACHIEVEMENTS = [
    82, // Elder calm
    89, // 100 antimatter condensers
    108, // Halloween cookies unlocked
    // Bake X cookies achievements (progression milestones)
    225, 227, 229, 279, 280, 372, 373, 374, 375, 390, 391, 429, 451, 452, 453, 470, 471, 472,
    534, 535, 536, 578, 579, 586, 587, 592, 593,
    // End game achievements
    585, // Endless cycle (max CPS)
    575, // Overdose (max buildings of each type)
    397, // Just Right (exact building counts) - FINAL achievement
];
/**
 * Kitten upgrade IDs (boost CPS by milk percentage)
 */
const KITTEN_UPGRADES = (/* unused pure expression or super */ null && ([
    31, 32, 54, 108, 187, 320, 321, 322, 425, 442, 462, 494, 613, 766, 865,
]));
/**
 * Cursor upgrade IDs (special upgrades for cursor building)
 */
const CURSOR_UPGRADES = (/* unused pure expression or super */ null && ([
    0, 1, 2, 3, 4, 5, 6, 43, 82, 109, 188, 189, 660, 764, 873,
]));
/**
 * Sugar lump related achievements
 * These achievements require sugar lumps to complete
 * When all are achieved, the `finished` flag is set to true
 *
 * Includes:
 * - Building level achievements (307-319: level 10 for each building)
 * - Other lump-requiring achievements (336, 427, 447, 525, 396, 268, 271)
 */
const LUMP_RELATED_ACHIEVEMENTS = [
    // Building level 10 achievements (307-319)
    307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
    // Other lump achievements
    336, // All natural sugar lumps - own at least 100 sugar lumps
    427, // Starchild - harvest a bifurcated sugar lump
    447, // Sugar sugar - harvest 100 sugar lumps
    525, // Eldeer - have one of every reindeer upgrade
    396, // Elder - have at least 600 grandmas
    268, // Getting even with your food - harvest 7 elderwort crops in one run
    271, // Bicentennial - reach 200 of everything
];

;// ./src/modules/ClickManager.ts
/**
 * Handles automatic clicking of the big cookie
 * Respects Neverclick and True Neverclick achievements
 * Original: AutoPlay.handleClicking (lines 360-384)
 */

class ClickManager {
    constructor(context) {
        this.context = context;
        // Register configuration options
        this.context.configManager.registerOption('ClickMode', {
            id: 'ClickMode',
            type: 'select',
            label: 'Click Mode',
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'Normal (Human-like)' },
                { value: 2, label: 'Aggressive (Fast)' },
                { value: 3, label: 'Very Aggressive (Instant)' }
            ],
            default: 1,
            desc: 'How fast the bot clicks the big cookie.'
        }, 1, 'Clicking');
    }
    /**
     * Get current click mode (from live config)
     */
    getClickMode() {
        return this.context.Config.ClickMode || 0;
    }
    /**
     * Handle clicking - respects Neverclick/True Neverclick achievements
     * Original: AutoPlay.handleClicking (lines 360-378)
     */
    handleClicking() {
        const clickMode = this.getClickMode();
        if (clickMode === 0)
            return;
        // Respect Neverclick achievement (max 15 clicks)
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won && Game.cookieClicks <= 15) {
            return;
        }
        // Respect True Neverclick in Born Again endgame
        if (Game.ascensionMode === 1 && this.context.endPhase() &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won && !Game.cookieClicks) {
            return;
        }
        // Uncanny clicker achievement (5 clicks in a row within 1 second)
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won) {
            for (let i = 1; i < 6; i++) {
                setTimeout(() => Game.ClickCookie(), 50 * i);
            }
        }
        // Aggressive clicking (mode 2+)
        if (clickMode > 1) {
            for (let i = 1; i < 10; i++) {
                setTimeout(() => this.speedClicking(), 30 * i);
            }
        }
        else {
            // Normal clicking (mode 1)
            Game.ClickCookie();
            // Extra clicks during frenzy buffs
            if ('Click frenzy' in Game.buffs ||
                'Dragonflight' in Game.buffs ||
                'Cursed finger' in Game.buffs) {
                for (let i = 1; i < 5; i++) {
                    setTimeout(() => Game.ClickCookie(), 30 * i);
                }
            }
        }
    }
    /**
     * Speed clicking with multiplier (for aggressive click modes)
     * Original: AutoPlay.speedClicking (lines 380-383)
     */
    speedClicking() {
        const clickMode = this.getClickMode();
        Game.ClickCookie();
        const clickCount = 1 << (10 * (clickMode - 2));
        Game.ClickCookie(0, clickCount * Game.computedMouseCps);
    }
    /**
     * Get clicking status for dashboard
     */
    getStatus() {
        const clickMode = this.getClickMode();
        if (clickMode === 0) {
            return {
                module: 'Clicking',
                status: 'disabled',
                currentAction: 'Disabled',
                reason: 'Click mode set to OFF',
                icon: '👆',
                details: {
                    'Mode': 'OFF'
                }
            };
        }
        // Check if blocked by Neverclick
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won && Game.cookieClicks <= 15) {
            return {
                module: 'Clicking',
                status: 'waiting',
                currentAction: 'Waiting for Neverclick',
                reason: 'Protecting Neverclick achievement (max 15 clicks)',
                nextAction: Game.cookieClicks === 15 ? 'Will resume after achievement unlocked' : undefined,
                icon: '👆',
                details: {
                    'Clicks Used': `${Game.cookieClicks}/15`,
                    'Neverclick Won': false,
                    'Mode': this.getClickModeName()
                }
            };
        }
        // Check if blocked by True Neverclick in Born Again endgame
        if (Game.ascensionMode === 1 && this.context.endPhase() &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won && !Game.cookieClicks) {
            return {
                module: 'Clicking',
                status: 'waiting',
                currentAction: 'Waiting for True Neverclick',
                reason: 'Protecting True Neverclick achievement (0 clicks)',
                icon: '👆',
                details: {
                    'Clicks': 0,
                    'True Neverclick Won': false,
                    'Mode': 'Born Again',
                    'Click Mode': this.getClickModeName()
                }
            };
        }
        // Active clicking
        const clicksPerSecond = clickMode === 1 ? '~3-5' : '~10+';
        const hasFrenzy = 'Click frenzy' in Game.buffs || 'Dragonflight' in Game.buffs || 'Cursed finger' in Game.buffs;
        return {
            module: 'Clicking',
            status: 'active',
            currentAction: hasFrenzy ? 'Clicking (Frenzy active!)' : 'Auto-clicking big cookie',
            reason: this.getClickModeName(),
            nextAction: !Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won ? 'Working on Uncanny clicker achievement' : undefined,
            icon: '👆',
            details: {
                'Mode': this.getClickModeName(),
                'Clicks/sec': hasFrenzy ? '~15-20' : clicksPerSecond,
                'Total Clicks': typeof Beautify !== 'undefined' ? Beautify(Game.cookieClicks) : Game.cookieClicks,
                'Frenzy Active': hasFrenzy,
                'Uncanny Clicker': Game.AchievementsById[ACHIEVEMENT_IDS.UNCANNY_CLICKER].won
            }
        };
    }
    /**
     * Get human-readable click mode name
     */
    getClickModeName() {
        const clickMode = this.getClickMode();
        switch (clickMode) {
            case 0: return 'OFF';
            case 1: return 'Normal';
            case 2: return 'Aggressive';
            case 3: return 'Very Aggressive';
            default: return `Level ${clickMode}`;
        }
    }
}

;// ./src/modules/GoldenCookieHandler.ts
/**
 * Handles Golden Cookies, Reindeer, and other shimmers
 * Migrated from cookieAutoPlayBeta.js "Handle Cookies and Golden Cookies" section
 */

class GoldenCookieHandler {
    constructor(context) {
        this.cheatMax = 0;
        this.cheatMaxTime = Date.now();
        this.hyperActive = false;
        this.context = context;
        // Register configuration options
        this.context.configManager.registerOption('GoldenClickMode', {
            id: 'GoldenClickMode',
            type: 'select',
            label: 'Golden Cookie Clicks',
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Aggressive (Includes Storm Drops)' }
            ],
            default: 1,
            desc: 'How the bot handles golden cookies and reindeer.'
        }, 1, 'Clicking');
        this.context.configManager.registerOption('CheatGolden', {
            id: 'CheatGolden',
            type: 'select',
            label: 'Cheat Golden Cookies',
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'Auto (Smart Cheating)' },
                { value: 2, label: 'Level 10' },
                { value: 3, label: 'Level 40' },
                { value: 4, label: 'Level 70' },
                { value: 5, label: 'Level 100 (Max)' }
            ],
            default: 0,
            desc: 'Cheats to make golden cookies spawn faster. Disables achievements.'
        }, 0, 'Cheats');
    }
    /**
     * Get current GoldenClickMode (from live config)
     */
    getGoldenClickMode() {
        return this.context.Config.GoldenClickMode || 0;
    }
    /**
     * Get current CheatGolden (from live config)
     */
    getCheatGolden() {
        return this.context.Config.CheatGolden || 0;
    }
    /**
     * Returns whether the bot is in hyperactive mode (frequent updates needed)
     */
    isHyperActive() {
        return this.hyperActive;
    }
    /**
     * Reset hyperactive flag (call at start of each cycle)
     */
    resetHyperActive() {
        this.hyperActive = false;
    }
    /**
     * Main handler for golden cookies and reindeer
     * Pops first golden cookie or reindeer based on configuration
     */
    handleGoldenCookies() {
        const goldenClickMode = this.getGoldenClickMode();
        if (!goldenClickMode || goldenClickMode === 0)
            return;
        // Grab fortune cookie from ticker
        if (Game.TickerEffect) {
            Game.tickerL.click();
        }
        // Check if multiple golden cookies are active (hyperactive mode)
        if (Game.shimmerTypes['golden'].n >= 2) {
            this.hyperActive = true;
        }
        // Wait for Four-leaf cookie achievement if close
        if (Game.shimmerTypes['golden'].n >= 4 &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.FOURLEAF_COOKIE].won) {
            return; // wait for achievement
        }
        // Process all shimmers
        for (const sx in Game.shimmers) {
            const s = Game.shimmers[sx];
            this.hyperActive = true; // check whether full activity
            // Handle cookie storm drops (aggressive mode only)
            if (s.force === 'cookie storm drop' && goldenClickMode === 2) {
                s.pop();
                this.context.logAction('Clicked cookie storm drop', s.type);
            }
            // Click non-golden shimmers, or golden cookies that are about to expire
            if (s.type !== 'golden' ||
                s.life < Game.fps ||
                !Game.AchievementsById[ACHIEVEMENT_IDS.EARLY_BIRD].won) {
                this.clickShimmerWithTracking(s);
                return;
            }
            // Click golden cookies that have been around for a while (if we have Fading luck)
            if (s.life / Game.fps < s.dur - 2 &&
                Game.AchievementsById[ACHIEVEMENT_IDS.FADING_LUCK].won) {
                this.clickShimmerWithTracking(s);
                return;
            }
        }
        // Try to cheat golden cookies if configured
        this.cheatGoldenCookies();
    }
    /**
     * Click a shimmer and track the cookies gained
     */
    clickShimmerWithTracking(shimmer) {
        // Track cookies before clicking for Lucky/Lucky Frenzy bonus calculation
        const cookiesBefore = Game.cookies;
        shimmer.pop();
        const cookiesGained = Game.cookies - cookiesBefore;
        // Check if this was a Lucky or Lucky Frenzy golden cookie
        if (shimmer.type === 'golden' && cookiesGained > 0 && typeof Beautify !== 'undefined') {
            const bonusType = shimmer.force || 'fading luck';
            // Lucky and Lucky Frenzy both have "lucky" in their force name
            if (bonusType.toLowerCase().includes('lucky')) {
                this.context.logAction(`Clicked ${bonusType} golden cookie`, `💰 +${Beautify(cookiesGained)} cookies`);
                return;
            }
        }
        // Log regular shimmer click
        if (shimmer.type === 'golden') {
            this.context.logAction('Clicked golden cookie', shimmer.force || 'fading luck');
        }
        else {
            this.context.logAction(`Clicked ${shimmer.type}`, shimmer.force || 'shimmer');
        }
    }
    /**
     * Cheat golden cookies by advancing their spawn timer
     */
    cheatGoldenCookies() {
        const cheatGolden = this.getCheatGolden();
        if (!cheatGolden || cheatGolden === 0)
            return;
        // Don't cheat if Lucky payout isn't bought and we have enough heavenly chips
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought && Game.heavenlyChips > 77777777) {
            return;
        }
        let level = 10 + 30 * (cheatGolden - 1);
        if (cheatGolden === 1) {
            // Auto cheat mode
            if (this.context.wantAscend)
                return; // already cheated enough
            if (!this.context.grindingCheat())
                return; // only cheat in grinding
            const daysInRun = (this.context.now - Game.startDate) / 1000 / 60 / 60 / 24;
            if (daysInRun < 20)
                return; // cheat only after 20 days
            level = ((3 * daysInRun) << 0) - 20;
            if (level > 100)
                level = 100;
            const timeToNextLevel = (2 * 60 * 60 * 1000) / ((level - this.cheatMax + 8) / 10);
            if (this.context.now - this.cheatMaxTime >= timeToNextLevel) {
                this.cheatMaxTime = this.context.now;
                this.cheatMax++;
            }
            if (level > this.cheatMax)
                level = this.cheatMax;
            this.cheatMax = level;
        }
        this.context.addActivity(`Cheating golden cookies at level ${level}.`);
        const levelTime = (Game.shimmerTypes.golden.maxTime * level) / 140;
        if (Game.shimmerTypes.golden.time < levelTime) {
            Game.shimmerTypes.golden.time = levelTime;
        }
        /* golden cookie with building special:
        const newShimmer = new Game.shimmer("golden");
        newShimmer.force = "building special";
        */
    }
    /**
     * Check if we're in a frenzy buff state
     */
    hasFrenzyBuff() {
        return ('Click frenzy' in Game.buffs ||
            'Dragonflight' in Game.buffs ||
            'Cursed finger' in Game.buffs ||
            'Frenzy' in Game.buffs ||
            'Elder frenzy' in Game.buffs ||
            'Dragon Harvest' in Game.buffs);
    }
    /**
     * Check if we have a specific buff active
     */
    hasBuff(buffName) {
        return buffName in Game.buffs;
    }
    /**
     * Get remaining time for a buff in seconds
     */
    getBuffTimeRemaining(buffName) {
        if (buffName in Game.buffs) {
            return Math.ceil(Game.buffs[buffName].time / Game.fps);
        }
        return 0;
    }
    /**
     * Get current golden cookie handler status
     */
    getStatus() {
        const goldenClickMode = this.getGoldenClickMode();
        const cheatGolden = this.getCheatGolden();
        // Check if golden cookie clicking is enabled
        if (!goldenClickMode || goldenClickMode === 0) {
            return {
                module: 'Golden Cookies',
                status: 'disabled',
                currentAction: 'Disabled in config',
                reason: 'GoldenClickMode is set to 0 (off)',
                icon: '✨',
                details: {
                    'Mode': 'Off'
                }
            };
        }
        const goldenCount = Game.shimmerTypes['golden']?.n || 0;
        const activeShimmers = Game.shimmers.length;
        // Check for Four-leaf cookie achievement attempt
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.FOURLEAF_COOKIE].won &&
            Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER]?.amount > 500 &&
            Game.UpgradesById[UPGRADE_IDS.DISTILLED_ESSENCE_OF_REDOUBLED_LUCK]?.bought) {
            return {
                module: 'Golden Cookies',
                status: 'waiting',
                currentAction: 'Attempting Four-leaf cookie',
                reason: `Need 4 golden cookies on screen (currently ${goldenCount})`,
                nextAction: goldenCount >= 2 ? 'Will cast Hand of Fate' : 'Waiting for more golden cookies',
                icon: '✨',
                details: {
                    'Golden Cookies': goldenCount,
                    'Target': 4,
                    'Wizard Towers': Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER]?.amount || 0
                }
            };
        }
        // Check for active buffs
        const activeFrenzy = this.hasFrenzyBuff();
        const activeBuff = this.getActiveBuff();
        // Check for cheating mode
        if (cheatGolden && cheatGolden > 0) {
            const level = cheatGolden === 1 ? 'Auto' : cheatGolden;
            return {
                module: 'Golden Cookies',
                status: 'active',
                currentAction: 'Clicking golden cookies',
                reason: `Cheating enabled (level ${level})`,
                nextAction: activeFrenzy ? `Active: ${activeBuff}` : 'Waiting for golden cookies',
                icon: '✨',
                details: {
                    'Mode': goldenClickMode === 2 ? 'Aggressive' : 'Normal',
                    'Cheat Level': level,
                    'Active Shimmers': activeShimmers,
                    'Golden Cookies': goldenCount,
                    'Active Buff': activeBuff || 'None'
                }
            };
        }
        // Normal mode
        if (activeShimmers > 0) {
            return {
                module: 'Golden Cookies',
                status: 'active',
                currentAction: 'Clicking shimmers',
                reason: goldenClickMode === 2 ? 'Aggressive mode (includes storm drops)' : 'Normal mode',
                nextAction: activeFrenzy ? `Active buff: ${activeBuff}` : undefined,
                icon: '✨',
                details: {
                    'Mode': goldenClickMode === 2 ? 'Aggressive' : 'Normal',
                    'Active Shimmers': activeShimmers,
                    'Golden Cookies': goldenCount,
                    'Active Buff': activeBuff || 'None',
                    'HyperActive': this.hyperActive
                }
            };
        }
        return {
            module: 'Golden Cookies',
            status: 'idle',
            currentAction: 'Waiting for golden cookies',
            reason: goldenClickMode === 2 ? 'Aggressive mode' : 'Normal mode',
            icon: '✨',
            details: {
                'Mode': this.context.Config.GoldenClickMode === 2 ? 'Aggressive' : 'Normal',
                'Golden Cookies': goldenCount,
                'Active Buff': activeBuff || 'None'
            }
        };
    }
    /**
     * Get the name of the currently active buff (if any)
     */
    getActiveBuff() {
        const buffOrder = [
            'Elder frenzy',
            'Click frenzy',
            'Dragonflight',
            'Dragon Harvest',
            'Frenzy',
            'Cursed finger',
            'Building special'
        ];
        for (const buff of buffOrder) {
            if (buff in Game.buffs) {
                return buff;
            }
        }
        return null;
    }
}

;// ./src/modules/SavingsManager.ts

class SavingsManager {
    constructor(context) {
        this.savingsGoal = 0;
        this.savingsStart = 0;
        this.now = 0;
        // Constants for AUTO savings strategy
        this.START_TIME = 30 * 60 * 1000; // 30 minutes before starting to save
        this.TARGET_TIME = 400 * 60 * 1000; // 400 minutes to reach target amount
        // Reserve multipliers
        this.LUCKY_MULTIPLIER = 100; // 100 minutes of CPS
        this.FRENZY_MULTIPLIER = 7; // 7x for Lucky Frenzy
        this.context = context;
        this.savingsStart = Game.startDate;
        this.now = Game.startDate; // Initialize to start time to avoid 0-value bug
        // Register configuration options
        this.context.configManager.registerOption('SavingStrategy', {
            id: 'SavingStrategy',
            type: 'select',
            label: 'Saving Strategy',
            options: [
                { value: 0, label: 'NONE (Spend everything)' },
                { value: 1, label: 'AUTO (Smart ramp-up)' },
                { value: 2, label: 'LUCKY (Keep Lucky bank)' },
                { value: 3, label: 'LUCKY FRENZY (Keep Lucky Frenzy bank)' }
            ],
            default: 1,
            desc: 'How much cookies the bot keeps in reserve for golden cookie rewards.'
        }, 1, 'Strategy');
    }
    /**
     * Get current saving strategy (from live config)
     */
    getSavingStrategy() {
        return this.context.Config.SavingStrategy ?? 1;
    }
    /**
     * Initialize savings tracking (called on ascension)
     */
    initializeSavings(currentTime) {
        this.savingsStart = currentTime;
        this.now = currentTime;
    }
    /**
     * Update current time (called each game loop)
     */
    setCurrentTime(currentTime) {
        this.now = currentTime;
    }
    /**
     * Main savings calculation logic
     * Migrated from AutoPlay.handleSavings (line 388-448 in cookieAutoPlayBeta.js)
     */
    handleSavings() {
        // Do not save in reborn mode
        if (Game.ascensionMode === 1) {
            this.savingsGoal = 0;
            return;
        }
        const strategy = this.getSavingStrategy();
        // NONE: No savings
        if (strategy === 0) {
            this.savingsGoal = 0;
            return;
        }
        // LUCKY: Save for Lucky golden cookie (100 minutes of CPS)
        if (strategy === 2) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
            return;
        }
        // LUCKY FRENZY: Save for Lucky Frenzy (700 minutes of CPS)
        if (strategy === 3) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER * this.FRENZY_MULTIPLIER;
            return;
        }
        // AUTO: Linearly ramp up savings to target over time
        // Wait 30 minutes before starting to save, then ramp up over 400 minutes
        const elapsedTime = this.now - this.savingsStart - this.START_TIME;
        // Calculate scaling factor (0 to 1) based on elapsed time
        // Math.max(0, ...) fix ensures we don't get negative values
        const scaling = Math.max(0, Math.min(elapsedTime / this.TARGET_TIME, 1));
        // Still in startup period
        if (elapsedTime < 0) {
            this.savingsGoal = 0;
            this.context.logStatus('reserve:startup', 'No reserve yet (startup period)');
            return;
        }
        // Wait for golden cookie upgrades before saving
        // Upgrade IDs: 52 (Lucky day), 53 (Serendipity)
        if (Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY].bought && Game.UpgradesById[UPGRADE_IDS.SERENDIPITY].bought) {
            this.savingsGoal = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
        }
        else {
            this.savingsGoal = 0;
            this.context.logStatus('reserve:waiting-upgrades', 'Waiting for golden cookie upgrades');
            return;
        }
        // Upgrade to Lucky Frenzy if "Get lucky" upgrade is bought
        // Upgrade ID: 86 (Get lucky)
        if (Game.UpgradesById[UPGRADE_IDS.GET_LUCKY].bought) {
            this.savingsGoal *= this.FRENZY_MULTIPLIER;
        }
        // Scale goal based on elapsed time (linearly ramp up)
        if (elapsedTime < this.TARGET_TIME) {
            this.savingsGoal *= scaling;
            // Calculate actual savings progress (cookies saved vs goal)
            const actualProgress = Math.min(100, (Game.cookies / this.savingsGoal) * 100);
            const progressPct = actualProgress.toFixed(0);
            // Log progress in 10% increments
            this.context.logStatus('reserve:building-' + Math.floor(Number(progressPct) / 10) * 10, 'Reserve growing: ' + progressPct + '% saved');
        }
        else {
            this.context.logStatus('reserve:maintaining', 'Reserve at max');
        }
        // Auto-adjustment: if fallen behind savings plan, reset the start time
        const fractionSaved = Game.cookies / this.savingsGoal;
        // Division by zero check: only adjust if scaling > 0
        if (fractionSaved < 0.8 && scaling > 0) {
            // Calculate what the elapsed time SHOULD be to match current savings
            // fractionSaved = Current / Goal = Current / (Base * scaling)
            // We want newScaling such that Current = Base * newScaling
            // So newScaling = Current / Base = fractionSaved * scaling
            // newElapsedTime = newScaling * TARGET_TIME
            this.savingsStart = this.now - this.START_TIME - (this.TARGET_TIME * fractionSaved * scaling);
        }
    }
    /**
     * Get the current savings goal
     */
    getSavingsGoal() {
        return this.savingsGoal;
    }
    /**
     * Get the reserve for Lucky cookie (100 minutes of CPS)
     */
    getLuckyReserve() {
        return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
    }
    /**
     * Get the reserve for Lucky Frenzy (700 minutes of CPS)
     */
    getLuckyFrenzyReserve() {
        return Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER * this.FRENZY_MULTIPLIER;
    }
    /**
     * Get available cookies after accounting for savings
     */
    getAvailableCookies() {
        return Math.max(0, Game.cookies - this.savingsGoal);
    }
    /**
     * Check if we have enough cookies for a purchase (accounting for savings)
     */
    canAfford(price) {
        return price < Game.cookies - this.savingsGoal;
    }
    /**
     * Get status for dashboard display
     */
    getStatus() {
        const strategy = this.getSavingStrategy();
        const isActive = this.savingsGoal > 0;
        // Calculate thresholds
        const baseLucky = Game.unbuffedCps * 60 * this.LUCKY_MULTIPLIER;
        const baseLuckyFrenzy = baseLucky * this.FRENZY_MULTIPLIER;
        const hasGetLucky = Game.UpgradesById[UPGRADE_IDS.GET_LUCKY] && Game.UpgradesById[UPGRADE_IDS.GET_LUCKY].bought;
        // Check why reserve might be disabled
        let disabledReason = '';
        const elapsedTime = this.now - this.savingsStart - this.START_TIME;
        if (Game.ascensionMode === 1) {
            disabledReason = 'Hardcore Mode';
        }
        else if (elapsedTime < 0) {
            const minutesRemaining = Math.ceil(Math.abs(elapsedTime) / 60 / 1000);
            disabledReason = `Startup Period (${minutesRemaining}m remaining)`;
        }
        else if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY]?.bought || !Game.UpgradesById[UPGRADE_IDS.SERENDIPITY]?.bought) {
            const missing = [];
            if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_DAY]?.bought)
                missing.push('Lucky day');
            if (!Game.UpgradesById[UPGRADE_IDS.SERENDIPITY]?.bought)
                missing.push('Serendipity');
            disabledReason = `Missing upgrades: ${missing.join(', ')}`;
        }
        // Calculate scaling for AUTO mode
        let scaling = 1;
        if (strategy === 1 && elapsedTime >= 0) {
            scaling = Math.max(0, Math.min(elapsedTime / this.TARGET_TIME, 1));
        }
        const targetLucky = baseLucky * scaling;
        const targetLuckyFrenzy = baseLuckyFrenzy * scaling;
        // Build status object
        const status = {
            module: 'Savings',
            status: isActive ? 'active' : 'waiting',
            currentAction: isActive ? 'Reserve Active' : 'Reserve Disabled',
            reason: disabledReason || 'Saving for golden cookies',
            icon: '🍪',
            details: {
                'Strategy': ['NONE', 'AUTO', 'LUCKY', 'LUCKY FRENZY'][strategy] || 'UNKNOWN',
                'Reserve': typeof Beautify !== 'undefined' ? Beautify(this.savingsGoal) : this.savingsGoal.toString()
            }
        };
        // Add progress for Lucky threshold
        if (isActive || Game.unbuffedCps > 0) {
            const luckyPercent = Math.min(100, (Game.cookies / targetLucky) * 100);
            status.progress = {
                current: Game.cookies,
                target: targetLucky,
                percent: luckyPercent,
                label: 'Lucky Reserve'
            };
            status.progressColor = Game.cookies >= targetLucky ? '#6f6' : '#fc6';
            // Add Lucky Frenzy info to details if Get Lucky is unlocked
            if (hasGetLucky) {
                const frenzyPercent = Math.min(100, (Game.cookies / targetLuckyFrenzy) * 100);
                status.details['Lucky Frenzy'] = `${frenzyPercent.toFixed(1)}% (${typeof Beautify !== 'undefined' ? Beautify(targetLuckyFrenzy) : targetLuckyFrenzy.toString()})`;
            }
            // Show scaling progress for AUTO mode
            if (strategy === 1 && scaling < 1) {
                status.details['Ramp Progress'] = `${(scaling * 100).toFixed(1)}% (full at 400 min)`;
            }
        }
        return status;
    }
}

;// ./src/modules/PurchaseManager.ts
/**
 * Manages purchase strategy for both buildings and upgrades
 * Migrated from cookieAutoPlayBeta.js sections:
 * - CookieMonster Strategy (line 470)
 * - Handle Buildings (line 661)
 * - Handle Upgrades (line 617)
 */

class PurchaseManager {
    constructor(context) {
        this.context = context;
        this.state = {
            nextPurchase: null,
            nextPurchaseType: null,
            nextPurchasePP: null,
            nextPurchasePrice: null,
            buy10: false,
        };
    }
    /**
     * Get current purchase info for dashboard
     */
    getPurchaseInfo() {
        if (!this.state.nextPurchase)
            return null;
        return {
            name: this.state.nextPurchase,
            type: this.state.nextPurchaseType || 'building',
            pp: this.state.nextPurchasePP,
            price: this.state.nextPurchasePrice || 0,
        };
    }
    /**
     * Main entry point: Use CookieMonster strategy if available, otherwise fallback
     */
    bestBuy() {
        // If cookie monster isn't installed, use fallback strategy
        if (typeof CookieMonsterData === 'undefined') {
            // Fallback methods will set purchase tracking if they find something
            this.handleBuildingsFallback();
            this.handleUpgrades(); // Original line 477
            return false;
        }
        // This happens with cursed finger
        if (this.context.cpsMult === 0) {
            // Clear purchase tracking during cursed finger
            this.clearPurchaseTracking();
            return false;
        }
        return this.bestBuyCookieMonster();
    }
    /**
     * CookieMonster-based best buy strategy
     * Analyzes payback periods for buildings and determines the best purchase
     */
    bestBuyCookieMonster() {
        // Safety check for CookieMonster data
        if (!CookieMonsterData?.Cache || !CookieMonsterData?.Upgrades || !CookieMonsterData?.Objects1) {
            this.clearPurchaseTracking();
            return false;
        }
        // Initialize with cursor, when cps = 0 all pp = inf
        let best = Game.ObjectsById[BUILDING_IDS.CURSOR]?.name || 'Cursor';
        let minpp = Infinity;
        let type = 'building';
        // Override values for certain upgrades with 'infinite' pp
        // These values are multiplied by game.cps below
        const overrides = {
            'Plastic mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Iron mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Titanium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Adamantium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Unobtainium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Eludium mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Wishalloy mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Fantasteel mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Nevercrack mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Armythril mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Technobsidian mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Plasmarble mouse': CookieMonsterData.Cache.AverageClicks * 0.01,
            'Lucky day': 0.5,
            'Serendipity': 0.5,
            'Get lucky': 0.5,
            'A crumbly egg': 0.5,
            'A festive hat': 0.1,
            'Reindeer baking grounds': 0.1,
            'Weighted sleighs': 0.1,
            'Ho ho ho-flavored frosting': 0.1,
            'Season savings': 0.01,
            'Toy workshop': 0.05,
            'Santa\'s bottomless bag': 0.1,
            'Santa\'s helpers': CookieMonsterData.Cache.AverageClicks * 0.1,
            'Golden goose egg': 0.05,
            'Faberge egg': 0.01,
            'Wrinklerspawn': 0.05,
            'Cookie egg': CookieMonsterData.Cache.AverageClicks * 0.1,
            'Omelette': 0.1,
            'Elder Pledge': 0.1, // avoidbuy will catch this if have achievement
        };
        // Change cookie monster values for some 'infinite' pp upgrades
        for (const u in CookieMonsterData.Upgrades) {
            if (u in overrides && Game.Upgrades?.[u]) {
                CookieMonsterData.Upgrades[u].bonus = overrides[u] * Game.cookiesPs;
                CookieMonsterData.Upgrades[u].pp =
                    (Math.max(Game.Upgrades[u].getPrice() - (Game.cookies + CookieMonsterData.Cache.WrinklersTotal), 0) / Game.cookiesPs) +
                        (Game.Upgrades[u].getPrice() / CookieMonsterData.Upgrades[u].bonus);
            }
        }
        // Determine building check object and buy amount
        let check_obj = CookieMonsterData.Objects1;
        let buy_amt = 1;
        if ((Game.resets && Game.ascensionMode !== 1 &&
            Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE]) &&
            Game.ObjectsById[BUILDING_IDS.TEMPLE]?.minigame?.slot?.[0] === 10 && // Rigidel is in slot 0
            Game.BuildingsOwned % 10 === 0 && (this.context.now - Game.startDate) > 2 * 60 * 1000)
            || this.state.buy10) {
            // if owned % 10 != 0, will just buy one
            buy_amt = 10;
            if (CookieMonsterData?.Objects10) {
                check_obj = CookieMonsterData.Objects10;
            }
        }
        let haveBought = false;
        // For the following, pp < 1 indicates we can pay off the cost in less
        // than a second. It's better to just buy it instead of checking it repeatedly
        // CheckDragon twice in case the pp < 1 case set us over the limit
        for (const b in check_obj) {
            if (this.checkDragon(b) && check_obj[b].pp < 1) {
                if (this.buyBuilding(Game.Objects[b], buy_amt, buy_amt)) {
                    haveBought = true;
                }
            }
            if (check_obj[b].pp < minpp && this.checkDragon(b)) {
                minpp = check_obj[b].pp;
                best = b;
                type = 'building';
            }
        }
        // If payback period is very short, buy 10 buildings next time
        this.state.buy10 = minpp < 1;
        // Upgrades (original lines 571-584)
        if (Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE].won || Game.UpgradesOwned !== 0) {
            for (const u of Game.UpgradesInStore) {
                if (!this.shouldAvoidBuy(u) && !u.bought) {
                    // Safety check: ensure upgrade exists in CookieMonster data
                    if (!CookieMonsterData.Upgrades[u.name])
                        continue;
                    if (CookieMonsterData.Upgrades[u.name].pp < 1) {
                        if (this.buyUpgrade(u))
                            haveBought = true;
                    }
                    else if (CookieMonsterData.Upgrades[u.name].pp < minpp) {
                        minpp = CookieMonsterData.Upgrades[u.name].pp;
                        best = u.name;
                        type = 'upgrade';
                    }
                }
            }
        }
        // Store best purchase info for dashboard
        this.state.nextPurchase = best;
        this.state.nextPurchaseType = type;
        this.state.nextPurchasePP = minpp;
        if (type === 'building') {
            this.state.nextPurchasePrice = Game.Objects[best].getPrice();
        }
        else {
            this.state.nextPurchasePrice = Game.Upgrades[best].getPrice();
        }
        // Attempt to buy the best item (building or upgrade)
        if (type === 'building') {
            if (this.buyBuilding(Game.Objects[best], buy_amt, buy_amt)) {
                haveBought = true;
            }
        }
        else if (type === 'upgrade') {
            if (this.buyUpgrade(Game.Upgrades[best], true)) {
                haveBought = true;
            }
        }
        // Sugar frenzy check (original lines 602-605)
        if (this.context.canUseLumps && Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].unlocked &&
            !Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].bought &&
            (this.context.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
            Game.UpgradesById[UPGRADE_IDS.SUGAR_FRENZY].buy();
        }
        // Nothing bought, within first 10 minutes, have neverclick
        if (!haveBought) {
            if ((this.context.now - Game.startDate) < 10 * 60 * 1000 &&
                Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won) {
                // Wait five seconds before next step (scaled by FPS)
                const delay = 5000 * (this.context.fpsScale || 1);
                this.context.setDeadline(this.context.now + delay);
            }
            this.context.addActivity('Waiting to buy ' + best);
        }
        return haveBought;
    }
    /**
     * Fallback strategy when CookieMonster is not available
     * Uses simple CPS/price ratio to determine best building
     */
    handleBuildingsFallback() {
        let buyAmount = 100;
        let checkAmount = 1;
        // Only change buy mode if necessary and no menu is open (prevents closing menus)
        if (Game.buyMode === -1 && (!Game.onMenu || Game.onMenu === '')) {
            Game.storeBulkButton(0);
        }
        if ((this.context.now - Game.startDate) > 10 * 60 * 1000) {
            buyAmount = 1; // buy single after 10 minutes
            const maxBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
            if (maxBuilding.getSumPrice(100) < Game.cookies - this.context.savingsGoal) {
                buyAmount = 100;
            }
            else if (maxBuilding.getSumPrice(10) < Game.cookies - this.context.savingsGoal) {
                buyAmount = 10;
            }
        }
        if (Game.resets && Game.ascensionMode !== 1 &&
            Game.isMinigameReady(Game.Objects["Temple"]) &&
            Game.Objects["Temple"].minigame.slot[0] === 10 && // Rigidel is in slot 0
            Game.BuildingsOwned % 10 === 0 && (this.context.now - Game.startDate) > 2 * 60 * 1000) {
            buyAmount = checkAmount = 10;
        }
        // Calculate relative strength of cookie production (CPC = cookies per cookie)
        let cpc = 0;
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const me = Game.ObjectsById[i];
            if (me.locked)
                continue;
            const mycpc = me.storedCps / me.price;
            if (mycpc > cpc)
                cpc = mycpc;
        }
        // Track best building for dashboard
        let bestBuilding = null;
        // Early game: if no buildings owned yet, buy the cheapest available
        if (Game.BuildingsOwned === 0) {
            for (let i = 0; i < Game.ObjectsById.length; i++) {
                const me = Game.ObjectsById[i];
                if (me.locked)
                    continue;
                if (!bestBuilding) {
                    bestBuilding = me;
                    this.state.nextPurchase = me.name;
                    this.state.nextPurchaseType = 'building';
                    this.state.nextPurchasePrice = me.getPrice();
                    this.state.nextPurchasePP = null;
                }
                if (this.buyBuilding(me, checkAmount, buyAmount))
                    return;
            }
        }
        else {
            // Normal game: use efficiency-based buying
            for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
                const me = Game.ObjectsById[i];
                if (me.locked)
                    continue;
                if (me.storedCps / me.price > cpc / 2 || me.amount % 50 >= 40) {
                    if (!bestBuilding) {
                        bestBuilding = me;
                        this.state.nextPurchase = me.name;
                        this.state.nextPurchaseType = 'building';
                        this.state.nextPurchasePrice = me.getPrice();
                        this.state.nextPurchasePP = null; // No payback calculation without Cookie Monster
                    }
                    // This checks price, sets deadline
                    if (this.buyBuilding(me, checkAmount, buyAmount))
                        return;
                }
            }
        }
        // Rigidel special case: buy the cheapest building when not at multiple of 10
        if (Game.resets && Game.ascensionMode !== 1 &&
            Game.isMinigameReady(Game.Objects["Temple"]) &&
            Game.Objects["Temple"].minigame.slot[0] === 10 &&
            Game.BuildingsOwned % 10 !== 0) { // Rigidel is in slot 0, buy the cheapest
            let minIdx = 0;
            let minPrice = Game.ObjectsById[minIdx].price;
            for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
                if (Game.ObjectsById[i].price < minPrice) {
                    minPrice = Game.ObjectsById[i].price;
                    minIdx = i;
                }
            }
            this.buyBuilding(Game.ObjectsById[minIdx]);
        }
    }
    /**
     * Purchase a building if affordable
     * @param building - The building to purchase
     * @param checkAmount - Amount to check price for (default 1)
     * @param buyAmount - Amount to actually buy (default 1)
     * @returns true if purchase was made
     */
    buyBuilding(building, checkAmount = 1, buyAmount = 1) {
        if (!building)
            return false;
        const price = building.getSumPrice(checkAmount);
        if (price <= Game.cookies - this.context.savingsGoal) {
            building.buy(buyAmount);
            this.context.logAction('Bought ' + building.name + (buyAmount > 1 ? ' x' + buyAmount : ''), Beautify(price) + ' cookies');
            this.context.hyperActive = true; // might buy more soon
            return true;
        }
        return false;
    }
    /**
     * Calculate payback period for a building
     * PP = (time to afford) + (time to pay back investment)
     * Reserved for future use in enhanced strategy logic
     * @param building - The building to calculate for
     * @param amount - Number of buildings to buy
     * @returns Payback period in seconds
     */
    // @ts-ignore TS6133 - Reserved for future use
    calculatePP(building, amount = 1) {
        const price = building.getSumPrice(amount);
        const cpsIncrease = building.storedCps * amount;
        if (cpsIncrease === 0)
            return Infinity;
        // Time to afford (if we don't have enough cookies yet)
        const timeToAfford = Math.max(price - Game.cookies, 0) / Game.cookiesPs;
        // Time to pay back the investment
        const timeToPayback = price / cpsIncrease;
        return timeToAfford + timeToPayback;
    }
    /**
     * Get the best building based on CookieMonster data
     * @returns The best building to buy, or null if none available
     */
    getBestBuilding() {
        if (typeof CookieMonsterData === 'undefined' || !CookieMonsterData?.Objects1) {
            return this.getBestBuildingFallback();
        }
        let bestBuilding = null;
        let minpp = Infinity;
        const check_obj = this.state.buy10 && CookieMonsterData?.Objects10
            ? CookieMonsterData.Objects10
            : CookieMonsterData.Objects1;
        for (const b in check_obj) {
            if (check_obj[b]?.pp != null && check_obj[b].pp < minpp && this.checkDragon(b)) {
                minpp = check_obj[b].pp;
                const building = Game.Objects?.[b];
                if (building) {
                    bestBuilding = building;
                }
            }
        }
        return bestBuilding;
    }
    /**
     * Fallback method to get best building without CookieMonster
     * @returns The best building based on CPS/price ratio
     */
    getBestBuildingFallback() {
        let bestBuilding = null;
        let bestRatio = 0;
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const building = Game.ObjectsById[i];
            if (building.locked)
                continue;
            const ratio = building.storedCps / building.price;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestBuilding = building;
            }
        }
        return bestBuilding;
    }
    /**
     * Check if buying the building is efficient based on dragon sacrifices
     * @param buildingName - Name of the building to check
     * @returns true if we should buy this building
     */
    checkDragon(buildingName) {
        // Determine if buying the building is efficient based on sacrifices to Krumblor
        if (!Game.Achievements['Here be dragon'].won) {
            return true; // don't limit when first fully training
        }
        const building = Game.Objects[buildingName];
        // Haven't sacrificed first 100, buy no more than 100
        if (Game.dragonLevel - 5 <= building.id) {
            return building.amount < 100;
        }
        // Waiting to sacrifice 50 of all
        if (Game.dragonLevel < Game.dragonLevels.length - 2) {
            return building.amount < 50;
        }
        // Waiting to sacrifice 200 of all
        if (Game.dragonLevel < Game.dragonLevels.length - 1) {
            return building.amount < 200;
        }
        return true;
    }
    /**
     * Clear purchase tracking info
     */
    clearPurchaseTracking() {
        this.state.nextPurchase = null;
        this.state.nextPurchaseType = null;
        this.state.nextPurchasePP = null;
        this.state.nextPurchasePrice = null;
    }
    /**
     * Purchase an upgrade if affordable
     * Original: AutoPlay.buyUpgrade (lines 461-468)
     * @param upgrade - The upgrade to purchase
     * @param bypass - Whether to bypass toggle (default true)
     * @returns true if purchase was made
     */
    buyUpgrade(upgrade, bypass = true) {
        if (upgrade.getPrice() <= Game.cookies - this.context.savingsGoal) {
            const price = upgrade.getPrice();
            upgrade.buy(bypass);
            this.context.logAction('Upgraded: ' + upgrade.name, Beautify(price) + ' cookies');
            this.context.hyperActive = true; // might buy more soon
            return true;
        }
        return false;
    }
    /**
     * Determines if an upgrade should be avoided based on special conditions
     * Original: AutoPlay.avoidbuy (lines 351-378)
     * @param upgrade - The upgrade to check
     * @returns true if the upgrade should not be purchased
     */
    shouldAvoidBuy(upgrade) {
        switch (upgrade.id) {
            // Brainsweep and Elder Pact - wait for all grandmapocalypse achievements
            case 71: // One mind
            case 73: // Elder Pact
                return !!Game.Achievements["Elder nap"].won &&
                    !!Game.Achievements["Grandmapocalypse"].won &&
                    !!Game.Achievements["Elder slumber"].won &&
                    !!Game.Achievements["Elder calm"].won;
            // Elder Pledge - wait for certain achievements and Elder Covenant
            case 74: // Elder Pledge
                return !!Game.Achievements["Elder nap"].won &&
                    !!Game.Achievements["Elder slumber"].won &&
                    !!Game.Upgrades["Elder Covenant"].unlocked;
            // Elder Covenant - wait until pledge is bought or calm achievement won
            case 84: // Elder Covenant
                return !!Game.Upgrades["Elder Pledge"].bought ||
                    !!Game.Achievements["Elder calm"].won;
            // Chocolate egg - always avoid (used for ascension strategy)
            case 227: // Chocolate egg
                return true;
            // Shimmering veil - avoid unless working on specific achievement
            case 563: // Shimmering veil
                return this.context.nextAchievement !== 432 || // "Thick-skinned" achievement ID
                    !!Game.Achievements["Thick-skinned"].won;
            // Avoid all toggle-pool upgrades by default
            default:
                return upgrade.pool === "toggle";
        }
    }
    /**
     * Fallback upgrade handling when CookieMonster is not available
     * Original: AutoPlay.handleUpgrades (lines 617-641)
     */
    handleUpgrades() {
        if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0)
            return;
        // Track best upgrade for dashboard
        let bestUpgrade = null;
        for (const me in Game.UpgradesById) {
            const e = Game.UpgradesById[me];
            if (e.unlocked && !e.bought && !this.shouldAvoidBuy(e)) {
                if (!bestUpgrade) {
                    bestUpgrade = e;
                    this.state.nextPurchase = e.name;
                    this.state.nextPurchaseType = 'upgrade';
                    this.state.nextPurchasePrice = e.getPrice();
                    this.state.nextPurchasePP = null; // No payback calculation without Cookie Monster
                }
                this.buyUpgrade(e, true); // checks price, bypass = true
            }
        }
        // Sugar frenzy check (original lines 637-640)
        if (this.context.canUseLumps && Game.Upgrades["Sugar frenzy"].unlocked &&
            !Game.Upgrades["Sugar frenzy"].bought &&
            (this.context.now - Game.startDate) > 3 * 24 * 60 * 60 * 1000) {
            Game.Upgrades["Sugar frenzy"].buy();
        }
    }
    /**
     * Get building purchase status for dashboard
     */
    getBuildingStatus() {
        const hasCookieMonster = typeof CookieMonsterData !== 'undefined';
        // Buildings are always purchasable - Hardcore achievement only restricts upgrades, not buildings
        // Check if in cursed finger mode
        if (this.context.cpsMult === 0) {
            return {
                module: 'Buildings',
                status: 'waiting',
                currentAction: 'Paused',
                reason: 'Cursed Finger active (CPS = 0)',
                icon: '🏢',
                details: {
                    'CPS Multiplier': 0
                }
            };
        }
        // Check if next purchase is a building
        if (this.state.nextPurchase && this.state.nextPurchaseType === 'building') {
            const price = this.state.nextPurchasePrice || 0;
            const available = Game.cookies - this.context.savingsGoal;
            const canAfford = price <= available;
            // Calculate progress
            const progressPercent = Math.min(100, (available / price) * 100);
            const progressColor = canAfford ? '#6f6' : (progressPercent > 50 ? '#fc6' : '#f66');
            // Calculate time remaining using CookieMonster's approach (if available)
            let timeRemaining;
            if (!canAfford && Game.cookiesPs > 0) {
                if (hasCookieMonster && CookieMonsterData?.Cache) {
                    // Use CookieMonster's calculation: account for wrinkler cookies
                    const totalAvailable = Game.cookies + CookieMonsterData.Cache.WrinklersTotal - this.context.savingsGoal;
                    const shortfall = Math.max(price - totalAvailable, 0);
                    timeRemaining = (shortfall / Game.cookiesPs) * 1000; // Convert to milliseconds
                }
                else {
                    // Fallback: simple calculation without wrinklers
                    const shortfall = price - available;
                    timeRemaining = (shortfall / Game.cookiesPs) * 1000;
                }
            }
            return {
                module: 'Buildings',
                status: 'active',
                currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
                reason: hasCookieMonster
                    ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
                    : 'Using fallback strategy',
                icon: '🏢',
                progress: {
                    current: available,
                    target: price,
                    percent: progressPercent,
                    label: 'Cookies'
                },
                timeRemaining,
                progressColor,
                details: {
                    'Next Building': this.state.nextPurchase,
                    'Price': typeof Beautify !== 'undefined' ? Beautify(price) : price,
                    'Available': typeof Beautify !== 'undefined' ? Beautify(available) : available,
                    'Buy 10 Mode': this.state.buy10
                }
            };
        }
        // Not buying buildings currently
        return {
            module: 'Buildings',
            status: 'idle',
            currentAction: this.state.nextPurchaseType === 'upgrade' ? 'Upgrade has priority' : 'Evaluating options',
            reason: hasCookieMonster ? 'Cookie Monster strategy' : 'Fallback strategy',
            icon: '🏢',
            details: {
                'Strategy': hasCookieMonster ? 'Cookie Monster' : 'Fallback'
            }
        };
    }
    /**
     * Get upgrade purchase status for dashboard
     */
    getUpgradeStatus() {
        const hasCookieMonster = typeof CookieMonsterData !== 'undefined';
        // Bot doesn't auto-buy first upgrade unless Hardcore is won (protection for Hardcore achievement)
        // Original logic: if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned==0) return;
        if (!Game.Achievements["Hardcore"].won && Game.UpgradesOwned === 0) {
            // Count available upgrades
            let availableUpgrades = 0;
            for (const key in Game.Upgrades) {
                const upgrade = Game.Upgrades[key];
                if (upgrade.unlocked && !upgrade.bought) {
                    availableUpgrades++;
                }
            }
            return {
                module: 'Upgrades',
                status: 'waiting',
                currentAction: 'Waiting for first upgrade purchase',
                reason: 'Bot does not auto-buy first upgrade (Hardcore achievement protection)',
                nextAction: availableUpgrades > 0 ? `${availableUpgrades} upgrade${availableUpgrades !== 1 ? 's' : ''} available to purchase manually` : 'No upgrades unlocked yet',
                icon: '⬆️',
                details: {
                    'Hardcore Won': false,
                    'Upgrades Owned': 0,
                    'Available Upgrades': availableUpgrades,
                    'Cookies': typeof Beautify !== 'undefined' ? Beautify(Game.cookies) : Game.cookies
                }
            };
        }
        // Check if in cursed finger mode
        if (this.context.cpsMult === 0) {
            return {
                module: 'Upgrades',
                status: 'waiting',
                currentAction: 'Paused',
                reason: 'Cursed Finger active (CPS = 0)',
                icon: '⬆️',
                details: {
                    'CPS Multiplier': 0
                }
            };
        }
        // Check if next purchase is an upgrade
        if (this.state.nextPurchase && this.state.nextPurchaseType === 'upgrade') {
            const price = this.state.nextPurchasePrice || 0;
            const available = Game.cookies - this.context.savingsGoal;
            const canAfford = price <= available;
            // Calculate progress
            const progressPercent = Math.min(100, (available / price) * 100);
            const progressColor = canAfford ? '#6f6' : (progressPercent > 50 ? '#fc6' : '#f66');
            // Calculate time remaining using CookieMonster's approach (if available)
            let timeRemaining;
            if (!canAfford && Game.cookiesPs > 0) {
                if (hasCookieMonster && CookieMonsterData?.Cache) {
                    // Use CookieMonster's calculation: account for wrinkler cookies
                    const totalAvailable = Game.cookies + CookieMonsterData.Cache.WrinklersTotal - this.context.savingsGoal;
                    const shortfall = Math.max(price - totalAvailable, 0);
                    timeRemaining = (shortfall / Game.cookiesPs) * 1000; // Convert to milliseconds
                }
                else {
                    // Fallback: simple calculation without wrinklers
                    const shortfall = price - available;
                    timeRemaining = (shortfall / Game.cookiesPs) * 1000;
                }
            }
            return {
                module: 'Upgrades',
                status: 'active',
                currentAction: canAfford ? `Buying ${this.state.nextPurchase}` : `Saving for ${this.state.nextPurchase}`,
                reason: hasCookieMonster
                    ? `Best payback: ${this.state.nextPurchasePP?.toFixed(1)}s`
                    : 'Using fallback strategy',
                icon: '⬆️',
                progress: {
                    current: available,
                    target: price,
                    percent: progressPercent,
                    label: 'Cookies'
                },
                timeRemaining,
                progressColor,
                details: {
                    'Next Upgrade': this.state.nextPurchase,
                    'Price': typeof Beautify !== 'undefined' ? Beautify(price) : price,
                    'Available': typeof Beautify !== 'undefined' ? Beautify(available) : available,
                    'Savings Goal': typeof Beautify !== 'undefined' ? Beautify(this.context.savingsGoal) : this.context.savingsGoal
                }
            };
        }
        // Not buying upgrades currently
        return {
            module: 'Upgrades',
            status: 'idle',
            currentAction: this.state.nextPurchaseType === 'building' ? 'Building has priority' : 'Evaluating options',
            reason: hasCookieMonster ? 'Cookie Monster strategy' : 'Fallback strategy',
            icon: '⬆️',
            details: {
                'Strategy': hasCookieMonster ? 'Cookie Monster' : 'Fallback',
                'Upgrades Owned': Game.UpgradesOwned
            }
        };
    }
}

;// ./src/modules/SeasonHandler.ts
/**
 * Handles seasonal events and upgrades
 */

/**
 * Helper function to create a range of numbers (inclusive)
 */
function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
class SeasonHandler {
    constructor(context) {
        // Season upgrade IDs
        this.valentineUpgrades = range(169, 174).concat([645]);
        this.christmasUpgrades = [168]; // just wait for dominion
        this.easterUpgrades = range(210, 229);
        this.halloweenUpgrades = range(134, 140);
        this.elfClickTimeout = null;
        this.context = context;
        this.allSeasonUpgrades = this.valentineUpgrades
            .concat(this.christmasUpgrades)
            .concat(this.easterUpgrades)
            .concat(this.halloweenUpgrades);
    }
    /**
     * Main season handling logic
     * Manages Santa upgrades, Christmas elf achievement, and season cycling
     */
    handleSeasons() {
        // Handle Santa development
        this.handleSanta();
        // Handle Christmas elf achievement
        this.handleChristmasElf();
        // Handle season cycling
        this.cycleSeason();
    }
    /**
     * Develop Santa upgrades
     */
    handleSanta() {
        if (!!Game.UpgradesById[UPGRADE_IDS.A_FESTIVE_HAT].bought &&
            !Game.UpgradesById[UPGRADE_IDS.SANTAS_DOMINION].unlocked) {
            // Upgrade Santa
            Game.specialTab = "santa";
            Game.UpgradeSanta();
            Game.ToggleSpecialMenu(0);
        }
    }
    /**
     * Handle Christmas elf achievement detection
     * Skip if no grandmas bought yet (elf can't appear without grandmas)
     */
    handleChristmasElf() {
        // Skip if not Christmas season
        if (Game.season !== "christmas")
            return;
        // Skip if achievement already won
        if (!!Game.AchievementsById[ACHIEVEMENT_IDS.BABY_ITS_OLD_OUTSIDE].won)
            return;
        // Skip if no grandmas purchased yet (elf can't appear without grandmas)
        // This is the fix for the menu closing issue
        if (Game.ObjectsById[BUILDING_IDS.GRANDMA].amount === 0)
            return;
        // Close any open menu
        if (Game.onMenu)
            Game.ShowMenu("");
        // Scroll grandma canvas into view
        Game.ObjectsById[BUILDING_IDS.GRANDMA].canvas.parentElement?.scrollIntoView();
        // Find elf grandma
        const elfGrandmas = Game.ObjectsById[BUILDING_IDS.GRANDMA].pics.filter((p) => p.pic === "elfGrandma.png");
        if (elfGrandmas.length > 0) {
            const elfGranny = elfGrandmas[0];
            const xPos = elfGranny.x + 32;
            const yPos = elfGranny.y + 32;
            // Set mouse position and trigger click
            Game.ObjectsById[BUILDING_IDS.GRANDMA].mousePos = [xPos, yPos];
            Game.ObjectsById[BUILDING_IDS.GRANDMA].mouseOn = true;
            Game.mouseDown = 1;
            // Release click after 1 second
            this.elfClickTimeout = window.setTimeout(() => this.unElf(), 1000);
        }
    }
    /**
     * Release the elf click and scroll back to ticker
     */
    unElf() {
        Game.mouseDown = 0;
        Game.tickerL.scrollIntoView();
    }
    /**
     * Handle season cycling between Christmas -> Valentine -> Easter -> Halloween
     */
    cycleSeason() {
        // Don't cycle if season switcher not bought
        if (!Game.UpgradesById[UPGRADE_IDS.SEASON_SWITCHER].bought)
            return; // bought is number, falsy check works
        // Don't cycle in Born Again mode
        if (Game.ascensionMode === 1)
            return;
        // Don't cycle if too many season switches already
        if (Game.seasonUses > 20)
            return;
        // Check if current season is finished
        if (this.seasonFinished(Game.season)) {
            // Cycle to next season
            switch (Game.season) {
                case "christmas":
                    Game.UpgradesById[UPGRADE_IDS.LOVESICK_BISCUIT].buy(); // to valentine
                    break;
                case "valentines":
                    Game.UpgradesById[UPGRADE_IDS.BUNNY_BISCUIT].buy(); // to easter
                    break;
                case "easter":
                    Game.UpgradesById[UPGRADE_IDS.GHOSTLY_BISCUIT].buy(); // to halloween
                    break;
                default:
                    Game.UpgradesById[UPGRADE_IDS.FESTIVE_BISCUIT].buy(); // to christmas
                    break;
            }
        }
        else if (!this.allUnlocked(this.allSeasonUpgrades)) {
            // Still waiting for upgrades in current season
            this.context.addActivity(`Waiting for all results in ${Game.season}.`);
        }
    }
    /**
     * Check if all upgrades in a list are unlocked
     */
    allUnlocked(upgradeIds) {
        return upgradeIds.every((id) => Game.UpgradesById[id].unlocked);
    }
    /**
     * Check if a season is finished (all upgrades collected)
     */
    seasonFinished(season) {
        if (season === "")
            return true;
        switch (season) {
            case "valentines":
                return this.allUnlocked(this.valentineUpgrades);
            case "christmas":
                // If all season upgrades are unlocked, stay in Christmas
                if (this.allUnlocked(this.allSeasonUpgrades))
                    return false;
                // Otherwise check if Christmas-specific upgrades are done
                return this.allUnlocked(this.christmasUpgrades);
            case "easter":
                return (!!Game.Achievements["Hide & seek champion"].won &&
                    this.allUnlocked(this.easterUpgrades));
            case "halloween":
                return this.allUnlocked(this.halloweenUpgrades);
            default:
                return true;
        }
    }
    /**
     * Cleanup method to clear any pending timeouts
     */
    cleanup() {
        if (this.elfClickTimeout !== null) {
            clearTimeout(this.elfClickTimeout);
            this.elfClickTimeout = null;
        }
    }
    /**
     * Get current season handler status
     */
    getStatus() {
        const currentSeason = Game.season || 'none';
        // Check if season switcher is unlocked
        if (!Game.UpgradesById[UPGRADE_IDS.SEASON_SWITCHER].bought) {
            return {
                module: 'Season',
                status: 'disabled',
                currentAction: 'Season switcher not unlocked',
                reason: 'Need to unlock Season switcher upgrade',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Season Switcher': 'Not unlocked'
                }
            };
        }
        // Check Born Again mode
        if (Game.ascensionMode === 1) {
            return {
                module: 'Season',
                status: 'disabled',
                currentAction: 'Born Again mode',
                reason: 'Season cycling disabled in Born Again',
                icon: '🎄',
                details: {
                    'Mode': 'Born Again',
                    'Current Season': currentSeason === '' ? 'None' : currentSeason
                }
            };
        }
        // Check for too many switches
        if (Game.seasonUses > 20) {
            return {
                module: 'Season',
                status: 'idle',
                currentAction: 'Season switching limit reached',
                reason: 'Already switched 20+ times',
                nextAction: 'Staying in current season',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Switches': Game.seasonUses
                }
            };
        }
        // Check for Santa development
        if (Game.UpgradesById[UPGRADE_IDS.A_FESTIVE_HAT].bought &&
            !Game.UpgradesById[UPGRADE_IDS.SANTAS_DOMINION].unlocked) {
            return {
                module: 'Season',
                status: 'active',
                currentAction: 'Developing Santa',
                reason: 'Upgrading Santa for dominion',
                nextAction: 'Will cycle seasons after',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Santa': 'Upgrading'
                }
            };
        }
        // Check for Christmas elf achievement
        if (currentSeason === 'christmas' &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.BABY_ITS_OLD_OUTSIDE].won &&
            Game.ObjectsById[BUILDING_IDS.GRANDMA].amount > 0) {
            const elfGrandmas = Game.ObjectsById[BUILDING_IDS.GRANDMA].pics.filter((p) => p.pic === "elfGrandma.png");
            if (elfGrandmas.length > 0) {
                return {
                    module: 'Season',
                    status: 'active',
                    currentAction: 'Hunting Christmas elf',
                    reason: 'Working on "Baby it\'s old outside" achievement',
                    icon: '🎄',
                    details: {
                        'Current Season': 'Christmas',
                        'Elf Detected': true
                    }
                };
            }
        }
        // Check if current season is finished
        const seasonDone = this.seasonFinished(currentSeason);
        const allSeasonUpgradesUnlocked = this.allUnlocked(this.allSeasonUpgrades);
        if (!seasonDone) {
            // Still collecting upgrades in current season
            const seasonUpgrades = currentSeason === 'valentines' ? this.valentineUpgrades
                : currentSeason === 'christmas' ? this.christmasUpgrades
                    : currentSeason === 'easter' ? this.easterUpgrades
                        : currentSeason === 'halloween' ? this.halloweenUpgrades
                            : [];
            const unlockedCount = seasonUpgrades.filter(id => Game.UpgradesById[id].unlocked).length;
            const totalCount = seasonUpgrades.length;
            return {
                module: 'Season',
                status: 'waiting',
                currentAction: `Collecting ${currentSeason} upgrades`,
                reason: `${unlockedCount}/${totalCount} upgrades collected`,
                nextAction: seasonDone ? 'Will switch to next season' : 'Waiting for more drops',
                icon: '🎄',
                details: {
                    'Current Season': currentSeason === '' ? 'None' : currentSeason,
                    'Upgrades': `${unlockedCount}/${totalCount}`,
                    'Finished': seasonDone
                }
            };
        }
        // Season is finished - ready to switch
        const nextSeason = currentSeason === 'christmas' ? 'valentines'
            : currentSeason === 'valentines' ? 'easter'
                : currentSeason === 'easter' ? 'halloween'
                    : 'christmas';
        return {
            module: 'Season',
            status: 'active',
            currentAction: 'Switching seasons',
            reason: `${currentSeason} completed`,
            nextAction: `Switching to ${nextSeason}`,
            icon: '🎄',
            details: {
                'Current Season': currentSeason === '' ? 'None' : currentSeason,
                'Next Season': nextSeason,
                'All Upgrades': allSeasonUpgradesUnlocked ? 'Yes' : 'No'
            }
        };
    }
}

;// ./src/modules/SugarLumpManager.ts
/**
 * Manages sugar lump harvesting and spending
 *
 * Handles:
 * - Automatic lump harvesting at optimal times
 * - Auto-spending lumps on building levels for minigames
 * - Lump type manipulation for achievements (when cheating enabled)
 */

// Sugar lump types
var LumpType;
(function (LumpType) {
    LumpType[LumpType["Normal"] = 0] = "Normal";
    LumpType[LumpType["Bifurcated"] = 1] = "Bifurcated";
    LumpType[LumpType["Golden"] = 2] = "Golden";
    LumpType[LumpType["Meaty"] = 3] = "Meaty";
    LumpType[LumpType["Caramelized"] = 4] = "Caramelized";
})(LumpType || (LumpType = {}));
// Building IDs for level 1 order (unlocking minigames)
const LEVEL_1_ORDER = [2, 6, 7, 5]; // Farm, Wizard tower, Temple, Bank (Garden, Grimoire, Pantheon, Stock Market)
// Lump-related achievement IDs (307-320, plus 336, 427, 447, 525, 396, 268, 271)
const SugarLumpManager_LUMP_RELATED_ACHIEVEMENTS = [
    307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
    336, 427, 447, 525, 396, 268, 271
];
class SugarLumpManager {
    /**
     * Constructor - expects 1 argument: context object
     * @param context AutoPlayContext for accessing game state
     */
    constructor(context) {
        this.minLumpsOK = false;
        this.cheatLumps = false;
        this.canUseLumps = false;
        // Extended config for sugar lumps
        this.cheatLumpsLevel = 0;
        this.context = context;
        // Register configuration options
        this.context.configManager.registerOption('CheatLumps', {
            id: 'CheatLumps',
            type: 'select',
            label: 'Cheat Sugar Lumps',
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'Level 1 (Endgame only)' },
                { value: 2, label: 'Level 2 (25x speed)' },
                { value: 3, label: 'Level 3 (625x speed)' },
                { value: 4, label: 'Level 4 (15625x speed + Type manipulation)' }
            ],
            default: 0,
            desc: 'Cheats to make sugar lumps ripen faster. Disables achievements.'
        }, 0, 'Cheats');
    }
    /**
     * Set the activity logging callback
     * @param addActivity Callback to log activities
     */
    setAddActivity(_addActivity) {
        // Deprecated: context has addActivity
    }
    /**
     * Set the cheat lumps level
     * @param level CheatLumps configuration level
     */
    setCheatLumpsLevel(level) {
        this.cheatLumpsLevel = level;
    }
    /**
     * Main sugar lump handler - called periodically with no parameters
     */
    handleSugarLumps() {
        // Type assertions for Game properties not yet in type definitions
        const game = Game;
        if (!game.canLumps())
            return; // Do not work with sugar lumps before enabled
        if (Game.ascensionMode === 1)
            return; // No sugar lumps in born again mode
        const now = this.context.now;
        const age = now - game.lumpT;
        // Hand-pick normal lumps when mature for "Hand-picked" achievement
        if (age >= game.lumpMatureAge &&
            game.lumpCurrentType === LumpType.Normal &&
            this.minLumpsOK &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.HANDPICKED].won) {
            this.harvestLump();
        }
        // Normal harvesting when ripe
        if (age >= game.lumpRipeAge) {
            this.harvestLump();
        }
        // Apply lump time cheats if enabled
        this.cheatSugarLumps(age);
        // Auto-spend lumps on building levels
        this.useLump();
    }
    /**
     * Harvest a sugar lump by clicking it
     */
    harvestLump() {
        const game = Game;
        game.clickLump();
        this.useLump(); // Immediately try to use the harvested lump
    }
    /**
     * Accelerate sugar lump growth and manipulate types (cheating)
     */
    cheatSugarLumps(age) {
        const game = Game;
        this.cheatLumps = false;
        if (this.cheatLumpsLevel === 0)
            return;
        let cheatReduction = 25;
        // Level 1: Only cheat during endgame for lump achievements
        if (this.cheatLumpsLevel === 1) {
            // Check if we're in end phase and not finished
            if (this.context.finished)
                return;
            if (!this.context.endPhase())
                return;
            // If all lump achievements are done, no need to cheat
            if (SugarLumpManager_LUMP_RELATED_ACHIEVEMENTS.every((a) => Game.AchievementsById[a].won)) {
                return;
            }
            // Apply 625x speedup when targeting lump achievements
            if (SugarLumpManager_LUMP_RELATED_ACHIEVEMENTS.includes(this.context.nextAchievement)) {
                cheatReduction *= 25; // 25 * 25 = 625x total speedup
            }
        }
        this.cheatLumps = true;
        this.context.addActivity('Cheating sugar lumps.');
        // Set cheat reduction based on level
        if (this.cheatLumpsLevel === 2)
            cheatReduction = 25;
        if (this.cheatLumpsLevel === 3)
            cheatReduction = 25 * 25;
        if (this.cheatLumpsLevel === 4)
            cheatReduction = 25 * 25 * 25;
        // Accelerate lump growth by reducing time
        const cheatDelay = game.lumpRipeAge / cheatReduction;
        if (age < game.lumpRipeAge - cheatDelay) {
            game.lumpT -= cheatDelay * (cheatReduction - 1);
        }
        // Max level: manipulate lump types for achievements (RNG manipulation)
        if (this.cheatLumpsLevel === 4) {
            if (!Game.AchievementsById[ACHIEVEMENT_IDS.SUGAR_SUGAR].won) {
                // Bifurcated sugar lumps
                game.lumpCurrentType = LumpType.Bifurcated;
            }
            else if (!Game.AchievementsById[ACHIEVEMENT_IDS.SWEETMEATS].won &&
                game.elderWrath > 0) {
                // Meaty sugar lumps (grandmapocalypse only)
                game.lumpCurrentType = LumpType.Meaty;
            }
            else if (!Game.AchievementsById[ACHIEVEMENT_IDS.MAILLARD_REACTION].won) {
                // Caramelized sugar lumps
                game.lumpCurrentType = LumpType.Caramelized;
            }
            else {
                // Golden sugar lumps by default (give the most lumps when harvested)
                game.lumpCurrentType = LumpType.Golden;
            }
        }
    }
    /**
     * Auto-spend lumps on building levels (recursive)
     * Priority:
     * 1. Level 1 for minigame buildings (Garden, Grimoire, Pantheon, Stock Market)
     * 2. Farm to level 9 (for Garden)
     * 3. Cursor to level 12 (for Stock Market)
     * 4. All buildings to level 10
     * 5. Cursor to level 20 (for Luminous Gloves achievement)
     */
    useLump() {
        this.canUseLumps = false;
        if (!Game.lumps)
            return;
        // Step 1: Get level 1 for minigame buildings
        for (const buildingId of LEVEL_1_ORDER) {
            const building = Game.ObjectsById[buildingId];
            if (!building.level && Game.lumps) {
                building.levelUp();
                this.useLump(); // Recursive call
                return;
            }
        }
        // Step 2: Bring Farm (Garden) to level 9
        const farm = Game.ObjectsById[BUILDING_IDS.FARM];
        if (farm.level < 9) {
            if (farm.level < Game.lumps) {
                farm.levelUp();
                this.useLump();
            }
            return;
        }
        // After Garden is level 9, we have minimum lumps OK
        this.minLumpsOK = true;
        // Keep reserve lumps before endgame
        const endPhase = this.context.endPhase();
        const lumpLimit = endPhase ? 0 : 100;
        // Step 3: Bring Cursor (Stock Market) to level 12
        const cursor = Game.ObjectsById[BUILDING_IDS.CURSOR];
        if (cursor.level < 12) {
            if (cursor.level + lumpLimit < Game.lumps) {
                cursor.levelUp();
                this.useLump();
            }
            return;
        }
        // Step 4: Bring all buildings to level 10 (reverse order for efficiency)
        for (let i = Game.ObjectsById.length - 1; i >= 0; i--) {
            const building = Game.ObjectsById[i];
            if (building.level < 10) {
                if (building.level + lumpLimit < Game.lumps) {
                    building.levelUp();
                    this.useLump();
                    return;
                }
            }
        }
        // All buildings are at least level 10
        this.canUseLumps = true;
        // Step 5: Bring Cursor to level 20 for "Luminous gloves" achievement
        if (cursor.level < 20) {
            if (cursor.level + 100 < Game.lumps) {
                cursor.levelUp();
                this.useLump();
                return;
            }
            else {
                this.canUseLumps = false;
            }
        }
    }
    /**
     * Get whether we can spend lumps freely (all priority upgrades done)
     */
    getCanUseLumps() {
        return this.canUseLumps;
    }
    /**
     * Get whether minimum lump requirements are met
     */
    getMinLumpsOK() {
        return this.minLumpsOK;
    }
    /**
     * Get whether we're currently cheating lumps
     */
    isCheatLumps() {
        return this.cheatLumps;
    }
    /**
     * Get current sugar lump manager status
     */
    getStatus() {
        const game = Game;
        // Check if lumps are unlocked
        if (!game.canLumps()) {
            return {
                module: 'Sugar Lumps',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to bake 1 billion cookies first',
                icon: '🍬',
                details: {
                    'Cookies Baked': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.cookiesEarned)) : Math.floor(Game.cookiesEarned)
                }
            };
        }
        // Check for Born Again mode
        if (Game.ascensionMode === 1) {
            return {
                module: 'Sugar Lumps',
                status: 'disabled',
                currentAction: 'Born Again mode',
                reason: 'Sugar lumps disabled in Born Again',
                icon: '🍬',
                details: {
                    'Mode': 'Born Again'
                }
            };
        }
        const now = this.context.now;
        const age = now - game.lumpT;
        const matureAge = game.lumpMatureAge;
        const ripeAge = game.lumpRipeAge;
        const timeUntilRipe = Math.max(0, ripeAge - age);
        const minutesUntilRipe = Math.floor(timeUntilRipe / 1000 / 60);
        const hoursUntilRipe = Math.floor(minutesUntilRipe / 60);
        const lumpType = ['Normal', 'Bifurcated', 'Golden', 'Meaty', 'Caramelized'][game.lumpCurrentType] || 'Unknown';
        // Check if cheating lumps
        if (this.cheatLumps) {
            const speedup = this.cheatLumpsLevel === 1 ? '25x or 625x'
                : this.cheatLumpsLevel === 2 ? '25x'
                    : this.cheatLumpsLevel === 3 ? '625x'
                        : '15625x';
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Cheating lumps',
                reason: `${speedup} speedup + type manipulation`,
                nextAction: `Harvesting in ${minutesUntilRipe}m`,
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Cheat Level': this.cheatLumpsLevel,
                    'Time': `${minutesUntilRipe}m`
                }
            };
        }
        // Check if waiting for mature (Hand-picked achievement)
        if (age >= matureAge && game.lumpCurrentType === 0 &&
            this.minLumpsOK && !Game.AchievementsById[ACHIEVEMENT_IDS.HANDPICKED].won) {
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Harvesting mature lump',
                reason: 'Working on Hand-picked achievement',
                nextAction: 'Will harvest normal lumps when mature',
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Age': 'Mature',
                    'Achievement': 'Hand-picked'
                }
            };
        }
        // Check if ready to harvest
        if (age >= ripeAge) {
            return {
                module: 'Sugar Lumps',
                status: 'active',
                currentAction: 'Harvesting lump',
                reason: 'Lump is ripe',
                icon: '🍬',
                details: {
                    'Lumps': Game.lumps,
                    'Type': lumpType,
                    'Age': 'Ripe'
                }
            };
        }
        // Check auto-spending status
        const farm = Game.ObjectsById[BUILDING_IDS.FARM];
        const cursor = Game.ObjectsById[BUILDING_IDS.CURSOR];
        let spendingStatus = '';
        if (!farm || farm.level < 9) {
            spendingStatus = `Upgrading Farm to level 9 (current: ${farm?.level || 0})`;
        }
        else if (!this.minLumpsOK) {
            spendingStatus = 'Garden at level 9';
        }
        else if (cursor.level < 12) {
            spendingStatus = `Upgrading Cursor to level 12 (current: ${cursor.level})`;
        }
        else if (!this.canUseLumps) {
            spendingStatus = 'Upgrading all buildings to level 10';
        }
        else if (cursor.level < 20) {
            spendingStatus = 'Upgrading Cursor to level 20 (Luminous gloves)';
        }
        else {
            spendingStatus = 'All priority upgrades done';
        }
        // Growing
        return {
            module: 'Sugar Lumps',
            status: 'waiting',
            currentAction: 'Growing lump',
            reason: hoursUntilRipe > 0 ? `${hoursUntilRipe}h ${minutesUntilRipe % 60}m until ripe` : `${minutesUntilRipe}m until ripe`,
            nextAction: spendingStatus,
            icon: '🍬',
            details: {
                'Lumps': Game.lumps,
                'Type': lumpType,
                'Time': `${hoursUntilRipe}h ${minutesUntilRipe % 60}m`,
                'Auto-Spending': spendingStatus
            }
        };
    }
}

;// ./src/utils/Logger.ts
/**
 * Centralized logging system for CookieBot
 * Provides unified activity logging and status logging across all modules
 */
/**
 * Singleton logger instance
 * Provides centralized logging for all modules
 */
class LoggerService {
    constructor() { }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }
    /**
     * Initialize logger with callbacks from AutoPlay
     * Should be called once during AutoPlay construction
     */
    initialize(callbacks) {
        this.callbacks = callbacks;
    }
    /**
     * Log an action with optional details
     * @param action - Action description
     * @param details - Optional details (e.g., price, count)
     */
    logAction(action, details) {
        if (this.callbacks?.logAction) {
            this.callbacks.logAction(action, details);
        }
        // Check for console logging config
        const bot = window.AutoPlay;
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
    logStatus(type, message, details) {
        if (this.callbacks?.logStatus) {
            this.callbacks.logStatus(type, message, details);
        }
        // Check for console logging config
        const bot = window.AutoPlay;
        if (bot && bot.Config && bot.Config.ConsoleLog) {
            console.log(`[${type}] ${message}${details ? ': ' + details : ''}`);
        }
    }
    /**
     * Add an activity message to the activity log
     * @param activity - Activity description
     * @returns true if activity was added, false if it already existed
     */
    addActivity(activity) {
        let result = true;
        if (this.callbacks?.addActivity) {
            result = this.callbacks.addActivity(activity);
        }
        // Check for console logging config
        const bot = window.AutoPlay;
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
    isInitialized() {
        return !!this.callbacks;
    }
}
// Export singleton instance
const Logger = LoggerService.getInstance();

;// ./src/modules/WrinklerManager.ts
/**
 * Manages wrinkler popping strategy
 *
 * This module handles:
 * - Deciding when to pop wrinklers (all at once or one at a time)
 * - Finding the best wrinkler to pop based on cookies sucked
 * - Detecting shiny wrinklers (type === 1)
 * - Calculating wrinkler value
 * - Managing wrinkler-related achievements
 */


class WrinklerManager {
    constructor(context) {
        this.context = context;
    }
    /**
     * Main wrinkler handling logic
     * Runs periodically to manage wrinkler popping strategy
     */
    handleWrinklers() {
        this.context.poppingWrinklers = false;
        // Don't handle wrinklers until One mind is bought (unlocks wrinklers)
        if (!Game.UpgradesById[UPGRADE_IDS.ONE_MIND].bought) {
            return;
        }
        // Determine if we should pop all wrinklers
        const shouldPopAll = this.shouldPopAllWrinklers();
        if (shouldPopAll) {
            this.popAllWrinklers();
        }
        else {
            this.handleSingleWrinklerPopping();
        }
    }
    /**
     * Determine if we should pop all wrinklers at once
     * This is done for:
     * - Easter/Halloween seasons (for cookie drops)
     * - Unholy bait achievement (Moistburster)
     * - End phase achievement (Last Chance to See)
     */
    shouldPopAllWrinklers() {
        // Pop during easter or halloween if season not finished
        let doPop = (Game.season === "easter" || Game.season === "halloween");
        doPop = doPop && !this.seasonFinished();
        // Pop if we have Unholy bait and haven't won Moistburster achievement
        // Game.Upgrades[...].bought returns number (0 or 1), so convert to boolean
        doPop = doPop ||
            (!!Game.UpgradesById[UPGRADE_IDS.UNHOLY_BAIT].bought && !Game.AchievementsById[ACHIEVEMENT_IDS.MOISTBURSTER].won);
        // Pop in end phase if we haven't won Last Chance to See achievement
        doPop = doPop ||
            (this.isEndPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.LAST_CHANCE_TO_SEE].won);
        return doPop;
    }
    /**
     * Pop all attached wrinklers
     */
    popAllWrinklers() {
        this.context.poppingWrinklers = true;
        this.context.wrinklerTime = this.context.now;
        Logger.addActivity("Popping wrinklers for droppings and/or achievements.");
        Logger.logStatus('wrinkler', 'Popping all wrinklers');
        // Pop all attached wrinklers (close === 1)
        Game.wrinklers.forEach((w) => {
            if (w.close === 1) {
                w.hp = 0; // Setting hp to 0 pops the wrinkler
            }
        });
    }
    /**
     * Handle single wrinkler popping strategy
     * Pops one wrinkler every 2 hours
     */
    handleSingleWrinklerPopping() {
        // Handle Wrinkler poker achievement (pop wrinkler #3)
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.WRINKLER_POKER].won && Game.wrinklers[3].close === 1) {
            Game.wrinklers[3].selected = 1;
            l('backgroundLeftCanvas').click();
        }
        // Find the next wrinkler to pop (highest sucked value)
        this.findNextWrinkler();
        // Calculate time since last pop
        const minutesSinceLastPop = Math.floor((this.context.now - this.context.wrinklerTime) / 1000 / 60);
        Logger.addActivity(`Popping one wrinkler per two hours, last ${minutesSinceLastPop} minutes ago.`);
        // Pop the selected wrinkler if it's time (2 hours = 2*60*60*1000 ms)
        if (this.context.nextWrinkler !== -1) {
            const twoHoursInMs = 2 * 60 * 60 * 1000;
            if (this.context.now - this.context.wrinklerTime >= twoHoursInMs) {
                Game.wrinklers[this.context.nextWrinkler].hp = 0; // Pop the wrinkler
                this.context.wrinklerTime = this.context.now;
                Logger.logStatus('wrinkler', 'Popped single wrinkler');
            }
        }
    }
    /**
     * Find the next wrinkler to pop
     * Selects the wrinkler with the most cookies sucked
     * If there's an empty spot, don't pop any wrinkler (let it fill up)
     */
    findNextWrinkler() {
        let nextId = -1;
        let maxSucked = 0;
        for (const w of Game.wrinklers) {
            // Check if there's an empty spot (not attached, but within max wrinklers)
            if (w.close === 0 && w.id < Game.getWrinklersMax()) {
                // Empty spot found - don't pop any wrinkler, let it fill up
                this.context.nextWrinkler = -1;
                return;
            }
            // Track wrinkler with most cookies sucked
            if (w.sucked > maxSucked) {
                maxSucked = w.sucked;
                nextId = w.id;
            }
        }
        this.context.nextWrinkler = nextId;
    }
    /**
     * Check if a wrinkler is shiny
     * Shiny wrinklers have type === 1 and are rarer/more valuable
     */
    isShinyWrinkler(wrinkler) {
        return wrinkler.type === 1;
    }
    /**
     * Calculate the value (cookies) stored in a wrinkler
     * This is the amount of cookies that would be returned when popped
     * Shiny wrinklers return 3x the normal amount
     */
    getWrinklerValue(wrinkler) {
        if (wrinkler.close === 0) {
            return 0; // Not attached
        }
        // Base value is the amount sucked
        let value = wrinkler.sucked;
        // Wrinklers return 1.1x what they sucked
        value *= 1.1;
        // Shiny wrinklers return 3x
        if (this.isShinyWrinkler(wrinkler)) {
            value *= 3;
        }
        return value;
    }
    /**
     * Get total value stored in all wrinklers
     */
    getTotalWrinklerValue() {
        return Game.wrinklers.reduce((total, w) => {
            return total + this.getWrinklerValue(w);
        }, 0);
    }
    /**
     * Count attached wrinklers
     */
    getAttachedWrinklerCount() {
        return Game.wrinklers.filter((w) => w.close === 1).length;
    }
    /**
     * Count shiny wrinklers
     */
    getShinyWrinklerCount() {
        return Game.wrinklers.filter((w) => w.close === 1 && this.isShinyWrinkler(w)).length;
    }
    // ============ Helper methods ============
    /**
     * Check if current season is finished (all upgrades collected)
     * Delegates to SeasonHandler
     */
    seasonFinished() {
        return this.context.seasonFinished(Game.season);
    }
    /**
     * Check if we're in the end phase (all achievements collected)
     * Returns true when nextAchievement is NOT in the wantedAchievements list
     * (meaning we've completed all wanted achievements and moved to the end phase)
     */
    isEndPhase() {
        return this.context.wantedAchievements.indexOf(this.context.nextAchievement) < 0;
    }
    /**
     * Get current wrinkler manager status
     */
    getStatus() {
        // Check if wrinklers are unlocked
        if (!Game.UpgradesById[UPGRADE_IDS.ONE_MIND].bought) {
            return {
                module: 'Wrinklers',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to purchase "One mind" upgrade',
                icon: '🐛',
                details: {
                    'Grandmapocalypse': 'Not started'
                }
            };
        }
        const attachedCount = this.getAttachedWrinklerCount();
        const shinyCount = this.getShinyWrinklerCount();
        const totalValue = this.getTotalWrinklerValue();
        const maxWrinklers = Game.getWrinklersMax();
        // Check if popping all wrinklers
        if (this.context.poppingWrinklers) {
            return {
                module: 'Wrinklers',
                status: 'active',
                currentAction: 'Popping all wrinklers',
                reason: Game.season === 'easter' || Game.season === 'halloween'
                    ? 'Season drops'
                    : Game.UpgradesById[UPGRADE_IDS.UNHOLY_BAIT].bought && !Game.AchievementsById[ACHIEVEMENT_IDS.MOISTBURSTER].won
                        ? 'Moistburster achievement'
                        : 'Last Chance to See achievement',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Shiny': shinyCount,
                    'Total Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue)
                }
            };
        }
        // Check for Wrinkler poker achievement
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.WRINKLER_POKER].won && Game.wrinklers[3].close === 1) {
            return {
                module: 'Wrinklers',
                status: 'active',
                currentAction: 'Popping wrinkler #3',
                reason: 'Working on Wrinkler poker achievement',
                nextAction: 'Then rotate popping every 2 hours',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Max Wrinklers': maxWrinklers
                }
            };
        }
        // Regular rotation mode
        const minutesSinceLastPop = Math.floor((this.context.now - this.context.wrinklerTime) / 1000 / 60);
        const minutesUntilNext = 120 - minutesSinceLastPop;
        if (this.context.nextWrinkler === -1) {
            return {
                module: 'Wrinklers',
                status: 'waiting',
                currentAction: 'Waiting for spots to fill',
                reason: `${attachedCount}/${maxWrinklers} wrinklers attached`,
                nextAction: 'Will pop one every 2 hours when full',
                icon: '🐛',
                details: {
                    'Attached': attachedCount,
                    'Max Wrinklers': maxWrinklers,
                    'Shiny': shinyCount
                }
            };
        }
        return {
            module: 'Wrinklers',
            status: minutesUntilNext <= 0 ? 'active' : 'waiting',
            currentAction: minutesUntilNext <= 0 ? 'Popping oldest wrinkler' : 'Rotating wrinklers',
            reason: `Pop one every 2 hours (last ${minutesSinceLastPop}m ago)`,
            nextAction: minutesUntilNext > 0 ? `Next pop in ${minutesUntilNext} minutes` : undefined,
            icon: '🐛',
            details: {
                'Attached': attachedCount,
                'Shiny': shinyCount,
                'Total Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue),
                'Next Pop': minutesUntilNext > 0 ? `${minutesUntilNext}m` : 'Now'
            }
        };
    }
}

;// ./src/modules/AchievementHandler.ts
/**
 * Handles achievement hunting (small achievements, ascension-related)
 */

class AchievementHandler {
    constructor(context) {
        this.context = context;
    }
    /**
     * Handle small achievements that can be obtained through simple interactions
     */
    handleSmallAchievements() {
        // Tabloid addiction - click news ticker 50 times
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.TABLOID_ADDICTION].won) {
            for (let i = 0; i < 50; i++) {
                Game.tickerL.click();
            }
        }
        // Here you go - click the achievement itself
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.HERE_YOU_GO].won) {
            Game.AchievementsById[ACHIEVEMENT_IDS.HERE_YOU_GO].click();
        }
        // Tiny cookie - click the tiny cookie
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.TINY_COOKIE].won) {
            Game.ClickTinyCookie();
        }
        // God complex - name bakery "Orteil"
        const bakeryName = Game.bakeryName;
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.GOD_COMPLEX].won) {
            Game.bakeryName = 'Orteil';
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
            Game.bakeryName = bakeryName;
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // What's in a name - add robot name to bakery name
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.WHATS_IN_A_NAME].won) {
            Game.bakeryName = this.context.robotName + bakeryName;
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // Remove robot name if it's still there
        if (Game.bakeryName.slice(0, this.context.robotName.length) === this.context.robotName) {
            Game.bakeryName = Game.bakeryName.slice(this.context.robotName.length);
            Game.bakeryNamePrompt();
            Game.ConfirmPrompt();
        }
        // Cheated cookies taste awful - get this after all other achievements
        if (this.context.endPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.CHEATED_COOKIES_TASTE_AWFUL].won) {
            Game.Win('Cheated cookies taste awful');
        }
        // Third-party - using a third-party tool
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.THIRDPARTY].won) {
            Game.Win('Third-party');
        }
        // Olden days - find the forgotten madeleine
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.OLDEN_DAYS].won) {
            const currentMenu = Game.onMenu;
            Game.ShowMenu('log');
            const menuDivs = l('menu')?.getElementsByTagName('div');
            if (menuDivs) {
                const madeleine = menuDivs[menuDivs.length - 1];
                madeleine.scrollIntoView();
                madeleine.click();
                Game.tickerL.scrollIntoView();
            }
            Game.ShowMenu(currentMenu);
            this.context.info('found the forgotten madeleine at the very bottom of the "Info" menu');
        }
        // Cookie-dunker - dunk the cookie in milk
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.COOKIEDUNKER].won && Game.milkProgress > 1 && Game.milkHd > 0.34) {
            if (this.context.backupHeight) {
                Game.LeftBackground.canvas.height = this.context.backupHeight;
                this.context.backupHeight = 0;
            }
            else {
                this.context.backupHeight = Game.LeftBackground.canvas.height;
                Game.LeftBackground.canvas.height = 400;
                setTimeout(() => this.undunkCookie(), 20 * 1000);
            }
        }
        // Stifling the press - mute the news ticker
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.STIFLING_THE_PRESS].won) {
            const savedNarrowSize = Game.tickerTooNarrow;
            Game.tickerTooNarrow = Game.windowW + 10;
            Game.tickerL.click();
            Game.tickerTooNarrow = savedNarrowSize;
        }
        // No time like the present - send and redeem a gift
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.NO_TIME_LIKE_THE_PRESENT].won &&
            Game.Has('Wrapping paper') && !Game.hasBuff('Gifted out')) {
            if (!this.context.giftCode) {
                Game.promptGiftSend();
                const giftAmountEl = l('giftAmount');
                const giftMessageEl = l('giftMessage');
                const giftCodeEl = l('giftCode');
                const confirmBtn = l('promptOption0');
                if (giftAmountEl && giftMessageEl && giftCodeEl && confirmBtn) {
                    giftAmountEl.value = '42';
                    giftMessageEl.value = 'A gift for myself';
                    confirmBtn.click();
                    this.context.giftCode = giftCodeEl.value;
                    confirmBtn.click();
                    this.context.info('Created present with code ' + this.context.giftCode);
                    setTimeout(() => this.redeemPresent(), 61 * 60 * 1000); // wait an hour
                }
            }
            else {
                Game.promptGiftRedeem();
                const giftCodeEl = l('giftCode');
                const confirmBtn = l('promptOption0');
                if (giftCodeEl && confirmBtn) {
                    giftCodeEl.value = String(this.context.giftCode);
                    this.context.giftCode = 0;
                    confirmBtn.click();
                }
            }
        }
        // In her likeness - customize the You building
        // Only after player has at least one You building (fixes issue #97)
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.IN_HER_LIKENESS].won && Game.ObjectsById[BUILDING_IDS.YOU].amount > 0) {
            Game.YouCustomizer.load('9,6,-,3,-,0,3', true);
            // This is already correct, but we need to trigger the change
            Game.YouCustomizer.offsetGene('head', -1);
        }
    }
    /**
     * Undunk the cookie after getting the achievement
     */
    undunkCookie() {
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.COOKIEDUNKER].won) {
            setTimeout(() => this.undunkCookie(), 20 * 1000);
            return;
        }
        Game.LeftBackground.canvas.height = this.context.backupHeight;
        this.context.backupHeight = 0;
    }
    /**
     * Redeem a previously sent gift
     */
    redeemPresent() {
        this.context.info('Redeeming present with code ' + this.context.giftCode);
        if (this.context.giftCode) {
            Game.promptGiftRedeem();
            const giftCodeEl = l('giftCode');
            const confirmBtn = l('promptOption0');
            if (giftCodeEl && confirmBtn) {
                giftCodeEl.value = String(this.context.giftCode);
                this.context.giftCode = 0;
                confirmBtn.click(); // redeem
                confirmBtn.click(); // close window
            }
        }
    }
    /**
     * Find the next achievement to pursue
     */
    findNextAchievement() {
        this.context.wantAscend = false;
        this.handleSmallAchievements();
        for (let i = 0; i < this.context.wantedAchievements.length; i++) {
            if (!Game.AchievementsById[this.context.wantedAchievements[i]].won) {
                this.context.nextAchievement = this.context.wantedAchievements[i];
                this.context.setMainActivity('Trying to get achievement: ' +
                    Game.AchievementsById[this.context.nextAchievement].ddesc.replace(/<q>.*?<\/q>/ig, ''));
                return;
            }
        }
        this.checkAllAchievementsOK();
    }
    /**
     * Check if all achievements have been obtained
     */
    checkAllAchievementsOK() {
        // Check regular achievements (excluding dungeon and one-year legacy)
        for (const key in Game.Achievements) {
            const achievement = Game.Achievements[key];
            if (!achievement.won &&
                achievement.pool !== 'dungeon' &&
                achievement.id !== 367 &&
                !this.context.lateAchievements.includes(achievement.id)) {
                this.context.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                    achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                    ', try to get it now.');
                this.context.nextAchievement = achievement.id;
                return false;
            }
        }
        // Check late achievements
        for (const achievementId of this.context.lateAchievements) {
            const achievement = Game.AchievementsById[achievementId];
            if (!achievement.won && achievement.pool !== 'dungeon' && achievement.id !== 367) {
                this.context.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                    achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                    ', try to get it now.');
                this.context.nextAchievement = achievement.id;
                return false;
            }
        }
        // Check prestige upgrades
        for (const key in Game.Upgrades) {
            const upgrade = Game.Upgrades[key];
            if (upgrade.pool === 'prestige' && !upgrade.bought) {
                this.context.nextAchievement = 99; // Follow the white rabbit (from dungeons)
                this.context.setMainActivity('Prestige upgrade ' + upgrade.name + ' is missing, waiting to buy it.');
                return false;
            }
        }
        // Wait for one-year legacy achievement
        if (!Game.Achievements['So much to do so much to see'].won) {
            const achievement = Game.Achievements['So much to do so much to see'];
            this.context.setMainActivity('Missing achievement #' + achievement.id + ': ' +
                achievement.ddesc.replace(/<q>.*?<\/q>/ig, '') +
                ', try to get it now.');
            this.context.nextAchievement = achievement.id;
            return false;
        }
        // All achievements complete!
        this.context.finished = true;
        this.context.setMainActivity('My job is done here, have a nice day. I am still idling along.');
        this.context.nextAchievement = 99; // Follow the white rabbit (from dungeons)
        return true;
    }
    /**
     * Main handler called periodically
     */
    handleAchievements() {
        // Find next achievement if current one is complete
        if (Game.AchievementsById[this.context.nextAchievement].won) {
            this.findNextAchievement();
        }
    }
    /**
     * Get achievement handler status
     */
    getStatus() {
        if (this.context.finished) {
            return {
                module: 'Achievements',
                status: 'idle',
                currentAction: 'All achievements complete',
                reason: 'Job done, idling along',
                icon: '🏆',
                details: {
                    'Status': 'Complete'
                }
            };
        }
        const achievement = Game.AchievementsById[this.context.nextAchievement];
        if (!achievement) {
            return {
                module: 'Achievements',
                status: 'active',
                currentAction: 'Tracking achievements',
                reason: 'Looking for next achievement',
                icon: '🏆',
                details: {}
            };
        }
        const totalAchievements = Object.keys(Game.Achievements).length;
        const wonCount = Object.values(Game.Achievements).filter((a) => a.won).length;
        // Track progress for "bake X cookies" achievements
        let progress;
        let timeRemaining;
        let progressColor;
        // Check for "bake X cookies in one ascension" achievements by pattern matching
        // Format: "Bake <b>1</b> cookie in one ascension." or "Bake <b>1 million</b> cookies in one ascension."
        const bakeCookiesMatch = achievement.ddesc.match(/bake <b>([\d,\.]+(?:\s+\w+)?)\s*<\/b>\s+cookies?\s+in one ascension\./i);
        if (bakeCookiesMatch) {
            // Parse the cookie threshold (handles numbers like "1 million", "1.5 billion", etc.)
            let cookieThreshold = 0;
            const valueStr = bakeCookiesMatch[1].trim();
            // Try to extract from Game.AchievementsById threshold if available
            if (achievement.threshold) {
                cookieThreshold = achievement.threshold;
            }
            else {
                // Fallback: parse the text (handles "1,000" or "1 million" or "1 septendecillion")
                const numMatch = valueStr.match(/^([\d,\.]+)/);
                if (numMatch) {
                    cookieThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
                    // Check for multipliers (million, billion, trillion, etc.)
                    const lowerValue = valueStr.toLowerCase();
                    if (lowerValue.includes('thousand'))
                        cookieThreshold *= 1e3;
                    else if (lowerValue.includes('million'))
                        cookieThreshold *= 1e6;
                    else if (lowerValue.includes('billion'))
                        cookieThreshold *= 1e9;
                    else if (lowerValue.includes('trillion'))
                        cookieThreshold *= 1e12;
                    else if (lowerValue.includes('quadrillion'))
                        cookieThreshold *= 1e15;
                    else if (lowerValue.includes('quintillion'))
                        cookieThreshold *= 1e18;
                    else if (lowerValue.includes('sextillion'))
                        cookieThreshold *= 1e21;
                    else if (lowerValue.includes('septillion'))
                        cookieThreshold *= 1e24;
                    else if (lowerValue.includes('octillion'))
                        cookieThreshold *= 1e27;
                    else if (lowerValue.includes('nonillion'))
                        cookieThreshold *= 1e30;
                    else if (lowerValue.includes('decillion'))
                        cookieThreshold *= 1e33;
                    else if (lowerValue.includes('undecillion'))
                        cookieThreshold *= 1e36;
                    else if (lowerValue.includes('duodecillion'))
                        cookieThreshold *= 1e39;
                    else if (lowerValue.includes('tredecillion'))
                        cookieThreshold *= 1e42;
                    else if (lowerValue.includes('quattuordecillion'))
                        cookieThreshold *= 1e45;
                    else if (lowerValue.includes('quindecillion'))
                        cookieThreshold *= 1e48;
                    else if (lowerValue.includes('sexdecillion'))
                        cookieThreshold *= 1e51;
                    else if (lowerValue.includes('septendecillion'))
                        cookieThreshold *= 1e54;
                    else if (lowerValue.includes('octodecillion'))
                        cookieThreshold *= 1e57;
                    else if (lowerValue.includes('novemdecillion'))
                        cookieThreshold *= 1e60;
                    else if (lowerValue.includes('vigintillion'))
                        cookieThreshold *= 1e63;
                }
            }
            if (cookieThreshold > 0) {
                const currentCookies = Game.cookiesEarned;
                const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
                progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');
                progress = {
                    current: currentCookies,
                    target: cookieThreshold,
                    percent: progressPercent,
                    label: 'Cookies Baked'
                };
                // Calculate time remaining
                if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
                    const remaining = cookieThreshold - currentCookies;
                    timeRemaining = (remaining / Game.cookiesPs) * 1000; // Convert to milliseconds
                }
            }
        }
        // Check for "have X [building]" achievements
        // Format: "Have <b>1 cursor</b>." or "Have <b>100 cursors</b>."
        else if (achievement.ddesc.match(/have <b>[\d,]+\s+\w+?s?<\/b>/i)) {
            const ownMatch = achievement.ddesc.match(/have <b>([\d,]+)\s+(\w+?)s?<\/b>\./i);
            if (ownMatch) {
                const targetCount = parseInt(ownMatch[1].replace(/,/g, ''));
                const buildingName = ownMatch[2];
                // Find the building in Game.Objects
                let currentCount = 0;
                for (const objName in Game.Objects) {
                    if (objName.toLowerCase() === buildingName.toLowerCase() ||
                        objName.toLowerCase().includes(buildingName.toLowerCase()) ||
                        buildingName.toLowerCase().includes(objName.toLowerCase())) {
                        currentCount = Game.Objects[objName].amount;
                        break;
                    }
                }
                const progressPercent = Math.min(100, (currentCount / targetCount) * 100);
                progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');
                progress = {
                    current: currentCount,
                    target: targetCount,
                    percent: progressPercent,
                    label: `${buildingName} owned`
                };
                // Calculate time remaining based on CPS and building cost
                if (currentCount < targetCount && Game.cookiesPs > 0) {
                    // Rough estimate: calculate cost of remaining buildings
                    const building = Object.values(Game.Objects).find((obj) => obj.name.toLowerCase().includes(buildingName.toLowerCase()));
                    if (building) {
                        let totalCost = 0;
                        for (let i = currentCount; i < targetCount; i++) {
                            totalCost += building.basePrice * Math.pow(building.priceIncrease || 1.15, i);
                        }
                        const cookiesNeeded = Math.max(0, totalCost - Game.cookies);
                        if (cookiesNeeded > 0) {
                            timeRemaining = (cookiesNeeded / Game.cookiesPs) * 1000;
                        }
                    }
                }
            }
        }
        // Check for "make X cookies from clicking" achievements
        // Format: "Make <b>1,000 cookies</b> from clicking."
        else if (achievement.ddesc.match(/make <b>[\d,\.]+(?:\s+\w+)?\s+cookies?<\/b>\s+from clicking\./i)) {
            const clickMatch = achievement.ddesc.match(/make <b>([\d,\.]+(?:\s+\w+)?)\s+cookies?<\/b>\s+from clicking\./i);
            if (clickMatch) {
                let cookieThreshold = 0;
                const valueStr = clickMatch[1].trim();
                // Try to extract from achievement threshold if available
                if (achievement.threshold) {
                    cookieThreshold = achievement.threshold;
                }
                else {
                    // Parse the text
                    const numMatch = valueStr.match(/^([\d,\.]+)/);
                    if (numMatch) {
                        cookieThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
                        const lowerValue = valueStr.toLowerCase();
                        if (lowerValue.includes('thousand'))
                            cookieThreshold *= 1e3;
                        else if (lowerValue.includes('million'))
                            cookieThreshold *= 1e6;
                        else if (lowerValue.includes('billion'))
                            cookieThreshold *= 1e9;
                        else if (lowerValue.includes('trillion'))
                            cookieThreshold *= 1e12;
                    }
                }
                if (cookieThreshold > 0) {
                    // Game.handmadeCookies tracks cookies made from clicking
                    const currentClicks = Game.handmadeCookies || 0;
                    const progressPercent = Math.min(100, (currentClicks / cookieThreshold) * 100);
                    progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');
                    progress = {
                        current: currentClicks,
                        target: cookieThreshold,
                        percent: progressPercent,
                        label: 'Cookies from clicking'
                    };
                    // Calculate time remaining (rough estimate based on current click rate)
                    if (currentClicks < cookieThreshold) {
                        // Estimate: if bot is clicking, use cookiesPerClick * clicksPerSecond
                        const cookiesPerClick = Game.computedMouseCps || 1;
                        const clicksPerSecond = 10; // Rough estimate for bot clicking
                        const clickCps = cookiesPerClick * clicksPerSecond;
                        if (clickCps > 0) {
                            const remaining = cookieThreshold - currentClicks;
                            timeRemaining = (remaining / clickCps) * 1000;
                        }
                    }
                }
            }
        }
        // Check for "bake X cookies per second" achievements
        // Format: "Bake <b>1</b> cookie per second." or "Bake <b>1,000</b> cookies per second."
        else if (achievement.ddesc.match(/bake <b>[\d,\.]+(?:\s+\w+)?\s*<\/b>\s+cookies?\s+per second\./i)) {
            const cpsMatch = achievement.ddesc.match(/bake <b>([\d,\.]+(?:\s+\w+)?)\s*<\/b>\s+cookies?\s+per second\./i);
            if (cpsMatch) {
                let cpsThreshold = 0;
                const valueStr = cpsMatch[1].trim();
                // Try to extract from achievement threshold if available
                if (achievement.threshold) {
                    cpsThreshold = achievement.threshold;
                }
                else {
                    // Parse the text
                    const numMatch = valueStr.match(/^([\d,\.]+)/);
                    if (numMatch) {
                        cpsThreshold = parseFloat(numMatch[1].replace(/,/g, ''));
                        const lowerValue = valueStr.toLowerCase();
                        if (lowerValue.includes('thousand'))
                            cpsThreshold *= 1e3;
                        else if (lowerValue.includes('million'))
                            cpsThreshold *= 1e6;
                        else if (lowerValue.includes('billion'))
                            cpsThreshold *= 1e9;
                        else if (lowerValue.includes('trillion'))
                            cpsThreshold *= 1e12;
                        else if (lowerValue.includes('quadrillion'))
                            cpsThreshold *= 1e15;
                        else if (lowerValue.includes('quintillion'))
                            cpsThreshold *= 1e18;
                        else if (lowerValue.includes('sextillion'))
                            cpsThreshold *= 1e21;
                        else if (lowerValue.includes('septillion'))
                            cpsThreshold *= 1e24;
                    }
                }
                if (cpsThreshold > 0) {
                    const currentCps = Game.cookiesPs;
                    const progressPercent = Math.min(100, (currentCps / cpsThreshold) * 100);
                    progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');
                    progress = {
                        current: currentCps,
                        target: cpsThreshold,
                        percent: progressPercent,
                        label: 'Cookies per second'
                    };
                    // Time remaining: CPS increases over time with purchases
                    // For now, we can't easily predict when we'll hit the target CPS
                    // So we'll show progress but no time estimate
                    timeRemaining = undefined;
                }
            }
        }
        // Special achievements (Hardcore, Neverclick, True Neverclick)
        else if (achievement.id === 38 || achievement.id === 39 || achievement.id === 203) {
            // Hardcore (38), Neverclick (39), True Neverclick (203)
            const isHardcore = achievement.id === 38;
            const isNeverclick = achievement.id === 39;
            const isTrueNeverclick = achievement.id === 203;
            if (isHardcore) {
                // "Bake 1 billion cookies with no upgrades purchased"
                const cookieThreshold = 1000000000;
                const currentCookies = Game.cookiesEarned;
                const upgradesCheck = Game.UpgradesOwned === 0;
                const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
                progressColor = upgradesCheck ? (progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6')) : '#f66';
                progress = {
                    current: currentCookies,
                    target: cookieThreshold,
                    percent: progressPercent,
                    label: 'Cookies (No upgrades)'
                };
                if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
                    const remaining = cookieThreshold - currentCookies;
                    timeRemaining = (remaining / Game.cookiesPs) * 1000;
                }
            }
            else if (isNeverclick || isTrueNeverclick) {
                // Track cookie progress for Neverclick achievements
                const cookieThreshold = 1000000; // Neverclick threshold
                const currentCookies = Game.cookiesEarned;
                const progressPercent = Math.min(100, (currentCookies / cookieThreshold) * 100);
                progressColor = progressPercent < 50 ? '#f66' : (progressPercent < 80 ? '#fc6' : '#6f6');
                progress = {
                    current: currentCookies,
                    target: cookieThreshold,
                    percent: progressPercent,
                    label: isNeverclick ? 'Cookies (≤15 clicks)' : 'Cookies (0 clicks)'
                };
                if (currentCookies < cookieThreshold && Game.cookiesPs > 0) {
                    const remaining = cookieThreshold - currentCookies;
                    timeRemaining = (remaining / Game.cookiesPs) * 1000;
                }
            }
        }
        return {
            module: 'Achievements',
            status: 'active',
            currentAction: `Working on: ${achievement.name}`,
            reason: achievement.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '').substring(0, 50),
            nextAction: this.context.grinding() ? 'Grinding mode (no sleep)' : undefined,
            icon: '🏆',
            progress,
            timeRemaining,
            progressColor,
            details: {
                'Current': achievement.name,
                'Progress': `${wonCount}/${totalAchievements}`,
                'Grinding': this.context.grinding(),
                'Cheating': this.context.grindingCheat()
            }
        };
    }
}

;// ./src/modules/AscensionManager.ts
/**
 * Manages ascension decisions and heavenly upgrades
 */

// Priority upgrades for heavenly cookie purchases
const PRIO_UPGRADES = [363, 323, 411, 412, 413, 264, 265, 266, 267, 268, 520, 181, 282, 283, 284, 291, 393, 394];
class AscensionManager {
    constructor(context) {
        this.context = context;
        this.state = {
            ascendLimit: 0.9 * Math.floor(2 * (1 - Game.ascendMeterPercent)),
            loggedAchievements: {},
            neverclickWarn: true,
            resetTime: Date.now()
        };
        // Initialize logged achievements to prevent spam on startup
        if (Game && Game.Achievements) {
            for (const key in Game.Achievements) {
                const achiev = Game.Achievements[key];
                if (achiev.won) {
                    this.state.loggedAchievements[achiev.id] = true;
                }
            }
        }
        // Register configuration options
        this.context.configManager.registerOption('HardcoreMode', {
            id: 'HardcoreMode',
            type: 'select',
            label: 'Hardcore/Neverclick',
            options: [
                { value: 0, label: 'SKIP (Ignore these achievements)' },
                { value: 1, label: 'AUTO (Attempt when possible)' }
            ],
            default: 1,
            desc: 'Whether to automatically attempt Hardcore and Neverclick achievements.'
        }, 1, 'Strategy');
    }
    /**
     * Main handler for ascension logic
     * Checks achievements, prestige levels, and decides when to ascend
     */
    handleAscend() {
        // Check for newly won achievements
        this.checkAchievements();
        // Handle reincarnation if we're on the ascend screen
        if (Game.OnAscend) {
            this.doReincarnate();
            this.context.findNextAchievement();
            this.context.setDeadline(0); // reactivate all activities
            this.context.now = Date.now();
            this.context.onAscend = false;
            this.state.loggedAchievements = {}; // Reset achievement tracking for new run
            return;
        }
        // Continue ascension process if timer is ready
        if (this.context.onAscend && Game.AscendTimer === 0) {
            Game.Ascend(true);
        }
        // Update achievement goals for first run
        if (Game.ascensionMode === 0 && Game.prestige === 0) {
            this.canContinue(); // update achievement goals
        }
        // Check if target achievement was won
        if (Game.AchievementsById[this.context.nextAchievement].won) {
            this.handleAchievementWon();
            return;
        }
        // Check if reborn mode failed
        if (Game.ascensionMode === 1 && !this.canContinue() && !Game.AchievementsById[this.context.nextAchievement].won) {
            this.doAscend("reborn mode did not work, retry.", false);
            return;
        }
        // Don't ascend right before night
        if (this.context.preNightMode() && this.context.Config.NightMode && this.context.Config.NightMode > 0) {
            return;
        }
        // Check for endless cycle achievement (1000 ascends)
        if (this.checkEndlessCycle()) {
            return;
        }
        // Check for reincarnation achievement (100 ascends)
        if (this.checkReincarnation()) {
            return;
        }
        // Check for time-based ascension (days in run)
        if (this.checkTimeBasedAscension()) {
            return;
        }
        // Check for lucky digit/number/payout upgrades
        if (this.checkLuckyUpgrades()) {
            return;
        }
        // Check for season switcher
        if (!Game.UpgradesById[UPGRADE_IDS.SEASON_SWITCHER].bought &&
            this.context.nextAchievement === 108 && Game.ascendMeterLevel > 1111) {
            this.doAscend("getting season switcher.", true);
            return;
        }
    }
    /**
     * Handle heavenly upgrade purchases during ascension
     */
    handleHeavenlyUpgrades() {
        this.buyHeavenlyUpgrades();
    }
    /**
     * Check all achievements and log newly won ones
     */
    checkAchievements() {
        for (const key in Game.Achievements) {
            const achiev = Game.Achievements[key];
            if (achiev.won && !this.state.loggedAchievements[achiev.id]) {
                // This achievement was just won
                this.state.loggedAchievements[achiev.id] = true;
                this.context.logAction('Achievement unlocked', achiev.name + ' - ' + achiev.ddesc.replace(/<q>.*?<\/q>/ig, ''));
            }
        }
    }
    /**
     * Handle when the target achievement is won
     */
    handleAchievementWon() {
        const achiev = Game.AchievementsById[this.context.nextAchievement];
        this.context.logStatus('achievement', 'Unlocked: ' + achiev.name);
        // Check if this is first ascension and if we should wait for 365+ prestige
        const isFirstRun = (Game.prestige === 0);
        const currentPrestige = Game.ascendMeterLevel;
        const isHardcoreAchievement = (achiev.id === Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE].id ||
            achiev.id === Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].id ||
            achiev.id === Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].id);
        if (isFirstRun && currentPrestige < 365 && !isHardcoreAchievement) {
            // Don't ascend yet - need to reach 365+ prestige for first ascension
            this.context.logStatus('prestige', 'Waiting for 365+ prestige before first ascension (currently ' + Math.floor(currentPrestige) + ')');
            return;
        }
        const date = new Date();
        date.setTime(this.context.now - Game.startDate);
        const legacyTime = Game.sayTime(date.getTime() / 1000 * Game.fps, -1);
        date.setTime(this.context.now - Game.fullDate);
        const fullTime = Game.sayTime(date.getTime() / 1000 * Game.fps, -1);
        this.doAscend("have achievement: " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '') +
            " after " + legacyTime + "(total: " + fullTime + ")", true);
    }
    /**
     * Check for endless cycle achievement (1000 ascends)
     */
    checkEndlessCycle() {
        if (this.context.endPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.ENDLESS_CYCLE].won &&
            !Game.ascensionMode && Game.UpgradesById[UPGRADE_IDS.SUCRALOSIA_INUTILIS].bought &&
            Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought) {
            // this costs approx. 1 minute per ascend
            this.context.activities = "Going for 1000 ascends.";
            this.context.hyperActive = true; // full activity
            this.context.wantAscend = true; // avoid buying plants
            if (Game.ascendMeterLevel > 0) {
                this.doAscend("go for 1000 ascends", false);
                return true;
            }
        }
        return false;
    }
    /**
     * Check for reincarnation achievement (100 ascends)
     */
    checkReincarnation() {
        if (Game.UpgradesById[UPGRADE_IDS.PERMANENT_UPGRADE_SLOT_V].bought &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.REINCARNATION].won && !Game.ascensionMode) {
            // this costs 3+2 minute per 2 ascend
            this.context.activities = "Going for 100 ascends.";
            this.context.hyperActive = true; // full activity
            this.context.wantAscend = true; // avoid buying plants
            if (Game.ascendMeterLevel > 0 &&
                this.state.ascendLimit < Game.ascendMeterLevel * Game.ascendMeterPercent) {
                this.doAscend("go for 100 ascends", false);
                return true;
            }
        }
        return false;
    }
    /**
     * Check if it's time to ascend based on days in run
     */
    checkTimeBasedAscension() {
        const daysInRun = (this.context.now - Game.startDate) / 1000 / 60 / 60 / 24;
        // Stock market profit check
        if (this.context.nextAchievement === 463 && daysInRun > 10 &&
            Game.ObjectsById[BUILDING_IDS.BANK].minigame && Game.ObjectsById[BUILDING_IDS.BANK].minigame.profit > daysInRun * 300000) {
            this.context.addActivity("Making money in stock market for achievements.");
            return false;
        }
        // Calculate maximum days in run
        const maxDaysInRun = Math.pow(40 * (Game.prestige + 1000000000) / (Game.ascendMeterLevel + 1), 2);
        if (!this.context.wantAscend && daysInRun > 20) {
            this.context.addActivity("Still " + Beautify(maxDaysInRun - daysInRun) +
                " days until next hard ascend.");
        }
        if (daysInRun > maxDaysInRun && daysInRun > 20) {
            // do not ascend if the first digit of the total cookies is a 9
            let x = Game.cookiesEarned;
            while (x > 10)
                x /= 10;
            if (x < 9) {
                this.doAscend("ascend after " + Math.floor(daysInRun) +
                    " days just while waiting for next achievement.", true);
                return true;
            }
        }
        return false;
    }
    /**
     * Check for lucky digit/number/payout heavenly upgrades
     */
    checkLuckyUpgrades() {
        // Lucky digit (prestige % 10 == 7)
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_DIGIT].bought && Game.heavenlyChips > 777 &&
            Game.ascendMeterLevel > 0 && Game.ascendMeterLevel < 20 &&
            ((Game.prestige + Game.ascendMeterLevel) % 10 === 7)) {
            this.doAscend("ascend for heavenly upgrade lucky digit.", false);
            return true;
        }
        // Lucky number (prestige % 1000 == 777)
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_NUMBER].bought && Game.heavenlyChips > 77777 &&
            Game.ascendMeterLevel > 0 && Game.ascendMeterLevel < 200 &&
            ((Game.prestige + Game.ascendMeterLevel) % 1000 === 777)) {
            this.doAscend("ascend for heavenly upgrade lucky number.", false);
            return true;
        }
        // Lucky payout (need six 7s in prestige)
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought && Game.heavenlyChips > 77777777) {
            const newPrestige = Game.prestige + Game.ascendMeterLevel;
            this.context.wantAscend = true; // avoid buying plants
            this.context.hyperActive = true; // full activity
            this.context.addActivity("Trying to get heavenly upgrade Lucky Payout.");
            const sevenCount = (newPrestige + '').split('7').length - 1;
            if (Math.ceil(sevenCount) >= 4) {
                this.doAscend("ascend for heavenly upgrade lucky payout.", false);
                return true;
            }
        }
        return false;
    }
    /**
     * Check if we can continue with special achievement runs
     * Returns true if working on special achievement, false otherwise
     */
    canContinue() {
        let needAchievement = false;
        let targetActivity = '';
        this.context.workingOnSpecialAchievement = false; // Clear flag by default
        // Check if Hardcore/Neverclick mode is enabled (AUTO = 1, SKIP = 0)
        const shouldAttemptHardcore = this.context.Config.HardcoreMode === 1;
        // True Neverclick (0 clicks)
        if (shouldAttemptHardcore && !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won && Game.cookieClicks === 0) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
            if (this.state.neverclickWarn) {
                Game.Prompt('<h3>Attention</h3><div class="block">' +
                    '<p>Cookie Bot is trying to get the true neverclick achievement.</p>' +
                    '<p>Please do not click cookies now.</p>' +
                    '</div>', ['OK']);
            }
            this.state.neverclickWarn = false;
            needAchievement = true;
        }
        // Neverclick (<=15 clicks)
        else if (shouldAttemptHardcore && !Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won && Game.cookieClicks <= 15) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
            needAchievement = true;
        }
        // Hardcore (0 upgrades)
        else if (shouldAttemptHardcore && !Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE].won && Game.UpgradesOwned === 0) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
            needAchievement = true;
        }
        if (needAchievement) {
            // Only update if the goal changed
            if (this.context.mainActivity !== targetActivity) {
                this.context.setMainActivity(targetActivity);
                this.context.activities = targetActivity; // Also update activities to match
            }
            this.context.workingOnSpecialAchievement = true; // Flag to skip adding extra activity hints
            return true;
        }
        // Speed baking achievements
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_I].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 35)) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_I];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
        }
        else if (!Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_II].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 25)) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_II];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
            // threefold clicking speed
            for (let i = 1; i < 3; i++) {
                setTimeout(() => { Game.ClickCookie(0, Game.computedMouseCps); }, 60 * i);
            }
        }
        else if (!Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_III].won &&
            (this.context.now - Game.startDate <= 1000 * 60 * 15)) {
            const achiev = Game.AchievementsById[ACHIEVEMENT_IDS.SPEED_BAKING_III];
            targetActivity = "Trying to get achievement: " + achiev.name + " - " + achiev.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, '');
            // fivefold clicking speed
            for (let i = 1; i < 5; i++) {
                setTimeout(() => { Game.ClickCookie(0, Game.computedMouseCps); }, 30 * i);
            }
        }
        else {
            return false;
        }
        // Only update if the goal changed
        if (this.context.mainActivity !== targetActivity) {
            this.context.setMainActivity(targetActivity);
            this.context.activities = targetActivity; // Also update activities to match
        }
        this.context.workingOnSpecialAchievement = true; // Flag to skip adding extra activity hints
        this.context.hyperActive = true; // full activity for speed baking
        return true;
    }
    /**
     * Public method to trigger ascension with a reason
     * Used by special achievement logic like runJustRight()
     */
    triggerAscend(reason, log = false) {
        this.doAscend(reason, log);
    }
    /**
     * Perform the actual ascension
     */
    doAscend(reason, log = false) {
        if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0)
            return;
        if (this.context.onAscend || Game.OnAscend)
            return;
        this.context.logStatus('ascend', reason);
        this.context.wantAscend = this.context.plantPending;
        this.context.addActivity("Preparing to ascend.");
        // Do not ascend when waiting for a plant
        if (this.context.wantAscend)
            return;
        // Do not ascend during sugar frenzy/blessing
        if (Game.hasBuff("Sugar frenzy"))
            return;
        if (Game.hasBuff("Sugar blessing"))
            return;
        this.context.setDeadline(0); // full activity to monitor ascension
        // Pop wrinklers if they're close to ready
        if (Game.wrinklers.some((w) => w.close)) {
            this.context.assignSpirit(0, "scorn", 1);
            this.context.delay = 10;
        }
        Game.wrinklers.forEach((w) => { if (w.close === 1)
            w.hp = 0; });
        // Harvest garden
        if (Game.isMinigameReady && Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.FARM])) {
            Game.ObjectsById[BUILDING_IDS.FARM].minigame.harvestAll();
        }
        // Sell all stock market goods
        if (Game.isMinigameReady && Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK])) {
            const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;
            for (const g in market.goods) {
                market.sellGood(market.goods[g].id, 10000);
            }
        }
        // Buy chocolate egg if available
        if (Game.UpgradesById[UPGRADE_IDS.CHOCOLATE_EGG].unlocked &&
            !Game.UpgradesById[UPGRADE_IDS.CHOCOLATE_EGG].bought) {
            // Set first aura to earth shatterer
            if (Game.dragonLevel >= 9) {
                Game.specialTab = "dragon";
                Game.SetDragonAura(5, 0);
                Game.ConfirmPrompt();
                Game.ToggleSpecialMenu(0);
            }
            Game.ObjectsById.forEach((e) => { e.sell(e.amount); });
            Game.UpgradesById[UPGRADE_IDS.CHOCOLATE_EGG].buy();
            this.context.delay = 10;
        }
        else {
            this.context.info(reason);
            // Log prestige gain
            const prestigeGain = Game.ascendMeterLevel;
            const newPrestige = Game.prestige + prestigeGain;
            if (typeof Beautify !== 'undefined' && prestigeGain > 0) {
                this.context.logAction('Ascending', reason + ' | Prestige: ' + Beautify(Game.prestige) + ' → ' +
                    Beautify(newPrestige) + ' (+' + Beautify(prestigeGain) + ')');
            }
            else {
                this.context.logAction('Ascending', reason);
            }
            this.context.delay = 15;
            // Set logging info if requested
            if (log) {
                this.context.loggingInfo = reason;
            }
            // Call logging before ascension if available
            if (typeof this.context.logging === 'function') {
                this.context.logging();
            }
            Game.Ascend(true);
            this.context.onAscend = true;
        }
    }
    /**
     * Handle reincarnation (after ascending)
     */
    doReincarnate() {
        this.context.onAscend = false;
        this.context.delay = 10;
        this.buyHeavenlyUpgrades();
        // Choose ascension mode
        if (!Game.Achievements["Neverclick"].won || !Game.Achievements["Hardcore"].won) {
            Game.PickAscensionMode();
            Game.nextAscensionMode = 1;
            Game.ConfirmPrompt();
        }
        if (this.context.endPhase() && this.context.mustRebornAscend()) {
            Game.PickAscensionMode();
            Game.nextAscensionMode = 1;
            Game.ConfirmPrompt();
        }
        Game.Reincarnate(true);
        this.state.resetTime = Date.now(); // save the current date for things that need to be delayed after reincarnating
        // Reset savings start time after reincarnation
        if ('savingsStart' in this.state) {
            this.state.savingsStart = this.context.now;
        }
        this.state.neverclickWarn = true;
        this.state.ascendLimit = 0.9 * Math.floor(2 * (1 - Game.ascendMeterPercent));
    }
    /**
     * Buy all available heavenly upgrades
     */
    buyHeavenlyUpgrades() {
        const upgradesPurchased = [];
        // Buy priority upgrades first
        PRIO_UPGRADES.forEach((id) => {
            const upgrade = Game.UpgradesById[id];
            if (upgrade && upgrade.canBePurchased && !upgrade.bought && upgrade.buy(true)) {
                this.context.info("buying " + upgrade.name);
                upgradesPurchased.push(upgrade.name);
            }
        });
        // Buy all other available upgrades
        for (const key in Game.UpgradesById) {
            const upgrade = Game.UpgradesById[key];
            if (upgrade && upgrade.canBePurchased && !upgrade.bought && upgrade.buy(true)) {
                this.context.info("buying " + upgrade.name);
                upgradesPurchased.push(upgrade.name);
            }
        }
        // Log all purchased heavenly upgrades
        if (upgradesPurchased.length > 0) {
            this.context.logAction('Purchased heavenly upgrades', upgradesPurchased.join(', '));
        }
        // Assign permanent slots
        this.assignPermanentSlot(1, this.context.kittens);
        this.assignPermanentSlot(2, this.context.maxBuildings);
        if (!Game.Achievements["Reincarnation"].won) { // for many ascends
            this.assignPermanentSlot(0, this.context.cursors);
            this.assignPermanentSlot(3, [52]); // lucky day
            this.assignPermanentSlot(4, [53]); // serendipity
        }
        else { // collect rare things
            this.assignPermanentSlot(0, this.context.butterBiscuits);
            this.assignPermanentSlot(3, [226]); // omelette
            this.assignPermanentSlot(4, this.context.expensive);
        }
    }
    /**
     * Assign a permanent upgrade slot
     */
    assignPermanentSlot(slot, options) {
        // Check if slot is unlocked (base ID is 264)
        if (!Game.UpgradesById[264 + slot].bought)
            return;
        // Safety check for options
        if (!options || !Array.isArray(options)) {
            this.context.info(`Warning: No options provided for permanent slot ${slot}`);
            return;
        }
        Game.AssignPermanentSlot(slot);
        // Try to assign the best available upgrade from options (highest priority last)
        for (let i = options.length - 1; i >= 0; i--) {
            if (Game.UpgradesById[options[i]].bought) {
                Game.PutUpgradeInPermanentSlot(options[i], slot);
                break;
            }
        }
        Game.ConfirmPrompt();
    }
    /**
     * Get current ascension state (for external access)
     */
    getState() {
        return { ...this.state };
    }
    /**
     * Get current ascension manager status
     */
    getStatus() {
        // Check if on ascension screen
        if (Game.OnAscend) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Buying heavenly upgrades',
                reason: 'On ascension screen',
                nextAction: 'Will reincarnate',
                icon: '🌟',
                details: {
                    'Heavenly Chips': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.heavenlyChips)) : Math.floor(Game.heavenlyChips),
                    'Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige)) : Math.floor(Game.prestige),
                    'On Ascend Screen': true
                }
            };
        }
        // Check if ascending
        if (this.context.onAscend) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Ascending',
                reason: 'Ascension in progress',
                nextAction: 'Wait for ascension screen',
                icon: '🌟',
                details: {
                    'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.ascendMeterLevel)) : Math.floor(Game.ascendMeterLevel),
                    'New Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige + Game.ascendMeterLevel)) : Math.floor(Game.prestige + Game.ascendMeterLevel)
                }
            };
        }
        const currentPrestige = Game.prestige;
        const prestigeGain = Game.ascendMeterLevel;
        const targetAchievement = Game.AchievementsById[this.context.nextAchievement];
        const daysInRun = (this.context.now - Game.startDate) / 1000 / 60 / 60 / 24;
        // Check for special achievement attempts
        if (this.context.workingOnSpecialAchievement) {
            let achievementName = '';
            if (Game.cookieClicks === 0 && !Game.AchievementsById[ACHIEVEMENT_IDS.TRUE_NEVERCLICK].won) {
                achievementName = 'True Neverclick (0 clicks)';
            }
            else if (Game.cookieClicks <= 15 && !Game.AchievementsById[ACHIEVEMENT_IDS.NEVERCLICK].won) {
                achievementName = 'Neverclick (≤15 clicks)';
            }
            else if (Game.UpgradesOwned === 0 && !Game.AchievementsById[ACHIEVEMENT_IDS.HARDCORE].won) {
                achievementName = 'Hardcore (0 upgrades)';
            }
            else {
                achievementName = 'Speed baking';
            }
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: `Working on ${achievementName}`,
                reason: 'Special achievement run',
                nextAction: 'Will ascend when complete',
                icon: '🌟',
                details: {
                    'Achievement': achievementName,
                    'Cookie Clicks': Game.cookieClicks,
                    'Upgrades Owned': Game.UpgradesOwned,
                    'Days in Run': daysInRun.toFixed(1)
                }
            };
        }
        // Check for endless cycle (1000 ascends)
        if (this.context.endPhase() && !Game.AchievementsById[ACHIEVEMENT_IDS.ENDLESS_CYCLE].won &&
            !Game.ascensionMode && Game.UpgradesById[UPGRADE_IDS.SUCRALOSIA_INUTILIS].bought) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for 1000 ascends',
                reason: 'Endless cycle achievement',
                nextAction: 'Rapid ascension mode',
                icon: '🌟',
                details: {
                    'Resets': Game.resets,
                    'Target': 1000,
                    'Remaining': 1000 - Game.resets
                }
            };
        }
        // Check for reincarnation (100 ascends)
        if (Game.UpgradesById[UPGRADE_IDS.PERMANENT_UPGRADE_SLOT_V].bought &&
            !Game.AchievementsById[ACHIEVEMENT_IDS.REINCARNATION].won && !Game.ascensionMode) {
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for 100 ascends',
                reason: 'Reincarnation achievement',
                nextAction: 'Rapid ascension mode',
                icon: '🌟',
                details: {
                    'Resets': Game.resets,
                    'Target': 100,
                    'Remaining': 100 - Game.resets
                }
            };
        }
        // Check for lucky upgrades
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought && Game.heavenlyChips > 77777777) {
            const sevenCount = ((Game.prestige + prestigeGain) + '').split('7').length - 1;
            return {
                module: 'Ascension',
                status: 'active',
                currentAction: 'Going for Lucky payout',
                reason: `Need six 7s in prestige (currently ${sevenCount})`,
                nextAction: sevenCount >= 4 ? 'Close! Will ascend soon' : 'Grinding prestige',
                icon: '🌟',
                details: {
                    'Sevens': sevenCount,
                    'Target': 6,
                    'Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(Game.prestige + prestigeGain)) : Math.floor(Game.prestige + prestigeGain)
                }
            };
        }
        // Normal mode - waiting for target achievement
        if (targetAchievement && !targetAchievement.won) {
            return {
                module: 'Ascension',
                status: 'waiting',
                currentAction: `Working on ${targetAchievement.name}`,
                reason: targetAchievement.ddesc.replace(/<q>.*?<\/q>/ig, '').replace(/<[^>]+>/g, ''),
                nextAction: `Will ascend when achieved`,
                icon: '🌟',
                details: {
                    'Current Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(currentPrestige)) : Math.floor(currentPrestige),
                    'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(prestigeGain)) : Math.floor(prestigeGain),
                    'Days in Run': daysInRun.toFixed(1),
                    'Target Achievement': targetAchievement.name
                }
            };
        }
        // Idle - no specific ascension plan
        return {
            module: 'Ascension',
            status: 'idle',
            currentAction: 'Playing normally',
            reason: 'No immediate ascension planned',
            nextAction: 'Will ascend when beneficial',
            icon: '🌟',
            details: {
                'Current Prestige': typeof Beautify !== 'undefined' ? Beautify(Math.floor(currentPrestige)) : Math.floor(currentPrestige),
                'Prestige Gain': typeof Beautify !== 'undefined' ? Beautify(Math.floor(prestigeGain)) : Math.floor(prestigeGain),
                'Days in Run': daysInRun.toFixed(1),
                'Resets': Game.resets
            }
        };
    }
}

;// ./src/modules/DragonManager.ts
/**
 * Manages dragon training and aura selection
 *
 * The Dragon (Krumblor) is unlocked after purchasing "A crumbly egg" upgrade.
 * Dragon levels unlock through various sacrifices and achievements.
 * Dragons provide powerful auras that boost game performance.
 */

/**
 * Dragon aura indices
 */
var DragonAura;
(function (DragonAura) {
    DragonAura[DragonAura["None"] = 0] = "None";
    DragonAura[DragonAura["BreathOfMilk"] = 1] = "BreathOfMilk";
    DragonAura[DragonAura["DragonCursor"] = 2] = "DragonCursor";
    DragonAura[DragonAura["ElderBattalion"] = 3] = "ElderBattalion";
    DragonAura[DragonAura["ReaperOfFields"] = 4] = "ReaperOfFields";
    DragonAura[DragonAura["Dragonflight"] = 5] = "Dragonflight";
    DragonAura[DragonAura["AncestralMetamorphosis"] = 6] = "AncestralMetamorphosis";
    DragonAura[DragonAura["UnholyDominion"] = 7] = "UnholyDominion";
    DragonAura[DragonAura["FierceHoarder"] = 8] = "FierceHoarder";
    DragonAura[DragonAura["DragonGod"] = 9] = "DragonGod";
    DragonAura[DragonAura["ArcaneAura"] = 10] = "ArcaneAura";
    DragonAura[DragonAura["FierceHoarder2"] = 11] = "FierceHoarder2";
    DragonAura[DragonAura["DragonOrb"] = 12] = "DragonOrb";
    DragonAura[DragonAura["ReaperOfFields2"] = 13] = "ReaperOfFields2";
    DragonAura[DragonAura["RadiantAppetite"] = 15] = "RadiantAppetite";
    DragonAura[DragonAura["DragonsCurve"] = 17] = "DragonsCurve"; // Sugar lumps ripen 5% faster
})(DragonAura || (DragonAura = {}));
/**
 * Lump harvest achievement IDs (266-272 and 396)
 * These achievements require specific lump types or harvesting conditions
 */
const LUMP_HARVEST_ACHIEVEMENTS = [266, 267, 268, 269, 270, 271, 272, 396];
/**
 * Dragon drop items from petting
 */
const DRAGON_DROPS = [
    'Dragon scale',
    'Dragon claw',
    'Dragon fang',
    'Dragon teddy bear'
];
/**
 * Aura names for logging
 */
const AURA_NAMES = {
    0: 'None',
    1: 'Breath of Milk',
    2: 'Dragon Cursor',
    3: 'Elder Battalion',
    4: 'Reaper of Fields',
    5: 'Dragonflight',
    6: 'Ancestral Metamorphosis',
    7: 'Unholy Dominion',
    8: 'Fierce Hoarder',
    9: 'Dragon God',
    10: 'Arcane Aura',
    15: 'Radiant Appetite',
    17: "Dragon's Curve"
};
class DragonManager {
    constructor(context) {
        this.context = context;
    }
    /**
     * Main handler for all dragon-related activities
     * Should be called periodically from the main AutoPlay loop
     */
    handleDragon() {
        // Only proceed if dragon egg is unlocked
        if (!Game.UpgradesById[UPGRADE_IDS.A_CRUMBLY_EGG].unlocked) {
            return;
        }
        // Train dragon to next level if possible
        this.trainDragon();
        // Pet dragon for drops
        this.petDragon();
        // Select optimal auras based on current dragon level
        this.selectBestAuras();
    }
    /**
     * Train dragon to the next level
     * Handles building sacrifices required for leveling
     */
    trainDragon() {
        const maxLevel = Game.dragonLevels.length - 1;
        // Check if dragon can be leveled up
        if (Game.dragonLevel >= maxLevel) {
            return;
        }
        const currentLevelData = Game.dragonLevels[Game.dragonLevel];
        if (!currentLevelData.cost()) {
            return; // Don't have resources to level up
        }
        // Determine what needs to be done after upgrading
        let buildingToRestock = null;
        let shouldBuy150 = false;
        // Levels 5-20: Sacrifice 100 of a specific building (one per level)
        if (Game.dragonLevel >= 5 && Game.dragonLevel < maxLevel - 3) {
            const buildingIndex = Game.dragonLevel - 5;
            buildingToRestock = Game.ObjectsById[buildingIndex];
        }
        // Last 3 levels before max: Sacrifice 50/200/200 of all buildings
        else if (Game.dragonLevel >= maxLevel - 3) {
            shouldBuy150 = true;
        }
        // Upgrade the dragon
        Game.specialTab = 'dragon';
        Game.UpgradeDragon();
        Game.ToggleSpecialMenu(0);
        // Handle post-upgrade restocking
        if (shouldBuy150) {
            // After sacrificing 50 or 200 of all buildings, buy back to 150
            // Ensure Farm exists for garden minigame
            if (Game.ObjectsById[BUILDING_IDS.FARM].amount === 0) {
                Game.ObjectsById[BUILDING_IDS.FARM].buy(1);
            }
            // Note: handleMinigames would need to be called here
            // For now, just buy buildings
            for (const building of Game.ObjectsById) {
                const needed = 150 - building.amount;
                if (needed > 0) {
                    building.buy(needed);
                }
            }
        }
        else if (buildingToRestock) {
            // After sacrificing 100 of a specific building, buy 50 back immediately
            const needed = 50 - buildingToRestock.amount;
            if (needed > 0) {
                buildingToRestock.buy(needed);
            }
        }
    }
    /**
     * Select the best auras based on current game state and dragon level
     */
    selectBestAuras() {
        // Set primary aura
        if (Game.dragonLevel >= 5) {
            this.setPrimaryAura();
        }
        // Set secondary aura (only available at max level)
        if (Game.dragonLevel >= Game.dragonLevels.length - 1) {
            this.setSecondaryAura();
        }
    }
    /**
     * Set the primary dragon aura (slot 0)
     * Strategy:
     * - Level 5+: Breath of Milk (kitten boost)
     * - Level 19+: Radiant Appetite (golden cookie boost)
     * - Level 21+: Dragon's Curve (lump ripening) OR Radiant Appetite
     */
    setPrimaryAura() {
        let desiredAura = DragonAura.None;
        if (Game.dragonLevel >= 5) {
            desiredAura = DragonAura.BreathOfMilk;
        }
        if (Game.dragonLevel >= 19) {
            desiredAura = DragonAura.RadiantAppetite;
        }
        if (Game.dragonLevel >= 21) {
            desiredAura = DragonAura.DragonsCurve;
            // Switch to Radiant Appetite if we have plenty of lumps
            // and not actively hunting lump harvest achievements
            const hasPlentLumps = Game.lumps > 99;
            const needsLumpAchievement = this.isHuntingLumpAchievement();
            if (hasPlentLumps && !needsLumpAchievement) {
                desiredAura = DragonAura.RadiantAppetite;
            }
        }
        // Only change if different from current
        if (Game.dragonAura !== desiredAura) {
            Game.specialTab = 'dragon';
            Game.SetDragonAura(desiredAura, 0);
            Game.ConfirmPrompt();
            Game.ToggleSpecialMenu(0);
            const auraName = AURA_NAMES[desiredAura] || 'Unknown';
            this.context.logStatus('dragon', `Dragon aura 1: ${auraName}`);
        }
    }
    /**
     * Set the secondary dragon aura (slot 1)
     * Always set to Breath of Milk for the kitten boost
     */
    setSecondaryAura() {
        const desiredAura = DragonAura.BreathOfMilk;
        // Only change if different from current
        if (Game.dragonAura2 !== desiredAura) {
            Game.specialTab = 'dragon';
            Game.SetDragonAura(desiredAura, 1);
            Game.ConfirmPrompt();
            Game.ToggleSpecialMenu(0);
            this.context.logStatus('dragon', 'Dragon aura 2: Breath of Milk');
        }
    }
    /**
     * Pet the dragon to get special drops
     * Available at dragon level 8+
     * Drops: Dragon scale, Dragon claw, Dragon fang, Dragon teddy bear
     */
    petDragon() {
        if (Game.dragonLevel < 8) {
            return; // Can't pet dragon yet
        }
        // Check if there are any drops we haven't obtained yet
        for (const drop of DRAGON_DROPS) {
            if (!Game.Has(drop) && !Game.HasUnlocked(drop)) {
                // Still have drops to collect
                this.context.addActivity('Petting the dragon.');
                Game.specialTab = 'dragon';
                Game.ToggleSpecialMenu(1);
                Game.ClickSpecialPic();
                Game.ToggleSpecialMenu(0);
                return; // Only pet once per cycle
            }
        }
    }
    /**
     * Check if buying a specific building is efficient based on dragon sacrifices
     * Used by BuildingManager to avoid buying too many buildings during sacrifice phases
     *
     * @param buildingName - Name of the building to check
     * @returns true if safe to buy, false if would interfere with dragon training
     */
    checkDragonLimits(buildingName) {
        // Don't limit purchases until "Here be dragon" achievement is won
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.HERE_BE_DRAGON].won) {
            return true;
        }
        const building = Game.Objects[buildingName];
        if (!building) {
            return true;
        }
        // Haven't sacrificed the first 100 of this building yet
        // Limit to 100 so we have exactly 100 to sacrifice
        if (Game.dragonLevel - 5 <= building.id) {
            return building.amount < 100;
        }
        // Waiting to sacrifice 50 of all buildings
        // Limit to 50 so we have exactly 50 to sacrifice
        if (Game.dragonLevel < Game.dragonLevels.length - 2) {
            return building.amount < 50;
        }
        // Waiting to sacrifice 200 of all buildings
        // Limit to 200 so we have exactly 200 to sacrifice
        if (Game.dragonLevel < Game.dragonLevels.length - 1) {
            return building.amount < 200;
        }
        // Fully trained or no restrictions
        return true;
    }
    /**
     * Check if we're currently hunting lump harvest achievements
     * This affects aura selection - we want Dragon's Curve for faster ripening
     *
     * @returns true if hunting lump-related achievements
     */
    isHuntingLumpAchievement() {
        // Lump harvest achievements: IDs 266-272 and 396
        // These require harvesting lumps at specific maturity levels
        return LUMP_HARVEST_ACHIEVEMENTS.includes(this.context.nextAchievement);
    }
    /**
     * Get current dragon manager status
     */
    getStatus() {
        // Check if dragon egg is unlocked
        if (!Game.UpgradesById[UPGRADE_IDS.A_CRUMBLY_EGG].unlocked) {
            return {
                module: 'Dragon',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need to purchase "A crumbly egg" upgrade',
                icon: '🐉',
                details: {
                    'Dragon': 'Not unlocked'
                }
            };
        }
        const maxLevel = Game.dragonLevels.length - 1;
        const currentLevel = Game.dragonLevel;
        const aura1 = AURA_NAMES[Game.dragonAura] || 'None';
        const aura2 = AURA_NAMES[Game.dragonAura2] || 'None';
        // Check if dragon can level up
        if (currentLevel < maxLevel) {
            const currentLevelData = Game.dragonLevels[currentLevel];
            const canLevel = currentLevelData.cost();
            if (canLevel) {
                // Determine what will be sacrificed
                let sacrificeDesc = '';
                if (currentLevel >= 5 && currentLevel < maxLevel - 3) {
                    const buildingIndex = currentLevel - 5;
                    const building = Game.ObjectsById[buildingIndex];
                    sacrificeDesc = `100 ${building.name}`;
                }
                else if (currentLevel >= maxLevel - 3) {
                    const amount = currentLevel === maxLevel - 3 ? 50 : 200;
                    sacrificeDesc = `${amount} of all buildings`;
                }
                return {
                    module: 'Dragon',
                    status: 'active',
                    currentAction: 'Leveling up dragon',
                    reason: `Level ${currentLevel} → ${currentLevel + 1}`,
                    nextAction: sacrificeDesc ? `Sacrifice: ${sacrificeDesc}` : 'Training dragon',
                    icon: '🐉',
                    details: {
                        'Level': currentLevel,
                        'Max Level': maxLevel,
                        'Aura 1': aura1,
                        'Aura 2': currentLevel >= maxLevel ? aura2 : 'Not unlocked'
                    }
                };
            }
            return {
                module: 'Dragon',
                status: 'waiting',
                currentAction: 'Waiting to level',
                reason: `Level ${currentLevel}/${maxLevel}`,
                nextAction: 'Need resources to level up',
                icon: '🐉',
                details: {
                    'Level': currentLevel,
                    'Aura 1': aura1,
                    'Aura 2': currentLevel >= maxLevel ? aura2 : 'Not unlocked'
                }
            };
        }
        // Dragon is max level - check for drops
        const missingDrops = DRAGON_DROPS.filter(drop => !Game.Has(drop) && !Game.HasUnlocked(drop));
        if (missingDrops.length > 0) {
            return {
                module: 'Dragon',
                status: 'active',
                currentAction: 'Petting for drops',
                reason: `${missingDrops.length} drops remaining`,
                nextAction: `Next: ${missingDrops[0]}`,
                icon: '🐉',
                details: {
                    'Level': 'Max',
                    'Aura 1': aura1,
                    'Aura 2': aura2,
                    'Drops Remaining': missingDrops.length
                }
            };
        }
        // Dragon is max level and has all drops - just managing auras
        const hasPlentLumps = Game.lumps > 99;
        const needsLumpAchievement = this.isHuntingLumpAchievement();
        const usingLumpAura = Game.dragonAura === DragonAura.DragonsCurve;
        return {
            module: 'Dragon',
            status: 'idle',
            currentAction: 'Managing auras',
            reason: usingLumpAura
                ? (needsLumpAchievement ? 'Optimizing for lump achievements' : hasPlentLumps ? 'Using lump aura despite having 99+ lumps' : 'Fast lump ripening')
                : (hasPlentLumps && !needsLumpAchievement ? 'Plenty lumps - using golden cookie aura' : 'Optimizing for golden cookies'),
            icon: '🐉',
            details: {
                'Level': 'Max',
                'Aura 1': aura1,
                'Aura 2': aura2,
                'Sugar Lumps': Game.lumps,
                'All Drops': 'Collected'
            }
        };
    }
}

;// ./src/modules/Dashboard.ts
class Dashboard {
    constructor(context, configManager) {
        // Dashboard state
        this.dashboardCollapsed = false;
        this.dashboardObserver = null;
        this.resizeObserver = null;
        this.positionTimeout = null;
        this.lastRenderTime = 0;
        this.renderInterval = 100; // Min ms between renders (approx 10fps)
        // Activity tracking
        this.actionHistory = [];
        this.statusHistory = [];
        this.lastStatus = {};
        this.maxHistorySize = 20;
        this.context = context;
        this.configManager = configManager;
        // Register options
        this.configManager.registerOption('ShowDashboard', {
            options: [
                { value: 0, label: 'HIDE' },
                { value: 1, label: 'SHOW' }
            ],
            label: ['HIDE', 'SHOW'], // Legacy support
            desc: 'Toggle dashboard visibility'
        }, 1, 'Display');
        this.configManager.registerOption('CleanLog', {
            options: [
                { value: 0, label: 'Clean Log' }
            ],
            label: ['Clean Log'], // Legacy support
            desc: 'Cleaning the log'
        }, 0, 'Logging');
        this.configManager.registerOption('ShowLog', {
            options: [
                { value: 0, label: 'Show Log' }
            ],
            label: ['Show Log'], // Legacy support
            desc: 'Showing the log'
        }, 0, 'Logging');
        this.configManager.registerOption('ConsoleLog', {
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'ON' }
            ],
            label: ['OFF', 'ON'], // Legacy support
            desc: 'Log activity to browser console'
        }, 0, 'Logging');
        this.configManager.onDashboardToggle = () => {
            setTimeout(() => {
                this.positionDashboard();
            }, 0);
        };
    }
    /**
     * Get the current config object (for AutoPlay.Config sync)
     */
    getConfig() {
        return this.configManager.getConfig();
    }
    /**
     * Add menu preferences to the game menu
     */
    addMenuPref() {
        this.configManager.addMenuPref();
    }
    /**
     * Create the dashboard UI
     */
    createDashboard() {
        // Create container
        const dashboard = document.createElement('div');
        dashboard.id = 'cookieBotDashboard';
        // Create header with toggle button and next update timer
        const header = document.createElement('div');
        header.style.cssText = 'padding: 8px 16px; background: rgba(0, 100, 0, 0.3); cursor: pointer; display: flex; justify-content: space-between; align-items: center;';
        // Create left section (Title + Timer)
        const leftSection = document.createElement('div');
        leftSection.style.cssText = 'display: flex; flex-direction: column; gap: 2px;';
        leftSection.innerHTML = `
        <span style="color: #6f6; font-size: 14px; font-weight: bold;">CookieBot Dashboard</span>
        <span id="dashboardNextUpdate" style="color: #9cf; font-size: 10px; opacity: 0.8;">Next update: checking...</span>
    `;
        // Create mini modules container (hidden by default)
        const miniModules = document.createElement('div');
        miniModules.id = 'dashMiniModules';
        miniModules.style.cssText = 'display: none; flex: 1; justify-content: center; gap: 16px; align-items: center; overflow: hidden; white-space: nowrap; margin: 0 16px;';
        // Create right section (Toggle)
        const toggleBtn = document.createElement('span');
        toggleBtn.id = 'dashboardToggle';
        toggleBtn.style.cssText = 'color: #6f6; font-size: 12px;';
        toggleBtn.textContent = '▼ Collapse';
        header.appendChild(leftSection);
        header.appendChild(miniModules);
        header.appendChild(toggleBtn);
        // Create content area - flexible grid for modules + activity column
        const content = document.createElement('div');
        content.id = 'dashboardContent';
        content.style.cssText = 'display: flex; padding: 12px; gap: 16px; max-height: 350px; overflow-y: auto;';
        // Left 2/3: Flexible grid of all modules | Right 1/3: Recent Activity
        content.innerHTML = `
      <div id="dashModulesGrid" style="flex: 2; min-width: 400px; display: flex; flex-direction: column; gap: 12px;">
        <div id="dashModulesContent" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; color: #fff; font-size: 11px; line-height: 1.5;">Loading...</div>
      </div>
      <div id="dashActivity" style="flex: 1; min-width: 240px;">
        <div style="color: #6f6; font-size: 13px; margin-bottom: 8px; font-weight: bold;">📋 Recent Activity</div>
        <div id="dashActivityContent" style="color: #fff; font-size: 11px; line-height: 1.4; max-height: 300px; overflow-y: auto;">No activity yet...</div>
      </div>
    `;
        // Add toggle functionality
        header.onclick = () => this.toggleDashboard();
        dashboard.appendChild(header);
        dashboard.appendChild(content);
        // Append to wrapper element
        const wrapper = document.getElementById('wrapper');
        if (wrapper) {
            wrapper.appendChild(dashboard);
        }
        else {
            document.body.appendChild(dashboard);
        }
        // Calculate bottom offset based on other bottom bars
        // Defer initial positioning to ensure DOM is fully settled
        setTimeout(() => {
            this.positionDashboard();
        }, 100);
        // Watch for new elements being added to wrapper (like Cookie Monster loading later)
        if (wrapper && typeof MutationObserver !== 'undefined') {
            this.dashboardObserver = new MutationObserver(() => {
                // Debounce to avoid multiple rapid calls
                if (this.positionTimeout) {
                    clearTimeout(this.positionTimeout);
                }
                this.positionTimeout = window.setTimeout(() => {
                    this.positionDashboard();
                }, 50);
            });
            this.dashboardObserver.observe(wrapper, { childList: true });
        }
        // Watch dashboard itself for size changes (e.g. when content loads)
        if (typeof ResizeObserver !== 'undefined') {
            if (!this.resizeObserver) {
                this.resizeObserver = new ResizeObserver(() => {
                    this.positionDashboard();
                });
            }
            this.resizeObserver.observe(dashboard);
        }
        // Apply config setting for visibility
        if (this.configManager.getConfig().ShowDashboard === 0) {
            dashboard.style.display = 'none';
        }
    }
    /**
     * Position dashboard at the bottom of the screen
     */
    positionDashboard() {
        const dashboard = document.getElementById('cookieBotDashboard');
        if (!dashboard)
            return;
        const wrapper = document.getElementById('wrapper');
        if (!wrapper)
            return;
        // Find all other bottom-positioned elements in the wrapper
        let bottomOffset = 0;
        const children = wrapper.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.id !== 'cookieBotDashboard') {
                const style = window.getComputedStyle(child);
                // Check if element is absolutely positioned at the bottom
                if (style.position === 'absolute' && style.bottom === '0px') {
                    const height = child.offsetHeight;
                    if (height > 0) {
                        bottomOffset += height;
                        // Watch this element for size changes
                        if (typeof ResizeObserver !== 'undefined' && !child.hasAttribute('data-cookiebot-watched')) {
                            child.setAttribute('data-cookiebot-watched', 'true');
                            if (!this.resizeObserver) {
                                this.resizeObserver = new ResizeObserver(() => {
                                    this.positionDashboard();
                                });
                            }
                            this.resizeObserver.observe(child);
                        }
                    }
                }
            }
        }
        // Apply positioning without wiping other styles
        dashboard.style.position = 'absolute';
        dashboard.style.bottom = `${bottomOffset}px`;
        dashboard.style.left = '0';
        dashboard.style.right = '0';
        dashboard.style.background = 'rgba(0, 0, 0, 0.9)';
        dashboard.style.borderTop = '2px solid #6f6';
        dashboard.style.zIndex = '10000';
        // Check visibility config
        const isHidden = this.configManager.getConfig().ShowDashboard === 0;
        let dashboardHeight = 0;
        if (!isHidden) {
            // Temporarily ensure dashboard is visible to measure height accurately
            const wasHidden = dashboard.style.display === 'none';
            if (wasHidden) {
                dashboard.style.display = 'block';
            }
            // Force reflow to ensure accurate measurement
            void dashboard.offsetHeight;
            // Get dashboard height (includes header + content if expanded, or just header if collapsed)
            dashboardHeight = dashboard.offsetHeight;
        }
        else {
            dashboard.style.display = 'none';
        }
        // Update #game div's bottom to account for all bottom bars including ours
        const game = document.getElementById('game');
        if (game) {
            const totalBottomHeight = bottomOffset + dashboardHeight;
            game.style.bottom = `${totalBottomHeight}px`;
        }
    }
    /**
     * Toggle dashboard collapse/expand
     */
    toggleDashboard() {
        const content = document.getElementById('dashboardContent');
        const miniModules = document.getElementById('dashMiniModules');
        const toggle = document.getElementById('dashboardToggle');
        this.dashboardCollapsed = !this.dashboardCollapsed;
        if (this.dashboardCollapsed) {
            if (content)
                content.style.display = 'none';
            if (miniModules)
                miniModules.style.display = 'flex';
            if (toggle)
                toggle.textContent = '▲ Expand';
        }
        else {
            if (content)
                content.style.display = 'flex';
            if (miniModules)
                miniModules.style.display = 'none';
            if (toggle)
                toggle.textContent = '▼ Collapse';
        }
        // Reposition to account for height change
        setTimeout(() => {
            this.positionDashboard();
        }, 0);
    }
    /**
     * Update dashboard content
     */
    updateDashboard() {
        if (!document.getElementById('cookieBotDashboard')) {
            return;
        }
        try {
            // Check if context is available
            if (!this.context) {
                return;
            }
            this.updateNextUpdateTimer();
            this.updateModuleColumns();
            this.updateActivity();
        }
        catch (e) {
            console.error('Dashboard update error:', e);
        }
    }
    /**
     * Update the "next update" timer in the header
     */
    updateNextUpdateTimer() {
        const timerElement = document.getElementById('dashboardNextUpdate');
        if (!timerElement)
            return;
        try {
            let text = '';
            let color = '#9cf';
            // Check if AutoPlay has a deadline
            if (this.context && this.context.deadline) {
                const now = Date.now();
                const timeUntilUpdate = this.context.deadline - now;
                if (timeUntilUpdate > 0) {
                    text = `Next update: ${this.formatTimeRemaining(timeUntilUpdate)}`;
                }
                else {
                    text = 'Next update: now';
                    color = '#6f6';
                }
            }
            else {
                text = 'Next update: continuous';
            }
            // Add tick stats if available
            if (this.context && typeof this.context.lastTickDuration === 'number') {
                const last = this.context.lastTickDuration.toFixed(1);
                const avg = this.context.avgTickDuration.toFixed(1);
                text += ` | Tick: ${last}ms (Avg: ${avg}ms)`;
            }
            timerElement.textContent = text;
            timerElement.style.color = color;
        }
        catch (e) {
            timerElement.textContent = 'Next update: unknown';
            timerElement.style.color = '#888';
        }
    }
    /**
     * Helper to create a progress bar HTML
     */
    createProgressBar(percent, color = '#6f6') {
        const clampedPercent = Math.min(100, Math.max(0, percent));
        return `<div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-top: 4px;">
      <div style="width: ${clampedPercent}%; height: 100%; background: ${color}; transition: width 0.3s;"></div>
    </div>`;
    }
    /**
     * Helper to format time remaining
     */
    formatTimeRemaining(ms) {
        if (ms < 0)
            return 'Ready';
        const seconds = Math.floor(ms / 1000);
        if (seconds < 60)
            return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60)
            return `${minutes}m ${seconds % 60}s`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h ${minutes % 60}m`;
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }
    /**
     * Update both module columns (active and waiting/idle)
     */
    updateModuleColumns() {
        // Safety check for context
        if (!this.context) {
            const modulesContent = document.getElementById('dashModulesContent');
            if (modulesContent)
                modulesContent.innerHTML = '<div style="color: #f66; grid-column: 1 / -1;">AutoPlay not initialized...</div>';
            return;
        }
        try {
            // Collect statuses from all managers
            const statuses = {};
            // Get status from click manager
            if (this.context.clickManager && typeof this.context.clickManager.getStatus === 'function') {
                statuses.clicking = this.context.clickManager.getStatus();
            }
            // Get statuses from purchase manager (buildings and upgrades separately)
            if (this.context.purchaseManager) {
                if (typeof this.context.purchaseManager.getBuildingStatus === 'function') {
                    statuses.buildings = this.context.purchaseManager.getBuildingStatus();
                }
                if (typeof this.context.purchaseManager.getUpgradeStatus === 'function') {
                    statuses.upgrades = this.context.purchaseManager.getUpgradeStatus();
                }
            }
            if (this.context.gardenManager && typeof this.context.gardenManager.getStatus === 'function') {
                statuses.garden = this.context.gardenManager.getStatus();
            }
            if (this.context.wrinklerManager && typeof this.context.wrinklerManager.getStatus === 'function') {
                statuses.wrinklers = this.context.wrinklerManager.getStatus();
            }
            if (this.context.goldenCookieHandler && typeof this.context.goldenCookieHandler.getStatus === 'function') {
                statuses.goldenCookies = this.context.goldenCookieHandler.getStatus();
            }
            if (this.context.dragonManager && typeof this.context.dragonManager.getStatus === 'function') {
                statuses.dragon = this.context.dragonManager.getStatus();
            }
            if (this.context.pantheonManager && typeof this.context.pantheonManager.getStatus === 'function') {
                statuses.pantheon = this.context.pantheonManager.getStatus();
            }
            if (this.context.grimoireManager && typeof this.context.grimoireManager.getStatus === 'function') {
                statuses.grimoire = this.context.grimoireManager.getStatus();
            }
            if (this.context.stockMarketManager && typeof this.context.stockMarketManager.getStatus === 'function') {
                statuses.stockMarket = this.context.stockMarketManager.getStatus();
            }
            if (this.context.sugarLumpManager && typeof this.context.sugarLumpManager.getStatus === 'function') {
                statuses.sugarLumps = this.context.sugarLumpManager.getStatus();
            }
            if (this.context.ascensionManager && typeof this.context.ascensionManager.getStatus === 'function') {
                statuses.ascension = this.context.ascensionManager.getStatus();
            }
            if (this.context.seasonHandler && typeof this.context.seasonHandler.getStatus === 'function') {
                statuses.season = this.context.seasonHandler.getStatus();
            }
            if (this.context.achievementHandler && typeof this.context.achievementHandler.getStatus === 'function') {
                statuses.achievements = this.context.achievementHandler.getStatus();
            }
            if (this.context.savingsManager && typeof this.context.savingsManager.getStatus === 'function') {
                statuses.savings = this.context.savingsManager.getStatus();
            }
            if (this.context.nightMode && typeof this.context.nightMode.getStatus === 'function') {
                statuses.nightMode = this.context.nightMode.getStatus();
            }
            // Render module statuses
            const moduleOrder = [
                'buildings',
                'upgrades',
                'achievements',
                'ascension',
                'savings',
                'clicking',
                'goldenCookies',
                'wrinklers',
                'season',
                'garden',
                'dragon',
                'pantheon',
                'grimoire',
                'stockMarket',
                'sugarLumps',
                'nightMode'
            ];
            // Map status to colors
            const statusColors = {
                'idle': '#888',
                'active': '#6f6',
                'waiting': '#fc6',
                'blocked': '#f66',
                'disabled': '#666',
                'error': '#f00'
            };
            // Collect all modules in persistent order
            const allModules = [];
            for (const key of moduleOrder) {
                const status = statuses[key];
                if (!status)
                    continue;
                allModules.push({ key, status });
            }
            // Helper function to render a module card
            const renderModuleCard = (key, status) => {
                const escapeHtml = (str) => {
                    if (typeof str !== 'string')
                        return String(str);
                    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
                };
                const color = statusColors[status.status] || '#ccc';
                const icon = status.icon || '📦';
                // Get timing
                const timingKeyMap = {
                    'clicking': 'ClickManager',
                    'buildings': 'PurchaseManager',
                    'upgrades': 'PurchaseManager',
                    'garden': 'GardenManager',
                    'wrinklers': 'WrinklerManager',
                    'goldenCookies': 'GoldenCookieHandler',
                    'dragon': 'DragonManager',
                    'pantheon': 'PantheonManager',
                    'grimoire': 'GrimoireManager',
                    'stockMarket': 'StockMarketManager',
                    'sugarLumps': 'SugarLumpManager',
                    'savings': 'SavingsManager',
                    'ascension': 'AscensionManager',
                    'season': 'SeasonHandler',
                    'achievements': 'AchievementHandler'
                };
                const timingKey = timingKeyMap[key];
                const timing = (this.context.moduleTimings && timingKey) ? this.context.moduleTimings[timingKey] : 0;
                const timingDisplay = timing > 0 ? `<span style="color: #666; font-size: 9px; margin-left: 4px;">(${timing.toFixed(2)}ms)</span>` : '';
                let cardHtml = '<div style="padding: 8px; background: rgba(255,255,255,0.03); border-left: 3px solid ' + color + '; border-radius: 4px;">';
                cardHtml += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">';
                cardHtml += '<div><span style="color: ' + color + '; font-weight: bold; font-size: 11px;">' + icon + ' ' + escapeHtml(status.module) + '</span>' + timingDisplay + '</div>';
                cardHtml += '<span style="color: ' + color + '; font-size: 9px; text-transform: uppercase; opacity: 0.8;">' + escapeHtml(status.status) + '</span>';
                cardHtml += '</div>';
                cardHtml += '<div style="color: #ccc; font-size: 10px; margin-bottom: 2px;">' + escapeHtml(status.currentAction) + '</div>';
                cardHtml += '<div style="color: #888; font-size: 9px; margin-bottom: 4px;">' + escapeHtml(status.reason) + '</div>';
                if (status.nextAction) {
                    cardHtml += '<div style="color: #9cf; font-size: 9px; margin-top: 4px;">→ ' + escapeHtml(status.nextAction) + '</div>';
                }
                // Add standardized progress bar and time remaining
                if (status.progress) {
                    cardHtml += '<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 9px;">';
                    const progressColor = status.progressColor || '#6f6';
                    const label = status.progress.label || 'Progress';
                    // Show progress with formatted values
                    if (typeof Beautify !== 'undefined') {
                        cardHtml += '<div style="color: #aaa; margin-top: 2px;">' + label + ': ' + Beautify(status.progress.current) + ' / ' + Beautify(status.progress.target) + '</div>';
                    }
                    else {
                        cardHtml += '<div style="color: #aaa; margin-top: 2px;">' + label + ': ' + status.progress.percent.toFixed(1) + '%</div>';
                    }
                    // Progress bar
                    cardHtml += this.createProgressBar(status.progress.percent, progressColor);
                    // Time remaining
                    if (status.timeRemaining) {
                        cardHtml += '<div style="color: #fc6; font-size: 9px; margin-top: 2px;">⏱ ' + this.formatTimeRemaining(status.timeRemaining) + '</div>';
                    }
                    cardHtml += '</div>';
                }
                // Show additional details
                if (status.details && Object.keys(status.details).length > 0) {
                    cardHtml += '<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 9px;">';
                    for (const [key, value] of Object.entries(status.details)) {
                        if (key !== 'Price' && key !== 'Available') {
                            cardHtml += '<div style="color: #888; margin-top: 1px;"><span style="color: #aaa;">' + escapeHtml(key) + ':</span> <span style="color: #ccc;">' + escapeHtml(String(value)) + '</span></div>';
                        }
                    }
                    cardHtml += '</div>';
                }
                cardHtml += '</div>';
                return cardHtml;
            };
            // Render all modules into a single grid
            let modulesHtml = '';
            for (const { key, status } of allModules) {
                modulesHtml += renderModuleCard(key, status);
            }
            if (modulesHtml === '') {
                modulesHtml = '<div style="color: #888; grid-column: 1 / -1;">No modules active</div>';
            }
            // Update grid
            const modulesContent = document.getElementById('dashModulesContent');
            if (modulesContent) {
                modulesContent.innerHTML = modulesHtml;
            }
            // Update mini modules (collapsed view)
            const miniModulesContainer = document.getElementById('dashMiniModules');
            if (miniModulesContainer) {
                // STRICT FILTER: Only show modules that are actively doing something
                // Status must be 'active' or 'waiting' (waiting usually means saving up for something)
                let interestingModules = allModules.filter(m => {
                    const s = m.status.status;
                    if (s !== 'active' && s !== 'waiting')
                        return false;
                    // Double check for "No ..." messages which might have slipped through with a wrong status
                    const info = m.status.nextAction || m.status.currentAction || '';
                    if (info.match(/^No (upgrades|buildings)/i))
                        return false;
                    return true;
                });
                // If we have both buildings and upgrades, try to determine which is the "real" target
                const hasBuilding = interestingModules.find(m => m.key === 'buildings');
                const hasUpgrade = interestingModules.find(m => m.key === 'upgrades');
                if (hasBuilding && hasUpgrade) {
                    const bIndex = interestingModules.findIndex(m => m.key === 'buildings');
                    const uIndex = interestingModules.findIndex(m => m.key === 'upgrades');
                    if (bIndex !== -1 && uIndex !== -1) {
                        const b = interestingModules[bIndex];
                        const u = interestingModules[uIndex];
                        // If one is active and the other is waiting, prioritize active
                        if (b.status.status === 'active' && u.status.status !== 'active') {
                            interestingModules.splice(uIndex, 1);
                        }
                        else if (u.status.status === 'active' && b.status.status !== 'active') {
                            interestingModules.splice(bIndex, 1);
                        }
                        else {
                            // If both are same status (e.g. both waiting), remove upgrades to save space
                            // (Assuming buildings is the primary goal or they are redundant)
                            interestingModules.splice(uIndex, 1);
                        }
                    }
                }
                // Take first 4 modules
                interestingModules = interestingModules.slice(0, 4);
                if (interestingModules.length === 0) {
                    miniModulesContainer.innerHTML = '<span style="color: #888; font-size: 10px;">Idle</span>';
                }
                else {
                    let miniHtml = '';
                    for (const { key, status } of interestingModules) {
                        const color = statusColors[status.status] || '#ccc';
                        const icon = status.icon || '';
                        // Determine target info (what it's working towards)
                        let infoText = status.nextAction || status.currentAction || '';
                        // Clean up common prefixes to save space
                        infoText = infoText.replace(/^(Working on:?|Buying|Upgrading|Waiting for|Saving for)\s+/i, '');
                        // Time remaining
                        let timeStr = '';
                        if (status.timeRemaining && status.timeRemaining > 0) {
                            timeStr = this.formatTimeRemaining(status.timeRemaining);
                        }
                        // Progress percent
                        let percent = 0;
                        if (status.progress) {
                            percent = Math.max(0, Math.min(100, status.progress.percent));
                        }
                        // Create module card with progress bar background
                        miniHtml += `<div style="position: relative; display: flex; align-items: center; gap: 6px; font-size: 10px; padding: 3px 8px; border-radius: 4px; background: rgba(255,255,255,0.05); overflow: hidden; min-width: 120px; border: 1px solid rgba(255,255,255,0.1);">`;
                        // Progress bar overlay
                        if (percent > 0) {
                            miniHtml += `<div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${percent}%; background: ${color}; opacity: 0.2; pointer-events: none;"></div>`;
                        }
                        // Content based on type
                        if (key === 'buildings' || key === 'upgrades') {
                            // Show Target Name + Time
                            if (infoText.length > 15)
                                infoText = infoText.substring(0, 14) + '…';
                            miniHtml += `<span style="position: relative; color: ${color}; font-weight: bold;">${infoText}</span>`;
                            if (timeStr) {
                                miniHtml += `<span style="position: relative; color: #fc6; margin-left: auto; font-family: monospace;">${timeStr}</span>`;
                            }
                            else if (percent > 0) {
                                miniHtml += `<span style="position: relative; color: #aaa; margin-left: auto; font-family: monospace;">${Math.round(percent)}%</span>`;
                            }
                        }
                        else {
                            // Achievements/Ascension: Icon + Name (short)
                            miniHtml += `<span style="position: relative; color: ${color}; font-size: 12px;">${icon}</span>`;
                            if (infoText && infoText !== 'Idle' && infoText !== 'Active') {
                                if (infoText.length > 12)
                                    infoText = infoText.substring(0, 11) + '…';
                                miniHtml += `<span style="position: relative; color: #ccc;">${infoText}</span>`;
                            }
                            // Show percent for these if available
                            if (percent > 0) {
                                miniHtml += `<span style="position: relative; color: #aaa; margin-left: auto; font-family: monospace;">${Math.round(percent)}%</span>`;
                            }
                        }
                        miniHtml += `</div>`;
                    }
                    miniModulesContainer.innerHTML = miniHtml;
                }
            }
        }
        catch (e) {
            console.error('Module status error:', e);
            const modulesContent = document.getElementById('dashModulesContent');
            if (modulesContent)
                modulesContent.innerHTML = '<div style="color: #f66; grid-column: 1 / -1;">Error loading module statuses</div>';
        }
    }
    /**
     * Update activity section
     */
    updateActivity() {
        let activityHtml = '';
        const combinedActivity = [];
        // Add status entries
        if (this.statusHistory && this.statusHistory.length > 0) {
            this.statusHistory.forEach((entry) => {
                const baseType = entry.type.split(':')[0];
                let color = '#ccc';
                let icon = '📊';
                let tooltip = '';
                if (baseType === 'goal') {
                    color = '#fc6';
                    icon = '🎯';
                    tooltip = "Bot's current goal or target (e.g., achievement, ascension, or upgrade milestone)";
                }
                else if (baseType === 'reserve') {
                    color = '#f96';
                    icon = '🍪';
                    tooltip = 'Golden cookie reserve status - the bot keeps cookies saved for Lucky/Lucky Frenzy bonuses';
                }
                else if (baseType === 'achievement') {
                    color = '#f66';
                    icon = '🏆';
                    tooltip = 'Achievement-related status update';
                }
                else if (baseType === 'mode') {
                    color = '#6f6';
                    icon = '⚙️';
                    tooltip = 'Bot mode or behavior change';
                }
                else if (baseType === 'ascend') {
                    color = '#f6f';
                    icon = '⬆️';
                    tooltip = 'Ascension-related status update';
                }
                else if (baseType === 'dragon') {
                    color = '#c9f';
                    icon = '🐉';
                    tooltip = 'Dragon aura change or update';
                }
                else if (baseType === 'wrinkler') {
                    color = '#a8a';
                    icon = '🪱';
                    tooltip = 'Wrinkler management status';
                }
                combinedActivity.push({
                    time: entry.time,
                    type: 'status',
                    color,
                    icon,
                    tooltip,
                    message: entry.message,
                    details: entry.details
                });
            });
        }
        // Add action entries
        if (this.actionHistory && this.actionHistory.length > 0) {
            this.actionHistory.forEach((entry) => {
                let color = '#ccc';
                let icon = '⚡';
                if (entry.action.includes('Bought') || entry.action.includes('Upgraded')) {
                    color = '#6f6';
                    icon = '🛒';
                }
                if (entry.action.includes('Clicked')) {
                    color = '#fc6';
                    icon = '👆';
                }
                if (entry.action.includes('Ascend') || entry.action.includes('Achievement')) {
                    color = '#f66';
                    icon = '🏆';
                }
                combinedActivity.push({
                    time: entry.time,
                    type: 'action',
                    color,
                    icon,
                    tooltip: 'Action performed by the bot',
                    message: entry.action,
                    details: entry.details
                });
            });
        }
        // Sort by time (newest first)
        combinedActivity.sort((a, b) => b.time.getTime() - a.time.getTime());
        // Generate HTML
        if (combinedActivity.length > 0) {
            combinedActivity.forEach((entry) => {
                const timeStr = entry.time.toLocaleTimeString();
                activityHtml += `<div style="margin-bottom: 4px; padding: 4px; background: rgba(255,255,255,0.05); border-left: 2px solid ${entry.color};" title="${entry.tooltip}"><span style="color: #888; font-size: 9px;">${timeStr}</span> <span style="color: ${entry.color};">${entry.icon} ${entry.message}</span>${entry.details ? ` <span style="color: #aaa; font-size: 10px;"> - ${entry.details}</span>` : ''}</div>`;
            });
        }
        else {
            activityHtml = '<div style="color: #888;">No activity yet...</div>';
        }
        const activityContent = document.getElementById('dashActivityContent');
        if (activityContent) {
            activityContent.innerHTML = activityHtml;
        }
    }
    /**
     * Log an action to the activity history
     */
    logAction(action, details) {
        try {
            const timestamp = new Date();
            const entry = {
                time: timestamp,
                action,
                details: details || ''
            };
            this.actionHistory.unshift(entry); // Add to beginning
            if (this.actionHistory.length > this.maxHistorySize) {
                this.actionHistory.pop(); // Remove oldest
            }
            // Log to console if enabled
            if (this.configManager.getConfig().ConsoleLog) {
                console.log(`[Action] ${action} ${details ? `(${details})` : ''}`);
            }
            this.updateDashboard(); // Refresh display
        }
        catch (e) {
            console.log('Log action error:', e);
        }
    }
    /**
     * Log a status update to the status history
     */
    logStatus(statusType, message, details) {
        try {
            // Only log if status changed
            const statusKey = `${statusType}:${message}`;
            if (this.lastStatus[statusType] === statusKey)
                return;
            this.lastStatus[statusType] = statusKey;
            const timestamp = new Date();
            const entry = {
                time: timestamp,
                type: statusType,
                message,
                details: details || ''
            };
            this.statusHistory.unshift(entry); // Add to beginning
            if (this.statusHistory.length > this.maxHistorySize) {
                this.statusHistory.pop(); // Remove oldest
            }
            // Log to console if enabled
            if (this.configManager.getConfig().ConsoleLog) {
                console.log(`[Status] [${statusType}] ${message} ${details ? `(${details})` : ''}`);
            }
            this.updateDashboard(); // Refresh display
        }
        catch (e) {
            console.log('Log status error:', e);
        }
    }
    /**
     * Render/update the dashboard
     */
    render() {
        // Throttle rendering to avoid DOM thrashing
        const now = Date.now();
        if (now - this.lastRenderTime < this.renderInterval) {
            return;
        }
        this.lastRenderTime = now;
        // Check if dashboard exists, create if not
        if (!document.getElementById('cookieBotDashboard')) {
            this.createDashboard();
        }
        this.updateDashboard();
    }
    /**
     * Toggle dashboard visibility
     */
    toggle() {
        this.toggleDashboard();
    }
}

;// ./src/modules/ConfigManager.ts
class ConfigManager {
    constructor(context) {
        // Configuration system
        this.config = {};
        this.configData = {};
        this.configDefault = {};
        this.configPrefix = 'autoplayConfig';
        this.loadedConfig = {};
        this.optionsByCategory = {
            'General': [],
            'Cheating': [],
            'Display': [],
            'Logging': []
        };
        // Display utilities
        this.colorTextPre = 'color: ';
        this.colorBlue = '#4169E1';
        // Callbacks
        this.onDashboardToggle = null;
        this.context = context;
        this.loadRawConfig();
    }
    /**
     * Get the current config object
     */
    getConfig() {
        return this.config;
    }
    /**
     * Load raw configuration from localStorage
     */
    loadRawConfig() {
        try {
            const stored = window.localStorage.getItem(this.configPrefix);
            if (stored != null) {
                this.loadedConfig = JSON.parse(stored);
            }
        }
        catch (e) {
            console.error('Failed to load config:', e);
        }
    }
    /**
     * Register a configuration option
     */
    registerOption(key, option, defaultValue, category = 'General') {
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
        }
        else if (Array.isArray(option.label)) {
            maxVal = option.label.length;
        }
        // Apply value from loaded config or default
        if (typeof this.loadedConfig[key] !== 'undefined') {
            // Validate range
            if (this.loadedConfig[key] >= 0 && this.loadedConfig[key] < maxVal) {
                this.config[key] = this.loadedConfig[key];
            }
            else {
                this.config[key] = defaultValue;
            }
        }
        else {
            this.config[key] = defaultValue;
        }
    }
    /**
     * Save configuration to localStorage
     */
    saveConfig(config) {
        try {
            window.localStorage.setItem(this.configPrefix, JSON.stringify(config));
        }
        catch (e) {
            console.error('Failed to save config:', e);
        }
    }
    /**
     * Toggle a configuration option
     */
    toggleConfig(configKey) {
        this.toggleConfigUp(configKey);
        const element = document.getElementById(this.configPrefix + configKey);
        if (element) {
            element.className = this.config[configKey] ? 'option' : 'option off';
        }
    }
    /**
     * Increment a configuration option
     */
    toggleConfigUp(configKey) {
        const option = this.configData[configKey];
        let maxVal = 0;
        if (option.options) {
            maxVal = option.options.length;
        }
        else if (Array.isArray(option.label)) {
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
    getConfigDisplay(configKey) {
        const option = this.configData[configKey];
        const value = this.config[configKey];
        if (option.options && option.options[value]) {
            return option.options[value].label;
        }
        else if (Array.isArray(option.label) && option.label[value]) {
            return option.label[value];
        }
        return 'Unknown';
    }
    /**
     * Add menu preferences to the game menu
     */
    addMenuPref() {
        const header = (text) => {
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
        const listing = (configKey, clickFunc) => {
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
                    let handler;
                    if (key === 'BotMode')
                        handler = () => this.setBotMode();
                    else if (key === 'ShowDashboard')
                        handler = () => this.toggleDashboardConfig();
                    else if (key === 'CleanLog')
                        handler = () => this.cleanLog();
                    else if (key === 'ShowLog')
                        handler = () => this.showLog();
                    frag.appendChild(listing(key, handler));
                }
            }
        }
        const menu = document.getElementById('menu');
        if (menu && menu.childNodes[2]) {
            const menuSection = menu.childNodes[2];
            const lastChild = menuSection.childNodes[menuSection.childNodes.length - 1];
            menuSection.insertBefore(frag, lastChild);
        }
    }
    /**
     * Set bot mode handler
     */
    setBotMode() {
        this.toggleConfig('BotMode');
        const modeName = this.configData.BotMode.label[this.config.BotMode];
        if (this.context && this.context.info) {
            this.context.info(`The bot has changed mode to ${modeName}`);
            this.context.logStatus('mode', `Mode: ${modeName}`);
        }
    }
    /**
     * Toggle dashboard visibility via config
     */
    toggleDashboardConfig() {
        this.toggleConfig('ShowDashboard');
        const dashboard = document.getElementById('cookieBotDashboard');
        if (dashboard) {
            dashboard.style.display = this.config.ShowDashboard ? 'block' : 'none';
            if (this.onDashboardToggle) {
                this.onDashboardToggle();
            }
        }
    }
    /**
     * Clean the log
     */
    cleanLog() {
        try {
            window.localStorage.setItem('autoplayLog', '');
        }
        catch (e) {
            console.error('Failed to clean log:', e);
        }
    }
    /**
     * Show the log
     */
    showLog() {
        let theLog = '';
        try {
            theLog = window.localStorage.getItem('autoplayLog') || '';
        }
        catch (e) {
            theLog = '';
        }
        if (typeof Game !== 'undefined' && Game.Prompt) {
            Game.Prompt('<h3>Cookie Bot Log</h3><div class="block">' +
                'This is the log of the bot with saves at important stages.<br>' +
                'Copy it and use it as you like.</div>' +
                '<div class="block"><textarea id="textareaPrompt" ' +
                'style="width:100%;height:128px;" readonly>' +
                theLog + '</textarea></div>', ['All done!']);
        }
    }
}

;// ./src/modules/NightMode.ts
/**
 * Handles night mode behavior - reduces bot activity during nighttime hours
 * Night mode makes the bot "sleep" between 11pm-7am to simulate human-like behavior
 *
 * Original logic from cookieAutoPlayBeta.js:
 * - Mode 0: OFF (never sleep)
 * - Mode 1: AUTO (sleep unless grinding)
 * - Mode 2: ON (always sleep during night)
 *
 * Night hours: 11pm (23:00) to 7am (07:00)
 * Active hours: 7am to 11pm
 */

class NightMode {
    /**
     * Constructor - expects context object
     * @param context AutoPlayContext for accessing game state
     */
    constructor(context) {
        this.isNight = false;
        this.context = context;
        // Register configuration options
        this.context.configManager.registerOption('NightMode', {
            id: 'NightMode',
            type: 'select',
            label: 'Night Mode',
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'AUTO (Sleep unless grinding)' },
                { value: 2, label: 'ON (Always sleep at night)' }
            ],
            default: 1,
            desc: 'Controls bot behavior during night hours (11pm-7am).'
        }, 1, 'General');
    }
    /**
     * Get current night mode (from live config)
     */
    getNightMode() {
        return this.context.Config.NightMode || 0;
    }
    /**
     * Log activity message
     */
    logActivity(msg) {
        this.context.addActivity(msg);
    }
    /**
     * Check if it's currently nighttime (after 10pm)
     * Used for pre-night preparation activities
     */
    isPreNightMode() {
        // Read mode from Config (numeric: 0=OFF, 1=AUTO)
        const mode = this.getNightMode();
        // Only prepare for night if mode is not OFF
        if (mode === 0)
            return false;
        const hour = new Date().getHours();
        return hour >= 22;
    }
    /**
     * Main night mode logic - determines if bot should be active or sleeping
     * Mirrors original AutoPlay.nightMode() function
     * @returns true if bot should sleep, false if bot should be active
     */
    checkNightMode() {
        // Don't sleep if on ascension screen
        if (Game.OnAscend)
            return false;
        // Read mode from Config (numeric: 0=OFF, 1=AUTO)
        const mode = this.getNightMode();
        // Mode 0: OFF - never sleep
        if (mode === 0)
            return false;
        // Mode 1: AUTO - don't sleep while grinding for final achievements
        if (mode === 1 && this.context.grinding()) {
            return false;
        }
        // Mode 2: ON - always sleep during night hours (no grinding check)
        const hour = new Date().getHours();
        // Active hours: 7am to 11pm
        if (hour >= 7 && hour < 23) {
            if (this.isNight) {
                // Waking up - use any accumulated sugar lumps
                this.onWakeUp();
            }
            this.isNight = false;
            this.deactivateNightFeatures();
            return false;
        }
        // Night hours: 11pm to 7am
        if (this.isNight) {
            // Already sleeping
            this.logActivity('The bot is sleeping.');
            return true;
        }
        // Prepare for night
        this.prepareForNight(hour);
        this.isNight = true;
        return true;
    }
    /**
     * Prepare bot for nighttime - activate night features
     */
    prepareForNight(hour) {
        this.logActivity('Preparing for the night.');
        this.context.freezeGarden(true);
        // Handle stock market night trading
        this.context.handleNightTrading();
        // Handle Golden Switch
        const goldenSwitchOff = Game.UpgradesById[UPGRADE_IDS.GOLDEN_SWITCH_OFF];
        if (goldenSwitchOff && goldenSwitchOff.unlocked) {
            // Click any golden cookies before buying Golden Switch
            this.context.handleGoldenCookies();
            this.logActivity('Waiting for good time to buy Golden switch.');
            // Check for good time to buy golden switch
            // Wait if CPS multiplier is high or it's still early
            const cpsMult = this.getCurrentCpsMultiplier();
            if (cpsMult < 0.8 || hour < 7) {
                // Buy Shimmering veil if available
                const shimmeringVeilOff = Game.UpgradesById[UPGRADE_IDS.SHIMMERING_VEIL_OFF];
                if (shimmeringVeilOff &&
                    shimmeringVeilOff.unlocked &&
                    shimmeringVeilOff.canBuy() &&
                    Game.UpgradesById[UPGRADE_IDS.REINFORCED_MEMBRANE].bought) {
                    shimmeringVeilOff.buy();
                }
                goldenSwitchOff.buy();
            }
            // Don't activate spirits before golden switch is bought
            if (!goldenSwitchOff.bought)
                return;
        }
        // Activate night spirits via PantheonManager
        this.context.activateNightSpirits();
    }
    /**
     * Wake up from night mode
     */
    onWakeUp() {
        // Use any accumulated sugar lumps
        this.context.handleSugarLumps();
    }
    /**
     * Deactivate night features when day starts
     */
    deactivateNightFeatures() {
        // Deactivate night spirits via PantheonManager
        this.context.deactivateNightSpirits();
        // Turn Golden Switch back on
        const goldenSwitchOn = Game.UpgradesById[UPGRADE_IDS.GOLDEN_SWITCH_ON];
        if (goldenSwitchOn && goldenSwitchOn.unlocked) {
            goldenSwitchOn.buy();
        }
        this.context.freezeGarden(false);
    }
    /**
     * Freeze/unfreeze garden during night
     * @deprecated Use context.freezeGarden instead
     */
    /*
    private activateNightAtGarden(activate: boolean): void {
      this.context.freezeGarden(activate);
    }
    */
    /**
     * Get current CPS multiplier from active buffs
     * Simplified version - would need full buff calculation from Game.buffs
     */
    getCurrentCpsMultiplier() {
        // Check active buffs for CPS modifiers
        const gameBuffs = Game.buffs;
        if (gameBuffs && typeof gameBuffs === 'object') {
            // This is simplified - real implementation would sum all CPS modifiers
            // For now, return a reasonable default
            let mult = 1.0;
            for (const buffName in gameBuffs) {
                const buff = gameBuffs[buffName];
                if (buff && buff.multCpS) {
                    mult *= buff.multCpS;
                }
            }
            return mult;
        }
        return 1.0;
    }
    /**
     * Check if currently sleeping
     */
    isCurrentlySleeping() {
        return this.isNight;
    }
    /**
     * Get status for dashboard display
     */
    getStatus() {
        const isEnabled = this.getNightMode() > 0;
        const isActive = this.isNight;
        if (!isEnabled) {
            return {
                module: 'Night Mode',
                status: 'disabled',
                currentAction: 'Disabled',
                reason: 'Night mode is turned off in settings',
                icon: '🌙',
                details: {
                    'Mode': 'OFF'
                }
            };
        }
        // Calculate night time range
        const nightStart = 1; // 1 AM
        const nightEnd = 7; // 7 AM
        const now = new Date();
        const currentHour = now.getHours();
        let timeUntilChange = 0;
        if (isActive) {
            // Currently night - calculate time until morning (7 AM)
            if (currentHour < nightEnd) {
                timeUntilChange = (nightEnd - currentHour) * 3600 * 1000;
            }
            else {
                // Past morning, so next morning
                timeUntilChange = (24 - currentHour + nightEnd) * 3600 * 1000;
            }
        }
        else {
            // Currently day - calculate time until night (1 AM)
            if (currentHour < nightStart) {
                timeUntilChange = (nightStart - currentHour) * 3600 * 1000;
            }
            else {
                // Past night start, so next night
                timeUntilChange = (24 - currentHour + nightStart) * 3600 * 1000;
            }
        }
        const status = {
            module: 'Night Mode',
            status: isActive ? 'active' : 'waiting',
            currentAction: isActive ? 'Sleeping' : 'Active',
            reason: isActive ? 'Resting during night hours (1 AM - 7 AM)' : 'Working during day hours',
            icon: isActive ? '😴' : '🌙',
            details: {
                'Mode': 'ON',
                'Status': isActive ? 'NIGHT' : 'DAY',
                'Hours': `${nightStart}:00 AM - ${nightEnd}:00 AM`
            },
            timeRemaining: timeUntilChange
        };
        return status;
    }
}

;// ./src/modules/PantheonManager.ts
/**
 * Manages Pantheon (Temple minigame) spirit assignments
 *
 * The Pantheon has 3 slots for spirits that provide various bonuses:
 * - Slot 0 (Diamond): Most powerful effects
 * - Slot 1 (Ruby): Medium effects
 * - Slot 2 (Jade): Weakest effects
 *
 * Strategy:
 * - Slot 0: Mother (CpS boost) normally, Order (lump ripening) near harvest, Scorn (wrinkler boost) when popping
 * - Slot 1: Decadence (buildings cheaper) during day, Asceticism (buildings/CpS -5%) at night
 * - Slot 2: Labor (buildings +5%) during day, Industry (buildings +10%) at night
 */

class PantheonManager {
    constructor(context) {
        this.context = context;
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     * Assigns optimal spirits based on current game state
     */
    handlePantheon() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE]))
            return;
        const age = this.context.now - Game.lumpT;
        // Slot 0 (Diamond) - Most important slot
        if (this.context.poppingWrinklers) {
            // Scorn: Wrinklers give +15% more cookies
            this.assignSpirit(0, 'scorn', 0);
        }
        else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !(this.context.Config.CheatLumps > 0)) {
            // Order: Sugar lumps ripen 1 hour sooner (use when < 61 min from harvest)
            this.assignSpirit(0, 'order', 0);
        }
        else if (this.context.preNightMode() &&
            Game.lumpOverripeAge - age < 9 * 60 * 60000 &&
            (new Date()).getMinutes() === 59 &&
            !(this.context.Config.CheatLumps > 0)) {
            // Order: Also use at 59 minutes before midnight if lump about to over-ripen
            this.assignSpirit(0, 'order', 0);
        }
        else {
            // Mother: +5% CpS (default - best general purpose)
            this.assignSpirit(0, 'mother', 0);
        }
        // Slot 1 (Ruby) - Decadence makes buildings cheaper
        this.assignSpirit(1, 'decadence', 0);
        // Slot 2 (Jade) - Labor makes buildings produce more
        this.assignSpirit(2, 'labor', 0);
    }
    /**
     * Activate night mode spirits
     * Called from NightMode.prepareForNight()
     */
    activateNightSpirits() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE]))
            return;
        // Remove day spirits
        this.removeSpirit(1, 'decadence');
        this.removeSpirit(2, 'labor');
        // Add night spirits (force=1 means use 1 swap if needed)
        this.assignSpirit(1, 'asceticism', 1); // Buildings/CpS -5% (saves money at night)
        this.assignSpirit(2, 'industry', 1); // Buildings +10% (better than Labor's +5%)
    }
    /**
     * Deactivate night mode spirits
     * Called from NightMode.deactivateNightFeatures()
     */
    deactivateNightSpirits() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE]))
            return;
        // Just remove asceticism, let main logic handle others
        this.removeSpirit(1, 'asceticism');
    }
    /**
     * Assign a spirit to a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit (e.g., 'mother', 'decadence')
     * @param force If 1, forces use of 1 swap. If 0, requires 3 swaps available.
     */
    assignSpirit(slot, godName, force) {
        const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;
        // Check if we have enough swaps (worship swaps recharge over time)
        if (pantheon.swaps + force < 3)
            return;
        // Check if spirit already in this slot
        if (pantheon.slot[slot] === pantheon.gods[godName].id)
            return;
        // Assign the spirit
        pantheon.slotHovered = slot;
        pantheon.dragging = pantheon.gods[godName];
        pantheon.dropGod();
    }
    /**
     * Remove a spirit from a pantheon slot
     * @param slot 0=Diamond, 1=Ruby, 2=Jade
     * @param godName Name of the spirit to remove
     */
    removeSpirit(slot, godName) {
        const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;
        // Check if this spirit is in the slot
        if (pantheon.slot[slot] !== pantheon.gods[godName].id)
            return;
        // Remove the spirit
        pantheon.slotHovered = -1;
        pantheon.dragging = pantheon.gods[godName];
        pantheon.dropGod();
    }
    /**
  
     * Get current pantheon manager status
     */
    getStatus() {
        // Check if pantheon is unlocked
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.TEMPLE])) {
            return {
                module: 'Pantheon',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Temple minigame unlocked (Level 1)',
                icon: '🏛️',
                details: {
                    'Temple Level': Game.ObjectsById[BUILDING_IDS.TEMPLE]?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        const pantheon = Game.ObjectsById[BUILDING_IDS.TEMPLE].minigame;
        const slot0 = pantheon.slot[0];
        const slot1 = pantheon.slot[1];
        const slot2 = pantheon.slot[2];
        // Get spirit names
        const getGodName = (id) => {
            if (id === -1)
                return 'Empty';
            for (const godName in pantheon.gods) {
                if (pantheon.gods[godName].id === id) {
                    return godName.charAt(0).toUpperCase() + godName.slice(1);
                }
            }
            return 'Unknown';
        };
        const spirit0 = getGodName(slot0);
        const spirit1 = getGodName(slot1);
        const spirit2 = getGodName(slot2);
        // Determine reason based on current setup
        const age = this.context.now - Game.lumpT;
        let reason = '';
        if (this.context.poppingWrinklers) {
            reason = 'Scorn for wrinkler bonus';
        }
        else if (Game.lumpRipeAge - age < 61 * 60 * 1000 && !(this.context.Config.CheatLumps > 0)) {
            reason = 'Order for faster lump ripening';
        }
        else {
            reason = 'Mother for CpS boost (default)';
        }
        // Check swap availability
        const swapsAvailable = pantheon.swaps;
        const needsSwaps = swapsAvailable < 3;
        return {
            module: 'Pantheon',
            status: needsSwaps ? 'waiting' : 'active',
            currentAction: needsSwaps ? 'Waiting for swaps' : 'Managing spirits',
            reason: reason,
            nextAction: needsSwaps ? `${swapsAvailable}/3 swaps available` : undefined,
            icon: '⛪',
            details: {
                'Diamond': spirit0,
                'Ruby': spirit1,
                'Jade': spirit2,
                'Swaps': swapsAvailable,
                'Strategy': this.context.poppingWrinklers ? 'Wrinkler boost' : 'Default'
            }
        };
    }
}

;// ./src/modules/GrimoireManager.ts
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

class GrimoireManager {
    constructor(context) {
        this.context = context;
    }
    /**
     * Main handler - called in high-activity phase (when hyperActive or deadline reached)
     * Casts grimoire spells when beneficial
     */
    handleGrimoires() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER]))
            return;
        const grimoire = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER].minigame;
        const wizardTower = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER];
        // Special case: Four-leaf cookie achievement
        // Try to get 4 golden cookies on screen at once
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.FOURLEAF_COOKIE].won &&
            wizardTower.amount > 500 &&
            Game.UpgradesById[UPGRADE_IDS.DISTILLED_ESSENCE_OF_REDOUBLED_LUCK].bought) {
            const handOfFate = grimoire.spells['hand of fate'];
            // Wait until we have 2 golden cookies, then cast to get a 3rd
            if (Game.shimmerTypes['golden'].n > 1 &&
                grimoire.magic >= grimoire.getSpellCost(handOfFate)) {
                grimoire.castSpell(handOfFate);
            }
            // If we have 3+ golden cookies and enough magic, sell towers to wait for achievement
            if (Game.shimmerTypes['golden'].n >= 3 &&
                grimoire.magic > 30 &&
                wizardTower.amount > 30) {
                wizardTower.sell(wizardTower.amount - grimoire.magic);
            }
            return; // Save magic for achievement attempt
        }
        // Try to get sugar lump from Hand of Fate backfire
        // Backfires at 95%+ magic have a chance to give a sugar lump
        const handOfFate = grimoire.spells['hand of fate'];
        if (Game.shimmerTypes['golden'].n &&
            grimoire.magic >= grimoire.getSpellCost(handOfFate) &&
            grimoire.magic / grimoire.magicM >= 0.95) {
            grimoire.castSpell(handOfFate);
        }
        // High CpS multiplier (>100x) - cast spells for maximum value
        if (this.context.cpsMult > 100) {
            // Cast Hand of Fate to get more golden cookies
            if (grimoire.magic >= grimoire.getSpellCost(handOfFate)) {
                grimoire.castSpell(handOfFate);
                return;
            }
            // Cast Conjure Baked Goods (normally not worth it, but ok during high multiplier)
            const conjureBakedGoods = grimoire.spells['conjure baked goods'];
            if (grimoire.magic >= grimoire.getSpellCost(conjureBakedGoods)) {
                grimoire.castSpell(conjureBakedGoods);
                return;
            }
            // Refill magic with sugar lump if we have plenty
            if (this.context.canUseLumps && Game.lumps > 100) {
                grimoire.lumpRefill.click();
            }
        }
    }
    /**
  
     * Get current grimoire manager status
     */
    getStatus() {
        // Check if grimoire is unlocked
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER])) {
            return {
                module: 'Grimoire',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Wizard Tower minigame unlocked (Level 1)',
                icon: '🧙',
                details: {
                    'Wizard Tower Level': Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER]?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        const grimoire = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER].minigame;
        const wizardTower = Game.ObjectsById[BUILDING_IDS.WIZARD_TOWER];
        const magicPercent = Math.floor((grimoire.magic / grimoire.magicM) * 100);
        // Check for Four-leaf cookie achievement attempt
        if (!Game.Achievements['Four-leaf cookie'].won &&
            wizardTower.amount > 500 &&
            Game.Upgrades['Distilled essence of redoubled luck'].bought) {
            const goldenCount = Game.shimmerTypes['golden']?.n || 0;
            return {
                module: 'Grimoire',
                status: goldenCount >= 2 ? 'active' : 'waiting',
                currentAction: 'Attempting Four-leaf cookie',
                reason: `Need 4 golden cookies (currently ${goldenCount})`,
                nextAction: goldenCount >= 2 ? 'Will cast Hand of Fate' : 'Waiting for more golden cookies',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'Golden Cookies': goldenCount,
                    'Target': 4,
                    'Wizard Towers': wizardTower.amount
                }
            };
        }
        // Check for backfire lump farming
        const handOfFate = grimoire.spells['hand of fate'];
        const hasGoldenCookie = Game.shimmerTypes['golden']?.n > 0;
        const canCastHand = grimoire.magic >= grimoire.getSpellCost(handOfFate);
        const highMagic = magicPercent >= 95;
        if (hasGoldenCookie && canCastHand && highMagic) {
            return {
                module: 'Grimoire',
                status: 'active',
                currentAction: 'Casting Hand of Fate',
                reason: 'Farming backfire sugar lumps (95%+ magic)',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
                    'Strategy': 'Backfire farming'
                }
            };
        }
        // Check for high CpS multiplier (>100x)
        if (this.context.cpsMult > 100) {
            return {
                module: 'Grimoire',
                status: canCastHand ? 'active' : 'waiting',
                currentAction: canCastHand ? 'Casting spells' : 'Waiting for magic',
                reason: `High CpS multiplier (${this.context.cpsMult.toFixed(0)}x)`,
                nextAction: canCastHand ? 'Casting Hand of Fate & Conjure Baked Goods' : 'Recharging magic',
                icon: '🔮',
                details: {
                    'Magic': `${magicPercent}%`,
                    'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
                    'Can Use Lumps': this.context.canUseLumps && Game.lumps > 100,
                    'Sugar Lumps': Game.lumps
                }
            };
        }
        // Idle - waiting for good conditions
        return {
            module: 'Grimoire',
            status: 'idle',
            currentAction: 'Waiting for good conditions',
            reason: 'Need high CpS multiplier (>100x) or backfire opportunity',
            nextAction: highMagic ? 'Ready for backfire attempt' : 'Recharging magic',
            icon: '🔮',
            details: {
                'Magic': `${magicPercent}%`,
                'CpS Multiplier': `${this.context.cpsMult.toFixed(1)}x`,
                'Threshold': '100x'
            }
        };
    }
}

;// ./src/modules/GardenManager.ts
/**
 * Manages Garden (Farm minigame) plant harvesting and planting
 *
 * The Garden is a complex minigame with 34 plants that must be unlocked through
 * mutations (planting parent plants next to each other). The bot systematically
 * unlocks all plants and harvests cookie-dropping plants.
 *
 * Strategy:
 * - Divide garden into 4 sectors (2x2 grid of 3x3 plots each)
 * - Plant parent plants to create mutations for new plants
 * - Harvest plants that drop cookies when CpS multiplier is high
 * - Sacrifice garden for "Seedless to nay" achievement when all plants unlocked
 * - Convert garden for sugar lumps when ready for endgame
 *
 * Original implementation: lines 1010-1499 in cookieAutoPlayBeta.js
 */

// Convert readonly arrays to regular arrays for runtime use
const HARVESTABLE_PLANTS_ARRAY = [...HARVESTABLE_PLANTS];
const GARDEN_UPGRADES = [...GARDEN_UPGRADE_IDS];
// @ts-ignore - Will be used when full planting logic is implemented
const _PLANT_DEPS = PLANT_DEPENDENCIES.map((dep) => [dep[0], dep[1], dep[2]]);
class GardenManager {
    constructor(context) {
        // State tracking
        this.plantList = [0, 0, 0, 0]; // Current plant goals for each sector
        this.plantPending = false; // Waiting for plant to mature
        this.harvestPlant = false; // Have harvestable plant waiting
        this.plantsMissing = true; // Still unlocked plants?
        this.plantCookies = false; // Harvest cookie-dropping plants?
        this.wantGardenSacrifice = false; // Want to sacrifice garden?
        this.context = context;
    }
    /**
     * Freeze or unfreeze the garden
     * @param freeze true to freeze, false to unfreeze
     */
    freezeGarden(freeze) {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.FARM]))
            return;
        const garden = Game.ObjectsById[BUILDING_IDS.FARM].minigame;
        // Toggle freeze if needed
        if (freeze !== garden.freeze) {
            const freezeButton = document.getElementById('gardenTool-2');
            if (freezeButton) {
                freezeButton.click();
            }
        }
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleGarden() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.FARM]))
            return;
        const garden = Game.ObjectsById[BUILDING_IDS.FARM].minigame;
        // Harvest mature plants and clean up
        this.harvesting(garden);
        // Plant seeds for mutations
        this.planting(garden);
        // Check if ready to sacrifice for "Seedless to nay" achievement (382)
        if (this.gardenSacrificeReady(garden)) {
            this.plantCookies = false;
            garden.askConvert();
            Game.ConfirmPrompt();
            this.plantList = [0, 0, 0, 0];
            return;
        }
        // Convert garden for sugar lumps when endgame and all plants unlocked
        if (!this.context.canUseLumps &&
            this.gardenReady(garden) &&
            !this.context.finished &&
            !this.harvestPlant &&
            !this.context.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
            this.plantCookies = false;
            garden.askConvert();
            Game.ConfirmPrompt();
            this.plantList = [0, 0, 0, 0];
        }
    }
    /**
     * Harvest mature and dying plants
     * Original: AutoPlay.harvesting (lines 1452-1484)
     */
    harvesting(garden) {
        this.cleaningGarden(garden);
        this.plantPending = false;
        this.harvestPlant = false;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                if (!garden.isTileUnlocked(x, y))
                    continue;
                const tile = garden.getTile(x, y);
                if (!tile[0])
                    continue; // Empty tile
                const plant = garden.plantsById[tile[0] - 1];
                // Harvest unlocked plants that are mature
                if (!plant.unlocked) {
                    this.plantPending = true;
                    this.logActivity(`${plant.name} is still growing, do not disturb!`);
                    if (tile[1] >= plant.mature) {
                        garden.harvest(x, y);
                    }
                }
                else if (HARVESTABLE_PLANTS_ARRAY.indexOf(plant.key) >= 0) {
                    // Harvestable plants that drop cookies
                    this.harvestPlant = true;
                    this.logActivity(`Waiting to harvest ${plant.name}.`);
                    if (garden.plantsUnlockedN === garden.plantsN && tile[1] >= plant.mature) {
                        // Harvest when CPS multiplier is high enough
                        if (this.context.cpsMult > 300) {
                            garden.harvest(x, y);
                        }
                    }
                }
                // Harvest cookie-dropping plants when mature
                if (this.plantCookies && tile[1] >= plant.mature) {
                    if (!this.plantsMissing || !garden.isTileUnlocked(x - (x % 3), y - (y % 3))) {
                        garden.harvest(x, y);
                    }
                }
                // Harvest plants that will die next tick (except immortal ones)
                if (plant.ageTick + plant.ageTickR + tile[1] >= 100) {
                    if (plant.name !== 'Elderwort' && plant.name !== 'Everdaisy') {
                        this.harvest(garden, x, y);
                    }
                }
            }
        }
    }
    /**
     * Determine which plant to grow for cookie production (after mutations complete)
     * Original: AutoPlay.seedCalendar (lines 1329-1393)
     */
    seedCalendar(garden, sector) {
        if (this.context.wantAscend || this.wantGardenSacrifice)
            return 'bakerWheat';
        if (sector === 0)
            this.plantsMissing = false;
        const doPrint = (sector === 0) || (sector !== 3 && Game.ObjectsById[BUILDING_IDS.FARM].level === sector + 6);
        // Priority order: Try to unlock cookie-dropping upgrades
        if (!Game.UpgradesById[UPGRADE_IDS.ICHOR_SYRUP].unlocked && garden.plants['ichorpuff']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Ichor syrup.');
            this.plantCookies = true;
            return 'ichorpuff';
        }
        if (!Game.UpgradesById[UPGRADE_IDS.GREEN_YEAST_DIGESTIVES].unlocked && garden.plants['greenRot']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Green yeast digestives.');
            this.plantCookies = true;
            return 'greenRot';
        }
        if (!Game.UpgradesById[UPGRADE_IDS.DUKETATER_COOKIES].unlocked && garden.plants['duketater']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Duketater cookies.');
            this.plantCookies = true;
            return 'duketater';
        }
        if (!Game.Upgrades['Elderwort biscuits'].unlocked && garden.plants['elderwort']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Elderwort cookies.');
            this.plantCookies = true;
            return 'elderwort';
        }
        if (!Game.Upgrades['Bakeberry cookies'].unlocked && garden.plants['bakeberry']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Bakeberry cookies.');
            this.plantCookies = true;
            return 'bakeberry';
        }
        if (!Game.Upgrades['Wheat slims'].unlocked && garden.plants['bakerWheat']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Wheat slims.');
            this.plantCookies = true;
            return 'bakerWheat';
        }
        if (!Game.Upgrades['Fern tea'].unlocked && garden.plants['drowsyfern']?.unlocked) {
            this.switchSoil(garden, sector, 'fertilizer');
            if (doPrint)
                this.logActivity('Trying to get Fern tea.');
            this.plantCookies = true;
            return 'drowsyfern';
        }
        // All cookie upgrades unlocked - use garden for CPS and sugar lumps
        this.plantCookies = false;
        this.switchSoil(garden, sector, this.plantPending ? 'fertilizer' : 'clay');
        if (this.context.poppingWrinklers && garden.plants['wrinklegill']?.unlocked) {
            return 'wrinklegill'; // faster wrinklers
        }
        // Use bakeberry if all lump achievements are done (1% CPS + harvest 30 mins)
        if (garden.plants['bakeberry']?.unlocked &&
            this.context.lumpRelatedAchievements.every((a) => Game.AchievementsById[a].won)) {
            return 'bakeberry';
        }
        // Whiskerbloom gives ~1.5% CPS
        if (garden.plants['whiskerbloom']?.unlocked)
            return 'whiskerbloom';
        return 'bakerWheat'; // fallback
    }
    /**
     * Check if plant is unlocked OR currently growing in garden
     * Original: AutoPlay.havePlant (lines 1110-1117)
     */
    havePlant(garden, plantKey) {
        // Safety check: ensure plantKey is valid and exists
        if (!plantKey || !garden.plants[plantKey])
            return false;
        if (garden.plants[plantKey].unlocked)
            return true;
        const plantID = garden.plants[plantKey].id + 1;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                if (garden.getTile(x, y)[0] === plantID)
                    return true;
            }
        }
        return false;
    }
    /**
     * Batch plant seeds with cost validation
     * Original: AutoPlay.plantSeeds (lines 1274-1327)
     */
    plantSeeds(garden, targets) {
        // Don't plant when CPS multiplier is too high (expensive)
        const grindingCheat = this.context.grindingCheat() ? 1 : 0;
        const cheatGolden = this.context.cheatGolden > 1 ? 1 : 0;
        if (this.context.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
            this.logActivity('Do not buy plants now - it is too expensive.');
            return;
        }
        // Calculate costs and determine what to plant
        let cost = 0;
        const toPlant = [];
        let keepSeed = null;
        for (const target of targets) {
            let seed = target[0];
            const whereX = target[1];
            const whereY = target[2];
            // Handle reordering when something is in the way
            if (keepSeed) {
                const swap = seed;
                seed = keepSeed;
                keepSeed = swap;
            }
            // Check if valid position and can plant
            if (!garden.isTileUnlocked(whereX, whereY))
                continue;
            if (!garden.canPlant(garden.plants[seed]))
                continue;
            // Check if position is already occupied
            const oldPlant = garden.getTile(whereX, whereY)[0];
            if (oldPlant !== 0) {
                // Slot is already planted - clear it if different plant
                if (garden.plantsById[oldPlant - 1].key !== seed) {
                    this.cleanSeed(garden, whereX, whereY);
                    keepSeed = seed;
                    continue; // Jump over filled slot
                }
            }
            else {
                // Empty slot - add to planting list
                cost += garden.plants[seed].cost;
                toPlant.push([seed, whereX, whereY]);
            }
        }
        // Cost is in minutes of current CPS
        cost *= 60 * Game.cookiesPs;
        if (cost > Game.cookies - this.context.savingsGoal)
            return;
        // Plant all seeds
        for (const target of toPlant) {
            const seed = target[0];
            const whereX = target[1];
            const whereY = target[2];
            garden.useTool(garden.plants[seed].id, whereX, whereY);
        }
    }
    /**
     * Get human-readable sector name
     * Original: AutoPlay.sectorText (lines 1103-1108)
     */
    sectorText(sector) {
        if (Game.Objects['Farm'].level > 4) {
            return (sector < 2 ? 'bottom' : 'top') + (sector % 2 ? ' left' : ' right');
        }
        else if (Game.Objects['Farm'].level === 4) {
            return sector % 2 ? 'left' : 'right';
        }
        else {
            return 'middle';
        }
    }
    /**
     * Plant seeds to unlock new plants through mutations
     * Original: AutoPlay.planting (lines 1159-1220)
     */
    planting(garden) {
        // Wait for meddleweed (first plant that spawns randomly)
        if (!garden.plants['meddleweed']?.unlocked) {
            this.plantList = [0, 0, 0, 0];
            this.logActivity('Waiting for meddleweed.');
            this.switchSoil(garden, 0, 'fertilizer');
            return;
        }
        // Use meddleweed to get crumbspore and brownMold
        if (!garden.plants['crumbspore']?.unlocked || !garden.plants['brownMold']?.unlocked) {
            this.logActivity('Trying to get crumbspore and brown mold.');
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 6; y++) {
                    if (garden.isTileUnlocked(x, y)) {
                        this.plantSeed(garden, 'meddleweed', x, y);
                    }
                }
            }
            return;
        }
        // Set plantsMissing = true BEFORE calling findPlants (original line 1172)
        this.plantsMissing = true;
        // Try to find a plant to work on for sector 0
        if (!this.findPlants(garden, 0)) {
            // No plants to work on - fill with dummy plants
            this.plantList = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                this.plantSector(garden, i);
            }
            return;
        }
        // Global soil selection with fallback (original lines 1186-1191)
        // Priority: Fertilizer (if plantPending) > Wood Chips > Fertilizer (fallback) > Dirt
        let soil = 'dirt';
        if (this.plantPending && garden.parent.bought >= garden.soils['fertilizer'].req) {
            soil = 'fertilizer'; // if waiting on a plant to mature
        }
        else if (garden.parent.bought >= garden.soils['woodchips'].req) {
            soil = 'woodchips'; // best for mutation
        }
        else if (garden.parent.bought >= garden.soils['fertilizer'].req) {
            soil = 'fertilizer'; // fallback if can't afford woodchips
        }
        this.switchSoil(garden, 0, soil);
        const farmLevel = Game.Objects['Farm'].level;
        // Farm level < 4: Use simple middle column planting (original lines 1192-1198)
        if (farmLevel < 4) {
            const dep = PLANT_DEPENDENCIES[this.plantList[0]];
            const targets = [
                [dep[1], 3, 2],
                [dep[2], 3, 3],
            ];
            if (garden.isTileUnlocked(3, 4)) {
                targets.push([dep[1], 3, 4]);
            }
            this.plantSeeds(garden, targets);
            return;
        }
        // Farm level == 4: Use two columns (original lines 1200-1213)
        this.findPlants(garden, 1);
        if (farmLevel === 4) {
            if (this.plantList[1] === 0) {
                this.logActivity('ERROR 42?');
                return;
            }
            const dep0 = PLANT_DEPENDENCIES[this.plantList[0]];
            const dep1 = PLANT_DEPENDENCIES[this.plantList[1]];
            this.plantSeeds(garden, [
                [dep0[1], 4, 2],
                [dep0[2], 4, 3],
                [dep0[1], 4, 4],
            ]);
            this.plantSeeds(garden, [
                [dep1[1], 1, 2],
                [dep1[2], 1, 3],
                [dep1[1], 1, 4],
            ]);
            return;
        }
        // Farm level >= 5: Use all 4 sectors (original lines 1215-1219)
        this.findPlants(garden, 2);
        this.findPlants(garden, 3);
        for (let sector = 0; sector < 4; sector++) {
            this.plantSector(garden, sector);
        }
    }
    /**
     * Find next plant to work on for a specific sector
     * Returns true if a plant goal was set, false otherwise
     * Original: AutoPlay.findPlants (lines 1119-1157)
     */
    findPlants(garden, idx) {
        if (this.context.wantAscend)
            return false; // do not plant before ascend
        let couldPlant = 0;
        // Check if already assigned a plant to this sector
        if (this.plantList[idx] !== 0) {
            const oldPlant = PLANT_DEPENDENCIES[this.plantList[idx]][0];
            this.logActivity(`Trying to get plant ${garden.plants[oldPlant].name} on sector ${this.sectorText(idx)}.`);
            this.plantCookies = false;
            if (this.havePlant(garden, oldPlant)) {
                this.plantList[idx] = 0; // Got it, clear the goal
            }
            else {
                return true; // Still working on it
            }
        }
        // Try to plant expensive plants first (if possible) as they take longest time
        const chkx = idx % 2 ? 0 : 5;
        const chky = idx > 1 ? 0 : 5;
        if (garden.isTileUnlocked(chkx, chky)) {
            // only plant if the spot is big enough
            // Check for everdaisy
            if (!this.havePlant(garden, 'everdaisy') &&
                garden.plants['elderwort'].unlocked &&
                garden.plants['tidygrass'].unlocked) {
                if (this.plantList.includes(2)) {
                    couldPlant = 2; // Already planted elsewhere
                }
                else {
                    this.plantList[idx] = 2;
                    return true;
                }
            }
            // Check for queenbeetLump
            if (!this.havePlant(garden, 'queenbeetLump') &&
                garden.plants['queenbeet'].unlocked) {
                if (this.plantList.includes(1)) {
                    couldPlant = 1; // Already planted elsewhere
                }
                else {
                    this.plantList[idx] = 1;
                    return true;
                }
            }
        }
        // Plant normal plants - start at index 3 to skip dummy, queenbeetLump, everdaisy
        for (let i = 3; i < PLANT_DEPENDENCIES.length; i++) {
            const plant = PLANT_DEPENDENCIES[i][0];
            if (!this.havePlant(garden, plant) &&
                garden.plants[PLANT_DEPENDENCIES[i][1]].unlocked &&
                garden.plants[PLANT_DEPENDENCIES[i][2]].unlocked) {
                // Want it
                if (this.plantList.includes(i)) {
                    if (!couldPlant)
                        couldPlant = i; // already planted - remember it
                }
                else {
                    this.plantList[idx] = i;
                    return true;
                }
            }
        }
        if (!couldPlant)
            return false;
        this.plantList[idx] = couldPlant;
        return true;
    }
    /**
     * Plant parent plants in a sector to create mutations
     * Original: AutoPlay.plantSector (lines 1222-1251)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3)
     */
    plantSector(garden, sector) {
        const plantIndex = this.plantList[sector];
        if (plantIndex === 0)
            return;
        const [targetPlant, parent1, parent2] = PLANT_DEPENDENCIES[plantIndex];
        // Calculate sector position
        const X = sector % 2 ? 0 : 3;
        const Y = sector > 1 ? 0 : 3;
        // Special case: dummy means we're done with mutations, plant for cookies
        if (targetPlant === 'dummy') {
            const thePlant = this.seedCalendar(garden, sector);
            for (let x = X; x < X + 3; x++) {
                for (let y = Y; y < Y + 3; y++) {
                    this.plantSeed(garden, thePlant, x, y);
                }
            }
            return;
        }
        // Special case: queenbeetLump needs specific 4-tile pattern around center
        if (targetPlant === 'queenbeetLump') {
            // Plant parent1 and parent2 in alternating columns (left and right full)
            for (let y = Y; y < Y + 3; y++) {
                this.plantSeed(garden, parent1, X, y);
                this.plantSeed(garden, parent2, X + 2, y);
            }
            // Plant parent1 at top and parent2 at bottom of middle column
            this.plantSeed(garden, parent1, X + 1, Y);
            this.plantSeed(garden, parent2, X + 1, Y + 2);
            return;
        }
        // Special case: everdaisy needs both parents in left and right columns only
        if (targetPlant === 'everdaisy') {
            for (let y = Y; y < Y + 3; y++) {
                this.plantSeed(garden, parent1, X, y);
                this.plantSeed(garden, parent2, X + 2, y);
            }
            return;
        }
        // Default case: Plant only middle column (X+1) with alternating parents
        this.plantSeeds(garden, [
            [parent1, X + 1, Y],
            [parent2, X + 1, Y + 1],
            [parent1, X + 1, Y + 2],
        ]);
    }
    /**
     * Check if ready to sacrifice garden for "Seedless to nay" achievement
     */
    gardenSacrificeReady(garden) {
        this.wantGardenSacrifice = false;
        // Achievement 382 = "Seedless to nay" (sacrifice garden with all plants)
        if (!Game.AchievementsById[382].won && garden.plantsUnlockedN === garden.plantsN) {
            if (!this.harvestPlant) {
                return true;
            }
            this.wantGardenSacrifice = true;
            this.logActivity('Waiting for harvest before getting Seedless to Nay.');
        }
        return false;
    }
    /**
     * Check if garden is ready (all plants and upgrades unlocked)
     */
    gardenReady(garden) {
        return (Game.Objects['Farm'].level > 8 &&
            garden.plantsUnlockedN === garden.plantsN &&
            this.allUnlocked(GARDEN_UPGRADES));
    }
    /**
     * Clean dying plants from garden to make room for new mutations
     * Original: AutoPlay.cleaningGarden (lines 1395-1412)
     */
    cleaningGarden(garden) {
        const farmLevel = Game.Objects['Farm'].level;
        if (farmLevel < 4) {
            // Level < 4: Clean middle columns (2 and 4)
            if (this.plantList[0] === 0)
                return;
            for (let y = 2; y < 5; y++) {
                this.cleanSeed(garden, 2, y);
                this.cleanSeed(garden, 4, y);
            }
        }
        else if (farmLevel === 4) {
            // Level 4: Clean columns 2 and 3
            for (let y = 2; y < 5; y++) {
                this.cleanSeed(garden, 2, y);
                this.cleanSeed(garden, 3, y);
            }
        }
        else {
            // Level 5+: Clean all 4 sectors
            for (let sector = 0; sector < 4; sector++) {
                const plantGoal = PLANT_DEPENDENCIES[this.plantList[sector]][0];
                this.cleanSector(garden, sector, plantGoal);
            }
        }
    }
    /**
     * Harvest a plant and clean sector if needed
     */
    harvest(garden, x, y) {
        garden.harvest(x, y);
        const sector = (x < 3 ? 1 : 0) + (y < 3 ? 2 : 0);
        if (this.plantList[sector] === 1) {
            this.cleanSector(garden, sector, 'all');
        }
    }
    /**
     * Clean a specific sector of the garden (3x3 grid)
     * Original: AutoPlay.cleanSector (lines 1414-1434)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (0-3): 0=bottom-right, 1=bottom-left, 2=top-right, 3=top-left
     * @param plant0 - Target plant name ('dummy', 'all', 'queenbeetLump', 'everdaisy', or regular plant)
     */
    cleanSector(garden, sector, plant0) {
        if (plant0 === 'dummy')
            return; // Don't clean when working on mutations
        // Calculate sector position (each sector is 3x3)
        const X = sector % 2 ? 0 : 3; // Left (0) or right (3)
        const Y = sector > 1 ? 0 : 3; // Top (0) or bottom (3)
        // Special case: queenbeetLump only needs center tile cleaned
        if (plant0 === 'queenbeetLump') {
            this.cleanSeed(garden, X + 1, Y + 1);
            return;
        }
        // Special case: everdaisy needs middle column cleaned
        if (plant0 === 'everdaisy') {
            for (let y = Y; y < Y + 3; y++) {
                this.cleanSeed(garden, X + 1, y);
            }
            return;
        }
        // Special case: clean all unlocked plants in sector
        if (plant0 === 'all') {
            for (let x = X; x < X + 3; x++) {
                for (let y = Y; y < Y + 3; y++) {
                    // Skip center tile
                    if (x !== X + 1 || y !== Y + 1) {
                        const tile = garden.getTile(x, y);
                        if (tile[0] >= 1 && garden.plantsById[tile[0] - 1].unlocked) {
                            garden.harvest(x, y);
                        }
                    }
                }
            }
            return;
        }
        // Default: clean left and right columns (for mutation patterns)
        for (let y = Y; y < Y + 3; y++) {
            this.cleanSeed(garden, X, y);
            this.cleanSeed(garden, X + 2, y);
        }
    }
    /**
     * Plant a seed at a specific location
     * Original: AutoPlay.plantSeed (lines 1256-1272)
     *
     * @param garden - Garden minigame object
     * @param seed - Plant key to plant
     * @param whereX - X coordinate (0-5)
     * @param whereY - Y coordinate (0-5)
     */
    plantSeed(garden, seed, whereX, whereY) {
        // Don't plant when CPS multiplier is too high (expensive)
        const grindingCheat = this.context.grindingCheat() ? 1 : 0;
        const cheatGolden = this.context.cheatGolden > 1 ? 1 : 0;
        if (this.context.cpsMult > 1 + 10 * (grindingCheat + cheatGolden)) {
            this.logActivity('Do not buy plants now - it is too expensive.');
            return;
        }
        if (!garden.isTileUnlocked(whereX, whereY))
            return;
        const oldPlant = garden.getTile(whereX, whereY)[0];
        if (oldPlant !== 0) {
            // Tile is occupied - try to clean if different plant
            if (garden.plantsById[oldPlant - 1].key !== seed) {
                this.cleanSeed(garden, whereX, whereY);
            }
            return;
        }
        if (!garden.canPlant(garden.plants[seed]))
            return;
        // Check if we can afford (cost is in minutes of current CPS)
        const cost = garden.plants[seed].cost * 60 * Game.cookiesPs;
        if (cost > Game.cookies - this.context.savingsGoal)
            return;
        garden.useTool(garden.plants[seed].id, whereX, whereY);
    }
    /**
     * Clean (harvest) a seed from a specific tile
     * Original: AutoPlay.cleanSeed (lines 1439-1448)
     *
     * @param garden - Garden minigame object
     * @param x - X coordinate
     * @param y - Y coordinate
     */
    cleanSeed(garden, x, y) {
        if (!garden.isTileUnlocked(x, y))
            return;
        const tile = garden.getTile(x, y);
        if (tile[0] === 0)
            return; // Empty tile
        const plant = garden.plantsById[tile[0] - 1];
        // Don't clean plants that aren't unlocked yet and haven't matured
        if (!plant.unlocked && tile[1] <= plant.mature)
            return;
        // Don't clean harvestable plants that haven't matured yet
        if (HARVESTABLE_PLANTS_ARRAY.indexOf(plant.key) >= 0 && tile[1] && tile[1] <= plant.mature) {
            return;
        }
        garden.harvest(x, y);
    }
    /**
     * Switch soil type for the garden
     * Original: AutoPlay.switchSoil (lines 1492-1498)
     *
     * @param garden - Garden minigame object
     * @param sector - Sector index (only switches for sector 0)
     * @param which - Soil type name ('dirt', 'fertilizer', 'clay', 'woodchips')
     */
    switchSoil(garden, sector, which) {
        if (sector)
            return; // Only switch for sector 0 (global soil)
        if (garden.nextSoil > this.context.now)
            return; // Soil change on cooldown
        const soil = garden.soils[which];
        if (!soil)
            return;
        // Check if already using this soil or don't have enough farms
        if (garden.soil === soil.id || garden.parent.bought < soil.req)
            return;
        // Click soil button using FireEvent to trigger game's click handler
        const soilButton = document.getElementById(`gardenSoil-${soil.id}`);
        if (soilButton) {
            soilButton.click();
        }
    }
    /**
     * Check if all upgrades in list are unlocked
     */
    allUnlocked(upgradeIds) {
        return upgradeIds.every((id) => Game.UpgradesById[id].bought);
    }
    /**
     * Log activity message
     */
    logActivity(msg) {
        this.context.addActivity(msg);
    }
    /**
     * Get plant pending status (for AutoPlay.plantPending)
     */
    isPlantPending() {
        return this.plantPending;
    }
    /**
     * Get current module status for dashboard
     */
    getStatus() {
        // Check if garden is unlocked
        if (!Game.isMinigameReady(Game.Objects['Farm'])) {
            return {
                module: 'Garden',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Farm level 1 to unlock Garden minigame',
                icon: '🌱',
                details: {
                    'Farm Level': Game.Objects['Farm']?.level || 0,
                    'Minigame': 'Not unlocked'
                }
            };
        }
        const garden = Game.Objects['Farm'].minigame;
        // Check if ascending soon
        if (this.context.wantAscend) {
            return {
                module: 'Garden',
                status: 'waiting',
                currentAction: 'Preparing for ascension',
                reason: 'Not planting before ascend',
                icon: '⬆️',
                details: {
                    'Ascension Pending': true
                }
            };
        }
        // Check if waiting for plants
        if (!garden.plants['meddleweed']?.unlocked) {
            return {
                module: 'Garden',
                status: 'waiting',
                currentAction: 'Waiting for meddleweed',
                reason: 'First plant spawns randomly',
                icon: '🌱',
                details: {
                    'Soil': 'fertilizer',
                    'Waiting For': 'meddleweed'
                }
            };
        }
        // Check if getting starter plants
        if (!garden.plants['crumbspore']?.unlocked || !garden.plants['brownMold']?.unlocked) {
            return {
                module: 'Garden',
                status: 'active',
                currentAction: 'Planting meddleweed everywhere',
                reason: 'Getting crumbspore and brownMold',
                icon: '🌱',
                details: {
                    'Crumbspore': garden.plants['crumbspore']?.unlocked || false,
                    'BrownMold': garden.plants['brownMold']?.unlocked || false
                }
            };
        }
        // Check if working on specific plant
        const activePlants = this.plantList.filter(p => p !== 0);
        if (activePlants.length > 0) {
            const plantIndex = activePlants[0];
            const plantName = PLANT_DEPENDENCIES[plantIndex]?.[0] || 'unknown';
            return {
                module: 'Garden',
                status: 'active',
                currentAction: `Growing ${plantName}`,
                reason: this.plantsMissing ? 'Working towards all 34 plants' : 'Optimizing for cookies/lumps',
                nextAction: activePlants.length > 1 ? `Then ${activePlants.length - 1} more plants` : undefined,
                icon: '🌱',
                details: {
                    'Target Plant': plantName,
                    'Plants Unlocked': `${garden.plantsUnlockedN}/${garden.plantsN}`,
                    'Farm Level': Game.Objects['Farm'].level,
                    'Active Sectors': activePlants.length
                }
            };
        }
        // Check if ready for sacrifice
        if (garden.plantsUnlockedN === garden.plantsN && !Game.AchievementsById[382].won) {
            if (this.harvestPlant) {
                return {
                    module: 'Garden',
                    status: 'waiting',
                    currentAction: 'Waiting to harvest',
                    reason: 'Will sacrifice after harvesting cookie plants',
                    nextAction: 'Sacrifice for "Seedless to nay" achievement',
                    icon: '🏆',
                    details: {
                        'Plants Unlocked': 'All 34',
                        'Harvest Pending': true
                    }
                };
            }
            return {
                module: 'Garden',
                status: 'active',
                currentAction: 'Ready to sacrifice',
                reason: 'All plants unlocked',
                nextAction: 'Get "Seedless to nay" achievement',
                icon: '🏆',
                details: {
                    'Plants Unlocked': 'All 34'
                }
            };
        }
        // Idle/harvesting
        return {
            module: 'Garden',
            status: this.harvestPlant ? 'active' : 'idle',
            currentAction: this.harvestPlant ? 'Harvesting plants' : 'Monitoring garden',
            reason: this.plantsMissing ? 'All goals complete, waiting' : 'Optimizing production',
            icon: '🌿',
            details: {
                'Plants Unlocked': `${garden.plantsUnlockedN}/${garden.plantsN}`,
                'Harvest Ready': this.harvestPlant
            }
        };
    }
}

;// ./src/modules/StockMarketManager.ts
/**
 * Manages Stock Market (Bank minigame) trading logic
 *
 * The Stock Market allows buying and selling goods with fluctuating prices.
 * The bot tracks price movements and trades based on thresholds.
 *
 * Strategy:
 * - Buy brokers to increase stock limits
 * - Upgrade offices to unlock more goods
 * - Track min/max prices for each good
 * - Buy when price is rising and below threshold
 * - Sell when price is dropping and above threshold
 * - During night: aggressive buying at low prices, selling at high prices
 *
 * Original implementation: lines 1500-1591 in cookieAutoPlayBeta.js
 */

class StockMarketManager {
    constructor(context) {
        this.goodsList = new Map();
        this.context = context;
    }
    /**
     * Main handler - called periodically (every 15 seconds)
     */
    handleStockMarket() {
        // Wait 1 hour after reset/reincarnation before trading
        if (Date.now() < this.context.resetTime + 3600000)
            return;
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK]))
            return;
        if (this.context.wantAscend)
            return; // Don't trade before ascending
        const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;
        // Buy brokers to increase stock limits
        this.buyBrokers(market);
        // Upgrade offices to unlock more goods
        this.upgradeOffices(market);
        // Buy 500 of each stock for achievement (459)
        this.buyForAchievement(market);
        // Get loan for "Debt evasion" achievement
        this.tryDebtEvasion();
        // Initialize price thresholds if needed
        if (this.goodsList.size === 0) {
            this.initializeGoodsList(market);
        }
        // Trade based on price movements
        this.tradeGoods(market);
    }
    /**
     * Night mode trading - aggressive buying/selling
     * Called from NightMode.activateNightAtStocks()
     */
    handleNightTrading() {
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK]))
            return;
        const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;
        // First do normal trading
        this.handleStockMarket();
        // Then do aggressive night trading
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            const price = market.getGoodPrice(good);
            const goodData = this.goodsList.get(good.id);
            if (!goodData)
                continue;
            // Buy all if affordable
            if (price < goodData.buyHigh) {
                market.buyGood(good.id, 10000);
            }
            // Sell all if reasonable price
            if (price > goodData.sellLow) {
                market.sellGood(good.id, 10000);
            }
        }
    }
    /**
     * Buy brokers to increase stock limits
     */
    buyBrokers(market) {
        if (market.brokers < market.getMaxBrokers()) {
            const price = market.getBrokerPrice();
            if (100 * price < Game.cookies) {
                const buyButton = document.getElementById('bankBrokersBuy');
                if (buyButton) {
                    buyButton.click();
                }
            }
        }
    }
    /**
     * Upgrade offices to unlock more goods
     */
    upgradeOffices(market) {
        if (market.officeLevel < market.offices.length - 1) {
            const office = market.offices[market.officeLevel];
            if (office.cost &&
                Game.ObjectsById[BUILDING_IDS.CURSOR].amount >= office.cost[0] &&
                Game.ObjectsById[BUILDING_IDS.CURSOR].level >= office.cost[1]) {
                const upgradeButton = document.getElementById('bankOfficeUpgrade');
                if (upgradeButton) {
                    upgradeButton.click();
                }
            }
        }
    }
    /**
     * Buy 500 of each stock for "No nobility in poverty" achievement
     */
    buyForAchievement(market) {
        // Achievement 459 = "No nobility in poverty" (own 500 of each stock)
        const lastGood = market.goodsById[market.goodsById.length - 1];
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.NO_NOBILITY_IN_POVERTY].won &&
            market.getGoodMaxStock(lastGood) > 1000) {
            for (const goodKey in market.goods) {
                const good = market.goods[goodKey];
                const needed = 500 - good.stock;
                if (needed > 0) {
                    market.buyGood(good.id, needed);
                }
            }
        }
    }
    /**
     * Try to get "Debt evasion" achievement by ascending with loan
     */
    tryDebtEvasion() {
        if (!Game.AchievementsById[ACHIEVEMENT_IDS.DEBT_EVASION].won && !this.context.plantPending) {
            const loanButton = document.getElementById('bankLoan2');
            if (loanButton) {
                loanButton.click();
                // Wait 30 seconds then ascend
                setTimeout(() => {
                    this.context.triggerAscend('trying debt evasion');
                }, 30 * 1000);
            }
        }
    }
    /**
     * Initialize price thresholds for all goods
     */
    initializeGoodsList(market) {
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            const price = market.getGoodPrice(good);
            const restingVal = market.getRestingVal(good.id);
            const highMark = restingVal + 1;
            const lowMark = restingVal / 3; // Could also use 2
            const distance = highMark - lowMark;
            this.goodsList.set(good.id, {
                min: price,
                max: price,
                delta: good.id > 3 ? 5 : 2, // Slow goods: 5, fast goods: 2
                sellHigh: highMark,
                sellLow: highMark - distance / 4,
                buyHigh: lowMark + distance / 2,
                buyMedium: lowMark + distance / 4,
                buyLow: lowMark,
            });
        }
    }
    /**
     * Trade goods based on price movements and thresholds
     */
    tradeGoods(market) {
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            const price = market.getGoodPrice(good);
            const maxStock = market.getGoodMaxStock(good);
            const goodData = this.goodsList.get(good.id);
            if (!goodData)
                continue;
            // Update min/max prices
            if (goodData.min > price)
                goodData.min = price;
            if (goodData.max < price)
                goodData.max = price;
            // BUY logic - when price is rising and below threshold
            if (good.stock < maxStock) {
                // Price is rising (current price > min + delta) and affordable
                if (price - goodData.delta > goodData.min && price < goodData.buyHigh) {
                    if (goodData.min < goodData.buyLow) {
                        // Very cheap - buy all
                        market.buyGood(good.id, 10000);
                        goodData.max = price;
                    }
                    else if (goodData.min < goodData.buyMedium) {
                        // Reasonable - buy 80%
                        const buyAmount = Math.floor(maxStock * 0.8 - good.stock);
                        market.buyGood(good.id, buyAmount);
                        goodData.max = price;
                    }
                    else if (goodData.min < goodData.buyHigh) {
                        // Affordable - buy 60%
                        const buyAmount = Math.floor(maxStock * 0.6 - good.stock);
                        market.buyGood(good.id, buyAmount);
                        goodData.max = price;
                    }
                }
            }
            // SELL logic - when price is dropping and above threshold
            if (good.stock > 0) {
                // Price is dropping (current price < max - delta) and reasonable
                if (price + goodData.delta < goodData.max && price > goodData.sellLow) {
                    if (goodData.max > goodData.sellHigh) {
                        // Very expensive - sell all
                        market.sellGood(good.id, 10000);
                        goodData.min = price;
                    }
                    else if (goodData.max > goodData.sellLow) {
                        // Reasonable - sell 70%
                        const sellAmount = Math.floor(good.stock - maxStock * 0.3);
                        market.sellGood(good.id, sellAmount);
                        goodData.min = price;
                    }
                }
            }
        }
    }
    /**
     * Get current stock market manager status
     */
    getStatus() {
        // Check for cooldown period after reset
        const cooldownRemaining = Math.floor((this.context.resetTime + 3600000 - Date.now()) / 1000 / 60);
        if (cooldownRemaining > 0) {
            return {
                module: 'Stock Market',
                status: 'waiting',
                currentAction: 'Cooldown after reset',
                reason: 'Wait 1 hour after reincarnation before trading',
                nextAction: `Will start in ${cooldownRemaining} minutes`,
                icon: '📈',
                details: {
                    'Cooldown': `${cooldownRemaining}m remaining`
                }
            };
        }
        // Check if stock market is unlocked
        if (!Game.isMinigameReady(Game.ObjectsById[BUILDING_IDS.BANK])) {
            return {
                module: 'Stock Market',
                status: 'disabled',
                currentAction: 'Not unlocked',
                reason: 'Need Bank minigame unlocked (Cursor level 12)',
                icon: '📈',
                details: {
                    'Cursor Level': Game.ObjectsById[BUILDING_IDS.CURSOR]?.level || 0,
                    'Minigame': 'Not ready'
                }
            };
        }
        // Don't trade before ascending
        if (this.context.wantAscend) {
            return {
                module: 'Stock Market',
                status: 'waiting',
                currentAction: 'Preparing to ascend',
                reason: 'Avoiding trades before ascension',
                icon: '📈',
                details: {
                    'Status': 'Pre-ascension'
                }
            };
        }
        const market = Game.ObjectsById[BUILDING_IDS.BANK].minigame;
        const brokers = market.brokers;
        const maxBrokers = market.getMaxBrokers();
        const officeLevel = market.officeLevel;
        const maxOfficeLevel = market.offices.length - 1;
        // Count active trading
        let goodsWithStock = 0;
        let totalValue = 0;
        for (const goodKey in market.goods) {
            const good = market.goods[goodKey];
            totalValue += good.stock * market.getGoodPrice(good);
            if (good.stock > 0)
                goodsWithStock++;
        }
        // Check for achievement pursuit
        const lastGood = market.goodsById[market.goodsById.length - 1];
        const pursuingAchievement = !Game.AchievementsById[ACHIEVEMENT_IDS.NO_NOBILITY_IN_POVERTY].won &&
            market.getGoodMaxStock(lastGood) > 1000;
        if (pursuingAchievement) {
            return {
                module: 'Stock Market',
                status: 'active',
                currentAction: 'Working on achievement',
                reason: 'Buying 500 of each stock for "Dude, sweet" achievement',
                icon: '📈',
                details: {
                    'Brokers': `${brokers}/${maxBrokers}`,
                    'Office Level': `${officeLevel}/${maxOfficeLevel}`,
                    'Portfolio Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue)
                }
            };
        }
        // Check if we need to upgrade infrastructure
        if (brokers < maxBrokers || officeLevel < maxOfficeLevel) {
            return {
                module: 'Stock Market',
                status: 'active',
                currentAction: 'Upgrading infrastructure',
                reason: brokers < maxBrokers ? 'Buying brokers' : 'Upgrading office',
                nextAction: `Then start trading (${this.goodsList.size} goods tracked)`,
                icon: '📈',
                details: {
                    'Brokers': `${brokers}/${maxBrokers}`,
                    'Office Level': `${officeLevel}/${maxOfficeLevel}`
                }
            };
        }
        // Active trading
        if (this.goodsList.size === 0) {
            return {
                module: 'Stock Market',
                status: 'active',
                currentAction: 'Initializing trading',
                reason: 'Setting up price thresholds',
                icon: '📈',
                details: {
                    'Brokers': brokers,
                    'Office Level': officeLevel
                }
            };
        }
        return {
            module: 'Stock Market',
            status: 'active',
            currentAction: 'Trading stocks',
            reason: 'Buying low, selling high',
            nextAction: `Tracking ${this.goodsList.size} goods`,
            icon: '📈',
            details: {
                'Brokers': brokers,
                'Portfolio Value': typeof Beautify !== 'undefined' ? Beautify(Math.floor(totalValue)) : Math.floor(totalValue),
                'Goods Owned': goodsWithStock,
                'Goods Tracked': this.goodsList.size,
                'Strategy': 'Momentum-based'
            }
        };
    }
}

;// ./src/AutoPlay.ts
/**
 * Main AutoPlay class that coordinates all modules
 */



















class AutoPlay_AutoPlay {
    // Public accessors for state properties (proxies to this.state)
    get nextAchievement() { return this.state.nextAchievement; }
    set nextAchievement(value) { this.state.nextAchievement = value; }
    get finished() { return this.state.finished; }
    set finished(value) { this.state.finished = value; }
    get wantAscend() { return this.state.wantAscend; }
    set wantAscend(value) { this.state.wantAscend = value; }
    get mainActivity() {
        return this.state.mainActivity;
    }
    set mainActivity(value) { this.state.mainActivity = value; }
    get activities() {
        return this.state.activities;
    }
    set activities(value) { this.state.activities = value; }
    // Additional accessors for Dashboard
    get nextPurchase() {
        return this.state.nextPurchase;
    }
    set nextPurchase(value) { this.state.nextPurchase = value; }
    get nextPurchaseType() { return this.state.nextPurchaseType; }
    set nextPurchaseType(value) { this.state.nextPurchaseType = value; }
    get nextPurchasePrice() { return this.state.nextPurchasePrice; }
    set nextPurchasePrice(value) { this.state.nextPurchasePrice = value; }
    get nextPurchasePP() { return this.state.nextPurchasePP; }
    set nextPurchasePP(value) { this.state.nextPurchasePP = value; }
    get deadline() { return this.state.deadline; }
    set deadline(value) { this.state.deadline = value; }
    get now() { return this.state.now; }
    set now(value) { this.state.now = value; }
    get savingsGoal() { return this.config.savingsGoal; }
    set savingsGoal(value) { this.config.savingsGoal = value; }
    get hyperActive() { return this.state.hyperActive; }
    set hyperActive(value) { this.state.hyperActive = value; }
    get savingsStart() { return this.state.savingsStart; }
    set savingsStart(value) { this.state.savingsStart = value; }
    get statusInfo() { return this.state.statusInfo; }
    set statusInfo(value) { this.state.statusInfo = value; }
    get workingOnSpecialAchievement() { return this.state.workingOnSpecialAchievement; }
    set workingOnSpecialAchievement(value) { this.state.workingOnSpecialAchievement = value; }
    get fpsScale() {
        // Use Dashboard config if available (0=OFF, 1=ON), otherwise fallback to internal config
        const enabled = (this.Config.FPS !== undefined) ? (this.Config.FPS === 1) : this.config.fpsScaling;
        if (!enabled)
            return 1;
        const Game = globalThis.Game;
        if (Game && Game.fps && Game.fps > 0) {
            // Standard FPS is 30. If FPS is higher, scale factor is < 1 (faster)
            // e.g. 60 FPS -> 30/60 = 0.5
            return Math.max(0.1, 30 / Game.fps);
        }
        return 1;
    }
    get lastTickDuration() { return this.state.lastTickDuration; }
    get avgTickDuration() { return this.state.avgTickDuration; }
    get moduleTimings() { return this.state.moduleTimings; }
    // Public accessors for shared context
    get cpsMult() {
        const Game = globalThis.Game;
        return Game.cookiesPs / Game.unbuffedCps;
    }
    get canUseLumps() {
        return this.sugarLumpManager.getCanUseLumps();
    }
    get poppingWrinklers() {
        return this.state.poppingWrinklers;
    }
    set poppingWrinklers(value) {
        this.state.poppingWrinklers = value;
    }
    get resetTime() {
        return this.state.resetTime || this.state.now;
    }
    get cheatGolden() {
        return this.config.cheatGolden;
    }
    get wrinklerTime() { return this.state.wrinklerTime; }
    set wrinklerTime(value) { this.state.wrinklerTime = value; }
    get nextWrinkler() { return this.state.nextWrinkler; }
    set nextWrinkler(value) { this.state.nextWrinkler = value; }
    get lumpRelatedAchievements() {
        return this.lateAchievements;
    }
    get lumpHarvestAchievements() {
        return this.lateAchievements;
    }
    // Public methods expected by modules
    info(message) {
        console.log(`[CookieBot] ${message}`);
    }
    setMainActivity(activity) {
        // When mainActivity changes, reset activities to the new base
        if (this.state.mainActivity !== activity) {
            this.state.mainActivity = activity;
            this.state.activities = activity;
        }
    }
    addActivity(activity) {
        if (!this.state.activities.includes(activity)) {
            this.state.activities += '<div class="line"></div>' + activity;
            return true;
        }
        return false;
    }
    logAction(action, details) {
        if (this.dashboard) {
            this.dashboard.logAction(action, details);
        }
    }
    logStatus(category, message, details) {
        if (this.dashboard) {
            this.dashboard.logStatus(category, message, details);
        }
    }
    /**
     * Log game state to localStorage (legacy feature)
     * Used during ascension to save state
     */
    logging() {
        if (!this.loggingInfo)
            return;
        try {
            const Game = globalThis.Game;
            const before = localStorage.getItem("autoplayLog") || "";
            const toAdd = "#logging autoplay V" + AutoPlay_AutoPlay.version + " with " +
                this.loggingInfo + "\n" + Game.WriteSave(1) + "\n";
            this.loggingInfo = 0;
            localStorage.setItem("autoplayLog", before + toAdd);
        }
        catch (e) {
            console.error('Logging error:', e);
        }
    }
    /**
     * Find next achievement to target (delegates to AchievementHandler)
     */
    findNextAchievement() {
        if (this.achievementHandler) {
            this.achievementHandler.findNextAchievement();
        }
    }
    constructor() {
        // Public properties for global AutoPlay access (needed by modules)
        this.wantedAchievements = [];
        this.lateAchievements = [];
        this.robotName = 'Automated ';
        this.backupHeight = 0;
        this.giftCode = 0;
        this.onAscend = false; // Flag to prevent duplicate ascension calls
        this.loggingInfo = 0;
        this.tickCounter = 0; // For native mod hook scheduling
        // Permanent slot arrays
        this.kittens = [31, 32, 54, 108, 187, 320, 321, 322, 425, 442, 462, 494, 613, 766, 865];
        this.cursors = [0, 1, 2, 3, 4, 5, 6, 43, 82, 109, 188, 189, 660, 764, 873];
        this.maxBuildings = [826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 858];
        this.butterBiscuits = [334, 335, 336, 337, 400, 477, 478, 479, 497, 659, 699, 767, 862];
        this.expensive = [
            38, 39, 40, 41, 42, 55, 56, 80, 81, 88, 89, 90, 104, 105, 106, 107,
            120, 121, 122, 123, 150, 151, 256, 257, 258, 259, 260, 261, 262, 263,
            338, 339, 340, 341, 342, 343, 350, 351, 352, 403, 404, 405, 406, 407,
            444, 445, 446, 447, 448, 453, 454, 455, 456, 457, 458, 464, 465, 466, 467, 468, 469,
            498, 499, 500, 501, 535, 536, 538, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574,
            575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588,
            607, 608, 609, 615, 616, 617, 652, 653, 654, 655, 656, 657, 658,
            678, 679, 680, 681, 682, 721, 722, 723, 724,
            807, 808, 809, 810, 811, 812, 813, 814, 815, 816,
            820, 821, 822, 823, 867, 868, 869, 870, 871, 872
        ];
        // Initialize default configuration
        this.config = this.getDefaultConfig();
        this.state = this.getDefaultState();
        // Initialize public Config object (matches original structure)
        // This will be synchronized with Dashboard's config after Dashboard is created
        this.Config = {
            BotMode: 1,
            NightMode: 1,
            ClickMode: 1,
            GoldenClickMode: 1,
            SavingStrategy: 1,
            CheatLumps: 1,
            CheatGolden: 1,
            ShowDashboard: 1,
            HardcoreMode: 1,
            FPS: 1,
            UseGameHooks: 0
        };
        // Initialize public achievement arrays
        this.wantedAchievements = [...WANTED_ACHIEVEMENTS];
        this.lateAchievements = [...LUMP_RELATED_ACHIEVEMENTS];
        // Create ConfigManager and Dashboard
        this.configManager = new ConfigManager(this);
        // Register global options
        this.configManager.registerOption('BotMode', {
            options: [
                { value: 0, label: 'IDLE' },
                { value: 1, label: 'AUTO' },
                { value: 2, label: 'MANUAL' }
            ],
            label: ['IDLE', 'AUTO', 'MANUAL'], // Legacy support
            desc: 'Cookiebot global mode (work in progress)'
        }, 1);
        this.configManager.registerOption('FPS', {
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'ON' }
            ],
            label: ['OFF', 'ON'], // Legacy support
            desc: 'Scale timers based on game FPS (smoother at >30fps)'
        }, 1);
        this.configManager.registerOption('UseGameHooks', {
            options: [
                { value: 0, label: 'OFF' },
                { value: 1, label: 'ON' }
            ],
            label: ['OFF', 'ON'], // Legacy support
            desc: 'Use native game hooks (logic/draw) instead of timers. WARNING: Might trigger "Cheated cookies" achievement.'
        }, 0);
        this.dashboard = new Dashboard(this, this.configManager);
        // Sync Config with ConfigManager's config system
        this.Config = this.configManager.getConfig();
        // Helper methods for logging and activities (now dashboard exists)
        const logAction = (action, details) => {
            // Dashboard handles all action history tracking
            this.dashboard.logAction(action, details);
        };
        const logStatus = (type, message, details) => {
            // Dashboard handles all status history tracking
            this.dashboard.logStatus(type, message, details);
        };
        const addActivity = (activity) => {
            // Original uses string concatenation with HTML, not array
            // Check for duplicates before adding
            if (!this.state.activities.includes(activity)) {
                this.state.activities += '<div class="line"></div>' + activity;
                return true;
            }
            return false;
        };
        // Initialize centralized logger AFTER dashboard created
        Logger.initialize({
            logAction,
            logStatus,
            addActivity,
        });
        // Initialize modules with proper constructor arguments
        // Use this.Config (original structure) instead of this.config (TypeScript structure)
        this.clickManager = new ClickManager(this);
        this.goldenCookieHandler = new GoldenCookieHandler(this);
        this.savingsManager = new SavingsManager(this);
        this.purchaseManager = new PurchaseManager(this);
        this.seasonHandler = new SeasonHandler(this);
        this.sugarLumpManager = new SugarLumpManager(this);
        this.wrinklerManager = new WrinklerManager(this);
        this.achievementHandler = new AchievementHandler(this);
        // Pass 'this' as context so AscensionManager can read live properties via getters
        // Cast to any to satisfy the AutoPlayContext interface (this has all required properties)
        this.ascensionManager = new AscensionManager(this);
        this.dragonManager = new DragonManager(this);
        // Dashboard already created at top of constructor
        this.nightMode = new NightMode(this);
        this.pantheonManager = new PantheonManager(this);
        this.grimoireManager = new GrimoireManager(this);
        this.gardenManager = new GardenManager(this);
        this.stockMarketManager = new StockMarketManager(this);
    }
    /**
     * Trigger ascension (delegates to AscensionManager)
     */
    triggerAscend(msg, bypass) {
        this.ascensionManager.triggerAscend(msg, bypass);
    }
    seasonFinished(season) {
        return this.seasonHandler.seasonFinished(season);
    }
    handleSugarLumps() {
        this.sugarLumpManager.handleSugarLumps();
    }
    handleGoldenCookies() {
        this.goldenCookieHandler.handleGoldenCookies();
    }
    activateNightSpirits() {
        this.pantheonManager.activateNightSpirits();
    }
    deactivateNightSpirits() {
        this.pantheonManager.deactivateNightSpirits();
    }
    assignSpirit(slot, spirit, force) {
        this.pantheonManager.assignSpirit(slot, spirit, force);
    }
    handleNightTrading() {
        this.stockMarketManager.handleNightTrading();
    }
    freezeGarden(freeze) {
        this.gardenManager.freezeGarden(freeze);
    }
    /**
     * Initialize the bot
     */
    init() {
        if (this.state.isInitialized) {
            console.log('CookieBot already initialized');
            return;
        }
        console.log(`CookieBot v${AutoPlay_AutoPlay.version} initializing...`);
        // Load saved configuration
        this.loadConfig();
        // Find first achievement to work on
        this.achievementHandler.findNextAchievement();
        // Create dashboard UI
        this.dashboard.createDashboard();
        this.dashboard.updateDashboard();
        // Update dashboard every second for real-time stats
        setInterval(() => {
            this.dashboard.updateDashboard();
        }, 1000);
        // Hook into Game.UpdateMenu to add config options to preferences
        this.setupMenuHook();
        // Do an initial bestBuy check to populate purchase info for dashboard
        this.purchaseManager.bestBuy();
        const purchaseInfo = this.purchaseManager.getPurchaseInfo();
        if (purchaseInfo) {
            this.state.nextPurchase = purchaseInfo.name;
            this.state.nextPurchaseType = purchaseInfo.type;
            this.state.nextPurchasePP = purchaseInfo.pp;
            this.state.nextPurchasePrice = purchaseInfo.price;
        }
        // Check if we should use native game hooks or legacy timer
        if (this.Config.UseGameHooks === 1) {
            this.registerGameMod();
        }
        else {
            // Set up periodic execution
            this.scheduleNextRun();
        }
        this.state.isInitialized = true;
        console.log('CookieBot initialized successfully');
    }
    /**
     * Register the bot as a native game mod
     */
    registerGameMod() {
        const Game = globalThis.Game;
        if (!Game || !Game.registerMod)
            return;
        Game.registerMod('CookieBot', {
            init: () => {
                this.info('CookieBot native mod registered.');
                // Logic hook - runs every game tick (30 TPS)
                Game.registerHook('logic', () => this.hookLogic());
                // Draw hook - runs every frame
                Game.registerHook('draw', () => this.hookDraw());
                // Reincarnate hook - runs after ascension
                Game.registerHook('reincarnate', () => this.hookReincarnate());
            },
            save: () => {
                // We use our own config saving mechanism, but we could return a string here
                return JSON.stringify(this.config);
            },
            load: (str) => {
                // We load config separately, but could load here
                try {
                    const data = JSON.parse(str);
                    this.updateConfig(data);
                }
                catch (e) { }
            }
        });
    }
    /**
     * Native logic hook - runs every game tick (30 times/sec)
     */
    hookLogic() {
        this.tickCounter++;
        // const Game = (globalThis as any).Game; // Removed unused variable
        // Update time
        this.state.now = Date.now();
        // ===== Fast Actions (Every Tick) =====
        // These need to be as responsive as possible
        this.clickManager.handleClicking();
        this.goldenCookieHandler.handleGoldenCookies();
        // Speed cheat sugar lumps if level 4
        if (this.Config.CheatLumps === 4) {
            this.sugarLumpManager.handleSugarLumps();
        }
        // ===== Throttled Actions (Every 10 ticks / ~300ms) =====
        // This matches the original periodic() speed
        if (this.tickCounter % 10 === 0) {
            this.runSlowLogic();
        }
    }
    /**
     * Native draw hook - runs every frame
     */
    hookDraw() {
        // Dashboard handles its own throttling
        this.dashboard.render();
    }
    /**
     * Native reincarnate hook - runs after ascension
     */
    hookReincarnate() {
        this.info('CookieBot detected reincarnation. Resetting state.');
        this.state = this.getDefaultState();
        this.state.isInitialized = true;
        // Re-apply config that might have been lost in state reset
        this.Config = this.dashboard.getConfig();
    }
    /**
     * Shared logic for slow/periodic tasks
     * Called by periodic() (legacy) and hookLogic() (native)
     */
    runSlowLogic() {
        const Game = globalThis.Game;
        const startTime = performance.now();
        // Handle "Just Right" achievement (special case)
        if (this.state.nextAchievement === 397) {
            this.measureModule('JustRight', () => this.runJustRight());
            this.updateTickStats(startTime);
            return;
        }
        // Update finished state
        this.state.finished = LUMP_RELATED_ACHIEVEMENTS.every((id) => Game.AchievementsById[id].won);
        // Night mode check
        if (this.nightMode.checkNightMode() && !Game.ascensionMode) {
            this.updateTickStats(startTime);
            return;
        }
        // High-activity phase (Buying, Grimoire)
        if (this.state.hyperActive || (this.state.now >= this.state.deadline)) {
            this.state.hyperActive = false;
            this.measureModule('PurchaseManager', () => this.bestBuy());
            if (this.cpsMult > 100) {
                this.state.hyperActive = true;
            }
            this.measureModule('GrimoireManager', () => this.handleSpeedMinigames());
        }
        // Frequent ascension checks
        if (Game.ascensionMode === 1 || this.onAscend) {
            this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
        }
        if (!Game.UpgradesById[UPGRADE_IDS.LUCKY_PAYOUT].bought && Game.heavenlyChips > 77777777) {
            this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
        }
        // Deadline check
        if (this.state.now < this.state.deadline) {
            this.updateTickStats(startTime);
            return;
        }
        // Periodic actions (every ~15 seconds in legacy, or every ~50 calls here)
        // We can just run them every time this function runs (every 300ms)
        // The modules themselves usually have internal checks or are cheap enough
        // Set robot name
        const bakeryName = Game.bakeryNameL.textContent;
        const robotName = 'Automated ';
        if (bakeryName.slice(0, robotName.length) !== robotName) {
            Game.bakeryNameL.textContent = robotName + bakeryName;
        }
        this.state.activities = this.state.mainActivity;
        if (!Game.onMenu) {
            this.status(false);
        }
        if (this.state.plantPending) {
            Logger.addActivity('Make sure to harvest the new plant before ascend!');
        }
        // Calculate dynamic deadline
        let dynamicDeadline = 5000 * this.fpsScale;
        if (this.state.nextPurchasePrice && Game.cookiesPs > 0) {
            const availableCookies = Game.cookies - (this.config.savingsGoal || 0);
            const needsForPurchase = this.state.nextPurchasePrice - availableCookies;
            if (needsForPurchase > 0) {
                let timeToAfford = (needsForPurchase / Game.cookiesPs) * 1000;
                const bufferTime = 500 * this.fpsScale;
                timeToAfford = Math.max(timeToAfford - bufferTime, 100 * this.fpsScale);
                const maxWait = 5000 * this.fpsScale;
                if (timeToAfford <= maxWait) {
                    dynamicDeadline = timeToAfford;
                }
                else {
                    const remainder = timeToAfford % maxWait;
                    if (remainder > 1000 * this.fpsScale) {
                        dynamicDeadline = remainder;
                    }
                    else {
                        dynamicDeadline = maxWait;
                    }
                }
                dynamicDeadline = Math.max(dynamicDeadline, 100 * this.fpsScale);
            }
            else {
                dynamicDeadline = 100 * this.fpsScale;
            }
        }
        this.state.deadline = this.state.now + dynamicDeadline;
        this.setDeadline(this.state.now + (this.state.now - Game.startDate) / 10);
        // Run periodic modules
        if (this.config.cheatLumps !== 4 && this.config.autoSugarLumps) {
            this.measureModule('SugarLumpManager', () => this.sugarLumpManager.handleSugarLumps());
        }
        if (this.config.savingsEnabled) {
            this.savingsManager.setCurrentTime(this.state.now);
            this.measureModule('SavingsManager', () => this.savingsManager.handleSavings());
        }
        if (this.config.autoSeason) {
            this.measureModule('SeasonHandler', () => this.seasonHandler.handleSeasons());
        }
        this.measureModule('DragonManager', () => this.dragonManager.handleDragon());
        this.measureModule('AchievementHandler', () => this.achievementHandler.handleSmallAchievements());
        if (this.config.autoWrinklers) {
            this.measureModule('WrinklerManager', () => this.wrinklerManager.handleWrinklers());
        }
        this.measureModule('AscensionManager', () => this.ascensionManager.handleAscend());
        this.handleMinigames();
        this.handleNotes();
        if (!this.state.workingOnSpecialAchievement) {
            if (!Game.AchievementsById[ACHIEVEMENT_IDS.ELDER].won) {
                Logger.addActivity('Getting 7 grandma types');
            }
            if (Game.AchievementsById[ACHIEVEMENT_IDS.ELDER].won &&
                Game.UpgradesById[UPGRADE_IDS.BINGO_CENTERRESEARCH_FACILITY].unlocked &&
                Game.ascensionMode !== 1 &&
                !Game.UpgradesById[UPGRADE_IDS.BINGO_CENTERRESEARCH_FACILITY].bought) {
                Logger.addActivity('Funding the grandma research facility');
            }
        }
        this.updateTickStats(startTime);
    }
    /**
     * Hook into Game.UpdateMenu to add config options to preferences menu
     */
    setupMenuHook() {
        const Game = globalThis.Game;
        // Backup original UpdateMenu if not already backed up
        if (!Game.__originalUpdateMenu) {
            Game.__originalUpdateMenu = Game.UpdateMenu;
        }
        // Override UpdateMenu to inject our config options
        const self = this;
        Game.UpdateMenu = function () {
            // Call original UpdateMenu first
            Game.__originalUpdateMenu();
            // Add our config menu when on preferences screen
            if (Game.onMenu === 'prefs') {
                self.dashboard.addMenuPref();
            }
        };
    }
    /**
     * Update tick execution statistics
     */
    updateTickStats(startTime) {
        const duration = performance.now() - startTime;
        this.state.lastTickDuration = duration;
        // Exponential moving average (alpha = 0.05 for smooth updates)
        if (this.state.avgTickDuration === 0) {
            this.state.avgTickDuration = duration;
        }
        else {
            this.state.avgTickDuration = (this.state.avgTickDuration * 0.95) + (duration * 0.05);
        }
    }
    /**
     * Measure execution time of a module
     */
    measureModule(name, fn) {
        const start = performance.now();
        try {
            fn();
        }
        finally {
            const duration = performance.now() - start;
            // Use exponential moving average for module timings too
            const currentAvg = this.state.moduleTimings[name] || 0;
            if (currentAvg === 0) {
                this.state.moduleTimings[name] = duration;
            }
            else {
                this.state.moduleTimings[name] = (currentAvg * 0.9) + (duration * 0.1);
            }
        }
    }
    /**
     * Main execution cycle - implements 8-phase model from original
     * Runs every 300ms via setInterval
     */
    periodic() {
        // Schedule next run FIRST so it always continues regardless of early returns
        this.scheduleNextRun();
        const startTime = performance.now();
        // Declare Game global
        const Game = globalThis.Game;
        // ===== Phase 0: Early exits for timers =====
        if (Game.AscendTimer > 0 || Game.ReincarnateTimer > 0) {
            this.updateTickStats(startTime);
            return;
        }
        // ===== Phase 1: Delay handling =====
        if (this.state.delay > 0) {
            this.state.delay--;
            this.updateTickStats(startTime);
            return;
        }
        // ===== Phase 2: Setup =====
        this.state.now = Date.now();
        // ===== Phase 4: Fast actions (always run every 300ms) =====
        this.measureModule('ClickManager', () => this.clickManager.handleClicking());
        this.measureModule('GoldenCookieHandler', () => this.goldenCookieHandler.handleGoldenCookies());
        // Speed cheat sugar lumps if level 4
        if (this.Config.CheatLumps === 4) {
            this.measureModule('SugarLumpManager', () => this.sugarLumpManager.handleSugarLumps());
        }
        // Run shared slow logic
        this.runSlowLogic();
        // Note: scheduleNextRun() is called at the START of periodic(), not here
        this.updateTickStats(startTime);
    }
    /**
     * Schedule the next periodic execution
     * Original runs at fixed 300ms interval via setInterval
     */
    scheduleNextRun() {
        let delay = 300;
        // Use Dashboard config if available (0=OFF, 1=ON), otherwise fallback to internal config
        const fpsEnabled = (this.Config.FPS !== undefined) ? (this.Config.FPS === 1) : this.config.fpsScaling;
        if (fpsEnabled) {
            const Game = globalThis.Game;
            if (Game && Game.fps && Game.fps > 0) {
                // Standard FPS is 30. If FPS is higher, run faster (lower delay).
                // e.g. 60 FPS -> 300 * (30/60) = 150ms
                delay = Math.floor(300 * (30 / Game.fps));
                // Clamp to reasonable minimum (e.g. 10ms) to prevent freezing
                delay = Math.max(10, delay);
            }
        }
        setTimeout(() => this.periodic(), delay);
    }
    /**
     * Unified bestBuy - compares buildings AND upgrades by payback period
     * Delegates to BuildingManager which has full CookieMonster integration
     * Original: lines 471-615 in cookieAutoPlayBeta.js
     */
    bestBuy() {
        // Delegate to BuildingManager
        this.purchaseManager.bestBuy();
        // Sync purchase info from BuildingManager to AutoPlay state
        const purchaseInfo = this.purchaseManager.getPurchaseInfo();
        if (purchaseInfo) {
            this.state.nextPurchase = purchaseInfo.name;
            this.state.nextPurchaseType = purchaseInfo.type;
            this.state.nextPurchasePP = purchaseInfo.pp;
            this.state.nextPurchasePrice = purchaseInfo.price;
        }
        else {
            this.state.nextPurchase = null;
            this.state.nextPurchaseType = null;
            this.state.nextPurchasePP = null;
            this.state.nextPurchasePrice = null;
        }
    }
    /**
     * Check if an upgrade should be avoided
     * (Moved to BuildingManager.shouldAvoidBuy())
     */
    /**
     * Handle speed minigames - grimoire spells
     * Runs in high-activity phase
     */
    handleSpeedMinigames() {
        // Cast grimoire spells
        this.grimoireManager.handleGrimoires();
    }
    /**
     * Handle periodic minigames - garden, pantheon, stock market
     * Runs every 15 seconds
     */
    handleMinigames() {
        const Game = globalThis.Game;
        if (Game.ascensionMode === 1)
            return; // No minigames in born again mode
        // Handle pantheon spirit assignments
        this.measureModule('PantheonManager', () => this.pantheonManager.handlePantheon());
        // Handle garden planting and harvesting
        this.measureModule('GardenManager', () => this.gardenManager.handleGarden());
        // Update plantPending state from garden
        this.state.plantPending = this.gardenManager.isPlantPending();
        // Handle stock market trading
        this.measureModule('StockMarketManager', () => this.stockMarketManager.handleStockMarket());
    }
    /**
     * Handle notes - extend lifetime of game notifications
     */
    handleNotes() {
        const Game = globalThis.Game;
        for (const i in Game.Notes) {
            if (Game.Notes[i].quick === 0) {
                Game.Notes[i].life = 2000 * Game.fps;
                Game.Notes[i].quick = 1;
            }
        }
    }
    /**
     * Status check - calculate missing achievements/upgrades/lumps
     */
    status(_print = true) {
        const Game = globalThis.Game;
        let ach = 0;
        let sach = 0;
        let up = 0;
        let lum = 0;
        const nonUp = [71, 72, 73, 87, 227];
        // Count missing achievements
        for (const a in Game.Achievements) {
            const me = Game.Achievements[a];
            if (!me.won && me.pool !== 'dungeon') {
                if (me.pool === 'shadow')
                    sach++;
                ach++;
            }
        }
        // Count missing upgrades
        for (const i in Game.Upgrades) {
            const me = Game.Upgrades[i];
            if (!me.bought && me.pool !== 'debug' && me.pool !== 'toggle') {
                if (Game.resets && nonUp.includes(me.id))
                    continue;
                up++;
            }
        }
        // Count missing lumps for building levels
        for (const o in Game.Objects) {
            const me = Game.Objects[o];
            let maxl = 10;
            let myl = 0;
            if (me.id === 0)
                maxl = 12; // Cursors need level 12
            for (let l = me.level + 1; l <= maxl; l++) {
                myl += l;
            }
            lum += myl;
        }
        lum -= Game.lumps;
        if (lum < 0)
            lum = 0;
        // Store status info for dashboard
        this.state.statusInfo = {
            achievements: ach,
            shadowAchievements: sach,
            upgrades: up,
            lumps: lum,
        };
    }
    /**
     * Set deadline to earlier time if needed
     */
    setDeadline(d) {
        if (this.state.deadline > d) {
            this.state.deadline = d;
        }
    }
    /**
     * Check if we're in the endgame phase
     *
     * Returns true when the next achievement is NOT in the wanted list,
     * meaning we've completed all critical path achievements.
     *
     * Original: AutoPlay.endPhase()
     */
    endPhase() {
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        return wantedAchievements.indexOf(this.state.nextAchievement) < 0;
    }
    /**
     * Check if we're in grinding mode (working on final achievements)
     *
     * Grinding mode activates when we've completed all but the last 10 achievements.
     * During grinding, the bot:
     * - Does not sleep at night (stays active 24/7)
     * - Focuses on maximizing cookie production
     *
     * Original: AutoPlay.grinding()
     * @public - Used by NightMode to determine if bot should sleep
     */
    grinding() {
        const Game = globalThis.Game;
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        // Get achievement that starts grinding (10th from end)
        const grindingStart = wantedAchievements[wantedAchievements.length - 10];
        // If we've achieved the grinding start achievement
        if (Game.AchievementsById[grindingStart].won) {
            // And we're not yet in endPhase
            if (!this.endPhase()) {
                Logger.addActivity('Grinding cookies - do not sleep at night.');
                return true;
            }
        }
        return false;
    }
    /**
     * Check if we're in cheating/aggressive mode (working on final 5 achievements)
     *
     * Cheating mode activates when we've completed all but the last 8 achievements.
     * During cheating, the bot uses aggressive golden cookie tactics.
     *
     * Original: AutoPlay.grindingCheat()
     * @public - Used by GoldenCookieHandler for aggressive tactics
     */
    grindingCheat() {
        if (!this.grinding())
            return false;
        const Game = globalThis.Game;
        const wantedAchievements = WANTED_ACHIEVEMENTS;
        // Get achievement that starts cheating (8th from end)
        const cheatingStart = wantedAchievements[wantedAchievements.length - 8];
        // If we've achieved the cheating start achievement
        if (Game.AchievementsById[cheatingStart].won) {
            return true;
        }
        return false;
    }
    /**
     * Check if it's currently pre-night mode (after 10pm)
     * Used by AscensionManager and other modules
     * @public - Used by modules that need to prepare for night
     */
    preNightMode() {
        return this.nightMode.isPreNightMode();
    }
    /**
     * Run Just Right achievement special logic
     *
     * Achievement #397 "Just Right" requires:
     * - Exactly 1 trillion (10^12) cookies baked
     * - Specific building counts (each type has 10 more than the next)
     *
     * This is a multi-phase process:
     * 1. Build up to ~100B cookies with buildings/upgrades
     * 2. Sell buildings to reach exact cookie count
     * 3. Fine-tune by clicking or buying cursors
     * 4. Ascend when exact count reached
     *
     * Original: AutoPlay.runJustRight() (lines 172-223)
     */
    runJustRight() {
        const Game = globalThis.Game;
        // Don't let savings interfere with this achievement
        this.config.savingsGoal = 0;
        Logger.addActivity('Running just right.');
        // Handle ascension checks
        this.ascensionManager.handleAscend();
        // If "You" building exists, we need to start fresh
        const youBuilding = Game.ObjectsById[Game.ObjectsById.length - 1];
        if (youBuilding && youBuilding.amount) {
            this.ascensionManager.triggerAscend('Starting to ascend just right properly.');
            return;
        }
        const goal = 1000000000000; // 1 trillion exact
        const notBuy = [0, 1, 2, 3, 4, 5, 6, 129, 324]; // Upgrades to avoid
        // Phase 1: Build up phase (< 100B cookies)
        if (Game.cookies < goal / 10) {
            // Buy buildings (each type should have 10 more than the next)
            for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
                const building = Game.ObjectsById[i];
                const nextBuilding = Game.ObjectsById[i + 1];
                const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);
                if (building.getPrice() < Game.cookies && building.amount < targetAmount) {
                    building.buy(1);
                    return;
                }
            }
            // Buy upgrades (except blocked ones)
            for (const upgradeId in Game.UpgradesById) {
                const upgrade = Game.UpgradesById[upgradeId];
                if (upgrade.unlocked &&
                    !upgrade.bought &&
                    upgrade.canBuy() &&
                    upgrade.pool !== 'toggle' &&
                    notBuy.indexOf(upgrade.id) < 0) {
                    upgrade.buy(true);
                }
            }
        }
        else {
            // Phase 2: Precision phase (>= 100B cookies)
            const cookieDiff = goal - Game.cookies;
            if (Game.BuildingsOwned === 0) {
                // Phase 2a: All buildings sold - fine-tune cookie count
                if (cookieDiff < 0) {
                    // Overshot - increment counter for cursor adjustment
                    if (!this.state.runRightCount)
                        this.state.runRightCount = 0;
                    this.state.runRightCount++;
                }
                if (Math.round(Game.cookiesd) === goal) {
                    // Perfect! Ascend with success
                    this.ascensionManager.triggerAscend('Fixed run just right.', true);
                }
                else if (cookieDiff < -goal && this.state.now - Game.startDate > 60000) {
                    // Too far off after 1 minute - retry
                    this.ascensionManager.triggerAscend('ascend just right did not work, retry.', false);
                }
                else if (cookieDiff < -2000000000) {
                    // Way over - buy many cursors to burn cookies
                    Game.ObjectsById[BUILDING_IDS.CURSOR].buy(130 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < -6000000) {
                    // Over by 6M - buy cursors
                    Game.ObjectsById[BUILDING_IDS.CURSOR].buy(90 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < -30000) {
                    // Over by 30k - buy cursors
                    Game.ObjectsById[BUILDING_IDS.CURSOR].buy(50 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff < 0) {
                    // Slightly over - buy few cursors
                    Game.ObjectsById[BUILDING_IDS.CURSOR].buy(22 + (this.state.runRightCount || 0));
                }
                else if (cookieDiff > 10000000) {
                    // Need >10M - buy bank
                    Game.ObjectsById[BUILDING_IDS.BANK].buy(1);
                }
                else if (cookieDiff > 500000) {
                    // Need >500k - buy factory
                    Game.ObjectsById[BUILDING_IDS.FACTORY].buy(1);
                }
                else if (cookieDiff > 5000) {
                    // Need >5k - buy farm
                    Game.ObjectsById[BUILDING_IDS.FARM].buy(1);
                }
                else if (cookieDiff > 50) {
                    // Need >50 - buy cursor
                    Game.ObjectsById[BUILDING_IDS.CURSOR].buy(1);
                }
                else {
                    // Very close - just click
                    Game.ClickCookie();
                }
            }
            else {
                // Phase 2b: Still have buildings - sell them off
                if (cookieDiff / Game.cookiesPs > 1000) {
                    // Need more cookies first - buy a bank
                    Game.ObjectsById[BUILDING_IDS.BANK].buy(1);
                }
                // Sell excess buildings (keep 10 more than next type)
                for (let i = Game.ObjectsById.length - 2; i >= 0; i--) {
                    const building = Game.ObjectsById[i];
                    const nextBuilding = Game.ObjectsById[i + 1];
                    const targetAmount = 10 + (nextBuilding ? nextBuilding.amount : 0);
                    if (building.amount > targetAmount) {
                        building.sell(building.amount - targetAmount);
                        return;
                    }
                    // Sell buildings if their value would overshoot goal
                    if (building.amount > 0 &&
                        4 * building.getReverseSumPrice(building.amount) + Game.cookiesPs > cookieDiff) {
                        building.sell(100);
                    }
                }
            }
        }
    }
    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        try {
            const saved = localStorage.getItem('CookieBot_Config');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.config = { ...this.config, ...parsed };
                console.log('Configuration loaded from localStorage');
            }
        }
        catch (error) {
            console.error('Failed to load configuration:', error);
        }
    }
    /**
     * Save configuration to localStorage
     */
    saveConfig() {
        try {
            localStorage.setItem('CookieBot_Config', JSON.stringify(this.config));
            console.log('Configuration saved to localStorage');
        }
        catch (error) {
            console.error('Failed to save configuration:', error);
        }
    }
    /**
     * Get default configuration
     */
    getDefaultConfig() {
        return {
            nightMode: false,
            fontSize: 12,
            menuPos: [0, 0],
            autoGoldenCookie: true,
            autoReindeer: true,
            autoFrenzy: true,
            autoClickingFrenzy: true,
            autoElderFrenzy: false,
            autoSeason: true,
            autoAscend: false,
            autoSugarLumps: true,
            autoWrinklers: true,
            fpsScaling: true,
            clickMode: 1, // 0=off, 1=normal, 2+=aggressive
            cheatLumps: 0, // 0=off, 1=auto, 2-4=manual levels
            cheatGolden: 0, // 0=off, 1=auto, 2+=manual levels
            buyMode: 'pp',
            minCookieBank: 0,
            savingsGoal: 0,
            savingsEnabled: true,
            SavingStrategy: 0, // 0=NONE, 1=AUTO, 2=LUCKY, 3=LUCKY_FRENZY
            seasonOrder: ['christmas', 'valentines', 'easter', 'halloween'],
            currentSeasonIndex: 0,
        };
    }
    /**
     * Get default state
     */
    getDefaultState() {
        const now = Date.now();
        return {
            version: AutoPlay_AutoPlay.version,
            now: now,
            lastCheck: 0,
            timeToNextBuy: 0,
            delay: 0,
            deadline: now + 15000, // Start with 15s deadline
            hyperActive: false,
            nextAchievement: 0,
            workingOnSpecialAchievement: false,
            plantPending: false,
            nextPurchase: null,
            nextPurchaseType: null,
            nextPurchasePP: null,
            nextPurchasePrice: null,
            buy10: false,
            savingsStart: now,
            savingsFraction: 0,
            mainActivity: 'Doing nothing in particular.',
            activities: 'Doing nothing in particular.',
            menuVisible: false,
            nextWrinkler: -1,
            poppingWrinklers: false,
            wrinklerTime: now,
            wantAscend: false,
            finished: false,
            isInitialized: false,
            lastTickDuration: 0,
            avgTickDuration: 0,
            moduleTimings: {},
        };
    }
    /**
     * Reset the bot state and configuration to defaults
     * Allows re-initialization
     */
    reset() {
        this.state = this.getDefaultState();
        this.config = this.getDefaultConfig();
        this.state.isInitialized = false;
        console.log('CookieBot reset to default state.');
    }
    /**
     * Toggle dashboard visibility
     */
    toggleDashboard() {
        this.state.menuVisible = !this.state.menuVisible;
        this.dashboard.toggle();
    }
    /**
     * Toggle night mode
     */
    toggleNightMode() {
        this.config.nightMode = !this.config.nightMode;
        this.saveConfig();
    }
    /**
     * Get current configuration (for external access)
     */
    getConfig() {
        return this.config;
    }
    /**
     * Update configuration (for external access)
     */
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        this.saveConfig();
    }
    /**
     * Get current state (for external access)
     */
    getState() {
        return this.state;
    }
}
// Version
AutoPlay_AutoPlay.version = '2.052-89';
/* harmony default export */ const src_AutoPlay = (AutoPlay_AutoPlay);

;// ./src/index.ts
/**
 * CookieBot - Automated Cookie Clicker Bot
 * Entry point for the application
 */

// Export AutoPlay class as default for webpack
/* harmony default export */ const src = ((/* unused pure expression or super */ null && (AutoPlay)));
// Auto-initialize when loaded and expose instance globally
if (typeof Game !== 'undefined' && Game.ready) {
    const bot = new src_AutoPlay();
    globalThis.AutoPlay = bot;
    bot.init();
}
else {
    console.log('CookieBot: Waiting for Cookie Clicker to be ready...');
    const checkReady = setInterval(() => {
        if (typeof Game !== 'undefined' && Game.ready) {
            clearInterval(checkReady);
            const bot = new src_AutoPlay();
            globalThis.AutoPlay = bot;
            bot.init();
        }
    }, 1000);
}

/******/ })()
;