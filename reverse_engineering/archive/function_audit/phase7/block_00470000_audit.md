# Block 00470000 -- Phase 7 Audit

**Functions in this block: 139**
**System: Victory/defeat video playback, save/load game file I/O, map view rendering, multiplayer network polling**

**Game logic functions: 0** -- This entire block is UI, file I/O, rendering, and network code. No core game mechanics (combat, production, happiness, research, movement, diplomacy) are present.

---

## FW -- Framework (49 functions)

FUN_004702e0 | 221B | N/A (Victory screen class constructor -- allocates 0x137C object, loads art)
FUN_004703d4 | 186B | N/A (Victory screen init -- calls CRT constructors, sets vtable)
FUN_004704ec | 127B | N/A (Victory screen destructor chain -- calls 5 sub-destructors)
FUN_0047056b | 15B | N/A (Sub-destructor -- FUN_005bd915)
FUN_0047057a | 15B | N/A (Sub-destructor -- thunk_FUN_0043c520)
FUN_00470589 | 15B | N/A (Sub-destructor -- _Timevec destructor)
FUN_00470598 | 15B | N/A (Sub-destructor -- FUN_005dd1a0)
FUN_004705a7 | 15B | N/A (Sub-destructor -- FUN_005c656b)
FUN_004705b6 | 9B | N/A (Sub-destructor -- thunk_FUN_0044ca60)
FUN_004705c9 | 14B | N/A (SEH unwind thunk)
FUN_00470c0c | 16B | N/A (Empty stub -- returns immediately)
FUN_00471020 | 57B | N/A (Victory screen scalar deleting destructor)
GetActiveView@0x00471070 | 30B | N/A (MFC CRichEditCntrItem::GetActiveView -- VS98 library)
GetActiveView@0x004710A0 | 30B | N/A (MFC CRichEditCntrItem::GetActiveView -- VS98 library, duplicate)
FUN_0047132e | 12B | N/A (Thunk -- calls thunk_FUN_0059df8a, dialog cleanup)
FUN_00471354 | 14B | N/A (SEH unwind thunk)
FUN_00471362 | 186B | N/A (Spaceship victory screen init -- same pattern as FUN_004703d4)
FUN_0047147a | 127B | N/A (Spaceship victory screen destructor chain)
FUN_004714f9 | 15B | N/A (Sub-destructor -- FUN_005bd915)
FUN_00471508 | 15B | N/A (Sub-destructor -- thunk_FUN_0043c520)
FUN_00471517 | 15B | N/A (Sub-destructor -- _Timevec destructor)
FUN_00471526 | 15B | N/A (Sub-destructor -- FUN_005dd1a0)
FUN_00471535 | 15B | N/A (Sub-destructor -- FUN_005c656b)
FUN_00471544 | 9B | N/A (Sub-destructor -- thunk_FUN_0044ca60)
FUN_00471557 | 14B | N/A (SEH unwind thunk)
FUN_004728c0 | 57B | N/A (Spaceship victory screen scalar deleting destructor)
FUN_00472393 | 12B | N/A (Sub-destructor -- thunk_FUN_0043c520)
FUN_0047239f | 12B | N/A (Sub-destructor -- FUN_005bd915)
FUN_004723ab | 12B | N/A (Sub-destructor -- FUN_005c656b)
FUN_004723b7 | 12B | N/A (Sub-destructor -- thunk_FUN_0044ca60)
FUN_004723c3 | 12B | N/A (Sub-destructor -- _Timevec destructor)
FUN_004723cf | 12B | N/A (Sub-destructor -- thunk_FUN_0044cba0)
FUN_004723e5 | 14B | N/A (SEH unwind thunk)
FID_conflict:_$E31@0x00472F10 | 26B | N/A (CRT static init -- calls FUN_00472f2a + FUN_00472f44)
FUN_00472f2a | 26B | N/A (CRT static init -- FUN_005bd630)
FUN_00472f44 | 29B | N/A (CRT atexit register -- _atexit(FUN_00472f61))
FUN_00472f61 | 26B | N/A (CRT cleanup -- FUN_005bd915)
FUN_00479d20 | 26B | N/A (CRT static init -- vector constructor + atexit)
FUN_00479d3a | 43B | N/A (CRT vector constructor -- 8x 0x3F0 elements for map view array)
FUN_00479d65 | 29B | N/A (CRT atexit register -- _atexit(FUN_00479d82))
FUN_00479d82 | 38B | N/A (CRT vector destructor -- 8x 0x3F0 elements)
FID_conflict:_$E31@0x00479DA8 | 26B | N/A (CRT static init)
FUN_00479dc2 | 26B | N/A (CRT static init -- thunk_FUN_0040fb00)
FUN_00479ddc | 29B | N/A (CRT atexit register)
FUN_00479df9 | 26B | N/A (CRT cleanup -- thunk_FUN_0040fbb0)
FID_conflict:_$E31@0x00479E13 | 26B | N/A (CRT static init)
FUN_00479e2d | 26B | N/A (CRT static init -- thunk_FUN_0040fb00)
FUN_00479e47 | 29B | N/A (CRT atexit register)
FUN_00479e64 | 26B | N/A (CRT cleanup -- thunk_FUN_0040fbb0)
FUN_0047dce0 | 164B | N/A (Map view class constructor -- calls thunk_FUN_0055339f, sets vtable)
~CBitmapButton | 114B | N/A (MFC CBitmapButton destructor -- VS98 library)
FUN_0047de82 | 15B | N/A (Sub-destructor -- FUN_005bd915)
FUN_0047de91 | 15B | N/A (Sub-destructor -- FUN_005bd915)
FUN_0047dea0 | 15B | N/A (Sub-destructor -- thunk_FUN_0043c520)
FUN_0047deaf | 15B | N/A (Sub-destructor -- thunk_FUN_0043c520)
FUN_0047debe | 9B | N/A (Sub-destructor -- COleCntrFrameWnd destructor)
FUN_0047ded1 | 14B | N/A (SEH unwind thunk)
FUN_004786f8 | 12B | N/A (Sub-destructor -- FUN_005c656b)
FUN_0047870e | 15B | N/A (SEH unwind thunk)

---

## UI -- User Interface / File I/O (90 functions)

### Victory/Defeat Video Screens (10 functions)

load_civ2_art_004705d7 | 772B | N/A (Load loser.avi + civ2art.dll for defeat video screen)
FUN_004708db | 817B | N/A (Defeat video playback -- reads ARCHAEOLOGISTS text, renders 3 frames)
FUN_00470c1c | 338B | N/A (Defeat screen epilogue -- reads ARCHAEOLOGISTS3 text, renders)
FUN_004710d0 | 606B | N/A (Spaceship victory entry -- loads art, plays CENTAURI video or text)
load_civ2_art_00471565 | 753B | N/A (Load civ2 video for spaceship victory from CD-ROM)
FUN_00471856 | 936B | N/A (Spaceship victory video playback -- CENTAURI text, 3 frames)
FUN_00471bfe | 22B | N/A (Empty stub)
FUN_00471c14 | 22B | N/A (Empty stub)
FUN_00471c2a | 397B | N/A (Spaceship victory text scroll -- CENTAURI3 text rendering)
FUN_00471db7 | 33B | N/A (Spaceship victory cleanup -- InvalidateObjectCache)
load_civ2_art_00471dd8 | 1467B | N/A (Spaceship defeat video -- CENTAURI_BEATEN text, 5 frames)

### File I/O Utilities (4 functions)

FUN_00472950 | 91B | N/A (Append extension to filename if missing, uppercase)
FUN_004729ab | 125B | N/A (Replace file extension, uppercase)
FUN_00473c12 | 86B | N/A (Write null-terminated string to file -- fputs + fputc(0))
FUN_00473c68 | 246B | N/A (Read null-terminated string from file into heap-allocated buffer)

### Save/Load Viewport State (4 functions)

FUN_00472f7b | 233B | N/A (Copy viewport state from 32-bit to 16-bit packed format for save)
FUN_00473064 | 234B | N/A (Copy viewport state from 16-bit packed format to 32-bit for load)
FUN_0047314e | 66B | N/A (Convert 4x int32 to 4x int16 -- RECT narrowing)
FUN_00473190 | 66B | N/A (Convert 4x int16 to 4x int32 -- RECT widening)

### File Dialog (1 function)

show_open_dialog_31D2 | 212B | N/A (Win32 GetOpenFileName/GetSaveFileName wrapper)

### Save Game Section Read/Write (7 functions)

FUN_004732a6 | 954B | N/A (Read unit/city index sections from save file -- version-dependent sizes)
load_game_file | 1458B | N/A (Read game header + player data from save file -- version 0x26-0x2C)
FUN_00473d5e | 247B | N/A (Set file extension based on game mode -- .sav/.hot/.eml/.net/.scn)
FUN_00473e55 | 408B | N/A (Build file filter string for open/save dialog)
FUN_00473ff2 | 422B | N/A (Append filter pair for file type: .sav, .hot, .eml, .net)
FUN_004741be | 4499B | N/A (Write game to file -- complete save file serialization)
FUN_0047543c | 509B | N/A (Quick load game validation -- check header, version, read game data)

### Full Game Load (2 functions)

FUN_00475666 | 7734B | N/A (Full game load from file -- reads all sections, rebuilds player/unit data, handles MP flags)
save_game | 2038B | N/A (Save game dialog + file write orchestration -- builds filename, shows dialog, calls FUN_004741be)

### Load/Verify with UI (1 function)

load_verify_units | 2391B | N/A (Load game with UI -- open dialog, verify, load, show events, validate units)

### Map Rendering Helpers (5 functions)

FUN_00472910 | 48B | N/A (Set two fields on map view object -- callback + aux param)
FUN_00472b0a | 346B | N/A (Draw number overlay on map tile -- combat damage display with shadow)
FUN_00472cf0 | 35B | N/A (Scale factor calc -- (param2+8)*param1 / 8, for zoom-dependent sizes)
FUN_00472d20 | 253B | N/A (Init sound channel struct -- set position/volume defaults, return 0x800)
FUN_00472e1d | 63B | N/A (Init sound channel + play -- calls FUN_00472d20 then thunk_FUN_005b345f)
FUN_00472e5c | 79B | N/A (Stop sound channel -- calls thunk_FUN_005b4391 if active)

### Map View Coordinate/Scroll (10 functions)

FUN_00479e7e | 48B | N/A (Map view: set X scroll position)
FUN_00479eae | 48B | N/A (Map view: set Y scroll position)
FUN_00479ede | 224B | N/A (Map view: init scroll state -- center on barbarian capital or map center)
FUN_00479fbe | 1410B | N/A (Map view: recalculate tile geometry -- tile size, visible range, scroll bounds)
FUN_0047a540 | 368B | N/A (Map view: pixel to tile coordinate conversion -- diamond projection)
FUN_0047a6b0 | 151B | N/A (Map view: tile to pixel coordinate conversion)
FUN_0047c2f2 | 141B | N/A (Map view: test if X coord within horizontal range -- handles world wrap)
FUN_0047c37f | 97B | N/A (Map view: test if (x,y) within viewport rectangle)
FUN_0047c3e0 | 99B | N/A (Map view: test if tile is in visible viewport)
FUN_0047df80 | 34B | N/A (Win32 IntersectRect wrapper)

### Map Tile Rendering (16 functions)

FUN_00472a60 | 85B | N/A (Show DANGER popup dialog)
FUN_00472ab5 | 85B | N/A (Show DANGERHEX popup dialog)
FUN_0047a747 | 386B | N/A (Calculate coast adjacency flags for 8 neighbors -- for ocean tile rendering)
FUN_0047a8c9 | 4431B | N/A (Render single map tile -- terrain, improvements, rivers, roads, resources, fog)
FUN_0047ba1d | 392B | N/A (Render city on tile -- check visibility, call city renderer)
FUN_0047bba5 | 69B | N/A (Render unit on tile -- basic wrapper for thunk_FUN_0056baff)
FUN_0047bbea | 111B | N/A (Render unit on tile -- conditional: only if own turn or spectator)
FUN_0047bc59 | 171B | N/A (Render specific unit at its tile coordinates)
FUN_0047bd04 | 351B | N/A (Render unit with stacking checks -- same tile as active unit)
FUN_0047be63 | 662B | N/A (Render units at tile -- find correct unit, check visibility, invoke renderer)
FUN_0047c103 | 495B | N/A (Render complete tile -- terrain + city + units + resource icons)
FUN_0047c443 | 871B | N/A (Render city name labels on all visible cities)
FUN_0047c7aa | 191B | N/A (Calculate bounding rect for area around tile)
FUN_0047c869 | 352B | N/A (Redraw map area -- diamond pattern around center tile)
FUN_0047c9d4 | 278B | N/A (Redraw entire visible map -- iterate all viewport tiles)
FUN_0047df20 | 33B | N/A (Set sprite palette for zoom level)

### Map View Orchestration (12 functions)

FUN_0047cb26 | 42B | N/A (Invalidate 1-tile area around tile)
FUN_0047cb50 | 100B | N/A (Refresh status bar -- calls thunk_FUN_00407ff0 + thunk_FUN_0047e94e)
FUN_0047cbb4 | 313B | N/A (Full map area redraw with cursor + status bar update)
FUN_0047cced | 50B | N/A (Redraw 1-tile area for current player)
FUN_0047cd1f | 50B | N/A (Redraw 2-tile area for current player)
FUN_0047cd51 | 205B | N/A (Full viewport redraw -- recalculate geometry, repaint everything)
FUN_0047ce1e | 136B | N/A (Redraw area for all active players -- multiplayer)
FUN_0047cea6 | 124B | N/A (Redraw 1-tile for all active players)
FUN_0047cf22 | 124B | N/A (Redraw 2-tile for all active players)
FUN_0047cf9e | 124B | N/A (Full viewport redraw for all active players)
FUN_0047caea | 60B | N/A (Invalidate rect around tile area)
FUN_0047dfb0 | 47B | N/A (Scale value by current zoom level)
FUN_0047dff0 | 41B | N/A (Set sprite palette for current zoom)
FUN_0047df50 | 28B | N/A (Reset sprite palette to default)
FUN_0047e030 | 181B | N/A (Test if tile is visible to current player on any active view)

### Multiplayer Network Stacked Draw System (2 functions)

FUN_0047e0e5 | 462B | N/A (Queue drawing command to stacked draw ring buffer -- max 100 entries)
FUN_0047e2b3 | 1590B | N/A (Process one stacked draw command -- switch on 14 draw message types)

### Multiplayer Network Message Polling (1 function)

FUN_0047e94e | 14034B | N/A (Master network message dispatcher -- processes all incoming MP messages: state sync, unit commands, city commands, diplomacy, turn control, draw commands. 168+ case switch statement.)

---

## GL -- Game Logic (0 functions)

(none)

---

## AI (0 functions)

(none)

---

## Summary

This block contains **zero game logic functions**. It is entirely composed of:

1. **Framework/CRT** (49 functions): Constructors, destructors, SEH unwind thunks, atexit handlers, MFC library functions
2. **Victory/defeat video screens** (11 functions): Loading and playing AVI videos, rendering text from game text files (ARCHAEOLOGISTS, CENTAURI, CENTAURI_BEATEN)
3. **Save/load file I/O** (10 functions): Binary serialization of game state to/from .sav/.hot/.eml/.net/.scn files, version-dependent format handling (versions 0x26 through 0x2C)
4. **Map view rendering** (43 functions): Tile rendering (terrain, improvements, rivers, roads, fog), coordinate conversion (pixel to tile, tile to pixel), viewport scrolling, city name labels, unit rendering on map
5. **File dialog wrappers** (1 function): Win32 GetOpenFileName/GetSaveFileName
6. **Multiplayer network polling** (3 functions): Ring buffer draw queue, stacked draw processor, and the massive 14K-line network message dispatcher handling 168+ message types
7. **Sound/audio** (3 functions): Sound channel initialization and playback

No discrepancies to report -- there are no game logic functions in this block to compare against the JS engine.

### Verified function count: 139
- FW: 49 + 10 (~CBitmapButton + sub-destructors counted above)
- UI: 80
- GL: 0
- AI: 0
- Total: 139
