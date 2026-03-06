# Phase 1 Analysis: block_00580000 (0x00580000 - 0x0058FFFF)

## Function Table

### Cluster: Combat Resolution

These functions handle the core combat resolution system -- calculating attack/defense odds, applying damage, handling casualties, diplomatic consequences of combat, and special combat events (nukes, airports, fortresses, etc.).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005802FD | stub | FUN_005802fd | refresh_combat_tiles | 4 (x1,y1,x2,y2) | void | Calls thunk_FUN_0047ce1e twice with two coordinate pairs to refresh display at attacker and defender tiles. Uses DAT_006d1da0 (current_player). | MEDIUM |
| 00580341 | xlarge | FUN_00580341 | resolve_combat | 3 (attacker_unit, direction, execute_flag) | int | **Master combat resolution function** (15052 bytes). param_3=0 returns combat odds ratio (0-1024), param_3!=0 executes combat. Reads unit fields (type, owner, x, y), accesses unit_type table for domain/attack/defense/flags. Calculates attack power (local_a0) and defense power (local_64) with modifiers: veteran bonus, fortification, terrain, city walls (0x1c=SDI, 0x11=SAM), building bonuses (0x1b=Coastal Fortress), barracks difficulty scaling, Great Wall (wonder 6). Handles combat animations via thunk_FUN_0057ed3f, HP damage via unit+0x0A, kill/capture via thunk_FUN_0057e9f9/0057eb94. String refs: "SNEAK", "BREAKCEASE", "MISSILEATTACK", "PEARLHARBOR", "BATTERY", "BATTERY2", "SCRAMBLE", "AMPHIBMOTIZE", "CANCELPEACE", "ALLYUNDERATTACK", "ALLYATTACKING", "MULTIPLELOSE", "MULTIPLEWIN", "RANSOM". Handles diplomatic consequences (treaty breaking, ally notification), city capture/size reduction, city destruction, civ elimination. Returns 0=defender wins, 1=attacker wins (or odds ratio if param_3==0). | HIGH |

### Cluster: Cheat/Debug COSMIC Editor

These functions implement the cheat menu COSMIC constants editor -- saving, loading, displaying, and editing the 22 COSMIC rule values.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005866A0 | small | FUN_005866a0 | cosmic_editor_set_focus | 0 | void | Sets focus to window handle, then calls cosmic editor repaint (FUN_00586eb0). | MEDIUM |
| 005866D3 | large | FUN_005866d3 | cosmic_editor_save_restore | 0 | void | Saves 22 COSMIC constants (DAT_0064bcc8..DAT_0064bcdd) to backup array DAT_006a2d80, calls load_cosmic_rules (FUN_00419d23), saves loaded values to DAT_006a2d28, then restores original values from DAT_006a2d80. This preserves the "original" vs "rules file" COSMIC values for the editor display. | MEDIUM |
| 005869D4 | medium | FUN_005869d4 | cosmic_editor_display_list | 0 | void | Displays the COSMIC constants list in the editor. Iterates 0x16 (22) entries, formatting each with current value (DAT_006a2d80) and rules file value (DAT_006a2d28). String ref: "EDITCOSMIC". Calls thunk_FUN_004a2379 (menu init), thunk_FUN_004a23fc (get menu text). | HIGH |
| 00586BB6 | medium | FUN_00586bb6 | cosmic_editor_edit_value | 0 | void | Edits a single COSMIC constant. Gets selected item via thunk_FUN_00551d50, shows input dialog with current value. Uses clamp (FUN_005adfa0) to bound the new value between min (DAT_00634590+i*4) and max (DAT_006345e8+i*4). String ref: "CPEDIT". | HIGH |
| 00586D0A | medium | FUN_00586d0a | cosmic_editor_write_rules | 2 (FILE* out, FILE* template) | uint | Writes 22 COSMIC constants to rules file. Reads template lines, finds semicolon comment, prepends numeric value with format "%8d %s". Returns 1. | HIGH |
| 00586DA1 | medium | show_messagebox_6DA1 | cosmic_editor_commit | 0 | void | Commits COSMIC changes to RULES file. String refs: "COSMIC", "Error updating RULES". Calls thunk_FUN_004ccab9 to write section, shows error MessageBox on failure. Invalidates object cache. | HIGH |
| 00586E24 | small | FUN_00586e24 | cosmic_editor_show_effects | 0 | void | Displays COSMIC effects dialog. String refs: "EFFECTS". Calls thunk_FUN_004190d0 for display. | HIGH |
| 00586E88 | stub | FUN_00586e88 | cosmic_editor_close | 0 | void | Closes the COSMIC editor. Sets DAT_006a1d7c=0, invalidates object cache. | MEDIUM |
| 00586EB0 | small | FUN_00586eb0 | cosmic_editor_repaint | 0 | void | Repaints COSMIC editor window. Calls begin_paint (FUN_00552112), fills background with palette 0x1a, sets text style to 0x29/0x12 bold, calls end_paint (FUN_00408460). | MEDIUM |

### Cluster: COSMIC Editor Window Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00586F16 | xlarge | FUN_00586f16 | cosmic_editor_init_window | 0 | void | Initializes the full COSMIC editor window (1731 bytes). Creates property sheet, sets dimensions (0x230 x 0x1c6), creates OK/Cancel/Apply buttons at bottom. Calls cosmic_editor_save_restore, cosmic_editor_display_list. Event loop runs while DAT_006a1d7c != 0. MFC CPropertySheet usage. | MEDIUM |
| 005875E9 | stub | FUN_005875e9 | cosmic_editor_cleanup_a | 0 | void | SEH cleanup wrapper, calls FUN_005c656b. | LOW |
| 005875FF | stub | FUN_005875ff | seh_epilog_5875ff | 0 | void | SEH frame epilog -- restores FS register. FRAMEWORK. | LOW |
| 0058760D | small | FUN_0058760d | cosmic_editor_launch | 0 | void | Launches the COSMIC editor. Creates modal frame via thunk_FUN_00417fa0, calls cosmic_editor_init_window, then cleanup. SEH protected. | MEDIUM |
| 00587666 | stub | FUN_00587666 | cosmic_editor_destroy_frame | 0 | void | Calls thunk_FUN_004183d0 (destroy modal frame). FRAMEWORK. | LOW |
| 0058767C | stub | FUN_0058767c | seh_epilog_58767c | 0 | void | SEH frame epilog. FRAMEWORK. | LOW |

### Cluster: City/Trade List Dialog

These functions implement a dual-column list dialog (param_1 selects which list, 0 or 1) used for selecting cities -- likely the "Go To City" / trade route selection dialogs. The dialog stores city indices in arrays at offsets +0x3f0 (city slot IDs), +0x8400 (selection flags), +0xc408 (unit counts at city), and +0x43f8 (city sequence IDs). The two lists appear to be "own cities" (param=0, filtered by current player) and "foreign visible cities" (param=1).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00587A90 | large | FUN_00587a90 | city_list_create_panel | 3 (RECT*, panel_id, filter) | void | Creates a scrollable list panel for city selection. Stores filter at DAT_006acb58+panel*4. Creates scrollbar if items exceed visible rows. Creates button controls. Sets help ID 0x402234. | MEDIUM |
| 00587E05 | stub | FUN_00587e05 | city_list_scroll_top | 1 (param) | void | Scrolls list panel 0 to position, calls FUN_0058804f(0, param). | LOW |
| 00587E23 | stub | FUN_00587e23 | city_list_scroll_bottom | 1 (param) | void | Scrolls list panel 1 to position, calls FUN_0058804f(1, param). | LOW |
| 00587E41 | medium | FUN_00587e41 | city_list_toggle_filter | 0 | void | Toggles list filter flag at offset+0x3be. Sends network message 0xa5 or 0xa6 with current player. Refreshes list. | MEDIUM |
| 00587F00 | medium | FUN_00587f00 | city_list_toggle_filter_off | 0 | void | Sets filter flag to 0 at offset+0x3be. Sends network message 0xa6. Same pattern as FUN_00587e41 but always sets to 0. | MEDIUM |
| 00587FBF | medium | FUN_00587fbf | city_list_send_message | 0 | void | Sends multiplayer message 0x65 with current player name. Used for MP city list synchronization. | MEDIUM |
| 0058804F | small | FUN_0058804f | city_list_set_scroll_pos | 2 (panel_id, position) | void | Sets scroll position for given panel (offset+0x10410+panel*4=position). Calls refresh (FUN_0058878e). | MEDIUM |
| 005880B0 | large | FUN_005880b0 | city_list_handle_click | 1 (click_id) | void | Handles mouse click on city list. Computes clicked row via FUN_0058832d. Supports shift-click (range select via FUN_005dba95), ctrl-click (toggle via FUN_005dbab8), and normal click (exclusive select). Updates selection array at +0x8400. | MEDIUM |
| 0058832D | medium | FUN_0058832d | city_list_hit_test | 3 (x, y, panel) | int | Hit-tests mouse position against list panel bounds. Returns row index if inside, -1 if above, -2 if below, -3 if left, -4 if right. | MEDIUM |
| 0058843F | large | FUN_0058843f | city_list_sort | 3 (start, end, panel) | void | Sorts city list entries by name (alphabetical via _strcmp). Capital cities (has_building with ID 1=Barracks? Actually checking building 1) sort first. Swaps parallel arrays: city slots (+0x3f0), selection flags (+0x8400), unit counts (+0xc408), sequence IDs (+0x43f8). | MEDIUM |
| 0058878E | xlarge | FUN_0058878e | city_list_draw | 1 (panel_id) | void | Draws the city list panel (1721 bytes). Fills background, iterates visible rows, draws city names with appropriate colors (selected=highlight, capital=special). Draws city sprite via FUN_00588e47. Shows unit garrison count. Handles empty list ("no cities" message). | MEDIUM |
| 00588E47 | medium | FUN_00588e47 | city_list_draw_city_sprite | 6 (city_idx, row, x, y, height, zoom) | void | Draws a small city sprite in the list. Uses scale_sprite (FUN_00472cf0) with zoom -4 or -2 depending on dialog mode. Calls thunk_FUN_0056d289 (draw city). | MEDIUM |
| 00588F36 | xlarge | FUN_00588f36 | city_list_populate | 2 (panel_id, preserve_selection) | void | Populates city list by iterating all city slots (DAT_00655b18). Filters by owner matching current player (or visibility for foreign cities). If preserve_selection!=0, preserves previous selection state by matching city sequence IDs. Counts garrisoned units per city. Calls city_list_sort at end. | MEDIUM |

### Cluster: CRT/MFC Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005899F0 | stub | FID_conflict___E31 | crt_static_init_899f0 | 0 | void | CRT static initializer. Calls FUN_00589a0a + FUN_00589a24. FRAMEWORK. | LOW |
| 00589A0A | stub | FUN_00589a0a | crt_construct_899f0 | 0 | void | Calls FUN_005bd630 (constructor). FRAMEWORK. | LOW |
| 00589A24 | stub | FUN_00589a24 | crt_register_dtor_899f0 | 0 | void | Registers FUN_00589a41 via _atexit. FRAMEWORK. | LOW |
| 00589A41 | stub | FUN_00589a41 | crt_destruct_899f0 | 0 | void | Calls FUN_005bd915 (destructor). FRAMEWORK. | LOW |

### Cluster: Application Startup / Main Window

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00589A5B | large | FUN_00589a5b | app_init_main_window | 0 | void | **Main application window initialization** (505 bytes). Writes "Window Name" to CIV.INI via WritePrivateProfileStringA under section "Civilization Gold". Creates main window (600x400). Loads "civ2\\civ2.exe" resources. Calls load_civ2_art, initializes game state, loads rules, registers map_ascii handler. String refs: "civ2\\civ2.exe", "Civilization Gold", "Window Name", "CIV.INI". Sets DAT_00634718=1 on success. | HIGH |
| 00589C54 | stub | FUN_00589c54 | app_init_cleanup | 0 | void | SEH cleanup, calls FUN_005c656b. FRAMEWORK. | LOW |
| 00589C6A | stub | FUN_00589c6a | seh_epilog_589c6a | 0 | void | SEH epilog. FRAMEWORK. | LOW |
| 00589C79 | stub | FUN_00589c79 | app_shutdown_handler | 0 | void | Calls thunk_FUN_00408420, sets DAT_00634718=0. Shutdown cleanup. | MEDIUM |
| 00589D50 | stub | FUN_00589d50 | app_init_subsystem | 0 | void | Reads ECX+8, calls FUN_005bc9d3. MFC thiscall initialization. FRAMEWORK. | LOW |

### Cluster: Error Handling / Crash Reporter

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00589D80 | small | FUN_00589d80 | register_crash_handler | 1 (callback) | int | Registers a crash callback in DAT_006acbd0 array (max 10 entries). Returns slot index or -1 if full. DAT_00634768 = handler count. | MEDIUM |
| 00589DC5 | medium | FUN_00589dc5 | read_warning_file | 1 (filename) | void | Reads a text file line-by-line, outputs each line via OutputDebugStringA. Stops at "END" marker (DAT_00634820). File opened via thunk_FUN_0041508c. | HIGH |
| 00589EF8 | medium | FUN_00589ef8 | format_error_report | 5 (error_code, module, context, data1, data2) | void | Formats error information. Converts params to strings via __itoa/__ltoa. Looks up error text from "ERRORS.DB" and module name from "MODULES.DB". Calls FUN_0058a0ee to display. | HIGH |
| 00589FC9 | medium | FUN_00589fc9 | lookup_error_string | 3 (out_buf, db_file, line_num) | uint | Looks up a string from a database file by line number. Reads lines until reaching line_num, strips control characters. Returns 0 on success, 1 on failure. | MEDIUM |
| 0058A0EE | large | FUN_0058a0ee | crash_report_and_exit | 4 (error_str, module_str, data_str, extra_str) | void | **Fatal error handler**. Formats error message with "Error:", module, data. Outputs via OutputDebugStringA and debug_log (FUN_005d225b). Reports memory allocation failures, file open failures, DOS error codes. Reads "warn0.dat" for additional diagnostics. Invokes registered crash handlers in reverse order. Calls DebugBreak() then _exit(3). String refs: "Error:", "in module:", "data:", "Tried to allocate", "bytes", "File open failed:", "Most recent DOS error:", "warn0.dat". | HIGH |

### Cluster: CRT/MFC Static Initializers (2nd set)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058A5B0 | stub | FID_conflict___E31 | crt_static_init_a5b0 | 0 | void | CRT static initializer pair. FRAMEWORK. | LOW |
| 0058A5CA | stub | FUN_0058a5ca | crt_construct_a5b0 | 0 | void | Calls thunk_FUN_0055339f. FRAMEWORK. | LOW |
| 0058A5E4 | stub | FUN_0058a5e4 | crt_register_dtor_a5b0 | 0 | void | Registers FUN_0058a601 via _atexit. FRAMEWORK. | LOW |
| 0058A601 | stub | FUN_0058a601 | crt_destruct_a5b0 | 0 | void | Destroys COleCntrFrameWnd at DAT_006acd58. FRAMEWORK. | LOW |

### Cluster: Generic Dialog / Popup Window

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058A61B | large | FUN_0058a61b | create_popup_window | 9 (title, flags, x, y, w, h, scroll_count, help_id, menu_ptr) | void | Creates a generic popup/dialog window. flag bit 1 = center on screen (uses DAT_006ab198/19c screen dimensions), bit 2 = use stored positions, bit 4 = add menu bar, bit 8 = wide scrollbar. Adds title bar height, scroll area. Calls FUN_005bb4ae to create actual window. | MEDIUM |
| 0058A80D | medium | show_messagebox_A80D | copy_file | 2 (char* src, char* dest) | void | Copies a file byte-by-byte (1KB chunks). Shows "Error copying file" MessageBox on failure. Misnamed by Ghidra -- not actually a message box function. | HIGH |
| 0058A905 | large | FUN_0058a905 | import_sound_file | 1 (sound_slot) | void | Opens a file dialog for WAV files, copies selected file to the game's SOUND directory. Uses GetFileAttributesA to check if SOUND dir exists. Sound name lookup from "AIRCOMBT" string table. String refs: ".WAV" filter patterns. | HIGH |
| 0058ABCA | stub | FUN_0058abca | import_sound_cleanup | 0 | void | SEH cleanup, calls thunk_FUN_0059df8a. FRAMEWORK. | LOW |
| 0058ABE0 | stub | FUN_0058abe0 | seh_epilog_58abe0 | 0 | void | SEH epilog. FRAMEWORK. | LOW |
| 0058ABEE | stub | FUN_0058abee | sound_editor_close_a | 0 | void | Sets DAT_006acd50=0, invalidates cache at DAT_006acda0. | MEDIUM |
| 0058AC13 | stub | FUN_0058ac13 | sound_editor_close_b | 0 | void | Identical to FUN_0058abee. Duplicate handler. | MEDIUM |

### Cluster: Sound Editor Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058AC38 | large | FUN_0058ac38 | sound_editor_paint | 0 | void | Paints the sound editor window. Draws 6 sound slot buttons in a 3x2 grid. Each shows sound name from "AIRCOMBT" string table (DAT_006acd38 array). Draws title text with string ID 0x25b. Uses begin_paint/end_paint cycle. | MEDIUM |
| 0058AE20 | small | FUN_0058ae20 | point_in_rect | 6 (px, py, left, top, right, bottom) | uint | Returns 1 if point (px,py) is within rectangle [left,top,right,bottom], 0 otherwise. Pure geometry helper. | HIGH |
| 0058AE6C | medium | FUN_0058ae6c | sound_editor_click | 2 (x, y) | void | Handles mouse click in sound editor. Hit-tests 6 sound slot buttons. On hit, plays the associated sound via thunk_FUN_0046e020. | MEDIUM |
| 0058AFB6 | xlarge | FUN_0058afb6 | sound_editor_populate_slots | 1 (unit_type_id) | void | Populates the 6 sound slots (DAT_006acd38[6]) based on the unit type. Maps unit type IDs to combat sound IDs. Complex switch-like logic maps unit categories: missiles (0x33-0x3d) to sounds 0x65-0x84, sea units to sound 0, land bombardment to sounds 0x18/0x50, air units to 0x4d, etc. Uses unit_type fields: domain (+0x09), flags (+0x04/+0x05), range (+0x0B), cost (+0x10). | MEDIUM |

### Cluster: Sound Editor Window Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058B47E | xlarge | FUN_0058b47e | sound_editor_init_window | 2 (title, unit_type_id) | void | Creates the sound editor dialog window (987 bytes). Sets up 6 sound slot buttons in 3x2 grid with labels from DAT_00634930 string table. Creates OK/Cancel buttons. Event loop runs while DAT_006acd50!=0. Calls sound_editor_populate_slots. | MEDIUM |
| 0058B859 | stub | FUN_0058b859 | sound_editor_destroy_buttons | 0 | void | Destructs vector of 6 button objects. FRAMEWORK. | LOW |
| 0058B86F | stub | FUN_0058b86f | sound_editor_destroy_a | 0 | void | Calls thunk_FUN_0040f570 (button destructor). FRAMEWORK. | LOW |
| 0058B87B | stub | FUN_0058b87b | sound_editor_destroy_b | 0 | void | Calls thunk_FUN_0040f570 (button destructor). FRAMEWORK. | LOW |
| 0058B88E | stub | FUN_0058b88e | seh_epilog_58b88e | 0 | void | SEH epilog. FRAMEWORK. | LOW |

### Cluster: Unit Orders / Commands

These functions implement the player's unit command handlers -- actions triggered by keyboard shortcuts or menu items (B=Build, D=Disband, F=Fortify, G=GoTo, I=Irrigate, etc.).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058BD60 | stub | FUN_0058bd60 | unit_order_activate | 0 | void | Activates unit at DAT_00655afe (active unit index). Calls thunk_FUN_0059062c with wake-up flag 3. | MEDIUM |
| 0058BD84 | small | FUN_0058bd84 | unit_order_wake_all_own | 0 | void | Wakes all units belonging to current player. Iterates unit slots, checks alive and owner==DAT_006d1da0, calls thunk_FUN_005b6787 (wake unit). | MEDIUM |
| 0058BDFD | small | FUN_0058bdfd | unit_order_automate | 0 | void | Sets automation flag (status |= 0x4000) on active unit. Clears DAT_0062804c and DAT_00628054, calls thunk_FUN_0041033a + thunk_FUN_00489859(0). | MEDIUM |
| 0058BE56 | xlarge | FUN_0058be56 | unit_order_build_city | 0 | void | **Build City command** (1087 bytes). Checks unit role==5 (settler). Validates: not at sea ("CITYATSEA"), not adjacent to existing city ("ADJACENTCITY"), valid tile. Calls create_city, prompts for name ("NAMECITY"), handles city founding with message "FOUNDED". On success opens city dialog. Can add population to existing city if population < max (DAT_0064bcd1). String refs: "ONLYSETTLERS", "CITYATSEA", "ADJACENTCITY", "NAMECITY", "FOUNDED", "ONLY10", "FIRSTPRODUCT". | HIGH |
| 0058C295 | large | FUN_0058c295 | unit_order_disband | 0 | void | **Disband unit command**. Handles both unit disbanding ("DISBAND") and city disbanding (cheat mode only, DAT_00655b07). For unit disband: adds half shield cost to city production box. Checks if city dialog is open (CSplitterWnd::IsTracking). For city disband: calls delete_city + kill_civ. | HIGH |
| 0058C56C | medium | FUN_0058c56c | check_adjacent_water | 2 (x, y) | uint | Checks if any adjacent tile has water (ocean/river/city). Returns 1 if irrigation-viable water source exists. Checks 5 adjacent tiles using DAT_0062833c/DAT_00628344 offsets. Tests for ocean (FUN_005b89e4), river (byte & 0x80), and existing irrigation (tile flags & 4). | MEDIUM |
| 0058C65E | xlarge | FUN_0058c65e | unit_order_build_improvement | 1 (improvement_type) | void | **Build tile improvement command** (1411 bytes). Dispatches settler/engineer orders: 4=fortress, 5=road/railroad, 6=irrigation/farmland, 7=mining, 8=transform, 9=clean pollution, 10=airbase. Validates each action: checks required techs via thunk_FUN_004bd9f0 (0x42=radio for airbase, 0x12=construction for fortress, 0x43=railroads, 0x46=refrigeration for farmland, 7=bridge building). Checks terrain suitability from DAT_00627cc8 terrain improvement table. String refs: "ONLYSETTLERS", "RADIO", "CANTIMPROVE", "ALREADYAIR", "CONSTRUCTION", "ALREADYFORT", "BRIDGEBUILDING", "ALREADYROAD", "RAILROADS", "NOWATER", "ALREADYFARMLAND", "FARMLAND", "ALREADYMINING", "ENGINEERS", "NOPOLLUTION". | HIGH |
| 0058CBE1 | medium | FUN_0058cbe1 | unit_order_home_city | 0 | void | **Change home city command**. Sets unit's home city to city at current tile. If unit is caravan (role==7) and already has home city, shows "CARAVANHOME" warning. Otherwise updates unit+0x10 (home city) and refreshes both old and new home city displays. | HIGH |
| 0058CCE6 | medium | FUN_0058cce6 | unit_order_fortify | 0 | void | **Fortify unit command**. Only for sea-domain units (domain==1) that are not at sea. Checks for city/airbase at location. Sets unit orders byte to 1 (fortifying). Calls wake unit then refreshes. If at sea or no valid fortify location, shows "CANTDO". | MEDIUM |
| 0058CDE5 | large | FUN_0058cde5 | unit_order_unload | 0 | void | **Unload transport command** (488 bytes). For sea units (domain==1): checks if at port (city/harbor). For air units (flag 0x20): checks adjacent land tiles. If no valid unload target, shows "CANTDO". Calls thunk_FUN_005b2f50 to execute unload. String refs: "CANTDO". | MEDIUM |
| 0058CFCD | xlarge | FUN_0058cfcd | unit_order_pillage | 0 | void | **Pillage command** (1105 bytes). Land units only (domain==0, not in city). Shows "PILLAGEWHAT" menu if multiple improvements present. Menu items: farmland (0xc), irrigation (4), mining (8), airbase+fortress (0x42), fortress-only (0x40), railroad (0x20), road (0x10). Checks for city ownership to trigger diplomatic incidents. Calls thunk_FUN_004c50d0 to execute. String refs: "PILLAGEWHAT", "PILLAGEMENU", "CANTDO". | HIGH |
| 0058D41E | stub | FUN_0058d41e | pillage_cleanup | 0 | void | SEH cleanup. FRAMEWORK. | LOW |
| 0058D434 | stub | FUN_0058d434 | seh_epilog_58d434 | 0 | void | SEH epilog. FRAMEWORK. | LOW |
| 0058D442 | large | FUN_0058d442 | unit_order_sentry | 0 | void | **Sentry command** (451 bytes). Sets unit orders to 0xFF (sentry). Handles both map mode (DAT_006d1da8==1) and cursor mode. Validates unit ownership. Special case: calls thunk_FUN_005b6aea for goto-then-sentry. Clears movement used flag (status &= 0x7FFF), sets DAT_006d1da8=0. | MEDIUM |
| 0058D60A | medium | FUN_0058d60a | unit_order_paradrop | 0 | void | **Paradrop command**. Checks unit hasn't moved (moves==0) and not on ship (status & 0x10==0). Validates city tile has airbase (tile flag & 2). Shows "PARADROPRULES1" or "PARADROPRULES2" error. On success calls thunk_FUN_00410e46 to initiate paradrop. | HIGH |
| 0058D6AF | xlarge | FUN_0058d6af | unit_order_goto_city | 0 | void | **GoTo city command** (1787 bytes). Shows city list popup. For air units: calculates reachable cities based on remaining fuel/range. For sea units with cargo (range!=0): checks fuel range. For settlers: shows cities with pollution count. For units with airport: shows Wonder (airport indicator). Handles "all cities" fallback when no valid cities found. Sets unit orders to 0x0B (goto) with target city coordinates. String refs: "LIFTSHIP", "LIFTPLANE". | MEDIUM |
| 0058DDAA | stub | FUN_0058ddaa | goto_city_cleanup | 0 | void | SEH cleanup. FRAMEWORK. | LOW |
| 0058DDC0 | stub | FUN_0058ddc0 | seh_epilog_58ddc0 | 0 | void | SEH epilog. FRAMEWORK. | LOW |
| 0058DDCE | medium | FUN_0058ddce | unit_order_wake_sentries | 0 | void | Wakes sentry units at active unit's transport stack. For air units: sets status |= 0x4000 (autopilot). Iterates transport chain, wakes land units with orders==3 (goto/sleep). If wake succeeds, activates the unit. | MEDIUM |
| 0058DF14 | small | FUN_0058df14 | unit_order_clean_toggle | 0 | void | Toggles settler "auto-clean" mode. If unit role==5 (settler), sets status |= 0x8000. | MEDIUM |
| 0058DF7B | xlarge | FUN_0058df7b | unit_order_airlift | 0 | void | **Airlift command** (1609 bytes). Validates: not ship ("LIFTSHIP"), not plane ("LIFTPLANE"), city has airport (building 0x20=32=airport), not already airlifted (city flag & 1). Shows destination city list (only cities with airports). Checks for enemy fighters in range (interceptor check). Calls thunk_FUN_004ca1cd to execute airlift. String refs: "LIFTSHIP", "LIFTPLANE", "NOAIRPORT", "ALREADYAIRLIFT", "AIRLIFTSELECT", "NOAIRPORT2", "ENEMYFIGHTERS". | HIGH |
| 0058E5C4 | stub | FUN_0058e5c4 | airlift_cleanup | 0 | void | SEH cleanup. FRAMEWORK. | LOW |
| 0058E5DA | stub | FUN_0058e5da | seh_epilog_58e5da | 0 | void | SEH epilog. FRAMEWORK. | LOW |

### Cluster: Barbarian / Goody Hut

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058F010 | stub | FUN_0058f010 | show_message_if_visible | 1 (message) | void | Shows message only if DAT_006ad0d0!=0 (unit actions visible flag). Thin wrapper around thunk_FUN_00421ea0. | MEDIUM |
| 0058F040 | xlarge | FUN_0058f040 | process_goody_hut | 1 (unit_index) | uint | **Goody hut / tribal village handler** (3404 bytes). Barbarian-only (owner==0) handler for when a unit enters a goody hut tile. 6 outcomes via switch: case 0 = found city ("SURPRISETRIBE"), case 1 = mercenary units ("SURPRISEMERCS"), case 2 = gold ("SURPRISEMETALS"), case 3 = barbarian attack ("SURPRISEBARB"), case 4 = tech scroll ("SURPRISESCROLLS"), case 5 = nomad settler ("SURPRISENOMADS"). Outcome weighted by game era, difficulty, and random rolls. Case 0: creates city with random improvements (Temple, Marketplace, Granary, Courthouse) for late game. Case 1: spawns era-appropriate military units (varies by tech discovered). Case 2: awards 25-200 gold scaled by turn. Case 3: spawns barbarian attackers on adjacent tiles. Case 4: grants random tech via thunk_FUN_004bf05b. Case 5: spawns settler unit. String refs: "SURPRISETRIBE", "SURPRISEMERCS", "SURPRISEMETALS", "SURPRISESCROLLS", "SURPRISEBARB", "SURPRISENOMADS", "SURPRISENOTHING". | HIGH |
| 0058FDA9 | medium | FUN_0058fda9 | claim_adjacent_ocean_tiles | 3 (x, y, civ_id) | void | Claims ownership of adjacent ocean tiles after goody hut founded a city. Iterates 8 neighbors, checks if same ocean body, claims unowned tiles for civ. Updates map display. | MEDIUM |

### Cluster: Caravan / Trade Route

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0058FEDB | xlarge | FUN_0058fedb | handle_caravan_arrival | 2 (unit_index, city_index) | void | **Caravan/Freight arrival handler** (1831 bytes). When trade unit arrives at city: shows "CARAVANMENU" with options -- establish trade route (option 0), help build wonder (option 2), or do nothing. For trade route: checks commodity supply/demand match (demand=higher payout). Shows commodity name from DAT_0064b168 table. For wonder help: adds shields equal to unit_cost * COSMIC[4]. Handles unit types 0x31 (Caravan) and others. Updates city production box. Disbands unit after action. String refs: "CARAVANMENU", "ADDTOWONDER". Commodity display uses string IDs 0x133 (demanded) and 0x134 (not demanded). | HIGH |
| 00590607 | stub | FUN_00590607 | caravan_cleanup | 0 | void | SEH cleanup. FRAMEWORK. | LOW |
| 0059061D | stub | FUN_0059061d | seh_epilog_59061d | 0 | void | SEH epilog. FRAMEWORK. | LOW |

---

## SUMMARY

### 1. Total Functions and Breakdown

**Total functions: 72**

| Category | Count | Description |
|----------|-------|-------------|
| Combat Resolution | 2 | Core combat odds & execution |
| COSMIC Editor | 10 | Cheat menu COSMIC constants editor |
| City List Dialog | 13 | Scrollable city selection lists |
| Unit Orders/Commands | 22 | Player unit commands (build, disband, fortify, pillage, airlift, etc.) |
| Goody Hut / Barbarian | 3 | Tribal village encounter outcomes |
| Caravan / Trade | 3 | Trade route and wonder contribution |
| Sound Editor | 8 | Combat sound customization dialog |
| Error Handling | 5 | Crash reporter and fatal error handler |
| Application Init | 3 | Main window creation, startup |
| FRAMEWORK (SEH/CRT/MFC) | 19 | SEH epilogs, CRT static init, MFC destructors |
| Utility | 2 | Point-in-rect, file copy |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00580341 (`resolve_combat`)** -- The master combat resolution function (15KB). Calculates attack/defense odds with all modifiers (terrain, veteran, buildings, wonders, difficulty), executes combat rounds, handles kills, city capture/destruction, diplomatic consequences, and multiplayer notifications. This is one of the most critical game logic functions.

2. **FUN_0058f040 (`process_goody_hut`)** -- Goody hut outcome handler (3.4KB). Implements all 6 possible outcomes when a unit discovers a tribal village, with era-weighted probability distributions. Essential for understanding early-game balance.

3. **FUN_0058be56 (`unit_order_build_city`)** -- City founding logic including all validation checks (adjacent city, ocean, settler-only), naming prompt, and initial city setup.

4. **FUN_0058fedb (`handle_caravan_arrival`)** -- Trade route establishment and wonder contribution handler. Key economic/wonder-rush mechanic.

5. **FUN_0058a0ee (`crash_report_and_exit`)** -- Fatal error handler with full diagnostics. Useful for understanding the game's error recovery and debugging infrastructure.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Type | Purpose | Confidence |
|--------|------|---------|------------|
| DAT_006acb08 | int | City index at combat target tile (-1 if no city). Used extensively in resolve_combat. | HIGH |
| DAT_006acb0c | int | Combat kill counter (set to 0 after combat, checked for "MULTIPLELOSE/WIN" messages). | HIGH |
| DAT_006acb58[2] | int[2] | City list filter flags (0=own cities, 1=foreign visible). | MEDIUM |
| DAT_006acd38[6] | int[6] | Sound slot IDs for the 6-button sound editor grid. -1=empty slot. | HIGH |
| DAT_006acd50 | int | Sound editor dialog active flag (1=open, 0=closed). | HIGH |
| DAT_006a1d7c | int | COSMIC editor dialog active flag (1=open, 0=closed). | HIGH |
| DAT_006a1d80 | int | COSMIC editor button ID counter. | MEDIUM |
| DAT_006a4f88 | ptr | Parent window/document pointer for editors. 0=no parent. +0x48=child window. | MEDIUM |
| DAT_006a4f90 | obj | Font/text style object used by editor windows. | MEDIUM |
| DAT_006a2d80[22] | int[22] | COSMIC constants backup (original pre-edit values). | HIGH |
| DAT_006a2d28[22] | int[22] | COSMIC constants from rules file (post-load values). | HIGH |
| DAT_006ace70 | int | Sound editor: scroll count / title bar height. | MEDIUM |
| DAT_006ace74 | int | Sound editor: menu height. | MEDIUM |
| DAT_006ace78 | int | Sound editor: help handler pointer. | MEDIUM |
| DAT_006ace7c | int | Sound editor: client area left. | MEDIUM |
| DAT_006ace80 | int | Sound editor: client area top. | MEDIUM |
| DAT_006ace84 | int | Sound editor: client area width. | MEDIUM |
| DAT_00634768 | int | Crash handler count (max 10). | HIGH |
| DAT_006acbd0[10] | ptr[10] | Registered crash handler callback array. | HIGH |
| DAT_006acbf8 | char[~256] | Shared debug/error output string buffer. | HIGH |
| DAT_00634718 | int | Application initialized flag (1=ready, 0=shutdown). | MEDIUM |
| DAT_006ad0cc | int | Diplomatic incident flag (set to 1 when pillaging triggers war). | MEDIUM |
| DAT_006ad0d0 | char | Unit actions visible to player flag. Controls whether combat/hut messages are shown. | HIGH |
| DAT_0062804c | int | UI "action pending" flag. Cleared at start of most unit order handlers. | MEDIUM |
| DAT_00655afe | short | Active/selected unit index. | HIGH |
| DAT_00655afa | short | Game turn counter (alternate reference; used for goody hut era checks). | MEDIUM |
| DAT_00633e48 | int | Active combat defender unit index (-1 when no combat). | MEDIUM |
| DAT_00633e40 | uint | Combat target tile X. | MEDIUM |
| DAT_00633e44 | int | Combat target tile Y. | MEDIUM |
| DAT_0062c5bc | int | Set to 1 when attacker loses combat (defender wins flag). | MEDIUM |
| DAT_0063f660 | int | Technology era counter or epoch indicator. Affects goody hut outcomes. | MEDIUM |
