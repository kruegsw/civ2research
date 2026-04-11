// ═══════════════════════════════════════════════════════════════════
// citycapture.js — City capture & civil war (shared: server + client)
//
// Phase B.3: handleCityCapture — comprehensive city capture logic
//            ported from decompiled FUN_0057b5df (11,451 bytes)
// Phase B.4: handleCivilWar — civ schism when capital falls
//            ported from decompiled FUN_0057a904 (3,291 bytes)
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_ATK, UNIT_ROLE, MOVEMENT_MULTIPLIER,
  CITY_RADIUS_DOUBLED, ADVANCE_NAMES, GOVT_INDEX, TERRAIN_DEFENSE,
  WONDER_NAMES, IMPROVE_NAMES,
} from './defs.js';
import { hasWonderEffect, civHasWonder } from './utils.js';
import { updateVisibility } from './visibility.js';
import { grantAdvance } from './research.js';
import { isSchismBlocked } from './events.js';
import { killCiv, addTreatyFlag, setTreatyFlags, getTreatyFlags, TF } from './diplomacy.js';
import { ejectAirUnits } from './combat.js';

// ═══════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════

/** Buildings always destroyed on city capture (Civ2 rules).
 *  Raw C FUN_0057b5df: calls FUN_0043d289 for buildings 1, 4, 0xB(11), 7.
 *  City Walls (8) are NOT always destroyed — they go through the 0xAA random mask. */
const ALWAYS_DESTROYED_ON_CAPTURE = new Set([
  1,   // Palace
  4,   // Temple
  7,   // Courthouse
  11,  // Cathedral
]);


/** Partisan unit type. */
const PARTISAN_TYPE = 9;

/** Guerrilla Warfare tech ID (0x22 = 34). */
const TECH_GUERRILLA_WARFARE = 34;

/** Communism tech ID (0x0F = 15). */
const TECH_COMMUNISM = 15;

/** Democracy tech ID. */
const TECH_DEMOCRACY = 21;

/** Conscription tech ID (0x11 = 17). */
const TECH_CONSCRIPTION = 17;

/** Gunpowder tech ID (0x23 = 35). */
const TECH_GUNPOWDER = 35;

/** Government indices for partisan trigger. */
const GOVT_COMMUNISM = 3;
const GOVT_DEMOCRACY = 6;

/** Marco Polo's Embassy wonder ID. */
const WONDER_MARCO_POLO = 9;

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

/** Simple seeded PRNG (same as combat.js). */
function makePRNG(seed) {
  let s = (seed & 0x7FFFFFFF) || 1;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7FFFFFFF;
    return s;
  };
}

/** Manhattan distance accounting for horizontal wrapping. */
function tileDist(ax, ay, bx, by, mw, wraps) {
  let dx = Math.abs(ax - bx);
  if (wraps) dx = Math.min(dx, mw - dx);
  return dx + Math.abs(ay - by);
}

/** Resolve city radius tile index (0-19) to map coordinates. */
function radiusTileCoords(cityGx, cityGy, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
  const parC = cityGy & 1;
  const parT = ((cityGy + ddy) % 2 + 2) % 2;
  const tgx = cityGx + ((parC + ddx - parT) >> 1);
  const tgy = cityGy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/** Create a new unit object (matches makeUnit in reducer.js). */
function makeUnit(type, owner, gx, gy, movesLeft) {
  return {
    type, owner, gx, gy,
    x: gx * 2 + (gy % 2), y: gy,
    veteran: 0, movesRemain: 0, orders: 'none',
    movesMade: 0, movesLeft: movesLeft ?? 0,
    homeCityId: 0xFFFF,
    goToX: -1, goToY: -1, hpLost: 0xFF,
    commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
    prevInStack: -1, nextInStack: -1,
  };
}

/** Find the most central city for a civ (geometric median approximation). */
function findMostCentralCity(state, mapBase, civSlot, excludeIndex) {
  const ownCities = [];
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner === civSlot && c.size > 0 && ci !== excludeIndex) {
      ownCities.push(ci);
    }
  }
  if (ownCities.length === 0) return -1;

  let bestCi = -1, bestTotalDist = Infinity;
  for (const ci of ownCities) {
    const c = state.cities[ci];
    let totalDist = 0;
    for (const oci of ownCities) {
      if (oci === ci) continue;
      const oc = state.cities[oci];
      totalDist += tileDist(c.gx, c.gy, oc.gx, oc.gy, mapBase.mw, mapBase.wraps);
    }
    // Weight by city size (prefer larger cities as capital)
    totalDist -= c.size * 2;
    if (totalDist < bestTotalDist) {
      bestTotalDist = totalDist;
      bestCi = ci;
    }
  }
  return bestCi;
}

/** Count cities owned by a civ. */
function countCities(state, civSlot) {
  let n = 0;
  for (const c of state.cities) {
    if (c.owner === civSlot && c.size > 0) n++;
  }
  return n;
}

/** Check if civ has a tech. */
function hasTech(state, civSlot, techId) {
  return !!(state.civTechs?.[civSlot]?.has(techId));
}

/** Get government string for a civ. */
function getGovt(state, civSlot) {
  return state.civs?.[civSlot]?.government || 'despotism';
}

/** Get government numeric index. */
function govtIndex(govt) {
  return GOVT_INDEX[govt] ?? 1;
}

/** Get a civ's power rank (0-7, from DAT_00655c22). Defaults to 3. */
function getPowerRank(state, civSlot) {
  return state.civs?.[civSlot]?.powerRank ?? 3;
}

// ═══════════════════════════════════════════════════════════════════
// B.4: handleCivilWar
// Ported from FUN_0057a904 (3,291 bytes)
// ═══════════════════════════════════════════════════════════════════

/**
 * Trigger a civil war — splits a civ in two when its capital is captured
 * and it has 5+ remaining cities.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} oldOwnerSlot - the civ experiencing the schism
 * @param {number} capturedCityIndex - index of the captured capital city (excluded from old owner's city list)
 * @returns {{ success: boolean, newCivSlot: number, events: object[] }}
 */
export function handleCivilWar(state, mapBase, oldOwnerSlot, capturedCityIndex) {
  const events = [];

  // Check preconditions: old owner must have 5+ remaining cities
  const remainingCities = countCities(state, oldOwnerSlot);
  if (remainingCities < 5) return { success: false, newCivSlot: -1, events };

  // Find an unused civ slot (slots 1-7; slot 0 is barbarians)
  let newCivSlot = -1;
  for (let i = 1; i <= 7; i++) {
    if (!(state.civsAlive & (1 << i))) {
      // Also verify no cities or units
      const hasCity = state.cities.some(c => c.owner === i && c.size > 0);
      const hasUnit = state.units.some(u => u.owner === i && u.gx >= 0);
      if (!hasCity && !hasUnit) {
        newCivSlot = i;
        break;
      }
    }
  }
  if (newCivSlot < 0) return { success: false, newCivSlot: -1, events };

  // ── Activate new civ ──
  state.civsAlive |= (1 << newCivSlot);

  // ── Copy civ properties ──
  if (!state.civs) state.civs = [];
  state.civs = [...state.civs];
  const oldCiv = state.civs[oldOwnerSlot] || {};
  state.civs[newCivSlot] = {
    ...oldCiv,
    name: `Rebel ${oldCiv.name || 'Civ'}`,
    // Split gold evenly
    treasury: Math.floor((oldCiv.treasury || 0) / 2),
    // Copy government
    government: oldCiv.government || 'despotism',
    // Copy research progress (half)
    researchProgress: Math.floor((oldCiv.researchProgress || 0) / 2),
    // Start fresh
    taxRate: oldCiv.taxRate ?? 5,
    scienceRate: oldCiv.scienceRate ?? 5,
    luxuryRate: oldCiv.luxuryRate ?? 0,
  };
  // Deduct gold from old civ
  const oldCivClone = { ...state.civs[oldOwnerSlot] };
  oldCivClone.treasury = (oldCivClone.treasury || 0) - (state.civs[newCivSlot].treasury || 0);
  state.civs[oldOwnerSlot] = oldCivClone;

  // ── Copy techs ──
  if (!state.civTechs) state.civTechs = [];
  state.civTechs = [...state.civTechs];
  state.civTechs[newCivSlot] = new Set(state.civTechs[oldOwnerSlot] || []);
  if (!state.civTechCounts) state.civTechCounts = new Array(8).fill(0);
  state.civTechCounts = [...state.civTechCounts];
  state.civTechCounts[newCivSlot] = state.civTechs[newCivSlot].size;

  // ── Copy map visibility ──
  if (mapBase.tileData) {
    const oldBit = 1 << oldOwnerSlot;
    const newBit = 1 << newCivSlot;
    for (const tile of mapBase.tileData) {
      if (tile && (tile.visibility & oldBit)) {
        tile.visibility |= newBit;
      }
    }
  }

  // ── Tally city sizes per continent ──
  const continentPop = {};
  let capitalContinent = -1;
  let capitalCi = -1;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner !== oldOwnerSlot || c.size <= 0 || ci === capturedCityIndex) continue;
    const cont = mapBase.getBodyId(c.gx, c.gy);
    continentPop[cont] = (continentPop[cont] || 0) + c.size;
    if (c.buildings && c.buildings.has(1)) {
      // Has palace — this is the capital
      capitalContinent = cont;
      capitalCi = ci;
    }
  }

  // If no palace found among remaining cities, pick the largest as pseudo-capital
  if (capitalCi < 0) {
    capitalCi = findMostCentralCity(state, mapBase, oldOwnerSlot, capturedCityIndex);
    if (capitalCi >= 0) {
      capitalContinent = mapBase.getBodyId(state.cities[capitalCi].gx, state.cities[capitalCi].gy);
    }
  }
  if (capitalCi < 0) return { success: false, newCivSlot: -1, events };

  const capitalCity = state.cities[capitalCi];

  // ── Decide which cities go to new civ ──
  // Strategy: split by continent if population is balanced,
  // otherwise transfer individual cities farthest from capital.
  let capitalPopTotal = continentPop[capitalContinent] || 0;
  let otherPopTotal = 0;
  for (const [cont, pop] of Object.entries(continentPop)) {
    if (Number(cont) !== capitalContinent) otherPopTotal += pop;
  }

  const citiesToTransfer = [];

  if (capitalPopTotal > 0 && otherPopTotal > 0 &&
      capitalPopTotal < otherPopTotal * 2 && otherPopTotal <= capitalPopTotal) {
    // Balanced: transfer whole continents
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner !== oldOwnerSlot || c.size <= 0 || ci === capturedCityIndex) continue;
      const cont = mapBase.getBodyId(c.gx, c.gy);
      if (cont !== capitalContinent) {
        citiesToTransfer.push(ci);
      }
    }
  } else {
    // Unbalanced: transfer farthest cities until ~1/3 of population transferred
    let totalPop = 0;
    const candidateCities = [];
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner !== oldOwnerSlot || c.size <= 0 || ci === capturedCityIndex) continue;
      totalPop += c.size;
      const dist = tileDist(c.gx, c.gy, capitalCity.gx, capitalCity.gy, mapBase.mw, mapBase.wraps);
      candidateCities.push({ ci, dist, size: c.size });
    }
    // Sort by distance descending (farthest first)
    candidateCities.sort((a, b) => b.dist - a.dist);

    let transferredPop = 0;
    for (const cc of candidateCities) {
      if (transferredPop * 3 >= totalPop) break;
      if (cc.ci === capitalCi) continue; // don't transfer the capital
      citiesToTransfer.push(cc.ci);
      transferredPop += cc.size;
    }
  }

  // ── Transfer cities ──
  state.cities = [...state.cities];
  for (const ci of citiesToTransfer) {
    const c = state.cities[ci];
    state.cities[ci] = {
      ...c,
      owner: newCivSlot,
      buildings: new Set(c.buildings),
      workedTiles: [...(c.workedTiles || [])],
      tradeRoutes: [...(c.tradeRoutes || [])],
      specialists: [...(c.specialists || [])],
      civilDisorder: false,
      weLoveKingDay: false,
      resistanceTurns: 0,
    };

    // Update tile ownership
    const tIdx = c.gy * mapBase.mw + c.gx;
    if (mapBase.tileData[tIdx]) {
      mapBase.tileData[tIdx].tileOwnership = newCivSlot;
    }
    // Update city radius tile ownership
    for (let ri = 0; ri < 20; ri++) {
      const pos = radiusTileCoords(c.gx, c.gy, ri, mapBase);
      if (!pos) continue;
      const rIdx = pos.gy * mapBase.mw + pos.gx;
      const tile = mapBase.tileData[rIdx];
      if (tile && tile.tileOwnership === oldOwnerSlot) {
        tile.tileOwnership = newCivSlot;
      }
    }
  }

  const transferredSet = new Set(citiesToTransfer);

  // ── Reassign units ──
  state.units = [...state.units];
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== oldOwnerSlot || u.gx < 0) continue;

    // Check if unit is in a transferred city or homed to one
    let assignToNew = false;

    // Check if unit is at a transferred city's tile
    for (const ci of citiesToTransfer) {
      const c = state.cities[ci];
      if (u.gx === c.gx && u.gy === c.gy) {
        assignToNew = true;
        break;
      }
    }

    // Or if unit's home city was transferred
    if (!assignToNew && u.homeCityId !== 0xFFFF && transferredSet.has(u.homeCityId)) {
      assignToNew = true;
    }

    if (assignToNew) {
      state.units[ui] = { ...u, owner: newCivSlot };
      // Update visibility for new civ
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, newCivSlot, u.gx, u.gy, mapBase.wraps);
    }
  }

  // ── Give palace to new civ's most central city ──
  const newCapitalCi = findMostCentralCity(state, mapBase, newCivSlot, -1);
  if (newCapitalCi >= 0) {
    const nc = state.cities[newCapitalCi];
    const newBuildings = new Set(nc.buildings);
    newBuildings.add(1); // Palace
    state.cities[newCapitalCi] = { ...nc, buildings: newBuildings, hasPalace: true };
  }

  // ── Ensure old civ still has a palace ──
  const oldHasPalace = state.cities.some((c, ci) =>
    c.owner === oldOwnerSlot && c.size > 0 && ci !== capturedCityIndex &&
    c.buildings && c.buildings.has(1)
  );
  if (!oldHasPalace) {
    const oldCapitalCi = findMostCentralCity(state, mapBase, oldOwnerSlot, capturedCityIndex);
    if (oldCapitalCi >= 0) {
      const oc = state.cities[oldCapitalCi];
      const oldBuildings = new Set(oc.buildings);
      oldBuildings.add(1); // Palace
      state.cities[oldCapitalCi] = { ...oc, buildings: oldBuildings, hasPalace: true };
    }
  }

  // ── #25: Set civil war diplomacy flags between old and new civ ──
  // Binary ref FUN_0057a904 / diplomacy-tables.js:
  //   child→parent: 0x2001 = CONTACT(0x01) + WAR(0x2000)
  //   parent→child: 0x82801 = CONTACT(0x01) + WAR_STARTED(0x800) + WAR(0x2000) + PERIODIC_FLAG_19(0x80000)
  setTreatyFlags(state, newCivSlot, oldOwnerSlot, 0x2001);
  setTreatyFlags(state, oldOwnerSlot, newCivSlot, 0x82801);
  // Sync string-based treaty
  if (!state.treaties) state.treaties = {};
  const tkA = oldOwnerSlot < newCivSlot ? `${oldOwnerSlot}-${newCivSlot}` : `${newCivSlot}-${oldOwnerSlot}`;
  state.treaties = { ...state.treaties, [tkA]: 'war' };

  events.push({
    type: 'civilWar',
    oldCivSlot: oldOwnerSlot,
    newCivSlot,
    citiesTransferred: citiesToTransfer.length,
  });

  return { success: true, newCivSlot, events };
}


// ═══════════════════════════════════════════════════════════════════
// B.3: handleCityCapture
// Ported from FUN_0057b5df (11,451 bytes)
// ═══════════════════════════════════════════════════════════════════

/**
 * Comprehensive city capture: transfers ownership, destroys buildings,
 * plunders gold, steals tech, handles civil war, partisans, and elimination.
 *
 * Called after combat resolves and the attacker defeats the city garrison,
 * OR when a military unit enters an undefended enemy city.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} cityIndex - index into state.cities
 * @param {number} capturerCivSlot - civ slot of the conqueror
 * @param {number} oldOwner - civ slot of the previous owner
 * @param {object} [opts] - optional overrides
 * @param {boolean} [opts.skipBuildingDestruction] - skip random building destruction (e.g. incite revolt)
 * @param {number}  [opts.captureType] - 0=normal (default), 1=transfer, 2=treaty-exempt
 * @returns {{ events: object[] }}
 */
export function handleCityCapture(state, mapBase, cityIndex, capturerCivSlot, oldOwner, opts = {}) {
  const events = [];
  const city = state.cities[cityIndex];
  const cityGx = city.gx;
  const cityGy = city.gy;
  const captureType = opts.captureType ?? 0;

  // Deterministic PRNG seeded from game state for reproducible results
  const rand = makePRNG(
    (cityGx * 31 + cityGy * 17 + capturerCivSlot * 7 + oldOwner * 13 +
     (state.turn?.number || 0) * 23 + city.size * 11) & 0x7FFFFFFF
  );

  // ── Was this previously our city? (recapture) ──
  const wasOurs = (city.originalOwner === capturerCivSlot);

  // ── #62: Set treaty flags on capture ──
  // Binary ref FUN_0057b5df: sets 0x10000 (CAPTURE_NOTIFY), 0x800 (WAR_STARTED),
  // and conditionally 0x400000 (MULTI_CAPTURE_VENDETTA) and 0x10 (VENDETTA)
  if (capturerCivSlot > 0 || oldOwner > 0) {
    // 0x10000: capture notification flag
    const abFlags = getTreatyFlags(state, capturerCivSlot, oldOwner);
    setTreatyFlags(state, capturerCivSlot, oldOwner, abFlags | TF.CAPTURE_NOTIFY);
    // 0x800: war started flag
    const abFlags2 = getTreatyFlags(state, capturerCivSlot, oldOwner);
    setTreatyFlags(state, capturerCivSlot, oldOwner, abFlags2 | TF.WAR_STARTED);

    // 0x400000: multi-capture vendetta (count cities captured by attacker from defender)
    let capturedCount = 0;
    for (let ci = 0; ci < state.cities.length; ci++) {
      if (ci === cityIndex) continue;
      const c = state.cities[ci];
      if (c.size > 0 && c.owner === capturerCivSlot && c.originalOwner === oldOwner) {
        capturedCount++;
      }
    }
    capturedCount++; // include this capture
    if (capturedCount > 1 && (capturedCount & 1) === 0) {
      const mcFlags = getTreatyFlags(state, capturerCivSlot, oldOwner);
      setTreatyFlags(state, capturerCivSlot, oldOwner, mcFlags | TF.MULTI_CAPTURE_VENDETTA);
    }

    // ── #63: Nuclear capture diplomatic flags ──
    // Binary ref FUN_0057b5df: when a city is captured after a nuclear strike
    // (opts.nuclearCapture), set additional treaty flags:
    //   victim→attacker: 0x110 (NUKE_AWARENESS | VENDETTA)
    //   attacker→victim: 0x20000 (NUCLEAR_ATTACK)
    //   victim attitude toward attacker: set to max hostility (100)
    if (opts.nuclearCapture) {
      // Victim→attacker: NUKE_AWARENESS (0x100) + VENDETTA (0x10)
      const victimFlags = getTreatyFlags(state, oldOwner, capturerCivSlot);
      setTreatyFlags(state, oldOwner, capturerCivSlot,
        victimFlags | TF.NUKE_AWARENESS | TF.VENDETTA);

      // Attacker→victim: NUCLEAR_ATTACK (0x20000)
      const attackerFlags = getTreatyFlags(state, capturerCivSlot, oldOwner);
      setTreatyFlags(state, capturerCivSlot, oldOwner,
        attackerFlags | TF.NUCLEAR_ATTACK);

      // Set victim's attitude toward attacker to max hostility
      if (state.civs?.[oldOwner]?.attitudes) {
        if (!state.civs) state.civs = [];
        state.civs = [...state.civs];
        const victimCiv = { ...state.civs[oldOwner] };
        const attitudes = { ...(victimCiv.attitudes || {}) };
        attitudes[capturerCivSlot] = -100; // max hostility
        victimCiv.attitudes = attitudes;
        state.civs[oldOwner] = victimCiv;
      }

      events.push({
        type: 'nuclearCaptureFlags',
        attacker: capturerCivSlot,
        victim: oldOwner,
      });
    }
  }

  // ── #22: Civil war check with age rank gate ──
  // Binary ref FUN_0057b5df lines 4567-4585:
  //   Requires: defender is AI (not human), old owner's capital (Palace),
  //   defender has > 4 cities, capturer's age rank < old owner's age rank
  //   Age rank = DAT_00655c22 (powerRank byte array, higher = older/stronger)
  const hadPalace = !!(city.buildings && city.buildings.has(1));
  const isDefenderHuman = !!((state.humanPlayers || 0) & (1 << oldOwner));
  let civilWarResult = null;
  // C line 4567: (1 << defender & human_bitmask) == 0 — AI only
  // C line 4569: 4 < city_count — defender must have > 4 cities REMAINING after capture.
  // Binary checks after city transfer; we check before, so subtract 1.
  if (hadPalace && !isDefenderHuman && (countCities(state, oldOwner) - 1) > 4 && !isSchismBlocked(state, oldOwner)) {
    // #22: Age rank gate — capturer must be younger (lower rank) than old owner
    const capturerRank = getPowerRank(state, capturerCivSlot);
    const oldOwnerRank = getPowerRank(state, oldOwner);
    if (capturerRank < oldOwnerRank) {
      civilWarResult = handleCivilWar(state, mapBase, oldOwner, cityIndex);
      if (civilWarResult.success) {
        events.push(...civilWarResult.events);
      }
    }
  }

  // ── #4: Gold plunder (binary-faithful formula) ──
  // Binary ref: FUN_00579DBB (block_00570000.c:3906) — line 3916:
  //   gold = (citySize * treasury) / (total_population + 1)
  // where total_population is DAT_0064c70c (civ record offset 0x6C, sum of all city sizes)
  // with overflow protection: if treasury >= 32000/citySize, reorder to avoid overflow
  const oldOwnerCiv = state.civs?.[oldOwner];
  const oldTreasury = oldOwnerCiv?.treasury || 0;
  // C uses DAT_0064c70c (total_population), NOT DAT_0064c708 (city_count)
  let totalPop = 0;
  for (const c of state.cities) {
    if (c.owner === oldOwner && c.size > 0) totalPop += c.size;
  }
  let plunder;
  if (totalPop + 1 <= 0) {
    plunder = 0;
  } else if (oldTreasury >= Math.floor(32000 / Math.max(1, city.size))) {
    // Overflow protection: reorder to (treasury / (totalPop+1)) * citySize
    plunder = Math.floor(oldTreasury / (totalPop + 1)) * city.size;
  } else {
    plunder = Math.floor((city.size * oldTreasury) / (totalPop + 1));
  }
  if (plunder < 0) plunder = Math.min(32000, oldTreasury); // overflow cap
  plunder = Math.min(plunder, Math.max(0, oldTreasury));

  // Transfer gold
  if (plunder > 0) {
    state.civs = [...state.civs];
    // Deduct from old owner
    state.civs[oldOwner] = { ...state.civs[oldOwner], treasury: oldTreasury - plunder };
    // Add to capturer (if not barbarians)
    if (capturerCivSlot !== 0) {
      const capTreasury = state.civs[capturerCivSlot]?.treasury || 0;
      state.civs[capturerCivSlot] = { ...state.civs[capturerCivSlot], treasury: capTreasury + plunder };
    }
    // Note: no separate goldPlundered event — the plunder amount is
    // included in the unified cityCapture event below so the dialog can
    // show the binary-faithful "X captured Y. N gold pieces plundered."
    // message in a single popup.
  }

  // ── #5: Tech theft — ALWAYS guaranteed on city capture ──
  // Binary ref: FUN_0057a27a — always steals one tech, no probability check
  if (capturerCivSlot !== 0 && state.civTechs) {
    const theirTechs = state.civTechs[oldOwner];
    const myTechs = state.civTechs[capturerCivSlot];
    if (theirTechs && myTechs) {
      const stealable = [];
      for (const techId of theirTechs) {
        if (!myTechs.has(techId)) stealable.push(techId);
      }
      if (stealable.length > 0) {
        // Always steal one random tech (no probability gate)
        const stolenTech = stealable[rand() % stealable.length];
        grantAdvance(state, capturerCivSlot, stolenTech);
        events.push({
          type: 'techStolen',
          civSlot: capturerCivSlot,
          from: oldOwner,
          advanceId: stolenTech,
          advanceName: ADVANCE_NAMES[stolenTech] || `Tech ${stolenTech}`,
        });
      }
    }
  }

  // ── Population reduction — Phase 2 (capture-time) ──
  // Binary FUN_0057b5df line 4836: city.size -= 1, always for normal capture
  // (NOT gated by City Walls/Great Wall/Chieftain — those are Phase 1 combat-
  // time checks in FUN_00580341 lines 1002-1007, handled separately in
  // move-unit.js when the last defender is killed).
  //
  // Phase 2 condition (binary line 4810): fires if
  //   (normalCapture && !recapture) OR (city.size > 1)
  // The size > 1 guard prevents Phase 2 from destroying a size-1 city that
  // already survived Phase 1 (walls protected it from the combat reduction).
  //
  // Net effect: cities lose 2 pop without walls (Phase 1 + Phase 2),
  //             cities lose 1 pop with walls (Phase 2 only).
  let newSize = city.size;
  if ((captureType === 0 && !wasOurs) || city.size > 1) {
    if (captureType === 0 && !wasOurs) {
      newSize = city.size - 1;
    }
  }

  // Check if city is destroyed (size reaches 0)
  if (newSize <= 0) {
    // City destroyed
    state.cities = state.cities.length ? [...state.cities] : state.cities;
    state.cities[cityIndex] = { ...city, size: 0, owner: 0xFF };
    // #58: Trade route cleanup: remove routes pointing to this city from all other cities
    cleanupTradeRoutes(state, cityIndex);
    // Wonder clearing: mark wonders in this city as destroyed
    if (state.wonders) {
      state.wonders = [...state.wonders];
      for (let wi = 0; wi < state.wonders.length; wi++) {
        const w = state.wonders[wi];
        if (w && w.cityIndex === cityIndex && !w.destroyed) {
          state.wonders[wi] = { ...w, cityIndex: null, destroyed: true };
        }
      }
    }
    // Binary FUN_0057b5df:4953-4960 — the @CITYCAPTURE dialog still fires
    // when a size-1 city is razed, with the same "captured" verb and gold
    // plunder amount. Emit a single unified cityCapture event with the
    // razed flag so the client can show the proper combined dialog.
    events.push({
      type: 'cityCapture',
      cityIndex,
      cityName: city.name,
      from: oldOwner,
      to: capturerCivSlot,
      plunder,
      newSize: 0,
      destroyed: true,
      wasOurs,
      gx: cityGx,
      gy: cityGy,
    });

    // Civ elimination check — match the survived branch and the binary:
    // any civ that loses its last city dies immediately, regardless of
    // surviving units (killCiv kills them as part of cleanup).
    if (oldOwner > 0) {
      const hasCity = state.cities.some(c => c.owner === oldOwner && c.size > 0);
      if (!hasCity) {
        const killResult = killCiv(state, mapBase, oldOwner, capturerCivSlot);
        events.push(...killResult.events);
      }
    }
    return { events };
  }

  // ── Building destruction ──
  let buildings = new Set(city.buildings);

  // Always destroy: Palace, Temple, Courthouse, Cathedral — but only when
  // NOT recapturing own city (C line 4795: if local_7c == 0)
  if (!wasOurs) {
    for (const bid of ALWAYS_DESTROYED_ON_CAPTURE) {
      buildings.delete(bid);
    }
  }

  // B.5: Building destruction using 0xAA mask pattern
  // Binary ref: FUN_0057b5df lines 4801-4808
  // C: buildings[byte] &= (0xAA >> (rand() & 1))
  // Bits SET in mask = building SURVIVES; bits CLEAR = building DESTROYED
  // Mask is 0xAA (10101010) or 0x55 (01010101) depending on random bit
  if (!opts.skipBuildingDestruction && captureType === 0 && !wasOurs) {
    const shift = rand() & 1; // 0 or 1
    const remaining = [...buildings].filter(bid => bid >= 1 && bid <= 38);
    for (const bid of remaining) {
      // Buildings map to bits within 5 bytes (40 bits total)
      const bitIdx = (bid - 1) % 8;
      const byteMask = (0xAA >>> shift) & 0xFF;
      // C code ANDs with mask — bit SET in mask means SURVIVE
      // So destroy building when its bit is CLEAR in the mask
      if (!(byteMask & (1 << bitIdx))) {
        buildings.delete(bid);
      }
    }
  }

  // ── Wonder ownership transfer ──
  // Wonders are city-indexed in state.wonders; since the city transfers ownership,
  // the wonders automatically transfer. We just emit events for them.
  if (state.wonders) {
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (w && w.cityIndex === cityIndex && !w.destroyed) {
        events.push({
          type: 'wonderCaptured',
          wonderIndex: wi,
          wonderName: WONDER_NAMES[wi] || `Wonder ${wi}`,
          from: oldOwner,
          to: capturerCivSlot,
        });
      }
    }
  }

  // ── #137: In-progress wonder handling ──
  // When a city with an in-progress wonder is captured, the wonder construction
  // is abandoned. Notify both old owner (abandonment) and capturer (opportunity
  // to continue). Binary: shields are zeroed, but the item can be re-selected.
  if (city.itemInProduction?.type === 'wonder') {
    const wonderId = city.itemInProduction.id;
    const wonderName = WONDER_NAMES[wonderId] || `Wonder ${wonderId}`;
    const shieldsLost = city.shieldsInBox || 0;

    // Check if any other city of the old owner was also building this wonder
    let otherCityBuilding = false;
    for (let ci = 0; ci < state.cities.length; ci++) {
      if (ci === cityIndex) continue;
      const c = state.cities[ci];
      if (c.owner === oldOwner && c.size > 0 &&
          c.itemInProduction?.type === 'wonder' && c.itemInProduction?.id === wonderId) {
        otherCityBuilding = true;
        break;
      }
    }

    events.push({
      type: 'wonderConstructionAbandoned',
      wonderIndex: wonderId,
      wonderName,
      cityName: city.name,
      oldOwner,
      shieldsLost,
      otherCityBuilding,
    });

    events.push({
      type: 'wonderConstructionAvailable',
      wonderIndex: wonderId,
      wonderName,
      cityName: city.name,
      capturer: capturerCivSlot,
    });
  }

  // ── Resistance turns ──
  // Cities in Republic/Democracy experience resistance after capture
  const capturerGovt = getGovt(state, capturerCivSlot);
  const oldGovt = getGovt(state, oldOwner);
  const capGovtIdx = govtIndex(capturerGovt);
  const oldGovtIdx = govtIndex(oldGovt);
  let resistanceTurns = 0;
  if (capGovtIdx >= 5 || oldGovtIdx >= 5) {
    // Republic (5) or Democracy (6) — 1 to size/2 turns of resistance
    resistanceTurns = Math.max(1, Math.floor(newSize / 2));
  }

  // ── City state reset on capture ──
  // #56: Preserve food_in_box (only zero shields, not food)
  // #135: Preserve production item on capture (don't force Warriors)
  // Binary ref: DAT_0064f35c = 0 (shields cleared), but food is NOT zeroed
  const capturedCity = {
    ...city,
    owner: capturerCivSlot,
    size: newSize,
    buildings,
    hasWalls: buildings.has(8),
    hasPalace: buildings.has(1),
    shieldsInBox: 0,
    // #56: Preserve food_in_box — binary does NOT zero food on capture
    foodInBox: city.foodInBox || 0,
    // #135: Preserve production item — binary does NOT reset production to Warriors
    // The item stays; AI/human can change it next turn if desired
    itemInProduction: city.itemInProduction,
    civilDisorder: false,
    weLoveKingDay: false,
    soldThisTurn: false,
    specialists: [],
    resistanceTurns,
    // #58: Trade routes cancelled on capture (cleaned up below for other cities too)
    tradeRoutes: [],
    originalOwner: oldOwner,
    turnCaptured: state.turn?.number || 0,
  };

  // Trim workedTiles to match new (reduced) size
  if (capturedCity.workedTiles && capturedCity.workedTiles.length > newSize) {
    capturedCity.workedTiles = capturedCity.workedTiles.slice(0, newSize);
  }

  state.cities = state.cities.length ? [...state.cities] : state.cities;
  state.cities[cityIndex] = capturedCity;

  // ── #58: Clean up trade routes pointing TO captured city from other cities ──
  cleanupTradeRoutes(state, cityIndex);

  // ── Eject stranded enemy air units at captured city ──
  // Air units (domain 1) belonging to the old owner lose their base
  // and are destroyed. The capturer's air units are excluded.
  const ejectResult = ejectAirUnits(state, cityGx, cityGy, capturerCivSlot);
  if (ejectResult.events.length > 0) {
    events.push(...ejectResult.events);
  }

  // ── Tile ownership: update city tile and radius ──
  const cityTileIdx = cityGy * mapBase.mw + cityGx;
  if (mapBase.tileData[cityTileIdx]) {
    mapBase.tileData[cityTileIdx].tileOwnership = capturerCivSlot;
  }

  for (let i = 0; i < 20; i++) {
    const pos = radiusTileCoords(cityGx, cityGy, i, mapBase);
    if (!pos) continue;
    const tIdx = pos.gy * mapBase.mw + pos.gx;
    const tile = mapBase.tileData[tIdx];
    if (!tile) continue;
    if (tile.tileOwnership === oldOwner) {
      // Only update if no other city of old owner claims this tile
      const otherClaim = state.cities.some((c, ci) =>
        ci !== cityIndex && c.owner === oldOwner && c.size > 0 &&
        CITY_RADIUS_DOUBLED.some(([ddx, ddy]) => {
          const parC = c.gy & 1;
          const parT = ((c.gy + ddy) % 2 + 2) % 2;
          const tgx = c.gx + ((parC + ddx - parT) >> 1);
          const tgy = c.gy + ddy;
          const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
          return wgx === pos.gx && tgy === pos.gy;
        })
      );
      if (!otherClaim) {
        tile.tileOwnership = capturerCivSlot;
      }
    }
  }

  // ── Update visibility around captured city ──
  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, capturerCivSlot, cityGx, cityGy, mapBase.wraps, 2);

  // ── Set CAPTURE_VENDETTA flag (0x1000) on city capture ──
  // Binary FUN_00579c40 line 3893: only set if NEITHER civ has VENDETTA (0x10) already
  const existingFlags = getTreatyFlags(state, capturerCivSlot, oldOwner);
  if (!(existingFlags & TF.VENDETTA)) {
    addTreatyFlag(state, capturerCivSlot, oldOwner, TF.CAPTURE_VENDETTA);
  }
  // Set the notify flag directionally
  let capFlags = getTreatyFlags(state, capturerCivSlot, oldOwner);
  capFlags |= TF.CAPTURE_NOTIFY;
  setTreatyFlags(state, capturerCivSlot, oldOwner, capFlags);

  // ── #59: Rehome or DELETE old owner's units that were based here ──
  rehomeOrDisbandUnits(state, cityIndex, oldOwner, mapBase);

  // ── #23/#61: Palace relocation for old owner (capital escape scoring) ──
  // Binary ref: FUN_0057b5df lines 4587-4694 — capital escape attempt
  // Score formula: size*3 - distance + stackCount*4
  // Bonuses: Cure for Cancer(27) -> x3/2
  //          City Walls (building 8) or Great Wall (wonder 6) -> x2
  //          Building 17 (SDI Defense) in candidate city -> x3
  //          Different continent -> /2 penalty
  // NO coastal bonus, NO same-continent +2 bonus (binary has neither)
  // #60: Deduct 1000 science points on successful capital escape
  // #61: Complex decision tree: escape requires science > 999 AND cityCount > 11
  //      If conditions not met, do NOT unconditionally relocate — use fallback logic.
  if (hadPalace && !civilWarResult?.success) {
    const remainingCount = countCities(state, oldOwner);
    const oldOwnerCivData = state.civs?.[oldOwner] || {};
    const escapeTreasury = oldOwnerCivData.treasury || 0;
    const escapeScience = oldOwnerCivData.researchProgress || 0;

    // #61: Capital escape decision tree from binary FUN_0057b5df:
    //   Branch 1: treasury > 999 AND science > 999 AND remainingCount > 11
    //             → Full escape with scoring algorithm
    //   Branch 2: treasury > 999 AND (science <= 999 OR remainingCount <= 11)
    //             → Simple relocation to most central city (no escape bonus)
    //   Branch 3: treasury <= 999
    //             → Simple relocation to largest available city (no cost)
    const canFullEscape = escapeTreasury > 999 && escapeScience > 999 && remainingCount > 11;
    const canSimpleEscape = escapeTreasury > 999;

    let bestPalaceCi = -1;
    let bestScore = -Infinity;
    const capturedContinent = mapBase.getBodyId ? mapBase.getBodyId(cityGx, cityGy) : -1;

    if (canFullEscape) {
      // Full escape scoring algorithm — binary lines 4598-4627
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner !== oldOwner || c.size <= 0 || ci === cityIndex) continue;

        // Basic eligibility: size > 7 and size >= capturedSize/2
        if (c.size > 7 && c.size >= Math.floor(city.size / 2)) {
          const dist = tileDist(c.gx, c.gy, cityGx, cityGy, mapBase.mw, mapBase.wraps);

          // Count military units stacked at this city
          let stackCount = 0;
          for (const u of state.units) {
            if (u.owner === oldOwner && u.gx === c.gx && u.gy === c.gy && u.gx >= 0 &&
                (UNIT_ATK[u.type] || 0) > 0) {
              stackCount++;
            }
          }

          let score = c.size * 3 - dist + stackCount * 4;

          // Cure for Cancer (wonder 27): x3/2
          if (civHasWonder(state, oldOwner, 27)) {
            score = Math.floor(score * 3 / 2);
          }

          // City Walls (building 8) or Great Wall (wonder 6): x2
          if ((c.buildings && c.buildings.has(8)) || hasWonderEffect(state, oldOwner, 6)) {
            score *= 2;
          }

          // SDI Defense (building 17) in candidate city -> x3
          if (c.buildings && c.buildings.has(17)) {
            score *= 3;
          }

          // Different continent -> /2 penalty
          if (mapBase.getBodyId) {
            const cContinent = mapBase.getBodyId(c.gx, c.gy);
            if (cContinent !== capturedContinent) {
              score = Math.floor(score / 2);
            }
          }

          if (score > bestScore) {
            bestScore = score;
            bestPalaceCi = ci;
          }
        }
      }

      if (bestPalaceCi >= 0 && bestScore > 0) {
        // #60: Deduct 1000 science points from old owner's research progress
        if (!state.civs) state.civs = [];
        state.civs = [...state.civs];
        const ownerCiv = state.civs[oldOwner] || {};
        state.civs[oldOwner] = {
          ...ownerCiv,
          researchProgress: Math.max(0, (ownerCiv.researchProgress || 0) - 1000),
        };

        const palaceCity = state.cities[bestPalaceCi];
        const palaceBuildings = new Set(palaceCity.buildings);
        palaceBuildings.add(1);
        state.cities[bestPalaceCi] = { ...palaceCity, buildings: palaceBuildings, hasPalace: true };

        events.push({
          type: 'capitalEscape', civSlot: oldOwner,
          cityName: palaceCity.name, cityIndex: bestPalaceCi,
          escapeScore: bestScore,
        });
      } else {
        // Full escape scoring found no eligible candidate — fall through to simple
        bestPalaceCi = findMostCentralCity(state, mapBase, oldOwner, cityIndex);
        if (bestPalaceCi >= 0) {
          const palaceCity = state.cities[bestPalaceCi];
          const palaceBuildings = new Set(palaceCity.buildings);
          palaceBuildings.add(1);
          state.cities[bestPalaceCi] = { ...palaceCity, buildings: palaceBuildings, hasPalace: true };
        }
      }
    } else if (canSimpleEscape) {
      // #61 Branch 2: Simple relocation to most central city (treasury > 999 but
      // science or city count insufficient for full escape)
      bestPalaceCi = findMostCentralCity(state, mapBase, oldOwner, cityIndex);
      if (bestPalaceCi >= 0) {
        const palaceCity = state.cities[bestPalaceCi];
        const palaceBuildings = new Set(palaceCity.buildings);
        palaceBuildings.add(1);
        state.cities[bestPalaceCi] = { ...palaceCity, buildings: palaceBuildings, hasPalace: true };
      }
    } else {
      // #61 Branch 3: No treasury for escape — relocate to largest remaining city
      // Binary: palace just moves to biggest city, no cost deducted
      let largestCi = -1, largestSize = 0;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner !== oldOwner || c.size <= 0 || ci === cityIndex) continue;
        if (c.size > largestSize) {
          largestSize = c.size;
          largestCi = ci;
        }
      }
      if (largestCi >= 0) {
        const palaceCity = state.cities[largestCi];
        const palaceBuildings = new Set(palaceCity.buildings);
        palaceBuildings.add(1);
        state.cities[largestCi] = { ...palaceCity, buildings: palaceBuildings, hasPalace: true };
      }
    }
  }

  // ── #136: Recalculate Marco Polo contacts on capture ──
  // If the captured city contained Marco Polo's Embassy, the new owner
  // (or potentially the old owner who lost it) may need contact recalculation.
  // If capturer now has Marco Polo, grant contact with all alive civs.
  if (state.wonders) {
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (w && w.cityIndex === cityIndex && !w.destroyed && wi === WONDER_MARCO_POLO) {
        // Marco Polo transferred to capturer — grant contacts
        for (let ci = 1; ci < 8; ci++) {
          if (ci === capturerCivSlot) continue;
          if (!(state.civsAlive & (1 << ci))) continue;
          addTreatyFlag(state, capturerCivSlot, ci, TF.CONTACT);
        }
        events.push({ type: 'marcoPoloRecalculated', civSlot: capturerCivSlot });
      }
    }
  }

  // ── #138: Eiffel Tower reputation recalculation ──
  // When a city containing the Eiffel Tower (wonder 20) is captured,
  // recalculate the capturer's reputation. The Eiffel Tower improves
  // diplomatic reputation; gaining it grants a bonus, while the old
  // owner who lost it may suffer a penalty.
  // Binary ref: FUN_0057b5df wonder-specific post-capture effects.
  if (state.wonders) {
    const WONDER_EIFFEL = 20;
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (w && w.cityIndex === cityIndex && !w.destroyed && wi === WONDER_EIFFEL) {
        // Capturer gains Eiffel Tower — boost reputation toward 100
        // Binary: Eiffel Tower sets reputation to max(current, 80)
        if (state.civs?.[capturerCivSlot]) {
          if (!state.civs) state.civs = [];
          state.civs = [...state.civs];
          const capCiv = { ...state.civs[capturerCivSlot] };
          const curRep = capCiv.reputation ?? 100;
          capCiv.reputation = Math.max(curRep, 80);
          state.civs[capturerCivSlot] = capCiv;
        }

        // Old owner loses Eiffel Tower — reputation penalty
        // Binary: losing Eiffel Tower reduces reputation by 20
        if (state.civs?.[oldOwner]) {
          state.civs = [...state.civs];
          const oldCiv = { ...state.civs[oldOwner] };
          const oldRep = oldCiv.reputation ?? 100;
          oldCiv.reputation = Math.max(0, oldRep - 20);
          state.civs[oldOwner] = oldCiv;
        }

        events.push({
          type: 'eiffelTowerReputationRecalc',
          capturer: capturerCivSlot,
          oldOwner,
        });
        break;
      }
    }
  }

  // ── #6: Civ elimination check FIRST, then partisans only if civ SURVIVES ──
  // Binary ref: FUN_0057b5df line 5104 calls kill_civ BEFORE partisan spawning.
  // Binary kill_civ (FUN_004AA378:3395-3401) early-returns only when the civ
  // still has at least one CITY — units are not checked. As part of the
  // kill_civ cleanup, all remaining units of the dying civ are killed.
  //
  // So when a civ loses its last city, it dies immediately regardless of
  // surviving units. This matches the binary and the user's expectation
  // (the AI should be wiped from the map immediately, not at end of turn).
  let civEliminated = false;
  if (oldOwner > 0) {
    const hasCity = state.cities.some(c => c.owner === oldOwner && c.size > 0);
    if (!hasCity) {
      const killResult = killCiv(state, mapBase, oldOwner, capturerCivSlot);
      events.push(...killResult.events);
      civEliminated = true;
    }
  }

  // ── #6 + #24: Partisan spawning (only if civ survived) ──
  // Binary ref: FUN_0057b5df lines 5104-5218
  // Conditions: iVar6 == 0 (kill_civ returned 0 = NOT eliminated)
  //   AND city still exists AND not recapture
  //   AND (defender govt == Communism(3) OR Democracy(6) OR scenario flag OR has Communism tech)
  if (!civEliminated && captureType === 0 && oldOwner > 0 && !wasOurs) {
    // #24: Use old owner's GOVERNMENT type first, then fall back to tech
    const defGovtIdx = govtIndex(getGovt(state, oldOwner));
    const hasGovtTrigger = (defGovtIdx === GOVT_COMMUNISM || defGovtIdx === GOVT_DEMOCRACY);
    const hasCommunismTech = hasTech(state, oldOwner, TECH_COMMUNISM);
    const partisanTrigger = hasGovtTrigger || hasCommunismTech;

    if (partisanTrigger) {
      // Partisan count formula from binary (lines 5108-5156)
      // govtDiff = abs(defender.govt - attacker.govt)
      // ageDiff = abs(defender.powerRank - attacker.powerRank)
      // count = ((citySize + 5) / 8) * (govtDiff + ageDiff + 1) / 2
      const atkGovtIdx = govtIndex(getGovt(state, capturerCivSlot));
      const govtDiff = Math.abs(defGovtIdx - atkGovtIdx);
      const defRank = getPowerRank(state, oldOwner);
      const atkRank = getPowerRank(state, capturerCivSlot);
      const ageDiff = Math.abs(defRank - atkRank);
      let partisanCount = Math.floor(((city.size + 5) >> 3) * (govtDiff + ageDiff + 1) / 2);

      // param_3 != 0 (subvert/bribe): halve count
      if (captureType !== 0) {
        partisanCount = Math.floor(partisanCount / 2);
      }

      // Tech prerequisites (binary lines 5133-5156):
      // Conscription (0x11=17): if missing, count -= 1
      if (!hasTech(state, oldOwner, TECH_CONSCRIPTION)) partisanCount -= 1;

      // Guerrilla Warfare (0x22=34): primary partisan tech
      if (!hasTech(state, oldOwner, TECH_GUERRILLA_WARFARE)) {
        // No Guerrilla Warfare: need both Communism tech AND Gunpowder, else 0 partisans
        if (!hasTech(state, oldOwner, TECH_COMMUNISM)) partisanCount = 0;
        if (!hasTech(state, oldOwner, TECH_GUNPOWDER)) partisanCount = 0;
      } else {
        // Has Guerrilla Warfare: check if attacker also has it
        if (hasTech(state, capturerCivSlot, TECH_GUERRILLA_WARFARE)) {
          partisanCount += 1;
        } else {
          partisanCount *= 2;
        }
      }

      // Cap partisans (binary doesn't explicitly cap but terrain limits apply)
      partisanCount = Math.max(0, partisanCount);

      if (partisanCount > 0) {
        // Find suitable tiles for partisans (city radius: 20 tiles)
        const partisanTiles = [];
        for (let ri = 0; ri < 20; ri++) {
          const pos = radiusTileCoords(cityGx, cityGy, ri, mapBase);
          if (!pos) continue;
          const ter = mapBase.getTerrain(pos.gx, pos.gy);
          if (ter === 10) continue; // skip ocean
          // Skip tiles with enemy units (binary: FUN_005b8da4 < 0 means no enemy)
          if (state.units.some(u => u.gx === pos.gx && u.gy === pos.gy &&
              u.owner !== oldOwner && u.gx >= 0)) continue;
          // Skip tiles with cities (binary: FUN_005b89e4 == 0)
          if (state.cities.some(c => c.gx === pos.gx && c.gy === pos.gy && c.size > 0)) continue;

          // Score: terrain defense * 2, +1 road, +1 railroad, *2 fortress
          const defValue = (TERRAIN_DEFENSE[ter] || 2) * 2;
          const imp = mapBase.getImprovements(pos.gx, pos.gy);
          let score = defValue;
          if (imp.road) score += 1;
          if (imp.railroad) score += 1;
          if (imp.fortress) score *= 2;
          partisanTiles.push({ gx: pos.gx, gy: pos.gy, score });
        }

        // Sort by defense value descending
        partisanTiles.sort((a, b) => b.score - a.score);

        // Spawn partisans
        let spawned = 0;
        if (partisanTiles.length > 0) {
          state.units = [...state.units];
          for (let i = 0; i < partisanCount && i < partisanTiles.length; i++) {
            const loc = partisanTiles[i];
            const partisan = makeUnit(
              PARTISAN_TYPE, oldOwner, loc.gx, loc.gy,
              UNIT_MOVE_POINTS[PARTISAN_TYPE] * MOVEMENT_MULTIPLIER
            );
            partisan.orders = 'fortified';
            // Veterans based on defender tolerance and trespass flag (binary lines 5207-5218)
            if (rand() % 2 === 0) partisan.veteran = 1;
            state.units.push(partisan);
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, oldOwner, loc.gx, loc.gy, mapBase.wraps);
            spawned++;
          }
        }

        if (spawned > 0) {
          events.push({
            type: 'partisansSpawned',
            count: spawned,
            civSlot: oldOwner,
            cityName: city.name,
            gx: cityGx,
            gy: cityGy,
          });
        }
      }
    }
  }

  // ── City capture event ──
  // Binary FUN_0057b5df:4953-4960 — the @CITYCAPTURE dialog with the
  // capturer civ name, the verb (captured/recaptured), the city name,
  // and the gold plunder amount. The destroyed branch above emits a
  // similar event with destroyed=true.
  events.push({
    type: 'cityCapture',
    cityIndex,
    cityName: city.name,
    from: oldOwner,
    to: capturerCivSlot,
    plunder,
    newSize,
    destroyed: false,
    wasOurs,
    gx: cityGx,
    gy: cityGy,
  });

  return { events };
}


// ═══════════════════════════════════════════════════════════════════
// Helper: Clean up trade routes pointing to a captured/destroyed city
// ═══════════════════════════════════════════════════════════════════

/**
 * #58: Remove trade routes pointing TO the specified city from all other cities.
 * Called on both city capture and city destruction.
 */
function cleanupTradeRoutes(state, targetCityIdx) {
  for (let ci = 0; ci < state.cities.length; ci++) {
    if (ci === targetCityIdx) continue;
    const c = state.cities[ci];
    if (!c.tradeRoutes || c.tradeRoutes.length === 0) continue;
    const filtered = c.tradeRoutes.filter(r => r.destCityIndex !== targetCityIdx);
    if (filtered.length !== c.tradeRoutes.length) {
      state.cities[ci] = { ...c, tradeRoutes: filtered };
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// Helper: Rehome or disband old owner's units homed to captured city
// ═══════════════════════════════════════════════════════════════════

/**
 * Rehome or disband units whose home city was captured.
 * Binary FUN_0057b5df lines 5002-5028:
 *  - Diplomat (type 9) → set homeCityId to 0xFF (no home)
 *  - AI civs: role-1 (defense) units → try rehome to nearest city; rest → delete
 *  - Human civs: ALL non-diplomat units → delete
 *  - No cities remain → delete
 */
function rehomeOrDisbandUnits(state, capturedCityIdx, oldOwner, mapBase) {
  const isHuman = !!((state.humanPlayers || 0) & (1 << oldOwner));
  state.units = [...state.units];
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.homeCityId !== capturedCityIdx || u.owner !== oldOwner || u.gx < 0) continue;

    // Diplomats/spies: set to no home (binary: type 9 -> home = 0xFF)
    if (u.type === PARTISAN_TYPE || u.type === 46 || u.type === 47) {
      state.units[i] = { ...u, homeCityId: 0xFFFF };
      continue;
    }

    // Human civs: delete all non-diplomat units (binary behavior)
    if (isHuman) {
      state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      continue;
    }

    // AI civs: try to rehome role-1 (defense) units to nearest own city
    let bestCi = -1, bestDist = Infinity;
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner === oldOwner && c.size > 0 && ci !== capturedCityIdx) {
        const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
        if (d < bestDist) { bestDist = d; bestCi = ci; }
      }
    }

    if (bestCi >= 0 && UNIT_ROLE[u.type] === 1) {
      // Role 1 (defense units): rehome to nearest city
      state.units[i] = { ...u, homeCityId: bestCi };
    } else {
      // All other units or no city available: delete
      state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
    }
  }
}
