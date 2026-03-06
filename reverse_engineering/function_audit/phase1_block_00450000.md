# Phase 1 Analysis: block_00450000.c (0x00450000 - 0x0045FFFF)

## Function Analysis Table

### Cluster: Civilopedia / Hypertext Viewer Infrastructure

These functions manage the in-game Civilopedia (hypertext help system). The main class at `in_ECX` is a large (~0x1CB4 byte) "Civilopedia viewer" object with scrollable list panels, category tabs, and a rendered background surface.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004502B0 | stub | FUN_004502b0 | pedia_init_field | void(thiscall) | ptr | Zeroes first field of this-ptr; used in Civilopedia constructor | LOW |
| 004502E0 | small | FUN_004502e0 | pedia_set_resource | param_1(thiscall) | void | Frees old resource (FUN_005db55b), loads new one (FUN_005db140), stores in *this | MEDIUM |
| 00450340 | small | FUN_00450340 | pedia_free_resource | void(thiscall) | void | Frees resource at *this and zeroes it | MEDIUM |
| 00450390 | stub | FUN_00450390 | pedia_set_surface | param_1(thiscall) | void | Stores param_1 at this+4, calls thunk_FUN_00450440 | LOW |
| 004503D0 | stub | FUN_004503d0 | pedia_manage_window | void(thiscall) | void | Calls manage_window_C44D on this+8 | LOW |
| 00450400 | stub | FUN_00450400 | pedia_gdi_init | void(thiscall) | void | Calls gdi_C763 on this+8 with 0,0 | LOW |
| 00450440 | small | FUN_00450440 | pedia_attach_surface | param_1(thiscall) | void | Calls FUN_005bcdc3 with this+8 and param_1+0x404 | LOW |

### Cluster: Civilopedia List Panel Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00450480 | xlarge | FUN_00450480 | pedia_setup_list_panel | param_1(RECT*), param_2(panel_idx), param_3(mode)(thiscall) | void | Sets up a scrollable list panel for Civilopedia. Iterates 100 techs via FUN_004bd9f0, filters by current_player's knowledge. Stores items at offset 0x3f0+panel*0x2004. Creates scrollbar via FUN_005db0d0. Uses tech_table (&DAT_00627684+tech*0x10). param_3=0 shows unknown techs, param_3=1 shows tradeable. Checks wonder ownership (FUN_00453e51) and god_mode (DAT_00655b07). | HIGH |
| 00450AE6 | stub | FUN_00450ae6 | pedia_scroll_panel_0 | param_1 | void | Delegates to FUN_00450b22(0, param_1) — scroll panel 0 | MEDIUM |
| 00450B04 | stub | FUN_00450b04 | pedia_scroll_panel_1 | param_1 | void | Delegates to FUN_00450b22(1, param_1) — scroll panel 1 | MEDIUM |
| 00450B22 | small | FUN_00450b22 | pedia_set_scroll_pos | param_1(panel_idx), param_2(pos) | void | Sets scroll position at this+0x10410+panel*4, redraws via FUN_00450f0b | MEDIUM |
| 00450B83 | large | FUN_00450b83 | pedia_list_click | param_1(control_id) | void | Handles mouse clicks in Civilopedia list panel. control_id-0x413 = panel index. Supports shift-click (range select), ctrl-click (toggle), normal click (single select). Uses FUN_00450df6 for hit testing. Toggles selection flags at 0x8400+panel*0x2004+item*4. | HIGH |
| 00450DF6 | large | FUN_00450df6 | pedia_hittest_list | param_1(x), param_2(y), param_3(panel_idx) | int | Hit-tests a point against the list panel. Returns item index, or negative values: -1=above, -2=below, -3=left, -4=right. Divides panel height by visible item count. | MEDIUM |
| 00450F0B | xlarge | FUN_00450f0b | pedia_draw_list_panel | param_1(panel_idx) | void | Renders a Civilopedia list panel. Draws each visible item with tech icon (blit_normal FUN_005cef31), name text (get_improvement_name FUN_00428b0c), and selection highlighting. Uses palette colors from DAT_00635a18/1c/20/24/28/2c. Draws text with shadow effect. Calls FUN_005c0f57 for text rendering and FUN_005c19ad for color setting. | HIGH |

### Cluster: Civilopedia List Panel Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00451830 | stub | FUN_00451830 | pedia_get_icon_width | void(thiscall) | int | Gets width of icon rect at this+0x10 | LOW |
| 00451860 | stub | FUN_00451860 | pedia_get_icon_height | void(thiscall) | int | Gets height of icon rect at this+0x10 | LOW |
| 00451890 | stub | FUN_00451890 | pedia_get_mouse_pos | param_1(x_out), param_2(y_out) | void | Gets mouse position via thunk_FUN_00414d10 + FUN_005bd48f | LOW |
| 004518D0 | stub | FUN_004518d0 | pedia_begin_update | void | void | Calls FUN_00451900 + FUN_005c5b7f to prepare surface | LOW |
| 00451900 | stub | FUN_00451900 | pedia_get_dc | void(thiscall) | void | Calls FUN_005bd0e7 on this+8 | LOW |

### Cluster: Civilopedia Scrollbar / Button Widget Classes

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00451930 | small | FUN_00451930 | pedia_button_ctor | void(thiscall) | this | Constructor for a button/widget class (0x40 bytes). SEH setup, calls thunk_FUN_0040f480 | MEDIUM |
| 004519B0 | medium | FUN_004519b0 | pedia_button_create | param_1(parent), param_2(id), param_3(rect)(thiscall) | void | Creates a button widget. Destroys old (if exists), calls create_window_8BE1. Zeroes fields at +0x2c..+0x3c. | MEDIUM |
| 00451A60 | stub | FUN_00451a60 | pedia_button_set_handler | param_1(handler)(thiscall) | void | Stores callback at this+0x34 | LOW |
| 00451A90 | stub | CDialog::SetHelpID | (MFC library) | this, helpID | void | FRAMEWORK - MFC CDialog::SetHelpID | HIGH |
| 00451AC0 | stub | FUN_00451ac0 | pedia_button_set_scrollcb | param_1(callback)(thiscall) | void | Stores at this+0x30 | LOW |

### Cluster: Civilopedia Main Window Layout & Tab Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00451AF0 | large | FUN_00451af0 | pedia_draw_header | param_1(thiscall) | void | Draws the Civilopedia header area. Uses SetRect, prepare_surface (FUN_005a9780 via &DAT_006a6668), calls FUN_00452188 to render content. Positions relative to this+0x5f8..0x604 (bounding rect). | MEDIUM |
| 00451BF0 | xlarge | FUN_00451bf0 | pedia_init_tabs | void(thiscall) | void | Initializes Civilopedia category tabs. Calls thunk_FUN_0043c5f0 17 times (for categories). Checks this+0x11c (category mode: 0=full, 1=filtered, 2=minimal). Creates scrollbar widgets for overflow lists. Uses GetSystemMetrics(3)=SM_CYSCREEN. Tab mode 8 = special Wonders mode. | MEDIUM |
| 00452188 | xlarge | FUN_00452188 | pedia_render_tab_content | void(thiscall, stack param=tab_type) | void | Switch on tab type (0-8) dispatching to category-specific renderers: 1=units, 2=improvements, 3=wonders, 4=terrain, 5=advances, 6=governments, 7=civilizations, 8=miscellaneous. Checks this+0x11c for view mode variant. | HIGH |

### Cluster: Civilopedia Content Navigation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00452315 | xlarge | FUN_00452315 | pedia_show_article | param_1(item_idx) | void | Loads and displays a Civilopedia article. Switch on this+0x118 (category) maps item to different array offsets (0x65c, 0x980, 0xabc, 0xba0, 0xdd0, 0xd94, 0xedc). Reads text from file via _fgets into DAT_00679640 (text buffer, 0x800 size). Parses '@' delimiters and ';' comments. String "describe" at s_describe__006268fc. | HIGH |
| 00452768 | large | FUN_00452768 | pedia_show_description | param_1(item_idx) | void | Shows detailed description for selected Civilopedia item. Checks DAT_00655af0 bit 0x80 (scenario flag). Changes directory to DAT_0064bb08, loads "describe" files, switches on this+0x118 for category-to-offset mapping. Calls thunk_FUN_00453c40/00453c80 for display. | MEDIUM |

### Cluster: Hypertext Window Class

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004529DF | medium | register_wndclass_29DF | register_hypertext_wndclass | void | void | Registers "MSHyperTextClass" window class (s_MSHyperTextClass_00626908). Style=0x88, cursor=0x212. One-shot via DAT_00626850 guard. | HIGH |
| 00452A67 | small | FUN_00452a67 | hypertext_dtor | void(thiscall) | void | Destructor: destroys window (FUN_005c8c83), calls base dtors FUN_00452ac1/FUN_00452ad4 | MEDIUM |
| 00452AC1 | stub | FUN_00452ac1 | hypertext_base_dtor | void | void | Thunk to FUN_0040f510 (base class destructor) | LOW |
| 00452AD4 | stub | FUN_00452ad4 | hypertext_seh_cleanup | void | void | SEH frame unwinding (restores FS:[0]) | LOW |
| 00452AE2 | medium | FUN_00452ae2 | hypertext_create_window | param_1(rect*), param_2(id) | HWND | Creates "MSHyperTextClass" window via CreateWindowExA. WS_EX_TOPMOST(4), WS_CHILD|WS_VISIBLE(0x50000000). Sets subclass proc to 0x5c8caf via SetWindowLongA(-4). | HIGH |
| 00452B89 | medium | FUN_00452b89 | hypertext_widget_create | param_1(parent), param_2(id), param_3(rect)(thiscall) | void | Creates hypertext widget. Similar to FUN_004519b0 but uses FUN_00452ae2 for window creation. | MEDIUM |

### Cluster: Civilopedia Hypertext Link Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00452C14 | xlarge | FUN_00452c14 | pedia_add_hyperlink | param_1(tech_id), param_2(x), param_3(y), param_4(category) | void | Adds a clickable hyperlink in the Civilopedia display. Searches category arrays (0x658/0x97c/0xab8/0xb9c/0xdcc) for matching tech_id. Renders link text with underline highlight (known=color 0x6a, unknown=0x55). Creates hypertext widget node linked list at this+8000. Sets help IDs per category (0x401c76, 0x4019ce, etc). | HIGH |
| 004531B8 | medium | FUN_004531b8 | pedia_link_click_left | param_1(link_id) | void | Handles left-click on hyperlink (id-0xfb4). Traverses linked list at DAT_006a85a8. Sets DAT_006a6780=1 (navigate mode), DAT_006a85a0=target. Calls thunk_FUN_004f5f23(1). | MEDIUM |
| 0045323A | medium | FUN_0045323a | pedia_link_click_right | param_1(link_id) | void | Same as above but DAT_006a6780=2 (right-click navigate) | MEDIUM |
| 004532BC | medium | FUN_004532bc | pedia_link_click_3 | param_1(link_id) | void | Same as above but DAT_006a6780=3 | MEDIUM |
| 0045333E | medium | FUN_0045333e | pedia_link_click_4 | param_1(link_id) | void | Same as above but DAT_006a6780=4 | MEDIUM |
| 004533C0 | medium | FUN_004533c0 | pedia_link_click_5 | param_1(link_id) | void | Same as above but DAT_006a6780=5 | MEDIUM |

### Cluster: Civilopedia Widget Infrastructure (dtors, helpers)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00453AA0 | small | FUN_00453aa0 | pedia_scrollbar_dtor_delete | param_1(flags)(thiscall) | this | Scalar deleting destructor for scrollbar widget. Calls thunk_FUN_00453ba0, conditionally deletes | MEDIUM |
| 00453AF0 | stub | FUN_00453af0 | pedia_invalidate | void | void | Calls FUN_005bbb0a — triggers repaint | LOW |
| 00453B10 | small | FUN_00453b10 | pedia_link_node_ctor | void(thiscall) | this | Constructor for hyperlink node (0x48 bytes). SEH setup, calls thunk_FUN_00453cc0 | MEDIUM |
| 00453BA0 | small | FUN_00453ba0 | hypertext_link_dtor | void(thiscall) | void | Destructor for hypertext link widget. Destroys window at this+0x1c if exists | MEDIUM |
| 00453BFA | stub | FUN_00453bfa | hypertext_link_base_dtor | void | void | Thunk to FUN_0040f510 | LOW |
| 00453C0D | stub | FUN_00453c0d | hypertext_link_seh_cleanup | void | void | SEH frame unwinding | LOW |
| 00453C40 | stub | FUN_00453c40 | pedia_clear_selection | void(thiscall) | void | Sets this+0x2c=0, invalidates window at this+0x1c | MEDIUM |
| 00453C80 | stub | FUN_00453c80 | pedia_set_selection | void(thiscall) | void | Sets this+0x2c=1, invalidates window at this+0x1c | MEDIUM |
| 00453CC0 | small | FUN_00453cc0 | hypertext_link_base_ctor | void(thiscall) | this | Base constructor for link node. SEH setup, calls thunk_FUN_0040f480 | LOW |
| 00453D40 | stub | FUN_00453d40 | hypertext_set_handler | param_1(thiscall) | void | Stores at this+0x34 | LOW |
| 00453D70 | stub | CDialog::SetHelpID | (MFC library) | this, helpID | void | FRAMEWORK - second instance of MFC SetHelpID | HIGH |

### Cluster: Wonder Obsolescence Check

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00453DA0 | medium | FUN_00453da0 | is_wonder_obsolete | param_1(wonder_id) | bool | Checks if wonder is obsolete. Reads obsoleting tech from DAT_0064ba28[wonder_id]. If tech>=0, loops civs 1-7 checking if ANY civ has that tech via FUN_004bd9f0. Returns 1 if obsolete, 0 otherwise. **This is the documented wonder obsolescence function from MEMORY.md** (FUN_00453da0). | HIGH |
| 00453E18 | small | FUN_00453e18 | get_wonder_city | param_1(wonder_id) | int(city_id) | Returns city_id holding wonder if not obsolete, -1 if obsolete. Reads from DAT_00655be6[wonder*2] (wonder city assignment array). | HIGH |
| 00453E51 | medium | FUN_00453e51 | civ_has_active_wonder | param_1(civ_id), param_2(wonder_id) | bool | Checks if civ owns an active (non-obsolete) wonder. Special case: wonder 0x14 (20=Statue of Liberty) with scenario flags. Gets wonder city via FUN_00453e18, checks city owner (DAT_0064f348+city*0x58) matches civ. | HIGH |
| 00453EDF | small | FUN_00453edf | get_wonder_owner | param_1(wonder_id) | int(civ_id) | Returns civ_id that owns the wonder, or -1 if none/obsolete. Reads city owner from city struct. | MEDIUM |

### Cluster: Registry / Language Settings

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00453F90 | large | FUN_00453f90 | load_default_language | void | void | Reads/writes "DefaultLanguage" from registry key "Software\MicroProse Software\Civilization II Multiplayer Gold". Uses s_MicroProse_Software_00626964 and s_Civilization_II_Multiplayer_Gold_00626978. Stores in DAT_00626960. | HIGH |
| 0045406C | medium | FUN_0045406c | registry_write_value | param_1(key), param_2(name), param_3(data), param_4(size), param_5(type) | bool | Writes a value to HKLM registry via RegCreateKeyExA/RegSetValueExA | HIGH |
| 00454103 | medium | FUN_00454103 | registry_read_value | param_1(key), param_2(name), param_3(size_out), param_4(type_out) | ptr | Reads a value from HKLM registry into DAT_0064a730 buffer (0x800 bytes) via RegOpenKeyExA/RegQueryValueExA | HIGH |

### Cluster: Diplomacy Screen (CV.DLL-based advisors dialog)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00454260 | large | FUN_00454260 | show_advisor_screen | param_1(city_idx) | void | Top-level entry to show advisor/diplomacy screen. Allocates 0x1CB4-byte object (Civilopedia/advisor), calls FUN_00454354 (ctor), FUN_004548a9 (init with city), FUN_00454eb2 (display), FUN_00456e90 (cleanup+delete). | MEDIUM |
| 00454344 | stub | FUN_00454344 | advisor_noop | void | void | Empty function (return only) | LOW |
| 00454354 | large | FUN_00454354 | advisor_ctor | void(thiscall) | this | Constructor for advisor screen object (0x1CB4 bytes). Initializes CString arrays at offsets 0x6dc (60 entries stride 0x3c), 0x15dc/0x16cc/0x17bc/0x18ac (4 entries each stride 0x3c). Copies static coordinate tables from DAT_0061cce0 (0x174 bytes) and DAT_0061ce58 (0x120 bytes). Sets DAT_00626a04=this. Initializes surface via SetRect at this+0x1c98. | MEDIUM |

### Cluster: Advisor Screen Destructor Chain

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00454699 | large | FUN_00454699 | advisor_dtor | void(thiscall) | void | Destructor for advisor screen. Destroys in reverse order: CString arrays (4x _eh_vector_destructor_iterator_), resources. Sets DAT_00626a04=0. | MEDIUM |
| 00454798 | stub | FUN_00454798 | advisor_dtor_step_c | void | void | Destructor step: calls thunk_FUN_0043c520 | LOW |
| 004547A7 | stub | FUN_004547a7 | advisor_dtor_step_b | void | void | Destructor step: calls FUN_005bd915 (release surface) | LOW |
| 004547B6 | stub | FUN_004547b6 | advisor_dtor_array_a | void | void | _eh_vector_destructor_iterator_ for CString array at +0x18ac | LOW |
| 004547CE | stub | FUN_004547ce | advisor_dtor_array_9 | void | void | _eh_vector_destructor_iterator_ for CString array at +0x17bc | LOW |
| 004547E6 | stub | FUN_004547e6 | advisor_dtor_array_8 | void | void | _eh_vector_destructor_iterator_ for CString array at +0x16cc | LOW |
| 004547FE | stub | FUN_004547fe | advisor_dtor_array_7 | void | void | _eh_vector_destructor_iterator_ for CString array at +0x15dc | LOW |
| 00454816 | stub | FUN_00454816 | advisor_dtor_array_6 | void | void | _eh_vector_destructor_iterator_ for CString array at +0x6dc (60 entries) | LOW |
| 0045482E | stub | FUN_0045482e | advisor_dtor_timevec | void | void | Destructor for _Timevec at +0x6d8 | LOW |
| 0045483D | stub | FUN_0045483d | advisor_dtor_step_4 | void | void | Calls FUN_005bd915 | LOW |
| 0045484C | stub | FUN_0045484c | advisor_dtor_step_3 | void | void | Calls FUN_005bd915 | LOW |
| 0045485B | stub | FUN_0045485b | advisor_dtor_step_2 | void | void | Calls FUN_005c656b | LOW |
| 0045486A | stub | FUN_0045486a | advisor_dtor_step_1 | void | void | Calls FUN_005bd915 | LOW |
| 00454879 | stub | FUN_00454879 | advisor_dtor_step_0 | void | void | Calls thunk_FUN_0044cba0 | LOW |
| 00454888 | stub | FUN_00454888 | advisor_dtor_final | void | void | Calls thunk_FUN_0044ca60 | LOW |
| 0045489B | stub | FUN_0045489b | advisor_seh_cleanup | void | void | SEH frame unwinding | LOW |

### Cluster: Advisor Screen Initialization & CV.DLL Background

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004548A9 | xlarge | FUN_004548a9 | advisor_init_with_city | param_1(city_idx)(thiscall) | bool | Initializes advisor screen for a city. Loads "cv_dll" (s_cv_dll_00626a08). Gets civ owner via city struct (+0x08). Sets up 4+4 portrait render contexts (0x9e x 0x72 and 0x7b x 0x52 sprites via FUN_005cedad). Checks civ portrait count via thunk_FUN_00448f92. Calls FUN_0045512b/00455183/00455314 for sub-panels. Returns 0 on failure. | HIGH |
| 00454E8B | stub | FUN_00454e8b | advisor_init_cleanup_a | void | void | Calls FUN_005bd915 (surface release) | LOW |
| 00454EA1 | stub | FUN_00454ea1 | advisor_init_seh_cleanup | void | void | SEH frame unwinding | LOW |
| 00454EB2 | large | FUN_00454eb2 | advisor_show_dialog | void(thiscall) | void | Displays the advisor dialog. Sets up property sheet (CPropertySheet::EnableStackedTabs). Renders surfaces, manages GDI. Checks DAT_00655b02 (save_format_version) > 2 for tab support. | MEDIUM |

### Cluster: Advisor Portrait & Background Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00454F83 | large | FUN_00454f83 | advisor_setup_portraits | void(thiscall) | void | Configures advisor portrait layout based on city location. Checks city flags bit 0x80 (coastal?). Scans 9 adjacent tiles using CitySpiralDX/DY (DAT_00628350/60). Sets portrait grid parameters at this+0x19e4 (mode: 0=coastal, 1=river, 2=inland), 0x19e8 (count), 0x19ec/0x19f0 (layout sizes). | MEDIUM |
| 0045512B | small | FUN_0045512b | advisor_load_icon_surface | void(thiscall) | bool | Creates 32x32 surface via FUN_005bd65c, loads resource 399 into DAT_006a8c00 | MEDIUM |
| 00455183 | large | FUN_00455183 | advisor_setup_background | void(thiscall) | bool | Sets up the advisor screen background. Composes background from surfaces via FUN_005c5fc4/FUN_005bb4ae. Checks has_building for building 0x19 (25=Colosseum). Selects era-based portrait set. Loads advisor sprite resource. Sets button handlers (SetDlgCtrlID, callbacks). | MEDIUM |

### Cluster: Advisor Building/Wonder Grid Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00455314 | xlarge | FUN_00455314 | advisor_render_building_grid | void(thiscall) | 1 | Renders the building/wonder grid on the advisor screen. Iterates buildings 1-0x22 (34), wonders 0-0x1b (27). Uses this+0x19e4 (portrait mode) to select different building sets per era (case 0/1/2). Some buildings hardcoded: 8=Courthouse(0x35), 0x1c=SDI(0x23), 0x1e=Recycling(0x36), 0x1f=PowerPlant(0x39), 0x22=Spaceship(0x37). Checks has_building and wonder city. Calls thunk_FUN_00455c5d/00455b8e to pop from shuffle lists. Assigns sprite pointers to this+0x14ec[slot]. | MEDIUM |
| 00455ADD | medium | FUN_00455add | advisor_blit_icons | void(thiscall) | void | Blits building/wonder icons onto the advisor background. Iterates this+0x19e8 slots, for each non-null this+0x14ec[slot], blits from this+0x1cc using coordinates from DAT_0061c740+mode*0x1e0+slot*8. | MEDIUM |
| 00455B8E | large | FUN_00455b8e | advisor_pop_wonder_shuffle | void(thiscall) | int | Pops a random item from the wonder shuffle list at this+0x1b6c+mode*0x60. Decrements count at this+0x19ec. Returns item or -1 if empty. Uses thunk_FUN_0059a791 (random). | MEDIUM |
| 00455C5D | large | FUN_00455c5d | advisor_pop_building_shuffle | void(thiscall) | int | Pops a random item from the building shuffle list at this+0x19f8+mode*0x7c. Decrements count at this+0x19f0. Returns item or -1 if empty. | MEDIUM |

### Cluster: Advisor Building Sprite Assignment

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00455D38 | medium | FUN_00455d38 | advisor_assign_building_sprite | param_1(slot), param_2(building_id)(thiscall) | void | Creates render context for building sprite using coordinates from DAT_0061c360+(building-1)*0x10. Assigns to this+0x14ec[slot] = this+0x6dc+slot*0x3c. | MEDIUM |
| 00455DFD | medium | FUN_00455dfd | advisor_assign_wonder_sprite | param_1(slot), param_2(wonder_id)(thiscall) | void | Creates render context for wonder sprite from DAT_0061c580+wonder*0x10. Assigns to this+0x14ec[slot]. | MEDIUM |
| 00455EBE | medium | FUN_00455ebe | advisor_assign_random_wonder | param_1(slot)(thiscall) | void | Assigns random generic decoration sprite to slot. Decrements this+0x19f4 (available count). Uses CString array at this+0x18ac. | LOW |
| 00455F2E | medium | FUN_00455f2e | advisor_assign_random_building | param_1(slot)(thiscall) | void | Assigns random generic decoration sprite. Uses CString array at this+0x16cc. | LOW |
| 00455F9E | small | FUN_00455f9e | advisor_assign_random_deco_a | param_1(slot)(thiscall) | void | Assigns random decoration sprite. Uses CString array at this+0x17bc. | LOW |
| 00456005 | small | FUN_00456005 | advisor_assign_random_deco_b | param_1(slot)(thiscall) | void | Assigns random decoration sprite. Uses CString array at this+0x15dc. | LOW |

### Cluster: Advisor Title Bar & Scrolling

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045606C | medium | FUN_0045606c | advisor_composite_and_title | void(thiscall) | void | Composites the advisor background and draws the city title bar. SetRect for source/dest (DAT_0064b0d8 width, 0x1e0=480 height). Calls FUN_005c0593 (blit), FUN_004560f8 (title), FUN_005bb574. | MEDIUM |
| 004560F8 | large | FUN_004560f8 | advisor_draw_title | void(thiscall) | void | Draws city name + era text in the advisor title bar. Reads city name from DAT_0064f360+city*0x58 (+0x20 offset = name field). Gets era via DAT_00655afa. Text with shadow (palette 10=green, then 0x1a=dark gray). Uses OffsetRect for shadow offset. | MEDIUM |
| 004561D9 | small | FUN_004561d9 | advisor_check_scroll | param_1(mouse_x) | void | Checks if mouse is near edge for scrolling. If x > width*7/8, scroll right. If x < width/8, scroll left. | LOW |
| 00456228 | small | FUN_00456228 | advisor_handle_key | param_1(key_code) | void | Handles key 0xD2 (Insert?) — invalidates DAT_00626a04 object cache | LOW |
| 0045626D | stub | FUN_0045626d | advisor_invalidate | void | void | If DAT_00626a04 != 0, invalidates +0x100 (property sheet) | LOW |
| 0045629B | medium | FUN_0045629b | advisor_handle_command | param_1(command_id) | void | Handles advisor window commands: 0xA4/0xC2=scroll left, 0xA6/0xC3=scroll right, 0xD0-D2=invalidate. Only scrolls if DAT_0064b0d8 < 0x500 (width < 1280). | MEDIUM |

### Cluster: Advisor Screen Scroll Animation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045638B | large | FUN_0045638b | advisor_scroll_right | void(thiscall) | void | Scrolls advisor screen right. 4px per frame. Loops while Numpad6 (0x66) or Right Arrow (0x27) is held via GetAsyncKeyState. Stops at DAT_00626a00 >= (0x500-width). Composites, draws title, end_paint each frame. | MEDIUM |
| 004564A8 | large | FUN_004564a8 | advisor_scroll_left | void(thiscall) | void | Scrolls advisor screen left. 4px per frame. Loops while Numpad4 (100/0x64) or Left Arrow (0x25) is held. Stops at DAT_00626a00 < 0. | MEDIUM |

### Cluster: Advisor Cleanup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00456E90 | small | FUN_00456e90 | advisor_scalar_dtor | param_1(flags)(thiscall) | this | Scalar deleting destructor. Calls advisor_dtor (FUN_00454699), conditionally deletes | MEDIUM |
| 00456EE0 | stub | ios::tie | (MFC/CRT library) | this, ostream* | ostream* | FRAMEWORK - CRT ios::tie | HIGH |

### Cluster: Diplomacy — Attitude Adjustment & AI State Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00456F20 | medium | FUN_00456f20 | adjust_attitude | param_1(civ_a), param_2(civ_b), param_3(delta) | void | Adjusts attitude of civ_b toward civ_a by delta. Reads current value via thunk_FUN_00467904, writes new via thunk_FUN_00467933. Also updates DAT_0064b114 if civ_a==DAT_0064b110 and civ_b==DAT_0064b120 (current negotiation pair). | MEDIUM |
| 00456F8B | large | FUN_00456f8b | calc_patience_threshold | param_1(civ_a), param_2(civ_b) | int | Calculates AI patience threshold for negotiations. Base=2, +1 if attitude<25, -1 if attitude>60. +1 if civ_a owns Statue of Liberty (wonder 0x14). Checks treaty flags: +1 if bit 0x04 (embassy), +2 if bit 0x08 (at war). Resets to 2 if bit 0x20 (hatred). Uses civ struct +0x20 offsets (treaty flags). | MEDIUM |

### Cluster: AI Diplomacy Evaluation — Core Strategy

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045705E | xlarge | FUN_0045705e | ai_evaluate_diplomacy | param_1(ai_civ), param_2(target_civ) | void | **MAJOR**: Master AI diplomacy evaluation function (~6600 bytes). Sets all DAT_0064b1XX diplomacy state globals. Evaluates: military threat (per-continent comparison using civ+0x832/0x8b2 arrays), tech advantage, treaty status, nuclear capability (civ+0x7a5), personality factors (leader portrait table DAT_006554f8/fc), alliance obligations, war willingness. Key outputs: DAT_0064b0ec (demand amount), DAT_0064b0f8 (war willingness), DAT_0064b118 (tribute demand), DAT_0064b114 (attitude), DAT_0064b11c (scheming flag), DAT_0064b130/12c/128/134/140/148 (various AI state). Checks all 63 continents for military presence. Enormous nested conditionals for AI behavior. | HIGH |

### Cluster: Diplomacy UI — Greeting & Negotiation Display

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00458A3B | medium | FUN_00458a3b | diplo_show_attitude_header | param_1(civ_a), param_2(civ_b) | void | Displays the diplomacy attitude header. Shows attitude string from DAT_0064b9c0+attitude_level*4 (government name table area). Uses calc_attitude (FUN_004679ab). Shows "?" if DAT_00628064==2. Formats with civ name via FUN_00410070. | MEDIUM |
| 00458AB1 | large | FUN_00458ab1 | diplo_show_greeting | param_1(civ_a), param_2(civ_b) | void | Displays diplomatic greeting screen. Shows "GREETINGS" string (s_GREETINGS_00626a3c). Checks if allied ("PEACE") or at war. Displays leader portrait via show_improvement_ui(5, portrait_resource). Shows random greeting variant. Checks nuclear weapons ("NUCLEARWEAPONS", "YOURNUKES"). Sets treaty bit 0x100 (nukeTalk) after first nuke warning. | HIGH |
| 00458DD5 | stub | FUN_00458dd5 | diplo_cleanup_a | void | void | Calls thunk_FUN_0059df8a (dialog cleanup) | LOW |
| 00458DEB | stub | FUN_00458deb | diplo_seh_cleanup_a | void | void | SEH frame unwinding | LOW |

### Cluster: Diplomacy — AI Emissary / First Contact

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00458DF9 | large | FUN_00458df9 | diplo_ai_emissary | param_1(civ_a), param_2(civ_b), param_3(x), param_4(y) | void | AI emissary/first contact dialog. Checks DAT_00654fa8 (scenario lock). Sets DAT_00626a34 (negotiation result). Shows "EMISSARY" dialog with accept/spy options. Loops until resolved. Checks god mode and wonder ownership for spy ability. String refs: "EMISSARYFORCE", "EMISSARY". If result==-2, calls thunk_FUN_0043060b (spy mission). | HIGH |
| 00459169 | stub | FUN_00459169 | diplo_emissary_cleanup | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0045917F | stub | FUN_0045917f | diplo_emissary_seh_cleanup | void | void | SEH frame unwinding | LOW |
| 0045918E | small | FUN_0045918e | diplo_reset_state | void | void | Resets diplomacy state: DAT_00626a24/30/34/1c = 0. Calls thunk_FUN_00494148. | MEDIUM |

### Cluster: Diplomacy — Tech Sale / Gold Negotiation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004591CB | large | FUN_004591cb | diplo_sell_tech | param_1(seller), param_2(buyer), param_3(round) | bool | Handles selling a technology for gold. Calculates price based on DAT_0064b144 (selected tech), tech value from FUN_004bdb2c, attitude (DAT_0064b114), era multiplier. Price floors at 100 gold. Min 1500/3000 gold thresholds multiply price. Alliance (at war) discounts. Displays "SELLTECH"/"SELLTECH2" dialog. On accept, transfers gold (civ+0x02), grants tech (FUN_004bf05b). | HIGH |

### Cluster: Diplomacy — Gift/Exchange System (already named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045950B | xlarge | handle_exchange_gift | handle_exchange_gift | 6 params | void | **Already named**. Handles tech exchange during diplomacy. Iterates 100 techs, finds best tradeable. Checks wonder prerequisites, attitude thresholds. Strings: "NOEXCHANGEMEDIUM", "NOEXCHANGEMAD", "NOEXCHANGEWONDER", "EXCHANGE", "EXCHANGEPETTY", etc. Enormous function with many early returns. | HIGH |
| 0045A510 | stub | FUN_0045a510 | exchange_cleanup | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0045A526 | stub | FUN_0045a526 | exchange_seh_cleanup | void | void | SEH frame unwinding | LOW |

### Cluster: Diplomacy — Treaty Actions (Alliance, Peace, Ceasefire, War Declaration)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045A535 | large | FUN_0045a535 | diplo_form_alliance | param_1(civ_a), param_2(civ_b) | void | Forms alliance between two civs. Adjusts attitude by -25 (0xFFFFFFE7). Sets treaty flags via thunk_FUN_00467825(param_2,param_1,8). Records contact turn. Shows "ALLIANCE" dialog. Sets civ flags 0x100. | HIGH |
| 0045A6AB | large | FUN_0045a6ab | diplo_sign_peace_treaty | param_1(civ_a), param_2(civ_b) | void | Signs peace treaty. Sets flags via 0x4004. Clamps attitude to 0-50. Resets patience. Shows "TREATY" dialog. Records contact turn. | HIGH |
| 0045A7A8 | large | FUN_0045a7a8 | diplo_sign_ceasefire | param_1(civ_a), param_2(civ_b) | void | Signs ceasefire. Flags 0x4002. Sets tribute flag 0x40000. Clamps attitude 0-50. Shows "CEASEFIRE" dialog. Clears all war flags (0xFFFFF7FF) for civ_a toward everyone. | HIGH |
| 0045A8E3 | large | FUN_0045a8e3 | diplo_activate_alliance_wars | param_1(attacker), param_2(defender) | void | Activates alliance obligations when war is declared. For each civ allied with attacker that is also in contact with defender, declares war. Checks human/AI civs (DAT_00655b0b). Shows "ALLYHELPS"/"ACTIVATEALLY" dialogs. Sets flags 0x80800 (attacked+cityCapture). Adjusts attitude +100 for allied war declaration. Sends multiplayer notifications (DAT_00655b02>2). | HIGH |

### Cluster: Diplomacy — War Declaration & Treaty Breaking

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045AC71 | xlarge | FUN_0045ac71 | diplo_declare_war | param_1(attacker), param_2(defender), param_3(instigator) | void | Full war declaration logic. Increments treatyViolations (civ+0x68). Behavior differs based on treaty level: no treaty (sets 0x2000 flag), ceasefire/peace (additional penalties, attitude adjustments -5/-15/-25). Alliance breaking has most severe penalties. Increments betrayal counter (civ+0xBE). Sets 0x10 flag for human player visibility. Calls FUN_00467ef2 (full treaty break) for alliance violations. | HIGH |

### Cluster: Diplomacy — Alliance/Peace Demand Requests & Human Player Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045B0D6 | large | FUN_0045b0d6 | diplo_demand_ally_help | param_1(demander), param_2(target_enemy) | void | Human player is asked to help ally in war ("DEMANDHELP"). If refuses, checks military threat and either adjusts attitude +100 or breaks alliance (FUN_00467ef2). If accepts, calculates tribute bonus based on continental military and transfers gold. Then calls diplo_declare_war. Shows "DIDNTHELP", "HELPBONUS" dialogs. | HIGH |

### Cluster: Diplomacy — Gold-to-Attitude Conversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045B472 | medium | FUN_0045b472 | calc_gold_to_attitude | param_1(gold_amount) | int(attitude_points) | Converts gold gift/payment to attitude points. Tiered calculation: first 50 gold at rate /10, next 100 at /15, then /20 per additional 100. Returns cumulative attitude points. | MEDIUM |

### Cluster: Diplomacy — AI Negotiation Response (Alliance/Peace/Tribute)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045B4DA | xlarge | FUN_0045b4da | diplo_ai_negotiate | param_1(human), param_2(ai), param_3(request_type) | byte(result) | **MASSIVE** (~10K bytes). AI response to human diplomatic requests. param_3: 1=alliance, 2=peace, 3-5=tribute/cease hostilities, 6=cancel alliance. For each request type, evaluates military balance, tech advantage, personality, betrayal history, number of wars, shared enemies. May demand tech ("PERHAPSSECRET"), gold ("PERHAPSTHROWIN"), or joint war ("PERHAPSSOLIDARITY"). Numerous string refs: "ALLIANCENOWINNING", "ALLIANCENODISLIKE", "ALLIANCENOTHANKS", "ALLIANCENOPATIENCE", etc. Returns 0=accepted, 1=rejected with attitude penalty. Withdraws units ("APOLOGIZE"), calculates tribute amounts, provocation checks. | HIGH |

### Cluster: Diplomacy — AI Favor Menu (Human asks for favors)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045DD7F | xlarge | FUN_0045dd7f | diplo_favor_menu | param_1(human), param_2(ai) | void | AI favor menu handler. "FAVORMENU" dialog: 0=cancel, 1=tech exchange, 2=declare war on third party, 3=share maps. War declaration: lists contactable civs (DAT_00655b0a), checks "NOCONTACT"/"ATWAR" constraints. Calculates mercenary fee based on military power, betrayal, personality. Strings: "HELLNOWEWONTGO", "MERCENARY", "CYBERCOP", "ETERNALALLIES", "UNFORTUNATE", "MERCDECLARE", "MERCBETRAY", "MERCBETRAYALLY". Map sharing: exchanges tile visibility (thunk_FUN_005b976d/005b9d81), unit visibility, city visibility. "MAPNO"/"MAPYES". Tech 0x2E (46=Map Making) prerequisite for maps. | HIGH |
| 0045F08D | stub | FUN_0045f08d | favor_cleanup | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0045F0A3 | stub | FUN_0045f0a3 | favor_seh_cleanup | void | void | SEH frame unwinding | LOW |

### Cluster: Diplomacy — Gift Menu (Human gives gifts)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045F0B1 | xlarge | show_gift_menu | show_gift_menu | param_1(human), param_2(ai) | void | **Already named**. Gift menu for human player giving to AI. "GIFTMENU" dialog: 1=tech, 2=gold, 3=military unit. Tech gifts: shows "TECHGIFT"/"TECHGIFT2", transfers via FUN_004bf05b, adjusts attitude. Gold gifts: 4 tiers (25%/50%/75%/100% of treasury in 50-unit increments), "MONEYGIFT" dialog. Unit gifts: lists cities, finds unit, transfers ownership, relocates unit, adjusts attitude by unit cost*3. Possible breakthrough (random tech gift in return). Strings: "ACCEPT", "WASTING", "KNOWNO", "MILITARYSOURCE", "MILITARYNONE", "MILITARYNO", "BREAKTHROUGH". | HIGH |
| 0045FD43 | stub | FUN_0045fd43 | gift_cleanup | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0045FD59 | stub | FUN_0045fd59 | gift_seh_cleanup | void | void | SEH frame unwinding | LOW |

### Cluster: Diplomacy — War Continuation & Diplomacy Menu

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0045FD67 | medium | FUN_0045fd67 | diplo_check_war_weariness | param_1(civ_id), param_2(enemy) | void | Checks if hawks in Senate allow continued war. Only fires if civ reputation > 4 (civ+0x1b5). Shows "CONTINUEHAWKS" or "CONTINUEUN" (if UN exists, wonder 0x18=24). Respects scenario flags and DAT_00654fa8. | MEDIUM |
| 0045FE19 | large | FUN_0045fe19 | diplo_show_main_menu | param_1(human), param_2(ai) | void | Top-level diplomacy action menu. "DIPLOMACY"/"DIPLOMACYMENU" — reads menu items from game data file. Constructs context-sensitive menu: item 0=exchange (always), 1=peace (if ceasefire), 2=alliance (if no treaty/ceasefire), 3=declare war (if at war), 4=threaten (if rep<5), 5=embargo (if ceasefire, no existing embargo), 6=cancel alliance (if at war), 7/8=always shown. Uses DAT_006558e8 for text file handle. | HIGH |

### Cluster: Tail Stubs (cleanup functions at end of block)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00460104 | stub | FUN_00460104 | diplo_menu_cleanup | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0046011A | stub | FUN_0046011a | diplo_menu_seh_cleanup | void | void | SEH frame unwinding | LOW |

---

## SUMMARY

### 1. Total Functions: 100

| Category | Count |
|----------|-------|
| **Diplomacy AI & Negotiation** | 32 |
| **Civilopedia / Hypertext Viewer** | 30 |
| **Advisor Screen (CV.DLL)** | 24 |
| **Wonder / Tech Queries** | 4 |
| **Registry / Language** | 3 |
| **Framework (MFC/CRT)** | 3 |
| **SEH Cleanup Stubs** | 14 |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0045705e (`ai_evaluate_diplomacy`)** — 6616 bytes. The master AI diplomacy evaluation function. Sets all diplomatic state globals (war willingness, tribute demand, scheming flags, military threat assessment). Accesses per-continent military data, treaty flags, nuclear status, personality traits. This is the brain of the AI's foreign policy.

2. **FUN_0045b4da (`diplo_ai_negotiate`)** — 10271 bytes. The AI's response logic for all diplomatic proposals (alliance, peace, tribute, cancel alliance). Contains all the negotiation strings, counter-demands, and decision trees. This is the largest function in the block.

3. **FUN_0045dd7f (`diplo_favor_menu`)** — 4878 bytes. Handles the "ask for favor" system including mercenary wars (paying AI to attack a third party), map sharing (full tile visibility exchange), and tech exchange requests. Contains the mercenary betrayal logic.

4. **FUN_00453da0 (`is_wonder_obsolete`)** — Confirmed the wonder obsolescence mechanism: checks if ANY civ (1-7) has the obsoleting tech from DAT_0064ba28. This was referenced in MEMORY.md but the actual function was only documented by address.

5. **FUN_00450480 (`pedia_setup_list_panel`)** — The core Civilopedia list builder. Iterates 100 techs filtered by current player's knowledge, with special handling for tradeable vs. unknown techs. Key for understanding the in-game help system.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Proposed Name | Evidence |
|--------|--------------|----------|
| DAT_0064b0e8 | diplo_should_provoke | Set to 0/1, checked before "PROVOKE" dialog. Controls whether AI will start a war during negotiations |
| DAT_0064b0ec | diplo_demand_amount | Set from continental military comparisons, used as tribute demand units. Divided by patience, clamped to gold ranges |
| DAT_0064b0f0 | diplo_gift_count | Incremented after each gift accepted. Used to calculate diminishing patience returns |
| DAT_0064b0f4 | diplo_foreign_cities_count | Count of target civ's cities owned by other civ. Used to assess territorial incursion |
| DAT_0064b0f8 | diplo_wants_war | War willingness flag. Set by military comparison, alliance obligations, nuclear status |
| DAT_0064b100 | diplo_weakest_ally | Weakest allied civ of target (by military power) |
| DAT_0064b104 | diplo_joint_war_target | Potential third-party civ for joint war proposal |
| DAT_0064b108 | diplo_last_contact_turn | Turn of last contact between negotiating civs (from civ+0x3E2 area) |
| DAT_0064b10c | diplo_second_best_tech | Second-best tech for exchange (backup if primary refused) |
| DAT_0064b110 | diplo_civ_a_cached | Cached civ_a ID for attitude tracking during negotiation |
| DAT_0064b114 | diplo_current_attitude | Current attitude score (0-99) for active negotiation. Clamped with various thresholds (0x1a=26 min under hatred, 99 max without hatred, 74 max at war) |
| DAT_0064b118 | diplo_tribute_demand | Calculated tribute demand in gold units. Modified by attitude, military, tech advantage |
| DAT_0064b11c | diplo_scheming_flag | Set when AI civ is "world power" (age 7, 5+ cities, turn>200). Changes AI behavior to be more aggressive/demanding |
| DAT_0064b120 | diplo_civ_b_cached | Cached civ_b ID for attitude tracking |
| DAT_0064b124 | diplo_best_tech | Best tech available for exchange (highest value via FUN_004bdb2c) |
| DAT_0064b128 | diplo_has_war_backup | Set when war willingness was cached before a wonder check reset it |
| DAT_0064b12c | diplo_power_asymmetry | Whether param_1 civ has lower power score than param_2 |
| DAT_0064b130 | diplo_sneak_attack_risk | From thunk_FUN_00598d45 — risk of AI launching surprise attack |
| DAT_0064b134 | diplo_border_threat_count | Count of target civ's cities near AI borders (from FUN_005b67af) |
| DAT_0064b138 | diplo_tribute_waiver_flag | When set, skips tribute flag 0x40000 on ceasefire |
| DAT_0064b13c | diplo_war_declared_flag | Mirrors DAT_0064b0f8 after attitude threshold processing |
| DAT_0064b140 | diplo_disposition_score | Net disposition modifier. Accumulates from: allies at war, relative power, nuclear status, leader personality. Used in alliance/peace decision |
| DAT_0064b144 | diplo_selected_tech | Tech ID selected for exchange/sale. -1 = none |
| DAT_0064b148 | diplo_willingness_level | 0=unwilling, 1=neutral, 2=willing. Controls treaty offer behavior |
| DAT_00626a00 | advisor_scroll_x | Horizontal scroll position for advisor screen. Range [0, 0x500-width] |
| DAT_00626a04 | advisor_this_ptr | Pointer to current advisor screen object. 0 when no advisor active |
| DAT_00626a1c | diplo_is_scenario_diplo | Flag for scenario-specific diplomacy behavior |
| DAT_00626a20 | diplo_use_contact_history | Flag enabling contact turn history checks |
| DAT_00626a24 | diplo_session_active | Set to 1 when diplomacy session begins |
| DAT_00626a30 | diplo_lock | Re-entrancy guard for diplomatic dialog |
| DAT_00626a34 | diplo_result | Negotiation result: 0=continue, -1=abort, positive=accepted |
| DAT_00626850 | hypertext_class_registered | One-shot guard for MSHyperTextClass registration |
| DAT_00626960 | default_language_id | Language setting from registry |
| DAT_006a6780 | pedia_navigate_mode | 1-5 for different navigation types when clicking hyperlinks |
| DAT_006a6784 | pedia_navigate_flags | Additional navigation flags (always set to 0) |
| DAT_006a85a0 | pedia_navigate_target | Target item index for Civilopedia navigation |
| DAT_006a85a8 | pedia_link_list_head | Head pointer for linked list of hypertext link nodes |
| DAT_00655be6 | wonder_city_assignments | Array of int16[28] — city index holding each wonder (-1 = none) |
| DAT_0064bc60 | scenario_diplo_flags | Scenario-specific diplomacy control flags. bit0=disable Statue of Liberty, bit15=hardcoded scenario behavior |
