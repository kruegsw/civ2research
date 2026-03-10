// ═══════════════════════════════════════════════════════════════════
// state.js — Game state schema + accessor factory (shared: server + client)
//
// Provides:
//   tileFromBytes() / tileToBytes() — tile serialization
//   createAccessors() — builds accessor closures from tile data
//   initialStateFromSav() — wraps parsed .sav into canonical game state
//   reconstructMapData() — client-side: rebuilds accessors from serialized state
// ═══════════════════════════════════════════════════════════════════

import { improvementFromByte, EMPTY_IMP } from './defs.js';

/**
 * Convert a 6-byte tile record to a named tile object.
 * Used by the parser (from .sav bytes) and client deserialization (from WebSocket).
 */
export function tileFromBytes(b0, b1, b2, b3, b4, b5) {
  const ter = b0 & 0x0F;
  return {
    terrain: ter > 10 ? 10 : ter,
    river: !!(b0 & 0x80),
    goodyHut: !!(b0 & 0x10),
    resourceSuppressed: !!(b0 & 0x40),
    improvements: improvementFromByte(b1),
    cityRadiusOwner: (b2 >> 5) & 7,
    bodyId: b3,
    visibility: b4,
    tileOwnership: (b5 >> 4) & 0x0F,
    fertility: b5 & 0x0F,
  };
}

/**
 * Convert a tile object back to a 6-byte array for network serialization.
 */
export function tileToBytes(t) {
  const imp = t.improvements;
  const b1 = (imp.city ? 0x02 : 0) | (imp.irrigation ? 0x04 : 0) | (imp.mining ? 0x08 : 0) |
             (imp.road ? 0x10 : 0) | (imp.railroad ? 0x20 : 0) | (imp.fortress ? 0x40 : 0) |
             (imp.pollution ? 0x80 : 0);
  return [
    (t.terrain & 0x0F) | (t.river ? 0x80 : 0) | (t.goodyHut ? 0x10 : 0) | (t.resourceSuppressed ? 0x40 : 0),
    b1,
    (t.cityRadiusOwner << 5),
    t.bodyId,
    t.visibility,
    (t.tileOwnership << 4) | (t.fertility & 0x0F),
  ];
}

/**
 * Create accessor functions (closures) over tile data.
 * Accepts tile objects (from parser/mapgen) or byte arrays (from WebSocket).
 * Byte arrays are auto-converted to tile objects.
 *
 * @param {number} mw  - map width (in half-columns)
 * @param {number} mh  - map height (rows)
 * @param {number} mapShape - 0=cylinder (wrapping), 1=flat
 * @param {number} mapSeed - resource seed
 * @param {Array} tileData - mw*mh array of tile objects or byte arrays
 * @param {Array} [knownImprovements] - per-civ known improvements (optional)
 * @returns {object} accessor functions
 */
export function createAccessors(mw, mh, mapShape, mapSeed, tileData, knownImprovements) {
  const mw2 = mw * 2;
  const wraps = mapShape === 0;

  // Auto-convert byte arrays to tile objects if needed
  if (tileData.length > 0 && Array.isArray(tileData[0])) {
    for (let i = 0; i < tileData.length; i++) {
      const a = tileData[i];
      tileData[i] = tileFromBytes(a[0], a[1], a[2], a[3], a[4], a[5]);
    }
  }

  function wrap(x) { return ((x % mw) + mw) % mw; }

  function getTerrain(gx, gy) {
    if (gy < 0 || gy >= mh) return 10;
    return tileData[gy * mw + wrap(gx)].terrain;
  }

  function isLand(gx, gy) { return getTerrain(gx, gy) !== 10; }

  function hasRiver(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    return tileData[gy * mw + wrap(gx)].river;
  }

  function getImprovements(gx, gy) {
    if (gy < 0 || gy >= mh) return EMPTY_IMP;
    return tileData[gy * mw + wrap(gx)].improvements;
  }

  function hasGoodyHut(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    return tileData[gy * mw + wrap(gx)].goodyHut;
  }

  function getVisibility(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)].visibility;
  }

  function setVisibility(gx, gy, val) {
    if (gy < 0 || gy >= mh) return;
    tileData[gy * mw + wrap(gx)].visibility = val;
  }

  function getCityRadiusOwner(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)].cityRadiusOwner;
  }

  function getBodyId(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)].bodyId;
  }

  function getTileOwnership(gx, gy) {
    if (gy < 0 || gy >= mh) return 0x0F;
    return tileData[gy * mw + wrap(gx)].tileOwnership;
  }

  function getTileFertility(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    return tileData[gy * mw + wrap(gx)].fertility;
  }

  function getKnownImprovements(gx, gy, civSlot) {
    if (!knownImprovements || civSlot < 1 || civSlot > 7 || gy < 0 || gy >= mh) return EMPTY_IMP;
    return improvementFromByte(knownImprovements[civSlot][gy * mw + wrap(gx)]);
  }

  function getResource(gx, gy) {
    if (gy < 0 || gy >= mh) return 0;
    if (tileData[gy * mw + wrap(gx)].resourceSuppressed) return 0;
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
  // Build civNames lookup from merged civs array
  const civNames = {};
  if (parsed.civs) {
    for (let i = 0; i < 8; i++) civNames[i] = parsed.civs[i]?.name || `Civ ${i}`;
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
