// ═══════════════════════════════════════════════════════════════════
// combat.js — Combat resolution (shared: server + client)
//
// Implements Civ2's combat system: round-by-round probabilistic
// resolution with terrain/fortification/veteran modifiers.
// ═══════════════════════════════════════════════════════════════════

import { UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, TERRAIN_DEFENSE } from './defs.js';

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
 * @returns {{ attackerWins: boolean, atkHpLost: number, defHpLost: number,
 *             atkVeteranPromo: boolean, defVeteranPromo: boolean }}
 */
export function resolveCombat(attacker, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver) {
  const atkBase = UNIT_ATK[attacker.type] || 1;
  const defBase = UNIT_DEF[defender.type] || 1;

  const atkMaxHp = (UNIT_HP[attacker.type] || 1) * 10;
  const defMaxHp = (UNIT_HP[defender.type] || 1) * 10;
  const atkFp = UNIT_FP[attacker.type] || 1;
  const defFp = UNIT_FP[defender.type] || 1;

  // Effective attack: base × veteran bonus
  let effAtk = atkBase * 8; // ×8 for fixed-point
  if (attacker.veteran) effAtk += Math.floor(effAtk / 2); // +50% veteran

  // Effective defense: base × terrain × veteran × fortification × city/walls/fortress
  const terrainMul = TERRAIN_DEFENSE[defTerrain] ?? 2; // ×50% each
  let effDef = defBase * terrainMul * 4; // ×4 for fixed-point (terrainMul already includes ×2 base)
  if (defender.veteran) effDef += Math.floor(effDef / 2); // +50% veteran

  // Fortification bonus: +50%
  if (defender.orders === 'fortified') {
    effDef += Math.floor(effDef / 2);
  }

  // City walls: ×3 vs land and sea attackers (not air)
  const atkDomain = UNIT_DOMAIN[attacker.type] ?? 0;
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

  // Ensure minimums
  if (effAtk < 1) effAtk = 1;
  if (effDef < 1) effDef = 1;

  // Current HP
  let atkHp = atkMaxHp - (attacker.hpLost || 0) * 10;
  let defHp = defMaxHp - (defender.hpLost || 0) * 10;
  if (atkHp <= 0) atkHp = 10;
  if (defHp <= 0) defHp = 10;

  // Round-by-round combat (deterministic using pseudo-random sequence)
  // Use a simple PRNG seeded from both units' stats for reproducibility
  let seed = ((attacker.type * 31 + defender.type * 17 + defTerrain * 7 + atkHp + defHp) & 0x7FFFFFFF) || 1;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF;
    return seed;
  };

  while (atkHp > 0 && defHp > 0) {
    const roll = rand() % (effAtk + effDef);
    if (roll < effAtk) {
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

  return { attackerWins, atkHpLost, defHpLost, atkVeteranPromo, defVeteranPromo };
}
