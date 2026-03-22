# Cross Reference -- JS <-> Binary Function Mappings

Generated from Phase 4 cross-reference audit. Sources: 34 pseudocode block files,
26 JS engine files, PREP_CONTEXT.md (74 unique FUN_ references).

---

## Binary -> JS (functions referenced or ported)

Sorted by address. Status: P=ported, PA=partial, R=referenced only.

| FUN_ Address | Binary Name | JS File | JS Function | Status | Notes |
|-------------|-------------|---------|-------------|--------|-------|
| 004087c0 | is_tile_valid | engine/ai/cityai.js | (inline bounds checks) | PA | Concept ported, no dedicated function |
| 00408d33 | generate_world_map | engine/mapgen.js | generateMap() | P | All 9 phases faithfully reproduced |
| 0040897f | mapgen_calc_fertility | engine/mapgen.js | calcFertility() | P | Same city-radius scan and yield scoring |
| 0040a572 | place_continent | engine/mapgen.js | placeContinent() | P | Random-walk continent placement |
| 0040a763 | place_land_small | engine/mapgen.js | placeLandSmall() | P | Inline in mapgen |
| 0040a824 | check_land_bounds | engine/mapgen.js | (inline) | R | Referenced in wrapping logic comments |
| 0040a892 | mark_land_3tiles | engine/mapgen.js | (inline) | P | 3-tile triangular blob |
| 0040a8db | mark_land_1tile | engine/mapgen.js | (inline) | P | Single tile marking with x parity snap |
| 0040a92f | place_land_large | engine/mapgen.js | placeLandLarge() | P | Up to 48 tiles |
| 0040aaa4 | place_land_island | engine/mapgen.js | placeLandIsland() | P | Small islands 1-16 tiles |
| 0040ab41 | try_create_inland_sea | engine/mapgen.js | (inline) | R | Referenced in smoothing pass |
| 0040ac5a | generate_rivers | engine/mapgen.js | generateRivers() | P | Random-walk river carving |
| 0040bcb0 | grassland_has_shield | engine/production.js | calcTileShields() | PA | Formula ported but not as named function |
| 0040bdac | balance_tax_rates | engine/ai/econai.js | balanceRates() | PA | AI version; no UI lock semantics |
| 0043cc00 | city_set_civ_knowledge | engine/visibility.js | (inline) | PA | Visibility tracking exists, different model |
| 0043cc7e | city_calc_population_points | engine/production.js | (inline) | P | Triangular number formula |
| 0043cce5 | civ_calc_total_population | engine/production.js | (inline) | P | Sum across owned cities |
| 0043cda6 | format_population_string | engine/production.js | (inline) | P | Population formatting |
| 0043ce5a | format_city_population_string | engine/production.js | (inline) | P | Single city population format |
| 0043cf76 | find_city_at | engine/state.js | createAccessors() | P | Via accessor functions |
| 0043d07a | find_nearest_city | engine/ai/prodai.js | (referenced) | R | Referenced at line 269 |
| 0043d20a | has_building | engine/ai/strategyai.js | hasBuilding() | P | Bitmask check |
| 0043d400 | calc_supply_demand | (not in engine) | -- | R | Documented in MEMORY.md; not engine-ported |
| 00440750 | process_caravan_arrival | engine/reducer.js | ESTABLISH_TRADE action | PA | Missing commodity matching, era bonus, tech discounts |
| 00441b11 | change_city_production | engine/reducer.js | CHANGE_PRODUCTION action | PA | Missing wonder events, reassignment |
| 00453da0 | is_wonder_obsolete | engine/ai/prodai.js | isWonderObsolete() | P | Line 2017 |
| 00453e18 | get_wonder_effect | engine/ai/econai.js | (port) | P | Wonder effect check |
| 00453e51 | check_wonder_city_alive | engine/ai/data.js, engine/ai/econai.js | hasWonderEffect() | P | Checks wonder city exists and not destroyed |
| 0045705e | diplomacy_evaluation | engine/ai/diplomai.js | shouldDemandTribute(), evaluatePeaceOffer() | PA | Tribute/attitude/tech desire; complex evaluation |
| 00467825 | establish_ceasefire | engine/ai/diplomai.js | (referenced) | R | First contact ceasefire |
| 00467904 | calc_diplomatic_score | engine/ai/unitai.js | (referenced) | R | Diplomatic score 0-200 |
| 00467af0 | should_declare_war | engine/ai/cityai.js | shouldDeclareWar() | PA | Simplified port |
| 00492c15 | ai_set_activity_flag | engine/ai/unitai.js | (referenced) | R | AI unit activity assignment |
| 00492e60 | check_rally_point_units | engine/ai/unitai.js | (referenced) | R | Rally point unit check |
| 0049301b | build_garrison_unit | engine/ai/unitai.js | (referenced) | R | Garrison unit production |
| 00498e8b | ai_city_production | engine/ai/prodai.js | generateProductionActions() | PA | Major port; significant deviations remain |
| 004bc480 | ai_assess_military_posture | engine/ai/strategyai.js | assessMilitaryPosture() | P | Returns 1-7 |
| 004bc8aa | ai_assess_city_defense | engine/ai/strategyai.js | assessCityDefense() | P | Returns 1-7 |
| 004bcb9b | ai_assess_economy | engine/ai/strategyai.js | assessEconomy() | P | Returns 1-7 |
| 004bcfcf | ai_assess_diplomacy | engine/ai/strategyai.js | assessDiplomacy() | P | Returns 1-7 |
| 004bd2a3 | ai_assess_tax_rate | engine/ai/strategyai.js, engine/ai/econai.js | assessTaxRate(), balanceRates() | P | Returns 1-6; rate-setting logic |
| 004bd9f0 | has_tech | engine/ai/strategyai.js, engine/ai/econai.js | hasTech() | P | Simplified -- no bitmask walk needed |
| 004bdaa5 | is_prereq_of | engine/ai/econai.js | isPrereqOf() | P | Recursive prereq walk |
| 004bdb2c | calc_tech_value | engine/ai/econai.js | calcTechValue() | P | AI weighted tech scoring |
| 004bfdbe | can_research | engine/ai/econai.js | (inline in chooseResearch) | PA | Immediate availability check |
| 004c09b0 | ai_pick_research_goal | engine/ai/econai.js | chooseResearch() / pickResearchGoal() | P | Weighted random selection |
| 004c2788 | calc_research_cost | engine/research.js | calcResearchCost() | PA | Human formula only; missing AI formula, catch-up |
| 004e7549 | set_worker_tile_status | engine/production.js | (different model) | PA | JS uses workers array not bitmask |
| 004e75a6 | get_worker_tile_status | engine/production.js | (different model) | PA | JS uses workers array not bitmask |
| 004e75ea | count_worker_tiles_with_status | engine/production.js | (different model) | PA | JS uses workers array not bitmask |
| 004e78ce | is_tile_worked | engine/production.js | (different model) | PA | JS uses workers array not bitmask |
| 004e790c | set_tile_worked | engine/production.js | (different model) | PA | JS uses workers array not bitmask |
| 004e7967 | calc_capital_distance_and_corruption | engine/production.js | calcTradeCorruption() | PA | Distance formula ported; some details differ |
| 004e868f | calc_tile_resource | engine/production.js | calcTileFood/Shields/Trade | PA | Most cases covered |
| 004e8e4d | calc_tile_all_resources | engine/production.js | getTileYields() | PA | Covers most cases |
| 004e9849 | calc_corruption_divisor | engine/defs.js, engine/production.js | GOVT_CORRUPTION_DIVISOR | P | Lookup table |
| 004e989a | calc_corruption | engine/production.js | calcTradeCorruption() | P | Distance-to-capital formula |
| 004e9c14 | calc_city_production | engine/production.js | calcShieldProduction(), calcShieldWaste() | PA | Shield waste ported; missing some details |
| 004ea031 | adjust_happy_unhappy | engine/happiness.js | adjust() inner function | P | Lines 46-59 |
| 004ea1f6 | distribute_trade | engine/production.js | calcTradeDistribution() | P | Luxury/tax/science split |
| 004ea8e4 | calc_happiness | engine/happiness.js | calcHappiness() | P | All 7 steps faithfully ported |
| 004eb4a1 | recalc_city_all | engine/reducer.js | (END_TURN city processing) | R | Orchestrator; individual parts ported |
| 004eb4ed | calc_city_production_orchestrator | engine/reducer.js | (END_TURN city processing) | R | Referenced in strategyai.js |
| 004f00f0 | calc_city_trade_network | engine/ai/strategyai.js | (simplified port) | PA | Simplified trade network calculation |
| 005312e4 | ai_find_best_settle_dir | engine/ai/cityai.js | evaluateSettleSite() | PA | Binary-faithful core + JS enhancements |
| 00531607 | ai_set_goto_order | engine/ai/unitai.js | (referenced) | R | Goto order assignment |
| 005351aa | ai_barbarian_unit_turn | engine/ai/barbarian.js | generateBarbarianActions() | PA | Barbarian AI master function |
| 00538a29 | ai_unit_turn_master | engine/ai/unitai.js | generateMilitaryActions() | PA | Extensive port; roles 1-7 |
| 0055c066 | set_government_type | engine/reducer.js | SET_GOVERNMENT action | P | Government change |
| 0055c277 | check_govt_available | engine/ai/econai.js | canUseGovernment() | P | Tech prereq OR Statue of Liberty |
| 0055cbd5 | ai_should_declare_war | engine/ai/diplomai.js | shouldDeclareWar() | PA | Per-continent strength comparison |
| 0055d1e2 | ai_tech_exchange | engine/ai/diplomai.js | (partial) | PA | Tech/peace negotiation |
| 0055d685 | ai_join_war_request | engine/ai/diplomai.js | (referenced) | R | Third-party join-war requests |
| 0055d8d8 | process_diplomatic_contact | engine/ai/diplomai.js | generateDiplomacyActions() | PA | Main diplomacy orchestrator |
| 0055f5a3 | ai_choose_government | engine/ai/econai.js | considerRevolution() | P | Government selection AI |
| 00596b00 | spaceship_get_max_component | engine/ai/prodai.js | (referenced) | R | Max component for fuel/propulsion |
| 00597d6f | spaceship_ai_evaluate | engine/ai/prodai.js | evaluateSpaceshipProduction() | P | Spaceship component selection AI |
| 00598197 | spaceship_human_build | engine/ai/prodai.js | (partial) | PA | Component category selection |
| 00598d45 | spaceship_ai_should_start | engine/ai/unitai.js | hasEmbassy() approx | PA | Embassy approximation |
| 0057e6e2 | calc_effective_defense | engine/reducer.js, engine/ai/unitai.js | calcEffectiveDefense() | PA | Defender selection; missing some modifiers |
| 00580341 | resolve_combat | engine/combat.js | resolveCombat() | PA | Special interactions ported; missing full execution |
| 0058be56 | check_adjacent_city | engine/rules.js | validateAction(BUILD_CITY) | P | Adjacent-city check with inner-ring logic |
| 0058f040 | process_goody_hut | engine/reducer.js | resolveGoodyHut() | PA | Most outcomes ported; some missing |
| 0059062c | move_unit | engine/reducer.js | MOVE_UNIT action | PA | Probabilistic movement; missing many edge cases |
| 005adfa0 | clamp_value | engine/ai/prodai.js, engine/ai/unitai.js | clamp() | P | Min/max clamp utility |
| 005ae006 | get_unit_type_stat | engine/ai/data.js, engine/ai/strategyai.js | (ported) | P | Unit type stat lookup |
| 005ae052 | wrap_x_coordinate | engine/mapgen.js | (inline) | R | X coordinate wrapping |
| 005ae296 | iso_distance_helper | engine/production.js | isoDistance() | P | Isometric distance component |
| 005ae31d | map_distance | engine/production.js, engine/ai/unitai.js | isoDistance() | P | Full wrap-aware distance |
| 005b4b66 | check_enemy_on_continent | engine/ai/unitai.js | hasEnemyOnContinent() | PA | Approximate |
| 005b4c63 | check_enemies_nearby | engine/ai/unitai.js | areEnemiesNearby() | PA | Simplified equivalent |
| 005b50ad | count_units_by_domain | engine/ai/unitai.js | (referenced) | R | Domain-filtered unit count |
| 005b53b6 | count_units_by_role | engine/ai/unitai.js, engine/ai/prodai.js | countUnitsByRole() | P | Role-filtered unit count in stack |
| 005b6042 | disband_unit | engine/ai/unitai.js | (referenced) | R | Unit disband |
| 005b89e4 | is_city_at_tile | engine/ai/cityai.js, engine/ai/unitai.js | (inline) | PA | City-at-tile check |
| 005b8a81 | get_tile_continent | engine/ai/cityai.js | (referenced) | R | Continent ID lookup |
| 005b8c42 | get_tile_effective_owner | engine/ai/cityai.js | getTileEffectiveOwner() | PA | Effective owner lookup |
| 005b8ca6 | get_city_owner_at | engine/ai/cityai.js, engine/ai/unitai.js | getCityOwnerAt() | PA | City owner at coordinate |
| 005b8d62 | get_unit_owner_at | engine/ai/cityai.js, engine/ai/unitai.js | getUnitOwnerAt() | PA | Unit owner at coordinate |
| 005b8ffa | check_goody_hut | engine/ai/unitai.js | (referenced) | R | Goody hut presence check |
| 005b94d5 | get_tile_flags | engine/ai/unitai.js | (referenced) | R | Tile flag check |

---

## JS -> Binary (JS functions and their binary origins)

Sorted by JS file, then function name. Coverage: P=full port, PA=partial port, R=reference only, N/A=no binary origin.

| JS Function | JS File | FUN_ Address(es) | Binary Name | Coverage |
|------------|---------|-------------------|-------------|----------|
| applyAction | engine/reducer.js | multiple | (orchestrator) | N/A -- JS-native dispatch |
| assessCityDefense | engine/ai/strategyai.js | 004bc8aa | ai_assess_city_defense | P |
| assessDiplomacy | engine/ai/strategyai.js | 004bcfcf | ai_assess_diplomacy | P |
| assessEconomy | engine/ai/strategyai.js | 004bcb9b | ai_assess_economy | P |
| assessMilitaryPosture | engine/ai/strategyai.js | 004bc480 | ai_assess_military_posture | P |
| assessStrategy | engine/ai/strategyai.js | (combines 5 FUNs) | all 5 assess_* | P |
| assessTaxRate | engine/ai/strategyai.js | 004bd2a3 | ai_assess_tax_rate | P |
| balanceRates | engine/ai/econai.js | 004bd2a3, 0040bdac | ai_assess_tax_rate + balance_tax_rates | PA -- missing UI lock semantics |
| calcBribeCost | engine/rules.js | -- | -- | N/A -- from documentation |
| calcBuildingMaintenance | engine/production.js | -- | -- | N/A -- from game rules |
| calcCityTrade | engine/production.js | 004ea1f6 | distribute_trade | P |
| calcFoodSurplus | engine/production.js | 004e9c14 (partial) | calc_city_production | PA -- missing despotism penalty details |
| calcGrossFood | engine/production.js | 004e868f, 004e8e4d | calc_tile_resource, calc_tile_all_resources | PA |
| calcGrossShields | engine/production.js | 004e868f | calc_tile_resource | PA |
| calcGrossTrade | engine/production.js | 004e868f | calc_tile_resource | PA |
| calcHappiness | engine/happiness.js | 004ea8e4 | calc_happiness | P -- all 7 steps |
| calcInciteCost | engine/rules.js | -- | -- | N/A -- from documentation |
| calcResearchCost | engine/research.js | 004c2788 | calc_research_cost | PA -- human formula only |
| calcRushBuyCost | engine/happiness.js | -- | -- | N/A -- from documentation |
| calcSettlerFoodSupport | engine/production.js | -- | -- | N/A -- from game rules |
| calcShieldProduction | engine/production.js | 004e9c14 | calc_city_production | PA |
| calcShieldWaste | engine/production.js | 004e9c14 | calc_city_production | PA |
| calcTechValue | engine/ai/econai.js | 004bdb2c | calc_tech_value | P |
| calcTileFood | engine/production.js | 004e868f | calc_tile_resource | PA |
| calcTileShields | engine/production.js | 004e868f, 0040bcb0 | calc_tile_resource, grassland_has_shield | PA |
| calcTileTrade | engine/production.js | 004e868f | calc_tile_resource | PA |
| calcTradeCorruption | engine/production.js | 004e989a | calc_corruption | P |
| calcTradeDistribution | engine/production.js | 004ea1f6 | distribute_trade | P |
| calcUnitShieldSupport | engine/production.js | -- | -- | N/A -- from game rules |
| chooseResearch | engine/ai/econai.js | 004c09b0 | ai_pick_research_goal | P |
| cityHasActiveWonder | engine/utils.js | 00453e51 | check_wonder_city_alive | P |
| cityHasBuilding | engine/utils.js | 0043d20a | has_building | P |
| cityHasWonder | engine/utils.js | -- | -- | N/A -- simple lookup |
| civHasWonder | engine/utils.js | -- | -- | N/A -- simple scan |
| computeAiData | engine/ai/data.js | 005ae006 | get_unit_type_stat | P |
| computeLOS | engine/visibility.js | -- | -- | N/A -- custom JS implementation |
| considerRevolution | engine/ai/econai.js | 0055f5a3 | ai_choose_government | P |
| createAccessors | engine/state.js | 005b89bb+ | multiple map accessors | PA -- factory pattern, different model |
| filterStateForCiv | engine/visibility.js | -- | -- | N/A -- multiplayer fog |
| findPath | engine/pathfinding.js | -- | -- | N/A -- A* (binary uses different algo) |
| foodToGrow | engine/production.js | 004e7eb1 | calc_food_box_size | PA -- simplified |
| generateBarbarianActions | engine/ai/barbarian.js | 005351aa | ai_barbarian_unit_turn | PA |
| generateCleanupActions | engine/ai/unitai.js | 00538a29 (partial) | ai_unit_turn_master | PA |
| generateDiplomacyActions | engine/ai/diplomai.js | 0055d8d8, 0055cbd5, 0045705e | process_diplomatic_contact + helpers | PA |
| generateEconActions | engine/ai/econai.js | 004bd2a3, 0055f5a3 | assess_tax_rate + choose_government | P |
| generateMap | engine/mapgen.js | 00408d33 | generate_world_map | P |
| generateMilitaryActions | engine/ai/unitai.js | 00538a29 | ai_unit_turn_master | PA |
| generateProductionActions | engine/ai/prodai.js | 00498e8b | ai_city_production | PA |
| generateRushBuyActions | engine/ai/prodai.js | -- | -- | N/A -- custom logic |
| generateSettlerActions | engine/ai/cityai.js | 005312e4 | ai_find_best_settle_dir | PA |
| getAvailableResearch | engine/research.js | 004bfdbe | can_research | PA |
| getDirection | engine/movement.js | -- | -- | N/A -- coordinate math |
| getGameYear | engine/year.js | (block 00480000) | calc_game_year | PA -- missing difficulty/scenario |
| getGameYearFromMap | engine/year.js | -- | -- | N/A -- from save data |
| getGovernment | engine/utils.js | -- | -- | N/A -- simple lookup |
| getProductionCost | engine/production.js | -- | -- | N/A -- from rules data |
| getTileYields | engine/production.js | 004e8e4d | calc_tile_all_resources | PA |
| getValidActions | engine/rules.js | -- | -- | N/A -- custom validation |
| grantAdvance | engine/research.js | 004be5ae | grant_advance | PA -- tech bitmask only |
| hasWonderEffect | engine/ai/data.js | 00453e51 | check_wonder_city_alive | P |
| improvementFromByte | engine/defs.js | -- | -- | N/A -- data conversion |
| initFromSav | engine/init.js | -- | -- | N/A -- parser integration |
| initNewGame | engine/init.js | -- | -- | N/A -- new game setup |
| initialStateFromSav | engine/state.js | -- | -- | N/A -- parser integration |
| isZOCBlocked | engine/movement.js | (005b block) | zoc_check | PA -- simplified |
| moveCost | engine/movement.js | 005b (movement fns) | movement cost calc | PA -- missing damage reduction |
| reconstructMapData | engine/state.js | -- | -- | N/A -- client deserialization |
| resolveCombat | engine/combat.js | 00580341 | resolve_combat | PA -- special interactions ported |
| resolveDirection | engine/movement.js | -- | -- | N/A -- coordinate math |
| runAiTurn | engine/ai/index.js | 0053184d | ai_process_civ_turn | PA -- different dispatch model |
| tileFromBytes | engine/state.js | -- | -- | N/A -- data conversion |
| tileToBytes | engine/state.js | -- | -- | N/A -- data conversion |
| updateVisibility | engine/visibility.js | 00427xxx | reveal_tiles_around | PA |
| validateAction | engine/rules.js | 0058be56+ | various validation | PA |
| wonderObsolete | engine/utils.js | 00453da0 | is_wonder_obsolete | P |
| wrapGx | engine/utils.js | 005ae052 | wrap_x_coordinate | P |

---

## JS Engine Functions Without Binary Mapping

Functions written from scratch for the multiplayer web implementation, with no binary
Civ2 counterpart.

| JS Function | JS File | Purpose |
|------------|---------|---------|
| computeLOS | engine/visibility.js | Line-of-sight computation (unit radius 1, city radius 2) |
| filterStateForCiv | engine/visibility.js | Multiplayer fog: filter state per player |
| findPath | engine/pathfinding.js | A* pathfinding (binary uses different algorithm) |
| createAccessors | engine/state.js | Factory for map/unit/city accessors from parsed data |
| reconstructMapData | engine/state.js | Client-side state reconstruction from server messages |
| tileFromBytes / tileToBytes | engine/state.js | Wire format conversion for multiplayer |
| initialStateFromSav | engine/state.js | Bridge from parser output to game state |
| initFromSav / initNewGame | engine/init.js | Game initialization (two start paths) |
| getDirection / resolveDirection | engine/movement.js | Direction resolution from dx/dy |
| getValidActions | engine/rules.js | Multiplayer action validation |
| calcBribeCost / calcInciteCost | engine/rules.js | From documentation, not decompiled |
| calcRushBuyCost | engine/happiness.js | From documentation |
| calcBuildingMaintenance | engine/production.js | From game rules |
| calcSettlerFoodSupport | engine/production.js | From game rules |
| calcUnitShieldSupport | engine/production.js | From game rules |
| getProductionCost | engine/production.js | From rules data |
| improvementFromByte | engine/defs.js | Data format conversion |
| generateRushBuyActions | engine/ai/prodai.js | Custom AI logic |
| generateCleanupActions | engine/ai/unitai.js | Cleanup pass after main AI |

---

## Binary Game Logic Without JS Equivalent

Key GL/AI functions with no JS counterpart. Sorted by priority.

### HIGH Priority

| Address | Binary Name | Category | Gap Description |
|---------|-------------|----------|-----------------|
| 004ebbde | process_city_food | GL | City food processing (growth/starvation/granary) |
| 004ec3fe | process_city_production | GL | Building/unit/wonder completion; overflow shields |
| 004eef23 | process_unit_support_deficit | GL | Unit support exceeds shields: forced disbanding |
| 004ef578 | handle_city_disorder | GL | Full disorder consequences (no production, etc.) |
| 004c02d8 | can_build_wonder | GL.build_prereq | Wonder prereq validation (tech, one-per-game, obsolescence) |
| 004c039f | can_build_improvement | GL.build_prereq | Building prereq validation |
| 004c1c2a | handle_incident_terror | GL.espionage | Terror incident consequences |
| 004c4c55 | execute_civil_war | GL.espionage | Civil war execution (city/unit splitting) |
| 004c4f7a | calc_city_revolt_distance | GL.bribery | Distance factor for city revolt cost |
| 0057a040 | capture_city | GL.city_capture | Main city capture handler |
| 0057b1d2 | civil_war_split | GL.city_capture | Civil war triggered by capital capture |
| 0057d9e4 | calc_defense_strength | GL.combat | Full defense strength with all modifiers |
| 0057dc2a | find_best_defender | GL.combat | Best defender in stack selection |
| 0057e9c6 | nuke_attack | GL.nuclear | Nuclear attack resolution |
| 004be0e7 | continent_assignment | GL.Map | Body ID assignment for new maps |
| 0040c480 | taxrate_recalc_totals | GL.government | Empire-wide gold/science/maintenance totals |

### MEDIUM Priority

| Address | Binary Name | Category | Gap Description |
|---------|-------------|----------|-----------------|
| 004e1763 | kill_or_retire_civ | GL | Civ elimination/retirement |
| 004e7270 | acquire_wonder | GL | Wonder acquisition (capture/build) |
| 004e7641 | evaluate_city_tiles | GL | Auto-assign optimal worker tiles |
| 004e7d7f | check_unit_support | GL | Unit support cost calculation |
| 004e7eb1 | calc_food_box_size | GL | Food box size with granary/wonder |
| 004e80b1 | calc_shields_per_row | GL | Shield display row size |
| 004e8f42 | assign_worker_tiles | AI | AI worker tile assignment |
| 004eb327 | calc_trade_route_income | GL | Trade route gold/science income |
| 004ec1c6 | assign_caravan_commodity | GL | Caravan commodity assignment |
| 004efbc6 | process_city_science | GL | Science beaker accumulation and tech completion |
| 004efd44 | process_city_pollution_and_meltdown | GL | Pollution/meltdown per city |
| 0057a7ab | transfer_city_ownership | GL.city_capture | Transfer ownership of captured city |
| 0057e35f | kill_unit | GL.combat | Unit death with cascading effects |
| 0057e509 | check_unit_promotion | GL.combat | Veteran promotion on combat win |
| 0057e7b6 | calc_unit_hit_points | GL.combat | HP with building/wonder bonuses |
| 00440453 | establish_trade_route | GL.trade | Route replacement logic |
| 004c1f5c | spy_diplomat_action | GL.espionage | Diplomat/spy action dispatch |
| 004c2300 | spy_sabotage_unit | GL.espionage | Sabotage unit action |
| 004c26c9 | ai_find_nearest_city_or_transport | AI.pathfinding | Nearest reachable city/transport |

### LOW Priority

| Address | Binary Name | Category | Gap Description |
|---------|-------------|----------|-----------------|
| 004e1314 | toggle_unit_movement_doubling | GL | Movement doubling toggle (wonder/tech) |
| 004e7458 | classify_production_type | GL | Classify item as unit/building/wonder |
| 004e7492 | init_city_production_globals | GL | Initialize production globals |
| 004e74df | calc_food_box_with_difficulty | GL | Food box adjusted for difficulty |
| 004e8c8c | check_auto_irrigation_trigger | GL | Auto-irrigation improvement trigger |
| 004e8db5 | check_road_trade_trigger | GL | Road trade bonus trigger |
| 004e8ecf | clear_and_check_worked_tiles | GL | Clear/validate worked tile assignments |
| 004e9719 | adjust_specialist_count | GL | Adjust specialist count constraints |
| 004e97ae | sync_worker_tile_status | GL | Sync worker/specialist status |
| 004ec312 | handle_espionage_discovery | GL | Espionage discovery consequences |
| 0057e04c | stack_wipe | GL.combat | Wipe entire unit stack |
| 0057de0f | scramble_defenders | GL.nuclear | Scramble SDI defenders vs nuke |
| 0057c78a | find_central_city | GL.city_capture | Find geographic center city |
| 0057cf1e | calc_city_value | GL.diplomacy | City strategic value |
| 004c4862 | execute_airlift | GL.transport | Airlift execution |
| 004c4b7a | execute_paradrop | GL.transport | Paradrop execution |
| 004c44e4 | check_incident_permission | GL.espionage | Incident permission check |
