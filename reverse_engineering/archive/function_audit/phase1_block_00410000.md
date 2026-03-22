# Phase 1: Block 0x00410000 Analysis

Block range: `0x00410000 - 0x0041FFFF`
Total functions: **204**

---

### Cluster: Map Window Message Dispatch & Cursor

These functions handle interaction with the main map view — mouse clicks, double-clicks, cursor management, and scrolling/centering logic. They access `DAT_006d1da0` (current_player), unit array at `DAT_006560f0`, city array at `DAT_0064f340`, and window state via `in_ECX + 0x2D8..0x358`.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00410030 | stub | FUN_00410030 | show_dialog_popup | (msg, param2, param3) | void | Wrapper: calls `thunk_FUN_0051d564` with `DAT_006359d4` (dialog context). Used to display message boxes/popups. | MEDIUM |
| 0x00410070 | stub | FUN_00410070 | get_civ_name_for_display | (civId) | undefined4 | Thin thunk to `FUN_00493d13`, returns civ display name/string for a civ ID. | MEDIUM |
| 0x004100A0 | stub | FUN_004100a0 | blit_sprite_wrapper | (6 params) | void | Thin wrapper calling `thunk_FUN_0056d289` (sprite blit). param_5+2 suggests offset adjustment. | LOW |
| 0x004100CF | medium | FUN_004100cf | show_city_info_popup | (cityIdx) | void | Displays city info popup. Accesses `DAT_0064f360+cityIdx*0x58` (city name), `DAT_0064f348+cityIdx*0x58` (city owner), iterates trade routes (3 commodities at `DAT_0064f37e`). Calls `show_message`, `draw_city_name`, `display_improvement`. String "CITYINFO". | HIGH |
| 0x004102D5 | stub | FUN_004102d5 | seh_cleanup_dialog | () | void | SEH cleanup: calls `thunk_FUN_0059df8a`. | FRAMEWORK |
| 0x004102E1 | stub | FUN_004102e1 | seh_cleanup_render | () | void | SEH cleanup: calls `FUN_005cde4d`. | FRAMEWORK |
| 0x004102F4 | stub | FUN_004102f4 | seh_unwind_frame | () | void | SEH frame unwinder — restores FS:[0] chain. | FRAMEWORK |
| 0x00410302 | stub | FUN_00410302 | center_map_on_cursor | () | void | Calls `thunk_FUN_0047cbb4` with `DAT_0064b1b4/DAT_0064b1b0` (cursor coords) and `DAT_006d1da0` (current_player). Centers map viewport. | MEDIUM |
| 0x0041033A | small | FUN_0041033a | center_all_map_views | () | void | Iterates 8 civs (checks `DAT_0066ca84+i*0x3f0` alive flag); calls `center_map_on_cursor` for each active view. | MEDIUM |
| 0x004103AE | stub | FUN_004103ae | refresh_map_after_city_dialog | () | void | Calls `citywin_9545`, `FUN_005c62ee` (get active window), `thunk_FUN_0047cd51` (invalidate map). Post-city-dialog map refresh. | MEDIUM |
| 0x00410402 | small | FUN_00410402 | set_map_center_position | (x, y) | void | Sets map center `(in_ECX+0x2E0, in_ECX+0x2E2)` via coordinate wrapping (`FUN_005ae052`). Temporarily clears `DAT_0062804c`, calls map invalidate. | MEDIUM |
| 0x00410464 | medium | FUN_00410464 | check_scroll_needed | (x, y) | int | Checks if tile (x,y) is near the edge of the current viewport (using `in_ECX+0x2E8..0x300`). If so, sets `DAT_0062805c=1` and scrolls. Returns 1 if scroll was triggered. Handles map wrapping via `clamp`. | MEDIUM |
| 0x004105F8 | medium | FUN_004105f8 | scroll_all_views_to_tile | (x, y, civOwner) | uint | Iterates 8 civ views; for each active view matching the owner filter (self/other/all via bitmask at `DAT_0066ca86`), calls `check_scroll_needed`. Sets `DAT_006ad908` (scroll-in-progress flag). | MEDIUM |
| 0x004106FD | medium | FUN_004106fd | pixel_to_direction | (screenX, screenY, unitX, unitY) | int | Converts screen click coordinates relative to a unit's tile into a directional index (0-7). Uses `FUN_005c0bf2` for diamond hit-test. Returns 8 on miss. | MEDIUM |
| 0x00410835 | large | FUN_00410835 | update_map_cursor_shape | (x, y) | void | Updates the mouse cursor icon based on what's under the pointer. Cursor codes: 0x201=normal, 0x202=goto, 0x203=invalid-goto. Checks unit movement range, tile ownership, enemy presence. Stores cursor in `(local_c+0x358)`. | MEDIUM |
| 0x00410A64 | small | FUN_00410a64 | cancel_pending_goto | () | void | Cancels pending goto cursor. If `DAT_00624f54` timer active, kills it. Resets cursor from 0x1FE back to 0x201. Clears `DAT_00624f58`. | MEDIUM |
| 0x00410B23 | small | FUN_00410b23 | activate_goto_cursor | () | void | Activates the goto cursor (0x1FE) on the current view. Kills any pending timer first. | MEDIUM |
| 0x00410BC3 | medium | FUN_00410bc3 | handle_right_mouse_down | () | void | Right-mouse handler on map. Checks `GetAsyncKeyState(0x10)` (Shift key). Without Shift: starts a delayed goto timer (400ms). With Shift: immediately activates goto cursor. Guards against re-entry via `DAT_006ad8d4`. | HIGH |
| 0x00410CFA | small | FUN_00410cfa | handle_right_mouse_up | () | void | Right-mouse-up on map. Cancels pending goto if active, calls `thunk_FUN_00414d40` (invalidate). | MEDIUM |
| 0x00410D98 | small | FUN_00410d98 | select_tile_and_center | (x, y) | bool | Validates tile coordinates, centers map, stores new cursor position in `DAT_0064b1b4/b0`, calls `thunk_FUN_0056a65e` (select unit/tile). Returns true if valid. | MEDIUM |
| 0x00410E0A | stub | FUN_00410e0a | is_goto_mode | () | int | Returns 1 if cursor is in goto mode (0x202 or 0x203), else 0. Checks `DAT_0066cb00`. | HIGH |
| 0x00410E46 | small | FUN_00410e46 | set_all_views_goto_mode | () | void | Sets all active civ views to goto cursor (0x202). | MEDIUM |
| 0x00410ED8 | small | FUN_00410ed8 | cancel_goto_mode | () | void | If in goto mode, resets all active views back to normal cursor (0x201). | MEDIUM |

---

### Cluster: Map Input Handlers (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00410F77 | xlarge | map_window_click | map_window_click | (x, y, rightClick) | void | **Already named.** Master click handler. Left-click: selects tile, opens city dialog (`FUN_004100cf`/`handle_city_disorder`), picks up units. Right-click: goto-move or set waypoint. Checks XD multiplayer lock, god mode, spy tech (0x54). String: "Map 3: map_window_click - blocked". | HIGH |
| 0x004116C1 | stub | FUN_004116c1 | map_left_click | (x, y) | void | Thunk: calls `map_window_click(x, y, 0)` (left-click). | HIGH |
| 0x004116E3 | stub | FUN_004116e3 | map_right_click | (x, y) | void | Thunk: calls `map_window_click(x, y, 1)` (right-click). | HIGH |
| 0x00411705 | large | map_double_click | map_double_click | (x, y) | void | **Already named.** Double-click opens terrain improvement dialog. Checks tile ownership, terrain type (`FUN_005b89bb` returns 2=special resource?), calls `FUN_00491c20` with tile type index. String: "Map 3: map_double_click - blocked". | HIGH |
| 0x00411A13 | small | FUN_00411a13 | move_unit_to_neighbor | (direction) | void | Moves selected unit in given direction (0-7). Uses `DAT_00628350/60` offset tables (like CitySpiralDX/DY). Calls `select_tile_and_center` then `check_scroll_needed`. | MEDIUM |
| 0x00411A85 | medium | FUN_00411a85 | handle_unit_ascii_no_active | (keyChar, rawKey) | void | Keyboard handler when no unit is active (viewing mode). Enter/Space opens city dialog. 'C' (0x43) centers map on cursor. | MEDIUM |
| 0x00411BD7 | stub | FUN_00411bd7 | show_cheat_menu | () | void | Calls `thunk_FUN_0044cc80(DAT_006d1da0)`. Only reachable in debug/cheat mode ('Q' key check). | MEDIUM |
| 0x00411BF5 | large | FUN_00411bf5 | handle_unit_orders_key | (keyChar, rawKey) | void | Unit order key dispatcher when a unit is active. Large switch: 0x20=Space(wait), 0x42='B'(build), 0x43='C'(center), 0x45='E'(explore), 0x46='F'(fortify/fortress), 0x47='G'(goto), 0x48='H'(home), 0x49='I'(irrigate), 0x4B='K'(airlift), 0x4C='L'(load), 0x4D='M'(mine), 0x4F='O'(unload), 0x50='P'(pillage/paradrop), 0x51='Q'(cheat), 0x52='R'(road), 0x53='S'(sentry), 0x55='U'(unload), 0x57='W'(wait). Checks unit domain via `DAT_0064b1ca` (utype+0x12=role). | HIGH |
| 0x00411F91 | xlarge | map_ascii | map_ascii | (keyChar) | void | **Already named.** ASCII key dispatcher for the main map. If city dialog open, routes to city hotkeys (A/C/B/H/I/M/R/V). Otherwise dispatches: C=center, D=disband, H=history, R=revolution, S=save, T=tax, X/Z=zoom. Then routes to unit-active vs unit-inactive sub-handlers. Handles cheat mode toggle ('Y'→god_mode). | HIGH |
| 0x004125C6 | xlarge | map_key | map_key | (virtualKey) | void | **Already named.** Virtual-key handler. Numpad movement (0xA1-0xC7 → directions 0-7). F1-F11 (0xB0-0xBB) → advisor screens. City dialog page-up/down (0xD2/0xD0). Menu commands (0x243-0x3B7): scenario editor, diplomacy, tax/science, save, preferences, etc. String: "Map 3: map_key - blocked by XD". | HIGH |

---

### Cluster: Map View Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004131C0 | small | FUN_004131c0 | handle_map_timer_tick | () | void | Timer callback for map. Toggles `DAT_00628054` (cursor blink) if conditions met. Calls `center_all_map_views`. Checks multiplayer mode (`DAT_00655b02>2`). | MEDIUM |
| 0x0041325D | stub | FUN_0041325d | toggle_minimap_mode | () | void | Toggles `DAT_00628058` (minimap on/off), calls `thunk_FUN_00568f43(1)`. | MEDIUM |
| 0x004132B7 | small | FUN_004132b7 | resize_map_panel | () | void | Recalculates map panel dimensions. Calls `thunk_FUN_004080c0` (get width), `thunk_FUN_00407f90` (get height), `thunk_FUN_00414bb0` (get scrollbar height), `thunk_FUN_004086c0` (set rect). Accounts for `DAT_00628060` (status bar visible). | MEDIUM |
| 0x00413350 | small | FUN_00413350 | check_primary_view | () | bool | Returns true if this is the primary (index 0) map view. If so, calls `thunk_FUN_00408090` (focus). Otherwise clears DC state. | MEDIUM |
| 0x004133C2 | small | FUN_004133c2 | set_active_view_dc | () | void | Sets device context to the active view's surface. Uses `view_index * 0x10` offset into `DAT_006552A4`. | LOW |
| 0x0041341C | small | FUN_0041341c | set_active_view_dc_alt | () | void | Identical to `FUN_004133c2`. Possibly different entry point for same logic. | LOW |
| 0x00413476 | medium | FUN_00413476 | draw_status_bar | () | void | Draws the status/title bar at top of map view. Shows civ name (`get_civ_name_for_display`), era/view mode indicator (values 300-303 from `in_ECX+0x2DE` flags). Checks for multi-view mode. Calls `render_city_name` at end. | MEDIUM |
| 0x004135AB | medium | FUN_004135ab | handle_view_control | (action) | void | View control dispatcher: 1=reset viewport, 2=zoom in (limit 8), 3=zoom out (limit -7), 4=cycle display mode. Modifies `(local_8+0x2E4)` (zoom) and `(local_8+0x2DE)` (mode). | MEDIUM |
| 0x00413717 | large | FUN_00413717 | init_map_view | () | void | Initializes a single map view window. Sets up zoom, position, minimap surfaces. Registers callbacks: `map_double_click`, `map_ascii`, key handlers. Creates window class, sets scroll properties. Calls `draw_status_bar`. Uses `DAT_006ab198` (screen_size_threshold) for default zoom. | HIGH |
| 0x00413A90 | medium | FUN_00413a90 | init_all_map_views | () | void | Initializes all 8 civ views. Sets `DAT_0066ca84` (view alive flags). Calls `init_map_view` for each. Creates two repeating timers (`FUN_005d1f50`) for cursor blink (150ms) and auto-scroll (500ms). | HIGH |
| 0x00413BD1 | small | FUN_00413bd1 | destroy_all_map_views | () | void | Destroys all map views. Kills both timers, calls `thunk_FUN_004083b0` (destroy window) for each active view. | MEDIUM |

---

### Cluster: Window Infrastructure (Scrollbar, Setters)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00414B70 | stub | FUN_00414b70 | send_scrollbar_msg | (msg, param) | void | Sends a message to the scrollbar window (`in_ECX+8`). | FRAMEWORK |
| 0x00414BB0 | stub | FUN_00414bb0 | get_scrollbar_state | () | void | Queries scrollbar state from `in_ECX+8`. | FRAMEWORK |
| 0x00414BE0 | stub | FUN_00414be0 | set_callback_0 | (handler) | old | Sets callback at `*in_ECX` (offset 0), returns old value. | FRAMEWORK |
| 0x00414C20 | stub | FUN_00414c20 | set_callback_4 | (handler) | old | Sets callback at `in_ECX+4`, returns old value. | FRAMEWORK |
| 0x00414C60 | stub | FUN_00414c60 | set_callback_8 | (handler) | old | Sets callback at `in_ECX+8`, returns old value. | FRAMEWORK |
| 0x00414CA0 | stub | FUN_00414ca0 | set_callback_1c | (handler) | old | Sets callback at `in_ECX+0x1C` (double-click handler), returns old value. | FRAMEWORK |
| 0x00414CE0 | stub | FUN_00414ce0 | invalidate_window_primary | () | void | Gets handle from `in_ECX+8`, calls `FUN_005bd533` (invalidate rect). | FRAMEWORK |
| 0x00414D10 | stub | FUN_00414d10 | get_window_handle | () | HWND | Returns `*(in_ECX+8)`. | FRAMEWORK |
| 0x00414D40 | stub | FUN_00414d40 | invalidate_window_secondary | () | void | Gets handle, calls `FUN_005bd550` (update window). | FRAMEWORK |
| 0x00414D70 | stub | FUN_00414d70 | set_window_title | (text) | void | Calls `thunk_FUN_004af174` with `DAT_00679640` (global text buffer) and the title string. | MEDIUM |
| 0x00414DA0 | stub | EnableStackedTabs | EnableStackedTabs | (this, param) | void | **FRAMEWORK.** MFC `CPropertySheet::EnableStackedTabs`. Stores value at `this+0x2A8`. Repurposed by Civ2 to store arbitrary window state. | FRAMEWORK |
| 0x00414DD0 | stub | FUN_00414dd0 | show_city_info_text | (labelKey, cityIdx) | void | Calls `thunk_FUN_004a6cc5` with dialog context, label key, and city index. String parameter "CITYINFO" used upstream. | MEDIUM |
| 0x00414E00 | stub | IsTracking | IsTracking | (this) | int | **FRAMEWORK.** MFC `CSplitterWnd::IsTracking`. Returns `*(this+0x15A4)`. Used to check if splitter is being dragged. | FRAMEWORK |

---

### Cluster: Sort Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00414E30 | small | FUN_00414e30 | bubble_sort_bytes | (count, keys, values) | void | Bubble sort on byte arrays. Sorts `values` by `keys`, both byte-sized. Parallel swap of key and value arrays. | HIGH |
| 0x00414F02 | small | FUN_00414f02 | bubble_sort_ints | (count, keys, values) | void | Bubble sort on int arrays. Same algorithm as above but for 4-byte elements. | HIGH |

---

### Cluster: File I/O Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00415040 | stub | FUN_00415040 | build_file_path | (dest, filename) | dest | Builds a full file path. If `DAT_00625114` is set, prepends `DAT_006250d8` (base directory). Otherwise copies directly. | MEDIUM |
| 0x0041508C | small | FUN_0041508c | open_game_file | (filename, mode) | FILE* | Builds path via `build_file_path`, stores in `DAT_006347c0` (last-opened path), opens with `fopen`. Sets `DAT_00634810` error flag if NULL. | MEDIUM |
| 0x00415105 | stub | FUN_00415105 | get_file_length | (file) | long | Calls `_filelength` on the file handle. | HIGH |
| 0x00415133 | stub | FUN_00415133 | file_exists | (filename) | bool | Tries to open file (read mode via `DAT_00625118`="rb"), closes if success, returns true/false. | HIGH |

---

### Cluster: RULES.TXT Tech Editor (Cheat/Scenario Editor)

These functions implement the in-game technology tree editor, accessed via the scenario editor. They read/write the tech table at `DAT_00627684` (stride 0x10, 100 entries) and support undo/redo through dialog controls.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004151E0 | medium | FUN_004151e0 | snapshot_tech_table | () | void | Copies all 100 tech entries from game data (`DAT_00627684..0062768f` stride 0x10) into editor buffer (`DAT_006a1d88` stride 0x28 for names, `DAT_006a2d28` stride 0x58 for prereqs). Backup for undo. | MEDIUM |
| 0x00415307 | medium | FUN_00415307 | restore_tech_table | () | void | Inverse of `snapshot_tech_table`: copies editor buffer back into live game tech data. Truncates names to 20 chars. | MEDIUM |
| 0x0041541A | medium | FUN_0041541a | populate_editor_controls | () | void | Fills scenario editor UI controls with current tech values. Handles numeric text fields (type 9) and dropdown lists (type 0xC) from layout table at `DAT_00625160`. | MEDIUM |
| 0x0041557B | medium | FUN_0041557b | read_editor_controls | () | int | Reads values from editor controls back into data buffers. Returns count of changed fields (for dirty detection). Uses `clamp` for validation. | MEDIUM |
| 0x00415765 | stub | FUN_00415765 | refresh_editor_display | () | void | Thunk to `FUN_00416828` (repaint editor window). | LOW |
| 0x00415780 | medium | FUN_00415780 | write_techs_to_file | (FILE*) | 1 | Writes all 100 techs to a file in RULES.TXT format. Formats: name, epoch, category, prereqs, flags. Uses `_fputs`. | HIGH |
| 0x00415952 | small | FUN_00415952 | recount_active_techs | () | void | Revalidates tech prereq chains. Counts `DAT_00655b1a` (num active techs). For each active tech, traces prereq pointers to ensure they point to active techs (skips disabled). | MEDIUM |
| 0x00415A40 | medium | show_messagebox_5A40 | apply_rules_changes | () | void | **Already named but misleading.** Master "apply" for the rules editor. If no changes, writes back to RULES.TXT, shows error on failure. If changes detected, shows debug notice. String: "Error updating RULES.%s", "CIVILIZE", "NOTICE". | HIGH |
| 0x00415B52 | large | FUN_00415b52 | populate_tech_prereq_list | () | void | Fills the prereq/dependencies listbox for the currently selected tech. Shows which unit types and other techs depend on the selected advance. Format strings: "%s (%s: %s)". | MEDIUM |
| 0x00415E53 | large | FUN_00415e53 | rename_tech_dialog | () | void | Shows tech rename dialog. String "TECHNAME". Allows editing name and prereq assignments. Updates all cross-references in the tech table. | HIGH |
| 0x0041612E | stub | FUN_0041612e | show_advances_help | () | void | Shows help for advances section. String "ADVANCES". | MEDIUM |
| 0x0041618D | stub | FUN_0041618d | invalidate_editor_cache | () | void | Sets `DAT_006a1d7c=0`, calls `CRichEditDoc::InvalidateObjectCache`. Forces editor repaint. | LOW |
| 0x004161B5 | small | FUN_004161b5 | edit_civilopedia_entry | () | void | Opens Civilopedia text editor for the currently selected tech. Navigates to entry via `DAT_006a2d30/34` (epoch/category indices) into `DAT_00646cb8` (text database). | MEDIUM |
| 0x0041623D | medium | FUN_0041623d | handle_editor_control_change | (controlId) | void | Handles control notifications in the editor. 0xC9=tech dropdown changed (read controls, refresh display). 0xCC/0xCD=prereq dropdowns changed. | MEDIUM |
| 0x00416354 | large | FUN_00416354 | create_editor_dropdown | (slotIndex) | void | Creates a dropdown list control in the editor for a specific slot (prereqs, epoch, category). Populates with tech names or category labels from `DAT_00628420` (string heap). | MEDIUM |
| 0x00416734 | small | FUN_00416734 | create_editor_textfield | (slotIndex) | void | Creates a text input field in the editor at the given layout slot. Uses `DAT_00625150/54` for positioning. | MEDIUM |
| 0x00416828 | xlarge | FUN_00416828 | paint_editor_window | () | void | Full repaint of the rules editor. Draws background, tech icon sprite (`blit_normal`), labels for prereqs/epoch/category/AI-value, and the Civilopedia reference area. Uses `begin_paint`/`end_paint`. String label IDs: 0x7E, 0x1EA-0x1EE. | MEDIUM |
| 0x00416C9E | xlarge | FUN_00416c9e | create_rules_editor | () | void | Creates the full rules/scenario editor window. String "EDITORPT.GIF". Allocates surface (`operator_new(0x48)`), creates dropdown/listbox/button controls for tech selection, prereqs, epoch. Enters modal event loop (`while DAT_006a1d7c != 0`). 2186 bytes. | HIGH |
| 0x00417542 | stub | FUN_00417542 | seh_cleanup_editor_1 | () | void | SEH cleanup for editor. | FRAMEWORK |
| 0x00417558 | stub | FUN_00417558 | seh_unwind_editor_1 | () | void | SEH frame unwind. | FRAMEWORK |
| 0x00417566 | stub | FUN_00417566 | open_rules_editor | () | void | Entry point: constructs editor object (`FUN_00417fa0`), calls `create_rules_editor`, cleanup. | HIGH |
| 0x004175BF | stub | FUN_004175bf | seh_cleanup_editor_2 | () | void | Calls `FUN_004183d0` (editor destructor). | FRAMEWORK |
| 0x004175D5 | stub | FUN_004175d5 | seh_unwind_editor_2 | () | void | SEH frame unwind. | FRAMEWORK |

---

### Cluster: Editor Object Construction/Destruction

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00417EF0 | small | FUN_00417ef0 | set_editor_font | (param1, fontSize) | void | Destroys old font if exists, creates new one via `create_font_8200`, measures via `gdi_847F`. Stores font handle and metrics at `*in_ECX` and `in_ECX[1]`. | MEDIUM |
| 0x00417F70 | stub | FUN_00417f70 | get_editor_flags_byte | () | byte | Returns byte at `in_ECX+0x30`. Used as a display flag in the editor paint routine. | LOW |
| 0x00417FA0 | large | FUN_00417fa0 | construct_editor_object | () | this* | Constructor for the rules editor object. Initializes 6 control containers (`_eh_vector_constructor_iterator_`, stride 0x38), 9 additional containers (stride 0x48), and 16 button/pushbutton controls. Sets vtable pointer to `PTR_FUN_0061c058`. | MEDIUM |
| 0x004183D0 | large | FUN_004183d0 | destroy_editor_object | () | void | Destructor: reverse of constructor. Destroys all 16+9+6 UI element arrays in reverse order. Calls `COleCntrFrameWnd::~COleCntrFrameWnd`. | MEDIUM |
| 0x0041851F-0x0041862D | stub (x20) | FUN_0041851f..FUN_0041862d | editor_dtor_step_N | () | void | Individual destructor steps. First 3 call `thunk_FUN_00418ea0` (destroy editbox), remaining 14 call `thunk_FUN_0040f570` (destroy button). | FRAMEWORK |
| 0x0041863C | stub | FUN_0041863c | editor_dtor_vec_48 | () | void | Vector destructor for 9-element array (stride 0x48). | FRAMEWORK |
| 0x00418654 | stub | FUN_00418654 | editor_dtor_vec_38 | () | void | Vector destructor for 6-element array (stride 0x38). | FRAMEWORK |
| 0x0041866C | stub | FUN_0041866c | editor_dtor_base | () | void | Calls `COleCntrFrameWnd::~COleCntrFrameWnd` on the base class. | FRAMEWORK |
| 0x0041867F | stub | FUN_0041867f | seh_unwind_editor_3 | () | void | SEH frame unwind. | FRAMEWORK |

---

### Cluster: Editor Control Wrappers (Dropdown/Listbox/Editbox)

These are thin wrapper methods for custom UI controls used in the rules editor. Three control types with stride-based addressing: editbox (+0x1C=HWND, +0x2C=count, +0x30..0x44=state), listbox, dropdown.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00418740 | stub | FUN_00418740 | ctrl_get_id | () | int | Returns `*(in_ECX+4)`. Control identifier. | LOW |
| 0x00418770 | stub | FUN_00418770 | ctrl_get_hwnd | () | HWND | Returns `*(in_ECX+0x1C)`. Control window handle. | LOW |
| 0x004187A0 | small | FUN_004187a0 | construct_listbox_item | () | this* | Constructor for a listbox item (stride 0x48). Initializes fields: +0x30=0, +0x2C=0, +0x44=0, +0x34=0, +0x38/39=0. | FRAMEWORK |
| 0x00418870 | small | FUN_00418870 | destroy_listbox_item | () | void | Destructor for listbox item. Destroys resource at `+0x1C` if non-null. | FRAMEWORK |
| 0x004188CA | stub | FUN_004188ca | listbox_dtor_base | () | void | Base destructor thunk. | FRAMEWORK |
| 0x004188DD | stub | FUN_004188dd | seh_unwind_listbox | () | void | SEH unwind. | FRAMEWORK |
| 0x00418910 | small | FUN_00418910 | create_combobox | (parent, id, rect, style) | void | Creates a Windows combobox control. Sets font handle from `PTR_DAT_00637e6c`, calls `register_wndclass_2740`, `send_msg_2D7F`. | MEDIUM |
| 0x004189C0 | stub | FUN_004189c0 | combobox_set_item_count | (count) | void | Sends `send_msg_2DA1` to set item count hint. | FRAMEWORK |
| 0x00418A00 | stub | FUN_00418a00 | ctrl_set_change_handler | (handler) | void | Sets `*(in_ECX+0x34) = handler`. Change notification callback. | FRAMEWORK |
| 0x00418A30 | stub | FUN_00418a30 | combobox_set_text | (text) | void | Sends `send_msg_2D7F` to the control HWND with text. | FRAMEWORK |
| 0x00418A70 | stub | FUN_00418a70 | combobox_get_text | (buffer) | void | Sends `send_msg_2D4D` to retrieve text from combobox. | FRAMEWORK |
| 0x00418AB0 | small | FUN_00418ab0 | construct_editbox_item | () | this* | Constructor for editbox item (stride 0x38). Initializes +0x30=0, +0x34=0. | FRAMEWORK |
| 0x00418B50 | small | FUN_00418b50 | destroy_editbox_item | () | void | Destructor for editbox. Destroys HWND resource at +0x1C. | FRAMEWORK |
| 0x00418BAA | stub | FUN_00418baa | editbox_dtor_base | () | void | Base destructor thunk. | FRAMEWORK |
| 0x00418BBD | stub | FUN_00418bbd | seh_unwind_editbox | () | void | SEH unwind. | FRAMEWORK |
| 0x00418BF0 | small | FUN_00418bf0 | create_scrollable_listbox | (parent, id, rect) | void | Creates a scrollable listbox. `register_wndclass_3130` with initial count 0. | MEDIUM |
| 0x00418C70 | stub | FUN_00418c70 | listbox_set_font | () | void | Gets font via `thunk_FUN_00418cb0`, sends `send_msg_35C8` to set font on listbox HWND. | FRAMEWORK |
| 0x00418CB0 | stub | FUN_00418cb0 | ctrl_get_font | () | ptr | Returns `*in_ECX`. Font handle stored at offset 0. | FRAMEWORK |
| 0x00418CE0 | stub | FUN_00418ce0 | listbox_add_item | (text) | void | Sends `send_msg_357E` (add string), increments item count at `+0x2C`. | FRAMEWORK |
| 0x00418D20 | stub | FUN_00418d20 | listbox_clear | () | void | Sends `send_msg_360A` (clear all), resets count to 0. | FRAMEWORK |
| 0x00418D60 | stub | FUN_00418d60 | listbox_get_selection | () | int | Sends `send_msg_36B1` (get current selection index). | FRAMEWORK |
| 0x00418D90 | stub | FUN_00418d90 | listbox_set_selection | (index) | void | Sends `send_msg_36F6` (set selection by index). | FRAMEWORK |
| 0x00418DD0 | stub | FUN_00418dd0 | ctrl_set_notify_handler | (handler) | void | Sets `*(in_ECX+0x34) = handler`. Notification callback. | FRAMEWORK |
| 0x00418E00 | small | FUN_00418e00 | construct_dropdown_item | () | this* | Constructor. Similar to editbox: +0x30=0, +0x34=0. | FRAMEWORK |
| 0x00418EA0 | small | FUN_00418ea0 | destroy_dropdown_item | () | void | Destructor. Destroys HWND at +0x1C via `FUN_005d3c40`. | FRAMEWORK |
| 0x00418EFA | stub | FUN_00418efa | dropdown_dtor_base | () | void | Base destructor thunk. | FRAMEWORK |
| 0x00418F0D | stub | FUN_00418f0d | seh_unwind_dropdown | () | void | SEH unwind. | FRAMEWORK |
| 0x00418F40 | small | FUN_00418f40 | create_treeview_listbox | (parent, id, rect) | void | Creates a tree-view style listbox. Sets font from `PTR_DAT_00637e70`, `register_wndclass_37A0`. | MEDIUM |
| 0x00418FE0 | stub | FUN_00418fe0 | treeview_set_font | () | void | Sets font on treeview via `send_msg_3C9A`. | FRAMEWORK |
| 0x00419020 | stub | FUN_00419020 | treeview_add_item | (text) | void | Sends `send_msg_3C50` (add string), increments count at +0x2C. | FRAMEWORK |
| 0x00419060 | stub | FUN_00419060 | treeview_clear | () | void | Sends `send_msg_3CDC` (clear all), resets count to 0. | FRAMEWORK |
| 0x004190A0 | stub | FUN_004190a0 | pad_text_buffer | (count) | void | Pads `DAT_00679640` (text buffer) with spaces. Calls `thunk_FUN_004aef57`. | LOW |
| 0x004190D0 | stub | FUN_004190d0 | show_help_topic | (section, topic) | void | Wrapper: calls `FUN_00419100(section, topic, 0)`. | MEDIUM |
| 0x00419100 | stub | FUN_00419100 | show_help_topic_ext | (section, topic, flags) | void | Wrapper: calls `FUN_00419130(section, topic, 0, flags)`. | LOW |
| 0x00419130 | stub | FUN_00419130 | open_help_dialog | (section, topic, subpage, flags) | void | Calls `thunk_FUN_0051d3e0` with 7 parameters. Opens a game help/Civilopedia dialog. | MEDIUM |

---

### Cluster: Hotseat Game Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00419170 | xlarge | FUN_00419170 | hotseat_game_loop | () | void | Master hotseat multiplayer game loop. String "HOTSEAT1". Sets `DAT_00655b02=1` (hotseat mode). Main menu switch: 0=new game, 1=load scenario, 2=custom world, 3=load save, 4=continue. Calls map gen, civ setup, RULES.TXT reload. Uses `_rand()` for world generation seeds (`DAT_00624ee8..ef8`). | HIGH |
| 0x00419940 | stub | FUN_00419940 | seh_cleanup_hotseat_1 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041994C | stub | FUN_0041994c | seh_cleanup_hotseat_2 | () | void | SEH cleanup. | FRAMEWORK |
| 0x00419962 | stub | FUN_00419962 | seh_unwind_hotseat | () | void | SEH frame unwind. | FRAMEWORK |

---

### Cluster: Palette / Art Loading Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00419B80 | stub | FUN_00419b80 | show_loading_screen | () | void | Calls `FUN_005bbb32`. Displays loading/splash screen. | LOW |
| 0x00419BA0 | stub | FUN_00419ba0 | set_palette_entries | (count) | void | Calls `update_palette_C280(*(in_ECX+8), count)`. Sets palette entry count (0x9E=158 entries). | MEDIUM |
| 0x00419BE0 | stub | FUN_00419be0 | load_palette_file | (filename) | void | Calls `FUN_005bc3f1` with window handle and palette filename. `DAT_0063cbd0` used as palette path. | MEDIUM |

---

### Cluster: CRT Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00419C20 | stub | FID_conflict:_$E31 | crt_static_init | () | void | **FRAMEWORK.** CRT static initializer. Calls `FUN_005bd630` and registers `FUN_00419c71` with `_atexit`. | FRAMEWORK |
| 0x00419C3A | stub | FUN_00419c3a | crt_init_surface_manager | () | void | Calls `FUN_005bd630` (surface/bitmap manager init). | FRAMEWORK |
| 0x00419C54 | stub | FUN_00419c54 | crt_register_cleanup | () | void | Registers atexit handler. | FRAMEWORK |
| 0x00419C71 | stub | FUN_00419c71 | crt_cleanup_surface_manager | () | void | Atexit cleanup: calls `FUN_005bd915`. | FRAMEWORK |

---

### Cluster: RULES.TXT Loading (Known Functions)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00419C8B | stub | FUN_00419c8b | reload_art_and_music | () | void | Calls `thunk_FUN_0046e020` twice: first with 0xFFFFFF95 (unload), then 0x6C (load standard art). | MEDIUM |
| 0x00419CBB | stub | FUN_00419cbb | parse_rules_value_with_advance | (min, max) | byte | Advances to next rules line, then parses clamped value. Calls `FUN_004a23fc(1)` then `clamp(parse, min, max)`. | HIGH |
| 0x00419CF4 | stub | FUN_00419cf4 | parse_rules_value | (min, max) | byte | **Already documented.** Parses current line value clamped to [min,max]. No line advance. | HIGH |
| 0x00419D23 | large | FUN_00419d23 | load_cosmic_rules | () | void | **Already documented.** Loads COSMIC section from RULES.TXT. Parses all 22 COSMIC constants into `DAT_0064bcc8..0064bcdd`. String "COSMIC". Enforces food_box even. | HIGH |
| 0x00419ED3 | medium | FUN_00419ed3 | normalize_leader_names | () | void | Post-processes leader name data at `DAT_006554fc` (stride 0x30, 21 entries). Converts negative name indices to positive (absolute value). Sets gender-specific default names. | MEDIUM |
| 0x0041A046 | large | FUN_0041a046 | load_advances | (reload) | void | **Already documented.** Loads ADVANCES section from RULES.TXT (100 techs). String "CIVILIZE". Populates `DAT_00627684` (tech_table). If reload=0, allocates name strings. Validates prereq chains. | HIGH |
| 0x0041A422 | medium | FUN_0041a422 | load_improvements | (reload) | void | **Already documented.** Loads IMPROVE and ENDWONDER sections. Populates `DAT_0064c488` (improvements, 67 entries stride 8) and `DAT_0064ba28` (wonder obsolete techs, 28 entries). String "IMPROVE", "ENDWONDER". | HIGH |
| 0x0041A5C4 | large | FUN_0041a5c4 | load_unit_types | (reload) | void | **Already documented.** Loads UNITS section from RULES.TXT (62 unit types). Populates `DAT_0064b1b8` (unit_type table, stride 0x14). Multiplies move_rate by `DAT_0064bcc8` (COSMIC[0]). HP stored *10. String "UNITS". | HIGH |
| 0x0041A95F | medium | FUN_0041a95f | load_terrain_rules | () | void | Loads TERRAIN section (33 entries = 11 base + 22 special). Populates `DAT_00627cc4` (terrain table, stride 0x18). Includes food/shield/trade values, irrigation/mining prereqs. String "TERRAIN". | HIGH |
| 0x0041AB18 | xlarge | FUN_0041ab18 | load_governments_and_leaders | (reload) | void | Loads GOVERNMENTS (7) and LEADERS (21) sections. Governments into `DAT_0064b9a0` (govt_name_table). Leaders into `DAT_006554fc` (leader_portrait_table, stride 0x30). Handles gender, civ style, city style, and per-government city name overrides. String "GOVERNMENTS", "LEADERS". | HIGH |
| 0x0041B00E | medium | FUN_0041b00e | load_all_rules | (reload) | void | Master RULES.TXT loader. Calls: `load_cosmic_rules`, `load_advances`, `load_improvements`, `load_unit_types`, `load_terrain_rules`, `load_governments_and_leaders`. Then loads CARAVAN (16 commodities → `DAT_0064b168`), ORDERS (12 entries → `DAT_00655490`), DIFFICULTY (6 → `DAT_0064ba10`), ATTITUDES (9 → `DAT_0064b9c0`). Strings: "CARAVAN", "ORDERS", "DIFFICULTY", "ATTITUDES". | HIGH |

---

### Cluster: Language / Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0041B177 | large | FUN_0041b177 | select_language | () | void | Language selection dialog. Reads INTER.DAT for available languages (English/Francais/Deutsch). Checks CIV.INI "Language Preference". Writes selection back to INI. Sets `DAT_00628064` (language ID) and `DAT_0062cd24` (language suffix). Strings: "English", "Francais", "Deutsch", "CIV.INI", "Civilization Gold". | HIGH |
| 0x0041B46A | stub | FUN_0041b46a | seh_cleanup_language | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041B480 | stub | FUN_0041b480 | seh_unwind_language | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041B48F | stub | FUN_0041b48f | shutdown_game | () | void | If game is running (`DAT_006252c4`), calls `FUN_0041f878` (cleanup views). Then calls `FUN_0041b8b0` (cleanup subsystems). Sets `DAT_0062c5b0=1` (shutdown flag). | MEDIUM |
| 0x0041B4C0 | large | FUN_0041b4c0 | initialize_game | () | int | **Master game initialization.** Sets up paths, initializes timer (4ms), loads string heap, LABELS.TXT, RULES.TXT, art assets, city preferences. Reads CIV.INI for herald warning. Detects screen resolution. Returns 0 on success, 1 on failure. Strings: "RULES", "STRINGHEAP", "<nil>", "Herald Warning Shown", "HERALDWARNING". | HIGH |
| 0x0041B8B0 | small | FUN_0041b8b0 | cleanup_subsystems | () | void | Shuts down subsystems in order: `FUN_00484d52` (flush), `FUN_005d48d0` (surfaces), `FUN_00568381` (sprites), `FUN_004db450` (sound), labels, string heap, event system. Calls `timeEndPeriod(4)`. | MEDIUM |
| 0x0041B8FF | medium | FUN_0041b8ff | show_tech_discovery_report | (civId) | void | Shows the "discoveries" report for a civ. Lists up to 12 most recently discovered techs (searching backward from 100). Uses civ name functions (`FUN_00493b10/c7d`). String at `DAT_006254a0`. | MEDIUM |

---

### Cluster: New Game Setup (Single-Player)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0041BA52 | xlarge | FUN_0041ba52 | new_game_setup_wizard | (gameType) | void | **6555 bytes.** Full new game setup wizard. Dialogs: difficulty, number of opponents, barbarian activity, game rules (advanced options), gender selection, civ/tribe selection, custom tribe names, city style selection. Randomizes AI opponents. Sets `DAT_00655b08` (difficulty), `DAT_00655b0d` (num AI), `DAT_00655b09` (barbarian level), `DAT_00655ae8` (game flags). Strings: "DIFFICULTY", "ENEMIES", "BARBARITY", "RULES", "ADVANCED", "ACCELERATED", "GENDER", "CUSTOMTRIBE", "CUSTOMTRIBE2", "CUSTOMCITY", "OPPONENT". | HIGH |
| 0x0041D3F2 | stub | FUN_0041d3f2 | seh_cleanup_newgame_1 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041D408 | stub | FUN_0041d408 | seh_unwind_newgame_1 | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041D417 | large | FUN_0041d417 | choose_map_size | () | void | Map size selection dialog. Preset sizes: Small (40x50), Medium (50x80), Large (75x120). Custom allows 20-250 range with 1000-10000 tile product limit. Sets `DAT_006d1160/62` (map width/height). Doubles width for internal storage. Sets flat/round earth flags. String "SIZEOFMAP", "CUSTOMSIZE". | HIGH |
| 0x0041D7C5 | stub | FUN_0041d7c5 | seh_cleanup_mapsize | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041D7DB | stub | FUN_0041d7db | seh_unwind_mapsize | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041D7EA | xlarge | FUN_0041d7ea | choose_world_params | () | void | World customization dialogs: land mass, landform, climate, temperature, age. Each has 3 options (randomizable). Sets `DAT_00624ee8..ef8` (world gen parameters) and `DAT_0064bc2a..32` (preferences). Strings: "CUSTOMLAND", "CUSTOMFORM", "CUSTOMCLIMATE", "CUSTOMTEMP", "CUSTOMAGE". | HIGH |
| 0x0041DC9E | stub | FUN_0041dc9e | seh_cleanup_worldparams | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041DCB4 | stub | FUN_0041dcb4 | seh_unwind_worldparams | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041DCC3 | stub | FUN_0041dcc3 | clear_start_locations | () | void | Sets all 21 start locations (`DAT_00627fe0/00628010`) to 0xFFFF (unset). | HIGH |

---

### Cluster: Scenario Loading / Resuming

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0041DD0E | large | FUN_0041dd0e | load_scenario_map | () | int | Loads a scenario .MP file. Shows file dialog, reads map data via `FUN_005b8783`. Clears tile attributes, optionally uses seed-based terrain. Checks for predefined start locations. Returns 0 on success, 1 on failure. Strings: "FAILEDTOLOAD", "USESEED", "USESTARTLOC". | HIGH |
| 0x0041DFE1 | xlarge | FUN_0041dfe1 | resume_saved_game | () | void | Loads and resumes a saved game. Shows load dialog, displays game info (turn, year). Allows player to choose which civ to play (if multiplayer save). Handles difficulty/gender selection. Strings: "SCENARIOLOADED", "DIFFICULTY", "GENDER". | HIGH |
| 0x0041E7B2 | stub | FUN_0041e7b2 | seh_cleanup_resume_1 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041E7BE | stub | FUN_0041e7be | seh_cleanup_resume_2 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041E7D4 | stub | FUN_0041e7d4 | seh_unwind_resume | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041E7E3 | small | FUN_0041e7e3 | reload_labels_and_strings | () | void | Reloads string heap and LABELS.TXT. Checks "STRINGHEAP" section for required heap size. Strings: "STRINGHEAP", "<nil>". | MEDIUM |
| 0x0041E864 | small | FUN_0041e864 | reload_rules_for_scenario | (reload) | void | Changes to scenario directory, reloads labels/strings, loads RULES.TXT (checking for scenario-specific "RULES.%lang" file first), resets working directory. String "RULES.". | HIGH |
| 0x0041E8FB | xlarge | FUN_0041e8fb | multiplayer_civ_selection | (gameType) | void | Multiplayer civ selection screen for joining a saved/scenario game. Lists available civs with tech/city counts. Allows gender and name customization. 1483 bytes. Strings: "GENDER". | MEDIUM |
| 0x0041EEC6 | stub | FUN_0041eec6 | seh_cleanup_mpciv | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041EEDC | stub | FUN_0041eedc | seh_unwind_mpciv | () | void | SEH frame unwind. | FRAMEWORK |

---

### Cluster: Single-Player Main Menu & Game Loop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0041EEEB | xlarge | FUN_0041eeeb | singleplayer_main_menu | () | void | Single-player main menu loop. Options: New game (3 sub-types), Load scenario, Load game, Multiplayer (XDaemon version check), Scenario editor, Credits. Sets `DAT_00655b02=0` (single player mode). Manages world gen seeds, calls setup wizards, launches game loop. String "MAINMENU". | HIGH |
| 0x0041F66E | stub | FUN_0041f66e | seh_cleanup_mainmenu_1 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041F67A | stub | FUN_0041f67a | seh_cleanup_mainmenu_2 | () | void | SEH cleanup. | FRAMEWORK |
| 0x0041F690 | stub | FUN_0041f690 | seh_unwind_mainmenu | () | void | SEH frame unwind. | FRAMEWORK |
| 0x0041F69F | large | FUN_0041f69f | post_load_game_init | () | void | Post-load initialization. Sets `DAT_006252c4=1` (game running). In multiplayer difficulty-0 or scenario mode, reveals full map for the human player (iterates all tiles, calls `FUN_005b976d` for visibility). Also sets mutual contact between all human civs. | HIGH |
| 0x0041F878 | small | FUN_0041f878 | cleanup_game_views | () | void | Tears down game UI. Destroys map views, city dialog, unit info, minimap. Sets `DAT_006252c4=0`. Hotseat mode (1): also stops MIDI. | MEDIUM |

---

### Cluster: Multiplayer (XDaemon) Game Entry Point

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0041F8D9 | xlarge | FUN_0041f8d9 | multiplayer_game_entry | () | void | **2326 bytes.** Top-level multiplayer game entry. Version string "5.4.0f Multiplayer 26 March 99", "Patch 3". Initializes XDaemon networking, reads INI settings (Simultaneous mode, MaxPlayers). Main game loop: init maps/views, launch turn processor (hotseat vs simultaneous), cleanup. Handles lobby launch (`XD_LaunchedByLobby`), chat logging ("chatlog.txt"). Strings: "SIMULTUT", "WRONGXDAEMONVERSION", "NEWCREDITS". | HIGH |
| 0x004201EF-0x0042021D | stub (4) | FUN_004201ef..FUN_0042021d | seh_cleanup_mp_* | () | void | SEH cleanup/unwind stubs for the multiplayer entry function. | FRAMEWORK |

---

## SUMMARY

### 1. Function Breakdown

| Category | Count | Notes |
|----------|-------|-------|
| **Map Window / Input** | 27 | Click, key, cursor, scrolling handlers |
| **Rules Editor (Scenario)** | 29 | Tech editor, dropdown/listbox UI, paint |
| **RULES.TXT Parsers** | 12 | COSMIC, ADVANCES, UNITS, IMPROVE, TERRAIN, GOVERNMENTS |
| **Game Setup / New Game** | 14 | Difficulty, map size, world params, civ selection |
| **Game Loop / Menus** | 8 | Main menu, hotseat, multiplayer entry, post-load init |
| **File I/O** | 4 | Path building, fopen, exists, filelength |
| **Sort Utilities** | 2 | Byte and int bubble sort |
| **UI Control Wrappers** | 30 | Combobox, listbox, editbox, treeview |
| **Framework (MFC/CRT/SEH)** | 78 | Constructors, destructors, SEH unwind, MFC library |

**Total: 204 functions**

### 2. Top 5 Most Important Undocumented Functions

1. **`FUN_0041f8d9` (0x0041F8D9)** — `multiplayer_game_entry`: The top-level multiplayer game loop (2326B). Contains version string, XDaemon protocol init, INI reading, and the full game session lifecycle. Critical for understanding multiplayer architecture.

2. **`FUN_0041eeeb` (0x0041EEEB)** — `singleplayer_main_menu`: The single-player main menu and game launch dispatcher (1891B). Orchestrates new game/load/scenario/credits flow. Central to understanding game startup.

3. **`FUN_0041ba52` (0x0041BA52)** — `new_game_setup_wizard`: The complete new game setup wizard (6555B). Contains all difficulty/opponent/world customization logic and the full tribe/leader selection flow.

4. **`FUN_00416c9e` (0x00416C9E)** — `create_rules_editor`: The scenario editor for RULES.TXT (2186B). Modal dialog with tech tree editing. Important for understanding the game's self-modification capabilities.

5. **`FUN_0041f69f` (0x0041F69F)** — `post_load_game_init`: Post-load initialization that grants full map visibility in certain modes (473B). Documents the "reveal map on difficulty 0" and multiplayer contact-sharing logic.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| `DAT_006ad8d4` | `input_lock_reentrant` | Set to 1 on entry, 0 on exit of all input handlers. Prevents re-entry during multiplayer flush. |
| `DAT_006ad8bc..DAT_006ad908` | `xd_message_queue[19]` | 19 consecutive int flags (0x006ad8bc to 0x006ad904, stride 4) checked as "all zero" before input processing. XDaemon send buffer state. |
| `DAT_0066ca84` | `view_alive_flags_base` | Base of 8-element array (stride 0x3F0). `[i*0x3F0]` = view active flag (short). `[i*0x3F0+2]` = view type bitmask. |
| `DAT_0066cb00` | `view_cursor_state_base` | Base of 8-element array (stride 0xFC). `[i*0xFC]` = cursor mode (0x201=normal, 0x202=goto, 0x1FE=goto-pending). |
| `DAT_00624f54` | `goto_timer_id` | Timer handle for delayed goto activation (400ms). -1 when inactive. |
| `DAT_00624f58` | `goto_source_view` | Index of the view that initiated the goto. -1 when inactive. |
| `DAT_00624f5c` / `DAT_00624f60` | `last_click_x` / `last_click_y` | Tile coordinates of last left-click on map. Used by double-click handler. |
| `DAT_0062805c` | `scroll_triggered` | Set to 1 when map auto-scroll occurs. Cleared on next timer tick. |
| `DAT_00628054` | `cursor_blink_state` | Toggles 0/1 on timer. Controls cursor sprite blinking. |
| `DAT_0062804c` | `cursor_blink_enabled` | Global enable for cursor blinking. Temporarily cleared during scroll operations. |
| `DAT_00628064` | `language_id` | 0=English, 1=French, 2=German. Set from CIV.INI or language dialog. |
| `DAT_006252c4` | `game_running` | 1 when game is in active play, 0 when in menus/shutdown. Guards input handlers. |
| `DAT_0062c5b0` | `shutdown_requested` | Set to 1 to trigger graceful game exit. |
| `DAT_006a1d7c` | `editor_active` | 1 while rules editor modal loop is running. Set to 0 to exit editor. |
| `DAT_006a4f88` | `editor_this_ptr` | Pointer to the rules editor object (CPropertySheet-derived). |
| `DAT_0062edf8` | `modal_dialog_active` | Non-zero when a modal dialog is open. Blocks map input. |
| `DAT_006c31ac` | `deferred_input_type` | Stores deferred input event type (1=click, 2=dblclick, 3=ascii, 4=key) when XD buffer is flushing. |
| `DAT_00628060` | `status_bar_visible` | Controls whether the bottom status bar is shown, affecting map panel height. |
| `DAT_0062bcb0` | `click_in_progress` | Set to 1 during click processing, cleared on exit. Prevents recursive click handling. |
