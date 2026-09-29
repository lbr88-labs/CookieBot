/**
 * Game object IDs for Cookie Clicker
 *
 * These constants provide type-safe access to game objects by ID.
 * Using constants instead of magic numbers improves code readability
 * and prevents typos.
 */

// ==================== Achievements ====================

export const ACHIEVEMENT_IDS = {
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
} as const;

// ==================== Upgrades ====================

export const UPGRADE_IDS = {
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
} as const;

// ==================== Buildings ====================

export const BUILDING_IDS = {
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
} as const;

// ==================== Building Names ====================

export const BUILDING_NAMES = {
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
} as const;

// ==================== Pantheon Spirits ====================

export const SPIRIT_IDS = {
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
} as const;

export const SPIRIT_NAMES = {
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
} as const;

// ==================== Dragon Auras ====================

export const DRAGON_AURA_IDS = {
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
} as const;

// ==================== Season Types ====================

export const SEASON_NAMES = {
  NONE: '',
  CHRISTMAS: 'christmas',
  EASTER: 'easter',
  HALLOWEEN: 'halloween',
  VALENTINES: 'valentines',
} as const;

// ==================== Garden Plants ====================

export const PLANT_KEYS = {
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
} as const;

// Harvestable plants that drop cookies
export const HARVESTABLE_PLANTS = [
  PLANT_KEYS.BAKEBERRY,
  PLANT_KEYS.CHOCOROOT,
  PLANT_KEYS.WHITE_CHOCOROOT,
  PLANT_KEYS.QUEENBEET,
  PLANT_KEYS.QUEENBEET_LUMP,
  PLANT_KEYS.DUKETATER,
] as const;

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
export const PLANT_DEPENDENCIES: ReadonlyArray<readonly [string, string, string]> = [
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
] as const;

// ==================== Stock Market Goods ====================

// Stock market good IDs match their index in market.goods array
export const STOCK_GOOD_IDS = {
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
} as const;

// ==================== Grimoire Spells ====================

export const SPELL_NAMES = {
  CONJURE_BAKED_GOODS: 'conjure baked goods',
  HAND_OF_FATE: 'hand of fate',
  STRETCH_TIME: 'stretch time',
  SPONTANEOUS_EDIFICE: 'spontaneous edifice',
  HAGGLER_LUCK: 'haggler\'s luck',
  SUMMON_CRAFTY_PIXIES: 'summon crafty pixies',
  GAMBLER_FEVER_DREAM: 'gambler\'s fever dream',
  RESURRECT_ABOMINATION: 'resurrect abomination',
  FORCE_THE_HAND_OF_FATE: 'force the hand of fate',
} as const;

// ==================== Buff Names ====================

export const BUFF_NAMES = {
  FRENZY: 'Frenzy',
  LUCKY: 'Lucky',
  CLICK_FRENZY: 'Click frenzy',
  DRAGONFLIGHT: 'Dragonflight',
  ELDER_FRENZY: 'Elder frenzy',
  CLOT: 'Clot',
  CURSED_FINGER: 'Cursed finger',
  BUILDING_SPECIAL: 'Building special',
  EVERYTHING_MUST_GO: 'Everything must go',
} as const;

// ==================== Helper Arrays ====================

// Upgrades to avoid buying (for grandmapocalypse control)
export const NON_ASCENSION_UPGRADES = [71, 72, 73, 87, 227] as const;

// Garden upgrade IDs
export const GARDEN_UPGRADE_IDS = [470, 471, 472, 473, 474, 475, 476] as const;

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
export const WANTED_ACHIEVEMENTS = [
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
] as const;

/**
 * Kitten upgrade IDs (boost CPS by milk percentage)
 */
export const KITTEN_UPGRADES = [
  31, 32, 54, 108, 187, 320, 321, 322, 425, 442, 462, 494, 613, 766, 865,
] as const;

/**
 * Cursor upgrade IDs (special upgrades for cursor building)
 */
export const CURSOR_UPGRADES = [
  0, 1, 2, 3, 4, 5, 6, 43, 82, 109, 188, 189, 660, 764, 873,
] as const;

/**
 * Sugar lump related achievements
 * These achievements require sugar lumps to complete
 * When all are achieved, the `finished` flag is set to true
 *
 * Includes:
 * - Building level achievements (307-319: level 10 for each building)
 * - Other lump-requiring achievements (336, 427, 447, 525, 396, 268, 271)
 */
export const LUMP_RELATED_ACHIEVEMENTS = [
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
] as const;
