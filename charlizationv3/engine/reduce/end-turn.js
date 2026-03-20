// ═══════════════════════════════════════════════════════════════════
// reduce/end-turn.js — END_TURN action handler
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_FUEL, UNIT_ATK, UNIT_DEF, ADVANCE_NAMES, IMPROVE_COSTS, IMPROVE_MAINTENANCE, ROAD_TURNS, IRRIGATION_TURNS, MINING_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, TERRAIN_TRANSFORM, TRANSFORM_TURNS, UNIT_NO_LIGHTHOUSE_BONUS, DIFFICULTY_KEYS } from '../defs.js';
import { resolveDirection, moveCost, calcEffectiveMovementPoints } from '../movement.js';
import { calcGotoDirection } from '../pathfinding.js';
import { updateVisibility } from '../visibility.js';
import { calcCityTrade, calcShieldProduction } from '../production.js';
import { cityHasBuilding, hasWonderEffect } from '../utils.js';
import { calcResearchCost, grantAdvance, handleTechDiscovery, upgradeUnitsForTech, getAvailableResearch } from '../research.js';
import { checkGameEndConditions, recalcSpaceshipStats, calcCivScore } from '../spaceship.js';
import { processCityTurn } from '../cityturn.js';
import { processDiplomacyTimers, applyGovernmentChangeEffects } from '../diplomacy.js';
import { dispatchEvents, EVENT_TURN, EVENT_RECEIVED_TECH, EVENT_TURN_INTERVAL, EVENT_RANDOM_TURN } from '../events.js';
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

  // ── Advance to next civ FIRST ──
  let next = endingCiv;
  let turnNumber = state.turn.number;
  for (let i = 0; i < 7; i++) {
    next = (next % 7) + 1;
    if (state.civsAlive & (1 << next)) break;
  }
  const firstAlive = findFirstAliveCiv(state.civsAlive);
  if (next <= endingCiv || next === firstAlive) {
    turnNumber++;
  }

  // ── Once-per-full-turn-cycle processing (when turn number increments) ──
  const isNewTurnCycle = turnNumber > state.turn.number;
  if (isNewTurnCycle) {
    // ── #77: Power rankings — calculate ONCE at cycle start using end-of-previous-turn state ──
    // Binary FUN_004853e7: calc_power_graph_rankings() runs at start of turn cycle,
    // computing raw power scores and ranking all alive civs before any civ processes.
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

    // #76: Barbarian spawning BEFORE any civ processes (binary: FUN_00489553)
    spawnBarbarians(state, mapBase);

    // Barbarian AI movement phase
    processBarbarianAI(state, prev, mapBase);
    processBarbCampProduction(state, mapBase);

    // #35: Reset ALL units for ALL civs at once at turn start (civ 0)
    // Binary: FUN_005b2a39 resets all units at the start of the turn cycle,
    // not per-civ. This ensures consistent state for all civs.
    state.units = state.units.map(u => {
      if (u.gx < 0) return u;
      const ownerCiv = u.owner;
      const ownerHasLighthouse = hasWonderEffect(state, ownerCiv, 3);
      const ownerHasMagellan = hasWonderEffect(state, ownerCiv, 12);
      const ownerHasNuclearPower = !!(state.civTechs?.[ownerCiv]?.has(59));
      const orders = u.orders === 'fortifying' ? 'fortified' : u.orders;
      let mp = calcEffectiveMovementPoints(u);
      if (UNIT_DOMAIN[u.type] === 2) { // sea domain
        if (ownerHasLighthouse && !UNIT_NO_LIGHTHOUSE_BONUS.has(u.type)) {
          mp += MOVEMENT_MULTIPLIER;
        }
        if (ownerHasMagellan) mp += 2 * MOVEMENT_MULTIPLIER;
        if (ownerHasNuclearPower) mp += MOVEMENT_MULTIPLIER;
      }
      return { ...u, movesLeft: mp, orders };
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

  state.turn = { activeCiv: next, number: turnNumber };

  // ── Begin-of-turn processing for the NEW active civ ──
  const activeCiv = next;

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

  // ── #34: Heal units BEFORE city processing (binary FUN_00488cef) ──
  // Binary: healing runs at START of each civ's turn before cities process
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== activeCiv || u.gx < 0) continue;
    if (u.movesRemain <= 0) continue;

    const domain = UNIT_DOMAIN[u.type] ?? 0;
    const ownCity = state.cities.find(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner && c.size > 0);

    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    let healBase = 1;

    if (ownCity) {
      const matchingBuildingId = domain === 0 ? 2 : domain === 2 ? 34 : 32;
      const hasMatchingBuilding = cityHasBuilding(ownCity, matchingBuildingId);
      healBase = 1;
      if (domain === 0) healBase += (hasMatchingBuilding ? 2 : 1);
      healBase <<= 1;
      healBase <<= 1;
      healBase = Math.floor(maxHp / 10) * healBase;
      if (hasMatchingBuilding) healBase = u.movesRemain;
    } else {
      const alliedCity = state.cities.find(c => {
        if (c.gx !== u.gx || c.gy !== u.gy || c.size <= 0) return false;
        if (c.owner === u.owner) return false;
        const a = Math.min(u.owner, c.owner);
        const b = Math.max(u.owner, c.owner);
        return state.treaties?.[`${a}-${b}`] === 'alliance';
      });

      if (alliedCity) {
        healBase = 2;
      } else {
        const tileIdx = u.gy * mapBase.mw + u.gx;
        const tile = mapBase.tileData?.[tileIdx];
        const onFortress = tile && tile.improvements && tile.improvements.fortress;

        if (onFortress) {
          healBase = 2;
        } else if (turnNumber % 2 === 0) {
          healBase = 1;
        } else {
          healBase = 0;
        }

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
      }
      healBase = Math.floor(maxHp / 10) * healBase;
    }

    if (healBase > 0) {
      const newHpLost = Math.max(0, u.movesRemain - healBase);
      if (newHpLost !== u.movesRemain) {
        state.units[ui] = { ...u, movesRemain: newHpLost };
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

  // ── Recalc spaceship stats (may have built SS parts this turn) ──
  recalcSpaceshipStats(state, activeCiv);

  // ── Famine elimination check: if a city was destroyed by famine, check if civ is eliminated ──
  checkCivElimination(state, activeCiv);

  // NOTE: Pollution generation is now handled per-city by processCityPollution()
  // inside processCityTurn() (D.1), including nuclear meltdown. Only the global
  // warming check remains here.

  // ── #11: Global warming: run pollution counter update ONCE per full turn cycle ──
  // Binary processes this once when civ 0 (first alive) runs, not every civ.
  // #13: When counter exceeds threshold, degrade terrain tiles.
  if (isNewTurnCycle) {
    // Count pollution tiles, recycling centers, and solar plants across all cities
    let pollCount = 0;
    for (const tile of mapBase.tileData) {
      if (tile && tile.improvements && tile.improvements.pollution) pollCount++;
    }
    let recyclingCount = 0;
    let solarPlantCount = 0;
    for (const c of state.cities) {
      if (c.size <= 0) continue;
      if (cityHasBuilding(c, 18)) recyclingCount++;   // Recycling Center = building 18
      if (cityHasBuilding(c, 29)) solarPlantCount++;   // Solar Plant = building 29
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

    // Net pressure: pollution × 2 - warmingEvents × 4 - recyclingCenters - solarPlants
    // Solar Plant cities reduce global warming pressure (binary: reduces counter)
    const warmingCount = state.globalWarmingCount || 0;
    const netPressure = pollLevel * 2 - warmingCount * 4 - recyclingCount - solarPlantCount;

    // Drift counter toward net pressure (±1 per turn)
    let counter = state.pollutionCounter || 0;
    if (netPressure > counter) counter++;
    else if (netPressure < counter) counter--;
    counter = Math.max(0, Math.min(99, counter));
    state.pollutionCounter = counter;

    // Warnings: counter > 12 with pollution > 6, and counter > 6
    if (counter > 12 && pollCount > 6) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'pollutionWarning', severity: 'high' });
    } else if (counter > 6 && pollCount > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'pollutionWarning', severity: 'low' });
    }

    // Trigger global warming at counter > 16
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
  let civMaintenanceTotal = 0;
  // #147: Per-civ score accumulators during city processing
  let civPopulationTotal = 0;

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

    // #147: Accumulate population for score tracking
    civPopulationTotal += city.size;

    if (city.resistanceTurns > 0) continue; // no trade during resistance
    const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
    civTaxTotal += tax;

    // #123: Per-city science with per-city doubling and shield overflow
    let citySci = sci;

    // A.6: Shield overflow → research beakers (per-city)
    // Binary: clamp(shieldSurplus - freeUnitSupport, 0, citySize) → civ research pool
    const { grossShields, support } = calcShieldProduction(city, ci, state, mapBase, state.units);
    const shieldSurplus = grossShields - support;
    if (shieldSurplus > city.size) {
      citySci += Math.min(shieldSurplus - city.size, city.size);
    }

    // #123: Apply doubling PER CITY (not civ-level total)
    if (shouldDoubleScience) citySci *= 2;

    civSciTotal += citySci;

    // #12: Skip building maintenance for AI civs
    if (isActiveCivHuman) {
      civMaintenanceTotal += maintenance;
    }
  }

  // Update civ treasury and research progress
  if (state.civs && state.civs[activeCiv]) {
    state.civs = [...prev.civs];
    const civ = { ...state.civs[activeCiv] };
    civ.treasury = (civ.treasury || 0) + civTaxTotal - civMaintenanceTotal;

    // #147: Store accumulated population for score computations
    civ.totalPopulation = civPopulationTotal;

    // #71: Building upkeep per-city — when treasury goes negative, sell buildings
    // from the currently-processing city (binary FUN_004f0221 processes per-city).
    // Iterate buildings 1-38 in order within each city, selling one at a time.
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
    const netIncomeThisTurn = civTaxTotal - civMaintenanceTotal;
    const myCityCount = state.cities.filter(c => c.owner === activeCiv && c.size > 0).length;
    if (netIncomeThisTurn < 0 && myCityCount > 1) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'treasuryWarning', civSlot: activeCiv,
        treasury: civ.treasury, netIncome: netIncomeThisTurn,
      });
    }

    // A.3: Science doubling now handled per-city in the loop above (#123)

    // Q.4: If scenario restricts tech advances, don't accumulate science
    if (!state.scenarioTechRestrictions?.noResearch) {
      civ.researchProgress = (civ.researchProgress || 0) + civSciTotal;
    }

    // ── Research completion check ──
    const techId = civ.techBeingResearched;
    if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
      const cost = calcResearchCost(state, activeCiv);
      if (civ.researchProgress >= cost) {
        // Grant the advance
        grantAdvance(state, activeCiv, techId);
        civ.researchProgress = 0;
        civ.techBeingResearched = 0xFF; // clear — player must pick next
        // Notify via discoveredAdvance field (client will show picker)
        state.discoveredAdvance = { civSlot: activeCiv, advanceId: techId };
        // Phase G: handle tech discovery effects (barracks refund, wonder obsolescence, Leonardo's)
        const techEvents = handleTechDiscovery(state, activeCiv, techId);
        if (techEvents.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...techEvents);
        }
        // Sync treasury in case handleTechDiscovery modified it (barracks refund)
        civ.treasury = state.civs[activeCiv]?.treasury ?? civ.treasury;
        // Scenario events: tech discovered
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
    {
      const prevMilestone = civ.populationMilestone || 0;
      // Total population in game units (each citizen = 10,000 people)
      const currentPop = civPopulationTotal;
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

  // ── Q.2: Tech leak + Great Library ──
  // Great Library (wonder 4): immediately grant techs known by 2+ other civs.
  // Tech leak (no wonder needed): if 2+ other civs already know a tech,
  // civ gets it free on the NEXT turn (tracked via pendingLeakedTechs).
  {
    const hasGreatLibrary = hasWonderEffect(state, activeCiv, 4);
    const myTechs = state.civTechs?.[activeCiv];
    if (myTechs) {
      // First, grant any pending leaked techs from last turn
      if (state.pendingLeakedTechs?.[activeCiv]?.length > 0) {
        for (const advId of state.pendingLeakedTechs[activeCiv]) {
          if (!myTechs.has(advId)) {
            grantAdvance(state, activeCiv, advId);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'tech leak' });
          }
        }
        // Clear pending
        if (!state.pendingLeakedTechs) state.pendingLeakedTechs = {};
        state.pendingLeakedTechs = { ...state.pendingLeakedTechs, [activeCiv]: [] };
      }

      // Now check for techs known by 2+ other civs
      for (let advId = 0; advId < ADVANCE_NAMES.length; advId++) {
        if (myTechs.has(advId)) continue;
        let count = 0;
        for (let c = 1; c < 8; c++) {
          if (c === activeCiv || !(state.civsAlive & (1 << c))) continue;
          if (state.civTechs[c]?.has(advId)) count++;
        }
        if (count >= 2) {
          if (hasGreatLibrary) {
            // Great Library: grant immediately
            grantAdvance(state, activeCiv, advId);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'Great Library' });
          } else {
            // Tech leak: queue for next turn
            if (!state.pendingLeakedTechs) state.pendingLeakedTechs = {};
            state.pendingLeakedTechs = { ...state.pendingLeakedTechs };
            if (!state.pendingLeakedTechs[activeCiv]) {
              state.pendingLeakedTechs[activeCiv] = [];
            } else {
              state.pendingLeakedTechs[activeCiv] = [...state.pendingLeakedTechs[activeCiv]];
            }
            if (!state.pendingLeakedTechs[activeCiv].includes(advId)) {
              state.pendingLeakedTechs[activeCiv].push(advId);
            }
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

    // Worker orders: road, irrigation, mine, fortress, airbase, pollution, railroad
    const workerOrders = ['road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution'];
    if (workerOrders.includes(u.orders)) {
      const terrain = mapBase.getTerrain(u.gx, u.gy);
      const isEngineer = u.type === 1;
      const newWorkTurns = (u.workTurns || 0) + 1;

      // #17: Per-terrain work-turns with settler cooperation, engineer double-speed, river penalty
      const hasRiver = !!(mapBase.hasRiver && mapBase.hasRiver(u.gx, u.gy));
      const coopCount = countCooperatingWorkers(state, u.gx, u.gy, u.orders, u.owner);
      const turnsNeeded = getWorkerTurnsNeeded(u.orders, terrain, isEngineer, { hasRiver, coopCount });

      if (newWorkTurns >= turnsNeeded) {
        // Complete the improvement
        // Gap 86: Pass Refrigeration tech status for farmland creation
        const hasRefrigeration = !!(state.civTechs?.[activeCiv]?.has(70)); // Refrigeration = tech 70
        completeWorkerOrder(u.orders, u.gx, u.gy, terrain, mapBase, { hasRefrigeration });
        state.units[ui] = { ...u, orders: 'none', workTurns: 0 };
      } else {
        state.units[ui] = { ...u, workTurns: newWorkTurns };
      }
    }

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
    // ── Scenario events: TURN, TURN_INTERVAL, RANDOM_TURN triggers ──
    if (state.scenarioEvents && state.scenarioEvents.length > 0) {
      dispatchEvents(state, mapBase, EVENT_TURN, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_TURN_INTERVAL, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_RANDOM_TURN, { turn: turnNumber });
    }

    // ── G.1-G.5: Diplomacy timers (ceasefire expiration, withdrawal, alliance visibility, reputation decay) ──
    const diploEvents = processDiplomacyTimers(state, mapBase, turnNumber);
    if (diploEvents.length > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...diploEvents);
    }

    // ── Council meeting: every 50 turns (min turn 2) ──
    // Formula: (turn-1) % 50 == 0, starting from turn 2
    if (turnNumber >= 2 && (turnNumber - 1) % 50 === 0 && state.councilEnabled !== false) {
      // Select the largest city, weighted by size (Palace doubles weight)
      let councilCi = -1;
      let councilWeight = -1;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (!c || c.size <= 0) continue;
        let weight = c.size;
        if (c.buildings && c.buildings.has(1)) weight *= 2; // Palace doubles weight
        if (weight > councilWeight) {
          councilWeight = weight;
          councilCi = ci;
        }
      }
      if (councilCi >= 0) {
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'councilMeeting',
          cityIndex: councilCi,
          cityName: state.cities[councilCi].name,
          civSlot: state.cities[councilCi].owner,
          turn: turnNumber,
        });
      }
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
      state.gameOver = { winner: endResult.winner, reason: endResult.reason };
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
