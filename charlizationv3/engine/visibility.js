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

// ─────────────────────────────────────────────────────────────────
// TODO: filterStateForCiv(fullState, civSlot)
// ─────────────────────────────────────────────────────────────────
// When the game becomes interactive over WebSocket, the server must
// send each player only what they can see.  This function will:
//
//   1. Compute LOS for civSlot (units + cities, radius 1/2)
//   2. Read the persistent exploration mask (tile byte[4] bitmask)
//   3. For each tile:
//      - Unexplored → omit terrain, units, cities entirely
//      - Explored but not in LOS → send terrain + last-known improvements,
//        but hide current units and city size changes
//      - In LOS → send full tile data (terrain, units, cities, improvements)
//   4. Strip other civs' private data (treasury, tech research, diplomacy)
//   5. Return the filtered state for transmission
//
// Pseudocode:
//   export function filterStateForCiv(state, civSlot) {
//     const los = computeLOS(state, civSlot);
//     const fowBit = 1 << civSlot;
//     const filtered = { ...state, tiles: [], units: [], cities: [] };
//     for (let gy = 0; gy < state.mh; gy++) {
//       for (let gx = 0; gx < state.mw; gx++) {
//         const vis = state.getVisibility(gx, gy);
//         if (!(vis & fowBit)) continue;           // unexplored: omit
//         const inLOS = los[gy * state.mw + gx];
//         filtered.tiles.push({
//           gx, gy,
//           terrain: state.getTerrain(gx, gy),
//           improvements: inLOS ? state.getImprovements(gx, gy)
//                                : state.getKnownImprovements(gx, gy, civSlot),
//         });
//       }
//     }
//     // Units: only those in LOS tiles
//     for (const u of state.units) {
//       if (u.owner === civSlot || los[u.gy * state.mw + u.gx]) {
//         filtered.units.push(u);
//       }
//     }
//     // Cities: explored cities visible, but size/production hidden if not in LOS
//     for (const c of state.cities) {
//       if (!(state.getVisibility(c.gx, c.gy) & fowBit)) continue;
//       if (los[c.gy * state.mw + c.gx]) {
//         filtered.cities.push(c);
//       } else {
//         filtered.cities.push({ ...c, size: c.believedSize[civSlot] });
//       }
//     }
//     return filtered;
//   }
