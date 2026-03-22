# Phase 1 Analysis: block_00480000.c (0x00480000 - 0x0048FFFF)

## Function Table

### Cluster: CRT/MFC Destructor Thunks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00482305 | stub | FUN_00482305 | crt_destructor_thunk_1 | void | void | Thunk to FUN_0059df8a (CRT stack destructor). FRAMEWORK | LOW |
| 0x00482311 | stub | FUN_00482311 | crt_destructor_thunk_2 | void | void | Identical thunk to FUN_0059df8a. FRAMEWORK | LOW |
| 0x00482327 | stub | FUN_00482327 | seh_unwind_handler | void | void | SEH frame teardown: restores FS:[0] from EBP-0xC. FRAMEWORK | MEDIUM |

### Cluster: Multiplayer Network Message Handlers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00482337 | small | FUN_00482337 | mp_on_msg_invalidate | void | void | Sets DAT_006ad678 flags |= 0x400 and invalidates object cache if DAT_006c9178 != 0. Network message handler triggering window redraw. | MEDIUM |
| 0x0048237D | small | FUN_0048237d | mp_on_msg_timer_invalidate | void | void | Like above but with 1200ms (0x4B0) timer guard via GetTickCount comparison (_DAT_006cec80). Only invalidates if enough time has elapsed. | MEDIUM |
| 0x004823D6 | small | FUN_004823d6 | mp_copy_player_info | (int src, u32* dst) | void | Copies 7 dwords (28 bytes) from src+0x10..+0x28 to dst. Appears to extract player connection data from a network message struct. | LOW |
| 0x00482470 | small | FUN_00482470 | mp_on_msg_conditional_invalidate | void | void | Checks DAT_006ad664 (connected player count) and DAT_00655b0b (human_civs_bitmask). Conditionally invalidates window. If multiplayer and other humans remain, skip invalidation. | MEDIUM |

### Cluster: Multiplayer Session Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004824E3 | large | FUN_004824e3 | mp_server_quit_handler | void | void | Server quit/transfer handler. Uses string "SERVERQUITWAIT". Manipulates DAT_00655b0b (human_civs_bitmask), sends network messages via thunk_FUN_0046b14d, calls XD_FlushSendBuffer. Handles player disconnection and slot reassignment. | HIGH |
| 0x00482724 | small | FUN_00482724 | mp_on_quit_status_check | void | void | Checks DAT_006ad698==2 (quit status), invalidates window if so. | MEDIUM |
| 0x0048276D | small | FUN_0048276d | mp_on_timer_check_1 | void | void | Timer-guarded invalidation. Checks DAT_006c9038 (client connection flag) and timer (DAT_006ad8b8 * 60 seconds timeout). | MEDIUM |
| 0x004827D5 | small | FUN_004827d5 | mp_on_timer_check_2 | void | void | Same pattern as above but checks DAT_006c8ff0 instead. Different network state flag. | MEDIUM |
| 0x0048283D | small | FUN_0048283d | mp_on_timer_check_3 | void | void | Same pattern, checks DAT_006ad664 (connected players). | MEDIUM |
| 0x004828A5 | xlarge | FUN_004828a5 | mp_client_transfer_server | void | u32 | Major multiplayer function. String evidence: "ClientTransferServer", "LANCONNECTFAIL", "SERVERCONNECTFAIL", "NOONESHOWED", "SOMESHOWED", "HOSTCHANGESERVER", "HOSTCHANGECLIENT". Handles server migration: disconnects from old server, reconnects to new one, reassigns player slots. Calls XD_OpenConnection, XD_CloseConnection. Returns 1 on success, 0 on failure. | HIGH |

### Cluster: Multiplayer Event String Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048308F | xlarge | FUN_0048308f | mp_relink_event_strings | void | void | Processes scenario events structure (DAT_00627670, DAT_0064b98c). Iterates through event records (stride 0x1C4 = 452 bytes), building linked list (offsets 0x1BC/0x1C0 = prev/next pointers). Relinks string pointers at multiple offsets within each record (0x08, 0x10, 0x14, 0x20, 0x38-0x88 array of 20, 0x88, 0x90, 0xC4, 0xCC, 0xD4, 0xDC, 0x13C, 0x140, 0x148, 0x174, 0x184) with minimum sizes. Rebuilds serialized string pool after network transfer. | HIGH |

### Cluster: Game Initialization / Reset

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00484CC0 | small | FUN_00484cc0 | init_scenario_vars | void | void | Zeroes DAT_0064bc60/62 (scenario flags), sets DAT_0064bcb2=10 (default value), clears DAT_0064bcb4-b8 (scenario config), DAT_0064bcba (secondary_civ_ref), and 4 entries at DAT_0064bcbc. Initializes scenario/special game mode variables. | MEDIUM |
| 0x00484D3B | stub | FUN_00484d3b | clear_game_active_flag | void | void | Sets DAT_00628044=0 (game-active flag). Already called via thunk in other functions. | HIGH |
| 0x00484D52 | small | FUN_00484d52 | init_game_display | void | void | Calls thunk_FUN_00421bd0 (if not multiplayer dedicated), then thunk_FUN_00407ff0 and thunk_FUN_00419b80 (load_cosmic_rules) twice. Initializes display and rules. | MEDIUM |

### Cluster: Game Exit / Quit

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00484D85 | large | FUN_00484d85 | handle_quit_game | void | u32 | Prompts "REALLYQUIT" dialog. Branches by save_format_version (0=single, 1=hotseat, 3+=network). For multiplayer: sends game state messages, shows score screens. Calls thunk_FUN_004e1763 (end civ turn), sets DAT_006ad685=1 (quit flag). Returns 0. | HIGH |

### Cluster: Turn Year Calculation & Calendar

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00484FEC | large | FUN_00484fec | calc_year_from_turn | (int turn) | int | Calculates calendar year from turn number. Uses difficulty level (DAT_00655b08), raging hordes flag (DAT_00655af0 & 4/8), and clamped difficulty via clamp(). References table at DAT_0062c490/c494/c498 with stride 0x48 (6 segments * 0xC per difficulty bracket). Handles scenario override (DAT_00655af0 & 0x80 with DAT_0064bcb4/b6). The 6-segment piecewise linear interpolation matches the known Civ2 calendar system (20yr -> 10yr -> 5yr -> 2yr -> 1yr -> 1yr). Year 0 forced to 1. | HIGH |
| 0x00485208 | medium | FUN_00485208 | advance_year_display | (u32 param, uint turns) | void | Updates the year display. For standard games: calls thunk_FUN_004af14b (set year label), thunk_FUN_004aef36 (update timeline), thunk_FUN_004af1d5 (advance N turns). For scenario mode (DAT_0064bcb4 < 0): uses modulo 12 for monthly display with base 0x1A4 (420) and 0x1AF (431) offsets. | MEDIUM |

### Cluster: Power Graph / Demographics Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004853E7 | xlarge | FUN_004853e7 | calc_power_graph_rankings | void | void | Computes power scores for all 8 civs and fills power graph history array (DAT_00655c38, confirmed in memory notes as power graph ranking). For each active civ (DAT_00655b0a bitmask): calculates score from tech_count*3 + research_accum*8 + gold/32, plus weighted unit type counts using attack/defense/cost from unit_type table (DAT_0064b1b8). Standard mode stores score/8 at turn/4 index; scenario mode stores raw score at turn/2. Sorts civs by score into ranking array (DAT_00655c22). Sets DAT_00655c20/c21 (ai_current first/last human indices). Then checks for Alpha Centauri launch conditions (turn > 200, tech_count > 4, spaceship checks via FUN_004a7577). If launch detected: sets game_flags bit 1 and initiates diplomatic "hatred" (treaty flag 0x20) cascade toward winning civ. | HIGH |

### Cluster: Barbarian Spawning

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00485C15 | xlarge | FUN_00485c15 | spawn_barbarians | void | void | Master barbarian spawning function. Guards: DAT_00655b09 (barbarian level 0-3). Timing formula: `(3 - barb_level) * 3 + 30) * (5 - difficulty)` for diff < 5, else `(3 - barb_level) * 3 + 15` turns. Every Nth turn (15/7/7 for levels 1/2/3): selects random land tile away from edge (y >= 3), requires terrain value >= 16 (via DAT_00666134 fertility). Spawns 1-5+ barbarian units depending on era. Unit type selection uses improvement IDs from DAT_00628420 (barracks=0x188, city walls=0x18C, etc). Level 3 barbarians can include leaders (type 0x2E). Second phase: randomly raids human cities with barb units, type based on era/government. Notifications: "BARBARIANS" dialog for current player, network message 0x72 for MP humans. | HIGH |

### Cluster: Global Warming / Pollution

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004868FB | large | FUN_004868fb | apply_global_warming | (uint severity) | void | Applies terrain degradation from global warming. Shows "GLOBALWARMING" dialog. Iterates all map tiles; for tiles with terrain < 4 (desert/plains/grassland/forest): counts nearby cities (20-tile radius from DAT_00628350/60). If few cities (< 7 - severity): degrades terrain probabilistically using hash `(x*3 + y*-3) & 7 == severity`. Heavy degradation (>= threshold): converts to swamp (8/9) or jungle, removes improvements (0x0C mask). Also strips irrigation from player-visible tiles. | HIGH |
| 0x00486C2E | medium | FUN_00486c2e | update_pollution_counter | void | void | Tracks global pollution level (DAT_00655b0e/0f). Formula: `(num_active_shields/2 + num_production/2 - nuclear_plants*4 - recycling_count)`. Counts recycling centers (building ID 0x1D=29) across all cities. When threshold exceeds 16, triggers global warming via FUN_004868fb. Shows "FEARWARMING" warning at level 12 with > 6 active civs. | HIGH |

### Cluster: Technology Progress (Goody Huts)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00486E15 | small | FUN_00486e15 | calc_tech_paradigm_cost | (int tech_num) | int | Calculates cumulative tech cost for tech_num using formula: `sum(i=0..n) of (7 - difficulty) * i) / 2 + 1`. This is the "tech paradigm" formula that determines how much accumulated research is needed. | MEDIUM |
| 0x00486E6F | medium | FUN_00486e6f | check_tech_advance | void | void | Single-player only (not hotseat). Checks if current player has enough accumulated research for next tech. Uses calc_tech_paradigm_cost. If threshold met and tech_count < 38 and replay enabled (DAT_00655aea bit 2): calls thunk_FUN_0044cc80 (replay recording). | MEDIUM |

### Cluster: Turn Processing - Map Refresh

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00487007 | medium | FUN_00487007 | refresh_map_visibility | void | void | Sets DAT_006ad699=0, iterates all map tiles calling thunk_FUN_005b94fc (update tile visibility). Then iterates all alive units updating their tile visibility. Resets DAT_006ad699=1 and calls thunk_FUN_004b0b53 (sync state). | MEDIUM |
| 0x0048710A | large | FUN_0048710a | begin_turn_unit_reset | (int owner) | void | Calls refresh_map_visibility, optionally recalculates all unit paths (param==-3). For matching owner's units: resets move counters (DAT_006560f8=0), fuel (DAT_006560fe=0), clears veteran-in-progress flag (0xBFFF). Handles fortification decay: 1/4 chance per turn to remove fortify flag. Clears "already moved" flag (0xFFFB). For veteran units (flag 0x02): decrements fuel, and if fuel==0 and orders==goto: clears veteran status and associated treaty flag (0xFEFFFFFF). | MEDIUM |

### Cluster: End-of-Turn Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00487371 | xlarge | FUN_00487371 | process_end_of_turn | (u32 param) | void | Master end-of-turn function called at turn boundary. If turn > 0: calls spawn_barbarians, update_pollution_counter, calc_power_graph_rankings, check_tech_advance (single player only). Increments DAT_00655af8 (current_turn). Calculates year from turn. Calls begin_turn_unit_reset. Periodically decays civ attitudes (every (difficulty+1)*12 turns). Handles random events (DAT_00655c1e timer, calls thunk_FUN_00432611). Checks for Alpha Centauri victory: if civ has launched and arrived (FUN_004a7577 + FUN_004a75d5), sets game end flags, displays "EAGLEHASLANDED" dialog. | HIGH |

### Cluster: AI Turn / Diplomacy

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00487A41 | xlarge | FUN_00487a41 | process_civ_turn | (uint civ_id) | void | Major per-civ turn processing function. Processes all cities for given civ (iterates DAT_0064f340 city array). Calls FUN_004f0a9c (city production processing) for each. Updates civ population knowledge (DAT_0064f34d), checks city window. After city loop: updates tax revenues (DAT_0064ca74). For AI civs: calculates science/tax rates based on gold, tech count, leader portrait table (DAT_006554fa), and government type. Checks unit "ever built" flags (DAT_0064c932/ca32). Adjusts science rate based on government constraints (FUN_004bd9f0 checks 5 specific techs). Computes Alpha Centauri scoring (DAT_0064ca80) comparing to leading civ, with leader personality modifiers. | HIGH |

### Cluster: Autosave

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00488937 | medium | FUN_00488937 | auto_save_game | (int civ_id) | void | Autosave handler (only for current player). Builds filename from civ name + ".sav"/".net" extension. Renames old save, saves new one via thunk_FUN_004741be. Uses DAT_00679640 (save path buffer). Skips rename every 4th turn (DAT_00655af8 & 4). | MEDIUM |

### Cluster: Unit Pathfinding / Route Checking

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00488A45 | large | FUN_00488a45 | check_trade_route_path | (int civ, int x1, int y1, int x2, int y2) | u32 | Checks if a valid path exists between two map positions for trade route purposes. First verifies same continent (FUN_005b8aa8). Then uses A* pathfinding (FUN_004abfe5) to walk from (x1,y1) to (x2,y2), max 50 steps. Returns: 0=no path/different continent/too far (dist>=23), 1=path exists but not all road, 2=full road path. Checks tile ownership and treaty status (war flag & 8) along route. | MEDIUM |

### Cluster: Unit Healing / HP Recovery

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00488CEF | xlarge | FUN_00488cef | heal_units | (uint civ_id) | void | Per-turn healing for all units owned by civ_id. For units with HP < max: calculates heal rate based on: city proximity (DAT_0063f660 = distance to nearest city), terrain fortification (0x42 mask -> fortress gives 2x base), city improvements (barracks = +1/+2 depending on domain), and veteran status. Base heal = 1, doubled if in friendly city, halved for naval units at sea (no harbor check via FUN_005b8d15). For units at distance 0 (in city): domain-specific building check (land=barracks/2, sea=port/0x20, air=airport/0x22). Goto-completed units (orders==0x03) with 0 HP remaining and non-land domain: set orders to sentry (0xFF). Sea units without range on ocean (no city) heal at rate 1/10 per turn using clamp. | HIGH |

### Cluster: Population Growth & Tax Advisor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00489292 | large | FUN_00489292 | check_population_milestone | (int civ_id, int prev_gold) | void | Tracks population milestones. Compares current pop (FUN_0043cce5) to stored milestone (DAT_0064c712). Below 100: milestone at each 10 pop. Above 100: at each 100 pop. Shows "FERTILE" dialog at milestone. Also checks if treasury is running negative and shows "TAXES" dialog if gold declining too fast. | MEDIUM |

### Cluster: Per-Civ Full Turn Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00489553 | large | FUN_00489553 | do_full_civ_turn | (int civ_id) | void | Complete turn processing for one civ. Tracks spaceship component changes. Calls: heal_units (FUN_00488cef), process_civ_turn (FUN_00487a41), FUN_00560084 (trade route processing), FUN_0053184d (AI diplomacy), check_population_milestone. Clamps gold to [-16384, 30000]. If spaceship components changed: calls FUN_004d0339 and FUN_0059772c. Handles autosave if enabled (DAT_00655aea bit 0x20). | MEDIUM |

### Cluster: Human Player Turn Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004897FA | small | FUN_004897fa | start_human_turn | (int force) | void | Initializes human player's turn. Sets DAT_006d1da8=0, DAT_00628054=1 (needs_update), DAT_0062805c=1, DAT_0062804c=0. Calls thunk_FUN_0056a65e(1) (update map display), thunk_FUN_0041033a (refresh UI), thunk_FUN_004e4ceb (recalc all). Only acts if DAT_006d1da8 != 0 or force != 0. | MEDIUM |
| 0x00489859 | medium | FUN_00489859 | select_next_unit | (u32 direction) | void | Finds and selects the next movable unit for the human player. Calls FUN_005b6512 (find next unit in cycle). If found: checks orders (not fortifying/fortified), sets map position (DAT_0064b1b4/b0), scrolls to unit, calls thunk_FUN_004274a6 (activate unit). Falls back to start_human_turn if no units remain. | MEDIUM |
| 0x00489A0D | medium | FUN_00489a0d | activate_current_unit | (int param) | void | Activates the currently selected unit. Sets DAT_006d1da8=1 (unit_selected state). Validates unit still exists and is controllable. Scrolls map to unit position. Handles network check for multiplayer. Falls back to select_next_unit if current unit invalid. | MEDIUM |

### Cluster: Map Scroll Helper

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00489B9B | small | FUN_00489b9b | scroll_map_to_if_needed | (int x, int y) | void | Scrolls map view to (x,y) only if current view center (DAT_0066ca88/8a) differs. Avoids redundant scrolling. | LOW |

### Cluster: Tutorial System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00489BE2 | xlarge | FUN_00489be2 | check_tutorial_advice | (int unit_idx) | void | Tutorial/advisor system for settler units. String evidence: "BUILDCITY", "MINING", "IRRIGATE", "EXPAND1", "DAMAGE". Checks terrain type at unit position: suggests city building (terrain fertility > 9 and best local), mining (hills without improvements), irrigation (plains/grassland near water), road building (few units, no road, terrain allows). Also advises on expansion timing based on turns since last city founding. Uses PTR_s_TUTORIAL as help file key. Sets DAT_0062c5c0 flag to prevent repeat advice. | HIGH |

### Cluster: Human Turn Main Loop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048A004 | large | FUN_0048a004 | process_human_unit_orders | void | u32 | Main unit order execution loop. Checks tutorial triggers for settlers (role 0x05). Checks damaged unit advisories ("DAMAGE"). Enters main loop: processes current unit's orders via FUN_004c5408, handles dead units (flag 0x8000 -> FUN_00543b80 with 20-iteration kill). Returns 1 if any orders were processed, 0 otherwise. | MEDIUM |
| 0x0048A374 | small | FUN_0048a374 | wait_for_player_input | void | void | Idle loop waiting for player input. Continues while DAT_0062804c != 0, game active (DAT_0064b9bc, DAT_00628044), no unit selected (DAT_006d1da8==0), and unit count stable. Calls thunk_FUN_0046e6c8 (process messages) and thunk_FUN_0040ef50 (idle). | MEDIUM |
| 0x0048A416 | xlarge | FUN_0048a416 | human_turn_main_loop | void | void | The main human player turn loop. Initializes unit selection, processes pending diplomatic encounters (DAT_0062c468 array). Loops: syncs MP state, handles unit selection, processes goto orders, shows timer-based events. Inner loop: process_human_unit_orders or wait_for_player_input. Manages end-of-turn conditions. Cleanup: kills enemy observer units (DAT_00655b05), resets state. String: "Primary.cpp - human_turn - Timer" (source file evidence). | HIGH |

### Cluster: Demographics / Ranking

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048A92D | medium | FUN_0048a92d | calc_demographic_extremes | void | void | Calculates min/max demographics across human civs for 4 categories. Stores max at DAT_00673afc[4] and min at DAT_00673af8[4]. Sources from civ+0xB7 (offset within civ struct = attitude/score data). Used for demographic comparison screen. | MEDIUM |

### Cluster: Turn Advisors / Milestones

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048AA24 | xlarge | FUN_0048aa24 | check_turn_advisors | void | u32 | Start-of-turn advisor checks. Every 50 turns (if replay enabled): shows "COUNCILTIME" dialog with largest city and score. Handles tutorial messages at turns 1/20/28/40/60/80 ("FIRSTMOVE", "HELP1", "HELP2"). Special one-city check at turn 35 ("ONECITY"). Expansion reminder every 24 turns with < 6 cities ("EXPAND0"). | HIGH |

### Cluster: Game End Conditions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048AEDC | large | FUN_0048aedc | check_game_end_conditions | void | u32 | Checks retirement/scenario end conditions. Year 2000: "PLANRETIRE" warning. Year 2020 (0x7E4): "DORETIRE" forced end, sets game_flags |= 2 (game over), DAT_0064b1ac=5. Scenario mode (DAT_0064bcb8): warns 5 turns before end ("SCENARIOENDS"), forces end at limit ("SCENARIOEND"). Returns 1 if game ended, 0 otherwise. | HIGH |
| 0x0048B165 | medium | FUN_0048b165 | show_victory_screen | void | bool | Displays appropriate victory/defeat screen based on DAT_0064b1ac: 1/2=spaceship (FUN_004710d0), 3=domination (FUN_00514e7b), 4=conquest (FUN_004702e0), 5=retirement. Then shows replay and hall of fame. Single player: asks "KEEPPLAYING" to continue. Returns true if game should end. | HIGH |

### Cluster: Single-Player / Hot-Seat Game Loop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048B340 | xlarge | FUN_0048b340 | game_loop_singleplayer | void | void | The master game loop for single-player and hot-seat modes. Outer loop: calls calc_demographic_extremes, process_end_of_turn, check_game_end_conditions, show_victory_screen. Inner loop iterates all 8 civ slots: for AI civs shows "HOTSEATAITURN", for human civs shows "HOTSEATTURN" dialog with turn info. Handles hot-seat player switching (saves/restores view positions DAT_00654b40/50/60), email-play mode ("EMAILDONE1/2"), casualty reports ("CASUALTY/CASUALTIES"). Calls do_full_civ_turn, check_turn_advisors, human_turn_main_loop per civ. String: "HOTHUMANSDEAD" when all human civs eliminated in hotseat. | HIGH |
| 0x0048BF2D | stub | FUN_0048bf2d | crt_destructor_game_loop_1 | void | void | CRT destructor thunk (FUN_0059df8a). Called at end of game_loop_singleplayer. FRAMEWORK | LOW |
| 0x0048BF43 | stub | FUN_0048bf43 | seh_unwind_game_loop_1 | void | void | SEH unwind. Restores FS:[0]. FRAMEWORK | LOW |

### Cluster: Multiplayer Client Game Loop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048BF51 | small | FUN_0048bf51 | mp_client_poll_handler | void | void | Client-side polling. Calls thunk_FUN_0048da51 (timeout check). If any termination condition met (server data received, quit requested, disconnected, game over): invalidates window for redraw. | MEDIUM |
| 0x0048BFEC | xlarge | FUN_0048bfec | game_loop_mp_client | void | void | Multiplayer client game loop. String evidence: "Server: %s (%d)", "Client: %s (%d)", "CLIENTHOTWAIT", "OURTURNTOMOVE", "CASUALTY", "CASUALTIES". Initializes from server state, centers map on player's unit/city, waits for server's turn signal. Receives and processes turn data: unit movement, city updates, casualties display. Calls do_full_civ_turn, check_turn_advisors, human_turn_main_loop. Handles server transfer (FUN_004828a5) and disconnection. | HIGH |
| 0x0048C9CE | stub | FUN_0048c9ce | crt_destructor_mp_client | void | void | CRT destructor thunk. FRAMEWORK | LOW |
| 0x0048C9E4 | stub | FUN_0048c9e4 | seh_unwind_mp_client | void | void | SEH unwind handler. FRAMEWORK | LOW |

### Cluster: Multiplayer Server Game Loop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048C9F3 | xlarge | FUN_0048c9f3 | game_loop_mp_server | (char initial_sync) | void | Multiplayer server game loop. String evidence: "Server: %s (%d)", "Client: %s (%d)", "CASUALTY", "CASUALTIES", "OURTURNTOMOVE", "NEWPLAYER". Server orchestrates all turns: iterates civs, for server-owned civ does full processing (human turn, AI diplomacy, production), for client-owned civs sends turn signal and waits for response (FUN_0048d9ad/0048da51 timeout monitoring). Handles player disconnection, new player joining ("NEWPLAYER" dialog). Uses GetAsyncKeyState(ESC) for fast-forward. Calls process_end_of_turn with param=-3 (full path recalc). | HIGH |
| 0x0048D989 | stub | FUN_0048d989 | crt_destructor_mp_server | void | void | CRT destructor thunk. FRAMEWORK | LOW |
| 0x0048D99F | stub | FUN_0048d99f | seh_unwind_mp_server | void | void | SEH unwind handler. FRAMEWORK | LOW |

### Cluster: Multiplayer Turn Synchronization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0048D9AD | small | FUN_0048d9ad | mp_send_turn_signal | (int civ_id) | void | Sends turn-ready signal to a client. If DAT_006c31d0 (direct host mode)==0: sends network message 0x2B to player. Sets timestamp (_DAT_00673b00 = GetTickCount). Also resets some connection state variables (DAT_006c9090, DAT_00626a2c, DAT_006c91e4). | MEDIUM |
| 0x0048DA51 | small | FUN_0048da51 | mp_check_client_timeout | (int civ_id) | void | Checks if client has timed out. If more than 0xE0F (3599) ms since last signal: increments timeout counter for that civ (DAT_006c3168), or re-sends turn signal if in retry mode (DAT_006c9090). Also increments DAT_006c8fb4 (global disconnection counter). | MEDIUM |
| 0x0048DAB9 | large | FUN_0048dab9 | mp_handle_disconnections | void | u32 | Handles client disconnections. For dedicated server (DAT_006ad2f7): checks if any connected client has gone missing, removes from human bitmask (DAT_00655b0b). For host: checks DAT_006c8fb4 (timeout counter) and shows "LOSTSERVER" dialog. String evidence: "We lost connection to the server", "LOSTSERVER", "LOSTCLIENT". Returns 1 if fatal disconnection, 0 otherwise. | HIGH |
| 0x0048DE75 | medium | FUN_0048de75 | mp_purge_disconnected_players | void | int | Iterates connected player slots (1-6), checks timeout flags (DAT_006c3188). For timed-out players: clears from human bitmask, disconnects socket (FUN_0059b96a), updates DAT_00654fb0 (allowed civs mask). Returns count of purged players. | MEDIUM |

---

## SUMMARY

### 1. Total Functions and Breakdown

**Total: 44 functions**

| Category | Count | Functions |
|----------|-------|-----------|
| Core Game Loop | 6 | game_loop_singleplayer, game_loop_mp_client, game_loop_mp_server, process_end_of_turn, do_full_civ_turn, human_turn_main_loop |
| Turn Processing | 6 | process_civ_turn, heal_units, begin_turn_unit_reset, refresh_map_visibility, check_tech_advance, calc_power_graph_rankings |
| Barbarian/Events | 2 | spawn_barbarians, apply_global_warming |
| Pollution/Env | 1 | update_pollution_counter |
| Calendar/Year | 2 | calc_year_from_turn, advance_year_display |
| Game End/Victory | 3 | check_game_end_conditions, show_victory_screen, check_turn_advisors |
| Human Turn Control | 5 | start_human_turn, select_next_unit, activate_current_unit, wait_for_player_input, process_human_unit_orders |
| Multiplayer Network | 13 | mp_client_transfer_server, mp_server_quit_handler, mp_send_turn_signal, mp_check_client_timeout, mp_handle_disconnections, mp_purge_disconnected_players, mp_relink_event_strings, mp_client_poll_handler, and 5 message handlers |
| Tutorial/Advisor | 2 | check_tutorial_advice, check_population_milestone |
| Init/Utility | 4 | init_scenario_vars, clear_game_active_flag, init_game_display, handle_quit_game |
| FRAMEWORK (CRT/SEH) | 8 | 4 destructor thunks, 4 SEH unwind handlers |
| Other | 4 | auto_save_game, check_trade_route_path, calc_demographic_extremes, scroll_map_to_if_needed, calc_tech_paradigm_cost, mp_copy_player_info |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0048B340 (game_loop_singleplayer)** - The master game loop for single-player and hot-seat modes. This is one of the most critical functions in the entire executable: it orchestrates all turn processing, player switching, victory conditions, and game flow.

2. **FUN_00487A41 (process_civ_turn)** - Per-civ turn processing including city production, AI rate setting, and Alpha Centauri scoring. Contains the AI's science/tax rate calculation logic and government-dependent constraints.

3. **FUN_004853E7 (calc_power_graph_rankings)** - Computes power scores, maintains the historical power graph, and triggers Alpha Centauri victory cascade. Reveals the exact score formula: `tech_count*3 + research*8 + gold/32 + weighted_unit_sum`.

4. **FUN_00485C15 (spawn_barbarians)** - Complete barbarian spawning logic: timing, unit type selection per era, strength scaling by difficulty, and the barbarian uprising (raid) system targeting human cities.

5. **FUN_00484FEC (calc_year_from_turn)** - The turn-to-year calendar calculation with its 6-segment piecewise formula and scenario override support. Essential for understanding game timeline.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Proposed Name | Evidence |
|--------|--------------|----------|
| DAT_006ad698 | mp_quit_status | Values 0/1/2: tracks multiplayer quit state. 0=running, 1=quitting, 2=quit_confirmed |
| DAT_006ad664 | mp_connected_player_count | Used as player count minus 1 for wait loops |
| DAT_006ad308 | mp_player_slot_count | Count of active player slots (iterated 0-6) |
| DAT_006ad8b8 | mp_timeout_seconds | Multiplied by 60 (0x3C) for ms timeout, by 1000 for XD_OpenConnection |
| DAT_006c9038 | mp_server_data_received | Network flag: set when server sends turn data to client |
| DAT_006c8ff0 | mp_connection_confirmed | Network flag: set when connection handshake completes |
| DAT_006c8fb4 | mp_timeout_counter | Incremented on timeout, checked for disconnection |
| DAT_00655b09 | barbarian_level | 0=off, 1=mild, 2=moderate, 3=raging (controls spawn rates) |
| DAT_00655b0e | pollution_pressure | 0-99 counter, triggers global warming at >16 |
| DAT_00655b0f | warming_event_count | Number of global warming events that have occurred |
| DAT_00655c1e | next_random_event_turn | Turn at which next random event fires (resets to turn + rand(40) + 20) |
| DAT_0062c5b8 | in_civ_turn_processing | Flag=1 during do_full_civ_turn, 0 otherwise |
| DAT_0062c5c0 | tutorial_advice_shown | Set to 1 after showing tutorial advice, prevents repeats |
| DAT_006d1da8 | unit_selection_state | 0=no unit, 1=unit selected and active |
| DAT_00628048 | starting_civ_index | Non-zero in scenario/MP: first civ to process this turn |
| DAT_0062c488 | scenario_reload_flag | Non-zero when scenario data needs reloading mid-turn |
| DAT_006c31d0 | mp_direct_host_mode | 0=normal network, non-zero=direct hosting mode |
| DAT_006c9090 | mp_retry_signal_mode | 0=normal, 1=retry mode for turn signal |
| DAT_0062c5b4 | winning_civ_id | Civ that triggered game end (spaceship landing, etc.) |
| DAT_0064b1ac | game_end_reason | 0=none, 1=spaceship_self, 2=spaceship_other, 3=domination, 4=conquest, 5=retirement |
