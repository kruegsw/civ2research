// ═══════════════════════════════════════════════════════════════════
// combat.js — Combat resolution (shared: server + client)
//
// Implements Civ2's combat system: round-by-round probabilistic
// resolution with terrain/fortification/veteran modifiers.
//
// Special unit interactions ported from decompiled FUN_00580341:
//   - Pikemen double defense vs mounted/horse units (flags bit 13)
//   - Aegis Cruiser double defense vs air/missile attacks (flags bit 14)
//   - Air vs unarmed ships: halved defense, FP capped to 1
//   - Air vs land: FP capped to 1 for both sides
//   - Helicopter vs submarines: ×8 attack multiplier
//   - Partial movement attack penalty (fractional MP)
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_DESTROYED_AFTER_ATTACK, TERRAIN_DEFENSE, MOVEMENT_MULTIPLIER,
  UNIT_PIKEMAN_BONUS, MOUNTED_UNITS, UNIT_AEGIS_BONUS,
} from './defs.js';

/**
 * Resolve combat between an attacker and defender.
 *
 * @param {object} attacker - { type, veteran, hpLost, owner }
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
 * @returns {{ attackerWins: boolean, atkHpLost: number, defHpLost: number,
 *             atkVeteranPromo: boolean, defVeteranPromo: boolean,
 *             rounds: boolean[], atkMaxHp: number, defMaxHp: number,
 *             atkFp: number, defFp: number, atkStartHp: number, defStartHp: number }}
 */
export function resolveCombat(attacker, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver, defCityBuildings, extraSeed, difficulty, atkMovesLeft) {
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
  // Ported from FUN_00580341 lines 183-186: unit type 9 (helicopter=29
  // in our system, type byte '\t'=9 in decompiled) attacking 0-attack
  // defender → ×8 attack multiplier. In our mapping, Helicopter is type 29.
  // This models helicopter anti-submarine warfare.
  let heliBonus = false;
  if (attacker.type === 29 && defAtk === 0) {
    heliBonus = true;
    // Applied as ×8 to effective attack below
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
  // In the decompiled binary this is flag 0x20 in the high byte of
  // the unit flags field. Standard Civ2 mounted units: Horsemen,
  // Chariot, Knights, Crusaders, Dragoons, Cavalry, Elephants, Armor.
  if (UNIT_PIKEMAN_BONUS.has(defender.type) && MOUNTED_UNITS.has(attacker.type)) {
    effDef *= 2;
  }

  // ── Special interaction: Aegis defense bonus vs air/missiles ──
  // Ported from FUN_00580341: Aegis-flagged defenders (flags bit 14)
  // get ×2 defense vs air-domain attackers and ×5 vs missiles.
  // In the decompiled code, the distinction is flag 0x40 in hi-byte
  // AND attacker domain == 2 (air).
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
    const atkHit = roll < effAtk;
    rounds.push(atkHit);
    if (atkHit) {
      // Attacker hits
      defHp -= atkFp * 10;
    } else {
      // Defender hits
      atkHp -= defFp * 10;
    }
  }

  const attackerWins = atkHp > 0;

  // HP lost in units of hpLost field (each = 1 HP out of UNIT_HP max)
  const atkHpLost = Math.max(0, Math.ceil((atkMaxHp - Math.max(0, atkHp)) / 10));
  const defHpLost = Math.max(0, Math.ceil((defMaxHp - Math.max(0, defHp)) / 10));

  // Veteran promotion: 50% chance for winner if not already veteran, and combat vs non-zero defense/attack
  const promoRoll = rand() % 2;
  const atkVeteranPromo = attackerWins && !attacker.veteran && defBase > 0 && promoRoll === 0;
  const defVeteranPromo = !attackerWins && !defender.veteran && atkBase > 0 && promoRoll === 0;

  return { attackerWins, atkHpLost, defHpLost, atkVeteranPromo, defVeteranPromo,
    rounds, atkMaxHp, defMaxHp, atkFp, defFp, atkStartHp, defStartHp };
}
