// ═══════════════════════════════════════════════════════════════════
// ai/barbarian.js — Barbarian unit AI
//
// Ported from Civ2 FUN_005351aa (barbarian AI master function).
// Barbarians (owner=0) use a simpler AI than regular civs:
//   - Non-combat units: try to found city, disband after 30 turns
//   - Combat units: rush adjacent undefended cities, or target
//     highest-value city by (size+50)/(distance+1), or wander
//     using scored directional movement
//
// Each barbarian unit gets at most ONE action per turn.
// ═══════════════════════════════════════════════════════════════════

import { resolveDirection } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_ROLE, UNIT_NAMES,
  BUSY_ORDERS,
} from '../defs.js';

// ── Constants ─────────────────────────────────────────────────────

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/** Non-combat settler timeout in turns before disbanding. */
const SETTLER_TIMEOUT = 30;

// ── Geometry helpers ──────────────────────────────────────────────

function wrapX(gx, mapBase) {
  if (!mapBase.wraps) return gx;
  return ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
}

function tileDist(gx1, gy1, gx2, gy2, mapBase) {
  const dx1 = gx1 * 2 + (gy1 % 2);
  const dx2 = gx2 * 2 + (gy2 % 2);
  let ddx = Math.abs(dx1 - dx2);
  if (mapBase.wraps) {
    const mw2 = mapBase.mw * 2;
    ddx = Math.min(ddx, mw2 - ddx);
  }
  return ddx + Math.abs(gy1 - gy2);
}

function inBounds(gx, gy, mapBase) {
  if (gy < 0 || gy >= mapBase.mh) return false;
  const wgx = wrapX(gx, mapBase);
  return wgx >= 0 && wgx < mapBase.mw;
}

// ── Tile query helpers ────────────────────────────────────────────

/** Find a city at the given tile coordinates, or null. */
function cityAt(gameState, gx, gy) {
  for (const city of gameState.cities) {
    if (city && city.size > 0 && city.gx === gx && city.gy === gy) return city;
  }
  return null;
}

/** Find the top unit owner on a tile. Returns owner (0-7) or -1 if none. */
function topUnitOwner(gameState, gx, gy) {
  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx === gx && u.gy === gy && u.gx >= 0) return u.owner;
  }
  return -1;
}

/** Check if there are any enemy units on a tile (owner != barbarians). */
function hasEnemyUnits(gameState, gx, gy) {
  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx === gx && u.gy === gy && u.gx >= 0 && u.owner !== 0) return true;
  }
  return false;
}

/** Check if there are any friendly (barbarian) units on a tile. */
function hasFriendlyUnits(gameState, gx, gy, excludeIndex) {
  for (let i = 0; i < gameState.units.length; i++) {
    if (i === excludeIndex) continue;
    const u = gameState.units[i];
    if (u.gx === gx && u.gy === gy && u.gx >= 0 && u.owner === 0) return true;
  }
  return false;
}

// ── Directional sign helper ───────────────────────────────────────

/** Map a signed dx/dy delta component to -1, 0, or 1. */
function signOf(v) {
  if (v > 0) return 1;
  if (v < 0) return -1;
  return 0;
}

// ── Direction offset tables ───────────────────────────────────────
//
// These mirror DAT_00628350 / DAT_00628360 from the decompiled code.
// They give dx,dy offsets in doubled-X isometric space for each of
// the 8 directions (indexed 0-7 matching DIRECTIONS[]).
//
// In the original Civ2 code the neighbor calculation is:
//   newX = wrapX(DAT_00628350[dir] + gx)
//   newY = DAT_00628360[dir] + gy
//
// We use resolveDirection() instead, which handles the even/odd row
// parity properly. But for the direction-component matching in movement
// scoring, we need the raw dx/dy signs per direction.

/** X-component sign for each direction index (0=N..7=NW). */
const DIR_DX_SIGN = [0, 1, 1, 1, 0, -1, -1, -1]; // N NE E SE S SW W NW
/** Y-component sign for each direction index. */
const DIR_DY_SIGN = [-1, -1, 0, 1, 1, 1, 0, -1]; // N NE E SE S SW W NW

// ── Core barbarian AI ─────────────────────────────────────────────

/**
 * Generate actions for all barbarian units (owner=0).
 *
 * @param {object} gameState - current mutable game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {Array<string>|null} [debugLog=null] - if non-null, push debug strings here
 * @returns {Array<object>} array of validated actions
 */
export function generateBarbarianActions(gameState, mapBase, debugLog = null) {
  const actions = [];

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Only process living barbarian units with moves remaining
    if (unit.owner !== 0) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;

    // Skip units already busy with orders (but not goto — we re-evaluate targets)
    if (BUSY_ORDERS.has(unit.orders) && unit.orders !== 'goto') continue;

    const action = barbarianUnitAI(unit, i, gameState, mapBase, debugLog);
    if (action) {
      const err = validateAction(gameState, mapBase, action, 0);
      if (!err) {
        actions.push(action);
        if (debugLog) {
          debugLog.push(`[barb] unit ${i} (${UNIT_NAMES[unit.type]}): ${action.type}${action.dir ? ' ' + action.dir : ''}${action.order ? ' ' + action.order : ''}`);
        }
      } else if (debugLog) {
        debugLog.push(`[barb] unit ${i} (${UNIT_NAMES[unit.type]}): REJECTED ${action.type} — ${err}`);
      }
    }
  }

  return actions;
}

/**
 * Decide a single action for one barbarian unit.
 * Ported from FUN_005351aa.
 *
 * @param {object} unit - the barbarian unit
 * @param {number} unitIndex - index in gameState.units
 * @param {object} gameState
 * @param {object} mapBase
 * @param {Array<string>|null} debugLog
 * @returns {object|null} action to take, or null
 */
function barbarianUnitAI(unit, unitIndex, gameState, mapBase, debugLog) {
  const unitType = unit.type;
  const role = UNIT_ROLE[unitType] ?? 0;
  const domain = UNIT_DOMAIN[unitType] ?? 0;
  const gx = unit.gx;
  const gy = unit.gy;

  // ── Boundary check: disband if near map edge ──
  // Original: if gy < 2 or gy >= mapHeight - 2, disband
  if (gy < 2 || gy >= mapBase.mh - 2) {
    return { type: 'UNIT_ORDER', unitIndex, order: 'disband' };
  }

  // ── Non-combat units (settlers, engineers, etc.) ──
  // UNIT_ROLE != 0 means not a pure combat unit; in the decompiled code
  // this corresponds to (&DAT_0064b1c9)[type*0x14] != '\0'
  if (role !== 0) {
    return barbarianNonCombatAI(unit, unitIndex, gameState, mapBase, debugLog);
  }

  // ── Combat unit AI ──
  return barbarianCombatAI(unit, unitIndex, gameState, mapBase, debugLog);
}

/**
 * Non-combat barbarian unit AI (settlers, etc.).
 * - Increment a counter; if counter > 30, disband.
 * - Otherwise try to found a city (BUILD_CITY) if conditions are met.
 * - If not, try to move toward an empty tile to found.
 *
 * In the decompiled code this tracks (&DAT_006560fd)[idx * 0x20] as a
 * counter. We approximate this with a simple check: if no good spot
 * to build, disband.
 */
function barbarianNonCombatAI(unit, unitIndex, gameState, mapBase, debugLog) {
  const gx = unit.gx;
  const gy = unit.gy;

  // Try to found a city at current location
  const buildAction = { type: 'BUILD_CITY', unitIndex };
  const buildErr = validateAction(gameState, mapBase, buildAction, 0);
  if (!buildErr) {
    if (debugLog) debugLog.push(`[barb] settler ${unitIndex}: founding city`);
    return buildAction;
  }

  // Try to move to an adjacent land tile that could be a city site
  for (let d = 0; d < 8; d++) {
    const dir = DIRECTIONS[d];
    const dest = resolveDirection(gx, gy, dir, mapBase);
    if (!dest) continue;
    if (!inBounds(dest.gx, dest.gy, mapBase)) continue;

    const terrain = mapBase.getTerrain(dest.gx, dest.gy);
    if (terrain === 10) continue; // skip ocean

    // Don't move into enemy units
    if (hasEnemyUnits(gameState, dest.gx, dest.gy)) continue;

    // Check if we could build there
    const moveAction = { type: 'MOVE_UNIT', unitIndex, dir };
    const moveErr = validateAction(gameState, mapBase, moveAction, 0);
    if (!moveErr) return moveAction;
  }

  // No valid move found — disband (timeout equivalent)
  if (debugLog) debugLog.push(`[barb] settler ${unitIndex}: disbanding (stuck)`);
  return { type: 'UNIT_ORDER', unitIndex, order: 'disband' };
}

/**
 * Combat barbarian unit AI.
 * Priority order:
 *   1. Attack adjacent enemy unit (always attack regardless of odds)
 *   2. Rush adjacent undefended enemy city on same continent
 *   3. Target best city by (size+50)/(distance+1) score
 *   4. Scored directional movement toward target or wandering
 */
function barbarianCombatAI(unit, unitIndex, gameState, mapBase, debugLog) {
  const gx = unit.gx;
  const gy = unit.gy;
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(gx, gy) : -1;

  // ── 1. Attack adjacent enemy units (always attack) ──
  const attackAction = tryAttackAdjacent(unit, unitIndex, gameState, mapBase);
  if (attackAction) {
    if (debugLog) debugLog.push(`[barb] ${UNIT_NAMES[unit.type]} ${unitIndex}: attacking adjacent`);
    return attackAction;
  }

  // ── 2. Rush adjacent undefended enemy city ──
  const rushAction = tryRushAdjacentCity(unit, unitIndex, gameState, mapBase, unitBodyId, debugLog);
  if (rushAction) return rushAction;

  // ── 3. Target best city and move toward it ──
  const targetAction = tryTargetBestCity(unit, unitIndex, gameState, mapBase, unitBodyId, debugLog);
  if (targetAction) return targetAction;

  // ── 4. Scored directional movement (wandering) ──
  return scoredMovement(unit, unitIndex, gameState, mapBase, unitBodyId, null, debugLog);
}

/**
 * Try to attack any adjacent enemy unit. Barbarians always attack.
 * Returns MOVE_UNIT action toward the enemy, or null.
 */
function tryAttackAdjacent(unit, unitIndex, gameState, mapBase) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  for (let d = 0; d < 8; d++) {
    const dir = DIRECTIONS[d];
    const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
    if (!dest) continue;

    // Domain check: land units can't enter ocean, sea can't enter land
    // (except when attacking — but Civ2 barbarians don't do naval combat
    // against units on land, so respect domains)
    const terrain = mapBase.getTerrain(dest.gx, dest.gy);
    if (domain === 0 && terrain === 10) continue;
    if (domain === 2 && terrain !== 10) continue;

    // Check for enemy units on the tile
    for (const u of gameState.units) {
      if (u.gx === dest.gx && u.gy === dest.gy && u.gx >= 0 && u.owner !== 0) {
        // Found an enemy — attack (barbarians always attack regardless of odds)
        const action = { type: 'MOVE_UNIT', unitIndex, dir };
        const err = validateAction(gameState, mapBase, action, 0);
        if (!err) return action;
      }
    }
  }
  return null;
}

/**
 * Try to rush an adjacent undefended enemy city on the same continent.
 * Ported from the inner loop of FUN_005351aa that checks 8 neighbors
 * for cities with topUnitOwner > 0.
 */
function tryRushAdjacentCity(unit, unitIndex, gameState, mapBase, unitBodyId, debugLog) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  for (let d = 0; d < 8; d++) {
    const dir = DIRECTIONS[d];
    const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
    if (!dest) continue;
    if (!inBounds(dest.gx, dest.gy, mapBase)) continue;

    const terrain = mapBase.getTerrain(dest.gx, dest.gy);
    if (domain === 0 && terrain === 10) continue;
    if (domain === 2 && terrain !== 10) continue;

    const city = cityAt(gameState, dest.gx, dest.gy);
    if (!city || city.owner === 0) continue;

    // Check city owner is alive
    if (!(gameState.civsAlive & (1 << city.owner))) continue;

    // Same continent check (for land units)
    if (domain === 0 && unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(dest.gx, dest.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
    }

    // Move toward the city (this triggers combat if defenders present,
    // or captures if undefended)
    const action = { type: 'MOVE_UNIT', unitIndex, dir };
    const err = validateAction(gameState, mapBase, action, 0);
    if (!err) {
      if (debugLog) debugLog.push(`[barb] ${UNIT_NAMES[unit.type]} ${unitIndex}: rushing city at (${dest.gx},${dest.gy})`);
      return action;
    }
  }

  return null;
}

/**
 * Scan all cities and pick the best target by (size + 50) / (distance + 1).
 * Must be on the same continent. Move toward best target.
 *
 * Ported from FUN_005351aa lines ~1403-1440.
 */
function tryTargetBestCity(unit, unitIndex, gameState, mapBase, unitBodyId, debugLog) {
  const gx = unit.gx;
  const gy = unit.gy;
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  let bestScore = 0;
  let bestCity = null;

  // Get unit's bodyId for same-continent filtering
  let unitContinent = -1;
  if (domain === 0) {
    // Check if unit is on a city tile to get continent
    const onCity = cityAt(gameState, gx, gy);
    if (onCity) {
      unitContinent = mapBase.getBodyId(gx, gy);
    } else {
      unitContinent = mapBase.getBodyId(gx, gy);
    }
  }

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === 0) continue; // skip barbarian cities

    // Check city owner is alive
    if (!(gameState.civsAlive & (1 << city.owner))) continue;

    // Same continent check
    if (unitContinent >= 0) {
      const cityContinent = mapBase.getBodyId(city.gx, city.gy);
      if (cityContinent !== unitContinent) continue;
    }

    const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
    const score = (city.size + 50) / (dist + 1);

    if (score > bestScore) {
      bestScore = score;
      bestCity = city;
    }
  }

  if (!bestCity) {
    // No reachable target city — disband (matches original behavior)
    if (debugLog) debugLog.push(`[barb] ${UNIT_NAMES[unit.type]} ${unitIndex}: no target city, disbanding`);
    return { type: 'UNIT_ORDER', unitIndex, order: 'disband' };
  }

  // Move toward the best city using scored movement
  if (debugLog) {
    debugLog.push(`[barb] ${UNIT_NAMES[unit.type]} ${unitIndex}: targeting ${bestCity.name || 'city'} at (${bestCity.gx},${bestCity.gy}), score=${bestScore.toFixed(1)}`);
  }

  return scoredMovement(unit, unitIndex, gameState, mapBase, unitBodyId, bestCity, debugLog);
}

/**
 * Scored directional movement — pick the best of 8 adjacent directions.
 *
 * Scoring per direction (ported from FUN_005351aa):
 *   +4  if tile is in enemy territory (tileOwnership != barbarian)
 *   +8  if tile has a city (enemy)
 *   +6  if tile has road/railroad improvements
 *   +random(0-5)
 *   +6  if direction matches the preferred direction (toward target)
 *   +2  if direction's X-component matches target X-direction
 *   +2  if direction's Y-component matches target Y-direction
 *   +99 if tile has an enemy unit we can attack (barbarians always attack)
 *   -20 if friendly unit on tile and unit is in a city
 *
 * @param {object} unit
 * @param {number} unitIndex
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} unitBodyId
 * @param {object|null} targetCity - city to move toward, or null for wandering
 * @param {Array<string>|null} debugLog
 * @returns {object|null} MOVE_UNIT action or UNIT_ORDER disband/skip
 */
function scoredMovement(unit, unitIndex, gameState, mapBase, unitBodyId, targetCity, debugLog) {
  const gx = unit.gx;
  const gy = unit.gy;
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  // Compute preferred direction toward target city
  let prefDirX = 0;  // -1, 0, or 1: X-direction toward target
  let prefDirY = 0;  // -1, 0, or 1: Y-direction toward target
  let prefDirIdx = -1; // index of the single "preferred" direction

  if (targetCity) {
    // Compute raw dx toward target, handling wrapping
    let dx = targetCity.gx - gx;
    if (mapBase.wraps) {
      const absDx = Math.abs(dx);
      if (absDx >= Math.floor(mapBase.mw / 2)) {
        dx = -dx;
      }
    }
    prefDirX = signOf(dx);

    const dy = targetCity.gy - gy;
    prefDirY = signOf(dy);

    // Find the direction index that best matches (prefDirX, prefDirY)
    // The preferred direction corresponds to the unit's goto direction
    // in the original code (stored in (&DAT_006560fb)[idx * 0x20])
    let bestMatch = -1;
    for (let d = 0; d < 8; d++) {
      let matchScore = 0;
      if (DIR_DX_SIGN[d] === prefDirX) matchScore++;
      if (DIR_DY_SIGN[d] === prefDirY) matchScore++;
      if (matchScore > bestMatch) {
        bestMatch = matchScore;
        prefDirIdx = d;
      }
    }
  }

  let bestScore = -999;
  let bestDir = -1;

  for (let d = 0; d < 8; d++) {
    const dir = DIRECTIONS[d];
    const dest = resolveDirection(gx, gy, dir, mapBase);
    if (!dest) continue;
    if (!inBounds(dest.gx, dest.gy, mapBase)) continue;

    const terrain = mapBase.getTerrain(dest.gx, dest.gy);

    // Domain passability: land units skip ocean, sea units skip land
    // Domain 2 (sea) must go to ocean, domain 0 (ground) must go to land
    if (domain === 0 && terrain === 10) continue;
    if (domain === 2 && terrain !== 10) continue;

    let score = 0;

    // Check for enemy units on tile
    const enemyOwner = topUnitOwner(gameState, dest.gx, dest.gy);
    const hasEnemy = (enemyOwner > 0); // owner > 0 means non-barbarian

    if (hasEnemy) {
      // Barbarians always want to attack enemy units
      score += 99;
    }

    // Check if tile is in enemy territory
    const tileOwner = mapBase.getTileOwnership(dest.gx, dest.gy);
    if (tileOwner !== 0x0F && tileOwner !== 0) {
      // Tile belongs to another civ (not barbarian, not unowned)
      score += 4;
    }

    // Check if tile has a city
    const destCity = cityAt(gameState, dest.gx, dest.gy);
    if (destCity && destCity.owner !== 0) {
      score += 8;
    }

    // Check for roads/improvements
    const imp = mapBase.getImprovements(dest.gx, dest.gy);
    if (imp.city) {
      score += 8; // city counts as improvement bonus too
    } else if (imp.road || imp.railroad || imp.irrigation || imp.mining) {
      score += 6;
    }

    // Random factor (0-5)
    score += gameState.rng ? gameState.rng.nextInt(6) : Math.floor(Math.random() * 6);

    // Friendly unit penalty when in a city (avoid stacking on top of
    // barbarian units in our own cities)
    if (hasFriendlyUnits(gameState, dest.gx, dest.gy, unitIndex)) {
      const onCity = cityAt(gameState, gx, gy);
      if (onCity && onCity.owner === 0) {
        score -= 20;
      }
    }

    // Direction toward target bonuses
    if (prefDirIdx >= 0) {
      // +6 if this is the preferred direction
      if (d === prefDirIdx) {
        score += 6;
      }

      // +2 if X-component matches target direction
      if (prefDirX !== 0 && DIR_DX_SIGN[d] === prefDirX) {
        score += 2;
      }

      // +2 if Y-component matches target direction
      if (prefDirY !== 0 && DIR_DY_SIGN[d] === prefDirY) {
        score += 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestDir = d;
    }
  }

  // If we found a good direction, move there
  if (bestDir >= 0 && bestScore > -999) {
    const dir = DIRECTIONS[bestDir];
    const action = { type: 'MOVE_UNIT', unitIndex, dir };
    const err = validateAction(gameState, mapBase, action, 0);
    if (!err) return action;
  }

  // No valid move — skip this turn (don't disband combat units easily)
  if (debugLog) debugLog.push(`[barb] ${UNIT_NAMES[unit.type]} ${unitIndex}: no valid move, skipping`);
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}
