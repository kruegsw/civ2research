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

// Standard MGE RULES.TXT costs (raw shield cost, ×10 for production grid)
export const UNIT_COSTS = [4,4,1,2,3,4,2,3,2,5,5,4,6,6,5,2,3,4,4,4,5,6,8,4,4,5,7,6,12,10,8,16,4,4,4,5,6,6,8,10,16,6,16,5,6,16,3,3,5,5,3,5,5,10,4,4,4,4,4,4,4,4,4].map(c => c * 10);
export const IMPROVE_COSTS = [1,10,4,6,4,8,8,8,8,8,12,12,16,16,10,20,32,20,20,16,24,16,16,12,8,20,16,10,8,32,6,16,16,6,8,8,16,32,60].map(c => c * 10);
export const WONDER_COSTS = [20,20,20,20,30,30,30,30,30,20,40,30,40,30,40,40,40,40,40,40,30,60,60,60,60,60,60,60].map(c => c * 10);

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
  3, // 15: Factory
  6, // 16: Mfg. Plant
  4, // 17: SDI Defense
  2, // 18: Recycling Center
  3, // 19: Power Plant
  3, // 20: Hydro Plant
  3, // 21: Nuclear Plant
  4, // 22: Stock Exchange
  2, // 23: Sewer System
  3, // 24: Supermarket
  3, // 25: Superhighways
  3, // 26: Research Lab
  2, // 27: SAM Battery
  1, // 28: Coastal Fortress
  3, // 29: Solar Plant
  1, // 30: Harbour
  3, // 31: Offshore Platform
  5, // 32: Airport
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
export const SEA_TRANSPORT_TYPES = new Set([32, 33, 34]);

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
  6, 6, 8, 4, 3, 5, 5,       // 37-43: Destroyer..Transport
  12, 16, 2, 3, 1, 1, 1,     // 44-50: CruiseMsl..Explorer
  1,                          // 51:   Extra Land
];

// Unit domain: 0=land, 1=sea, 2=air (indexed by unit type 0-51)
export const UNIT_DOMAIN = [
  0, 0, 0, 0, 0, 0, 0, 0,   // 0-7
  0, 0, 0, 0, 0, 0, 0,       // 8-14
  0, 0, 0, 0, 0, 0, 0, 0,    // 15-22
  0, 0, 0, 0, 2, 2, 2,       // 23-29
  2, 2, 1, 1, 1, 1, 1,       // 30-36
  1, 1, 1, 1, 1, 1, 1,       // 37-43
  2, 2, 0, 0, 0, 0, 0,       // 44-50
  0,                          // 51
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

// COSMIC parameter #11: tech cost multiplier (default 3, applied as baseCost * value / 10)
export const COSMIC_TECH_MULTIPLIER = 3;
