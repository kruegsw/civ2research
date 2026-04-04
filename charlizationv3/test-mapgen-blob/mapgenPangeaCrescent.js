// ═══════════════════════════════════════════════════════════════════
// mapgenPangeaCrescent.js — Pangea variant of Crescent generator
//
// Wraps generateMapClaudeSpecial4 with forced Pangaea settings, then
// post-processes to merge secondary land bodies into the main
// continent via ocean-shortest-path land bridges. Small decorative
// islands (< threshold) are kept for flavor.
// ═══════════════════════════════════════════════════════════════════

import { generateMapClaudeSpecial4 } from './mapgenClaudeSpecial4.js';
import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// Doubled-X isometric 8-direction offsets
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];

const T_GRASSLAND = 2, T_OCEAN = 10;

/**
 * Uncapped flood-fill body assignment. Returns { bodyOf, bodySizes, bodyCount }.
 * bodyOf[flatIndex] = body id (0 = ocean, 1+ = land bodies), no cap.
 */
function floodFillBodies(tileData, mw, mh, wraps) {
  const bodyOf = new Int32Array(mw * mh);
  const bodySizes = {};
  let nextId = 1;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      if (bodyOf[i] || tileData[i].terrain === T_OCEAN) continue;

      const bid = nextId++;
      const queue = [i];
      bodyOf[i] = bid;
      let size = 0;

      while (queue.length > 0) {
        const ci = queue.shift();
        size++;
        const cy = (ci / mw) | 0;
        const cx = ci % mw;

        for (let d = 0; d < 8; d++) {
          let nx = cx + DIR8_DX[d];
          const ny = cy + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (bodyOf[ni] || tileData[ni].terrain === T_OCEAN) continue;
          bodyOf[ni] = bid;
          queue.push(ni);
        }
      }
      bodySizes[bid] = size;
    }
  }
  return { bodyOf, bodySizes };
}

/**
 * Generate a Pangea map using the Crescent algorithm + merge post-processing.
 *
 * @param {object} settings — same as generateMapClaudeSpecial4
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapPangeaCrescent(settings = {}) {
  // Force Pangaea mode: continents=3, bump landmass up by 1 (clamped to 2)
  const result = generateMapClaudeSpecial4({
    ...settings,
    continents: 3,
    landmass: Math.min(2, (settings.landmass ?? 1) + 1),
  });

  const { mw, mh, mapShape, tileData } = result;
  const wraps = mapShape === 0;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  // ── Uncapped flood-fill to find true bodies ──
  let { bodyOf, bodySizes } = floodFillBodies(tileData, mw, mh, wraps);

  if (Object.keys(bodySizes).length <= 1) {
    reassignBodyIds(tileData, mw, mh, wraps);
    return result;
  }

  // Find the largest body
  let mainId = 0, mainSize = 0;
  for (const [id, size] of Object.entries(bodySizes)) {
    if (size > mainSize) { mainSize = size; mainId = +id; }
  }

  // Merge threshold: bodies >= 1% of total land get bridged
  const totalLand = Object.values(bodySizes).reduce((a, b) => a + b, 0);
  const mergeThreshold = Math.max(5, Math.floor(totalLand * 0.01));

  // Collect bodies to merge, sorted largest first
  const bodiesToMerge = Object.entries(bodySizes)
    .filter(([id, size]) => +id !== mainId && size >= mergeThreshold)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => +id);

  // Track all body IDs that are now part of the main continent
  const mainBodyIds = new Set([mainId]);

  // ── BFS bridge builder ──
  for (const mergeId of bodiesToMerge) {
    // Collect ocean tiles adjacent to the merge body
    const startSet = new Set();
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        if (bodyOf[y * mw + x] !== mergeId) continue;
        for (let d = 0; d < 8; d++) {
          let nx = x + DIR8_DX[d];
          const ny = y + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (nx < 0 || nx >= mw) continue;
          if (tileData[ny * mw + nx].terrain === T_OCEAN) {
            startSet.add(ny * mw + nx);
          }
        }
      }
    }

    if (startSet.size === 0) { mainBodyIds.add(mergeId); continue; }

    // BFS from those ocean tiles toward any tile in the main continent group
    const prev = new Int32Array(mw * mh).fill(-1);
    const visited = new Uint8Array(mw * mh);
    const queue = [];

    for (const idx of startSet) {
      visited[idx] = 1;
      prev[idx] = idx;
      queue.push(idx);
    }

    let targetIdx = -1;
    let head = 0;
    while (head < queue.length) {
      const ci = queue[head++];
      const cy = (ci / mw) | 0;
      const cx = ci % mw;

      for (let d = 0; d < 8; d++) {
        let nx = cx + DIR8_DX[d];
        const ny = cy + DIR8_DY[d];
        if (ny < 0 || ny >= mh) continue;
        nx = wrapX(nx);
        if (nx < 0 || nx >= mw) continue;
        const ni = ny * mw + nx;
        if (mainBodyIds.has(bodyOf[ni]) && tileData[ni].terrain !== T_OCEAN) {
          targetIdx = ci;
          break;
        }
      }
      if (targetIdx >= 0) break;

      for (let d = 0; d < 8; d++) {
        let nx = cx + DIR8_DX[d];
        const ny = cy + DIR8_DY[d];
        if (ny < 0 || ny >= mh) continue;
        nx = wrapX(nx);
        if (nx < 0 || nx >= mw) continue;
        const ni = ny * mw + nx;
        if (visited[ni]) continue;
        if (tileData[ni].terrain !== T_OCEAN) continue;
        visited[ni] = 1;
        prev[ni] = ci;
        queue.push(ni);
      }
    }

    mainBodyIds.add(mergeId);
    if (targetIdx < 0) continue;

    // Trace back and convert ocean tiles to grassland
    let cur = targetIdx;
    while (cur >= 0 && prev[cur] !== cur) {
      const t = tileData[cur];
      if (t.terrain === T_OCEAN) {
        t.terrain = T_GRASSLAND;
        t.river = false;
        t.improvements = EMPTY_IMP;
      }
      cur = prev[cur];
    }
    if (cur >= 0 && tileData[cur].terrain === T_OCEAN) {
      tileData[cur].terrain = T_GRASSLAND;
      tileData[cur].river = false;
      tileData[cur].improvements = EMPTY_IMP;
    }
  }

  // ── Reassign body IDs (capped at 62 for game compatibility) + fertility ──
  reassignBodyIds(tileData, mw, mh, wraps);
  recalculateFertility(tileData, mw, mh, wraps);

  return result;
}

// ── Body ID assignment (flood fill, capped at 62 for game compat) ──
function reassignBodyIds(tileData, mw, mh, wraps) {
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === T_OCEAN) { visited[i] = 1; tileData[i].bodyId = 0; continue; }

      const bodyId = nextId < 63 ? nextId++ : 62;
      const queue = [{ x, y }];
      visited[y * mw + x] = 1;

      while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift();
        tileData[cy * mw + cx].bodyId = bodyId;

        for (let d = 0; d < 8; d++) {
          let nx = cx + DIR8_DX[d];
          const ny = cy + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (visited[ni] || tileData[ni].terrain === T_OCEAN) continue;
          visited[ni] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
}

// ── Fertility recalculation ──
function recalculateFertility(tileData, mw, mh, wraps) {
  const BASE_YIELD = [
    [0, 1], [1, 1], [2, 0], [1, 2], [1, 0],
    [0, 1], [1, 0], [0, 0], [1, 0], [1, 0], [1, 0],
  ];
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === T_OCEAN) { tileData[i].fertility = 0; continue; }

      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy;
        if (gy < 0 || gy >= mh) continue;
        const gx = wrapX(x + dx);
        if (gx < 0 || gx >= mw) continue;
        const tile = tileData[gy * mw + gx];
        const [food, shields] = BASE_YIELD[tile.terrain] || [0, 0];
        let ts = food * 4 + shields * 2;
        if (tile.river) ts += 2;
        if (r === 20) ts *= tileData[i].river ? 6 : 4;
        else if (r < 8) ts *= 2;
        score += ts;
      }
      tileData[i].fertility = Math.max(1, Math.min(15, Math.floor((score - 120) / 8)));
    }
  }
}
