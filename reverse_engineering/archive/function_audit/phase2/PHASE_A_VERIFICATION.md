# Phase A Verification: Framework Block Dismissal

**Date**: 2026-03-15
**Scope**: 6 blocks, 1,517 functions total
**Method**: Cross-referenced raw Ghidra decompiled C against Phase 2 pseudocode; scanned for game-specific globals, constants, string references, and cross-calls into game logic.

---

## Verification Criteria

Each block was scanned for:
1. **Game data structure references** -- DAT_0064xxxx (city arrays), DAT_006390xx (unit arrays), DAT_0068xxxx-006Cxxxx (game state)
2. **Calls into game logic** -- direct FUN_004xxxxx-0055xxxx calls (non-thunk)
3. **Game-specific string constants** -- .sav, .scn, rules.txt, city/unit/tech names
4. **Hardcoded game values** -- population thresholds, resource amounts, tech costs, tile dimensions (64x32), max-civ counts (21), max-unit counts (255)
5. **Civ2-specific palette or animation constants**

---

## Block Verification Results

### block_005C0000.c -- 339 functions -- VERIFIED GENERIC

**Classification**: SMEDS32 graphics engine (MicroProse custom multimedia framework)
**Source path**: `D:\Ss\Smeds32\Port.cpp`
**Contents**: Port/surface pixel buffers, BMP/TGA/GIF decoders, palette management, font/text rendering, sprite system, custom Win32 controls (buttons, checkboxes, scrollbars), scale/zoom tables, SEH stubs.

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **0**
- Direct game function calls: **0** (all cross-block calls are thunks to MFC CFile/CString or SMEDS coordinate scaling helpers)
- Game-specific strings: **0**
- Game constants: **0**
- DAT references found: DAT_00637xxx (SMEDS surface/palette state), DAT_00638xxx (SMEDS rendering globals), DAT_006d4xxx (scale/zoom lookup tables) -- all framework-internal

**Verdict**: **VERIFIED GENERIC** -- 100% SMEDS graphics framework. No game logic.

---

### block_005D0000.c -- 370 functions -- VERIFIED GENERIC

**Classification**: SMEDS32 audio, timer, file I/O, controls
**Source path**: `D:\Ss\Smeds32\Pctimer.cpp`, `D:\Ss\Smeds32\Pcmem.cpp`
**Contents**: Sprite blit dispatch, coordinate scaling, timer system, debug logging, custom Win32 controls (edit, combo, listbox, tab), wave audio, file I/O, MIDI/CD audio, memory management, resource DLL loading, window system, palette management, GIF parsing, RLL codec, visual transitions.

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **0**
- Direct game function calls: **0** (all cross-block calls are thunks: timing, coordinate scaling, CFile operations)
- Game-specific strings: **0**
- Game constants: **0**
- DAT references found: DAT_00637f98-00637fac (coordinate scale factors), DAT_00637ef4 (audio state), DAT_00638304-00638308 (timer state), DAT_006e47c0-c8 (scale table pointers) -- all framework-internal

**Verdict**: **VERIFIED GENERIC** -- 100% SMEDS multimedia framework. No game logic.

---

### block_005E0000.c -- 357 functions -- VERIFIED GENERIC

**Classification**: SMEDS32 DirectDraw, AVI, input, MCI audio
**Source path**: `D:\Ss\Smeds32\dd.cpp`, `D:\Ss\Smeds32\ddcntrl.cpp`
**Contents**: Dialog infrastructure, menu management, AVI video playback, DIB surface creation, GDI text drawing, LZW/GIF decompression, raw pixel operations, surface object, resource image loading, surface blit/copy, DirectDraw interface, input event dispatch, hotkey/scrollbar, MCI/MIDI/CD audio, timer, joystick, wave audio, DirectDraw window management.

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **2** -- both are framework globals:
  - DAT_006394c0: IDirectDraw interface pointer (created via `DirectDrawCreate`)
  - DAT_00639218: string constant used in `_strcmp` (window class name comparison)
- Direct game function calls: **0**
- Game-specific strings: **0**
- Game constants: **0**
- DAT_00638e18: DIB orientation flag (-1/0/1) -- framework rendering config

**Verdict**: **VERIFIED GENERIC** -- 100% SMEDS DirectDraw/multimedia framework. The two DAT_00639xxx references are framework objects (DDraw COM interface, window class string), not game state.

---

### block_005F0000.c -- 346 functions -- VERIFIED GENERIC

**Classification**: MFC/CRT library + SMEDS DDControl UI framework
**Source path**: `D:\Ss\Smeds32\ddcntrl.cpp` + MSVC 6.0 CRT
**Contents**: DDControl UI widget framework (~80 functions), MSVC CRT library (~246 functions including malloc/free, string ops, file I/O, printf, atexit, locale, MBCS, environment, heap management), C++ EH runtime (~20 functions).

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **0**
- Direct game function calls: **1** -- `thunk_FUN_0055add0` in the CRT entry point (`entry` at 005F6E90), which is the standard CRT startup calling `WinMain`. This is the application entry point thunk, not game logic in the framework.
- Game-specific strings: **0**
- Game constants: **0**
- All DAT references are CRT-internal: random seed (DAT_00639e50), DDControl vtables (PTR_FUN_0061d720), DDControl current-control global (DAT_00639dc8) -- all framework-internal

**Verdict**: **VERIFIED GENERIC** -- 100% CRT library + DDControl framework. The single `thunk_FUN_0055add0` is the standard WinMain call from CRT startup, not embedded game logic.

---

### block_00600000.c -- 103 functions -- VERIFIED GENERIC

**Classification**: MSVC 6.0 CRT debug library
**Contents**: Runtime error messages, abort/signal/raise, itoa/ltoa/i64toa, fprintf, setvbuf, C++ unhandled exception filter, pointer validation, snprintf, timezone (_tzset/_isindst), long-double arithmetic (__ld12mul, __strgtold12, $I10_OUTPUT), wcstombs, getenv, setmode, _mbsnbicoll, CompareString wrappers, _crtsetenv, _mbschr, _filelength, _strupr/_strlwr, _mkdir.

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **0**
- Direct game function calls: **0**
- Game-specific strings: **0**
- Game constants: **0**
- All DAT references are CRT-internal: error table (DAT_0063b1b8), MessageBox proc cache (DAT_0063b260-b270), locale caches (DAT_0063b69c) -- all CRT-internal state

**Verdict**: **VERIFIED GENERIC** -- 100% MSVC CRT debug library. No game logic.

---

### block_00610000.c -- 2 functions -- VERIFIED GENERIC (with note)

**Classification**: Legacy 16-bit sprite blitting routines (RN.sprite)
**Contents**:
- `FUN_0061a000` (blit_sprite_16bit): Rectangular sprite copy with transparency and horizontal coordinate wrapping. Uses 16-bit segmented addressing (in_SS, in_DS, FS_OFFSET).
- `FUN_0061a759` (blit_rle_sprite_16bit): RLE sprite blit with transparency, vertical flip, and horizontal clipping. Uses 16-bit segmented addressing.

**Scan results**:
- DAT_0064xxxx references: **0**
- DAT_006390xx-006Cxxxx references: **0**
- Direct game function calls: **0**
- Game-specific strings: **0**
- Game constants: **0**
- No DAT_ references at all -- these functions operate purely on stack parameters and segment:offset pixel buffers

**Note**: These are 16-bit legacy primitives from the original DOS/Win16 MicroProse graphics engine. They perform generic sprite blitting (transparency, wrapping, RLE decompression) with no game-specific content. The horizontal wrapping modulus could theoretically serve map wrapping, but it is a generic parameter passed by the caller, not a hardcoded game value. These are likely dead code preserved from linking the original 16-bit graphics library, or called via a flat thunk layer.

**Verdict**: **VERIFIED GENERIC** -- Pure rendering primitives with no game-specific content. Safe to skip.

---

## Summary

| Block | Functions | Classification | Game Logic Found | Verdict |
|-------|-----------|----------------|-----------------|---------|
| block_005C0000 | 339 | SMEDS32 graphics engine | None | VERIFIED GENERIC |
| block_005D0000 | 370 | SMEDS32 audio/timer/file I/O | None | VERIFIED GENERIC |
| block_005E0000 | 357 | SMEDS32 DirectDraw/AVI/input | None | VERIFIED GENERIC |
| block_005F0000 | 346 | MFC/CRT + DDControl UI | None | VERIFIED GENERIC |
| block_00600000 | 103 | MSVC CRT debug | None | VERIFIED GENERIC |
| block_00610000 | 2 | Legacy 16-bit sprite blitters | None | VERIFIED GENERIC |
| **Total** | **1,517** | | **0 game-specific items** | **ALL VERIFIED GENERIC** |

### Methodology Notes

- **Raw decompiled C files** were scanned independently of pseudocode summaries
- **All DAT_ global references** in the 0x0062xxxx-0x006Exxxx range were checked and confirmed to be framework-internal (SMEDS surface/palette state, coordinate scaling, DDraw COM interfaces, CRT internal tables, DDControl vtables)
- **All cross-block function calls** were confirmed to be thunks to MFC/CRT or SMEDS utility functions, not game logic
- **Function counts** verified: every block's `// Function:` header count matches the expected count from MASTER_CLASSIFICATION
- **Zero game-specific content** was found across all 1,517 functions

These 1,517 functions can be permanently dismissed from further analysis. They contain no Civ2-specific game logic, constants, data structure references, or algorithms.
