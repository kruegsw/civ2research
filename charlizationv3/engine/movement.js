// ═══════════════════════════════════════════════════════════════════
// movement.js — Direction resolution & movement cost (shared: server + client)
//
// Isometric map uses doubled-X coordinates (gx = column in half-grid).
// 8-direction movement with proper wrapping.
// ═══════════════════════════════════════════════════════════════════

import { TERRAIN_MOVE_COST, MOVEMENT_MULTIPLIER, UNIT_DOMAIN, UNIT_IGNORE_ZOC, UNIT_MOVE_POINTS, UNIT_HP, UNIT_FUEL, UNIT_CARRY_CAP, UNIT_ROLE, UNIT_ALPINE } from './defs.js';

// ═══════════════════════════════════════════════════════════════════
// C.1: Damage-based movement reduction
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate effective movement points for a unit, accounting for HP damage.
 * Damaged units have reduced MP: baseMP * currentHP / maxHP, rounded up
 * to the nearest MOVEMENT_MULTIPLIER (3) multiple.
 *
 * Per binary FUN_005b2a39 (block_005B0000.c:758-813):
 *   - Air units (domain 1) are EXEMPT from damage-based MP reduction.
 *   - Sea units (domain 2) have a minimum of 2 * MOVEMENT_MULTIPLIER (6).
 *   - Ground units (domain 0) have a minimum of MOVEMENT_MULTIPLIER (3).
 *
 * @param {object} unit - unit object { type, movesRemain (damage_taken in 10x scale) }
 * @param {number} [seaBonus=0] - additional MP from sea bonuses (Lighthouse/Magellan/NuclearPower),
 *        applied BEFORE damage scaling per binary FUN_005b2a39 lines 772-786 then 789-810.
 * @returns {number} effective movement points in movement thirds
 */
export function calcEffectiveMovementPoints(unit, seaBonus = 0) {
  const baseMP = (UNIT_MOVE_POINTS[unit.type] || 1) * MOVEMENT_MULTIPLIER + seaBonus;
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  // Air units (domain 1) are exempt from damage-based MP reduction (C line 790)
  if (domain === 1) return baseMP;

  // No damage taken — return full MP
  const damageTaken = unit.movesRemain || 0;
  if (damageTaken === 0) return baseMP;

  // maxHP is stored pre-multiplied by 10 in the binary (UNIT_HP * 10)
  // movesRemain (damage_taken) is also in the 10x scale
  const maxHP = (UNIT_HP[unit.type] || 1) * 10;
  const currentHP = maxHP - damageTaken;
  if (currentHP <= 0) {
    // Unit should be dead, but return minimum as safety
    const minMP = domain === 2 ? 2 * MOVEMENT_MULTIPLIER : MOVEMENT_MULTIPLIER;
    return minMP;
  }
  if (currentHP >= maxHP) return baseMP;

  // Damaged: scale proportionally using integer division (C line 796)
  const reduced = Math.trunc(currentHP * baseMP / maxHP);

  // Round up to next multiple of MOVEMENT_MULTIPLIER (C lines 797-798)
  const remainder = reduced % MOVEMENT_MULTIPLIER;
  const effectiveMP = remainder !== 0 ? reduced + (MOVEMENT_MULTIPLIER - remainder) : reduced;

  // Sea units (domain 2): minimum 2 MP; ground units (domain 0): minimum 1 MP (C lines 800-804)
  const minMP = domain === 2 ? 2 * MOVEMENT_MULTIPLIER : MOVEMENT_MULTIPLIER;
  return Math.max(effectiveMP, minMP);
}

// ═══════════════════════════════════════════════════════════════════
// C.2: Trireme sinking check
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if a Trireme should sink (per-move check).
 * Triremes (type 32) not adjacent to land have a chance of sinking each move.
 *
 * Per binary FUN_0059062c:
 *   - Base chance: 1 / COSMIC[1] (default denominator = 2, i.e. 50%)
 *   - Navigation (tech 57): doubles denominator (halves chance)
 *   - Magnetism (tech 45): doubles denominator (halves chance)
 *   - Lighthouse (wonder 3) or Magellan's (wonder 12): immune
 *
 * @param {object} unit - the unit to check
 * @param {number} unitIndex - index in units array
 * @param {object} state - game state (needs civTechs, wonders)
 * @param {object} mapBase - map accessor
 * @param {function} hasWonderEffectFn - hasWonderEffect(state, civSlot, wonderIndex)
 * @returns {boolean} true if the unit sinks
 */
export function checkTriremeSinking(unit, unitIndex, state, mapBase, hasWonderEffectFn) {
  // Only triremes (type 32)
  if (unit.type !== 32) return false;
  if (unit.gx < 0) return false;

  // Lighthouse (wonder 3) or Magellan's Expedition (wonder 12) protect
  if (hasWonderEffectFn(state, unit.owner, 3)) return false;
  if (hasWonderEffectFn(state, unit.owner, 12)) return false;

  // Check adjacency to land: any of 8 neighbors is NOT ocean (terrain != 10)
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const terrain = mapBase.getTerrain(nx, ny);
    if (terrain !== 10) return false; // adjacent to land — safe
  }

  // Base denominator: COSMIC[1] (default 2)
  let denominator = 2;

  // Navigation (tech 57): 2x multiplier on denominator (halves sinking chance)
  const civTechs = state.civTechs?.[unit.owner];
  if (civTechs && civTechs.has(57)) denominator *= 2;

  // Magnetism (tech 45): 2x multiplier on denominator (halves sinking chance)
  if (civTechs && civTechs.has(45)) denominator *= 2;

  // Open ocean: 1/denominator chance of sinking
  const roll = state.rng ? state.rng.nextInt(denominator) : Math.floor(Math.random() * denominator);
  return roll === 0;
}

// ═══════════════════════════════════════════════════════════════════
// C.3: Air unit fuel check
// ═══════════════════════════════════════════════════════════════════

/**
 * Check air unit fuel status. Air units away from base lose 1 fuel per turn.
 * At base (city, carrier type 42, airbase tile): fuel resets to max.
 * At fuel 0 away from base: unit crashes.
 *
 * @param {object} unit - the unit to check
 * @param {number} unitIndex - index in units array
 * @param {object} state - game state (needs cities, units)
 * @param {object} mapBase - map accessor
 * @returns {{ crashed: boolean, fuelRemaining: number }} result
 */
export function checkAirFuel(unit, unitIndex, state, mapBase) {
  const maxFuel = UNIT_FUEL[unit.type];
  if (!maxFuel || maxFuel <= 0) return { crashed: false, fuelRemaining: -1 };
  if (unit.gx < 0) return { crashed: false, fuelRemaining: -1 };

  // Check if at a base: city, carrier (type 42), or airbase tile
  const tileIdx = unit.gy * mapBase.mw + unit.gx;
  const tile = mapBase.tileData?.[tileIdx];
  const onAirbase = tile && tile.improvements && tile.improvements.airbase;
  const inCity = state.cities.some(c => c.gx === unit.gx && c.gy === unit.gy && c.owner === unit.owner);
  const onCarrier = state.units.some((v, vi) => vi !== unitIndex && v.gx === unit.gx && v.gy === unit.gy
    && v.owner === unit.owner && v.type === 42 && v.gx >= 0);
  const atBase = onAirbase || inCity || onCarrier;

  if (atBase) {
    return { crashed: false, fuelRemaining: maxFuel };
  }

  // Away from base: decrement fuel
  const currentFuel = (unit.fuelRemaining != null && unit.fuelRemaining >= 0) ? unit.fuelRemaining : maxFuel;
  const newFuel = currentFuel - 1;
  if (newFuel <= 0) {
    return { crashed: true, fuelRemaining: 0 };
  }
  return { crashed: false, fuelRemaining: newFuel };
}

// ═══════════════════════════════════════════════════════════════════
// C.4: Transport capacity check
// ═══════════════════════════════════════════════════════════════════

/**
 * Find a friendly transport at the given ocean tile with available cargo space.
 * Returns the index of the transport unit, or -1 if none available.
 *
 * @param {number} gx - tile gx
 * @param {number} gy - tile gy
 * @param {number} owner - civ slot of the unit wanting to board
 * @param {Array} units - all units array
 * @returns {number} transport unit index, or -1
 */
export function findAvailableTransport(gx, gy, owner, units) {
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.gx !== gx || u.gy !== gy || u.owner !== owner || u.gx < 0) continue;
    if (UNIT_DOMAIN[u.type] !== 2) continue;
    const cap = UNIT_CARRY_CAP[u.type];
    if (!cap || cap <= 0) continue;
    // Count current cargo (land units at same tile owned by same civ)
    let cargo = 0;
    for (const v of units) {
      if (v.gx === gx && v.gy === gy && v.owner === owner && UNIT_DOMAIN[v.type] === 0 && v.gx >= 0) {
        cargo++;
      }
    }
    if (cargo < cap) return i;
  }
  return -1;
}

// Direction offsets in (gx, gy) doubled-X isometric space.
// Even rows: NE/SE shift left, NW/SW shift left.
// Odd rows: NE/SE shift right, NW/SW stay.
const DIR_OFFSETS_EVEN = {
  N:  [ 0, -2], NE: [ 0, -1], E: [ 1,  0], SE: [ 0,  1],
  S:  [ 0,  2], SW: [-1,  1], W: [-1,  0], NW: [-1, -1],
};
const DIR_OFFSETS_ODD = {
  N:  [ 0, -2], NE: [ 1, -1], E: [ 1,  0], SE: [ 1,  1],
  S:  [ 0,  2], SW: [ 0,  1], W: [-1,  0], NW: [ 0, -1],
};

// Numpad key → direction name
export const NUMPAD_DIR = {
  '1': 'SW', '2': 'S', '3': 'SE',
  '4': 'W',            '6': 'E',
  '7': 'NW', '8': 'N', '9': 'NE',
};

/**
 * Resolve a direction from (gx, gy) to the destination tile.
 *
 * @param {number} gx - current column (half-grid)
 * @param {number} gy - current row
 * @param {string} dir - direction name (N, NE, E, SE, S, SW, W, NW)
 * @param {object} mapBase - must have { mw, mh, wraps }
 * @returns {{ gx: number, gy: number }|null} destination or null if off-map
 */
export function resolveDirection(gx, gy, dir, mapBase) {
  const offsets = (gy % 2 === 0) ? DIR_OFFSETS_EVEN : DIR_OFFSETS_ODD;
  const off = offsets[dir];
  if (!off) return null;

  let nx = gx + off[0];
  let ny = gy + off[1];

  // Vertical bounds
  if (ny < 0 || ny >= mapBase.mh) return null;

  // Horizontal wrapping
  if (mapBase.wraps) {
    nx = ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw;
  } else if (nx < 0 || nx >= mapBase.mw) {
    return null;
  }

  return { gx: nx, gy: ny };
}

/**
 * Calculate movement cost for a unit entering a tile.
 * Roads/railroads reduce cost; terrain type determines base cost.
 *
 * @param {number} unitType - unit type ID
 * @param {object} mapBase - accessor functions (getTerrain, getImprovements)
 * @param {number} fromGx - source tile gx
 * @param {number} fromGy - source tile gy
 * @param {number} toGx - destination tile gx
 * @param {number} toGy - destination tile gy
 * @returns {number} cost in internal movement units (0=railroad, 1=road/alpine/river,
 *          MOVEMENT_MULTIPLIER*terrain_cost for full terrain, MOVEMENT_MULTIPLIER for air/sea)
 */
export function moveCost(unitType, mapBase, fromGx, fromGy, toGx, toGy) {
  const domain = UNIT_DOMAIN[unitType] ?? 0;

  // Air units: 1 MP per tile
  if (domain === 1) return MOVEMENT_MULTIPLIER;
  // Sea units: 1 MP per tile
  if (domain === 2) return MOVEMENT_MULTIPLIER;

  const fromImp = mapBase.getImprovements(fromGx, fromGy);
  const toImp = mapBase.getImprovements(toGx, toGy);

  // Priority order per binary FUN_0059062c lines 681-694:
  // 1. Railroad (cost 0), 2. Alpine (cost 1), 3. Road (cost 1), 4. River (cost 1), 5. Terrain

  // 1. Railroad: both tiles have railroad → 0 cost (free move) (C line 681, 706)
  if (fromImp.railroad && toImp.railroad) return 0;

  // 2. Alpine flag: all terrain costs 1 internal unit (C line 682, 702)
  // Same cost as road (1/3 MP), but applies even without roads
  if (UNIT_ALPINE.has(unitType)) return 1;

  // 3. Road: both tiles connected by road/railroad → 1 internal unit (C line 683, 698)
  const dgy = toGy - fromGy;
  const isDiagonal = (dgy === 1 || dgy === -1);
  const fromHasRoad = fromImp.road || fromImp.railroad;
  const toHasRoad = toImp.road || toImp.railroad;
  if (fromHasRoad && toHasRoad) return 1;

  // 4. River crossing: both tiles have river AND diagonal adjacency (C lines 684-692, 698)
  if (isDiagonal && mapBase.hasRiver(fromGx, fromGy) && mapBase.hasRiver(toGx, toGy)) return 1;

  // 5. Full terrain cost (C line 694)
  const terrain = mapBase.getTerrain(toGx, toGy);
  return (TERRAIN_MOVE_COST[terrain] ?? 1) * MOVEMENT_MULTIPLIER;
}

/**
 * Get direction from one tile to an adjacent tile.
 * Returns null if tiles are not adjacent.
 *
 * @param {number} fromGx
 * @param {number} fromGy
 * @param {number} toGx
 * @param {number} toGy
 * @param {object} [mapBase] - optional, for wrapping support { mw, wraps }
 * @returns {string|null} direction name or null
 */
export function getDirection(fromGx, fromGy, toGx, toGy, mapBase) {
  const offsets = (fromGy % 2 === 0) ? DIR_OFFSETS_EVEN : DIR_OFFSETS_ODD;
  const dgx = toGx - fromGx;
  const dgy = toGy - fromGy;
  for (const [dir, [ox, oy]] of Object.entries(offsets)) {
    if (ox === dgx && oy === dgy) return dir;
  }
  // Check wrap-around adjacency
  if (mapBase?.wraps && mapBase.mw) {
    for (const [dir, [ox, oy]] of Object.entries(offsets)) {
      if (oy !== dgy) continue;
      if (((dgx % mapBase.mw) + mapBase.mw) % mapBase.mw === ((ox % mapBase.mw) + mapBase.mw) % mapBase.mw) return dir;
    }
  }
  return null;
}

/**
 * Pick the closest of the 8 compass directions for an arbitrary (dx, dy)
 * delta. Sign-clamps both deltas to {-1, 0, 1} then finds the matching
 * direction index.
 *
 * Binary ref: FUN_004abea0 (block_004A0000.c:3634-3695, "direction_from_delta").
 * Used by binary's pathfinder as a geometric fallback when targets are
 * non-adjacent. Returns 0..7 (N=0, NE=1, E=2, SE=3, S=4, SW=5, W=6, NW=7),
 * or 8 as the "no direction" sentinel (which only happens for dx=dy=0,
 * matching the C function's `local_c = 8` initial value).
 *
 * @param {number} dx - x delta (any sign/magnitude)
 * @param {number} dy - y delta (any sign/magnitude)
 * @returns {number} direction index 0..7, or 8 if dx==dy==0
 */
// Sign tables: dx[i], dy[i] for direction index i.
// These mirror the binary's DAT_00628350/DAT_00628360 byte tables AFTER
// sign-clamping to {-1, 0, 1}, ordered N, NE, E, SE, S, SW, W, NW.
const DIR_FROM_DELTA_DX_SIGN = [ 0, 1, 1, 1, 0, -1, -1, -1];
const DIR_FROM_DELTA_DY_SIGN = [-1,-1, 0, 1, 1,  1,  0, -1];
export function directionFromDelta(dx, dy) {
  const sx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
  const sy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
  let result = 8;
  for (let i = 0; i < 8; i++) {
    if (DIR_FROM_DELTA_DX_SIGN[i] === sx && DIR_FROM_DELTA_DY_SIGN[i] === sy) {
      result = i;
    }
  }
  return result;
}

/**
 * Check if movement from→to is blocked by Zone of Control.
 * Per binary FUN_005b4c63: ALL foreign non-allied units exert ZOC (no unit type filter).
 * ZOC rule: if a unit is adjacent to an enemy unit, it can only move to:
 *   - tiles with friendly units/cities, OR
 *   - tiles NOT adjacent to enemy units
 * Units with UNIT_IGNORE_ZOC=1 (flags_lo & 0x02) skip this check.
 *
 * @param {number} unitType - unit type ID
 * @param {number} owner - civ slot of the moving unit
 * @param {number} fromGx - source tile gx
 * @param {number} fromGy - source tile gy
 * @param {number} toGx - destination tile gx
 * @param {number} toGy - destination tile gy
 * @param {object} mapBase - map accessor object (needs getNeighbors, tileData)
 * @param {Array} units - all units array
 * @returns {boolean} true if movement is blocked by ZOC
 */
export function isZOCBlocked(unitType, owner, fromGx, fromGy, toGx, toGy, mapBase, units) {
  // Units that ignore ZOC
  if (UNIT_IGNORE_ZOC[unitType]) return false;

  // Binary FUN_005b4d8c: city at tile → no ZOC. Move is rejected only if
  // BOTH source AND destination are ZOC'd. City at source always passes,
  // so units leaving a city are never ZOC-blocked.
  if (hasCityAt(fromGx, fromGy, mapBase)) return false;

  const domain = UNIT_DOMAIN[unitType] ?? 0;

  // Check if 'from' tile is adjacent to enemy combat unit of same domain
  const fromNeighbors = mapBase.getNeighbors(fromGx, fromGy);
  let fromAdjacentToEnemy = false;
  for (const dir in fromNeighbors) {
    const [nx, ny] = fromNeighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    if (hasEnemyUnit(nx, ny, owner, domain, units)) {
      fromAdjacentToEnemy = true;
      break;
    }
  }

  // If not adjacent to enemy, ZOC doesn't restrict
  if (!fromAdjacentToEnemy) return false;

  // We're adjacent to enemy — check if destination is a city (any city bypasses ZOC)
  // or has friendly presence (own unit or own city)
  // In Civ2, units can always enter any city tile regardless of ZOC
  if (hasCityAt(toGx, toGy, mapBase)) return false;
  if (hasFriendlyPresence(toGx, toGy, owner, units, mapBase)) return false;

  // Check if destination is adjacent to enemy combat unit
  const toNeighbors = mapBase.getNeighbors(toGx, toGy);
  for (const dir in toNeighbors) {
    const [nx, ny] = toNeighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    if (hasEnemyUnit(nx, ny, owner, domain, units)) {
      return true; // blocked by ZOC
    }
  }

  return false;
}

/**
 * Check if any foreign (non-allied) unit exists at the given tile.
 * Per binary FUN_005b4c63 (block_005B0000.c:1831-1854), ZOC is exerted by
 * ALL foreign non-allied units regardless of unit type — there is no attack
 * strength filter. The domain check uses tile terrain (ocean vs non-ocean),
 * not unit domain. We approximate this by checking UNIT_DOMAIN match since
 * land units are on land tiles and sea units on sea tiles.
 */
function hasEnemyUnit(gx, gy, owner, domain, units) {
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner !== owner && u.gx >= 0
        && UNIT_DOMAIN[u.type] === domain) {
      return true;
    }
  }
  return false;
}

/** Check if any city exists at the given tile (any owner). */
function hasCityAt(gx, gy, mapBase) {
  if (!mapBase.tileData) return false;
  const idx = gy * mapBase.mw + gx;
  const tile = mapBase.tileData[idx];
  return tile && tile.improvements && tile.improvements.city;
}

function hasFriendlyPresence(gx, gy, owner, units, mapBase) {
  // Check for friendly unit
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner === owner && u.gx >= 0) return true;
  }
  // Check for friendly city
  if (mapBase.tileData) {
    const idx = gy * mapBase.mw + gx;
    const tile = mapBase.tileData[idx];
    if (tile && tile.improvements && tile.improvements.city) {
      if (tile.tileOwnership === owner) return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// C.6: Paradrop validation and scatter
// Port of FUN_004ca39e (airdrop/paradrop mechanics)
// ═══════════════════════════════════════════════════════════════════

/**
 * Validate whether a paradrop is legal for the given unit and target.
 * Checks range (Manhattan distance <= paradropRange), land tile,
 * and no enemy units on target.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @param {number} unitIndex - index of the paratroop unit
 * @param {number} targetGx - target tile gx
 * @param {number} targetGy - target tile gy
 * @param {number} [paradropRange=10] - max Manhattan distance
 * @returns {{ valid: boolean, reason: string }}
 */
export function validateParadrop(state, mapBase, unitIndex, targetGx, targetGy, paradropRange = 10) {
  const unit = state.units?.[unitIndex];
  if (!unit || unit.gx < 0) return { valid: false, reason: 'Unit does not exist' };

  // Only Paratroopers (type 13) can paradrop
  if (unit.type !== 13) return { valid: false, reason: 'Only Paratroopers can paradrop' };

  // Must have moves remaining
  if (unit.movesLeft <= 0) return { valid: false, reason: 'No moves remaining' };

  // Range check: Manhattan distance with wrapping
  let dx = Math.abs(unit.gx - targetGx);
  if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
  const dy = Math.abs(unit.gy - targetGy);
  if (dx + dy > paradropRange) return { valid: false, reason: 'Target out of range' };

  // Target must be a land tile (terrain !== 10 = Ocean)
  const terrain = mapBase.getTerrain(targetGx, targetGy);
  if (terrain === 10) return { valid: false, reason: 'Cannot paradrop onto ocean' };

  // No enemy units on target tile
  const owner = unit.owner;
  for (const u of state.units) {
    if (u.gx === targetGx && u.gy === targetGy && u.owner !== owner && u.gx >= 0) {
      // If enemy city present, check peace treaty
      const enemyCity = state.cities?.find(
        c => c.gx === targetGx && c.gy === targetGy && c.owner === u.owner && c.size > 0);
      if (enemyCity && state.treatyFlags) {
        const key = `${owner}-${u.owner}`;
        const flags = state.treatyFlags[key] || 0;
        // Peace treaty mask 0x0E = ceasefire(0x02) | peace(0x04) | alliance(0x08)
        if (flags & 0x0E) {
          return { valid: false, reason: 'Peace treaty prevents paradrop near enemy city' };
        }
      }
      return { valid: false, reason: 'Enemy units at target' };
    }
  }

  return { valid: true, reason: '' };
}

/**
 * Resolve paradrop landing scatter — selects the best adjacent tile for landing.
 * Port of FUN_004ca39e scatter logic:
 *   Score 8 adjacent tiles: base = rand() % 6, +3 if diagonal, +200 if empty (no city).
 *   Pick highest scoring tile. Returns landing coordinates.
 *
 * @param {object} state - game state (for city check)
 * @param {object} mapBase - map accessor (getNeighbors, getTerrain)
 * @param {number} targetGx - intended target tile gx
 * @param {number} targetGy - intended target tile gy
 * @param {{ nextInt: function }} rng - random number generator
 * @returns {{ gx: number, gy: number }} landing coordinates
 */
export function resolveParadropScatter(state, mapBase, targetGx, targetGy, rng) {
  const neighbors = mapBase.getNeighbors(targetGx, targetGy);
  // Direction order: N, NE, E, SE, S, SW, W, NW
  // Diagonal directions: NE, SE, SW, NW (both dx and dy offsets are nonzero)
  const dirOrder = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const diagonalDirs = new Set(['NE', 'SE', 'SW', 'NW']);

  let bestScore = -1;
  let bestGx = targetGx;
  let bestGy = targetGy;

  for (const dir of dirOrder) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;

    // Must be land (terrain !== 10)
    const terrain = mapBase.getTerrain(nx, ny);
    if (terrain === 10) continue;

    // Base random score: rand() % 6
    const baseScore = rng.nextInt(6);
    let score = baseScore;

    // Diagonal bonus: +3
    if (diagonalDirs.has(dir)) score += 3;

    // Empty city bonus: +200 if no city on this tile
    const hasCity = state.cities?.some(
      c => c.gx === nx && c.gy === ny && c.size > 0);
    if (!hasCity) score += 200;

    if (score > bestScore) {
      bestScore = score;
      bestGx = nx;
      bestGy = ny;
    }
  }

  return { gx: bestGx, gy: bestGy };
}

// ═══════════════════════════════════════════════════════════════════
// C.7: Two-pass ship cargo loading
// ═══════════════════════════════════════════════════════════════════

/**
 * Load ground and air units onto a ship using the Civ2 two-pass algorithm:
 *   Pass 1: load air units first (domain === 1)
 *   Pass 2: load ground units (domain === 0)
 * Respects the ship's cargo capacity (UNIT_CARRY_CAP).
 *
 * Units that are loaded have their position set to the ship's position.
 * Only loads units at the same tile owned by the same civ.
 *
 * @param {object} state - mutable game state (units array)
 * @param {number} shipIndex - index of the transport ship in state.units
 * @param {number} gx - tile gx to load from
 * @param {number} gy - tile gy to load from
 * @returns {{ loaded: number[] }} indices of units that were loaded
 */
export function loadUnitsOntoShip(state, shipIndex, gx, gy) {
  const ship = state.units[shipIndex];
  if (!ship || ship.gx < 0) return { loaded: [] };

  const cap = UNIT_CARRY_CAP[ship.type];
  if (!cap || cap <= 0) return { loaded: [] };

  const owner = ship.owner;
  const loaded = [];

  // Count current cargo already aboard (units at ship's position, owned by same civ,
  // that are land or air domain and not the ship itself)
  let currentCargo = 0;
  for (let i = 0; i < state.units.length; i++) {
    if (i === shipIndex) continue;
    const u = state.units[i];
    if (u.gx === ship.gx && u.gy === ship.gy && u.owner === owner && u.gx >= 0) {
      const d = UNIT_DOMAIN[u.type] ?? 0;
      if (d === 0 || d === 1) currentCargo++;
    }
  }

  // #121: Two-pass loading priority — goto-targeted units first, then non-sentried ground units.
  // Within each pass, own units load before allied units.
  // Helper to check if a unit's owner is allied with the ship owner
  const isAllied = (unitOwner) => {
    if (unitOwner === owner) return false; // handled in own-units pass
    if (!state.treaties) return false;
    const key = owner < unitOwner ? `${owner}-${unitOwner}` : `${unitOwner}-${owner}`;
    return state.treaties[key] === 'alliance';
  };

  // Helper to load a unit onto the ship
  const loadUnit = (i) => {
    const u = state.units[i];
    state.units[i] = {
      ...u,
      gx: ship.gx, gy: ship.gy,
      x: ship.gx * 2 + (ship.gy % 2), y: ship.gy,
    };
    loaded.push(i);
    currentCargo++;
  };

  // Helper to check if a unit is a candidate for loading at this tile
  const isCandidate = (i, u) => {
    if (i === shipIndex) return false;
    if (u.gx !== gx || u.gy !== gy || u.gx < 0) return false;
    const d = UNIT_DOMAIN[u.type] ?? 0;
    return d === 0 || d === 1; // ground or air
  };

  // Pass 1: Goto-targeted units (units with active goto orders) — prioritized for loading
  // Own goto-targeted units first
  for (let i = 0; i < state.units.length; i++) {
    if (currentCargo >= cap) break;
    const u = state.units[i];
    if (u.owner !== owner) continue;
    if (!isCandidate(i, u)) continue;
    if (u.orders !== 'goto' || u.goToX == null || u.goToY == null) continue;
    loadUnit(i);
  }
  // Allied goto-targeted units
  for (let i = 0; i < state.units.length; i++) {
    if (currentCargo >= cap) break;
    const u = state.units[i];
    if (u.owner === owner || !isAllied(u.owner)) continue;
    if (!isCandidate(i, u)) continue;
    if (u.orders !== 'goto' || u.goToX == null || u.goToY == null) continue;
    if (loaded.includes(i)) continue;
    loadUnit(i);
  }

  // Pass 2: Non-sentried ground/air units (skip sentry units — they're waiting deliberately)
  // Own non-sentried units first
  for (let i = 0; i < state.units.length; i++) {
    if (currentCargo >= cap) break;
    const u = state.units[i];
    if (u.owner !== owner) continue;
    if (!isCandidate(i, u)) continue;
    if (loaded.includes(i)) continue;
    if (u.orders === 'sentry') continue; // skip sentried units
    loadUnit(i);
  }
  // Allied non-sentried units
  for (let i = 0; i < state.units.length; i++) {
    if (currentCargo >= cap) break;
    const u = state.units[i];
    if (u.owner === owner || !isAllied(u.owner)) continue;
    if (!isCandidate(i, u)) continue;
    if (loaded.includes(i)) continue;
    if (u.orders === 'sentry') continue;
    loadUnit(i);
  }

  return { loaded };
}

// ═══════════════════════════════════════════════════════════════════
// C.8: Tile trespass check (block 0x0053)
//
// When a unit moves into territory owned by another civ, check
// if this constitutes a trespass (diplomatic incident).
// Trespass occurs when: tile is owned by another civ AND we have
// peace (not war, not alliance) with them.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if moving to (gx, gy) constitutes a trespass into another civ's territory.
 *
 * @param {object} state - game state (needs treaties)
 * @param {object} mapBase - map accessor (tileData, mw)
 * @param {number} civSlot - the moving unit's owner civ
 * @param {number} gx - target tile gx
 * @param {number} gy - target tile gy
 * @returns {{ trespass: boolean, ownerCiv: number }}
 */
export function checkTrespass(state, mapBase, civSlot, gx, gy) {
  if (!mapBase.tileData) return { trespass: false, ownerCiv: -1 };

  const tileIdx = gy * mapBase.mw + gx;
  const tile = mapBase.tileData[tileIdx];
  if (!tile) return { trespass: false, ownerCiv: -1 };

  const ownerCiv = tile.tileOwnership;
  // No owner, same owner, or barbarian territory (0) — no trespass
  if (ownerCiv == null || ownerCiv === civSlot || ownerCiv === 0 || ownerCiv === 0x0F) {
    return { trespass: false, ownerCiv: -1 };
  }

  // Check treaty status: trespass only during peace or ceasefire (not war, not alliance)
  if (!state.treaties) return { trespass: false, ownerCiv: -1 };
  const key = civSlot < ownerCiv ? `${civSlot}-${ownerCiv}` : `${ownerCiv}-${civSlot}`;
  const treaty = state.treaties[key];

  if (treaty === 'peace' || treaty === 'ceasefire') {
    return { trespass: true, ownerCiv };
  }

  return { trespass: false, ownerCiv: -1 };
}

// ═══════════════════════════════════════════════════════════════════
// ROAD_CONNECTIVITY — port of FUN_00488a45 (682 bytes)
//
// BFS/A* pathfinding using only road/railroad tiles to check if
// two map positions are connected by road infrastructure.
// Used for trade route validation (Caravans/Freight).
// ═══════════════════════════════════════════════════════════════════

/**
 * Check road/railroad connectivity between two map positions.
 * Port of FUN_00488a45 (ROAD_CONNECTIVITY).
 *
 * Uses BFS over road/railroad/city tiles with a maximum of 50 steps
 * and a maximum tile distance of 23.
 *
 * @param {object} mapBase - map accessor { mw, mh, wraps, getImprovements, getTerrain }
 * @param {number} fromGx - start gx
 * @param {number} fromGy - start gy
 * @param {number} toGx - destination gx
 * @param {number} toGy - destination gy
 * @returns {number} 0 = no connection, 1 = railroad only, 2 = road connection
 */
export function checkRoadConnection(mapBase, fromGx, fromGy, toGx, toGy) {
  if (fromGx === toGx && fromGy === toGy) return 1; // same tile

  const MAX_STEPS = 50;
  const MAX_DISTANCE = 23;
  const mw = mapBase.mw;
  const mh = mapBase.mh;

  // Distance check: reject if farther than 23 tiles
  let initDx = Math.abs(toGx - fromGx);
  if (mapBase.wraps) initDx = Math.min(initDx, mw - initDx);
  const initDy = Math.abs(toGy - fromGy);
  if (initDx + initDy > MAX_DISTANCE) return 0;

  // Check that both endpoints have roads/railroads/city
  function hasRoadOrCity(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    const imp = mapBase.getImprovements(gx, gy);
    return imp.road || imp.railroad || imp.city;
  }

  if (!hasRoadOrCity(fromGx, fromGy) || !hasRoadOrCity(toGx, toGy)) return 0;

  // BFS over road-connected tiles
  const keyFn = (x, y) => y * mw + ((x % mw + mw) % mw);
  const goalKey = keyFn(toGx, toGy);

  const visited = new Map(); // key → true
  const startKey = keyFn(fromGx, fromGy);
  visited.set(startKey, true);

  // Track whether the path uses any road (not just railroad)
  const hasRoadOnPath = new Map(); // key → boolean (true if any step used road, not railroad)
  hasRoadOnPath.set(startKey, false);

  const queue = [{ x: fromGx, y: fromGy }];
  let head = 0;
  let steps = 0;

  while (head < queue.length && steps < MAX_STEPS) {
    const cur = queue[head++];
    const curKey = keyFn(cur.x, cur.y);
    steps++;

    // Check if we reached the goal
    if (curKey === goalKey) {
      // Return 1 if railroad-only, 2 if any road segment used
      return hasRoadOnPath.get(curKey) ? 2 : 1;
    }

    // Current tile improvements
    const curImp = mapBase.getImprovements(cur.x, cur.y);
    const curHasConnection = curImp.road || curImp.railroad || curImp.city;
    if (!curHasConnection) continue;

    // Expand 8 neighbors
    const offsets = (cur.y % 2 === 0) ? DIR_OFFSETS_EVEN : DIR_OFFSETS_ODD;
    for (const dir in offsets) {
      const [ox, oy] = offsets[dir];
      let nx = cur.x + ox;
      const ny = cur.y + oy;

      if (ny < 0 || ny >= mh) continue;
      if (mapBase.wraps) {
        nx = ((nx % mw) + mw) % mw;
      } else if (nx < 0 || nx >= mw) {
        continue;
      }

      const nKey = keyFn(nx, ny);
      if (visited.has(nKey)) continue;

      // Neighbor must have road/railroad/city
      const nImp = mapBase.getImprovements(nx, ny);
      const nHasRoad = nImp.road || nImp.railroad || nImp.city;
      if (!nHasRoad) continue;

      visited.set(nKey, true);

      // Track if this step uses a road (not purely railroad)
      const curRoad = hasRoadOnPath.get(curKey) || false;
      const stepUsesRoad = !curImp.railroad || !nImp.railroad; // if either lacks railroad, it's a road step
      hasRoadOnPath.set(nKey, curRoad || (stepUsesRoad && !nImp.city && !curImp.city));

      queue.push({ x: nx, y: ny });
    }
  }

  return 0; // no road-connected path found
}
