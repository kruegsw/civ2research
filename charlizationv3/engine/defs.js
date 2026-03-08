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
  0:'', 1:'Fortifying', 2:'Fortified', 3:'Sleep', 4:'Build Fortress',
  5:'Build Road', 6:'Build Irrigation', 7:'Build Mine', 8:'Transform',
  9:'Clean Pollution', 10:'Build Airbase', 11:'GoTo', 255:''
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

// Improvement names indexed by build-list ID (1-38). Index 0 unused.
export const IMPROVE_NAMES = {
  1: 'Palace', 2: 'Barracks', 3: 'Granary', 4: 'Temple', 5: 'Marketplace',
  6: 'Library', 7: 'Courthouse', 8: 'City Walls', 9: 'Aqueduct',
  10: 'Bank', 11: 'Cathedral', 12: 'University', 13: 'Mass Transit',
  14: 'Recycling Center', 15: 'SDI Defense', 16: 'Factory',
  17: 'Mfg. Plant', 18: 'Power Plant', 19: 'Hydro Plant',
  20: 'Nuclear Plant', 21: 'Stock Exchange', 22: 'Sewer System',
  23: 'Superhighways', 24: 'Supermarket', 25: 'Offshore Platform',
  26: 'Harbor', 27: 'Airport', 28: 'Police Station', 29: 'Port Facility',
  30: 'Coastal Fortress', 31: 'SAM Missile Battery', 32: 'Solar Plant',
  33: 'SS Structural', 34: 'SS Component', 35: 'SS Module',
  36: 'Capitalization', 37: 'Colosseum', 38: 'Research Lab'
};

// Standard MGE RULES.TXT costs (raw shield cost, ×10 for production grid)
export const UNIT_COSTS = [4,4,1,2,3,4,2,3,2,5,5,4,6,6,5,2,3,4,4,4,5,6,8,4,4,5,7,6,12,10,8,16,4,4,4,5,6,6,8,10,16,6,16,5,6,16,3,3,5,5,3,5,5,10,4,4,4,4,4,4,4,4,4].map(c => c * 10);
export const IMPROVE_COSTS = [1,10,4,6,4,8,8,8,8,8,12,12,16,16,10,20,32,20,20,16,24,16,16,12,8,20,16,10,8,32,6,16,16,6,8,8,16,32,60].map(c => c * 10);
export const WONDER_COSTS = [20,20,20,20,30,30,30,30,30,20,40,30,40,30,40,40,40,40,40,40,30,60,60,60,60,60,60,60].map(c => c * 10);

// Civ palette colors (indexed by civ slot 0-7)
export const CIV_COLORS = ['#c80000','#ffffff','#00b400','#3250dc','#f0dc00','#00c8c8','#f08c00','#b400c8'];

// Standard civ names from LEADERS.TXT (indexed by rulesCivNumber)
export const LEADERS_TXT_NAMES = [
  'Romans','Babylonians','Germans','Egyptians','Americans','Greeks','Indians','Russians',
  'Zulus','French','Aztecs','Chinese','English','Mongols','Celts','Japanese','Vikings',
  'Spanish','Persians','Carthaginians','Sioux'
];

// Unit orders byte → shield display letter (renderer uses these)
export const ORDER_KEYS = { 1:'F', 2:'F', 3:'S', 4:'F', 5:'R', 6:'I', 7:'m', 8:'O', 9:'p', 10:'E', 11:'G' };

// Unit type classifications
export const SETTLER_TYPES = new Set([0, 1]);
export const NON_COMBAT_TYPES = new Set([0, 1, 46, 47, 48, 49, 50]);
export const SUPPORT_EXEMPT_TYPES = new Set([46, 47, 48, 49]);
