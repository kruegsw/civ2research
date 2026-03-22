# Block 00550000 -- Phase 7 Audit

**Functions in this block: 152**
**System: Cheat/scenario editor UI dialogs, custom dialog framework (CMiniFrameWnd), C++ runtime stubs, government/revolution logic, diplomacy AI (alliance evaluation, war declaration, peace negotiation, military aid, third-party join-war), turn timer UI, map connectivity computation, game startup**

---

## FW -- Framework / C++ Runtime (44 functions)

FUN_00550017 | 12B | N/A (thunk to FUN_004183d0 -- CRT destructor)
FUN_0055002d | 14B | N/A (SEH epilog -- restores FS:[0] exception chain)
FUN_00551cd0 | 57B | N/A (C++ destructor thunk -- calls FUN_004fa569 + conditional operator_delete)
egptr | 28B | N/A (Library: streambuf::egptr -- returns buffer pointer at this+0x2c)
FUN_00551d50 | 37B | N/A (sends network message 3DBF with member at ECX+0x1c)
FUN_00551d80 | 43B | N/A (sends network message 3E92 with member at ECX+0x1c)
FUN_00551dc0 | 33B | N/A (setter: stores param_1 at ECX+0x30)
FUN_00551df0 | 33B | N/A (setter: stores param_1 at ECX+0x34)
FUN_00551e20 | 41B | N/A (delegates to FUN_00419130 with global DAT_006359d4)
FUN_00551e60 | 41B | N/A (delegates to FUN_00419130 with DEBUG string)
FID_conflict:_$E51 @551EA0 | 26B | N/A (Library: static initializer $E51 -- calls FUN_00551eba + FUN_00551ed8)
FUN_00551eba | 30B | N/A (CRT static init -- calls FUN_0043c460 with size 0x10)
FUN_00551ed8 | 29B | N/A (registers atexit handler FUN_00551ef5)
FUN_00551ef5 | 26B | N/A (CRT static destructor -- calls FUN_0043c520)
FID_conflict:_$E51 @551F0F | 26B | N/A (Library: static initializer $E51 -- calls FUN_00551f29 + FUN_00551f47)
FUN_00551f29 | 30B | N/A (CRT static init -- calls FUN_0043c460 with size 10)
FUN_00551f47 | 29B | N/A (registers atexit handler FUN_00551f64)
FUN_00551f64 | 26B | N/A (CRT static destructor -- calls FUN_0043c520)
FID_conflict:_$E51 @551F7E | 26B | N/A (Library: static initializer $E51 -- calls FUN_00551f98 + FUN_00551fb6)
FUN_00551f98 | 30B | N/A (CRT static init -- calls FUN_0043c460 with size 0x10)
FUN_00551fb6 | 29B | N/A (registers atexit handler FUN_00551fd3)
FUN_00551fd3 | 26B | N/A (CRT static destructor -- calls FUN_0043c520)
FUN_0055349b | 9B | N/A (thunk to FUN_0044cba0 -- CFrameWnd cleanup)
FUN_005534ae | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_00554272 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00554288 | 15B | N/A (SEH epilog -- restores FS:[0])
FUN_0055493e | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00554954 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_0055518f | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_005551a5 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_005555eb | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00555601 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_0055581b | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00555831 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_005559de | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_005559f4 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_00555c8d | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00555ca3 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_005569bf | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_005569d5 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_00556f30 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00556f46 | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_00557e08 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00557e1e | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_0055c679 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_0055c68f | 14B | N/A (SEH epilog -- restores FS:[0])

---

## FW -- Framework / C++ Runtime: MiniFrameWnd Stubs (16 functions)

FUN_00558177 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_0055818d | 14B | N/A (SEH epilog -- restores FS:[0])
FID_conflict:_$E31 @559C20 | 26B | N/A (Library: static initializer -- calls FUN_00559c3a + FUN_00559c54)
FUN_00559c3a | 26B | N/A (calls thunk_FUN_00559e3c -- CMiniFrameWnd constructor)
FUN_00559c54 | 29B | N/A (registers atexit handler FUN_00559c71)
FUN_00559c71 | 26B | N/A (atexit: calls ~CMiniFrameWnd on global DAT_006ab1b8)
FID_conflict:_$E31 @559C8B | 26B | N/A (Library: static initializer -- calls FUN_00559ca5 + FUN_00559cbf)
FUN_00559ca5 | 26B | N/A (calls FUN_005bd630 -- display init)
FUN_00559cbf | 29B | N/A (registers atexit handler FUN_00559cdc)
FUN_00559cdc | 26B | N/A (atexit: calls FUN_005bd915 -- display cleanup)
FUN_00559dbd | 12B | N/A (calls FUN_005c656b -- bitmap cleanup)
FUN_00559dc9 | 12B | N/A (calls FUN_005bd915 -- display cleanup)
FUN_00559ddf | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_00559f30 | 15B | N/A (calls ~_Timevec on obj+0x2f8 -- timer cleanup in CMiniFrameWnd dtor)
FUN_00559f3f | 9B | N/A (calls ~COleCntrFrameWnd -- base class destructor)
FUN_00559f52 | 14B | N/A (SEH epilog -- restores FS:[0])

---

## FW -- Framework: Custom Dialog Framework (9 functions)

FUN_00551fed | 269B | N/A (dialog_init_metrics -- gets screen dimensions from DAT_006ab180, sets dialog size DAT_00633580=16 or 24 based on 1000px threshold, computes frame metrics via GetSystemMetrics(7/8))
FUN_005520fa | 24B | N/A (dialog_set_dc -- stores param_1 into global DAT_0063357c device context)
FUN_0055339f | 146B | N/A (COleCntrFrameWnd::constructor -- calls FUN_0044c5a0, sets vtable PTR_FUN_0061d6dc, initializes 6 button slots to 0)
~COleCntrFrameWnd | 87B | N/A (Library: ~COleCntrFrameWnd destructor -- sets vtable, calls FUN_005532d7 button cleanup + FUN_004083b0 base dtor)
FUN_005532d7 | 162B | N/A (dialog_destroy_buttons -- iterates 6 button slots at ECX+0x218, calls FUN_00453aa0 DestroyWindow on each, nullifies pointers)
FUN_00553379 | 38B | N/A (dialog_cleanup -- calls FUN_005532d7 + FUN_004083b0 base cleanup)
FUN_00559e3c | 118B | N/A (CMiniFrameWnd::constructor -- calls FUN_0055339f base, FUN_004502b0 sound init, sets vtable PTR_FUN_0061d6e0, calls FUN_00559ded to init zoom)
~CMiniFrameWnd | 92B | N/A (Library: ~CMiniFrameWnd destructor -- sets vtable, calls FUN_00559ded zoom reset, ~_Timevec, ~COleCntrFrameWnd)
FUN_00559ded | 79B | N/A (dialog_init_zoom -- sets zoom=100, scale=100, step=1, smooth=0 at ECX+0x2d8..0x2e4)

---

## UI -- User Interface: Custom Dialog Rendering/Interaction (13 functions)

FUN_00552112 | 3401B | N/A (dialog_paint -- master paint handler for custom dialogs; draws border corners, title bar text with shadow, button icons, timer display with MM:SS formatting, player name, draws war/peace status text from GAME.TXT string tables)
FUN_00552e5b | 119B | N/A (dialog_on_button_click -- dispatches button click to callback at obj+0x2a8 with button parameter)
FUN_00552ed2 | 675B | N/A (dialog_create_buttons -- creates up to 6 button objects from button definition array at obj+0x200; allocates CWnd objects, positions them, registers click handler)
FUN_0055318c | 192B | N/A (dialog_add_button -- appends button definition to dialog; stores callback/name/size in button array at obj+0x200, max 6 buttons)
FUN_0055324c | 139B | N/A (dialog_set_title -- copies title string to obj+0x134, repaints via FUN_00552112, invalidates rect)
FUN_005534bc | 588B | N/A (dialog_create -- master dialog creation; sets title, colors, fonts, flags, size; handles centered positioning, creates window via FUN_005bb4ae, sets click/paint handlers, calls dialog_create_buttons)
FUN_00553d30 | 45B | N/A (dialog_set_click_handler -- swaps click handler at obj+0x60, returns old handler)
FUN_00553d70 | 45B | N/A (dialog_set_paint_handler -- swaps paint handler at obj+100, returns old handler)
FUN_00559f60 | 111B | N/A (miniframe_draw_content -- draws content region offset by obj+0x124/0x128 into DAT_006ab4b8 bitmap)
FUN_00559fcf | 60B | N/A (miniframe_draw_handler -- calls FUN_005a9780 + FUN_005baeb0 + FUN_00559f60 for display update)
FUN_0055a00b | 70B | N/A (miniframe_set_rect -- sets rect at param_1 with offset from obj+0x124/0x128)
FUN_0055a051 | 144B | N/A (miniframe_full_repaint -- calls dialog_create_buttons, renders bitmap, updates content, calls dialog_paint)
FUN_0055a0e1 | 44B | N/A (miniframe_on_create -- calls FUN_004503d0/FUN_00451900/FUN_00484d52 for window init)

---

## UI -- User Interface: MiniFrame Positioning/DLL (7 functions)

FUN_0055a10d | 81B | N/A (miniframe_inflate_rect -- adds 0x10+DAT_006335a0/a4 padding to rect dimensions)
FUN_0055a15e | 26B | N/A (thunk: calls miniframe_full_repaint FUN_0055a051)
FUN_0055a178 | 26B | N/A (thunk: calls miniframe_full_repaint FUN_0055a051)
FUN_0055a192 | 352B | N/A (dialog_calc_position -- computes X/Y position from position code 0-9; 0/5=0, 1=left margin, 2=center, 3=right margin, 4=right edge, 6-9=same for Y axis using screen height)
FUN_0055a329 | 186B | N/A (dialog_calc_size -- returns default dialog width/height for position type 1-13; type 1: 0x178/0xe3, types 2-5: 0x247/0x101, types 6-9: 0x248/0x102, types 10-13: 0x196/0x102, default: 100)
FUN_0055a41d | 330B | N/A (miniframe_show_at -- creates miniframe at calculated position using FUN_0055a192+FUN_0055a329, inflates rect, calls dialog_create, sets handlers, enables stacked tabs)
FUN_0055a5e4 | 102B | N/A (miniframe_load_intro_dll -- loads "civ2_intro.dll" via FUN_00564713, initializes sound resource, sets enabled flag at ECX+0x2e4)

---

## UI -- User Interface: Dialog Close/Visibility (3 functions)

FUN_0055a567 | 61B | N/A (miniframe_close_if_enabled -- if obj+0x2e4!=0: destroys window, calls cleanup)
FUN_0055a5a4 | 64B | N/A (miniframe_close_with_unload -- if obj+0x2e4!=0: destroys window, calls FUN_0055a64a to unload DLL)
FUN_0055a64a | 65B | N/A (miniframe_unload_dll -- if obj+0x2e4!=0: calls FUN_00450340 unload, clears enabled flag)

---

## UI -- User Interface: Cheat Menu / Scenario Editor (18 functions)

FUN_00553db0 | 77B | N/A (validate_scenario_name -- converts to uppercase, skips chars in valid-name table at DAT_006335f8, returns first invalid char or 0 if valid)
FUN_00553dfd | 505B | N/A (cheat_create_scenario_folder -- prompts for new scenario folder name, validates chars, checks for existing directory via GetFileAttributesA, creates SCENARIO/<name> and SOUND subdirs, saves initial scenario file)
FUN_00553ff6 | 335B | N/A (cheat_toggle_scenario_mode -- toggles scenario/cheat mode flags DAT_00655aea bit 0x8000 and DAT_00655af0 bit 0x10/0x80; prompts REALLYCHEAT confirmation, creates scenario folder, calls FUN_004e4ceb to refresh)
FUN_00554145 | 301B | N/A (cheat_pick_player_dialog -- shows player selection list with CSocket UI; iterates 8 players, shows names for active civs; returns selected player index or -1)
FUN_00554297 | 396B | N/A (cheat_toggle_cheat_mode -- toggles cheat mode flag DAT_00655aea^0x8000; checks password protection via DAT_00673d38 human player array; handles timer save/restore for timed games; calls FUN_004e4ceb refresh)
FUN_00554423 | 61B | N/A (cheat_view_unit -- picks player via FUN_00554145, calls FUN_004c21d5 to show unit list)
FUN_00554460 | 371B | N/A (cheat_toggle_all_techs -- toggles all 100 techs on/off for a player; if off: grants all via FUN_004bf05b; if on: clears tech bytes and bit arrays; shows GAVETECH/TOOKTECH message; calls citywin_9429 refresh)
FUN_005545d3 | 870B | N/A (cheat_edit_tech_dialog -- shows EDITTECH scrollable list of all 100 techs for selected player; clicking toggles individual techs on/off via FUN_004bf05b/FUN_005ae3bf; tracks tech count; calls citywin_9429)
FUN_00554962 | 61B | N/A (cheat_change_govt -- picks player via FUN_00554145, calls FUN_0055c3d3 to show PICKGOVT dialog)
FUN_0055499f | 2032B | N/A (cheat_edit_terrain -- terrain editor; picks terrain type from list at cursor, modifies tile bytes (terrain type, improvements, river), handles irrigation/mining/road/fortress/railroad/airbase checkboxes via FUN_0051d7d6/0051d817; updates visibility; handles ocean-specific terrain specials dialog)
FUN_005551b3 | 1059B | N/A (cheat_place_improvement -- shows filtered list of 62 improvements; places selected improvement on map tile via FUN_005b3d06; supports vet flag bit 0x2000; filters by prereq tech/availability; has change-player and toggle checkboxes)
FUN_0055560f | 524B | N/A (cheat_change_active_player -- shows 8 civs + barbarians + observer options; sets DAT_00655b06/b07 active player; updates DAT_006d1da0 current player; calls FUN_00413476 + FUN_0047cf9e for view refresh)
FUN_0055583f | 415B | N/A (cheat_set_human -- shows 7 AI civs + "none" option; sets selected civ as human-controlled via DAT_00655b0b bitmask; calls FUN_0047cf9e + FUN_004897fa for state update)
FUN_00555a02 | 137B | N/A (cheat_set_game_year -- prompts for new game year via GAMEYEAR input dialog; sets DAT_00655af8, recalculates turn number via FUN_00484fec; calls FUN_0056a65e + citywin_9429 refresh)
FUN_00555a8b | 514B | N/A (cheat_destroy_civ -- picks player from civ list, clears from DAT_00655b0b active bitmask, sends MP message 0x31, iterates cities calling delete_city, calls kill_civ)
FUN_00555cb1 | 60B | N/A (cheat_reveal_unit -- gets unit at cursor via FUN_005b2e69, calls FUN_005b47fa to show unit info)
FUN_00555ced | 131B | N/A (cheat_terrain_icon_map -- maps terrain type to sprite index; 5->0x2a, 0x15->0x1d, 0->0x6a, 1->0x7a, 4->0x55, 2->0x5e, default->0x29)
FUN_00555d70 | 857B | N/A (cheat_show_trade_overlay -- iterates 48 trade routes for current/observer player, draws trade route sprites via FUN_00472b0a; then iterates 64 commodity slots drawing resource icons with FUN_0055ced mapping)

---

## UI -- User Interface: City/Unit/King Editor Dialogs (6 functions)

FUN_005560c9 | 147B | N/A (cheat_paint_terrain_grid -- iterates visible map area DAT_0066ca90..94, draws terrain type 0x6a sprites via FUN_005b8c42 + FUN_00472b0a)
FUN_0055615c | 255B | N/A (cheat_edit_treasury -- picks player, prompts for new gold value via MONEY dialog; clamps to 0-30000; sets DAT_0064c6a2[civ*0x594]; calls citywin_9429 + FUN_0056a65e refresh)
FUN_0055625b | 1892B | N/A (cheat_edit_unit -- master unit editor; selects unit at cursor, shows UNITEDIT dialog with options: toggle vet flag 0x2000, reset moves to 0, edit hit points via UNITHITPOINTS, change home city via EDITHOMECITY list, toggle special cargo byte, change supply resource from 16 options via SUPPLYSEARCH)
set_city_shields | 1357B | N/A (cheat_edit_city -- finds city at cursor, shows CITYEDIT dialog; options: set city size via SETCITYSIZE, clear all wonders from city, clear disorder bits, copy buildings from another city via COPYCITY, set shields via SETCITYSHIELDS, toggle bit 0x4000000)
FUN_00556f54 | 3764B | N/A (cheat_edit_king -- picks player, shows EDITKING dialog with 12+ options: edit treaties via EDITTREATIES with 7 checkboxes for flag bits 1/2/4/8/0x2000/0x10/0x80; edit last contact year; edit attitude; edit betrayal counter; reset civil disorder; reset all contact years to current turn; display city dialog; edit research progress; reset researching tech; display current govt/tech; edit king/queen/suffix names via EDITKINGNAME with copy to DAT_0064bcfa+0xf2 arrays; copy techs from another player)
FUN_00557e2c | 843B | N/A (cheat_edit_victory -- shows EDITVICTORY dialog; displays total/player global population counts; toggles DAT_0064bc60 flag bits 2 (spaceship) and 4 (domination); allows changing victory civ via player select; edits victory conditions DAT_0064bcbc..c2 via EDITVICTORYOBJ)

---

## UI -- User Interface: Scenario Parameters + Rules Editor (3 functions)

FUN_0055819b | 274B | N/A (cheat_edit_rules -- shows EDITRULES dialog; toggles DAT_0064bc60 flag bits 0x10, 0x20, 0x40, 0x8000 for scenario rule options: reveal map, no combat, custom tech tree, no production penalty)
FUN_005582ad | 1648B | N/A (cheat_edit_scenario -- master scenario editor; shows EDITSCEN dialog with 12+ options: edit tech paradigm/increment/start year/max turns; strip/add fog of war on all tiles; set shared visibility on all tiles+cities; strip shared visibility; edit scenario name; toggle flat earth; sub-dialogs for EDITVICTORY and EDITRULES)
FUN_0055891d | 26B | N/A (cheat_save -- calls thunk_save_game(1) to save current game)

---

## UI -- User Interface: Bitmap Render Helper (2 functions)

FUN_00559cf6 | 199B | N/A (miniframe_render_bitmap -- initializes display subsystem via FUN_005bd630 + FUN_005c64da, renders bitmap at specified dimensions, blits to DAT_006ab4b8, cleans up)
FUN_0055a930 | 56B | N/A (miniframe_blit_rect -- calls FUN_005a9afe with duplicated source=dest coordinates for simple blit)

---

## UI -- User Interface: Turn Timer (8 functions)

FUN_0055ae80 | 174B | N/A (timer_stop -- closes city/advisor/wonder/score windows if active player; kills timer DAT_00633a74 via FUN_005d2004; calls FUN_0056ac67 to reset timer display; sends MP message 0x6e if multiplayer)
FUN_0055af2e | 280B | N/A (timer_start -- closes windows, saves DAT_00654b70/1000 as countdown; starts 500ms repeating timer via FUN_005d1f50; paints timer display; sends MP message 0x6d)
FUN_0055b046 | 181B | N/A (timer_resume -- closes windows; if countdown active and DAT_0066c988 set: restarts 500ms timer; sends MP message 0x6f)
FUN_0055b0fb | 459B | N/A (timer_tick -- toggles blink counter DAT_006ab5ac; decrements countdown DAT_00633a78; when expired: closes windows, clears turn control; computes percentage, selects timer icon 0x6a/<33%, 0x7a/33-66%, 0x2a/>66%; calls FUN_0056ac67 to update display; restarts 500ms timer)
FUN_0055b2c6 | 258B | N/A (timer_end_turn -- stops timer via FUN_0055ae80; processes async key ESC; decides pause vs countdown mode based on DAT_00654b70; sends MP message 0x6c with time limit)
FUN_0055b3c8 | 53B | N/A (timer_kill_drag -- kills drag timer DAT_00633a80 if active)
FUN_0055b3fd | 84B | N/A (timer_start_drag -- if MP (DAT_00655b02>2): kills existing drag timer, starts new 500ms timer calling FUN_0055b5fa)
FUN_0055b451 | 45B | N/A (timer_check_drag -- if DAT_00633a84 is set, calls FUN_0055b5fa immediately)

---

## UI -- User Interface: Window Drag Handling (4 functions)

FUN_0055b47e | 151B | N/A (drag_enter -- logs "ENTER_WINDOW_DRAG", sets drag-active flag DAT_00633a84=1, records timestamp, saves window handle, sends MP message 0x5d, installs Windows hook via SetWindowsHookExA type 7)
FUN_0055b515 | 137B | N/A (drag_exit -- logs "EXIT_WINDOW_DRAG", clears drag flags, unhooks via UnhookWindowsHookEx, sends MP message 0x5e)
FUN_0055b59e | 92B | N/A (drag_force_release -- if drag active: posts WM_LBUTTONUP (0x202) to main window, clears drag flag)
FUN_0055b5fa | 120B | N/A (drag_timeout_check -- if MP, not in network sync, drag active, and elapsed > 0x26c ms: forces release via FUN_0055b59e; restarts drag timer)

---

## UI -- User Interface: Resignation/Multiplayer End (2 functions)

FUN_0055b677 | 80B | N/A (drag_idle_check -- if drag active and elapsed > 0x7c ms: sets flag bit 0x400 on DAT_006ad678[0xf], invalidates cache)
FUN_0055b6c7 | 586B | N/A (player_resign -- handles player resignation; single-player: calls FUN_0046e6a9 game-over; multiplayer: kills timer, shows JOINGAME stats, checks last-human-standing, clears active player from DAT_00655b0b, sends network messages 0xa2 + flush)

---

## UI -- User Interface: Application Entry (1 function)

FUN_0055add0 | 140B | N/A (winmain_entry -- creates named mutex "Civilization II Once Only" to prevent duplicate instances; if already running: finds+activates existing window via FindWindowA; otherwise calls FUN_005dbb20 app init + FUN_004c4280 main loop)

---

## GL -- Game Logic: Map Connectivity (2 functions)

FUN_0055a980 | 695B | N/A (build_trade_connectivity_map -- computes inter-tile connectivity bitmap for land/sea trade routes; iterates DAT_006d116a*DAT_006d116c grid, for each cell finds valid terrain via FUN_0055ac37, checks 4 cardinal neighbors for pathfinding cost via FUN_004ad0d1 with max 5; sets directional bits in two connectivity arrays DAT_006365e0/e4 for land/sea)
FUN_0055ac37 | 180B | N/A (find_valid_terrain_at -- scans up to 2 adjacent tiles from (param_1,param_2) to find a valid terrain matching land/sea type param_5; returns terrain feature code via FUN_005b8a81 or -1 if not found)

**JS engine status:** No direct JS counterpart. The trade connectivity map is not implemented in the JS engine. This is a map-level pathfinding optimization for computing trade route viability between tiles.

---

## GL -- Game Logic: Government Prerequisite Check (1 function)

FUN_0055c277 | 323B | check_govt_available -- checks if a player can use a specific government type based on tech prerequisites; Statue of Liberty (wonder 0x13) bypasses all requirements.

| Govt Index | Required Tech (binary) | JS Tech |
|------------|----------------------|---------|
| 2 (Monarchy) | 0x36 = 54 | 54 |
| 3 (Communism) | 0x0f = 15 | 15 |
| 4 (Fundamentalism) | 0x1f = 31 | 31 |
| 5 (Republic) | 0x47 = 71 | 71 |
| 6 (Democracy) | 0x15 = 21 | 21 |

**JS:** `canUseGovernment()` in `engine/ai/econai.js:124-141`.
**Status: MATCH.** Tech prerequisites and Statue of Liberty bypass are identical. The binary also checks `DAT_00627879` (fundamentalism flag from rules.txt) which gates govt index 4 -- JS does not check this rules flag.

**DISCREPANCY:** Binary checks `DAT_00627879` for Fundamentalism availability (line 4976). If this flag is 0, Fundamentalism is never available regardless of tech. JS does not check this rules.txt flag. Low severity -- Fundamentalism is always enabled in standard rules.

---

## GL -- Game Logic: Set Government Type (1 function)

FUN_0055c066 | 529B | set_government_type -- sets government for a civ; clears vendetta flag (0x10) from all other civs' treaty flags; clears DAT_00655aee bit 4; iterates cities calling FUN_004eb4ed for production validation; if leaving Democracy (govt=4), switches any city building item with build order 0x08 to 0x0b; if active human civ with positive govt index and not AI-observed: calls FUN_0040ddc6 for advisor notification.

**JS:** `applyGovernmentChangeEffects()` in `engine/diplomacy.js:2757-2812`.
**Status: PARTIAL MATCH.**

**DISCREPANCY 1:** Binary clears vendetta flag (0x10) from treaty pairs for ALL other civs when government changes (line 4918: `treatyFlags[other*0x594+civ*4] &= ~0x10`). JS only clears EMBASSY (0x80). Binary clears VENDETTA, JS clears EMBASSY -- different flags.

**DISCREPANCY 2:** Binary clears `DAT_00655aee` bit 4 (global happy recalc flag) on any government change. JS does not do this.

**DISCREPANCY 3:** Binary iterates all cities and calls `FUN_004eb4ed(city, 1)` for production validation, then checks if leaving Democracy (govt==4) to switch Fanatics (build 0x08) to Riflemen (0x0b). JS checks for Fundamentalism exit instead of Democracy exit, and uses unit ID 8 (Fanatics) -> 11 (Riflemen). The binary checks `(&DAT_0064f379)[city*0x58] == 8` and switches to `0x0b`. **The JS appears to implement leaving Fundamentalism correctly** (Fanatics are only buildable under Fundamentalism), while the binary checks `param_1 * 0x594` government index 4 which is Fundamentalism (0-indexed: anarchy=0, despotism=1, monarchy=2, communism=3, fundamentalism=4, republic=5, democracy=6). So both check Fundamentalism exit correctly.

---

## GL -- Game Logic: Revolution / AI Government Notification (1 function)

FUN_0055c69d | 1336B | ai_revolution_notification -- handles government change for AI or when forced by revolution; if civ is human: calls FUN_0055c3d3 to show PICKGOVT dialog; if civ is AI: shows messages about government change/overthrow based on embassy/intelligence/observer visibility; if transitioning to lower govt (index < 4): adjusts attitude DAT_0064c6b4 by 4-(index/2); sends MP messages 0x2b/0x2c via FUN_00511880 to all visible human players; sets revolution flag on civ flags (bit 8).

**JS:** Partially ported in `engine/reduce/end-turn.js:105` which calls `applyGovernmentChangeEffects()`. The detailed AI notification and attitude adjustment logic is not directly ported.

**DISCREPANCY:** Binary computes `DAT_0064c6b4[civ] = 4 - (govtIndex/2)` where govtIndex < 4 maps to {4,3,3,2} -- this sets the "AI patience" or "betrayal counter" on revolution. JS does not implement this attitude adjustment on revolution.

---

## GL -- Game Logic: Betrayal/Revolution Check (1 function)

FUN_0055bef9 | 365B | can_betray_treaty -- checks if a civ can betray another civ's alliance/treaty; returns 0 if: govt < 5 (no advanced govt), or scenario has no-betray flag (0x80 in DAT_00655af0 + 0x01 in DAT_0064bc60), or random check fails against betrayal counter * 15 + vendetta/wonder bonuses (0x19 for vendetta bit 0x10, 0x32 for wonder 0x18). Govt >= 6: always can betray. Govt 5: only if civ has "aggressive" flag bit 4.

**JS:** Not directly ported as a standalone function. The JS diplomacy system handles treaty breaking through `declareWar()` in `engine/diplomacy.js:764` which has its own betrayal checks.

**DISCREPANCY:** Binary uses the betrayal counter (`DAT_0064c6be[targetCiv*0x594]`) multiplied by 15 as the base random threshold (line 4876). The vendetta bonus is +25 (0x19) if treaty has 0x10 bit, +50 (0x32) if target has wonder 0x18 (Great Wall). This detailed threshold formula is not present in JS. Medium severity -- affects AI treaty-breaking probability.

---

## GL -- Game Logic: War Readiness Scoring (1 function)

FUN_0055bbc0 | 820B | calc_war_readiness -- computes border proximity score for a civ pair; if alliance exists (treaty bit 8): returns 0 immediately; otherwise iterates all cities of param_1, scans 20-tile radius around each city for tiles owned by param_2 with no ocean/sea boundary; counts sighted military units, adds terrain defense bonuses (0x10:+2, 0x20:+1, 0x08:+1, 0x04:+1, 0x40:+2); returns total DAT_006ab5e8 score.

**JS:** Ported as `calcBorderScore()` in `engine/ai/diplomai.js:485-570`. Port reference at diplomacy-tables.js:1325.

**Status: PARTIAL MATCH.** The JS port captures the core concept of border proximity scoring and city radius scanning.

**DISCREPANCY:** Binary uses exact 20-offset arrays (`DAT_00628370[20]` and `DAT_006283a0[20]`) for the scan pattern. JS uses a simplified radius check. The terrain defense bonus multipliers (+2 for 0x10/0x40, +1 for 0x20/0x08/0x04) in the binary are not replicated in JS's border scoring -- JS just counts units without defense bonuses. Low severity -- affects AI war decision timing.

---

## GL -- Game Logic: Pick Government Dialog (1 function)

FUN_0055c3d3 | 678B | pick_government_dialog -- shows PICKGOVT dialog for selecting new government; if civ is AI and multiplayer: sends MP message 0x9f with selected govt; otherwise shows dialog with government names from DAT_0064b9a0; calls FUN_0055c066 to apply; shows NEWGOVT announcement; if advanced govt (>4) and tutorial active: shows DEMOCRATS tutorial advice. Calls FUN_0055c277 to filter available govts.

**JS:** Government selection is handled through the reducer's SET_GOVERNMENT action in `engine/reducer.js:311`. The dialog itself is client-side UI.
**Status: N/A (UI dialog, game logic portion matched via FUN_0055c066 port).**

---

## GL -- Game Logic: Should Sign Peace (AI evaluation) (1 function)

FUN_0055cbd5 | 1549B | should_sign_peace / war_sustainability -- evaluates whether civA should continue war against civB; checks: (1) if attacked flag set in treaty (bit 0x2000 in byte 1): return 1 immediately (retaliation); (2) if vendetta (bit 0x10): return 1; (3) for each third civ: checks if both at war with same targets (mutual enemies boost war), or if either has alliance with third civ that has higher power ranking; (4) compares patience level from DAT_0064c7a5; (5) per-continent military strength analysis iterating all routes 1-62: sums imports+exports for routes active from both civs, computes strength ratio (local_1c<<2)/local_24 vs (local_c - patience + 4); returns 0 if can't sustain war, 1 if should continue.

**JS:** Ported as `shouldDeclareWar()` in `engine/ai/diplomai.js:993-1091` and `shouldProposePeace()` in `engine/ai/diplomai.js:1098-1195`.

**Status: PARTIAL MATCH.** The JS port captures the key decisions but simplifies the per-continent strength analysis.

**DISCREPANCY 1:** Binary uses per-trade-route (1-62) military strength sums from `DAT_0064c8b2` (imports) and `DAT_0064c832` (exports). JS uses aggregate military score from `calcBorderScore()`. The binary's granular per-continent analysis is collapsed into a simpler comparison.

**DISCREPANCY 2:** Binary has explicit check for barbarian superpower (`DAT_00655c22[civ]==7`) with power ranking comparison. JS does not have the barbarian superpower special case.

**DISCREPANCY 3:** Binary's third-party alliance analysis (lines 5252-5270) accounts for mutual enemies, stronger third-party allies who are allied with both, and specific "shared intelligence" flag (0x20 in byte 1). The JS port simplifies to basic alliance counting. Medium severity -- affects AI war/peace decisions for complex multi-civ scenarios.

---

## GL -- Game Logic: AI Tech/Peace Negotiation (1 function)

FUN_0055d1e2 | 1182B | ai_negotiate_tech_trade -- AI-to-AI tech/peace negotiation; checks scenario no-trade flag; checks for superpower civilization (DAT_00655c31); iterates 100 techs to find stealable ones each side can trade; picks best tech by random + tech_value scoring; if both sides have tradeable techs: executes mutual exchange via FUN_004bf05b; if only one side has tech AND alliance exists: may give tech freely if behind in tech count (tolerance based on 6-difficulty*2 gap) or if superpower is involved; sets TRIBUTE_DEMANDED (0x40000) flag when giving free tech.

**JS:** Ported as `processAiTechTrade()` in `engine/ai/diplomai.js:1567-1715`.

**Status: PARTIAL MATCH.**

**DISCREPANCY 1:** Binary has the superpower civilization check (`DAT_00655c31`) that enables forced tech transfers when one civ is significantly ahead. JS does not implement the superpower mechanic.

**DISCREPANCY 2:** Binary uses `rand() % 3 + tech_value` as the scoring formula (line 5360). JS uses a simpler random tie-breaking without the mod-3 addition.

**DISCREPANCY 3:** Binary checks `DAT_0064c6c2[civ1*0x594 + civ2*4] & 4` (peace treaty flag) before allowing free tech gifts to allies. JS does not gate on this specific flag combination.

---

## GL -- Game Logic: Third-Party Join War (1 function)

FUN_0055d685 | 595B | request_join_war -- asks a third-party civ to join war between param_1 (aggressor) and param_3 (defender); checks: treaty flags 0x2008 (at war + alliance) between aggressor and target returns 0; checks shared intelligence bit 0x20 between target and defender; if target has vendetta (0x10) against both aggressor and defender, sets shared intel flag 0x20; if target is human: checks last contact year within 6 turns, random 1-in-3 gate for barbarian-like civs; updates contact years; shows JOINWAR message; calls FUN_00467825 to set WAR (0x2000) flag.

**JS:** Ported as `requestJoinWar()` in `engine/ai/diplomai.js:1719-1874`.

**Status: PARTIAL MATCH.**

**DISCREPANCY:** Binary checks specific combined flag `0x2008` (WAR + ALLIANCE) as the skip condition (line 5428). JS checks WAR and ALLIANCE separately. The combined check means an allied-at-war state is handled differently from separate war+alliance states. Low severity.

---

## GL -- Game Logic: Main Diplomacy Encounter (1 function)

FUN_0055d8d8 | 7326B | process_diplomatic_contact -- master diplomacy encounter orchestrator for two civs meeting; handles: (1) first contact: sets CONTACT + RECENT_CONTACT flags; (2) human-vs-human multiplayer: shows PARLEYWAITING dialog with timeout, sends 0x99/0x81 network messages for parley requests, handles busy/cancel/accept flow; (3) AI-vs-AI: calls FUN_0055cbd5 to check war sustainability, if both should make peace: calls FUN_0055d1e2 for tech trade then sets PEACE (4); if one side should continue war: checks alliance wars, signs peace with appropriate messages; (4) alliance breaking: if allied and alliance should end based on power rankings + third-party involvement: removes ALLIANCE (8), shows CANCELALLIED message, or recruits new ally via FUN_0055d685; (5) war declaration: if treaty has vendetta/intruder flags and shouldDeclareWar: clears PEACE, sets WAR (0x2000), shows DECLAREWAR/CANCELPEACE messages; handles embassy awareness for war messages; checks Great Wall (0x18) and UN (0x06) wonders for forced peace messages.

**JS:** Ported across multiple functions in `engine/ai/diplomai.js`: `processAiDiplomacy()` at line 2886, `shouldProposePeace()` at line 1098, `shouldBreakAlliance()` at line 1307, `shouldDeclareWar()` at line 993. The multiplayer parley flow is handled by `engine/diplomacy.js:462` (`processDiplomacyTimers`).

**Status: PARTIAL MATCH.** The core decision tree is ported but the 7326B function has many edge cases.

**DISCREPANCY 1:** Binary checks `(DAT_00655af8 + param_2 + param_1) & 3 == 0` as a contact frequency gate (line 5663) -- diplomacy only triggers every 4 turns based on civ indices + turn number. JS uses `turnNumber % 4 !== 0` which doesn't factor in civ indices.

**DISCREPANCY 2:** Binary has scenario-specific override at line 5794-5798: if scenario flag 0x8000 is set and civs 6+7 (or 7+6) meet after turn 1, forces `local_2c = 0` (alliance with barbarians). JS does not implement this scenario-specific alliance override.

**DISCREPANCY 3:** Binary's alliance-breaking path (lines 5746-5793) has detailed power ranking comparison (`DAT_00655c22[civ]`) with specific thresholds for barbarian-like civs (rank 7) and checks for existing wars of both parties. JS simplifies the power ranking comparison.

**DISCREPANCY 4:** Binary sets WAR_STARTED flag (0x800) when removing vendetta during war declaration (line 5918: `flags |= 0x800`). JS does not explicitly set WAR_STARTED separately -- it relies on the cascade in `declareWar()`. The binary's explicit set ensures WAR_STARTED persists even if the cascade would normally clear it.

---

## GL -- Game Logic: AI Choose Government (1 function)

FUN_0055f5a3 | 558B | ai_choose_government -- AI government selection; checks scenario no-revolution flag (0x80+0x10 in DAT_00655af0 + DAT_0064bc60); determines max government index based on param_2 (reactive: 5, proactive: 6 minus random 1-in-3 chance for 4); if barbarian-mode AI (DAT_00655af0 bit 1) and far behind in tech count: forces anarchy/despotism (sets DAT_0064ca80/7e to -2/-1); if revolution trigger is positive (DAT_0064ca74 > 0) and current govt < 6: limits to index 1; scans govts 1-max finding highest scored (DAT_0064ca74[govtIndex*2+civ*0x594]) with tech prerequisite check via FUN_0055c277; calls FUN_0055c69d to apply.

**JS:** Ported as `considerRevolution()` in `engine/ai/econai.js:1025-1135`.

**Status: PARTIAL MATCH.**

**DISCREPANCY 1:** Binary has explicit logic for barbarian-mode AI (DAT_00655af0 bit 1) that forces attitude penalties (DAT_0064ca80 = -2, DAT_0064ca7e = -1) when the AI is 6+ or 8+ techs behind the leader. JS does not implement this barbarian-mode tech-gap attitude penalty.

**DISCREPANCY 2:** Binary's reactive mode (`param_2 != 0`) uses `local_8 = 5` with random chance for 4. JS uses a simplified max-government calculation without the reactive/proactive distinction.

---

## GL -- Game Logic: AI Military Aid (Unit Gifting) (1 function)

FUN_0055f7d1 | 2222B | ai_military_aid -- AI-to-AI military unit gifting between allies; iterates all civs finding allied pairs where: ally has higher power ranking, ally has mutual defense pact (treaty bits 0x20+0x02); finds best offensive unit owned by param_1 that is: not settler/settler-type, idle (no orders), at a tile with no ocean boundary owned by an allied civ; selects unit with highest attack*hitpoints score; transfers unit to ally's city: picks target city owned by the war enemy that has weak defense (terrainType==1), calls pick_up_unit, changes unit owner, updates unit counts per type, places at city tile; shows MILITARYAID1/2 messages to relevant human players; sends MP message 0x51/0x52; flushes send buffer.

**JS:** Ported as `processAllianceMilitaryAid()` in `engine/ai/diplomai.js:720-819`.

**Status: PARTIAL MATCH.**

**DISCREPANCY 1:** Binary has a detailed unit scoring formula at line 6043: `(attack*2 + defense) * hitpoints` for selecting the best unit to gift. JS uses a simpler comparison.

**DISCREPANCY 2:** Binary checks specific terrain/city conditions for the target: `terrainType == 1` (grassland), city has `DAT_0064f344[city*0x58] & 0x80` (coastal city flag), and `DAT_0064ca32[civ*0x594+terrain] == 1` (terrain is rated "useful" by the owning civ). JS does not filter target cities with these specific terrain conditions.

**DISCREPANCY 3:** Binary updates per-unit-type counters (`DAT_0064c778[civ*0x594+unitType]`) for both source and destination civs. JS relies on the general unit transfer mechanism without explicit per-type counter maintenance.

---

## Summary

| Category | Count |
|----------|-------|
| FW (Framework / C++ Runtime) | 71 |
| UI (User Interface) | 67 |
| GL (Game Logic) | 14 |
| **Total** | **152** |

### GL Functions with JS Engine Comparison

| Function | Binary Name | JS Location | Match Status |
|----------|------------|-------------|-------------|
| FUN_0055a980 | build_trade_connectivity_map | None | NOT PORTED |
| FUN_0055ac37 | find_valid_terrain_at | None | NOT PORTED |
| FUN_0055c277 | check_govt_available | ai/econai.js:124 | MATCH (minor: rules flag) |
| FUN_0055c066 | set_government_type | diplomacy.js:2757 | PARTIAL (flag mismatch) |
| FUN_0055c69d | ai_revolution_notification | reduce/end-turn.js:105 | PARTIAL (attitude adj) |
| FUN_0055bef9 | can_betray_treaty | diplomacy.js:764 | PARTIAL (threshold formula) |
| FUN_0055bbc0 | calc_war_readiness | ai/diplomai.js:485 | PARTIAL (defense bonuses) |
| FUN_0055c3d3 | pick_government_dialog | reducer.js:311 (UI) | N/A (UI) |
| FUN_0055cbd5 | should_sign_peace | ai/diplomai.js:993 | PARTIAL (strength analysis) |
| FUN_0055d1e2 | ai_negotiate_tech_trade | ai/diplomai.js:1567 | PARTIAL (superpower) |
| FUN_0055d685 | request_join_war | ai/diplomai.js:1719 | PARTIAL (flag check) |
| FUN_0055d8d8 | process_diplomatic_contact | ai/diplomai.js:2886 | PARTIAL (frequency gate) |
| FUN_0055f5a3 | ai_choose_government | ai/econai.js:1025 | PARTIAL (barbarian mode) |
| FUN_0055f7d1 | ai_military_aid | ai/diplomai.js:720 | PARTIAL (scoring formula) |

### Key Discrepancies (sorted by severity)

1. **FUN_0055c066 (set_government_type):** Binary clears VENDETTA (0x10) from all treaty pairs; JS clears EMBASSY (0x80). Wrong flag cleared. **Medium severity.**

2. **FUN_0055d8d8 (process_diplomatic_contact):** Contact frequency gate uses `(year + civA + civB) & 3` in binary but `turnNumber % 4` in JS -- different diplomatic contact patterns per civ pair. **Medium severity.**

3. **FUN_0055cbd5 (should_sign_peace):** Per-trade-route military strength analysis with import/export sums collapsed to simple score in JS. **Medium severity.**

4. **FUN_0055d1e2 (ai_negotiate_tech_trade):** Superpower civilization mechanic (DAT_00655c31) not implemented in JS. **Medium severity.**

5. **FUN_0055f5a3 (ai_choose_government):** Barbarian-mode AI attitude penalties for tech-gap not implemented. **Low-medium severity.**

6. **FUN_0055bef9 (can_betray_treaty):** Detailed betrayal threshold formula (counter*15 + vendetta/wonder bonuses) not ported. **Medium severity.**

7. **FUN_0055c277 (check_govt_available):** Missing DAT_00627879 Fundamentalism rules flag check. **Low severity.**

8. **FUN_0055bbc0 (calc_war_readiness):** Terrain defense bonuses in border scoring not implemented. **Low severity.**

9. **FUN_0055a980 (build_trade_connectivity_map):** Trade route connectivity map not implemented at all. **Low severity** (trade routes use different pathing in JS).

10. **FUN_0055d8d8 (process_diplomatic_contact):** Scenario-specific barbarian alliance override for civs 6+7 not implemented. **Low severity** (scenario-only).
