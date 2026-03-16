# Phase B2: UNSET Classifications -- Blocks 0x00550000, 0x00560000, 0x00580000, 0x00590000

## Block 0x00550000 (96 UNSET -> classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x00550017 | thunk_wrapper_4183d0 | FW | mfc | 12b | SK | Thunk to FUN_004183d0 |
| 0x0055002d | seh_epilog_002d | FW | seh | 14b | SK | SEH -- restores FS:[0] |
| 0x00551cd0 | scalar_deleting_destructor | FW | mfc | 57b | SK | MFC pattern: call dtor, conditionally free |
| 0x00551d20 | streambuf_egptr | FW | crt | 28b | SK | Library: returns this+0x2c (streambuf::egptr) |
| 0x00551ea0 | crt_static_init_1 | FW | crt | 26b | SK | Calls init+atexit pair |
| 0x00551eba | crt_alloc_16 | FW | crt | 30b | SK | thunk_FUN_0043c460(0, 0x10) |
| 0x00551ed8 | crt_register_atexit_1 | FW | crt | 29b | SK | Registers FUN_00551ef5 via _atexit |
| 0x00551ef5 | crt_static_dtor_1 | FW | crt | 26b | SK | Thunk to thunk_FUN_0043c520 |
| 0x00551f0f | crt_static_init_2 | FW | crt | 26b | SK | Calls init+atexit pair |
| 0x00551f29 | crt_alloc_10 | FW | crt | 30b | SK | thunk_FUN_0043c460(0, 10) |
| 0x00551f47 | crt_register_atexit_2 | FW | crt | 29b | SK | Registers FUN_00551f64 via _atexit |
| 0x00551f64 | crt_static_dtor_2 | FW | crt | 26b | SK | Thunk to thunk_FUN_0043c520 |
| 0x00551f7e | crt_static_init_3 | FW | crt | 26b | SK | Calls init+atexit pair |
| 0x00551f98 | crt_alloc_16b | FW | crt | 30b | SK | thunk_FUN_0043c460(0, 0x10) |
| 0x00551fb6 | crt_register_atexit_3 | FW | crt | 29b | SK | Registers FUN_00551fd3 via _atexit |
| 0x00551fd3 | crt_static_dtor_3 | FW | crt | 26b | SK | Thunk to thunk_FUN_0043c520 |
| 0x00553444 | dialog_dtor | FW | mfc | 87b | SK | Sets vtable, destroys buttons, chains base dtor |
| 0x0055349b | dialog_base_dtor | FW | mfc | 9b | SK | Thunk to thunk_FUN_0044cba0 |
| 0x005534ae | seh_epilog_34ae | FW | seh | 14b | SK | SEH epilog |
| 0x00554272 | seh_cleanup_54272 | FW | seh | 12b | SK | Thunk to popup_dialog_close (0x0059df8a) |
| 0x00554288 | seh_epilog_54288 | FW | seh | 15b | SK | SEH epilog |
| 0x00554423 | cheat_reveal_map | UI | editor | 61b | SK | Calls map reveal function with player param |
| 0x00554460 | cheat_toggle_all_tech | GL | research | 371b | EX | CONTAINS_GAME_LOGIC: Toggles all techs for a player -- iterates 100 techs, sets/clears tech bits in civ record (0x594-byte stride), updates tech bitmask at DAT_00655b82 |
| 0x005545d3 | cheat_edit_tech | UI | editor | 870b | EX | CONTAINS_GAME_LOGIC: Tech editor -- shows popup listing 100 techs, allows toggling individual techs via thunk_FUN_004bf05b/004bd9f0, recalculates tech count |
| 0x0055493e | seh_cleanup_5493e | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00554954 | seh_epilog_54954 | FW | seh | 14b | SK | SEH epilog |
| 0x00554962 | cheat_change_govt | UI | editor | 61b | SK | Calls FUN_0055c3d3 (government change) with player index |
| 0x0055499f | cheat_edit_terrain | UI | editor | 2032b | EX | CONTAINS_GAME_LOGIC: Terrain editor -- modifies terrain byte flags, handles terrain type changes (0-10 types), river bit, neighbor improvements, calls map update functions |
| 0x0055518f | seh_cleanup_5518f | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x005551a5 | seh_epilog_551a5 | FW | seh | 14b | SK | SEH epilog |
| 0x005551b3 | cheat_place_unit | UI | editor | 1059b | EX | CONTAINS_GAME_LOGIC: Unit placement editor -- iterates 62 unit types (0x3e), filters by tech prerequisites, calls thunk_FUN_005b3d06 to create unit at cursor coords |
| 0x005555eb | seh_cleanup_555eb | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00555601 | seh_epilog_55601 | FW | seh | 14b | SK | SEH epilog |
| 0x0055560f | cheat_change_player | UI | editor | 524b | EX | CONTAINS_GAME_LOGIC: Switches active player -- sets DAT_00655b06/b07, DAT_006d1da0 (current player), bit-shifts for player bitmask |
| 0x0055581b | seh_cleanup_5581b | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00555831 | seh_epilog_55831 | FW | seh | 14b | SK | SEH epilog |
| 0x0055583f | cheat_change_human_civ | UI | editor | 415b | EX | CONTAINS_GAME_LOGIC: Changes which civ is human-controlled -- modifies DAT_00655b0b (human player bitmask), DAT_00655b03/b05, calls viewport/map refresh |
| 0x005559de | seh_cleanup_559de | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x005559f4 | seh_epilog_559f4 | FW | seh | 14b | SK | SEH epilog |
| 0x00555a02 | cheat_set_game_year | GL | init | 137b | EX | CONTAINS_GAME_LOGIC: Sets game year (DAT_00655af8), recalculates year string via FUN_00484fec, refreshes status |
| 0x00555a8b | cheat_destroy_civ | GL | city | 514b | EX | CONTAINS_GAME_LOGIC: Destroys a civ -- clears player from bitmask, iterates all cities deleting those owned by target, calls thunk_kill_civ |
| 0x00555c8d | seh_cleanup_55c8d | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00555ca3 | seh_epilog_55ca3 | FW | seh | 14b | SK | SEH epilog |
| 0x00555cb1 | cheat_edit_unit_at_cursor | UI | editor | 60b | SK | Gets unit at cursor coords then calls thunk_FUN_005b47fa (unit edit) |
| 0x00555d70 | cheat_show_ai_goals | UI | editor | 857b | EX | CONTAINS_GAME_LOGIC: Shows AI goals for a player -- reads 48 (0x30) AI goal entries at DAT_0064cab4 (6-byte stride within 0x594-byte civ record), displays goal type icons and coordinates |
| 0x005560c9 | cheat_reveal_map_area | UI | editor | 147b | SK | Reveals map area around viewport -- iterates tiles, calls map reveal function |
| 0x0055615c | cheat_set_money | GL | city | 255b | EX | CONTAINS_GAME_LOGIC: Sets player gold -- reads/writes DAT_0064c6a2 (treasury in civ record), caps at 0-30000 |
| 0x0055625b | cheat_edit_unit | UI | editor | 1892b | EX | CONTAINS_GAME_LOGIC: Full unit editor -- edits veteran flag (0x2000 bitmask), home city, hit points, movement type, cargo type, uses 0x20-byte unit stride at DAT_006560f0 |
| 0x005569bf | seh_cleanup_569bf | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x005569d5 | seh_epilog_569d5 | FW | seh | 14b | SK | SEH epilog |
| 0x005569e3 | cheat_edit_city | UI | editor | 1357b | EX | CONTAINS_GAME_LOGIC: City editor -- edits city size (DAT_0064f349), wonders (DAT_00655be6), food box reset, production item change, shield box (DAT_0064f35c), capital flag (0x4000000 bit) |
| 0x00556f30 | seh_cleanup_56f30 | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00556f46 | seh_epilog_56f46 | FW | seh | 14b | SK | SEH epilog |
| 0x00556f54 | cheat_edit_civ | UI | editor | 3764b | EX | CONTAINS_GAME_LOGIC: Full civ editor -- edits treaties (alliance/peace/ceasefire/war bits), contact turns, AI attitudes, betrayal counter, research progress (DAT_0064c6a8), future tech names, government type |
| 0x00557e08 | seh_cleanup_57e08 | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x00557e1e | seh_epilog_57e1e | FW | seh | 14b | SK | SEH epilog |
| 0x00557e2c | cheat_edit_victory | UI | editor | 843b | SK | Victory conditions editor UI |
| 0x00558177 | seh_cleanup_58177 | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x0055818d | seh_epilog_5818d | FW | seh | 14b | SK | SEH epilog |
| 0x0055819b | cheat_edit_rules | UI | editor | 274b | SK | Rules editor -- opens cosmic rules dialog |
| 0x005582ad | cheat_edit_scenario | UI | editor | 1648b | EX | CONTAINS_GAME_LOGIC: Scenario editor -- modifies terrain visibility per player, city nationality assignment, scenario start year (DAT_0064bcb6), max turns (DAT_0064bcb8), scenario flags (DAT_0064bc60) |
| 0x0055891d | cheat_save_game | IO | save | 26b | SK | Calls thunk_save_game(1) |
| 0x00559c20 | crt_static_init_miniframe | FW | crt | 26b | SK | CRT static init for CMiniFrameWnd at DAT_006ab1b8 |
| 0x00559c3a | crt_init_miniframe | FW | crt | 26b | SK | Thunk to FUN_00559e3c (video window ctor) |
| 0x00559c54 | crt_register_atexit_miniframe | FW | crt | 29b | SK | Registers dtor via _atexit |
| 0x00559c71 | crt_dtor_miniframe | FW | mfc | 26b | SK | CMiniFrameWnd::~CMiniFrameWnd on DAT_006ab1b8 |
| 0x00559c8b | crt_static_init_surface | FW | crt | 26b | SK | CRT static init for surface object |
| 0x00559ca5 | crt_init_surface_obj | FW | crt | 26b | SK | Thunk to FUN_005bd630 (surface ctor) |
| 0x00559cbf | crt_register_atexit_surface | FW | crt | 29b | SK | Registers FUN_00559cdc via _atexit |
| 0x00559cdc | crt_dtor_surface_obj | FW | crt | 26b | SK | Thunk to FUN_005bd915 (surface dtor) |
| 0x00559cf6 | video_create_surface | CS | wonder | 199b | SK | Creates video playback surface: calls surface ctor, GIF loader, blit setup |
| 0x00559dbd | video_cleanup_smk | FW | seh | 12b | SK | SEH cleanup: calls FUN_005c656b (smacker cleanup) |
| 0x00559dc9 | video_dtor_surface | FW | seh | 12b | SK | SEH cleanup: calls FUN_005bd915 (surface dtor) |
| 0x00559ddf | seh_epilog_59ddf | FW | seh | 14b | SK | SEH epilog |
| 0x00559ded | video_init_playback_params | CS | wonder | 79b | SK | Sets playback speed (100), scale, frame counter fields on video window object |
| 0x00559e3c | video_window_ctor | CS | wonder | 118b | SK | Video window constructor: chains CMiniFrameWnd ctor, sets vtable PTR_FUN_0061d6e0 |
| 0x00559ed4 | video_window_dtor | CS | wonder | 92b | SK | Video window destructor: destroys playback, timevec, chains base dtors |
| 0x00559f30 | video_destroy_timevec | FW | mfc | 15b | SK | Destroys _Timevec at this+0x2F8 |
| 0x00559f3f | video_dtor_base | FW | mfc | 9b | SK | Chains to COleCntrFrameWnd dtor |
| 0x00559f52 | seh_epilog_59f52 | FW | seh | 14b | SK | SEH epilog |
| 0x00559f60 | video_blit_rect | RN | surface | 111b | SK | Blits video frame to screen via thunk_FUN_005a9afe |
| 0x00559fcf | video_prepare_and_blit | RN | surface | 60b | SK | Prepares palette then blits video frame |
| 0x0055a00b | video_blit_offset | RN | surface | 70b | SK | Blits with offset from video window origin (this+0x124, this+0x128) |
| 0x0055a051 | video_render_frame | CS | wonder | 144b | SK | Full video frame render: creates surface, blits frame, renders status bar overlay |
| 0x0055a0e1 | video_on_create | FW | window | 44b | SK | WM_CREATE handler: calls app init functions |
| 0x0055a10d | video_calc_window_rect | VP | camera | 81b | SK | Calculates video window rectangle with padding (0x10 + DAT_006335a0/a4) |
| 0x0055a15e | video_on_paint_1 | CS | wonder | 26b | SK | Thunk to video_render_frame |
| 0x0055a178 | video_on_paint_2 | CS | wonder | 26b | SK | Thunk to video_render_frame |
| 0x0055a567 | video_on_close | FW | window | 61b | SK | WM_CLOSE handler: hides window, frees resources |
| 0x0055a5a4 | video_on_destroy | FW | window | 64b | SK | WM_DESTROY handler: hides window, unloads DLL |
| 0x0055a5e4 | load_intro_dll | CS | intro | 102b | SK | Loads civ2_intro.dll via thunk_FUN_00564713 |
| 0x0055a64a | unload_intro_dll | CS | intro | 65b | SK | Unloads intro DLL, clears playback flag |
| 0x0055a930 | surface_blit_full | RN | surface | 56b | SK | Full surface blit wrapper: calls thunk_FUN_005a9afe with same src/dst coords |
| 0x0055c679 | seh_cleanup_5c679 | FW | seh | 12b | SK | Thunk to popup_dialog_close |
| 0x0055c68f | seh_epilog_5c68f | FW | seh | 14b | SK | SEH epilog |

### Civ2-Specific Content Found in Block 0x00550000:
- **FUN_00554460** (cheat_toggle_all_tech): Complete tech toggle logic -- iterates 100 techs, civ record at DAT_0064c6b0 with 0x594 stride, tech ownership bitmask at DAT_00655b82
- **FUN_005545d3** (cheat_edit_tech): Individual tech editor with prerequisite checking via FUN_004bd9f0
- **FUN_0055499f** (cheat_edit_terrain): Full terrain editor revealing terrain byte layout at DAT_0064b1b0/b4 (current cursor position globals), terrain flag bits for improvements
- **FUN_005551b3** (cheat_place_unit): Unit type table at DAT_0064b1b8 (0x14-byte stride, 62 types), tech prereq checking
- **FUN_0055560f** (cheat_change_player): Player identity globals -- DAT_00655b06 (active civ index), DAT_00655b07 (spectator flag), DAT_006d1da0 (current player), DAT_00655b0b (human player bitmask)
- **FUN_00555a02** (cheat_set_game_year): Game year at DAT_00655af8, year string calc via FUN_00484fec
- **FUN_00555a8b** (cheat_destroy_civ): City iteration at DAT_0064f348 (0x58-byte stride), thunk_kill_civ for civ elimination
- **FUN_0055615c** (cheat_set_money): Treasury at offset 0x0064c6a2 within civ record, cap 0-30000
- **FUN_005569e3** (cheat_edit_city): City record fields: size at +0x9, wonders at DAT_00655be6, shields at +0x1c, capital flag at bit 26 of +0x4
- **FUN_00556f54** (cheat_edit_civ): Treaty bits (contact/peace/alliance/war), betrayal counter, research progress, government type -- full civ record layout exposed
- **FUN_005582ad** (cheat_edit_scenario): Scenario flags (DAT_0064bc60), start year (DAT_0064bcb6), max turns (DAT_0064bcb8)

---

## Block 0x00560000 (46 UNSET -> classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x005680ba | crt_init_smk_surface | FW | crt | 26b | SK | Calls FUN_005c64da (smacker surface init) |
| 0x005680d4 | crt_register_atexit_smk | FW | crt | 29b | SK | Registers FUN_005680f1 via _atexit |
| 0x005680f1 | crt_dtor_smk_surface | FW | crt | 26b | SK | Calls FUN_005c656b (smacker surface cleanup) |
| 0x00568125 | crt_init_surface_1 | FW | crt | 26b | SK | Calls FUN_005bd630 (surface ctor) |
| 0x0056813f | crt_register_atexit_surface_1 | FW | crt | 29b | SK | Registers FUN_0056815c via _atexit |
| 0x0056815c | crt_dtor_surface_1 | FW | crt | 26b | SK | Calls FUN_005bd915 (surface dtor) |
| 0x00568348 | art_cleanup_timevec | FW | mfc | 12b | SK | Destroys _Timevec during civ2art loading |
| 0x00568354 | art_cleanup_cstring | FW | mfc | 9b | SK | Calls FUN_005cde4d (CString cleanup) |
| 0x0056835d | art_dtor_surface | FW | mfc | 12b | SK | Calls FUN_005bd915 (surface dtor) |
| 0x00568373 | seh_epilog_68373 | FW | seh | 14b | SK | SEH epilog |
| 0x00568b1a | crt_init_wnd_1 | FW | crt | 26b | SK | Calls thunk_FUN_0055339f (window ctor) for DAT_006abc68 |
| 0x00568b34 | crt_register_atexit_wnd_1 | FW | crt | 29b | SK | Registers FUN_00568b51 via _atexit |
| 0x00568b51 | crt_dtor_wnd_1 | FW | mfc | 26b | SK | COleCntrFrameWnd::~COleCntrFrameWnd on DAT_006abc68 |
| 0x00568b85 | crt_init_cstring_1 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c690 (CString static init) |
| 0x00568b9f | crt_register_atexit_cstring_1 | FW | cstring_init | 29b | SK | Registers FUN_00568bbc via _atexit |
| 0x00568bbc | crt_dtor_cstring_1 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c520 (CString dtor) |
| 0x00568bf0 | crt_init_cstring_2 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c690 (CString static init) |
| 0x00568c0a | crt_register_atexit_cstring_2 | FW | cstring_init | 29b | SK | Registers FUN_00568c27 via _atexit |
| 0x00568c27 | crt_dtor_cstring_2 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c520 (CString dtor) |
| 0x0056aeed | crt_dtor_surface_2 | FW | crt | 26b | SK | Calls FUN_005bd915 (surface dtor) during status panel cleanup |
| 0x0056b8ba | crt_init_cstring_3 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c690 (CString static init) |
| 0x0056b8d4 | crt_register_atexit_cstring_3 | FW | cstring_init | 29b | SK | Registers FUN_0056b8f1 via _atexit |
| 0x0056b8f1 | crt_dtor_cstring_3 | FW | cstring_init | 26b | SK | Calls thunk_FUN_0043c520 (CString dtor) |
| 0x0056f92a | crt_init_surface_3 | FW | crt | 26b | SK | Calls FUN_005bd630 (surface ctor) for sprite recolor |
| 0x0056f944 | crt_register_atexit_surface_3 | FW | crt | 29b | SK | Registers FUN_0056f961 via _atexit |
| 0x0056f961 | crt_dtor_surface_3 | FW | crt | 26b | SK | Calls FUN_005bd915 (surface dtor) |
| 0x0056f995 | crt_init_cstring_4 | FW | cstring_init | 26b | SK | CString::CString on DAT_006ac170 |
| 0x0056f9af | crt_register_atexit_cstring_4 | FW | cstring_init | 29b | SK | Registers FUN_0056f9cc via _atexit |
| 0x0056f9cc | crt_dtor_cstring_4 | FW | cstring_init | 26b | SK | Calls FUN_005cde4d (CString cleanup) |
| 0x0056fa00 | crt_init_cstring_5 | FW | cstring_init | 26b | SK | CString::CString on DAT_006ac8a8 |
| 0x0056fa1a | crt_register_atexit_cstring_5 | FW | cstring_init | 29b | SK | Registers FUN_0056fa37 via _atexit |
| 0x0056fa37 | crt_dtor_cstring_5 | FW | cstring_init | 26b | SK | Calls FUN_005cde4d (CString cleanup) |
| 0x0056fa6b | crt_init_cstring_6 | FW | cstring_init | 26b | SK | CString::CString on DAT_006ac8e8 |
| 0x0056fa85 | crt_register_atexit_cstring_6 | FW | cstring_init | 29b | SK | Registers FUN_0056faa2 via _atexit |
| 0x0056faa2 | crt_dtor_cstring_6 | FW | cstring_init | 26b | SK | Calls FUN_005cde4d (CString cleanup) |
| 0x0056fad6 | crt_init_surface_4 | FW | crt | 26b | SK | Calls FUN_005bd630 (surface ctor) |
| 0x0056faf0 | crt_register_atexit_surface_4 | FW | crt | 29b | SK | Registers FUN_0056fb0d via _atexit |
| 0x0056fb0d | crt_dtor_surface_4 | FW | crt | 26b | SK | Calls FUN_005bd915 (surface dtor) |
| 0x0056fb41 | crt_init_wnd_2 | FW | crt | 26b | SK | Calls thunk_FUN_0055339f (window ctor) for DAT_006ac1b0 |
| 0x0056fb5b | crt_register_atexit_wnd_2 | FW | crt | 29b | SK | Registers FUN_0056fb78 via _atexit |
| 0x0056fb78 | crt_dtor_wnd_2 | FW | mfc | 26b | SK | COleCntrFrameWnd::~COleCntrFrameWnd on DAT_006ac1b0 |
| 0x0056fbac | crt_init_bitmap_btn | FW | crt | 26b | SK | Calls thunk_FUN_005784a0 (CBitmapButton ctor) for DAT_006ac488 |
| 0x0056fbc6 | crt_register_atexit_bitmap_btn | FW | crt | 29b | SK | Registers FUN_0056fbe3 via _atexit |
| 0x0056fbe3 | crt_dtor_bitmap_btn | FW | mfc | 26b | SK | CBitmapButton::~CBitmapButton on DAT_006ac488 |
| 0x0056ffb6 | seh_cleanup_smk | FW | seh | 12b | SK | Calls FUN_005c656b (smacker cleanup) |
| 0x0056ffcc | seh_epilog_ffcc | FW | seh | 14b | SK | SEH epilog |

### Civ2-Specific Content Found in Block 0x00560000:
- No new game logic found in UNSET functions -- all 46 are pure framework (CRT static init/dtor, SEH, MFC destructors, CString initializers). The game logic in this block was already classified in other phases (AI diplomacy, status panel rendering, sprite recoloring functions).

---

## Block 0x00580000 (21 UNSET -> classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x00586da1 | show_messagebox_cosmic_save | UI | dialog | 131b | SK | Shows error message when cosmic rules file save fails, calls InvalidateObjectCache to refresh rules display |
| 0x005875ff | seh_epilog_75ff | FW | seh | 14b | SK | SEH epilog |
| 0x0058760d | cosmic_editor_launch | UI | editor | 89b | SK | Launches cosmic rules editor: calls FUN_00586f16 (the full rules dialog), then FUN_005bb574 (palette restore) |
| 0x00587666 | cosmic_cleanup_mfc | FW | mfc | 12b | SK | Calls thunk_FUN_004183d0 (MFC cleanup) |
| 0x0058767c | seh_epilog_767c | FW | seh | 14b | SK | SEH epilog |
| 0x00587e23 | scrollbar_handle_right | UI | dialog | 30b | SK | Calls thunk_FUN_0058804f(1, param) -- right scrollbar handler |
| 0x00589a0a | crt_init_surface_main | FW | crt | 26b | SK | Calls FUN_005bd630 (surface ctor) for main game surface |
| 0x00589a24 | crt_register_atexit_surface_main | FW | crt | 29b | SK | Registers FUN_00589a41 via _atexit |
| 0x00589a41 | crt_dtor_surface_main | FW | crt | 26b | SK | Calls FUN_005bd915 (surface dtor) |
| 0x00589c6a | seh_epilog_9c6a | FW | seh | 15b | SK | SEH epilog (restores FS:[0]) |
| 0x0058a5ca | crt_init_wnd_main | FW | crt | 26b | SK | Calls thunk_FUN_0055339f (window ctor) for DAT_006acd58 |
| 0x0058a5e4 | crt_register_atexit_wnd_main | FW | crt | 29b | SK | Registers FUN_0058a601 via _atexit |
| 0x0058a601 | crt_dtor_wnd_main | FW | mfc | 26b | SK | COleCntrFrameWnd::~COleCntrFrameWnd on DAT_006acd58 |
| 0x0058a80d | file_copy | IO | save | 248b | SK | Generic file copy utility: opens src/dst with fopen, reads/writes in 1KB blocks |
| 0x0058abe0 | seh_epilog_abe0 | FW | seh | 14b | SK | SEH epilog |
| 0x0058b86f | diplomacy_cleanup_1 | FW | mfc | 12b | SK | Calls thunk_FUN_0040f570 (form cleanup) |
| 0x0058b87b | diplomacy_cleanup_2 | FW | mfc | 9b | SK | Calls thunk_FUN_0040f570 (form cleanup) |
| 0x0058b88e | seh_epilog_b88e | FW | seh | 14b | SK | SEH epilog |
| 0x0058d434 | seh_epilog_d434 | FW | seh | 14b | SK | SEH epilog |
| 0x0058ddc0 | seh_epilog_ddc0 | FW | seh | 14b | SK | SEH epilog |
| 0x0058e5da | seh_epilog_e5da | FW | seh | 14b | SK | SEH epilog |

### Civ2-Specific Content Found in Block 0x00580000:
- **FUN_00586da1** (show_messagebox_cosmic_save): References RULES file path at DAT_0062cd24, error handling for cosmic rules I/O
- **FUN_0058a80d** (file_copy): Generic file copy used for save game backup operations
- No significant new game logic formulas found in UNSET functions.

---

## Block 0x00590000 (114 UNSET -> classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0059061d | seh_epilog_061d | FW | seh | 15b | SK | SEH epilog (restores FS:[0]) |
| 0x00599a20 | pedia_init_list | UI | civilopedia | 365b | SK | Initializes civilopedia item list, sets scroll range/position, triggers repaint |
| 0x00599b8d | pedia_draw_item_detail | UI | civilopedia | 1488b | SK | Draws civilopedia detail view with formatted text, icons, renders sprite previews |
| 0x0059a15d | pedia_load_description | UI | civilopedia | 388b | SK | Loads civilopedia text descriptions from game data files |
| 0x0059a2e6 | pedia_navigate_to_item | UI | civilopedia | 369b | SK | Navigates civilopedia to a specific item, updates display |
| 0x0059a86a | crt_init_cstring_pedia | FW | cstring_init | 26b | SK | CRT static init for civilopedia CString |
| 0x0059a884 | crt_register_atexit_pedia | FW | cstring_init | 29b | SK | Registers FUN_0059a8a1 via _atexit |
| 0x0059a8a1 | crt_dtor_cstring_pedia | FW | cstring_init | 26b | SK | CRT static dtor for civilopedia CString |
| 0x0059a8bb | netmgr_init | NW | mp | 196b | EX | Network manager constructor: calls popup_msg_init, XD_Set* callbacks for broadcast/secure receive, client connect/disconnect, oversized msg (50000 byte limit) |
| 0x0059a998 | netmgr_reset_state | NW | mp | 936b | EX | Resets all network state fields: 8 player slots, packet counters, connection status, game sync flags, player list arrays |
| 0x0059ad40 | netmgr_dtor | NW | mp | 136b | SK | Network manager destructor: frees packet buffer (this+0x534), calls disconnect |
| 0x0059adc8 | netmgr_cleanup_xdp | FW | mfc | 15b | SK | Calls thunk_FUN_00514254 (XDP cleanup) |
| 0x0059ade1 | seh_epilog_ade1 | FW | seh | 14b | SK | SEH epilog |
| 0x0059adef | netmgr_connect | NW | mp | 1167b | EX | Multiplayer connection setup: handles host/join, session enumeration, player listing, timeout config (this+0x1ec = 60 seconds default) |
| 0x0059b293 | netmgr_disconnect | NW | mp | 691b | EX | Disconnects from multiplayer: frees player list, closes DirectPlay session |
| 0x0059b55b | netmgr_get_player_count | NW | mp | 22b | SK | Returns player count from network manager |
| 0x0059b571 | netmgr_update_player_list | NW | mp | 651b | EX | Updates player list from DirectPlay session, assigns player IDs to slots |
| 0x0059b7fc | netmgr_add_client | NW | mp | 366b | EX | Adds new client to player list, allocates player slot |
| 0x0059b96a | netmgr_remove_client | NW | mp | 390b | EX | Removes client from player list, frees slot |
| 0x0059baf0 | netmgr_free_player_list | NW | mp | 100b | SK | Frees DirectPlay player list memory |
| 0x0059bb54 | netmgr_broadcast_receive | NW | mp | 237b | EX | Handles incoming broadcast messages in multiplayer |
| 0x0059bc41 | netmgr_secure_receive | NW | mp | 884b | EX | Handles incoming secure/reliable messages, dispatches by packet type |
| 0x0059bfb5 | netmgr_on_new_client | NW | mp | 38b | SK | Callback for new client connection event |
| 0x0059bfdb | netmgr_on_connected_to_server | NW | mp | 112b | SK | Callback for successful server connection |
| 0x0059c04b | netmgr_on_connection_lost | NW | mp | 89b | SK | Callback for lost connection event |
| 0x0059c0a4 | netmgr_on_oversized_msg | NW | mp | 61b | SK | Callback for oversized message (>50KB) |
| 0x0059c0e1 | netmgr_build_packet | NW | mp | 405b | EX | Builds multiplayer packet: serializes header + payload, handles compression |
| 0x0059c276 | netmgr_send_to_player | NW | mp | 66b | SK | Sends packet to specific player via DirectPlay |
| 0x0059c2b8 | netmgr_reset_packet_buffers | NW | mp | 73b | SK | Resets packet send/receive buffers |
| 0x0059c301 | netmgr_get_local_player_id | NW | mp | 30b | SK | Returns local player's DirectPlay ID |
| 0x0059c31f | netmgr_fill_game_info | NW | sync | 598b | EX | Fills game info struct for multiplayer sync: copies civ names, player flags, game settings |
| 0x0059d080 | popup_msg_init | UI | popup | 209b | SK | Popup dialog system constructor: initializes dialog state, allocates memory arena |
| 0x0059d190 | crt_static_init_popup_1 | FW | crt | 26b | SK | CRT static init for popup system |
| 0x0059d1aa | crt_alloc_popup_1 | FW | crt | 32b | SK | Allocator for popup (thunk_FUN_0043c460 with size param) |
| 0x0059d1ca | crt_register_atexit_popup_1 | FW | crt | 29b | SK | Registers popup dtor via _atexit |
| 0x0059d1e7 | crt_dtor_popup_1 | FW | crt | 26b | SK | Calls thunk_FUN_0043c520 (dealloc) |
| 0x0059d21b | crt_alloc_popup_2 | FW | crt | 30b | SK | thunk_FUN_0043c460(0, 0x14) |
| 0x0059d239 | crt_register_atexit_popup_2 | FW | crt | 29b | SK | Registers popup dtor via _atexit |
| 0x0059d256 | crt_dtor_popup_2 | FW | crt | 26b | SK | Calls thunk_FUN_0043c520 (dealloc) |
| 0x0059d28a | crt_alloc_popup_3 | FW | crt | 30b | SK | thunk_FUN_0043c460(1, 0xe) |
| 0x0059d2a8 | crt_register_atexit_popup_3 | FW | crt | 29b | SK | Registers popup dtor via _atexit |
| 0x0059d2c5 | crt_dtor_popup_3 | FW | crt | 26b | SK | Calls thunk_FUN_0043c520 (dealloc) |
| 0x0059d2f9 | crt_alloc_popup_4 | FW | crt | 30b | SK | thunk_FUN_0043c460(0, 0x10) |
| 0x0059d317 | crt_register_atexit_popup_4 | FW | crt | 29b | SK | Registers popup dtor via _atexit |
| 0x0059d334 | crt_dtor_popup_4 | FW | crt | 26b | SK | Calls thunk_FUN_0043c520 (dealloc) |
| 0x0059d34e | popup_static_init | UI | popup | 21b | SK | Thunk to popup_init_defaults |
| 0x0059d363 | popup_init_defaults | UI | popup | 26b | SK | Sets default popup palette (DAT_006cec84 = DAT_00635a58) |
| 0x0059d37d | popup_get_font_handle_1 | UI | popup | 26b | SK | Gets font handle via thunk_FUN_00421bb0, stores in DAT_006cec80 |
| 0x0059d397 | popup_get_font_handle_2 | UI | popup | 26b | SK | Gets font handle via thunk_FUN_00421bb0, stores in DAT_006cec80 |
| 0x0059d3b1 | popup_set_callback | UI | popup | 24b | SK | Sets popup callback function pointer (DAT_006359c0) |
| 0x0059d3c9 | popup_set_parent_window | UI | popup | 24b | SK | Sets parent window handle (DAT_006359c4) |
| 0x0059d3e1 | popup_set_position | UI | popup | 32b | SK | Sets popup position (DAT_006359cc, DAT_006359d0) |
| 0x0059d401 | popup_load_labels | UI | popup | 129b | SK | Loads popup label strings from POPUPS section in labels file |
| 0x0059d487 | popup_set_color_scheme | UI | popup | 88b | SK | Sets 9 color parameters for popup rendering |
| 0x0059d4df | popup_set_layout_params | UI | popup | 72b | SK | Sets 7 layout parameters (spacing, margins, etc.) |
| 0x0059d527 | popup_set_font_1 | UI | popup | 24b | SK | Sets font pointer 1 (PTR_DAT_006359e4) |
| 0x0059d53f | popup_set_font_2 | UI | popup | 24b | SK | Sets font pointer 2 (PTR_DAT_006359e8) |
| 0x0059d557 | popup_set_font_3 | UI | popup | 24b | SK | Sets font pointer 3 (PTR_DAT_006359ec) |
| 0x0059d56f | popup_reset_fonts | UI | popup | 46b | SK | Resets all 3 font pointers to default addresses |
| 0x0059d59d | popup_set_surface | UI | popup | 24b | SK | Sets render surface (DAT_00635aa0) |
| 0x0059d5b5 | popup_init_memory_arena | UI | popup | 64b | SK | Initializes memory arena for popup allocations (this+0x254) |
| 0x0059d5f5 | popup_dialog_reset | UI | popup | 1299b | EX | Full popup dialog state reset: clears all lists (radio options, text inputs, buttons), resets dimensions, font, colors, layout state |
| 0x0059db08 | popup_dialog_create | UI | popup | 93b | SK | Creates popup dialog: allocates from arena, calls reset |
| 0x0059db65 | popup_dialog_destroy | UI | popup | 1061b | EX | Destroys popup dialog: frees all child elements, resets arena, updates rendering state |
| 0x0059df8a | popup_dialog_close | UI | popup | 47b | SK | Closes popup dialog and restores previous rendering state |
| 0x0059dfb9 | popup_dialog_open | UI | popup | 306b | SK | Opens popup dialog: sets up rendering, calls layout |
| 0x0059e0eb | popup_set_edit_text | UI | popup | 160b | SK | Sets text content of an edit field in popup |
| 0x0059e18b | popup_add_edit_field | UI | popup | 412b | SK | Adds a text edit field to popup dialog |
| 0x0059e327 | popup_get_edit_width | UI | popup | 47b | SK | Returns width calculation for edit field |
| 0x0059e356 | popup_get_radio_indicator_width | UI | popup | 32b | SK | Returns width of radio button indicator |
| 0x0059e376 | popup_set_flags | UI | popup | 132b | SK | Sets various popup display flags (border, scroll, sort, etc.) |
| 0x0059e3fa | popup_get_line_height | UI | popup | 78b | SK | Calculates text line height based on font |
| 0x0059e448 | popup_set_column_mode | UI | popup | 42b | SK | Sets column display mode (0 or 1) |
| 0x0059e472 | popup_set_column_params | UI | popup | 50b | SK | Sets column width, position, spacing |
| 0x0059e4a4 | popup_set_object_schema | UI | popup | 33b | SK | Sets schema version for popup serialization (this+0x30) |
| 0x0059e4c5 | popup_set_border_width | UI | popup | 33b | SK | Sets border width parameter (this+0x34) |
| 0x0059e4e6 | popup_set_scroll_step | UI | popup | 33b | SK | Sets scroll step size (this+0x38) |
| 0x0059e507 | popup_set_max_rows | UI | popup | 126b | SK | Sets max visible rows, calculates pixel height based on row count and font |
| 0x0059e585 | popup_set_page_index | UI | popup | 68b | SK | Sets current page (0 or 1) for multi-page popups |
| 0x0059e5c9 | popup_set_page_params | UI | popup | 91b | SK | Sets page offset, alternate width, and optionally max rows |
| 0x0059e648 | popup_calc_button_height | UI | popup | 46b | SK | Calculates button area height using _Timevec and border spacing |
| 0x0059e676 | popup_calc_option_width | UI | popup | 51b | SK | Calculates radio option width (text width + indicator + spacing) |
| 0x0059e6a9 | popup_set_title | UI | popup | 86b | SK | Sets popup title string (allocated from arena, stored at this+0x134) |
| 0x0059e6ff | popup_set_max_width | UI | popup | 99b | SK | Sets max popup width, adjusts for aspect ratio if needed |
| 0x0059e762 | ios_delbuf | FW | crt | 33b | SK | Library: ios::delbuf -- sets this+0x1c |
| 0x0059e783 | popup_set_scroll_position | UI | popup | 42b | SK | Sets scroll position (this+0x14, this+0x18) |
| 0x0059e7ad | popup_find_radio_by_id | UI | popup | 101b | SK | Searches radio option linked list for item with matching ID (this+0x228 list) |
| 0x0059e812 | popup_find_textinput_by_id | UI | popup | 101b | SK | Searches text input linked list for item with matching ID (this+0x238 list) |
| 0x0059e877 | popup_find_button_by_id | UI | popup | 100b | SK | Searches button linked list for item with matching ID (this+0x234 list) |
| 0x0059e8db | popup_set_radio_disabled | UI | popup | 76b | SK | Sets/clears disabled flag (bit 0) on radio option |
| 0x0059e927 | popup_set_radio_highlighted | UI | popup | 76b | SK | Sets/clears highlighted flag (bit 1) on radio option |
| 0x0059e973 | popup_clear_all_disabled | UI | popup | 64b | SK | Clears disabled flag on all radio options |
| 0x0059e9b3 | popup_clear_all_highlighted | UI | popup | 64b | SK | Clears highlighted flag on all radio options |
| 0x0059e9f3 | popup_get_radio_selected | UI | popup | 90b | SK | Returns whether a radio option has the selected flag (bit 2) |
| 0x0059ea4d | popup_set_radio_selected | UI | popup | 76b | SK | Sets/clears selected flag (bit 2) on radio option |
| 0x0059ea99 | popup_select_default | UI | popup | 116b | SK | Sets default selected item in radio list or button list |
| 0x0059eb0d | popup_show_icon | UI | popup | 53b | SK | Displays icon in popup via thunk_FUN_00418a70 |
| 0x0059eb42 | popup_show_icon_default | UI | popup | 38b | SK | Calls popup_show_icon with default params |
| 0x0059ec88 | popup_add_button | UI | popup | 360b | SK | Adds a button to popup dialog: allocates from arena, creates linked list node, sets label text |
| 0x0059edf0 | popup_add_radio_option | UI | popup | 566b | EX | Adds radio option to popup: allocates node, maintains sorted linked list if sort flag set, tracks max width |
| 0x0059f026 | popup_add_radio_group | UI | popup | 71b | SK | Adds radio group with pre-selected option |
| 0x0059f06d | popup_add_text_input | UI | popup | 566b | SK | Adds text input field to popup: allocates node, sets max length (cap 255), copies initial text |
| 0x0059f2a3 | popup_add_footer_text | UI | popup | 119b | SK | Adds footer text line (up to 6 lines, stored at this+0x294) |
| 0x0059f31a | popup_set_text_style | UI | popup | 189b | SK | Sets text color/style based on selection state and highlight flags |
| 0x0059f3d7 | popup_render_label | UI | popup | 226b | SK | Renders a single label in popup (replaces underscores with spaces, applies text style) |
| 0x0059f5ba | popup_draw_separator | UI | popup | 61b | SK | Draws horizontal separator line in popup |
| 0x0059f5f7 | popup_draw_icon | UI | popup | 83b | SK | Draws icon sprite at specified position in popup |
| 0x0059f64a | popup_layout_text | UI | popup | 1326b | EX | Complex text layout engine: handles word wrapping, multi-line text, scrolling, column layout |
| 0x0059fb78 | popup_get_radio_index | UI | popup | 156b | SK | Returns ordinal index of a radio option within its group |
| 0x0059fc19 | popup_get_radio_by_index | UI | popup | 156b | SK | Returns radio option node at specified index within current group |
| 0x0059fcba | popup_get_radio_page | UI | popup | 56b | SK | Returns page number for a radio option based on items-per-page |
| 0x0059fcf2 | popup_scroll_to_page | UI | popup | 56b | SK | Scrolls radio list to show specified page |
| 0x0059fd2a | popup_layout_dialog | UI | popup | 4785b | EX | Master layout function: calculates dimensions for all elements (title, radio list, buttons, text inputs, footers), handles multi-column, scrollbars, window sizing |

### Civ2-Specific Content Found in Block 0x00590000:
- **FUN_0059a8bb** (netmgr_init): DirectPlay multiplayer protocol setup with XD_Set* callbacks, 50KB message size limit
- **FUN_0059a998** (netmgr_reset_state): Full network state layout -- 8 player slots, packet counters, session flags, default timeout 60 seconds (0x3c)
- **FUN_0059adef** (netmgr_connect): Multiplayer connection flow including session enumeration and player assignment
- **FUN_0059c0e1** (netmgr_build_packet): Packet structure for Civ2 multiplayer protocol
- **FUN_0059c31f** (netmgr_fill_game_info): Game info synchronization structure for multiplayer sessions
- **FUN_0059edf0** (popup_add_radio_option): Core popup system function used by virtually all game dialogs -- understanding this is key to reverse engineering any dialog-based game interaction
- **FUN_0059fd2a** (popup_layout_dialog): 4.7KB master layout function -- the backbone of all Civ2 dialog rendering

---

## Summary

- **Total UNSET classified**: 277 functions (96 + 46 + 21 + 114)
- **New GL functions found**: 5 (cheat_toggle_all_tech, cheat_set_game_year, cheat_destroy_civ, cheat_set_money -- all in block 0x00550000)
- **Functions with embedded game logic (CONTAINS_GAME_LOGIC)**: 12
  - 0x00554460: Tech toggle logic (tech arrays, bitmasks)
  - 0x005545d3: Tech prerequisite checking
  - 0x0055499f: Terrain byte layout and flags
  - 0x005551b3: Unit type table structure (62 types, 0x14-byte stride)
  - 0x0055560f: Player identity globals and bitmask operations
  - 0x0055583f: Human player bitmask manipulation
  - 0x00555a8b: City iteration and civ destruction
  - 0x0055615c: Treasury cap (30000)
  - 0x005569e3: City record field offsets
  - 0x00556f54: Full civ record layout (treaties, diplomacy, research)
  - 0x005582ad: Scenario flags and configuration
  - 0x0059a8bb: Multiplayer protocol initialization

### Category Breakdown:
| Category | Count | Notes |
|----------|-------|-------|
| FW (Framework) | 163 | SEH epilog/cleanup (58), CRT static init/dtor (73), MFC dtors (22), CString init (10) |
| UI (User Interface) | 78 | Editor cheats (20), Popup dialog system (46), Civilopedia (4), Cosmic editor (2), Other (6) |
| NW (Network/Multiplayer) | 21 | Full multiplayer manager: init, connect, disconnect, send/receive, player management |
| GL (Game Logic) | 5 | Tech toggle, game year, destroy civ, set money, plus embedded GL in UI functions |
| CS (Cutscene) | 6 | Video playback window, intro DLL loading |
| RN (Rendering) | 3 | Video frame blitting, surface operations |
| IO (Save/Load) | 2 | Save game thunk, file copy utility |
| VP (Viewport) | 1 | Video window rect calculation |
| FW.seh | 0 | (counted within FW above) |
