# Block 005B0000 -- Phase 7 Audit

**Functions in this block: 242**
**System: Map editor UI, unit linked-list management (create/delete/pick-up/put-down/relocate/stack/unstack), unit movement-point calculation, unit queries (find/count/iterate), map tile data accessors (terrain/improvements/visibility/owner/city/continent), map tile modifiers (with multiplayer sync), map memory allocation, map save/load, nuclear fallout, special resource seeding, hut discovery adjacency, GDI windowing framework (create/destroy/show/hide/move/resize/palette/cursor/blit/invalidate), image file loaders (LBM/TGA/PCX/GIF/BMP/CvPic), SEH wrappers**

---

## UI -- Map Editor (11 functions)

FUN_005b02a5 | 196B | N/A (map_editor_toggle — switches between two rendering modes based on FUN_00418d60 return; calls FUN_0043c5f0 / FUN_0040f380 in 3 combinations)
FUN_005b0373 | 256B | N/A (map_editor_command_handler — handles command IDs 0xC9 and 0xCD; 0xC9 toggles mode or restores from saved value at +0x2EC, shows debug notice; 0xCD delegates to FUN_005b02a5)
FUN_005b0473 | 1111B | N/A (map_editor_populate_listbox — populates dropdown/listbox based on param 0-4; case 0 adds 62 terrain names, cases 1-2 add 100 improvements + 2 extras, case 3 adds 8 resource items, case 4 adds 3 city placement items; uses CPropertySheet window positioning)
FUN_005b08e8 | 244B | N/A (map_editor_create_icon_button — creates a small icon button at position from lookup table, size 0x30 pixels)
FUN_005b09dc | 1627B | N/A (map_editor_paint — paints the map editor window: renders terrain preview, civ flag icon, 13 labeled text buttons for editor tools (terrain/improvements/resources/city placement/etc.), each with text from string table IDs 0x1E1-0x1E8)
FUN_005b1037 | 2484B | N/A (map_editor_init — initializes the full map editor UI: allocates editor surface, loads EDITORSA.GIF, creates 4 bottom toolbar buttons, 3 side panel buttons, sets up dropdown list controls, enters main editor loop via FUN_0040ef50 until DAT_006a1d7c becomes 0)
FUN_005b1a05 | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_005b1a1b | 14B | N/A (SEH epilog — restores FS:[0])
FUN_005b1a29 | 89B | N/A (map_editor_launch — wrapper: creates editor palette via FUN_00417fa0, calls FUN_005b1037 to init editor, cleans up)
FUN_005b1a82 | 12B | N/A (SEH destructor thunk — calls FUN_004183d0)
FUN_005b1a98 | 14B | N/A (SEH epilog — restores FS:[0])

---

## GL -- Unit Linked-List Management (30 functions)

FUN_005b2590 | 1050B | **GL** (validate_unit_stack — validates unit linked list integrity for unit `param_1`; detects infinite loops (>0x7FF), dead units (id==0) in prev/next chains, and cross-location links; repairs broken links by setting to -1; returns 1 if valid, 0 if repaired)
FUN_005b29aa | 45B | **GL** (get_unit_max_hp — returns max HP for unit's type from UNIT_DEFS[type].hp)
FUN_005b29d7 | 98B | **GL** (get_unit_remaining_hp — returns max_hp - damage_taken; if DAT_00655ae8 bit 0x10 clear, resets damage to 0 first; clamps result to min 0)
FUN_005b2a39 | 516B | **GL** (get_unit_max_moves — calculates unit's max movement points; adds bonuses for sea units: +1 from Lighthouse (tech 0x3B), +2 from Nuclear Power, +1 from Magellan (tech 3) if not flag 0x20; for damaged units with DAT_00655ae8 bit 0x10 set, scales by remaining_hp/max_hp rounded up to UNIT_MOVE_BASE; clamps to 2× or 1× base depending on domain)
FUN_005b2c3d | 69B | **GL** (get_unit_remaining_moves — returns max_moves - moves_spent; clamps to min 0)
FUN_005b2c82 | 65B | **GL** (get_next_unit_in_stack — validates stack then returns next unit link; returns -1 if none)
FUN_005b2cc3 | 118B | **GL** (get_last_unit_in_stack — walks forward links to end of stack; returns last unit or input if stack is single)
FUN_005b2d39 | 118B | **GL** (get_first_unit_in_stack — walks backward links to head of stack; returns first unit or input if single)
FUN_005b2daf | 186B | **GL** (find_stack_at_tile_for_civ — finds first unit at (x,y) belonging to civ `param_1`; returns head of that stack via get_first_unit)
FUN_005b2e69 | 231B | **GL** (find_any_stack_at_tile — finds first unit at (x,y) from any civ; optionally checks map validity via FUN_005b8d62; returns head of stack)
FUN_005b2f50 | 66B | **GL** (set_unit_goto_order — if unit not already in GOTO mode (order != 3), clears goto target; sets order to 3)
FUN_005b2f92 | 117B | **GL** (get_nth_unit_in_stack — iterates stack from head, returns nth unit)
FUN_005b3007 | 63B | **GL** (count_units_below — counts units backward-linked from param_1; returns count)
FUN_005b3046 | 163B | **GL** (get_nth_unit_by_domain — iterates stack, finds nth unit matching specified domain class)
FUN_005b30e9 | 77B | **GL** (count_units_in_stack — counts total units from head to end)
FUN_005b3136 | 104B | **GL** (count_units_of_type — counts units of specific type in a stack)
pick_up_unit_005b319e | 705B | **GL** (pick_up_unit — removes unit from tile's linked list: unlinks prev/next pointers, clears unit presence bit on map tile if unit was alone, sets unit coords to negative offscreen; multiplayer-aware with server sync)
FUN_005b345f | 640B | **GL** (put_down_unit — places unit at (x,y): links into existing stack or sets tile unit-presence bit and owner; multiplayer-aware)
FUN_005b36df | 388B | **GL** (relocate_unit — combined pick_up + put_down; multiplayer-aware)
FUN_005b3863 | 60B | **GL** (re_place_unit — relocates unit to its current position, re-linking it in the stack)
FUN_005b389f | 577B | **GL** (move_unit_to_stack_bottom — removes unit from current position and appends to end of stack; multiplayer-aware)
FUN_005b3ae0 | 152B | **GL** (relocate_entire_stack — relocates all units in a stack to new (x,y))
FUN_005b3b78 | 343B | **GL** (unload_sea_units — iterates stack, moves all sea-domain units to offscreen coords, then moves remaining land units to the sea units' original position; used for disembarkation)
FUN_005b3cd4 | 50B | **GL** (unload_and_get_head — calls unload_sea_units then returns new stack head)
FUN_005b3d06 | 1675B | **GL** (create_unit — allocates a new unit: finds free slot, increments civ unit counts, initializes all 32 bytes of unit record, places on map, handles tutorial popups for first ships/air/caravan/ground units; multiplayer-aware)
FUN_005b4391 | 1129B | **GL** (delete_unit — removes unit: decrements civ unit counts, picks up from tile, zeroes ID, clears GOTO orders referencing this unit, recalculates city display, kills civ if last settler+city gone; multiplayer-aware)
FUN_005b47fa | 144B | **GL** (delete_entire_stack — iterates stack and deletes each unit; multiplayer-aware)
FUN_005b488a | 39B | **GL** (clear_unit_visibility — clears unit's visibility bitmask to 0)
FUN_005b48b1 | 88B | **GL** (clear_stack_visibility — clears visibility for all units in stack)
FUN_005b490e | 96B | **GL** (mark_unit_seen_by_civ — sets bit in unit's visibility bitmask for the specified civ; skips if civ is unit's own owner)

---

## GL -- Unit Stack Operations & Queries (24 functions)

FUN_005b496e | 92B | **GL** (mark_stack_seen_by_civ — marks all units in stack as seen by specified civ)
FUN_005b49cf | 407B | **GL** (check_adjacent_enemy — checks 8 surrounding tiles for an enemy civ; considers map visibility layers and peace treaties (diplomacy flag & 8); sets DAT_006ced4c to found enemy civ)
FUN_005b4b66 | 253B | **GL** (check_adjacent_enemy_simple — simpler version; checks 8 neighbors for any enemy using FUN_005b8d62 tile owner check; sets DAT_006ced4c)
FUN_005b4c63 | 297B | **GL** (check_adjacent_enemy_same_continent — like check_adjacent_enemy_simple but also requires same continent via FUN_005b89e4; sets DAT_006ced4c)
FUN_005b4d8c | 86B | **GL** (check_adjacent_enemy_if_unowned — only checks for adjacent enemy if tile has no city owner (FUN_005b8ca6 < 0))
FUN_005b4de2 | 251B | **GL** (is_civ_adjacent_to_tile — checks if specified civ has units or city on any of 8 adjacent tiles; returns bool)
FUN_005b4ee2 | 90B | **GL** (mark_stack_visibility_mask — ORs a bitmask into all units' visibility in stack)
FUN_005b4f3c | 142B | **GL** (get_civs_adjacent_to_tile — builds bitmask of all civs present on or adjacent to tile; checks unit owner and is_civ_adjacent for each civ 1-7)
FUN_005b4fca | 113B | **GL** (mark_stack_seen_by_adjacent_civs — for each civ 1-7 adjacent to unit's tile, marks the stack as seen by that civ)
FUN_005b503b | 114B | **GL** (has_unit_type_in_stack — returns 1 if stack contains a unit of specified type)
FUN_005b50ad | 724B | **GL** (sum_stack_property — sums a property across units in stack based on mode: 0=cargo capacity, 1=attack, 2=count, 3=defense, 4=air units in transport, 5=sea-domain count, 6=net transport capacity, 7=air units with range>1, 8=missile count (flag 0x10), 9=settler count (flag 0x80), 10=diplomat/spy count (flag 0x08); mode 11 traverses raw next links)
FUN_005b53b6 | 120B | **GL** (count_units_by_role — counts units in stack whose UNIT_ROLE matches param_2)
FUN_005b542e | 1912B | **GL** (stack_ship_units — loads units onto a transport: removes sea units first (unload_sea_units), then iterates stack assigning land/air units to transport via GOTO order or direct placement; handles capacity limits, two-pass logic for owned vs allied units)
FUN_005b5bab | 488B | **GL** (stack_single_unit — if unit is sea-domain, calls stack_ship_units; otherwise relocates to offscreen; multiplayer-aware)
FUN_005b5d93 | 677B | **GL** (delete_unit_safely — smart deletion: for sea units on water, unloads cargo first then deletes all; for land units, unloads and deletes; handles edge cases for units at offscreen coords)
FUN_005b6042 | 456B | **GL** (delete_unit_visible — delete_safely + updates display via FUN_0047cea6; multiplayer-aware)
FUN_005b620a | 228B | **GL** (unload_all_ships_in_stack — iterates stack, for each sea unit calls stack_ship_units to unload; returns max capacity)
FUN_005b62ee | 81B | **GL** (set_all_orders_in_stack — sets all units in stack to specified order byte)
FUN_005b633f | 271B | **GL** (is_unit_ready_to_move — returns 1 if unit belongs to current player, not in GOTO/sentry, has moves remaining, and not flagged bit 2)
FUN_005b6458 | 176B | **GL** (is_unit_actionable — returns 1 if unit is on map, not in GOTO, and has moves remaining)
FUN_005b6512 | 629B | **GL** (find_next_unit_needing_orders — searches all units for closest ready-to-move unit; prefers current unit, 3-pass search clearing "already visited" flag 0x4000 each pass)
FUN_005b6787 | 40B | **GL** (refresh_unit_moves — recalculates and stores unit's max movement points)
FUN_005b67af | 233B | **GL** (find_nearest_unit — finds closest unit to (x,y) optionally filtered by owner; returns unit index, stores distance in DAT_006ced50)
FUN_005b6898 | 89B | **GL** (get_unit_home_city_name — returns city name string for unit's home city; returns "NONE" string if no home city)

---

## GL -- Unit Build/Check Helpers (4 functions)

FUN_005b68f6 | 354B | **GL** (check_tile_buildable — checks if a tile can have something built on it: no city owner, terrain not flagged 0x08 (impassable), and if flagged 0x04 (requires tech), checks civ has tech 0x46; checks terrain improvement slots via DAT_00627cce against civ's advance level)
FUN_005b6a58 | 72B | **GL** (cancel_unit_order — clears unit's order to 0xFF (no order) and clears flag 0x8000)
FUN_005b6aa0 | 21B | **GL** (always_returns_1 — trivial function returning 1; possibly a permission/capability stub)
FUN_005b6ab5 | 53B | **GL** (draw_unit_info_popup — calls FUN_0056baff to draw unit info panel at position with height param_5+2)

---

## UI -- Unit List Dialog (4 functions)

FUN_005b6aea | 693B | N/A (show_unit_stack_dialog — creates a popup dialog listing units in a stack; shows up to 9 units with civ leader name, veterancy marker, unit type name, home city; for caravans shows commodity)
FUN_005b6d9f | 12B | N/A (SEH helper — calls FUN_0059df8a; dialog cleanup)
FUN_005b6dab | 9B | N/A (SEH helper — calls FUN_005cde4d; CString destructor)
FUN_005b6dbe | 15B | N/A (SEH epilog — restores FS:[0])

---

## GL -- Map Tile Data: Memory Management (4 functions)

FUN_005b7fe0 | 1078B | **GL** (map_allocate — allocates map tile data: 6-byte main tile array (DAT_00636598) sized at mapW/2×mapH×6, 7 per-civ visibility layers (each mapW/2×mapH), 4 quadrant arrays of size (mapW/4)×(mapH/4); initializes all tiles to terrain=10 (ocean), all flags zeroed)
FUN_005b8416 | 488B | **GL** (map_deallocate — frees all map tile memory: 4 quadrant arrays, 7 civ visibility layers, main tile array; resets DAT_006365f0 flag)
FUN_005b85fe | 55B | **GL** (map_seed_resources — generates a 15-bit random seed for special resource placement from clock; stores in DAT_006d1168; ensures nonzero)
FUN_005b8635 | 309B | **GL** (map_save — writes map data to file: 14-byte header (DAT_006d1160), 7 civ visibility layers or 2×0x2A-byte scenario data, then 6×mapSize main tile data)

---

## GL -- Map Tile Data: Load (1 function)

FUN_005b8783 | 405B | **GL** (map_load — reads map data from file: 14-byte header, handles scenario vs normal format, reallocates map memory, reads civ visibility layers and main tile data)

---

## GL -- Map Tile Data: Accessors (20 functions)

FUN_005b8931 | 90B | **GL** (get_tile_ptr — returns pointer to 6-byte tile record at (x,y); returns &DAT_006d1188 dummy if coords are off-map)
FUN_005b898b | 48B | **GL** (get_civ_visibility_ptr — returns pointer into per-civ visibility layer for (x,y,civ))
FUN_005b89bb | 41B | **GL** (get_terrain_byte — returns tile byte 0 masked to low nibble (terrain type 0-15))
FUN_005b89e4 | 57B | **GL** (is_ocean — returns true if terrain type is 10 (ocean))
FUN_005b8a1d | 100B | **GL** (get_tile_unit_owner — returns tile byte 5 high nibble (>>4); returns -1 if 0xF or off-map)
FUN_005b8a81 | 39B | **GL** (get_tile_city_id — returns tile byte 3; city index or 0xFF for none)
FUN_005b8aa8 | 72B | **GL** (get_tile_city_id_if_not_ocean — returns city_id if tile is not ocean, else -1)
FUN_005b8af0 | 42B | **GL** (get_tile_river_flags — returns tile byte 2 bits 5-7 (>>5); river/special flags)
FUN_005b8b1a | 75B | **GL** (update_civ_visibility_from_tile — if param_3 != 0, reads tile byte 1 (improvements) and updates per-civ visibility layer via FUN_005b9d81)
FUN_005b8b65 | 71B | **GL** (check_tile_visibility_for_civ — returns whether bit for civ `param_3` is set in tile byte 4 (visibility); returns 1 for civ < 0)
FUN_005b8bac | 108B | **GL** (set_tile_visibility_for_civ — sets or clears visibility bit for specified civ via FUN_005b976d)
FUN_005b8c18 | 42B | **GL** (get_tile_continent_ext — returns tile byte 5 low nibble (& 0xF); continent ID extension)
FUN_005b8c42 | 100B | **GL** (get_tile_effective_landmass — returns river_flags if nonzero; else returns continent_ext, mapping 1-8 to 8)
FUN_005b8ca6 | 111B | **GL** (get_tile_city_owner — returns unit_owner if tile has city (improvement byte & 0x42 == 0x02); returns -1 otherwise)
FUN_005b8d15 | 77B | **GL** (get_tile_fortress_owner — returns unit_owner if tile has fortress+city flags (byte & 0x42 == 0x42); returns -1 otherwise)
FUN_005b8d62 | 66B | **GL** (get_tile_unit_owner_if_units — returns unit_owner if tile has unit_present flag (byte & 0x01); returns -1 otherwise)
FUN_005b8da4 | 72B | **GL** (get_tile_owner_any — returns city_owner if city present, else unit_owner if units present; returns -1 otherwise)
FUN_005b8dec | 245B | **GL** (check_tile_zoc — checks zone of control: returns enemy civ if tile is owned by another civ that is not at peace and is hostile; returns -1 for allied/neutral)
FUN_005b8ee1 | 281B | **GL** (get_special_resource — calculates whether tile has a special resource using pseudo-random formula based on coordinates and map seed DAT_006d1168; returns 0/1/2 for none/resource1/resource2; excludes ocean tiles and tiles with river flag 0x40)
FUN_005b8ffa | 229B | **GL** (has_minor_tribe_hut — calculates whether tile has a goody hut using similar pseudo-random formula with different seed offset; returns 1 if hut present, 0 otherwise; only on unowned non-ocean tiles)

---

## GL -- Map Tile Data: Nuclear Fallout & Pollution (2 functions)

FUN_005b90df | 154B | **GL** (spread_pollution_to_tile — sets pollution flag 0x80 on tile improvements if not already set; updates all civ visibility layers; increments global pollution counter DAT_00655b12)
FUN_005b9179 | 696B | **GL** (nuclear_fallout — applies nuclear explosion effects in 3×3 area: for each tile, if no city, randomly clears improvements (irrigation, mines, roads, railroads) and forests, 2/3 chance to spread pollution; cities take population damage; updates display)

---

## GL -- Map Tile Data: Tech Discovery Check (2 functions)

FUN_005b9431 | 78B | **GL** (civ_has_discovered_tech — checks if civ `param_1` has discovered tech `param_2` by testing a bit in the discoveries bitmask array at DAT_00666137)
FUN_005b947f | 86B | **GL** (count_discovered_techs — counts total techs discovered by civ for techs 1-62)

---

## GL -- Map Tile Data: Modifiers (8 functions)

FUN_005b94d5 | 39B | **GL** (get_tile_improvements — returns tile byte 1: improvement flags)
FUN_005b94fc | 330B | **GL** (set_tile_improvements — sets or clears bits in tile byte 1; sends multiplayer sync message 0x90; uses batched or immediate send based on server/client state)
FUN_005b9646 | 295B | **GL** (set_tile_terrain — sets low nibble of tile byte 0 to new terrain type; sends multiplayer sync message 0x91)
FUN_005b976d | 330B | **GL** (set_tile_visibility — sets or clears bits in tile byte 4 (per-civ visibility); sends multiplayer sync message 0x92)
FUN_005b98b7 | 305B | **GL** (set_tile_continent_ext — sets low nibble of tile byte 5 to continent ID; sends multiplayer sync message 0x93)
FUN_005b99e8 | 333B | **GL** (set_tile_unit_owner — sets high nibble of tile byte 5 to owner ID (<<4), clamping out-of-range to 0xF; sends multiplayer sync message 0x94)
FUN_005b9b35 | 276B | **GL** (set_tile_city_id — sets tile byte 3 to city index; sends multiplayer sync message 0x95)
FUN_005b9c49 | 312B | **GL** (set_tile_river_flags — sets bits 5-7 of tile byte 2 to river/special flags (<<5, &7); sends multiplayer sync message 0x96)

---

## GL -- Map Tile Data: Per-Civ Visibility Layer (1 function)

FUN_005b9d81 | 325B | **GL** (set_civ_visibility_layer — writes or ORs a value into the per-civ visibility layer byte at (x,y,civ); sends multiplayer sync message 0x97)

---

## GL -- Map Tile Multiplayer Batching (4 functions)

FUN_005b9ec6 | 86B | **GL** (begin_tile_batch — begins batched tile updates for multiplayer: disables individual sends (DAT_006ad699=0), enables batching (DAT_006ad69a=1), clears batch buffer DAT_006d1190)
FUN_005b9f1c | 194B | **GL** (end_tile_batch — ends batched tile updates: re-enables individual sends, sends accumulated batch as message 0x59 if buffer has entries; flushes send buffer)
FUN_005b9fde | 515B | **GL** (add_tile_to_batch — adds a tile modification to the batch buffer; each operation type (0-7) has different parameter counts; flushes buffer and restarts if near capacity (0x100))
FUN_005ba206 | 510B | **GL** (apply_tile_batch — server-side: replays a batch of tile modifications received from network; iterates batch entries, dispatches to appropriate set_tile_* function based on operation type 0-7)

---

## FW -- Framework: File Path Utilities (5 functions)

FUN_005bad40 | 135B | N/A (parse_binary_string — converts a string of '0' and '1' characters to an integer; ignores non-0/1 characters and skips to end)
FUN_005badf0 | 145B | N/A (build_file_path — concatenates directory path with filename, ensures trailing backslash, converts to uppercase)
FUN_005baeb0 | 24B | N/A (set_render_context — sets DAT_006366a8 to param_1)
FUN_005baec8 | 24B | N/A (set_font_context — sets DAT_006366ac to param_1)
FUN_005baee0 | 68B | N/A (set_font_params — sets font size/style params DAT_006366b0-DAT_006366bc)

---

## FW -- Framework: Text Rendering (4 functions)

FUN_005baf24 | 51B | N/A (set_text_shadow — sets DAT_006366c0 flag for text drop-shadow rendering)
FUN_005baf57 | 205B | N/A (draw_text_with_shadow — renders text with optional shadow and bold font; applies shadow offset DAT_006366c0 and secondary font color DAT_006366b4)
FUN_005bb024 | 139B | N/A (draw_text_centered — centers text horizontally within a given width and draws with shadow)
FUN_005bb0af | 131B | N/A (draw_text_right_aligned — right-aligns text within a given width and draws with shadow)

---

## FW -- Framework: Port/Surface Setup (14 functions)

FUN_005bb3f0 | 115B | N/A (create_port_rect — creates a rendering port from rectangle coordinates; initializes DIB, sets active palette)
FUN_005bb463 | 75B | N/A (create_port_rect_with_pal — create_port_rect + selects palette)
FUN_005bb4ae | 119B | N/A (create_port_rect_ext — creates port with extended 8-param constructor)
FUN_005bb525 | 79B | N/A (create_port_rect_ext_with_pal — create_port_rect_ext + selects palette)
FUN_005bb574 | 74B | N/A (update_active_port — sets DAT_00637ea4 to window handle + 0x48, calls repaint callback, redraws)
FUN_005bb5be | 94B | N/A (handle_scroll_event — processes scroll input, converts to new viewport position)
FUN_005bb621 | 166B | N/A (resize_viewport — resizes the active viewport if dimensions changed; calls CRichEditCntrItem vtable method, updates active port)
FUN_005bb6c7 | 153B | N/A (clamp_viewport_position — clamps viewport x,y to valid min/max range from scroll limits)
FUN_005bb760 | 99B | N/A (create_surface_6param — creates a rendering surface with 6 params)
FUN_005bb7c3 | 71B | N/A (create_surface_6param_with_pal — surface + palette)
FUN_005bb80a | 103B | N/A (create_surface_7param — creates surface with 7 params via FUN_005c592b)
FUN_005bb871 | 75B | N/A (create_surface_7param_with_pal — surface + palette)
FUN_005bb8c0 | 28B | N/A (get_viewport_offset — returns value at ECX+4)
FUN_005bb8e0 | 47B | N/A (set_viewport_size — calls FUN_005bc505 to resize viewport)

---

## FW -- Framework: Viewport Queries (3 functions)

FUN_005bb910 | 49B | N/A (get_scroll_min — returns min scroll x,y from ECX+0x7C/0x80)
FUN_005bb950 | 52B | N/A (get_scroll_max — returns max scroll x,y from ECX+0x84/0x88)
FUN_005bb990 | 47B | N/A (invoke_repaint_callback — if ECX+0x110 callback is set, calls it)

---

## FW -- Framework: Windows Message Pumps (6 functions)

FUN_005bb9c0 | 93B | N/A (flush_mouse_and_key_messages — PeekMessage loops to drain WM_MOUSEMOVE..WM_MBUTTONDBLCLK and WM_KEYDOWN..WM_KEYLAST)
FUN_005bba1d | 50B | N/A (flush_all_messages — PeekMessage loop drains all messages)
gdi_BA4F | 100B | N/A (process_one_message — peeks one message; if found, translates and dispatches; else calls idle handler and DirectX flip)
gdi_BAB8 | 77B | N/A (process_paint_message — peeks/dispatches WM_PAINT (0x0F) only)
FUN_005bbb0a | 40B | N/A (process_all_messages_flush_gdi — processes all messages then calls GdiFlush)
FUN_005bbb32 | 40B | N/A (process_paint_messages_flush_gdi — processes all paint messages then calls GdiFlush)

---

## FW -- Framework: Window Management (27 functions)

FUN_005bbb5a | 28B | N/A (launch_external_process — calls WinExec with SW_SHOWNORMAL)
gdi_BB76 | 83B | N/A (process_timer_message — peeks/dispatches WM_TIMER (0x3BD) only)
FUN_005bbbce | 52B | N/A (process_timer_messages — drains all timer messages; calls DirectX flip)
create_window_BC10 | 990B | N/A (create_ms_window — creates a Windows window with complex style flags: handles popup/dialog/overlapped/resizable/minimizable/maximizable/vscroll/hscroll/child styles; loads default cursor; returns 0x4C-byte window state struct)
FUN_005bbfee | 43B | N/A (enable_window — calls EnableWindow on the window handle)
FUN_005bc019 | 25B | N/A (set_window_user_data — stores param_2 at struct offset 0x40)
FUN_005bc032 | 66B | N/A (is_window_visible — returns 1 if IsWindowVisible is true)
send_msg_C07E | 45B | N/A (close_window — sends WM_CLOSE to window)
manage_window_C0AB | 200B | N/A (destroy_window — full cleanup: removes from window stack, hides, removes menu, DestroyWindow, deletes background brush, frees struct memory)
FUN_005bc173 | 66B | N/A (iterate_window_stack — empty iteration over window stack; appears to be a debug/validation stub)
FUN_005bc1b5 | 38B | N/A (push_window_to_stack — adds window handle to global stack DAT_006d1db8)
FUN_005bc1db | 165B | N/A (remove_window_from_stack — finds and removes a window handle from global stack; shifts array down; logs error if stack underflow)
update_palette_C280 | 222B | N/A (set_window_background_color — creates a solid brush with palette-mapped color; invalidates window for repaint)
invalidate_C35E | 97B | N/A (set_window_background_rgb — creates a solid brush from raw RGB; invalidates window)
FUN_005bc3bf | 25B | N/A (set_window_callback_a — stores param_2 at struct offset 0x24)
FUN_005bc3d8 | 25B | N/A (set_window_callback_b — stores param_2 at struct offset 0x28)
FUN_005bc3f1 | 25B | N/A (set_window_callback_c — stores param_2 at struct offset 0x2C)
manage_window_C40A | 67B | N/A (show_window — ShowWindow SW_SHOW; BringWindowToTop if attached)
manage_window_C44D | 41B | N/A (hide_window — ShowWindow SW_HIDE)
FUN_005bc476 | 43B | N/A (set_window_title — calls SetWindowTextA)
FUN_005bc4a1 | 100B | N/A (move_window — moves window to new x,y preserving current size)
FUN_005bc505 | 213B | N/A (resize_window — resizes window to new client-area w,h accounting for frame; handles child window parent offset)
manage_window_C5DA | 41B | N/A (maximize_window — ShowWindow SW_MAXIMIZE)
FUN_005bc603 | 46B | N/A (is_window_maximized — returns IsZoomed result)
manage_window_C636 | 41B | N/A (minimize_window — ShowWindow SW_MINIMIZE)
FUN_005bc65f | 46B | N/A (is_window_minimized — returns IsIconic result)
manage_window_C692 | 41B | N/A (restore_window — ShowWindow SW_RESTORE)

---

## FW -- Framework: Window Geometry (10 functions)

FUN_005bc6bb | 43B | N/A (validate_rect — calls ValidateRect to clear dirty region)
invalidate_C6E6 | 45B | N/A (invalidate_rect — calls InvalidateRect to mark dirty region)
FUN_005bc713 | 80B | N/A (move_window_to_rect — MoveWindow using RECT coordinates)
gdi_C763 | 464B | N/A (center_window — centers window within parent or screen, accounting for child/popup/overlay styles; adjusts by optional offset params)
FUN_005bc933 | 56B | N/A (get_client_width — returns client area width via GetClientRect)
FUN_005bc96b | 56B | N/A (get_client_height — returns client area height via GetClientRect)
FUN_005bc9a3 | 48B | N/A (get_window_rect — calls GetWindowRect into param_2)
FUN_005bc9d3 | 106B | N/A (get_frame_width_delta — returns difference between window rect width and client rect width)
FUN_005bca3d | 106B | N/A (get_frame_height_delta — returns difference between window rect height and client rect height)
FUN_005bcaa7 | 48B | N/A (get_screen_rect — builds RECT {0,0,SM_CXSCREEN,SM_CYSCREEN})

---

## FW -- Framework: Coordinate Mapping (2 functions)

FUN_005bcad7 | 79B | N/A (client_to_screen — converts client coords to screen via ClientToScreen)
FUN_005bcb26 | 95B | N/A (client_to_parent — converts client coords to parent window coords via MapWindowPoints)

---

## FW -- Framework: Rect/Blit Operations (8 functions)

FUN_005bcb85 | 140B | N/A (get_window_rect_in_parent — GetWindowRect then MapWindowPoints to parent)
update_palette_CC11 | 124B | N/A (bitblt_to_screen — BitBlt from source DC to screen DC with optional palette realize; op SRCCOPY)
blit_CC8D | 85B | N/A (bitblt_to_offscreen — BitBlt from source DC to offscreen DC; op SRCCOPY)
update_palette_CCE2 | 132B | N/A (stretchblt_to_screen — StretchBlt from source to screen DC with optional palette realize)
stretch_blit_CD66 | 93B | N/A (stretchblt_to_offscreen — StretchBlt from source to offscreen DC)
FUN_005bcdc3 | 57B | N/A (select_palette — SelectPalette into window DC if 256-color mode)
FUN_005bcdfc | 99B | N/A (set_menu — SetMenu on window; adjusts window size to accommodate menu bar height)
invalidate_CE5F | 143B | N/A (set_window_icon — loads icon resource, destroys old; InvalidateRect if iconic)

---

## FW -- Framework: Cursor Management (7 functions)

FUN_005bceee | 46B | N/A (load_cursor_resource — LoadCursorA from app instance)
FUN_005bcf1c | 36B | N/A (destroy_cursor — DestroyCursor if non-null)
FUN_005bcf40 | 26B | N/A (set_cursor — SetCursor directly)
FUN_005bcf5a | 70B | N/A (set_window_cursor — stores cursor handle at struct+0x1C; optionally calls SetCursor)
FUN_005bcfa0 | 24B | N/A (show_cursor — ShowCursor(TRUE))
FUN_005bcfb8 | 37B | N/A (hide_cursor — ShowCursor(FALSE) in loop until counter < 0)
FUN_005bcfdd | 70B | N/A (set_cursor_by_id — calls FUN_005bd05f to load cursor, then SetCursor)

---

## FW -- Framework: Cursor/Focus Helpers (6 functions)

FUN_005bd023 | 60B | N/A (set_window_cursor_direct — stores handle and calls SetCursor)
FUN_005bd05f | 136B | N/A (load_cursor_by_id — loads cursor: -1 = IDC_ARROW, -2 = IDC_CROSS, else app resource)
FUN_005bd0e7 | 57B | N/A (focus_and_bring_to_top — SetFocus + BringWindowToTop)
FUN_005bd120 | 44B | N/A (set_focus — SetFocus only)
FUN_005bd14c | 121B | N/A (disable_parent_window — disables parent or specified window; for modal behavior)
FUN_005bd1c5 | 126B | N/A (enable_parent_window — re-enables parent or specified window; for modal dismissal)

---

## FW -- Framework: Window Properties (3 functions)

FUN_005bd248 | 40B | N/A (set_window_prop_38 — stores param_2 at struct+0x38)
FUN_005bd270 | 40B | N/A (set_window_prop_3c — stores param_2 at struct+0x3C)
FUN_005bd298 | 262B | N/A (wait_for_mouse_button — PeekMessage loop waiting for LButton/RButton up; handles both client and nonclient area messages; returns 1 if button was released)

---

## FW -- Framework: Input Polling (5 functions)

gdi_D39E | 241B | N/A (check_key_state — 0x200: returns Ctrl state, 0x100: returns Shift state, 0x400: drains messages looking for WM_SYSCHAR/SYSKEYDOWN/SYSKEYUP)
FUN_005bd48f | 62B | N/A (get_mouse_position_client — GetCursorPos + ScreenToClient, returns x,y)
FUN_005bd4cd | 51B | N/A (is_left_mouse_down — GetAsyncKeyState VK_LBUTTON)
FUN_005bd500 | 51B | N/A (is_right_mouse_down — GetAsyncKeyState VK_RBUTTON)
FUN_005bd533 | 29B | N/A (capture_mouse — SetCapture on window)

---

## FW -- Framework: Mouse/Window Misc (3 functions)

FUN_005bd550 | 22B | N/A (release_capture — ReleaseCapture)
FUN_005bd566 | 167B | N/A (set_top_most_child — validates child-parent relationship and SWS_ATTACHED flag; sets struct+0x10 to child HWND)
FUN_005bd610 | 27B | N/A (get_style_flags — returns *in_ECX; reads style dword from vtable/struct)

---

## FW -- Framework: DIB/Port Surface Management (6 functions)

FUN_005bd630 | 44B | N/A (port_constructor — initializes vtable ptr to PTR_FUN_0061d70c; calls FUN_005bd813 to zero port state)
FUN_005bd65c | 58B | N/A (port_set_size_from_dims — converts width,height to RECT, calls FUN_005bd696)
FUN_005bd696 | 325B | N/A (port_resize — deallocates old DIB, allocates new DIB via create_dib_35B0; sets stride and scan direction; handles error reporting)
FUN_005bd7db | 56B | N/A (port_load_cvpic — wrapper: calls thunk_FUN_004083f0 then FUN_005bf930 for CvPic image loading)
FUN_005bd813 | 258B | N/A (port_reset — zeros all port fields: buffer ptr, stride, DIB handle, clip rect; sets dimensions from optional RECT param)
FUN_005bd915 | 114B | N/A (port_destructor — frees DIB via FUN_005e388f, resets state, clears global pointer if self)

---

## FW -- Framework: Image Loaders (18 functions)

FUN_005bd987 | 1508B | N/A (load_lbm_resource — loads IFF/ILBM (LBM) image from resource: parses FORM header, BMHD bitmap header (dimensions, compression, planes), optional CMAP palette, BODY pixel data; handles RLE (type 1) and uncompressed; renders to port surface)
FUN_005bdf7f | 559B | N/A (decode_lbm_scanline — decodes a single LBM scanline: handles planar (mode 0) and chunky (mode 1) with RLE decompression)
FUN_005be1b3 | 268B | N/A (decode_lbm_plane — decodes a single bitplane with optional RLE decompression)
FUN_005be2c4 | 701B | N/A (load_tga_resource — loads TGA (Targa) image from resource: reads 18-byte header, optional palette, 8-bit uncompressed pixel data; handles top-down and bottom-up scan order)
FUN_005be595 | 919B | N/A (load_tga_file — loads TGA from external file: same as load_tga_resource but uses file I/O with SEH; allocates temp buffer via Realloc)
FUN_005be940 | 12B | N/A (SEH destructor thunk — calls FUN_005d7c6e; file handle cleanup)
FUN_005be956 | 17B | N/A (SEH epilog — restores FS:[0])
FUN_005be967 | 805B | N/A (load_pcx_resource — loads PCX image from resource: validates header byte 0x0A, checks 8-bit/1-plane, RLE decompresses scanlines, reads trailing 768-byte palette)
FUN_005bec8c | 958B | N/A (load_pcx_file — loads PCX from external file: same as load_pcx_resource but via file I/O with SEH)
FUN_005bf04a | 12B | N/A (SEH destructor thunk — calls FUN_005d7c6e; file handle cleanup)
FUN_005bf060 | 17B | N/A (SEH epilog — restores FS:[0])
FUN_005bf071 | 1353B | N/A (load_gif_file — loads GIF image from external file: validates GIF87a/89a header, reads global color table, finds image descriptor block (0x2C or extension 0x21), LZW decompresses via FUN_005e4d60)
FUN_005bf5ba | 12B | N/A (SEH destructor thunk — calls FUN_005d7c6e; file handle cleanup)
FUN_005bf5d0 | 17B | N/A (SEH epilog — restores FS:[0])
FUN_005bf5e1 | 847B | N/A (load_gif_resource — loads GIF from resource: similar to load_gif_file but from resource handle; validates GIF header and global color table)
FUN_005bf930 | 425B | N/A (load_cvpic_resource — loads CvPic proprietary format: 6-byte header with dimensions, embedded palette (bVar1+1 entries), LZW-compressed pixel data via FUN_005e4d60)
FUN_005bfad9 | 550B | N/A (load_bmp_resource — loads Windows BMP from resource: reads BITMAPINFOHEADER, 8-bit only, uncompressed only, reads 256-entry RGBQUAD palette, renders bottom-up scanlines with palette offset)
FUN_005bfcff | 782B | N/A (load_bmp_file — loads BMP from external file: same as load_bmp_resource but via file I/O with SEH; skips BITMAPFILEHEADER to reach BITMAPINFOHEADER)

---

## Summary by Category

| Category | Count |
|----------|-------|
| UI — Map Editor | 11 |
| GL — Unit Linked-List Management | 30 |
| GL — Unit Stack Ops & Queries | 24 |
| GL — Unit Build/Check Helpers | 4 |
| UI — Unit List Dialog | 4 |
| GL — Map Tile Memory Mgmt | 4 |
| GL — Map Tile Load | 1 |
| GL — Map Tile Accessors | 20 |
| GL — Map Tile Nuclear/Pollution | 2 |
| GL — Map Tile Tech Discovery | 2 |
| GL — Map Tile Modifiers | 8 |
| GL — Map Tile Per-Civ Visibility | 1 |
| GL — Map Tile Multiplayer Batching | 4 |
| FW — File Path Utilities | 5 |
| FW — Text Rendering | 4 |
| FW — Port/Surface Setup | 14 |
| FW — Viewport Queries | 3 |
| FW — Message Pumps | 6 |
| FW — Window Management | 27 |
| FW — Window Geometry | 10 |
| FW — Coordinate Mapping | 2 |
| FW — Rect/Blit Operations | 8 |
| FW — Cursor Management | 7 |
| FW — Cursor/Focus Helpers | 6 |
| FW — Window Properties | 3 |
| FW — Input Polling | 5 |
| FW — Mouse/Window Misc | 3 |
| FW — DIB/Port Surface Mgmt | 6 |
| FW — Image Loaders | 18 |
| **Total** | **242** |

---

## GL Functions vs JS Engine — Discrepancies

### 1. FUN_005b50ad (sum_stack_property) vs combat.js `sumStackProperty`

**Binary modes (12):** 0=cargo capacity, 1=attack, 2/11=count, 3=defense, 4=air-in-transport, 5=sea count, 6=net transport capacity, 7=air with range>1, 8=missile count, 9=settler count, 10=diplomat count.

**JS modes (4):** 0=count, 1=attack, 2=defense, 3=current HP.

**Discrepancy:** JS only implements 4 of 12 modes, and the mode numbers do not match. Binary mode 0 is cargo capacity (UNIT_CARGO field), while JS mode 0 is simple count. Binary mode 1 is attack, matching JS mode 1. Binary mode 3 is defense, while JS mode 2 is defense. JS mode 3 (current HP) does not exist in binary. JS is missing: cargo capacity, air-in-transport, sea count, net transport capacity, air-range, missile count, settler count, diplomat count.

**Impact:** Medium. Transport capacity and settler/diplomat counting are needed for proper AI and game logic. The different numbering could cause bugs if any code passes binary mode numbers to the JS function.

### 2. FUN_005b2a39 (get_unit_max_moves) — Movement bonus logic

**Binary:** Sea units get movement bonuses from:
- Lighthouse (tech 0x3B, +UNIT_MOVE_BASE)
- Nuclear Power (tech 0x0C, +2×UNIT_MOVE_BASE)
- Magellan's Expedition (tech 3, +UNIT_MOVE_BASE) unless unit flag 0x20 is set
- Damaged units with cosmic bit 0x10 set have moves scaled by remaining_hp/max_hp, rounded up to UNIT_MOVE_BASE, clamped to minimum 2× or 1× base

**JS:** Not found as a standalone function in the engine. Movement bonuses are partially handled in `rules.js` and `movement.js` but need verification of completeness.

**Impact:** Medium. Missing movement bonuses would make sea units slower than intended.

### 3. FUN_005b8ee1 (get_special_resource) vs mapgen.js `checkTileGoodyHut` / state.js

**Binary formula:** Uses `(((x+y)>>3)*0xB + ((x-(x+y>>1))>>2)*0xD + seed) & 0xF` compared against `((x+y>>1)&3) + ((x-(x+y>>1))&3)*4`. Secondary check uses shifted seed bit. Excludes ocean (terrain==2 in byte 0) and river flag 0x40.

**JS:** `checkTileGoodyHut` in mapgen.js exists but uses a different formula (`(gx*7 + gy*11 + mapSeed) % 29`). The special resource formula is separate from goody huts.

**Discrepancy:** The JS does not appear to implement the binary's exact special resource formula (FUN_005b8ee1). The goody hut formula (FUN_005b8ffa) also uses a different pseudo-random approach in JS.

**Impact:** Low-medium. Special resources and goody huts will appear at different map positions than the original binary.

### 4. FUN_005b9179 (nuclear_fallout) vs nuclear.js

**Binary:** Iterates 9 tiles (center + 8 adjacent). For each non-city tile: clears fortress flag (0x40) randomly, randomly removes road/railroad (clear 0x20, clear 0x04/0x08), randomly removes irrigation/mine. 2/3 chance to apply pollution. For cities: halves city population field. Updates all 7 civ visibility layers. Final call to FUN_005b9f1c (end_tile_batch).

**JS (nuclear.js):** `applyNuclearFalloutArea` exists and covers a similar area. The `applyNuclearFallout` function handles individual tiles.

**Discrepancy:** The JS implementation should be compared in detail. The binary uses `_rand() % 3 != 0` (2/3 chance) for pollution spread, and halves city population directly. The binary also randomly clears individual improvement bits rather than all improvements at once.

**Impact:** Low. Both implement the same general mechanic; differences would be in exact probabilities and which improvements get removed.

### 5. FUN_005b542e (stack_ship_units) — Transport loading logic

**Binary:** Complex 1912-byte function with two-pass logic: pass 0 loads own units (especially those with GOTO order pointing to this transport), pass 1 loads allied units without GOTO orders or with invalid GOTO targets. Handles air units specially (capacity 0x14 for carriers). Checks diplomacy flag & 8 for allied loading.

**JS:** No direct equivalent found. Transport loading is partially handled in movement.js and rules.js but the two-pass own-then-allied logic with GOTO order awareness appears absent.

**Impact:** Medium. Transport loading order and allied unit handling affect gameplay.

### 6. FUN_005b3d06 (create_unit) — Unit creation details

**Binary:** Finds first empty slot (id==0) in unit array. If array is full, checks against 0x7FF hard max and 0x79C per-civ soft cap. Initializes 32-byte unit record: type, owner, unique ID (incrementing DAT_00627fd8), movement points, visibility, orders (0xFF = none), home city, GOTO target (-1), all link pointers (-1). Handles tutorial popups for first units of various types.

**JS (reduce/helpers.js killUnit, state.js):** Unit creation happens through reducer actions. The unit slot management (linked list, unique IDs) is replaced by array-based state management.

**Discrepancy:** JS uses a different data model (flat array vs fixed-size linked-list pool). The per-civ unit cap (0x79C = 1948) and absolute max (0x800 = 2048) may not be enforced in JS.

**Impact:** Low. The JS architecture fundamentally differs but achieves the same logical result. Unit caps should be verified.

### 7. FUN_005b49cf / FUN_005b4b66 / FUN_005b4c63 (adjacent enemy checks) — ZOC helpers

**Binary:** Three variants of "is there an enemy adjacent": one checks continent and visibility layers, one is simple tile-owner check, one filters by same continent. All check diplomacy flag & 8 (peace treaty) to exclude peaceful civs. Store result in global DAT_006ced4c.

**JS:** ZOC checks exist in movement.js but should be verified to match the continent-aware and peace-treaty-aware variants.

**Impact:** Low-medium. Incorrect ZOC would affect movement costs and restrictions.

### 8. FUN_005b68f6 (check_tile_buildable) — Worker action checks

**Binary:** Checks tile has no city, terrain not flagged 0x08, if flagged 0x04 then requires tech 0x46 (Bridge Building). Then checks two improvement slots via DAT_00627cce terrain data table against civ's advance level.

**JS:** Worker build checks exist in rules.js but the terrain improvement slot table lookup should be verified.

**Impact:** Low. Worker improvements are generally well-understood.

### 9. Map tile 6-byte structure consistency

**Binary tile format (6 bytes):**
- Byte 0: terrain type (low nibble) | river/ocean flags (high nibble via 0x40)
- Byte 1: improvements (irrigation 0x01, mine 0x02, road 0x04, railroad 0x08, ?, fortress 0x20, airbase 0x40, pollution 0x80)
- Byte 2: bits 5-7 = river/landmass flags; bits 0-4 = additional data
- Byte 3: city index (0xFF = none)
- Byte 4: per-civ visibility bits (bit per civ)
- Byte 5: low nibble = continent ID extension; high nibble = unit owner (0xF = none)

**JS:** Map tile structure in state.js/parser.js should match this layout. The parser.js reads the binary format correctly but the in-memory JS representation may diverge.

**Impact:** Low. Parser handles this correctly; runtime state uses a different model.
