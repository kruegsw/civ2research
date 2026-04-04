// ═══════════════════════════════════════════════════════════════════
// mapgenSouthAmericaAfrica.js — Hardcoded real-world South America
// and Africa maps. Uses shared engine from mapgenRealWorldEngine.js
// ═══════════════════════════════════════════════════════════════════

import { generateFromPolygons, T_DESERT, T_PLAINS, T_GRASSLAND,
  T_FOREST, T_HILLS, T_MOUNTAINS, T_TUNDRA, T_GLACIER,
  T_SWAMP, T_JUNGLE } from './mapgenRealWorldEngine.js';

// ═══════════════════════════════════════════════════════════════
// SOUTH AMERICA
// ═══════════════════════════════════════════════════════════════
// Coordinate space [0-1, 0-1]
// x: ~80W→34W (west to east)  y: ~12N→56S (north to south)
// Continent spans roughly x=0.15-0.90, y=0.05-0.90

const SA_MAINLAND = [
  // Start at Colombia/Caribbean coast, go clockwise
  [0.30, 0.07],  // NW Colombia
  [0.35, 0.05],  // Caribbean coast Colombia
  [0.42, 0.05],  // Santa Marta
  [0.48, 0.06],  // Gulf of Venezuela west
  [0.55, 0.05],  // Paraguana peninsula
  [0.60, 0.07],  // Venezuela coast
  [0.68, 0.06],  // NE Venezuela
  [0.74, 0.08],  // Guyana coast
  [0.80, 0.10],  // Suriname/French Guiana
  [0.86, 0.10],  // French Guiana east
  // Bulge of Brazil
  [0.90, 0.14],  // Amapa
  [0.88, 0.18],  // Para coast
  [0.86, 0.22],  // Maranhao
  [0.88, 0.26],  // Ceara
  [0.90, 0.28],  // Easternmost point (Natal area)
  [0.89, 0.32],  // Paraiba/Pernambuco
  [0.86, 0.36],  // Alagoas/Sergipe
  [0.84, 0.40],  // Bahia
  [0.82, 0.44],  // South Bahia
  [0.80, 0.48],  // Espirito Santo
  [0.78, 0.52],  // Rio de Janeiro
  [0.74, 0.55],  // Sao Paulo coast
  [0.70, 0.58],  // Parana coast
  [0.66, 0.60],  // Santa Catarina
  [0.62, 0.63],  // Rio Grande do Sul
  // Uruguay / Argentina coast
  [0.58, 0.66],  // Uruguay coast
  [0.55, 0.68],  // Rio de la Plata
  [0.52, 0.70],  // Buenos Aires
  [0.50, 0.72],  // East Argentina
  [0.48, 0.76],  // Bahia Blanca
  [0.45, 0.80],  // Patagonia east
  [0.42, 0.84],  // Chubut coast
  [0.40, 0.86],  // Santa Cruz
  [0.38, 0.88],  // Tierra del Fuego east
  [0.34, 0.90],  // Cape Horn / Tierra del Fuego south
  // Up the west coast (Chile)
  [0.30, 0.88],  // Tierra del Fuego west
  [0.28, 0.85],  // Southern Chile
  [0.26, 0.82],  // Patagonia channels
  [0.24, 0.78],  // Chiloe area
  [0.22, 0.74],  // South-central Chile
  [0.20, 0.70],  // Central Chile (Santiago area)
  [0.18, 0.64],  // Coquimbo
  [0.17, 0.58],  // Atacama coast
  [0.16, 0.52],  // Antofagasta
  [0.17, 0.46],  // Arica/Iquique
  [0.18, 0.40],  // Peru-Chile border
  [0.19, 0.34],  // Southern Peru
  [0.18, 0.28],  // Central Peru (Lima area)
  [0.19, 0.22],  // Northern Peru
  [0.22, 0.18],  // Ecuador coast
  [0.25, 0.14],  // Ecuador/Colombia border
  [0.28, 0.10],  // SW Colombia coast
  [0.30, 0.07],  // back to start
];

// ── Terrain Regions ──

const SA_TERRAIN_REGIONS = [
  // Amazon Basin — huge jungle covering ~40% of continent
  { terrain: T_JUNGLE, polygon: [
    [0.30, 0.10], [0.40, 0.08], [0.55, 0.10], [0.70, 0.10],
    [0.82, 0.12], [0.86, 0.16], [0.84, 0.22], [0.82, 0.26],
    [0.78, 0.30], [0.72, 0.34], [0.65, 0.36], [0.58, 0.38],
    [0.50, 0.38], [0.42, 0.36], [0.35, 0.32], [0.28, 0.28],
    [0.24, 0.24], [0.22, 0.20], [0.24, 0.16], [0.28, 0.12],
  ]},

  // Andes Mountains — thin strip along entire west coast
  { terrain: T_MOUNTAINS, polygon: [
    [0.28, 0.08], [0.30, 0.07], [0.32, 0.08],
    [0.30, 0.12], [0.28, 0.16], [0.26, 0.20],
    [0.24, 0.24], [0.23, 0.28], [0.22, 0.32],
    [0.22, 0.36], [0.23, 0.40], [0.22, 0.44],
    [0.21, 0.48], [0.20, 0.52], [0.20, 0.56],
    [0.20, 0.60], [0.22, 0.64], [0.24, 0.68],
    [0.26, 0.72], [0.28, 0.76], [0.30, 0.80],
    [0.32, 0.84], [0.33, 0.86],
    [0.30, 0.86], [0.27, 0.82], [0.25, 0.78],
    [0.23, 0.74], [0.22, 0.70], [0.20, 0.66],
    [0.18, 0.62], [0.17, 0.58], [0.17, 0.54],
    [0.18, 0.50], [0.18, 0.46], [0.19, 0.42],
    [0.19, 0.38], [0.19, 0.34], [0.19, 0.30],
    [0.20, 0.26], [0.20, 0.22], [0.22, 0.18],
    [0.24, 0.14], [0.26, 0.10],
  ]},

  // Andes foothills — east side
  { terrain: T_HILLS, polygon: [
    [0.30, 0.10], [0.34, 0.10], [0.32, 0.16],
    [0.30, 0.22], [0.28, 0.28], [0.27, 0.34],
    [0.27, 0.40], [0.26, 0.46], [0.26, 0.52],
    [0.27, 0.56], [0.28, 0.60], [0.30, 0.64],
    [0.32, 0.68], [0.34, 0.72], [0.36, 0.76],
    [0.33, 0.76], [0.30, 0.72], [0.28, 0.68],
    [0.26, 0.64], [0.24, 0.60], [0.23, 0.56],
    [0.23, 0.52], [0.23, 0.46], [0.23, 0.40],
    [0.24, 0.34], [0.25, 0.28], [0.26, 0.22],
    [0.28, 0.16],
  ]},

  // Andes foothills — west side (narrow)
  { terrain: T_HILLS, polygon: [
    [0.26, 0.10], [0.28, 0.08], [0.27, 0.12],
    [0.24, 0.18], [0.22, 0.22], [0.20, 0.28],
    [0.19, 0.34], [0.18, 0.42], [0.17, 0.50],
    [0.16, 0.56], [0.16, 0.62], [0.18, 0.66],
    [0.20, 0.70], [0.22, 0.74],
    [0.20, 0.74], [0.18, 0.70], [0.16, 0.66],
    [0.15, 0.60], [0.15, 0.54], [0.16, 0.48],
    [0.17, 0.42], [0.18, 0.36], [0.18, 0.30],
    [0.19, 0.24], [0.21, 0.18], [0.24, 0.12],
  ]},

  // Guiana Highlands
  { terrain: T_HILLS, polygon: [
    [0.62, 0.08], [0.70, 0.06], [0.78, 0.08],
    [0.82, 0.10], [0.80, 0.14], [0.74, 0.16],
    [0.68, 0.14], [0.62, 0.12],
  ]},

  // Cerrado — central Brazil
  { terrain: T_PLAINS, polygon: [
    [0.55, 0.30], [0.65, 0.28], [0.75, 0.30],
    [0.80, 0.34], [0.80, 0.40], [0.78, 0.44],
    [0.72, 0.46], [0.65, 0.46], [0.58, 0.44],
    [0.52, 0.42], [0.48, 0.38], [0.50, 0.34],
  ]},

  // Gran Chaco — Paraguay / N Argentina
  { terrain: T_PLAINS, polygon: [
    [0.38, 0.46], [0.48, 0.44], [0.54, 0.48],
    [0.54, 0.54], [0.50, 0.58], [0.44, 0.58],
    [0.38, 0.56], [0.35, 0.52],
  ]},

  // Pampas — Argentina
  { terrain: T_PLAINS, polygon: [
    [0.36, 0.60], [0.44, 0.58], [0.52, 0.62],
    [0.56, 0.66], [0.54, 0.70], [0.48, 0.72],
    [0.42, 0.72], [0.36, 0.70], [0.32, 0.66],
  ]},

  // Patagonia — tundra/plains in the south
  { terrain: T_TUNDRA, polygon: [
    [0.28, 0.82], [0.36, 0.78], [0.44, 0.80],
    [0.46, 0.84], [0.44, 0.88], [0.38, 0.90],
    [0.32, 0.90], [0.28, 0.88], [0.26, 0.84],
  ]},

  // Patagonia steppe (plains overlay on northern patagonia)
  { terrain: T_PLAINS, polygon: [
    [0.30, 0.76], [0.38, 0.74], [0.46, 0.76],
    [0.48, 0.80], [0.44, 0.82], [0.36, 0.82],
    [0.30, 0.80],
  ]},

  // Atacama Desert — narrow strip on west coast
  { terrain: T_DESERT, polygon: [
    [0.16, 0.50], [0.20, 0.48], [0.22, 0.50],
    [0.22, 0.56], [0.20, 0.62], [0.18, 0.66],
    [0.16, 0.64], [0.15, 0.58], [0.15, 0.54],
  ]},

  // Brazilian Atlantic Forest — SE coast
  { terrain: T_FOREST, polygon: [
    [0.72, 0.40], [0.78, 0.38], [0.82, 0.42],
    [0.80, 0.48], [0.78, 0.52], [0.74, 0.56],
    [0.70, 0.58], [0.66, 0.60], [0.64, 0.56],
    [0.66, 0.50], [0.68, 0.44],
  ]},

  // Pantanal — swamp in western Brazil/Bolivia border
  { terrain: T_SWAMP, polygon: [
    [0.42, 0.40], [0.48, 0.38], [0.50, 0.42],
    [0.48, 0.46], [0.44, 0.46], [0.40, 0.44],
  ]},

  // Orinoco Delta / Venezuelan swamp
  { terrain: T_SWAMP, polygon: [
    [0.66, 0.08], [0.72, 0.06], [0.74, 0.10],
    [0.70, 0.12], [0.66, 0.10],
  ]},
];

// ── Rivers ──
const SA_RIVERS = [
  // Amazon — long, west to east across the continent
  [
    [0.26, 0.22], [0.30, 0.22], [0.34, 0.20], [0.38, 0.18],
    [0.42, 0.18], [0.46, 0.18], [0.50, 0.19], [0.54, 0.20],
    [0.58, 0.20], [0.62, 0.20], [0.66, 0.20], [0.70, 0.18],
    [0.74, 0.18], [0.78, 0.17], [0.82, 0.16], [0.86, 0.16],
  ],
  // Madeira — tributary from south
  [
    [0.48, 0.32], [0.50, 0.28], [0.52, 0.24], [0.54, 0.20],
  ],
  // Tocantins — central Brazil flowing north
  [
    [0.70, 0.38], [0.72, 0.34], [0.74, 0.30], [0.76, 0.26],
    [0.78, 0.22], [0.80, 0.18],
  ],
  // Sao Francisco — NE Brazil
  [
    [0.66, 0.46], [0.70, 0.42], [0.74, 0.38], [0.78, 0.36],
    [0.82, 0.34], [0.86, 0.32],
  ],
  // Parana — south through Argentina
  [
    [0.56, 0.46], [0.54, 0.50], [0.52, 0.54], [0.50, 0.58],
    [0.48, 0.62], [0.48, 0.66], [0.50, 0.68], [0.54, 0.68],
  ],
  // Orinoco — Venezuela
  [
    [0.34, 0.10], [0.40, 0.08], [0.46, 0.08], [0.52, 0.08],
    [0.58, 0.08], [0.64, 0.08], [0.68, 0.07],
  ],
  // Paraguay River
  [
    [0.44, 0.38], [0.46, 0.42], [0.48, 0.46], [0.50, 0.50],
    [0.52, 0.54],
  ],
  // Negro — tributary to Amazon from north
  [
    [0.46, 0.10], [0.48, 0.12], [0.50, 0.14], [0.52, 0.16],
    [0.54, 0.18],
  ],
];

// ── Water Cutouts ──
const SA_WATER_CUTOUTS = [
  // Lake Titicaca
  [[0.22, 0.38], [0.25, 0.37], [0.26, 0.39], [0.24, 0.40], [0.22, 0.40]],
  // Lake Maracaibo
  [[0.44, 0.06], [0.47, 0.05], [0.48, 0.07], [0.46, 0.09], [0.43, 0.08]],
];


// ═══════════════════════════════════════════════════════════════
// AFRICA
// ═══════════════════════════════════════════════════════════════
// Coordinate space [0-1, 0-1]
// x: ~18W→52E (west to east)  y: ~37N→35S (north to south)
// Continent spans roughly x=0.08-0.90, y=0.05-0.95

const AF_MAINLAND = [
  // Start at Morocco NW, go clockwise along coast
  [0.18, 0.06],  // NW Morocco
  [0.24, 0.05],  // Morocco Mediterranean coast
  [0.30, 0.06],  // Algeria coast
  [0.38, 0.06],  // Tunisia
  [0.42, 0.08],  // Gulf of Sidra west (Libya)
  [0.48, 0.10],  // Gulf of Sidra south
  [0.54, 0.08],  // Gulf of Sidra east
  [0.58, 0.06],  // Libya/Egypt border coast
  [0.64, 0.05],  // Egypt Mediterranean coast
  [0.68, 0.06],  // Nile Delta
  // Sinai and Red Sea coast
  [0.70, 0.10],  // Sinai
  [0.68, 0.14],  // Gulf of Suez
  [0.70, 0.18],  // Red Sea coast Egypt
  [0.72, 0.22],  // Sudan Red Sea coast
  [0.74, 0.26],  // Eritrea
  [0.76, 0.28],  // Djibouti
  // Horn of Africa
  [0.80, 0.27],  // Somalia north coast
  [0.86, 0.26],  // Tip of Horn of Africa
  [0.88, 0.28],  // Cape Guardafui
  [0.86, 0.32],  // Somalia east coast
  [0.82, 0.38],  // Southern Somalia
  [0.78, 0.42],  // Kenya coast
  [0.76, 0.46],  // Tanzania coast
  [0.78, 0.50],  // South Tanzania
  [0.76, 0.54],  // Mozambique north
  [0.74, 0.58],  // Mozambique central
  [0.72, 0.62],  // Mozambique south
  [0.68, 0.66],  // South Mozambique / Maputo
  // South Africa east coast
  [0.64, 0.70],  // KwaZulu-Natal
  [0.60, 0.74],  // Eastern Cape
  [0.56, 0.78],  // Port Elizabeth
  [0.50, 0.80],  // Cape Agulhas (southernmost)
  [0.46, 0.78],  // Cape of Good Hope
  // West coast going north
  [0.42, 0.76],  // West coast South Africa
  [0.38, 0.72],  // Namaqualand
  [0.34, 0.68],  // Namibia south
  [0.30, 0.64],  // Namibia central (Walvis Bay)
  [0.28, 0.58],  // Namibia north / Skeleton Coast
  [0.26, 0.54],  // Angola south
  [0.24, 0.50],  // Angola central
  [0.22, 0.46],  // Angola / DRC border
  [0.20, 0.42],  // DRC coast
  [0.18, 0.38],  // Congo/Gabon coast
  [0.16, 0.34],  // Gabon
  [0.14, 0.30],  // Cameroon coast
  // Gulf of Guinea indent
  [0.16, 0.28],  // Bight of Biafra
  [0.18, 0.26],  // Nigeria coast east
  [0.14, 0.24],  // Niger Delta area
  [0.10, 0.24],  // Bight of Benin
  [0.08, 0.24],  // Ghana coast
  [0.06, 0.24],  // Ivory Coast
  // West Africa bulge
  [0.04, 0.22],  // Liberia
  [0.04, 0.20],  // Sierra Leone
  [0.06, 0.18],  // Guinea coast
  [0.04, 0.16],  // Guinea-Bissau
  [0.06, 0.14],  // The Gambia / Senegal
  [0.04, 0.12],  // Cap-Vert (Dakar)
  [0.08, 0.10],  // Senegal north
  [0.12, 0.08],  // Mauritania coast
  [0.16, 0.06],  // Western Sahara
  [0.18, 0.06],  // back to start
];

// Madagascar — separate island
const AF_MADAGASCAR = [
  [0.78, 0.58],  // NE Madagascar
  [0.82, 0.60],  // East coast north
  [0.84, 0.64],  // East coast central
  [0.82, 0.68],  // SE Madagascar
  [0.80, 0.72],  // Southern tip
  [0.76, 0.70],  // SW coast
  [0.74, 0.66],  // West coast
  [0.76, 0.62],  // NW coast
  [0.78, 0.58],  // back to start
];

// ── Terrain Regions ──

const AF_TERRAIN_REGIONS = [
  // Sahara Desert — huge, covers northern ~30%
  { terrain: T_DESERT, polygon: [
    [0.08, 0.08], [0.16, 0.06], [0.24, 0.06], [0.38, 0.06],
    [0.52, 0.08], [0.60, 0.06], [0.68, 0.06],
    [0.70, 0.10], [0.70, 0.14], [0.68, 0.18],
    [0.64, 0.22], [0.58, 0.24], [0.50, 0.26],
    [0.42, 0.26], [0.34, 0.24], [0.26, 0.22],
    [0.18, 0.20], [0.12, 0.18], [0.08, 0.16],
    [0.06, 0.12],
  ]},

  // Sahel — band of plains below Sahara
  { terrain: T_PLAINS, polygon: [
    [0.06, 0.16], [0.12, 0.18], [0.18, 0.20],
    [0.26, 0.22], [0.34, 0.24], [0.42, 0.26],
    [0.50, 0.26], [0.58, 0.26], [0.66, 0.26],
    [0.66, 0.30], [0.58, 0.30], [0.50, 0.30],
    [0.42, 0.30], [0.34, 0.28], [0.26, 0.26],
    [0.18, 0.24], [0.10, 0.22], [0.06, 0.20],
  ]},

  // Congo Basin — central jungle
  { terrain: T_JUNGLE, polygon: [
    [0.20, 0.34], [0.28, 0.32], [0.36, 0.32],
    [0.44, 0.34], [0.52, 0.36], [0.58, 0.38],
    [0.60, 0.42], [0.58, 0.46], [0.52, 0.48],
    [0.44, 0.48], [0.36, 0.46], [0.28, 0.44],
    [0.22, 0.42], [0.18, 0.38],
  ]},

  // West African forest — Guinea/Ivory Coast/Ghana coast
  { terrain: T_FOREST, polygon: [
    [0.04, 0.20], [0.06, 0.18], [0.08, 0.20],
    [0.10, 0.22], [0.14, 0.24], [0.18, 0.26],
    [0.20, 0.28], [0.18, 0.30], [0.14, 0.28],
    [0.10, 0.26], [0.06, 0.24], [0.04, 0.22],
  ]},

  // Nigerian / Cameroon forest
  { terrain: T_FOREST, polygon: [
    [0.14, 0.26], [0.18, 0.26], [0.20, 0.30],
    [0.18, 0.34], [0.16, 0.32], [0.14, 0.30],
  ]},

  // Kalahari Desert — southwest
  { terrain: T_DESERT, polygon: [
    [0.34, 0.62], [0.42, 0.60], [0.50, 0.62],
    [0.54, 0.66], [0.52, 0.72], [0.46, 0.74],
    [0.40, 0.74], [0.36, 0.70], [0.32, 0.66],
  ]},

  // Namib Desert — narrow coastal strip
  { terrain: T_DESERT, polygon: [
    [0.28, 0.56], [0.32, 0.54], [0.34, 0.58],
    [0.34, 0.64], [0.32, 0.68], [0.30, 0.64],
    [0.28, 0.60],
  ]},

  // Ethiopian Highlands — mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.64, 0.26], [0.70, 0.24], [0.74, 0.26],
    [0.74, 0.30], [0.72, 0.34], [0.68, 0.34],
    [0.64, 0.32], [0.62, 0.28],
  ]},

  // Ethiopian Highlands — hills surrounding mountains
  { terrain: T_HILLS, polygon: [
    [0.60, 0.24], [0.66, 0.22], [0.72, 0.22],
    [0.76, 0.24], [0.78, 0.28], [0.76, 0.34],
    [0.74, 0.38], [0.70, 0.38], [0.66, 0.36],
    [0.62, 0.34], [0.60, 0.30], [0.58, 0.26],
  ]},

  // Atlas Mountains — NW corner
  { terrain: T_MOUNTAINS, polygon: [
    [0.16, 0.06], [0.22, 0.05], [0.28, 0.06],
    [0.34, 0.08], [0.32, 0.10], [0.26, 0.10],
    [0.20, 0.08], [0.16, 0.08],
  ]},

  // Atlas foothills
  { terrain: T_HILLS, polygon: [
    [0.14, 0.08], [0.20, 0.08], [0.28, 0.10],
    [0.34, 0.10], [0.36, 0.12], [0.30, 0.14],
    [0.22, 0.14], [0.16, 0.12], [0.12, 0.10],
  ]},

  // East African Rift mountains — thin strip
  { terrain: T_MOUNTAINS, polygon: [
    [0.66, 0.38], [0.68, 0.36], [0.70, 0.40],
    [0.70, 0.46], [0.68, 0.50], [0.66, 0.52],
    [0.64, 0.48], [0.64, 0.44], [0.64, 0.40],
  ]},

  // Kenya/Kilimanjaro highlands — hills
  { terrain: T_HILLS, polygon: [
    [0.62, 0.38], [0.66, 0.36], [0.72, 0.40],
    [0.74, 0.44], [0.72, 0.48], [0.68, 0.52],
    [0.64, 0.54], [0.60, 0.50], [0.60, 0.46],
    [0.60, 0.42],
  ]},

  // Drakensberg — hills/mountains in SE South Africa
  { terrain: T_HILLS, polygon: [
    [0.56, 0.68], [0.62, 0.66], [0.66, 0.68],
    [0.64, 0.74], [0.58, 0.76], [0.54, 0.72],
  ]},

  // South African bush — forest in southeast
  { terrain: T_FOREST, polygon: [
    [0.58, 0.62], [0.66, 0.60], [0.70, 0.64],
    [0.68, 0.68], [0.62, 0.70], [0.56, 0.68],
    [0.54, 0.64],
  ]},

  // East African savanna — grassland (reinforcing default) in coastal area
  { terrain: T_GRASSLAND, polygon: [
    [0.72, 0.40], [0.78, 0.42], [0.78, 0.50],
    [0.76, 0.54], [0.72, 0.52], [0.70, 0.48],
    [0.70, 0.44],
  ]},

  // East African plains — Tanzania/Kenya interior
  { terrain: T_PLAINS, polygon: [
    [0.60, 0.36], [0.66, 0.34], [0.62, 0.38],
    [0.58, 0.42], [0.56, 0.46], [0.54, 0.42],
    [0.56, 0.38],
  ]},

  // South African highveld — plains
  { terrain: T_PLAINS, polygon: [
    [0.42, 0.68], [0.50, 0.66], [0.56, 0.68],
    [0.58, 0.74], [0.54, 0.78], [0.48, 0.78],
    [0.42, 0.76], [0.38, 0.72],
  ]},

  // Sudd — swamp in South Sudan
  { terrain: T_SWAMP, polygon: [
    [0.56, 0.30], [0.60, 0.28], [0.64, 0.30],
    [0.64, 0.34], [0.60, 0.36], [0.56, 0.34],
  ]},

  // Niger Delta — swamp
  { terrain: T_SWAMP, polygon: [
    [0.12, 0.24], [0.16, 0.24], [0.18, 0.26],
    [0.16, 0.28], [0.12, 0.28], [0.10, 0.26],
  ]},

  // Okavango Delta — swamp in Botswana
  { terrain: T_SWAMP, polygon: [
    [0.40, 0.58], [0.44, 0.56], [0.46, 0.58],
    [0.44, 0.62], [0.40, 0.62],
  ]},

  // Madagascar — jungle (east side)
  { terrain: T_JUNGLE, polygon: [
    [0.78, 0.58], [0.82, 0.60], [0.84, 0.64],
    [0.82, 0.68], [0.80, 0.66], [0.80, 0.62],
    [0.78, 0.60],
  ]},

  // Madagascar — forest (west/south side)
  { terrain: T_FOREST, polygon: [
    [0.76, 0.62], [0.80, 0.60], [0.80, 0.66],
    [0.80, 0.72], [0.78, 0.70], [0.76, 0.68],
    [0.74, 0.66],
  ]},

  // Miombo woodlands — central-south forest
  { terrain: T_FOREST, polygon: [
    [0.44, 0.48], [0.52, 0.48], [0.58, 0.50],
    [0.60, 0.54], [0.56, 0.58], [0.48, 0.58],
    [0.42, 0.56], [0.40, 0.52],
  ]},
];

// ── Rivers ──
const AF_RIVERS = [
  // Nile — long, south to north through entire continent
  [
    [0.66, 0.46], [0.66, 0.42], [0.66, 0.38],
    [0.64, 0.34], [0.62, 0.30], [0.64, 0.26],
    [0.66, 0.22], [0.68, 0.18], [0.68, 0.14],
    [0.68, 0.10], [0.68, 0.06],
  ],
  // White Nile branch
  [
    [0.60, 0.36], [0.62, 0.34], [0.62, 0.30],
  ],
  // Congo River — curved through central Africa
  [
    [0.54, 0.40], [0.50, 0.40], [0.46, 0.38],
    [0.42, 0.36], [0.38, 0.36], [0.34, 0.38],
    [0.30, 0.40], [0.26, 0.42], [0.22, 0.42],
    [0.20, 0.40],
  ],
  // Congo tributaries — Kasai
  [
    [0.40, 0.48], [0.42, 0.44], [0.44, 0.40],
    [0.46, 0.38],
  ],
  // Niger River — curved arc through West Africa
  [
    [0.06, 0.22], [0.10, 0.22], [0.14, 0.20],
    [0.18, 0.18], [0.24, 0.16], [0.30, 0.16],
    [0.34, 0.18], [0.36, 0.22], [0.34, 0.24],
    [0.30, 0.26], [0.26, 0.26], [0.22, 0.26],
    [0.18, 0.26], [0.14, 0.26],
  ],
  // Zambezi — SE Africa
  [
    [0.36, 0.56], [0.40, 0.54], [0.46, 0.54],
    [0.52, 0.54], [0.58, 0.54], [0.64, 0.56],
    [0.68, 0.56], [0.72, 0.56],
  ],
  // Orange River — South Africa
  [
    [0.56, 0.72], [0.52, 0.72], [0.48, 0.74],
    [0.44, 0.74], [0.40, 0.74], [0.36, 0.72],
  ],
  // Limpopo River — South Africa/Zimbabwe
  [
    [0.52, 0.66], [0.56, 0.64], [0.60, 0.62],
    [0.64, 0.62], [0.68, 0.64],
  ],
  // Blue Nile — from Ethiopian highlands
  [
    [0.68, 0.30], [0.66, 0.28], [0.64, 0.26],
  ],
  // Senegal River
  [
    [0.06, 0.14], [0.10, 0.14], [0.14, 0.14],
    [0.18, 0.16],
  ],
];

// ── Water Cutouts ──
const AF_WATER_CUTOUTS = [
  // Lake Victoria — large, east Africa
  [
    [0.64, 0.40], [0.68, 0.38], [0.70, 0.40],
    [0.70, 0.44], [0.68, 0.46], [0.64, 0.44],
  ],
  // Lake Tanganyika — long thin, north-south
  [
    [0.56, 0.40], [0.58, 0.38], [0.60, 0.40],
    [0.60, 0.46], [0.58, 0.48], [0.56, 0.46],
  ],
  // Lake Malawi — long thin, further south
  [
    [0.66, 0.50], [0.68, 0.48], [0.70, 0.50],
    [0.70, 0.56], [0.68, 0.58], [0.66, 0.56],
  ],
  // Lake Chad — Sahel
  [
    [0.38, 0.24], [0.42, 0.24], [0.42, 0.27],
    [0.38, 0.27],
  ],
];


// ═══════════════════════════════════════════════════════════════
// Exported generator functions
// ═══════════════════════════════════════════════════════════════

export function generateMapSouthAmerica(settings = {}) {
  return generateFromPolygons(
    { width: settings.width || 80, height: settings.height || 120, ...settings },
    {
      defaultWidth: 80,
      defaultHeight: 120,
      mapShape: 1,
      polarBands: true,
      landPolygons: [SA_MAINLAND],
      waterCutouts: SA_WATER_CUTOUTS,
      terrainRegions: SA_TERRAIN_REGIONS,
      rivers: SA_RIVERS,
    }
  );
}

export function generateMapAfrica(settings = {}) {
  return generateFromPolygons(
    { width: settings.width || 80, height: settings.height || 120, ...settings },
    {
      defaultWidth: 80,
      defaultHeight: 120,
      mapShape: 1,
      polarBands: true,
      landPolygons: [AF_MAINLAND, AF_MADAGASCAR],
      waterCutouts: AF_WATER_CUTOUTS,
      terrainRegions: AF_TERRAIN_REGIONS,
      rivers: AF_RIVERS,
    }
  );
}
