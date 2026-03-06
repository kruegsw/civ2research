# Function Audit: block_004E0000.c (0x004E0000 - 0x004EFFFF)

## Overview
This block contains the **main menu command dispatcher**, **game options dialogs**, **city production/economics engine**, and **happiness/trade calculations** -- the economic heart of Civilization II MGE.

---

### Cluster: CRT/MFC Initialization Stubs

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e0140 | stub | FUN_004e0140 | crt_init_wrapper | void | void | Calls crt_alloc_heap + crt_register_atexit. CRT init pair. | MEDIUM |
| 004e015a | stub | FUN_004e015a | crt_alloc_heap | void | void | Calls thunk_FUN_005786f1(0x1000) — heap allocation. FRAMEWORK | MEDIUM |
| 004e0179 | stub | FUN_004e0179 | crt_register_atexit | void | void | Registers FUN_004e0196 via _atexit(). FRAMEWORK | HIGH |
| 004e0196 | stub | FUN_004e0196 | crt_cleanup_handler | void | void | Atexit cleanup thunk. FRAMEWORK | MEDIUM |
| 004e02cb | stub | FUN_004e02cb | dialog_cleanup_1 | void | void | Calls thunk_FUN_0059df8a() — MFC dialog destructor thunk. FRAMEWORK | MEDIUM |
| 004e02e1 | stub | FUN_004e02e1 | seh_unwind_1 | void | void | SEH frame unwind (FS_OFFSET restore). FRAMEWORK | HIGH |

---

### Cluster: Game Options Dialogs

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e01b0 | medium | FUN_004e01b0 | show_wonder_selection_dialog | void | void | Dialog listing 0x1C (28) wonders using get_improvement_name(). Loops improvements starting at index 0x27 (39 = first wonder). User selects wonder from list, calls thunk_FUN_004bb8e0 (Civilopedia?). SEH protected. | HIGH |
| 004e02ef | large | FUN_004e02ef | init_city_windows_layout | void | void | Sets up city dialog window rects (DAT_0067a8f8, DAT_0068ad38). Calculates centered positions. Handles 800×520 vs 520×335 sizes based on DAT_0067a8fc flag. Iterates 7 civs checking DAT_0066ca84 (stride 0x3f0). Calls SetRect WinAPI. | MEDIUM |
| 004e068d | large | FUN_004e068d | load_game_handler | void | void | Load game logic. Calls load_verify_units(0,0,0). On success: sets current player flags (DAT_00654fa4, DAT_00628048), resets save format version, recalculates human_civs_bitmask. Handles multiplayer sound flag (DAT_00655aea bit 3). Re-initializes city windows if DAT_00655280 set. String ref: version "5.4.0f Multiplayer 26 March 99". | HIGH |
| 004e0a8c | stub | FUN_004e0a8c | set_checkbox_state | (idx, bool_val) | void | Wraps thunk_FUN_0051d7d6 — sets checkbox state in dialog. | MEDIUM |
| 004e0ab0 | large | FUN_004e0ab0 | show_game_options_dialog | void | void | Game Options dialog. Reads/writes DAT_00655aea flag bits (0x10, 0x8, 0x4000, 0x2000, 0x1000, 0x800, 0x400, 0x200, 0x100, 0x80, 0x40). String: "GAMEOPTIONS". Shows version "Patch 3". Saves to DAT_0064bc1e. | HIGH |
| 004e0d71 | medium | FUN_004e0d71 | show_graphic_options_dialog | void | void | Graphic Options dialog. Reads/writes DAT_00655aea bits (0x20000, 0x40000, 0x200000, 0x80000, 0x100000, 0x10000). String: "GRAPHICOPTIONS". Checks 0x800000 memory allocation for one option. String: "LOWMEMORY". | HIGH |
| 004e0f18 | large | FUN_004e0f18 | show_multiplayer_options_dialog | void | void | Multiplayer Options dialog. Strings: "MULTIPLAYEROPTIONS", "MULTIPLAYEROPTIONS2", "PMCHANGESERVER", "PMCHANGEYES", "PMCHANGENO". Handles DAT_006665fa-00 options, server change protocol with XD_FlushSendBuffer. | HIGH |
| 004e1314 | medium | FUN_004e1314 | toggle_unit_movement_doubling | void | void | Toggles land unit movement rate doubling. When DAT_00654fae set and DAT_00628068==0: doubles move_rate for all domain==0 (land) unit types (DAT_0064b1c2, stride 0x14). When cleared: halves them back. Uses DAT_0064b1c1 (domain field check). | HIGH |
| 004e1452 | large | FUN_004e1452 | show_message_options_dialog | void | void | Message Options dialog. Reads/writes DAT_00655af2 bits (0x1 through 0x400). String: "MESSAGEOPTIONS". 11 checkboxes controlling which game messages are suppressed. Saves to DAT_0064bc22. | HIGH |
| 004e25ef | medium | FUN_004e25ef | show_pick_music_dialog | void | void | Music picker dialog. Polls CD drive (FUN_005ddeff) for disc type: 0x18=Fan Worlds, 0x12=Scenario, 0xC=Gold, 0xA=standard. Strings: "PICKMUSICFANWORLDS", "PICKMUSICSCENARIO", "PICKMUSICGOLD", "PICKMUSIC", "NOPICKMUSICNEW". SEH protected. | HIGH |
| 004e27df | stub | FUN_004e27df | dialog_cleanup_2 | void | void | MFC dialog destructor thunk. FRAMEWORK | MEDIUM |
| 004e27f5 | stub | FUN_004e27f5 | seh_unwind_2 | void | void | SEH frame unwind. FRAMEWORK | HIGH |
| 004e2597 | small | FUN_004e2597 | toggle_hidden_terrain | void | void | Toggles hidden terrain cheat. Sets DAT_0062804c=0, DAT_0062bcd8=1, refreshes view, shows "HIDDENTERRAIN" string, restores DAT_0062bcd8=0, refreshes again. | HIGH |

---

### Cluster: Kill/Retire Civ and Multiplayer Synchronization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e1763 | xlarge | FUN_004e1763 | kill_or_retire_civ | (civ_id, destroy_assets, allow_rebirth) | void | Massive civ elimination function (2918B). Clears human_civs_bitmask bit. If destroy_assets: iterates all units (stride 0x20), kills owned units, clears veteran flags on units captured from this civ, unlinks unit chains (prev/next at +0x16/+0x18). Iterates all cities (stride 0x58), deletes owned cities, clears trade routes pointing to deleted cities, clears wonder city assignments (DAT_00655be6). Clears city radius tiles, updates visibility. If allow_rebirth: calls new_civ(). MP path: sends network message 0x34, waits for server response with 0xe10 timeout. Strings: "KillOrRetire: Connection to serv...", "SERVERCONNECTTIME", "KillOrRetire: Received NM_KILL_O...". | HIGH |
| 004e22c9 | large | FUN_004e22c9 | handle_quit_or_retire | (is_retire) | void | Quit/Retire handler. If retire: shows "REALLYRETIRE", shows scores/graphs. If quit: shows "REALLYQUIT". Handles SP vs hotseat vs MP cases. For MP: sends player stats, calls kill_or_retire_civ. Sets DAT_006ad685=1 on completion. Saves hotseat human_civs_bitmask to DAT_006c31a9. | HIGH |

---

### Cluster: Main Menu Command Dispatcher

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e2803 | xlarge | FUN_004e2803 | main_menu_command_dispatch | (wParam, command_id) | void | **THE main menu WM_COMMAND handler** (4219B). Giant switch on command_id (param_2). Guards against re-entry via 14 DAT_006ad8XX busy flags. Command IDs mapped: 0x101=GameOptions, 0x102=GraphicOptions, 0x103=MessageOptions, 0x104=MultiplayerOptions, 0x105=unknown, 0x106=PickMusic, 0x110=SaveGame, 0x120=LoadGame, 0x130=unknown, 0x131=unknown, 0x132=unknown, 0x1f0=Retire, 0x1f1=Quit, 0x1f2=QuitHotseat, 0x201=TaxRate, 0x205=Revolution, 0x210=unknown, 0x220=unknown, 0x301/302=EndTurn/WaitProduction, 0x310/311=ZoomIn/ZoomOut, 0x320=MaxZoom, 0x321=ResetView, 0x322/324=ZoomPresets, 0x327=ToggleGrid, 0x328=ArrangeWindows, 0x330=HiddenTerrain, 0x340=FindCity, 0x401=BuildCity, 0x410-0x413=BuildRoad/Irrigate/Mine/Transform, 0x417-0x421=misc orders, 0x430-0x490=more orders, 0x500=CityStatus, 0x501-0x508=Advisors, 0x601=WondersOfWorld, 0x602-0x606=Demographics/SpaceRace/etc, 0x701=Cheat menu toggle, 0x711-0x770=cheat subcommands, 0x801-0x809=Scenario editor, 0x901-0x90d=Civilopedia pages, 0x9f0=Credits. Shift+key checks via GetAsyncKeyState(0x10). String: "Mainmenu: menu_exec: blocked by...". | HIGH |
| 004e3a86 | xlarge | FUN_004e3a86 | build_main_menu_bar | void | void | Builds the entire menu bar (4575B). Uses thunk_FUN_00578b06 (set menu name), thunk_FUN_00578c12 (add menu item). Creates 9 top-level menus: Game(1), Kingdom(2), View(3), Orders(4), Advisors(5), World(6), Cheat(7), Editor(8), Pedia(9). Menu item IDs match command_dispatch above. Strings: "KINGDOM", "ORDERS", "ADVISORS", "WORLD", "CHEAT", "EDITOR", "PEDIA". Sets up accelerator keys (0x3c shortcuts). Handles cheat menu visibility based on DAT_00655aea bit 0x8000. Calls thunk_FUN_00578e38 to register command_dispatch as handler. | HIGH |
| 004e4c92 | small | FUN_004e4c92 | update_menu_item_label | (menu_id, string_id, enabled) | void | Updates a menu item's label text and enabled state. Used by update_menu_state to dynamically relabel items based on context (e.g., "Build Road" vs "Build Railroad"). | MEDIUM |
| 004e4ceb | xlarge | FUN_004e4ceb | update_menu_state | void | void | Updates menu item enabled/disabled/checked states (3761B). Examines current unit (DAT_00655afe), terrain under unit, unit type domain/role. Enables/disables: build city (0x401), road/irrigate/mine/transform (0x410-0x413), pillage (0x418), airlift (0x417), fortify (0x430), unload (0x41b), goto (0x420), disband (0x421), etc. Checks terrain type (ocean=10), tile improvements (bitmask & 0x42), city presence. Handles cheat menu visibility, editor menu visibility based on password check. Multiplayer: disables Orders menu if not your turn. | HIGH |

---

### Cluster: Wonder Acquisition (MP sync)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e7240 | stub | FUN_004e7240 | manage_window_wrapper | void | void | Wraps manage_window_C692. Window management thunk. FRAMEWORK | LOW |
| 004e7270 | medium | FUN_004e7270 | acquire_wonder | (civ_id, city_idx, wonder_idx, cost, building_id) | int | Wonder acquisition with MP synchronization. Sets wonder city in DAT_00655be6, sets city flag 0x100, calls has_building setter. MP path: sends message 0x47 to server, waits with 0xe10 timeout. String: "Acquire Wonder: Connection to se...". Returns 1 on success. | HIGH |

---

### Cluster: City Production Cost and Type Classification

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e7458 | small | FUN_004e7458 | classify_production_type | (city_idx, production_id) | int | Returns 0=unit, 1=building (id >= -0x22), 2=wonder (id < -0x22). Used by check_unit_support for government-based free support thresholds. | HIGH |
| 004e7492 | small | FUN_004e7492 | init_city_production_globals | (city_idx) | void | Sets DAT_006a65a4 = production type classification, DAT_006a6528 = city shield_box value (city+0x1C). | MEDIUM |
| 004e74df | small | FUN_004e74df | calc_food_box_with_difficulty | (city_idx, production_id) | uint | Returns adjusted food box size. If difficulty != 0 and production type changed, applies DAT_0064bcda percentage reduction to DAT_006a6528. | MEDIUM |

---

### Cluster: City Worker Tile Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e7549 | small | FUN_004e7549 | set_worker_tile_status | (city_idx, tile_slot, status) | void | Sets 2-bit worker tile status at city+0x16 (worker_tiles bitfield). slot < 16: clear 2 bits then OR in status. Matches DAT_0064f356 = city[0]+0x16. | HIGH |
| 004e75a6 | small | FUN_004e75a6 | get_worker_tile_status | (city_idx, tile_slot) | uint | Gets 2-bit worker status from city+0x16. Returns 1 for slot >= 16 (out of range). | HIGH |
| 004e75ea | small | FUN_004e75ea | count_worker_tiles_with_status | (city_idx, target_status) | int | Counts tiles in city radius (0..15) matching given status. Used to count entertainer/taxman/scientist specialists. | HIGH |

---

### Cluster: City Tile Evaluation and Radius Scanning

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e7641 | large | FUN_004e7641 | evaluate_city_tiles | (city_idx) | void | Scans city radius (0..24 tiles) using CitySpiralDX/DY. For each tile: checks map bounds, ownership, enemy units (flag 0x04), human player presence (flag 0x20), city presence (flag 0x08). Fills DAT_006a6530[] with per-tile status flags. Updates DAT_00655b10 pollution counter. | HIGH |
| 004e78ce | small | FUN_004e78ce | is_tile_worked | (city_idx, tile_slot) | bool | Tests bit in city+0x30 (improvements_lo/worker assignment bitmask at +0x30). Returns whether tile `tile_slot` is being worked by city. | MEDIUM |
| 004e790c | small | FUN_004e790c | set_tile_worked | (city_idx, tile_slot, value) | void | Sets or clears a bit in city+0x30 worker assignment bitmask. | MEDIUM |
| 004e7967 | large | FUN_004e7967 | calc_capital_distance_and_corruption | (city_idx) | void | Calculates capital distance (DAT_006a6588) by finding nearest same-civ palace city. If palace present: distance=0, else checks has_building(city, 0x20=courthouse). Checks nearby enemy cities for tile overlap (distance<3). Sets DAT_006a6574 based on whether city shares continent and has courthouse+palace. | HIGH |

---

### Cluster: Unit Support and Shield Row Calculation (Known Functions)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e7d7f | medium | FUN_004e7d7f | check_unit_support | (city_idx, unit_idx, govt_type) | int | **Already documented.** Increments DAT_006a660c (unit counter). Switch on govt_type (0-4): checks free support thresholds (DAT_0064bcd5/d6/d7). Returns cost in DAT_006a6568 if unit exceeds free limit. Settler check (role==5, flag bit 8). | HIGH |
| 004e7eb1 | medium | FUN_004e7eb1 | calc_food_box_size | (city_idx, civ_id) | void | **Already documented.** Calculates food box per citizen (DAT_006a6560) using COSMIC[3] (DAT_0064bccb). AI difficulty scaling. Handles raging hordes (+2 to content if applicable). "Late game" adjustment based on turn > 200. | HIGH |
| 004e80b1 | xlarge | FUN_004e80b1 | calc_shields_per_row | (city_idx) | void | **Already documented.** Calculates shields per row (DAT_006a657c) from COSMIC[4] (DAT_0064bccc). AI difficulty scaling same pattern as food_box_size. Iterates all units to calculate: support cost (DAT_006a6568), military abroad count (DAT_006a65e4), in-city military (DAT_006a655c), settler count (DAT_006a65d8). Clears unit status flags 0xF3FF, sets 0x800 (shield cost) and 0x400 (abroad penalty). | HIGH |

---

### Cluster: Tile Resource Calculation (Known Function)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e868f | xlarge | FUN_004e868f | calc_tile_resource | (city_idx, tile_slot, resource_type) | int | **Already documented.** Calculates food(0)/shields(1)/trade(2) for a city tile. Uses terrain_resource_table (DAT_00627cca). Checks irrigation/mining/road bonuses. Harbor (+1 food on ocean), offshore platform (+1 shield on ocean), Colossus (+1 trade). Despotism penalty (>2 reduced by 1). Government bonus for trade (Republic/Democracy). River bonus. Pollution halves output. | HIGH |
| 004e8c8c | medium | FUN_004e8c8c | check_auto_irrigation_trigger | (city_idx, civ_id, resource_type, tile_x, tile_y) | void | Checks if tile should trigger auto-improvement suggestion (DAT_006a65d4 counter). Only fires during full recalc (DAT_0062edf4 && DAT_0062edf8). Checks terrain improvement prerequisites and government level thresholds. | MEDIUM |
| 004e8db5 | small | FUN_004e8db5 | check_road_trade_trigger | (city_idx, civ_id, tile_x, tile_y) | void | Checks if road/railroad would generate trade on this tile. Updates DAT_0062ee0c improvement suggestion flag. Requires river or tech prerequisite (tech 7 = Engineering?). | MEDIUM |
| 004e8e4d | small | FUN_004e8e4d | calc_tile_all_resources | (city_idx, tile_slot, accumulate) | void | Wrapper: calls calc_tile_resource 3 times (food/shield/trade), stores in DAT_006a65b8[3]. If accumulate: adds to DAT_006a65c8 running totals (food_surplus/shield_surplus/trade_gross). | MEDIUM |
| 004e8ecf | small | FUN_004e8ecf | clear_and_check_worked_tiles | (city_idx) | uint | Iterates 20 tile slots, calls FUN_004f3d30 (validate tile assignment), clears invalid assignments via set_tile_worked(0). Returns OR of flag 0x20 (any specialist reassignment needed). | MEDIUM |

---

### Cluster: AI Worker Tile Assignment Algorithm

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e8f42 | xlarge | FUN_004e8f42 | assign_worker_tiles | (city_idx) | void | **Major AI function (2002B).** Assigns citizens to city radius tiles. Phase 1: honors existing locked assignments. Phase 2: assigns city center tile (slot 0x14). Phase 3: greedy assignment — picks best unassigned tile by food priority, then shields×2+trade. While food surplus < size×food_per_citizen, keep assigning. Phase 4: fills remaining from "idle" pool, scoring by priority weights (food surplus need, shield surplus, trade). Stores result in city+0x30 (packed bitmask + specialist count in upper 6 bits). Handles WLTKD bonus specialists, civil disorder forced reassignment. | HIGH |
| 004e9719 | small | FUN_004e9719 | adjust_specialist_count | (city_idx, delta) | void | Adjusts specialist count stored in upper bits of city+0x30. Each specialist = 0x4000000 in the bitfield. Positive delta = add specialists, negative = remove. | MEDIUM |
| 004e97ae | small | FUN_004e97ae | sync_worker_tile_status | (city_idx) | void | Synchronizes worker tile assignment status (city+0x16) with the bitmask from assign_worker_tiles. Fills first DAT_006a6604 unset slots with status=1, clears remaining. | MEDIUM |

---

### Cluster: Corruption and Waste Calculation (Known Functions)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e9849 | small | FUN_004e9849 | calc_corruption_divisor | (city_idx, govt_level) | int | **Already documented.** Returns divisor (4-8) based on government level. Base=4, +1 per level >0, extra +1 at levels 2,3, extra +1 at level 5. | HIGH |
| 004e989a | large | FUN_004e989a | calc_corruption | (city_idx, trade_value, cap_flag, full_calc) | int | **Already documented.** Main corruption formula. Uses capital distance (DAT_006a6588), capped at 16 if cap_flag set. Formula: (distance × trade × 3) / (divisor × 20). Halved by courthouse or palace. Full_calc mode: stores per-government-level breakdown in DAT_0064ca74. Communism uses flat rate (COSMIC[16]=DAT_0064bcd8). Democracy/Fundamentalism = 0 corruption. | HIGH |

---

### Cluster: City Production Chain (Shield/Science/Gold/Luxury)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004e9c14 | large | FUN_004e9c14 | calc_city_production | (city_idx) | void | **Shield production and power plant calculations.** Checks buildings: 0xF=Factory(+50%), 0x10=MfgPlant(+50%), 0x13-0x15=power plants, 0x1D=Recycling. Calculates DAT_006a65f8 (power multiplier: 1-3). Counts trade route caravans (DAT_006a65c4: techs 0x25,5,0x30,0x3E,0x4A,0x1A). Calculates waste (DAT_006a656c) from corruption formula. Zeros waste for barbarians, Democracy, Fundamentalism, or cities without palace/capital link. | HIGH |
| 004ea031 | medium | FUN_004ea031 | adjust_happy_unhappy | (city_idx, phase) | void | **Already documented.** Balances happy/unhappy citizens (DAT_006a6550/DAT_006a65a8) ensuring total doesn't exceed city size minus specialists. Clamps values. Stores phase results into per-phase arrays (DAT_006a6620/65f0/6628). | HIGH |
| 004ea1f6 | xlarge | FUN_004ea1f6 | distribute_trade | (city_idx, net_trade, pass, extra_gold) | void | **Already documented.** Distributes net trade into luxury/science/gold using civ rates. DAT_006a65fc=luxury, DAT_006a6578=science, DAT_006a6554=gold. Handles Fundamentalism science cap (COSMIC[21]). Applies building multipliers: Marketplace/Bank/Stock Exchange (+50% each lux+gold), Library/University/ResearchLab (+50% each science). Tithe bonus (temple-based gold income). Newton's doubles science buildings. Copernicus doubles total science. Capitalization (production 0x26) redirects shields to gold. | HIGH |
| 004ea8e4 | xlarge | FUN_004ea8e4 | calc_happiness | (city_idx) | int | **Already documented (2627B).** Master happiness calculation. Calls calc_corruption for trade routes, distribute_trade, then elaborate happiness: martial law (units in city), empire size unhappy, Colosseum, Temple effects (Ceremonial Burial, Mysticism, Oracle doubling), Cathedral (Theology/Monotheism), City Walls+Democracy bonus, Fundamentalism zeroing, military unhappy (Women's Suffrage), wonder effects (Hanging Gardens +1/+3, Shakespeare=0 unhappy, JS Bach -2, Cure for Cancer +1). Returns happy - unhappy. | HIGH |

---

### Cluster: City Full Recalculation Pipeline

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004eb327 | medium | FUN_004eb327 | calc_trade_route_income | (city_idx) | void | Calculates trade route income. Counts supply routes with negative commodity (DAT_006a65b0), finds partner city (DAT_006a6570). Scans all cities for routes pointing to this city, adds incoming trade (DAT_006a6558). Net effect adjusts DAT_006a65c8. | MEDIUM |
| 004eb4a1 | small | FUN_004eb4a1 | recalc_city_all | (city_idx) | void | Orchestrator: calls assign_worker_tiles, calc_trade_route_income, sync_worker_tile_status, calc_city_production, calc_happiness in sequence. Full city recalculation pipeline. | HIGH |
| 004eb4ed | small | FUN_004eb4ed | calc_city_production | (city_idx, full_recalc) | int | **Already documented.** If city_idx == -1: return 0. If full_recalc: calls evaluate_city_tiles, calc_capital_distance, calc_shields_per_row, then recalc_city_all. If not: just returns happy-unhappy from DAT_006a6550/65a8. | HIGH |

---

### Cluster: City Event Notification Dialogs

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004eb571 | large | FUN_004eb571 | show_city_event_dialog | (event_string, city_idx, show_flag, extra_text) | void | Shows a city event notification (building completed, disorder, etc.). Checks DAT_00654fa8 (test mode) and DAT_006a65ac. Formats city name + coordinates. Lists two buttons (improvements from DAT_00628420+0x80/0x84). Handles "BUILT" string with auto-production flag check. SEH protected. | HIGH |
| 004eb7e5 | stub | FUN_004eb7e5 | dialog_cleanup_3 | void | void | MFC dialog destructor. FRAMEWORK | MEDIUM |
| 004eb7fb | stub | FUN_004eb7fb | seh_unwind_3 | void | void | SEH frame unwind. FRAMEWORK | HIGH |
| 004eb80a | large | FUN_004eb80a | show_city_event_dialog_v2 | (label, city_idx, icon, show_flag, civ_id) | void | Enhanced city event dialog with rendered sprite. Creates a render context (FUN_005cedad), formats city name, shows improvement icon. Used for wonder completion, production complete with visual. SEH protected. | MEDIUM |
| 004ebbad | stub | FUN_004ebbad | render_ctx_cleanup | void | void | Calls FUN_005cde4d — render context cleanup. FRAMEWORK | LOW |
| 004ebbb9 | stub | FUN_004ebbb9 | surface_cleanup | void | void | Calls FUN_005c656b — surface cleanup. FRAMEWORK | LOW |
| 004ebbcf | stub | FUN_004ebbcf | seh_unwind_4 | void | void | SEH frame unwind. FRAMEWORK | HIGH |

---

### Cluster: City Food Processing (Growth/Famine)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004ebbde | xlarge | FUN_004ebbde | process_city_food | (city_idx) | int | Handles food growth and famine (1512B). If food_surplus (city+0x1A) < 0: **famine** — finds first settler to disband, or shrinks city size. If city size drops to 0: calls delete_city + kill_civ. Handles trade route cancellation on famine partner (DAT_006a6570). If food_surplus >= growth threshold (size+1)*food_per_citizen: **growth** — increments size, checks Granary (building 3) / Pyramids (wonder 0) for half-carry, checks aqueduct requirement (building 9, with "AQUEDUCT" string). At size 2 for AI: calls auto-build (FUN_00441b11). Strings: "FAMINE0", "GHOSTTOWN", "FURTHERGROWTH", "AQUEDUCT". Returns 1 if city deleted, 0 otherwise. | HIGH |

---

### Cluster: Diplomat/Caravan Unit Production

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004ec1c6 | medium | FUN_004ec1c6 | assign_caravan_commodity | (city_idx, unit_idx) | void | Assigns a trade commodity to a newly-built caravan/freight unit. Tries to pick from city's supply_commodities (city+0x3B, 3 entries). Falls back to random selection. Sets unit+0x0D (home_city link) and city flag 0x1000. | MEDIUM |
| 004ec312 | small | FUN_004ec312 | handle_espionage_discovery | (civ_id) | void | Handles when an espionage building (building 0x14=Intelligence Agency) is built. Sets civ flag 0x10 ("embassy" equivalent), adjusts attitudes of all other civs toward this civ by -25 (0xFFFFFFE7). Clears their intel flag. | MEDIUM |

---

### Cluster: City Production Completion — THE BIG ONE

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004ec3fe | xlarge | FUN_004ec3fe | process_city_production | (city_idx) | void | **THE master production completion function (10931B = ~850 lines).** Handles EVERYTHING when a city accumulates enough shields. Two major branches: **Building/Wonder production** (production_id < 0): checks if already built, wonder race (acquire_wonder), barracks replacement, special wonder effects (Manhattan Project = notify all civs, Palace = capital move, Intelligence Agency = espionage_discovery, Apollo = space race, SETI = recalc). Shows "BUILT"/"BUILT2" dialogs. Handles capitalization (production 0x26). For AI: triggers auto-AI buy logic with gold (DAT_0064c6a2). Tracks "almost wonder" warnings for human. **Unit production** (production_id >= 0): checks obsolete tech → auto-upgrade. Creates unit via FUN_005b3d06. Sets veteran status based on Barracks/Port/Airport + Sun Tzu. Special: settlers reduce city size, diplomats get random destination, caravans get commodity assignment, nuclear units set Communist flag. AI gold assist: steals gold from treasury to accelerate key production. Shows "CARAVANBUILT" dialog for human caravans (3 commodity choices). Strings: "BADBUILD", "BADSPACE", "BUILT", "BUILT2", "MANHATTAN", "MOVECAPITAL", "UPGRADED", "CARAVANBUILT", "CARACONFIRM", "NOFOODREPORT", "GHOSTTOWN", "ALMOSTWONDER", "CHERNOBYL". | HIGH |
| 004eeee7 | stub | FUN_004eeee7 | dialog_cleanup_5 | void | void | MFC dialog destructor. FRAMEWORK | MEDIUM |
| 004eeef3 | stub | FUN_004eeef3 | dialog_cleanup_6 | void | void | MFC dialog destructor. FRAMEWORK | MEDIUM |
| 004eeeff | stub | FUN_004eeeff | dialog_cleanup_7 | void | void | MFC dialog destructor. FRAMEWORK | MEDIUM |
| 004eef15 | stub | FUN_004eef15 | seh_unwind_5 | void | void | SEH frame unwind. FRAMEWORK | HIGH |

---

### Cluster: Unit Support Disbandment (Shield Deficit)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004eef23 | large | FUN_004eef23 | process_unit_support_deficit | (city_idx) | void | Handles unit disbandment when city can't support its units (1621B). If shield surplus < support cost: finds most distant non-essential unit (furthest from city, not in city, not a settler). Disbands it, refunds half shield cost to city. For civil disorder + Communism-equivalent government: may disband different unit. Clears city disorder flags on disband. Human player: shows "SUPPORT" notification. Loops back to re-check after each disband until shield surplus >= 0. | HIGH |

---

### Cluster: City Disorder and WLTKD (Known Function)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004ef578 | xlarge | handle_city_disorder_004ef578 | handle_city_disorder | (city_idx) | void | **Already named.** Handles civil disorder onset and recovery (1614B). If happy < unhappy: disorder! Sets city flags 0x4001, shows "DISORDER" dialog, plays sound 0x0E. Democracy + sustained disorder = revolution (calls FUN_0055c69d to change government). Recovery: clears disorder flags 0x4001, shows "RESTORED". WLTKD: if happy==unhappy and positive trade surplus: sets flag 0x4000. WLTKD growth: if Republic/Democracy and food surplus allows, city grows. Adds gold to civ treasury on stable turn. | HIGH |

---

### Cluster: City Science Contribution and Nuclear Meltdown

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004efbc6 | medium | FUN_004efbc6 | process_city_science | (city_idx) | void | Applies science bonus from city to civ research. If human civ researching a valid tech and difficulty==0 (chieftain): doubles science output. For AI with space race advantage: doubles science for missing SS components (buildings 0x23-0x25). Calls thunk_FUN_004c2b73 to add science to civ's research accumulator. | MEDIUM |
| 004efd44 | large | FUN_004efd44 | process_city_pollution_and_meltdown | (city_idx) | int | Handles pollution events and nuclear meltdown (940B). Calculates pollution chance from population×difficulty. If random check passes: places pollution on random city-radius tile (FUN_005b90df). Shows "POLLUTION" notification. Nuclear meltdown: if city has Nuclear Plant (building 0x15) and no SDI/Recycling, random chance (scaled by difficulty) triggers meltdown — destroys improvements, shows "CHERNOBYL". Tech check: containment tech (0x20) prevents meltdown. Returns nonzero on meltdown. | HIGH |

---

## SUMMARY

### 1. Total Functions: 78

### 2. Breakdown by Category

| Category | Count | Notes |
|----------|-------|-------|
| **City Economics/Production** | 28 | Core game engine: food, shields, trade, happiness, corruption, worker assignment |
| **UI / Menu System** | 12 | Main menu builder, command dispatcher, option dialogs |
| **City Events / Notifications** | 10 | Disorder, WLTKD, famine, production complete, pollution |
| **Game State / Civ Management** | 8 | Kill/retire civ, quit/retire, load game, multiplayer sync |
| **Framework (CRT/MFC/SEH)** | 18 | Stubs: dialog destructors, SEH unwinders, heap alloc, atexit |
| **AI Decision Making** | 2 | Worker tile assignment, unit support disbandment |

### 3. Five Most Important Undocumented Functions

1. **004ec3fe `process_city_production`** (10931B) — The master city production completion handler. Covers buildings, wonders, units, auto-upgrade, special effects (Manhattan Project, Palace, Apollo, SETI), caravan commodities, settler city-shrink, AI gold assist. The single largest function in the block.

2. **004e2803 `main_menu_command_dispatch`** (4219B) — The WM_COMMAND handler for the entire game UI menu bar. Maps ~80 command IDs to their handler functions. Essential for understanding the UI architecture.

3. **004e3a86 `build_main_menu_bar`** (4575B) — Builds all 9 top-level menus (Game, Kingdom, View, Orders, Advisors, World, Cheat, Editor, Pedia) with their complete item trees. Documents the full menu structure.

4. **004e8f42 `assign_worker_tiles`** (2002B) — The AI/auto citizen assignment algorithm. Implements the greedy tile-picking strategy with food/shield/trade priority weighting. Core to understanding city AI behavior.

5. **004e1763 `kill_or_retire_civ`** (2918B) — Complete civ elimination: unit disposal, city deletion, trade route cleanup, wonder reassignment, map visibility clearing, and multiplayer synchronization protocol.

### 4. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_00655aea | game_options_flags | Bit-mapped game options (0x8=sound, 0x10=animations, 0x8000=cheat mode, etc.) Modified by GAMEOPTIONS/GRAPHICOPTIONS dialogs |
| DAT_00655af2 | message_suppression_flags | Bit-mapped message filter (0x1=growth, 0x2=production, etc.) From MESSAGEOPTIONS dialog |
| DAT_0064bc1e | saved_game_options | Backup of game_options_flags, written after dialog close |
| DAT_0064bc22 | saved_message_options | Backup of message_suppression_flags |
| DAT_00628068 | movement_doubling_active | 0/1 flag for land unit movement doubling (multiplayer option) |
| DAT_006a65ac | city_dialog_active | Flag indicating a city event dialog is currently showing |
| DAT_006a65a0 | further_dialog_pending | Set to 1 when user selects item in city event list |
| DAT_006a6570 | trade_route_partner_city | City index of trade route partner (for famine/supply cut handling) |
| DAT_006a65b0 | negative_trade_route_count | Count of trade routes with negative (supply) commodities |
| DAT_006a6558 | incoming_trade_count | Count of incoming trade routes from other cities |
| DAT_006a65dc | worker_reassign_needed | Flag set when current tile assignments are invalid |
| DAT_006a654c | unassigned_citizens | Number of citizens not yet assigned to tiles |
| DAT_006a6604 | specialist_count | Number of specialist slots to fill |
| DAT_006a65d4 | auto_improve_counter | Counter for tiles needing auto-improvement suggestions |
| DAT_006a65e0 | suggest_improve_x | X coordinate of tile needing improvement |
| DAT_006a65e8 | suggest_improve_y | Y coordinate of tile needing improvement |
| DAT_0062edf4 | calc_full_mode | Flag for full resource calculation (with auto-improvement checks) |
| DAT_0062edf8 | calc_accumulate_mode | Flag for accumulating stats to civ-level counters during calc |
| DAT_0062ee00 | city_dialog_open | Flag indicating city dialog is currently open (triggers UI updates) |
| DAT_0062ee04 | city_dialog_needs_refresh | Flag to refresh city dialog after food/production changes |
| DAT_006a6618 | tithe_bonus_accum | Accumulated tithe bonus from temples/cathedrals (already in reference) |
| DAT_006a65f8 | power_plant_multiplier | 1=none, 2=factory-level, 3=factory+mfg. Used in shield calculation |
| DAT_006a65c4 | trade_route_bonus_count | Count of active trade route bonuses from wonder/tech chain |
| DAT_006a6584 | pollution_from_production | Pollution contribution from shield production |
| DAT_00654fa8 | test_mode_flag | When set, suppresses dialogs (AI testing / scenario mode) |
| DAT_006ad8ec | kill_civ_busy_flag | Re-entry guard for kill_or_retire_civ |
| DAT_006ad8e8 | wonder_acquire_busy_flag | Re-entry guard for wonder acquisition |
| _DAT_006a6610 | last_completed_building | Last building/wonder completed by human player (-1 = none) |
