// ═══════════════════════════════════════════════════════════════════
// state.js — Game state schema + accessor factory (shared: server + client)
//
// Provides:
//   createAccessors() — builds accessor closures from raw map data
//   initialStateFromSav() — wraps parsed .sav into canonical game state
//   reconstructMapData() — client-side: rebuilds accessors from serialized state
// ═══════════════════════════════════════════════════════════════════

import { LEADERS_TXT_NAMES, improvementFromByte } from './defs.js';

/**
 * Create accessor functions (closures) over tile data arrays.
 * Used by both the parser and client-side deserialization.
 *
 * @param {number} mw  - map width (in half-columns)
 * @param {number} mh  - map height (rows)
 * @param {number} mapShape - 0=cylinder (wrapping), 1=flat
 * @param {number} mapSeed - resource seed
 * @param {Array} tileData - mw*mh array of byte arrays [b0,b1,b2,b3,b4,b5]
 * @param {Array} [knownImprovements] - per-civ known improvements (optional)
 * @returns {object} accessor functions
 */
export function createAccessors(mw, mh, mapShape, mapSeed, tileData, knownImprovements) {
  const mw2 = mw * 2;
  const wraps = mapShape === 0;

  function wrap(x) { return ((x % mw) + mw) % mw; }

  function getTerrain(gx, gy) {
    if (gy < 0 || gy >= mh) return 10;
    const ter = tileData[gy * mw + wrap(gx)][0] & 0x0F;
    return ter > 10 ? 10 : ter;
  }

  function isLand(gx, gy) { return getTerrain(gx, gy) !== 10; }

  function hasRiver(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    return !!(tileData[gy * mw + wrap(gx)][0] & 0x80);
  }

  function getImprovements(gx, gy) {
    if (gy < 0 || gy >= mh) return improvementFromByte(0);
    return improvementFromByte(tileData[gy * mw + wrap(gx)][1]);
  }

  function hasGoodyHut(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    return !!(tileData[gy * mw + wrap(gx)][0] & 0x10);
  }

  function getVisibility(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)][4];
  }

  function setVisibility(gx, gy, val) {
    if (gy < 0 || gy >= mh) return;
    tileData[gy * mw + wrap(gx)][4] = val;
  }

  function getCityRadiusOwner(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return (tileData[gy * mw + wrap(gx)][2] >> 5) & 7;
  }

  function getBodyId(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)][3];
  }

  function getTileOwnership(gx, gy) {
    if (gy < 0 || gy >= mh) return 0x0F;
    return (tileData[gy * mw + wrap(gx)][5] >> 4) & 0x0F;
  }

  function getTileFertility(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)][5] & 0x0F;
  }

  function getKnownImprovements(gx, gy, civSlot) {
    if (!knownImprovements || civSlot < 1 || civSlot > 7 || gy < 0 || gy >= mh) return improvementFromByte(0);
    return improvementFromByte(knownImprovements[civSlot][gy * mw + wrap(gx)]);
  }

  function getResource(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    if (tileData[gy * mw + wrap(gx)][0] & 0x40) return 0;
    const X = 2 * wrap(gx) + (gy % 2);
    const Y = gy;
    const a = (X + Y) >> 1;
    const b = X - a;
    const c = 13 * (b >> 2) + 11 * ((X + Y) >> 3) + mapSeed;
    if ((a & 3) + 4 * (b & 3) !== (c & 15)) return 0;
    const d = 1 << ((mapSeed >> 4) & 3);
    return (d & a) === (d & b) ? 2 : 1;
  }

  function hasShield(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    const X = 2 * wrap(gx) + (gy % 2);
    const Y = gy;
    const rez4 = (Math.floor(Y / 2) + 2 * (Y % 2)) % 4;
    const rez3 = 8 - 2 * (rez4 % 4);
    const rez = (X - (Y % 2) + rez3) % 8;
    return rez < 4;
  }

  function getNeighbors(gx, gy) {
    if (gy % 2 === 0) {
      return {
        N:[gx,gy-2], NE:[wrap(gx),gy-1], E:[wrap(gx+1),gy], SE:[wrap(gx),gy+1],
        S:[gx,gy+2], SW:[wrap(gx-1),gy+1], W:[wrap(gx-1),gy], NW:[wrap(gx-1),gy-1]
      };
    } else {
      return {
        N:[gx,gy-2], NE:[wrap(gx+1),gy-1], E:[wrap(gx+1),gy], SE:[wrap(gx+1),gy+1],
        S:[gx,gy+2], SW:[wrap(gx),gy+1], W:[wrap(gx-1),gy], NW:[wrap(gx),gy-1]
      };
    }
  }

  return {
    mw, mh, mw2, mapShape, mapSeed, tileData,
    wraps,
    wrap, getTerrain, isLand, hasRiver, getImprovements, getVisibility,
    setVisibility, getResource, getNeighbors, hasGoodyHut, hasShield,
    getCityRadiusOwner, getBodyId, getTileOwnership, getTileFertility,
    getKnownImprovements, knownImprovements,
  };
}

/**
 * Build the initial game state from a parsed .sav file.
 *
 * @param {object} parsed - output of Civ2Parser.parse()
 * @returns {object} canonical game state
 */
export function initialStateFromSav(parsed) {
  const civNames = {};
  for (let i = 0; i < 8; i++) {
    const nb = parsed.civNameBlocks && parsed.civNameBlocks[i];
    const cd = parsed.civData && parsed.civData[i];
    const tribeName = nb && nb.tribeName;
    const rulesName = cd && cd.rulesCivNumber != null && LEADERS_TXT_NAMES[cd.rulesCivNumber];
    civNames[i] = i === 0 ? 'Barbarians' : (tribeName || rulesName || `Civ ${i}`);
  }

  return {
    ...parsed,
    civNames,
  };
}

/**
 * Reconstruct map accessors on the client from serialized state.
 * The server sends tileData, mw, mh, etc. but not closure functions.
 * This rebuilds the accessor functions so the renderer can work.
 *
 * @param {object} state - deserialized state from server
 * @returns {object} state augmented with accessor functions
 */
export function reconstructMapData(state) {
  const acc = createAccessors(
    state.mw, state.mh, state.mapShape, state.mapSeed,
    state.tileData, state.knownImprovements,
  );
  return { ...state, ...acc };
}
