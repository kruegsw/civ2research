# Phase 1 Analysis: block_00420000 (0x00420000 - 0x0042FFFF)

## Function Table

### Cluster: MFC/CRT Thunks and Destructors

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004201EF | stub | FUN_004201ef | thunk_005d7c6e | 0 | void | Thunk to FUN_005d7c6e | LOW |
| 004201FB | stub | FUN_004201fb | thunk_destroy_stream | 0 | void | Thunk to FUN_005c656b (stream/object destructor) | LOW |
| 00420207 | stub | FUN_00420207 | thunk_0059df8a | 0 | void | Thunk to 0059df8a (MFC destructor pattern) | LOW |
| 0042021D | stub | FUN_0042021d | seh_unwind_handler | 0 | void | SEH (Structured Exception Handling) frame unwind — restores FS:[0] | MEDIUM |
| 00421BB0 | stub | FUN_00421bb0 | get_tick_count_wrapper | 0 | void | Thunk to FUN_005d41e0 — used as timer baseline (return compared for elapsed time) | MEDIUM |
| 00421BD0 | stub | FUN_00421bd0 | thunk_005bb9c0 | 0 | void | Thunk to FUN_005bb9c0 | LOW |
| 00421BF0 | stub | Realloc | realloc_wrapper | 1 | void | MFC library Realloc (CHtmlStream/CMemFile) — FRAMEWORK | HIGH |
| 00421C30 | stub | FUN_00421c30 | thunk_005d8476 | 0 | void | Thunk to FUN_005d8476 | LOW |
| 00421C60 | stub | FUN_00421c60 | thunk_005d8721 | 0 | void | Thunk to FUN_005d8721 | LOW |

### Cluster: Multiplayer List Control (UI Widget)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00421CA0 | small | FUN_00421ca0 | mp_list_invalidate_item | 1(idx) | void | Sets flag at offset +0x18 in list item struct (stride 0xA4), invalidates item for repaint | MEDIUM |
| 00421F40 | stub | FUN_00421f40 | mp_get_byte_1ef | 0 | byte | Returns byte at this+0x1EF from ECX object (MP connection state flag?) | LOW |
| 00421F70 | small | FUN_00421f70 | mp_init_object | 0 | int(this) | Initializes MP object: sets +4=1, +0x14C=0, +0x174=0. Returns this. | MEDIUM |
| 00421FAD | stub | FUN_00421fad | mp_thunk_0059baf0 | 0 | void | Thunk to FUN_0059baf0 (MP networking) | LOW |

### Cluster: Multiplayer Connection & Session Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00421FCD | xlarge | FUN_00421fcd | mp_join_game | 1(mode) | void | Master multiplayer join/host function (8475 bytes). Handles: XD_OpenConnection, version check ("5_4_0f Multiplayer 26 March 99"), session enumeration, save/scenario loading via __chdir, TITLE_GIF display, game profile exchange. Mode: 0=IP connect, 1=browse, 2/3=reconnect. Uses: WAITINGFORSERVER, WAITTOJOIN, WAITINGONJOIN strings, XD_FlushSendBuffer(180000ms timeout), DAT_006ad2f8 connection type, DAT_006c31d4 session list head. Sets civ leader graphics, loads art files. | HIGH |
| 00424101 | stub | FUN_00424101 | mp_destroy_stream_2 | 0 | void | Thunk to FUN_005c656b — cleanup within mp_join_game | LOW |
| 0042410D | stub | FUN_0042410d | mp_destructor_2 | 0 | void | Thunk to 0059df8a — cleanup within mp_join_game | LOW |
| 00424129 | stub | FUN_00424129 | mp_destroy_stream_3 | 0 | void | Thunk to FUN_005c656b — cleanup within mp_join_game | LOW |
| 00424135 | stub | FUN_00424135 | mp_destructor_3 | 0 | void | Thunk to 0059df8a — cleanup within mp_join_game | LOW |
| 0042414B | stub | FUN_0042414b | mp_seh_unwind | 0 | void | SEH frame unwind for mp_join_game | LOW |

### Cluster: Multiplayer Timer/Heartbeat

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042415C | stub | FUN_0042415c | mp_send_keepalive | 0 | void | Calls thunk_FUN_0047e94e(1,0) — likely sends a MP keepalive/heartbeat packet | MEDIUM |
| 0042417A | small | FUN_0042417a | mp_check_connection_errors | 0 | void | Sends keepalive, checks DAT_006c8ff0/900c/8ff4/9024 for connection errors. Sets flag 0x400 and invalidates MP window if errors detected. | MEDIUM |
| 004241F8 | medium | FUN_004241f8 | mp_animate_waiting_arrow | 0 | void | Animates '<' and '>' arrow markers in MP lobby text after 2-second idle timer. Toggles arrow direction for visual "waiting" indicator. Handles error flags same as mp_check_connection_errors. | MEDIUM |
| 0042433C | small | FUN_0042433c | mp_check_errors_type2 | 0 | void | Keepalive + error check for DAT_006c8ff0/900c/9010 flags. Similar to mp_check_connection_errors but different flag set. | MEDIUM |
| 0042439C | small | FUN_0042439c | mp_check_errors_type3 | 0 | void | Keepalive + error check for DAT_006c9038/900c flags. | MEDIUM |
| 004243EF | small | FUN_004243ef | mp_check_errors_type4 | 0 | void | Keepalive + error check for DAT_006c902c/900c/8ff4 flags. | MEDIUM |
| 0042444F | small | FUN_0042444f | mp_check_timeout | 0 | void | Keepalive + timeout check. If DAT_006ad300==-1 and elapsed>0x4D8 (1240ms), triggers invalidation. Always triggers if DAT_006ad300!=-1. | MEDIUM |

### Cluster: Multiplayer Session List UI

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004244E0 | medium | FUN_004244e0 | mp_update_session_selection | 0 | void | Updates selected session range in MP lobby listbox. Calculates visible range from session list, handles scrolling bounds, calls selection update. Uses DAT_006c31d4 linked list. | MEDIUM |
| 00424688 | small | FUN_00424688 | mp_find_session_node | 2(name1,name2) | int(node) | Searches DAT_006c31d4 linked list for session matching name pair at +0x70/+0x90. Returns list node pointer or default. | MEDIUM |
| 0042472A | small | FUN_0042472a | mp_sync_session_names | 0 | void | Syncs current/selected session names from DAT_006c31d4 list to in_ECX object fields. Populates display names for host (+0x220) and client (+0x210). | MEDIUM |
| 004247B2 | small | FUN_004247b2 | mp_resolve_session_to_names | 3(node,dst1,dst2) | void | Resolves a session list node to name strings. Walks linked list by +0x20 to find matching node, copies names from +0x70 and +0x90. | MEDIUM |
| 0042486F | large | FUN_0042486f | mp_create_session_list_buttons | 0 | void | Creates 9 labeled buttons for MP session browser UI. Uses DAT_00625d14..625d34 string resources. Calculates button positions relative to window bounds. | MEDIUM |
| 00424AE9 | xlarge | FUN_00424ae9 | mp_update_session_info | 0 | int(1) | Updates the 9 session info text fields (player count, game name, difficulty, map size, turn timer, etc.) from selected DAT_006c31d4 session node. Formats time as HH:MM. Copies game settings (DAT_00655af0/afc/b08 flags). Returns 1. | MEDIUM |
| 004253EF | small | FUN_004253ef | mp_clear_session_list | 0 | void | Frees all session list nodes (linked list via +0x10), resets head/count/selection pointers to 0. | MEDIUM |
| 004254A8 | medium | FUN_004254a8 | mp_add_session_entry | 2(name,id) | uint*(node) | Appends new 24-byte node to session linked list. Copies name, calculates max text width for display column. Sets bit 0 if name is empty. Returns new node. | MEDIUM |
| 00425607 | small | FUN_00425607 | mp_start_timer | 1(callback) | void | Starts a Win32 timer (ID=0x32, 50ms). Stores timer handle at this+0x174. Stops existing timer first if active. | MEDIUM |
| 00425650 | small | FUN_00425650 | mp_stop_timer | 0 | void | Stops the Win32 timer at this+0x174, sets handle to 0. | MEDIUM |
| 00425695 | small | FUN_00425695 | mp_refresh_session_list | 0 | void | Sends network broadcast (0x46b14d with params), prunes stale sessions, starts 250ms refresh timer. | MEDIUM |
| 0042570C | medium | FUN_0042570c | mp_prune_stale_sessions | 0 | void | Removes sessions from DAT_006c31d4 list where elapsed time exceeds DAT_006ad8b8*60 seconds. Unlinks from doubly-linked list (+0x20 next, +0x24 prev), frees memory. Calls mp_rebuild_list if any removed. | MEDIUM |
| 004257FE | medium | FUN_004257fe | mp_rebuild_session_list_ui | 0 | void | Rebuilds the session browser UI from DAT_006c31d4 list. Adds each session as entry, checks player count bits at +0xB4/+0xB5 to disable full sessions. Calls mp_update_session_selection + mp_update_session_info. | MEDIUM |
| 004259A6 | xlarge | FUN_004259a6 | mp_setup_game_profile | 1(is_join) | int(dlg_result) | Sets up MP game profile dialog ("GAMEPROFILE"). Populates 10 string controls (DAT_0063cc48 stride 0x104) with game name, scenario, map size, difficulty, turn number, player counts, human slot counts. Uses bitmask tables for slot counts. Returns dialog result. | HIGH |

### Cluster: Multiplayer Socket/Cleanup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00421D30 | stub | FUN_00421d30 | mp_reset_separator | 0 | void | Calls thunk_FUN_004aef96 on DAT_00679640 — appends separator/newline to text buffer | LOW |
| 00421D60 | stub | FUN_00421d60 | mp_set_string_control | 2(idx,str) | void | Copies string to DAT_0063cc48[idx*0x104] — sets a named control in MP dialog | MEDIUM |
| 00421DA0 | stub | FUN_00421da0 | mp_set_number_control | 2(idx,val) | void | Sets DAT_0063cc30[idx*4] = val — sets a numbered control value in MP dialog | MEDIUM |
| 00421DD0 | stub | FUN_00421dd0 | mp_init_scrollbar | 0 | void | Calls thunk_FUN_0059dfb9(0,0,0,0) — initializes scrollbar or slider control | LOW |
| 00421E00 | stub | CSocket::Create | socket_create | 4(port,type,_,addr) | int | MFC CSocket::Create — FRAMEWORK | HIGH |
| 00421E40 | stub | FUN_00421e40 | mp_set_connection_params | 2(p1,p2) | void | Sets DAT_00635a34 and DAT_00635a38 — connection parameters | LOW |
| 00421E70 | stub | FUN_00421e70 | mp_show_dialog | 2(p1,p2) | void | Calls dialog function on DAT_006359d4 with 2 params | LOW |
| 00421EA0 | stub | FUN_00421ea0 | mp_load_dialog_resource | 1 | void | Loads dialog from DAT_006359d4 | LOW |
| 00421ED0 | stub | FUN_00421ed0 | mp_show_dialog_4p | 4 | void | Shows 4-param dialog on DAT_006359d4 | LOW |
| 00421F10 | stub | FUN_00421f10 | mp_update_turn_label | 1 | void | Updates turn number display on DAT_00679640 | LOW |
| 00426F30 | small | FUN_00426f30 | mp_scalar_deleting_destructor | 1(flags) | void* | Standard MFC scalar deleting destructor pattern: destroy + conditionally free | MEDIUM |
| 00426F80 | stub | FUN_00426f80 | mp_close_connection_window | 0 | void | Calls manage_window_C5DA on child window handle at this+8 | LOW |
| 00426FB0 | stub | FUN_00426fb0 | mp_show_wait_dialog | 4 | void | Shows wait/progress dialog on DAT_006359d4 via FUN_0051d564 | MEDIUM |
| 00426FF0 | medium | FUN_00426ff0 | mp_format_template_string | 2(template,output) | void | Template string formatter: replaces %STRING0..%STRING9 with DAT_0063cc48 values, %NUMBER0..%NUMBER9 with DAT_0063cc30 values, %HEX with 4-digit hex, %% with literal %. Processes template in-place. | HIGH |

### Cluster: Improvement/Building Name Lookup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004271E8 | stub | FUN_004271e8 | set_improvement_name_string | 2(slot,imp_id) | void | Resolves improvement ID to name via get_improvement_name (0x428b0c) and stores in string control slot | MEDIUM |
| 00427211 | stub | FUN_00427211 | set_wonder_name_string | 2(slot,wonder_idx) | void | Resolves wonder from DAT_00628420 table to improvement name, stores in string control | MEDIUM |

### Cluster: Tile Visibility / Unit Discovery on Move

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004272D0 | small | FUN_004272d0 | reveal_tile_for_civ | 3(x,y,civ) | void | Reveals tile (x,y) to civ: sets exploration flag, updates tile visibility mask, updates city/unit visibility. Uses 0x5b9ec6 tile lock, checks for city at tile. | MEDIUM |
| 0042738C | small | FUN_0042738c | cancel_goto_if_blocked | 1(unit_idx) | void | If unit has goto order (0x0B) and target terrain is not type 7 (air range?), cancels goto by setting orders to 0xFF. Checks unit_type domain at DAT_0064b1ca. | MEDIUM |
| 004273E6 | small | FUN_004273e6 | cancel_goto_for_stack | 1(unit_idx) | void | Iterates unit stack (via FUN_005b2d39/005b2c82 linked list). For each unit with goto order (0x03) that is land domain or cannot reach water tile, cancels goto to 0xFF. | MEDIUM |
| 004274A6 | xlarge | FUN_004274a6 | process_unit_move_visibility | 2(unit_idx,do_combat) | void | **Master unit movement visibility function** (4250 bytes). When a unit moves, reveals tiles in city spiral pattern (25 tiles), processes adjacent tile encounters (8 directions + extended 25). Handles: fog-of-war updates, city discovery (0x43cc00), unit-to-unit encounters, first contact events (0x55d8d8), cancel blocked gotos, treaty violation checks (bit 4 = war), zone of control, diplomatic incidents (0x49301b). Core game mechanic interacting with: unit flags, unit type domain/attack traits, civ treaty table, god_mode (DAT_00655b07), scenario flags, human bitmask. | HIGH |

### Cluster: String Pool / Label System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004289E0 | stub | FUN_004289e0 | init_string_pool_wrapper | 0 | void | Calls init_string_pool | LOW |
| 004289F5 | stub | FUN_004289f5 | init_string_pool | 0 | void | Calls FUN_00428cb0 (initializes pool struct) | LOW |
| 00428A0F | small | FUN_00428a0f | string_pool_open | 1(param) | void | Opens/reopens the string pool at DAT_0063e4c0. If already initialized (DAT_00625e64), frees first then reinitializes. Sets DAT_00625e60=0 (count). | MEDIUM |
| 00428A78 | stub | FUN_00428a78 | string_pool_close | 0 | void | Frees the string pool at DAT_0063e4c0 | MEDIUM |
| 00428A95 | small | FUN_00428a95 | string_pool_add | 1(str) | int(idx) | Adds string to pool. Allocates in DAT_0063e4c0, copies string, returns index (DAT_00625e60++). Returns 0 for empty strings. | MEDIUM |
| 00428B0C | small | FUN_00428b0c | get_improvement_name | 1(id) | char* | **Already known.** Walks string pool DAT_0063e4c8 to find the Nth null-terminated string. Used everywhere for improvement/unit/label name resolution. | HIGH |
| 00428B68 | small | FUN_00428b68 | string_pool_add_padded | 2(str,min_size) | int(idx) | Adds string to pool with minimum buffer size. Pads with zeros. If string is empty, replaces with space ' '. Returns index. | MEDIUM |
| 00428CB0 | small | FUN_00428cb0 | string_pool_struct_init | 0 | int(this) | Initializes string pool struct: sets +4=0, +8=0, +0xE=0. Returns this. | MEDIUM |

### Cluster: City Name Editor Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00428D00 | stub | FUN_00428d00 | city_name_editor_init | 0 | void | Calls FUN_004293a8 (city name editor paint) | LOW |
| 00428D1B | stub | FUN_00428d1b | city_name_editor_refresh | 0 | void | Sets DAT_006a1d7c=0, invalidates DAT_006a4f88+0x48 window, calls FUN_004e4ceb | MEDIUM |
| 00428D48 | small | FUN_00428d48 | city_name_editor_load_names | 0 | void | Loads city names from "CITIES" section string file using FUN_004190d0 into DAT_00625e90. Uses DAT_006a4f88 as editor context. | HIGH |
| 00428DA7 | stub | FUN_00428da7 | city_name_editor_invalidate | 0 | void | Marks DAT_006a1d7c=0, invalidates the editor window at DAT_006a4f88+0x48 | MEDIUM |
| 00428DCF | small | FUN_00428dcf | city_name_editor_set_name | 0 | void | Sets city name in editor's 3D city name array (stride 0x3C/0x78/0x1E0) at DAT_0063fe50. Uses DAT_006a4f88 for 3 coordinate indices. | MEDIUM |
| 00428E50 | medium | FUN_00428e50 | city_name_editor_misc_dialog | 0 | void | Shows "CITYMISC" debug dialog. Switch on result: cases 0-1 select fixed data pointers, 2-9 select from computed array (stride 0xF), 10-11 select fixed. Writes city name via FUN_00573e59. | MEDIUM |
| 00428FD2 | small | FUN_00428fd2 | city_name_editor_scroll_update | 0 | void | Reads 3 scroll values via FUN_00418d60 into DAT_006a4f88+0x2EC/2F0/2F4, refreshes display. | MEDIUM |
| 0042903E | large | FUN_0042903e | city_name_editor_create_buttons | 1(panel) | void | Creates 4-6 buttons per panel (0=civilization names, 1=misc, 2=more) using get_improvement_name from DAT_00628420 label table. Button positions computed from panel coordinates at DAT_00625e70/74. | MEDIUM |

### Cluster: City Name Editor Window

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004293A8 | large | FUN_004293a8 | city_name_editor_paint | 0 | void | Paints the city name editor window. Draws background (DAT_0062e018 surface), renders city sprite via FUN_00417f70, blits sprite with transparency, renders 3 label rows with scrollbar text. Uses begin_paint/end_paint pattern. | MEDIUM |
| 00429671 | xlarge | FUN_00429671 | city_name_editor_open | 0 | void | Opens city name editor dialog (2002 bytes). Creates DIB surface (0x48 bytes), loads "EDITORSQ.GIF", sets up window (0x230 x 0x17C), creates 3 panels, scrollbars, buttons. Event loop via DAT_006a1d7c flag. Cleanup frees surface. | HIGH |
| 00429E53 | stub | FUN_00429e53 | cne_destroy_stream | 0 | void | Cleanup thunk for city name editor | LOW |
| 00429E69 | stub | FUN_00429e69 | cne_seh_unwind | 0 | void | SEH unwind for city name editor | LOW |
| 00429E77 | small | FUN_00429e77 | city_name_editor_entry | 0 | void | Entry point wrapper: calls font setup (FUN_00417fa0), opens editor (FUN_00429671), cleanup | MEDIUM |
| 00429ED0 | stub | FUN_00429ed0 | cne_font_cleanup | 0 | void | Thunk to FUN_004183d0 (font cleanup) | LOW |
| 00429EE6 | stub | FUN_00429ee6 | cne_seh_unwind_2 | 0 | void | SEH unwind | LOW |

### Cluster: CRT Static Initializers (Floating-point / Locale)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042A380 | stub | FUN_0042a380 | static_init_fp_24 | 0 | void | CRT static init: FUN_0043c4c0(0,0x18,1) + atexit cleanup — FRAMEWORK | HIGH |
| 0042A39A | stub | FUN_0042a39a | static_init_fp_24_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A3BA | stub | FUN_0042a3ba | static_init_fp_24_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A3D7 | stub | FUN_0042a3d7 | static_cleanup_fp_24 | 0 | void | FRAMEWORK | HIGH |
| 0042A3F1 | stub | FID_conflict___E51 (1st) | static_init_18 | 0 | void | CRT static init: FUN_0043c460(0,0x12) + atexit — FRAMEWORK | HIGH |
| 0042A40B | stub | FUN_0042a40b | static_init_18_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A429 | stub | FUN_0042a429 | static_init_18_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A446 | stub | FUN_0042a446 | static_cleanup_18 | 0 | void | FRAMEWORK | HIGH |
| 0042A460 | stub | FUN_0042a460 | static_init_fp_16 | 0 | void | CRT static init: FUN_0043c4c0(0,0x10,1) + atexit — FRAMEWORK | HIGH |
| 0042A47A | stub | FUN_0042a47a | static_init_fp_16_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A49A | stub | FUN_0042a49a | static_init_fp_16_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A4B7 | stub | FUN_0042a4b7 | static_cleanup_fp_16 | 0 | void | FRAMEWORK | HIGH |
| 0042A4D1 | stub | FUN_0042a4d1 | static_init_fp_14 | 0 | void | CRT static init: FUN_0043c4c0(0,0xE,1) + atexit — FRAMEWORK | HIGH |
| 0042A4EB | stub | FUN_0042a4eb | static_init_fp_14_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A50B | stub | FUN_0042a50b | static_init_fp_14_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A528 | stub | FUN_0042a528 | static_cleanup_fp_14 | 0 | void | FRAMEWORK | HIGH |
| 0042A542 | stub | FUN_0042a542 | static_init_fp_12 | 0 | void | CRT static init: FUN_0043c4c0(0,0xC,1) + atexit — FRAMEWORK | HIGH |
| 0042A55C | stub | FUN_0042a55c | static_init_fp_12_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A57C | stub | FUN_0042a57c | static_init_fp_12_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A599 | stub | FUN_0042a599 | static_cleanup_fp_12 | 0 | void | FRAMEWORK | HIGH |
| 0042A5B3 | stub | FID_conflict___E51 (2nd) | static_init_16b | 0 | void | CRT static init: FUN_0043c460(0,0x10) + atexit — FRAMEWORK | HIGH |
| 0042A5CD | stub | FUN_0042a5cd | static_init_16b_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A5EB | stub | FUN_0042a5eb | static_init_16b_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A608 | stub | FUN_0042a608 | static_cleanup_16b | 0 | void | FRAMEWORK | HIGH |
| 0042A622 | stub | FID_conflict___E31 (1st) | static_init_cdao_1 | 0 | void | CRT static init: FUN_0043c260 + atexit(CDaoFieldInfo dtor at 0063eb10) — FRAMEWORK | HIGH |
| 0042A63C | stub | FUN_0042a63c | static_init_cdao_1_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A656 | stub | FUN_0042a656 | static_init_cdao_1_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A673 | stub | FUN_0042a673 | static_cleanup_cdao_1 | 0 | void | CDaoFieldInfo destructor at DAT_0063eb10 — FRAMEWORK | HIGH |
| 0042A68D | stub | FID_conflict___E31 (2nd) | static_init_cdao_2 | 0 | void | CRT static init: FUN_0043c260 + atexit(CDaoFieldInfo dtor at 0063e4f8) — FRAMEWORK | HIGH |
| 0042A6A7 | stub | FUN_0042a6a7 | static_init_cdao_2_impl | 0 | void | FRAMEWORK | HIGH |
| 0042A6C1 | stub | FUN_0042a6c1 | static_init_cdao_2_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A6DE | stub | FUN_0042a6de | static_cleanup_cdao_2 | 0 | void | CDaoFieldInfo destructor at DAT_0063e4f8 — FRAMEWORK | HIGH |
| 0042A6F8 | stub | FUN_0042a6f8 | static_init_tiles_dll | 0 | void | CRT static init: loads "TILES.DLL" string (FUN_0043c3f0) + atexit cleanup — FRAMEWORK | HIGH |
| 0042A712 | stub | FUN_0042a712 | static_init_tiles_dll_impl | 0 | void | Loads "TILES.DLL" string — FRAMEWORK | HIGH |
| 0042A731 | stub | FUN_0042a731 | static_init_tiles_dll_atexit | 0 | void | FRAMEWORK | HIGH |
| 0042A74E | stub | FUN_0042a74e | static_cleanup_tiles_dll | 0 | void | _Timevec destructor at DAT_0063e4f0 — FRAMEWORK | HIGH |

### Cluster: Credits / Scrolling Text Screen

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042A768 | small | FUN_0042a768 | credits_close | 0 | void | Closes credits/splash screen if active (this+0x450 >= 0). Frees surface, resets state. | MEDIUM |
| 0042A7BC | large | show_credits | show_credits | 7(res_id,p2,p3,w,h,p6,p7) | void | **Already named.** Displays credits screen. Loads "scredits.gif" for ID 10000, otherwise loads from DLL resource. Computes centered position from DAT_006ab198/006ab19c screen size. | HIGH |
| 0042AB9B | stub | FUN_0042ab9b | credits_destroy_stream | 0 | void | Cleanup thunk for show_credits | LOW |
| 0042ABB1 | stub | FUN_0042abb1 | credits_seh_unwind | 0 | void | SEH unwind for show_credits | LOW |
| 0042ABC1 | small | FUN_0042abc1 | credits_blit_background | 0 | void | Blits the background surface (this+0x2D8) to window | LOW |
| 0042AC18 | small | FUN_0042ac18 | credits_draw_bg_full | 0 | void | Draws background at full window dimensions (this+0x48C width, +0x474 height) | LOW |
| 0042AC4E | small | FUN_0042ac4e | credits_on_timer | 0 | void | Timer callback: if non-looping mode (this+0x4A0==0), closes credits; else invalidates for repaint | MEDIUM |

### Cluster: Advisor Screens — Intelligence Report

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042ACB0 | small | FUN_0042acb0 | advisor_create_close_button | 0 | void | Creates "Close" button (ID 100) at bottom of advisor window using DAT_00628420+0x51C label. Computes position from window bounds. | MEDIUM |
| 0042AD8F | xlarge | FUN_0042ad8f | advisor_science_paint | 0 | void | Paints Science Advisor screen (1969 bytes). Shows civ header (government type, era, leader name), current research with progress bar (FUN_004c2788=tech cost, FUN_00548c78=progress bar), tech list in 3-column scrollable grid. Uses DAT_0063ef6c=selected_civ. Tech ownership colored per civ. Scrollbar with DAT_0063ef74 page size. | HIGH |
| 0042B540 | stub | FUN_0042b540 | advisor_science_scroll | 1(pos) | void | Sets scroll position (DAT_0063ef70=pos*page_size), repaints science advisor | LOW |
| 0042B563 | medium | FUN_0042b563 | advisor_science_click | 2(x,y) | void | Handles click on science advisor tech grid. Computes row/col from click position, maps to tech index via DAT_004bd9f0, shows tech detail (FUN_00566584). | MEDIUM |
| 0042B65B | stub | FUN_0042b65b | advisor_science_change_goal | 0 | void | Opens tech goal dialog for DAT_0063ef6c civ via FUN_004c0cf7 | MEDIUM |
| 0042B67D | medium | FUN_0042b67d | advisor_science_open | 1(civ) | void | Opens Science Advisor dialog (show_credits(6,...), 600x400). Creates close button, toggle button (DAT_00628420+0x5CC). Sets DAT_0063ef6c=civ. | HIGH |

### Cluster: Advisor Screens — Trade Advisor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042B824 | large | FUN_0042b824 | trade_supply_demand_show | 2(civ,commodity) | void | Shows trade supply/demand details for a commodity. Lists all cities that supply or demand the commodity, showing city name, population, and trade route info. String "SUPPLYSHOW". | HIGH |
| 0042BC22 | stub | FUN_0042bc22 | trade_supply_cleanup | 0 | void | Thunk cleanup | LOW |
| 0042BC38 | stub | FUN_0042bc38 | trade_supply_seh_unwind | 0 | void | SEH unwind | LOW |
| 0042BC47 | medium | FUN_0042bc47 | trade_search_commodity | 1(civ) | void | "SUPPLYSEARCH" dialog — lists 16 commodities, lets user pick one, then calls trade_supply_demand_show. Checks civ has trade advance (tech 0x54). | HIGH |
| 0042BD6B | stub | FUN_0042bd6b | trade_search_cleanup | 0 | void | Thunk cleanup | LOW |
| 0042BD81 | stub | FUN_0042bd81 | trade_search_seh_unwind | 0 | void | SEH unwind | LOW |
| 0042BD8F | xlarge | FUN_0042bd8f | advisor_trade_paint | 0 | void | Paints Trade Advisor screen (3931 bytes). Shows civ header, per-city breakdown with shields/gold icons, total trade/science/gold, improvement maintenance costs and totals. Uses scrollable list with city sprites (FUN_0056d289). Improvement costs from DAT_0064c488. | HIGH |
| 0042CCF4 | stub | FUN_0042ccf4 | advisor_trade_scroll | 1(pos) | void | Sets scroll position, repaints trade advisor | LOW |
| 0042CD11 | stub | FUN_0042cd11 | advisor_trade_search | 0 | void | Calls trade_search_commodity for current civ | LOW |
| 0042CD2F | medium | FUN_0042cd2f | advisor_trade_open | 1(civ) | void | Opens Trade Advisor dialog (show_credits(5,...), 600x400). Creates close and search buttons. Sets DAT_0063ef6c=civ. | HIGH |

### Cluster: Advisor Screens — City Status

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042CED6 | xlarge | FUN_0042ced6 | advisor_city_status_paint | 0 | void | Paints City Status advisor (1858 bytes). Lists all cities for civ with sprites, names, and 3 resource columns (food/shields/trade surplus), plus production item and cost. Scrollable. | HIGH |
| 0042D618 | stub | FUN_0042d618 | advisor_city_status_scroll | 1(pos) | void | Sets scroll position, repaints city status | LOW |
| 0042D635 | medium | FUN_0042d635 | advisor_city_status_click | 2(x,y) | void | Click handler: maps click to city index in scrolled list, opens city dialog (FUN_00509590) | MEDIUM |
| 0042D71E | small | FUN_0042d71e | advisor_city_status_open | 1(civ) | void | Opens City Status advisor (show_credits(1,...)), creates close button, runs event loop | MEDIUM |

### Cluster: Advisor Screens — Citizen Happiness

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042D781 | large | FUN_0042d781 | draw_citizen_happiness_bar | 7(city,x,y,w,happy,unhappy,specialists) | int(spacing) | Draws a row of citizen face icons showing happy/content/unhappy/specialist distribution for a city. Returns icon spacing. Uses FUN_00448f92 for citizen face rendering and FUN_004e75a6 for specialist icons. | MEDIUM |
| 0042DA1D | xlarge | FUN_0042da1d | advisor_happiness_paint | 0 | void | Paints Happiness/Attitude advisor (1634 bytes). Lists cities with sprites, names, and citizen happiness bar. Recalculates production (FUN_004eb4ed) if game flag bit 2 set. Shows disorder/WLTKD status indicators. Scrollable. | HIGH |
| 0042E07F | stub | FUN_0042e07f | advisor_happiness_scroll | 1(pos) | void | Sets scroll position, repaints happiness advisor | LOW |
| 0042E09C | medium | FUN_0042e09c | advisor_happiness_click | 2(x,y) | void | Click handler: maps to city, opens city dialog | MEDIUM |
| 0042E185 | small | FUN_0042e185 | advisor_happiness_open | 1(civ) | void | Opens Happiness advisor (show_credits(4,...)) | MEDIUM |

### Cluster: Advisor Screens — Military/Unit List

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042E1E8 | small | FUN_0042e1e8 | advisor_append_unit_flag | 1(str_id) | void | Appends a comma-separated unit flag description to the military advisor text. Uses DAT_0063e4f4 as "first item" flag. | MEDIUM |
| 0042E220 | xlarge | FUN_0042e220 | advisor_military_paint | 0 | void | Paints Military/Defense advisor (3523 bytes). Two modes (DAT_0063efac toggle): unit inventory view shows each unit type the civ has, with attack/defense/move stats and flag descriptions (settler, trade, diplomat, etc. via flag bits in DAT_0064b1bc/bd); intelligence view shows per-civ unit counts with diplomatic visibility checks (FUN_00453e51). Scrollable list with unit sprites (FUN_0056baff). Color-coded per civ (FUN_0043cb30). | HIGH |
| 0042EFE3 | stub | FUN_0042efe3 | advisor_military_scroll | 1(pos) | void | Sets scroll position, repaints military advisor | LOW |
| 0042F000 | small | FUN_0042f000 | advisor_military_toggle_view | 0 | void | Toggles DAT_0063efac between 0 and 1 (unit inventory vs intelligence view), refreshes advisor | MEDIUM |
| 0042F079 | medium | FUN_0042f079 | advisor_military_open | 1(civ) | void | Opens Military/Defense advisor (show_credits(2,...), 600x400). Creates close + two toggle buttons. Sets DAT_0063efac=0 (default=inventory view). | HIGH |

### Cluster: Advisor Screens — Foreign/Diplomatic Advisor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0042F293 | xlarge | FUN_0042f293 | advisor_foreign_paint | 0 | void | Paints Foreign/Diplomatic advisor (4042 bytes). Shows selected civ's diplomatic status: government type, capital city, gold reserves, current research, treaty status with each known civ (war/peace/cease-fire/alliance), leader personality traits (expansionist/perfectionist/etc.), known techs in 3-column scrollable grid. Uses DAT_0064c6c0 treaty bytes, DAT_006554f8/f9/fa leader trait table, FUN_004679ab=calc_attitude. | HIGH |

## SUMMARY

### 1. Total Functions: 103

| Category | Count |
|----------|-------|
| Multiplayer networking & session management | 30 |
| Advisor screens (Science, Trade, City, Happiness, Military, Foreign) | 28 |
| CRT/MFC framework (static initializers, destructors, thunks) | 27 |
| City name editor | 10 |
| String pool / label system | 7 |
| Credits/splash screen | 7 |
| Tile visibility / unit movement | 4 |

**By size:**
- stub (<=20 lines): 54
- small (21-50): 24
- medium (51-100): 10
- large (101-300): 6
- xlarge (>300): 9

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_004274A6 (process_unit_move_visibility)** — 4250-byte master function for unit movement visibility, fog-of-war, first contact, combat triggers, and treaty violations. Core game mechanic.

2. **FUN_00421FCD (mp_join_game)** — 8475-byte multiplayer session join/host handler. Manages the entire MP connection lifecycle including version checking, session enumeration, save file loading, and game synchronization.

3. **FUN_00426FF0 (mp_format_template_string)** — Template string formatter supporting %STRING, %NUMBER, %HEX substitutions. Used throughout MP UI and potentially game messages.

4. **FUN_004259A6 (mp_setup_game_profile)** — Multiplayer game profile setup showing "GAMEPROFILE" dialog with all game settings. Key for understanding MP protocol data exchange.

5. **FUN_0042E220 (advisor_military_paint)** — 3523-byte military advisor with dual-mode view (unit inventory + intelligence), showing complete unit type flag decoding from DAT_0064b1bc/bd bitfields.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Type | Purpose | Confidence |
|--------|------|---------|------------|
| DAT_006c31d4 | ptr (linked list head) | Multiplayer session list head. Nodes have: +0x20=next, +0x24=prev, +0x28=timestamp, +0x2C=id, +0x30=version_string, +0x70=host_name, +0x90=game_name, +0xB0=player_slots, +0xB2=difficulty, +0xB4/B5=player bitmasks, +0xB8=time_limit | HIGH |
| DAT_006ad108 | int* | Multiplayer lobby UI object pointer. Contains session list widget at +0x4A..0x52 (button handles), +0x210/+0x220 selection indices | HIGH |
| DAT_006ad2f8 | int | MP connection type: 0=host, 2=IPX/serial, 3=reconnect | MEDIUM |
| DAT_006ad228 | int | MP lobby session ID, -1=none | MEDIUM |
| DAT_006ad300 | int | MP game state/phase indicator, -1=none | MEDIUM |
| DAT_006ad678 | int[N] | MP main window object, +0xF=window flags, bit 0x400=needs invalidation | MEDIUM |
| DAT_006ad6AC | int | MP network mode: 2=IPX/serial, other=TCP/IP | MEDIUM |
| DAT_006ad8B8 | int | MP timeout threshold in seconds (used as *1000 for ms, *60 for session prune) | HIGH |
| DAT_0063ef6c | int | Currently selected civ index for advisor screens | HIGH |
| DAT_0063ef70 | int | Advisor screen scroll position (item offset) | HIGH |
| DAT_0063ef74 | int | Advisor screen page size (items per page) | HIGH |
| DAT_0063ef80 | int | Advisor screen row height in pixels | HIGH |
| DAT_0063ef78 | int | Advisor screen list area top Y coordinate | HIGH |
| DAT_0063ef7c | int | Advisor screen list area height in pixels | MEDIUM |
| DAT_0063ef8c | int | Advisor screen max visible items (page_size * 3 for 3-column layouts) | MEDIUM |
| DAT_0063ef94 | int | Advisor screen column area width | MEDIUM |
| DAT_0063ef98 | int | Advisor screen single column width (area/3) | MEDIUM |
| DAT_0063ef90 | int | Advisor screen list area left X coordinate | MEDIUM |
| DAT_0063efac | int | Military advisor view toggle: 0=unit inventory, 1=intelligence | HIGH |
| DAT_0063efa8 | int | Advisor scrollbar initialized flag (0=first paint, 1=ready) | HIGH |
| DAT_006a4f88 | int/ptr | City name editor context pointer. +0x2D8=background surface, +0x2EC/2F0/2F4=scroll indices, +0x2F8=panel count | HIGH |
| DAT_006a1d7c | int | City name editor active flag (0=close, 1=open) | HIGH |
| DAT_0062e018 | int/ptr | City name editor background DIB surface handle | MEDIUM |
| DAT_00625e60 | int | String pool entry count (labels/names loaded from text files) | HIGH |
| DAT_00625e64 | int | String pool initialized flag | MEDIUM |
| DAT_0063e4b8 | char* | String pool last-allocated entry pointer | MEDIUM |
| DAT_0063e4c0 | struct | String pool allocator struct (memory block manager) | MEDIUM |
| DAT_0063e4c8 | char* | String pool base data pointer (contiguous null-terminated strings) | HIGH |
| DAT_006c3164 | int | MP maximum players per session | MEDIUM |
| PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c | char* | Version string "5_4_0f Multiplayer 26 March 99" for MP protocol version check | HIGH |
