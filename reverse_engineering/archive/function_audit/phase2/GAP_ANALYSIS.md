# Gap Analysis — Unported Game Logic

## Executive Summary

| Metric | Count |
|--------|-------|
| Total decompiled functions (all 34 blocks) | ~2,573 |
| Skip / Not-Needed (SK+NN, UI/FW/RN) | ~1,976 |
| **Game logic + AI functions (GL.* + AI.*)** | **~597** |
| Fully ported (P) | 83 |
| Partially ported (PA) | 158 |
| Not yet ported (TH+TM+TL+R) | 356 |
| **Estimated porting coverage** | **~28% (P+PA weighted)** |

Of the 597 game logic / AI functions identified across 27 block files, 83 are fully ported and 158 are partially ported. The remaining 356 are referenced-only or unported entirely. Weighting partial ports at 50%, effective coverage is approximately 28%.

**Critical gaps**: Turn processing (city food/production/disorder), full combat resolution, pathfinding, city capture, diplomacy transactions, spaceship, events system, and the complete AI unit master function.

---

## Priority 1: High Priority Gaps (TH)

### 1.1 Combat System

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0057e33a` | `calc_unit_defense_strength` | 931b | 00570000 | Full defense calculation with terrain, fortification, city walls, veteran, wonder bonuses. JS combat.js has simplified version |
| `0x0057e6e2` | `calc_stack_best_defender` | 786b | 00570000 | Select optimal defender from stack considering all modifiers. Critical for combat resolution accuracy |
| `0x0057f9e3` | `handle_nuke_attack` | 1236b | 00570000 | Nuclear weapon resolution: destroy all units on tile + 8 neighbors, reduce city size by half, add pollution. JS reducer has NUKE action but simplified |
| `0x0057a904` | `handle_civil_war` | 3291b | 00570000 | Civil war triggered when capital captured: splits civ, reassigns cities/units to new civ. Not ported |
| `0x0057b5df` | `handle_city_capture` | 11451b | 00570000 | **LARGEST unported GL function**. Full city capture: reduce size, destroy buildings, reassign production, handle civ elimination, barbarian capture, wonder seizure, diplomatic consequences. Reducer has partial capture only |

**MISSING from JS (block_00580000 resolve_combat PA notes)**:
1. Great Wall wonder double-roll (second random roll reversal)
2. Diplomatic consequences (SNEAK, BREAKCEASE, CANCELPEACE notifications, alliance cascade)
3. Full city capture on conquest (size reduction, building destruction, civ elimination)
4. Ransom mechanic (killing barbarian = difficulty * 50 gold)
5. Submarine detection / retreat logic
6. Amphibious attack doubled firepower

### 1.2 City Turn Processing

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004ebbde` | `process_city_food` | 1512b | 004E0000 | Full food processing: granary, famine (lose pop), settler food drain, aqueduct/sewer checks for growth. Reducer has basic version |
| `0x004ec3fe` | `process_city_production` | 10931b | 004E0000 | **Second largest GL function**. Complete production: shield accumulation, building completion, wonder completion, unit creation, sell excess, capitalization. Reducer has simplified version |
| `0x004eef23` | `process_unit_support_deficit` | 1621b | 004E0000 | When shields < support: disband cheapest military units until balanced. Not ported |
| `0x004ef578` | `handle_city_disorder` | 1614b | 004E0000 | Civil disorder effects: no production, resistance, WLTKD cancellation. Reducer has basic disorder flag but not full effects |
| `0x004f0a9c` | `process_city_turn` | 1903b | 004F0000 | Orchestrator calling food/production/science/pollution per city per turn. Not ported as standalone |
| `0x004f0221` | `pay_building_upkeep` | 406b | 004F0000 | Deduct building maintenance from treasury, auto-sell if bankrupt. Not ported |
| `0x0040c480` | `taxrate_recalc_totals` | 848b | 00400000 | Recalculate total gold/science/luxury across all cities after rate change. Not ported |
| `0x0043f7a7` | `city_update_tile_ownership` | 265b | 00430000 | Set tile ownership radius around city. Critical for new city founding |

### 1.3 Production Prerequisites

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004c02d8` | `can_build_wonder` | 199b | 004C0000 | Check wonder prerequisites, one-per-world, tech requirements. Not ported as standalone |
| `0x004c03ae` | `can_build_improvement` | 1383b | 004C0000 | Full building eligibility: tech prereqs, obsolescence, one-per-city, wonder prereqs. **High priority for production AI correctness** |
| `0x004bfe5a` | `can_build_unit_type` | 1095b | 004B0000 | Full unit eligibility: tech prereqs, obsolescence, AI skip-dominated-units, diplomat/spy restrictions. prodai.js uses simplified checks |

### 1.4 Espionage & Bribery

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004c59f0` | `handle_incident_terror` | 1465b | 004C0000 | Sabotage, poisoning, plant nuke. Full spy incident resolution |
| `0x004c65d2` | `calc_city_revolt_distance` | 232b | 004C0000 | Distance factor for bribery/incite cost calculation |
| `0x004c66ba` | `execute_civil_war` | 1339b | 004C0000 | Civil war from incited revolt: split civ resources |

### 1.5 Civ Lifecycle

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004a7754` | `assign_initial_settler_positions` | 1408b | 004A0000 | Starting position selection for new game: distance maximization, fertility scoring. Critical for init |
| `0x004a7ce9` | `new_civ` | 5834b | 004A0000 | Create new civilization: assign traits, colors, starting techs, initial units. Critical for new game |
| `0x004a93b3` | `expand_city_territory` | 953b | 004A0000 | Expand territory control when city grows. Not ported |
| `0x004aa378` | `kill_civ` | 1608b | 004A0000 | Destroy civilization: reassign units/cities, update diplomacy, check victory. Not ported |
| `0x004aa9c0` | `init_new_game` | 1345b | 004A0000 | Initialize all game state for new game. JS init.js has simplified version |
| `0x004a9785` | `setup_scenario_start` | 3059b | 004A0000 | Scenario-specific initialization |
| `0x004a28b0` | `calc_civ_score` | 1542b | 004A0000 | Victory score: population + territory + wonders + techs + future tech + peace. Not ported |

### 1.6 Pathfinding

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004abfe5` | `find_path` | 4118b | 004A0000 | **A* pathfinding**: priority queue BFS with terrain costs, ZOC, enemy avoidance, transport boarding. JS pathfinding.js has basic version but diverges significantly |
| `0x004ad20f` | `find_road_path` | 1392b | 004A0000 | Road-specific pathfinding for trade routes. Not ported |
| `0x004adafc` | `calc_unit_goto_direction` | 2516b | 004A0000 | Compute next step direction for GOTO orders. Not ported |

### 1.7 Visibility

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004274a6` | `process_unit_move_visibility` | 4250b | 00420000 | Update visibility for all civs when unit moves: reveal tiles, wake sentries, cancel GOTOs on newly-visible enemies. JS has simpler version |

### 1.8 Map & Continent

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004b32fe` | `continent_assign_body_ids` | 1853b | 004B0000 | **Flood-fill body ID assignment** for land/ocean masses. Required for AI continental strategy on generated maps. Currently only from .sav parsing |

### 1.9 Diplomacy Transactions

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004db690` | `parley_build_packet` | 1060b | 004D0000 | Serialize diplomacy offer into packet |
| `0x004dbab4` | `parley_serialize_offer` | 1074b | 004D0000 | Offer serialization for tech/gold/city/unit trades |
| `0x004dd285` | `parley_execute_transaction` | 1381b | 004D0000 | Execute agreed trade: transfer gold, techs, cities, units |
| `0x004dd8ad` | `parley_execute_share_maps` | 1521b | 004D0000 | Share map visibility between civs |
| `0x004dde9e` | `parley_execute_give_tech_list` | 102b | 004D0000 | Transfer multiple techs |
| `0x004ddf04` | `parley_execute_give_gold` | 174b | 004D0000 | Gold transfer |
| `0x004ddfb2` | `parley_execute_give_techs` | 151b | 004D0000 | Tech transfer |
| `0x004de0e2` | `parley_transfer_city` | 2217b | 004D0000 | City ownership transfer in diplomacy |
| `0x004df10f` | `parley_execute_treaty` | 289b | 004D0000 | Sign/cancel treaty |
| `0x0045950b` | `handle_exchange_gift` | 4096b | 00450000 | Full gift exchange logic: tech/gold/city/unit trades |
| `0x0045a535` | `diplo_form_alliance` | 374b | 00450000 | Form alliance: set treaty bits, declare war on enemy's enemies |
| `0x0045a6ab` | `diplo_sign_peace_treaty` | 253b | 00450000 | Sign peace: set treaty bits, clear war flags |
| `0x0045a7a8` | `diplo_sign_ceasefire` | 315b | 00450000 | Sign ceasefire |
| `0x0045a8e3` | `diplo_activate_alliance_wars` | 910b | 00450000 | When alliance formed, declare war on all enemies of new ally |
| `0x0045ac71` | `diplo_declare_war` | 1125b | 00450000 | Declare war: clear treaties, notify allies, cancel trade routes |

### 1.10 Events System

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004fc516` | `parse_events_file` | 12813b | 004F0000 | **Largest event function**. Parse events.txt scenario scripting language. Not ported |
| `0x004fc3ae` | `event_dispatch_actions` | 360b | 004F0000 | Dispatch triggered event actions |
| `0x004fba0c` | `event_check_turn_trigger` | 144b | 004F0000 | Check if event triggers on current turn |
| `0x004fba9c` | `event_check_interval_trigger` | 147b | 004F0000 | Check interval-based event triggers |
| `0x004fa250` | `event_resolve_civ_name` | 265b | 004F0000 | Resolve civ name references in event scripts |
| `0x004fa359` | `event_resolve_unit_name` | 170b | 004F0000 | Resolve unit type references |
| `0x004fa944` | `event_action_change_money` | 364b | 004F0000 | Event action: modify treasury |
| `0x004fa617` | `event_alloc_node` | 240b | 004F0000 | Allocate event node in linked list |

### 1.11 AI Goal Management

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00492d18` | `ai_shift_goals_down_a` | 184b | 00490000 | Insert into 48-slot priority goal list A |
| `0x00492dd0` | `ai_shift_goals_down_b` | 144b | 00490000 | Insert into 16-slot priority goal list B |
| `0x004933f2` | `ai_add_goal_b` | 518b | 00490000 | Add short-term goal to list B with priority sorting |

**MISSING from JS**: The entire AI goal list data structure (48-slot list A + 16-slot list B with priority sorting, 2-turn decay cycle, persistence across turns, unit redirection on goal insert). JS unitai.js approximates with simpler threat/distance heuristics.

### 1.12 Power Graph & Score

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004853e7` | `calc_power_graph_rankings` | 2094b | 00480000 | Full power ranking calculation: military, economic, demographic. Sets hatred flags. Not ported |

### 1.13 PBEM Setup

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x005ae580` | `pbem_game_setup` | ~1000b | 005A0000 | Play-by-email initialization: seat-to-civ mapping, map gen params. Relevant for multiplayer init |

---

## Priority 2: Medium Priority Gaps (TM)

### 2.1 Combat Support

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0057e2c3` | `calc_unit_hit_points` | 119b | 00570000 | Calculate effective HP with veteran bonus |
| `0x0057e9f9` | `handle_unit_kill` | 411b | 00570000 | Post-kill processing: update counters, check civ death |
| `0x0057ebfd` | `handle_unit_promotion` | 322b | 00570000 | Veteran promotion on combat win (50% for win, 33% base) |

### 2.2 Unit Orders

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0058c295` | `unit_order_disband` | 722b | 00580000 | Disband unit: shields to city if settler/engineer |
| `0x0058c65e` | `unit_order_build_improvement` | 1411b | 00580000 | Build road/irrigation/mine/fortress/airbase — tile improvement construction |
| `0x0058cbe1` | `unit_order_home_city` | 261b | 00580000 | Reassign unit home city |
| `0x0058cce6` | `unit_order_fortify` | 255b | 00580000 | Set fortify order with validation |
| `0x0058cde5` | `unit_order_unload` | 488b | 00580000 | Unload units from transport |
| `0x0058cfcd` | `unit_order_pillage` | 1105b | 00580000 | Pillage improvements with priority selection |
| `0x0058df7b` | `unit_order_airlift` | 1609b | 00580000 | Airlift between cities with airport |

### 2.3 Diplomacy

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00579c40` | `diplomacy_check_treaty_violation` | 379b | 00570000 | Check if action violates treaty |
| `0x00579ed0` | `diplomacy_check_attack_allowed` | 933b | 00570000 | Check if attack is legal (senate, treaty) |
| `0x0057a27a` | `diplomacy_steal_tech` | 999b | 00570000 | Spy steals technology mechanic |
| `0x0057a7e9` | `transfer_city_ownership` | 283b | 00570000 | Transfer city between civs |
| `0x00458df9` | `diplo_ai_emissary` | 880b | 00450000 | AI initiates diplomacy contact |
| `0x0045918e` | `diplo_reset_state` | 61b | 00450000 | Reset diplomacy session state |
| `0x0045b0d6` | `diplo_demand_ally_help` | 919b | 00450000 | Demand ally join war |
| `0x0045dd7f` | `diplo_favor_menu` | 4878b | 00450000 | Request favors from other civs |
| `0x0045f0b1` | `show_gift_menu` | 3218b | 00450000 | Gift items to other civs |
| `0x0045fd67` | `diplo_check_war_weariness` | 178b | 00450000 | Check if war-weary civ seeks peace |
| `0x0045fe19` | `diplo_show_main_menu` | 747b | 00450000 | Main diplomacy negotiation menu |
| `0x004de049` | `parley_execute_give_units` | 153b | 004D0000 | Transfer units in diplomacy |
| `0x004de990` | `parley_execute_transfer_units` | 887b | 004D0000 | Bulk unit transfer |
| `0x004ded07` | `find_unit_placement_tile` | 589b | 004D0000 | Find valid tile to place transferred units |

### 2.4 Unit Management

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x005b3b78` | `eject_air_units` | 343b | 005B0000 | Eject air units from carrier/city when destroyed |
| `0x005b5b93` | `stack_unit` | 380b | 005B0000 | Add unit to tile stack linked list |
| `0x005b5d93` | `delete_unit_safely` | 666b | 005B0000 | Safe deletion handling cargo/transport |
| `0x005b620a` | `autoload_ships` | 222b | 005B0000 | Auto-load land units onto transports at coast |

### 2.5 City Production Chain

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004e7eb1` | `calc_food_box_size` | 512b | 004E0000 | Food box size with granary/difficulty modifiers |
| `0x004e80b1` | `calc_shields_per_row` | 1502b | 004E0000 | Shield display rows with production bonus buildings |
| `0x004e7d7f` | `check_unit_support` | 306b | 004E0000 | Calculate per-unit shield support cost |
| `0x004eb327` | `calc_trade_route_income` | 374b | 004E0000 | Trade route gold calculation |
| `0x004e7641` | `evaluate_city_tiles` | 653b | 004E0000 | Score tiles for worker assignment optimization |
| `0x004efbc6` | `process_city_science` | 382b | 004E0000 | Per-city science accumulation per turn |
| `0x004efd44` | `process_city_pollution_and_meltdown` | 508b | 004E0000 | Pollution chance + nuclear meltdown for nuclear plants |
| `0x004ec1c6` | `assign_caravan_commodity` | 332b | 004E0000 | Assign trade commodity to caravan/freight |

### 2.6 Research & Tech

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004be6ba` | `upgrade_units_for_tech` | 970b | 004B0000 | Leonardo's Workshop auto-upgrade on tech discovery. Not implemented |
| `0x004bea84` | `handle_tech_government_effects` | 973b | 004B0000 | Government revolution prompts on tech discovery |
| `0x004bee56` | `we_love_the_king_day` | 379b | 004B0000 | WLTKD golden age on Electronics discovery |
| `0x00486e15` | `calc_tech_paradigm_cost` | 90b | 00480000 | Technology paradigm cost formula |
| `0x00486e6f` | `check_tech_advance` | 403b | 00480000 | Check if tech research complete, grant if so |
| `0x00494dae` | `count_tech_depth` | ~100b | 00490000 | Count prerequisite chain depth for tech cost |

### 2.7 Turn Processing

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00487007` | `refresh_map_visibility` | 259b | 00480000 | Refresh all civ visibility at turn start |
| `0x00488a45` | `check_trade_route_path` | 682b | 00480000 | Validate trade route paths still connected |
| `0x0059c575` | `record_combat_kill` | 762b | 00590000 | Record kill in combat log/replay |

### 2.8 Civ Management

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004e1763` | `kill_or_retire_civ` | 3942b | 004E0000 | Civ elimination: retire or destroy based on context |
| `0x004e7270` | `acquire_wonder` | 486b | 004E0000 | Wonder completion effects (Great Library, etc.) |
| `0x0043cef9` | `city_count_content_citizens` | 125b | 00430000 | Count content (neither happy nor unhappy) citizens |

### 2.9 Espionage

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004c5fae` | `spy_diplomat_action` | 1271b | 004C0000 | Diplomat/spy enters enemy city menu |
| `0x004c64aa` | `spy_caught_check` | 163b | 004C0000 | Spy detection probability |
| `0x004c9ebd` | `spy_sabotage_unit` | 784b | 004C0000 | Spy sabotages enemy unit |

### 2.10 Spaceship

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00596eec` | `spaceship_recalc_stats` | 1297b | 00590000 | Full spaceship stats: mass, success%, flight time. Complete victory calculation |
| `0x005973fd` | `spaceship_launch` | 815b | 00590000 | Launch spaceship, set arrival turn |
| `0x00596e06` | `spaceship_get_clamped_category` | 140b | 00590000 | Clamped component count by category |
| `0x00596e92` | `spaceship_calc_population_capacity` | 90b | 00590000 | Hab module population formula |
| `0x00598a05` | `spaceship_check_complete_section` | 324b | 00590000 | Check if spaceship section complete |
| `0x00598ceb` | `spaceship_is_enabled` | 90b | 00590000 | Check if spaceship race active |
| `0x005998b0` | `spaceship_has_enough_raw` | 66b | 00590000 | Check raw component count vs max |
| `0x00599910` | `spaceship_can_build_category` | 132b | 00590000 | Check tech prereqs for SS component |
| `0x005999c0` | `spaceship_category_maxed` | 70b | 00590000 | Check if category at max |
| `0x004a74bc` | `reset_spaceship` | 187b | 004A0000 | Reset SS data |
| `0x004a7577` | `has_spaceship_launched` | 47b | 004A0000 | Check launched flag |
| `0x004a75a6` | `has_spaceship_built` | 47b | 004A0000 | Check built flag |
| `0x004a75d5` | `is_spaceship_arriving` | 88b | 004A0000 | Check if SS arriving this turn |
| `0x004a762d` | `destroy_spaceship` | 200b | 004A0000 | Destroy SS (nuke attack on capital) |

### 2.11 AI Functions

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004c54da` | `ai_find_nearest_city_or_transport` | 1297b | 004C0000 | AI pathfinding to nearest city/transport. Used for retreat |
| `0x004f03b7` | `find_city_expansion_site` | 1095b | 004F0000 | AI city expansion site selection |
| `0x004f080d` | `handle_city_expansion` | 650b | 004F0000 | AI city expansion execution |
| `0x004e8f42` | `assign_worker_tiles` | 2038b | 004E0000 | AI optimal worker tile assignment. Used in END_TURN |
| `0x00493602` | `ai_decay_and_merge_goals` | 365b | 00490000 | AI goal 2-turn decay cycle |
| `0x0049376f` | `ai_clear_goals_b` | 115b | 00490000 | Clear short-term AI goal list |
| `0x00498d40` | `load_city_preferences` | ~500b | 00490000 | Parse CITYPREF.TXT for AI city build overrides |

### 2.12 Civ Name Lookup

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00493b10` | `get_civ_noun_name` | 145b | 00490000 | Civ noun form (e.g., "Romans") |
| `0x00493ba6` | `get_civ_leader_title` | 210b | 00490000 | Leader title by government |
| `0x00493c7d` | `get_civ_people_name` | 145b | 00490000 | People name form |
| `0x00493d13` | `get_civ_adjective_name` | 145b | 00490000 | Adjective form (e.g., "Roman") |

### 2.13 Map Utilities

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x005ae37b` | `is_adjacent_direction` | ~50b | 005A0000 | Check if two directions are adjacent |
| `0x005ae3bf` | `bit_index_to_byte_mask` | ~50b | 005A0000 | Convert bit index to byte offset + mask |
| `0x005ae3ec` | `shift_by_signed` | ~50b | 005A0000 | Shift left or right by signed amount |
| `0x005aec14` | `pbem_get_email_address` | ~200b | 005A0000 | PBEM email address |

### 2.14 Pathfinding Support

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004abea0` | `direction_from_delta` | 325b | 004A0000 | Convert dx/dy to direction constant |
| `0x004ad01e` | `get_path_cost` | 88b | 004A0000 | Query pathfinding cost map |
| `0x004ad076` | `set_path_cost` | 91b | 004A0000 | Set pathfinding cost map |
| `0x004ad0d1` | `calc_path_distance` | 318b | 004A0000 | Calculate path distance |
| `0x004ad784` | `find_adjacent_terrain_type` | 158b | 004A0000 | Find adjacent tile of specific terrain |
| `0x004ad822` | `find_nearest_road_tile` | 730b | 004A0000 | Find nearest tile with road |
| `0x004aeef0` | `get_bfs_visited` | 36b | 004A0000 | BFS visited map query |
| `0x004aee90` | `get_land_connectivity` | 36b | 004A0000 | Land connectivity map query |
| `0x004aeec0` | `get_sea_connectivity` | 36b | 004A0000 | Sea connectivity map query |

### 2.15 UI Tax Dialog

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0040decc` | `check_and_show_tax_dialog` | 331b | 00400000 | Tax rate change validation + dialog |

### 2.16 Pollution

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00486e15` | `calc_tech_paradigm_cost` | 90b | 00480000 | Tech cost based on difficulty |

### 2.17 Events System (Medium)

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004faba6` | `event_action_make_aggression` | 348b | 004F0000 | Event forces civ to attack |
| `0x004fad02` | `event_action_destroy_civ` | 249b | 004F0000 | Event destroys civ |
| `0x004fadfb` | `event_action_give_tech` | 217b | 004F0000 | Event grants tech |
| `0x004faed4` | `event_action_create_unit` | 941b | 004F0000 | Event creates unit |
| `0x004fb29f` | `event_action_move_unit` | 787b | 004F0000 | Event moves unit |
| `0x004fb5b2` | `event_action_change_terrain` | 1114b | 004F0000 | Event changes terrain |

---

## Priority 3: Low Priority Gaps (TL)

### 3.1 Combat & Nuclear

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0057eb94` | `handle_stack_wipe` | 105b | 00570000 | Destroy all units in stack (nuke aftermath) |
| `0x0057febc` | `scramble_defenders_to_tile` | 1084b | 00570000 | Move nearby defenders to threatened tile |
| `0x00579dbb` | `calc_city_value_for_capture` | 277b | 00570000 | Score city attractiveness for AI capture |
| `0x0057a685` | `find_most_central_city` | 356b | 00570000 | Find most central city for civil war split |

### 3.2 Unit Orders

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0058bd60` | `unit_order_activate` | 36b | 00580000 | Wake unit from sleep/sentry |
| `0x0058bd84` | `unit_order_wake_all_own` | 121b | 00580000 | Wake all own units on tile |
| `0x0058bdfd` | `unit_order_automate` | 89b | 00580000 | Set settler to auto-improve |
| `0x0058d442` | `unit_order_sentry` | 451b | 00580000 | Set unit to sentry with wake conditions |
| `0x0058d60a` | `unit_order_paradrop` | 165b | 00580000 | Initiate paradrop |
| `0x0058d6af` | `unit_order_goto_city` | 1787b | 00580000 | GOTO specific city with pathfinding |
| `0x0058ddce` | `unit_order_wake_sentries` | 326b | 00580000 | Wake all sentries in radius |
| `0x0058df14` | `unit_order_clean_toggle` | 103b | 00580000 | Toggle pollution cleanup |

### 3.3 Transport & Airlift

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004ca1cd` | `execute_airlift` | 460b | 004C0000 | Execute airlift between airport cities |
| `0x004ca39e` | `execute_paradrop` | 2572b | 004C0000 | Execute paradrop with combat resolution |

### 3.4 Map Queries

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x005b8dec` | `check_tile_trespass` | 248b | 005B0000 | Check if unit is trespassing on civ's territory |
| `0x005b9179` | `generate_terrain_around` | 696b | 005B0000 | Generate terrain features around a point |

### 3.5 Espionage

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004c654d` | `check_incident_permission` | 133b | 004C0000 | Check if spy action is allowed |

### 3.6 Spaceship

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00596c08` | `spaceship_get_clamped_count` | 89b | 00590000 | Clamp component count to max |
| `0x00596c61` | `spaceship_get_category_count` | 140b | 00590000 | Component count by category |
| `0x00596ced` | `spaceship_get_max_category` | 79b | 00590000 | Max components per category |
| `0x00596d3c` | `spaceship_get_raw_count` | 202b | 00590000 | Raw component count |

### 3.7 Victory & Score

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004f1220` | `handle_space_race_victory` | 641b | 004F0000 | Space race victory screen |
| `0x0048a92d` | `calc_demographic_extremes` | 247b | 00480000 | Demographics screen data |

### 3.8 City Management

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004e8ecf` | `clear_and_check_worked_tiles` | 115b | 004E0000 | Clear worked tile status, recheck |
| `0x004e9719` | `adjust_specialist_count` | 149b | 004E0000 | Adjust specialist count on pop change |
| `0x004e97ae` | `sync_worker_tile_status` | 155b | 004E0000 | Sync worker assignments |
| `0x004e1314` | `toggle_unit_movement_doubling` | 318b | 004E0000 | Movement point doubling (Magellan's, etc.) |
| `0x004e7458` | `classify_production_type` | 58b | 004E0000 | Classify if producing unit/building/wonder |
| `0x004e7492` | `init_city_production_globals` | 77b | 004E0000 | Initialize city production calculation |
| `0x004e74df` | `calc_food_box_with_difficulty` | 106b | 004E0000 | Food box with difficulty modifier |
| `0x004e8c8c` | `check_auto_irrigation_trigger` | 297b | 004E0000 | Auto-irrigation from adjacent irrigation |
| `0x004e8db5` | `check_road_trade_trigger` | 152b | 004E0000 | Road triggers trade bonus |
| `0x004ec312` | `handle_espionage_discovery` | 236b | 004E0000 | Discover enemy spy in city |

### 3.9 Map Continent

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004b315c` | `continent_calc_adjacency` | 418b | 004B0000 | Calculate continent adjacency matrix |
| `0x004b3110` | `continent_set_adjacency_bit` | 76b | 004B0000 | Set bit in adjacency matrix |

### 3.10 Diplomacy (UI)

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x0045b472` | `calc_gold_to_attitude` | 104b | 00450000 | Gold amount needed to improve attitude |
| `0x004591cb` | `diplo_sell_tech` | 832b | 00450000 | Sell tech to other civ |
| `0x00458ab1` | `diplo_show_greeting` | 804b | 00450000 | Show diplomatic greeting |
| `0x004b7eb6` | `parleywin_start_session` | 807b | 004B0000 | Start diplomacy session |
| `0x004b81dd` | `parley_handle_response` | 1177b | 004B0000 | Handle diplomacy response |
| `0x004d4a7b` | `build_wonder_info_text` | 1366b | 004D0000 | Wonder information display |
| `0x004db23f` | `parley_load_index_file` | 529b | 004D0000 | Load diplomacy text index |
| `0x004db450` | `parley_unload_index` | 49b | 004D0000 | Unload diplomacy text |
| `0x004db481` | `parley_find_entry` | 525b | 004D0000 | Find diplomacy text entry |
| `0x004dbee6` | `parley_build_description` | 3092b | 004D0000 | Build diplomacy offer description |
| `0x004dcafa` | `parley_describe_techs` | 274b | 004D0000 | Describe tech offer |
| `0x004dcc0c` | `parley_describe_gold` | 119b | 004D0000 | Describe gold offer |
| `0x004dcc83` | `parley_describe_units` | 546b | 004D0000 | Describe unit offer |
| `0x004dcea5` | `parley_describe_cities` | 369b | 004D0000 | Describe city offer |
| `0x004dd016` | `parley_describe_attitude` | 347b | 004D0000 | Describe attitude |
| `0x004dd176` | `parley_describe_maps` | 271b | 004D0000 | Describe map sharing |
| `0x004def54` | `parley_describe_treaty` | 417b | 004D0000 | Describe treaty offer |

### 3.11 Events System Triggers

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x004fa403` | `event_resolve_terrain_name` | 123b | 004F0000 | Resolve terrain reference |
| `0x004fa707` | `event_action_play_sound` | 294b | 004F0000 | Play sound action |
| `0x004fa82d` | `event_action_flag_no_schism` | 39b | 004F0000 | Set no-schism flag |
| `0x004faab0` | `event_action_show_text` | 246b | 004F0000 | Show text popup |
| `0x004fbb2f` | `event_check_random_trigger` | 174b | 004F0000 | Random trigger check |
| `0x004fbbdd` | `event_check_tech_trigger` | 334b | 004F0000 | Tech trigger check |
| `0x004fbd2b` | `event_check_scenario_loaded` | 114b | 004F0000 | Scenario load trigger |
| `0x004fbd9d` | `event_check_unit_killed` | 231b | 004F0000 | Unit killed trigger |
| `0x004fbe84` | `event_check_negotiation` | 900b | 004F0000 | Negotiation trigger |
| `0x004fc20d` | `event_check_no_schism` | 169b | 004F0000 | No-schism check |
| `0x004fc2bb` | `event_check_city_taken` | 243b | 004F0000 | City captured trigger |

### 3.12 Init & Rules

| Address | Name | Size | Block | What's Missing |
|---------|------|------|-------|----------------|
| `0x00419ed3` | `normalize_leader_names` | 371b | 00410000 | Normalize custom leader names |
| `0x004a70b0` | `init_game_options` | 267b | 004A0000 | Initialize game option toggles |
| `0x004a71bb` | `init_multiplayer_state` | 386b | 004A0000 | Initialize MP-specific state |
| `0x004a733d` | `load_civ2_dat` | 156b | 004A0000 | Load civ2.dat config file |
| `0x004a73d9` | `save_civ2_dat` | 212b | 004A0000 | Save civ2.dat config file |
| `0x004a76f5` | `reset_kill_history` | 95b | 004A0000 | Reset kill tracking |

---

## Priority 4: Partially Ported (PA) — Missing Branches

### 4.1 Critical PA Functions (Large missing portions)

**FUN_0059062c / `move_unit`** (17963b, block 00590000) — PA
- Only probabilistic movement check ported (reducer.js line 649)
- **Missing**: Full terrain movement cost with road/railroad/river, diplomat/spy actions, caravan/freight trade routes, allied repair, transport boarding from shore, trireme sinking, air unit fuel/crash, LONGMOVE counter, per-civ visibility tracking during move, combat animation sync

**FUN_00580341 / `resolve_combat`** (15052b, block 00580000) — PA
- Core HP-trading loop ported in combat.js
- **Missing**: Great Wall wonder double-roll, diplomatic consequences (SNEAK/BREAKCEASE/CANCELPEACE), city capture on conquest, ransom mechanic, submarine detection/retreat, amphibious doubled FP, nuke/cruise delegation

**FUN_00538A29 / `ai_unit_turn_master`** (44777b, block 00530000) — PA
- Extensively ported in unitai.js but many branches missing
- **Missing**: Diplomat/spy scoring and dispatch, nuclear targeting, air interceptor scramble, heli/VTOL patrol, full caravan trade route scoring, fortress/airbase/railroad terraform decisions, full 8-direction movement scoring bonuses, transport auto-loading, settler threshold tuning

**FUN_00498e8b / `ai_choose_city_production`** (29400b, block 00490000) — PA
- Major port in prodai.js with significant deviations
- **Missing**: AI goal list integration, per-continent statistics, spy detection/SDI transfer, obsolete building auto-sell, CITYPREF.TXT overrides, wonder progress continuation, settler scoring detail, spaceship component selection, human-with-AI-advisor modes, capitalization fallback

**FUN_0053184D / `ai_process_civ_turn`** (14665b, block 00530000) — R (not ported)
- Main per-civ-per-turn AI orchestrator
- **Missing**: Entire function: spaceship decision, continent threat assessment, unit redistribution, diplomatic posture loop, alliance management, technology stealing, per-continent military assessment, transport coordination

**FUN_00460129 / `ai_diplomacy_negotiate`** (16263b, block 00460000) — PA
- Some subordinate functions ported in diplomai.js
- **Missing**: Full negotiation state machine, counter-offer logic, tech/gold/city valuation, alliance formation scoring, war declaration threshold evaluation

**FUN_0045b4da / `diplo_ai_negotiate`** (10271b, block 00450000) — PA
- Partial in diplomai.js
- **Missing**: Many negotiation branches, tribute demand acceptance logic, map sharing evaluation

**FUN_00560084 / `ai_diplomacy_turn_processing`** (3345b, block 00560000) — PA
- JS port covers subordinate functions but NOT this top-level orchestrator
- **Missing**: Government management, AI random seed roll, patience decrement, alliance violation detection, WARENDS event, 32-turn flag clearing, MP distinction

**FUN_00560d95 / `ai_evaluate_diplomacy_toward_human`** (4728b, block 00560000) — PA
- JS has simplified attitude scoring
- **Missing**: Border info/intruder detection, NEARCITY/INTRUDER/VIOLATOR events, unit withdrawal mechanics, senate scandal, detailed multi-factor attitude scoring, spaceship status checks, alliance strength calculation, wonder effects on attitude

### 4.2 Important PA Functions (Significant missing logic)

**FUN_004bf05b / `handle_tech_discovery`** (3391b, block 004B0000) — PA
- Only bitmask update ported via grantAdvance()
- **Missing**: Barracks refund, wonder obsolescence notifications, Leonardo's Workshop upgrades, unit upgrade trigger, AI auto-steal, first-discoverer tracking, MP delegation

**FUN_00487371 / `process_end_of_turn`** (1744b, block 00480000) — PA
- Reducer END_TURN has partial implementation
- **Missing**: Full pollution processing, spaceship arrival check, wonder effects check, game end conditions, AI turn ordering, civ death cascade

**FUN_00487a41 / `process_civ_turn`** (3830b, block 00480000) — PA
- Partial in reducer END_TURN
- **Missing**: Tax collection with corruption, science accumulation, happiness evaluation per city, WLTKD/disorder effects, building upkeep, unit support, per-continent counter resets

**FUN_00440750 / `process_caravan_arrival`** (3144b, block 00440000) — PA
- Simplified trade in reducer ESTABLISH_TRADE
- **Missing**: Commodity matching bonus switch (supply/demand multipliers), era bonus (pre-industrial doubles), tech discounts (Economics -33%, Trade -33%), research cap, food caravan handling, reverse route establishment, full supply/demand scoring

**FUN_00441b11 / `change_city_production`** (2572b, block 00440000) — PA
- CHANGE_PRODUCTION action exists
- **Missing**: Wonder switching logic, STARTWONDER/SWITCHWONDER/ABANDONWONDER events, free shields bonus, building count tracking per civ

**FUN_005b3d06 / `create_unit`** (1675b, block 005B0000) — PA
- CREATE_UNIT in reducer
- **Missing**: Slot search, counter increments, unit limit checks, home city via find_nearest_city, tutorial triggers

**FUN_005b4391 / `delete_unit`** (1129b, block 005B0000) — PA
- Reducer handles basic deletion
- **Missing**: Counter decrements, goto cleanup, civ death check

**FUN_004c6bf5 / `spy_enters_city`** (10469b, block 004C0000) — PA
- Very large function, partially referenced
- **Missing**: Most spy actions: sabotage production, steal tech, poison water, plant nuke, incite revolt, subvert city

**FUN_0043f8b0 / `create_city`** (2677b, block 00430000) — PA
- BUILD_CITY action exists
- **Missing**: Full initialization: territory claim, ocean tile ownership, building defaults, worker assignment, trade route generation, civ notification

### 4.3 Smaller PA Functions with Notable Gaps

| Address | Name | Missing Logic |
|---------|------|---------------|
| `0x005b2a39` | `calc_unit_movement_points` | Damage-based proportional reduction, COSMIC rounding, minimum movement floors |
| `0x004c42a0` | `execute_worker_order` | Full terrain improvement execution with turn counting |
| `0x004c4d1e` | `unit_order_found_city` | City spacing validation, min distance checks |
| `0x004c50d0` | `unit_pillage` | Priority-based improvement selection |
| `0x004e7967` | `calc_capital_distance_and_corruption` | Full corruption formula with distance, courthouse, wonder effects |
| `0x004e868f` | `calc_tile_resource` | Complete resource calculation with specials, government, improvements |
| `0x004e9c14` | `calc_city_production` | Full city production orchestrator with all modifiers |
| `0x00485c15` | `spawn_barbarians` | Late-game buildings, direction ordering, territory control, continent suppression |
| `0x004868fb` | `apply_global_warming` | Full terrain degradation with probabilistic distribution |
| `0x00486c2e` | `update_pollution_counter` | Per-turn pollution accumulation |
| `0x0048710a` | `begin_turn_unit_reset` | Full unit movement reset, spy counter clear, treaty flag management |
| `0x00489553` | `do_full_civ_turn` | Full civ turn orchestrator |
| `0x00488cef` | `heal_units` | Full healing with city/fortress bonuses, Leo's auto-repair |
| `0x0048aedc` | `check_game_end_conditions` | Full victory/defeat check |
| `0x004c21d5` | `complete_research` | Full research completion with tech choice, future tech |
| `0x004c2788` | `calc_tech_cost` | Full tech cost with paradigm, number-of-civs modifier |
| `0x004c2b73` | `add_research_beakers` | Add science points, handle overflow |
| `0x0058f040` | `process_goody_hut` | Late-game city buildings, barbarian direction, territory check, visibility inheritance |

---

## Dependency Graph

### Cluster 1: City Turn Processing (HIGHEST PRIORITY)
```
process_civ_turn (0x00487a41) — orchestrator
  ├── process_city_turn (0x004f0a9c) — per-city orchestrator
  │   ├── process_city_food (0x004ebbde)
  │   │   └── calc_food_box_size (0x004e7eb1)
  │   ├── process_city_production (0x004ec3fe) ← CRITICAL, 10KB
  │   │   ├── can_build_improvement (0x004c03ae)
  │   │   ├── can_build_wonder (0x004c02d8)
  │   │   ├── can_build_unit_type (0x004bfe5a)
  │   │   └── assign_caravan_commodity (0x004ec1c6)
  │   ├── process_city_science (0x004efbc6)
  │   ├── handle_city_disorder (0x004ef578)
  │   ├── process_unit_support_deficit (0x004eef23)
  │   ├── pay_building_upkeep (0x004f0221)
  │   └── process_city_pollution_and_meltdown (0x004efd44)
  ├── check_tech_advance (0x00486e6f)
  │   └── complete_research (0x004c21d5)
  │       └── handle_tech_discovery (0x004bf05b)
  │           └── upgrade_units_for_tech (0x004be6ba)
  ├── begin_turn_unit_reset (0x0048710a)
  ├── heal_units (0x00488cef)
  ├── process_end_of_turn (0x00487371)
  │   └── check_game_end_conditions (0x0048aedc)
  └── taxrate_recalc_totals (0x0040c480)
```

### Cluster 2: Combat Resolution
```
resolve_combat (0x00580341) — PA, core loop ported
  ├── calc_unit_defense_strength (0x0057e33a) — TH
  ├── calc_stack_best_defender (0x0057e6e2) — TH
  ├── calc_unit_hit_points (0x0057e2c3) — TM
  ├── handle_unit_kill (0x0057e9f9) — TM
  │   └── handle_stack_wipe (0x0057eb94) — TL
  ├── handle_unit_promotion (0x0057ebfd) — TM
  ├── handle_nuke_attack (0x0057f9e3) — TH
  └── handle_city_capture (0x0057b5df) — TH, 11KB
      ├── handle_civil_war (0x0057a904) — TH
      ├── transfer_city_ownership (0x0057a7e9) — TM
      └── delete_unit (0x005b4391) — PA
```

### Cluster 3: Pathfinding
```
find_path (0x004abfe5) — TH, core A*
  ├── calc_path_distance (0x004ad0d1) — TM
  ├── get_path_cost / set_path_cost — TM
  └── direction_from_delta (0x004abea0) — TM
calc_unit_goto_direction (0x004adafc) — TH
  └── find_path
find_road_path (0x004ad20f) — TH
  └── find_nearest_road_tile (0x004ad822) — TM
```

### Cluster 4: Diplomacy Transactions
```
diplo_declare_war (0x0045ac71) — TH
  └── diplo_activate_alliance_wars (0x0045a8e3) — TH
diplo_form_alliance (0x0045a535) — TH
diplo_sign_peace_treaty (0x0045a6ab) — TH
diplo_sign_ceasefire (0x0045a7a8) — TH
handle_exchange_gift (0x0045950b) — TH, 4KB
parley_execute_transaction (0x004dd285) — TH
  ├── parley_execute_share_maps (0x004dd8ad) — TH
  ├── parley_execute_give_gold (0x004ddf04) — TH
  ├── parley_execute_give_techs (0x004ddfb2) — TH
  ├── parley_transfer_city (0x004de0e2) — TH
  └── parley_execute_treaty (0x004df10f) — TH
```

### Cluster 5: New Game Initialization
```
init_new_game (0x004aa9c0) — TH
  ├── new_civ (0x004a7ce9) — TH, 5.8KB
  ├── assign_initial_settler_positions (0x004a7754) — TH
  ├── continent_assign_body_ids (0x004b32fe) — TH
  │   └── continent_calc_adjacency (0x004b315c) — TL
  └── expand_city_territory (0x004a93b3) — TH
```

### Cluster 6: AI Master Loop
```
ai_process_civ_turn (0x0053184D) — R, 14.6KB
  ├── ai_unit_turn_master (0x00538A29) — PA, 44.7KB
  │   └── ai_naval_and_ranged_move (0x00537331) — PA, 5.8KB
  ├── ai_choose_city_production (0x00498e8b) — PA, 29.4KB
  ├── ai_diplomacy_turn_processing (0x00560084) — PA, 3.3KB
  │   ├── ai_evaluate_diplomacy_toward_human (0x00560d95) — PA, 4.7KB
  │   └── ai_propose_alliance_or_crusade (0x00562021) — R, 2.3KB
  ├── ai_barbarian_unit_turn (0x005351AA) — PA, 6.1KB
  └── ai_goal management cluster:
      ├── ai_add_goal_a (0x0049301b) — PA
      ├── ai_add_goal_b (0x004933f2) — TH
      └── ai_decay_and_merge_goals (0x00493602) — TM
```

### Cluster 7: Spaceship
```
spaceship_recalc_stats (0x00596eec) — TM (core)
  ├── spaceship_get_clamped_count (0x00596c08) — TL
  ├── spaceship_calc_population_capacity (0x00596e92) — TM
  └── spaceship_get_max_component (0x00596b00) — R
spaceship_launch (0x005973fd) — TM
spaceship_ai_should_start (0x00598d45) — PA
handle_space_race_victory (0x004f1220) — TL
```

### Cluster 8: Events System
```
parse_events_file (0x004fc516) — TH, 12.8KB
  └── event_alloc_node (0x004fa617) — TH
event_dispatch_actions (0x004fc3ae) — TH
  ├── event_check_turn_trigger (0x004fba0c) — TH
  ├── event_check_interval_trigger (0x004fba9c) — TH
  ├── event_action_change_money (0x004fa944) — TH
  ├── event_action_create_unit (0x004faed4) — TM
  ├── event_action_move_unit (0x004fb29f) — TM
  └── event_action_change_terrain (0x004fb5b2) — TM
```

---

## Recommended Porting Order

### Phase A: Core Turn Loop (enables proper city growth/production)
1. **`can_build_improvement`** + **`can_build_wonder`** + **`can_build_unit_type`** (block 004C/004B) — Production prerequisite checks. Foundation for all production decisions. ~2,577b total.
2. **`process_city_food`** (004E) — Food processing with granary, famine, growth. ~1,512b.
3. **`process_city_production`** (004E) — Shield accumulation and item completion. ~10,931b. Depends on (1).
4. **`process_unit_support_deficit`** (004E) — Unit support deficit resolution. ~1,621b.
5. **`pay_building_upkeep`** (004F) — Building maintenance. ~406b.
6. **`handle_city_disorder`** (004E) — Civil disorder effects. ~1,614b.
7. **`process_city_turn`** (004F) — Orchestrator tying (2)-(6) together. ~1,903b.

### Phase B: Combat Fidelity (enables accurate battles)
8. **`calc_unit_defense_strength`** (0057) — Accurate defense calculation. ~931b.
9. **`calc_stack_best_defender`** (0057) — Optimal defender selection. ~786b.
10. **Complete `resolve_combat` PA gaps** — Great Wall, diplomatic consequences, submarine retreat.
11. **`handle_unit_kill`** + **`handle_unit_promotion`** (0057) — Post-combat cleanup. ~733b.
12. **`handle_city_capture`** (0057) — Full city capture. ~11,451b. Depends on (11).

### Phase C: Pathfinding (enables GOTO orders)
13. **`find_path`** (004A) — A* pathfinding. ~4,118b.
14. **`calc_unit_goto_direction`** (004A) — GOTO direction computation. ~2,516b. Depends on (13).
15. **`find_road_path`** (004A) — Trade route pathfinding. ~1,392b.

### Phase D: Diplomacy (enables treaties and trade)
16. **`diplo_declare_war`** + **`diplo_sign_ceasefire`** + **`diplo_sign_peace_treaty`** + **`diplo_form_alliance`** (0045) — Core treaty operations. ~2,067b.
17. **`diplo_activate_alliance_wars`** (0045) — Alliance war cascade. ~910b. Depends on (16).
18. **`parley_execute_transaction`** and sub-functions (004D) — Execute agreed trades. ~3,500b.
19. **`handle_exchange_gift`** (0045) — Gift/trade logic. ~4,096b.

### Phase E: New Game Init (enables starting fresh games)
20. **`continent_assign_body_ids`** (004B) — Flood-fill body IDs. ~1,853b.
21. **`new_civ`** (004A) — Create civilization. ~5,834b.
22. **`assign_initial_settler_positions`** (004A) — Starting positions. ~1,408b.
23. **`init_new_game`** (004A) — Game initialization orchestrator. ~1,345b. Depends on (20)-(22).

### Phase F: Tech & Research Effects
24. **Complete `handle_tech_discovery` PA gaps** — Barracks refund, wonder obsolescence, Leonardo's upgrades.
25. **`upgrade_units_for_tech`** (004B) — Leonardo's Workshop auto-upgrade. ~970b.

### Phase G: AI Improvements
26. **AI goal list data structure** — Port 48+16 slot priority queues from block 00490000.
27. **`ai_process_civ_turn`** (0053) — AI orchestrator. ~14,665b.
28. **Complete `ai_unit_turn_master` PA gaps** — Diplomat/spy, nuclear, air intercept, transport.
29. **Complete `ai_choose_city_production` PA gaps** — Per-continent stats, CITYPREF, obsolete building sell.

### Phase H: Spaceship & Victory
30. **`spaceship_recalc_stats`** + launch + victory functions. ~3,000b combined.
31. **`calc_civ_score`** (004A) — Victory scoring. ~1,542b.
32. **`check_game_end_conditions`** completion — Full victory/defeat checks.

### Phase I: Events & Scenarios
33. **`parse_events_file`** (004F) — Scenario event scripting. ~12,813b. Complex standalone system.
34. **Event trigger checks and action dispatchers** — ~4,000b combined.

### Phase J: Espionage & Special
35. **`spy_enters_city`** completion + spy actions (004C). ~12,000b combined.
36. **`handle_nuke_attack`** (0057) + **`handle_civil_war`** (0057). ~4,527b.
37. **Transport loading** — `load_unit_onto_ship` (005B). ~1,912b.

---

## Byte Count Summary

| Priority | Functions | Total Bytes | Key Systems |
|----------|-----------|-------------|-------------|
| TH (High) | ~60 | ~85,000b | Combat, city turn, pathfinding, diplomacy, init, events |
| TM (Medium) | ~95 | ~45,000b | Orders, spaceship, espionage, AI helpers, tech effects |
| TL (Low) | ~65 | ~25,000b | Small helpers, scenario, UI diplomacy text, triggers |
| PA gaps | ~35 major | ~80,000b | Combat resolution, AI master, move_unit, production |
| **Total estimated** | **~255** | **~235KB** | |

The most impactful porting work is Phase A (city turn loop, ~17KB) and Phase B (combat fidelity, ~14KB), which together would bring the core game simulation to reasonable accuracy for multiplayer play.
