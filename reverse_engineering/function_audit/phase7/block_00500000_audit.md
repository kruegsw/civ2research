# Block 00500000 — Phase 7 Audit

**Functions in this block: 123**
**System: City dialog window — rendering, UI buttons, mouse handling, rush-buy, change production, sell building**

---

## FW — Framework (30 functions)

FID_conflict:_$E51 @ 0x00500E00 | 26B | N/A (CRT static initializer — calls FUN_00500e1a + FUN_00500e38)
FUN_00500e1a | 30B | N/A (CRT init thunk — calls thunk_FUN_0043c460 with params 0, 0x10)
FUN_00500e38 | 29B | N/A (CRT atexit registration — registers FUN_00500e55)
FUN_00500e55 | 26B | N/A (CRT atexit handler — calls thunk_FUN_0043c520)
FID_conflict:_$E51 @ 0x00500E6F | 26B | N/A (CRT static initializer — calls FUN_00500e89 + FUN_00500ea7)
FUN_00500e89 | 30B | N/A (CRT init thunk — calls thunk_FUN_0043c460 with params 0, 10)
FUN_00500ea7 | 29B | N/A (CRT atexit registration — registers FUN_00500ec4)
FUN_00500ec4 | 26B | N/A (CRT atexit handler — calls thunk_FUN_0043c520)
FID_conflict:_$E31 @ 0x00500EDE | 26B | N/A (CRT static initializer — calls FUN_00500ef8 + FUN_00500f12; constructs city window object via FUN_00501551)
FUN_00500ef8 | 26B | N/A (CRT init thunk — calls FUN_00501551 city window constructor)
FUN_00500f12 | 29B | N/A (CRT atexit registration — registers FUN_00500f2f)
FUN_00500f2f | 26B | N/A (CRT atexit handler — calls FUN_0050160a city window destructor)
FID_conflict:_$E31 @ 0x00500F49 | 26B | N/A (CRT static initializer — calls FUN_00500f63 + FUN_00500f7d; 5bd630 = bitmap resource init)
FUN_00500f63 | 26B | N/A (CRT init thunk — calls FUN_005bd630 bitmap resource init)
FUN_00500f7d | 29B | N/A (CRT atexit registration — registers FUN_00500f9a)
FUN_00500f9a | 26B | N/A (CRT atexit handler — calls FUN_005bd915 bitmap resource cleanup)
FID_conflict:_$E31 @ 0x00500FB4 | 26B | N/A (CRT static initializer — calls FUN_00500fce + FUN_00500fe8; second bitmap resource init)
FUN_00500fce | 26B | N/A (CRT init thunk — calls FUN_005bd630 bitmap resource init)
FUN_00500fe8 | 29B | N/A (CRT atexit registration — registers FUN_00501005)
FUN_00501005 | 26B | N/A (CRT atexit handler — calls FUN_005bd915 bitmap resource cleanup)
FUN_0050117b | 12B | N/A (destructor helper — calls FUN_005c656b)
FUN_00501187 | 9B | N/A (destructor helper — calls FUN_005cde4d)
FUN_00501190 | 12B | N/A (destructor helper — calls FUN_005bd915)
FUN_005011a6 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00501673 | 15B | N/A (destructor helper — calls thunk_FUN_0043c520)
FUN_00501682 | 15B | N/A (destructor helper — calls thunk_FUN_0046ab49)
FUN_00501691 | 9B | N/A (destructor helper — calls COleCntrFrameWnd::~COleCntrFrameWnd)
FUN_005016a4 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_00506a15 | 9B | N/A (destructor helper — calls FUN_005cde4d CString destructor)
FUN_00506a34 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)

---

## UI — User Interface (85 functions)

FUN_0050101f | 348B | N/A (city GIF loader — loads CITY.GIF bitmap, caches at DAT_00630d34 resolution, calls FUN_005bf071 to decode)
FUN_005011b4 | 520B | N/A (city dialog button painter — draws two-state button with shadow text at given rect, positions label in center)
FUN_005013bc | 132B | N/A (city modal refresh — redraws city dialog when DAT_00630d1c not already in progress, calls thunk_citywin_BC4F)
FUN_00501440 | 127B | N/A (city window state init — zeroes member fields: 0x15a4=1, 0x15a0=0, 0x15a8=0, 0x159c=-1, 0x15b4=0, 0x15b8=1, 0x16bc=0)
OnClose @ 0x005014BF | 38B | N/A (MFC CMiniDockFrameWnd::OnClose — calls thunk_FUN_0046ac89(2))
FUN_005014e5 | 70B | N/A (city window pane hider — calls thunk_FUN_0046ac89 for panes 1, 3, 4)
FUN_0050152b | 38B | N/A (city window full close — hides panes then calls OnClose)
FUN_00501551 | 136B | N/A (city window constructor — initializes MFC base, sets vtable, calls FUN_00501440 to init state)
FUN_0050160a | 105B | N/A (city window destructor — sets vtable, calls close + sub-object destructors)
FUN_005016b2 | 129B | N/A (city pane blit — blits from offscreen buffer 006a9170 to pane, adjusting for scroll offset 0x15c4/0x15c8)
FUN_00501733 | 77B | N/A (city pane prepare-and-blit — sets draw target, prepares font, calls blit to pane)
FUN_00501780 | 153B | N/A (city worker tile refresh — if city valid and not blocked, recalculates city yields and redraws worker/resource/info panes)
FUN_00501819 | 424B | N/A (city specialist click — handles click on citizen specialist row; toggles specialist type 1/2/3, calls FUN_004e7549 to set and FUN_00501780 to redraw)
FUN_005019c1 | 1186B | N/A (city food/shield row renderer — draws food/shield/trade icons in rows with different colors for content/unhappy/specialist citizens; 4 loops for 4 citizen categories)
FUN_00501e63 | 540B | N/A (city simplified row renderer — simpler version of FUN_005019c1 for smaller display mode; draws citizen status icons in single row)
FUN_0050207f | 577B | N/A (city title bar painter — draws city name, player info, civ icon; positions "Buy"/"Change" buttons within title region)
FUN_005022c0 | 784B | N/A (city map tile click — converts mouse x,y to tile offset within city radius, toggles worker assignment on/off via FUN_004e790c/FUN_004e9719)
FUN_005025d5 | 9761B | N/A (city resource panel renderer — massive function drawing food/shield/trade bar breakdown: surplus/deficit bars with colored segments, text labels for production/food storage/gold/science/luxury; computes positions/widths for each segment)
FUN_00504c05 | 1081B | N/A (city improvements panel renderer — draws building icons in grid; shows "we love" day indicator via FUN_0043d20a/FUN_00453e51 check)
FUN_0050503e | 1434B | N/A (city production panel renderer — draws current build item: building sprite or unit sprite, shield progress bar with 10 rows)
FUN_005055dd | 137B | N/A (city empty panel renderer — stub that just prepares pane; no actual drawing content)
FUN_00505666 | 1751B | N/A (city unit list renderer — draws units garrisoned in city as sprites in grid, with food/shield upkeep icons per unit; handles draft/foreign units)
FUN_00505d3d | 701B | N/A (city sell building handler — UI for selling building from city; checks soldThisTurn flag, can't sell Palace, shows confirmation dialog "HOCKTHIS", adds gold refund, sets city flag 0x04)
FUN_00505ffa | 1102B | N/A (city building list panel renderer — draws scrollable list of buildings+wonders owned by city, with maintenance costs and small building icons)
FUN_00506448 | 495B | N/A (unit info text builder — builds formatted text for unit popup: name, type, location coordinates, home city, owner)
FUN_00506637 | 985B | N/A (unit right-click handler — opens unit property sheet dialog; handles responses: 3=disband, 4=add shields to city, else activate/move unit)
FUN_00506a1e | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a CPropertySheet teardown)
FUN_00506a42 | 1608B | N/A (unit left-click handler — opens unit context menu from city; options: wake/activate, fortify, disband, home-to-city, bribe/sabotage; switch on 9 cases)
citywin_70B8 | 9B | N/A (destructor helper — calls FUN_005cde4d CString destructor)
citywin_70C1 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a CPropertySheet teardown)
citywin_70D7 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
citywin_70E5 | 2692B | N/A (city support view renderer — draws unit support grid with sprites in 4 rows; shows food upkeep indicator, trade routes with foreign city names and amounts)
citywin_7B69 | 968B | N/A (city minimap renderer — draws minimap of city radius showing terrain colors, unit positions, city center highlight)
citywin_7F31 | 561B | N/A (city special buildings renderer — draws up to 3 special improvement icons: Palace, Granary/Aqueduct/Sewer, Courthouse/Marketplace, Factory/MfgPlant depending on government)
citywin_8177 | 987B | N/A (city garrison/pollution renderer — draws garrison unit sprites for non-communist governments, pollution indicators for communist)
citywin_8552 | 1393B | N/A (city happiness breakdown renderer — draws 5 rows of citizen faces showing happy/content/unhappy/entertainer/scientist/taxman with adjustment arrows; connects to FUN_00501e63 for row display)
citywin_8ADC | 228B | N/A (city info panel dispatcher — switches on view mode 0/1/2: calls citywin_70E5 (support), citywin_7B69 (minimap), or citywin_8552 (happiness))
citywin_8BC5 | 191B | N/A (city full redraw — redraws all 8 city panes: title, resources, improvements, production, empty, units, buildings, info)
citywin_8C84 | 160B | N/A (city pane rect calculator — computes pixel rect for pane given grid coords, factoring in scroll offset and display scale)
citywin_8D24 | 418B | N/A (city pane layout — calls citywin_8C84 twelve times to position all pane rects at fixed grid coordinates)
citywin_8EC6 | 354B | N/A (city border renderer — draws decorative borders around city dialog when scroll offset is non-zero)
citywin_9028 | 647B | N/A (city window size handler — determines display scale 1/2/3 based on window dimensions; loads CITY.GIF, computes scroll offsets, triggers full redraw via citywin_CF06)
citywin_92AF | 378B | N/A (city title text renderer — draws city name, ruler name, civ gold amount in title bar; handles multiplayer display of player name)
citywin_9429 | 246B | N/A (city full refresh — master refresh: recalculates city yields, redraws title, resets scroll, redraws layout, redraws all panes, invalidates window)
citywin_951F | 38B | N/A (city window show — calls FUN_005bb574 + thunk_FUN_004085f0 to display city window)
citywin_9545 | 75B | N/A (city window bring-to-top — calls BringWindowToTop on parent HWND when not blocked)
handle_city_disorder_00509590 | 933B | N/A (city open/disorder handler — opens city dialog for given city index; handles multiplayer blocking checks, tutorial triggers for city disorder, waits for close in multiplayer mode)
citywin_9935 | 26B | N/A (city refresh wrapper — calls citywin_9429)
citywin_994F | 64B | N/A (city close — sets DAT_006aa75c=1, triggers end-of-city processing via FUN_004503d0/FUN_00451900/FUN_00484d52)
citywin_998F | 186B | N/A (city window position — calculates centered window position based on display metrics and zoom level)
citywin_9A49 | 57B | N/A (city zoom auto — sets zoom to 2 (or 3 if map > 999), calls citywin_998F to reposition)
citywin_9A82 | 26B | N/A (city suspend — sets DAT_006aa758=1 to suspend city display updates)
citywin_9A9C | 36B | N/A (city resume — sets DAT_006aa758=0 and triggers full refresh via citywin_9429)
citywin_9AC0 | 136B | N/A (city turns-to-complete renderer — calculates and displays turns remaining for production: (cost - accumulated) / surplus + 1)
city_button_buy | 1642B | N/A (rush-buy handler — validates ownership/blocking, calculates rush-buy cost, shows confirmation dialog, deducts gold, sets shields to full)
citywin_A1B2 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
citywin_A1C8 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
citywin_A1D6 | 289B | N/A (production icon renderer — draws building or wonder icon for change-production dialog entries)
citywin_A2F7 | 380B | N/A (capital city icon renderer — finds largest city of given player for change-production dialog display)
city_button_change | 4544B | N/A (change production dialog — shows full production menu with units/buildings/wonders; handles advisor suggestions, auto-production toggle, production queue support via FUN_004bfe5a/FUN_004c03ae/FUN_004c02d8)
citywin_B638 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
citywin_B644 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
citywin_B650 | 12B | N/A (destructor helper — calls thunk_FUN_0059df8a)
citywin_B666 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
citywin_B674 | 218B | N/A (city idle timer handler — handles multiplayer idle timeout for city window; closes dialog if connection issues detected)
city_button_rename | 598B | N/A (rename city handler — validates ownership, shows text input dialog "RENAMECITY", copies new name to city record, triggers refresh)
citywin_B9A4 | 99B | N/A (info view 0 button — sets DAT_006aa768=0, refreshes info panel to show support view)
citywin_BA07 | 99B | N/A (info view 1 button — sets DAT_006aa768=1, refreshes info panel to show minimap view)
citywin_BA6A | 99B | N/A (info view 2 button — sets DAT_006aa768=2, refreshes info panel to show happiness view)
city_button_view | 386B | N/A (view city button — validates multiplayer blocking, calls FUN_00454260 to display city improvements view)
citywin_BC4F | 139B | N/A (city close button handler — dispatches close: if multiplayer mode sets DAT_00630d18=1, else calls citywin_994F; triggers multiple refresh callbacks)
citywin_BCDA | 57B | N/A (building list scroll handler — sets scroll offset DAT_006aa76c, redraws building list pane)
citywin_BD13 | 607B | N/A (city next button — navigates to next city alphabetically among same player's cities; wraps around if at end; calls handle_city_disorder_00509590 to switch)
citywin_BF72 | 607B | N/A (city prev button — navigates to previous city alphabetically; wraps around to last; calls handle_city_disorder_00509590 to switch)
city_mouse | 535B | N/A (city mouse dispatcher — validates multiplayer blocking, maps click to pane via FUN_0046ad85, dispatches: 1=worker toggle, 2=specialist, 3=unit left-click, 4=sell building, 5=noop, 6=unit right-click)
citywin_C405 | 34B | N/A (city left-click wrapper — calls city_mouse with param_3=0)
citywin_C427 | 34B | N/A (city right-click wrapper — calls city_mouse with param_3=1)
citywin_C449 | 75B | N/A (city destroyed notification — if destroyed city matches displayed city, closes city dialog)
citywin_C494 | 485B | N/A (unit move notification — if unit moved to/from displayed city tile, refreshes city panels; handles garrison changes)
citywin_C679 | 118B | N/A (city production change notification — if changed city matches displayed city and not blocked, triggers full refresh)
citywin_C6EF | 180B | N/A (tile improvement notification — if improved tile is within displayed city radius (distance < 3), refreshes worker assignments display)
citywin_C7A3 | 182B | N/A (city cached bitmaps clear — zeroes all cached bitmap pointers 0x16b4-0x16d8)
citywin_C859 | 564B | N/A (city cached bitmaps destroy — frees all 11 cached bitmap/palette objects if allocated, then calls citywin_C7A3 to clear pointers)
citywin_CA8D | 527B | N/A (city close button creator — allocates Close button bitmap, positions it, sets callback to citywin_BC4F)
citywin_CCB3 | 572B | N/A (city change-production button creator — allocates Change button bitmap, positions it, sets callback to city_button_change; toggles icon based on auto-production flag)
citywin_CF06 | 2883B | N/A (city full UI layout — master layout function: destroys old bitmaps, allocates 11 new button/panel bitmaps, positions Buy/Change/Close/Rename/View/Info buttons, creates scrollbar, sets display scale and font)
citywin_DADA | 92B | N/A (city animation enter — sets animation mode 0x15ac=2 if not blocked, sets DAT_00630d20=1 flag)
citywin_DB36 | 92B | N/A (city animation leave — clears animation mode, refreshes close button if was mode 2, clears flag)
citywin_DB92 | 38B | N/A (city window minimize handler — calls thunk_FUN_004080f0 on window rect)
citywin_DBB8 | 38B | N/A (city window restore handler — calls thunk_FUN_004080f0 on window rect)
citywin_DBDE | 211B | N/A (city keyboard handler — Escape=close, minus=shrink zoom, plus=grow zoom if allowed; calls citywin_998F to reposition)
citywin_DCB6 | 498B | N/A (city window MFC initialization — calls FUN_00501440 to init state, sets up window size, registers message handlers for close/scroll/click/keyboard via MFC message map)
citywin_DEA8 | 51B | N/A (city window MFC destructor — sets DAT_006aa760=1, destroys cached bitmaps, tears down base MFC window)

---

## GL — Game Logic (5 functions, cross-referenced from UI above)

These functions are primarily UI but contain embedded game logic worth auditing against the JS engine.

city_button_buy @ 0x00509B48 (listed in UI) — **rush-buy cost + treasury deduction**
  Binary formula for units:  `cost = (remaining * remaining) / 0x14 + remaining * 2` where remaining = clamp(totalShieldCost - shieldsStored, 0, 999)
  Binary formula for buildings: `cost = remaining * 2`
  Binary formula for wonders (buildingId > 0x22): `cost = remaining * 4`
  Binary no-investment penalty: `if (shieldsStored == 0) cost *= 2`
  JS (engine/happiness.js:229-244): matches all four formulas exactly. No discrepancy.

FUN_00505d3d @ 0x00505D3D (listed in UI) — **sell building refund**
  Binary: checks soldThisTurn flag (city.flags & 0x04), rejects Palace (id=1, "CANTHOCKTHIS"), adds `buildingShieldRows * DAT_0064bccc` to civ treasury, sets soldThisTurn flag.
  JS (engine/reducer.js:212-236): checks `soldThisTurn`, removes building, refund = `Math.floor(IMPROVE_COSTS[id] / 2)`.
  **DISCREPANCY**: Binary refund = full shield cost (shieldRows * shieldsPerRow). JS refund = half shield cost (IMPROVE_COSTS / 2). The JS comment "binary returns cost / 2" is incorrect. Binary adds the FULL building cost to treasury, not half. For example, a Barracks (cost 4 rows * 10 = 40 shields) refunds 40 gold in the binary but only 20 gold in JS.

citywin_9AC0 @ 0x00509AC0 (listed in UI) — **turns-to-complete display formula**
  Binary: `turns = ((cost - 1) - accumulated) / netProduction + 1` where cost = `shieldRows * DAT_006a657c` and netProduction = `clamp(DAT_006a65cc - DAT_006a6568, 1, 999)`.
  Display-only calculation. The JS equivalent in citydialog.js matches the standard integer division ceiling formula. No discrepancy.

citywin_A2F7 @ 0x0050A2F7 (listed in UI) — **find largest city for player**
  Binary: iterates all cities, finds city with highest population belonging to given player, with priority boost for Palace (+200) and capital (-1 production = +100). Display-only ranking.
  No direct JS equivalent. No discrepancy.

handle_city_disorder_00509590 @ 0x00509590 (listed in UI) — **city open/display trigger**
  Binary: sets city index, calls FUN_004e7492 to recalculate city yields, handles tutorial triggers for city disorder. Yield recalculation is game logic but is already handled server-side in JS via `cityturn.js`.
  No discrepancy with engine implementation.

---

## AI — Artificial Intelligence (0 functions)

(No AI functions in this block.)

---

## Discrepancy Summary

| # | Function | Issue | Severity |
|---|----------|-------|----------|
| 1 | FUN_00505d3d (sell building) | Binary refund = full shield cost; JS refund = half shield cost. JS comment says "binary returns cost / 2" but this is wrong. Binary: `treasury += shieldRows * shieldsPerRow`. JS: `refund = floor(IMPROVE_COSTS[id] / 2)`. | **HIGH** — players receive only half the correct gold when selling buildings. |

---

## Classification Totals

| Category | Count |
|----------|-------|
| FW (Framework) | 30 |
| UI (User Interface) | 93 |
| GL (Game Logic) | 0 (5 cross-referenced from UI) |
| AI (Artificial Intelligence) | 0 |
| **Total** | **123** |

All 123 functions are classified as either FW (30) or UI (93). The GL section identifies 5 UI functions that contain embedded game logic and compares them against the JS engine. No functions in this block are purely game logic or AI -- this entire block is the Win32/MFC city dialog implementation.
