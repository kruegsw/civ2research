// ═══════════════════════════════════════════════════════════════════
// mapgen-dispatch.js — algorithm selection + output normalization
//
// Provides a single entry point that dispatches to one of several
// mapgen algorithms (binary-faithful or experimental) and normalizes
// the result so the rest of the engine doesn't need to know which
// algorithm was used.
//
// All algorithms must produce { mw, mh, mapShape, mapSeed, tileData }
// where:
//   mw = number of tile columns (compact, NOT doubled-X)
//   mh = number of rows
//   tileData = mw * mh array of tile objects with .terrain, .river, etc.
//
// The binary-faithful generateMap() already returns compact mw.
// The experimental mapgens return doubled-X mw, so we compress them.
// ═══════════════════════════════════════════════════════════════════

import { generateMap } from './mapgen.js';
import { EMPTY_IMP } from './defs.js';
import { generateMapBlob } from '../test-mapgen-blob/mapgenBlob.js';
import { generateMapNoise } from '../test-mapgen-blob/mapgenNoise.js';
import { generateMapPlates } from '../test-mapgen-blob/mapgenPlates.js';
import { generateMapCA } from '../test-mapgen-blob/mapgenCA.js';
import { generateMapDiamondSquare } from '../test-mapgen-blob/mapgenDiamondSquare.js';
import { generateMapVoronoi } from '../test-mapgen-blob/mapgenVoronoi.js';
import { generateMapCiv2Tec } from '../test-mapgen-blob/mapgenCiv2Tec.js';
import { generateMapCiv2TecRegions } from '../test-mapgen-blob/mapgenCiv2TecRegions.js';
import { generateMapClaudeSpecial } from '../test-mapgen-blob/mapgenClaudeSpecial.js';
import { generateMapClaudeSpecial2 } from '../test-mapgen-blob/mapgenClaudeSpecial2.js';
import { generateMapClaudeSpecial3 } from '../test-mapgen-blob/mapgenClaudeSpecial3.js';
import { generateMapClaudeSpecial4 } from '../test-mapgen-blob/mapgenClaudeSpecial4.js';
import { generateMapPangeaCrescent } from '../test-mapgen-blob/mapgenPangeaCrescent.js';

/**
 * Test generator: every tile is grassland (compact output, no compression needed).
 * @param {object} settings - { width, height, mapShape, mapSeed }
 * @param {boolean} closeSpawns - if true, sets a flag for init.js to cluster civs
 */
function generateMapAllGrass(settings = {}, closeSpawns = false) {
  // Inputs use the doubled-X convention (width=100 = 50 visible columns).
  // We compress immediately by returning compact mw = width / 2.
  const widthIn = settings.width || 100;
  const mwCompact = widthIn >> 1;
  const mh = settings.height || 80;
  const mapShape = settings.mapShape ?? 0;
  const mapSeed = settings.mapSeed ?? 0;

  const tileData = new Array(mwCompact * mh);
  for (let i = 0; i < mwCompact * mh; i++) {
    tileData[i] = {
      terrain: 2, // grassland
      river: false,
      goodyHut: false,
      hasResource: false,
      resourceSuppressed: false,
      visibility: 0,
      tileOwnership: 0,
      cityRadiusOwner: 0,
      bodyId: 1, // single body covering the whole map
      fertility: 8,
      improvements: { ...EMPTY_IMP },
    };
  }

  const result = { mw: mwCompact, mh, mapShape, mapSeed, tileData };
  if (closeSpawns) result.closeSpawns = true;
  return result;
}

// Algorithm registry: id → { label, fn, alreadyCompact }
//   alreadyCompact: true if the algorithm already returns mw in compact form
//                   (the binary-faithful generateMap does compression internally).
//                   false if the algorithm returns doubled-X mw and we must
//                   compress its output.
export const MAPGEN_ALGORITHMS = {
  civ2:           { label: 'Civ2 Binary (Faithful)',     fn: generateMap,                alreadyCompact: true  },
  pangeaCrescent: { label: 'Pangea Crescent',            fn: generateMapPangeaCrescent,  alreadyCompact: false },
  claudeSpecial4: { label: 'Realistic Satellite v4',     fn: generateMapClaudeSpecial4,  alreadyCompact: false },
  claudeSpecial3: { label: 'Realistic Satellite v3',     fn: generateMapClaudeSpecial3,  alreadyCompact: false },
  claudeSpecial2: { label: 'Realistic Satellite v2',     fn: generateMapClaudeSpecial2,  alreadyCompact: false },
  claudeSpecial:  { label: 'Realistic Satellite v1',     fn: generateMapClaudeSpecial,   alreadyCompact: false },
  civ2tec:        { label: 'Civ2 + Tectonics',           fn: generateMapCiv2Tec,         alreadyCompact: false },
  civ2tecRegions: { label: 'Civ2 + Tectonic Regions',    fn: generateMapCiv2TecRegions,  alreadyCompact: false },
  blob:           { label: 'Blob',                       fn: generateMapBlob,            alreadyCompact: false },
  plates:         { label: 'Plate Tectonics',            fn: generateMapPlates,          alreadyCompact: false },
  voronoi:        { label: 'Voronoi',                    fn: generateMapVoronoi,         alreadyCompact: false },
  noise:          { label: 'Perlin Noise',               fn: generateMapNoise,           alreadyCompact: false },
  diamond:        { label: 'Diamond-Square',             fn: generateMapDiamondSquare,   alreadyCompact: false },
  ca:             { label: 'Cellular Automata',          fn: generateMapCA,              alreadyCompact: false },
  flatGrass:      { label: 'Test: All Grasslands',        fn: (s) => generateMapAllGrass(s, false), alreadyCompact: true },
  flatGrassClose: { label: 'Test: All Grass + Close Spawns', fn: (s) => generateMapAllGrass(s, true), alreadyCompact: true },
};

export const DEFAULT_ALGORITHM = 'civ2';

/**
 * Compress a doubled-X tileData array to compact coordinates.
 * Doubled-X: mw=100 means 50 actual tiles per row, with valid tiles at
 * even x on even rows and odd x on odd rows.
 * Compact: mw=50 means 50 actual tiles per row, all positions valid.
 *
 * @param {object[]} tileData - source array of length mwDoubled * mh
 * @param {number} mwDoubled - doubled-X width
 * @param {number} mh - height
 * @returns {{ mwCompact: number, tileData: object[] }}
 */
function compressToCompact(tileData, mwDoubled, mh) {
  const mwCompact = mwDoubled >> 1;
  const compact = new Array(mwCompact * mh);
  for (let y = 0; y < mh; y++) {
    for (let cx = 0; cx < mwCompact; cx++) {
      const oldX = cx * 2 + (y & 1);  // valid parity x in doubled-X
      compact[y * mwCompact + cx] = tileData[y * mwDoubled + oldX];
    }
  }
  return { mwCompact, tileData: compact };
}

/**
 * Normalize an experimental mapgen result so it has the standard shape
 * that initNewGame expects:
 *   - mw = compact tile column count
 *   - mh = row count
 *   - tileData = mw * mh array
 *   - bodyId, fertility, etc. on each tile
 * Adds any missing tile fields with sensible defaults.
 */
function normalizeResult(result) {
  const { mw, mh, mapShape, mapSeed, tileData, closeSpawns } = result;
  const out = { mw, mh, mapShape: mapShape ?? 0, mapSeed: mapSeed ?? 0, tileData };
  if (closeSpawns) out.closeSpawns = true;
  return out;
}

/**
 * Generate a map with the specified algorithm and settings.
 * Always returns compact-coordinate result compatible with initNewGame.
 *
 * @param {string} algorithm - key from MAPGEN_ALGORITHMS
 * @param {object} settings - { width, height, ... }
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapWithAlgorithm(algorithm, settings = {}) {
  const entry = MAPGEN_ALGORITHMS[algorithm] || MAPGEN_ALGORITHMS[DEFAULT_ALGORITHM];
  const result = entry.fn(settings);

  if (entry.alreadyCompact) {
    // Binary-faithful generateMap already compresses internally
    return normalizeResult(result);
  }

  // Experimental algorithms return doubled-X — compress to compact
  const { mw, mh } = result;
  const { mwCompact, tileData } = compressToCompact(result.tileData, mw, mh);

  // Ensure required fields exist on every tile (experimental mapgens may
  // omit some fields that the engine expects)
  for (const t of tileData) {
    if (t.bodyId == null) t.bodyId = 0;
    if (t.fertility == null) t.fertility = 0;
    if (t.visibility == null) t.visibility = 0;
    if (t.tileOwnership == null) t.tileOwnership = 0;
    if (t.cityRadiusOwner == null) t.cityRadiusOwner = 0;
    if (t.river == null) t.river = false;
    if (t.goodyHut == null) t.goodyHut = false;
    if (t.resourceSuppressed == null) t.resourceSuppressed = false;
    if (t.hasResource == null) t.hasResource = false;
    if (!t.improvements) {
      t.improvements = {
        city: false, irrigation: false, mining: false,
        road: false, railroad: false, fortress: false,
        pollution: false, farmland: false, airbase: false,
      };
    }
  }

  return {
    mw: mwCompact,
    mh,
    mapShape: result.mapShape ?? 0,
    mapSeed: result.mapSeed ?? 0,
    tileData,
  };
}
