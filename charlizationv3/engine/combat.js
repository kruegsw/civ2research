// ═══════════════════════════════════════════════════════════════════
// combat.js — Combat resolution (shared: server + client)
//
// Implements Civ2's combat system: round-by-round probabilistic
// resolution with terrain/fortification/veteran modifiers.
//
// Phase B.1: calcUnitDefenseStrength, calcStackBestDefender
// Phase B.2: Palace/small-city/Great Wall double-roll, amphibious
//            attack, barbarian kill ransom (leaders only), treaty
//            violation flags, sneak attack ×2
//
// Special unit interactions ported from decompiled FUN_00580341:
//   - Aegis Cruiser defense bonus vs air/missile attacks (flags bit 14)
//   - Air vs unarmed ships: halved defense, FP capped to 1
//   - Sea vs land: FP capped to 1 for both sides
//   - Caught in port: sea unit on land → attacker FP ×2, defender FP = 1
//   - City Walls: attacker FP = 1 for land attackers (not wall-negating)
//   - Siege units defending: FP forced to 1 (Catapult/Cannon/Artillery/Howitzer)
//   - Helicopter vs Fighter: defender (helicopter) FP = 1
//   - Partisans vs unarmed: ×8 attack multiplier
//   - Partial movement attack penalty (fractional MP)
//   - Palace / small-city / Great Wall double-roll mechanic for defenders
//   - Palace: halves barbarian attack (separate from double-roll)
//   - Great Wall: halves barbarian attack, doubles attack vs barbarians
//   - Sneak attack: ×2 attack bonus when breaking treaties
//   - Amphibious attack: ×2 defender FP when attacking from ship
//   - Barbarian kill ransom: difficultyLevel × 50 gold (leader units only)
//   - Difficulty scaling: AI attack halved on Chieftain/Warlord vs human,
//     human attack doubled on Chieftain vs AI
//   - Barbarian difficulty: continuous (diffIdx+1)/4 formula
//   - Barbarian attack halved vs AI (non-human) defenders
//   - Barbarian attack zeroed vs cities with reputation < 2
//   - Barbarian diplomat/spy defense halved
//   - Coastal Fortress: ×4 defense for sea units in city
//   - Single-round combat option (scenario flag)
//   - Fortress: no stack retreat (stack wipe on defeat)
//   - Pikeman bonus: +1 tiebreaker in defender selection only
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, UNIT_ROLE, UNIT_MOVE_POINTS,
  UNIT_DESTROYED_AFTER_ATTACK, TERRAIN_DEFENSE, MOVEMENT_MULTIPLIER,
  UNIT_PIKEMAN_BONUS, UNIT_AEGIS_BONUS, UNIT_ANTI_AIR,
  UNIT_SUBMARINE, DIFFICULTY_KEYS, UNIT_FUEL, UNIT_NEGATES_WALLS,
} from './defs.js';
import { hasWonderEffect, civHasWonder } from './utils.js';

// Diplomat/Spy unit types — barbarian versions get halved defense (#55)
const DIPLOMAT_SPY_TYPES = new Set([46, 47]);

// Siege units: FP forced to 1 when defending (Catapult=23, Cannon=24, Artillery=25, Howitzer=26)
const SIEGE_DEFENDING_FP1 = new Set([23, 24, 25, 26]);

// ═══════════════════════════════════════════════════════════════════
// Stack Property Summation (ported from block 0x005B sum_stack_property)
// ═══════════════════════════════════════════════════════════════════

/**
 * Sum a property across all units at a given tile owned by a specific player.
 * Ported from decompiled FUN_005Bxxxx (sum_stack_property).
 *
 * @param {object} state - game state { units }
 * @param {number} gx - tile grid X
 * @param {number} gy - tile grid Y
 * @param {number} owner - civ slot to filter by
 * @param {number} mode - property to sum:
 *   0 = count units
 *   1 = sum attack values (UNIT_ATK)
 *   2 = sum defense values (UNIT_DEF)
 *   3 = sum current HP (maxHP - damage)
 * @returns {number} the summed value
 */
export function sumStackProperty(state, gx, gy, owner, mode) {
  let sum = 0;
  for (const u of state.units) {
    if (u.gx !== gx || u.gy !== gy || u.gx < 0) continue;
    if (u.owner !== owner) continue;
    switch (mode) {
      case 0: // count
        sum += 1;
        break;
      case 1: // attack
        sum += (UNIT_ATK[u.type] || 0);
        break;
      case 2: // defense
        sum += (UNIT_DEF[u.type] || 0);
        break;
      case 3: // current HP
        sum += Math.max(1, (UNIT_HP[u.type] || 1) - (u.movesRemain || 0));
        break;
    }
  }
  return sum;
}

// ═══════════════════════════════════════════════════════════════════
// B.1 — Defense Calculation (ported from FUN_0057e33a)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate full defense strength for a unit with all modifiers.
 * Ported from decompiled FUN_0057e33a (calc_unit_defense_strength).
 *
 * @param {object} unit - { type, veteran, movesRemain, owner, orders }
 * @param {number} terrain - terrain type at defender's tile (0-10)
 * @param {boolean} inCity - unit is in a city
 * @param {boolean} hasWalls - city has City Walls (building 8) or Great Wall wonder
 * @param {boolean} hasFortress - tile has a fortress improvement
 * @param {boolean} onRiver - tile has a river
 * @param {object} [cityBuildings] - Set of building IDs in defending city (optional)
 * @param {number} [attackerType] - attacker's unit type (-1 or undefined if none)
 * @param {object} [gameState] - game state (for wonder checks)
 * @returns {number} effective defense value (fixed-point integer)
 */
export function calcUnitDefenseStrength(unit, terrain, inCity, hasWalls, hasFortress, onRiver, cityBuildings, attackerType, gameState) {
  const defBase = UNIT_DEF[unit.type] || 1;
  const defDomain = UNIT_DOMAIN[unit.type] ?? 0;
  const terrainMul = TERRAIN_DEFENSE[terrain] ?? 2;

  // Base defense: terrain_defense × base_defense × 4
  // River adds +1 to terrain defense multiplier (from pseudocode: (river_bonus + terrain_defense) * base * 4)
  const riverBonus = (onRiver && !inCity) ? 1 : 0;
  let defense = (riverBonus + terrainMul) * defBase * 4;

  // ── Multiplier accumulation (from pseudocode mult starts at 2) ──
  // The pseudocode uses mult/2 applied at end; we compute it inline.
  const atkDomain = (attackerType != null && attackerType >= 0) ? (UNIT_DOMAIN[attackerType] ?? 0) : -1;

  // Fortification: mult goes from 2 to 3 (×1.5) for land units
  if (unit.orders === 'fortified' && defDomain === 0) {
    defense = Math.floor(defense * 3 / 2);
  }

  // Fortress: ×2 (mult goes to 4) — only if not in a city
  // Binary: fortress ignored when attacker domain == air (1)
  if (hasFortress && !inCity) {
    if (attackerType == null || attackerType < 0 || atkDomain !== 1) {
      defense *= 2;
    }
  }

  // City walls / Great Wall: ×3 for ground-domain defenders vs ground-domain attackers only
  // Binary: walls multiplier only applied for ground defenders, and only vs ground attackers
  if (inCity && hasWalls && defDomain === 0) {
    if (attackerType == null || attackerType < 0 || atkDomain === 0) {
      defense *= 3;
    }
  }

  // Great Wall wonder: acts as City Walls for defense (passed in via hasWalls param).
  // Great Wall's barbarian-specific effects (halve/double attack) are in resolveCombat.

  // Defensive building bonuses (city buildings)
  if (inCity && cityBuildings) {
    // Coastal Fortress (building 28): ×2 defense vs naval attackers when defender is NOT sea domain
    // Binary: attacker domain == sea AND defender domain != sea AND city has Coastal Fortress
    if (cityBuildings.has(28) && atkDomain === 2 && defDomain !== 2) defense *= 2;
    // Coastal Fortress (#53): ×4 defense for sea-domain defenders in city with Coastal Fortress
    // Binary: sea units in a city with Coastal Fortress get quadruple defense multiplier
    if (cityBuildings.has(28) && defDomain === 2) defense *= 4;
    // SAM Battery (building 27): ×2 defense vs ALL air domain attackers (no missile exclusion)
    // Binary: attacker domain == air AND city has SAM Battery
    if (cityBuildings.has(27) && atkDomain === 1) {
      defense *= 2;
    }
    // SDI Defense (building 17): ×2 defense vs missiles with attack < 99
    // Binary: attacker domain == air AND flagsB 0x10 (missile) AND attacker attack < 99
    // Nuclear missiles (attack=99) bypass SDI
    if (cityBuildings.has(17) && attackerType != null && attackerType >= 0 &&
        UNIT_DESTROYED_AFTER_ATTACK.has(attackerType) && (UNIT_ATK[attackerType] || 0) < 99) {
      defense *= 2;
    }
  }

  // ── Barbarian diplomat/spy defense halving (#55) ──────────────
  // Binary: barbarian diplomat/spy types have their defense halved
  if (unit.owner === 0 && DIPLOMAT_SPY_TYPES.has(unit.type)) {
    defense = Math.floor(defense / 2);
  }

  // ── Veteran bonus: ×1.5 ──
  if (unit.veteran) {
    defense = defense + Math.floor(defense / 2);
  }

  return defense;
}

// ═══════════════════════════════════════════════════════════════════
// B.1 — Best Defender Selection (ported from FUN_0057e6e2)
// ═══════════════════════════════════════════════════════════════════

/**
 * Find the best defender on a tile against a specific attacker.
 * Ported from decompiled FUN_0057e6e2 (calc_stack_best_defender).
 *
 * @param {number} gx - tile grid X
 * @param {number} gy - tile grid Y
 * @param {number} attackerType - attacker's unit type (for modifier calculation)
 * @param {object} state - game state { units, cities, wonders, civTechs, ... }
 * @param {object} mapBase - map data { getTerrain, getImprovements, hasRiver, mw, mh }
 * @returns {number} index of best defender in state.units, or -1 if none found
 */
export function calcStackBestDefender(gx, gy, attackerType, state, mapBase) {
  const terrain = mapBase.getTerrain(gx, gy);
  const imp = mapBase.getImprovements(gx, gy);
  const hasFortress = !!(imp && imp.fortress);
  const onRiver = !!(mapBase.hasRiver && mapBase.hasRiver(gx, gy));

  // Find the city at this tile (for walls/buildings)
  const city = state.cities.find(c => c.gx === gx && c.gy === gy);
  const inCity = !!city;
  const cityBuildings = city ? city.buildings : null;

  // Determine if city has walls (building 8) or defender's civ has Great Wall (wonder 6)
  // We need to check per-unit owner for Great Wall, but city walls apply to all defenders in city
  const cityHasWallsBuilding = inCity && city.buildings && city.buildings.has(8);

  const atkDomain = UNIT_DOMAIN[attackerType] ?? 0;

  // ── Gap 41: HP weighting gated on simplifiedCombat flag ──
  // Binary FUN_0057e6e2: HP-ratio weighting only applied when DAT_00655ae8 & 0x10 is set.
  // This flag corresponds to the "Simplified Combat" game option.
  // Default to true for standard games (flag is set by default in binary: initial flags = 0x3F).
  const useHpWeighting = state.simplifiedCombat !== false;

  let bestScore = -1;
  let bestIdx = -1;

  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx !== gx || u.gy !== gy || u.gx < 0) continue;

    const unitDomain = UNIT_DOMAIN[u.type] ?? 0;

    // Skip land units on ocean (domain 0 on terrain 10)
    if (terrain === 10 && unitDomain === 0) continue;

    // Great Wall check per defender's civ
    const defHasWalls = cityHasWallsBuilding || (inCity && hasWonderEffect(state, u.owner, 6));

    // Compute raw defense strength
    let score = calcUnitDefenseStrength(u, terrain, inCity, defHasWalls, hasFortress, onRiver, cityBuildings, attackerType, state);

    // ── HP ratio weighting (from binary FUN_0057e6e2: DAT_00655ae8 & 0x10) ──
    // Only apply when simplifiedCombat flag is set (standard default).
    // When disabled (scenario override), raw defense score is used without HP adjustment.
    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    const curHp = maxHp - (u.movesRemain || 0);
    if (curHp <= 0) continue;
    if (useHpWeighting) {
      score = Math.floor(score * curHp / maxHp);
    }

    // ── Pikeman/scramble bonus in defender selection ──
    // Binary: flagsB 0x04 gives +1 tiebreaker (not ×2, not limited to mounted)
    if (UNIT_PIKEMAN_BONUS.has(u.type)) {
      score += 1;
    }

    // ── B.2: Anti-air bonus vs air/missile attackers (flagsB 0x20) ──
    if (UNIT_ANTI_AIR.has(u.type) && atkDomain === 1) {
      if (UNIT_DESTROYED_AFTER_ATTACK.has(attackerType)) {
        score *= 5; // vs missiles
      } else {
        score *= 3; // vs air
      }
    }

    // ── Submarine: ×2 defender score vs air attackers ──
    // Binary FUN_0057e6e2: submarine flag + attacker domain == air → score ×2
    if (UNIT_SUBMARINE.has(u.type) && atkDomain === 1) {
      score *= 2;
    }

    if (score >= bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  return bestIdx;
}

// ═══════════════════════════════════════════════════════════════════
// Combat Resolution (enhanced from original + B.2 gap fills)
// ═══════════════════════════════════════════════════════════════════

/**
 * Resolve combat between an attacker and defender.
 *
 * @param {object} attacker - { type, veteran, movesRemain, owner, gx, gy }
 * @param {object} defender - { type, veteran, movesRemain, owner, orders }
 * @param {number} defTerrain - terrain type at defender's tile (0-10)
 * @param {boolean} defInCity - defender is in a city
 * @param {boolean} defCityHasWalls - city has City Walls building
 * @param {boolean} defHasFortress - tile has a fortress improvement
 * @param {boolean} defOnRiver - tile has a river
 * @param {object} [defCityBuildings] - Set of building IDs in defending city (optional)
 * @param {number} [extraSeed=0] - extra entropy for PRNG (e.g. turn number, positions, state version)
 * @param {string} [difficulty] - game difficulty level ('chieftain'|'warlord'|'prince'|'king'|'emperor'|'deity')
 * @param {number} [atkMovesLeft] - attacker's remaining movement thirds this turn
 * @param {object} [opts] - additional options:
 *   @param {boolean} [opts.amphibious] - true if attacker is attacking from a ship (amphibious assault)
 *   @param {boolean} [opts.defenderHasGreatWall] - true if defender's civ has active Great Wall wonder
 *   @param {boolean} [opts.attackerHasGreatWall] - true if attacker's civ has active Great Wall wonder
 *   @param {boolean} [opts.sneakAttack] - true if attacker is breaking a treaty (×2 attack bonus)
 *   @param {boolean} [opts.defCityHasPalace] - true if defending city has Palace (building 1)
 *   @param {number}  [opts.defCitySize] - size of defending city (for double-roll: size < 8)
 *   @param {boolean} [opts.treatyViolation] - true if this combat violates a peace treaty/ceasefire
 *   @param {number}  [opts.humanPlayers] - bitmask of human-controlled civs (bit N = civ N is human)
 *   @param {number}  [opts.defenderReputation] - defender civ's reputation score (0-100)
 *   @param {boolean} [opts.singleRoundCombat] - true if scenario uses single-round combat
 * @returns {{ attackerWins: boolean, atkHpLost: number, defHpLost: number,
 *             atkVeteranPromo: boolean, defVeteranPromo: boolean,
 *             rounds: boolean[], atkMaxHp: number, defMaxHp: number,
 *             atkFp: number, defFp: number, atkStartHp: number, defStartHp: number,
 *             submarineRetreated: boolean, barbarianGold: number,
 *             treatyViolation: boolean }}
 */
export function resolveCombat(attacker, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver, defCityBuildings, extraSeed, difficulty, atkMovesLeft, opts) {
  const atkBase = UNIT_ATK[attacker.type] || 1;
  const defBase = UNIT_DEF[defender.type] || 1;

  let atkMaxHp = (UNIT_HP[attacker.type] || 1) * 10;
  let defMaxHp = (UNIT_HP[defender.type] || 1) * 10;
  let atkFp = UNIT_FP[attacker.type] || 1;
  let defFp = UNIT_FP[defender.type] || 1;

  const atkDomain = UNIT_DOMAIN[attacker.type] ?? 0;
  const defDomain = UNIT_DOMAIN[defender.type] ?? 0;
  const atkRole = UNIT_ROLE[attacker.type] ?? 0;
  const defAtk = UNIT_ATK[defender.type] || 0;

  // Extract options
  const amphibious = opts?.amphibious || false;
  const defenderHasGreatWall = opts?.defenderHasGreatWall || false;
  const attackerHasGreatWall = opts?.attackerHasGreatWall || false;
  const sneakAttack = opts?.sneakAttack || false;
  const defCityHasPalace = opts?.defCityHasPalace || false;
  const defCitySize = opts?.defCitySize ?? 0;
  const treatyViolation = opts?.treatyViolation || false;
  const humanPlayers = opts?.humanPlayers ?? 0xFF; // default: all human
  const defenderReputation = opts?.defenderReputation ?? 100;
  const singleRoundCombat = opts?.singleRoundCombat || false;

  // ── Special interaction: Air attack vs unarmed ships ──────────
  // Ported from FUN_00580341 lines 124-129: role 3 (air attack) vs
  // sea-domain defender with 0 attack → halve defense, set defender FP=1.
  // This models helicopters/bombers attacking defenseless transports.
  if (atkRole === 3 && defDomain === 2 && defAtk === 0) {
    defFp = 1;
    // Defense is halved after all other modifiers (applied to effDef below)
  }

  // ── Special interaction: Partisans vs unarmed units ────────────
  // Ported from FUN_00580341 line 183: type 0x09 (Partisans)
  // attacking 0-attack defender → ×8 attack multiplier.
  // Binary checks attacker type == 9 specifically.
  let partisanBonus = false;
  if (attacker.type === 9 && defAtk === 0) {
    partisanBonus = true;
  }

  // Effective attack: base × veteran bonus
  let effAtk = atkBase * 8; // ×8 for fixed-point
  if (attacker.veteran) effAtk += Math.floor(effAtk / 2); // +50% veteran

  // ── Gap 40: On-ship attack bonus (+50%) ──
  // Binary FUN_0057e2c3: unit status flag 0x10 (on_ship) gives +50% attack.
  // In our engine, amphibious flag indicates the unit is attacking from a transport.
  // This bonus partially offsets the amphibious defender FP doubling penalty.
  if (amphibious) {
    effAtk += Math.floor(effAtk / 2);
  }

  // Partisan vs unarmed: ×8 attack multiplier
  if (partisanBonus) {
    effAtk = effAtk << 3;
  }

  // Fractional MP penalty: if attacker has less than 1 full MP, attack is reduced proportionally
  if (atkMovesLeft != null && atkMovesLeft < MOVEMENT_MULTIPLIER && atkMovesLeft > 0) {
    effAtk = Math.floor(effAtk * atkMovesLeft / MOVEMENT_MULTIPLIER);
    if (effAtk < 1) effAtk = 1;
  }

  // ── Effective defense: use calcUnitDefenseStrength (FUN_0057e33a) ──
  // This includes terrain, river, fortification, fortress, walls,
  // Coastal Fortress, SAM Battery, SDI, and veteran bonus.
  // We do NOT re-apply those multipliers here (binary applies them once).
  let effDef = calcUnitDefenseStrength(defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver, defCityBuildings, attacker.type);

  // ── Pikeman bonus vs mounted units (flagsB 0x04) ──────────────
  // Binary FUN_00580341 lines 130-140: defender with pikeman flag gets
  // +50% defense when attacker is a land unit with exactly 2 base movement
  // (mounted units: Horsemen, Knights, Crusaders, Dragoons, Cavalry, etc.)
  // Check: calc_unit_movement_points(atk) == COSMIC_MULTIPLIER * 2
  if (UNIT_PIKEMAN_BONUS.has(defender.type) && atkDomain === 0 &&
      (UNIT_MOVE_POINTS[attacker.type] || 0) === 2) {
    effDef += effDef >> 1; // ×1.5 defense
  }

  // ── B.2: Anti-air defense bonus vs air/missiles (flagsB 0x20) ──
  // Any unit with anti-air flag gets ×3 defense vs non-missile air, ×5 vs missiles.
  if (UNIT_ANTI_AIR.has(defender.type) && atkDomain === 1) {
    if (UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type)) {
      effDef *= 5; // ×5 vs missiles (cruise missile, nuclear missile)
    } else {
      effDef *= 3; // ×3 vs normal air units (fighters, bombers, helicopters)
    }
  }

  // Air vs unarmed ships: halve effective defense (after all other defense mods)
  if (atkRole === 3 && defDomain === 2 && defAtk === 0) {
    effDef = Math.max(1, effDef >> 1);
  }

  // ── B.2: Amphibious attack penalty ──────────────────────────────
  // From FUN_00580341 lines 162-168: when a land unit attacks from a ship
  // (amphibious assault), the defender's firepower is doubled.
  // The attacker doesn't get its attack halved; instead the defender
  // does more damage per hit.
  if (amphibious) {
    defFp *= 2;
  }

  // ── B.3: Air vs land — both FP forced to 1 ──────────────────
  // From FUN_00580341: when an air unit attacks a ground unit,
  // both firepower values are reduced to 1.
  if (atkDomain === 1 && defDomain === 0) {
    atkFp = 1;
    defFp = 1;
  }

  // ── B.1: Sea unit attacks land unit ────────────────────────────
  // From Civ2 mechanics: when a sea unit attacks a land unit,
  // both sides have firepower reduced to 1.
  if (atkDomain === 2 && defDomain === 0) {
    atkFp = 1;
    defFp = 1;
  }

  // ── B.1: Caught in port (sea unit on land) ────────────────────
  // When a non-air unit attacks a sea-domain defender on a non-ocean tile,
  // the attacker's FP is doubled and the defender's FP is reduced to 1.
  // The sea unit is vulnerable when not at sea.
  if (atkDomain !== 1 && defDomain === 2 && defTerrain !== 10) {
    atkFp *= 2;
    defFp = 1;
  }

  // ── B.1: City Walls reduce attacker FP to 1 ──────────────────
  // When a land attacker attacks a city with City Walls, the attacker's
  // firepower is reduced to 1. This means the defender takes less damage
  // per round, making walls effective against high-FP siege units.
  // Howitzer and other wall-negating units are exempt.
  if (defCityHasWalls && atkDomain === 0 && !UNIT_NEGATES_WALLS.has(attacker.type)) {
    atkFp = 1;
  }

  // ── B.1: Siege units have FP=1 when defending ────────────────
  // Catapult (23), Cannon (24), Artillery (25), Howitzer (26) always
  // have their defensive firepower forced to 1. These units are designed
  // as offensive siege weapons, not defensive combatants.
  if (SIEGE_DEFENDING_FP1.has(defender.type)) {
    defFp = 1;
  }

  // ── B.1: Helicopter vs Fighter — defender FP reduced to 1 ────
  // When a fighter (air domain with fuel limit) attacks a helicopter
  // (air domain with no fuel limit), the helicopter's defensive FP is
  // reduced to 1. Helicopters are vulnerable to fighter interception.
  if (atkDomain === 1 && defDomain === 1 && (UNIT_FUEL[attacker.type] || 0) > 0 && !(UNIT_FUEL[defender.type] > 0)) {
    defFp = 1;
  }

  // ── B.2: Sneak attack bonus — ×2 attack when breaking treaties ───
  // From FUN_00580341 line 384: when attacker breaks a peace/ceasefire,
  // their attack power is doubled.
  if (sneakAttack) {
    effAtk *= 2;
  }

  // ── B.2: Palace barbarian attack halving ──────────────────────
  // From FUN_00580341 lines 225-228: when barbarians attack a city with
  // Palace, their attack is halved outright (separate from double-roll).
  if (defCityHasPalace && attacker.owner === 0) {
    effAtk = effAtk >> 1;
  }

  // ── B.2: Great Wall wonder — barbarian-only effects ────────────
  // From FUN_00580341 lines 234-245: Great Wall halves barbarian
  // attacker's attack power; doubles attack when attacking barbarians.
  // NOT a double-roll trigger — Palace/small city handle that.
  if (defenderHasGreatWall && attacker.owner === 0) {
    effAtk = Math.floor(effAtk / 2);
  }
  if (attackerHasGreatWall && defender.owner === 0) {
    effAtk *= 2;
  }

  // ── B.2: Palace / small-city / Great Wall double-roll mechanic ─────
  // From FUN_00580341 lines 225-232, 786-804: bVar18 is set when
  // defending city has Palace (building 1) OR city size < 8 OR
  // defender's civ has Great Wall wonder (#3).
  // When active, attacker wins a round, a second pair of rolls is made.
  // If attacker loses the re-roll, the round is reversed.
  let doubleRoll = false;
  if (defInCity && (defCityHasPalace || (defCitySize > 0 && defCitySize < 8) || defenderHasGreatWall)) {
    doubleRoll = true;
  }

  // ── Difficulty-based combat modifiers ──────────────────────────
  const diffIdx = difficulty ? Math.max(0, DIFFICULTY_KEYS.indexOf(difficulty)) : 0;
  const atkIsHuman = !!(humanPlayers & (1 << attacker.owner));
  const defIsHuman = !!(humanPlayers & (1 << defender.owner));

  if (attacker.owner === 0) {
    // ── Barbarian attack difficulty scaling (#19) ──────────────
    // Binary continuous formula: effAtk = (diffIdx + 1) * effAtk / 4
    // At Prince (idx 2): (2+1)/4 = 75%. At Deity (idx 5): (5+1)/4 = 150%.
    effAtk = Math.floor((diffIdx + 1) * effAtk / 4);

    // ── Halve barbarian attack vs AI defenders (#18) ──────────
    // Binary: barbarians deal half damage to non-human civs
    if (!defIsHuman && defender.owner !== 0) {
      effAtk = Math.floor(effAtk / 2);
    }

    // ── Zero barbarian attack vs cities with defender reputation < 2 (#54) ──
    // Binary: barbarians will not effectively attack cities belonging to
    // civs with reputation score < 2
    if (defInCity && defenderReputation < 2) {
      effAtk = 0;
    }
  } else if (defender.owner === 0) {
    // ── Non-barbarian difficulty scaling for attacker vs barbarian defender (#1) ──
    // Chieftain: human attacker gets ×2 attack against barbarians
    if (atkIsHuman && diffIdx === 0) {
      effAtk *= 2;
    }
  }

  // ── Non-barbarian AI vs human difficulty scaling (#1) ──────────
  // Chieftain/Warlord: AI attack halved when attacking human defenders
  // Chieftain: human attack doubled when attacking AI defenders
  if (attacker.owner !== 0 && defender.owner !== 0) {
    if (!atkIsHuman && defIsHuman) {
      // AI attacking human
      if (diffIdx <= 1) { // Chieftain or Warlord
        effAtk = Math.floor(effAtk / 2);
      }
    } else if (atkIsHuman && !defIsHuman) {
      // Human attacking AI
      if (diffIdx === 0) { // Chieftain only
        effAtk *= 2;
      }
    }
  }

  // B.1: Attack power clamping — prevent overflow with high-attack endgame units
  // Binary: while (attack > 3999) { attack >>= 1; defense >>= 1; }
  while (effAtk > 3999) {
    effAtk >>= 1;
    effDef >>= 1;
  }

  // Ensure minimums
  if (effAtk < 1) effAtk = 1;
  if (effDef < 1) effDef = 1;

  // Current HP — movesRemain is already in internal HP scale (UNIT_HP * 10)
  let atkHp = atkMaxHp - (attacker.movesRemain || 0);
  let defHp = defMaxHp - (defender.movesRemain || 0);
  if (atkHp <= 0) atkHp = 10;
  if (defHp <= 0) defHp = 10;

  const atkStartHp = atkHp;
  const defStartHp = defHp;

  // ── Submarine retreat removed from combat loop (#132) ──────────
  // Binary does NOT have submarine retreat during combat rounds.
  // Submarine stealth is handled by visibility (subs are invisible to
  // non-detector units), not by mid-combat retreat mechanics.
  let submarineRetreated = false;

  // ── Fortress retreat removed (#20) ────────────────────────────
  // Binary: when attacker wins at a fortress tile (no city), the entire
  // defending stack is killed — there is no retreat mechanic for fortress
  // defenders. The fortress provides its ×2 defense bonus but does NOT
  // grant retreat on defeat. Stack wipe occurs at unprotected tiles,
  // and fortress without a city is treated as unprotected for stack wipe.
  let fortressRetreat = false;

  // Round-by-round combat using pseudo-random sequence.
  // Seed includes unit stats + extraSeed (positions, turn, state version) for varied outcomes.
  let seed = ((attacker.type * 31 + defender.type * 17 + defTerrain * 7 + atkHp + defHp +
    (extraSeed || 0)) & 0x7FFFFFFF) || 1;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF;
    return seed;
  };

  const rounds = []; // true = attacker hit defender, false = defender hit attacker
  while (atkHp > 0 && defHp > 0) {
    // ── Two independent rolls (FUN_00580341 lines 771-785) ────────
    // Binary uses two SEPARATE random rolls, not a single combined roll.
    // attackRoll = rand() % attack; defenseRoll = rand() % defense;
    // attackerWins round when defenseRoll < attackRoll.
    const attackRoll = effAtk > 1 ? (rand() % effAtk) : 0;
    const defenseRoll = effDef > 1 ? (rand() % effDef) : 0;
    let atkHit = defenseRoll < attackRoll;

    // ── B.2: Palace / small-city / Great Wall double-roll mechanic ──
    // From FUN_00580341 lines 786-804: when bVar18 is true (Palace or
    // city size < 8 or Great Wall) and attacker wins a round, a second
    // pair of rolls is made. If attacker LOSES the re-roll, the round
    // is reversed.
    if (doubleRoll && atkHit) {
      const attackRoll2 = effAtk > 1 ? (rand() % effAtk) : 0;
      const defenseRoll2 = effDef > 1 ? (rand() % effDef) : 0;
      if (!(defenseRoll2 < attackRoll2)) {
        atkHit = false; // attacker lost re-roll, reverse result
      }
    }

    rounds.push(atkHit);
    if (atkHit) {
      // Attacker hits — damage = raw firepower (NOT ×10)
      // Binary FUN_00580341 line 807: damage += firepower (no multiplier)
      defHp -= atkFp;
    } else {
      // Defender hits — damage = raw firepower (NOT ×10)
      atkHp -= defFp;
    }

    // ── Single-round combat (#131) ──────────────────────────────
    // Scenario flag: only one round of combat is fought.
    // After the first round, combat ends regardless of HP remaining.
    if (singleRoundCombat) break;
  }

  const attackerWins = atkHp > 0 && defHp <= 0;

  // Single-round draw: both sides survive after one round (#131)
  // Neither side is destroyed; both take their damage and disengage.
  const singleRoundDraw = singleRoundCombat && atkHp > 0 && defHp > 0;

  // HP lost = raw damage taken (internal units, same scale as maxHp = UNIT_HP * 10)
  const atkHpLost = Math.max(0, atkMaxHp - Math.max(0, atkHp));
  const defHpLost = Math.max(0, defMaxHp - Math.max(0, defHp));

  // ── Veteran promotion: strength-weighted probability ─────────────
  // From FUN_00580341 lines 952-976:
  //   Attacker wins: rand() % (attack + defense) <= defense → promote attacker
  //   Defender wins: rand() % (attack + defense) <= attack → promote defender
  // Higher enemy strength = higher promotion chance for the winner.
  // Missile units (flagsB & 0x10 = UNIT_DESTROYED_AFTER_ATTACK) cannot be promoted.
  // Sun Tzu's War Academy (wonder 7) auto-promotes the winner.
  const promoRoll = (effAtk + effDef > 0) ? (rand() % (effAtk + effDef)) : 0;
  const atkCanPromote = !attacker.veteran && !UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type);
  const defCanPromote = !defender.veteran && !UNIT_DESTROYED_AFTER_ATTACK.has(defender.type);
  const attackerSunTzu = opts?.attackerSunTzu || false;
  const defenderSunTzu = opts?.defenderSunTzu || false;
  const atkVeteranPromo = attackerWins && atkCanPromote && (defBase > 0 && promoRoll <= effDef || attackerSunTzu);
  const defVeteranPromo = !attackerWins && !submarineRetreated && defCanPromote && (atkBase > 0 && promoRoll <= effAtk || defenderSunTzu);

  // ── B.2: Barbarian kill ransom (#21) ────────────────────────────
  // From FUN_00580341: gold ransom only awarded for barbarian LEADER
  // units (role > 4), not all barbarian kills. Formula: diffIdx × 50.
  let barbarianGold = 0;
  const defRole = UNIT_ROLE[defender.type] ?? 0;
  if (attackerWins && defender.owner === 0 && attacker.owner > 0 && difficulty && defRole > 4) {
    barbarianGold = diffIdx * 50;
  }

  return { attackerWins, atkHpLost, defHpLost, atkVeteranPromo, defVeteranPromo,
    rounds, atkMaxHp, defMaxHp, atkFp, defFp, atkStartHp, defStartHp,
    effAtk, effDef,
    submarineRetreated, fortressRetreat, singleRoundDraw, barbarianGold, treatyViolation };
}

// ═══════════════════════════════════════════════════════════════════
// Senate Override — Pre-combat check for Republic/Democracy
//
// In Republic and Democracy governments, the Senate can block
// offensive attacks against civs you're at peace with. The UN
// wonder (wonder 24) guarantees senate intervention (always blocks).
//
// This is a pre-combat check, not part of combat resolution itself.
// The caller should check this BEFORE initiating combat and present
// the player with the senate override dialog.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if the Senate will override (block) an attack.
 * Republic and Democracy governments have senate oversight.
 * The United Nations wonder (wonder 24) guarantees senate intervention.
 *
 * @param {object} state - game state
 * @param {number} attackerCiv - civ attempting to attack
 * @returns {boolean} true if senate blocks the attack
 */
export function checkSenateOverride(state, attackerCiv) {
  const govt = state.civs?.[attackerCiv]?.government;
  if (govt !== 'republic' && govt !== 'democracy') return false;
  // UN wonder (wonder 24) always triggers senate intervention
  const hasUN = civHasWonder(state, attackerCiv, 24);
  if (hasUN) return true;
  // Simplified: in full implementation, the senate's decision would
  // depend on attitude toward the target civ and a random roll.
  // For now, return false (senate does not block) as the baseline
  // behavior — the full attitude-based check would require the
  // target civ parameter and attitude lookup.
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// Air Unit Ejection — Kill stranded air units (block 0x005B)
//
// When a city is captured or a carrier is destroyed, any enemy air
// units (domain === 1) at that position are killed — they have no
// base to land at.
// ═══════════════════════════════════════════════════════════════════

/**
 * Eject (kill) all air units at a given position.
 * Air units at a tile lose their base when a city changes hands or
 * a carrier is destroyed. They are killed immediately.
 *
 * @param {object} state - mutable game state (units array)
 * @param {number} gx - tile gx
 * @param {number} gy - tile gy
 * @param {number} [excludeOwner=-1] - civ slot to EXCLUDE (the new owner keeps their air units)
 * @returns {{ ejected: number[], events: object[] }}
 */
export function ejectAirUnits(state, gx, gy, excludeOwner = -1) {
  const ejected = [];
  const events = [];

  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx !== gx || u.gy !== gy || u.gx < 0) continue;
    if ((UNIT_DOMAIN[u.type] ?? 0) !== 1) continue; // air units only
    if (u.owner === excludeOwner) continue; // new owner's air units stay

    // Kill the air unit
    state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
    ejected.push(i);
    events.push({
      type: 'airUnitEjected',
      unitIndex: i,
      unitType: u.type,
      owner: u.owner,
      gx, gy,
    });
  }

  return { ejected, events };
}

// ═══════════════════════════════════════════════════════════════════
// Combat Notification Strings — Dialog keys and AI message IDs
// Binary ref: FUN_00580341 @ block_00580000.c lines 357-577
//
// These are the 8 combat event notification string keys that Civ2
// displays to players during combat resolution. Each maps to a
// GAME.TXT / labels.txt dialog key.
// ═══════════════════════════════════════════════════════════════════

export const COMBAT_NOTIFICATION_STRINGS = {
  SNEAK:          { dialogKey: 'SNEAK',          aiMsgId: 0x2E, note: 'sneak attack (no ceasefire treaty)' },
  BREAKCEASE:     { dialogKey: 'BREAKCEASE',     aiMsgId: 0x2D, note: 'breaks ceasefire treaty' },
  MISSILEATTACK:  { dialogKey: 'MISSILEATTACK',  aiMsgId: 0x2F, note: 'carrier/missile attacks city' },
  PEARLHARBOR:    { dialogKey: 'PEARLHARBOR',    aiMsgId: 0x30, note: 'surprise naval/air attack on city' },
  BATTERY:        { dialogKey: 'BATTERY',        aiMsgId: 0x32, note: 'coastal bombardment (no land attacker)' },
  BATTERY2:       { dialogKey: 'BATTERY2',       aiMsgId: 0x31, note: 'coastal bombardment (with land attacker)' },
  SCRAMBLE:       { dialogKey: 'SCRAMBLE',       aiMsgId: 0x33, note: 'air defense scramble' },
  AMPHIBMOTIZE:   { dialogKey: 'AMPHIBMOTIZE',   aiMsgId: 0x34, note: 'amphibious assault from sea' },
};

// ═══════════════════════════════════════════════════════════════════
// Nuclear / Long-Range Attack Path
// Binary ref: block_00580000.c lines 709-733
//
// When a unit's attack stat > 98, normal combat is skipped and the
// nuclear/missile strike path is taken instead. In standard Civ2,
// only the Nuclear Missile (attack=99) qualifies.
// ═══════════════════════════════════════════════════════════════════

export const NUKE_ATTACK_THRESHOLD = 98; // attack > 98 uses nuclear path @ block_00580000.c:709

// ═══════════════════════════════════════════════════════════════════
// Combat Animation Detail Flags
// Binary ref: DAT_00655aea — controls animation fidelity
// ═══════════════════════════════════════════════════════════════════

export const ANIMATION_FLAGS = {
  DETAILED_NUKE: 0x10,  // @ 0x0057f86b — enables 5.5s pre-delay for nuke animation
};
