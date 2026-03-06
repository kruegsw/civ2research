# Phase 1 Audit: block_004D0000 (0x004D0000 - 0x004DFFFF)

## Overview
This block contains two major subsystems:
1. **Wonder Movies / Civilization Advance Animation Window** (0x004D007E - 0x004D6F58) — The animated "throne room" / wonder movie dialog that plays between turns
2. **Rules Editor / Cheat Menu** (0x004D8AF0 - 0x004DA9E2) — The in-game improvement/rules editor (accessible via cheat mode)
3. **Diplomacy / Parley Transaction System** (0x004DB210 - 0x004DF10F) — Multiplayer negotiation packet building, description generation, and execution of diplomatic trades

---

### Cluster: String Trim / Utility

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004D007E | stub | FUN_004d007e | trim_leading_whitespace | char* str | void | Calls thunk to normalize string, then strips leading spaces/tabs by copying trimmed content back | MEDIUM |

---

### Cluster: Wonder Movie / Advance Animation Window

This is the animated wonder-movie / throne-room dialog system. DAT_0062e2d0 is the global pointer to the active wonder window object. The window object has fields at offsets like +0x1cc (civ id), +0xae0 (display mode: 0=normal, 1=with_button, 2=video_transition, 3=wonder_movie), +0x8f0 (text_scroll_done flag), +0x62c/+0x630/+0x634 (timer handles), +0x638 (text buffer), +0x8b8/+0x8bc (text cursor x/y), +0x8c0 (text offset), +0x1db4 (newline flag), +0x1db8 (star particle array for wonder movie).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004D0160 | stub | FUN_004d0160 | wonder_win_timer_check | void | void | Checks DAT_006ad698 flag and time delta (0x4b1=1201 ticks); invalidates wonder window cache if elapsed | MEDIUM |
| 004D01AE | stub | FUN_004d01ae | load_civ_power_values | int civ_id | void | Loads 6 shorts from civ[civ_id]+0x08 (offset 0x0064caa8 = civ base + 8) into DAT_006a5b10 temp array; these are civ ranking/power values used by the advance animation | MEDIUM |
| 004D0208 | medium | FUN_004d0208 | show_wonder_or_advance | uint param | void | Main entry: shows wonder movie (negative param) or advance animation (positive param). Calls wonder_win_init, wonder_win_create, then dispatches to show_advance_animation or show_wonder_movie | HIGH |
| 004D0314 | stub | FUN_004d0314 | wonder_win_cleanup_thunk | void | void | Thunk calling wonder_win_destructor | LOW |
| 004D032A | stub | FUN_004d032a | wonder_win_seh_epilog_1 | void | void | SEH exception handler epilog (restores FS chain) | LOW |
| 004D0339 | medium | FUN_004d0339 | show_between_turns_advance | int civ_id | void | Shows the between-turns advance screen for the current player only (checks DAT_006d1da0 == civ_id). Calls wonder_win_init, wonder_win_create, then show_advance_between_turns | MEDIUM |
| 004D041A | stub | FUN_004d041a | wonder_win_cleanup_thunk_2 | void | void | Thunk calling wonder_win_destructor | LOW |
| 004D0430 | stub | FUN_004d0430 | wonder_win_seh_epilog_2 | void | void | SEH epilog | LOW |
| 004D043F | medium | FUN_004d043f | wonder_win_draw_title | uint4 civ_id | void | Draws title text on wonder window: civ name, separator " S S ", leader name, and labels. Uses draw_city_name (0x0040bbe0), SetRect for 0x27f x 0x28 rect | HIGH |
| 004D0517 | large | FUN_004d0517 | wonder_win_init | uint4 civ_id | int(this) | Constructor/initializer for the wonder window object. Initializes CString members at offsets 0x93c-0xaa4, sets up surfaces, creates render context. Stores civ_id at +0x1cc. Sets DAT_0062e2d0=this. SetRect(+0x1e4, 10, 0x14, 300, 0x1df) | HIGH |
| 004D08B0 | large | FUN_004d08b0 | wonder_win_destructor | void | void | Destructor: frees 3 timer surfaces at +0x634/+0x62c/+0x630 via FUN_005d2004, destroys CString members in reverse order, clears DAT_0062e2d0=0 | HIGH |
| 004D0A56 | stub | FUN_004d0a56 | wonder_dtor_step_0e | void | void | Destructor step: calls close_dialog thunk | LOW |
| 004D0A65 | stub | FUN_004d0a65 | wonder_dtor_step_0d | void | void | Destructor step: destroy surface | LOW |
| 004D0A74 | stub | FUN_004d0a74 | wonder_dtor_step_0c | void | void | Destructor step: destroy surface | LOW |
| 004D0A83 | stub | FUN_004d0a83 | wonder_dtor_step_0b | void | void | Destructor step: destroy surface | LOW |
| 004D0A92 | stub | FUN_004d0a92 | wonder_dtor_step_0a | void | void | Destructor step: destroy surface | LOW |
| 004D0AA1 | stub | FUN_004d0aa1 | wonder_dtor_step_09 | void | void | Destructor step: destroy surface | LOW |
| 004D0AB0 | stub | FUN_004d0ab0 | wonder_dtor_step_08 | void | void | Destructor step: destroy surface | LOW |
| 004D0ABF | stub | FUN_004d0abf | wonder_dtor_step_07 | void | void | Destructor step: destroy surface | LOW |
| 004D0ACE | stub | FUN_004d0ace | wonder_dtor_step_06 | void | void | Destructor step: destroy bitmap object | LOW |
| 004D0ADD | stub | FUN_004d0add | wonder_dtor_step_05 | void | void | Destructor step: free string alloc | LOW |
| 004D0AEC | stub | FUN_004d0aec | wonder_dtor_step_04 | void | void | Destructor step: free string alloc | LOW |
| 004D0AFB | stub | FUN_004d0afb | wonder_dtor_step_03 | void | void | Destructor step: free string alloc | LOW |
| 004D0B0A | stub | FUN_004d0b0a | wonder_dtor_step_02 | void | void | Destructor step: destroy critical section | LOW |
| 004D0B19 | stub | FUN_004d0b19 | wonder_dtor_step_01 | void | void | Destructor step: destroy _Timevec at +500 | LOW |
| 004D0B28 | stub | FUN_004d0b28 | wonder_dtor_step_00 | void | void | Destructor step: final cleanup | LOW |
| 004D0B37 | stub | FUN_004d0b37 | wonder_dtor_base | void | void | Destructor step: base class cleanup | LOW |
| 004D0B4A | stub | FUN_004d0b4a | wonder_win_seh_epilog_3 | void | void | SEH epilog | LOW |
| 004D0B58 | large | FUN_004d0b58 | wonder_win_create | void | uint4 | Creates the wonder window: loads "ss.dll", calls recalc for civ, checks pollution (DAT_006ad0ec) to set mode 1 or mode 3, creates dialog with FUN_005bf5e1(499,...), sets up buttons. Returns 1 on success, 0 on failure | HIGH |
| 004D0D64 | medium | FUN_004d0d64 | wonder_win_create_dialog | void | bool | Creates the actual dialog window: sets up surfaces (0x800 flags), creates child window (FUN_005bf5e1 with id 499), registers event handlers for keypresses | HIGH |
| 004D0EA6 | xlarge | FUN_004d0ea6 | show_advance_animation | void | void | Main advance animation display: loads civ power values, calls build_advance_scene, renders buttons, sets up timers, enters event loop (EnableStackedTabs/message pump), handles mode transitions (mode 2 = video transition to wonder movie) | HIGH |
| 004D138B | stub | FUN_004d138b | advance_anim_dtor_surface | void | void | Cleanup: destroy surface | LOW |
| 004D1397 | stub | FUN_004d1397 | advance_anim_dtor_bitmap | void | void | Cleanup: destroy bitmap | LOW |
| 004D13AA | stub | FUN_004d13aa | advance_anim_seh_epilog | void | void | SEH epilog | LOW |
| 004D13B8 | xlarge | FUN_004d13b8 | show_advance_between_turns | void | void | Between-turns version of advance animation: only runs for current_player, checks mode!=3, builds scene, renders, enters event loop. Can recursively call show_advance_animation if mode transitions to 2 (video) | MEDIUM |
| 004D1725 | small | FUN_004d1725 | show_wonder_movie | void | void | Shows wonder movie: sets mode to 2, calls play_wonder_video, then transitions to show_advance_animation with mode 3 | HIGH |
| 004D17BF | xlarge | FUN_004d17bf | build_advance_scene | void | void | 12822-byte monster function. Builds the entire advance/throne-room animation scene. Contains massive hardcoded sprite coordinate tables (7 room sections + ~80 decoration objects). Each object has: [type, threshold, x, y, w, h, sprite_id]. Checks civ power values against thresholds to select sprites. Creates render contexts (FUN_005cedad) and blits (FUN_005cef31). Uses FUN_005bf5e1 for dialog creation with sequential IDs (0x1b9, 0x1e0, 0x1c7, etc. for 11 room layers) | HIGH |
| 004D49D5-004D4A56 | stub(x12) | FUN_004d49d5..4a56 | build_scene_dtor_step_N | void | void | 12 destructor steps for build_advance_scene cleanup — each calls FUN_005bd915 (destroy bitmap) | LOW |
| 004D4A6C | stub | FUN_004d4a6c | build_scene_seh_epilog | void | void | SEH epilog | LOW |
| 004D4A7B | large | FUN_004d4a7b | build_wonder_info_text | void | void | Builds the wonder window info text at +0x638. Iterates 6 civ ranking categories (DAT_0064caa8 + civ*0x594), formats values with labels. Shows gold (DAT_0064caae), approval rating (DAT_006ad0f0), population (DAT_006ad0e8), land area (DAT_006ad0e4 div/mod 10), GNP (DAT_006ad0dc), pollution (DAT_006ad0ec). Uses text builder functions (004af122=append_string, 004af1d5=append_int, etc.) | HIGH |
| 004D4FD1 | large | FUN_004d4fd1 | wonder_win_draw_next_char | int skip_if_ready | bool | Draws the next character of the info text (typewriter effect). Handles newlines, colons (reset highlight), end-of-text (draws pollution bar with color: green <0x28, yellow <0x4b, red >=0x4b). Returns true if more chars remain | HIGH |
| 004D53AB | large | FUN_004d53ab | wonder_win_draw_buttons | void | void | Draws "Lancer"/"Starten" buttons (language-dependent, DAT_00628064 = language id: 0=English, 1=French, 2=German) with 3x2 grid of button sprites. Uses FUN_005bf5e1(0x1f1,...) for button dialog, get_improvement_name for labels | HIGH |
| 004D56EA | stub | FUN_004d56ea | wonder_buttons_dtor_bitmap | void | void | Cleanup: destroy bitmap | LOW |
| 004D56FD | stub | FUN_004d56fd | wonder_buttons_seh_epilog | void | void | SEH epilog | LOW |
| 004D570B | xlarge | FUN_004d570b | wonder_win_show_starfield | void | void | Renders the "starfield" wonder movie background: generates 0x50 (80) star particles with random positions and velocities, draws text via typewriter loop (wonder_win_draw_next_char), builds bottom text panel with gold amount from civ[civ_id]+0x02. Star positions at offsets +0x1db8 (x), +0x1dbc (y), +0x1dc0 (z/speed), 12 bytes per particle | HIGH |
| 004D5B21 | large | FUN_004d5b21 | play_wonder_video | void | void | Plays an AVI video file ("civ2_video_launch.avi"). Allocates 0xa28-byte video player object, opens file, handles VFW registration errors ("VFWNOTREGISTERED"), enters playback message loop. Checks save_format_version (DAT_00655b02) > 2 for MP features | HIGH |
| 004D5E41 | small | FUN_004d5e41 | wonder_win_setup_hotspots | void | void | Configures clickable hotspot regions. If current_player and mode != 3 and mode != 0: two buttons at (0x1f5, 0x1a1) and (0x22f, 0x1a1). Otherwise: one button at (0x22f, 0x1a1) | MEDIUM |
| 004D5EF9 | small | FUN_004d5ef9 | wonder_win_draw_initial_buttons | void | void | Initial button rendering: clears button area if mode is not 0 or 1, then draws both button regions | MEDIUM |
| 004D5F79 | medium | FUN_004d5f79 | wonder_win_draw_button_left | int highlight, int show | void | Draws the left button (OK/Continue). Position depends on mode: current_player & !mode3 & !mode0 → (0x1f5,0x1a1,0x229,0x1c5), else → (0x22f,0x1a1,0x272,0x1c5). Calls blit_normal with different contexts for highlight states | MEDIUM |
| 004D60A5 | medium | FUN_004d60a5 | wonder_win_draw_button_right | int highlight, int show | void | Draws the right button (Video/View). Only drawn when current_player & mode == 1. Position: (0x22f, 0x1a1, 0x272, 0x1c5) | MEDIUM |
| 004D61C3 | medium | FUN_004d61c3 | wonder_win_handle_click | uint4 x, uint4 y | void | Handles mouse click on wonder window. Checks button hit via FUN_0046ad85. Button 0: advances text scroll or closes. Button 1 (mode==1): transitions to video mode (mode=2) | MEDIUM |
| 004D6367 | stub | FUN_004d6367 | wonder_win_timer_callback | void | void | Timer callback: calls wonder_win_draw_next_char(1) to advance typewriter text | HIGH |
| 004D6384 | small | FUN_004d6384 | wonder_win_toggle_flag | void | void | Toggles +0x8ec flag and redraws right button accordingly (highlight on/off) | LOW |
| 004D63FB | large | FUN_004d63fb | wonder_win_animate_stars | void | void | Star particle animation tick: updates 80 star positions by adding velocity (+0xfa for x, +300 for y), decrements z. When z=0, respawns with random position/velocity. Erases old star pixel (palette 0x29→10), draws new (10→0x29). Bounds: 0x280 x 0x1e0 | HIGH |
| 004D6744 | medium | FUN_004d6744 | wonder_win_handle_key | int key | void | Handles keyboard input: keys 0xd0-0xd2 (numpad/function keys) advance text or close. In video mode, sends to video player | MEDIUM |
| 004D686B | stub | FUN_004d686b | wonder_win_video_event | void | void | Forwards event to video player object if active | LOW |
| 004D68A7 | medium | FUN_004d68a7 | wonder_win_handle_mousedown | uint4 x, uint4 y | void | Mouse-down handler: sets pressed flags (+0x1dac for button 0, +0x1db0 for button 1), draws button in pressed state, cancels auto-advance timer | MEDIUM |
| 004D6A30 | large | FUN_004d6a30 | wonder_win_handle_mouseup | uint4 x, uint4 y | void | Mouse-up handler: completes button actions (text scroll, mode transition to video), restores button states, restarts auto-advance timer (500ms) | MEDIUM |
| 004D6CBC | large | FUN_004d6cbc | wonder_win_handle_mousemove | uint4 x, uint4 y | void | Mouse-move handler: manages button hover/highlight states while mouse is pressed. Tracks which button the cursor is over and updates visual state | MEDIUM |
| 004D6F58 | stub | FUN_004d6f58 | wonder_win_noop | void | void | Empty function (no-op handler, likely unused virtual slot) | LOW |

---

### Cluster: Rules Editor UI Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004D8AF0 | stub | FUN_004d8af0 | get_text_ptr | void | uint4 | Returns *this (first dword of object) — simple text pointer accessor for MFC text control | LOW |
| 004D8B20 | stub | FUN_004d8b20 | video_player_destructor | byte flags | void* | Destructor for video player object. Calls cleanup, then conditionally deletes memory | MEDIUM |
| 004D8B70 | stub | FUN_004d8b70 | create_button_hotspot | 5 params (id, x, y, w, h) | void | Wrapper for FUN_0046ace7 — creates a clickable hotspot/button at given coordinates | MEDIUM |

---

### Cluster: Rules Editor / Improvement Editor

DAT_006a4f88 = active editor window pointer. DAT_006a1d7c = editor active flag. DAT_006a1d80 = control ID counter (starts at 0xc9). Accesses DAT_0064c488 = improvement table (67 entries, stride 8).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004D8BC0 | medium | FUN_004d8bc0 | editor_load_improvements | void | void | Copies 67 improvement records from game tables into editor buffers (DAT_006a1d88 = name buffer, stride 0x28; DAT_006a2d28 = stats buffer, stride 0x58). Copies cost, maintenance, prereq. For wonders (idx >= 0x27): copies obsolete tech | HIGH |
| 004D8CAA | medium | FUN_004d8caa | editor_save_improvements | void | void | Reverse of load: copies editor buffers back into game improvement tables. Writes name (0x19 chars), cost, maintenance, prereq. For wonders: writes obsolete tech | HIGH |
| 004D8D80 | medium | FUN_004d8d80 | editor_update_controls | void | void | Updates editor UI controls: for edit fields (type 9): writes formatted numeric value. For combo boxes (type 0xc): sets selection index. Uses DAT_0062e3c0 control definition table | MEDIUM |
| 004D8ED6 | medium | FUN_004d8ed6 | editor_read_controls | void | int | Reads values from editor UI controls back into improvement data. For edit fields: parses text via _atoi, clamps with FUN_005adfa0 (known clamp function). Returns count of values that were clamped (out of range) | HIGH |
| 004D9095 | stub | FUN_004d9095 | editor_repaint | void | void | Thunk calling editor_paint (FUN_004d9b93) | LOW |
| 004D90B0 | large | FUN_004d90b0 | editor_write_rules_file | FILE* file | uint4 | Writes improvement data to RULES.TXT format. For each of 67 improvements: writes name, cost, maintenance, prereq in formatted columns. Always returns 1 | HIGH |
| 004D91F8 | small | FUN_004d91f8 | editor_write_wonders_section | FILE* file | uint4 | Writes wonder-specific data (obsolete tech) for improvements 0x27-0x42 (wonders). Always returns 1 | HIGH |
| 004D929A | medium | show_messagebox_929A | editor_apply_changes | void | void | Apply button handler: reads controls, saves improvements, writes RULES.TXT ("IMPROVE"/"ENDWONDER" sections). On file error: shows MessageBox("Error updating RULES", "File I/O Error"). On validation warning: shows debug notice | HIGH |
| 004D93B9 | medium | FUN_004d93b9 | editor_rename_improvement | void | void | Rename improvement dialog: prompts for new name via FUN_0051d63b (input dialog with title "IMPRNAME"), updates name in editor buffer and listbox | MEDIUM |
| 004D953F | stub | FUN_004d953f | editor_show_help | void | void | Shows help dialog: "IMPROVEMENTS" topic from help file | HIGH |
| 004D959E | stub | FUN_004d959e | editor_close | void | void | Closes editor: sets DAT_006a1d7c=0, invalidates window | HIGH |
| 004D95C6 | stub | FUN_004d95c6 | editor_edit_effects | void | void | Opens effects sub-editor: gets improvement effects text via get_improvement_name, calls FUN_00573e59 (text editor) for the selected improvement's effect string at DAT_00645160 | MEDIUM |
| 004D9619 | medium | FUN_004d9619 | editor_edit_misc | void | void | Opens misc sub-editor: "IMPRMISC" dialog. Selection 0 → DAT_00640b98 (global misc data, mode 5). Selection > 0 → per-improvement misc at DAT_00647168 (mode 6) | MEDIUM |
| 004D9718 | medium | FUN_004d9718 | editor_handle_listbox | int msg | void | Handles listbox selection change (msg==0xc9). Reads controls, validates, updates current selection. If idx < 0x27: building mode. If idx >= 0x27: wonder mode (shows obsolete tech). On validation error: shows debug notice | MEDIUM |
| 004D986E | medium | FUN_004d986e | editor_create_combo_control | int page | void | Creates a combo/dropdown control for the editor at position from DAT_0062e398 table. Populates with improvement names (page 0) or tech names (page 1-2, iterates 100 entries from DAT_00627684 tech_table) | MEDIUM |
| 004D9A9F | medium | FUN_004d9a9f | editor_create_edit_control | int page | void | Creates a text edit control at position from DAT_0062e3b0 table, with validation format DAT_0062e494 | MEDIUM |
| 004D9B93 | xlarge | FUN_004d9b93 | editor_paint | void | void | Main paint handler for the improvement editor. Draws: background (from DAT_0062e018 bitmap or solid), improvement icon (0x48x0x28), stat labels, Civilopedia text (reads "PEDIAIMPROVE" section from PEDIA file). Positions buttons at bottom. Uses draw/blit pipeline extensively | HIGH |
| 004DA107 | xlarge | FUN_004da107 | editor_init | void | void | Full initialization of the improvement editor window. Allocates bitmap surface, loads "EDITORAS.GIF", creates listbox/buttons (OK, Cancel, Rename, Help, Effects, Misc), initializes controls from DAT_0062e3c0 table, enters main event loop. Window size: 0x230 x 0x17c | HIGH |
| 004DA9BE | stub | FUN_004da9be | editor_dtor_critsec | void | void | Destructor step: destroy critical section | LOW |
| 004DA9D4 | stub | FUN_004da9d4 | editor_seh_epilog | void | void | SEH epilog | LOW |
| 004DA9E2 | stub | FUN_004da9e2 | show_improvement_editor | void | void | Entry point: creates MFC property frame, calls editor_init, cleans up. This is the public API called from the cheat menu | HIGH |
| 004DAA3B | stub | FUN_004daa3b | editor_frame_dtor | void | void | Destructor for editor frame | LOW |
| 004DAA51 | stub | FUN_004daa51 | editor_frame_seh_epilog | void | void | SEH epilog | LOW |

---

### Cluster: Multiplayer Diplomacy / Parley System

This cluster implements the multiplayer negotiation ("parley") system. Transaction types: 5/6=treaty, 7=give_tech, 8=give_gold, 9=give_city, 10=give_units, 0xb=declare_war, 0xc=share_maps, 0xd=attitude_change, 0xe=trade_exchange, 0xf=demand, 0x11=give_units_with_cities. String literal evidence: "parleyDescription", "parleywin.tran", "ExecuteParleyTransaction", file path "D:\Ss\Franklinton\parleywin.tran".

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004DB210 | stub | FUN_004db210 | parley_init_thunk | void | void | Thunk calling parley_init_tables | LOW |
| 004DB225 | stub | FUN_004db225 | parley_init_tables | void | void | Initializes parley system: calls FUN_00428cb0 (load label strings) | LOW |
| 004DB23F | large | FUN_004db23f | parley_load_index_file | uint4 path, uint4 filename | void | Loads a parley text index file: reads line-by-line, indexes entries starting with "@A"-"@Z" by file offset. Stores in DAT_006a5b38 buffer. Sets DAT_0062e60c=1 (loaded), DAT_0062e610=entry_count | HIGH |
| 004DB450 | stub | FUN_004db450 | parley_unload_index | void | void | Clears parley index: resets DAT_0062e60c=0, DAT_0062e610=0, frees buffer | HIGH |
| 004DB481 | medium | FUN_004db481 | parley_find_entry | uint4 path, char* key | uint4 | Looks up a keyed entry in the parley index. Compares current directory + path against cached file path (DAT_0062e508). Returns file offset of matching entry, or -1 | MEDIUM |
| 004DB690 | xlarge | FUN_004db690 | parley_build_packet | int type | uint4* | Builds a network packet for a diplomatic transaction. Allocates buffer, writes header (magic 0x66606660, msg_id 0x82, size), civ IDs, transaction type. Calls parley_serialize_offer to fill payload. Sends via FUN_0046b14d network send. String: "Failed to allocate buffer for pa[rley]". Source file: "D:\Ss\Franklinton\parleywin.tran" | HIGH |
| 004DBAB4 | xlarge | FUN_004dbab4 | parley_serialize_offer | uint4* buf, uint4 type, uint4 size, int side | void | Serializes an offer into the packet buffer. Switch on type: 5/6=treaty (+ diplo value), 8/0xc=selected_techs (iterates selected items from DAT_00682ba8 checklist), 9=numeric_value, 10/0x11=selected_units/cities, 0xd=attitude | HIGH |
| 004DBEE6 | xlarge | FUN_004dbee6 | parley_build_description | int packet, int is_counter | void | Builds human-readable description text (DAT_006a5b58) for a diplomatic transaction. Enormous switch statement handles all transaction types (6=treaty, 7=give_tech, 8=give_gold, 9=give_city, 10=give_units, etc.). For type 0xe (trade): describes both sides. For type 0xf (demand): describes what is demanded. Appends localized strings from label table | HIGH |
| 004DCAFA | medium | FUN_004dcafa | parley_describe_techs | int* offer | void | Appends tech names to description. Iterates offer[2] count of techs from offer[3..], looking up names from DAT_00627684 tech_table. Comma-separated with "and" before last | HIGH |
| 004DCC0C | small | FUN_004dcc0c | parley_describe_gold | int amount | void | Appends gold amount to description: converts to string, appends "gold" label from label table offset 0xcec | HIGH |
| 004DCC83 | large | FUN_004dcc83 | parley_describe_units | int* offer | void | Appends unit descriptions: groups by unit type, shows "TypeName (count)" format. Uses DAT_006560f6 (unit.type_id) and DAT_0064b1b8 (unit_type name table) | HIGH |
| 004DCEA5 | medium | FUN_004dcea5 | parley_describe_cities | int* offer | void | Appends city names and gold amounts to description. Uses FUN_0052ed95 to look up city by ID, reads city name from DAT_0064f360 (+0x20 = name field) | HIGH |
| 004DD016 | medium | FUN_004dd016 | parley_describe_attitude | int attitude, int perspective | void | Appends attitude/treaty change description. 3 levels (0=ceasefire, 1=peace, 2=alliance), 2 perspectives (0=offering, 1=demanding). Uses label table offsets 0xcf0-0xd04 | HIGH |
| 004DD176 | medium | FUN_004dd176 | parley_describe_maps | int* offer | void | Appends shared map regions to description. Iterates offer entries, looks up city names via FUN_00493c7d | MEDIUM |
| 004DD285 | xlarge | FUN_004dd285 | parley_execute_transaction | int packet | void | Master transaction executor. Dispatches to specific handlers based on type. For type 0xe (trade): executes both sides. For type 0xf (demand): executes single side. After execution: recalculates units (FUN_004b0b53), refreshes display, checks if either civ is eliminated (kill_civ). String evidence: "Start ExecuteParleyTransaction", "End ExecuteParleyTransaction" | HIGH |
| 004DD8AD | xlarge | FUN_004dd8ad | parley_execute_share_maps | int civ1, int civ2, int mode | void | Shares map visibility between two civs. Iterates all tiles, copies visibility bits. If mode==0: also shares tile improvements and unit/city knowledge. Updates unit visibility masks. Updates city knowledge arrays. Extensive use of map access functions (FUN_005b8931=get_tile, FUN_005b976d=set_visibility, FUN_005b9d81=set_tile_data) | HIGH |
| 004DDE9E | small | FUN_004dde9e | parley_execute_give_tech_list | uint4 civ, int* offer | void | Gives a list of technologies: iterates offer[2] techs, calls FUN_00467825(civ, tech_id, 0x2000) for each | HIGH |
| 004DDF04 | small | FUN_004ddf04 | parley_execute_give_gold | int to_civ, int from_civ, int amount | void | Transfers gold: clamps to available balance, subtracts from source civ[from].gold, adds to dest civ[to].gold. Adjusts diplomacy via FUN_00456f20 with -(amount*3/2) | HIGH |
| 004DDFB2 | small | FUN_004ddfb2 | parley_execute_give_techs | uint4 to_civ, uint4 from_civ, int* offer | void | Gives technologies from one civ to another. Checks source has tech (FUN_004bd9f0), target doesn't, then grants via FUN_004bf05b | HIGH |
| 004DE049 | small | FUN_004de049 | parley_execute_give_units | uint4 to_civ, int* offer | void | Transfers units: iterates unit IDs in offer, looks up via FUN_0052ed95 (find city by seq_id), calls FUN_004de0e2 (transfer_city) for each valid city | MEDIUM |
| 004DE0E2 | xlarge | FUN_004de0e2 | parley_transfer_city | uint city_idx, int new_owner | void | Full city transfer: changes owner (DAT_0064f348), removes improvements (1=Palace, 4=Temple, 0xb=Barracks?, 7=Library?), updates civ city/unit counts, transfers all units in city to new owner, updates production, reveals surrounding tiles, updates diplomacy. Checks wonder (tech 0xe) ownership. Sets original_owner (DAT_0064f34a) and turn_transferred (DAT_0064f34b) | HIGH |
| 004DE990 | xlarge | FUN_004de990 | parley_execute_transfer_units | int to_civ, int* offer | void | Transfers individual units between civs. Handles transport stacking (unloads cargo if ship), finds valid placement tile via FUN_004ded07, updates owner, home city, unit counts. Calls XD_FlushSendBuffer(5000) for network sync | HIGH |
| 004DED07 | large | FUN_004ded07 | find_unit_placement_tile | int unit, int* out_x, int* out_y, int new_owner, int allow_stack | uint4 | Finds a valid tile to place a transferred unit. Checks 45 spiral positions (CitySpiralDX/DY). Validates: domain match (land=no water, sea=water, air=any), no enemy stacking. Returns 1 if found, 0 if not | HIGH |
| 004DEF54 | medium | FUN_004def54 | parley_describe_treaty | int treaty_type, int perspective | void | Appends treaty/attitude text: perspective 0 uses label offsets 0xc74-0xc80 (offering side), perspective 1 uses 0xbcc-0xbd4 (receiving side). Types: 0=ceasefire, 1=peace, 2=alliance, 3=cancel_all | HIGH |
| 004DF10F | medium | FUN_004df10f | parley_execute_treaty | uint4 type, int civ1, int civ2 | void | Executes treaty changes between two civs. Type 0=ceasefire (set treaty bit 2), 1=peace (bit 4), 2=alliance (bit 8), 3=cancel (remove all treaty bits via FUN_00467750). Accesses civ treaty flags at DAT_0064c6c0 | HIGH |

---

## SUMMARY

### 1. Totals

**Total functions: 88**

| Category | Count | Notes |
|----------|-------|-------|
| Wonder Movie / Advance Animation | 45 | Window lifecycle, rendering, event handling, star animation |
| Rules Editor (Improvement Editor) | 22 | Load/save improvements, UI controls, paint, file I/O |
| Diplomacy / Parley System | 19 | Packet building, description generation, transaction execution |
| Utility | 1 | String trimming |
| SEH Epilogs / Destructor stubs | ~25 | Counted within the above categories |

**Size breakdown:**
- stub (<=20 lines): 40
- small (21-50): 9
- medium (51-100): 17
- large (101-300): 13
- xlarge (>300): 9

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_004dd285 / parley_execute_transaction** (0x004DD285, xlarge) — Master dispatcher for all diplomatic transaction execution in multiplayer. Controls treaty changes, tech/gold/unit/city transfers, map sharing. Critical for understanding the full diplomacy system.

2. **FUN_004d17bf / build_advance_scene** (0x004D17BF, xlarge, 12822 bytes) — The single largest function in this block. Contains the complete hardcoded sprite layout for the throne room / advance animation, with ~88 decoration objects and their tech-threshold triggers. Essential for understanding the throne room rendering.

3. **FUN_004de0e2 / parley_transfer_city** (0x004DE0E2, xlarge) — Complete city transfer logic including owner change, improvement removal, unit reassignment, visibility updates, and wonder checks. Core game mechanic for diplomacy and conquest.

4. **FUN_004dd8ad / parley_execute_share_maps** (0x004DD8AD, xlarge) — Full map sharing implementation: iterates every tile, copies visibility bits, transfers improvement and unit knowledge between civs. Reveals the internal map visibility model.

5. **FUN_004db690 / parley_build_packet** (0x004DB690, xlarge) — Network packet builder for multiplayer diplomacy. Reveals the packet format (magic=0x66606660, msg_id=0x82), serialization scheme for all offer types, and the network send pathway.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_0062e2d0 | wonder_window_ptr | Set to `this` in wonder_win_init, cleared to 0 in destructor, checked as guard in multiple functions |
| DAT_006a5b10 | civ_power_temp[6] | 6-entry int array loaded from civ ranking shorts, used for advance animation threshold checks |
| DAT_006a5b58 | parley_description_buf | 2048-char buffer for diplomatic transaction descriptions, with length assertions |
| DAT_006a4f88 | editor_window_ptr | Set in editor_init, used throughout the improvement editor for window references |
| DAT_006a1d7c | editor_active_flag | Set to 1 in editor_init, checked in main loop, set to 0 on close |
| DAT_006a1d80 | editor_control_id_counter | Starts at 0xc9, incremented for each created control |
| DAT_006a1d88 | editor_improvement_names | 67-entry buffer, stride 0x28 (40 bytes per name) |
| DAT_006a2d28 | editor_improvement_stats | 67-entry buffer, stride 0x58 (88 bytes per record: cost, maint, prereq, obsolete) |
| DAT_0062e60c | parley_index_loaded | Boolean: 1 if parley text index file is loaded |
| DAT_0062e610 | parley_index_count | Count of indexed entries in parley text file |
| DAT_006ad0f0 | civ_approval_rating | Used in wonder info text, formatted as integer |
| DAT_006ad0e8 | civ_population | Used in wonder info text |
| DAT_006ad0e4 | civ_land_area | Used in wonder info text (div/mod 10 for decimal) |
| DAT_006ad0dc | civ_gnp | Used in wonder info text |
| DAT_006ad0ec | civ_pollution_total | Already known; confirmed: used for pollution bar coloring (green<40, yellow<75, red>=75) and wonder mode trigger |
| DAT_00628064 | language_id | 0=English, 1=French("Lancer"), 2=German("Starten") — button labels in wonder dialog |
| DAT_0062e508 | parley_cached_filepath | 260-byte buffer for cached parley file path |
| DAT_006a5b38 | parley_index_buffer | Dynamic buffer for parley text file index entries |
