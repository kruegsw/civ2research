// ═══════════════════════════════════════════════════════════════════
// ai/diplomai.js — AI diplomacy: treaty proposals, war declarations,
//                  tribute demands, and responding to incoming offers
//
// Ported from Civ2 decompiled functions:
//   FUN_0055cbd5 — war declaration evaluation (per-continent strength)
//   FUN_0055d1e2 — tech/peace negotiation between two AI civs
//   FUN_0055d685 — third-party "join war" requests
//   FUN_0055d8d8 — main diplomacy encounter orchestrator
//   FUN_0045705e — diplomacy evaluation (tribute, attitude, tech desire)
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import {
  UNIT_ATK, UNIT_DEF,
  DIFFICULTY_KEYS,
} from '../defs.js';
import { hasWonderEffect } from '../utils.js';

// ── Leader Personality Table ─────────────────────────────────────
// Indexed by rulesCivNumber (0-20). Each entry: [expansionism, militarism]
// From Civ2 LEADERS.TXT analysis:
//   expansionism: -1=isolationist, 0=neutral, 1=expansionist
//   militarism:   -1=peaceful, 0=neutral, 1=aggressive
// These map to DAT_006554f8 (patience) and DAT_00655c22 (power ranking)
// in the decompiled source.
const LEADER_PERSONALITY = [
  [ 1,  1], //  0: Romans       — expansionist, aggressive
  [ 0, -1], //  1: Babylonians  — neutral, peaceful
  [ 1,  1], //  2: Germans      — expansionist, aggressive
  [ 0,  0], //  3: Egyptians    — neutral, neutral
  [ 1,  0], //  4: Americans    — expansionist, neutral
  [ 0, -1], //  5: Greeks       — neutral, peaceful
  [-1, -1], //  6: Indians      — isolationist, peaceful
  [ 1,  1], //  7: Russians     — expansionist, aggressive
  [ 1,  1], //  8: Zulus        — expansionist, aggressive
  [ 0,  0], //  9: French       — neutral, neutral
  [ 1,  1], // 10: Aztecs       — expansionist, aggressive
  [ 1,  0], // 11: Chinese      — expansionist, neutral
  [ 0,  0], // 12: English      — neutral, neutral
  [ 1,  1], // 13: Mongols      — expansionist, aggressive
  [ 0,  0], // 14: Celts        — neutral, neutral
  [ 1,  1], // 15: Japanese     — expansionist, aggressive
  [ 1,  1], // 16: Vikings      — expansionist, aggressive
  [ 1,  0], // 17: Spanish      — expansionist, neutral
  [ 0,  0], // 18: Persians     — neutral, neutral
  [ 1,  0], // 19: Carthaginians— expansionist, neutral
  [ 0,  1], // 20: Sioux        — neutral, aggressive
];

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
 * Check if two civs have made contact (i.e. a treaty entry exists).
 * When no treaty entry exists, the civs have never met — diplomacy
 * should not occur between them. This is distinct from being "at war":
 * getTreaty() returns 'war' by default for uncontacted civs, but
 * actual war only exists when an explicit 'war' entry is in treaties.
 */
function haveContact(gameState, civA, civB) {
  if (!gameState.treaties) return false;
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] !== undefined;
}

/**
 * Get leader personality for a civ slot.
 * Returns { expansionism, militarism } where each is -1, 0, or 1.
 */
function getPersonality(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  const rcn = civ?.rulesCivNumber ?? 0;
  const entry = LEADER_PERSONALITY[rcn] || [0, 0];
  return { expansionism: entry[0], militarism: entry[1] };
}

/**
 * Get attitude of civSlot toward targetCiv (-100 to +100).
 */
function getAttitude(gameState, civSlot, targetCiv) {
  const civ = gameState.civs?.[civSlot];
  if (!civ?.attitudes) return 0;
  return civ.attitudes[targetCiv] ?? 0;
}

/**
 * Modify attitude of civSlot toward targetCiv by delta.
 * Clamps to [-100, +100]. Returns the ADJUST_ATTITUDE action.
 */
function makeAttitudeAction(civSlot, targetCiv, delta) {
  return { type: 'ADJUST_ATTITUDE', civSlot, targetCiv, delta };
}

/**
 * Get the difficulty level index (0=chieftain .. 5=deity).
 */
function getDifficultyIndex(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  const diff = civ?.difficulty || 'chieftain';
  const idx = DIFFICULTY_KEYS.indexOf(diff);
  return idx >= 0 ? idx : 0;
}

/**
 * Compute isometric distance between two tiles using doubled-X coordinates.
 * Handles horizontal wrapping.
 */
function tileDist(gx1, gy1, gx2, gy2, mapBase) {
  const dx1 = gx1 * 2 + (gy1 % 2);
  const dx2 = gx2 * 2 + (gy2 % 2);
  let ddx = Math.abs(dx1 - dx2);
  if (mapBase?.wraps) {
    const mw2 = mapBase.mw * 2;
    ddx = Math.min(ddx, mw2 - ddx);
  }
  return ddx + Math.abs(gy1 - gy2);
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
    // Only count as "at war" if there's actual contact — uncontacted civs
    // default to 'war' via getTreaty() but aren't truly at war
    if (getTreaty(gameState, civSlot, i) === 'war' && haveContact(gameState, civSlot, i)) wars++;
  }
  return wars;
}

// ── Per-Continent Military Analysis ─────────────────────────────
// Port of the continent-based strength comparison from FUN_0055cbd5.
// In the original, continents are tracked via per-continent data blocks
// at civ offsets +404-996. We approximate using city proximity clusters.

/**
 * Assign each city to a "continent" cluster via flood-fill on the
 * isometric grid. Two cities share a continent if they're within
 * 20 tiles of each other (approximating landmass connectivity).
 *
 * Returns a Map<clusterId, { civCities: Map<civSlot, [{gx,gy}]>,
 *                            civMilitary: Map<civSlot, number> }>
 */
function computeContinentData(gameState, mapBase) {
  const cities = gameState.cities;
  const units = gameState.units;
  if (!cities || !units) return new Map();

  // Collect alive cities with their positions
  const aliveCities = [];
  for (const c of cities) {
    if (c && c.size > 0 && c.gx >= 0) {
      aliveCities.push(c);
    }
  }

  // Simple clustering: union-find by proximity (within 20 tiles)
  const CLUSTER_DIST = 20;
  const parent = new Array(aliveCities.length);
  for (let i = 0; i < parent.length; i++) parent[i] = i;

  function find(x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  function union(a, b) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  }

  for (let i = 0; i < aliveCities.length; i++) {
    for (let j = i + 1; j < aliveCities.length; j++) {
      const d = tileDist(aliveCities[i].gx, aliveCities[i].gy,
                         aliveCities[j].gx, aliveCities[j].gy, mapBase);
      if (d <= CLUSTER_DIST) union(i, j);
    }
  }

  // Build cluster map
  const clusters = new Map();
  for (let i = 0; i < aliveCities.length; i++) {
    const cid = find(i);
    if (!clusters.has(cid)) {
      clusters.set(cid, { civCities: new Map(), civMilitary: new Map() });
    }
    const cl = clusters.get(cid);
    const owner = aliveCities[i].owner;
    if (!cl.civCities.has(owner)) cl.civCities.set(owner, []);
    cl.civCities.get(owner).push(aliveCities[i]);
  }

  // Assign unit military strength to the nearest cluster where their civ has cities
  for (const u of units) {
    if (!u || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def <= 1) continue; // non-combat
    const str = atk + def;

    // Find the cluster containing this unit's nearest friendly city
    let bestCluster = -1;
    let bestDist = Infinity;
    for (const [cid, cl] of clusters) {
      const friendlyCities = cl.civCities.get(u.owner);
      if (!friendlyCities) continue;
      for (const c of friendlyCities) {
        const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase);
        if (d < bestDist) { bestDist = d; bestCluster = cid; }
      }
    }
    if (bestCluster >= 0) {
      const cl = clusters.get(bestCluster);
      cl.civMilitary.set(u.owner, (cl.civMilitary.get(u.owner) || 0) + str);
    }
  }

  return clusters;
}

/**
 * Compute total military strength for a civ (sum of ATK+DEF for combat units).
 */
function calcMilitaryStrength(gameState, civSlot) {
  if (!gameState.units) return 0;
  let strength = 0;
  for (const u of gameState.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def <= 1) continue;
    strength += atk + def;
  }
  return strength;
}

/**
 * Count alive cities for a civ.
 */
function countCities(gameState, civSlot) {
  if (!gameState.cities) return 0;
  let n = 0;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.size > 0 && c.gx >= 0) n++;
  }
  return n;
}

// ═══════════════════════════════════════════════════════════════════
// 1. evaluateMilitaryBalance — Per-continent strength comparison
//    Port of the inner loop of FUN_0055cbd5
// ═══════════════════════════════════════════════════════════════════

/**
 * Compare military balance between two civs on shared continents.
 *
 * Returns:
 *   { dominantCount, weakCount, sharedContinents,
 *     ourSharedStrength, theirSharedStrength }
 *
 * dominantCount: continents where we have >= 2x their strength
 * weakCount:     continents where they have >= 2x our strength
 *
 * Based on FUN_0055cbd5's per-continent loop at 0x0055CE6E:
 *   for each continent where both have cities,
 *     compare attack_strength[us] + city_attack[us]
 *     vs attack_strength[them] + city_count[them]
 */
function evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState) {
  let dominantCount = 0;
  let weakCount = 0;
  let sharedContinents = 0;
  let ourSharedStrength = 0;
  let theirSharedStrength = 0;

  // Sun Tzu's War Academy (wonder 7) gives effective military bonus
  const hasSunTzu = hasWonderEffect(gameState, civSlot, 7);
  const theyHaveSunTzu = hasWonderEffect(gameState, targetCiv, 7);

  for (const [, cl] of continentData) {
    const ourCities = cl.civCities.get(civSlot);
    const theirCities = cl.civCities.get(targetCiv);
    if (!ourCities || !theirCities) continue; // not a shared continent

    sharedContinents++;

    let ourStr = cl.civMilitary.get(civSlot) || 0;
    let theirStr = cl.civMilitary.get(targetCiv) || 0;

    // Sun Tzu bonus: +25% effective strength (simulates veteran bonus)
    if (hasSunTzu) ourStr = Math.floor(ourStr * 1.25);
    if (theyHaveSunTzu) theirStr = Math.floor(theirStr * 1.25);

    ourSharedStrength += ourStr;
    theirSharedStrength += theirStr;

    if (ourStr >= theirStr * 2) dominantCount++;
    if (theirStr >= ourStr * 2) weakCount++;
  }

  return { dominantCount, weakCount, sharedContinents,
           ourSharedStrength, theirSharedStrength };
}

// ═══════════════════════════════════════════════════════════════════
// 2. shouldDeclareWar — Port of FUN_0055cbd5
//
// Original function checks:
//   - Alliance constraints (0x08 treaty flag = alliance)
//   - Third-party alliances that would be violated
//   - Per-continent military dominance ratio
//   - Leader patience (DAT_006554f8[rulesCivNumber])
//   - Number of existing war fronts
//   - Random factor
// ═══════════════════════════════════════════════════════════════════

function shouldDeclareWar(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty === 'war') return false; // already at war

  const personality = getPersonality(gameState, civSlot);
  const difficulty = getDifficultyIndex(gameState, civSlot);

  // Peaceful leaders (militarism -1) avoid declaring war unless provoked
  // This maps to the patience check in FUN_0055cbd5 line ~5240:
  //   if patience[us] < patience[them] → return 0 (don't declare)
  if (personality.militarism < 0) return false;

  // Count existing wars — FUN_0055cbd5 at ~5244-5260 iterates all civs
  // and counts active wars, alliances, and third-party considerations
  const warCount = countWars(gameState, civSlot);

  // Don't open more than 2 fronts (from decompiled: local_c threshold)
  if (warCount > 2) return false;

  // Aggressive leaders tolerate one more front
  const maxFronts = personality.militarism > 0 ? 3 : 2;
  if (warCount >= maxFronts) return false;

  // Alliance constraint: if we're allied with civA, and civA is allied
  // with targetCiv, don't declare war on targetCiv.
  // Port of FUN_0055cbd5 at ~5222-5238:
  //   for each third civ: if allied with us AND allied with target
  //   AND third civ is stronger → return 0
  if (treaty === 'alliance') {
    // Breaking an alliance to declare war is a separate decision
    return false;
  }

  const civs = gameState.civs;
  if (civs) {
    for (let k = 1; k < civs.length; k++) {
      if (k === civSlot || k === targetCiv) continue;
      if (!(gameState.civsAlive & (1 << k))) continue;

      const ourTreaty = getTreaty(gameState, civSlot, k);
      const theirTreaty = getTreaty(gameState, targetCiv, k);

      // If we're allied with k, and k is allied with targetCiv,
      // declaring war would damage our alliance with k
      if (ourTreaty === 'alliance' && theirTreaty === 'alliance') {
        return false;
      }

      // FUN_0055cbd5 ~5252-5258: if third civ is allied with both us
      // and the target, AND third civ is stronger than both, don't start war
      if (ourTreaty === 'alliance' && theirTreaty !== 'war') {
        const thirdStr = calcMilitaryStrength(gameState, k);
        const ourStr = calcMilitaryStrength(gameState, civSlot);
        if (thirdStr > ourStr) return false;
      }
    }
  }

  // Per-continent military comparison
  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);

  // Must share at least one continent (proximity check)
  if (balance.sharedContinents === 0) return false;

  // Need military dominance on at least one shared continent
  // FUN_0055cbd5 ~5282-5298: compares total strength ratio with
  // a threshold derived from (local_c - patience + 4)
  if (balance.dominantCount === 0) return false;

  // Overall strength check: our shared strength must exceed theirs
  // factored by the war front count penalty
  const strengthRatio = balance.ourSharedStrength /
                        Math.max(balance.theirSharedStrength, 1);

  // FUN_0055cbd5 line ~5298: (local_1c << 2) / local_24 < (local_c - patience + 4)
  // Translating: we need 4x strength advantage minus patience offset
  // Simplified: need strengthRatio > (2.0 - 0.5 * militarism)
  const requiredRatio = 2.0 - 0.5 * personality.militarism;
  if (strengthRatio < requiredRatio) return false;

  // Higher difficulty AI is more willing to declare war
  // FUN_0055cbd5 uses difficulty indirectly through patience tables
  const difficultyBonus = difficulty * 0.05; // 0.0 to 0.25

  // Random check: 30% base chance, modified by personality and difficulty
  // The original uses `_rand()` checks scattered throughout; we simplify
  // to a single probabilistic gate per turn
  const warChance = 0.2 + 0.1 * personality.militarism + difficultyBonus;
  if (Math.random() > warChance) return false;

  return true;
}

// ═══════════════════════════════════════════════════════════════════
// 3. shouldProposePeace — Port of FUN_0055d8d8 peace path
//
// From the decompiled main diplomacy function, peace is proposed when:
//   - Currently at war
//   - FUN_0055cbd5 returns 0 (can't sustain war) for BOTH sides
//   - OR one side has wonder protection (Great Wall / United Nations)
//   - OR patience threshold exceeded (long war)
//   - Contact frequency: (turn + civ1 + civ2) % 4 == 0 OR first contact
// ═══════════════════════════════════════════════════════════════════

function shouldProposePeace(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty !== 'war') return false; // only propose peace when at war

  const personality = getPersonality(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;

  // Contact frequency gate from FUN_0055d8d8 ~5663:
  //   (DAT_00655af8 + param_2 + param_1 & 3) == 0
  // This means diplomacy runs every 4 turns per pair
  if ((turnNumber + civSlot + targetCiv) % 4 !== 0) return false;

  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);
  const ourTotal = calcMilitaryStrength(gameState, civSlot);
  const theirTotal = calcMilitaryStrength(gameState, targetCiv);
  const strengthRatio = ourTotal / Math.max(theirTotal, 1);

  // Great Wall (wonder 6) / United Nations (wonder 24) provide diplomatic shield
  // From FUN_0055d8d8 ~5668-5676: hasWonder(target, 6) or hasWonder(target, 0x18)
  // forces peace consideration even if militarily strong
  const targetHasGreatWall = hasWonderEffect(gameState, targetCiv, 6);
  const targetHasUN = hasWonderEffect(gameState, targetCiv, 24);
  const weHaveGreatWall = hasWonderEffect(gameState, civSlot, 6);
  const weHaveUN = hasWonderEffect(gameState, civSlot, 24);

  // FUN_0055d8d8 ~5668: if FUN_0055cbd5 returns 0 (can't declare war)
  // for BOTH sides, they make peace. Approximate this:
  let shouldPeace = false;

  // Their military > 1.5x ours on shared continents — we're losing
  if (balance.weakCount > 0 && balance.dominantCount === 0) {
    shouldPeace = true;
  }

  // Overall strength deficit
  if (strengthRatio < 0.67) {
    shouldPeace = true;
  }

  // Treasury very low — can't sustain war
  // From FUN_0045705e: treasury checks against tribute thresholds
  if (treasury < 50) {
    shouldPeace = true;
  }

  // Peaceful leaders propose peace more readily
  if (personality.militarism < 0 && strengthRatio < 1.2) {
    shouldPeace = true;
  }

  // Long war without advantage (approximate: use turn parity check)
  // FUN_0055d8d8 ~5510-5514: checks if more than 15 turns since last contact
  // We approximate with war front fatigue
  const warCount = countWars(gameState, civSlot);
  if (warCount > 1 && strengthRatio < 1.5) {
    shouldPeace = true;
  }

  // Wonder-protected targets — forcing peace
  if (targetHasGreatWall || targetHasUN) {
    shouldPeace = true;
  }

  // Don't propose if we clearly dominate — FUN_0055cbd5 would return 1
  // meaning we SHOULD be fighting
  if (balance.dominantCount > 0 && balance.weakCount === 0 && strengthRatio > 2.0) {
    // Unless we have Great Wall/UN forcing pacifism
    if (!weHaveGreatWall && !weHaveUN) {
      shouldPeace = false;
    }
  }

  // Aggressive leaders are less willing to propose peace
  if (personality.militarism > 0 && strengthRatio > 1.0) {
    shouldPeace = false;
  }

  // Don't propose peace to civs with very negative attitude (< -50)
  const attitude = getAttitude(gameState, civSlot, targetCiv);
  if (attitude < -50 && strengthRatio > 0.8) {
    shouldPeace = false;
  }

  return shouldPeace;
}

// ═══════════════════════════════════════════════════════════════════
// 4. shouldDemandTribute — Port of FUN_0045705e tribute logic
//
// FUN_0045705e at ~3574-3679 computes DAT_0064b0ec (tribute demand)
// and DAT_0064b118 (tech desire). Tribute is demanded when:
//   - Not at war (already have contact)
//   - We're militarily dominant
//   - Target has enough treasury to be worth demanding
//   - Contact frequency allows it (every ~6+ turns per pair)
//   - Leader patience modulates amount
// ═══════════════════════════════════════════════════════════════════

function shouldDemandTribute(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty === 'war') return null; // can't demand from enemies

  const turnNumber = gameState.turn?.number ?? 0;
  const difficulty = getDifficultyIndex(gameState, civSlot);
  const personality = getPersonality(gameState, civSlot);

  // FUN_0055d685 at ~5442: check if last demand was less than 6 turns ago
  //   (DAT_0064ca82[target][us] - currentTurn) < 6 → too recent
  // We approximate with modular turn check
  if ((turnNumber + civSlot * 3 + targetCiv) % 10 !== 0) return null;

  // Peaceful leaders rarely demand tribute
  if (personality.militarism < 0 && Math.random() > 0.33) return null;

  // Military comparison
  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);
  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const theirStr = calcMilitaryStrength(gameState, targetCiv);
  let ratio = ourStr / Math.max(theirStr, 1);

  // Tech desire: check what techs the target has that we don't
  // This increases our motivation to demand tribute
  let techDesire = 0;
  const ourTechs = gameState.civTechs?.[civSlot];
  const theirTechs = gameState.civTechs?.[targetCiv];
  if (ourTechs && theirTechs) {
    for (const tid of theirTechs) {
      if (!ourTechs.has(tid)) techDesire++;
    }
  }
  // If they have desirable techs, lower the effective military threshold
  if (techDesire > 3) ratio += 0.3;

  // Need military advantage — FUN_0045705e uses complex per-continent
  // calculations; we simplify to a 1.5x threshold
  if (ratio < 1.5) return null;

  // Check target treasury
  const theirTreasury = gameState.civs?.[targetCiv]?.treasury ?? 0;
  if (theirTreasury < 100) return null; // not worth demanding

  // FUN_0045705e ~3679: DAT_0064b0ec / ((patience - 1) / 2 + 1)
  // Higher patience = lower demand divisor = higher effective demand
  const patience = gameState.civs?.[civSlot]?.patience ?? 3;
  const patienceDivisor = Math.floor((patience) / 2) + 1;

  // Amount: 10% of their treasury, scaled by difficulty and our dominance
  // FUN_0045705e: tribute = (difficulty + 1) * tech_desire / 32, clamped
  let amount = Math.floor(theirTreasury * 0.1);
  amount = Math.floor(amount * (difficulty + 1) / patienceDivisor);
  amount = Math.max(25, Math.min(200, amount));

  // Aggressive leaders demand more
  if (personality.militarism > 0) amount = Math.min(200, Math.floor(amount * 1.5));

  // FUN_0055d685 ~5446: barbarian-like civs have 1-in-3 random gate
  // We apply a general random check for less aggressive leaders
  if (personality.militarism <= 0 && Math.random() > 0.5) return null;

  return { targetCiv, amount };
}

// ═══════════════════════════════════════════════════════════════════
// 5. shouldBreakAlliance — Alliance maintenance logic
//
// From FUN_0055d8d8 ~5746-5793: break alliance if:
//   - Allied civ is at war with multiple of our other allies
//   - A stronger third party threatens us and allied civ won't help
//   - Power ranking divergence (one civ is #7 and other is below #4)
// ═══════════════════════════════════════════════════════════════════

function shouldBreakAlliance(civSlot, targetCiv, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty !== 'alliance') return false;

  const personality = getPersonality(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;

  // Only consider breaking alliances occasionally
  if ((turnNumber + civSlot + targetCiv * 2) % 8 !== 0) return false;

  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const theirStr = calcMilitaryStrength(gameState, targetCiv);

  // FUN_0055d8d8 ~5749-5756: power ranking check
  // If allied civ is drastically weaker and we're the top power,
  // the alliance may not serve our interests
  const ourCities = countCities(gameState, civSlot);
  const theirCities = countCities(gameState, targetCiv);

  // Check if ally is dragging us into unwanted wars
  // FUN_0055d8d8 ~5760-5793: for each third civ, check if ally's wars
  // conflict with our other alliances
  let conflictCount = 0;
  const civs = gameState.civs;
  if (civs) {
    for (let k = 1; k < civs.length; k++) {
      if (k === civSlot || k === targetCiv) continue;
      if (!(gameState.civsAlive & (1 << k))) continue;

      const theirRelation = getTreaty(gameState, targetCiv, k);
      const ourRelation = getTreaty(gameState, civSlot, k);

      // Ally is at war with someone we're at peace with
      if (theirRelation === 'war' && ourRelation !== 'war') {
        conflictCount++;
      }
    }
  }

  // Break if too many conflicts and we're not aggressive
  if (conflictCount >= 2 && personality.militarism <= 0) return true;

  // Break if ally has become very weak (liability)
  if (theirStr * 4 < ourStr && theirCities <= 1) return true;

  return false;
}

// ═══════════════════════════════════════════════════════════════════
// 6. processFirstContact — Initial treaty establishment
//
// From FUN_0055d8d8 ~5656-5660: on first contact (treaty flag bit 0
// not set), establish initial ceasefire via FUN_00467825 with flags
// 0x4000 (recent contact) and 0x401 (met + ceasefire).
// ═══════════════════════════════════════════════════════════════════

function processFirstContact(civSlot, targetCiv, gameState) {
  // If no treaties object exists, there's nothing to check
  if (!gameState.treaties) return null;

  const key = civSlot < targetCiv ? `${civSlot}-${targetCiv}` : `${targetCiv}-${civSlot}`;
  const current = gameState.treaties[key];

  // If there's already a treaty entry, this isn't first contact
  if (current !== undefined) return null;

  // First contact: propose ceasefire
  // In original Civ2, first contact always establishes ceasefire
  // unless scenario flags override this
  return { type: 'PROPOSE_TREATY', targetCiv, treaty: 'ceasefire' };
}

// ═══════════════════════════════════════════════════════════════════
// 7. Respond to pending treaty proposals
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to any unresolved treaty proposals addressed to this civ.
 *
 * Ported acceptance logic from FUN_0045705e attitude scoring:
 *   - Base attitude from DAT_0064b114 (historical relations)
 *   - Modified by alliance status, hatred, strength ratio
 *   - Thresholds: attitude < 26 → halve willingness,
 *                 attitude < 4 (hostile) → reduce further,
 *                 attitude > 74 → boost willingness
 */
function respondToTreatyProposals(gameState, mapBase, civSlot, continentData) {
  const actions = [];
  const proposals = gameState.treatyProposals;
  if (!proposals) return actions;

  const personality = getPersonality(gameState, civSlot);

  for (let i = 0; i < proposals.length; i++) {
    const p = proposals[i];
    if (!p || p.resolved || p.to !== civSlot) continue;

    const balance = evaluateMilitaryBalance(
      civSlot, p.from, continentData, gameState);
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const theirStr = calcMilitaryStrength(gameState, p.from);
    const ratio = ourStr / Math.max(theirStr, 1);
    const warCount = countWars(gameState, civSlot);

    let accept = false;

    // Accept peace/ceasefire if:
    // - They're stronger or roughly equal (ratio < 1.5)
    // - We're fighting on multiple fronts
    // - We're weak on shared continents
    // - Peaceful personality
    if (ratio < 1.5) accept = true;
    if (warCount > 1) accept = true;
    if (balance.weakCount > 0) accept = true;
    if (personality.militarism < 0) accept = true;

    // Reject if we clearly dominate and are aggressive
    if (ratio > 2.0 && balance.dominantCount > 0 && personality.militarism > 0) {
      accept = false;
    }

    const action = { type: 'RESPOND_TREATY', proposalIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) actions.push(action);
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 8. Respond to pending tribute demands
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to unresolved tribute demands.
 *
 * From FUN_0045705e: acceptance based on military ratio and attitude.
 * Accept if demander is much stronger (>2x) and we can afford it,
 * or if we have Great Wall/UN wonder protection and prefer diplomacy.
 */
function respondToTributeDemands(gameState, mapBase, civSlot, continentData) {
  const actions = [];
  const demands = gameState.tributeDemands;
  if (!demands) return actions;

  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  const personality = getPersonality(gameState, civSlot);

  for (let i = 0; i < demands.length; i++) {
    const d = demands[i];
    if (!d || d.resolved || d.to !== civSlot) continue;

    const balance = evaluateMilitaryBalance(
      civSlot, d.from, continentData, gameState);
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const theirStr = calcMilitaryStrength(gameState, d.from);
    const ratio = theirStr / Math.max(ourStr, 1);

    let accept = false;

    // Accept if they're much stronger (>2x) and we can afford it
    if (ratio > 2 && treasury >= d.amount) accept = true;

    // Peaceful leaders accept more readily
    if (ratio > 1.5 && personality.militarism < 0 && treasury >= d.amount) {
      accept = true;
    }

    // If we're weak on their continent, pay up
    if (balance.weakCount > 0 && balance.dominantCount === 0 && treasury >= d.amount) {
      accept = true;
    }

    // Never accept if it would bankrupt us (leave < 20% treasury)
    if (treasury - d.amount < treasury * 0.2) accept = false;

    // Aggressive leaders never accept unless truly desperate
    if (personality.militarism > 0 && ratio < 3) accept = false;

    const action = { type: 'RESPOND_DEMAND', demandIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) actions.push(action);
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// Combined entry point
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate all diplomacy-related actions for an AI turn.
 *
 * Evaluation order follows FUN_0055d8d8's priority:
 *   1. Respond to incoming proposals/demands (time-sensitive)
 *   2. Check for war declarations (most impactful proactive move)
 *   3. Check for peace proposals (urgent if losing)
 *   4. Check for tribute demands (opportunistic)
 *   5. Check for alliance breaks (rare)
 *
 * Uses per-continent military analysis ported from FUN_0055cbd5's
 * strength comparison loops across shared continents.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @returns {Array<object>}
 */
export function generateDiplomacyActions(gameState, mapBase, civSlot, debugLog = null) {
  const actions = [];

  try {
    // Compute continent-based military data once for all evaluations
    const continentData = computeContinentData(gameState, mapBase);

    // ── 1. Respond to incoming proposals/demands first ──
    const treatyResponses = respondToTreatyProposals(
      gameState, mapBase, civSlot, continentData);
    actions.push(...treatyResponses);

    const demandResponses = respondToTributeDemands(
      gameState, mapBase, civSlot, continentData);
    actions.push(...demandResponses);

    // ── 2. Proactive diplomacy: iterate all alive civs ──
    const civs = gameState.civs;
    if (!civs) return actions;

    let declaredWar = false;

    for (let i = 1; i < civs.length; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;

      // (#16) First contact: establish ceasefire with personality-based initial attitude
      if (!haveContact(gameState, civSlot, i)) {
        const firstContactAction = processFirstContact(civSlot, i, gameState);
        if (firstContactAction) {
          const err = validateAction(gameState, mapBase, firstContactAction, civSlot);
          if (!err) {
            actions.push(firstContactAction);
            // Set initial attitude based on leader personalities
            const ourPers = getPersonality(gameState, civSlot);
            const theirPers = getPersonality(gameState, i);
            let initialDelta = 0;
            if (ourPers.militarism < 0) initialDelta += 10;        // we're peaceful
            if (theirPers.militarism < 0) initialDelta += 5;       // they're peaceful
            if (ourPers.militarism > 0 && theirPers.militarism > 0) {
              initialDelta -= 10; // two aggressive civs start wary
            }
            if (initialDelta !== 0) {
              actions.push(makeAttitudeAction(civSlot, i, initialDelta));
            }
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} makes first contact with ${targetName}, attitude=${initialDelta}`);
            }
          }
        }
        continue; // no further diplomacy until next turn
      }

      // 2a. War declarations (most impactful)
      // Only one war declaration per turn (from FUN_0055d8d8 behavior)
      if (!declaredWar && shouldDeclareWar(civSlot, i, continentData, gameState)) {
        const action = { type: 'DECLARE_WAR', targetCiv: i };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          // War declaration worsens attitudes
          actions.push(makeAttitudeAction(civSlot, i, -40));
          actions.push(makeAttitudeAction(i, civSlot, -40));
          declaredWar = true;
          if (debugLog) {
            const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
            const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
            const ourStr = calcMilitaryStrength(gameState, civSlot);
            const theirStr = calcMilitaryStrength(gameState, i);
            const ratio = (ourStr / Math.max(theirStr, 1)).toFixed(1);
            debugLog.push(`DIPLO: ${civName} declares war on ${targetName}: military ratio=${ratio}`);
          }
        }
      }

      // 2b. Peace proposals (urgent if losing)
      if (shouldProposePeace(civSlot, i, continentData, gameState)) {
        // Don't propose if already have a pending proposal
        const hasPending = gameState.treatyProposals?.some(
          p => p.from === civSlot && p.to === i && !p.resolved
        );
        if (!hasPending) {
          // Propose ceasefire if severely losing, peace otherwise
          const ourStr = calcMilitaryStrength(gameState, civSlot);
          const theirStr = calcMilitaryStrength(gameState, i);
          const ratio = ourStr / Math.max(theirStr, 1);
          const treatyType = ratio < 0.5 ? 'ceasefire' : 'peace';

          const action = { type: 'PROPOSE_TREATY', targetCiv: i, treaty: treatyType };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            // Peace proposal improves attitude
            actions.push(makeAttitudeAction(civSlot, i, +20));
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} proposes ${treatyType} to ${targetName}`);
            }
          }
        }
      }

      // 2c. Tribute demands (opportunistic)
      const tribute = shouldDemandTribute(civSlot, i, continentData, gameState);
      if (tribute) {
        // Check for pending demands
        const hasPending = gameState.tributeDemands?.some(
          d => d.from === civSlot && d.to === i && !d.resolved
        );
        if (!hasPending) {
          const action = { type: 'DEMAND_TRIBUTE', targetCiv: tribute.targetCiv,
                           amount: tribute.amount };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            break; // only one demand per turn
          }
        }
      }

      // 2d. Alliance breaks (rare)
      if (shouldBreakAlliance(civSlot, i, gameState)) {
        const action = { type: 'DECLARE_WAR', targetCiv: i };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err && !declaredWar) {
          actions.push(action);
          declaredWar = true;
        }
      }
    }

  } catch (err) {
    console.error(`[diplomai] Error for civ ${civSlot}:`, err);
  }

  return actions;
}
