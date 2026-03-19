# Block 00570000 -- Phase 7 Audit

**Functions in this block: 122**
**System: Terrain/Icon bitmap randomization, color editor UI, dialog system, CBitmapButton helpers, OLE/stream helpers, combat core (defense calculation, best defender, city capture, unit kill/promote, combat animation, nuke strike), attack resolution plumbing**

---

## UI -- User Interface: Bitmap Randomization (21 functions)

FUN_0057075c | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_00570772 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00570780 | 2082B | N/A (randomize_terrain1_bmp — randomizes TERRAIN1.BMP/GIF pixel colors for visual variety; loads bitmap, iterates 11 terrain type columns × 3 color variants, applies random palette shifts via FUN_00417f70/FUN_004bb540/FUN_004a6980, then writes modified bitmap back; handles 9 additional bottom-row terrain variants)
FUN_00570fa2 | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_00570fb8 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00570fc6 | 2342B | N/A (randomize_terrain2_bmp — randomizes TERRAIN2.BMP/GIF; similar to FUN_00570780 but for TERRAIN2 with 16 terrain overlays in 8×2 grid, 4 road variants, 8 river direction pairs; writes back modified bitmap)
FUN_005718ec | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_00571902 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00571910 | 666B | N/A (randomize_icons_bmp — randomizes ICONS.BMP/GIF improvement sprites; iterates 4 rows × 5 columns of 0x15-pixel-tall sprites, applies random color shifts)
FUN_00571baa | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_00571bc0 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00571bce | 1175B | N/A (randomize_icons2_bmp — randomizes ICONS.BMP additional sections; handles 38 unit-type icons in 8-column grid, 28 building icons in 7-column grid, 1 special icon at (199,0x100), and 8 wonder icons)
FUN_00572065 | 12B | N/A (SEH destructor thunk — calls FUN_005c656b)
FUN_0057207b | 14B | N/A (SEH epilog — restores FS:[0])

---

## UI -- User Interface: Color/Palette Editor (20 functions)

FUN_00572089 | 546B | N/A (dialog_create_with_palette — creates a dialog window with optional palette bar, scrollbar, and custom rendering callback; sets up DAT_006ac2e4 title, configures window flags 0x202/0x802 based on params)
FUN_005722ab | 185B | N/A (color_editor_apply — applies color changes from editor; copies front/back buffers, updates display, calls callback if set)
FUN_00572364 | 37B | N/A (color_editor_cancel — cancels color edit; clears dirty flag, invalidates display)
FUN_00572389 | 101B | N/A (color_editor_reset — resets color editor to defaults; clears selected region, restores original palette values)
FUN_005723ee | 556B | N/A (color_editor_update_swatches — updates the 4 color swatch displays (primary, secondary, detail, alternate) with current palette selections; renders 0x20×0x20 pixel blocks with color fills)
FUN_0057261a | 294B | N/A (color_editor_draw_palette_cell — draws a single palette cell at computed grid position; highlights selected foreground/background colors with different border widths)
FUN_00572740 | 147B | N/A (color_editor_hit_test — converts mouse x,y to palette grid index 0-14; validates bounds against 0x24×0x26 cell grid, returns -1 for miss)
FUN_005727d8 | 135B | N/A (color_editor_clear_canvas — clears the color editor drawing canvas; switches on editor mode 1/2/5/7/8/10/11 to select appropriate bitmap surface)
FUN_00572887 | 1295B | N/A (color_editor_paint_pixel — paints a single pixel or pixel group on the color canvas; handles 3 zoom modes: mode 0 = 1:1 pixel, mode 1 = 4:1 with 3-pixel cross, mode 2 = 8:1 with 4-pixel cross; fills surrounding border pixels)
FUN_00572da0 | 607B | N/A (color_editor_draw_grid — draws the pixel editing grid with crosshair indicator; renders horizontal/vertical grid lines in color 0x6a, highlights current pixel position with 10-pixel shadow lines and 0x29-color accent lines)
FUN_00572fff | 2685B | N/A (color_editor_mouse_click — handles mouse click on color editor; 15-case switch for toolbar buttons: 0/12=set palette colors, 1=brush mode, 2=fill mode, 3=swap front/back colors, 4=reset, 5=default palette, 6=swap fg/bg, 7=rotate 3 colors, 8=show message dialog, 9-11=zoom 1x/2x/4x, 13=no-op, 14=palette grid click with shift state; handles canvas painting in modes 0-3)
FUN_00573adc | 9B | N/A (SEH cleanup — calls FUN_005cde4d; CString destructor)
FUN_00573aef | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00573afd | 32B | N/A (color_editor_mouse_release — clears drag flag, calls ReleaseCapture)
FUN_00573b1d | 813B | N/A (color_editor_mouse_move — handles mouse drag in color editor; in brush mode draws interpolated line between previous and current positions, in fill mode paints single pixels; updates cursor shape based on mode)
FUN_00573e59 | 947B | N/A (color_editor_keyboard — handles keyboard input in color editor; arrow keys move cursor, +/- adjust brightness, various letter keys trigger mode changes; accesses DAT_006ac878/87c for canvas dimensions)
FUN_0057420c | 12B | N/A (SEH destructor thunk)
FUN_00574218 | 9B | N/A (SEH cleanup — calls FUN_005cde4d)
FUN_0057422b | 14B | N/A (SEH epilog — restores FS:[0])
FUN_00574239 | 745B | N/A (color_editor_refresh — refreshes the entire color editor display; redraws palette grid, canvas area, color swatches, grid lines; handles all 3 zoom levels)

---

## UI -- User Interface: Dialog System (10 functions)

FUN_00574522 | 356B | N/A (dialog_draw_scrollbar — draws a custom scrollbar on dialog; computes thumb position from item count and current scroll offset, renders track and thumb)
FUN_00574686 | 27B | N/A (dialog_get_result — returns dialog result value from DAT_006ac88c)
FUN_005746a1 | 1362B | N/A (dialog_list_keyboard — handles keyboard navigation in dialog list; Page Up/Down/Home/End/arrow keys for scrolling, Enter/Escape for accept/cancel; handles edit field input for rename operations)
FUN_00574c47 | 95B | N/A (dialog_scroll_handler — handles scroll wheel/button events; increments/decrements scroll position within bounds)
FUN_00574ca6 | 498B | N/A (dialog_list_click — handles mouse click on dialog list items; computes clicked item index from y-position, handles checkbox toggle, updates selection, scrolls if needed)
FUN_00574e98 | 184B | N/A (dialog_list_double_click — handles double-click on dialog list; selects item and triggers accept action)
FUN_00574f50 | 3562B | N/A (dialog_draw_items — master dialog item renderer; draws list items with icons, checkboxes, text labels; handles columns, truncation, highlighting selected item; supports unit/building/tech icon types via thunk_FUN_00452c14)
FUN_00575d89 | 59B | N/A (dialog_on_timer — timer callback for dialog animations; decrements counter, triggers redraw)
FUN_00575dc4 | 40B | N/A (dialog_on_idle — idle handler; checks DAT_006ac8a0 flag, calls dialog_draw_items if dirty)
FUN_00575dec | 1121B | N/A (dialog_draw_header — draws dialog header with title text, optional icon, close button; handles multi-line titles with word wrapping)

---

## UI -- User Interface: Show MessageBox (5 functions)

FUN_0057624d | 26B | N/A (show_messagebox_init — pushes frame for message box; calls thunk_FUN_0043c690 CFont constructor)
show_messagebox_6267 | 1303B | N/A (show_messagebox — creates and displays a modal message box dialog; supports configurable button count, icon, title, body text with word wrapping; handles keyboard shortcuts and default button)
FUN_005767a7 | 12B | N/A (SEH destructor thunk — message box cleanup)
FUN_005767b3 | 12B | N/A (SEH destructor thunk)
FUN_005767c9 | 14B | N/A (SEH epilog — restores FS:[0])

---

## UI -- User Interface: CBitmapButton / OLE Helpers (17 functions)

~CBitmapButton@0x00578390 | 114B | N/A (CBitmapButton destructor — MFC button class destructor)
FUN_00578402 | 15B | N/A (CBitmapButton accessor — returns +0xC member)
FUN_00578411 | 15B | N/A (CBitmapButton accessor — returns +0x10 member)
FUN_00578420 | 15B | N/A (CBitmapButton accessor — returns +0x14 member)
FUN_0057842f | 15B | N/A (CBitmapButton accessor — returns +0x18 member)
FUN_0057843e | 9B | N/A (CBitmapButton accessor — returns +0x1C member)
FUN_00578451 | 14B | N/A (CBitmapButton accessor — returns +0x20 member)
FUN_005784a0 | 164B | N/A (bitmap_button_create — creates a bitmap-backed button control; loads bitmap resource, configures owner-draw style)
precision@0x005785D0 | 45B | N/A (iostream precision — sets stream precision value)
width@0x00578610 | 45B | N/A (iostream width — sets stream width value)
FUN_00578650 | 60B | N/A (stream_helper — stream manipulation helper)
Reset@0x0057868C | 42B | N/A (stream reset — resets stream state)
FUN_005786b6 | 59B | N/A (stream_seekg — stream seek-get helper)
FUN_005786f1 | 108B | N/A (stream_read_block — reads a block from stream)
FUN_00578770 | 77B | N/A (stream_write_block — writes a block to stream)
FUN_005787bd | 9B | N/A (stream_accessor — returns stream member)
FUN_005787d0 | 14B | N/A (stream_accessor — returns stream member)

---

## UI -- User Interface: OLE Stream / Save/Load Helpers (14 functions)

FUN_005787de | 98B | N/A (ole_read_int — reads 4-byte integer from OLE stream)
FUN_00578840 | 105B | N/A (ole_write_int — writes 4-byte integer to OLE stream)
FUN_005788a9 | 121B | N/A (ole_read_short — reads 2-byte short from OLE stream)
FUN_00578922 | 136B | N/A (ole_write_short — writes 2-byte short to OLE stream)
FUN_005789aa | 114B | N/A (ole_read_byte — reads 1-byte from OLE stream)
FUN_00578a1c | 156B | N/A (ole_write_byte — writes 1-byte to OLE stream)
FUN_00578abd | 73B | N/A (ole_read_string_fixed — reads fixed-length string from stream)
FUN_00578b06 | 268B | N/A (ole_write_string_fixed — writes fixed-length string to stream with padding)
FUN_00578c12 | 371B | N/A (ole_read_cstring — reads length-prefixed CString from OLE stream)
FUN_00578d8a | 94B | N/A (ole_write_cstring — writes CString to OLE stream with length prefix)
FUN_00578de8 | 80B | N/A (ole_read_buffer — reads raw bytes from stream into buffer)
FUN_00578e38 | 40B | N/A (ole_write_buffer — writes raw bytes from buffer to stream)
FUN_00578e60 | 103B | N/A (ole_read_rect — reads 4 integers (RECT) from stream)
FUN_00578ec7 | 101B | N/A (ole_write_rect — writes 4 integers (RECT) to stream)

---

## UI -- User Interface: Scenario/Map OLE Save/Load (7 functions)

FUN_00578f2c | 686B | N/A (scenario_save_to_stream — serializes scenario data to OLE stream; writes header, map dimensions, terrain array, city/unit/civ data blocks)
FUN_005791df | 129B | N/A (scenario_read_header — reads scenario header from stream; validates magic number, version)
FUN_00579260 | 129B | N/A (scenario_write_header — writes scenario header to stream)
FUN_005792e1 | 194B | N/A (scenario_read_map_dims — reads map width/height from stream, validates against maximums)
FUN_005793a3 | 106B | N/A (scenario_write_map_dims — writes map dimensions to stream)
FUN_0057940d | 194B | N/A (scenario_read_block — reads a data block (cities/units/improvements) from stream with size header)
FUN_005794cf | 111B | N/A (scenario_write_block — writes a data block to stream with size header)

---

## UI -- User Interface: More OLE/Dialog Helpers (8 functions)

FUN_0057953e | 155B | N/A (scenario_validate_block — validates loaded data block against expected size; returns 0 on mismatch)
FUN_005799c0 | 41B | N/A (dialog_get_int_field — reads integer value from dialog edit control)
FUN_00579a00 | 50B | N/A (dialog_set_int_field — sets integer value in dialog edit control)
FUN_00579a40 | 46B | N/A (dialog_get_text_field — reads text from dialog edit control)
FUN_00579a80 | 50B | N/A (dialog_set_text_field — sets text in dialog edit control)
FUN_00579ac0 | 50B | N/A (dialog_enable_control — enables/disables a dialog control)
FUN_00579b00 | 50B | N/A (dialog_show_control — shows/hides a dialog control)
FUN_00579b40 | 59B | N/A (dialog_set_check — sets checkbox state in dialog)

---

## UI -- User Interface: Pre-combat Helpers (4 functions)

FUN_00579b90 | 27B | N/A (get_difficulty_index — returns DAT_00655b09 difficulty level index)
EnableStackedTabs@0x00579BF0 | 36B | N/A (MFC CPropertySheet wrapper — calls CPropertySheet::EnableStackedTabs)
FUN_00579bf0 | 52B | N/A (combat_setup_init — initializes combat setup variables; clears pending combat state)
FUN_00579c40 | 379B | N/A (combat_check_treaties — checks treaty status between two combatant civs; handles ceasefire/peace violation detection, sets WAR flag, updates attitude via FUN_00456f20. Called from FUN_00580341 combat resolution. **PARTIAL PORT**: The treaty violation detection (ceasefire break → sneak attack ×2, peace break → attitude −50) is partially in JS combat.js via the sneakAttack/treatyViolation opts but the actual treaty flag mutation (setting WAR_STARTED, WAR_TRACKING bits) is handled in JS diplomacy.js `diploStartWar`.)

---

## GL -- Game Logic: Combat Pre-checks (2 functions)

FUN_00579dbb | 277B | N/A (combat_check_borders — pre-combat border and zone-of-control check; validates attacker can reach defender tile, checks for ZOC violations. **NOT PORTED**: JS movement.js handles ZOC but this specific pre-combat validation with the 0x0d param check for diplomat intervention is not in JS.)
FUN_00579ed0 | 933B | N/A (combat_diplomat_intercept — checks if a diplomat/spy at the target tile intercepts the attack; iterates defender's stack for diplomat types, shows USEWEAPONS/BATTERY dialog for SDI defense. If SDI building (0x11) is within 4 tiles, it intercepts missile attacks. **PARTIAL PORT**: The SDI Defense intercept is in JS combat.js `calcUnitDefenseStrength` as a ×2 defense multiplier, but the binary's version actually intercepts and CANCELS the attack entirely (returns 0 to abort combat). The diplomat/spy intercept mechanic is not in JS at all.)

---

## GL -- Game Logic: City Capture & Civil War (4 functions)

FUN_0057a27a | 999B | N/A (civil_war_check — checks if a civ should undergo civil war after losing a city; evaluates government type, number of cities, era differential. **PORTED**: JS citycapture.js `handleCivilWar` is ported from this function's logic.)
FUN_0057a661 | 12B | N/A (SEH destructor thunk — calls FUN_0059df8a)
FUN_0057a677 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_0057a685 | 356B | N/A (civil_war_execute_split — executes civil war by splitting cities between original and rebel civ; assigns cities to rebel based on distance from capital. **PORTED**: JS citycapture.js `handleCivilWar` includes this split logic.)

---

## GL -- Game Logic: City Capture Core (2 functions)

FUN_0057a7e9 | 283B | N/A (city_capture_prepare — pre-capture city preparation; handles defender unit disbanding, updates unit stack visibility. **PORTED**: Equivalent logic exists in JS citycapture.js `handleCityCapture`.)
FUN_0057a904 | 3291B | N/A (city_capture_post — **NOT AUDITED SEPARATELY**, see FUN_0057b5df. This is the civil war execution function that splits a civ after capital loss. Creates new civ with createNewCiv equivalent, distributes cities by distance, transfers units, generates partisans. **PORTED**: JS citycapture.js `handleCivilWar`.)

---

## GL -- Game Logic: City Capture Master (1 function)

FUN_0057b5df | 11451B | N/A (handle_city_capture — **CRITICAL**: Master city capture function (11.4KB). Handles: (1) population reduction, (2) building destruction with 0xAA random bitmask (50% chance per building except always-destroyed set), (3) tech stealing, (4) reveal map intel sharing, (5) unit disbanding/reassignment, (6) production reset to best available unit, (7) partisan spawning (checks Guerrilla Warfare tech, government type, difficulty), (8) civil war trigger, (9) city rename, (10) wonder capture notifications, (11) alliance notification cascade, (12) treaty flag updates (WAR, VENDETTA, CAPTURE_NOTIFY). **PORTED**: JS citycapture.js `handleCityCapture` is the port. **DISCREPANCIES**:
- Binary always destroys buildings 1(Palace), 4(Temple), 7(Courthouse), 11(Cathedral) unconditionally, then applies 0xAA random mask to remaining buildings. JS ALWAYS_DESTROYED_ON_CAPTURE matches (1,4,7,11).
- Binary partisan count formula: `((citySize+5)>>3) × (govtDiff + eraDiff + 1) / 2` with additional modifiers for Communism/Democracy techs. JS implementation should match but should be verified.
- Binary checks for `thunk_FUN_004bfe5a` (can_build_unit) before assigning production to best available unit type. JS may default differently.
- Binary sets `(&DAT_0064f34a)[cityIdx*0x58]` (city_previous_owner) and `(&DAT_0064f34b)[cityIdx*0x58]` (capture_turn) — JS should store equivalent fields.)

---

## GL -- Game Logic: Combat Defense Calculation (3 functions)

FUN_0057e29f | 12B | N/A (SEH destructor thunk — calls FUN_0059df8a)
FUN_0057e2b5 | 14B | N/A (SEH epilog — restores FS:[0])
FUN_0057e2c3 | 119B | N/A (calc_unit_attack_strength — calculates raw attack value for a unit: `unit_attack_stat × 8`, then +50% if veteran flag (0x2000) set, then +50% if flag 0x10 (fortified?) set. **PORTED**: JS combat.js `resolveCombat` computes `effAtk = atkBase * 8; if (attacker.veteran) effAtk += Math.floor(effAtk / 2)`. **DISCREPANCY**: Binary applies a second +50% for flag 0x10 on the unit record — this appears to be the "commando/elite" bonus. JS does not apply this second +50%. This flag 0x10 on unit record at offset 0x14 (unit_flags & 0x10) is distinct from the veteran flag (0x2000). JS may be missing an "elite/promoted" bonus tier.)

---

## GL -- Game Logic: Defense Strength (FUN_0057e33a) — CRITICAL COMPARISON

FUN_0057e33a | 931B | combat.js `calcUnitDefenseStrength` — Calculates unit defense strength with all terrain/building modifiers. Binary flow:
1. Gets defender position (x,y), looks up terrain type via FUN_005b89bb → DAT_006acb30
2. Gets city at position via FUN_0043cf76 → DAT_006acb08
3. Base defense = `(river_bit + terrain_defense_table[terrain]) × unit_defense_stat × 4`
4. Fortification: if unit order == 2 (fortified) AND domain == ground → mult becomes 3 (×1.5)
5. Fortress: if tile has fortress bit 0x42==0x40 → mult becomes 4 (×2). But if attacker is air domain AND NOT missile → fortress ignored (mult stays at 2)
6. City Walls: if in city AND city has walls(8) or Great Wall wonder → mult for ground defenders gets ×3 applied. Checks attacker domain: walls only help ground defenders vs ground attackers. But if attacker has `flagsB & 0x10` (air domain) AND attacker has `flagsB & 0x10` bit → different path.
   - Actually: walls check has a special case: if defender is air domain AND attacker is air domain with missile flag → defense gets ×2 from SAM, not walls.
7. Coastal Fortress (building 0x1b=27): ×2 if attacker domain is air AND defender is ground
   - Wait: re-reading — the binary checks `city_has_building(cityIdx, 8)` for walls, then a complex sequence for SAM(27) and Coastal Fortress(28)
8. SAM Battery (building 0x1b=27): ×2 if attacker domain == air
9. SDI Defense (building 0x11=17): ×2 if attacker flagsB & 0x10 (missile) AND attack < 99
10. Veteran: +50% at end
11. Final: `defense × mult / 2` (since mult starts at 2, dividing by 2 normalizes)

**PORTED**: JS `calcUnitDefenseStrength` implements all of these. **DISCREPANCIES**:
- **Fortress vs Air**: Binary explicitly checks `if attacker domain == air AND NOT missile → fortress bonus is NOT applied`. JS checks `if (attackerType == null || attackerType < 0 || atkDomain !== 1)` which correctly skips fortress for air attackers. MATCH.
- **City Walls domain check**: Binary applies walls ×3 only for `defender domain == ground`. JS checks `defDomain === 0`. MATCH.
- **Walls vs attacker domain**: Binary applies walls only when `attacker domain == ground` (domain 0). JS checks `atkDomain === 0`. MATCH.
- **SAM Battery**: Binary multiplier is ×2 applied as `DAT_006acb34 = DAT_006acb34 << 1` within the mult accumulator. JS does `defense *= 2`. Equivalent.
- **Coastal Fortress**: Binary checks attacker domain == sea (2) AND defender domain != sea. JS checks same. MATCH.
- **SDI**: Binary checks `flagsB & 0x10` (missile flag) AND `attack < 99`. JS uses `UNIT_DESTROYED_AFTER_ATTACK.has(attackerType) && UNIT_ATK[attackerType] < 99`. MATCH (UNIT_DESTROYED_AFTER_ATTACK corresponds to flagsB 0x10).
- **Veteran placement**: Binary applies veteran after all multipliers. JS applies veteran last. MATCH.
- **MINOR DISCREPANCY**: Binary's mult accumulator system (`mult starts at 2, various operations multiply it, then defense = defense * mult / 2` at end) versus JS's inline multiplication approach. Both produce the same result mathematically.

---

## GL -- Game Logic: Best Defender Selection (FUN_0057e6e2) — CRITICAL COMPARISON

FUN_0057e6e2 | 786B | combat.js `calcStackBestDefender` — Finds best defending unit on a tile against an attacker.
Binary flow:
1. Gets tile terrain, city at tile
2. Iterates all units on tile via linked list (FUN_005b2d39 → FUN_005b2c82)
3. Skips ground units on ocean (terrain 10 + domain 0)
4. For each unit: calls FUN_0057e33a to get defense score
5. HP weighting: `score = (currentHP × score) / maxHP` when game_flags & 0x10
6. Pikeman bonus (flagsB & 0x04): `score += 1` (tiebreaker only)
7. Anti-air bonus (flagsB & 0x20): if attacker is air domain:
   - vs missile (flagsB & 0x10): `score *= 5`
   - vs non-missile air: `score *= 3`
8. Submarine bonus (flagsB & 0x10 on defender + attacker domain sea): NOT FOUND in this function — the submarine ×2 bonus appears to be in the combat resolution, not defender selection.
   Actually re-reading: binary checks `if defender flagsA & 0x10 (submarine?) AND attacker is air domain → score ×2`. This is the aegis/submarine detection check.
9. Takes unit with highest score (>= comparison, so last-in wins ties)

**PORTED**: JS `calcStackBestDefender` implements this. **DISCREPANCIES**:
- **HP weighting**: Binary only applies HP ratio when `game_flags & 0x10` (DAT_00655ae8). JS always applies HP weighting. **DISCREPANCY**: JS should gate HP weighting on the game flags bit 0x10 but currently always does it. In standard Civ2, this flag is typically set, so the behavior matches for normal games.
- **Submarine bonus in defender selection**: Binary has a check for `flagsA & 0x10 (submarine flag) AND attacker domain == air → score ×2` which appears to be an aegis-vs-sub interaction. JS has `UNIT_SUBMARINE.has(u.type) && atkDomain === 2 → score *= 2` which checks attacker domain == SEA (2) not AIR (1). **DISCREPANCY**: JS checks `atkDomain === 2` (sea) but binary checks attacker domain == air (1). This may be a misinterpretation — need to verify which domain the binary actually tests.
- **City walls in score**: The binary's FUN_0057e33a is called with param_2=0 (no terrain re-lookup) inside the iterator, meaning it uses the already-set DAT_006acb08/DAT_006acb30 values. JS calls the full calcUnitDefenseStrength which is correct.
- **Sea defense in city**: Binary has an additional check: if defender is sea domain AND in city AND city has building 0x1b (Coastal Fortress) AND attacker is ground → score ×2. But this is already handled inside FUN_0057e33a. MATCH.

---

## GL -- Game Logic: Unit Kill/Death/Promotion (4 functions)

FUN_0057e9f9 | 411B | N/A (kill_unit_in_combat — handles unit death from combat; increments kill counter, plays death animation (FUN_0059c575 for local player, 0x64 network msg for remote), increments DAT_006acb0c multi-kill counter, calls FUN_005b4391 to actually remove unit. **PORTED**: JS reducer handles unit removal after combat.)
FUN_0057eb94 | 105B | N/A (kill_all_units_on_tile — kills entire stack of units at a position; iterates linked list via FUN_005b2d39, calls FUN_0057e9f9 for each. **PORTED**: JS reducer handles stack kills in citycapture scenarios.)
FUN_0057ebfd | 322B | N/A (promote_unit_veteran — promotes a unit to veteran status; sets flag 0x2000 on unit, shows PROMOTED dialog to owner, sends network message 0x20. Only promotes if not already veteran and not a missile (flagsB & 0x10). **PORTED**: JS combat.js `resolveCombat` handles veteran promotion with same checks.)
FUN_0057ed3f | 2281B | N/A (combat_animation_display — displays combat animation at a position; manages multi-player viewport synchronization, creates sprite surfaces for attacker/defender, plays 8-frame animation loop with 64ms timing, handles sound effects for unit type categories (land/sea/air/siege). **UI ONLY**: No game logic to port.)

---

## GL -- Game Logic: Combat Support (5 functions)

FUN_0057f628 | 22B | N/A (SEH cleanup — _eh_vector_destructor for combat animation surfaces)
FUN_0057f648 | 15B | N/A (SEH epilog — restores FS:[0])
FUN_0057f657 | 885B | N/A (nuke_strike_animation — nuclear strike animation; displays mushroom cloud with 11-frame animation, 100ms per frame, 5.5s pre-delay when DETAILED_NUKE flag set. **UI ONLY**: No game logic; JS has `ANIMATION_FLAGS.DETAILED_NUKE` constant.)
FUN_0057f9e3 | 1236B | N/A (nuke_strike_execute — executes nuclear strike effects on target tile; shows USEWEAPONS dialog, checks for SDI defense (building 0x11) within 4 tiles to intercept, plays nuke animation, kills all units in 9-tile radius, sets irradiation and treaty flags. **PARTIAL PORT**: JS nuclear.js handles nuke strike mechanics but the SDI within-4-tiles intercept check may differ. Binary iterates all cities to find any with SDI within distance 4.)
FUN_0057febc | 1084B | N/A (post_combat_retaliation — after winning combat, checks if defending civ has units nearby that should counterattack or move to retake position; searches for settler/engineer units that can reach the tile (within DAT_0064bcdb range), assigns goto orders. Also checks for land units with flagsB & 0x01 (can_settle) that should flee to nearest city. **NOT PORTED**: This AI retaliation/flee behavior after combat loss is not in JS.)

---

## Summary

| Category | Count |
|----------|-------|
| GL (Game Logic) | 19 |
| UI (User Interface) | 97 |
| FW (Framework) | 6 |
| **Total** | **122** |

### Critical Combat Discrepancies (Block 0x0057)

1. **FUN_0057e2c3 (attack strength)**: Binary applies a second +50% bonus for unit flag 0x10 (appears to be an "elite" or secondary promotion flag). JS `resolveCombat` only applies the veteran +50%. If this flag 0x10 corresponds to the "commando" status or a double-promotion, attacks would be 50% higher in the binary for elite units.

2. **FUN_0057e6e2 (best defender)**: HP weighting is gated on `game_flags & 0x10` in binary but always applied in JS. Also, the submarine/aegis ×2 score multiplier checks different attacker domains (binary: air domain=1, JS: sea domain=2) — this needs verification.

3. **FUN_00579ed0 (diplomat intercept)**: Binary can CANCEL combat entirely if a diplomat/spy intercepts or SDI defense is within 4 tiles. JS only applies SDI as a ×2 defense multiplier, never cancels combat. Diplomat intercept is missing entirely.

4. **FUN_0057febc (post-combat retaliation)**: AI counterattack/flee behavior after losing combat is not ported to JS.

5. **FUN_00579c40 (treaty check)**: Treaty violation handling is split between JS combat.js (sneakAttack flag) and diplomacy.js (diploStartWar). The binary's integrated approach sets specific bit patterns (WAR_STARTED, WAR_TRACKING) that should be verified against the JS implementation.
