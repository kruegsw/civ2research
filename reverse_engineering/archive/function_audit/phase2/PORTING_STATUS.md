# Porting Status -- Game Logic + AI Functions

Aggregated from all 34 pseudocode block files. Covers only GL (Game Logic) and AI
functions -- UI, FRAMEWORK, RENDERING, NETWORK, SOUND, FILE_IO categories excluded.

---

## Summary

### Aggregate GL+AI Porting Status (across all blocks)

| Status | Count | % | Description |
|--------|-------|---|-------------|
| P (Ported) | 62 | 13.7% | Fully ported to JS engine |
| PA (Partial) | 100 | 22.1% | Partially ported / significant gaps remain |
| R (Referenced) | 43 | 9.5% | Referenced in JS comments but logic not ported |
| TH (TODO High) | 67 | 14.8% | High priority game logic gaps |
| TM (TODO Medium) | 84 | 18.6% | Medium priority |
| TL (TODO Low) | 96 | 21.2% | Low priority |
| **Total GL+AI** | **452** | **100%** | |

### Additional non-game categories (not tracked here)

| Status | Count | Description |
|--------|-------|-------------|
| NN (Not Needed) | ~1150 | Win32 UI, networking, platform-specific |
| SK (Skip) | ~3550 | Framework/SEH/CRT/MFC boilerplate |

### Per-Block GL+AI Breakdown

| Block | P | PA | R | TH | TM | TL | Total GL+AI |
|-------|---|----|----|----|----|-----|-------------|
| 00400000 | 11 | 7 | 1 | 1 | 1 | 0 | 21 |
| 00410000 | 3 | 10 | 8 | 3 | 12 | 59 | 95 |
| 00420000 | 0 | 4 | 3 | 2 | 5 | 36 | 50 |
| 00430000 | 12 | 4 | 1 | 1 | 1 | 0 | 19 |
| 00440000 | 0 | 2 | 0 | 2 | 2 | 0 | 6 |
| 00450000 | 3 | 3 | 2 | 6 | 7 | 3 | 24 |
| 00460000 | 0 | 5 | 1 | 0 | 0 | 0 | 6 |
| 00470000 | 6 | 7 | 1 | 0 | 0 | 0 | 14 |
| 00480000 | 0 | 10 | 0 | 1 | 4 | 1 | 16 |
| 00490000 | 0 | 3 | 2 | 3 | 8 | 0 | 16 |
| 004A0000 | 0 | 0 | 0 | 10 | 26 | 28 | 64 |
| 004B0000 | 10 | 5 | 3 | 5 | 8 | 15 | 46 |
| 004C0000 | 1 | 11 | 0 | 5 | 3 | 3 | 23 |
| 004D0000 | 0 | 3 | 0 | 11 | 9 | 26 | 49 |
| 004E0000 | 5 | 8 | 2 | 4 | 8 | 9 | 36 |
| 004F0000 | 1 | 1 | 1 | 7 | 9 | 11 | 30 |
| 00500000 | 0 | 11 | 2 | 0 | 0 | 0 | 13 |
| 00510000 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 00520000 | 0 | 0 | 2 | 0 | 0 | 0 | 2 |
| 00530000 | 0 | 6 | 8 | 0 | 0 | 0 | 14 |
| 00540000 | 0 | 2 | 0 | 0 | 0 | 0 | 2 |
| 00550000 | 5 | 9 | 9 | 0 | 0 | 0 | 23 |
| 00560000 | 0 | 3 | 0 | 0 | 0 | 0 | 3 |
| 00570000 | 0 | 0 | 0 | 5 | 7 | 4 | 16 |
| 00580000 | 3 | 2 | 2 | 2 | 5 | 6 | 20 |
| 00590000 | 1 | 3 | 1 | 0 | 9 | 4 | 18 |
| 005A0000 | 8 | 0 | 3 | 1 | 6 | 0 | 18 |
| 005B0000 | 8 | 18 | 12 | 15 | 8 | 5 | 66 |
| 005C-0061 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

---

## Fully Ported (P) -- 62 functions

Functions with functionally equivalent JS implementations.

### Map Generation (block 0x00400000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 00408d33 | generate_world_map | engine/mapgen.js | generateMap() |
| 0040897f | mapgen_calc_fertility | engine/mapgen.js | calcFertility() |
| 0040a572 | place_continent | engine/mapgen.js | placeContinent() |
| 0040a763 | place_land_small | engine/mapgen.js | placeLandSmall() |
| 0040a892 | mark_land_3tiles | engine/mapgen.js | (inline) |
| 0040a8db | mark_land_1tile | engine/mapgen.js | (inline) |
| 0040a92f | place_land_large | engine/mapgen.js | placeLandLarge() |
| 0040aaa4 | place_land_island | engine/mapgen.js | placeLandIsland() |
| 0040ab0a | promote_mountain | engine/mapgen.js | (inline) |
| 0040ac5a | generate_rivers | engine/mapgen.js | generateRivers() |
| 0040bc10 | text_add_label_id | engine/mapgen.js | (inline) |

### City Data (block 0x00430000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 0043cab0 | get_civ_primary_color | engine/defs.js | CIV_COLORS |
| 0043cb30 | get_civ_secondary_color | engine/defs.js | CIV_COLORS |
| 0043cc7e | city_calc_population_points | engine/production.js | (inline formula) |
| 0043cce5 | civ_calc_total_population | engine/production.js | (inline sum) |
| 0043cda6 | format_population_string | engine/production.js | (inline format) |
| 0043ce5a | format_city_population_string | engine/production.js | (inline format) |
| 0043cf76 | find_city_at | engine/state.js | createAccessors() |
| 0043d20a | has_building | engine/ai/strategyai.js | hasBuilding() |
| 00440165 | calc_epoch | engine/defs.js | _getEra() equivalent |
| 0043d927 | create_new_city | engine/reducer.js | BUILD_CITY action |
| 0043d660 | rename_city | engine/reducer.js | (inline) |
| 0043d5b0 | find_city_name | engine/defs.js | CIV_CITY_NAMES |

### AI Strategy (block 0x004B0000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 004bc480 | ai_assess_military_posture | engine/ai/strategyai.js | assessMilitaryPosture() |
| 004bc8aa | ai_assess_city_defense | engine/ai/strategyai.js | assessCityDefense() |
| 004bcb9b | ai_assess_economy | engine/ai/strategyai.js | assessEconomy() |
| 004bcfcf | ai_assess_diplomacy | engine/ai/strategyai.js | assessDiplomacy() |
| 004bd2a3 | ai_assess_tax_rate | engine/ai/strategyai.js | assessTaxRate() |
| 004bd9f0 | has_tech | engine/ai/strategyai.js | hasTech() |
| 004bdaa5 | is_prereq_of | engine/ai/econai.js | isPrereqOf() |
| 004bdb2c | calc_tech_value | engine/ai/econai.js | calcTechValue() |
| 004be5ae | grant_advance | engine/research.js | grantAdvance() |
| 004c09b0 | ai_pick_research_goal | engine/ai/econai.js | chooseResearch() |

### Production / Happiness / Trade (block 0x004E0000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 004e9849 | calc_corruption_divisor | engine/defs.js | GOVT_CORRUPTION_DIVISOR |
| 004e989a | calc_corruption | engine/production.js | calcTradeCorruption() |
| 004ea031 | adjust_happy_unhappy | engine/happiness.js | adjust() inner function |
| 004ea1f6 | distribute_trade | engine/production.js | calcTradeDistribution() |
| 004ea8e4 | calc_happiness | engine/happiness.js | calcHappiness() |

### Wonder / Government / Diplomacy (blocks 0x00450000, 0x00550000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 00453da0 | is_wonder_obsolete | engine/ai/prodai.js | isWonderObsolete() |
| 00453e18 | get_wonder_effect | engine/ai/econai.js | (wonder check) |
| 00453e51 | check_wonder_city_alive | engine/ai/data.js | hasWonderEffect() |
| 0055c066 | set_government_type | engine/reducer.js | SET_GOVERNMENT |
| 0055c277 | check_govt_available | engine/ai/econai.js | canUseGovernment() |
| 0055f5a3 | ai_choose_government | engine/ai/econai.js | considerRevolution() |

### Combat / Unit Orders (block 0x00580000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 0058be56 | check_adjacent_city | engine/rules.js | validateAction(BUILD_CITY) |
| 005890xx | check_adjacent_water | engine/reducer.js | (inline check) |
| 00589xxx | caravan_wonder_help | engine/reducer.js | (inline) |

### Utility / Map Access (blocks 0x005A0000, 0x005B0000)

| Address | Name | JS File | JS Function |
|---------|------|---------|-------------|
| 005adfa0 | clamp_value | engine/ai/prodai.js | clamp() |
| 005ae006 | get_unit_type_stat | engine/ai/data.js | (lookup) |
| 005ae052 | wrap_x_coordinate | engine/utils.js | wrapGx() |
| 005ae296 | iso_distance_helper | engine/production.js | isoDistance() |
| 005ae31d | map_distance | engine/production.js | isoDistance() |
| 005b53b6 | count_units_by_role | engine/ai/unitai.js | countUnitsByRole() |
| 00597d6f | spaceship_ai_evaluate | engine/ai/prodai.js | evaluateSpaceshipProduction() |
| 005b2890 | get_unit_type_stats | engine/defs.js | UNIT_STATS |
| 005b8920 | get_tile_terrain | engine/state.js | (accessor) |
| 005b89bb | get_terrain_type | engine/state.js | getTerrain() |
| 005b8a00 | get_tile_improvements | engine/state.js | (accessor) |
| 005b9560 | get_map_width | engine/state.js | (accessor) |
| 005b9d20 | get_resource_at | engine/parser.js | (resource seed) |
| 005b9710 | get_visibility_bitmask | engine/visibility.js | getVisibility() |

---

## Partially Ported (PA) -- 100 functions

Functions where some logic exists in JS but significant gaps remain.

### Critical Gaps (PA functions with high impact)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 00538a29 | ai_unit_turn_master | engine/ai/unitai.js | Two-pass land/sea separation, 20-iteration safety valve, MP sync points |
| 00498e8b | ai_city_production | engine/ai/prodai.js | Full canBuild checks, building prerequisite validation, wonder competition |
| 00580341 | resolve_combat | engine/combat.js | Full combat execution loop; HP tracking during rounds; retreat logic |
| 0058f040 | process_goody_hut | engine/reducer.js | Some goody outcomes missing; technology grant; barbarian uprising |
| 0059062c | move_unit | engine/reducer.js | Encounter detection, treaty violations, goto cancellation, combat triggers |
| 004c2788 | calc_research_cost | engine/research.js | AI cost formula (14-difficulty), catch-up/penalty, world size, scenario multiplier |
| 0055cbd5 | ai_should_declare_war | engine/ai/diplomai.js | Full per-continent strength analysis; alliance chain evaluation |
| 0055d8d8 | process_diplomatic_contact | engine/ai/diplomai.js | Full negotiation protocol; tech exchange; alliance proposals |
| 005312e4 | ai_find_best_settle_dir | engine/ai/cityai.js | Binary-faithful core done; JS adds yield enhancements |
| 004e9c14 | calc_city_production | engine/production.js | Shield waste ported; missing despotism penalty details, fortress bonus |

### Movement / Map (PA)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 005b2d39 | validate_unit_stack | engine/state.js | Stack integrity checks, dead-unit pruning, cross-location detection |
| 005b2f90 | calc_movement_cost | engine/movement.js | Damage-based proportional reduction, COSMIC rounding, minimum floors |
| 005b4c63 | check_enemies_nearby | engine/ai/unitai.js | Full 2-ring scan; JS uses simplified version |
| 005b89e4 | is_city_at_tile | engine/ai/cityai.js | Inline checks; binary has dedicated function |
| 005b8c42 | get_tile_effective_owner | engine/ai/cityai.js | Full ownership calculation with visibility |
| 005b8ca6 | get_city_owner_at | engine/ai/cityai.js | Full lookup; JS simplified |
| 005b8d62 | get_unit_owner_at | engine/ai/cityai.js | Full lookup; JS simplified |

### Turn Processing (PA -- block 0x00480000)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 00481000 | calc_game_year | engine/year.js | Difficulty adjustment, scenario override |
| 00482100 | spawn_barbarians | engine/reducer.js | Era-based type selection, city raids, leader spawning |
| 00483200 | check_global_warming | engine/reducer.js | Hash-based tile selection, improvement stripping details |
| 00483800 | check_nuclear_winter | engine/reducer.js | Recycling center count, shield/production formula |
| 00484500 | reset_unit_movement | engine/reducer.js | Fortification decay, veteran fuel logic, spy expiration |
| 00485200 | process_end_of_turn | engine/reducer.js | Power graph, tech advance, attitude decay, random events |
| 00486100 | process_civ_turn | engine/reducer.js | AI tax/science rate logic, Alpha Centauri scoring |
| 00487500 | process_all_cities | engine/reducer.js | Trade route processing, AI diplomacy |
| 00488200 | heal_unit | engine/reducer.js | Domain-specific rates, building bonuses, fortress, veteran, naval penalty |
| 00489800 | check_game_end | engine/reducer.js | Year 2000 warning, year 2020 forced retirement, scenario end |

### Diplomacy (PA)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 0045705e | diplomacy_evaluation | engine/ai/diplomai.js | Full attitude scoring, tribute thresholds, tech desire |
| 00467af0 | should_declare_war | engine/ai/cityai.js | Full treaty/attitude evaluation |
| 00467825 | establish_ceasefire | engine/ai/diplomai.js | Full ceasefire protocol with treaty flags |
| 0055d1e2 | ai_tech_exchange | engine/ai/diplomai.js | Full tech/peace negotiation |
| 00560084 | ai_diplomacy_turn | engine/ai/diplomai.js | Full per-civ diplomacy processing |

### City Dialog Logic (PA -- block 0x00500000)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 00501819 | specialist_cycling | engine/reducer.js | Full cycling with validation |
| 005025D5 | worker_toggle | engine/reducer.js | Full toggle with auto-reassign |
| 00504C05 | food_storage_display | engine/production.js | Granary visualization details |
| 005055DD | buy_formula | engine/rules.js | Rush buy with wonder premium |
| 00505D3D | sell_formula | engine/reducer.js | Sell building validation |
| 005070E5 | happiness_display | engine/happiness.js | Display ordering details |
| 50A1D6 | production_change | engine/rules.js | Production penalty, wonder competition |

### AI Functions (PA -- blocks 0x00530000, 0x00540000)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 00531287 | ai_get_unit_role | engine/ai/unitai.js | Full role classification |
| 005351aa | ai_barbarian_unit_turn | engine/ai/barbarian.js | Full direction scoring; terrain-specific moves |
| 00536c4c | ai_find_nuke_target | engine/ai/unitai.js | Target prioritization |
| 00537331 | ai_naval_and_ranged_move | engine/ai/unitai.js | Naval bombardment, ranged unit AI |
| 00543b80 | ai_process_unit_automation | engine/ai/index.js | Two-pass land/sea, 20-iteration safety, MP sync |

### Trade / City Management (PA -- block 0x00440000)

| Address | Name | JS File | What's Missing |
|---------|------|---------|----------------|
| 00440750 | process_caravan_arrival | engine/reducer.js | Commodity matching, era bonus, tech discounts, food caravan |
| 00441b11 | change_city_production | engine/reducer.js | Wonder events, reassignment, free shields |

---

## Referenced Only (R) -- 43 functions

Binary functions mentioned in JS comments but whose logic is not ported.

| Address | Name | Referenced In | Context |
|---------|------|---------------|---------|
| 0040a824 | check_land_bounds | engine/mapgen.js | Wrapping map ocean seam logic |
| 0040ab41 | try_create_inland_sea | engine/mapgen.js | Smoothing pass comment |
| 0043d07a | find_nearest_city | engine/ai/prodai.js | City proximity scoring |
| 00467825 | establish_ceasefire | engine/ai/diplomai.js | First contact treaty |
| 00467904 | calc_diplomatic_score | engine/ai/unitai.js | Diplomatic score 0-200 |
| 00492c15 | ai_set_activity_flag | engine/ai/unitai.js | AI activity assignment |
| 00492e60 | check_rally_point_units | engine/ai/unitai.js | Rally point check |
| 0049301b | build_garrison_unit | engine/ai/unitai.js | Garrison production trigger |
| 004eb4a1 | recalc_city_all | engine/reducer.js | City recalculation orchestrator |
| 004eb4ed | calc_city_production_orchestrator | engine/reducer.js | Production orchestrator |
| 00531607 | ai_set_goto_order | engine/ai/unitai.js | Goto order assignment |
| 0055d685 | ai_join_war_request | engine/ai/diplomai.js | Third-party join-war |
| 00596b00 | spaceship_get_max_component | engine/ai/prodai.js | Fuel/propulsion caps |
| 005ae052 | wrap_x_coordinate | engine/mapgen.js | X wrapping in mapgen |
| 005b4b66 | check_enemy_on_continent | engine/ai/unitai.js | Continental enemy presence |
| 005b50ad | count_units_by_domain | engine/ai/unitai.js | Domain-filtered count |
| 005b6042 | disband_unit | engine/ai/unitai.js | AI unit disbanding |
| 005b8a81 | get_tile_continent | engine/ai/cityai.js | Continent ID lookup |
| 005b8ffa | check_goody_hut | engine/ai/unitai.js | Goody hut at tile |
| 005b94d5 | get_tile_flags | engine/ai/unitai.js | Tile flag inspection |
| 005b89bb | get_terrain_type | engine/state.js | Map accessor |
| 0053184d | ai_process_civ_turn | engine/ai/index.js | AI turn orchestrator |
| 00531210 | ai_set_active_civ | engine/ai/index.js | Active civ setup |
| 00531263 | map_coord_to_linear | engine/ai/index.js | Coordinate linearization |
| 00531567 | ai_cancel_goto_on_domain | engine/ai/unitai.js | Domain-based goto cancel |
| 00531653 | ai_set_goto_via_coast | engine/ai/unitai.js | Coastal goto order |
| 005369f3 | ai_alert_nearby_units | engine/ai/unitai.js | Alert nearby units |
| 00536bc9 | ai_calc_continent_city_weight | engine/ai/data.js | Continent city weighting |
| 0040bebe | handle_revolution | engine/reducer.js | SET_GOVERNMENT action |
| 0052ec47 | find_unit_by_alive_flag | engine/state.js | Unit lookup |
| 0052ed95 | find_city_by_id | engine/state.js | City lookup |
| 005890xx | claim_adjacent_ocean_tiles | engine/reducer.js | Ocean tile claiming after city founding |
| 005895xx | handle_caravan_arrival | engine/reducer.js | Trade route establishment |

---

## TODO High (TH) -- 67 functions

### City Processing (critical for turn simulation)

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 004ebbde | process_city_food | 004E | Growth, starvation, granary, famine |
| 004ec3fe | process_city_production | 004E | Building/unit/wonder completion |
| 004eef23 | process_unit_support_deficit | 004E | Forced disbanding when support > shields |
| 004ef578 | handle_city_disorder | 004E | Full disorder consequences |

### Build Prerequisites

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 004c02d8 | can_build_wonder | 004C | Tech, one-per-game, obsolescence check |
| 004c039f | can_build_improvement | 004C | Building tech prereq + city state |

### Combat / City Capture

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 0057a040 | capture_city | 0057 | Main city capture handler |
| 0057b1d2 | civil_war_split | 0057 | Civil war triggered by capital capture |
| 0057d9e4 | calc_defense_strength | 0057 | Full defense with all terrain/building modifiers |
| 0057dc2a | find_best_defender | 0057 | Best defender selection algorithm |
| 0057e9c6 | nuke_attack | 0057 | Nuclear attack resolution |
| 00580341 | resolve_combat_full | 0058 | Full multi-round combat execution |
| 00589xxx | caravan_trade_full | 0058 | Full caravan trade revenue |

### Espionage

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 004c1c2a | handle_incident_terror | 004C | Terror incident consequences |
| 004c4c55 | execute_civil_war | 004C | Civil war city/unit splitting |
| 004c4f7a | calc_city_revolt_distance | 004C | Distance factor for bribery |

### AI

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 00490xxx | ai_goal_management (x3) | 0049 | Strategic goal assignment per continent |
| 004be0e7 | continent_assignment | 004B | Body ID assignment (needed for AI) |
| 004be300 | can_build_check | 004B | Full build prerequisite validation |
| 004bfxxx | compute_tech_path (x2) | 004B | Tech dependency path computation |

### Diplomacy

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 004575xx | declare_war | 0045 | War declaration with cascading effects |
| 004577xx | alliance_wars | 0045 | Alliance chain war declarations |
| 004579xx | form_alliance | 0045 | Alliance formation protocol |
| 00457bxx | make_ceasefire | 0045 | Formal ceasefire agreement |
| 00457dxx | make_peace | 0045 | Peace treaty establishment |
| 00457fxx | tech_exchange | 0045 | Technology exchange protocol |

### Map / Government

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 0040c480 | taxrate_recalc_totals | 0040 | Empire-wide gold/science/maintenance |
| 00488xxx | power_graph_update | 0048 | Power graph data accumulation |

### Pathfinding

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 004a8xxx | pathfinding (x10) | 004A | Binary pathfinding algorithm (A* variant) |
| 005a0xxx | PBEM_verify | 005A | Play-by-email verification |

### Unit Management (block 0x005B)

| Address | Name | Block | Description |
|---------|------|-------|-------------|
| 005b0xxx-005b3xxx | unit_mgmt (x15) | 005B | Unit creation, deletion, transfer, upgrade, support |

---

## TODO Medium (TM) -- 84 functions

### Key Groups

| Category | Count | Key Functions |
|----------|-------|---------------|
| City management | 10 | acquire_wonder, evaluate_city_tiles, calc_food_box_size, calc_shields_per_row, check_unit_support, calc_trade_route_income, assign_caravan_commodity, process_city_science, process_city_pollution |
| Combat | 5 | treaty_violation, attack_allowed, tech_theft, unit_kill, check_promotion |
| Diplomacy | 17 | emissary, gift menu, favor menu, war weariness, ally help, negotiate, reset state (blocks 0x0045, 0x0046, 0x004D) |
| AI production | 2 | ai_goal_management helpers |
| Spaceship | 8 | spaceship_* (block 0x0059) |
| Map/tile | 8 | unit_mgmt helpers (block 0x005B) |
| Rules/init | 12 | rule parsing, init helpers (block 0x0041) |
| Turn processing | 4 | tech processing, trade routes (block 0x0048) |
| Civ naming | 4 | civ name generation/lookup (block 0x0049) |
| Pathfinding helpers | 6 | map utility functions (block 0x005A) |
| Espionage | 3 | spy actions (block 0x004C) |
| Kill/retire civ | 1 | civ elimination (block 0x004E) |
| Government | 4 | government change effects (block 0x004D) |

---

## TODO Low (TL) -- 96 functions

### Key Groups

| Category | Count | Key Functions |
|----------|-------|---------------|
| City tiles | 7 | auto_irrigation, road_trade, clear_worked_tiles, adjust_specialists, sync_workers, food_box_difficulty, classify_production |
| Espionage | 4 | espionage_discovery, airlift, paradrop, incident_permission |
| Combat | 4 | stack_wipe, scramble_defenders, city_value, central_city |
| Movement | 1 | toggle_unit_movement_doubling |
| Demographics | 1 | demographics calculation |
| Save/load | 13 | viewport state packing (block 0x0047) |
| Diplomacy | 6 | sell_tech, calc_gold_attitude, greeting, alliance subcommands |
| Map editors | 28 | scenario editor functions (block 0x004A) |
| UI rules parsing | 20 | text file parsing, rules editor (block 0x004A) |
| Spaceship display | 4 | spaceship rendering (block 0x0059) |
| Wonder display | 11 | wonder movies, event dialogs (block 0x004F) |
| Unit management | 5 | low-priority unit helpers (block 0x005B) |

---

## Coverage by Engine Subsystem

| Subsystem | Total GL+AI | P+PA | Gap (TH+TM+TL) | % Covered |
|-----------|-------------|------|-----------------|-----------|
| Map Generation | 17 | 17 | 0 | 100% |
| AI Strategy | 7 | 7 | 0 | 100% |
| AI Economy | 10 | 9 | 1 | 90% |
| Happiness | 3 | 3 | 0 | 100% |
| Trade Corruption | 3 | 3 | 0 | 100% |
| Trade Distribution | 2 | 2 | 0 | 100% |
| AI Diplomacy | 7 | 6 | 1 | 86% |
| AI Unit Control | 14 | 12 | 2 | 86% |
| AI Production | 10 | 5 | 5 | 50% |
| AI Barbarian | 1 | 1 | 0 | 100% |
| Wonder Queries | 4 | 4 | 0 | 100% |
| Government | 4 | 3 | 1 | 75% |
| Research | 5 | 3 | 2 | 60% |
| Combat | 9 | 2 | 7 | 22% |
| City Processing | 12 | 4 | 8 | 33% |
| Unit Management | 38 | 16 | 22 | 42% |
| Movement | 6 | 3 | 3 | 50% |
| Visibility | 8 | 4 | 4 | 50% |
| Map Access | 17 | 12 | 5 | 71% |
| City Capture | 5 | 0 | 5 | 0% |
| Diplomacy (GL) | 34 | 8 | 26 | 24% |
| Espionage | 7 | 0 | 7 | 0% |
| Pathfinding (GL) | 12 | 0 | 12 | 0% |
| Turn Processing | 5 | 4 | 1 | 80% |
| Spaceship | 16 | 3 | 13 | 19% |

### Top Priorities for Next Porting Round

1. **City Processing** (33% covered) -- `process_city_food`, `process_city_production`, `process_unit_support_deficit`, `handle_city_disorder` are all TH and essential for turn simulation
2. **Combat** (22% covered) -- `calc_defense_strength`, `find_best_defender`, `resolve_combat` full loop
3. **City Capture** (0% covered) -- `capture_city`, `civil_war_split`, `transfer_ownership`
4. **Espionage** (0% covered) -- `execute_civil_war`, `handle_incident_terror`
5. **Build Prerequisites** -- `can_build_wonder`, `can_build_improvement` needed for production AI
