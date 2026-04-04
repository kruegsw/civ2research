// ═══════════════════════════════════════════════════════════════════
// mapgenPlates.js — Plate tectonics map generation
//
// Pipeline:
//   1. Generate N tectonic plates via Voronoi assignment
//   2. Assign plate type (continental/oceanic), drift direction + speed
//   3. Classify plate boundaries (convergent/divergent/transform)
//   4. Build elevation field from plate type + boundary effects + noise
//   5. Bridge fill (Civ2 diagonal connectivity fix)
//   --- handoff to Civ2 terrain pipeline (shared with mapgenBlob.js) ---
//   6. Latitude-based terrain assignment
//   7. Elevation/moisture pass (W→E, E→W)
//   8. Elevation iterations (terrain promotion)
//   9. Smoothing pass (neighbor voting)
//  10. River generation
//  11. Polar caps + tundra scatter
//  12. Body ID assignment + fertility + goody huts
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// ── MSVC-compatible LCG PRNG (from mapgen.js) ──
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    return (this.state >>> 16) & 0x7FFF;
  }
  nextInt(n) { return n <= 1 ? 0 : this.next() % n; }
  random() { return this.next() / 32768; }
}

// ── Direction tables ──
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
const DIAG_DX = [1, 1, -1, -1];
const DIAG_DY = [-1, 1, 1, -1];
const RIVER_DX = DIAG_DX;
const RIVER_DY = DIAG_DY;

// ── Terrain constants ──
const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

/**
 * Generate a map using plate tectonics simulation.
 *
 * @param {object} settings
 * @param {number} [settings.width=50]        — map width (doubled-X)
 * @param {number} [settings.height=80]       — map height
 * @param {number} [settings.seed]            — RNG seed (0-65535)
 * @param {number} [settings.mapShape=0]      — 0=wrapping, 1=flat
 * @param {number} [settings.landmass=1]      — 0=small, 1=normal, 2=large
 * @param {number} [settings.temperature=0]   — -1=cool, 0=temperate, 1=warm
 * @param {number} [settings.climate=0]       — -1=arid, 0=normal, 1=wet
 * @param {number} [settings.age=1]           — 0=young(rugged), 1=normal, 2=old(smooth)
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapPlates(settings = {}) {
  const mw = settings.width || 50;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;
  let temperature = settings.temperature ?? 0;
  let climate = settings.climate ?? 0;
  const age = settings.age ?? 1;
  const continents = settings.continents ?? 0;  // -1=islands, 0=small, 1=large

  if (wraps) { temperature *= 2; climate *= 2; }

  // ── Coordinate helpers ──
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    return wraps || (x >= 0 && x < mw);
  }
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }
  function getTer(x, y) {
    if (!inBounds(x, y)) return T_OCEAN;
    return tiles[idx(x, y)];
  }

  // Toroidal distance for wrapping maps
  function tileDist(x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    if (wraps) dx = Math.min(dx, mw - dx);
    const dy = Math.abs(y1 - y2);
    return Math.sqrt(dx * dx + dy * dy);
  }

  const tiles = new Array(mw * mh).fill(T_OCEAN);

  // ═══════════════════════════════════════════════════════════
  // PHASE 1: Generate tectonic plates via Voronoi assignment
  // ═══════════════════════════════════════════════════════════

  // Number of plates scales with landmass setting
  const totalValidTiles = Math.floor(mw * mh / 2);
  const numPlates = Math.max(2, Math.min(8 + rng.nextInt(5), Math.floor(totalValidTiles / 4)));

  // Continental ratio depends on landmass
  const continentalRatio = [0.30, 0.40, 0.55][landmass];

  // Generate plate centers spread across the map
  const plates = [];
  for (let i = 0; i < numPlates; i++) {
    let bestDist = -1, bestX = 0, bestY = 0;
    for (let attempt = 0; attempt < 50; attempt++) {
      const cy = rng.nextInt(mh);
      const cx = snap(rng.nextInt(mw), cy);
      let nearest = Infinity;
      for (const p of plates) {
        nearest = Math.min(nearest, tileDist(cx, cy, p.cx, p.cy));
      }
      if (nearest > bestDist) {
        bestDist = nearest;
        bestX = cx; bestY = cy;
      }
    }

    // Assign plate type: continental or oceanic
    const isContinental = rng.random() < continentalRatio;

    // Random drift direction (angle in radians) and speed
    const driftAngle = rng.random() * Math.PI * 2;
    const driftSpeed = 0.3 + rng.random() * 0.7; // 0.3-1.0

    plates.push({
      cx: bestX,
      cy: bestY,
      continental: isContinental,
      dx: Math.cos(driftAngle) * driftSpeed,
      dy: Math.sin(driftAngle) * driftSpeed,
      baseElev: isContinental ? (0.3 + rng.random() * 0.3) : (-0.4 - rng.random() * 0.3),
    });
  }

  // Continent setting: reassign continental/oceanic status
  if (continents === 1) {
    // Large: cluster continental plates near 1-2 nuclei
    const numNuclei = 1 + rng.nextInt(2);
    const nuclei = [];
    for (let n = 0; n < numNuclei; n++) {
      nuclei.push(rng.nextInt(numPlates));
    }
    const clusterRadius = Math.max(mw, mh) * 0.45;
    for (let i = 0; i < numPlates; i++) {
      let near = false;
      for (const ni of nuclei) {
        if (tileDist(plates[i].cx, plates[i].cy, plates[ni].cx, plates[ni].cy) < clusterRadius) {
          near = true; break;
        }
      }
      plates[i].continental = near ? (rng.random() < 0.75) : (rng.random() < 0.10);
      plates[i].baseElev = plates[i].continental ? (0.3 + rng.random() * 0.3) : (-0.4 - rng.random() * 0.3);
    }
  }

  // Assign each tile to its nearest plate (Voronoi)
  const plateAssignment = new Uint8Array(mw * mh);
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      let bestPlate = 0;
      let bestDist = Infinity;
      for (let p = 0; p < numPlates; p++) {
        const d = tileDist(x, y, plates[p].cx, plates[p].cy);
        if (d < bestDist) {
          bestDist = d;
          bestPlate = p;
        }
      }
      plateAssignment[y * mw + x] = bestPlate;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 2: Classify plate boundaries and build elevation
  // ═══════════════════════════════════════════════════════════

  // Elevation field: float array
  const elevation = new Float32Array(mw * mh);

  // Set base elevation from plate type
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      const plate = plates[plateAssignment[i]];
      elevation[i] = plate.baseElev;
    }
  }

  // Find boundary tiles and apply boundary effects
  // A tile is on a boundary if any of its 8 neighbors belongs to a different plate
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      const myPlate = plateAssignment[i];

      for (let d = 0; d < 8; d++) {
        let nx = x + DIR8_DX[d];
        const ny = y + DIR8_DY[d];
        if (ny < 0 || ny >= mh) continue;
        nx = wrapX(nx);
        if (!wraps && (nx < 0 || nx >= mw)) continue;
        nx = snap(nx, ny);
        const ni = ny * mw + nx;
        const neighborPlate = plateAssignment[ni];

        if (neighborPlate === myPlate) continue;

        // Classify this boundary interaction
        const pA = plates[myPlate];
        const pB = plates[neighborPlate];

        // Direction vector from plate A center to plate B center
        let abx = pB.cx - pA.cx;
        let aby = pB.cy - pA.cy;
        if (wraps) {
          // Handle wrapping for direction
          if (abx > mw / 2) abx -= mw;
          if (abx < -mw / 2) abx += mw;
        }
        const abLen = Math.sqrt(abx * abx + aby * aby) || 1;
        abx /= abLen;
        aby /= abLen;

        // Relative velocity along the boundary normal (A→B direction)
        // Positive = converging, Negative = diverging
        const relVel = (pA.dx - pB.dx) * abx + (pA.dy - pB.dy) * aby;

        // Cross-boundary relative velocity (transform component)
        const crossVel = Math.abs((pA.dx - pB.dx) * (-aby) + (pA.dy - pB.dy) * abx);

        if (relVel > 0.15) {
          // CONVERGENT: plates moving toward each other → mountains
          const boost = relVel * 0.6;
          if (pA.continental && pB.continental) {
            // Continent-continent collision → highest mountains
            elevation[i] += boost * 1.2;
          } else if (pA.continental || pB.continental) {
            // Subduction zone → volcanic mountains on continental side
            if (pA.continental) {
              elevation[i] += boost * 0.9;
            } else {
              elevation[i] += boost * 0.3; // oceanic side gets island arc
            }
          } else {
            // Ocean-ocean convergence → island arcs
            elevation[i] += boost * 0.5;
          }
        } else if (relVel < -0.15) {
          // DIVERGENT: plates moving apart → rift valleys / ocean
          const drop = Math.abs(relVel) * 0.4;
          elevation[i] -= drop;
        } else if (crossVel > 0.2) {
          // TRANSFORM: plates sliding past each other → moderate elevation
          elevation[i] += crossVel * 0.15;
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 3: Gaussian boundary falloff — spread boundary effects
  // ═══════════════════════════════════════════════════════════

  // Blur the elevation field to spread boundary effects
  // Use multiple passes with a small radius for a Gaussian-like falloff
  const blurPasses = 3 + age; // more passes for older (smoother) maps
  const blurRadius = 2;

  for (let pass = 0; pass < blurPasses; pass++) {
    const blurred = new Float32Array(elevation.length);

    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const i = y * mw + x;
        let sum = elevation[i] * 4; // center weight
        let count = 4;

        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
          for (let dx = -blurRadius * 2; dx <= blurRadius * 2; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = y + dy;
            if (ny < 0 || ny >= mh) continue;
            let nx = wrapX(x + dx);
            if (!wraps && (nx < 0 || nx >= mw)) continue;
            nx = snap(nx, ny);
            const ni = ny * mw + nx;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > blurRadius * 2) continue;
            const weight = 1.0 / (1.0 + dist);
            sum += elevation[ni] * weight;
            count += weight;
          }
        }
        blurred[i] = sum / count;
      }
    }

    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        elevation[y * mw + x] = blurred[y * mw + x];
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 4: Add small-scale noise and threshold to land/ocean
  // ═══════════════════════════════════════════════════════════

  // Add fractal-like noise for variation
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      // Multi-octave noise approximation using RNG
      const noise1 = (rng.random() - 0.5) * 0.15;
      const noise2 = (rng.random() - 0.5) * 0.08;
      elevation[i] += noise1 + noise2;
    }
  }

  // Determine sea level threshold based on desired land percentage
  // Gather all valid-tile elevations and sort to find the percentile cutoff
  // Islands: reduce land % (→ more fragmented), Large: increase (→ more connected)
  const baseLandPercent = [0.20, 0.30, 0.40][landmass];
  const landPercent = Math.max(0.10, Math.min(0.55, baseLandPercent + [-0.12, 0, 0.10][continents + 1]));
  const validElevations = [];
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      validElevations.push(elevation[y * mw + x]);
    }
  }
  validElevations.sort((a, b) => a - b);
  const seaLevelIdx = Math.floor(validElevations.length * (1 - landPercent));
  const seaLevel = validElevations[seaLevelIdx];

  // Find max elevation above sea level for normalization
  let maxAboveSea = 0;
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const aboveSea = elevation[y * mw + x] - seaLevel;
      if (aboveSea > maxAboveSea) maxAboveSea = aboveSea;
    }
  }
  if (maxAboveSea < 0.01) maxAboveSea = 1;

  // Convert elevation to landCount-style encoding:
  // 0=ocean, 1=flat, 2=hills, 3=mountains, 4=peak mountains
  const landCount = new Uint8Array(mw * mh);
  const hillsThreshold = 0.45;
  const mtnsThreshold = 0.70;
  const peakThreshold = 0.88;

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      if (elevation[i] < seaLevel) {
        landCount[i] = 0;
      } else {
        const norm = (elevation[i] - seaLevel) / maxAboveSea;
        const noise = (rng.random() - 0.5) * 0.12;
        const adj = Math.max(0, Math.min(1, norm + noise));
        if (adj >= peakThreshold)          landCount[i] = 4;
        else if (adj >= mtnsThreshold)     landCount[i] = 3;
        else if (adj >= hillsThreshold)    landCount[i] = 2;
        else                               landCount[i] = 1;
      }
    }
  }

  // Islands: break up land at plate boundaries to create separate islands
  if (continents === -1) {
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const i = y * mw + x;
        if (!landCount[i]) continue;
        let atBoundary = false;
        for (let d = 0; d < 8; d++) {
          let nx = x + DIR8_DX[d];
          const ny = y + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (!wraps && (nx < 0 || nx >= mw)) continue;
          nx = snap(nx, ny);
          if (plateAssignment[ny * mw + nx] !== plateAssignment[i]) {
            atBoundary = true; break;
          }
        }
        if (atBoundary && rng.random() < 0.5) landCount[i] = 0;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 5: Bridge fill (from mapgen.js — fixes diagonal connectivity)
  // ═══════════════════════════════════════════════════════════
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
          if (x < 2 || y < 2) {
            if (y < 2) { if (x > 1) x -= 2; }
            else { y -= 1; x += 1; }
          } else { x -= 1; y -= 1; }
        }
        x += 2;
      }
      y += 1;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASES 6–11: Civ2 terrain pipeline (from mapgen.js phases 3–8)
  // ═══════════════════════════════════════════════════════════════

  // ── Phase 6: Latitude-based terrain assignment ──
  const bandWidth = wraps ? Math.floor(mh / 8) : Math.floor(mh / 12);
  const bandWidthClamped = Math.max(bandWidth, 2);

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
        const jitter1 = (rng.next() & 0xF) + 1;
        const check = y + jitter1;
        const jitter2 = (rng.next() & 0xF) + 1;
        const adjusted = y + jitter2;
        let distFromCenter;
        if (check >= halfH) distFromCenter = adjusted - halfH;
        else distFromCenter = halfH - adjusted;
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

  // ── Phase 7: Elevation/moisture pass ──
  for (let y = 0; y < mh; y++) {
    // W→E pass for row y
    const distFromEquator_we = Math.abs(Math.floor(mh / 2) - y);
    const distFromQuarter = Math.abs(Math.floor(mh / 4) - distFromEquator_we);
    const elevCap = climate * 4 + 4 + distFromQuarter;
    let elev_we = elevCap >= 1 ? rng.nextInt(climate * 4 + distFromQuarter + 5) : 0;

    for (let x = (y & 1); x < mw; x += 2) {
      const t = tiles[y * mw + x];
      if (t === T_OCEAN) {
        if (elev_we < elevCap) elev_we++;
      } else if (elev_we > 0) {
        if (climate * -2 + 6 > 0) elev_we -= rng.nextInt(climate * -2 + 7);
        switch (t) {
          case T_DESERT: tiles[y * mw + x] = T_PLAINS; break;
          case T_PLAINS: tiles[y * mw + x] = T_GRASSLAND; break;
          case T_HILLS: tiles[y * mw + x] = T_FOREST; break;
          case T_MOUNTAINS: elev_we -= 3; break;
          case T_TUNDRA: tiles[y * mw + x] = T_FOREST; break;
        }
      }
    }

    // E→W pass for row (mh-1-y)
    const ey = mh - 1 - y;
    const distFromEquator_ew = Math.abs(Math.floor(mh / 2) - ey);
    let elev_ew = 0;

    for (let x = mw - 2 + (ey & 1); x >= 0; x -= 2) {
      const t = tiles[ey * mw + x];
      if (t === T_OCEAN) {
        if (elev_ew < Math.floor(distFromEquator_ew / 2) + climate + 1) elev_ew++;
      } else if (elev_ew > 0) {
        if (climate * 2 + 2 < 6) elev_ew -= rng.nextInt(7 - (climate * 2 + 2));
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

  // ── Phase 8: Elevation iterations (terrain promotion) ──
  const elevIterations = (age * 5 + 10) * 160;
  let elevX = 0, elevY = 0;

  for (let iter = 0; iter < elevIterations; iter++) {
    if ((iter & 1) === 0) {
      elevY = rng.nextInt(mh);
      elevX = (elevY & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
    } else {
      const d = rng.next() & 7;
      elevX = wrapX(elevX + DIR8_DX[d]);
      elevY = elevY + DIR8_DY[d];
    }
    if (!inBounds(elevX, elevY)) continue;
    const distFromEquator = Math.abs(Math.floor(mh / 2) - elevY);
    const ti = idx(elevX, elevY);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;
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
        if (elevX >= 2 && elevY >= 2 && elevX < mw - 2 && elevY < mh - 2 &&
            getTer(elevX - 2, elevY) !== T_OCEAN && getTer(elevX + 2, elevY) !== T_OCEAN &&
            getTer(elevX, elevY - 2) !== T_OCEAN && getTer(elevX, elevY + 2) !== T_OCEAN) {
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

  // ── Phase 9: Smoothing pass (neighbor voting) ──
  const smoothIterations = (3 - (age + 2)) * 800;
  const smoothBias = new Int8Array(11);
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
    if (!inBounds(smoothX, smoothY)) continue;
    const ti = idx(smoothX, smoothY);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;
    if (prevSmooth >= 0 && prevSmooth === t) continue;
    const isAboveForest = t > 2;

    const votes = new Int8Array(11);
    for (let k = 0; k < 11; k++) votes[k] = smoothBias[k];

    for (let d = 0; d < 8; d++) {
      const nx = wrapX(smoothX + DIR8_DX[d]);
      const ny = smoothY + DIR8_DY[d];
      if (!inBounds(nx, ny)) continue;
      const nt = tiles[idx(nx, ny)];
      if (nt === T_OCEAN) continue;
      if (nt > 2 && isAboveForest && votes[nt] !== 0) votes[nt]++;
      if ((d & 1) === 0) votes[nt]++;
      votes[nt]++;
    }

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

  // ── Phase 10: River generation ──
  const riverTarget = landmass * 2 + climate * 2 + 12;
  let riversPlaced = 0;
  const riverMap = new Uint8Array(mw * mh);

  for (let attempt = 0; attempt < 1024 && riversPlaced < riverTarget; attempt++) {
    const snapshot = new Uint8Array(mw * mh);
    for (let i = 0; i < mw * mh; i++) snapshot[i] = tiles[i];

    let sx, sy;
    let startFound = false;
    for (let tries = 0; tries < 200; tries++) {
      sy = rng.nextInt(mh);
      sx = (sy & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      if (tiles[idx(sx, sy)] !== T_MOUNTAINS && tiles[idx(sx, sy)] !== T_OCEAN) { startFound = true; break; }
    }
    if (!startFound) break;

    let rx = sx, ry = sy;
    let dir = rng.next() & 3;
    let length = 0;
    let reachedWater = false;

    while (true) {
      const t = getTer(rx, ry);
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
      riverTer |= 0x80;
      tiles[idx(rx, ry)] = riverTer;
      length++;

      for (let rd = 0; rd < 4 && !reachedWater; rd++) {
        const nx = wrapX(rx + RIVER_DX[rd]);
        const ny = ry + RIVER_DY[rd];
        if (inBounds(nx, ny) && (tiles[idx(nx, ny)] & 0x0F) === T_OCEAN) {
          reachedWater = true;
        }
      }

      dir = (dir + (rng.next() & 1) - (length & 1)) & 3;
      rx = wrapX(rx + RIVER_DX[dir]);
      ry = ry + RIVER_DY[dir];

      if (!inBounds(rx, ry)) break;
      if (snapshot[idx(rx, ry)] & 0x80) break;
      if (reachedWater) break;
    }

    const minLen = 5 - Math.floor((attempt + 1) / 800);
    if ((reachedWater || (snapshot[idx(rx, ry)] & 0x80)) && length >= minLen) {
      riversPlaced++;
      for (let i = 0; i < mw * mh; i++) {
        if (tiles[i] & 0x80) riverMap[i] = 1;
      }
    } else {
      for (let i = 0; i < mw * mh; i++) tiles[i] = snapshot[i];
    }
  }

  // ── Phase 11: Polar caps + tundra scatter ──
  for (let x = 0; x < mw; x += 2) {
    tiles[0 * mw + x] = T_GLACIER;
    tiles[(mh - 1) * mw + x + 1] = T_GLACIER;
  }
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

  // ═══════════════════════════════════════════════════════════
  // Finalize: build tileData objects
  // ═══════════════════════════════════════════════════════════

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

  // Mirror valid tiles to padding positions
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = (x & ~1) | (y & 1);
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  assignBodyIds(tileData, mw, mh, wraps);
  calculateFertility(tileData, mw, mh, wraps);
  placeGoodyHuts(tileData, mw, mh);

  return { mw, mh, mapShape, mapSeed, tileData };
}

// ═══════════════════════════════════════════════════════════════
// Shared post-processing (from mapgen.js)
// ═══════════════════════════════════════════════════════════════

function assignBodyIds(tileData, mw, mh, wraps) {
  const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
  const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === 10) { visited[i] = 1; tileData[i].bodyId = 0; continue; }
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
          if (tileData[ni].terrain === 10) continue;
          visited[ni] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
}

function calculateFertility(tileData, mw, mh, wraps) {
  const BASE_YIELD = [
    [0, 1], [1, 1], [2, 0], [1, 2], [1, 0],
    [0, 1], [1, 0], [0, 0], [1, 0], [1, 0], [1, 0],
  ];
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === 10) { tileData[i].fertility = 0; continue; }
      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy;
        if (gy < 0 || gy >= mh) continue;
        const gx = wrapX(x + dx);
        if (gx < 0 || gx >= mw) continue;
        const tile = tileData[gy * mw + gx];
        const [food, shields] = BASE_YIELD[tile.terrain] || [0, 0];
        let tileScore = food * 4 + shields * 2;
        if (tile.river) tileScore += 2;
        if (r === 20) tileScore *= tileData[i].river ? 6 : 4;
        else if (r < 8) tileScore *= 2;
        score += tileScore;
      }
      tileData[i].fertility = Math.max(1, Math.min(15, Math.floor((score - 120) / 8)));
    }
  }
}

function placeGoodyHuts(tileData, mw, mh) {
  for (let i = 0; i < tileData.length; i++) {
    const t = tileData[i];
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (Math.random() < 0.02) t.goodyHut = true;
    }
  }
}
