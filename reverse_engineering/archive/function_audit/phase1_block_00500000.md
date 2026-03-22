# Phase 1 Audit: block_00500000 (0x00500E00 – 0x0050DEA8)

## Overview
This block contains the **City Dialog Window** — the entire UI for the city screen in Civ2 MGE. It includes all panel drawing functions (citizens, resources, food storage, production box, buy panel, supported units, improvements list, present units, trade routes), all button handlers (buy, change production, rename, view), mouse dispatch, layout calculations, window initialization, and button/scroll management. The city dialog class instance is referenced via `in_ECX` (this pointer) with member offsets up to `0x16dc`.

### Key City Dialog Class Members (from `in_ECX + offset`)
| Offset | Purpose |
|--------|---------|
| 0x159c | Current city index (into city array) |
| 0x15a0 | Dialog closing flag |
| 0x15a4 | Dialog blocked/animation flag |
| 0x15a8 | Another blocked flag |
| 0x15ac | Activate mode (0=normal, 1=blocked-activate, 2=normal-activate) |
| 0x15b0 | Info panel view mode (0=units, 1=minimap, 2=happiness) |
| 0x15b4 | Improvements scroll position |
| 0x15b8 | Flag: need full redraw |
| 0x15bc-15c0 | Window client width/height |
| 0x15c4-15c8 | X/Y offset for centering |
| 0x15cc-15d0 | Previous X/Y offset (dirty check) |
| 0x15d4 | Zoom level (1=small, 2=medium, 3=large) |
| 0x15d8 | Sprite zoom factor |
| 0x15dc-15e0 | Citizens row panel rect |
| 0x15ec-15f0 | Resource rows panel rect |
| 0x15fc-1600 | Food storage panel rect |
| 0x160c-1618 | Production box panel rect |
| 0x161c | Buy panel rect |
| 0x162c-1630 | Supported units panel rect |
| 0x163c-1640 | Improvements list panel rect |
| 0x164c-1650 | Info panel rect (units/minimap/happiness) |
| 0x165c-1668 | Resource map label rect |
| 0x166c-1674 | Improvements scrollbar rect |
| 0x167c-1680 | Supported units label rect |
| 0x168c-1694 | Info panel label rect |
| 0x169c | Scrollbar control rect |
| 0x16ac | Render context / offscreen buffer |
| 0x16b4-16dc | Button/control object pointers (Close, Change, Buy, View panels, Next/Prev arrows, scrollbar) |

---

### Cluster: CRT/MFC Static Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00500E00 | stub | FID_conflict___E51 | crt_static_init_1 | void | void | FRAMEWORK — VS98 static init pair, calls thunk_FUN_0043c460(0,0x10) + registers atexit | HIGH |
| 0x00500E1A | stub | FUN_00500e1a | crt_init_1a | void | void | FRAMEWORK — calls thunk_FUN_0043c460(0,0x10) | HIGH |
| 0x00500E38 | stub | FUN_00500e38 | crt_atexit_1a | void | void | FRAMEWORK — _atexit registration | HIGH |
| 0x00500E55 | stub | FUN_00500e55 | crt_cleanup_1a | void | void | FRAMEWORK — atexit handler, calls thunk_FUN_0043c520 | HIGH |
| 0x00500E6F | stub | FID_conflict___E51 | crt_static_init_2 | void | void | FRAMEWORK — same pattern, init pair for different object | HIGH |
| 0x00500E89 | stub | FUN_00500e89 | crt_init_2a | void | void | FRAMEWORK — thunk_FUN_0043c460(0,10) | HIGH |
| 0x00500EA7 | stub | FUN_00500ea7 | crt_atexit_2a | void | void | FRAMEWORK — _atexit registration | HIGH |
| 0x00500EC4 | stub | FUN_00500ec4 | crt_cleanup_2a | void | void | FRAMEWORK — atexit handler | HIGH |
| 0x00500EDE | stub | FID_conflict___E31 | crt_static_init_3 | void | void | FRAMEWORK — VS98 static init for city dialog constructor | HIGH |
| 0x00500EF8 | stub | FUN_00500ef8 | crt_init_citywin_ctor | void | void | FRAMEWORK — calls citywin constructor thunk | HIGH |
| 0x00500F12 | stub | FUN_00500f12 | crt_atexit_citywin_ctor | void | void | FRAMEWORK — _atexit for citywin dtor | HIGH |
| 0x00500F2F | stub | FUN_00500f2f | crt_cleanup_citywin_dtor | void | void | FRAMEWORK — calls citywin destructor thunk | HIGH |
| 0x00500F49 | stub | FID_conflict___E31 | crt_static_init_4 | void | void | FRAMEWORK — VS98 static init for surface objects | HIGH |
| 0x00500F63 | stub | FUN_00500f63 | crt_init_surface_1 | void | void | FRAMEWORK — calls FUN_005bd630 (surface init) | HIGH |
| 0x00500F7D | stub | FUN_00500f7d | crt_atexit_surface_1 | void | void | FRAMEWORK — _atexit for surface cleanup | HIGH |
| 0x00500F9A | stub | FUN_00500f9a | crt_cleanup_surface_1 | void | void | FRAMEWORK — calls FUN_005bd915 (surface destroy) | HIGH |
| 0x00500FB4 | stub | FID_conflict___E31 | crt_static_init_5 | void | void | FRAMEWORK — VS98 static init for second surface | HIGH |
| 0x00500FCE | stub | FUN_00500fce | crt_init_surface_2 | void | void | FRAMEWORK — calls FUN_005bd630 | HIGH |
| 0x00500FE8 | stub | FUN_00500fe8 | crt_atexit_surface_2 | void | void | FRAMEWORK — _atexit | HIGH |
| 0x00501005 | stub | FUN_00501005 | crt_cleanup_surface_2 | void | void | FRAMEWORK — calls FUN_005bd915 | HIGH |

---

### Cluster: City Dialog Background & Render Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050101F | large | FUN_0050101f | citywin_load_background | void | void | Loads CITY.GIF background image. Checks DAT_006aa78c (zoom level) cached in DAT_00630d34; if changed, loads "CITY_GIF" via FUN_005bf071, creates render context (0x27c×0x1a5 = 636×421), blits background. String evidence: "CITY_GIF" | HIGH |
| 0x0050117B | stub | FUN_0050117b | citywin_bg_cleanup_1 | void | void | FRAMEWORK helper — calls FUN_005c656b (render ctx cleanup) | LOW |
| 0x00501187 | stub | FUN_00501187 | citywin_bg_cleanup_2 | void | void | FRAMEWORK helper — calls FUN_005cde4d | LOW |
| 0x00501190 | stub | FUN_00501190 | citywin_bg_cleanup_3 | void | void | FRAMEWORK helper — calls FUN_005bd915 (surface destroy) | LOW |
| 0x005011A6 | stub | FUN_005011a6 | citywin_bg_seh_epilog | void | void | FRAMEWORK — SEH exception handler epilog | LOW |
| 0x005011B4 | large | FUN_005011b4 | citywin_create_arrow_button | (p1,p2,p3_panel,p4,p5_rect) | void | Creates a navigation arrow button (prev/next city). Uses scale_universal, blit, centers arrow sprite on button area. Called by citywin_CF06 for prev/next city arrows | MEDIUM |
| 0x005013BC | small | FUN_005013bc | citywin_modal_refresh | void | void | Refreshes city dialog if not already refreshing (DAT_00630d1c guard). Calls "CITYMODAL" string handler, updates title. String evidence: "CITYMODAL" | HIGH |
| 0x00501440 | small | FUN_00501440 | citywin_init_members | void | void | Initializes city dialog class members — sets this+0x15a4=1, +0x15a0=0, +0x15a8=0, +0x159c=-1, +0x15b4=0, +0x15b8=1, +0x16bc=0 (via InvalidateObjectCache misID) | MEDIUM |

---

### Cluster: City Dialog Window Management (MFC)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005014BF | stub | CMiniDockFrameWnd::OnClose | citywin_on_close | void | void | FRAMEWORK — MFC OnClose handler, calls close_dialog(2) | HIGH |
| 0x005014E5 | stub | FUN_005014e5 | citywin_close_all_panels | void | void | Closes sub-panels: close_dialog(1), close_dialog(3), close_dialog(4) | MEDIUM |
| 0x0050152B | stub | FUN_0050152b | citywin_close_and_destroy | void | void | Calls close_all_panels then OnClose | MEDIUM |
| 0x00501551 | small | FUN_00501551 | citywin_constructor | void | ptr | Constructs city dialog window object. Calls base class ctors, sets vtable to PTR_FUN_0061d6d4, calls citywin_init_members | MEDIUM |
| 0x0050160A | small | FUN_0050160a | citywin_destructor | void | void | Destroys city dialog. Sets vtable, calls close_and_destroy, base class dtors | MEDIUM |
| 0x00501673 | stub | FUN_00501673 | citywin_dtor_helper_1 | void | void | FRAMEWORK — calls thunk_FUN_0043c520 | LOW |
| 0x00501682 | stub | FUN_00501682 | citywin_dtor_helper_2 | void | void | FRAMEWORK — calls thunk_FUN_0046ab49 | LOW |
| 0x00501691 | stub | FUN_00501691 | citywin_dtor_helper_3 | void | void | FRAMEWORK — COleCntrFrameWnd dtor (Ghidra MFC misID) | LOW |
| 0x005016A4 | stub | FUN_005016a4 | citywin_dtor_seh_epilog | void | void | FRAMEWORK — SEH epilog | LOW |

---

### Cluster: City Dialog Panel Rendering Core

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005016B2 | small | FUN_005016b2 | citywin_blit_panel | (int* rect) | void | Blits a panel's offscreen buffer to the screen, adjusting for window scroll offsets (+0x15c4/15c8, +0x124/128). Core rendering helper | MEDIUM |
| 0x00501733 | stub | FUN_00501733 | citywin_prepare_panel | (p1_rect_offset) | void | Prepares panel for drawing: calls prepare_surface, sets render context, then blit_panel | MEDIUM |
| 0x00501780 | small | FUN_00501780 | citywin_refresh_top_panels | (int flag) | void | If dialog not blocked and city valid, recalcs city production (calc_city_production), redraws citizens row, resource rows, and info panel. Core refresh entry point | HIGH |

---

### Cluster: City Dialog — Citizens Row & Specialist Click

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00501819 | large | FUN_00501819 | citywin_click_citizen | (short idx) | void | Handles click on citizen icon in citizens row. Validates ownership/god mode, checks city size vs specialist count. Cycles specialist type (1→2→3→1) for cities size≥5, or shows "ELVISERR" for small cities. String evidence: "ELVISERR" | HIGH |
| 0x005019C1 | xlarge | FUN_005019c1 | citywin_draw_citizen_icons | (x,y,p3_width,food_count,unhappy_count,p6) | int | Draws the citizen icon row in the city dialog. Four loops: (1) food-producing citizens, (2) content citizens, (3) unhappy citizens (distinguishing types via local_14=4 vs 6), (4) specialists (DAT_006a6604). Uses blit_dimmed for shadow, blit_normal for icon. Returns icon spacing | MEDIUM |
| 0x00501E63 | large | FUN_00501e63 | citywin_draw_citizen_icons_simple | (x,p2,p3_width,food,unhappy,p6) | int | Simplified version of citizen icon drawing — no dimmed shadow pass (used for happiness breakdown sub-rows). Same 4-loop structure | MEDIUM |

---

### Cluster: City Dialog — Citizens & Resource Rows (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050207F | large | FUN_0050207f | draw_citizens_row | (int repaint) | void | **Already documented.** Draws full citizens row panel — city name labels ("Producing" / capital indicator), happy/unhappy/specialist counts via DAT_006a6550/65a8/659c, numbered citizen slots. Uses set_text_style, scale_universal, calc_icon_spacing | HIGH |
| 0x005022C0 | large | FUN_005022c0 | citywin_click_resource_map | (x, y) | void | Handles click on the resource map in city dialog. Converts screen coords to tile-relative dx/dy using isometric math (CitySpiralDX/DY at DAT_00628370/006283a0). Toggles worker tile assignments via FUN_004e790c/004e9719. Slot 0x14 (20) = center tile reset. Calls refresh_top_panels | HIGH |
| 0x005025D5 | xlarge | FUN_005025d5 | draw_resource_rows | (int repaint) | void | **Already documented.** 9761-byte monster. Draws resource map + all 5 resource rows (food, shields, trade, corruption, gold/luxury/science). Iterates 21 city radius tiles, draws terrain/units/cities. Then renders food surplus/deficit bars, shield bars (production+support+waste), trade bars (gross-corruption = gold+luxury+science). Uses fill_rect_palette with palette indices (0x2d=food, 0x54=shield, 0x76=trade, etc.). Accesses DAT_006a65c8 (food surplus), DAT_006a65cc (shield surplus), DAT_006a65d0 (gross trade), DAT_006a6580 (corruption), DAT_006a6554 (gold), DAT_006a65fc (luxury), DAT_006a6578 (science), DAT_006a6568 (support), DAT_006a656c (waste), DAT_006a6618 (tithe bonus). Checks govt_type==4 (Fundamentalism) for tithe. Displays tax/science/luxury rates from civ+0x13/+0x14 | HIGH |

---

### Cluster: City Dialog — Food Storage, Production Box, Buy Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00504C05 | xlarge | FUN_00504c05 | draw_food_storage | (int repaint) | void | **Already documented.** Draws food storage box. Grid of food icons (city.food_box at +0x1A), checks for Granary (building 3) or Pyramids (wonder 0) for half-line. DAT_006a6560 = food_per_citizen | HIGH |
| 0x0050503E | xlarge | FUN_0050503e | draw_production_box | (int repaint) | void | **Already documented.** Draws production/shield box. If building (current_production < 0): shows building sprite + shield grid. If unit (≥0): shows unit sprite via draw_unit (FUN_0056baff). Shield grid uses DAT_006a657c (shields_per_row). Cost from imp[].cost or utype[].cost × COSMIC[4] | HIGH |
| 0x005055DD | small | FUN_005055dd | draw_buy_panel | (int repaint) | void | **Already documented.** Minimal buy panel — just prepares panel surface and optionally repaints. The actual buy button is a separate control | HIGH |

---

### Cluster: City Dialog — Supported Units Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00505666 | xlarge | FUN_00505666 | draw_units_supported | (int repaint) | void | **Already documented.** Draws supported units panel. Iterates all unit slots (DAT_00655b16), filters to units homed to current city. Draws each unit via draw_unit with shield + support cost shields. Calculates military support cost based on government type — checks Democracy (govt==6) for extra unhappiness support, Women's Suffrage (wonder 21), Police Station (building 0x21=33). Uses DAT_006a6608 as base support count | HIGH |

---

### Cluster: City Dialog — Sell Improvement

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00505D3D | large | FUN_00505d3d | citywin_sell_improvement | (short idx) | void | Handles selling a city improvement. Checks ownership, not already sold this turn (flags&4). Iterates improvements to find the idx-th built one. Shows "CANTHOCKTHIS" if trying to sell Palace. Otherwise shows "HOCKTHIS" confirmation, removes improvement, adds gold (cost × COSMIC[4]), sets sold flag. String evidence: "CANTHOCKTHIS", "HOCKTHIS", "ALREADYSOLD" | HIGH |

---

### Cluster: City Dialog — Improvements List Panel

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00505FFA | xlarge | FUN_00505ffa | draw_improvements_list | (int repaint) | void | **Already documented.** Draws scrollable improvements list. Iterates buildings (0-38) and wonders (0-27, mapped to 39-66). For each built item, draws sprite + name + maintenance indicator. Uses scroll position from +0x15b4. Sets DAT_006aa770 = total count, configures scrollbar via FUN_005db0d0 | HIGH |

---

### Cluster: City Dialog — Unit Info Display & Popup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00506448 | large | FUN_00506448 | citywin_format_unit_info | (int unit_idx) | void | Formats unit information text for dialog display. Shows owner name, veteran status ("V"), unit type name, position (x,y), home city name, and home city owner. String: looks up unit fields at stride 0x20 | MEDIUM |
| 0x00506637 | xlarge | FUN_00506637 | citywin_unit_popup_supported | (int unit_idx) | void | Shows popup dialog for a supported unit (from city's supported units panel). Creates property sheet with unit info ("CHILDCLICK"). Offers options: disband (return cost/2 to shield_box), activate, sentry. Checks unit type domain and home city. String evidence: "CHILDCLICK" | HIGH |
| 0x00506A15 | stub | FUN_00506a15 | citywin_popup_cleanup_1 | void | void | FRAMEWORK — calls FUN_005cde4d | LOW |
| 0x00506A1E | stub | FUN_00506a1e | citywin_popup_cleanup_2 | void | void | FRAMEWORK — calls thunk_FUN_0059df8a (dialog cleanup) | LOW |
| 0x00506A34 | stub | FUN_00506a34 | citywin_popup_seh_epilog | void | void | FRAMEWORK — SEH epilog | LOW |
| 0x00506A42 | xlarge | FUN_00506a42 | citywin_unit_popup_present | (short slot_idx) | void | Shows popup dialog for a present unit (from city's present units panel). Creates property sheet ("UNITOPTIONS"). Options depend on unit state: activate, sentry/wake, fortify, disband, change home city, go to home city. If unit not owned by current player, shows different options. String evidence: "UNITOPTIONS". Switch cases 1-9 handle different unit commands | HIGH |

---

### Cluster: CRT/MFC Helpers for Unit Popup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005070B8 | stub | citywin_70B8 | citywin_popup_present_cleanup_1 | void | void | FRAMEWORK — calls FUN_005cde4d | LOW |
| 0x005070C1 | stub | citywin_70C1 | citywin_popup_present_cleanup_2 | void | void | FRAMEWORK — calls thunk_FUN_0059df8a | LOW |
| 0x005070D7 | stub | citywin_70D7 | citywin_popup_present_seh_epilog | void | void | FRAMEWORK — SEH epilog | LOW |

---

### Cluster: City Dialog — Info Panel (Units Present / Minimap / Happiness)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005070E5 | xlarge | citywin_70E5 | citywin_draw_units_present | void | void | Draws the "units present" view of the info panel. Shows up to 4 rows of garrisoned units using draw_unit (FUN_0056baff). First 2 rows show unit name labels beneath. After 2 rows, staggers to offset grid. Also draws air capacity counter (DAT_006a6584) and trade route info (supply/demand commodities with city names). Uses commodity name lookup at DAT_0064b168 | HIGH |
| 0x00507B69 | xlarge | citywin_7B69 | citywin_draw_minimap | void | void | Draws the minimap view in the info panel. Shows world map at pixel-per-tile scale. Colors: 0x5d = owned visible tile, 0x30 = unowned, 0x1d = unit positions (green), 0x29 = city position (bright). Uses map dimensions DAT_006d1160/006d1162, wrap via FUN_005ae052. Checks visibility via FUN_005b8b65 | HIGH |
| 0x00507F31 | large | citywin_7F31 | citywin_draw_defense_buildings | (int* x, y, height) | void | Draws defense-related improvement icons in happiness panel — checks buildings: City Walls (0xe=14→0xb=11 if obsolete), Temple (4), Barracks (1)/Library (7→1 if Democracy). Max 3 icons. Uses has_building (FUN_0043d20a) and wonder_obsolete check (FUN_00453e51) | MEDIUM |
| 0x00508177 | xlarge | citywin_8177 | citywin_draw_happiness_modifiers | (int* x, y, height, width) | void | Draws happiness modifier icons in happiness breakdown panel. For govt 4 (Fundamentalism): shows govt name. For govt<5: shows garrisoned military units (up to 3). For govt≥5 (Republic/Democracy): draws military unhappiness shield icons. Checks Women's Suffrage (wonder 21), Police Station (building 0x21=33). Uses DAT_006a65e4 (military unhappy count) | HIGH |
| 0x00508552 | xlarge | citywin_8552 | citywin_draw_happiness_panel | void | void | Draws the full happiness breakdown panel — 5 rows: (0) base content, (1) luxury effect, (2) building effects, (3) unit/military effects, (4) wonder effects. Each row shows before→after citizen icon differences. References DAT_006a6620/65f0 happiness state arrays. Calls draw_defense_buildings and draw_happiness_modifiers. Shows Fundamentalism tithe (DAT_006a6618) | HIGH |
| 0x00508ADC | medium | citywin_8ADC | citywin_draw_info_panel | (int repaint) | void | **Already documented.** Dispatches to one of three info panel views based on +0x15b0: 0=units_present (citywin_70E5), 1=minimap (citywin_7B69), 2=happiness (citywin_8552) | HIGH |

---

### Cluster: City Dialog — Full Redraw & Layout

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00508BC5 | medium | citywin_8BC5 | citywin_redraw_all_panels | (p1_repaint) | void | Redraws all 8 city dialog panels in order: citizens_row, resource_rows, food_storage, production_box, buy_panel, units_supported, improvements_list, info_panel | HIGH |
| 0x00508C84 | medium | citywin_8C84 | citywin_calc_panel_rect | (rect, x, y, w, h) | void | Calculates scaled panel rectangle from base coordinates. Applies zoom factor (this+0x15d4) and centering offset (+0x15c4/15c8, +0x124/128). Formula: `(zoom * coord + 1) / 2 + offset` | MEDIUM |
| 0x00508D24 | large | citywin_8D24 | citywin_calc_all_rects | void | void | Calculates all 12 panel rectangles using citywin_calc_panel_rect. Base coordinates define the 636×421 city dialog layout: citizens(0,0,0x1b4,0x3d), resources(0,0x3d,0x1b4,0x99), food(0x1b4,0,0xc8,0xa7), production(0x1b4,0xa7,0xc8,0xbd), buy(0x1b4,0x164,0xc8,0x41), supported(0,0xd4,0xc0,0x4e), improvements(0,0x122,0xc0,0x83), info(0xc0,0xd4,0xf4,0xd1), etc. | HIGH |
| 0x00508EC6 | large | citywin_8EC6 | citywin_draw_border_fills | void | void | Draws border fills around the city dialog content area if window is larger than content (0x27c×0x1a5). Fills margins with palette color 10 | MEDIUM |
| 0x00509028 | large | citywin_9028 | citywin_calc_zoom_and_layout | void | void | Calculates zoom level based on window dimensions. Sets this+0x15d4: 3 if width≥iVar4+0x297 AND height≥iVar4*2+0x3b6; 1 if width<iVar4+0x1b9 OR height<iVar4*2+0x278; else 2. Creates fonts, loads background, centers content, triggers full layout recalc if offsets changed | HIGH |

---

### Cluster: City Dialog — Title Bar & Refresh

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005092AF | large | citywin_92AF | citywin_draw_title_bar | void | void | Draws city dialog title: city name, turn counter, "of" separator, civ gold. Checks multiplayer count (DAT_006aa78c). Shows auto-governor indicator if (DAT_0064bc60&2). Uses render_city_name (FUN_0055324c) | MEDIUM |
| 0x00509429 | medium | citywin_9429 | citywin_full_refresh | void | void | Full refresh of city dialog. Validates city exists and is alive (DAT_00628044). If not blocked: recalc production, calc zoom/layout, draw title, begin paint, draw borders, calc rects, redraw all panels, end paint. If blocked: just title bar | HIGH |
| 0x0050951F | stub | citywin_951F | citywin_show_dialog | void | void | Shows city dialog window — calls FUN_005bb574 + FUN_004085f0 (show window) | MEDIUM |
| 0x00509545 | stub | citywin_9545 | citywin_bring_to_front | void | void | Brings city dialog to front if not blocked. Uses BringWindowToTop Win32 API | HIGH |

---

### Cluster: City Dialog — Open/Disorder Handler

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00509590 | xlarge | handle_city_disorder_00509590 | handle_city_disorder | (int city_idx) | void | **Already named.** Opens city dialog for given city, optionally handling disorder. Massive multiplayer safety check (18 DAT_006ad8xx flags). Sets city index, recalculates, shows dialog. Tutorial hooks: "CITYSTUFF", "DISORDER", "DISORDER2", "DISORDER3". In multiplayer mode, enters message pump loop. String evidence: "CITYSTUFF", "DISORDER" | HIGH |

---

### Cluster: City Dialog — Zoom, Position, Misc Controls

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00509935 | stub | citywin_9935 | citywin_on_refresh_msg | void | void | Message handler — just calls citywin_full_refresh | LOW |
| 0x0050994F | small | citywin_994F | citywin_close_dialog | void | u32 | Closes city dialog and returns to map. Sets DAT_006aa75c=1, calls FUN_004503d0/00451900/00484d52 (map refresh chain) | MEDIUM |
| 0x0050998F | medium | citywin_998F | citywin_calc_window_position | void | void | Calculates centered window position for city dialog. Base size = 0x27c×0x1a5 + chrome. Centers on screen. Sets DAT_00655344 (window rect) | MEDIUM |
| 0x00509A49 | stub | citywin_9A49 | citywin_set_zoom_and_position | void | void | Sets initial zoom: DAT_006aa78c=2 (or 3 if DAT_006ab198>999), then calcs position | MEDIUM |
| 0x00509A82 | stub | citywin_9A82 | citywin_set_drag_mode | void | void | Sets DAT_006aa758=1 (enable window dragging) | LOW |
| 0x00509A9C | stub | citywin_9A9C | citywin_clear_drag_mode | void | void | Clears DAT_006aa758=0, refreshes dialog | LOW |
| 0x00509AC0 | small | citywin_9AC0 | citywin_format_turns_to_complete | (cost_mult, accumulated) | void | Calculates and formats "N turns" remaining for production. Uses DAT_006a657c (shields_per_row), DAT_006a65cc-006a6568 (net shields). Displays singular/plural ("turn"/"turns") | MEDIUM |

---

### Cluster: City Dialog — Buy Button

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00509B48 | xlarge | city_button_buy | city_button_buy | (p1) | void | **Already named.** Buy production handler. Massive multiplayer safety check. Calculates buy cost: buildings = (remaining_cost - accumulated) × 2; units = (remaining² / 20) + remaining × 2; if building id > 0x22 (wonder), cost × 4. Doubles if shield_box=0. Shows "COMPLETE0" dialog + building/unit info. String evidence: "COMPLETE0", debug_log "city_button_buy" | HIGH |
| 0x0050A1B2 | stub | citywin_A1B2 | citywin_buy_cleanup_1 | void | void | FRAMEWORK — calls thunk_FUN_0059df8a | LOW |
| 0x0050A1C8 | stub | citywin_A1C8 | citywin_buy_seh_epilog | void | void | FRAMEWORK — SEH epilog | LOW |

---

### Cluster: City Dialog — Production Change Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050A1D6 | medium | citywin_A1D6 | citywin_draw_change_item_sprite | (p1,surface,item_id,flags,x,y,height) | u32 | Draws a building or wonder sprite in the change-production dialog. If item_id < 0x3E (62): building sprite. Else: wonder sprite (20px tall). Zoomed appropriately | MEDIUM |
| 0x0050A2F7 | large | citywin_A2F7 | citywin_draw_change_city_sprite | (p1,surface,civ_id,flags,x,y,height) | u32 | Draws a city sprite for the change-production dialog. Finds the largest city of the given civ to use as representative. Scoring: size + 200 if barracks + 100 if no production. Uses draw_city_sprite (FUN_0056d289) | MEDIUM |

---

### Cluster: City Dialog — Change Production (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050A473 | xlarge | city_button_change | city_button_change | (p1) | void | **Already named.** 4544-byte monster. Handles production change dialog. Massive multiplayer safety check. Lists available units (0-61), buildings (1-38), wonders (0-27). Each entry shows name, cost, attack/defense/move stats. Supports worklist (DAT_00655aea bit 1), auto-governor (AUTOMODE). Options: select item (case 0), enable auto (case 1), change to item (case 2), special actions (case 3 — set unit build target, build wonder, etc.). Checks "PRODCHANGE" confirmation if switching from partial build. String evidence: "PRODUCTION", "AUTOMODE", "FREEBIE", "PRODCHANGE", "WONDER", debug_log | HIGH |
| 0x0050B638 | stub | citywin_B638 | citywin_change_cleanup_1 | void | void | FRAMEWORK — dialog cleanup | LOW |
| 0x0050B644 | stub | citywin_B644 | citywin_change_cleanup_2 | void | void | FRAMEWORK — dialog cleanup | LOW |
| 0x0050B650 | stub | citywin_B650 | citywin_change_cleanup_3 | void | void | FRAMEWORK — dialog cleanup | LOW |
| 0x0050B666 | stub | citywin_B666 | citywin_change_seh_epilog | void | void | FRAMEWORK — SEH epilog | LOW |
| 0x0050B674 | medium | citywin_B674 | citywin_idle_timer_check | void | void | Idle timer handler — checks if city was deleted (DAT_006a91b8=-1) or multiplayer timeout. Sends WM_CLOSE after 0x4b0 tick timeout (1200ms). Uses DAT_006ad2f7 (multiplayer mode), DAT_006ad678 (window handle array) | MEDIUM |

---

### Cluster: City Dialog — Rename Button (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050B74E | large | city_button_rename | city_button_rename | (p1) | void | **Already named.** Rename city handler. Multiplayer safety check. Shows input dialog ("RENAMECITY"), copies new name to city+0x20 (name field, 16 chars max). String evidence: "RENAMECITY", debug_log | HIGH |

---

### Cluster: City Dialog — View Tab Buttons

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050B9A4 | small | citywin_B9A4 | citywin_button_tab_units | void | void | Sets info panel view to 0 (units present), recalcs/redraws. Sets DAT_006aa768=0 | MEDIUM |
| 0x0050BA07 | small | citywin_BA07 | citywin_button_tab_minimap | void | void | Sets info panel view to 1 (minimap), recalcs/redraws. Sets DAT_006aa768=1 | MEDIUM |
| 0x0050BA6A | small | citywin_BA6A | citywin_button_tab_happiness | void | void | Sets info panel view to 2 (happiness), recalcs/redraws. Sets DAT_006aa768=2 | MEDIUM |

---

### Cluster: City Dialog — View Button (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050BACD | large | city_button_view | city_button_view | (p1) | void | **Already named.** View city improvements handler. Multiplayer safety check. Calls FUN_00454260 to show visual city view. String evidence: debug_log "city_button_view" | HIGH |

---

### Cluster: City Dialog — Close/Next/Prev City Navigation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050BC4F | small | citywin_BC4F | citywin_button_close | void | void | Close button handler. Plays sound (event 99). In multiplayer (DAT_006aa764==2): sets DAT_00630d18 flag. Otherwise: calls citywin_close_dialog. Then invalidates multiple regions (1,2,4,5,6) | MEDIUM |
| 0x0050BCDA | stub | citywin_BCDA | citywin_scroll_improvements | (p1_position) | void | Scrollbar handler for improvements list — sets DAT_006aa76c (scroll offset), recalcs, redraws improvements | MEDIUM |
| 0x0050BD13 | large | citywin_BD13 | citywin_button_next_city | void | void | Navigate to next city (alphabetically). Iterates all cities of same owner, finds next name alphabetically after current. Uses __strcmpi for string comparison. Wraps around to first city. Falls back to modal refresh in multiplayer | MEDIUM |
| 0x0050BF72 | large | citywin_BF72 | citywin_button_prev_city | void | void | Navigate to previous city (alphabetically). Same algorithm as next but searches for previous name. Uses "zzzzzzzzzzzzzzzzzzzzzzzzz" as initial high sentinel. String evidence | MEDIUM |

---

### Cluster: City Dialog — Mouse Dispatch (Already Named)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050C1D1 | large | city_mouse | city_mouse | (p1_x, p2_y, p3_flags) | void | **Already named.** Mouse click dispatcher. Multiplayer safety check. Uses FUN_0046ad85 to hit-test click against panels. Routes to: click_resource_map (1), click_citizen (2), unit_popup_present (3), sell_improvement (4), skip (5), unit_popup_supported (6). String evidence: debug_log "city_mouse" | HIGH |
| 0x0050C405 | stub | citywin_C405 | citywin_on_lbutton_down | (x, y) | void | Left button click — calls city_mouse(x, y, 0) | HIGH |
| 0x0050C427 | stub | citywin_C427 | citywin_on_rbutton_down | (x, y) | void | Right button click — calls city_mouse(x, y, 1) | HIGH |
| 0x0050C449 | stub | citywin_C449 | citywin_on_city_deleted | (city_idx) | void | Handles city deletion notification. If deleted city == current city, closes dialog | MEDIUM |

---

### Cluster: City Dialog — Update Notifications

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050C494 | large | citywin_C494 | citywin_on_unit_moved | (unit_idx, x, y) | void | Handles unit movement notification. If unit moved to/from city tile: recalcs and redraws info panel, production box. If supported unit's owner matches: also redraws supported units panel | MEDIUM |
| 0x0050C679 | small | citywin_C679 | citywin_on_city_changed | (city_idx) | void | Handles city state change notification. If city_idx matches current city and not blocked, triggers full refresh | MEDIUM |
| 0x0050C6EF | medium | citywin_C6EF | citywin_on_tile_changed | (x, y) | void | Handles tile change notification. If tile is within 2 squares of city (FUN_005ae31d distance check), refreshes top panels | MEDIUM |

---

### Cluster: City Dialog — Button Objects & Cleanup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050C7A3 | medium | citywin_C7A3 | citywin_clear_button_ptrs | void | void | Zeros all 10 button/control object pointers (+0x16b4 through +0x16d8) | MEDIUM |
| 0x0050C859 | large | citywin_C859 | citywin_destroy_buttons | void | void | Destroys all button/control objects: 7 buttons (via FUN_004bb3b0), 2 scroll arrows (via FUN_00511560), 1 scrollbar (via FUN_004bb4f0). Then clears pointers | MEDIUM |

---

### Cluster: City Dialog — Button Creation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050CA8D | large | citywin_CA8D | citywin_create_close_button | (int show) | void | Creates the Close/Exit button. Allocates 0x3C-byte button object, positions at bottom-right of dialog. Sets callback to citywin_button_close (citywin_BC4F). Checks activate mode for different button art (normal vs disorder) | MEDIUM |
| 0x0050CCB3 | large | citywin_CCB3 | citywin_create_change_button | (int show) | void | Creates the Change Production button. Only recreates if auto-governor state changed (DAT_00630d24). Positions at top-right area. Sets callback to city_button_change. Uses different button art for auto-governor on/off | MEDIUM |
| 0x0050CF06 | xlarge | citywin_CF06 | citywin_create_all_buttons | void | void | **Master button creation function.** Creates all 10 controls: Close, Change, Buy (callback: city_button_buy), next-city arrow (citywin_BF72), prev-city arrow (citywin_BD13), View Units (citywin_B9A4), View Map (citywin_BA07), View Rename (citywin_BA6A → actually view happiness), View button (city_button_view), scrollbar. Also sets zoom-based sprite factor: zoom 1→-5, zoom 2→-2, zoom 3→1. Loads scaled terrain sprite if zoom changed | HIGH |

---

### Cluster: City Dialog — Activate/Deactivate & Misc

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0050DADA | small | citywin_DADA | citywin_on_activate | void | void | Window activation handler. Sets +0x15ac based on blocked state (2 if not blocked, 1 if blocked). Sets DAT_00630d20 flag if not blocked | MEDIUM |
| 0x0050DB36 | small | citywin_DB36 | citywin_on_deactivate | void | void | Window deactivation handler. Clears +0x15ac. If was mode 2, recreates close button | MEDIUM |
| 0x0050DB92 | stub | citywin_DB92 | citywin_on_getminmaxinfo | void | void | Returns min/max window size from DAT_00655344 | LOW |
| 0x0050DBB8 | stub | citywin_DBB8 | citywin_on_nchittest | void | void | Same as above — returns from DAT_00655344 | LOW |
| 0x0050DBDE | medium | citywin_DBDE | citywin_on_syscommand | (int cmd) | void | System command handler: cmd=1→close, cmd=2→zoom out (DAT_006aa78c-1, min 2), cmd=3→zoom in (max 3, or 2 if screen<1000) | MEDIUM |
| 0x0050DCB6 | large | citywin_DCB6 | citywin_on_create | void | void | WM_CREATE handler. Initializes city dialog: calls init_members, sets initial zoom, creates fonts, registers panel surfaces (DAT_00645120 for food icons, DAT_00648820 for shield icons, DAT_00647788 for trade icons). Registers keyboard handler (thunk_map_ascii), sets up all button callbacks | HIGH |
| 0x0050DEA8 | stub | citywin_DEA8 | citywin_on_destroy | void | void | WM_DESTROY handler. Sets +0x15a0=1 (closing), destroys buttons, calls base class cleanup | MEDIUM |

---

## SUMMARY

### 1. Total Functions: 91

| Category | Count | Notes |
|----------|-------|-------|
| CRT/MFC Boilerplate (FRAMEWORK) | 25 | Static init pairs, atexit, SEH epilogs, dialog cleanup thunks |
| City Dialog Drawing | 22 | Panel renderers: citizens, resources, food, production, buy, supported, improvements, info (3 views), happiness breakdown |
| City Dialog Buttons | 14 | Buy, Change, Rename, View, Close, tabs (3), next/prev city, sell improvement |
| City Dialog Layout/Init | 12 | Constructor, destructor, rect calculation, zoom, window position, create buttons |
| City Dialog Events | 10 | Mouse, keyboard, activate/deactivate, unit moved, city changed, tile changed, city deleted |
| City Dialog Helpers | 8 | Panel blit, refresh, modal, unit info format, turns-to-complete, idle timer |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_005022c0 → citywin_click_resource_map** (0x005022C0, 784B) — Handles worker tile assignment clicks. Core gameplay interaction that was not previously named.

2. **FUN_005019c1 → citywin_draw_citizen_icons** (0x005019C1, 1186B) — The actual citizen icon rendering with 4-pass loop (food/content/unhappy/specialist). Critical for understanding happiness visualization.

3. **citywin_70E5 → citywin_draw_units_present** (0x005070E5, 2692B) — Large function drawing garrisoned units with trade route info. Contains commodity name lookups.

4. **citywin_8552 → citywin_draw_happiness_panel** (0x00508552, 1393B) — Full 5-row happiness breakdown display. Documents the visual representation of all happiness modifiers.

5. **citywin_CF06 → citywin_create_all_buttons** (0x0050CF06, 2883B) — Master button/control creation. Maps all button callbacks and defines the zoom→sprite-factor relationship (zoom 1=-5, 2=-2, 3=1).

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_006aa78c | citywin_zoom_level | Compared to DAT_00630d34 (cached zoom), values 2/3, controls background reload |
| DAT_006aa768 | citywin_info_panel_mode | Set to 0/1/2 by tab buttons, selects units/minimap/happiness view |
| DAT_006aa76c | citywin_improvements_scroll_offset | Set by scrollbar handler, used in draw_improvements_list |
| DAT_006aa764 | multiplayer_mode_type | Compared to 2 for multiplayer close behavior |
| DAT_00630d34 | citywin_cached_zoom | Cached zoom level to detect changes and reload background |
| DAT_00630d1c | citywin_refresh_guard | Reentrance guard for modal refresh |
| DAT_00630d2c | citywin_popup_guard | Reentrance guard for unit popup dialogs |
| DAT_00630d18 | citywin_close_requested | Set in multiplayer to signal deferred close |
| DAT_00630d20 | citywin_activate_pending | Set on activate, cleared on deactivate |
| DAT_00630d24 | citywin_cached_auto_governor | Cached auto-governor state for change button |
| DAT_00630d28 | citywin_cached_sprite_zoom | Cached sprite zoom factor to detect changes |
| DAT_00630d30 | citywin_idle_timer_active | Timer state for idle/timeout handling |
| DAT_00630d68 | citywin_idle_timer_start | Tick count when idle timer started |
| DAT_006a6604 | specialist_count | Number of specialists in current city (used in citizen drawing) |
| DAT_006a65e4 | military_unhappy_count | Number of military units causing unhappiness |
| DAT_006a6584 | air_capacity_count | Air unit capacity/count for city |
| DAT_006a6590 | trade_route_revenue[3] | Per-route revenue values (array of 3 ints) |
| DAT_006a6608 | base_support_free_units | Number of free support units before cost applies |
| DAT_006d1160 | map_width | Map width in tiles (for minimap) |
| DAT_006d1162 | map_height | Map height in tiles (for minimap) |
| DAT_00655afe | selected_unit_id | Unit ID selected for activation from city |
| DAT_006aa75c | close_city_requested | Flag to close city dialog |
