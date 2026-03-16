// ═══════════════════════════════════════════════════════════════════
// happiness.js — Happiness calculation (shared: server + client)
//
// Port of FUN_004ea8e4 from Civ2 binary. Computes happy/unhappy
// citizens for a city, plus civil disorder and WLTKD status.
// ═══════════════════════════════════════════════════════════════════

import {
  NON_COMBAT_TYPES, SEA_COMBAT_TYPES, SUPPORT_EXEMPT_TYPES,
  GOVT_CORRUPTION_DIVISOR, DIFFICULTY_KEYS, GOVT_INDEX,
} from './defs.js';
import { calcCityTrade } from './production.js';
import { cityHasBuilding, hasWonderEffect, cityHasActiveWonder, getGovernment } from './utils.js';

// COSMIC defaults from standard RULES.TXT
const CONTENT_BASE = 7;     // DAT_0064bccf
const RIOT_FACTOR = 14;     // DAT_0064bcd0

/**
 * Compute happiness for a city.
 *
 * @param {object} city
 * @param {number} cityIndex
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {{ happy: number, unhappy: number, civilDisorder: boolean, weLoveKingDay: boolean }}
 */
export function calcHappiness(city, cityIndex, gameState, mapBase) {
  const govt = getGovernment(city, gameState);
  const pop = city.size;
  const ownerSlot = city.owner;

  // Difficulty and human player detection
  const difficulty = gameState.difficulty || 'chieftain';
  const humanPlayers = gameState.humanPlayers || 0xFF; // default: all human in MP
  const isHuman = !!((1 << ownerSlot) & humanPlayers);

  const civTechs = gameState.civTechs?.[ownerSlot];
  const hasTech = (id) => civTechs ? civTechs.has(id) : false;

  const totalSpecs = (city.specialists || []).length;

  // Mutable state
  const st = { happy: 0, unhappy: 0, surplus: 0 };

  const adjust = () => {
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    st.happy = clamp(st.happy, 0, pop);
    while (st.surplus > 0 && st.unhappy < st.surplus) { st.surplus--; st.unhappy++; }
    st.unhappy = clamp(st.unhappy, 0, pop);
    const cap = clamp(pop - totalSpecs, 0, 99);
    while (st.unhappy + st.happy > cap) {
      if (st.surplus === 0) { st.happy--; st.happy = clamp(st.happy, 0, pop); }
      else { st.surplus--; }
      st.unhappy--;
      st.unhappy = clamp(st.unhappy, 0, pop);
    }
    while (st.surplus > 0 && st.unhappy + st.happy < cap) { st.surplus--; st.unhappy++; }
  };

  // ── Step 1: Initial unhappy citizens ──
  if (!isHuman) {
    st.unhappy = (pop - 1) - (CONTENT_BASE - 5);
  } else {
    const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(difficulty));
    // Binary: contentBase = RIOT_FACTOR + difficulty * -2 [+ 2 if Restless Tribes]
    let spread = RIOT_FACTOR + diffIdx * -2;
    if (gameState.barbarianActivity === 'raging') spread += 2;

    // Binary: contentCitizens = ((govtType >> 1) + 2) * contentBase / 2
    // govtType is the numeric government index (0=anarchy, 1=despotism, etc.)
    const govtIdx = GOVT_INDEX[govt] ?? 1;
    let contentCitizens = Math.trunc(((govtIdx >> 1) + 2) * spread / 2);
    if (contentCitizens < 2) contentCitizens = 1;

    st.unhappy = (pop - 1) - contentCitizens;

    // Empire size penalty (Communism exempt)
    if (govt !== 'communism') {
      const cityCount = gameState.cities.filter(c => c.owner === ownerSlot && c.size > 0).length;
      const divisor = Math.max(1, contentCitizens);
      st.unhappy += Math.floor((cityCount - divisor + cityIndex % divisor) / divisor);
    }
  }

  st.surplus = 0;
  if (pop < st.unhappy) {
    st.surplus = st.unhappy - pop;
    st.unhappy = pop;
  }

  adjust(); // Phase 0

  // ── Step 2: Luxury effect ──
  const { lux } = calcCityTrade(city, cityIndex, gameState, mapBase);
  st.happy = lux >> 1;

  adjust(); // Phase 1

  // ── Step 3: Colosseum (14) ──
  if (cityHasBuilding(city, 14)) {
    st.unhappy -= 3;
    if (hasTech(24)) st.unhappy -= 1; // Electronics
  }

  // ── Step 4: Cathedral (11) or Michelangelo's (wonder 10) ──
  if (hasTech(55) &&
      (cityHasBuilding(city, 11) || hasWonderEffect(gameState, ownerSlot, 10))) {
    const effect = (hasTech(15) ? 0 : 1) + (hasTech(82) ? 3 : 2);
    st.unhappy -= effect;
  }

  // ── Step 5: Temple (4) ──
  if (cityHasBuilding(city, 4)) {
    let templeEffect = 0;
    if (hasTech(56)) templeEffect++; // Mysticism
    if (hasTech(9)) templeEffect++;  // Ceremonial Burial
    if (hasWonderEffect(gameState, ownerSlot, 5)) templeEffect <<= 1; // Oracle doubles
    st.unhappy -= templeEffect;
  }

  // ── Step 5b: Courthouse/Palace + Democracy ──
  if ((cityHasBuilding(city, 7) || cityHasBuilding(city, 1)) && govt === 'democracy') {
    st.happy += 1;
  }

  adjust(); // Phase 2

  // ── Step 6: Government-specific ──
  if (govt === 'fundamentalism') {
    st.surplus = 0;
    st.unhappy = 0;
  } else if (govt === 'anarchy' || govt === 'despotism' || govt === 'monarchy' || govt === 'communism') {
    // Martial law
    // Binary: maxMartialLaw = CONTENT_BASE(7) - difficulty
    const diffIdx2 = Math.max(0, DIFFICULTY_KEYS.indexOf(difficulty));
    let garrison = 0;
    for (const u of gameState.units) {
      if (u.gx === city.gx && u.gy === city.gy && u.owner === ownerSlot &&
          !NON_COMBAT_TYPES.has(u.type)) {
        garrison += (govt === 'communism') ? 2 : 1;
      }
    }
    const maxMartial = (govt === 'communism')
      ? (CONTENT_BASE - diffIdx2) * 2
      : (CONTENT_BASE - diffIdx2);
    if (garrison > maxMartial) garrison = maxMartial;
    garrison = Math.max(0, Math.min(garrison, st.unhappy));
    st.unhappy -= garrison;
  } else {
    // Republic/Democracy: military abroad unhappiness
    let penalty;
    if (hasWonderEffect(gameState, ownerSlot, 21) || cityHasBuilding(city, 33)) {
      penalty = 0;
    } else {
      penalty = 1;
    }
    if (govt === 'democracy') penalty++;

    if (penalty !== 0) {
      let abroad = 0;
      for (const u of gameState.units) {
        if (u.owner !== ownerSlot || u.gx < 0) continue;
        if (u.homeCityId !== cityIndex) continue;
        if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
        if (NON_COMBAT_TYPES.has(u.type)) continue;
        if (SEA_COMBAT_TYPES.has(u.type)) { abroad++; continue; }
        // Land/air: abroad if not at any friendly city
        const atFriendlyCity = gameState.cities.some(c =>
          c.owner === ownerSlot && c.gx === u.gx && c.gy === u.gy && c.size > 0);
        if (!atFriendlyCity) abroad++;
      }
      if (abroad > 0 && govt === 'republic') abroad--;
      st.unhappy += penalty * abroad;
    }
  }

  adjust(); // Phase 3

  // ── Step 7: Wonders ──
  // Hanging Gardens (1): +1 empire, +3 in wonder city
  if (hasWonderEffect(gameState, ownerSlot, 1)) {
    st.happy += 1;
    if (cityHasActiveWonder(gameState, cityIndex, 1)) st.happy += 2;
  }

  // Cure for Cancer (27): +1 empire
  if (hasWonderEffect(gameState, ownerSlot, 27)) {
    st.happy += 1;
  }

  // Shakespeare's Theatre (13): all unhappy → content in wonder city
  if (cityHasActiveWonder(gameState, cityIndex, 13)) {
    st.unhappy = 0;
  }

  // J.S. Bach's Cathedral (15): -2 unhappy empire
  if (hasWonderEffect(gameState, ownerSlot, 15)) {
    st.unhappy -= 2;
  }

  adjust(); // Phase 4

  // ── Derive disorder / WLTKD ──
  const happy = st.happy;
  const unhappy = st.unhappy;
  const content = pop - happy - unhappy - totalSpecs;

  const civilDisorder = unhappy > happy;
  // Binary: WLtKD requires unhappy==0, size>2, govt!=anarchy(0)
  const weLoveKingDay = !civilDisorder && unhappy === 0 && happy >= content
    && pop > 2 && govt !== 'anarchy';

  return { happy, unhappy, civilDisorder, weLoveKingDay };
}

/**
 * Calculate rush-buy cost for a city's current production.
 *
 * @param {string} itemType - 'unit', 'building', or 'wonder'
 * @param {number} totalCost - total shield cost of the item
 * @param {number} shieldsStored - shields already accumulated
 * @returns {number} gold cost to rush-buy
 */
export function calcRushBuyCost(itemType, totalCost, shieldsStored) {
  const remaining = Math.max(0, Math.min(999, totalCost - shieldsStored));
  let cost;
  if (itemType === 'unit') {
    // Quadratic formula for units
    cost = Math.floor(remaining * remaining / 20) + remaining * 2;
  } else if (itemType === 'wonder') {
    // 4x linear for wonders (and spaceship parts)
    cost = remaining * 4;
  } else {
    // 2x linear for buildings
    cost = remaining * 2;
  }
  // No-investment penalty: double cost if no shields accumulated
  if (shieldsStored === 0) cost *= 2;
  return cost;
}
