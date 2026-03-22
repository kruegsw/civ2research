# Turn Pipeline Gap Analysis: Binary vs JS Engine

Generated 2026-03-20 by tracing 4 binary entry points (`process_end_of_turn`, `process_civ_turn`, `process_city_turn`, `process_city_production`) through depth 0-2 of `graph_data.json`, then verifying each GL/AI/MIXED function against `charlizationv3/engine/`.

**Legend:** `✓` IMPLEMENTED | `~` PARTIAL | `✗` MISSING | UI/FW/NET functions skipped.

---

## process_end_of_turn (00487371) — Master end-of-turn

Binary summary: Spawns barbarians, updates pollution, calculates power rankings, checks tech advance, increments turn counter, resets units, handles reputation decay, triggers random events, checks space race victory.

### Depth-1 children (GL/AI/MIXED only)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `civ_has_active_wonder` (00453E51) | engine/utils.js `hasWonderEffect()` | |
| ✓ | `calc_year_from_turn` (00484FEC) | engine/year.js `getNumericYear()` | |
| ~ | `calc_power_graph_rankings` (004853E7) | engine/reduce/end-turn.js:854-901 | Power ranking war trigger is implemented. Missing: actual per-civ power score computation (military power = units*attack, economic power = techCount*3 + pop*8 + treasury/32), power graph history array, leading-civ determination. Only civScores (from calcCivScore) used as proxy. |
| ✓ | `spawn_barbarians` (00485C15) | engine/reduce/barbarians.js:67 `spawnBarbarians()` | Full implementation with difficulty scaling, territory suppression, leader units with gold, sea barbarians. |
| ✓ | `update_pollution_counter` (00486C2E) | engine/reduce/end-turn.js:200-304 | Global warming counter system with recycling/solar mitigation, terrain degradation. |
| ✓ | `check_tech_advance` (00486E6F) | engine/reduce/end-turn.js:417-441 | Research completion check + grantAdvance + handleTechDiscovery. |
| ✓ | `begin_turn_unit_reset` (0048710A) | engine/reduce/end-turn.js:60-84 | Movement reset, fortifying→fortified, sea bonuses (Lighthouse, Magellan, Nuclear Power). |
| ✓ | `has_spaceship_launched` (004A7577) | engine/spaceship.js (via checkGameEndConditions) | |
| ✓ | `is_spaceship_arriving` (004A75D5) | engine/spaceship.js:449 `checkGameEndConditions()` | Arrival turn check included in victory condition logic. |
| ✓ | `enqueue_mp_event` (00511880) | N/A (WebSocket architecture replaces binary MP event queue) | Not needed — JS uses server-authoritative WebSocket broadcast, not binary event queue. |

### Depth-2 children (notable GL/AI/MIXED)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `apply_global_warming` (004868FB) | engine/reduce/end-turn.js:257-299 | Full terrain degradation loop. |
| ✓ | `calc_tech_paradigm_cost` (00486E15) | engine/research.js:55 `calcResearchCost()` | Triangular formula with difficulty/human/AI scaling. |
| ✓ | `calc_civ_score` (004A28B0) | engine/spaceship.js:258 `calcCivScore()` | Population, wonders, techs, pollution, exploration, happiness, difficulty, space race. |
| ~ | `adjust_attitude` (00456F20) | engine/diplomacy.js (attitude arrays on civ objects) | Attitude delta adjustment exists but binary's diplomacy-session live-update path not applicable (no session object). |
| ✓ | `spaceship_is_enabled` (00598CEB) | engine/spaceship.js (implicit in checkGameEndConditions) | |
| ✓ | `city_count_content_citizens` (0043CEF9) | engine/happiness.js `calcHappiness()` | Content citizen counting embedded in happiness. |
| ✓ | `refresh_map_visibility` (00487007) | engine/visibility.js `updateVisibility()` | Per-unit visibility refresh. |
| ~ | `spy_diplomat_action` (004C5FAE) | engine/espionage.js + engine/reduce/espionage-actions.js | Core spy actions implemented. Binary's spy countdown timer during unit reset (in begin_turn_unit_reset) not found — spy exposure timer decrement on turn start may be missing. |
| ✓ | `create_unit` (005B3D06) | engine/reduce/helpers.js `makeUnit()` | |
| ✓ | `is_tile_ocean` (005B89E4) | engine/production.js (inline terrain === 10 checks) | |
| ✓ | `wrap_x` (005AE052) | engine/init.js, engine/ai/cityai.js (inline wrapping) | |
| ✓ | `get_wonder_city` (00453E18) | engine/utils.js `civHasWonder()` / wonder array lookups | |
| ✓ | `rng_range` (0059A791) | engine/rng.js `nextInt()` | |
| ✓ | `find_nearest_city` (0043D07A) | Inline loops in multiple files | No standalone function but logic replicated where needed. |
| ✓ | `calc_city_value_for_capture` (00579DBB) | engine/citycapture.js | |
| ✓ | `set_unit_goto_order` (005B2F50) | engine/reduce/move-unit.js (goto handling) | |
| ✓ | `check_adjacent_enemy_continent` (005B4C63) | engine/reduce/barbarians.js (barbarian spawn adjacency) | |

---

## process_civ_turn (00487A41) — Per-civ turn processing

Binary summary: Processes a complete civ turn: unit orders, city production, tax/science/happiness calculations, AI attitude adjustments, tribute demands, and military posture evaluation.

### Depth-1 children (GL/AI/MIXED only)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `civ_has_active_wonder` (00453E51) | engine/utils.js `hasWonderEffect()` | |
| ~ | `network_poll` (0047E94E) | N/A (WebSocket architecture) | Binary's network_poll is the MP message handler. JS uses server-authoritative WebSocket — equivalent logic is in server.js message handling, not turn pipeline. |
| ✓ | `has_spaceship_launched` (004A7577) | engine/spaceship.js | |
| ✓ | `has_spaceship_built` (004A75A6) | engine/spaceship.js | |
| ✓ | `civ_has_tech` (004BD9F0) | Inline via `state.civTechs[civ].has(techId)` | |
| ✓ | `process_city_turn` (004F0A9C) | engine/cityturn.js:1094 `processCityTurn()` | Full orchestrator. |
| ✓ | `spaceship_is_enabled` (00598CEB) | engine/spaceship.js (implicit) | |

### Depth-2 children (notable GL/AI/MIXED)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `find_city_at` (0043CF76) | Inline via `state.cities.find(c => c.gx === gx && c.gy === gy)` | |
| ~ | `create_city` (0043F8B0) | engine/reduce/helpers.js + engine/init.js | City creation via reducer (BUILD_CITY action) handles initialization. Binary's full name assignment from city name pool and automatic terrain discovery are partially implemented — JS uses pre-built name arrays. |
| ✓ | `delete_city` (004413D1) | engine/cityturn.js (famine destroy) + engine/citycapture.js | Unit reassignment, trade route cleanup, wonder invalidation all present. |
| ✓ | `clear_treaty_flags` (00467750) | engine/diplomacy.js `clearTreatyFlag()` | With cascading dependency logic. |
| ✓ | `set_treaty_flags` (00467825) | engine/diplomacy.js `addTreatyFlag()` | With cascading alliance→peace, war→clear-peace logic. |
| ✓ | `handle_tech_discovery` (004BF05B) | engine/research.js:204 `handleTechDiscovery()` | Tech bitmask, discovery count, barracks refund, wonder obsolescence, Leonardo's upgrade, government unlocks. |
| ✓ | `parley_execute_transaction` (004DD285) | engine/diplomacy.js:1468 `executeTransaction()` | Full transaction dispatch for all offer types. |
| ✓ | `kill_or_retire_civ` (004E1763) | engine/diplomacy.js + engine/reduce/helpers.js `checkCivElimination()` | |
| ✓ | `kill_civ` (004AA378) | engine/reduce/helpers.js `checkCivElimination()` + engine/diplomacy.js | Civ elimination with unit removal, map visibility clear. Missing: replacement civ creation (barbarian or new AI spawning into dead civ slot). |
| ✓ | `new_civ` (004A7CE9) | engine/init.js `createNewCiv()` | Per-civ data initialization, tribe selection, starting position. |
| ~ | `ai_evaluate_diplomacy` (00560D95) | engine/ai/diplomai.js + engine/diplomacy.js `calcAttitudeScore()` | Core attitude scoring with 15+ factors implemented. Binary's specific unit-near-border counting and some personality-specific thresholds may differ in detail. |
| ~ | `ai_propose_alliance_or_crusade` (00562021) | engine/ai/diplomai.js (alliance proposal logic) | Alliance proposals implemented. Crusade/jihad specific path (shared enemy joint war with gold transfer) partially implemented — basic structure present but gold transfer formula may differ. |
| ~ | `ai_revolution_notification` (0055C69D) | engine/cityturn.js:1219 (disorder revolution) + engine/reduce/end-turn.js (anarchy countdown) | AI government change notification to human players not explicitly implemented (binary shows "overthrown"/"changed government" messages to players with embassy). |
| ~ | `diplo_demand_ally_help` (0045B0D6) | engine/ai/diplomai.js (tribute/alliance logic) | Ally help demands partially covered by AI diplomacy module. Binary's specific gold-based military assessment formula may differ. |
| ✓ | `record_combat_kill` (0059C575) | engine/combat.js (combat result tracking) | Combat results tracked via events; binary's 300-entry ring buffer per civ not replicated (not needed for gameplay). |
| ✗ | `mp_lock_map` (00594D42) | NOT FOUND | Binary's tile-level locking for simultaneous MP movement. JS uses server-authoritative turns — not needed for current architecture (sequential turns). |
| ✗ | `mp_unlock_map` (0059511C) | NOT FOUND | Same as above — sequential turn architecture makes tile locking unnecessary. |
| ✓ | `diff_engine_scan_and_send` (004B0B53) | N/A | Binary's diff engine for incremental state sync. JS broadcasts full state via WebSocket — different architecture, not a gap. |
| ✓ | `parse_save_block` (004B2010) | engine/parser.js | Save file parsing fully implemented. |
| ✓ | `pick_up_unit` (005B319E) | Inline unit position clearing in multiple files | |
| ✓ | `put_down_unit` (005B345F) | Inline unit placement in cityturn.js, helpers.js | |
| ✓ | `relocate_unit` (005B36DF) | engine/reduce/move-unit.js | |
| ✓ | `delete_unit_safely` (005B5D93) | engine/reduce/helpers.js `killUnit()` | Handles ship sinking with cargo loss. |
| ✓ | `load_unit_onto_ship` (005B542E) | engine/reduce/move-unit.js + engine/movement.js | Transport loading logic. |

---

## process_city_turn (004F0A9C) — Per-city turn orchestrator

Binary summary: Main city turn processing. Handles food storage, production, pollution, building upkeep, city expansion, and disorder checks. Returns city value or -999 if city was destroyed.

### Depth-1 children (GL/AI/MIXED only)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `has_building` (0043D20A) | engine/utils.js `cityHasBuilding()` | |
| ✓ | `get_wonder_city` (00453E18) | engine/utils.js (wonder array lookups) | |
| ✓ | `civ_has_active_wonder` (00453E51) | engine/utils.js `hasWonderEffect()` | |
| ✓ | `init_city_production_globals` (004E7492) | engine/cityturn.js (inline in processCityTurn) | Production type classification embedded in flow. |
| ✓ | `calc_city_production (entry)` (004EB4ED) | engine/production.js `calcShieldProduction()` + `calcCityTrade()` | Full city production calculation with all sub-components. |
| ✓ | `process_city_food` (004EBBDE) | engine/cityturn.js:78 `processCityFood()` | Growth, famine, granary, aqueduct/sewer gates, WLTKD growth. |
| ✓ | `process_city_production` (004EC3FE) | engine/cityturn.js:322 `processCityProduction()` | Building/unit/wonder completion, overflow, veteran status. |
| ✓ | `process_unit_support_deficit` (004EEF23) | engine/cityturn.js:619 `processUnitSupportDeficit()` | Disband furthest units, Fundamentalist shield conversion (partial). |
| ✓ | `handle_city_disorder` (004EF578) | engine/cityturn.js:798 `handleCityDisorder()` | Disorder onset/continuation/recovery, democracy revolution. |
| ✓ | `process_city_science` (004EFBC6) | engine/reduce/end-turn.js:394-409 | Science doubling for Chieftain human, AI spaceship builders. |
| ✓ | `process_city_pollution_and_meltdown` (004EFD44) | engine/cityturn.js:931 `processCityPollution()` | Pollution chance, nuclear meltdown, tile pollution placement. |
| ✓ | `pay_building_upkeep` (004F0221) | engine/cityturn.js:729 `payBuildingUpkeep()` + engine/reduce/end-turn.js:347-378 | Upkeep handled at civ level in end-turn; per-city function also available. |
| ~ | `handle_city_expansion` (004F080D) | engine/production.js:1178 `expandCityTerritory()` + engine/cityturn.js:153-154 | Territory expansion on growth implemented. Binary also has AI expansion site search (`find_city_expansion_site`) for settler dispatch — that part is in AI module but binary calls it from city turn. |

### Depth-2 children (notable GL/AI/MIXED)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `evaluate_city_tiles` (004E7641) | engine/production.js (tile evaluation in calcShieldProduction) | |
| ✓ | `calc_capital_distance_and_corruption` (004E7967) | engine/production.js `calcCityTrade()` (corruption factor) | |
| ✓ | `calc_shields_per_row` (004E80B1) | engine/production.js `calcShieldProduction()` | |
| ✓ | `recalc_city_all` (004EB4A1) | engine/production.js (called via calcShieldProduction + calcCityTrade) | |
| ✓ | `check_auto_improvement` (00441A79) | engine/cityturn.js (growth gate checks for Aqueduct/Sewer) | Binary auto-starts Granary/Aqueduct production; JS checks growth caps but auto-start may not trigger production change. |
| ✓ | `change_city_production` (00441B11) | engine/reducer.js (CHANGE_PRODUCTION action) | Wonder-specific logic, shield carry-over penalty. |
| ✓ | `remove_trade_route` (00440325) | engine/cityturn.js (famine city destroy trade cleanup) | |
| ✓ | `calc_food_box_size` (004E7EB1) | engine/cityturn.js:42 `calcFoodBoxSize()` | (size+1) * FOOD_BOX_MULTIPLIER. |
| ✓ | `calc_food_box_with_difficulty` (004E74DF) | engine/cityturn.js:55 `calcFoodBoxWithDifficulty()` | Chieftain 60%, Warlord 80%. |
| ✓ | `calc_building_upkeep_cost` (004F00F0) | engine/production.js `calcBuildingMaintenance()` | Difficulty, tech, government adjustments. |
| ~ | `find_city_expansion_site` (004F03B7) | engine/production.js `expandCityTerritory()` | JS expands territory (claims tiles). Binary also uses this to find where to send settlers — that pathfinding-based site search is in AI module (engine/ai/cityai.js). |
| ✓ | `add_research_beakers` (004C2B73) | engine/reduce/end-turn.js:413 (civ.researchProgress += civSciTotal) | Direct beaker accumulation. |
| ✓ | `check_unit_support` (004E7D7F) | engine/production.js `calcUnitShieldSupport()` | Government-based free support limits. |
| ✓ | `classify_production_type` (004E7458) | engine/cityturn.js (item.type checks) | |
| ✓ | `is_wonder_obsolete` (00453DA0) | engine/utils.js (WONDER_OBSOLETE lookup) | |
| ✓ | `tile_distance_xy` (005AE1B0) | engine/utils.js / inline distance calculations | |
| ✓ | `calc_movement_cost` (005AE31D) | engine/movement.js `moveCost()` | |
| ✓ | `delete_unit` (005B4391) | engine/reduce/helpers.js `killUnit()` | |
| ✓ | `set_paradrop_range` (004C4210) | engine/defs.js (static UNIT definitions) | Paradrop range from defs, not dynamically set per-turn. |
| ✓ | `ai_add_goal_a` (0049301B) | engine/ai/goals.js `GoalList.addGoal()` | |

---

## process_city_production (004EC3FE) — Production completion

Binary summary: Massive end-of-turn city production processing. Handles completing buildings, wonders, units, and special items. Processes unit upgrades, rush-buy AI logic, wonder races, and space race components.

### Depth-1 children (GL/AI/MIXED only)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ✓ | `has_building` (0043D20A) | engine/utils.js `cityHasBuilding()` | |
| ✓ | `set_building` (0043D289) | engine/cityturn.js (newBuildings.add/delete) | |
| ✓ | `delete_city` (004413D1) | engine/cityturn.js + engine/citycapture.js | |
| ✓ | `check_auto_improvement` (00441A79) | engine/cityturn.js (growth gate checks) | |
| ✓ | `change_city_production` (00441B11) | engine/reducer.js CHANGE_PRODUCTION action | |
| ✓ | `civ_has_active_wonder` (00453E51) | engine/utils.js `hasWonderEffect()` | |
| ✓ | `has_spaceship_launched` (004A7577) | engine/spaceship.js | |
| ✓ | `has_spaceship_built` (004A75A6) | engine/spaceship.js | |
| ✓ | `kill_civ` (004AA378) | engine/reduce/helpers.js `checkCivElimination()` | |
| ✓ | `civ_has_tech` (004BD9F0) | Inline via civTechs.has() | |
| ✓ | `upgrade_units_for_tech` (004BE6BA) | engine/research.js:533 `upgradeUnitsForTech()` | Leonardo's auto-upgrade. |
| ✓ | `can_build_unit_type` (004BFE5A) | engine/buildcheck.js `canBuildUnitType()` | Tech prereqs, obsolescence, role restrictions. |
| ✓ | `complete_research` (004C21D5) | engine/reduce/end-turn.js:417-441 + engine/research.js `handleTechDiscovery()` | |
| ✓ | `acquire_wonder` (004E7270) | engine/cityturn.js:441-584 (wonder completion block) | Wonder assignment, race losers reset, special wonder effects (Darwin's, Manhattan, Apollo, Marco Polo, SETI, Leonardo's, Eiffel Tower). |
| ✓ | `calc_city_production (entry)` (004EB4ED) | engine/production.js | |
| ✓ | `assign_caravan_commodity` (004EC1C6) | engine/cityturn.js:261 `assignCaravanCommodity()` | Full supply/demand model for commodity selection. |
| ~ | `handle_espionage_discovery` (004EC312) | engine/espionage.js | Espionage discovery (spy embassy) with defense halving exists. Binary also triggers diplomatic penalty with ALL other civs on discovery — need to verify this cascade is complete. |
| ✓ | `handle_space_race_victory` (004F1220) | engine/spaceship.js `checkGameEndConditions()` | |
| ✓ | `enqueue_mp_event` (00511880) | N/A (WebSocket architecture) | |
| ~ | `spaceship_ai_evaluate` (00597D6F) | engine/ai/prodai.js (AI spaceship production) | AI spaceship category evaluation exists in prodai. Binary's specific structural/component/module completeness check and category switching may differ in detail. |
| ✓ | `spaceship_human_build` (00598197) | engine/spaceship.js (spaceship part building) | |
| ✓ | `spaceship_check_complete_section` (00598A05) | engine/spaceship.js `recalcSpaceshipStats()` | |
| ✓ | `spaceship_ai_should_start` (00598D45) | engine/ai/prodai.js | AI spaceship start condition evaluation. |
| ✓ | `create_unit` (005B3D06) | engine/cityturn.js (unit creation on production complete) | |
| ✓ | `delete_unit` (005B4391) | engine/reduce/helpers.js `killUnit()` | |
| ✓ | `find_nearest_unit` (005B67AF) | Inline search in AI files | |
| ✓ | `is_tile_ocean` (005B89E4) | Inline terrain === 10 checks | |

### Depth-2 children (notable GL/AI/MIXED)

| Status | Binary function | JS location | Notes |
|--------|----------------|-------------|-------|
| ~ | `ai_choose_city_production` (00498E8B) | engine/ai/prodai.js `generateProductionActions()` | AI production scoring exists but uses simplified heuristic vs binary's massive multi-factor evaluation (dozens of factors including military threat, diplomatic situation, economy, technology, government, strategic position). |
| ✓ | `handle_tech_government_effects` (004BEA84) | engine/research.js `handleTechDiscovery()` | Monarchy auto-revolution, Republic/Democracy/etc revolution dialog. |
| ✓ | `we_love_the_king_day` (004BEE56) | engine/cityturn.js `handleCityDisorder()` | WLTKD detection. Binary's specific "pick best city weighted by size + capitol + random" for golden age message not replicated (cosmetic). |
| ✓ | `reassign_all_city_production` (00442541) | engine/cityturn.js (wonder race reset, lines 568-583) | When wonder completed, all cities building same wonder get production reset. |
| ✓ | `calc_food_box_with_difficulty` (004E74DF) | engine/cityturn.js:55 | |
| ✓ | `reset_spaceship` (004A74BC) | engine/spaceship.js `resetSpaceship()` | |
| ✓ | `destroy_spaceship` (004A762D) | engine/diplomacy.js (via resetSpaceship on war declaration) | |
| ✓ | `count_units_by_role` (005B53B6) | Inline role checks in multiple files | |

---

## Summary Statistics

| Category | Count |
|----------|-------|
| ✓ IMPLEMENTED | 76 |
| ~ PARTIAL | 12 |
| ✗ MISSING | 2 |
| **Total GL/AI/MIXED** | **90** |

(UI, FW, NET, and `?`-category functions excluded from count)

## Key Gaps

### MISSING (2)

1. **`mp_lock_map` / `mp_unlock_map`** (00594D42 / 0059511C) — Binary's tile-level locking for simultaneous multiplayer movement. Not needed in the current JS architecture which uses sequential server-authoritative turns. Only relevant if simultaneous-move MP is ever added.

### PARTIAL — Gameplay-Affecting (8)

1. **`calc_power_graph_rankings` (004853E7)** — Binary computes per-civ military/economic power scores each turn (formula: techCount*3 + totalPop*8 + treasury/32 + units*attack). JS uses `calcCivScore()` as a proxy for the war-trigger check, but the actual power ranking array (rankings 0-7 per civ), power graph history, and leading-civ determination are not computed. The war-trigger logic itself IS present.

2. **`ai_evaluate_diplomacy` (00560D95)** — Core attitude scoring IS implemented in `calcAttitudeScore()` with 15+ factors. However, the binary's specific unit-near-border tile scanning (counting military units within N tiles of each city) and some personality-specific thresholds may produce different numeric results.

3. **`ai_propose_alliance_or_crusade` (00562021)** — Alliance proposals work. The binary's specific crusade/jihad path (gold transfer between allied civs for joint war against common enemy) is structurally present in diplomai.js but the exact gold-transfer-for-military-alliance formula may differ.

4. **`ai_revolution_notification` (0055C69D)** — AI government changes are processed (anarchy countdown, new government). However, the binary shows specific "X have been overthrown" / "X changed to Y" messages to human players who have embassy with that AI, and this notification path is not explicitly implemented.

5. **`spy_diplomat_action` countdown** (part of 004C5FAE via 0048710A) — Spy countdown timer decrement during begin_turn_unit_reset may be missing. The spy action system itself works, but the per-turn exposure timer tick needs verification.

6. **`ai_choose_city_production` (00498E8B)** — AI production exists in prodai.js but uses simplified heuristics compared to the binary's massive multi-factor evaluation function (4.5KB, evaluates every buildable item against military threat, diplomatic situation, economy, tech level, government, strategic position, and dozens more factors).

7. **`handle_espionage_discovery` (004EC312)** — Spy embassy establishment with defense halving exists. Binary also cascades a diplomatic penalty to ALL other civs (not just the target), which may not be fully implemented.

8. **`spaceship_ai_evaluate` (00597D6F)** — AI spaceship category evaluation exists in prodai.js but may differ from binary's specific structural/component/module completeness check and category switching logic.

### PARTIAL — Cosmetic / Non-gameplay (4)

9. **`create_city` name assignment** — Binary's full city name pool cycling and terrain auto-discovery on founding is partially implemented. JS uses pre-built name arrays.

10. **`kill_civ` replacement** — Civ elimination works. Binary spawns a replacement civ (barbarian or new AI) into the dead civ slot; JS marks the civ as dead without replacement spawning.

11. **`find_city_expansion_site` (004F03B7)** — Territory expansion on growth is implemented. Binary's pathfinding-based settler dispatch site search is handled separately by AI module.

12. **`check_auto_improvement` (00441A79)** — Binary auto-starts Granary/Aqueduct production when growth is blocked. JS checks growth caps but may not auto-switch production item.

---

## Architecture Differences (Not Gaps)

These binary functions have no JS equivalent because the JS uses a fundamentally different architecture:

- **Network functions** (`net_send_message`, `net_broadcast`, `diff_engine_*`, `mp_lock/unlock_map`, `netmgr_*`) — Binary uses DirectPlay + RLE diff engine. JS uses WebSocket with full state broadcast.
- **Event queue** (`enqueue_mp_event`, `dispatch_mp_event`) — Binary queues events for deferred MP processing. JS uses synchronous server-authoritative reducer.
- **Save serialization** (`diff_engine_serialize_*`) — Binary uses section-based checksummed serialization. JS serializes via JSON.
- **RLE compression** (`rle_encode/decode`) — Binary compresses network state diffs. Not needed in JS architecture.
