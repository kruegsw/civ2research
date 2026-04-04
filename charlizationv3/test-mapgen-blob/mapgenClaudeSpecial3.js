// ═══════════════════════════════════════════════════════════════════
// mapgenClaudeSpecial3.js — Realistic satellite-view map generation (v3)
//
// v3 fixes: wavy biome boundaries via latitude-offset noise, mountain
// clusters, horizontal de-banding pass, enhanced N8 smoothing.
// Eliminates the straight horizontal lines from v1/v2.
//
//   1.  Multi-octave value noise heightmap + continent mask
//   1b. Latitude-offset noise field (wavy biome boundaries)
//   2.  Land/ocean threshold (landmass setting)
//   3.  Coastline fractal perturbation + island arcs
//   3c. Peninsulas (land fingers) + bays/gulfs (ocean gouges)
//   3d. Internal seas (Mediterranean/Caspian style) + strait connections
//   3e. Volcanic islands (mid-ocean hotspot peaks)
//   3f. Continental shelf islands (near-coast archipelagos)
//   3g. Fjords (high-latitude narrow ocean inlets)
//   4.  Distance-from-coast computation (BFS)
//   5.  Mountain chains + clusters with flanking hills
//   6.  Terrain assignment:
//       a. Latitude bands with noise-offset boundaries
//       b. Primary wind-direction moisture sweep (rain shadows)
//       c. Counter-sweep from opposite direction (both coasts green)
//       d. Continental interior drying (deep inland = dry)
//       e. Steppe transition bands (buffers between incompatible biomes)
//   6f. Horizontal de-banding pass
//   7.  Neighbor smoothing (N8)
//   8.  Rivers with tributaries + delta swamps + inland lakes
//   8b. River floodplain wetlands
//   8c. Desert oases
//   9.  Polar caps (Civ2-style)
//  10.  Build tileData + body IDs + fertility + goody huts
//
// All 7 settings affect generation:
//   landmass     → land/ocean ratio, river count
//   continents   → continent mask (islands vs Pangaea), island arc count,
//                   internal sea count, shelf island count
//   temperature  → latitude band positions, glacier/tundra extent
//   climate      → moisture accumulation, interior drying, lake count,
//                   jungle/swamp extent, river count, wetland/oasis density
//   age          → mountain count/length, coastline roughness, smoothing
//                   intensity, hill density, peninsula/bay count, volcanic
//                   island count, fjord count
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// ── MSVC-compatible LCG PRNG ──
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    return (this.state >>> 16) & 0x7FFF;
  }
  nextInt(n) { return n <= 1 ? 0 : this.next() % n; }
  random() { return this.next() / 32768; }
}

// ── Terrain constants ──
const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

// 8-direction offsets in doubled-X isometric coords (for body ID / fertility)
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];

// Display-space neighbor offsets
const N4 = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const N8 = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

/**
 * Generate a realistic satellite-view map.
 *
 * @param {object} settings
 * @param {number} settings.width      - map width (gx columns), default 160
 * @param {number} settings.height     - map height (rows), default 80
 * @param {number} [settings.seed]     - PRNG seed (0-65535)
 * @param {number} [settings.mapShape] - 0=cylinder (wrapping), 1=flat
 * @param {number} [settings.landmass] - 0=small, 1=normal, 2=large
 * @param {number} [settings.continents] - <=0=islands, 1=normal, >=2=Pangaea
 * @param {number} [settings.temperature] - -1=cool, 0=temperate, 1=warm
 * @param {number} [settings.climate]  - -1=arid, 0=normal, 1=wet
 * @param {number} [settings.age]      - 0=young(3B), 1=normal(4B), 2=old(5B)
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapClaudeSpecial3(settings = {}) {
  const mw = settings.width || 160;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;       // 0=small, 1=normal, 2=large
  const continents = settings.continents ?? 1;    // <=0=islands, 1=normal, >=2=Pangaea
  const temperature = settings.temperature ?? 0;  // -1=cool, 0=temperate, 1=warm
  const climate = settings.climate ?? 0;           // -1=arid, 0=normal, 1=wet
  const age = settings.age ?? 1;                   // 0=young, 1=normal, 2=old

  const dw = Math.floor(mw / 2); // display width (half of tile width)
  const halfH = Math.floor(mh / 2);

  // Display-space helpers
  function wX(x) { return wraps ? ((x % dw) + dw) % dw : x; }
  function oob(x, y) { return y < 0 || y >= mh || (!wraps && (x < 0 || x >= dw)); }

  // Smoothstep-interpolated noise sample
  function sampleGrid(g, gw, f, dx, dy) {
    const nx = (dx / dw) * f, ny = (dy / mh) * f;
    const x0 = Math.floor(nx), y0 = Math.floor(ny);
    const x1 = Math.min(x0 + 1, f), y1 = Math.min(y0 + 1, f);
    const fx = nx - x0, fy = ny - y0;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return (g[y0 * gw + x0] * (1 - sx) + g[y0 * gw + x1] * sx) * (1 - sy) +
           (g[y1 * gw + x0] * (1 - sx) + g[y1 * gw + x1] * sx) * sy;
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 1: Multi-octave value noise heightmap + continent mask
  // ══════════════════════════════════════════════════════════════
  const hmap = new Float32Array(dw * mh);
  {
    let amp = 1.0, totA = 0;
    for (let oct = 0; oct < 6; oct++) {
      const f = 1 << (oct + 2); // frequencies: 4, 8, 16, 32, 64, 128
      const gw = f + 1, gh = f + 1;
      const g = new Float32Array(gw * gh);
      for (let i = 0; i < gw * gh; i++) g[i] = rng.random();
      if (wraps) for (let gy = 0; gy < gh; gy++) g[gy * gw + f] = g[gy * gw];

      for (let dy = 0; dy < mh; dy++) {
        for (let dx = 0; dx < dw; dx++) {
          hmap[dy * dw + dx] += sampleGrid(g, gw, f, dx, dy) * amp;
        }
      }
      totA += amp;
      amp *= 0.5;
    }
    for (let i = 0; i < hmap.length; i++) hmap[i] /= totA;

    // Continent mask: low-frequency noise modulates where continents form.
    // continents setting controls mask frequency + blend weight:
    //   islands (<=0): many cells (4-5), weak influence → scattered landmasses
    //   normal (1):    2-3 cells, moderate influence
    //   Pangaea (>=2): 1-2 cells, strong influence → one mega-continent
    const mf = continents <= 0 ? 4 + rng.nextInt(2)
             : continents >= 2 ? 1 + rng.nextInt(2)
             : 2 + rng.nextInt(2);
    const maskWeight = continents <= 0 ? 0.20
                     : continents >= 2 ? 0.50
                     : 0.35;
    const mgw = mf + 1, mgh = mf + 1;
    const mg = new Float32Array(mgw * mgh);
    for (let i = 0; i < mgw * mgh; i++) mg[i] = rng.random();
    if (wraps) for (let gy = 0; gy < mgh; gy++) mg[gy * mgw + mf] = mg[gy * mgw];

    for (let dy = 0; dy < mh; dy++) {
      for (let dx = 0; dx < dw; dx++) {
        const mv = sampleGrid(mg, mgw, mf, dx, dy);
        const i = dy * dw + dx;
        hmap[i] = hmap[i] * (1 - maskWeight) + mv * maskWeight;
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 1b: Latitude-offset noise field
  // ══════════════════════════════════════════════════════════════
  // Smooth noise that modulates effective latitude per tile, making
  // biome boundaries (desert/forest/tundra bands) wavy instead of
  // straight horizontal lines. Two octaves for multi-scale waviness.
  const latOffset = new Float32Array(dw * mh);
  {
    for (const freq of [6, 16]) {
      const gw = freq + 1, gh = freq + 1;
      const g = new Float32Array(gw * gh);
      for (let i = 0; i < gw * gh; i++) g[i] = rng.random();
      if (wraps) for (let gy = 0; gy < gh; gy++) g[gy * gw + freq] = g[gy * gw];
      const amp = freq === 6 ? 0.22 : 0.10; // broad waves + fine detail
      for (let dy = 0; dy < mh; dy++) {
        for (let dx = 0; dx < dw; dx++) {
          latOffset[dy * dw + dx] += (sampleGrid(g, gw, freq, dx, dy) - 0.5) * amp;
        }
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 2: Land/ocean threshold
  // ══════════════════════════════════════════════════════════════
  const targetPct = [0.22, 0.30, 0.40][landmass] || 0.30;
  const sorted = Float32Array.from(hmap).sort();
  const thresh = sorted[Math.floor(sorted.length * (1 - targetPct))];

  const land = new Uint8Array(dw * mh);
  for (let i = 0; i < hmap.length; i++) land[i] = hmap[i] >= thresh ? 1 : 0;

  // ══════════════════════════════════════════════════════════════
  // Phase 3: Coastline fractal perturbation
  // age: young (0) → rough/jagged coastlines (more passes, higher chance)
  //      old (2)   → smooth/eroded coastlines (fewer passes, lower chance)
  // ══════════════════════════════════════════════════════════════
  const coastPasses = [5, 3, 2][age] || 3;
  const coastChance = [0.20, 0.15, 0.10][age] || 0.15;

  for (let pass = 0; pass < coastPasses; pass++) {
    const changes = [];
    for (let dy = 1; dy < mh - 1; dy++) {
      for (let dx = 0; dx < dw; dx++) {
        const i = dy * dw + dx;
        let landN = 0, total = 0;
        for (const [ndx, ndy] of N4) {
          const nx = wX(dx + ndx), ny = dy + ndy;
          if (oob(nx, ny)) continue;
          total++;
          if (land[ny * dw + nx]) landN++;
        }
        if (landN > 0 && landN < total && rng.random() < coastChance) {
          changes.push([i, land[i] ? 0 : 1]);
        }
      }
    }
    for (const [i, v] of changes) land[i] = v;
  }

  // ── Phase 3b: Island arcs near continent margins ──
  // continents <=0 (islands mode) spawns more arcs
  const numArcs = continents <= 0 ? 3 + rng.nextInt(4) : 1 + rng.nextInt(3);
  for (let a = 0; a < numArcs; a++) {
    let startDx = -1, startDy = -1;
    for (let attempt = 0; attempt < 60; attempt++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      if (land[dy * dw + dx]) continue;
      let nearLand = false;
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && land[ny * dw + nx]) { nearLand = true; break; }
      }
      if (nearLand) { startDx = dx; startDy = dy; break; }
    }
    if (startDx < 0) continue;

    let cx = startDx, cy = startDy;
    let dir = rng.random() * Math.PI * 2;
    const arcLen = 4 + rng.nextInt(8);

    for (let step = 0; step < arcLen; step++) {
      const wx = wX(cx);
      if (wx >= 0 && wx < dw && cy >= 2 && cy < mh - 2) {
        land[cy * dw + wx] = 1;
        if (rng.random() < 0.4) {
          const d = N4[rng.nextInt(4)];
          const nx = wX(wx + d[0]), ny = cy + d[1];
          if (!oob(nx, ny)) land[ny * dw + nx] = 1;
        }
      }
      const gap = 2 + rng.nextInt(2);
      cx += Math.round(Math.cos(dir) * gap);
      cy += Math.round(Math.sin(dir) * gap);
      dir += (rng.random() - 0.5) * 0.6;
    }
  }

  // ── Phase 3c: Peninsulas and large bays/gulfs ──
  // Peninsulas: land "fingers" extending into ocean (Italy, Florida, India)
  // Bays: ocean "gouges" cutting into land (Gulf of Mexico, Hudson Bay)
  // age: young → more active coastlines → more peninsulas/bays
  const numPeninsulas = [4, 3, 2][age] + rng.nextInt(3);
  const numBays = [3, 2, 1][age] + rng.nextInt(3);

  for (let p = 0; p < numPeninsulas; p++) {
    let sx = -1, sy = -1, sd = 0;
    for (let attempt = 0; attempt < 80; attempt++) {
      const dx = rng.nextInt(dw), dy = 6 + rng.nextInt(Math.max(1, mh - 12));
      if (!land[dy * dw + dx]) continue;
      // Find direction toward ocean
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && !land[ny * dw + nx]) {
          sx = dx; sy = dy; sd = Math.atan2(ndy, ndx);
          break;
        }
      }
      if (sx >= 0) break;
    }
    if (sx < 0) continue;

    let cx = sx, cy = sy, dir = sd;
    const penLen = 5 + rng.nextInt(11);
    for (let step = 0; step < penLen; step++) {
      cx += Math.round(Math.cos(dir));
      cy += Math.round(Math.sin(dir));
      const wx = wX(cx);
      if (oob(wx, cy) || cy < 2 || cy >= mh - 2) break;
      land[cy * dw + wx] = 1;
      // Widen to 2-3 tiles perpendicular
      if (rng.random() < 0.6) {
        const px = Math.round(Math.cos(dir + Math.PI / 2));
        const py = Math.round(Math.sin(dir + Math.PI / 2));
        const side = rng.random() < 0.5 ? 1 : -1;
        const nx = wX(wx + side * px), ny = cy + side * py;
        if (!oob(nx, ny) && ny >= 2 && ny < mh - 2) land[ny * dw + nx] = 1;
      }
      dir += (rng.random() - 0.5) * 0.4;
    }
  }

  for (let b = 0; b < numBays; b++) {
    let sx = -1, sy = -1, sd = 0;
    for (let attempt = 0; attempt < 80; attempt++) {
      const dx = rng.nextInt(dw), dy = 6 + rng.nextInt(Math.max(1, mh - 12));
      if (land[dy * dw + dx]) continue;
      // Find direction toward land
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && land[ny * dw + nx]) {
          sx = dx; sy = dy; sd = Math.atan2(ndy, ndx);
          break;
        }
      }
      if (sx >= 0) break;
    }
    if (sx < 0) continue;

    let cx = sx, cy = sy, dir = sd;
    const bayLen = 5 + rng.nextInt(11);
    for (let step = 0; step < bayLen; step++) {
      cx += Math.round(Math.cos(dir));
      cy += Math.round(Math.sin(dir));
      const wx = wX(cx);
      if (oob(wx, cy) || cy < 2 || cy >= mh - 2) break;
      land[cy * dw + wx] = 0;
      if (rng.random() < 0.5) {
        const px = Math.round(Math.cos(dir + Math.PI / 2));
        const py = Math.round(Math.sin(dir + Math.PI / 2));
        const side = rng.random() < 0.5 ? 1 : -1;
        const nx = wX(wx + side * px), ny = cy + side * py;
        if (!oob(nx, ny) && ny >= 2 && ny < mh - 2) land[ny * dw + nx] = 0;
      }
      dir += (rng.random() - 0.5) * 0.4;
    }
  }

  // ── Phase 3d: Internal seas (Mediterranean/Caspian style) ──
  // Large partially-enclosed water bodies deep inside continents,
  // connected to the exterior ocean via a narrow strait.
  // Pangaea → more internal seas; islands → rarely any
  const numInternalSeas = continents >= 2 ? 1 + rng.nextInt(2)
                        : continents >= 1 ? rng.nextInt(2)
                        : 0;

  for (let s = 0; s < numInternalSeas; s++) {
    // Quick BFS to find land distance from ocean (temporary, for placement)
    const tmpDist = new Uint16Array(dw * mh);
    {
      const q = [], vis = new Uint8Array(dw * mh);
      for (let dy = 0; dy < mh; dy++) {
        for (let dx = 0; dx < dw; dx++) {
          const i = dy * dw + dx;
          if (!land[i]) { vis[i] = 1; continue; }
          let coastal = false;
          for (const [ndx, ndy] of N4) {
            const nx = wX(dx + ndx), ny = dy + ndy;
            if (!oob(nx, ny) && !land[ny * dw + nx]) { coastal = true; break; }
          }
          if (coastal) { vis[i] = 1; tmpDist[i] = 1; q.push(i); }
        }
      }
      let h = 0;
      while (h < q.length) {
        const ci = q[h++], cx2 = ci % dw, cy2 = (ci / dw) | 0;
        for (const [ndx, ndy] of N4) {
          const nx = wX(cx2 + ndx), ny = cy2 + ndy;
          if (oob(nx, ny)) continue;
          const ni = ny * dw + nx;
          if (vis[ni] || !land[ni]) continue;
          vis[ni] = 1;
          tmpDist[ni] = tmpDist[ci] + 1;
          q.push(ni);
        }
      }
    }

    // Find deep interior point
    let bestI = -1, bestD = 0;
    for (let a = 0; a < 60; a++) {
      const dx = rng.nextInt(dw), dy = 8 + rng.nextInt(Math.max(1, mh - 16));
      const i = dy * dw + dx;
      if (!land[i]) continue;
      const score = tmpDist[i] + rng.random() * 3;
      if (score > bestD) { bestD = score; bestI = i; }
    }
    if (bestI < 0 || bestD < 6) continue;

    // Carve irregular water body (10-30 tiles)
    const seaSize = 10 + rng.nextInt(21);
    const seaTiles = [bestI];
    const seaSet = new Set([bestI]);
    land[bestI] = 0;

    for (let added = 1; added < seaSize; added++) {
      let placed = false;
      for (let retry = 0; retry < 8 && !placed; retry++) {
        const src = seaTiles[rng.nextInt(seaTiles.length)];
        const srcX = src % dw, srcY = (src / dw) | 0;
        const d = N4[rng.nextInt(4)];
        const nx = wX(srcX + d[0]), ny = srcY + d[1];
        if (oob(nx, ny) || ny < 4 || ny >= mh - 4) continue;
        const ni = ny * dw + nx;
        if (seaSet.has(ni) || !land[ni]) continue;
        // Don't connect to exterior ocean — keep it internal
        let touchesOcean = false;
        for (const [ndx2, ndy2] of N4) {
          const nx2 = wX(nx + ndx2), ny2 = ny + ndy2;
          if (!oob(nx2, ny2) && !land[ny2 * dw + nx2] && !seaSet.has(ny2 * dw + nx2)) {
            touchesOcean = true; break;
          }
        }
        if (touchesOcean) continue;
        land[ni] = 0;
        seaTiles.push(ni);
        seaSet.add(ni);
        placed = true;
      }
    }

    if (seaTiles.length < 5) continue;

    // Carve narrow strait to nearest coast via BFS through land
    const straitFrom = new Int32Array(dw * mh).fill(-1);
    const straitVis = new Uint8Array(dw * mh);
    const sq = [];

    for (const si of seaTiles) {
      straitVis[si] = 1;
      const sx2 = si % dw, sy2 = (si / dw) | 0;
      for (const [ndx, ndy] of N4) {
        const nx = wX(sx2 + ndx), ny = sy2 + ndy;
        if (oob(nx, ny)) continue;
        const ni = ny * dw + nx;
        if (land[ni] && !straitVis[ni]) {
          straitVis[ni] = 1;
          straitFrom[ni] = si;
          sq.push(ni);
        }
      }
    }

    let straitEnd = -1, sh = 0;
    while (sh < sq.length && straitEnd < 0) {
      const ci = sq[sh++], cx2 = ci % dw, cy2 = (ci / dw) | 0;
      for (const [ndx, ndy] of N4) {
        const nx = wX(cx2 + ndx), ny = cy2 + ndy;
        if (oob(nx, ny)) continue;
        const ni = ny * dw + nx;
        if (!land[ni] && !seaSet.has(ni)) { straitEnd = ci; break; }
        if (land[ni] && !straitVis[ni]) {
          straitVis[ni] = 1;
          straitFrom[ni] = ci;
          sq.push(ni);
        }
      }
    }

    // Trace strait back from exterior ocean to internal sea
    if (straitEnd >= 0) {
      let cur = straitEnd;
      for (let safety = 0; safety < 40 && cur >= 0 && land[cur]; safety++) {
        land[cur] = 0;
        cur = straitFrom[cur];
      }
    }
  }

  // ── Phase 3e: Volcanic islands (Hawaii, Iceland, Azores) ──
  // Isolated mountain peaks in deep ocean from hotspot activity
  // age: young → more active volcanism → more islands
  const volcanicSet = new Set(); // track for marking as mountains in Phase 5
  const numVolcanic = [5, 3, 1][age] + rng.nextInt(4);
  for (let v = 0; v < numVolcanic; v++) {
    for (let attempt = 0; attempt < 60; attempt++) {
      const dx = rng.nextInt(dw), dy = 6 + rng.nextInt(Math.max(1, mh - 12));
      if (land[dy * dw + dx]) continue;
      // Must be deep ocean: no land within radius 3
      let tooClose = false;
      for (let rdx = -3; rdx <= 3 && !tooClose; rdx++) {
        for (let rdy = -3; rdy <= 3 && !tooClose; rdy++) {
          if (rdx === 0 && rdy === 0) continue;
          const nx = wX(dx + rdx), ny = dy + rdy;
          if (!oob(nx, ny) && land[ny * dw + nx]) tooClose = true;
        }
      }
      if (tooClose) continue;

      // Place volcanic island (1-3 tiles, center is always mountain)
      land[dy * dw + dx] = 1;
      volcanicSet.add(dy * dw + dx);
      const extraTiles = rng.nextInt(3);
      for (let e = 0; e < extraTiles; e++) {
        const d = N4[rng.nextInt(4)];
        const nx = wX(dx + d[0]), ny = dy + d[1];
        if (!oob(nx, ny) && ny >= 4 && ny < mh - 4 && !land[ny * dw + nx]) {
          land[ny * dw + nx] = 1;
        }
      }
      break;
    }
  }

  // ── Phase 3f: Continental shelf islands (Caribbean, Indonesia, Greek) ──
  // Small 1-2 tile islands scattered near continental coastlines
  // continents: islands mode → more shelf islands
  const numShelfIslands = 3 + rng.nextInt(5) + (continents <= 0 ? 4 : 0);
  for (let si = 0; si < numShelfIslands; si++) {
    for (let attempt = 0; attempt < 50; attempt++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      if (land[dy * dw + dx]) continue;
      // Not immediately adjacent to land (gap of at least 1)
      let adj = false;
      for (const [ndx, ndy] of N8) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && land[ny * dw + nx]) { adj = true; break; }
      }
      if (adj) continue;
      // But within 2-5 tiles of land (continental shelf)
      let near = false;
      for (let rdx = -5; rdx <= 5 && !near; rdx++) {
        for (let rdy = -5; rdy <= 5 && !near; rdy++) {
          if (Math.abs(rdx) <= 1 && Math.abs(rdy) <= 1) continue;
          const nx = wX(dx + rdx), ny = dy + rdy;
          if (!oob(nx, ny) && land[ny * dw + nx]) near = true;
        }
      }
      if (!near) continue;

      land[dy * dw + dx] = 1;
      if (rng.random() < 0.5) {
        const d = N4[rng.nextInt(4)];
        const nx = wX(dx + d[0]), ny = dy + d[1];
        if (!oob(nx, ny) && !land[ny * dw + nx]) land[ny * dw + nx] = 1;
      }
      break;
    }
  }

  // ── Phase 3g: Fjords (Norway, Chile, New Zealand) ──
  // Narrow zigzag ocean inlets at high latitudes, carving deep into land
  // age: young → more active tectonics → more fjords
  const numFjords = [4, 2, 1][age] + rng.nextInt(3);
  for (let f = 0; f < numFjords; f++) {
    let sx = -1, sy = -1, sd = 0;
    for (let attempt = 0; attempt < 80; attempt++) {
      const dx = rng.nextInt(dw);
      // High latitude: top or bottom 25% of map
      const polarBand = Math.floor(mh * 0.25);
      const dy = rng.random() < 0.5
        ? 4 + rng.nextInt(Math.max(1, polarBand - 4))
        : (mh - polarBand) + rng.nextInt(Math.max(1, polarBand - 4));
      if (!land[dy * dw + dx]) continue;
      // Must be coastal
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && !land[ny * dw + nx]) {
          // Direction INTO land (opposite of toward-ocean)
          sx = dx; sy = dy; sd = Math.atan2(ndy, ndx) + Math.PI;
          break;
        }
      }
      if (sx >= 0) break;
    }
    if (sx < 0) continue;

    let cx = sx, cy = sy, dir = sd;
    const fjordLen = 5 + rng.nextInt(8);
    for (let step = 0; step < fjordLen; step++) {
      cx += Math.round(Math.cos(dir));
      cy += Math.round(Math.sin(dir));
      const wx = wX(cx);
      if (oob(wx, cy) || cy < 2 || cy >= mh - 2) break;
      if (!land[cy * dw + wx]) break; // hit open ocean, stop
      land[cy * dw + wx] = 0;
      // Sharp zigzag turns (more aggressive than bays)
      dir += (rng.random() - 0.5) * 1.2;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 4: Distance from coast (BFS)
  // ══════════════════════════════════════════════════════════════
  const dCoast = new Uint16Array(dw * mh);
  {
    const q = [], vis = new Uint8Array(dw * mh);
    for (let dy = 0; dy < mh; dy++) {
      for (let dx = 0; dx < dw; dx++) {
        if (!land[dy * dw + dx]) continue;
        let coastal = false;
        for (const [ndx, ndy] of N4) {
          const nx = wX(dx + ndx), ny = dy + ndy;
          if (!oob(nx, ny) && !land[ny * dw + nx]) { coastal = true; break; }
        }
        if (coastal) {
          const i = dy * dw + dx;
          vis[i] = 1;
          dCoast[i] = 1;
          q.push(i);
        }
      }
    }
    let h = 0;
    while (h < q.length) {
      const ci = q[h++], cx = ci % dw, cy = (ci / dw) | 0;
      for (const [ndx, ndy] of N4) {
        const nx = wX(cx + ndx), ny = cy + ndy;
        if (oob(nx, ny)) continue;
        const ni = ny * dw + nx;
        if (vis[ni] || !land[ni]) continue;
        vis[ni] = 1;
        dCoast[ni] = dCoast[ci] + 1;
        q.push(ni);
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 5: Mountain chains
  // age: young (0) → active tectonics: more/longer chains, more hills
  //      old (2)   → eroded: fewer/shorter chains, fewer hills
  // ══════════════════════════════════════════════════════════════
  const isMtn = new Uint8Array(dw * mh);
  const isHill = new Uint8Array(dw * mh);

  // Mark volcanic island centers as mountains (from Phase 3e)
  for (const vi of volcanicSet) isMtn[vi] = 1;

  let maxDist = 0;
  for (let i = 0; i < dCoast.length; i++) {
    if (dCoast[i] > maxDist) maxDist = dCoast[i];
  }

  // Age-dependent mountain parameters
  const chainMinLen   = [10, 6, 4][age] || 6;
  const chainRangeLen = [26, 25, 15][age] || 25;
  const hillFlankChance = [0.70, 0.55, 0.35][age] || 0.55;
  const scatterHillChance = [0.40, 0.30, 0.18][age] || 0.30;

  // Helper: walk a mountain chain from a starting point
  function walkChain(startI, chainLen) {
    let cx = startI % dw, cy = (startI / dw) | 0;
    let dir = rng.random() * Math.PI * 2;

    for (let step = 0; step < chainLen; step++) {
      if (cy < 1 || cy >= mh - 1) break;
      const wx = wX(cx);
      if (wx < 0 || wx >= dw || !land[cy * dw + wx]) break;

      isMtn[cy * dw + wx] = 1;

      // Flanking hills perpendicular to chain direction
      const px = Math.round(Math.cos(dir + Math.PI / 2));
      const py = Math.round(Math.sin(dir + Math.PI / 2));
      for (const side of [-1, 1]) {
        const hx = wX(wx + side * px), hy = cy + side * py;
        if (!oob(hx, hy) && land[hy * dw + hx] && !isMtn[hy * dw + hx]) {
          if (rng.random() < hillFlankChance) isHill[hy * dw + hx] = 1;
        }
      }

      dir += (rng.random() - 0.5) * 0.5;
      cx = wx + Math.round(Math.cos(dir));
      cy += Math.round(Math.sin(dir));
    }
  }

  // 5a: Interior chains
  const numInterior = [4, 2, 1][age] + rng.nextInt([5, 5, 3][age] || 5);
  for (let c = 0; c < numInterior; c++) {
    let bestI = -1, bestS = -1;
    for (let a = 0; a < 40; a++) {
      const dx = rng.nextInt(dw), dy = 2 + rng.nextInt(Math.max(1, mh - 4));
      const i = dy * dw + dx;
      if (!land[i]) continue;
      const s = dCoast[i] + rng.random() * (maxDist * 0.3);
      if (s > bestS) { bestS = s; bestI = i; }
    }
    if (bestI < 0) continue;
    walkChain(bestI, chainMinLen + rng.nextInt(chainRangeLen));
  }

  // 5b: Coastal chains (Andes/Coast Range style)
  const numCoastal = [2, 1, 0][age] + rng.nextInt([4, 3, 2][age] || 3);
  for (let c = 0; c < numCoastal; c++) {
    let bestI = -1;
    for (let a = 0; a < 50; a++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      const i = dy * dw + dx;
      if (!land[i] || dCoast[i] < 2 || dCoast[i] > 4) continue;
      bestI = i;
      break;
    }
    if (bestI < 0) continue;
    walkChain(bestI, chainMinLen + rng.nextInt(chainRangeLen));
  }

  // Scatter extra hills near mountains
  for (let i = 0; i < dw * mh; i++) {
    if (!land[i] || isMtn[i] || isHill[i]) continue;
    const dx = i % dw, dy = (i / dw) | 0;
    let near = false;
    for (const [ndx, ndy] of N8) {
      const nx = wX(dx + ndx), ny = dy + ndy;
      if (!oob(nx, ny) && isMtn[ny * dw + nx]) { near = true; break; }
    }
    if (near && rng.random() < scatterHillChance) isHill[i] = 1;
  }

  // 5c: Mountain clusters (Alps knot, Rockies convergence zones)
  // Adds irregular clumps of mountains+hills to break up linear chains
  const numClusters = 1 + rng.nextInt([4, 3, 2][age] || 3);
  for (let c = 0; c < numClusters; c++) {
    let cx2 = -1, cy2 = -1;
    for (let a = 0; a < 40; a++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      if (isMtn[dy * dw + dx]) { cx2 = dx; cy2 = dy; break; }
    }
    if (cx2 < 0) continue;

    const radius = 2 + rng.nextInt(3);
    for (let rdx = -radius; rdx <= radius; rdx++) {
      for (let rdy = -radius; rdy <= radius; rdy++) {
        if (rdx * rdx + rdy * rdy > radius * radius) continue;
        const nx = wX(cx2 + rdx), ny = cy2 + rdy;
        if (oob(nx, ny) || !land[ny * dw + nx]) continue;
        const ni = ny * dw + nx;
        const inner = rdx * rdx + rdy * rdy <= (radius - 1) * (radius - 1);
        if (inner) {
          if (!isMtn[ni] && rng.random() < 0.45) isMtn[ni] = 1;
          else if (!isMtn[ni] && !isHill[ni]) isHill[ni] = 1;
        } else {
          if (!isMtn[ni] && !isHill[ni] && rng.random() < 0.4) isHill[ni] = 1;
        }
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 6: Terrain assignment
  // ══════════════════════════════════════════════════════════════
  const terr = new Uint8Array(dw * mh);

  // 6a: Base biome from latitude
  // temperature shifts all bands poleward (warm) or equatorward (cool)
  for (let dy = 0; dy < mh; dy++) {
    for (let dx = 0; dx < dw; dx++) {
      const i = dy * dw + dx;
      if (!land[i]) { terr[i] = T_OCEAN; continue; }
      if (isMtn[i]) { terr[i] = T_MOUNTAINS; continue; }
      if (isHill[i]) { terr[i] = T_HILLS; continue; }

      const lat = Math.abs(dy - halfH) / halfH; // 0=equator, 1=pole
      const shift = temperature * 0.12; // cool widens polar, warm shrinks it
      // Smooth noise offset creates wavy biome boundaries instead of
      // straight horizontal lines. Replaces old per-tile random jitter.
      const eLat = Math.max(0, Math.min(1, lat - shift + latOffset[i]));

      // climate widens/narrows equatorial zone
      const jungleThresh = 0.10 + climate * 0.04; // arid: 0.06, wet: 0.14
      const tropicalEnd = 0.25 - climate * 0.03;  // arid: 0.28, wet: 0.22

      if (eLat > 0.92)            terr[i] = T_GLACIER;
      else if (eLat > 0.80)       terr[i] = T_TUNDRA;
      else if (eLat > 0.62)       terr[i] = T_FOREST;      // boreal
      else if (eLat > 0.42)       terr[i] = T_GRASSLAND;   // temperate
      else if (eLat > tropicalEnd) terr[i] = T_DESERT;     // horse latitudes
      else if (eLat > jungleThresh) terr[i] = T_GRASSLAND; // tropical
      else                         terr[i] = T_JUNGLE;     // equatorial
    }
  }

  // 6b: Primary directional moisture sweep
  // climate affects ocean moisture accumulation and inland decay rate
  const oceanAccum = 0.12 + climate * 0.04; // arid:0.08, normal:0.12, wet:0.16
  const landDecay  = 0.05 - climate * 0.02; // arid:0.07, normal:0.05, wet:0.03

  for (let dy = 0; dy < mh; dy++) {
    const lat = Math.abs(dy - halfH) / halfH;
    const westerly = lat >= 0.33 && lat < 0.75;

    let moisture = 0;
    const start = westerly ? 0 : dw - 1;
    const end = westerly ? dw : -1;
    const step = westerly ? 1 : -1;

    for (let dx = start; dx !== end; dx += step) {
      const i = dy * dw + dx;
      if (!land[i]) { moisture = Math.min(moisture + oceanAccum, 1.0); continue; }
      if (isMtn[i]) { moisture = Math.max(moisture - 0.45, 0); continue; }
      if (isHill[i]) moisture = Math.max(moisture - 0.08, 0);

      const t = terr[i];
      const em = moisture + climate * 0.12;

      if (em > 0.65) {
        if (t === T_DESERT) terr[i] = T_GRASSLAND;
        else if (t === T_PLAINS) terr[i] = T_FOREST;
        else if (t === T_GRASSLAND) terr[i] = T_FOREST;
        else if (t === T_TUNDRA) terr[i] = T_FOREST;
      } else if (em > 0.35) {
        if (t === T_DESERT) terr[i] = T_PLAINS;
        else if (t === T_GRASSLAND && rng.random() < 0.35) terr[i] = T_FOREST;
        else if (t === T_JUNGLE && rng.random() < 0.4) terr[i] = T_SWAMP;
      } else if (em < 0.12) {
        if (t === T_GRASSLAND) terr[i] = T_PLAINS;
        else if (t === T_FOREST) terr[i] = T_PLAINS;
        else if (t === T_JUNGLE) terr[i] = T_GRASSLAND;
      }

      moisture = Math.max(moisture - landDecay, 0);
    }
  }

  // 6c: Counter-sweep from opposite direction at 30% intensity
  for (let dy = 0; dy < mh; dy++) {
    const lat = Math.abs(dy - halfH) / halfH;
    const westerly = lat >= 0.33 && lat < 0.75;

    let moisture = 0;
    const start = westerly ? dw - 1 : 0;
    const end = westerly ? -1 : dw;
    const step = westerly ? -1 : 1;

    for (let dx = start; dx !== end; dx += step) {
      const i = dy * dw + dx;
      if (!land[i]) { moisture = Math.min(moisture + oceanAccum, 1.0); continue; }
      if (isMtn[i]) { moisture = Math.max(moisture - 0.45, 0); continue; }
      if (isHill[i]) moisture = Math.max(moisture - 0.08, 0);

      const em = moisture * 0.3 + climate * 0.05;
      const t = terr[i];

      if (em > 0.25) {
        if (t === T_PLAINS) terr[i] = T_GRASSLAND;
      }

      moisture = Math.max(moisture - landDecay, 0);
    }
  }

  // 6d: Continental interior drying
  // climate: arid intensifies drying, wet reduces it
  if (maxDist > 0) {
    const climateDryMod = climate * -0.15; // arid: +0.15, wet: -0.15
    for (let i = 0; i < dw * mh; i++) {
      if (!land[i] || isMtn[i] || isHill[i]) continue;
      const dy = (i / dw) | 0;
      const lat = Math.abs(dy - halfH) / halfH;
      const interiorFrac = dCoast[i] / maxDist;
      if (interiorFrac < 0.35) continue;

      const isHorseLat = lat >= 0.22 && lat <= 0.55;
      const baseChance = isHorseLat ? 0.75 : 0.3;
      const dryChance = interiorFrac * Math.max(0.05, baseChance + climateDryMod);

      if (rng.random() < dryChance) {
        const t = terr[i];
        if (t === T_FOREST) terr[i] = T_GRASSLAND;
        else if (t === T_GRASSLAND) terr[i] = T_PLAINS;
        else if (t === T_PLAINS && isHorseLat) terr[i] = T_DESERT;
        else if (t === T_JUNGLE) terr[i] = T_FOREST;
        else if (t === T_SWAMP) terr[i] = T_GRASSLAND;
      }
    }
  }

  // 6e: Steppe transition bands
  // Insert plains/grassland buffers between incompatible biome pairs
  // (desert↔forest, tundra↔grassland) so biomes don't jump abruptly
  for (let i = 0; i < dw * mh; i++) {
    if (!land[i] || isMtn[i] || isHill[i]) continue;
    const t = terr[i];
    const dx = i % dw, dy = (i / dw) | 0;
    if (t === T_DESERT) {
      // Desert adjacent to forest/jungle → soften to plains
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (oob(nx, ny)) continue;
        const nt = terr[ny * dw + nx];
        if (nt === T_FOREST || nt === T_JUNGLE) { terr[i] = T_PLAINS; break; }
      }
    } else if (t === T_TUNDRA) {
      // Tundra adjacent to grassland/jungle → soften to plains
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (oob(nx, ny)) continue;
        const nt = terr[ny * dw + nx];
        if (nt === T_GRASSLAND || nt === T_JUNGLE) { terr[i] = T_PLAINS; break; }
      }
    } else if (t === T_GLACIER) {
      // Glacier adjacent to anything green → soften to tundra
      for (const [ndx, ndy] of N4) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (oob(nx, ny)) continue;
        const nt = terr[ny * dw + nx];
        if (nt === T_FOREST || nt === T_GRASSLAND || nt === T_PLAINS) {
          terr[i] = T_TUNDRA; break;
        }
      }
    }
  }

  // ── 6f: Horizontal de-banding (2 passes) ──
  // Break up horizontal runs of identical terrain longer than 4 tiles
  // by pulling in terrain from above/below. Prevents the "striped" look.
  for (let pass = 0; pass < 2; pass++) {
    for (let dy = 2; dy < mh - 2; dy++) {
      let runLen = 0, runTerr = -1;
      for (let dx = 0; dx < dw; dx++) {
        const i = dy * dw + dx;
        if (!land[i] || isMtn[i] || isHill[i]) { runLen = 0; runTerr = -1; continue; }
        if (terr[i] === runTerr) {
          runLen++;
          if (runLen > 4 && rng.random() < 0.45) {
            const above = (dy > 0) ? terr[(dy - 1) * dw + dx] : -1;
            const below = (dy < mh - 1) ? terr[(dy + 1) * dw + dx] : -1;
            // Prefer pulling from the side that has a different terrain
            if (above >= 0 && above !== T_OCEAN && above !== T_MOUNTAINS &&
                above !== T_HILLS && above !== runTerr) {
              terr[i] = above; runLen = 0;
            } else if (below >= 0 && below !== T_OCEAN && below !== T_MOUNTAINS &&
                       below !== T_HILLS && below !== runTerr) {
              terr[i] = below; runLen = 0;
            }
          }
        } else {
          runLen = 1;
          runTerr = terr[i];
        }
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 7: Smoothing (N8 neighbor voting)
  // Uses all 8 neighbors for organic clustering instead of N4.
  // age: young → less smoothing (rough terrain), old → more (eroded)
  // ══════════════════════════════════════════════════════════════
  const smoothN = Math.floor(dw * mh * ([0.15, 0.25, 0.45][age] || 0.25));
  for (let iter = 0; iter < smoothN; iter++) {
    const dx = rng.nextInt(dw), dy = rng.nextInt(mh);
    const i = dy * dw + dx;
    const t = terr[i];
    if (t === T_OCEAN || t === T_MOUNTAINS || t === T_HILLS) continue;

    const votes = new Int8Array(11);
    for (const [ndx, ndy] of N8) {
      const nx = wX(dx + ndx), ny = dy + ndy;
      if (oob(nx, ny)) continue;
      const nt = terr[ny * dw + nx];
      if (nt !== T_OCEAN && nt !== T_MOUNTAINS && nt !== T_HILLS) votes[nt]++;
    }

    let best = t, bestV = 0;
    for (let k = 0; k < 11; k++) {
      if (votes[k] > bestV) { bestV = votes[k]; best = k; }
    }
    if (bestV >= 4) terr[i] = best;
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 8: Rivers with tributaries + delta swamps + inland lakes
  // ══════════════════════════════════════════════════════════════
  const riv = new Uint8Array(dw * mh);
  const rivTarget = Math.max(2, 6 + landmass * 4 + climate * 2);
  let rivCount = 0;

  // Walk a river downhill from startI. Stops at ocean or any tile in targetSet.
  function walkRiver(startI, maxLen, targetSet) {
    let cx = startI % dw, cy = (startI / dw) | 0;
    const path = [];
    const visited = new Set();
    let reached = false;

    while (path.length < maxLen) {
      const ci = cy * dw + cx;
      if (visited.has(ci)) break;
      visited.add(ci);
      path.push(ci);

      let bnx = -1, bny = -1, bnd = dCoast[ci];
      for (const [ndx, ndy] of N8) {
        const nx = wX(cx + ndx), ny = cy + ndy;
        if (oob(nx, ny) || visited.has(ny * dw + nx)) continue;
        const ni = ny * dw + nx;
        if (!land[ni]) { reached = true; break; }
        if (targetSet && targetSet.has(ni)) { reached = true; break; }
        if (dCoast[ni] < bnd) { bnd = dCoast[ni]; bnx = nx; bny = ny; }
      }
      if (reached) break;

      // Occasional random deviation for natural meandering
      if (bnx >= 0 && rng.random() < 0.3) {
        const d = N8[rng.nextInt(8)];
        const rx = wX(cx + d[0]), ry = cy + d[1];
        if (!oob(rx, ry) && land[ry * dw + rx] && !visited.has(ry * dw + rx)) {
          bnx = rx; bny = ry;
        }
      }

      if (bnx < 0) break;
      cx = bnx; cy = bny;
    }

    return { path, reached };
  }

  // Green up terrain along a river path
  function greenUpRiver(path) {
    for (const pi of path) {
      riv[pi] = 1;
      const t = terr[pi];
      if (t === T_DESERT) terr[pi] = rng.random() < 0.7 ? T_GRASSLAND : T_PLAINS;
      else if (t === T_PLAINS && rng.random() < 0.5) terr[pi] = T_GRASSLAND;
      else if (t === T_TUNDRA) terr[pi] = T_PLAINS;
    }
  }

  for (let att = 0; att < 500 && rivCount < rivTarget; att++) {
    // Find deep interior starting point for main trunk
    let bestI = -1, bestD = 0;
    for (let a = 0; a < 20; a++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      const i = dy * dw + dx;
      if (!land[i] || isMtn[i] || riv[i]) continue;
      if (dCoast[i] > bestD) { bestD = dCoast[i]; bestI = i; }
    }
    if (bestI < 0 || bestD < 3) continue;

    // Walk main trunk to coast
    const { path: mainPath, reached } = walkRiver(bestI, 80, null);
    if (!reached || mainPath.length < 4) continue;

    const riverSet = new Set(mainPath);
    greenUpRiver(mainPath);

    // Generate 1-3 tributaries that join the main trunk
    const numTribs = 1 + rng.nextInt(3);
    for (let tr = 0; tr < numTribs; tr++) {
      // Pick a join point along the upper half of the main river
      const joinIdx = Math.floor(mainPath.length * (0.2 + rng.random() * 0.5));
      const joinTile = mainPath[joinIdx];
      const jx = joinTile % dw, jy = (joinTile / dw) | 0;

      // Find tributary start: offset from join point, deeper inland
      let tribStart = -1;
      for (let a = 0; a < 30; a++) {
        const ox = wX(jx + rng.nextInt(11) - 5);
        const oy = jy + rng.nextInt(11) - 5;
        if (oob(ox, oy)) continue;
        const oi = oy * dw + ox;
        if (!land[oi] || isMtn[oi] || riv[oi] || riverSet.has(oi)) continue;
        // Prefer points deeper inland than the join point
        if (dCoast[oi] > dCoast[joinTile]) { tribStart = oi; break; }
      }
      if (tribStart < 0) continue;

      // Walk tributary downhill; it stops when it hits the main river
      const { path: tribPath, reached: tribReached } = walkRiver(tribStart, 30, riverSet);
      if (tribReached && tribPath.length >= 3) {
        for (const pi of tribPath) riverSet.add(pi);
        greenUpRiver(tribPath);
      }
    }

    // River delta: swamp fan-out near coast in tropical zones
    const deltaDepth = climate >= 1 ? 4 : 3;
    const deltaChance = climate >= 1 ? 0.55 : 0.4;
    for (let di = Math.max(0, mainPath.length - deltaDepth); di < mainPath.length; di++) {
      const pi = mainPath[di];
      const piDy = (pi / dw) | 0;
      const piLat = Math.abs(piDy - halfH) / halfH;
      if (piLat < 0.30) {
        terr[pi] = T_SWAMP;
        const piDx = pi % dw;
        for (const [ndx, ndy] of N4) {
          const nx = wX(piDx + ndx), ny = piDy + ndy;
          if (!oob(nx, ny) && land[ny * dw + nx] && !isMtn[ny * dw + nx] && !riv[ny * dw + nx]) {
            if (rng.random() < deltaChance) terr[ny * dw + nx] = T_SWAMP;
          }
        }
      }
    }

    rivCount++;
  }

  // ── Inland lakes ──
  // climate: arid → fewer lakes, wet → more
  const lakeBase  = [1, 2, 3][climate + 1] || 2;
  const lakeRange = [2, 4, 5][climate + 1] || 4;
  const numLakes = lakeBase + rng.nextInt(lakeRange);

  for (let l = 0; l < numLakes; l++) {
    let bestI = -1, bestD = 0;
    for (let a = 0; a < 30; a++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      const i = dy * dw + dx;
      if (!land[i] || isMtn[i] || riv[i]) continue;
      if (dCoast[i] > bestD) { bestD = dCoast[i]; bestI = i; }
    }
    if (bestI < 0 || bestD < 4) continue;

    const lakeSize = 3 + rng.nextInt(5);
    const lakeTiles = [bestI];
    terr[bestI] = T_OCEAN;

    for (let s = 1; s < lakeSize; s++) {
      const src = lakeTiles[rng.nextInt(lakeTiles.length)];
      const srcDx = src % dw, srcDy = (src / dw) | 0;
      const d = N4[rng.nextInt(4)];
      const nx = wX(srcDx + d[0]), ny = srcDy + d[1];
      if (oob(nx, ny)) continue;
      const ni = ny * dw + nx;
      if (terr[ni] === T_OCEAN || isMtn[ni]) continue;
      terr[ni] = T_OCEAN;
      lakeTiles.push(ni);
    }

    for (const li of lakeTiles) {
      const lx = li % dw, ly = (li / dw) | 0;
      for (const [ndx, ndy] of N4) {
        const nx = wX(lx + ndx), ny = ly + ndy;
        if (oob(nx, ny)) continue;
        const ni = ny * dw + nx;
        if (terr[ni] !== T_OCEAN && !isMtn[ni] && !isHill[ni] && rng.random() < 0.5) {
          terr[ni] = T_GRASSLAND;
        }
      }
    }
  }

  // ── Phase 8b: River floodplain wetlands ──
  // Swamp/marsh tiles along lower river courses (Mississippi, Nile style)
  // climate: wet → more extensive floodplains
  for (let i = 0; i < dw * mh; i++) {
    if (!riv[i]) continue;
    const dx = i % dw, dy = (i / dw) | 0;
    const lat = Math.abs(dy - halfH) / halfH;
    if (lat > 0.65) continue; // no wetlands in polar regions
    if (dCoast[i] > 4) continue; // only lower course (near coast)

    for (const [ndx, ndy] of N4) {
      const nx = wX(dx + ndx), ny = dy + ndy;
      if (oob(nx, ny)) continue;
      const ni = ny * dw + nx;
      if (!land[ni] || isMtn[ni] || isHill[ni] || riv[ni]) continue;
      const nt = terr[ni];
      if (nt === T_TUNDRA || nt === T_GLACIER || nt === T_DESERT) continue;
      const chance = climate >= 1 ? 0.40 : climate <= -1 ? 0.10 : 0.25;
      if (rng.random() < chance) terr[ni] = T_SWAMP;
    }
  }

  // ── Phase 8c: Desert oases ──
  // Small grassland/plains patches in large desert interiors
  // climate: arid → more oases (more desert to put them in)
  const numOases = climate <= -1 ? 4 + rng.nextInt(4)
                 : climate >= 1  ? 1 + rng.nextInt(2)
                 : 2 + rng.nextInt(3);
  for (let o = 0; o < numOases; o++) {
    for (let attempt = 0; attempt < 50; attempt++) {
      const dx = rng.nextInt(dw), dy = 4 + rng.nextInt(Math.max(1, mh - 8));
      const i = dy * dw + dx;
      if (terr[i] !== T_DESERT) continue;
      // Must be deep in desert (most N8 neighbors are desert)
      let desertCount = 0;
      for (const [ndx, ndy] of N8) {
        const nx = wX(dx + ndx), ny = dy + ndy;
        if (!oob(nx, ny) && terr[ny * dw + nx] === T_DESERT) desertCount++;
      }
      if (desertCount < 5) continue;

      // Place oasis: 1-2 green tiles
      terr[i] = T_GRASSLAND;
      if (rng.random() < 0.5) {
        const d = N4[rng.nextInt(4)];
        const nx = wX(dx + d[0]), ny = dy + d[1];
        if (!oob(nx, ny) && terr[ny * dw + nx] === T_DESERT) {
          terr[ny * dw + nx] = T_PLAINS;
        }
      }
      break;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 9: Polar caps (Civ2-style)
  // ══════════════════════════════════════════════════════════════
  for (let dx = 0; dx < dw; dx++) {
    terr[dx] = T_GLACIER;
    terr[(mh - 1) * dw + dx] = T_GLACIER;
  }
  const polScat = Math.floor(dw / 4);
  for (let i = 0; i < polScat; i++) {
    terr[rng.nextInt(dw)] = T_TUNDRA;
    terr[1 * dw + rng.nextInt(dw)] = T_TUNDRA;
    terr[(mh - 1) * dw + rng.nextInt(dw)] = T_TUNDRA;
    terr[(mh - 2) * dw + rng.nextInt(dw)] = T_TUNDRA;
  }

  // ══════════════════════════════════════════════════════════════
  // Phase 10: Build tileData in doubled-X coordinate space
  // ══════════════════════════════════════════════════════════════
  const tileData = new Array(mw * mh);
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const dx = Math.floor(x / 2);
      const di = y * dw + dx;
      tileData[y * mw + x] = {
        terrain: terr[di],
        river: !!riv[di] && terr[di] !== T_OCEAN,
        goodyHut: false,
        resourceSuppressed: false,
        improvements: EMPTY_IMP,
        cityRadiusOwner: 0,
        bodyId: 0,
        visibility: 0,
        tileOwnership: 0,
        fertility: 0,
      };
    }
  }

  assignBodyIds(tileData, mw, mh, wraps);
  calculateFertility(tileData, mw, mh, wraps);

  for (let i = 0; i < tileData.length; i++) {
    const t = tileData[i];
    if (t.terrain !== T_OCEAN && t.terrain !== T_GLACIER && t.terrain !== T_MOUNTAINS) {
      if (rng.random() < 0.02) t.goodyHut = true;
    }
  }

  return { mw, mh, mapShape, mapSeed, tileData };
}

// ── Body ID assignment (flood fill) ──
function assignBodyIds(tileData, mw, mh, wraps) {
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

// ── Fertility calculation ──
function calculateFertility(tileData, mw, mh, wraps) {
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
