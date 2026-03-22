# Deep Dive: Batches 21-24 (40 Functions)

Comparison of binary pseudocode against JS engine equivalents, branch-by-branch.

---

## Batch 21

### 1. `spaceship_human_build` (FUN_00598197, 2,111B) vs spaceship.js

**Binary summary**: When a human player builds a spaceship part, this function:
1. Checks `thunk_FUN_004a7577` (is spaceship already launched?) — if so, returns early.
2. For part group `param_2=0` (structurals): if count >= max, return. Otherwise picks component index 0.
3. For `param_2=1` (components): checks propulsion and fuel counts vs maxes. If human, lets player choose between propulsion(1) and fuel(2). AI picks whichever is lower.
4. For `param_2=2` (modules): checks habitation/life-support/solar counts vs maxes. AI picks lowest; human picks from dialog.
5. After choosing, checks if this part's count has reached its max. If so, shows "NOFURTHER" dialog.
6. Calls `thunk_FUN_004a75a6` (check if spaceship is complete) — if complete, sets bit 0x1 in civ flags, and clears reputation for all human civs.
7. Increments the chosen part count.
8. Recalculates spaceship stats (`thunk_FUN_00596eec`).
9. For AI: if all 3 basic part types are at max, calls `thunk_FUN_005973fd` (launch). Otherwise, complex logic for deciding whether to launch early based on other civs' spaceship progress, space race ranking, etc.

**JS equivalent**: `spaceship.js` has `recalcSpaceshipStats()` and `launchSpaceship()` but **not** the part-selection logic. JS tracks aggregate `structurals`, `components`, `modules` counts without the sub-type distinction (propulsion/fuel, habitation/life-support/solar).

**Discrepancies**:
- **MISSING: Sub-type tracking** — Binary tracks 6 individual part counts (structural, propulsion, fuel, habitation, life-support, solar-panel). JS only tracks 3 aggregate counts (structurals, components, modules). This affects the success probability calculation.
- **MISSING: AI launch decision logic** — Binary has complex heuristics for when AI should launch early (comparing own spaceship progress vs other civs, checking space race rankings, year threshold checks at turn 0x27=39 and 0x4B=75). JS AI simply switches cities to Capitalization after launch, but has no logic for deciding WHEN to launch.
- **MISSING: Complete-spaceship bit flag** — Binary sets bit 0x1 on civ flags when spaceship is complete, and clears all human civs' reputation. Not in JS.
- **MISSING: Max part counts** — Binary uses COSMIC parameters for max structural/component/module counts. JS has no max enforcement.

---

### 2. `calc_power_graph_rankings` (FUN_004853e7, 2,094B) — No JS equivalent

**Binary summary**: Calculates power rankings for all civs, used for the power graph display. Two different formulas:
- **Normal mode**: `power = numCities*3 + militaryUnits*8 + (treasury>>5)` plus a weighted sum of unit type counts multiplied by per-unit-type power values.
- **Alpha Centauri mode** (scenario flag): power = sum of `calcCitySize(cityIndex) * 2` for each city.
- Stores power values in the ranking history array (indexed by turn/4 for normal, turn/2 for AC mode), clamped to 0-255.
- Sorts civs by power to produce ranking array (highest=7, lowest=1).
- Sets best/worst ranking indices. Also has "war trigger" logic: if a civ has >4 cities, is at peace with a civ whose reputation rating is >3, and a random check passes, it may declare war.

**JS equivalent**: None. Power graph and war trigger from power rankings not implemented.

**Discrepancies**:
- **MISSING entirely** — No power graph, no power rankings, no automatic war-declaration from power disparity.

---

### 3. `choose_research_tech` (FUN_004c195e, 2,078B) vs research.js

**Binary summary**: This is the **UI function** for choosing research tech. It:
1. Calls `FUN_004c09b0` to get the "recommended" next tech.
2. Shows the tech advisor screen with Civilopedia info about the current tech.
3. Lists units/buildings/wonders unlocked by the current tech as visual motivation.
4. Builds the available tech list: iterates all 100 tech slots, checks if civ can research it (has both prereqs, doesn't already have it).
5. **AI tech cycling restriction** (line 697): If `DAT_00655b08 != 0` (not chieftain) AND `param_2 == 0` (not forced) AND not scenario mode, then AI civs can only pick every 3rd tech (modulo filter by civIndex). This prevents all AIs from researching the same techs.
6. Presents the tech list in a dialog. If player picks option 2, calls `FUN_004c0cf7` (change to specific tech goal).
7. Sets `civ.currentResearch = selectedTechId`.

**JS equivalent**: `research.js` has `getAvailableResearch()` for the tech availability check, and `calcResearchCost()` for the cost formula. The actual tech selection for AI is done in `ai/index.js`.

**Discrepancies**:
- **MISSING: AI tech cycling restriction** — Binary forces AI civs to only pick every 3rd available tech `(techIndex - civRulesId) % 3 != 0`. This diversifies AI research paths. JS AI picks techs by strategic priority without this modulo restriction.
- **MISSING: Tech advisor UI showing unlockables** — Binary shows units/buildings/wonders that will be unlocked by each tech option. JS has no such UI-side feature (but this is UI, not game logic).
- **PARTIAL: Recommended tech calculation** — Binary's `FUN_004c09b0` chooses a recommended tech. The JS AI has its own tech priority system but the selection algorithm differs.

---

### 4. `save_game` (save_game @ 0x0047758C, 2,038B) — No JS equivalent (save export)

**Binary summary**: File dialog for saving the game. Builds filename from civ name + year, handles multiplayer email-save naming with timestamps, uses Windows file dialog. Calls `thunk_FUN_004741be` to write the actual save file data.

**JS equivalent**: No save export functionality. The JS project loads .sav files via `parser.js` but does not write them.

**Discrepancies**:
- **MISSING: Save export** — Entirely absent. This is a Win32 file I/O function with no JS parallel needed for the web-based engine.

---

### 5. `execute_worker_order` (FUN_004c42a0, 2,035B) vs reducer worker orders

**Binary summary**: Executes a settler/engineer work order on a tile. Key logic:
1. Gets unit position, terrain type, current order.
2. Calculates work required per order type:
   - Road (4): `terrain.roadTime/2 + 3`
   - Railroad (5): `(terrain.hasFlag(0x10) ? 4 : 2) * terrain.roadTime`, +2 if terrain has river flag
   - Irrigation (6): `terrain.irrigateTime` (negative = terrain transform)
   - Mine (7): `terrain.mineTime` (negative = terrain transform)
   - Fortress (8): `terrain.roadTime * COSMIC_FORTRESS_WORK`
   - Airbase (9): `4` turns
   - Clean Pollution (10): `4` turns
3. Checks for another settler at the same tile doing the same work — merges their work counters (local_14 logic).
4. Increments work counter by 1 (or 2 for engineers).
5. When work is complete, applies terrain changes:
   - Road: sets road bit (0x40), clears mining bit (0x2) if applicable
   - Railroad: sets railroad bit (0x10), or combined flag (0x30) if has RR tech
   - Irrigation: sets irrigation bit (0x4), or transform terrain for negative irrigate values. Also checks for RR flag to set farmland.
   - Mine: same transform logic for negative mine values
   - Fortress: toggles fortress bit (0x80)
   - Airbase: sets airbase bit (0x42)
   - Clean Pollution: clears pollution bit (0x80), decrements global pollution counter
6. Updates city views and refreshes map.

**JS equivalent**: `reduce/helpers.js` `completeWorkerOrder()` + `reduce/end-turn.js` worker order processing (lines 634-663).

**Discrepancies**:
- **MISSING: Work turns calculation** — Binary calculates exact work turns from terrain type tables (roadTime, irrigateTime, mineTime). JS uses hardcoded `WORKER_TURNS` from defs.js without per-terrain scaling.
- **MISSING: Settler cooperation** — Binary allows multiple settlers on the same tile to combine their work progress. JS does not merge work counters.
- **MISSING: Engineer double-speed** — Binary explicitly gives engineers 2 work points per turn. JS likely handles this but should verify via the work counter logic.
- **MISSING: River penalty for railroad** — Binary adds +2 to railroad work time when tile has river. JS does not account for this.
- **PARTIAL: Terrain transform** — JS handles negative irrigate/mine values for terrain transformation but may not handle all the improvement-clearing side effects the binary does (clearing farm/mine bits on terrain change, checking RR flag for farmland, etc.).

---

### 6. `cheat_edit_terrain` (FUN_0055499f, 2,032B) — No JS equivalent

**Binary summary**: Debug/cheat terrain editor. Allows changing terrain type, toggling improvements (road, railroad, irrigation, mining, fortress, airbase, pollution), and adjusting terrain for adjacent tiles. Only accessible in debug mode.

**JS equivalent**: None. This is a cheat/debug UI function.

**Discrepancies**:
- **N/A** — Debug cheat function, not part of game logic.

---

### 7. `assign_worker_tiles` (FUN_004e8f42, 2,002B) vs production.js worker assignment

**Binary summary**: Auto-assigns workers to city tiles. Core algorithm:
1. Stores old specialist count. Handles government's forced laborer reduction.
2. First pass: if AI or random-turn-alignment, assign workers to tiles already occupied (honor existing assignments). If too many workers, sets disorder flag.
3. Otherwise, rotate assignments: try previous slot -1, honor existing.
4. After mandatory assignments, try to assign the center tile (index 20).
5. **Greedy best-tile loop**: while city needs more food (`surplus < size*COSMIC + specialists*wondBonus`) OR city size < 3, pick the best unassigned tile. Best = highest food priority, then `shields*2 + trade` tiebreaker.
6. **Surplus reduction loop**: if still have free workers beyond the specialist target, assign them using a different scoring: `(16/max(surplus_deficit,1)) * foodWeight + (size*3/max(shieldDeficit,1)) * shieldWeight + (size*2/max(trade,1)) * tradeWeight`. Removes worst tile if no good options.
7. Stores final bitmask in city record.
8. Checks if city can't feed itself (starvation flag).

**JS equivalent**: `reduce/helpers.js` has `autoAssignWorker()` (greedy best-score) and `removeWorstWorker()`. Used in end-turn.js when city size changes.

**Discrepancies**:
- **SIMPLIFIED: Assignment algorithm** — Binary uses a multi-phase algorithm (honor existing, rotate, food-priority first, then surplus optimization). JS uses a single greedy pass with `food*3 + shields*2 + trade` scoring.
- **MISSING: AI-specific reassignment** — Binary has special handling where AI civs re-evaluate all tile assignments every turn based on current needs. JS doesn't differentiate AI vs human tile assignment.
- **MISSING: Forced laborer handling** — Binary handles government-forced laborers (specialists forced by government type) as part of the assignment algorithm.
- **MISSING: Food-priority first pass** — Binary prioritizes food production until city can feed itself, then optimizes for shields/trade. JS uses a single combined score.
- **MISSING: Starvation flag** — Binary sets a starvation flag on the city if food deficit persists after optimal assignment.

---

## Batch 22

### 8. `load_saved_game_flow` (FUN_0041dfe1, 2,001B) — No JS equivalent (UI flow)

**Binary summary**: The "Load Game" UI flow. Shows file open dialog, loads .sav file, verifies units, lets player choose which civ to play as (in multiplayer), difficulty, gender, and civ name. Sets up game state from loaded file.

**JS equivalent**: Parser.js loads .sav files, but the UI flow for selecting civ/difficulty is in the client JS, not the engine. Game initialization from loaded save is handled by the server.

**Discrepancies**:
- **N/A** — UI flow, not game logic. The parser handles the data extraction; game setup differs architecturally (web vs desktop).

---

### 9. `hotseat_new_game_flow` (FUN_00419170, 1,955B) — No JS equivalent

**Binary summary**: Hotseat multiplayer new game setup. Shows world size dialog, handles 4 new game modes (new random, load Earth map, new + custom rules, load scenario), sets multiplayer mode to "hotseat" (DAT_00655b02 = 1), random map generation parameters.

**JS equivalent**: The JS project uses WebSocket multiplayer instead of hotseat. Map generation is in `mapgen.js` but the hotseat UI flow has no equivalent.

**Discrepancies**:
- **N/A** — Different multiplayer architecture (WebSocket vs hotseat). No porting needed.

---

### 10. `load_unit_onto_ship` (FUN_005b542e, 1,912B) vs transport loading

**Binary summary**: Loads units onto transport ships. Key logic:
1. Validates unit index bounds.
2. For multiplayer (DAT_00655b02 >= 3), sends a network message and waits for server response.
3. For local: if `param_2 != 0`, unloads the unit from its current position first.
4. Finds all units at the same tile via linked list traversal.
5. Calculates transport capacity (unit.domain==0 land, domain has cargo flag → naval, domain==1 → air carrier).
6. **Two-pass loading**:
   - Pass 0: loads units that are sea/air type (cargo ships), or units with goto orders targeting this ship.
   - Pass 1: loads land units that aren't sentried/fortified, or if the city has no other friendly land units.
7. Complex priority: first load units with matching goto targets, then non-sentried/non-fortified ground units, then any remaining.
8. Sets loaded unit's orders to 0xFF (sleep on transport).

**JS equivalent**: Transport loading is handled in `movement.js` and the reducer, but the complex multi-pass priority system is not present.

**Discrepancies**:
- **SIMPLIFIED: Loading priority** — Binary has a complex 2-pass system that prioritizes units with goto orders targeting the ship, then loads by type. JS likely just loads units without priority ordering.
- **MISSING: Capacity check by unit type** — Binary checks carrier capacity separately for land vs air units. JS may not distinguish.
- **MISSING: City garrison protection** — Binary avoids loading the last defending unit from a city (if it's sentried/fortified in a city with no other defenders).

---

### 11. `cheat_edit_unit` (FUN_0055625b, 1,892B) — No JS equivalent

**Binary summary**: Debug unit editor. Allows toggling veteran status, resetting moves, editing HP, changing home city. Cheat/debug only.

**Discrepancies**: N/A — Debug function.

---

### 12. `singleplayer_main_menu` (FUN_0041eeeb, 1,891B) — No JS equivalent

**Binary summary**: Main menu for singleplayer game. Handles new game, load game, scenario selection, hall of fame display. Win32 UI.

**Discrepancies**: N/A — UI function, web app has its own main menu.

---

### 13. `diff_engine_scan_and_send` (FUN_004b0b53, 1,883B) — N/A (network protocol)

**Binary summary**: Network diff engine: scans game state for changes since last sync, packs changed bytes into a compressed diff format, sends via network. Used in Civ2's original IPX/serial multiplayer.

**JS equivalent**: N/A — JS uses WebSocket with full state sync, not binary diff compression.

**Discrepancies**: N/A — Different network architecture entirely.

---

### 14. `map_window_click` (map_window_click @ 0x00410F77, 1,866B) — Client-side JS

**Binary summary**: Handles mouse clicks on the map window. Converts pixel coordinates to map coordinates, handles unit selection, city opening, goto orders, attack commands, stack selection, move-to commands. Win32 message handler.

**JS equivalent**: Client-side click handling is in `public/js/` (not the engine). The engine provides `rules.js` for move validation.

**Discrepancies**: N/A — UI input handling, architecture differs (Win32 vs Canvas/DOM events).

---

### 15. `continent_assign_body_ids` (FUN_004b32fe, 1,853B) vs mapgen.js

**Binary summary**: Flood-fill body ID assignment. Two passes (land=1, ocean=0):
1. Allocates large buffer for tile counts.
2. BFS flood fill from each unvisited tile, assigning incrementing body IDs.
3. For the first pass (land), merges bodies < 9 tiles into overflow bucket (63).
4. For the second pass (ocean), merges bodies < 16 tiles into overflow.
5. Stores counts in body count arrays (DAT_00666130 for land, DAT_00666134 for ocean).
6. Returns a bitmask indicating whether any overflow occurred per pass.

**JS equivalent**: `mapgen.js` `assignContinentBodyIds()` — a faithful port.

**Discrepancies**:
- **MINOR: Direction table** — Binary scans only 3 adjacent tiles per row (indices 0-2 pointing "up") to check for existing body IDs, then assigns. JS uses full 8-direction BFS which is more thorough but functionally equivalent.
- **MINOR: Merge threshold** — Binary uses 9 for land, 16 for ocean. JS matches: `minSize = pass === 1 ? 9 : 16`.
- **MATCH: Overflow bucket 63** — Both use 63 as the overflow/catch-all body ID.
- **MATCH: Two-pass approach** — Both do land first, then ocean.
- Overall this is a **good port** with minor algorithmic differences in the BFS traversal order.

---

## Batch 23

### 16. `handle_caravan_arrival` (FUN_0058fedb, 1,831B) vs trade in JS

**Binary summary**: When a caravan/freight arrives at a city:
1. Checks if the destination city is a valid trade partner (different city, owns it, not blockaded).
2. If human player and destination is own city: shows CARAVANMENU dialog with options:
   - Option 0: "Keep unit" (do nothing)
   - Option 1: "Establish trade route" (if different city from home)
   - Option 2: "Add to wonder production" (if city building a wonder with cost > -38)
3. **Trade route establishment**: Calls `thunk_FUN_00440750` to create the trade route.
4. **Wonder contribution**: Adds `unit.cargoType * COSMIC_CARAVAN_WONDER_MULT` shields to the city's production. Records the source city as having contributed. Plays event sound.
5. If destination owns the city, checks if it's the home city — restricts trade establishment.

**JS equivalent**: Trade routes exist in `production.js` `calcTradeRouteIncome()` but there is no caravan arrival handler in the reducer for establishing new routes or contributing to wonders.

**Discrepancies**:
- **MISSING: Caravan arrival dialog/action** — No handler for caravan units arriving at cities and choosing between trade route vs wonder contribution.
- **MISSING: Wonder contribution from caravans** — Binary adds shields to wonder production when a caravan contributes. Not implemented.
- **MISSING: Trade route establishment** — Binary creates trade routes via `FUN_00440750`. JS has trade route income calculation but no route creation logic.
- **MISSING: Caravan cargo type** — Binary uses cargo type (commodity) to determine wonder contribution value.

---

### 17. `throne_room_add_improvement` (FUN_0044d296, 1,799B) — No JS equivalent

**Binary summary**: Throne room improvement dialog. When certain conditions are met (city growth, wonder completion), shows the throne room improvement selector. Purely cosmetic/UI.

**Discrepancies**: N/A — Cosmetic UI feature, not game logic.

---

### 18. `unit_order_goto_city` (FUN_0058d6af, 1,787B) vs goto handling

**Binary summary**: Handles "Go To City" order for units. Shows a city list dialog:
1. For land units: lists cities on the same continent (same body ID). For naval: lists all cities. For air: lists within range.
2. Has overflow toggle: if no valid cities found on same continent, shows all cities.
3. For settlers (role 5): shows pollution count near each candidate city.
4. Shows airport indicator if destination city has airport.
5. Sets unit order to 0x0B (goto) with target coordinates.

**JS equivalent**: Goto is handled in the client UI + reducer `GOTO_UNIT` action. The pathfinding is in `pathfinding.js`.

**Discrepancies**:
- **DIFFERENT ARCHITECTURE** — Binary uses a city list dialog; JS uses click-to-goto with pathfinding. The actual goto execution uses different routing.
- **MISSING: Continent filtering** — Binary restricts land unit goto targets to same continent. JS pathfinding handles this implicitly through reachability.
- **MISSING: Range restriction for air** — Binary limits air unit goto to within movement range. JS pathfinding should handle this but may not enforce per-turn range limits.

---

### 19. `distribute_trade` (FUN_004ea1f6, 1,769B) vs production.js trade distribution

**Binary summary**: Distributes city trade into luxury, tax, and science:
1. **Capitalization special case**: if city is building Capitalization (wonder -38), redirects tax to match gold production.
2. Base split: `lux = trade * (10 - sciRate - taxRate) / 10`, `sci = trade * sciRate / 10`, `tax = remainder`.
3. **Corruption tracking**: adds corruption to civ-wide counter for espionage/diplomacy visibility.
4. **Fundamentalism exception**: under fundamentalism, AI redirects all gold to science. Fundamentalism caps science rate.
5. **Specialist bonuses**: entertainer=+2 lux, taxman=+3 gold, scientist=+3 science. Applied BEFORE building multipliers.
6. **Building multipliers**: Marketplace/Bank/Stock Exchange each +50% to lux and tax. Library/University/Research Lab each +50% to science.
7. **Wonder multipliers**: Isaac Newton's (wonder 16) doubles science building bonus in wonder city. Copernicus' Observatory (wonder 11) doubles total science in wonder city.
8. **Fundamentalism science penalty**: `sci -= (DAT_0064bcd9 * sci) / 100` (cosmic parameter, default ~50%).
9. Stores results in city fields (city.luxOutput, city.taxOutput, city.sciOutput, city.tradeRevenue).

**JS equivalent**: `production.js` `calcTradeDistribution()` — a faithful port.

**Discrepancies**:
- **MATCH: Tax/lux/sci formula** — JS matches binary's `(trade * rate + 4) / 10` with correct rounding.
- **MATCH: Specialist bonuses** — JS correctly applies entertainers=2, taxman=3, scientist=3 before building multipliers.
- **MATCH: Building multipliers** — JS correctly applies Marketplace/Bank/Stock Exchange and Library/University/Research Lab.
- **MATCH: Wonder multipliers** — JS has Isaac Newton's and Copernicus' with correct formulas.
- **MATCH: Fundamentalism science penalty** — JS applies `COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY`.
- **MATCH: AI fundamentalism gold→science** — JS redirects AI tax to science under fundamentalism.
- **MISSING: Capitalization special case** — Binary has special handling when building Capitalization (wonder -38) to redirect trade to gold. JS may handle this elsewhere but it's not in `calcTradeDistribution`.
- **MISSING: Corruption espionage counter** — Binary tracks corruption for espionage visibility. Not in JS.
- Overall this is a **very good port** — one of the most faithful function matches.

---

### 20. `ai_find_nuke_target` (FUN_00536c4c, 1,760B) vs ai/unitai.js

**Binary summary**: AI logic for choosing a nuclear strike target:
1. Iterates all cities. For each enemy city (different civ, size > 4):
   - Checks if enemy has SDI defense (building 17 "SDI Defense") — skips if so.
   - Checks diplomatic relations: wants cities where `(treatyFlags & 0x104) == 0x100` (at war, not allied).
   - Also targets if enemy civ has no nuclear deterrent (`civ.nukeCount == 0`) and the civ is losing militarily.
2. For each candidate: evaluates "safety score" by counting enemy units near the city (8 adjacent tiles). Prefers targets with fewer defenders.
3. Also adds bonus for city size (bigger city = more valuable target).
4. Finds the best city, then places the nuke on an adjacent empty tile.
5. If target civ has nuclear weapons, may declare war. Adjusts diplomatic attitude.

**JS equivalent**: `ai/unitai.js` likely has some nuke targeting logic.

**Discrepancies**:
- **LIKELY MISSING: Full nuke targeting** — Binary has sophisticated targeting considering SDI defense, diplomatic state, defender count, city size, nuclear deterrence. JS AI nuke logic is likely much simpler or absent.
- **MISSING: SDI defense check** — Binary specifically skips cities with SDI Defense (building 17).
- **MISSING: Nuclear deterrence consideration** — Binary avoids nuking civs that have their own nukes unless the military balance is very unfavorable.

---

### 21. `delete_city` (delete_city @ 0x004413D1, 1,704B) vs city deletion

**Binary summary**: Removes a city from the game:
1. Decrements owner's city count.
2. Rehomes all units whose home city is this one: tries to find another same-civ city for each unit, falls back to killing the unit.
3. Settlers (role=1) get checked for nearby city rehoming; units failing rehoming are killed.
4. Zeroes the city record, decrements city count.
5. Clears trade route references to this city from all other cities.
6. Clears wonder references if city had wonders.
7. Resets map tiles: removes city tile improvement flag (0x02), iterates 45-tile extended radius to update tile ownership and body IDs.
8. For each tile in the city's radius on the same continent: if owned by this civ and no other same-civ city claims it, resets tile ownership.
9. Refreshes all cities (recalculates worker tiles).
10. Multiplayer: sends network sync.

**JS equivalent**: City deletion happens in `citycapture.js` (when captured and razed) and in `reduce/helpers.js`. The `killCiv` function in `diplomacy.js` handles civ elimination which triggers city cleanup.

**Discrepancies**:
- **PARTIAL: Unit rehoming** — Binary tries to rehome each unit to another city, then kills it if impossible. JS may just kill units or set homeCityId to 0xFFFF.
- **MISSING: Trade route cleanup** — Binary clears trade route references from all other cities when a city is deleted. JS doesn't have trade route establishment so this is N/A.
- **MISSING: Wonder cleanup** — Binary clears wonder records when the city owning them is destroyed. JS wonders are stored differently (state.wonders array with cityIndex).
- **MISSING: Extended radius tile ownership reset** — Binary iterates 45-tile extended radius to reset tile ownership. JS may not handle this.
- **PARTIAL: City tile flag removal** — Binary removes the city improvement flag (0x02) from the map tile. JS should handle this in the reducer.

---

### 22. `create_unit` (FUN_005b3d06, 1,675B) vs unit creation

**Binary summary**: Creates a new unit:
1. Finds first empty unit slot (or extends unit array if all used).
2. Checks max unit limits: hard cap at 0x7FF (2047) total, soft cap at 0x79C (1948) for AI. Returns -1 if full.
3. Increments civ's unit count and per-type count.
4. Initializes all unit fields: type, owner, unique ID (incrementing), moves=0 (or max if in MP and `DAT_006ad684` set), HP=0, status=0x58 (initial), orders=0xFF, homeCity=0xFF, goto coords=(-1,-1), position=(-1,-1).
5. Finds home city: calls `thunk_FUN_0043d07a` to find nearest same-civ city.
6. Places unit at given coordinates via `thunk_FUN_005b345f`.
7. Calls `thunk_FUN_004274a6` to update visibility.
8. Tutorial triggers: first ship, first air unit, first caravan, first/second ground unit.
9. Multiplayer: sends network sync.

**JS equivalent**: Unit creation is scattered across the reducer (PRODUCE_UNIT completion), `citycapture.js` (creating defenders), and `init.js`.

**Discrepancies**:
- **MISSING: Unit slot reuse** — Binary reuses empty unit slots (checking for `*(int*)unitRecord == 0`). JS uses array indices and may not reuse dead unit slots efficiently.
- **MISSING: Max unit limit enforcement** — Binary enforces 2047 hard cap and 1948 AI soft cap. JS has no unit count limit.
- **MISSING: Unique unit ID** — Binary assigns an incrementing unique ID to each unit (DAT_00627fd8). JS units don't have unique IDs beyond array index.
- **MISSING: Tutorial triggers** — Binary fires tutorial events for first ship/air/caravan/ground units. Not relevant for JS.
- **PARTIAL: Home city assignment** — Binary finds nearest same-civ city. JS sets homeCityId based on the producing city.

---

### 23. `cheat_edit_scenario` (FUN_005582ad, 1,648B) — No JS equivalent

**Binary summary**: Scenario editor dialog. Allows editing scenario properties. Debug/editor only.

**Discrepancies**: N/A — Editor function.

---

### 24. `city_button_buy` (city_button_buy @ 0x00509B48, 1,642B) vs rush buy

**Binary summary**: Handles the "Buy" button in the city screen:
1. Gets the city being viewed from the city window context.
2. Gets the item being produced and its total cost.
3. Calculates rush buy cost using the standard formula (calls calcRushBuyCost equivalent).
4. Checks if civ has enough gold.
5. Shows confirmation dialog with cost.
6. Deducts gold, sets city.shieldsInBox = totalCost (item is bought instantly).
7. Calls `handle_city_disorder_00509590` to check if buying triggers disorder.
8. Refreshes city display.

**JS equivalent**: `reducer.js` RUSH_BUY action (line 193) + `happiness.js` `calcRushBuyCost()`.

**Discrepancies**:
- **MATCH: Rush buy formula** — Both use the same cost calculation.
- **MATCH: Gold deduction** — Both deduct from treasury and set shields to full.
- **MINOR: Disorder check** — Binary calls disorder check after buying. JS may handle this in end-turn processing instead of immediately.
- Overall a **good match**.

---

## Batch 24

### 25. `handle_city_disorder` (handle_city_disorder_004ef578 @ 0x004EF578, 1,614B) vs cityturn.js

**Binary summary**: Handles civil disorder and "We Love the King Day" (WLTKD):
1. Compares happiness (DAT_006a6550) vs unhappiness (DAT_006a65a8):
   - **Disorder** (happy < unhappy): Sets disorder flag (0x4001), calls `thunk_FUN_00441b11` to auto-reassign workers. If AI under Democracy-like government (govtIndex 6) in scenario mode, triggers revolution to lower government.
   - **Continued disorder**: Sets flag 0x2000. If previously had WLTKD, sets flag 0x100000. Government revolution check for AI democracies.
   - **Order restored** (was in disorder, now happy >= unhappy): Clears disorder flags (0xFFEFDFFE), reassigns workers.
2. **We Love the King Day** check: if unhappyCount == 0, city size >= 3, and happy >= ceil(size/2), sets WLTKD flag (0x2). Under Republic+ with WLTKD + surplus food > city threshold, city grows by 1.
3. **WLTKD end**: if conditions no longer met, clears WLTKD flag (0xFFFFFFFD).
4. Adds science output to civ treasury when not in disorder and government != Anarchy.

**JS equivalent**: `cityturn.js` or `happiness.js` handles disorder/WLTKD checks.

**Discrepancies**:
- **PARTIAL: Disorder detection** — JS likely checks happy vs unhappy counts but may not set all the binary's flag bits correctly.
- **MISSING: Auto-worker reassignment on disorder** — Binary calls `FUN_00441b11(cityIndex, 99)` to force all workers to become entertainers on disorder. JS may not auto-reassign.
- **MISSING: AI revolution on disorder** — Binary triggers government revolution for AI Democracy civs experiencing disorder. JS doesn't have this.
- **MISSING: WLTKD city growth** — Binary grows city by 1 under Republic+ with WLTKD and sufficient food. JS may handle this but should verify.
- **MATCH: WLTKD condition** — Both check `unhappyCount == 0 && size >= 3 && happyCount >= ceil(size/2)`.

---

### 26. `unit_order_airlift` (FUN_0058df7b, 1,609B) vs airlift in JS

**Binary summary**: Airlift dialog and execution:
1. Validates unit can be airlifted (not naval, not air).
2. Checks source city has airport (building 0x20 = 32).
3. Checks source city hasn't already airlifted this turn (flag 0x01).
4. Shows city list of same-civ cities with airports (excluding source).
5. Checks destination city hasn't already received airlift this turn.
6. Scans for enemy fighters within range of both source and destination airports. Counts them as "interception risk" (stealth fighters count double).
7. Shows warning dialog if enemy fighters found.
8. Executes airlift: calls `thunk_FUN_004ca1cd` to move unit.

**JS equivalent**: Airlift is referenced in the reducer but may not be fully implemented.

**Discrepancies**:
- **LIKELY MISSING: Full airlift system** — Binary has airport building check, one-airlift-per-turn-per-city limit, enemy fighter interception warning. JS may not implement all of these.
- **MISSING: Enemy interception risk** — Binary scans for enemy fighters near both airports and warns the player. Not in JS.
- **MISSING: Per-city airlift limit** — Binary uses city flag bit 0x01 to track one airlift per turn per city.

---

### 27. `kill_civ` (kill_civ @ 0x004AA378, 1,608B) vs diplomacy.js killCiv

**Binary summary**: Eliminates a civilization:
1. Guard: if civSlot==0 (barbarians), return 0.
2. Guard: checks if civ still has any cities — if so, return 0 (can't kill civ with cities).
3. If killerCiv == -1: silent elimination (no notification). Otherwise shows "destroyed" message.
4. Records in kill history (up to 12 entries): turn, killer, destroyed civ name.
5. Kills all remaining units owned by the dying civ.
6. Handles bribed units: units with bribe flag whose return-to-civ matches the dying civ have their bribe flag cleared.
7. If dying civ was human: sets game-end flag to 4 (player defeated). For multiplayer: sends disconnect.
8. Clears alive bitmask.
9. Resets visibility: removes civ's visibility bit from all map tiles.
10. Calls `thunk_new_civ` to recycle the civ slot for a new barbarian civilization.
11. Multiplayer sync.
12. Refreshes map display.

**JS equivalent**: `diplomacy.js` `killCiv()` — a faithful port.

**Discrepancies**:
- **MATCH: Guard against killing civ with cities** — Both check for remaining cities.
- **MATCH: Kill history recording** — Both record up to 12 kill history entries.
- **MATCH: Clear alive bitmask** — Both clear `civsAlive & ~(1 << civSlot)`.
- **MATCH: Kill all units** — Both set dead units' positions to -1.
- **MATCH: Clear visibility** — Both clear the civ's visibility bit from all map tiles.
- **MATCH: Clear diplomacy** — Both clear treaty/attitude data for the dead civ.
- **MATCH: Spaceship reset** — Both call resetSpaceship.
- **ADDITIONAL in JS: Bribed unit repatriation** — JS has logic to return bribed units to their original owner (with nearest city rehoming). Binary handles bribed units differently (just clears the bribe flag without rehoming).
- **MISSING: New civ creation** — Binary calls `thunk_new_civ` to recycle the slot for a new barbarian civ. JS doesn't recycle civ slots.
- **MISSING: Player defeated end-game** — Binary sets `DAT_0064b1ac = 4` when a human player is eliminated. JS handles this differently through game end conditions.
- Overall a **very good port** with the main gap being civ slot recycling.

---

### 28. `process_unit_support_deficit` (FUN_004eef23, 1,621B) vs cityturn.js

**Binary summary**: When a city can't support its units (more units than food/shields allow):
1. Iterates all units homed to this city.
2. Calls `FUN_004e7d7f` to calculate per-unit support cost.
3. If support exceeds production OR (city is in disorder on specific turns AND not human AND government > Republic):
   - Finds the farthest unit from the city (using distance calculation).
   - Priority: prefers units NOT in city tiles, NOT fortified in fortress.
   - If the unit is a ground unit in a city, gives partial shield refund (half production cost added to city's shield box).
   - Disbands/kills the unit.
   - Clears city disorder flags after disbanding.
4. Loops back to check if deficit persists.
5. If deficit is impossible to resolve (no more disbandable units): sets civ-wide negative morale indicators.

**JS equivalent**: Unit support deficit handling is partially in `production.js` `calcUnitShieldSupport()` and end-turn processing.

**Discrepancies**:
- **MISSING: Auto-disband farthest unit** — Binary automatically disbands the farthest unit from the city when support deficit occurs. JS may just show a deficit without auto-disbanding.
- **MISSING: Shield refund on disband** — Binary gives half the unit's production cost back to the city when auto-disbanding a ground unit in a city.
- **MISSING: Priority ordering** — Binary prefers disbanding units far from the city, not in fortresses, not defending cities. JS likely doesn't have this priority logic.
- **MISSING: Deficit resolution loop** — Binary loops until deficit is resolved or no more units can be disbanded. JS may only check once.

---

### 29. `citywin_unit_popup_present` (FUN_00506a42, 1,608B) — UI only

**Binary summary**: Presents a popup menu for a unit in the city window. Shows options like "activate", "disband", "rename", "change home city". Purely UI.

**Discrepancies**: N/A — UI popup, not game logic.

---

### 30. `expand_city_territory` (FUN_004a93b3, 953B) vs territory expansion

**Binary summary**: Expands a city's territory by claiming unclaimed tiles:
1. Iterates `param_2` times (usually 2-4 depending on context):
   - Scans 20 city-radius tiles for the best unclaimed tile.
   - Scoring: Desert=1, Plains=4, Grassland=3 (or 5 with special), Tundra=2. Inner ring (indices 0-7) gets +1 bonus. Tiles with resources get +3.
   - Claims the best tile for this city's civ (sets tile ownership flag 0x10 + road bit).
   - For tundra terrain (type 4), also sets irrigation and road.
   - For other types, just sets road.
   - Assigns tile to city's owner (calls `thunk_FUN_005b8b1a`).
2. After expansion: iterates 45-tile extended radius, for all unclaimed land tiles on the same continent, claims them for this civ (sets visibility).

**JS equivalent**: Territory expansion is not explicitly implemented as a standalone function in JS. City founding in `init.js` may set initial territory.

**Discrepancies**:
- **MISSING: Dynamic territory expansion** — Binary expands territory when certain events occur (city growth, wonder completion). JS doesn't have this mechanic.
- **MISSING: Tile claiming algorithm** — Binary's scoring system (terrain type priorities, inner ring bonus, resource bonus) for choosing which tiles to claim. Not in JS.
- **MISSING: Auto-road on claimed tiles** — Binary places roads on newly claimed tiles. Not in JS.

---

### 31. `diplo_activate_alliance_wars` (FUN_0045a8e3, ~910B) vs diplomacy.js

**Binary summary**: When two civs go to war (param_1 attacks param_2), this function checks alliance cascading:
1. For each third civ that has an alliance (treaty flag & 0x08) with the ATTACKER (param_1):
   - If the third civ also has a peace treaty with the VICTIM (param_2):
   - AND the third civ doesn't already have war/cease-fire with the victim:
   - AND the third civ is at alliance with the victim:
   - **If victim is human**: The third civ (ally of attacker) declares war on the victim. Shows "ACTIVATEALLY" message. Sets war flags.
   - **If attacker is human**: Shows "ALLYHELPS" message. The third civ goes to war against the victim. Sets war/hostile flags (0x80800).
2. Recursive: calls itself with swapped params to handle the reverse alliance cascade.

**JS equivalent**: `diplomacy.js` has treaty management but alliance war cascading may not be fully implemented.

**Discrepancies**:
- **LIKELY MISSING: Alliance war cascade** — Binary cascades war declarations through alliances: when A attacks B, A's allies automatically declare war on B. This is a critical diplomatic mechanic that JS may not implement.
- **MISSING: Recursive cascade** — Binary calls itself recursively to handle chains of alliances. Without this, alliance networks don't properly cascade war declarations.
- **MISSING: Treaty flag manipulation** — Binary sets specific flag bits (0x2401 for war declaration from alliance, 0x80800 for hostile state). JS treaty system may use different flag encoding.

---

## Summary of Critical Discrepancies

### Game Logic Gaps (HIGH priority):
1. **Spaceship sub-type tracking** — 6 individual part types vs 3 aggregates (affects success probability)
2. **AI tech cycling restriction** — `(techIndex - civIndex) % 3` diversification filter
3. **Worker order work-turns calculation** — Per-terrain scaling missing
4. **Settler cooperation** — Multiple settlers combining work progress
5. **Auto-disband on support deficit** — Farthest-unit-first with shield refund
6. **Alliance war cascade** — Automatic war declaration through alliance chains
7. **Territory expansion** — Dynamic tile claiming with scoring algorithm
8. **Caravan arrival handling** — Trade route establishment + wonder contribution

### Good Ports (matching or close):
1. **distribute_trade** (FUN_004ea1f6) — Very faithful port in production.js
2. **kill_civ** — Very faithful port in diplomacy.js
3. **continent_assign_body_ids** — Good port in mapgen.js
4. **city_button_buy** — Good match in reducer.js

### N/A (UI-only, debug, or different architecture):
- cheat_edit_terrain, cheat_edit_unit, cheat_edit_scenario (debug)
- throne_room_add_improvement (cosmetic)
- singleplayer_main_menu, hotseat_new_game_flow (UI flow)
- diff_engine_scan_and_send (network protocol)
- map_window_click (client UI)
- citywin_unit_popup_present (UI popup)
- save_game, load_saved_game_flow (file I/O)
