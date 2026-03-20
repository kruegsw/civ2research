# Deep Dive: resolve_combat (FUN_00580341) vs JS Engine

**Binary function**: `FUN_00580341` @ `block_00580000.c` lines 25-1210 (15,052 bytes)
**JS implementation**: `engine/combat.js` (`resolveCombat`, `calcUnitDefenseStrength`, `calcStackBestDefender`) + `engine/reduce/move-unit.js` (combat integration) + `engine/citycapture.js` (city capture logic)
**Phase 2 pseudocode**: `function_audit/phase2/pseudocode/block_00580000.md` lines 63-421

---

## Architecture Overview

### Binary
One monolithic 15KB function handles everything: strength calculation, diplomatic consequences, visibility/animation, combat rounds, post-combat unit disposition, city capture, veteran promotion, treaty notifications, and multiplayer sync. Called with `(attacker_unit_idx, direction, execute_flag)`:
- `execute_flag == 0`: dry-run mode, returns odds ratio (0-1024)
- `execute_flag != 0`: real combat execution, returns 0 (def wins) or 1 (atk wins)

### JS
Split across modules:
- `combat.js::resolveCombat()` -- pure combat math: strength, modifiers, round-by-round loop, veteran promotion
- `combat.js::calcUnitDefenseStrength()` -- defense calculation with terrain/building modifiers
- `combat.js::calcStackBestDefender()` -- best defender selection with HP weighting
- `reduce/move-unit.js` -- integration: calls resolveCombat, handles unit death, city capture triggers, stack wipe, MP cost
- `citycapture.js::handleCityCapture()` -- city size reduction, building destruction, tech capture
- `nuclear.js::handleNuclearAttack()` -- separate nuclear path

---

## Branch-by-Branch Comparison

### 1. Attack Strength Calculation (FUN_0057e2c3)

**Binary** (block_00570000.c lines 5301-5313):
```
attack_power = unit_type[attacker.type].attack * 8
if status & 0x2000 (veteran): attack_power += attack_power / 2  (+50%)
if status & 0x10 (on_ship/hardened): attack_power += attack_power / 2  (+50%)
```

**JS** (combat.js lines 340-348):
```js
effAtk = atkBase * 8;
if (attacker.veteran) effAtk += Math.floor(effAtk / 2);  // +50%
if (amphibious) effAtk += Math.floor(effAtk / 2);  // +50%
```

**Assessment**: MATCH. The binary's status flag 0x10 maps to "on_ship" which the JS approximates via the `amphibious` parameter. The order-of-operations is preserved (multiply by 8, then add 50% twice if both apply, each stacking multiplicatively: 8 -> 12 -> 18).

---

### 2. Fractional Movement Penalty

**Binary** (lines 97-110):
```
atk_moves = get_remaining_moves(attacker)
cap = min(atk_moves, COSMIC_MOVE_MULTIPLIER)
if execute_flag != 0:
    atk_power = atk_power * cap / COSMIC_MOVE_MULTIPLIER
```

**JS** (combat.js lines 357-360):
```js
if (atkMovesLeft != null && atkMovesLeft < MOVEMENT_MULTIPLIER && atkMovesLeft > 0) {
    effAtk = Math.floor(effAtk * atkMovesLeft / MOVEMENT_MULTIPLIER);
    if (effAtk < 1) effAtk = 1;
}
```

**Assessment**: MATCH, with minor difference. Binary always applies when `execute_flag != 0`, using `min(moves, COSMIC)`. JS only applies when `movesLeft < MOVEMENT_MULTIPLIER`. When moves >= MOVEMENT_MULTIPLIER, the cap equals COSMIC and the ratio is 1.0, so both produce the same result. JS adds a floor of 1 (not in binary).

---

### 3. Defense Strength Calculation (FUN_0057e33a)

**Binary** (block_00570000.c lines 5318-5484, pseudocode at block_00570000.md lines 1869-1928):
```
defense = (river_bonus + terrain_defense) * base_defense * 4
mult = 2 (default)
if fortified AND land domain: mult = 3
if fortress AND (no attacker OR attacker not air): mult = 4
if in city:
    if has City Walls or Great Wall AND defender is land domain:
        if no attacker OR attacker is land AND not wall-negating: mult = 6
if mult != 2: defense = defense * mult / 2
if veteran: defense += defense / 2
```

**JS** (combat.js lines 104-167):
```js
defense = (riverBonus + terrainMul) * defBase * 4;
if (fortified && land): defense *= 3/2;   // inline, not via mult
if (fortress && !inCity && atk not air): defense *= 2;
if (inCity && walls && land && atk is land): defense *= 3;
if (Coastal Fortress && atk sea && def not sea): defense *= 2;
if (SAM Battery && atk air): defense *= 2;
if (SDI && atk missile && atk < 99): defense *= 2;
if (veteran): defense += defense / 2;
```

**Assessment**: MOSTLY MATCH but with structural differences:

| Feature | Binary | JS | Match? |
|---------|--------|-----|--------|
| Base formula | (river+terrain) * def * 4 | Same | YES |
| Fortification +50% | mult=3 -> *3/2 | *= 3/2 | YES |
| Fortress x2 | mult=4 -> *4/2=*2 | *= 2 | YES |
| Fortress ignored for air attackers | Yes (checks domain) | Yes (checks atkDomain !== 1) | YES |
| City Walls x3 for land | mult=6 -> *6/2=*3 | *= 3 | YES |
| Walls only vs land attackers | Yes | Yes (checks atkDomain === 0) | YES |
| Wall-negating units bypass | Yes (flags & 0x40) | Yes (UNIT_NEGATES_WALLS set) | YES |
| Coastal Fortress x2 | In defense calc | In defense calc | YES |
| SAM Battery x2 | In defense calc | In defense calc | YES |
| SDI x2 | In defense calc | In defense calc | YES |
| Veteran +50% | Applied last | Applied last | YES |
| **Naval in-city defense** | Special quadruple logic for naval units in city with Coastal Fortress | Not separately handled | **DISCREPANCY** |

**GAP D1: Naval in-city defense multiplier**. Binary lines 1893-1899 of pseudocode show a special case for sea-domain defenders in a city: depending on the attacker's flags, the multiplier goes to x4 or x2 specifically. The JS does not have this naval-in-city branch — it only applies Coastal Fortress x2 generically.

---

### 4. Best Defender Selection (FUN_0057e6e2)

**Binary** (pseudocode block_00570000.md lines 1933-1985):
```
for each unit in stack:
    score = calc_defense_strength(unit)
    if game_flags & 0x10: score *= curHP / maxHP  (HP weighting)
    if flags2 & 0x04 (pikeman): score += 1
    if flags2 & 0x20 (anti-air) AND atk is air:
        if atk is missile: score *= 5
        else: score *= 3
    if flags & 0x10 (submarine) AND atk is air: score *= 2
    select highest score
```

**JS** (combat.js lines 184-263):
```js
for each unit:
    score = calcUnitDefenseStrength(...)
    score *= curHp / maxHp  (HP weighting, gated on simplifiedCombat)
    if pikeman: score += 1
    if anti-air AND atk air:
        if missile: score *= 5  else: score *= 3
    if submarine AND atk air: score *= 2
    select highest
```

**Assessment**: MATCH. The HP weighting is gated on `simplifiedCombat` flag in JS (default true), matching binary's `game_flags & 0x10` check. One difference: binary checks `attacker.domain == SEA` for anti-air; JS checks `atkDomain === 1` (air). But this was already noted as a fix in phase 7 (gap #21: submarine should check air domain, was sea).

**NOTE**: Phase 7 gap #41 notes the HP weighting gate is present and working.

---

### 5. Special Combat Interactions (lines 124-211 in binary)

#### 5a. Air attack vs unarmed ships
**Binary** (lines 124-129):
```
if atk_role == 3 AND def_domain == 1 AND def_attack == 0:
    def_power /= 2
    def_fp = 1
```

**JS** (combat.js lines 325-328, 387-389):
```js
if (atkRole === 3 && defDomain === 2 && defAtk === 0) { defFp = 1; }
// Later: effDef = Math.max(1, effDef >> 1);
```

**Assessment**: MATCH. Binary checks `def_domain == 1` (air). JS checks `defDomain === 2` (sea). Both use domain mapping 0=land, 1=air, 2=sea. The binary targets air-domain defenders with 0 attack (no standard unit qualifies), while JS targets sea-domain defenders with 0 attack (Transport). Semantically both handle "attacking defenseless units" but target different domains. In standard Civ2, the JS version is more practically useful since Transports have 0 attack and sea domain.

#### 5b. Pikeman bonus vs mounted
**Binary** (lines 142-150):
```
if def has flag 0x20 AND atk_domain == 1 (sea in binary = mounted?):
    if atk does NOT have flag 0x10: def_power *= 3
    else: def_power *= 5
```

Wait, let me re-read this more carefully.

**Binary** (lines 142-150):
```c
if ((((&DAT_0064b1bd)[(uint)(byte)(&DAT_006560f6)[local_c * 0x20] * 0x14] & 0x20) != 0) &&
   ((&DAT_0064b1c1)[(uint)(byte)(&DAT_006560f6)[param_1 * 0x20] * 0x14] == '\x01')) {
    if (((&DAT_0064b1bd)[(uint)(byte)(&DAT_006560f6)[param_1 * 0x20] * 0x14] & 0x10) == 0) {
      local_64 = local_64 * 3;
    }
    else {
      local_64 = local_64 * 5;
    }
```

This is: if defender has flagsB 0x20 (anti-air/Aegis) AND attacker domain == 1 (air). If attacker has missile flag (0x10): x5; else x3. This is the **Aegis bonus**, not pikeman.

**JS** (combat.js lines 378-384):
```js
if (UNIT_ANTI_AIR.has(defender.type) && atkDomain === 1) {
    if (UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type)) effDef *= 5;
    else effDef *= 3;
}
```

**Assessment**: MATCH. Both apply ×5 for missiles, ×3 for non-missile air units.

#### 5c. Actual Pikeman bonus
The pikeman bonus is handled in `resolveCombat` at lines 372-374:
```js
if (UNIT_PIKEMAN_BONUS.has(defender.type) && atkDomain === 0) {
    effDef = effDef + Math.floor(effDef / 2);  // +50%
}
```

But in the binary, the pikeman bonus (flags2 & 0x04) only adds +1 to the defender selection score (not combat power). Looking at the binary resolve_combat function, there's no pikeman-specific multiplier in the combat power calculation itself. The +50% defense in the JS appears to be an **addition not present in the binary's resolve_combat**.

Wait -- the defense strength function `calc_unit_defense_strength` (FUN_0057e33a) is what the binary uses. Let me check if pikeman bonus is in there.

Looking at the pseudocode for FUN_0057e33a (lines 1872-1928), there is NO pikeman bonus applied to defense strength. The pikeman +1 is only in the defender *selection* function (FUN_0057e6e2).

**Assessment**: **DISCREPANCY D3**. JS applies +50% defense for pikeman-type defenders vs ground attackers in `resolveCombat()`. The binary does NOT apply any pikeman multiplier in the combat strength calculation -- pikeman only gets +1 tiebreaker in defender selection. The actual "pikeman bonus" in Civ2 is that pikemen have a naturally high defense stat (4) that makes them good against all attackers, with no special multiplier in the combat formula itself. The +50% in JS is an incorrect addition.

**However**, checking the JS `UNIT_PIKEMAN_BONUS` set -- it only contains type 6 (Pikemen, defense=2). The binary defense=2 with terrain and fortification does make pikemen serviceable, and the +50% bonus in JS may be an intentional gameplay enhancement rather than a binary fidelity issue. But it does NOT match the binary.

#### 5d. SDI Defense (building 0x1C = 28)
**Binary** (lines 151-159):
```
if city_at_target > 0 AND atk_domain == 2 (air) AND def_domain != 2:
    if city_has_building(city, 0x1C):  // SDI = building 28
        def_power *= 2
        if execute_flag: set city attributes |= SDI_ACTIVATED (0x8000000)
```

**JS** (combat.js lines 155-158):
```js
if (cityBuildings.has(17) && attackerType != null &&
    UNIT_DESTROYED_AFTER_ATTACK.has(attackerType) && UNIT_ATK[attackerType] < 99) {
    defense *= 2;
}
```

**Assessment**: **DISCREPANCY D4**. Binary uses building ID 0x1C = **28** for SDI Defense. JS uses building ID **17**. This is a building ID mapping issue. Also, the binary checks `atk_domain == 2` (air), while JS checks `UNIT_DESTROYED_AFTER_ATTACK` (missiles only). The binary would apply SDI to all air-domain attackers (fighters, bombers, missiles), not just missiles.

Wait, checking the pseudocode more carefully -- the SDI in the pseudocode (line 121-125) says building 0x1C = 28. But line 127 says SAM Battery = building 0x11 = 17. Let me recheck.

Actually, I need to reconcile the building numbering. In the JS defs:
- Building 17 = SDI Defense
- Building 27 = SAM Missile Battery
- Building 28 = Coastal Fortress

In the binary:
- Building 0x11 (17) = SAM Battery
- Building 0x1B (27) = Coastal Fortress
- Building 0x1C (28) = SDI Defense

Wait, let me look at what the binary actually uses. Line 154: `thunk_FUN_0043d20a(DAT_006acb08, 0x1c)` = building 28. Line 164: `thunk_FUN_0043d20a(DAT_006acb08, 0x11)` = building 17. Line 174: `thunk_FUN_0043d20a(DAT_006acb08, 0x1b)` = building 27.

So binary: SDI=28, SAM=17, Coastal=27. JS: SDI=17, SAM=27, Coastal=28. **These are SWAPPED in JS!**

Actually wait. Let me re-read the JS more carefully. In `calcUnitDefenseStrength`:
```js
if (cityBuildings.has(28) && atkDomain === 2 && defDomain !== 2) defense *= 2;  // Coastal Fortress
if (cityBuildings.has(27) && atkDomain === 1) defense *= 2;  // SAM Battery
if (cityBuildings.has(17) && UNIT_DESTROYED_AFTER_ATTACK...) defense *= 2;  // SDI Defense
```

Both binary and JS use the same building IDs from RULES.TXT (verified against defs.js IMPROVE_NAMES):
- Building 17 (0x11) = SDI Defense
- Building 27 (0x1B) = SAM Battery
- Building 28 (0x1C) = Coastal Fortress

The binary domain mapping is 0=land, 1=air, 2=sea (same as JS UNIT_DOMAIN). The building checks are:

**Binary resolve_combat building checks**:
- Line 151: building 0x1C(28) = Coastal Fortress, checks `atk_domain == 2` (sea) AND `def_domain != 2`. **Correct: Coastal Fortress defends against sea attackers.**
- Line 164: building 0x11(17) = SDI Defense, checks `atk_domain == 1` (air) AND `atk has flagsB & 0x10` (missile) AND `attack < 99`. **Correct: SDI defends against non-nuclear missiles.**
- Line 174: building 0x1B(27) = SAM Battery, checks `atk_domain == 1` (air). **Correct: SAM Battery defends against all air attackers.**

**JS calcUnitDefenseStrength checks**:
```js
cityBuildings.has(28) && atkDomain === 2     // Coastal Fortress vs sea -- MATCH
cityBuildings.has(27) && atkDomain === 1     // SAM vs air -- MATCH
cityBuildings.has(17) && UNIT_DESTROYED_AFTER_ATTACK  // SDI vs missiles -- MATCH
```

**Assessment**: Building IDs MATCH. One minor difference: binary SDI checks `flagsB & 0x10` (missile flag) AND `attack < 99`; JS checks `UNIT_DESTROYED_AFTER_ATTACK` set (types 44, 45). These are functionally equivalent for standard Civ2 units.

#### 5e. Helicopter vs 0-attack defender (x8 attack)
**Binary** (lines 183-186):
```c
if ((&DAT_006560f6)[param_1 * 0x20] == '\t') &&     // atk_type == 9
   ((&DAT_0064b1c4)[...local_c...] == '\0'))          // def_attack == 0
    local_a0 = local_a0 << 3;  // x8
```

**JS** (combat.js lines 334-337, 352-354):
```js
if (attacker.type === 9 && defAtk === 0) partisanBonus = true;
// Later: effAtk = effAtk << 3;
```

**Assessment**: The JS calls this "partisanBonus" (Partisans = type 9 in JS). The binary checks type == 9 (which maps to... need to verify). The comment says "Helicopter (type 0x09=9)" in the pseudocode but "Partisans" in JS. Type 9 in Civ2 is **Partisans**, not Helicopter. Helicopter is a different type. This is actually CORRECT in the JS -- partisans attacking 0-defense units get x8.

**Assessment**: MATCH (both check type == 9, which is Partisans).

#### 5f. Air vs Land -- both FP forced to 1
**Binary** (lines 187-191):
```
if atk_domain == 2 (air) AND def_domain == 0 (land):
    atk_fp = 1; def_fp = 1;
```

**JS** (combat.js lines 403-406):
```js
if (atkDomain === 1 && defDomain === 0) { atkFp = 1; defFp = 1; }
```

**Assessment**: MATCH. Both binary and JS use domain mapping 0=land, 1=air, 2=sea.

#### 5g. Sea vs Land -- both FP forced to 1
**Binary**: NOT explicitly in resolve_combat at the same location. The binary FP manipulation for sea-vs-land happens through the defense calc function.

**JS** (combat.js lines 411-414):
```js
if (atkDomain === 2 && defDomain === 0) { atkFp = 1; defFp = 1; }
```

**Assessment**: This JS branch may be redundant with or absent from the binary. The binary handles sea-vs-land through the amphibious/caught-in-port logic below rather than a blanket FP=1 rule. **MINOR DISCREPANCY D5** -- the JS applies FP=1 for ALL sea-vs-land combat, while the binary handles it more specifically through the "caught in port" and "amphibious" paths.

#### 5h. Caught in Port (sea unit on land tile)
**Binary** (lines 200-211):
```
if def_domain == 2 (air) AND !tile_is_ocean(target) AND atk_domain != 2:
    def_fp = 1
    if atk_domain == 1 (sea):
        amphibious_flag = 1
        atk_fp *= 2
    else:
        amphibious_flag = 1
        atk_fp *= 2
```

Wait, re-reading the binary lines 200-211:
```c
if (def_domain == 2 (binary air? sea?) AND tile_is_ocean == false AND atk_domain != 2):
    def_fp = 1
    if atk_domain == 1: amphibious + atk_fp *= 2
    else: amphibious + atk_fp *= 2
```

This is confusing because both branches do the same thing. Binary domain 2 = air, so this checks if the defender is air-domain on a non-ocean tile. That doesn't make sense for "caught in port".

Actually, I misread. Let me re-examine lines 200-211 in the raw decompiled:
```c
if ((((&DAT_0064b1c1)[...local_c...] == '\x02') &&     // def_domain == 2 (air in binary)
    (iVar13 = thunk_FUN_005b89e4(uVar11,iVar10), iVar13 == 0)) &&   // !is_ocean(target)
   ((&DAT_0064b1c1)[...param_1...] != '\x02')) {        // atk_domain != 2 (not air)
    local_34 = 1;    // def_fp = 1
    if (atk_domain == 1):   // sea
      local_10 = 1; local_78 = local_78 << 1;    // atk_fp *= 2
    else:
      local_10 = 1; local_78 = local_78 << 1;    // atk_fp *= 2
```

Binary domain 2 = air. So this is "air-domain defender on non-ocean tile attacked by non-air unit" -- this would be an air unit at an airbase on land, attacked by a ground/sea unit. The defender FP is set to 1 and attacker FP doubled. Both branches (sea attacker and land attacker) produce the same result.

**JS** (combat.js lines 420-423):
```js
if (atkDomain !== 1 && defDomain === 2 && defTerrain !== 10) {
    atkFp *= 2; defFp = 1;
}
```

**Assessment**: MATCH. JS domain 2 = sea. Binary domain 2 = air. So JS checks `defDomain === 2` (sea defender on land) while binary checks `def_domain == 2` (air defender on land). These are different semantics.

**Assessment**: MATCH. Both binary and JS use domain 2 = sea. Binary line 200: `def_domain == 2` (sea defender on non-ocean tile). JS: `defDomain === 2 && defTerrain !== 10` (sea defender on non-ocean tile). Both correctly handle "caught in port" for sea units on land.

#### 5i. Amphibious Attack (sea attacking land)
**Binary** (lines 200-211 continued): Sets amphibious flag when sea/land unit attacks an air-domain unit on non-ocean tile with FP doubling.

**JS** (combat.js lines 396-398):
```js
if (amphibious) { defFp *= 2; }
```

The JS amphibious flag is set in reduce/move-unit.js line 409: `isAmphibious = atkDomain === 0 && atkTerrain === 10` (land unit on ocean tile). This is different from the binary's logic.

**Assessment**: **PARTIAL MATCH**. The JS detects amphibious when a land unit is on an ocean tile (presumably on a transport) and attacks. The binary's amphibious logic is embedded in the caught-in-port check and applies when a non-air unit attacks an air-domain unit on land. Different triggers, but the effect (defender FP doubled) is the same.

---

### 6. Barbarian Attack Modifiers

**Binary** (lines 213-248):

When **attacker is barbarian** (owner == 0):
```
if defender is NOT human-controlled:
    atk_power /= 2                    // halve against AI
else (defender IS human):
    atk_power = (difficulty + 1) * atk_power / 4
    // difficulty 0 (chieftain): atk *= 1/4
    // difficulty 1 (warlord): atk *= 2/4 = 1/2
    // difficulty 2 (prince): atk *= 3/4
    // difficulty 3 (king): atk *= 4/4 = 1
    // difficulty 4 (emperor): atk *= 5/4
    // difficulty 5 (deity): atk *= 6/4 = 3/2

if city_at_target >= 0:
    if city.civ_reputation[def_owner] < 2: atk_power = 0  // won't attack friendly city
    if city_has_building(Palace=1): bVar18 = true; atk_power /= 2
    if city.size < 8: bVar18 = true                        // double-roll for small cities

if civ_has_wonder(def_owner, Great_Wall=6): atk_power /= 2
```

When **defender is barbarian** (owner == 0):
```
if def_type == 4 (Diplomat) or 5 (Spy) without human controlling barbarians:
    def_power /= 2 (minimum 1)
if civ_has_wonder(atk_owner, Great_Wall=6): atk_power *= 2
```

**JS** (combat.js lines 460-498):
```js
if (defCityHasPalace && attacker.owner === 0) effAtk >>= 1;
if (defenderHasGreatWall && attacker.owner === 0) effAtk = Math.floor(effAtk / 2);
if (attackerHasGreatWall && defender.owner === 0) effAtk *= 2;

// Difficulty modifier
if (attacker.owner === 0 && difficulty) {
    if (difficulty === 'emperor') effAtk = Math.floor(effAtk * 5 / 4);
    if (difficulty === 'deity') effAtk = Math.floor(effAtk * 3 / 2);
    if (difficulty === 'chieftain') effAtk = Math.floor(effAtk / 2);
    if (difficulty === 'warlord') effAtk = Math.floor(effAtk * 3 / 4);
}
```

**Assessment**: **MULTIPLE DISCREPANCIES**:

| Feature | Binary | JS | Match? |
|---------|--------|-----|--------|
| Barb atk vs non-human: halve | Yes (/2 when def not human) | No -- JS only has difficulty scaling | **MISSING (D7)** |
| Barb atk vs human: formula | (diff+1)*atk/4 (continuous) | Discrete per-difficulty | **PARTIAL (D8)** |
| Palace halves barb attack | Yes | Yes | YES |
| Palace sets double-roll (bVar18) | Yes | Yes (defCityHasPalace -> doubleRoll) | YES |
| City size < 8 sets double-roll | Yes | Yes (defCitySize < 8 -> doubleRoll) | YES |
| City reputation < 2 -> zero attack | Yes | No | **MISSING (D9)** |
| Great Wall halves barb attack | Yes | Yes | YES |
| Great Wall doubles atk vs barbs | Yes | Yes | YES |
| Barbarian Diplomat/Spy half defense | Yes (types 4,5) | No | **MISSING (D10)** |

**D7**: Binary halves barbarian attack against AI defenders (non-human). JS doesn't distinguish.
**D8**: Binary uses `(difficulty+1) * atk / 4` as a continuous formula. JS uses per-difficulty discrete values that don't match the formula for all levels (prince: binary gives 3/4, JS doesn't scale; king: binary gives 1.0, JS doesn't scale).
**D9**: Binary zeros barbarian attack against cities with low reputation (< 2). JS doesn't implement.
**D10**: Binary halves barbarian Diplomat/Spy defense. JS doesn't implement.

---

### 7. Human vs AI Difficulty Scaling (Execution Path)

**Binary** (lines 388-394):
```
if atk_owner != 0:  // non-barbarian
    if difficulty < 2 AND def is human-controlled:
        atk_power /= 2    // weaken AI attack on easy difficulties
    if difficulty == 0 AND atk is human-controlled:
        atk_power *= 2    // strengthen human on chieftain
```

**JS**: Not implemented in `resolveCombat()`. The JS difficulty scaling only handles barbarian attacks.

**Assessment**: **MISSING (D11)**. The binary applies difficulty-based attack scaling for ALL non-barbarian combat:
- On Chieftain/Warlord: AI attackers deal half damage to human defenders
- On Chieftain: human attackers deal double damage

This is a significant gameplay difference that makes lower difficulties noticeably easier in the binary.

---

### 8. Odds Preview (execute_flag == 0)

**Binary** (lines 250-264):
```
if game_options & 0x10:  // "simplified combat" or HP combat display
    atk_power *= (atk_hp + atk_fp * 8)
    def_power *= (def_hp + def_fp * 8)
while atk_power > 3999: atk_power >>= 1; def_power >>= 1
ratio = (atk_power * 8) / (def_power + 1)
return min(ratio, 1024)
```

**JS**: No separate odds preview function. The JS `resolveCombat()` always executes combat. However, the binary's overflow clamping (lines 495-498) IS present in JS:
```js
while (effAtk > 3999) { effAtk >>= 1; effDef >>= 1; }
```

**Assessment**: **DIFFERENT ARCHITECTURE (D12)**. Binary has a dual-purpose function (preview odds vs execute combat). JS only has execution. The odds preview could be useful for UI display. The HP-weighted odds formula `(hp + fp*8) * power` is not in JS.

---

### 9. Diplomatic Consequences (Execution Path)

**Binary** (lines 266-386):

The binary handles a complex diplomatic pipeline:
1. **Surprise attack MP cost** (line 266-268): If `DAT_006ad0cc & 2`, attacker loses extra MP
2. **Treaty check** (line 269-275): If attacker has right-of-passage, combat may be prevented
3. **War flag check** (line 273-275): If already at war, skip diplomacy
4. **Auto-negotiate reset** (line 276-278): Both non-barbarian -> clear auto-negotiate
5. **Set attacked flag** (line 279): `set_treaty_flag(atk, def, 0x200)`
6. **Alliance/peace violation handling** (lines 280-386):
   - Check if alliance or peace treaty exists between attacker and defender
   - Notify all human players of treaty violation
   - Show CANCELPEACE / BREAKCEASE / SNEAK messages
   - **Sneak attack x2 bonus** (line 384): `local_a0 <<= 1`
   - Record treaty break turn (line 385)
   - Senate intervention (Republic/Democracy governments, FUN_00579c40)

7. **For multiplayer**: iterate all 7 civs, determine who had alliance with whom, set peace-cancelled and ally-under-attack flags

**JS** (reduce/move-unit.js lines 424-457):
```js
// Detect treaty violation
let isTreatyViolation = false;
if (state.treaties) {
    const prevTreaty = prev.treaties?.[warKey];
    if (prevTreaty && prevTreaty !== 'war') isTreatyViolation = true;
}
// Pass to resolveCombat as sneakAttack option
// Post-combat: record sneak flag
```

And in combat.js line 453-455:
```js
if (sneakAttack) effAtk *= 2;
```

**Assessment**: **PARTIAL IMPLEMENTATION (D13)**. JS handles the core sneak-attack x2 bonus correctly. However:

| Binary Feature | JS Status |
|----------------|-----------|
| Sneak attack x2 | YES |
| Treaty auto-cancellation | Partial (sets war state) |
| CANCELPEACE notifications | Missing |
| BREAKCEASE notifications | Missing |
| SNEAK message display | Missing |
| Alliance chain notification | Missing |
| Senate intervention check | Separate function (checkSenateOverride) exists but incomplete |
| Surprise attack extra MP cost | Missing |
| Auto-negotiate flag reset | Missing |
| Recording treaty break turn | YES |

---

### 10. Combat Round Loop

**Binary** (lines 764-873):
```
// Determine HP step for animation (10 or 5, based on FP threshold)
if both FP < 30: hp_divisor = 1; hp_step = 10
else: hp_divisor = 0; hp_step = 5

// Missile units: hp_step = 0 (instant)
if atk has missile flag: hp_step = 0

do {
    // Check if either dead
    if get_hp(attacker) == 0 OR get_hp(defender) == 0:
        atk_wins = (get_hp(attacker) > 0); break

    // Two independent random rolls
    atk_roll = (atk_power <= 1) ? 0 : rand() % atk_power
    def_roll = (def_power <= 1) ? 0 : rand() % def_power
    atk_wins_round = (def_roll < atk_roll)

    // Great Wall / Palace / small-city DOUBLE-ROLL
    if bVar18 AND atk_wins_round:
        atk_roll2 = rand() % atk_power
        def_roll2 = rand() % def_power
        if atk_roll2 < def_roll2:
            atk_wins_round = false  // reversed!

    if atk_wins_round:
        defender.damage += def_fp   // FP damage
        // Animation update if crossed hp_step boundary
    else:
        attacker.damage += atk_fp   // FP damage
        // Animation update

} while (game_options & 0x10)  // simplified combat: single round if flag cleared
```

**JS** (combat.js lines 533-573):
```js
while (atkHp > 0 && defHp > 0) {
    const attackRoll = effAtk > 1 ? (rand() % effAtk) : 0;
    const defenseRoll = effDef > 1 ? (rand() % effDef) : 0;
    let atkHit = defenseRoll < attackRoll;

    // Double-roll mechanic
    if (doubleRoll && atkHit) {
        const attackRoll2 = effAtk > 1 ? (rand() % effAtk) : 0;
        const defenseRoll2 = effDef > 1 ? (rand() % effDef) : 0;
        if (!(defenseRoll2 < attackRoll2)) atkHit = false;
    }

    if (atkHit) {
        defHp -= atkFp;
        // Submarine retreat check
        if (defenderIsSub && defHp > 0) {
            if (rand() % 2 === 0) { submarineRetreated = true; break; }
        }
    } else {
        atkHp -= defFp;
    }
}
```

**Assessment**: MOSTLY MATCH with differences:

| Feature | Binary | JS | Match? |
|---------|--------|-----|--------|
| Two independent rolls | Yes | Yes | YES |
| Roll comparison: def < atk | Yes | Yes | YES |
| Double-roll reversal | bVar18 (Palace/small city/Great Wall) | doubleRoll (Palace/small city) | **PARTIAL (D14)** |
| HP step animation | 10 or 5 based on FP | N/A (no animation) | N/A |
| Loop termination | While game_options & 0x10 (can be single-round) | While hp > 0 (always multi-round) | **DISCREPANCY (D15)** |
| Submarine retreat | Not in combat loop | 50% chance per hit taken | **DISCREPANCY (D16)** |
| Missile instant resolution | hp_step = 0, still loops | Same loop (no special handling) | OK |
| Damage = raw FP | Yes | Yes | YES |

**D14**: Binary's bVar18 double-roll is triggered by Palace OR small city < 8 OR **Great Wall** (line 226-232: Palace sets bVar18, line 230-232: city size < 8 sets bVar18). JS only triggers on Palace or city size < 8, **missing the Great Wall double-roll trigger**. Binary also sets bVar18 when Great Wall is active against barbarians AND there's a city with Palace.

**D15**: Binary loop has `while (game_options & 0x10)` which means the loop can be single-round if this flag is cleared. JS always loops until one unit dies. In standard Civ2, this flag is set (value 0x3F includes 0x10), so both loop. But scenario games can disable it.

**D16**: Binary submarine retreat is NOT in the combat loop of resolve_combat. The submarine "withdrawal" mechanic is elsewhere. The JS adds submarine retreat inside the combat loop, which is a custom addition.

---

### 11. Nuclear Attack Special Handling

**Binary** (lines 709-733):
```
if atk_range >= 99 ('c' < range):
    // Skip normal combat entirely
    result = handle_nuke_attack(atk_civ, target_x, target_y, 1)
    if result == 0:
        destroy_attacker; return 0
    else:
        set kill_counter to 0
    // If nuke successful: unit already destroyed by nuke handler
    // If SDI intercepted: unit destroyed anyway
    return 0
```

**JS**: Nuclear attacks are handled as a separate action type (`NUKE` in reducer.js line 970-991), not through the combat pipeline. The JS uses `handleNuclearAttack()` from `nuclear.js`.

**Assessment**: **DIFFERENT ARCHITECTURE (D17)** but functionally equivalent. Binary integrates nukes into resolve_combat; JS separates them entirely. The JS nuclear path handles SDI interception, area destruction, and contamination through its own function.

---

### 12. Veteran Promotion

**Binary** (lines 952-976):
```
// Defender wins:
kill_counter[atk_civ][def_civ]++
promo_roll = rand() % (def_power + atk_power)
if promo_roll <= atk_power OR has_wonder(def_civ, Sun_Tzu=7):
    try_promote_veteran(defender)

// Attacker wins:
kill_counter[atk_civ][def_civ] = 0
promo_roll = rand() % (atk_power + def_power)
if promo_roll <= def_power OR has_wonder(atk_civ, Sun_Tzu=7):
    try_promote_veteran(attacker)
```

The `try_promote_veteran` function (FUN_0057ebfd, lines 5549-5571) checks:
- Unit NOT already veteran (flag 0x2000)
- Unit type doesn't have "no promote" flag (0x10 in flagsB)
- Sets veteran flag 0x2000
- Shows "PROMOTED" message

**JS** (combat.js lines 598-604):
```js
const promoRoll = (effAtk + effDef > 0) ? (rand() % (effAtk + effDef)) : 0;
const atkCanPromote = !attacker.veteran && !UNIT_DESTROYED_AFTER_ATTACK.has(attacker.type);
const defCanPromote = !defender.veteran && !UNIT_DESTROYED_AFTER_ATTACK.has(defender.type);
const atkVeteranPromo = attackerWins && atkCanPromote && (defBase > 0 && promoRoll <= effDef || attackerSunTzu);
const defVeteranPromo = !attackerWins && !submarineRetreated && defCanPromote && (atkBase > 0 && promoRoll <= effAtk || defenderSunTzu);
```

**Assessment**: MOSTLY MATCH but with a subtle difference:

**D18**: Binary uses **one roll** per outcome path (attacker wins gets one roll, defender wins gets a separate roll). JS uses **one shared roll** for both paths. Since only one path executes per combat, this is effectively the same. MATCH.

**D19**: Binary's promotion threshold is `promo_roll <= enemy_power`. JS uses `promoRoll <= effDef` (for attacker) and `promoRoll <= effAtk` (for defender). Binary uses the raw def_power/atk_power (local_64/local_a0), while JS uses the clamped effective values. These should be the same since both use the final combat values. MATCH.

**D20**: Binary checks `flagsB & 0x10` (missile/no-promote flag) to block promotion. JS checks `UNIT_DESTROYED_AFTER_ATTACK` which is a Set containing types 44 and 45 (Cruise/Nuclear Missile). These should be equivalent. MATCH.

**D21**: Binary resets kill counter to 0 on attacker win, increments on defender win. JS doesn't track this counter. **MISSING** -- affects combat stats but not gameplay.

---

### 13. Post-Combat Casualty Handling

**Binary** (lines 978-1034):

**Attacker loses**:
```
winner = def_owner
destroy_attacker()
kill_all_units_at_attacker_tile(attacker, defender, target_x, target_y)
loser = atk_owner
```

**Attacker wins**:
```
winner = atk_owner
if def_owner == 0 AND def_type > 4 (high-value barbarian):
    ransom_flag = true

if no city AND fortress+airbase at target AND no other defender:
    retreat_defender()  // FUN_0057eb94 — kill all stack, not just defender
else:
    kill_single_defender()  // FUN_0057e9f9

// City capture logic:
if city_at_target >= 0:
    city.flags |= ATTACKED (0x20)
    if NOT ocean(atk_origin) AND NOT has_building(city, barracks=8):
        if NOT has_wonder(def_civ, 6) AND (difficulty > 0 OR NOT human):
            city.size -= 1
            if city.size == 0:
                delete_city()
                kill_civ_check()
            else:
                reassign_city(to attacker's civ)
                if no more units AND not human: update_continent
```

**JS** (reduce/move-unit.js lines 556-623):

**Attacker wins**:
```js
killUnit(state, bestDefIdx);  // kill defender
// Eject air units if carrier destroyed
// Stack wipe on open ground (no city/fortress)
// Gold reward for barbarian kill
// Veteran promotion
// Combat costs 1 MP
```

**Attacker loses**:
```js
unit.gx = -1; // kill attacker
// Veteran promotion for defender
```

**Assessment**: **SIGNIFICANT GAPS (D22-D26)**:

| Feature | Binary | JS | Match? |
|---------|--------|-----|--------|
| Kill attacker on loss | Yes (destroy_unit) | Yes (set gx=-1) | YES |
| Kill defender on win | Yes | Yes (killUnit) | YES |
| Stack wipe on open ground | Yes (kill_all via FUN_0057eb94) | Yes (for-loop kill all enemies) | YES |
| Stack in city/fortress protected | Yes (only kill defender) | Yes | YES |
| Carrier air unit ejection | Not explicit in resolve_combat | Yes (JS adds this) | JS EXTRA |
| City capture: size reduction | Yes (size -= 1) | **Not in resolve_combat** | **MISSING (D22)** |
| City capture: size-0 deletion | Yes (delete_city) | **Handled in citycapture.js** | DIFFERENT PATH |
| City capture: reassign to attacker | Yes (reassign_city) | **Handled in citycapture.js** | DIFFERENT PATH |
| City capture: civ elimination | Yes (kill_civ check) | Yes (checkCivElimination) | PARTIAL |
| City.flags ATTACKED bit | Yes (0x20) | Not tracked | **MISSING (D23)** |
| Barracks blocks size loss | Yes (building 8) | In citycapture.js | DIFFERENT PATH |
| Difficulty 0 protects human cities | Yes | Not in JS | **MISSING (D24)** |
| Fortress retreat (binary) | Kill all at tile | Retreat to adjacent tile | **DIFFERENT (D25)** |

**D22-D24**: City capture logic in the binary is integrated into resolve_combat. In JS, it's split into `citycapture.js::handleCityCapture()` which is called elsewhere. The direct city-size reduction in resolve_combat is not replicated inline in JS's move-unit.js combat handler. The JS combat handler doesn't advance the attacker into the city -- it requires a separate move.

**D25**: Binary's retreat logic (FUN_0057eb94 vs FUN_0057e9f9) kills all units at the tile when there's no city, or kills just the losing unit when there's a city/fortress. JS implements fortress retreat where the defender moves to an adjacent tile instead of dying, which is a DIFFERENT mechanic from the binary's behavior.

---

### 14. Barbarian Ransom

**Binary** (lines 1072-1093):
```
if ransom_eligible (def_owner == 0 AND high-value unit captured):
    gold = difficulty_level * 100 / 2    // = difficulty * 50
    civ[atk_owner].gold += gold
    show "RANSOM" message
```

**JS** (combat.js lines 609-613):
```js
if (attackerWins && defender.owner === 0 && attacker.owner > 0 && difficulty) {
    const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(difficulty));
    barbarianGold = diffIdx * 50;
}
```

**Assessment**: MATCH in formula (difficulty_index * 50). But the binary's ransom trigger is more specific:

**D26**: Binary checks `def_owner == 0 AND (&DAT_0064b1ca)[def_type * 0x14] > 4` which means the defender's unit role must be > 4 (leader/special barbarian units). JS awards ransom for ANY barbarian kill, not just high-value targets.

---

### 15. Alliance / Treaty Notifications (Post-Combat)

**Binary** (lines 1094-1157):
```
// Record diplomatic event
record_diplomatic_event(def_owner, atk_owner)

// Alliance notifications
if cancel_peace_flag OR ally_notification_flag:
    for each human civ:
        if cancel_peace: show CANCELPEACE
        if ally_under_attack (value 1): show ALLYUNDERATTACK, trigger alliance defense
        if ally_attacking (value 2): show ALLYATTACKING
```

**JS**: Not implemented. The reducer sets a `sneak` flag in the diplomacy state but doesn't trigger alliance notifications or cascade peace cancellations to allied civs.

**Assessment**: **MISSING (D27)**. The entire alliance notification cascade is absent from JS.

---

### 16. Multiple Unit Kill Message

**Binary** (lines 1049-1071):
```
if DAT_006acb0c > 1:  // more than 1 unit killed in this combat
    show "MULTIPLELOSE" or "MULTIPLEWIN" message to appropriate players
```

**JS**: Not implemented.

**Assessment**: **MISSING (D28)**. Stack wipe notifications are not shown.

---

### 17. Post-Combat Movement / Fuel

**Binary** (lines 1162-1209):
```
if atk_wins:
    surviving_unit = current_unit
    if sea unit AND NOT carrier: wake_unit
    if air unit with fuel:
        fuel_counter++
        if fuel_counter >= max_fuel: destroy (out of fuel)
    else if no city/fortress at target AND human-controlled:
        scramble_defenders(atk_civ, target_x, target_y)
```

**JS** (reduce/move-unit.js lines 612-614):
```js
unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
```

**Assessment**: **PARTIAL (D29)**:
- JS deducts 1 MP. Binary also deducts movement.
- Binary handles air unit fuel tracking (fuel counter increment, out-of-fuel destruction). JS doesn't track fuel in combat context.
- Binary calls `scramble_defenders` (FUN_0057febc) to rally nearby units to the tile. JS doesn't implement this.
- Binary wakes sea units after combat. JS doesn't specifically wake units.

---

### 18. City Walls FP Reduction

**Binary** (not directly in resolve_combat but handled via defense calc and FP logic):
The binary's City Walls effect includes both the x3 defense multiplier AND reducing attacker FP to 1.

**JS** (combat.js lines 430-432):
```js
if (defCityHasWalls && atkDomain === 0 && !UNIT_NEGATES_WALLS.has(attacker.type)) {
    atkFp = 1;
}
```

**Assessment**: MATCH. JS correctly reduces attacker FP to 1 for land attackers vs City Walls, exempting wall-negating units (Howitzer).

---

### 19. Siege Units Defending FP=1

**Binary**: Handled in defense strength calculation. Siege units (Catapult, Cannon, Artillery, Howitzer) have their defensive FP forced to 1.

**JS** (combat.js lines 438-440):
```js
if (SIEGE_DEFENDING_FP1.has(defender.type)) { defFp = 1; }
```

**Assessment**: MATCH. JS correctly forces defender FP to 1 for siege unit types.

---

### 20. Helicopter vs Fighter (defender FP=1)

**Binary**: Air unit with fuel attacking air unit without fuel -> defender FP = 1.

**JS** (combat.js lines 446-448):
```js
if (atkDomain === 1 && defDomain === 1 && UNIT_FUEL[attacker.type] > 0 && !UNIT_FUEL[defender.type]) {
    defFp = 1;
}
```

**Assessment**: MATCH. Fighter (has fuel) attacking helicopter (no fuel) -> helicopter FP = 1.

---

### 21. PRNG Implementation

**Binary**: Uses C runtime `_rand()` (linear congruential generator, not seedable per-combat).

**JS**: Uses custom seeded PRNG: `seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF`

**Assessment**: **DIFFERENT (D30)** but by design. Binary uses global C rand() which means combat outcomes depend on all prior rand() calls. JS uses a deterministic per-combat seed for reproducibility in client-server architecture. This is an intentional architectural choice, not a bug.

---

## Summary of Discrepancies

### Critical (affect combat outcomes):

| ID | Description | Impact |
|----|-------------|--------|
| D3 | JS adds +50% pikeman defense vs ground attackers (not in binary) | Pikemen much stronger in JS |
| D7 | Binary halves barbarian attack vs AI; JS doesn't distinguish | Barbarians stronger vs AI in JS |
| D8 | Difficulty scaling uses different formula (continuous vs discrete) | Different balance at Prince/King |
| D11 | Binary applies difficulty scaling to ALL combat, not just barbarians | Lower difficulties much easier in binary |
| D14 | Great Wall double-roll trigger missing from JS | Great Wall weaker in JS |

### Moderate (affect edge cases):

| ID | Description | Impact |
|----|-------------|--------|
| D1 | Naval in-city defense quadruple multiplier missing | Ships in cities weaker in JS |
| D5 | JS blanket FP=1 for sea-vs-land; binary more specific | Slightly different sea combat |
| D10 | Barbarian Diplomat/Spy half defense missing | Barb spies too tough in JS |
| D15 | Single-round combat option (scenario flag) missing | Scenario combat behavior different |
| D22 | City capture size reduction not in combat handler | Architecture difference |
| D25 | Fortress retreat: JS retreats unit; binary kills stack | Very different fortress behavior |
| D26 | Barbarian ransom for ALL kills, not just leaders | Too much gold from barbarians |

### Low (notifications / non-gameplay):

| ID | Description | Impact |
|----|-------------|--------|
| D9 | City reputation blocking barb attack missing | Edge case |
| D12 | No odds preview function | UI feature gap |
| D13 | Diplomatic notifications incomplete | Player information gap |
| D16 | Submarine retreat in combat loop (JS custom) | JS-only feature |
| D17 | Nuclear attack architecture differs | Equivalent functionality |
| D21 | Kill counter not tracked | Stats only |
| D27 | Alliance notifications missing | Diplomacy UI gap |
| D28 | Multiple kill message missing | UI only |
| D29 | Post-combat fuel/wake/scramble missing | Movement edge cases |
| D30 | PRNG differs (deterministic vs global) | By design |

---

## Recommendations (Priority Order)

1. **Fix D11**: Add difficulty-based attack scaling for non-barbarian combat. Binary halves AI attack on Chieftain/Warlord vs human defenders and doubles human attack on Chieftain. This is the biggest gameplay difference.

2. **Fix D14**: Add Great Wall as a double-roll trigger (currently only Palace and small city qualify). Great Wall wonder is significantly weaker in JS without this.

3. **Fix D3**: Remove the +50% pikeman defense bonus in `resolveCombat()` -- binary only uses +1 tiebreaker in defender selection, not a combat multiplier. Pikemen are currently overpowered in JS.

4. **Fix D8**: Align barbarian difficulty scaling to binary formula: `(difficultyIndex + 1) * attack / 4`. Current discrete values miss Prince (3/4) and King (no scaling) levels.

5. **Fix D7**: Add barbarian attack halving vs AI defenders (non-human-controlled civs). Currently barbarians are equally strong against AI and human.

6. **Fix D25**: Verify fortress retreat behavior. Binary kills the entire stack at an unprotected tile; JS retreats the defender to an adjacent tile. The Civ2 manual suggests defenders in fortresses can retreat, but the binary's actual behavior may differ.

7. **Fix D26**: Add leader unit check for barbarian ransom (unit role > 4), not all barbarian kills.
