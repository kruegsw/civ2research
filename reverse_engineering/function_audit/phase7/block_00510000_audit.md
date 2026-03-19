# Block 00510000 — Phase 7 Audit

**Functions in this block: 162**
**System: Multiplayer event dispatch, network message queue, advisor council UI, world map UI, terrain editor UI, multiplayer setup/config UI**

**Verdict: 0 GL functions. Entire block is UI/FW/network. No game logic discrepancies with JS engine.**

The Phase 6 smoke test flagged this block as "suspicious" due to heavy state writes. On close inspection, the state writes are all:
1. **MP event dispatch** (FUN_00511ba2) — displays notifications to the *local* player (popups, sound, animation) after the game logic has already executed. All game state mutations happen in other blocks; this function only shows results.
2. **Network message queue** (FUN_0051438f/FUN_005149d6) — manages a circular buffer for network datagrams. Pure transport infrastructure.
3. **Multiplayer setup UI** (FUN_0051dd97, FUN_0051f19c, FUN_0051ea8e) — writes to game setup globals (difficulty, barbarian level, rules flags, timer settings, tribe selection). These are pregame configuration, not in-game logic.

None of these functions contain game rules, combat formulas, production logic, happiness calculations, research progression, movement rules, city growth, or any other game mechanic that the JS engine implements.

---

## FW — Framework (82 functions)

FUN_00511320 | 28B | N/A (getter: returns *(in_ECX + 4) — MFC object field accessor)
FUN_00511350 | 59B | N/A (clamp: if param_1 <= param_3 and param_1 < param_2, returns param_2; else param_3 — integer range clamp)
FUN_005113b0 | 46B | N/A (drawing wrapper: calls thunk_FUN_005a97cc with DAT_00635c64 — UI rectangle draw delegate)
FUN_005113f0 | 42B | N/A (drawing wrapper: calls thunk_FUN_005a99fc with DAT_00635c64 — UI rectangle fill delegate)
FUN_00511430 | 29B | N/A (resource cleanup: calls thunk_FUN_004af09e on DAT_00679640 — string buffer reset)
FUN_00511460 | 78B | N/A (blit wrapper: calls thunk_FUN_0046ace7 unpacking rect from param_3 struct)
FUN_005114d0 | 62B | N/A (blit wrapper: calls thunk_FUN_00548c78 with DAT_00635c64 — sprite blit delegate)
FUN_00511520 | 41B | N/A (dialog wrapper: calls thunk_FUN_004a6cc5 with DAT_006359d4)
FUN_00511560 | 57B | N/A (MFC scalar deleting destructor — calls thunk_FUN_005115b0 + operator_delete)
FUN_005115b0 | 116B | N/A (MFC destructor body — SEH frame, frees member at offset 0x1c, calls sub-destructors)
FUN_00511624 | 12B | N/A (MFC sub-object destructor — calls FUN_005bd915)
FUN_00511630 | 12B | N/A (MFC sub-object destructor — calls FUN_005bd915)
FUN_0051163c | 9B | N/A (MFC destructor helper — calls thunk_FUN_0040f510)
FUN_0051164f | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_005116f0 | 33B | N/A (UI helper: calls thunk_FUN_0043ce5a on DAT_00679640 — text rendering delegate)
FUN_00511720 | 123B | N/A (MFC constructor — SEH frame, calls thunk_FUN_0040f480 + FUN_005bd630 x2, zeros byte at offset 200)
FUN_005117f0 | 33B | N/A (setter: writes param_1 to *(in_ECX + 0x2c) — MFC object property)
EnableStackedTabs @ 0x00511820 | 36B | N/A (MFC library: CPropertySheet::EnableStackedTabs — sets offset 0x2cc)
EnableStackedTabs @ 0x00511850 | 36B | N/A (MFC library: CPropertySheet::EnableStackedTabs — sets offset 0x2d0)
FUN_0051399d | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_005139b3 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00514220 | 52B | N/A (netmsg_queue_construct: memset 24000 bytes to 0, calls thunk_FUN_00514272)
FUN_00514254 | 30B | N/A (netmsg_queue_reset: calls thunk_FUN_00514272)
FUN_0051435f | 48B | N/A (is_alpha_message: returns 1 if 0x2a <= param_1 <= 0x66 — classifies network messages)
FID_conflict:_$E31 @ 0x00514E10 | 26B | N/A (CRT static initializer — calls FUN_00514e2a + FUN_00514e44)
FUN_00514e2a | 26B | N/A (CRT init thunk — calls FUN_005bd630)
FUN_00514e44 | 29B | N/A (CRT atexit registration — registers FUN_00514e61)
FUN_00514e61 | 26B | N/A (CRT atexit handler — calls FUN_005bd915)
FUN_00514ef2 | 12B | N/A (destructor delegate — calls thunk_FUN_005150b9)
FUN_00514f08 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051516a | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0043c520)
FUN_00515179 | 15B | N/A (MFC sub-object destructor — calls FUN_005cde4d)
FUN_00515188 | 15B | N/A (MFC sub-object destructor — calls FUN_005cde4d)
FUN_00515197 | 15B | N/A (MFC sub-object destructor — _Timevec::~_Timevec at offset 0x648)
FUN_005151a6 | 15B | N/A (MFC sub-object destructor — calls FUN_005bd915)
FUN_005151b5 | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0044cba0)
FUN_005151c4 | 15B | N/A (MFC sub-object destructor — calls FUN_005c656b)
FUN_005151d3 | 9B | N/A (MFC base destructor — calls thunk_FUN_0044ca60)
FUN_005151e6 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00515978 | 9B | N/A (destructor helper — calls thunk_FUN_0043c520)
FUN_0051598b | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00515d96 | 12B | N/A (destructor helper — calls FUN_005c656b)
FUN_00515da2 | 12B | N/A (destructor helper — calls FUN_005bd915)
FUN_00515db8 | 16B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_005165f6 | 12B | N/A (destructor delegate — calls thunk_FUN_005167d9)
FUN_0051660c | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051689f | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168ae | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168bd | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168cc | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168db | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168ea | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0040f570)
FUN_005168f9 | 15B | N/A (MFC sub-object destructor — _Timevec::~_Timevec at offset 0xe30)
FUN_00516908 | 15B | N/A (MFC sub-object destructor — calls thunk_FUN_0059df8a)
FUN_00516917 | 15B | N/A (MFC sub-object destructor — calls FUN_005dd1a0)
FUN_00516926 | 9B | N/A (MFC base destructor — calls thunk_FUN_0044cba0)
FUN_00516939 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00517fe4 | 9B | N/A (destructor helper — calls thunk_FUN_0043c520)
FUN_00517ff7 | 16B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_005181ab | 9B | N/A (destructor helper — calls FUN_005cde4d)
FUN_005181b4 | 12B | N/A (destructor helper — calls FUN_005bd915)
FUN_005181ca | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_005190d0 | 26B | N/A (CRT static initializer — calls FUN_005190ea + FUN_00519109)
FUN_005190ea | 31B | N/A (CRT init thunk — calls thunk_FUN_0059db08 with 0x4000)
FUN_00519109 | 29B | N/A (CRT atexit registration — registers FUN_00519126)
FUN_00519126 | 26B | N/A (CRT atexit handler — calls thunk_FUN_0059df8a)
FUN_0051d53f | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051d555 | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051d616 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051d62c | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051d738 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051d74e | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051dd72 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051dd88 | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051e9e7 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051e9fd | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051f0f5 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_0051f10b | 15B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051c611 | 12B | N/A (destructor helper — calls FUN_005c656b)
FUN_0051c627 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_0051c68e | 12B | N/A (destructor helper — calls thunk_FUN_004183d0)
FUN_0051c6a4 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)

---

## UI — User Interface (80 functions)

### UI scaling helper (1)

FUN_00511690 | 67B | N/A (ui_scale_coord: scales param_1 by resolution factor at *(in_ECX + 0x15d4); if mode != 2, returns param_1 * mode / 2 — UI coordinate scaling for different resolutions)

### MP event enqueue/dispatch (4)

FUN_00511880 | 398B | N/A (enqueue_mp_event: serializes string/int params into a linked-list node, sends via thunk_FUN_0046b14d as network message type 0x6A — queues multiplayer UI notifications for remote display)
FUN_00511a0e | 193B | N/A (mp_event_enqueue_local: allocates node with 7-field header + payload, appends to linked list DAT_00631130/DAT_00631134 — local event queue)
FUN_00511acf | 94B | N/A (mp_event_drain: iterates DAT_00631130 linked list, frees all nodes — clears event queue)
FUN_00511b2d | 117B | N/A (mp_event_tick: calls thunk_FUN_0047e94e, conditionally invalidates view — periodic timer callback for MP event display refresh)

### MP event dispatcher — massive switch (1)

FUN_00511ba2 | 7252B | N/A (dispatch_mp_event: dequeues head from event linked list, dispatches via ~100-case switch on event type. ALL cases display UI notifications: popups, animations, sound triggers, dialog boxes. String keys include RETIREDIE, BARBARIANS, GLOBALWARMING, EAGLEHASLANDED, CARAVAN, STARTWONDER, CITYCAPTURE, PROMOTED, DESERTED, SNEAK, STEAL, CIVILWAR, PARLEYREQUEST, etc. Case 0x3D writes diplomacy contact year but only as part of negotiation UI flow. No game logic mutations.)

### Network message queue (3)

FUN_00514272 | 237B | N/A (netmsg_queue_init: zeroes 2000-entry circular buffer (12 bytes per entry = 24000 bytes), sets head/tail to 400, resets counts — initializes dual-queue network transport)
FUN_0051438f | 1602B | N/A (netmsg_enqueue: classifies message via FUN_0051435f into alpha or primary queue, allocates + copies datagram into circular buffer, tracks watermarks — network transport enqueue)
FUN_005149d6 | 461B | N/A (netmsg_dequeue: pops from alpha queue first if non-empty, else primary queue — network transport dequeue with priority)

### Advisor council window (25)

FUN_00514e7b | 119B | N/A (council_entry: constructs council via thunk_FUN_00514f16, calls thunk_FUN_005151f4 to init, thunk_FUN_00515516 to play — advisor council entry point)
FUN_00514f16 | 295B | N/A (council_construct: builds MFC dialog with CSocket, CString members, sets SetRect for position, stores singleton at DAT_00631a98 — council window constructor)
FUN_005150b9 | 177B | N/A (council_destruct: tears down 8 sub-objects in reverse, clears DAT_00631a98 singleton — council window destructor)
FUN_005151f4 | 802B | N/A (council_init: loads civ2_mk.dll, sets advisor index from player government, creates offscreen surfaces, calls thunk_FUN_00515999 to draw initial label — council window initialization)
FUN_00515516 | 1122B | N/A (council_play: loops through 12 advisors, plays 7-second animation per matching advisor, scrolls text, loads script from GAME.TXT, renders credits — council playback sequence)
FUN_00515999 | 636B | N/A (council_draw_label: renders advisor name with shadow text on offscreen surface, handles active/inactive modes — council label drawing)
FUN_00515c15 | 385B | N/A (council_load_advisor_bg: loads advisor background sprite by index, creates palette, initializes overlay surface — advisor background loader)
FUN_00515dc8 | 372B | N/A (council_scroll: offsets council content rect by param_1 pixels, blits scrolled region — council text scroll)
FUN_00515f3c | 201B | N/A (council_scroll_down_anim: plays sound 0x6f, scrolls down in 15px steps with 22ms delay until reaching 0x133 — animated scroll down)
FUN_00516005 | 61B | N/A (council_scroll_up_anim: scrolls up in -4px steps until reaching -0xad — animated scroll up)
FUN_00516042 | 33B | N/A (council_invalidate: invalidates DAT_00631a98 + 0x534 — forces council window redraw)
FUN_00516063 | 83B | N/A (council_conditional_invalidate: if param_1 in range 0xD0-0xD2, invalidates council window — conditional redraw on advisor button range)

### World map / advisor video window (16)

FUN_00516570 | 134B | N/A (worldmap_entry: opens FUN_005f35f0 dialog, calls thunk_FUN_00516947 to init video, thunk_FUN_00516fd4 to play — world map / advisor video entry point)
FUN_0051661a | 293B | N/A (worldmap_construct: builds MFC dialog with CSocket, 6x CString members, sets vtable at PTR_FUN_0061d6d8, stores singleton at DAT_00631acc — video window constructor)
FUN_005167d9 | 198B | N/A (worldmap_destruct: tears down 9 sub-objects, clears DAT_00631acc singleton — video window destructor)
FUN_00516947 | 1672B | N/A (council_video_init: loads advisor DLL, creates video surface, gets 5 advisor recommendations via thunk_FUN_00518582, parses council script, loads .AVI video file — video init with optional cheat dialog overrides)
FUN_00516fd4 | 388B | N/A (council_video_play: restores screen, plays video, handles anarchy mode text display, invalidates and cleans up — video playback and teardown)
FUN_00517158 | 1307B | N/A (council_draw_frame: renders 5 advisor panel borders, scrollbar, title text with shadow — council window frame rendering)
FUN_00517673 | 816B | N/A (council_create_buttons: creates 5 advisor navigation buttons + 1 close button with sprites from DAT_00628420 — button layout for council panels)
FUN_005179a3 | 907B | N/A (council_parse_advisor_script: parses advisor script file with M/S/T/F/A/E/R letter codes for Military/Science/Trade/Foreign/Attitude, loads text and animation IDs — script parser for advisor speeches)
FUN_00517dd3 | 529B | N/A (council_render_speech: renders advisor speech text with shadow into council panel rect, handles word wrap — speech text renderer)
FUN_00518007 | 420B | N/A (council_load_video: loads advisor .AVI files for each panel, calls FUN_005dd45d/FUN_005dd64c for video playback — video file loader)
FUN_005181d8 | 362B | N/A (council_button_handler: handles button clicks — panel 0xCA closes, panels 0-4 load advisor scripts and play videos — button click dispatch)
FUN_00518342 | 80B | N/A (council_position_video: positions video at (DAT_0063359c + 0x5a) * param_1 + DAT_0063359c + 1 — video panel positioning)
FUN_00518392 | 122B | N/A (parse_advisor_letter: switch on ASCII chars M/S/T/F/A mapping to advisor indices 0-4, default -1 — advisor letter parser)
FUN_00518471 | 273B | N/A (council_advance_speech: advances to next advisor speech in sequence, positions video and plays — auto-advance handler)
FUN_00518582 | 177B | N/A (get_advisor_recommendation: dispatches to thunk_FUN_004bc480/004bc8aa/004bcb9b/004bcfcf/004bd2a3 based on advisor index 0-4 — gets recommendation from game state for advisor display)
FUN_00518e80 | 47B | N/A (video_set_position: calls FUN_005bc4a1 with *(in_ECX + 8) — sets video playback position)

### Dialog helpers (5)

FUN_00518ec0 | 41B | N/A (show_number_input_dialog: calls thunk_FUN_0051d75d with DAT_006359d4 — numeric input dialog wrapper)
FUN_00519140 | 49B | N/A (close_popup_if_open: if DAT_00631b78 != 0, calls thunk_FUN_0059db65 + thunk_FUN_00419b80 — closes existing popup)
FUN_00519171 | 77B | N/A (show_popup: closes existing popup, sets DAT_00631b78=1, calls thunk_FUN_0040ffa0 — popup display)
show_messagebox_9D67 | 269B | N/A (terrain_editor_ok_handler: calls thunk_FUN_005197af to validate, saves data via thunk_FUN_005193ed, writes RULES file via thunk_show_messagebox_CF2D — terrain editor save handler)
FUN_0051d950 | 58B | N/A (ascii_toupper: converts lowercase a-z to uppercase A-Z — character case conversion)

### Terrain editor UI (18)

FUN_00518f00 | 365B | N/A (wonders_tab_handler: copies scrollbar data arrays, sets scrollbar range/position, refreshes 4 child panels — wonders list panel handler for city dialog or editor)
FUN_00519200 | 493B | N/A (terrain_editor_load_data: loads 33 terrain entries from DAT_00627cc4 string table, copies stats (food/shield/trade, road/rail/irrigation/mine bonuses) into editor buffer DAT_006a2d28 — terrain data loader)
FUN_005193ed | 471B | N/A (terrain_editor_save_data: reverse of load — copies edited terrain data from DAT_006a2d28 buffer back to DAT_00627cc4 string table — terrain data saver)
FUN_005195c4 | 45B | N/A (terrain_index_collapse: removes gaps at indices 0xD and 0x18 — converts internal terrain index to editor display index)
FUN_005195f1 | 45B | N/A (terrain_index_expand: re-inserts gaps at indices 0xD and 0x18 — converts editor display index to internal terrain index)
FUN_0051961e | 391B | N/A (terrain_editor_populate_controls: loops through 15 controls, populates spinners (type 9) and combos (type 0xC) from terrain data — fills editor UI controls)
FUN_005197af | 496B | N/A (terrain_editor_validate_and_save: reads control values, validates ranges via thunk_FUN_005adfa0, writes to DAT_006a2d28 buffer, returns error count — editor validation)
FUN_005199a9 | 27B | N/A (terrain_editor_redraw: calls thunk_FUN_0051b2b6 — triggers terrain editor repaint)
FUN_005199c4 | 236B | N/A (terrain_editor_append_label: appends terrain type name or special labels (-1/-2/>=0xb) to DAT_00679640 text buffer — label formatting)
FUN_00519ab0 | 695B | N/A (terrain_editor_export: writes all 33 terrain entries with stats to FILE* in formatted text — terrain data file exporter)
FUN_00519e74 | 881B | N/A (editor_rename_terrain: dialog to rename a terrain type, updates string table and refreshes combo/spinner controls — terrain rename UI)
FUN_0051a1e5 | 95B | N/A (editor_show_terrain_help: shows help dialog for terrain section — help popup)
FUN_0051a244 | 40B | N/A (editor_close_terrain: sets DAT_006a1d7c=0, invalidates view — closes terrain editor)
FUN_0051a26c | 1036B | N/A (editor_terrain_type_dialog: shows Forest/Hills/Mountains selection dialogs with help buttons, selects appropriate data pointer — terrain subtype selection)
FUN_0051a678 | 287B | N/A (editor_river_dialog: river terrain selection with help — river subtype UI)
FUN_0051a797 | 288B | N/A (editor_coast_dialog: coast terrain selection with help — coast subtype UI)
FUN_0051a8b7 | 407B | N/A (editor_terrmisc_dialog: miscellaneous terrain selection (3 base + special + overlay variants) — terrain misc UI)
FUN_0051aa4e | 644B | N/A (editor_terrain_toggle_controls: shows/hides UI controls based on terrain type (<0xb vs >=0xb) — control visibility manager)
FUN_0051acdc | 289B | N/A (editor_control_change_handler: handles terrain type combo change (0xc9), toggle changes (0xcf/0xd3) — editor control event handler)
FUN_0051adfd | 931B | N/A (editor_create_control: creates UI controls (spinners for page 0, combos for pages 1-5) at calculated positions — editor control factory)
FUN_0051b1c2 | 244B | N/A (editor_create_edit_control: creates text edit controls at calculated positions — editor text input factory)
FUN_0051b2b6 | 2283B | N/A (terrain_editor_render: renders terrain preview sprite, food/shield/trade icons, labels for all terrain stats, scrollbar — main terrain editor rendering function)
FUN_0051bba1 | 2646B | N/A (terrain_editor_main: constructs full terrain editor window with buttons, sprites, controls, scrollbar, event loop — terrain editor entry point)
FUN_0051c635 | 89B | N/A (mp_admin_entry: calls thunk_FUN_00417fa0, thunk_FUN_0051bba1, FUN_005bb574 — multiplayer admin panel entry point)

### Dialog system (7)

FUN_0051d3e0 | 351B | N/A (show_dialog_checkboxes: creates dialog via thunk_FUN_005a632a, initializes/reads checkboxes from DAT_00631ed8 bitmask, stores result in DAT_00631edc — dialog with checkbox options)
FUN_0051d564 | 178B | N/A (show_dialog_with_sprite: creates dialog with CSocket params, shows sprite via thunk_FUN_0059ec88, reads result into DAT_00631edc — dialog with image)
FUN_0051d63b | 253B | N/A (show_text_input_dialog: creates dialog via thunk_FUN_005a632a, reads text via thunk_FUN_005a5f34, strips leading whitespace — text input dialog)
FUN_0051d75d | 95B | N/A (show_number_input: wraps thunk_FUN_0051d63b with numeric conversion via _atol — number input dialog)
FUN_0051d7bc | 26B | N/A (clear_checkbox_state: sets DAT_00631ed8 = 0 — resets dialog checkbox bitmask)
FUN_0051d7d6 | 65B | N/A (set_checkbox_bit: sets or clears bit param_1 in DAT_00631ed8 bitmask based on param_2 — checkbox state setter)
FUN_0051d817 | 32B | N/A (get_checkbox_bit: returns bit param_1 from DAT_00631ed8 bitmask — checkbox state getter)

### Multiplayer setup/config UI (8)

FUN_0051d9a0 | 952B | N/A (mp_startup_config: reads CIV.INI for NetTimeOut/Adapter/MaxPlayers, shows MULTITYPE2 dialog for connection type selection, dispatches to IPX/serial/modem/hotseat setup — multiplayer connection setup)
FUN_0051dd97 | 3152B | N/A (game_setup_dialogs: shows DIFFICULTY, ENEMIES2, BARBARITY selection dialogs; handles randomized settings; shows RULES and ADVANCED checkbox dialogs for game rules flags; handles accelerated start with tech era selection — pregame configuration sequence)
FUN_0051ea0c | 130B | N/A (timer_display_refresh: periodic HUD refresh with 2401-tick threshold, checks DAT_006ad66c/DAT_006ad670 turn timer state — MP timer display update)
FUN_0051ea8e | 1579B | N/A (game_timer_dialog: shows GAMETIMER dialog with 7 presets (off/30s/60s/120s/180s/300s/custom), custom timer entry with 10-3600 second range, broadcasts timer changes to network — multiplayer turn timer configuration)
FUN_0051f11a | 100B | N/A (network_status_refresh: checks DAT_006c9088/DAT_006c900c network state flags, invalidates view if status changed — network status HUD update)
FUN_0051f17e | 30B | N/A (network_pump: calls thunk_FUN_0047e94e(1,0) — processes pending network messages)
FUN_0051f19c | 9815B | N/A (civ_selection_dialog: shows GENDER tribe selection, CUSTOMTRIBE/CUSTOMTRIBE2/CUSTOMCITY/EMAILADDRESS dialogs; handles tribe slot allocation, leader name, city style, city names; manages network join/leave coordination — player civilization selection flow)

---

## GL — Game Logic (0 functions)

(none)

---

## AI — AI Logic (0 functions)

(none)

---

## Discrepancies with JS Engine

**None found.** This entire block contains UI presentation, MFC framework, network transport, and pregame configuration dialogs. No game rules, formulas, or mechanics are implemented here.

### Notes on functions referenced by engine/reference/ files

The existing reference files (particularly `engine/reference/ui-constants-part2.js` and `engine/reference/network-protocol.js`) already extensively document the functions in this block as UI/network infrastructure. Key cross-references:

- **FUN_00511690** (ui_scale_coord) — referenced 50+ times in `ui-constants.js` for coordinate scaling
- **FUN_00511880** (enqueue_mp_event) — referenced in `network-protocol.js`, `sound-triggers.js`, `animation.js`, `diplomacy-tables.js`, `advisor-formulas.js` as the MP notification dispatcher
- **FUN_00511ba2** (dispatch_mp_event) — referenced in `ui-constants-part2.js` as a 100-case display switch
- **FUN_0051438f/FUN_005149d6** (netmsg queue) — referenced in `network-protocol.js` as transport infrastructure
- **FUN_00518582** (get_advisor_recommendation) — calls into block 0x004B advisor recommendation functions but is itself a UI dispatcher
- **FUN_00518f00** — referenced in `ui-constants.js` as "Wonders tab handler (single mode only)"
- **FUN_0051dd97** (game_setup_dialogs) — sets pregame globals (difficulty, barbarian level, rules flags) but these are one-time configuration, not in-game logic

### Why Phase 6 flagged this block as suspicious

The heavy state writes that triggered the flag are:
1. **FUN_00511ba2 case 0x3D**: Writes `DAT_0064ca82` (diplomacy contact year). This is a UI-triggered write during the PARLEYREQUEST negotiation flow — the actual diplomacy logic is in block 0x004B.
2. **FUN_0051dd97**: Writes `DAT_00655ae8` (game rules bitmask), `DAT_00655b08` (difficulty), `DAT_00655b09` (barbarian level), `DAT_00655b0d` (opponent count), `DAT_00654c74-DAT_00654fae` (advanced options). All pregame setup configuration.
3. **FUN_0051f19c**: Writes `DAT_006d1da0` (current player), `DAT_00655b0b` (occupied slot mask), `DAT_00655b03` (player civ ID). All pregame player selection.

None of these affect in-game mechanics that the JS engine implements.

---

## Summary

| Category | Count |
|----------|-------|
| FW       | 82    |
| UI       | 80    |
| GL       | 0     |
| AI       | 0     |
| **Total**| **162** (verified, matches index) |

**GL discrepancies: 0**
**New game logic missed: None**
