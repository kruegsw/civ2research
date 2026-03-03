# Reverse Engineering civ2.exe — Civilization II Multiplayer Gold Edition

## Overview

This document records the reverse engineering of `civ2.exe` from Civilization II: Multiplayer Gold Edition (MGE). The goal is to produce readable C pseudocode that can be used to port game logic to a browser-based JavaScript implementation.

## Binary Details

| Property | Value |
|---|---|
| File | `civ2gamefolder/civ2.exe` |
| Format | PE32 (i386), Windows 32-bit |
| Size | 2,489,344 bytes (2.4 MB) |
| MD5 | `64333f6f9f74eae3aec167e58a3f01cf` |
| Build date | Thu Apr 8 14:33:52 1999 |
| Compiler | Microsoft Visual C++ (MSVC) |
| Framework | MFC (Microsoft Foundation Classes) |
| Entry point | `0x005F6E90` |
| Image base | `0x00400000` |
| Symbols | Stripped (no PDB) |

## PE Sections

| Section | Virtual Address | Virtual Size | Description |
|---|---|---|---|
| `.text` | `0x00401000` | `0x218E52` (2.1 MB) | Main code — game logic, UI, AI |
| `ASMGRAF` | `0x0061A000` | `0x1B43` (7 KB) | Hand-written assembly for sprite blitting |
| `.rdata` | `0x0061C000` | `0x7EC0` | Read-only data, CRT strings, vtables |
| `.data` | `0x00624000` | `0xC2B6C` | Global variables, game state, debug strings |
| `.idata` | `0x006E7000` | `0x2BF5` | Import Address Table |
| `.rsrc` | `0x006EA000` | `0x4F68` | Windows resources (icons, dialogs, menus) |
| `.reloc` | `0x006EF000` | `0x1C1D5` | Relocation table |

## DLL Imports

| DLL | Functions | Purpose |
|---|---|---|
| KERNEL32.dll | 106 | OS services, file I/O, memory, processes |
| USER32.dll | 100 | Window management, messages, menus, input |
| GDI32.dll | 40 | Graphics: BitBlt, fonts, palettes, drawing |
| WINMM.dll | 26 | Audio: wave output, MCI, timers |
| XDaemon.dll | 27 | Multiplayer networking (proprietary) |
| AVIFIL32.dll | 14 | AVI video playback (wonder movies) |
| ADVAPI32.dll | 5 | Registry access |
| MSVFW32.dll | 4 | Video compression |
| COMDLG32.dll | 3 | File open/save dialogs |
| DDRAW.dll | 1 | `DirectDrawCreate` (barely used — game uses GDI) |
| COMCTL32.dll | 1 | Common controls |

## Tools Used

### Phase 1: Initial Analysis (Python + objdump)
- **pefile** (Python) — PE header parsing, import/export tables
- **capstone** (Python) — x86 disassembly engine
- **objdump** (GNU Binutils 2.41) — Cross-reference verification
- **strings** — Bulk string extraction

### Phase 2: Full Decompilation (Ghidra)
- **Ghidra 12.0.3** (NSA, released 2026-02-10) — Headless decompiler
- **Eclipse Temurin JDK 21.0.10** — Java runtime for Ghidra
- **Custom Java script** (`DecompileAll.java`) — Batch decompilation to .c files

### Installation Paths
- JDK: `C:\tmp\jdk-21.0.10+7\`
- Ghidra: `C:\tmp\ghidra_12.0.3_PUBLIC\`
- Ghidra project: `C:\tmp\ghidra_projects\civ2_project\`

## Decompilation Results

| Metric | Value |
|---|---|
| Functions found by Ghidra | 7,124 |
| Successfully decompiled | **5,149** |
| Skipped (thunks/externals) | 1,975 |
| Errors | **0** |
| Output files | 34 `.c` files (one per 64KB address block) |
| Total output | **6.7 MB / 225,231 lines** of C pseudocode |
| Analysis time | 99 seconds |
| Decompilation time | ~3 minutes |

### Output File Structure

```
reverse_engineering/
  decompiled_raw/          # Pristine Ghidra output (never modify)
    FUNCTION_INDEX.txt     # Master index: address, size, name
    block_00400000.c       # Functions at 0x00400000-0x0040FFFF
    block_00410000.c       # Functions at 0x00410000-0x0041FFFF
    ...                    # (34 files total)
    block_00610000.c       # Functions at 0x00610000-0x0061FFFF
  decompiled/              # Working copy (renamed functions)
    (same structure)
  DecompileAll.java        # Ghidra batch decompilation script
  decompile_all.py         # Initial Python attempt (requires PyGhidra)
  reverseEngCiv2EXE.md     # This file
```

## Key Discoveries

### Debug Strings as Function Breadcrumbs

The binary contains debug strings with original function names, left in from development:

| String | Address | Indicates |
|---|---|---|
| `"Citywin: city_button_buy() blocked..."` | `0x00630E0C` | City dialog buy function |
| `"Citywin: city_button_change() blocked..."` | `0x00630E60` | City dialog change production |
| `"Citywin: city_button_rename() blocked..."` | `0x00630F68` | City dialog rename function |
| `"Citywin: city_button_view() blocked..."` | `0x00630FC0` | City dialog view function |
| `"Citywin: city_mouse() blocked..."` | `0x00631040` | City dialog mouse handler |
| `"Map_3: map_window_click() blocked..."` | `0x00624F78` | Main map click handler |
| `"Map_3: map_double_click() blocked..."` | `0x00624FC0` | Main map double-click |
| `"Map_3: map_ascii() blocked..."` | `0x00625008` | Map keyboard handler |
| `"Map_3: map_key() blocked..."` | `0x00625048` | Map key handler |

### Game Event System (NM_ Messages)

The game uses a custom message system with named events:

- **City window**: `NM_CITYWIN_CHECK_UNIT`, `NM_CITYWIN_CHECK_CITY`, `NM_CITYWIN_DELETED`, `NM_CITYWIN_REDRAW`
- **Production**: `NM_PRODUCTION_BEGIN`, `NM_PRODUCTION_COMPLETE`
- **Combat/Diplomacy**: `NM_POP_CITYCAPTURE`, `NM_POP_CARAVAN`, `NM_POP_DESTROYED`, etc.
- **Wonders**: `NM_POP_STARTWONDER`, `NM_POP_ENDWONDER`, `NM_POP_CAPTUREWONDER`
- **Espionage**: `NM_POP_SPY_STOLENCIV`, `NM_POP_SPY_SABOTAGE1`, `NM_POP_SPY_PLANTNUKE`

### Multiplayer Stacking Pattern

All interactive functions share a common guard pattern checking 17+ flags at `0x6AD8BC`-`0x6AD904` and calling `XD_InFlushSendBuffer()`. If blocked, the action is "stacked" for later execution with an action type code stored at `0x6C31AC`.

### Key Global Data Structures

| Address | Stride | Description |
|---|---|---|
| `0x006A91B8` | — | Game state object (CSplitterWnd-like, holds current city index) |
| `0x0064F348` | 0x58 (88 bytes) | City data array (indexed by city ID) |
| `0x0064F379` | 0x58 | City production type field (within city struct) |
| `0x0064F35C` | 0x58 | City shields accumulated (within city struct) |
| `0x0064C6A2` | 0x594 | Civilization data array (gold, etc.) |
| `0x0064B1B8` | 0x14 | Building/improvement data |
| `0x0064C488` | 0x08 | Unit type data |
| `0x0064BCCC` | — | Base production cost multiplier |
| `0x006AD8BC`-`0x6AD904` | 0x04 | Multiplayer action stacking flags |

### Code Region Map

| Address Range | Functions | Module |
|---|---|---|
| `0x400000-0x40FFFF` | 133 | MFC framework, initialization |
| `0x410000-0x43FFFF` | ~380 | Game setup, MFC controls |
| `0x440000-0x44FFFF` | 303 | UI controls, dialogs |
| `0x450000-0x4FFFFF` | ~580 | Game logic (diplomacy, AI, units) |
| `0x500000-0x50FFFF` | 103 | **City window module** |
| `0x510000-0x51FFFF` | 106 | Popup events (NM_POP_ handlers) |
| `0x520000-0x54FFFF` | ~90 | Map editor, scenario logic |
| `0x550000-0x5AFFFF` | ~550 | Game mechanics, combat, movement |
| `0x5B0000-0x5DFFFF` | ~900 | **GDI rendering layer**, window management |
| `0x5E0000-0x60FFFF` | ~760 | CRT library, startup code |
| `0x61A000-0x61BFFF` | — | ASMGRAF: hand-written sprite blitter |

### GDI Rendering Confirmation

Decompiled code confirms findings from DDraw proxy hooking:

- **Shadow text pattern**: `SetTextColor(white)` → `DrawTextA` → `OffsetRect(-1,-1)` → `SetTextColor(gray)` → `DrawTextA` → `OffsetRect(1,1)`
- **Palette-based color**: Colors derived from 8-bit palette via `GetDIBColorTable`
- **Chroma key masking**: `SetBkColor(0x808000)` (olive) for sprite transparency
- **Font creation**: `CreateFontIndirectA` with LOGFONTA structures
- **Bitmap operations**: `BitBlt`, `StretchBlt`, `CreateDIBSection` for sprite compositing

### Asset File References

Found in strings: `TERRAIN1.GIF`, `TERRAIN2.GIF`, `ICONS.GIF`, `PEOPLE.GIF`, `CITIES.GIF`, `UNITS.GIF`, `CITY.GIF`, `TITLE.GIF`, `EDITORPT.GIF`, `EDITORSQ.GIF`, `EDITORSA.GIF`

Also: `CITYPREF.TXT`, `CIV.INI`, `LABELS.TXT`, `civ2\wonder.dll`, `civ2art.gif`

### ASMGRAF Section

The `ASMGRAF` section (7 KB) contains hand-written 16/32-bit hybrid assembly for performance-critical sprite blitting. Uses segment registers (`fs`, `es`, `ds`) and 16-bit `bp`-based stack frames — likely ported from the original 16-bit Civ2 DOS/Win16 codebase. Functions perform pixel-by-pixel copy with color key transparency checking.

## Re-running Ghidra

To re-run analysis or export additional data:

```bash
export JAVA_HOME="/c/tmp/jdk-21.0.10+7"
export PATH="$JAVA_HOME/bin:$PATH"

# Process existing project (no re-analysis)
/c/tmp/ghidra_12.0.3_PUBLIC/support/analyzeHeadless \
    "/c/tmp/ghidra_projects" "civ2_project" \
    -process "civ2.exe" \
    -noanalysis \
    -scriptPath "/c/Users/stuar/Documents/Stu/Code/civ2research/reverse_engineering" \
    -postScript "DecompileAll.java"

# Re-import and analyze from scratch
/c/tmp/ghidra_12.0.3_PUBLIC/support/analyzeHeadless \
    "/c/tmp/ghidra_projects" "civ2_fresh" \
    -import "/c/Users/stuar/Documents/Stu/Code/civ2research/civ2gamefolder/civ2.exe" \
    -postScript "DecompileAll.java"
```

## Function Renaming (Phase 1 — Automated)

Applied automated function renaming using `build_rename_map.py` + `apply_renames.py`:

| Source of Evidence | Renames |
|---|---|
| Debug string cross-references | 6 (exact function names from Citywin/Map_3 strings) |
| Game event string analysis | ~40 (NM_POP_/NM_CITYWIN_ event handlers) |
| Win32 API call patterns | ~80 (GDI, dialogs, menus, windows) |
| Code region membership | ~125 (city window module, rendering layer) |
| **Total** | **251 functions renamed** |

Results: **1,614 replacements** across 32 files. Raw output preserved in `decompiled_raw/`.

### Rename Categories

| Category | Count | Examples |
|---|---|---|
| `citywin_*` | 59 | City window helper functions |
| `send_msg_*` | 43 | SendMessageA wrappers |
| `show_*` | 26 | Dialogs, popups, screens |
| `create_*` | 16 | Window/resource creation |
| `gdi_*` | 12 | GDI rendering helpers |
| `manage_window_*` | 12 | ShowWindow/DestroyWindow |
| `handle_*` | 11 | Event handlers (disorder, gifts, etc.) |
| `load_*` | 11 | File/resource loading |
| Named game functions | 15 | `city_button_buy`, `map_window_click`, `init_tile`, etc. |

### Key Named Functions

| Address | Name | Purpose |
|---|---|---|
| `0x00410F77` | `map_window_click` | Main map left-click handler |
| `0x00411705` | `map_double_click` | Main map double-click |
| `0x00411F91` | `map_ascii` | Map keyboard letter handler |
| `0x004125C6` | `map_key` | Map keyboard key handler |
| `0x0043F8B0` | `create_city` | Found/create a new city |
| `0x004413D1` | `delete_city` | Remove a city |
| `0x004944BB` | `init_tile` | Initialize tile/terrain graphics |
| `0x00473660` | `load_game_file` | Load .gpk save file |
| `0x0047758C` | `save_game` | Save game to file |
| `0x00509B48` | `city_button_buy` | City dialog: buy production |
| `0x0050A473` | `city_button_change` | City dialog: change production |
| `0x0050B74E` | `city_button_rename` | City dialog: rename city |
| `0x0050BACD` | `city_button_view` | City dialog: view city |
| `0x0050C1D1` | `city_mouse` | City dialog: mouse handler |
| `0x005D225B` | `debug_log` | Debug output (OutputDebugStringA wrapper) |

### Re-running the rename pipeline

```bash
cd /c/Users/stuar/Documents/Stu/Code/civ2research

# Rebuild rename map (if evidence has changed)
python reverse_engineering/build_rename_map.py

# Re-apply to working copy (from fresh raw copy)
cp -r reverse_engineering/decompiled_raw/* reverse_engineering/decompiled/
python reverse_engineering/apply_renames.py
```

## Next Steps

1. **Struct recovery** — Map the city (0x58-byte stride at 0x64F348), unit, and civilization data structures
2. **Module documentation** — Annotate each code region with purpose and call graph
3. **JS pseudocode** — Convert key modules to JavaScript-portable pseudocode for browser implementation
4. **Phase 2 renaming** — Use AI agents to analyze function bodies and propose semantic names for remaining `FUN_xxxxxxxx` functions
