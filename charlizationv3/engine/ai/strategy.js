// ═══════════════════════════════════════════════════════════════════
// ai/strategy.js — Strategic assessment for AI decision-making
//
// Ports 5 Civ2 assessment functions from block_004B0000.c:
//   FUN_004bc480 → assessMilitaryPosture (returns 1-7)
//   FUN_004bc8aa → assessCityDefense     (returns 1-7)
//   FUN_004bcb9b → assessEconomy         (returns 1-7)
//   FUN_004bcfcf → assessDiplomacy       (returns 1-7)
//   FUN_004bd2a3 → assessTaxRate         (returns 1-6)
//
// Uses computeAiData() for pre-computed analytics. Each function
// faithfully ports the decompiled logic with approximations noted.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_PREREQS, IMPROVE_PREREQS, IMPROVE_MAINTENANCE,
  DIFFICULTY_KEYS, GOVT_INDEX,
} from '../defs.js';

import { computeAiData, hasWonderEffect } from './data.js';

// ── Helpers ──────────────────────────────────────────────────────

/** Get treaty status between two civs. */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/** Get numeric difficulty index (0-5) for a civ. */
function getDifficultyIndex(gameState, civ) {
  const d = gameState.civs?.[civ]?.difficulty;
  if (typeof d === 'number') return d;
  const idx = DIFFICULTY_KEYS.indexOf(d);
  return idx >= 0 ? idx : 2; // default prince
}

/** Get numeric government index (0-6) for a civ. */
function getGovtIndex(gameState, civ) {
  const g = gameState.civs?.[civ]?.government;
  if (typeof g === 'number') return g;
  return GOVT_INDEX[g] ?? 1; // default despotism
}

/** Check if a civ has a specific tech. Equivalent to FUN_004bd9f0. */
function hasTech(gameState, civ, techId) {
  if (techId === -2) return false;  // unresearchable
  if (techId < 0) return true;      // no prerequisite (always available)
  if (techId === 89) return false;   // 0x59 = future tech placeholder
  if (techId >= 100) return false;
  if (civ < 1) return false;
  return gameState.civTechs?.[civ]?.has(techId) ?? false;
}

/** Check if a city has a building. Equivalent to FUN_0043d20a. */
function cityHasBuilding(city, buildingId) {
  return city.buildings ? city.buildings.has(buildingId) : false;
}

/**
 * Count set bits in a number (popcount).
 * Equivalent to FUN_005ae006.
 */
function popcount(x) {
  let n = 0;
  let v = x;
  while (v) { n += v & 1; v >>>= 1; }
  return n;
}

/**
 * Get building maintenance cost for a civ.
 * Simplified port of FUN_004f00f0.
 * Returns the maintenance cost (gold per turn) for a building, or 0 if
 * the civ doesn't have the tech to support it or special rules apply.
 */
function getBuildingMaintenance(gameState, civ, buildingId) {
  let cost = IMPROVE_MAINTENANCE[buildingId] ?? 0;

  // Barracks (building 2): reduced cost at low difficulty, bonus for Gunpowder(35)
  if (buildingId === 2) {
    const diff = getDifficultyIndex(gameState, civ);
    if (diff < 2 && cost > 0) cost--;
    if (hasTech(gameState, civ, 35)) cost++;  // Gunpowder tech check (0x23 = 35)
    // Additional check: walk the barracks obsolescence chain to find latest tech
    // Approximation: check if civ has Mobile Warfare (53) — the last barracks upgrade
    if (hasTech(gameState, civ, 53)) cost++;
  }

  // If maintenance is 1 and civ has Adam Smith's Trading Co. (wonder 17),
  // cost becomes 0
  if (cost === 1) {
    if (hasWonderEffect(gameState, civ, 17)) cost = 0;
  }

  // Emperor difficulty: Temple(4), Colosseum(14), Cathedral(11) are free
  if (cost > 0 && getDifficultyIndex(gameState, civ) === 4) {
    if (buildingId === 4 || buildingId === 14 || buildingId === 11) cost = 0;
  }

  return cost;
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 1: Military Posture (FUN_004bc480)
//
// Returns 1-7 indicating how the AI should approach military:
//   1 = too few units per city (build more)
//   2 = behind on naval tech (build navy)
//   3 = behind on air/naval tech (research/build)
//   4 = no barracks anywhere (build barracks)
//   5 = has masonry, has palace city, palace city lacks city walls,
//       and no Great Wall wonder (build city walls)
//   6 = has enemies but mid-ranked (standard posture)
//   7 = no enemies AND high power rank (dominant — can be aggressive)
// ═══════════════════════════════════════════════════════════════════

export function assessMilitaryPosture(civSlot, aiData, gameState) {
  const cities = gameState.cities || [];
  const units = gameState.units || [];

  // Count our cities, cities with barracks, and find palace city
  let ourCityCount = 0;
  let barracksCount = 0;
  let palaceCityIdx = -1;

  for (let i = 0; i < cities.length; i++) {
    const c = cities[i];
    if (!c || c.size <= 0 || c.gx < 0) continue;
    if (c.owner !== civSlot) continue;

    if (cityHasBuilding(c, 2)) barracksCount++;   // building 2 = Barracks
    if (cityHasBuilding(c, 1)) palaceCityIdx = i;  // building 1 = Palace
    ourCityCount++;
  }

  if (ourCityCount < 2) ourCityCount = 1; // avoid division by zero

  // Count our alive units
  let ourUnitCount = 0;
  for (const u of units) {
    if (u.gx < 0) continue;
    if (u.owner !== civSlot) continue;
    ourUnitCount++;
  }

  // Check: too few units per city?
  // Formula: (cityCount - 1 + unitCount) / cityCount < threshold
  // Threshold: difficulty < 5 (not deity) → 3, deity → 2
  const diff = getDifficultyIndex(gameState, civSlot);
  const threshold = (diff < 5) ? 3 : 2;
  if (Math.floor((ourCityCount - 1 + ourUnitCount) / ourCityCount) < threshold) {
    return 1;
  }

  // Compute per-civ naval and military tech scores
  // naval score: +1 for Seafaring(75), +1 for Nuclear Power(59),
  //              +1 for each air-domain unit type whose tech prereq is known
  // military score: +1 for each land attack/defend unit type whose tech prereq is known
  const navalScore = new Array(8).fill(0);
  const milScore = new Array(8).fill(0);

  for (let c = 1; c < 8; c++) {
    if (hasTech(gameState, c, 75)) navalScore[c]++;   // Seafaring (0x4b)
    if (hasTech(gameState, c, 59)) navalScore[c]++;   // Nuclear Power (0x3b)

    // Iterate all 62 unit types (0x3e = 62)
    for (let utype = 0; utype < 62; utype++) {
      const prereq = UNIT_PREREQS[utype];
      if (prereq == null) continue;
      if (!hasTech(gameState, c, prereq)) continue;

      const domain = UNIT_DOMAIN[utype];
      const role = UNIT_ROLE[utype];

      if (domain === 2) {
        // Air domain → adds to naval score
        navalScore[c]++;
      } else if (role === 0 || role === 1) {
        // Attack or defend role → adds to military score
        milScore[c]++;
      }
    }
  }

  // Count how many civs have higher military or naval scores than us
  let milBehind = 0;  // civs with better military tech
  let navalBehind = 0; // civs with better naval tech
  let hatredCount = 0;  // civs that hate us (at war)

  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;

    // Hatred check: DAT_0064c6c1[civ*0x594 + other*4] & 0x20
    // Approximation: at war = hatred
    const treaty = getTreaty(gameState, civSlot, c);
    if (treaty === 'war' && (aiData.civsAlive & (1 << c))) {
      hatredCount++;
    }

    if (navalScore[civSlot] < navalScore[c]) navalBehind++;
    if (milScore[civSlot] < milScore[c]) milBehind++;
  }

  // More than half of alive civs have better military tech → return 2
  const aliveMinusOne = aiData.aliveCivCount - 1;
  if (aliveMinusOne > 0 && milBehind > Math.floor(aliveMinusOne / 2)) {
    return 2;
  }

  // More than half of alive civs have better naval tech → return 3
  if (aliveMinusOne > 0 && navalBehind > Math.floor(aliveMinusOne / 2)) {
    return 3;
  }

  // Check: do we have Masonry(47)? Do we have a palace city?
  // Does palace city have City Walls(8)? Do we have Great Wall(6)?
  if (!hasTech(gameState, civSlot, 47) || palaceCityIdx < 0 ||
      cityHasBuilding(cities[palaceCityIdx], 8) ||
      hasWonderEffect(gameState, civSlot, 6)) {
    // One of the conditions short-circuits: walls already built or not needed
    if (barracksCount === 0) {
      return 4; // no barracks — build some
    }
    if (hatredCount === 0 && aiData.powerRank[civSlot] > 4) {
      return 7; // dominant, no enemies
    }
    return 6; // standard posture
  }

  // Has masonry, has palace, palace lacks walls, no Great Wall
  return 5; // build city walls at capital
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 2: City Defense (FUN_004bc8aa)
//
// Returns 1-7 indicating city defense priority:
//   1 = behind on tech, not enough in top half of civs
//   2 = need to focus on science (rates too low)
//   3 = need more defense buildings in cities
//   4 = need Trade tech for trade routes
//   5 = ahead on tech, top half of civs
//   7 = leading on tech (no civ has more techs)
//
// param_2 (threatLevel): 0=low, 1=medium, 2=high
// ═══════════════════════════════════════════════════════════════════

export function assessCityDefense(civSlot, threatLevel, aiData, gameState) {
  const cities = gameState.cities || [];

  // Count civs with at least as many techs as us
  let techBehind = 0;
  const ourTechs = aiData.techCount[civSlot];
  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;
    if (ourTechs <= aiData.techCount[c]) techBehind++;
  }

  // If no one has more or equal tech, we're the leader → 7
  if (techBehind === 0) return 7;

  // Check science rate threshold: if too low, return 2 (focus on science)
  const diff = getDifficultyIndex(gameState, civSlot);
  const sciRate = gameState.civs?.[civSlot]?.scienceRate ?? 5;

  if (diff < 5) {
    // Not deity: emperor(4) gets a pass, others need sciRate >= 6
    if (diff !== 4 && sciRate < 6) return 2;
  } else {
    // Deity: need sciRate >= 4
    if (sciRate < 4) return 2;
  }

  // Count our cities and check for defense building
  // Defense building depends on threat level:
  //   threatLevel 0 → building 6 (Library)
  //   threatLevel 1 → building 12 (University)
  //   threatLevel 2 → building 26 (Research Lab)
  let defenseBuilding;
  if (threatLevel === 0) defenseBuilding = 6;
  else if (threatLevel === 1) defenseBuilding = 12;
  else defenseBuilding = 26;

  let ourCities = 0;
  let citiesWithDefBuilding = 0;
  // Approximate trade surplus via continent military+city counts
  // DAT_0064c7a8 + DAT_0064c7a9 = per-continent stats for this civ
  // We approximate with continent-based city+military counts
  let tradeSurplus = 0;

  // Start with per-continent approximation of trade
  // In original code: local_8 = DAT_0064c7a8[civ] + DAT_0064c7a9[civ]
  // These are per-continent military and city counts from the civ data block.
  // Approximate: sum of (military + city counts) across all continents for this civ
  for (const [, cont] of aiData.continents) {
    tradeSurplus += (cont.cityCounts.get(civSlot) || 0);
    tradeSurplus += (cont.militaryCounts.get(civSlot) || 0);
  }

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;
    ourCities++;
    if (cityHasBuilding(city, defenseBuilding)) citiesWithDefBuilding++;
    // Add city's trade surplus approximation (use city size as proxy)
    // Original: local_8 += city.tradeSurplus. We don't have that field.
    tradeSurplus += Math.max(0, city.size - 1); // rough proxy
  }

  // Check if civ has the tech prerequisite for the defense building
  const defBuildingTech = IMPROVE_PREREQS[defenseBuilding];
  const hasDefTech = defBuildingTech != null ? hasTech(gameState, civSlot, defBuildingTech) : true;

  // If civ doesn't have the defense building tech, or less than half
  // the cities have the building → return 3 (need more defense buildings)
  if (hasDefTech && citiesWithDefBuilding < Math.floor(ourCities / 2)) {
    return 3;
  }

  // Check if civ has Trade tech (84)
  // If not, and trade surplus is less than quarter of cities → return 4
  if (!hasTech(gameState, civSlot, 84)) {
    // original: local_20 / 4 > local_8
    const quarter = Math.floor((ourCities + (ourCities < 0 ? 3 : 0)) / 4);
    if (quarter > tradeSurplus) {
      return 4;
    }
  }

  // Rank check: if behind less than half of alive civs → 5 (doing OK)
  if (techBehind < Math.floor(aiData.aliveCivCount / 2)) {
    return 5;
  }

  return 1; // behind on tech
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 3: Economy (FUN_004bcb9b)
//
// Returns 1-7 indicating economic priority:
//   1 = food surplus < building maintenance AND treasury < 100
//   2 = doesn't have key economic tech
//   3 = too few cities have the target improvement
//   4 = doesn't have Trade tech
//   5 = trade surplus below city count / 4
//   6 = food surplus - maintenance < 6 (tight economy)
//   7 = healthy economy (surplus well above maintenance)
//
// param_2 (threatLevel): 0=low, 1=medium, 2=high
// ═══════════════════════════════════════════════════════════════════

export function assessEconomy(civSlot, threatLevel, aiData, gameState) {
  const cities = gameState.cities || [];

  // Target building and key tech depend on threat level:
  //   threat 0: target tech=0x14(20=Currency), targetBuilding=5(Marketplace), divisor=2
  //   threat 1: target tech=6(Banking),       targetBuilding=10(Bank),        divisor=3
  //   threat 2: target tech=0x16(22=Economics),targetBuilding=0x16(22=StockExchange), divisor=4
  let keyTech, targetBuilding, divisor;
  if (threatLevel === 0) {
    keyTech = 20;         // Currency
    targetBuilding = 5;   // Marketplace
    divisor = 2;
  } else if (threatLevel === 1) {
    keyTech = 6;          // Banking
    targetBuilding = 10;  // Bank
    divisor = 3;
  } else {
    keyTech = 22;         // Economics
    targetBuilding = 22;  // Stock Exchange
    divisor = 4;
  }

  // Per-continent trade approximation (same as defense assessment)
  let tradeSurplus = 0;
  for (const [, cont] of aiData.continents) {
    tradeSurplus += (cont.cityCounts.get(civSlot) || 0);
    tradeSurplus += (cont.militaryCounts.get(civSlot) || 0);
  }

  // Iterate our cities: count buildings, compute food surplus and maintenance
  let ourCityCount = 0;
  let citiesWithTarget = 0;
  let totalFoodSurplus = 0;
  let totalMaintenance = 0;

  // Track building counts across all 39 buildings (0-38)
  const buildingCounts = new Array(39).fill(0);

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;
    ourCityCount++;

    // Accumulate trade surplus proxy
    tradeSurplus += Math.max(0, city.size - 1);

    // Original code calls FUN_004ea1f6 to recalc happiness — we skip that.
    // Count all buildings in this city
    for (let bid = 0; bid < 39; bid++) {
      if (cityHasBuilding(city, bid)) buildingCounts[bid]++;
    }

    // Check target building
    if (cityHasBuilding(city, targetBuilding)) citiesWithTarget++;

    // Food surplus approximation: use city size as proxy for net food
    // (original uses city.netFoodSurplus which we don't have)
    // Cities NOT in civil disorder contribute food
    if (!city.civilDisorder) {
      totalFoodSurplus += Math.max(0, city.size);
    }
  }

  // Compute total building maintenance for our civ
  for (let bid = 0; bid < 39; bid++) {
    if (buildingCounts[bid] > 0) {
      const maint = getBuildingMaintenance(gameState, civSlot, bid);
      if (maint > 0) {
        totalMaintenance += buildingCounts[bid] * maint;
      }
    }
  }

  // Decision 1: food surplus < maintenance AND treasury < 100 → 1 (economy in trouble)
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  if (totalFoodSurplus < totalMaintenance && treasury < 100) {
    return 1;
  }

  // Decision 2: doesn't have the key economic tech → 2
  if (!hasTech(gameState, civSlot, keyTech)) {
    return 2;
  }

  // Decision 3: too few cities have the target building
  if (ourCityCount > 0 && citiesWithTarget < Math.floor(ourCityCount / divisor)) {
    return 3;
  }

  // Decision 4: doesn't have Trade tech (84 = 0x54) → 4
  if (!hasTech(gameState, civSlot, 84)) {
    return 4;
  }

  // Decision 5: trade surplus is below city count / 4
  const quarter = Math.floor((ourCityCount + (ourCityCount < 0 ? 3 : 0)) / 4);
  if (tradeSurplus < quarter) {
    return 5;
  }

  // Decision 6: tight economy — surplus minus maintenance < 6
  if (totalFoodSurplus - totalMaintenance < 6) {
    return 6;
  }

  // Decision 7: healthy economy
  return 7;
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 4: Diplomacy (FUN_004bcfcf)
//
// Returns 1-7 indicating diplomatic priority:
//   1 = no contacted civs (isolated)
//   2 = few contacts, early government, no alliances, no provocation
//   3 = doesn't have key diplomatic tech
//   4 = government >= monarchy AND (all contacts hate us, or advanced govt)
//   5 = embassy intelligence but no advantage
//   6 = standard diplomatic position
//   7 = good intelligence, not all enemies
//
// param_2 (threatLevel): 0,1=low/medium, 2=high
// ═══════════════════════════════════════════════════════════════════

export function assessDiplomacy(civSlot, threatLevel, aiData, gameState) {
  // Treaty flag analysis
  // Original accesses raw treaty flag bytes. We approximate with our treaty system.
  let contactCount = 0;   // civs we have contact with (treaty bit 1)
  let allianceCount = 0;  // civs we're allied with (treaty bit 8)
  let hatredCount = 0;    // civs that hate us (treaty bit 0x20 ≈ at war)
  let visibleCivs = 0;    // civs we can see (embassy, or human has wonders)

  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;
    if (!(aiData.civsAlive & (1 << c))) continue;

    const treaty = getTreaty(gameState, civSlot, c);

    // Contact: any treaty other than initial no-contact
    // In our system, if a treaty entry exists, contact has been made
    const key = civSlot < c ? `${civSlot}-${c}` : `${c}-${civSlot}`;
    if (gameState.treaties?.[key]) {
      contactCount++;
    }

    // Alliance check
    if (treaty === 'alliance') allianceCount++;

    // Hatred check (at war)
    if (treaty === 'war' && gameState.treaties?.[key]) {
      // Only count as hatred if we actually have contact (treaty entry exists)
      hatredCount++;
    }

    // Visibility: embassy flag, or human player has United Nations(24)
    // or Marco Polo(9). Original checks DAT_0064c6c0[humanCiv*0x594+c*4] & 0x80
    // Approximation: check if we have Marco Polo or UN
    if (hasWonderEffect(gameState, civSlot, 24) ||  // United Nations (wonder 0x18)
        hasWonderEffect(gameState, civSlot, 9)) {    // Marco Polo (wonder 9)
      visibleCivs++;
    }
  }

  // Decision 1: no contacts → isolated
  if (contactCount === 0) return 1;

  // Key diplomatic tech depends on threat level:
  //   threat 2: tech 0x1b (27 = Espionage)
  //   else:     tech 0x58 (88 = Writing)
  const diploTech = (threatLevel === 2) ? 27 : 88;

  // Decision 3: doesn't have the diplomatic tech
  if (!hasTech(gameState, civSlot, diploTech)) return 3;

  // Complex conditions for decision 2 vs 4-7:
  // Original: if contacts < 2 OR government > despotism OR has alliances
  //           OR (civ attribs & 0x100) OR powerRank > 6
  const govtIdx = getGovtIndex(gameState, civSlot);
  const provoked = false; // DAT_0064c6a0 & 0x100 — nuke talk flag, not easily available

  if (contactCount < 2 || govtIdx > 1 || allianceCount > 0 ||
      provoked || aiData.powerRank[civSlot] > 6) {
    // More nuanced decisions
    if (govtIdx >= 3) {
      // Communism or higher: return 4 (focus on internal politics)
      return 4;
    }
    // Government < communism (anarchy, despotism, monarchy)
    if (hatredCount === contactCount && govtIdx > 1) {
      // All contacts hate us AND we're past despotism → 4
      return 4;
    }
    // Check if we have embassy intelligence (DAT_0064c6a0 & 0x80)
    // Approximation: we can see other civs via wonders
    if (visibleCivs === 0) {
      // No intelligence → 6 (standard)
      return 6;
    }
    if (visibleCivs === 0 || (hatredCount === contactCount && visibleCivs < contactCount)) {
      // Limited intelligence → 5
      return 5;
    }
    if (hatredCount === contactCount) {
      // All contacts are enemies → 6
      return 6;
    }
    // Good intelligence, not all enemies → 7
    return 7;
  }

  // Few contacts, early government, no alliances, no provocation → 2
  return 2;
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 5: Tax Rate (FUN_004bd2a3)
//
// Returns 1-6 indicating tax rate adjustment:
//   1 = unhappy cities with civil disorder AND difficulty=deity → revolt crisis
//   2 = unhappy cities exist but rates can't be raised further
//   3 = unhappy cities exist AND rates should be raised
//   4 = no unhappy cities, rates already at max → optimal
//   5 = no unhappy cities, rates can be raised, no WLTKD → raise rates
//   6 = no unhappy cities, rates can be raised, has WLTKD → keep luxury
// ═══════════════════════════════════════════════════════════════════

export function assessTaxRate(civSlot, aiData, gameState) {
  const cities = gameState.cities || [];
  const diff = getDifficultyIndex(gameState, civSlot);
  const sciRate = gameState.civs?.[civSlot]?.scienceRate ?? 5;
  const taxRate = gameState.civs?.[civSlot]?.taxRate ?? 5;

  // Note: original code checks DAT_00655aee & 4 (a game state flag) and
  // calls FUN_004eb4ed for deity+ difficulty. We skip that side-effect.

  let unhappyCities = 0;     // cities where unhappy > happy
  let disorderCities = 0;    // cities in actual civil disorder
  let tiedCities = 0;        // cities where happy == unhappy (borderline)
  let wltkdCities = 0;       // cities celebrating We Love the King Day

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;

    // Original compares city.happyCitizens vs city.unhappyCitizens
    // We may have .civilDisorder and .weLoveKingDay booleans, or
    // approximate from happiness computation.
    // Use available fields:
    const happy = city.happyCitizens ?? 0;
    const unhappy = city.unhappyCitizens ?? 0;

    if (happy < unhappy) {
      unhappyCities++;
      // Check civil disorder flag (attribs & 1)
      if (city.civilDisorder) disorderCities++;
    } else if (happy === unhappy) {
      tiedCities++;
    }

    // WLTKD flag (attribs & 2)
    if (city.weLoveKingDay) wltkdCities++;
  }

  // Determine if rates need adjustment
  // "needsAdjust" = true if science+tax rates sum < 10 (room to adjust),
  // UNLESS: no unhappy, some tied cities, no WLTKD, and rates sum == 10
  let needsAdjust;
  if (diff < 5) {
    // Not deity: needs adjust unless perfect equilibrium
    needsAdjust = true;
    if (unhappyCities === 0 && tiedCities > 0 && wltkdCities === 0 &&
        sciRate + taxRate === 10) {
      needsAdjust = false;
    }
  } else {
    // Deity: needs adjust if science + tax < 9
    needsAdjust = (sciRate + taxRate) < 9;
  }

  // Decision tree
  if (unhappyCities === 0) {
    // No unhappy cities
    if (needsAdjust) {
      if (wltkdCities === 0) {
        return 5; // can raise rates, no WLTKD
      }
      return 6; // can raise rates, but keep luxury for WLTKD
    }
    return 4; // rates already optimal
  }

  // Has unhappy cities
  if (needsAdjust) {
    // Can we afford to address it?
    if (disorderCities === 0 || diff !== 6) {
      // No actual disorder, or not democracy (deity index=6 but diff=5 is deity...
      // Original: difficulty != '\x06' which is the byte value 6 = democracy difficulty?
      // Actually DAT_0064c6b5 is difficulty (0-5), value 6 would be out of range.
      // This is likely checking if difficulty is democracy government index.
      // Reinterpreting: if no civil disorder, or government is not democracy → 3
      return 3;
    }
    // Civil disorder in democracy → crisis
    return 1;
  }

  // Can't adjust rates further
  return 2;
}

// ═══════════════════════════════════════════════════════════════════
// Main strategic assessment (combines all 5 assessments)
// ═══════════════════════════════════════════════════════════════════

/**
 * Compute a strategic assessment for the given civ using the
 * ported Civ2 assessment functions.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase   - immutable map data with accessors
 * @param {number} civSlot   - civ slot (1-7)
 * @param {object} [aiData]  - pre-computed AI analytics (optional, will compute if missing)
 * @returns {object} strategy assessment
 */
export function assessStrategy(gameState, mapBase, civSlot, aiData) {
  // Compute AI data if not provided
  if (!aiData) {
    aiData = computeAiData(gameState, mapBase, civSlot);
  }

  // Run the 5 ported assessment functions
  const militaryPostureScore = assessMilitaryPosture(civSlot, aiData, gameState);
  // Determine threat level from context: 0=low, 1=medium, 2=high
  // Use atWarWith count as a proxy
  const warCount = aiData.atWarWith[civSlot]?.length ?? 0;
  let threatLevel;
  if (warCount === 0) threatLevel = 0;
  else if (warCount === 1) threatLevel = 1;
  else threatLevel = 2;

  const cityDefenseScore = assessCityDefense(civSlot, threatLevel, aiData, gameState);
  const economyScore = assessEconomy(civSlot, threatLevel, aiData, gameState);
  const diplomacyScore = assessDiplomacy(civSlot, threatLevel, aiData, gameState);
  const taxRateScore = assessTaxRate(civSlot, aiData, gameState);

  // ── Backward-compatible fields ──
  // Map the new numeric scores to the old string-based fields
  // so existing AI modules don't break.

  // Threat level string
  let threat;
  if (threatLevel === 0) threat = 'low';
  else if (threatLevel === 1) threat = 'medium';
  else threat = 'high';

  // Military posture string
  let militaryPosture;
  if (militaryPostureScore <= 2) militaryPosture = 'defend';
  else if (militaryPostureScore <= 4) militaryPosture = 'expand';
  else if (militaryPostureScore === 5) militaryPosture = 'defend';
  else if (militaryPostureScore === 6) militaryPosture = 'expand';
  else militaryPosture = 'attack'; // score 7 = dominant

  // Expansion desired
  const expansionDesired = (militaryPosture === 'expand' && aiData.cityCount[civSlot] < 6);

  // War targets: civs we're at war with
  const warTargets = [...(aiData.atWarWith[civSlot] || [])];

  // Peace targets: civs at war with us that are stronger
  const peaceTargets = [];
  for (const warCiv of warTargets) {
    if (aiData.milStrength[warCiv] > aiData.milStrength[civSlot] * 1.5) {
      peaceTargets.push(warCiv);
    }
  }

  // Production focus
  let productionFocus;
  if (economyScore <= 2) productionFocus = 'economy';
  else if (militaryPostureScore <= 2 || threat === 'high') productionFocus = 'military';
  else if (expansionDesired) productionFocus = 'growth';
  else if (cityDefenseScore >= 5) productionFocus = 'science';
  else productionFocus = 'economy';

  // Build enemy maps for backward compat
  const enemyMilitary = new Map();
  const enemyCityCount = new Map();
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (!(aiData.civsAlive & (1 << i))) continue;
    if (aiData.milStrength[i] > 0 || aiData.cityCount[i] > 0) {
      enemyMilitary.set(i, aiData.milStrength[i]);
      enemyCityCount.set(i, aiData.cityCount[i]);
    }
  }

  return {
    // New numeric scores from ported Civ2 functions
    militaryPostureScore,
    cityDefenseScore,
    economyScore,
    diplomacyScore,
    taxRateScore,
    threatLevel,

    // Backward-compatible string fields
    threat,
    militaryPosture,
    expansionDesired,
    warTargets,
    peaceTargets,
    productionFocus,
    ourMilitary: aiData.milStrength[civSlot],
    enemyMilitary,
    cityCount: aiData.cityCount[civSlot],
    enemyCityCount,

    // Reference to full AI data
    aiData,
  };
}
