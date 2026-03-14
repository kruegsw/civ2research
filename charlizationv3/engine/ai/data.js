// ═══════════════════════════════════════════════════════════════════
// ai/data.js — Per-turn AI analytics computation
//
// Computes continent analysis, power rankings, military stats,
// treaty info, and other derived data that AI assessment functions
// need. Called once per AI turn, results shared across all modules.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  WONDER_OBSOLETE,
} from '../defs.js';

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Count set bits in a number (popcount).
 * Equivalent to decompiled FUN_005ae006.
 */
function popcount(x) {
  let n = 0;
  let v = x;
  while (v) { n += v & 1; v >>>= 1; }
  return n;
}

/**
 * Get treaty status between two civs.
 */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

// ── Main computation ─────────────────────────────────────────────

/**
 * Compute per-turn AI analytics for all civs.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase   - immutable map data (tileData, mw, mh)
 * @param {number} civSlot   - the AI civ requesting this data
 * @returns {object} aiData analytics object
 */
export function computeAiData(gameState, mapBase, civSlot) {
  const civs = gameState.civs || [];
  const cities = gameState.cities || [];
  const units = gameState.units || [];
  const mw = mapBase.mw;

  // ── (a) Continent analysis ───────────────────────────────────
  // Map<bodyId, { cityCounts: Map<civSlot, count>, militaryCounts: Map<civSlot, count> }>
  const continents = new Map();

  function getContinent(bodyId) {
    let c = continents.get(bodyId);
    if (!c) {
      c = { cityCounts: new Map(), militaryCounts: new Map() };
      continents.set(bodyId, c);
    }
    return c;
  }

  // Count cities per continent per civ
  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    const idx = city.gy * mw + city.gx;
    const tile = mapBase.tileData[idx];
    if (!tile) continue;
    const bodyId = tile.bodyId ?? 0;
    const cont = getContinent(bodyId);
    cont.cityCounts.set(city.owner, (cont.cityCounts.get(city.owner) || 0) + 1);
  }

  // Count military units per continent per civ
  for (const u of units) {
    if (u.gx < 0) continue; // dead unit
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def === 0) continue; // non-combat
    const idx = u.gy * mw + u.gx;
    const tile = mapBase.tileData[idx];
    if (!tile) continue;
    const bodyId = tile.bodyId ?? 0;
    const cont = getContinent(bodyId);
    cont.militaryCounts.set(u.owner, (cont.militaryCounts.get(u.owner) || 0) + 1);
  }

  // ── (d) Per-civ military stats ───────────────────────────────
  const milStrength = new Array(8).fill(0);  // sum ATK+DEF
  const milAtkSum   = new Array(8).fill(0);  // sum ATK only
  const milDefSum   = new Array(8).fill(0);  // sum DEF only
  const unitCount   = new Array(8).fill(0);  // total alive units
  const cityCount   = new Array(8).fill(0);  // total alive cities
  const techCount   = new Array(8).fill(0);  // number of techs known

  for (const u of units) {
    if (u.gx < 0) continue;
    const own = u.owner;
    if (own < 0 || own > 7) continue;
    unitCount[own]++;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    milStrength[own] += atk + def;
    milAtkSum[own] += atk;
    milDefSum[own] += def;
  }

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    cityCount[city.owner]++;
  }

  for (let c = 0; c < 8; c++) {
    techCount[c] = gameState.civTechs?.[c]?.size ?? 0;
  }

  // ── (c) Alive civs bitmask ──────────────────────────────────
  let civsAlive = 0;
  for (let c = 0; c < 8; c++) {
    if (cityCount[c] > 0 || unitCount[c] > 0) {
      civsAlive |= (1 << c);
    }
  }
  const aliveCivCount = popcount(civsAlive);

  // ── (b) Power rankings ──────────────────────────────────────
  // powerRanking = techCount * 5 + treasury/32 + weightedUnitSum + cityCount * 5
  // (#13) Increased tech weight from 3→5, added city count (each city ≈ 5 power)
  const powerRanking = new Array(8).fill(0);
  for (let c = 0; c < 8; c++) {
    const treasury = civs[c]?.treasury ?? 0;
    powerRanking[c] = techCount[c] * 5 + Math.floor(treasury / 32) + milStrength[c] + cityCount[c] * 5;
  }

  // powerRank: 1=weakest, 7=strongest among alive civs (1-7)
  // Ties broken arbitrarily (lower civ slot ranks lower)
  const powerRank = new Array(8).fill(0);
  for (let c = 1; c < 8; c++) {
    if (!(civsAlive & (1 << c))) continue;
    let rank = 1;
    for (let other = 1; other < 8; other++) {
      if (other === c) continue;
      if (!(civsAlive & (1 << other))) continue;
      if (powerRanking[other] < powerRanking[c]) {
        rank++;
      } else if (powerRanking[other] === powerRanking[c] && other < c) {
        rank++;
      }
    }
    powerRank[c] = rank;
  }

  // ── (e) Per-civ treaty info ─────────────────────────────────
  const atWarWith = Array.from({ length: 8 }, () => []);
  const contactedCivs = Array.from({ length: 8 }, () => []);

  for (let a = 1; a < 8; a++) {
    if (!(civsAlive & (1 << a))) continue;
    for (let b = 1; b < 8; b++) {
      if (a === b) continue;
      if (!(civsAlive & (1 << b))) continue;
      // Check for explicit treaty entry (contact established)
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const hasContact = gameState.treaties?.[key] !== undefined;
      const treaty = getTreaty(gameState, a, b);
      if (treaty === 'war' && hasContact) {
        // Only count as "at war" if there's actual contact — uncontacted civs
        // default to 'war' via getTreaty() but aren't truly at war
        atWarWith[a].push(b);
      }
      if (hasContact) {
        contactedCivs[a].push(b);
      }
    }
  }

  return {
    continents,
    powerRanking,
    powerRank,
    civsAlive,
    aliveCivCount,
    milStrength,
    milAtkSum,
    milDefSum,
    unitCount,
    cityCount,
    techCount,
    atWarWith,
    contactedCivs,
  };
}

// ── Wonder effect helper ─────────────────────────────────────────

/**
 * Check if a civ currently benefits from a wonder.
 * Returns true if:
 *   - The wonder exists and is not destroyed
 *   - The owning city belongs to this civ
 *   - No alive civ has discovered the obsoleting tech
 *
 * Equivalent to decompiled FUN_00453e51.
 *
 * @param {object} gameState
 * @param {number} civSlot
 * @param {number} wonderIndex
 * @returns {boolean}
 */
export function hasWonderEffect(gameState, civSlot, wonderIndex) {
  const w = gameState.wonders?.[wonderIndex];
  if (!w || w.cityIndex == null || w.destroyed) return false;

  const city = gameState.cities[w.cityIndex];
  if (!city || city.owner !== civSlot) return false;

  // Check obsolescence: wonder is obsolete if ANY alive civ has the tech
  const obsTech = WONDER_OBSOLETE[wonderIndex];
  if (obsTech != null && obsTech >= 0 && gameState.civTechs) {
    for (let c = 0; c < 8; c++) {
      if (gameState.civTechs[c]?.has(obsTech)) return false; // obsoleted
    }
  }

  return true; // wonder is active
}
