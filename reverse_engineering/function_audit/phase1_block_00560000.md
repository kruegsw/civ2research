# Phase 1 Audit: block_00560000.c (0x00560000 - 0x0056FFFF)

## Function Analysis

### Cluster: AI Diplomacy Processing

These functions handle AI-to-AI and AI-to-human diplomatic interactions at the start of each civ's turn. They process treaty violations, war declarations, peace offers, alliance requests, and tribute demands.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00560084 | xlarge | FUN_00560084 | ai_diplomacy_turn_processing | (int civ_id) | void | Main per-civ diplomacy processing on turn start. Clears civ flags (&0xffb7), updates government type (civ+0x15), rolls AI random seed (civ+0x16, rand()%100), toggles senate override bit (flag 0x04 with 1/3 chance), decrements patience counter (civ+0x1F). Iterates all other civs checking treaty states: detects alliance violations via treaty flags (&0x20), processes war end events (string "WARENDS"), delegates to FUN_00560d95 for AI-to-human diplomacy and FUN_00562021 for alliance proposals. References "WARENDS", checks save_format_version (DAT_00655b02>2 for MP), uses thunk_FUN_00453e51 (has_tech) and thunk_FUN_0055c69d (set_government). | HIGH |
| 0x00560D95 | xlarge | FUN_00560d95 | ai_evaluate_diplomacy | (int ai_civ, uint human_civ) | void | AI evaluates diplomatic stance toward another civ. Calls thunk_FUN_0055bbc0 to gather border info, references DAT_006ab5e4 (nearest city index), DAT_006ab5e8 (military threat level). Handles several cases: AI peacetime approach near cities ("NEARCITY"/"ADMIRECITY"), ceasefire violations ("INTRUDER"/"INTRUDERS"/"VIOLATOR"/"VIOLATORS"), withdrawal demands ("WITHDRAWN"), senate scandal ("SENATESCANDAL"), treaty violation ("VIOLATE"). Complex scoring of diplomatic attitude based on: gold (civ+0x02), tech count (civ+0x10), military power (civ+0x6E via ushort), leader personality traits (DAT_006554f8/f9/fa), difficulty level, AI persona (DAT_00655c22). Calls thunk_FUN_00456f20 (set_attitude). | HIGH |
| 0x00562021 | xlarge | FUN_00562021 | ai_propose_alliance_or_crusade | (int ai_civ, int human_civ) | void | AI proposes alliance against a third party or crusade/jihad. Triggered periodically ((turn & 0x1f) == civ<<2). Searches for a mutual enemy (local_64) where ai has contact, target has no alliance, and military power comparison warrants action. Two paths: (1) "HELPME" - request alliance with gold tribute, offering a tech; (2) "CRUSADE"/"JIHAD" - request joint military action. Sets treaty flags (0x80800=war, 0x2000=alliance), updates contact turns, transfers gold between civs. Uses tech_table (DAT_0062768e/8f) and thunk_FUN_004bd9f0 (has_tech), thunk_FUN_004bdb2c (tech_value), thunk_FUN_004bf05b (give_tech). | HIGH |

### Cluster: CD-ROM / File Path Resolution

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00564470 | medium | FUN_00564470 | find_cdrom_path | (undefined4 filename) | undefined4 | Extracts exe directory via GetModuleFileNameA, strips filename to get base path (DAT_006ab600). Tries to find file on CD-ROM drives (calls FUN_0056459f twice), shows "CDROMNOTFOUND2" message if not found. Returns 1 on success, 0 on failure. | HIGH |
| 0x00564549 | stub | FUN_00564549 | is_cdrom_path_empty | (void) | bool | Returns true if DAT_006ab680 (CD-ROM drive letter buffer) is empty (first byte '\0'). | HIGH |
| 0x00564574 | stub | FUN_00564574 | get_cdrom_path | (void) | char* | Returns pointer to DAT_006ab680 if non-empty, else NULL. | HIGH |
| 0x0056459F | large | FUN_0056459f | scan_drives_for_cdrom | (undefined4 filename) | char* | Scans all logical drives via GetLogicalDrives/GetLogicalDriveStringsA. For each drive of type 3 (DRIVE_FIXED — note: likely checking for removable/CD type), attempts OpenFile with OF_EXIST flag (0x4000). Sets DAT_006ab680 to found drive letter. Returns pointer to path or NULL. | HIGH |
| 0x00564713 | large | FUN_00564713 | resolve_file_path | (LPCSTR filepath) | undefined4 | Multi-strategy file path resolution. Tries: (1) exe base directory + filename, (2) relative path from first backslash, (3) CD-ROM path + full path. Uses OpenFile with OF_EXIST. On success, rewrites param_1 in-place with resolved path. Returns 1 on found, 0 on not found. Uses SetErrorMode(1) to suppress error dialogs. | HIGH |

### Cluster: Numeric Parsing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00564BF0 | small | FUN_00564bf0 | parse_number_literal | (char* str) | int | Parses number with prefix detection: "0x" = hex (thunk_FUN_0046e8f0), "0b" = binary (thunk_FUN_005bad40), "0d" = explicit decimal, else plain atoi. | HIGH |

### Cluster: Civilopedia Display

These functions implement the Civilopedia (in-game encyclopedia) UI, displaying tech trees, prerequisite chains, and related game concepts.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00564D00 | large | FUN_00564d00 | pedia_init_list | (void) [this=ECX] | void | Initializes Civilopedia list view. Validates selected index (ECX+0x120), copies item list (ECX+0x7EC array of size ECX+0x658) to display buffer (ECX+0x1B38). Sets scrollbar range via thunk_FUN_0040fd40 and position via thunk_FUN_0040fcf0. Aligns to 9-item pages (DAT_006a85a4). Calls thunk_FUN_00451bf0, thunk_FUN_004923c0, thunk_FUN_004518d0, thunk_FUN_004f6646. | MEDIUM |
| 0x00564E6D | xlarge | FUN_00564e6d | pedia_draw_tech_detail | (void) [this=ECX] | void | Draws detailed Civilopedia entry for a technology. Gets selected tech ID from item list (ECX+0x7EC[ECX+0x120]). Counts related items: techs with this as prerequisite (DAT_0062768e/f, stride 0x10), improvements needing this tech (DAT_0064c48e, stride 8), unit types needing this tech (DAT_0064b1cb, stride 0x14). Renders tech name with clickable links (thunk_FUN_00452c14), shows prerequisite techs, lists improvements in 2-column layout, lists unit types, shows wonder obsolescence (DAT_0064ba28). Reads "PEDIA" file, handles "describe_" and "pedia_" text files. References "PEDIACIVFACTS" string, specific tech IDs (0x36, 0x0F, 0x1F, 0x47, 0x15, 0x12, 0x42, 0x43, 0x46, 0x38, 0x18, 0x59, 0x3B, 0x20, 0x3C). | HIGH |
| 0x00566584 | large | FUN_00566584 | pedia_select_entry | (int tech_id) [this=ECX] | void | Selects and navigates to a specific Civilopedia entry. Finds tech_id in item list, updates selection index (ECX+0x120), refreshes display. Calls thunk_FUN_00564e6d to redraw detail, thunk_FUN_004f8a9b to get display text. | MEDIUM |
| 0x005666DA | xlarge | FUN_005666da | pedia_draw_tech_tree | (void) [this=ECX] | void | Draws the technology tree diagram. Shows selected tech and its prerequisite chain (2 levels deep: parent techs, then grandparent techs, then great-grandparent level with 8 entries). Uses tech_table prerequisites (DAT_0062768e/f for prereq1/prereq2) to build tree. Draws connecting lines via thunk_FUN_005674b9 and thunk_FUN_005675b7. Lays out nodes in hierarchical columns with clickable tech names (thunk_FUN_00452c14). | MEDIUM |

### Cluster: Tech Tree Drawing Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005674B9 | medium | FUN_005674b9 | draw_tree_connector_line | (int x, int y_start, int x_target, int y_end) | void | Draws a connecting line between tech tree nodes. Uses FUN_005c19ad to set pen color (10=black shadow, 0x7A=green/highlight) and FUN_005c11b2 to draw line segments. Draws 3-pixel-wide line (shadow + center + shadow) vertically, then optionally horizontal extension to target. | MEDIUM |
| 0x005675B7 | small | FUN_005675b7 | draw_tree_horizontal_line | (undefined4 x_start, int y) [this=ECX] | void | Draws horizontal line from (x_start, y) to left edge of panel (ECX+0x5F8). 3-pixel wide (shadow lines at y-1 and y+1, main line at y). Colors: 10=black, 0x7A=green. | MEDIUM |

### Cluster: CRT/MFC Static Initializers

All of these are C++ static object constructor/destructor registration patterns. They construct global objects and register atexit handlers for cleanup.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005680A0 | stub | FID_conflict___E31 | static_init_surface_a | (void) | void | FRAMEWORK: Calls FUN_005680ba (init) + FUN_005680d4 (register atexit). Initializes FUN_005c64da surface object. | HIGH |
| 0x005680BA | stub | FUN_005680ba | static_init_surface_a_ctor | (void) | void | FRAMEWORK: Calls FUN_005c64da (surface constructor). | HIGH |
| 0x005680D4 | stub | FUN_005680d4 | static_init_surface_a_atexit | (void) | void | FRAMEWORK: Registers FUN_005680f1 via _atexit. | HIGH |
| 0x005680F1 | stub | FUN_005680f1 | static_init_surface_a_dtor | (void) | void | FRAMEWORK: Calls FUN_005c656b (surface destructor). | HIGH |
| 0x0056810B | stub | FID_conflict___E31 | static_init_surface_b | (void) | void | FRAMEWORK: Calls FUN_00568125 + FUN_0056813f. Initializes FUN_005bd630 surface object. | HIGH |
| 0x00568125 | stub | FUN_00568125 | static_init_surface_b_ctor | (void) | void | FRAMEWORK: Calls FUN_005bd630 (surface constructor). | HIGH |
| 0x0056813F | stub | FUN_0056813f | static_init_surface_b_atexit | (void) | void | FRAMEWORK: Registers FUN_0056815c via _atexit. | HIGH |
| 0x0056815C | stub | FUN_0056815c | static_init_surface_b_dtor | (void) | void | FRAMEWORK: Calls FUN_005bd915 (surface destructor). | HIGH |

### Cluster: Art Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00568176 | stub | FUN_00568176 | return_true | (void) | undefined4 | Always returns 1. Likely a virtual function stub or feature check. | LOW |
| 0x005681C9 | large | load_civ2_art_005681c9 | load_civ2_art | (void) | void | Loads "civ2\\civ2art.dll" art resource. Resolves path via thunk_FUN_00564713, loads GIF resource 999 via FUN_005bf5e1 (10 colors, 0xEC=236 palette entries, to DAT_006ab6a8). Creates render context via FUN_005cedad. Shows "Failed to load civ2art.gif" MessageBox on failure. String evidence: "civ2\\civ2art.dll", "Failed to load civ2art gif". | HIGH |
| 0x00568348 | stub | FUN_00568348 | load_art_cleanup_timevec | (void) | void | FRAMEWORK: Destructor call for _Timevec at EBP-0x114. | HIGH |
| 0x00568354 | stub | FUN_00568354 | load_art_cleanup_string | (void) | void | FRAMEWORK: Calls FUN_005cde4d (CString destructor). | HIGH |
| 0x0056835D | stub | FUN_0056835d | load_art_cleanup_surface | (void) | void | FRAMEWORK: Calls FUN_005bd915 (surface destructor). | HIGH |
| 0x00568373 | stub | FUN_00568373 | load_art_restore_seh | (void) | void | FRAMEWORK: Restores FS:[0] SEH chain from saved value. | HIGH |
| 0x00568381 | stub | FUN_00568381 | post_art_load_init | (void) | void | Calls thunk_FUN_004083f0 (end GDI paint), thunk_FUN_0046ee1e (palette update), thunk_FUN_005683b5 (no-op). Post-load initialization sequence. | MEDIUM |
| 0x005683A5 | stub | FUN_005683a5 | noop_a | (void) | void | Empty function (no-op). Likely a virtual function placeholder. | HIGH |
| 0x005683B5 | stub | FUN_005683b5 | noop_b | (void) | void | Empty function (no-op). Likely a virtual function placeholder. | HIGH |

### Cluster: Screen Transition Animation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005683C5 | xlarge | FUN_005683c5 | animate_screen_reveal | (CRichEditCntrItem* surface, RECT* bounds, uint block_size, int pattern) | undefined4 | Screen reveal/transition animation. Divides screen into blocks of size `block_size`, creates coordinate array for progressive reveal. Supports 5 patterns: 1=bottom-to-top, 2/5=top-to-bottom, 3=left-to-right, 4=bottom-right-to-top-left. Pattern 5 uses fully random order (thunk_FUN_0059a791=random_range), others use semi-random with locality bias. Allocates global memory for block coordinate pairs. Calls thunk_FUN_00408490 (invalidate_rect) for each block. Note: GetActiveView calls are Ghidra FID misidentifications (actually surface width/height accessors). | MEDIUM |

### Cluster: Civ Epoch Determination

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00568861 | small | FUN_00568861 | get_civ_era_level | (undefined4 civ_id) | undefined4 | Returns era level: 2 if civ has techs 5 (Trade) AND 0x18 (Navigation), 1 if has techs 0x3C (Industrialization) AND 0x26 (Railroad), else 0. These are epoch-determining tech pairs for city sprite era selection. Uses thunk_FUN_004bd9f0 (has_tech). | HIGH |

### Cluster: More CRT/MFC Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00568B00 | stub | FID_conflict___E31 | static_init_cityname_renderer | (void) | void | FRAMEWORK: Init+atexit for thunk_FUN_0055339f (city name renderer). | HIGH |
| 0x00568B1A | stub | FUN_00568b1a | static_init_cityname_ctor | (void) | void | FRAMEWORK: Calls thunk_FUN_0055339f. | HIGH |
| 0x00568B34 | stub | FUN_00568b34 | static_init_cityname_atexit | (void) | void | FRAMEWORK: Registers FUN_00568b51 via _atexit. | HIGH |
| 0x00568B51 | stub | FUN_00568b51 | static_init_cityname_dtor | (void) | void | FRAMEWORK: COleCntrFrameWnd destructor on DAT_006abc68. | HIGH |
| 0x00568B6B | stub | FID_conflict___E31 | static_init_c | (void) | void | FRAMEWORK: Init+atexit for thunk_FUN_0043c690 / thunk_FUN_0043c520. | HIGH |
| 0x00568B85 | stub | FUN_00568b85 | static_init_c_ctor | (void) | void | FRAMEWORK: Calls thunk_FUN_0043c690. | HIGH |
| 0x00568B9F | stub | FUN_00568b9f | static_init_c_atexit | (void) | void | FRAMEWORK: Registers FUN_00568bbc via _atexit. | HIGH |
| 0x00568BBC | stub | FUN_00568bbc | static_init_c_dtor | (void) | void | FRAMEWORK: Calls thunk_FUN_0043c520. | HIGH |
| 0x00568BD6 | stub | FID_conflict___E31 | static_init_d | (void) | void | FRAMEWORK: Init+atexit for thunk_FUN_0043c690 / thunk_FUN_0043c520. | HIGH |
| 0x00568BF0 | stub | FUN_00568bf0 | static_init_d_ctor | (void) | void | FRAMEWORK: Calls thunk_FUN_0043c690. | HIGH |
| 0x00568C0A | stub | FUN_00568c0a | static_init_d_atexit | (void) | void | FRAMEWORK: Registers FUN_00568c27 via _atexit. | HIGH |
| 0x00568C27 | stub | FUN_00568c27 | static_init_d_dtor | (void) | void | FRAMEWORK: Calls thunk_FUN_0043c520. | HIGH |

### Cluster: Status Window Management

These functions manage the status/info panel shown in the main game view (the right-side panel that shows current unit, terrain info, and minimap).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00568C41 | stub | FUN_00568c41 | status_window_lock | (void) | void | Sets DAT_00633e00 = 1 (status window locked/painting flag). | MEDIUM |
| 0x00568C58 | stub | FUN_00568c58 | status_window_unlock_and_refresh | (void) | void | Calls thunk_citywin_9545 (close city window?), sets DAT_00633e00 = 0 (unlock), calls thunk_FUN_0056a787 (full status redraw). | MEDIUM |
| 0x00568C7E | stub | FUN_00568c7e | status_window_lock_and_update | (void) | undefined4 | Sets DAT_00633e00 = 1, calls thunk_FUN_00408090 (update window). Returns 0. | MEDIUM |
| 0x00568CA2 | large | FUN_00568ca2 | calc_status_panel_layout | (void) | void | Calculates status panel dimensions based on screen resolution (DAT_006abd94 width, DAT_006abd98 height). Determines zoom scale (2/3/4) based on thresholds: >244px width AND >302px height => zoom 4; >185px AND >237px => zoom 3; else zoom 2. Sets DAT_006abf44 (panel header height: 40/60/80), DAT_006abc5c (info area height), DAT_006abf40=8, DAT_006abc58/60 (panel dimensions). Updates font size via thunk_FUN_0043c6c0 when DAT_00633df8 or DAT_00633df4 change. | MEDIUM |

### Cluster: Status Panel Drawing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00568E86 | medium | FUN_00568e86 | draw_status_advisor_icon | (undefined4 advisor_type) | void | Draws advisor/notification icon in status panel. Checks DAT_00633e00 (not locked) and DAT_006abc5c (panel visible). Gets advisor icon via thunk_FUN_0043cab0, draws at position DAT_006abf2c/f30 with offset. Invalidates rect for repaint. | MEDIUM |
| 0x00568F43 | large | FUN_00568f43 | draw_status_turn_info | (int invalidate) | void | Draws turn number and current civ info in status panel header. Checks DAT_00633e00 (not locked), DAT_0062804c, DAT_00633dfc, DAT_00655aee (flags). Prepares surface via thunk_FUN_005a9b5d. Sets text style via thunk_FUN_005baee0. Draws text at DAT_006abc18 coords. Shows label 0x1b and 0x1c strings (turn count labels). Conditionally invalidates rectangle. | MEDIUM |
| 0x0056911D | small | FUN_0056911d | draw_coordinate_text | (undefined4 x_val, undefined4 y_val, undefined4 draw_x, undefined4 draw_y) | undefined4 | Formats and draws "(x,y)" coordinate text. Builds string with label 0x0B prefix, x value, comma separator, y value, then appends result of thunk_FUN_005b8a81 (terrain type name). Draws via thunk_FUN_0043c8d0. | MEDIUM |

### Cluster: Unit Orders Display

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005691A1 | large | FUN_005691a1 | format_unit_orders_text | (int unit_idx) | void | Formats unit orders/destination text for display. Reads unit orders byte (unit+0x0F, &0xF): -1 or >15 = label 0x1A (no orders), 5 = checks tile improvements (road flag 0x10) for "Go To" with road/railroad distinction (label 0xA0 vs uRam006554b8), 0xB = goto with city name at destination (unit+0x12/0x14 goto coords). For goto, tries to find city at destination via thunk_FUN_0043cf76, shows city name or raw coords. Other orders use lookup table at DAT_00655490+order*8. | HIGH |

### Cluster: Status Panel Main Drawing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00569363 | large | FUN_00569363 | draw_status_panel_header | (int do_prepare) | void | Draws the top portion of the status panel (civ name, turn year, gold, tax/science rates, research progress). If do_prepare!=0, prepares surface. Draws pollution indicator (DAT_00655b14). Shows civ name (thunk_FUN_0043ca50), turn year (thunk_FUN_00421f10 with DAT_00655afa), gold amount (civ+0x02), science rate (civ+0x13), tax rate (civ+0x14). Draws research beaker icons (thunk_FUN_0047df20). Calculates research progress as fraction (research_accum*4/tech_cost via thunk_FUN_004c2788). Shows scenario flag indicator (DAT_00655b0e). | HIGH |
| 0x00569801 | xlarge | FUN_00569801 | draw_status_panel_units | (void) | void | Main status panel body drawing. Calls thunk_FUN_00569363(0) for header, then draws active unit info and tile info in the status area (DAT_006abfa8 region). For active unit (DAT_00655afe): draws unit sprite via thunk_FUN_0056baff, movement points (current/max with fractional display, label 0x0C), unit name, type, owner, home city. Draws terrain info: terrain name (from DAT_00627cc4), river flag (label 0x12), special resources, improvements (road 0x10/railroad 0x20, irrigation 0x04/mining 0x08, fortress 0x40/airbase, pollution 0x80). Lists stacked units with sprites and info (iterates linked list via thunk_FUN_005b2c82). Shows "N more units" if space runs out (labels 0x18/0x19). Sets up scrollable chat area (DAT_006abc18-24) if multiplayer flag set (DAT_00655aee & 1). | HIGH |

### Cluster: Status Panel Refresh

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056A65E | large | FUN_0056a65e | refresh_status_panel | (int invalidate) | void | Refreshes both status panel sections (header at DAT_006abc28 and body at DAT_006abfa8). Guards on DAT_00633e00 (not locked). Prepares surfaces, calls thunk_FUN_00568ca2 (calc layout), thunk_FUN_00569801 (draw units/terrain). Invalidates both panel rects if invalidate!=0. | MEDIUM |
| 0x0056A787 | large | FUN_0056a787 | full_status_redraw | (void) | void | Complete status panel redraw with scrollbar setup. Guards on DAT_00633e00 and DAT_00628044. Calls thunk_FUN_00552ed2 (prep), thunk_FUN_00568ca2 (layout), prepares surface, sets up panel regions (header at DAT_006abc28, body at DAT_006abfa8), calls thunk_FUN_0056a65e(0) for content, thunk_FUN_00552112 (begin_paint) / thunk_FUN_00408460 (end_paint). Sets up scrollbar buttons and chat area dividers if multiplayer. | MEDIUM |
| 0x0056A98B | small | FUN_0056a98b | handle_end_turn_button | (void) | void | Handles end-turn button click. If DAT_0062edf8 (city dialog open), calls thunk_FUN_005013bc. Otherwise: if multiplayer (DAT_00655aee & 1), clears DAT_0064b9bc; if not multiplayer and DAT_006d1da8==1 (normal mode), calls thunk_FUN_004897fa(0); else calls thunk_FUN_00489a0d(1). | MEDIUM |

### Cluster: Main Game Window Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056A9F4 | small | FUN_0056a9f4 | calc_main_window_rect | (void) | void | Calculates main game window client area rectangle (DAT_00655334) based on DAT_00655324 (map view rect), subtracting status bar heights (DAT_006335a4, DAT_006335a0). Uses thunk_FUN_00414bb0 for screen bottom. | MEDIUM |
| 0x0056AA7F | stub | FUN_0056aa7f | invalidate_main_window_a | (void) | void | Invalidates DAT_00655334 rect via thunk_FUN_004080f0. | MEDIUM |
| 0x0056AAA5 | stub | FUN_0056aaa5 | invalidate_main_window_b | (void) | void | Identical to FUN_0056aa7f: invalidates DAT_00655334 rect. Likely duplicate or called from different context. | MEDIUM |
| 0x0056AACB | large | FUN_0056aacb | setup_main_game_window | (void) | void | Main game window initialization. Sets DAT_00633e00=0 (unlock status). Calculates window rect if needed (thunk_FUN_0056a9f4). Sets up window handlers: keyboard (thunk_map_ascii via tie()), mouse (LAB_00402914, etc.), idle (LAB_00401e06), scroll. Creates status panel (DAT_006abc68), sets dialog control IDs. Calls FUN_005bb574 for additional init. Shows window if not single-player (DAT_00655b02 != 1). String reference: improvement name from DAT_00628420+0x14. | MEDIUM |
| 0x0056AC46 | stub | FUN_0056ac46 | close_main_game_window | (void) | void | Sets DAT_00633e00=1 (lock), calls thunk_FUN_004083b0 (close window). | MEDIUM |

### Cluster: Minimap Drawing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056AC67 | large | FUN_0056ac67 | draw_minimap_overlay | (int percent, int highlight_row) | void | Draws overlay on minimap (DAT_006abfa8 area). Initializes surface (FUN_005bd630) on first call (lazy init with atexit). Caches previous state (DAT_00633e08, DAT_00633e0c) to avoid redundant redraws. Copies surface buffer, draws highlight bar at percent position, invalidates rect. Only active when status panel unlocked (DAT_00633e00==0), panel visible (DAT_006abc5c!=0), and current player is human. | MEDIUM |
| 0x0056AEED | stub | FUN_0056aeed | minimap_surface_dtor | (void) | void | FRAMEWORK: atexit cleanup, calls FUN_005bd915 (surface destructor). | HIGH |

### Cluster: String Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056B810 | stub | FUN_0056b810 | strip_trailing_newline | (char* str) | char* | Finds last '\n' (newline, char 10) in string via _strrchr, replaces with '\0'. Returns pointer to removed newline position, or NULL if none found. | HIGH |
| 0x0056B847 | stub | FUN_0056b847 | append_newline | (char* str) | void | Appends '\n' to end of string. Gets strlen, sets str[len]='\n', str[len+1]='\0'. | HIGH |

### Cluster: More CRT/MFC Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056B8A0 | stub | FID_conflict___E31 | static_init_e | (void) | void | FRAMEWORK: Init+atexit for thunk_FUN_0043c690 / thunk_FUN_0043c520. | HIGH |
| 0x0056B8BA | stub | FUN_0056b8ba | static_init_e_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056B8D4 | stub | FUN_0056b8d4 | static_init_e_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056B8F1 | stub | FUN_0056b8f1 | static_init_e_dtor | (void) | void | FRAMEWORK | HIGH |

### Cluster: Unit Shield/Font Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056B90B | small | FUN_0056b90b | set_unit_font_for_zoom | (undefined4 zoom_level) | void | Calculates font size for unit order letters based on zoom level. Uses thunk_FUN_00472cf0(0x20, zoom) to get scaled size, divides by 3. Adjusts 10->11 (avoids size 10). Updates font via thunk_FUN_00417ef0 if changed from DAT_00633e3c. | MEDIUM |

### Cluster: Unit Selection Priority

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056B96E | large | FUN_0056b96e | select_display_unit | (int unit_idx) | int | Selects best unit to display at a tile from a stack. Iterates unit linked list from head (thunk_FUN_005b2d39). Assigns priority: 4 = active selected unit (DAT_00655afe) owned by current player, 2 = non-land (sea/air) unit, 1 = default. Returns -1 for sea units in cities with harbors (thunk_FUN_005b8d15). Used by draw_unit to pick which unit from a stack to show. | MEDIUM |

### Cluster: Unit Rendering (Core)

This is the main unit drawing function, already documented in the reference context.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056BAFF | xlarge | FUN_0056baff | draw_unit | (undefined4 surface, int unit_idx, byte flags, int x, int y, int zoom, int skip_fortify) | void | **Already documented.** Draws a complete unit sprite with all decorations: shield (front/back/shadow), HP bar (green/yellow/red at 1/3/2/3 thresholds using palette 0x2A/0x7A/0x6A), order letter (centered in shield), fortification overlay, sentry dimming (FUN_005cf126 with fill=0x1A). Flag bits: 1=show stacking offset, 2=use select_display_unit, 4=show HP damage. Gets unit owner color via thunk_FUN_0043cab0 and thunk_FUN_0056e1f0. Shield position from DAT_00642c48/642b48 lookup tables per unit type. Draws veteran star indicator. | HIGH |

### Cluster: Sprite Blit Utility

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056C5FC | medium | FUN_0056c5fc | blit_with_clip | (undefined4 src_surf, undefined4 dst_surf, int src_x, int src_y, int src_ox, int src_oy, int dst_x, int dst_y, int dst_ox, int dst_oy, int width, int height) | void | Clips source and destination rectangles to prevent out-of-bounds blitting, then calls thunk_FUN_005a9afe (surface blit). Adjusts coordinates when negative offsets result from origin subtraction. Only blits if both dimensions are positive. | MEDIUM |

### Cluster: Unit Movement Animation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056C705 | xlarge | FUN_0056c705 | animate_unit_movement | (int unit_idx, int from_x, int from_y, int direction, int sound_id, undefined4 sound_param) | void | Animates unit moving between tiles. Uses DAT_00628350/628360 (direction offset tables) for movement vectors. Calculates animation step size based on screen zoom (thunk_FUN_0056e180). Creates up to 8 viewport-specific animation contexts (one per possible viewport in multiplayer). Saves background tile, draws unit at each step position via thunk_FUN_0056baff, restores background, delays between frames using timeGetTime with DAT_00655aea animation speed flags. Plays movement sound (thunk_FUN_0046e020). Sets DAT_006ad908=1 during animation, 0 after. | HIGH |
| 0x0056D25B | stub | FUN_0056d25b | animate_cleanup_surfaces | (void) | void | FRAMEWORK: Vector destructor for 8 surface objects at EBP-0x2FC, stride 0x48. | HIGH |
| 0x0056D27B | stub | FUN_0056d27b | animate_restore_seh | (void) | void | FRAMEWORK: Restores SEH chain. | HIGH |

### Cluster: City Sprite Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056D289 | xlarge | FUN_0056d289 | draw_city_sprite | (undefined4 surface, int city_idx, uint flags, int x, int y, int zoom) | void | Draws city sprite on map. Determines city owner (city+0x08), walled status (has_building check for City Walls id=10 OR Courthouse id=8 with tech 6=Masonry), city size (city+0x09). Calculates epoch style: looks up leader style table (DAT_00655500), checks human overrides (DAT_0064bcf8), overrides for Astronomy(0x25)=4, Trade+Navigation=5 (via FUN_00568861). Calculates size tier (0-3) based on epoch-dependent thresholds. Adds +1 tier if has Barracks (building 1) under certain conditions. Draws city sprite via FUN_005cef31. If city has walls (thunk_FUN_005b8d62), draws wall overlay from separate sprite table (DAT_00640a18/640ad8 offsets). Draws city name and population number using thunk_FUN_0056b90b for font, itoa for size text. Flag 0x1000 = show full info, 0x01 = show name, 0x02 = skip walls. | HIGH |

### Cluster: Zoom Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056E180 | stub | FUN_0056e180 | calc_movement_step_size | (undefined4 base_step) [this=ECX] | void | Calculates animation step size from base step and viewport zoom (ECX+0x2E4). Delegates to FUN_0056e1c0. | MEDIUM |
| 0x0056E1C0 | stub | FUN_0056e1c0 | calc_scaled_step | (int base, int zoom) | int | Returns ((zoom+8)*base+4)/8. Linear scaling formula for zoom-adjusted pixel distances. | MEDIUM |

### Cluster: Civ Color Lookup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056E1F0 | small | FUN_0056e1f0 | get_civ_dark_color | (int civ_id) | undefined4 | Returns dark civ color palette index. For barbarians (civ 0), uses index 0. For others, looks up leader style (civ+0x06 = leader_graphic_id -> DAT_006554fe at stride 0x30) and returns DAT_0065535c[style*0x10]. Used for shield background coloring. | MEDIUM |

### Cluster: Multiplayer Player Popup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056E270 | small | FUN_0056e270 | init_player_popup_state | (void) [this=ECX] | int | Initializes player popup data structure. Sets ECX+4=1, ECX+0x28=0, clears 7 entries at ECX+0x54 (stride 4). Returns this pointer. | MEDIUM |
| 0x0056E2C9 | stub | FUN_0056e2c9 | player_popup_destructor | (void) | void | FRAMEWORK: Calls thunk_FUN_0059baf0 (popup destructor). | HIGH |
| 0x0056E2E9 | xlarge | FUN_0056e2e9 | create_multiplayer_game | (undefined4 param_1, int mode) | undefined4 | Major multiplayer game creation/joining function. Mode 2/3: resets state, initializes player names (DAT_006ad57c/59c/5bc/5dc from DAT_00666550/666570). Mode 0/1: allocates 0x2F4 bytes for player popup, creates DirectPlay session (thunk_FUN_0059db08(0x4000)), sets up GUI with labels 0x288 and 0x120. For hosting: sends DPLSYS_CONNECTIONS and DPLSYS_DPLAYCONNECT lobby messages, waits for join (dialog "WAITINGONJOIN"). Loads game or starts new: calls load_unit_types, load_improvements. Path string: "D:\\Ss\\Franklinton\\startup\\player". Returns 1 on success, 0 on failure. Uses XD_FlushSendBuffer, XD_ServerCloseConnection, XD_StopConnections, XD_LobbySendMessage. | HIGH |

### Cluster: Multiplayer Connection Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056EC92 | medium | FUN_0056ec92 | check_all_players_ready | (void) | void | Checks if all connected multiplayer players have assigned civ slots. Iterates player slots 1-6 (DAT_006ad359 stride 0x54), counts those connected but unassigned (slot == -1). If count==0, sets DAT_006ad640=2 (ready state), sends message 0x28 with param 2. | MEDIUM |
| 0x0056ED62 | stub | FUN_0056ed62 | mp_process_messages | (void) | void | Calls thunk_FUN_0047e94e(1,0) to process pending multiplayer network messages. | MEDIUM |
| 0x0056ED80 | small | FUN_0056ed80 | mp_check_chat_input | (void) | void | Processes multiplayer messages, then checks if chat buffers (DAT_006c9098 or DAT_006c90a8) have content. If so, invalidates the chat display for update. | MEDIUM |
| 0x0056EDD3 | small | FUN_0056edd3 | get_linked_player_node | (int node) | int | Traverses linked list: if node+0x10 (next) exists, returns next. If still at same node and node+0x14 (prev) exists, returns prev. Used for player list navigation. | MEDIUM |
| 0x0056EE2C | medium | FUN_0056ee2c | clear_player_list | (void) [this=ECX] | void | Frees all nodes in a linked list (ECX[10] = head). For each node, frees data buffer (node+8) and node itself. Resets head, counts, and cursor pointers in the parent structure. | MEDIUM |
| 0x0056EED7 | medium | FUN_0056eed7 | remove_player_node | (void* node) [this=ECX] | void | Removes a node from doubly-linked player list. Fixes prev/next pointers, frees node data (node+8) and node itself, decrements count at (*this)+0x28. | MEDIUM |
| 0x0056EF93 | large | FUN_0056ef93 | add_player_to_list | (char* name, uint player_id) [this=ECX] | uint* | Adds a player entry to the end of the linked list. Allocates 0x18-byte node: [0]=flags, [1]=player_id, [2]=strdup(name), [3]=0, [4]=next, [5]=prev. Tracks maximum display width. Sets flags bit 0 if name is empty. Increments count at (*this)+0x28. Returns pointer to new node. | MEDIUM |
| 0x0056F113 | large | FUN_0056f113 | refresh_player_list | (void) | void | Rebuilds the multiplayer player list display. Saves current selection, clears list (thunk_FUN_0056ee2c), re-adds all active players (DAT_006ad359 stride 0x54) with their names. If no network connections, adds default entry (thunk_FUN_0056f301). Restores selection to previously viewed player. | MEDIUM |
| 0x0056F301 | small | FUN_0056f301 | add_default_player_entry | (void) [this=ECX] | void | If player list is empty (count==0), adds a default "waiting" entry with label 0x28C text. Assigns auto-incrementing ID. | MEDIUM |
| 0x0056F372 | small | FUN_0056f372 | find_matching_player_entry | (void) [this=ECX] | int | Checks if the last entry in the player list matches label 0x28C text. Returns the node pointer if single-entry list matches, else 0. Used to detect/remove placeholder entries. | MEDIUM |
| 0x0056F3E0 | small | FUN_0056f3e0 | find_player_by_id | (int player_id) [this=ECX] | int | Searches linked list for a node with matching player_id at node+4. Returns node pointer or 0. | MEDIUM |
| 0x0056F42B | small | FUN_0056f42b | find_player_slot_by_id | (int player_id) | int | Searches player slot array (DAT_006ad354, stride 0x54, 7 entries) for matching player_id. Returns slot index 0-6, or 7 if not found. | MEDIUM |

### Cluster: More CRT/MFC Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056F910 | stub | FID_conflict___E31 | static_init_mp_surface_a | (void) | void | FRAMEWORK: Init+atexit for FUN_005bd630/005bd915. | HIGH |
| 0x0056F92A | stub | FUN_0056f92a | static_init_mp_surface_a_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056F944 | stub | FUN_0056f944 | static_init_mp_surface_a_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056F961 | stub | FUN_0056f961 | static_init_mp_surface_a_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056F97B | stub | FID_conflict___E31 | static_init_mp_string_a | (void) | void | FRAMEWORK: CString at DAT_006ac170. | HIGH |
| 0x0056F995 | stub | FUN_0056f995 | static_init_mp_string_a_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056F9AF | stub | FUN_0056f9af | static_init_mp_string_a_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056F9CC | stub | FUN_0056f9cc | static_init_mp_string_a_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056F9E6 | stub | FID_conflict___E31 | static_init_mp_string_b | (void) | void | FRAMEWORK: CString at DAT_006ac8a8. | HIGH |
| 0x0056FA00 | stub | FUN_0056fa00 | static_init_mp_string_b_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FA1A | stub | FUN_0056fa1a | static_init_mp_string_b_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056FA37 | stub | FUN_0056fa37 | static_init_mp_string_b_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FA51 | stub | FID_conflict___E31 | static_init_mp_string_c | (void) | void | FRAMEWORK: CString at DAT_006ac8e8. | HIGH |
| 0x0056FA6B | stub | FUN_0056fa6b | static_init_mp_string_c_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FA85 | stub | FUN_0056fa85 | static_init_mp_string_c_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056FAA2 | stub | FUN_0056faa2 | static_init_mp_string_c_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FABC | stub | FID_conflict___E31 | static_init_mp_surface_b | (void) | void | FRAMEWORK: FUN_005bd630/005bd915. | HIGH |
| 0x0056FAD6 | stub | FUN_0056fad6 | static_init_mp_surface_b_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FAF0 | stub | FUN_0056faf0 | static_init_mp_surface_b_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056FB0D | stub | FUN_0056fb0d | static_init_mp_surface_b_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FB27 | stub | FID_conflict___E31 | static_init_mp_frame | (void) | void | FRAMEWORK: thunk_FUN_0055339f / COleCntrFrameWnd dtor at DAT_006ac1b0. | HIGH |
| 0x0056FB41 | stub | FUN_0056fb41 | static_init_mp_frame_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FB5B | stub | FUN_0056fb5b | static_init_mp_frame_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056FB78 | stub | FUN_0056fb78 | static_init_mp_frame_dtor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FB92 | stub | FID_conflict___E31 | static_init_mp_bitmap | (void) | void | FRAMEWORK: thunk_FUN_005784a0 / CBitmapButton dtor at DAT_006ac488. | HIGH |
| 0x0056FBAC | stub | FUN_0056fbac | static_init_mp_bitmap_ctor | (void) | void | FRAMEWORK | HIGH |
| 0x0056FBC6 | stub | FUN_0056fbc6 | static_init_mp_bitmap_atexit | (void) | void | FRAMEWORK | HIGH |
| 0x0056FBE3 | stub | FUN_0056fbe3 | static_init_mp_bitmap_dtor | (void) | void | FRAMEWORK | HIGH |

### Cluster: Unit Sprite Blue Marker Detection

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056FBFD | medium | FUN_0056fbfd | detect_blue_marker_pixel | (int unit_type, int sprite_x, int sprite_y) | void | Scans unit sprite to find blue marker pixel (palette index for shield position). Iterates 64 pixels across (0x40) at y=sprite_y-1, marks pixel with value 8 via FUN_005c0c5d. Then scans for specific x position from DAT_00642c48 table (marks with 4). Similarly scans 48 pixels vertically (0x30) at x=sprite_x-1, with specific y from DAT_00642b48. Used during UNITS.BMP recoloring to locate shield anchor point. | MEDIUM |

### Cluster: Sprite Sheet Recoloring (Units + Cities)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0056FCE4 | large | FUN_0056fce4 | recolor_units_spritesheet | (void) | void | Loads and processes UNITS.BMP/GIF sprite sheet. Loads from game directory ("UNITS.BMP"/"UNITS.GIF"), processes all 63 (0x3F) unit sprites in 9-column layout (col stride 0x41=65px, row stride 0x31=49px). For each sprite: calls thunk_FUN_00417f70 (get recolor params), blits twice with FUN_005cef31 (normal blit), calls thunk_FUN_0056fbfd (detect marker pixel). After processing, saves as "UNITS.BMP" via thunk_write_bitmap_data. Uses palette with 10 colors and 0xC0=192 entries. | HIGH |
| 0x0056FFB6 | stub | FUN_0056ffb6 | recolor_units_cleanup_surface | (void) | void | FRAMEWORK: Surface destructor (FUN_005c656b). | HIGH |
| 0x0056FFCC | stub | FUN_0056ffcc | recolor_units_restore_seh | (void) | void | FRAMEWORK: Restores SEH chain. | HIGH |
| 0x0056FFDA | xlarge | FUN_0056ffda | recolor_cities_spritesheet | (void) | void | Loads and processes CITIES.BMP/GIF sprite sheet. Loads from game directory ("CITIES.BMP"/"CITIES.GIF"). Processes: (1) 6 rows x 4 columns of city sprites (standard+walled pairs, y starting at 0x27=39, stride 0x31=49px, x at columns 1 and 0x14E=334), (2) 8 improvement icons at y=0x1A9=425 with stride 0x0F=15px, (3) 4 additional sprites at fixed positions (0x8F, 0xD0, 0x111, 0x152 at y=0x1A7=423 — fortress/airbase sprites). Each sprite gets double-blitted (normal twice) after recoloring. Saves as "CITIES.BMP". | HIGH |

### Cluster: Final Cleanup Stubs (from 0056FFDA)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| (implied 0x0057075C) | stub | FUN_0057075c | recolor_cities_cleanup_surface | (void) | void | FRAMEWORK: Surface destructor. Note: address is beyond 0x0056FFFF range but called from FUN_0056ffda. | HIGH |
| (implied 0x00570772) | stub | FUN_00570772 | recolor_cities_restore_seh | (void) | void | FRAMEWORK: Restores SEH chain. | HIGH |

---

## SUMMARY

### 1. Total Functions: 88

| Category | Count | Notes |
|----------|-------|-------|
| AI Diplomacy | 3 | Core diplomatic AI logic (turn processing, evaluation, alliance proposals) |
| Civilopedia UI | 4 | Tech detail display, tech tree diagram, entry selection, list init |
| Tech Tree Drawing | 2 | Connector line drawing helpers |
| Status Panel | 11 | Layout calculation, header/body drawing, refresh, turn info |
| Unit Rendering | 3 | draw_unit (already documented), font setup, display unit selection |
| City Rendering | 1 | City sprite drawing with epoch/walls/size |
| Movement Animation | 3 | Unit movement animation + cleanup |
| Sprite Recoloring | 4 | Units/Cities BMP recoloring pipeline |
| File Path / CD-ROM | 5 | Path resolution, CD-ROM scanning |
| Multiplayer | 13 | Game creation, player list management, connection handling |
| Screen Transition | 1 | Animated screen reveal |
| Main Window Setup | 5 | Window creation, rect calculation, invalidation |
| Utilities | 4 | Number parsing, string newline ops, civ era check |
| FRAMEWORK (CRT/MFC) | 39 | Static initializers, atexit handlers, SEH cleanup, destructors |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00560084 (ai_diplomacy_turn_processing)** — The master AI diplomacy entry point, called once per AI civ per turn. Controls war declarations, peace treaties, alliance proposals, and senate override mechanics. Critical for understanding AI behavior.

2. **FUN_00560D95 (ai_evaluate_diplomacy)** — Complex scoring algorithm for AI diplomatic attitude. Factors in gold, tech count, military power, leader personality, difficulty level, and contact history. The heart of AI decision-making for war/peace.

3. **FUN_0056D289 (draw_city_sprite)** — City rendering function with epoch determination, wall overlay, and size tier calculation. Essential for map rendering fidelity. Contains the complete epoch→style→size tier logic.

4. **FUN_00569801 (draw_status_panel_units)** — The main right-panel drawing routine showing active unit, terrain info, improvements, and stacked units. Key for understanding the game's UI layout and information display.

5. **FUN_0056E2E9 (create_multiplayer_game)** — Complete multiplayer game initialization including DirectPlay session creation, lobby messaging, player slot assignment, and game loading. Critical for understanding MP architecture.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Type | Evidence |
|---------|---------------|------|----------|
| DAT_006ab600 | exe_base_path | char[128] | GetModuleFileNameA target, stripped to directory |
| DAT_006ab680 | cdrom_drive_path | char[] | Set to drive letter by scan_drives_for_cdrom, checked by is_cdrom_path_empty |
| DAT_00633e00 | status_panel_locked | char | Set 0/1 to guard status panel drawing; checked by all draw functions |
| DAT_006abc38 | status_panel_bottom_y | int | Written at end of draw_status_panel_units, used for scroll area calculation |
| DAT_006abc5c | status_info_height | int | Calculated by calc_status_panel_layout; 0 means panel hidden |
| DAT_006abf44 | status_header_height | int | 40/60/80px depending on resolution zoom |
| DAT_00633df4 | status_header_zoom | int | Zoom factor (2/3/4) for header area |
| DAT_00633df8 | status_body_zoom | int | Zoom factor (2/3/4) for body area |
| DAT_006ad908 | animation_in_progress | int | Set to 1 during unit movement animation, 0 otherwise |
| DAT_006ab5e4 | ai_nearest_city_idx | int | Index of nearest city found during AI diplomacy evaluation |
| DAT_006ab5e8 | ai_military_threat | int | Military threat assessment counter for AI diplomacy |
| DAT_006ab5ec | ai_border_violation_count | int | Count of border violations detected during AI evaluation |
| DAT_00633ac8 | ai_intruder_count | int | Number of intruding units detected (used for singular vs plural message) |
| DAT_006ad640 | mp_game_state | int | Multiplayer game state: 1=setting up, 2=ready, 3=in progress |
| DAT_006ad308 | mp_connection_count | int | Number of multiplayer connections; 0=single player, >1=multiplayer |
| DAT_006ad10c | mp_player_popup_ptr | int* | Pointer to multiplayer player popup data structure |
| DAT_00633e3c | current_unit_font_size | int | Cached font size for unit order letters |
| DAT_00633dfc | chat_area_visible | char | Whether multiplayer chat area is visible in status panel |
| DAT_006abd94 | screen_width | int | Screen/viewport width in pixels, used for layout calculations |
| DAT_006abd98 | screen_height | int | Screen/viewport height in pixels |
