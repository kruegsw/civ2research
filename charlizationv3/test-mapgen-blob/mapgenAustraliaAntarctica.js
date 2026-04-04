// ═══════════════════════════════════════════════════════════════════
// mapgenAustraliaAntarctica.js — Hardcoded real-world maps:
//   Australia (+Oceania) and Antarctica
// Uses shared engine from mapgenRealWorldEngine.js
// ═══════════════════════════════════════════════════════════════════

import { generateFromPolygons, T_DESERT, T_PLAINS, T_GRASSLAND,
  T_FOREST, T_HILLS, T_MOUNTAINS, T_TUNDRA, T_GLACIER,
  T_SWAMP, T_JUNGLE } from './mapgenRealWorldEngine.js';

// ═══════════════════════════════════════════════════════════════
// AUSTRALIA + OCEANIA
// ═══════════════════════════════════════════════════════════════
// Coordinates: [0,1]×[0,1] geographic space
// x=0 west, x=1 east, y=0 north (top), y=1 south (bottom)

// ── Land polygons ──

const AU_MAINLAND = [
  // Cape York peninsula (NE tip)
  [0.58, 0.30], [0.60, 0.32], [0.61, 0.35],
  // East coast — south of Cape York
  [0.62, 0.38], [0.63, 0.41],
  // Gulf of Carpentaria — indent
  [0.55, 0.34], [0.50, 0.33], [0.47, 0.35],
  // Arnhem Land peninsula
  [0.42, 0.32], [0.38, 0.30], [0.35, 0.32],
  // NW coast (Kimberley, Pilbara)
  [0.30, 0.35], [0.24, 0.40], [0.20, 0.44],
  // West coast
  [0.17, 0.50], [0.15, 0.56], [0.16, 0.62],
  // SW coast
  [0.18, 0.68], [0.22, 0.72],
  // Great Australian Bight (south coast indent)
  [0.30, 0.74], [0.38, 0.75], [0.44, 0.74],
  // South coast — Spencer Gulf area
  [0.50, 0.73], [0.54, 0.72],
  // SE corner — Melbourne area
  [0.58, 0.70], [0.62, 0.68],
  // Cape Howe (SE tip)
  [0.65, 0.65],
  // East coast — heading north
  [0.66, 0.60], [0.67, 0.55], [0.68, 0.50],
  [0.67, 0.45], [0.65, 0.40], [0.63, 0.36],
  // Close back to Cape York
  [0.60, 0.32],
];

const AU_TASMANIA = [
  [0.57, 0.78], [0.62, 0.78], [0.64, 0.80],
  [0.62, 0.84], [0.57, 0.83],
];

const NZ_NORTH_ISLAND = [
  [0.86, 0.56], [0.90, 0.55], [0.92, 0.58],
  [0.91, 0.63], [0.87, 0.64],
];

const NZ_SOUTH_ISLAND = [
  [0.84, 0.66], [0.88, 0.65], [0.90, 0.68],
  [0.89, 0.74], [0.85, 0.76],
];

const PAPUA_NEW_GUINEA = [
  [0.48, 0.06], [0.55, 0.05], [0.62, 0.06],
  [0.70, 0.08], [0.72, 0.12],
  [0.65, 0.14], [0.55, 0.13], [0.48, 0.10],
];

// ── Terrain regions ──

const AU_TERRAIN_REGIONS = [
  // Great Sandy / Gibson / Simpson deserts — huge central + western interior
  { terrain: T_DESERT, polygon: [
    [0.25, 0.40], [0.35, 0.36], [0.45, 0.38], [0.55, 0.42],
    [0.58, 0.50], [0.56, 0.58], [0.52, 0.64], [0.48, 0.68],
    [0.40, 0.70], [0.32, 0.68], [0.25, 0.62], [0.20, 0.54],
    [0.20, 0.46],
  ]},

  // Tropical north — Top End jungle strip
  { terrain: T_JUNGLE, polygon: [
    [0.35, 0.30], [0.42, 0.30], [0.50, 0.32], [0.55, 0.33],
    [0.58, 0.30], [0.60, 0.33], [0.58, 0.37], [0.50, 0.38],
    [0.42, 0.36], [0.35, 0.35],
  ]},

  // Great Dividing Range — hills along east coast
  { terrain: T_HILLS, polygon: [
    [0.62, 0.36], [0.66, 0.38], [0.68, 0.42], [0.69, 0.48],
    [0.68, 0.54], [0.67, 0.58], [0.66, 0.62], [0.64, 0.66],
    [0.60, 0.68], [0.61, 0.62], [0.62, 0.56], [0.63, 0.50],
    [0.64, 0.44], [0.63, 0.38],
  ]},

  // Great Dividing Range — small mountains strip (Blue Mountains, Snowy Mtns)
  { terrain: T_MOUNTAINS, polygon: [
    [0.64, 0.50], [0.67, 0.52], [0.67, 0.58], [0.66, 0.63],
    [0.63, 0.66], [0.62, 0.62], [0.63, 0.56],
  ]},

  // Eastern forests — along the Great Dividing Range
  { terrain: T_FOREST, polygon: [
    [0.60, 0.34], [0.64, 0.36], [0.66, 0.40], [0.67, 0.46],
    [0.66, 0.52], [0.65, 0.58], [0.64, 0.64], [0.62, 0.67],
    [0.58, 0.68], [0.59, 0.62], [0.60, 0.54], [0.60, 0.46],
    [0.60, 0.40],
  ]},

  // Nullarbor Plain — south
  { terrain: T_PLAINS, polygon: [
    [0.30, 0.70], [0.38, 0.72], [0.46, 0.72], [0.52, 0.70],
    [0.50, 0.68], [0.42, 0.68], [0.34, 0.68],
  ]},

  // Western Australian scrub — scattered plains
  { terrain: T_PLAINS, polygon: [
    [0.16, 0.50], [0.22, 0.44], [0.26, 0.42],
    [0.24, 0.50], [0.22, 0.56], [0.18, 0.58],
  ]},

  // SW Western Australia — more plains
  { terrain: T_PLAINS, polygon: [
    [0.16, 0.60], [0.20, 0.58], [0.24, 0.62],
    [0.22, 0.70], [0.18, 0.68],
  ]},

  // Tasmania — forest
  { terrain: T_FOREST, polygon: [
    [0.55, 0.77], [0.65, 0.77], [0.66, 0.85],
    [0.55, 0.85],
  ]},

  // New Zealand North Island — forest
  { terrain: T_FOREST, polygon: [
    [0.84, 0.54], [0.94, 0.54], [0.94, 0.66],
    [0.84, 0.66],
  ]},

  // New Zealand South Island — forest
  { terrain: T_FOREST, polygon: [
    [0.82, 0.64], [0.92, 0.64], [0.92, 0.78],
    [0.82, 0.78],
  ]},

  // New Zealand Southern Alps — mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.85, 0.67], [0.88, 0.66], [0.89, 0.72],
    [0.87, 0.75], [0.85, 0.73],
  ]},

  // Papua New Guinea — jungle
  { terrain: T_JUNGLE, polygon: [
    [0.46, 0.04], [0.74, 0.04], [0.74, 0.16],
    [0.46, 0.16],
  ]},

  // Papua New Guinea — central highlands mountains
  { terrain: T_MOUNTAINS, polygon: [
    [0.52, 0.07], [0.60, 0.06], [0.68, 0.08],
    [0.66, 0.12], [0.58, 0.12], [0.52, 0.10],
  ]},
];

// ── Rivers ──

const AU_RIVERS = [
  // Murray River — main channel, SW to SE
  [[0.64, 0.64], [0.60, 0.66], [0.56, 0.68], [0.52, 0.68], [0.48, 0.70], [0.44, 0.72]],
  // Darling River — NE to join Murray
  [[0.62, 0.48], [0.60, 0.52], [0.58, 0.56], [0.56, 0.60], [0.54, 0.64], [0.52, 0.68]],
  // Murrumbidgee — tributary
  [[0.64, 0.60], [0.62, 0.62], [0.58, 0.64], [0.56, 0.66]],
  // Fitzroy River (NW)
  [[0.30, 0.36], [0.34, 0.38], [0.36, 0.40]],
  // Cooper Creek (dry, through desert)
  [[0.56, 0.46], [0.52, 0.50], [0.48, 0.54], [0.44, 0.58]],
];

export function generateMapAustralia(settings = {}) {
  return generateFromPolygons(
    { width: settings.width || 80, height: settings.height || 120, ...settings },
    {
      defaultWidth: 80,
      defaultHeight: 120,
      mapShape: 1,
      polarBands: true,
      landPolygons: [AU_MAINLAND, AU_TASMANIA, NZ_NORTH_ISLAND, NZ_SOUTH_ISLAND, PAPUA_NEW_GUINEA],
      waterCutouts: [],
      terrainRegions: AU_TERRAIN_REGIONS,
      rivers: AU_RIVERS,
    }
  );
}


// ═══════════════════════════════════════════════════════════════
// ANTARCTICA
// ═══════════════════════════════════════════════════════════════

const ANTARCTICA_MAINLAND = [
  // Antarctic Peninsula — extending up toward South America (NW)
  [0.22, 0.30], [0.25, 0.34], [0.28, 0.38],
  // West coast — Bellingshausen Sea side
  [0.18, 0.42], [0.12, 0.48], [0.10, 0.55],
  // South (bottom of map) — Amundsen coast
  [0.12, 0.65], [0.15, 0.72], [0.20, 0.78],
  // Bottom edge — Ross Ice Shelf area
  [0.30, 0.82], [0.40, 0.85], [0.50, 0.84],
  // East Antarctica — bottom
  [0.60, 0.83], [0.70, 0.80],
  // East coast — heading north
  [0.78, 0.74], [0.84, 0.66], [0.88, 0.58],
  // NE coast — Enderby Land
  [0.90, 0.50], [0.88, 0.42],
  // North coast — Queen Maud Land
  [0.82, 0.36], [0.74, 0.32], [0.65, 0.30],
  // North coast — continuing west
  [0.55, 0.30], [0.45, 0.32], [0.38, 0.34],
  // Back to peninsula
  [0.32, 0.35], [0.28, 0.34],
];

// ── Terrain regions ──

const ANTARCTIC_TERRAIN_REGIONS = [
  // Massive glacier covering nearly all of the mainland interior
  { terrain: T_GLACIER, polygon: [
    [0.20, 0.28], [0.35, 0.28], [0.50, 0.28], [0.65, 0.28],
    [0.80, 0.30], [0.92, 0.38], [0.94, 0.50], [0.92, 0.62],
    [0.85, 0.72], [0.75, 0.82], [0.60, 0.86], [0.45, 0.88],
    [0.30, 0.86], [0.18, 0.78], [0.10, 0.68], [0.08, 0.55],
    [0.10, 0.42], [0.16, 0.34],
  ]},

  // Transantarctic Mountains — line roughly through the middle of the continent
  { terrain: T_MOUNTAINS, polygon: [
    [0.30, 0.50], [0.35, 0.48], [0.42, 0.52], [0.50, 0.56],
    [0.58, 0.58], [0.65, 0.56], [0.72, 0.52], [0.78, 0.50],
    [0.76, 0.54], [0.70, 0.56], [0.62, 0.60], [0.54, 0.62],
    [0.46, 0.60], [0.38, 0.56], [0.32, 0.54],
  ]},

  // Vinson Massif area — small mountain region in West Antarctica
  { terrain: T_MOUNTAINS, polygon: [
    [0.16, 0.54], [0.20, 0.52], [0.24, 0.56],
    [0.22, 0.60], [0.17, 0.58],
  ]},

  // Antarctic Peninsula — tundra on the edges
  { terrain: T_TUNDRA, polygon: [
    [0.20, 0.29], [0.26, 0.30], [0.30, 0.34],
    [0.28, 0.40], [0.24, 0.42], [0.19, 0.38],
    [0.18, 0.34],
  ]},

  // Antarctic Peninsula — mountains running through it
  { terrain: T_MOUNTAINS, polygon: [
    [0.22, 0.31], [0.26, 0.32], [0.28, 0.36],
    [0.26, 0.40], [0.23, 0.38], [0.21, 0.34],
  ]},

  // Coastal tundra fringe — north coast
  { terrain: T_TUNDRA, polygon: [
    [0.35, 0.30], [0.45, 0.30], [0.55, 0.28], [0.65, 0.28],
    [0.75, 0.30], [0.82, 0.34],
    [0.80, 0.36], [0.72, 0.34], [0.62, 0.32], [0.52, 0.32],
    [0.42, 0.33], [0.35, 0.34],
  ]},

  // Coastal tundra fringe — east coast
  { terrain: T_TUNDRA, polygon: [
    [0.84, 0.36], [0.88, 0.40], [0.90, 0.48],
    [0.90, 0.54], [0.88, 0.60], [0.84, 0.66],
    [0.80, 0.64], [0.84, 0.58], [0.86, 0.50],
    [0.86, 0.42], [0.84, 0.38],
  ]},

  // Coastal tundra fringe — west coast
  { terrain: T_TUNDRA, polygon: [
    [0.10, 0.46], [0.14, 0.44], [0.16, 0.48],
    [0.14, 0.56], [0.12, 0.62], [0.14, 0.68],
    [0.10, 0.66], [0.08, 0.58], [0.08, 0.50],
  ]},

  // Coastal tundra fringe — south/bottom coast
  { terrain: T_TUNDRA, polygon: [
    [0.18, 0.74], [0.28, 0.80], [0.38, 0.83],
    [0.50, 0.84], [0.62, 0.82], [0.72, 0.78],
    [0.70, 0.76], [0.60, 0.80], [0.48, 0.82],
    [0.36, 0.80], [0.26, 0.76], [0.20, 0.72],
  ]},
];

export function generateMapAntarctica(settings = {}) {
  return generateFromPolygons(
    { width: settings.width || 80, height: settings.height || 120, ...settings },
    {
      defaultWidth: 80,
      defaultHeight: 120,
      mapShape: 1,
      polarBands: true,
      landPolygons: [ANTARCTICA_MAINLAND],
      waterCutouts: [],
      terrainRegions: ANTARCTIC_TERRAIN_REGIONS,
      rivers: [],
    }
  );
}
