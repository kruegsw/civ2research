// ═══════════════════════════════════════════════════════════════════
// visibility.js — FOW & Line of Sight (shared: server + client)
//
// Server uses this to filter game state per civ before broadcast.
// Client uses this for FOW rendering and LOS dimming.
//
// Visibility radii from civ2mod.c addToVisibilityMap() (doubled-X offsets):
//   Units: radius 1 (9 tiles), Cities: radius 2 (21 tiles)
//
// H.1: Terrain-based LOS — Hills/Mountains/Fortress/Watchtower grant
//       extended visibility range for units standing on them.
//   Hills (terrain 4):      +1 → radius 2 (21 tiles)
//   Mountains (terrain 5):  +2 → radius 3 (37 tiles)
//   Fortress improvement:   +1 visibility range
// ═══════════════════════════════════════════════════════════════════

const RADIUS_1 = [
  [0,0], [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0]
];
const RADIUS_2 = [
  ...RADIUS_1,
  [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
  [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3]
];
// Radius 3 offsets (for mountains +2 or hills+fortress): 37 tiles
const RADIUS_3 = [
  ...RADIUS_2,
  [0,-4], [0,4], [4,0], [-4,0],
  [2,-4], [-2,-4], [4,-2], [-4,-2],
  [4,2], [-4,2], [2,4], [-2,4],
];

/** Pick the offset array for a given effective radius level (1/2/3). */
function radiusOffsets(r) {
  if (r >= 3) return RADIUS_3;
  if (r >= 2) return RADIUS_2;
  return RADIUS_1;
}

/**
 * Determine effective visibility radius for a unit based on terrain/improvements.
 * @param {object} mapData - must have tileData, mw (or accessor getTerrain/getImprovements)
 * @param {number} gx - unit gx
 * @param {number} gy - unit gy
 * @returns {number} effective radius (1, 2, or 3)
 */
function unitVisRadius(mapData, gx, gy) {
  let radius = 1;
  // Read terrain — support both accessor-style and direct tileData
  let terrain = -1;
  let hasFortress = false;
  if (mapData.getTerrain) {
    terrain = mapData.getTerrain(gx, gy);
    const imp = mapData.getImprovements ? mapData.getImprovements(gx, gy) : null;
    hasFortress = !!(imp && imp.fortress);
  } else if (mapData.tileData) {
    const mw = mapData.mw;
    const wraps = mapData.mapShape === 0;
    const wgx = wraps ? ((gx % mw) + mw) % mw : gx;
    if (gy >= 0 && gy < mapData.mh && wgx >= 0 && wgx < mw) {
      const tile = mapData.tileData[gy * mw + wgx];
      if (tile) {
        terrain = tile.terrain;
        hasFortress = !!(tile.improvements && tile.improvements.fortress);
      }
    }
  }
  // Hills: +1 visibility
  if (terrain === 4) radius += 1;
  // Mountains: +2 visibility
  else if (terrain === 5) radius += 2;
  // Fortress/Watchtower: +1 visibility
  if (hasFortress) radius += 1;
  // Cap at 3
  return Math.min(radius, 3);
}

/**
 * Compute line-of-sight for a specific civ.
 * H.1: Units on Hills/Mountains/Fortress get extended visibility.
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
    const r = unitVisRadius(mapData, u.gx, u.gy);
    mark(u.x, u.y, radiusOffsets(r));
  }
  for (const c of cities) {
    if (c.owner !== civSlot) continue;
    mark(c.cx, c.cy, RADIUS_2);
  }

  return los;
}

/**
 * (#46) Update persistent visibility (tile byte[4]) around a position.
 * Uses fixed 25-tile city-spiral pattern for cities (radius=2).
 * For tiles 8-24 (outer ring), applies an "attacker gate": only reveals
 * if the tile is not occupied by an enemy military unit.
 * For units (radius=1), terrain elevation and fortress still boost radius.
 *
 * @param {Array} tileData - mw*mh array of byte arrays
 * @param {number} mw - map width
 * @param {number} mh - map height
 * @param {number} civSlot - civ index (0-7)
 * @param {number} gx - center tile gx (half-column)
 * @param {number} gy - center tile gy (row)
 * @param {boolean} wraps - whether map wraps horizontally
 * @param {number} [radius=1] - visibility radius: 1 for units, 2 for cities
 * @param {object} [gameState] - game state (needed for attacker gate on city revelation)
 */
export function updateVisibility(tileData, mw, mh, civSlot, gx, gy, wraps, radius, gameState) {
  const bit = 1 << civSlot;
  const mw2 = mw * 2;
  const dx = gx * 2 + (gy % 2); // doubled-X coordinate

  // For units (radius !== 2 i.e. not city), apply terrain-based LOS boost
  let effectiveRadius = radius || 1;
  if (effectiveRadius !== 2) {
    // Read terrain and improvements from tileData to determine boost
    const wgx = wraps ? ((gx % mw) + mw) % mw : gx;
    if (gy >= 0 && gy < mh && wgx >= 0 && wgx < mw) {
      const tile = tileData[gy * mw + wgx];
      if (tile) {
        if (tile.terrain === 4) effectiveRadius += 1;       // Hills: +1
        else if (tile.terrain === 5) effectiveRadius += 2;   // Mountains: +2
        if (tile.improvements && tile.improvements.fortress) effectiveRadius += 1; // Fortress: +1
        if (effectiveRadius > 3) effectiveRadius = 3;
      }
    }
  }

  const offsets = radiusOffsets(effectiveRadius);

  for (let oi = 0; oi < offsets.length; oi++) {
    const [odx, ody] = offsets[oi];
    let ndx = dx + odx;
    const ndy = gy + ody;
    if (ndy < 0 || ndy >= mh) continue;
    if (wraps) {
      ndx = ((ndx % mw2) + mw2) % mw2;
    } else if (ndx < 0 || ndx >= mw2) {
      continue;
    }
    const idx = ndy * mw + (ndx >> 1);

    // (#46) Attacker gate for city revelation: tiles 8-24 in the city spiral
    // (outer ring) are only revealed if no enemy military unit occupies them.
    // This uses the fixed 25-tile city-spiral pattern (RADIUS_2 = 21 tiles).
    if (effectiveRadius === 2 && oi >= 8 && gameState && gameState.units) {
      const tileGx = ndx >> 1;
      const tileGy = ndy;
      let blocked = false;
      for (const u of gameState.units) {
        if (u.gx !== tileGx || u.gy !== tileGy || u.gx < 0) continue;
        if (u.owner === civSlot) continue;
        // Only military units block (attack > 0)
        if ((UNIT_ATK_VIS[u.type] || 0) > 0) {
          blocked = true;
          break;
        }
      }
      if (blocked) continue;
    }

    tileData[idx].visibility |= bit;
  }
}

import { UNIT_SUBMARINE, UNIT_SUB_DETECTOR, UNIT_DOMAIN, UNIT_ATK as UNIT_ATK_VIS } from './defs.js';

/**
 * Check if an enemy submarine is detected by the given civ.
 * H.3: Submarine detection rules (faithful to Civ2):
 *   - A friendly unit on the same tile: always detected
 *   - An adjacent friendly Destroyer/AEGIS Cruiser (UNIT_SUB_DETECTOR): detected
 *   - An adjacent friendly city: detected
 *   - If civ has Sonar tech (not yet tracked): all naval units detect adjacent subs
 *   - Other adjacent naval units do NOT detect subs (unless Sonar)
 *
 * @param {object} sub - submarine unit
 * @param {number} civSlot - detecting civ
 * @param {Array} allUnits - all units in game
 * @param {number} mw - map width
 * @param {boolean} wraps - map wraps
 * @param {Array} [cities] - all cities (for adjacent city detection)
 * @param {boolean} [hasSonar=false] - whether detecting civ has Sonar tech
 */
function isSubDetected(sub, civSlot, allUnits, mw, wraps, cities, hasSonar) {
  // Check adjacent cities (any of this civ's cities within 1 tile)
  if (cities) {
    for (const c of cities) {
      if (c.owner !== civSlot || c.size <= 0) continue;
      const cgx = c.gx != null ? c.gx : c.cx;
      const cgy = c.gy != null ? c.gy : c.cy;
      let dx = Math.abs(cgx - sub.gx);
      if (wraps) dx = Math.min(dx, mw - dx);
      const dy = Math.abs(cgy - sub.gy);
      if (dx + dy <= 1) return true;
    }
  }

  for (const u of allUnits) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    // Same tile: always detected
    if (u.gx === sub.gx && u.gy === sub.gy) return true;
    // Adjacency check (Manhattan distance <= 1 in gx,gy space)
    let dx = Math.abs(u.gx - sub.gx);
    if (wraps) dx = Math.min(dx, mw - dx);
    const dy = Math.abs(u.gy - sub.gy);
    if (dx + dy > 1) continue;
    // Adjacent destroyer/AEGIS: always detect
    if (UNIT_SUB_DETECTOR.has(u.type)) return true;
    // Sonar tech: all naval units detect adjacent subs
    if (hasSonar && (UNIT_DOMAIN[u.type] === 2)) return true;
  }
  return false;
}

/**
 * Filter game state for a specific civ's visibility.
 * Returns a copy with only visible units/cities.
 *
 * H.2: For explored-but-not-visible tiles, send stale snapshot (last-known state)
 *       for cities — hide production, specialists, and current buildings.
 * H.3: Pass cities array for adjacent-city submarine detection.
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
  // Pass mapBase through so computeLOS can read terrain for H.1 elevation boost
  const losInput = { mw, mh, mapShape: mapBase.mapShape, cities: gameState.cities, units: gameState.units };
  // Attach tileData/accessors so unitVisRadius can read terrain
  if (mapBase.tileData) losInput.tileData = mapBase.tileData;
  if (mapBase.getTerrain) losInput.getTerrain = mapBase.getTerrain;
  if (mapBase.getImprovements) losInput.getImprovements = mapBase.getImprovements;
  const los = computeLOS(losInput, civSlot);

  // Filter units: own units always visible, others only in LOS
  // Also apply submarine stealth: enemy subs invisible unless detected
  const units = gameState.units.filter(u => {
    if (u.owner === civSlot) return true;
    if (u.gx < 0) return false;
    const idx = u.gy * mw + ((u.gx % mw + mw) % mw);
    if (los[idx] !== 1) return false;
    // Submarine stealth check (H.3: pass cities for adjacent city detection)
    if (UNIT_SUBMARINE.has(u.type)) {
      return isSubDetected(u, civSlot, gameState.units, mw, mapBase.wraps, gameState.cities);
    }
    return true;
  });

  // Filter cities: visible if tile has been explored
  // H.2: Explored but not in LOS — send stale snapshot (last-known state)
  const cities = [];
  for (const c of gameState.cities) {
    const gx = (c.gx != null) ? c.gx : c.cx;
    const gy = (c.gy != null) ? c.gy : c.cy;
    const idx = gy * mw + ((gx % mw + mw) % mw);
    const vis = mapBase.tileData[idx].visibility;
    if (!(vis & fowBit)) continue; // unexplored, omit
    if (los[idx]) {
      cities.push(c); // in LOS: full info
      // H.2: Update last-known snapshot for this city
      updateLastSeen(gameState, civSlot, c);
    } else {
      // H.2: Explored but not in LOS — send stale/stripped info
      const lastSeen = getLastSeen(gameState, civSlot, gx, gy);
      if (lastSeen) {
        cities.push(lastSeen);
      } else {
        // No last-seen data yet — send minimal info (name, owner, location, last-known size)
        cities.push({
          name: c.name, owner: c.owner, gx: c.gx, gy: c.gy,
          cx: c.cx, cy: c.cy, size: c.size,
          fogOfWar: true,
        });
      }
    }
  }

  // Clone state with filtered arrays, strip other civs' private data
  return {
    ...gameState,
    units,
    cities,
    // Don't send private civ data for other civs (strip treasury, rates, etc.)
    civs: gameState.civs ? gameState.civs.map((civ, i) => {
      if (i === civSlot || i === 0) return civ;
      return { name: civ.name, style: civ.style, government: civ.government, rulesCivNumber: civ.rulesCivNumber };
    }) : null,
  };
}

// ── H.2: Last-seen city snapshot storage ──
// Stores per-civ snapshots of cities when they were last in LOS.
// Uses gameState.lastSeenCities[civSlot] = Map<"gx,gy" → snapshot>

/**
 * Save a stripped snapshot of a city into the civ's last-seen cache.
 * Called when a city is currently in LOS.
 */
function updateLastSeen(gameState, civSlot, city) {
  if (!gameState.lastSeenCities) gameState.lastSeenCities = {};
  if (!gameState.lastSeenCities[civSlot]) gameState.lastSeenCities[civSlot] = {};
  const gx = city.gx != null ? city.gx : city.cx;
  const gy = city.gy != null ? city.gy : city.cy;
  const key = `${gx},${gy}`;
  // Store a minimal snapshot — enough for the client to render, but not revealing current state
  gameState.lastSeenCities[civSlot][key] = {
    name: city.name,
    owner: city.owner,
    gx: city.gx, gy: city.gy,
    cx: city.cx, cy: city.cy,
    size: city.size,
    hasWalls: city.hasWalls,
    fogOfWar: true,
  };
}

/**
 * Retrieve the last-seen snapshot for a city at the given position.
 */
function getLastSeen(gameState, civSlot, gx, gy) {
  if (!gameState.lastSeenCities || !gameState.lastSeenCities[civSlot]) return null;
  return gameState.lastSeenCities[civSlot][`${gx},${gy}`] || null;
}

// ── Terrain generation for newly-revealed tiles ──────────────────

/**
 * Generate terrain for tiles in a 2-tile radius that are ungenerated/unexplored.
 * Called when a unit first reveals new territory (e.g., in fog-of-war games
 * with incremental map generation).
 *
 * For fully pre-generated maps (standard Civ2 behavior), this is a no-op
 * since all tiles are already populated by mapgen.js. This function exists
 * for future support of incremental/lazy map generation where tiles beyond
 * explored regions have placeholder terrain.
 *
 * Terrain is generated deterministically from coordinates + seed so that
 * the same tile always gets the same terrain regardless of reveal order.
 *
 * @param {object} mapBase - map accessor { tileData, mw, mh, wraps }
 * @param {number} gx - center tile gx
 * @param {number} gy - center tile gy
 * @param {number} seed - map seed for deterministic generation
 */
export function generateTerrainAround(mapBase, gx, gy, seed) {
  const { tileData, mw, mh } = mapBase;
  if (!tileData) return;

  // 2-tile radius offsets in doubled-X coordinates
  const OFFSETS = [
    [0,0],
    [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0],
    [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
    [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3],
  ];

  const dx = gx * 2 + (gy % 2);
  const mw2 = mw * 2;
  const wraps = mapBase.wraps ?? (mapBase.mapShape === 0);

  for (const [odx, ody] of OFFSETS) {
    let ndx = dx + odx;
    const ndy = gy + ody;
    if (ndy < 0 || ndy >= mh) continue;
    if (wraps) {
      ndx = ((ndx % mw2) + mw2) % mw2;
    } else if (ndx < 0 || ndx >= mw2) {
      continue;
    }
    const ngx = ndx >> 1;
    const idx = ndy * mw + ngx;
    const tile = tileData[idx];
    if (!tile) continue;

    // Only generate for tiles with terrain === -1 (ungenerated sentinel)
    // Fully generated maps will never have terrain === -1
    if (tile.terrain !== -1) continue;

    // Deterministic terrain from coordinates + seed
    // Formula: terrain = ((gx * 7 + gy * 11 + seed) % 11)
    // This produces all 11 terrain types (0-10) with uniform distribution
    const rawTerrain = ((ngx * 7 + ndy * 11 + seed) % 11);
    tile.terrain = rawTerrain < 0 ? rawTerrain + 11 : rawTerrain;
  }
}
