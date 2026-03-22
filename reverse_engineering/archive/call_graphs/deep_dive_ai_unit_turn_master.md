# Deep Dive: ai_unit_turn_master (FUN_00538a29) vs JS unitai.js

**Binary function**: FUN_00538a29 at 0x00538A29 (44,777 bytes -- the LARGEST function in the Civ2 binary)
**JS implementation**: `charlizationv3/engine/ai/unitai.js` (5,019 lines)
**Phase 2 pseudocode**: `reverse_engineering/function_audit/phase2/pseudocode/block_00530000.md` (lines 1548-2363)
**Phase 7 audit**: `reverse_engineering/function_audit/phase7/block_00530000_audit.md`
**Decompiled C**: `reverse_engineering/decompiled/block_00530000.c` (lines 2481-5569)

---

## Architecture Overview

### Binary Structure
One monolithic function (~3,082 lines of C) handling ALL non-barbarian AI unit decisions via:
1. Role lookup (`ai_get_unit_role` -> local_e4) dispatches to role-specific branches
2. Shared 8-direction movement evaluator (one giant for-loop scoring all 8 directions)
3. Extensive global state reads: per-continent threat arrays (DAT_0064ca32), treaty flags (DAT_0064c6c0), unit type tables, city data
4. Direct state mutations: writes unit orders, goto targets, unit flags, diplomacy data

### JS Structure
Modular role-based dispatch to separate handler functions:
- `generateMilitaryActions()` -> role dispatch switch -> `aiAttacker`, `aiDefender`, `aiNavalCombat`, `aiAirAttack`, `aiAirDefense`, `aiTransport`, `aiDiplomat`, `aiTrader`, `aiExplorer`, `aiNuclearMissile`
- Shared `_evaluateDirections()` (750+ lines) serves as the ported 8-direction evaluator
- Uses immutable reducer pattern -- returns action objects instead of mutating state
- Pre-computes spatial index and city defense analysis before the unit loop

### Role Mapping (Binary -> JS)
| Binary Role | Binary Name | JS Role | JS Handler |
|---|---|---|---|
| 0 | Attack land | 0 | `aiAttacker` |
| 1 | Defense land | 1 | `aiDefender` |
| 2 | Naval superiority | 2 | `aiNavalCombat` |
| 3 | Air attack | 3 | `aiAirAttack` |
| 4 | Air defense | 4 | `aiAirDefense` |
| 5 | Settler/Engineer | 6 | Handled by cityai.js (skipped here) |
| 6 | Diplomat/Spy | 7 | `aiDiplomat` |
| 7 | Caravan/Freight | 8 | `aiTrader` |
| 0x15 | Engineer (special) | N/A | Merged into settler handling in cityai.js |
| N/A | Barbarian | N/A | **Not implemented** |

**Note**: The binary uses role codes 0-7 + 0x15, while JS uses a different UNIT_ROLE mapping (0-8). The binary's role 5 (settler) maps to JS role 6, role 6 (diplomat) maps to JS role 7, and role 7 (caravan) maps to JS role 8.

---

## Branch-by-Branch Comparison

### 1. Entry / Barbarian Dispatch

**Binary** (lines 2602-2608):
```
if owner == 0:
    return ai_barbarian_unit_turn()  // 6,102 bytes, entirely separate function
```

**JS**: No barbarian AI exists. The `generateMilitaryActions` loop skips civSlot 0 implicitly (AI only runs for civs 1-7). The entire `ai_barbarian_unit_turn` function (FUN_005351aa) -- including naval raiders, city capture/ransom, barbarian movement scoring, and the BARBARIANS text file ransom dialog -- is **completely absent**.

**Verdict**: MISSING. Barbarian AI is an entire subsystem not ported.

---

### 2. Skip Busy Units (terraform orders 0x04-0x09)

**Binary** (lines 2609-2610):
```
if orders >= 0x04 AND orders <= 0x09: goto FINALIZE
```

**JS** (line 4773):
```js
if (BUSY_ORDERS.has(unit.orders) && !wakeUpUnits.has(i)) continue;
```

**Verdict**: MATCH. Both skip units with active terraform/build orders. JS additionally has a wake-up mechanism for units outside cities.

---

### 3. Setup Phase: Position Validation, City/Continent Lookup

**Binary** (lines 2611-2646):
- Reads unit position (local_d4, local_e8), type (uVar20)
- Validates tile (`is_valid_tile`), kills unit if invalid
- Finds nearest enemy city (local_88, via `find_nearest_city(-1,-1,-1)`)
- Finds nearest own city (local_40, via `find_nearest_city(owner,-1,-1)`)
- Computes continent IDs for both cities (local_104, local_58)
- Reads terrain type (local_80), continent ID (iVar10)
- Checks fortress status (local_bc)
- Gets unit role (local_e4 = `ai_get_unit_role`)
- Reads continent threat level (uVar21 = continentThreat[owner][continent])

**JS**: This state is computed on-demand within each role handler:
- `mapBase.getBodyId()` replaces continent lookup
- `_findNearestOwnCity()` replaces `find_nearest_city(owner,...)`
- No global "nearest enemy city" -- each handler searches independently
- `_getContinentThreatLevel()` is a simplified 3-level (0/1/2) approximation of the binary's 6-level system (0=uncontested, 1=contested, 4=needs_fortress, 5=safe)

**Verdict**: PARTIAL. Functionally equivalent for basic lookups but the JS lacks the binary's 6-level continent threat system (DAT_0064ca32) which drives many downstream decisions. The binary pre-computes this in `ai_process_civ_turn` (FUN_0053184d), which has no JS equivalent.

---

### 4. Diplomatic Encounter Trigger

**Binary** (lines 2647-2669):
```
if hasEnemyOnTile AND DAT_006ced4c != 0:
    if nearestOwnCity == nearestEnemyCity AND treaty has PEACE:
        trigger_diplomacy(owner, encounterCiv, 1)
        // May escalate to hatred: if human, strong, random -> set 0x20 flag
    // Auto-attack: if adjacent to undefended enemy city with land unit role < 6
    if distToEnemyCity == 1 AND domain == 0 AND role < 6 AND city undefended:
        clear orders, set hasEnemyOnTile = 1, set autoAttack = true
```

**JS** (lines 4649-4702):
```js
function _checkDiplomaticEncounter(...) {
    // Auto-capture non-combat units (settlers, caravans, diplomats)
    // Skip tiles with peace/ceasefire units
}
```

**Verdict**: PARTIAL. The JS handles auto-capture of non-combat units and peace treaty avoidance, but is missing:
- The `trigger_diplomacy` call that can escalate relations
- The hatred flag escalation (treaty 0x20) based on power comparison
- The auto-attack on adjacent undefended enemy cities (binary clears orders and forces attack)

---

### 5. Damage Level Assessment

**Binary** (lines 2670-2678):
```
damageLevel = 0  // healthy
if damage > 0: damageLevel = 1  // scratched
if damage > unitHP / 4: damageLevel = 2  // wounded
if damage > unitHP / 2: damageLevel = 3  // critical
```

**JS** (lines 109-116 + 1004-1009):
```js
export function getDamageLevel(unit) {
    if (curHp * 4 <= maxHp) return DAMAGE_CRITICAL;   // <25% HP
    if (curHp * 2 <= maxHp) return DAMAGE_WOUNDED;     // 25-50% HP
    if ((unit.movesRemain || 0) > 0) return DAMAGE_SCRATCHED;
    return DAMAGE_HEALTHY;
}
```

**Verdict**: MATCH. Both use the same 4-tier system. The JS implementation has a per-role retreat threshold table (ROLE_RETREAT_THRESHOLD) which is a clean generalization of the binary's scattered per-role damage checks.

---

### 6. Wounded Unit Retreat / Healing Logic

**Binary** (lines 2679-2782): Extremely complex multi-page retreat logic:
- Checks if unit has air domain with cargo -> skip retreat
- Checks for nearby friendly city to heal in
- If in own city under siege (distToEnemyCity == 1, nearestEnemyCity == nearestOwnCity): goto own city
- If autoAttack triggered: reset damageLevel to 0
- For damageLevel 2: complex checks involving fortress status, terrain, unit role
  - Domain 0, damageLevel 2, not fortified: may disband for shield recovery
  - Air units (domain 2): AI_RETURN_TO_BASE via `thunk_FUN_004c54da`
  - Naval units: special retreat to port logic
- For damageLevel 3: always retreat unless on fortress with specific conditions
- Sets goto order with reason code 'd' (0x64) or 'D' (0x44)

**JS** (lines 147-191 + 656-660):
```js
function _handleDamageRetreat(unit, unitIndex, ...) {
    if (dmg >= DAMAGE_CRITICAL && inCity) { disband or skip }
    retreatCity = _findNearestOwnCity(...)
    if (domain === 2) { _findNearestFriendlyPort -> _navalDirectionToward }
    else { safeDirectionToward(retreatCity) }
    fallback: fortify or skip
}
```

**Verdict**: PARTIAL. The JS has a clean retreat implementation but is missing:
- The binary's `autoAttack` reset of damageLevel (when unit triggers auto-attack on adjacent city)
- The siege detection logic (in own city with enemy adjacent -> special goto)
- Air unit return-to-base via `thunk_FUN_004c54da` for damaged air units (aiAirAttack handles this separately via fuel logic)
- The disband-for-shields recovery logic is simplified (JS only does it at CRITICAL level; binary does it at WOUNDED for role 0 land units near own cities)
- The binary's reason codes ('d' vs 'D') which affect subsequent behavior

---

### 7. Role 6 (Diplomat/Spy) -- Binary role 6, JS role 7

**Binary** (lines 2808-2928):
1. If GOTO order active: check if target city still valid for diplomacy
2. If on land, not in city: score ALL cities as targets
   - Own cities: score = 99 - distance
   - Foreign cities: base 100, modified by:
     - Treaty status (peace/ceasefire -> halve; hatred flag 0x20 -> +100)
     - Diplomatic attitude score (FUN_00467904) / (distance + 1)
     - Capital flag (& 8): halve score; if tech gap > 6: halve again
     - Embassy check (FUN_00598d45): if has embassy -> score = 1
     - City SDI defense flag: additional halving
   - Final: score += 100
3. Best target: set goto with reason 0x53 ('S')
4. No target + no goto: disband (`thunk_FUN_005b6042`)

**JS** (lines 4007-4225, `aiDiplomat`):
1. If in enemy city: perform espionage (STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT)
2. Score all cities:
   - Own cities: 99 - adjustedDist (matches binary)
   - Foreign cities: base 100, treaty checks, distance/1, capital penalty, +100 offset
   - Additional JS-only: wonder-building bonus (+50), many-buildings bonus (+20)
3. Move toward best target using `_evaluateDirections` with enemy avoidance
4. No target: skip (JS skips instead of disbanding)

**Verdict**: GOOD MATCH. The core scoring formula is faithfully ported. Key differences:
- JS adds espionage action selection when diplomat arrives at target (not in binary's unit turn function -- the binary handles this elsewhere)
- JS adds wonder-building and building-count bonuses (not in binary)
- JS skips instead of disbanding when no target found (safer but less faithful)
- Binary's embassy check (`FUN_00598d45` -> score = 1) is approximated but not exact
- Binary's complex SDI defense and tech gap checks are simplified

---

### 8. Role 7 (Caravan/Freight) -- Binary role 7, JS role 8

**Binary** (lines 2930-3040):
Phase A -- If on ocean, find best adjacent land continent for trade:
- Scan 8 directions for land tiles with same bodyId
- Score by DAT_0064c9f2 (threat flags) and DAT_0064c972 (population)
- Set order 0x74 ('t') and move to best direction

Phase B -- Trade route selection on same continent:
- For each city on same continent:
  - Trade value = (homeCity.totalTrade + targetCity.totalTrade) * distance / 24
  - Own city: halve
  - Foreign city: multiply by (200 - diplomaticAttitude) / 100
  - Already trading: halve
  - Scale by (5 - tradeRouteCount) / 5
  - Additional penalties for diplomatic conditions (enemy of ally, human opponent near capture)
- Best target: goto with reason 99 ('c')
- Fallback: goto home city

**JS** (lines 4260-4492, `aiTrader`):
Phase A -- Wonder delivery:
- `_findOwnWonderCity()` finds closest own wonder-building city on same continent
- Move toward it

Phase B -- Trade route scoring:
- Same formula: (homeTrade + targetTrade) * routeDistance / 24
- Own city: halve (matches)
- Foreign city: diplomatic factor (peace=150, ceasefire=120, neutral=100) / 100
- Already trading: halve (matches)
- Route slots: (5 - tradeRouteCount) / 5 (matches)
- War civs: skip entirely (matches)

Phase C -- Fallback:
- Goto home city on same continent (matches)

**Verdict**: GOOD MATCH. The trade value formula is faithfully ported. Key differences:
- Binary's Phase A (ocean-to-continent direction) uses continent threat flags (DAT_0064c9f2) and population data (DAT_0064c972) -- JS replaces this with wonder delivery targeting
- Binary's diplomatic attitude factor uses `FUN_00467904` (0-200 range) -> `FUN_005adfa0` (absolute value) -- JS approximates with fixed values per treaty type
- Binary's complex enemy-of-ally and human-opponent-near-capture penalties are missing from JS
- JS adds ESTABLISH_TRADE action when caravan arrives at target city (binary handles this elsewhere)

---

### 9. Settler/Engineer Roles (Binary roles 5, 0x15) -- JS role 6

**Binary** (lines 3041-3215):
City founding logic:
- `get_city_site_value()` evaluates terrain quality in 8/20-tile radius
- If settler and cityCount == 0 and turn 1: found city at starting location
- Scan 8/20 neighbors for better site (settlers search 20, non-settlers search 8)
- Goody hut detection: if nearby goody hut, set role 0x55 and move toward it
- Founding threshold: cityValue >= (15 - distToEnemyCity), adjusted for:
  - No cities on continent -> lower threshold
  - Retry counter > 4 -> lower threshold
- City joining: if continent overcrowded (continentSize/8 < cityCounts), add settler to city

Terraform logic (role 0x15):
- Check each improvement type: road, irrigation, mining, railroad, fortress, airbase
- Complex decision tree based on terrain type, food/shield/trade yields, continent threat level, proximity to city, required tech
- Fortress: narrow passage detection (N+S ocean count > 1 and no E/W)
- Road building toward threatened continents

**JS**: Settler/engineer handling is in `cityai.js` (skipped by unitai.js at line 4776-4782).

**Verdict**: NOT COMPARED HERE. The settler AI is in a separate file and would need its own deep dive. The binary's settler logic within FUN_00538a29 is approximately 2,000 lines of C covering city founding, city joining, terraform decisions, and fortress placement -- a major subsystem.

---

### 10. Defense Role (Binary role 1) -- JS role 1

**Binary** (lines 3257-3612):
In-city garrison management:
- Count garrison units (`thunk_FUN_005b53b6`)
- Compute desired garrison:
  - divisor = 3 (enemies nearby) or 4 (safe), +-1 for barracks/republic
  - needed = citySize / divisor + 1
  - With barracks: min garrison from military units (1/2/3/4 based on total military)
- If excess garrison > needed:
  - Find weakest defender (`FUN_0057e6e2`)
  - If this unit IS the weakest: release for redeployment
  - Periodic wake: (turnNumber + unitIndex) & 7 == 0 -> reset orders
- Request production goals for underdefended cities (`thunk_FUN_0049301b`)

Out-of-city:
- Role 4 (transport-carried) garrison assignment via complex city search
- For each own city with `need_defense` flag (0x80):
  - Continent garrison strength (`FUN_00536bc9` -- diminishing returns scoring)
  - Distance-weighted priority
  - Check path reachability (`FUN_004429af`, `FUN_0044263f`)
  - Set goto with reason '3' (0x33)
- Fortress assignment and fortification logic

**JS** (lines 1820-1993, `aiDefender`):
In-city:
- `_countDefendersAtTile()` counts land units with DEF > 0 (matches)
- `_computeNeededGarrison()`: divisor logic matches binary (3/4, barracks -1, republic +1)
- Barracks minimum garrison (1/2/3/4) matches binary
- Best defender stays (`_findBestDefenderInCity` -- matches `FUN_0057e6e2`)
- Excess release logic present, periodic wake (turn + unitIndex & 7) present

Out-of-city:
- `_findCityNeedingReinforcement()`: scores deficit * 100 - distance + enemy bonus
- `_defenderBlockEnemyCity()`: scan for enemy cities to position near
- Fallback: move to nearest own city, then fortify

**Verdict**: GOOD MATCH. The garrison sizing formula and defender management logic are well-ported. Key differences:
- Binary's continent garrison strength (`FUN_00536bc9` with diminishing returns: first 5 cities * 3, next 5 * 2, next 5 * 1) is not in JS
- Binary's path reachability checks (`FUN_004429af`, `FUN_0044263f`) verify land/sea connectivity -- JS uses simple bodyId matching
- Binary's production goal system (requesting defender builds via `thunk_FUN_0049301b`) is absent from JS
- Binary's complex city flag management (0x600 flag for "has assigned defender") is absent
- Binary's role 4 (transport-carried) garrison assignment at cities with `need_defense` flag is not in JS

---

### 11. Naval / Ranged Units (Binary role 1 domain==1) -- JS role 2

**Binary** (lines 2793-2801):
```
if domain == 1:
    result = ai_naval_and_ranged_move(...)  // FUN_00537331, 5,855 bytes
    // Returns: -2 = needs transport, -1 = finalize, >= 0 = direction
```

FUN_00537331 handles:
- Missile launch logic (ammo check, range check)
- Ranged bombardment (flag 0x10 in unit flags, search nearby enemies within range)
- Naval attack: find weakest enemy ship, evaluate combat odds, set goto or retreat
- Naval transport: find nearest city with troops, or enemy coast to unload
- Bombardment ship: find undefended enemy cities to bombard

**JS** (lines 2408-2564, `aiNavalCombat`):
1. Retreat when damaged (< 25% HP) -> find port
2. Attack adjacent enemies with combat scoring
3. Escort own transports carrying cargo
4. Blockade enemy coastal cities
5. Hunt enemy ships (`_findNearestEnemySeaUnit`)
6. Patrol sea lanes near own coastal cities
7. Explore uncharted ocean
8. Random sea movement

**Verdict**: PARTIAL. The JS has a functional naval combat AI but simplifies the binary significantly:
- **Missile launch**: Not in JS (the binary's ammo/range logic for missile units is absent)
- **Ranged bombardment**: Not ported from FUN_00537331 (the binary checks `flags & 0x10` for ranged attack capability) -- JS uses BOMBARD action type for air units only
- **Combat odds evaluation**: JS uses `_computeCombatScore()` which is a simplified version of the binary's full evaluation
- **Transport coordination**: The binary's `ai_naval_and_ranged_move` handles transport loading/unloading within the naval function -- JS has a separate `aiTransport` handler
- **Port retreat**: JS correctly implements port-finding for retreat
- **Blockade**: JS adds blockade logic that's not clearly separated in the binary (binary handles this through the general movement evaluator)
- **Escort**: JS adds explicit escort logic that's not clearly separated in the binary

---

### 12. Nuclear Strike (unit type with cost >= 99)

**Binary** (lines 2802-2807):
```
if unitTypes[typeId].cost >= 99:
    dir = ai_find_nuke_target(unitIdx)  // FUN_00536c4c, 1,760 bytes
    unitX = units[unitIdx].x   // may have been teleported
    unitY = units[unitIdx].y
    goto APPLY_DIRECTION
```

FUN_00536c4c:
- Evaluates each enemy city:
  - Must be at war or have treaty flag 0x100 without 0x104
  - City population > 4
  - Military comparison: own strength >= 2/3 enemy OR sneak attack flag OR enemy has no nukes
  - Score = city_pop/2, adjusted for nearby allied/enemy units
  - Requires reachable friendly city within nuke range
- If best target score >= (10 - own_city_count):
  - Moves nuke adjacent to target
  - May declare war (sets 0x20000 flag) if target is human-allied
  - Adjusts diplomatic attitude
  - Returns direction XOR 4 (reverse)

**JS** (lines 2947-3017, `aiNuclearMissile`):
- Manhattan Project check (wonder 23)
- Score: (size + buildings + wonderCount * 5) / (1 + hasSDI * 10)
- Wonder-building bonus, distance penalty, capital bonus, unit stack bonus
- Fire if score > 30
- Uses NUKE action type

**Verdict**: PARTIAL. Both target high-value enemy cities, but major differences:
- Binary's military comparison threshold (2/3 strength ratio) is absent from JS
- Binary's population minimum (> 4) is not enforced in JS
- Binary's diplomatic state manipulation (war declaration, attitude adjustment) is absent
- Binary physically moves the nuke adjacent before striking; JS fires directly via NUKE action
- Binary's "sneak attack" flag (0x10) logic is absent
- Binary requires reachable friendly city within range; JS has no such check
- JS adds SDI Defense check (building 17) which reduces score -- binary doesn't explicitly check SDI here (it may be handled elsewhere)
- Binary's scoring is population-based; JS's scoring includes building count, wonder count

---

### 13. Air Attack (Binary role 3) -- JS role 3

**Binary**: Air attack is handled through the general naval/ranged movement function (FUN_00537331) and the damage retreat path. The binary's air units use fuel tracking and must return to base.

**JS** (lines 2809-2927, `aiAirAttack`):
1. Fuel management: if fuelRemaining <= 1, return to base
2. At base: scan for bombardment targets (cities and unit stacks)
3. City scoring: size * 10 + 50, air defense penalty, wonder bonus, distance penalty
4. Unit stack scoring: totalAtk * unitCount + count * 5, distance penalty
5. Execute BOMBARD if score > 10
6. Rebase to frontline city if no targets
7. Not at base: return immediately

**Verdict**: JS-ORIGINAL. The JS air attack AI is largely original design, not a direct port. The binary handles air units through the general movement evaluator and the naval/ranged function. Key aspects:
- **Fuel management**: Present in both, but implemented very differently
- **Target scoring**: JS uses a custom scoring formula; binary uses the general movement evaluator
- **BOMBARD action**: JS-specific action type; binary moves the air unit adjacent and attacks
- **Rebase to frontline**: JS-original logic for repositioning bombers to extend range

---

### 14. Air Defense (Binary role 4) -- JS role 4

**Binary** (lines 3349-3612): Extremely complex:
- Walks unit stack, counts per-role units
- Complex city-based assignment system using 48-slot work queue (DAT_0064cab4)
- Per-continent threat assessment drives deployment
- City flag management (0x600 for assigned defender, 0x80 for need_defense)
- Path reachability checks for cross-continent deployment

**JS** (lines 3185-3311, `aiAirDefense`):
1. Air intercept: engage nearby enemy bombers/missiles via BOMBARD
2. Count air defense at city, determine max needed (1-3 based on threat)
3. Excess: rebase to city needing air cover
4. `_findCityNeedingAirDefense()`: threat-level scoring

**Verdict**: PARTIAL. The JS has functional air defense but heavily simplified:
- **Air intercept**: JS-original addition (binary doesn't have explicit scramble logic in this function)
- **Deployment**: JS uses simple count/threshold; binary uses the full 48-slot goal system
- **Cross-continent**: Binary uses path reachability; JS uses simple distance

---

### 15. Sea Transport (Binary role 5) -- JS role 5

**Binary** (lines in FUN_00537331 Section 4):
- Find nearest city with troops to pick up
- Find enemy coast to unload
- Evaluate port accessibility and route safety
- Complex loading coordination with land units
- `ai_set_goto_via_coast` for coastal navigation

**JS** (lines 3460-3804, `aiTransport`):
LOADED state:
1. Wait until at least half loaded (coordinated assault)
2. Score adjacent land tiles for unloading (enemy city adjacency, terrain defense, enemy avoidance)
3. Navigate toward enemy coastal cities for invasion
4. Navigate toward any enemy land

EMPTY state:
1. Find coastal city with land units wanting transport
2. Check if units have local enemies (if not, they need transport)
3. Patrol near own coast

**Verdict**: GOOD MATCH. The transport AI is well-implemented with some JS-original improvements:
- **Coordinated assault**: JS waits until half-loaded before departing (not in binary)
- **Unloading scoring**: JS scores tiles by enemy city proximity, terrain defense, enemy avoidance (binary uses simpler criteria)
- **Pickup scoring**: JS checks if land units have local enemies to determine transport need (matches binary's `FUN_005b4b66` check)
- **Safe routing**: JS's `_transportSafeDirection()` avoids enemy warships (binary handles this through the general evaluator)
- **Missing**: Binary's `ai_set_goto_via_coast` (FUN_00531653) for coastal navigation -- JS uses simple `_navalDirectionToward`

---

### 16. 8-Direction Movement Evaluator (Core Movement Loop)

**Binary** (pseudocode lines 2102-2280):
The core movement loop evaluates each of 8 directions with:
1. Domain passability (land/sea/air check)
2. Stack walking (skip air units with fuel, find first combat-relevant unit)
3. Complex passability: stacking limits, treaty restrictions, ZOC blocking
4. Score computation:
   - Settler scoring: random(0,4)
   - Explorer scoring: random(0,2) - terrain_move_cost * 2 (role 0) or - terrain_defense (other)
   - Combat scoring: random(0,4) + terrain_defense * 4 (combat roles) or 6 - (terrCost-1) * moveSpeed (settlers)
   - Road-to-home-city check for settlers near cities
5. Enemy unit combat evaluation:
   - `FUN_00580341` for combat odds
   - Stack HP counting
   - City capture multiplier (x3)
   - Role 2 vs role 4 bonus (x2)
   - Role-specific bonuses: role 0 doubles for no-target, outgunned, coordinated attack, flanking
   - Barbarian bonuses (+12 for transports/settlers)
   - Threshold: 12 for barbarian targets, 6 for civ targets
6. Direction momentum penalty (angularDiff^2 * 2)
7. Enemy territory avoidance with treaty checks
8. Allied territory penalty (-6)
9. Undefended enemy city (score = 999)
10. Goody hut bonus
11. Exploration lookahead (4x distant tile, 8 neighbors)
12. Polar penalty (score / 3 at map edges)
13. Movement-cost-vs-combat check (reduce score by HP ratio)
14. Post-loop safety checks (bestAbsScore != bestScore cancellation)

**JS** (lines 997-1712, `_evaluateDirections`):
All 14 categories above are implemented:
1. Domain passability: MATCH
2. Stack walking: MATCH (filters role > 4)
3. Passability: stacking limits (combat count >= 2), ZOC check via `isZOCBlocked`: MATCH
4. Score computation paths: MATCH (three paths: cautious/empty-land/has-units)
   - Road-to-home-city with terrain cost scaling: MATCH
5. Combat evaluation:
   - `_computeCombatScore()` replaces `FUN_00580341`: MATCH (formula uses same ATK * 8 vs DEF * terrMul * 4)
   - Stack HP counting: SIMPLIFIED (counts attack units, not sum of HP)
   - City capture x3: MATCH
   - Role 2 vs role 4 x2: MATCH
   - Role 0 doubles: MATCH (no-target, outgunned, coordinated, flanking)
   - Barbarian bonuses: MATCH (+12 for role > 4; /2 for role 7; x2 for role 6)
   - Threshold 12/6: MATCH
6. Direction momentum: MATCH (angularDiff^2 * 2)
7. Enemy territory avoidance: PARTIAL (simplified treaty checks)
8. Allied territory penalty: MATCH (-6)
9. Undefended enemy city: MATCH (score = 999)
10. Goody hut: MATCH (+20 in JS, binary checks `FUN_005b8ffa`)
11. Exploration lookahead: MATCH (4x distant + neighbor check)
12. Polar penalty: MATCH (score / 3)
13. Movement-cost check: MATCH (reduce by HP ratio)
14. Post-loop safety: MATCH (bestRawScore != bestScore cancellation)

**Verdict**: EXCELLENT MATCH. This is the most faithfully ported section. The JS `_evaluateDirections` function replicates almost all 14 scoring categories from the binary. The main simplifications are:
- Stack HP is not summed the same way (JS counts units vs binary sums HP)
- Territory ownership checks are simplified (JS uses `_getTileOwnerCiv` vs binary's direct memory access)
- The combat odds formula is slightly simplified (doesn't include all terrain-specific modifiers)

---

### 17. Explorer (Binary unit type 9 special behavior)

**Binary** (lines 3214-3256):
- Fuel counter tracking (units[idx].fuelUsed increments when no enemy, decrements when enemy present)
- If fuelUsed > 9: disable fortress flag (forces movement)
- Nearest own-civ city search with continent matching
- Pillage enemy territory logic
- Diplomat capture (scan for enemy diplomats/settlers within 4 tiles)

**JS** (lines 4593-4634, `aiExplorer`):
- Find goody hut or unexplored tile
- Use `_evaluateDirections` with explore + avoidEnemies
- Fallback: random safe movement

**Verdict**: MINIMAL MATCH. The JS explorer is a simple exploration AI, missing:
- **Fuel counter tracking**: Binary's unique mechanic where explorers track time-without-enemy
- **Pillage logic**: Binary scans for improvable enemy territory to pillage
- **Diplomat capture**: Binary specifically hunts enemy diplomats/settlers within 4 tiles
- **Fortress disable**: Binary disables fortress after 9+ turns without enemy contact

---

### 18. Stack Management

**Binary**: Extensive stack management throughout:
- `ai_cancel_goto_on_domain()`: iterates stacked units, cancels goto for matching domain
- Unit stack walking via `thunk_FUN_005b2d39` (first) and `thunk_FUN_005b2c82` (next)
- Wake/cancel stacked units when leader moves
- Domain-based filtering (cancel land gotos when naval unit arrives)

**JS**: No explicit stack management. Units are processed independently. The spatial index allows checking what's at a tile, but there's no concept of "wake the stack" or "cancel goto for domain."

**Verdict**: MISSING. Stack management as a concept is absent from JS. Each unit is evaluated independently, which is functionally acceptable but loses the binary's coordination between stacked units.

---

### 19. Finalize Phase (End of Function)

**Binary** (pseudocode lines 2308-2336):
- If orders in [0xFF, 0x10, 0x01, 0x02]:
  - Naval: set cargo += moveSpeed, return 1
  - Land non-settler: set FORTIFYING or FORTIFIED
  - Other: set 0xFF (idle)
- Self-GOTO detection: if goto target == current position, cancel and set flag 0x80
- Sets unit.lastDir for momentum tracking

**JS** (lines 4979-5018, `generateCleanupActions`):
- Land units in cities: fortify
- Everything else: skip

**Verdict**: PARTIAL. The JS cleanup is much simpler:
- **Naval cargo increment**: MISSING (binary increments cargo counter to track turns at sea)
- **Fortify vs Fortified distinction**: JS uses 'fortify' only; binary distinguishes between FORTIFYING (0x01) and FORTIFIED (0x02)
- **Self-GOTO detection**: MISSING (binary checks for units with goto to current position and clears + sets flag)
- **Direction momentum (lastDir)**: MISSING (binary stores last direction for the momentum penalty in the next turn's evaluator)

---

### 20. Production Goal System (AI Goals)

**Binary**: Throughout the function, calls to `thunk_FUN_0049301b` (ai_add_goal_a) and `thunk_FUN_004933f2` (ai_add_goal_b) create production goals:
- Role 1 defense goals at underdefended cities
- Role 5 settler goals at good city sites
- Role 0 attack goals at enemy positions
- Role 0x15 engineer goals at terraform sites
- Role 2 exploration goals at unexplored areas
- Role 6 settle goals at new sites
- Role 7 trade goals at trade cities

**JS**: The `strategy` parameter carries some goal information via `strategy.goals.getGoalForUnit()`, but the goal creation is handled in `strategy.js` rather than within `unitai.js`. The goal types are limited to GOAL_BUILD_ROAD, GOAL_ESCORT, GOAL_TRANSPORT, GOAL_AIR_STRIKE.

**Verdict**: PARTIAL. The JS has a basic goal system but lacks the binary's per-role, per-continent production request mechanism that coordinates unit production across cities.

---

## Summary Table

| Branch | Binary | JS | Match Level |
|--------|--------|-----|-------------|
| Barbarian dispatch | Full AI (6KB) | Not implemented | **MISSING** |
| Skip busy units | orders 4-9 | BUSY_ORDERS set | MATCH |
| Setup (city/continent lookup) | Pre-computed per-civ arrays | On-demand per-handler | PARTIAL |
| Diplomatic encounter | Diplomacy trigger + auto-attack | Auto-capture only | PARTIAL |
| Damage assessment | 4-tier (0-3) | 4-tier (0-3) | MATCH |
| Wounded retreat | Complex multi-path | Simple retreat | PARTIAL |
| Diplomat/Spy (role 6/7) | City scoring formula | Faithful scoring + espionage actions | GOOD MATCH |
| Caravan/Freight (role 7/8) | Trade value formula | Faithful formula + wonder delivery | GOOD MATCH |
| Settler/Engineer (role 5/6) | In this function (2K lines) | In cityai.js (not compared) | N/A |
| Defense (role 1) | Garrison sizing + goal system | Garrison sizing (faithful) | GOOD MATCH |
| Naval combat (domain 1) | FUN_00537331 (5.8KB) | Custom handler | PARTIAL |
| Nuclear strike | FUN_00536c4c (1.7KB) | Custom handler | PARTIAL |
| Air attack (role 3) | Via naval/ranged | Custom handler | JS-ORIGINAL |
| Air defense (role 4) | Complex goal assignment | Simple count/threshold | PARTIAL |
| Transport (role 5) | In naval function | Custom handler | GOOD MATCH |
| 8-direction evaluator | Core loop (600+ lines C) | `_evaluateDirections` (750 lines) | **EXCELLENT** |
| Explorer (type 9) | Fuel tracking + pillage + capture | Simple explore | MINIMAL |
| Stack management | Full stack coordination | None | **MISSING** |
| Finalize phase | Fortify/naval cargo/self-goto | Simple cleanup | PARTIAL |
| Production goals | 48-slot goal system | Basic 4-type goals | PARTIAL |

## Overall Assessment

**Faithfully ported (>80% match)**:
- 8-direction movement evaluator (the heart of the function)
- Diplomat target scoring formula
- Caravan trade value formula
- Defender garrison sizing
- Damage level assessment

**Functionally adequate but simplified (40-70%)**:
- Naval combat (missing missile/ranged, has unique additions)
- Transport (missing coastal goto, has coordinated assault)
- Wounded retreat (missing siege detection, auto-attack reset)
- Nuclear targeting (different scoring formula, missing diplomacy changes)

**Missing or minimal (<20%)**:
- Barbarian AI (entire 6KB function)
- Explorer special behaviors (fuel tracking, pillage, diplomat capture)
- Stack management (coordination between stacked units)
- 6-level continent threat system (drives many binary decisions)
- Production goal creation from unit AI
- Per-civ turn processing (FUN_0053184d, 14.6KB -- the setup phase for all AI)

**JS-original additions not in binary**:
- Air intercept/scramble mechanics
- Coordinated assault (transport wait-until-loaded)
- Threat radius check before role dispatch
- Wake-up mechanism for units outside cities
- Smart espionage operation selection (steal/sabotage/incite priority)
- Wonder-building and building-count bonuses for diplomat targeting
