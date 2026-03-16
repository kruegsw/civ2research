# Phase G — Completeness Audit: Game Logic Re-Scan

Cross-reference of 540 analyzed GL/AI functions from Civ2 MGE binary pseudocode
against the current JavaScript engine implementation in `charlizationv3/engine/`.

**Scope**: All JS engine files + all pseudocode blocks (004A-005B).
**Date**: 2026-03-15

---

## 1. Corrections Needed

### 1.1 [HIGH] Corruption/Waste Formula — Hardcoded Map Size Divisor

**Binary** (FUN_004e989a `calc_corruption`):
```
map_factor = (map_width + map_height)
corruption = (distance * trade_amount * 3) / (divisor * map_factor)
```

**JS** (`production.js` lines 350, 416):
```js
let baseWaste = Math.trunc((distVal * available * 3) / (gf * 20));
let corruption = Math.trunc((distVal * grossTrade * 3) / (gf * 20));
```

The JS uses a hardcoded `20` where the binary uses `(map_width + map_height)`. The value 20 is only correct for a specific map size. For a standard 80×50 map, the binary would use 130 (80+50), giving far less corruption than the JS. The formula is structurally wrong for all non-trivial map sizes. Additionally, `gf` in JS is `GOVT_FACTOR` (4-8 range) while the binary uses `calc_corruption_divisor` which returns `GOVT_CORRUPTION_DIVISOR` (1-4 range). These are different lookup tables applied to different denominators.

**Fix**: Replace `gf * 20` with `GOVT_CORRUPTION_DIVISOR[govt] * (mapBase.mw + mapBase.mh)` and adjust the formula to match the binary's divisor function, not GOVT_FACTOR.

---

### 1.2 [HIGH] Communism Corruption — Flat Rate vs Distance-Based

**Binary** (FUN_004e989a):
```
if govt == 'communism':
    corruption = communism_flat_corruption  // DAT_0064bcd8 = 50
    if city.has_building(7):  // Courthouse
        corruption = corruption / 2
    return min(corruption, trade_amount)
```

**JS** (`production.js` line 349/415):
```js
const distVal = (govt === 'communism') ? 3 : ...;
// Then uses the same distance-based formula with distVal=3
```

The JS treats communism as a distance-based formula with a fixed `distVal=3` (simulating "short distance"), but the binary uses a completely different code path: a flat corruption rate of 50 (COSMIC parameter from RULES.TXT), halved by Courthouse, capped at total trade. These produce very different results. A city with 40 gross trade under communism should lose 50 (capped to 40) without Courthouse, or 25 with Courthouse. The JS formula would give much less corruption for most cases.

**Fix**: Add a separate code path for communism that uses `COSMIC_COMMUNISM_CORRUPTION = 50` flat rate, with Courthouse halving.

---

### 1.3 [HIGH] Movement Points — Nuclear Power Air Bonus Missing

**Binary** (FUN_005b2a39 `calc_unit_movement_points`):
```
if domain == 2:  // AIR
    if civ_has_tech(owner, 0x3B):  // Nuclear Power (tech 59)
        base_moves += COSMIC          // +1 MP (in thirds)
    if civ_has_wonder(owner, 0xC):   // Magellan's
        base_moves += COSMIC * 2
    if civ_has_wonder(owner, 3):     // Lighthouse
        if not (flags1 & 0x20):
            base_moves += COSMIC
```

**JS** (`reduce/end-turn.js` lines 63-69):
```js
const seaBonus = (hasWonderEffect(state, activeCiv, 3) ? 1 : 0)
  + (hasWonderEffect(state, activeCiv, 12) ? 1 : 0);
// ...
if (seaBonus && UNIT_DOMAIN[u.type] === 1) mp += seaBonus * MOVEMENT_MULTIPLIER;
```

The JS only applies sea bonuses (Lighthouse + Magellan) to sea-domain units. The binary also applies Lighthouse, Magellan, AND Nuclear Power tech (0x3B = tech 59) bonuses to AIR-domain units. Nuclear Power gives +COSMIC (1 MP) to all air units. Magellan gives +2×COSMIC to air. Lighthouse gives +COSMIC to air (if unit doesn't have flags1 bit 0x20). None of these are applied to air units in the JS.

**Fix**: Add air-domain MP bonus block in end-turn.js movement reset. Nuclear Power tech 59 gives +1 MP to all air units. Magellan gives +2 MP to air. Lighthouse gives +1 MP to air (check flags1 & 0x20 exclusion).

---

### 1.4 [HIGH] Movement Points — Damage Reduction Rounding

**Binary** (FUN_005b2a39):
```
reduced = (hp_remaining * base_moves) / max_hp
// Round up to next COSMIC multiple
if reduced % COSMIC != 0:
    reduced += COSMIC - (reduced % COSMIC)
// Minimum: COSMIC for land, 2*COSMIC for air
minimum = COSMIC * (2 if domain == 2 else 1)
result = max(reduced, minimum)
```

**JS** (`movement.js` lines 28-29):
```js
const effectiveMP = Math.ceil(baseMP * currentHP / maxHP);
return Math.max(effectiveMP, MOVEMENT_MULTIPLIER);
```

Two issues:
1. **Rounding**: Binary rounds UP to the next COSMIC multiple (e.g., 4→6 when COSMIC=3). JS uses `Math.ceil` which rounds to the next integer. For COSMIC=3, a result of 4 should become 6 (next COSMIC multiple), but JS leaves it at 4. This means damaged units in JS get fractional MP that don't align to movement thirds.
2. **Air minimum floor**: Binary uses 2×COSMIC minimum for air units (6 movement thirds = 2 full MP). JS uses 1×MOVEMENT_MULTIPLIER (3 thirds = 1 MP) for all domains.

**Fix**: Replace `Math.ceil` with COSMIC-aligned rounding: `Math.ceil(reduced / COSMIC) * COSMIC`. Add domain-specific minimum: `domain === 2 ? MOVEMENT_MULTIPLIER * 2 : MOVEMENT_MULTIPLIER`.

---

### 1.5 [HIGH] Production Formula — Factory/Power Applied to Wrong Base

**Binary** (FUN_004e9c14 `calc_city_production`):
```
net = gross_shields - support
if city.has_building(15):   // Factory: +50%
    net = net * 3 / 2
if city.has_building(16):   // Mfg. Plant: +50%
    net = net * 3 / 2
if has_power:               // Power: +50%
    net = net * 3 / 2
waste = calc_waste(city, city_index, net, govt)
net -= waste
```

**JS** (`production.js` `calcGrossShields` lines 195-209):
```js
let factoryMult = 0;
if (cityHasBuilding(city, 15)) factoryMult += 2;
if (cityHasBuilding(city, 16)) factoryMult += 2;
// ...
return base + ((base * factoryMult) >> 2) + ((base * powerMult) >> 2);
```

Two issues:
1. **Application order**: Binary applies Factory/MfgPlant/Power to `net` (gross MINUS support), applying multipliers sequentially. JS applies multipliers to `base` (gross BEFORE support), and applies them simultaneously (as fractions of base). This gives different results when support > 0.
2. **Sequential vs parallel**: Binary applies Factory (×1.5), then MfgPlant (×1.5 of that result), then Power (×1.5 of that result), yielding up to ×3.375 with all three. JS uses additive fractions: `base + base*fact/4 + base*power/4`, which caps at ×2.0 (Factory+Mfg = +100%, Power capped to factoryMult). The `if (powerMult > factoryMult) powerMult = factoryMult` line further limits power to match factory level.

**Fix**: Apply multipliers sequentially to (gross - support) rather than additively to gross. Compute net = gross - support, then apply each multiplier as `net = net + (net >> 1)` for each building present.

---

### 1.6 [MEDIUM] HP Recovery — Massively Oversimplified

**Binary** (FUN_00488cef `heal_units`):
```
heal_rate = 1  // base
if on_fortress: heal_rate = 2
if near_friendly_city (distance < 4) AND domain == LAND:
    heal_rate += 1
    if has_barracks: heal_rate += 2
if in_city (distance == 0):
    if has_matching_building:  // Barracks/Port Facility/Airport
        heal_rate *= 2
    heal_rate *= 2  // double for city
    if matching_building: heal_rate = unit.damage  // full heal
heal_rate = (max_hp / 10) * heal_rate
```

**JS** (`reduce/end-turn.js` lines 360-367):
```js
const inCity = state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner);
const healAmt = inCity ? 2 : 1;
const newHpLost = Math.max(0, u.hpLost - healAmt);
```

Missing from JS:
- Fortress bonus (×2 heal rate)
- Proximity bonus (near-city +1, +2 with barracks)
- Domain-specific matching buildings: Barracks (land), Port Facility 34 (sea), Airport 32 (air)
- Full heal with matching building in city
- HP-scaled heal rate: `(max_hp / 10) * heal_rate`
- Sea unit at-sea penalty (1/10 rate on open ocean)
- Embarked unit skip (no healing while transported)

**Fix**: Implement the full heal_rate calculation from the binary. At minimum, add fortress bonus and matching-building full heal.

---

### 1.7 [MEDIUM] Veteran Promotion — Sun Tzu's War Academy Missing

**Binary** (FUN_00580341 `resolve_combat`, lines 314-323):
```
if NOT atk_wins:
    promo_roll = rand() % (def_power + atk_power)
    if promo_roll <= atk_power OR civ_has_wonder(def_owner, 7):  // Sun Tzu
        try_promote_veteran(def_unit)
else:
    promo_roll = rand() % (atk_power + def_power)
    if promo_roll <= def_power OR civ_has_wonder(atk_owner, 7):
        try_promote_veteran(attacker)
```

**JS** (`combat.js` lines 500-503):
```js
const promoRoll = rand() % 2;
const atkVeteranPromo = attackerWins && !attacker.veteran && defBase > 0 && promoRoll === 0;
const defVeteranPromo = !attackerWins && !submarineRetreated && !defender.veteran && atkBase > 0 && promoRoll === 0;
```

Two issues:
1. **Sun Tzu's War Academy (wonder 7)**: Binary grants guaranteed veteran promotion if the winning civ owns Sun Tzu's. JS doesn't check for this wonder at all.
2. **Promotion probability**: Binary uses `rand() % (atk_power + def_power)` and promotes if roll <= loser's power. JS uses a flat 50% (`rand() % 2`). The binary formula means promotion is more likely when the loser was stronger (i.e., winning against a strong opponent is more likely to grant veteran status). JS promotion is always 50% regardless of power ratio.

**Fix**: Add Sun Tzu wonder 7 check (guaranteed promotion). Change promotion roll to use power-weighted formula matching binary.

---

### 1.8 [MEDIUM] Best Defender Selection — Missing Bonuses

**Binary** (FUN_0057e6e2 `calc_stack_best_defender`, lines 1958-1980):
```
// "Ignorable" flag (flags2 & 4): +1
if unit_type.flags2 & 4:
    score += 1

// Air unit in port with SAM batteries: halve score
if unit_type.domain == AIR and city_at_tile >= 0:
    if attacker == -1: score /= 2
    elif attacker.domain == SEA and !has_building(city, 0x1B):
        score *= 2
    else:
        score /= 2
```

**JS** (`combat.js` `calcStackBestDefender`) is missing:
1. The "Ignorable" flag (flags2 bit 2) bonus of +1 to defender score. This flag marks units like missiles that shouldn't be selected as primary defenders — the +1 actually makes them slightly preferred when other factors are equal, which may be a "last resort" selection mechanism.
2. Air units in cities with SAM batteries get their defender score halved, making them less likely to be picked as primary defender (they're protected by SAM instead). JS doesn't implement this priority adjustment.

**Fix**: Add flags2 & 4 (ignorable) check and SAM battery score adjustment to calcStackBestDefender.

---

### 1.9 [MEDIUM] Food Box Size — Difficulty Scaling Missing

**Binary** (FUN_004e74df `calc_food_box_with_difficulty`):
```
function calc_food_box_with_difficulty(city_size, difficulty, is_human):
    base = calc_food_box_size(city_size)
    if is_human:
        if difficulty == CHIEFTAIN:
            base = base * 6 / 10   // 60% = easier growth
        elif difficulty == WARLORD:
            base = base * 8 / 10   // 80%
    return base
```

**JS** (`production.js` `foodToGrow`):
```js
export function foodToGrow(citySize) {
  return (citySize + 1) * FOOD_BOX_MULTIPLIER;
}
```

JS has no difficulty-based food box scaling. On Chieftain and Warlord difficulties, human players should need 60% and 80% respectively of the normal food to grow their cities. This significantly affects early-game pacing on easier difficulties.

**Fix**: Add difficulty parameter and scaling factors to `foodToGrow()`.

---

### 1.10 [MEDIUM] Building Upkeep — Missing Fundamentalism/UN/Courthouse Exemptions

**Binary** (FUN_004f00f0 `calc_building_upkeep_cost`):
```
if cost == 1:
    if civ_has_active_wonder(civ_id, 0x11):  // United Nations
        cost = 0

if cost != 0 AND govt == FUNDAMENTALISM:
    if building_id == 4 OR building_id == 0x0E OR building_id == 0x0B:
        cost = 0   // Temple(4), Colosseum(14), Library(11) free under Fundamentalism

if building_id == 2:  // Courthouse
    // Extra cost from tech chain progression
    if civ_has_tech(last_in_chain_from_0x35):
        cost += 1
    if civ_has_tech(0x23):  // tech 35
        cost += 1
```

**JS** (`production.js` `calcBuildingMaintenance` lines 487-498) only checks Adam Smith's Trading Co. (wonder 17, maintenance <= 1 free). Missing:
1. United Nations (wonder 0x11 = 17 decimal, but as a wonder index — this is wonder index 17) reducing cost-1 buildings to 0
2. Fundamentalism making Temple (4), Colosseum (14), Library (11) free
3. Courthouse (building 2) progressive cost increase with tech advancement
4. Difficulty-based Courthouse cost reduction on lower difficulties

**Fix**: Add these government-specific and wonder-specific upkeep modifiers.

---

### 1.11 [LOW] Combat Resolution — Random Roll Formula Mismatch

**Binary** (FUN_00580341):
```
atk_roll = (atk_power <= 1) ? 0 : rand() % atk_power
def_roll = (def_power <= 1) ? 0 : rand() % def_power
atk_wins_round = (def_roll < atk_roll)
```

**JS** (`combat.js` line 455):
```js
const roll = rand() % (effAtk + effDef);
let atkHit = roll < effAtk;
```

The binary uses two separate rolls (one for attacker, one for defender) and compares them. JS uses a single roll against the combined power. Mathematically these give similar but not identical probabilities:
- Binary: P(atk) = sum over all a,d of P(a > d) ≈ atk/(atk+def) for large values
- JS: P(atk) = atk/(atk+def)

The single-roll JS approach is a common simplification that produces nearly identical results for large power values, but diverges for small values (e.g., 1 vs 1).

**Fix**: Low priority — consider switching to two-roll for exact binary fidelity.

---

### 1.12 [LOW] Barbarian Difficulty Scaling in Combat — Incomplete

**Binary** (FUN_00580341 lines 170-178, 229-233):
```
// Pre-execution:
if atk_owner == 0 (barbarian):
    if human_player AND difficulty < 2:
        atk_power /= 2
    elif human_controlled AND difficulty == 0:
        atk_power *= 2

// Execution path:
if atk_owner != 0:
    if difficulty < 2 AND def is human-controlled:
        atk_power /= 2
    if difficulty == 0 AND atk is human-controlled:
        atk_power *= 2
```

**JS** (`combat.js` lines 418-423):
```js
if (attacker.owner === 0 && difficulty) {
    if (difficulty === 'emperor') effAtk = Math.floor(effAtk * 5 / 4);
    if (difficulty === 'deity') effAtk = Math.floor(effAtk * 3 / 2);
    if (difficulty === 'chieftain') effAtk = Math.floor(effAtk / 2);
    if (difficulty === 'warlord') effAtk = Math.floor(effAtk * 3 / 4);
}
```

The JS only handles barbarian-as-attacker difficulty scaling. Missing:
1. Non-barbarian AI attack scaling based on difficulty (AI attackers weakened on easy difficulties when attacking human)
2. Human attack boost on Chieftain (×2 attack power for human player)
3. Great Wall halving barbarian attack power (wonder 6 check)

**Fix**: Add non-barbarian difficulty scaling and Great Wall barbarian halving in combat resolution.

---

## 2. Magic Numbers That Should Be Named Constants

### 2.1 combat.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 38 | `new Set([23, 24, 25, 26])` | `SIEGE_UNIT_TYPES` or reference from defs.js |
| 279 | `attacker.type === 29` | `UNIT_TYPE_HELICOPTER = 29` |
| 378 | `v.type === 42` (in end-turn.js) | `UNIT_TYPE_CARRIER = 42` |

### 2.2 happiness.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 16 | `CONTENT_BASE = 7` | Should be `COSMIC_CONTENT_BASE` (from RULES.TXT COSMIC section, DAT_0064bccf) |
| 17 | `RIOT_FACTOR = 14` | Should be `COSMIC_RIOT_FACTOR` (DAT_0064bcd0) |
| 96 | `14` (Colosseum) | `BUILDING_COLOSSEUM = 14` |
| 98 | `24` (Electronics tech) | `TECH_ELECTRONICS = 24` |
| 103 | `55` (Theology tech) | `TECH_THEOLOGY = 55` |
| 104 | `15` (Communism tech) | `TECH_COMMUNISM = 15` |
| 104 | `82` (some tech) | Needs identification — possibly `TECH_GENETIC_ENGINEERING = 82` |
| 109 | `4` (Temple) | `BUILDING_TEMPLE = 4` |
| 111 | `56` (Mysticism) | `TECH_MYSTICISM = 56` |
| 112 | `9` (Ceremonial Burial) | `TECH_CEREMONIAL_BURIAL = 9` |
| 118 | `7` (Courthouse), `1` (Palace) | `BUILDING_COURTHOUSE = 7`, `BUILDING_PALACE = 1` |
| 133 | `NON_COMBAT_TYPES` inline | Already named — good |
| 144 | `21` (Women's Suffrage wonder) | Already in hasWonderEffect but unlabeled in code: `WONDER_WOMENS_SUFFRAGE = 21` |
| 144 | `33` (Police Station) | `BUILDING_POLICE_STATION = 33` |
| 173 | `1` (Hanging Gardens wonder) | `WONDER_HANGING_GARDENS = 1` |
| 179 | `27` (Cure for Cancer) | `WONDER_CURE_FOR_CANCER = 27` |
| 184 | `13` (Shakespeare's Theatre) | `WONDER_SHAKESPEARES = 13` |
| 189 | `15` (J.S. Bach's) | `WONDER_JS_BACHS = 15` |

### 2.3 production.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 39 | `24` (Supermarket) | `BUILDING_SUPERMARKET = 24` |
| 44 | `30` (Harbour) | `BUILDING_HARBOUR = 30` |
| 70 | `8` (King Richard's) | `WONDER_KING_RICHARDS = 8` |
| 73 | `31` (Offshore Platform) | `BUILDING_OFFSHORE_PLATFORM = 31` |
| 78 | `67` (Railroad tech) | `TECH_RAILROAD = 67` |
| 104 | `2` (Colossus wonder) | `WONDER_COLOSSUS = 2` |
| 118 | `25` (Superhighways) | `BUILDING_SUPERHIGHWAYS = 25` |
| 196-198 | `15` (Factory), `16` (Mfg Plant) | `BUILDING_FACTORY = 15`, `BUILDING_MFG_PLANT = 16` |
| 201-204 | `19,20,21,29` (Power/Hydro/Nuclear/Solar) | `BUILDING_POWER_PLANT = 19`, etc. |
| 204 | `22` (Hoover Dam wonder) | `WONDER_HOOVER_DAM = 22` |
| 353 | `7` (Courthouse), `1` (Palace) | `BUILDING_COURTHOUSE`, `BUILDING_PALACE` |
| 419 | same | same |
| 452-454 | `5,10,22` (Marketplace/Bank/Stock Exchange) | Named constants |
| 460-462 | `6,12,26` (Library/University/Research Lab), `18` (SETI wonder) | Named constants |
| 466 | `16` (Isaac Newton's) | `WONDER_ISAAC_NEWTONS = 16` |
| 470 | `11` (Copernicus') | `WONDER_COPERNICUS = 11` |
| 489 | `17` (Adam Smith's) | `WONDER_ADAM_SMITHS = 17` |

### 2.4 movement.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 51 | `32` (Trireme type) | `UNIT_TYPE_TRIREME = 32` |
| 56 | `3` (Astronomy tech) | `TECH_ASTRONOMY = 3` |
| 59-60 | `3, 12` (Lighthouse, Magellan wonders) | `WONDER_LIGHTHOUSE = 3`, `WONDER_MAGELLANS = 12` |
| 102 | `42` (Carrier type) | `UNIT_TYPE_CARRIER = 42` |
| 240 | `10` (Alpine Troops), `4,5` (Hills, Mountains) | `UNIT_TYPE_ALPINE = 10`, `TERRAIN_HILLS = 4`, `TERRAIN_MOUNTAINS = 5` |

### 2.5 research.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 133 | `TECH_GUNPOWDER = 35` | Good — already named |
| 134 | `TECH_AUTOMOBILE = 5` | Good — already named |
| 136 | `FUTURE_TECH_ID = 89` | Good — already named |
| 311 | `LEONARDO_IDX = 14` | Good — already named |
| 189 | `2` (Barracks building) | `BUILDING_BARRACKS = 2` |

### 2.6 reducer.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 424 | `50` (caravan wonder help shields) | `CARAVAN_WONDER_SHIELDS = 50` — needs verification against binary |
| 929 | `40` (min upgrade cost) | `MIN_UPGRADE_COST = 40` |
| 929 | `(newCost - oldCost) * 2` | Upgrade formula — needs binary verification |
| 281 | `1 + state.rng.nextInt(4)` (anarchy turns) | Binary uses fixed formula — verify range |

### 2.7 reduce/end-turn.js

| Line | Magic Number | Should Be |
|------|-------------|-----------|
| 63-64 | `3, 12` (Lighthouse, Magellan) | `WONDER_LIGHTHOUSE`, `WONDER_MAGELLANS` |
| 154 | `8` (global warming threshold) | `GLOBAL_WARMING_POLLUTION_THRESHOLD = 8` |
| 174 | transform table `{ 1: 0, 2: 0, ... }` | `GLOBAL_WARMING_TRANSFORM` as named constant |
| 288 | `4` (Great Library wonder) | `WONDER_GREAT_LIBRARY = 4` |
| 341 | `14` (Leonardo's wonder) | `WONDER_LEONARDOS = 14` |
| 378 | `42` (Carrier type) | `UNIT_TYPE_CARRIER = 42` |

---

## 3. Missing Edge Cases

### 3.1 [HIGH] Sea Units Exempt from Damage-Based MP Reduction

**Binary** (FUN_005b2a39): Damage-based movement reduction only applies when `domain != 1` (not SEA). Sea units always get full movement points regardless of damage.

**JS** (`movement.js` `calcEffectiveMovementPoints`): Applies damage reduction to all domains equally. Damaged sea units incorrectly get reduced MP.

**Fix**: Add `if (UNIT_DOMAIN[unit.type] === 1) return baseMP;` early return for sea units.

---

### 3.2 [HIGH] Lighthouse Exclusion Flag for Air Units

**Binary** (FUN_005b2a39): Lighthouse bonus for air units is gated on `!(flags1 & 0x20)`. This flag (bit 5 of unit type flags1) excludes certain air unit types from the Lighthouse bonus (likely helicopters or missiles).

**JS**: Does not check this flag at all when applying Lighthouse bonus (and doesn't apply Lighthouse to air units at all — see §1.3).

**Fix**: When implementing air MP bonuses, check the flags1 & 0x20 exclusion for Lighthouse.

---

### 3.3 [MEDIUM] Great Wall — Barbarian Attack Halving

**Binary** (FUN_00580341 lines 180-185):
```
if atk_owner == 0:   // barbarian
    if civ_has_wonder(def_owner, 6):  // Great Wall
        atk_power /= 2
if def_owner == 0:   // defender is barbarian
    if civ_has_wonder(atk_owner, 6):
        atk_power *= 2
```

**JS** (`combat.js`): Has `greatWallDoubleRoll` mechanic for in-city defense, but does NOT implement:
1. Barbarian attack halving when defender has Great Wall (global, not just in-city)
2. Attack doubling vs barbarians when attacker has Great Wall

**Fix**: Add Great Wall barbarian power modification outside the city-only double-roll mechanic.

---

### 3.4 [MEDIUM] Fundamentalism Science Cap

**Binary** behavior confirmed: Fundamentalism caps science rate at 50% (5/10).

**JS** (`production.js` line 434): Correctly implements `if (govt === 'fundamentalism' && sciRate > 5) sciRate = 5;`

This one is actually correct in the JS. No fix needed.

---

### 3.5 [MEDIUM] Democracy Revolution Risk During Extended Disorder

**Binary**: If a democracy city stays in civil disorder for multiple consecutive turns, there's a chance of government collapse to anarchy.

**JS** (`cityturn.js` presumably): Needs verification that the disorder counter and revolution trigger are implemented.

---

### 3.6 [MEDIUM] City Size Reduction on Conquest

**Binary** (FUN_00580341 lines 346-356): When an attacker captures a city, the city size is reduced by 1. But there are exemptions:
- If the city has Barracks (building 8) — exempt from size reduction
- If defender has Great Wall (wonder 6) — exempt
- If difficulty is Chieftain AND defender is human-controlled — exempt
- If the attacker came from ocean — exempt

**JS** (captureCity in helpers.js): Needs verification that all these exemptions are implemented.

---

### 3.7 [LOW] Barbarian Diplomat/Spy Defense Halving

**Binary** (FUN_00580341 lines 175-178):
```
if def_owner == 0 (barbarian):
    if def_type == 4 or 5 (Diplomat/Spy):
        def_power /= 2 (min 1)
```

Barbarian diplomats/spies get halved defense. JS doesn't implement this edge case.

---

### 3.8 [LOW] Combat — Missile/Nuke Instant Resolution

**Binary** (FUN_00580341 lines 252-257): Units with `range >= 99` (missiles, nukes) use instant resolution via `FUN_0057f9e3` instead of round-by-round combat. This includes nuclear destruction of city improvements.

**JS**: Has separate NUKE action handler but may not properly handle cruise missile instant resolution within normal combat flow.

---

### 3.9 [LOW] Score Formula — Not Fully Implemented

**Binary** (FUN_004a28b0 `calc_civ_score`): Full scoring includes:
- Population score: `sum(city.size + city.happy - city.unhappy)` per city
- Wonder score: 20 per wonder owned
- Spaceship score with arrival bonus
- Pollution penalty: `(globalPollution - cleanedPollution) * -10`
- Map exploration bonus (after turn 199): `clamp(exploredPercent * 3, 0, 100)`
- Future tech bonus: `futureTechCount * 5`
- Difficulty modifier: `difficultyLevel * 25 - 50`
- Alpha Centauri scenario relative-power ranking mode

**JS** (spaceship.js/end-turn.js): Likely missing several of these score components. Needs comprehensive implementation of the full formula.

---

### 3.10 [LOW] Helicopter Type ID Mismatch

**Binary** (FUN_00580341 line 137): `if atk_type == 9 AND def_attack_base == 0: atk_power *= 8`

Helicopter type is 9 (0x09) in the pseudocode binary. **JS** (`combat.js` line 279) uses `attacker.type === 29`. Need to verify which is correct — the standard MGE unit list has Helicopter at index 29, so the JS value 29 is likely correct and the pseudocode annotation `type 0x09` is a decompilation artifact (possibly the type ID was stored differently in the binary's unit type table).

---

## 4. Summary

### Findings by Severity

| Severity | Count | Categories |
|----------|-------|------------|
| HIGH | 5 | Corruption formula (§1.1, §1.2), Air MP bonus (§1.3), MP rounding (§1.4), Production formula (§1.5) |
| MEDIUM | 5 | HP recovery (§1.6), Veteran promotion (§1.7), Best defender (§1.8), Food box scaling (§1.9), Building upkeep (§1.10) |
| LOW | 3 | Combat roll formula (§1.11), Barbarian scaling (§1.12), Score formula (§3.9) |

### Magic Numbers

Over 80 raw numeric literals identified across 7 engine files that should be named constants in `defs.js`. The most impactful are building IDs (used in 40+ locations across happiness, production, and combat), wonder indices (25+ locations), and tech IDs (15+ locations).

### Missing Edge Cases

11 edge cases identified, 3 HIGH (sea MP exemption, Lighthouse air flag, Great Wall barbarian halving), 3 MEDIUM (democracy revolution, city capture exemptions, barbarian diplomat), 5 LOW.

### Overall Assessment

The five HIGH-severity corrections (§1.1-§1.5) represent fundamental formula mismatches that affect every city every turn. The corruption/waste formula using hardcoded `20` instead of map dimensions (§1.1) and communism flat rate vs distance-based (§1.2) are the most impactful — they produce incorrect trade, tax, and science output for every city under non-democratic governments. The production formula (§1.5) applying multipliers to the wrong base similarly affects all cities with factories or power plants.

The movement point issues (§1.3, §1.4) affect air units and any damaged unit every turn. The HP recovery oversimplification (§1.6) means units heal at incorrect rates in all situations except the base case.

These findings should be addressed in priority order: §1.1 → §1.2 → §1.5 → §1.3 → §1.4 → §1.6 → §1.7 → remaining MEDIUM → LOW.
