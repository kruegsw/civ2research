// ═══════════════════════════════════════════════════════════════════
// mapgenWorld.js — Hardcoded real-world World map
// Uses shared engine from mapgenRealWorldEngine.js
// ═══════════════════════════════════════════════════════════════════
//
// COORDINATE SYSTEM [0,1]x[0,1]:
//   x: 0.0 = 180W (dateline), 0.5 = Prime Meridian, 1.0 = 180E
//   y: 0.0 = 90N (North Pole), 0.5 = Equator, 1.0 = 90S (South Pole)
//   lon->x: (lon+180)/360    lat->y: (90-lat)/180
//
// Wrapping map: dateline at x=0/1 is open Pacific. No land crosses it.
// Americas: x~0.05-0.45   Europe/Africa: x~0.47-0.72   Asia: x~0.55-0.97

import { generateFromPolygons, T_DESERT, T_PLAINS, T_GRASSLAND,
  T_FOREST, T_HILLS, T_MOUNTAINS, T_TUNDRA, T_GLACIER,
  T_SWAMP, T_JUNGLE } from './mapgenRealWorldEngine.js';

// ═══════════════════════════════════════════════════════════════════
// LAND POLYGONS
// ═══════════════════════════════════════════════════════════════════

// ── North America mainland ──
const NORTH_AMERICA = [
  [0.06, 0.16],  // Alaska west
  [0.08, 0.13],  // Alaska north
  [0.12, 0.12],  // Alaska north coast
  [0.16, 0.13],  // NW Territories
  [0.20, 0.11],  // Arctic coast
  [0.24, 0.10],  // Arctic islands south
  [0.28, 0.10],  // Hudson Bay west
  [0.30, 0.12],  // Hudson Bay NW
  [0.32, 0.10],  // Hudson Bay NE
  [0.34, 0.12],  // Labrador
  [0.36, 0.14],  // Newfoundland area
  [0.35, 0.18],  // Maritimes
  [0.34, 0.22],  // New England
  [0.33, 0.26],  // Mid-Atlantic
  [0.31, 0.29],  // Virginia
  [0.30, 0.32],  // Carolinas
  [0.30, 0.35],  // Georgia
  [0.29, 0.37],  // Florida north
  [0.30, 0.40],  // Florida tip
  [0.28, 0.39],  // Florida west coast
  [0.26, 0.36],  // Gulf coast
  [0.23, 0.35],  // Louisiana
  [0.20, 0.34],  // Texas coast
  [0.18, 0.36],  // Texas south
  [0.16, 0.38],  // Mexico east
  [0.15, 0.42],  // Mexico south
  [0.13, 0.44],  // Central America north
  [0.12, 0.47],  // Central America
  [0.13, 0.49],  // Panama
  [0.12, 0.48],  // Panama west coast
  [0.11, 0.45],  // Central America west
  [0.12, 0.42],  // Mexico SW
  [0.11, 0.38],  // Baja tip area
  [0.12, 0.35],  // Mexico west coast
  [0.14, 0.32],  // Mexico NW
  [0.14, 0.28],  // SW US
  [0.12, 0.24],  // California
  [0.10, 0.22],  // Oregon
  [0.08, 0.20],  // Washington
  [0.07, 0.18],  // BC
  [0.06, 0.16],  // Alaska panhandle
];

// ── Greenland ──
const GREENLAND = [
  [0.32, 0.06],
  [0.35, 0.05],
  [0.38, 0.06],
  [0.39, 0.09],
  [0.38, 0.13],
  [0.36, 0.15],
  [0.34, 0.13],
  [0.32, 0.10],
  [0.31, 0.08],
];

// ── Cuba ──
const CUBA = [
  [0.25, 0.41],
  [0.27, 0.40],
  [0.29, 0.41],
  [0.30, 0.42],
  [0.28, 0.43],
  [0.26, 0.42],
];

// ── Hispaniola ──
const HISPANIOLA = [
  [0.31, 0.41],
  [0.33, 0.40],
  [0.34, 0.41],
  [0.33, 0.42],
  [0.31, 0.42],
];

// ── South America ──
const SOUTH_AMERICA = [
  [0.13, 0.49],  // Colombia/Panama border
  [0.15, 0.47],  // Colombia north
  [0.18, 0.46],  // Venezuela coast
  [0.21, 0.45],  // Venezuela east
  [0.24, 0.47],  // Guyana
  [0.26, 0.49],  // Suriname/French Guiana
  [0.28, 0.50],  // Brazil NE tip
  [0.30, 0.53],  // Brazil bulge east
  [0.31, 0.56],  // Brazil east coast
  [0.30, 0.60],  // Brazil SE
  [0.28, 0.64],  // SE Brazil
  [0.26, 0.67],  // Uruguay
  [0.24, 0.70],  // Argentina east
  [0.21, 0.74],  // Argentina SE
  [0.19, 0.78],  // Patagonia
  [0.18, 0.82],  // Tierra del Fuego
  [0.16, 0.80],  // Chile south
  [0.15, 0.76],  // Chile
  [0.14, 0.70],  // Chile mid
  [0.13, 0.64],  // Chile/Peru border
  [0.12, 0.58],  // Peru coast
  [0.11, 0.52],  // Ecuador
  [0.12, 0.50],  // Colombia west
];

// ── Europe mainland ──
const EUROPE = [
  [0.47, 0.22],  // Portugal
  [0.47, 0.19],  // Spain NW
  [0.48, 0.17],  // France west
  [0.50, 0.15],  // France north/Brittany
  [0.51, 0.17],  // France east
  [0.52, 0.14],  // Netherlands/Belgium
  [0.53, 0.13],  // Denmark
  [0.54, 0.10],  // Scandinavia south
  [0.55, 0.08],  // Norway
  [0.56, 0.06],  // North Cape
  [0.58, 0.07],  // Finland north
  [0.60, 0.08],  // Kola peninsula
  [0.62, 0.10],  // Russia NW
  [0.65, 0.12],  // Russia
  [0.68, 0.14],  // Russia central
  [0.68, 0.17],  // Russia south
  [0.65, 0.19],  // Ukraine
  [0.62, 0.21],  // Romania
  [0.60, 0.22],  // Greece north
  [0.58, 0.24],  // Greece
  [0.57, 0.22],  // Albania/Montenegro
  [0.55, 0.21],  // Italy south
  [0.54, 0.19],  // Italy mid
  [0.53, 0.17],  // Italy north (Alps)
  [0.51, 0.19],  // France south
  [0.49, 0.21],  // Spain east
  [0.48, 0.23],  // Spain south
  [0.47, 0.22],  // Portugal south
];

// ── Britain ──
const BRITAIN = [
  [0.49, 0.11],
  [0.50, 0.12],
  [0.51, 0.11],
  [0.51, 0.13],
  [0.50, 0.15],
  [0.49, 0.14],
  [0.49, 0.12],
];

// ── Iceland ──
const ICELAND = [
  [0.44, 0.08],
  [0.45, 0.07],
  [0.46, 0.08],
  [0.46, 0.09],
  [0.44, 0.09],
];

// ── Africa ──
const AFRICA = [
  [0.48, 0.24],  // Morocco NW
  [0.50, 0.23],  // Morocco/Algeria coast
  [0.53, 0.23],  // Tunisia
  [0.55, 0.24],  // Libya coast
  [0.58, 0.24],  // Libya/Egypt border
  [0.59, 0.23],  // Egypt north
  [0.60, 0.25],  // Egypt NE (Sinai)
  [0.59, 0.28],  // Egypt east coast
  [0.60, 0.33],  // Sudan coast
  [0.62, 0.39],  // Horn of Africa
  [0.64, 0.44],  // Somalia tip
  [0.62, 0.47],  // Kenya/Tanzania
  [0.60, 0.52],  // Mozambique north
  [0.58, 0.56],  // Mozambique
  [0.57, 0.60],  // South Africa east
  [0.56, 0.64],  // South Africa SE
  [0.54, 0.67],  // Cape of Good Hope
  [0.52, 0.65],  // South Africa west
  [0.51, 0.60],  // Namibia
  [0.50, 0.55],  // Angola
  [0.49, 0.50],  // Congo/Gabon
  [0.50, 0.46],  // Cameroon/Nigeria
  [0.48, 0.44],  // Ghana/Ivory Coast
  [0.46, 0.42],  // Liberia/Sierra Leone
  [0.45, 0.39],  // Guinea
  [0.45, 0.36],  // Senegal
  [0.46, 0.32],  // Western Sahara
  [0.47, 0.28],  // Morocco west coast
  [0.48, 0.24],  // Morocco NW
];

// ── Madagascar ──
const MADAGASCAR = [
  [0.62, 0.56],
  [0.63, 0.54],
  [0.64, 0.56],
  [0.63, 0.60],
  [0.62, 0.59],
];

// ── Asia (massive polygon) ──
const ASIA = [
  [0.60, 0.22],  // Turkey west (connects near Europe but separate polygon)
  [0.62, 0.21],  // Turkey
  [0.65, 0.19],  // Caucasus
  [0.68, 0.17],  // Russia south
  [0.72, 0.15],  // Kazakhstan
  [0.76, 0.13],  // Central Russia
  [0.80, 0.11],  // Siberia west
  [0.84, 0.10],  // Siberia central
  [0.88, 0.08],  // Siberia NE
  [0.91, 0.07],  // Russia far east
  [0.93, 0.09],  // Kamchatka area
  [0.94, 0.12],  // Russia Pacific coast
  [0.93, 0.16],  // Sea of Okhotsk
  [0.91, 0.19],  // Russia/China border
  [0.89, 0.22],  // Manchuria
  [0.87, 0.25],  // Korea area
  [0.86, 0.28],  // China east
  [0.84, 0.32],  // China SE coast
  [0.82, 0.35],  // South China
  [0.80, 0.38],  // Vietnam
  [0.78, 0.42],  // SE Asia
  [0.76, 0.45],  // Malay peninsula north
  [0.74, 0.48],  // Malay peninsula tip
  [0.72, 0.44],  // Myanmar coast
  [0.70, 0.40],  // Bangladesh
  [0.69, 0.38],  // India east
  [0.70, 0.35],  // India SE
  [0.71, 0.32],  // India south tip
  [0.69, 0.34],  // India SW (Malabar)
  [0.68, 0.36],  // India west
  [0.67, 0.32],  // India NW (Gujarat)
  [0.66, 0.28],  // Pakistan
  [0.65, 0.25],  // Afghanistan/Iran
  [0.63, 0.24],  // Iran
  [0.62, 0.26],  // Persian Gulf north
  [0.63, 0.28],  // Arabia NE
  [0.64, 0.32],  // Arabia east
  [0.64, 0.36],  // Arabia SE (Oman)
  [0.62, 0.38],  // Yemen
  [0.60, 0.36],  // Yemen/Red Sea
  [0.60, 0.32],  // Red Sea west
  [0.60, 0.28],  // Sinai/Jordan
  [0.60, 0.25],  // Levant
  [0.60, 0.22],  // Turkey west
];

// ── Japan ──
const JAPAN = [
  [0.89, 0.24],
  [0.90, 0.22],
  [0.91, 0.20],
  [0.92, 0.22],
  [0.91, 0.25],
  [0.90, 0.27],
  [0.89, 0.26],
];

// ── Sri Lanka ──
const SRI_LANKA = [
  [0.71, 0.36],
  [0.72, 0.35],
  [0.72, 0.37],
  [0.71, 0.38],
];

// ── Borneo ──
const BORNEO = [
  [0.78, 0.48],
  [0.80, 0.47],
  [0.82, 0.49],
  [0.81, 0.52],
  [0.79, 0.51],
];

// ── Sumatra ──
const SUMATRA = [
  [0.74, 0.50],
  [0.76, 0.48],
  [0.77, 0.51],
  [0.76, 0.54],
  [0.74, 0.53],
];

// ── Australia ──
const AUSTRALIA = [
  [0.86, 0.58],  // NW coast
  [0.88, 0.56],  // Top End west
  [0.90, 0.55],  // Darwin area
  [0.91, 0.56],  // Arnhem Land
  [0.92, 0.55],  // Gulf of Carpentaria west
  [0.92, 0.57],  // Gulf of Carpentaria south
  [0.93, 0.55],  // Cape York west
  [0.94, 0.54],  // Cape York tip
  [0.95, 0.57],  // Queensland coast
  [0.96, 0.61],  // Queensland SE
  [0.95, 0.65],  // NSW coast
  [0.94, 0.68],  // Victoria
  [0.92, 0.70],  // SE corner
  [0.89, 0.70],  // Great Australian Bight east
  [0.87, 0.69],  // South Australia
  [0.85, 0.67],  // Great Australian Bight west
  [0.84, 0.64],  // WA south coast
  [0.84, 0.60],  // WA west coast
  [0.86, 0.58],  // NW coast
];

// ── Tasmania ──
const TASMANIA = [
  [0.93, 0.72],
  [0.95, 0.71],
  [0.95, 0.73],
  [0.93, 0.74],
];

// ── New Zealand North Island ──
const NZ_NORTH = [
  [0.97, 0.68],
  [0.98, 0.66],
  [0.98, 0.68],
  [0.97, 0.70],
];

// ── New Zealand South Island ──
const NZ_SOUTH = [
  [0.96, 0.71],
  [0.97, 0.70],
  [0.98, 0.72],
  [0.97, 0.75],
  [0.96, 0.74],
];

// ── Antarctica ──
const ANTARCTICA = [
  [0.05, 0.93],
  [0.10, 0.91],
  [0.18, 0.90],
  [0.22, 0.87],  // Antarctic Peninsula
  [0.24, 0.90],
  [0.30, 0.92],
  [0.40, 0.93],
  [0.50, 0.92],
  [0.60, 0.93],
  [0.70, 0.92],
  [0.80, 0.93],
  [0.90, 0.92],
  [0.95, 0.93],
  [0.95, 0.98],
  [0.05, 0.98],
];

// ═══════════════════════════════════════════════════════════════════
// WATER CUTOUTS
// ═══════════════════════════════════════════════════════════════════

// ── Great Lakes (simplified single polygon) ──
const GREAT_LAKES = [
  [0.25, 0.27],
  [0.27, 0.26],
  [0.29, 0.27],
  [0.30, 0.26],
  [0.31, 0.27],
  [0.30, 0.29],
  [0.28, 0.29],
  [0.26, 0.28],
];

// ── Caspian Sea ──
const CASPIAN_SEA = [
  [0.64, 0.19],
  [0.65, 0.18],
  [0.66, 0.19],
  [0.66, 0.22],
  [0.65, 0.24],
  [0.64, 0.22],
];

// ── Black Sea ──
const BLACK_SEA = [
  [0.58, 0.20],
  [0.60, 0.19],
  [0.62, 0.19],
  [0.63, 0.20],
  [0.62, 0.21],
  [0.60, 0.21],
  [0.58, 0.21],
];

// ── Lake Victoria ──
const LAKE_VICTORIA = [
  [0.58, 0.45],
  [0.59, 0.44],
  [0.60, 0.45],
  [0.59, 0.47],
  [0.58, 0.46],
];

// ── Lake Baikal ──
const LAKE_BAIKAL = [
  [0.80, 0.13],
  [0.81, 0.12],
  [0.82, 0.13],
  [0.81, 0.15],
  [0.80, 0.14],
];

// ═══════════════════════════════════════════════════════════════════
// TERRAIN REGIONS
// ═══════════════════════════════════════════════════════════════════

const TERRAIN_REGIONS = [

  // ─── North America ───

  // Rocky Mountains (thin strip from Alaska to Mexico)
  { terrain: T_MOUNTAINS, polygon: [
    [0.08, 0.15], [0.10, 0.14], [0.12, 0.16], [0.13, 0.20],
    [0.14, 0.24], [0.15, 0.28], [0.16, 0.32], [0.15, 0.35],
    [0.14, 0.32], [0.13, 0.28], [0.12, 0.24], [0.10, 0.20],
    [0.08, 0.17],
  ]},

  // Great Plains
  { terrain: T_PLAINS, polygon: [
    [0.18, 0.20], [0.24, 0.19], [0.28, 0.22], [0.28, 0.28],
    [0.26, 0.32], [0.22, 0.34], [0.18, 0.32], [0.16, 0.28],
    [0.16, 0.24],
  ]},

  // Eastern forest (Appalachians and eastern seaboard)
  { terrain: T_FOREST, polygon: [
    [0.28, 0.20], [0.32, 0.18], [0.35, 0.17], [0.35, 0.22],
    [0.33, 0.26], [0.32, 0.30], [0.30, 0.33], [0.28, 0.30],
    [0.27, 0.26], [0.27, 0.22],
  ]},

  // Canadian boreal forest
  { terrain: T_FOREST, polygon: [
    [0.14, 0.13], [0.20, 0.12], [0.26, 0.12], [0.30, 0.13],
    [0.32, 0.15], [0.30, 0.17], [0.26, 0.18], [0.20, 0.17],
    [0.16, 0.16],
  ]},

  // Canadian tundra
  { terrain: T_TUNDRA, polygon: [
    [0.12, 0.10], [0.18, 0.09], [0.24, 0.09], [0.30, 0.10],
    [0.33, 0.12], [0.30, 0.13], [0.24, 0.12], [0.18, 0.12],
    [0.14, 0.12],
  ]},

  // SW desert (Sonoran/Chihuahuan)
  { terrain: T_DESERT, polygon: [
    [0.12, 0.28], [0.16, 0.28], [0.18, 0.32], [0.16, 0.36],
    [0.14, 0.36], [0.12, 0.34], [0.11, 0.30],
  ]},

  // Central America jungle
  { terrain: T_JUNGLE, polygon: [
    [0.11, 0.42], [0.14, 0.40], [0.16, 0.42], [0.16, 0.46],
    [0.14, 0.48], [0.12, 0.48], [0.11, 0.46],
  ]},

  // Greenland glacier
  { terrain: T_GLACIER, polygon: [
    [0.31, 0.05], [0.36, 0.04], [0.40, 0.06], [0.40, 0.10],
    [0.38, 0.14], [0.35, 0.16], [0.33, 0.14], [0.31, 0.10],
    [0.30, 0.07],
  ]},

  // ─── South America ───

  // Andes (western coast strip)
  { terrain: T_MOUNTAINS, polygon: [
    [0.12, 0.48], [0.14, 0.47], [0.15, 0.50], [0.14, 0.55],
    [0.14, 0.60], [0.14, 0.65], [0.15, 0.70], [0.16, 0.75],
    [0.17, 0.78], [0.15, 0.78], [0.14, 0.74], [0.13, 0.68],
    [0.12, 0.62], [0.11, 0.56], [0.11, 0.50],
  ]},

  // Amazon jungle
  { terrain: T_JUNGLE, polygon: [
    [0.14, 0.50], [0.18, 0.47], [0.22, 0.48], [0.26, 0.50],
    [0.28, 0.52], [0.30, 0.54], [0.28, 0.58], [0.24, 0.58],
    [0.20, 0.56], [0.16, 0.54], [0.14, 0.52],
  ]},

  // Pampas
  { terrain: T_PLAINS, polygon: [
    [0.20, 0.66], [0.24, 0.64], [0.28, 0.66], [0.26, 0.70],
    [0.22, 0.72], [0.20, 0.70],
  ]},

  // Patagonia
  { terrain: T_TUNDRA, polygon: [
    [0.16, 0.76], [0.20, 0.76], [0.22, 0.78], [0.20, 0.82],
    [0.18, 0.82], [0.16, 0.80],
  ]},

  // Atacama desert
  { terrain: T_DESERT, polygon: [
    [0.12, 0.58], [0.14, 0.57], [0.15, 0.60], [0.15, 0.65],
    [0.14, 0.68], [0.12, 0.66], [0.12, 0.62],
  ]},

  // Brazilian highlands forest
  { terrain: T_FOREST, polygon: [
    [0.26, 0.58], [0.30, 0.56], [0.31, 0.60], [0.30, 0.64],
    [0.28, 0.66], [0.26, 0.64], [0.25, 0.60],
  ]},

  // ─── Europe ───

  // Alps
  { terrain: T_MOUNTAINS, polygon: [
    [0.51, 0.17], [0.52, 0.16], [0.54, 0.17], [0.54, 0.18],
    [0.52, 0.18], [0.51, 0.18],
  ]},

  // Scandinavian Mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.54, 0.08], [0.55, 0.06], [0.56, 0.07], [0.56, 0.10],
    [0.55, 0.12], [0.54, 0.10],
  ]},

  // European forest (Russia/Scandinavia)
  { terrain: T_FOREST, polygon: [
    [0.56, 0.08], [0.60, 0.08], [0.64, 0.10], [0.68, 0.12],
    [0.68, 0.16], [0.65, 0.18], [0.62, 0.16], [0.58, 0.14],
    [0.56, 0.11],
  ]},

  // Central European plains
  { terrain: T_PLAINS, polygon: [
    [0.52, 0.13], [0.55, 0.12], [0.58, 0.13], [0.60, 0.15],
    [0.58, 0.17], [0.55, 0.17], [0.52, 0.16],
  ]},

  // Mediterranean hills (Italy, Greece, Spain)
  { terrain: T_HILLS, polygon: [
    [0.47, 0.20], [0.50, 0.19], [0.53, 0.20], [0.56, 0.21],
    [0.58, 0.23], [0.56, 0.24], [0.53, 0.23], [0.50, 0.22],
    [0.48, 0.22],
  ]},

  // ─── Africa ───

  // Sahara Desert (northern third)
  { terrain: T_DESERT, polygon: [
    [0.46, 0.28], [0.48, 0.25], [0.52, 0.24], [0.56, 0.25],
    [0.58, 0.26], [0.60, 0.28], [0.60, 0.33], [0.58, 0.36],
    [0.55, 0.38], [0.52, 0.38], [0.49, 0.37], [0.47, 0.35],
    [0.46, 0.32],
  ]},

  // Sahel (plains band)
  { terrain: T_PLAINS, polygon: [
    [0.46, 0.36], [0.50, 0.38], [0.54, 0.38], [0.58, 0.37],
    [0.60, 0.38], [0.58, 0.40], [0.54, 0.41], [0.50, 0.42],
    [0.47, 0.41], [0.45, 0.39],
  ]},

  // Congo jungle
  { terrain: T_JUNGLE, polygon: [
    [0.50, 0.46], [0.53, 0.44], [0.56, 0.45], [0.58, 0.47],
    [0.57, 0.50], [0.55, 0.52], [0.52, 0.52], [0.50, 0.50],
    [0.49, 0.48],
  ]},

  // West African forest
  { terrain: T_FOREST, polygon: [
    [0.46, 0.42], [0.49, 0.41], [0.50, 0.44], [0.49, 0.46],
    [0.47, 0.45], [0.45, 0.43],
  ]},

  // East African highlands/mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.58, 0.40], [0.60, 0.38], [0.62, 0.40], [0.62, 0.44],
    [0.60, 0.46], [0.58, 0.44], [0.58, 0.42],
  ]},

  // East African hills
  { terrain: T_HILLS, polygon: [
    [0.56, 0.42], [0.58, 0.40], [0.60, 0.42], [0.60, 0.48],
    [0.58, 0.50], [0.56, 0.48], [0.56, 0.44],
  ]},

  // Kalahari desert
  { terrain: T_DESERT, polygon: [
    [0.52, 0.60], [0.55, 0.58], [0.56, 0.62], [0.55, 0.65],
    [0.53, 0.66], [0.51, 0.64], [0.51, 0.62],
  ]},

  // Southern Africa forest
  { terrain: T_FOREST, polygon: [
    [0.56, 0.55], [0.58, 0.54], [0.59, 0.58], [0.57, 0.60],
    [0.55, 0.58],
  ]},

  // ─── Asia ───

  // Himalayas
  { terrain: T_MOUNTAINS, polygon: [
    [0.68, 0.28], [0.70, 0.27], [0.73, 0.28], [0.76, 0.29],
    [0.78, 0.30], [0.76, 0.31], [0.73, 0.30], [0.70, 0.29],
    [0.68, 0.29],
  ]},

  // Tibetan plateau (hills)
  { terrain: T_HILLS, polygon: [
    [0.74, 0.26], [0.78, 0.26], [0.82, 0.28], [0.82, 0.32],
    [0.78, 0.32], [0.74, 0.30], [0.73, 0.28],
  ]},

  // Siberian tundra
  { terrain: T_TUNDRA, polygon: [
    [0.72, 0.06], [0.78, 0.06], [0.84, 0.06], [0.90, 0.06],
    [0.94, 0.08], [0.92, 0.10], [0.86, 0.09], [0.80, 0.09],
    [0.74, 0.08], [0.70, 0.08],
  ]},

  // Siberian taiga (forest)
  { terrain: T_FOREST, polygon: [
    [0.72, 0.09], [0.78, 0.08], [0.84, 0.09], [0.90, 0.10],
    [0.93, 0.12], [0.92, 0.16], [0.88, 0.16], [0.84, 0.14],
    [0.80, 0.13], [0.76, 0.12], [0.72, 0.12],
  ]},

  // Gobi Desert
  { terrain: T_DESERT, polygon: [
    [0.78, 0.18], [0.82, 0.17], [0.85, 0.19], [0.86, 0.22],
    [0.84, 0.24], [0.80, 0.22], [0.78, 0.20],
  ]},

  // Arabian Desert
  { terrain: T_DESERT, polygon: [
    [0.60, 0.27], [0.63, 0.26], [0.64, 0.28], [0.65, 0.32],
    [0.64, 0.36], [0.62, 0.38], [0.60, 0.36], [0.60, 0.32],
    [0.60, 0.28],
  ]},

  // Indian plains (Ganges)
  { terrain: T_PLAINS, polygon: [
    [0.68, 0.30], [0.71, 0.29], [0.73, 0.32], [0.72, 0.36],
    [0.70, 0.38], [0.68, 0.36], [0.67, 0.33],
  ]},

  // Indian jungle (southern India)
  { terrain: T_JUNGLE, polygon: [
    [0.69, 0.35], [0.71, 0.34], [0.72, 0.36], [0.71, 0.39],
    [0.69, 0.38], [0.68, 0.37],
  ]},

  // SE Asian jungle
  { terrain: T_JUNGLE, polygon: [
    [0.74, 0.42], [0.78, 0.40], [0.80, 0.42], [0.82, 0.44],
    [0.80, 0.48], [0.76, 0.48], [0.74, 0.46],
  ]},

  // Central Asian steppe (plains)
  { terrain: T_PLAINS, polygon: [
    [0.68, 0.16], [0.72, 0.14], [0.76, 0.15], [0.80, 0.16],
    [0.80, 0.20], [0.76, 0.20], [0.72, 0.18], [0.68, 0.18],
  ]},

  // Chinese forest/farmland
  { terrain: T_FOREST, polygon: [
    [0.82, 0.24], [0.86, 0.22], [0.88, 0.26], [0.87, 0.30],
    [0.84, 0.32], [0.82, 0.30], [0.81, 0.26],
  ]},

  // Iranian/Afghan desert
  { terrain: T_DESERT, polygon: [
    [0.63, 0.24], [0.66, 0.23], [0.68, 0.26], [0.67, 0.29],
    [0.65, 0.28], [0.63, 0.26],
  ]},

  // Ural mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.68, 0.10], [0.69, 0.09], [0.70, 0.11], [0.70, 0.15],
    [0.69, 0.17], [0.68, 0.15], [0.68, 0.12],
  ]},

  // Caucasus mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.62, 0.19], [0.64, 0.18], [0.65, 0.19], [0.64, 0.21],
    [0.62, 0.20],
  ]},

  // Myanmar/Indochina mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.72, 0.40], [0.74, 0.38], [0.76, 0.40], [0.76, 0.44],
    [0.74, 0.44], [0.72, 0.42],
  ]},

  // ─── Australia ───

  // Outback desert (most of interior)
  { terrain: T_DESERT, polygon: [
    [0.86, 0.60], [0.90, 0.58], [0.93, 0.60], [0.94, 0.64],
    [0.93, 0.68], [0.90, 0.68], [0.87, 0.67], [0.85, 0.65],
    [0.85, 0.62],
  ]},

  // Eastern Australian forest
  { terrain: T_FOREST, polygon: [
    [0.93, 0.56], [0.95, 0.58], [0.96, 0.62], [0.95, 0.66],
    [0.94, 0.68], [0.93, 0.66], [0.93, 0.62], [0.93, 0.58],
  ]},

  // ─── Antarctica ───

  // Glacier covering the whole continent
  { terrain: T_GLACIER, polygon: [
    [0.04, 0.88], [0.20, 0.86], [0.40, 0.88], [0.60, 0.88],
    [0.80, 0.88], [0.96, 0.88], [0.96, 0.99], [0.04, 0.99],
  ]},
];

// ═══════════════════════════════════════════════════════════════════
// RIVERS
// ═══════════════════════════════════════════════════════════════════

const RIVERS = [
  // Mississippi (Minnesota to Gulf of Mexico)
  [[0.22, 0.22], [0.23, 0.26], [0.24, 0.30], [0.23, 0.33], [0.23, 0.35]],

  // Amazon (Andes to Atlantic)
  [[0.14, 0.52], [0.18, 0.52], [0.22, 0.52], [0.26, 0.51], [0.29, 0.52]],

  // Nile (Lake Victoria to Mediterranean)
  [[0.59, 0.45], [0.59, 0.40], [0.59, 0.36], [0.59, 0.32], [0.59, 0.28], [0.59, 0.24]],

  // Congo (central Africa)
  [[0.54, 0.50], [0.52, 0.48], [0.51, 0.46], [0.53, 0.44], [0.56, 0.46]],

  // Danube (central Europe to Black Sea)
  [[0.53, 0.17], [0.55, 0.18], [0.57, 0.19], [0.60, 0.20]],

  // Yangtze (Tibet to East China Sea)
  [[0.76, 0.30], [0.79, 0.30], [0.82, 0.30], [0.85, 0.29]],

  // Yellow River (Qinghai to Bohai Sea)
  [[0.76, 0.28], [0.79, 0.26], [0.82, 0.24], [0.85, 0.24]],

  // Ganges (Himalayas to Bay of Bengal)
  [[0.69, 0.29], [0.70, 0.32], [0.71, 0.34], [0.72, 0.36]],

  // Indus (Himalayas to Arabian Sea)
  [[0.68, 0.28], [0.67, 0.30], [0.66, 0.33], [0.66, 0.36]],

  // Mekong (Tibet to South China Sea)
  [[0.76, 0.30], [0.77, 0.34], [0.78, 0.38], [0.78, 0.42], [0.78, 0.46]],

  // Volga (central Russia to Caspian)
  [[0.62, 0.12], [0.63, 0.14], [0.64, 0.17], [0.65, 0.20]],

  // Ob (Siberia, south to north)
  [[0.76, 0.16], [0.75, 0.13], [0.74, 0.10], [0.73, 0.08]],

  // Murray-Darling (SE Australia)
  [[0.92, 0.68], [0.93, 0.66], [0.94, 0.64], [0.95, 0.62]],

  // Niger (West Africa)
  [[0.46, 0.40], [0.48, 0.42], [0.50, 0.43], [0.51, 0.44]],

  // Zambezi (southern Africa)
  [[0.54, 0.54], [0.56, 0.55], [0.58, 0.55]],
];

// ═══════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════

export function generateMapWorld(settings = {}) {
  return generateFromPolygons(
    { width: settings.width || 160, height: settings.height || 80, ...settings },
    {
      defaultWidth: 160,
      defaultHeight: 80,
      mapShape: 0,
      polarBands: true,
      wrapping: true,
      landPolygons: [
        NORTH_AMERICA, GREENLAND, CUBA, HISPANIOLA,
        SOUTH_AMERICA,
        EUROPE, BRITAIN, ICELAND,
        AFRICA, MADAGASCAR,
        ASIA, JAPAN, SRI_LANKA, BORNEO, SUMATRA,
        AUSTRALIA, TASMANIA, NZ_NORTH, NZ_SOUTH,
        ANTARCTICA,
      ],
      waterCutouts: [
        GREAT_LAKES, CASPIAN_SEA, BLACK_SEA, LAKE_VICTORIA, LAKE_BAIKAL,
      ],
      terrainRegions: TERRAIN_REGIONS,
      rivers: RIVERS,
    }
  );
}
