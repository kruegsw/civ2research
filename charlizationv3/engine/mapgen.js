// ═══════════════════════════════════════════════════════════════════
// mapgen.js — Civ2-faithful map generation (shared: server + client)
//
// Line-by-line port of FUN_00408d33 and sub-functions from
// reverse_engineering/decompiled/block_00400000.c
//
// Pipeline (from C binary):
//   1. PRNG + init (all ocean)
//   2. Continent placement (random walk)
//   3. Bridge fill (diagonal gap bridging)
//   4. Latitude-based terrain assignment
//   5. Elevation/moisture pass (W→E and E→W interleaved)
//   6. Elevation iterations (terrain promotion)
//   7. Smoothing pass (neighbor voting)
//   8. River generation
//   9. Polar caps + tundra scatter
//  10. Body ID assignment (flood fill)
//  11. Fertility calculation
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from './defs.js';

// ── Direction offset tables (from Civ2 DAT_00628350/60) ──
// 8-direction offsets in doubled-X isometric coords
// Index: 0=NE, 1=E, 2=SE, 3=S, 4=SW, 5=W, 6=NW, 7=N
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];

// Cardinal directions: DAT_00628351[i*2] / DAT_00628361[i*2]
// These are offsets +1 from DIR8 base, picking every-other entry: indices 1,3,5,7
// = E, S, W, N
const CARDINAL_DX = [2, 0, -2, 0]; // E, S, W, N
const CARDINAL_DY = [0, 2, 0, -2];

// Diagonal directions: DAT_00628350[i*2] / DAT_00628360[i*2]
// Even indices of 8-dir table: indices 0,2,4,6 = NE, SE, SW, NW
const DIAG_DX = [1, 1, -1, -1]; // NE, SE, SW, NW
const DIAG_DY = [-1, 1, 1, -1];

// River carving uses diagonal directions (DAT_0062833c/DAT_00628344)
const RIVER_DX = DIAG_DX;
const RIVER_DY = DIAG_DY;

// ── MSVC-compatible LCG PRNG ──
// Replicates the serial correlation structure of MSVC's rand(), which
// produces more compact random walks than JavaScript's Math.random().
// Formula: state = state * 214013 + 2531011 (mod 2^32), return bits 16-30.
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() { // returns 0-32767
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

// ── Map generation terrain constants (from binary analysis) ──
export const CLIMATE_BOUNDARY_NUMERATOR = 3;
export const CLIMATE_BOUNDARY_DENOMINATOR = 10;
export const CONTINENT_BLOB_MAX_STEPS = 48;
export const ISLAND_BLOB_MAX_STEPS = 63;

/**
 * Generate a map faithful to Civ2's algorithm.
 *
 * @param {object} settings
 * @param {number} settings.width      - map width (gx columns), default 50
 * @param {number} settings.height     - map height (rows), default 80
 * @param {number} [settings.seed]     - resource seed (0-65535)
 * @param {number} [settings.mapShape] - 0=cylinder (wrapping), 1=flat
 * @param {number} [settings.landmass] - 0=small, 1=normal, 2=large. Default 1
 * @param {number} [settings.continents] - continent form: 0=islands, 1=normal, 2=large. Default 1
 * @param {number} [settings.temperature] - -1=cool, 0=temperate, 1=warm. Default 0
 * @param {number} [settings.climate]  - -1=arid, 0=normal, 1=wet. Default 0
 * @param {number} [settings.age]      - 0=young(3B), 1=normal(2B), 2=old(1B). Default 1
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMap(settings = {}) {
  const mw = settings.width || 50;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? (settings.rng ? settings.rng.nextInt(65536) : Math.floor(Math.random() * 65536));
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;      // (DAT_00655ae8 & 0x8000) == 0 means wrapping
  const isFlat = !wraps;             // (DAT_00655ae8 & 0x8000) != 0

  const landmass = settings.landmass ?? 1;       // 0=small,1=normal,2=large
  const continents = settings.continents ?? 1;   // 0=islands, 1=normal, 2=large
  let temperature = settings.temperature ?? 0;   // -1=cool, 0=temperate, 1=warm
  let climate = settings.climate ?? 0;           // -1=arid, 0=normal, 1=wet
  const age = settings.age ?? 1;                 // 0=3B,1=2B,2=1B years

  // C lines 1546-1549: flat (no-wrap) maps double climate and temperature parameters
  // Binary: (DAT_00655ae8 & 0x8000) != 0 → DAT_00624ef4 <<= 1, DAT_00624ef0 <<= 1
  if (isFlat) {
    climate = climate << 1;       // DAT_00624ef4 <<= 1
    temperature = temperature << 1; // DAT_00624ef0 <<= 1
  }

  // Convert JS 0/1/2 params to C's -1/0/1
  const landSize = landmass - 1;      // DAT_00624ee8: -1/0/1
  const landForm = continents - 1;    // DAT_00624eec: -1/0/1
  const ageVal = age - 1;             // DAT_00624ef8: -1/0/1

  // ── Flat grassland mode: skip all terrain generation ──
  if (settings.flatGrassland) {
    const T_GRASS = 2;
    const tileData = new Array(mw * mh);
    for (let y = 0; y < mh; y++) {
      for (let x = 0; x < mw; x++) {
        const i = y * mw + x;
        tileData[i] = {
          terrain: T_GRASS,
          river: false,
          goodyHut: false,
          hasResource: false,
          visibility: 0,
          tileOwnership: 0xFF,
          improvements: { city: false, irrigation: false, mining: false, road: false, railroad: false, fortress: false, pollution: false, farmland: false, airbase: false },
        };
      }
    }
    return { mw, mh, mapShape, mapSeed, tileData, wraps };
  }

  // ── Phase 1: Init tile arrays ──
  // C line 1553: thunk_FUN_00408830(DAT_00636598, 10) — set byte[0] to 10 (ocean) for all valid tiles
  // C line 1554: thunk_FUN_00408830(DAT_00636598 + 1, 0) — set byte[1] to 0 for all valid tiles
  // DAT_006d1164 = (mw >> 1) * mh
  const totalTiles = (mw >> 1) * mh;
  const terrain = new Uint8Array(mw * mh);    // byte[0]: terrain type
  const landCount = new Uint8Array(mw * mh);  // byte[1]: cumulative land counter
  const scratch = new Uint8Array(mw * mh);    // byte[5]: scratch (also used by river snapshot)

  terrain.fill(T_OCEAN);

  // ── Helper functions ──
  // thunk_FUN_005ae052: wraps x coordinate
  function wrapX(x) {
    if (!wraps) return x;
    return ((x % mw) + mw) % mw;
  }

  // thunk_FUN_004087c0: returns nonzero if (x,y) is valid
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    if (wraps) return true;
    return x >= 0 && x < mw;
  }

  // Snap x to valid parity for row y (binary's get_tile_ptr does x & ~1)
  function snap(x, y) { return (x & ~1) | (y & 1); }

  // thunk_FUN_005b8931: get tile index (we return the array index, not a pointer)
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }

  // thunk_FUN_005b89bb: get terrain type byte 0 & 0x0F
  function getTerType(x, y) {
    if (!inBounds(x, y)) return T_OCEAN;
    return terrain[idx(x, y)] & 0x0F;
  }

  // thunk_FUN_005b89e4: returns 1 if ocean
  function isOcean(x, y) {
    return getTerType(x, y) === T_OCEAN;
  }

  // ── Phase 2: Continent placement ──
  let totalLand = 0;  // DAT_0063cba4 (C line 1552)

  // C lines 1555-1558: bounds setup
  let yMin = 0;          // DAT_0063cba0
  let yMax = mh - 1;     // DAT_0063cb94 = DAT_006d1162 - 1
  const xMin = 3;         // DAT_0063cb9c = 3
  const xMax = mw - 3;    // DAT_0063cb98 = DAT_006d1160 - 3

  // C lines 1559-1567: 50% chance to shift y-bounds for asymmetry
  // local_44 = abs(rand()) & 1 — for unsigned rand() this is just rand() & 1
  const local_44 = rng.next() & 1;
  if (local_44 === 0) {
    yMax = mh - 5;  // DAT_0063cb94 = DAT_006d1162 - 5
  } else {
    yMin = 4;       // DAT_0063cba0 = 4
  }

  // C lines 1568-1573: landTarget
  // iVar4 = DAT_00624eec; if (iVar4 < 1) iVar4 = 0;
  let landFormClamped = landForm;
  if (landFormClamped < 1) landFormClamped = 0;
  const local_20 = ((mh * mw) >> 1) / 400 | 0;  // (mh * mw / 2) / 400, integer division
  const landTarget = ((local_20 * ((landSize * 8 + 8 + landFormClamped * 8) * 5 + 0x50) * 8) / 10) | 0;

  // ── Bounds check (FUN_0040a824, C lines 2269-2286) ──
  // C: if ((wrapping_enabled) || (xMin <= x && x <= xMax)) { check y } else return 0
  // When wrapping IS enabled, x is unrestricted (handled by wrapX).
  // When wrapping is DISABLED, x must be in [xMin, xMax].
  function checkBounds(x, y) {
    if (!wraps) {
      // flat map: x must be in xMin..xMax
      if (x < xMin || x > xMax) return false;
    }
    // wrapping enabled OR x in range: check y
    if (y < yMin || y > yMax) return false;
    return true;
  }

  // ── Mark single tile in scratch byte[5] (FUN_0040a8db, C lines 2312-2325) ──
  function markTile(x, y) {
    // C: uVar1 = thunk_FUN_005ae052(param_1) — wrap x
    const wx = wrapX(x);
    // C: iVar2 = FUN_0040a824(uVar1, param_2)
    if (!checkBounds(wx, y)) return;
    // C: iVar2 = thunk_FUN_005b8931(uVar1, param_2); *(iVar2 + 5) = 1
    const i = y * mw + snap(wx, y);
    scratch[i] = 1;
  }

  // ── Mark 3-tile diamond pattern (FUN_0040a892, C lines 2295-2303) ──
  function mark3Tiles(x, y) {
    markTile(x, y);
    markTile(x + 1, y - 1);
    markTile(x + 1, y + 1);
  }

  // ── Small continent random walk (FUN_0040a763, C lines 2230-2260) ──
  // Used when DAT_00624eec < 1 (landForm < 1)
  function placeLandSmall(sx, sy) {
    // C lines 2238-2240: local_8 = abs(rand()) & 0x3F
    let steps = rng.next() & 0x3F;
    // C lines 2241-2243: if byte[1] != 0 at start, halve steps
    if (landCount[idx(sx, sy)] !== 0) {
      steps = steps >> 1;
    }
    // C line 2245: steps += 1
    steps = steps + 1;
    let x = sx, y = sy;
    while (true) {
      // C line 2247: if (steps == 0) break
      if (steps === 0) break;
      // C lines 2248-2249: bounds check
      if (!checkBounds(x, y)) break;
      // C line 2250: place 3-tile diamond
      mark3Tiles(x, y);
      // C lines 2251-2253: random direction (cardinal)
      // iVar2 = abs(rand()) & 3; param_1 += DAT_00628351[iVar2*2]; param_2 += DAT_00628361[iVar2*2]
      const d = rng.next() & 3;
      x = x + CARDINAL_DX[d];
      y = y + CARDINAL_DY[d];
      // C line 2256: steps -= 1
      steps = steps - 1;
    }
  }

  // ── Large continent random walk (FUN_0040a92f, C lines 2334-2383) ──
  // Used when DAT_00624eec >= 1 (landForm >= 1)
  function placeLandLarge(sx, sy) {
    // C lines 2342-2343: local_8 = rand() % 0x30
    let steps = rng.next() % 0x30;
    // C lines 2344-2346: if byte[1] != 0 at start, halve steps
    if (landCount[idx(sx, sy)] !== 0) {
      steps = steps >> 1;
    }
    // C line 2348: steps += 1
    steps = steps + 1;
    let x = sx, y = sy;
    while (true) {
      if (steps === 0) break;
      if (!checkBounds(x, y)) break;
      // C line 2353: place 3-tile diamond at center
      mark3Tiles(x, y);
      // C lines 2354-2356: 25% chance — extra blob East
      if ((rng.next() & 3) === 0) {
        mark3Tiles(x + 2, y);
      }
      // C lines 2359-2362: 25% chance — extra blob West
      if ((rng.next() & 3) === 0) {
        mark3Tiles(x - 2, y);
      }
      // C lines 2364-2367: 25% chance — extra blob South
      if ((rng.next() & 3) === 0) {
        mark3Tiles(x, y + 2);
      }
      // C lines 2369-2372: 25% chance — extra blob North
      if ((rng.next() & 3) === 0) {
        mark3Tiles(x, y - 2);
      }
      // C lines 2374-2378: random cardinal direction step
      const d = rng.next() & 3;
      x = x + CARDINAL_DX[d];
      y = y + CARDINAL_DY[d];
      steps = steps - 1;
    }
  }

  // ── Small island random walk (FUN_0040aaa4, C lines 2392-2417) ──
  function placeLandIsland(sx, sy) {
    // C lines 2400-2402: local_8 = (abs(rand()) & 0xF) + 1
    let steps = (rng.next() & 0xF) + 1;
    let x = sx, y = sy;
    while (true) {
      if (steps === 0) break;
      if (!checkBounds(x, y)) break;
      // C line 2407: mark single tile (not diamond)
      markTile(x, y);
      // C lines 2408-2412: random diagonal direction
      // iVar2 = abs(rand()) & 3; param_1 += DAT_00628350[iVar2*2]; param_2 += DAT_00628360[iVar2*2]
      const d = rng.next() & 3;
      x = x + DIAG_DX[d];
      y = y + DIAG_DY[d];
      steps = steps - 1;
    }
  }

  // ── Place one continent (FUN_0040a572, C lines 2150-2221) ──
  function placeContinent(mode) {
    // C line 2161: clear scratch (byte[5]) for all tiles
    scratch.fill(0);

    // C lines 2162-2190: do-while to find starting position
    let sx, sy;
    let breakOut = false;
    while (true) {
      // C lines 2163-2170: x = rand() % (mw - 0x10) + 8
      let lx;
      if (mw <= 0x11) {
        lx = 0;
      } else {
        lx = rng.next() % (mw - 0x10);
      }
      sx = lx + 8;

      // C lines 2171-2178: y = rand() % (mh - 8) + 4
      let ly;
      if (mh <= 9) {
        ly = 0;
      } else {
        ly = rng.next() % (mh - 8);
      }
      sy = ly + 4;

      // C lines 2179-2188: for mode 0, chance to break early via landForm
      if (mode === 0) {
        let local_28;
        if (landForm <= -1) {
          local_28 = 0;
        } else {
          local_28 = rng.next() % (landForm + 2);
        }
        // C line 2187: if (local_28 != 0) break;
        if (local_28 !== 0) {
          breakOut = true;
          break;
        }
      }

      // C lines 2189-2190: while ((iVar1 + 1) != 0)
      // i.e., loop while landCount at start > 0
      if (landCount[idx(sx, sy)] === 0) break;
    }

    // Safety: prevent infinite loop in pathological cases
    // (C has no safety, but JS shouldn't infinite loop)

    // C lines 2191-2208: dispatch to walker
    if (mode === 0) {
      // C lines 2192-2197: choose by landForm
      if (landForm < 1) {
        placeLandSmall(sx, sy);
      } else {
        placeLandLarge(sx, sy);
      }
    } else {
      // C lines 2200-2207: island mode — random extra passes
      const r = rng.next() % 10;
      placeLandIsland(sx, sy);
      if (r > 6) {
        placeLandIsland(sx, sy);
      }
      if (r > 8) {
        placeLandIsland(sx, sy);
      }
    }

    // C lines 2209-2218: tally scratch into landCount, increment totalLand
    // C uses linear stride-6 walk through totalTiles entries.
    // We iterate valid-parity positions only.
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const i = y * mw + x;
        if (scratch[i] !== 0) {
          landCount[i] = landCount[i] + 1;
          totalLand = totalLand + 1;
        }
      }
    }
  }

  // C lines 1574-1576: place large continents until target reached
  do {
    placeContinent(0);
  } while (totalLand < landTarget);

  // C line 1577: thunk_FUN_004b32fe() — assign body IDs (we count distinct land bodies)
  // C lines 1578-1583: count non-zero entries in body table
  let continentCount = 0;
  {
    const visited = new Uint8Array(mw * mh);
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const i = y * mw + x;
        if (visited[i] || !landCount[i]) continue;
        continentCount++;
        const stack = [i];
        visited[i] = 1;
        while (stack.length > 0) {
          const ci = stack.pop();
          const cy = Math.floor(ci / mw), cx = ci % mw;
          for (let d = 0; d < 8; d++) {
            let nx = cx + DIR8_DX[d];
            const ny = cy + DIR8_DY[d];
            if (ny < 0 || ny >= mh) continue;
            nx = wrapX(nx);
            if (nx < 0 || nx >= mw) continue;
            const sn = snap(nx, ny);
            const ni = ny * mw + sn;
            if (visited[ni] || !landCount[ni]) continue;
            visited[ni] = 1;
            stack.push(ni);
          }
        }
      }
    }
  }

  // C lines 1584-1588: fill remaining body slots with islands
  // local_24 = 0x40 - (continentCount + 1)
  const local_24 = 64 - (continentCount + 1);
  if (local_24 > 0) {
    for (let i = 0; i < local_24; i++) {
      placeContinent(1);
    }
  }

  // ── Phase 3: Bridge fill (C lines 1590-1633) ──
  // Connect diagonal gaps in land placement.
  // Outer loop: local_354 = 1 to mh-3
  // Inner loop: local_5c = (local_354 & 1) to mw-3 step 2
  {
    let local_354 = 1;
    while (local_354 < mh - 2) {
      let local_5c = local_354 & 1;
      while (local_5c < mw - 2) {
        // C lines 1592-1608: build mask from byte[1] of 4 tiles
        let local_38 = 0;
        // C line 1593-1596: tile (local_5c, local_354)
        if (landCount[idx(local_5c, local_354)] !== 0) local_38 |= 1;
        // C line 1597-1600: tile (local_5c+1, local_354+1)
        if (landCount[idx(local_5c + 1, local_354 + 1)] !== 0) local_38 |= 2;
        // C line 1601-1604: tile (local_5c+1, local_354-1)
        if (landCount[idx(local_5c + 1, local_354 - 1)] !== 0) local_38 |= 4;
        // C line 1605-1608: tile (local_5c+2, local_354)
        if (landCount[idx(local_5c + 2, local_354)] !== 0) local_38 |= 8;

        // C lines 1609-1631: if mask is 6 or 9, fill 3 tiles and cascade
        if (local_38 === 6 || local_38 === 9) {
          landCount[idx(local_5c + 1, local_354 + 1)] = 1;
          landCount[idx(local_5c + 1, local_354 - 1)] = 1;
          landCount[idx(local_5c + 2, local_354)] = 1;

          // C lines 1616-1630: cascade — back up loop variables
          if (local_5c < 2 || local_354 < 2) {
            if (local_354 < 2) {
              if (local_5c > 1) {
                local_5c = local_5c - 2;
              }
            } else {
              local_354 = local_354 - 1;
              local_5c = local_5c + 1;
            }
          } else {
            local_5c = local_5c - 1;
            local_354 = local_354 - 1;
          }
        }
        local_5c = local_5c + 2;
      }
      local_354 = local_354 + 1;
    }
  }

  // ── Phase 4: Latitude-based terrain assignment (C lines 1634-1721) ──
  // C lines 1635-1643: bandWidth (local_4c)
  let local_4c;
  if (!isFlat) {
    // C line 1636: local_4c = (int)DAT_006d1162 / 0xc
    local_4c = (mh / 12) | 0;
  } else {
    // C line 1639: signed division mh/8
    local_4c = (mh / 8) | 0;
  }
  // C lines 1641-1643: clamp >= 2 (note: condition is "< 3" → set to 2)
  if (local_4c < 3) {
    local_4c = 2;
  }

  // C lines 1644-1721: linear tile walk
  // local_50 = base tile pointer; advances by 6 each iteration
  // local_354 = row (starts 0); local_5c = column (starts 0)
  {
    let local_354 = 0;
    let local_5c = 0;
    for (let local_30 = 0; local_30 < totalTiles; local_30++) {
      const i = local_354 * mw + local_5c;
      const local_35c = landCount[i];  // byte[1] cast to uint
      let local_38;  // result terrain code

      if (local_35c === 0) {
        // C line 1650: ocean
        local_38 = 10;
      } else if (local_35c === 1) {
        // C lines 1652-1706: latitude band
        // C line 1653: local_58 = DAT_00624ef0 * -3
        let local_58 = temperature * -3;
        // C lines 1654-1656: flat overrides
        if (isFlat) {
          local_58 = temperature * -6;
        }
        // C line 1657: iVar7 = (mh >> 1) + 8
        const iVar7 = (mh >> 1) + 8;
        // C lines 1658-1660: jitter1
        // iVar4 = local_354 + (abs(rand()) & 0xf) + 1
        const jitter1 = rng.next() & 0xF;
        const iVar4_first = local_354 + jitter1 + 1;
        let local_28;
        // C line 1661: if (iVar7 == iVar4 || iVar7 - iVar4 < 0)
        if (iVar7 === iVar4_first || (iVar7 - iVar4_first) < 0) {
          // C lines 1662-1666: south side — second rand, negate distance
          // ~x + 1 = -x in 2's complement
          const jitter2 = rng.next() & 0xF;
          local_28 = -(((mh >> 1) + 8) - (local_354 + jitter2 + 1));
        } else {
          // C lines 1669-1673: north side — second rand
          const jitter2 = rng.next() & 0xF;
          local_28 = ((mh >> 1) + 8) - (local_354 + jitter2 + 1);
        }
        // C line 1675: local_28 += local_58 (temp offset)
        local_28 = local_28 + local_58;
        // C lines 1676-1678: clamp to >= 0
        if (local_28 < 1) {
          local_28 = 0;
        }
        // C line 1679: divide by bandWidth
        local_28 = (local_28 / local_4c) | 0;

        // C lines 1680-1705: switch on band
        switch (local_28) {
          case 0:
            local_38 = 0;  // desert
            break;
          case 1:
          case 2:
          case 3:
            local_38 = 1;  // plains
            break;
          case 4: {
            // C lines 1690-1697: rand & 1: plains or tundra
            const r = rng.next() & 1;
            if (r === 0) {
              local_38 = 1;  // plains
            } else {
              local_38 = 6;  // tundra
            }
            break;
          }
          case 5:
          case 6:
            local_38 = 6;  // tundra
            break;
          default:
            local_38 = 7;  // glacier
            break;
        }
      } else if (local_35c === 2) {
        // C line 1708: hills
        local_38 = 4;
      } else {
        // C line 1711: mountains (local_35c >= 3)
        local_38 = 5;
      }

      // C line 1713: *local_50 = (byte)local_38
      terrain[i] = local_38;

      // C lines 1714-1719: advance pointers
      local_5c = local_5c + 2;
      if (mw <= local_5c) {
        local_354 = local_354 + 1;
        local_5c = local_354 & 1;
      }
    }
  }

  // ── Phase 5: Elevation/moisture pass (C lines 1722-1840) ──
  // Two interleaved row passes:
  //   local_50: walks tile array forward (W→E within each row)
  //   local_34: walks tile array backward from last tile (E→W within each row)
  // Both share the outer loop on local_354 (0 to mh-1).
  // The W→E pointer processes row local_354. The E→W pointer walks backward
  // from the last tile of the array, processing row (mh - 1 - local_354).
  // local_28 is computed from local_354 and reused by both passes (symmetric).
  {
    for (let local_354 = 0; local_354 < mh; local_354++) {
      const curY_we = local_354;
      const curY_ew = mh - 1 - local_354;
      // C lines 1725-1730: local_28 = abs((mh >> 1) - local_354)
      let local_28;
      const halfMh = mh >> 1;
      if (halfMh === local_354 || (halfMh - local_354) < 0) {
        local_28 = ~(halfMh - local_354) + 1;
      } else {
        local_28 = halfMh - local_354;
      }
      // C lines 1731-1736: local_3ac = abs((mh >> 2) - local_28)
      let local_3ac;
      const quartMh = mh >> 2;
      if (quartMh === local_28 || (quartMh - local_28) < 0) {
        local_3ac = ~(quartMh - local_28) + 1;
      } else {
        local_3ac = quartMh - local_28;
      }
      // C lines 1737-1749: local_54 init
      let local_54;
      if ((climate * 4 + 4 + local_3ac) < 1) {
        local_54 = 0;
      } else {
        // C lines 1741-1746: local_3b0 = abs((mh >> 2) - local_28) (same as local_3ac)
        let local_3b0;
        if (quartMh === local_28 || (quartMh - local_28) < 0) {
          local_3b0 = ~(quartMh - local_28) + 1;
        } else {
          local_3b0 = quartMh - local_28;
        }
        // C lines 1747-1748: local_54 = rand() % (climate*4 + local_3b0 + 5)
        local_54 = rng.next() % (climate * 4 + local_3b0 + 5);
      }

      // ── W→E pass for current row (curY_we) ──
      // C lines 1750-1787: walks valid x positions in row curY_we left to right
      // C uses local_5c = (local_354 & 1), step 2, condition < mw — this gives mw/2
      // valid-parity column positions in the row.
      for (let local_5c = (curY_we & 1); local_5c < mw; local_5c = local_5c + 2) {
        const wi = curY_we * mw + local_5c;
        const bVar1 = terrain[wi];
        if (bVar1 === 10) {
          // Ocean: ramp up local_54 toward elevCap
          // C lines 1754-1759: local_3b4 = abs((mh >> 2) - local_28) (same as local_3ac)
          let local_3b4;
          if (quartMh === local_28 || (quartMh - local_28) < 0) {
            local_3b4 = ~(quartMh - local_28) + 1;
          } else {
            local_3b4 = quartMh - local_28;
          }
          // C lines 1760-1762: cap check
          if (local_54 < (climate * 4 + 4 + local_3b4)) {
            local_54 = local_54 + 1;
          }
        } else if (local_54 > 0) {
          // C lines 1764-1768: dry tile — drop elevation
          if (climate * -2 !== -6 && (climate * -2 + 6) >= 0) {
            const r = rng.next();
            local_54 = local_54 - r % (climate * -2 + 7);
          }
          // C lines 1769-1784: terrain promotion
          switch (bVar1) {
            case 0: terrain[wi] = 1; break;        // desert → plains
            case 1: terrain[wi] = 2; break;        // plains → grassland
            case 4: terrain[wi] = 3; break;        // hills → forest
            case 5: local_54 = local_54 - 3; break; // mountains: rain shadow
            case 6: terrain[wi] = 3; break;        // tundra → forest
          }
        }
        // C line 1786: local_50 += 6 (advance pointer)
      }

      // C line 1788: reset local_54 for E→W
      local_54 = 0;

      // ── E→W pass for current row (curY_ew = mh-1-local_354) ──
      // C lines 1789-1838: walks valid x positions in row curY_ew right to left
      // C uses local_5c = mw - ((local_354 & 1) + 1), step -2.
      // We compute the actual rightmost valid x for row curY_ew.
      for (let local_5c = mw - 2 + (curY_ew & 1);
           local_5c >= 0;
           local_5c = local_5c - 2) {
        const ei = curY_ew * mw + local_5c;
        const bVar1 = terrain[ei];
        if (bVar1 === 10) {
          // C lines 1793-1795: ocean elevation cap
          if (local_54 < ((local_28 >> 1) + climate + 1)) {
            local_54 = local_54 + 1;
          }
        } else if (local_54 > 0) {
          // C lines 1797-1802: drop
          const iVar4_check = -(climate * 2 + 2);
          if (iVar4_check !== -6 && (iVar4_check + 6) >= 0) {
            const r = rng.next();
            local_54 = local_54 - r % (7 - (climate * 2 + 2));
          }
          // C lines 1803-1835: terrain promotion
          switch (bVar1) {
            case 0: terrain[ei] = 1; break;  // desert → plains
            case 1: terrain[ei] = 2; break;  // plains → grassland
            case 2: {
              // grassland → jungle/swamp/forest based on latitude
              if (local_28 < (((mh * 3) / 10) | 0)) {
                if (local_28 < 10) {
                  terrain[ei] = 9;  // jungle
                } else {
                  terrain[ei] = 8;  // swamp
                }
              } else {
                terrain[ei] = 3;  // forest
              }
              local_54 = local_54 - 2;
              break;
            }
            case 4: terrain[ei] = 3; break;        // hills → forest
            case 5: local_54 = local_54 - 3; break; // mountains
            case 6: terrain[ei] = 1; break;        // tundra → plains
            case 8: terrain[ei] = 3; break;        // swamp → forest
          }
        }
        // C line 1837: local_34 -= 6 (walk backward)
      }
    }
  }

  // ── Phase 6: Elevation iterations (C lines 1841-1912) ──
  // (DAT_00624ef8 * 5 + 10) * 0xa0
  const elevIterCount = (ageVal * 5 + 10) * 0xa0;
  {
    let local_5c = 0;
    let local_354 = 0;
    for (let local_48 = 0; local_48 < elevIterCount; local_48++) {
      // C lines 1842-1858: even iterations pick a new random position
      if ((local_48 & 1) === 0) {
        // C lines 1843-1849: local_354 = rand() % mh
        if (mh === 1 || (mh - 1) < 0) {
          local_354 = 0;
        } else {
          local_354 = rng.next() % mh;
        }
        // C lines 1850-1856: local_3b8 = rand() % (mw/2)
        let local_3b8;
        if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
          local_3b8 = 0;
        } else {
          local_3b8 = rng.next() % (mw / 2 | 0);
        }
        // C line 1857: local_5c = (local_354 & 1) + local_3b8 * 2
        local_5c = (local_354 & 1) + local_3b8 * 2;
      } else {
        // C lines 1860-1864: random 8-direction step
        // iVar4 = abs(rand()) & 7
        const d = rng.next() & 7;
        local_5c = wrapX(DIR8_DX[d] + local_5c);
        local_354 = local_354 + DIR8_DY[d];
      }

      // C lines 1866-1871: local_28 = abs((mh >> 1) - local_354)
      let local_28;
      const halfMh = mh >> 1;
      if (halfMh === local_354 || (halfMh - local_354) < 0) {
        local_28 = ~(halfMh - local_354) + 1;
      } else {
        local_28 = halfMh - local_354;
      }

      // C line 1872: bounds check
      if (!inBounds(local_5c, local_354)) continue;

      // C lines 1874-1910: terrain promotion
      const ti = idx(local_5c, local_354);
      const cur = terrain[ti];
      switch (cur) {
        case 0: terrain[ti] = 1; break;  // desert → plains
        case 1: terrain[ti] = 4; break;  // plains → hills
        case 2: terrain[ti] = 3; break;  // grassland → forest
        case 3: {
          // C lines 1885-1891: forest → jungle (tropical) or plains
          if (local_28 < (((mh * 3) / 10) | 0)) {
            terrain[ti] = 9;  // jungle
          } else {
            terrain[ti] = 1;  // plains
          }
          break;
        }
        case 4: terrain[ti] = 5; break;  // hills → mountains
        case 5: {
          // C line 1897: FUN_0040ab41(x, y) — inland lake
          // Inline FUN_0040ab41 (C lines 2426-2470):
          if (inBounds(local_5c, local_354) &&
              local_5c >= 2 && local_354 >= 2 &&
              local_5c < mw - 2 && local_354 < mh - 2) {
            if (!isOcean(local_5c - 2, local_354) &&
                !isOcean(local_5c + 2, local_354) &&
                !isOcean(local_5c, local_354 - 2) &&
                !isOcean(local_5c, local_354 + 2)) {
              // All 4 cardinal neighbors non-ocean → convert to ocean
              terrain[ti] = 10;
            }
          }
          break;
        }
        case 6: terrain[ti] = 4; break;  // tundra → hills
        case 7: terrain[ti] = 5; break;  // glacier → mountains
        case 8: terrain[ti] = 2; break;  // swamp → grassland
        case 9: terrain[ti] = 8; break;  // jungle → swamp
      }
    }
  }

  // ── Phase 7: Smoothing pass (neighbor voting, C lines 1914-2004) ──
  const smoothIterCount = (3 - (ageVal + 2)) * 800;
  {
    let local_5c = 0;
    let local_354 = 0;
    let local_390 = -1;  // 0xffffffff = -1 signed
    // local_388 = vote array of 11 ints
    const local_388 = new Int32Array(11);

    for (let local_48 = 0; local_48 < smoothIterCount; local_48++) {
      // C lines 1915-1932: even iterations pick a new random position
      if ((local_48 & 1) === 0) {
        if (mh === 1 || (mh - 1) < 0) {
          local_354 = 0;
        } else {
          local_354 = rng.next() % mh;
        }
        let local_3bc;
        if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
          local_3bc = 0;
        } else {
          local_3bc = rng.next() % (mw / 2 | 0);
        }
        local_5c = (local_354 & 1) + local_3bc * 2;
        local_390 = -1;  // 0xffffffff
      } else {
        // C lines 1934-1938: random step
        const d = rng.next() & 7;
        local_5c = wrapX(DIR8_DX[d] + local_5c);
        local_354 = local_354 + DIR8_DY[d];
      }

      // C line 1940: bounds check
      if (!inBounds(local_5c, local_354)) continue;
      // C line 1941: not ocean
      if (isOcean(local_5c, local_354)) continue;

      // C line 1942-1943: get terrain type
      const tType = getTerType(local_5c, local_354);
      let local_40 = tType;

      // C line 1944: skip if same terrain as last
      if (local_390 >= 0 && local_390 === local_40) continue;

      // C line 1945: local_2c = (terrain > 2)
      const local_2c = (local_40 > 2) ? 1 : 0;

      // C lines 1947-1949: clear vote array
      for (let k = 0; k < 11; k++) local_388[k] = 0;

      // C lines 1950-1975: apply climate/temperature bias
      if (climate === -1) {
        local_388[0] = local_388[0] + 1;
        local_388[1] = local_388[1] + 1;
        local_388[8] = local_388[8] - 1;
      } else if (climate === 1) {
        local_388[2] = local_388[2] + 1;
        local_388[8] = local_388[8] + 1;
        if (temperature >= 0) {
          local_388[9] = local_388[9] + 1;
        }
      }
      if (temperature === -1) {
        local_388[6] = local_388[6] + 1;
        local_388[3] = local_388[3] + 1;
        local_388[0] = local_388[0] - 1;
      } else if (temperature === 1) {
        local_388[1] = local_388[1] + 1;
        local_388[6] = local_388[6] - 1;
        local_388[7] = local_388[7] - 1;
        if (climate === -1) {
          local_388[2] = local_388[2] - 1;
          local_388[9] = local_388[9] - 1;
        }
      }

      // C lines 1976-1993: count neighbor votes
      for (let local_30 = 0; local_30 < 8; local_30++) {
        const nx = wrapX(DIR8_DX[local_30] + local_5c);
        const ny = DIR8_DY[local_30] + local_354;
        if (!inBounds(nx, ny)) continue;
        const nType = getTerType(nx, ny);
        if (nType === 10) continue;
        // C line 1984: bonus for above-forest neighbor when isAboveForest
        if (nType > 2 && local_2c !== 0 && local_388[nType] !== 0) {
          local_388[nType] = local_388[nType] + 1;
        }
        // C line 1987: even DIR8 indices (diagonals) get extra weight
        if ((local_30 & 1) === 0) {
          local_388[nType] = local_388[nType] + 1;
        }
        local_388[nType] = local_388[nType] + 1;
      }

      // C lines 1994-2001: pick best terrain
      let local_1c = 0;
      const ti = idx(local_5c, local_354);
      for (let k = 0; k < 11; k++) {
        if (local_1c < local_388[k]) {
          local_1c = local_388[k];
          terrain[ti] = k;
          local_390 = k;
        }
      }
    }
  }

  // ── Phase 8: River generation (FUN_0040ac5a, C lines 2480-2625) ──
  // Use scratch array (byte[5]) as snapshot for rollback
  {
    let local_34 = 0;  // rivers placed
    let local_30 = 0;  // attempts

    do {
      // C line 2507: thunk_FUN_00408903(byte[5], byte[0]) — copy terrain into scratch
      for (let i = 0; i < mw * mh; i++) scratch[i] = terrain[i];

      local_30 = local_30 + 1;
      let local_2c = 0;  // river length

      // C lines 2510-2533: find starting tile (not mountain, not ocean)
      let local_20, local_28, iVar5, uVar4;
      let bVar1;
      do {
        // C lines 2511-2517: y = rand() % mh
        if (mh === 1 || (mh - 1) < 0) {
          local_28 = 0;
        } else {
          local_28 = rng.next() % mh;
        }
        uVar4 = local_28;
        // C lines 2519-2525: x = (rand() % (mw/2)) * 2
        let local_44;
        if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
          local_44 = 0;
        } else {
          local_44 = rng.next() % (mw / 2 | 0);
        }
        local_20 = local_44 * 2;
        // C lines 2527-2529: parity adjustment
        if ((local_28 & 1) !== 0) {
          local_20 = local_20 + 1;
        }
        iVar5 = local_20;
        bVar1 = terrain[local_28 * mw + local_20];
      } while (bVar1 === 5 || bVar1 === 10);

      // C lines 2534-2536: initial direction = abs(rand()) & 3
      let local_3c = rng.next() & 3;

      // C lines 2537-2599: river carving loop
      let bVar3 = false;  // reached water
      do {
        // C lines 2538-2573: terrain promotion for current river tile
        switch (bVar1) {
          case 0: {
            // desert
            bVar1 = 1;
            const r = rng.next();
            if ((r % 10) > 1 || local_2c > 3) {
              bVar1 = 2;
            }
            break;
          }
          case 1: {
            // plains
            const r = rng.next();
            if ((r % 10) > 3) {
              bVar1 = 2;
            }
            break;
          }
          case 3: {
            // forest
            const r = rng.next();
            if ((r % 10) > 2) {
              bVar1 = 2;
            }
            break;
          }
          case 4:  // hills
          case 5:  // mountains
            bVar1 = 2;
            break;
          case 6:  // tundra
            bVar1 = 1;
            break;
          case 7:  // glacier
            bVar1 = 6;
            break;
          case 8: {
            // swamp
            const r = rng.next();
            if ((r % 10) > 3) {
              bVar1 = 9;
            }
            break;
          }
        }
        // C line 2574: bVar1 |= 0x80 (river flag)
        bVar1 = bVar1 | 0x80;
        // C lines 2575-2576: write back
        terrain[local_28 * mw + local_20] = bVar1;
        local_2c = local_2c + 1;

        // C lines 2578-2586: check if any diagonal neighbor is ocean
        bVar3 = false;
        for (let local_14 = 0; local_14 < 4 && !bVar3; local_14++) {
          const ux = wrapX(RIVER_DX[local_14] + local_20);
          const cy = RIVER_DY[local_14];
          if (inBounds(ux, cy + local_28) && isOcean(ux, cy + local_28)) {
            bVar3 = true;
          }
        }

        // C lines 2587-2590: drift direction
        // local_3c = (local_3c + (rand & 1) - (local_2c & 1)) & 3
        const r = rng.next() & 1;
        local_3c = ((local_3c + r) - (local_2c & 1)) & 3;

        // C lines 2591-2592: move to next tile
        local_20 = wrapX(RIVER_DX[local_3c] + local_20);
        local_28 = local_28 + RIVER_DY[local_3c];

        // C lines 2593-2597: check next tile bounds and read scratch byte[5]
        if (inBounds(local_20, local_28)) {
          // Read byte[5] (snapshot) at next tile
          // In our case, we use scratch which is the snapshot
          bVar1 = scratch[local_28 * mw + snap(local_20, local_28)];
        }
        // C line 2598-2599: continue while not water, in bounds, and snapshot doesn't have river bit
      } while (!bVar3 && inBounds(local_20, local_28) && (bVar1 & 0x80) === 0);

      // C lines 2600-2619: accept or rollback
      // accept if reached water OR snapshot has river bit, AND length >= 5 - attempt/800
      if ((bVar3 || (bVar1 & 0x80) !== 0) && (5 - ((local_30 / 800) | 0)) <= local_2c) {
        local_34 = local_34 + 1;
        // C lines 2602-2618: scan city radius (the inner loop in C does some
        // scoring work and calls _rand() but doesn't appear to do anything
        // observable — just consumes RNG state)
        for (let local_14 = 0; local_14 < 0x14; local_14++) {
          // CITY_RADIUS_DOUBLED-style offsets at DAT_00628370/DAT_006283a0
          // We don't have the table values handy here. The C accesses them but
          // only ends up calling _rand() conditionally. We'll skip to maintain
          // simplicity — the side effect is RNG state divergence but no terrain change.
          // For exact fidelity, we'd need DAT_00628370/DAT_006283a0 contents.
          // The C body is:
          //   if (inBounds(ux, uy)) {
          //     local_c = abs((mh>>1) - uy);
          //     pbVar6 = tile(ux, uy);
          //     if ((*pbVar6 & 0xf) == 3 && local_c < (mh * 3) / 10) {
          //       _rand();  // discard
          //     }
          //   }
          // We'd need the radius offset tables to mimic this exactly.
        }
      } else {
        // C line 2621: rollback — copy scratch back into terrain
        for (let i = 0; i < mw * mh; i++) terrain[i] = scratch[i];
      }
    } while (local_30 < 0x400 && local_34 < (landSize * 2 + climate * 2 + 0xc));
  }

  // ── Phase 9: Polar caps (C lines 2009-2022) ──
  // First pole pass: only if NOT flat
  if (!isFlat) {
    // C lines 2010-2021: north and south coast pre-glaciation
    for (let local_5c = 0; local_5c < mw; local_5c = local_5c + 2) {
      // C line 2011: if not ocean at (x+1, 1)
      if (!isOcean(local_5c + 1, 1)) {
        // C lines 2013-2014: set tile (x, 0) to glacier
        const i = 0 * mw + snap(local_5c, 0);
        terrain[i] = 7;
      }
      // C line 2016: if not ocean at (x, mh-2)
      if (!isOcean(local_5c, mh - 2)) {
        // C lines 2018-2019: set tile (x+1, mh-1) to glacier
        const i = (mh - 1) * mw + snap(local_5c + 1, mh - 1);
        terrain[i] = 7;
      }
    }
  }

  // C line 2023: thunk_FUN_004b32fe() — body IDs (we'll do this later after tile objects)
  // C line 2024: thunk_FUN_0055a980() — unknown helper
  // C line 2025: thunk_FUN_0040897f() — calculate fertility (done later)

  if (!isFlat) {
    // C lines 2027-2032: hard-set all top/bottom row tiles to glacier
    for (let local_5c = 0; local_5c < mw; local_5c = local_5c + 2) {
      terrain[0 * mw + snap(local_5c, 0)] = 7;
      terrain[(mh - 1) * mw + snap(local_5c + 1, mh - 1)] = 7;
    }
    // C lines 2033-2071: tundra scatter (only if param_1 == 0, i.e., new map)
    for (let local_48 = 0; local_48 < (mw >> 3); local_48++) {
      // C lines 2035-2041: rand x for north row 0
      let local_3d4;
      if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
        local_3d4 = 0;
      } else {
        local_3d4 = rng.next() % (mw / 2 | 0);
      }
      terrain[0 * mw + snap(local_3d4 * 2, 0)] = 6;

      // C lines 2044-2052: rand x for north row 1
      let local_3dc;
      if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
        local_3dc = 0;
      } else {
        local_3dc = rng.next() % (mw / 2 | 0);
      }
      terrain[1 * mw + snap(local_3dc * 2 + 1, 1)] = 6;

      // C lines 2053-2061: rand x for south row mh-1
      let local_3e4;
      if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
        local_3e4 = 0;
      } else {
        local_3e4 = rng.next() % (mw / 2 | 0);
      }
      terrain[(mh - 1) * mw + snap(local_3e4 * 2 + 1, mh - 1)] = 6;

      // C lines 2062-2070: rand x for south row mh-2
      let local_3ec;
      if ((mw / 2 | 0) === 1 || ((mw / 2 | 0) - 1) < 0) {
        local_3ec = 0;
      } else {
        local_3ec = rng.next() % (mw / 2 | 0);
      }
      terrain[(mh - 2) * mw + snap(local_3ec * 2, mh - 2)] = 6;
    }
  }

  // C line 2074: thunk_FUN_00408830(byte[1], 0) — clear all byte[1] (we don't need to)

  // ── Ocean resource suppression (C lines 2075-2102) ──
  // C: if (DAT_00628060 == 0) — apply suppression
  // For ocean tiles with goody hut formula match, if no ocean within city radius,
  // set bit 0x40 on byte[0]. We track resourceSuppressed in tileData later.
  // For now, defer this to placeResources.

  // ── Finalize terrain: strip river high bits, build tile objects ──
  const tileData = new Array(mw * mh);
  for (let i = 0; i < mw * mh; i++) {
    const hasRiver = !!(terrain[i] & 0x80);
    const ter = terrain[i] & 0x0F;
    tileData[i] = {
      terrain: ter > 10 ? T_OCEAN : ter,
      river: hasRiver && (ter !== T_OCEAN),
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

  // ── Mirror valid tiles to padding positions (needed for doubled-X helpers) ──
  // The helpers (assignBodyIds, etc.) iterate all mw*mh positions expecting data.
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = (x & ~1) | (y & 1);
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  // ── Phase 10: Body ID assignment (flood fill) — doubled-X ──
  assignBodyIds(tileData, mw, mh, wraps);

  // ── Phase 10b: Lake classification — doubled-X ──
  classifyLakes(tileData, mw, mh, wraps);

  // ── Phase 11: Fertility calculation — doubled-X ──
  calculateFertility(tileData, mw, mh, wraps);

  // ── Phase 12: Pseudo-random resource placement — doubled-X ──
  placeResources(tileData, mw, mh, mapSeed);

  // ── Goody huts — doubled-X ──
  placeGoodyHuts(tileData, mw, mh, rng, mapSeed);

  // ── Compress from doubled-X to compact coordinate system ──
  // The binary stores tiles at doubled-X positions (mw=100 means 50 actual tiles
  // per row, with tiles at even x on even rows and odd x on odd rows).
  // The parser and renderer use COMPACT coordinates where mw is the number of
  // unique tiles per row (halved from the binary's stored width).
  // See parser.js:515 — `const mw = mw2 >> 1`.
  // Compress: for each row, pick only the valid-parity tiles and repack into
  // a compact array where consecutive indices are adjacent tiles.
  const mwCompact = mw >> 1;
  const compactTileData = new Array(mwCompact * mh);
  for (let y = 0; y < mh; y++) {
    for (let cx = 0; cx < mwCompact; cx++) {
      const oldX = cx * 2 + (y & 1);  // valid parity x in doubled-X
      compactTileData[y * mwCompact + cx] = tileData[y * mw + oldX];
    }
  }

  return { mw: mwCompact, mh, mapShape, mapSeed, tileData: compactTileData };
}

/**
 * Flood-fill body IDs. Each contiguous land mass gets a unique ID (1-62).
 * Ocean bodies get ID 0. (Internal, called during generateMap.)
 */
function assignBodyIds(tileData, mw, mh, wraps) {
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === T_OCEAN) {
        visited[i] = 1;
        tileData[i].bodyId = 0;
        continue;
      }
      // BFS flood fill
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
          if (visited[ni]) continue;
          if (tileData[ni].terrain === T_OCEAN) continue;
          visited[ni] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
}

/**
 * Classify ocean bodies as ocean or lake based on tile count.
 * Lakes: contiguous ocean bodies with fewer than 20 tiles.
 * Sets tile.isLake = true on lake tiles for downstream use.
 *
 * @param {object[]} tileData - tile array
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {boolean} wraps - X wraparound
 */
function classifyLakes(tileData, mw, mh, wraps) {
  const LAKE_THRESHOLD = 20;
  const visited = new Uint8Array(mw * mh);

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain !== T_OCEAN) { visited[i] = 1; continue; }

      // BFS flood fill for this ocean body
      const body = [i];
      const queue = [x, y]; // flat pairs for speed
      visited[i] = 1;

      while (queue.length > 0) {
        const cy = queue.pop();
        const cx = queue.pop();

        for (let d = 0; d < 8; d++) {
          let nx = cx + DIR8_DX[d];
          const ny = cy + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (visited[ni]) continue;
          if (tileData[ni].terrain !== T_OCEAN) { visited[ni] = 1; continue; }
          visited[ni] = 1;
          body.push(ni);
          queue.push(nx, ny);
        }
      }

      // Classify: bodies with fewer than LAKE_THRESHOLD tiles are lakes
      const isLake = body.length < LAKE_THRESHOLD;
      for (const ti of body) {
        tileData[ti].isLake = isLake;
      }
    }
  }
}

/**
 * Assign continent/ocean body IDs via flood fill on a mapBase accessor object.
 * Ported from FUN_004b32fe (continent_assign_body_ids).
 *
 * Two passes: land first (IDs 1-62), then ocean (IDs starting at 64+).
 * Small land bodies (<9 tiles) are merged into body 63 (overflow bucket).
 * Small ocean bodies (<16 tiles) are merged similarly.
 * Body IDs are stored in tileData[i].bodyId.
 *
 * Also computes continent tile counts:
 *   mapBase.landBodyCounts[bodyId] = number of tiles in that land body
 *   mapBase.seaBodyCounts[bodyId]  = number of tiles in that sea body
 *
 * @param {object} mapBase - accessor object from createAccessors()
 */
export function assignContinentBodyIds(mapBase) {
  const { mw, mh, tileData, wraps } = mapBase;
  const totalTiles = mw * mh;

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  // Compact-coordinate 8-direction neighbors (matches state.js getNeighbors)
  // For each row parity, the 8 neighbors are at different (dx, dy) offsets.
  // Even rows: N(0,-2), NE(0,-1), E(1,0), SE(0,1), S(0,2), SW(-1,1), W(-1,0), NW(-1,-1)
  // Odd rows:  N(0,-2), NE(1,-1), E(1,0), SE(1,1),  S(0,2), SW(0,1),  W(-1,0), NW(0,-1)
  const NEIGH_EVEN_DX = [0,  0,  1, 0, 0, -1, -1, -1];
  const NEIGH_EVEN_DY = [-2,-1,  0, 1, 2,  1,  0, -1];
  const NEIGH_ODD_DX  = [0,  1,  1, 1, 0,  0, -1,  0];
  const NEIGH_ODD_DY  = [-2,-1,  0, 1, 2,  1,  0, -1];

  // Clear all body IDs
  for (let i = 0; i < totalTiles; i++) tileData[i].bodyId = 0;

  const landBodyCounts = new Int32Array(64);
  const seaBodyCounts = new Int32Array(64);

  // Two passes: pass=1 (land), pass=0 (ocean)
  for (let pass = 1; pass >= 0; pass--) {
    const visited = new Uint8Array(totalTiles);
    const bodySizes = new Map(); // bodyId → tile count
    const tileBody = new Uint16Array(totalTiles); // per-tile body assignment for this pass
    let nextBodyId = 1;

    // BFS flood fill over compact coordinates
    for (let y = 0; y < mh; y++) {
      for (let x = 0; x < mw; x++) {
        const i = y * mw + x;
        if (visited[i]) continue;
        const tileIsOcean = tileData[i].terrain === 10;
        const isTargetType = pass === 1 ? !tileIsOcean : tileIsOcean;
        if (!isTargetType) { visited[i] = 1; continue; }

        // Start new body
        const bodyId = nextBodyId++;
        let count = 0;
        const queue = [x, y]; // flat pairs
        visited[i] = 1;

        while (queue.length > 0) {
          const cy = queue.pop();
          const cx = queue.pop();
          const ci = cy * mw + cx;
          tileBody[ci] = bodyId;
          count++;

          const DX = (cy & 1) ? NEIGH_ODD_DX : NEIGH_EVEN_DX;
          const DY = (cy & 1) ? NEIGH_ODD_DY : NEIGH_EVEN_DY;

          for (let d = 0; d < 8; d++) {
            let nx = cx + DX[d];
            const ny = cy + DY[d];
            if (ny < 0 || ny >= mh) continue;
            nx = wrapX(nx);
            if (nx < 0 || nx >= mw) continue;
            const ni = ny * mw + nx;
            if (visited[ni]) continue;
            const nIsOcean = tileData[ni].terrain === 10;
            const nIsTarget = pass === 1 ? !nIsOcean : nIsOcean;
            if (!nIsTarget) { visited[ni] = 1; continue; }
            visited[ni] = 1;
            queue.push(nx, ny);
          }
        }

        bodySizes.set(bodyId, count);
      }
    }

    // Merge small bodies: land < 9 tiles → bucket 63, ocean < 16 tiles → bucket 63
    const minSize = pass === 1 ? 9 : 16;
    const OVERFLOW = 63;
    const mergedBodies = new Set();
    for (const [bid, size] of bodySizes) {
      if (size < minSize) mergedBodies.add(bid);
    }

    // Remap bodies into slots 1-62, overflow into 63
    const remapTable = new Map();
    let nextSlot = 1;
    // First assign non-merged bodies in order of descending size
    const sortedBodies = [...bodySizes.entries()]
      .filter(([bid]) => !mergedBodies.has(bid))
      .sort((a, b) => b[1] - a[1]); // largest first

    for (const [bid] of sortedBodies) {
      if (nextSlot < 63) {
        remapTable.set(bid, nextSlot++);
      } else {
        remapTable.set(bid, OVERFLOW);
      }
    }
    // All merged bodies → overflow
    for (const bid of mergedBodies) {
      remapTable.set(bid, OVERFLOW);
    }

    // Write body IDs into tileData and compute counts
    const counts = pass === 1 ? landBodyCounts : seaBodyCounts;
    for (let i = 0; i < totalTiles; i++) {
      const bid = tileBody[i];
      if (bid === 0) continue;
      const mapped = remapTable.get(bid) || OVERFLOW;
      tileData[i].bodyId = mapped;
      if (mapped < 64) counts[mapped]++;
    }
  }

  // Store counts on mapBase for AI use
  mapBase.landBodyCounts = landBodyCounts;
  mapBase.seaBodyCounts = seaBodyCounts;
}

/**
 * Calculate tile fertility (0-15) based on city radius food/shield potential.
 * From Civ2: score = sum of yields in 21-tile radius. Center ×4, inner ring ×2.
 * Rivers give +2 to center multiplier (+6 total for center with river).
 * fertility = clamp((score - 120) / 8, 1, 15)
 */
function calculateFertility(tileData, mw, mh, wraps) {
  // Base yields per terrain type [food, shields]
  const BASE_YIELD = [
    [0, 1], // Desert
    [1, 1], // Plains
    [2, 0], // Grassland
    [1, 2], // Forest
    [1, 0], // Hills
    [0, 1], // Mountains
    [1, 0], // Tundra
    [0, 0], // Glacier
    [1, 0], // Swamp
    [1, 0], // Jungle
    [1, 0], // Ocean
  ];

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === T_OCEAN) {
        tileData[i].fertility = 0;
        continue;
      }

      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy;
        if (gy < 0 || gy >= mh) continue;
        const gx = wrapX(x + dx);
        if (gx < 0 || gx >= mw) continue;
        const tile = tileData[gy * mw + gx];
        const ter = tile.terrain;
        const [food, shields] = BASE_YIELD[ter] || [0, 0];
        let tileScore = food * 4 + shields * 2; // weighted
        if (tile.river) tileScore += 2;

        // Multiplier: center ×4 (×6 with river), inner ring (0-7) ×2, outer ×1
        if (r === 20) {
          tileScore *= tileData[i].river ? 6 : 4;
        } else if (r < 8) {
          tileScore *= 2;
        }
        score += tileScore;
      }

      tileData[i].fertility = Math.max(1, Math.min(15, Math.floor((score - 120) / 8)));
    }
  }
}

/**
 * Place special resources using the binary's deterministic hash formula.
 * Spec §7.1: FUN_005b8ee1 — resource presence computed from coordinates + seed.
 * Returns 0 (none), 1 (type 1), or 2 (type 2) per tile.
 *
 * @param {object[]} tileData - tile array
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {number} mapSeed - map seed for determinism
 */
function placeResources(tileData, mw, mh, mapSeed) {
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      const t = tileData[i];
      const ter = t.terrain;
      // Spec §7.1: grassland has no special resources, suppressed tiles skip
      if (ter === T_GRASSLAND) { t.hasResource = false; continue; }
      if (t.resourceSuppressed) { t.hasResource = false; continue; }

      // Binary formula (FUN_005b8ee1)
      const u = (y + x) >> 1;
      const v = x - u;
      const posHash = (u & 3) + (v & 3) * 4;
      const seedHash = (((u >> 2) * 11 + (v >> 2) * 13 + mapSeed) & 0xF);

      if (posHash === seedHash) {
        t.hasResource = true;
        // Determine type 1 vs type 2
        const mask = 1 << ((mapSeed >> 4) & 3);
        t.resourceType = ((mask & u) === (mask & v)) ? 2 : 1;
      } else {
        t.hasResource = false;
      }
    }
  }
}

/**
 * Place goody huts on eligible land tiles using the binary's deterministic
 * formula from block 0x0053 (check_tile_goody_hut).
 *
 * Binary formula (faithful to decompiled FUN_00530xxx):
 *   index = (y + x) >> 1
 *   offset = x - index
 *   test = ((index & 3) + (offset & 3) * 4) ==
 *          (((y + x) >> 3) * 0x0B + (offset >> 2) * 0x0D + seed + 8) & 0x1F
 *
 * This produces a sparse, reproducible pattern across the map with ~1/32
 * probability per eligible tile (~3% density).
 *
 * @param {object[]} tileData - tile array
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {object} rng - PRNG instance (unused — placement is deterministic)
 * @param {number} mapSeed - map seed for determinism
 */
function placeGoodyHuts(tileData, mw, mh, rng, mapSeed) {
  // Phase 1: Mark candidates using binary formula
  const candidates = [];
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      const t = tileData[i];
      // Spec §7.3: only ocean is excluded from goody huts (not glacier/mountains)
      if (t.terrain === T_OCEAN) continue;

      // Binary goody hut formula (FUN_005b8ffa)
      const sum = y + x;
      const index = sum >> 1;
      const offset = x - index;
      const lhs = (index & 3) + (offset & 3) * 4;
      const rhs = ((sum >> 3) * 0x0B + (offset >> 2) * 0x0D + mapSeed + 8) & 0x1F;
      if (lhs === rhs) {
        candidates.push({ x, y, i });
      }
    }
  }

  // Phase 2: Filter — enforce minimum spacing (no huts within 3 tiles of each other)
  // This matches the observed Civ2 distribution where huts are noticeably spread out
  const MIN_DIST_SQ = 3 * 3; // minimum 3 tiles apart
  const placed = [];
  for (const c of candidates) {
    let tooClose = false;
    for (const p of placed) {
      const dx = Math.abs(c.x - p.x);
      const dy = Math.abs(c.y - p.y);
      if (dx * dx + dy * dy < MIN_DIST_SQ) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) {
      tileData[c.i].goodyHut = true;
      placed.push(c);
    }
  }
}

/**
 * Check if a specific tile should have a goody hut using the binary formula.
 * Exported for use by runtime systems (e.g., when revealing new tiles).
 *
 * @param {number} x - tile x (gx)
 * @param {number} y - tile y (gy)
 * @param {number} mapSeed - map seed
 * @param {number} terrain - terrain type at tile
 * @returns {boolean} true if this tile should have a goody hut
 */
export function checkTileGoodyHut(x, y, mapSeed, terrain) {
  // Spec §7.3: only ocean is excluded from goody huts
  if (terrain === T_OCEAN) return false;
  const sum = y + x;
  const index = sum >> 1;
  const offset = x - index;
  const lhs = (index & 3) + (offset & 3) * 4;
  const rhs = ((sum >> 3) * 0x0B + (offset >> 2) * 0x0D + mapSeed + 8) & 0x1F;
  return lhs === rhs;
}
