# Phase 1 Analysis: block_00550000.c (0x00550000 - 0x0055FFFF)

## Function Table

### Cluster: Framework / CRT Boilerplate

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00550017 | stub | FUN_00550017 | thunk_wrapper_4183d0 | void | void | Thunk to FUN_004183d0 | LOW |
| 0x0055002D | stub | FUN_0055002d | seh_epilog_002d | void | void | SEH epilog — restores FS:[0] chain | FRAMEWORK |
| 0x00551CD0 | small | FUN_00551cd0 | scalar_deleting_destructor | byte | void* | MFC scalar deleting destructor pattern (calls dtor, conditionally frees) | FRAMEWORK |
| 0x00551D20 | stub | streambuf::egptr | streambuf_egptr | this | char* | Library: streambuf::egptr() — returns `this+0x2c` | FRAMEWORK |
| 0x00551EA0 | stub | FID_conflict___E51 | crt_static_init_1 | void | void | CRT static initializer — calls init+atexit pair | FRAMEWORK |
| 0x00551EBA | stub | FUN_00551eba | crt_alloc_16 | void | void | CRT init helper: `thunk_FUN_0043c460(0, 0x10)` | FRAMEWORK |
| 0x00551ED8 | stub | FUN_00551ed8 | crt_register_atexit_1 | void | void | Registers FUN_00551ef5 via `_atexit` | FRAMEWORK |
| 0x00551EF5 | stub | FUN_00551ef5 | crt_static_dtor_1 | void | void | CRT static destructor thunk | FRAMEWORK |
| 0x00551F0F | stub | FID_conflict___E51 | crt_static_init_2 | void | void | CRT static initializer — calls init+atexit pair | FRAMEWORK |
| 0x00551F29 | stub | FUN_00551f29 | crt_alloc_10 | void | void | CRT init helper: `thunk_FUN_0043c460(0, 10)` | FRAMEWORK |
| 0x00551F47 | stub | FUN_00551f47 | crt_register_atexit_2 | void | void | Registers FUN_00551f64 via `_atexit` | FRAMEWORK |
| 0x00551F64 | stub | FUN_00551f64 | crt_static_dtor_2 | void | void | CRT static destructor thunk | FRAMEWORK |
| 0x00551F7E | stub | FID_conflict___E51 | crt_static_init_3 | void | void | CRT static initializer — calls init+atexit pair | FRAMEWORK |
| 0x00551F98 | stub | FUN_00551f98 | crt_alloc_16b | void | void | CRT init helper: `thunk_FUN_0043c460(0, 0x10)` | FRAMEWORK |
| 0x00551FB6 | stub | FUN_00551fb6 | crt_register_atexit_3 | void | void | Registers FUN_00551fd3 via `_atexit` | FRAMEWORK |
| 0x00551FD3 | stub | FUN_00551fd3 | crt_static_dtor_3 | void | void | CRT static destructor thunk | FRAMEWORK |
| 0x00559C20 | stub | FID_conflict___E31 | crt_static_init_miniframe | void | void | CRT static init for CMiniFrameWnd at DAT_006ab1b8 | FRAMEWORK |
| 0x00559C3A | stub | FUN_00559c3a | crt_init_miniframe | void | void | Thunk to FUN_00559e3c (miniframe window ctor) | FRAMEWORK |
| 0x00559C54 | stub | FUN_00559c54 | crt_register_atexit_miniframe | void | void | Registers dtor via _atexit for miniframe | FRAMEWORK |
| 0x00559C71 | stub | FUN_00559c71 | crt_dtor_miniframe | void | void | Calls CMiniFrameWnd::~CMiniFrameWnd on DAT_006ab1b8 | FRAMEWORK |
| 0x00559C8B | stub | FID_conflict___E31 | crt_static_init_surface | void | void | CRT static init for surface/render object | FRAMEWORK |
| 0x00559CA5 | stub | FUN_00559ca5 | crt_init_surface_obj | void | void | Thunk to FUN_005bd630 | FRAMEWORK |
| 0x00559CBF | stub | FUN_00559cbf | crt_register_atexit_surface | void | void | Registers FUN_00559cdc via _atexit | FRAMEWORK |
| 0x00559CDC | stub | FUN_00559cdc | crt_dtor_surface_obj | void | void | Thunk to FUN_005bd915 — surface destructor | FRAMEWORK |

### Cluster: Custom Dialog Window Framework

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00551D50 | stub | FUN_00551d50 | dlg_send_3dbf | void(this) | void | Sends message 0x3DBF via `this+0x1c` child window handle | LOW |
| 0x00551D80 | stub | FUN_00551d80 | dlg_send_3e92 | u4 | void | Sends message 0x3E92 to `this+0x1c` with param | LOW |
| 0x00551DC0 | stub | FUN_00551dc0 | dlg_set_field_30 | u4 | void | Sets `this+0x30 = param_1` | LOW |
| 0x00551DF0 | stub | FUN_00551df0 | dlg_set_field_34 | u4 | void | Sets `this+0x34 = param_1` | LOW |
| 0x00551E20 | small | FUN_00551e20 | dlg_log_normal | u4,u4,u4 | void | Logs to DAT_006359d4 (normal log channel) via thunk_FUN_00419130 | MEDIUM |
| 0x00551E60 | small | FUN_00551e60 | dlg_log_debug | u4,u4,u4 | void | Logs to s_DEBUG_006359dc via thunk_FUN_00419130 | MEDIUM |

### Cluster: Custom Dialog Window Class (Popup/Panel System)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00551FED | large | FUN_00551fed | init_dialog_metrics | void | void | Initializes dialog layout metrics. Reads screen size (DAT_006ab198/19c). Sets font sizes DAT_00633580 (16 or 24 based on 1000px threshold). Calls GetSystemMetrics(SM_CXDLGFRAME, SM_CYDLGFRAME) for border widths | HIGH |
| 0x005520FA | stub | FUN_005520fa | set_dialog_background | u4 | void | Sets DAT_0063357c = param_1 (background surface for dialogs) | MEDIUM |
| 0x00552112 | xlarge | FUN_00552112 (begin_paint) | dialog_paint_titlebar | void(this) | void | Already named `begin_paint`. Paints dialog titlebar and borders. Handles timer display (mm:ss format), multiplayer turn info. Blits button sprites at scaled positions. Renders title text with shadow (palette 0x0a shadow, 0x1a main). 3401 bytes — the largest function in this block | HIGH |
| 0x00552E5B | small | FUN_00552e5b | dialog_button_click | int | void | Dispatches button click — calls callback at `this+0x2A8` with button data from `this+0x200` array. Button index = param-1000 | MEDIUM |
| 0x00552ED2 | large | FUN_00552ed2 | dialog_create_buttons | void(this) | void | Creates up to 6 button controls for dialog. Allocates 0x40-byte button objects, registers with window system. Uses scaled sprite dimensions from `this+0x20C/0x210` arrays | MEDIUM |
| 0x0055318C | medium | FUN_0055318c | dialog_add_button | u4,u4 | void(this) | Adds a button to dialog (max 6). Stores callback (param_1) and icon data (param_2) at `this+0x200+n*0x1c` slots. Gets sprite dimensions | MEDIUM |
| 0x0055324C | small | FUN_0055324c (render_city_name) | dialog_set_title | char* | void(this) | Already named `render_city_name`. Copies string to `this+0x134` (max 0x83 chars), then calls dialog_paint_titlebar to redraw | HIGH |
| 0x005532D7 | medium | FUN_005532d7 | dialog_destroy_buttons | void(this) | void | Iterates 6 button slots, destroys non-null buttons at `this+0x218+n*0x1c` via thunk_FUN_00453aa0 | MEDIUM |
| 0x00553379 | stub | FUN_00553379 | dialog_cleanup | void | void | Destroys buttons then calls thunk_FUN_004083b0 (window cleanup) | MEDIUM |
| 0x0055339F | medium | FUN_0055339f | dialog_ctor | void(this) | this | Constructor: calls base ctor 0044c5a0, sets vtable PTR_FUN_0061d6dc, zeros 6 button slots at this+0x218 | MEDIUM |
| 0x00553444 | small | ~COleCntrFrameWnd | dialog_dtor | void(this) | void | MFC COleCntrFrameWnd destructor — sets vtable, destroys buttons, chains to base dtor | FRAMEWORK |
| 0x0055349B | stub | FUN_0055349b | dialog_base_dtor | void | void | Thunk to thunk_FUN_0044cba0 (base class dtor) | FRAMEWORK |
| 0x005534AE | stub | FUN_005534ae | seh_epilog_34ae | void | void | SEH epilog | FRAMEWORK |
| 0x005534BC | large | FUN_005534bc | dialog_create | 9 params | void(this) | Main dialog creation: sets title, palette refs (DAT_006ab1a0/190/178), style flags, dimensions. Handles centering (flag&1), sizing (flag&2/4), scroll (flag&8). Calls FUN_005bb4ae to create Win32 window | HIGH |
| 0x00553D30 | stub | FUN_00553d30 | dialog_set_callback_60 | u4 | u4 | Swaps `this+0x60` callback, returns old value | LOW |
| 0x00553D70 | stub | FUN_00553d70 | dialog_set_callback_64 | u4 | u4 | Swaps `this+0x64` callback, returns old value | LOW |

### Cluster: Scenario File Management (Cheat Menu)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00553DB0 | small | FUN_00553db0 | validate_folder_name | char* | int | Uppercases string, skips valid chars via lookup table DAT_006335f8, returns first invalid char (0=valid) | HIGH |
| 0x00553DFD | large | FUN_00553dfd | create_scenario_folder | void | u4 | Prompts "NEWFOLDER" dialog for new scenario directory name. Validates name, checks for existing dir (GetFileAttributesA), creates dir + sound subdir, saves initial scenario file. Returns 1 on success, 0 on cancel | HIGH |
| 0x00553FF6 | large | FUN_00553ff6 | toggle_cheat_mode | void | void | "REALLYCHEAT" confirmation dialog. Toggles cheat mode (DAT_00655af0 bit 0x10, DAT_00655aea bit 0x8000). Optionally creates scenario folder (bit 0x80). Calls thunk_FUN_004e4ceb to refresh | HIGH |
| 0x00554145 | large | FUN_00554145 | cheat_pick_civ | int | void | Cheat dialog: pick a civilization. Lists all active civs (DAT_00655b0a bitmask), skips barbarians if param_1==0. Calls draw_city_name for each civ. Returns selected civ index or -1 | HIGH |
| 0x00554272 | stub | FUN_00554272 | seh_cleanup_54272 | void | void | SEH cleanup: thunk_FUN_0059df8a | FRAMEWORK |
| 0x00554288 | stub | FUN_00554288 | seh_epilog_54288 | void | void | SEH epilog | FRAMEWORK |
| 0x00554297 | large | FUN_00554297 | toggle_cheat_multiplayer | void | void | Multiplayer cheat toggle. Checks password-protected players (DAT_00673d38). Shows "PASSWORDNOCHEAT1/2" if passwords exist. Toggles bit 0x8000 in DAT_00655aea. Manages turn timer save/restore (DAT_00654b70, DAT_00654c7e) | HIGH |

### Cluster: Cheat Menu — Technology Editor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00554423 | stub | FUN_00554423 | cheat_reveal_map | void | void | Picks civ then calls thunk_FUN_004c21d5 (map reveal) | HIGH |
| 0x00554460 | large | FUN_00554460 | cheat_toggle_all_tech | int | void | For civ param_1: if no tech, gives all 100 techs via FUN_004bf05b ("GAVETECH"). If has tech, clears all tech bitmask bytes and per-tech ownership bits ("TOOKTECH") | HIGH |
| 0x005545D3 | xlarge | FUN_005545d3 | cheat_edit_tech | void | void | "EDITTECH" dialog — full tech editor. Lists all 100 techs showing discovered/prerequisite status. Click toggles tech on/off. Tracks tech count. Shows prereq chain from DAT_0062768e/0062768f. Refreshes city window | HIGH |
| 0x0055493E | stub | FUN_0055493e | seh_cleanup_5493e | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00554954 | stub | FUN_00554954 | seh_epilog_54954 | void | void | SEH epilog | FRAMEWORK |
| 0x00554962 | stub | FUN_00554962 | cheat_change_govt | void | void | Picks civ then calls thunk_FUN_0055c3d3 (government change dialog) with cheat=1 | HIGH |

### Cluster: Cheat Menu — Terrain & Map Editor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055499F | xlarge | FUN_0055499f | cheat_edit_terrain | void | void | Terrain editor at cursor position (DAT_0064b1b4/b0). Shows current terrain type list from DAT_00627cc4 (terrain resource table). Allows changing terrain type (modifies tile byte 0 lo nibble). Sets improvement bits (irrigation/mining/road/railroad/fortress/pollution) via checkboxes. Handles ocean↔land body_id recalculation with neighbor adjacency | HIGH |
| 0x0055518F | stub | FUN_0055518f | seh_cleanup_5518f | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x005551A5 | stub | FUN_005551a5 | seh_epilog_551a5 | void | void | SEH epilog | FRAMEWORK |

### Cluster: Cheat Menu — Unit Placement

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005551B3 | xlarge | FUN_005551b3 | cheat_place_unit | void | void | Unit placement dialog. Lists all 62 unit types (DAT_0064b1b8) with tech prerequisite filtering. Toggle options: veteran (case 2, DAT_00633688), ignore prereqs (case 3, DAT_0063368c), show obsolete (case 4, DAT_00633690). Switch civ (case 1). Places unit via thunk_FUN_005b3d06. Sets unit flag 0x2000 if veteran toggle on | HIGH |
| 0x005555EB | stub | FUN_005555eb | seh_cleanup_555eb | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00555601 | stub | FUN_00555601 | seh_epilog_55601 | void | void | SEH epilog | FRAMEWORK |

### Cluster: Cheat Menu — Player/Observer Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055560F | large | FUN_0055560f | cheat_change_player | void | void | "Change human player" dialog. Lists 8 civs + "King of Kings" (0x62) + "Observer" (99). Sets DAT_00655b07 (god_mode), DAT_00655b06, DAT_00655b0b (human_civs_bitmask), DAT_006d1da0 (current_player). Refreshes map view | HIGH |
| 0x0055581B | stub | FUN_0055581b | seh_cleanup_5581b | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00555831 | stub | FUN_00555831 | seh_epilog_55831 | void | void | SEH epilog | FRAMEWORK |
| 0x0055583F | large | FUN_0055583f | cheat_change_human_civ | void | void | "Change human civ" dialog. Lists active civs 1-7 + "None" (99). Sets DAT_00655b0b, DAT_00655b03, DAT_00655b05, DAT_006d1da0. If "None" chosen, clears human civ. Refreshes map | HIGH |
| 0x005559DE | stub | FUN_005559de | seh_cleanup_559de | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x005559F4 | stub | FUN_005559f4 | seh_epilog_559f4 | void | void | SEH epilog | FRAMEWORK |

### Cluster: Cheat Menu — Year/Money/Unit Edit

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00555A02 | small | FUN_00555a02 | cheat_set_game_year | void | void | "GAMEYEAR" input dialog. Sets DAT_00655af8 (game turn/year), recalculates DAT_00655afa via thunk_FUN_00484fec, refreshes map and city window | HIGH |
| 0x00555A8B | large | FUN_00555a8b | cheat_destroy_civ | void | void | Destroy a civilization. Lists active civs 1-7. Deletes all cities owned by selected civ via thunk_delete_city, then calls thunk_kill_civ. Sends MP event 0x31 if multiplayer | HIGH |
| 0x00555C8D | stub | FUN_00555c8d | seh_cleanup_55c8d | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00555CA3 | stub | FUN_00555ca3 | seh_epilog_55ca3 | void | void | SEH epilog | FRAMEWORK |
| 0x00555CB1 | stub | FUN_00555cb1 | cheat_edit_unit_at_cursor | void | void | Gets unit at cursor (DAT_0064b1b4/b0) via thunk_FUN_005b2e69, opens unit info via thunk_FUN_005b47fa | MEDIUM |
| 0x00555CED | small | FUN_00555ced | get_ai_continent_goal_icon | int | u4 | Returns icon index based on AI continent goal type: 5→0x2a, 0x15→0x1d, 0→0x6a, 1→0x7a, 4→0x55, 2→0x5e, default→0x29 | MEDIUM |
| 0x00555D70 | xlarge | FUN_00555d70 | cheat_show_ai_goals | void | void | Displays AI continent goals for current player. Iterates 48 goal entries at DAT_0064cab4 (per-civ offset: +0x404). Shows x,y coords, goal type icon via get_ai_continent_goal_icon. Also displays 64 per-continent status values at DAT_0064ca32 with color-coded icons. Uses prepare_surface/end_paint pattern | HIGH |
| 0x005560C9 | small | FUN_005560c9 | cheat_reveal_map_area | void | void | Reveals all map tiles in current viewport area (DAT_0066ca90-DAT_0066caa4) with ocean (0x6a) icon via thunk_FUN_00472b0a | MEDIUM |
| 0x0055615C | large | FUN_0055615c | cheat_set_money | void | void | "MONEY" input dialog for selected civ. Clamps value 0-30000. Writes to civ[i].gold (DAT_0064c6a2 + i*0x594). Refreshes city/map | HIGH |
| 0x0055625B | xlarge | FUN_0055625b | cheat_edit_unit | void | void | "UNITEDIT" menu — comprehensive unit editor at cursor. Options: toggle veteran (flag 0x2000), reset movement, set HP ("UNITHITPOINTS"), change home city ("EDITHOMECITY"), toggle fortify (orders byte 0x02/0xFF for land units), set supply commodity ("SUPPLYSEARCH" — 16 commodities from DAT_0064b168) | HIGH |
| 0x005569BF | stub | FUN_005569bf | seh_cleanup_569bf | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x005569D5 | stub | FUN_005569d5 | seh_epilog_569d5 | void | void | SEH epilog | FRAMEWORK |

### Cluster: Cheat Menu — City & Civ Editor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005569E3 | xlarge | set_city_shields | cheat_edit_city | void | void | "CITYEDIT" menu — comprehensive city editor at cursor. Options: set size ("SETCITYSIZE"), unassign wonders, clear disorder flags (bits 0/1 in city.flags), copy improvements from another city ("COPYCITY"), set shield box ("SETCITYSHIELDS"), toggle flag 0x4000000. Uses has_building(0x0043d20a) for barracks check | HIGH |
| 0x00556F30 | stub | FUN_00556f30 | seh_cleanup_56f30 | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00556F46 | stub | FUN_00556f46 | seh_epilog_56f46 | void | void | SEH epilog | FRAMEWORK |
| 0x00556F54 | xlarge | FUN_00556f54 | cheat_edit_civ | void | void | "EDITKING" — comprehensive civ editor. 12+ menu options: edit treaties ("EDITTREATIES" — contact/ceasefire/peace/alliance/vendetta/embargo bits), set last contact turn ("LASTCONTACT"), edit attitude ("EDITATTITUDE"), edit betrayal count ("EDITBETRAY"), reset patience, reset all contacts to current turn, trigger revolution, set research progress ("EDITPROGRESS"), clear research target, rename leader/civ names ("EDITKINGNAME"), copy tech from another civ, toggle gender flag (bit 0x200) | HIGH |
| 0x00557E08 | stub | FUN_00557e08 | seh_cleanup_57e08 | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x00557E1E | stub | FUN_00557e1e | seh_epilog_57e1e | void | void | SEH epilog | FRAMEWORK |
| 0x00557E2C | xlarge | FUN_00557e2c | cheat_edit_victory | void | void | "EDITVICTORY" dialog. Shows total population (all cities) and per-civ pop. Edits victory conditions: Alpha Centauri (bit 2), retire (bit 4). Change "secondary_civ_ref" (DAT_0064bcba). Edit 4 victory objective values (DAT_0064bcb4+). Numeric input via thunk_FUN_00518ec0 | HIGH |
| 0x00558177 | stub | FUN_00558177 | seh_cleanup_58177 | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x0055818D | stub | FUN_0055818d | seh_epilog_5818d | void | void | SEH epilog | FRAMEWORK |
| 0x0055819B | large | FUN_0055819b | cheat_edit_rules | void | void | "EDITRULES" dialog. Toggles 4 game rule flags in DAT_0064bc60: bit 0x10, 0x20, 0x40, 0x8000. Looping menu until cancel | HIGH |

### Cluster: Scenario Editor Main

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005582AD | xlarge | FUN_005582ad | cheat_edit_scenario | void | void | "EDITSCEN" — master scenario editor. 12 options: set tech paradigm ("EDITPARADIGM", DAT_0064bcb2), turn increment ("EDITINCREMENT", DAT_0064bcb4), start year ("EDITSTARTYEAR", DAT_0064bcb6), max turns ("EDITMAXTURNS", DAT_0064bcb8), make all tiles unowned (hi-nibble byte5→0xF0), reclaim tiles from improvements, reveal all map (set visibility byte4=0xFF, city knowledge=size), shroud all map (recalc visibility from ownership), edit scenario name ("SCENNAME", DAT_0064bc62), toggle scenario flag (bit 0), edit victory conditions, edit rules | HIGH |
| 0x0055891D | stub | FUN_0055891d | cheat_save_game | void | void | Calls thunk_save_game(1) — quick save | HIGH |

### Cluster: Video/Intro Surface System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00559CF6 | medium | FUN_00559cf6 | video_create_surface | u4,u4 | void | Creates a video playback surface. Calls FUN_005bd630 (surface init), FUN_005c64da, FUN_005bf5e1 for palette setup (900 offset, 10 entries, 0xC0). Creates blit rect via FUN_0055a930 | MEDIUM |
| 0x00559DBD | stub | FUN_00559dbd | video_cleanup_surface | void | void | Thunk to FUN_005c656b — surface cleanup | LOW |
| 0x00559DC9 | stub | FUN_00559dc9 | video_destroy_surface | void | void | Thunk to FUN_005bd915 — surface destroy | LOW |
| 0x00559DDF | stub | FUN_00559ddf | seh_epilog_59ddf | void | void | SEH epilog | FRAMEWORK |
| 0x00559DED | small | FUN_00559ded | video_init_playback_params | void(this) | void | Initializes video playback: `this+0x2DC=100` (frame count?), `this+0x2D8=100`, `this+0x2E0=1` (playing), `this+0x2E4=0` (stopped) | MEDIUM |
| 0x00559E3C | small | FUN_00559e3c | video_window_ctor | void(this) | this | Constructor: calls dialog_ctor (0x0055339F), CObject ctor (0x004502b0). Sets vtable PTR_FUN_0061d6e0. Calls video_init_playback_params | MEDIUM |
| 0x00559ED4 | small | ~CMiniFrameWnd | video_window_dtor | void(this) | void | Destructor for video window: sets vtable, cleans up playback, destroys timevec at this+0x2F8, chains to base dtors | FRAMEWORK |
| 0x00559F30 | stub | FUN_00559f30 | video_destroy_timevec | void | void | Destroys _Timevec at `this+0x2F8` | FRAMEWORK |
| 0x00559F3F | stub | FUN_00559f3f | video_dtor_base | void | void | Chains to COleCntrFrameWnd::~COleCntrFrameWnd | FRAMEWORK |
| 0x00559F52 | stub | FUN_00559f52 | seh_epilog_59f52 | void | void | SEH epilog | FRAMEWORK |
| 0x00559F60 | small | FUN_00559f60 | video_blit_rect | int* | void(this) | Blits video frame to screen. Calculates source offset from `this+0x124/0x128` origin, calls thunk_FUN_005a9afe (blit_to_surface) | MEDIUM |
| 0x00559FCF | stub | FUN_00559fcf | video_prepare_and_blit | u4 | void | Calls prepare_surface, set text style, then video_blit_rect | MEDIUM |
| 0x0055A00B | small | FUN_0055a00b | video_set_rect_offset | 5 params | void(this) | Sets rectangle at `this+0x124/0x128` offset | LOW |
| 0x0055A051 | small | FUN_0055a051 | video_render_frame | void(this) | void | Full frame render: create buttons, create surface, set rect, prepare, paint titlebar, blit, end_paint | MEDIUM |
| 0x0055A0E1 | stub | FUN_0055a0e1 | video_post_init | void | u4 | Calls 3 init functions (0x4503d0, 0x451900, 0x484d52), returns 0 | LOW |
| 0x0055A10D | small | FUN_0055a10d | video_calc_window_rect | 5 params | void | Adjusts rect by adding 16+DAT_006335a0/a4 (border offsets) to width/height | LOW |
| 0x0055A15E | stub | FUN_0055a15e | video_on_size | void | void | Thunk to video_render_frame — window resize handler | LOW |
| 0x0055A178 | stub | FUN_0055a178 | video_on_move | void | void | Thunk to video_render_frame — window move handler | LOW |

### Cluster: Window Layout Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055A192 | large | FUN_0055a192 | calc_window_position | int,int | int | Position calculator for popup windows. 10-case switch: 0/5=origin, 1=left margin (screen-640)/8, 2=centered, 3=right margin, 4=right-aligned, 6-9=vertical analogs using screen height-480. Used by advisor/dialog placement | MEDIUM |
| 0x0055A329 | medium | FUN_0055a329 | get_popup_dimensions | int,u4 | u4 | Returns width/height for popup types 1-13. E.g. type 1: 0x178/0xe3, type 2-5: 0x247/0x101, type 6-9: 0x248/0x102, type 10-13: 0x196/0x102. param_1=0 returns width, param_1=1 returns height | MEDIUM |
| 0x0055A41D | large | FUN_0055a41d | show_popup_window | u4,u4,u4 | void(this) | Creates and shows a popup advisor/info window. Gets dimensions via get_popup_dimensions, position via calc_window_position. Calls dialog_create, sets message handlers, enables stacked tabs, shows window | MEDIUM |
| 0x0055A567 | stub | FUN_0055a567 | close_popup_window | void(this) | void | Closes popup if `this+0x2E4` is active. Calls window cleanup + refresh | LOW |
| 0x0055A5A4 | stub | FUN_0055a5a4 | close_popup_and_unload | void(this) | void | Closes popup if active, additionally calls FUN_0055a64a (unload video DLL) | LOW |
| 0x0055A5E4 | small | FUN_0055a5e4 | load_intro_dll | void(this) | void | Loads "civ2_intro_dll" resource. If found, calls CObject::Serialize (0x4502e0), sets `this+0x2E4=1` (loaded flag) | HIGH |
| 0x0055A64A | stub | FUN_0055a64a | unload_intro_dll | void(this) | void | If `this+0x2E4` is set, calls unload (0x450340) and clears flag | MEDIUM |
| 0x0055A930 | stub | FUN_0055a930 | set_blit_rect_full | 6 params | void | Wrapper for thunk_FUN_005a9afe — sets blit rect where src origin = dst origin | LOW |

### Cluster: Minimap / Trade Route Connectivity

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055A980 | large | FUN_0055a980 | build_trade_route_map | void | void | Builds trade route connectivity bitmaps. Two passes (DAT_006365e0/e4 — land/sea). For each minimap cell (DAT_006d116a × DAT_006d116c), finds valid trade tile via FUN_0055ac37, checks 4 diagonal neighbors for connectivity. Stores 4-bit direction bitmask. Uses DAT_006283d0/e0 (diagonal offsets). Sets DAT_0062d040=1 during computation | MEDIUM |
| 0x0055AC37 | medium | FUN_0055ac37 | find_trade_tile | int,int,u4*,int*,int | u4 | Searches for valid trade tile near (x,y). Tries offset 0 then 1. Returns body_id or -1. Checks tile validity (thunk_FUN_004087c0), land/sea type (thunk_FUN_005b89e4), gets body_id (thunk_FUN_005b8a81) | MEDIUM |

### Cluster: Application Entry / Singleton

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055ADD0 | small | FUN_0055add0 | app_entry_point | u4,u4 | u4 | Application entry: CreateMutexA("Civilization II Once Only") for single-instance enforcement. If already running, FindWindowA("MSWindowClass") and BringWindowToTop. Otherwise calls FUN_005dbb20 (WinMain init) then thunk_FUN_004c4280 (main game loop) | HIGH |

### Cluster: Turn Timer System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055AE80 | medium | FUN_0055ae80 | stop_turn_timer | int | void | Stops turn timer: closes city/advisor/graph windows if active player. Kills timer (FUN_005d2004), resets DAT_00633a74=0. Calls thunk_FUN_0056ac67(100,-1) to update UI. If multiplayer and param_1, sends event 0x6e | HIGH |
| 0x0055AF2E | large | FUN_0055af2e | start_turn_timer | int | void | Starts turn timer: closes windows, saves countdown value (DAT_00633a78=DAT_00654b70/1000). Repaints titlebar. Creates 500ms repeating timer (FUN_005d1f50). Sends MP event 0x6d if multiplayer | HIGH |
| 0x0055B046 | medium | FUN_0055b046 | resume_turn_timer | int | void | Resumes turn timer if DAT_00633a78>0 and DAT_0066c988!=0. Creates new 500ms timer. Sends MP event 0x6f | MEDIUM |
| 0x0055B0FB | large | FUN_0055b0fb | turn_timer_tick | void | void | Timer callback (500ms). Alternates DAT_006ab5ac flag. Decrements remaining time. Updates hourglass icon (0x6a=red≤33%, 0x7a=yellow≤66%, 0x2a=green). Flashes when critical (<30sec). Kills timer on expiry, clears DAT_0064b9bc | HIGH |
| 0x0055B2C6 | large | FUN_0055b2c6 | end_turn_prompt | void | void | Called when player clicks end turn. Stops timer, checks for pending movie (thunk_FUN_0051ea8e). If no timer (DAT_00654b70==0), just marks done. Otherwise starts timer. Sends MP event 0x6c with timer value. Clears DAT_0064b9bc if AI game | HIGH |
| 0x0055B3C8 | stub | FUN_0055b3c8 | kill_drag_timer | void | void | Kills DAT_00633a80 timer if set, clears to 0 | LOW |
| 0x0055B3FD | small | FUN_0055b3fd | restart_drag_timer | void | void | If multiplayer (DAT_00655b02>2), kills and restarts DAT_00633a80 timer with 500ms interval calling FUN_0055b5fa | MEDIUM |
| 0x0055B451 | stub | FUN_0055b451 | check_drag_timeout | void | u4 | If DAT_00633a84 (drag in progress), calls FUN_0055b5fa. Returns 0 | LOW |

### Cluster: Window Drag / Multiplayer Sync

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055B47E | medium | FUN_0055b47e | enter_window_drag | void | void | debug_log("ENTER WINDOW DRAG"). Sets drag state (DAT_00633a84=1), records start time (DAT_00633a88), saves source window (DAT_00633a90). Sends MP event 0x5d, flushes. Installs Windows hook (WH_CBT=7) for drag monitoring | HIGH |
| 0x0055B515 | small | FUN_0055b515 | exit_window_drag | void | void | debug_log("EXIT WINDOW DRAG"). Clears drag state, unhooks Windows hook (DAT_006ab5b4). Sends MP event 0x5e, flushes | HIGH |
| 0x0055B59E | small | FUN_0055b59e | cancel_window_drag | void | void | If drag in progress, posts WM_LBUTTONUP (0x202) to source window to force-cancel drag. Clears DAT_00633a84 | MEDIUM |
| 0x0055B5FA | small | FUN_0055b5fa | check_drag_timeout_mp | void | void | Multiplayer drag timeout check. If drag exceeds 620ms (0x26c) and not in AI mode (DAT_006ad685), cancels drag. Restarts timer | MEDIUM |
| 0x0055B677 | small | FUN_0055b677 | check_drag_invalidate | void | void | If drag exceeds 124ms (0x7c), sets flag 0x400 in DAT_006ad678[0xf] and invalidates cache — forces screen redraw during long drag | MEDIUM |

### Cluster: End-of-Turn / Resignation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055B6C7 | large | FUN_0055b6c7 | handle_resign | void | void | Player resignation handler. SP (version==0): palette reset + game end. MP: kills timer, saves network state, sends player info (leader/tribe/civ name) to all. If eliminated (only human player), removes from human bitmask, sends event 0x31. Otherwise calls thunk_FUN_004e1763 (normal turn end). Sets DAT_006ad685=1, stops timer, syncs network | HIGH |

### Cluster: Diplomacy — War/Peace Analysis

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055BBC0 | xlarge | FUN_0055bbc0 | calc_war_readiness | int,int | int | Calculates war readiness score for civ param_1 against param_2. If alliance exists (treaty & 8), returns 0. Iterates all cities of param_1, checks tiles in city radius for border conflict. Counts mobilizable military units (role<5, not fortified). Adds bonuses for road/railroad/fortress/airbase/city tile improvements. Returns total mobilization score (DAT_006ab5e8) | MEDIUM |
| 0x0055BEF9 | large | FUN_0055bef9 | check_can_declare_war | int,int | u4 | Checks if civ param_2 can declare war on param_1. Returns 0 if param_1 has <5 govt type (not Democracy+). Checks scenario flag. Calculates betrayal threshold from patience×15 + embassy bonus + Marco Polo bonus. Compares against govt difficulty level. Returns 1 if war declaration is valid | MEDIUM |
| 0x0055C066 | large | FUN_0055c066 | set_government_type | int,int | void | Changes government of civ param_1 to param_2. If changed and human-controlled: clears foreign embargo (treaty bit 0x10). Recalculates all city production (FUN_004eb4ed). Converts Fundamentalism production to alternatives if needed. Triggers attitude refresh | HIGH |
| 0x0055C277 | large | FUN_0055c277 | check_govt_available | u4,u4 | u4 | Checks if government type param_2 is available to civ param_1. Checks for wonder 0x13 (Statue of Liberty — grants all govts). Each govt requires specific tech: 2=Monarchy(0x36), 3=Communism(0x0f), 4=Fundamentalism(0x1f, also requires RULES flag), 5=Republic(0x47), 6=Democracy(0x15). Returns 1 if available | HIGH |
| 0x0055C3D3 | large | FUN_0055c3d3 | revolution_dialog | int,int | void | "PICKGOVT" revolution dialog. If multiplayer and AI, sends event 0x9f instead of showing UI. Lists available government types via check_govt_available. Calls set_government_type. Shows "NEWGOVT" announcement. Triggers "DEMOCRATS" tutorial if first time (bit 0x20 in DAT_00655af4) | HIGH |
| 0x0055C679 | stub | FUN_0055c679 | seh_cleanup_5c679 | void | void | SEH cleanup thunk | FRAMEWORK |
| 0x0055C68F | stub | FUN_0055c68f | seh_epilog_5c68f | void | void | SEH epilog | FRAMEWORK |

### Cluster: Government Change — AI Revolution

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055C69D | xlarge | FUN_0055c69d | ai_revolution_notification | int,uint | void | Notifies about AI civ (param_1) government change to param_2. If bit set, shows "OVERTHROWN"/"CHANGED" to human players with embassy/intelligence access. Sets AI difficulty personality counter. Sends MP events 0x2b/0x2c to all human players. Calls set_government_type at end | HIGH |
| 0x0055CBD5 | xlarge | FUN_0055cbd5 | ai_should_declare_war | int,int | u4 | AI strategic decision: should param_1 declare war on param_2? Complex multi-factor analysis: checks allied 3rd parties with higher military power, compares military scores, counts allies/enemies, checks per-continent military/city data (DAT_0064c832/c8b2/c932). Returns 0 if war not advisable, 1 if should proceed | MEDIUM |
| 0x0055D1E2 | xlarge | FUN_0055d1e2 | ai_tech_exchange | int,int | u4 | AI tech exchange between civs param_1 and param_2. Finds best unshared tech for each side (weighted by rand()%3 + tech_value via FUN_004bdb2c). If both have something to trade, exchanges via FUN_004bf05b. If one-sided and alliance+tech gap exists, demands tribute (sets treaty flag 0x40000). Checks "superior civ" condition. Returns 1 if exchange occurred | MEDIUM |

### Cluster: Diplomacy — Alliance & War Mechanics

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055D685 | large | FUN_0055d685 | check_join_war | int,int,int | u4 | Checks if civ param_2 will join war between param_1 and param_3. Requires active contact (not blocked by alliance 0x2000 or vendetta 0x08). If already vendetta with param_2, auto-joins. Checks last_contact timing. Shows "JOINWAR" message. Sets vendetta flag (0x2000) | HIGH |
| 0x0055D8D8 | xlarge | FUN_0055d8d8 | process_diplomatic_contact | int,int,u4,u4 | void | **Massive** diplomacy processor (7326 bytes). Handles first contact between any two civs. Dispatches based on: SP vs MP, human vs AI, treaty status, last contact timing. Handles multiplayer parley ("PARLEYWAITING/GOAWAY/OK/CANCEL/BUSY"). For AI: checks war advisability (ai_should_declare_war), initiates tech exchange (ai_tech_exchange), evaluates peace ("SIGNPEACE"), alliance formation ("SIGNALLIED/SIGNNATO"), war declaration ("DECLAREWAR/CANCELPEACE"), ally dragged into war ("ALLYMAKESWAR/ALLYMAKESPEACE"), UN forced peace ("UNFORCE/WALLFORCE"), and "CANCELALLIED" alliance breakup. Most complex diplomatic logic in the game | HIGH |

### Cluster: AI Government Selection

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055F5A3 | large | FUN_0055f5a3 | ai_choose_government | int,int | void | AI government selection for civ param_1. If scenario flag active with specific rule, skips. Limits max govt level (6 normally, 5 or 4 if param_2 revolution). Handles tech deficit auto-demotion (6+ tech behind→set preference -2, 8+→set -1). Finds best available government by ranking (DAT_0064ca74 + govt*2 per civ). Calls ai_revolution_notification | MEDIUM |

### Cluster: AI Military Aid / Unit Transfer

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0055F7D1 | xlarge | FUN_0055f7d1 | ai_military_aid | int | void | AI military aid: transfers units between allied civs. For civ param_1, finds ally (local_2c) with vendetta+ceasefire toward enemy (local_10). Searches for best land military unit owned by param_1 that can be gifted. Moves unit to enemy city, changes ownership. Shows "MILITARYAID1/2" messages. Sends MP events 0x51/0x52 if multiplayer. Calls pick_up_unit, reassigns owner/home_city, updates unit counts | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

- **Total functions**: 152
- **By category**:
  - **CRT/MFC Framework**: 42 (SEH epilogs, static initializers, atexit registrations, dtors)
  - **Custom Dialog Window System**: 16 (ctor/dtor/paint/buttons/create — the popup/panel framework)
  - **Cheat Menu / Scenario Editor**: 40 (tech editor, terrain editor, unit editor, city editor, civ editor, money, year, scenario options, rules)
  - **Video/Intro Surface System**: 16 (surface ctor/dtor, blit, frame render, DLL loading)
  - **Diplomacy / AI Decision Making**: 16 (war analysis, tech exchange, government change, alliance/war processing, contact handling)
  - **Turn Timer / Multiplayer Sync**: 12 (timer start/stop/tick, drag detection, end-turn flow)
  - **Window Layout**: 4 (position calculation, popup dimensions)
  - **Application Entry**: 2 (single-instance mutex, WinMain bootstrap)
  - **Trade Route Map**: 2 (connectivity bitmap computation)
  - **Misc**: 2 (save game thunk, map reveal thunk)

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0055d8d8 (`process_diplomatic_contact`)** — 7326 bytes. The core diplomacy engine that handles all civ-to-civ contact: war declarations, peace treaties, alliance formation, multiplayer parley, tribute, and ally dragging. Single most important diplomatic function.

2. **FUN_0055cbd5 (`ai_should_declare_war`)** — 1549 bytes. AI strategic war decision making. Evaluates military power ratios, alliance networks, per-continent strength, and ally reliability to determine whether war is advisable.

3. **FUN_0055c69d (`ai_revolution_notification`)** — 1336 bytes. Handles government change notifications for AI civs. Controls what human players see about AI revolutions and manages the diplomatic consequences (overthrowing vs. changing government).

4. **FUN_0055f7d1 (`ai_military_aid`)** — 2222 bytes. AI unit transfer mechanic where allied civs gift military units to defend against shared enemies. Handles unit ownership changes, city reassignment, and per-civ unit count updates.

5. **FUN_0055bbc0 (`calc_war_readiness`)** — 820 bytes. Calculates a civ's military readiness score by examining border cities, mobilizable units, and tile improvements. Key input to war/peace decisions.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|---------|
| DAT_00633580 | dialog_font_size | Set to 0x10 or 0x18 based on screen width >999px threshold |
| DAT_00633584 | high_res_flag | `(uint)(999 < DAT_006ab198)` — boolean for large screen mode |
| DAT_0063358c | button_spacing | Added to button width for inter-button gap in dialog layout |
| DAT_00633588 | dialog_border_width | Used as border inset in dialog painting |
| DAT_00633590 | dialog_bg_style_1 | Passed to paint as background palette reference |
| DAT_00633594 | dialog_bg_style_2 | Alternate background palette reference |
| DAT_00633598 | dialog_header_width | Computed: `font_height + 2*border + 2*spacing` |
| DAT_0063359c | dialog_content_start | Computed: `2*border + 2*spacing` — y-offset for first button |
| DAT_006335a0 | dialog_frame_width_2x | `GetSystemMetrics(SM_CXDLGFRAME) * 2` |
| DAT_006335a4 | dialog_frame_height_2x | `GetSystemMetrics(SM_CYDLGFRAME) * 2` |
| DAT_0063357c | dialog_bg_surface | Background rendering surface pointer |
| DAT_00633678 | terrain_editor_body_id | Terrain editor: saved body_id for land/sea toggling |
| DAT_0063367c | last_player_for_unit_editor | Tracks last DAT_006d1da0 value for unit placement civ selection |
| DAT_00633680 | unit_editor_selected_civ | Currently selected civ in unit placement dialog |
| DAT_00633684 | unit_editor_selected_type | Last selected unit type in unit placement dialog |
| DAT_00633688 | unit_editor_veteran_flag | Toggle: place units as veteran (cheat) |
| DAT_0063368c | unit_editor_ignore_prereqs | Toggle: ignore tech prerequisites for unit placement |
| DAT_00633690 | unit_editor_show_obsolete | Toggle: show obsolete units in placement list |
| DAT_00633a74 | turn_timer_handle | Windows timer ID for turn timer |
| DAT_00633a78 | turn_timer_remaining | Remaining seconds on turn timer |
| DAT_00633a80 | drag_timer_handle | Windows timer ID for drag timeout detection |
| DAT_00633a84 | drag_in_progress | Boolean: window drag is active |
| DAT_00633a88 | drag_start_time | Tick count when drag started |
| DAT_00633a90 | drag_source_window | HWND of window being dragged |
| DAT_006ab5ac | timer_blink_toggle | Alternates 0/1 each 500ms tick for hourglass blinking |
| DAT_006ab5b4 | drag_hook_handle | SetWindowsHookExA return value for CBT hook |
| DAT_006ab5e0 | war_unit_count | Total mobilizable units found in war readiness calc |
| DAT_006ab5e4 | war_last_city | Last city index checked in war readiness |
| DAT_006ab5e8 | war_readiness_score | Computed war readiness score (returned by calc_war_readiness) |
| DAT_006ab5ec | war_veteran_count | Count of already-fortified units in war readiness calc |
| DAT_00633ac8 | war_city_count | Number of distinct border cities in war readiness |
| DAT_0062d040 | trade_route_computing | Flag=1 while build_trade_route_map is running |
| DAT_006365e0 | trade_route_bitmap_land | Pointer to land trade route connectivity bitmap |
| DAT_006365e4 | trade_route_bitmap_sea | Pointer to sea trade route connectivity bitmap |
| DAT_00654b70 | turn_timer_total_ms | Total turn timer value in milliseconds |
| DAT_00654c7e | turn_timer_saved_ms | Saved timer value before cheat mode disable |
| DAT_00654fa8 | ai_autoplay_flag | Nonzero when game is in AI autoplay mode |
| DAT_00654faa | mp_turn_display_value | Multiplayer turn number for titlebar display |
| DAT_00655b91 | gender_flag | Used in war/peace messages for gendered text selection |
| DAT_00655c22 | civ_power_rank | Per-civ (8 entries) power ranking byte array. Value 7 = superpower threshold |
| DAT_00655c31 | strongest_civ_id | Civ ID of the globally strongest civilization |
| DAT_00673d38 | mp_password_flags | Per-player (8 entries) multiplayer password set flags |
| DAT_006c91e4 | parley_cancel_flag | Set when multiplayer parley is cancelled by remote player |
| DAT_0067a8c0 | parley_target_civ | Civ ID of current parley target (-1 = none) |
| DAT_00626a2c | diplomacy_in_progress | Flag: diplomatic negotiation is currently active |
| DAT_0063f278 | parley_response_code | Multiplayer parley response: -1=timeout, 0=refused, 1=accepted |
