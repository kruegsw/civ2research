// ═══════════════════════════════════════════════════════════════════
// ai/index.js — AI player controller (Phase 8: goals & continent ops)
//
// Called by the server during AI civ turns. Returns an array of
// actions to apply before END_TURN.
//
// Phases:
//   0. Strategic assessment — threat, posture, war/peace targets (advisory)
//   0b. Goal list init/decay + continent threat assessment
//   1. Research & economy — smart tech selection, rate balancing, revolution
//   2. Diplomacy — treaty responses, war declarations, peace proposals, tribute
//   3. City management — production selection and rush-buy
//   4. Settler AI — city founding and worker improvements
//   5. Military AI — exploration, combat, patrol
//   6. Goal cleanup — remove completed/stale goals, dead unit refs
//   7. Cleanup — skip/fortify ALL units that still have moves so END_TURN passes
// ═══════════════════════════════════════════════════════════════════

import { assessStrategy } from './strategyai.js';
import { generateEconActions } from './econai.js';
import { generateDiplomacyActions } from './diplomai.js';
import { generateProductionActions, generateRushBuyActions, generateSellObsoleteActions } from './prodai.js';
import { generateSettlerActions } from './cityai.js';
import { generateMilitaryActions, generateCleanupActions } from './unitai.js';
import { generateBarbarianActions } from './barbarian.js';
import {
  GoalList,
  GOAL_ATTACK_CITY, GOAL_DEFEND_CITY, GOAL_NAVAL_ASSAULT,
  GOAL_REINFORCE, GOAL_EXPLORE,
} from './goals.js';
import { UNIT_ATK, UNIT_DEF, UNIT_DOMAIN } from '../defs.js';

// ── Goal list storage per civ slot ────────────────────────────────
// Persisted between turns via module-level map. Each civ gets its own.
const _civGoals = new Map();

/**
 * Get or create the GoalList for a civ.
 * @param {number} civSlot
 * @returns {GoalList}
 */
function getGoalList(civSlot) {
  let gl = _civGoals.get(civSlot);
  if (!gl) {
    gl = new GoalList();
    _civGoals.set(civSlot, gl);
  }
  return gl;
}

// ── Treaty helper ─────────────────────────────────────────────────
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

// ── Continent threat assessment ───────────────────────────────────

/**
 * Analyze military balance per continent and generate tactical goals.
 * Creates ATTACK_CITY goals for enemy cities on contested continents,
 * DEFEND_CITY goals for our cities on threatened continents, and
 * REINFORCE goals for continents where we're outnumbered.
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @param {object} strategy - includes strategy.aiData with continent info
 * @param {GoalList} goals
 * @param {Array<string>|null} debugLog
 */
function assessContinentThreats(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const aiData = strategy?.aiData;
  if (!aiData || !aiData.continents) return;

  const mw = mapBase.mw;

  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue; // skip ocean/invalid

    const ourMil = cont.militaryCounts.get(civSlot) || 0;
    const ourCities = cont.cityCounts.get(civSlot) || 0;

    // Sum enemy military and cities on this continent
    let enemyMil = 0;
    let enemyCities = 0;
    for (const [civ, count] of cont.militaryCounts) {
      if (civ === civSlot) continue;
      if (civ === 0) continue; // skip barbarians
      const treaty = getTreaty(gameState, civSlot, civ);
      // Only count true enemies (at war with actual contact)
      const key = civSlot < civ ? `${civSlot}-${civ}` : `${civ}-${civSlot}`;
      const hasContact = gameState.treaties?.[key] !== undefined;
      if (treaty === 'war' && hasContact) {
        enemyMil += count;
      }
    }
    for (const [civ, count] of cont.cityCounts) {
      if (civ === civSlot) continue;
      if (civ === 0) continue;
      const key = civSlot < civ ? `${civSlot}-${civ}` : `${civ}-${civSlot}`;
      const hasContact = gameState.treaties?.[key] !== undefined;
      const treaty = getTreaty(gameState, civSlot, civ);
      if (treaty === 'war' && hasContact) {
        enemyCities += count;
      }
    }

    // ── Generate DEFEND goals for our cities on threatened continents ──
    if (ourCities > 0 && enemyMil > 0) {
      const threatRatio = enemyMil / Math.max(ourMil, 1);
      if (threatRatio > 0.5) {
        // Find our cities on this continent and create defend goals
        for (const city of gameState.cities) {
          if (!city || city.size <= 0 || city.gx < 0) continue;
          if (city.owner !== civSlot) continue;
          const idx = city.gy * mw + city.gx;
          const tile = mapBase.tileData?.[idx];
          if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

          const priority = Math.min(255, Math.floor(80 + threatRatio * 40));
          goals.addTacticalGoal(GOAL_DEFEND_CITY, priority, city.gx, city.gy);
        }
      }

      // ── REINFORCE if we're outnumbered ──
      if (threatRatio > 1.5 && ourCities > 0) {
        // Pick our largest city on this continent as reinforce target
        let bestCity = null;
        let bestSize = 0;
        for (const city of gameState.cities) {
          if (!city || city.size <= 0 || city.gx < 0 || city.owner !== civSlot) continue;
          const idx = city.gy * mw + city.gx;
          const tile = mapBase.tileData?.[idx];
          if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;
          if (city.size > bestSize) {
            bestSize = city.size;
            bestCity = city;
          }
        }
        if (bestCity) {
          const priority = Math.min(255, Math.floor(100 + threatRatio * 20));
          goals.addStrategicGoal(GOAL_REINFORCE, priority, bestCity.gx, bestCity.gy);
        }
      }
    }

    // ── Generate ATTACK goals for enemy cities on reachable continents ──
    if (enemyCities > 0 && (ourMil > 0 || ourCities > 0)) {
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner === civSlot) continue;
        const treaty = getTreaty(gameState, civSlot, city.owner);
        const key = civSlot < city.owner ? `${civSlot}-${city.owner}` : `${city.owner}-${civSlot}`;
        const hasContact = gameState.treaties?.[key] !== undefined;
        if (treaty !== 'war' || !hasContact) continue;

        const idx = city.gy * mw + city.gx;
        const tile = mapBase.tileData?.[idx];
        if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

        // Priority based on our military advantage
        const advRatio = ourMil / Math.max(enemyMil, 1);
        const priority = Math.min(255, Math.floor(60 + advRatio * 30 + city.size * 5));
        goals.addTacticalGoal(GOAL_ATTACK_CITY, priority, city.gx, city.gy);
      }
    }

    // ── NAVAL_ASSAULT goals for enemy cities on other continents ──
    // Only if we have some naval capacity (checked in prod/unit AI)
    if (ourCities > 0 && enemyCities === 0 && ourMil >= 3) {
      // Look for enemy cities on OTHER continents accessible by sea
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner === civSlot) continue;
        const treaty = getTreaty(gameState, civSlot, city.owner);
        const key = civSlot < city.owner ? `${civSlot}-${city.owner}` : `${city.owner}-${civSlot}`;
        const hasContact = gameState.treaties?.[key] !== undefined;
        if (treaty !== 'war' || !hasContact) continue;

        const cIdx = city.gy * mw + city.gx;
        const cTile = mapBase.tileData?.[cIdx];
        if (!cTile || (cTile.bodyId ?? 0) === bodyId) continue; // skip same continent

        // Check if city is coastal (has adjacent ocean)
        const neighbors = mapBase.getNeighbors(city.gx, city.gy);
        let isCoastal = false;
        for (const dir in neighbors) {
          const [nx, ny] = neighbors[dir];
          if (ny < 0 || ny >= mapBase.mh) continue;
          const wnx = ((nx % mw) + mw) % mw;
          if (mapBase.getTerrain(wnx, ny) === 10) { isCoastal = true; break; }
        }
        if (!isCoastal) continue;

        const priority = Math.min(200, Math.floor(40 + city.size * 3));
        goals.addStrategicGoal(GOAL_NAVAL_ASSAULT, priority, city.gx, city.gy);
      }
    }
  }

  // ── EXPLORE goals for continents we have units but no cities ──
  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue;
    const ourCities = cont.cityCounts.get(civSlot) || 0;
    const ourMil = cont.militaryCounts.get(civSlot) || 0;
    if (ourMil > 0 && ourCities === 0) {
      // We have units on a continent with no cities — explore for settling
      goals.addTacticalGoal(GOAL_EXPLORE, 40, -1, bodyId); // targetGy stores bodyId
    }
  }

  if (debugLog) {
    const counts = goals.countActive();
    if (counts.total > 0) {
      debugLog.push(`GOALS: ${counts.tactical} tactical, ${counts.strategic} strategic goals active`);
    }
  }
}

/**
 * Run one AI turn for the given civ.
 * Returns an array of actions to apply before END_TURN.
 *
 * IMPORTANT: The server applies these actions sequentially through
 * applyAction(), so later actions see a mutated state. However, we
 * compute all actions against the *initial* state snapshot. To stay
 * safe, each unit gets at most one action per phase.
 *
 * Cleanup issues skip/fortify for ALL units that have movesLeft > 0
 * in the initial snapshot (not just unhandled units). This is safe
 * because:
 *   - Units given UNIT_ORDER/WORKER_ORDER by earlier phases already
 *     have movesLeft=0 after those orders are applied, so the
 *     redundant skip is a harmless no-op (movesLeft already 0).
 *   - Units given MOVE_UNIT may still have movesLeft > 0 after the
 *     move is applied; the skip zeros out remaining movement,
 *     preventing END_TURN rejection.
 *   - Units consumed by BUILD_CITY or disband are dead (gx < 0)
 *     when the skip is applied, so the skip is rejected harmlessly.
 *   - The 'skip' order does NOT change unit.orders, so it never
 *     overwrites fortify/sentry/worker orders set by earlier phases.
 *
 * @param {object} gameState - current mutable game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @param {Array<string>|null} [debugLog=null] - if non-null, AI modules push debug strings here
 * @returns {{ actions: Array<object>, debugLog: Array<string>|null }}
 */
export function runAiTurn(gameState, mapBase, civSlot, debugLog = null) {
  // ── Barbarian AI (civ slot 0): separate simpler logic ──
  if (civSlot === 0) {
    const barbActions = generateBarbarianActions(gameState, mapBase, debugLog);
    return { actions: barbActions, debugLog };
  }

  const actions = [];

  try {
    // ── 0. Strategic assessment (advisory — no actions) ──
    const strategy = assessStrategy(gameState, mapBase, civSlot, undefined, debugLog);

    // ── 0b. Goal list initialization, decay, and continent threat assessment ──
    const goals = getGoalList(civSlot);
    goals.decayGoals();
    goals.cleanupDeadUnits(gameState, civSlot);
    goals.cleanupCapturedCities(gameState, civSlot);
    assessContinentThreats(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // Attach goals to strategy so downstream modules can read them
    strategy.goals = goals;

    // ── 1. Research & economy ──
    for (const a of generateEconActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 2. Diplomacy ──
    for (const a of generateDiplomacyActions(gameState, mapBase, civSlot, debugLog)) {
      actions.push(a);
    }

    // ── 3. City management: production selection + rush-buy + sell obsolete ──
    for (const a of generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }
    for (const a of generateRushBuyActions(gameState, mapBase, civSlot, strategy)) {
      actions.push(a);
    }
    for (const a of generateSellObsoleteActions(gameState, mapBase, civSlot, debugLog)) {
      actions.push(a);
    }

    // ── 4. Settler/Worker AI ──
    for (const a of generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 5. Military unit AI ──
    for (const a of generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 6. Goal cleanup: remove completed goals, update assignments ──
    goals.cleanupDeadUnits(gameState, civSlot);
    goals.cleanupCapturedCities(gameState, civSlot);

    // ── 7. Cleanup: skip/fortify ALL units that still have moves ──
    // Must come last. Does NOT skip "handled" units — see JSDoc above
    // for why this is safe and necessary to prevent END_TURN rejection.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return { actions, debugLog };
}
