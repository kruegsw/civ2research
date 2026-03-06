# Phase 1 Audit: block_004F0000 (0x004F0000 - 0x004FFFFF)

## Function Analysis Table

### Cluster: City Turn Processing / Building Upkeep

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F00F0 | medium | FUN_004f00f0 | calc_building_upkeep_cost | (int civ_id, int building_id) | uint cost | Calculates per-turn gold upkeep for a building. Reads improvement cost from DAT_0064c48d (imp[id].cost+5). Building 2 (Courthouse) has difficulty-based discount and tech-chain modifier. If cost==1, wonder 0x11 (United Nations) zeroes it. Fundamentalism (govt==4) zeroes cost for Temple(4), University(0x0E), Library(0x0B). Calls has_building (thunk_FUN_0043d20a) and wonder check (thunk_FUN_00453e51). | HIGH |
| 004F0221 | medium | FUN_004f0221 | pay_building_upkeep | (int city_idx) | void | Iterates buildings 1-38 (0x27) in a city, deducts upkeep from civ gold (DAT_0064c6a2 = civ[owner].gold). If gold goes negative, sells the building (thunk_FUN_0043d289 = remove_building), shows "INHOCK" message, and refunds shield cost. Uses calc_building_upkeep_cost. | HIGH |
| 004F03B7 | large | FUN_004f03b7 | find_city_expansion_site | (int city_idx) | int (0/1) | Pathfinding for AI city expansion. Gets city's continent ID via thunk_FUN_005b8aa8, searches other cities on same continent (or allied civs in pass 2). Uses A* pathfinding (thunk_FUN_004abfe5) with max 50 steps, checks for roads (0x10), rivers (0x80), and bridge tech (0x43). Sets DAT_006a65e0/DAT_006a65e8 as target coordinates. Returns 1 if valid site found. | MEDIUM |
| 004F080D | large | FUN_004f080d | handle_city_expansion | (int city_idx) | void | AI city expansion logic. First checks city radius tiles for pollution (0x80 flag) and cleans them via thunk_FUN_0049301b. If no pollution, calls find_city_expansion_site. Adjusts settler priority (DAT_006a65d4) based on city size and barracks. Dispatches settler creation. Sets city flag 0x80000 (expansion planned). | MEDIUM |
| 004F0A9C | xlarge | FUN_004f0a9c | process_city_turn | (int city_idx) | int (happy-unhappy or -999) | **Master per-city turn processing**. Runs full production cycle: calls calc_city_production twice, handles food shortage warning ("FOODSHORTAGE"), computes food surplus, updates food box. Calculates unit support costs (DAT_006a660c) vs free support thresholds (DAT_0064bcd5-d7). Deducts civ morale (DAT_0064ca74) based on excess support. Computes corruption penalty (leader aggressiveness factor). Calls handle_city_disorder, pay_building_upkeep, handle_city_expansion. Updates city dialog if open. Returns happy-unhappy differential, or -999 on error. String refs: "INHOCK", "FOODSHORTAGE", "DECREASE". | HIGH |

### Cluster: Space Race / Astronaut Event

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F1220 | large | FUN_004f1220 | handle_space_race_victory | (void) | void | Processes space race completion / ASTRONAUTS event. If save format < 3 or flag set, resets all tile visibility to 0xFF, resets all city visibility. Sends notification messages (thunk_FUN_0046b14d, thunk_FUN_00511880). Displays "ASTRONAUTS" text (thunk_FUN_00421ea0). For newer format, sends different notification (0x58). | HIGH |

### Cluster: Civilopedia Window (GUI Object)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F3D30 | stub | FUN_004f3d30 | pedia_get_char | (u4 unused, int index) | byte | Returns byte from DAT_006a6530 array at given index. Simple accessor for Civilopedia text buffer. | LOW |
| 004F3D60 | small | FUN_004f3d60 | pedia_window_ctor | (void) | ptr | MFC-style constructor. Calls base class ctor (thunk_FUN_0043c260), sets up CWnd (thunk_FUN_0059db08 with 0x4000 style), assigns vtable PTR_FUN_0061d6cc. Uses SEH frame. | MEDIUM |
| 004F3E20 | stub | FUN_004f3e20 | pedia_window_scalar_delete | (byte flags) | void* | Scalar deleting destructor pattern. Calls pedia_window_dtor, conditionally frees memory. | MEDIUM |
| 004F3E70 | small | FUN_004f3e70 | pedia_window_dtor | (void) | void | Destructor with SEH. Calls cleanup helpers FUN_004f3ebb, FUN_004f3ee5, FUN_004f3ef8. | MEDIUM |
| 004F3EBB | stub | FUN_004f3ebb | pedia_window_dtor_helper1 | (void) | void | Computes offset (unaff_EBP-0x14)+0x4a4 for sub-object, calls thunk_FUN_0059df8a (CWnd cleanup). | LOW |
| 004F3EE5 | stub | FUN_004f3ee5 | pedia_window_dtor_helper2 | (void) | void | Calls CDaoFieldInfo destructor (Ghidra FID misidentification; likely a CString or similar cleanup). | LOW |
| 004F3EF8 | stub | FUN_004f3ef8 | pedia_window_seh_cleanup | (void) | void | SEH chain restoration: `*FS:[0] = saved_link`. Standard epilog. | MEDIUM |
| 004F3F30 | stub | FUN_004f3f30 | city_message_wrapper | (u4 msg_key, u4 city_idx, u4 extra) | void | Thin wrapper: calls thunk_FUN_004eb571(msg_key, city_idx, 0, extra). Used for city notifications. Called from pay_building_upkeep with "INHOCK" string. | MEDIUM |
| 004F3F60 | stub | FUN_004f3f60 | set_global_f004 | (u4 value) | void | Sets DAT_0062f004 = value. Simple setter for a global state flag. | LOW |

### Cluster: Framework / CRT Static Init

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F3F80 | stub | FID_conflict___E31 | crt_static_init_pedia | (void) | void | CRT static initializer. Calls FUN_004f3f9a (construct) and FUN_004f3fb4 (register atexit). FRAMEWORK. | HIGH |
| 004F3F9A | stub | FUN_004f3f9a | pedia_static_ctor_wrapper | (void) | void | Wraps thunk_FUN_004f3feb (Civilopedia object constructor). FRAMEWORK. | HIGH |
| 004F3FB4 | stub | FUN_004f3fb4 | pedia_register_atexit | (void) | void | Registers FUN_004f3fd1 as atexit handler. FRAMEWORK. | HIGH |
| 004F3FD1 | stub | FUN_004f3fd1 | pedia_static_dtor_wrapper | (void) | void | atexit handler: calls thunk_FUN_004f44a7 (Civilopedia destructor). FRAMEWORK. | HIGH |

### Cluster: Civilopedia Data Manager (Large Object)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F3FEB | xlarge | FUN_004f3feb | pedia_manager_ctor | (void) | ptr | Constructs the Civilopedia manager object. Calls base class ctor (thunk_FUN_0044c5a0), then 16x thunk_FUN_0040f3e0 (create child controls, 0-15), plus thunk_FUN_004187a0 and thunk_FUN_0040fb00. Sets vtable PTR_FUN_0061d6d0. Initializes 7 index arrays to -1 (sizes 100, 39, 28, 62, 7, 33, 256) for techs, improvements, wonders, units, governments, terrain, concepts. Zeroes counters. | MEDIUM |
| 004F44A7 | large | FUN_004f44a7 | pedia_manager_dtor | (void) | void | Destructor for Civilopedia manager. Destroys 17 child controls in reverse order (0x11 down to 0). Frees sprite surfaces at offsets 0x5c4 and 0x6c8 via thunk_FUN_00453aa0. Restores vtable. SEH frame. FRAMEWORK. | MEDIUM |
| 004F4673-4763 | stub | FUN_004f4673..4763 | pedia_dtor_child_N | (void) | void | 16 near-identical stubs destroying child controls. Most call thunk_FUN_0040f570 (generic control destructor). 004F4673 calls thunk_FUN_0040fbb0, 004F4682 calls thunk_FUN_00418870. FRAMEWORK. | HIGH |
| 004F4772 | stub | FUN_004f4772 | pedia_dtor_base | (void) | void | Calls thunk_FUN_0044cba0 (base class destructor). FRAMEWORK. | HIGH |
| 004F4785 | stub | FUN_004f4785 | pedia_seh_cleanup | (void) | void | SEH chain restoration. FRAMEWORK. | HIGH |
| 004F4793 | small | FUN_004f4793 | pedia_clear_item_list | (void) | void | Frees linked list at in_ECX+8000 (0x1F40). Each node has +0x44=next pointer. Uses FID scalar deleting destructor. Then calls thunk_FUN_00419b80 (general cleanup). | MEDIUM |
| 004F4809 | xlarge | FUN_004f4809 | pedia_free_string_lists | (void) | void | Frees 7 linked lists at offsets 0x16dc-0x16f4 (one per category: techs, improvements, wonders, units, governments, terrain, concepts). Each list node: [string_ptr, index, next]. Frees string then node. | MEDIUM |

### Cluster: Civilopedia Window Layout & Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004F4B9F | xlarge | FUN_004f4b9f | pedia_init_layout | (void) | void | **Main Civilopedia window initialization**. Sets window size 640x400, creates scroll bar, leader portrait area. Creates multiple button rows with improvement names from DAT_00628420 offsets (+0x9c, +0x51c, +0xd58, +0xd80, +0xb04). Uses SetRect/OffsetRect for layout. Creates 2-column, 3-column, and 4-column button layouts for different category pages. Uses thunk_FUN_00428b0c (get_improvement_name). Win32 API: SetRect, OffsetRect, GetSystemMetrics. | MEDIUM |
| 004F5B24 | small | FUN_004f5b24 | pedia_reset_view | (void) | void | Resets Civilopedia view. Invalidates cache (CRichEditDoc::InvalidateObjectCache misidentified by Ghidra FID), clears item list, resets page counter, calls pedia_update_display. | MEDIUM |
| 004F5B6F | large | FUN_004f5b6f | pedia_handle_back | (void) | void | Handles "back" navigation in Civilopedia. Maintains history stack (DAT_006a6790 as index, arrays at DAT_006a6794/6924/6ab4 for page/subcategory/category). Unwinds history, dispatches to appropriate display function. Categories 6,7 have special handling. | MEDIUM |
| 004F5DD1 | small | FUN_004f5dd1 | pedia_close_display | (void) | void | Closes/resets the Civilopedia display. Sets DAT_006a677c=1 (closed flag), zeroes history. Frees surface DAT_006a8188. Calls cleanup functions. Returns 0. | MEDIUM |
| 004F5E52 | small | FUN_004f5e52 | pedia_refresh_page | (void) | void | Refreshes current Civilopedia page. If not closed (DAT_006a677c==0), handles subcategory state, clears list, prepares surface, draws layout, updates tab state. Uses prepare_surface (thunk_FUN_005a9780) and end_paint (thunk_FUN_00408460). | MEDIUM |
| 004F5ED2 | small | FUN_004f5ed2 | pedia_show_category_8 | (void) | void | Shows Civilopedia category 8 (special/misc). Sets category=8, subcategory=0, refreshes and dispatches. | LOW |
| 004F5F23 | large | FUN_004f5f23 | pedia_select_entry | (void) | void | **Entry selection handler**. Switch on DAT_006a6780 (category): 1/8=Advances, 2=Improvements, 3=Wonders, 4=Units, 5=Terrain, 6/7=special (Governments/Concepts). Each case fetches entry name from linked list (thunk_FUN_004f8a9b), copies to title string, then dispatches to category-specific display function (thunk_FUN_00564e6d, 00599b8d, 0052630d, 005ac9ad, 004906fd, 004f6564+00452315). Error string: "This Should not Happen". | HIGH |
| 004F6244 | large | FUN_004f6244 | pedia_draw_frame | (void) | void | Draws the Civilopedia window frame. Renders borders (DAT_0062d864 pixels), draws leader portrait scaled to window, renders title text with shadow (palette 10=shadow, 0x1a=text). Uses blit_normal (FUN_005cef31), fill_rect (FUN_005c0333), text rendering (FUN_005c0f57). | MEDIUM |
| 004F6564 | small | FUN_004f6564 | pedia_draw_background | (u4* rect, int part) | void | Draws background texture for Civilopedia. Part 1 uses DAT_00635aa0, part 2 uses DAT_00635aa4 (background tile surfaces). Falls back to thunk_FUN_0040fdb0 if no texture. | LOW |
| 004F6646 | small | FUN_004f6646 | pedia_dispatch_after_select | (void) | void | Post-selection dispatcher. Checks subcategory state (in_ECX+0x11c): 0=draw items (unless category 8), 1/2=return, else close. | LOW |
| 004F66C6 | xlarge | FUN_004f66c6 | pedia_draw_item_list | (void) | void | **Draws the scrollable item list** in Civilopedia. 9 items per page, 2 columns. Switch on category (in_ECX+0x118): 1=techs (with era grouping from DAT_0062768c/d), 2/3=improvements, 4=units, 5=terrain (with sprite rendering), 6/7=governments/concepts. Highlights selected item. Renders sprites scaled (FUN_005cd775) with blit_normal. Text with shadow colors. String refs: "This Should not Happen", "This Should Never Be Seen". | HIGH |
| 004F7313 | stub | FUN_004f7313 | pedia_set_scroll_page | (int page) | void | Sets scroll position to page*9. Redraws if changed. | LOW |
| 004F734A | small | FUN_004f734a | pedia_hit_test | (int x, int y) | int | Hit-tests mouse position against Civilopedia item grid. Returns item index (0+), or negative codes: -1=above, -2=below, -3=left, -4=right, -5=past end. Uses 9-row grid, 2 columns. | MEDIUM |
| 004F7454 | small | FUN_004f7454 | pedia_ensure_visible | (int item_idx) | void | Scrolls Civilopedia list to ensure item_idx is visible. Adjusts DAT_006a85a4 (scroll offset) to nearest page boundary (multiple of 9). | LOW |
| 004F74EB | medium | FUN_004f74eb | pedia_find_by_letter | (int ascii_char) | int | Searches current Civilopedia list for first entry starting with given letter. Uses linked list traversal starting from current selection, wraps around. Returns index or -1. Category-specific list pointers from DAT_006a7d44-5c. | MEDIUM |
| 004F76CE | large | FUN_004f76ce | pedia_handle_keypress | (int key_code) | void | Keyboard navigation for Civilopedia. A-Z: jump to letter (pedia_find_by_letter). Arrow keys: 0xa1/c7=End, 0xa2/c1=Down, 0xa3/a6/c3/c6=PageDown, 0xa4/a9/c2/c5=PageUp, 0xa7/c4=Home, 0xa8/c0=Up. Updates selection and scroll position. | MEDIUM |
| 004F7A30 | small | FUN_004f7a30 | pedia_handle_mouse_click | (void) | void | Handles mouse click in Civilopedia list area. Gets mouse position, hit-tests, updates selection. | LOW |
| 004F7AC7 | small | FUN_004f7ac7 | pedia_set_title | (u4 category) | void | Sets Civilopedia window title based on category. Category IDs map to string resource IDs 0x29F-0x2A5 (Advances, City Improvements, Wonders, Units, Terrain, Governments, Concepts). "This Should not Happen" on invalid. | HIGH |
| 004F7BD1 | small | FUN_004f7bd1 | pedia_open_category | (u4 category, int show_flag) | void | Opens a Civilopedia category page. Resets state, sets title, initializes controls. If show_flag != 0, shows window. | MEDIUM |
| 004F7C99 | xlarge | FUN_004f7c99 | pedia_load_index_data | (void) | void | **Loads all Civilopedia index data from Describe.txt**. Parses 7 sections: "@ADVANCE_INDEX", "@IMPROVEMENT_INDEX" (starts at 1, skips Palace), "@WONDER_INDEX" (starts at 0x27), "@UNIT_INDEX", "@GOVERNMENT_INDEX", "@TERRAIN_INDEX" (skips entry 0x18), "CONCEPT_DESCRIPTIONS" (searches for "@ " prefix lines). Builds linked lists with name strings and sorts them alphabetically (thunk_FUN_004f896a). Uses tech_table (DAT_00627684), improvement_table (DAT_0064c488), unit_type_table (DAT_0064b1b8), govt_name_table (DAT_0064b9a0), terrain_table (DAT_00627cc4). | HIGH |
| 004F896A | large | FUN_004f896a | pedia_sort_entries | (u4* list_head, int* index_arr, int* id_arr, int count) | void | Selection sort of Civilopedia entries. Sorts linked list nodes alphabetically by string (strcmp), swapping corresponding index and ID array entries in parallel. O(n^2) but lists are small. | MEDIUM |
| 004F8A9B | small | FUN_004f8a9b | pedia_get_entry_name | (u4* list_head, int index) | char* | Traverses linked list to find entry with matching index (node[1]==index). Returns node[0] (name string) or fallback PTR_DAT_0062f008 if not found. | MEDIUM |
| 004F8AF9 | large | FUN_004f8af9 | pedia_push_history | (void) | void | Pushes current Civilopedia navigation state onto history stack (max 99 entries). Stores category, subcategory, and selection into arrays at offsets 0x12C/0x2BC/0x44C. Avoids duplicate consecutive entries. Handles redirect entries from DAT_0062f010. | MEDIUM |
| 004F8D04 | small | FUN_004f8d04 | pedia_timer_handler | (void) | void | Timer callback. Calls thunk_FUN_0047e94e(1,0) (likely screen update). Invalidates Civilopedia cache if needed (DAT_006a678c flag). | LOW |
| 004F8D51 | stub | FUN_004f8d51 | pedia_invalidate_cache | (void) | void | Calls CRichEditDoc::InvalidateObjectCache (Ghidra FID misidentification - actually invalidates a custom surface/bitmap cache at DAT_006a66b0). | LOW |

### Cluster: Framework / MFC Boilerplate (004FA0F0-004FA1FF)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FA0F0 | stub | FID_conflict_scalar_del | crt_scalar_deleting_dtor | (byte flags) | ptr | CControlBarInfo scalar deleting destructor. FRAMEWORK. | HIGH |
| 004FA140 | small | ~CControlBarInfo | event_node_dtor | (void) | void | Despite Ghidra's FID match to CControlBarInfo, this is likely the destructor for the scenario event node structure (0x1C4 bytes). SEH frame. FRAMEWORK. | MEDIUM |
| 004FA17E | stub | FUN_004fa17e | event_node_dtor_helper | (void) | void | Calls thunk_FUN_00452a67. Sub-object cleanup. FRAMEWORK. | LOW |
| 004FA194 | stub | FUN_004fa194 | event_node_seh_cleanup | (void) | void | SEH chain restoration. FRAMEWORK. | HIGH |
| 004FA1C0 | stub | FID_conflict___E31 | crt_static_init_events | (void) | void | CRT static initializer for events subsystem. FRAMEWORK. | HIGH |
| 004FA1DA | stub | FUN_004fa1da | events_static_ctor | (void) | void | Wraps FUN_005c64da (construct static event manager). FRAMEWORK. | LOW |
| 004FA1F4 | stub | FUN_004fa1f4 | events_register_atexit | (void) | void | Registers FUN_004fa211 as atexit handler. FRAMEWORK. | HIGH |
| 004FA211 | stub | FUN_004fa211 | events_static_dtor | (void) | void | atexit handler: calls FUN_005c656b (destroy static event manager). FRAMEWORK. | LOW |

### Cluster: Scenario Event System - Name Resolution

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FA250 | small | FUN_004fa250 | event_resolve_civ_name | (char* name) | int | Resolves civ name string to civ ID. Checks special keywords: "ANYBODY"=-2, "TRIGGERATTACKER"=-3, "TRIGGERDEFENDER"=-4, "TRIGGERRECEIVER"=-4. Then searches civ names 0-7 via thunk_FUN_00493c7d. Prints error "Could not find %s, check spelling" if not found. Returns -1 on failure. | HIGH |
| 004FA359 | small | FUN_004fa359 | event_resolve_unit_name | (char* name) | int | Resolves unit name to unit type ID. "ANYUNIT"=-2. Searches all 62 unit types via DAT_0064b1b8 (unit_type_table). Error message: "Could not find unit %s, check spelling". | HIGH |
| 004FA403 | small | FUN_004fa403 | event_resolve_terrain_name | (char* name) | int | Resolves terrain name to type ID (0-10). Searches PTR_s_DESERT_0062f168 array (11 entries: Desert through Ocean). Error: "Could not find terraintype %s". | HIGH |

### Cluster: Scenario Event System - Event Manager Object

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FA47E | stub | FUN_004fa47e | event_mgr_reset_pool | (u4 pool_size) | void | Resets memory pool at in_ECX+0x2F4. Calls thunk_FUN_004980ec (clear pool) then thunk_FUN_00497ea0 (init pool with 0xC-sized blocks, pool_size count). | MEDIUM |
| 004FA4BE | small | FUN_004fa4be | event_mgr_ctor | (u4 pool_size) | int(this) | Constructor for event manager. Creates CWnd (0x4000 style), calls thunk_FUN_00428cb0 (init strings), zeroes event list head (in_ECX+0x30C) and count (+0x308). Calls event_mgr_init. | MEDIUM |
| 004FA569 | small | FUN_004fa569 | event_mgr_dtor | (void) | void | Destructor. Clears memory pool, calls cleanup helpers. SEH frame. | MEDIUM |
| 004FA5B8 | stub | FUN_004fa5b8 | event_mgr_dtor_helper | (void) | void | Calls thunk_FUN_0059df8a (CWnd cleanup). FRAMEWORK. | LOW |
| 004FA5CB | stub | FUN_004fa5cb | event_mgr_seh_cleanup | (void) | void | SEH chain restoration. FRAMEWORK. | HIGH |
| 004FA5D9 | stub | FUN_004fa5d9 | event_mgr_init | (u4 pool_size) | void | Initializes event manager: zeroes list head and count, resets pool via event_mgr_reset_pool. | MEDIUM |
| 004FA617 | small | FUN_004fa617 | event_alloc_node | (void) | void* | Allocates a new event node (0x1C4 = 452 bytes). Appends to linked list at in_ECX+0x30C. Uses memory pool (thunk_FUN_00498159). Node layout: +0x1BC=next, +0x1C0=prev (doubly linked). Clears with memset. Increments count at +0x308. | MEDIUM |

### Cluster: Scenario Event System - Action Handlers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FA707 | small | FUN_004fa707 | event_action_play_sound | (int event_node) | int(0/1) | Plays WAV sound for event. Checks DAT_00655aea bit 0x10 (sound enabled). Constructs path: game_dir + "\\SOUND\\" + filename (event_node+0x184). Falls back to scenario dir. Returns 1 if sound enabled. | HIGH |
| 004FA82D | stub | FUN_004fa82d | event_action_flag_no_schism | (void) | int(1) | Sets DAT_006a9110=1 (disable schism/civil war). Always returns 1. | HIGH |
| 004FA854 | small | FUN_004fa854 | event_action_play_cd | (int event_node) | int(0/1) | Plays CD audio track. Reads track number from event_node+0x188. Validates track >= 2 via FUN_005ddeff (multimedia query). Calls thunk_FUN_0046e571 to play track. | MEDIUM |
| 004FA944 | medium | FUN_004fa944 | event_action_change_money | (int event_node) | int(0/1) | Changes civ treasury. Resolves civ from event_node+0x178 (handles TRIGGERATTACKER/DEFENDER substitution from +0x18/+0x24). Adds amount (event_node+0x17C) to civ gold, clamped to [0, 30000]. Checks civ is active. | HIGH |
| 004FAAB0 | small | FUN_004faab0 | event_action_show_text | (int event_node) | int(1) | Displays event text. Iterates up to 20 text lines from event_node+0x38 (each is a string pointer). Copies strings to DAT_0063cc48 array. Shows dialog (thunk_FUN_00511880 with 0x4F). | HIGH |
| 004FABA6 | medium | FUN_004faba6 | event_action_make_aggression | (int event_node) | int(0/1) | Makes one civ declare war on another. Resolves "who" from +0xD0 and "whom" from +0xC8 (with trigger substitution). Validates both are active. Calls thunk_FUN_00579c40 (declare war function). | HIGH |
| 004FAD02 | small | FUN_004fad02 | event_action_destroy_civ | (int event_node) | int(0/1) | Destroys a civilization. Resolves target from +0x1B0. If target is human player, sets DAT_0064b1ac=4 (defeat flag). Calls thunk_FUN_004e1763(civ, 1, 1) to destroy. | HIGH |
| 004FADFB | small | FUN_004fadfb | event_action_give_tech | (int event_node) | int(0/1) | Gives technology to a civilization. Resolves receiver from +0x1B8, tech ID from +0x1B4. Calls thunk_FUN_004bf05b(civ, tech, 0, 0, 0). | HIGH |
| 004FAED4 | xlarge | FUN_004faed4 | event_action_create_unit | (int event_node) | int(0/1) | Creates units at specified locations. Resolves owner from +0xD8. Iterates location list (+0xE4/+0xE8, count at +0x134). For air units (domain==2), validates airbase/city. For land/sea, checks for valid tile. Creates unit via thunk_FUN_005b3d06. Optionally sets veteran flag (0x2000 in unit status). Sets orders to sentry (0xFF). Home city lookup by name (+0x13C). | HIGH |
| 004FB29F | large | FUN_004fb29f | event_action_move_unit | (int event_node) | int(count) | Moves units matching criteria to target location. Resolves owner from +0x8C. For AI only (not human). Searches unit list backwards, finds units of matching type within bounding box (+0x9C-0xC0). Sets orders to goto (0x0B), ai_role to 0x37, assigns goto coordinates. Returns count of units moved. Count limit at +0x98 (-2 = unlimited). | HIGH |
| 004FB5B2 | xlarge | FUN_004fb5b2 | event_action_change_terrain | (int event_node) | int(count) | Changes terrain type in a map rectangle. First pass: deletes cities (thunk_delete_city) and kills units (thunk_FUN_005b4391) in the area. Second pass: sets new terrain type from +0x18C, clears tile improvements/visibility, recalculates terrain data. Third pass: validates all cities still have valid tiles. If a civ loses all cities, destroys the civ (thunk_new_civ) and clears its visibility from all tiles. | HIGH |

### Cluster: Scenario Event System - Trigger Checks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FBA0C | small | FUN_004fba0c | event_check_turn_trigger | (int turn) | int(0/1) | Checks all event nodes for turn triggers (type==4). Fires if turn matches or turn==-1 (every turn). Calls event_dispatch_actions. | HIGH |
| 004FBA9C | small | FUN_004fba9c | event_check_interval_trigger | (int turn) | int(0/1) | Checks for turn interval triggers (type==8). Fires if interval==0 (every turn) or turn%interval==0. | HIGH |
| 004FBB2F | small | FUN_004fbb2f | event_check_random_trigger | (void) | int(0/1) | Checks random turn triggers (type==0x40). Rolls rand()%denominator+1; fires if result equals denominator. | HIGH |
| 004FBBDD | medium | FUN_004fbbdd | event_check_tech_trigger | (void) | int(0/1) | Checks received technology triggers (type==0x100). For ANYBODY (-2), searches all 8 civs. Checks if civ has specific tech via thunk_FUN_004bd9f0. | HIGH |
| 004FBD2B | small | FUN_004fbd2b | event_check_scenario_loaded | (void) | int(0/1) | Checks scenario loaded triggers (type==0x20). Always fires. | HIGH |
| 004FBD9D | small | FUN_004fbd9d | event_check_unit_killed | (int unit_type, int attacker, int defender) | int(0/1) | Checks unit killed triggers (type==1). Matches unit type, attacker civ, defender civ. ANYBODY (-2) matches any. Fills in wildcard slots. | HIGH |
| 004FBE84 | large | FUN_004fbe84 | event_check_negotiation | (int civ1, int civ2) | int(0/1) | Checks negotiation triggers (type==0x10). Complex matching: validates talker/listener against human/computer/either type requirements. For MP (save version > 2), also checks symmetric case (both civs human). Special action flag 0x1000 at node+0x60*4 means "prevent negotiation" (returns 0). | HIGH |
| 004FC20D | small | FUN_004fc20d | event_check_no_schism | (int civ_id) | int(0=blocked/1=ok) | Checks no-schism triggers (type==0x80). If matching trigger found for civ_id (or ANYBODY), fires it and returns 0 (block schism). Returns 1 if no matching trigger. | HIGH |
| 004FC2BB | small | FUN_004fc2bb | event_check_city_taken | (char* city_name, int attacker, int defender) | int(0/1) | Checks city taken triggers (type==2). Matches city name (case-insensitive), attacker and defender civs. Fills wildcards. | HIGH |

### Cluster: Scenario Event System - Action Dispatcher

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FC3AE | medium | FUN_004fc3ae | event_dispatch_actions | (int event_node) | int(0/1) | **Master action dispatcher** for a triggered event. Checks prerequisite flags (byte at +4 and +5). Dispatches based on action bitflags: bit 0x10=play_sound, 0x80=play_cd, 0x04=create_unit, 0x02=move_unit, bit5+0x02=change_terrain, 0x20=show_text, 0x08=change_money, bit5+0x04=destroy_civ, bit5+0x08=give_tech, 0x01=show_text, bit5+0x01=flag_no_schism. Flag 0x40 sets "just once" marker (0x2000). Guards: 0x40+bit5_0x20 = already fired once (skip). | HIGH |

### Cluster: Scenario Event File Parser

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004FC516 | xlarge | FUN_004fc516 | parse_events_file | (u4 filename, u4 section_name) | int(0=ok/1=err) | **Master EVENTS.TXT parser** (12813 bytes -- the largest function in this block). Parses scenario event scripting language. State machine with states: 1=start, 2=IF block, 3=THEN block, 5=ENDIF, 6=continuation, 10=done. **IF triggers**: UNITKILLED (unit/attacker/defender), NEGOTIATION (talker/talkertype/listener/listenertype), CITYTAKEN (city/attacker/defender), TURN (turn number/EVERY), TURNINTERVAL (interval), RANDOMTURN (denominator), SCENARIOLOADED, NOSCHISM (defender), RECEIVEDTECHNOLOGY (receiver/technology). **THEN actions**: TEXT..ENDTEXT (up to 20 lines), CHANGETERRAIN (terraintype/maprect), CREATEUNIT (unit/owner/veteran/homecity/locations..endlocations), CHANGEMONEY (receiver/amount), JUSTONCE, DONTPLAYWONDERS, MAKEAGGRESSION (who/whom), DESTROYACIVILIZATION (whom), GIVETECHNOLOGY (receiver/technology), MOVEUNIT (unit/owner/maprect/moveto/numbertomove), PLAYCDTRACK, PLAYWAVEFILE. Uses memory pool for string allocation. Has @DEBUG mode with printf tracing. Error message: "BADEVENTSFILE". | HIGH |

---

## SUMMARY

### 1. Total Functions and Breakdown

**Total functions: 70**

| Category | Count | Functions |
|----------|-------|-----------|
| City Turn Processing | 5 | calc_building_upkeep_cost, pay_building_upkeep, find_city_expansion_site, handle_city_expansion, process_city_turn |
| Space Race | 1 | handle_space_race_victory |
| Civilopedia GUI | 28 | pedia_window_ctor/dtor, pedia_manager_ctor/dtor, pedia_init_layout, pedia_draw_frame, pedia_draw_item_list, pedia_select_entry, pedia_load_index_data, pedia_sort_entries, pedia_handle_keypress, pedia_handle_back, etc. |
| Scenario Events - Parser | 1 | parse_events_file (12813B -- single largest function) |
| Scenario Events - Triggers | 8 | event_check_turn_trigger, _interval, _random, _tech, _scenario_loaded, _unit_killed, _negotiation, _city_taken, _no_schism |
| Scenario Events - Actions | 11 | event_action_play_sound, _play_cd, _change_money, _show_text, _make_aggression, _destroy_civ, _give_tech, _create_unit, _move_unit, _change_terrain, _flag_no_schism |
| Scenario Events - Infrastructure | 7 | event_mgr_ctor/dtor, event_alloc_node, event_resolve_civ/unit/terrain_name, event_dispatch_actions |
| Framework / CRT | 9 | Static init/atexit pairs, SEH cleanup, scalar deleting destructors |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_004fc516 / parse_events_file** (004FC516, 12813B) -- Complete EVENTS.TXT parser for Civ2 scenario scripting. Defines the entire event language grammar: 9 trigger types and 12 action types. Essential for understanding scenario modding.

2. **FUN_004f0a9c / process_city_turn** (004F0A9C, 1903B) -- Master per-city turn processing loop. Ties together production, food, happiness, disorder, building upkeep, expansion, and unit support. The core city simulation tick.

3. **FUN_004f00f0 / calc_building_upkeep_cost** (004F00F0, 305B) -- Building upkeep calculation with difficulty, tech-chain, and government modifiers. Documents Fundamentalism's free temples/libraries/universities.

4. **FUN_004f7c99 / pedia_load_index_data** (004F7C99, 3281B) -- Parses Describe.txt to build Civilopedia category indices. Documents the file format and which game data tables are used for each category.

5. **FUN_004fc3ae / event_dispatch_actions** (004FC3AE, 360B) -- Central event action dispatcher. Documents the complete set of scenario event action bitflags and their execution order.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_006a65d4 | settler_priority | Used in handle_city_expansion, adjusted by city size and barracks presence |
| DAT_006a65e0 | expansion_target_x | Set by find_city_expansion_site, consumed by handle_city_expansion |
| DAT_006a65e8 | expansion_target_y | Set by find_city_expansion_site, consumed by handle_city_expansion |
| DAT_0062ee0c | expansion_site_found | Flag: 1=valid expansion site located by find_city_expansion_site |
| DAT_006aa760 | city_processing_active | Set to 1 at start of process_city_turn, 0 at end. Guards re-entrant calls |
| DAT_006a65ac | is_human_city | Set to 1 if city belongs to human player during process_city_turn |
| DAT_006a65a0 | city_disorder_flag | Set during production, checked at end of process_city_turn to trigger disorder handler |
| DAT_0062f160 | events_debug_mode | Printf debug tracing for EVENTS.TXT parser (@DEBUG keyword) |
| DAT_006a9110 | no_schism_flag | Set by event_action_flag_no_schism, prevents civil war/schism |
| DAT_006a677c | pedia_closed_flag | 1=Civilopedia display closed, 0=open |
| DAT_006a6790 | pedia_history_index | Current position in Civilopedia navigation history stack |
| DAT_006a6780 | pedia_current_category | Current category (1-8) displayed in Civilopedia |
| DAT_006a6784 | pedia_subcategory | Current subcategory/drill-down level in Civilopedia |
| DAT_006a6788 | pedia_selected_item | Currently selected item index in Civilopedia list |
| DAT_006a85a0 | pedia_cursor_item | Cursor position in Civilopedia item list |
| DAT_006a85a4 | pedia_scroll_offset | Scroll offset for Civilopedia list (multiple of 9) |
| DAT_006a819c | pedia_total_entries | Total entry count for current Civilopedia category |
| DAT_006a7d44 | pedia_list_advances | Linked list head for Civilopedia advance entries |
| DAT_006a7d48 | pedia_list_improvements | Linked list head for improvement entries |
| DAT_006a7d4c | pedia_list_wonders | Linked list head for wonder entries |
| DAT_006a7d50 | pedia_list_units | Linked list head for unit entries |
| DAT_006a7d54 | pedia_list_govts | Linked list head for government entries |
| DAT_006a7d58 | pedia_list_terrain | Linked list head for terrain entries |
| DAT_006a7d5c | pedia_list_concepts | Linked list head for concept entries |
| DAT_0064b1ac | defeat_flag | Set to 4 when human player is defeated (by event_action_destroy_civ) |
| DAT_0062d040 | pathfinding_active | Flag used during AI pathfinding in find_city_expansion_site |
