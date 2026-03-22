# Deep Dive: process_city_production (FUN_004ec3fe)

Binary function: `FUN_004ec3fe` in `reverse_engineering/decompiled/block_004E0000.c` lines 4782-5625 (10,931 bytes).
JS implementation: `processCityProduction()` in `charlizationv3/engine/cityturn.js` lines 322-598.

---

## Binary behavior (branch by branch)

The C function takes `param_1` (city index) and processes production for that city. It has two major branches based on the sign of the city's production code (`DAT_0064f379[param_1*0x58]`):
- **Negative production code** = building/wonder (the absolute value is the improvement/wonder ID)
- **Positive production code** = unit type ID

### Phase 0: Initialization (lines 4839-4853)

1. `local_24 = -1` (building/wonder index, initialized to "none")
2. `local_14 = 0` (flag: whether production was rush-bought)
3. `_DAT_006a6610 = -1` (global: last completed item, reset)
4. `local_84 = city.owner` (civ slot)
5. **Shield accumulation**: `local_2c = DAT_006a65cc - DAT_006a6568` (net shields = gross shields - unit support). This is precomputed by the caller.
6. **Civil disorder check**: if city flags bit 0 is set (civil disorder), `local_2c = 0` (no production).
7. **Clamp**: if `local_2c < 1`, set to 0.
8. **Accumulate shields**: if production code != -0x26 (not "Capitalization" item), add `local_2c` to city's shield box (`DAT_0064f35c`).

### Phase 0b: Coast guard check (lines 4854-4861)

If `local_84 == 0` (Barbarians), checks if city tile has more than 16 terrain improvements and a unit is present. If so, resets shield box to 0. This prevents barbarian cities on heavily improved coastal tiles from building.

### Phase 1: Negative production code → Building/Wonder path (lines 4862-5171)

**Branch entry**: `(char)DAT_0064f379[param_1*0x58] < '\0'` (signed byte < 0, i.e., building/wonder).

#### 1a: Decode item ID (lines 4862-4873)

- `local_24` = absolute value of production code (the building/wonder ID)
- `local_3c` = wonder index. If `local_24 > 0x26` (38), then `local_3c = local_24 - 0x27` (wonder index, 0-based). Otherwise `local_3c = -1` (not a wonder).
- `local_58` = cost: `buildingCostTable[local_24 * 8] * DAT_006a657c` (cost multiplier, the COSMIC_SHIELD_MULTIPLIER).

#### 1b: Validity check — "BADBUILD" (lines 4874-4886)

If game is NOT multiplayer (`DAT_00654fa8 == 0`) AND either:
- The item is a wonder (`local_3c >= 0`) and that wonder's owner slot is NOT -1 (already built by someone), OR
- The item is a building (`local_3c < 0`) and `has_building(param_1, local_24)` returns true (already has it)

...AND the item's tech prerequisite hasn't been obsoleted (`DAT_00655af2 & 8 == 0`):

Then show "BADBUILD" message — production was invalidly set.

#### 1c: Space race build-right check (lines 4887-4890)

For items 0x23-0x25 (SS Structural=35, SS Component=36, SS Module=37):
- Check if this civ is part of the space race (`DAT_00655b0b` bitmask)
- Check if `has_built_apollo(local_84)` returns true, or `has_space_tech(local_84, local_24)` returns true
- If neither, skip to the "already have enough shields" else branch

#### 1d: Enough shields to complete? (lines 4891-5166)

**If `shield_box >= cost AND local_24 != 0x26` (not Capitalization)**:

##### 1d-i: Clear rush-buy flag (line 4892-4893)
Clear bit 0x100 from city flags.

##### 1d-ii: Building already exists check (lines 4895-4900)
For buildings (local_3c < 0): if `has_building(param_1, local_24)` is true, set `local_24 = -1` (cancel).

##### 1d-iii: Wonder race resolution (lines 4901-4933)
For wonders (local_3c >= 0):
- If wonder not yet claimed (`DAT_00655be6[local_3c*2] == -1`) AND this civ is NOT in the active-civs bitmask:
  - Search ALL cities: if any AI-controlled city is building the same wonder AND has enough shields (using COSMIC cost, not local cost), return early (let the AI complete it first — binary race tiebreaker).
- **Multiplayer (game_mode < 3)**: if wonder is unclaimed, claim it (`DAT_00655be6[local_3c*2] = param_1`), set rush-buy bit 0x100.
- **Singleplayer (game_mode >= 3)**: call `rush_buy_AI(local_84, param_1, local_3c, local_58, local_24)`. If AI spent gold to rush-buy, set `local_14 = result`.
- **Failure path**: if wonder cannot be built (wonder already claimed or rush-buy failed), set `local_3c = -1, local_24 = -1`, and call `change_production(param_1, 99)` to force a new production choice.

##### 1d-iv: SS component placement for Structural/Component/Module (lines 4935-4951)
For items 0x23-0x25 (35-37):
- Check if this civ already completed the Apollo wonder
- Call `find_space_slot(local_84, local_24 - 0x23)` to find a slot
- If no slot available, call `change_production(param_1, 99)` and goto cleanup
- If slot found, assign new production code to the slot's combined ID, recalculate cost
- If shields still insufficient after reassignment, goto cleanup

##### 1d-v: Production complete — main logic (lines 4953-5165)

**If `local_24 >= 0`** (still valid after all checks):

###### Sound/display (lines 4954-4956)
Play city building sound.

###### Manhattan Project wonder (local_3c == 0x17 = wonder 23) (lines 4957-4980)
- For each civ 1-7: `nukeByte = clamp((nukeByte + 1) / 2, 0, 6)`
- Notify all alive civs (if not multiplayer): play special sound, show message

###### Deduct shields (lines 4982-4986)
If `local_14 == 0` (not rush-bought):
- Call `set_building(param_1, local_24, 1)` — grants the building/wonder to the city
- Deduct cost from shield box

###### Building completion — unit auto-switch (lines 4987-4992)
If NOT AI (`DAT_00655b0b` bitmask == 0) AND `local_24 < 0x23` (regular building, not SS/wonder):
- If `local_24 == 1` (Palace): decrement production code by 1 (to keep building another Palace? This appears to be a quirk)
- Call `change_production(param_1, 99)` to force production selection

###### Wonder completion — set global state (lines 4993-5106)
For wonders (`local_24 > 0x22`):
- Set `local_5c = 1` (show completion notification) if current player or wonder
- Set diplomatic notification for all civs (if multiplayer mode)
- Set city improvements bitmask to 0xFF (all improvements discovered)
- Play sound effects, show messages
- Store `_DAT_006a6610 = local_24` (last completed item for AI)
- Reset shield box to 0 (or keep if rush-bought)
- Call `change_production(param_1, 99)` if city has auto-produce flag or not AI

###### Post-completion: SS component slot assignment (lines 5108-5116)
For SS items 0x23-0x25: call `check_space_slot(local_84, local_48)` to verify placement.
If placement fails and this is AI, show "BADSPACE" message.

###### Palace completion (local_24 == 1) (lines 5117-5136)
- For all cities of this civ: remove building 1 (Palace) with `set_building(oci, 1, 0)`
- Add Palace to this city: `set_building(param_1, 1, 1)`
- Update capital coordinates: `DAT_0064c6ac[civ*0x594] = city.x`
- Show "MOVECAPITAL" dialog

###### Wonder-specific effects (lines 5137-5153)
- `local_3c == 0x12` (wonder 18 = Darwin's Voyage): call `reveal_map(local_84, 0)` TWICE (grants 2 free techs)
- `local_3c == 0x0e` (wonder 14 = Leonardo's Workshop): call `upgrade_units_for_tech(local_84)`
- `local_3c == 0x14` (wonder 20 = Eiffel Tower): call `handle_espionage_discovery(local_84)` (actually recalculates attitudes)
- `local_3c == 0x19` (wonder 25 = United Nations): call `handle_space_race_victory()` (actually triggers UN election)

###### Force reassign: other cities building same wonder (lines 5154-5164)
For all other cities: if they're building the same wonder (negative production code matching), call `change_production(oci, 99)`.
Also call `update_city_display(param_1, 0)`.

### Phase 2: Positive production code → Unit path (lines 5173-5477)

**Branch entry**: `(char)DAT_0064f379[param_1*0x58] >= '\0'` (signed byte >= 0, i.e., unit).

#### 2a: Unit auto-upgrade (lines 5174-5194)

- `local_64` = unit type ID (from production code)
- Check if the unit type's obsoleting tech (`DAT_0064b1c0[local_64*0x14]`) has been discovered by this civ
- If obsoleting tech discovered: scan all 62 unit types to find a replacement with:
  - Same role (`DAT_0064b1cb`) as obsoleting tech
  - Same domain (`DAT_0064b1ca`)
- If found: update production code to new unit type, notify AI ("UPGRADED" message)

#### 2b: Calculate unit cost (line 5195)
`local_58 = unitCostTable[local_64*0x14] * DAT_006a657c`

#### 2c: Enough shields check (lines 5196-5477)

**If shields >= cost:**

##### Clear rush-buy flag (lines 5197-5198)
Clear bit 0x100 from city flags.

##### Settler/diplomatic unit check (lines 5202-5206)
If unit role is 5 (diplomat/spy type) AND city size == 1 AND `DAT_00655b08 == 0` (chieftain difficulty): return early (can't build diplomat from size-1 city on easiest difficulty).

##### Deduct shields (lines 5207-5208)
Subtract cost from shield box.

##### Create unit (lines 5209-5246)
If AI OR unit role != 6 (not settler):
- Call `create_unit(local_64, local_84, city.x, city.y)` to place unit
- If unit role == 6 AND government is communism: set veteran flag (0x2000)
- Veteran checks: Barracks (building 2), ADM building for domain match, etc.
  - Air domain (1): Airport (32)
  - Sea domain (2): not explicitly checked, but Port Facility (34) likely via ADM buildings
  - Communism + role 6 (settler) → veteran
- `has_building(param_1, 2)` (Barracks) → veteran for land units
- `has_tech(0x20)` (Gunpowder) + specific unit checks for veteran status

##### Settler unit: shrink city (lines 5247-5283)
If unit role is 5 (settler/engineer):
- If city size == 1 AND only 1 city of this civ: return early (can't shrink last city)
- If city size == 1 AND this is human player: ask "GHOSTTOWN" confirmation dialog; if declined, delete the unit and return
- Decrement city size
- If city size reaches 0: show dialog, delete city, check civ elimination, create the unit at city location, return

##### Caravan/Freight (unit role 7): assign commodity (lines 5289-5448)
If NOT AI:
- Role 7 (caravan/freight): call `assign_caravan_commodity()` (FUN_004ec1c6)
- Shows commodity selection dialog for human players

##### Diplomat/Spy: assign diplomacy mission target (lines 5293-5365)
If unit role is 6 (diplomat/spy):
- Find nearest enemy city using distance calculation
- Randomly select target from equidistant candidates
- Set unit's goto target

##### Post-unit-build cleanup (lines 5366-5476)
- If unit has high firepower (`DAT_0064b1c4 > 'b'`) and this civ has only 1 of this unit type: reset all other civs' intel on this unit type to -1 (surprise factor)
- Call `change_production(param_1, 99)` (force new production choice)
- If human player: show built notification with sound effects
- Reset shield box to 0
- If auto-produce flag set: call `change_production`

### Phase 3: AI rush-buy logic (lines 5479-5619)

This is the tail section, reached via `LAB_004ee539` and the normal flow-through.

#### 3a: AI auto-select production (lines 5480-5487)
If AI AND auto-produce flag (0x10) AND (shield_box == 0 OR building failed):
- Call `change_production(param_1, 99)`
- If production code becomes 'c' (Capitalization): clear auto-produce flag and other flags (0xFCFFFFEF mask)

#### 3b: AI siege/no garrison check (lines 5488-5493)
If NOT AI:
- If city has flag 0x20 (under siege) OR no garrison unit found: call `change_production(param_1, 99)`

#### 3c: AI rush-buy decision (lines 5494-5618)

Massive AI treasury-spend logic:
1. Decode production item and cost
2. Calculate base rush-buy amount (`local_34`) from treasury (`DAT_0064c6a2[civ*0x594]`) using bit shifts:
   - **Regular units/buildings (production shields > 0)**: `local_34 = treasury >> 6`
     - Only if `local_2c != 0` (city has production) AND unit role matches civ's military stance
   - **Wonders (local_24 > 0x26)**: varies by how many of this SS component type the civ has:
     - If count is 0 or less than minimum threshold: `treasury >> 6`
     - If count exceeds max threshold: `treasury >> 8`
     - Otherwise: `treasury >> 7`
     - If treasury > 2499: double the amount
   - **SS items (0x22 < local_24 < 0x27)**: check if any AI civ has Apollo; if so, `treasury >> 7`
     - If civ has started space race: double
   - **Item under disorder + shields present**: `treasury >> 3`
   - **No garrison + unit building**: `treasury >> 3`
   - **Palace (local_24 == 1) with shields**: `treasury >> 3`
   - **SS Structural (item '-') with no structurals**: `treasury >> 4`
   - **Treasury > 2000**: add `treasury >> 9` to amount
3. Clamp: `local_34 = clamp(0, local_34, cost - current_shields)`
4. Add clamped amount to shield box
5. Calculate gold back to treasury: `local_44 = (difficulty * local_34 / 10) / (8 - difficultyLevel)`
   - If this civ's treasury > richest civ's treasury AND treasury > 999: halve refund
   - If treasury > 1999: zero refund
6. Deduct from treasury: `treasury -= (local_34 - local_44)`

#### 3d: "Almost done" wonder notification (lines 5594-5618)
For wonders (production code < -0x26):
- If shields + next turn's production >= cost AND wonder is unclaimed (`DAT_00655b98[local_70*2] == -1`) AND not multiplayer:
  - Show "ALMOSTWONDER" dialog to human player

### Phase 4: Cleanup (lines 5621-5624)

- Clear bit 0x20 from city flags (siege flag)
- Return

---

## JS implementation

The JS `processCityProduction()` function (cityturn.js:322-598) handles:

1. **Auto-upgrade**: Calls `checkUnitAutoUpgrade()` (research.js:635) which checks if the unit being produced has an obsoleting tech and switches to the upgraded replacement.

2. **Civil disorder**: Returns early with no production if `city.civilDisorder`.

3. **Shield accumulation**: Calls `calcShieldProduction()` to get `netShields`, adds to `shieldsInBox`.

4. **Completion check**: If `newShields >= cost`:
   - **Overflow handling**: `newShields = Math.min(overflow, cost)` — caps overflow at item cost.
   - **Unit production**: Creates unit with veteran status checks (Barracks, Airport, Port Facility, Lighthouse wonder, Communism+settler). Handles settler city-shrink. Handles Caravan/Freight commodity assignment.
   - **Building production**: Adds building to city. Handles Palace uniqueness (remove from other cities).
   - **Wonder production**: Claims wonder. Handles wonder race (refund if already built). Implements specific wonder effects: Darwin's (2 free techs with anarchy defer), Manhattan Project (nuke stockpile halving), Apollo Program (map reveal), Marco Polo (contact all), SETI (halve research), Leonardo's (upgrade units), Eiffel Tower (recalc attitudes). Forces other cities building same wonder to reassign.

5. **Events**: Returns events for all actions.

The `processCityTurn()` orchestrator (cityturn.js:1094-1250) calls `processCityProduction()` and applies results.

The AI rush-buy logic is NOT in `processCityProduction()` — it would need to be a separate AI module.

---

## Discrepancies

### Critical (affect game logic)

1. **Missing: Civil disorder zeroes production but binary still accumulates to shield box**
   - Binary (line 4844-4846): If city flags bit 0 is set, `local_2c = 0` BUT the shield box is still written (line 4851-4852, unless item is Capitalization). The city accumulates 0 shields per turn but the shield box value persists.
   - JS (line 335-343): Returns early immediately with `newShieldsInBox: city.shieldsInBox || 0`. This is functionally equivalent since netShields from `calcShieldProduction` would already be 0 if disorder is handled upstream. **Actually OK** — the disorder check happens in `processCityTurn` before calling this function, and `calcShieldProduction` doesn't check disorder. However, the binary's approach computes `local_2c` externally from the caller and passes it in, while JS computes it inline. **Potential issue**: If `calcShieldProduction` returns nonzero shields even during disorder (it does — it doesn't check disorder), the JS early return correctly prevents accumulation. The binary explicitly zeros the accumulation. These are equivalent but via different mechanisms.

2. **Missing: Capitalization (item 0x26 = 38) special handling**
   - Binary (line 4850-4853): If production code is `-0x26` (negated 38, Capitalization), shields are NOT added to shield box. Capitalization converts shields to gold instead.
   - Binary (line 4891): Explicitly checks `local_24 != 0x26` before triggering completion.
   - JS: No Capitalization concept. The `getProductionCost()` function returns `Infinity` for unknown types, so Capitalization items would never complete, but shields would still accumulate in the box (wasted). **DISCREPANCY**: Capitalization should convert excess shields to treasury gold, not accumulate them.

3. **Missing: Coast guard barbarian check (lines 4854-4861)**
   - Binary: If owner is Barbarians (civ 0) AND city tile has >16 improvements AND a unit is present, reset shields to 0.
   - JS: No equivalent check. Barbarian cities can accumulate shields without restriction.
   - **Minor** — only affects barbarian AI behavior.

4. **Missing: BADBUILD validation (lines 4874-4886)**
   - Binary: Before completing a building/wonder, validates that the item hasn't already been built (building) or claimed (wonder). If invalid, shows a "BADBUILD" message.
   - JS: For buildings, checks `newBuildings.has(item.id)` (line 417) and refunds. For wonders, checks `existing.cityIndex != null` (line 447) and refunds. **Partially implemented** — the JS handles the refund but doesn't show a diagnostic message. Functionally equivalent for game logic.

5. **Missing: Space race item build-right check (lines 4887-4890)**
   - Binary: For items 35-37 (SS Structural/Component/Module), verifies the civ has built Apollo Program OR has the required space tech. If not, skips production.
   - JS: No Apollo Program prerequisite check for building SS parts. Any civ can complete SS parts without having Apollo. **DISCREPANCY**: Missing Apollo prerequisite validation.

6. **Missing: Wonder race tiebreaker for AI cities (lines 4901-4915)**
   - Binary: When completing a wonder, if the wonder is unclaimed AND this civ is not in the active-civs bitmask, scan all cities. If any AI city is also building this wonder AND has enough shields (at full COSMIC cost), return early — letting the AI city complete it first.
   - JS: No such tiebreaker. First city to reach the cost threshold wins. **DISCREPANCY**: AI wonder race tiebreaker is missing.

7. **Missing: Multiplayer wonder claiming (lines 4917-4926)**
   - Binary: In multiplayer mode (game_mode < 3), immediately claims the wonder slot when shields are sufficient, before the wonder is actually "built". Sets bit 0x100 on city flags.
   - JS: Wonder is claimed at completion time only. No pre-claim in multiplayer. **DISCREPANCY** for multiplayer race conditions, but since the JS uses server-authoritative processing, this is less critical.

8. **Missing: AI rush-buy for wonders (lines 4917-4933)**
   - Binary: In singleplayer (game_mode >= 3), calls `rush_buy_AI()` which spends treasury gold to accelerate wonder completion. On failure, resets production.
   - JS: No AI rush-buy logic at all. **DISCREPANCY**: AI cannot rush-buy production.

9. **Missing: SS component slot assignment (lines 4935-4951)**
   - Binary: For SS items 35-37, calls `find_space_slot()` to determine which specific slot (out of multiple possible) the component goes into. Reassigns production code to the combined slot ID. If no slot available, forces production change.
   - JS: SS parts are handled as buildings added to the city's building set. No slot assignment. **DISCREPANCY**: Space race component placement is simplified.

10. **Missing: Manhattan Project nuke stockpile halving (lines 4957-4961)**
    - Binary: `for civ 1-7: nukeByte = clamp((nukeByte + 1) / 2, 0, 6)`
    - JS (lines 490-504): Implemented. `halved = Math.min(6, Math.max(0, Math.floor((nukeByte + 1) / 2)))`.
    - **Implemented correctly.**

11. **Missing: Darwin's Voyage grants 2 free techs via `reveal_map()` (line 5138)**
    - Binary: `thunk_FUN_004c21d5(local_84, 0)` called TWICE. This function is `reveal_map` which in this context actually grants a free tech (the function is overloaded based on param_2=0 meaning "grant tech").
    - JS (lines 462-486): Grants 2 techs directly via `grantAdvance()` with anarchy deferral logic. **Implemented correctly**, though the mechanism differs.

12. **Missing: United Nations wonder effect (local_3c == 0x19, line 5147-5149)**
    - Binary: `thunk_FUN_004f1220()` = `handle_space_race_victory()` — triggers a UN election/diplomatic victory check.
    - JS: No United Nations wonder effect. Wonder 25 is Apollo Program in the JS (line 508). **DISCREPANCY**: UN wonder (wonder index 25) diplomatic victory effect is missing.

13. **Missing: Eiffel Tower effect mismatch (local_3c == 0x14 = wonder 20, line 5144-5146)**
    - Binary: `thunk_FUN_004ec312(local_84)` = `handle_espionage_discovery()` — halves defense rating, sets espionage flag, penalizes diplomatic relations.
    - JS (lines 550-564): Recalculates attitude scores for all civs toward the builder. **DISCREPANCY**: Binary does espionage flag + defense halving + diplomacy penalty, not just attitude recalculation.

14. **Missing: Post-wonder force-reassign invalidates matching negative-coded cities (lines 5154-5164)**
    - Binary: After completing a wonder, iterates ALL cities. If any city (including other civs') has the same negative production code AND is NOT AI, calls `change_production(oci, 99)`.
    - JS (lines 568-583): Checks `oc.itemInProduction?.type === 'wonder' && oc.itemInProduction?.id === item.id`. Resets to Warriors. **Partially implemented** — JS checks by item type/id instead of raw production code, which is functionally equivalent. However, JS also sets `shieldsInBox: 0` which the binary does NOT do (the binary only calls `change_production`, it doesn't zero shields). **DISCREPANCY**: JS incorrectly zeroes shield box on wonder race loss; binary preserves accumulated shields.

15. **Missing: "Civilopedia notification" flag for wonder completion (local_3c >= 0, line 5093-5096)**
    - Binary: If `local_5c != 0` AND wonder AND current player AND not multiplayer AND flag `DAT_00655aea bit 1` set: calls `thunk_FUN_004bb8e0(local_3c)` (wonder Civilopedia view).
    - JS: No Civilopedia integration. **UI only, not game logic.**

16. **Missing: Unit auto-upgrade on unit production path (lines 5174-5194)**
    - Binary: Checks if the unit type being built has an obsoleting tech discovered by the civ. Scans all 62 unit types for a replacement with matching role and domain.
    - JS: `checkUnitAutoUpgrade()` (research.js:635) does this, called at the START of `processCityProduction()`. **Implemented**, but the upgrade search criteria differ slightly:
      - Binary: matches by `DAT_0064b1cb` (obsoleteTech field of candidate) == same obsoleteTech AND same `DAT_0064b1ca` (domain)
      - JS: matches by `UNIT_PREREQS[candidate] === obsoleteTech` AND same `UNIT_DOMAIN` AND `UNIT_ATK[candidate] >= UNIT_ATK[old]`
      - **Minor difference**: JS adds an attack-power requirement that the binary doesn't have.

17. **Missing: Settler from size-1 city guard (lines 5202-5206, 5247-5283)**
    - Binary: If unit role == 5 (diplomat/spy-like, but actually this is settler role check) AND city size == 1:
      - On Chieftain difficulty (`DAT_00655b08 == 0`): return early (can't build)
      - If this is the civ's only city: return early
      - If human player: show "GHOSTTOWN" dialog for confirmation. If declined, delete unit and return.
      - Otherwise: decrement city size. If size reaches 0, delete city, check civ elimination, create unit at former city location.
    - JS (lines 397-405): Only handles the shrink for `city.size > 1`. Does NOT:
      - Block settlers at size 1 on Chieftain
      - Show GHOSTTOWN dialog for last-city scenarios
      - Handle city destruction when building a settler from size-1 city
    - **DISCREPANCY**: Missing size-1 settler guardrails and city destruction path.

18. **Missing: Diplomat/Spy auto-goto targeting for newly built units (lines 5293-5365)**
    - Binary: When a diplomat/spy unit (role 6) is built by a non-AI civ, finds the nearest enemy city and sets the unit's GOTO target.
    - JS: No auto-goto for diplomats. **DISCREPANCY** but minor (AI behavior).

19. **Missing: Veteran status — Port Facility (building 34) for sea units**
    - Binary (lines 5209-5242): Complex veteran assignment based on unit domain, buildings, and government. Includes checks for `has_building(param_1, 2)` (Barracks for land), government-specific rules.
    - JS (lines 373-380): Checks Barracks(2)/Sun Tzu(7), Airport(32) for air, Port Facility(34)/Lighthouse(3) for sea, Communism+settler.
    - **Mostly implemented.** One difference: the binary also checks `has_tech(0x10)` (Gunpowder) for additional veteran conditions. JS doesn't check Gunpowder for veteran status. **Minor discrepancy.**

20. **Missing: Unit role 5 (settler) produces at Communism = veteran (line 5216-5219)**
    - Binary: If role == 6 (unit domain check) AND government is communism (0x03): set veteran flag 0x2000.
    - JS (line 379): `govt === 'communism' && unitRole === 6`. **Implemented.**

21. **Missing: Caravan commodity selection — full dialog for human players (lines 5376-5448)**
    - Binary: For human players building Caravans (role 7), shows a dialog listing the city's 3 trade commodities plus a "none" option. Player selects which commodity the caravan carries.
    - JS (lines 408-410): Calls `assignCaravanCommodity()` which auto-selects based on supply/demand calculation. No player choice. **DISCREPANCY**: Human players cannot choose caravan commodity.

22. **Missing: Diplomat initial target byte on spy units (line 5243-5245)**
    - Binary: If unit role == 4 (?) : sets `DAT_006560fd[unit*0x20] = -1 - (param_1 & 0x3F)` — encodes home city into the unit record.
    - JS: No equivalent. **Minor** — affects spy behavior.

23. **Missing: Firepower-based intel reset (lines 5366-5371)**
    - Binary: If unit has high firepower (> 'b' = 98) AND this civ has exactly 1 unit of this type with that upgrade: reset all other civs' intelligence on this unit type to -1.
    - JS: No equivalent. **Minor** — affects AI awareness.

24. **Missing: Entire AI rush-buy section (lines 5494-5593)**
    - Binary: Massive block that decides how much gold the AI should spend to rush-buy the current production item. Uses complex heuristics based on:
      - Treasury size (bit shifts: >>3, >>4, >>6, >>7, >>8)
      - Space race status
      - Disorder status
      - Wonder competition
      - Difficulty-based refund calculation
    - JS: Not implemented at all. **MAJOR DISCREPANCY**: AI cannot spend gold to accelerate production.

25. **Missing: "Almost wonder" notification (lines 5594-5618)**
    - Binary: If a wonder is close to completion (shields + next turn production >= cost) AND unclaimed AND not multiplayer: show "ALMOSTWONDER" dialog to human player.
    - JS: No equivalent notification. **UI only.**

26. **Missing: Shield overflow capping**
    - Binary (lines 4984-4985): `shield_box -= cost` (simple subtraction). No explicit overflow cap — shields carry over fully.
    - JS (line 364): `newShields = Math.min(overflow, cost)` — caps overflow at item cost.
    - **DISCREPANCY**: JS caps overflow at the item cost, binary allows unlimited carryover. The JS approach matches Civ2's documented rule, but the binary may allow larger carryover in some edge cases.

27. **Missing: Cleanup flag clearing (line 5621)**
    - Binary: Always clears bit 0x20 from city flags at the end (siege/production-forced flag).
    - JS: No equivalent flag management. **Minor** — the JS model doesn't use this flag.

### Summary of wonder-specific effects

| Wonder | Binary Effect | JS Effect | Match? |
|--------|-------------|-----------|--------|
| 0 (Pyramids) | N/A in production | N/A | - |
| 9 (Marco Polo) | Contact via rush_buy_AI | Contact all civs | Partial |
| 14 (Leonardo's) | upgrade_units_for_tech | upgradeUnitsForTech | Yes |
| 18 (Darwin's) | 2x reveal_map (=2 free techs) | 2 grantAdvance + anarchy defer | Yes |
| 20 (Eiffel Tower) | handle_espionage_discovery | calcAttitudeScore recalc | Different |
| 23 (Manhattan) | Halve nuke stockpile + notify | nuclearEnabled + halve stockpile | Yes |
| 25 (Apollo/UN?) | handle_space_race_victory | Map reveal for owner | Different |
| 26 (SETI) | N/A in production code directly | Halve research cost | Partial |

---

## Summary

**Binary**: ~850 lines of C across 4 major phases (init, building/wonder, unit, AI rush-buy), with ~45 distinct branches/conditions.

**JS**: ~280 lines covering phases 1-3 (init through unit/building/wonder completion).

| Metric | Count |
|--------|-------|
| Total binary branches | ~45 |
| Implemented in JS | ~22 |
| Missing entirely | ~15 |
| Partially different | ~8 |

### Major missing features (game logic impact):
1. **AI rush-buy** — entire treasury-spend system for AI production acceleration (biggest gap)
2. **Capitalization** — shields-to-gold conversion item
3. **Space race prerequisites** — Apollo Program check before building SS parts
4. **Wonder slot pre-claiming** — multiplayer race resolution
5. **Settler from size-1 city** — missing guardrails and city destruction
6. **United Nations wonder** — diplomatic victory trigger
7. **Eiffel Tower effect** — wrong behavior (attitude recalc vs espionage penalty)
8. **Shield overflow on wonder race loss** — JS incorrectly zeroes shields
9. **Caravan commodity dialog** — human players can't choose commodity

### Correctly implemented:
1. Shield accumulation and completion check
2. Unit creation with veteran status
3. Building placement with Palace uniqueness
4. Wonder completion with race detection and refund
5. Darwin's Voyage (2 free techs + anarchy deferral)
6. Manhattan Project (nuke stockpile halving)
7. Leonardo's Workshop (unit upgrades)
8. Force-reassign other cities building same wonder
9. Settler city-shrink on production
10. Caravan/Freight commodity auto-assignment
11. Unit auto-upgrade for obsoleted types
