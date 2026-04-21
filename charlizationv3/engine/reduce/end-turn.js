// ═══════════════════════════════════════════════════════════════════
// reduce/end-turn.js — END_TURN action handler
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_FUEL, UNIT_ATK, UNIT_DEF, ADVANCE_NAMES, IMPROVE_COSTS, IMPROVE_MAINTENANCE, ROAD_TURNS, IRRIGATION_TURNS, MINING_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, TERRAIN_TRANSFORM, TRANSFORM_TURNS, UNIT_NO_LIGHTHOUSE_BONUS, DIFFICULTY_KEYS } from '../defs.js';
import { resolveDirection, moveCost, calcEffectiveMovementPoints } from '../movement.js';
import { calcGotoDirection } from '../pathfinding.js';
import { updateVisibility } from '../visibility.js';
import { ORDER_BYTES } from '../order-bytes.js';
import { calcCityTrade, calcShieldProduction, calcGrossFood, calcGrossTrade, calcTradeCorruption, calcTradeDistribution } from '../production.js';
import { cityHasBuilding, hasWonderEffect, markCitySeenByCiv } from '../utils.js';
import { calcResearchCost, calcTechParadigmCost, grantAdvance, handleTechDiscovery, upgradeUnitsForTech, getAvailableResearch } from '../research.js';
import { checkGameEndConditions, recalcSpaceshipStats, calcCivScore } from '../spaceship.js';
import { processCityTurn } from '../cityturn.js';
import { assignInitialWorkers } from './helpers.js';
import { processDiplomacyTimers, applyGovernmentChangeEffects } from '../diplomacy.js';
import { dispatchEvents, pollReceivedTechTriggers, EVENT_TURN, EVENT_RECEIVED_TECH, EVENT_TURN_INTERVAL, EVENT_RANDOM_TURN } from '../events.js';
import { completeWorkerOrder, getWorkerTurnsNeeded, countCooperatingWorkers, autoAssignWorker, removeWorstWorker, discoverContacts, killUnit, checkCivElimination, findFirstAliveCiv } from './helpers.js';
import { processBarbarianAI, processBarbCampProduction, spawnBarbarians } from './barbarians.js';
// resolveGoodyHut is defined in move-unit.js but is also used in GOTO continuation within END_TURN.
// We need the same function. Rather than exporting the local function from move-unit.js (which
// would create a circular-ish dependency), we inline the goody-hut logic imported from move-unit.
// Actually, resolveGoodyHut is called via the GOTO continuation in END_TURN. We need to import it.
// Since it's a private function in move-unit.js, we must either export it or duplicate.
// The simplest correct approach: export resolveGoodyHut from move-unit.js.
import { resolveGoodyHut } from './move-unit.js';

/**
 * Handle the END_TURN action.
 * @param {object} state - mutable clone of game state
 * @param {object} prev - previous immutable state
 * @param {object} mapBase - immutable map data
 * @param {object} action - { type: END_TURN }
 * @param {number} civSlot - acting player's civ slot
 */
export function handleEndTurn(state, prev, mapBase, action, civSlot) {
  const endingCiv = state.turn.activeCiv;

  // ── Begin-of-turn worker continuation for the ENDING civ ──
  // Civ2 processes pending worker orders at the START of each civ's turn.
  // We're at the moment the civ's turn is ENDING (in our combined flow),
  // but this is the last chance to progress any orders set during the
  // player's decisions this turn — so we run them here. The result is
  // road/irrigation/etc. completes one turn earlier than it would if we
  // only processed at end-of-turn, matching Civ2's observed behavior
  // (road ordered on turn T completes on turn T+1's start, not T+1 end).
  {
    const workerOrders = ['road', 'railroad', 'irrigation', 'mine',
                          'fortress', 'airbase', 'pollution'];
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (!u || u.owner !== endingCiv || u.gx < 0) continue;
      if (!workerOrders.includes(u.orders)) continue;
      const terrain = mapBase.getTerrain(u.gx, u.gy);
      const isEngineer = u.type === 1;
      const newWorkTurns = (u.workTurns || 0) + 1;
      const hasRiver = !!(mapBase.hasRiver && mapBase.hasRiver(u.gx, u.gy));
      const coopCount = countCooperatingWorkers(state, u.gx, u.gy, u.orders, u.owner);
      const turnsNeeded = getWorkerTurnsNeeded(u.orders, terrain, isEngineer,
                                               { hasRiver, coopCount });
      const unitMP = (UNIT_MOVE_POINTS[u.type] || 1) * MOVEMENT_MULTIPLIER;
      if (newWorkTurns >= turnsNeeded) {
        const hasRefrigeration = !!(state.civTechs?.[endingCiv]?.has(70));
        completeWorkerOrder(u.orders, u.gx, u.gy, terrain, mapBase,
                            { hasRefrigeration });
        state.units[ui] = { ...u, orders: 'none', order: 0xFF,
                            workTurns: 0, moveSpent: unitMP, movesLeft: 0 };
      } else {
        state.units[ui] = { ...u, workTurns: newWorkTurns,
                            moveSpent: unitMP, movesLeft: 0 };
      }
    }
  }

  // ── Advance to next civ ──
  let next = endingCiv;
  let turnNumber = state.turn.number;
  for (let i = 0; i < 7; i++) {
    next = (next % 7) + 1;
    if (state.civsAlive & (1 << next)) break;
  }
  const firstAlive = findFirstAliveCiv(state.civsAlive);
  const isNewTurnCycle = next <= endingCiv || next === firstAlive;

  // ── Binary FUN_00487371: once-per-cycle processing runs BEFORE turn increment ──
  // Binary order: spawn_barbarians → update_pollution → calc_rankings → check_tech
  // THEN: turnCounter++ → calc_year → begin_turn_unit_reset
  if (isNewTurnCycle) {
    // ── Binary line 3297: game end check runs at START of cycle, not end ──
    if (!state.gameOver) {
      const earlyEndResult = checkGameEndConditions(state);
      if (earlyEndResult && earlyEndResult.ended) {
        state.gameOver = { winner: earlyEndResult.winner, reason: earlyEndResult.reason };
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'gameOver', winner: earlyEndResult.winner, reason: earlyEndResult.reason,
          ...(earlyEndResult.score != null ? { score: earlyEndResult.score } : {}),
        });
      }
    }

    // ── Binary line 3293: barbarian spawning runs BEFORE power rankings ──
    // Binary order: spawn_barbarians → update_pollution → calc_rankings
    //
    // In replay mode (sniffer-driven event replay), barbarian spawn/AI
    // comes from UNIT_CREATED/UNIT_MOVED events, not v3's own RNG-driven
    // generation. Running v3's spawn here would create DUPLICATE ghost
    // barbarians with random positions/types. Skip.
    if (!state.replayMode) {
      spawnBarbarians(state, mapBase);
      processBarbarianAI(state, prev, mapBase);
      processBarbCampProduction(state, mapBase);
    }

    // ── #77: Power rankings — calculate ONCE at cycle start AFTER barbarian spawn ──
    // Binary FUN_004853e7: calc_power_graph_rankings() runs after barbarian processing.
    {
      const powerRanking = new Array(8).fill(0);
      for (let c = 1; c < 8; c++) {
        if (!(state.civsAlive & (1 << c))) continue;
        const techCount = state.civTechs?.[c]?.size || 0;
        const cityCount = state.cities.filter(ci => ci.owner === c && ci.size > 0).length;
        const treasury = state.civs?.[c]?.treasury || 0;
        // Unit strength: per unit, (atk+def+1)/2 * mp/2
        let unitStrength = 0;
        for (const u of state.units) {
          if (u.owner !== c || u.gx < 0) continue;
          const atk = UNIT_ATK[u.type] || 0;
          const def = UNIT_DEF[u.type] || 0;
          const mp = UNIT_MOVE_POINTS[u.type] || 1;
          unitStrength += Math.floor((atk + def + 1) / 2) * Math.floor(mp / 2);
        }
        powerRanking[c] = techCount * 3 + cityCount * 8 + Math.floor(treasury / 32) + unitStrength;
      }
      // Sort into ranks: 1=weakest, 7=strongest
      const powerRank = new Array(8).fill(0);
      for (let c = 1; c < 8; c++) {
        if (!(state.civsAlive & (1 << c))) continue;
        let rank = 1;
        for (let other = 1; other < 8; other++) {
          if (other === c || !(state.civsAlive & (1 << other))) continue;
          if (powerRanking[other] < powerRanking[c]) rank++;
          else if (powerRanking[other] === powerRanking[c] && other < c) rank++;
        }
        powerRank[c] = rank;
      }
      state.powerRanking = powerRanking;
      state.powerRank = powerRank;
      // Store into per-civ data for diplomacy/AI use
      if (state.civs) {
        state.civs = [...state.civs];
        for (let c = 1; c < 8; c++) {
          if (state.civs[c]) {
            state.civs[c] = { ...state.civs[c], powerRank: powerRank[c] };
          }
        }
      }

      // ── #174: Power graph war trigger ──
      // Binary: when power disparity between two civs exceeds a threshold,
      // the stronger AI civ may auto-declare war on a weaker neighbor.
      // Conditions:
      //   - Strong civ must be AI (not human)
      //   - Strong civ's power >= 3x weak civ's power
      //   - Civs must share a continent (have adjacent cities)
      //   - Civs must not already be at war
      //   - Strong civ must not be at war with 2+ other civs already
      //   - Only triggers every 8 turns (timing gate)
      // This simulates the "big fish eats little fish" mechanic from the binary.
      if (turnNumber % 8 === 0 && turnNumber >= 20) {
        const humanPlayersMask_ = state.humanPlayers || 0xFF;
        for (let strong = 1; strong < 8; strong++) {
          if (!(state.civsAlive & (1 << strong))) continue;
          if ((1 << strong) & humanPlayersMask_) continue; // skip human civs
          const strongPower = powerRanking[strong];
          if (strongPower <= 0) continue;

          // Count existing wars for strong civ
          let warCount = 0;
          for (let w = 1; w < 8; w++) {
            if (w === strong || !(state.civsAlive & (1 << w))) continue;
            if (state.treaties) {
              const wKey = strong < w ? `${strong}-${w}` : `${w}-${strong}`;
              if (state.treaties[wKey] === 'war') warCount++;
            }
          }
          if (warCount >= 2) continue; // already fighting on multiple fronts

          for (let weak = 1; weak < 8; weak++) {
            if (weak === strong || !(state.civsAlive & (1 << weak))) continue;
            const weakPower = powerRanking[weak];
            if (weakPower <= 0) continue;

            // Check power disparity: strong must be >= 3x weak
            if (strongPower < weakPower * 3) continue;

            // Check not already at war
            if (state.treaties) {
              const tKey = strong < weak ? `${strong}-${weak}` : `${weak}-${strong}`;
              if (state.treaties[tKey] === 'war') continue;
              // Must have contact
              if (state.treaties[tKey] === undefined) continue;
            } else {
              continue; // no treaties means no contact
            }

            // Check shared continent (either has a city on same bodyId)
            let sharedContinent = false;
            if (mapBase.getBodyId) {
              const strongBodies = new Set();
              for (const c of state.cities) {
                if (c.owner === strong && c.size > 0 && c.gx >= 0) {
                  strongBodies.add(mapBase.getBodyId(c.gx, c.gy));
                }
              }
              for (const c of state.cities) {
                if (c.owner === weak && c.size > 0 && c.gx >= 0) {
                  if (strongBodies.has(mapBase.getBodyId(c.gx, c.gy))) {
                    sharedContinent = true;
                    break;
                  }
                }
              }
            } else {
              sharedContinent = true; // can't check, assume true
            }
            if (!sharedContinent) continue;

            // Declare war: strong AI attacks weak neighbor
            if (!state.treaties) state.treaties = {};
            const warKey = strong < weak ? `${strong}-${weak}` : `${weak}-${strong}`;
            state.treaties = { ...state.treaties, [warKey]: 'war' };

            // Set treaty flags
            if (state.treatyFlags) {
              const kAB = `${strong}-${weak}`;
              const kBA = `${weak}-${strong}`;
              state.treatyFlags = { ...state.treatyFlags };
              state.treatyFlags[kAB] = (state.treatyFlags[kAB] || 0) | 0x2801; // WAR + WAR_STARTED + CONTACT
              state.treatyFlags[kBA] = (state.treatyFlags[kBA] || 0) | 0x2001; // WAR + CONTACT
            }

            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({
              type: 'powerDisparityWar',
              aggressor: strong,
              victim: weak,
              aggressorPower: strongPower,
              victimPower: weakPower,
              ratio: (strongPower / weakPower).toFixed(1),
            });
            break; // only one power-disparity war per strong civ per cycle
          }
        }
      }
    }

    // Barbarian spawn + AI already moved above (before power rankings)

    // Real Civ2 splits "turn boundary" processing into two parts:
    //
    //   1. GLOBAL at turn wrap — fortifying→fortified promotion fires
    //      for every unit whose fortify order is at least one turn old.
    //      Observed in the sniffer: a Carthaginian warrior fortified on
    //      turn 4 shows order=1 at turn 5 snapshot and order=2 at turn 6
    //      snapshot, even though civ 6's turn 6 hasn't started yet.
    //
    //   2. PER-CIV at that civ's turn start — moveSpent reset, movesLeft
    //      top-up, idleLastTurn capture. Real Civ2 resets a civ's units
    //      only when that civ's turn comes up, so a mid-cycle snapshot
    //      (activeCiv=human) shows the civs that already processed this
    //      turn with fresh move state and the civs still to come with
    //      their prior-turn end state intact.
    //
    // Heal eligibility (binary FUN_00488cef): a unit may heal at the
    // start of its civ's next turn ONLY if its 0x40 flag is clear — i.e.,
    // it did not move during its last turn. We capture that decision
    // here, before mp is reset, by recording
    // `idleLastTurn = (movesLeft >= maxFresh)`.
    // Order-byte sync table is in ../order-bytes.js (shared with the
    // reducer's UNIT_ORDER handler). Local const ORDER_BYTES used to
    // live here; extracted so both reducer and end-turn stay in sync.
    // GLOBAL fortifying→fortified promotion at turn wrap. Runs once
    // per cycle boundary for EVERY unit, not per-civ at START_TURN.
    // This is genuinely a cycle-boundary event in the binary, not a
    // per-owner event — empirically confirmed by observing a civ-6
    // (after-human) warrior fortified on turn 4 showing fortified at
    // snapshot 6 even though civ 6's cycle-6 turn hadn't started yet.
    // A per-civ START_TURN model can't produce this behavior cleanly
    // with a single delay value; the binary's check is issue-turn vs
    // current-turn, independent of turn ordering within the cycle.
    //
    // This is distinct from:
    //   - Per-civ moveSpent/movesLeft reset → START_TURN action
    //     (start-turn.js), fired by harness/server per civ.
    //   - Worker-order progress (road, irrigation, etc.) → workTurns
    //     accumulator at memory +0x0D, incremented during the owner
    //     civ's END_TURN (above in this file, ~line 56).
    const postWrapTurn = turnNumber + 1;
    state.units = state.units.map(u => {
      if (u.gx < 0) return u;
      const shouldPromote = u.orders === 'fortifying'
        && (u.fortifyIssuedTurn == null || u.fortifyIssuedTurn < postWrapTurn);
      if (!shouldPromote) return u;
      const orders = 'fortified';
      return { ...u, orders, order: ORDER_BYTES[orders] };
    });

    // ── #145: Future tech counter — increment after turn 199 ──
    // Binary FUN_00487371: if turn > 199, late_game_counter++ (DAT_00655b14)
    // This counter tracks turns in late game for scoring and AI decisions.
    if (turnNumber > 199) {
      state.lateGameCounter = (state.lateGameCounter || 0) + 1;
    }

    // ── #146: Random ozone/event timer ──
    // Binary FUN_00487371: if next_random_event_turn < turn, schedule next
    // random event at turn + rand()%40 + 20 (20-60 turns away).
    // This drives random barbarian events and global events.
    if (!state.nextRandomEventTurn || state.nextRandomEventTurn < turnNumber) {
      const randOffset = state.rng
        ? state.rng.nextInt(40) + 20
        : Math.floor(Math.random() * 40) + 20;
      state.nextRandomEventTurn = turnNumber + randOffset;
      // Fire random event (barbarian incursion, ozone depletion, etc.)
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'randomEventTimer',
        turn: turnNumber,
        nextEventTurn: state.nextRandomEventTurn,
      });
    }
  }

  // ── Binary FUN_00487371 line 1816: turn counter increments AFTER cycle processing ──
  if (isNewTurnCycle) turnNumber++;

  state.turn = { activeCiv: next, number: turnNumber };

  // ── Worker-order continuation at round advance ──
  // When a full round completes and the turn counter ticks, every civ's
  // pending worker orders should advance one more tick — corresponding
  // to Civ2's "begin-of-new-turn processing for each civ" phase that
  // happens at round start. Without this, multi-turn tasks (e.g. road
  // on grassland taking 2 turns) complete a turn late.
  if (isNewTurnCycle) {
    const workerOrders = ['road', 'railroad', 'irrigation', 'mine',
                          'fortress', 'airbase', 'pollution'];
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (!u || u.gx < 0) continue;
      if (!workerOrders.includes(u.orders)) continue;
      const terrain = mapBase.getTerrain(u.gx, u.gy);
      const isEngineer = u.type === 1;
      const newWorkTurns = (u.workTurns || 0) + 1;
      const hasRiver = !!(mapBase.hasRiver && mapBase.hasRiver(u.gx, u.gy));
      const coopCount = countCooperatingWorkers(state, u.gx, u.gy, u.orders, u.owner);
      const turnsNeeded = getWorkerTurnsNeeded(u.orders, terrain, isEngineer,
                                               { hasRiver, coopCount });
      const unitMP = (UNIT_MOVE_POINTS[u.type] || 1) * MOVEMENT_MULTIPLIER;
      if (newWorkTurns >= turnsNeeded) {
        const hasRefrigeration = !!(state.civTechs?.[u.owner]?.has(70));
        completeWorkerOrder(u.orders, u.gx, u.gy, terrain, mapBase,
                            { hasRefrigeration });
        state.units[ui] = { ...u, orders: 'none', order: 0xFF,
                            workTurns: 0, moveSpent: unitMP, movesLeft: 0 };
      } else {
        state.units[ui] = { ...u, workTurns: newWorkTurns,
                            moveSpent: unitMP, movesLeft: 0 };
      }
    }
  }

  // ── Begin-of-turn processing for the NEW active civ ──
  const activeCiv = next;

  // ── Council meeting check (binary FUN_0048aa24 / check_turn_advisors) ──
  // Binary fires this for the human player at the start of their turn,
  // every 50 turns. Picks one of the player's larger cities (rand-weighted).
  if (turnNumber >= 2 && (turnNumber - 1) % 50 === 0 && state.councilEnabled !== false) {
    const isActiveCivHumanCouncil = !!((1 << activeCiv) & (state.humanPlayers || 0xFF));
    if (isActiveCivHumanCouncil) {
      // Binary FUN_0048aa24 lines 3047-3068: iterate active civ's cities,
      // for each: weight = citySize (or *2 if has Palace), then pick max of
      // (rand() % weight) across cities.
      let bestCi = -1;
      let bestScore = -1;
      const rng = state.rng;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (!c || c.size <= 0) continue;
        if (c.owner !== activeCiv) continue;
        let weight = c.size;
        if (c.buildings && c.buildings.has(1)) weight *= 2;
        const score = weight <= 1 ? 0 : (rng ? rng.nextInt(weight) : Math.floor(Math.random() * weight));
        if (score > bestScore) {
          bestScore = score;
          bestCi = ci;
        }
      }
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'councilMeeting',
        cityIndex: bestCi,
        cityName: bestCi >= 0 ? state.cities[bestCi].name : null,
        civSlot: activeCiv,
        turn: turnNumber,
      });
    }
  }

  // ── Casualty notification ──
  // Binary game loop FUN_0048b340 lines 3428-3454: when starting a civ's turn,
  // computes delta = unitsLostLifetime - unitsLostNotified. If delta > 0,
  // shows the CASUALTY (delta==1) or CASUALTIES (delta>1) dialog and updates
  // unitsLostNotified to current. We fire it as a turnEvent for client UI.
  if (state.civs?.[activeCiv]) {
    const civ = state.civs[activeCiv];
    const lifetime = civ.unitsLostLifetime || 0;
    const notified = civ.unitsLostNotified || 0;
    const delta = lifetime - notified;
    if (delta > 0) {
      if (!Array.isArray(state.civs) || Object.isFrozen(state.civs)) {
        state.civs = [...state.civs];
      }
      state.civs[activeCiv] = { ...state.civs[activeCiv], unitsLostNotified: lifetime };
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'casualtyReport',
        civSlot: activeCiv,
        count: delta,
      });
    }
  }

  // ── Anarchy countdown ──
  if (state.civs?.[activeCiv]) {
    const civ = state.civs[activeCiv];
    if (civ.government === 'anarchy' && civ.anarchyTurns > 0) {
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const updCiv = { ...state.civs[activeCiv] };
      updCiv.anarchyTurns = updCiv.anarchyTurns - 1;
      if (updCiv.anarchyTurns <= 0) {
        const newGovt = updCiv.pendingGovernment || 'despotism';
        updCiv.government = newGovt;
        // Binary FUN_0055c69d sets stateFlags bit 0x08 here, but the
        // per-civ FUN_00560084 tick clears it on the next turn before
        // any snapshot captures it. We skip the set to avoid diff
        // false-positives (v3's start-turn doesn't run for AI civs
        // after the human, so the set would stick and diverge).
        delete updCiv.pendingGovernment;
        delete updCiv.anarchyTurns;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'anarchyEnded', civSlot: activeCiv,
          government: newGovt,
        });
        // Apply government change side effects (Fanatics production switch, embassy clearing)
        state.civs[activeCiv] = updCiv;
        const govtChangeEvents = applyGovernmentChangeEffects(state, activeCiv, 'anarchy', newGovt);
        for (const ev of govtChangeEvents) state.turnEvents.push(ev);

        // Gap 57: Government-change production reset for all cities
        // When government changes, validate all cities' production.
        // If the current production is no longer valid under the new government,
        // reset it (e.g., Fanatics under non-Fundamentalism).
        for (let ci = 0; ci < state.cities.length; ci++) {
          const c = state.cities[ci];
          if (c.owner !== activeCiv || c.size <= 0) continue;
          const item = c.itemInProduction;
          if (!item) continue;
          // Fanatics (unit type 8) require Fundamentalism
          if (item.type === 'unit' && item.id === 8 && newGovt !== 'fundamentalism') {
            state.cities[ci] = {
              ...state.cities[ci],
              itemInProduction: { type: 'unit', id: 11 }, // Reset to Riflemen
              shieldsInBox: 0,
            };
          }
        }

        // Gap 80: Darwin's Voyage revolution-pending flag
        // If the civ had darwinPendingTech set during anarchy, grant the deferred tech now.
        if (updCiv.darwinPendingTech) {
          const darwinAvail = getAvailableResearch(state, activeCiv);
          if (darwinAvail.length > 0) {
            const advId = darwinAvail[0];
            grantAdvance(state, activeCiv, advId);
            state.turnEvents.push({
              type: 'freeAdvance', civSlot: activeCiv,
              advanceId: advId, source: "Darwin's Voyage (deferred)",
            });
          }
          delete updCiv.darwinPendingTech;
        }
      }
      state.civs[activeCiv] = updCiv;
    }
  }

  // ── Binary FUN_00489553 lines 2476-2484: clamp treasury BEFORE heal/city processing ──
  if (state.civs?.[activeCiv]) {
    const preCiv = state.civs[activeCiv];
    let t = preCiv.treasury || 0;
    if (t > 30000) t = 30000;
    if (t < -0x4000) t = 30000; // binary overflow protection
    if (t < 0) t = 0;
    if (t !== preCiv.treasury) {
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      state.civs[activeCiv] = { ...preCiv, treasury: t };
    }
  }

  // ── #34: Heal units BEFORE city processing (binary FUN_00488cef) ──
  // Binary: healing runs at START of each civ's turn before cities process.
  // Binary FUN_00488cef line 2300: heal only runs if the unit's old 0x40
  // flag (moved-last-turn) was clear. We use idleLastTurn captured at the
  // start of the new turn cycle.
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== activeCiv || u.gx < 0) continue;
    if (u.movesRemain <= 0) continue;

    const domain = UNIT_DOMAIN[u.type] ?? 0;
    const maxHp = (UNIT_HP[u.type] || 1) * 10;

    // If unit moved last turn (idleLastTurn === false), handle attrition or skip.
    if (u.idleLastTurn === false) {
      // Binary FUN_00488cef lines 2384-2394: helicopter attrition.
      // Air domain (1), range/fuel == 0 (helicopter), NOT in city → take damage.
      if (domain === 1 && !(UNIT_FUEL[u.type] > 0)) {
        const tileIdx = u.gy * mapBase.mw + u.gx;
        const tile = mapBase.tileData?.[tileIdx];
        const inCity = state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.size > 0);
        if (!inCity) {
          const attrition = Math.floor(maxHp / 10);
          const newDmg = Math.min(maxHp - 1, u.movesRemain + attrition);
          state.units[ui] = { ...u, movesRemain: newDmg, idleLastTurn: true };
          continue;
        }
      }
      state.units[ui] = { ...u, idleLastTurn: true };
      continue;
    }

    const ownCity = state.cities.find(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner && c.size > 0);
    let healBase = 1;
    let hasMatchingBuilding = false;

    if (ownCity) {
      // ── In own city (distance == 0) ──
      // Binary FUN_00488cef lines 2321-2356:
      // Step 4: Near-city bonus (distance < 4, land only)
      if (domain === 0) {
        const hasBarracks = cityHasBuilding(ownCity, 2);
        healBase += hasBarracks ? 2 : 1; // +1 near city, +2 if barracks
      }
      // Step 5: Domain-specific building check (in-city only)
      // land=Barracks(2), air=Airport(32), sea=Port Facility(34)
      const matchingBuildingId = domain === 0 ? 2 : domain === 1 ? 32 : 34;
      hasMatchingBuilding = cityHasBuilding(ownCity, matchingBuildingId);
      if (hasMatchingBuilding) {
        healBase <<= 1; // conditional double for matching building
      }
      // Step 6: Unconditional in-city double
      healBase <<= 1;
      // Step 7: Scale by max HP
      healBase = Math.floor(maxHp / 10) * healBase;
      // Step 8: Full heal if matching building present in city
      if (hasMatchingBuilding) healBase = u.movesRemain;
      // Step 9: Air units in city with airport also get full heal
      if (domain === 1) {
        const hasAirport = cityHasBuilding(ownCity, 32);
        if (hasAirport) healBase = u.movesRemain;
      }
    } else {
      // ── Not in own city ──
      const tileIdx = u.gy * mapBase.mw + u.gx;
      const tile = mapBase.tileData?.[tileIdx];
      const onFortress = tile && tile.improvements && tile.improvements.fortress;

      // Binary line 2316: fortress (bit 0x40 without city bit 0x02) → heal 2
      if (onFortress) {
        healBase = 2;
      }
      // Binary: no turn parity check — field units heal 1 every turn

      // Binary lines 2321-2328: near-city bonus for land units (distance < 4)
      if (domain === 0) {
        for (const c of state.cities) {
          if (c.owner !== u.owner || c.size <= 0) continue;
          let cdx = Math.abs(u.gx - c.gx);
          if (mapBase.wraps) cdx = Math.min(cdx, mapBase.mw - cdx);
          const cdy = Math.abs(u.gy - c.gy);
          if (cdx + cdy <= 3) {
            const hasBarracks = cityHasBuilding(c, 2);
            healBase += hasBarracks ? 2 : 1;
            break;
          }
        }
      }
      // Step 7: Scale by max HP
      healBase = Math.floor(maxHp / 10) * healBase;
    }

    if (healBase > 0) {
      const newHpLost = Math.max(0, u.movesRemain - healBase);
      if (newHpLost !== u.movesRemain) {
        // Binary FUN_00488cef lines 2368-2374: sentry auto-wake on full heal.
        // Condition: damage == 0 AND order == sentry AND (domain != land OR tile != ocean)
        let newOrders = u.orders;
        if (newHpLost === 0 && u.orders === 'sentry') {
          if (domain !== 0) {
            newOrders = 'none'; // air/sea always wake
          } else {
            const terrain = mapBase.getTerrain ? mapBase.getTerrain(u.gx, u.gy) : -1;
            if (terrain !== 10) newOrders = 'none'; // land wakes unless on ocean
          }
        }
        state.units[ui] = { ...u, movesRemain: newHpLost, orders: newOrders };
      }
    }
  }

  // ── Process city resistance for the active civ ──
  state.cities = [...prev.cities];
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;
    if (city.resistanceTurns > 0) {
      state.cities[ci] = state.cities[ci] !== city ? state.cities[ci] : { ...city };
      // Count garrisoned military units (attack > 0)
      let garrison = 0;
      for (const u of state.units) {
        if (u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0
            && (UNIT_ATK[u.type] || 0) > 0) {
          garrison++;
        }
      }
      // Decrement: 1 base + garrison bonus
      const resDec = 1 + garrison;
      state.cities[ci].resistanceTurns = Math.max(0, city.resistanceTurns - resDec);
    }
  }

  // ── #12: Check if active civ is AI — skip pollution/upkeep for AI civs ──
  const humanPlayersMask = state.humanPlayers || 0xFF;
  const isActiveCivHuman = !!((1 << activeCiv) & humanPlayersMask);

  // ── Process cities for the active civ (happiness, food, production, support, disorder) ──
  // Delegated to processCityTurn() in cityturn.js which orchestrates:
  //   1. Food processing FIRST (growth, famine, granary, aqueduct/sewer gates)
  //   2. Recalculate yields including happiness
  //   3. Shield production & completion (units, buildings, wonders)
  //   4. Unit support deficit (disband most-distant units)
  //   5. Disorder check (democracy revolution risk)
  // #75: Process cities backwards (highest index to 0) to match binary behavior
  for (let ci = state.cities.length - 1; ci >= 0; ci--) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;

    // Bootstrap worker assignment before yield processing. Cities loaded
    // from a mid-turn snapshot arrive with empty workedTiles and would
    // report zero yields. Mirror Civ2's end-of-turn worker optimization.
    if (!city.workedTiles || city.workedTiles.length === 0) {
      const assigned = assignInitialWorkers(
        city.gx, city.gy, city.size, city, ci, state, mapBase
      );
      state.cities[ci] = { ...state.cities[ci], workedTiles: assigned };
    }

    const result = processCityTurn(ci, state, mapBase, {
      autoAssignWorker,
      removeWorstWorker,
    }, { skipPollution: !isActiveCivHuman });

    // Emit all events from this city's turn processing
    if (result.events.length > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...result.events);
    }
  }

  // ── Persist per-city yield stats to match Civ2's memory layout ──
  // Real Civ2 stores per-turn yields at city+0x1E (netBaseTrade), +0x4A
  // (scienceOutput), +0x4C (taxOutput), +0x4E (totalTrade), +0x50
  // (foodProd), +0x51 (shieldProd). Parser reads these and the dump
  // surfaces them. Without persistence they stay at whatever the input
  // snapshot had, causing spurious diffs.
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner !== activeCiv || c.size <= 0) continue;
    try {
      const grossFood = calcGrossFood(c, ci, state, mapBase);
      const { grossShields } = calcShieldProduction(c, ci, state, mapBase, state.units);
      const grossTrade = calcGrossTrade(c, ci, state, mapBase);
      const corruption = calcTradeCorruption(c, grossTrade, state, mapBase);
      const netTrade = Math.max(0, grossTrade - corruption);
      const { tax: taxOutput, sci: scienceOutput } =
        calcTradeDistribution(netTrade, c, ci, state);
      state.cities[ci] = {
        ...c,
        foodProduction: grossFood,
        shieldProduction: grossShields,
        netBaseTrade: netTrade,
        totalTrade: netTrade,
        scienceOutput, taxOutput,
      };
    } catch (_) { /* skip on error */ }
  }

  // ── Recalc spaceship stats (may have built SS parts this turn) ──
  recalcSpaceshipStats(state, activeCiv);

  // ── Post-visibility city marking (binary FUN_0043cc00) ──
  // After all unit/city processing for this civ, scan all cities and mark
  // the ones on tiles now visible to this civ. Records the seenByCivs bitmask
  // and the last-known city size per civ — used for FOW of enemy cities.
  if (mapBase?.tileData) {
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.size <= 0) continue;
      const tileIdx = c.gy * mapBase.mw + c.gx;
      const tile = mapBase.tileData[tileIdx];
      if (tile && (tile.visibility & (1 << activeCiv))) {
        markCitySeenByCiv(c, activeCiv);
      }
    }
  }

  // ── Famine elimination check: if a city was destroyed by famine, check if civ is eliminated ──
  checkCivElimination(state, activeCiv);

  // NOTE: Pollution generation is now handled per-city by processCityPollution()
  // inside processCityTurn() (D.1), including nuclear meltdown. Only the global
  // warming check remains here.

  // ── #11: Global warming: run pollution counter update ONCE per full turn cycle ──
  // Binary processes this once when civ 0 (first alive) runs, not every civ.
  // #13: When counter exceeds threshold, degrade terrain tiles.
  if (isNewTurnCycle) {
    // Binary FUN_00486c2e (update_pollution_counter) lines 1599-1620:
    //   local_c = DAT_00655b12 - DAT_00655b10/2  (effective pollution tile count)
    //   local_14 = count of cities with Solar Plant (improvement 0x1d=29)
    //   if (numCivs > 1) local_c = (numCivs - 1 + local_c) / numCivs
    //   netPressure = local_c * 2 + warmingCount * -4 - local_14
    // Note: only Solar Plants subtract from netPressure here. Recycling Centers
    // reduce per-city pollution generation, not the global warming counter.
    let pollCount = 0;
    for (const tile of mapBase.tileData) {
      if (tile && tile.improvements && tile.improvements.pollution) pollCount++;
    }
    let solarPlantCount = 0;
    for (const c of state.cities) {
      if (c.size <= 0) continue;
      if (cityHasBuilding(c, 29)) solarPlantCount++;   // Solar Plant = improvement 0x1d
    }

    // Count alive civs for multi-civ divisor
    let aliveCivCount = 0;
    for (let c = 1; c < 8; c++) {
      if (state.civsAlive & (1 << c)) aliveCivCount++;
    }
    aliveCivCount = Math.max(1, aliveCivCount);

    // Pollution level: number of pollution tiles, divided by alive civ count
    let pollLevel = pollCount;
    if (aliveCivCount > 1) {
      pollLevel = Math.floor((aliveCivCount - 1 + pollLevel) / aliveCivCount);
    }

    // Net pressure: pollution × 2 - warmingEvents × 4 - solarPlantCities
    const warmingCount = state.globalWarmingCount || 0;
    const netPressure = pollLevel * 2 - warmingCount * 4 - solarPlantCount;

    // Drift counter toward net pressure (±1 per turn)
    // Binary lines 1612-1619: if (netPressure <= counter) { if (netPressure < counter) counter--- }
    //                         else counter++;
    let counter = state.pollutionCounter || 0;
    if (netPressure > counter) counter++;
    else if (netPressure < counter) counter--;
    counter = Math.max(0, Math.min(99, counter));
    state.pollutionCounter = counter;

    // Binary line 1621: FEARWARMING dialog fires when counter == 12 AND pollLevel > 6
    if (counter === 12 && pollLevel > 6) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'pollutionWarning', severity: 'high' });
    }

    // Trigger global warming at counter > 16 (binary line 1628: '\x10' < counter)
    if (counter > 16) {
      state.globalWarmingCount = warmingCount + 1;
      state.pollutionCounter = 0; // reset after event

      // Apply terrain degradation across the map (FUN_004868fb)
      // Binary iterates all tiles: terrain < 4 → degrade based on position hash vs severity
      const severity = warmingCount; // use pre-increment count as severity
      for (let gy = 0; gy < mapBase.mh; gy++) {
        for (let gx = 0; gx < mapBase.mw; gx++) {
          const tileIdx = gy * mapBase.mw + gx;
          const tile = mapBase.tileData[tileIdx];
          if (!tile) continue;
          const ter = tile.terrain;
          if (ter >= 4) continue; // only desert(0), plains(1), grassland(2), forest(3)

          // Hash-based selection: (x*3 - y*3) & 7 == severity
          if (((gx * 3 - gy * 3) & 7) !== (severity & 7)) continue;

          // D-WARM-1: Count adjacent land tiles for severe degradation branch
          let adjacentLand = 0;
          const dirs8 = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
          for (const [ddx, ddy] of dirs8) {
            let nx = gx + ddx, ny = gy + ddy;
            if (ny < 0 || ny >= mapBase.mh) continue;
            if (mapBase.wraps) nx = ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw;
            else if (nx < 0 || nx >= mapBase.mw) continue;
            const nt = mapBase.tileData[ny * mapBase.mw + nx];
            if (nt && nt.terrain !== 10) adjacentLand++;
          }

          if (adjacentLand >= 7 - severity) {
            // Severe degradation: swamp/desert + clear roads/fortress
            tile.terrain = ter <= 1 ? 0 : 8; // desert/plains→desert, grassland/forest→swamp
            tile.improvements = { ...tile.improvements, road: false, railroad: false, fortress: false, irrigation: false, mining: false };
          } else {
            // Mild degradation (original hash-based)
            if (ter === 3) {
              tile.terrain = 9; // Forest → Jungle
              tile.improvements = { ...tile.improvements, irrigation: false, mining: false };
            } else if (ter === 2) {
              tile.terrain = 1; // Grassland → Plains
            } else {
              tile.terrain = 0; // Desert/Plains → Desert
            }
          }
        }
      }

      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'globalWarming' });
    }
  }

  // ── Reset airlift flags for active civ's cities ──
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;
    if (city.airliftedThisTurn) {
      state.cities[ci] = { ...state.cities[ci], airliftedThisTurn: false };
    }
  }

  // ── Trade / Treasury / Science for the active civ ──
  // D.5: Trade route income is now folded into calcCityTrade via
  // calcTradeRouteIncome — no separate accumulation needed.
  let civTaxTotal = 0;
  let civSciTotal = 0;
  // civMaintenanceTotal removed — maintenance handled per-city in processCityTurn
  // #147: Per-civ score accumulators during city processing
  // civPopulationTotal: linear sum (Σ city.size) — matches binary civ+0x6c, the
  //   "total city population" field used by happiness calcs.
  // civPopulationDemographic: triangular sum (Σ size*(size+1)/2) — matches
  //   binary FUN_0043cce5 (block_00430000.c:4478-4500), used for the population
  //   display ("12,345,000 people") and milestone events. Min clamp to 1.
  let civPopulationTotal = 0;
  let civPopulationDemographic = 0;

  // #123: Per-city science accumulation — precompute doubling conditions
  // Binary FUN_004efbc6: science doubling is applied PER CITY before accumulation,
  // not as a civ-level total doubling. This matters because shield overflow beakers
  // from each city are also doubled per-city.
  const diffIdx = ['chieftain','warlord','prince','king','emperor','deity'].indexOf(state.difficulty || 'chieftain');
  const isHumanCiv = !!((1 << activeCiv) & (state.humanPlayers || 0xFF));
  const aiBuildingSpaceship = !isHumanCiv && diffIdx > 1 && state.cities.some(c =>
    c.owner === activeCiv && c.size > 0 && c.itemInProduction &&
    c.itemInProduction.type === 'building' &&
    c.itemInProduction.id >= 35 && c.itemInProduction.id <= 37
  );
  const shouldDoubleScience = (diffIdx === 0 && isHumanCiv) || aiBuildingSpaceship;

  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;

    // Bootstrap worker assignment for cities that have none. Cities
    // loaded from a snapshot captured mid-turn (before Civ2 had run
    // end-of-turn auto-assignment) arrive with empty workedTiles, which
    // zeroes their yields. Real Civ2 re-runs worker optimization at
    // end-of-turn. Mirror that here so fresh cities get real yields.
    if ((!city.workedTiles || city.workedTiles.length === 0) && city.size > 0) {
      const assigned = assignInitialWorkers(
        city.gx, city.gy, city.size, city, ci, state, mapBase
      );
      state.cities[ci] = { ...city, workedTiles: assigned };
      // Reassign local reference for calcs below
      Object.assign(city, state.cities[ci]);
    }

    // #147: Accumulate population for score tracking
    // Linear sum mirrors binary's civ+0x6c "city size sum" (used internally
    // by happiness/AI). Triangular sum is the displayed population units.
    civPopulationTotal += city.size;
    civPopulationDemographic += (city.size * (city.size + 1)) >> 1;

    if (city.resistanceTurns > 0) continue; // no trade during resistance
    if (city.civilDisorder) continue; // no trade/science during civil disorder
    const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
    civTaxTotal += tax;

    // #123: Per-city science with per-city doubling
    let citySci = sci;

    // A.6 shield-overflow-to-research removed 2026-04-18. Observed turn
    // 4→5 diff across all 6 civs with cities showed each predicted +1
    // beaker above actual when this block was active. Real Civ2 only
    // converts leftover shields to beakers on item COMPLETION, not per
    // turn. If this needs to be re-added later, gate it on production
    // completion in the per-city production handler instead.

    // #123: Apply doubling PER CITY (not civ-level total)
    if (shouldDoubleScience) citySci *= 2;

    civSciTotal += citySci;

    // Maintenance is NOT deducted here — it's handled per-city in
    // processCityTurn → payBuildingUpkeep (binary FUN_004f0221).
    // The per-city approach matches the binary and handles auto-sell
    // on a per-city basis when treasury goes negative.
  }

  // Update civ treasury and research progress
  if (state.civs && state.civs[activeCiv]) {
    // Clone from CURRENT state.civs (not prev.civs) to preserve earlier
    // mutations like unitsLostNotified from casualty report.
    state.civs = state.civs !== prev.civs ? [...state.civs] : [...prev.civs];
    const civ = { ...state.civs[activeCiv] };
    // Only add tax income — maintenance already deducted per-city
    civ.treasury = (civ.treasury || 0) + civTaxTotal;

    // #147: Store accumulated population for score computations
    civ.totalPopulation = civPopulationTotal;

    // #71: Building upkeep — civ-level fallback: auto-sell if treasury
    // is still negative after per-city upkeep (shouldn't normally happen).
    while (civ.treasury < 0) {
      let sold = false;
      for (let sci = 0; sci < state.cities.length && civ.treasury < 0; sci++) {
        const sc = state.cities[sci];
        if (sc.owner !== activeCiv || sc.size <= 0 || !sc.buildings) continue;
        for (let bid = 1; bid <= 38 && civ.treasury < 0; bid++) {
          if (bid === 1) continue; // never sell Palace
          if (bid >= 35 && bid <= 37) continue; // never sell SS parts
          if (!sc.buildings.has(bid)) continue;
          const maint = IMPROVE_MAINTENANCE[bid] || 0;
          if (maint <= 0) continue;
          // Sell this building from THIS city
          const sellCity = { ...state.cities[sci] };
          const sellBuildings = new Set(sellCity.buildings);
          sellBuildings.delete(bid);
          sellCity.buildings = sellBuildings;
          sellCity.hasWalls = sellBuildings.has(8);
          sellCity.hasPalace = sellBuildings.has(1);
          state.cities[sci] = sellCity;
          civ.treasury += IMPROVE_COSTS[bid] || 0;
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'buildingSold', cityName: sellCity.name, cityIndex: sci,
            civSlot: activeCiv, buildingId: bid,
          });
          sold = true;
          break; // sold one building from this city, re-evaluate treasury
        }
      }
      if (!sold) { civ.treasury = 0; break; }
    }

    // Binary FUN_004fa944: clamp treasury to [0, 30000]
    civ.treasury = Math.max(0, Math.min(30000, civ.treasury));

    // Treasury warning — alert player when net income is negative and they have cities
    const netIncomeThisTurn = civTaxTotal; // maintenance already deducted per-city
    const myCityCount = state.cities.filter(c => c.owner === activeCiv && c.size > 0).length;
    if (netIncomeThisTurn < 0 && myCityCount > 1) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'treasuryWarning', civSlot: activeCiv,
        treasury: civ.treasury, netIncome: netIncomeThisTurn,
      });
    }

    // A.3: Science doubling now handled per-city in the loop above (#123)

    // ── Research accumulation + completion ──
    // Binary FUN_0049a48e: beakers are added FIRST, then the total is
    // compared against cost. On completion, cost is SUBTRACTED (overflow
    // carries forward), and techBeingResearched KEEPS pointing at the
    // just-discovered tech — the AI (or human) sets a new target next
    // turn. Previous v3 order (check, then accumulate) combined with
    // progress=0 / techBeingResearched=0xFF reset caused two kinds of
    // mismatch vs real Civ2:
    //   (a) progress reset to 0 instead of overflow (civ 4 at turn 95
    //       ended with progress=0 instead of 1)
    //   (b) researchingTech cleared to 0xFF instead of keeping the
    //       discovered tech (civ 4 at turn 41 showed researching=255
    //       instead of 65)
    const techId = civ.techBeingResearched;
    if (!state.scenarioTechRestrictions?.noResearch) {
      civ.researchProgress = (civ.researchProgress || 0) + civSciTotal;
    }
    if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
      const cost = calcResearchCost(state, activeCiv);
      if (process.env.DEBUG_RESEARCH) {
        console.error(`[tech-debug] civ ${activeCiv} tech=${techId} prog=${civ.researchProgress} cost=${cost} sciAdd=${civSciTotal} techCount=${state.civTechs?.[activeCiv]?.size}`);
      }
      if ((civ.researchProgress || 0) >= cost) {
        // handleTechDiscovery may mutate state.civs[activeCiv].treasury
        // (e.g., barracks refund on Gunpowder/Automobile at research.js:329).
        // Capture pre-value so we can apply JUST the delta to the local
        // civ clone — preserving the civTaxTotal already added at line 939.
        // Prior code did `civ.treasury = state.civs[activeCiv].treasury`
        // which clobbered the tax income whenever a tech was discovered
        // that turn — per treasury_rounding_diagnosis.md, 7 of 16 gold
        // mismatches on game_20260420_221438.
        const preTreasury = state.civs[activeCiv]?.treasury ?? 0;
        grantAdvance(state, activeCiv, techId);
        civ.researchProgress = Math.max(0, civ.researchProgress - cost);
        // Reset techBeingResearched to 0xFF. Empirically the sniffer-
        // captured snapshot AFTER discovery usually has researchingTech
        // == 0xFF (11 of 12 observed cases in the 84-pair suite). The
        // one case where it stayed at the discovered tech (civ 4/5 at
        // turn 41) is the outlier — likely a specific moment before
        // the AI's auto-pick fired. Prefer the common case.
        civ.techBeingResearched = 0xFF;
        state.discoveredAdvance = { civSlot: activeCiv, advanceId: techId };
        const techEvents = handleTechDiscovery(state, activeCiv, techId);
        if (techEvents.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...techEvents);
        }
        // Apply ONLY the delta that handleTechDiscovery introduced
        // (barracks refund, etc.) to the local civ clone — preserves
        // the civTaxTotal from line 939. See preTreasury capture above.
        const postTreasury = state.civs[activeCiv]?.treasury ?? preTreasury;
        civ.treasury = (civ.treasury || 0) + (postTreasury - preTreasury);
        if (state.scenarioEvents && state.scenarioEvents.length > 0) {
          dispatchEvents(state, mapBase, EVENT_RECEIVED_TECH, { civSlot: activeCiv, techId });
        }
        console.log(`[tech] Civ ${activeCiv} discovered ${ADVANCE_NAMES[techId]} (id=${techId}), civTechs now:`, [...state.civTechs[activeCiv]]);
      }
    }

    state.civs[activeCiv] = civ;

    // ── #78: Population milestone check — call after each civ's turn ──
    // Binary FUN_00489292: check_population_milestone(civ_id, prev_gold)
    // Checks for 10K, 100K, 1M, 10M population milestones and emits events.
    // Population is in "thousands" (city size × 10,000 in Civ2 display).
    // Binary FUN_00489292 calls FUN_0043cce5 (triangular sum, clamped [1,32000])
    // for the milestone source value, so we use the demographic (triangular)
    // total here, not the linear city-size sum.
    {
      const prevMilestone = civ.populationMilestone || 0;
      // Civ2 demographic population: each "1" here represents 10,000 people.
      // Min 1, max 32,000 (binary FUN_0043cce5 lines 4493-4498).
      const currentPop = Math.max(1, Math.min(32000, civPopulationDemographic));
      let newMilestone = prevMilestone;
      let milestonePop = 0;
      if (currentPop < 100) {
        // Track in units of 10 (10K people = 1 citizen)
        if (prevMilestone * 10 < currentPop) {
          milestonePop = Math.floor(currentPop / 10) * 10;
          newMilestone = Math.floor(currentPop / 10);
        }
      } else {
        // Track in units of 100 (100K people = 10 citizens)
        if ((prevMilestone - 9) * 100 < currentPop) {
          milestonePop = Math.floor(currentPop / 100) * 100;
          newMilestone = Math.floor(currentPop / 100) + 9;
        }
      }
      if (newMilestone > prevMilestone) {
        state.civs = state.civs !== prev.civs ? [...state.civs] : state.civs;
        state.civs[activeCiv] = {
          ...state.civs[activeCiv],
          populationMilestone: newMilestone,
        };
        if (isHumanCiv) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'populationMilestone',
            civSlot: activeCiv,
            population: milestonePop,
          });
        }
      }
    }
  }

  // ── Paradigm pacing: check_tech_advance (FUN_00486e6f) ──
  // Binary: once per turn, if the civ has a Palace (building 1) and the
  // civ's total score exceeds calcTechParadigmCost(researchSlot + 1),
  // advance the paradigm slot. This is a hidden pacing counter that
  // affects AI research timing. Gated on: not scenario flag 0x80, and
  // turn > DAT_0064bc56 * 20 + 1 (paradigm turn delay, default 0 → turn > 1).
  // Binary only runs in SP mode; for our server we run for all civs.
  if (turnNumber > 1 && !state.scenarioTechRestrictions?.noResearch) {
    const civObj = state.civs?.[activeCiv];
    if (civObj) {
      // Require a Palace (building 1) in at least one city
      const hasPalace = state.cities.some(c =>
        c.owner === activeCiv && c.size > 0 && c.buildings?.has?.(1));
      if (hasPalace) {
        const slot = civObj.researchSlot || 0;
        const score = calcCivScore(state, activeCiv, mapBase)?.total || 0;
        const threshold = calcTechParadigmCost(slot + 1, diffIdx);
        if (score >= threshold && slot < 37) { // < 0x26 = 38; slot is 0-based, cap at 37
          if (!Array.isArray(state.civs) || Object.isFrozen(state.civs)) {
            state.civs = [...state.civs];
          }
          state.civs[activeCiv] = {
            ...state.civs[activeCiv],
            researchSlot: slot + 1,
          };
        }
      }
    }
  }

  // ── Q.2: Great Library ──
  // Great Library (wonder 4): immediately grant techs known by 2+ other civs.
  // Binary FUN_004bf05b: ONLY the Great Library owner gets free techs.
  // There is no general "tech leak" mechanic in Civ2.
  {
    const hasGreatLibrary = hasWonderEffect(state, activeCiv, 4);
    if (hasGreatLibrary) {
      const myTechs = state.civTechs?.[activeCiv];
      if (myTechs) {
        for (let advId = 0; advId < ADVANCE_NAMES.length; advId++) {
          if (myTechs.has(advId)) continue;
          let count = 0;
          for (let c = 1; c < 8; c++) {
            if (c === activeCiv || !(state.civsAlive & (1 << c))) continue;
            if (state.civTechs[c]?.has(advId)) count++;
          }
          if (count >= 2) {
            grantAdvance(state, activeCiv, advId);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'Great Library' });
          }
        }
      }
    }
  }

  // ── Leonardo's Workshop: auto-upgrade obsolete units ──
  // Primary upgrade happens in handleTechDiscovery() at discovery time.
  // This per-turn sweep catches edge cases (e.g., capturing Leonardo's after
  // having the obsoleting tech, or loading a save with stale unit types).
  if (hasWonderEffect(state, activeCiv, 14)) {
    const techs = state.civTechs?.[activeCiv];
    if (techs) {
      for (const t of techs) {
        const leoEvents = upgradeUnitsForTech(state, activeCiv, t);
        if (leoEvents.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...leoEvents);
        }
      }
    }
  }

  // ── Process unit orders for active civ (worker progress, fuel, GOTO) ──
  // NOTE: HP recovery has been moved above city processing (#34)
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== activeCiv || u.gx < 0) continue;

    // Air unit fuel: decrement when away from city/carrier/airbase, crash at 0
    const maxFuel = UNIT_FUEL[u.type];
    if (maxFuel > 0) {
      const fuelTileIdx = u.gy * mapBase.mw + u.gx;
      const fuelTile = mapBase.tileData?.[fuelTileIdx];
      const onAirbase = fuelTile && fuelTile.improvements && fuelTile.improvements.airbase;
      const atBase = onAirbase
        || state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner)
        || state.units.some((v, vi) => vi !== ui && v.gx === u.gx && v.gy === u.gy
          && v.owner === u.owner && v.type === 42 && v.gx >= 0);
      if (atBase) {
        if ((u.fuelRemaining ?? maxFuel) !== maxFuel)
          state.units[ui] = { ...state.units[ui], fuelRemaining: maxFuel };
      } else {
        const fuel = (state.units[ui].fuelRemaining ?? maxFuel) - 1;
        if (fuel <= 0) {
          killUnit(state, ui);
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({ type: 'unitLost', unitType: u.type, reason: 'fuel', civSlot: activeCiv });
        } else {
          state.units[ui] = { ...state.units[ui], fuelRemaining: fuel };
        }
      }
      continue; // air units don't do worker orders
    }

    // Worker orders are now processed at START of each civ's turn (see
    // the "Begin-of-turn worker continuation" block near the top of this
    // function). That single-pass location avoids the double-increment
    // we'd otherwise get from processing at both end-of-turn-X AND
    // start-of-turn-X+1.

    // Transform terrain order (Engineers only)
    if (u.orders === 'transform' && u.type === 1) {
      const tfTerrain = mapBase.getTerrain(u.gx, u.gy);
      const tfTarget = TERRAIN_TRANSFORM[tfTerrain];
      const tfTurnsNeeded = Math.max(1, Math.ceil((TRANSFORM_TURNS[tfTerrain] || 10) / 2)); // Engineers work at 2x speed
      const tfWorked = (u.turnsWorked || 0) + 1;
      if (tfWorked >= tfTurnsNeeded && tfTarget >= 0) {
        // Transform complete
        const tfTileIdx = u.gy * mapBase.mw + u.gx;
        if (mapBase.tileData[tfTileIdx]) {
          mapBase.tileData[tfTileIdx].terrain = tfTarget;
          // Clear improvements that don't apply to new terrain
          mapBase.tileData[tfTileIdx].improvements = {
            ...mapBase.tileData[tfTileIdx].improvements,
            irrigation: false,
            mining: false,
            farmland: false,
          };
        }
        state.units[ui] = { ...u, orders: 'none', turnsWorked: 0 };
      } else {
        state.units[ui] = { ...u, turnsWorked: tfWorked, movesLeft: 0 };
      }
    }

    // GOTO continuation: units with goto orders continue moving next turn
    if (u.orders === 'goto' && u.goToX != null && u.goToY != null && u.movesLeft > 0) {
      const gtTargetGx = u.goToX;
      const gtTargetGy = u.goToY;
      // Already at destination?
      if (u.gx === gtTargetGx && u.gy === gtTargetGy) {
        state.units[ui] = { ...u, orders: 'none', goToX: undefined, goToY: undefined };
      } else {
        // Use calcGotoDirection for step-by-step GOTO continuation
        let gtCurUnit = { ...u };
        let gtMoved = false;
        while (gtCurUnit.movesLeft > 0 && gtCurUnit.gx >= 0) {
          // Compute next direction (handles A*, adjacency, geometric fallback)
          const gtResult = calcGotoDirection(gtCurUnit, gtTargetGx, gtTargetGy, mapBase, gtCurUnit.owner, state.units, state.cities);
          if (!gtResult) break; // no path or already there

          const gtDir = gtResult.dir;
          const gtNextDest = resolveDirection(gtCurUnit.gx, gtCurUnit.gy, gtDir, mapBase);
          if (!gtNextDest) break;

          // Binary: cancel goto if next tile has enemy/foreign units
          // FUN_0042738c (cancel_goto_if_blocked) + FUN_004273e6 (cancel_goto_for_stack)
          const enemyOnTile = state.units.some(eu =>
            eu.gx === gtNextDest.gx && eu.gy === gtNextDest.gy && eu.gx >= 0 &&
            eu.owner !== activeCiv && eu.owner !== 0
          );
          if (enemyOnTile) {
            // Cancel goto — enemy/foreign unit blocks path
            gtCurUnit = { ...gtCurUnit, orders: 'none', goToX: undefined, goToY: undefined };
            break;
          }

          const gtMoveCostVal = moveCost(gtCurUnit.type, mapBase, gtCurUnit.gx, gtCurUnit.gy, gtNextDest.gx, gtNextDest.gy);
          if (gtMoveCostVal < 0) break;
          const gtActual = gtMoveCostVal; // #119: Railroad cost is 0 (free movement)
          gtCurUnit = {
            ...gtCurUnit,
            gx: gtNextDest.gx, gy: gtNextDest.gy,
            x: gtNextDest.gx * 2 + (gtNextDest.gy % 2), y: gtNextDest.gy,
            movesLeft: Math.max(0, gtCurUnit.movesLeft - gtActual),
          };
          gtMoved = true;
          // Update visibility
          if (mapBase.tileData) {
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, activeCiv, gtNextDest.gx, gtNextDest.gy, mapBase.wraps);
            discoverContacts(state, mapBase, activeCiv, gtNextDest.gx, gtNextDest.gy, 1);
          }
          // Check goody hut — only land units (domain 0) trigger huts (#66)
          const gtHutIdx = gtNextDest.gy * mapBase.mw + gtNextDest.gx;
          const gtHutTile = mapBase.tileData?.[gtHutIdx];
          if (gtHutTile && gtHutTile.goodyHut && activeCiv > 0 && (UNIT_DOMAIN[gtCurUnit.type] ?? 0) === 0) {
            gtHutTile.goodyHut = false;
            const gtHutResult = resolveGoodyHut(state, mapBase, gtCurUnit, activeCiv);
            if (gtHutResult) state.goodyHutResult = { ...gtHutResult, civSlot: activeCiv };
            break;
          }
          // Reached destination?
          if (gtNextDest.gx === gtTargetGx && gtNextDest.gy === gtTargetGy) {
            gtCurUnit.orders = 'none';
            gtCurUnit.goToX = undefined;
            gtCurUnit.goToY = undefined;
            break;
          }
        }
        if (gtMoved) {
          state.units[ui] = gtCurUnit;
        }
      }
    }
  }

  // C.2: Trireme sinking is now checked per-move in move-unit.js, not per-turn.

  // ── Once-per-full-turn-cycle: scenario events, diplomacy, council ──
  // Note: barbarian spawning was moved to the top of the turn cycle (#76)
  if (isNewTurnCycle) {
    // ── Scenario events: TURN, TURN_INTERVAL, RANDOM_TURN, RECEIVED_TECH triggers ──
    // Binary game loop (FUN_0048b340 lines 3310-3315) calls all four event check
    // functions at the top of each turn cycle:
    //   FUN_004fba0c — turn trigger    (EVENT_TURN)
    //   FUN_004fba9c — interval trigger (EVENT_TURN_INTERVAL)
    //   FUN_004fbb2f — random trigger   (EVENT_RANDOM_TURN)
    //   FUN_004fbbdd — tech trigger     (EVENT_RECEIVED_TECH polling)
    if (state.scenarioEvents && state.scenarioEvents.length > 0) {
      dispatchEvents(state, mapBase, EVENT_TURN, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_TURN_INTERVAL, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_RANDOM_TURN, { turn: turnNumber });
      pollReceivedTechTriggers(state, mapBase);
    }

    // ── G.1-G.5: Diplomacy timers (ceasefire expiration, withdrawal, alliance visibility, reputation decay) ──
    const diploEvents = processDiplomacyTimers(state, mapBase, turnNumber);
    if (diploEvents.length > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...diploEvents);
    }

  }

  // ── K.3: Track consecutive peace turns per civ (for score formula) ──
  // A civ is "at peace" if no treaty with any other alive civ is 'war'.
  if (isNewTurnCycle) {
    if (!state.civPeaceTurns) state.civPeaceTurns = new Array(8).fill(0);
    state.civPeaceTurns = [...state.civPeaceTurns];
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      let atWar = false;
      if (state.treaties) {
        for (const [key, status] of Object.entries(state.treaties)) {
          if (status !== 'war') continue;
          const [a, b] = key.split('-').map(Number);
          if (a === c || b === c) { atWar = true; break; }
        }
      }
      state.civPeaceTurns[c] = atWar ? 0 : (state.civPeaceTurns[c] || 0) + 1;
    }
  }

  // ── Attitude decay (FUN_00487371 lines 1824-1841) ──
  // Every (difficulty + 1) * 12 turns: all AI attitudes decay by 1
  // Eiffel Tower doubles the interval
  {
    const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
    let decayInterval = (diffIdx + 1) * 12;
    // Eiffel Tower (wonder 20) doubles interval for its owner
    if (turnNumber > 0 && turnNumber % decayInterval === 0) {
      for (let c = 1; c <= 7; c++) {
        if (!(state.civsAlive & (1 << c))) continue;
        const civ = state.civs?.[c];
        if (!civ?.attitudes) continue;
        // Skip if this civ has Eiffel Tower and we're not at doubled interval
        if (hasWonderEffect(state, c, 20) && turnNumber % (decayInterval * 2) !== 0) continue;
        state.civs = state.civs !== prev.civs ? [...state.civs] : state.civs;
        const attitudes = [...(civ.attitudes || [0,0,0,0,0,0,0,0])];
        for (let t = 0; t < 8; t++) {
          if (attitudes[t] > 0) attitudes[t] -= 1;
        }
        state.civs[c] = { ...civ, attitudes };
      }
    }
  }

  // ── Power ranking war trigger (FUN_004853e7 lines 1112-1153) ──
  // Gap 82: Binary checks vendettaCount * 3 + 3 < attacker.militarism,
  // based on the AI's accumulated vendetta/militarism score, not city count.
  if (turnNumber > 200 && state.civScores) {
    const humanMask = state.humanPlayers || 0xFF;
    let bestAiCiv = -1, bestAiScore = -1;
    let worstHumanCiv = -1, worstHumanScore = Infinity;
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      const score = state.civScores[c] || 0;
      if ((1 << c) & humanMask) {
        if (score < worstHumanScore) { worstHumanScore = score; worstHumanCiv = c; }
      } else {
        if (score > bestAiScore) { bestAiScore = score; bestAiCiv = c; }
      }
    }
    if (bestAiCiv > 0 && worstHumanCiv > 0) {
      // Binary: vendettaCount * 3 + 3 < militarism
      // vendettaCount = number of civs at war with this AI
      // militarism = leader personality trait (from LEADER_PERSONALITY in defs.js)
      let vendettaCount = 0;
      if (state.treaties) {
        for (const [key, status] of Object.entries(state.treaties)) {
          if (status !== 'war') continue;
          const [a, b] = key.split('-').map(Number);
          if (a === bestAiCiv || b === bestAiCiv) vendettaCount++;
        }
      }
      const militarism = state.civs?.[bestAiCiv]?.militarism ?? 0;
      const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
      if (vendettaCount * 3 + 3 < militarism) {
        // Random check: rand() % 32 <= difficulty
        const roll = state.rng ? state.rng.nextInt(32) : Math.floor(Math.random() * 32);
        if (roll <= diffIdx) {
          const key = bestAiCiv < worstHumanCiv
            ? `${bestAiCiv}-${worstHumanCiv}` : `${worstHumanCiv}-${bestAiCiv}`;
          if (state.treaties?.[key] !== 'war') {
            state.treaties = { ...state.treaties, [key]: 'war' };
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({
              type: 'warDeclared', aggressor: bestAiCiv, target: worstHumanCiv,
              reason: 'powerRanking',
            });
          }
        }
      }
    }
  }

  // ── K.4: Periodic civ score computation (every 10 turns) ──
  if (turnNumber > 0 && turnNumber % 10 === 0) {
    if (!state.civScores) state.civScores = new Array(8).fill(0);
    state.civScores = [...state.civScores];
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      state.civScores[c] = calcCivScore(state, c, mapBase);
    }
  }

  // ── #69: United Nations diplomatic victory check ──
  // If the active civ has the United Nations wonder (wonder 24) and all
  // other alive civs have peace or alliance treaties with them, trigger
  // a diplomatic victory event (not an automatic game end, but a check).
  if (!state.gameOver && hasWonderEffect(state, activeCiv, 24)) {
    let allAtPeace = true;
    let otherAlive = 0;
    for (let c = 1; c <= 7; c++) {
      if (c === activeCiv || !(state.civsAlive & (1 << c))) continue;
      otherAlive++;
      const a = Math.min(activeCiv, c);
      const b = Math.max(activeCiv, c);
      const treaty = state.treaties?.[`${a}-${b}`];
      if (treaty !== 'peace' && treaty !== 'alliance') {
        allAtPeace = false;
        break;
      }
    }
    if (allAtPeace && otherAlive >= 2) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'diplomaticVictory', civSlot: activeCiv,
        reason: 'United Nations',
      });
    }
  }

  // ── Game end conditions (Phase I): conquest, spaceship, retirement ──
  if (!state.gameOver) {
    const endResult = checkGameEndConditions(state);
    if (endResult && endResult.ended) {
      state.gameOver = { winner: endResult.winner, reason: endResult.reason, _debug: `checkGameEndConditions → civsAlive=${state.civsAlive.toString(2)}` };
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'gameOver', winner: endResult.winner,
        reason: endResult.reason,
        ...(endResult.score != null ? { score: endResult.score } : {}),
        ...(endResult.year != null ? { year: endResult.year } : {}),
        ...(endResult.successProb != null ? { successProb: endResult.successProb } : {}),
      });
    }
  }
}
