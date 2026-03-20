// ═══════════════════════════════════════════════════════════════════
// defs.js — Game constants (shared: server + client)
//
// Single source of truth for names, costs, and classification tables.
// Previously duplicated across app.js, events.js, citydialog.js, renderer.js.
// ═══════════════════════════════════════════════════════════════════

export const GOVERNMENT_NAMES = [
  'Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy'
];

export const TERRAIN_NAMES = [
  'Desert','Plains','Grassland','Forest','Hills','Mountains',
  'Tundra','Glacier','Swamp','Jungle','Ocean'
];

export const RESOURCE_NAMES = [
  ['Oasis','Desert Oil'],['Buffalo','Wheat'],['Grassland Shield','Grassland Resource'],
  ['Pheasant','Silk'],['Coal','Wine'],['Gold','Iron'],['Game','Furs'],['Ivory','Oil'],
  ['Peat','Spice'],['Gems','Fruit'],['Fish','Whales']
];

export const COMMODITY_NAMES = [
  'Hides','Wool','Beads','Cloth','Salt','Coal','Copper','Dye',
  'Wine','Silk','Silver','Spice','Gems','Gold','Oil','Uranium'
];

export const ORDER_NAMES = {
  // Parser-style names (from .sav files)
  none:'', fortifying:'Fortifying', fortified:'Fortified', sleep:'Sleep',
  buildFortress:'Build Fortress', buildRoad:'Build Road',
  buildIrrigation:'Build Irrigation', buildMine:'Build Mine',
  transform:'Transform', cleanPollution:'Clean Pollution',
  buildAirbase:'Build Airbase', goto:'GoTo',
  // Reducer-style names (multiplayer worker/unit orders)
  sentry:'Sentry', skip:'',
  road:'Build Road', railroad:'Build Railroad', irrigation:'Build Irrigation',
  mine:'Build Mine', fortress:'Build Fortress', airbase:'Build Airbase',
  pollution:'Clean Pollution',
};

export const UNIT_NAMES = [
  'Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen','Musketeers',   // 0-7
  'Fanatics','Partisans','Alpine Troops','Riflemen','Marines','Paratroopers','Mech. Inf.', // 8-14
  'Horsemen','Chariot','Elephant','Crusaders','Knights','Dragoons','Cavalry','Armor',       // 15-22
  'Catapult','Cannon','Artillery','Howitzer','Fighter','Bomber','Helicopter',               // 23-29
  'Stealth Fighter','Stealth Bomber','Trireme','Caravel','Galleon','Frigate','Ironclad',    // 30-36
  'Destroyer','Cruiser','AEGIS Cruiser','Battleship','Submarine','Carrier','Transport',     // 37-43
  'Cruise Msl.','Nuclear Msl.','Diplomat','Spy','Caravan','Freight','Explorer',             // 44-50
  'Extra Land',                                                                             // 51
];

export const WONDER_NAMES = [
  'Pyramids', 'Hanging Gardens', 'Colossus', 'Lighthouse', 'Great Library',
  'Oracle', 'Great Wall', "Sun Tzu's War Academy", "King Richard's Crusade",
  "Marco Polo's Embassy", "Michelangelo's Chapel", "Copernicus' Observatory",
  "Magellan's Expedition", "Shakespeare's Theatre", "Leonardo's Workshop",
  "J.S. Bach's Cathedral", "Isaac Newton's College", "Adam Smith's Trading Co.",
  "Darwin's Voyage", 'Statue of Liberty', 'Eiffel Tower', "Women's Suffrage",
  'Hoover Dam', 'Manhattan Project', 'United Nations', 'Apollo Program',
  'SETI Program', 'Cure for Cancer'
];

// Improvement names indexed by building ID (1-38, matching parser bitmask order). Index 0 unused.
export const IMPROVE_NAMES = {
  1: 'Palace', 2: 'Barracks', 3: 'Granary', 4: 'Temple', 5: 'Marketplace',
  6: 'Library', 7: 'Courthouse', 8: 'City Walls', 9: 'Aqueduct', 10: 'Bank',
  11: 'Cathedral', 12: 'University', 13: 'Mass Transit', 14: 'Colosseum',
  15: 'Factory', 16: 'Mfg. Plant', 17: 'SDI Defense', 18: 'Recycling Center',
  19: 'Power Plant', 20: 'Hydro Plant', 21: 'Nuclear Plant', 22: 'Stock Exchange',
  23: 'Sewer System', 24: 'Supermarket', 25: 'Superhighways', 26: 'Research Lab',
  27: 'SAM Battery', 28: 'Coastal Fortress', 29: 'Solar Plant', 30: 'Harbour',
  31: 'Offshore Platform', 32: 'Airport', 33: 'Police Station', 34: 'Port Facility',
  35: 'SS Structural', 36: 'SS Component', 37: 'SS Module', 38: 'Capitalization',
};

// Standard MGE RULES.TXT costs (shield rows — same scale as tile production)
export const UNIT_COSTS = [4,4,1,2,3,4,2,3,2,5,5,4,6,6,5,2,3,4,4,4,5,6,8,4,4,5,7,6,12,10,8,16,4,4,4,5,6,6,8,10,16,6,16,5,6,16,3,3,5,5,3,5,5,10,4,4,4,4,4,4,4,4,4];
export const IMPROVE_COSTS = [1,10,4,6,4,8,8,8,8,8,12,12,16,16,10,20,32,20,20,16,24,16,16,12,8,20,16,10,8,32,6,16,16,6,8,8,16,32,60];
export const WONDER_COSTS = [20,20,20,20,30,30,30,30,30,20,40,30,40,30,40,40,40,40,40,40,30,60,60,60,60,60,60,60];

// Building maintenance cost per turn (gold, indexed by building ID 1-38; index 0 unused)
// From standard MGE RULES.TXT @IMPROVE section
export const IMPROVE_MAINTENANCE = [
  0, // 0: (unused)
  0, // 1: Palace
  1, // 2: Barracks
  1, // 3: Granary
  1, // 4: Temple
  1, // 5: Marketplace
  1, // 6: Library
  1, // 7: Courthouse
  0, // 8: City Walls
  2, // 9: Aqueduct
  3, // 10: Bank
  3, // 11: Cathedral
  3, // 12: University
  4, // 13: Mass Transit
  4, // 14: Colosseum
  4, // 15: Factory (RULES.TXT: 4, was 3)
  6, // 16: Mfg. Plant
  4, // 17: SDI Defense
  2, // 18: Recycling Center
  4, // 19: Power Plant (RULES.TXT: 4, was 3)
  4, // 20: Hydro Plant (RULES.TXT: 4, was 3)
  2, // 21: Nuclear Plant (RULES.TXT: 2, was 3)
  4, // 22: Stock Exchange
  2, // 23: Sewer System
  3, // 24: Supermarket
  5, // 25: Superhighways (RULES.TXT: 5, was 3)
  3, // 26: Research Lab
  2, // 27: SAM Battery
  1, // 28: Coastal Fortress
  4, // 29: Solar Plant (RULES.TXT: 4, was 3)
  1, // 30: Harbour
  3, // 31: Offshore Platform
  3, // 32: Airport (RULES.TXT: 3, was 5)
  2, // 33: Police Station
  3, // 34: Port Facility
  0, // 35: SS Structural
  0, // 36: SS Component
  0, // 37: SS Module
  0, // 38: Capitalization
];

// Civ palette colors (indexed by civ slot 0-7)
export const CIV_COLORS = ['#c80000','#ffffff','#00b400','#3250dc','#f0dc00','#00c8c8','#f08c00','#b400c8'];

// Standard civ names from LEADERS.TXT (indexed by rulesCivNumber)
export const LEADERS_TXT_NAMES = [
  'Romans','Babylonians','Germans','Egyptians','Americans','Greeks','Indians','Russians',
  'Zulus','French','Aztecs','Chinese','English','Mongols','Celts','Japanese','Vikings',
  'Spanish','Persians','Carthaginians','Sioux'
];

// Unit orders byte → shield display letter (renderer uses these)
export const ORDER_KEYS = {
  // Parser-style names (from .sav files)
  fortifying:'F', fortified:'F', sleep:'S', buildFortress:'F',
  buildRoad:'R', buildIrrigation:'I', buildMine:'m', transform:'O',
  cleanPollution:'p', buildAirbase:'E', goto:'G',
  // Reducer-style names (multiplayer worker/unit orders)
  road:'R', railroad:'R', irrigation:'I', mine:'m',
  fortress:'F', airbase:'E', pollution:'p', sentry:'S',
};

// Improvement byte → object converter
// Bits: 0x02=city/airbase marker, 0x04=irrigation, 0x08=mining,
//       0x10=road, 0x20=railroad, 0x40=fortress, 0x80=pollution
export const EMPTY_IMP = Object.freeze({
  city: false, irrigation: false, mining: false,
  road: false, railroad: false, fortress: false, pollution: false,
  farmland: false, airbase: false,
});
export function improvementFromByte(b) {
  if (b === 0) return EMPTY_IMP;
  const city    = !!(b & 0x02);
  const irr     = !!(b & 0x04);
  const mine    = !!(b & 0x08);
  const fort    = !!(b & 0x40);
  return {
    city,
    irrigation: irr,
    mining:     mine,
    road:       !!(b & 0x10),
    railroad:   !!(b & 0x20),
    fortress:   fort,
    pollution:  !!(b & 0x80),
    farmland:   irr && mine,
    airbase:    city && fort,
  };
}

// Unit type classifications
export const SETTLER_TYPES = new Set([0, 1]);
export const NON_COMBAT_TYPES = new Set([0, 1, 46, 47, 48, 49, 50]);
export const SUPPORT_EXEMPT_TYPES = new Set([46, 47, 48, 49]);
export const FANATIC_TYPES = new Set([8]);
export const SEA_COMBAT_TYPES = new Set([35, 36, 37, 38, 39, 40, 41]);
export const SEA_TRANSPORT_TYPES = new Set([32, 33, 34, 43]);

// Units with flagsA & 0x20 — "no sea bonus" flag (skip Lighthouse MP bonus).
// In vanilla Civ2: Trireme(32), Caravel(33), Galleon(34), Carrier(42), Transport(43).
// Raw C FUN_005b2a39: checks unit_types[type].flagsA & 0x20 before applying Lighthouse.
export const UNIT_NO_LIGHTHOUSE_BONUS = new Set([32, 33, 34, 42, 43]);

// Transport capacity (only units that can carry others)
// Trireme=2, Caravel=3, Galleon=4, Carrier=8 (air only), Transport=8
export const UNIT_CARRY_CAP = [];
UNIT_CARRY_CAP[32] = 2;  UNIT_CARRY_CAP[33] = 3;
UNIT_CARRY_CAP[34] = 4;  UNIT_CARRY_CAP[42] = 8;  UNIT_CARRY_CAP[43] = 8;

// Free unit support slots by government (COSMIC defaults)
export const COSMIC_FREE_SUPPORT = { monarchy: 3, communism: 3, fundamentalism: 10 };

// Movement constants (from RULES.TXT)
export const MOVEMENT_MULTIPLIER = 3; // each movement point = 3 movement "thirds"

// Terrain movement costs (indexed by terrain type 0-10)
// Desert=1, Plains=1, Grassland=1, Forest=2, Hills=2, Mountains=3,
// Tundra=1, Glacier=2, Swamp=2, Jungle=2, Ocean=1
export const TERRAIN_MOVE_COST = [1, 1, 1, 2, 2, 3, 1, 2, 2, 2, 1];

// Unit movement points (indexed by unit type 0-51, from RULES.TXT)
export const UNIT_MOVE_POINTS = [
  1, 2, 1, 1, 1, 1, 1, 1,   // 0-7:  Settlers..Musketeers
  1, 1, 1, 1, 1, 1, 3,       // 8-14: Fanatics..Mech.Inf.
  2, 2, 2, 2, 2, 2, 2, 3,    // 15-22: Horsemen..Armor
  1, 1, 1, 2, 10, 8, 6,      // 23-29: Catapult..Helicopter
  14, 12, 3, 3, 4, 4, 4,     // 30-36: StealthF..Ironclad
  5, 5, 5, 4, 3, 5, 5,       // 37-43: Destroyer..Transport (Cruiser=5, AEGIS=5 per RULES.TXT)
  12, 16, 2, 3, 1, 2, 1,     // 44-50: CruiseMsl..Explorer (Freight=2 per RULES.TXT)
  1,                          // 51:   Extra Land
];

// Air unit fuel (turns away from city/carrier before crashing, 0=unlimited)
export const UNIT_FUEL = [];
UNIT_FUEL[27] = 1;  // Fighter
UNIT_FUEL[28] = 2;  // Bomber
UNIT_FUEL[30] = 1;  // Stealth Fighter
UNIT_FUEL[31] = 2;  // Stealth Bomber
UNIT_FUEL[44] = 1;  // Cruise Missile
UNIT_FUEL[45] = 1;  // Nuclear Missile
// Helicopter (29) has unlimited fuel (no entry)

// Unit range: operational range field from RULES.TXT (0=unlimited, >=99 requires SpaceFlight tech)
// Standard units all have range 0; range >= 99 is used by modded scenarios
export const UNIT_RANGE = [
  0, 0, 0, 0, 0, 0, 0, 0,   // 0-7:  Settlers..Musketeers
  0, 0, 0, 0, 0, 0, 0,       // 8-14: Fanatics..Mech.Inf.
  0, 0, 0, 0, 0, 0, 0, 0,    // 15-22: Horsemen..Armor
  0, 0, 0, 0, 0, 0, 0,       // 23-29: Catapult..Helicopter
  0, 0, 0, 0, 0, 0, 0,       // 30-36: StealthF..Ironclad
  0, 0, 0, 0, 0, 0, 0,       // 37-43: Destroyer..Transport
  0, 0, 0, 0, 0, 0, 0,       // 44-50: CruiseMsl..Explorer
  0,                          // 51: Extra Land
];

// Domain constants — matches binary convention (0=ground, 1=air, 2=sea)
export const DOMAIN_GROUND = 0;
export const DOMAIN_AIR = 1;
export const DOMAIN_SEA = 2;

// Unit domain: 0=ground, 1=air, 2=sea (indexed by unit type 0-51)
// Binary convention: matches decompiled Civ2 domain numbering
export const UNIT_DOMAIN = [
  0, 0, 0, 0, 0, 0, 0, 0,   // 0-7:  Settlers..Musketeers (ground)
  0, 0, 0, 0, 0, 0, 0,       // 8-14: Fanatics..Mech.Inf. (ground)
  0, 0, 0, 0, 0, 0, 0, 0,    // 15-22: Horsemen..Armor (ground)
  0, 0, 0, 0, 1, 1, 1,       // 23-29: Catapult..Helicopter (27-29=air)
  1, 1, 2, 2, 2, 2, 2,       // 30-36: StealthF..Ironclad (30-31=air, 32-36=sea)
  2, 2, 2, 2, 2, 2, 2,       // 37-43: Destroyer..Transport (sea)
  1, 1, 0, 0, 0, 0, 0,       // 44-50: CruiseMsl..Explorer (44-45=air)
  0,                          // 51: Extra Land (ground)
];

// Unit flags (per RULES.TXT specification)
// Bit flags: [ignoreZOC, negatesCityWalls, destroyedAfterAttack, canCarryAir, alpine, pikemanBonus, aegisBonus, submarine]
export const UNIT_IGNORE_ZOC = [
  // Settlers(0) through Explorer(50), ExtraLand(51)
  // Non-combat, diplomats, spies, caravans, freight = ignore ZOC
  // All air units (27-31) ignore ZOC
  // All sea units (32-43) ignore ZOC
  1, 1, 0, 0, 0, 0, 0, 0,   // 0-7: settlers,engineers ignore; warriors-musketeers don't
  0, 1, 0, 0, 0, 0, 0,       // 8-14: fanatics-mech.inf (Partisans=9 ignore ZOC per RULES.TXT)
  0, 0, 0, 0, 0, 0, 0, 0,   // 15-22: horsemen-armor don't
  0, 0, 0, 0,                 // 23-26: catapult-howitzer don't
  1, 1, 1, 1, 1,             // 27-31: all air ignore ZOC
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 32-43: all sea ignore ZOC
  1, 1,                       // 44-45: missiles ignore ZOC
  1, 1,                       // 46-47: diplomat, spy ignore ZOC
  1, 1, 1, 1,                 // 48-51: caravan, freight, explorer, extra ignore ZOC
];

// Units destroyed after attacking (missiles)
export const UNIT_DESTROYED_AFTER_ATTACK = new Set([44, 45]); // Cruise Missile, Nuclear Missile

// Units that negate city walls
export const UNIT_NEGATES_WALLS = new Set([26]); // Howitzer

// Units with pikeman defense bonus (double defense vs mounted/horse units)
// From RULES.TXT flags bit 13 (0x2000)
export const UNIT_PIKEMAN_BONUS = new Set([6]); // Pikemen

// Units classified as "mounted" — vulnerable to pikeman defense bonus
// Standard Civ2 mounted units: all horse/cavalry/elephant types
export const MOUNTED_UNITS = new Set([
  15,  // Horsemen
  16,  // Chariot
  17,  // Elephant
  18,  // Crusaders
  19,  // Knights
  20,  // Dragoons
  21,  // Cavalry
  22,  // Armor (tanks are "mounted" in game engine)
]);

// Units with Aegis defense bonus (double defense vs air and missile attacks)
// From RULES.TXT flags bit 14 (0x4000)
export const UNIT_AEGIS_BONUS = new Set([39]); // AEGIS Cruiser (type 39)

// Units with anti-air capability (flagsB & 0x20)
// ×3 defense vs non-missile air, ×5 vs missile air
// In standard RULES.TXT: AEGIS Cruiser (39) has this flag
export const UNIT_ANTI_AIR = new Set([39]); // AEGIS Cruiser

// Terrain transformation table for engineers (Transform order)
// Index by terrain type → result terrain. -1 = cannot transform
export const TERRAIN_TRANSFORM = [
//  desert plains grass  forest hills  mount  tundra glacier swamp jungle ocean
    1,     2,     4,     2,     1,     4,     0,     6,     1,    1,     -1
// Corrected per RULES.TXT: Grass→Hills, Forest→Grass, Hills→Plains, Swamp→Plains, Jungle→Plains
];
// Transform turns (engineer-only, before halving)
export const TRANSFORM_TURNS = [
    5,     10,    10,    10,    10,    20,    10,    20,    15,   15,    0
];

// ── Combat stats (indexed by unit type 0-51, from RULES.TXT @UNITS) ──

// Attack strength
export const UNIT_ATK = [
  0, 0, 1, 1, 3, 4, 1, 3,   // 0-7:  Settlers..Musketeers
  4, 4, 5, 5, 8, 6, 6,       // 8-14: Fanatics..Mech.Inf.
  2, 3, 4, 5, 4, 5, 8, 10,   // 15-22: Horsemen..Armor
  6, 8, 10, 12, 4, 12, 10,   // 23-29: Catapult..Helicopter
  8, 14, 1, 2, 0, 4, 4,      // 30-36: StealthF..Ironclad
  4, 6, 8, 12, 10, 1, 0,     // 37-43: Destroyer..Transport
  18, 99, 0, 0, 0, 0, 0,     // 44-50: CruiseMsl..Explorer
  1,                          // 51:   Extra Land
];

// Defense strength
export const UNIT_DEF = [
  1, 2, 1, 2, 2, 2, 2, 3,   // 0-7
  4, 4, 5, 4, 5, 4, 6,       // 8-14
  1, 1, 1, 1, 2, 2, 3, 5,    // 15-22
  1, 1, 1, 2, 3, 1, 3,       // 23-29
  4, 5, 1, 1, 2, 2, 4,       // 30-36
  4, 6, 8, 12, 2, 9, 3,      // 37-43
  0, 0, 0, 0, 1, 1, 1,       // 44-50
  1,                          // 51
];

// Hit points (×10 internally in game, but we use raw values)
export const UNIT_HP = [
  2, 2, 1, 1, 1, 1, 1, 2,   // 0-7
  2, 2, 2, 2, 2, 2, 3,       // 8-14
  1, 1, 1, 1, 1, 2, 2, 3,    // 15-22
  1, 2, 2, 3, 2, 2, 2,       // 23-29
  2, 2, 1, 1, 2, 2, 3,       // 30-36
  3, 3, 3, 4, 3, 4, 3,       // 37-43
  1, 1, 1, 1, 1, 1, 1,       // 44-50
  1,                          // 51
];

// Firepower (damage per hit)
export const UNIT_FP = [
  1, 1, 1, 1, 1, 1, 1, 1,   // 0-7
  1, 1, 1, 1, 1, 1, 1,       // 8-14
  1, 1, 1, 1, 1, 1, 1, 1,    // 15-22
  1, 1, 2, 2, 2, 2, 2,       // 23-29
  2, 2, 1, 1, 1, 1, 1,       // 30-36
  1, 2, 2, 2, 2, 2, 1,       // 37-43
  3, 1, 1, 1, 1, 1, 1,       // 44-50
  1,                          // 51
];

// Terrain defense multiplier (from RULES.TXT @TERRAIN defense field)
// Value × 50% = effective defense %. E.g., 3 → 150%, 6 → 300%
export const TERRAIN_DEFENSE = [2, 2, 2, 3, 4, 6, 2, 2, 3, 3, 2];

// ── Settler/Engineer improvement work turns (from RULES.TXT @TERRAIN) ──
// Turns for settler to irrigate each terrain type (0 = cannot irrigate)
export const IRRIGATION_TURNS = [5, 5, 5, 5, 10, 0, 10, 0, 15, 15, 0];
// Turns for settler to mine each terrain type (0 = cannot mine)
export const MINING_TURNS     = [5, 15, 10, 0, 10, 10, 0, 15, 15, 15, 0];
// Does irrigation add irrigation (true) or transform terrain (false=check IRR_TRANSFORM)?
export const CAN_IRRIGATE = [true, true, true, false, true, false, true, false, false, false, false];
// Terrain transformation when "irrigating" non-irrigable terrain (-1 = n/a)
// Forest→Plains, Swamp→Grassland, Jungle→Grassland
export const IRR_TRANSFORM = [-1, -1, -1, 1, -1, -1, -1, -1, 2, 2, -1];
// Does mining add mining (true) or transform terrain?
export const CAN_MINE = [true, false, false, false, true, true, false, true, false, false, false];
// Terrain transformation when "mining" non-minable terrain (-1 = n/a)
// Plains→Forest, Grassland→Forest, Swamp→Forest, Jungle→Forest
export const MINE_TRANSFORM = [-1, 3, 3, -1, -1, -1, -1, -1, 3, 3, -1];
// Fixed work durations
export const ROAD_TURNS = 2;
export const FORTRESS_TURNS = 5;
export const AIRBASE_TURNS = 5;
export const POLLUTION_TURNS = 5;

// City radius tile offsets in doubled-X coordinates (21 tiles)
// Indices 0-7: inner ring, 8-19: outer ring, 20: center
export const CITY_RADIUS_DOUBLED = [
  [+1,-1],[+2,0],[+1,+1],[0,+2],[-1,+1],[-2,0],[-1,-1],[0,-2],
  [+2,-2],[+2,+2],[-2,+2],[-2,-2],
  [+1,-3],[+3,-1],[+3,+1],[+1,+3],[-1,+3],[-3,+1],[-3,-1],[-1,-3],
  [0,0]
];

// Extended city radius tile offsets (25 tiles = 21 city radius + 4 outer)
// Used by SURROUNDING_TILE_ANALYSIS (FUN_004e7641) for AI threat assessment.
// Indices 0-20: same as CITY_RADIUS_DOUBLED; 21-24: N/E/S/W at distance 4 (doubled coords)
export const CITY_RADIUS_EXTENDED = [
  ...CITY_RADIUS_DOUBLED,
  [0,-4],[+4,0],[0,+4],[-4,0],
];

// Base terrain yields [food, shields, trade] (indexed by terrain type 0-10)
export const TERRAIN_BASE = [
  [0, 1, 0], // 0 Desert
  [1, 1, 0], // 1 Plains
  [2, 0, 0], // 2 Grassland
  [1, 2, 0], // 3 Forest
  [1, 0, 0], // 4 Hills
  [0, 1, 0], // 5 Mountains
  [1, 0, 0], // 6 Tundra
  [0, 0, 0], // 7 Glacier
  [1, 0, 0], // 8 Swamp
  [1, 0, 0], // 9 Jungle
  [1, 0, 2], // 10 Ocean
];

// Irrigation bonus per terrain (city center counts as irrigated)
export const IRRIGATION_BONUS = [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0];

// Mining bonus per terrain (shields, only when mining present without irrigation)
export const MINING_BONUS = [1, 0, 0, 0, 3, 1, 0, 1, 0, 0, 0];

// Special resource total yields [food, shields, trade] (indexed by terrain, then resource 1 or 2)
export const SPECIAL_TOTAL = [
  [[3, 1, 0], [0, 4, 0]],   // 0 Desert: Oasis, Oil
  [[1, 3, 0], [3, 1, 0]],   // 1 Plains: Buffalo, Wheat
  [null,      [2, 1, 0]],   // 2 Grassland: (shield handled separately), Resources
  [[3, 2, 0], [1, 2, 3]],   // 3 Forest: Pheasant, Silk
  [[1, 2, 0], [1, 0, 4]],   // 4 Hills: Coal, Wine
  [[0, 1, 6], [0, 4, 0]],   // 5 Mountains: Gold, Iron
  [[3, 1, 0], [2, 0, 3]],   // 6 Tundra: Game, Furs
  [[1, 1, 4], [0, 4, 0]],   // 7 Glacier: Ivory, Oil
  [[1, 4, 0], [3, 0, 4]],   // 8 Swamp: Peat, Spice
  [[1, 0, 4], [4, 0, 1]],   // 9 Jungle: Gems, Fruit
  [[3, 0, 2], [2, 2, 3]],   // 10 Ocean: Fish, Whales
];

// Settler food cost per government per turn
export const SETTLER_FOOD_COST = {
  anarchy: 1, despotism: 1, monarchy: 1, communism: 2,
  fundamentalism: 2, republic: 2, democracy: 2,
};

// Food needed to grow = (size + 1) × FOOD_BOX_MULTIPLIER
export const FOOD_BOX_MULTIPLIER = 10;

// ── Government enum + lookup tables ──
export const GOVERNMENT_KEYS = ['anarchy','despotism','monarchy','communism','fundamentalism','republic','democracy'];
// Corruption divisor: (govtIndex >> 1) + 1
export const GOVT_CORRUPTION_DIVISOR = {
  anarchy: 1, despotism: 1, monarchy: 2, communism: 2,
  fundamentalism: 3, republic: 3, democracy: 4,
};
// Government factor for waste/corruption formulas (effGovt > 0 → 5, >1 → 6, >2 → 7, >4 → 8)
export const GOVT_FACTOR = {
  anarchy: 4, despotism: 5, monarchy: 6, communism: 7,
  fundamentalism: 7, republic: 8, democracy: 8,
};
// WLTKD bumps effective government one tier up for govtFactor calculation
export const GOVT_WLTKD_BUMP = {
  anarchy: 'despotism', despotism: 'monarchy', monarchy: 'communism',
  communism: 'fundamentalism', fundamentalism: 'republic', republic: 'democracy',
  democracy: 'democracy',
};

// Max rate slider value per government (in tenths: 6=60%, 10=100%)
// Fundamentalism: general max 8 (80%), but science capped to 5 (50%)
export const GOVT_MAX_RATE = {
  anarchy: 6, despotism: 6, monarchy: 7, communism: 8,
  fundamentalism: 8, republic: 8, democracy: 10,
};
export const GOVT_MAX_SCIENCE = {
  anarchy: 6, despotism: 6, monarchy: 7, communism: 8,
  fundamentalism: 5, republic: 8, democracy: 10,
};

// ── Difficulty enum ──
export const DIFFICULTY_KEYS = ['chieftain','warlord','prince','king','emperor','deity'];

// ── Barbarian activity enum ──
export const BARBARIAN_KEYS = ['none','roaming','restless','raging'];

// ── City name lists (indexed by rulesCivNumber, LEADERS.TXT order) ──
export const CIV_CITY_NAMES = [
  /* 0 Romans */         ['Rome','Caesarea','Carthago','Nicopolis','Byzantium','Brundisium','Syracuse','Antioch','Londinium','Tarrentum','Lutetia','Hispalis','Ravenna','Artaxata','Palmyra','Cyrene'],
  /* 1 Babylonians */    ['Babylon','Sumer','Ur','Nineveh','Ashur','Ellipi','Akkad','Eridu','Kish','Lagash','Nippur','Shuruppak','Umma','Sippar'],
  /* 2 Germans */        ['Berlin','Hamburg','Munich','Cologne','Frankfurt','Essen','Dortmund','Stuttgart','Düsseldorf','Bremen','Hannover','Leipzig','Dresden','Bonn','Nuremberg'],
  /* 3 Egyptians */      ['Thebes','Memphis','Oryx','Heliopolis','Gaza','Alexandria','Byblos','Cairo','Coptos','Edfu','Pithom','Busirus','Athribis','Mendes','Tanis'],
  /* 4 Americans */      ['Washington','New York','Boston','Philadelphia','Atlanta','Chicago','Buffalo','St. Louis','Detroit','New Orleans','Baltimore','Denver','Cincinnati','Dallas','Los Angeles'],
  /* 5 Greeks */         ['Athens','Sparta','Corinth','Delphi','Eretria','Pharsalos','Argos','Mycenae','Herakleia','Antioch','Ephesus','Rhodes','Knossos','Troy'],
  /* 6 Indians */        ['Delhi','Bombay','Madras','Bangalore','Calcutta','Lahore','Karachi','Kolhapur','Jaipur','Hyderabad','Bengal','Chittagong','Punjab','Dacca'],
  /* 7 Russians */       ['Moscow','St. Petersburg','Kiev','Minsk','Smolensk','Odessa','Sevastopol','Tiflis','Yakutsk','Vladivostok','Novosibirsk','Krasnoyarsk','Irkutsk'],
  /* 8 Zulus */          ['Zimbabwe','Ulundi','Bapedi','Hlobane','Isandhlwana','Intombe','Mpande','Mgungundlovu','Ondini','Nobamba','Bulawayo','KwaDukuza'],
  /* 9 French */         ['Paris','Lyon','Marseille','Tours','Chartres','Avignon','Rouen','Grenoble','Dijon','Amiens','Toulouse','Cherbourg','Poitiers','Bordeaux','Strasbourg'],
  /* 10 Aztecs */        ['Tenochtitlan','Tlatelolco','Texcoco','Tlaxcala','Calixtlahuaca','Xochicalco','Tlacopan','Atzcapotzalco','Tzintzuntzan','Malinalco','Tula','Tamuin'],
  /* 11 Chinese */       ['Peking','Shanghai','Canton','Nanking','Tsingtao','Hangchow','Tientsin','Tatung','Macao','Anyang','Shantung','Chinan','Kaifeng','Suchow'],
  /* 12 English */       ['London','Coventry','Birmingham','Dover','Nottingham','York','Liverpool','Brighton','Oxford','Cambridge','Hastings','Canterbury','Newcastle','Warwick'],
  /* 13 Mongols */       ['Samarkand','Bokhara','Nishapur','Karakorum','Kashgar','Tabriz','Aleppo','Kabul','Ormuz','Basra','Khanbalik','Merv'],
  /* 14 Celts */         ['Entremont','Bibracte','Alesia','Numantia','Camulodunum','Gergovia','Lugdunum','Burdigala','Avaricum','Cenabum','Tolosa','Lemonum'],
  /* 15 Japanese */      ['Tokyo','Kyoto','Osaka','Nagoya','Yokohama','Sapporo','Kobe','Sendai','Nara','Nagasaki','Hiroshima','Fukuoka'],
  /* 16 Vikings */       ['Trondheim','Reykjavik','Bergen','Oslo','Stockholm','Uppsala','Helsinki','Nidaros','Roskilde','Hedeby','Birka','Jorvik'],
  /* 17 Spanish */       ['Madrid','Barcelona','Seville','Cordoba','Toledo','Salamanca','Cadiz','Pamplona','Burgos','Murcia','Valencia','Leon','Granada','Bilbao'],
  /* 18 Persians */      ['Persepolis','Pasargadae','Susa','Ecbatana','Tarsus','Gordium','Bactra','Sardis','Ergili','Dariush-Kabir','Ghulaman','Zohak'],
  /* 19 Carthaginians */ ['Carthage','Leptis Magna','Hadrumetum','Thapsus','Cirta','Utica','Hippo Regius','Gades','Panormus','Lilybaeum'],
  /* 20 Sioux */         ['Oglala','Minneconjou','Brulé','Hunkpapa','Sans Arc','Two Kettle','Blackfeet','Santee','Sisseton','Wahpeton'],
];
export const BARBARIAN_CITY_NAMES = ['Camp'];

// Barbarian unit types by era (tech count thresholds)
// Each entry: [unitType, minTechCount] — pick highest qualifying
export const BARBARIAN_LAND_UNITS = [
  [2, 0],    // Warriors (Ancient)
  [3, 3],    // Archers
  [16, 8],   // Chariot
  [4, 10],   // Horsemen
  [5, 15],   // Legion (Iron Working era)
  [20, 25],  // Crusaders (Medieval)
  [22, 35],  // Dragoons (Renaissance)
  [34, 45],  // Partisan (Industrial)
  [35, 55],  // Alpine Troops (Modern)
];

export const BARBARIAN_SEA_UNITS = [
  [32, 0],   // Trireme
  [33, 20],  // Caravel
  [35, 40],  // Frigate
];

// Spawn frequency by activity level (every N turns)
export const BARBARIAN_SPAWN_FREQUENCY = {
  'none': 0,       // no spawning
  'roaming': 32,   // every 32 turns
  'restless': 16,  // every 16 turns
  'raging': 8,     // every 8 turns
};

// Maximum barbarian units on map at once (prevents runaway)
export const BARBARIAN_MAX_UNITS = 40;

// Minimum turn before barbarians start spawning
export const BARBARIAN_MIN_TURN = 10;

// ── Tech prerequisite arrays ──
// -1 = no prerequisite (always available), -2 = cannot be built
export const UNIT_PREREQS = [
  -1,  //  0: Settlers
  28,  //  1: Engineers        (Explosives)
  -1,  //  2: Warriors
   8,  //  3: Phalanx          (Bronze Working)
  86,  //  4: Archers          (Warrior Code)
  39,  //  5: Legion           (Iron Working)
  29,  //  6: Pikemen          (Feudalism)
  35,  //  7: Musketeers       (Gunpowder)
  31,  //  8: Fanatics         (Fundamentalism)
  34,  //  9: Partisans        (Guerrilla Warfare)
  81,  // 10: Alpine Troops    (Tactics)
  17,  // 11: Riflemen         (Conscription)
   2,  // 12: Marines          (Amphibious Warfare)
  13,  // 13: Paratroopers     (Combined Arms)
  40,  // 14: Mech. Inf.       (Labor Union)
  36,  // 15: Horsemen         (Horseback Riding)
  87,  // 16: Chariot          (The Wheel)
  64,  // 17: Elephant         (Polytheism)
  55,  // 18: Crusaders        (Monotheism)
  11,  // 19: Knights          (Chivalry)
  42,  // 20: Dragoons         (Leadership)
  81,  // 21: Cavalry          (Tactics)
  53,  // 22: Armor            (Mobile Warfare)
  49,  // 23: Catapult         (Mathematics)
  51,  // 24: Cannon           (Metallurgy)
  44,  // 25: Artillery        (Machine Tools)
  72,  // 26: Howitzer         (Robotics)
  30,  // 27: Fighter          (Flight)
   0,  // 28: Bomber           (Advanced Flight)
  13,  // 29: Helicopter       (Combined Arms)
  77,  // 30: Stealth Fighter  (Stealth)
  77,  // 31: Stealth Bomber   (Stealth)
  46,  // 32: Trireme          (Map Making)
  57,  // 33: Caravel          (Navigation)
  45,  // 34: Galleon          (Magnetism)
  45,  // 35: Frigate          (Magnetism)
  78,  // 36: Ironclad         (Steam Engine)
  23,  // 37: Destroyer        (Electricity)
  79,  // 38: Cruiser          (Steel)
  73,  // 39: AEGIS Cruiser    (Rocketry)
   5,  // 40: Battleship       (Automobile)
  14,  // 41: Submarine        (Combustion)
   0,  // 42: Carrier          (Advanced Flight)
  37,  // 43: Transport        (Industrialization)
  73,  // 44: Cruise Msl.      (Rocketry)
  73,  // 45: Nuclear Msl.     (Rocketry)
  88,  // 46: Diplomat         (Writing)
  27,  // 47: Spy              (Espionage)
  84,  // 48: Caravan          (Trade)
  19,  // 49: Freight          (The Corporation)
  75,  // 50: Explorer         (Seafaring)
  -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, // 51-61: Extra/Test (unbuildable)
];

// Unit obsolescence: tech ID that removes this unit from build list (-1 = never obsolete)
export const UNIT_OBSOLETE = [
  28,  //  0: Settlers        → Explosives
  -1,  //  1: Engineers
  29,  //  2: Warriors         → Feudalism
  29,  //  3: Phalanx          → Feudalism
  35,  //  4: Archers          → Gunpowder
  35,  //  5: Legion           → Gunpowder
  35,  //  6: Pikemen          → Gunpowder
  17,  //  7: Musketeers       → Conscription
  -1, -1, -1, -1, -1, -1, -1, // 8-14
  11,  // 15: Horsemen         → Chivalry
  64,  // 16: Chariot          → Polytheism
  55,  // 17: Elephant         → Monotheism
  42,  // 18: Crusaders        → Leadership
  42,  // 19: Knights          → Leadership
  81,  // 20: Dragoons         → Tactics
  53,  // 21: Cavalry          → Mobile Warfare
  -1,  // 22: Armor
  51,  // 23: Catapult         → Metallurgy
  44,  // 24: Cannon           → Machine Tools
  72,  // 25: Artillery        → Robotics
  -1,  // 26: Howitzer
  77,  // 27: Fighter          → Stealth
  77,  // 28: Bomber           → Stealth
  -1,  // 29: Helicopter
  -1, -1, // 30-31
  57,  // 32: Trireme          → Navigation
  45,  // 33: Caravel          → Magnetism
  37,  // 34: Galleon          → Industrialization
  23,  // 35: Frigate          → Electricity
  23,  // 36: Ironclad         → Electricity
  -1,  // 37: Destroyer
  73,  // 38: Cruiser          → Rocketry
  -1, -1, -1, -1, -1, -1, -1, // 39-45
  27,  // 46: Diplomat         → Espionage
  -1,  // 47: Spy
  19,  // 48: Caravan          → The Corporation
  -1,  // 49: Freight
  34,  // 50: Explorer         → Guerrilla Warfare
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 51-61
];

// Building prerequisites (indexed by building ID 0-38)
export const IMPROVE_PREREQS = [
  -1,  //  0: Nothing
  47,  //  1: Palace           (Masonry)
  -1,  //  2: Barracks
  65,  //  3: Granary          (Pottery)
   9,  //  4: Temple           (Ceremonial Burial)
  20,  //  5: Marketplace      (Currency)
  88,  //  6: Library          (Writing)
  12,  //  7: Courthouse       (Code of Laws)
  47,  //  8: City Walls       (Masonry)
  18,  //  9: Aqueduct         (Construction)
   6,  // 10: Bank             (Banking)
  55,  // 11: Cathedral        (Monotheism)
  85,  // 12: University       (University)
  48,  // 13: Mass Transit     (Mass Production)
  18,  // 14: Colosseum        (Construction)
  37,  // 15: Factory          (Industrialization)
  72,  // 16: Mfg. Plant       (Robotics)
  41,  // 17: SDI Defense      (The Laser)
  68,  // 18: Recycling Center (Recycling)
  69,  // 19: Power Plant      (Refining)
  24,  // 20: Hydro Plant      (Electronics)
  59,  // 21: Nuclear Plant    (Nuclear Power)
  22,  // 22: Stock Exchange   (Economics)
  74,  // 23: Sewer System     (Sanitation)
  70,  // 24: Supermarket      (Refrigeration)
   5,  // 25: Superhighways    (Automobile)
  16,  // 26: Research Lab     (Computers)
  73,  // 27: SAM Battery      (Rocketry)
  51,  // 28: Coastal Fortress (Metallurgy)
  26,  // 29: Solar Plant      (Environmentalism)
  75,  // 30: Harbour          (Seafaring)
  52,  // 31: Offshore Platform(Miniaturization)
  66,  // 32: Airport          (Radio)
  15,  // 33: Police Station   (Communism)
   2,  // 34: Port Facility    (Amphibious Warfare)
  76,  // 35: SS Structural    (Space Flight)
  62,  // 36: SS Component     (Plastics)
  80,  // 37: SS Module        (Superconductor)
  19,  // 38: Capitalization   (The Corporation)
];

// Wonder prerequisites (indexed by wonder index 0-27)
export const WONDER_PREREQS = [
  47,  //  0: Pyramids                (Masonry)
  65,  //  1: Hanging Gardens         (Pottery)
   8,  //  2: Colossus                (Bronze Working)
  46,  //  3: Lighthouse              (Map Making)
  43,  //  4: Great Library           (Literacy)
  56,  //  5: Oracle                  (Mysticism)
  47,  //  6: Great Wall              (Masonry)
  29,  //  7: Sun Tzu's War Academy   (Feudalism)
  25,  //  8: King Richard's Crusade  (Engineering)
  84,  //  9: Marco Polo's Embassy    (Trade)
  55,  // 10: Michelangelo's Chapel   (Monotheism)
   3,  // 11: Copernicus' Observatory (Astronomy)
  57,  // 12: Magellan's Expedition   (Navigation)
  50,  // 13: Shakespeare's Theatre   (Medicine)
  38,  // 14: Leonardo's Workshop     (Invention)
  82,  // 15: J.S. Bach's Cathedral   (Theology)
  83,  // 16: Isaac Newton's College  (Theory of Gravity)
  22,  // 17: Adam Smith's Trading Co.(Economics)
  67,  // 18: Darwin's Voyage         (Railroad)
  21,  // 19: Statue of Liberty       (Democracy)
  78,  // 20: Eiffel Tower            (Steam Engine)
  37,  // 21: Women's Suffrage        (Industrialization)
  24,  // 22: Hoover Dam              (Electronics)
  58,  // 23: Manhattan Project       (Nuclear Fission)
  15,  // 24: United Nations          (Communism)
  76,  // 25: Apollo Program          (Space Flight)
  16,  // 26: SETI Program            (Computers)
  33,  // 27: Cure for Cancer         (Genetic Engineering)
];

// Wonder obsolescence (-1 = never)
export const WONDER_OBSOLETE = [
  -1,  //  0: Pyramids
  67,  //  1: Hanging Gardens  → Railroad
  30,  //  2: Colossus         → Flight
  45,  //  3: Lighthouse       → Magnetism
  23,  //  4: Great Library    → Electricity
  82,  //  5: Oracle           → Theology
  51,  //  6: Great Wall       → Metallurgy
  53,  //  7: Sun Tzu          → Mobile Warfare
  37,  //  8: King Richard     → Industrialization
  15,  //  9: Marco Polo       → Communism
  -1,  // 10: Michelangelo
  -1,  // 11: Copernicus
  -1,  // 12: Magellan
  -1,  // 13: Shakespeare
   5,  // 14: Leonardo         → Automobile
  -1,  // 15: Bach
  -1,  // 16: Newton
  -1,  // 17: Smith
  -1,  // 18: Darwin
  -1,  // 19: Statue of Liberty
  -1,  // 20: Eiffel Tower
  -1,  // 21: Women's Suffrage
  -1,  // 22: Hoover Dam
  -1,  // 23: Manhattan Project
  -1,  // 24: United Nations
  -1,  // 25: Apollo
  -1,  // 26: SETI
  -1,  // 27: Cure for Cancer
];

// Shield box factor (COSMIC parameter #4, multiplied into production costs)
export const SHIELD_BOX_FACTOR = 10;

// ── Tech / Advance system ──

// Advance names (indexed 0-88, from RULES.TXT @CIVILIZE)
export const ADVANCE_NAMES = [
  'Advanced Flight','Alphabet','Amphibious Warfare','Astronomy','Atomic Theory',
  'Automobile','Banking','Bridge Building','Bronze Working','Ceremonial Burial',
  'Chemistry','Chivalry','Code of Laws','Combined Arms','Combustion',
  'Communism','Computers','Conscription','Construction','The Corporation',
  'Currency','Democracy','Economics','Electricity','Electronics',
  'Engineering','Environmentalism','Espionage','Explosives','Feudalism',
  'Flight','Fundamentalism','Fusion Power','Genetic Engineering','Guerrilla Warfare',
  'Gunpowder','Horseback Riding','Industrialization','Invention','Iron Working',
  'Labor Union','The Laser','Leadership','Literacy','Machine Tools',
  'Magnetism','Map Making','Masonry','Mass Production','Mathematics',
  'Medicine','Metallurgy','Miniaturization','Mobile Warfare','Monarchy',
  'Monotheism','Mysticism','Navigation','Nuclear Fission','Nuclear Power',
  'Philosophy','Physics','Plastics','Plumbing','Polytheism',
  'Pottery','Radio','Railroad','Recycling','Refining',
  'Refrigeration','The Republic','Robotics','Rocketry','Sanitation',
  'Seafaring','Space Flight','Stealth','Steam Engine','Steel',
  'Superconductor','Tactics','Theology','Theory of Gravity','Trade',
  'University','Warrior Code','The Wheel','Writing',
];

// Tech prerequisite tree: [prereq1, prereq2] per advance (-1 = none, -2 = unresearchable)
// Parsed from RULES.TXT @CIVILIZE section
export const ADVANCE_PREREQS = [
  [ 66,  44],  //  0: Advanced Flight    (Radio, Machine Tools)
  [ -1,  -1],  //  1: Alphabet
  [ 57,  81],  //  2: Amphibious Warfare (Navigation, Tactics)
  [ 56,  49],  //  3: Astronomy          (Mysticism, Mathematics)
  [ 83,  61],  //  4: Atomic Theory      (Theory of Gravity, Physics)
  [ 14,  79],  //  5: Automobile         (Combustion, Steel)
  [ 84,  71],  //  6: Banking            (Trade, Republic)
  [ 39,  18],  //  7: Bridge Building    (Iron Working, Construction)
  [ -1,  -1],  //  8: Bronze Working
  [ -1,  -1],  //  9: Ceremonial Burial
  [ 85,  50],  // 10: Chemistry          (University, Medicine)
  [ 29,  36],  // 11: Chivalry           (Feudalism, Horseback Riding)
  [  1,  -1],  // 12: Code of Laws       (Alphabet)
  [ 53,   0],  // 13: Combined Arms      (Mobile Warfare, Advanced Flight)
  [ 69,  28],  // 14: Combustion         (Refining, Explosives)
  [ 60,  37],  // 15: Communism          (Philosophy, Industrialization)
  [ 52,  48],  // 16: Computers          (Miniaturization, Mass Production)
  [ 21,  51],  // 17: Conscription       (Democracy, Metallurgy)
  [ 47,  20],  // 18: Construction       (Masonry, Currency)
  [ 37,  22],  // 19: The Corporation    (Industrialization, Economics)
  [  8,  -1],  // 20: Currency           (Bronze Working)
  [  6,  38],  // 21: Democracy          (Banking, Invention)
  [ 85,   6],  // 22: Economics          (University, Banking)
  [ 51,  45],  // 23: Electricity        (Metallurgy, Magnetism)
  [ 23,  19],  // 24: Electronics        (Electricity, The Corporation)
  [ 87,  18],  // 25: Engineering        (The Wheel, Construction)
  [ 68,  76],  // 26: Environmentalism   (Recycling, Space Flight)
  [ 15,  21],  // 27: Espionage          (Communism, Democracy)
  [ 35,  10],  // 28: Explosives         (Gunpowder, Chemistry)
  [ 86,  54],  // 29: Feudalism          (Warrior Code, Monarchy)
  [ 14,  83],  // 30: Flight             (Combustion, Theory of Gravity)
  [ 55,  17],  // 31: Fundamentalism     (Monotheism, Conscription)
  [ 59,  80],  // 32: Fusion Power       (Nuclear Power, Superconductor)
  [ 50,  19],  // 33: Genetic Engineering(Medicine, The Corporation)
  [ 15,  81],  // 34: Guerrilla Warfare  (Communism, Tactics)
  [ 38,  39],  // 35: Gunpowder          (Invention, Iron Working)
  [ -1,  -1],  // 36: Horseback Riding
  [ 67,   6],  // 37: Industrialization  (Railroad, Banking)
  [ 25,  43],  // 38: Invention          (Engineering, Literacy)
  [  8,  86],  // 39: Iron Working       (Bronze Working, Warrior Code)
  [ 48,  34],  // 40: Labor Union        (Mass Production, Guerrilla Warfare)
  [ 59,  48],  // 41: The Laser          (Nuclear Power, Mass Production)
  [ 11,  35],  // 42: Leadership         (Chivalry, Gunpowder)
  [ 88,  12],  // 43: Literacy           (Writing, Code of Laws)
  [ 79,  81],  // 44: Machine Tools      (Steel, Tactics)
  [ 61,  39],  // 45: Magnetism          (Physics, Iron Working)
  [  1,  -1],  // 46: Map Making         (Alphabet)
  [ -1,  -1],  // 47: Masonry
  [  5,  19],  // 48: Mass Production    (Automobile, The Corporation)
  [  1,  47],  // 49: Mathematics        (Alphabet, Masonry)
  [ 60,  84],  // 50: Medicine           (Philosophy, Trade)
  [ 35,  85],  // 51: Metallurgy         (Gunpowder, University)
  [ 44,  24],  // 52: Miniaturization    (Machine Tools, Electronics)
  [  5,  81],  // 53: Mobile Warfare     (Automobile, Tactics)
  [  9,  12],  // 54: Monarchy           (Ceremonial Burial, Code of Laws)
  [ 60,  64],  // 55: Monotheism         (Philosophy, Polytheism)
  [  9,  -1],  // 56: Mysticism          (Ceremonial Burial)
  [ 75,   3],  // 57: Navigation         (Seafaring, Astronomy)
  [  4,  48],  // 58: Nuclear Fission    (Atomic Theory, Mass Production)
  [ 58,  24],  // 59: Nuclear Power      (Nuclear Fission, Electronics)
  [ 56,  43],  // 60: Philosophy         (Mysticism, Literacy)
  [ 57,  43],  // 61: Physics            (Navigation, Literacy)
  [ 69,  76],  // 62: Plastics           (Refining, Space Flight)
  [ -2,  -2],  // 63: Plumbing           (unresearchable)
  [  9,  36],  // 64: Polytheism         (Ceremonial Burial, Horseback Riding)
  [ -1,  -1],  // 65: Pottery
  [ 30,  23],  // 66: Radio              (Flight, Electricity)
  [ 78,   7],  // 67: Railroad           (Steam Engine, Bridge Building)
  [ 48,  21],  // 68: Recycling          (Mass Production, Democracy)
  [ 10,  19],  // 69: Refining           (Chemistry, The Corporation)
  [ 23,  74],  // 70: Refrigeration      (Electricity, Sanitation)
  [ 12,  43],  // 71: The Republic       (Code of Laws, Literacy)
  [ 16,  53],  // 72: Robotics           (Computers, Mobile Warfare)
  [  0,  24],  // 73: Rocketry           (Advanced Flight, Electronics)
  [ 50,  25],  // 74: Sanitation         (Medicine, Engineering)
  [ 46,  65],  // 75: Seafaring          (Map Making, Pottery)
  [ 16,  73],  // 76: Space Flight       (Computers, Rocketry)
  [ 80,  72],  // 77: Stealth            (Superconductor, Robotics)
  [ 61,  38],  // 78: Steam Engine       (Physics, Invention)
  [ 23,  37],  // 79: Steel              (Electricity, Industrialization)
  [ 62,  41],  // 80: Superconductor     (Plastics, The Laser)
  [ 17,  42],  // 81: Tactics            (Conscription, Leadership)
  [ 55,  29],  // 82: Theology           (Monotheism, Feudalism)
  [  3,  85],  // 83: Theory of Gravity  (Astronomy, University)
  [ 20,  12],  // 84: Trade              (Currency, Code of Laws)
  [ 49,  60],  // 85: University         (Mathematics, Philosophy)
  [ -1,  -1],  // 86: Warrior Code
  [ 36,  -1],  // 87: The Wheel          (Horseback Riding)
  [  1,  -1],  // 88: Writing            (Alphabet)
];

// Advance icon index: 5 * epoch + category, for indexing into the 20-icon grid in ICONS.GIF
// Epoch: 0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern
// Category: 0=Military, 1=Economic, 2=Social, 3=Academic, 4=Applied
export const ADVANCE_ICON = [
  19,  //  0: Advanced Flight    (3,4)
   3,  //  1: Alphabet           (0,3)
  15,  //  2: Amphibious Warfare (3,0)
   8,  //  3: Astronomy          (1,3)
  13,  //  4: Atomic Theory      (2,3)
  19,  //  5: Automobile         (3,4)
   6,  //  6: Banking            (1,1)
   4,  //  7: Bridge Building    (0,4)
   4,  //  8: Bronze Working     (0,4)
   2,  //  9: Ceremonial Burial  (0,2)
   8,  // 10: Chemistry          (1,3)
   5,  // 11: Chivalry           (1,0)
   2,  // 12: Code of Laws       (0,2)
  15,  // 13: Combined Arms      (3,0)
  14,  // 14: Combustion         (2,4)
  12,  // 15: Communism          (2,2)
  19,  // 16: Computers          (3,4)
  10,  // 17: Conscription       (2,0)
   4,  // 18: Construction       (0,4)
  11,  // 19: The Corporation    (2,1)
   1,  // 20: Currency           (0,1)
  12,  // 21: Democracy          (2,2)
  11,  // 22: Economics          (2,1)
  14,  // 23: Electricity        (2,4)
  19,  // 24: Electronics        (3,4)
   4,  // 25: Engineering        (0,4)
  17,  // 26: Environmentalism   (3,2)
  15,  // 27: Espionage          (3,0)
  14,  // 28: Explosives         (2,4)
   0,  // 29: Feudalism          (0,0)
  14,  // 30: Flight             (2,4)
  12,  // 31: Fundamentalism     (2,2)
  18,  // 32: Fusion Power       (3,3)
  18,  // 33: Genetic Engineering(3,3)
  15,  // 34: Guerrilla Warfare  (3,0)
   5,  // 35: Gunpowder          (1,0)
   0,  // 36: Horseback Riding   (0,0)
  11,  // 37: Industrialization  (2,1)
   9,  // 38: Invention          (1,4)
   4,  // 39: Iron Working       (0,4)
  17,  // 40: Labor Union        (3,2)
  18,  // 41: The Laser          (3,3)
   5,  // 42: Leadership         (1,0)
   3,  // 43: Literacy           (0,3)
  14,  // 44: Machine Tools      (2,4)
   8,  // 45: Magnetism          (1,3)
   1,  // 46: Map Making         (0,1)
   4,  // 47: Masonry            (0,4)
  19,  // 48: Mass Production    (3,4)
   3,  // 49: Mathematics        (0,3)
   6,  // 50: Medicine           (1,1)
   5,  // 51: Metallurgy         (1,0)
  19,  // 52: Miniaturization    (3,4)
  15,  // 53: Mobile Warfare     (3,0)
   2,  // 54: Monarchy           (0,2)
   7,  // 55: Monotheism         (1,2)
   2,  // 56: Mysticism          (0,2)
   6,  // 57: Navigation         (1,1)
  18,  // 58: Nuclear Fission    (3,3)
  18,  // 59: Nuclear Power      (3,3)
   7,  // 60: Philosophy         (1,2)
   8,  // 61: Physics            (1,3)
  19,  // 62: Plastics           (3,4)
   9,  // 63: Plumbing           (1,4)
   2,  // 64: Polytheism         (0,2)
   1,  // 65: Pottery            (0,1)
  19,  // 66: Radio              (3,4)
  11,  // 67: Railroad           (2,1)
  17,  // 68: Recycling          (3,2)
  14,  // 69: Refining           (2,4)
  16,  // 70: Refrigeration      (3,1)
   2,  // 71: The Republic       (0,2)
  15,  // 72: Robotics           (3,0)
  15,  // 73: Rocketry           (3,0)
  11,  // 74: Sanitation         (2,1)
   1,  // 75: Seafaring          (0,1)
  18,  // 76: Space Flight       (3,3)
  15,  // 77: Stealth            (3,0)
  13,  // 78: Steam Engine       (2,3)
  14,  // 79: Steel              (2,4)
  18,  // 80: Superconductor     (3,3)
  10,  // 81: Tactics            (2,0)
   7,  // 82: Theology           (1,2)
   8,  // 83: Theory of Gravity  (1,3)
   1,  // 84: Trade              (0,1)
   8,  // 85: University         (1,3)
   0,  // 86: Warrior Code       (0,0)
   4,  // 87: The Wheel          (0,4)
   3,  // 88: Writing            (0,3)
];

// COSMIC parameter #11: tech paradigm (default 10 = no scaling, range [3,10] from RULES.TXT)
// Applied as baseCost * value / 10 — so 10 means ×1.0, 3 means ×0.3
export const COSMIC_TECH_MULTIPLIER = 10;

// COSMIC parameter #17 (DAT_0064bcd9): Fundamentalism science penalty percentage (default 50).
// Raw C FUN_004ea1f6 line 3900: science -= (DAT_0064bcd9 * science) / 100
export const COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY = 50;

// Tech prerequisite for each government type (advance ID, -1 = always available)
export const GOVT_TECH_PREREQS = {
  anarchy: -1,         // always available (fallback during revolution)
  despotism: -1,       // starting government
  monarchy: 54,        // Monarchy advance
  communism: 15,       // Communism advance
  fundamentalism: 31,  // Fundamentalism advance
  republic: 71,        // The Republic advance
  democracy: 21,       // Democracy advance
};

// ── Pollution constants ──
export const POLLUTION_THRESHOLD = 20; // shields above this contribute to pollution

// ── Submarine stealth ──
export const UNIT_SUBMARINE = new Set([41]); // Submarine
export const UNIT_SUB_DETECTOR = new Set([37, 39]); // Destroyer, AEGIS Cruiser

// ── Unit special flags (from RULES.TXT bit flags) ──
// Amphibious flag: unit can attack from ocean tiles (Marines)
// From RULES.TXT flags — Marines (type 12) have this flag
export const UNIT_AMPHIBIOUS = new Set([12]); // Marines

// Alpine flag: unit treats ALL terrain as cost 1 MP (Alpine Troops)
// From RULES.TXT flags bit 12 (0x1000)
export const UNIT_ALPINE = new Set([10]); // Alpine Troops

// Fighter flag: air units that can only attack ground units when target
// has a city or airbase (fighters cannot strafe open-field ground units)
// From binary FUN_0057f9e3: fighters check for city/airbase at target
export const UNIT_FIGHTER = new Set([27, 30]); // Fighter, Stealth Fighter

// ── Unit upgrade paths ──
// Maps each unit type to its upgrade target (-1 = no upgrade).
// Based on Civ2 obsolescence chain: when unit X is obsoleted by tech T,
// it upgrades to the unit that requires tech T.
export const UNIT_UPGRADE_TO = [
   1,  //  0: Settlers → Engineers
  -1,  //  1: Engineers
   6,  //  2: Warriors → Pikemen (Feudalism obsoletes Warriors, Pikemen requires Feudalism)
   6,  //  3: Phalanx → Pikemen (Feudalism obsoletes Phalanx)
   7,  //  4: Archers → Musketeers (Gunpowder obsoletes Archers)
   7,  //  5: Legion → Musketeers (Gunpowder obsoletes Legion)
   7,  //  6: Pikemen → Musketeers (Gunpowder obsoletes Pikemen)
  11,  //  7: Musketeers → Riflemen (Conscription obsoletes Musketeers)
  -1,  //  8: Fanatics
  -1,  //  9: Partisans
  -1,  // 10: Alpine Troops
  -1,  // 11: Riflemen
  -1,  // 12: Marines
  -1,  // 13: Paratroopers
  -1,  // 14: Mech. Inf.
  19,  // 15: Horsemen → Knights (Chivalry obsoletes Horsemen)
  17,  // 16: Chariot → Elephant (Polytheism obsoletes Chariot)
  18,  // 17: Elephant → Crusaders (Monotheism obsoletes Elephant)
  20,  // 18: Crusaders → Dragoons (Leadership obsoletes Crusaders)
  20,  // 19: Knights → Dragoons (Leadership obsoletes Knights)
  21,  // 20: Dragoons → Cavalry (Tactics obsoletes Dragoons)
  22,  // 21: Cavalry → Armor (Mobile Warfare obsoletes Cavalry)
  -1,  // 22: Armor
  24,  // 23: Catapult → Cannon (Metallurgy obsoletes Catapult)
  25,  // 24: Cannon → Artillery (Machine Tools obsoletes Cannon)
  26,  // 25: Artillery → Howitzer (Robotics obsoletes Artillery)
  -1,  // 26: Howitzer
  30,  // 27: Fighter → Stealth Fighter (Stealth obsoletes Fighter)
  31,  // 28: Bomber → Stealth Bomber (Stealth obsoletes Bomber)
  -1,  // 29: Helicopter
  -1,  // 30: Stealth Fighter
  -1,  // 31: Stealth Bomber
  33,  // 32: Trireme → Caravel (Navigation obsoletes Trireme)
  34,  // 33: Caravel → Galleon (Magnetism obsoletes Caravel)
  43,  // 34: Galleon → Transport (Industrialization obsoletes Galleon)
  37,  // 35: Frigate → Destroyer (Electricity obsoletes Frigate)
  37,  // 36: Ironclad → Destroyer (Electricity obsoletes Ironclad)
  -1,  // 37: Destroyer
  39,  // 38: Cruiser → AEGIS Cruiser (Rocketry obsoletes Cruiser)
  -1,  // 39: AEGIS Cruiser
  -1,  // 40: Battleship
  -1,  // 41: Submarine
  -1,  // 42: Carrier
  -1,  // 43: Transport
  -1,  // 44: Cruise Msl.
  -1,  // 45: Nuclear Msl.
  47,  // 46: Diplomat → Spy (Espionage obsoletes Diplomat)
  -1,  // 47: Spy
  49,  // 48: Caravan → Freight (The Corporation obsoletes Caravan)
  -1,  // 49: Freight
   9,  // 50: Explorer → Partisans (Guerrilla Warfare obsoletes Explorer)
  -1,  // 51: Extra Land
];

/** Orders that mean a unit is "busy" and does not need player input this turn. */
export const BUSY_ORDERS = new Set([
  'fortifying', 'fortified', 'sentry', 'sleep',
  'road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution',
]);

// ── AI constants (from RULES.TXT and decompiled AI logic) ──

// Unit combat role classification (custom JS numbering, NOT binary RULES.TXT)
// Binary RULES.TXT: 0=attack, 1=defend, 2=naval, 3=air, 4=sea transport, 5=settle, 6=diplomacy, 7=trade
// JS engine splits binary role 3 into 3=air attack + 4=air defense, shifting all subsequent:
// 0=attack, 1=defend, 2=naval superiority, 3=air attack, 4=air defense,
// 5=naval transport, 6=settle, 7=diplomacy, 8=trade
export const UNIT_ROLE = [
  6, 6, 0, 1, 0, 0, 1, 1,   // 0-7:  Settlers,Engineers,Warriors..Musketeers
  1, 0, 0, 1, 0, 0, 1,       // 8-14: Fanatics..Mech.Inf.
  0, 0, 0, 0, 0, 0, 0, 0,    // 15-22: Horsemen..Armor
  0, 0, 0, 0, 4, 3, 3,       // 23-29: Catapult..Helicopter
  4, 3, 5, 5, 5, 2, 2,       // 30-36: StealthF..Ironclad
  2, 2, 2, 2, 2, 5, 5,       // 37-43: Destroyer..Transport
  3, 3, 7, 7, 8, 8, 0,       // 44-50: CruiseMsl..Explorer
  0,                          // 51: Extra Land
];

// Advance epoch/era (0=ancient, 1=renaissance, 2=industrial, 3=modern)
// From RULES.TXT @CIVILIZE epoch field
export const ADVANCE_EPOCH = [
  3, 0, 3, 1, 2, 3, 1, 0, 0, 0,  // 0-9
  1, 1, 0, 3, 2, 2, 3, 2, 0, 2,  // 10-19
  0, 2, 2, 2, 3, 0, 3, 3, 2, 0,  // 20-29
  2, 2, 3, 3, 3, 1, 0, 2, 1, 0,  // 30-39
  3, 3, 1, 0, 2, 1, 0, 0, 3, 0,  // 40-49
  1, 1, 3, 3, 0, 1, 0, 1, 3, 3,  // 50-59
  1, 1, 3, 1, 0, 0, 3, 2, 3, 2,  // 60-69
  3, 0, 3, 3, 2, 0, 3, 3, 2, 2,  // 70-79
  3, 2, 1, 1, 0, 1, 0, 0, 0,     // 80-88
];

// Base AI interest value per tech (from RULES.TXT AI_interest field, DAT_0062768b)
export const ADVANCE_AI_INTEREST = [
  0, 0, 0, 1, 0, 0, 1, 0, 0, 0,  // 0-9
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0,  // 10-19
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0,  // 20-29
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 30-39
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 40-49
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0,  // 50-59
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 60-69
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0,  // 70-79
  0, 0, 0, 0, 0, 0, 0, 0, 0,     // 80-88
];

// Leader personality traits [expansionism, militarism, tolerance] per leader
// Indexed by rulesCivNumber 0-20. Range: -1 to 1 each.
// From RULES.TXT @LEADERS section:
//   [0] = expansionism (DAT_006554fa) — city-founding preference
//   [1] = militarism   (DAT_006554f8) — aggression/warlike preference
//   [2] = tolerance     (DAT_006554f9) — perfectionism/development preference
export const LEADER_PERSONALITY = [
  // [expand, attack, civilize] — from RULES.TXT @LEADERS (attack,expand,civilize)
  [1, 0, 1],    // 0 Romans (Caesar) — RULES: atk=0, exp=1, civ=1
  [-1, -1, 1],  // 1 Babylonians (Hammurabi) — RULES: atk=-1, exp=-1, civ=1
  [-1, 1, 1],   // 2 Germans (Frederick) — RULES: atk=1, exp=-1, civ=1
  [0, 0, 1],    // 3 Egyptians (Ramesses) — RULES: atk=0, exp=0, civ=1
  [0, -1, 1],   // 4 Americans (Lincoln) — RULES: atk=-1, exp=0, civ=1
  [1, 0, -1],   // 5 Greeks (Alexander) — RULES: atk=0, exp=1, civ=-1
  [-1, -1, 0],  // 6 Indians (Gandhi) — RULES: atk=-1, exp=-1, civ=0
  [0, 1, -1],   // 7 Russians (Stalin) — RULES: atk=1, exp=0, civ=-1
  [0, 1, 0],    // 8 Zulus (Shaka) — RULES: atk=1, exp=0, civ=0
  [1, 1, 1],    // 9 French (Napoleon) — RULES: atk=1, exp=1, civ=1
  [-1, 0, 1],   // 10 Aztecs (Montezuma) — RULES: atk=0, exp=-1, civ=1
  [0, 0, 1],    // 11 Chinese (Mao) — RULES: atk=0, exp=0, civ=1
  [1, 0, 0],    // 12 English (Elizabeth) — RULES: atk=0, exp=1, civ=0
  [1, 1, -1],   // 13 Mongols (Genghis Khan) — RULES: atk=1, exp=1, civ=-1
  [1, -1, 0],   // 14 Celts (Brennus) — RULES: atk=-1, exp=1, civ=0
  [-1, 1, -1],  // 15 Japanese (Tokugawa) — RULES: atk=1, exp=-1, civ=-1
  [1, 1, 0],    // 16 Vikings (Canute) — RULES: atk=1, exp=1, civ=0
  [1, -1, -1],  // 17 Spanish (Isabella) — RULES: atk=-1, exp=1, civ=-1
  [-1, 0, 0],   // 18 Persians (Scheherazade) — RULES: atk=0, exp=-1, civ=0
  [0, 0, -1],   // 19 Carthaginians (Hannibal) — RULES: atk=0, exp=0, civ=-1
  [0, 0, 0],    // 20 Sioux (Sitting Bull) — RULES: atk=0, exp=0, civ=0
];

// Government name → numeric index for formulas
export const GOVT_INDEX = {
  anarchy: 0, despotism: 1, monarchy: 2, communism: 3,
  fundamentalism: 4, republic: 5, democracy: 6,
};

// ── Building prerequisite chains ──
// Maps buildingId → required buildingId (must have the prerequisite building to build)
export const IMPROVE_REQUIRES_BUILDING = {
  10: 5,   // Bank → Marketplace
  12: 6,   // University → Library
  16: 15,  // Mfg. Plant → Factory
  22: 10,  // Stock Exchange → Bank
  23: 9,   // Sewer System → Aqueduct
  26: 12,  // Research Lab → University
  19: 15,  // Power Plant → Factory
  20: 15,  // Hydro Plant → Factory
  21: 15,  // Nuclear Plant → Factory
  29: 15,  // Solar Plant → Factory
};

// Buildings that require a coastal city (adjacent ocean)
export const COASTAL_BUILDINGS = new Set([30, 31, 34, 28]); // Harbour, Offshore Platform, Port Facility, Coastal Fortress

// Power plant buildings — mutually exclusive (only one per city)
export const POWER_PLANT_BUILDINGS = new Set([19, 20, 21, 29]); // Power Plant, Hydro Plant, Nuclear Plant, Solar Plant

// Spaceship part building IDs
export const SS_STRUCTURAL = 35;
export const SS_COMPONENT = 36;
export const SS_MODULE = 37;

// ── Civ record layout constants (binary save format) ──
// CIV_RECORD_STRIDE: byte size of each civ record in the .sav binary.
// Each civ occupies 0x594 (1428) bytes starting at the civs section offset.
// Fields within a civ record include treasury (+0x00), government (+0x04),
// attitudes array (+0x48), patience (+0x150), militaryPower (+0x154), etc.
// state.humanPlayers bitmask (parsed from global header) tracks which civ
// slots are controlled by human players (bit N = civ N is human).
export const CIV_RECORD_STRIDE = 0x594;

// patience field (civ record +0x150 / DAT_006554f8):
// Tracks AI patience toward provocations. Decremented over time;
// when it reaches 0, the AI becomes more willing to declare war.
// Also used as a divisor for tribute demand calculations.
// See calcPatienceThreshold() in diplomacy.js for the runtime equivalent.

// ── Government-dependent leader titles ──
// From Civ2 RULES.TXT @LEADERS section: title prefixes vary by government type.
// Used for display strings like "President Lincoln" or "King Frederick".
export const LEADER_TITLES = {
  anarchy: '', despotism: 'Despot', monarchy: 'King', communism: 'Comrade',
  fundamentalism: 'High Priest', republic: 'Consul', democracy: 'President',
};
export const LEADER_TITLES_FEMALE = {
  anarchy: '', despotism: 'Despot', monarchy: 'Queen', communism: 'Comrade',
  fundamentalism: 'High Priestess', republic: 'Consul', democracy: 'President',
};

// ═══════════════════════════════════════════════════════════════════
// City epoch tech classifier (binary ref: FUN_00448f92)
// Determines visual epoch for city sprites based on techs researched.
// Used by renderer, city advisor, and any system needing era classification.
// ═══════════════════════════════════════════════════════════════════
export const CITY_EPOCH_TECHS = {
  // Modern (epoch 3): Electronics (24) AND Automobile (5)
  ELECTRONICS: 24,
  AUTOMOBILE: 5,
  // Industrial (epoch 2): Industrialization (37)
  INDUSTRIALIZATION: 37,
  // Renaissance (epoch 1): Invention (38) AND Philosophy (60)
  INVENTION: 38,
  PHILOSOPHY: 60,
};

/**
 * Classify a civ's visual epoch based on its tech set.
 * Binary ref: FUN_00448f92 @ block_00440000.c
 * @param {Set|Array} civTechSet - set/array of tech IDs the civ has researched
 * @returns {number} 0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern
 */
export function getCityEpoch(civTechSet) {
  if (!civTechSet) return 0;
  const has = (id) => civTechSet instanceof Set ? civTechSet.has(id) : civTechSet.includes(id);
  const T = CITY_EPOCH_TECHS;
  if (has(T.ELECTRONICS) && has(T.AUTOMOBILE)) return 3;  // Modern
  if (has(T.INDUSTRIALIZATION)) return 2;                  // Industrial
  if (has(T.INVENTION) && has(T.PHILOSOPHY)) return 1;     // Renaissance
  return 0;                                                // Ancient
}

// ═══════════════════════════════════════════════════════════════════
// City growth building check (binary ref: FUN_00441a79)
// Determines which growth-cap building to auto-queue when a city
// reaches the size threshold and doesn't have the building.
// ═══════════════════════════════════════════════════════════════════
export const GROWTH_CAP_BUILDINGS = {
  AQUEDUCT: { buildingId: 9, defaultThreshold: 8 },
  SEWER:    { buildingId: 23, defaultThreshold: 12 },
};

// ═══════════════════════════════════════════════════════════════════
// Trade route constants (binary ref: FUN_00440325, FUN_004403ec,
// FUN_00440453, FUN_00440750)
// ═══════════════════════════════════════════════════════════════════
export const TRADE = {
  MAX_ROUTES_PER_CITY: 3,

  // Revenue formula: ((city1_trade + city2_trade) * (distance + 10)) / 24
  DISTANCE_BONUS: 10,
  REVENUE_DIVISOR: 24,

  // Modifiers
  INTER_CONTINENT_MULTIPLIER: 2,   // revenue doubled if different continents
  INTRA_CIV_DIVISOR: 2,           // revenue halved if same civ

  // Tech-based modifiers
  EARLY_GAME_TURN_THRESHOLD: 200,  // before turn 200 with no Invention/Navigation: double
  EARLY_GAME_TECH_1: 38,           // Invention
  EARLY_GAME_TECH_2: 57,           // Navigation
  REDUCTION_TECH_RAILROAD: 67,     // Railroad: -33% revenue
  REDUCTION_TECH_FLIGHT: 30,       // Flight: -33% revenue

  // Building effects
  AIRPORT_BUILDING_ID: 32,         // Airport: halves distance for route evaluation
  SUPERHIGHWAYS_BUILDING_ID: 25,   // Superhighways: adds to trade distance bonus

  // Revenue post-processing
  REVENUE_CAP: 30000,
  REVENUE_FINAL_NUMERATOR: 2,      // final = (revenue * 2) / 3
  REVENUE_FINAL_DENOMINATOR: 3,

  // Commodity supply revenue multipliers (indexed by commodity type)
  // half=[3,5,8,10], full=[9,11,12,13], 1.5x=[14], 2x=[15]
  COMMODITY_HALF: new Set([3, 5, 8, 10]),
  COMMODITY_FULL: new Set([9, 11, 12, 13]),
  COMMODITY_150: new Set([14]),
  COMMODITY_DOUBLE: new Set([15]),

  // Diplomacy effect: trade improves relations by 10
  DIPLOMACY_BONUS: 10,

  // Food caravan: ((city_size + 1) * food_per_citizen) / 2
  FOOD_CARAVAN_DIVISOR: 2,

  // Commodity replacement scoring
  REPLACEMENT_RANDOM_MASK: 7,       // rand() & 7 (0-7)
  REPLACEMENT_SUPPLY_BONUS: 10,     // +10 if supply >= 0
  REPLACEMENT_DEMAND_BONUS: 10,     // +10 if matches demand
};

// ═══════════════════════════════════════════════════════════════════
// City deletion constants (binary ref: delete_city @ 0x004413D1)
// ═══════════════════════════════════════════════════════════════════
export const DELETE_CITY_CONSTANTS = {
  CITY_RADIUS_TILES: 45,           // full radius scan (inner 21 + outer 24)
  INNER_RADIUS_TILES: 21,          // standard BFC
  WONDER_COUNT: 28,
  DESTROYED_WONDER_SENTINEL: 0xFFFE,  // -2 as u16: marks wonder city as destroyed
};

// ═══════════════════════════════════════════════════════════════════
// Wonder production constants (binary ref: FUN_00441b11)
// ═══════════════════════════════════════════════════════════════════
export const WONDER_PRODUCTION = {
  // Production item encoding: wonder IDs use offset 39 (building 1-38 + 1)
  WONDER_ID_OFFSET: 39,

  // Switching to a wonder from a non-wonder halves accumulated shields
  SWITCH_PENALTY_DIVISOR: 2,

  // Wonder era grouping: 7 wonders per era (for era-completion tracking)
  WONDERS_PER_ERA: 7,
};

// ═══════════════════════════════════════════════════════════════════
// Game startup / mode constants (binary ref: FUN_00444310)
// ═══════════════════════════════════════════════════════════════════
export const GAME_MODE = {
  HOTSEAT: 4,
  LAN: 3,
  INTERNET: 5,
  DIRECT_CONNECT: 6,
  SCENARIO: 4,  // same as hotseat
};

// ═══════════════════════════════════════════════════════════════════
// City rendering sprite selection helpers
// Binary ref: FUN_0056d289 (draw_city_sprite)
// ═══════════════════════════════════════════════════════════════════

// City size thresholds for sub-style selection (4 size classes per epoch)
// Binary: if (size < 4) class=0, elif (<6) 1, elif (<8) 2, else 3
export const CITY_SIZE_THRESHOLDS = [4, 6, 8];

// Capital city gets +1 size class (capped at 3)
export const CITY_CAPITAL_SIZE_BONUS = 1;

// ── Specialist cycling order (binary ref: FUN_0047E94E case 0x88) ──
// When a citizen is toggled, cycle: entertainer → scientist → taxman → entertainer
export const SPECIALIST_CYCLE = ['entertainer', 'scientist', 'taxman']; // 1→2→3→1
// Cities below size 5 can only assign entertainers (no scientist/taxman)
export const SPECIALIST_MIN_CITY_SIZE = 5;

// ── AI / movement pathfinding constants ──
// Port of binary movement cost constants used in AI goto and long-distance pathing
export const LONG_MOVE_THRESHOLD = 47;   // distance above which AI switches to long-move path
export const BACKTRACK_PENALTY = 15;     // pathfinder penalty for moving away from destination
export const AI_STUCK_RESET_THRESHOLD = 19; // after 19 failed moves, AI resets unit goto

// ═══════════════════════════════════════════════════════════════════
// Game End Reasons (binary ref: DAT_0064B1AC)
// Used by victory/defeat logic to determine end-game sequence
// ═══════════════════════════════════════════════════════════════════
export const GAME_END_REASON = {
  NONE: 0,            // Game in progress
  SPACESHIP_SELF: 1,  // Player launched winning spaceship
  SPACESHIP_OTHER: 2, // Rival launched winning spaceship
  DOMINATION: 3,      // Domination victory (2/3 population + land)
  CONQUEST: 4,        // Conquest victory (all rivals eliminated)
  RETIREMENT: 5,      // Player retired or game ended at turn limit
};

// ═══════════════════════════════════════════════════════════════════
// Victory/Score constants (binary ref: render_retirement_score @ 0x00435DC4)
// ═══════════════════════════════════════════════════════════════════
export const SCORE_CONSTANTS = {
  // Score multiplier by difficulty level:
  //   scoreMult = difficulty + 4 + bonuses
  //   bonuses: +1 if difficulty > 2, +1 if difficulty > 3, +2 if difficulty > 4
  DIFFICULTY_MULTIPLIERS: [4, 5, 6, 8, 10, 12],
  // Chieftain=4, Warlord=5, Prince=6, King=8, Emperor=10, Deity=12

  // rawScore = (scoreMult * max(approval1, approval2)) / 100

  // Rank thresholds: (level^2)/3 for level 1..24
  // Rank = highest index where threshold <= rawScore
  RANK_THRESHOLDS: [0, 1, 3, 5, 8, 12, 16, 21, 27, 33, 40, 48, 56, 65, 75, 85, 96, 108, 120, 133, 147, 161, 176, 192],
  MAX_RANK: 23,

  // Rank title sections in game.txt
  MALE_FAME_SECTION: 'MALEFAME',
  FEMALE_FAME_SECTION: 'FEMALEFAME',

  // Keep-playing flag (game_flags bit)
  KEEP_PLAYING_FLAG: 0x20,
};

// ═══════════════════════════════════════════════════════════════════
// Hall of Fame (binary ref: render_hall_of_fame_list @ 0x004362E2)
// ═══════════════════════════════════════════════════════════════════
export const HALL_OF_FAME = {
  RECORD_COUNT: 6,
  RECORD_SIZE: 72,         // 0x48 bytes per record
  FILE_NAME: 'HALLFAME.DAT',
  // Record field offsets (within each 72-byte record)
  FIELDS: {
    SCORE: 0x00,           // int16 (negative = empty slot)
    CIV_ID: 0x02,          // int16 (low nibble=difficulty, bit 7=scenario/AC victory)
    TURN_NUMBER: 0x04,     // int16
    YEAR: 0x06,            // int16
    DATE_CALC: 0x08,       // int16
    YEARS_PER_TURN: 0x0A,  // int16 (0xFFFF if no Oedo Year)
    MONTHS_PER_TURN: 0x0C, // int16
    MONTH_INDEX: 0x0E,     // int16
    BLOODLUST_FLAG: 0x10,  // int16
    POPULATION: 0x12,      // int16
    GENDER: 0x14,           // int16 (0=male, nonzero=female)
    RANK_LEVEL: 0x16,       // int16 (0..23)
    LEADER_NAME: 0x18,     // char[24]
    CIV_NAME: 0x30,        // char[24]
  },
  DIFFICULTY_MASK: 0x0F,    // lower nibble = difficulty level
  SCENARIO_FLAG: 0x80,      // bit 7 = Alpha Centauri / scenario victory
};

// ═══════════════════════════════════════════════════════════════════
// Spaceship Launch AI behavior (binary ref: spaceship_launch @ 0x005973FD)
// ═══════════════════════════════════════════════════════════════════
export const SPACESHIP_LAUNCH = {
  LAUNCH_FLAG: 2,                 // civ_ss[civ].flags |= 2
  AI_PRODUCTION_OVERRIDE: 99,    // all AI cities switch to capitalization
  MP_NOTIFICATION_TYPE: 0x0B,    // multiplayer notification message type
  // AI diplomacy reactions when human launches
  DIFFICULTY_CEASEFIRE_MAX: 2,   // difficulties <= 2: AI offers ceasefire
  DIFFICULTY_HATRED_MAX: 4,      // difficulties <= 4: AI sets hatred flag (0x20)
  // difficulties > 4: AI declares war if not already at war
};

// ═══════════════════════════════════════════════════════════════════
// City status flags — full bitfield definitions
// (binary ref: save-format.js CITY_FLAGS)
// ═══════════════════════════════════════════════════════════════════
export const CITY_FLAGS = {
  // Byte +4 (attribs1)
  CIVIL_DISORDER:         0x01,
  WE_LOVE_KING_DAY:       0x02,
  IMPROVEMENT_SOLD:       0x04,
  TECH_STOLEN:            0x08,
  AUTOBUILD_MILITARY:     0x10,
  AI_SETTLER_NEARBY:      0x40,
  CAN_BUILD_COASTAL:      0x80,
  // Byte +5 (attribs2)
  BUILDING_WONDER:        0x01,
  CAN_BUILD_HYDRO:        0x08,
  DISORDER_ACTIVE:        0x20,
  CONTENT_SURPLUS:        0x40,
  RAPTURE_GROWTH:         0x80,
  // Byte +6 (attribs3)
  NEEDS_RECALC:           0x02,
  NEEDS_NEW_SETTLER_SITE: 0x08,
  WAS_CELEBRATING:        0x10,
  CAN_BUILD_SHIPS:        0x20,
  INVESTIGATED:           0x40,
  // Byte +7 (attribs4)
  AUTOBUILD_MILITARY_ADV: 0x01,
  AUTOBUILD_DOMESTIC_ADV: 0x02,
  OBJECTIVE_X1:           0x04,
  COASTAL_FORTRESS_USED:  0x08,
  OBJECTIVE_X3:           0x10,
};

// City flag clear masks applied during specific events
export const CITY_FLAG_MASKS = {
  CLEAR_DISORDER:   0xffefdffe,  // clears CIVIL_DISORDER, DISORDER_ACTIVE, WAS_CELEBRATING
  CLEAR_AUTOBUILD:  0xfcffffef,  // clears AUTOBUILD_MILITARY, AUTOBUILD_MILITARY_ADV, AUTOBUILD_DOMESTIC_ADV
  CLEAR_TURN_START: 0xffbfffbb,  // clears IMPROVEMENT_SOLD, AI_SETTLER_NEARBY, INVESTIGATED
};

// ═══════════════════════════════════════════════════════════════════
// Unit status flags — full bitfield definitions
// (binary ref: save-format.js UNIT_STATUS_FLAGS)
// ═══════════════════════════════════════════════════════════════════
export const UNIT_STATUS_FLAGS = {
  // Low byte (movement flags)
  IMMOBILE:            0x02,
  BORDER_CHECKED:      0x04,
  PARADROP_USED:       0x10,
  BORDER_SEEN:         0x20,
  FIRST_MOVE:          0x40,
  GOTO_ARRIVED:        0x80,
  // High byte (status flags) — values as they appear in the high byte
  AI_FORTIFIED:        0x01,
  AI_SETTLER_ROLE:     0x02,
  AI_ATTACK_PATH:      0x04,
  AI_MOBILIZED:        0x08,
  GOTO_NUCLEAR_TARGET: 0x10,
  VETERAN:             0x20,
  SHIP_WAKE_SENTRIES:  0x40,
  SETTLER_AUTOMATE:    0x80,
};

// Unit flag clear masks applied at turn start
export const UNIT_FLAG_MASKS = {
  TURN_START_CLEAR:    0xFFAF,   // clears FIRST_MOVE(0x40) + PARADROP_USED(0x10)
  AI_EVAL_CLEAR:       0xF3FF,   // clears AI_ATTACK_PATH(0x400) + AI_MOBILIZED(0x800)
};

// ═══════════════════════════════════════════════════════════════════
// Civ state flags (per-civ, byte at civ record offset +0)
// (binary ref: save-format.js CIV_STATE_FLAGS)
// ═══════════════════════════════════════════════════════════════════
export const CIV_STATE_FLAGS = {
  SKIP_NEXT_OEDO_YEAR:  0x01,
  AT_WAR:               0x02,
  SENATE_OVERRIDE:      0x04,
  RECOVERED_REVOLUTION: 0x08,
  FREE_ADVANCE_PENDING: 0x20,
  AI_EXPANSION_MODE:    0x80,
  TECH_MILESTONE:       0x0100,
  SCENARIO_CLEAR_MASK:  0xFF96,   // bits cleared when saving as scenario
};

// ═══════════════════════════════════════════════════════════════════
// Unit limits (binary ref: save-format.js UNIT_LIMITS)
// ═══════════════════════════════════════════════════════════════════
export const UNIT_LIMITS = {
  MAX_UNIT_SLOTS:    0x800,    // 2048 unit slots
  HUMAN_SOFT_CAP:    0x7F7,   // 2039 units (human player soft cap)
  AI_PER_CIV_CAP:    0x79C,   // 1948 units per AI civ
  BARBARIAN_SLOT:    0x800,   // slot 2048 reserved for barbarian temp unit
};

// ═══════════════════════════════════════════════════════════════════
// Throne Room Constants (binary ref: throne-room.js)
// Cosmetic system — data constants for future rendering
// ═══════════════════════════════════════════════════════════════════
export const THRONE_ROOM = {
  // 6 power ranking categories used for room decoration gating
  POWER_CATEGORIES: ['military', 'culture', 'economy', 'technology', 'territory', 'population'],

  // Scene dimensions
  SCENE_WIDTH: 457,
  SCENE_HEIGHT: 304,
  DISPLAY_WIDTH: 640,
  DISPLAY_HEIGHT: 480,

  // Upgrade structure in civ record:
  //   8 bytes at civ offset +0x93: standard category upgrade levels (0-4 each)
  //   1 byte at civ offset +0x9B: special upgrade bitmask (bits 0-6)
  MAX_UPGRADE_LEVEL: 4,
  NUM_STANDARD_CATEGORIES: 8,
  NUM_SPECIAL_SLOTS: 7,

  // DLL resource formulas for rendering
  STANDARD_RESOURCE_BASE: 0x69,     // category * 5 + level + 0x69
  BASE_SCENE_RESOURCE: 100,          // resource ID for base throne room
  STANDARD_HIGHLIGHT_BASE: 0xAA,    // highlight overlay: 0xAA + category
  SPECIAL_HIGHLIGHT_BASE: 0xB2,     // special highlight: 0xB2 + slot
  SPECIAL_FLOOR_RESOURCE: 0xA0,
  SPECIAL_THRONE_RESOURCE: 0xA3,

  // Upgrade selector: 34 interactive components
  COMPONENT_COUNT: 34,

  // Mutually exclusive special slots (4 and 5)
  MUTUAL_EXCLUSIVE_SLOTS: [4, 5],

  // Sounds
  SOUND_THRONE_ROOM: 0x0D,
  SOUND_INVALID_SELECTION: 0x5E,

  // Pollution bar thresholds (also used in advance scene)
  POLLUTION_THRESHOLDS: [
    { max: 40,       color: 0xF9 },  // green
    { max: 75,       color: 0xFB },  // yellow
    { max: Infinity, color: 0xFA },  // red
  ],

  // Starfield animation (wonder mode background)
  STARFIELD_PARTICLE_COUNT: 80,
  STARFIELD_ANIM_INTERVAL_MS: 5,

  // Typewriter text effect
  TYPEWRITER_INTERVAL_MS: 60,
  TYPEWRITER_FAST_INTERVAL_MS: 10,

  // DLL files used by throne room system
  DLL_SCENE: 'ss.dll',
  DLL_ADVISOR: 'civ2_mk.dll',
};

// ═══════════════════════════════════════════════════════════════════
// Wonder Movie Constants (binary ref: cutscenes.js WONDER_MOVIES)
// Cosmetic system — data constants for future rendering
// ═══════════════════════════════════════════════════════════════════
export const WONDER_MOVIES = {
  // Video path: "civ2_video_wonder" + paddedNumber + ".avi"
  VIDEO_PATH_PREFIX: 'civ2_video_wonder',
  VIDEO_PATH_SUFFIX: '.avi',

  // Art DLL for wonder artwork
  ART_DLL: 'civ2.wonder.dll',
  ART_RESOURCE_BASE: 20000,   // GIF resource ID = wonderNumber + 20000
  ART_FRAME_COUNT: 10,        // 10 animation frames per wonder
  ART_WIDTH: 320,
  ART_HEIGHT: 240,

  // Scenario flags that prevent wonder video playback
  PREVENT_VIDEO_FLAG_1: 0x40,
  PREVENT_VIDEO_FLAG_2: 0x80,

  // Multiplayer: wonder video completion effects skipped when game mode > 2
  MP_VIDEO_SKIP_THRESHOLD: 2,
};

// ═══════════════════════════════════════════════════════════════════
// Council Advisor Constants (binary ref: cutscenes.js COUNCIL_ADVISORS)
// Cosmetic system — data constants for future rendering
// ═══════════════════════════════════════════════════════════════════
export const COUNCIL_ADVISORS = {
  ADVISOR_SLOTS: 12,
  MUSIC_BASE: 0x53,         // plays sound 0x53 + offset for each advisor
  WAIT_MS: 7000,             // 7 seconds per advisor
  SCROLL_SOUND: 0x6F,
  SCROLL_PIXELS_PER_STEP: 15,
  SCROLL_STEP_DELAY_MS: 22,
  ART_DLL: 'civ2_mk.dll',
  PANEL_RECT: { left: 208, top: 57, right: 433, bottom: 332 },
};

// ═══════════════════════════════════════════════════════════════════
// Cosmic Rules Editor Parameters (binary ref: save-format.js COSMIC_EDITOR)
// 22 byte-sized parameters from the cosmic rules block
// ═══════════════════════════════════════════════════════════════════
export const COSMIC_PARAMETER_RANGES = [
  { min: 1, max: 100, desc: 'Road movement multiplier' },
  { min: 1, max: 100, desc: 'Trade bonus base' },
  { min: 0, max: 10,  desc: 'Food consumed per citizen per turn' },
  { min: 4, max: 20,  desc: 'Settler food cost (food rows per settler, forced even)' },
  { min: 4, max: 20,  desc: 'Shield rows multiplier' },
  { min: 0, max: 10,  desc: 'Pollution multiplier' },
  { min: 0, max: 10,  desc: 'Base unhappy citizens before content' },
  { min: 4, max: 12,  desc: 'Riot factor / content citizens base' },
  { min: 10, max: 100, desc: 'Tech paradigm / cost multiplier' },
  { min: 4, max: 50,  desc: 'City size for aqueduct requirement' },
  { min: 4, max: 50,  desc: 'City size for sewer system requirement' },
  { min: 3, max: 10,  desc: 'Tech cost multiplier / paradigm scale' },
  { min: 5, max: 100, desc: 'Trade route bonus multiplier' },
  { min: 0, max: 8,   desc: 'Food trade route threshold' },
  { min: 0, max: 8,   desc: 'Shield trade route threshold' },
  { min: 0, max: 8,   desc: 'Trade trade route threshold' },
  { min: 1, max: 20,  desc: 'Citizens per specialist' },
  { min: 0, max: 100, desc: 'Government corruption percentage' },
  { min: 0, max: 100, desc: 'Lost shields penalty threshold' },
  { min: 4, max: 100, desc: 'Max effective city distance for trade routes' },
  { min: 25, max: 200, desc: 'Science cost base' },
  { min: 0, max: 10,  desc: 'Fundamentalism max science rate' },
];

// ═══════════════════════════════════════════════════════════════════
// Save file format constants (binary ref: save-format.js)
// ═══════════════════════════════════════════════════════════════════
export const SAVE_FORMAT = {
  // File header
  MAGIC: 'CIVILIZE',
  HEADER_SIZE: 12,
  CURRENT_VERSION: 0x2C,
  VERSION_MIN: 0x26,
  VERSION_MAX: 0x2C,

  // Record sizes
  UNIT_RECORD_SIZE_SAV: 32,
  UNIT_RECORD_SIZE_SCN: 26,
  CITY_RECORD_SIZE_SAV: 88,
  CITY_RECORD_SIZE_SCN: 84,
  CIV_RECORD_STRIDE: 1428,

  // File extensions by save format
  EXTENSIONS: { 0: '.sav', 1: '.hot', 2: '.eml', 3: '.net', 4: '.net', 5: '.net', 6: '.net' },

  // Tail sizes
  TAIL_SIZE_SAV: 1807,
  TAIL_SIZE_SCN: 1907,
  TAIL_SIZE_NET: 2979,

  // Event section
  EVENT_MAGIC: 'EVNT',
  EVENT_RECORD_SIZE: 444,

  // Password storage
  PASSWORD_OFFSET_FROM_TAIL: 720,
  PASSWORD_SLOTS: 8,
  PASSWORD_BYTES_PER_SLOT: 32,
};
