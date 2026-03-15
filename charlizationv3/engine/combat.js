// ═══════════════════════════════════════════════════════════════════
// combat.js — Combat resolution (shared: server + client)
//
// Implements Civ2's combat system: round-by-round probabilistic
// resolution with terrain/fortification/veteran modifiers.
//
// Phase B.1: calcUnitDefenseStrength, calcStackBestDefender
// Phase B.2: Great Wall double-roll, amphibious attack, submarine
//            retreat, barbarian kill ransom, treaty violation flags
//
// Special unit interactions ported from decompiled FUN_00580341:
//   - Pikemen double defense vs mounted/horse units (flags bit 13)
//   - Aegis Cruiser defense bonus vs air/missile attacks (flags bit 14)
//   - Air vs unarmed ships: halved defense, FP capped to 1
//   - Air vs land: FP capped to 1 for both sides
//   - Helicopter vs submarines: ×8 attack multiplier
//   - Partial movement attack penalty (fractional MP)
//   - Great Wall wonder: double-roll mechanic for defenders
//   - Amphibious attack: ×2 defender FP when attacking from ship
//   - Submarine retreat: 50% chance to disengage when losing a round
//   - Barbarian kill ransom: difficultyLevel × 50 gold
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_DESTROYED_AFTER_ATTACK, TERRAIN_DEFENSE, MOVEMENT_MULTIPLIER,
  UNIT_PIKEMAN_BONUS, MOUNTED_UNITS, UNIT_AEGIS_BONUS,
  UNIT_SUBMARINE, DIFFICULTY_KEYS,
} from './defs.js';
import { hasWonderEffect } from './utils.js';

// ═══════════════════════════════════════════════════════════════════
// B.1 — Defense Calculation (ported from FUN_0057e33a)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate full defense strength for a unit with all modifiers.
 * Ported from decompiled FUN_0057e33a (calc_unit_defense_strength).
 *
 * @param {object} unit - { type, veteran, hpLost, owner, orders }
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
  if (hasFortress && !inCity) {
    // If attacker is unknown (-1) or attacker is not sea domain: apply fortress
    if (attackerType == null || attackerType < 0 || atkDomain !== 1) {
      defense *= 2;
    }
  }

  // City walls / Great Wall: ×3 vs land attackers (for land-domain defenders)
  if (inCity && hasWalls && defDomain === 0) {
    if (attackerType == null || attackerType < 0 || atkDomain === 0) {
      defense *= 3;
    }
  }

  // Great Wall wonder: ×2 vs land attackers (if defender's civ owns Great Wall)
  // This is SEPARATE from city walls — Great Wall gives both the wall bonus (above,
  // passed in via hasWalls) AND a separate ×2 multiplier applied in resolveCombat.
  // The defense strength function itself does NOT apply the Great Wall ×2;
  // that is handled in resolveCombat via the double-roll mechanic.

  // Defensive building bonuses (city buildings)
  if (inCity && cityBuildings) {
    // Coastal Fortress (building 28): ×2 defense vs naval attackers
    if (cityBuildings.has(28) && atkDomain === 1) defense *= 2;
    // SAM Battery (building 27): ×2 defense vs air attackers (not missiles)
    if (cityBuildings.has(27) && atkDomain === 2 &&
        (attackerType == null || attackerType < 0 || !UNIT_DESTROYED_AFTER_ATTACK.has(attackerType))) {
      defense *= 2;
    }
    // SDI Defense (building 17): ×2 defense vs missiles
    if (cityBuildings.has(17) && attackerType != null && attackerType >= 0 &&
        UNIT_DESTROYED_AFTER_ATTACK.has(attackerType)) {
      defense *= 2;
    }
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

    // ── HP ratio weighting (from pseudocode: game_flags & 0x10) ──
    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    const curHp = maxHp - (u.hpLost || 0) * 10;
    if (curHp <= 0) continue;
    score = Math.floor(score * curHp / maxHp);

    // ── Pikeman bonus vs mounted attackers ──
    if (UNIT_PIKEMAN_BONUS.has(u.type) && MOUNTED_UNITS.has(attackerType)) {
      score *= 2;
    }

    // ── AEGIS bonus vs air/missile attackers ──
    if (UNIT_AEGIS_BONUS.has(u.type) && atkDomain === 2) {
      if (UNIT_DESTROYED_AFTER_ATTACK.has(attackerType)) {
        score *= 5; // vs missiles
      } else {
        score *= 3; // vs air
      }
    }

    // ── Submarine: ×2 score if attacker is also a submarine ──
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
 * @param {object} attacker - { type, veteran, hpLost, owner, gx, gy }
 * @param {object} defender - { type, veteran, hpLost, owner, orders }
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
 *   @param {number}  [opts.barbarianRansom] - gold awarded for killing barbarian (difficultyLevel × 50)
 *   @param {boolean} [opts.treatyViolation] - true if this combat violates a peace treaty/ceasefire
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
  const treatyViolation = opts?.treatyViolation || false;

  // ── Special interaction: Air attack vs unarmed ships ──────────
  // Ported from FUN_00580341 lines 124-129: role 3 (air attack) vs
  // sea-domain defender with 0 attack → halve defense, set defender FP=1.
  // This models helicopters/bombers attacking defenseless transports.
  if (atkRole === 3 && defDomain === 1 && defAtk === 0) {
    defFp = 1;
    // Defense is halved after all other modifiers (applied to effDef below)
  }

  // ── Special interaction: Air vs land ──────────────────────────
  // Ported from FUN_00580341 lines 187-191: when air attacks land,
  // both sides get FP capped to 1 and defender HP capped to 1.
  // This prevents bombers from one-shotting ground units and vice-versa.
  if (atkDomain === 2 && defDomain === 0) {
    atkFp = 1;
    defFp = 1;
    defMaxHp = 10; // cap defender to 1 HP unit equivalent
    atkMaxHp = 10; // cap attacker to 1 HP unit equivalent
  }

  // ── Special interaction: Helicopter vs submarines ─────────────
  // Ported from FUN_00580341 lines 183-186: Helicopter (type 29)
  // attacking 0-attack defender → ×8 attack multiplier.
  // This models helicopter anti-submarine warfare.
  let heliBonus = false;
  if (attacker.type === 29 && defAtk === 0) {
    heliBonus = true;
  }

  // Effective attack: base × veteran bonus
  let effAtk = atkBase * 8; // ×8 for fixed-point
  if (attacker.veteran) effAtk += Math.floor(effAtk / 2); // +50% veteran

  // Helicopter vs submarine: ×8 attack multiplier
  if (heliBonus) {
    effAtk = effAtk << 3;
  }

  // Fractional MP penalty: if attacker has less than 1 full MP, attack is reduced proportionally
  if (atkMovesLeft != null && atkMovesLeft < MOVEMENT_MULTIPLIER && atkMovesLeft > 0) {
    effAtk = Math.floor(effAtk * atkMovesLeft / MOVEMENT_MULTIPLIER);
    if (effAtk < 1) effAtk = 1;
  }

  // Effective defense: base × terrain × veteran × fortification × city/walls/fortress
  const terrainMul = TERRAIN_DEFENSE[defTerrain] ?? 2; // ×50% each
  let effDef = defBase * terrainMul * 4; // ×4 for fixed-point (terrainMul already includes ×2 base)
  if (defender.veteran) effDef += Math.floor(effDef / 2); // +50% veteran

  // Fortification bonus: +50%
  if (defender.orders === 'fortified') {
    effDef += Math.floor(effDef / 2);
  }

  // ── Special interaction: Pikemen double defense vs mounted ────
  // Ported from FUN_00580341 lines 142-150 (pikeman flag bit 13).
  // Pikemen-flagged defenders get ×2 defense vs mounted attackers.
  if (UNIT_PIKEMAN_BONUS.has(defender.type) && MOUNTED_UNITS.has(attacker.type)) {
    effDef *= 2;
  }

  // ── Special interaction: Aegis defense bonus vs air/missiles ──
  // Ported from FUN_00580341: Aegis-flagged defenders (flags bit 14)
  // get ×3 defense vs air-domain attackers and ×5 vs missiles.
  if (UNIT_AEGIS_BONUS.has(defender.type) && atkDomain === 2) {
    if (UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type)) {
      effDef *= 5; // ×5 vs missiles (cruise missile, nuclear missile)
    } else {
      effDef *= 3; // ×3 vs normal air units (fighters, bombers, helicopters)
    }
  }

  // City walls: ×3 vs land and sea attackers (not air)
  if (defCityHasWalls && atkDomain !== 2) {
    effDef *= 3;
  }

  // Fortress: ×2
  if (defHasFortress && !defInCity) {
    effDef *= 2;
  }

  // River bonus: +50% defense
  if (defOnRiver && !defInCity) {
    effDef += Math.floor(effDef / 2);
  }

  // Defensive building bonuses (city buildings)
  if (defInCity && defCityBuildings) {
    // Coastal Fortress (28): ×2 defense vs naval attackers
    if (defCityBuildings.has(28) && atkDomain === 1) effDef *= 2;
    // SAM Battery (27): ×2 defense vs air attackers (not missiles)
    if (defCityBuildings.has(27) && atkDomain === 2 && !UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type)) effDef *= 2;
    // SDI Defense (17): ×2 defense vs missiles
    if (defCityBuildings.has(17) && UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type)) effDef *= 2;
  }

  // Air vs unarmed ships: halve effective defense (after all other defense mods)
  if (atkRole === 3 && defDomain === 1 && defAtk === 0) {
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

  // ── B.2: Great Wall wonder — applied to attack power ────────────
  // From FUN_00580341 lines 179-185: if defender's civ owns Great Wall,
  // barbarian attacker's power is halved; if attacker's civ owns it,
  // attack is doubled vs barbarians. Additionally, Great Wall enables
  // a double-roll mechanic during combat (handled in combat loop below).
  // The defense-doubling effect vs land attackers is already handled
  // through the hasWalls parameter (Great Wall acts as City Walls).
  let greatWallDoubleRoll = false;
  if (defenderHasGreatWall && defInCity && atkDomain === 0) {
    greatWallDoubleRoll = true;
  }

  // Difficulty modifier for barbarian attacks
  if (attacker.owner === 0 && difficulty) {
    if (difficulty === 'emperor') effAtk = Math.floor(effAtk * 5 / 4);   // +25%
    if (difficulty === 'deity') effAtk = Math.floor(effAtk * 3 / 2);     // +50%
    if (difficulty === 'chieftain') effAtk = Math.floor(effAtk / 2);     // -50%
    if (difficulty === 'warlord') effAtk = Math.floor(effAtk * 3 / 4);   // -25%
  }

  // Ensure minimums
  if (effAtk < 1) effAtk = 1;
  if (effDef < 1) effDef = 1;

  // Current HP
  let atkHp = atkMaxHp - (attacker.hpLost || 0) * 10;
  let defHp = defMaxHp - (defender.hpLost || 0) * 10;
  if (atkHp <= 0) atkHp = 10;
  if (defHp <= 0) defHp = 10;

  const atkStartHp = atkHp;
  const defStartHp = defHp;

  // ── B.2: Submarine retreat tracking ─────────────────────────────
  // From FUN_00580341: Submarines (type 41) have a 50% chance to
  // retreat (disengage) each time they lose a combat round.
  const defenderIsSub = UNIT_SUBMARINE.has(defender.type);
  let submarineRetreated = false;

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
    const roll = rand() % (effAtk + effDef);
    let atkHit = roll < effAtk;

    // ── B.2: Great Wall double-roll mechanic ──────────────────────
    // From FUN_00580341 lines 280-286: when Great Wall is active and
    // attacker wins the first roll, a second roll is made. If the
    // defender wins the second roll, the attacker's hit is negated.
    // This effectively gives the defender a "second chance" each round.
    if (greatWallDoubleRoll && atkHit) {
      const roll2 = rand() % (effAtk + effDef);
      if (roll2 >= effAtk) {
        atkHit = false; // defender wins the re-roll, override
      }
    }

    rounds.push(atkHit);
    if (atkHit) {
      // Attacker hits
      defHp -= atkFp * 10;

      // ── B.2: Submarine retreat on taking damage ─────────────────
      // Defending submarine has 50% chance to disengage when hit
      if (defenderIsSub && defHp > 0) {
        const retreatRoll = rand() % 2;
        if (retreatRoll === 0) {
          submarineRetreated = true;
          break; // submarine retreats — combat ends without a kill
        }
      }
    } else {
      // Defender hits
      atkHp -= defFp * 10;
    }
  }

  // If submarine retreated, neither side "wins" in the normal sense.
  // The attacker doesn't advance, the defender survives with damage.
  // We report attackerWins=false but with submarineRetreated=true
  // so the reducer knows NOT to kill the attacker.
  const attackerWins = !submarineRetreated && atkHp > 0;

  // HP lost in units of hpLost field (each = 1 HP out of UNIT_HP max)
  const atkHpLost = Math.max(0, Math.ceil((atkMaxHp - Math.max(0, atkHp)) / 10));
  const defHpLost = Math.max(0, Math.ceil((defMaxHp - Math.max(0, defHp)) / 10));

  // Veteran promotion: 50% chance for winner if not already veteran, and combat vs non-zero defense/attack
  const promoRoll = rand() % 2;
  const atkVeteranPromo = attackerWins && !attacker.veteran && defBase > 0 && promoRoll === 0;
  const defVeteranPromo = !attackerWins && !submarineRetreated && !defender.veteran && atkBase > 0 && promoRoll === 0;

  // ── B.2: Barbarian kill ransom ──────────────────────────────────
  // From FUN_00580341: when killing a barbarian, award gold based on
  // difficulty level. Formula: difficulty_index × 50 gold.
  let barbarianGold = 0;
  if (attackerWins && defender.owner === 0 && attacker.owner > 0 && difficulty) {
    const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(difficulty));
    barbarianGold = diffIdx * 50;
  }

  return { attackerWins, atkHpLost, defHpLost, atkVeteranPromo, defVeteranPromo,
    rounds, atkMaxHp, defMaxHp, atkFp, defFp, atkStartHp, defStartHp,
    submarineRetreated, barbarianGold, treatyViolation };
}
