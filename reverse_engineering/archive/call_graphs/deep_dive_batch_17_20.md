# Deep Dive: Batches 17–20 (23 Functions, ~75KB)

Comparison of decompiled binary functions against JS engine equivalents.
Each function analyzed: full C pseudocode read, JS counterpart read, branch-by-branch comparison.

---

## Batch 17

### 1. `spawn_barbarians` (FUN_00485c15, 3,297B) — vs `reduce/barbarians.js`

**Binary summary:** Two-phase barbarian spawning: (A) land barbarians in unexplored wilderness, (B) barbarians near random existing cities. Complex difficulty-scaled timing, unit-type era selection, leader unit spawning.

**Phase A — Wilderness spawn:**
- Timing check: `barbLevel != 0` required. If `difficulty < 5`: `timing = ((3 - barbLevel)*3 + 0x1E) * (5 - difficulty)`. If `difficulty >= 5`: `timing = (3 - barbLevel)*3 + 0x0F`. Then checks `(turnNumber+1) & mask == 0` where mask depends on barbLevel (1→0xF, 2→7, 3→7).
- Also checks `currentPlayer` is not at war (barbarian player flag check).
- Location: random tile within map bounds, must be land, unexplored (city owner check), with continent rating >= 0x10.
- Unit count: `clamp(turnNumber / (barbLevel * -50 + 250) + 1, 1, 5)` then +1 if barbLevel==3.
- Unit type: determined by global tech advancement flags (Horseback Riding, The Wheel, Metallurgy, Gunpowder, etc.), selecting from era-appropriate pool.
- Leader unit: always spawns type 0x2E (Diplomat) as leader; 50% chance for veteran flag on each unit.

**Phase B — City-proximity spawn:**
- Picks a random city, checks if city's civ is alive.
- Generates spawn location within 13-tile radius of city, requires land, same continent.
- Count based on city size; at barbLevel==3 and turn > 0x95, additional bonus units scaled by difficulty.
- Unit types selected by tech era; 1-in-3 chance for mixed attack/defense pair.
- Notifies player of barbarian uprising near their city.

**JS discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Timing mask** | barbLevel 1→0xF, 2→7, 3→7; checks `(turn+1) & mask == 0` | JS computes `frequencyMask` by doubling until >= timing, then subtracts 1. Different formula yields different masks. | **HIGH** — spawn frequency differs significantly |
| 2 | **Spawn count formula** | `clamp(turn/(barbLevel*-50+250)+1, 1, 5)` + bonus for level 3 | JS uses `1 + rng.nextInt(3)` × `DIFFICULTY_BARB_MULTIPLIER` — completely different formula | **HIGH** — unit counts wrong |
| 3 | **Unit type selection** | Binary checks specific tech flags (DAT_00655bbb=Horseback Riding, DAT_00655baf=The Wheel, etc.) to determine era pool; picks from pool with tech-gated entries | JS uses `maxTechCount` across all civs with hardcoded thresholds (10, 25, 45) — different mechanism | **MEDIUM** — similar intent, different trigger points |
| 4 | **Leader unit** | Binary spawns type 0x2E (Diplomat) as the leader unit; no gold attached | JS spawns Warriors (type 2) as leader with `barbarianGold = 25 * diffIdx` — wrong unit type and invented gold mechanic | **HIGH** — leader type and behavior wrong |
| 5 | **City-proximity phase** | Detailed city-based spawning with continent matching, size-scaled count, mixed unit types | JS has no equivalent city-proximity spawning phase — only wilderness + coastal | **HIGH** — entire phase missing |
| 6 | **Spawn tile validation** | Binary checks `get_continent_rating(x,y) >= 0x10` | JS checks `terrain !== 10` and visibility mask — no continent rating check | **MEDIUM** — different validation |
| 7 | **Camp founding** | Not in FUN_00485c15 (separate function) | JS includes camp founding in same function — structurally different but not a bug | LOW |
| 8 | **Two-phase check** | Phase A only fires if player-at-war flag is clear | JS has no such check | **MEDIUM** |

---

### 2. `handle_civil_war` (FUN_0057a904, 3,291B) — vs `citycapture.js handleCivilWar()`

**Binary summary:** Triggers civil war when a capital is captured. Finds an empty civ slot. Allocates new civ, copies properties, splits gold/research, copies techs, transfers map visibility, then uses a continent-based population-weighted algorithm to decide which cities transfer.

**Key binary logic:**
1. Check `can_do_civil_war(param_1)` — precondition check (probably 5+ cities).
2. Find empty civ slot (1-7) where `cityCount==0 && unitCount==0`.
3. Create new civ: copy gold (halved), research progress (halved), government, epoch, contact flags.
4. Set diplomacy: `new→old = 0x2001` (war+contact), `old→new = 0x82801`.
5. Copy map visibility: iterate all tiles, if old civ bit set, add new civ bit.
6. **City split algorithm — two paths:**
   - **Continent-balanced path**: Tally city sizes per continent. If `capitalPop < otherPop*2` AND `otherPop <= capitalPop`, split by continent — non-capital continents go to rebel.
   - **Distance-based path** (else): Transfer farthest cities until `transferred * 3 >= totalPop`. Uses `calc_distance()` for scoring.
7. Reassign units: iterate all units; if at a transferred city's tile, reassign to new civ.
8. Give palace to new civ's best city via `find_best_capital()`.
9. Also gives old civ a new palace if needed.

**JS discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Precondition** | Calls `can_do_civil_war()` — checks if civ qualifies | JS checks `remainingCities < 5` — correct threshold but may differ from sub-function | LOW |
| 2 | **Empty slot check** | Checks `cityCount[slot]==0 && unitCount[slot]==0` via stored counts | JS checks `!(civsAlive & (1<<i))` + `.some()` for cities/units — functionally equivalent | OK |
| 3 | **Gold split** | `new.gold = old.gold / 2; old.gold -= new.gold` | JS: same logic — `Math.floor(treasury/2)` | OK |
| 4 | **Diplomacy flags** | Sets precise bitfield values: `0x2001` and `0x82801` | JS does not set diplomacy relations between old and new civ at all | **HIGH** — missing war declaration |
| 5 | **Research progress** | `new.researchProgress = old >> 1` (bit shift) | JS: `Math.floor(researchProgress / 2)` — equivalent | OK |
| 6 | **Continent split algorithm** | Binary tallies per-continent city sizes (64 continents max), compares capital continent vs others | JS uses `Object.entries(continentPop)` with `mapBase.getBodyId()` — same concept | OK |
| 7 | **Balance condition** | `capitalPop < otherPop*2 && otherPop <= capitalPop` | JS: identical condition | OK |
| 8 | **Distance fallback** | Transfers farthest cities until `transferred*3 >= totalPop` | JS: sorts by distance descending, same threshold | OK |
| 9 | **Unit reassignment** | Binary iterates units at transferred city tiles AND uses `FUN_0057a7e9` to transfer city + units | JS checks tile location OR homeCityId — different heuristic | **MEDIUM** — unit assignment logic differs |
| 10 | **Capital temporary trick** | Sets `capturedCity.owner = 0xFF` temporarily to exclude from old civ's city scan, restores after | JS uses `capturedCityIndex` parameter to exclude — different but equivalent | OK |
| 11 | **Contact turn** | Sets `contactTurn[newCiv][allCivs] = currentTurn - 8` | JS does not set contact turns | **MEDIUM** |

---

### 3. `show_foreign_advisor` (FUN_004308ae, 3,218B) — vs advisors.js

**Binary summary:** Pure UI function. Creates a dialog showing foreign civ information (leader names, attitudes, embassy status, treaty info). Loops through civs 1-7, showing those with contact. Selection leads to intelligence report or heralds dialog.

**JS equivalent:** This is a rendering/UI function. The JS project handles advisor views client-side.

**Discrepancies:** N/A — UI-only function. No game logic to compare.

---

### 4. `show_gift_menu` (FUN_0045f0b1, 3,218B) — vs diplomacy-ui.js

**Binary summary:** UI dialog for gifting to AI civs. Three gift types:
1. **Tech gift**: Finds techs the AI doesn't have via `handle_exchange_gift()`. Adjusts attitude by `tech_value * 4` or `tech_value * 2`. Decrements audience counter.
2. **Gold gift**: Shows slider (treasury/50 increments × 50). Adjusts attitude by `-(gold_value * 3 / 2)`. Transfers gold.
3. **Military unit gift**: Lists player's cities. Transfers a unit to AI. Calculates unit value based on maintenance cost × 3 (halved if AI has prerequisite tech). Adjusts attitude.

**Key binary details:**
- Tech gift: calls `ai_calc_tech_value()` for attitude calculation.
- Gold gift: attitude adjustment = `-(gold_to_attitude(amount) * 3 / 2)`.
- Military gift: after transfer, 50% chance AI gets a tech breakthrough (random tech in same branch).
- All gifts decrement the audience counter by `(giftCount + 2)`.

**JS equivalent:** Diplomacy UI is handled client-side. The actual gift mechanics would be in `diplomacy.js` or `reducer.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Tech gift attitude** | `tech_value * 4` (one known) or `tech_value * 2` (two known) | Not implemented — no tech gifting | **HIGH** — missing feature |
| 2 | **Military gift breakthrough** | 50% chance AI discovers random tech in same branch as gifted unit's prerequisite | Not implemented | **MEDIUM** |
| 3 | **Audience counter** | Decremented by `giftCount + 2` per gift action | Not tracked | **MEDIUM** |

---

### 5. `new_game_setup` (FUN_0051dd97, 3,152B) — vs init.js

**Binary summary:** Pure UI function for new game setup dialog sequence:
1. Difficulty selection dialog
2. Number of opponents dialog (with random option)
3. Barbarian activity selection
4. Game rules (custom/standard)
5. Advanced options (flat earth, bloodlust, etc.)
6. Accelerated start (if selected)
7. MP-specific rules dialog

Stores selections in global config variables. Mostly dialog presentation logic.

**JS equivalent:** `init.js` handles game initialization but not the UI dialogs — those are client-side.

**Key data flow captured:**
- `DAT_00655b08` = difficulty
- `DAT_00655b0d` = number of opponents (`6 - selection` or `rand()%5 + 2`)
- `DAT_00655b09` = barbarian activity
- `DAT_00655ae8` = game rules bitfield

**Discrepancies:** N/A — UI dialog function. Game initialization values are set in JS `init.js` directly from config objects.

---

### 6. `process_caravan_arrival` (FUN_00440750, 3,144B) — vs trade route handling

**Binary summary:** Complex trade revenue calculation when a caravan/freight arrives at a city:

**Revenue formula:**
1. `base_distance = calc_distance(sourceCity, destCity)` (Civ2 real distance)
2. If flat-earth flag: `distance = distance * 4 / 5`
3. If round-earth flag: `distance = distance * 5 / 4`
4. `revenue = (sourceCity.tradeArrows + destCity.tradeArrows) * (distance + 10) / 24`
5. If different continents: `revenue *= 2`
6. If same owner: `revenue /= 2`
7. If freight (type 0x31): `revenue += revenue/2` (50% bonus)
8. Supply/demand bonus: `bonus = calc_supply_demand_bonus()` using building-specific port/airport bonuses
9. Matching existing trade slots doubles or triples revenue
10. Pre-Railroad era: `revenue *= 2`
11. Corporation tech: `revenue -= revenue/3`
12. Trade tech: `revenue -= revenue/3`
13. Final clamp and random factor applied

**Supply/demand system:**
- Each city has 3 supply slots and 3 demand slots
- Commodity types 0-15 with resource-type classification
- Matching a demanded commodity gives bonus based on commodity value
- After delivery, a new supply/demand commodity is randomly selected for the receiving city

**JS equivalent:** No trade route revenue calculation found in the JS codebase.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Entire function** | Full trade revenue calculation with distance, continent, era, tech modifiers | Not implemented | **HIGH** — trade routes not functional |
| 2 | **Supply/demand** | 3 supply + 3 demand slots per city; commodity matching for bonus | Not implemented | **HIGH** |
| 3 | **Port/airport bonus** | Supply/demand bonus: port city (+1), airport (+1), both cities having (+2) | Not implemented | **MEDIUM** |
| 4 | **Food caravan** | If commodity type < 0, delivers food to city instead of gold | Not implemented | **MEDIUM** |

---

## Batch 18

### 7. `setup_scenario_start` (FUN_004a9785, 3,059B) — vs init.js scenario setup

**Binary summary:** Initializes scenario start conditions. For each of 7 civ slots:
1. Finds the unit positioned for that slot (from scenario file).
2. Grants initial techs: Alphabet(0x24), Ceremonial Burial(9), Bronze Working(1), Warrior Code(8).
3. Sets government to Republic (index 4).
4. For advanced starts (param_1 != 0): grants 3 additional random techs, increments government level.
5. Creates city at unit location. Sets initial treasury (random 25-75 × start level).
6. Creates initial units: militia/phalanx + settler.
7. For advanced starts: creates second city nearby on best site, with second set of units.
8. Calculates initial city production and worked tiles.

**Key details:**
- Initial city size: 3 (normal start), 5 (advanced start), 7 (if no second city found in advanced).
- Second city search: scans 8 directions × 5 tiles, picks best terrain with resource bonus.
- If no second city found: builds more units at primary city instead.

**JS equivalent:** `init.js` handles game initialization but scenario starts are mostly parser-loaded.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Initial techs** | Alphabet, Ceremonial Burial, Bronze Working, Warrior Code always granted | JS doesn't explicitly grant these for scenario starts | **MEDIUM** |
| 2 | **Advanced start** | Second city creation with terrain scoring | Not implemented | **MEDIUM** |
| 3 | **Government init** | Republic (4) + increments for advanced | JS defaults to Despotism | **MEDIUM** |

---

### 8. `game_loop_singleplayer` (FUN_0048b340, 3,048B) — vs game loop in JS

**Binary summary:** Main game loop for single-player and hot-seat modes. Key phases:
1. Pre-turn: call `process_pollution()` if applicable.
2. Check victory conditions: `check_civ_alive()`.
3. For hot-seat: save/restore viewport per player, show turn-change dialog.
4. Per-civ loop: process each alive civ (0-7 in order).
   - AI civs: call AI processing.
   - Human civs: display turn notification, set viewport, call `process_civ_turn()`.
5. Post-turn: show casualty report if any units lost.
6. End-of-round: process barbarian spawning, update scores.

**JS equivalent:** Server-side turn processing in `server.js` + `reduce/end-turn.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Loop structure** | Binary processes all 8 civs in sequence per round | JS uses per-player turn model with END_TURN action | Different architecture — acceptable |
| 2 | **Hot-seat** | Full save/restore viewport, password protection | Not implemented (WebSocket-based MP instead) | N/A — different design |
| 3 | **Casualty report** | Shows dialog if `unitsLost[civ] > previousUnitsLost[civ]` | Not implemented as dialog | LOW |
| 4 | **Email game** | PBEM save/notify logic | Not applicable | N/A |

---

### 9. `kill_or_retire_civ` (FUN_004e1763, 2,918B) — vs civ elimination in JS

**Binary summary:** Handles civ death/retirement. Two paths based on multiplayer mode:

**Single-player/hot-seat path (DAT_00655b02 < 3):**
1. Clear alive bit: `humanPlayers &= ~(1 << civSlot)`.
2. If `force_kill` or `param_2`: iterate all units owned by civ — destroy each:
   - Decrement military unit count if applicable.
   - Decrement unit type count.
   - Decrement total unit count.
   - Handle stack pointers (prev/next).
   - Set unit position to off-map (`civ*4+4) * -25`).
   - Zero the unit's HP field.
   - Adjust max unit count if this was the last slot.
   - Cancel goto orders targeting dead units.
3. Destroy all cities owned by civ:
   - Decrement city count.
   - Zero population field.
   - Release tile ownership.
   - Clean up trade routes referencing dead cities.
   - Clean up wonder references.
   - Reassign tile improvements (contested tiles go to adjacent civ).
4. Update civ-specific data: `technology_links`, `civ_alive_flag`, `map_visibility`.
5. Optionally call `new_civ()` to replace with AI.

**Multiplayer path (DAT_00655b02 >= 3):**
- Sends network message `NM_KILL_OR_RETIRE (0x34)`.
- Waits up to 3600 seconds for server response.
- Handles timeout with disconnect dialog.

**JS equivalent:** `killCiv()` in `diplomacy.js` and `checkCivElimination()` in `reduce/helpers.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Unit destruction detail** | Binary handles stack pointer (prev/next linked list), decrements per-type counts, adjusts max unit count | JS uses simple `killUnit()` which sets `gx = -1` — no linked list, no per-type counts | **MEDIUM** — structural difference |
| 2 | **City destruction** | Binary zeroes population, releases tile ownership for 45-tile radius, reassigns tiles to adjacent civs | JS checks `hasCity && hasUnit` then calls `killCiv()` — less granular | **MEDIUM** |
| 3 | **Trade route cleanup** | Binary cancels trade routes pointing to dead civ's cities | JS doesn't clean up trade routes on elimination | **MEDIUM** |
| 4 | **Tile reassignment** | Binary scans 45-tile radius per city, reassigns `tileOwnership` to nearest alive civ | JS clears visibility but doesn't reassign tiles | **MEDIUM** |
| 5 | **Replacement AI** | If `param_3 != 0`, calls `new_civ()` to create AI replacement | JS has no AI replacement mechanism | LOW — design choice |

---

### 10. `ai_calc_tech_value` (FUN_004bdb2c, 2,869B) — vs ai/econai.js or ai/data.js

**Binary summary:** Calculates the strategic value of a technology for AI decision-making. Highly complex multi-factor scoring:

**Base score:**
1. `base = tech.aiImportance * governmentEpochFactor + tech.aiModifier`
   - `governmentEpochFactor` from civ's government's tech epoch preference.
   - For AI: modified by allied human player overlap (shared techs reduce epoch).

**Bonus factors:**
2. **Uniqueness bonus**: If tech leads to something no other civ can research (checks all tech prerequisites). Doubled if `bloodlust` flag set.
3. **Current research target**: If matches civ's `researchTarget`, +cityCount/4 bonus.
4. **Human player's wonder target**: If human is building a wonder requiring this tech, +2.
5. **Active wonder goals**: If tech unlocks a wonder in the global wonder slots (0x23-0x25), +3.
6. **Existing building synergy**: If tech obsoletes/upgrades existing infrastructure, -2.
7. **Wonder prerequisite chain**: If tech leads toward a wonder the civ's special ability needs, +2/+5.
8. **Military infrastructure**: checks if tech enables units buildable by cities that need them.
9. **Government-specific bonuses**: switch on government type (0-7) with tech-specific bonuses.

**Government tech preferences (switch statement):**
- Anarchy(0): +2 for techs 0x27, 8, 0x56
- Despotism(1): +1 for tech 0xC
- Monarchy(2): +1 for techs 6, 0x52, 0x3C
- Communism(3): +2 for tech 0x2F
- Fundamentalism(4): +2 for 0x15, -1 for 0xF, +1 for 0x49/0x10/0x2A
- Republic(5): +1 for 0x40/8/1/0x2E, -1 for 0x37, +2 for 0x3C
- Democracy(6): +2 for 0x40, +1 for 0x24/0x38/9, -1 for 0x37
- (7+): +2 for 0xF, +1 for 0x40/8, -1 for 0x37

**JS equivalent:** No equivalent function found. AI tech selection in JS is much simpler.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Entire function** | Complex 80+ line multi-factor AI tech valuation | Not implemented — JS AI uses basic heuristics | **HIGH** — AI tech priorities fundamentally different |
| 2 | **Government-specific** | 8 government types with specific tech preferences | Not implemented | **HIGH** |
| 3 | **Alliance/overlap** | Reduces tech value if allied human player already has it | Not implemented | **MEDIUM** |

---

### 11. `create_city` (FUN_0043f8b0, 2,677B) — vs city creation in reduce/helpers.js

**Binary summary:** Creates a new city at the given coordinates for a given civ:

1. Find empty city slot (or expand array if needed, max 254).
2. Increment civ's city count. Set `lastFoundedTurn = currentTurn`.
3. Set tile ownership and city ownership flags.
4. Initialize city fields: position, owner, serial number, size=1.
5. **Visibility for first city**: If civ's first city AND AI, reveal 20-tile radius.
6. **Late-game bonus for AI first city**: If turn > 40 and AI's first city:
   - Bonus size: `clamp((turn-20)/20, 2, 10)`
   - Auto-build: Granary(4), Marketplace(5), Barracks(6)
   - Start producing the best available unit.
7. Set initial production: find best building the civ can build (priority: cost/maintenance ratio with `has_prereq` check).
8. Initialize trade routes (zeroed), specialists (zeroed).
9. Check adjacent tiles for: ocean (coastal flag), river, mountains.
10. If civ's first city: set capital location and auto-build Palace(1).

**JS equivalent:** `makeCity()` or city creation in `reduce/helpers.js` / `reducer.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **AI late-game bonus** | AI first city after turn 40 gets bonus size + free buildings | Not implemented | **MEDIUM** — AI catch-up mechanic missing |
| 2 | **Initial production** | Binary selects best building by cost/maintenance ratio from all buildable items | JS starts with Warriors or a simple default | **LOW** — AI will change production anyway |
| 3 | **City serial number** | Global incrementing counter `DAT_00627fdc` | JS uses array index | LOW — internal bookkeeping |
| 4 | **Max cities** | Binary caps at 254 (0xFE) | JS has no explicit cap | LOW |
| 5 | **Coastal/river flags** | Binary scans adjacent tiles to set coastal, river, mountain flags in city.flags bitfield | JS doesn't set these flags at creation time | **MEDIUM** — affects production choices |

---

### 12. `calc_happiness` (FUN_004ea8e4, 2,627B) — vs happiness.js

**Binary summary:** Multi-phase happiness calculation:

**Phase 0 — Trade calculation:**
- Calls `calc_city_trade_corruption()` to get base trade, corruption, net trade.
- If government is Anarchy(4) or Communism(6): corruption forced to 0.
- Sets `city.tradeArrows = totalTrade - corruption`.

**Phase 1 — Trade route income:**
- For each active trade route: calculates income based on `(sourceArrows + destArrows + 4) >> 3`.
- `supply_demand_bonus()` applied.
- Same-civ routes: halved.
- Total added to `tradePool`.

**Phase 2 — Corruption re-applied:**
- Recalculates corruption on the new trade total (including routes).

**Phase 3 — Luxury/tax/science split:**
- Calls `apply_luxury_tax_science()` to divide trade pool.

**Phase 4 — Initial unhappy citizens:**
- **Human player**: `unhappy = (size-1) - (martialLawBase - 2)` where `martialLawBase = CONTENT_BASE - difficulty`.
  - Empire size penalty: `(cityCount - contentCitizens + cityIdx % contentCitizens) / contentCitizens`.
  - `contentCitizens = ((govtIdx >> 1) + 2) * riotFactor / 2`
  - Communism exempt from empire size penalty.
- **AI player**: `unhappy = (size-1) - (CONTENT_BASE - 5)`.

**Phase 5-9 — Happiness modifiers:**
- Military units as martial law.
- Building effects (Temple -1 unhappy, Cathedral -3, Colosseum, etc.).
- Wonder effects (Shakespeare's Theatre, etc.).
- Luxury effect: `happy = luxury / 2`.
- Military unhappiness (units away from home).
- Final: checks civil disorder (unhappy > happy) and WLTKD (happy > 0 and unhappy == 0 and size >= 3).

**JS discrepancies (vs happiness.js):**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Initial unhappy formula** | `(size-1) - (CONTENT_BASE - difficulty - 2)` | JS: `(pop-1) - (martialLawBase - 2)` where `martialLawBase = CONTENT_BASE - diffIdx` — matches | OK |
| 2 | **Empire size** | `(cityCount - contentCitizens + cityIdx % contentCitizens) / contentCitizens` | JS: same formula | OK |
| 3 | **contentCitizens** | `((govtIdx >> 1) + 2) * riotFactor / 2` with `riotFactor = RIOT_FACTOR + difficulty*-2` | JS: same formula with `spread = RIOT_FACTOR + diffIdx * -2` | OK |
| 4 | **Communism exemption** | Empire size penalty skipped for Communism | JS: same check | OK |
| 5 | **AI content base** | `(size-1) - (CONTENT_BASE - 5)` | JS: same | OK |
| 6 | **Trade route income** | Binary includes trade routes in happiness calc via trade pool | JS trade route income in production.js, feeds into happiness | Likely OK — need to verify pipeline |
| 7 | **Restless Tribes** | Binary: if barbLevel==3 AND certain tech: `spread += 2` | JS: checks `barbarianActivity === 'raging'` | OK — 'raging' maps to level 3 |
| 8 | **Post-trade corruption** | Binary recalculates corruption after adding trade route income | JS applies corruption once | **MEDIUM** — double-corruption may differ |

---

## Batch 19

### 13. `change_city_production` (FUN_00441b11, 2,572B) — vs reducer CHANGE_PRODUCTION

**Binary summary:** Changes a city's production item. Complex wonder notification and switching logic:

1. Decrement old production type count.
2. If `param_2 > 98`: call `ai_choose_production()` for AI.
3. For human: set `shieldsPenalty` via `calc_production_penalty()`.
4. Track old production for wonder switching:
   - If switching FROM a wonder AND no other city building it: notify "wonder abandoned" + diplomacy event.
   - If switching TO a wonder: notify "wonder started" + diplomacy event.
5. **Wonder competition check**: If switching to a wonder and shields==0, check if all other alive civs have the wonder's epoch. If so, apply difficulty-based penalty to shields.
6. **Space race check**: If switching away from a spaceship part, check completion status.
7. Increment new production type count.

**JS equivalent:** CHANGE_PRODUCTION action in `reducer.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Wonder switching** | Full wonder abandoned/started notification system with diplomacy events | JS handles basic production change without wonder notification | **MEDIUM** |
| 2 | **Shield penalty** | Calls `calc_production_penalty()` for switching cost | JS may or may not apply switching penalty | **MEDIUM** — need to verify |
| 3 | **Wonder epoch check** | If all civs have the epoch, apply difficulty penalty | Not implemented | LOW — edge case |
| 4 | **Space race** | Spaceship part tracking on production switch | Minimal in JS | LOW |

---

### 14. `execute_paradrop` (FUN_004ca39e, 2,572B) — vs paradrop in reduce/move-unit.js

**Binary summary:** Executes a paradrop operation:

1. Check target is not ocean (`is_ocean(target) == 0`).
2. Check target is not enemy territory (or handle war declaration).
3. Check range: `distance(unit.pos, target) <= paradropRange`.
4. If in enemy city: prompt peace treaty break.
5. Determine visibility: for each human civ, check if they can see the paradrop (own territory, shared vision, ally visibility).
6. Remove unit from stack, place at target.
7. If landing on enemy city: trigger city capture (`FUN_0057b5df`).
8. Set unit's `hasParadropped` flag.
9. Send network notifications to visible players.
10. Scan 8 adjacent tiles for best retreat direction (in case of interception).

**JS equivalent:** Paradrop handling in `reduce/move-unit.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Visibility check** | Complex per-player visibility for notifications | JS uses simpler visibility model | LOW — UI concern |
| 2 | **Peace treaty** | Prompts war declaration if landing near allied city | JS may not check treaties on paradrop | **MEDIUM** |
| 3 | **Retreat direction** | Calculates best retreat tile (random + distance scoring) | Not implemented | LOW — AI behavior |
| 4 | **Range check** | Uses `DAT_0064bcdb` as paradrop range constant | JS needs to verify range constant | **MEDIUM** |

---

### 15. `game_loop_mp_client` (FUN_0048bfec, 2,530B) — vs client networking

**Binary summary:** Client-side multiplayer game loop. Handles:
1. Network message polling (`process_network_messages`).
2. Waiting for server's turn signal.
3. Processing incoming unit/city/diplomacy updates.
4. Rendering updates based on network events.
5. Timer-based turn timeout handling.

**JS equivalent:** `public/net/transport.js` handles WebSocket client communication.

**Discrepancies:** N/A — completely different networking architecture (binary uses raw TCP/IPX, JS uses WebSocket). Not comparable at protocol level.

---

### 16. `calc_unit_goto_direction` (FUN_004adafc, 2,516B) — vs pathfinding.js

**Binary summary:** Calculates the next step direction for a unit's goto order:

1. Get target coordinates from unit's goto fields.
2. If target is adjacent (distance < 2): return direct direction.
3. If target is distant:
   - If not sea unit: attempt A* pathfinding (`FUN_004abfe5`) for distance < 23. If found, return.
   - If A* fails or sea unit: use `FUN_004ad20f` (waypoint-based route).
   - If waypoint found: retry A* to waypoint.
4. **Fallback: greedy direction selection:**
   - For each of 8 directions, calculate remaining distance to target.
   - Score each direction: distance + terrain cost + ownership penalty.
   - Pick direction with lowest score.
   - Wrapping-aware distance calculation.

**Key scoring for greedy fallback:**
- `score = remaining_distance * 2 - (diagonal_penalty)` using precise hex distance formula.
- For human civs: skip directions that increase total distance.
- Terrain movement cost factored in.
- Ownership/enemy territory penalty.
- Prefer roads.

**JS equivalent:** `pathfinding.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **A* pathfinding** | Full A* with distance < 23 range limit; sea unit fallback | JS pathfinding likely uses similar A* but need to verify range limit | **MEDIUM** |
| 2 | **Waypoint routing** | `FUN_004ad20f` does continent-crossing waypoint search for long distances | JS may not have waypoint routing for long paths | **MEDIUM** |
| 3 | **Greedy fallback** | Detailed hex-distance scoring with diagonal penalty formula | JS may use simpler Manhattan distance | **MEDIUM** |
| 4 | **Wrapping** | Full wrap-around distance handling with edge detection | JS handles wrapping via `resolveDirection()` | OK |

---

### 17. `pick_up_unit` (FUN_004c9528, 2,453B) — vs unit pickup in movement

**Binary summary:** "Pick up" (bribe/buy) an enemy unit with gold:

1. Check unit is alone (stack count <= 1).
2. Check government: Democracy(6) = incorruptible, cannot bribe.
3. Human AI check: AI needs specific tech to be bribable.
4. **Cost formula**: `unitMaintenanceCost * (treasury + 750) / (distToCapital + 2)`.
   - Communism cap: max 10 for distance.
   - Non-combat unit: cost /= 2.
   - Explorer-type unit AND AI: not bribable.
5. Overflow protection: if cost < 0, cap at 30000.
6. For human: show cost dialog, confirm/reject.
7. For AI: auto-accept if `treasury / 2 >= cost`.
8. On accept: deduct gold, transfer unit ownership, update counts, set home city to nearest friendly city.
9. Multiplayer: sends network request, waits for confirmation.

**JS equivalent:** Not found as a standalone function — unit bribery may be part of espionage actions.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Bribery formula** | `maintenanceCost * (treasury + 750) / (distToCapital + 2)` | Not found in JS | **HIGH** — if espionage/bribery exists, formula may differ |
| 2 | **Democracy immunity** | Government == Democracy blocks bribery | Not verified in JS | **MEDIUM** |
| 3 | **Communism distance cap** | Capital distance capped at 10 for Communism | Not verified | **MEDIUM** |
| 4 | **Stack check** | Unit must be alone to be bribed | Not verified | **MEDIUM** |

---

## Batch 20

### 18. `map_key` (FUN_004125c6, 2,451B) — vs keyboard handling in app.js

**Binary summary:** Keyboard event handler for the main map view. Pure UI/input function mapping keyboard shortcuts to game actions. Not game logic.

**Discrepancies:** N/A — UI input handling, not comparable.

---

### 19. `load_verify_units` (FUN_00477d8c, 2,391B) — vs parser.js unit loading

**Binary summary:** File dialog and save game loading function:
1. Shows Open File dialog for .SAV or .SCN files.
2. Handles alternate graphics: scans for `*_ALT.SAV` files, randomly picks one.
3. Calls `load_game_file()` to parse the save.
4. Post-load: processes events file, initializes pollution, sets up tribes.
5. Validates loaded units against game rules.

**JS equivalent:** `parser.js` handles binary .SAV file parsing.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **File dialog** | Win32 Open File dialog with file type filter | Not applicable (browser file input) | N/A |
| 2 | **Alt graphics** | Scans for `*_ALT` variant files | Not applicable | N/A |
| 3 | **Unit validation** | Post-load validation against rules | JS parser loads but may not validate | LOW |

---

### 20. `multiplayer_main_loop` (FUN_0041f8d9, 2,326B) — vs server.js

**Binary summary:** Main loop for dedicated multiplayer server. Handles:
1. Network initialization (IPX/TCP).
2. Player connection management.
3. Turn sequencing and synchronization.
4. Game save/load for network games.

**JS equivalent:** `server/server.js` with WebSocket architecture.

**Discrepancies:** N/A — fundamentally different architecture (Win32 TCP/IPX vs Node.js WebSocket). The JS server is server-authoritative with immutable reducer pattern — not comparable at code level.

---

### 21. `ai_propose_alliance_or_crusade` (FUN_00562021, 2,292B) — vs ai/diplomai.js

**Binary summary:** AI logic for proposing alliances or crusades to human player:

**Trigger conditions:**
- `(currentTurn & 0x1F) == civSlot * 4` — periodic check every 32 turns.
- Attitude gap: `attitude[target] - contactHistory[self][target] < 6`.

**Alliance proposal path:**
- Checks if self has alliance with a third civ that is at war with target.
- Checks if target has contact with the third civ.
- Self must be weaker than the third civ (military power comparison).
- Proposes tech exchange (best tech for target) + gold tribute + alliance against third civ.
- Gold: `clamp(treasury/100, 1, 10) * 50`.

**Crusade proposal path:**
- Self's military power must be less than third civ's.
- Proposes joined war against the third civ.
- Sets alliance flags, contact turns, gold tribute.

**JS equivalent:** `ai/diplomai.js` likely has AI diplomacy but probably simpler.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Alliance proposal** | Complex multi-civ power comparison, tech gift, gold tribute | Likely simplified or missing | **MEDIUM** — AI diplomacy depth |
| 2 | **Timing** | `(turn & 0x1F) == civ*4` periodic trigger | Likely different timing | LOW |
| 3 | **Power comparison** | Uses `militaryPower` field for strength comparison | JS may use different metric | **MEDIUM** |

---

### 22. `ai_military_aid` (FUN_0055f7d1, 2,222B) — vs ai/diplomai.js

**Binary summary:** AI logic for providing military units to allied civs:

1. Count current alliances.
2. For each civ at war with self: check if ally exists that is also at war.
3. If ally's military power >= self's: seek strongest land unit to gift.
4. **Unit selection**: Find strongest owned land unit (domain==0, attack type) on a continent rated "at war" or "threatened". Score: `(attackStrength + defenseStrength*2) * hitPoints`.
5. **Target search**: Find ally's city on a continent where ally has enemy presence and is unguarded.
6. Transfer unit: pick up from stack, change owner, place at ally's city, update home city.
7. Notify human player if they're the beneficiary.

**JS equivalent:** Likely not implemented or minimal in `ai/diplomai.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Entire function** | Full AI military aid with unit scoring and strategic placement | Not implemented | **MEDIUM** — AI cooperation missing |

---

### 23. `parley_transfer_city` (FUN_004de0e2, 2,217B) — vs diplomacy.js city transfer

**Binary summary:** Transfers a city from one civ to another via diplomacy (peace treaty, gift, etc.):

1. Destroy specific buildings: Palace(1), Temple(4), Cathedral(11), Courthouse(7).
2. Update civ city counts and `lastFoundedTurn`.
3. **Map visibility**: reveal 21-tile radius to new owner, set tile ownership.
4. Change city.owner to new civ.
5. **Unit reassignment**: Iterate all units belonging to old owner:
   - If unit's homeCity is this city AND unit is NOT at the city tile: disband.
   - If unit IS at the city tile: reassign to new owner, update home city, clear orders.
   - Update unit type counts for both civs.
6. **Production validation**: If city was building something the new owner can't build (wrong tech), reset to best available building.
7. Update visibility for 8-tile radius.
8. Set `originalOwner` and `turnCaptured` fields.
9. If this city held a wonder that grants special victory condition, transfer that too.

**JS equivalent:** City transfer logic in `diplomacy.js` or `citycapture.js`.

**Discrepancies:**

| # | Area | Binary | JS | Severity |
|---|------|--------|----|----------|
| 1 | **Building destruction** | Always destroys Palace, Temple, Cathedral, Courthouse | JS `ALWAYS_DESTROYED_ON_CAPTURE` = same set {1,4,7,11} | OK |
| 2 | **Unit disbanding** | Units homed to city but NOT at city tile are disbanded | JS `rehomeOrDisbandUnits` rehomes to nearest city instead | **MEDIUM** — binary is harsher |
| 3 | **Unit reassignment** | Units AT city tile transferred to new owner with ownership/count updates | JS doesn't specifically transfer units at city tile | **MEDIUM** |
| 4 | **Production reset** | Validates new owner can build current production; resets if not | JS resets to Warriors unconditionally | LOW — JS is simpler but safe |
| 5 | **Visibility** | Reveals 21-tile radius + 8-tile adjacent scan | JS calls `updateVisibility` with range 2 | **MEDIUM** — different reveal range |
| 6 | **Wonder transfer** | Checks if city has victory-condition wonder; transfers | JS handles via `state.wonders` array | OK |

---

## Summary of Critical Discrepancies

### HIGH severity (game logic impact):
1. **spawn_barbarians**: Timing mask, spawn count formula, leader unit type, and missing city-proximity phase — barbarian behavior fundamentally different.
2. **process_caravan_arrival**: Entire trade route revenue calculation missing.
3. **ai_calc_tech_value**: Entire AI tech valuation missing — AI makes uninformed research choices.
4. **show_gift_menu**: Tech/military gift mechanics missing.
5. **pick_up_unit**: Unit bribery cost formula not implemented.

### MEDIUM severity (affects fidelity):
6. **handle_civil_war**: Missing diplomacy flags between old/new civ.
7. **kill_or_retire_civ**: Missing tile reassignment, trade route cleanup.
8. **calc_happiness**: Double-corruption on trade routes may differ.
9. **parley_transfer_city**: Unit disbanding vs rehoming difference; visibility range.
10. **execute_paradrop**: Missing peace treaty check on paradrop.
11. **create_city**: Missing AI late-game bonus, coastal/river flags.
12. **calc_unit_goto_direction**: Missing waypoint routing for long distances.
