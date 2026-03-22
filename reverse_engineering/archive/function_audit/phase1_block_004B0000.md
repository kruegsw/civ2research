# Phase 1 Audit: block_004B0000.c (0x004B0000 - 0x004BFFFF)

## Function Analysis Table

### Cluster: City Best Selection / Map Display Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B0157 | medium | FUN_004b0157 | draw_best_city_sprite | (int civ_id, byte flags, int x, int y, int height) | void | Iterates all cities for a given civ, scores them (size + 200 if has Barracks building_id=1, +100 if capital building_id checked via +0x39 offset == -1). Draws the highest-scoring city sprite using scale_sprite (thunk_FUN_00472cf0) and FUN_0056d289 (unit/sprite draw). Uses zoom factor check at offset +0x154 to select 0x18 vs 0x24 spacing. | MEDIUM |

### Cluster: Name/ID Lookup from String

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B0720 | small | FUN_004b0720 | lookup_tech_by_name | (char *name) | int | Compares `name` against two special strings at DAT_0062d0a4/DAT_0062d0a8 (returning -2/-1 for "no"/"future tech"). Otherwise iterates 100 entries in tech_table (DAT_00627680, stride 0x10) returning the matching index. Returns -3 if not found. | MEDIUM |
| 004B07D1 | small | FUN_004b07d1 | lookup_terrain_by_name | (char *name) | int | Case-insensitive comparison against two special strings (DAT_0062d0ac/DAT_0062d0b0, returning -1/-2). Otherwise iterates 11 (0xb) terrain entries at DAT_00627cc0 (stride 0x18 = terrain data table). Returns index or -3. | MEDIUM |

### Cluster: CRT Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B08E0 | stub | _$E2 | _crt_init_E2 | (void) | void | FRAMEWORK - VS98 CRT static initializer stub, calls _E1. | HIGH |
| 004B08F5 | stub | _$E1 | _crt_init_E1 | (void) | void | FRAMEWORK - VS98 CRT static initializer, no-op return. | HIGH |

### Cluster: Multiplayer Diff Engine (Network Sync)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B0905 | medium | FUN_004b0905 | diff_engine_alloc_mirror | (void) | bool | Allocates a "mirror" buffer (DAT_0062d0bc) sized by summing 0x17 (23) section lengths. Asserts mirror length is DWORD-aligned. Calls diff_engine_copy_sections. String evidence: `"mirrorLength % sizeof(long) == 0"`. Source: `"Difference_Eng"`. | HIGH |
| 004B0A0A | stub | FUN_004b0a0a | diff_engine_free_mirror | (void) | void | Frees DAT_0062d0bc (mirror buffer), sets to NULL. | MEDIUM |
| 004B0A41 | small | FUN_004b0a41 | diff_engine_copy_sections | (void) | void | Copies 0x17 data sections into the mirror buffer. Iterates sections, memcpy from source pointers (DAT_0067a424 array) into contiguous mirror. Sets DAT_00679fe8 cursor to buffer start, resets section index. | MEDIUM |
| 004B0AD0 | small | FUN_004b0ad0 | diff_engine_invert_mirror | (void) | void | Copies sections then bitwise-inverts (~) every DWORD in the mirror buffer. Forces full resend on next diff pass. | MEDIUM |
| 004B0B53 | xlarge | FUN_004b0b53 | diff_engine_scan_and_send | (target, byte flags, int param3, char param4, char param5) | int | Core diff engine: compares current game state against mirror, finds changed regions, copies diffs into a packet structure (12-byte header + data), sends via thunk_FUN_0046b14d (network message 0x5c). Calls XD_FlushSendBuffer. Supports RLE compression (FUN_004b263e). String evidence: `"diffLength < DIFF_ENGINE_MESSAGE"`, source path `"Difference_Eng"`. Returns total bytes of changes found. | HIGH |
| 004B12B3 | small | FUN_004b12b3 | diff_engine_check_section_changed | (int section_idx) | bool | Compares a specific section's current data against mirror copy, DWORD-by-DWORD. Returns 1 if any difference found, 0 if identical. | MEDIUM |
| 004B1396 | medium | FUN_004b1396 | diff_engine_checksum | (ushort *data, uint size) | int | Computes additive checksum over data. Size alignment determines strategy: DWORD-aligned sums ints, WORD-aligned sums shorts, byte-aligned sums bytes. | MEDIUM |
| 004B14A4 | small | FUN_004b14a4 | diff_engine_calc_total_size | (void) | int | Calculates total serialized game state size. Sums 0x18 sections; section 5 = num_unit_slots * 0x20, section 6 = num_city_slots * 0x58. Adds 0x1e0 header. | HIGH |
| 004B153C | large | FUN_004b153c | diff_engine_serialize_game | (int *out_buf) | bool | Serializes 7 major game data sections into a buffer. For each section: computes checksum, writes 0x14-byte header + data via FUN_004b187f. Sections include units (DAT_0067a428), cities (DAT_0067a4b8), map, etc. Calls FUN_005dfd8f (likely compress). String: `"Failed to allocated buffer for g"`. | HIGH |
| 004B187F | stub | FUN_004b187f | diff_engine_append_data | (int buf, int *offset, int bufsize, void *data, size_t len) | void | Bounds-checked memcpy into buffer at offset. Asserts `curSize + datSize < bufSize`. Advances offset. | HIGH |
| 004B18E1 | medium | FUN_004b18e1 | diff_engine_serialize_partial | (int *out_buf) | bool | Serializes 2 sections (units + an extra section at DAT_0067a530) into a buffer. Same pattern as full serialize but smaller. String: `"Failed to allocated buffer for g"`. | MEDIUM |
| 004B1A15 | large | FUN_004b1a15 | diff_engine_serialize_full_compressed | (int *out_buf) | size_t | Full game state serialization with RLE compression. Iterates all 0x18 sections, computes checksums, writes headers + data, then attempts RLE encode (FUN_004b263e). Returns compressed size or 0xFFFFFFFF on failure. | MEDIUM |
| 004B1C11 | large | FUN_004b1c11 | diff_engine_serialize_changed_only | (int *out_buf) | bool | Serializes only sections whose checksums have changed since last sync. Skips unchanged sections. Uses _expand to shrink buffer. String: `"Failed to allocate buffer for ga"`, `"Failed to re-allocate buffer for"`. | MEDIUM |
| 004B1DE3 | large | FUN_004b1de3 | diff_engine_deserialize | (int *data, char decompress) | void | Deserializes received game state data into live game structures. Optionally decompresses (RLE decode via FUN_004b251a). Iterates section nodes, memcpy's data into correct section addresses. Preserves/restores DAT_00655aea/DAT_00655af2 across operation. String: `"phData && *phData"`. | HIGH |
| 004B2010 | medium | parse_save_block | parse_save_block | (int *data, char decompress) | void | Already named. Deserializes a save data block. Validates block types (expects btGame=1 then btMapStruct=12). Calls diff_engine_deserialize for each block, then reinitializes section pointers and mirror. String: `"blockType == btGame"`, `"blockType == btMapStruct"`. | HIGH |
| 004B2123 | small | FUN_004b2123 | diff_engine_read_section_node | (int *cursor) | section_type | Reads a 0x14-byte section header from cursor, copies section data into the appropriate game data array, computes checksum, advances cursor. Returns section type index. | MEDIUM |
| 004B21D7 | large | FUN_004b21d7 | diff_engine_init_sections | (void) | void | Initializes all 23 (0x17) game data sections with their base addresses, sizes, and indices. Key mappings: section 0=flags(4B), 1=game_state(0x14c), 2=rules(0x790), 3=civ_data(0x2ca0=8*0x594), 4=adjacency(0x400), 5=units(0x10000), 6=cities(0x5800), 7=leader_portraits(0x3f0), sections 0xd-0x16=map layers. Section 0x17=events(50000B). | HIGH |
| 004B24A2 | small | FUN_004b24a2 | rle_calc_decoded_size | (params) | int | Calculates decoded size of RLE-compressed data. Reads 16-bit length codes; bit 15 set = literal run, clear = fill run. | MEDIUM |
| 004B251A | medium | FUN_004b251a | rle_decode | (params) | bool | RLE decoder. For each chunk: if length < 0x7FFF, memset fill byte; if >= 0x8000, memcpy literal data. Returns 1 on success, 0 if output buffer too small. | MEDIUM |
| 004B263E | large | FUN_004b263e | rle_encode | (int *params) | bool | RLE encoder. Scans input for runs of identical bytes (encoded as length + fill byte) and literal sequences (encoded as 0x8000|length + raw data). Handles chunks up to 0x7FFF bytes. Returns 1 on success, 0 if output buffer exceeded. | MEDIUM |
| 004B3080 | small | FUN_004b3080 | diff_engine_register_section | (uint addr, uint size, uint index) | void | Registers a data section: stores address, size, index, checksum=0. DWORD-aligns size upward. Uses thiscall via in_ECX (section descriptor array). | MEDIUM |

### Cluster: Continent/Body ID Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B3110 | stub | FUN_004b3110 | continent_set_adjacency_bit | (int continent_a, body_b) | void | Sets a bit in the continent adjacency table (DAT_00666137, stride 0x10) indicating continent_a is adjacent to continent_b. Uses thunk_FUN_005ae3bf to decompose body_b into byte/bit offset. | MEDIUM |
| 004B315C | large | FUN_004b315c | continent_calc_adjacency | (void) | void | Calculates continent adjacency by iterating all map tiles. For each land tile (FUN_005b89e4 == 0), checks 8 neighbors for adjacent land; if neighbor is different continent, sets adjacency bit. DAT_006d1160/DAT_006d1162 = map width/height. Uses directional offsets from DAT_00628350/DAT_00628360. | MEDIUM |
| 004B32FE | xlarge | FUN_004b32fe | continent_assign_body_ids | (void) | uint | Major function: assigns continent/body IDs to all map tiles. Two-pass algorithm (land=1, sea=0). Uses flood-fill with merge (union-find pattern): allocates 0x20000 byte count array + per-tile ID array. Merges adjacent same-type regions, renumbers to fit 64 slots (0x3F max). Small regions (<9 tiles for land, <16 for sea) merged into slot 0x3F. Stores tile counts in DAT_00666130/DAT_00666134. Calls continent_calc_adjacency at end. Returns bitmask of overflow warnings. | HIGH |

### Cluster: Static Object Initializers (CRT/MFC)

These are all VS98 static initializer/destructor pairs using `_atexit` to register cleanup. Each group: init calls `FUN_0043c4c0` or `FUN_0043c460` (static object constructor), registers cleanup via `_atexit` which calls `FUN_0043c520` (static object destructor).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B3CA0 | stub | FUN_004b3ca0 | static_init_obj_a | (void) | void | FRAMEWORK - Static initializer pair. | HIGH |
| 004B3CBA | stub | FUN_004b3cba | static_init_obj_a_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c4c0(0,0x10,1). | HIGH |
| 004B3CDA | stub | FUN_004b3cda | static_init_obj_a_atexit | (void) | void | FRAMEWORK - Registers dtor via _atexit. | HIGH |
| 004B3CF7 | stub | FUN_004b3cf7 | static_init_obj_a_dtor | (void) | void | FRAMEWORK - Calls FUN_0043c520 destructor. | HIGH |
| 004B3D11 | stub | FID_conflict__$E51 | static_init_obj_b | (void) | void | FRAMEWORK - Static initializer pair. | HIGH |
| 004B3D2B | stub | FUN_004b3d2b | static_init_obj_b_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0x14). | HIGH |
| 004B3D49 | stub | FUN_004b3d49 | static_init_obj_b_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3D66 | stub | FUN_004b3d66 | static_init_obj_b_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3D80 | stub | FID_conflict__$E51 | static_init_obj_c | (void) | void | FRAMEWORK | HIGH |
| 004B3D9A | stub | FUN_004b3d9a | static_init_obj_c_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0xe). | HIGH |
| 004B3DB8 | stub | FUN_004b3db8 | static_init_obj_c_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3DD5 | stub | FUN_004b3dd5 | static_init_obj_c_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3DEF | stub | FID_conflict__$E51 | static_init_obj_d | (void) | void | FRAMEWORK | HIGH |
| 004B3E09 | stub | FUN_004b3e09 | static_init_obj_d_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0x10). | HIGH |
| 004B3E27 | stub | FUN_004b3e27 | static_init_obj_d_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3E44 | stub | FUN_004b3e44 | static_init_obj_d_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3E5E | stub | FUN_004b3e5e | static_init_obj_e | (void) | void | FRAMEWORK | HIGH |
| 004B3E78 | stub | FUN_004b3e78 | static_init_obj_e_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c4c0(0,0x18,1). | HIGH |
| 004B3E98 | stub | FUN_004b3e98 | static_init_obj_e_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3EB5 | stub | FUN_004b3eb5 | static_init_obj_e_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3ECF | stub | FID_conflict__$E51 | static_init_obj_f | (void) | void | FRAMEWORK | HIGH |
| 004B3EE9 | stub | FUN_004b3ee9 | static_init_obj_f_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0x1e). | HIGH |
| 004B3F07 | stub | FUN_004b3f07 | static_init_obj_f_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3F24 | stub | FUN_004b3f24 | static_init_obj_f_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3F3E | stub | FID_conflict__$E51 | static_init_obj_g | (void) | void | FRAMEWORK | HIGH |
| 004B3F58 | stub | FUN_004b3f58 | static_init_obj_g_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0x15). | HIGH |
| 004B3F76 | stub | FUN_004b3f76 | static_init_obj_g_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B3F93 | stub | FUN_004b3f93 | static_init_obj_g_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B3FAD | stub | FID_conflict__$E51 | static_init_obj_h | (void) | void | FRAMEWORK | HIGH |
| 004B3FC7 | stub | FUN_004b3fc7 | static_init_obj_h_ctor | (void) | void | FRAMEWORK - Calls FUN_0043c460(0,0x18). | HIGH |
| 004B3FE5 | stub | FUN_004b3fe5 | static_init_obj_h_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B4002 | stub | FUN_004b4002 | static_init_obj_h_dtor | (void) | void | FRAMEWORK | HIGH |

### Cluster: Parley/Diplomacy Window (MFC UI)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B401C | stub | FUN_004b401c | static_init_parleywin_a | (void) | void | FRAMEWORK - Initializes first parley window static object (DAT_006665da). | HIGH |
| 004B4036 | stub | FUN_004b4036 | static_init_parleywin_a_ctor | (void) | void | FRAMEWORK - Calls FUN_004b4108 (parley window constructor) with DAT_006665da. | HIGH |
| 004B405B | stub | FUN_004b405b | static_init_parleywin_a_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B4078 | stub | FUN_004b4078 | static_init_parleywin_a_dtor | (void) | void | FRAMEWORK - Calls FUN_004b4593 (parley window destructor). | HIGH |
| 004B4092 | stub | FUN_004b4092 | static_init_parleywin_b | (void) | void | FRAMEWORK - Initializes second parley window static object (DAT_006665ea). | HIGH |
| 004B40AC | stub | FUN_004b40ac | static_init_parleywin_b_ctor | (void) | void | FRAMEWORK | HIGH |
| 004B40D1 | stub | FUN_004b40d1 | static_init_parleywin_b_atexit | (void) | void | FRAMEWORK | HIGH |
| 004B40EE | stub | FUN_004b40ee | static_init_parleywin_b_dtor | (void) | void | FRAMEWORK | HIGH |
| 004B4108 | xlarge | FUN_004b4108 | parleywin_construct | (surface_param) | this* | Constructs a parley/diplomacy window object. Sets vtable to PTR_FUN_0061d6c4. Initializes ~50 member fields: positions, flags, per-civ arrays (8 entries for civs at offsets 0xaa-0xc8). Checks surface dimensions. Sets DAT_0062d86c/DAT_0062d870 globals to 0. | MEDIUM |
| 004B4593 | large | FUN_004b4593 | parleywin_destruct | (void) | void | Destructor for parley window. Saves chat log to `"chatlog.txt"` if active (mode 4 = multiplayer chat). Frees DAT_0062d870 (chat display buffer) and DAT_0062d86c (chat input buffer). Calls cleanup functions. SEH-guarded. | HIGH |
| 004B4705 | stub | FUN_004b4705 | parleywin_close_file | (void) | void | FRAMEWORK - Thunk to FUN_005d7c6e (file close). | LOW |
| 004B4711 | stub | FUN_004b4711 | parleywin_cleanup_base | (void) | void | FRAMEWORK - Thunk to FUN_0044cba0 (MFC base cleanup). | LOW |
| 004B4727 | stub | FUN_004b4727 | parleywin_seh_unwind_a | (void) | void | FRAMEWORK - SEH unwinding epilogue. | HIGH |
| 004B4735 | xlarge | FUN_004b4735 | parleywin_open | (mode) | void | Opens the parley/diplomacy window. Mode 4 = multiplayer chat (reads `ChatShowSize` from CIV.INI, allocates chat buffers, loads chatlog.txt). Other modes for AI diplomacy. Sets up window surface, registers handlers (FUN_004b76d5=OK button, FUN_004b968a=chat input). Creates child controls: leader portrait panels (3), chat/negotiation text areas, buttons. Calls CPropertySheet::EnableStackedTabs for layout. String evidence: `"Civilization Gold"`, `"ChatShowSize"`, `"CIV.INI"`, `"chatlog.txt"`. | HIGH |
| 004B4BE3 | stub | FUN_004b4be3 | parleywin_close_file_2 | (void) | void | FRAMEWORK - Thunk to FUN_005d7c6e. | LOW |
| 004B4BF9 | stub | FUN_004b4bf9 | parleywin_seh_unwind_b | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004B4C09 | small | FUN_004b4c09 | parleywin_save_position | (void) | void | Saves the current window position (x,y from surface ptr +0x150) into member fields +0x11c/+0x120. | MEDIUM |
| 004B4C81 | small | FUN_004b4c81 | parleywin_set_resolution | (void) | void | Sets resolution flag at +0x154 based on DAT_006ab198 (screen_size_threshold): 0 if <=999, 1 if >999. Then calls layout recalc. | MEDIUM |
| 004B4CF0 | large | FUN_004b4cf0 | parleywin_calc_layout | (void) | void | Calculates window dimensions based on resolution mode (+0x154). Low-res: 0x208 x 0x14f. High-res: 800 x 0x1cc. Centers window on screen if not previously positioned. Calls SetRect on surface, applies margins from DAT_0062d858-0062d868 (border/spacing constants). | MEDIUM |
| 004B4E8A | medium | FUN_004b4e8a | parleywin_calc_client_rects | (void) | void | Calculates client area and inner content rectangles. Gets widget sizes, computes border offsets, calls SetRect for outer bounds (+0x130) and inner content area (+0x140). Uses OffsetRect for content positioning. | MEDIUM |
| 004B4FB2 | medium | FUN_004b4fb2 | parleywin_update_scrollbars | (void) | void | Updates scrollbar positions if resolution mode changed or font sizes changed. Calls FUN_00526ca0 (set_scrollbar). Triggers full rebuild if mode changed (calls parleywin_free_controls + parleywin_create_controls). | MEDIUM |
| 004B50CF | xlarge | FUN_004b50cf | parleywin_free_controls | (void) | void | Frees all dynamically allocated child controls of the parley window. Releases 3 leader portrait panels, chat/negotiation text areas, buttons, per-civ icon arrays (8 entries), and 2-element paired controls. Each control freed via type-specific destructor + operator_delete. ~40 control slots freed. | MEDIUM |
| 004B5C93 | xlarge | FUN_004b5c93 | parleywin_create_controls | (void) | void | Creates all child controls for the parley window. Creates 3 leader portrait panels with custom sizing, a main negotiation button (id 0x3ed), a scrollable text area (chat area, id 0x3ee with 0x122=multiline+scroll), a chat input field (id 0x3ef), send/cancel buttons. In non-MP mode (!=4), creates additional treaty-related buttons (6 bottom-row buttons for treaty types). Layout uses resolution-aware spacing. String references to label table entries for button text (via get_improvement_name at DAT_00628420 offsets). | MEDIUM |
| 004B74C4 | medium | FUN_004b74c4 | parleywin_button_handler | (int button_id) | void | Handles button clicks in the parley window. 0x3E9=OK/close, 0x3EA=decrease resolution, 0x3EB=increase resolution (only if screen_size_threshold > 999). Triggers layout recalculation and repaint. | MEDIUM |
| 004B75FB | stub | FUN_004b75fb | parleywin_ok_clicked | (void) | void | OK button handler — calls parleywin_close (FUN_004b76d5). | MEDIUM |
| 004B7645 | stub | FUN_004b7645 | parleywin_activate_negotiation | (void) | void | Activates the negotiation sub-window (DAT_0067a7f0) and closes parley. | LOW |
| 004B768D | stub | FUN_004b768d | parleywin_activate_mp_chat | (void) | void | Activates the MP chat sub-window (DAT_0068ac30) and closes parley. | LOW |
| 004B76D5 | large | FUN_004b76d5 | parleywin_close | (void) | bool | Closes the parley window. If this is the main parley (DAT_0067a7a8) and no active session (DAT_0067a8bc==0): handles pending negotiation results (cancel, counter-offer). Sends network message 0x81 (diplomacy cancel) if needed. Shows PARLEYCANCEL message. Sets window flags to "closing" and calls cleanup. Returns 1. | HIGH |
| 004B7885 | medium | FUN_004b7885 | parleywin_repaint | (void) | void | Full repaint of parley window. Only if not closing (flag +0x114==0). Recalculates client rects, prepares surface, paints decorations, updates scrollbars, retrieves text lengths. | MEDIUM |
| 004B794A | large | FUN_004b794a | parleywin_paint_decorations | (void) | void | Paints the parley window decorations: top/bottom borders with custom colors, 3 leader portrait sprites (scaled from source), window title text with shadow effect (palette 10 shadow, 0x1a text). Uses FUN_005c19ad (set color), FUN_005c0f57 (draw text). | MEDIUM |
| 004B7C90 | small | FUN_004b7c90 | parleywin_draw_border_bitmap | (rect, int which) | void | Draws a border bitmap on the parley window. If DAT_00635aa0/DAT_00635aa4 have custom border bitmaps, blits them; otherwise uses default fill. | LOW |
| 004B7D72 | medium | FUN_004b7d72 | parleywin_build_title | (void) | void | Builds the window title string. In MP mode (==4): uses label at DAT_00628420+0xb54. In diplomacy mode: builds "CivName - GovernmentType" using civ name + government name lookup. Reads attitude via calc_attitude (FUN_004679ab). | HIGH |
| 004B7EB6 | large | FUN_004b7eb6 | parleywin_start_session | (int target_civ, int mode) | void | Starts a diplomacy or chat session. Mode 4 = multiplayer chat: validates foreign human players exist (checks DAT_00655b0b human bitmask, treaty contact flags). Shows "NOFOREIGNHUMAN" message if none available. Modes 1-3 = AI diplomacy: activates negotiation window (DAT_0067a7f0), sets target civ, font sizes. Sets play sound based on civ+map hash. String: `"NOFOREIGNHUMAN"`. | HIGH |

### Cluster: Diplomacy Negotiation Logic

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004B81DD | xlarge | FUN_004b81dd | parley_handle_response | (void) | void | Master handler for diplomacy response messages. Handles: accept (DAT_006c91ec, shows PARLEYACCEPT), reject (DAT_006c91f0, shows PARLEYNOTHANKS with counter), counter-offer (DAT_006c91f4, shows PARLEYCOUNTEROFFER), war declaration (DAT_006c91e8, breaks treaties via FUN_00467750). String evidence: `"PARLEYACCEPT"`, `"PARLEYCANCEL"`, `"PARLEYCOUNTEROFFER"`, `"PARLEYNOTHANKS"`, `"CANCELALLIED"`, `"CANCELPEACE"`, `"BREAKCEASE"`. Checks embassy visibility (treaty flag 0x80), wonder 0x18 (United Nations), wonder 9. | HIGH |
| 004B8676 | large | FUN_004b8676 | parley_set_negotiation_state | (int update_scrollbars) | void | Sets the negotiation state (DAT_0067a994) based on offer type (DAT_0067a9b0): -1=general(state 3), 0=peace(state 6), 1=tech(state 0xC/0xD), 2=tribute(states 7-11 based on subtype), 3=city(state 5), 4=map(state 0xF). Updates font sizes from lookup table indexed by state. | HIGH |
| 004B888E | xlarge | FUN_004b888e | parley_cleanup_side_controls | (int left_right) | void | Frees all controls on a specific side (0=left, 1=right) of the negotiation panel. Validates param via assert on `"parleywin.cpp"` line 0x4EA. Frees text labels, icon arrays, treaty buttons. Used before rebuilding offer display. | HIGH |
| 004B8E5C | medium | FUN_004b8e5c | parley_validate_gold_input | (int control_id) | void | Validates gold amount entered in negotiation text field. Strips non-digit characters, caps at civ's gold amount (DAT_0064c6a2 + civ*0x594). Updates DAT_0067a98c offer validity flags. Handles both offer (0x3f8) and counter-offer amounts. | MEDIUM |
| 004B90AD | large | FUN_004b90ad | parley_send_chat_message | (int from_civ, target, char is_private, text) | void | Sends a chat/diplomacy message. Builds formatted message with civ name + turn number (DAT_00655afa). For public messages: relays to all allied human civs via network message 0x68. Appends to chat display (FUN_004b93a2). Tracks message counts (DAT_006ad6a0/DAT_006ad69c). In MP mode, may trigger parley window open. | HIGH |
| 004B93A2 | medium | FUN_004b93a2 | parley_append_chat_text | (char *text) | void | Appends text to the chat display buffer (DAT_0062d870). If buffer full, removes oldest lines (finds first \r\n boundary). Updates both chat text areas and scrolls to end. | MEDIUM |
| 004B9504 | small | FUN_004b9504 | parley_format_civ_name | (int civ_id) | void | Formats a civ identifier for display. civ_id 0 = "Barbarians" (label at DAT_00628420+0xb64). Otherwise: "Leader Title - Tribe Name" via FUN_00493ba6 + FUN_00493b10. | MEDIUM |
| 004B957E | stub | FUN_004b957e | parley_handle_keydown | (int key) | void | Handles key-down in parley: 0xD2 (Insert) closes window. | LOW |
| 004B95C2 | stub | FUN_004b95c2 | parley_handle_submit | (void) | void | Wrapper: calls FUN_004b968a(0, 0xd0) to handle chat submit. | LOW |
| 004B95E1 | stub | FUN_004b95e1 | parley_clear_chat | (void) | void | Clears the chat display buffer (memset to 0), updates text areas, refocuses input. | LOW |
| 004B9635 | stub | FUN_004b9635 | parley_handle_escape | (unused, int key) | bool | Returns 0 (handled) for ESC (0x1b) or Insert (0xd2) — both close the window. Returns 1 (not handled) otherwise. | LOW |
| 004B968A | xlarge | FUN_004b968a | parley_handle_command | (unused, int cmd_id) | bool | Command handler for the parley/chat window. 0xD0 = send chat message: reads input text, formats with civ name and turn number, sends to target civ(s) via network message 0x68. In MP mode (==4), broadcasts to all checked recipients. 0xD2 = close. 0x2B0-0x2B4 = scrollbar commands. Clears input after send. Returns 0 if handled, 1 if not. | HIGH |

### Cluster: Widget Destructors (MFC Thin Wrappers)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004BB370 | stub | FUN_004bb370 | widget_read_file | (void) | void | FRAMEWORK - Thunk to FUN_005d84f6 (file read). | LOW |
| 004BB3B0 | stub | FUN_004bb3b0 | widget_dtor_button | (byte flags) | void* | FRAMEWORK - Button destructor. Calls FUN_0040f570, optionally deletes. | LOW |
| 004BB400 | stub | FUN_004bb400 | widget_dtor_editbox | (byte flags) | void* | FRAMEWORK - Edit box destructor. Calls FUN_00418870. | LOW |
| 004BB450 | stub | FUN_004bb450 | widget_dtor_label | (byte flags) | void* | FRAMEWORK - Label/static destructor. Calls FUN_0040f930. | LOW |
| 004BB4A0 | stub | FUN_004bb4a0 | widget_dtor_scrollbar | (byte flags) | void* | FRAMEWORK - Scrollbar destructor. Calls FUN_004bb740. | LOW |
| 004BB4F0 | stub | FUN_004bb4f0 | widget_dtor_checkbox | (byte flags) | void* | FRAMEWORK - Checkbox destructor. Calls FUN_0040fbb0. | LOW |
| 004BB540 | stub | FUN_004bb540 | widget_get_height | (void) | void | FRAMEWORK - Thunk to FUN_00407fc0 (get widget height). | LOW |
| 004BB570 | stub | FUN_004bb570 | widget_move_window | (rect) | void | FRAMEWORK - Moves a window via FUN_005bc713. | LOW |
| 004BB5B0 | stub | FUN_004bb5b0 | widget_set_readonly | (void) | void | FRAMEWORK - Sets byte at +0x24 to 1 (read-only flag). | LOW |
| 004BB5E0 | stub | FUN_004bb5e0 | widget_set_focus | (void) | void | FRAMEWORK - Sets focus to window handle at +0x1c via FUN_005c90b0. | LOW |
| 004BB620 | small | FUN_004bb620 | widget_create_editbox | (parent, id, rect, text, maxlen, flags) | void | Creates an edit box control: sets class pointer, registers window, creates HWND, sets initial text. | MEDIUM |
| 004BB6D0 | stub | FUN_004bb6d0 | widget_set_caret_pos | (int pos) | void | FRAMEWORK - Sets caret/cursor position in edit control via send_msg_2F0D. | LOW |
| 004BB710 | stub | FUN_004bb710 | widget_get_text_len | (void) | void | FRAMEWORK - Gets text length from edit control via FUN_005d2f7e. | LOW |
| 004BB740 | small | FUN_004bb740 | scrollbar_dtor | (void) | void | FRAMEWORK - Scrollbar destructor with SEH. Destroys DIB at +0x44 if present. | LOW |
| 004BB7B0 | stub | FUN_004bb7b0 | scrollbar_dtor_base | (void) | void | FRAMEWORK - Thunk to FUN_0040f510. | LOW |
| 004BB7C3 | stub | FUN_004bb7c3 | scrollbar_seh_unwind | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004BB800 | stub | FUN_004bb800 | rect_deflate | (rect, int dx, int dy) | void | Wrapper: calls InflateRect with negated values (deflate). | LOW |
| 004BB840 | stub | FUN_004bb840 | rect_inflate | (LPRECT, int dx, int dy) | void | Direct Win32 InflateRect wrapper. | LOW |
| 004BB870 | stub | FUN_004bb870 | alloc_global_handle | (size) | int | Allocates a global memory handle, tracks allocation state in DAT_00634814/DAT_00634818. | LOW |

### Cluster: Wonder Video / Art Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004BB8E0 | small | FUN_004bb8e0 | wonder_view_init | (int wonder_id) | void | Initializes the wonder view screen. Calls palette/art setup, loads art via load_civ2_art_004bbb3f, loads video via FUN_004bbdfb. Sets display size at +0x27. SEH-guarded. | MEDIUM |
| 004BB97B | stub | FUN_004bb97b | wonder_view_cleanup | (void) | void | FRAMEWORK - Cleanup thunk to FUN_004bba79. | LOW |
| 004BB991 | stub | FUN_004bb991 | wonder_view_seh_unwind | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004BB99F | small | FUN_004bb99f | wonder_view_construct | (void) | this* | Constructs the wonder view object. Initializes sub-objects (FUN_005dd010, FUN_005bd630, FUN_005c64da). Sets vtable to PTR_FUN_0061d6c8. Stores global reference in DAT_006a1864. | MEDIUM |
| 004BBA79 | small | FUN_004bba79 | wonder_view_destruct | (void) | void | Destructs the wonder view object. Clears DAT_006a1864, destroys sub-objects in reverse order. SEH-guarded. | MEDIUM |
| 004BBAF1 | stub | FUN_004bbaf1 | wonder_view_destroy_sub3 | (void) | void | FRAMEWORK - Thunk to FUN_005c656b. | LOW |
| 004BBB00 | stub | FUN_004bbb00 | wonder_view_destroy_sub2 | (void) | void | FRAMEWORK - Thunk to FUN_005bd915. | LOW |
| 004BBB0F | stub | FUN_004bbb0f | wonder_view_destroy_sub1 | (void) | void | FRAMEWORK - Thunk to FUN_005dd1a0. | LOW |
| 004BBB1E | stub | FUN_004bbb1e | wonder_view_destroy_frame | (void) | void | FRAMEWORK - Destroys COleCntrFrameWnd. | LOW |
| 004BBB31 | stub | FUN_004bbb31 | wonder_view_seh_unwind_2 | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004BBB3F | large | load_civ2_art_004bbb3f | load_civ2_art_wonder | (int wonder_id) | void | Already named. Loads wonder artwork. Loads `"civ2.wonder.dll"` DLL, extracts GIF resource (param + 20000, 10 frames at 0xEC). Falls back to 64x32 blank if DLL missing. Renders first frame into wonder surface (at +0xD04). Stores wonder_id at +0xD00. Sets up window title from label table. String: `"civ2.wonder.dll"`, `"Failed to load civ2art.gif"`. | HIGH |
| 004BBDBD | stub | FUN_004bbdbd | wonder_art_cleanup_path | (void) | void | FRAMEWORK - Destroys temporary path string. | LOW |
| 004BBDC9 | stub | FUN_004bbdc9 | wonder_art_cleanup_surface | (void) | void | FRAMEWORK - Thunk to FUN_005bd915 (surface cleanup). | LOW |
| 004BBDD5 | stub | FUN_004bbdd5 | wonder_art_cleanup_render | (void) | void | FRAMEWORK - Thunk to FUN_005cde4d (render context cleanup). | LOW |
| 004BBDEB | stub | FUN_004bbdeb | wonder_art_seh_unwind | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004BBDFB | large | FUN_004bbdfb | wonder_view_play_video | (void) | void | Plays the wonder construction video. Constructs video path from `"civ2.video.wonder"` + wonder number + `".avi"`. Creates AVI player window, plays video with callbacks for screen refresh. Handles VFW not registered error (`"VFWNOTREGISTERED"`). Only plays if no scenario flags (0x40/0x80) prevent it. | HIGH |
| 004BC0BB | stub | FUN_004bc0bb | wonder_view_return_zero | (void) | int | Returns 0. Likely a virtual function stub (e.g., CanClose returning false). | LOW |
| 004BC0D3 | stub | FUN_004bc0d3 | wonder_view_refresh_surface | (void) | void | Refreshes the wonder view surface: calls begin_paint on wonder surface (+0xD04) and main surface (DAT_00647f18). | MEDIUM |
| 004BC10F | small | FUN_004bc10f | wonder_view_resize | (void) | void | Resizes the wonder view window based on current wonder dimensions. Width = 2 * stored width + 0x140, height = stored height + stored width + 0xF0. Fills background and updates display. | MEDIUM |
| 004BC193 | stub | FUN_004bc193 | wonder_view_invalidate_a | (void) | void | FRAMEWORK - Invalidates object cache on DAT_006a1864 + 0x48 (Ghidra misidentifies as CRichEditDoc::InvalidateObjectCache). | LOW |
| 004BC1B1 | stub | FUN_004bc1b1 | wonder_view_invalidate_b | (void) | void | FRAMEWORK - Same as above, duplicate. | LOW |
| 004BC1CF | stub | FUN_004bc1cf | wonder_view_invalidate_range | (int msg) | void | FRAMEWORK - Invalidates for messages 0xD0-0xD2 only. | LOW |

### Cluster: AI Advisor/Diplomacy Strategy

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004BC480 | xlarge | FUN_004bc480 | ai_assess_military_posture | (int civ_id) | int | AI assesses military posture (1-7 scale). Counts cities, cities with barracks (building 2), total units. Checks unit support ratio (units/cities). Compares air power (tech 0x4B=Rocketry, 0x3B=Flight), nuclear capability (tech 0x2F=Nuclear Fission + SDI building 8). Counts hatred flags (treaty byte & 0x20). Compares power rank against active civs. Returns: 1=expand, 2=behind, 3=naval threat, 4=no barracks, 5=strong, 6=balanced, 7=dominant. | HIGH |
| 004BC8AA | large | FUN_004bc8aa | ai_assess_city_defense | (int civ_id, int threat_level) | int | AI evaluates city defense adequacy. Counts cities with defense buildings (threat_level determines: 0=Palisade(6), 1=Marketplace(0xC), 2=Granary(0x1A)). Checks tech prereq for building. Evaluates trade surplus vs building maintenance. Returns 1-7 priority scale. | MEDIUM |
| 004BCB9B | xlarge | FUN_004bcb9b | ai_assess_economy | (int civ_id, int era) | int | AI evaluates economic health. Counts cities, sums trade routes (+0x3A), calculates total trade revenue. Checks building coverage (counts all 0x27=39 building types per city). Computes maintenance cost via FUN_004f00f0. If maintenance > trade revenue and gold < 100: priority 1 (bankrupt). Checks infrastructure techs (era-dependent). Returns 1-7 priority. | MEDIUM |
| 004BCFCF | large | FUN_004bcfcf | ai_assess_diplomacy | (int civ_id, int era) | int | AI evaluates diplomatic situation. Counts: contacts (treaty flag & 1), alliances (& 8), hatred (& 0x20). Checks embassy visibility (flag & 0x80), UN wonder (0x18), Espionage wonder (9). Evaluates treaty network depth. Returns 1-7 priority for diplomatic action. | MEDIUM |
| 004BD2A3 | large | FUN_004bd2a3 | ai_assess_tax_rate | (int civ_id) | int | AI evaluates whether to adjust tax/science rates. Checks for cities with unhappy > happy citizens, WLTKD status, disorder (city flag & 2). Evaluates if science+tax rates sum to optimal levels. Government type affects thresholds (Democracy=6 gets special handling for disorder in capital). Returns 1-6 priority for rate adjustment. | MEDIUM |

### Cluster: AI Tech/Research Valuation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004BD9F0 | small | FUN_004bd9f0 | civ_has_tech | (int civ_id, int tech_id) | bool | Checks if a civ has a specific technology. Special cases: -2=false, <0=true, 0x59(89)=false, >=100=false. For valid IDs (0-99): decomposes tech_id into byte+bit via FUN_005ae3bf, checks against civ tech_flags at DAT_0064c6f8 + civ*0x594. Returns 0/1. | HIGH |
| 004BDAA5 | small | FUN_004bdaa5 | tech_is_descendant_of | (int tech_a, int tech_b) | bool | Recursively checks if tech_a is a descendant of tech_b in the tech tree. Uses tech_prereq_chain at DAT_0062768e (stride 0x10, two prereq bytes per tech). Returns 1 if tech_b is found anywhere in tech_a's prerequisite tree. | HIGH |
| 004BDB2C | xlarge | FUN_004bdb2c | ai_calc_tech_value | (int civ_id, int tech_id) | int | Core AI tech valuation function. Base value from RULES.TXT tech entry (epoch * AI_interest + base_cost at DAT_0062768a-b). Adds exploration bonus (3/2/1 based on whether tech is prerequisite for Navigation/Astronomy/Magnetism/Gunpowder). Checks continent accessibility (bonus if civ has isolated continents). Adds values for: research target alignment, wonder prerequisites (checks all 28 wonders' obsolete techs at DAT_0064ba28), city size prerequisites (DAT_0064bcd1/d2 = aqueduct/sewer thresholds), leader personality bonuses (21-entry switch by leader index for tech-specific preferences). Subtracts value for techs whose children are already known. Minimum return value = 1. | HIGH |

### Cluster: Unit Upgrade & Tech Discovery Effects

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004BE6BA | large | FUN_004be6ba | upgrade_units_for_tech | (int civ_id) | void | Checks Leonardo's Workshop (wonder 0xE=14). For each unit owned by civ: finds obsolescence tech, checks if an upgrade path exists (same domain, better attack/defense). If upgrade available: shows notification to human player (FUN_004271e8 for unit names), sends network sync for multiplayer (message 0x72). Changes unit type in-place, clears veteran flag (bit 0x2000). String: `"UPGRADE"`. | HIGH |
| 004BEA84 | large | FUN_004bea84 | handle_tech_government_effects | (int civ_id, int tech_id) | void | Handles government-related effects of discovering specific techs. Tech 0x36(54)=Monarchy: offers auto-revolution if currently Despotism. Techs 0x47(Republic)/0x15(Communism)/0x0F(Democracy)/0x1F(Fundamentalism): offers revolution dialog with current government comparison. Shows tutorial messages for key techs (Railroads=0x43, Farmland=0x46, Trade=0x54, Seafaring=0x4B, Writing=0x58). Strings: `"AUTOMONARCHY"`, `"STARTREV"`, `"AUTOREV"`, `"REPUBLIC"`, `"RAILROADS"`, `"FARMLAND"`, etc. | HIGH |
| 004BEE56 | medium | FUN_004bee56 | we_love_the_king_day | (int civ_id) | void | Triggers "We Love The King Day" golden age event. Selects a random capital-quality city (scores cities by size, doubles if has Palace=building 1). Announces "GOLDENAGE" with city name. Sends network message 0x54 in multiplayer. String: `"GOLDENAGE"`. | HIGH |
| 004BEFD1 | small | FUN_004befd1 | format_enabled_item | (unused, name_ptr, int *count, int *col) | void | Formats an enabled improvement/unit name for the tech discovery screen. Handles column wrapping at 4 items per line. Uses comma separator (DAT_0062db88) or newline+color reset. | MEDIUM |
| 004BF05B | xlarge | FUN_004bf05b | handle_tech_discovery | (uint civ_id, int tech_id, uint source_civ, int param4, int param5) | void | Master function for when a civ discovers a technology. Updates tech bitmask, increments tech count. In multiplayer: delegates to network message 0x9B. Shows discovery notification to appropriate players (checks embassy, alliance, god mode). Lists newly enabled improvements and units (FUN_004befd1). Handles: barracks obsolescence (tech makes all barracks obsolete, refunds gold = cost * maintenance * count), new tech making a wonder obsolete (shows ENDWONDER message), Leonardo's Workshop unit upgrades, AI auto-tech-steal for allies. Sends network diff sync. Strings: `"erhalten"` (German "received"), `"BARRACKS"`, `"ENDWONDER"`. | HIGH |
| 004BFD9A | stub | FUN_004bfd9a | tech_discovery_cleanup | (void) | void | FRAMEWORK - Thunk to FUN_0059df8a (dialog cleanup). | LOW |
| 004BFDB0 | stub | FUN_004bfdb0 | tech_discovery_seh_unwind | (void) | void | FRAMEWORK - SEH unwind. | HIGH |
| 004BFDBE | small | FUN_004bfdbe | can_research_tech | (int civ_id, int tech_id) | bool | Checks if a tech is researchable by a civ: tech must have prerequisites flag set (DAT_00627689), civ must NOT already have it, civ MUST have both prerequisites (DAT_0062768e/f). Returns 1 if researchable. | HIGH |
| 004BFE5A | xlarge | FUN_004bfe5a | can_build_unit_type | (int civ_id, int city_idx, int unit_type_id) | bool | Checks if a civ can build a specific unit type. Verifies: prerequisite tech owned, obsolete tech NOT owned, special cases for Stealth tech (0x3A) + carry capacity restrictions, diplomats only if no Espionage, AI optimization (skips if strictly dominated unit of same domain/role exists), missile units only with Manhattan Project (city flag check). Returns 0/1. Uses unit_type fields: +0x08=prereq_tech, +0x09=domain, +0x0A=move_rate, +0x0B=range, +0x0C=attack, +0x0D=defense, +0x12=role, +0x13=obsolete_tech. | HIGH |

---

## SUMMARY

### 1. Function Counts

**Total functions: 96**

| Category | Count | Percentage |
|----------|-------|-----------|
| Network/Diff Engine | 20 | 20.8% |
| Diplomacy/Parley UI | 30 | 31.3% |
| AI Strategy/Advisor | 5 | 5.2% |
| Tech/Research Logic | 8 | 8.3% |
| Map/Continent Calc | 3 | 3.1% |
| Wonder View/Video | 16 | 16.7% |
| FRAMEWORK (CRT/MFC) | 40 (within above) | ~42% |
| Game Logic (misc) | 4 | 4.2% |

Note: FRAMEWORK functions are counted in their parent clusters above. About 40 of the 96 functions are pure framework boilerplate (static initializers, SEH unwinds, widget destructors, thunks).

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_004b0b53 (diff_engine_scan_and_send)** - Core multiplayer synchronization engine. 1883 bytes. Scans game state for changes, computes diffs, sends over network. Critical for understanding the multiplayer protocol.

2. **FUN_004b32fe (continent_assign_body_ids)** - Assigns continent/body IDs to all map tiles using flood-fill with union-find merging. 1853 bytes. Directly determines the body_id byte in tile data (byte 3), essential for understanding AI continental strategy.

3. **FUN_004bdb2c (ai_calc_tech_value)** - AI tech research valuation algorithm. 2869 bytes. Complete priority scoring system with leader personality modifiers (21-type switch statement), wonder prerequisites, exploration bonuses, and diplomatic considerations.

4. **FUN_004bf05b (handle_tech_discovery)** - Master handler for technology discovery effects. 3391 bytes. Triggers unit upgrades, wonder obsolescence, barracks refunds, notification messages, tutorial popups, and multiplayer synchronization.

5. **FUN_004b21d7 (diff_engine_init_sections)** - Maps all 23 serializable game data sections to their memory addresses and sizes. Provides the complete memory layout of the game state for save/load and network sync. Key for understanding save file structure at runtime.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|---------|
| DAT_0062d0bc | diff_engine_mirror_buffer | Allocated/freed in diff engine alloc/free functions. Main comparison buffer. |
| DAT_00679fe8 | diff_engine_cursor | Read/write pointer into mirror buffer during diff scanning. |
| DAT_0067a400 | diff_engine_total_mirror_size | Total size of mirror buffer in bytes (sum of all sections). |
| DAT_0067a404 | diff_engine_current_section | Current section index (0-0x16) during diff scanning. |
| DAT_0067a408 | diff_engine_mirror_end | Pointer to end of mirror buffer (base + total_size). |
| DAT_0067a410 | diff_section_descriptors[] | Array of 0x18-byte section descriptors (size, aligned_size, index, checksum, source_ptr, dest_offset). |
| DAT_0067a414 | diff_section_sizes[] | Section sizes within descriptor array (stride 0x18, first entry). |
| DAT_0067a424 | diff_section_src_ptrs[] | Section source pointers within descriptor array (stride 6 dwords). |
| DAT_006d1160 | map_width | Map width in tiles. Used in continent assignment and tile coordinate calculations. |
| DAT_006d1162 | map_height | Map height in tiles. Used in map iteration loops. |
| DAT_006d1164 | map_total_tiles | Total tile count (derived from width * height / 2). |
| DAT_00666130 | continent_land_tile_counts[64] | Per-continent land tile counts (stride 0x10, offset 0). |
| DAT_00666134 | continent_sea_tile_counts[64] | Per-continent sea tile counts (stride 0x10, offset 4). |
| DAT_00666137 | continent_adjacency_table[64][8] | 64x8 byte adjacency bitmask between continents (stride 0x10, offset 7). |
| DAT_0067a8bc | parley_active_session | Whether a diplomacy session is currently active (0=no). |
| DAT_0067a8c0 | parley_target_civ | Target civ index for current diplomacy session. |
| DAT_0067a994 | parley_negotiation_state | Current negotiation state machine value (0-15). |
| DAT_0067a9b0 | parley_offer_type | Current offer type (-1=general, 0=peace, 1=tech, 2=tribute, 3=city, 4=map). |
| DAT_0067a9dc | parley_pending_packet | Pointer to pending diplomacy network packet. |
| DAT_0062d870 | chat_display_buffer | Dynamically allocated chat text display buffer. |
| DAT_0062d86c | chat_input_buffer | Dynamically allocated chat input buffer (257 bytes). |
| DAT_0069b03c | chat_buffer_size | Chat display buffer size (8192-57344, from CIV.INI ChatShowSize). |
| DAT_006c91e4-f4 | diplo_response_flags[4] | Diplomacy response type flags: e4=war_declaration, e8=treaty_break, ec=accept, f0=reject, f4=counter_offer. |
| DAT_006ab198 | screen_size_threshold | Screen size threshold (>999 enables high-res layout). Already in reference but confirmed usage. |
| DAT_00655b82 | tech_known_bitmask[100] | Per-tech bitmask of which civs know each tech (byte per tech, bit per civ). |
| DAT_00655b1e | tech_first_discoverer[100] | Per-tech first discoverer tracking (byte per tech, set to civ bitmask on first discovery globally). |
| DAT_0064c59e | ai_current_research_target | Current AI research target tech index. |
