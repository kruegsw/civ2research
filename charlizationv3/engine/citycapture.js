// ═══════════════════════════════════════════════════════════════════
// citycapture.js — City capture & civil war (shared: server + client)
//
// Phase B.3: handleCityCapture — comprehensive city capture logic
//            ported from decompiled FUN_0057b5df (11,451 bytes)
// Phase B.4: handleCivilWar — civ schism when capital falls
//            ported from decompiled FUN_0057a904 (3,291 bytes)
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_ATK, MOVEMENT_MULTIPLIER,
  CITY_RADIUS_DOUBLED, ADVANCE_NAMES, GOVT_INDEX, TERRAIN_DEFENSE,
  WONDER_NAMES, IMPROVE_NAMES,
} from './defs.js';
import { hasWonderEffect, civHasWonder } from './utils.js';
import { updateVisibility } from './visibility.js';
import { grantAdvance } from './research.js';
import { isSchismBlocked } from './events.js';

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

/** Guerrilla Warfare tech ID. */
const TECH_GUERRILLA_WARFARE = 34;

/** Communism tech ID. */
const TECH_COMMUNISM = 15;

/** Democracy tech ID. */
const TECH_DEMOCRACY = 21;

/** SDI Defense building ID. */
const SDI_DEFENSE = 17;

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

  // ── Civil war check ──
  // If old owner has palace in this city and has 5+ remaining cities
  const hadPalace = !!(city.buildings && city.buildings.has(1));
  let civilWarResult = null;
  if (hadPalace && countCities(state, oldOwner) >= 6 && !isSchismBlocked(state, oldOwner)) {
    // 6 because this city hasn't been transferred yet (it counts as 1 of the 6)
    civilWarResult = handleCivilWar(state, mapBase, oldOwner, cityIndex);
    if (civilWarResult.success) {
      events.push(...civilWarResult.events);
    }
  }

  // ── B.4: Gold plunder (binary-faithful formula) ──
  // Binary ref: FUN_00579DBB — gold = (citySize * treasury) / (totalPop + 1)
  // with overflow protection: if treasury >= 32000/citySize, reorder to avoid overflow
  const oldOwnerCiv = state.civs?.[oldOwner];
  const oldTreasury = oldOwnerCiv?.treasury || 0;
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
    events.push({ type: 'goldPlundered', amount: plunder, from: oldOwner, to: capturerCivSlot });
  }

  // ── Tech theft ──
  // Small chance to steal a tech the capturer doesn't have
  if (capturerCivSlot !== 0 && state.civTechs) {
    const theirTechs = state.civTechs[oldOwner];
    const myTechs = state.civTechs[capturerCivSlot];
    if (theirTechs && myTechs) {
      const stealable = [];
      for (const techId of theirTechs) {
        if (!myTechs.has(techId)) stealable.push(techId);
      }
      if (stealable.length > 0) {
        // ~33% chance to steal a random tech
        if (rand() % 3 === 0) {
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
  }

  // ── Population reduction ──
  // Normal capture: reduce size by 1 (min 1)
  // If recapture (wasOurs) AND captureType > 0: don't reduce
  let newSize = city.size;
  if (captureType === 0 && !wasOurs) {
    newSize = Math.max(1, city.size - 1);
  } else if (city.size > 1) {
    newSize = Math.max(1, city.size - 1);
  }

  // Check if city is destroyed (size reaches 0 — shouldn't happen with max(1) but safety check)
  if (newSize <= 0) {
    // City destroyed
    state.cities[cityIndex] = { ...city, size: 0, owner: 0xFF };
    events.push({ type: 'cityDestroyed', cityName: city.name, gx: cityGx, gy: cityGy });
    return { events };
  }

  // ── Building destruction ──
  let buildings = new Set(city.buildings);

  // Always destroy: Palace, Temple, Courthouse, Cathedral
  for (const bid of ALWAYS_DESTROYED_ON_CAPTURE) {
    buildings.delete(bid);
  }

  // B.5: Building destruction using 0xAA mask pattern
  // Binary: applies mask 0xAA with random shift (0 or 1) to building bitfield
  // This creates a deterministic alternating pattern of destruction
  if (!opts.skipBuildingDestruction && captureType === 0 && !wasOurs) {
    const shift = rand() & 1; // 0 or 1
    const mask = 0xAA >>> shift; // 0xAA=10101010 or 0x55=01010101
    const remaining = [...buildings].filter(bid => bid >= 1 && bid <= 38);
    for (const bid of remaining) {
      // Check if the bit for this building is set in the mask
      // Buildings map to bits within 5 bytes (40 bits total)
      const byteIdx = Math.floor((bid - 1) / 8);
      const bitIdx = (bid - 1) % 8;
      const byteMask = (0xAA >>> shift) & 0xFF;
      if (byteMask & (1 << bitIdx)) {
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

  // ── Production reset ──
  // Reset shields, food, production queue
  const capturedCity = {
    ...city,
    owner: capturerCivSlot,
    size: newSize,
    buildings,
    hasWalls: buildings.has(8),
    hasPalace: buildings.has(1),
    shieldsInBox: 0,
    foodInBox: 0,
    itemInProduction: { type: 'unit', id: 2 }, // Warriors
    civilDisorder: false,
    weLoveKingDay: false,
    soldThisTurn: false,
    specialists: [],
    resistanceTurns,
    tradeRoutes: [], // Trade routes cancelled on capture
    originalOwner: oldOwner,
    turnCaptured: state.turn?.number || 0,
  };

  // Trim workedTiles to match new (reduced) size
  if (capturedCity.workedTiles && capturedCity.workedTiles.length > newSize) {
    capturedCity.workedTiles = capturedCity.workedTiles.slice(0, newSize);
  }

  state.cities = state.cities.length ? [...state.cities] : state.cities;
  state.cities[cityIndex] = capturedCity;

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

  // ── Rehome old owner's units that were based here ──
  rehomeOrDisbandUnits(state, cityIndex, oldOwner, mapBase);

  // ── Palace relocation for old owner ──
  if (hadPalace && !civilWarResult?.success) {
    // If civil war didn't happen (or failed), relocate palace
    let bestPalaceCi = -1, bestPalaceSize = 0;
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner === oldOwner && c.size > 0 && ci !== cityIndex) {
        if (c.size > bestPalaceSize) { bestPalaceSize = c.size; bestPalaceCi = ci; }
      }
    }
    if (bestPalaceCi >= 0) {
      const palaceCity = state.cities[bestPalaceCi];
      const palaceBuildings = new Set(palaceCity.buildings);
      palaceBuildings.add(1);
      state.cities[bestPalaceCi] = { ...palaceCity, buildings: palaceBuildings, hasPalace: true };
    }
  }

  // ── Partisan spawning ──
  // Conditions: old owner had Communism or Democracy tech, AND Guerrilla Warfare
  if (captureType === 0 && oldOwner > 0) {
    const hasGuerrilla = hasTech(state, oldOwner, TECH_GUERRILLA_WARFARE);
    const hasCommunism = hasTech(state, oldOwner, TECH_COMMUNISM);
    const hasDemocracy = hasTech(state, oldOwner, TECH_DEMOCRACY);

    if ((hasCommunism || hasDemocracy) && hasGuerrilla) {
      // B.6: Partisan count formula (FUN_0057b5df lines 5103-5243)
      // formula: ((citySize + 5) / 8) * (govtDiff + ageDiff + 1) / 2
      const defGovt = govtIndex(getGovt(state, oldOwner));
      const atkGovt = govtIndex(getGovt(state, capturerCivSlot));
      const govtDiff = Math.abs(defGovt - atkGovt);
      // Power rank approximation: use tech count as proxy
      const defTechs = state.civTechCounts?.[oldOwner] || 0;
      const atkTechs = state.civTechCounts?.[capturerCivSlot] || 0;
      const ageDiff = Math.abs(defTechs - atkTechs) >> 3; // scale down
      let partisanCount = Math.floor(((city.size + 5) / 8) * (govtDiff + ageDiff + 1) / 2);

      // Conscription (tech 17) prerequisite: if no Conscription, count -= 1
      if (!hasTech(state, oldOwner, 17)) partisanCount -= 1;

      // Guerrilla Warfare interaction with attacker
      if (hasTech(state, capturerCivSlot, TECH_GUERRILLA_WARFARE)) {
        partisanCount += 1;
      } else {
        partisanCount *= 2;
      }

      // Minimum 1, cap at reasonable limit
      partisanCount = Math.max(1, Math.min(partisanCount, 8));

      // Find suitable tiles for partisans (nearby land tiles with good defense)
      const partisanTiles = [];
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          if (dx === 0 && dy === 0) continue; // not on city tile
          let gx = cityGx + dx;
          const gy = cityGy + dy;
          if (gy < 0 || gy >= mapBase.mh) continue;
          if (mapBase.wraps) {
            gx = ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
          } else if (gx < 0 || gx >= mapBase.mw) {
            continue;
          }
          const ter = mapBase.getTerrain(gx, gy);
          if (ter === 10) continue; // skip ocean
          // Skip tiles with enemy cities
          if (state.cities.some(c => c.gx === gx && c.gy === gy &&
              c.owner !== oldOwner && c.size > 0)) continue;
          // Skip tiles with enemy units
          if (state.units.some(u => u.gx === gx && u.gy === gy &&
              u.owner !== oldOwner && u.gx >= 0)) continue;

          const defValue = TERRAIN_DEFENSE[ter] || 2;
          const imp = mapBase.getImprovements(gx, gy);
          let score = defValue;
          if (imp.road || imp.railroad) score += 1;
          if (imp.farmland) score *= 2;
          if (imp.fortress) score += 2;
          partisanTiles.push({ gx, gy, score });
        }
      }

      // Sort by defense value descending
      partisanTiles.sort((a, b) => b.score - a.score);

      // Spawn partisans
      let spawned = 0;
      state.units = [...state.units];
      for (let i = 0; i < partisanCount && i < partisanTiles.length; i++) {
        const loc = partisanTiles[i];
        const partisan = makeUnit(
          PARTISAN_TYPE, oldOwner, loc.gx, loc.gy,
          UNIT_MOVE_POINTS[PARTISAN_TYPE] * MOVEMENT_MULTIPLIER
        );
        partisan.orders = 'fortified';
        // Veterans based on difficulty
        if (rand() % 2 === 0) partisan.veteran = 1;
        state.units.push(partisan);
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, oldOwner, loc.gx, loc.gy, mapBase.wraps);
        spawned++;
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

  // ── Civ elimination check ──
  if (oldOwner > 0) {
    const hasCity = state.cities.some(c => c.owner === oldOwner && c.size > 0);
    const hasUnit = state.units.some(u => u.owner === oldOwner && u.gx >= 0);
    if (!hasCity && !hasUnit) {
      state.civsAlive &= ~(1 << oldOwner);
      events.push({ type: 'civEliminated', civSlot: oldOwner });
    }
  }

  // ── City capture event ──
  events.push({
    type: 'cityCapture',
    cityIndex,
    cityName: city.name,
    from: oldOwner,
    to: capturerCivSlot,
    plunder,
    newSize,
    gx: cityGx,
    gy: cityGy,
  });

  return { events };
}


// ═══════════════════════════════════════════════════════════════════
// Helper: Rehome or disband old owner's units homed to captured city
// ═══════════════════════════════════════════════════════════════════

/**
 * Rehome units whose home city was captured.
 * Diplomats/spies get set to no-home (0xFFFF); other units get reassigned
 * to the nearest own city, or disbursed if no cities remain.
 *
 * From pseudocode FUN_0057b5df lines 1784-1795.
 */
function rehomeOrDisbandUnits(state, capturedCityIdx, oldOwner, mapBase) {
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.homeCityId !== capturedCityIdx || u.owner !== oldOwner || u.gx < 0) continue;

    // Diplomats/spies: set to no home
    if (u.type === 46 || u.type === 47) {
      state.units[i] = { ...u, homeCityId: 0xFFFF };
      continue;
    }

    // Find nearest own city for rehoming
    let bestCi = -1, bestDist = Infinity;
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner === oldOwner && c.size > 0 && ci !== capturedCityIdx) {
        const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
        if (d < bestDist) { bestDist = d; bestCi = ci; }
      }
    }
    state.units[i] = { ...u, homeCityId: bestCi >= 0 ? bestCi : 0xFFFF };
  }
}
