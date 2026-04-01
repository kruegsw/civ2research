# Complete Callee Reference — All Functions Called by Init Chain

Every function called by the 207 traced init-chain functions, traced to
dead ends or recycle loops.

Source of truth: `reverse_engineering/decompiled/block_*.c`

Status: IN PROGRESS — tracing all 958 untraced callees.

---

## Memory Management (DEAD ENDS — terminate at Win32 API stubs)

```
FUN_004bb870(size) → FUN_005dce4f(size) → GlobalAlloc(0x42, size)     LEAF: extern-stubs.js
FUN_0046aad0(handle) → FUN_005dcdf9(handle) → GlobalLock(handle)      LEAF: extern-stubs.js
FUN_0046ab00(handle) → FUN_005dce29(handle) → GlobalUnlock(handle)    LEAF: extern-stubs.js
FUN_0046aaa0(handle) → FUN_005dce96(handle) → GlobalFree(handle)      LEAF: extern-stubs.js
```

Note: FUN_0046aad0 and FUN_0046ab00 have void return in Ghidra but actually
return values. FUN_005dcdf9 returns the pointer, FUN_005dce29 returns 0.

## Error Handler (DEAD END — calls _exit(3))

```
FUN_00589ef8(errCode, module, context, data1, data2)  — 209 bytes
  ├── FUN_005f22d0(dest, src) — strcpy
  ├── __itoa(val, buf, radix) — int to string (CRT)
  ├── __ltoa(val, buf, radix) — long to string (CRT)
  ├── FUN_00589fc9(buf, filename, lineNum) — 278 bytes
  │   ├── FUN_0041508c(filename, mode) — fopen wrapper
  │   ├── _fgets, _fclose, _strlen — CRT
  │   └── FUN_005f22d0 — strcpy
  └── FUN_0058a0ee(errStr, modStr, data1Str, data2Str) — 778 bytes
      ├── FUN_005f22d0 / FUN_005f22e0 — strcpy / strcat
      ├── _sprintf — CRT
      ├── OutputDebugStringA — Win32 (extern-stubs.js)
      ├── debug_log — console output
      ├── FUN_00589dc5(filename) — write warn0.dat file
      ├── DAT_006acbd0[] callback array — registered error handlers
      ├── DebugBreak() — Win32 (extern-stubs.js)
      └── _exit(3) — CRT, TERMINATES PROCESS
```

## Tile Cleanup (mirrors FUN_005b7fe0)

```
FUN_005b8416() — 488 bytes — deallocate tile memory
  ├── FUN_0046ab00 → GlobalUnlock    LEAF
  ├── FUN_0046aaa0 → GlobalFree      LEAF
  └── Uses raw 0x6365a0 (same inline address bug as FUN_005b7fe0)
```

## String Functions (DEAD ENDS — CRT leaves)

```
FUN_005f22d0(dest, src) — strcpy equivalent
FUN_005f22e0(dest, src) — strcat equivalent
FUN_005f35f0() — unknown CRT init
FUN_005d23bb(fmt, ...) — sprintf wrapper
FUN_005d2279(fmt, ...) — debug sprintf
```

## Tiny Wrapper Functions (174 functions, all < 30 bytes)

These are simple pass-through wrappers. Each calls exactly one function.
Grouped by what they wrap:

### UI/Display wrappers (no game state)
```
FUN_00407ff0() → FUN_005bbbce()                    display refresh
FUN_0040bbb0() → FUN_004aef20(&DAT_00679640)       text buffer clear
FUN_0040bed1() → FUN_0040c7d0()                    UI update
FUN_0040f25f() → FUN_0040f570()                    MFC destructor
FUN_0040f286() → FUN_0040fbb0()                    MFC destructor
FUN_0040f295() → FUN_0040fbb0()                    MFC destructor
FUN_0040f2a4() → FUN_0040fbb0()                    MFC destructor
FUN_0040f5c3() → FUN_0040f510()                    MFC init
FUN_0040fe10() → FUN_004aef36(&DAT_00679640)       text buffer op
FUN_0040fe40() → FUN_004aefb7(&DAT_00679640)       text buffer op
FUN_0040fe70() → FUN_004aeff9(&DAT_00679640)       text buffer op
FUN_0040fea0() → FUN_004af01a(&DAT_00679640)       text buffer op
FUN_0040fed0() → FUN_004af03b(&DAT_00679640)       text buffer op
FUN_00410070(p) → FUN_00493d13(p)                   get civ name
FUN_004102d5() → FUN_0059df8a()                    SEH cleanup
FUN_004102e1() — FS_OFFSET restore                  SEH cleanup
```

### Rect/coordinate accessors
```
FUN_00407f90(p) → return p[2] - p[0]               rect width
FUN_00407fc0(p) → return *(p+0xc) - *(p+4)         rect height
```

### Complete tiny function listing (174 functions)

**50 SEH cleanup** — `*FS_OFFSET = *(EBP - 0xc)`. Exception handler frame restore.
No game logic. Dead ends. All follow the pattern:
```c
void FUN_xxx(void) { *unaff_FS_OFFSET = *(unaff_EBP + -0xc); }
```
Functions: FUN_0040f26e, FUN_0040f2b3, FUN_0040f2c6, FUN_0040f5d6, FUN_004102f4,
FUN_00419962, FUN_0041b480, FUN_0041d408, FUN_0041e7d4, FUN_0041eedc, FUN_0041f690,
FUN_0042021d, FUN_0042414b, FUN_0042abb1, FUN_004325ed, FUN_00432603, FUN_00432c0e,
FUN_004547b6, FUN_004547ce, FUN_004547e6, FUN_004547fe, FUN_00454816, FUN_0045482e,
FUN_0045489b, FUN_00470589, FUN_004705c9, FUN_00471357, FUN_00471517, FUN_00471557,
FUN_0047debe, FUN_0047ded1, FUN_0048c9e4, FUN_0048d99f, FUN_00493eeb, FUN_00493f01,
FUN_0049445e, FUN_004944ad, FUN_00514f08, FUN_00515197, FUN_005151e6, FUN_0051598b,
FUN_0051d62c, FUN_0051d74e, FUN_0051dd88, FUN_0051e9fd, FUN_0051f10b, FUN_0055c68f,
FUN_0057a677, FUN_0058d434, FUN_0059ade1

**107 simple wrappers** — call one function and return. Pass-throughs.
Examples:
```
FUN_0040bbb0() → FUN_004aef20(&DAT_00679640)       text buffer clear
FUN_00407ff0() → FUN_005bbbce()                     display refresh
FUN_00419b80() → FUN_005bbb32()                     GDI drain messages
FUN_00421bb0() → FUN_005d41e0()                     GetTickCount wrapper
FUN_004102d5() → FUN_0059df8a()                     SEH teardown
FUN_0046ab00(p) → FUN_005dce29(p)                   GlobalUnlock wrapper
FUN_00410070(p) → FUN_00493d13(p)                   get civ leader name
FUN_00484d3b() → DAT_00628044 = 0                   set game-over flag
```

**2 accessors** — return computed value:
```
FUN_00407f90(p) → return p[2] - p[0]               rect width
FUN_00407fc0(p) → return *(p+0xc) - *(p+4)         rect height
```

**5 setters** — write one DAT_ value:
```
FUN_00421da0(i, v) → DAT_0063cc30[i*4] = v         set message param
FUN_0051d7bc() → DAT_00631ed8 = 0                  clear dialog flag
FUN_0059d3b1(v) → DAT_006359c0 = v                 set display param
FUN_0059d3c9(v) → DAT_006359c4 = v                 set display param
FUN_00484d3b() → DAT_00628044 = 0                   game-over flag
```

**5 no-ops** — `return;` with no side effects (empty bodies or early returns)

**1 MFC** — `CRichEditDoc::InvalidateObjectCache` call

---

## GAME Functions (595 total, IN PROGRESS)

These are functions ≥ 30 bytes that contain game logic or non-trivial operations.
Tracing each from C source, following callees to dead ends or recycle loops.

### Tracing progress

| Block | Total | Traced | Remaining |
|-------|-------|--------|-----------|
| 040   | 80    | 0      | 80        |
| 041   | 60    | 0      | 60        |
| 042   | 39    | 0      | 39        |
| 043   | 48    | 0      | 48        |
| 044   | 14    | 0      | 14        |
| 045   | 40    | 0      | 40        |
| 046   | 41    | 0      | 41        |
| 047   | 33    | 0      | 33        |
| 048   | 16    | 0      | 16        |
| 049   | 37    | 0      | 37        |
| 04A   | 19    | 0      | 19        |
| 04B   | 17    | 0      | 17        |
| 04C   | 8     | 0      | 8         |
| 04D   | 2     | 0      | 2         |
| 04E   | 1     | 0      | 1         |
| 04F   | 10    | 0      | 10        |
| 051   | 22    | 0      | 22        |
| 052   | 9     | 0      | 9         |
| 053   | 5     | 0      | 5         |
| 054   | 6     | 0      | 6         |
| 055   | 31    | 0      | 31        |
| 056   | 25    | 0      | 25        |
| 057   | 28    | 0      | 28        |
| 058   | 8     | 0      | 8         |
| 059   | 51    | 0      | 51        |
| 05A   | 8     | 0      | 8         |
| 05B   | 54    | 0      | 54        |
| 061   | 2     | 0      | 2         |

### Block 005B — COMPLETE (53 functions, all leaf/dead-end)

**Tile mutators** (all same pattern: modify byte, network broadcast if MP):
- FUN_005b94fc (330B): set/clear improvement flags — byte 1 `|= mask` or `&= ~mask`
- FUN_005b9646 (295B): set terrain type — byte 0 `= (*ptr & 0xF0) | terrain`
- FUN_005b98b7 (305B): set fertility — byte 5 `= (ptr[5] & 0xF0) | (val & 0xF)`
- FUN_005b99e8 (333B): set city owner — byte 5 `= (ptr[5] & 0x0F) | (val << 4)`
- FUN_005b9b35 (276B): set body/continent ID — byte 3 `= val`
- FUN_005b9c49 (traced): set claiming civ — byte 2 upper 3 bits
- FUN_005b976d (traced): set visibility — byte 4 `|= mask` or `&= ~mask`
- FUN_005b8b1a (75B): update per-civ improvement snapshot
- FUN_005b8bac (108B): set/clear per-civ visibility bit

**Unit operations** (all leaf — callees already traced):
- FUN_005b3863 (60B): refresh unit position — wrapper → FUN_005b36df(unit, unit.x, unit.y)
- FUN_005b389f (577B): move unit to bottom of stack — relink via FUN_005b2cc3
- FUN_005b3ae0 (152B): move entire stack to new position
- FUN_005b5bab (488B): load unit onto transport
- FUN_005b633f (271B): check if unit ready to move (alive + has movement + not fortified)
- FUN_005b6512 (629B): find nearest moveable unit (3-pass search)
- FUN_005b67af (233B): find nearest unit of specific civ

**Map utilities** (all leaf):
- FUN_005b9431 (78B): check continent has feature (bit lookup in DAT_00666137)
- FUN_005b8d15 (77B): get city ID with fortress flag check
- FUN_005bad40 (135B): parse binary string to int
- FUN_005badf0 (145B): build file path (dir + "\\" + filename)
- FUN_005baeb0/5baec8/5baee0: display dimension setters (24-68B each)

**Graphics/rendering** (dead ends — no game state mutations):
- FUN_005bbb32 (40B): drain Windows message queue + GdiFlush
- FUN_005bbbce (52B): process palette messages via PeekMessage
- FUN_005bf071 (1353B): load GIF sprite from DLL resource
- FUN_005bf5e1 (847B): load GIF from resource (alternate path)
- FUN_005baf57/5bb024/5bb0af (131-205B): text rendering with shadow/centering
- FUN_005bb3f0/5bb4ae/5bb574 (74-119B): palette/sprite setup
- FUN_005bc3f1-5bd915 (25-325B): various sprite/color operations

### Block 00400000 — COMPLETE (101 functions)

**Map generation helpers** (game logic — all LEAF):
- FUN_00408873 (144B): fill tile rectangular region with terrain value
- FUN_00408903 (73B): copy one byte per tile (stride 6) between arrays
- FUN_0040894c (51B): display refresh + network check
- FUN_0040897f (948B): **build continent scoring table** — per-continent
  terrain quality in DAT_00666132[continent * 0x10]
- FUN_0040ac5a (1242B): **body/continent ID assignment** — flood-fill
  after map generation to number each landmass
- FUN_0040a763/a824/a8db/a92f/aaa4 (84-373B): continent random walk
  functions (traced in init_call_chain.md under map gen)
- FUN_0040ab41 (281B): island placement helper

**MFC/Window wrappers** (45+ functions, all display-only — dead ends):
- FUN_00408010-004086c0: window property get/set via in_ECX pointer
- FUN_0040c480 (848B): window management
- FUN_0040c7d0 (1428B): map/sidebar rendering
- FUN_0040cd64 (4140B): MFC main window creation
- FUN_0040beec/0040c07f/0040c212 (403B each): MFC dialog variants
- FUN_0040c3cd (179B): MFC class factory

**Text parameter wrappers** (display — dead ends):
- FUN_0040ff60 (46B): set dialog parameter `FUN_005a94d0(&DAT_006359d4, idx, val)`
- FUN_0040ff00/ff30 (33B): similar parameter setters
- FUN_0040bbb0/bbe0/bc10/bc40 (29-42B): text buffer operations via DAT_00679640
- FUN_0040fe10-0040fed0 (29B each): text buffer operation wrappers

**Dialog system** (traced in init_call_chain.md under UI):
- FUN_0040ffa0 (47B): show dialog → FUN_005a632a
- FUN_0040bc80 (38B): get dialog result → FUN_005a5f34
- FUN_0040ffe0 (56B): dialog with params → FUN_005a632a

**Utility**:
- FUN_0040ddc6 (226B): open tax rate advisor dialog
- FUN_0040bcb0 (72B): check coordinate parity
- FUN_0040bd10 (156B): get food rows by government type (6/7/8/10)
- FUN_0040bdac (293B): balance sci/tax/lux to sum=10

### Block 00410000 — COMPLETE (89 functions)

**RULES.TXT parsers** (game logic — all LEAF, read game text files):
- FUN_00419d23 (432B): @COSMIC parser → DAT_0064bcc8-bcdd (22 bytes)
- FUN_0041ab18 (1270B): @GOVERNMENTS + @LEADERS → DAT_0064b9a0, DAT_006554f8
- FUN_0041b00e (361B): RULES.TXT master parser (calls section parsers)
- FUN_0041b4c0 (983B): @IMPROVE parser → building data
- FUN_00419cf4 (47B): load CITY.TXT helper
- FUN_00419ed3 (371B): rules file path resolver
- FUN_0041b177 (53B): terrain table loader helper

**Dialog display** (UI — read game state but don't modify):
- FUN_004100cf (518B): city info popup
- FUN_00410302 (56B): zoom to tile display
- FUN_00410835 (554B): unit info popup
- FUN_00410bc3 (311B): advisor notification popup
- FUN_004132b7 (153B): status bar text update
- FUN_004135ab (343B): year display update

**Game setup dialogs** (UI — set globals via user selection):
- FUN_0041d417 (937B): map size dialog
- FUN_0041d7ea (1204B): custom world options
- FUN_0041dd0e (708B): premade map selection
- FUN_0041e864 (151B): load game file dialog

**SEH/MFC wrappers** (48 functions — tiny wrappers or cleanup):
All are `thunk_FUN_xxx()` wrappers, FS_OFFSET restores, or MFC class methods.

**File I/O**:
- FUN_0041508c: fopen wrapper with path search
- FUN_0041f69f (473B): save/load file dialog helper
- FUN_0041f878 (97B): file existence check

### Block 00420000 — (57 functions, categorized)

MFC/UI display functions (39): window creation, viewport rendering,
sprite drawing, map tile rendering, credits display. All dead ends.
Key large ones:
- FUN_004274a6 (4250B): unit visibility/exploration (traced in init_call_chain.md)
- FUN_004253ef (1186B): map tile sprite rendering
- FUN_00425607 (1355B): map tile overlay rendering
- FUN_004289e0-428d00: palette/sprite utility wrappers

Text utilities (8): FUN_00426f30-426ff0 — string substitution for dialog params.
FUN_004271e8 — format tech/unit name for display. All display LEAF.

Game-accessible display (2):
- FUN_00421bb0 (21B): `return FUN_005d41e0()` — GetTickCount (timestamp). LEAF.
- FUN_00421bd0 (21B): display refresh wrapper. LEAF.

### Block 00430000 — COMPLETE (60 functions)

City utility functions (17 game logic, all LEAF):
- FUN_0043cc7e (103B): triangular sum of city size (food box threshold base)
- FUN_0043cce5 (193B): format number for display (gold/production)
- FUN_0043cef9 (125B): city revenue — checks trade route flag (DAT_0064f347 & 4)
- FUN_0043cf76 (245B): find city at (x,y) — searches city array
- FUN_0043d289 (186B): set/clear building (write to DAT_0064f374 bitmask)
- FUN_0043d348/d3a4 (92B each): building iteration — find building by type/index
- FUN_0043cab0/cb30 (92B each): city population count helpers
- FUN_0043cda6/ce5a: number formatting

Display functions (43 — dead ends):
- FUN_0043c8d0/c910/c950: text rendering with shadow
- FUN_004325c9-432c0e: MFC window wrappers
- FUN_004331d1-43742f: diplomacy/advisor UI display
- FUN_004371b3-437c6f: sprite/palette wrappers
- FUN_004325d5/e1: `thunk_FUN_0043c520()` — GDI object management

### Block 00440000 — (14 functions)
9 game logic (diplomacy dialogs — UI-driven but access DAT_0064c6c0 diplo flags).
5 MFC wrappers. All call dialog display system. Dead ends for headless.

### Block 00450000 — (58 functions)
23 game logic: wonder checks (FUN_00453af0-453edf), tech effect lookups
(FUN_004547xx series — 16 tiny wrappers to FUN_005bd915/FUN_0043c520),
diplomacy helpers (FUN_00456e90-4570xx), border friction (FUN_00456f20 — traced).
17 tiny wrappers, 18 MFC. All leaf or traced.

### Block 00460000 — (44 functions)
27 game logic: network protocol message handlers (FUN_00460129-46e8f0).
Most are multiplayer-only — they format and send/receive network packets
via FUN_0046b14d and XD_FlushSendBuffer. In single-player headless,
these are never called (guarded by `DAT_00655b02 < 3`).
Key non-network:
- FUN_00467750 (124B): set peace treaty between two civs
- FUN_00467825 (200B): set diplomatic flag
- FUN_004679ab-467baf: diplomatic status read/write helpers
- FUN_0046aaa0/aad0/ab00: GlobalAlloc/Lock/Unlock wrappers (traced)
14 MFC, 3 tiny. All leaf.

### Block 00470000 — (59 functions)
17 game logic: map rendering and tile display functions.
- FUN_0047cea6 (102B): refresh tile display at (x,y)
- FUN_0047cf22 (160B): scroll map viewport
- FUN_0047ce1e (163B): redraw tile + surrounding area
- FUN_004728c0-472cf0: map coordinate conversion
All display-only. 26 tiny, 16 MFC. Dead ends.

### Block 00480000 — (21 functions, CRITICAL)
16 game logic:
- FUN_00488a45 (682B): **path connectivity check** — uses pathfinder to trace
  road from city A to city B. Returns 0/1/2 (none/path/road). LEAF.
- FUN_004824e3 (577B): multiplayer quit handler (dead end for SP)
- FUN_004828a5 (2021B): multiplayer game loop (not used in SP)
- FUN_00484d85 (615B): year display calculation
- FUN_00485208 (479B): per-turn unit automation (settlers, caravans)
- FUN_00489859 (436B): find next unit to move (active unit selector)
- FUN_00489be2 (1058B): process player move command
- FUN_0048a374 (162B): end-of-turn cleanup for human player
- FUN_0048bf51 (155B): post-game-loop cleanup
- FUN_0048bfec (2530B): multiplayer game loop
- FUN_0048c9f3 (3990B): multiplayer turn processing
- FUN_0048dab9 (956B): network server main loop
5 tiny/SEH. All leaf for SP headless (MP paths never reached).

### Block 00490000 — (47 functions)
32 game logic: advisor/score/ranking system.
- FUN_00492b60 (302B): clear diplomatic target slot
- FUN_00492c15 (259B): AI diplomatic target assignment
- FUN_00492d18-492dd0: AI strategy helpers
- FUN_0049301b (958B): **create AI event/action** — adds entries to
  diplomatic_targets[48] array at DAT_0064cab4 (stride 6). Key function.
- FUN_004933f2 (167B): AI update unit action
- FUN_0049376f (268B): AI targeting helper
- FUN_00493b10-493eeb: civ name/leader formatters for display
- FUN_00498a5c (302B): advisor initialization
- FUN_00498e8b (2139B): advisor dialog display
9 tiny, 6 MFC. All leaf.

### Block 004A0000 — (19 functions)
17 game logic: pathfinding and game init.
- FUN_004abfe5 (4118B): **pathfinder** (BFS/Dijkstra — traced in init_call_chain.md)
- FUN_004ad01e/4ad076 (88/91B): pathfinder grid read/write (traced)
- FUN_004a2020-4a26bf: RULES.TXT text file reader functions
  (FUN_004a2379 = open, FUN_004a23fc = readline, FUN_004a24b1 = close)
- FUN_004a6cc5 (458B): tech prerequisite chain validator
- FUN_004a733d (156B): clear active unit selection
- FUN_004a75a6/75d5 (47B each): civ active/alive checks
- FUN_004aef20-4af1d5: text buffer formatting operations
1 tiny, 1 MFC. All leaf.

### Block 004B0000 — (17 functions)
14 game logic: tech system and network.
- FUN_004b32fe (164B): count continents (iterates DAT_00666130)
- FUN_004b4735 (246B): tech research cost calculation
- FUN_004b7645-4b7eb6: network message handlers
- FUN_004bb4a0/4bb4f0: memory allocation helpers
- FUN_004bdb2c (156B): tech priority scoring
- FUN_004b0b53 (251B): network message prep
- FUN_004b0a0a (238B): network flush
3 MFC. All leaf.

### Block 004C0000 — (8 functions)
8 game logic: unit orders and city founding.
- FUN_004c0cf7 (156B): unit goto pathfinder setup
- FUN_004c2788 (200B): trade route gold calculation
- FUN_004c4240 (76B): city rush-buy cost calculation
- FUN_004c42a0 (131B): rush-buy cost for buildings
- FUN_004c50d0 (262B): settler improvement auto-assign
- FUN_004c54da (1297B): settler/engineer work order AI
- FUN_004c5fae (365B): unit movement execution
- FUN_004cc870 (178B): caravan trade route establishment
All leaf.

### Block 004D0000 — (2 functions)
- FUN_004d007e (302B): income report dialog
- FUN_004d0339 (121B): income deficit check
Both leaf.

### Block 004E0000 — (1 function)
- FUN_004e1763 (254B): unit cost modifier display update. Leaf.

### Block 004F0000 — (10 functions)
2 game logic:
- FUN_004f00f0 (152B): city production cost lookup from building table
- FUN_004f5dd1 (123B): city improvement cost helper
7 MFC (city window UI methods), 1 tiny. All leaf.

IN PROGRESS — continuing with blocks 00510000-005A0000 and 005C-0061.
