# Function Audit: block_00430000.c (0x00430000 - 0x0043FFFF)

Source: `civ2.exe` (Civilization II Multiplayer Gold Edition)
Decompiled by Ghidra 12.0.3

---

### Cluster: Intelligence / Foreign Advisor UI

These functions implement the Foreign Advisor (F3) dialog -- showing diplomatic status, treaty information, and intelligence reports for other civilizations. The string references `INTELLCITY`, `REPORTFOREIGN`, `NOINTEL`, `NOFOREIGN`, `PARLEY*` confirm this.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00430267 | small | FUN_00430267 | intel_set_scroll_offset | `int param_1` | void | Sets scroll offset for intelligence list: `DAT_0063ef70 = DAT_0063ef74 * param_1`, then calls a redraw thunk. | LOW |
| 0043028A | medium | FUN_0043028a | intel_click_handler | `int param_1, int param_2` | void | Handles click in intel city list. Converts screen coords to grid index via DAT_0063ef74/DAT_0063ef80/DAT_0063ef98. Iterates up to 100 techs via FUN_004bd9f0 (has_tech), selects nth active item. Invalidates cache + sets dirty flag DAT_00625ec4. | MEDIUM |
| 0043039D | large | FUN_0043039d | show_intelligence_city_list | void | void | Shows intelligence city list for DAT_0063efac (target civ). String ref `INTELLCITY`. Iterates city slots (stride 0x58), filters by owner. Calls has_building (FUN_0043d20a) for building 1 (Palace). Shows current production via improvement table (DAT_0064c488). | HIGH |
| 004305E7 | stub | FUN_004305e7 | intel_city_cleanup | void | void | SEH cleanup: calls thunk_FUN_0059df8a (stack frame destructor). | LOW |
| 004305FD | stub | FUN_004305fd | intel_city_seh_restore | void | void | SEH epilog: restores FS:[0] chain. | LOW |

### Cluster: Foreign Advisor / Diplomacy Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043060B | large | FUN_0043060b | open_intelligence_dialog | `param_1 (civ_id), param_2 (target_civ)` | void | Opens intelligence report dialog for a foreign civ. Sets up window with toolbar buttons, enters main event loop (`DAT_00625ec4` dirty loop). Uses `DAT_00628420+0x51c/0x314` for bitmap resources. Calls `show_credits(3,3,...)`. | MEDIUM |
| 00430822 | small | FUN_00430822 | check_diplomacy_timeout | void | void | Checks if enough time has elapsed (DAT_006ad8b8 * 60 ticks) since last diplomacy event. If so, sets window flag 0x400 and invalidates display. Also checks DAT_0063f278 (diplomacy response) and DAT_006c91e4 (multiplayer state). | MEDIUM |
| 004308AE | xlarge | FUN_004308ae | show_foreign_advisor | `int param_1` (civ_id) | void | Main Foreign Advisor dialog. String refs: `REPORTFOREIGN`, `REPORTFOREIGNMULTI`, `NOFOREIGN`, `NOINTEL`, `PARLEYWAITING`, `PARLEYGOAWAY`, `PARLEYOK`, `PARLEYCANCEL`, `PARLEYBUSY`, `PEACENOBETRAY`. Iterates civs 1-7, checks active_civs_bitmask (DAT_00655b0a), human_civs_bitmask (DAT_00655b0b). Shows treaty status via bitfield checks: bit 0x02=peace, 0x04=alliance, 0x08=war, 0x20=hatred(?), 0x80=embassy. Handles multiplayer parley negotiation with timeout. Calls FUN_004fbe84 for peace treaty check. | HIGH |
| 0043154F | stub | FUN_0043154f | foreign_advisor_cleanup | void | void | SEH cleanup thunk. | LOW |
| 00431565 | stub | FUN_00431565 | foreign_advisor_seh_restore | void | void | SEH epilog: restores FS:[0]. | LOW |

### Cluster: Wonders of the World Report

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00431573 | xlarge | FUN_00431573 | render_wonders_report | void | void | Renders the Wonders of the World report. Iterates 28 (0x1c) wonders via `DAT_00655be6` (wonder->city mapping, short[28]). Groups by era (0-3, 7 wonders each). Shows wonder name from improvement table (+0x27 offset), city name, owner. Uses scrollbar (DAT_0063ef70/74/80). String ref `WONDERS`. | HIGH |
| 00431C56 | stub | FUN_00431c56 | wonders_set_scroll | `param_1` | void | Sets scroll position and redraws wonders report. | LOW |

### Cluster: Top 5 Cities Report

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00431C73 | medium | FUN_00431c73 | show_top5_cities_dialog | `param_1` | void | Dialog wrapper for Top 5 Cities report. Calls show_credits(7,7,...). Sets up rendering callback at 0x401b45. | MEDIUM |
| 00431D22 | xlarge | FUN_00431d22 | render_power_graph | void | void | Renders the Power Graph (Demographics/Rankings). Creates offscreen surface (0x48 bytes), chart object (0x434 bytes). Draws timeline grid with turn labels (via FUN_00484fec = turn-to-date). Plots power data from `DAT_00655c38[turn*8+civ]` as line segments. Scales Y axis to max value. Shows active + dead civs per DAT_00655b0a/DAT_00655b0c. Uses DAT_00655af0 bit 0x80 for scenario mode (halves turn display). | HIGH |
| 004325C9 | stub | FUN_004325c9 | power_graph_cleanup1 | void | void | SEH cleanup thunk. | LOW |
| 004325D5 | stub | FUN_004325d5 | power_graph_cleanup2 | void | void | Font/resource cleanup wrapper. | LOW |
| 004325E1 | stub | FUN_004325e1 | power_graph_cleanup3 | void | void | Font/resource cleanup wrapper. | LOW |
| 004325ED | stub | FUN_004325ed | power_graph_cleanup4 | void | void | Object destructor (COleCntrFrameWnd -- Ghidra FID misidentification). | LOW |
| 00432603 | stub | FUN_00432603 | power_graph_seh_restore | void | void | SEH epilog. | LOW |

### Cluster: Historians / History Reports

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00432611 | xlarge | FUN_00432611 | show_historians_report | void | void | Historians report with random ranking category. String refs: `HISTORIANS`, `HISTORIES`, `HISTORY`, `HISTORYRANK`. Picks random category (0=gold, 1=militaryUnitCount, 2=tech count, 3=happiness, 4=population). Ranks civs by selected metric. Shows numbered list with civ names. Checks embassy visibility via treaty bit 0x01 and DAT_00655b08 (difficulty). | HIGH |
| 00432BF8 | stub | FUN_00432bf8 | historians_cleanup | void | void | SEH cleanup. | LOW |
| 00432C0E | stub | FUN_00432c0e | historians_seh_restore | void | void | SEH epilog. | LOW |

### Cluster: Top 5 Cities Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00432C1C | xlarge | FUN_00432c1c | render_top5_cities | void | void | Renders Top 5 Cities report. Sorts cities by score = size + happy - unhappy + wonder bonus (10 per wonder in city). Shows top 5 with city sprite (via FUN_0056d289), production bar (FUN_0042d781), wonder icons (FUN_005cef31). Insertion sort into aiStack_7c[5]. | HIGH |
| 00433122 | medium | FUN_00433122 | show_top5_cities_dialog_v2 | `param_1` | void | Another Top 5 Cities dialog wrapper. show_credits(8,8,...). Render callback at 0x401bef. Nearly identical to FUN_00431c73. | MEDIUM |

### Cluster: Demographics Report

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004331D1 | large | FUN_004331d1 | render_demographics_row | `int data_arr, int civ_id, uint y_pos, param_4 (label), int x_start, int x_end` | void | Renders one row of demographics table. Finds rank (1-7) among active civs. Shows rank suffix (0x18A-0x190 = 1st/2nd/3rd etc.). If param_3 < 0, negates values (for "lower is better" stats). Shows leader of top-ranked civ if embassy or god mode. | HIGH |
| 00433434 | xlarge | FUN_00433434 | render_demographics | void | void | Main demographics rendering. Computes 11+ statistics per civ: approval rating, population (via FUN_0043cce5), GNP (gold income), mfg goods (shields), land area (tiles via DAT_00636598 terrain scan), literacy (via FUN_004bd9f0 tech checks for wonders 0x01, 0x58, 0x2b, 0x55), disease rate, pollution (via disease/literacy calcs), family size, military strength (via DAT_0064c706 = militaryUnitCount), productivity (GNP per capita). Each stat rendered via render_demographics_row. Global DAT_006a6550/6554/65a8/65c4/65c8/65cc/65d0/65f8/65fc/6604/659c are city production intermediates from calc_city_production. | HIGH |
| 00434D8A | medium | FUN_00434d8a | show_demographics_dialog | `param_1` | void | Dialog wrapper for demographics. show_credits(9,9,...). Render callback at 0x401cda. | MEDIUM |

### Cluster: Attitude Advisor / Civ Status Report

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00434E39 | xlarge | FUN_00434e39 | render_attitude_advisor | void | void | Renders Attitude Advisor (civ status). Shows citizen icons by category (food/shields/etc via local_58 = 0-8 categories), wonder list, military stats (DAT_00673f5c/58/60/70/74/7c/80/84/88/8c). String refs include format codes 0x193-0x19a. Handles scenario mode (DAT_00655af0 bit 0x80) and space race display (DAT_0064bc60 bit 2). Shows approval rating line with happy/unhappy threshold. | HIGH |
| 00435D15 | medium | FUN_00435d15 | show_attitude_dialog | `param_1` | void | Dialog wrapper for Attitude Advisor. show_credits(10,10,...). Render callback at 0x402428. | MEDIUM |

### Cluster: Hall of Fame / Retirement Screen

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00435DC4 | xlarge | FUN_00435dc4 | render_retirement_score | void | void | Renders retirement/score screen. Calculates civ score from difficulty + max(approval rating, conquest %). Computes fame level (0-23) from `(score * difficulty_factor) / 100` via square formula `i*i/3`. Reads leader gender from DAT_006554fc portrait table. Looks up fame title from MALEFAME/FEMALEFAME sections. Uses bottom-up rendering (local_80 decremented). | HIGH |
| 004361CC | medium | FUN_004361cc | show_score_dialog | `param_1` | void | Score dialog wrapper. show_credits(10,10,...). Additional call to FUN_0046e571(3,0) (music/sound?). | MEDIUM |
| 00436287 | small | FUN_00436287 | check_redraw_trigger | `int param_1` | void | Checks if param_1 matches current active panel (DAT_0063e948 or DAT_0063ef60) and triggers repaint via FUN_005bb574. | LOW |
| 004362E2 | xlarge | FUN_004362e2 | render_hall_of_fame | void | void | Renders Hall of Fame display. Reads 6 entries from DAT_0063f0c8 (72-byte HoF records). Shows leader name from MALEFAME/FEMALEFAME lookup, turn/date display, difficulty level, score, civilization type. Records at stride 0x48. Handles BC/AD date formatting (month lookup 0x1a4+). | HIGH |
| 00436B92 | small | FUN_00436b92 | invalidate_hof_display | void | void | Sets DAT_0063ef6c=1 and invalidates display cache. Likely a "changed" flag setter. | LOW |
| 00436BB7 | large | FUN_00436bb7 | show_hall_of_fame_dialog | `int param_1` | undefined4 | Hall of Fame dialog wrapper. Calls FUN_00436e28 (load HoF). If param_1 >= 0, sets up toolbar buttons. Returns DAT_0063ef6c (selection result). | MEDIUM |
| 00436DD7 | small | FUN_00436dd7 | init_hall_of_fame_records | void | void | Initializes 6 HoF records: sets DAT_0063f0c8 (score) and DAT_0063f0da (fame level) entries to -1 (0xFFFF). | HIGH |
| 00436E28 | medium | FUN_00436e28 | load_hall_of_fame | void | void | Loads Hall of Fame from `HALLFAME.DAT`. Reads 6 records of 72 bytes each. On read failure, reinitializes all records. String ref: `HALLFAME.DAT`. | HIGH |
| 00436ED2 | medium | FUN_00436ed2 | save_hall_of_fame | void | void | Saves Hall of Fame to `HALLFAME.DAT`. Writes 6 records of 72 bytes. String ref for write mode. | HIGH |
| 00436F5A | large | FUN_00436f5a | submit_hall_of_fame_entry | `int param_1` (civ_id) | void | Submits a new HoF entry. Computes score from approval/conquest, difficulty, turn, fame level. Packs entry into DAT_0063eac8..eadc (leader name, civ name, score fields). Inserts into sorted list by fame (DAT_0063f0da). Calls save then show_hall_of_fame_dialog in loop (allows replay). | HIGH |

### Cluster: Civilopedia / Credits System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004371B3 | stub | FUN_004371b3 | credits_wrapper | void | void | Wrapper calling FUN_004371c8. | LOW |
| 004371C8 | stub | FUN_004371c8 | credits_init | void | void | Calls thunk_FUN_00428cb0 (resource initialization?). | LOW |
| 004371E2 | small | FUN_004371e2 | credits_text_pool_init | `param_1` (size) | void | Initializes text pool buffer (FUN_00497ea0) with size param and resets counter DAT_00625ec8=0. | MEDIUM |
| 0043720F | small | FUN_0043720f | credits_text_pool_free | void | void | Frees text pool (FUN_004980ec). | MEDIUM |
| 0043722C | small | FUN_0043722c | credits_add_string | `char *param_1` | int | Adds string to credits text pool. Returns index (DAT_00625ec8++) of added entry. Allocates strlen+1 bytes. | MEDIUM |
| 00437284 | small | FUN_00437284 | credits_get_string | `int param_1` (index) | char* | Gets nth string from packed text pool by scanning null terminators. | MEDIUM |
| 004372CD | medium | FUN_004372cd | credits_load_section | `param_1` (section type) | undefined4 | Loads credits text from file. Switch on section: 0=CREDITS, 1=MPCREDITS (multiplayer), 2=FCREDITS (FW), 3=SCREDITS (scenario). Returns 0 on success, 1 on failure. Reads lines until '@' marker. | HIGH |
| 0043742F | xlarge | FUN_0043742f | render_credits_scroll | `int param_1` (full_redraw) | void | Renders scrolling credits text. Manages 30 (0x1e) text line slots with associated bitmap objects. Handles '^' prefix for bold/header lines. Scrolls by incrementing DAT_00625ecc. Creates per-line bitmaps, caches rendered text. Uses DAT_0063ea28[30] for line index mapping, DAT_0063efb8[30] for bitmap pointers. | MEDIUM |
| 00437A10 | stub | FUN_00437a10 | credits_full_redraw | void | void | Calls render_credits_scroll(1). | LOW |
| 00437A2A | stub | FUN_00437a2a | credits_scroll_next | void | void | Increments DAT_00625ecc and calls render_credits_scroll(0). | LOW |
| 00437A4A | large | FUN_00437a4a | show_credits_dialog | `int param_1` (section) | void | Main credits dialog. Loads credit section via credits_load_section, sets up display loop. For section 3 (scenario): show_credits(10000,...). Cleanup frees all 30 bitmap slots. Optionally starts background music via FUN_005d1f50. | MEDIUM |
| 00437C6F | stub | FUN_00437c6f | credits_invalidate | void | void | Invalidates display cache (CRichEditDoc::InvalidateObjectCache -- Ghidra FID). | LOW |
| 00437C8A | small | FUN_00437c8a | credits_timer_tick | void | void | Timer callback for auto-scrolling credits. If 1200ms (0x4b0) elapsed since _DAT_00625ec0, invalidates and resets timer. | MEDIUM |
| 00437CCD | small | FUN_00437ccd | military_log_set_scroll | `param_1` | void | Sets DAT_0063e958 (scroll offset) and redraws military log. | LOW |

### Cluster: Military Advisor / Combat Log

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 00437CEA | xlarge | FUN_00437cea | render_military_log | void | void | Renders military/combat log. Shows civ government type (0x148+ = govt name string IDs), civ name, leader, turn date. Lists combat events from circular buffer DAT_006af2a0 (stride 0x22=34 bytes per entry, 300 entries, per-civ at stride 0x27d8). Each entry: unit type (short+0), kills x/y coords (short+2/+4), turn (short+6), text (+10). Shows unit sprites via FUN_0056baff. Scrollable with DAT_0063e958. References DAT_006af220/260/280 (log head/tail/count). | HIGH |
| 0043856B | medium | FUN_0043856b | show_military_advisor_dialog | `param_1` (civ_id) | void | Military advisor dialog setup. Creates toolbar, sets render callback at 0x4022cf. show_credits(2,12,...). Stores target civ in DAT_0063e954. | MEDIUM |
| 004386B8 | medium | FUN_004386b8 | military_log_click | `param_1, int param_2` (y_coord) | void | Click handler for military log. Converts y to log entry index, calls FUN_00410402 to center map on combat location (x,y from log entry). | MEDIUM |

### Cluster: Framework / MFC Library Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043C110 | medium | ~CDaoFieldInfo | ~CDaoFieldInfo | this | void | FRAMEWORK. MFC CDaoFieldInfo destructor. Chains 7 sub-destructors (FUN_0043c19c-0043c209). Library match confirmed by Ghidra. | HIGH |
| 0043C19C | stub | FUN_0043c19c | cdao_dtor_step6 | void | void | FRAMEWORK. Sub-destructor in CDaoFieldInfo chain. | HIGH |
| 0043C1AB | stub | FUN_0043c1ab | cdao_dtor_step5 | void | void | FRAMEWORK. Sub-destructor. | HIGH |
| 0043C1BA | stub | FUN_0043c1ba | cdao_dtor_step4 | void | void | FRAMEWORK. Sub-destructor. | HIGH |
| 0043C1C9 | stub | FUN_0043c1c9 | cdao_dtor_step3 | void | void | FRAMEWORK. Sub-destructor. | HIGH |
| 0043C1D8 | stub | FUN_0043c1d8 | cdao_dtor_step2 | void | void | FRAMEWORK. Sub-destructor. | HIGH |
| 0043C1E7 | stub | FUN_0043c1e7 | cdao_dtor_step1 | void | void | FRAMEWORK. Sub-destructor. | HIGH |
| 0043C1F6 | stub | FUN_0043c1f6 | cdao_dtor_step0 | void | void | FRAMEWORK. Destructor via COleCntrFrameWnd (Ghidra FID misidentification). | HIGH |
| 0043C209 | stub | FUN_0043c209 | cdao_seh_restore | void | void | FRAMEWORK. SEH epilog. | HIGH |
| 0043C430 | small | ~_Timevec | ~_Timevec | this | void | FRAMEWORK. CRT _Timevec destructor. Library match. Actually used by game to get text height metrics from font object -- `_Timevec::~_Timevec` is Ghidra FID misidentification for a `get_text_height` method. | HIGH |

### Cluster: UI Helper / Font / Drawing Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043C260 | medium | FUN_0043c260 | ui_dialog_init | void | undefined4* | Initializes a dialog/advisor object. Constructs surface (FUN_005bd630), creates 4 CString-like objects (thunk_FUN_0040f3e0), one rich text object (thunk_FUN_0040fb00). Sets vtable to PTR_FUN_0061c05c. | MEDIUM |
| 0043C3F0 | small | FUN_0043c3f0 | gfx_set_palette | `param_1` | undefined4* | Wrapper: `*in_ECX = FUN_005db140(param_1)`. Sets a GDI palette/color map on an object. | LOW |
| 0043C460 | small | FUN_0043c460 | font_create_2param | `param_1, param_2` | undefined4* | Creates font with 2 params (size, weight). Calls create_font_8200 + gdi_847F for text metrics. Stores font handle and metrics. | MEDIUM |
| 0043C4C0 | small | FUN_0043c4c0 | font_create_3param | `param_1, param_2, param_3` | undefined4* | Creates font with 3 params (size, weight, flags). Same pattern as above. | MEDIUM |
| 0043C520 | small | FUN_0043c520 | font_destroy | void | void | Destroys font if non-null via FUN_005c841d. | MEDIUM |
| 0043C560 | small | GetActiveView | get_surface_ptr_at8 | this | CView* | FRAMEWORK. Returns *(this+8). Ghidra FID: COleClientItem::GetActiveView. Actually returns a surface pointer from object field. | HIGH |
| 0043C590 | small | GetActiveView | get_surface_ptr_at4 | this | CView* | FRAMEWORK. Returns *(this+4). Duplicate FID match. | HIGH |
| 0043C5C0 | small | FUN_0043c5c0 | surface_release | void | void | Releases surface at offset +8 via FUN_005bca3d. | LOW |
| 0043C5F0 | small | FUN_0043c5f0 | window_manage | void | void | Manages window at offset +0x1c if non-null. | LOW |
| 0043C630 | small | FUN_0043c630 | list_disable_sort | void | void | Calls FUN_005bbfee(*(ECX+8), 0) -- disables sorting on a list control. | LOW |
| 0043C660 | small | FUN_0043c660 | list_enable_sort | void | void | Calls FUN_005bbfee(*(ECX+8), 1) -- enables sorting. | LOW |
| 0043C690 | small | FUN_0043c690 | obj_init_null | void | undefined4* | Sets *in_ECX = 0. Simple object field initializer. | LOW |
| 0043C6C0 | small | FUN_0043c6c0 | font_recreate | `param_1, param_2, param_3` | void | Destroys existing font then creates new one with 3 params. | MEDIUM |
| 0043C740 | small | FUN_0043c740 | dialog_destructor | `byte param_1` (flags) | void* | Destructor with optional `operator delete`. Calls FUN_005c656b (dtor chain). | LOW |
| 0043C790 | small | FUN_0043c790 | rect_offset | `LPRECT, int dx, int dy` | void | Wrapper for Win32 `OffsetRect`. | HIGH |
| 0043C7C0 | small | FUN_0043c7c0 | draw_border_rect | `surface, rect*, color` | void | Draws border rectangle. Passes rect fields (x1,y1,x2-1,y2-1) to thunk_FUN_005a98e4 (draw_rect). | MEDIUM |
| 0043C810 | small | FUN_0043c810 | text_append_ordinal_suffix | void | void | Appends ordinal suffix ("st"/"nd"/"rd"/"th") to text buffer DAT_00679640. Wrapper for FUN_004aefd8. | MEDIUM |
| 0043C840 | small | FUN_0043c840 | str_concat | `param_1, param_2` | void | String concatenation wrapper: FUN_005f22e0(dst, src). | LOW |
| 0043C870 | small | FUN_0043c870 | text_append_int | `param_1` (value) | void | Appends integer to text buffer DAT_00679640. Wrapper for FUN_004af284. | MEDIUM |
| 0043C8A0 | small | FUN_0043c8a0 | text_append_gold | `param_1` (amount) | void | Appends gold amount to text buffer. Wrapper for FUN_004af2b9 (likely adds "$" or "gold" suffix). | MEDIUM |
| 0043C8D0 | small | FUN_0043c8d0 | draw_text_at | `text, x, y` | void | Draws text at (x,y) via DAT_006366a8 (current surface/DC). Wrapper for FUN_005baf57. | HIGH |
| 0043C910 | small | FUN_0043c910 | draw_text_centered | `text, x, y, width` | void | Draws text centered within width. Wrapper for FUN_005bb024. | HIGH |
| 0043C950 | small | FUN_0043c950 | draw_text_right_aligned | `text, x, y, width` | void | Draws text right-aligned within width. Wrapper for FUN_005bb0af. | HIGH |
| 0043C990 | small | FUN_0043c990 | dialog_set_slot_value | `param_1, int param_2` (slot index) | void | Sets value at dialog object offset 0x208 + slot*4. Likely sets icon/data slot in advisor dialog. | LOW |
| 0043C9D0 | small | FUN_0043c9d0 | dialog_set_title | `param_1` (title string) | void | Sets dialog title from DAT_006359d4 via FUN_0043ca10. | MEDIUM |
| 0043CA10 | small | FUN_0043ca10 | dialog_create_section | `uint param_1, int param_2` | void | Creates a section in dialog via CSocket::Create (Ghidra FID misidentification -- actually a dialog section creator). | LOW |
| 0043CA50 | small | FUN_0043ca50 | text_append_population | `civ_id, param_2` | void | Appends population value to text buffer. Wrapper for FUN_0043cda6. | MEDIUM |
| 0043CA80 | small | FUN_0043ca80 | text_append_city_name | `param_1` (city_id) | void | Appends city name to text buffer. Wrapper for FUN_0043f444. | MEDIUM |
| 0043CAB0 | small | FUN_0043cab0 | get_civ_background_color | `int param_1` (civ_id) | undefined4 | Returns background color for civ. Looks up leader portrait index (DAT_0064c6a6 + civ*0x594), then color entry from DAT_006554fe -> DAT_00655358[color*0x10]. Barbs (civ 0) use color index 0. | HIGH |
| 0043CB30 | small | FUN_0043cb30 | get_civ_foreground_color | `int param_1` (civ_id) | undefined4 | Returns foreground/text color for civ. Same lookup as above but returns from DAT_00655360[color*0x10] (offset +8 in color struct). | HIGH |
| 0043CBB0 | small | FUN_0043cbb0 | surface_destructor | `byte param_1` | void* | Surface/bitmap destructor with optional delete. Calls FUN_005cde4d. | LOW |

### Cluster: City Data Accessors

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043CC00 | small | FUN_0043cc00 | city_set_civ_knowledge | `int city_id, int civ_id` | void | Sets bit in city visibility bitmask: `city[+0x0C] |= (1 << civ_id)`. Also stores current size in per-civ knowledge: `city[+0x0D+civ_id] = city.size`. | HIGH |
| 0043CC7E | small | FUN_0043cc7e | city_calc_population_points | `int city_id` | int | Calculates population points: sum of 1..size (triangular number). Returns max(result, 1). This is the "population in thousands" formula: size 1=1, 2=3, 3=6, etc. | HIGH |
| 0043CCE5 | medium | FUN_0043cce5 | civ_calc_total_population | `int civ_id` | int | Sums city_calc_population_points for all cities owned by civ_id. Clamps to [1, 32000]. | HIGH |
| 0043CDA6 | medium | FUN_0043cda6 | format_population_string | `buf, civ_id, param_3` | void | Formats population as "X,000" string. If param_3 < 0, calculates via civ_calc_total_population. Handles hundreds digit with leading zero. String ref `,000`. | HIGH |
| 0043CE5A | medium | FUN_0043ce5a | format_city_population_string | `buf, city_id` | void | Formats single city population. Same pattern as above using city_calc_population_points. String ref `,000`. | HIGH |
| 0043CEF9 | small | FUN_0043cef9 | city_count_content_citizens | `int city_id` | uint | Counts content citizens. Starts with bit 0x04 of city flags (+0x07). If DAT_0064bc60 bit 4 set, adds 1 for each wonder in city (scanning DAT_00655be6). This is the base content count before happiness modifiers. | MEDIUM |
| 0043CF76 | medium | FUN_0043cf76 | find_city_at | `int x, int y` | int | Finds city at coordinates (x,y). Validates tile exists and continent >= 0. Iterates city slots matching x,y. Returns city index or -1. | HIGH |
| 0043D07A | large | FUN_0043d07a | find_nearest_city | `x, y, continent, owner, ally_owner` | int | Finds nearest city matching filters: owner (param_3), continent (param_4), or coastal flag (param_4 == -2 checks building 0x22 = coastal). Uses FUN_005ae31d (tile distance). Stores distance in DAT_0063f660. Returns city index or -1. | HIGH |
| 0043D20A | medium | FUN_0043d20a | has_building | `int city_id, int building_id` | undefined4 | Checks if city has a specific building/improvement. Converts building_id to byte/bit offset via FUN_005ae3bf, tests bit in city improvement bitmask at city+0x34. **Already documented** as known function. Returns 0 or 1. | HIGH |
| 0043D289 | medium | FUN_0043d289 | set_building | `int city_id, int building_id, int add_or_remove` | void | Sets or clears building in city improvement bitmask. If param_3 == 0, clears bit; else sets bit. Same byte/bit conversion as has_building. | HIGH |
| 0043D348 | small | FUN_0043d348 | city_has_supply_commodity | `int city_id, int commodity_id` | undefined4 | Checks if city supplies commodity. Scans supply_commodities[3] at city+0x3B. Returns 1 if found, 0 otherwise. | HIGH |
| 0043D3A4 | small | FUN_0043d3a4 | city_has_demand_commodity | `int city_id, int commodity_id` | undefined4 | Checks if city demands commodity. Scans demand_commodities[3] at city+0x3E. Returns 1 if found. | HIGH |

### Cluster: AI City Site Evaluation (Trade Route Calculation)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043D400 | xlarge | FUN_0043d400 | calc_city_trade_desirability | `uint city_id` | void | **Massive AI function** (8227 bytes). Calculates trade route desirability scores for a city. Examines 21 surrounding tiles (0x15 = city radius), counting terrain types in local_128[11] array. Computes 16 supply desirability values (DAT_0063f668[16]) and 16 demand desirability values (DAT_0063f540[16]) for all 16 trade commodities. Factors include: terrain composition, city size, tech level (local_8c = civ tech count), distance from center, era/government, specific buildings (0x09=harbor, 0x13=factory, etc.), wonders. Sorts by desirability and assigns top 3 supply commodities to city+0x3B and top 3 demand to city+0x3E. Also assigns initial trade route commodity (city+0x3F). Handles existing trade route exclusions. Only runs for human cities with visibility flag, god mode, or every 16th turn. | HIGH |

### Cluster: City Name Generation & Tile Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0043F444 | small | FUN_0043f444 | format_city_name_or_none | `buf, int city_id` | void | If city_id < 0, appends string 0x0E ("None"?). Otherwise appends city name from city+0x20. | MEDIUM |
| 0043F493 | large | FUN_0043f493 | assign_city_name | `int city_id` | void | Assigns a name to a new city. Reads leader portrait index to find city name list. Increments name counter (DAT_006554fd). Looks up name in CITY.TXT or fallback file (DAT_0064bb08/DAT_00655020 directories). Handles `@EXTRA` sections for overflow names. Copies max 15 chars to city+0x20 (name field). | HIGH |
| 0043F7A7 | medium | FUN_0043f7a7 | city_update_tile_workers | `int city_id` | void | Updates tile worker assignments around city. Scans 45 tiles (0x2D = full city radius + buffer). Calls FUN_005b9c49 to assign workers. Handles river bonus, special resources via FUN_005b8c18. | MEDIUM |
| 0043F8B0 | xlarge | create_city | create_city | `int x, int y, int owner` | int | **Already documented.** Creates a new city. Finds free slot, initializes all 88 city bytes. Assigns name (FUN_0043f493), initial production (best defensive unit), updates tile visibility, trade routes (FUN_0043d400), worker tiles (FUN_0043f7a7). Sets city ID from monotonic counter DAT_00627fdc. For AI cities founded late (turn > 40), scales initial size. Handles multiplayer synchronization (DAT_00655b02 > 2). Returns city slot index or -1 on failure. String refs: `TOOMANYCITIES`, `SERVERCONNECTTIME`. | HIGH |

---

## SUMMARY

### 1. Total functions in file
**79 functions**

### 2. Breakdown by category

| Category | Count | Percentage |
|----------|-------|-----------|
| Advisor UI / Reports | 27 | 34% |
| City Data / Game Logic | 13 | 16% |
| AI Logic (trade routes) | 1 | 1% |
| Hall of Fame / Scoring | 9 | 11% |
| Credits / Civilopedia | 12 | 15% |
| UI Helpers (drawing/font/text) | 9 | 11% |
| Framework / MFC / CRT | 8 | 10% |

### 3. Top 5 most important undocumented functions

1. **FUN_0043d400 (calc_city_trade_desirability)** -- 8227 bytes. The largest function in the file. Computes all 16 trade commodity supply/demand desirability scores for a city based on terrain, tech, buildings, government, wonders, distance, and city size. Assigns the top 3 supply and demand commodities. This is the core trade route AI that determines what commodities each city offers and wants.

2. **FUN_00433434 (render_demographics)** -- 6486 bytes. Computes and displays all 11 demographics categories (approval rating, population, GNP, manufacturing, land area, literacy, disease, pollution, family size, military strength, productivity). Uses intermediate globals from calc_city_production.

3. **FUN_004308ae (show_foreign_advisor)** -- 3218 bytes. The complete Foreign Advisor dialog with diplomacy parley system, treaty display, intelligence access, and multiplayer negotiation protocol. Contains the diplomatic interaction state machine.

4. **FUN_00434e39 (render_attitude_advisor)** -- 3769 bytes. Attitude Advisor rendering showing citizen breakdown, wonders, military stats, approval/conquest percentages, and space race status for scenario mode.

5. **FUN_00431d22 (render_power_graph)** -- 2183 bytes. The Power Graph chart renderer that plots per-civ power data over time with scaled axes, civ-colored lines, and turn labels.

### 4. New DAT_ globals identified with high confidence

| Global | Type | Description | Confidence |
|--------|------|-------------|------------|
| DAT_0063ef6c | int | Current civ ID for active advisor/report dialog | HIGH |
| DAT_0063efac | int | Target civ ID for intelligence/foreign advisor | HIGH |
| DAT_0063ef70 | int | Scroll position (item offset) for scrollable lists | HIGH |
| DAT_0063ef74 | int | Items per page (visible rows) in scrollable lists | HIGH |
| DAT_0063ef80 | int | Row height in pixels for scrollable lists | HIGH |
| _DAT_0063ef78 | int | Y coordinate of first data row in scrollable list | HIGH |
| _DAT_0063ef7c | int | Available height for scrollable list content | HIGH |
| _DAT_0063ef68 | int | Total pages in scrollable list | MEDIUM |
| DAT_00625ec4 | int | Dirty flag for advisor dialogs (1 = needs redraw) | HIGH |
| _DAT_00625ec0 | int | Timestamp of last UI update (from FUN_00421bb0 = GetTickCount) | HIGH |
| DAT_00625ec8 | int | Credits text pool string count | MEDIUM |
| DAT_00625ecc | int | Credits scroll line offset | MEDIUM |
| DAT_00625ed0 | int | Credits display fits in window flag | MEDIUM |
| DAT_0063f278 | int | Diplomacy parley response state (-1=none, 0=refused, 1=accepted) | HIGH |
| DAT_0063f660 | int | find_nearest_city result distance (scratch global) | HIGH |
| DAT_006366a8 | ptr | Current drawing surface/DC handle for text rendering | HIGH |
| DAT_0063e954 | int | Military advisor target civ ID | MEDIUM |
| DAT_0063e958 | int | Military log scroll offset | MEDIUM |
| DAT_0063e95c | int | Military log visible rows count | MEDIUM |
| DAT_0063e960 | int | Military log first data row Y coordinate | MEDIUM |
| DAT_0063e968 | int | Military log row height (0x18 = 24px) | MEDIUM |
| DAT_006af2a0 | struct[] | Combat log entries (per-civ ring buffer, 300 entries x 34 bytes, stride 0x27d8 per civ) | HIGH |
| DAT_006af220 | int[8] | Combat log entry count per civ | MEDIUM |
| DAT_006af260 | int[8] | Combat log head pointer per civ | MEDIUM |
| DAT_006af280 | int[8] | Combat log tail pointer per civ | MEDIUM |
| DAT_0063f0c8 | struct[6] | Hall of Fame records (6 x 72 bytes = 432 bytes total) | HIGH |
| DAT_00655be6 | short[28] | Wonder-to-city mapping (city index per wonder, -1 = not built) | HIGH |
| DAT_0063ec34 | int | Dialog content area left X coordinate | MEDIUM |
| DAT_0063ec38 | int | Dialog content area top Y coordinate | MEDIUM |
| DAT_0063ec3c | int | Dialog content area width | MEDIUM |
| DAT_0063f668 | int[16] | Trade commodity supply desirability scores (per city, 16 commodities) | HIGH |
| DAT_0063f540 | int[16] | Trade commodity demand desirability scores (per city, 16 commodities) | HIGH |
| DAT_00673f58-8c | int[] | Civ status/attitude advisor intermediate values (military units, approval, etc.) | MEDIUM |
| DAT_0063ea18 | int | Calculated civ score (for retirement/HoF) | MEDIUM |
| DAT_0063e4ec | int | Fame level (0-23) for retirement screen | MEDIUM |
