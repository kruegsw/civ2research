// ═══════════════════════════════════════════════════════════════════
// ai/strategy.js — Strategic assessment for AI decision-making
//
// Phase 6 of AI player support. Computes a strategic picture of the
// game state — threat level, military posture, war/peace targets,
// production focus — that other AI modules can use to make smarter
// decisions. This module is advisory: it produces no actions itself.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN,
} from '../defs.js';

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Get treaty status between two civs (mirrors rules.js getTreaty,
 * which is not exported).
 */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/**
 * Compute isometric distance between two tiles using doubled-X coordinates.
 */
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

// ── Military strength computation ────────────────────────────────

/**
 * Compute total military strength (ATK + DEF) for all alive units
 * belonging to each civ. Returns a Map<civSlot, number>.
 */
function computeMilitaryStrengths(gameState) {
  const strengths = new Map();
  for (const u of gameState.units) {
    if (u.gx < 0) continue; // dead unit
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def === 0) continue; // non-combat
    const str = atk + def;
    strengths.set(u.owner, (strengths.get(u.owner) || 0) + str);
  }
  return strengths;
}

/**
 * Count living cities per civ. Returns a Map<civSlot, number>.
 */
function computeCityCounts(gameState) {
  const counts = new Map();
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.gx < 0) continue;
    counts.set(c.owner, (counts.get(c.owner) || 0) + 1);
  }
  return counts;
}

/**
 * Check if two civs share a border — any pair of their cities
 * within 15 tiles of each other.
 */
function shareseBorder(gameState, mapBase, civA, civB) {
  const citiesA = [];
  const citiesB = [];
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.gx < 0) continue;
    if (c.owner === civA) citiesA.push(c);
    if (c.owner === civB) citiesB.push(c);
  }
  for (const a of citiesA) {
    for (const b of citiesB) {
      if (tileDist(a.gx, a.gy, b.gx, b.gy, mapBase) <= 15) return true;
    }
  }
  return false;
}

/**
 * Check if any enemy unit is adjacent to one of our cities,
 * and whether we have fewer defenders than attackers there.
 */
function checkCityThreats(gameState, mapBase, civSlot) {
  const ourCities = [];
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.size > 0 && c.gx >= 0) {
      ourCities.push(c);
    }
  }
  if (ourCities.length === 0) return false;

  for (const city of ourCities) {
    const neighbors = mapBase.getNeighbors(city.gx, city.gy);
    let adjacentEnemyStrength = 0;
    let defenderStrength = 0;

    // Count enemy combat units adjacent to this city
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (ny < 0 || ny >= mapBase.mh) continue;
      const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
      if (wnx < 0 || wnx >= mapBase.mw) continue;

      for (const u of gameState.units) {
        if (u.gx === wnx && u.gy === ny && u.owner !== civSlot && u.gx >= 0) {
          const atk = UNIT_ATK[u.type] || 0;
          if (atk > 0) adjacentEnemyStrength += atk;
        }
      }
    }

    // Count our defenders in the city
    for (const u of gameState.units) {
      if (u.owner !== civSlot || u.gx < 0) continue;
      if (u.gx === city.gx && u.gy === city.gy) {
        const def = UNIT_DEF[u.type] || 0;
        if (def > 0) defenderStrength += def;
      }
    }

    if (adjacentEnemyStrength > 0 && defenderStrength < adjacentEnemyStrength) {
      return true;
    }
  }

  return false;
}

/**
 * Get civ slots we are currently at war with.
 */
function getWarPartners(gameState, civSlot) {
  const wars = [];
  const civs = gameState.civs;
  if (!civs) return wars;
  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    const c = civs[i];
    if (!c || c.alive === false) continue;
    if (getTreaty(gameState, civSlot, i) === 'war') wars.push(i);
  }
  return wars;
}

// ═══════════════════════════════════════════════════════════════════
// Main strategic assessment
// ═══════════════════════════════════════════════════════════════════

/**
 * Compute a strategic assessment for the given civ.
 *
 * This produces an advisory object that other AI modules can use to
 * inform their decisions. It does NOT produce any game actions.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase   - immutable map data with accessors
 * @param {number} civSlot   - civ slot (1-7)
 * @returns {object} strategy assessment
 */
export function assessStrategy(gameState, mapBase, civSlot) {
  // ── Gather raw data ──
  const milStrengths = computeMilitaryStrengths(gameState);
  const cityCounts = computeCityCounts(gameState);

  const ourMilitary = milStrengths.get(civSlot) || 0;
  const cityCount = cityCounts.get(civSlot) || 0;
  const civ = gameState.civs?.[civSlot];
  const treasury = civ?.treasury ?? 0;

  // Build per-enemy strength and city count maps (exclude ourselves and dead civs)
  const enemyMilitary = new Map();
  const enemyCityCount = new Map();
  const civs = gameState.civs;
  if (civs) {
    for (let i = 1; i < civs.length; i++) {
      if (i === civSlot) continue;
      const c = civs[i];
      if (!c || c.alive === false) continue;
      const str = milStrengths.get(i) || 0;
      const cc = cityCounts.get(i) || 0;
      if (str > 0 || cc > 0) {
        enemyMilitary.set(i, str);
        enemyCityCount.set(i, cc);
      }
    }
  }

  const atWarWith = getWarPartners(gameState, civSlot);
  const hasCityThreat = checkCityThreats(gameState, mapBase, civSlot);

  // ── 1. Threat level ──
  let threat = 'low';

  // Check for critical threat: enemy units adjacent to our cities with
  // fewer defenders
  if (hasCityThreat) {
    threat = 'critical';
  } else {
    // Check for high threat: any neighboring enemy with > 1.5× our strength
    let highThreat = false;
    for (const [eCiv, eStr] of enemyMilitary) {
      if (eStr > ourMilitary * 1.5 && shareseBorder(gameState, mapBase, civSlot, eCiv)) {
        highThreat = true;
        break;
      }
    }

    if (highThreat) {
      threat = 'high';
    } else if (atWarWith.length > 0) {
      // At war with anyone, or an enemy is slightly stronger
      let enemyStronger = false;
      for (const warCiv of atWarWith) {
        const eStr = enemyMilitary.get(warCiv) || 0;
        if (eStr > ourMilitary) {
          enemyStronger = true;
          break;
        }
      }
      threat = enemyStronger ? 'medium' : 'medium';
      // Even if not stronger, being at war is medium threat
    }
    // Otherwise stays 'low'
  }

  // ── 2. Military posture ──
  let militaryPosture = 'expand';

  if (threat === 'critical' && cityCount < 3) {
    militaryPosture = 'turtle';
  } else if (threat === 'high' || threat === 'critical') {
    militaryPosture = 'defend';
  } else {
    // Check if we can attack anyone: 2× their strength AND nearby
    let canAttack = false;
    for (const [eCiv, eStr] of enemyMilitary) {
      if (eStr > 0 && ourMilitary >= eStr * 2 &&
          shareseBorder(gameState, mapBase, civSlot, eCiv)) {
        canAttack = true;
        break;
      }
    }

    if (canAttack) {
      militaryPosture = 'attack';
    } else if (threat === 'low' && cityCount < 6) {
      militaryPosture = 'expand';
    } else {
      // Default to expand if low threat, or defend if medium
      militaryPosture = threat === 'medium' ? 'defend' : 'expand';
    }
  }

  // ── 3. Expansion desired ──
  const expansionDesired = militaryPosture === 'expand' && cityCount < 6;

  // ── 4. War targets ──
  // Civs we're already at war with + civs where we have 2× advantage and nearby
  const warTargets = [...atWarWith];
  for (const [eCiv, eStr] of enemyMilitary) {
    if (warTargets.includes(eCiv)) continue; // already listed
    if (eStr > 0 && ourMilitary >= eStr * 2 &&
        shareseBorder(gameState, mapBase, civSlot, eCiv)) {
      warTargets.push(eCiv);
    }
  }

  // ── 5. Peace targets ──
  // Civs we're at war with that have > 1.5× our strength
  const peaceTargets = [];
  for (const warCiv of atWarWith) {
    const eStr = enemyMilitary.get(warCiv) || 0;
    if (eStr > ourMilitary * 1.5) {
      peaceTargets.push(warCiv);
    }
  }

  // ── 6. Production focus ──
  let productionFocus = 'economy';

  if (threat === 'high' || threat === 'critical' ||
      militaryPosture === 'attack' || militaryPosture === 'defend') {
    productionFocus = 'military';
  } else if (militaryPosture === 'expand' && cityCount < 4) {
    productionFocus = 'growth';
  } else if (cityCount > 6 && treasury > 200) {
    productionFocus = 'science';
  }
  // Otherwise stays 'economy'

  return {
    threat,
    militaryPosture,
    expansionDesired,
    warTargets,
    peaceTargets,
    productionFocus,
    ourMilitary,
    enemyMilitary,
    cityCount,
    enemyCityCount,
  };
}
