// ═══════════════════════════════════════════════════════════════════
// ai/econai.js — AI economy: research selection, tax/science rates,
//                government revolution timing
//
// Phase 4 of AI player support. Replaces the naive "pick random tech"
// with scored tech selection, adds rate balancing and revolution logic.
// ═══════════════════════════════════════════════════════════════════

import { getAvailableResearch } from '../research.js';
import { validateAction } from '../rules.js';
import {
  ADVANCE_NAMES, ADVANCE_PREREQS,
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_DOMAIN,
  IMPROVE_PREREQS, IMPROVE_NAMES,
  WONDER_PREREQS,
  GOVT_TECH_PREREQS, GOVT_MAX_RATE, GOVT_MAX_SCIENCE,
  GOVERNMENT_KEYS,
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
 * Check if this civ is at war with any other living civ.
 */
function isAtWar(gameState, civSlot) {
  const civs = gameState.civs;
  if (!civs) return false;
  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    const c = civs[i];
    if (!c || c.alive === false) continue;
    // Dead civs have no cities/units — cheap check
    if (getTreaty(gameState, civSlot, i) === 'war') return true;
  }
  return false;
}

/**
 * Count cities owned by a civ.
 */
function countCities(gameState, civSlot) {
  if (!gameState.cities) return 0;
  let n = 0;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.gx >= 0) n++;
  }
  return n;
}

/**
 * Check if any city owned by this civ is in civil disorder.
 */
function hasDisorder(gameState, civSlot) {
  if (!gameState.cities) return false;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.gx >= 0 && c.civilDisorder) return true;
  }
  return false;
}

/**
 * Find the best ATK value among units the civ can currently build.
 */
function bestCurrentAtk(gameState, civSlot) {
  const civTechs = gameState.civTechs?.[civSlot];
  if (!civTechs) return 1;
  let best = 1;
  for (let u = 0; u < UNIT_PREREQS.length; u++) {
    const prereq = UNIT_PREREQS[u];
    if (prereq === -2) continue; // unbuildable
    if (prereq >= 0 && !civTechs.has(prereq)) continue; // don't have tech
    if (UNIT_DOMAIN[u] !== 0) continue; // only land units for comparison
    if (UNIT_ATK[u] > best) best = UNIT_ATK[u];
  }
  return best;
}

// Building IDs considered high-value for the AI
const KEY_BUILDINGS = new Set([
  3,  // Granary
  5,  // Marketplace
  9,  // Aqueduct
  10, // Bank
  15, // Factory
  16, // Mfg. Plant
  23, // Sewer System
  25, // Superhighways
  26, // Research Lab
]);

// Government quality ranking (higher = better)
const GOVT_RANK = {
  anarchy: 0,
  despotism: 1,
  monarchy: 3,
  communism: 3,
  fundamentalism: 2,
  republic: 4,
  democracy: 5,
};

// ═══════════════════════════════════════════════════════════════════
// 1. Smart Research Selection
// ═══════════════════════════════════════════════════════════════════

/**
 * Score each available tech and pick the best one.
 *
 * Returns a SET_RESEARCH action or null if no research is needed.
 */
export function chooseResearch(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  // Only pick research if none is set or current is invalid
  if (civ.techBeingResearched != null &&
      civ.techBeingResearched !== 0xFF &&
      civ.techBeingResearched !== -1) {
    // Already researching something — check if still valid
    const civTechs = gameState.civTechs?.[civSlot];
    if (civTechs && !civTechs.has(civ.techBeingResearched)) {
      return null; // still researching, don't change
    }
    // Already know this tech (just completed) — fall through to pick new
  }

  const available = getAvailableResearch(gameState, civSlot);
  if (available.length === 0) return null;

  const currentBestAtk = bestCurrentAtk(gameState, civSlot);
  const cityCount = countCities(gameState, civSlot);
  const treasury = civ.treasury ?? 0;
  const atWar = isAtWar(gameState, civSlot);

  // Score each available tech
  let bestScore = -Infinity;
  let bestTech = available[0];

  for (const techId of available) {
    let score = 0;

    // (a) Military value: units enabled by this tech
    for (let u = 0; u < UNIT_PREREQS.length; u++) {
      if (UNIT_PREREQS[u] === techId) {
        score += 10;
        // Bonus if this unit has higher ATK than current best
        if (UNIT_ATK[u] != null && UNIT_ATK[u] > currentBestAtk) {
          score += 15;
        }
        // Bonus for high DEF units too
        if (UNIT_DEF[u] != null && UNIT_DEF[u] > 4) {
          score += 5;
        }
      }
    }

    // (b) Economic value: buildings enabled by this tech
    for (let b = 0; b < IMPROVE_PREREQS.length; b++) {
      if (IMPROVE_PREREQS[b] === techId) {
        score += 8;
        if (KEY_BUILDINGS.has(b)) {
          score += 12; // extra for key buildings
        }
      }
    }

    // (c) Government value: does this tech enable a better government?
    for (const [govtName, prereqTech] of Object.entries(GOVT_TECH_PREREQS)) {
      if (prereqTech === techId) {
        const currentRank = GOVT_RANK[civ.government] ?? 0;
        const newRank = GOVT_RANK[govtName] ?? 0;
        if (newRank > currentRank) {
          score += 20;
          // Republic and Democracy are especially valuable
          if (govtName === 'republic' || govtName === 'democracy') {
            score += 10;
          }
        }
      }
    }

    // (d) Wonder value
    for (let w = 0; w < WONDER_PREREQS.length; w++) {
      if (WONDER_PREREQS[w] === techId) {
        score += 10;
      }
    }

    // (e) Situational bonuses
    if (atWar) {
      // At war: boost military techs
      let enablesMilitary = false;
      for (let u = 0; u < UNIT_PREREQS.length; u++) {
        if (UNIT_PREREQS[u] === techId && UNIT_DOMAIN[u] === 0 && UNIT_ATK[u] > 0) {
          enablesMilitary = true;
          break;
        }
      }
      if (enablesMilitary) score += 15;
    }

    if (treasury < 50) {
      // Economy struggling: boost trade/economic techs
      // Check if it enables Marketplace (5), Bank (10), Stock Exchange (22), etc.
      for (const bId of [5, 10, 22, 25]) {
        if (IMPROVE_PREREQS[bId] === techId) {
          score += 10;
          break;
        }
      }
    }

    if (cityCount > 5) {
      // Many cities: government-improving techs are more valuable
      for (const [govtName, prereqTech] of Object.entries(GOVT_TECH_PREREQS)) {
        if (prereqTech === techId) {
          score += 10;
          break;
        }
      }
    }

    // Tiebreak: alphabetical by advance name (for consistency)
    if (score > bestScore ||
        (score === bestScore && (ADVANCE_NAMES[techId] || '') < (ADVANCE_NAMES[bestTech] || ''))) {
      bestScore = score;
      bestTech = techId;
    }
  }

  const action = { type: 'SET_RESEARCH', advanceId: bestTech };
  const err = validateAction(gameState, mapBase, action, civSlot);
  if (err) return null;
  return action;
}

// ═══════════════════════════════════════════════════════════════════
// 2. Tax / Science Rate Balancing
// ═══════════════════════════════════════════════════════════════════

/**
 * Compute optimal tax/science/luxury rates and return a CHANGE_RATES
 * action if the current rates are suboptimal.
 *
 * Returns a CHANGE_RATES action or null if no change is needed.
 */
export function balanceRates(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  const govt = civ.government || 'despotism';
  const maxRate = GOVT_MAX_RATE[govt] ?? 6;
  const maxSci = GOVT_MAX_SCIENCE[govt] ?? 6;
  const treasury = civ.treasury ?? 0;
  const disorder = hasDisorder(gameState, civSlot);

  // Start with desired rates
  let tax, luxury, science;

  if (treasury < 20) {
    // Bankruptcy prevention: maximize tax
    tax = Math.min(maxRate, 7);
    luxury = disorder ? Math.min(2, maxRate) : 0;
    science = 10 - tax - luxury;
    // Clamp science to max
    if (science > maxSci) {
      const excess = science - maxSci;
      science = maxSci;
      tax = Math.min(maxRate, tax + excess);
    }
  } else if (treasury < 50) {
    // Low treasury: shift toward tax
    tax = Math.min(maxRate, 5);
    luxury = disorder ? Math.min(2, maxRate) : 0;
    science = 10 - tax - luxury;
    if (science > maxSci) {
      const excess = science - maxSci;
      science = maxSci;
      tax = Math.min(maxRate, tax + excess);
    }
  } else if (treasury > 300) {
    // Rich: maximize science
    science = Math.min(maxSci, 8);
    luxury = disorder ? Math.min(2, maxRate) : 0;
    tax = 10 - science - luxury;
    if (tax > maxRate) {
      const excess = tax - maxRate;
      tax = maxRate;
      luxury = Math.min(maxRate, luxury + excess);
    }
    if (tax < 0) {
      // Can't afford this much science+luxury, reduce science
      science += tax; // tax is negative, so this reduces science
      tax = 0;
    }
  } else {
    // Normal: balanced (leaning toward science)
    science = Math.min(maxSci, 7);
    luxury = disorder ? Math.min(2, maxRate) : 0;
    tax = 10 - science - luxury;
    if (tax > maxRate) {
      const excess = tax - maxRate;
      tax = maxRate;
      luxury = Math.min(maxRate, luxury + excess);
    }
    if (tax < 0) {
      science += tax;
      tax = 0;
    }
  }

  // Final sanity clamps
  science = Math.max(0, Math.min(maxSci, science));
  tax = Math.max(0, Math.min(maxRate, tax));
  luxury = 10 - science - tax;

  // Luxury might exceed maxRate after adjustment
  if (luxury > maxRate) {
    const excess = luxury - maxRate;
    luxury = maxRate;
    // Give excess to tax or science
    if (tax + excess <= maxRate) {
      tax += excess;
    } else {
      tax = maxRate;
      science = 10 - tax - luxury;
    }
  }
  if (luxury < 0) {
    // Shouldn't happen, but guard
    luxury = 0;
    science = Math.min(maxSci, 10 - tax);
    tax = 10 - science; // absorb remainder
  }

  // Final validation: rates must sum to 10 and be non-negative
  if (tax + luxury + science !== 10 || tax < 0 || luxury < 0 || science < 0) {
    // Fallback: safe defaults
    tax = Math.min(maxRate, 3);
    science = Math.min(maxSci, 7 - tax > 0 ? 10 - tax : maxSci);
    luxury = 10 - tax - science;
    if (luxury < 0) { science += luxury; luxury = 0; }
  }

  // Only emit action if rates differ from current
  const currentSci = civ.scienceRate ?? 0;
  const currentTax = civ.taxRate ?? 0;
  if (science === currentSci && tax === currentTax) return null;

  const action = { type: 'CHANGE_RATES', scienceRate: science, taxRate: tax };
  const err = validateAction(gameState, mapBase, action, civSlot);
  if (err) return null;
  return action;
}

// ═══════════════════════════════════════════════════════════════════
// 3. Government Revolution Timing
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if a better government is available and decide whether to revolt.
 *
 * Returns a REVOLUTION action or null if no revolution is warranted.
 */
export function considerRevolution(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  const currentGovt = civ.government || 'despotism';

  // Don't revolt if already in anarchy (revolution in progress)
  if (currentGovt === 'anarchy') return null;
  if (civ.anarchyTurns > 0) return null;

  const cityCount = countCities(gameState, civSlot);
  const civTechs = gameState.civTechs?.[civSlot];
  if (!civTechs) return null;

  // Don't revolt too early
  if (cityCount < 3) return null;

  const treasury = civ.treasury ?? 0;
  const atWar = isAtWar(gameState, civSlot);
  const currentRank = GOVT_RANK[currentGovt] ?? 0;

  // Evaluate each government from best to worst
  // Priority order: Democracy > Republic > Communism/Monarchy > Fundamentalism > Despotism
  const candidates = [
    {
      name: 'democracy',
      minCities: 6,
      condition: !atWar && treasury > 100,
    },
    {
      name: 'republic',
      minCities: 4,
      condition: !atWar,
    },
    {
      name: 'communism',
      minCities: 8,
      condition: true, // good for large empires with corruption
    },
    {
      name: 'monarchy',
      minCities: 3,
      condition: true, // always better than despotism
    },
    {
      name: 'fundamentalism',
      minCities: 4,
      condition: atWar, // only during wartime
    },
  ];

  for (const candidate of candidates) {
    const { name, minCities, condition } = candidate;

    // Must be strictly better than current government
    const candidateRank = GOVT_RANK[name] ?? 0;
    if (candidateRank <= currentRank) continue;

    // Must meet city count threshold
    if (cityCount < minCities) continue;

    // Must meet situational condition
    if (!condition) continue;

    // Must have the required tech
    const prereq = GOVT_TECH_PREREQS[name] ?? -1;
    if (prereq >= 0 && !civTechs.has(prereq)) continue;

    // Validate the action
    const action = { type: 'REVOLUTION', government: name };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (err) continue;

    return action;
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════
// Combined entry point
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate all economy-related actions for an AI turn.
 *
 * Returns an array of actions (0-3 items): research, rates, revolution.
 * Order matters: research first (may affect rate strategy), then rates,
 * then revolution (which may reset rates to anarchy defaults).
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @returns {Array<object>}
 */
export function generateEconActions(gameState, mapBase, civSlot) {
  const actions = [];

  // 1. Research selection
  const researchAction = chooseResearch(gameState, mapBase, civSlot);
  if (researchAction) actions.push(researchAction);

  // 2. Rate balancing
  const ratesAction = balanceRates(gameState, mapBase, civSlot);
  if (ratesAction) actions.push(ratesAction);

  // 3. Government revolution
  const revolAction = considerRevolution(gameState, mapBase, civSlot);
  if (revolAction) actions.push(revolAction);

  return actions;
}
