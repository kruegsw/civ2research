# Phase 1 Analysis: block_005A0000 (0x005A0000 - 0x005AFFFF)

## Overview
This block contains the **popup/listbox dialog system** (the custom "Popup" UI framework used for game menus, Civilopedia lists, and prompt dialogs), the **multiplayer turn synchronization** functions (`wait_production1`/`wait_production2`), **map coordinate utility** functions (wrapping, distance), the **unit type editor** (cheat/scenario editor), and the **PBEM (Play By Email) game setup** flow.

The popup system is centered around a large struct accessed via `in_ECX` (the `this` pointer) and the global `DAT_006cec84` (the current popup instance). It manages item lists, scrollbars, keyboard navigation, multi-column layouts, and text rendering. The `@` directive parser in `FUN_005a632a` processes game text file markup (`@OPTIONS`, `@TITLE`, `@BUTTON`, `@COLUMNS`, `@LISTBOX`, `@CHECKBOX`, etc.).

---

### Cluster: Popup Dialog — Text Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A0FEA | medium | FUN_005a0fea | popup_draw_text_truncated | char*, int x, int, int use_alt_color, int highlight | void | Truncates text string to fit within column width (offset +0x1E8), draws with optional shadow (two calls to FUN_005c0f57 offset by +1,+1 for shadow), selects foreground color from +0x94/+0x98 or +0xa0/+0xa4 | MEDIUM |
| 0x005A1148 | medium | FUN_005a1148 | popup_draw_split_text | char*, int y_offset, ?, ?, ? | void | Splits text on '|' (pipe=0x7c) delimiter, draws left-justified and right-justified halves via popup_draw_text_truncated. Used for two-column item display | HIGH |

### Cluster: Popup Dialog — Item Display & Layout

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A120B | large | FUN_005a120b | popup_draw_item | uint* item_node, int do_end_paint | uint (is_selected) | Draws a single item in the popup list. Calculates item position from linked-list index, draws selection highlight if item == selected (offset +0x88), calls popup_draw_split_text. Returns 1 if this item is the selected item | MEDIUM |
| 0x005A14D2 | large | FUN_005a14d2 | popup_redraw_visible_items | void | void | Redraws all visible items in popup list. Iterates through linked list (offset +0x228), handles dual-pane mode (flag 0x40 at +0x3E). Tracks whether selected item is visible (offset +0x6E). Saves/restores pane index (+0x12) | MEDIUM |
| 0x005A1766 | stub | FUN_005a1766 | popup_index_to_page | int index | int | Divides index by items-per-column (offset +0x5C indexed by pane +0x48) unless single-column mode (+0x38==1). Converts flat index to page number | MEDIUM |
| 0x005A17A4 | stub | FUN_005a17a4 | popup_align_to_column | int index | int | Rounds index down to column boundary. `index - (index % items_per_column)` unless single-column mode | MEDIUM |
| 0x005A17E9 | large | FUN_005a17e9 | popup_select_item | int item_node, int redraw | void | Sets the selected item (+0x220), adjusts scroll position (+0x210) to ensure item is visible, optionally redraws changed items or full list. Calls change callback (+0x24C) if present | MEDIUM |
| 0x005A1A44 | stub | FUN_005a1a44 | clamp_value | int val, int min, int max | int | Classic min/max clamp: `max(min, min(val, max))`. Duplicate of FUN_005adfa0 | HIGH |
| 0x005A1A7D | large | FUN_005a1a7d | popup_hittest | int x, int y | int (item_index or negative) | Hit-tests screen coordinates against popup item grid. Returns item index on hit, or negative values: -1=above, -2=below, -3=left, -4=right. Uses pane bounds at +0x158..+0x164 | MEDIUM |
| 0x005A1C52 | small | FUN_005a1c52 | popup_count_items_in_pane | int pane_id | int | Counts items in linked list (+0x228) whose pane field (+0xC) matches pane_id | MEDIUM |
| 0x005A1CAF | medium | FUN_005a1caf | popup_select_pane_by_coords | int x, int y | void | Determines which pane (0 or 1) contains the given coordinates by checking against pane rectangles (+0x138..+0x154). Sets current pane at +0x48 | MEDIUM |
| 0x005A1DA3 | small | FUN_005a1da3 | popup_set_scroll_position | int position | void | Sets scroll position for pane 0 of the global popup (DAT_006cec84). If position changed, redraws | MEDIUM |

### Cluster: Popup Dialog — Window Creation & Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A1E28 | large | FUN_005a1e28 | popup_create_window | void | int (success) | Creates the popup window: allocates 0x114 bytes (via FUN_0044c5a0), configures window style (0xC02 normal or 0x842 for flag 0x01), calls FUN_005bb3f0/FUN_005bb4ae to create the actual window, adjusts dimensions, sets scroll handler. SEH-protected | MEDIUM |
| 0x005A20F4 | stub | FUN_005a20f4 | popup_on_timer_callback | void | void | Timer callback that triggers popup_paint if DAT_006cec84 is valid | LOW |
| 0x005A211C | xlarge | FUN_005a211c | popup_init_controls | void | void | Massive initialization function (6616 bytes). Creates scrollbars, list controls, tab strips, icon buttons, and custom controls for the popup. Handles multi-column grids (via FUN_00531010), icon-mode lists (FUN_00418e00), text item lists, tab buttons (stride 0x40), radio buttons (stride 0x48), and standard buttons (stride 0x3C). Pushes popup onto stack (DAT_00635a9c/DAT_00635a58). String evidence: `s_popupStackIndex` assertion. References DAT_00655b02 (save_format_version) | HIGH |

### Cluster: Popup Dialog — Event Handlers & Callbacks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A3BAE | small | FUN_005a3bae | popup_on_grid_select | ?, int index | void | Grid selection callback: finds item by index in linked list, stores selected value at +0xD8, sets dirty flag 0x2000, invalidates | MEDIUM |
| 0x005A3C58 | stub | FUN_005a3c58 | popup_invalidate | void | void | Sets flag 0x400 on popup flags (+0xF) and invalidates the popup window surface | MEDIUM |
| 0x005A3C83 | stub | FUN_005a3c83 | popup_on_icon_select | void | void | Icon list selection handler: sets dirty flag 0x2000 and invalidates unless flag 0x04 at +0x3D | MEDIUM |
| 0x005A3CCA | medium | FUN_005a3cca | popup_on_tab_click | int tab_id | void | Tab button click handler: finds tab by index (id-300), stores value at +0xD8, updates current tab (+0x224), calls change callback (+0x23C), may invalidate | MEDIUM |
| 0x005A3DF3 | small | FUN_005a3df3 | popup_on_tab_help | void | void | Help/tooltip callback for tabs: calls callback at +0x240 and invalidates on return | LOW |
| 0x005A3E56 | large | FUN_005a3e56 | popup_on_button_click | int button_id | void | Button click handler: processes button IDs (offset by -100). Handles standard buttons (type 0/1/2 from +0x2AC), checkbox-style items, sets result value at +0xD8 | MEDIUM |
| 0x005A407F | xlarge | FUN_005a407f | popup_on_keypress | int vkey | void | Keyboard handler (2181 bytes). Handles: arrow keys (0xA1-0xA9/0xC0-0xC6) for list navigation with column-aware movement, Home (0xA7/0xC4), End (0xA1/0xC6), Page Up/Down (0xA4/0xA6), Enter (0xD1) for dual-pane tab selection. Large switch statement with labeled goto for linked-list traversal | MEDIUM |
| 0x005A49C1 | xlarge | FUN_005a49c1 | popup_on_alpha_key | byte char | void | Alphabetic key handler: finds first item starting with pressed letter via toupper comparison, scrolls and selects it. Handles grid mode (0x1000 flag), list mode, and tab mode differently | MEDIUM |
| 0x005A4DF3 | medium | FUN_005a4df3 | popup_on_lbutton_down | ?, ? | void | Left mouse button down: hit-tests position, selects item if valid, starts drag tracking (+0x218) | MEDIUM |
| 0x005A4EDF | xlarge | FUN_005a4edf | popup_on_mouse_move | ?, ? | void | Mouse move with button held (drag): handles scrolling when dragging outside bounds (negative hit-test values), selects item under cursor | MEDIUM |
| 0x005A535E | small | FUN_005a535e | popup_on_lbutton_up | ?, ? | void | Left mouse button up: finalizes drag, clears tracking flag, releases capture | MEDIUM |
| 0x005A53B8 | medium | FUN_005a53b8 | popup_on_dblclick | ?, ? | void | Double-click handler: selects item and sets dirty flag 0x2000 to confirm selection | MEDIUM |

### Cluster: Popup Dialog — Scrollbar Callbacks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A5494 | small | FUN_005a5494 | popup_on_vscroll_pane0_page | int page | void | Vertical scrollbar page handler for pane 0: sets scroll to page * items_per_column, redraws if changed | MEDIUM |
| 0x005A552C | small | FUN_005a552c | popup_on_vscroll_pane1_pos | int pos | void | Vertical scrollbar position handler for pane 1 | MEDIUM |
| 0x005A55B1 | small | FUN_005a55b1 | popup_on_vscroll_pane1_page | int page | void | Vertical scrollbar page handler for pane 1 | MEDIUM |

### Cluster: Popup Dialog — Painting & Background

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A5649 | medium | FUN_005a5649 | popup_draw_background | int* rect, int style | void | Draws popup background: if custom bitmap set (+0x01 field), tiles bitmap; otherwise uses standard fill via thunk_FUN_0040fdb0. Style 1 uses DAT_00635aa0 bitmap, style 2 uses DAT_00635aa4 | MEDIUM |
| 0x005A577E | xlarge | FUN_005a577e | popup_paint | void | void | Full popup paint handler (1964 bytes). Paints: background, title text with shadow, border decorations, tab buttons with icons and labels, radio buttons, all visible list items. Handles initial window creation via popup_create_window/popup_init_controls, manages sub-control painting | MEDIUM |

### Cluster: Popup Dialog — Show & Run

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A5F34 | xlarge | FUN_005a5f34 | popup_show_modal | int result_buf, int y_offset | int (selected_value) | Shows popup dialog modally: renders, enters message loop (FUN_005c61b0 or custom loop +0x250), collects result from checkbox states/selection. Handles minimize/restore. Returns selected value from +0xD8 | MEDIUM |
| 0x005A632A | xlarge | FUN_005a632a | popup_parse_text_file | ?, text_key, int default, char* input_buf, ?, ?, ?, uint flags | int (success) | Parses game text file section (2287 bytes). Processes `@` directives: `@OPTIONS`/`@PROMPT` (switch to options/prompt mode), `@TITLE=`, `@BUTTON=`, `@COLUMNS=`, `@HEIGHT=`, `@SMALLFONT`, `@X=`, `@Y=`, `@WIDTH=`, `@LENGTH=`, `@CHECKBOX`, `@LISTBOX`, `@SYSTEM`, `@DEFAULT=`. Adds lines as items or options. Flag 0x8000 = set flags directly, 0x4000000 = blank line handling | HIGH |

### Cluster: Popup Dialog — Global State

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A6C23 | stub | FUN_005a6c23 | popup_push_parent_surface | int surface | void | Saves current DAT_006359c4 to DAT_006359c8 and sets new value. Implements a 1-deep surface stack | MEDIUM |
| 0x005A6C45 | stub | FUN_005a6c45 | popup_pop_parent_surface | void | void | Restores DAT_006359c4 from DAT_006359c8 | MEDIUM |

### Cluster: Framework — Vector Destructors

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A9320 | small | FID_conflict__vector_deleting_destructor_ | vdtor_popup_item_3c | byte flags | void* | Vector deleting destructor for 0x3C-stride objects (popup list items). Calls thunk_FUN_0040f930 | FRAMEWORK |
| 0x005A93B0 | small | FID_conflict__vector_deleting_destructor_ | vdtor_radio_button_48 | byte flags | void* | Vector deleting destructor for 0x48-stride objects (radio buttons). Calls thunk_FUN_00418870 | FRAMEWORK |
| 0x005A9440 | small | FID_conflict__vector_deleting_destructor_ | vdtor_button_3c | byte flags | void* | Vector deleting destructor for 0x3C-stride objects (standard buttons). Calls thunk_FUN_0040f570 | FRAMEWORK |
| 0x005A94D0 | stub | FUN_005a94d0 | dtor_icon_list | byte flags | void* | Scalar deleting destructor for icon-list control. Calls thunk_FUN_00418ea0 | FRAMEWORK |
| 0x005A9520 | small | FID_conflict__vector_deleting_destructor_ | vdtor_tab_button_40 | byte flags | void* | Vector deleting destructor for 0x40-stride objects (tab buttons). Calls thunk_FUN_00453ba0 | FRAMEWORK |
| 0x005A95B0 | stub | FUN_005a95b0 | dtor_grid_control | byte flags | void* | Scalar deleting destructor for grid control (0x50 object from FUN_00531010). Calls thunk_FUN_0044cba0 | FRAMEWORK |

### Cluster: Popup Dialog — Accessors & Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A9600 | stub | FUN_005a9600 | popup_set_icon_bitmap | int bitmap_id | void | Sets icon bitmap on internal control via FUN_005bc9a3 using this->offset+8 | LOW |
| 0x005A9640 | stub | FUN_005a9640 | popup_clear_checked | void | void | Clears checked state: sets offset+0x34 to 0 | LOW |
| 0x005A9670 | stub | FUN_005a9670 | popup_get_item_text | int index, char* buf | void | Sends message 0x3CFF to get item text at index from list control at +0x1C | LOW |
| 0x005A96B0 | stub | FUN_005a96b0 | popup_get_selected_text | char* buf | void | Sends message 0x3D62 to get selected text from list control at +0x1C | LOW |
| 0x005A96F0 | stub | FUN_005a96f0 | popup_is_cancelled | void | bool | Returns whether cancel flag (bit 0x01 at offset +0x3D) is set | LOW |
| 0x005A9730 | stub | FUN_005a9730 | popup_draw_icon | int icon, int x, int y, int flags | void | Draws icon at position via thunk_FUN_0059f3d7 using surface at this->offset+8 | LOW |
| 0x005A9780 | stub | FUN_005a9780 | prepare_surface | int surface | void | Sets DAT_00635c64 to surface pointer. Already named in reference as prepare_surface | HIGH |

### Cluster: Drawing Primitives

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A9798 | stub | FUN_005a9798 | draw_colored_rect | ?, int x, int y, int w, int h, int color | void | Sets color via FUN_005c19ad then fills rect via FUN_005c11b2 | MEDIUM |
| 0x005A97CC | stub | FUN_005a97cc | draw_hline | surface, int x, int x2, int y, int color | void | Draws horizontal line: creates rect (x,y)-(x2+1,y+1) and fills with color | HIGH |
| 0x005A9811 | stub | FUN_005a9811 | draw_hline_width | surface, int x, int y, int width, int color | void | Draws horizontal line with width: rect (x,y)-(x+width,y+1) | HIGH |
| 0x005A9858 | stub | FUN_005a9858 | draw_vline | surface, int x, int y, int y2, int color | void | Draws vertical line: creates rect (x,y)-(x+1,y2+1) and fills | HIGH |
| 0x005A989D | stub | FUN_005a989d | draw_vline_height | surface, int x, int y, int height, int color | void | Draws vertical line with height: rect (x,y)-(x+1,y+height) | HIGH |
| 0x005A98E4 | small | FUN_005a98e4 | draw_rect_outline | surface, int left, int top, int right, int bottom, int color | void | Draws rectangle outline using 2 hlines + 2 vlines, all same color | HIGH |
| 0x005A9964 | small | FUN_005a9964 | draw_rect_outline_wh | surface, int x, int y, int w, int h, int color | void | Draws rectangle outline using width/height params (converts to absolute coords internally) | HIGH |
| 0x005A99FC | small | FUN_005a99fc | draw_3d_border | surface, int* rect, int light_color, int dark_color | void | Draws 3D sunken/raised border: top+left in light_color, bottom+right in dark_color. Classic Win3.1-era 3D effect | HIGH |
| 0x005A9AA3 | stub | FUN_005a9aa3 | set_brush_color | ?, int color | void | Sets brush color via FUN_005c041f | LOW |
| 0x005A9ABF | stub | FUN_005a9abf | fill_rect_xywh | surface, int x, int y, int w, int h, int color | void | Fills rectangle using x,y,w,h coordinates (creates RECT then calls FUN_005c0333=fill_rect_gdi) | MEDIUM |
| 0x005A9AFE | small | FUN_005a9afe | blit_rect_to_rect | ?, surface, int sx, int sy, int dx, int dy, int w, int h | void | Copies rectangle from source to dest coords via FUN_005c0593 (BitBlt wrapper) | MEDIUM |
| 0x005A9B5D | medium | FUN_005a9b5d | tile_bitmap | surface, bitmap, int dx, int dy, int dw, int dh, int bw, int bh | void | Tiles a bitmap across a destination rectangle using modular wrapping. Handles partial tiles at edges. Used for popup background tiling | MEDIUM |
| 0x005A9CE9 | small | FUN_005a9ce9 | draw_3d_border_inset | surface, int* rect, int light, int dark | void | Draws 3D border then shrinks rect by 1 pixel (via thunk_FUN_004bb800). Inset variant of draw_3d_border | MEDIUM |

### Cluster: Multiplayer Turn Synchronization — Wait Ready Checks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005A9F30 | medium | FUN_005a9f30 | mp_check_all_human_ready_production | void | void | Checks if all human players have submitted their production. Loops civs 1-7, checks active+human bitmasks (DAT_00655b0a/0b), checks per-civ ready flag (DAT_006ced20). If all ready, sets popup flag 0x400 and invalidates | MEDIUM |
| 0x005AA004 | medium | FUN_005aa004 | mp_check_all_human_ready_moves | void | void | Similar to above but checks DAT_006c921c flag. Also closes popup if fewer than 2 network players (DAT_006ad308) | MEDIUM |

### Cluster: Multiplayer Turn Synchronization — Main Loops

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005AA0E5 | xlarge | wait_production_005aa0e5 | wait_production_server | void | void | Server-side multiplayer turn loop (3994 bytes). String evidence: `"Server: %s (%d)"`, `"Client: %s (%d)"`, `"WAITPRODUCTION"`, `"WAITHUMANMOVES"`, `"CASUALTY"`, `"CASUALTIES"`, `"OURTURNTOMOVE"`. Manages: AI turns for non-connected civs, waits for all clients to submit production, processes AI moves, handles unit casualties display, timer-based auto-play (DAT_00654b70→DAT_00633a78), ESC key check for fast-forward (GetAsyncKeyState 0x1B). Calls XD_FlushSendBuffer for network I/O | HIGH |
| 0x005AB07F | stub | FUN_005ab07f | mp_cleanup_dialog | void | void | Cleanup thunk: calls thunk_FUN_0059df8a (dialog teardown) | LOW |
| 0x005AB095 | stub | FUN_005ab095 | mp_restore_seh | void | void | SEH frame epilog: restores FS:[0] from saved frame pointer | FRAMEWORK |
| 0x005AB0A3 | small | FUN_005ab0a3 | mp_check_ready_waitprod | void | void | Wait-production ready check: processes network, checks multiple flags (DAT_006c9214, DAT_006c918c, DAT_00628044=game_active, DAT_006c8fb4) to decide if popup should close | MEDIUM |
| 0x005AB120 | small | FUN_005ab120 | mp_check_ready_waitmoves | void | void | Wait-AI-moves ready check: similar structure, checks DAT_006c9218 | MEDIUM |
| 0x005AB19D | small | FUN_005ab19d | mp_check_ready_human | void | void | Wait-human-moves ready check: checks DAT_006c920c, DAT_006ad698 (reconnect flag), DAT_006ad685 | MEDIUM |
| 0x005AB23A | small | FUN_005ab23a | mp_check_ready_human_alt | void | void | Alternative human-ready check with slightly different flag logic | MEDIUM |
| 0x005AB2D5 | xlarge | wait_production_005ab2d5 | wait_production_client | void | void | Client-side multiplayer turn loop (3334 bytes). String evidence: `"Server: %s (%d)"`, `"Client: %s (%d)"`, `"CLIENTHOTWAIT"`, `"WAITHUMANMOVES"`, `"WAITPRODUCTION"`, `"WAITAIMOVES"`, `"CASUALTY"`, `"CASUALTIES"`, `"OURTURNTOMOVE"`. Three-phase wait: production→AI moves→human moves. Handles hot-seat, reconnection (DAT_006ad698), ESC fast-forward, casualties display, network sync via XD_FlushSendBuffer | HIGH |
| 0x005ABFDB | stub | FUN_005abfdb | mp_client_cleanup_dialog | void | void | Cleanup thunk for client loop | LOW |
| 0x005ABFF1 | stub | FUN_005abff1 | mp_client_restore_seh | void | void | SEH epilog for client loop | FRAMEWORK |

### Cluster: Civilopedia — Unit Details Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005AC840 | medium | FUN_005ac840 | pedia_unit_init_list | void | void | Initializes the Civilopedia unit type list: copies unit type IDs from +0xC98 to +0x1B38, sets scrollbar range to count/9, aligns to 9-unit pages (DAT_006a85a4 % 9). Calls FUN_004f6646 (refresh) | MEDIUM |
| 0x005AC9AD | xlarge | FUN_005ac9ad | pedia_unit_draw_details | void | void | Draws Civilopedia unit details panel (4075 bytes). Reads from unit_type array (DAT_0064b1b8, stride 0x14): prerequisite tech (+0x13→tech_table), cost (+0x10 as HP*10), move rate (+0x0A/COSMIC[0]), role (+0x12 via format string), attack (+0x0C), defense (+0x0D), HP (+0x0E as /10), firepower (+0x0F), range (+0x0B as /3). Renders unit sprite via FUN_005cef31. Processes "PEDIAUNITFACTS" text for unit flag descriptions (16 ability bits from +0x04 flags field). String evidence: `"PEDIA"`, `"PEDIAUNITFACTS"`, `"%d"` format strings | HIGH |
| 0x005AD998 | medium | FUN_005ad998 | pedia_select_unit_type | int unit_type_id | void | Selects a unit type in the Civilopedia: finds index in type list, sets current index (+0x120), refreshes detail panel, enters modal display loop (FUN_005c61b0). Checks DAT_006a677c (pedia window valid) and DAT_006ad908 | MEDIUM |

### Cluster: Utility Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005ADFA0 | stub | FUN_005adfa0 | clamp | int val, int min, int max | int | Already documented in reference. `max(min, min(val, max))` | HIGH |
| 0x005ADFD9 | stub | FUN_005adfd9 | swap_values | int* a, int* b | void | Swaps two 4-byte values | HIGH |
| 0x005AE006 | small | FUN_005ae006 | popcount_byte | uint bitmask | int | Counts set bits in lowest 8 bits (population count). Loops 8 times, tests bit 0, shifts right | HIGH |
| 0x005AE052 | small | FUN_005ae052 | wrap_x | int x | int | Wraps X coordinate horizontally. If flat map (DAT_00655ae8 bit 0x8000), no wrap. Otherwise wraps using map width DAT_006d1160 | HIGH |
| 0x005AE0B0 | small | FUN_005ae0b0 | wrap_y | int y | int | Wraps Y coordinate. Uses DAT_006d116a (map height*2). Same logic as wrap_x but for Y axis | HIGH |
| 0x005AE10E | small | FUN_005ae10e | distance_x_wrapped | int x1, int x2 | int | Calculates absolute X distance with wrap-around. Takes min of direct distance and wrapped distance (map_width - distance) | HIGH |
| 0x005AE17D | stub | FUN_005ae17d | tile_distance_x | int x1, int x2 | int | Tile-based X distance: `(distance_x_wrapped(x1,x2) + 1) >> 1`. Converts doubled-coordinate distance to tile distance | HIGH |
| 0x005AE1B0 | small | FUN_005ae1b0 | tile_distance_xy | int x1, int y1, int x2, int y2 | int | Full tile distance: `(abs_dx_wrapped + abs_dy) >> 1`. Manhattan distance in isometric coordinate system with X wrapping | HIGH |
| 0x005AE24D | small | FUN_005ae24d | tile_distance_dxdy | int dx, int dy | int | Tile distance from deltas: `(abs(dx) + abs(dy)) >> 1` | HIGH |
| 0x005AE296 | small | FUN_005ae296 | diagonal_movement_cost | uint dx, uint dy | int | Calculates diagonal movement cost. More complex formula accounting for the longer axis: subtracts half the difference from the larger component. Used for AI pathfinding | MEDIUM |
| 0x005AE31D | small | FUN_005ae31d | calc_movement_cost | int x1, int y1, int x2, int y2 | void (result via thunk) | Calls distance_x_wrapped for X, computes abs Y distance, then diagonal_movement_cost | MEDIUM |
| 0x005AE37B | stub | FUN_005ae37b | is_adjacent_direction | uint dir1, int dir2 | int | Returns 1 if dir1 is adjacent to dir2 on the 8-direction compass (checks (dir2+1)%8 and (dir2-1)%8) | HIGH |
| 0x005AE3BF | stub | FUN_005ae3bf | bit_index_to_byte_mask | int bit_index, int* byte_offset, int* bit_mask | void | Converts bit index to byte offset (bit_index >> 3) and bit mask (1 << (bit_index & 7)). For tech/visibility bitmask access | HIGH |
| 0x005AE3EC | small | FUN_005ae3ec | shift_by_signed | int value, int shift | int | Shifts value left by positive shift, right by negative shift (using abs). Handles shift=0 as no-op | MEDIUM |

### Cluster: PBEM (Play By Email) Game Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005AE580 | xlarge | FUN_005ae580 | pbem_game_setup | void | void | PBEM game setup main loop (1602 bytes). String evidence: `"PBEM1"`, `"EMAILNOT"`. Handles 5 cases: 0=new game (random map params), 1=load from pre-made map, 2=new from scenario, 3=load scenario, 4=load existing PBEM save. Uses rand() for map generation params (DAT_00624ee8..ef8). Sets save format version to 2 (DAT_00655b02). Calls load_verify_units for case 4 | HIGH |
| 0x005AEBEF | stub | FUN_005aebef | pbem_cleanup_dialog | void | void | Cleanup thunk for PBEM setup | LOW |
| 0x005AEC05 | stub | FUN_005aec05 | pbem_restore_seh | void | void | SEH epilog for PBEM setup | FRAMEWORK |
| 0x005AEC14 | medium | FUN_005aec14 | pbem_get_email_address | int civ_index, int is_password | void | Prompts for email address. String evidence: `"EMAILADDRESS"`. Stores result in DAT_00654da4 + civ_index*0x20 (email storage per civ) | HIGH |
| 0x005AED0D | stub | FUN_005aed0d | pbem_email_cleanup | void | void | Cleanup thunk | LOW |
| 0x005AED23 | stub | FUN_005aed23 | pbem_email_restore_seh | void | void | SEH epilog | FRAMEWORK |

### Cluster: Unit Type Editor (Cheat/Scenario Mode)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005AEF20 | large | FUN_005aef20 | editor_save_unit_types_to_buffer | void | void | Copies all 62 (0x3E) unit types from game arrays to editor buffer (DAT_006a1d88 for names at stride 0x28, DAT_006a2d28 for stats at stride 0x58). Reads from DAT_0064b1b8 (unit_type base). Converts: move_rate/COSMIC[0], HP/10, and copies all fields (prereq_tech, flags, domain, etc.) | HIGH |
| 0x005AF140 | large | FUN_005af140 | editor_load_unit_types_from_buffer | void | void | Reverse of above: writes editor buffer back to game unit type arrays. Converts move_rate*COSMIC[0], HP*10. Copies names (truncated to 15 chars) and all stat fields | HIGH |
| 0x005AF343 | medium | FUN_005af343 | editor_populate_spinners | void | void | Populates spinner/combo controls (type 9=edit, type 0xC=combo) in the unit editor dialog from the current unit type's stats in the editor buffer. Reads DAT_00635e60 control type table, DAT_006a4f88+0x2EC = current unit index | MEDIUM |
| 0x005AF4AE | medium | FUN_005af4ae | editor_read_spinners | void | int (changes_clipped) | Reads spinner/combo values back from controls into editor buffer. Clamps values using FUN_005adfa0 with min/max from DAT_00635eb8/DAT_00635ed8. Returns count of values that were clamped | MEDIUM |
| 0x005AF682 | stub | FUN_005af682 | editor_refresh_unit_list | void | void | Refreshes the unit list display via thunk_FUN_005b09dc | LOW |
| 0x005AF69D | large | FUN_005af69d | editor_write_unit_types_to_file | FILE* file | int (1=success) | Writes all 62 unit types to a file in RULES.TXT format. Outputs: name, flags, domain, move_rate/COSMIC[0], range, attack, defense, HP/10, firepower, cost, hold, role, prereq_tech, obsolete_tech, and 15-bit ability flags as comma-separated 0/1 values. Uses many `FUN_005f22e0` (strcat) and format strings | HIGH |
| 0x005AF9E3 | large | show_messagebox_F9E3 | editor_apply_unit_changes | void | void | "OK" handler for unit editor: calls editor_read_spinners, if no clamping occurred, saves changes to EVENTS file and RULES.TXT. String evidence: `"Error updating EVENTS %s"`, `"Error updating RULES %s"`, `"File I/O Error"`, `"UNITS"`. On clamping, repopulates spinners and shows notice dialog | HIGH |
| 0x005AFBCA | medium | FUN_005afbca | editor_rename_unit | void | void | Unit rename dialog. String evidence: `"UNITNAME"`, `"DEBUG"`. Prompts for new name, updates editor buffer (DAT_006a1d88), refreshes list control | HIGH |
| 0x005AFD3B | small | FUN_005afd3b | editor_show_help | void | void | Shows help for units editor. String evidence: `"UNITS"` section reference | MEDIUM |
| 0x005AFD9A | stub | FUN_005afd9a | editor_mark_dirty | void | void | Sets DAT_006a1d7c=0 and invalidates the editor window | LOW |
| 0x005AFDC2 | small | FUN_005afdc2 | editor_copy_unit_graphics | void | void | Copies unit graphics reference from source (DAT_00628420+0x7D8) to editor buffer (DAT_00641848 at stride 0x3C). Refreshes list | MEDIUM |
| 0x005AFE15 | small | FUN_005afe15 | editor_export_unit_text | void | void | Exports unit text description: formats as `"%s - %s"` and calls thunk_FUN_0058b47e (clipboard/export function) | MEDIUM |
| 0x005AFE84 | stub | FUN_005afe84 | editor_set_ability_checkbox | int checkbox_id, int is_set | void | Sets a checkbox state via thunk_FUN_0051d7d6(id, bool). Wrapper that converts int to bool | LOW |
| 0x005AFEA8 | xlarge | FUN_005afea8 | editor_show_abilities_dialog | void | void | Shows the unit abilities/flags editor dialog (1021 bytes). Sets 15 checkboxes from ability bitmask (DAT_006a2d58 at stride 0x58), shows `"ABILITIES"` dialog, reads back checkbox states into bitmask. Each bit corresponds to one of the 15 unit ability flags from RULES.TXT | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 68**

| Category | Count | Description |
|----------|-------|-------------|
| Popup Dialog System | 29 | The custom listbox/menu/prompt UI framework |
| Drawing Primitives | 11 | Line, rect, border, fill, blit, tile helpers |
| Multiplayer Sync | 10 | Server/client turn wait loops & ready checks |
| Map Utilities | 11 | Coordinate wrapping, distance, direction helpers |
| Unit Type Editor | 13 | Cheat/scenario mode unit stat editor |
| PBEM Setup | 5 | Play-by-email game initialization |
| Civilopedia | 3 | Unit details panel |
| Framework/CRT | 8 | Vector destructors, SEH epilogs, thunks |
| General Utility | 3 | clamp, swap, popcount |

**By size:**
- stub (<=20 lines): 26
- small (21-50): 14
- medium (51-100): 11
- large (101-300): 7
- xlarge (>300): 10

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_005a632a (popup_parse_text_file)** — The core text file parser that interprets `@` directives in game text files. This is the engine behind all in-game popups, menus, and prompts. Understanding this function is key to understanding how game UI content is structured.

2. **FUN_005a577e (popup_paint)** — The master paint handler for all popup dialogs. At 1964 bytes, it orchestrates background, title, tabs, items, icons, and borders. Critical for understanding the game's UI rendering pipeline.

3. **FUN_005ae1b0 (tile_distance_xy)** — The canonical tile distance function used throughout AI and game logic. Implements Manhattan distance in isometric doubled-coordinate space with horizontal wrapping.

4. **FUN_005ae052 (wrap_x)** — Horizontal coordinate wrapping function. Uses DAT_00655ae8 bit 0x8000 as flat-map flag and DAT_006d1160 as map width. Essential for all map coordinate calculations.

5. **FUN_005ac9ad (pedia_unit_draw_details)** — The Civilopedia unit details renderer at 4075 bytes. Maps unit type struct fields to display, parses "PEDIAUNITFACTS" text, and draws all unit statistics. Confirms unit type field layout.

### 3. New DAT_ Globals Identified (High Confidence)

| Address | Proposed Name | Evidence |
|---------|--------------|---------|
| DAT_006cec84 | popup_current_instance | Global pointer to active popup struct. Used by all popup event handlers |
| DAT_00635a9c | popup_stack_index | Stack index for nested popups (0-15). String: `"popupStackIndex"` |
| DAT_00635a58 | popup_stack[16] | Array of popup instance pointers, indexed by popup_stack_index |
| DAT_006ad678 | popup_main_instance | Alternative popup reference used by MP ready-check functions |
| DAT_006d1160 | map_width_doubled | Map width in doubled coordinates. Used by wrap_x and distance_x_wrapped |
| DAT_006d116a | map_height_doubled | Map height in doubled coordinates. Used by wrap_y |
| DAT_00655ae8 | map_flags | Bit 0x8000 = flat map (no wrapping). Checked by all wrap/distance functions |
| DAT_006ad308 | mp_player_count | Number of network players. Values < 2 bypass multiplayer sync |
| DAT_00628044 | mp_game_active | Game-active flag for multiplayer loops. '\0' = game ended |
| DAT_006ced20 | mp_civ_ready_flags[8] | Per-civ ready flags for multiplayer turn sync |
| DAT_00635aa0 | popup_bg_bitmap_1 | Background tiling bitmap for popup style 1 |
| DAT_00635aa4 | popup_bg_bitmap_2 | Background tiling bitmap for popup style 2 |
| DAT_006a4f88 | unit_editor_instance | Unit type editor dialog instance pointer |
| DAT_006a1d88 | editor_unit_names[62] | Editor buffer for unit type names (stride 0x28 = 40 bytes) |
| DAT_006a2d28 | editor_unit_stats[62] | Editor buffer for unit type stats (stride 0x58 = 88 bytes) |
| DAT_006a1d7c | editor_dirty_flag | Editor modification flag. 0 = needs save |
| DAT_00654da4 | pbem_email_addresses[8] | Per-civ email addresses for PBEM mode (stride 0x20 = 32 bytes) |
| DAT_00624ee8..ef8 | map_gen_params[5] | Random map generation parameters (temperature, landmass, etc.) |
