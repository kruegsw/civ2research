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
import { checkSpaceRaceCapability } from '../spaceship.js';
import { getTreatyFlags } from '../diplomacy.js';

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
  // Port of binary FUN_004f00f0 (block_004F0000.c:6, 305 bytes).
  let cost = IMPROVE_MAINTENANCE[buildingId] ?? 0;

  // Barracks (building 2): reduced cost at low difficulty, bumped for
  // Gunpowder/Mobile-Warfare tier upgrades.
  if (buildingId === 2) {
    const diff = getDifficultyIndex(gameState, civ);
    if (diff < 2 && cost > 0) cost--;
    if (hasTech(gameState, civ, 35)) cost++;  // Gunpowder (0x23)
    // Approximation of binary's obsolescence-chain walk back from
    // tech 53 (Mobile Warfare) following prereqs until a flag byte is
    // non-zero. v3 just checks Mobile Warfare directly — close enough
    // until we have a per-tech "barracks-tier" flag.
    if (hasTech(gameState, civ, 53)) cost++;
  }

  // Adam Smith's Trading Co. (wonder 17): cost-1 buildings are free.
  if (cost === 1) {
    if (hasWonderEffect(gameState, civ, 17)) cost = 0;
  }

  // Binary line 40: under Fundamentalism (govt == 4) Temple(4),
  // Cathedral(11), and Colosseum(14) are free. NOT difficulty 4
  // (Emperor) — earlier comment had this wrong.
  if (cost > 0 && getGovtIndex(gameState, civ) === 4) {
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
//   5 = has Gunpowder, has a walled city without Coastal Fortress,
//       and no Great Wall wonder (build coastal fortress)
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
  // Binary: threshold = 2 + (powerRank < 5 ? 1 : 0) — powerRank from DAT_00655c22
  // Power rank < 5 (weaker civs) get threshold 3, rank >= 5 (stronger) get 2
  const civPowerRank = aiData.powerRank[civSlot];
  const threshold = 2 + (civPowerRank < 5 ? 1 : 0);
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

      if (domain === 1) {
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

  // No barracks across ALL cities — build some (#10)
  if (barracksCount === 0 && ourCityCount > 0) {
    return 4;
  }

  // Check: do we have Gunpowder(35)? Is there a walled city without
  // Coastal Fortress(28)? And we don't have Great Wall(6)?
  // Binary result 5: Has Gunpowder + walled city without Coastal Fortress and no Great Wall
  if (hasTech(gameState, civSlot, 35) && !hasWonderEffect(gameState, civSlot, 6)) {
    // Look for a city that has City Walls(8) but lacks Coastal Fortress(28)
    let walledCityLacksCoastal = false;
    for (let i = 0; i < cities.length; i++) {
      const c = cities[i];
      if (!c || c.size <= 0 || c.gx < 0 || c.owner !== civSlot) continue;
      if (cityHasBuilding(c, 8) && !cityHasBuilding(c, 28)) {
        walledCityLacksCoastal = true;
        break;
      }
    }
    if (walledCityLacksCoastal) {
      return 5; // build coastal fortress at a walled city
    }
  }

  // Standard or dominant posture
  if (hatredCount === 0 && aiData.powerRank[civSlot] > 4) {
    return 7; // dominant, no enemies
  }
  return 6; // standard posture
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 2: City Defense (FUN_004bc8aa)
//
// Returns 1-7 indicating city defense priority:
//   1 = behind on tech, not enough in top half of civs
//   2 = government type too low for current power rank era
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

  // Check government type: if too low for era, return 2 (need better government)
  // Binary: DAT_0064c6b5 = government type, checked against power rank threshold
  // Power rank < 5 (early): if govt != 4 (Fundamentalism) && govt < 6, return 2
  // Power rank >= 5 (late): if govt < 4, return 2
  const govtIdx = getGovtIndex(gameState, civSlot);
  const civPwrRank = aiData.powerRank[civSlot];

  if (civPwrRank < 5) {
    // Early era: need Republic(5) or Democracy(6), or Fundamentalism(4) is OK
    if (govtIdx !== 4 && govtIdx < 6) return 2;
  } else {
    // Late era: need at least Fundamentalism(4)
    if (govtIdx < 4) return 2;
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
    // L.2: Use actual trade surplus computed by computeAiData (calcCityTrade)
    tradeSurplus += city.tradeSurplus != null ? Math.max(0, city.tradeSurplus) : Math.max(0, city.size - 1);
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
//   1 = shield production < building maintenance AND treasury < 100
//   2 = doesn't have key economic tech
//   3 = too few cities have the target improvement
//   4 = doesn't have Trade tech
//   5 = trade surplus below city count / 4
//   6 = shield production - maintenance < 6 (tight economy)
//   7 = healthy economy (production well above maintenance)
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

  // Iterate our cities: count buildings, compute shield production and maintenance
  let ourCityCount = 0;
  let citiesWithTarget = 0;
  let totalShieldProduction = 0;
  let totalMaintenance = 0;

  // Track building counts across all 39 buildings (0-38)
  const buildingCounts = new Array(39).fill(0);

  for (const city of cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;
    ourCityCount++;

    // L.2: Use actual trade surplus computed by computeAiData (calcCityTrade)
    tradeSurplus += city.tradeSurplus != null ? Math.max(0, city.tradeSurplus) : Math.max(0, city.size - 1);

    // Original code calls FUN_004ea1f6 to recalc happiness — we skip that.
    // Count all buildings in this city
    for (let bid = 0; bid < 39; bid++) {
      if (cityHasBuilding(city, bid)) buildingCounts[bid]++;
    }

    // Check target building
    if (cityHasBuilding(city, targetBuilding)) citiesWithTarget++;

    // Binary uses shield production (DAT_0064f38c), not food surplus.
    // Cities NOT in civil disorder contribute shields.
    if (!city.civilDisorder) {
      totalShieldProduction += city.shieldProduction != null ? city.shieldProduction : Math.max(0, city.size);
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

  // Decision 1: shield production < maintenance AND treasury < 100 → 1 (economy in trouble)
  // Binary: total shield production (DAT_0064f38c) vs building maintenance
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  if (totalShieldProduction < totalMaintenance && treasury < 100) {
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

  // Decision 6: tight economy — production surplus less than 6 shields
  if (totalShieldProduction - totalMaintenance < 6) {
    return 6;
  }

  // Decision 7: healthy economy — production surplus >= 6 shields
  return 7;
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 4: Diplomacy (FUN_004bcfcf — block_004B0000.c:5804, 724 bytes)
//
// Returns 1-7 indicating diplomatic priority. Decision tree (binary):
//   1 = no contacts (local_8 == 0)
//   2 = post-tech-gate fallback: few contacts, low reputation, no
//       alliances, no provocation flag, low rank
//   3 = doesn't have diplomatic tech (Espionage if threat=2, else Writing)
//   4 = reputation >= 3, OR (reputation > 1 AND all-contacts-at-war)
//   5 = limited viewing visibility — embassy intel partial
//   6 = standard / no flag-0x80 set / fallback in viewer-rich tree
//   7 = healthy: visibility AND not all-at-war
//
// param_2 (threatLevel): 0,1=low/medium, 2=high
// ═══════════════════════════════════════════════════════════════════

export function assessDiplomacy(civSlot, threatLevel, aiData, gameState) {
  // Binary lines 5816-5837: per-civ counts. Iterates ALL c=1..7 (skipping
  // only c==param_1 — does NOT gate on civsAlive).
  let contactCount = 0;   // local_8: byte+0 bit 0x01 = CONTACT
  let allianceCount = 0;  // local_10: byte+0 bit 0x08 = ALLIANCE
  let warCount = 0;       // local_14: byte+1 bit 0x20 = bit 13 = 0x2000 = WAR
  let visibleCount = 0;   // local_1c: viewing has EMBASSY with c, OR viewing
                          //           has UN (24) / Marco Polo (9)

  // Binary's DAT_006d1da0 = "viewing civ" (single human in normal play).
  // Use lowest-bit human player; default to civSlot if none (headless).
  const humanMask = gameState.humanPlayers || 0;
  let viewingCiv = 0;
  for (let i = 0; i < 8; i++) {
    if (humanMask & (1 << i)) { viewingCiv = i; break; }
  }
  const viewingHasUN = viewingCiv > 0 && hasWonderEffect(gameState, viewingCiv, 24);
  const viewingHasMP = viewingCiv > 0 && hasWonderEffect(gameState, viewingCiv, 9);

  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;
    const flagsAB = getTreatyFlags(gameState, civSlot, c);
    if (flagsAB & 0x01) contactCount++;          // CONTACT
    if (flagsAB & 0x08) allianceCount++;         // ALLIANCE
    if (flagsAB & 0x2000) warCount++;            // WAR (byte+1 bit 0x20)
    // Viewing-civ EMBASSY (byte+0 bit 0x80) OR viewing has UN/MP.
    const flagsViewC = viewingCiv > 0
      ? getTreatyFlags(gameState, viewingCiv, c) : 0;
    if ((flagsViewC & 0x80) || viewingHasUN || viewingHasMP) visibleCount++;
  }

  // Binary line 5838: no contacts → isolated.
  if (contactCount === 0) return 1;

  // Binary lines 5842-5847: pick diplomatic tech.
  const diploTech = (threatLevel === 2) ? 0x1b : 0x58;

  // Binary lines 5848-5851: missing diplomatic tech → 3.
  if (!hasTech(gameState, civSlot, diploTech)) return 3;

  // Binary lines 5852-5854: outer "rich tree" gate.
  //   contacts < 2 OR reputation > 1 OR alliances > 0
  //   OR (civ.flags & 0x100) OR rank > 6
  // civ.reputation maps to byte at +0x1E (parser.js:455 reads savBuf[off+30]).
  // civ.stateFlags is the u16 at +0x00 (parser.js:289).
  const civ = gameState.civs?.[civSlot] || {};
  const reputation = civ.reputation ?? 0;
  const stateFlags = civ.stateFlags ?? 0;
  const rank = aiData.powerRank?.[civSlot] ?? 3;

  const outerGate = contactCount < 2 || reputation > 1 || allianceCount !== 0 ||
                    (stateFlags & 0x100) !== 0 || rank > 6;

  if (!outerGate) {
    // Binary line 5876-5878: post-tech-gate fallback.
    return 2;
  }

  // Binary lines 5855-5874: rank-tree dispatch on reputation.
  if (reputation >= 3) {
    // Binary line 5872-5873: high reputation → 4 (no further branching).
    return 4;
  }

  // Binary lines 5856-5870: reputation < 3, fine-grained decision.
  if (warCount === contactCount && reputation > 1) {
    // Binary line 5856-5857: all contacts at war AND reputation > 1 → 4.
    return 4;
  }
  if ((stateFlags & 0x80) === 0) {
    // Binary line 5859-5860: civ.flags bit 0x80 not set → 6.
    return 6;
  }
  if (visibleCount === 0 ||
      (warCount === contactCount && visibleCount < contactCount)) {
    // Binary line 5862-5863: no viewer visibility OR partial visibility +
    // all-at-war → 5.
    return 5;
  }
  if (warCount === contactCount) {
    // Binary line 5865-5866: all-at-war but enough visibility → 6.
    return 6;
  }
  // Binary line 5868-5869: healthy → 7.
  return 7;
}

// ═══════════════════════════════════════════════════════════════════
// Assessment 5: Tax Rate (FUN_004bd2a3)
//
// Returns 1-6 indicating tax rate adjustment:
//   1 = unhappy cities with civil disorder AND government=Democracy → revolt crisis
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
    // Binary: check government type == 6 (Democracy) — DAT_0064c6b5 is govt type
    const govtType = getGovtIndex(gameState, civSlot);
    if (disorderCities === 0 || govtType !== 6) {
      // No actual civil disorder, or government is not democracy → 3
      return 3;
    }
    // Civil disorder in democracy → crisis (revolution risk)
    return 1;
  }

  // Can't adjust rates further
  return 2;
}

// ═══════════════════════════════════════════════════════════════════
// Territory Analysis — zone-based threat assessment
//
// Divides the map into an 8×8 grid of zones and counts own/enemy
// units and cities per zone. Returns a threat level per zone:
//   0 = safe (no enemy presence)
//   1 = contested (enemy units nearby but outnumbered)
//   2 = threatened (enemy presence equals or exceeds ours)
//   3 = under attack (enemy significantly outnumbers us)
// ═══════════════════════════════════════════════════════════════════

/**
 * Analyze territorial control across the map using an 8×8 zone grid.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase   - immutable map data with mw, mh, tileData
 * @param {number} civSlot   - civ slot (1-7)
 * @returns {object} { zones: Array<{ownUnits, enemyUnits, ownCities, enemyCities, threat}>, gridW, gridH }
 */
export function analyzeTerritory(gameState, mapBase, civSlot) {
  const GRID_W = 8;
  const GRID_H = 8;
  const zoneW = Math.max(1, Math.ceil(mapBase.mw / GRID_W));
  const zoneH = Math.max(1, Math.ceil(mapBase.mh / GRID_H));

  // Initialize zone data
  const zones = new Array(GRID_W * GRID_H);
  for (let i = 0; i < zones.length; i++) {
    zones[i] = { ownUnits: 0, enemyUnits: 0, ownCities: 0, enemyCities: 0, threat: 0 };
  }

  /** Map a tile coordinate to a zone index. */
  function toZone(gx, gy) {
    const zx = Math.min(GRID_W - 1, Math.floor(gx / zoneW));
    const zy = Math.min(GRID_H - 1, Math.floor(gy / zoneH));
    return zy * GRID_W + zx;
  }

  // Count units per zone
  const units = gameState.units || [];
  for (const u of units) {
    if (u.gx < 0) continue;
    // Only count combat-capable units (ATK or DEF > 0)
    if ((UNIT_ATK[u.type] || 0) === 0 && (UNIT_DEF[u.type] || 0) === 0) continue;
    const zi = toZone(u.gx, u.gy);
    if (u.owner === civSlot) {
      zones[zi].ownUnits++;
    } else if (u.owner > 0) {
      zones[zi].enemyUnits++;
    }
  }

  // Count cities per zone
  const cities = gameState.cities || [];
  for (const c of cities) {
    if (!c || c.size <= 0 || c.gx < 0) continue;
    const zi = toZone(c.gx, c.gy);
    if (c.owner === civSlot) {
      zones[zi].ownCities++;
    } else if (c.owner > 0) {
      zones[zi].enemyCities++;
    }
  }

  // Compute threat levels per zone
  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    const enemyPresence = z.enemyUnits + z.enemyCities;
    const ownPresence = z.ownUnits + z.ownCities;

    if (enemyPresence === 0) {
      z.threat = 0; // safe
    } else if (enemyPresence > ownPresence * 2) {
      z.threat = 3; // under attack
    } else if (enemyPresence >= ownPresence) {
      z.threat = 2; // threatened
    } else {
      z.threat = 1; // contested
    }
  }

  return { zones, gridW: GRID_W, gridH: GRID_H, zoneW, zoneH };
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
export function assessStrategy(gameState, mapBase, civSlot, aiData, debugLog = null) {
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

  // Space race capability assessment
  const spaceRaceLevel = checkSpaceRaceCapability(gameState, civSlot);

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
  if (spaceRaceLevel >= 2) productionFocus = 'spaceship';
  else if (economyScore <= 2) productionFocus = 'economy';
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

  if (debugLog) {
    const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
    debugLog.push(`STRAT: ${civName}: threat=${threat} posture=${militaryPosture} economy=${economyScore} diplomacy=${diplomacyScore} focus=${productionFocus}`);
  }

  return {
    // New numeric scores from ported Civ2 functions
    militaryPostureScore,
    cityDefenseScore,
    economyScore,
    diplomacyScore,
    taxRateScore,
    threatLevel,
    spaceRaceLevel,

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
