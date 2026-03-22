# Phase 1 Analysis: Block 0x00570000

Address range: 0x0057075C - 0x0058029F
Source: `block_00570000.c` (6024 lines, 122 functions)

---

### Cluster: Sprite Sheet Editor — TERRAIN1 Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057075C | stub | FUN_0057075c | sprited_terrain1_destructor_helper | 0 | void | Calls FUN_005c656b (resource destructor helper). SEH cleanup stub for FUN_00570780 | LOW |
| 0x00570772 | stub | FUN_00570772 | sprited_terrain1_seh_restore | 0 | void | SEH chain restore (FS:[0] = EBP-0xc). Epilogue of FUN_00570780 | LOW |
| 0x00570780 | xlarge | FUN_00570780 | sprited_process_terrain1 | 0 | void | Loads TERRAIN1.BMP/GIF, iterates 11 terrain types at y-offsets 0x21 apart (col 1 at x=1, col 0x83, col 0xc4), plus additional rows at y=100 (3 types), y=0x16c (9 pairs). Uses blit_normal (FUN_005cef31) to copy sprites. Saves modified bitmap back. String refs: "TERRAIN1.BMP", "TERRAIN1.GIF" | HIGH |

### Cluster: Sprite Sheet Editor — TERRAIN2 Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00570FA2 | stub | FUN_00570fa2 | sprited_terrain2_destructor_helper | 0 | void | SEH cleanup stub | LOW |
| 0x00570FB8 | stub | FUN_00570fb8 | sprited_terrain2_seh_restore | 0 | void | SEH chain restore | LOW |
| 0x00570FC6 | xlarge | FUN_00570fc6 | sprited_process_terrain2 | 0 | void | Loads TERRAIN2.BMP/GIF, processes 16 coast tiles (8x2 grid), 4 additional tiles at y=0x14b, 8 dither tiles at y=0x1ad with 4 sub-positions each. Saves back. String refs: "TERRAIN2.BMP", "TERRAIN2.GIF" | HIGH |

### Cluster: Sprite Sheet Editor — ICONS Processing (Set A)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005718EC | stub | FUN_005718ec | sprited_icons_a_destructor_helper | 0 | void | SEH cleanup stub | LOW |
| 0x00571902 | stub | FUN_00571902 | sprited_icons_a_seh_restore | 0 | void | SEH chain restore | LOW |
| 0x00571910 | large | FUN_00571910 | sprited_process_icons_a | 0 | void | Loads ICONS.BMP/GIF (set A), processes 4 rows x 5 cols grid at x=0x157, y=0xd3, spacing 0x25/0x15. Saves back. String refs: "ICONS.BMP", "ICONS.GIF" | HIGH |

### Cluster: Sprite Sheet Editor — ICONS Processing (Set B)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00571BAA | stub | FUN_00571baa | sprited_icons_b_destructor_helper | 0 | void | SEH cleanup stub | LOW |
| 0x00571BC0 | stub | FUN_00571bc0 | sprited_icons_b_seh_restore | 0 | void | SEH chain restore | LOW |
| 0x00571BCE | large | FUN_00571bce | sprited_process_icons_b | 0 | void | Loads ICONS.BMP/GIF (set B). Processes: 38 improvement icons (8-col grid from x=0x157,y=1), 28 wonder icons (7-col grid at y=0x6a), 1 special sprite at (199,0x100), 8 misc sprites at y=0x164. Saves back. String refs: "ICONS.BMP", "ICONS.GIF" | HIGH |

### Cluster: Sprite Sheet Editor — Dialog & UI Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00572065 | stub | FUN_00572065 | sprited_icons_b_cleanup | 0 | void | Destructor helper | LOW |
| 0x0057207B | stub | FUN_0057207b | sprited_icons_b_seh_epilogue | 0 | void | SEH chain restore | LOW |
| 0x00572089 | large | FUN_00572089 | sprited_open_dialog | 9 | void | Opens sprite editor dialog window. Sets up callback pointers (DAT_006ac484, 006ac47c, 006ac480), dialog dimensions, window style flags (0x202/0x802 base + 0x400 for scrollbar, 0x1000 for checkbox). Calls FUN_005bb4ae to create window. Centers if param_2&1 set. Default title from DAT_006341f0 if param_1==0. | MEDIUM |
| 0x005722AB | medium | FUN_005722ab | sprited_refresh_display | 0 | void | Refreshes sprite editor display. Blits current sprite view, stores viewport position, calls optional callback (DAT_006ac888), invalidates cache. | MEDIUM |
| 0x00572364 | stub | FUN_00572364 | sprited_invalidate_cache | 0 | void | Sets DAT_006ac88c=0 and invalidates object cache. Used to signal editor close. | MEDIUM |
| 0x00572389 | medium | FUN_00572389 | sprited_capture_viewport | 0 | void | Captures current viewport state. Saves DAT_006ac0f4/0f0 to DAT_006ac0a4/0a0 (alt position registers). Calls FUN_005cdf50 + FUN_005cec44 for palette/surface update. | MEDIUM |
| 0x005723EE | large | FUN_005723ee | sprited_draw_color_swatches | 0 | void | Draws 3-4 color selector swatches (32x32px) at positions relative to dialog origin. Four slots: DAT_00634000 (right-click color), DAT_00634004 (left-click color), DAT_00634008 (alt left), DAT_0063400c (alt right, conditional on DAT_006ac924!=11). | MEDIUM |
| 0x0057261A | large | FUN_0057261a | sprited_draw_palette_entry | 4 | void | Draws a single palette entry (10x10 box) at a grid position computed from palette index (param_4). Entries 10-202 valid. Highlights entries matching DAT_00634000 or DAT_00634004 with 0x29 vs 0x1d color frame. | MEDIUM |
| 0x00572740 | medium | FUN_00572740 | sprited_hit_test_toolbar | 2 | int | Hit-tests click position against sprite editor toolbar areas. Returns button index 0-14 or -1 if no hit. Grid is 3 cols (0x24 spacing) x 5 rows (0x26 spacing) starting at (0x11e, 0x14). | MEDIUM |
| 0x005727D8 | medium | FUN_005727d8 | sprited_init_view_mode | 0 | void | Initializes sprite view based on DAT_006ac924 (editor mode). Switch on modes 1-2, 5/7/8/10, 3/4/6/9. Calls blit_normal for modes requiring sprite preview. Sets background via FUN_005c041f. | MEDIUM |
| 0x00572887 | xlarge | FUN_00572887 | sprited_paint_pixel | 2 | ptr | Paints pixel(s) in sprite editor at (param_1, param_2). Behavior depends on DAT_006ac124 (brush mode: 0=single pixel, 1=3px crosshair, 2=4px block). Returns ptr to DAT_006ac108 (dirty rect). Uses DAT_006ac894 as paint color (falls back to DAT_006ac874 if 0). | MEDIUM |
| 0x00572DA0 | large | FUN_00572da0 | sprited_draw_cursor_crosshair | 0 | void | Draws crosshair cursor overlay at current viewport position (DAT_006ac0f0/0f4). Draws grid lines at x=0x20, x=0xd0, y=0x4c using palette 0x6a, plus position indicator using palette 10 and 0x29. | MEDIUM |
| 0x00572FFF | xlarge | FUN_00572fff | sprited_handle_mouse_click | 2 | void | Main mouse click handler for sprite editor. 15-case switch on hit-test result: case 0 = palette pick (left/right), case 1-2 = brush select, case 3 = swap viewport, case 4 = reset mode, case 5 = apply palette, case 6 = swap colors, case 7 = rotate colors, case 8 = import bitmap, case 9-11 = brush size, case 12 = cycle left color, case 13 = no-op, case 14 = scroll/pick alt color. Also handles painting in the canvas area based on DAT_006ac120 (current tool mode). | MEDIUM |

### Cluster: Sprite Sheet Editor — Input & Cleanup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00573ADC | stub | FUN_00573adc | sprited_string_destructor | 0 | void | Calls FUN_005cde4d (CString destructor) | LOW |
| 0x00573AEF | stub | FUN_00573aef | sprited_click_seh_restore | 0 | void | SEH chain restore | LOW |
| 0x00573AFD | stub | FUN_00573afd | sprited_release_capture | 0 | void | Sets DAT_006ac8a4=0, calls ReleaseCapture(). Mouse button-up handler. | HIGH |
| 0x00573B1D | large | FUN_00573b1d | sprited_handle_mouse_move | 2 | void | Mouse move handler for sprite editor. Tracks cursor position, changes cursor icon based on region (canvas/palette/toolbar → cursor 0x201/0x204/0x205). When DAT_006ac8a4 (drag flag) is set: mode 1 draws line (Bresenham-like via 256x fixed-point), mode 2 paints individual pixels. Calls sprited_paint_pixel for actual drawing. | MEDIUM |

### Cluster: Sprite Sheet Editor — Main Entry & Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00573E59 | xlarge | FUN_00573e59 | sprited_show_editor | 4 | void | Main entry point for sprite sheet editor dialog. Sets DAT_006ac924 (editor type: 0=icons, 1=cities, 7-10=terrain, 11=units). Initializes viewport, brush mode, cursor. Creates window with "OK" and "Cancel" buttons (improvement name labels from DAT_00628420+0x3f8/3fc). Runs message loop until DAT_006ac88c==0. | MEDIUM |
| 0x0057420C | stub | FUN_0057420c | sprited_destroy_button_1 | 0 | void | Calls thunk_FUN_0040f570 (button destructor) | LOW |
| 0x00574218 | stub | FUN_00574218 | sprited_destroy_button_2 | 0 | void | Calls thunk_FUN_0040f570 (button destructor) | LOW |
| 0x0057422B | stub | FUN_0057422b | sprited_show_seh_restore | 0 | void | SEH chain restore | LOW |

### Cluster: Sprite Sheet Editor — Rendering & Layout

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00574239 | large | FUN_00574239 | sprited_redraw_all | 0 | void | Full redraw of sprite editor. Fills background (0x1d), renders sprite canvas (4x zoom), draws full palette grid (192 entries at 10-202), draws 3x5 toolbar buttons (32x32 with 10px frame), draws color swatches, sets text style (0x29, size 0x12, bold 1). | MEDIUM |
| 0x00574522 | large | FUN_00574522 | sprited_draw_preview_centered | 0 | void | Draws centered preview of current sprite in the editor. Computes position from panel dimensions, gets system metrics for title bar height, applies 2x zoom, uses scale factor 2. | MEDIUM |
| 0x00574686 | stub | FUN_00574686 | sprited_redraw_preview_thunk | 0 | void | Thunk to FUN_00574522 (sprited_draw_preview_centered). | LOW |

### Cluster: Sprite Sheet Editor — Sprite Coordinate Lookup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005746A1 | xlarge | FUN_005746a1 | sprited_get_sprite_coords | 5 | int | Maps sprite index (param_1) to sheet coordinates (*param_2=x, *param_3=y, *param_4=w, *param_5=h). Returns total sprite count for the sheet type. Switch on DAT_006ac924: case 0 = ICONS (4x5, 0x24x0x14), case 1 = CITIES (2 banks of 0x18, 0x40x0x30), case 2 = CITIES alt (4 slots), case 3 = small icons (9x2, 0x0ex0x16), case 4 = ICONS extended (38+28), case 5 = special (1 at 199,0x100), case 6 = 8 misc (0x20x0x20), case 7 = TERRAIN1 base (11x4+22, 0x40x0x20), case 8 = TERRAIN2 (16x4+4 coast, 0x40x0x20), case 9 = TERRAIN2 dither (8x4, 0x20x0x10), case 10 = TERRAIN1 extra (6+18), case 11 = UNITS (9-col, 0x40x0x30). Returns sprite count per type. | HIGH |

### Cluster: Sprite Sheet Editor — Sprite Modification

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00574C47 | small | FUN_00574c47 | sprited_edit_single_sprite | 1 | void | Edits a single sprite: gets coords via sprited_get_sprite_coords, creates render context (FUN_005cedad with mode=7), then redraws preview. | MEDIUM |
| 0x00574CA6 | large | FUN_00574ca6 | sprited_open_preview_dialog | 9 | void | Opens sprite preview/selection dialog. Very similar to sprited_open_dialog but uses DAT_006ac5xx series globals instead of 006ac2xx. No callback invocation at end (compare with FUN_00572089 which calls thunk_FUN_0059d3c9). | MEDIUM |
| 0x00574E98 | medium | FUN_00574e98 | sprited_init_preview | 0 | void | Initializes preview mode. Calls FUN_005cf467(9,7) to set render context dimensions, gets sprite sheet properties, initializes view mode (sprited_init_view_mode), blits initial view, invalidates preview cache. | MEDIUM |

### Cluster: Sprite Sheet Editor — Apply Changes

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00574F50 | xlarge | FUN_00574f50 | sprited_apply_changes | 0 | void | Applies edited sprites back to game sprite sheets. Prompts "RUSURE" confirmation (s_DEBUG/s_RUSURE). Massive switch on DAT_006ac924 (12 cases): copies modified sprites from editor buffer to target DAT_ addresses (per-type sprite arrays). String ref: "RUSURE". Each case iterates sprite count, calls sprited_get_sprite_coords then FUN_00575d89 to write back. | HIGH |
| 0x00575D89 | small | FUN_00575d89 | sprited_write_sprite_back | 5 | void | Writes a single sprite back to the game's sprite sheet buffer. Creates render context at coords on DAT_006ac0a8, then calls FUN_005cf467(9,7) to finalize. | MEDIUM |
| 0x00575DC4 | stub | FUN_00575dc4 | sprited_close_preview | 0 | void | Closes preview by setting DAT_006ac890=0 and invalidating cache. | MEDIUM |

### Cluster: Sprite Sheet Editor — Preview Window Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00575DEC | xlarge | FUN_00575dec | sprited_setup_preview_window | 0 (thiscall) | void | Sets up the sprite preview window with scrollbar and 3 buttons. Stores `this` in DAT_006ac11c. Sets dimensions (0xf0 x 0xf0). Opens preview dialog via sprited_open_preview_dialog. Creates scrollbar control, two buttons with improvement names from DAT_00628420+0x3f8/0x954/0x3fc. Runs message loop until DAT_006ac890==0. If DAT_006ac924==5, calls thunk_FUN_00453c40 (wonder-related). | MEDIUM |
| 0x0057624D | stub | FUN_0057624d | sprited_setup_preview_thunk | 0 | void | Thunk to sprited_setup_preview_window (FUN_00575dec). | LOW |

### Cluster: Sprite Sheet Editor — Import Bitmap Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00576267 | xlarge | show_messagebox_6267 | sprited_import_bitmap | 0 | void | File import dialog for sprite editor. Opens file browser for BMP/GIF files. File type depends on DAT_006ac924: "ICONS" (cases 0,4,5,6), "CITIES" (1,2,3), "TERRAIN" (7-10), "UNITS" (11). Validates filename matches expected prefix. Terrain files must have odd digit in name. Loads via thunk_load_bitmap or FUN_005bf071 (GIF). Shows MessageBoxA errors for load failure. String refs: "ICONS", "CITIES", "TERRAIN", "UNITS", "BMP/GIF", "ODDTERRAIN", "EVENTERRAIN". | HIGH |
| 0x005767A7 | stub | FUN_005767a7 | sprited_import_free_string | 0 | void | Calls thunk_FUN_0059df8a (string/buffer free) | LOW |
| 0x005767B3 | stub | FUN_005767b3 | sprited_import_destructor | 0 | void | SEH cleanup stub | LOW |
| 0x005767C9 | stub | FUN_005767c9 | sprited_import_seh_restore | 0 | void | SEH chain restore | LOW |

### Cluster: MFC Library Functions — CBitmapButton, ios_base, CHtmlStream

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00578390 | medium | CBitmapButton::~CBitmapButton | — (FRAMEWORK) | 1 (this) | void | MFC CBitmapButton destructor. Destroys 4 bitmap resources and base CButton. VS98 Debug library match. | HIGH |
| 0x00578402 | stub | FUN_00578402 | cbitmapbutton_destroy_bmp_1 | 0 | void | FRAMEWORK — bitmap destructor call | LOW |
| 0x00578411 | stub | FUN_00578411 | cbitmapbutton_destroy_bmp_2 | 0 | void | FRAMEWORK — bitmap destructor call | LOW |
| 0x00578420 | stub | FUN_00578420 | cbitmapbutton_destroy_bmp_3 | 0 | void | FRAMEWORK — bitmap destructor call | LOW |
| 0x0057842F | stub | FUN_0057842f | cbitmapbutton_destroy_bmp_4 | 0 | void | FRAMEWORK — alternate destructor (thunk_FUN_0040fbb0) | LOW |
| 0x0057843E | stub | FUN_0057843e | cbitmapbutton_destroy_base | 0 | void | FRAMEWORK — calls COleCntrFrameWnd destructor | LOW |
| 0x00578451 | stub | FUN_00578451 | cbitmapbutton_seh_restore | 0 | void | FRAMEWORK — SEH chain restore | LOW |
| 0x005784A0 | medium | FUN_005784a0 | init_menu_control | 0 (thiscall) | ptr | Initializes a custom UI control object. Calls thunk_FUN_0055339f (base init), thunk_FUN_0040fb00 + 3x thunk_FUN_0040f3e0 (sub-control init). Sets vtable to PTR_FUN_0061d6fc. Returns this pointer. | MEDIUM |
| 0x005785D0 | small | ios_base::precision | — (FRAMEWORK) | 2 (this, int) | int | FRAMEWORK — VS98 ios_base::precision setter. Returns old value. | HIGH |
| 0x00578610 | small | ios_base::width | — (FRAMEWORK) | 2 (this, int) | int | FRAMEWORK — VS98 ios_base::width setter. Returns old value. | HIGH |

### Cluster: Custom Menu/Listbox Control System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00578650 | small | FUN_00578650 | menu_ctrl_set_item_count | 1 | void | Calls thunk_FUN_004980ec (reset) then thunk_FUN_00497ea0(ecx+4, 0xb, param_1) to set item count. | MEDIUM |
| 0x0057868C | small | CHtmlStream::Reset | — (FRAMEWORK) | 1 (this) | void | FRAMEWORK — VS98 CHtmlStream::Reset. Zeros offsets at +0x18 and +0x1c. | HIGH |
| 0x005786B6 | small | FUN_005786b6 | menu_ctrl_reset_and_init | 1 | void | Resets control (thunk_FUN_0049805e + CHtmlStream::Reset) then sets item count via FUN_00578650. | MEDIUM |
| 0x005786F1 | medium | FUN_005786f1 | menu_ctrl_create | 1 | obj | Creates menu control object. Calls FUN_005dcc10 (constructor helper), thunk_FUN_00428cb0 (string init), then menu_ctrl_reset_and_init. SEH-protected. | MEDIUM |
| 0x00578770 | small | FUN_00578770 | menu_ctrl_destroy | 0 (thiscall) | void | Destroys menu control. Calls thunk_FUN_004980ec(ecx+4) to free items, then _Timevec destructor. SEH-protected. | MEDIUM |
| 0x005787BD | stub | FUN_005787bd | menu_ctrl_destroy_timevec | 0 | void | FRAMEWORK — _Timevec destructor call | LOW |
| 0x005787D0 | stub | FUN_005787d0 | menu_ctrl_destroy_seh | 0 | void | SEH chain restore | LOW |

### Cluster: Menu/Tree Node Navigation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005787DE | small | FUN_005787de | menu_find_item_by_id | 1 | int | Walks linked list at this+0x1c. Returns node where node[1]==param_1, or 0 if not found. Node layout: [0]=text_ptr, [1]=id, [2]=flags, [3]=?, [4]=next, [5]=prev, [6]=parent. | MEDIUM |
| 0x00578840 | medium | FUN_00578840 | menu_get_visible_index | 1 | int | Returns 1-based visible index of node param_1 in the top-level list. Skips items with flag bit 2 (hidden). | MEDIUM |
| 0x005788A9 | medium | FUN_005788a9 | menu_get_id_at_visible_index | 1 | int/-1 | Returns item ID at 1-based visible position param_1. Skips hidden items (flag bit 2). Returns -1 if not found. | MEDIUM |
| 0x00578922 | medium | FUN_00578922 | menu_find_subitem_by_id | 1 | int | Searches all top-level items' sublists (node+0x18 chain) for subitem with id==param_1. Returns subitem node or 0. | MEDIUM |
| 0x005789AA | medium | FUN_005789aa | menu_get_subitem_visible_index | 1 | int | Returns 1-based visible index of subitem within its parent's sublist. Skips hidden items. | MEDIUM |
| 0x00578A1C | medium | FUN_00578a1c | menu_get_subitem_id_at_index | 2 | int/-1 | Given parent ID (param_1) and 1-based visible position (param_2), returns subitem ID. Returns -1 if not found. | MEDIUM |
| 0x00578ABD | small | FUN_00578abd | menu_replace_pipe_with_tab | 1 (char*) | void | Iterates string, replaces '|' (0x7c) with '\t' (0x09). Used for menu text formatting. | HIGH |

### Cluster: Menu Item CRUD Operations

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00578B06 | large | FUN_00578b06 | menu_add_toplevel_item | 2 | ptr | Allocates 0x1c-byte node via thunk_FUN_00498159, appends to linked list at this+0x1c. Sets node[1]=param_1 (id), copies param_2 (text), applies pipe→tab transform. Clears bit 0x8000 in this+0x18. Returns new node. | MEDIUM |
| 0x00578C12 | large | FUN_00578c12 | menu_add_sub_item | 4 | ptr | Adds subitem under parent identified by param_1. Allocates node, appends to parent's sublist (parent+0x18). Sets node[6]=parent, text from param_3, pipe→tab. param_4=min text buffer size. Returns node or NULL if parent not found. | MEDIUM |
| 0x00578D8A | small | FUN_00578d8a | menu_dispatch_item_click | 2 | void | Resolves param_1 (visible row) and param_2 (sub-index) to actual item IDs via menu_get_id_at_visible_index + menu_get_subitem_id_at_index, then calls DAT_0063430c callback with both IDs. | MEDIUM |
| 0x00578DE8 | small | FUN_00578de8 | menu_set_host_window | 1 | void | Stores CPropertySheet ptr in DAT_00634304, this in DAT_00634308. Calls thunk_FUN_00579b40 and EnableStackedTabs with handler address 0x40341d. | MEDIUM |
| 0x00578E38 | stub | FUN_00578e38 | menu_set_callback | 1 | void | Sets DAT_00634308=this (ECX), DAT_0063430c=param_1 (callback function pointer). | MEDIUM |
| 0x00578E60 | small | FUN_00578e60 | menu_toggle_item_checked | 1 | void | Toggles bit 0 (checked) on subitem found by ID. Updates UI via thunk_FUN_00579ac0 (check/uncheck visual). | MEDIUM |
| 0x00578EC7 | small | FUN_00578ec7 | menu_toggle_item_grayed | 1 | void | Toggles bit 2 (grayed) state on subitem. Updates via thunk_FUN_00579b00 (gray/ungray visual). | MEDIUM |

### Cluster: Menu Population & State Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00578F2C | large | FUN_00578f2c | menu_populate | 1 | void | Populates or clears entire menu system. If param_1==0: clears all subitems (30 to 0 per top item). If param_1!=0: builds tab-delimited header string via FUN_005799c0, then adds all subitems per top-level item via thunk_FUN_00579a00. Applies checked (bit 0) and grayed (bit 2) states. Sets bit 0x8000 in this+0x18 when done. Calls menu_set_host_window at end. | MEDIUM |
| 0x005791DF | medium | FUN_005791df | menu_set_item_hidden | 2 | void | Sets/clears hidden flag (bit 1) on top-level item by ID. Clears rebuild flag (bit 0x8000) when visibility changes. param_2: 0=show, nonzero=hide. | MEDIUM |
| 0x00579260 | medium | FUN_00579260 | menu_set_subitem_hidden | 2 | void | Sets/clears hidden flag (bit 1) on subitem by ID. Same logic as menu_set_item_hidden but searches sublists. | MEDIUM |
| 0x005792E1 | medium | FUN_005792e1 | menu_set_subitem_checked | 2 | void | Sets/clears checked flag (bit 0) on subitem. If menu is built (bit 0x8000) and item is visible, toggles UI via menu_toggle_item_checked. | MEDIUM |
| 0x005793A3 | medium | FUN_005793a3 | menu_remove_subitem | 1 | void | Removes subitem from parent's sublist. Calls thunk_FUN_00579a40 (visual remove) then unlinks node[5]→next = node[4]. | MEDIUM |
| 0x0057940D | medium | FUN_0057940d | menu_set_subitem_grayed | 2 | void | Sets/clears grayed flag (bit 2) on subitem. If menu is built and item visible, toggles UI via menu_toggle_item_grayed. | MEDIUM |
| 0x005794CF | medium | FUN_005794cf | menu_set_all_subitems_checked | 2 | void | Sets checked state on all subitems under parent ID (param_1). Iterates parent's sublist, calls menu_set_subitem_checked for each. | MEDIUM |
| 0x0057953E | medium | FUN_0057953e | menu_update_subitem_text | 2 | void | Updates text of subitem (found by ID=param_1). Copies param_2 string, applies pipe→tab, and if menu is built and visible, updates display via thunk_FUN_00579a80. | MEDIUM |

### Cluster: Menu Control Thunks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005799C0 | stub | FUN_005799c0 | menu_create_header | 1 | void | Creates header/tab control. Calls FUN_005e0f2a with text, stores result in *this. | MEDIUM |
| 0x00579A00 | stub | FUN_00579a00 | menu_insert_item | 3 | void | Inserts menu item via build_menu_128C(*this, param_1, param_2, param_3). | MEDIUM |
| 0x00579A40 | stub | FUN_00579a40 | menu_delete_item | 2 | void | Deletes menu item via FUN_005e1226(*this, param_1, param_2). | MEDIUM |
| 0x00579A80 | stub | FUN_00579a80 | menu_change_item_text | 3 | void | Changes item text via FUN_005e14c8(*this, param_1, param_2, param_3). | MEDIUM |
| 0x00579AC0 | stub | FUN_00579ac0 | menu_check_item | 3 | void | Sets check state via FUN_005e1118(*this, param_1, param_2, param_3). | MEDIUM |
| 0x00579B00 | stub | FUN_00579b00 | menu_enable_item | 3 | void | Sets enabled/grayed state via FUN_005e11be(*this, param_1, param_2, param_3). | MEDIUM |
| 0x00579B40 | small | FUN_00579b40 | menu_setup_parent | 1 | void | Gets handle via thunk_FUN_00579b90 → thunk_FUN_00414d10 → FUN_005bcdfc, then stores param_1 at this+0x78. | MEDIUM |
| 0x00579B90 | stub | FUN_00579b90 | menu_get_handle | 0 (thiscall) | int | Returns *this (first field = window/menu handle). | LOW |
| 0x00579BC0 | stub | CPropertySheet::EnableStackedTabs | — (FRAMEWORK) | 2 (this, int) | void | FRAMEWORK — VS98 CPropertySheet::EnableStackedTabs. Stores param_1 at this+0x98. | HIGH |
| 0x00579BF0 | small | FUN_00579bf0 | menu_update_host | 0 (thiscall) | void | If this+0x78 != 0, calls FUN_005e10fb with window handle. Used to notify host of menu state change. | MEDIUM |

### Cluster: Diplomacy — Treaty Violation Check

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00579C40 | large | FUN_00579c40 | diplomacy_check_treaty_violation | 2 | int | Checks treaty violations between param_1 and param_2 civs. Accesses DAT_0064c6c0 (treaty flags array, stride 0x594 = civ struct). Checks peace (bit 4), ceasefire (bit 2), alliance (bit 8). If human civ involved with active alliance, calls thunk_FUN_0045ac71 (alliance handling). Sets recentPeace flag (0x1000) if at war with someone who had contact flag bit 0x10 clear. Returns 1 if peace was declared, 0 otherwise. Uses DAT_00655b0b (human civs bitmask). | HIGH |

### Cluster: Diplomacy — Annoyance/War Declaration

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00579DBB | large | FUN_00579dbb | calc_city_value_for_capture | 1 | int | Calculates city value for capture/ransom. Uses city owner gold (DAT_0064c6a2+civ*0x594), city size (DAT_0064f349), and city count (DAT_0064c70c). Formula: (size * gold) / (cityCount+1), clamped to 32000 if overflow. City param_1 is city slot index. | MEDIUM |
| 0x00579ED0 | xlarge | FUN_00579ed0 | diplomacy_check_attack_allowed | 3 | int | Checks whether an attack by param_1 against param_2's territory is allowed (senate override, etc). param_3 = treaty flag to check. String refs: "ANNOY", "ANNOYCEASE", "ANNOYVASSAL", "ANNOYPEACE", "ANNOYALLIED", "ALLOWHAWKS", "ALLOWAGGRESSOR", "ALLOWUN", "OVERRULE". Checks government type (DAT_0064c6b5), Republic/Democracy senate restrictions. Returns 0 if blocked, 1 if allowed. Uses has_building check for United Nations (wonder 0x18=24). Deeply nested diplomacy logic. | HIGH |

### Cluster: Diplomacy — Tech Theft/Exchange

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057A27A | xlarge | FUN_0057a27a | diplomacy_steal_tech | 2 | void | Handles technology stealing from param_2 by param_1. Iterates all 100 techs (FUN_004bd9f0), finds ones param_2 has but param_1 doesn't. Excludes scenario-locked techs (0x1f=31, 0x36=54, 0xf=15, 0x47=71, 0x15=21) if game flag 0x80 + 0x10. For human player, shows "TAKECIV" selection dialog. AI picks highest value (FUN_004bdb2c). Transfers tech via thunk_FUN_004bf05b. Shows "TOOKCIV" message or multiplayer notification. String refs: "TAKECIV", "TOOKCIV". | HIGH |
| 0x0057A661 | stub | FUN_0057a661 | steal_tech_free_string | 0 | void | String/buffer cleanup | LOW |
| 0x0057A677 | stub | FUN_0057a677 | steal_tech_seh_restore | 0 | void | SEH chain restore | LOW |

### Cluster: City Capture — Utility Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057A685 | large | FUN_0057a685 | find_most_central_city | 1 | int | Finds most centrally-located city for civ param_1. Iterates all city slots, for each alive city owned by param_1, computes sum of distances (FUN_005ae31d) to all other cities of same civ. Returns city with minimum total distance, or -1 if none. Used for capital/palace relocation. | MEDIUM |
| 0x0057A7E9 | large | FUN_0057a7e9 | transfer_city_ownership | 3 | void | Transfers city param_1 from civ param_2 to civ param_3. Decrements param_2's city count (DAT_0064c708) and population total (DAT_0064c70c), increments param_3's. Sets city owner byte (DAT_0064f348). Calls thunk_FUN_005b99e8 to update tile ownership. | MEDIUM |

### Cluster: City Capture — Civil War / Schism

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057A904 | xlarge | FUN_0057a904 | handle_civil_war | 1 | int | Handles civilization schism/civil war for civ param_1. Checks if civil war is possible (FUN_004fc20d). Finds empty civ slot (short at DAT_0064c706==0 and DAT_0064c708==0). Creates new civ (thunk_new_civ). Splits gold, research, government. Copies tech flags and visibility. Divides cities based on continent populations — assigns continents to old/new civ based on relative sizes. Transfers units to match city ownership. Relocates palace via find_most_central_city. String ref: "SCHISM". Returns 1 on success, 0 if impossible. | HIGH |

### Cluster: City Capture — Main Handler

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057B5DF | xlarge | FUN_0057b5df | handle_city_capture | 3 | void | **Master city capture handler** (11451 bytes, the largest function in this block). param_1=city index, param_2=capturing civ, param_3=capture type (0=normal, 1=?, 2+= no treaty check). Handles: treaty violation check (diplomacy_check_treaty_violation), city capture flag (0x400000), population reduction (size-1, destroy if size=0 via thunk_delete_city), gold plunder (calc_city_value_for_capture), building/wonder transfer, palace rebuilding, capital check (FUN_0057a904 civil war), city escape attempt (size>7, cost 1000 gold, string "CANESCAPE"/"ESCAPE"), wonder capture/loss messages ("CAPTUREWONDER"/"LOSTWONDER"/"ABANDONWONDER"/"STILLWONDER"), unit reassignment (home city), partisan spawning (communism/democracy: spawns land defenders near captured city), resistance flag, production reset, tile improvements partial destruction, multiplayer sync (XD_FlushSendBuffer), tech steal attempt (diplomacy_steal_tech), ally notification ("CITYWINALLY"/"CITYLOSEALLY"/"CITYCAPTURE2"), kill civ check (thunk_kill_civ). String refs: "CITYCAPTURE", "CITYCAPTURE2", "CITYWINALLY", "CITYLOSEALLY", "CAPTUREWONDER", "LOSTWONDER", "ABANDONWONDER", "STILLWONDER", "CANESCAPE", "ESCAPE", "PARTISANS". | HIGH |
| 0x0057E29F | stub | FUN_0057e29f | city_capture_free_string | 0 | void | String/buffer cleanup | LOW |
| 0x0057E2B5 | stub | FUN_0057e2b5 | city_capture_seh_restore | 0 | void | SEH chain restore | LOW |

### Cluster: Combat — Strength Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057E2C3 | medium | FUN_0057e2c3 | calc_unit_hit_points | 1 | int | Calculates effective hit points for unit param_1. Base = utype defense (DAT_0064b1c4) * 8. Multiplied by 1.5x if veteran (status bit 0x2000). Multiplied by 1.5x if fortified (status bit 0x10). Unit type accessed via DAT_006560f6 (unit type_id). | HIGH |
| 0x0057E33A | xlarge | FUN_0057e33a | calc_unit_defense_strength | 3 | int | Calculates defense strength of unit param_1 against attacker param_3. param_2 controls whether terrain is loaded (nonzero = load terrain type/city from position). Factors: base defense * terrain defense bonus, fortress multiplier (DAT_006acb34: 2=normal, 3=land in city, 4=fortress, 6=city walls), veteran (1.5x), special unit flags. Land units defending in city with coastal fortress checked. Air units in port get 2x if SAM batteries (building 0x1b=27). Naval combat bonuses. Returns total defense value. | HIGH |
| 0x0057E6E2 | xlarge | FUN_0057e6e2 | calc_stack_best_defender | 2 | int | Finds best defending unit from tile stack starting at param_1. Iterates all units in stack (FUN_005b2d39/005b2c82 linked list). For each non-ocean land unit (skips domain!=0 on ocean terrain, DAT_006acb30==10), computes defense via calc_unit_defense_strength. Applies HP ratio (remaining/max). Applies unit type flags: "ignorable" (+1), "anti-air" (3x or 5x vs sea), "sub" flag (2x), air unit in port with SAM (-50%). Returns unit index of best defender. | HIGH |

### Cluster: Combat — Attack / Unit Death

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057E9F9 | large | FUN_0057e9f9 | handle_unit_kill | 4 | void | Handles death of unit param_1 defeated by param_2. Increments civ kill counter (DAT_0064c7b6 per unit type). Plays combat animation or sends multiplayer notification. Increments DAT_006acb0c (kills-this-combat counter). Calls script hook (FUN_004fbd9d) if DAT_00627670!=0. Destroys unit via thunk_FUN_005b4391. | MEDIUM |
| 0x0057EB94 | medium | FUN_0057eb94 | handle_stack_wipe | 4 | void | Wipes entire unit stack. Resets kill counter DAT_006acb0c=0. Iterates stack via FUN_005b2d39, killing each unit via handle_unit_kill. Follows link_next chain (DAT_00656108+unit*0x20). | MEDIUM |
| 0x0057EBFD | large | FUN_0057ebfd | handle_unit_promotion | 1 | void | Promotes unit param_1 to veteran status. Sets bit 0x2000 on status flags (DAT_006560f4). Only promotes if not already veteran and unit type doesn't have "no promotion" flag (utype flags bit 0x10). Shows "PROMOTED" message for human player. String ref: "PROMOTED". | HIGH |

### Cluster: Combat — Nuclear Attack

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057ED3F | xlarge | FUN_0057ed3f | animate_combat_movement | 3 | void | Animates unit movement/combat on the map. Uses 8-frame animation loop with timeGetTime timing (64ms per frame). Creates render context per active viewport (up to 8 viewports via DAT_0066ca84 series). Handles scrolling/panning during animation. Network sync checks during loop. Cleans up render contexts via _eh_vector_destructor_iterator_. | MEDIUM |
| 0x0057F628 | stub | FUN_0057f628 | animate_combat_destructor | 0 | void | FRAMEWORK — _eh_vector_destructor_iterator_ for 8 render contexts | LOW |
| 0x0057F648 | stub | FUN_0057f648 | animate_combat_seh_restore | 0 | void | SEH chain restore | LOW |
| 0x0057F657 | xlarge | FUN_0057f657 | animate_nuke_explosion | 2 | void | Animates nuclear explosion at tile (param_1, param_2). Only runs if tile is valid and visible to current player (FUN_005b8b65). Creates 0x48-byte render object, centers 91x72 animation (0x5b x 0x48, matching Tiles.dll #85), plays 11 frames at 100ms intervals. Sound effect 0x32 via thunk_FUN_0046e020. 5.5-second initial delay if certain animation flag set (DAT_00655aea bit 0x10). Network sync during animation. String refs: none (pure animation). | MEDIUM |
| 0x0057F9E3 | xlarge | FUN_0057f9e3 | handle_nuke_attack | 4 | int | Handles nuclear weapon detonation. param_1=attacking civ, param_2/3=target x/y, param_4=nonzero for checking SDI. Shows "USEWEAPONS" message. If param_4!=0, checks for SDI defense (building 0x11=17) within radius 4 — if found, shows fallout message and returns 0 (intercepted). Destroys all units in 9-tile radius. Sets treaty flags: bit 0x110 on target civ toward attacker, bit 0x20000 (weNukedThem) on attacker toward target. Calls thunk_FUN_00456f20 to set attitude to 100 (maximum hostility). Calls animate_nuke_explosion. Contaminates surrounding tiles. String refs: "USEWEAPONS", plus two unnamed DAT_ string refs for SDI interception messages. Returns 1 on successful detonation, 0 if intercepted. | HIGH |

### Cluster: Combat — Nuclear Retaliation / Scramble Defenders

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0057FEBC | xlarge | FUN_0057febc | scramble_defenders_to_tile | 3 | void | Scrambles nearby defensive units to target tile (param_2, param_3) owned by civ param_1. Two-pass search: Pass 1 (first while loop) looks for own units with "settler escort" flag (utype flags bit 0x01) that are idle or have movement flag 0x100, within COSMIC[10] range (DAT_0064bcdb), on same continent, and can be assigned goto orders. If found, sets unit orders to 0x0b (goto), target=(param_2, param_3), counter=0x4b. Pass 2 (second for loop) searches for any combat-capable unit (attack>0, domain=land, not in transport) of same civ or allied AI civ at war with target's owner, within 7 tiles on same continent, and pathfinds to target. Sets same goto orders. Used after nuclear attacks and city captures to rally nearby defenders. | MEDIUM |

---

## SUMMARY

### 1. Function Count & Breakdown

**Total functions: 122**

| Category | Count | Description |
|----------|-------|-------------|
| Sprite Editor (core) | 35 | Sprite sheet editing tool: load/edit/save TERRAIN1/2, ICONS, CITIES, UNITS bitmaps |
| Sprite Editor (SEH/cleanup) | 18 | SEH chain restores, destructors, thunks for sprite editor |
| Menu/List Control System | 25 | Custom hierarchical menu system with checked/grayed/hidden states, linked list nodes |
| MFC/CRT Framework | 10 | CBitmapButton dtor, ios_base, CHtmlStream, CPropertySheet, _Timevec dtors |
| Diplomacy | 4 | Treaty violation checking, attack permission (senate/UN), war declaration annoyance |
| City Capture | 8 | Master capture handler, civil war/schism, city value calc, city transfer, partisans |
| Combat | 8 | Defense strength calc, best defender selection, unit kill/promotion, stack wipe |
| Nuclear Weapons | 4 | Nuke attack handler, explosion animation, SDI check, nuclear retaliation/scramble |
| Tech Theft | 3 | Tech stealing during conquest, human/AI selection |
| Combat Animation | 3 | Unit movement animation with multi-viewport, frame timing |
| Utility | 4 | City distance calc, central city finder, coordinate lookups |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0057b5df** (`handle_city_capture`, 0x0057B5DF) — 11451 bytes. The master city capture handler covering gold plunder, population reduction, wonder transfer, partisan spawning, civil war trigger, tech theft, multiplayer sync. This is one of the most complex and important game logic functions in the entire binary.

2. **FUN_0057a904** (`handle_civil_war`, 0x0057A904) — 3291 bytes. Implements civilization schism/civil war when a capital is captured. Creates new civ, splits territory by continent, transfers cities and units, divides gold and tech.

3. **FUN_0057e33a** (`calc_unit_defense_strength`, 0x0057E33A) — 931 bytes. Core combat formula for defense computation. Factors in terrain, fortification (fortress multiplier 2/3/4/6), veteran bonus, city walls, SAM batteries, coastal fortress, special unit type flags.

4. **FUN_00579ed0** (`diplomacy_check_attack_allowed`, 0x00579ED0) — 933 bytes. Senate override system for Republic/Democracy governments. Checks whether war can be declared against allies, ceasefire partners, peace treaty partners. References United Nations wonder for peace enforcement.

5. **FUN_0057f9e3** (`handle_nuke_attack`, 0x0057F9E3) — 1236 bytes. Nuclear weapon detonation handler. SDI defense check (building 17 within radius 4), 9-tile destruction radius, unit wipe, treaty flag setting (0x110 and 0x20000), contamination, maximum hostility (attitude 100).

### 3. New DAT_ Globals Identified with High Confidence

| Address | Type | Proposed Name | Evidence |
|---------|------|--------------|----------|
| DAT_006ac924 | int | sprited_editor_type | Switch variable controlling which sprite sheet type is being edited (0=icons, 1=cities, 7-10=terrain, 11=units). Used in 10+ functions. |
| DAT_006ac0a8 | struct | sprited_work_surface | Surface/bitmap used as working buffer for sprite editor. Loaded with TERRAIN1/2, ICONS, UNITS BMP/GIF data. |
| DAT_006ac88c | int | sprited_editor_active | Loop control: editor message loop runs while !=0. Set to 0 to close. |
| DAT_006ac890 | int | sprited_preview_active | Preview window loop control: runs while !=0. |
| DAT_006ac89c | int | sprited_sprite_count | Total number of sprites for current editor type. Set from FUN_005746a1 return value. |
| DAT_006ac874 | uint | sprited_bg_color | Background/transparency palette index for current sprite sheet. Obtained via thunk_FUN_00417f70. |
| DAT_006ac120 | int | sprited_tool_mode | Current tool/mode: 0=picker, 1=line draw, 2=freehand, 3=scroll/pan. |
| DAT_006ac124 | int | sprited_brush_size | Brush size mode: 0=1px, 1=3px cross, 2=4px block. |
| DAT_006ac8a4 | int | sprited_is_dragging | Mouse drag state flag: 1=button held (painting), 0=released. |
| DAT_006ac880 | int | sprited_last_x | Last pixel X coordinate during painting. |
| DAT_006ac884 | int | sprited_last_y | Last pixel Y coordinate during painting. |
| DAT_00634000 | int | sprited_right_click_color | Right-click palette color in sprite editor. |
| DAT_00634004 | int | sprited_left_click_color | Left-click palette color in sprite editor. |
| DAT_00634008 | int | sprited_alt_left_color | Alternate left-click color (swap buffer). |
| DAT_0063400c | int | sprited_alt_right_color | Alternate right-click color (swap buffer). |
| DAT_006acb08 | int | combat_defending_city | City index at defender's tile. Set by calc_unit_defense_strength. -1 if no city. |
| DAT_006acb30 | uint | combat_terrain_type | Terrain type at combat tile. Set from tile byte 0 low nibble. |
| DAT_006acb34 | int | combat_fortress_mult | Fortress/fortification multiplier: 2=open, 3=land city, 4=fortress, 6=city walls. |
| DAT_006acb0c | int | combat_kills_this_round | Counter of units killed in current combat round. Reset at stack wipe start. |
| DAT_006acb38 | int | mp_civil_war_response | Multiplayer response for civil war query. -1=pending, 0=deny, 1=allow. |
| DAT_006ad908 | int | animation_in_progress | Flag: 1 during combat/nuke animation, 0 otherwise. Prevents re-entry. |
| DAT_0063430c | code* | menu_item_callback | Function pointer called when menu item is clicked. Set by menu_set_callback. |
| DAT_00634304 | ptr | menu_host_window | CPropertySheet pointer for menu's host window. |
| DAT_006ac11c | ptr | sprited_preview_this | `this` pointer for sprite preview window instance. |
| DAT_00654fa8 | int | scenario_replay_mode | When nonzero, suppresses interactive prompts (used in replay/autoplay). Checked throughout city capture, diplomacy, and combat. |
| DAT_00655c21 | byte | strongest_civ_index | Index of strongest civ (used in civil war and tech era comparisons). |
| DAT_00655c22 | byte[8] | civ_power_ranking | Per-civ power ranking array. Higher = more powerful. Compared for civil war trigger. |
