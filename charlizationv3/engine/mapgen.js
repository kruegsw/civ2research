// ═══════════════════════════════════════════════════════════════════
// mapgen.js — Civ2-faithful map generation (shared: server + client)
//
// 9-phase pipeline reverse-engineered from FUN_00408d33:
//   1. PRNG + init
//   2. Continent placement (random walk)
//   3. Latitude-based terrain assignment
//   4. Elevation pass (terrain promotion)
//   5. Smoothing pass (neighbor voting)
//   6. River generation
//   7. Polar caps + tundra scatter
//   8. Body ID assignment (flood fill)
//   9. Fertility calculation
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from './defs.js';

// ── Direction offset tables (from Civ2 DAT_00628350/60) ──
// 8-direction offsets in doubled-X isometric coords
// Index: 0=NE, 1=E, 2=SE, 3=S, 4=SW, 5=W, 6=NW, 7=N
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];

// 4 cardinal directions used by continent walkers: E, S, W, N (2-tile steps)
// DAT_00628351[dir*2]: offset +1 from DAT_00628350, picks every other entry
const CARDINAL_DX = [2, 0, -2, 0]; // E, S, W, N
const CARDINAL_DY = [0, 2, 0, -2];

// 4 diagonal directions used by island walkers: NE, SE, SW, NW (1-tile steps)
// DAT_00628350[dir*2]: even indices of 8-dir table
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
// Climate zone boundary: tiles within (mapHeight × 3) / 10 of equator get jungle/swamp
export const CLIMATE_BOUNDARY_NUMERATOR = 3;
export const CLIMATE_BOUNDARY_DENOMINATOR = 10;
// Continent blob iteration counts (from binary random walk functions)
export const CONTINENT_BLOB_MAX_STEPS = 48;   // placeLandLarge: rng.nextInt(48)
export const ISLAND_BLOB_MAX_STEPS = 63;       // placeLandSmall: rng.next() & 0x3F (0-63)

/**
 * Generate a map faithful to Civ2's algorithm.
 *
 * @param {object} settings
 * @param {number} settings.width      - map width (gx columns), default 50
 * @param {number} settings.height     - map height (rows), default 80
 * @param {number} [settings.seed]     - resource seed (0-65535)
 * @param {number} [settings.mapShape] - 0=cylinder (wrapping), 1=flat
 * @param {number} [settings.landmass] - 0=small, 1=normal, 2=large. Default 1
 * @param {number} [settings.continents] - continent form: <=0=small/islands, >0=large. Default 1
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
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;      // 0=small,1=normal,2=large
  const continents = settings.continents ?? 1;   // <=0=islands, >0=large
  let temperature = settings.temperature ?? 0;   // -1=cool, 0=temperate, 1=warm
  let climate = settings.climate ?? 0;           // -1=arid, 0=normal, 1=wet
  const age = settings.age ?? 1;                 // 0=3B,1=2B,2=1B years

  // Civ2: wrapping maps double temperature and climate
  if (wraps) {
    temperature *= 2;
    climate *= 2;
  }

  // ── Phase 1: Init tile array (all ocean) ──
  const tiles = new Array(mw * mh);      // byte[0]: terrain type (after assignment)
  const landCount = new Uint8Array(mw * mh); // byte[1]: cumulative land counter (persists)
  const landMark = new Uint8Array(mw * mh);  // byte[5]: scratch per-continent (cleared each time)

  for (let i = 0; i < mw * mh; i++) {
    tiles[i] = T_OCEAN;
  }

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    if (wraps) return true;
    return x >= 0 && x < mw;
  }
  // Snap x to valid parity for row y, matching binary's (x & ~1) tile_ptr behavior.
  // Binary stores tiles in a half-packed array where get_tile_ptr always clears the
  // low bit of x. In our full array, the valid entry is at x matching row parity.
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }
  function getTer(x, y) {
    if (!inBounds(x, y)) return T_OCEAN;
    return tiles[idx(x, y)];
  }
  function setTer(x, y, t) {
    if (!inBounds(x, y)) return;
    tiles[idx(x, y)] = t;
  }

  // ── Phase 2: Continent placement ──
  // Placement bounds (from decompiled FUN_00408d33 lines 1555-1567)
  let yMin = 0, yMax = mh - 1;
  const xMin = Math.min(3, Math.floor(mw / 4));
  const xMax = Math.max(xMin, mw - Math.min(3, Math.floor(mw / 4)));

  // 50% chance to shift y-bounds for asymmetry (binary: rand() & 1)
  if (rng.next() & 1) {
    yMax = Math.max(yMin + 1, mh - Math.min(5, Math.floor(mh / 4)));
  } else {
    yMin = Math.min(Math.floor(mh / 4), 4);
    yMax = Math.max(yMin + 1, yMax);
  }

  // Land target formula (line 1572-1573)
  const contParam = Math.max(continents, 0);
  const mapTileCount = Math.floor((mh * mw) / 2 / 400);
  const landTarget = Math.floor(mapTileCount * ((landmass * 8 + 8 + contParam * 8) * 5 + 0x50) * 8 / 10);

  let totalLand = 0; // running counter (incremented even for overlaps, matching Civ2)

  // Bounds check for random walk
  // Binary (FUN_0040a824): wrapping maps check xMin/xMax to create ocean seam;
  // non-wrapping maps don't check x bounds (land can reach edge).
  function checkBounds(x, y) {
    if (y < yMin || y > yMax) return false;
    if (wraps) {
      if (x < xMin || x > xMax) return false;
    } else {
      if (x < 0 || x >= mw) return false; // safety: prevent array out-of-bounds
    }
    return true;
  }

  // Mark single tile in scratch (byte 5)
  // Snap x to valid parity — binary's FUN_0040a8db calls get_tile_ptr which does x & ~1
  function markTile(x, y) {
    x = snap(wrapX(x), y);
    if (!checkBounds(x, y)) return;
    landMark[y * mw + x] = 1;
  }

  // Mark 3-tile triangular blob (FUN_0040a892)
  function mark3Tiles(x, y) {
    markTile(x, y);
    markTile(x + 1, y - 1);
    markTile(x + 1, y + 1);
  }

  // Place_land_small: random walk, 3-tile blobs, max 64 steps, cardinal directions
  function placeLandSmall(sx, sy) {
    let steps = rng.next() & 0x3F; // binary: rand() & 0x3F (0-63)
    if (landCount[idx(sx, sy)]) steps = steps >> 1;
    steps += 1;
    let x = sx, y = sy;
    for (let i = 0; i < steps; i++) {
      if (!checkBounds(x, y)) break;
      mark3Tiles(x, y);
      const d = rng.next() & 3; // binary: (rand() & 3) * 2 into offset table
      x += CARDINAL_DX[d];
      y += CARDINAL_DY[d];
    }
  }

  // Place_land_large: random walk, 3-tile blobs + 25% extra neighbors, max 48 steps
  function placeLandLarge(sx, sy) {
    let steps = rng.nextInt(48); // binary: rand() % 0x30
    if (landCount[idx(sx, sy)]) steps = steps >> 1;
    steps += 1;
    let x = sx, y = sy;
    for (let i = 0; i < steps; i++) {
      if (!checkBounds(x, y)) break;
      mark3Tiles(x, y);
      // 25% chance extra blob in each cardinal direction (binary: rand() & 3 == 0)
      if ((rng.next() & 3) === 0) mark3Tiles(x + 2, y);
      if ((rng.next() & 3) === 0) mark3Tiles(x - 2, y);
      if ((rng.next() & 3) === 0) mark3Tiles(x, y + 2);
      if ((rng.next() & 3) === 0) mark3Tiles(x, y - 2);
      const d = rng.next() & 3; // binary: (rand() & 3) * 2 into offset table
      x += CARDINAL_DX[d];
      y += CARDINAL_DY[d];
    }
  }

  // Place_land_island: random walk, single tiles, max 16 steps, diagonal directions
  function placeLandIsland(sx, sy) {
    let steps = (rng.next() & 0xF) + 1; // binary: (rand() & 0xF) + 1
    let x = sx, y = sy;
    for (let i = 0; i < steps; i++) {
      if (!checkBounds(x, y)) break;
      markTile(x, y);
      const d = rng.next() & 3; // binary: (rand() & 3) * 2 into offset table
      x += DIAG_DX[d];
      y += DIAG_DY[d];
    }
  }

  // Place one continent (FUN_0040a572)
  function placeContinent(mode) {
    // Clear scratch (byte 5)
    landMark.fill(0);

    // Random start position (FUN_0040a572 lines 2162-2190)
    // Key: position check uses landCount (byte[1]), NOT landMark (byte[5])
    let sx, sy;
    let _placeFound = false;
    for (let _pt = 0; _pt < 200; _pt++) {
      sx = rng.nextInt(Math.max(1, mw - xMin * 2)) + xMin;
      sy = rng.nextInt(Math.max(1, mh - 8)) + Math.min(4, Math.floor(mh / 4));
      if (mode === 0 && continents >= 0) {
        if (rng.nextInt(continents + 2) !== 0) { _placeFound = true; break; }
      }
      if (landCount[idx(sx, sy)] === 0) { _placeFound = true; break; }
    }
    if (!_placeFound) return;

    if (mode === 0) {
      if (continents < 1) {
        placeLandSmall(sx, sy);
      } else {
        placeLandLarge(sx, sy);
      }
    } else {
      // Binary uses same random value for both extra-pass checks (integer modulo)
      const r = rng.nextInt(10);
      placeLandIsland(sx, sy);
      if (r > 6) placeLandIsland(sx, sy);  // 30% chance of 2nd pass
      if (r > 8) placeLandIsland(sx, sy);  // 10% chance of 3rd pass
    }

    // Tally: copy scratch (byte[5]) into cumulative counter (byte[1])
    // Overlapping tiles get landCount incremented again — this creates hills/mountains
    // totalLand increments for EVERY marked tile, even overlaps (matching Civ2)
    for (let i = 0; i < mw * mh; i++) {
      if (landMark[i]) {
        landCount[i]++;
        totalLand++;
      }
    }
  }

  // Place large continents until land target reached
  while (totalLand < landTarget) {
    placeContinent(0);
  }

  // Count how many distinct continent bodies were created (from body table, lines 1578-1583)
  // Use a simple heuristic: count connected land regions
  let continentCount = 0;
  {
    const visited = new Uint8Array(mw * mh);
    for (let y = 0; y < mh; y++) {
      for (let x = 0; x < mw; x++) {
        const i = y * mw + x;
        if (visited[i] || !landCount[i]) continue;
        continentCount++;
        // Quick flood fill to mark this body
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
            const ni = ny * mw + nx;
            if (visited[ni] || !landCount[ni]) continue;
            visited[ni] = 1;
            stack.push(ni);
          }
        }
      }
    }
  }

  // Fill remaining body slots with small islands (64 - (continentCount + 1))
  const smallIslandCount = Math.max(0, 64 - (continentCount + 1));
  for (let i = 0; i < smallIslandCount; i++) {
    placeContinent(1);
  }

  // ── Bridge fill: connect diagonal gaps (lines 1590-1633) ──
  // Binary cascades: backs up loop variables after filling, re-examining nearby tiles.
  // This catches new bridge opportunities created by freshly-placed tiles.
  {
    let y = 1;
    while (y < mh - 2) {
      let x = y & 1;
      while (x < mw - 2) {
        let mask = 0;
        if (landCount[idx(x, y)]) mask |= 1;
        if (landCount[idx(x + 1, y + 1)]) mask |= 2;
        if (landCount[idx(x + 1, y - 1)]) mask |= 4;
        if (landCount[idx(x + 2, y)]) mask |= 8;
        if (mask === 6 || mask === 9) {
          landCount[idx(x + 1, y + 1)] = 1;
          landCount[idx(x + 1, y - 1)] = 1;
          landCount[idx(x + 2, y)] = 1;
          // Cascade: back up loop variables (matches binary lines 1616-1630)
          if (x < 2 || y < 2) {
            if (y < 2) {
              if (x > 1) x -= 2;
            } else {
              y -= 1;
              x += 1;
            }
          } else {
            x -= 1;
            y -= 1;
          }
        }
        x += 2;
      }
      y += 1;
    }
  }

  // ── Phase 3: Latitude-based terrain assignment ──
  // Uses landCount (byte[1]) to determine initial terrain:
  //   0 = ocean, 1 = latitude-based, 2 = hills, ≥3 = mountains
  // Binary iterates only valid tiles (mw*mh/2). Must use proper y/x loops
  // to get correct latitude — a flat-index loop causes row to run at 2× speed.
  const bandWidth = wraps ? Math.floor(mh / 8) : Math.floor(mh / 12);
  const bandWidthClamped = Math.max(bandWidth, 2);

  // Binary iterates tiles linearly (not by row), using TWO separate rand() calls
  // for jitter: jitter1 determines sign (which side of equator), jitter2 determines magnitude.
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      const lc = landCount[i];
      if (lc === 0) {
        tiles[i] = T_OCEAN;
      } else if (lc >= 3) {
        tiles[i] = T_MOUNTAINS;
      } else if (lc === 2) {
        tiles[i] = T_HILLS;
      } else {
        const tempOffset = wraps ? temperature * -6 : temperature * -3;
        const halfH = Math.floor(mh / 2) + 8;
        // Binary: two separate rand() calls (lines 1658-1674)
        const jitter1 = (rng.next() & 0xF) + 1;
        const check = y + jitter1;
        const jitter2 = (rng.next() & 0xF) + 1;
        const adjusted = y + jitter2;
        let distFromCenter;
        if (check >= halfH) {
          distFromCenter = adjusted - halfH; // south side
        } else {
          distFromCenter = halfH - adjusted; // north side
        }
        distFromCenter += tempOffset;
        if (distFromCenter < 1) distFromCenter = 0;
        const band = Math.floor(distFromCenter / bandWidthClamped);

        switch (band) {
          case 0: tiles[i] = T_DESERT; break;
          case 1: case 2: case 3: tiles[i] = T_PLAINS; break;
          case 4: tiles[i] = (rng.next() & 1) === 0 ? T_PLAINS : T_TUNDRA; break;
          case 5: case 6: tiles[i] = T_TUNDRA; break;
          default: tiles[i] = T_GLACIER; break;
        }
      }
    }
  }

  // ── Elevation/moisture pass (lines 1722-1839) ──
  // Binary interleaves both passes in one outer loop: at iteration y,
  // W→E processes row y, E→W processes row (mh-1-y). This matters because
  // for southern rows (y > mh/2), E→W runs before W→E, seeing original terrain.
  for (let y = 0; y < mh; y++) {
    // ── W→E pass for row y ──
    const distFromEquator_we = Math.abs(Math.floor(mh / 2) - y);
    const distFromQuarter = Math.abs(Math.floor(mh / 4) - distFromEquator_we);

    const elevCap = climate * 4 + 4 + distFromQuarter;
    let elev_we = elevCap >= 1
      ? rng.nextInt(climate * 4 + distFromQuarter + 5)
      : 0;

    for (let x = (y & 1); x < mw; x += 2) {
      const t = tiles[y * mw + x];
      if (t === T_OCEAN) {
        if (elev_we < elevCap) elev_we++;
      } else if (elev_we > 0) {
        if (climate * -2 + 6 > 0) {
          elev_we -= rng.nextInt(climate * -2 + 7);
        }
        switch (t) {
          case T_DESERT: tiles[y * mw + x] = T_PLAINS; break;
          case T_PLAINS: tiles[y * mw + x] = T_GRASSLAND; break;
          case T_HILLS: tiles[y * mw + x] = T_FOREST; break;
          case T_MOUNTAINS: elev_we -= 3; break;
          case T_TUNDRA: tiles[y * mw + x] = T_FOREST; break;
        }
      }
    }

    // ── E→W pass for row (mh-1-y) ──
    const ey = mh - 1 - y;
    const distFromEquator_ew = Math.abs(Math.floor(mh / 2) - ey);

    let elev_ew = 0;
    for (let x = mw - 2 + (ey & 1); x >= 0; x -= 2) {
      const t = tiles[ey * mw + x];
      if (t === T_OCEAN) {
        if (elev_ew < Math.floor(distFromEquator_ew / 2) + climate + 1) elev_ew++;
      } else if (elev_ew > 0) {
        if (climate * 2 + 2 < 6) {
          elev_ew -= rng.nextInt(7 - (climate * 2 + 2));
        }
        switch (t) {
          case T_DESERT: tiles[ey * mw + x] = T_PLAINS; break;
          case T_PLAINS: tiles[ey * mw + x] = T_GRASSLAND; break;
          case T_GRASSLAND:
            if (distFromEquator_ew < Math.floor(mh * 3 / 10)) {
              tiles[ey * mw + x] = distFromEquator_ew < 10 ? T_JUNGLE : T_SWAMP;
            } else {
              tiles[ey * mw + x] = T_FOREST;
            }
            elev_ew -= 2;
            break;
          case T_HILLS: tiles[ey * mw + x] = T_FOREST; break;
          case T_MOUNTAINS: elev_ew -= 3; break;
          case T_TUNDRA: tiles[ey * mw + x] = T_PLAINS; break;
          case T_SWAMP: tiles[ey * mw + x] = T_FOREST; break;
        }
      }
    }
  }

  // ── Phase 4: Elevation iterations (terrain promotion, lines 1841-1912) ──
  const elevIterations = (age * 5 + 10) * 160;
  let elevX = 0, elevY = 0;

  for (let iter = 0; iter < elevIterations; iter++) {
    if ((iter & 1) === 0) {
      // New random position
      elevY = rng.nextInt(mh);
      elevX = (elevY & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
    } else {
      // Random 8-direction step from previous
      const d = rng.next() & 7; // binary: rand() & 7
      elevX = wrapX(elevX + DIR8_DX[d]);
      elevY = elevY + DIR8_DY[d];
    }
    let x = elevX, y = elevY;
    if (!inBounds(x, y)) continue;
    const distFromEquator = Math.abs(Math.floor(mh / 2) - y);
    const ti = idx(x, y);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;
    // Promotion table
    let newT = t;
    switch (t) {
      case T_DESERT: newT = T_PLAINS; break;
      case T_PLAINS: newT = T_HILLS; break;
      case T_GRASSLAND: newT = T_FOREST; break;
      case T_FOREST:
        newT = distFromEquator < Math.floor(mh * 3 / 10) ? T_JUNGLE : T_PLAINS;
        break;
      case T_HILLS: newT = T_MOUNTAINS; break;
      case T_MOUNTAINS:
        // FUN_0040ab41: inland sea — if all 4 cardinal neighbors are land, convert to ocean
        if (x >= 2 && y >= 2 && x < mw - 2 && y < mh - 2 &&
            getTer(x - 2, y) !== T_OCEAN && getTer(x + 2, y) !== T_OCEAN &&
            getTer(x, y - 2) !== T_OCEAN && getTer(x, y + 2) !== T_OCEAN) {
          tiles[ti] = T_OCEAN;
        }
        continue;
      case T_TUNDRA: newT = T_HILLS; break;
      case T_GLACIER: newT = T_MOUNTAINS; break;
      case T_SWAMP: newT = T_GRASSLAND; break;
      case T_JUNGLE: newT = T_SWAMP; break;
    }
    tiles[ti] = newT;
  }

  // ── Phase 5: Smoothing pass (neighbor voting, lines 1914-2004) ──
  const smoothIterations = (3 - (age + 2)) * 800;
  // Smoothing adjustments from climate/temperature
  const smoothBias = new Int8Array(11); // per-terrain vote bias
  if (climate === -1) { smoothBias[T_DESERT]++; smoothBias[T_PLAINS]++; smoothBias[T_SWAMP]--; }
  if (climate === 1) { smoothBias[T_GRASSLAND]++; smoothBias[T_SWAMP]++; if (temperature >= 0) smoothBias[T_JUNGLE]++; }
  if (temperature === -1) { smoothBias[T_TUNDRA]++; smoothBias[T_FOREST]++; smoothBias[T_DESERT]--; }
  if (temperature === 1) { smoothBias[T_PLAINS]++; smoothBias[T_TUNDRA]--; smoothBias[T_GLACIER]--; if (climate === -1) { smoothBias[T_GRASSLAND]--; smoothBias[T_JUNGLE]--; } }

  let prevSmooth = -1;
  let smoothX = 0, smoothY = 0;
  for (let iter = 0; iter < smoothIterations; iter++) {
    if ((iter & 1) === 0) {
      smoothY = rng.nextInt(mh);
      smoothX = (smoothY & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      prevSmooth = -1;
    } else {
      const d = rng.next() & 7;
      smoothX = wrapX(smoothX + DIR8_DX[d]);
      smoothY = smoothY + DIR8_DY[d];
    }
    let x = smoothX, y = smoothY;
    if (!inBounds(x, y)) continue;
    const ti = idx(x, y);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;

    // Skip if same terrain as last (decompiled line 1944)
    if (prevSmooth >= 0 && prevSmooth === t) continue;
    const isAboveForest = t > 2;

    // Count neighbor terrain votes
    const votes = new Int8Array(11);
    // Apply climate/temperature bias
    for (let k = 0; k < 11; k++) votes[k] = smoothBias[k];

    for (let d = 0; d < 8; d++) {
      const nx = wrapX(x + DIR8_DX[d]);
      const ny = y + DIR8_DY[d];
      if (!inBounds(nx, ny)) continue;
      const nt = tiles[idx(nx, ny)];
      if (nt === T_OCEAN) continue;
      // Bonus for same-category neighbors
      if (nt > 2 && isAboveForest && votes[nt] !== 0) votes[nt]++;
      // Cardinal directions (even indices) get extra weight
      if ((d & 1) === 0) votes[nt]++;
      votes[nt]++;
    }

    // Pick terrain with highest vote
    let bestVote = 0, bestTer = t;
    for (let k = 0; k < 11; k++) {
      if (votes[k] > bestVote) {
        bestVote = votes[k];
        bestTer = k;
        prevSmooth = k;
      }
    }
    tiles[ti] = bestTer;
  }

  // ── Phase 6: River generation (FUN_0040ac5a, lines 2480-2626) ──
  const riverTarget = landmass * 2 + climate * 2 + 12;
  let riversPlaced = 0;
  const riverMap = new Uint8Array(mw * mh); // track river tiles to prevent overlap

  for (let attempt = 0; attempt < 1024 && riversPlaced < riverTarget; attempt++) {
    // Snapshot terrain for rollback
    const snapshot = new Uint8Array(mw * mh);
    for (let i = 0; i < mw * mh; i++) snapshot[i] = tiles[i];

    // Random start on non-mountain, non-ocean tile
    let sx, sy, startFound = false;
    for (let tries = 0; tries < 200; tries++) {
      sy = rng.nextInt(mh);
      sx = (sy & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      if (tiles[idx(sx, sy)] !== T_MOUNTAINS && tiles[idx(sx, sy)] !== T_OCEAN) { startFound = true; break; }
    }
    if (!startFound) break;

    let x = sx, y = sy;
    let dir = rng.next() & 3;
    let length = 0;
    let reachedWater = false;

    // Carve river
    while (true) {
      const t = getTer(x, y);

      // Terrain promotion for river carving
      let riverTer = t;
      switch (t) {
        case T_DESERT: riverTer = (rng.nextInt(10) > 1 || length > 3) ? T_GRASSLAND : T_PLAINS; break;
        case T_PLAINS: riverTer = rng.nextInt(10) > 3 ? T_GRASSLAND : T_PLAINS; break;
        case T_FOREST: riverTer = rng.nextInt(10) > 2 ? T_GRASSLAND : T_FOREST; break;
        case T_HILLS: case T_MOUNTAINS: riverTer = T_GRASSLAND; break;
        case T_TUNDRA: riverTer = T_PLAINS; break;
        case T_GLACIER: riverTer = T_TUNDRA; break;
        case T_SWAMP: riverTer = rng.nextInt(10) > 3 ? T_JUNGLE : T_SWAMP; break;
      }
      riverTer |= 0x80; // River flag (high bit)
      tiles[idx(x, y)] = riverTer;
      length++;

      // Check if any diagonal neighbor is ocean (binary only checks ocean, not rivers)
      for (let rd = 0; rd < 4 && !reachedWater; rd++) {
        const nx = wrapX(x + RIVER_DX[rd]);
        const ny = y + RIVER_DY[rd];
        if (inBounds(nx, ny) && (tiles[idx(nx, ny)] & 0x0F) === T_OCEAN) {
          reachedWater = true;
        }
      }

      // Direction drift: dir = (dir + rand(0..1) - (length & 1)) & 3
      dir = (dir + (rng.next() & 1) - (length & 1)) & 3;

      x = wrapX(x + RIVER_DX[dir]);
      y = y + RIVER_DY[dir];

      if (!inBounds(x, y)) break;
      // Binary checks snapshot (byte[5]) for previously-placed rivers, not current byte[0]
      if (snapshot[idx(x, y)] & 0x80) break;
      if (reachedWater) break;
    }

    // Accept river if it reached water/existing river and meets minimum length
    // Binary (line 2600): min length = 5 - attempt/800, uses attempt counter (1-based)
    const minLen = 5 - Math.floor((attempt + 1) / 800);
    if ((reachedWater || (snapshot[idx(x, y)] & 0x80)) && length >= minLen) {
      riversPlaced++;
      // Record river tiles
      for (let i = 0; i < mw * mh; i++) {
        if (tiles[i] & 0x80) riverMap[i] = 1;
      }
    } else {
      // Rollback
      for (let i = 0; i < mw * mh; i++) tiles[i] = snapshot[i];
    }
  }

  // ── Phase 7: Polar caps + tundra scatter (lines 2009-2072) ──
  // Binary only does this for flat maps, but we apply to all maps.
  // 1st: unconditional glacier at row 0 (even x) and row mh-1 (odd x)
  // 2nd: tundra scatter at rows 0,1 and mh-1,mh-2
  // Unconditional glacier
  for (let x = 0; x < mw; x += 2) {
    tiles[0 * mw + x] = T_GLACIER;         // (x, 0) — even x for even row
    tiles[(mh - 1) * mw + x + 1] = T_GLACIER; // (x+1, mh-1) — odd x for odd row
  }
  // Tundra scatter: mw/8 iterations, 4 placements each
  const polarScatter = Math.floor(mw / 8);
  for (let i = 0; i < polarScatter; i++) {
    let rx = rng.nextInt(Math.floor(mw / 2));
    tiles[0 * mw + rx * 2] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[1 * mw + rx * 2 + 1] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[(mh - 1) * mw + rx * 2 + 1] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[(mh - 2) * mw + rx * 2] = T_TUNDRA;
  }

  // ── Finalize terrain: strip river high bits, build tile objects ──
  const tileData = new Array(mw * mh);
  for (let i = 0; i < mw * mh; i++) {
    const hasRiver = !!(tiles[i] & 0x80);
    const terrain = tiles[i] & 0x0F;
    tileData[i] = {
      terrain: terrain > 10 ? T_OCEAN : terrain,
      river: hasRiver && terrain !== T_OCEAN,
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

  // ── Mirror valid tiles to padding positions ──
  // The renderer iterates ALL gx values (0,1,2,3,...). In .sav files, the parser's
  // get_tile_ptr(x&~1) aliases padding positions to valid tiles, so both have data.
  // For generated maps, we must explicitly copy valid tiles to their padding neighbors.
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = (x & ~1) | (y & 1); // snap to valid parity
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  // ── Phase 8: Body ID assignment (flood fill) ──
  assignBodyIds(tileData, mw, mh, wraps);

  // ── Phase 8b: Lake classification (ocean bodies with <20 tiles) ──
  classifyLakes(tileData, mw, mh, wraps);

  // ── Phase 9: Fertility calculation ──
  calculateFertility(tileData, mw, mh, wraps);

  // ── Phase 10: Pseudo-random resource placement ──
  placeResources(tileData, mw, mh, mapSeed);

  // ── Goody huts: place on land tiles, sparse ──
  placeGoodyHuts(tileData, mw, mh, rng, mapSeed);

  return { mw, mh, mapShape, mapSeed, tileData };
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

  // Direction offsets in doubled-X isometric coords (8 directions)
  const DX8 = [1, 2, 1, 0, -1, -2, -1, 0];
  const DY8 = [-1, 0, 1, 2, 1, 0, -1, -2];

  function isOcean(x, y) {
    if (y < 0 || y >= mh) return true;
    const gx = wrapX(x);
    if (gx < 0 || gx >= mw) return true;
    return tileData[y * mw + gx].terrain === 10; // T_OCEAN
  }

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

    // BFS flood fill
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) { // only valid-parity tiles
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

          for (let d = 0; d < 8; d++) {
            let nx = cx + DX8[d];
            const ny = cy + DY8[d];
            if (ny < 0 || ny >= mh) continue;
            nx = wrapX(nx);
            if (nx < 0 || nx >= mw) continue;
            // Snap to valid parity
            const snx = (nx & ~1) | (ny & 1);
            const ni = ny * mw + snx;
            if (visited[ni]) continue;
            const nIsOcean = tileData[ni].terrain === 10;
            const nIsTarget = pass === 1 ? !nIsOcean : nIsOcean;
            if (!nIsTarget) { visited[ni] = 1; continue; }
            visited[ni] = 1;
            queue.push(snx, ny);
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
 * Place special resources using the binary's deterministic formula.
 * For each tile, resource = ((gx * 11 + gy * 13 + mapSeed) & 0xFF) < threshold.
 * The threshold varies by terrain type (some terrains have higher resource density).
 * Tiles flagged with hasResource get the special resource variant for their terrain.
 *
 * @param {object[]} tileData - tile array
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {number} mapSeed - map seed for determinism
 */
function placeResources(tileData, mw, mh, mapSeed) {
  // Resource threshold per terrain type (from binary analysis)
  // Higher threshold = more resources. 0 = no special resources for this terrain.
  // Binary uses ~1/16 probability for most terrains (threshold ~16 out of 256).
  const RESOURCE_THRESHOLD = [
    16, // Desert (oasis)
    16, // Plains (wheat/buffalo)
    16, // Grassland (resource suppression marker only — grassland shield)
    16, // Forest (pheasant/silk)
    16, // Hills (coal/wine)
    16, // Mountains (gold/iron)
    16, // Tundra (game)
     0, // Glacier (no special)
    16, // Swamp (peat/spice)
    16, // Jungle (gems/fruit)
    16, // Ocean (fish/whales)
  ];

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      const t = tileData[i];
      const ter = t.terrain;
      if (ter > 10) continue;
      const threshold = RESOURCE_THRESHOLD[ter];
      if (threshold === 0) continue;

      // Pseudo-random resource hash (from binary)
      const hash = ((x * 11 + y * 13 + mapSeed) & 0xFF);
      t.hasResource = hash < threshold;
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
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      const t = tileData[i];
      if (t.terrain === T_OCEAN || t.terrain === T_GLACIER || t.terrain === T_MOUNTAINS) continue;

      // Binary goody hut formula (block 0x0053)
      const sum = y + x;
      const index = sum >> 1;
      const offset = x - index;
      const lhs = (index & 3) + (offset & 3) * 4;
      const rhs = ((sum >> 3) * 0x0B + (offset >> 2) * 0x0D + mapSeed + 8) & 0x1F;
      if (lhs === rhs) {
        t.goodyHut = true;
      }
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
  if (terrain === T_OCEAN || terrain === T_GLACIER || terrain === T_MOUNTAINS) return false;
  const sum = y + x;
  const index = sum >> 1;
  const offset = x - index;
  const lhs = (index & 3) + (offset & 3) * 4;
  const rhs = ((sum >> 3) * 0x0B + (offset >> 2) * 0x0D + mapSeed + 8) & 0x1F;
  return lhs === rhs;
}
