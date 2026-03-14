// ═══════════════════════════════════════════════════════════════════
// ai/diplomai.js — AI diplomacy: treaty proposals, war declarations,
//                  tribute demands, and responding to incoming offers
//
// Phase 5 of AI player support. Handles diplomatic interactions
// between AI civs and other players (human or AI).
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import { UNIT_ATK, UNIT_DEF, UNIT_DOMAIN } from '../defs.js';

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Get treaty status between two civs.
 * Mirrors the unexported getTreaty() in rules.js.
 */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/**
 * Calculate military strength for a civ: sum of (ATK + DEF) for all
 * alive units. Only counts land/sea combat units (excludes settlers,
 * caravans, diplomats, etc. — units with 0 ATK and <= 1 DEF).
 */
function calcMilitaryStrength(gameState, civSlot) {
  if (!gameState.units) return 0;
  let strength = 0;
  for (const u of gameState.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    // Skip non-combat units (settlers, caravans, diplomats, etc.)
    if (atk === 0 && def <= 1) continue;
    strength += atk + def;
  }
  return strength;
}

/**
 * Count offensive (ATK > 0) land military units for a civ.
 */
function countOffensiveUnits(gameState, civSlot) {
  if (!gameState.units) return 0;
  let count = 0;
  for (const u of gameState.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    if (UNIT_DOMAIN[u.type] !== 0) continue; // land only
    if ((UNIT_ATK[u.type] || 0) > 0) count++;
  }
  return count;
}

/**
 * Count how many civs this civ is currently at war with.
 */
function countWars(gameState, civSlot) {
  let wars = 0;
  const civs = gameState.civs;
  if (!civs) return 0;
  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;
    if (getTreaty(gameState, civSlot, i) === 'war') wars++;
  }
  return wars;
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
 * Compute the minimum city-to-city distance between two civs.
 * Uses Manhattan distance. Returns Infinity if either civ has no cities.
 */
function nearestCityDistance(gameState, civA, civB) {
  if (!gameState.cities) return Infinity;
  const citiesA = [];
  const citiesB = [];
  for (const c of gameState.cities) {
    if (!c || c.size <= 0) continue;
    if (c.owner === civA) citiesA.push(c);
    else if (c.owner === civB) citiesB.push(c);
  }
  if (citiesA.length === 0 || citiesB.length === 0) return Infinity;

  let minDist = Infinity;
  for (const a of citiesA) {
    for (const b of citiesB) {
      const dx = Math.abs(a.gx - b.gx);
      const dy = Math.abs(a.gy - b.gy);
      const dist = dx + dy;
      if (dist < minDist) minDist = dist;
    }
  }
  return minDist;
}

/**
 * Check if any of our cities has an enemy unit within range 2
 * (adjacent or one tile away). Indicates cities under threat.
 */
function citiesThreatened(gameState, civSlot) {
  if (!gameState.cities || !gameState.units) return false;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    for (const u of gameState.units) {
      if (!u || u.owner === civSlot || u.gx < 0) continue;
      if ((UNIT_ATK[u.type] || 0) === 0) continue; // non-combat
      if (getTreaty(gameState, civSlot, u.owner) !== 'war') continue;
      const dx = Math.abs(city.gx - u.gx);
      const dy = Math.abs(city.gy - u.gy);
      if (dx + dy <= 3) return true; // isometric: Manhattan ~3 = ~2 tiles
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// 1. Respond to pending treaty proposals
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to any unresolved treaty proposals addressed to this civ.
 *
 * Accept peace/ceasefire proposals from civs that are stronger or
 * roughly equal. Reject proposals from civs we are significantly
 * stronger than (ratio > 1.5:1).
 */
function respondToTreatyProposals(gameState, mapBase, civSlot) {
  const actions = [];
  const proposals = gameState.treatyProposals;
  if (!proposals) return actions;

  const ourStrength = calcMilitaryStrength(gameState, civSlot);

  for (let i = 0; i < proposals.length; i++) {
    const p = proposals[i];
    if (!p || p.resolved || p.to !== civSlot) continue;

    const theirStrength = calcMilitaryStrength(gameState, p.from);
    const ratio = ourStrength / Math.max(theirStrength, 1);

    // Accept if they're stronger or roughly equal (ratio < 1.5)
    // Also accept if we're at war with multiple civs (war fatigue)
    const warCount = countWars(gameState, civSlot);
    const accept = ratio < 1.5 || warCount > 1;

    const action = { type: 'RESPOND_TREATY', proposalIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) actions.push(action);
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 2. Respond to pending tribute demands
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to unresolved tribute demands addressed to this civ.
 *
 * Accept only if the demander is much stronger (ratio > 2:1) and
 * we can afford it. Otherwise reject.
 */
function respondToTributeDemands(gameState, mapBase, civSlot) {
  const actions = [];
  const demands = gameState.tributeDemands;
  if (!demands) return actions;

  const ourStrength = calcMilitaryStrength(gameState, civSlot);
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;

  for (let i = 0; i < demands.length; i++) {
    const d = demands[i];
    if (!d || d.resolved || d.to !== civSlot) continue;

    const theirStrength = calcMilitaryStrength(gameState, d.from);
    const ratio = theirStrength / Math.max(ourStrength, 1);

    // Accept if they're much stronger (>2x) and we can afford it
    const accept = ratio > 2 && treasury >= d.amount;

    const action = { type: 'RESPOND_DEMAND', demandIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) actions.push(action);
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 3. Declare war on weak neighbors
// ═══════════════════════════════════════════════════════════════════

/**
 * Consider declaring war on a neighboring civ if conditions are met:
 *   - Military strength ratio > 2:1 in our favor
 *   - We have at least 3 offensive land units
 *   - We're not already at war with 2+ civs
 *   - Target is a neighbor (nearest city distance < 20)
 */
function considerDeclaringWar(gameState, mapBase, civSlot) {
  const actions = [];
  const civs = gameState.civs;
  if (!civs) return actions;

  const ourStrength = calcMilitaryStrength(gameState, civSlot);
  const offensiveCount = countOffensiveUnits(gameState, civSlot);
  const warCount = countWars(gameState, civSlot);

  // Don't start wars if already fighting on multiple fronts
  if (warCount >= 2) return actions;

  // Need minimum offensive capability
  if (offensiveCount < 3) return actions;

  // Need some minimum strength to wage war
  if (ourStrength < 10) return actions;

  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;

    const treaty = getTreaty(gameState, civSlot, i);
    if (treaty === 'war') continue; // already at war

    const theirStrength = calcMilitaryStrength(gameState, i);
    const ratio = ourStrength / Math.max(theirStrength, 1);

    // Only attack if significantly stronger
    if (ratio < 2.0) continue;

    // Only attack neighbors (not distant civs)
    const dist = nearestCityDistance(gameState, civSlot, i);
    if (dist > 20) continue;

    // More likely to attack if they have cities worth taking
    const theirCities = countCities(gameState, i);
    if (theirCities === 0) continue;

    const action = { type: 'DECLARE_WAR', targetCiv: i };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      break; // only declare one war per turn
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 4. Propose peace when losing or war-weary
// ═══════════════════════════════════════════════════════════════════

/**
 * Propose peace/ceasefire to enemies when:
 *   - They are stronger than us (military ratio < 0.8)
 *   - Our cities are under threat
 *   - The war has dragged on (> 15 turns)
 */
function considerProposingPeace(gameState, mapBase, civSlot) {
  const actions = [];
  const civs = gameState.civs;
  if (!civs) return actions;

  const ourStrength = calcMilitaryStrength(gameState, civSlot);
  const threatened = citiesThreatened(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;

  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;

    const treaty = getTreaty(gameState, civSlot, i);
    if (treaty !== 'war') continue; // only propose to enemies

    // Don't propose if we already have a pending proposal
    const hasPending = gameState.treatyProposals?.some(
      p => p.from === civSlot && p.to === i && !p.resolved
    );
    if (hasPending) continue;

    const theirStrength = calcMilitaryStrength(gameState, i);
    const ratio = ourStrength / Math.max(theirStrength, 1);

    // Find how long we've been at war (approximate: check treaty proposals)
    // If no treaty data, assume it's been a while
    let warTurns = turnNumber; // worst case: at war since the start
    const treatyEvents = gameState.turnEvents;
    // Use treatyProposals to estimate war duration
    const relevantProposals = gameState.treatyProposals?.filter(
      p => (p.from === civSlot && p.to === i) || (p.from === i && p.to === civSlot)
    );
    if (relevantProposals && relevantProposals.length > 0) {
      // Most recent proposal turn as a proxy for war start
      const lastTurn = Math.max(...relevantProposals.map(p => p.turn || 0));
      warTurns = turnNumber - lastTurn;
    }

    let shouldPropose = false;

    // Losing: they're stronger
    if (ratio < 0.8) shouldPropose = true;

    // Cities threatened while roughly equal
    if (threatened && ratio < 1.2) shouldPropose = true;

    // War fatigue: long war with no clear advantage
    if (warTurns > 15 && ratio < 1.5) shouldPropose = true;

    if (!shouldPropose) continue;

    // Propose ceasefire if we're losing badly, peace otherwise
    const treatyType = ratio < 0.5 ? 'ceasefire' : 'peace';

    const action = { type: 'PROPOSE_TREATY', targetCiv: i, treaty: treatyType };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) actions.push(action);
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 5. Demand tribute from weaker neighbors
// ═══════════════════════════════════════════════════════════════════

/**
 * Demand tribute from weaker civs that we're at peace with.
 * Only do this occasionally (every 10 turns per target).
 */
function considerDemandingTribute(gameState, mapBase, civSlot) {
  const actions = [];
  const civs = gameState.civs;
  if (!civs) return actions;

  const ourStrength = calcMilitaryStrength(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;

  // Only demand tribute every few turns (spread out using civ slot offset)
  if ((turnNumber + civSlot) % 10 !== 0) return actions;

  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;

    const treaty = getTreaty(gameState, civSlot, i);
    if (treaty === 'war') continue; // can't demand tribute from enemies

    // Don't demand if there's already a pending demand
    const hasPending = gameState.tributeDemands?.some(
      d => d.from === civSlot && d.to === i && !d.resolved
    );
    if (hasPending) continue;

    const theirStrength = calcMilitaryStrength(gameState, i);
    const ratio = ourStrength / Math.max(theirStrength, 1);

    // Only demand from significantly weaker civs
    if (ratio < 1.8) continue;

    // Only from neighbors
    const dist = nearestCityDistance(gameState, civSlot, i);
    if (dist > 25) continue;

    // Demand proportional to their treasury (if visible) or a flat amount
    const theirTreasury = civs[i]?.treasury ?? 100;
    // Demand 10-25% of their treasury, clamped to 25-200
    const amount = Math.max(25, Math.min(200,
      Math.floor(theirTreasury * (0.1 + 0.15 * (ratio - 1.8) / 2))
    ));

    const action = { type: 'DEMAND_TRIBUTE', targetCiv: i, amount };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      break; // only one demand per turn
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// Combined entry point
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate all diplomacy-related actions for an AI turn.
 *
 * Returns an array of actions. Responses to incoming proposals/demands
 * come first (they may be time-sensitive), followed by proactive
 * diplomatic moves (war declarations, peace proposals, tribute demands).
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @returns {Array<object>}
 */
export function generateDiplomacyActions(gameState, mapBase, civSlot) {
  const actions = [];

  try {
    // ── Respond to incoming proposals/demands first ──
    const treatyResponses = respondToTreatyProposals(gameState, mapBase, civSlot);
    actions.push(...treatyResponses);

    const demandResponses = respondToTributeDemands(gameState, mapBase, civSlot);
    actions.push(...demandResponses);

    // ── Proactive diplomacy ──

    // Consider declaring war on weak neighbors
    const warActions = considerDeclaringWar(gameState, mapBase, civSlot);
    actions.push(...warActions);

    // Consider proposing peace when losing
    const peaceActions = considerProposingPeace(gameState, mapBase, civSlot);
    actions.push(...peaceActions);

    // Consider demanding tribute from weaker civs
    const tributeActions = considerDemandingTribute(gameState, mapBase, civSlot);
    actions.push(...tributeActions);

  } catch (err) {
    console.error(`[diplomai] Error for civ ${civSlot}:`, err);
  }

  return actions;
}
