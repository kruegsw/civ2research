// ═══════════════════════════════════════════════════════════════════
// visibility.js — FOW & Line of Sight (shared: server + client)
//
// Server uses this to filter game state per civ before broadcast.
// Client uses this for FOW rendering and LOS dimming.
//
// Visibility radii from civ2mod.c addToVisibilityMap() (doubled-X offsets):
//   Units: radius 1 (9 tiles), Cities: radius 2 (21 tiles)
// ═══════════════════════════════════════════════════════════════════

const RADIUS_1 = [
  [0,0], [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0]
];
const RADIUS_2 = [
  ...RADIUS_1,
  [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
  [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3]
];

/**
 * Compute line-of-sight for a specific civ.
 * @param {object} mapData - parsed save with mw, mh, mapShape, cities, units
 * @param {number} civSlot - civ index (0-7)
 * @returns {Uint8Array} mw*mh array: 1 = in LOS, 0 = not
 */
export function computeLOS(mapData, civSlot) {
  const { mw, mh, cities, units } = mapData;
  const mw2 = mw * 2;
  const wraps = mapData.mapShape === 0;
  const los = new Uint8Array(mw * mh);

  function mark(dx, dy, offsets) {
    for (const [odx, ody] of offsets) {
      let ndx = dx + odx;
      const ndy = dy + ody;
      if (ndy < 0 || ndy >= mh) continue;
      if (wraps) {
        ndx = ((ndx % mw2) + mw2) % mw2;
      } else if (ndx < 0 || ndx >= mw2) {
        continue;
      }
      los[ndy * mw + (ndx >> 1)] = 1;
    }
  }

  for (const u of units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    mark(u.x, u.y, RADIUS_1);
  }
  for (const c of cities) {
    if (c.owner !== civSlot) continue;
    mark(c.cx, c.cy, RADIUS_2);
  }

  return los;
}

/**
 * Update persistent visibility (tile byte[4]) around a position.
 * Sets the exploration bit for the given civ on all tiles within the specified radius.
 *
 * @param {Array} tileData - mw*mh array of byte arrays
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {number} civSlot - civ index (0-7)
 * @param {number} gx - center tile gx (half-column)
 * @param {number} gy - center tile gy (row)
 * @param {boolean} wraps - whether map wraps horizontally
 * @param {number} [radius=1] - visibility radius: 1 for units, 2 for cities
 */
export function updateVisibility(tileData, mw, mh, civSlot, gx, gy, wraps, radius) {
  const bit = 1 << civSlot;
  const mw2 = mw * 2;
  const dx = gx * 2 + (gy % 2); // doubled-X coordinate
  const offsets = (radius === 2) ? RADIUS_2 : RADIUS_1;

  for (const [odx, ody] of offsets) {
    let ndx = dx + odx;
    const ndy = gy + ody;
    if (ndy < 0 || ndy >= mh) continue;
    if (wraps) {
      ndx = ((ndx % mw2) + mw2) % mw2;
    } else if (ndx < 0 || ndx >= mw2) {
      continue;
    }
    const idx = ndy * mw + (ndx >> 1);
    tileData[idx][4] |= bit;
  }
}

/**
 * Filter game state for a specific civ's visibility.
 * Returns a copy with only visible units/cities.
 *
 * @param {object} mapBase - accessor functions (mw, mh, tileData, etc.)
 * @param {object} gameState - full game state (units, cities, etc.)
 * @param {number} civSlot - civ index (0-7)
 * @returns {object} filtered state safe to send to this player
 */
export function filterStateForCiv(mapBase, gameState, civSlot) {
  const { mw, mh } = mapBase;
  const fowBit = 1 << civSlot;

  // Compute current LOS from this civ's units + cities
  const los = computeLOS({ mw, mh, mapShape: mapBase.mapShape, cities: gameState.cities, units: gameState.units }, civSlot);

  // Filter units: own units always visible, others only in LOS
  const units = gameState.units.filter(u => {
    if (u.owner === civSlot) return true;
    if (u.gx < 0) return false;
    const idx = u.gy * mw + ((u.gx % mw + mw) % mw);
    return los[idx] === 1;
  });

  // Filter cities: visible if tile has been explored
  const cities = [];
  for (const c of gameState.cities) {
    const gx = (c.gx != null) ? c.gx : c.cx; // parser uses gx; some might use cx
    const gy = (c.gy != null) ? c.gy : c.cy;
    const idx = gy * mw + ((gx % mw + mw) % mw);
    const vis = mapBase.tileData[idx][4];
    if (!(vis & fowBit)) continue; // unexplored, omit
    if (los[idx]) {
      cities.push(c); // in LOS: full info
    } else {
      // Explored but not in LOS: hide current details
      cities.push({ ...c, size: c.size }); // send as-is for now (future: last-known)
    }
  }

  // Clone state with filtered arrays, strip other civs' private data
  return {
    ...gameState,
    units,
    cities,
    // Don't send civData for other civs (strip treasury, rates, etc.)
    civData: gameState.civData ? gameState.civData.map((cd, i) => {
      if (i === civSlot || i === 0) return cd;
      return { government: cd.government, rulesCivNumber: cd.rulesCivNumber };
    }) : null,
  };
}
