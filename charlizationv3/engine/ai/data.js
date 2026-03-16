// ═══════════════════════════════════════════════════════════════════
// ai/data.js — Per-turn AI analytics computation
//
// Computes continent analysis, power rankings, military stats,
// treaty info, and other derived data that AI assessment functions
// need. Called once per AI turn, results shared across all modules.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE, UNIT_MOVE_POINTS,
  WONDER_OBSOLETE, SETTLER_TYPES, ADVANCE_EPOCH,
} from '../defs.js';
import { calcCityTrade, calcFoodSurplus } from '../production.js';

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
  // Map<bodyId, { cityCounts, militaryCounts, attackStrength, cityPop, settlerCount }>
  const continents = new Map();

  function getContinent(bodyId) {
    let c = continents.get(bodyId);
    if (!c) {
      c = {
        cityCounts: new Map(),
        militaryCounts: new Map(),
        attackStrength: new Map(),   // L.1: sum of UNIT_ATK per civ
        cityPop: new Map(),          // L.1: sum of city sizes per civ
        settlerCount: new Map(),     // L.2: settler/engineer count per civ
      };
      continents.set(bodyId, c);
    }
    return c;
  }

  // Count cities per continent per civ + city population
  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    const idx = city.gy * mw + city.gx;
    const tile = mapBase.tileData[idx];
    if (!tile) continue;
    const bodyId = tile.bodyId ?? 0;
    const cont = getContinent(bodyId);
    cont.cityCounts.set(city.owner, (cont.cityCounts.get(city.owner) || 0) + 1);
    cont.cityPop.set(city.owner, (cont.cityPop.get(city.owner) || 0) + city.size);
  }

  // Count military units per continent per civ + attack strength + settler count
  for (const u of units) {
    if (u.gx < 0) continue; // dead unit
    const idx = u.gy * mw + u.gx;
    const tile = mapBase.tileData[idx];
    if (!tile) continue;
    const bodyId = tile.bodyId ?? 0;
    const cont = getContinent(bodyId);

    // L.2: settler/engineer counts per continent
    if (SETTLER_TYPES.has(u.type)) {
      cont.settlerCount.set(u.owner, (cont.settlerCount.get(u.owner) || 0) + 1);
    }

    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def === 0) continue; // non-combat
    cont.militaryCounts.set(u.owner, (cont.militaryCounts.get(u.owner) || 0) + 1);
    // L.1: accumulate attack strength per continent per civ
    cont.attackStrength.set(u.owner, (cont.attackStrength.get(u.owner) || 0) + atk);
  }

  // ── (a2) L.1 Continent flags ──────────────────────────────────
  // continentFlags[civ][bodyId] — bitfield per continent:
  //   0x01 = enemy cities present
  //   0x02 = enemy military present
  //   0x04 = at-peace (non-war contacted) cities present
  //   0x08 = at-peace military present
  //   0x10 = strong threat (enemy attack strength > our attack strength)
  const continentFlags = Array.from({ length: 8 }, () => new Map());

  // Build per-continent flag maps after we know treaty relationships
  // (deferred until after treaty loop — see below, populated after atWarWith)

  // ── (d) Per-civ military stats ───────────────────────────────
  const milStrength = new Array(8).fill(0);  // sum ATK+DEF
  const milAtkSum   = new Array(8).fill(0);  // sum ATK only
  const milDefSum   = new Array(8).fill(0);  // sum DEF only
  const unitCount   = new Array(8).fill(0);  // total alive units
  const cityCount   = new Array(8).fill(0);  // total alive cities
  const techCount   = new Array(8).fill(0);  // number of techs known

  // L.2: per-civ additional counters
  const unitTypeCounts = Array.from({ length: 8 }, () => new Array(62).fill(0));
  const navalUnitCount = new Array(8).fill(0);
  const totalPopulation = new Array(8).fill(0);

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
    // L.2: unit type counts
    if (u.type >= 0 && u.type < 62) {
      unitTypeCounts[own][u.type]++;
    }
    // L.2: naval unit count (domain 2 = sea)
    if ((UNIT_DOMAIN[u.type] ?? 0) === 2) {
      navalUnitCount[own]++;
    }
  }

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    cityCount[city.owner]++;
    totalPopulation[city.owner] += city.size;
  }

  for (let c = 0; c < 8; c++) {
    techCount[c] = gameState.civTechs?.[c]?.size ?? 0;
  }

  // L.2: era quarters — count techs in 4 era ranges (ADVANCE_EPOCH 0-3)
  const eraQuarters = Array.from({ length: 8 }, () => [0, 0, 0, 0]);
  for (let c = 0; c < 8; c++) {
    const techs = gameState.civTechs?.[c];
    if (!techs) continue;
    for (const techId of techs) {
      const era = ADVANCE_EPOCH[techId];
      if (era >= 0 && era <= 3) {
        eraQuarters[c][era]++;
      }
    }
  }

  // L.2: per-city trade surplus and net food surplus
  // Attach computed values to city objects for use by strategy assessments
  for (let ci = 0; ci < cities.length; ci++) {
    const city = cities[ci];
    if (!city || city.size <= 0 || city.gx < 0) continue;
    // Compute actual trade surplus (tax - maintenance) using real yield calc
    try {
      const tradeResult = calcCityTrade(city, ci, gameState, mapBase);
      city.tradeSurplus = tradeResult.tax - tradeResult.maintenance;
    } catch (_) {
      city.tradeSurplus = Math.max(0, city.size - 1); // fallback proxy
    }
    // Compute actual net food surplus
    try {
      const foodResult = calcFoodSurplus(city, ci, gameState, mapBase, units);
      city.netFoodSurplus = foodResult.surplus;
    } catch (_) {
      city.netFoodSurplus = 0; // fallback
    }
  }

  // L.2: continent settler counts (convenience accessor mirroring continents)
  const continentSettlerCount = Array.from({ length: 8 }, () => new Map());
  for (const [bodyId, cont] of continents) {
    for (const [civ, count] of cont.settlerCount) {
      continentSettlerCount[civ].set(bodyId, count);
    }
  }

  // L.1: continent-level convenience accessors
  const continentAttackStrength = Array.from({ length: 8 }, () => new Map());
  const continentCityPop = Array.from({ length: 8 }, () => new Map());
  for (const [bodyId, cont] of continents) {
    for (const [civ, str] of cont.attackStrength) {
      continentAttackStrength[civ].set(bodyId, str);
    }
    for (const [civ, pop] of cont.cityPop) {
      continentCityPop[civ].set(bodyId, pop);
    }
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
  // Binary formula (FUN_004853e7, POWER_GRAPH_BINARY):
  //   techCount * 3 + cityCount * 8 + treasury / 32
  //   + sum over all unit types: unitTypeCount * (attack+defense+1)/2 * movePoints/2
  const powerRanking = new Array(8).fill(0);
  for (let c = 0; c < 8; c++) {
    const treasury = civs[c]?.treasury ?? 0;
    // Unit strength: per unit type, count * (atk+def+1)/2 * mp/2
    let unitStrength = 0;
    for (let ut = 0; ut < 62; ut++) {
      const count = unitTypeCounts[c][ut];
      if (count === 0) continue;
      const atk = UNIT_ATK[ut] || 0;
      const def = UNIT_DEF[ut] || 0;
      const mp  = UNIT_MOVE_POINTS[ut] || 1;
      unitStrength += count * Math.floor((atk + def + 1) / 2) * Math.floor(mp / 2);
    }
    powerRanking[c] = techCount[c] * 3 + cityCount[c] * 8 + Math.floor(treasury / 32) + unitStrength;
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

  // L.4: Embassy and provocation tracking from diplomacy state
  const embassyFlags = Array.from({ length: 8 }, () => new Array(8).fill(false));
  const provocationFlags = Array.from({ length: 8 }, () => new Array(8).fill(0));
  // Populate from gameState.diplomacy
  for (let a = 1; a < 8; a++) {
    for (let b = 1; b < 8; b++) {
      if (a === b) continue;
      const dKey = a < b ? `${a}-${b}` : `${b}-${a}`;
      const diplo = gameState.diplomacy?.[dKey];
      if (!diplo) continue;
      // Embassy: the diplomacy key is symmetric but embassy is directional
      // in our system. embassy flag means the pair has established embassy.
      // The original binary tracks per-civ pair directionality (A has embassy with B).
      // Our diplomacy stores embassy: true meaning both ways (see diplomacy.js alliance auto-embassy).
      // For now treat as bidirectional: if flag set, both civs have embassy intel.
      if (diplo.embassy) {
        embassyFlags[a][b] = true;
        embassyFlags[b][a] = true;
      }
      // Provocation: sneak attack flag (nuke talk / border intrusion equivalent)
      // Bit 0x01 = sneak attack happened from one direction
      // We store the flag for both directions since it affects trust
      if (diplo.sneak) {
        provocationFlags[a][b] |= 0x01;
        provocationFlags[b][a] |= 0x01;
      }
    }
  }

  // L.1: Populate continent flags now that we know treaty relationships
  for (const [bodyId, cont] of continents) {
    for (let myCiv = 1; myCiv < 8; myCiv++) {
      if (!(civsAlive & (1 << myCiv))) continue;
      let flags = 0;
      const myAtk = cont.attackStrength.get(myCiv) || 0;

      for (const [otherCiv, count] of cont.cityCounts) {
        if (otherCiv === myCiv || otherCiv === 0) continue;
        const key = myCiv < otherCiv ? `${myCiv}-${otherCiv}` : `${otherCiv}-${myCiv}`;
        const hasContact = gameState.treaties?.[key] !== undefined;
        const treaty = getTreaty(gameState, myCiv, otherCiv);
        if (treaty === 'war' && hasContact) {
          flags |= 0x01; // enemy cities
        } else if (hasContact && treaty !== 'war') {
          flags |= 0x04; // at-peace cities
        }
      }

      for (const [otherCiv, count] of cont.militaryCounts) {
        if (otherCiv === myCiv || otherCiv === 0) continue;
        const key = myCiv < otherCiv ? `${myCiv}-${otherCiv}` : `${otherCiv}-${myCiv}`;
        const hasContact = gameState.treaties?.[key] !== undefined;
        const treaty = getTreaty(gameState, myCiv, otherCiv);
        if (treaty === 'war' && hasContact) {
          flags |= 0x02; // enemy military
          // Check for strong threat: enemy attack strength > our attack strength
          const enemyAtk = cont.attackStrength.get(otherCiv) || 0;
          if (enemyAtk > myAtk) {
            flags |= 0x10; // strong threat
          }
        } else if (hasContact && treaty !== 'war') {
          flags |= 0x08; // at-peace military
        }
      }

      if (flags !== 0) {
        continentFlags[myCiv].set(bodyId, flags);
      }
    }
  }

  return {
    continents,
    continentAttackStrength,
    continentCityPop,
    continentFlags,
    continentSettlerCount,
    powerRanking,
    powerRank,
    civsAlive,
    aliveCivCount,
    milStrength,
    milAtkSum,
    milDefSum,
    unitCount,
    unitTypeCounts,
    navalUnitCount,
    totalPopulation,
    eraQuarters,
    cityCount,
    techCount,
    atWarWith,
    contactedCivs,
    embassyFlags,
    provocationFlags,
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
