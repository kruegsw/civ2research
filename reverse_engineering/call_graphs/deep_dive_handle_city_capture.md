# Deep Dive: handle_city_capture (FUN_0057b5df)

Binary: `FUN_0057b5df` (0x0057B5DF, 11,451 bytes)
JS primary: `charlizationv3/engine/citycapture.js` handleCityCapture()
JS trigger: `charlizationv3/engine/reduce/move-unit.js` -> `reduce/helpers.js` captureCity()

## Parameters

| Binary | JS |
|--------|-----|
| `param_1` = city index | `cityIndex` |
| `param_2` = capturer civ slot | `capturerCivSlot` |
| `param_3` = capture type (0=normal, 1=transfer, 2=treaty-exempt) | `opts.captureType` |

---

## Branch-by-Branch Comparison

### 1. Treaty Violation Check (Diplomatic Consequences)

**Binary (lines 4527-4565)**:
- If `param_3 < 2`: calls `diplomacy_check_treaty_violation(param_2, local_84)` (FUN_00579c40)
  - Sets 0x1000 reputation flag if treaty broken
  - Checks ceasefire violations, sets 0x2000 war flag
  - Calls attitude adjustment functions
- Calls `thunk_FUN_00467825(param_2, local_84, 0x800)` -- sets war flag 0x800 (war due to city capture)
- If capturer is human AND attacker is higher age rank: checks "first city captured revenge" and may set 0x400000 flag
- Checks occupied/revenge: If old owner is AI, city size > 14, not recapture -> sets 0x10 flag (occupied)

**JS**:
- Handled in `move-unit.js` BEFORE calling captureCity:
  - `diplomacyDeclareWar(state, mapBase, civSlot, defCivSlot)` in combat path
  - Sneak attack flag set in move-unit.js for undefended city capture (lines 764-773)
- handleCityCapture itself does NOT do treaty violation checks

**DISCREPANCY**: The binary does extensive treaty flag manipulation inside handle_city_capture itself (0x800, 0x400000, 0x10 flags). The JS splits this between move-unit.js (war declaration) and citycapture.js (none). The specific flags 0x400000 (two-city revenge), 0x10 (occupied), and 0x800 (war-due-to-capture) are **not implemented** in the JS.

**Severity**: MEDIUM -- The 0x400000 flag affects AI diplomatic calculations. The 0x10 (occupied) flag affects city disorder display. The 0x800 flag is a war-reason marker.

---

### 2. Civil War Check (Capital Captured -> Civ Splits)

**Binary (lines 4566-4586)**:
- Condition: old owner is NOT human (`DAT_00655b0b` bit test), city has Palace (building 1), remaining cities > 4 (`*(short *)(&DAT_0064c708 + local_84 * 0x594) > 4`)
- Additional condition: Checks "age rank" comparison:
  - If capturer IS human: `age[param_2] < age[old_owner]`
  - If capturer is NOT human: `age[DAT_00655c21] < age[old_owner]` (uses current player's age rank)
- Calls `handle_civil_war(local_84)` (FUN_0057a904)
- If civil war fails: `local_398 = thunk_FUN_0057a685(local_84)` (find_most_central_city)
- The "4 remaining cities" check uses the civ's city count field `DAT_0064c708`

**JS (lines 446-454)**:
- Condition: `hadPalace && countCities(state, oldOwner) >= 6 && !isSchismBlocked(state, oldOwner)`
- Note: uses `>= 6` because "this city hasn't been transferred yet (it counts as 1 of the 6)"
- No age rank comparison
- Calls `handleCivilWar(state, mapBase, oldOwner, cityIndex)`

**DISCREPANCY**:
1. **Age rank check MISSING in JS**: Binary requires `age[capturer_or_player] < age[old_owner]` for civil war to trigger. This is a significant filter -- civil war only happens when a technologically younger civ captures a more advanced one's capital.
2. **Human player exception**: Binary only triggers civil war if old owner is NOT human. JS has no such check.
3. **City count threshold**: Binary checks `> 4` on the civ's stored city count field. JS counts remaining cities and checks `>= 6` (accounting for the captured city still being counted). These should be equivalent if the city count is up-to-date, but the binary uses a pre-computed field while JS counts dynamically.

**Severity**: HIGH -- The age rank check is a fundamental gate on civil war. Without it, civil wars trigger far more often than in original Civ2.

---

### 3. Capital Escape (Palace Relocation Scoring)

**Binary (lines 4587-4694)**:
- Called only if city had Palace (`thunk_FUN_0043d20a(param_1, 1) != 0`)
- Iterates all cities of old owner, scoring candidates:
  - Eligibility: `candidateSize >= capturedSize/2` AND `candidateSize > 7`
  - Score = `candidateSize * 3 - distance`
  - `+ stackCount * 4` where stackCount = military units at candidate via `thunk_FUN_005b50ad(local_3cc, 2)`
  - Building 0x1B (Cure for Cancer, wonder 27): `score = (score * 3) / 2`
  - Building 8 (City Walls) OR wonder 6 (Great Wall): `score = score << 1` (double)
  - Building 0x11 (SDI Defense, building 17): `score = score * 3`
  - Same continent check (`thunk_FUN_005b8a81`): different continent -> `score = score / 2`
  - NO coastal bonus in binary
- Then a complex escape dialog/AI decision:
  - If `civ_science_points > 999` AND best candidate found AND no civil war:
    - For human active player: shows CANESCAPE dialog, user chooses
    - For AI or non-active human: auto-decides based on conditions:
      - If AI, `> 11 cities` or `> 1999 science`: always escape
    - If escape succeeds: `civ_science_points -= 1000`, builds Palace at escape city, shows ESCAPE message
  - If escape fails: calls `thunk_FUN_004a762d(local_84)` (destroy_all_improvements?)

**JS (lines 692-791)**:
- Same Palace check
- Score formula closely matches:
  - `score = c.size * 3 - dist + stackCount * 4`
  - Cure for Cancer (27): `score = Math.floor(score * 3 / 2)` -- matches
  - City Walls (8) or Great Wall (6): `score *= 2` -- matches
  - Same continent: `score += 2`, different: `score = Math.floor(score / 2)` -- DIFFERS (binary has no +2 for same continent)
  - Coastal bonus: `+3` -- NOT IN BINARY
  - Adam Smith's Trading Co (17): `score *= 3` -- binary uses building 0x11 which is SDI Defense (building 17), not the wonder

**DISCREPANCIES**:
1. **Coastal bonus (+3) is INVENTED**: Binary has no coastal bonus.
2. **Same-continent bonus (+2) is INVENTED**: Binary does NOT add +2 for same continent, only divides by 2 for different continent.
3. **Adam Smith vs SDI confusion**: JS checks `civHasWonder(state, oldOwner, 17)` (wonder 17 = Adam Smith's Trading Co), but the binary checks `thunk_FUN_0043d20a(local_1c, 0x11)` which is `has_building(city, 17)` = SDI Defense (building 17, not wonder 17). This is **building 17** not **wonder 17**.
4. **Science point cost MISSING**: Binary deducts 1000 science points for successful escape. JS does not.
5. **Escape decision logic MISSING**: Binary has a complex dialog/AI decision tree with conditions (science > 999, city count > 11, science > 1999). JS always relocates the palace unconditionally.
6. **No escape -> destroy improvements**: Binary calls `thunk_FUN_004a762d(local_84)` if escape fails. JS has no equivalent.
7. **Eligibility**: Binary requires `candidateSize >= capturedSize/2`. JS requires `c.size > 7 && c.size * 3 > city.size * 2`. The `c.size > 7` matches, but the captured-size-ratio check differs slightly.
8. **Simple fallback**: JS has a fallback path (lines 763-774) that picks largest city when no candidate qualifies. Binary does not have this -- it either escapes or fails.

**Severity**: HIGH -- Multiple formula errors, an invented coastal bonus, SDI/Adam Smith confusion, and missing science cost.

---

### 4. Gold Plunder

**Binary (lines 4587, 4778-4784)**:
- `local_74 = thunk_FUN_00579dbb(param_1)` -- calc_city_value_for_capture
- Formula: `(city_size * civ_treasury) / (civ_num_cities + 1)`, with overflow protection
- Uses `DAT_0064c70c` = **civ_num_cities**, NOT total population
- Later: `local_74 = thunk_FUN_005adfa0(local_74, 0, treasury)` -- clamp to [0, treasury]
- Deducts from old owner, adds to capturer (if non-barbarian)

**JS (lines 456-488)**:
- Custom implementation using `totalPop` (sum of all city sizes)
- Formula: `(city.size * oldTreasury) / (totalPop + 1)`
- Same overflow protection logic

**DISCREPANCY**: The denominator is **wrong** in JS. Binary uses `civ_num_cities + 1`, JS uses `totalPop + 1`. These produce very different results. A civ with 10 cities averaging size 8 would have totalPop=80 vs numCities=10. The JS formula gives ~8x less gold plunder.

**Severity**: CRITICAL -- This fundamentally changes the gold plunder amount. A city-10 civ with 1000 gold and 10 cities: binary gives `(10 * 1000) / 11 = 909` gold. JS with totalPop=80 gives `(10 * 1000) / 81 = 123` gold.

---

### 5. Tech Theft

**Binary (lines 4998-5000)**:
- `thunk_FUN_0057a27a(param_2, local_84)` = diplomacy_steal_tech
- Only called if scenario flag check passes: `((DAT_00655af0 & 0x80) == 0) || ((DAT_0064bc60 & 0x20) == 0)`
- diplomacy_steal_tech (FUN_0057a27a):
  - Returns immediately if either param is 0 (barbarian)
  - For human player: shows dialog to **choose** which tech to steal
  - For AI: picks highest-value tech
  - Always steals exactly one tech (no probability check)
  - Filters out certain scenario-restricted techs

**JS (lines 490-515)**:
- ~33% chance to steal (`rand() % 3 === 0`)
- Stolen tech is random from available pool
- No dialog for human player to choose

**DISCREPANCIES**:
1. **No probability in binary**: Binary ALWAYS steals one tech. JS only has 33% chance.
2. **No player choice in JS**: Binary lets human player choose which tech. JS picks randomly.
3. **Scenario flag check MISSING**: Binary has a scenario flag gate.

**Severity**: HIGH -- Tech theft is a guaranteed event in original Civ2, not a 33% random roll.

---

### 6. Wonder Handling (Capture & Destruction)

**Binary (lines 4696-4777)**:
- Checks city's production field `DAT_0064f379` for negative values < -0x26 (-38), indicating wonder under construction
- If wonder was being built: counts how many other cities of old owner are also building it
  - If 0 other cities: shows ABANDONWONDER notification, sends multiplayer event 0x14
  - If 1+ other cities: shows STILLWONDER notification with count
  - Calls `thunk_FUN_0059ec88` (show wonder movie/graphic)
- For completed wonders (lines 4741-4777): iterates all 28 wonders (0x1C)
  - For each wonder owned by this city (`thunk_FUN_00453e18` = get_wonder_city):
    - Shows CAPTUREWONDER to capturer, LOSTWONDER to old owner
    - If wonder is Marco Polo's Embassy (index 0x14=20): calls `thunk_FUN_004ec312(param_2)` (recalculate embassy contacts)

**JS (lines 585-598)**:
- Emits `wonderCaptured` events for each wonder in the city
- No in-progress wonder handling
- No Marco Polo's Embassy special handling

**DISCREPANCIES**:
1. **In-progress wonder handling MISSING**: Binary handles wonders under construction (abandon/continue notifications). JS ignores this entirely.
2. **Marco Polo's Embassy MISSING**: Binary has special handling for wonder 20 (Marco Polo) -- recalculates embassy contacts when captured. JS does not.
3. **Wonder movie/notification MISSING**: Binary shows CAPTUREWONDER/LOSTWONDER dialogs. JS only emits events.

**Severity**: MEDIUM -- In-progress wonder handling affects gameplay (notification about abandoned wonders). Marco Polo's Embassy recalculation is a real gameplay effect.

---

### 7. Population Reduction (City Size)

**Binary (lines 4810-4841)**:
- Complex condition for size reduction:
  - If `(param_3 == 0 && !recapture)` OR `(city.size > 1)`:
    - Additional sub-conditions for when size is NOT reduced:
      - If size < 2 AND specific AI/human conditions AND barbarian with no continent presence AND capturer is not age 7 -> 50% chance to NOT reduce
    - Otherwise: `city.size -= 1`
  - If `city.size == 0`: calls `thunk_delete_city(param_1, 0)` and sets param_1 = -1
- The barbarian capture vs human capture logic creates different behavior for size 1 cities

**JS (lines 517-553)**:
- `if (captureType === 0 && !wasOurs): newSize = max(1, size - 1)`
- `else if (size > 1): newSize = max(1, size - 1)`
- If `newSize <= 0`: city destroyed (shouldn't happen due to max(1))

**DISCREPANCIES**:
1. **Barbarian special case MISSING**: Binary has a complex check for barbarian captures where size-1 cities have a 50% chance of survival. JS always reduces by 1 (min 1).
2. **City destruction path**: Binary can destroy the city (size to 0) via `thunk_delete_city`. JS clamps to min 1 so city is never destroyed on capture.
3. **AI vs human age-rank interaction**: Binary factors in the age rank comparison when deciding whether to reduce size. JS does not.

**Severity**: MEDIUM -- Size-1 cities can be destroyed in original Civ2 under certain conditions. JS always preserves them.

---

### 8. Building Destruction

**Binary (lines 4795-4809)**:
- Always destroys (if not recapture): buildings 1 (Palace), 4 (Temple), 0xB=11 (Cathedral), 7 (Courthouse)
  - via `thunk_FUN_0043d289(param_1, buildingId, 0)` (set_building to OFF)
- Random destruction (if param_3==0 AND not recapture):
  - `iVar6 = _rand()` -- uses C runtime rand()
  - Applies mask: `building_bytes[i] &= (0xAA >> (rand_bit & 1))`
  - Iterates 5 bytes of the building bitfield (covers buildings 1-40)
  - The mask 0xAA = 10101010 or shifted to 0x55 = 01010101

**JS (lines 556-580)**:
- Same always-destroyed set: {1, 4, 7, 11}
- Random mask logic:
  - `shift = rand() & 1`
  - `mask = 0xAA >>> shift` = either 0xAA or 0x55
  - Iterates remaining buildings, checks each bit against the mask

**MATCH**: The always-destroyed set and 0xAA mask pattern match. However:

**MINOR DISCREPANCY**: Binary applies the mask directly to the 5-byte bitfield with a byte-level AND. JS iterates individual building IDs and computes byte/bit positions. The results should be equivalent, but the JS recomputes `(0xAA >>> shift) & 0xFF` per building instead of once per byte, which always produces the same mask value since shift is 0 or 1. This is functionally correct.

**Severity**: LOW -- Logic matches.

---

### 9. Trade Route Disruption

**Binary (lines 5002-5029)**:
- Iterates all units (DAT_00655b16 count) backwards
- For each unit homed to the captured city (`(&DAT_00656100)[local_3cc * 0x20] == param_1`) AND owned by old owner:
  - If unit is a Diplomat (type 9 in binary unit type system): sets home to 0xFF (no home)
  - Otherwise: tries to find nearest own city via `thunk_FUN_0043cf76`
    - If found and different city: checks if unit role is 1 (settler/worker) AND `thunk_FUN_005b53b6(local_3cc, 1) == 1` -> reassign home
    - Otherwise: marks city as needing production recalc (flag 0x20) and calls `thunk_FUN_005b6042(local_3cc, 1)` (delete_unit_visible)
  - For trade units: if unit is Diplomat (type 9), sets home city to 0xFF

**JS (lines 928-950)**:
- Iterates all units
- Diplomats (type 46) and Spies (type 47): set home to 0xFFFF
- Others: find nearest own city, reassign

**DISCREPANCIES**:
1. **Unit deletion MISSING**: Binary deletes units that can't be rehomed (calls delete_unit_visible). JS always reassigns to nearest city or sets no-home.
2. **Diplomat type mismatch**: Binary checks type 9 (which in the 0x20-byte unit struct is the role field, not the type). The JS checks types 46 and 47 (Diplomat, Spy). This likely refers to the same thing via different field interpretation.
3. **Trade route disruption**: Binary iterates units and handles trade-route-related units. The actual trade route record clearing is handled separately. JS sets `tradeRoutes: []` on the captured city (line 629) but does NOT clean up trade routes pointing TO this city from other cities (only does so in the city-destroyed path, line 532-540).

**Severity**: MEDIUM -- Units that can't be rehomed should be deleted, not left homeless. Trade route cleanup from partner cities is missing in the capture (non-destroy) path.

---

### 10. Partisan Spawning

**Binary (lines 5103-5243)**:
- Condition: `kill_civ returned 0` (civ NOT eliminated) AND city still exists AND not recapture AND:
  - Old owner's government == Communism (3) OR Democracy (6)
  - OR `DAT_00655b40 != 0` (scenario partisans flag)
  - OR old owner has tech 0xF (Communism tech)
- Count formula:
  - `govtDiff = abs(old_govt - capturer_govt)`
  - `ageDiff = abs(old_age - capturer_age)`
  - `partisanCount = ((citySize + 5 + rounding) >> 3) * (govtDiff + ageDiff + 1) / 2`
  - If param_3 != 0 (not normal capture): `count /= 2`
  - Tech 0x11 (Conscription): if old owner lacks it, `count -= 1`
  - Tech 0x22 (Guerrilla Warfare): if old owner lacks it AND also lacks tech 0xF (Communism):
    - `count = 0` (no partisans at all)
    - Also if old owner lacks tech 0x23 (Democracy tech): `count = 0`
  - If old owner HAS Guerrilla Warfare BUT capturer does NOT: `count *= 2` (double)
  - If both have it: `count += 1`
- Spawning: for each partisan, searches 20 city-radius tiles for valid placement
  - Score: terrain defense * 2, + road/railroad, + farmland doubles, + fortress bonus
  - Creates unit type 9 (Partisan) at best tile via `thunk_FUN_005b3d06`
  - Sets unit to veteran status (mode 2 = fortified)
  - Veteran probability based on difficulty range: `(rand() % (iVar6 + 1)) != 0`

**JS (lines 793-888)**:
- Condition: `captureType === 0 && oldOwner > 0`
  - Requires Guerrilla Warfare tech AND (Communism OR Democracy tech)
- Count formula:
  - `govtDiff = abs(defGovt - atkGovt)`
  - `ageDiff = abs(defTechs - atkTechs) >> 3`
  - `partisanCount = floor(((city.size + 5) / 8) * (govtDiff + ageDiff + 1) / 2)`
  - If no Conscription (tech 17): `count -= 1`
  - If capturer has Guerrilla Warfare: `count += 1`; else: `count *= 2`
  - Clamped to [1, 8]
- Spawning: searches 7x7 grid (dx/dy -3 to +3)
  - Score: TERRAIN_DEFENSE value, + road/railroad, + farmland doubles, + fortress
  - Veteran: 50% chance

**DISCREPANCIES**:
1. **Government check MISSING**: Binary checks old owner's GOVERNMENT (Communism=3 or Democracy=6). JS only checks TECH (Communism or Democracy). These are different -- a civ can have the tech without being in that government.
2. **Scenario partisans flag MISSING**: Binary checks `DAT_00655b40` for scenario-forced partisans.
3. **Double-zero guard MISSING**: Binary has a complex check where lacking both Guerrilla Warfare AND Communism tech sets count to 0, AND lacking Democracy tech also sets count to 0. JS requires Guerrilla Warfare as a hard prerequisite, which is slightly different logic.
4. **Age diff calculation differs**: Binary uses `age rank` (DAT_00655c22), JS uses `techCount >> 3`. These approximate the same thing but can differ.
5. **Tile search area differs**: Binary searches the 20 city-radius tiles. JS searches a 7x7 grid. Different tile sets.
6. **Veteran probability**: Binary uses difficulty-scaled randomness. JS uses flat 50%.
7. **Cap at 8**: JS caps at 8 partisans. Binary has no explicit cap (limited only by available tiles).
8. **param_3 != 0 halving MISSING**: Binary halves partisan count for non-normal captures.

**Severity**: MEDIUM-HIGH -- Government vs tech check is the biggest issue. The overall formula is close but has multiple small deviations.

---

### 11. Civ Elimination Check

**Binary (line 5104)**:
- `iVar6 = thunk_kill_civ(local_84, param_2)` -- called AFTER partisans would be spawned
- Wait -- actually looking more carefully: `thunk_kill_civ` is at line 5104 (label LAB_0057da76), which is BEFORE the partisan spawning block
- The check `iVar6 == 0` (civ NOT eliminated) gates the partisan spawning

**JS (lines 891-898)**:
- Elimination check is AFTER partisan spawning
- `killCiv(state, mapBase, oldOwner, capturerCivSlot)` called only if no cities AND no units remain

**DISCREPANCY**: Order is **reversed**. Binary checks elimination FIRST, then spawns partisans only if civ survives. JS spawns partisans FIRST, then checks elimination. Since partisans create new units for the old owner, this means in JS the partisans could prevent elimination, while in the binary they can't (partisans are only spawned if the civ already survived).

**Severity**: HIGH -- This ordering difference means a civ that loses its last city could survive in JS (via partisans) but would be eliminated in binary.

---

### 12. City Production Reset & Ownership Transfer

**Binary (lines 4788-4861)**:
- `DAT_0064f35c[param_1 * 0x58] = 0` -- shields in box = 0
- `DAT_0064f344[param_1 * 0x58] &= 0xFFFFFFC4` -- clear city flags (keeps only bits 2, 6 = 0xC4 mask?)
  - Wait, 0xFFFFFFc4 = keep bits 2,6,7 and all above. Clears bits 0,1,3,4,5.
- If production item >= 0: decrements building count for old owner
- Building destruction (already covered)
- Sets owner: `DAT_0064f348[param_1 * 0x58] = param_2`
- Calls `thunk_FUN_0043cc00(param_1, local_84)` -- city_set_specialist_slot (resets specialists)
- If scenario events enabled: `thunk_FUN_004fc2bb` -- event_check_city_taken
- Updates visibility around city (21 tiles for capturer, 8 tiles for new visibility ring)
- Sets tile ownership for 21 city-radius tiles

**JS (lines 612-682)**:
- Creates new city object with:
  - `shieldsInBox: 0, foodInBox: 0`
  - `itemInProduction: { type: 'unit', id: 2 }` (Warriors)
  - `civilDisorder: false, weLoveKingDay: false`
  - `specialists: []`
  - `tradeRoutes: []`
  - `resistanceTurns` based on government
  - `originalOwner: oldOwner`
- Updates tile ownership for city tile and 20 radius tiles
- Updates visibility

**DISCREPANCIES**:
1. **Food box ZEROED in JS but NOT in binary**: Binary only zeroes shields. JS also zeroes food. In original Civ2, food box is preserved on capture.
2. **Item in production**: Binary preserves the raw production value but decrements building counts. JS forces Warriors. In original Civ2, the production item is typically preserved (but shields are reset).
3. **Trade routes**: JS explicitly clears trade routes. Binary handles this through the unit reassignment path (trade units rehomed/deleted), not by clearing the city's route records.
4. **Resistance turns**: JS computes resistance based on Republic/Democracy government. Binary handles resistance separately (via `thunk_handle_city_disorder_00509590`).

**Severity**: MEDIUM -- Food box zeroing is wrong. Production item forced to Warriors is wrong (should keep the item but zero shields).

---

### 13. Resistance Turns

**Binary (lines 5030-5101)**:
- Republic/Democracy check via government index >= 5: sets resistance flag (bit 1 in city flags)
- Handles AI production reassignment: `thunk_FUN_004bfe5a` and `thunk_FUN_004c03ae`
  - If capturer is human: runs city production advisor
  - Sets initial production via a priority scan of all building types (lines 5066-5083):
    - Iterates buildings 0x3E down to 0, checking role==1 and buildability
    - Scores by: `(defense_cost << 3) / shield_cost`, with bonus for air units
    - Picks highest-scoring buildable item
- Updates visibility for 8 adjacent tiles around the city
- Sets `DAT_0062edf8 = 1` (city window update flag)
- Calls `thunk_citywin_DADA()` and `thunk_handle_city_disorder_00509590` (disorder calculation)

**JS (lines 602-610)**:
- `if (capGovtIdx >= 5 || oldGovtIdx >= 5): resistanceTurns = max(1, floor(newSize / 2))`

**DISCREPANCY**:
1. **Resistance formula differs**: JS uses `max(1, floor(newSize / 2))`. Binary does not compute a specific turn count here -- it sets a flag and lets the disorder handler calculate it each turn.
2. **AI production selection MISSING**: Binary runs a priority-based production advisor for AI-captured cities. JS forces Warriors.
3. **Visibility update for adjacent tiles**: Binary updates 8 tiles around city. JS updates with radius 2.

**Severity**: LOW-MEDIUM -- The resistance mechanism differs in implementation but the effect is similar.

---

### 14. Diplomatic Notifications to All Civs

**Binary (lines 4876-4997)**:
- If both attacker AND defender are AI (no human involved) OR multiplayer:
  - Iterates all 7 civs (1-7)
  - For each alive human civ that can see the event:
    - Checks alliance/treaty relationships with both attacker and defender
    - Shows appropriate message:
      - CITYWINALLY: ally of capturer
      - CITYLOSEALLY: ally of old owner
      - CITYCAPTURE2: has embassy/intelligence with both sides
    - Sends multiplayer network events (thunk_FUN_0046b14d, thunk_FUN_00511880)
- If human is involved (attacker or defender):
  - Shows CITYCAPTURE dialog
  - Sends network events to other human players

**JS**: No third-party diplomatic notification system. Only emits capture events.

**DISCREPANCY**: MISSING -- The entire diplomatic notification cascade to allied/aware civs is not implemented. In multiplayer or with allies, they should see specific messages about the capture.

**Severity**: LOW -- This is a notification/UI feature, not a game logic issue.

---

### 15. Original Owner / Turn Captured Fields

**Binary (lines 5244-5251)**:
- `DAT_0064f34a[param_1 * 0x58] = local_84` (originalOwner = old owner)
- `DAT_0064f34b[param_1 * 0x58] = DAT_00655af8` (turnCaptured = current turn)
- Checks if Eiffel Tower (wonder 14) was in this city: calls `thunk_FUN_004be6ba(param_2)` (recalc reputation)

**JS (line 631)**:
- `originalOwner: oldOwner, turnCaptured: state.turn?.number || 0`

**DISCREPANCY**: Eiffel Tower special handling MISSING. When a city with the Eiffel Tower is captured, the binary recalculates the capturer's reputation. JS does not.

**Severity**: LOW -- Eiffel Tower reputation effect is minor.

---

### 16. Score/Power Recalculation

**Binary (lines 4785-4787)**:
- `thunk_FUN_00569363(1)` -- called if either capturer or old owner is the active human player
- This recalculates score/power displays

**JS**: No explicit score recalculation.

**DISCREPANCY**: Score/power recalc is a UI operation. Since JS computes scores on-demand rather than caching, this is acceptable.

**Severity**: NONE

---

### 17. Multiplayer Synchronization

**Binary (lines 4871-4875, 5252-5256)**:
- `thunk_FUN_004b0b53(0xFF, 2, 0, 0, 0)` -- broadcast state update
- `thunk_FUN_0046b14d(0x78, 0xFF, ...)` -- send sync packet
- `XD_FlushSendBuffer(5000)` -- flush with 5 second timeout
- Called at two points: after wonder handling and at function end

**JS**: WebSocket architecture handles sync differently (server-authoritative model).

**DISCREPANCY**: N/A -- Different networking architecture.

**Severity**: NONE

---

## Summary of Discrepancies

| # | Branch | Severity | Description |
|---|--------|----------|-------------|
| 1 | Treaty flags | MEDIUM | 0x400000 revenge, 0x10 occupied, 0x800 war-reason flags missing |
| 2 | Civil war gate | HIGH | Age rank comparison missing; human player exception missing |
| 3a | Capital escape: coastal | MEDIUM | +3 coastal bonus invented (not in binary) |
| 3b | Capital escape: same-continent | LOW | +2 same-continent bonus invented |
| 3c | Capital escape: SDI vs Adam Smith | HIGH | Building 17 (SDI Defense) confused with Wonder 17 (Adam Smith) |
| 3d | Capital escape: science cost | MEDIUM | 1000 science point deduction missing |
| 3e | Capital escape: escape decision | MEDIUM | Complex decision tree replaced with unconditional relocation |
| 4 | Gold plunder denominator | **CRITICAL** | `numCities+1` vs `totalPop+1` -- gives ~8x less gold |
| 5a | Tech theft probability | HIGH | Always steals in binary, 33% in JS |
| 5b | Tech theft choice | MEDIUM | Human player chooses in binary, random in JS |
| 6a | In-progress wonder | MEDIUM | Abandon/continue wonder notifications missing |
| 6b | Marco Polo's Embassy | LOW | Embassy recalculation on capture missing |
| 7 | City size barbarian | MEDIUM | Size-1 city destruction on barbarian capture missing |
| 8 | Building destruction | LOW | Functionally equivalent |
| 9a | Unit deletion | MEDIUM | Unhomeable units should be deleted, not left homeless |
| 9b | Trade route cleanup | MEDIUM | Partner city trade routes not cleared on capture (only on destroy) |
| 10 | Partisan government check | MEDIUM-HIGH | Checks tech instead of government type |
| 11 | Elimination ordering | HIGH | Partisans spawned before elimination check (reversed) |
| 12a | Food box | MEDIUM | Should be preserved, JS zeroes it |
| 12b | Production item | LOW | Should be preserved (with zeroed shields), JS forces Warriors |
| 13 | Eiffel Tower | LOW | Reputation recalculation missing |

### Critical Fix Needed
- **Gold plunder formula**: Change denominator from `totalPop + 1` to `numCities + 1` (count of old owner's cities, not sum of city sizes).

### High Priority Fixes
- **Tech theft**: Remove 33% probability gate; always steal one tech.
- **Civil war**: Add age rank comparison as prerequisite.
- **Capital escape SDI/Adam Smith**: Fix building 17 vs wonder 17 confusion.
- **Elimination ordering**: Move killCiv check before partisan spawning.
