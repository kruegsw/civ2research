// ═══════════════════════════════════════════════════════════════════
// mapgenRealWorldEngine.js — Shared rasterization engine for
// polygon-based real-world map generators
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

export { T_DESERT, T_PLAINS, T_GRASSLAND, T_FOREST, T_HILLS,
         T_MOUNTAINS, T_TUNDRA, T_JUNGLE, T_SWAMP, T_GLACIER, T_OCEAN };

// ── Ray-casting point-in-polygon ──
export function pointInPoly(polygon, px, py) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > py) !== (yj > py) &&
        px < (xj - xi) * (py - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// ── Bresenham line rasterizer ──
function* rasterLine(x0, y0, x1, y1) {
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy, cx = x0, cy = y0;
  while (true) {
    yield [cx, cy];
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; cx += sx; }
    if (e2 < dx) { err += dx; cy += sy; }
  }
}

const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];

// ═══════════════════════════════════════════════════════════════════
// Main generator — takes polygon data, returns tileData
// ═══════════════════════════════════════════════════════════════════
//
// config = {
//   landPolygons:   [[point, ...], ...],       // land outlines
//   waterCutouts:   [[point, ...], ...],       // lakes / inland seas
//   terrainRegions: [{ terrain, polygon }, ...],
//   rivers:         [[[x,y], ...], ...],       // polylines
//   polarBands:     true/false,                // glacier/tundra at poles
//   wrapping:       true/false,                // x-wrap for world map
// }
//
// All polygon coordinates are in normalized geo space [0,1]×[0,1].

export function generateFromPolygons(settings, config) {
  const mw = settings.width || config.defaultWidth || 80;
  const mh = settings.height || config.defaultHeight || 120;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const mapShape = config.mapShape ?? 1; // 1=flat, 0=wrapping

  function snap(x, y) { return (x & ~1) | (y & 1); }

  // ── Coordinate transform ──
  const PAD = 0.04;
  const contW = 1 - 2 * PAD;
  const contH = 1 - 2 * PAD;

  function tileToGeo(x, y) {
    return [(x / mw - PAD) / contW, (y / mh - PAD) / contH];
  }

  function geoToTileCoord(gx, gy) {
    return [Math.round((PAD + gx * contW) * mw), Math.round((PAD + gy * contH) * mh)];
  }

  function tileInGeoPoly(x, y, poly) {
    const [gx, gy] = tileToGeo(x, y);
    return pointInPoly(poly, gx, gy);
  }

  // For wrapping maps, also check shifted polygons
  function tileInGeoPolyWrap(x, y, poly) {
    if (tileInGeoPoly(x, y, poly)) return true;
    if (!config.wrapping) return false;
    // Check with polygon shifted ±1 in x
    const [gx, gy] = tileToGeo(x, y);
    if (pointInPoly(poly, gx - 1, gy)) return true;
    if (pointInPoly(poly, gx + 1, gy)) return true;
    return false;
  }

  // ── Phase 1: Fill with ocean ──
  const terrainGrid = new Uint8Array(mw * mh).fill(T_OCEAN);
  const riverGrid = new Uint8Array(mw * mh);

  // ── Phase 2: Rasterize land polygons ──
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      for (const poly of (config.landPolygons || [])) {
        if (tileInGeoPolyWrap(x, y, poly)) {
          terrainGrid[y * mw + x] = T_GRASSLAND;
          break;
        }
      }
    }
  }

  // ── Phase 3: Cut out water bodies ──
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      for (const lake of (config.waterCutouts || [])) {
        if (tileInGeoPolyWrap(x, y, lake)) {
          terrainGrid[y * mw + x] = T_OCEAN;
          break;
        }
      }
    }
  }

  // ── Phase 4: Paint terrain regions ──
  for (const { terrain, polygon } of (config.terrainRegions || [])) {
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        if (terrainGrid[y * mw + x] === T_OCEAN) continue;
        if (tileInGeoPolyWrap(x, y, polygon)) {
          terrainGrid[y * mw + x] = terrain;
        }
      }
    }
  }

  // ── Phase 5: Rivers ──
  for (const river of (config.rivers || [])) {
    for (let seg = 0; seg < river.length - 1; seg++) {
      const [tx0, ty0] = geoToTileCoord(river[seg][0], river[seg][1]);
      const [tx1, ty1] = geoToTileCoord(river[seg + 1][0], river[seg + 1][1]);
      for (const [rx, ry] of rasterLine(tx0, ty0, tx1, ty1)) {
        if (ry < 0 || ry >= mh || rx < 0 || rx >= mw) continue;
        const sx = snap(rx, ry);
        const ti = ry * mw + sx;
        if (terrainGrid[ti] !== T_OCEAN && terrainGrid[ti] !== T_MOUNTAINS) {
          riverGrid[ti] = 1;
        }
      }
    }
  }

  // ── Phase 6: Polar caps (Civ2-style) ──
  // Row 0: glacier, row mh-1: glacier, scattered tundra on rows 0-1 and mh-2 to mh-1
  if (config.polarBands) {
    for (let x = (0 & 1); x < mw; x += 2) {
      terrainGrid[0 * mw + x] = T_GLACIER;
    }
    for (let x = ((mh - 1) & 1); x < mw; x += 2) {
      terrainGrid[(mh - 1) * mw + x] = T_GLACIER;
    }
    const polarScatter = Math.floor(mw / 8);
    for (let i = 0; i < polarScatter; i++) {
      let rx = Math.floor(Math.random() * Math.floor(mw / 2));
      let sx = snap(rx * 2, 0);
      terrainGrid[0 * mw + sx] = T_TUNDRA;
      rx = Math.floor(Math.random() * Math.floor(mw / 2));
      sx = snap(rx * 2, 1);
      terrainGrid[1 * mw + sx] = T_TUNDRA;
      rx = Math.floor(Math.random() * Math.floor(mw / 2));
      sx = snap(rx * 2, mh - 1);
      terrainGrid[(mh - 1) * mw + sx] = T_TUNDRA;
      rx = Math.floor(Math.random() * Math.floor(mw / 2));
      sx = snap(rx * 2, mh - 2);
      terrainGrid[(mh - 2) * mw + sx] = T_TUNDRA;
    }
  }

  // ── Phase 7: Edge smoothing ──
  const smoothed = new Uint8Array(terrainGrid);
  for (let y = 2; y < mh - 2; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const ti = y * mw + x;
      const t = terrainGrid[ti];
      if (t === T_OCEAN) continue;

      let hasMountain = false, hasTundra = false;
      for (let d = 0; d < 8; d++) {
        const nx = x + DIR8_DX[d], ny = y + DIR8_DY[d];
        if (ny < 0 || ny >= mh || nx < 0 || nx >= mw) continue;
        const nt = terrainGrid[ny * mw + snap(nx, ny)];
        if (nt === T_MOUNTAINS) hasMountain = true;
        if (nt === T_TUNDRA || nt === T_GLACIER) hasTundra = true;
      }

      if ((t === T_GRASSLAND || t === T_PLAINS) && hasMountain) smoothed[ti] = T_HILLS;
      if ((t === T_GRASSLAND || t === T_PLAINS) && hasTundra) smoothed[ti] = T_FOREST;
    }
  }
  for (let i = 0; i < mw * mh; i++) terrainGrid[i] = smoothed[i];

  // ── Phase 8: Build tileData ──
  const tileData = new Array(mw * mh);
  for (let i = 0; i < mw * mh; i++) {
    tileData[i] = {
      terrain: terrainGrid[i],
      river: riverGrid[i] === 1 && terrainGrid[i] !== T_OCEAN,
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

  // Fill invalid tile slots with copy of nearest valid tile
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = (x & ~1) | (y & 1);
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  assignBodyIds(tileData, mw, mh);
  calculateFertility(tileData, mw, mh);
  placeGoodyHuts(tileData);

  return { mw, mh, mapShape, mapSeed, tileData };
}

// ═══════════════════════════════════════════════════════════════════
// Post-processing
// ═══════════════════════════════════════════════════════════════════

function assignBodyIds(tileData, mw, mh) {
  const DX = [1, 2, 1, 0, -1, -2, -1, 0];
  const DY = [-1, 0, 1, 2, 1, 0, -1, -2];
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === 10) { visited[i] = 1; tileData[i].bodyId = 0; continue; }
      const bodyId = nextId < 63 ? nextId++ : 62;
      const queue = [{ x, y }];
      visited[i] = 1;
      while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift();
        tileData[cy * mw + cx].bodyId = bodyId;
        for (let d = 0; d < 8; d++) {
          const nx = cx + DX[d], ny = cy + DY[d];
          if (ny < 0 || ny >= mh || nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (visited[ni] || tileData[ni].terrain === 10) continue;
          visited[ni] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
}

function calculateFertility(tileData, mw, mh) {
  const BASE_YIELD = [
    [0, 1], [1, 1], [2, 0], [1, 2], [1, 0],
    [0, 1], [1, 0], [0, 0], [1, 0], [1, 0], [1, 0],
  ];
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === 10) { tileData[i].fertility = 0; continue; }
      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy, gx = x + dx;
        if (gy < 0 || gy >= mh || gx < 0 || gx >= mw) continue;
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

function placeGoodyHuts(tileData) {
  for (const t of tileData) {
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (Math.random() < 0.02) t.goodyHut = true;
    }
  }
}
