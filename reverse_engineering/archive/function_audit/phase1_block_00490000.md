# Phase 1 Audit: block_00490000.c (0x00490000 - 0x0049FFFF)

## Function Table

### Cluster: Multiplayer Chat Window UI

These functions handle the multiplayer chat/diplomacy window. The `in_ECX` object is a chat window class with fields at +0x120 (current selection index), +0xdcc (item count), +0xe54 (item array), +0x5f8 (surface/DC), +0x1b34/1b38/1f38/1f3c (display state).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004904C0 | stub | FUN_004904c0 | chatwin_thunk_a | 4 params | void | Thunk: calls thunk_FUN_0051d564 with param3=0. Window message relay. | LOW |
| 0x00490500 | stub | FUN_00490500 | chatwin_thunk_b | 3 params | void | Thunk: calls thunk_FUN_004a6cc5 with param3=0. Window message relay. | LOW |
| 0x00490530 | stub | FUN_00490530 | chatwin_thunk_c | 3 params | void | Thunk: calls thunk_FUN_004a6e39 with param3=0. Window message relay. | LOW |
| 0x00490560 | stub | CSplitterWnd::IsTracking | FRAMEWORK | this | int | MFC library: CSplitterWnd::IsTracking. Returns this+0x159c. | HIGH |
| 0x00490590 | large | FUN_00490590 | chatwin_init_display | void | void | Initializes chat window display. Copies item list from +0xe54 to +0x1b38, divides count by 9 for page display, calls scrollbar/redraw functions. DAT_006a85a4 modulo 9 alignment. | MEDIUM |
| 0x004906FD | xlarge | FUN_004906fd | chatwin_draw_terrain_info | void | void | 5344 bytes. Draws terrain information panel in diplomacy/intelligence window. Uses DAT_00627cc8 (terrain resource table, stride 0x18) extensively. Displays food/shield/trade values, irrigation/mining bonuses. Switches on terrain type (0-10 base vs 11+ improvements). Renders resource icons via FUN_005cef31 (blit_normal). String IDs 0x293-0x29e for labels. | HIGH |
| 0x00491C20 | large | FUN_00491c20 | chatwin_select_item | int item_id | void | Searches item list for item_id, updates selection index at +0x120, triggers redraw. Calls FUN_004906fd (terrain info draw) and FUN_005c61b0. Only acts if DAT_006a677c != 0. | MEDIUM |
| 0x00491D61 | small | FUN_00491d61 | chatwin_find_item_index | int item_id | int (-1 if not found) | Linear search of DAT_006a74bc array (count=DAT_006a7434) for matching item_id. Returns index or -1. Used to map terrain/improvement IDs to list positions. | MEDIUM |

### Cluster: Multiplayer Chat Message Handling

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004923C0 | stub | FUN_004923c0 | chatwin_invalidate | void | void | Calls FUN_005bd120 on this+8 (window handle). Triggers repaint. | LOW |
| 0x004923F0 | large | FUN_004923f0 | chatwin_handle_command | param_1, int msg_id | void | Switch on msg_id: 0x2b0/0x2b1 = send chat to specific civ (cycles through civs, skipping self/human/dead); 0x2b2-0x2b4 = load chat macros from "chatmac1.txt"/"chatmac2.txt"/"chatmac3.txt". Checks DAT_00655c16 (scenario flag), DAT_00655b07 (god_mode), DAT_00654c7a (MP flags). Uses civ treaty flags at civ+0xC0 offset. | HIGH |
| 0x0049275A | large | FUN_0049275a | chatwin_load_macro_file | filename, int* offset_ptr | void | Opens file (via Realloc/file-open chain), reads line at *offset_ptr into DAT_00679640 (global text buffer), advances offset by string length + 2. SEH protected. | MEDIUM |
| 0x00492868 | stub | FUN_00492868 | chatwin_macro_cleanup_a | void | void | SEH cleanup: calls FUN_005d7c6e (file close). | LOW |
| 0x0049287E | stub | FUN_0049287e | chatwin_macro_seh_restore | void | void | SEH frame restore (FS:[0] = saved). | LOW |
| 0x004929C0 | stub | Realloc (0x4929C0) | FRAMEWORK | param_1 | void | MFC library: CHtmlStream/CMemFile::Realloc. Calls FUN_005d8270 (file open). | HIGH |
| 0x00492A00 | stub | Realloc (0x492A00) | FRAMEWORK | void | void | MFC library: CHtmlStream/CMemFile::Realloc. Calls FUN_005d8622 (file seek). | HIGH |
| 0x00492A40 | stub | FUN_00492a40 | chatwin_file_read | void | void | Wrapper: calls FUN_005d881c (file read into buffer). | LOW |
| 0x00492A80 | stub | FUN_00492a80 | chatwin_file_get_count | void | void | Wrapper: calls FUN_005d898e (get line count). | LOW |
| 0x00492AB0 | stub | FUN_00492ab0 | chatwin_get_text_length | void | void | Sends WM_GETTEXTLENGTH (msg 0x2F47) to edit control at this+0x1c. | MEDIUM |
| 0x00492AE0 | stub | FUN_00492ae0 | chatwin_set_text | param_1 | void | Sends WM_SETTEXT (msg 0x3035) to edit control at this+0x1c. | MEDIUM |
| 0x00492B20 | stub | FUN_00492b20 | chatwin_set_selection | param_1, param_2 | void | Sends EM_SETSEL (msg 0x2DC6) to edit control at this+0x1c. | MEDIUM |

### Cluster: AI Goal/Threat Priority Lists

These functions manage two per-civ priority-sorted lists within the civ struct at stride 0x594:
- **List A** (civ+0x414): 48 entries (0x30), 6 bytes each: [x:short, y:short, type:byte, priority:sbyte]. These are the main AI continent goals (attack targets, city sites, etc.).
- **List B** (civ+0x534): 16 entries (0x10), 6 bytes each: same format. These are secondary/immediate AI goals.

Each entry stores a map coordinate (x,y), a goal type, and a signed priority value.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00492B60 | small | FUN_00492b60 | ai_negate_goal_priority | int civ_id, int slot_idx | void | Negates the priority byte (civ+0x419 in list A). Takes absolute value then stores negative. Flips goal from active to cancelled or vice versa. | MEDIUM |
| 0x00492C15 | large | FUN_00492c15 | ai_remove_goals_near | int civ_id, char type, x, y, int range | void | Iterates list B (16 entries). For entries matching type, computes distance (FUN_005ae31d). If distance <= range, clears entry (type=0xFF, priority=0). Used to remove obsolete goals near a location. | MEDIUM |
| 0x00492D18 | small | FUN_00492d18 | ai_shift_goals_down_a | int civ_id, int slot_idx | void | Recursive. Shifts list A entries down by one slot (insert space). Copies entry[i] to entry[i+1] for i >= slot_idx. Max index 0x2F (47). | MEDIUM |
| 0x00492DD0 | small | FUN_00492dd0 | ai_shift_goals_down_b | int civ_id, int slot_idx | void | Shifts list B entries down by one slot (iterative, reverse loop from 14 to slot_idx). | MEDIUM |
| 0x00492E60 | medium | FUN_00492e60 | ai_find_max_goal_priority | int civ_id, int x, int y, char type | int (max abs priority) | Searches all 48 entries of list A for matching (x, y, type). Returns maximum absolute value of priority found. | MEDIUM |
| 0x0049301B | large | FUN_0049301b | ai_add_goal_a | int civ_id, int x, int y, int type, char priority | void | Adds/updates entry in list A (48 slots). If exact match exists with higher priority, skips. If all slots full, finds insertion point by priority, shifts down, inserts. Also redirects nearby naval/air units (domain check via unit type role at DAT_0064b1ca) to the new goal with orders=0x0B (goto). Checks unit on same continent (FUN_005b8a81). Messages "WESHOT"/"WESAW" on spy detection. | HIGH |
| 0x004933F2 | medium | FUN_004933f2 | ai_add_goal_b | int civ_id, int x, int y, char type, char priority | void | Adds/updates entry in list B (16 slots). Same logic as ai_add_goal_a but smaller list, no unit redirection. | MEDIUM |
| 0x00493602 | large | FUN_00493602 | ai_decay_and_merge_goals | int civ_id | void | Turn maintenance: iterates list A, negates priorities of negative entries (decay), then moves valid entries from list B into list A via ai_add_goal_a. Merges short-term goals into long-term list. | MEDIUM |
| 0x0049376F | small | FUN_0049376f | ai_clear_goals_b | int civ_id | void | Clears all 16 entries of list B (sets type=0xFF, priority=0). | MEDIUM |

### Cluster: Civ Name/Title Lookup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00493B10 | small | FUN_00493b10 | get_civ_noun_name | int civ_id | char* | Returns civ noun name. If civ_id < 1 returns fallback string from LABELS.TXT. Uses leader_portrait_table (DAT_006554fc+0x30*style) index to LABELS.TXT, or fallback to custom name at DAT_0064bcfa + civ_id*0xF2. | MEDIUM |
| 0x00493BA6 | medium | FUN_00493ba6 | get_civ_leader_title | int civ_id | char* | Returns leader title string. Complex lookup through leader_portrait_table using civ style (civ+0x06), leader graphic (civ+0x15=govt_type), and portrait offset table. Falls back to custom name at civ_id*0xF2 + govt_type*0x18 offset. | MEDIUM |
| 0x00493C7D | small | FUN_00493c7d | get_civ_people_name | int civ_id | char* | Returns civ people/adjective name. Similar structure to get_civ_noun_name but uses DAT_00655504 offset into leader table. Fallback at DAT_0064bd12 + civ_id*0xF2. | MEDIUM |
| 0x00493D13 | small | FUN_00493d13 | get_civ_adjective_name | int civ_id | char* | Returns civ adjective. Uses DAT_00655506. Fallback at DAT_0064bd2a + civ_id*0xF2. | MEDIUM |

### Cluster: Diplomacy Advisor / Intelligence Screen (Multiplayer Knowledge)

These functions implement the "Intelligence" or "Foreign Advisor" screen that shows terrain/tech data about other civilizations. The advisor is a complex MFC dialog class (size ~0x108C) with sub-components for art, portraits, science trees, and military displays.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00493E50 | stub | FUN_00493e50 | intel_play_music | void | void | If DAT_0062ca38 (advisor active flag), calls FUN_0046e020 (play music) with DAT_0062ca48 (music track). | MEDIUM |
| 0x00493E83 | small | FUN_00493e83 | intel_show_initial | void | void | SEH protected. Creates CCommandLineInfo (FUN_0049621d), checks if valid (FUN_00496402), shows advisor (FUN_004965ff). Cleanup via ~CCommandLineInfo. | MEDIUM |
| 0x00493EEB | stub | FUN_00493eeb | intel_cleanup_cmdline | void | void | Destructor dispatch: ~CCommandLineInfo on stack object. | LOW |
| 0x00493F01 | stub | FUN_00493f01 | intel_seh_restore_a | void | void | SEH frame restore. | LOW |
| 0x00493F0F | large | FUN_00493f0f | intel_open_advisor | param_1, int civ_id | void | Main entry: opens intelligence advisor for civ_id. Allocates 0x108C-byte object (operator_new), initializes via FUN_004942a3 (intel_create_object), calls init_tile. Sets music track based on civ style + portrait. Loads "civ2_mk.dll" art resource. On success sets DAT_0062ca38=1 (active). | HIGH |
| 0x00494148 | small | FUN_00494148 | intel_close_advisor | void | void | Closes intelligence advisor. Clears DAT_0062ca38, destroys object, stops music, restores palette. | MEDIUM |
| 0x004941EE | small | FUN_004941ee | intel_play_animation | int anim_type | void | Plays animation (types 2,3,4) in advisor window. Checks animation bounds from DAT_0061d2b0 table indexed by civ style byte at obj+0x1084. Sets anim type at obj+0x1088. | MEDIUM |
| 0x004942A3 | small | FUN_004942a3 | intel_create_object | void (this=ECX) | int (this) | Constructor for intelligence advisor object. Chains multiple sub-constructors (dialog, surface, palette components). Initializes +0x1088 (animation state) = 0. | MEDIUM |
| 0x004943C9 | small | FUN_004943c9 | intel_destroy_object | void | void | Destructor for intelligence advisor. Calls 5 sub-destructors in reverse order (FUN_0049444f through FUN_0049449a). Clears DAT_0062ca40 (video active flag). | MEDIUM |
| 0x0049444F | stub | FUN_0049444f | intel_dtor_video | void | void | Sub-destructor: FUN_005dd1a0 (video cleanup). | LOW |
| 0x0049445E | stub | FUN_0049445e | intel_dtor_surface | void | void | Sub-destructor: ~_Timevec on obj+0x658 (surface). | LOW |
| 0x0049446D | stub | FUN_0049446d | intel_dtor_palette_a | void | void | Sub-destructor: FUN_005c656b (palette cleanup). | LOW |
| 0x0049447C | stub | FUN_0049447c | intel_dtor_font | void | void | Sub-destructor: FUN_005bd915 (font cleanup). | LOW |
| 0x0049448B | stub | FUN_0049448b | intel_dtor_dialog_a | void | void | Sub-destructor: thunk_FUN_0044cba0 (dialog cleanup). | LOW |
| 0x0049449A | stub | FUN_0049449a | intel_dtor_dialog_b | void | void | Sub-destructor: thunk_FUN_0044ca60 (dialog cleanup). | LOW |
| 0x004944AD | stub | FUN_004944ad | intel_seh_restore_b | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - init_tile and Sub-Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004944BB | large | init_tile | init_tile | byte param_1, byte param_2 | int (1=success,0=fail) | Already named. Master initialization for intelligence advisor art. param_2 = civ index, param_1 = mode. Loads "civ2_mk.dll", determines civ style (param_2 -> leader_graphic via civ+0x06 -> DAT_0064c6a6). Calls 6 sub-initializers in sequence with error MessageBox on each failure: init_tile, init_background, init_main_art, init_military, init_science, init_portrait. Optionally loads video (DAT_00655aea bit 0x20). | HIGH |
| 0x00494704 | small | FUN_00494704 | intel_setup_display | void | void | Post-initialization display setup. Calls palette/surface prep, sets video dimensions from DAT_0061d2a8 table (civ style indexed), starts music via FUN_0046e020. | MEDIUM |
| 0x004947F0 | small | FUN_004947f0 | intel_teardown_display | void | void | Tears down display surfaces, resets scroll/palette, clears video pointers. | MEDIUM |
| 0x0049488E | stub | FUN_0049488e | intel_init_tile_sprites | void | bool | Initializes 64x64 tile sprites. Calls FUN_005bd65c(0x40,0x40), loads resource 299 via FUN_005bf5e1 with 10 cols, 0x20 rows. | MEDIUM |
| 0x004948E6 | stub | FUN_004948e6 | intel_init_background | void | int (always 1) | Sets up background surface. Creates render surface via FUN_005c5fc4 at obj+0xC0/0xC4 dimensions + 5. Initializes text area at obj+0x1dc. | MEDIUM |
| 0x00494949 | medium | FUN_00494949 | intel_init_main_art | void | void | Loads main advisor art. Gets civ style, loads resource (civ_style*0x6d + 200+1) with 10 cols, 0xEC rows. Creates background bitmap (640x480 scaled). Loads civ flag colors. SEH protected. | MEDIUM |
| 0x00494B3A | stub | FUN_00494b3a | intel_art_cleanup_palette | void | void | Cleanup: FUN_005c656b (palette). | LOW |
| 0x00494B50 | stub | FUN_00494b50 | intel_art_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - Military Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00494B5F | large | FUN_00494b5f | intel_init_military | void | void | Initializes military strength panel. Uses DAT_00655c22 (civ era table, indexed by civ byte at obj+0x1085) to determine military icon count. Loads resource 0xD7 with 10 cols, 0xEC rows. Renders military unit icons at position (0x2D, 0x82) stepping by 0x1F pixels. | MEDIUM |
| 0x00494D71 | stub | FUN_00494d71 | intel_mil_cleanup_font | void | void | Cleanup: FUN_005bd915 (font). | LOW |
| 0x00494D7D | stub | FUN_00494d7d | intel_mil_cleanup_palette | void | void | Cleanup: FUN_005c656b (palette). | LOW |
| 0x00494D89 | stub | FUN_00494d89 | intel_mil_cleanup_string | void | void | Cleanup: FUN_005cde4d (CString destructor). | LOW |
| 0x00494D9F | stub | FUN_00494d9f | intel_mil_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - Tech Tree Counting

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00494DAE | small | FUN_00494dae | count_tech_depth | int tech_id | void | Recursive tech prerequisite counter. Follows DAT_0062768e (tech_prereq_chain, stride 0x10) up to 2 prerequisites per tech. Increments DAT_0062ca5c (global counter, max 0x65=101). Used to compute tech tree depth for science advisor display sorting. | HIGH |

### Cluster: Intelligence Advisor - Science Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00494E2A | xlarge | FUN_00494e2a | intel_init_science | void | void | 3512 bytes. Builds science/tech tree panel. Iterates all 100 techs (FUN_004bd9f0 = has_tech). Sorts top 6 by depth (insertion sort into local_490[12] pairs). For each tech: looks up name (DAT_00627684 tech table), calls CharUpperA, word-wraps into 58-char (0x3A) boxes. Renders tech names with shadow (color 10 = black, plus civ color). Positions at (0x213, 0x89) with 0x1F vertical spacing. Creates render contexts via FUN_005cedad. Checks for espionage visibility (treaty flag 0x80 at civ+0xC0). | HIGH |
| 0x00495BE2 | stub | FUN_00495be2 | intel_sci_cleanup_font | void | void | Cleanup: FUN_005bd915. | LOW |
| 0x00495BEE | stub | FUN_00495bee | intel_sci_cleanup_palette | void | void | Cleanup: FUN_005c656b. | LOW |
| 0x00495BFA | stub | FUN_00495bfa | intel_sci_cleanup_strings | void | void | Cleanup: _eh_vector_destructor_iterator_ for 5 CString objects. | LOW |
| 0x00495C10 | stub | FUN_00495c10 | intel_sci_cleanup_array | void | void | Cleanup: thunk_FUN_0043c520 (array destructor). | LOW |
| 0x00495C26 | stub | FUN_00495c26 | intel_sci_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - Portrait Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00495C35 | medium | FUN_00495c35 | intel_init_portrait | void | void | Loads leader portrait art. Uses DAT_0064ca92 (civ+0x3F2 = portrait index, indexed by civ byte). Loads resource (portrait_idx + 0xDC) with 10 cols, 0xEC rows. Creates 42x64 sprite area, renders portrait at (0xD0, 0x39). | MEDIUM |
| 0x00495DCF | stub | FUN_00495dcf | intel_port_cleanup_font | void | void | Cleanup: FUN_005bd915. | LOW |
| 0x00495DDB | stub | FUN_00495ddb | intel_port_cleanup_palette | void | void | Cleanup: FUN_005c656b. | LOW |
| 0x00495DE7 | stub | FUN_00495de7 | intel_port_cleanup_string | void | void | Cleanup: FUN_005cde4d. | LOW |
| 0x00495DFD | stub | FUN_00495dfd | intel_port_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - Video (King's Animation)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00495E0C | large | FUN_00495e0c | intel_init_video | void | void | Loads Video for Windows animation. Builds path "civ2_kings\\" + civ style letter (from PTR_DAT_0062c9e0 indexed by leader_graphic) + ".avi". Loads via FUN_005dd377 (AVI open). On VFWNOTREGISTERED error, shows message. Sets up playback surface at dimensions from DAT_0061d200 table. Loads 146x100 sprite palette. | HIGH |
| 0x00496100 | stub | FUN_00496100 | intel_vid_cleanup_palette | void | void | Cleanup: FUN_005c656b. | LOW |
| 0x00496116 | stub | FUN_00496116 | intel_vid_seh_restore | void | void | SEH frame restore. | LOW |
| 0x00496125 | medium | FUN_00496125 | intel_play_video_frame | void | void | Plays next video frame. If obj+0x1088 (animation type) != 0, plays specific animation segment using DAT_0061d2a8/0x2AC table (8-byte entries per type, indexed by civ style * 0x28). Plays music track from DAT_0062ca48[type]. Otherwise plays idle animation from DAT_0061d2b0/0x2B4. | MEDIUM |

### Cluster: Intelligence Advisor - Dialog Window Construction

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0049621D | small | FUN_0049621d | intel_dialog_ctor | void (this=ECX) | ptr (this) | Constructor for intelligence dialog base class. Chains sub-constructors, sets vtable to PTR_FUN_0061d6c0, initializes +0x77=0 and +0x78=0 (word-sized fields). | MEDIUM |
| 0x0049632A | small | ~CCommandLineInfo | FRAMEWORK | this | void | MFC library: CCommandLineInfo::~CCommandLineInfo. Destructor with 4 sub-cleanups. | HIGH |
| 0x004963A5 | stub | FUN_004963a5 | intel_dialog_dtor_timevec | void | void | Destructor: ~_Timevec on obj+0x1D4. | LOW |
| 0x004963B4 | stub | FUN_004963b4 | intel_dialog_dtor_member_a | void | void | Destructor: thunk_FUN_0040f570. | LOW |
| 0x004963C3 | stub | FUN_004963c3 | intel_dialog_dtor_member_b | void | void | Destructor: thunk_FUN_0040f570. | LOW |
| 0x004963D2 | stub | FUN_004963d2 | intel_dialog_dtor_font | void | void | Destructor: FUN_005bd915 (font). | LOW |
| 0x004963E1 | stub | FUN_004963e1 | intel_dialog_dtor_dialog | void | void | Destructor: thunk_FUN_0044cba0. | LOW |
| 0x004963F4 | stub | FUN_004963f4 | intel_dialog_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Intelligence Advisor - Main Window Setup and Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00496402 | small | FUN_00496402 | intel_create_main_window | void | int (always 1) | Creates the main intelligence advisor window. Sets up background surface via FUN_005bb4ae using DAT_0063359c (UI scale factor) for dimensions. Creates OK/Cancel buttons via FUN_004964b3. Registers click handler (FUN_00496c3c). Renders grid via FUN_004966c4. | MEDIUM |
| 0x004964B3 | medium | FUN_004964b3 | intel_create_buttons | void | void | Creates OK (id=0x65) and Cancel (id=100=0x64) buttons positioned at bottom of dialog. Button rects calculated from DAT_0063359c/DAT_00633598 (scale factors). Registers FUN_00496ecf as button handler. Label " Cancel" from string literal. | HIGH |
| 0x004965FF | small | FUN_004965ff | intel_show_results | void | void | Shows advisor results after dialog closes. Destroys button controls, applies save format version check (DAT_00655b02 > 2), copies selected portrait index to civ data (civ+0x3F2). | MEDIUM |
| 0x004966C4 | xlarge | FUN_004966c4 | intel_render_grid | void | void | 1400 bytes. Renders the 7x3 = 21-slot grid of civilization portraits/info. Uses DAT_0063359c/DAT_00633598 (UI scaling). Creates bordered cells (0x5A wide x 0x6E tall + border). Loads art resource (0xD3 - has_female_leader offset). Renders title text with shadow (palette 0x12 dark, 0x29 light). String from LABELS.TXT at DAT_00628420+0x4A8. Loads "mk.dll" art. | HIGH |
| 0x00496C3C | large | FUN_00496c3c | intel_grid_click | int x, int y | void | Handles mouse click on the 7x3 grid. Converts pixel coords to grid index: col = (x - DAT_0063359c/2) / (DAT_0063359c + 0x5A), row = (y - DAT_00633598) / (DAT_0063359c + 0x6E). Updates selection at obj+0x1E0. Redraws old/new cell borders (highlight color 0x5E vs normal DAT_00633594/DAT_00633590). | MEDIUM |
| 0x00496E5D | small | FUN_00496e5d | intel_grid_dblclick | param_1, int y | void | Handles double-click on grid. Calls intel_grid_click, then if click was in valid area (above bottom buttons), triggers OK button (FUN_00496ecf with id=100). | MEDIUM |
| 0x00496ECF | small | FUN_00496ecf | intel_button_handler | int button_id | void | Button click handler. If id=0x65 (OK): stores selected grid index to obj+0x1E4, adjusts by +0x15 (21) if leader_portrait_table has female leader flag. Invalidates cache. id=100 (Cancel) handled elsewhere. | MEDIUM |

### Cluster: Advisor Object Lifecycle / Surface Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00497BF0 | stub | FUN_00497bf0 | intel_delete_object | byte flags | void* (this) | Calls intel_destroy_object (FUN_004943c9), conditionally operator_delete(this) if flags&1. Scalar deleting destructor pattern. | MEDIUM |
| 0x00497C40 | stub | FUN_00497c40 | intel_set_palette_entries | void | void | Wrapper: calls FUN_005dea9e (set palette/color entries for advisor art). | LOW |
| 0x00497C90 | stub | FUN_00497c90 | intel_get_client_rect | void (this=ECX) | int (this+0x24) | Returns pointer to client rect at this+0x24. Simple accessor. | LOW |
| 0x00497CC0 | stub | FUN_00497cc0 | intel_set_scroll_info | param_1 | void | Calls FUN_005bc3bf on this+8 with param_1. Sets scrollbar info for text panel. | LOW |
| 0x00497D00 | stub | FUN_00497d00 | intel_set_font_size | param_1 | void | Calls FUN_005bd248 on this+8 with param_1. Sets font size for text panel. | LOW |
| 0x00497D40 | small | FUN_00497d40 | intel_create_button | param_1, id, rect, style, label | void | Creates a button control. Stores style at this+0x34, sets callback PTR_DAT_00637e60 at this+0x38, delegates to thunk_FUN_0040f680. | MEDIUM |

### Cluster: File I/O Helpers (Save/Load Auxiliary)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00497DA0 | small | FUN_00497da0 | read_string_from_file | char* buf, FILE* fp | char* (buf) | Reads up to 0x4F (79) bytes from file until null terminator. Discards the next byte (0x1A terminator). Returns buffer pointer. | MEDIUM |
| 0x00497E0F | small | FUN_00497e0f | write_string_to_file | char* str, FILE* fp | void | Writes null-terminated string to file character by character, then writes 0x1A (EOF marker). | MEDIUM |

### Cluster: Sound/Music Buffer Management

These functions manage a sound buffer structure: [+0=id_byte, +1=owned_flag, +4=handle, +8=lock_ptr, +0xC=offset:ushort, +0xE=capacity:ushort, +0x10=remaining:ushort].

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00497EA0 | medium | FUN_00497ea0 | sound_buf_create | byte* buf, id, ushort size | bool | Creates sound buffer. If existing handle at +4, unlocks (+8) and releases (+4). Allocates new buffer of given size via FUN_005dce4f. Sets owned_flag=1, offset=0, remaining=size, capacity=size. On failure calls error handler FUN_00589ef8. | MEDIUM |
| 0x00497FA0 | small | FUN_00497fa0 | sound_buf_init_external | byte* buf, id, handle, lock_ptr, ushort size | void | Initializes sound buffer with externally-provided handle and lock pointer. Sets owned_flag=0 (not owned). | MEDIUM |
| 0x00497FF3 | small | FUN_00497ff3 | sound_buf_lock | byte* buf | int (0) | Locks sound buffer. If +8 (lock_ptr) is null, acquires lock via FUN_005dcdf9. On failure calls error handler. | MEDIUM |
| 0x0049805E | stub | FUN_0049805e | sound_buf_clear_ptrs | int buf | void | Clears handle (+4) and lock (+8) to 0. | LOW |
| 0x00498082 | stub | FUN_00498082 | sound_buf_reset_offset | int buf | void | Resets current offset (+0xC) to 0, restores remaining (+0x10) from capacity (+0xE). | LOW |
| 0x004980A9 | small | FUN_004980a9 | sound_buf_unlock | int buf | void | Unlocks sound buffer. If +8 != 0 and +4 != 0, calls FUN_005dce29 (unlock). Sets +8=0. | MEDIUM |
| 0x004980EC | small | FUN_004980ec | sound_buf_destroy | int buf | void | Full cleanup: if owned (+1), unlocks and releases handle via FUN_005dce96. Zeros offset/remaining/capacity. | MEDIUM |
| 0x00498159 | small | FUN_00498159 | sound_buf_consume | byte* buf, ushort bytes | int (data_ptr) | Consumes `bytes` from buffer. Returns pointer to current offset within locked data. Advances offset, decreases remaining. Validates bytes <= remaining. | MEDIUM |

### Cluster: Save/Load Helpers (Secondary)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00498310 | small | FUN_00498310 | mp_check_password_or_set | int player_id | void | Multiplayer password check. Decrypts passwords (FUN_00498943), copies existing password for player_id from DAT_00654b74 + id*0x20, re-encrypts (FUN_004988b8). If password is empty, calls FUN_0049836a to set one. | HIGH |
| 0x0049836A | large | FUN_0049836a | mp_set_password | int player_id | void | Full password set dialog. If password exists: prompts for current password (verify via strcmp), then new password. If none exists: prompts for new password directly. Uses "PASSWORD0" through "PASSWORD4" LABELS.TXT string references. Stores at DAT_00654b74 + id*0x20. Clears DAT_00673d18[id] (password-set flags). | HIGH |
| 0x004985D0 | stub | FUN_004985d0 | mp_pwd_cleanup_a | void | void | Cleanup: thunk_FUN_0059df8a (dialog). | LOW |
| 0x004985E6 | stub | FUN_004985e6 | mp_pwd_seh_restore_a | void | void | SEH frame restore. | LOW |
| 0x004985F4 | medium | FUN_004985f4 | mp_verify_password | int player_id | void | Password verification dialog. Shows "PASSWORD1" prompt, compares input to stored password via strcmp. On mismatch shows "PASSWORD0" error. Uses DAT_00635a3c callback for dialog. | HIGH |
| 0x0049875F | stub | FUN_0049875f | mp_verify_cleanup | void | void | Cleanup: thunk_FUN_0059df8a. | LOW |
| 0x00498775 | stub | FUN_00498775 | mp_verify_seh_restore | void | void | SEH frame restore. | LOW |

### Cluster: Password Encryption/Decryption

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00498784 | small | FUN_00498784 | mp_init_passwords | void | void | Initializes all 8 player password slots. Fills DAT_00654b74 (256 bytes = 8 * 32) with random bytes. Clears first byte of each 32-byte slot (empty password marker). Zeros DAT_00673d18 and DAT_00673d38 (password flags, 8 ints each). Encrypts result. | HIGH |
| 0x0049882B | small | FUN_0049882b | mp_update_password_flags | void | void | Decrypts password block, checks each slot: if first byte is non-zero, sets DAT_00673d18[i]=1 and DAT_00673d38[i]=1 (password exists flags). Re-encrypts. | MEDIUM |
| 0x004988B8 | small | FUN_004988b8 | mp_encrypt_passwords | void | void | Encrypts 256-byte password block (DAT_00654b74). XOR with index, bit rotation (>>3, <<5), chained from previous byte. Simple substitution cipher. | HIGH |
| 0x00498943 | small | FUN_00498943 | mp_decrypt_passwords | void | void | Decrypts 256-byte password block. Reverse of encrypt: XOR with index, bit rotation (<<3, >>5), reverse iteration. | HIGH |

### Cluster: Multiplayer Password/Turn Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004989D3 | small | FUN_004989d3 | mp_prepare_password_dialog | int dialog_obj, int player_id, label_id | void | Prepares password dialog text. Copies civ name from DAT_0064bcfa + player*0xF2, appends LABELS.TXT string (label_id via FUN_004af14b). Allocates text buffer from sound_buf_consume at dialog+0x254, stores pointer at dialog+0x134. | MEDIUM |
| 0x00498A5C | small | FUN_00498a5c | mp_handle_player_turn | int player_id | int (1=proceed, 0=blocked) | Turn handler for multiplayer. If no password set (DAT_00673d18[id]=0): for save version 2, shows password set dialog; otherwise marks DAT_00628044=1. If password set: loops calling mp_verify_password until success or cancellation. Returns 0 only if player explicitly cancels. | HIGH |

### Cluster: City Build Preferences

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00498D40 | medium | load_city_preferences | load_city_preferences | void | void | Already named. Parses "CITYPREF.TXT". Reads NODEFEND section (sets DAT_0062ccc4=1 if found). Reads AUTOBUILD section: matches improvement names (via strcmpi against DAT_0064c488 improvement table, IDs 1-38) and stores up to 32 (0x20) entries in DAT_00673d70 array. Count in DAT_0062ccc0. | HIGH |

### Cluster: AI City Production Advisor (Master)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00498E8B | xlarge | FUN_00498e8b | ai_choose_city_production | int city_id, int* out_unit_choice, int* out_wonder_choice | int (production_id) | **29400 bytes. THE AI city production decision function.** The most important function in this block. Given a city, evaluates all possible buildings (1-38), wonders (39-66), and unit types (0-61) and returns the best production choice. Negative return = build improvement/wonder (-id); positive = build unit (type_id). Complex scoring system considers: continent status (DAT_0064ca32 via civ+0x392), threat level (ai goals list), food/shield/trade surplus (DAT_006a65c8/cc/d0), happiness state (DAT_006a6550/65a8), military needs, tech depth, diplomacy (treaty flags at civ+0xC0), government type (civ+0x15), era (DAT_00655c22), city size, corruption, walls, improvements already built (FUN_0043d20a=has_building), wonder availability (FUN_004c03ae=can_build_wonder), unit buildability (FUN_004bfe5a=can_build_unit). Handles special cases: barbarian cities (civ=0), settler production for expansion, spy/diplomat detection ("WESHOT"/"WESAW"), space race components, CITYPREF.TXT overrides, capitalization/wealth conversion, and the "NODEFEND" preference. Uses FUN_005adfa0 (clamp) extensively for score normalization. | HIGH |

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 94**

| Category | Count | Description |
|----------|-------|-------------|
| Game Logic (AI) | 12 | AI goal management, production advisor, tech depth counting |
| Game Logic (MP) | 10 | Password encrypt/decrypt, turn management, chat messaging |
| Intelligence Advisor UI | 38 | Dialog construction, art loading, portrait/science/military panels, video playback |
| Civ Name Lookup | 4 | Noun/adjective/people/leader title resolution |
| Sound Buffer | 8 | Buffer create/destroy/lock/unlock/consume |
| File I/O | 4 | String read/write, macro file loading |
| City Preferences | 1 | CITYPREF.TXT parser |
| Framework (MFC/CRT) | 3 | CSplitterWnd::IsTracking, Realloc x2, ~CCommandLineInfo |
| SEH Cleanup Stubs | 14 | Exception handler frame restores, sub-destructors |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00498e8b (`ai_choose_city_production`)** — 29400 bytes. THE master AI production decision function. Evaluates every possible build choice for a city using dozens of heuristics. This is the single most important AI logic function in the entire block and likely one of the largest in the game. Essential for understanding AI behavior.

2. **FUN_0049301b (`ai_add_goal_a`)** — 958 bytes. Adds entries to the AI's 48-slot priority goal list and redirects military units to new threats. Contains the spy detection logic ("WESHOT"/"WESAW" messages). Core to AI strategic planning.

3. **FUN_004906fd (`chatwin_draw_terrain_info`)** — 5344 bytes. Renders the terrain statistics panel using the full terrain resource table (DAT_00627cc8). Shows food/shield/trade yields, irrigation/mining bonuses. Important for understanding how game data is presented to players.

4. **FUN_00494e2a (`intel_init_science`)** — 3512 bytes. Builds the science advisor tech tree display. Contains the tech sorting algorithm (by prerequisite depth) and text rendering with word-wrap. Shows how the game displays tech knowledge to players.

5. **FUN_004966c4 (`intel_render_grid`)** — 1400 bytes. Renders the 7x3 leader portrait grid for the intelligence advisor. Contains the complete UI layout algorithm with scaling support (DAT_0063359c).

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence | Confidence |
|---------|--------------|----------|------------|
| DAT_0062ca34 | intel_advisor_object_ptr | Allocated as 0x108C bytes, checked throughout advisor lifecycle | HIGH |
| DAT_0062ca38 | intel_advisor_active_flag | Set to 1 when advisor opens, 0 when closes, checked before music/render | HIGH |
| DAT_0062ca40 | intel_video_active_flag | Set by FUN_00495e0c (video init), checked before video render calls | HIGH |
| DAT_0062ca44 | intel_music_track_id | Computed from civ style + portrait, passed to FUN_0046e020 (play music) | HIGH |
| DAT_0062ca48 | intel_music_track_base | Base music track number, array of 4 (base + animation variants) | HIGH |
| DAT_0062ca5c | tech_depth_counter | Global accumulator for recursive tech prerequisite counting | HIGH |
| DAT_0062ccc0 | autobuild_pref_count | Count of entries in CITYPREF.TXT AUTOBUILD list, max 0x20 | HIGH |
| DAT_0062ccc4 | nodefend_pref_flag | Set to 1 if CITYPREF.TXT contains NODEFEND section | HIGH |
| DAT_00654b74 | mp_password_block | 256-byte encrypted password storage, 8 slots of 32 bytes | HIGH |
| DAT_00673d18 | mp_password_set_flags | 8 ints, 1 = password is set for that player | HIGH |
| DAT_00673d38 | mp_password_active_flags | 8 ints, mirrors password_set_flags, used for turn validation | MEDIUM |
| DAT_00673d70 | autobuild_pref_list | Array of improvement IDs from CITYPREF.TXT AUTOBUILD section | HIGH |
| DAT_006a7434 | chatwin_item_count | Count of items in chat window list | MEDIUM |
| DAT_006a74bc | chatwin_item_ids | Array of item IDs in chat window list | MEDIUM |
| DAT_00628044 | mp_turn_proceed_flag | Set to 1 to allow turn to proceed, 0 to block | MEDIUM |
| DAT_006a677c | chatwin_enabled_flag | Must be non-zero for chat window selection to work | MEDIUM |
| DAT_0062c990 | chat_send_civ_index_a | Cycling index for "send to civ" in chat command 0x2b0 | MEDIUM |
| DAT_0062c994 | chat_send_civ_index_b | Cycling index for "send to civ" in chat command 0x2b1 | MEDIUM |
| DAT_0063359c | ui_border_width | UI scaling factor used throughout advisor grid layout | MEDIUM |
| DAT_00633598 | ui_header_height | UI header/toolbar height for advisor windows | MEDIUM |
| DAT_00633588 | ui_border_thickness | Border thickness for grid cell borders | MEDIUM |
| DAT_00673b30 | tech_depth_cache | 100-entry int array caching tech prerequisite depth values | HIGH |
