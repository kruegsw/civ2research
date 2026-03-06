# Civ2 Master Reference — Civilization II Multiplayer Gold Edition

> **Purpose**: A single comprehensive document containing ALL reverse-engineering findings,
> file format specifications, data structures, game formulas, rendering analysis, and browser
> implementation status for the Civ2 MGE browser recreation project. This document is
> self-contained — another developer (or AI) should be able to recreate the browser-based
> game from this file alone.
>
> **Generated**: 2026-03-04
> **Source files**: 9 documentation files (~9,400 lines total)
> **Original files**: Kept as-is (not deleted or modified)

---

## Table of Contents

- [Part I: Project Overview & Methodology](#part-i-project-overview--methodology)
  - Binary details, PE sections, DLL imports
  - Tools used (Ghidra, DDraw proxy, Python)
  - Decompilation results (5,149 functions, 225K lines)
  - Key discoveries (debug strings, event system, code region map)
  - Function renaming (251 functions)
  - Roadmap for future RE work
- [Part II: Save File Format & Asset Formats](#part-ii-save-file-format--asset-formats)
  - .SAV/.SCN binary file structure (all sections with byte offsets)
  - Sprite sheet layouts (TERRAIN1/2, CITIES, UNITS, ICONS, PEOPLE, CITY GIFs)
  - City management screen layout
  - Font specifications and map UI elements
  - Tile rendering pipeline (compositing order, coastline algorithm, river computation)
- [Part III: Data Structures](#part-iii-data-structures)
  - [Section A: City Struct — Complete Reference (88 bytes, 31 fields)](#section-a-city-struct--complete-reference)
  - [Section B: All Data Structures (Civilization, Unit Type, Building, Unit Instance, Globals)](#section-b-all-data-structures)
- [Part IV: Game Formulas & Mechanics](#part-iv-game-formulas--mechanics)
  - COSMIC constants and global variable map
  - Rush-buy cost formula (units, buildings, wonders)
  - Food storage / city growth
  - Resource calculation per tile (food, shields, trade)
  - Happiness calculation
  - Corruption and waste
  - Technology cost
  - Unit support and trade distribution
- [Part V: GDI Rendering Pipeline](#part-v-gdi-rendering-pipeline)
  - DDraw proxy architecture and hooks
  - Startup sequence (fonts, buffers, map buffer)
  - Rendering architecture (surface hierarchy, MFC windows)
  - City dialog DIB section model
  - Transparent sprite blitting (3-step GDI mask blit)
  - Text rendering (DrawTextA, shadow algorithm, palette-based colors)
  - Color system (256-entry palette dump)
- [Part VI: City Dialog Rendering](#part-vi-city-dialog-rendering)
  - Zoom/scaling system
  - Window dimensions (636x421 content area)
  - All 12 panel rectangles with coordinates
  - Citizens row, resource rows, food storage, production box
  - Units supported, improvements list, info/map/happy panel
  - Button layout with handlers
  - Font system and text/color system
  - Drawing sequence and border rendering
  - Icon spacing algorithm (decompiled)
- [Part VII: Browser Implementation Status](#part-vii-browser-implementation-status)
  - Parser status (complete)
  - Map renderer (~90% complete)
  - City dialog (~75% complete)
  - City view (~80% complete)
  - Game simulation (0% started)
  - Priority integration path
- [Part VIII: Integration Roadmap](#part-viii-integration-roadmap)
  - Phase 1: City dialog enhancement
  - Phase 2: Game formula integration
  - Phase 3: Rendering fidelity
  - Phase 4: Game simulation
  - Phase 5: Full feature parity
  - COSMIC constants reference
  - File mapping (decompiled → browser)

---

## Cross-Reference Guide

| Topic | Primary Location | Also Referenced In |
|-------|-----------------|-------------------|
| City struct fields | Part III-A | Part IV (formulas use city offsets), Part VI (rendering reads city fields) |
| Civilization struct | Part III-B | Part IV (government type, rates, gold treasury) |
| Unit type struct | Part III-B | Part IV (shield costs for rush-buy), Part VII (parser fields) |
| Unit instance struct | Part III-B | Part VII (parser fields, map renderer) |
| Sprite sheet layouts | Part II | Part VI (ICONS.GIF, PEOPLE.GIF sprite coordinates) |
| Save file format | Part II | Part III (struct save/load byte formats) |
| Palette colors (full 256-entry dump) | Part V | Part VI (palette indices used in city dialog text/icons) |
| All game formulas | Part IV | Part VIII (integration priorities and JS implementations) |
| Rush-buy cost | Part IV §1 | Part VI (Buy button handler), Part VIII Phase 1.1 |
| Food growth / granary | Part IV §2 | Part VI (Food Storage panel), Part VIII Phase 1.2 |
| Tile resources | Part IV §3 | Part VI (Resource rows), Part VIII Phase 2 |
| Happiness calculation | Part IV §4 | Part VI (Happy panel mode), Part VII (gap: not yet implemented) |
| Corruption formula | Part IV §5 | Part VIII Phase 2.3 |
| Technology cost | Part IV §6 | Part VIII Phase 2.4 |
| Unit support | Part IV §7 | Part VI (Units Supported panel), Part VIII Phase 2.5 |
| Zoom system | Part VI §A | Part VIII Phase 3.1 |
| Font system | Part V (startup fonts), Part VI §L | Part II (map view fonts) |
| Icon spacing algorithm | Part VI §O | Part VIII Phase 1.3 |
| Drawing sequence | Part VI §N | Part V (compositing sequence) |
| City dialog border | Part VI §Q | Part V (BMP frame analysis) |
| Debug strings / function names | Part I | Part VI (function addresses for each panel) |
| Code region map | Part I | Part IV (formula function addresses), Part VI (city module 0x500-510K) |
| Building improvement IDs | Part IV (§ Building IDs) | Part III-A (improvements bitfield), Part VI (improvements list) |
| COSMIC constants | Part IV (§ Global Variable Map) | Part VIII (constants reference table) |
| Chroma key colors | Part II (per-GIF tables) | Part V (0x808000 olive via SetBkColor) |



---

# Part I: Project Overview & Methodology

> **Source**: `reverse_engineering/reverseEngCiv2EXE.md`
>
> This section documents the reverse engineering of civ2.exe from Civilization II: Multiplayer
> Gold Edition. It covers the binary analysis methodology, Ghidra decompilation results (5,149
> functions, 225K lines of C pseudocode), function renaming (251 functions), and the roadmap
> for integrating decompiled data into the browser game. For the extracted data structures,
> see [Part III](#part-iii-data-structures). For game formulas, see [Part IV](#part-iv-game-formulas--mechanics).

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
| `0x00628370` | 1 (byte) | CitySpiralDX: signed byte[45] city radius X offsets (doubled-X coords) |
| `0x006283A0` | 1 (byte) | CitySpiralDY: signed byte[45] city radius Y offsets |
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

## Current Status (as of 2026-03-03)

- **Phase 1 COMPLETE**: Full binary decompiled via Ghidra, 251 functions renamed
- **Phase 2 COMPLETE**: Struct recovery, game formula extraction, rendering analysis
- **Phase 3 IN PROGRESS**: Integration into browser game (city dialog as proof of concept)
- **5,149 functions** decompiled into readable C pseudocode
- **~4,900 functions** still have generic `FUN_xxxxxxxx` names (need semantic analysis)
- The browser game in `canvas-test-1/` has a save file parser and isometric map renderer already working
- The city dialog (`canvas-test-1/citydialog.js`) renders a functional city screen

## Roadmap — Using Decompiled Data for Browser Game

### Step 1: Struct Recovery (highest priority)

Map the game's core data structures by analyzing field accesses in the decompiled code. These structures are referenced throughout and are essential for validating/extending the save file parser.

| Structure | Base Address | Stride | Priority | Notes |
|---|---|---|---|---|
| City | `0x0064F348` | 0x58 (88 bytes) | **Critical** | Most-referenced; needed for city dialog |
| Civilization | `0x0064C6A2` | 0x594 (1428 bytes) | High | Gold, tech, diplomacy state |
| Unit type table | `0x0064C488` | 0x08 | High | Attack, defense, move, cost |
| Building/improvement | `0x0064B1B8` | 0x14 (20 bytes) | Medium | Names, costs, prerequisites |
| Unit instance | TBD | TBD | Medium | Position, HP, veteran status |
| Tile/terrain | TBD | TBD | Medium | Terrain type, improvements, visibility |

**Method**: Search decompiled code for base address references, track all offsets used with the stride math (e.g., `*(int *)(base + id * 0x58 + 0x14)` means city field at offset 0x14). Cross-reference with existing save file parser fields.

**Known city struct fields so far**:
- Offset 0x31 (from `0x0064F379 = 0x0064F348 + 0x31`): production type
- Offset 0x14 (from `0x0064F35C = 0x0064F348 + 0x14`): shields accumulated

### Step 2: Game Logic Extraction

Convert key game formulas from C pseudocode to documented algorithms:

| Formula | Source Functions | Browser Impact |
|---|---|---|
| Production cost / buy price | `city_button_buy` (0x509B48) | City dialog buy button |
| Resource calculation (food/shields/trade per tile) | Functions in 0x450000-0x4FFFFF | Resource row rendering |
| Combat resolution | Functions in 0x550000-0x5AFFFF | Future combat system |
| City growth (food thresholds) | City module functions | Food storage panel |
| Happiness calculation | City module functions | Citizen face display |
| Technology costs | Functions referencing civ struct | Future tech tree |

### Step 3: Rendering Coordinate Verification

The GDI rendering layer (0x5B0000-0x5DFFFF) contains exact pixel coordinates for all UI panels. Compare against `citydialog.js` positions to catch any discrepancies.

### Step 4: Phase 2 Function Renaming

Use AI agents to analyze function bodies and propose semantic names for the remaining ~4,900 `FUN_xxxxxxxx` functions. Focus on:
- Functions called by already-named functions
- Functions that access known struct fields
- Functions with distinctive string or API patterns not caught by Phase 1

### Step 5: AI Logic (future)

The AI decision-making functions (0x450000-0x4FFFFF) — diplomacy offers, unit movement priorities, city production choices — can eventually be ported for single-player AI opponents.

## Key Files for Future AI Sessions

| File | Purpose |
|---|---|
| `reverse_engineering/reverseEngCiv2EXE.md` | **This file** — start here for RE context |
| `reverse_engineering/decompiled/` | Working copy with renamed functions (read these) |
| `reverse_engineering/decompiled_raw/` | Pristine Ghidra output (never modify) |
| `reverse_engineering/rename_map.json` | Current function name mappings (251 entries) |
| `reverse_engineering/build_rename_map.py` | Script to rebuild rename map from evidence |
| `reverse_engineering/apply_renames.py` | Script to apply renames to working copy |
| `reverse_engineering/Civ2_City_Struct.md` | Complete 88-byte city struct (31 fields) |
| `reverse_engineering/Data_Structures.md` | Civ (1428B), Unit Type (20B), Building (8B), Unit (32B) structs |
| `reverse_engineering/Civ2_Game_Formulas.md` | 7 game formulas with JS implementations |
| `reverse_engineering/City_Dialog_Rendering_Analysis.md` | All panel coords, colors, fonts, drawing sequences from decompiled code |
| `reverse_engineering/Browser_Gap_Analysis.md` | Complete feature inventory + gap list for browser integration |
| `reverse_engineering/Integration_Roadmap.md` | Full plan for integrating RE data into browser app |
| `reverse_engineering/DecompileAll.java` | Ghidra batch export script |
| `canvas-test-1/citydialog.js` | Browser city dialog renderer |
| `canvas-test-1/app.js` | Browser save file parser + map renderer |
| `GDI_Rendering_Pipeline.md` | DDraw proxy hooking findings |
| `Civ2_MGE_Binary_Analysis.md` | File format and sprite layout docs |
| `MEMORY.md` (in .claude project dir) | Cross-session AI memory |


---

# Part II: Save File Format & Asset Formats

> **Source**: `Civ2_MGE_Binary_Analysis.md`
>
> This is the largest section — the comprehensive record of all file formats, sprite sheet
> layouts, save file structure, and rendering pipeline details discovered through binary
> analysis. All findings are from Civ2 MGE version 5.4.0f. For the in-memory data structures
> (as seen by the running executable), see [Part III](#part-iii-data-structures). For the
> GDI rendering pipeline (runtime hooking results), see [Part V](#part-v-gdi-rendering-pipeline).

# Civilization II Multiplayer Gold Edition — Binary Analysis

A comprehensive record of everything discovered through reverse engineering Civilization II save files, executables, and data files during this project. All findings are from **Civ2 Multiplayer Gold Edition (MGE)**, version 5.4.0f, patch 3, dated 26-March-99.

---

## Files Analyzed

### Game Installation Files

| File | Size | Description |
|------|------|-------------|
| `civ2.exe` | 2,489,344 bytes | Main executable. PE32 Intel 80386. Built from `D:\Ss\Franklinton\` (debug path preserved in strings). |
| `XDaemon.dll` | 95,744 bytes | Network/multiplayer library. XDaemon Communications Library v3.5.0, dated 10-Nov-1998. Exports 48 functions for IGZ multiplayer support. |
| `Civ2Art.dll` | 256,512 bytes | Credits/UI art container — 5 embedded GIFs (credits text, starfields, Mesoamerican relief, gray UI panel). Resource-only DLL, debug CRT. Built 1997-04-21. |
| `Tiles.dll` | 1,416,704 bytes | Tile & UI art container — 24 embedded GIFs (civilization backgrounds, historical illustrations, nuke sprite sheet, govt/diplomacy icons, Civ2 seal). Built 1997-04-21. |
| `cv.dll` | 4,980,224 bytes | City View art container — 16 embedded GIFs (building sprites, wonder sprites, vegetation growth, 12 landscape panoramas in 3 terrain × 4 era variants). Built 1997-04-21. |
| `mk.dll` | 3,165,696 bytes | Diplomacy & leader art container — 42 leader portraits (21 civs × 2), 7 throne room backgrounds, military advisor backdrop, 21 CTAB color palettes. Built 1997-04-21. |
| `pv.dll` | 1,999,360 bytes | Palace View art container — 55 embedded GIFs: base palace room + compositable upgrade sprites (walls, floors, columns, thrones, decorations) in 4-tier progression. 2 chroma-key colors. Built 1997-04-21. |
| `ss.dll` | 1,455,616 bytes | Spaceship art container — 46 embedded GIFs: 24 assembly progression views, component sprite sheets (solar panels, beams, pods), Earth/Alpha Centauri scenes, thruster animation. Orange chroma-key. Built 1997-04-21. |
| `Intro.dll` | 1,151,488 bytes | Intro slideshow art container — 13 embedded GIFs: historical engravings, photographs, and a satellite view, all with gold picture-frame borders. Displayed once at game launch. Built 1997-04-21. |
| `Wonder.dll` | 185,856 bytes | Wonder indicator art container — 28 embedded GIFs (74×74 each): one color-tinted panel per wonder for the wonder tracking UI. Smallest resource-only DLL. Built 1997-04-21. |
| `timerdll.dll` | 131,072 bytes | SMEDS engine timer callback DLL (internal name: CALLBACK.dll). Pure code, no resources. 6 exports for multimedia timer→PostMessage bridge. 16 timer slots. Debug build from `D:\SS\Smeds32\timer\`. Built 1997-03-17. |
| `Civ2Map.exe` | — | Map editor executable. |

### Data Files

| File | Size | Description |
|------|------|-------------|
| `LEADERS.TXT` | 2,426 bytes | Defines all 21 civilizations: leader names (male/female), tribe name, adjective, AI personality values, government title overrides. |
| `RULES.TXT` | 26,906 bytes | Core game rules — units, buildings, techs, terrain modifiers. |
| `Game.txt` | 108,656 bytes | UI strings, game text, dialog messages. |
| `CITY.TXT` | — | City name lists per civilization. |
| `PEDIA.TXT` | — | Civilopedia text entries. |
| `HERALD.TXT` | — | Herald/announcement text. |
| `HELP.TXT` | — | In-game help text. |
| `DEBUG.TXT` | — | Debug message templates (reveals internal state variable names). |

### Graphics Files

All main sprite sheets are 640×480 pixels, GIF87a format with 256-color indexed palettes. Sprites are arranged in a 10-column × 15-row grid of 64×32 pixel cells (isometric diamond format). **Two different chroma-key colors** are used for transparency:

| File | Size | Chroma Key | Description |
|------|------|-----------|-------------|
| `TERRAIN1.GIF` | 46,452 | Cyan (0,255,255) idx 248 | Base terrain tiles, improvements, resources, roads, railroads |
| `TERRAIN2.GIF` | 55,966 | Magenta (255,0,255) idx 253 | Terrain overlays: forests, mountains, hills, rivers, coastlines |
| `UNITS.GIF` | 54,012 | Magenta idx 253 + Purplish-gray (135,83,135) idx 255 | All 52 unit types + modding instructions; civ-color via idx 251-252 (red shades) |
| `CITIES.GIF` | 46,452 | Magenta idx 253 + Cyan (0,255,255) idx 236-249 | Map-view city sprites by era × style × size |
| `CITY.GIF` | 66,152 | — | City view screen sprites |
| `PEOPLE.GIF` | 21,227 | Magenta (255,0,255) idx 253 | Citizen type faces by era (92% chroma = mostly empty) |
| `ICONS.GIF` | 54,098 | Magenta (255,0,255) idx 253 | UI icons: wonder thumbnails, government icons, misc |
| `EDITORS*.GIF` | ~35K each | — | Map editor graphics (4 files for different map projections) |

#### TERRAIN1.GIF Sprite Layout

The game embeds text labels directly in the sprite sheet. Layout confirmed by visual inspection:

| Row | Col 0–8 | Col 9 |
|-----|---------|-------|
| 0 | **Desert** base tiles (9 variants) | Desert variant |
| 1 | **Plains** base tiles (9 variants) | Plains variant |
| 2 | **Grassland** base tiles (9 variants) | Grassland variant |
| 3 | **Forest** base filler tiles (9 variants) | **Irrigation** improvement |
| 4 | **Hills** base filler tiles (9 variants) | **Farmland** improvement |
| 5 | **Mountains** base filler tiles (9 variants) | **Mining** improvement |
| 6 | **Tundra** base tiles (9 variants) | **Pollution** overlay |
| 7 | **Arctic/Glacier** base tiles (9 variants) | **Resource** (Grassland special) |
| 8 | **Swamp** base tiles (9 variants) | Swamp variant |
| 9 | **Jungle** base tiles (9 variants) | Jungle variant |
| 10 | **Ocean** base tiles (9 variants) | Ocean variant |
| 11 | Coastline/transition tiles | More transitions |
| 12 | **Road** sprites (directional, 8+ directions) | Road variants |
| 13 | **Railroad** sprites (directional) | Railroad variants |
| 14 | Dither pattern, Mouse cursors, Blank, "Mouse 2" | Utility sprites |

**Rows 0–10 correspond directly to terrain type IDs 0–10** from the save file. The game selects among the 9 column variants using map position or terrain flags to avoid visual repetition.

**Tile compositing order** (back to front): Base terrain (TERRAIN1 rows 0-10) → Coastline transitions (TERRAIN2 bottom section, 4-quadrant system with 32×16 sub-tile sprites) → Rivers (TERRAIN2 rows 2-3, neighbor-computed) → Terrain overlays (TERRAIN2: forests, hills, mountains) → Roads/Railroads (TERRAIN1 rows 11-12, neighbor-computed) → Improvements (TERRAIN1 col 9: irrigation/farmland/mining) → Resource icons → City sprite → Unit sprite. See detailed Rendering Pipeline section at end of document.

#### TERRAIN2.GIF Sprite Layout

Contains overlay sprites composited on top of base terrain. Uses magenta chroma key.

| Row | Content |
|-----|---------|
| 0–1 | **Tile connection masks** (labeled "tile connections") — Green line segments (palette index 254) on magenta diamonds showing which diamond edges connect to land vs water. Purpose unclear; the 4-quadrant coastline sprites (y=429–479) produce correct results without these masks. May be used by the game engine for additional blending. |
| 2–3 | **River sprites** — 16+ pre-combined directional river sprites for 4-bit neighbor mask (bit 0=NE, bit 1=SE, bit 2=SW, bit 3=NW). Mask computed at render time from adjacent river tiles (byte[0] & 0x80). Plus 2 extra variant/label cells (col 8 labeled "rivers"). |
| 4–5 | **Forest** overlay sprites — 16 art variants (8 per row, col 0-7). Composited over Forest base (TERRAIN1 row 3). Col 8 = label "10". |
| 6–7 | **Mountain** overlay sprites — 16 art variants (8 per row). Composited over Mountains base (TERRAIN1 row 5). Col 8 = label "9". |
| 8–9 | **Hill** overlay sprites — 16 art variants (8 per row). Composited over Hills base (TERRAIN1 row 4). Col 8 = label "12". |
| 10 | **River Mouths** — 4 directional sprites (cols 0-3: NE, SE, SW, NW). Drawn on ocean tiles where a diagonal neighbor is land with a river. Remaining cols contain terrain color reference swatches. |
| 11+ (bottom) | **Coastline rendering section** — Uses a **4-quadrant system** with 32 small sub-tile sprites (8 groups × 4 pieces). Rows 11-12 (y=364-410): Encoding DIAGRAMS with "w"/"l" labels (reference only, NOT renderable art). Art sprites on 33px column grid: Row at y=429 = TOP quadrant pieces (p0), Row at y=446 = BOTTOM quadrant pieces (p1), Row at y=463 = LEFT (p2, even cols) + RIGHT (p3, odd cols) quadrant pieces. Each group (0-7) represents a 3-bit neighbor pattern; each quadrant checks 3 neighbors in **clockwise order** around its edge. See Rendering Pipeline for full algorithm. Also in bottom section: River Mouths sprites, color swatches, ocean wave textures, and a "new 25" grassland variant. |

#### UNITS.GIF Sprite Layout

63 standard unit cells (9 columns × 7 rows). Unit type IDs from save file byte +6 map to sprite positions via `col = type % 9`, `row = type // 9`. The rightmost 55px of the image (x=585–639) contains the shield/flag template, not a 10th column.

| Row | Col 0 | Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 | Col 8 |
|-----|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| 0 | Settlers(0) | Engineers(1) | Warriors(2) | Phalanx(3) | Archers(4) | Legion(5) | Pikemen(6) | Musketeers(7) | Fanatics(8) |
| 1 | Partisans(9) | Alpine(10) | Riflemen(11) | Marines(12) | Paratroop(13) | Mech Inf(14) | Horsemen(15) | Chariot(16) | Elephant(17) |
| 2 | Crusaders(18) | Knights(19) | Dragoons(20) | Cavalry(21) | Armor(22) | Catapult(23) | Cannon(24) | Artillery(25) | Howitzer(26) |
| 3 | Fighter(27) | Bomber(28) | Heli(29) | Stealth F(30) | Stealth B(31) | Trireme(32) | Caravel(33) | Galleon(34) | Frigate(35) |
| 4 | Ironclad(36) | Destroyer(37) | Cruiser(38) | AEGIS(39) | Battleship(40) | Submarine(41) | Carrier(42) | Transport(43) | Cruise M(44) |
| 5 | Nuke(45) | Diplomat(46) | Spy(47) | Caravan(48) | Freight(49) | Explorer(50) | ExtraLand(51) | *custom*... | |
| 6 | Additional custom unit slots and modding instruction text | | | | | | | | |

**Unit sprite indexing**: Unit type ID from save file = `row * 9 + col` for rows 0–5. Types 0–51 are standard; types 52+ are mod-defined custom units.

**UNITS.GIF palette (confirmed via Civ2-clone `UnitLoader.cs`)**:

| Index | RGB | Purpose |
|-------|-----|---------|
| 250 | (0,0,255) blue | **Flag marker** — embedded in 1px green border to encode shield position per unit cell |
| 251 | (127,0,0) dark red | **Dark civ-color placeholder** — replaced with owning civ's dark shade at render time |
| 252 | (255,0,0) pure red | **Light civ-color placeholder** — replaced with owning civ's light shade at render time |
| 253 | (255,0,255) magenta | Transparent background inside diamond |
| 254 | (0,255,0) green | Grid border lines (1px between cells) |
| 255 | (135,83,135) purplish-gray | Transparent background outside diamond — **differs from TERRAIN GIFs' (135,135,135)** |

**Shield/flag system** (confirmed via Civ2-clone): Each unit cell encodes its shield position using a blue pixel (idx 250) in the 1px green border. The flag X is found by scanning the top border row for the first non-green pixel, flag Y by scanning the left border column. Shield templates are extracted from the right edge of UNITS.GIF and recolored per-civ using the idx 251/252 replacement.

**Shield templates** in right margin (x=585–639):

| Name | Rectangle (x, y, w, h) | Notes |
|------|------------------------|-------|
| backShield1 | (586, 1, 12, 20) | Primary shield template — used for front/back/shadow |
| backShield2 | (599, 1, 12, 20) | Second variant (unused in Civ2-clone) |
| HPshield | (597, 30, 12, 20) | HP overlay (unused in Civ2-clone) |

Three images are derived from backShield1 at render time:
- **ShieldFront**: top 7 rows filled black (HP bar + order letter background), bottom 13 rows recolored to civ color
- **ShieldBack**: unchanged template recolored to civ color (stacking indicator)
- **ShieldShadow**: civ-color pixels replaced with dark gray rgb(51,51,51), drawn offset behind shields

**Key modding notes embedded in UNITS.GIF text**:
- "Units cannot overlap the area below the main diamond"
- "ONLY colors in palette (only) are for players' (border) (xt.ext=shield)"
- "Borders & writing may be changed to any RGB but must be last 3 colors of palette"

#### CITIES.GIF Sprite Layout

City sprites organized by **era** (rows) × **architectural style** (columns) × **walled/open** (left vs right half). Grid: **65×49 pixel cells** (64×48 sprite + 1px border).

**Two halves** (confirmed from header text "Open" and "Walled"):
- **Left half** (x = 0–260): Open (unwalled) cities, 4 style columns
- **Center** (x = 260–333): Era label column with green text
- **Right half** (x = 333–593): Walled cities, 4 style columns

**Era rows** (confirmed from embedded text labels in center column):

| Row | Y Start | Label | Content |
|-----|---------|-------|---------|
| 0 | 39 | STONE/BRONZE | Primitive structures, huts |
| 1 | 88 | ANCIENT/CLASSICAL | Temples, pyramids, classical buildings |
| 2 | 137 | FAR EAST | Asian-style architecture (may be style-specific) |
| 3 | 186 | MEDIEVAL | Castles, cathedrals, stone buildings |
| 4 | 235 | EARLY INDUSTRIAL | Factories, brick buildings |
| 5 | 284 | MODERN | Skyscrapers, glass buildings |
| 6 | 333+ | MODERN ALT | Alternative modern sprites |

**Bottom section** (y ≈ 395+, confirmed from embedded labels): FLAGS (civ color swatches), FORTIFY icon, FORTRESS sprite, AIRBASE sprite (2 variants), plus 2 large city sprites.

**CITIES.GIF transparency**: Uses **three** chroma key colors — magenta (255,0,255) idx 253, cyan (0,255,255) idx 236-249, and gray (135,135,135) idx 255. The cyan indices are transparent in CITIES.GIF (unlike UNITS.GIF where they are fixed colors). Bright green grid lines should also be removed.

#### PEOPLE.GIF Sprite Layout

Citizen face sprites for the city management screen, organized by era. Only rows 0–4 contain sprites; rows 5–14 are empty magenta.

**Grid structure**: 11 columns × 5 rows, cell size **27×30 pixels**, with 1px black (idx 192) borders.
- Cell origin formula: `x = 2 + 28 * col, y = 6 + 31 * row`
- Horizontal stride: 28px (27px face + 1px border)
- Vertical stride: 31px (30px face + 1px border)
- Chroma key: magenta (255,0,255) idx 253

**Row → Era mapping** (same thresholds as city epoch):

| Row | Era | Trigger |
|-----|-----|---------|
| 0 | Ancient | Default |
| 1 | Renaissance | Invention AND Philosophy |
| 2 | Industrial | Industrialization |
| 3 | Modern | Automobile AND Electronics |
| 4 | Extra specialists | (see below) |

**Column → Citizen type mapping** (source: Civ2-clone `PeopleType` enum):

| Col | Type | Notes |
|-----|------|-------|
| 0 | Happy male | Even citizen positions |
| 1 | Happy female | Odd citizen positions |
| 2 | Content male | Even positions |
| 3 | Content female | Odd positions |
| 4 | Unhappy male | Even positions |
| 5 | Unhappy female | Odd positions |
| 6 | Angry male | Anarchy only (even) |
| 7 | Angry female | Anarchy only (odd) |
| 8 | Entertainer | Specialist (Elvis) |
| 9 | Taxman | Specialist |
| 10 | Scientist | Specialist |

The game alternates male/female faces by citizen slot index (even=male, odd=female) for the first 4 types. Specialists always show their specific face.

Row 4 contains 7 additional specialist-variant faces (cols 0–6 populated, cols 7–10 empty). These appear to be alternate specialist representations.

Source: Civ2-clone `Enums/PeopleType.cs`, `Draw.CityPanel.cs`, `Civ2GoldInterface.cs`

#### ICONS.GIF Sprite Layout

640×480 UI icon sheet containing resource icons, improvement/wonder thumbnails, advance category icons, battle animation frames, and map grid sprites. Chroma key: magenta (255,0,255) idx 253 and light pink (255,159,163) idx 255.

**Resource icons (14×14px)** — used in city screen resource rows:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Hunger | 1 | 290 | Food loss (starvation) |
| Shortage | 16 | 290 | Shield loss (unit support) |
| Corruption | 31 | 290 | Trade loss (corruption/waste) |
| Food | 1 | 305 | Food production |
| Shields | 16 | 305 | Shield/production output |
| Trade | 31 | 305 | Trade arrows |
| Luxury | 1 | 320 | Luxury output |
| Tax/Gold | 16 | 320 | Tax/gold output |
| Science | 31 | 320 | Science beakers |

**Small resource icons (10×10px)** — used on city radius mini-map tile overlays:

| Icon | x | y |
|------|---|---|
| Food (small) | 49 | 334 |
| Shield (small) | 60 | 334 |
| Trade (small) | 71 | 334 |

**Research progress indicators (14×14px)**: 4 icons at y=290, x = 49 + 15×i (i=0–3).
**Global warming indicators (14×14px)**: 4 icons at y=305, x = 49 + 15×i (i=0–3).

**Improvement thumbnail icons (36×20px)** — shown in city improvements list:
- Grid origin: (343, 1), horizontal stride 37px, vertical stride 21px
- Layout: 5 rows × 8 columns = 40 slots (indices 1–38 used; slots 39–40 empty)
- Formula: `x = 343 + 37 * ((index - 1) % 8), y = 1 + 21 * Math.floor((index - 1) / 8)`
- Index matches RULES.TXT @IMPROVE order (1=Palace through 38=last improvement)

**Wonder thumbnail icons (36×20px)** — shown in city improvements list for wonders:
- Grid origin: (343, 106), same stride (37×21)
- Layout: 4 rows × 7 columns = 28 slots (all 28 wonders)
- Formula: `x = 343 + 37 * (wonderIndex % 7), y = 106 + 21 * Math.floor(wonderIndex / 7)`
- Index 0–27 matches wonderCityIds order (0=Pyramids through 27=Cure for Cancer)

**Advance category icons (36×20px)** — used in Civilopedia technology display:
- Grid origin: (343, 211), same stride (37×21)
- Layout: 5 rows × 4 columns = 20 slots

**Battle animation (32×32px)**: 8 frames at `x = 1 + 33 * i, y = 356` (i=0–7).

**Status/event icons (32×32px)** — used in game event notifications:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Toxic triangle | 67 | 223 | Global warming / pollution warning |
| Revolt fist | 166 | 223 | Civil disorder indicator |
| Bomb | 199 | 223 | Espionage / sabotage |
| Scythe | 232 | 223 | Famine / starvation |

**Stone background tiles (32×32px)** — used for dialog/panel textures:

| Tile | x | y | Notes |
|------|---|---|-------|
| Stone variant 1 | 265 | 223 | |
| Stone variant 2 | 298 | 223 | |
| Stone variant 3 | 298 | 190 | |

**Title bar wallpaper tile (64×32px)**: (199, 322) — tiled across city dialog title bar background. Distinct stone texture from the main CITY.GIF wallpaper.

**Window control icons (16×16px)** — city dialog title bar buttons:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Close window | 1 | 389 | Closes the city dialog |
| Zoom out | 18 | 389 | Decrease city dialog zoom level |
| Zoom in | 35 | 389 | Increase city dialog zoom level |
| Unknown (gray) | 52 | 389 | Unused / placeholder |

**Blank button templates (16×16px)**: 7 gray squares with concentric gray/black outlines starting at (69, 389), stride 17px. Generic button background sprites.

**City navigation arrows (18×24px)** — prev/next city buttons in city dialog bottom-right:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Next city (▲) | 227 | 389 | Navigate to next city |
| Prev city (▼) | 246 | 389 | Navigate to previous city |

**Map grid sprites (64×32px)**:

| Sprite | x | y | Notes |
|--------|---|---|-------|
| Grid lines (default) | 183 | 430 | Green diamond outline (palette 254) |
| Grid lines (visible) | 248 | 430 | Alternate grid rendering |
| ViewPiece | 199 | 256 | Selection/cursor indicator |

Source: Civ2-clone `Civ2GoldInterface.cs` PicSources, `IconLoader.cs` extraction rects, manual ICONS.GIF inspection

#### City Management Screen Layout

The city management dialog is a **636×421 pixel** window (at normal zoom, cityZoom=0). It supports three zoom levels: −1 (small), 0 (normal), +1 (large). All coordinates below are for zoom=0. Scaling formula: `value × (2 + cityZoom) / 2`.

Sprite sources: **ICONS.GIF** (resource icons, improvement/wonder thumbnails), **PEOPLE.GIF** (citizen faces), **CITIES.GIF** (unit sprites), **UNITS.GIF** (unit sprites in garrisoned/supported displays).

```
+--------+-------------------+-----------------------------------+-------------------+
|        |   Citizens Box    |                                   |    Food Storage   |
| Close  |   (3,2,433,44)    |         City Resources            |  (437,0,195,163)  |
| ZoomIn |   Citizen faces   |    Food/Trade/Tax+Lux+Sci/Shlds  |   Wheat icons     |
| ZoomOut|                   |                                   |   (granary line)  |
+--------+-------------------------------------------+-----------+-------------------+
|        Tile Map / Resource Map                     |           |   Production Box  |
|        (7,65,188,137)                              |           | (437,165,195,191) |
|        Isometric mini-map showing                  |           | [Buy] [Change]    |
|        21 tiles around city                        |           | Item + shield bar |
+----------------------------+-----------------------+-----------+-------------------+
| Units Supported            | Info Panel                        |                   |
| (7,215,184,69)             | (193,215,242,198)                 |                   |
| Up to 8 supported units    | Toggleable:                       |                   |
|                            |  - Units Present                  |                   |
|                            |  - Happiness Analysis             |                   |
+----------------------------+-----------------------------------+                   |
| City Improvements          | Trade routes / Supplies+Demands   |                   |
| (5,306,170,108)            |                                   |                   |
| Scrollable list with       +-----------------------------------+                   |
| 36x20 improvement icons    | [Info] [Map] [Rename]             |                   |
| and sell buttons            | [Happy] [View] [Exit]             |                   |
+----------------------------+-----------------------------------+-------------------+
```

##### Citizens Box (3, 2, 433×44)

Row of citizen face sprites drawn from PEOPLE.GIF. Each face is 27×30 pixels. The game draws citizens left-to-right in order: happy, content, unhappy, specialists. Male/female faces alternate by slot index (even=male col, odd=female col).

Face spacing decreases as city size grows (source: `Draw.CityPanel.cs`):

| City Size | Spacing (px) |
|-----------|-------------|
| 1–15 | 28 |
| 16–32 | 14 |
| 33–63 | 7 |
| 64–100+ | 3–4 |

Each face is drawn with a 1px black drop shadow (offset +1,+1).

##### City Resources (center area, ~203–431, 61–195)

Four rows of resource icons from ICONS.GIF (14×14px each). Each row shows a count of icons; icon spacing decreases as count increases (15px for 1–15 icons, down to 2px for 66+).

| Row | y (approx) | Left Icons | Right Icons |
|-----|-----------|-----------|-------------|
| Food | ~75 | Food icons (green) | Surplus or Hunger (red) |
| Trade | ~117 | Trade arrows (yellow) | Corruption icons |
| Tax+Lux+Sci | ~141 | Tax (gold), Luxury (blue), Science (beaker) | Combined on one row |
| Support/Production | ~181 | Support shields (unit maintenance) | Production shields |

Text labels above each row show names and numeric values (e.g., "Food: 12", "Surplus: 3").

##### Tile Map / City Radius (7, 65, 188×137)

Isometric mini-map showing the 21 tiles in the city's working radius (a "fat cross" diamond pattern from −3 to +3 relative tile offsets). Rendering order:

1. Draw blank/placeholder tiles for all 21 positions
2. For each position with known terrain, draw actual terrain tile (scaled)
3. If a city occupies the tile, draw its sprite; else if military units present, draw top unit
4. On **worked** tiles, overlay small resource icons (10×10px from ICONS.GIF): food, then shields, then trade — centered horizontally, spacing adjusts by total icon count (11px for 1–2, down to 1px for 10+)

The 21-tile diamond shape (relative to city at 0,0):
```
        (-2,-3)(-1,-3)
    (-3,-2)(-2,-2)(-1,-2)(0,-2)
(-3,-1)(-2,-1)(-1,-1)(0,-1)(1,-1)
    (-3,0)(-2,0)(-1,0)(0,0)(1,0)
(-3,1)(-2,1)(-1,1)(0,1)(1,1)
    (-2,1)(-1,1)(0,1)(1,2)
        (-1,2)(0,2)
```
(Note: actual offsets follow isometric coordinate system with stagger)

##### Food Storage Box (437, 0, 195×163)

Grid of wheat/food icons (14×14px, Food icon from ICONS.GIF) representing food stored toward city growth. Layout:
- Columns: equal to city size (number needed for growth)
- Rows: up to 10 (wraps when columns exceed display width)
- Filled icons: count = `city.foodInBox`
- **Granary line**: a green horizontal divider at the halfway point if the city has a Granary improvement (food carries over the line on growth)

##### Production Box (437, 165, 195×191)

Shows the item currently being produced:
- **Unit production**: draws the unit sprite (from UNITS.GIF) with civ coloring
- **Improvement/Wonder production**: draws the improvement thumbnail (36×20 from ICONS.GIF) plus name text
- **Shield progress grid**: grid of shield icons (14×14 from ICONS.GIF) showing `shieldsInBox` filled out of the total cost
- **Buy** and **Change** buttons at top

##### Units Supported (7, 215, 184×69)

Shows up to 8 supported units (those with `homeCityId` = this city's array index) as small unit sprites in a 4×2 grid. Each unit is rendered as its UNITS.GIF sprite (scaled to ~30×23), with civ-color recoloring.

##### Info Panel (193, 215, 242×198)

Toggleable display with multiple modes:
- **Units Present**: shows units garrisoned in the city (up to ~18 small unit sprites)
- **Happiness Analysis**: breakdown of happiness modifiers (base, improvements, wonders, luxury, entertainers)
- **Trade/Supply info**: available and demanded commodities, active trade routes

##### City Improvements List (5, 306, 170×108)

Scrollable list of built improvements and wonders. Each row contains:
- 36×20 thumbnail icon (from ICONS.GIF improvement/wonder grids)
- Improvement name text
- Sell button (for non-wonders; selling returns half the cost)

Improvements use the thumbnail grid at ICONS.GIF (343, 1), wonders use the grid at (343, 106). The list is scrollable if the city has more improvements than fit in the display area (~5 visible rows).

##### Buttons (bottom row)

6 buttons along the bottom of the window:
- **Info**: toggle info panel mode
- **Map**: toggle support map (world mini-map)
- **Rename**: rename city
- **Happy**: toggle happiness analysis
- **View**: open panoramic city view (cityview.js)
- **Exit**: close city window

Source: Civ2-clone `CityWindow.cs`, `Civ2Interface.cs` `GetCityWindowDefinition()`, `Draw.CityPanel.cs`

#### Fonts & Map UI Element Dimensions

Civ2 MGE uses standard Windows system fonts — no custom bitmap fonts. Confirmed via Win32 `CreateFontA` API calls and Civ2-clone issue #55 ("Civ2 uses 2 fonts: Times new roman + Arial"). Sources: Civ2-clone `Helpers.cs`, `Fonts.cs`, `MapControl.cs`, `TextElement.cs`, `Civ2GoldInterface.cs`; CivFanatics forum thread "Help with Fonts" (Mercator).

**Fonts used on the map view:**

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Unit shield order letter | Arial | 13px | Normal | Black |
| City population size number | Times New Roman | 14px | Bold | Black |
| City name label | Times New Roman | 20px | Normal | Civ text color (with 1px black drop shadow) |

**Unit shield layout** (12×20px, from backShield1):

| Component | Position (relative to shield top-left) | Size | Details |
|-----------|----------------------------------------|------|---------|
| Black top area | (0, 0) | 12×7 | Filled black on ShieldFront only |
| HP bar | (0, 2) | 12×3 | Green rgb(87,171,39) if >8px, yellow rgb(255,223,79) if 4–8px, red rgb(243,0,0) if ≤3px. Width = floor(curHP/maxHP × 12) |
| Order letter | (6, 7) centered | 13px tall area | Arial normal, black. Letter from orders byte: 1/2/4→F, 3→S, 5→R, 6→I, 7→m, 8→O, 9→p, 10→E, 11→G, else→- |
| Shadow offset | (±1, 1) | 12×20 | Dark gray rgb(51,51,51). Direction mirrors stacking side |
| Stacking offset | (±4, 0) | 12×20 | ShieldBack drawn behind ShieldFront. ±4 based on shield X < 32 |

**City size box layout** (dynamic width, 14px tall):

| Component | Details |
|-----------|---------|
| Box size | Width = MeasureText(sizeStr).width, Height = 14 (font size). No padding |
| Box fill | Civ text color (from CITIES.GIF y=423 color strips) |
| Box border | 1px black outline, extends 1px beyond fill on left and right sides only |
| Text | Times New Roman Bold 14px, black, top-left aligned with fill rectangle |
| Position | Orange marker pixel (idx 249, rgb 255,155,0) in CITIES.GIF cell border |

**City name label** (drawn in separate pass, on top of everything):

| Component | Details |
|-----------|---------|
| Font | Times New Roman 20px, normal weight, spacing=1 |
| Shadow | 1px black drop shadow at offset (1, 1) |
| Foreground | Civ text color |
| Position | Centered horizontally on city sprite, vertically at bottom of sprite |

**Orange marker pixel system** (city size box positioning): Analogous to the blue marker pixel for unit shields. Orange pixel rgb(255,155,0) (palette idx 249) embedded in the 1px green border around each city sprite cell in CITIES.GIF. X found by scanning top border row, Y by scanning left border column. Gives the top-left corner of the size box relative to the sprite cell.

### Scenario Files

| File | Description |
|------|-------------|
| `ROME.SCN`, `WWII.SCN` | Pre-built scenarios. |
| `EUROPE.MP`, `GREECE.MP`, `MEDITERR.MP`, `PACIFIC.MP`, `WORLD.MP`, `WORLD_M.MP`, `WORLD_S.MP` | Map templates at various sizes. |

### Save Files Analyzed

Multiple `.SAV` files from different game stages have been analyzed to map the binary format. All share the same structural layout described below.

### Network/Runtime Files

| File | Size | Description |
|------|------|-------------|
| `CIV2.DAT` | 516 bytes | Runtime game configuration. Contains player name, local IP address, game parameters. |
| `Na_Auto.NET` | 71,111 bytes | Network autosave. Same `CIVILIZE` header as `.SAV` files. |
| `Na_Auto2.NET` | 71,023 bytes | Second network autosave. |
| `smeds.log` | — | Game engine log. Records version, network events, data fix-ups. |
| `XDaemon.log` | — | Network library log. Records connection events, timestamps. |
| `HALLFAME.DAT` | — | Hall of Fame records. |

---

## Save File Format (.SAV) — Deep Dive

All `.SAV` files (including `.NET`, `.HOT`, `.EML` network/multiplayer variants) share the same binary structure. The layout consists of seven sequential sections. Section offsets are **not fixed** — they shift depending on the number of civilizations, units, and cities in the game. The structure must be navigated using the header fields and known record sizes.

### Overall File Layout

The layout below applies to `.SAV`, `.NET`, `.HOT`, and `.EML` files. `.SCN` files share the same structure but with shorter per-civ blocks, shorter unit/city records, and different map header offsets — see "SCN vs SAV Structural Differences" below.

```
┌─────────────────────────────────────────────────┐
│ 1. Header (14 bytes, fixed)                     │  0x0000
├─────────────────────────────────────────────────┤
│ 2. Game State Preamble (330 bytes, SAV/NET)     │  0x000E
│    (316 bytes for SCN files)                    │
├─────────────────────────────────────────────────┤
│ 3a. Per-Civ Name Blocks (8 × 242 bytes)        │  0x0156 (SAV/NET)
│                                                 │  0x0148 (SCN)
├─────────────────────────────────────────────────┤
│ 3b. Per-Civ Data Blocks (8 × 1,428 bytes)      │  0x08E6 (SAV/NET)
│     Last block truncated by 2 bytes             │  0x08D8 (SCN, 8 × 1,396)
├─────────────────────────────────────────────────┤
│ 4a. Map Header (14 bytes)                       │  13702/0x3586 (SAV/NET)
│                                                 │  13432/0x3478 (SCN)
├─────────────────────────────────────────────────┤
│ 4b. Block 1: Per-Civ Known Improvements         │  map_header + 14
│     (map_size × 7 bytes)                        │
├─────────────────────────────────────────────────┤
│ 4c. Block 2: TERRAIN DATA ← use this!           │  Block 1 end
│     (map_size × 6 bytes)                        │
├─────────────────────────────────────────────────┤
│ 4d. Block 3: Quarter-Resolution Data            │  Block 2 end
│     (quarter_width × quarter_height × 2)        │
├─────────────────────────────────────────────────┤
│ 4e. 1024-Byte Padding                           │
├─────────────────────────────────────────────────┤
│ 5. Unit Records (num_units × 32 bytes, SAV/NET) │  varies
│    (num_units × 26 bytes for SCN)               │
├─────────────────────────────────────────────────┤
│ 5b. Bridge Record (32 bytes, fixed)             │
├─────────────────────────────────────────────────┤
│ 6. City Records (num_cities × 88 bytes, SAV/NET)│  varies
│    (num_cities × 84 bytes for SCN)              │
├─────────────────────────────────────────────────┤
│ 7. Tail Data (see table below for sizes)        │  EOF - tail_size
└─────────────────────────────────────────────────┘
```

#### Tail Size by File Type

| File Type | Tail Size | Condition |
|-----------|-----------|-----------|
| Standard `.SAV` | **1,807 bytes** | `header[0x0D] & 0x01 == 0` |
| Scenario `.SAV` | **1,907 bytes** | `header[0x0D] & 0x01 == 1` |
| `.SCN` | **1,907 bytes** | Always scenario |
| `.NET` | **2,979 bytes** | Network autosave |

Combined with the city count at header offset `0x3C`, the unit count at offset `0x3A`, and the confirmed record sizes, the entire file can be navigated from the end:

```
# For SAV/NET files (32-byte units, 88-byte cities):
tail_size         = { 1807 if standard SAV, 1907 if scenario SAV, 2979 if NET }
tail_start        = file_size - tail_size
gap_record        = tail_start - 32                     # 32-byte record before tail
city_block_start  = gap_record - (num_cities × 88)
unit_block_start  = city_block_start - (num_units × 32)

# For SCN files (26-byte units, 84-byte cities):
tail_size         = 1907
gap_record        = file_size - tail_size - 32
city_block_start  = gap_record - (num_cities × 84)
unit_block_start  = city_block_start - (num_units × 26)
```

Note: `map_height` is a **single byte** at offset `0x0C` (not uint16). **However**, for tile data calculations, always use the map data header (offset 13702 for SAV/NET, 13432 for SCN), not the file header at 0x0A/0x0C. The end-of-file navigation shown above is useful for locating city and unit blocks, but tile block size should be calculated as `map_size × 6` where `map_size` comes from the map header.

### Section 1: Header (Bytes 0x0000–0x000D, 14 bytes, fixed)

> **⚠️ CRITICAL: DO NOT USE THESE DIMENSIONS FOR MAP RENDERING OR TILE DATA.**
>
> The map width (0x0A) and height (0x0C) in this file header **do not match** the map data header, and they **cannot be used** to calculate tile offsets, tile counts, or coordinate mappings. For example, a file header may say `width=44, height=63` while the map data header says `map_width2=80, map_height=50` (a 40×50 tile grid with 2,000 tiles — not 22×63 = 1,386).
>
> Using the wrong dimensions cascades into every subsequent calculation: wrong Block 2 offset, wrong terrain reads, wrong city-to-tile mapping, and a completely garbled map.
>
> **For ALL map-related work, use the map header at offset 13702.** See Section 4.

| Offset | Size | Field | Values Observed |
|--------|------|-------|-----------------|
| 0x0000 | 8 bytes | Magic signature | `CIVILIZE` (ASCII) |
| 0x0008 | 1 byte | Null separator | Always `0x00` |
| 0x0009 | 1 byte | Format marker | Always `0x1A` (ASCII SUB character) |
| 0x000A | 2 bytes | **Version / Map width** (uint16 LE) | Höfelt bytes 10-11. Dual interpretation: game version AND map width. `0x0027` (39) = CiC or lower, `0x0028` (40) = FW, `0x002C` (44) = MGE patch 1.3, `0x0031` (49) = ToT 1.0, `0x0032` (50) = ToT 1.1. For MGE, this is `44` in all saves analyzed. |
| 0x000C | 1 byte | **Map height** | Height in tiles. Single byte (NOT uint16). Standard=`63`, large=`191`. |
| 0x000D | 1 byte | Flags | Bitmask: **Bit 0** = scenario flag (game loaded from `.SCN`). **Bit 7** = large map flag. Observed: `0x00` = standard game, `0x81` = scenario on large map. |

Notes:
- **Previous documentation error corrected**: Bytes 0x08 and 0x09 were previously described as "separator 0x1A" and "version 0x2C". In reality, 0x08 is a null byte (`0x00`) and 0x09 is `0x1A`. The value `0x2C` (44) at offset 0x0A is the map width, not a version number.
- `.NET` files (network autosaves), `.HOT` (hot-seat), and `.EML` (email play) files all share the same `CIVILIZE` header and binary structure as `.SAV` files.
- `.SCN` files (original scenario data before being loaded as a game) also use `CIVILIZE` but have a **different internal structure** — see "SCN vs SAV Structural Differences" below.
- `.MP` files (map templates) do **NOT** use the `CIVILIZE` header — see "Map Template File Format (.MP)" below.
- **These dimensions disagree with the map data header.** The file header values at 0x0A/0x0C do not match the map data header. Key observations:
  - File header width `44` ≈ `map_width2 / 2 + 4` (i.e., 80/2 + 4 = 44). The "+4" is unexplained.
  - File header height varies: `63` for standard maps, `191` for large maps. Neither has an obvious arithmetic relationship to the actual `map_height`.
  - The formula `total_tiles = (width × height) / 2` using file header values is **incorrect** for tile data purposes.
- **For all map rendering, tile data navigation, and city coordinate mapping: always use the map data header.** See Section 4.

### Section 2: Game State (Bytes 0x000E–variable)

This section contains global game parameters: toggle options, player settings, technology data, and wonder data. It extends from the end of the header to the start of the civilization name blocks. Its total size is 330 bytes for SAV/NET or 316 bytes for SCN.

> **Note on offsets**: Höfelt uses 1-indexed **decimal** byte numbers counted from the start of the save file. To convert: `hex_offset = decimal_byte - 1`. For example, Höfelt "byte 12" = offset `0x000B`. The table below uses hex offsets (0-indexed).

#### Game Toggle Flags (Bytes 0x000C–0x0017)

These bytes store game options that the player can toggle in the game menus:

| Offset | Bits | Field |
|--------|------|-------|
| 0x000C | bit 7 | **Bloodlust** on/off |
| 0x000C | bit 4 | **Simplified combat** |
| 0x000D | bit 7 | **Flat earth** (0=round/wrapping, 1=flat) |
| 0x000D | bit 0 | **Don't restart eliminated** |
| 0x000E | bit 7 | Move units without mouse |
| 0x000E | bit 6 | Enter closes city screen |
| 0x000E | bit 5 | Show map grid |
| 0x000E | bit 4 | Sound effects |
| 0x000E | bit 3 | Music |
| 0x000F | bit 7 | **Cheat menu enabled** (also see 0x0014) |
| 0x000F | bit 6 | Always wait at end of turn |
| 0x000F | bit 5 | Autosave each turn |
| 0x000F | bit 4 | Show enemy moves |
| 0x000F | bit 3 | No pause after enemy moves |
| 0x000F | bit 2 | Fast piece slide |
| 0x000F | bit 1 | Instant advice |
| 0x000F | bit 0 | Tutorial help |
| 0x0010 | bit 5 | Animated heralds |
| 0x0010 | bit 4 | High Council |
| 0x0010 | bit 3 | Civilopedia for advances |
| 0x0010 | bit 2 | Throne room graphics |
| 0x0010 | bit 1 | Diplomacy screen graphics |
| 0x0010 | bit 0 | Wonder movies |
| 0x0014 | bit 7 | **Scenario flag** / don't limit researchable techs |
| 0x0014 | bit 6 | Scenario file (no real effect) |
| 0x0014 | bit 4 | Cheat penalty/warning |
| 0x0016 | bit 7 | Announce "We Love the King Day" |
| 0x0016 | bit 6 | Warn when food dangerously low |
| 0x0016 | bit 5 | Announce cities in disorder |
| 0x0016 | bit 4 | Announce order restored in city |
| 0x0016 | bit 3 | Show non-combat units built |
| 0x0016 | bit 2 | Show invalid build instructions |
| 0x0016 | bit 1 | Warn when city growth halted |
| 0x0016 | bit 0 | Show city improvements built |
| 0x0017 | bit 2 | Zoom to city not default action |
| 0x0017 | bit 1 | Warn when new pollution occurs |
| 0x0017 | bit 0 | Warn when changing production will cost shields |

> **Note on offset mapping**: The hex offsets above differ from Höfelt's decimal byte numbers because Höfelt counts from byte 1 while hex offsets are 0-indexed. Additionally, Höfelt's toggle byte 12 (our 0x000C) overlaps with the file header's "height" and "flags" fields — the same bytes serve dual purposes.

#### Core Game State Fields

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| 0x001C | 2 bytes | **Turns passed** (uint16 LE) | Höfelt byte 28-29. Current game turn count. |
| 0x001E | 2 bytes | **Turns for year calculation** (uint16 LE) | Höfelt byte 30-31. Used for game year display in pop-ups/status bar. May differ from turns passed. |
| 0x0022 | 2 bytes | **Selected unit ID** (uint16 LE) | Höfelt byte 34-35. Unit selected at start of turn. Right-click a unit in-game to see its ID. `0xFFFF` = none. |
| 0x0027 | 1 byte | **Active human player** | Höfelt byte 39. Which human player is currently active. |
| 0x0028 | 1 byte | **Player's map** | Höfelt byte 40. Which civ's map is displayed. |
| 0x0029 | 1 byte | **Player's civ number** | Höfelt byte 41. civ2mod.c: `PLAYERS_CIV_OFFSET 41`. The player's slot in the civ array (0–7, 0=barbarians). |
| 0x002A | 1 byte | **Map-related byte** | Höfelt byte 42. "Changes with map used. Sometimes FF." |
| 0x002B | 1 byte | **Map revealed** | Höfelt byte 43. Whether the full map is revealed (cheat mode). |
| 0x002C | 1 byte | **Difficulty level** | Höfelt byte 44. civ2mod.c: `DIFFICULTY_LEVEL_OFFSET 44`. 0=Chieftain, 1=Warlord, 2=Prince, 3=King, 4=Emperor, 5=Deity. |
| 0x002D | 1 byte | **Barbarian activity** | Höfelt byte 45. civ2mod.c: `BARB_LEVEL_OFFSET 45`. 0=villages only, 1=roving, 2=restless, 3=raging. |
| 0x002E | 1 byte | **Civs alive bitmask** | Höfelt byte 46. civ2mod.c: `CIVS_ACTIVE_OFFSET 46`. Read binary R→L: bit 0=barbarians, bit 1=civ 1 (white), bit 2=civ 2 (green), etc. E.g., `10011101` = barbarians + civs 2, 3, 4, 7 alive. |
| 0x002F | 1 byte | **Human players bitmask** | Höfelt byte 47. Same bit scheme. E.g., `00100110` = civs 1, 2, 5 are human. Toggling enables hotseat mode in FW. |
| 0x0032 | 1 byte | **Current pollution** | Höfelt byte 50. `0x7F` = max, triggers global warming. `0x80`–`0xFF` = negative (still shows icon but resets to 0 at end of turn). |
| 0x0033 | 1 byte | **Global warming count** | Höfelt byte 51. Number of times warming has occurred. `0x7F` = max (next warming turns everything to swamp). `0x80`+ = prevents all future warming (message still appears but terrain unchanged, counter resets to 0). Exploit: set to 0x80 to permanently disable warming. |
| 0x0038 | 1 byte | **Turns of peace** | Höfelt byte 56. Only counts after the 200th turn. |
| 0x003A | 2 bytes | **Total unit count** (uint16 LE) | Höfelt byte 58-59. civ2mod.c: `TOTAL_UNITS_OFFSET 58`. Size of unit list, including empty slots from destroyed units. Lowering removes most recent units; raising causes corrupt reads. |
| 0x003C | 2 bytes | **Total city count** (uint16 LE) | Höfelt byte 60-61. civ2mod.c: `TOTAL_CITIES_OFFSET 60`. Size of city list, including empty slots from destroyed cities. Same caveats as unit count. |
| 0x003E | 2 bytes | **Technology count** (uint16 LE) | Always `89` for standard RULES.TXT. Number of advances defined. |
| 0x0042 | 100 bytes | **First discoverer per advance** | Höfelt bytes 66-165. One byte per advance: civ number (1=white, 2=green, etc.) that first discovered it. 0 if not yet discovered. |
| 0x00A6 | 100 bytes | **Tech discovery bitmask per advance** | Höfelt bytes 166-265. One byte per advance: bit per civ that has discovered it. E.g., `00010010` = civs 1 and 4 have it. |
| 0x010A | 56 bytes | **Wonder city IDs** (28 × uint16 LE) | Höfelt bytes 266-321. Per wonder: `0xFFFF` = not built, `0xFFEF` = destroyed (original city not stored), else city sequence ID (`0x0000` = first city built in game). |

##### TODO: Game State Remaining Unknowns
- [x] Toggle flags at bytes 12–23 decoded (Höfelt)
- [x] Decode 0x2D: barbarian activity (Höfelt + civ2mod.c)
- [x] Decode 0x2E-0x2F: civs alive + human player bitmasks
- [x] Decode 0x0042-0x0149: tech/wonder data
- [ ] Decode 0x0024-0x0026: 3 unknown bytes between selected unit and player fields
- [ ] Decode 0x0030-0x0031: 2 bytes between human player bitmask and pollution
- [ ] Decode 0x0034-0x0037: 4 bytes between global warming and peace turns
- [ ] Decode 0x0039: 1 byte between peace turns and total units
- [ ] Decode 0x0040-0x0041: 2 bytes between tech count and first-discoverer array
- [ ] Decode 0x014A-0x0158: ~14 bytes between wonder data and per-civ name blocks
- [ ] **RENDERING**: "Show map grid" toggle (0x000E bit 5) — when set, the game overlays diamond grid lines on the map. No rendering spec exists: grid line color, thickness, opacity, and drawing method (full diamond outlines vs corner marks) are all unknown.

#### Player's Civ Slot vs. LEADERS.TXT Index

The value at offset 0x0029 is the player's **civ number** (Höfelt byte 41, civ2mod.c `PLAYERS_CIV_OFFSET`) — their position in the game's internal civilization array (0–7, where 0=barbarians). This is **not** the same as the civilization's index in `LEADERS.TXT` (0–20). Offset 0x0027 controls which human player is active, 0x0028 which civ's map is displayed, and 0x0029 which civ number is the player's.

### Section 3: Civilization Data (variable size per game configuration)

This section contains all per-civilization data. It always has **8 civ slots** regardless of the `total_civs` header field or how many civilizations are actually active in the game.

The section has two sub-parts:

| Sub-section | Start Offset (SAV/NET) | Start Offset (SCN) | Size | Description |
|-------------|----------------------|-------------------|------|-------------|
| Per-Civ Name Blocks | `0x0156` | `0x0148` | 8 × 242 = 1,936 bytes | Leader names, tribe names, government titles |
| Per-Civ Data Blocks | `0x08E6` | `0x08D8` | 8 × N bytes (see below) | Technology, diplomacy, AI state, resources |

The name block region and the `"dddddddd"` marker at `0x0926` (SAV/NET) or `0x0918` (SCN) are **fixed-size** across all files of the same type. The per-civ data block size N is **fixed per file type**:

| File Type | Per-Civ Block Size (N) | Total (8 × N - 2)* | Map Header Offset |
|-----------|----------------------|--------------------|--------------------|
| SAV / NET | **1,428 bytes** | 11,422 bytes | 13702 (0x3586) |
| SCN | **1,396 bytes** | 11,166 bytes | 13432 (0x3478) |

\*The last of the 8 per-civ blocks is truncated by 2 bytes (i.e., 7 blocks × N + 1 block × (N-2)).

**SAV vs SCN offset difference**: SAV/NET files have 270 extra bytes before the map header compared to SCN files: 14 bytes in the game state preamble + 32 bytes per civ slot × 8 slots = 14 + 256 = 270 bytes. This is because SAV files include additional per-unit and per-city ID tracking fields that SCN files omit.

#### Per-Civ Name Block (242 bytes each, 7 blocks — excludes barbarians)

Each of the 8 civ slots (including barbarians at slot 0) has a 242-byte block containing identity strings. The block starts at `name_block_start + (slot × 242)` where `name_block_start` is `0x0156` for SAV/NET or `0x0148` for SCN. AI civs typically have all-zero name blocks; their identity data comes from RULES.TXT at runtime.

> **Note**: Höfelt documents only **7** name blocks (slots 1–7, no barbarian slot), covering offsets 584–2277 (FW), consistent with 7 × 242 = 1,694 bytes.

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 1 byte | **City style** | `0x00`=Ancient, `0x01`=Renaissance, `0x02`=Industrial, `0x03`=Modern. Can set to any style without prerequisites. Higher values produce unusual effects. |
| +2–24 | 23 bytes | **Leader name** | Null-terminated, 23 chars max. |
| +26–48 | 23 bytes | **Tribe name** (plural) | e.g., `"Romans"` |
| +50–72 | 23 bytes | **Tribe adjective** (singular) | e.g., `"Roman"` |
| +74–96 | 23 bytes | Title: Anarchy | Default/fallback title |
| +98–120 | 23 bytes | Title: Despotism | |
| +122–144 | 23 bytes | Title: Monarchy | |
| +146–168 | 23 bytes | Title: Communism | |
| +170–192 | 23 bytes | Title: Fundamentalism | |
| +194–216 | 23 bytes | Title: Republic | |
| +218–240 | 23 bytes | Title: Democracy | |
| +241 | 1 byte | Padding | `0x00` |

All string fields are null-terminated within their allocation. Residual bytes from previous save data may appear after the null terminator (e.g., `"andhi"` leftover from overwriting `"Gandhi"` with a shorter name). Unmet or eliminated civs have all-zero blocks.

**Verification**: The player's name always appears at exactly `name_block_start + (player_slot × 242)`, and AI leader names (e.g., `"Mao Tse Tung"`, `"Mohandas Gandhi"`) appear at their corresponding slot offsets.

#### Per-Civ Data Block (1,428 bytes each for SAV/NET; 1,396 bytes for SCN)

Each civ slot has a data block starting at `per_civ_data_start + (slot × block_size)` where `per_civ_data_start` is `0x08E6` for SAV/NET or `0x08D8` for SCN. The last (8th) block is 2 bytes shorter. These blocks contain:

- **Technology state**: 6-byte entries per technology (pattern: `01 XX F0 YY 00 00` where XX encodes acquisition method and YY encodes tech level/era). Matches the 89 technologies from RULES.TXT.
- **Diplomacy/attitudes**: int16 pairs encoding relationships with other civs.
- **AI behavior state**: Strategy priorities, production preferences (non-zero for AI civs; mostly zero for the human player's slot and eliminated civs).
- **Resource/treasury data**: Gold, science, luxury allocation percentages.

The blocks persist even for eliminated civs (retaining historical data). Active AI civs have the most non-zero data. The player's block has minimal data since AI behavior fields are not used.

The 32-byte difference between SAV (1,428) and SCN (1,396) blocks per civ corresponds to the extra unit/city ID tracking fields that the runtime game engine adds when a scenario is loaded and saved.

**Independent confirmation**: AGRICOLA (Apolyton, May 2004) independently confirmed the 1,428-byte block size. Mercator's file format table of contents lists `Properties (8 × 1428 = 11424)` for the Civilizations section.

##### Per-Civ Block Internal Layout (1,428 bytes for SAV/NET; 1,396 bytes for SCN)

All offsets below are **1-indexed** to match Höfelt's convention (byte 1 = first byte of the block). Subtract 1 for 0-based offset within the block.

| Byte(s) | Size | Field | Notes |
|---------|------|-------|-------|
| 1 | 1 byte | **State flags** | Bitmask: bit 0 = skip next oedo year (e.g., after falling to anarchy), bit 1 = at war with another civ (peace turns), bit 2 = senate override chance (toggled every turn with 1/3 probability; when NOT set, Republic Senate confirms your action — per FoxAhead), bit 3 = recovered from revolution (allow gov change), bit 5 = free advance pending (Philosophy bonus), cleared when received. |
| 2 | 1 byte | **Gender** | `0x00` = male, `0x02` = female. May not function in MGE. |
| 3–6 | 4 bytes | **Treasury** (int32 LE) | Gold reserves. Even barbarians can have money. Values above 32,000 are capped to 30,000 by the game engine (Julius Brenzaida's "No Limits" patch removes this cap). |
| 7 | 1 byte | **RULES.TXT civ number** | Which civilization definition from RULES.TXT/LEADERS.TXT this slot uses. Multiple slots can reference the same civ number, producing duplicate civilizations with the same color, portrait, and flag. |
| 8 | 1 byte | **Civ variant** | Values > 0 cause the civ to read its name from LABELS.TXT/MENU.TXT and use a non-standard color (red, alternative green, etc.). Normally 0. |
| 9–10 | 2 bytes | **Research progress** (uint16 LE) | Beakers accumulated toward current research. Also updates the science indicator color bar. |
| 11 | 1 byte | **Tech being researched** | Index into RULES.TXT `@CIVILIZE` section. `0xFF` = no research goal / cleared. |
| 12 | 1 byte | **Tech research helper** | Must be `0xFF` if tech is cleared, otherwise `0x00`. Non-zero with certain tech IDs reads strings from LABELS.TXT. |
| 13–14 | 2 bytes | **Starting position** (uint16 LE) | Column where this civ's settler(s) initially appeared. May be reused to select reappearance position when a destroyed civ respawns. |
| 15–16 | 2 bytes (int16 LE) | **Turn of city build** | Turn number on which this civ last built/founded a city. Range 1–432+ for active civs. Dead civs retain their last value. Barbarians have values based on camp spawning. Confirmed via FoxAhead's `TCiv.TurnOfCityBuild` (offset 0x0E). |
| 17 | 1 byte | **Acquired tech count + 1** | Number of technologies discovered (not counting starting techs) plus 1. **Critical**: this value controls the beaker cost of the next discovery AND strongly influences AI attitude ("Supreme", "Mighty", etc. power ranking). |
| 18 | 1 byte | **Future Tech count + 1** | Number of Future Technologies discovered plus 1. |
| 19 | 1 byte | **Unknown** | Always 0 across all 1856 tested civ slots. FoxAhead labels this `Unknown_12`. Located between Future Tech count and science rate. |
| 20 | 1 byte | **Science rate** | Science slider setting as a multiplier (0–10). Value × 10 = percentage allocated to science. E.g., `6` = 60% science. Confirmed: `scienceRate + taxRate ≤ 10` in all 1530 tested active/barb slots. Luxury rate = `10 − scienceRate − taxRate`. Source: FoxAhead `TCiv.ScienceRate` (0x13). |
| 21 | 1 byte | **Tax rate** | Tax slider setting as a multiplier (0–10). Value × 10 = percentage allocated to tax. Previously labeled "Tax/Science/Luxury rates" (combined field). Source: FoxAhead `TCiv.TaxRate` (0x14). |
| 22 | 1 byte | **Government type** | `0x00`=Anarchy, `0x01`=Despotism, `0x02`=Monarchy, `0x03`=Communism, `0x04`=Fundamentalism, `0x05`=Republic, `0x06`=Democracy. Values ≥ `0x08` cause a crash. Barbarians can be given Democracy (`0x06`) to prevent their cities from being subverted. |
| 23 | 1 byte | **AI random seed** | Near-uniform distribution 0–99 that changes every turn for active AI civs. Always 0 for barbarians and dead civs. FoxAhead labels this `TCiv.SenateChances` (0x16), but empirical data shows no correlation with government type — behaves as a per-turn AI PRNG state or randomizer. |
| 24–27 | 4 bytes | **Unknown (AI diplomatic counters)** | 4 independent uint8 counters with decreasing frequency. Byte 24: range 0–3, 37.8% non-zero. Byte 25: range 0–5, 19.6% non-zero. Byte 26: range 0–3, 4.2% non-zero. Byte 27: range 0–1, 0.8% non-zero. All zeros for barbarians and dead civs. Monotonically decreasing (byte[0] ≥ byte[1] ≥ byte[2] ≥ byte[3]) 92.3% of the time. Most common patterns: `[0,0,0,0]` (57.7%), `[1,0,0,0]` (20.6%), `[1,1,0,0]` (7.3%). Correlates with government type (Despotism avg byte[0]=0.16, Monarchy/Republic avg=0.71–0.72) and tech count (avg techs per byte[0] value: 0→13.6, 1→20.8, 2→29.0, 3→28.7). Best hypothesis: successive AI diplomatic state transition counters — each byte tracks a different threshold event, with decreasing frequency at higher indices. FoxAhead: `Unknown_17` (0x17–0x1A). |
| 28 | 1 byte | **Unused** | Always 0 across all 1856 tested civ records (232 saves × 8 slots). Confirmed unused in MGE. FoxAhead: `Unknown_1B` (0x1B). |
| 29–30 | 2 bytes (uint16 LE) | **Treaty-breaking count** | Cumulative count of treaty violations committed by this civ. Effectively a single byte (byte 30 is always 0). Range 0–4. Always 0 for barbarians and dead civs. 80% of non-zero cases are currently at war. Approximately equals `sum(abs(negative treatyViolations[0..7]))` — 89.9% exact match; the 10.1% mismatch likely reflects timing differences (per-civ entries may reset on civ destruction/re-peace while this field retains the cumulative count, or vice versa). FoxAhead: `Unknown_1C` (0x1C). |
| 31 | 1 byte | **Reputation (betrayals)** | Global diplomatic reputation / betrayals counter. Range 0–7: `0`=Spotless, `1`=Excellent, `2`=Honorable, `3`=Questionable, `4`=Marginal, `5`=Poor, `6`=Despicable, `7`=Atrocious. Increases when this civ breaks treaties; decays slowly over time. Distinct from the per-civ treaty violations array at bytes 73–80 (which tracks bilateral violations). FoxAhead: `TCiv.Reputation` (0x1E). TOTPP Lua: `tribe.betrayals`. |
| 32 | 1 byte | **Patience** | AI negotiation patience counter. Range 0–6, mostly 0 (83%). Determines how long an AI civ will entertain diplomatic meetings before terminating negotiations. Depletes when contacted frequently; resets or decays over time. Always 0 for barbarians and dead civs. FoxAhead: `Unknown_1F` (0x1F). Confirmed as "patience" by axx0/Civ2-clone (read at offset 31 as `patience`), Catfish's Cave ToT documentation (ToT offset +39), and TOTPP Lua API (`tribe.patience` get/set property). Previously misread as the first treaty byte due to a 1-byte offset bug. |
| 33–64 | 32 bytes | **Treaties** | 4 bytes per civ × 8 civs (including barbarians and self). Self-treaty (slot toward self) is always all zeros. See Treaty Byte Layout below. **CORRECTED**: Previously documented at bytes 32–63; confirmed at bytes 33–64 via FoxAhead's `TCiv.Treaties` (offset 0x20) and empirical self-treaty validation across 232 saves. |
| 65–72 | 8 bytes | **Attitudes** | One byte per civ slot (0–7). Byte 65 = attitude toward barbarians (always 100 for active civs), byte 66 = toward civ 1, ..., byte 72 = toward civ 7. Range 0–100. **CORRECTED**: Previously documented as 7 entries at bytes 66–72 (missing barbarian entry); confirmed as 8 entries at bytes 65–72 via FoxAhead's `TCiv.Attitude[0..7]` (offset 0x40). |
| 73–80 | 8 bytes | **Treaty violations** | Per-civ treaty-breaking tracker. 8 × signed int8, indexed by target civ slot (0–7). Value 0 = neutral/no violations (98.3% of entries). **Negative** (−1 to −6) = THIS civ broke a treaty with the target; value = negative count of broken treaties. **Positive** (+1 to +2) = the TARGET broke a treaty with this civ; value = count broken by target. Self-slot always 0, position 0 (barbarians) always 0. 100% correlation: negative value → target has vendetta flag toward this civ. **Cross-references**: Catfish's Cave (ToT +80–87) and TOTPP Lua (`tribe.reputation[otherTribe]`) call this "per-tribe reputation" — the underlying concept is the same (bilateral diplomatic standing), but our empirical analysis shows the values specifically track treaty violations. Distinct from the global betrayals counter at byte 31. |
| 81–88 | 8 bytes | **Diplomatic interaction counters** | Per-civ diplomatic interaction intensity. 8 × uint8, indexed by target civ slot (0–7). Range 0–22. Self-slot always 0. 6× more likely non-zero when at war with target, 9× more likely with contact. Grows with game age (avg sum: 0.08 at turns 0–49, 2.20 at turns 200–249). 84.8% symmetric between civ pairs; 15.2% asymmetric, suggesting per-civ event tracking. Not the mirror of the signed treaty violations array. Best hypothesis: cumulative count of hostile diplomatic interactions or border incidents per target civ. |
| 89–100 | 12 bytes | **Technology bitmask** | One bit per technology, packed LSB first. `0xFF FF FF FF FF FF FF FF FF FF FF FD` = all standard techs. In MGE, all bits in all bytes count (unlike earlier versions where one bit per byte was skipped). Adding user-defined techs changes the last byte from `0xFD` to `0xFF`. |
| 101–102 | 2 bytes (uint16 LE) | **Tech bitmask overflow** | `max(0, techBitmaskBitsSet − 80)`. Effectively a single byte (byte 102 is always 0). 100% exact match across all 1856 tested records. Zero for civs with ≤ 80 tech bits set (98.4% of records). Non-zero only in late-game saves with near-complete tech trees (e.g., 95 of 96 bits → value 15). Likely an internal engine overflow counter or cached computation for demographics/score/tech-cost scaling. |
| 103–104 | 2 bytes | **Military power** (uint16 LE) | Military demographics value. **Naming discrepancy**: axx0/Civ2-clone reads this as `numberMilitaryUnits` (a count), Catfish's Cave (ToT) calls it "total number of military units", while Höfelt calls it "military demographics". May be a count of military units rather than a power/strength metric, or a demographics display value that happens to equal the count. Needs further empirical verification. |
| 105–106 | 2 bytes | **City count** (uint16 LE) | Displayed in multiplayer lobby. No apparent effect in single-player. |
| 107–108 | 2 bytes | **Naval unit count** (uint16 LE) | Count of sea-domain units (types 32–41: Trireme, Caravel, Galleon, Frigate, Ironclad, Transport, Cruiser, AEGIS Cruiser, Battleship, Carrier). Runtime-maintained counter: incremented when a naval unit is built, decremented when one is lost. 96.4% exact match with snapshot-reconstructed ship count across 232 saves; remaining 3.6% explained by dead unit slot recycling. |
| 109–110 | 2 bytes | **Sum of city sizes** (uint16 LE) | Total population across all cities (in size units). |
| 111–112 | 2 bytes | **Total unit atk+def sum** (uint16 LE) | Cumulative sum of `(RULES.TXT attack + defense)` values for all units owned by this civ. Runtime-maintained counter: incremented by `(atk + def)` when a unit is created, decremented when a unit is lost. Pearson r = 0.997 with snapshot-reconstructed atk+def sum. Sequential save analysis confirms exact delta match (du110 = d(atk+def) for each unit gained/lost). Cross-sectional exact match rate is 37.1% due to dead unit slot recycling. |
| 113–114 | 2 bytes | **Total unit attack sum** (uint16 LE) | Cumulative sum of RULES.TXT attack values for all units owned by this civ. Same runtime-maintained counter mechanism as above but tracking attack only. 81.7% exact match with snapshot-reconstructed attack sum across 232 saves; sequential save analysis confirms 100% exact delta match. |
| 115–214 | 100 bytes | **First discoverer flags** | One byte per technology. `0x00` = this civ was the first to discover it. `0xFF` (or any non-zero) = not first. |
| 215–277 | 63 bytes | **Active unit counts** | One byte per unit type (in RULES.TXT `@UNITS` order). Byte 215 = number of settlers, byte 216 = engineers, etc. |
| 278–340 | 63 bytes | **Unit casualty counts** | One byte per unit type. Number of each unit type lost/destroyed. |
| 341–403 | 63 bytes | **Units in production** | One byte per unit type. Number of each type currently being produced. Computed at runtime, so hex-editing has no effect. |
| 404 | 1 byte | **Padding** | Always 0x00. Gap byte between units-in-production and per-continent statistics block. |
| 405–532 | 128 bytes | **Military power per continent** | 64 entries × 2 bytes (uint16 LE). In practice only the low byte of each entry carries data (high byte always 0x00), so effectively 64 single-byte values at even byte positions. Entry index = continent bodyId − 1. Sum across all entries ≈ the `militaryPower` field at bytes 103–104. See Per-Continent Statistics Block below. |
| 533–660 | 128 bytes | **Land attack strength per continent** | Same format as above (64 × uint16 LE, low byte only). Each entry = sum of RULES.TXT attack values for all **land military units** on that continent. Naval, air, and non-combat units (Settlers, Diplomat, Caravan, etc.) contribute 0. Sum across all entries ≈ the `totalUnitAtkSum` field at bytes 113–114 (though the summary field includes ALL unit domains, not just land). Note: byte 660 (high byte of last entry) shares position with the first byte of Section C. |
| 660–723 | 64 bytes | **City count per continent** | 64 single-byte entries. Entry index = continent bodyId − 1. Value = number of cities this civ owns on that continent. Sum across all entries = total city count. |
| 724–787 | 64 bytes | **Sum of city sizes per continent** | 64 single-byte entries. Same indexing. Value = total population (in city-size units) across cities on that continent. Sum = total population. |
| 788–851 | 64 bytes | **Per-continent transient flags** | 64 single-byte entries. Almost always zero (< 0.1% non-zero rate across 232 tested saves). When non-zero, values are small (1–4). Most common at position 0. Likely transient AI planning state (combat activity, exploration missions). |
| 852–914 | 63 bytes | **Per-continent status bitflags** | 63 single-byte entries, one per continent slot (0–62). Observed values: `5` (0b00000101), `10` (0b00001010), `15` (0b00001111), `21` (0b00010101), `31` (0b00011111), `4`, `8`, `13`, `14`, `128`. Player civs tend to show `21` on their primary continent. AI civs typically show `5` or `15`. Zero = no data for this continent. See Per-Continent Status Bitflags below. |
| 915–978 | 64 bytes | **Unit type "ever built" flags** | 64 single-byte entries indexed by unit type ID (0–62, plus position 63). Value `5` = this unit type has never been built. Value `0` = has been built at least once. Positions 0 and 63 are always `5` (sentinels — Settlers at position 0 are tracked differently since every civ starts with one). Dead civs have all 64 bytes set to `5`. |
| 979–996 | 18 bytes | **Power graph ranking data** | 9 × int16 LE (signed). H[0] is always ≥ 0 (range 0–47). H[1]–H[4] are always ≤ 0. H[5]–H[7] are signed with potentially large magnitudes. H[8] = −1 (sentinel). Barbarians typically store `[0,0,0,0,0,0,0,10,−1]`. These values likely correspond to power graph category differentials (military, population, food, land, production, commerce, science, gold). |
| 997–1010 | 14 bytes | **Last contact turns** | 2 bytes per civ (uint16 LE), 7 entries. Bytes 997–998 = last contact with civ 1, etc. `0xFFFF` = no contact yet. (Bytes 995–996 may be barbarian contact, unverified.) |
| 1010 | 1 byte | **AI persona index** | Formula: `(rulesCivNumber % 7) + 7 × leaderPersonality`. The `leaderPersonality` component ranges 0–5 (6 possible values). Changes when a civ is destroyed and reborn. Barbarians (slot 0) always have value 0. |
| 1011–1021 | 11 bytes | **Constant padding** | Always `[1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0]` across all 1784 tested civ records (223 saves × 8 slots). Purpose unknown — may be default spaceship component flags or engine constants. |
| 1022–1023 | 2 bytes | **Spaceship structural** (uint16 LE) | Number of spaceship structural components built. Range observed: 0–30. Only non-zero for AI civs in late-game saves with many technologies. |
| 1024–1025 | 2 bytes | **Spaceship propulsion** (uint16 LE) | Number of spaceship propulsion components built. Maximum observed: 8. Only non-zero in saves where civs have 100+ technologies. |
| 1026–1027 | 2 bytes | **Spaceship estimate 1** (int16 LE) | Signed year or score estimate related to spaceship. When non-zero, typically a large negative value (e.g., −1500 to −2000). |
| 1028–1029 | 2 bytes | **Spaceship estimate 2** (int16 LE) | Signed year or score estimate. Related to estimate 1: typically `estimate1 − estimate2 ≈ 427` (or ≈ 319 with max propulsion of 8). |
| 1030–1043 | 14 bytes | **Zero padding** | Always zero across all tested saves. May be reserved for additional spaceship fields present in ToT but unused in MGE. |
| 1044–1427 | 384 bytes | **AI continent goals** | 64 × 6-byte entries, one per continent slot (index = bodyId − 1). See AI Continent Goal Entry below. **Note**: Civ 7 (slot 7) has only 416 bytes total in the tail (2 fewer than civs 0–6), so entry 63 is truncated to 4 bytes (missing goalType and goalExtra). The parser reads 63 entries for civ 7. |

###### AI Continent Goal Entry (6 bytes)

Each of the 64 entries in the AI continent goals block represents the AI's strategic goal for that continent:

| Byte | Type | Field | Notes |
|------|------|-------|-------|
| 0–1 | uint16 LE | **x** | Map x-coordinate of the goal target. 0 if no goal. |
| 2–3 | uint16 LE | **y** | Map y-coordinate of the goal target. 0 if no goal. |
| 4 | uint8 | **goalType** | Goal type code: `0` = explore, `1` = attack/defend, `5` = city site, `7` = naval(?), `21` = threat(?), `255` = empty/unused. |
| 5 | int8 | **goalExtra** | Signed priority or target civ. Range observed: −7 to +5. Possibly encodes the target civ slot index (signed). |

> **Notes**: Human-controlled civs and barbarians typically have all-zero goal entries. Dead civs show `goalType = 255` for all entries. Active AI civs have non-zero entries corresponding to continents they have explored or are interested in. The number of active goals correlates with the civ's territorial awareness and military activity.

> **Civ 7 truncation**: The per-civ block size for civ 7 is always 2 bytes shorter than for civs 0–6 (1426 vs 1428 in SAV format). This means the last continent goal entry (index 63) is missing its final 2 bytes (goalType and goalExtra), effectively giving civ 7 only 63 complete entries.

> **FoxAhead validation**: FoxAhead's `TCiv` struct splits the 64 AI goals into two arrays: `Unknown_414[0..47]` (48 entries at offset +0x414 / +1044) and `Unknown_534[0..15]` (16 entries at offset +0x534 / +1332). Total: 48 + 16 = 64 entries × 6 bytes = 384 bytes. The `TCivSub1` record type (X: int16, Y: int16, Unknown_4: byte, Unknown_5: byte) matches our decoded goal entry format exactly. The 48/16 split may reflect different priority tiers (active goals vs reserve/overflow).

> **Methodology**: Decoded by statistical analysis across 223 save files (1784 per-civ records). The 11-byte constant at +1011 was confirmed invariant across all records. Spaceship fields confirmed by correlation with late-game saves (only 3 records with non-zero propulsion, all with 100+ technologies). AI goals confirmed by validating coordinates against map dimensions and observing goal activity patterns for human vs AI vs dead civs. Sequential turn analysis using 9 early-game saves confirmed persona index changes on civ death/rebirth. The entry-per-continent mapping was verified by cross-referencing goal coordinates with tile bodyId values.

###### Treaty Byte Layout (4 bytes per civ pair)

| Byte | Bits | Meaning |
|------|------|---------|
| 1st | bit 0 | Contact established |
| 1st | bit 1 | Cease fire |
| 1st | bit 2 | Peace treaty |
| 1st | bit 3 | Alliance (always combined with peace) |
| 1st | bit 4 | Vendetta |
| 1st | bit 5 | Hatred (FoxAhead: possibly spaceship-related) |
| 1st | bit 7 | Embassy |
| 2nd | bit 0 | Nukes discussed (FoxAhead: "They talked about nukes with us") |
| 2nd | bit 1 | Attacked a unit of the other tribe (CivFanatics) |
| 2nd | bit 5 | War |
| 2nd | bit 6 | Recently signed peace treaty / cease fire (FoxAhead) |
| 3rd | bit 0 | Captured a city of the other tribe (CivFanatics) |
| 3rd | bit 1 | We nuked them (FoxAhead) |
| 3rd | bit 2 | Accepted tribute (FoxAhead) |
| 4th | — | Unknown / reserved |

> **Note**: Treaty flags can be combined to create unusual states (e.g., war + alliance simultaneously: units get repaired when attacking enemy cities, but diplomacy screens show war). The 4-byte pattern repeats for each of the 8 civ slots.

##### City Knowledge Entry (6 bytes)

Each entry in the city knowledge list encodes a city this civ knows about:

| Byte | Field | Notes |
|------|-------|-------|
| 0 | **Relationship type** (int8) | `0` to `4` = friendly/own cities. `-5` (0xFB) = ?, `-3` (0xFD) = foreign/known, `-2` (0xFE) = foreign/different state, `-1` (0xFF) = boundary. |
| 1–2 | **X coordinate** (uint16 LE) | Isometric X of the city |
| 3–4 | **Y coordinate** (uint16 LE) | Isometric Y of the city |
| 5 | **Flags** | 0x00 or 0x01 typically. 0xFF = empty sentinel slot. |

**Verified**: City coordinates in these entries match actual city positions in the city record section.

##### Per-Continent Statistics Block (bytes 405–997)

This 593-byte region stores per-continent breakdowns of the civ's aggregate statistics. Civ2 assigns each contiguous land or water body a **body ID** (1–63, where 63 = ocean). The statistics are indexed by **slot = bodyId − 1**, so slot 0 = continent with bodyId 1, slot 1 = bodyId 2, etc.

**Structure overview (593 bytes):**

| Sub-section | Byte Offset | Size | Entry Count × Size | Content |
|-------------|-------------|------|--------------------|---------|
| A | 405–532 | 128 | 64 × 2 bytes | Military power per continent |
| B | 533–660 | 128 | 64 × 2 bytes | Land attack strength per continent |
| C | 660–723 | 64 | 64 × 1 byte | City count per continent |
| D | 724–787 | 64 | 64 × 1 byte | Sum of city sizes per continent |
| E | 788–851 | 64 | 64 × 1 byte | Per-continent transient flags |
| F | 852–914 | 63 | 63 × 1 byte | Per-continent status bitflags |
| G | 915–978 | 64 | 64 × 1 byte | Unit type "ever built" flags |
| H | 979–996 | 18 | 9 × 2 bytes | Power graph ranking data |

**Sections A and B** use a uint16 LE format where in practice only the low byte carries data (the high byte is always `0x00`). The effective data is a single byte at every even position (bytes 405, 407, 409, ... for section A; bytes 533, 535, 537, ... for section B). Note: byte 404 is a padding byte (always 0) separating units-in-production from the per-continent block. **CORRECTED**: Previous versions stated the high byte carried data; empirical verification across 232 saves confirmed data is in the low byte.

**Section A — Military power per continent**: The low byte of each entry represents this civ's military power on the corresponding continent. The sum of all low bytes across 64 entries approximately equals the aggregate `militaryPower` field at bytes 103–104. Exact match rate is ~63% across tested saves; discrepancies arise from lazily-updated cached values that may not be refreshed every turn.

**Section B — Land attack strength per continent**: Same format as A. Each entry = the sum of RULES.TXT attack values for all **land military units** this civ has on that continent. Naval units, air units, and non-combat units (Settlers, Engineers, Diplomat, Spy, Caravan, Freight, Explorer) contribute 0 to this metric. Verified per-unit-type contributions:

| Unit Type | Attack Contribution |
|-----------|-------------------|
| Warriors (2) | 1 |
| Phalanx (3) | 1 |
| Archers (4) | 3 |
| Legion (5) | 4 |
| Pikemen (6) | 1 |
| Musketeers (7) | 3 |
| Riflemen (11) | 5 |
| Marines (12) | 8 |
| Horsemen (15) | 2 |
| Chariot (16) | 3 |
| Elephant (17) | 4 |
| Crusaders (18) | 5 |
| Cavalry (21) | 8 |
| Catapult (23) | 6 |
| Cannon (24) | 8 |
| All naval units | 0 |
| Settlers, Diplomat, Caravan, etc. | 0 |

**Section C — City count per continent**: One byte per continent slot. Value = number of cities this civ owns on that continent. Sum across all 64 entries = total city count (88.8% exact match across 232 saves; remainder due to stale caching).

**Section D — Sum of city sizes per continent**: One byte per continent slot. Value = total population in city-size units across this civ's cities on that continent. Sum across all 64 entries = total city population (88.1% exact match).

**Section E — Per-continent transient flags**: Almost always all zeros. In 232 tested saves, only 83 non-zero bytes were found (< 0.1% hit rate). When non-zero, values are small (1–4), most commonly at position 0 (relative offset within section). Likely represents transient AI state such as active combat or exploration missions on a continent.

**Section G — Unit type "ever built" flags**: 64 bytes indexed by unit type ID (0–62, plus position 63). Value `5` = this unit type has never been built by this civ. Value `0` = has been built at least once (may or may not still exist). Positions 0 and 63 are always `5` (sentinels). When a civ is destroyed, all 64 bytes reset to `5`.

##### Per-Continent Status Bitflags (bytes 852–914)

Section F contains 63 bytes, one per continent slot (0–62). Each byte is a bitmask encoding the civ's status on that continent. Observed values and their bit decomposition:

| Value | Binary | Bits Set | Frequency | Notes |
|-------|--------|----------|-----------|-------|
| 5 | `00000101` | 0, 2 | Most common | Default for known/explored continents |
| 10 | `00001010` | 1, 3 | Common | |
| 15 | `00001111` | 0, 1, 2, 3 | Common | Typical for AI civs with presence |
| 21 | `00010101` | 0, 2, 4 | Common | Typical for human player's continent |
| 31 | `00011111` | 0, 1, 2, 3, 4 | Moderate | Combined activity state |
| 4 | `00000100` | 2 | Moderate | |
| 8 | `00001000` | 3 | Rare | |
| 13 | `00001101` | 0, 2, 3 | Rare | |
| 14 | `00001110` | 1, 2, 3 | Rare | |
| 128 | `10000000` | 7 | Very rare (1 occurrence) | |

The individual bits likely correspond to statuses such as "has units here", "has cities here", "explored", "is primary continent", or "at war on this continent", but the exact per-bit meanings have not been isolated through controlled experiments.

##### Power Graph Ranking Data (bytes 979–996)

Section H contains 9 signed int16 LE values. The last entry (H[8]) is always −1 (sentinel). The remaining 8 entries likely correspond to the 8 power graph/demographics categories, storing ranking differentials or score deltas.

| Entry | Range | Notes |
|-------|-------|-------|
| H[0] | 0 to 47 | Always non-negative. |
| H[1] | −1306 to 0 | Always non-positive. Largest magnitude. |
| H[2] | −684 to 0 | Always non-positive. |
| H[3] | −283 to 0 | Always non-positive. |
| H[4] | −74 to 0 | Always non-positive. Smallest magnitude of the negative group. |
| H[5] | −206 to 401 | Signed, both positive and negative. |
| H[6] | −943 to 699 | Signed, widest range. |
| H[7] | −922 to 703 | Signed, wide range. For barbarians, commonly `10`. |
| H[8] | −1 | Always −1 (sentinel). |

Barbarians (civ 0) typically have all values zero except H[7]=10 and H[8]=−1: `[0, 0, 0, 0, 0, 0, 0, 10, −1]`.

> **Methodology**: Decoded by statistical analysis across 232 save files from diverse games (different maps, players, eras). Continent slot mapping confirmed by correlating C[slot] city counts with actual city positions via `getBodyId()`. Section B attack values confirmed against standard RULES.TXT by isolating single-unit-type continents. This region was previously undocumented across all known community sources (Civ2-clone, Allard Höfelt, Catfish's Cave, TOTPP).
>
> **Independent validation**: FoxAhead's `Civ2Types.pas` (`TCiv` struct) contains arrays `Unknown_192` through `Unknown_392` that match exactly with our decoded Blocks A–G — confirming the array sizes and types (64 × uint16 LE for A/B, 64 × byte for C–G). FoxAhead labels these as "Unknown" but the structural match provides high confidence in our decode. See https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas.

##### TODO: Per-Civ Block — Remaining Unknowns
- [x] Locate per-civ government type → byte 22
- [x] Locate per-civ treasury → bytes 3–6 (int32 LE)
- [x] Locate per-civ tax/luxury/science rates → byte 20 = science rate, byte 21 = tax rate (luxury = 10 − sci − tax). **CORRECTED**: previously a single combined field at byte 21; now split per FoxAhead.
- [x] Identify technology bitmask → bytes 89–100 (12 bytes, 1 bit per tech)
- [x] Decode treaty structure → bytes 33–64 (4 bytes × 8 civs). **CORRECTED**: was bytes 32–63 (off by 1).
- [x] Identify active unit counts → bytes 215–277 (63 bytes, 1 per unit type)
- [x] Identify unit casualty counts → bytes 278–340
- [x] Locate research progress → bytes 9–10
- [x] Locate acquired tech count → byte 17 (controls research cost + AI attitude)
- [x] Locate diplomatic reputation → byte 31
- [x] Locate attitudes → bytes 65–72 (8 entries including barbarians). **CORRECTED**: was 7 entries at bytes 66–72.
- [x] Locate first discoverer flags → bytes 115–214
- [x] Locate last contact turns → bytes 997–1010
- [x] Decode bytes 19–20 → byte 19 = unknown (always 0), byte 20 = science rate, byte 21 = tax rate. Confirmed via FoxAhead `TCiv` struct and sum validation across 1530 slots.
- [x] Decode bytes 23–32 → byte 23 = AI random seed (0–99, changes every turn), bytes 24–27 = small counters (FoxAhead `Unknown_17`), byte 28 = unused (always 0), bytes 29–30 = treaty-breaking count (cumulative violations, effectively uint8, byte 30 always 0), byte 31 = reputation, byte 32 = **patience** (AI negotiation patience counter, 0–6). Patience confirmed by axx0/Civ2-clone, Catfish's Cave, and TOTPP Lua `tribe.patience`.
- [x] Decode bytes 73–88, 101–102 → bytes 73–80 = treaty violations (signed int8[8], per-civ treaty-breaking tracker, 100% vendetta correlation), bytes 81–88 = diplomatic interaction counters (uint8[8], partially decoded — correlates with war/contact/game age), bytes 101–102 = tech bitmask overflow (`max(0, bitsSet − 80)`, 100% match across 1856 records).
- [x] Decode bytes 405–997 → per-continent statistics block (military power, land attack, city count, city sizes, flags, unit history, power graph data)
- [x] Decode bytes 1011–1428 → AI persona index (byte 1010), constant padding (1011–1021), spaceship data (1022–1029), zero padding (1030–1043), AI continent goals 64×6 bytes (1044–1427)
- [x] Determine what the city knowledge list at +64 actually represents → It is the start of the 8-byte attitudes array (bytes 65–72), not a separate city knowledge list. Byte 65 (Höfelt's +64) = attitude toward barbarians (always 100).
- [x] Decode bytes 107–108, 111–114 → naval unit count (uint16, count of sea-domain types 32–41), total unit atk+def sum (uint16, cumulative RULES.TXT attack+defense), total unit attack sum (uint16, cumulative RULES.TXT attack). All three are runtime-maintained counters. Confirmed via sequential save delta analysis (100% exact deltas) and cross-sectional correlation (r=0.997 for atk+def). Cross-sectional exact match rates (81.7% for attack sum, 96.4% for naval count) limited by dead unit slot recycling in save snapshots.
- [ ] Determine what the 32 extra bytes per civ in SAV vs SCN contain (likely unit/city ID tracking)
- [x] Fix treaty/attitude offset bug → treaties shifted from +31 to +32, attitudes from 7@+65 to 8@+64. Confirmed via FoxAhead `TCiv` struct (offsets 0x20 and 0x40) and validated across 232 saves.

> **CORRECTION**: Previous versions of this document described a variable-size "Extended Game Data" section (0 to ~93 KB) between per-civ data and the map header. This was based on an incorrect per-civ block size of 3,833 bytes. The actual per-civ block size is **1,428 bytes** (SAV/NET) or **1,396 bytes** (SCN), and the per-civ data blocks end immediately before the map header with no variable-size gap. The "extended data" observed in some saves was likely the per-civ data itself being misattributed.

##### Dead Unit Slot Recycling

Several per-civ fields (bytes 107–108, 109–110, 111–112, 113–114) are **runtime-maintained counters** — the game engine increments them when a unit is built and decrements them when a unit is lost. These counters are perfectly accurate during gameplay but cannot be exactly reconstructed from a save file snapshot due to **dead unit slot recycling**:

When a unit dies, its 32-byte record in the unit array is marked as dead but retains the original owner and type data. When *any* civ later builds a new unit, the engine reuses the lowest-numbered dead slot, overwriting the previous owner/type with the new unit's data. The save file only records the current occupant of each slot — the original owner's contribution to the per-civ counter is lost.

**Effect on cross-sectional analysis** (computing counters from a single save snapshot):

| Field | Match rate (all saves) | Match rate (no dead slots) | Explanation |
|-------|----------------------|--------------------------|-------------|
| `navalUnitCount` (+107–108) | 96.4% | 98.8% | Low noise — few naval units overall |
| `totalUnitAtkSum` (+113–114) | 81.7% | 87.5% | Moderate noise — each recycled slot adds/subtracts one attack value |
| `totalUnitAtkDefSum` (+111–112) | 37.1% | 45.8% | Higher noise — accumulates both atk+def per recycled slot |

**Sequential save analysis** (comparing consecutive turns) confirms 100% exact delta matches for all three counters, proving the formulas are correct despite the lower cross-sectional match rates.

##### Power Graph and Demographics Formulas

The Civ2 F-key demographics screen and the power graph use pre-cached per-civ values. Several of these are stored in the per-civ block:

| Demographic | Per-Civ Field | Byte(s) | Notes |
|-------------|--------------|---------|-------|
| Population | `sumOfCitySizes` | 109–110 | Direct sum of all city sizes |
| Military units | `militaryPower` | 103–104 | May be a count of military units (see naming discrepancy) |
| Cities | `cityCount` | 105–106 | Direct count |
| Naval forces | `navalUnitCount` | 107–108 | Count of sea-domain units |
| Military strength | `totalUnitAtkSum` | 113–114 | Sum of RULES.TXT attack values |
| Military (atk+def) | `totalUnitAtkDefSum` | 111–112 | Sum of RULES.TXT attack+defense |

**Power Graph formula** (confirmed by CivFanatics community testing):
```
Power = Population + (Techs / 2.67) + (Gold / 256)
```
Military units are NOT included in the power graph rating. Source: https://forums.civfanatics.com/threads/power-rating-vs-power-graph.463/

**Foreign Minister Power Rating** (F3 screen: Pathetic/Weak/Poor/Fair/Good/Excellent/Supreme) uses the **same formula** as the Power Graph. Military units are NOT included. Source: https://civilization.fandom.com/wiki/Diplomacy_(Civ2)

**Military Advisor Weapon Icons** (F3 screen) are a separate assessment from the power rating. The exact Civ2 formula is undocumented; the Civ3 analog is `(3A + 2D) × HP + B`. Community anecdotes suggest Civ2 uses approximately `2A + D` but this is unconfirmed. Source: https://forums.civfanatics.com/threads/military-advisor-relative-strength-assessment-definition.62980/

**Selected Demographics formulas** (confirmed by CivFanatics community testing):

| Demographic | Formula | Source |
|-------------|---------|--------|
| Military Service | `10 × (military units) / (total citizens)` | https://forums.civfanatics.com/threads/demographics.42324/ |
| Disease | `50 × (citizens+1) / (c1 + 2×c2 + 3×c3 + citizens + 1)` where c1/c2/c3 = pop in cities with 1/2/3 of {aqueduct, sewer, granary}. Pyramids count as granary; Medicine halves; Cure for Cancer halves again. | https://forums.civfanatics.com/threads/how-the-demographics-works.37033/ |
| GNP | Total uncorrupted gold production (1 gold = 1 million) | CivFanatics |
| Manufacturing Goods | Total unwasted shields (1 shield = 1 megaton) | CivFanatics |

Other demographics (crop yield, pollution, literacy, life expectancy, family size, approval rating) appear to be computed on-the-fly from city data rather than pre-cached in the per-civ block.

##### Cross-Reference Sources

The per-civ block has been cross-referenced against multiple independent sources. Fields confirmed by 2+ sources are marked with high confidence.

| Source | Type | Key Contribution | URL |
|--------|------|-----------------|-----|
| FoxAhead / Civ2-UI-Additions | Pascal DLL, TCiv struct | Authoritative in-memory layout; confirmed treaty offset, attitude count, field sizes | https://github.com/FoxAhead/Civ2-UI-Additions (`src/Civ2Types.pas`) |
| axx0 / Civ2-clone | C# reimplementation | Field names (`patience`, `numberMilitaryUnits`); save file reader | https://github.com/axx0/Civ2-clone |
| Catfish's Cave (ToT hex guide) | Documentation | ToT per-tribe field names; confirms patience, per-tribe reputation | https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm |
| TOTPP Lua API | Lua scripting interface | Exposes `tribe.patience`, `tribe.reputation[t]`, `tribe.betrayals` | https://profgarfield.github.io/auto_doc/tribeObject.html |
| Allard Höfelt hexedit.rtf v1.8 | Documentation (FW/MGE) | Original community reference; uses 1-indexed offsets. Known off-by-one error at treaty start. | Via https://github.com/tek10/civ2mod (`hexedit.rtf`) |
| CivFanatics forums | Community research | Treaty flag definitions, power graph formula, demographics formulas | https://forums.civfanatics.com/ |
| This project (statistical analysis) | Empirical analysis (232 saves) | Per-continent statistics, AI continent goals, runtime counters, treaty violations | `/tmp/findings_*.md` analysis scripts |

##### Naming Discrepancies Between Sources

| Byte(s) | This Document | FoxAhead | axx0/Civ2-clone | TOTPP Lua | Catfish's Cave (ToT) |
|---------|--------------|----------|----------------|-----------|---------------------|
| +22 | AI random seed | SenateChances | — | — | — |
| +31 | Reputation (betrayals) | Reputation | reputation (discarded) | tribe.betrayals | Reputation |
| +32 | Patience | Unknown_1F | patience (discarded) | tribe.patience | Patience |
| +73–80 | Treaty violations | (in Unknown9) | — | tribe.reputation[t] | Reputation with tribe 0–7 |
| +103–104 | Military power | (in Unknown9) | numberMilitaryUnits | — | Total number of military units |

**Notes on discrepancies:**
- **AI random seed / SenateChances** (+22): FoxAhead's name may derive from the memory offset context in the executable. Empirical analysis across 232 saves shows a uniform 0–99 distribution uncorrelated with government type, behaving as an AI PRNG.
- **Military power / numberMilitaryUnits** (+103–104): Multiple sources call this a "military unit count" rather than a power metric. Empirical verification comparing the stored value against actual military unit counts from the unit records would resolve this. The per-continent section A sums approximately equal this field.
- **Treaty violations / reputation** (+73–80): Catfish's Cave and TOTPP call these "per-tribe reputation" values. Our signed int8 analysis confirms the underlying mechanism: negative values track treaties this civ broke (100% vendetta correlation), positive values track treaties broken by the target. The concept is the same — bilateral diplomatic standing — but "treaty violations" more precisely describes the observed behavior.

##### Test of Time (ToT) → MGE Offset Mapping

The ToT per-tribe block is 3,348 bytes (vs MGE's 1,428). ToT inserts 8 unknown bytes at the start of each block (ToT offsets +2 to +9), shifting all subsequent fields by 8:

```
MGE_offset = ToT_offset − 8   (for approximately the first ~120 bytes)
```

| ToT Offset | MGE Offset | Field |
|-----------|-----------|-------|
| +0 | +0 | State flags |
| +1 | +1 | Gender |
| +2–9 | *(not present)* | ToT-only: 8 unknown bytes |
| +10–13 | +2–5 | Gold (int32) |
| +38 | +30 | Reputation (betrayals) |
| +39 | +31 | Patience |
| +40–71 | +32–63 | Treaties (32 bytes) |
| +72–79 | +64–71 | Attitudes (8 bytes) |
| +80–87 | +72–79 | Per-tribe reputation |
| +88–95 | +80–87 | Unknown (8 bytes) |
| +96–108 | +88–100 | Tech bitmask (13 bytes) |
| +110–111 | +102–103 | Military power / unit count |
| +112–113 | +104–105 | City count |
| +116–117 | +108–109 | Sum of city sizes |

**Warning**: The 8-byte shift applies cleanly to the first ~120 bytes. After that, the ToT format diverges significantly (3,348 vs 1,428 bytes), with ToT having additional fields for multiple maps, extended unit types (80 vs 63), and other expansions. Catfish's Cave labels for ToT offsets +110–123 ("Military Unit Count", "City Count", etc.) do NOT map directly to MGE offsets via the simple −8 formula.

#### Autosave Filename

The autosave produced when "Autosave each turn" is enabled is named `St_Auto.SAV`, saved to the game's installation directory.

### Section 4: Map Data (three blocks + padding)
The map data consists of a **fixed-position map header**, three contiguous data blocks, and a 1024-byte padding block. The map header offset depends on the file type:

| File Type | Map Header Offset | Source |
|-----------|------------------|--------|
| `.SAV`, `.NET`, `.HOT`, `.EML` | **13702** (0x3586) | civ2mod.c: `MAP_HEADER_OFFSET 13702` |
| `.SCN` | **13432** (0x3478) | 270 bytes earlier (14 preamble + 8×32 per-civ) |

#### Map Header (14 bytes)

Seven uint16 LE values (confirmed by civ2mod.c and hexedit.rtf):

| Relative Offset | Field | Example | Notes |
|--------|-------|---------|-------|
| +0 | `map_width2` | 80 | Map width × 2 (Civ2 doubled coordinate system). Actual tile columns = value / 2. |
| +2 | `map_height` | 50 | Map height in rows. |
| +4 | `map_size` | 2000 | Total tiles = (map_width2 / 2) × map_height. |
| +6 | `map_shape` | 0 | 0 = round (wraps horizontally), 1 = flat. |
| +8 | `map_seed` | 16388 | Random seed for map generation. Only 64 patterns exist (Höfelt). Used for resource placement: `s = seed % 64`, then `s & 3` and `(s >> 2) & 3` give the 4×4 grid position for special resource 1; special 2 is offset by (+2, +2). See Layer 8: Resource/Special Icons. |
| +10 | `quarter_width` | 20 | ⌈map_width2 / 4⌉, rounded up. Used for Block 3 dimensions. |
| +12 | `quarter_height` | 13 | ⌈map_height / 4⌉, rounded up. Used for Block 3 dimensions. |

**Validation**: `map_size` must equal `(map_width2 / 2) × map_height`. If not, the header read is at the wrong offset.

**Relationship to file header (offset 0x0A/0x0C):** The file header contains different map dimension values than this map header. The file header value at 0x0A equals approximately `map_width2 / 2 + 4`; the "+4" is unexplained. The file header height at 0x0C has no obvious arithmetic relationship to `map_height`. **⚠️ Always use this map header for tile data calculations. Using the file header values produces completely wrong offsets and a garbled map.** See the Debugging Guide in Common Pitfalls for a detailed symptom→cause table.

#### Block 1: Per-Civ Known Improvements (offset = map_header + 14, size = `map_size × 7`)

Starts immediately after the map header. Contains 7 sections of `map_size` bytes each — one section per non-barbarian civilization. Each byte in a section encodes the tile improvements that civilization has last observed for that tile:

| Bit | Improvement |
|-----|-------------|
| 0x01 | Unit present |
| 0x02 | City present |
| 0x04 | Irrigation |
| 0x08 | Mining |
| 0x10 | Road |
| 0x20 | Railroad (upgrade over road) |
| 0x40 | Fortress |
| 0x80 | Pollution |

Farmland = irrigation + mining (both bits set). Airbase = fortress + city present (explains the airbase "bugs": extra food from city-square treatment, acts as railroad like a city). In Test of Time, transport sites are marked with pollution + city present. Undiscovered tiles are `0x00`.

Note: All cities, including unknown ones, are marked in these blocks. Undiscovered cities generally lack the "unit present" flag. A city that was never discovered and has since been destroyed remains on the civ's map until the area is re-explored. Enemy units lost from sight remain at their last seen location until new intelligence is gathered.

#### Block 2: Terrain Data (offset = `block1_offset + map_size × 7`, size = `map_size × 6`)

**This is the actual map data.** Each tile is a 6-byte record. The block offset is calculated as:

```
block1_offset = MAP_HEADER_OFFSET + 14
block2_offset = block1_offset + (map_size * 7)
```

From civ2mod.c: `map_block2_offset = MAP_DATA_OFFSET + (mapSize * 7)`

**Tile coordinate → file offset** (confirmed from civ2mod.c `getMapItem()`, line 356):

```python
# Convert isometric (x, y) coordinate to Block 2 tile record offset
# x is doubled-coordinate (0 to map_width2-1), y is row (0 to map_height-1)
tile_index = (y * map_width) + (x // 2)    # map_width = map_width2 / 2
tile_offset = block2_offset + (tile_index * 6) + byte_number  # byte 0-5
```

**Map wrapping behavior** (confirmed from civ2mod.c `setMapItemVisible()`, line 602):

- **X axis wraps**: if x < 0, add `map_width2`; if x ≥ `map_width2`, subtract `map_width2`
- **Y axis does NOT wrap**: if y < 0 or y ≥ `map_height`, the coordinate is out of bounds (skipped)

This means the map is a cylinder: wrapping horizontally but clipped at the top and bottom poles.

##### Tile Record Structure (6 bytes per tile)

| Byte | Field | Encoding |
|------|-------|----------|
| 0 | **Terrain type + flags** | Low nibble (`& 0x0F`): terrain ID (0–10). **Bit 7 (0x80)**: **river present** on this tile (confirmed by hexedit.rtf and empirical testing across multiple saves — river direction is computed at render time from neighbor analysis, see Rendering Pipeline). **Bit 6 (0x40)**: "no resource" — prevents the tile from displaying a special resource even when one would normally appear. **Bit 5 (0x20)**: terrain resource animation (Test of Time only, unused in MGE). |
| 1 | **Tile improvements** | Same encoding as Block 1 improvement flags: bit 0 (0x01) = unit present, bit 1 (0x02) = city present, bit 2 (0x04) = irrigation, bit 3 (0x08) = mining, bit 4 (0x10) = road, bit 5 (0x20) = railroad (upgrade over road), bit 6 (0x40) = fortress, bit 7 (0x80) = pollution. Farmland = irrigation + mining. Airbase = fortress + city present. |
| 2 | **City radius owner** | Bits 5–7 encode which civ's city radius claims this tile: `civ_id = (byte >> 5) & 7`. **Confirmed by direct cross-reference**: every civ's city tile has exactly its civ ID encoded here. `0x00` = unclaimed, `0x20` = civ 1, `0x40` = civ 2, `0x60` = civ 3, `0x80` = civ 4, `0xA0` = civ 5, `0xC0` = civ 6, `0xE0` = civ 7. Low 5 bits are **always zero** (verified across all 2,000 tiles). Territory counts: civ 5 = 453 tiles, civ 2 = 160, civ 3 = 105, civ 1 = 40, civ 4 = 16, unclaimed = 1,226. |
| 3 | **Continent/body ID** | Each contiguous body of land or water gets a unique number. Counting starts at the top-left corner and proceeds left-to-right, top-to-bottom. Land and water counters start independently at 1. Water bodies of fewer than 9 tiles always get number 63 but still count toward the total. The body ID is displayed in-game when right-clicking a tile (the third number in `Loc: (X, Y) N`). |
| 4 | **Visibility bitmask** | Per-civ exploration flags. Bit 0 = Red (Barbarians), bit 1 = White (civ 1), bit 2 = Green (civ 2), bit 3 = Blue (civ 3), bit 4 = Yellow (civ 4), bit 5 = Cyan (civ 5), bit 6 = Orange (civ 6), bit 7 = Purple (civ 7). `0x00` = no civilization has explored this tile. |
| 5 | **Ownership + fertility** | **High nibble (`>> 4`)**: tile ownership. `0x0`=Barbarians (Red), `0x1`=White, `0x2`=Green, `0x3`=Blue, `0x4`=Yellow, `0x5`=Cyan, `0x6`=Orange, `0x7`=Purple, `0xF`=no owner. Used for airbase color display, and only tiles with owner value 0 (barbarian/none) can have goody huts. **Low nibble (`& 0x0F`)**: AI fertility score (0–15). `0` = infertile, `15` = most fertile (AI builds a city immediately). Only Plains and Grassland get non-zero initial values; other terrains start at 0 but can increase from improvements. AI only builds cities on tiles with fertility > 7. Fertility within existing city radii is reduced to discourage overlapping settlements. Rivers, resources, farmland, mining, irrigation, and roads may increase fertility. |

> **Höfelt alignment check:** Höfelt's documentation is correct for all 6 bytes. Byte[0]: terrain type (low nibble) confirmed; **Höfelt is correct** that bit 7 = river and bit 6 = no resource. Our earlier analysis incorrectly attributed bit 7 to "resource/shield bonus" and placed rivers in byte[1] bits 0–3; empirical testing across multiple saves (ROMAN, STUBEAR) confirms Höfelt: **byte[0] bit 7 = river**, byte[0] bit 6 = no resource. Rivers have no directional data stored per-tile — direction is computed at render time from neighbor analysis (see Rendering Pipeline section). Byte[1]: improvements confirmed (same encoding as Block 1: bit0=unit, bit1=city, bit2=irrigation, bit3=mining, bit4=road, bit5=railroad, bit6=fortress, bit7=pollution). Byte[2]: city radius confirmed (`civ = byte >> 5`). Byte[3]: body counter confirmed (body 63 for small water < 9 tiles). Byte[4]: visibility confirmed (per-civ bit mapping). Byte[5]: ownership (high nibble) + fertility (low nibble) confirmed.

> **civ2mod.c algorithm confirmation (ownership modification):** The `setContinentOwner()` function at line 403 modifies byte[5] ownership by clearing bits 4-7 (`setbitoff` on bits 4,5,6,7) then adding `newOwner * 16`. This definitively confirms: **high nibble = ownership** (bits 4-7), **low nibble = fertility** (bits 0-3, preserved during ownership change).

##### Visibility Radius Patterns (from civ2mod.c)

The `addToVisibilityMap()` function (line 563) reveals the exact tile offsets used for visibility rings in the isometric coordinate system:

```
Radius 0 (1 tile):   center only
Radius 1 (9 tiles):  center + (-1,-1) (+1,-1) (+1,+1) (-1,+1) (0,-2) (0,+2) (+2,0) (-2,0)
Radius 2 (21 tiles): radius 1 + (-1,-3) (+1,-3) (-2,-2) (+2,-2) (-3,-1) (+3,-1)
                                  (-3,+1) (+3,+1) (-2,+2) (+2,+2) (-1,+3) (+1,+3)
```

In the civ2mod.c code: cities call `addCityToVisibilityMap()` with radius 3, but the function body only implements up to radius 2 (21 tiles). Units on ocean call with radius 1 (9 tiles). These coordinates use the doubled-X isometric system, where each (dx, dy) step represents one tile in the diamond grid.

#### Block 3: Quarter-Resolution Data (offset = Block 2 end, size = `quarter_width × quarter_height × 2`)

Purpose unclear. Höfelt: "This section seems to be entirely pointless. Even more so because in Test of Time there's only ever one third block." Two parts with structure roughly similar to the map at quarter resolution.

#### 1024-Byte Padding

Located between Block 3 and the unit section. Höfelt: "almost certainly nothing to do with the map." In ToT this is 10,240 bytes.

#### Section Navigation Formula (civ2mod.c algorithm)

The complete formula to navigate from the map header to every subsequent section:

```
map_header      = 13702                                    # Fixed
map_width2      = uint16 at 13702
map_height      = uint16 at MAP_HEADER_OFFSET + 2
map_size        = uint16 at MAP_HEADER_OFFSET + 4            # = map_width2/2 * map_height
quarter_width   = uint16 at MAP_HEADER_OFFSET + 10
quarter_height  = uint16 at MAP_HEADER_OFFSET + 12

block1_offset   = MAP_HEADER_OFFSET + 14
block2_offset   = block1_offset + map_size * 7               # Terrain data
block3_offset   = block2_offset + map_size * 6
unit_offset     = block3_offset + quarter_width * quarter_height * 2 + 1024
city_offset     = unit_offset + total_units * UNIT_RECORD_SIZE
```

This matches the civ2mod.c navigation exactly. The city section calculated this way agrees with the end-of-file method (`EOF - tail_size - 32 - num_cities * CITY_RECORD_SIZE`).

#### Terrain Type IDs

| ID | Terrain | ID | Terrain |
|----|---------|----|---------|
| 0 | Desert | 6 | Tundra |
| 1 | Plains | 7 | Glacier |
| 2 | Grassland | 8 | Swamp |
| 3 | Forest | 9 | Jungle |
| 4 | Hills | 10 | Ocean |
| 5 | Mountains | | |

#### Territory / Visibility (Byte 4) — Key Finding

**This is the most important byte for territory visualization.** It is a bitmask where each bit represents one civilization slot:

```
Bit 0 (0x01) = Barbarians (Red)
Bit 1 (0x02) = White (civ 1)
Bit 2 (0x04) = Green (civ 2)
Bit 3 (0x08) = Blue (civ 3)
Bit 4 (0x10) = Yellow (civ 4)
Bit 5 (0x20) = Cyan (civ 5)
Bit 6 (0x40) = Orange (civ 6)
Bit 7 (0x80) = Purple (civ 7)
```

The minimap colors each tile by the **highest bit set** — i.e., the last civ to explore it.

For ocean tiles, multiple bits are commonly set (e.g., `0b00111111` = 63, meaning all 6 civs have sailed there).

##### TODO: Map Data Remaining Unknowns
- [x] Three-block structure confirmed (Höfelt, civ2mod.c)
- [x] All 6 tile bytes decoded and verified against binary data (Session 12)
- [x] Block offset formula confirmed (civ2mod.c)
- [x] Byte[0] bit 7 corrected: **river flag** per hexedit.rtf (Session 12 incorrectly called it resource/shield; corrected after empirical testing)
- [x] Byte[1] fully decoded: bits 0–3 = river directions, bit 4 = road, bit 6 = railroad (Session 12)
- [x] Byte[2] formula confirmed: civ_id = (byte >> 5) & 7, low 5 bits always zero (Session 12)
- [x] Byte[4] per-civ bit mapping verified: bit N = civ N visibility (Session 12)
- [ ] City flags rendering: document exact rules for when per-civ flag sprites (CITIES.GIF y=425, 14×22px) are drawn on cities. Civ2-clone draws them when cities contain units (`tile.UnitsHere.Count > 0`). Need to verify: (a) flags on all garrisoned cities vs only occupied/resistance cities, (b) exact position on city sprite (Civ2-clone uses per-sprite `FlagLoc`), (c) whether row 0 vs row 1 (y=425 vs y=448) are light/dark variants or represent different states (e.g., normal vs occupied).
- [ ] Block 3 purpose — verify whether it has any gameplay effect
- [ ] Determine if the 1024-byte padding block contains any meaningful data
- [ ] Byte[5] high nibble: confirm if values 1–5 are overlay variant indices for TERRAIN2.GIF
- [ ] Byte[1] bits 0–3: verify exact river direction mapping (NE/SE/SW/NW assignment)
- [ ] **RENDERING**: Byte[1] bit 0 "unit present" flag — the doc notes this flag gates unit visibility, but the renderer ignores it. Determine whether the game engine uses this flag to control unit sprite rendering and how it interacts with FOW.
- [ ] **RENDERING**: Byte[5] high nibble "tile ownership" — documented as "used for airbase color display." Determine how airbase sprite color changes per tile owner (recoloring? variant selection? overlay?). Currently renderer draws a single airbase sprite with no per-owner coloring.

### Isometric Coordinate System

Civ2 uses an **isometric diamond grid** with a doubled X coordinate system:

- The map data header at offset 13702 defines the grid: `map_width2` (doubled width) and `map_height`. Actual tile columns per row = `map_width2 / 2` (e.g., 80/2 = 40).
- **Even rows** (0, 2, 4, ...) have tiles at even X positions: 0, 2, 4, ..., `map_width2 − 2`
- **Odd rows** (1, 3, 5, ...) have tiles at odd X positions: 1, 3, 5, ..., `map_width2 − 1`
- Each row stores `map_width2 / 2` tiles sequentially in the tile data blocks.
- Tile index in Block 2: `index = row × (map_width2 / 2) + col_within_row`
- City X coordinates (from city records at +0) range from 0 to `map_width2 − 1` (0–79 for an 80-wide doubled coordinate map).
- City Y coordinates (from city records at +2) range from 0 to `map_height − 1` (0–49 for a 50-tall map).
- To convert city coordinates to grid position: `grid_x = city_x // 2`, `grid_y = city_y`.
- **The map wraps horizontally.** Apply `grid_x % (map_width2 // 2)` when needed.

For rendering, each tile is a **diamond** shape. Odd rows are offset horizontally by half a tile width. See the rendering algorithm below.

> **⚠️ Do NOT use the file header values at 0x0A/0x0C (e.g., 44×63) for coordinate math. Use the map header at offset 13702.**

#### Map Rendering Algorithm (Validated Against Game Screenshot)

The following algorithm produces a map render that matches the actual Civ2 game display. It was validated by comparing the output against a cheat-mode zoomed-out screenshot of the same save file, confirming correct terrain, city positions, continent shapes, and ocean layout.

##### Step 1: Read Map Header

```python
# Determine map header offset based on file type
if file_extension == '.SCN':
    MAP_HEADER_OFFSET = 13432
else:
    MAP_HEADER_OFFSET = 13702     # SAV, NET, HOT, EML

map_width2      = uint16_le(data, MAP_HEADER_OFFSET + 0)    # Width × 2 (doubled coordinate system)
map_height      = uint16_le(data, MAP_HEADER_OFFSET + 2)    # Height in rows
map_size        = uint16_le(data, MAP_HEADER_OFFSET + 4)    # Total tiles
quarter_width   = uint16_le(data, MAP_HEADER_OFFSET + 10)   # For Block 3 size calculation
quarter_height  = uint16_le(data, MAP_HEADER_OFFSET + 12)   # For Block 3 size calculation

map_width = map_width2 // 2                # Actual tile columns per row

# Validate: map_size must equal map_width * map_height
assert map_size == map_width * map_height
```

##### Step 2: Calculate Block 2 Offset (terrain data)

```python
block1_offset = MAP_HEADER_OFFSET + 14
block2_offset = block1_offset + (map_size * 7)     # Skip Block 1 (per-civ improvements)
```

Block 1 is 7 sections of `map_size` bytes each (one per non-barbarian civ, containing known tile improvements). This is the most common source of errors — reading Block 1 instead of Block 2 produces garbage terrain.

##### Step 3: Read Terrain for Each Tile

Tiles are stored row by row, `map_width` tiles per row. For tile at grid position (grid_x, grid_y):

```python
tile_index = grid_y * map_width + grid_x
tile_offset = block2_offset + tile_index * 6

terrain_id = data[tile_offset] & 0x0F      # 0=Desert ... 10=Ocean
has_river  = bool(data[tile_offset] & 0x80)
```

##### Step 4: Convert City Coordinates to Grid Position

City coordinates use the doubled X system. Convert to grid position for rendering:

```python
# City record: X at +0, Y at +2 (uint16 LE), Name at +32
city_x = uint16_le(data, city_offset + 0)   # Doubled coordinate (0 to map_width2-1)
city_y = uint16_le(data, city_offset + 2)   # Row (0 to map_height-1)

grid_x = city_x // 2                        # Grid column (0 to map_width-1)
grid_y = city_y                              # Grid row (unchanged)
```

##### Step 5: Render Isometric Diamond Grid

Each tile is rendered as a diamond. Odd rows are offset horizontally by half a tile width:

```python
TILE_W = 32    # Diamond width in pixels
TILE_H = 16    # Diamond height in pixels

for y in range(map_height):
    for x in range(map_width):
        # Isometric pixel position
        x_pixel_offset = (TILE_W // 2) if (y % 2 == 1) else 0
        px = x * TILE_W + x_pixel_offset
        py = y * (TILE_H // 2)

        # Diamond vertices
        center_x = px + TILE_W // 2
        center_y = py + TILE_H // 2
        diamond = [
            (center_x, py),                    # top
            (px + TILE_W, center_y),           # right
            (center_x, py + TILE_H),           # bottom
            (px, center_y),                    # left
        ]
        draw_polygon(diamond, fill=terrain_color[terrain_id])
```

##### Step 6: Apply Horizontal Wrapping (camera offset)

The game view wraps horizontally. To match a specific camera position (e.g., from a screenshot), apply a column offset:

```python
camera_x_start = 34   # In doubled coordinates; adjust to match desired view

for vis_col in range(map_width):
    actual_grid_x = (vis_col + camera_x_start // 2) % map_width
    # Read tile at (actual_grid_x, y) but render at visual column vis_col
```

##### Step 7: Navigate to City Section

To find city records, chain the offset calculations forward from the map header:

```python
total_units  = uint16_le(data, 0x003A)     # Header offset 0x003A
total_cities = uint16_le(data, 0x003C)     # Header offset 0x003C

block3_offset = block2_offset + map_size * 6
unit_offset   = block3_offset + quarter_width * quarter_height * 2 + 1024

# Record sizes depend on file type
if file_extension == '.SCN':
    unit_record_size = 26
    city_record_size = 84
else:
    unit_record_size = 32      # SAV/NET/HOT/EML
    city_record_size = 88

city_offset = unit_offset + total_units * unit_record_size

# Each city: X at +0, Y at +2, Owner at +8, Name at +32
for i in range(total_cities):
    record = city_offset + i * city_record_size
    cx = uint16_le(data, record + 0)
    cy = uint16_le(data, record + 2)
    owner = data[record + 8]
    name = null_terminated_string(data, record + 32, 16)
```

##### Terrain Color Palette

Approximate RGB values matching the Civ2 game palette:

| ID | Terrain | RGB |
|----|---------|-----|
| 0 | Desert | (210, 180, 100) |
| 1 | Plains | (170, 155, 75) |
| 2 | Grassland | (80, 145, 50) |
| 3 | Forest | (30, 105, 30) |
| 4 | Hills | (155, 125, 75) |
| 5 | Mountains | (170, 160, 150) |
| 6 | Tundra | (175, 190, 200) |
| 7 | Glacier | (230, 240, 250) |
| 8 | Swamp | (50, 85, 65) |
| 9 | Jungle | (20, 70, 20) |
| 10 | Ocean | (40, 60, 155) |

##### Civilization Colors

| Slot | Color | RGB |
|------|-------|-----|
| 0 | Red (Barbarians) | (200, 0, 0) |
| 1 | White | (255, 255, 255) |
| 2 | Green | (0, 180, 0) |
| 3 | Blue | (50, 80, 220) |
| 4 | Yellow | (240, 220, 0) |
| 5 | Cyan | (0, 200, 200) |
| 6 | Orange | (240, 140, 0) |
| 7 | Purple | (180, 0, 200) |

##### Common Pitfalls

1. **Reading Block 1 instead of Block 2**: Block 1 (per-civ improvements) starts immediately after the map header. Block 2 (actual terrain) starts at `block1_offset + map_size * 7`. Forgetting to skip Block 1 is the most common error.

2. **City name at +0 vs +32**: The city record starts with XY coordinates, not the name. The name is at offset +32 within the record. (civ2mod.c: `CITY_ITEM_NAME_OFFSET 32`.)

3. **Doubled coordinate system**: City X coordinates are in the doubled system (0 to `map_width2 - 1`). Divide by 2 to get the grid column. Even rows use even X, odd rows use odd X.

4. **Isometric stagger**: Odd rows must be shifted right by half a tile width when rendering. Without this offset, the map appears as a rectangular grid instead of the correct diamond pattern.

5. **Horizontal wrapping**: The map wraps. Cities near X=0 or X=map_width2 may appear on the opposite edge of the display. Apply modular arithmetic: `grid_x % map_width`.

6. **Tile byte 3 vs byte 4**: Old community docs sometimes had these swapped. Byte 3 is the land/sea body counter; byte 4 is the visibility bitmask. civ2mod.c confirms: `MAP_ITEM_COUNTER 3`, `MAP_ITEM_VISIBILITY 4`.

7. **Two different dimension sources — file header vs. map header**: The file begins with a `CIVILIZE` header containing map width (offset 0x0A) and height (0x0C). These values (e.g., 44×63) are **completely different** from the map data header at offset 13702 (e.g., 80×50 → 40-column × 50-row grid). If you use the file header dimensions:
   - You calculate `total_tiles = 22 × 63 = 1,386` instead of the correct `2,000`
   - You calculate `block2_offset` with the wrong `map_size`, landing inside Block 1
   - You read data ~4,300 bytes too early — likely still inside Block 1 (per-civ improvements), which is mostly zeros
   - Zeros in byte[0] decode as terrain ID 0 (Desert), producing a map that is ~96% desert
   - City coordinate-to-tile mapping uses wrong grid width, placing many cities on ocean
   - The resulting map has wrong continent shapes, wrong terrain, and cities in the water

   **This is the #1 most catastrophic error and the hardest to debug**, because the wrong data can still look superficially plausible (valid terrain IDs, some non-zero values). The correct source for all map dimensions is **always** offset 13702.

8. **Validating terrain reads — the "cities on ocean" test**: After reading terrain, verify that no alive city (size > 0) sits on an ocean tile. For a correctly parsed map, the count should be exactly zero. If any alive city maps to ocean, either the block offset, the terrain byte, or the coordinate mapping is wrong. This is the single most reliable validation check.

9. **Terrain distribution sanity check**: A correctly parsed standard Civ2 map should show roughly 40–55% ocean, with the remaining land distributed across multiple terrain types (no single land type exceeding ~15%). If you see >80% of any terrain type (especially Desert), you are reading the wrong block or the wrong byte within the block.

##### Debugging Guide: Symptom → Root Cause

This section documents failure modes discovered through extensive debugging. If your render doesn't match the game, consult this table first.

| Symptom | Most Likely Root Cause | Fix |
|---------|----------------------|-----|
| Map is ~96% Desert (terrain ID 0) | Reading Block 1 instead of Block 2. Block 1 is per-civ known improvements; undiscovered tiles are `0x00`, which looks like terrain ID 0 (Desert). | Recalculate `block2_offset = MAP_HEADER_OFFSET + 14 + (map_size * 7)` using `map_size` from the map header. |
| Map is ~96% Desert AND `map_size` seems wrong | Using file header dimensions (0x0A/0x0C) instead of the map data header. The wrong map_size produces a wrong Block 2 offset that lands inside Block 1. | Read `map_size` from the map data header (offset 13702 for SAV/NET, 13432 for SCN), NOT from the file header. |
| Terrain distribution looks realistic (~45-55% ocean) but many cities are on ocean tiles | Block 2 offset is close but not exact, OR you're reading the right block but using wrong map dimensions for coordinate-to-tile conversion. Coincidentally plausible distributions can occur at slightly wrong offsets. | Verify `block2_offset` arithmetic. Verify `grid_x = city_x // 2` uses `map_width = map_width2 // 2` from offset 13702. |
| City names and owners are correct, positions are spatially wrong | City record format is correctly parsed (name at +32, coords at +0/+2), but coordinate-to-grid mapping uses wrong map width. | Use `map_width = uint16(offset 13702) // 2` for grid conversion, not file header width. |
| Continent shapes don't match game screenshot | Wrong tile block. Even a few hundred bytes of offset error produces completely different continent shapes. | Double-check: `block2_offset = MAP_HEADER_OFFSET + 14 + (map_size * 7)` with `map_size` from the map header. Cross-validate by checking terrain under known city positions. |
| Ocean appears where land should be (spotty, not systematic) | Possible byte-swap within tile record — reading byte[4] (visibility bitmask) instead of byte[0] (terrain). Visibility bytes can contain `0x0A`-like values. | Terrain is byte[0] & 0x0F in Block 2 tile records. Byte[4] is visibility, byte[3] is body counter. |
| Many tiles show as "unknown terrain" (IDs > 10) | Reading the wrong byte, or at a misaligned offset. All 6-byte tile records in Block 2 should have byte[0] & 0x0F ≤ 10. | If you find IDs > 10, you are NOT reading Block 2 terrain. Recalculate offset. |

##### Implementation Validation Checklist

After parsing the save file, run these checks before attempting a render. If any check fails, **stop and fix the underlying issue** before proceeding — rendering with wrong data wastes time and produces misleading output.

1. **Map header consistency**: `map_size` at offset 13706 must equal `(map_width2 // 2) × map_height`. If not, the header read is wrong.

2. **Terrain distribution**: Count terrain IDs across all `map_size` tiles in Block 2. Expect: Ocean 40–55%, no single land terrain > 15%, at least 7 of 11 terrain types present. If Desert > 30%, you are likely reading Block 1.

3. **Cities on land**: For every alive city (size > 0), convert its coordinates to a grid position and read the terrain at that tile. Expect: zero cities on ocean (terrain 10). If even 1 alive city maps to ocean, the coordinate mapping or block offset is wrong.

4. **Parity check**: City X coordinates must have the same parity as the Y coordinate (even X on even rows, odd X on odd rows). If any city violates this, the coordinate read is wrong.

5. **Coordinate ranges**: All city X values should be 0 to `map_width2 - 1`, all Y values should be 0 to `map_height - 1`. Out-of-range values indicate wrong record structure.

6. **Cross-validation**: The city block can be located two independent ways:
   - Forward: `city_offset = unit_offset + total_units × 32` (chaining from map header)
   - Backward: `city_offset = file_size - tail_size - (num_cities × 88)`
   These must agree. If they differ, one of the intermediate calculations is wrong.

##### Correct Rendering Pipeline (Summary)

For an AI or human implementing a Civ2 save renderer from scratch, follow this exact sequence. Do NOT skip steps or substitute values from the file header.

```
1. OPEN the .sav file as binary data.

2. READ map header at FIXED offset 13702:
     map_width2     = uint16_le(data, 13702)     # e.g., 80
     map_height     = uint16_le(data, 13704)     # e.g., 50
     map_size       = uint16_le(data, 13706)     # e.g., 2000
     quarter_width  = uint16_le(data, 13712)     # e.g., 20
     quarter_height = uint16_le(data, 13714)     # e.g., 13

     map_width = map_width2 // 2                  # Actual tile columns: 40

3. VERIFY: map_size == map_width * map_height     # 40 × 50 = 2000 ✓

4. CALCULATE Block 2 offset (terrain data):
     block1_offset = MAP_HEADER_OFFSET + 14
     block2_offset = block1_offset + (map_size * 7)

5. READ terrain for each tile:
     for y in range(map_height):
         for x in range(map_width):
             idx = y * map_width + x
             off = block2_offset + idx * 6
             terrain_id = data[off] & 0x0F        # 0=Desert...10=Ocean
             has_river  = bool(data[off] & 0x80)

6. VALIDATE: check terrain distribution and cities-on-land (see checklist above).

7. LOCATE cities by chaining forward:
     total_units  = uint16_le(data, 58)
     total_cities = uint16_le(data, 60)
     block3_off   = block2_offset + map_size * 6
     unit_offset  = block3_off + quarter_width * quarter_height * 2 + 1024
     city_offset  = unit_offset + total_units * 32

8. READ city records (88 bytes each):
     city_x = uint16_le(data, city_offset + i*88 + 0)  # Doubled coordinate
     city_y = uint16_le(data, city_offset + i*88 + 2)
     grid_x = city_x // 2                                # Grid column
     grid_y = city_y                                      # Grid row
     owner  = data[city_offset + i*88 + 8]
     size   = data[city_offset + i*88 + 9]
     name   = null_terminated(data, city_offset + i*88 + 32, 16)

9. RENDER isometric diamond grid:
     TILE_W, TILE_H = 32, 16   # or 48×24, 64×32 depending on desired resolution
     for y in range(map_height):
         for x in range(map_width):
             x_offset = (TILE_W // 2) if (y % 2 == 1) else 0
             px = x * TILE_W + x_offset
             py = y * (TILE_H // 2)
             # Draw diamond at (px, py) with terrain color/sprite

10. APPLY camera offset for wrapping (optional):
      To match a specific game view, shift all x reads by a column offset:
      actual_x = (visual_x + camera_col_offset) % map_width
```

##### What the File Header Values (0x0A, 0x0C) Are For

The file header's width (0x0A) and height (0x0C) are read by the game engine during file loading but serve a **different purpose** than the map data header. Hypotheses:

1. **Map generator nominal size**: These may be the "Earth-like", "Random small", etc. template dimensions that the map generator used as a starting point, before the actual tile grid was finalized.

2. **Legacy format compatibility**: Civ2 evolved through multiple versions (Classic → Conflicts in Civilization → Fantastic Worlds → MGE). These fields may be vestigial from an earlier format where the file header dimensions matched the tile grid.

3. **Display/UI parameters**: The game UI (minimap, scrolling bounds) might use these values independently of the tile data dimensions.

Regardless of their purpose, **they must not be used for tile data parsing.** The authoritative dimensions live at offset 13702.

### Section 5: Unit Records

Located between the tile data and city records. The total number of units is stored at header offset `0x003A`. The record size depends on file type:

| File Type | Record Size | Notes |
|-----------|------------|-------|
| SAV / NET / HOT / EML | **32 bytes** | 26 core bytes + 6-byte trailer (unique unit ID + padding) |
| SCN | **26 bytes** | Core record only, no unit ID trailer |

The first 26 bytes of each record are **identical** between SAV and SCN files. SAV/NET files append 6 extra bytes per unit: a **unit sequence ID** (uint16 LE) at offset +26, followed by 4 bytes of zero padding (`0x00000000`). This ID is a globally unique counter assigned at unit creation and never reused — gaps in the sequence indicate destroyed units.

> **CORRECTION**: There is NO 32-byte bridge record between units and cities. Cities start immediately after units. A 32-byte record of unknown purpose exists between the END of city records and the START of the tail section.

**Calculating the unit block position**:
```
# FORWARD CHAIN (preferred):
unit_offset   = MAP_HEADER_OFFSET + 14 + map_size*7 + map_size*6 + qw*qh*2 + 1024
city_offset   = unit_offset + total_units * unit_record_size   # NO bridge gap!
tail_offset   = city_offset + total_cities * city_record_size + 32   # 32-byte gap before tail

# BACKWARD CHAIN (for SAV/NET):
tail_start       = file_size - tail_size
city_block_end   = tail_start - 32                     # 32 bytes before tail
city_block_start = city_block_end - (num_cities × city_record_size)
unit_block_end   = city_block_start
unit_block_start = unit_block_end - (num_units × unit_record_size)
```

#### Unit Record Structure (26 core bytes; 32 bytes in SAV/NET)

All offsets are 0-indexed from the start of each unit record. Höfelt uses 1-indexed byte numbers (FW convention), so Höfelt byte N = offset +(N-1).

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 2 bytes | **X coordinate** (int16 LE) | Doubled-coordinate X (0 to `map_width2 − 1`). Höfelt bytes 1-2. Dead/destroyed units get incorrect coordinate values depending on where they were killed. Unit is invisible if moved unless the terrain tile has the "contains unit" flag set in Block 1. |
| +2 | 2 bytes | **Y coordinate** (int16 LE) | Y coordinate (0 to `map_height − 1`). Höfelt bytes 3-4. |
| +4 | 1 byte | **Movement flags** | Höfelt byte 5 (1st byte of a 2-byte pair). Bitmask: bit 6 = set on first move (remains set permanently), bit 4 = paratrooper launched this turn, bit 1 = unit is immobile. |
| +5 | 1 byte | **Status flags** | Höfelt byte 6 (2nd byte of pair). Bitmask: bit 7 = automate (not just settlers!), bit 6 = unit is "waiting" (W key pressed), bit 5 = **veteran status** (+50% combat). |
| +6 | 1 byte | **Unit type** | Höfelt byte 7. Index into RULES.TXT `@UNITS` section (0=Settlers, 1=Engineers, etc.). Maps to UNITS.GIF: `row = type_id / 9`, `col = type_id % 9`. |
| +7 | 1 byte | **Owner civ slot** | Höfelt byte 8. Which civilization owns this unit (0–7, 0=Barbarians). |
| +8 | 1 byte | **Movement points remaining** | Höfelt byte 9. Multiplied by road move multiplier from RULES.TXT `@COSMIC`, except for "Alpine" units which ignore the multiplier. |
| +9 | 1 byte | **Visibility bitmask** | Höfelt byte 10. Which civs can see this unit. Bit 0 = barbarians, bit 1 = civ 1, etc. The corresponding unit flag in map Block 1 must also be set for the unit to display on that civ's map. |
| +10 | 1 byte | **Hit points lost** | Höfelt byte 11. Damage taken (NOT remaining HP). Subtract from max HP (from RULES.TXT) to get current HP. |
| +11 | 1 byte | **Last direction moved** | Höfelt byte 12. 0=NE, 1=E, 2=SE, 3=S, 4=SW, 5=W, 6=NW, 7=N. `0xFF` = not moved yet. Used by the pathfinder for goto route calculation. |
| +12 | 1 byte | **AI task / role** | Höfelt byte 13. Two 4-bit fields: low nibble = unknown, high nibble = AI-assigned task (displayed on unit shield when map is fully revealed via cheat). Known high values: 2=build city, 9=explore. Value `0x58` appears as standard for human-controlled units. AI reassigns tasks each turn. |
| +13 | 1 byte | **Cargo / work / fuel** | Höfelt byte 14. Overloaded field: for **Caravans** = commodity being carried (0x00=Hides, 0x01=Wool, ..., 0x0A=Uranium; 0xF0=food supply; ≥0x80=food supply). For **Settlers** = turns of work completed on current improvement. For **air units** = turns spent in air (fuel counter). |
| +14 | 1 byte | **Alive status** | Höfelt byte 15. `0x00` = unit alive. Other values = unit dead/destroyed. General use unclear but appears to function as alive/dead indicator. |
| +15 | 1 byte | **Orders** | Höfelt byte 16. `0x01`=fortify (ordered, not yet fortified), `0x02`=fortified, `0x03`=sleep/sentry, `0x04`=build fortress, `0x05`=build road/railroad, `0x06`=build irrigation, `0x07`=build mine, `0x08`=transform terrain, `0x09`=clean pollution, `0x0A`=build airbase, `0x0B`=goto, `0xFF`=no orders. Any other value also means no orders. |
| +16 | 2 bytes | **Home city ID** (uint16 LE) | Höfelt byte 17-18. civ2mod.c: `UNIT_HOMECITY_OFFSET 16`, read via `getLocationAsShort()`. This is the city's **array index** in the city list (0-based), NOT the city sequence ID. `0xFFFF` = no home city. The high byte (+17) is `0x00` for saves with fewer than 256 cities, which is why Höfelt describes byte 18 as "not used (0 always)" — it is actually the high byte of a uint16. |
| +18 | 2 bytes | **Goto X** (int16 LE) | Höfelt bytes 19-20. Destination X coordinate for goto command. `0xFFFF` = no goto. |
| +20 | 2 bytes | **Goto Y** (int16 LE) | Höfelt bytes 21-22. Destination Y coordinate for goto command. `0xFFFF` = no goto. |
| +22 | 2 bytes | **Link to next unit in stack** (int16 LE) | Höfelt bytes 23-24. ID of the unit drawn **on top** of this unit in the same tile. Part of a doubly-linked list for unit stacking. **CAUTION**: modifying can produce strange effects. |
| +24 | 2 bytes | **Link to previous unit in stack** (int16 LE) | Höfelt bytes 25-26. ID of the unit drawn **under** this unit in the same tile. Part of the stacking linked list. **CAUTION**: modifying can produce strange effects. |
| +26 | 2 bytes | **Unit sequence ID** (uint16 LE) | **SAV/NET only** (not present in SCN). Global unique creation counter. Lower = older unit. Gaps represent destroyed units. |
| +28 | 4 bytes | **Always `0x00000000`** | **SAV/NET only** (not present in SCN). Structural padding. |

> **Key correction from Höfelt**: Our earlier analysis misidentified several fields. Byte +7 is the **owner** (not visibility), +8 is **movement points** (not home city), +9 is **visibility** (not special status), +10 is **HP lost** (not owner), +11 is **last direction** (not original builder), +12 is **AI task** (not continent ID), +15 is **orders** (not movement class), +16 is **home city** (not a counter). The bytes +22/+24 are **unit stacking linked list pointers**, not waypoint coordinates.

#### Orders Values Reference

| Value | Order | Notes |
|-------|-------|-------|
| 0x01 | Fortify (in progress) | Ordered but not yet fortified |
| 0x02 | Fortified | Fully fortified, defense bonus active |
| 0x03 | Sleep / Sentry | Wake on enemy sighting |
| 0x04 | Build Fortress | Settler/Engineer order |
| 0x05 | Build Road/Railroad | |
| 0x06 | Build Irrigation | |
| 0x07 | Build Mine | |
| 0x08 | Transform Terrain | Engineer only |
| 0x09 | Clean Pollution | |
| 0x0A | Build Airbase | |
| 0x0B | Goto | Uses +18/+20 destination coordinates |
| 0xFF | No orders | Idle unit |

##### Algorithms from civ2mod.c

**Finding units in a city**: civ2mod.c `setUnitsInCity()` (line 500) detects units garrisoned in a city by comparing the first 4 bytes (X, Y coordinates) of the unit record with the first 4 bytes of the city record. If they match (`memcmp == 0`), the unit is in that city.

**Home city as array index**: civ2mod.c reads the home city field at offset +16 as a `uint16 LE` (`getLocationAsShort(offset+UNIT_HOMECITY_OFFSET)`) and compares it against the city's **array index** (`cityItemOffset / CITY_ITEM_SIZE`). This means the home city ID is the city's position in the city list (0-based), NOT the city sequence ID stored at city byte +84. The value `0xFFFF` = no home city.

##### TODO: Unit Record Remaining Unknowns
- [x] Identified +7 as owner (not visibility) — Höfelt byte 8
- [x] Identified +8 as movement points (not home city) — Höfelt byte 9
- [x] Identified +9 as visibility bitmask — Höfelt byte 10
- [x] Identified +10 as HP lost (not owner) — Höfelt byte 11
- [x] Identified +11 as last direction (not original builder) — Höfelt byte 12
- [x] Identified +12 as AI task (not continent ID) — Höfelt byte 13
- [x] Identified +15 as orders enum (not movement class) — Höfelt byte 16
- [x] Identified +16 as home city ID (not counter) — Höfelt byte 17
- [x] Identified +22/+24 as unit stacking linked list (not waypoint) — Höfelt bytes 23-26
- [ ] Decode +4 bit 6 ("first move") more precisely — confirmed by Höfelt but behavior unclear
- [ ] Decode +12 low nibble (AI task sub-field)
- [ ] Decode +14 alive byte non-zero values (what values indicate death?)
- [ ] **RENDERING**: Unit +5 bit 7 "automate" flag — automated settlers/engineers should display an order letter on their shield (e.g., "A"), but the renderer's ORDER_KEYS table has no automate entry. Determine correct order letter.
- [ ] **RENDERING**: Unit +12 high nibble (AI task) — the doc says this is "displayed on unit shield when map is fully revealed via cheat." Determine what letter/icon is shown per task value (2=build city, 9=explore, etc.) and rendering position.
- [ ] **RENDERING**: Unit +13 cargo byte (Caravan commodity) — determine whether the game visually indicates the commodity being carried. The renderer does not use this field visually.

#### Standard Unit Type IDs (default RULES.TXT)

| ID | Unit | ID | Unit | ID | Unit |
|----|------|----|------|----|------|
| 0 | Settlers | 18 | Crusaders | 36 | Ironclad |
| 1 | Engineers | 19 | Knights | 37 | Destroyer |
| 2 | Warriors | 20 | Dragoons | 38 | Cruiser |
| 3 | Phalanx | 21 | Cavalry | 39 | AEGIS Cruiser |
| 4 | Archers | 22 | Armor | 40 | Battleship |
| 5 | Legion | 23 | Catapult | 41 | Submarine |
| 6 | Pikemen | 24 | Cannon | 42 | Carrier |
| 7 | Musketeers | 25 | Artillery | 43 | Transport |
| 8 | Fanatics | 26 | Howitzer | 44 | Cruise Msl. |
| 9 | Partisans | 27 | Fighter | 45 | Nuclear Msl. |
| 10 | Alpine Troops | 28 | Bomber | 46 | Diplomat |
| 11 | Riflemen | 29 | Helicopter | 47 | Spy |
| 12 | Marines | 30 | Stealth Ftr. | 48 | Caravan |
| 13 | Paratroopers | 31 | Stealth Bmbr. | 49 | Freight |
| 14 | Mech. Inf. | 32 | Trireme | 50 | Explorer |
| 15 | Horsemen | 33 | Caravel | 51 | Extra Land |
| 16 | Chariot | 34 | Galleon | | |
| 17 | Elephant | 35 | Frigate | | |

Note: Unit type IDs above 51 indicate a modded RULES.TXT with custom unit definitions. Order matches the `@UNITS` section in RULES.TXT and the sprite grid in UNITS.GIF (9 columns: `col = id % 9`, `row = id // 9`).

#### Gap Record (32 bytes, between cities and tail)

> **CORRECTION (Session 12):** This 32-byte record is located between the END of city records and the START of the tail section — NOT between units and cities as previously documented. Cities follow directly after units with no gap.

This fixed 32-byte record's exact purpose is not fully decoded, but it appears to contain:
- Bytes 0–3: A coordinate pair (possibly the currently selected unit or map cursor position)
- Bytes 4–25: Game state flags
- Bytes 26–31: Three uint16 values; the last appears related to the number of active civilizations

### Section 6: City Records

City records are stored contiguously immediately after unit records. The record size depends on file type:

| File Type | Record Size | Notes |
|-----------|------------|-------|
| SAV / NET / HOT / EML | **88 bytes** | 84 core bytes + 4-byte trailer (unique city ID + padding) |
| SCN | **84 bytes** | Core record only, no city ID trailer |

The first 84 bytes of each city record are **identical** between SAV and SCN files (verified by byte-for-byte comparison of matching cities). SAV/NET files append 4 extra bytes: a **city sequence ID** (uint16 LE) at offset +84, followed by 2 bytes of zero padding. This ID is a globally unique counter (1-indexed) — gaps indicate destroyed/disbanded cities.

The total count is given by the uint16 at header offset `0x003C`. The city block can be located by:

1. **Forward chain**: `city_offset = unit_offset + total_units * unit_record_size` (no bridge gap)
2. **From the end**: `city_block_start = EOF - tail_size - 32 - (num_cities × city_record_size)`
3. **By searching**: Scan for known city names which appear at **offset +32** within each record. civ2mod.c uses `memmem()` to find the city name string within the city data section, then subtracts `CITY_ITEM_NAME_OFFSET` (32) to get the record start pointer. This works reliably because city names are unique within a save.

#### City Record Structure (84 core bytes; 88 bytes in SAV/NET)

Cross-referenced and confirmed against four independent sources: (1) Allard Höfelt's hex-editing guide v1.8 (hexedit.rtf, FW-centric), (2) TE Kimball's civ2mod.c (MGE-specific C source), (3) Catfish's Cave / FoxAhead's Civ2Types.pas (ToT-based), and (4) direct hex verification of MGE save files.

**CRITICAL LAYOUT CORRECTION**: Previous versions of this document incorrectly stated that the city name was at offset +0 (record start). In fact, the MGE city record layout matches FW exactly: XY coordinates and metadata come FIRST (+0 to +31), city name is in the MIDDLE (+32 to +47), and output/production fields follow (+48 to +87). This is confirmed by civ2mod.c (`CITY_ITEM_NAME_OFFSET 32`, `CITY_ITEM_OWNER_OFFSET 8`) and verified by reading actual save file bytes.

| Offset | Size | Field | Status | Notes |
|--------|------|-------|--------|-------|
| +0 | 2 bytes | **X coordinate** (short LE) | ✅ Confirmed (civ2mod.c, Höfelt) | Isometric map X. civ2mod.c: `getShort(cityblockptr)`. |
| +2 | 2 bytes | **Y coordinate** (short LE) | ✅ Confirmed (civ2mod.c, Höfelt) | Isometric map Y. civ2mod.c: `getShort(cityblockptr+2)`. |
| +4 | 1 byte | **City attributes I** | ✅ Confirmed (Höfelt) | Bitmask: bit 7 (0x80) = can build coastal improvements, bit 4 (0x10) = auto-build active (see +7 for advisor type), bit 3 (0x08) = tech stolen from this city, bit 2 (0x04) = improvement sold this turn, bit 1 (0x02) = "We Love the King Day" active, bit 0 (0x01) = civil disorder. |
| +5 | 1 byte | **City attributes II** | ✅ Hex-verified | bit 2 (0x04) = can build hydroplant. Other bits used by game internally. |
| +6 | 1 byte | **City attributes III** | ✅ Hex-verified | bit 5 (0x20) = can build ships (only effective if coastal flag at +4 is also set). |
| +7 | 1 byte | **City attributes IV** | ✅ Hex-verified | bit 4 (0x10) = objective ×3 (scenario), bit 2 (0x04) = objective ×1 (both can be set simultaneously), bit 1 (0x02) = auto-build under domestic advisor, bit 0 (0x01) = auto-build under military advisor. Both auto bits = 0 means auto-build under both advisors simultaneously. Requires +4 auto-build flag to be active. |
| +8 | 1 byte | **Owning civilization** (0-7) | ✅ Confirmed (civ2mod.c) | `CITY_ITEM_OWNER_OFFSET 8`. 0=barbarians, 1-7=civs. |
| +9 | 1 byte | **City size** | ✅ Confirmed (Höfelt) | Population level. Negative sizes (signed) cultivate no squares but still produce food. |
| +10 | 1 byte | **Founding/last owner tribe** (0-7) | ✅ Hex-verified | Who originally built the city (or more likely the last owner before current). |
| +11 | 1 byte | **Turns since capture counter** | ✅ Hex-verified | Increments each turn. Used to calculate post-capture "extra unhappiness" duration. |
| +12 | 1 byte | **Known to tribes** (bitmask) | ✅ Hex-verified | Which civs know this city exists. Leftmost bit = civ 1 (white), rightmost bit = barbarians. Does NOT apply for the city's own owner. |
| +13 | 1 byte | Padding | ✅ Hex-verified | Always 0x00. |
| +14 | 8 bytes | **Believed city size** | ✅ Hex-verified (Höfelt) | One byte per civ slot (0-7). The size that each foreign civ believes this city has. Foreign city size on the map is NOT updated until you place a unit near the city. A city can appear on a civ's SHIFT+C list but not on the map if the bit in +12 is set and the corresponding size here is 0. |
| +22 | 4 bytes | **Specialist details** | Höfelt, Catfish | 16 × 2-bit entries: 00=none, 01=entertainer, 10=taxman, 11=scientist. Example: 0x06 = 1 taxman (10) + 1 entertainer (01) packed into first byte. |
| +26 | 2 bytes | **Food in food box** (short LE) | ✅ Confirmed (Höfelt) | Accumulated food toward next population growth. 0xFFFF = famine. |
| +28 | 2 bytes | **Shields in shield box** (short LE) | ✅ Confirmed (Höfelt) | Accumulated shields toward current production item. |
| +30 | 2 bytes | **Net base trade** (short LE) | ✅ Hex-verified | Base trade arrows (excluding trade routes). Identical to +78 when no trade routes active (verified 43/43 cities). |
| +32 | 16 bytes | **City name** | ✅ Confirmed (civ2mod.c) | `CITY_ITEM_NAME_OFFSET 32`. 15 chars max + null terminator. |
| +48 | 1 byte | **Workers inner circle** | ✅ Hex-verified | Bitmask: each bit = 1 of 8 inner-ring tiles being worked. See City Radius Spiral below for bit-to-tile mapping. Verification: `popcount(+48) + popcount(+49) + popcount(+50 & 0x0F) + specialists = city_size` holds for ALL 43 cities. |
| +49 | 1 byte | **Workers outer circle A** | ✅ Hex-verified | 8 of the 12 outer-ring tile positions. See City Radius Spiral below. |
| +50 | 1 byte | **Workers outer circle B** | ✅ Hex-verified | Low 4 bits = remaining 4 outer-ring positions. **Bit 4 (0x10) = center tile, ALWAYS set** (43/43 cities). Center tile is free — not counted in population. See City Radius Spiral below. |
| +51 | 1 byte | **Total specialist count × 4** | ✅ Confirmed | Increments by 4 per specialist of ANY type. Specialist count = value ÷ 4. All 0 in main save (no specialists). |

##### City Radius Spiral — Worker Bit-to-Tile Mapping

The city's 21 workable tiles (20 radius + 1 center) are indexed by a spiral pattern stored in two static arrays in the binary:

- **`DAT_00628370`** — CitySpiralDX: signed byte[45] — X offsets (doubled-X coordinate system)
- **`DAT_006283a0`** — CitySpiralDY: signed byte[45] — Y offsets

The first 21 entries (indices 0–20) define the city radius tiles. Entries 21–44 extend to a larger search area used by the AI and tile ownership functions (loop bound `0x2d` = 45 in the decompiled code; tiles within the city radius checked with `index < 0x15` = 21).

**Complete bit-to-tile mapping (verified against axx0/Civ2-clone and 82 cities across 2 saves):**

The save file stores worker assignments as 3 bytes at offsets +48, +49, +50. Each bit indicates whether a citizen is working that tile. The mapping uses the **LSB-first** convention (bit 0 = index 0 of that byte's range):

```
Byte +48 (inner ring, 8 tiles):
  Bit 0 → NE   [+1, -1]     Bit 4 → SW  [-1, +1]
  Bit 1 → E    [+2,  0]     Bit 5 → W   [-2,  0]
  Bit 2 → SE   [+1, +1]     Bit 6 → NW  [-1, -1]
  Bit 3 → S    [ 0, +2]     Bit 7 → N   [ 0, -2]

Byte +49 (outer ring A, 8 tiles):
  Bit 0 → NE diagonal   [+2, -2]     Bit 4 → outer N-NE  [+1, -3]
  Bit 1 → SE diagonal   [+2, +2]     Bit 5 → outer E-NE  [+3, -1]
  Bit 2 → SW diagonal   [-2, +2]     Bit 6 → outer E-SE  [+3, +1]
  Bit 3 → NW diagonal   [-2, -2]     Bit 7 → outer S-SE  [+1, +3]

Byte +50 (outer ring B + center, 5 tiles):
  Bit 0 → outer S-SW  [-1, +3]     Bit 3 → outer N-NW  [-1, -3]
  Bit 1 → outer W-SW  [-3, +1]     Bit 4 → CENTER      [ 0,  0]  (always set)
  Bit 2 → outer W-NW  [-3, -1]
```

All offsets are in doubled-X coordinates (where X is doubled, matching the save file's native coordinate system). To convert to standard game (gx, gy) coordinates: `gx = (parCenter + ddx - parTarget) >> 1` where `parCenter = city.gy & 1` and `parTarget = (city.gy + ddy) & 1`.

**Tile layout diagram** (doubled-X offsets from city center, isometric grid):

```
y=-3:          (-1,-3)          (+1,-3)
y=-2:    (-2,-2)     ( 0,-2)          (+2,-2)
y=-1: (-3,-1)   (-1,-1)     (+1,-1)      (+3,-1)
y= 0:    (-2, 0)     CENTER          (+2, 0)
y=+1: (-3,+1)   (-1,+1)     (+1,+1)      (+3,+1)
y=+2:    (-2,+2)     ( 0,+2)          (+2,+2)
y=+3:          (-1,+3)          (+1,+3)
```

**Equivalence with axx0/Civ2-clone**: The axx0 reimplementation (`MapNavigationFunctions.CityRadius()`) uses MSB-first bit reading with the reverse index ordering — N first (index 0), NE last (index 7) for the inner ring. This is mathematically equivalent: both map the same physical bit to the same physical tile. Verified with zero mismatches across all 82 cities in two test saves.

**Sources**: Decompiled binary (`DAT_00628370`/`DAT_006283a0` references in `block_004E0000.c`, `block_004A0000.c`, et al.), axx0/Civ2-clone `Engine/src/MapObjects/MapNavigationFunctions.cs`, FoxAhead naming convention (CitySpiralDX/CitySpiralDY).
| +52 | 4 bytes | **Building bitmask I-IV** (uint32 LE) | ✅ Confirmed | 32-bit bitmask, **1-indexed**, RULES.TXT order. **Palace validation**: exactly 1 Palace per active civ — Zimbabwe(civ2), Trondheim(civ3), Washington(civ5), Cardiff(civ1). See full mapping below. |
| +56 | 1 byte | **Building bitmask V** | Catfish | Buildings 32+. Bit 0=Airport, Bit 1=Police Station, Bit 2=Port Facility, etc. All 0 in main save. |
| +57 | 1 byte | **Item in production** | ✅ Hex-verified | Units: 0x00-0x3F (direct type ID). Improvements/Wonders: `building_id = 256 - byte_value`. E.g., 0xCA=J.S. Bach's Cathedral (#54), 0xFD=Granary (#3), 0xF8=City Walls (#8). Production includes wonders (#39+ in RULES.TXT). |
| +58 | 1 byte | **Number of active trade routes** | Höfelt | 0-3 (can be >3 via hex edit). |
| +59 | 3 bytes | **Trade commodities available/supplied** | Höfelt | 0x00-0x0F = available (RULES.TXT order). Supplied goods use 0xFF complement (e.g., 0xF3 = commodity 13 supplied). |
| +62 | 3 bytes | **Trade commodities demanded** | Höfelt | 0x00-0x0F. |
| +65 | 3 bytes | **Commodities in trade route** | Catfish | With partners 1-3. 0x00-0x0F = @CARAVAN item, 0xFF = food supplies. |
| +68 | 6 bytes | **Trade partner city IDs** | Catfish | 3 × uint16 LE. City sequence ID of each trade partner. |
| +74 | 2 bytes | **Science output** (short LE) | ✅ Hex-verified | Beakers generated. Verified: sci + tax = trade (±1 rounding) for all 43 cities. |
| +76 | 2 bytes | **Tax output** (short LE) | ✅ Hex-verified | Gold generated. Tax collectors add +3 each. |
| +78 | 2 bytes | **Total trade** (short LE) | ✅ Hex-verified | Total trade arrows including trade routes. = +30 when no routes. |
| +80 | 1 byte | **Total food production** | ✅ Hex-verified | Food from worked tiles. Range 3-21 across 43 cities. Correlates strongly with size (r=0.93). |
| +81 | 1 byte | **Total shield production** | ✅ Hex-verified | Shields from worked tiles. Range 1-10 across 43 cities. |
| +82 | 1 byte | **Happy citizens** | ✅ Confirmed (Catfish, experiment) | Entertainers generate happy citizens (+1 each). In main save: 1 for all human cities (baseline happy), 0 for AI, 3 for WLTK capital. |
| +83 | 1 byte | **Unhappy citizens** | Catfish, Höfelt | In main save: only San Francisco and Kansas City have value 1 (mildly unhappy). |
| +84 | 2 bytes | **City sequence ID** (short LE) | **SAV/NET only** (not present in SCN). 1-indexed unique ID. Gaps indicate destroyed/disbanded cities. Referenced by trade partner fields and wonder assignments. |
| +86 | 2 bytes | Padding | **SAV/NET only** (not present in SCN). Always 0x0000. |

##### Building Bitmask (+52-55, uint32 LE) — CONFIRMED

**Verified via controlled experiment**: Playing as France, built Palace, Granary, Temple, Marketplace, and Library one per turn in Paris, saving after each. The bitmask at +52-55 changed exactly as predicted:

| Save | Buildings present | +52 value | Binary | Bits set |
|------|------------------|-----------|--------|----------|
| base | Palace only | `0x02` | `00000010` | 1 |
| granary | +Granary | `0x0A` | `00001010` | 1,3 |
| temple | +Temple | `0x1A` | `00011010` | 1,3,4 |
| market | +Marketplace | `0x3A` | `00111010` | 1,3,4,5 |
| library | +Library | `0x7A` | `01111010` | 1,3,4,5,6 |

Confirmed by matching the city screen screenshot (showing all 5 improvements in City Improvements list).

The bit numbering is **1-indexed**, matching the RULES.TXT improvement order:

| Bit | Improvement | Bit | Improvement |
|-----|-------------|-----|-------------|
| 0 | *(unknown flag)* | 16 | Manufacturing Plant |
| 1 | Palace | 17 | SDI Defense |
| 2 | Barracks | 18 | Recycling Center |
| 3 | Granary | 19 | Power Plant |
| 4 | Temple | 20 | Hydro Plant |
| 5 | Marketplace | 21 | Nuclear Plant |
| 6 | Library | 22 | Stock Exchange |
| 7 | Courthouse | 23 | Sewer System |
| 8 | City Walls | 24 | Supermarket |
| 9 | Aqueduct | 25 | Superhighways |
| 10 | Bank | 26 | Research Lab |
| 11 | Cathedral | 27 | SAM Missile Battery |
| 12 | University | 28 | Coastal Fortress |
| 13 | Mass Transit | 29 | Solar Plant |
| 14 | Colosseum | 30 | Harbor |
| 15 | Factory | 31 | Offshore Platform |

Additional improvements in **buildingsV** (+56, uint8 bitmask):

| Bit | Improvement |
|-----|-------------|
| 0 (ID 32) | Airport |
| 1 (ID 33) | Police Station |
| 2 (ID 34) | Port Facility |
| 3 (ID 35) | SS Structural |
| 4 (ID 36) | SS Component |
| 5 (ID 37) | SS Module |
| 6 (ID 38) | Capitalization |

Bits 1–6 are confirmed by a controlled experiment. Bits 7–31 are inferred from RULES.TXT order and validated against scenario saves (e.g., cities with City Walls, Aqueduct, Cathedral, SDI Defense all have the expected bits set). Bit 0 appears in some scenario cities but no standard-game cities; its meaning is unknown (possibly a scenario flag or the "Nothing" entry in RULES.TXT).

**Key correction**: +52-55 was previously misidentified as "city size" (byte +52) because the bitmask value for a Palace-only city (`0x02`) coincidentally resembled a size value.

##### Production Item Encoding (+57)

The production item byte encodes both units and improvements/wonders in a single byte:

- **Units**: Direct type ID (0x00-0x3F). E.g., 0x00=Settlers, 0x05=Legion, 0x06=Pikemen, 0x12=Crusaders.
- **Improvements/Wonders**: Inverted encoding: `building_id = 256 - byte_value`. E.g., 0xFF=Palace(#1), 0xFD=Granary(#3), 0xF8=City Walls(#8), 0xD5=Great Library(#43), 0xCA=J.S. Bach's Cathedral(#54).

**Hex-verified production summary** (43 cities in main save):
- 16 cities building Settlers (rapid expansion phase)
- 6 cities building Crusaders (medieval military)
- 5 cities building Pikemen (defense)
- 3 cities building Legion
- 2 cities building Granary, 2 building City Walls
- 1 city each: J.S. Bach's Cathedral (#54), Great Library (#43), Temple, Warriors, Elephant, Light Artillery, Horsemen, Ironclad

##### Resource Field Relationship

##### Natural Growth Experiment (Orleans, France — saves sz1/sz2/sz3)

Verified via natural population growth (no cheats). Orleans grew from size 1→2→3 over turns 6→16→31:

| Field | Size 1 | Size 2 | Size 3 | Interpretation |
|-------|--------|--------|--------|----------------|
| +74 (Science) | 2 | 3 | 4 | Beakers: increases with more worked tiles |
| +78 (Trade) | 4 | 5 | 6 | Trade arrows: increases with more worked tiles |
| +80 (Food) | 4 | 6 | 8 | **Food produced** (+2 per pop) |
| +81 (Shields) | 1 | 2 | 3 | **Shields produced** (+1 per pop) |
| +57 (Production) | 254 | 254 | 2 | Item in production (changed build item) |
| +52 (Buildings) | 0x02 | 0x02 | 0x06 | Bitmask (Palace → Palace+Barracks) |

**Key insight**: With Catfish cross-reference, +74 is confirmed as **science output** (not city size). Science, tax, trade, food, and shield outputs all scale naturally with population as more tiles are worked.

**Cheat bug note**: The Civ2 population cheat writes to an off-by-one city record (+9 of the PREVIOUS city in the array) instead of the target city.

##### Specialist Experiment (Orleans size 5, France — entertainer/tax collector/scientist)

Verified by assigning 1 specialist of each type from a size-5 baseline (no specialists):

| Field | No spec | Entertainer | Tax Collector | Scientist | Notes |
|-------|---------|-------------|---------------|-----------|-------|
| +51 | 0 | **4** | **4** | **4** | +4 per specialist of ANY type |
| +74 (Science) | 5 | 4 (-1) | 4 (-1) | **7 (+2)** | Scientist ADDS to science! |
| +76 (Tax) | 3 | 3 (same) | **6 (+3)** | 3 (same) | Tax collector ADDS to tax! |
| +78 (Trade) | 8 | 7 (-1) | 7 (-1) | 7 (-1) | Always drops by 1 |
| +80 (Food) | 12 | 10 (-2) | 10 (-2) | 10 (-2) | Food always drops by 2 |
| +81 (Shields) | 4 | 4 (same) | 4 (same) | 4 (same) | Shields unchanged |
| +82 (Happy) | 0 | **1 (+1)** | 0 (same) | 0 (same) | Entertainers add happy citizens |

**Key findings**:
- **+51** = total specialist count × 4 (type-independent).
- **+82** = **happy citizens** (Catfish-confirmed). Entertainers generate happy citizens, which is why +82 increments only for entertainers.
- **+74 (Science)** absorbs scientist bonus (+2 per scientist).
- **+76 (Tax)** absorbs tax collector bonus (+3 per tax collector).
- **+78 (Trade)** = total trade (always drops by 1 per specialist, regardless of type — one fewer tile worked).
- **+80 (Food)** = food produced (always drops by 2 per specialist — one fewer tile worked).
- Each specialist type routes its bonus to a DIFFERENT output field while all reduce trade and food equally.

##### TODO: City Record Remaining Unknowns
- [x] All major fields mapped via civ2mod.c, hexedit.rtf, Catfish cross-reference, and controlled experiments
- [x] Layout correction: XY coords at +0, name at +32 (confirmed by civ2mod.c and hex verification)
- [x] Verify +57 as item in production — **confirmed**: units 0x00-0x3F, buildings/wonders via `256 - byte_value`. Washington building J.S. Bach's Cathedral (0xCA=#54), Philadelphia building Great Library (0xD5=#43).
- [x] Verify +48-50 as worker tile assignments — **confirmed**: workers + specialists = city_size for ALL 43 cities. Bit 4 of +50 = center tile, always set. Full bit-to-tile spiral mapping documented and verified against axx0/Civ2-clone (82 cities, 0 mismatches).
- [x] Verify building bitmask 1-indexed — **confirmed**: Palace (bit 1) present in exactly 1 city per active civ (Zimbabwe, Trondheim, Washington, Cardiff).
- [x] Verify +84 as city sequence ID — **confirmed**: 43 unique values (1-46), gaps at 4/13/27 = destroyed cities.
- [x] Verify +30 vs +78 relationship — **confirmed**: identical when no trade routes (43/43 cities).
- [x] Verify +86-87 — **confirmed**: always 0x0000 (padding).
- [ ] Verify +56 as building bitmask V (all 0 in main save — need game with Airport/Police Station)
- [ ] Verify +4-7 attribute bits not yet seen (Auto-build, Tech stolen, Disorder, Objective flags)
- [ ] Decode +6 bit 3 (0x08) — present in 42/43 cities, meaning unknown
- [ ] Investigate +5 bit 3 (0x08) — present in 32/43 cities, possibly "has river in city radius"
- [ ] **RENDERING**: City civil disorder (+4 bit 0) — cities in disorder show a visible indicator in the game (fist icon or red highlight on the map). Determine exact visual indicator, sprite source, and rendering position. The renderer currently only shows disorder in the tooltip.
- [ ] **RENDERING**: City "We Love the King Day" (+4 bit 1) — WLTKD cities may show celebration effects on the map. Determine exact visual representation. Currently tooltip-only.
- [ ] **RENDERING**: City resistance state (+11 turns since capture) — cities under resistance may display differently on the map (e.g., occupation flag or altered sprite). Determine how resistance vs normal occupation is visually distinguished.

##### Cross-Reference: Source Documentation

Four independent sources confirm the MGE city record layout:

**1. hexedit.rtf** (Allard Höfelt, v1.8, 16 April 2005) — The original community hex-editing guide. Documents FW format (84-byte cities, 1-based offsets). Notes that MGE cities are 88 bytes (4 extra at end). FW layout = MGE layout for bytes 1-84; MGE adds bytes 85-88.

**2. civ2mod.c** (TE Kimball) — C program for modifying MGE save files. Confirms via code:
- `CITY_ITEM_SIZE 88` — 88 bytes per city
- `CITY_ITEM_NAME_OFFSET 32` — city name at offset +32
- `CITY_ITEM_OWNER_OFFSET 8` — owner at offset +8
- `findCityItem()` searches for city name then subtracts 32 to get record start
- `addCityToVisibilityMap()` reads X at +0, Y at +2 from record start

**3. Catfish's Cave / FoxAhead** (jp_hex.htm) — Documents ToT format (92-byte cities). ToT adds 2 bytes for map number before the name block and 2 bytes after the name block. ToT byte numbers can be converted to MGE offsets but require careful adjustment for the structural differences.

**4. Direct hex verification** — Reading actual MGE save files confirms Washington at record offset +0=40 (X=40), +2=16 (Y=16), +8=5 (owner=civ 5), +9=1 (size=1), +32="Washington".

**FW-to-MGE offset conversion**: Subtract 1 from Höfelt's 1-based FW byte number to get 0-based MGE offset. FW bytes 1-84 map directly to MGE +0 through +83. MGE SAV/NET files add +84-87 (city sequence ID + padding) that FW does not have. **SCN files match FW's 84-byte city size** — the FW format predates the SAV format's added ID fields.

**Stale player fields caveat**: Fields in the +0-31 range (XY, attributes, owner, size, etc.) appear to be **static/stale for the active human player's cities** — Orleans (player-owned) showed +9=0 at all city sizes, while AI cities (Washington, London) had correct values. The game likely reads player city data from memory rather than from the save file for these fields.

Notes:
- The city count at header offset `0x003C` includes destroyed/disbanded cities which remain as historical records.
- Destroyed cities retain their `owner` byte, which reflects the **last known owner**, not necessarily the founding civilization.
- Cities at coordinates `(0, 0)` with nonsensical names (e.g., single character `"H"`) are likely dummy/invalid records.
- City records for destroyed cities can span the entire map — they are **not** reliable for computing current territorial control. Use the tile visibility bitmask instead.
- A city's "owner" ID is **not** the same as the civ slot number used in tile byte[3]. The relationship between owner IDs and slot numbers must be determined per-save.

### Section 7: Tail Data (variable size by file type)

The final section of every save file contains post-city data. The tail size depends on the file type:

| File Type | Tail Size | Notes |
|-----------|-----------|-------|
| Standard `.SAV` | **1,807 bytes** | `header[0x0D] & 0x01 == 0` |
| Scenario `.SAV` | **1,907 bytes** | `header[0x0D] & 0x01 == 1` (100 extra bytes) |
| `.SCN` | **1,907 bytes** | Always scenario |
| `.NET` | **2,979 bytes** | Network saves (1,172 extra bytes for network state) |

**Scenario saves** have a 100-byte block inserted at tail offset +1469, between the post-fixed-constants region and the kill history. This block contains a 2-byte prefix, the scenario name string (e.g., `"The Rise Of Rome"` at +1471, up to 64 bytes), and additional scenario metadata. This shifts the kill history from +1469 (standard) to +1569 (scenario).

The fixed constants at tail +1385 (`0xAB 0x05 0x46 0x03 0x01 0x00 0x03`) are **identical** in standard, scenario, and network saves. (Note: earlier documentation cited +1384, but empirical testing across multiple files confirms +1385.)

#### Tail Internal Structure

The tail begins immediately after the 32-byte gap that follows the city records.

**Post-city per-civ data** (first 63 bytes):

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 63 bytes | **City name counters** (21 civs × 3 bytes) | Höfelt: 3 bytes per civilization (in RULES.TXT `@LEADERS` order, starting with Romans). Byte 2 of each triplet = number of cities built so far, used to determine which city name to pick from CITIES.TXT. Counter resets to 0 after the last @EXTRA city name. Value `0xFF` causes the next city to get the civilization's header name (e.g., `@ROMANS`). Bytes 1 and 3 of each triplet are mostly 0 or 1, purpose unclear. |
| +63 | 2 bytes | **Cursor X** (uint16 LE) | Horizontal coordinate of the game cursor position. |
| +65 | 2 bytes | **Cursor Y** (uint16 LE) | Vertical coordinate of the game cursor position. |

**Passwords** (224 bytes, located 1087.5 bytes before the event section or end of file):

Höfelt documents passwords as 224 bytes total: 32 bytes per civilization (7 civs). Each 32-byte password block contains up to 31 encrypted character bytes plus a terminating byte. The terminator's high nibble encodes password length mod 16, and the low nibble encodes the civilization ID (2-3=White, 4-5=Green, 6-7=Blue, 8-9=Yellow, 10-11=Cyan, 12-13=Orange, 14-15=Purple).

Password encryption uses a 3-step algorithm: (1) rotate character bits left by 1, (2) XOR with position-dependent mask, (3) add civilization-dependent offset based on character value modulo a divisor. Full algorithm documented in Höfelt v1.8 section 9.

**Civilization kill history** (last 338 bytes before events):

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 2 bytes | **Number of civs killed** | Maximum 12. |
| +2 | 24 bytes | **Kill turns** | 12 × uint16 LE. Turn number when each civ was destroyed. Unused slots are zeroed. |
| +26 | 12 bytes | **Killer civ IDs** | 12 × 1 byte. Which civ dealt the killing blow (0=barbarians). |
| +38 | 12 bytes | **Unknown** | 12 × 1 byte. Purpose unknown. |
| +50 | 288 bytes | **Destroyed civ names** | 12 × 24-byte null-terminated strings. Name of each destroyed civilization in kill order. |

> **Note**: If destroying a civilization triggers an additional "destroyed by barbarians" message, this appears as two kill entries in the same turn. The history section preserves the complete elimination timeline.

**Other tail sub-sections**:

| Offset | Size | Sub-section | Notes |
|--------|------|-------------|-------|
| ~+82 | ~270 bytes | **Historical power graph data** | 8 bytes per entry, one per ~4 game turns. Data behind the in-game Power Graph (Demographics screen). Per-civ metrics tracking civilization growth over time. Values grow monotonically (cumulative scores). When a civ is destroyed, its value drops to 0. Number of entries ≈ `turn_number / 4`. |
| ~+350 | ~940 bytes | Zero padding | Reserved for additional history rows in longer games (max ~117 rows for 500-turn game). |
| +1288 | 97 bytes | Game engine constants | Fixed values across saves: `0x0780` (1920) at +1289, `0x0438` (1080) at +1291, etc. Includes trailing 0x00 separator at +1384. Possibly scoring coefficients or display parameters. |
| +1385 | 7 bytes | Fixed constants | Always `0xAB 0x05 0x46 0x03 0x01 0x00 0x03` — identical across all saves and file types. |
| +1392 | 77 bytes | Per-civ summary values | Repeating pattern of ~10-byte blocks per civ. Purpose unclear. |
| +1469 | 100 bytes | **Scenario block** (scenario only) | 2-byte prefix + scenario name at +1471 (up to 64 bytes) + metadata. Only present in scenario/NET saves. Shifts kill history to +1569. |
| +1469 / +1569 | 338 bytes | **Kill history** | At +1469 for standard saves, +1569 for scenario saves (after scenario block). See kill history table above. |

##### TODO: Tail Data Unknown Fields
<!-- PRIORITY 5: ~60% of 1807 bytes still unknown. -->
- [ ] Decode +0-31 per-civ state flags in detail (alive/dead, government type, war/peace state)
- [ ] Decode +32-43 game counters (what do they count?)
- [ ] Decode +44-81 technology/wonder ID list (which tech/wonder does each uint16 reference?)
- [ ] Map the ~940-byte zero padding region (+350 to +1288) — is it truly empty or does it contain sparse data?
- [ ] Decode +1288-1383 game engine constants (scoring coefficients? display params? spaceship data?)
- [ ] Decode +1392-1397 per-game summary values

### Tribe / Civilization Name

Tribe names appear in two places:
1. **In the tail section** (Section 7): Names of eliminated civilizations appear as null-terminated strings near the end of the file.
2. **In the civilization data** (Section 3): The player's name is stored at `name_block_start + (player_slot × 242)` in the per-civ name block (`0x0156` for SAV/NET, `0x0148` for SCN). Residual bytes from previous names may follow the null terminator (e.g., leftover characters from overwriting a longer name).

**AI tribe names are NOT stored in the save file.** The per-civ name blocks for AI civilizations are empty (all zeros). The game loads AI names from `LEADERS.TXT` and `CITY.TXT` at runtime based on each civ slot's assigned civilization index. To determine which civilization occupies which slot, you must cross-reference the city names in the save (e.g., "Zimbabwe", "Trondheim") against `CITY.TXT` (which maps city names to civilizations).

---

## CIV2.DAT — Runtime Configuration

Size: 516 bytes. Contains game session parameters.

| Offset | Content | Example |
|--------|---------|---------|
| 0x0004 | Difficulty or game parameter | `5` |
| 0x000A | Number of enemy civs | `6` (= 7 total with player) |
| 0x0060 | Player name (ASCII) | `"AmArA"` |
| 0x0080 | Second player slot? | `"cb"` |
| 0x00C0 | Local IP address (ASCII) | `"192.168.1.67"` |

---

## LEADERS.TXT — Civilization Definitions

Defines all 21 civilizations available in the game. Each line contains:

```
LeaderName, FemaleLeader, [3 AI values], TribeName, Adjective, [3 personality values], [optional government titles]
```

The 21 civilizations in order (0-indexed):

| Index | Tribe | Leader | Notable Cities |
|-------|-------|--------|----------------|
| 0 | Romans | Caesar / Livia | Rome, Veii, Cumae, Naples |
| 1 | Babylonians | Hammurabi / Ishtari | Babylon, Ur |
| 2 | Germans | Frederick / Maria Theresa | Berlin, Hamburg |
| 3 | Egyptians | Ramesses / Cleopatra | Thebes, Memphis |
| 4 | Americans | Abe Lincoln / E. Roosevelt | Washington, New York, Boston, Philadelphia, Atlanta, Chicago, etc. |
| 5 | Greeks | Alexander / Hippolyta | Athens, Sparta, Delphi |
| 6 | Indians | Mohandas Gandhi / Indira Gandhi | Delhi, Bombay, Madras, Bangalore, Calcutta, Lahore |
| 7 | Russians | Lenin / Catherine the Great | Moscow, St. Petersburg |
| 8 | Zulus | Shaka / Shakala | Zimbabwe, Ulundi, Isandhlwana, Bapedi, Intombe, Hlobane, Ngome, Mpondo |
| 9 | French | Louis XIV / Joan of Arc | Paris, Orleans, Lyons, Tours, Rheims |
| 10 | Aztecs | Montezuma / Nazca | Tenochtitlan |
| 11 | Chinese | Mao Tse Tung / Wu Zhao | Beijing |
| 12 | English | Henry VIII / Elizabeth I | London, York, Nottingham, Hastings, Canterbury, Coventry, Warwick, Newcastle |
| 13 | Mongols | Genghis Khan / Bortei | — |
| 14 | Celts | Cunobelin / Boadicea | Armagh, Cardiff, Carmarthen, Kells |
| 15 | Japanese | Tokugawa / Amaterasu | Kyoto, Osaka, Satsuma, Kagoshima, Edo |
| 16 | Vikings | Canute / Gunnhild | Kaupang, Trondheim, Uppsala, Hladir, Aarhus |
| 17 | Spanish | Philip II / Isabella | Madrid, Seville |
| 18 | Persians | Xerxes / Scheherezade | Persepolis |
| 19 | Carthaginians | Hannibal / Dido | — |
| 20 | Sioux | Sitting Bull / Sacajawea | — |

---

## Executable Analysis (civ2.exe)

### PE Header & Build Information

| Property | Value |
|----------|-------|
| Size | 2,489,344 bytes |
| Format | PE32 (GUI), Intel 80386 |
| Compiler | Microsoft Visual C++ (MSVC runtime linked) |
| Build timestamp | April 8, 1999 18:33:52 UTC |
| Entry point | `0x001f6e90` |
| Image base | `0x00400000` |
| Image size | 3,194,880 bytes (virtual) |
| Build path | `D:\Ss\Franklinton\` |
| Engine path | `D:\Ss\Smeds32\` |
| Product name | `Civilization II Multiplayer Gold Edition` |
| Publisher | `MicroProse Software` |
| Version string | `5.4.0f Multiplayer 26-March-99, Patch 3` |

### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Flags | Purpose |
|---------|-------------|-------------|----------|-------|---------|
| `.text` | `0x00001000` | 2,199,122 | 2,199,552 | CODE, EXEC, READ | Main game code |
| `ASMGRAF` | `0x0021a000` | 6,979 | 7,168 | CODE, EXEC, READ | Hand-written assembly graphics routines |
| `.rdata` | `0x0021c000` | 32,448 | 32,768 | INIT_DATA, READ | Read-only data (MSVC runtime strings) |
| `.data` | `0x00224000` | 797,548 | 100,352 | INIT_DATA, READ, WRITE | Game data (697 KB BSS/uninitialized) |
| `.idata` | `0x002e7000` | 11,253 | 11,264 | INIT_DATA, READ, WRITE | Import tables |
| `.rsrc` | `0x002ea000` | 20,328 | 20,480 | INIT_DATA, READ | Resources (icons, cursors, bitmaps) |
| `.reloc` | `0x002ef000` | 115,157 | 115,200 | INIT_DATA, READ | Relocation table |

### ASMGRAF Section — Hand-Written Assembly Graphics

The `ASMGRAF` section (6,979 bytes) contains **hand-written x86 assembly** routines for performance-critical graphics operations. Key characteristics:

- Uses 16/32-bit **mixed-mode** instructions (frequent `0x66` operand-size and `0x67` address-size prefixes), suggesting code ported from or compatible with 16-bit real-mode origins.
- Uses `ENTER` (`0xC8`) for stack frame setup instead of the standard `push ebp; mov ebp, esp` prologue — confirming hand-written rather than compiler-generated code.
- Approximately **66.9% padding** with `0xCC` (INT 3 / debug breakpoint) between functions, typical of debug-build assembly alignment.
- Contains roughly 13 functions (identified by RET instructions).
- Likely implements pixel blitting, scanline copying, and color manipulation operations where the C compiler's output was too slow for real-time rendering.

### Embedded Resources

| Type | Count | Details |
|------|-------|---------|
| Cursors | 19 | Custom mouse cursors (IDs 6–24), 308 bytes each |
| Cursor Groups | 19 | Grouped cursor definitions (IDs 500–530) |
| Icons | 5 | Application icons (IDs 1–5), 744 bytes each |
| Icon Groups | 5 | Grouped icon definitions |
| Bitmaps | 6 | Small UI bitmaps (IDs 301–306), ~616–630 bytes each |

All resources use language ID 1033 (English US).

### Imported DLLs & System Dependencies

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 106 | Core OS (file I/O, memory, threads, `GetPrivateProfileIntA` for INI files, `CreateMutexA` for single-instance enforcement) |
| `USER32.dll` | 100 | Windows GUI (windows, messages, cursors, menus, `SetWindowsHookExA` for input hooks) |
| `GDI32.dll` | 40 | Graphics (DIB sections, palettes, font rendering, `CreateDIBSection` for software rendering, `AnimatePalette` for color cycling) |
| `WINMM.dll` | 26 | Multimedia (wave audio, MIDI, CD audio via MCI, `sndPlaySoundA`, timer events) |
| `AVIFIL32.dll` | 14 | AVI video playback for wonder movies and cutscenes |
| `MSVFW32.dll` | 4 | Video for Windows (codec decompression via `ICLocate`/`ICClose`, `MCIWndCreateA`) |
| `DDRAW.dll` | 1 | DirectDraw (`DirectDrawCreate` — single entry point, rest via COM interfaces) |
| `ADVAPI32.dll` | 5 | Windows Registry (`RegCreateKeyExA`, `RegQueryValueExA`, etc.) |
| `comdlg32.dll` | 3 | Common dialogs (Open/Save file dialogs) |
| `COMCTL32.dll` | 1 | Common controls (ordinal #17 = `InitCommonControls`) |
| `XDaemon.dll` | 27 | Multiplayer networking (C++ mangled names, TCP/IP, IPX/SPX, modem, serial) |

### XDaemon.dll — Network Library (Deep Dive)

The XDaemon Communications Library is a standalone multiplayer networking middleware DLL developed by MicroProse Software, authored by **John C. O'Neill**. It abstracts multiple transport protocols behind a unified API for game networking.

#### Version & Build Information

| Property | Value |
|----------|-------|
| File version | 2.2.0.0 |
| Product version | 2.2.0.0 |
| Build timestamp | November 10, 1998, 16:29:15 UTC |
| Product name | XDAEMON Communications Module DLL |
| Internal name | XDAEMON |
| Copyright | Copyright © 1998 MicroProse Software |
| Author | John C. O'Neill |
| Self-reported version | v3.5.0 (in log output string `"10-Nov-1998"`) |
| Image base | `0x10000000` |
| Code size | 62,976 bytes |
| BSS size | ~46 KB (connection tables, socket buffers, state arrays) |

Note: The DLL reports itself as "v3.5.0" in log output (`XDaemon Communications Library v%d.%d.%d Online`), but the PE version resource says 2.2.0.0. The version returned by `XD_GetXDaemonVersion()` likely returns 3.5.0 via three separate `int*` parameters (major, minor, patch).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 62,950 | 62,976 | Executable code |
| `.rdata` | `0x00011000` | 6,147 | 6,656 | Read-only data, export table |
| `.data` | `0x00013000` | 60,700 | 14,336 | Global data (46 KB BSS) |
| `.idata` | `0x00022000` | 3,016 | 3,072 | Import tables |
| `.rsrc` | `0x00023000` | 928 | 1,024 | Version info resource |
| `.reloc` | `0x00024000` | 6,400 | 6,656 | Relocation table |

#### Complete Export Table (48 functions)

**Initialization & Shutdown:**

| # | Function | Signature |
|---|----------|-----------|
| 17 | `XD_InitializeModem` | `int (int modemIndex)` |
| 18 | `XD_InitializeSerial` | `int (int portIndex)` |
| 19 | `XD_InitializeSocketsIPXSPX` | `int (int, int, int, int, unsigned int, callback)` |
| 20 | `XD_InitializeSocketsTCP` | `int (int, int, int, int, unsigned int, callback)` |
| 27 | `XD_ResetLibrary` | `int ()` |
| 44 | `XD_ShutdownModem` | `void ()` |
| 45 | `XD_ShutdownSerial` | `void ()` |
| 46 | `XD_ShutdownSockets` | `void ()` |
| 47 | `XD_ShutdownTEN` | `void ()` |

**Connection Management:**

| # | Function | Signature |
|---|----------|-----------|
| 1 | `XD_ActivateServer` | `int ()` |
| 2 | `XD_CloseConnection` | `int ()` |
| 26 | `XD_OpenConnection` | `int (void* address, unsigned long timeout)` |
| 34 | `XD_ServerCloseConnection` | `int (unsigned short clientId)` |
| 48 | `XD_StopConnections` | `int ()` |

**Data Transfer:**

| # | Function | Signature |
|---|----------|-----------|
| 5 | `XD_FlushSendBuffer` | `int (unsigned long timeout)` |
| 16 | `XD_InFlushSendBuffer` | `int ()` — returns whether flush is in progress |
| 29 | `XD_SendBroadcastData` | `int (void* data, unsigned long size, long flags)` |
| 30 | `XD_SendDirectBroadcastData` | `int (void* dest, void* data, unsigned long size)` |
| 31 | `XD_SendPingRequest` | `int (unsigned short target, unsigned long data, callback)` |
| 32 | `XD_SendSecureData` | `int (unsigned short destId, void* data, unsigned long size, short priority)` |
| 33 | `XD_SendUDPBroadcastData` | `int (void* data, unsigned long size, long flags, const char* addr, int port)` |

**Callbacks (Event Registration):**

| # | Function | Signature |
|---|----------|-----------|
| 35 | `XD_SetBroadcastReceive` | `void (callback(void*, unsigned short, long))` |
| 37 | `XD_SetNewClientConnection` | `void (callback(unsigned short, unsigned short))` |
| 38 | `XD_SetOnClientConnectionToServer` | `void (callback(short))` |
| 39 | `XD_SetOnConnectionLost` | `void (callback(unsigned short))` |
| 40 | `XD_SetOnInvalidSendToSelf` | `void (callback(short))` |
| 41 | `XD_SetOversizedMessageCB` | `int (unsigned long maxSize, callback(unsigned long))` |
| 43 | `XD_SetSecureReceive` | `void (callback(unsigned short, void*, unsigned long, short))` |

**Query & Info:**

| # | Function | Signature |
|---|----------|-----------|
| 7 | `XD_GetConnectedSocketAddr` | `char* ()` |
| 8 | `XD_GetCurrentProtoAddr` | `char* (unsigned int adapterIndex, int protocol)` |
| 9 | `XD_GetCurrentProtocol` | `int ()` |
| 10 | `XD_GetLastError` | `const char* (int* errorCode)` |
| 11 | `XD_GetLoggedAddress` | `const char* (int index)` |
| 12 | `XD_GetModemName` | `const char* (int index)` |
| 13 | `XD_GetNumEnumeratedAdapters` | `int (int protocol)` |
| 14 | `XD_GetNumModems` | `int ()` |
| 15 | `XD_GetXDaemonVersion` | `int (int* major, int* minor, int* patch)` |
| 25 | `XD_LookupErrorCode` | `const char* (int code)` |
| 28 | `XD_SelectModem` | `int (int index)` |

**IGZ Lobby Integration:**

| # | Function | Signature |
|---|----------|-----------|
| 21 | `XD_LaunchZone` | `int (char* url)` — opens IGZ in browser via `ShellExecuteA` |
| 22 | `XD_LaunchedByLobby` | `int (void* hInstance, LobbyLaunchInfo* info)` |
| 23 | `XD_LobbyClose` | `void ()` |
| 24 | `XD_LobbySendMessage` | `int (unsigned long messageType)` |

**Debug/Testing (not used by game in normal operation):**

| # | Function | Signature |
|---|----------|-----------|
| 3 | `XD_EnableDebugFunctions` | `int (int enable)` |
| 4 | `XD_EnableServerLocator` | `int (int enable, unsigned int port)` |
| 6 | `XD_GeneratePortNoise` | `int (int port, short rate, short delta)` — generate noise for testing |
| 36 | `XD_SetDebugPacketDropRate` | `int (int dropRate, int seed)` — simulate packet loss |
| 42 | `XD_SetPacketDelay` | `int (int delay, int variance)` — simulate latency |

#### Imported DLLs

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 77 | Core OS: threads (`CreateThread`, `ExitThread`), synchronization (`WaitForMultipleObjects`, `CreateEventA`, `CriticalSection`), memory, file I/O, TLS |
| `USER32.dll` | 15 | Hidden message windows for async socket events (`CreateWindowExA`, `PeekMessageA`, `SetTimer`, `KillTimer`) |
| `WSOCK32.dll` | 23 | Winsock 1.1 networking (see below) |
| `DPLAYX.dll` | 3 | DirectPlay for modem/serial (`DirectPlayCreate`, `DirectPlayEnumerateA`, `DirectPlayLobbyCreateA`) |
| `ole32.dll` | 3 | COM initialization for DirectPlay (`CoInitialize`, `CoUninitialize`, `CoCreateInstance`) |
| `SHELL32.dll` | 1 | `ShellExecuteA` — launches IGZ lobby URL in browser |
| `ADVAPI32.dll` | 5 | Windows Registry for storing network settings |

#### Winsock Functions Used (WSOCK32.dll)

| Ordinal | Function | Purpose |
|---------|----------|---------|
| #1 | `accept` | Accept incoming TCP connections |
| #2 | `bind` | Bind socket to local address/port |
| #3 | `closesocket` | Close a socket |
| #4 | `connect` | Initiate TCP connection to server |
| #5 | `getpeername` | Get address of connected peer |
| #6 | `getsockname` | Get local socket address |
| #7 | `getsockopt` | Query socket options |
| #9 | `listen` | Listen for incoming connections |
| #10 | `ntohl` | Network-to-host byte order (32-bit) |
| #11 | `ntohs` | Network-to-host byte order (16-bit) |
| #13 | `recv` | Receive data from connected socket |
| #16 | `sendto` | Send data to specific address (UDP) |
| #17 | `setsockopt` | Set socket options (broadcast enable, address reuse) |
| #19 | `socket` | Create a new socket |
| #20 | `gethostbyaddr` | Reverse DNS lookup |
| #21 | `gethostbyname` | DNS hostname resolution |
| #22 | `gethostname` | Get local hostname |
| #23 | `WSAGetLastError` | Get last Winsock error code |
| #52 | `WSAStartup` | Initialize Winsock library |
| #57 | `WSACleanup` | Shutdown Winsock library |
| #101 | `WSAAsyncSelect` | Register async socket event notifications (FD_CONNECT, FD_CLOSE, etc.) |
| #111 | `WSARecvEx` | Extended receive with partial message detection |

#### Internal Architecture

**"QuickSocket" Abstraction Layer**: XDaemon wraps Winsock with an internal "QuickSocket" system that provides:
- Numbered socket instances (`ReallyQuickSocket-%d` windows)
- Automatic async event handling via hidden Windows message windows
- Per-socket receive buffers with size tracking
- Socket reinitialization support (`[Reinit]` operations)
- Oversize message detection with configurable callback

**Dual Transport Model**:
- **TCP/IP and IPX/SPX**: Handled natively via Winsock with QuickSocket abstraction
- **Modem and Serial**: Delegated to DirectPlay (`DPLAYX.dll`) which provides the transport, with XDaemon wrapping the DirectPlay session in its own API

**Connection Architecture**:
- Server-client model with connection IDs (server always ID 0)
- Broadcast channel for discovery (`XD_SendBroadcastData`)
- Secure (reliable) channel for game data (`XD_SendSecureData` with priority levels)
- UDP broadcast for LAN server discovery (`XD_SendUDPBroadcastData`)
- Ping protocol using `"XDPING"` magic string for latency measurement

**Threading**: Uses `CreateThread` and `WaitForMultipleObjects` for asynchronous operations, with `CriticalSection` for thread safety. Events (`CreateEventA`, `SetEvent`) coordinate async socket operations.

**Message Processing**: Uses Windows message pumping (`PeekMessageA`, `TranslateMessage`, `DispatchMessageA`) on hidden windows to receive Winsock async notifications (`FD_CONNECT`, `FD_CLOSE`, etc.). Timer-based polling (`SetTimer`, `KillTimer`) drives periodic operations.

#### IGZ (Internet Gaming Zone) Lobby Protocol

The library integrates with Microsoft's Internet Gaming Zone (IGZ) lobby system:
- `XD_LaunchedByLobby` checks if the game was launched from the IGZ lobby, fills a `LobbyLaunchInfo` structure
- `XD_LobbySendMessage` sends status messages back to the lobby (`DPLSYS_CONNECTIONSETTINGSREAD`, `DPLSYS_DPLAYCONNECTSUCCEEDED`, `DPLSYS_DPLAYCONNECTFAILED`)
- `XD_LaunchZone` opens the IGZ website in the default browser via `ShellExecuteA`
- DirectPlay Lobby interface (`DirectPlayLobbyCreateA`) provides the connection bridge

**LobbyLaunchInfo Structure** (from civ2.exe string analysis):
```
struct LobbyLaunchInfo {
    char IPAddr[32];        // IP address of server
    char LongName[64];      // Full game description
    char ShortName[32];     // Short game name
    char SessionName[64];   // Session identifier
    int  bHost;             // 1 = this instance is hosting
};
```

#### Error Code Table

| Code | Name | Meaning |
|------|------|---------|
| 0 | `XD_SUCCESS` | Operation completed successfully |
| — | `XDERR_NOTINITIALIZE` | Library has not been initialized |
| — | `XDERR_NULLSOCKET` | Socket reference is null |
| — | `XDERR_CANTREINITIALIZE` | Cannot reinitialize while active |
| — | `XDERR_FAILEDINIT` | Initialization procedure failed |
| — | `XDERR_SERVERFUNCTIONONLY` | Function requires server role |
| — | `XDERR_CLIENTFUNCTIONONLY` | Function requires client role |
| — | `XDERR_NOSERVERFOUND` | Server discovery found nothing |
| — | `XDERR_BADPARAMETERS` | Invalid parameters passed |
| — | `XDERR_CANNOTCONNECT` | Connection could not be established |
| — | `XDERR_TOOMANYUSERS` | Maximum player count reached |
| — | `XDERR_DISABLEDFEATURE` | Requested feature is disabled |
| — | `XDERR_FAILEDSEND` | Data transmission failed |
| — | `XDERR_WRONGMODE` | Operation invalid for current transport mode |
| — | `XDERR_NOCONNECTCB` | No connection callback has been registered |
| — | `XDERR_NOTSUPPORTED` | Feature not supported on this platform |
| — | `XDERR_UNKNOWNERROR` | Unclassified error |

Lobby-specific errors: `XLOBBYERR_NOTLOBBIED` (not launched from lobby), `XLOBBYERR_UNKNOWN` (unknown lobby error).

#### DirectPlay (Modem/Serial) Integration

For modem and serial connections, XDaemon delegates to Microsoft DirectPlay:

- Enumerates modems via `DirectPlayEnumerateA`
- Creates a DirectPlay interface via `DirectPlayCreate`
- Initializes COM (`CoInitialize`) for DirectPlay object creation
- Handles modem-specific errors: `DPERR_SENDTOOBIG`, `DPERR_NOTLOGGEDIN`, `DPERR_INVALIDPLAYER`, `DPERR_INVALIDPARAMS`, `DPERR_BUSY`
- Connection flow: `XDaemonModemClass` window → modem enumeration → session search → join or host → player ID exchange

The serial path is similar but bypasses modem enumeration, connecting directly through the COM port.

#### Registry Usage

XDaemon modifies Windows Internet settings to facilitate network games:

| Registry Path | Key | Purpose |
|---------------|-----|---------|
| `Software\MicroProse Software\XDaemonNet` | `ModifiedNet` | Flag: whether Internet settings were modified |
| `Software\MicroProse Software\XDaemonNet` | `OldSetting` | Backup of original `EnableAutodial` value |
| `...\Windows\CurrentVersion\Internet Settings` | `EnableAutodial` | Disables auto-dial during LAN games to prevent unwanted modem connections |

The library saves the original `EnableAutodial` setting before modifying it and stores the backup in its own registry key for restoration on shutdown.

#### Internal Window Classes

| Window Class | Purpose |
|-------------|---------|
| `QSocketWndClass` | Winsock async event receiver window |
| `StreamWindowClass` | Stream data handling for reliable transport |
| `ReallyQuickSocket-%d` | Per-socket instance message windows (numbered) |
| `XDSControlWindow-%d` | Control/management windows (numbered) |
| `XDaemonModemClass` | Modem connection management window |
| `XDSModemControlWindow` | Modem control interface window |
| `LikeSearchOrSomething` | Server search window (quirky developer name) |
| `ServerSearchWindow` | Server locator/broadcast listener window |

#### Logging System

XDaemon logs to `XDaemon.log` with timestamped entries:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
 Log file created and opened, HH:MM:SS on D-M-YYYY
(tick_count) log_message
```

Each log entry is prefixed with a tick count (milliseconds). The library logs all connection events, errors, socket operations, and protocol state changes. Log entries prefixed with `[Reinit]`, `[Modem]`, `[Serial]`, or `DPlay>` indicate subsystem-specific operations.

#### IPX Address Format

For IPX/SPX networking, addresses are displayed as: `NNNNNNNN:MMMMMMMMMMMM` where `N` = 4-byte network number and `M` = 6-byte node (MAC) address, both in hexadecimal. Adapter enumeration logs each network adapter with its full IPX address.

### Civ2Art.dll — Embedded Art Resource Container (Deep Dive)

Civ2Art.dll is a resource-only DLL that serves as a container for embedded GIF artwork used in the game's credits sequence and UI. Despite having 99 KB of code, it contains no meaningful game logic — the entire code section is statically linked MSVC **debug** C runtime.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:14 UTC |
| File version | None (no VERSION_INFO resource) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (~97 KB, virtually all CRT) |
| Resource size | 126,537 bytes (~124 KB) |
| Total file size | 256,512 bytes (250 KB) |
| Compiler | MSVC 5.0 or 6.0 (debug build) |

**Build date significance**: This DLL was built April 21, 1997 — almost two years before the MGE executable (April 8, 1999) and over a year before XDaemon.dll (November 10, 1998). It was carried forward unchanged from the original Civilization II or Fantastic Worlds expansion into the Multiplayer Gold Edition.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (statically linked debug CRT) |
| `.rdata` | `0x0001a000` | 7,640 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data (5.6 KB BSS) |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 126,537 | 126,976 | **GIF image resources** |
| `.reloc` | `0x00041000` | 5,096 | 5,120 | Relocation table |

#### Exports

The DLL exports exactly **one function**:

```
#1: _DllMain@12  (stdcall, 3 parameters)
```

Disassembly of `_DllMain@12`:
```asm
push ebp          ; standard prologue
mov  ebp, esp
push ebx / esi / edi
mov  eax, 1       ; return TRUE (always succeeds)
pop  edi / esi / ebx
leave
ret  12           ; stdcall cleanup (hinstDLL, fdwReason, lpvReserved)
```

This is a trivial DllMain that always returns `TRUE`. The DLL exists **purely as a resource container** — it has no functional code beyond the C runtime startup wrapper.

#### Imports

Only **KERNEL32.dll** (70 functions) — all standard MSVC C runtime dependencies. No graphics, UI, or game-related imports whatsoever.

Notable: The DLL was compiled with the **debug** C runtime statically linked, evidenced by:
- `"Detected memory leaks!"` string
- `"Dumping objects ->"` / `"Object dump complete."` 
- `"Bad memory block found at 0x%08X"` 
- `"DAMAGED"` diagnostic marker
- Full debug heap validation, assertion checking, and allocation tracking
- `"IsTNT"` Citrix check (MSVC 5.0/6.0 CRT signature)

This debug CRT accounts for ~95 KB of the 97 KB code section. The shipping product includes debug instrumentation — likely an oversight where the release build was not recompiled with the release CRT before final packaging.

#### Embedded GIF Resources

All resources use a custom resource type string `"GIFS"` (not a standard Windows resource type). All images are GIF87a format with 256-color palettes. Language ID: 1033 (English US).

| Resource ID | Dimensions | Size | Content |
|-------------|-----------|------|---------|
| **999** | 74×74 | 1,607 bytes | Gray UI panel — 8 shades of gray (palette indices 22–30, 110). Light gray rounded square used as a dialog/panel background element. **23 cross-references** in civ2.exe — the most heavily used resource. |
| **1000** | 640×240 | 10,658 bytes | Credits text overlay — golden text on transparent black: "Producer: Jeffery L. Briggs", "Game Design: Brian Reynolds", "Art Director: Michael Haire", "Original Civilization Design: Sid Meier with Bruce Shelley". 73 unique colors, 92.4% background. |
| **2000** | 640×240 | 3,665 bytes | Sparse starfield — nearly all black with a few scattered white dots. Base layer for scrolling credits. Only 3 unique colors. **5 cross-references** in civ2.exe. |
| **4000** | 640×240 | 84,018 bytes | **Main credits artwork** — Mesoamerican stone relief scene: a Mayan/Aztec warrior figure carved in stone alongside a map/codex element. Warm earth tones (browns, golds, tans). 255 unique colors. The largest resource at 82 KB. |
| **30000** | 640×240 | 4,770 bytes | Dense starfield — black background with many white star dots. Alternative/supplementary starfield layer, possibly for space victory or layered credits parallax. 18 unique colors. |

Total embedded art: **104,718 bytes** (~102 KB) across 5 GIF images.

#### How civ2.exe Loads Resources

The game dynamically loads Civ2Art.dll at runtime (it is **not** in the PE import table):

1. **Path construction**: Builds `"civ2\\civ2art.dll"` relative path (stored at VA `0x0062AF18` in .data)
2. **Dynamic loading**: `LoadLibraryA("civ2\\civ2art.dll")` → returns `HMODULE`
3. **Resource extraction**: `FindResourceA(hModule, MAKEINTRESOURCE(id), "GIFS")` → `HRSRC`
4. **Memory mapping**: `LoadResource(hModule, hRsrc)` → `HGLOBAL`, then `LockResource(hGlobal)` → pointer to raw GIF bytes
5. **Cleanup**: `FreeResource(hGlobal)` after use

The game imports `FindResourceA`, `LoadResource`, `LockResource`, and `FreeResource` from KERNEL32.dll for this purpose.

#### Cross-Reference Counts (from civ2.exe)

| Resource ID | Push Count | Likely Usage |
|-------------|-----------|-------------|
| 999 | 23 | Dialog backgrounds, UI panels (used throughout game) |
| 1000 | 2 | Credits screen text overlay |
| 2000 | 5 | Starfield layer (credits, possibly space screens) |
| 4000 | 2 | Credits artwork display |
| 30000 | 3 | Dense starfield layer |

Resource #999 (the gray panel) is referenced 23 times, suggesting it serves as a standard background element for multiple dialog windows and UI panels throughout the game.

#### Why a DLL for Art?

Packaging art in a DLL rather than loose files serves several purposes:
- **Single-file distribution**: Credits artwork travels as one file rather than 5 separate GIFs
- **Resource protection**: Slightly harder for users to casually modify credits/attribution
- **Clean directory**: Keeps the game directory uncluttered with internal art files
- **Windows resource API**: Leverages the standard `FindResource`/`LoadResource` API for efficient memory-mapped access

### Tiles.dll — Embedded Tile & UI Art Container (Deep Dive)

Tiles.dll is the largest DLL in the game at 1.38 MB, serving as a resource container for 24 GIF images used as tile backgrounds, sprite sheets, UI artwork, and historical illustrations. It is an **identical twin** of Civ2Art.dll in code — the `.text` and `.data` sections match byte-for-byte (100%).

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:13:31 UTC |
| File size | 1,416,704 bytes (1,383 KB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (identical to Civ2Art.dll) |
| Resource size | 1,283,136 bytes (~1.22 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build date**: Built 43 seconds before Civ2Art.dll (18:13:31 vs 18:13:14 UTC), confirming they were compiled in the same build session from the same source project — likely a template resource DLL project where only the `.rsrc` section content differs.

**Code identity**: `.text` section is 100.0% byte-identical to Civ2Art.dll. `.data` section is 100.0% identical. `.rdata` differs by only 34 bytes (0.4%) — solely the DLL name string `"Tiles.dll"` vs `"Civ2Art.dll"` in the export directory. Same trivial `_DllMain@12` (return TRUE), same debug CRT, same imports (KERNEL32.dll only, 70 functions).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll) |
| `.rdata` | `0x0001a000` | 7,638 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 1,283,136 | 1,283,584 | **GIF image resources (1.22 MB)** |
| `.reloc` | `0x0015c000` | 8,209 | 8,704 | Relocation table |

#### Embedded GIF Resources (24 total)

All resources use the custom `"GIFS"` resource type. All are GIF87a format, language ID 1033 (English US).

**Full-Screen Backgrounds (640×480) — Civilization Tile Art (#50–#66)**

These images use a distinctive red (RGB ~255,0,0) region as a transparency/chroma-key area, indicating the portions of each background that should be masked out when composited in-game. The visible artwork area varies per image.

| ID | Size | Content Description |
|----|------|-------------------|
| **50** | 80,447 | Church of the Holy Sepulchre, Jerusalem — domed religious architecture, stone buildings. Warm gray tones. |
| **51** | 56,941 | Conquistadors on horseback — world map background with mounted warriors in period armor. Gray/engraving style. |
| **52** | 51,675 | Byzantine/Medieval emperor — robed standing figure on world map background. Similar style to #51. |
| **53** | 52,730 | World map with historical figure — same base map, different overlaid character illustration. |
| **54** | 55,416 | World map with historical figure — continuation of the map/figure series. |
| **55** | 53,202 | World map with historical figure — continuation of the map/figure series. |
| **56** | 30,694 | Stonehenge — ancient stone monument photograph. Gray-scale. Smallest of the 640×480 backgrounds. |
| **57** | 47,584 | City fireworks celebration — modern cityscape at night with fireworks over waterfront. |
| **58** | 76,492 | Egyptian wall painting — ancient workers/artisans in traditional Egyptian art style. |
| **59** | 47,139 | Classical Greek/Roman column capital — Ionic column detail against mountain landscape. |
| **65** | 23,724 | Royal crown on world map — imperial/monarchy themed, smaller visible area (most area is red chroma key). |
| **66** | 45,681 | World map with royal crown — similar to #65, larger visible map area with crown in top-right. |

**Historical Illustrations (#70–#77) — Civilopedia/Event Art**

These are smaller, irregularly-sized images used in the Civilopedia encyclopedia entries and game event popups.

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **70** | 270×189 | 32,190 | Roman soldiers marching — engraving of armored troops before classical temple/forum. |
| **71** | 145×257 | 17,519 | Military parade formation — massed soldiers in ranks receding into distance. WWII era. |
| **72** | 261×194 | 27,653 | Storming of the Bastille — French Revolution engraving showing fortress under siege. |
| **73** | 230×198 | 23,147 | Solidarity protest — "Solidarność" banner visible, 1980s Polish labor movement. |
| **74** | 277×148 | 30,384 | Medieval Islamic art — illuminated manuscript style, mounted warrior with golden sun. |
| **75** | 178×262 | 35,058 | Ticker-tape parade — aerial view of American flags and crowds filling city street. |
| **76** | 290×176 | 18,175 | Pioneer wagon train — covered wagons with oxen crossing frontier landscape. |
| **77** | 197×294 | 19,010 | Construction crane — modern yellow tower crane against blue sky. |

**Sprite Sheets & UI Art (#85–#95)**

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **85** | 640×480 | 21,611 | **Nuclear explosion sprite sheet** — 12-frame animation sequence (6×2 grid) showing mushroom cloud from initial flash through expanding fireball to dissipation. Magenta borders separate frames. Used for nuclear attack animation. |
| **86** | 640×480 | 41,213 | **Government & diplomacy icon sheet** — Sprite atlas containing: government type icons (Anarchy Ω, Despotism ★, Monarchy ∞, Communism ☭, Republic, Democracy ψ) in both 3D rendered and flat styles; treaty state icons (Cease Fire, Peace, War, Old Alliance, Modern Alliance) with a bronze/silver coin; and diplomatic relation icons. Cyan background = chroma key. Labels: "GOVT ICONS", "TUTORIAL ICON HERE", "DIPLO BACK TILE HERE". |
| **90** | 530×480 | 80,029 | **Civilization II seal** — "IN OMNIA PARATUS" motto with classical allegorical figure (Athena/Minerva) holding staff, seated with shield, scroll, and bust of a philosopher. Ornamental circular border. Sepia tones. Used for title screen and Hall of Fame. |
| **95** | 640×480 | 99,889 | Medieval cavalry procession — detailed engraving of armored knights on horseback with banners and plumed helmets. Gray/sepia tones. Background art for high score or victory screen. |

#### Resource Loading

The game loads `TILES.DLL` by name (stored at exe offset `0x224ED4`), positioned near other art file references (`EDITORSQ.GIF`, `scredits.gif`). Like Civ2Art.dll, it is loaded dynamically via `LoadLibraryA` and resources are extracted via `FindResourceA`/`LoadResource`/`LockResource` using the `"GIFS"` type string and integer resource IDs.

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 24 |
| Total image data | 1,067,603 bytes (1,042 KB) |
| Full-screen backgrounds (640×480) | 14 images |
| Historical illustrations (mixed sizes) | 8 images |
| Sprite sheets / UI art | 2 images |
| Seal/title art | 1 image (530×480) |
| Large background art | 1 image (640×480) |
| Resource overhead (directory, CRT, PE) | ~349 KB (25% of file) |

### cv.dll — City View Art Container (Deep Dive)

cv.dll is the largest DLL in the game at 4.75 MB, containing all isometric 3D-rendered artwork for the City View screen — the detailed city display that shows buildings, wonders, and landscape. The name "cv" stands for **City View**. Like its sibling DLLs, it is a resource-only container with identical code to Civ2Art.dll and Tiles.dll.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:02 UTC |
| File size | 4,980,224 bytes (4.75 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 4,837,384 bytes (4.61 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build timing**: Built 31 seconds after Tiles.dll and 12 seconds before Civ2Art.dll in the same April 21, 1997 build session. All three DLLs share byte-identical `.text` and `.data` sections.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll/Tiles.dll) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 4,837,384 | 4,837,888 | **GIF image resources (4.61 MB)** |
| `.reloc` | `0x004c0000` | 17,757 | 17,920 | Relocation table |

#### Embedded GIF Resources (16 total, 3.84 MB image data)

All resources use the custom `"GIFS"` resource type. All are GIF87a format. The game loads `cv.dll` by name (stored at exe offset `0x225A08`, near diplomacy-related strings like `"GREETINGS"`, `"NUCLEARWEAPONS"`, `"YOURNUKES"`).

**City Improvement Building Sprites (#300)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **300** | 740×710 | 150,543 | **Building sprite sheet** — ~45 isometric 3D-rendered city improvement sprites in a 5×9 grid (cells ~124×83px). Includes: aqueduct, barracks, cathedral, colosseum, factory, marketplace, library, university, nuclear plant, airport, stock exchange, harbor, offshore platform, city walls, SDI defense, submarine pens, and more. Green/magenta borders mark sprite boundaries and chroma-key regions. |

**Wonder & Landmark Sprites (#305)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **305** | 640×1130 | 220,281 | **Wonder of the World sprite sheet** — ~30+ isometric wonder sprites in a variable grid. Includes: Apollo Program (rocket), Great Wall (panoramic, 2-cell wide), Pyramids, Hoover Dam, Eiffel Tower, Statue of Liberty (multiple angles/sizes), lighthouse, Shakespeare's Theatre, Darwin's Voyage statue, Women's Suffrage, United Nations, SETI dish, and more. Bottom section has extra-large sprites for Great Wall panorama and oversized wonders. |

**City Growth Vegetation (#310)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **310** | 640×680 | 148,196 | **Vegetation/population sprite sheet** — ~30 tree/forest cluster sprites in a 6×5 grid. Shows progressive city growth: from sparse trees (small population) to dense canopy with village buildings emerging underneath, then larger medieval/modern buildings visible through foliage. Each row appears to represent a different population density level. Green/magenta chroma key borders. |

**City View Landscape Panoramas (#340–#353)**

The core of cv.dll: 12 wide-format landscape backgrounds for the City View screen. Organized as **3 terrain types × 4 era variants**:

| Series | Terrain Type | Dimensions | Water Coverage | Avg Size |
|--------|-------------|-----------|----------------|----------|
| **#340–343** | **Coastal** (ocean shoreline) | 1280×480 | ~4.2% | 284 KB |
| **#345–348** | **Bay/Inlet** (sheltered water) | 1280×480 | ~1.4% | 294 KB |
| **#350–353** | **Inland** (all land, no water) | 1280×480 | 0.0% | 300 KB |

Within each terrain type, the 4 variants show subtle differences (3–8% pixel change between first and last):
- **Greenness decreases progressively** across variants: 53.7 → 51.7 → 50.8 → 49.0 (coastal series)
- **Brightness shifts slightly** between variants
- Changes are distributed uniformly across the image (not concentrated in any region)
- These likely represent **4 civilization eras** (Ancient → Classical → Industrial → Modern), matching the City View's era-dependent appearance

The base ID (#340) has 138 `mov` register references in civ2.exe, confirming it's the computed base value with offsets +0, +1, +2, +3 for era selection.

| ID | Size | Variant |
|----|------|---------|
| 340 | 283,683 | Coastal — Era 1 (most green/natural) |
| 341 | 288,322 | Coastal — Era 2 |
| 342 | 282,218 | Coastal — Era 3 |
| 343 | 281,379 | Coastal — Era 4 (least green) |
| 345 | 293,736 | Bay — Era 1 |
| 346 | 298,874 | Bay — Era 2 |
| 347 | 291,578 | Bay — Era 3 |
| 348 | 291,760 | Bay — Era 4 |
| 350 | 298,250 | Inland — Era 1 |
| 351 | 305,241 | Inland — Era 2 |
| 352 | 295,893 | Inland — Era 3 |
| 353 | 299,006 | Inland — Era 4 |

**Test Resource (#399)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **399** | 32×32 | 914 | Developer test image — gray square with the word "TEST" and a cursor icon. Placeholder/debug resource left in the shipping build. |

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 16 |
| Total image data | 4,029,874 bytes (3.84 MB) |
| Landscape panoramas | 12 images (3.41 MB, 85% of data) |
| Sprite sheets | 3 images (519 KB) |
| Test/debug | 1 image (914 bytes) |
| Panorama width | 1280px (2× game resolution for scrolling) |
| Chroma key colors | Magenta (255,0,255), Green (0,255,0) |

#### The Resource-Only DLL Family

All eight art DLLs share identical code (.text section) and were built within 98 seconds of each other on April 21, 1997:

| Property | mk | Wonder | Tiles | ss | pv | cv | Civ2Art | Intro |
|----------|-----|--------|-------|-----|-----|-----|---------|-------|
| Build time | 12:44 | 13:13 | 13:31 | 13:40 | 13:51 | 14:02 | 14:14 | 14:22 |
| Resource types | GIFS+CTAB | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS |
| Image count | 56+21 | 28 | 24 | 46 | 55 | 16 | 5 | 13 |
| Image data | 2.52 MB | 44 KB | 1.04 MB | 1.05 MB | 1.48 MB | 3.84 MB | 102 KB | 828 KB |
| **Total file** | **3.02 MB** | **182 KB** | **1.38 MB** | **1.39 MB** | **1.91 MB** | **4.75 MB** | **250 KB** | **1.10 MB** |

### mk.dll — Diplomacy & Leader Art Container (Deep Dive)

mk.dll is the diplomacy and leader portrait art container at 3.02 MB. The name likely stands for **"Make King"** or **"Monarch"**, reflecting its primary content: civilization leader portraits for the diplomacy screen. Unlike the other resource DLLs, mk.dll contains **two** custom resource types: `"GIFS"` for images and `"CTAB"` for color palettes.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:12:44 UTC |
| File size | 3,165,696 bytes (3.02 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 3,027,947 bytes (2.89 MB) |

**Build timing**: The earliest of the four resource DLLs (47 seconds before Tiles.dll). Same byte-identical `.text`/`.data` sections, same debug CRT, same trivial `_DllMain@12`.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to siblings) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 3,027,947 | 3,027,968 | **GIFS + CTAB resources (2.89 MB)** |
| `.reloc` | `0x00306000` | 12,895 | 13,312 | Relocation table |

#### Resource Type: CTAB — Color Palettes (21 resources)

A custom resource type unique to mk.dll. Each CTAB is exactly **773 bytes**: a 5-byte header followed by a 256-entry RGB color palette.

**CTAB Format:**
```
Offset 0-3:  00 00 00 00  (4-byte zero header)
Offset 4:    FF           (0xFF = 255, palette entry count marker)
Offset 5-772: 256 × RGB triplets (3 bytes each = 768 bytes)
```

| Resource IDs | Count | Purpose |
|-------------|-------|---------|
| #1000–#1020 | 21 | One custom color palette per civilization |

Each CTAB represents a **civilization-specific color palette** used to re-colorize the diplomacy screen elements (throne room, UI borders, leader portrait frame) to match the civilization's national colors. Palettes differ by ~38–54% of entries from each other, with the largest differences occurring at transitions between civilization art style groups. CTABs #1016 and #1017 are identical (likely two civs sharing the same palette).

**Palette structure** (from CTAB #1000):
- Indices 0–10: Standard Windows system colors (black, dark primaries, grays)
- Indices 11–40: Grayscale ramp (30 shades from near-black to white)
- Indices 41: Pure white
- Indices 42–106: Bright green `(4,255,4)` — chroma key / unused slots
- Indices 107–245: Civilization-specific colors (warm earth tones, skin tones, fabric colors, architectural hues)
- Indices 246–255: Standard Windows system colors (red, green, yellow, blue, magenta, cyan)

#### Resource Type: GIFS — Images (56 resources)

**Throne Room Backgrounds (#200–#206)**

Seven 640×480 full-screen backgrounds for the throne room screen. Each shows a stone wall interior with ornate window frames bearing the omega (Ω) symbol (representing the default/Anarchy government type). Different backgrounds correspond to different government types, providing the base layer upon which throne room decorations are composited.

| ID | Size | Content |
|----|------|---------|
| **200** | 127,061 | Throne room base — stone walls, two Ω-frame windows, magenta status bar area |
| **201** | 127,061 | Throne room variant (identical size to #200) |
| **202** | 122,882 | Throne room variant |
| **203** | 122,882 | Throne room variant (identical size to #202) |
| **204** | 129,316 | Throne room variant |
| **205** | 128,514 | Throne room variant |
| **206** | 124,705 | Throne room variant |

**Throne Room Decoration Sprites (#210–#211)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **210** | 638×334 | 68,875 | Throne room furniture/decoration sprite sheet — multiple decoration items arranged in a grid with magenta separators. Shows seated figure variations and ornamental objects. |
| **211** | 638×334 | 68,962 | Additional throne room decoration sprites — continuation of the decoration set. |

**Military Unit Buttons (#215)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **215** | 640×480 | 29,312 | Military unit type icon buttons — small button sprites in 4 color variants (gray/default, gold/active, blue/selected, silver/disabled). Each button shows a unit type symbol. Used in the military advisor and unit selection UI. Mostly magenta (chroma key) background. |

**Civilization Leader Portraits (#220–#261)**

The crown jewels of mk.dll: **42 leader portraits** at 227×277 pixels each, one for each civilization's two leaders (typically a male and female variant). Each portrait is a detailed artistic rendering in the visual style of the civilization it represents.

All portraits use cyan `(0,255,255)` as the chroma-key background color.

| ID Range | Count | Content |
|----------|-------|---------|
| **220–261** | 42 | 21 civilizations × 2 leader portraits each |

The portraits are rendered in diverse historical art styles — Roman mosaic medallions, Egyptian tomb paintings, medieval illuminated manuscripts, Aztec codex illustrations, Chinese ink paintings, photographic sepia portraits, and more. Each pair of portraits for a civilization uses a consistent artistic style matching that culture's visual tradition.

Total portrait data: ~1.25 MB (49% of all image data in the DLL).

**Small Icon Sheet (#299)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **299** | 64×64 | 2,188 | Dark embossed icon sheet — small symbols/glyphs on dark background. UI element icons. |

**Score & Advisor Screens (#10000–#10002)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **10000** | 640×480 | 39,343 | Hall of Fame / score background — dark theatrical stage with red curtains, spotlight effect, and a silver name plate at the bottom. Decorative skull/mask motifs in corners. |
| **10001** | 297×173 | 16,212 | Decorative stone frieze — ornamental border with skull reliefs and carved stone columns. Used as a UI frame element. |
| **10002** | 640×480 | 149,388 | Military advisor backdrop — elaborate still-life scene of historical weapons, armor, cannon, helmets, shields, swords, and flags arranged on a checkered floor, framed by red curtains. This is the background art for the military advisor screen. |

#### Resource Loading

The game references `mk.dll` at two locations in civ2.exe:
- `"civ2\\mk.dll"` at exe offset `0x22BAB9` (near civilization abbreviation strings: MON, CEL, JAP, VIK, SPA, PER, CAR, SIO)
- `"mk.dll"` at exe offset `0x22BBD8` (near `"VFWNOTREGISTERED"`)
- `"civ2\\mk.dll"` at exe offset `0x230AA5` (near `"SLAM"`)

#### Summary Statistics

| Metric | Value |
|--------|-------|
| CTAB palette resources | 21 (16 KB total) |
| GIF image resources | 56 (2.52 MB total) |
| Leader portraits (227×277) | 42 images (1.25 MB) |
| Throne room backgrounds (640×480) | 7 images (883 KB) |
| Sprite sheets | 3 images (167 KB) |
| Score/advisor screens | 3 images (205 KB) |
| Icon sheet (64×64) | 1 image (2 KB) |

### pv.dll — Palace View Art Container (Deep Dive)

pv.dll is the **Palace View** art container at 1.91 MB. The name stands for **"Palace View"**, confirmed by its single exe cross-reference at `0x225814` which appears immediately before the strings `THRONE` and `ADDTOTHRONE` — the palace-building minigame where players upgrade their palace after completing city improvements.

**PE Structure**: Identical to the other resource-only DLL siblings (100% code-identical .text section of 99,328 bytes containing debug CRT). Built **1997-04-21 18:13:51 UTC** — third of five siblings, 20 seconds after Tiles.dll and 11 seconds before cv.dll.

**Resources**: 55 embedded GIF images totaling 1.48 MB, all using the custom `"GIFS"` resource type. One base background at 640×480, all 54 sprites at 642×482 (the extra 2px border on each side likely aids compositing alignment).

#### Resource #100 — Palace Base Room (640×480, 134 KB)

The empty palace interior: a symmetrical stone hall with columns, pedestals, and a central plinth. This is the base canvas onto which all component sprites are composited. Unlike the sprites, it has **0% chroma-key** — it fills the entire frame. The sepia/brown palette establishes the stone architectural feel.

#### Palace Component System

The game's palace is built from **compositable sprite layers**, each with cyan chroma-key (`#04C5C5` or `#5AFFFE`) transparency. Components are organized into functional groups, with each group containing **4 variants** representing upgrade tiers (primitive → ornate). The `ADDTOTHRONE` string in the exe confirms the incremental upgrade mechanic.

**Structural Components** (groups of 4 tiers):

| ID Range | Component | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|----------|-----------|--------|--------|--------|--------|
| #105–108 | Wall (upper) | Cave rock | Cave rock (duplicate of #105) | Dark stone/spotlight | Woven brick |
| #110–113 | Floor | Dark cave earth | Rough stone | Polished tile (light) | Smooth sandstone |
| #115–118 | Wall overlays | Animal hide shapes | Dirt path runner | Dark mesh curtain | Patterned tile runner |
| #120–123 | Doorways | Rough cave opening | Rough stone arch | Smooth stone + light | Masonry + light |
| #125–128 | Corner decorations | Crossed-stick torch | Fan palm plant | Mesh curtain/drape | Pillar strips |
| #130–133 | Columns | Wood scaffolding/ladders | Simple post-and-lintel | Round arches on pillars | Ornate classical columns |
| #135–138 | Throne/Seat | Sleeping animal (rock) | Simple wooden stool | Stepped dais with throne | Dark ornate cabinet |
| #140–143 | Window arches | Pointed hide tent frame | Tall narrow posts | Gothic pointed arches | Round classical arches |

Note: #105 and #106 are **byte-identical** (74,478 bytes each) — a duplicate left in the shipping build, similar to the `#399 TEST` image in cv.dll.

**Decorative Accessories** (#160–166, 7 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #160 | Small vases/pots pair | 97.0% |
| #161 | Classical paintings triptych (religious/allegorical) | 79.1% |
| #162 | Grass/hedge strip segments | 93.1% |
| #163 | Grass/hedge border (shorter) | 97.6% |
| #164 | Small hedge border | 97.7% |
| #165 | Topiary trees pair | 96.4% |
| #166 | Boulder/rock decorations with floor tile | 85.2% |

**Furnishings & Architectural Details** (#170–184, 15 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #170 | Golden doorway/gate frame | 85.8% |
| #171 | Dark wooden doors pair with curtain headers | 80.7% |
| #172 | Small dark cabinet/screen | 91.5% |
| #173 | Trapezoid pedestal/base | 83.0% |
| #174 | Ornate gilded columns with entablature | 90.7% |
| #175 | Open sky/clouds visible through colonnade | 82.0% |
| #176 | Tiny square tile/block | 99.2% |
| #177 | Floor tile samples (3 variants) | 90.8% |
| #178 | Small decorative strip | 97.3% |
| #179 | Decorative furniture items row | 94.9% |
| #180–181 | Shelf/rail strips (2 variants) | 98–99% |
| #182–184 | Small shelf/rail details | 97–99% |

#### Compositing System

The palace view works by layering sprites onto the #100 base room:

1. **Base room** (#100, 640×480) — the empty stone hall canvas
2. **Wall textures** (#105–108) — fill the upper wall areas
3. **Floor textures** (#110–113) — replace the base floor
4. **Structural elements** (doorways, columns, windows, overlays) — composited with chroma-key
5. **Throne** (#135–138) — placed at center
6. **Decorative accessories** (#160–184) — scattered throughout

All sprites use **642×482** dimensions (1px larger border on each side than the 640×480 base), suggesting the compositing engine uses the extra pixels for alignment or anti-aliasing bleed.

#### Chroma-Key Colors

Two distinct cyan values are used across the sprite set:
- **#04C5C5** (R:4, G:197, B:197) — used in lower-tier sprites (#105–143)
- **#5AFFFE** (R:90, G:255, B:254) — used in higher-tier and decorative sprites (#170–184)

This dual-palette split may reflect two different artists or two production passes during development.

#### Exe Cross-References

Single reference at `0x225814`: `pv.dll` appears alongside `THRONE`, `ADDTOTHRONE`, and Civilopedia section keys (`@ADVANCE_INDEX`, `@IMPROVEMENT_INDEX`, etc.), placing it in the game's content loading and Civilopedia subsystem.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Base room background | 1 image (640×480) | 134 KB |
| Structural components (4-tier groups) | 32 images (642×482) | 905 KB |
| Decorative accessories | 7 images (642×482) | 108 KB |
| Furnishings & details | 15 images (642×482) | 82 KB |
| **Total** | **55 images** | **1.48 MB** |

### ss.dll — Spaceship Art Container (Deep Dive)

ss.dll is the **Spaceship** art container at 1.39 MB. The name stands for **"Space Ship"** — this is the art for the spaceship construction screen, one of the game's victory conditions where players build a spacecraft to reach Alpha Centauri. Confirmed by its exe cross-reference at `0x22D2E4` which appears alongside `"civ2\\video\\launch.avi"` and localized launch button text (`"Starten"` = German, `"Lancer"` = French).

**PE Structure**: Identical code sibling — 100% .text match with the other four resource-only DLLs. Built **1997-04-21 18:13:40 UTC** — second of five siblings (9 seconds after mk.dll, 11 seconds before pv.dll).

**Resources**: 46 embedded GIF images totaling 1.05 MB, all using the custom `"GIFS"` resource type.

**Chroma-key color**: **Orange #E36F1F** (R:227, G:111, B:31) — uniquely different from the cyan chroma used in pv.dll, mk.dll, and cv.dll. Some images also use **magenta #FF00FF** as a secondary transparency color.

#### Assembled Spaceship Views (#400–440, 24 images, 640×480)

These are pre-rendered views of the spaceship at progressive stages of assembly, displayed to the player in the spaceship construction screen. File sizes increase monotonically from 19 KB (#400) to 45 KB (#440), reflecting the growing visual complexity as more components are added:

- **#400–404** (5 images): Initial assembly — minimal structure, ~5% content (rest is chroma-key)
- **#406–418** (7 images, even IDs): Structural spine additions, growing from ~6% to ~8% content
- **#421–430** (8 images): Module and component additions, ~9–13% content
- **#433–440** (4 images, step-3 IDs): Final assembly stages, reaching ~17% content

The spaceship appears as a metallic blue-grey structure oriented diagonally (upper-left to lower-right) against the orange chroma-key background, with progressively more pods, panels, and structural members attached.

#### Component Sprite Sheets (#441–491, 11 images in 5 paired sets + 1 solo)

Individual spaceship components rendered as sprite strips with numbered left/right variants (labeled "1L, 1r, 2L, 2r..." etc. in magenta text overlays). Each pair consists of an **A variant** (detailed/3D rendered) and a **B variant** (simplified/placeholder rendering of the same shapes).

| IDs | Dimensions | Component Type | Sprites per sheet |
|-----|-----------|---------------|-------------------|
| #441/#442 | 695×110 | Solar panel arrays — triangular/wedge shapes with green panel faces | ~16 (8 L/R pairs) |
| #455/#456 | 905×104 | Structural beams — elongated metallic/wooden beam segments | ~16 (8 L/R pairs) |
| #470/#471 | 290×85 | Habitation modules — round pod/capsule shapes | ~4 |
| #480/#481 | 411×78 | Component segments — cylindrical tube pieces | ~8 (4 L/R pairs) |
| #489/#490 | 550×120 | Brackets/connectors — curved mounting hardware | ~8 (4 A/B pairs) |
| #491 | 750×101 | Structural details — small antennas, struts, solar cells, framework | ~30+ sprites |

#### UI & Scene Art (#497–499, 3 images)

| ID | Dimensions | Description |
|----|-----------|-------------|
| #497 | 640×480 | **Status indicator lights** — 6 small LED-style buttons (2×3 grid) in green/red/amber states, positioned at top-left corner with rest as chroma-key. Used to show component readiness status. |
| #498 | 640×240 | **Alpha Centauri arrival scene** — half-height deep space background with a reddish-brown planet (Alpha Centauri destination) against starfield. Shown upon successful spaceship arrival. |
| #499 | 640×480 | **Earth from orbit** — full-screen view of Earth showing continents, ocean, cloud formations and a cyclone. Shown as the launch departure scene. |

#### Thruster Animation (#20000–20007, 8 frames, 640×480)

An 8-frame animation sequence of rocket thruster exhaust, used during the spaceship launch cinematic. Content grows from 0.6% (#20000, tiny spark) to 3.6% (#20007, full thruster plume), showing cyan-green flame sprites against orange chroma-key. The small sprites grow larger across the sequence, creating the ignition → full-thrust animation.

#### Exe Cross-References

Single reference at `0x22D2E4`: the string `"ss.dll"` appears near:
- `"S.S. "` — spaceship label prefix (as in "S.S. Enterprise")
- `"civ2\\video\\launch.avi"` — the launch cinematic video file
- `"Starten"` / `"Lancer"` — German/French localized "Launch" button text
- `"0,000"` — numeric display format (likely for travel time/distance)

This places ss.dll firmly in the spaceship construction and launch subsystem, with `launch.avi` being the FMV that plays when the player launches their completed spaceship.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Assembled spaceship views (640×480) | 24 images | 678 KB |
| Component sprite sheets (various) | 11 images | 185 KB |
| UI status lights | 1 image | 12 KB |
| Space scene backgrounds | 2 images | 118 KB |
| Thruster animation frames | 8 images | 90 KB |
| **Total** | **46 images** | **1.05 MB** |

### Intro.dll — Intro Sequence Art Container (Deep Dive)

Intro.dll is the **intro slideshow** art container at 1.10 MB. It holds the historical images displayed during the game's opening sequence — a slideshow of civilization-themed photographs and engravings shown once when the game first launches. Confirmed by its exe cross-reference at `0x232A2C` (`"civ2\\intro.dll"`) which appears immediately before the window class name `"Civilization II Once Only"`, indicating a one-time display window.

**PE Structure**: The seventh and **final** code-identical sibling DLL. Built **1997-04-21 18:14:22 UTC** — 8 seconds after Civ2Art.dll, completing the 98-second build run that started with mk.dll at 18:12:44. 100% .text match (99,328 bytes of debug CRT).

**Resources**: 13 embedded GIF images totaling 828 KB, all using the custom `"GIFS"` resource type.

#### Visual Style

All images except #901 are framed with a **painted gold picture frame** border (~3–5px wide, gradient from R:211,G:123,B:47 to R:239,G:163,B:7), giving each image the appearance of a museum painting or gallery exhibit. This fits the intro's theme of presenting human civilization as a curated exhibit of historical moments.

#### Image Catalog

**#901 — Satellite View (376×227, 40 KB)**

Aerial/satellite view of the Nile Delta, Red Sea, and Arabian Peninsula — the "Cradle of Civilization" region. The only image without a gold frame, and the only one at its particular dimensions. Likely serves as the opening or transitional image in the slideshow.

**#902–905 — Historical Engravings, Wide Format (583×257, ~89 KB avg)**

| ID | Description |
|----|-------------|
| #902 | Colonial-era city map/plan showing a port settlement with street grid and waterway |
| #903 | Monumental stone guardian statue (East Asian, likely Chinese Ming Dynasty tomb figure) — largest file at 119 KB |
| #904 | 19th-century engraving of diverse ancient peoples in an encounter scene |
| #905 | Horsemen and explorers near pyramids — Napoleonic-era Egyptian expedition style |

Note: #902 and #904 share the same file size (89,348 bytes) but are **not** byte-identical — they contain completely different images that happen to compress to the same GIF size.

**#906–909 — Historical Engravings & Architecture (584×258, ~66 KB avg)**

| ID | Description |
|----|-------------|
| #906 | Middle Eastern/Ottoman peoples in traditional dress (ethnographic engraving) |
| #907 | Diverse Asian and African peoples in traditional costume (ethnographic engraving) |
| #908 | Photograph of Chinese palace building — the Palace Museum (故宫博物院) at the Forbidden City |
| #909 | Naval battle with burning/sinking ships (19th-century warfare engraving) |

Note: Dimensions are 584×258 — exactly 1px wider and 1px taller than the #902–905 group, suggesting these two sets were prepared in slightly different production passes.

**#910–913 — Natural Landscapes (406×258, ~41 KB avg)**

| ID | Description |
|----|-------------|
| #910 | Grand Canyon — layered red rock formations |
| #911 | Monument Valley — desert butte with distant mesa |
| #912 | Aerial view of an island (tropical atoll or volcanic island) |
| #913 | Alpine mountain lake with snow, pine forest, and reflected peaks |

These narrower landscape photographs likely appear in a different panel position during the slideshow, or are composited alongside the wider historical images.

#### Thematic Progression

The images trace civilization's arc across three visual themes:

1. **Geography & Origin** (#901, #910–913): The physical world — satellite views, canyons, mountains, islands, lakes
2. **Peoples & Culture** (#902–907): Human societies — city planning, monumental art, diverse peoples in traditional dress, exploration
3. **Power & Conflict** (#908–909): Architecture of power (Forbidden City) and warfare (naval battle)

#### Exe Cross-References

Single reference at `0x232A2C`: `"civ2\\intro.dll"` appears near:
- `"Civilization II Once Only"` — the window class name for the one-time intro display
- `"MSWindowClass"` — base Windows class for the intro window
- `"ENTER WINDOW DRAG"` / `"EXIT WINDOW DRAG"` — window interaction events
- Government-related strings (`PICKGOVT`, `NEWGOVT`, `DEMOCRATS`, `OVERTHROWN`) — suggesting the intro code shares a module with the government transition system

A separate exe reference at `0x229F2C` shows `"civ2\\video\\opening.avi"` — the FMV intro video that plays before or after this slideshow sequence.

#### Build Family Position

Intro.dll completes the resource-only DLL build session:

| Order | DLL | Time | Content |
|-------|-----|------|---------|
| 1st | mk.dll | 18:12:44 | Diplomacy & leaders |
| 2nd | Tiles.dll | 18:13:31 | Tile & UI art |
| 3rd | ss.dll | 18:13:40 | Spaceship |
| 4th | pv.dll | 18:13:51 | Palace view |
| 5th | cv.dll | 18:14:02 | City view |
| 6th | Civ2Art.dll | 18:14:14 | Credits art |
| **7th** | **Intro.dll** | **18:14:22** | **Intro slideshow** |

Total build time: **98 seconds** for all 7 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Satellite/aerial view (376×227) | 1 image | 40 KB |
| Historical engravings, wide (583×257) | 4 images | 388 KB |
| Historical/architectural (584×258) | 4 images | 263 KB |
| Natural landscapes (406×258) | 4 images | 166 KB |
| **Total** | **13 images** | **828 KB** |

### Wonder.dll — Wonder Indicator Art Container (Deep Dive)

Wonder.dll is the **smallest** of the resource-only DLL family at just 182 KB. It contains 28 small indicator panels used in the wonder tracking UI — one panel for each of the game's 28 buildable Wonders of the World.

**PE Structure**: The second sibling built in the family. Built **1997-04-21 18:13:13 UTC** — 29 seconds after mk.dll, 18 seconds before Tiles.dll. 100% .text match (99,328 bytes of debug CRT) with all other siblings.

**Resources**: 28 embedded GIF images (#20000–#20027) totaling 44 KB, all using the custom `"GIFS"` resource type. Every image is exactly **74×74 pixels** and exactly **1,607 bytes** — remarkably uniform.

#### The 28 Wonder Panels

Each image is a small gray stone-textured panel (interior avg RGB: 224,224,224) with a subtly tinted **colored border frame** (~2px wide). The panels serve as wonder status indicators in the game's wonder tracking interface, likely displayed in a grid showing which wonders have been built and by whom.

Despite all being 1,607 bytes and 74×74 pixels, all 28 images are **unique** — they differ by approximately 610 bytes each, with the differences concentrated in the border pixels. The border colors form a spectrum:

| Hue Family | Wonder IDs | Border RGB Example | Count |
|------------|-----------|-------------------|-------|
| Blue/Purple | #20000, 03, 05–08, 10–12, 14–17, 20–21, 25–27 | (163,152,179) | 18 |
| Pink/Red | #20001, 04, 09, 13, 18–19, 22–23 | (179,163,171) | 8 |
| Neutral Gray | #20002, 24 | Pure gray | 2 |

The color tinting likely encodes a default or thematic color for each wonder, with the game engine further recoloring these panels at runtime to match the civilization that built each wonder.

These panels are visually identical to the **#999 panel** in Civ2Art.dll (also 74×74 gray), which has 23 cross-references in the exe and serves as the generic/empty version. Wonder.dll provides the 28 wonder-specific variants.

#### Relationship to Wonder Videos

The exe cross-reference at `0x22CA84` shows the loading path:
- `"civ2\\wonder.dll"` — this DLL (indicator panels)
- `"civ2\\video\\wonder"` + `".avi"` — individual wonder construction videos

The wonder video subsystem constructs paths like `civ2\video\wonder001.avi` through `wonder028.avi`, each being a short FMV that plays when a wonder is completed. The nearby string `"VFWNOTREGISTERED"` (Video for Windows) handles the case where the video codec isn't installed.

Also nearby: `"Failed to load civ2art.gif"` — a fallback error message confirming Wonder.dll is loaded as part of the art resource chain.

#### Wonder-Related Game Events

The exe contains extensive wonder event strings, revealing the full wonder lifecycle:

| Event | String | Description |
|-------|--------|-------------|
| Start building | `STARTWONDER` | Player begins wonder construction |
| Switch production | `SWITCHWONDER` | Change which wonder is being built |
| Abandon | `ABANDONWONDER` | Cancel wonder construction |
| Complete | `ENDWONDER` | Wonder finished — triggers video |
| Almost done | `ALMOSTWONDER` | Near completion warning |
| Still building | `STILLWONDER1`, `STILLWONDER2` | Progress updates |
| Captured | `CAPTUREWONDER` | City with wonder captured |
| Lost | `LOSTWONDER` | Wonder lost to enemy |
| Acquired | `NM_ACQUIRE_WONDER` | Network message: wonder acquired |
| No exchange | `NOEXCHANGEWONDER` | Can't trade wonder in diplomacy |
| Don't play videos | `DONTPLAYWONDERS` | Config flag to skip wonder videos |

#### Build Family Position (Corrected)

Wonder.dll slots in as the **second** sibling, correcting the previous 7-sibling count to **8 siblings**:

| Order | DLL | Time | Δ |
|-------|-----|------|---|
| 1st | mk.dll | 18:12:44 | — |
| **2nd** | **Wonder.dll** | **18:13:13** | **+29s** |
| 3rd | Tiles.dll | 18:13:31 | +18s |
| 4th | ss.dll | 18:13:40 | +9s |
| 5th | pv.dll | 18:13:51 | +11s |
| 6th | cv.dll | 18:14:02 | +11s |
| 7th | Civ2Art.dll | 18:14:14 | +12s |
| 8th | Intro.dll | 18:14:22 | +8s |

Total build session: **98 seconds** for all 8 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Wonder indicator panels (74×74) | 28 images | 44 KB |
| **Total** | **28 images** | **44 KB** |

### timerdll.dll — SMEDS Engine Timer Callback DLL (Deep Dive)

timerdll.dll is the game's **high-resolution timer** DLL — and it is fundamentally different from every other DLL in the Civ2 distribution. While the 8 resource-only siblings are art containers with trivial code, timerdll.dll is the opposite: a **pure code DLL** with no resources, providing the SMEDS engine's multimedia timer infrastructure.

**PE Structure**: No .rsrc section. Internal export name is **`CALLBACK.dll`** (its original name before being renamed for shipping). Built **1997-03-17 21:39:57 UTC** — a full **35 days before** the resource DLL family (April 21, 1997), confirming it was developed independently as part of the SMEDS32 engine.

| Property | Value |
|----------|-------|
| File size | 131,072 bytes (128 KB) |
| Build date | March 17, 1997, 21:39:57 UTC |
| Internal name | `CALLBACK.dll` |
| Build config | **Debug** (shipped with debug CRT, assertions enabled) |
| Source path | `D:\SS\Smeds32\timer\Debug\timer.pdb` |
| Build output | `timer\Debug/timer.dll` (note mixed path separators) |
| .text size | 99,840 bytes |
| Actual timer code | **~464 bytes** (0.5% of .text) |
| Debug CRT overhead | ~99 KB (99.5% of .text) |
| Sibling code match | **26.8%** (different CRT build, NOT a sibling) |

#### Exports (6 functions)

| Export | Purpose |
|--------|---------|
| `TimerCallBack` | Main callback invoked by multimedia timer — looks up timer slot, checks notification flag, calls `timeGetTime`, posts message to game window |
| `SetTimerID` | Stores a timer handle into slot N of the 16-slot ID array |
| `GetTimerID` | Retrieves the timer handle from slot N |
| `GetTimerIndex` | Searches all 16 slots for a matching timer handle, returns the index |
| `ResetTimerNotified` | Clears the notification flag for a given timer slot |
| `WEP` | Windows Exit Procedure — Win16 compatibility stub, returns 1 |

#### Imports (3 DLLs, 72 functions)

| DLL | Function | Purpose |
|-----|----------|---------|
| `WINMM.dll` | `timeGetTime` | High-resolution multimedia timer (millisecond precision) |
| `USER32.dll` | `PostMessageA` | Sends asynchronous window messages |
| `KERNEL32.dll` | 70 functions | Standard C runtime (debug build) |

#### Timer Architecture

The DLL implements a **callback-to-message bridge**: Windows multimedia timers fire callbacks in a separate thread context, but Civ2's game logic runs on the main UI thread. This DLL solves the threading problem by converting timer callbacks into Windows messages posted to a hidden window.

**Data structures** (in .data section):
- `TimerID[16]` — array of 16 DWORD timer handles (at RVA 0x1F380)
- `NotifiedFlag[16]` — array of 16 DWORD notification flags (at RVA 0x1F3F0)
- Maximum of **16 concurrent timers**

**TimerCallBack flow**:
1. Called by WINMM when a multimedia timer fires
2. `GetTimerIndex(timerID)` — linear search through 16 slots to find matching handle
3. Check `NotifiedFlag[slot]` — skip if already notified (prevents message flooding)
4. `timeGetTime()` — get current millisecond timestamp
5. `PostMessageA(hWnd, 0x052C, slotIndex, currentTime)` — post to game window
   - Message **0x052C** = `WM_USER + 300` (custom timer notification)
   - wParam = timer slot index (0–15)
   - lParam = current time in milliseconds
6. Set `NotifiedFlag[slot] = 1` — mark as notified until game resets it

**Cleanup function**: Iterates all 16 slots, zeroing both `TimerID` and `NotifiedFlag` arrays.

#### Exe-Side Client (Pctimer.cpp)

The exe contains the consumer code in `D:\Ss\Smeds32\Pctimer.cpp`, which:
- Dynamically loads `timerdll.dll` via `LoadLibraryA` / `GetProcAddress` for all 5 callback functions
- Creates a hidden window with class **`MSMrTimerClass`** and title **`MrTimer`** to receive timer messages
- Handles three error conditions:
  - `ERR_DYNAMICLINKFAILED` — timerdll.dll couldn't be loaded or exports not found
  - `ERR_CANTCREATEWINDOW` — hidden timer window creation failed
  - `ERR_TIMERSETFAILED` — multimedia timer couldn't be started

#### Three Names, One DLL

This DLL has accumulated three different names through its development:
1. **CALLBACK.dll** — the original internal export name (earliest development name)
2. **timer.dll** — the build output name (`timer\Debug/timer.dll`)
3. **timerdll.dll** — the shipping name (renamed to avoid conflicts with system DLLs)

#### Build Date Significance

At March 17, 1997, timerdll.dll is the **oldest DLL** in the Civ2 MGE distribution:

| DLL | Build Date | Age vs. timerdll |
|-----|-----------|-----------------|
| **timerdll.dll** | **1997-03-17** | **baseline** |
| Resource DLLs (×8) | 1997-04-21 | +35 days |
| XDaemon.dll | 1998-11-10 | +603 days |

This is consistent with timerdll.dll being a **reusable SMEDS engine component** built once and never recompiled, while the resource DLLs were rebuilt fresh for the April 1997 release and XDaemon.dll was added later for MGE multiplayer.

### Source Code Structure

Debug strings preserve the original source tree:

**Game code** (`D:\Ss\Franklinton\`):

| Source File | Purpose |
|-------------|---------|
| `Difference Engine.cpp` | Multiplayer state synchronization — RLL-compressed delta encoding of game state |
| `Grey.cpp` | Grayscale palette and color management for BMP loading |
| `Map.cpp` | Map operations with server/client authority checking |
| `NetMgr.cpp` | Network manager core — protocol init, connection lifecycle |
| `NetMgr Poll.cpp` | Network receive polling loop, message dispatch, client transfer on host migration |
| `NetMgr Send.cpp` | Outbound message sending with socket validation |
| `NetMessageQueue.cpp` | Dual message queue (Alpha priority queue [0,400) + Primary queue [400,MAX)) |
| `Popup_1.cpp` | Dialog/popup system (stack depth limit: 16) |
| `Unit.cpp` | Unit lifecycle — creation, deletion, stacking, movement, with infinite-stack repair |
| `parleywin.cpp` | Diplomacy window UI |
| `parleywin add dialog.cpp` | Diplomacy dialog construction (LEFT/RIGHT panel layout) |
| `parleywin transaction.cpp` | Diplomacy transaction protocol (max 2048 char descriptions) |
| `startup LAN.cpp` | LAN game initialization with network type validation |
| `startup joinbox.cpp` | Game join dialog |
| `startup multiplayer.cpp` | Multiplayer setup flow |
| `startup playerbox.cpp` | Player selection with IGZ lobby integration |

**SMEDS Engine** (`D:\Ss\Smeds32\`):

| Source File | Purpose |
|-------------|---------|
| `Port.cpp` | Graphics surface abstraction — loads BMP, GIF, PCX, TGA, and LBM/IFF (Amiga) formats |
| `dd.cpp` | DirectDraw wrapper — surface creation, palette management, hardware capability detection |
| `ddcntrl.cpp` | DirectDraw UI control widgets |
| `Pcmem.cpp` | Memory management |
| `Pctimer.cpp` | Timer system via external `timerdll.dll` (exports: `TimerCallBack`, `SetTimerID`, `GetTimerID`, `GetTimerIndex`, `ResetTimerNotified`) |

The engine name "SMEDS" likely stands for **Sid Meier's Entertainment/Development System** — it's a reusable game framework with its own windowing system (`MSWindowClass`, `MSControlClass`, `MSScrollBarClass`, etc.), sprite engine, and multimedia playback. The log system writes to `smeds.log`.

### Difference Engine — Multiplayer State Sync

The "Difference Engine" (`Difference Engine.cpp`) is the multiplayer state synchronization system. It works by maintaining a mirror of the full game state and transmitting compressed deltas:

- **State blocks**: `btGame` (full game state) and `btMapStruct` (map structure)
- **Compression**: RLL (Run Length Limited) encoding via `RLLEncode` / `RLLBufferDecode`
- **Constraints**: `mirrorLength % sizeof(long) == 0` (state must be DWORD-aligned), diffs capped at `DIFF_ENGINE_MESSAGE_LENGTH`
- **Network messages**: `NM_FULL_GAMESTATE`, `NM_DIFF_GAMESTATE`, `NM_JOIN_GAMESTATE`, `NM_DIFFERENCE_ENGINE`, `NM_ALPHA_DIFFERENCE_ENGINE`

This confirms the in-memory game state is a flat, serializable structure — the same layout that gets written to `.SAV` files.

### Network Protocol Messages (155 total)

The game defines approximately 155 network message types for multiplayer synchronization. They reveal the complete internal game architecture:

**Map & Tile State (17 messages):**
`NM_TERRAIN_SET`, `NM_SEEN_SET`, `NM_OWNER_SET`, `NM_REGION_SET`, `NM_CITY_USING_SET`, `NM_FEATURE_SET`, `NM_FEAT_LOC_SET`, `NM_SITE_SET`, `NM_MAP_STRUCT`, `NM_MAP_PACKETS`, `NM_DO_APOLLO`, `NM_LOCK_MAP`, `NM_UNLOCK_MAP`, `NM_LOCK_MAP_ACK`, `NM_UNLOCK_MAP_ACK`, `NM_LOCK_MAP_SYNC`, `NM_DRAW_MAP_REGION`

These confirm the per-tile data fields we identified in the save format:
- **TERRAIN** → Byte 0 (terrain type + features)
- **SEEN** → Byte 3 (visibility/exploration bitmask)
- **OWNER** → Territory control
- **CITY_USING** → Byte 4 (which city is working this tile)
- **REGION** → Byte 5 (continent/region ID)
- **FEATURE** / **FEAT_LOC** → Byte 1–2 (improvements + locations)
- **SITE** → Special site markers

**Unit Operations (27 messages):**
Full unit lifecycle: `CREATE_UNIT` / `UNIT_CREATED`, `DELETE_UNIT` / `UNIT_DELETED`, `PICK_UP_UNIT` / `UNIT_PICKED_UP`, `PUT_DOWN_UNIT` / `UNIT_PUT_DOWN`, `RELOCATE_UNIT`, `MOVE_TO_BOTTOM`, `STACK_SHIP` / `STACK_UNIT`, `BRIBED_UNIT`, `DEATH_STACK`, `DELETE_SAFELY` / `DELETE_VISIBLY`, `AI_MOVEMENT`, `HUMAN_MOVEMENT` / `HUMAN_MOVE_COMPLETE`, `SLIDE_PIECE`, `REALTIME_STACKER`

**City Operations (17 messages):**
`CREATE_CITY` / `CITY_CREATED`, `DELETE_CITY` / `CITY_DELETED`, `ACQUIRE_WONDER` / `WONDER_ACQUIRED`, `PRODUCTION_BEGIN` / `PRODUCTION_COMPLETE`, `CITYWIN_CHECK_UNIT`, `CITYWIN_CHECK_CITY`, `CITYWIN_DELETED`, `CITYWIN_REDRAW`, `REVEAL_CITY_INFO` / `HIDE_CITY_INFO`, `REVEAL_CITY_ORIGIN` / `HIDE_CITY_ORIGIN`

**Diplomacy (26 messages):**
Full diplomacy protocol: `SET_ATTITUDE`, `SET_CIV`, `NEW_CIV` / `KILL_CIV` (with ACKs), `KINGDOM_RATES`, `TAX_CHECK`, `PICK_GOVT`, `POLITICAL_VIOLATIONS`, `POLITICAL_ATTITUDE`, `PARLEYREQUEST_REPLY` / `PARLEYREQUEST_CANCEL`, `PARLEY_TRANSACTION`, `PARLEY_ACCEPT_OFFER`, `PARLEY_NO_THANKS`, `PARLEY_COUNTER_OFFER`, `PARLEY_EXECUTE`, `DO_AIPARLEY`, `PRETEXT`, `CIVILIZATION_PING`

**Game Event Popups (~70 NM_POP_* messages):**
Every in-game event that triggers a popup notification has its own message type, including: `RETIREDIE`, `BARBARIANS`, `GLOBALWARMING`, `EAGLEHASLANDED`, `SPACELAUNCHED`, `SPACERETURNS`, `SPACEDESTROYED`, `DESTROYED`, `CARAVAN`, `STARTWONDER`, `CAPTUREWONDER`, `CITYCAPTURE`, `PARTISANS`, `PROMOTED`, `BOND007`, `PEARLHARBOR`, `CIVILWAR`, `MANHATTAN`, `GOLDENAGE`, `SPY_ESTABLISHEMBASSY`, `SPY_STOLENCIV`, `SPY_SABOTAGE1`, `SPY_PLANTNUKE`, etc.

### Anti-Piracy / Encryption Block

The `.data` section at VA `0x00227458` contains a 384-byte block with the plaintext marker:

```
PLAINTEXT TARGET
BYTE REPLACEMENT OF THIS BLOCK WITH PUBLIC-KEY CYPHERTEXT
```

This is a placeholder for a public-key encryption check — likely a copy protection mechanism where the block would be encrypted in retail copies and decrypted at runtime to verify authenticity. The block in this installation contains the unencrypted placeholder text.

### CIV.INI Configuration Settings

The game reads/writes settings from `CIV.INI` under the section `[Civilization Gold]`:

| Setting | Default | Purpose |
|---------|---------|---------|
| `Language Preference` | English | UI language (English, Francais, Deutsch) |
| `Simultaneous` | — | Simultaneous turns mode toggle |
| `MaxPlayers` | — | Maximum players in multiplayer |
| `Herald Warning Shown` | 0/1 | Whether the herald warning has been displayed |
| `ChatShowSize` | 8192 (or 57344) | Chat log display buffer size |
| `Window Name` | — | Application window title |
| `Adapter` | 0 | Network adapter index |
| `NetTimeOut` | 30 | General network timeout (seconds) |
| `INTERNET Timeout` | 60 | Internet game timeout (seconds) |
| `TCPIP Timeout` | 15 | LAN TCP/IP timeout (seconds) |
| `IPXSPX Timeout` | 15 | IPX/SPX timeout (seconds) |
| `MODEM Timeout` | 30 | Modem game timeout (seconds) |
| `DIRECT Timeout` | 30 | Direct serial connection timeout (seconds) |

Registry path: `Software\MicroProse Software\Civilization II Multiplayer Gold Edition` (constructed from `Software\%s\%s`).

### Network Protocol Support

| Protocol | Transport | Timeout | Init Function |
|----------|-----------|---------|---------------|
| Internet | TCP/IP | 60s | `XD_InitializeSocketsTCP` |
| LAN | TCP/IP | 15s | `XD_InitializeSocketsTCP` |
| IPX/SPX | IPX | 15s | `XD_InitializeSocketsIPXSPX` |
| Modem | Dial-up | 30s | `XD_InitializeModem` |
| Serial | Direct cable | 30s | `XD_InitializeSerial` |
| IGZ Lobby | Internet Gaming Zone | — | `XD_LaunchedByLobby` |

Host migration is supported: if the server disconnects, a client can `ClientTransferServer` to become the new host.

### Internationalization

Three languages are supported: **English** (default), **French** (`Francais`), **German** (`Deutsch`). Language-specific files use suffixes (e.g., `RULES.FRE`, `RULES.GER`, `CITY.FRE`, `EVENTS.GER`). Language data is stored in `INTER.DAT`. Some German strings appear inline in the executable (`erhalten`, `von den`, `Lancer`, `Starten`).

### Scenario Event Scripting Language

The executable contains a full parser for scenario event scripts (`EVENTS.TXT`), wrapped in `@BEGINEVENTS` / `@ENDEVENTS` blocks:

**IF Triggers** (conditions that fire events):

| Trigger | Parameters |
|---------|------------|
| `@IF UNITKILLED` | `unit=`, `attacker=`, `defender=` |
| `@IF CITYTAKEN` | `city=`, `attacker=`, `defender=` |
| `@IF TURN` | `turn=` (supports `EVERY` keyword) |
| `@IF TURNINTERVAL` | `interval=` |
| `@IF RANDOMTURN` | `denominator=` |
| `@IF SCENARIOLOADED` | (no parameters) |
| `@IF NEGOTIATION` | `talker=`, `talkertype=`, `listener=`, `listenertype=` (HUMAN/COMPUTER/HUMANORCOMPUTER) |
| `@IF NOSCHISM` | `defender=` |
| `@IF RECEIVEDTECHNOLOGY` | `technology=`, `receiver=` |

**THEN Actions** (effects when triggered):

| Action | Parameters |
|--------|------------|
| `@THEN TEXT` | Free text until `ENDTEXT` |
| `@THEN CREATEUNIT` | `unit=`, `owner=`, `veteran=`, `homecity=`, `locations`/`endlocations` |
| `@THEN MOVEUNIT` | `unit=`, `owner=`, `maprect`, `moveto`, `numbertomove=` |
| `@THEN CHANGEMONEY` | `receiver=`, `amount=` |
| `@THEN CHANGETERRAIN` | `terraintype=`, `maprect` |
| `@THEN MAKEAGGRESSION` | `who=`, `whom=` |
| `@THEN DESTROYACIVILIZATION` | `whom=` |
| `@THEN GIVETECHNOLOGY` | `receiver=`, `technology=` |
| `@THEN PLAYCDTRACK` | track number |
| `@THEN PLAYWAVEFILE` | filename |
| `@THEN JUSTONCE` | (fires only once, tracked via `HASTRIGGERED`) |
| `@THEN DONTPLAYWONDERS` | (suppresses wonder movies) |

Special entity references: `ANYBODY`, `ANYUNIT`, `TRIGGERATTACKER`, `TRIGGERDEFENDER`, `TRIGGERRECEIVER`.

### Cheat / Debug Menu

The cheat menu (activated in-game) provides extensive debugging capabilities:

| Command | Function |
|---------|----------|
| `PICKPLAYER` | Switch to control a different civilization |
| `REVEALMAP` | Reveal entire map |
| `MONEY` | Add gold |
| `CREATEUNIT` | Place a unit on the map |
| `KILLCIV` | Eliminate a civilization |
| `SETHUMAN` | Set a civ as human-controlled |
| `GAMEYEAR` | Change the current game year |
| `GAVETECH` / `TOOKTECH` / `EDITTECH` | Technology manipulation |
| `UNITEDIT` / `UNITHITPOINTS` / `EDITHOMECITY` | Unit property editing |
| `CITYEDIT` / `SETCITYSIZE` / `SETCITYSHIELDS` / `COPYCITY` | City property editing |
| `EDITKING` / `EDITKINGNAME` / `EDITTREATIES` | Civilization & diplomacy editing |
| `EDITATTITUDE` / `EDITBETRAY` / `EDITPROGRESS` | AI personality editing |
| `EDITRULES` / `EDITCOSMIC` | Rules & cosmic parameters editing |
| `EDITSCEN` / `EDITPARADIGM` / `EDITINCREMENT` / `EDITSTARTYEAR` / `EDITMAXTURNS` / `SCENNAME` | Scenario editing |
| `HIDDENTERRAIN` | Show hidden terrain types |
| `SUPPLYSEARCH` | Debug supply chain visualization |
| `LASTCONTACT` | Show last diplomatic contact info |
| `EDITVICTORY` / `EDITVICTORYOBJ` | Victory condition editing |

### Diplomacy AI System

The diplomacy system uses a rich set of dialog keys that reveal the AI's decision-making categories:

**Treaty States**: `ATWAR`, `CEASEFIRE`, `TREATY` (Peace), `ALLIANCE`

**AI Greeting Selection** (based on relationship): `HOWDY` / `HOWDYPEACE` / `HOWDYALLY`, `WELCOME` / `WELCOMEPEACE` / `WELCOMEALLY`, `DOODY` / `DOODYALLY` (hostile)

**Alliance Rejection Reasons** (AI evaluates these conditions): `ALLIANCENOBETRAY` (won't betray current ally), `ALLIANCENOWINNING` (player is winning), `ALLIANCENODISLIKE` (dislikes player), `ALLIANCENOSMALL` (player too small), `ALLIANCENOPATIENCE` (out of patience), `ALLIANCENOTHANKS` (general refusal)

**Senate/Government Override**: The game models democratic constraints with `SENATEPEACE`, `SENATECEASE`, `WALLFORCE` (Great Wall forces), `UNFORCE` (UN forces), `OVERRULE` (hawks override senate), `ALLOWUN`, `ALLOWAGGRESSOR`, `ALLOWHAWKS`

**Mercenary System**: AI can hire mercenaries (`CYBERCOP`, `MERCENARY`) and betray allies using them (`MERCBETRAYALLY`, `MERCBETRAY`, `MERCDECLARE`)

**Attitude Modifiers**: `ANNOY` / `ANNOYPEACE` / `ANNOYALLIED` / `ANNOYVASSAL` / `ANNOYCEASE`, `NOTORIOUS`, `SMALL`, `SYMPATHY`, `PATIENCE` / `PATIENCEALLY`, `FEEBLE` / `FEEBLEALLY`, `TAUNTALLY`

### Espionage System

Complete spy/diplomat action set: `ENEMYEMBASSY` (establish embassy), `ENEMYINVESTIGATE` (investigate city), `STEAL` / `STEALHARD` / `STEALSPECIFIC` (technology theft), `SABOTAGE` / `SABOTAGEHARD` / `SABOTAGESPECIFIC` / `SABOTAGEONE` / `SABOTAGETWO` (building/production sabotage), `WATERSUPPLY` (poison water), `PLANTEDNUKE` (plant nuclear device), `DISSIDENTS` / `DISSIDENTOPTIONS` / `NOREVOLT` (incite revolt), `CIVILWAR` (trigger civil war), `DESERT` / `DESERTED` (unit desertion via bribe), `BOND007` / `BONDGLORY` / `NAILED` (spy survival outcomes), `INCORRUPTIBLE` (target immune to bribery)

### Sound Effects (95 total)

Sound effects are loaded from `CIV2\SOUND\` (or `\SOUND\` relative to game dir) as `.WAV` files:

**Combat**: `AIRCOMBT`, `SWORDFGT`, `SWRDHORS`, `RIFLE`, `INFANTRY`, `MCHNGUNS`, `CAVALRY`, `CATAPULT`, `BIGGUN`, `MEDGUN`, `TANKMOTR`, `NAVBTTLE`, `SUBMRINE`, `TORPEDOS`, `BOATSINK`, `HELICPTR`, `HELISHOT`, `DIVEBOMB`, `DIVCRASH`, `JETCOMBT`, `JETPLANE`, `JETBOMB`, `JETCRASH`, `JETSPUTR`, `AIRPLANE`, `MISSILE`

**Explosions**: `SMALLEXP`, `MEDEXPL`, `LARGEXPL`, `NUKEXPLO`

**City/Building**: `BLDCITY`, `AQUEDUCT`, `BARRACKS`, `CATHEDRL`, `MRKTPLCE`, `NEWBANK`, `STKMARKT`, `NEWONDER`, `BLDSPCSH`

**Government/Events**: `NEWGOVT`, `REVOLT`, `CIVDISOR`, `CHEERS`, `CRWDBUGL`, `GUILLOTN`, `SPYSOUND`

**UI**: `MOVPIECE`, `ENDOTURN`, `MENUOK`, `MENULOOP`, `MENUEND`, `LETTER`

**Music Fanfares**: `FANFARE1`–`FANFARE8` (civilization-specific), `FEEDBK01`–`FEEDBK08` (feedback sounds)

**Engine/Misc**: `DIESEL`, `ENGNSPUT`, `FIRE---`, `ELEPHANT`

**Drum Rolls** (3 sets × 4 variants): `DRUMAL`/`DRUMAY`/`DRUMA0`/`DRUMAN`, `DRUMBL`/`DRUMBY`/`DRUMB0`/`DRUMBN`, `DRUMCL`/`DRUMCY`/`DRUMC0`/`DRUMCN`

**Custom/Extra**: `CUSTOM1`–`CUSTOM3`, `EXTRA1`–`EXTRA8`

### Supported File Formats

**Save/Load formats**:

| Extension | Type |
|-----------|------|
| `.sav` | Standard save game |
| `.scn` | Scenario file |
| `.hot` | Hotseat (local multiplayer) save |
| `.eml` | Play-by-Email save |
| `.net` | Network multiplayer save |
| `.ALT` | Alternative/backup save |

**Graphics** (game tries BMP first, falls back to GIF):
`TERRAIN1`, `TERRAIN2`, `UNITS`, `CITIES`, `ICONS`, `PEOPLE` (as `.BMP` or `.GIF`), `TITLE.GIF`, `EDITORPT.GIF`, `EDITORAS.GIF`, `EDITORSQ.GIF`, `EDITORSA.GIF`, `SCREDITS.GIF`

**Video** (AVI): `civ2\video\opening.avi`, `civ2\video\winwin.avi`, `civ2\video\launch.avi`, `civ2\video\wonder\*.avi`, `\loser.avi`

**Data files**: `RULES.TXT` (backed up as `RULES.BAK`), `CITY.TXT` (via `CITY.TMP`/`CITY.BAK`), `EVENTS.TXT` (backed up as `EVENTS.BAK`), `CITYPREF.TXT` (city build preferences), `INTER.DAT` (internationalization), `HALLFAME.DAT`, `CIV2.DAT`, `CIV.INI`, `chatlog.txt`, `chatmac1.txt`–`chatmac3.txt` (chat macros)

### SMEDS Engine — Graphics Port System

The SMEDS engine (`Port.cpp`) supports loading images from multiple formats, tried in this priority order:

1. **BMP** — Windows bitmap (uncompressed only, rejects `BI_RLE4`)
2. **GIF** — GIF87/89a (requires global color map, skips local color tables)
3. **PCX** — ZSoft PCX (256-color or 1-plane only)
4. **TGA** — Targa (uncompressed only — `"Targa Compression Not Implemented Yet."`)
5. **LBM/IFF** — Amiga ILBM/PBM format (FORM-based, for legacy compatibility)

Image validation enforces 640×480 at 256 colors for full-screen graphics.

### DirectDraw Integration

The game uses DirectDraw for hardware-accelerated rendering when available. Capabilities checked at startup:

- Hardware blitting support
- Color key (transparency) support
- Hardware color fills
- Bank switching detection (for VRAM-limited cards)
- 16-bit pixel format identification
- Monitor refresh frequency
- Surface locking for direct pixel access

The game creates primary + back buffer surfaces and an offscreen surface for compositing. The engine has a fallback software renderer for systems without DirectDraw.

### Game Constants (from assertion strings)

| Constant | Context | Notes |
|----------|---------|-------|
| `MAX_UNITS` | `id >= 0 && id < MAX_UNITS + 2` | Maximum units in game (+ 2 sentinel entries) |
| `MAX_NET_PLAYERS` | Socket bounds checking, queue indices | Maximum multiplayer players |
| `MAX_STACKED_DRAWS` | `gNetMgr.firstStackedDraw >= 0` | Draw operation stack depth |
| `MAX_MSGS_IN_QUEUE` | `head >= 400 && head < MAX_MSGS_IN_QUEUE` | Message queue capacity |
| `DIFF_ENGINE_MESSAGE_LENGTH` | `diffLength <= DIFF_ENGINE_MESSAGE_LENGTH` | Max state-diff payload size |
| Popup stack | `popupStackIndex > 0 && popupStackIndex < 17` | Max 16 nested popups |
| Parley description | `strlen(parleyDescription) < 2048` | Max diplomacy text length |

### Internal Terrain Names

| ID | Game Name | Internal Name |
|----|-----------|---------------|
| 0 | Desert | `DESERT` |
| 1 | Plains | `PLAINS` |
| 2 | Grassland | `GRASSLAND` |
| 3 | Forest | `FOREST` |
| 4 | Hills | `HILLS` |
| 5 | Mountains | `MOUNTAINS` |
| 6 | Tundra | `TUNDRA` |
| 7 | Glacier | **`ARCTIC`** (not "Glacier") |
| 8 | Swamp | `SWAMP` |
| 9 | Jungle | `JUNGLE` |
| 10 | Ocean | `OCEAN` |

### Goody Hut Outcomes

When a unit enters a minor tribe village (goody hut), the game selects from: `SURPRISETRIBE` (friendly tribe), `SURPRISENOMADS` (nomads join), `SURPRISESCROLLS` (ancient scrolls = tech), `SURPRISEMETALS` (precious metals = gold), `SURPRISENOTHING` (empty), `SURPRISEBARB` (barbarian ambush), `SURPRISEMERCS` (mercenary unit joins)

---

## Log Files

### smeds.log

Engine log. Key entries:

```
(    0) 5.4.0f Multiplayer 26-March-99       ← Game version
(    0) Patch 3                                ← Patch level
(    0) Bottom-up orientation recommended.     ← Graphics rendering hint
(    0) Not an IGZ Game!!  event = -3          ← Not a lobby-hosted game
(    5) load_gpk: Fixing up: game.enemies(6) inconsistent with game.active(247).
```

The last line reveals: `game.enemies = 6` (plus player = 7 total civs) and `game.active = 247` (possibly active units or game elements).

### XDaemon.log

Network library log:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
XD_LaunchedByLobby - retVal = XLOBBYERR_NOTLOBBIED
```

Confirms the game was launched standalone (not from the IGZ lobby).

---

## Key Findings & Gotchas

### 1. Territory = Visibility Bitmask, NOT City Proximity

The minimap territory display uses **byte[3] of the tile record** — a per-bit visibility mask indicating which civs have explored each tile. This is fundamentally different from a Voronoi/nearest-city approach. The highest set bit determines the tile's color on the minimap.

### 2. Civ Slot ≠ Owner ID

City records use an "owner" byte (offset +8) that does **not** correspond to the civ slot number in the tile visibility bitmask. The owner ID is a separate numbering system. Mapping between them requires cross-referencing city positions with the tile data.

### 3. Destroyed Cities Are Misleading

Cities with size = 0 remain in the save file at their original coordinates. Their "owner" byte reflects the last known controller, but these cities do **not** represent current territorial control. Some dummy records appear at position (0, 0) with garbage names.

### 4. The Map Wraps Horizontally

City X coordinates can exceed the map width. Apply modular arithmetic: `visual_column = (x // 2) % (map_width // 2)`. Wrapping must also be handled in distance calculations for any proximity-based analysis.

### 5. Tile Data Offset Varies

The tile data block does not sit at a fixed offset in the save file. It must be located by scanning for a contiguous run of 6-byte records where the terrain nibble is valid (0–10) and the terrain distribution is realistic (includes ocean, multiple terrain types).

### 6. Isometric Rendering Matters

Civ2 uses a diamond isometric grid. Rendering tiles as rectangles loses half the visual information and misrepresents the map geometry. Tiles must be rendered as diamonds with odd-row horizontal offsets to match the actual game display.

### 7. Autosave Naming

The autosave file is named `St_Auto.SAV` (not `AUTO.SAV` as some community docs suggest). It is written to the game installation directory each turn when "Autosave each turn" is enabled in game options.

---

## Sprite Sheet Mapping (TERRAIN1.GIF / TERRAIN2.GIF)

All Civ2 MGE graphics files are 640×480 paletted GIFs. Transparency is implemented via **palette indices**, not RGB color matching:

- **Palette index 255** = gray, used for the area **outside** the isometric diamond in all sprite cells. Must be made transparent when compositing. **WARNING**: The RGB value of index 255 varies between GIF files: TERRAIN1/TERRAIN2 use `(135,135,135)`, but UNITS.GIF uses `(135,83,135)` (purplish-gray). The Civ2-clone dynamically samples the bottom-right pixel `(639,479)` to detect this color at runtime.
- **Palette index 254** = (0,255,0) bright green — grid border lines separating sprite cells. Also used as flag/shield position markers in UNITS.GIF (see Layer 10).
- **Palette index 253** = (255,0,255) magenta — used for transparent areas **inside** the diamond on overlay sprites (TERRAIN2, roads, improvements). Also used for annotation text baked into base terrain variants (see warning below). Must be made transparent on overlay sprites; on base terrain sprites it indicates contaminated variants that should be avoided.
- **Palette indices 252** = (255,0,0) pure red — **light civ-color placeholder** in UNITS.GIF. Replaced at render time with the owning civilization's primary color.
- **Palette index 251** = (127,0,0) dark red — **dark civ-color placeholder** in UNITS.GIF. Replaced with a darker shade of the owning civilization's color.
- **Palette index 250** = (0,0,255) blue — flag/shield position marker embedded in UNITS.GIF cell borders. Not a transparency color.
- **Palette indices 236–249** = (0,255,255) cyan — transparent areas on city sprites (CITIES.GIF). In UNITS.GIF these indices are present but treated as fixed colors by the game engine.

> **IMPORTANT**: Do NOT use RGB color matching for transparency — use palette index comparison on the original paletted image data. Multiple palette indices map to the same RGB value, and the game's palette can be modded.

> **Browser/Canvas exception**: When rendering in a web browser using HTML5 Canvas, the browser's GIF decoder converts indexed palettes to RGBA, making palette indices inaccessible. In this case, use **fuzzy RGB color matching** (tolerance ±15 per channel) as a fallback. Per-GIF chroma key sets:
> - **TERRAIN1**: magenta `(255,0,255)` + cyan `(0,255,255)` + gray `(135,135,135)`
> - **TERRAIN2**: magenta `(255,0,255)` + gray `(135,135,135)` (gray is ~132,132,132 in TERRAIN2)
> - **CITIES.GIF**: magenta `(255,0,255)` + cyan `(0,255,255)` + gray `(135,135,135)`
> - **UNITS.GIF**: magenta `(255,0,255)` + purplish-gray `(135,83,135)` — do NOT include cyan (it's not a transparency color here); red placeholders `(255,0,0)` and `(127,0,0)` are kept for civ-color recoloring
>
> Also remove bright green grid line pixels (`R<100, G>200, B<100`) from overlay sprites to prevent 1px border artifacts. This RGB approach is imperfect (risk of false positives on near-chroma terrain pixels) but produces acceptable results for unmodded sprite sheets.

### TERRAIN1.GIF — Base Terrain Tiles

Grid: **65×33 pixel cells** (64×32 tile + 1px green border). Isometric diamond tiles.

| Row | Terrain ID | Type | Columns 0-4 | Right Side (cols 5+) |
|-----|-----------|------|-------------|---------------------|
| 0 | 0 | Desert | 5 variants | Oasis special resource |
| 1 | 1 | Plains | 5 variants | Buffalo/Wheat special |
| 2 | 2 | Grassland | 5 variants | Pheasant special |
| 3 | 3 | Forest (base filler) | 5 variants | Irrigation, Farmland overlays |
| 4 | 4 | Hills (base filler) | 5 variants | Mining overlay |
| 5 | 5 | Mountains (base filler) | 5 variants | Pollution overlay |
| 6 | 6 | Tundra | 5 variants | Grassland shield resource |
| 7 | 7 | Glacier/Arctic | 5 variants | Tundra specials |
| 8 | 8 | Swamp | 5 variants | Swamp special |
| 9 | 9 | Jungle | 5 variants | Jungle special |
| 10 | 10 | Ocean | 5 variants | Ocean fish/whale |
| 11 | — | Roads | **8 individual directional segments** (cols 1–8) + col 0 (all-directions debug reference). See direction table in Rendering Pipeline. | — |
| 12 | — | Railroads | **8 individual directional segments** (same layout as roads). Composited identically. | — |
| Bottom | — | Dither, Mouse cursor, Blank | — | — |

**WARNING: Artist annotation text** ("desert", "prairie", "Arctic", "Ocean" etc.) is baked into certain tile variants using palette index 253 (magenta). These pixels are INSIDE the diamond shape and cannot be masked by the diamond outline alone. Empirically verified clean variants (zero palette-253 pixels):

| Terrain | Clean Variants | Contaminated Variants |
|---------|---------------|----------------------|
| Desert (0) | 0, 1, 4 | 2, 3 |
| Plains (1) | 0, 1, 4 | 2, 3 |
| Grassland (2) | 0, 1, 4 | 2, 3 |
| Forest (3) | 0, 1, 4, 5, 6, 8 | 2, 3, 7 |
| Hills (4) | 0, 1, 4, 5, 6, 8 | 2, 3, 7 |
| Mountains (5) | 0, 1, 4, 5, 6 | 2, 3, 7, 8 |
| Tundra (6) | 0, 4 | 1, 2, 3, 8 |
| Glacier (7) | 0, 4 | 1, 2, 3, 8 |
| Swamp (8) | 0, 4 | 1, 2, 3 |
| Jungle (9) | 0, 1, 4, 8 | 2, 3 |
| Ocean (10) | 0, 1, 4 | 2, 3 |

**For safe rendering, use only variants from the "Clean" column.** Variant 0 is clean for all terrain types. Using contaminated variants will produce visible magenta text artifacts on the rendered map.

**Tile extraction formula**: For terrain type T, variant V (0-4): `x = V * 65 + 1`, `y = T * 33 + 1`, extract 64×32 pixels.

### TERRAIN2.GIF — Overlays, Rivers, Coastlines

Same 65×33 grid for main section (rows 0-10), smaller grids in bottom section.

| Row | Content | Notes |
|-----|---------|-------|
| 0-1 | **Coastline edge MASKS** | Contain ONLY palette index 254 (dark green, RGB 0,95,63) on magenta background. Row 0 = upper edge masks, Row 1 = lower edge masks. Index-254 pixels mark which diamond edges face land. Purpose unclear — the 4-quadrant coastline art sprites (y=429–479) produce correct results without these masks. May be used by the game engine for additional pixel-level blending. Text "tile connections" appears on piece 8 (col 8). |
| 2-3 | **River sprites** | 16 directional combos for 4-bit diagonal neighbor mask (bit0=NE, bit1=SE, bit2=SW, bit3=NW). Row 2 cols 0-7 = masks 0-7, Row 3 cols 0-7 = masks 8-15. Col 8 row 2 = "rivers" label text. Ocean neighbors count as connections in the mask. |
| 4-5 | **Forest overlays** | 8+ variants per row. Overlay on Forest base (TERRAIN1 row 3). |
| 6-7 | **Hills overlays** | 8+ variants. Overlay on Hills base (TERRAIN1 row 4). |
| 8-9 | **Mountain overlays** | 8+ variants. Overlay on Mountains base (TERRAIN1 row 5). |
| 10 | **River mouths** + color swatches | 4 river mouth sprites (cols 0-3): col 0=NE, 1=SE, 2=SW, 3=NW. Drawn on ocean tiles where diagonal neighbor is land+river. Remaining cols have terrain color reference squares. |
| Bottom (y≈364+) | **Coastline quadrant sprites + encoding diagrams** | y=364-410 (rows 11-12): Encoding DIAGRAMS with green zigzag lines and "w"/"l" labels showing 3-bit neighbor patterns per quadrant (reference only, NOT renderable art). **Coastline art sprites** on 33px column grid (16 columns = 8 groups × 2 cols each): y=429 = TOP quadrant pieces (piece 0), y=446 = BOTTOM quadrant pieces (piece 1), y=463 = LEFT quadrant pieces (piece 2, even cols) + RIGHT quadrant pieces (piece 3, odd cols). Each piece is 32×16 pixels. See Rendering Pipeline Layer 2 for full extraction and compositing algorithm. Also: River Mouths, color swatches, "new 25" grassland tile. |

**Overlay extraction**: Forest overlays use rows 4-5 (16 variants, cols 0-7 each row). Hills overlays use rows 8-9. Mountains overlays use rows 6-7. ✅ **CONFIRMED**: The 16 variants are indexed by a **4-bit diagonal neighbor connectivity bitmask** (NE=bit0, SE=bit1, SW=bit2, NW=bit3), where each bit is set when the diagonal neighbor is the **same terrain type**. This was confirmed by the [Civ2-clone](https://github.com/axx0/Civ2-clone) open source project and produces correct connected terrain edges. See detailed Rendering Pipeline Layer 4.

### CITIES.GIF — City Graphics

Grid: **65×49 pixel cells** (64×48 sprite + 1px green border). City sprites are taller than terrain tiles (48px vs 32px) to show buildings extending above the diamond base.

**Layout structure** (confirmed by green border analysis):

```
Left half:   4 style columns at x = 0, 65, 130, 195  (borders at x = 0, 65, 130, 195, 260)
Label column: x = 260–333 (contains era/size annotation text: "city sizes", "anc", "renai" etc.)
Right half:  4 style columns at x = 333, 398, 463, 528  (borders at x = 333, 398, 463, 528, 593)
```

Row borders (y): 38, 87, 136, 185, 234, 283, 332, 346, 395 — main rows are 49px each after a 38px header row.

**Style columns** (0–3 in each half): Represent different architectural traditions per civilization. The city style byte in the per-civ name blocks (Section 3) selects which column to use.

**Size/era progression**: Rows progress from smallest/ancient to largest/modern. The left half appears to contain earlier-era cities and the right half later-era cities. Exact size→row mapping requires further analysis, but approximate brackets: row 0 = size 1–3, row 1 = size 4–5, row 2 = size 6–8, row 3 = size 9+.

**Bottom section** (below y≈395): Contains wall overlays, special building sprites, civilization color swatches, and additional graphics.

**Rendering note**: City sprites extend 16px above the tile diamond. When compositing, paste at `(px, py - 16)` where `(px, py)` is the tile's top-left corner. Cities in higher rows may be partially occluded if drawn before the tiles in the row above them — render order must proceed top-to-bottom.

### UNITS.GIF — Unit Sprites

Grid: **65×49 pixel cells** (64×48 unit + 1px border). 9 columns × 7 rows = 63 unit slots (9 × 65 = 585px of sprite cells + 55px shield/flag template area = 640px). Unit type maps to position: `col = type % 9`, `row = type // 9`.

### Rendering Pipeline (Reverse-Engineered)

> ⚠️ **ALGORITHM STATUS**: The rendering algorithms below were reverse-engineered from sprite sheet analysis, save file data correlation, pattern matching, and cross-referencing with the [Civ2-clone](https://github.com/axx0/Civ2-clone) open source reimplementation. Algorithms marked ✅ **CONFIRMED** have been verified against the Civ2-clone source code and/or in-game screenshots. Remaining algorithms (especially base terrain variant selection) are well-informed best guesses. **Confirmed algorithms**: Coastline 4-quadrant system (Layer 2), rivers (Layer 3), terrain overlay neighbor-connectivity bitmask (Layer 4), resource placement (Layer 8), dither blending (Layer 1b).
>
> **RENDERER IMPLEMENTATION STATUS** (`canvas-test-1/renderer.js`): Layers 1–10 are all implemented. City sprites (Layer 9) use a fixed Medieval era — see Layer 9 note. Unit sprites (Layer 10) use per-civ cyan→color substitution — see Layer 10 note. Gray diamond-corner artifacts were fixed by adding palette index 255 gray (135,135,135) to the TERRAIN1 chroma key set alongside magenta and cyan.
>
> **RENDERING PHILOSOPHY**: All rendering in this project is intended to faithfully reproduce the original Civ2 MGE program. The **primary authoritative sources** are the Civ2 program files themselves: the GIF sprite sheets (TERRAIN1/2, CITIES, UNITS, ICONS, PEOPLE, CITY), the `civ2.exe` binary, and observation of the running game via screenshots. Third-party sources — including the [Civ2-clone](https://github.com/axx0/Civ2-clone) (axx0) C# reimplementation, the [FoxAhead UI Additions](https://github.com/FoxAhead/Civ2-UI-Additions) Delphi source, CivFanatics community documentation, and the Scenario League wiki — are used as **aids to decode and understand** the original program files. They are not treated as the template being copied. Where third-party sources disagree with observed Civ2 behavior (via screenshots or binary analysis), the original game takes precedence.

#### Overview: Compositing Order (Back to Front)

Each map tile is rendered as a layered composite. The correct draw order for a single tile:

```
1. Base terrain         (TERRAIN1.GIF, rows 0-10)
1b. Dither blend        (TERRAIN1.GIF, dither tile at y=447)           [between different land terrain types]
2. Coastline transitions (TERRAIN2.GIF, bottom section quadrant sprites) [ocean tiles only]
3. River overlay        (TERRAIN2.GIF, rows 2-3)                    [if byte[0] & 0x80]
4. Terrain overlay      (TERRAIN2.GIF, rows 4-9)                    [forest/hills/mountains only]
5. Road overlay         (TERRAIN1.GIF, row 11)                      [if byte[1] & 0x10]
6. Railroad overlay     (TERRAIN1.GIF, row 12)                      [if byte[1] & 0x20]
7. Improvement overlay  (TERRAIN1.GIF, right-side cols)              [irrigation/farmland/mining/pollution]
8. Resource icon        (TERRAIN1.GIF, cols 2-3 per terrain row)    [special resource, seed-based]
9. City sprite          (CITIES.GIF)                                 [if city present]
10. Unit sprite         (UNITS.GIF)                                  [if unit present]
```

#### Layer 1: Base Terrain Sprite Selection

**Sprite sheet**: TERRAIN1.GIF, 65×33 pixel grid (64×32 tile + 1px green border).

**Row selection**: `row = terrain_type` where terrain_type = `byte[0] & 0x0F` (0=Desert through 10=Ocean). Rows 0-10 map directly to terrain IDs.

**Variant (column) selection**: There are 9 visual variants per terrain type (columns 0-8). The variant is NOT stored in the save file — it is computed at render time from the tile's coordinates. The exact algorithm is unknown, but a position-based hash produces visually correct results:

```python
# BEST GUESS: Variant selection via position hash
# The game likely uses a simple hash to avoid visual repetition
variant = ((grid_x + grid_y) % 9)           # Simple approach
# OR possibly:
variant = ((grid_x * 13 + grid_y * 7) % 9)  # Better distribution
```

**Extraction formula**: For terrain type T, variant V:
```
sprite_x = V * 65 + 1     # Skip 1px left border
sprite_y = T * 33 + 1     # Skip 1px top border
# Extract 64×32 pixels from (sprite_x, sprite_y)
```

**Artist annotation warning**: Several variant cells contain baked-in text labels using palette index 253 (magenta). These are INSIDE the diamond and cannot be masked by corner removal alone. See the verified clean variant table in the TERRAIN1 section above. **For rendering, restrict to clean variants only** (variants 0 and 4 are clean for all terrain types). Using contaminated variants produces visible magenta text on the rendered map.

#### Layer 1b: Dither Blend Between Terrain Types

✅ **VERIFIED** — produces correct speckled blending at terrain boundaries.

**Purpose**: Smooths visual transitions between adjacent tiles of different land terrain types. Creates a speckled blend at tile edges where, for example, grassland meets desert, by punching sparse holes in the current tile through which the neighbor's terrain is visible.

**Dither mask source**: TERRAIN1.GIF bottom section — the dither tile is a 64×32 diamond at **y=447** (labeled "Dither" in the sprite sheet). This tile is NOT on the standard 33px grid — it lives in the non-standard bottom area of the sprite sheet. For rendering, only the bottom 16 rows (y=463–478) are needed; the top half is reconstructed by vertical flip (the diamond is vertically symmetric). The mask uses palette index 0 (black) for dither hole positions, palette index 253 (magenta) for non-hole diamond area, and palette index 255 (gray) for outside the diamond. Only the black pixels (index 0) are dither holes.

```python
# Extract dither mask (boolean array, True = dither hole)
# The dither tile sits at y=447 (32px tall). We need only the bottom 16 rows.
y_dither = 463   # = 447 + 16 (bottom half of the dither tile)
dither_mask = (t1_palette_indices[y_dither:y_dither+16, 1:65] == 0)  # 64×16 boolean
```

**Mask properties**:
- Shape: bottom half of a 64×32 diamond (16 rows, widest at row 0 = 64px, tapering to 2px at row 15)
- Density: ~14% of diamond area (78 out of 544 pixels) — sparse, not a 50% checkerboard
- Dither holes are concentrated near the **edges** of the diamond, not uniformly distributed
- The diamond is left-right symmetric in shape but NOT in dither hole placement
- TERRAIN1 row 14 col 2 contains the **full diamond mask** (solid black, no dither holes) for reference

**Algorithm**: For each land tile, check the 4 diagonal neighbors. If a neighbor has a different land terrain type (not ocean), draw that neighbor's terrain pixels through the dither mask, applied to the appropriate **quadrant** of the current tile. Each direction is restricted to a 32×16 pixel quadrant (not the full 64px-wide half), and the mask is flipped/mirrored for each direction:

```python
# Dither is applied AFTER base terrain, BEFORE coastline/rivers/overlays.
# For each land tile at (gx, gy):
for direction in ['NE', 'SE', 'SW', 'NW']:
    neighbor_terrain = get_terrain(*neighbors[direction])
    if neighbor_terrain != current_terrain and neighbor_terrain != ocean:
        neighbor_sprite = terrain_sprites[neighbor_terrain]

        if direction == 'NE':
            # Top-right quadrant (dx=32..63, dy=0..15), mask V-flipped
            for dy in range(16):
                for dx in range(32, 64):
                    if not in_diamond(dx, dy): continue
                    if dither_mask[15-dy, dx]:
                        canvas[py+dy, px+dx] = neighbor_sprite[dy, dx]

        elif direction == 'SE':
            # Bottom-right quadrant (dx=32..63, dy=16..31), mask as-is
            for dy in range(16):
                for dx in range(32, 64):
                    if not in_diamond(dx, 16+dy): continue
                    if dither_mask[dy, dx]:
                        canvas[py+16+dy, px+dx] = neighbor_sprite[16+dy, dx]

        elif direction == 'SW':
            # Bottom-left quadrant (dx=0..31, dy=16..31), mask H-flipped
            for dy in range(16):
                for dx in range(32):
                    if not in_diamond(dx, 16+dy): continue
                    if dither_mask[dy, 63-dx]:
                        canvas[py+16+dy, px+dx] = neighbor_sprite[16+dy, dx]

        elif direction == 'NW':
            # Top-left quadrant (dx=0..31, dy=0..15), mask H+V-flipped
            for dy in range(16):
                for dx in range(32):
                    if not in_diamond(dx, dy): continue
                    if dither_mask[15-dy, 63-dx]:
                        canvas[py+dy, px+dx] = neighbor_sprite[dy, dx]
```

**Direction → mask transformation**:

| Direction | Tile Quadrant | Mask Horizontal | Mask Vertical |
|-----------|---------------|----------------|---------------|
| NE | Top-right (dx=32..63, dy=0..15) | As-is | Flipped |
| SE | Bottom-right (dx=32..63, dy=16..31) | As-is | As-is |
| SW | Bottom-left (dx=0..31, dy=16..31) | Flipped | As-is |
| NW | Top-left (dx=0..31, dy=0..15) | Flipped | Flipped |

**⚠️ CORRECTION — Quadrant-based, NOT full-half**: An earlier version of this document described each direction as covering the full 64px-wide half of the tile (top or bottom). This was implemented and tested — it produces catastrophic over-dithering because when multiple directions are active simultaneously (e.g., NE and NW neighbors are both different terrain types), both directions' masks overlap across the full top half, producing 2–4× the intended hole density at the tile's horizontal midline. The quadrant-based approach (32px wide per direction) prevents this overlap by partitioning the tile into four non-overlapping zones. The horizontal flip on the mask is still critical because the dither hole pattern is NOT left-right symmetric — H-flip ensures holes are oriented toward the correct diamond edge within each quadrant.

**Rendering order**: Dither is composited directly onto the canvas after base terrain is drawn. It modifies pixels in-place by overwriting them with the neighbor's terrain color at dither hole positions. This must happen BEFORE coastlines, rivers, and other overlays so those layers draw on top of the blended terrain.

**Skipped for ocean tiles**: Dither is only applied between different land terrain types. Ocean tiles use the coastline quadrant system instead.

#### Layer 2: Coastline Transitions (Ocean Tiles Only)

**Applies to**: Ocean tiles (terrain_type == 10) adjacent to land tiles.

**✅ CONFIRMED ALGORITHM**: Coastline rendering uses a **4-quadrant system** with 32 small sub-tile sprites (8 groups × 4 pieces per group). Each ocean tile's diamond is divided into 4 quadrants (TOP, BOTTOM, LEFT, RIGHT), and each quadrant independently selects one of 8 art sprites based on the land/water status of 3 neighboring tiles. This was confirmed by matching against in-game screenshots and the encoding diagrams embedded in the sprite sheet.

##### Sprite Sheet Layout (TERRAIN2.GIF Bottom Section)

The coastline art sprites are arranged in 8 groups (0–7) of 4 pieces each, on a **33-pixel column grid** (32px sprite + 1px border). There are 16 columns total (groups 0–7, two columns per group):

```
Column layout:  g0    g0    g1    g1    g2    g2   ...   g7    g7
                col0  col1  col2  col3  col4  col5 ...  col14 col15
                even  odd   even  odd   even  odd  ...  even  odd
```

**Piece locations** (L-shaped arrangement per group):

| Piece | Quadrant | Y offset | Column within group | Extraction |
|-------|----------|----------|---------------------|------------|
| p0 | TOP | y=429 | Even col (2×group) | `x = (2*group)*33 + 1, y = 429` |
| p1 | BOTTOM | y=446 | Even col (2×group) | `x = (2*group)*33 + 1, y = 446` |
| p2 | LEFT | y=463 | Even col (2×group) | `x = (2*group)*33 + 1, y = 463` |
| p3 | RIGHT | y=463 | Odd col (2×group+1) | `x = (2*group+1)*33 + 1, y = 463` |

Each sprite is **32×16 pixels**. Use palette index 253 (magenta) and 255 (gray) as transparent. Also apply green chroma key (R<100, G>200, B<100) to remove any residual green border pixels.

##### Quadrant Placement

The four 32×16 quadrant sprites are composited onto the 64×32 tile diamond at these offsets (relative to tile top-left):

```
         ┌─────────────────────────────────────────────────────────────┐
         │                    TOP (32×16)                              │
         │              placed at (16, 0)                              │
         ├────────────────────────────┬────────────────────────────────┤
         │     LEFT (32×16)           │        RIGHT (32×16)           │
         │   placed at (0, 8)         │      placed at (32, 8)         │
         ├────────────────────────────┴────────────────────────────────┤
         │                   BOTTOM (32×16)                            │
         │              placed at (16, 16)                             │
         └─────────────────────────────────────────────────────────────┘
```

The four quadrants overlap in the center of the diamond, forming the complete coastline transition.

##### Neighbor Checking & Bit Ordering

Each quadrant checks 3 neighbors to form a 3-bit group index (0–7). The neighbors are read in **clockwise order** around the quadrant's edge of the diamond:

| Quadrant | Piece | bit 0 | bit 1 | bit 2 | Direction |
|----------|-------|-------|-------|-------|-----------|
| TOP | p0 | NW | N | NE | Clockwise along top edge |
| RIGHT | p3 | NE | E | SE | Clockwise along right edge |
| BOTTOM | p1 | SE | S | SW | Clockwise along bottom edge |
| LEFT | p2 | SW | W | NW | Clockwise along left edge |

**⚠️ CRITICAL**: The bit ordering follows a consistent clockwise pattern around the diamond perimeter: TOP reads left-to-right (NW→N→NE), RIGHT reads top-to-bottom (NE→E→SE), BOTTOM reads right-to-left (SE→S→SW), and LEFT reads bottom-to-top (SW→W→NW). Note that BOTTOM's order is **reversed** compared to what you might naively expect (it is NOT SW→S→SE).

Each bit is 1 if the neighbor is land, 0 if water/off-map.

##### Group Index Table

| Group | bit2 | bit1 | bit0 | Meaning |
|-------|------|------|------|---------|
| 0 | W | W | W | All 3 neighbors are water (open ocean) |
| 1 | W | W | L | Only first neighbor is land |
| 2 | W | L | W | Only middle neighbor is land |
| 3 | W | L | L | First + middle neighbors are land |
| 4 | L | W | W | Only third neighbor is land |
| 5 | L | W | L | First + third neighbors are land (channel) |
| 6 | L | L | W | Middle + third neighbors are land |
| 7 | L | L | L | All 3 neighbors are land (cove/inlet) |

##### Complete Algorithm

```python
def render_coastline(gx, gy, tile_position, canvas):
    """Render coastline for an ocean tile at grid position (gx, gy)."""
    neighbors = get_8_neighbors(gx, gy)  # dict of direction -> (nx, ny)
    L = {d: is_land(*neighbors[d]) for d in ['N','NE','E','SE','S','SW','W','NW']}
    
    # TOP quadrant (piece 0): clockwise along top edge
    top_group = (1 if L['NW'] else 0) | (2 if L['N'] else 0) | (4 if L['NE'] else 0)
    
    # RIGHT quadrant (piece 3): clockwise along right edge
    right_group = (1 if L['NE'] else 0) | (2 if L['E'] else 0) | (4 if L['SE'] else 0)
    
    # BOTTOM quadrant (piece 1): clockwise along bottom edge (REVERSED!)
    bot_group = (1 if L['SE'] else 0) | (2 if L['S'] else 0) | (4 if L['SW'] else 0)
    
    # LEFT quadrant (piece 2): clockwise along left edge
    left_group = (1 if L['SW'] else 0) | (2 if L['W'] else 0) | (4 if L['NW'] else 0)
    
    # Composite all 4 quadrants
    paste_with_transparency(coast_sprites[(top_group, 0)],   canvas, tile_position + (16, 0))
    paste_with_transparency(coast_sprites[(bot_group, 1)],   canvas, tile_position + (16, 16))
    paste_with_transparency(coast_sprites[(left_group, 2)],  canvas, tile_position + (0, 8))
    paste_with_transparency(coast_sprites[(right_group, 3)], canvas, tile_position + (32, 8))
```

##### Sprite Extraction Code

```python
from PIL import Image
import numpy as np

t2_p = Image.open('TERRAIN2.GIF')
t2_idx = np.array(t2_p)
t2_rgba = t2_p.convert('RGBA')

def extract_coast_sprite(group, piece):
    """Extract a 32x16 coastline quadrant sprite.
    group: 0-7, piece: 0=TOP, 1=BOTTOM, 2=LEFT, 3=RIGHT"""
    col = group * 2 + (1 if piece == 3 else 0)
    y = [429, 446, 463, 463][piece]
    x = col * 33 + 1  # skip 1px border
    
    sprite = t2_rgba.crop((x, y, x + 32, y + 16)).copy()
    idx_region = t2_idx[y:y+16, x:x+32]
    pixels = np.array(sprite)
    
    # Transparent: palette indices 253 (magenta) and 255 (gray)
    pixels[idx_region == 253] = [0, 0, 0, 0]
    pixels[idx_region == 255] = [0, 0, 0, 0]
    
    # Kill residual green border pixels
    green_mask = (pixels[:,:,1] > 200) & (pixels[:,:,0] < 100) & (pixels[:,:,2] < 100)
    pixels[green_mask & (pixels[:,:,3] > 0)] = [0, 0, 0, 0]
    
    return Image.fromarray(pixels)

# Pre-extract all 32 sprites: coast[(group, piece)]
coast = {}
for g in range(8):
    for p in range(4):
        coast[(g, p)] = extract_coast_sprite(g, p)
```

##### Worked Example: NE+E+SE All Land

For an ocean tile where neighbors NE, E, and SE are land and all others are water:

```
Neighbor map:           NW=W  N=W  NE=L
                        W=W   [O]  E=L
                        SW=W  S=W  SE=L

TOP:    NW=W, N=W, NE=L  → bits: 0,0,1 → bit2 set    → group 4, piece 0
RIGHT:  NE=L, E=L, SE=L  → bits: 1,1,1 → all bits set → group 7, piece 3
BOTTOM: SE=L, S=W, SW=W  → bits: 1,0,0 → bit0 set    → group 1, piece 1
LEFT:   SW=W, W=W, NW=W  → bits: 0,0,0 → no bits set → group 0, piece 2

Result: Shore art appears on the right side of the tile (facing the land).
```

##### Notes

- **All ocean tiles get coastline rendering**, even those surrounded entirely by water (group 0 sprites for all quadrants provide the base ocean appearance with wave textures).
- **E/W cardinal neighbors** do NOT need special handling. The quadrant system naturally incorporates E and W through the RIGHT and LEFT quadrant neighbor checks.
- The encoding diagrams at y=364-410 (rows 11-12) show the same "w"/"l" labeling system and are useful for verifying the bit ordering, but are NOT renderable art.
- **Rows 0-1** contain edge masks with palette index 254 that may be used by the game engine for additional pixel-level blending. The quadrant art sprites produce correct coastline results without these masks.

#### Layer 3: River Overlay

**Applies to**: Tiles where `byte[0] & 0x80` (bit 7 = river flag). ✅ **VERIFIED** — produces correct river rendering including coastal river mouths.

Rivers do NOT store directional data per tile. The river flag is binary (present/absent). The rendering direction is **computed at render time** by checking which diagonal neighbors also have rivers or are ocean.

##### River Sprites (Land Tiles)

**Sprite source**: TERRAIN2.GIF rows 2-3 (65×33 grid). Row 2 cols 0-7 = masks 0-7, Row 3 cols 0-7 = masks 8-15. Col 8 of row 2 contains the label text "rivers". Each sprite is 64×32 pixels with palette indices 253 (magenta) and 255 (gray) as transparent.

**River mask computation** (4-bit, diagonal neighbors only):

```python
river_mask = 0
if has_river(*nb['NE']) or is_ocean(*nb['NE']): river_mask |= 1  # bit 0 = NE
if has_river(*nb['SE']) or is_ocean(*nb['SE']): river_mask |= 2  # bit 1 = SE
if has_river(*nb['SW']) or is_ocean(*nb['SW']): river_mask |= 4  # bit 2 = SW
if has_river(*nb['NW']) or is_ocean(*nb['NW']): river_mask |= 8  # bit 3 = NW
```

⚠️ **CRITICAL**: Ocean neighbors count as river connections. Without this, rivers terminate abruptly at the coast instead of visually flowing into the sea. A river tile adjacent to ocean in the SE direction needs bit 1 set so the river sprite shows water flowing toward SE.

| Mask | Bits | Directions | Visual |
|------|------|------------|--------|
| 0 | 0000 | None | Isolated pond/lake |
| 1 | 0001 | NE | River segment toward NE |
| 2 | 0010 | SE | River segment toward SE |
| 3 | 0011 | NE+SE | River bending from NE to SE |
| 4 | 0100 | SW | River segment toward SW |
| 5 | 0101 | NE+SW | Straight river NE↔SW |
| 6 | 0110 | SE+SW | River bending from SE to SW |
| 7 | 0111 | NE+SE+SW | Three-way junction |
| 8 | 1000 | NW | River segment toward NW |
| 9 | 1001 | NE+NW | River bending from NE to NW |
| 10 | 1010 | SE+NW | Straight river NW↔SE (most common) |
| 11 | 1011 | NE+SE+NW | Three-way junction |
| 12 | 1100 | SW+NW | River bending from SW to NW |
| 13 | 1101 | NE+SW+NW | Three-way junction |
| 14 | 1110 | SE+SW+NW | Three-way junction |
| 15 | 1111 | All four | Four-way crossing |

**Sprite extraction**:
```python
river_row = 2 + (river_mask // 8)   # Row 2 for masks 0-7, Row 3 for masks 8-15
river_col = river_mask % 8           # Column 0-7
sprite_x = river_col * 65 + 1        # 65px grid (64px sprite + 1px border)
sprite_y = river_row * 33 + 1        # 33px grid (32px sprite + 1px border)
# Extract 64×32 sprite with transparency on palette indices 253, 255
```

##### River Mouth Sprites (Ocean Tiles)

**Sprite source**: TERRAIN2.GIF row 10 cols 0-3 (65×33 grid). Four 64×32 sprites, one per diagonal direction. These are overlay sprites drawn on **ocean tiles** where a diagonal neighbor has both land and a river, showing the river outlet flowing into the sea.

| Col | Direction | Meaning |
|-----|-----------|---------|
| 0 | NE | River mouth facing NE (land+river neighbor is to the NE) |
| 1 | SE | River mouth facing SE |
| 2 | SW | River mouth facing SW |
| 3 | NW | River mouth facing NW |

**River mouth logic**: For each ocean tile, check the 4 diagonal neighbors. If a diagonal neighbor is land AND has a river, draw the corresponding mouth sprite on the ocean tile:

```python
# On ocean tiles, after coastline rendering:
if terrain == ocean:
    nb = get_8_neighbors(gx, gy)
    for i, direction in enumerate(['NE', 'SE', 'SW', 'NW']):
        nx, ny = nb[direction]
        if is_land(nx, ny) and has_river(nx, ny):
            mouth_sprite = get_mouth_sprite(i)  # row 10, col i
            composite(mouth_sprite, tile_position)  # overlay on ocean tile
```

##### Complete River Rendering Algorithm

```python
def render_rivers(gx, gy, tile_position, canvas):
    terrain = get_terrain(gx, gy)
    nb = get_8_neighbors(gx, gy)
    
    # River mouths on OCEAN tiles
    if terrain == 10:  # ocean
        for i, d in enumerate(['NE', 'SE', 'SW', 'NW']):
            nx, ny = nb[d]
            if is_land(nx, ny) and has_river(nx, ny):
                paste_with_transparency(mouth_sprites[i], canvas, tile_position)
    
    # River sprites on LAND tiles with river flag
    if has_river(gx, gy):
        river_mask = 0
        if has_river(*nb['NE']) or is_ocean(*nb['NE']): river_mask |= 1
        if has_river(*nb['SE']) or is_ocean(*nb['SE']): river_mask |= 2
        if has_river(*nb['SW']) or is_ocean(*nb['SW']): river_mask |= 4
        if has_river(*nb['NW']) or is_ocean(*nb['NW']): river_mask |= 8
        paste_with_transparency(river_sprites[river_mask], canvas, tile_position)
```

**Compositing order**: River mouths are drawn on ocean tiles AFTER coastline sprites. River sprites on land tiles are drawn AFTER base terrain but before terrain overlays (forest/hills/mountains).

#### Layer 4: Terrain Overlays (Forest, Hills, Mountains)

✅ **CONFIRMED** — variant selection uses 4-bit neighbor connectivity bitmask, verified against [Civ2-clone](https://github.com/axx0/Civ2-clone) source code (`Draw.Terrain.cs`).

**Applies to**: Forest (terrain_type 3), Hills (terrain_type 4), and Mountains (terrain_type 5).

These terrain types use a TWO-LAYER approach:
- **Base filler**: TERRAIN1.GIF rows 3, 4, 5 (flat colored base matching terrain color)
- **Overlay art**: TERRAIN2.GIF rows 4-9 (tree/hill/mountain artwork with magenta transparency)

The overlay adds the visual detail (trees, rocky hills, mountain peaks) on top of the flat base.

**Overlay sprite mapping**:

| Terrain | TERRAIN2 Rows | Total Variants |
|---------|---------------|----------------|
| Forest  | 4-5 (cols 0-7 each) | 16 art sprites (col 8 = label "10") |
| Mountains | 6-7 (cols 0-7 each) | 16 art sprites (col 8 = label "9") |
| Hills | 8-9 (cols 0-7 each) | 16 art sprites (col 8 = label "12") |

**Variant selection — 4-bit neighbor connectivity bitmask**: The 16 overlay variants are NOT random visual variants — they encode which diagonal neighbors share the same terrain type. This produces proper connected terrain: forests show linked canopies, mountains form ridgelines, and hills blend into each other where adjacent.

The variant index is a 4-bit bitmask where each bit is set when the corresponding diagonal neighbor is the **same terrain type** as the current tile:

| Bit | Value | Direction | Meaning |
|-----|-------|-----------|---------|
| 0 | 1 | NE | NE diagonal neighbor is same terrain type |
| 1 | 2 | SE | SE diagonal neighbor is same terrain type |
| 2 | 4 | SW | SW diagonal neighbor is same terrain type |
| 3 | 8 | NW | NW diagonal neighbor is same terrain type |

```python
# CONFIRMED: Overlay variant = 4-bit diagonal neighbor connectivity bitmask
# Source: Civ2-clone Draw.Terrain.cs
def overlay_variant(gx, gy, terrain_type):
    nb = get_diagonal_neighbors(gx, gy)  # NE, SE, SW, NW
    idx = 0
    if get_terrain(*nb['NE']) == terrain_type: idx |= 1   # bit 0
    if get_terrain(*nb['SE']) == terrain_type: idx |= 2   # bit 1
    if get_terrain(*nb['SW']) == terrain_type: idx |= 4   # bit 2
    if get_terrain(*nb['NW']) == terrain_type: idx |= 8   # bit 3
    return idx  # 0-15

# Sprite extraction from the variant index:
overlay_row = base_row + (variant // 8)  # Which of the 2 rows
overlay_col = variant % 8                # Which column (0-7)
# Where base_row is: Forest=4, Mountains=6, Hills=8
```

**Examples**:
- An isolated forest tile (no forest neighbors): variant = 0 → row 4, col 0 (standalone tree cluster)
- A forest with forest neighbors to NE and SE: variant = 3 → row 4, col 3 (trees with right-side connections)
- A forest surrounded by forest in all diagonal directions: variant = 15 → row 5, col 7 (fully connected canopy)

> **⚠️ PREVIOUS ERROR**: Earlier versions of this document and the JavaScript renderer used a position-based hash (`(gx * 13 + gy * 7) % 16`) for variant selection. This produced random-looking, disconnected terrain overlays. The correct bitmask approach was confirmed by the Civ2-clone open source project.

The overlays use magenta chroma key and are drawn AFTER coastlines and rivers but BEFORE roads. Also apply green grid line removal (kill bright green pixels where R<100, G>200, B<100) to prevent 1px border artifacts.

#### Layer 5-6: Road and Railroad Overlays

**Applies to**: Roads if `byte[1] & 0x10`, Railroads if `byte[1] & 0x20`.

Roads and railroads use **individual directional segment sprites** that are composited together. Each sprite in TERRAIN1.GIF rows 11-12 represents a road/railroad segment extending from the tile center toward ONE of 8 neighbors.

**Sprite layout** (TERRAIN1.GIF):

| Column | Direction | Doubled-Coord Neighbor Offset |
|--------|-----------|-------------------------------|
| 0 | (All 8 directions — crossroads reference/debug) | — |
| 1 | NE | (x+1, y-1) |
| 2 | E  | (x+2, y+0) |
| 3 | SE | (x+1, y+1) |
| 4 | S  | (x+0, y+2) |
| 5 | SW | (x-1, y+1) |
| 6 | W  | (x-2, y+0) |
| 7 | NW | (x-1, y-1) |
| 8 | N  | (x+0, y-2) |

Row 11 = road segments, Row 12 = railroad segments (same directional layout).

**Rendering algorithm**:
```python
# For each tile with road/railroad:
for direction in [NE, E, SE, S, SW, W, NW, N]:   # cols 1-8
    neighbor = get_neighbor(tile, direction)
    if neighbor also has road (byte[1] & 0x10):
        composite(road_sprite[direction])          # TERRAIN1 row 11, col = direction
    if tile has railroad AND neighbor has railroad:
        composite(railroad_sprite[direction])      # TERRAIN1 row 12, col = direction
```

The road sprites have **magenta chroma key** in the non-road areas and are composited transparently over the base terrain. Multiple direction sprites are overlaid to create intersections, curves, and straight roads.

> **Note**: Column 0 in both rows shows all 8 directions drawn simultaneously. This is likely a debug/reference sprite and not used in normal rendering. The game composites individual direction sprites (cols 1-8) rather than using pre-combined intersection sprites.

> **RENDERER IMPLEMENTED**: Road and railroad rendering is implemented in `canvas-test-1/renderer.js` Pass 3. Extracts 8 directional road sprites from TERRAIN1 row 11 cols 1-8, and 8 railroad sprites from row 12 cols 1-8. Each segment draws only when the neighbor in that direction also has the matching improvement flag (`byte[1] & 0x10` for roads, `byte[1] & 0x20` for railroads). Uses TERRAIN1 chroma key (magenta + cyan + gray) with green grid line removal.

#### Layer 7: Improvement Overlays

**Sprite sources**: TERRAIN1.GIF right-side columns + CITIES.GIF bottom section.

| Improvement | Detected From | Sprite Location |
|-------------|---------------|-----------------|
| Irrigation | `byte[1] & 0x04` | TERRAIN1 row 3 col 7 |
| Farmland | `byte[1] & 0x04` AND `byte[1] & 0x08` | TERRAIN1 row 4 col 7 |
| Mining | `byte[1] & 0x08` (without irrigation) | TERRAIN1 row 5 col 7 |
| Pollution | `byte[1] & 0x80` | TERRAIN1 row 6 col 7 |
| Fortress | `byte[1] & 0x40` | CITIES.GIF bottom section (labeled "FORTRESS") |
| Airbase | `byte[1] & 0x40` + `byte[1] & 0x02` | CITIES.GIF bottom section (labeled "AIRBASE") |

> **Note**: Farmland = irrigation + mining flags both set. Airbase = fortress + city-present flags (0x40 + 0x02), though the exact detection logic for airbase vs fortress may differ. The CITIES.GIF bottom section labels for FORTRESS and AIRBASE were confirmed by visual inspection of the sprite sheet.
>
> **RENDERER IMPLEMENTED**: Improvement overlays are implemented in `canvas-test-1/renderer.js`. Irrigation/farmland/mining/pollution extracted from TERRAIN1 col 7 rows 3-6 (64×32, tile-sized) and rendered in Pass 3. Fortress/airbase extracted from CITIES.GIF y=423 (64×48, city-sized) and rendered in Pass 6 (after units, so fortress draws on top). Detection: farmland when both 0x04+0x08 set, irrigation when only 0x04, mining when only 0x08, pollution when 0x80 (independent overlay), airbase when 0x40+0x02, fortress when only 0x40. Fortress/airbase draw at py-16 (extends above tile like cities). Note: col 9 in TERRAIN1 contains text labels, not sprites.

#### Layer 8: Resource/Special Icons

✅ **VERIFIED** — resource placement formula confirmed with map seed from save file.

**Applies to**: Tiles where the seed-based position formula selects them for a resource, AND byte[0] bit 6 ("no resource") is NOT set.

##### Resource Placement Formula

Each terrain type has two special resources (Special 1 and Special 2). Resource placement is determined by the **map seed** (field 4 in the map header, offset +8 from map header start) and a repeating 4×4 grid pattern:

```python
seed = uint16_at(map_header_offset + 8)
s = seed % 64                        # Only 64 patterns exist (per Höfelt)
s1_x = s & 3                         # Special 1: grid x position (0-3)
s1_y = (s >> 2) & 3                  # Special 1: grid y position (0-3)
s2_x = (s1_x + 2) % 4               # Special 2: offset by +2 in x
s2_y = (s1_y + 2) % 4               # Special 2: offset by +2 in y

def get_resource(gx, gy):
    """Returns 0=no resource, 1=special 1, 2=special 2."""
    if tile_byte0[gx, gy] & 0x40:    # "no resource" flag suppresses display
        return 0
    if gx % 4 == s1_x and gy % 4 == s1_y:
        return 1                      # Special resource 1
    if gx % 4 == s2_x and gy % 4 == s2_y:
        return 2                      # Special resource 2
    return 0
```

This produces ~6.25% density per special type (~12.5% total), consistent with in-game observation.

##### Resource Sprite Source

**TERRAIN1.GIF**, columns 2 and 3 for each terrain row (0-10):
- **Col 2** = Special Resource 1 sprite (overlay with magenta transparency)
- **Col 3** = Special Resource 2 sprite (overlay with magenta transparency)

| Terrain | Row | Col 2 (Special 1) | Col 3 (Special 2) |
|---------|-----|-------------------|-------------------|
| Desert | 0 | Oasis | Desert Oil |
| Plains | 1 | Buffalo | Wheat |
| Grassland | 2 | Grassland Special | Grassland Special |
| Forest | 3 | Pheasant | Silk |
| Hills | 4 | Coal | Wine |
| Mountains | 5 | Gold | Iron |
| Tundra | 6 | Game | Furs |
| Glacier | 7 | Ivory | Glacier Oil |
| Swamp | 8 | Peat | Spice |
| Jungle | 9 | Gems | Fruit |
| Ocean | 10 | Fish | Whales |

**Extraction formula**:
```python
resource_x = special_col * 65 + 1   # special_col = 2 for special 1, 3 for special 2
resource_y = terrain_type * 33 + 1
# Extract 64×32 sprite, transparent on palette indices 253 AND 255
```

**Compositing**: Resource sprites are drawn AFTER rivers and terrain overlays but BEFORE cities/units. Transparency uses palette indices 253 (magenta) and 255 (gray).

> **Note on RULES.TXT**: The resource names and stats are defined in @TERRAIN section of RULES.TXT. The first 11 lines are base terrain definitions, followed by 22 lines of special resources (2 per terrain, in terrain order). The sprite sheet column 2/3 assignment matches this ordering.

#### Layer 9: City Sprites

**Sprite sheet**: CITIES.GIF, grid structure 65×49 pixels (64×48 sprite + 1px border).

CITIES.GIF has a complex layout with two halves separated by a label column. The header row contains the text "CIV 2000" (top-left), "Open" (left half label), "city" (center), and "Walled" (right half label).

```
Left half:   4 style columns at x = 1, 66, 131, 196  (within borders 0-260) — OPEN (unwalled)
Label column: x = 260-333 (contains era text labels, readable in sprite sheet)
Right half:  4 style columns at x = 334, 399, 464, 529  (within borders 333-593) — WALLED
```

Row borders (y): 38, 87, 136, 185, 234, 283, 332, 346, 395 (49px spacing after 38px header).

**Era rows** (confirmed from embedded green text labels in the center label column):

| Row | Y Start | Label Text (verbatim) | Interpretation |
|-----|---------|----------------------|----------------|
| 0 | 39 | "STONE/ BRONZE" | Stone Age / Bronze Age |
| 1 | 88 | "ANCIENT/ CLASSICAL" | Ancient / Classical era |
| 2 | 137 | "FAR EAST" | Far East architectural style (may be style-specific, not era) |
| 3 | 186 | "MEDIEVAL" | Medieval era |
| 4 | 235 | "EARLY INDUSTRIAL" | Early Industrial era |
| 5 | 284 | "MODERN" | Modern era |
| 6 | 333+ | "MODERN ALT..." | Alternative modern sprites |

**City style** (0–3): Determined by the civilization's city style byte stored in the per-civ name blocks (Section 3). The 4 columns represent different architectural traditions.

**City sprite selection formula**:
```python
# BEST GUESS: City sprite lookup
style = civ_city_style_byte          # 0-3 from per-civ name block
era_row = get_era_from_techs(civ)    # 0-6, determined by tech advancement
has_walls = city_has_improvement(CITY_WALLS)

if has_walls:
    sprite_x = 334 + style * 65      # Right half (walled)
else:
    sprite_x = 1 + style * 65        # Left half (open)

sprite_y = 39 + era_row * 49         # Era row
# Extract 64×48 pixels using magenta + cyan + gray chroma key
```

> **City sprite row selection** (implemented in renderer.js `_getCityRow()`):
> - **Epochs 0–1** (Ancient/Renaissance): Use civ's city style (rows 0–3: Bronze Age, Classical, Far East, Medieval)
> - **Epoch 2** (Industrial): All civs use row 4
> - **Epoch 3** (Modern): Styles 0–1 use row 5, styles 2–3 (Far East/Medieval) use row 6 (MODERN ALT)
>
> **Epoch determination** (`_getEpoch()`): Based on milestone tech combinations: Ancient=default, Renaissance=Invention(38)+Philosophy(60), Industrial=Industrialization(37), Modern=Automobile(5)+Electronics(24). Per-civ tech bitmask parsed from Section 3b of save file (offset 0x00A6, 12 bytes).
>
> City style (0–3) parsed from per-civ name blocks. City Walls detected via building bitmask at city record +52 (bit 8). CITIES.GIF is optional — renderer falls back to colored squares when not provided.

**Bottom section** (y ≈ 395+, confirmed from embedded labels):
- **FLAGS**: Per-civ flag/pennant sprites. 14×22 pixels each, 9 per row × 2 rows. Row 0 at y=425, row 1 at y=448 (23px row spacing). Horizontal: x = 1 + 15 × col, for col 0–8. 8 civ flags (slots 0–7) + 1 unused brown flag (slot 8) per row. Source: Civ2-clone `Rectangle(1 + 15*(i%9), 425 + 23*(i/9), 14, 22)`. Drawn on cities that contain units; position encoded via `FlagLoc` in the Civ2-clone. **TODO**: Determine exact rendering rules — when flags appear (all cities vs only garrisoned/occupied), exact position on city sprite, and whether row 0 vs row 1 represents light/dark variants or different states.
- **FORTIFY**: Fortification icon (tent/barricade sprite) drawn on units with fortify orders
- **FORTRESS**: Fortress improvement sprite (stone walls)
- **AIRBASE**: Airbase improvement sprite (two variants — one with runway, one with X marking)
- Two large detailed city sprites to the right (possibly capital or wonder variants)

#### Layer 10: Unit Sprites

**Sprite sheet**: UNITS.GIF, 65×49 pixel grid (64×48 unit sprite + 1px border), 9 columns × 7 rows.

**Sprite selection**:
```python
unit_type = unit_record[6]          # Byte +6 of unit record
col = unit_type % 9
row = unit_type // 9
sprite_x = col * 65 + 1
sprite_y = row * 49 + 1
# Extract 64×48 pixels
```

Like cities, unit sprites are 48 pixels tall and extend above the tile diamond. Units are drawn with **civilization color substitution**: palette index 252 = (255,0,0) pure red is the **light** civ-color placeholder, and palette index 251 = (127,0,0) dark red is the **dark** civ-color placeholder. At render time, both are replaced with the owning civilization's light and dark colors respectively.

**Important**: UNITS.GIF palette index 255 = (135,83,135) purplish-gray, which differs from TERRAIN1/TERRAIN2's (135,135,135) gray. Both must be made transparent but require different chroma key values.

> **RENDERER IMPLEMENTED** (`canvas-test-1/renderer.js`): Unit sprites are rendered from UNITS.GIF with per-civ color substitution. Template sprites are extracted once with magenta (255,0,255) + purplish-gray (135,83,135) chroma key. Civ-color placeholders — light red (255,0,0) idx 252 and dark red (127,0,0) idx 251 — are recolored per civ at runtime. Recolored sprites are cached by (unit_type, owner) pair. One unit drawn per tile; garrisoned units in cities are hidden. UNITS.GIF is optional.

#### Neighbor Lookup Reference

Many rendering layers require checking adjacent tiles. In the doubled-coordinate system (as stored in save files), the 8 neighbors are:

```
Direction | Offset (dx, dy) | Grid Offset (for linear index)
----------|-----------------|-------------------------------
NE        | (+1, -1)        | -map_width + (y%2==0 ? 0 : 1)
E         | (+2,  0)        | +1
SE        | (+1, +1)        | +map_width + (y%2==0 ? 0 : 1)
S         | ( 0, +2)        | +2*map_width
SW        | (-1, +1)        | +map_width + (y%2==0 ? -1 : 0)
W         | (-2,  0)        | -1
NW        | (-1, -1)        | -map_width + (y%2==0 ? -1 : 0)
N         | ( 0, -2)        | -2*map_width
```

**Concrete implementation** using grid coordinates (gx = column 0..mapWidth-1, gy = row 0..mapHeight-1):

```python
def get_8_neighbors(gx, gy, map_width):
    """Return dict of direction -> (neighbor_gx, neighbor_gy).
    
    In Civ2's staggered isometric grid, diagonal neighbors shift
    differently depending on whether the current row is even or odd.
    Cardinal N/S skip a row; E/W are simply ±1 column.
    Diagonal neighbors are ±1 row, with column offset depending on row parity.
    
    CRITICAL: Even rows shift diagonals LEFT, odd rows shift diagonals RIGHT.
    This is the most common source of rendering bugs.
    """
    wrap = lambda x: x % map_width  # horizontal wrapping (cylindrical world)
    
    if gy % 2 == 0:  # EVEN row
        return {
            'N':  (gx,         gy - 2),
            'NE': (wrap(gx),   gy - 1),   # same column on even rows
            'E':  (wrap(gx+1), gy),
            'SE': (wrap(gx),   gy + 1),   # same column on even rows
            'S':  (gx,         gy + 2),
            'SW': (wrap(gx-1), gy + 1),   # column - 1 on even rows
            'W':  (wrap(gx-1), gy),
            'NW': (wrap(gx-1), gy - 1),   # column - 1 on even rows
        }
    else:  # ODD row
        return {
            'N':  (gx,         gy - 2),
            'NE': (wrap(gx+1), gy - 1),   # column + 1 on odd rows
            'E':  (wrap(gx+1), gy),
            'SE': (wrap(gx+1), gy + 1),   # column + 1 on odd rows
            'S':  (gx,         gy + 2),
            'SW': (wrap(gx),   gy + 1),   # same column on odd rows
            'W':  (wrap(gx-1), gy),
            'NW': (wrap(gx),   gy - 1),   # same column on odd rows
        }
```

**Why the asymmetry**: In the isometric grid, odd rows are rendered shifted right by half a tile. This means the diagonal "NE" neighbor on an even row is directly above-right (same column), but on an odd row it's above-right (column + 1). The key rule: **on even rows, NE/SE use same column and NW/SW use column-1; on odd rows, NE/SE use column+1 and NW/SW use same column.**

**Boundary handling**: Y does NOT wrap — tiles above row 0 or below row (mapHeight-1) should be treated as ocean (terrain type 10). X wraps horizontally (cylindrical world) via modulo mapWidth.

### Isometric Coordinate → Pixel Position

For a tile at save-file linear index `i`, with `TPR = map_width2 / 2 = 40`:
- `row = i // TPR`, `col = i % TPR`
- `pixel_x = col * 64 + (32 if row % 2 else 0)` (half-tile horizontal offset for odd rows)
- `pixel_y = row * 16` (tile_height / 2, rows overlap)
- Image dimensions: `width = TPR * 64 + 32`, `height = (map_height - 1) * 16 + 32`

For city/unit isometric coordinates (cx, cy) to tile position: `col = (cx // 2) % TPR`, `row = cy`.

### ⚠️ Rendering Pitfall: Interleaved Records vs Byte Planes

The tile data in Block 2 is stored as **6-byte interleaved records** (one complete 6-byte record per tile, sequentially). Session 13 initially misread this block as 6 **separate byte planes** (all byte[0] values, then all byte[1] values, etc.), which produced a map with wildly wrong terrain distribution (e.g., 64% "desert" instead of 52% ocean). The correct reading is:

```python
# CORRECT: 6-byte interleaved records
for i in range(map_size):
    offset = block2_offset + i * 6
    byte0, byte1, byte2, byte3, byte4, byte5 = sav[offset:offset+6]

# WRONG: byte planes (DO NOT USE)
# byte0 = sav[block2_offset + i]  ← reads byte[1] of tile i-1 as byte[0] of tile i!
```

An earlier rendering session accidentally used offset `0x076dc` (30428) with a 22×63 grid and 6-byte records, which happened to start 452 records into the tile data block. The resulting map appeared plausible because it coincidentally showed recognizable geography, but it was reading the wrong portion of the data with incorrect dimensions. The **correct parameters** are: `block2_offset = 27716`, `TPR = 40`, `MAP_H = 50`, with 6-byte interleaved records.

---

## Complete Map Rendering Recipe (Python)

This is a self-contained, copy-paste-ready script that renders a Civ2 MGE save file map with base terrain, dither blending, coastlines, rivers, river mouths, terrain overlays (forest/mountain/hill with neighbor-connectivity), and special resources. It requires only `PIL/Pillow` and `numpy`, plus the game's `TERRAIN1.GIF`, `TERRAIN2.GIF`, and a `.SAV` file.

```python
import struct
from PIL import Image
import numpy as np

# ── Configuration ──
TERRAIN1_PATH = 'TERRAIN1.GIF'
TERRAIN2_PATH = 'TERRAIN2.GIF'
SAV_PATH = 'game.sav'
OUTPUT_PATH = 'civ2_map.png'
ZOOM = 2  # integer scale factor for output

# ── Sprite extraction helper ──
def extract(img_rgba, idx_arr, x, y, w, h, trans_indices, kill_green=False):
    """Extract a sprite with palette-index transparency and optional green chroma key."""
    aw, ah = min(w, img_rgba.width - x), min(h, img_rgba.height - y)
    if aw <= 0 or ah <= 0:
        return Image.new('RGBA', (w, h), (0, 0, 0, 0))
    spr = img_rgba.crop((x, y, x + aw, y + ah)).copy()
    ir = idx_arr[y:y+ah, x:x+aw]
    a = np.array(spr)
    for t in trans_indices:
        a[ir == t] = [0, 0, 0, 0]
    if kill_green:
        gm = (a[:,:,1] > 200) & (a[:,:,0] < 100) & (a[:,:,2] < 100) & (a[:,:,3] > 0)
        a[gm] = [0, 0, 0, 0]
    result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    result.paste(Image.fromarray(a), (0, 0))
    return result

# ── Load sprite sheets ──
t1_p = Image.open(TERRAIN1_PATH)
t2_p = Image.open(TERRAIN2_PATH)
t1_idx, t2_idx = np.array(t1_p), np.array(t2_p)
t1_rgba, t2_rgba = t1_p.convert('RGBA'), t2_p.convert('RGBA')
T_OVL = [253, 255]  # TERRAIN2 transparent palette indices

# ── Extract sprites ──
# Base terrain: TERRAIN1 rows 0-10, 65x33 grid (64x32 sprites + 1px border)
terrain = {tid: extract(t1_rgba, t1_idx, 1, tid*33+1, 64, 32, [255]) for tid in range(11)}

# Coastline: TERRAIN2, 8 groups × 4 quadrant pieces (each 32×16 px)
coast = {}
for g in range(8):
    coast[(g,0)] = extract(t2_rgba, t2_idx, g*2*33+1,     429, 32, 16, T_OVL, True)
    coast[(g,1)] = extract(t2_rgba, t2_idx, g*2*33+1,     446, 32, 16, T_OVL, True)
    coast[(g,2)] = extract(t2_rgba, t2_idx, g*2*33+1,     463, 32, 16, T_OVL, True)
    coast[(g,3)] = extract(t2_rgba, t2_idx, (g*2+1)*33+1, 463, 32, 16, T_OVL, True)

# Rivers: TERRAIN2 rows 2-3, 16 directional combos
rivers = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+2)*33+1, 64, 32, T_OVL) for i in range(16)]

# River mouths: TERRAIN2 row 10 cols 0-3 (NE, SE, SW, NW)
mouths = [extract(t2_rgba, t2_idx, col*65+1, 10*33+1, 64, 32, T_OVL, True) for col in range(4)]

# Terrain overlays: TERRAIN2 rows 4-9, 16 variants each (neighbor connectivity bitmask)
# kill_green=True to remove any green grid line bleed
forests   = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+4)*33+1, 64, 32, T_OVL, True) for i in range(16)]
mountains = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+6)*33+1, 64, 32, T_OVL, True) for i in range(16)]
hills     = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+8)*33+1, 64, 32, T_OVL, True) for i in range(16)]

# Resource sprites: TERRAIN1 col 2 = special 1, col 3 = special 2 per terrain row
resources = {}
for tid in range(11):
    resources[(tid, 1)] = extract(t1_rgba, t1_idx, 2*65+1, tid*33+1, 64, 32, [253, 255])
    resources[(tid, 2)] = extract(t1_rgba, t1_idx, 3*65+1, tid*33+1, 64, 32, [253, 255])

# Dither mask: bottom half of the 64×32 dither tile located at y=447 in TERRAIN1.GIF
# (The dither tile is NOT on the standard 33px grid — it sits at y=447-478 in the bottom section.)
# We extract only the bottom 16 rows (y=463-478) and flip vertically for the top half.
# Black pixels (palette index 0) = dither holes
y_dith = 463  # = 447 + 16 (bottom half of dither tile)
dither_mask = (t1_idx[y_dith:y_dith+16, 1:65] == 0)  # 64×16 boolean

# ── Parse save file ──
with open(SAV_PATH, 'rb') as f:
    sav = f.read()

MAP_HEADER = 13702  # Fixed offset for .SAV/.NET files (use 13432 for .SCN)
mw2 = struct.unpack_from('<H', sav, MAP_HEADER)[0]
mh  = struct.unpack_from('<H', sav, MAP_HEADER + 2)[0]
ms  = struct.unpack_from('<H', sav, MAP_HEADER + 4)[0]
mw  = mw2 // 2
assert mw * mh == ms, f"Map validation failed: {mw}×{mh} != {ms}"

block2 = MAP_HEADER + 14 + ms * 7
tiles = [sav[block2 + i*6 : block2 + i*6 + 6] for i in range(ms)]

# Resource seed (map header field 4, offset +8)
seed = struct.unpack_from('<H', sav, MAP_HEADER + 8)[0]
s = seed % 64
s1_x, s1_y = s & 3, (s >> 2) & 3
s2_x, s2_y = (s1_x + 2) % 4, (s1_y + 2) % 4

# ── Map data access ──
def get_terrain(gx, gy):
    if gy < 0 or gy >= mh: return 10
    return tiles[(gy * mw) + (gx % mw)][0] & 0x0F

def is_land(gx, gy):
    return get_terrain(gx, gy) != 10

def has_river(gx, gy):
    if gy < 0 or gy >= mh: return False
    return bool(tiles[(gy * mw) + (gx % mw)][0] & 0x80)

def get_resource(gx, gy):
    if gy < 0 or gy >= mh: return 0
    if tiles[(gy * mw) + (gx % mw)][0] & 0x40: return 0  # "no resource" flag
    if gx % 4 == s1_x and gy % 4 == s1_y: return 1
    if gx % 4 == s2_x and gy % 4 == s2_y: return 2
    return 0

def neighbors(gx, gy):
    w = lambda x: x % mw
    if gy % 2 == 0:
        return {'N':(gx,gy-2),  'NE':(w(gx),gy-1),   'E':(w(gx+1),gy), 'SE':(w(gx),gy+1),
                'S':(gx,gy+2),  'SW':(w(gx-1),gy+1),  'W':(w(gx-1),gy), 'NW':(w(gx-1),gy-1)}
    else:
        return {'N':(gx,gy-2),  'NE':(w(gx+1),gy-1),  'E':(w(gx+1),gy), 'SE':(w(gx+1),gy+1),
                'S':(gx,gy+2),  'SW':(w(gx),gy+1),    'W':(w(gx-1),gy), 'NW':(w(gx),gy-1)}

# ── Dither helper ──
def apply_dither(canvas_arr, px, py, neighbor_sprite, direction):
    na = np.array(neighbor_sprite)
    if direction == 'SE':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[dy, dx] and na[16+dy, dx, 3] > 0:
                    cy, cx = py+16+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[16+dy, dx]
    elif direction == 'SW':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[dy, 63-dx] and na[16+dy, dx, 3] > 0:
                    cy, cx = py+16+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[16+dy, dx]
    elif direction == 'NE':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[15-dy, dx] and na[dy, dx, 3] > 0:
                    cy, cx = py+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[dy, dx]
    elif direction == 'NW':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[15-dy, 63-dx] and na[dy, dx, 3] > 0:
                    cy, cx = py+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[dy, dx]

# ── Render ──
TW, TH = 64, 32
canvas_w = mw * TW + TW // 2
canvas_h = (mh - 1) * (TH // 2) + TH
canvas = Image.new('RGBA', (canvas_w, canvas_h), (20, 40, 80, 255))

COAST_OFFSET = {0: (16, 0), 1: (16, 16), 2: (0, 8), 3: (32, 8)}

# Pass 1: Base terrain
for gy in range(mh):
    for gx in range(mw):
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        canvas.paste(terrain[get_terrain(gx, gy)], (px, py), terrain[get_terrain(gx, gy)])

# Pass 2: Dither (directly modify canvas pixels)
canvas_arr = np.array(canvas)
for gy in range(mh):
    for gx in range(mw):
        ter = get_terrain(gx, gy)
        if ter == 10: continue
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        nb = neighbors(gx, gy)
        for d in ['NE', 'SE', 'SW', 'NW']:
            nter = get_terrain(*nb[d])
            if nter != ter and nter != 10:
                apply_dither(canvas_arr, px, py, terrain[nter], d)
canvas = Image.fromarray(canvas_arr)

# Pass 3: Coastline, river mouths, rivers, terrain overlays, resources
for gy in range(mh):
    for gx in range(mw):
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        ter = get_terrain(gx, gy)
        nb = neighbors(gx, gy)

        # Coastline + river mouths (ocean tiles only)
        if ter == 10:
            L = {d: is_land(*nb[d]) for d in nb}
            top_g   = (1 if L['NW'] else 0) | (2 if L['N']  else 0) | (4 if L['NE'] else 0)
            right_g = (1 if L['NE'] else 0) | (2 if L['E']  else 0) | (4 if L['SE'] else 0)
            bot_g   = (1 if L['SE'] else 0) | (2 if L['S']  else 0) | (4 if L['SW'] else 0)
            left_g  = (1 if L['SW'] else 0) | (2 if L['W']  else 0) | (4 if L['NW'] else 0)
            for piece, group in [(0,top_g), (1,bot_g), (2,left_g), (3,right_g)]:
                ox, oy = COAST_OFFSET[piece]
                canvas.paste(coast[(group, piece)], (px+ox, py+oy), coast[(group, piece)])
            for i, d in enumerate(['NE', 'SE', 'SW', 'NW']):
                nx, ny = nb[d]
                if is_land(nx, ny) and has_river(nx, ny):
                    canvas.paste(mouths[i], (px, py), mouths[i])

        # Rivers (land tiles, ocean neighbors count as connections)
        if has_river(gx, gy):
            is_oc = lambda x, y: get_terrain(x, y) == 10
            rm = (1 if has_river(*nb['NE']) or is_oc(*nb['NE']) else 0) | \
                 (2 if has_river(*nb['SE']) or is_oc(*nb['SE']) else 0) | \
                 (4 if has_river(*nb['SW']) or is_oc(*nb['SW']) else 0) | \
                 (8 if has_river(*nb['NW']) or is_oc(*nb['NW']) else 0)
            canvas.paste(rivers[rm], (px, py), rivers[rm])

        # Terrain overlays: forest/mountains/hills (4-bit neighbor connectivity bitmask)
        if ter in (3, 4, 5):
            ovi = 0
            if get_terrain(*nb['NE']) == ter: ovi |= 1
            if get_terrain(*nb['SE']) == ter: ovi |= 2
            if get_terrain(*nb['SW']) == ter: ovi |= 4
            if get_terrain(*nb['NW']) == ter: ovi |= 8
            overlay = {3: forests, 4: hills, 5: mountains}[ter]
            canvas.paste(overlay[ovi], (px, py), overlay[ovi])

        # Resources (seed-based placement)
        res = get_resource(gx, gy)
        if res > 0:
            canvas.paste(resources[(ter, res)], (px, py), resources[(ter, res)])

# Save
if ZOOM > 1:
    canvas = canvas.resize((canvas.width * ZOOM, canvas.height * ZOOM), Image.NEAREST)
canvas.convert('RGB').save(OUTPUT_PATH)
print(f"Saved {OUTPUT_PATH} ({canvas.width}×{canvas.height})")
```

This script produces a correct map rendering with verified coastlines, rivers, river mouths, dither terrain blending, terrain overlays (forest/mountain/hill with neighbor-connectivity bitmask), and seed-based resource placement. To use: set the four paths at the top and run.

---

## Rendering TODOs — Underspecified Visual Elements

Items below describe visual elements that are implied or partially described elsewhere in this document but lack sufficient rendering instructions for implementation. Each needs further research (game observation, Civ2-clone source, or reverse engineering) to determine the exact rendering rules.

##### Sprite Sheet Gaps
- [ ] **TERRAIN2 rows 0–1**: "Tile connection masks" — green line segments (palette index 254) on magenta diamonds. Purpose unclear. May be used by the game engine for sub-pixel coastline blending beyond the 4-quadrant system. Need to determine if these have any visible rendering purpose or are engine-internal only.
- [ ] **TERRAIN2 bottom section**: "Ocean wave textures" and "new 25 grassland variant" are mentioned but have no extraction coordinates, rendering conditions, or usage rules. Are wave textures drawn on ocean tiles? When is the "new 25" grassland variant used instead of the standard grassland sprites?
- [ ] **UNITS.GIF HPshield template**: At (597, 30, 12, 20), described as "unused in Civ2-clone." Determine what the game engine actually uses this sprite for — possibly an alternative HP display mode or a tooltip sprite.
- [ ] **CITIES.GIF large city sprites**: "Two large detailed city sprites to the right" in the bottom section (y ≈ 395+). No coordinates, dimensions, or rendering conditions. Possibly capital-city or wonder-city variants. Need to identify their exact position and when the game draws them.
- [ ] **CITIES.GIF airbase second variant**: The doc mentions "two variants — one with runway, one with X marking" but only one is extracted (x=273, y=423). Need coordinates for the second variant and the selection rule between them (e.g., airbase with planes present vs empty?).
- [x] **ICONS.GIF**: ~~CATALOGED~~. Full sprite map documented in "ICONS.GIF Sprite Layout" section above. Contains resource icons (14×14 and 10×10), improvement thumbnails (36×20, 5×8 grid at 343,1), wonder thumbnails (36×20, 4×7 grid at 343,106), advance category icons, battle animation frames (8×32×32 at y=356), and map grid sprites (64×32 at y=430). Only grid sprites are map-relevant; all other icons are city screen / advisor UI. Chroma: magenta idx 253 + light pink idx 255.
- [x] **Tiles.dll nuke sprite sheet**: ~~CATALOGED~~. Resource #85, 6×2 grid = 12 animation frames, 91×72px cells with 1px magenta borders. Grid area: 553×147px in upper-left of 640×480 image. Frame 0 at (1,1), frame 1 at (93,1), etc., stepping by 92px horizontally and 73px vertically. Sequence: flash → fireball → mushroom cloud → dissipation. Rendering trigger: nuclear missile attack on tile. Animation timing TBD.
- [x] **Tiles.dll government/diplomacy icons**: ~~CATALOGED~~. Resource #86, 66px grid spacing (64×64 cells + 2px magenta border). Row 0 (y=2): government icons dark/3D style (cols 0-6 = Anarchy through Democracy). Row 1 (y=68): same in gold/bright style. Row 2 (y=134): diplomacy status text labels (Cease Fire, Peace, War, Old Alliance, Modern Alliance). Row 3 (y=200): diplomacy icons 3D. Row 4 (y=266): diplomacy icons flat. Cyan chroma key for transparency.

##### City Sprite Selection
- [x] **Era/epoch tech thresholds**: ~~RESOLVED~~. City sprite era is determined by milestone tech combinations (not tech count): Ancient=default, Renaissance=Invention+Philosophy, Industrial=Industrialization, Modern=Automobile+Electronics. The `@CIVILIZE` epoch field (0–3) classifies individual techs by era but does not directly control city sprite selection. Tech IDs: Invention=38, Philosophy=60, Industrialization=37, Automobile=5, Electronics=24.
- [x] **City style per-civ assignment**: ~~RESOLVED~~. See "Civilization Style Assignments (`@LEADERS`)" table in the RULES.TXT Reference Data section. Distribution: Bronze Age (0) = 8 civs, Classical (1) = 4, Far East (2) = 3, Medieval (3) = 6.
- [ ] **MODERN ALT row (row 6)**: Described as "possibly used for specific city sizes or as an alternate for variety." When does the game select row 6 instead of row 5 (MODERN)? Is it a style-specific override? A size threshold? Random variety?
- [ ] **FAR EAST row (row 2)**: "May function as a style-specific variant rather than a chronological era." Determine whether this row is selected by era (like rows 0–5) or by city style (certain civs always use this row regardless of era).

##### Base Terrain Rendering
- [ ] **Variant selection algorithm**: The doc says "The exact algorithm is unknown" with a "BEST GUESS" hash formula. The renderer uses `(gx * 13 + gy * 7) % variants.length`. Need to reverse-engineer the actual game's terrain variant selection — the game may use a seed-based or pre-computed value stored in the map data (byte[5] high nibble?).
- [ ] **Dither mask asymmetry**: The doc notes "The diamond is left-right symmetric in shape but NOT in dither hole placement" and horizontal flip is critical, but doesn't document the exact asymmetry pattern. Would benefit from a pixel-level reference image showing which side has more/fewer transparent holes.

##### DLL-Based Screens (Non-Map Rendering)
- [ ] **cv.dll city view**: 16 GIFs total. Improvements (#300, 740×710, 42+ isometric building sprites), wonders (#305, 640×1130, 28+ wonder sprites), surroundings (#310, 640×680, forest/village growth tiles), landscape backgrounds (#340–353, 12 panoramas at 1280×480 each). Exact cell grids, building-ID-to-sprite mappings, and landscape selection rules still needed.
- [ ] **mk.dll diplomacy**: 56 GIFs + 21 CTABs. Leader portraits (#220–261, 42 at 227×277), meeting room backgrounds (#200–206, 7 at 640×480, one per government type), throne rooms (#10000–10002). CTABs (#1000–1020, 773 bytes each = 5-byte header + 256 RGB triples) for per-civ palette colorization. Civ-to-portrait-ID mapping, government-to-background mapping, and CTAB application rules still needed.
- [ ] **pv.dll palace view**: 55 GIFs. Base room (#100, 640×480), rock backgrounds (#105–108), 6 component sets (#110–143, groups of 4), decorative elements (#160–166), fine details (#170–184). All 642×482 (1px border). Positioning rules, tier-selection logic, and compositing order still needed.
- [ ] **ss.dll spaceship**: 46 GIFs. Build stages (#400–440, 24 frames at 640×480), structural components (#441–442, 695×110 strips), propulsion (#455–456, 905×104 strips), habitation (#470–471, 290×85), solar panels (#480–481, 411×78), fuel cells (#489–490, 550×120), earth-from-space (#499, 640×480), build animation (#20000–20007, 8 progressive stages). Component-count-to-view mapping and animation timing still needed.

## Community References

- **Allard Höfelt's Hex-Editing Guide** (hexedit.rtf, v1.8, April 2005): The original and most comprehensive community documentation. Written for Fantastic Worlds but applicable to all versions. Covers header toggle flags, tribes (7 × 242-byte name blocks), per-civ data (8 × 1,428-byte blocks including treasury, treaties, tech bitmask, unit counts), map data (all 6 tile bytes including body counter, visibility, ownership/fertility), units (all 26 fields), cities (all 84 fields), post-city data (city name counters, cursor position, passwords, kill history), and events (EVNT section with 298-byte records). Contributors: AGRICOLA, Captain Nemo, Paul "Kull" Cullivan, Carl "Gothmog" Fritz, Andrew Livings, Javier "yaroslav" Muñoz Kirschberg, Angelo Scotto, SlowThinker, Harlan Thompson, Xin Yu, Jorrit "Mercator" Vermeiren (editor since v1.7). Confirms MGE city = 88 bytes (vs FW 84 bytes), MGE unit = 32 bytes (vs FW 26 bytes). Available in tek10/civ2mod repository.
- **TE Kimball's civ2mod.c**: C program for modifying MGE save files. Provides definitive MGE-specific offset constants (`CITY_ITEM_NAME_OFFSET 32`, `CITY_ITEM_OWNER_OFFSET 8`, `CITY_ITEM_SIZE 88`, `UNIT_ITEM_SIZE 32`, `UNIT_OWNER_OFFSET 7`, `UNIT_TYPE_OFFSET 6`, `UNIT_HOMECITY_OFFSET 16`). Demonstrates complete file navigation from map header through units to cities. Key algorithms confirmed: tile coordinate→offset formula (`(y*mapWidth + x/2) * 6`), map ownership modification (high nibble of byte 5), visibility radius patterns (radius 0/1/2 tile offsets), horizontal wrapping with vertical clipping, unit home city as uint16 array index, and city finding via name string search. Source: https://github.com/tek10/civ2mod
- **Catfish's Cave** (FoxAhead's ToT format guide): https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm — Documents the save format for Test of Time (92-byte cities). Derived from Höfelt's guide with ToT-specific extensions. Useful cross-reference but requires offset conversion for MGE.
- **FoxAhead's Civ2Types.pas**: https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas — Pascal type definitions from the Civ2-UI-Additions project. The `TCiv` record provides authoritative field offsets for the per-civ data block, including treaty start (0x20), attitude array (0x40), and rate fields (0x13–0x14). Based on Catfish's Cave documentation with additions from runtime memory analysis.
- **Civ2-clone** (axx0): https://github.com/axx0/Civ2-clone — Open source C# reimplementation of Civilization II. The most authoritative source for sprite extraction coordinates and rendering algorithms. Key files: `Civ2GoldInterface.cs` (sprite sheet Rectangle coordinates), `Draw.Terrain.cs` (terrain overlay rendering with neighbor-connectivity bitmask). Confirmed the 4-bit diagonal neighbor bitmask for forest/mountain/hill overlay variant selection (NE=1, SE=2, SW=4, NW=8).
- **Scenario League Wiki — The Palette Explained**: https://sleague.civfanatics.com/index.php?title=The_Palette_Explained — Definitive documentation of the Civ2 256-color palette, including reserved indices (253=magenta transparent, 254=green grid, 255=gray transparent) and civ-color substitution indices (251=dark shade, 252=light shade).
- **Apolyton Forums** and **CivFanatics** — Community hex editing threads provided clues for city record structure and map data locations.
- Note: Community documentation is often for original Civ2, Fantastic Worlds, or Test of Time. MGE uses the same layout as FW but with 4 extra bytes per city (88 vs 84) and 6 extra bytes per unit (32 vs 26). **SCN files use the FW record sizes** (26-byte units, 84-byte cities).

---

## SCN vs SAV Structural Differences

`.SCN` files are the original scenario data as authored in the scenario editor, before being loaded into the game engine. When a player opens a `.SCN` and saves it, the resulting `.SAV` file has a different internal structure. The differences are systematic and consistent:

| Feature | SCN | SAV / NET / HOT / EML |
|---------|-----|----------------------|
| Game state preamble size | 316 bytes | 330 bytes (+14) |
| Per-civ name blocks start | 0x014A | 0x0158 |
| Per-civ data block size | 1,396 bytes | 1,428 bytes (+32 each) |
| Map header offset | **13432** (0x3478) | **13702** (0x3586) |
| Unit record size | **26 bytes** | **32 bytes** (+6: unit ID + padding) |
| City record size | **84 bytes** | **88 bytes** (+4: city ID + padding) |
| Unit sequence ID field | Not present | +26: uint16 LE (unique ID) |
| City sequence ID field | Not present | +84: uint16 LE (unique ID) |
| Tail size | 1,907 bytes | 1,807 (standard) / 1,907 (scenario) / 2,979 (NET) |

**Total offset shift**: 14 (preamble) + 8 × 32 (per-civ) = **270 bytes**. This is the constant difference between SCN and SAV map header offsets: 13702 − 13432 = 270.

**Detection**: Check `header[0x0D] & 0x01` for the scenario flag. Additionally, SCN files can be distinguished from scenario SAV files by checking whether the per-civ name blocks start at 0x0148 (SCN) vs 0x0156 (SAV). In practice, the file extension is the most reliable indicator.

**Parsing strategy**: To write a universal parser, determine the file type first, then set record sizes and offsets accordingly:

```python
if is_scn_file:
    MAP_HEADER_OFFSET = 13432
    UNIT_RECORD_SIZE  = 26
    CITY_RECORD_SIZE  = 84
else:
    MAP_HEADER_OFFSET = 13702
    UNIT_RECORD_SIZE  = 32
    CITY_RECORD_SIZE  = 88
```

---

## Map Template File Format (.MP)

`.MP` files are pre-built map templates used by the scenario editor and "Load Map" option. They do **NOT** use the `CIVILIZE` header. The format is simple and self-contained:

### Structure

```
┌──────────────────────────────────────┐
│ Map Header (14 bytes)                │  offset 0
├──────────────────────────────────────┤
│ Starting Positions (84 bytes)        │  offset 14
│   21 civs × 4 bytes (x, y uint16)   │
├──────────────────────────────────────┤
│ Tile Data (map_size × 6 bytes)       │  offset 98
│   6-byte interleaved records         │
└──────────────────────────────────────┘
```

Total file size: `98 + map_size × 6` bytes.

### Map Header (14 bytes, offset 0)

Identical structure to the SAV map header:

| Offset | Size | Field | Example (Small World) |
|--------|------|-------|----------------------|
| 0 | 2 bytes | `map_width2` (uint16 LE) | 80 |
| 2 | 2 bytes | `map_height` (uint16 LE) | 50 |
| 4 | 2 bytes | `map_size` (uint16 LE) | 2000 |
| 6 | 2 bytes | `map_shape` (uint16 LE) | 0=wrapping, 1=flat |
| 8 | 2 bytes | Unknown | |
| 10 | 2 bytes | `quarter_width` (uint16 LE) | 20 |
| 12 | 2 bytes | `quarter_height` (uint16 LE) | 13 |

**Validation**: `map_size` must equal `(map_width2 / 2) × map_height`.

### Starting Positions (84 bytes, offset 14)

21 entries of 4 bytes each — one per civilization in `LEADERS.TXT` order (index 0 = Romans, 1 = Babylonians, ..., 20 = Sioux):

| Offset | Size | Field |
|--------|------|-------|
| 14 + civ×4 | 2 bytes | Starting X (uint16 LE) |
| 14 + civ×4 + 2 | 2 bytes | Starting Y (uint16 LE) |

A value of `0xFFFF` for either coordinate means the civilization has no preset starting location on this map (random placement or unused).

### Tile Data (offset 98, 6 bytes per tile)

Each tile is stored as a 6-byte interleaved record, in the same row-major order as SAV Block 2. The format is similar to but not identical to SAV terrain data:

| Byte | Field | Notes |
|------|-------|-------|
| 0 | Terrain + flags | Low nibble = terrain type (0-10). Bit 7 = special resource. Same encoding as SAV Block 2 byte[0]. |
| 1 | Rivers | Bit 1 (0x02) = river. Same encoding as SAV Block 2 byte[1]. Usually 0x00. |
| 2 | Reserved | Always 0x00 in base maps. |
| 3 | Body ID | Always 0x00 in base maps (assigned at game generation). |
| 4 | Terrain copy | Near-duplicate of byte 0. Possibly used for validation or undo. |
| 5 | Status byte | Usually 0xF0 (240). Occasionally 0xF8, 0x10, or 0x18. Bit meanings not fully decoded. |

**Key differences from SAV Block 2**: MP files lack per-civ visibility data (SAV byte[4]), ownership information, and city radius markings. The tile data represents raw geography only.

---

## RULES.TXT — Game Rules Definition

`RULES.TXT` defines the core game rules and is parsed by the game engine at startup. Scenarios can override it with a local copy. The file uses semicolons (`;`) for comments and `@SECTION` markers for each data block.

### Sections

| Section | Content | Records |
|---------|---------|---------|
| `@COSMIC` | Global game constants | 21 numeric values (road multiplier, food per citizen, tech paradigm, etc.) |
| `@CIVILIZE` | Technology definitions | 93 entries (89 standard + Future Tech + 3 user-defined + 7 extra slots) |
| `@IMPROVE` | City improvements & wonders | 67 entries (improvements 0-38, wonders 39-66) |
| `@ENDWONDER` | Wonder expiration advances | 28 entries (one per wonder) |
| `@UNITS` | Unit type definitions | 62 entries (52 standard + 11 user-defined slots) |
| `@TERRAIN` | Terrain properties | 11 base types + 11 special resource variants |
| `@GOVERNMENTS` | Government types | 7 entries (Anarchy through Democracy) |
| `@LEADERS` | Civilization definitions | 21 entries + 2 extra slots |
| `@CARAVAN` | Trade commodities | 16 entries |
| `@ORDERS` | Unit order names | 11 entries with keyboard shortcuts |
| `@DIFFICULTY` | Difficulty level names | 6 entries (Chieftain through Deity) |
| `@ATTITUDES` | Diplomatic attitude names | 9 entries (Worshipful through Enraged) |

### Unit Definition Format (`@UNITS`)

Each line: `Name, obsolete_tech, domain, move, range, attack, defense, hp, firepower, cost, hold, role, prereq, flags`

- **Domain**: 0=Ground, 1=Air, 2=Sea
- **Role**: 0=Attack, 1=Defend, 2=Naval, 3=Air Superiority, 4=Sea Transport, 5=Settle, 6=Diplomacy, 7=Trade
- **Flags**: 15-bit binary string encoding special abilities (two-space visibility, ignore ZOC, amphibious, submarine, etc.)

Unit type IDs in save files (byte +6 of unit records) correspond directly to the 0-indexed line number in `@UNITS`.

### Civilization Style Assignments (`@LEADERS`)

Each civilization in LEADERS.TXT / RULES.TXT `@LEADERS` has a **city style** (0–3) determining which column of CITIES.GIF to use for city sprites. Colors cycle among the 7 civ slots (civs with the same color number share a palette).

| Slot | Civ | Color | City Style | Style Name |
|------|-----|-------|------------|------------|
| 0 | Romans | 1 (White) | 1 | Classical |
| 1 | Babylonians | 2 (Green) | 0 | Bronze Age |
| 2 | Germans | 3 (Blue) | 3 | Medieval |
| 3 | Egyptians | 4 (Yellow) | 0 | Bronze Age |
| 4 | Americans | 5 (Cyan) | 1 | Classical |
| 5 | Greeks | 6 (Orange) | 1 | Classical |
| 6 | Indians | 7 (Purple) | 2 | Far East |
| 7 | Russians | 1 (White) | 3 | Medieval |
| 8 | Zulus | 2 (Green) | 0 | Bronze Age |
| 9 | French | 3 (Blue) | 3 | Medieval |
| 10 | Aztecs | 4 (Yellow) | 0 | Bronze Age |
| 11 | Chinese | 5 (Cyan) | 2 | Far East |
| 12 | English | 6 (Orange) | 3 | Medieval |
| 13 | Mongols | 7 (Purple) | 0 | Bronze Age |
| 14 | Celts | 1 (White) | 0 | Bronze Age |
| 15 | Japanese | 2 (Green) | 2 | Far East |
| 16 | Vikings | 3 (Blue) | 3 | Medieval |
| 17 | Spanish | 4 (Yellow) | 3 | Medieval |
| 18 | Persians | 5 (Cyan) | 0 | Bronze Age |
| 19 | Carthaginians | 6 (Orange) | 1 | Classical |
| 20 | Sioux | 7 (Purple) | 0 | Bronze Age |

**Style distribution**: Bronze Age (0) = 8 civs, Classical (1) = 4 civs, Far East (2) = 3 civs, Medieval (3) = 6 civs.

### Special Resource Names (`@TERRAIN`)

Each of the 11 base terrain types has 2 special resource variants, placed by the map seed algorithm:

| Terrain | Resource 1 | Resource 2 |
|---------|-----------|-----------|
| Desert | Oasis | Desert Oil |
| Plains | Buffalo | Wheat |
| Grassland | Grassland Shield | Grassland Shield |
| Forest | Pheasant | Silk |
| Hills | Coal | Wine |
| Mountains | Gold | Iron |
| Tundra | Game | Furs |
| Glacier | Ivory | Glacier Oil |
| Swamp | Peat | Spice |
| Jungle | Gems | Fruit |
| Ocean | Fish | Whales |

### Attitude Names (`@ATTITUDES`)

| Value | Attitude |
|-------|----------|
| 0 | Worshipful |
| 1 | Enthusiastic |
| 2 | Cordial |
| 3 | Receptive |
| 4 | Neutral |
| 5 | Uncooperative |
| 6 | Icy |
| 7 | Hostile |
| 8 | Enraged |

### Trade Commodities (`@CARAVAN`)

| ID | Commodity |
|----|-----------|
| 0 | Hides | 1 | Wool | 2 | Beads | 3 | Cloth |
| 4 | Salt | 5 | Coal | 6 | Copper | 7 | Dye |
| 8 | Wine | 9 | Silk | 10 | Silver | 11 | Spice |
| 12 | Gems | 13 | Gold | 14 | Oil | 15 | Uranium |

### Technology Definition Format (`@CIVILIZE`)

Each line: `Name, AI_value, civilize_modifier, prereq1, prereq2, epoch, category`

- **Epoch**: 0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern
- **Category**: 0=Military, 1=Economic, 2=Social, 3=Academic, 4=Applied
- **Prerequisites**: 3-letter abbreviation of another tech, or `nil`/`no` for none

Technology IDs in save files (byte arrays at 0x0042 and 0x00A6) correspond to 0-indexed line numbers in `@CIVILIZE`.

### Improvement/Wonder Definition Format (`@IMPROVE`)

Each line: `Name, cost_x10, upkeep, prerequisite_tech`

- IDs 0-38 are city improvements/special (Nothing=0, Palace=1, Barracks=2, ..., Offshore Platform=31, Airport=32, Police Station=33, Port Facility=34, SS Structural=35, SS Component=36, SS Module=37, Capitalization=38)
- IDs 39-66 are Wonders of the World (28 wonders, matching wonderCityIds[0-27] order)
- The building bitmask in city records (+52-55) uses 1-indexed bits matching these IDs

### Terrain Definition Format (`@TERRAIN`)

Each line: `Name, move_cost, defense, food, shields, trade, irrigate_type, irrigate_bonus, irrigate_turns, ai_irrigate, mine_type, mine_bonus, mine_turns, ai_mine, transform_to`

Terrain type IDs in save file tile data (byte[0] & 0x0F) correspond to 0-indexed line numbers: 0=Desert, 1=Plains, 2=Grassland, 3=Forest, 4=Hills, 5=Mountains, 6=Tundra, 7=Glacier, 8=Swamp, 9=Jungle, 10=Ocean.

Lines 11-21 define **special resource** variants for each terrain type (Oasis for Desert, Buffalo for Plains, etc.), which appear when byte[0] bit 7 is set.

---

## DLL Embedded Resource Catalog

All Civ2 MGE DLLs use a custom PE resource type `GIFS` (language 1033, English US) to embed GIF images. Total: **243 GIF resources** across 8 DLLs. Resource extraction tested with Python `pefile` module; all GIFs saved to `/tmp/civ2_dll_gifs/`. Cross-referenced against [Civ2-clone](https://github.com/axx0/Civ2-clone) `Civ2GoldInterface.cs` where applicable.

| DLL | Size | GIFs | Other | Content |
|-----|------|------|-------|---------|
| Tiles.dll | 1,417 KB | 24 | — | Advisor backgrounds, event illustrations, nuke sprites, govt/diplo icons |
| cv.dll | 4,980 KB | 16 | — | City View: improvement sprites, wonder sprites, landscape backgrounds |
| mk.dll | 3,166 KB | 56 | 21 CTAB | Diplomacy: leader portraits (42), throne room backgrounds, color tables |
| pv.dll | 1,999 KB | 55 | — | Palace View: room backgrounds, building components |
| ss.dll | 1,456 KB | 46 | — | Spaceship: component sprites, build stages, space backgrounds |
| Intro.dll | 1,151 KB | 13 | — | Intro cutscene frames (geographic scenes) |
| Wonder.dll | 186 KB | 28 | — | Wonder movie thumbnails (74×74 each) |
| Civ2Art.dll | 257 KB | 5 | — | Credits, starfield backgrounds, UI panels |

### Tiles.dll — Map-Relevant Resources

**GIFS/85 — Nuke Explosion** (21,611 bytes, 640×480): 6×2 grid = 12 animation frames, 91×72px cells, 1px magenta borders. Grid area 553×147px. Frame coordinates: (col×92+1, row×73+1). Sequence: flash → fireball → mushroom cloud → dissipation.

**GIFS/86 — Government & Diplomacy Icons** (41,213 bytes, 640×480): 66px grid (64×64 cells + 2px magenta border), cyan transparency fill. Row 0: govt icons dark 3D (Anarchy=col 0 through Democracy=col 6). Row 1: govt icons gold/bright. Row 2: diplomacy labels (Cease Fire, Peace, War, Old Alliance, Modern Alliance). Rows 3-4: diplomacy icons (3D shaded / outlined).

**GIFS/50–59** — Advisor backgrounds (640×480): City Report (#50, Jerusalem), Defense Minister (#51, cavalry), Attitude Advisor (#52, Byzantine), Trade Advisor (#53, classical figure), Science Advisor (#54, freight cart), #55 (seated figure with globe), #56 (Stonehenge), #57 (celebration fireworks), #58 (Egyptian painting), #59 (Greek column).

**GIFS/70–77** — Event illustrations (variable sizes): City capture ancient (#70, 270×189), city capture modern (#71, 145×257), revolution (#72, 261×194), democracy protest (#73, 230×198), medieval/Islamic (#74, 277×148), victory parade (#75, 178×262), city founded ancient (#76, 290×176), city founded modern (#77, 197×294).

### mk.dll — Leader Portraits

42 portraits at 227×277px (GIFS/220–261). 21 CTAB palette resources (GIFS/1000–1020, 773 bytes each: 5-byte header + 256 RGB triples) for per-civ palette colorization. 7 meeting room backgrounds (GIFS/200–206, 640×480) for government-specific diplomacy scenes.

### Wonder.dll — Thumbnails

28 wonder thumbnails at 74×74px (GIFS/20000–20027), 1,607 bytes each. One per wonder in standard build order (Pyramids → Marco Polo's Embassy).

---

## Events Section (Scenario Files)

Scenario files (`.SCN` and scenario `.SAV`) can contain an embedded events section at the very end of the file, after all other data. This replaces the external `events.txt` file. The section is optional — if absent, the file simply ends after the tail data.

### Events Structure

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 4 bytes | **Magic signature** | `"EVNT"` (ASCII). Easy to locate by searching for this string. |
| +4 | 2 bytes | **Event count** (uint16 LE) | Number of event records that follow. |
| +6 | N × 298 bytes | **Event records** | 298 bytes per event. |
| after records | variable | **String table** | All text values concatenated as null-terminated strings. |

### Event Record (298 bytes)

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 4 bytes | **Trigger** (uint32 LE) | Bitmask: 1=UnitKilled, 2=CityTaken, 4=Turn, 8=TurnInterval, 16=Negotiation, 32=ScenarioLoaded, 64=RandomTurn, 128=NoSchism, 256=ReceivedTechnology. |
| +4 | 4 bytes | **Action** (uint32 LE) | Bitmask: bit 0 = Text, bit 1 = MoveUnit, bit 2 = CreateUnit, bit 3 = ChangeMoney, bit 4 = PlayWaveFile, bit 5 = MakeAggression, bit 6 = JustOnce, bit 7 = PlayCDTrack, bit 8 = DontPlayWonders, bit 9 = ChangeTerrain, bit 10 = DestroyACivilization, bit 11 = ChangeTerrain (duplicate). |

The remaining 290 bytes of each event record contain parameters for the trigger and action types (coordinates, civ IDs, unit types, monetary amounts, etc.).

### String Table

Immediately after the event records, a string table contains all text values from the original `events.txt` file pasted sequentially, each terminated by a null byte (`0x00`). This includes text between `TEXT` and `ENDTEXT` markers (each line is a separate string) and all values after `=` signs (except numbers and the veteran property value).

> **Note**: It is possible to embed events directly in a scenario `.SCN` file (adding the EVNT section) and omit the separate `events.txt` file entirely.

---

## Other Data Files

### Game.txt — UI String Database

Contains **2,179+ named sections** (marked with `@SECTIONNAME`) defining all UI dialog text, popup messages, menu labels, and in-game notifications. Each section specifies optional width (`@width=N`), title (`@title=...`), button labels, and content lines. Used by the game engine for all localizable user-facing text.

### Describe.txt — Advisor Dialog Text

Contains detailed text blocks for the science advisor, trade advisor, military advisor, and other in-game advisor screens. Organized by section markers similar to Game.txt.

### CITY.TXT — City Name Lists

Defines the ordered list of city names for each of the 21 civilizations. When a civilization founds a new city, the game assigns names sequentially from this list. The order matches `LEADERS.TXT` civilization indices.

### PEDIA.TXT — Civilopedia Entries

Contains the text for all Civilopedia encyclopedia entries (technologies, units, improvements, wonders, terrain types, concepts). Displayed in the in-game Civilopedia reference.

### COUNCIL0/1/2.TXT — Advisor Council Dialogs

Three files for the three eras of advisor council discussions: `COUNCIL0.TXT` (Ancient era), `COUNCIL1.TXT` (Renaissance era), `COUNCIL2.TXT` (Modern era). Each contains dialog lines for the six advisors (military, science, trade, domestic, foreign, attitude) with conditional text based on game state.

### DEBUG.TXT — Debug Message Templates

Contains internal debug message format strings that reveal variable names and data structures used by the game engine. Useful for reverse engineering as it exposes field names like `Attack Factor`, `Defense Factor`, `Hit Points`, and state machine labels.

### Labels.txt — UI Label Strings

Contains **888+ strings** used for UI labels, button text, menu items, and status bar messages. Numbered sequentially. Cross-referencing with game screenshots helps identify which label IDs correspond to which UI elements.

---

## Appendix A: FoxAhead TCiv Record (In-Memory Layout)

The following is the complete `TCiv` packed record from FoxAhead's Civ2-UI-Additions project (`src/Civ2Types.pas`). This represents the in-memory layout of the per-civ data block, which maps 1:1 to the save file per-civ block (1,428 bytes = 0x594). Memory base address: `0x64C6A0`.

Source: https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas

```pascal
TCiv = packed record                              // Size = 0x594 (1428 bytes)
  Flags: Word;                                    // +0x00 (2 bytes: state flags + gender)
  Gold: Integer;                                  // +0x02 (4 bytes, signed)
  Leader: Word;                                   // +0x06 (rulesCivNumber + civVariant)
  Beakers: Word;                                  // +0x08
  ResearchingTech: SmallInt;                      // +0x0A
  CapitalX: SmallInt;                             // +0x0C
  TurnOfCityBuild: SmallInt;                      // +0x0E
  Techs: Byte;                                    // +0x10 (acquired tech count)
  FutureTechs: Byte;                              // +0x11
  Unknown_12: ShortInt;                           // +0x12 (always 0 in MGE)
  ScienceRate: Byte;                              // +0x13 (0-10)
  TaxRate: Byte;                                  // +0x14 (0-10)
  Government: Byte;                               // +0x15 (0=Anarchy..6=Democracy)
  SenateChances: ShortInt;                        // +0x16 (empirically: AI random seed 0-99)
  Unknown_17: array[$17..$1A] of Byte;            // +0x17 (4 bytes: AI diplomatic counters)
  Unknown_1B: Byte;                               // +0x1B (always 0)
  Unknown_1C: Word;                               // +0x1C (treaty-breaking count)
  Reputation: Byte;                               // +0x1E (0-7: Spotless to Atrocious)
  Unknown_1F: Byte;                               // +0x1F (patience counter, 0-6)
  Treaties: array[0..7] of Integer;               // +0x20 (32 bytes: 4 bytes × 8 civs)
  Attitude: array[0..7] of Byte;                  // +0x40 (8 bytes: attitude per civ)
  Unknown9: array[$48..$153] of Byte;             // +0x48 (268 bytes: LARGE UNKNOWN BLOCK)
    // Contains: treaty violations (int8[8] at +0x48), diplomatic counters (uint8[8] at +0x50),
    // tech bitmask (12 bytes at +0x58), tech overflow (byte at +0x64),
    // military power (uint16 at +0x66), city count (uint16 at +0x68),
    // naval unit count (uint16 at +0x6A), sum of city sizes (uint16 at +0x6C),
    // total unit atk+def sum (uint16 at +0x6E), total unit atk sum (uint16 at +0x70),
    // first discoverer flags (100 bytes at +0x72), active unit counts (63 bytes at +0xD6),
    // casualty counts (63 bytes at +0x115), units in production (62 bytes at +0x154)
  DefMinUnitBuilding: array[0..61] of Byte;       // +0x154 (62 bytes: units in production)
  Unknown_192: array[0..63] of Word;              // +0x192 (Block A: military power per continent)
  Unknown_212: array[0..63] of Word;              // +0x212 (Block B: land attack per continent)
  Unknown_292: array[0..63] of Byte;              // +0x292 (Block C: city count per continent)
  Unknown_2D2: array[0..63] of ShortInt;          // +0x2D2 (Block D: city sizes per continent)
  Unknown_312: array[0..63] of ShortInt;          // +0x312 (Block E: transient flags)
  Unknown_352: array[0..63] of ShortInt;          // +0x352 (Block F: status bitflags)
  Unknown_392: array[0..63] of ShortInt;          // +0x392 (Block G: unit "ever built" flags)
  Unknown_3D2: SmallInt;                          // +0x3D2 (Block H: power graph H[0])
  Unknown_3D4: array[0..6] of SmallInt;           // +0x3D4 (Block H: power graph H[1]-H[7])
  Unknown_3E2: array[0..7] of SmallInt;           // +0x3E2 (last contact turns, 7 entries + padding)
  Unknown_3F2: ShortInt;                          // +0x3F2 (AI persona index)
  Unknown_3F3: array[0..9] of ShortInt;           // +0x3F3 (constant padding [1,1,0,1,0,0,1,0,0,0])
  Unknown_3FD: ShortInt;                          // +0x3FD (constant padding byte 11: 0)
  Unknown_3FE: SmallInt;                          // +0x3FE (spaceship structural count)
  SpaceFlags: Byte;                               // +0x400 (0x01=Started, 0x02=Launched, 0x08=Fusion)
  Unknown_401: array[0..18] of ShortInt;          // +0x401 (spaceship propulsion, estimates, zero pad)
  Unknown_414: array[0..47] of TCivSub1;          // +0x414 (AI continent goals, entries 0-47)
  Unknown_534: array[0..15] of TCivSub1;          // +0x534 (AI continent goals, entries 48-63)
end;

TCivSub1 = packed record   // 6 bytes
  X: SmallInt;             // +0: map x-coordinate
  Y: SmallInt;             // +2: map y-coordinate
  Unknown_4: Byte;         // +4: goal type (0=explore, 1=attack, 5=city site, 255=empty)
  Unknown_5: Byte;         // +5: goal extra (signed priority or target civ)
end;
```

> **Notes**: FoxAhead's `Flags` (Word, 2 bytes) combines what our parser splits into `stateFlags` (byte 0) and `gender` (byte 1). Similarly, `Leader` (Word) combines `rulesCivNumber` and `civVariant`. The `Unknown9` block (268 bytes) has been substantially decoded by this project through statistical analysis of 232 save files — see the inline annotations above. FoxAhead's `DefMinUnitBuilding` at +0x154 corresponds to our `unitsInProduction` array.

## Appendix B: FoxAhead TUnit and TUnitType Records

These records from `Civ2Types.pas` define the in-memory layout of unit data, validating our unit parser.

```pascal
TUnit = packed record    // Size = 0x20 (32 bytes)
  X: Word;               // +0x00
  Y: Word;               // +0x02
  Attributes: Word;      // +0x04 (veteran, etc.)
  UnitType: Byte;        // +0x06
  CivIndex: ShortInt;    // +0x07 (owner civ slot)
  MovePoints: ShortInt;  // +0x08
  Visibility: Byte;      // +0x09 (per-civ visibility bitmask)
  HPLost: Byte;          // +0x0A
  MoveDirection: Byte;   // +0x0B
  DebugSymbol: Char;     // +0x0C
  Counter: ShortInt;     // +0x0D
  MoveIteration: Byte;   // +0x0E
  Orders: ShortInt;      // +0x0F (0=none, 1=fortifying, 2=fortified, etc.)
  HomeCity: Byte;         // +0x10 (city array index; 0xFF = no home city)
  byte_11: Byte;          // +0x11
  GotoX: Word;           // +0x12
  GotoY: Word;           // +0x14
  PrevInStack: Word;     // +0x16
  NextInStack: Word;     // +0x18
  ID: Integer;           // +0x1A (unique sequence ID)
  word_1E: Word;         // +0x1E
end;

TUnitType = packed record  // Size = 0x14 (20 bytes)
  StringIndex: Cardinal;
  Abilities: Cardinal;
  Until_: Byte;
  Domain: Byte;            // 0=Ground, 1=Air, 2=Sea
  Move: Byte;
  Range: Byte;
  Att: Byte;               // RULES.TXT attack value
  Def: Byte;               // RULES.TXT defense value
  HitPoints: Byte;
  FirePower: Byte;
  Cost: Byte;
  Hold: Byte;
  Role: Byte;              // 0=Attack, 1=Defend, 2=Naval, 3=Air, 4=Transport, 5=Settle, 6=Diplomacy, 7=Trade
  Preq: Byte;              // prerequisite tech index
end;
```

> **Notes**: `HomeCity` is a single byte (max 255), limiting the number of cities to 255 per civ in standard MGE. TOTPP extends this to a word for >255 city support. `TUnitType.Att` and `TUnitType.Def` are the RULES.TXT base values used by the runtime counters at per-civ bytes 111–114.

## Appendix C: Source URLs

### GitHub Repositories
- **FoxAhead/Civ2-UI-Additions** (Pascal DLL injection, TCiv struct): https://github.com/FoxAhead/Civ2-UI-Additions
- **axx0/Civ2-clone** (C# reimplementation): https://github.com/axx0/Civ2-clone
- **Catfish's Cave** (ToT hex format documentation): https://github.com/FoxAhead/Catfish-s-Cave
- **vinceho/civ2patch** (C++ binary patching): https://github.com/vinceho/civ2patch
- **tek10/civ2mod** (C save editor, ships hexedit.rtf): https://github.com/tek10/civ2mod
- **LukeGoodsell/civ2.pm** (Perl module, minimal): https://github.com/LukeGoodsell/civ2.pm
- **TOTPP Code Library** (Lua scripting library): https://github.com/javiermunozk/TOTPP-Code-Library

### Documentation Pages
- **Catfish's Cave hex doc** (ToT save format): https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm
- **TOTPP Lua auto-docs** (tribe object API): https://profgarfield.github.io/auto_doc/tribeObject.html
- **Allard Höfelt hexedit.rtf v1.8** (original FW/MGE reference, 1-indexed): https://ia800304.us.archive.org/11/items/civ2-hex-editing/Hex%20Editing.pdf
- **Apolyton SAV/SCN format** (Mercator): https://apolyton.net/forum/civilization-series/civilization-i-and-civilization-ii/130935-civilization-ii-sav-scn-file-format
- **Freeciv21 Civ2 loading** (limited import): https://longturn.readthedocs.io/en/latest/Manuals/Advanced/civ2.html

### CivFanatics Forum Threads
- **Civ2 Patch Project**: https://forums.civfanatics.com/threads/mge-civ-2-patch-project.570939/
- **CIV2UIA**: https://forums.civfanatics.com/threads/civilization-ii-mge-user-interface-additions-civ2uia.697565/
- **Civ2-clone**: https://forums.civfanatics.com/threads/making-a-clone-of-civ-ii.697563/
- **TOTPP**: https://forums.civfanatics.com/threads/the-test-of-time-patch-project.517282/
- **TOTPP Lua Reference**: https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/
- **ToT Save Game Format** (treaty flags): https://forums.civfanatics.com/threads/save-game-format.631770/
- **Demographics**: https://forums.civfanatics.com/threads/demographics.42324/
- **How Demographics Works**: https://forums.civfanatics.com/threads/how-the-demographics-works.37033/
- **Power Rating vs Power Graph**: https://forums.civfanatics.com/threads/power-rating-vs-power-graph.463/

### Wiki / Reference
- **Diplomacy (Civ2)**: https://civilization.fandom.com/wiki/Diplomacy_(Civ2) — reputation scale, power rating
- **Reputation (Civ2)**: https://civilization.fandom.com/wiki/Reputation_(Civ2) — betrayals, decay mechanics
- **AI Personalities** (LP Archive): https://lparchive.org/Civilization-2/Update%2030/



---

# Part III: Data Structures

> **Sources**: `reverse_engineering/Civ2_City_Struct.md` + `reverse_engineering/Data_Structures.md`
>
> This section contains all reverse-engineered in-memory data structures from the running
> civ2.exe process, extracted via Ghidra decompilation. Section A provides the complete
> 88-byte city struct (31 fields with detailed descriptions and flag breakdowns). Section B
> covers all other structures: Civilization (1,428 bytes), Improvement/Building table (8 bytes),
> Unit Type table (20 bytes), Unit Instance (32 bytes), plus global variables and cross-references.
>
> For save file binary format (how these structs are serialized to disk), see [Part II](#part-ii-save-file-format--asset-formats).
> For game formulas that use these struct fields, see [Part IV](#part-iv-game-formulas--mechanics).

## Section A: City Struct — Complete Reference

> **Source**: `reverse_engineering/Civ2_City_Struct.md` (authoritative)
>
> This is the most detailed city struct documentation, with 31 fields fully mapped, all flag
> bits documented, C struct reconstruction, and key function references. This supersedes the
> brief city section (Section 5) in Data_Structures.md below, which contains an earlier,
> less complete analysis. Both are included for completeness.

# Civ2 MGE City Data Structure

## Array Location

| Property | Value |
|---|---|
| Array base address | `0x0064F340` |
| Struct stride | `0x58` (88 bytes) |
| Max entries | 256 (indices 0-255, loop bound `0x100`) |
| Active count variable | `DAT_00655b18` (tracks highest used index + 1) |
| Max usable index | 254 (`0xFE`); if `DAT_00655b18 > 0xFE`, "TOOMANYCITIES" message |
| Validity check | `*(int*)(&DAT_0064f394 + idx * 0x58) != 0` (field at offset 0x54) |

## File I/O

- **Save format version >= 0x2A**: Reads/writes entire block: `fread(&DAT_0064f340, DAT_00655b18 * 0x58, 1, file)` -- all 0x58 bytes per city, contiguous.
- **Save format version 0x29**: Same as above.
- **Save format version < 0x29**: Reads only 0x54 bytes per city (older format, no city_id field in file); the last 4 bytes (offset 0x54-0x57) are assigned in-memory from a running counter.
- After loading, the `city_id` field (offset 0x54) is reassigned from `DAT_00627fdc` (a monotonically incrementing unique ID counter).

## Complete Field Map

All offsets relative to struct base (`&DAT_0064f340 + idx * 0x58`).

### Core Identity (offsets 0x00 - 0x0B)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x00` | 2 | `short` | `DAT_0064f340` | **x** | Map X coordinate. Used in all distance calculations, movement, and map rendering. |
| `0x02` | 2 | `short` | `DAT_0064f342` | **y** | Map Y coordinate. Always paired with X for tile lookups. |
| `0x04` | 4 | `uint32` | `DAT_0064f344` | **flags** | City status bitfield. See "City Flags" section below. Accessed as both a 32-bit word and individual bytes (0x345, 0x346, 0x347). |
| `0x08` | 1 | `byte` | `DAT_0064f348` | **owner** | Owning civilization index (0-7). Compared against `DAT_006d1da0` (current player). Used to index into civ data at stride `0x594`. |
| `0x09` | 1 | `byte` (signed) | `DAT_0064f349` | **size** | City population size (1-based). Used for food box calculation (`(size+1) * food_factor`), display, happiness math. Capital founded late in game can get initial size > 1. |
| `0x0A` | 1 | `byte` | `DAT_0064f34a` | **original_owner** | Original founding civilization. Used to detect conquered cities (`owner != original_owner`), affects revolt checks and AI diplomacy. |
| `0x0B` | 1 | `byte` | `DAT_0064f34b` | **turn_founded_mod64** | Turn counter related to founding. Set to `DAT_00655af8` (current turn) on creation. Checked with `((byte - 1) ^ (turn & 0x3F)) & 0x3F == 0` -- appears to be `turn_founded mod 64`. |

### Visibility and Per-Civ Data (offsets 0x0C - 0x14)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x0C` | 1 | `byte` | `DAT_0064f34c` | **civ_visibility_bitmask** | Bitfield: bit N set means civ N can see this city. Checked with `(1 << (civ & 0x1f)) & visibility`. Set to `0xFF` (all visible) or `0x00` on creation depending on `DAT_00655c18`. |
| `0x0D` | 8 | `byte[8]` | `DAT_0064f34d` | **civ_pop_knowledge[8]** | Per-civilization "last known size" of this city. Index = civ number (0-7). Set to the city's current `size` when that civ's visibility updates. Used in diplomacy and AI evaluation. Compared against `size` field (0x09). |

### Padding (offset 0x15)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x15` | 1 | `byte` | `DAT_0064f355` | **unused** | Never directly referenced in decompiled code. Padding byte between per-civ array and worker tiles. |

### Worker Tile Assignment (offset 0x16 - 0x19)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x16` | 4 | `uint32` | `DAT_0064f356` | **worker_tiles** | 2-bit field per tile slot (16 slots, 32 bits total). Each 2-bit value encodes what the citizen on that tile produces. Accessed via `(value >> (slot * 2)) & 3`. Set via `value = (value & ~(3 << shift)) | (new << shift)`. Initialized to 0 on city creation. Tile slot indices follow the city radius spiral (`DAT_00628370`/`DAT_006283a0`). |

> **Note: Runtime vs Save Format**: The internal struct uses a 2-bit-per-slot encoding (32 bits / 16 slots at offset 0x16) for what each citizen produces. The save file format uses a simpler 1-bit-per-tile encoding across 3 bytes (offsets +48/+49/+50) indicating only whether each tile is worked. Both use the same spiral index ordering defined by `DAT_00628370`/`DAT_006283a0`. See the City Radius Spiral documentation in the save file City Record section for the full bit-to-tile mapping.

### Food and Production Stockpile (offsets 0x1A - 0x1F)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x1A` | 2 | `short` | `DAT_0064f35a` | **food_box** | Accumulated food toward next population growth. Grows each turn by food surplus. When it reaches `(size+1) * food_per_row`, city grows. Can go negative (famine). Reset to 0 on growth. |
| `0x1C` | 2 | `short` | `DAT_0064f35c` | **shield_box** | Accumulated shields toward current production. Compared against unit/building cost. Reset on completion. Halved when production changes in some cases. Key field for rush-buy calculations. |
| `0x1E` | 2 | `short` | `DAT_0064f35e` | **trade_revenue** | Net trade output. Computed as `total_trade - corruption`. Used in trade route value calculations and to determine science/tax/luxury split. |

### City Name (offsets 0x20 - 0x2F)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x20` | 16 | `char[16]` | `DAT_0064f360` | **name** | Null-terminated city name string (max 15 chars + null). Cleared with `_memset(name, 0, 0x10)` then set with `_strncpy(name, source, 0xf)`. Passed to `thunk_FUN_0040bbe0` (draw city name), `thunk_FUN_0040ff60` (message display), `thunk_FUN_0043c8d0` (string format). |

### City Improvements Bitfield (offsets 0x30 - 0x33)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x30` | 4 | `uint32` | `DAT_0064f370` | **improvements_lo** | Bitfield for improvements/wonders. Bit N set = improvement N is built. Checked with `(value & (1 << (id & 0x1f))) != 0`. Upper 6 bits (`>> 0x1a`) used as a separate counter/field (possibly completed wonder display count or science beaker accumulation counter). Initialized to 0 on creation. |

### Tile Improvement Bitfield (offsets 0x34 - 0x38)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x34` | 5 | `byte[5]` | `DAT_0064f374` | **tile_improvements** | Per-tile improvement bits for the city radius (up to ~40 bits for 20 tiles). Cleared with `_memset(ptr, 0, 5)`. Individual bits set/cleared with mask operations. Copied between cities during conquest. |

### Current Production (offset 0x39)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x39` | 1 | `byte` (signed) | `DAT_0064f379` | **current_production** | What the city is currently building. **Positive values (0-61)**: improvement/wonder ID. Checked `< 0x3E` (62). **Negative values**: unit type, encoded as `-(unit_id + 0x27)` or similar negation. When negative, `~value + 1` gives the unit cost index. Special values: `0` = nothing, `-1` = capitalization, `-0x26` (= -38) = threshold for unit vs improvement. Updated by `thunk_FUN_004eb4ed`. Indexed into `DAT_0064c7f4` (civ's building count array, stride 0x594). |

### Trade Route Count (offset 0x3A)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x3A` | 1 | `byte` (signed) | `DAT_0064f37a` | **num_trade_routes** | Number of active trade routes (0-3 max). Used as loop bound for iterating trade route arrays. Decremented when a route is removed, incremented when added (capped at 3). |

### City Supply/Demand and Trade Route Data (offsets 0x3B - 0x49)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x3B` | 3 | `byte[3]` | `DAT_0064f37b` | **supply_commodities[3]** | City's 3 supply commodity IDs (signed byte). Populated from commodity tables during city setup. Values > 13 indicate special commodities. Matched against other cities' demand for trade route value. |
| `0x3E` | 3 | `byte[3]` | `DAT_0064f37e` | **demand_commodities[3]** | City's 3 demand commodity IDs (signed byte). Populated from commodity tables during city setup. Values > 13 indicate special commodities. A trade route matches when one city supplies what the other demands. |
| `0x41` | 3 | `byte[3]` | `DAT_0064f381` | **trade_route_type[3]** | Trade route connection type/status (signed byte). Negative values indicate foreign-owned partner. Used in trade revenue calculations. Accessed alongside partner arrays. Cleared with `_memset(ptr, 0, 3)`. |
| `0x44` | 6 | `short[3]` | `DAT_0064f384` | **trade_route_partner[3]** | City index of the trade partner for each route. `short` values (2 bytes each, 3 routes). Used to look up the partner city's coordinates, owner, and stats for revenue calculation. Cleared with `_memset(ptr, 0, 3)` (partial clear of first 3 bytes). |

### Cached Resource Output (offsets 0x4A - 0x53)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x4A` | 2 | `short` | `DAT_0064f38a` | **food_output** | Total food production (after improvements, terrain, government). Cached from `DAT_006a6578` during city processing. Summed across all cities for civ totals. |
| `0x4C` | 2 | `short` | `DAT_0064f38c` | **shield_output** | Total shield production. Cached from `DAT_006a6554`. Used for rush-buy cost calculations and production speed display. |
| `0x4E` | 2 | `short` | `DAT_0064f38e` | **trade_output** | Total trade arrows. Cached from the trade calculation. Used in revenue split (science/tax/luxury) and trade route displays. Passed to `thunk_FUN_004ea1f6` for processing. |
| `0x50` | 1 | `byte` | `DAT_0064f390` | **total_food_surplus** | Net food surplus/deficit after population consumption. Cached from `DAT_006a65c8`. Displayed in city screen. |
| `0x51` | 1 | `byte` | `DAT_0064f391` | **total_shield_surplus** | Net shield surplus after unit support. Cached from `DAT_006a65cc`. Used in AI to compare city productivity. Compared between cities for governor decisions. |
| `0x52` | 1 | `byte` (signed) | `DAT_0064f392` | **happy_citizens** | Number of happy citizens. Cached from `DAT_006a6550`. Compared with `unhappy_citizens` for civil disorder/WeLoveDay checks. `size - happy - unhappy = content`. |
| `0x53` | 1 | `byte` (signed) | `DAT_0064f393` | **unhappy_citizens** | Number of unhappy citizens. Cached from `DAT_006a65a8`. When `unhappy > happy`, city is in civil disorder. When `unhappy == 0 && happy > 0`, We Love the King Day. |

### City Unique ID (offsets 0x54 - 0x57)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x54` | 4 | `int32` | `DAT_0064f394` | **city_id** | Unique city identifier. Non-zero = city slot is in use (this is THE validity check). Assigned from `DAT_00627fdc` (monotonically incrementing counter) on creation. Set to 0 when city is destroyed. Reassigned on save game load. In older save formats (< 0x29), this field is not saved to disk. |

---

## City Flags (offset 0x04, `uint32`)

The 4-byte flags field is a dense bitfield. The decompiler accesses it both as a full 32-bit word (`*(uint *)(&DAT_0064f344 + ...)`) and as individual bytes (`(&DAT_0064f345)[...] & mask`, `(&DAT_0064f346)[...] & mask`, `(&DAT_0064f347)[...] & mask`).

### Byte 0 (offset 0x04, `DAT_0064f344`) -- bits 0-7

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| 0 | `0x01` | **We Love the King Day / Celebrating** -- Checked in population display and trade bonuses. Set during city capture (`0x4001`). | `block_004E0000.c:5838`, `block_00500000.c:4320` |
| 1 | `0x02` | **Civil Disorder** -- City is in disorder. Set when unhappy > happy. | `block_004E0000.c:5908`, `block_004B0000.c:5923` |
| 2 | `0x04` | **Has paid production tax this turn** -- Set after gold/buy processing. | `block_00500000.c:2659` |
| 3 | `0x08` | **City was just conquered / auto-production** -- Checked during production selection. | `block_004C0000.c:2217`, `block_004C0000.c:2380` |
| 4 | `0x10` | **Build order queued/changed** -- Set when production queue updated. | `block_00500000.c:5068`, `block_004E0000.c:5103` |
| 5 | `0x20` | **City has been modified this turn** -- Needs recalculation. Set on trade route changes, capture events. | `block_00440000.c:529`, `block_00580000.c:1001`, `block_00570000.c:5020` |
| 6 | `0x40` | **AI has processed this city** -- Used in AI city management. | `block_00530000.c:589`, `block_00490000.c:4203` |
| 7 | `0x80` | **Coastal city** -- Has ocean/water in city radius. Set on creation if water tile found. | `block_00430000.c:5721`, `block_00450000.c:2720` |

### Byte 1 (offset 0x05, `DAT_0064f345`) -- bits 8-15

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| 8 | `0x100` | **Has produced something / production complete** | `block_004E0000.c:2476`, `block_004E0000.c:4924` |
| 9 | `0x200` | **Part of 0x600: AI shield/military flag** | `block_00530000.c:3510` |
| 10 | `0x400` | **Part of 0x600: AI shield/military flag** | `block_00530000.c:3510` |
| 11 | `0x800` | **Has special terrain in radius** | `block_00430000.c:5726` |
| 12 | `0x1000` | **Production-related flag** | `block_004E0000.c:4733` |
| 13 | `0x2000` | **Has auto-settler or automation** | `block_004E0000.c:5854` |
| 14 | `0x4000` | **Auto-production unit type flag** | `block_004E0000.c:5871` |
| 15 | `0x8000` | **Food processing/granary flag** | `block_004E0000.c:3365`, `block_004E0000.c:3461` |

### Byte 1 (offset 0x05, `DAT_0064f345`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x100` overall | **See above** | `block_00490000.c:5487` |
| bit 1 (0x02) | `0x200` overall | **City has been traded/diplomatic** | `block_00530000.c:2790`, `block_00580000.c:5363` |
| bit 2 (0x04) | `0x400` overall | **AI production priority** | `block_00530000.c:1255` |
| bit 3 (0x08) | `0x800` overall | **Special terrain** | `block_004C0000.c:76` (check for unit 0x14) |
| bit 4 (0x10) | `0x1000` overall | **Production overflow** | `block_00490000.c:5653` |
| bit 5 (0x20) | `0x2000` overall | **Has auto-settler** | `block_004E0000.c:5849`, `block_00490000.c:6076` |
| bit 6 (0x40) | `0x4000` overall | **Granary/food flag** | `block_004E0000.c:3360` |

### Byte 2 (offset 0x06, `DAT_0064f346`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x10000` | **City has caravan en route / trade flag** | `block_00490000.c:4560`, `block_00530000.c:2369`, `block_00580000.c:4779` |
| bit 1 (0x02) | `0x20000` | **Needs redraw / dirty flag** | `block_00430000.c:4803` |
| bit 4 (0x10) | `0x100000` | **AI notification flag** | `block_00500000.c:4321` |
| bit 5 (0x20) | `0x200000` | **River in radius** | `block_004C0000.c:53`, `block_004B0000.c:7034` |
| bit 6 (0x40) | `0x400000` | **Revealed to all / spy visibility** | `block_00410000.c:717`, `block_004C0000.c:2323` |

### Byte 3 (offset 0x07, `DAT_0064f347`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x1000000` | **AI build preference 1** | `block_00490000.c:6096`, `block_00500000.c:5072` |
| bit 1 (0x02) | `0x2000000` | **AI build preference 2** | `block_00490000.c:6097`, `block_00500000.c:5077` |
| bit 2 (0x04) | `0x4000000` | **Display toggle (wonder movie?)** -- Toggled with XOR. | `block_00550000.c:2724`, `block_00430000.c:4572` |
| bit 3 (0x08) | `0x8000000` | **AI mobilization / war footing** | `block_00580000.c:158`, `block_00530000.c:3952` |

### Combined flag patterns used in code

| Pattern | Hex | Meaning |
|---------|-----|---------|
| `0x4001` | WLtKD + celebration set together | `block_004E0000.c:5838` |
| `0x600` | AI shield priority flags | `block_00530000.c:3510` |
| `0x10000` | City has outbound caravan | Many AI files |
| `0x20000` | Set on any modification | Trade route add/remove |
| `0x80000` | Food surplus flag | `block_004F0000.c:208` |
| `0x80040` | Coastal + AI flag combo check | `block_00490000.c:4383` |
| `0xFFBFFFFF` | Clear bit 22 (0x400000) | `block_005A0000.c:3477` |
| `0xFFFEFFFF` | Clear bit 16 (0x10000) | `block_00480000.c:1975` |
| `0xFFFFFFFC` | Clear bits 0-1 (disorder+WLtKD) | `block_00550000.c:2689` |
| `0xFFFFFFC4` | Clear multiple low bits | `block_00570000.c:4789` |

---

## Current Production Encoding (offset 0x39)

The `current_production` field uses signed byte encoding:

| Value Range | Meaning |
|-------------|---------|
| `0` | Nothing / Capitalization |
| `1` to `61` (0x3D) | Improvement or Wonder ID (indexes into improvement table at `DAT_0064b1b8`, stride 0x14) |
| `-1` (0xFF) | Capitalization (gold conversion) |
| `-2` to `-38` (-0x26) | Near-zero unit range (rare units or placeholder) |
| `< -38` (< -0x26) | Unit production. Unit type = `-(value + 0x27)` approximately. These index into `DAT_0064c488` (unit table, stride 8). |

The value `-0x26` (-38) is a critical threshold: values less than -38 are unit production, values -38 through -1 are special wonders/improvements.

When a city changes production, the improvement count array `(&DAT_0064c7f4)[civ * 0x594 + prod_id]` is updated (decremented for old, incremented for new).

---

## Key Functions

| Function | Address | Purpose |
|----------|---------|---------|
| `create_city` | `0x0043F8B0` | Creates a new city. Initializes all fields to defaults. |
| Delete city | `~0x00440000 area` | Sets `city_id` to 0, decrements `DAT_00655b18` if last entry. Removes trade routes. |
| City turn processing | `0x004EA8E4` | Calculates all resource output for a city. Updates cached food/shield/trade/happy/unhappy. |
| Trade route calculation | `0x004EA031+` | Computes trade revenue including route bonuses. |
| Worker tile assignment | `0x004E7540` | Sets 2-bit worker tile assignment. |
| Worker tile query | `0x004E75A6` | Gets 2-bit worker tile assignment for a slot. |
| Has improvement check | `0x004E78CE` | Tests if improvement bit is set in `improvements_lo`. |
| Set improvement | `0x004E790C` | Sets or clears an improvement bit. |
| Change production | `0x004440xx area` | Updates `current_production` field and related civ counts. |
| City name assignment | `0x0043F493` | Reads city names from data files, assigns to city name field. |
| Load cities from file | `0x00471xxx` | Reads city array from save file (size depends on version). |
| Save cities to file | `0x00475xxx` | Writes `DAT_00655b18 * 0x58` bytes to save file. |
| City display / paint | `0x00500xxx` | City screen rendering. Reads nearly every field. |
| AI city evaluation | `0x00490xxx` | AI decision-making: what to build, where to settle. |
| Capture/conquer city | `0x00570xxx` | Transfers city between civs. Updates owner, flags, trade routes. |

---

## Key Global Variables

| Address | Name | Description |
|---------|------|-------------|
| `DAT_00655b18` | `num_cities` | Current number of city slots in use (loop bound) |
| `DAT_00627fdc` | `next_city_id` | Monotonically incrementing unique city ID counter |
| `DAT_006d1da0` | `current_player` | Currently active player civ index |
| `DAT_00655af8` | `current_turn` | Current game turn number |
| `DAT_00655b0b` | `human_players_bitmask` | Bitmask of human-controlled civs |
| `DAT_00655b02` | `game_mode` | Game mode (0=single, 3+=multiplayer) |
| `DAT_006a6578` | `calc_food` | Temporary: total food during city processing |
| `DAT_006a6554` | `calc_shields` | Temporary: total shields during city processing |
| `DAT_006a65d0` | `calc_trade_gross` | Temporary: gross trade during city processing |
| `DAT_006a6580` | `calc_corruption` | Temporary: corruption during city processing |
| `DAT_006a65c8` | `calc_food_surplus` | Temporary: food surplus during processing |
| `DAT_006a65cc` | `calc_shield_surplus` | Temporary: shield surplus during processing |
| `DAT_006a6550` | `calc_happy` | Temporary: happy citizens during processing |
| `DAT_006a65a8` | `calc_unhappy` | Temporary: unhappy citizens during processing |
| `DAT_006a6560` | `food_per_citizen` | Food consumed per citizen per turn |
| `DAT_0064bcca` | `food_per_row` | Food needed per food box row |
| `DAT_0064bccc` | `shields_per_row` | Shields per production row |

---

## C Struct Reconstruction

```c
#define MAX_CITIES 256
#define MAX_TRADE_ROUTES 3
#define MAX_CIVS 8
#define CITY_NAME_LEN 16
#define TILE_IMPROVEMENT_BYTES 5

typedef struct {
    /* 0x00 */ short x;                          // Map X coordinate
    /* 0x02 */ short y;                          // Map Y coordinate
    /* 0x04 */ unsigned int flags;               // City status bitfield (see flags table)
    /* 0x08 */ unsigned char owner;              // Owning civilization (0-7)
    /* 0x09 */ char size;                        // Population size (1+)
    /* 0x0A */ unsigned char original_owner;     // Founding civilization
    /* 0x0B */ unsigned char turn_founded_mod64; // Turn founded modulo 64
    /* 0x0C */ unsigned char civ_visibility;     // Bitfield: which civs can see this city
    /* 0x0D */ char civ_pop_knowledge[8];        // Per-civ last-known population
    /* 0x15 */ unsigned char _padding;           // Unused byte
    /* 0x16 */ unsigned int worker_tiles;        // 2-bit per tile: citizen work assignment
    /* 0x1A */ short food_box;                   // Accumulated food toward growth
    /* 0x1C */ short shield_box;                 // Accumulated shields toward production
    /* 0x1E */ short trade_revenue;              // Net trade after corruption
    /* 0x20 */ char name[16];                    // City name (null-terminated, 15 chars max)
    /* 0x30 */ unsigned int improvements;        // Improvement/wonder bitfield (bits 0-25)
                                                 // Bits 26-31: counter/accumulator
    /* 0x34 */ unsigned char tile_improvements[5]; // Per-tile improvement bits for radius
    /* 0x39 */ char current_production;          // What is being built (signed encoding)
    /* 0x3A */ char num_trade_routes;            // Active trade routes (0-3)
    /* 0x3B */ char supply_commodities[3];       // City's 3 supply commodity IDs
    /* 0x3E */ char demand_commodities[3];       // City's 3 demand commodity IDs
    /* 0x41 */ char trade_route_type[3];         // Trade route connection type per route
    /* 0x44 */ short trade_route_partner[3];     // Partner city index per route
    /* 0x4A */ short food_output;                // Cached total food production
    /* 0x4C */ short shield_output;              // Cached total shield production
    /* 0x4E */ short trade_output;               // Cached total trade arrows
    /* 0x50 */ char food_surplus;                // Cached net food surplus
    /* 0x51 */ unsigned char shield_surplus;     // Cached net shield surplus
    /* 0x52 */ char happy_citizens;              // Cached happy citizen count
    /* 0x53 */ char unhappy_citizens;            // Cached unhappy citizen count
    /* 0x54 */ int city_id;                      // Unique ID (non-zero = valid)
} City;  // Total: 0x58 = 88 bytes

// City array: City cities[256] at address 0x0064F340
```

---

## Validation Pattern

Every function that iterates cities uses this pattern:

```c
for (i = 0; i < DAT_00655b18; i++) {
    if (*(int *)(&DAT_0064f394 + i * 0x58) != 0) {  // city_id != 0
        if ((char)(&DAT_0064f348)[i * 0x58] == civ) { // owner == target civ
            // ... process city ...
        }
    }
}
```

The `city_id` field (offset 0x54) being non-zero is the universal "city slot is occupied" check. When a city is destroyed, only this field is set to zero.


## Section B: All Data Structures

> **Source**: `reverse_engineering/Data_Structures.md`
>
> Contains: Civilization struct (1,428 bytes, 8 players), Improvement/Building table (8 bytes,
> 67 entries), Unit Type table (20 bytes, 62 entries), Unit Instance struct (32 bytes),
> global variables, wonder obsolescence table, government names, and struct cross-references.
> Note: Section 5 (City Instance Struct) below is a brief summary — see Section A above for
> the complete 31-field city struct documentation.

# Civ2 MGE Data Structure Map

Reverse-engineered from Ghidra decompilation of CIV2.EXE (MGE).

All offsets are relative to each struct's base address (field offset within a single instance).
"DAT_" labels show the absolute address of **civ[0]**, **unit_type[0]**, **unit[0]**, or **building[0]**.

---

## 1. Civilization Struct

- **Base address:** `0x0064C6A0` (start of civ[0])
- **Stride:** `0x594` (1428 bytes)
- **Count:** 8 (player indices 0-7)
- **Total block size:** `0x2CA0` (8 * 0x594 = 11424 bytes)
- **Save file:** loaded/saved as a single `0x2CA0` block (older format), or in chunked sub-reads (newer format)

### File I/O Layout (Chunked Read Order)

The save file writes the Civilization struct in segments per-player (block_00470000.c lines 1865-1901):

| Segment Start (abs)  | Offset in Struct | Size   | Description |
|-----------------------|------------------|--------|-------------|
| `DAT_0064c6a0`       | `0x000`          | `0x58` | Core fields: flags, gold, leader name, civ name, government, rates, etc. |
| `DAT_0064c6f8`       | `0x058`          | `0x0C` | Tech flags / contact bitmask (12 bytes, likely 96 bits of tech) |
| `DAT_0064c706`       | `0x066`          | `0x0E` | Num cities, num units, counters, science progress |
| `DAT_0064c714`       | `0x074`          | `0x5D` | Future tech researching, tech list (93 entries = 93 techs, 1 byte each) |
| `DAT_0064c778`       | `0x0D8`          | `0x36` | Unit counts per civ (54 bytes, indexed by civ id) |
| `DAT_0064c7b6`       | `0x116`          | `0x36` | Unknown array per civ (54 bytes) |
| `DAT_0064c7f4`       | `0x154`          | `0x36` | City counts per civ (54 bytes, indexed by civ id) |
| *(1 byte padding)*    | ---              | `0x01` | Read but discarded |
| `DAT_0064c832`       | `0x192`          | `0x402`| Military unit counts + science unit counts (2 arrays of 0x201 shorts each, indexed by unit type * 2) |

### Individual Field Map

All offsets relative to start of a single Civilization instance (`0x0064C6A0` for civ[0]).

#### Core Fields (offset 0x000 - 0x057, size 0x58)

| Offset | Abs Addr (civ[0]) | Size | Type    | Name / Description |
|--------|-------------------|------|---------|--------------------|
| 0x000  | `0064c6a0`        | 2    | ushort  | **flags** -- bitfield. Bit 0x008 = unknown flag; Bit 0x200 = related to leader/contact status (toggled with XOR 0x200) |
| 0x002  | `0064c6a2`        | 4    | int     | **gold** -- treasury. Clamped to [0, 30000]. Divided by 0x32 (50) for AI calculations. Negative gold reset to 0 or 30000. |
| 0x006  | `0064c6a6`        | 2    | short   | **leader_graphic_id** -- indexes into leader portrait table (DAT_006554fc, stride 0x30) |
| 0x008  | `0064c6a8`        | 2    | short   | **research_progress** -- beakers accumulated toward current tech |
| 0x00A  | `0064c6aa`        | 2    | short   | **researching_tech** -- tech ID currently being researched (-1 = none; indexes into tech table at DAT_00627684, stride 0x10) |
| 0x00E  | `0064c6ae`        |      |         | *(gap / more core fields)* |
| 0x010  | `0064c6b0`        | 1    | byte    | **rank / power_rating** -- compared between civs for diplomacy. Incremented on various events (wonders, techs). Used as a "strength" metric. |
| 0x011  | `0064c6b1`        | 1    | byte    | **unknown_counter_b1** -- incremented in some game logic |
| 0x013  | `0064c6b3`        | 1    | byte    | **science_rate** -- 0-10 scale. `science + tax + luxury = 10` (luxury implicit). Used directly to compute science output in FUN_004ea1f6. Capped by COSMIC #21 under Fundamentalism. |
| 0x014  | `0064c6b4`        | 1    | byte    | **tax_rate** -- 0-10 scale. Combined with science_rate to derive luxury_rate = 10 - science - tax. |
| 0x015  | `0064c6b5`        | 1    | byte    | **government_type** -- 0=Anarchy, 1=Despotism, 2=Monarchy, 3=Communism, 4=Fundamentalism, 5=Republic, 6=Democracy. Checked `< 2` for primitive govts, `== 4` for Fundie, etc. Indexes into government name table (DAT_0064b9a0, stride 4). |
| 0x016  | `0064c6b6`        |      |         | *(within core block)* |
| 0x01E  | `0064c6be`        | 1    | byte    | **reputation** -- diplomatic reputation value, shifted right by 1 in some contexts. Incremented when treaties formed/broken. |
| 0x01F  | `0064c6bf`        | 1    | byte    | **patience / anger_counter** -- incremented/decremented during diplomatic negotiations. Added +1 for accepted deals, -1 for broken deals. |

#### Contact / Attitude Arrays (within core 0x58 block)

| Offset | Abs Addr (civ[0]) | Size  | Type    | Name / Description |
|--------|-------------------|-------|---------|--------------------|
| 0x020  | `0064c6c0`        | 4*8=32| byte[8] | **diplomatic_status[8]** -- per-civ diplomatic state bitfield (4 bytes per opposing civ, indexed as `[other_civ * 4]`). Bits: 0x01=contact/met, 0x02=ceasefire, 0x04=peace, 0x08=alliance, 0x20=at_war (in byte+1), 0x80=unknown. |
| 0x040  | `0064c6e0`        | 8     | byte[8] | **attitude[8]** -- attitude/regard for each other civ (indexed by civ id). Determined by function FUN_004679ab. |
| 0x048  | `0064c6e8`        | 8     | byte[8] | **spy_operations[8]** -- per-civ espionage counter, incremented for spy missions |
| 0x050  | `0064c6f0`        | 8     | byte[8] | **border_friction[8]** -- border/proximity tensions. Incremented on unit movement near borders, reset on various events. Capped at 9. |

#### Tech Flags (offset 0x058, size 0x0C)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x058  | `0064c6f8`        | 12   | byte[12] | **tech_contact_flags** -- 96-bit bitmask. Encodes which techs/contacts this civ has. Copied during civ-splitting events. |

#### City/Unit Counts (offset 0x066, size 0x0E)

| Offset | Abs Addr (civ[0]) | Size | Type   | Name / Description |
|--------|-------------------|------|--------|--------------------|
| 0x066  | `0064c706`        | 2    | short  | **total_population** -- total food/population score. Used as `(pop * 10) / divisor` for rankings. |
| 0x068  | `0064c708`        | 2    | short  | **num_cities** -- number of cities. Incremented when city founded, decremented on loss. Checked `> 4` for AI decision making; `== 1` for special handling. |
| 0x06A  | `0064c70a`        | 2    | short  | **num_units** -- number of active units. Divided by 4 for some calculations. |
| 0x06C  | `0064c70c`        | 2    | short  | *(unknown counter)* |
| 0x06E  | `0064c70e`        | 2    | ushort | **military_power** -- aggregate military strength rating. Compared between civs to determine relative power. Used in AI diplomacy: `power_A * 2 < power_B` triggers various behaviors. |
| 0x070  | `0064c710`        | 2    | short  | **science_beakers_per_turn** -- science output per turn. Reset to 0 on initialization. |
| 0x072  | `0064c712`        | 2    | short  | **beaker_cost_current_tech** -- cost in beakers of current research. Updated: `if (cost * 10 < beakers) { cost = beakers / 10 }`. |

#### Tech Research Array (offset 0x074, size 0x5D = 93)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x074  | `0064c714`        | 93   | byte[93] | **tech_status[93]** -- one byte per tech (93 techs in rules). 0xFF = not discovered / not available. Set to specific values when tech acquired. |

#### Per-Civ Counter Arrays (3 x 0x36 = 54 bytes each)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x0D8  | `0064c778`        | 54   | byte[54] | **unit_count_by_type[54]** -- number of units owned of each unit type. Indexed by unit type id. Incremented/decremented on unit creation/destruction. |
| 0x116  | `0064c7b6`        | 54   | byte[54] | **unit_count_array2[54]** -- second per-type counter (possibly units under construction or total ever built) |
| 0x154  | `0064c7f4`        | 54   | byte[54] | **city_count_by_civ[54]** -- indexed by city owner? Or by type. Incremented when cities added. |

#### Wonders / Extra Fields (offset 0x105-0x191)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x105  | `0064c7a5`        | 1    | byte     | **has_space_ship** -- 0 = no spaceship, nonzero = has spaceship components. Used in AI treaty evaluation to adjust gold valuations. |
| 0x0F4  | `0064c794`        | 1    | byte     | **spaceship_structural** |
| 0x0F5  | `0064c795`        | 1    | byte     | **spaceship_component_1** |
| 0x0F7  | `0064c797`        | 1    | byte     | **spaceship_component_2** |
| 0x0F8  | `0064c798`        | 1    | byte     | **spaceship_part_a** |
| 0x0F9  | `0064c799`        | 1    | byte     | **spaceship_part_b** |
| 0x0FC  | `0064c79c`        | 1    | byte     | **spaceship_fuel_1** |
| 0x0FD  | `0064c79d`        | 1    | byte     | **spaceship_fuel_2** |
| 0x0FE  | `0064c79e`        | 1    | byte     | **spaceship_propulsion_1** |
| 0x0FF  | `0064c79f`        | 1    | byte     | **spaceship_propulsion_2** |
| 0x100  | `0064c7a0`        | 1    | byte     | **spaceship_habitation** |
| 0x104  | `0064c7a4`        | 1    | byte     | **spaceship_extra** |
| 0x16F  | `0064c80f`        | 1    | byte     | *(used in military calculation)* |
| 0x172  | `0064c812`        | 1    | byte     | *(used in military calculation)* |

#### Military Production Arrays (offset 0x192, size 0x402 = 1026)

| Offset | Abs Addr (civ[0]) | Size  | Type        | Name / Description |
|--------|-------------------|-------|-------------|--------------------|
| 0x192  | `0064c832`        | 0x201 | short[~256] | **units_produced_by_type** -- number of each unit type ever produced. Indexed `[unit_type * 2]`. Reset to 0 on initialization. Compared in AI diplomacy for military threat assessment. |
| 0x393  | `0064c8b2` (approx)| 0x201| short[~256] | **units_active_by_type** -- current active units by type. Similar indexing. |

#### Civ Footer Fields (around offset 0x3E0 - 0x593)

| Offset | Abs Addr (civ[0]) | Size  | Type     | Name / Description |
|--------|-------------------|-------|----------|--------------------|
| 0x3E2  | `0064ca82`        | 16    | short[8] | **last_contact_turn[8]** -- turn number when last had diplomatic contact with each civ. Set to `DAT_00655af8` (current turn). |
| 0x3F2  | `0064ca92`        | 1     | byte     | **leader_personality** -- copied from leader_graphic_id; modified +0x15 under certain conditions |
| 0x3F3  | `0064ca93`        | 8     | byte[8]  | **spy_level[8]** -- per-civ espionage infrastructure. Values 0-3 = no spy presence; >= 4 = active spies. Incremented on spy missions. |
| 0x3F6  | `0064ca96`        | 1     | byte     | **embassy_count_a** -- nonzero means embassy established in some context |
| 0x3F7  | `0064ca97`        | 1     | byte     | **embassy_count_b** |
| 0x3FA  | `0064ca9a`        | 1     | byte     | **embassy_count_c** |
| 0x3FB  | `0064ca9b`        | 1     | byte     | **wonder_flags** -- 7-bit bitmask tracking wonder-related states. Bit 0x01=has specific wonder, bits ORed when wonder built. `~val & 0x7f` checks for missing wonders. |
| 0x3FE  | `0064ca9e`        | 2     | short    | **current_research_slot** -- incremented as tech advances. Compared < 0x26 (38). |
| 0x400  | `0064caa0`        | 1     | byte     | **civ_state_flags** -- bitfield: bit 0x01=alive, bit 0x02=unknown, bit 0x04=has_started, bit 0x10=has_spaceship_launched |
| 0x402  | `0064caa2`        | 2     | short    | **civilization_score** -- displayed score/ranking value |
| 0x404  | `0064caa4`        | 2     | short    | **happy_citizens_total** -- total happy citizens across all cities |
| 0x406  | `0064caa6`        | 2     | short    | **pollution_total** -- total pollution. Multiplied by DAT_006ad0ec for global effects. |
| 0x408  | `0064caa8`        | var   | short[]  | **resource_counts[]** -- per-resource counters, indexed by resource type * 2 |

### Key Functions Referencing Civilization Struct

- **FUN_00473666** (block_00470000.c:1806) -- Save/load civilization data
- **FUN_004762b6** (block_00470000.c:2880) -- Recalculate unit/city counts
- **FUN_00450000+** (block_00450000.c:3580-6400) -- Diplomacy/AI treaty evaluation (heavy use of gold, rank, num_cities, military_power)
- **FUN_00460000+** (block_00460000.c:100-1200) -- War/peace decisions (diplomatic_status, gold, rank)
- **FUN_00400000+** (block_00400000.c:2720-3565) -- Tax/luxury/science rate management (tax_rate, luxury_rate, government_type)
- **FUN_00480000+** (block_00480000.c:2000-2500) -- Research progress (gold, research rank thresholds: 100, 2000, 8000)
- **FUN_004A0000+** (block_004A0000.c:2300-2700) -- Civ initialization/reset
- **FUN_00530000+** (block_00530000.c:530-830) -- Military production counting
- **FUN_00550000+** (block_00550000.c:1300-3030) -- Tech trading / civ splitting

---

## 2. Unit Type Table (Improvement Definitions from RULES.TXT)

- **Base address:** `0x0064C488`
- **Stride:** `0x08` (8 bytes)
- **Count:** 67 (`0x43` entries, iterated in IMPROVE section)
- **Loaded from:** RULES.TXT `[IMPROVE]` section (wonder/improvement definitions)
- **Name:** Despite the variable name suggesting "unit", this is the **Improvements/Wonders** type table (IMPROVE section of RULES.TXT)

### Field Map

| Offset | Abs Addr (entry[0]) | Size | Type  | Name / Description |
|--------|----------------------|------|-------|--------------------|
| 0x00   | `0064c488`           | 4    | ptr   | **name_string_ptr** -- pointer to improvement name string (allocated via thunk_FUN_004a26bf with max length 0x19=25 chars). Passed to thunk_FUN_00428b0c for display and thunk_FUN_0040ff00 for rendering. |
| 0x04   | `0064c48c`           | 1    | byte  | **cost** -- production cost (shields). Read from RULES.TXT. |
| 0x05   | `0064c48d`           | 1    | byte  | **maintenance** -- gold per turn maintenance cost. Read from RULES.TXT. |
| 0x06   | `0064c48e`           | 1    | sbyte | **prerequisite_tech** -- tech ID required to build (-3 = error/invalid, -1 = always available). Resolved through tech chain: while tech is valid and not yet researched, follows prerequisite chain via `DAT_0062768e[tech * 0x10]`. |
| 0x07   | `0064c48f`           | 1    |       | *(padding / unused)* |

### Notes

- The loop runs `local_8 < 0x43` (67 iterations), covering all improvements + wonders
- After the IMPROVE section, a second loop reads `ENDWONDER` section (28 entries, `0x1C`) into `DAT_0064ba28` -- this is the wonder-obsolete-tech table
- Improvement names passed to `thunk_FUN_004271e8` with different modes (0=buy, 1=build, 2=special display)
- Cross-referenced from unit instance via `(&DAT_006560f6)[unit * 0x20]` to look up what a unit can build in a city
- Cross-referenced from city struct via `(&DAT_006560f6)[city * 0x20]` for building availability

### Key Functions

- **FUN_0041a422** (block_00410000.c:5242) -- Loads IMPROVE section from RULES.TXT
- **thunk_FUN_00428b0c** -- Get improvement name string with formatting
- **thunk_FUN_0040ff00** -- Display improvement name
- **thunk_FUN_004271e8** -- Show improvement in UI (mode 0=buy context, 1=build context, 2=info)

---

## 3. Unit Type Table (Unit Definitions from RULES.TXT)

- **Base address:** `0x0064B1B8`
- **Stride:** `0x14` (20 bytes)
- **Count:** 62 (`0x3E` entries, looped as `local_8 < 0x3e`)
- **Loaded from:** RULES.TXT `[UNITS]` section

### Field Map

| Offset | Abs Addr (entry[0]) | Size | Type   | Name / Description |
|--------|----------------------|------|--------|--------------------|
| 0x00   | `0064b1b8`           | 4    | ptr    | **name_string_ptr** -- pointer to unit name string (allocated via thunk_FUN_004a26bf, max 0xF=15 chars). Used for display. |
| 0x04   | `0064b1bc`           | 4    | uint   | **flags** -- 16-bit flags masked to `& 0xFFFF`. Bit meanings: 0x01=land_unit, 0x02=sea_unit, 0x04=submarine, 0x08=can_carry_air, 0x10=unknown, 0x20=settlers_type, 0x40=can_carry_land, 0x80=ignore_zones_of_control. High byte (0064b1bd): 0x01=foot_unit, 0x02=two_space, 0x04=pikeman_bonus, 0x08=unknown, 0x20=alpine, 0x40=cruise_missile_type. |
| 0x08   | `0064b1c0`           | 1    | sbyte  | **prerequisite_tech** -- tech ID required (-3=error, 0xFE=never available). Resolved through tech chain. |
| 0x09   | `0064b1c1`           | 1    | byte   | **domain** -- 0=land, 1=sea, 2=air. Checked extensively in combat: sea units can't attack land, etc. |
| 0x0A   | `0064b1c2`           | 1    | byte   | **move_rate** -- movement points. Parsed value multiplied by `DAT_0064bcc8` (movement multiplier, likely 3 for road movement). Default 0. |
| 0x0B   | `0064b1c3`           | 1    | byte   | **range** -- operational range (for air units). Default 0. |
| 0x0C   | `0064b1c4`           | 1    | byte   | **attack** -- attack strength. Default 1. Value 0 = non-combat unit. |
| 0x0D   | `0064b1c5`           | 1    | byte   | **defense** -- defense strength. Default 0. Used in `(defense << 3) / firepower` calculation for AI. |
| 0x0E   | `0064b1c6`           | 1    | byte   | **hit_points** -- hit points. Parsed value multiplied by 10 (`cVar2 * '\n'`). Default 0. |
| 0x0F   | `0064b1c7`           | 1    | byte   | **firepower** -- firepower rating. Default 0. |
| 0x10   | `0064b1c8`           | 1    | byte   | **cost** -- production cost (shields). Computed via FUN_00419cf4(1, 200). Default 1. |
| 0x11   | `0064b1c9`           | 1    | byte   | **hold** -- cargo/hold capacity. Default 0. |
| 0x12   | `0064b1ca`           | 1    | byte   | **role** -- AI role/category: 0=attack, 1=defense, 5=settler, 6=diplomat, 7=trade/caravan. Extensively used in AI logic. |
| 0x13   | `0064b1cb`           | 1    | sbyte  | **obsolete_tech** -- tech ID that makes this unit obsolete (0xFE = never obsolete, -3 = error). Default 0xFE. |

### Notes

- Unused slots (beyond the RULES.TXT entries) are initialized with name "Unit %d", attack=0, defense=0, move=0, cost=1, role=0xFE
- The unit type is cross-referenced from unit instances via `(&DAT_006560f6)[unit * 0x20]` which stores the type ID
- `DAT_0066be90 + local_8 * 4` stores associated graphic/sprite pointers
- The `domain` field is critical: `1` = sea triggers isWater checks, `0` = land, air units have special zone rules

### Key Functions

- **FUN_0041a5c4** (block_00410000.c:5294) -- Loads UNITS section from RULES.TXT
- Combat resolution functions in block_00420000.c (lines 2440-2770) -- heavy use of attack, defense, domain, flags
- AI unit valuation in block_00430000.c (lines 5640-5660) -- uses defense, firepower, role
- Movement in block_00440000.c -- uses move_rate, domain, flags

---

## 4. Unit Instance Struct

- **Base address:** `0x006560F0`
- **Stride:** `0x20` (32 bytes)
- **Count:** variable, stored in `DAT_00655b16`
- **Save file:** `0x1E` bytes read per unit (30 bytes) in newer save format (version >= 0x29); `0x1A` bytes (26 bytes) in older format
- **Note:** Fields at `0x00656100+` are at offset +0x10 from the struct base, confirming the struct base is `0x006560F0`

### Field Map

| Offset | Abs Addr (unit[0]) | Size | Type   | Name / Description |
|--------|--------------------|------|--------|--------------------|
| 0x00   | `006560f0`         | 2    | short  | **x** -- map X coordinate. Used in movement, combat, and pathfinding. |
| 0x02   | `006560f2`         | 2    | short  | **y** -- map Y coordinate. |
| 0x04   | `006560f4`         | 2    | ushort | **status_flags** -- bitfield controlling unit state. Bit 0x0002=veteran, 0x0004=has_order, 0x0020=fortified, 0x2000=paradropped_this_turn, 0x4000=unknown, 0x8000=damage_flag. Cleared with `& 0xBFFF` (clear bit 14), `& 0x7FFF` (clear damage), `& 0xFFDF` (clear fortify), `& 0xFFFD` (clear veteran). |
| 0x06   | `006560f6`         | 1    | byte   | **type_id** -- unit type index into the Unit Type Table (0x0064b1b8). Value 0x09 checked for diplomat. Value 0x31 (49) is a specific unit type. Cross-references: `(&DAT_0064b1b8 + type_id * 0x14)` for stats, `(&DAT_0064b1c1)[type_id * 0x14]` for domain. |
| 0x07   | `006560f7`         | 1    | sbyte  | **owner** -- owning civilization index (0-7). Compared with `DAT_006d1da0` (current human player) and `DAT_0064bcba`. Used to index into civ array. |
| 0x08   | `006560f8`         | 1    | byte   | **moves_remaining** -- movement points left this turn. Set to 0 when exhausted. Incremented by `DAT_0064bcc8` (movement multiplier) when traversing roads. Checked `!= 0` to determine if unit can still move. |
| 0x09   | `006560f9`         | 1    | byte   | **visibility_mask** -- bitmask of which civs can see this unit. Bit N = visible to civ N. ORed with `1 << civ_id` when spotted; ANDed to check if visible. |
| 0x0A   | `006560fa`         | 1    | byte   | **hit_points_remaining** -- current HP. Decremented in combat, healed over time. Loaded/saved with "UNITHITPOINTS" string label. Compared with unit type's max HP. Value 0 = unit destroyed. `> 4` checked for some AI decisions. Healed: `hp + damage/10`. |
| 0x0B   | `006560fb`         | 1    | sbyte  | **carrying_unit / transport_link** -- index of transport unit or carried unit. 0xFF = not carried / no transport. XORed with 4 to check transport compatibility. Set to 0xFF on unload. -1 (signed) = no link. |
| 0x0C   | `006560fc`         | 1    | byte   | **ai_role / activity** -- AI-assigned role/activity code. Set to various ASCII-like values: 0x37='7', 0x3F='?', 0x21='!', 0x55='U', 0x48='H', 0x68='h', 0x44='D', 0x74='t', 0x46='F', 0x62='b', 0x41='A', 0x33='3', 0x32='2', 100='d'. These appear to be AI activity codes for different behaviors. |
| 0x0D   | `006560fd`         | 1    | sbyte  | **home_city** -- index of home city (-1 = no home). Used to check caravan destination. Cross-referenced with city struct `(&DAT_0064f37b)[city * 0x58 + offset]`. |
| 0x0E   | `006560fe`         | 1    | byte   | **fuel / turns_remaining** -- fuel counter for air units, or turns of settler activity remaining. Decremented each turn; when reaches 0, unit returns/crashes. Set to 5 or 10 based on unit type. Modified by difficulty level. Capped at 0x2F (47). |
| 0x0F   | `006560ff`         | 1    | byte   | **orders** -- current order/state: 0x02=fortified, 0x03=goto (if domain allows), 0x0B=build_city, 0xFF=no_orders/sentry. Bottom nibble `& 0xF` checked for states. Set to 0xFF to cancel orders. |
| 0x10   | `00656100`         | 1    | byte   | **goto_turn_counter / task_target** -- 0xFF = empty/unused. Set to specific values during transport operations. Compared as `!= -1` for valid state. For AI: tracks current task assignment. |
| 0x12   | `00656102`         | 2    | short  | **goto_x** -- destination X for goto orders |
| 0x14   | `00656104`         | 2    | short  | **goto_y** -- destination Y for goto orders |
| 0x16   | `00656106`         | 2    | short  | **link_prev** -- linked list previous pointer (0xFFFF = none). Set to -1 on unit death. |
| 0x18   | `00656108`         | 2    | short  | **link_next** -- linked list next pointer (0xFFFF = none). Set to -1 on unit death. |
| 0x1A   | `0065610a`         | 4    | int    | **alive_flag** -- 0 = dead/empty slot, nonzero = alive. This is the primary "is unit valid" check used everywhere (`*(int *)(&DAT_0065610a + idx * 0x20) != 0`). May also encode some state bits. |

### Notes

- Units are stored in a flat array; iteration checks `alive_flag != 0` to skip dead/empty slots
- The save format grew from 0x1A to 0x1E bytes between versions, adding the goto fields
- The linked list (link_prev/link_next) chains units on the same tile
- `DAT_00655b16` stores the total number of unit slots allocated
- Unit creation: find empty slot where alive_flag==0, fill in fields
- Unit death: set alive_flag=0, link_prev=-1, link_next=-1, counter=0xFF

### Key Functions

- **FUN_00473666** (block_00470000.c:1720) -- Save/load unit data
- **FUN_0042xxxx** (block_00420000.c:2440-2770) -- Combat processing (type_id -> lookup attack/defense)
- **FUN_00440xxx** (block_00440000.c:140-530) -- Unit movement and orders
- **FUN_00460xxx** (block_00460000.c:1650-1700) -- AI unit management
- **FUN_004107xx** (block_00410000.c:7770) -- Unit death/cleanup

---

## 5. City Instance Struct (Bonus Discovery)

- **Base address:** `0x0064F340`
- **Stride:** `0x58` (88 bytes)
- **Count:** variable, stored in `DAT_00655b18`
- **Save file:** `DAT_00655b18 * 0x58` bytes as a single block

### Field Map

| Offset | Abs Addr (city[0]) | Size | Type   | Name / Description |
|--------|--------------------|------|--------|--------------------|
| 0x00   | `0064f340`         | 2    | short  | **x** -- city map X coordinate |
| 0x02   | `0064f342`         | 2    | short  | **y** -- city map Y coordinate |
| 0x04   | `0064f344`         | 4    | uint   | **flags** -- city state bitfield. Bit 0x20000 toggled for WeLoveDay, etc. |
| 0x07   | `0064f347`         | 1    | byte   | **city_flags2** -- bit 0x04 = some special city status |
| 0x08   | `0064f348`         | 1    | sbyte  | **owner** -- owning civilization index (0-7). Cross-ref: `(&DAT_0064c6b0)[owner * 0x594]` for civ rank. |
| 0x09   | `0064f349`         | 1    | sbyte  | **size** -- city population size (1+). Used extensively: `size < 3` for small city, `size > 7` for large. Controls number of workers, resource calculations. `size << 3` = food storage capacity. |
| 0x0C   | `0064f34c`         | 1    | byte   | **specialist_mask** -- bitmask of which citizens are specialists. Bit set = specialist on that slot. |
| 0x0D   | `0064f34d`         | var  | byte[] | **specialist_types[]** -- per-citizen specialist assignment (indexed by citizen slot) |
| 0x20   | `0064f360`         | var  |        | **city_name_ptr / display_data** -- passed to thunk_FUN_0040bbe0 for display |
| 0x39   | `0064f379`         | 1    | sbyte  | **building_what** -- what the city is currently producing (negative = unit, positive = improvement). Cross-refs to unit type table: `(char)(&DAT_0064f379)[city * 0x58] * -8` indexes DAT_0064c488. |
| 0x3B   | `0064f37b`         | var  | byte[] | **building_slots[]** -- buildings present in city, indexed by building id |
| 0x52   | `0064f392`         | 1    | sbyte  | **food_surplus** -- excess food per turn (food - consumption) |
| 0x53   | `0064f393`         | 1    | sbyte  | **food_consumed** -- food consumed per turn |
| 0x54   | `0064f394`         | 4    | int    | **alive_flag** -- 0 = empty slot, nonzero = active city |

### Key Functions

- **FUN_00473666** -- Save/load city data
- **FUN_00430000+** (block_00430000.c) -- City management, production, resources (extensively uses all fields)
- **FUN_0043xxxx** -- City display and specialist management

---

## 6. Global Variables of Interest

| Address       | Type    | Name / Description |
|---------------|---------|--------------------|
| `DAT_006d1da0`| int     | **current_player** -- index (0-7) of the currently active player |
| `DAT_00655af8`| short   | **current_turn** -- current game turn number |
| `DAT_00655b03`| byte    | **active_civ** -- currently processing civilization |
| `DAT_00655b04`| byte    | **human_player_id** -- which player index is human |
| `DAT_00655b07`| byte    | **god_mode** -- cheat/debug flag |
| `DAT_00655b0a`| byte    | **active_civs_bitmask** -- bitmask of which player slots are active |
| `DAT_00655b0b`| byte    | **human_civs_bitmask** -- bitmask of which slots are human-controlled |
| `DAT_00655b0d`| byte    | **num_ai_players** -- number of AI players |
| `DAT_00655b16`| short   | **num_unit_slots** -- total number of unit instance slots |
| `DAT_00655b18`| short   | **num_city_slots** -- total number of city instance slots |
| `DAT_00655c20`| byte    | **ai_current** -- AI player being processed |
| `DAT_0064bcba`| byte    | **some_civ_reference** -- secondary civ index used in display |
| `DAT_0064bcc8`| byte    | **movement_multiplier** -- multiplier for base movement (likely 3 for road bonus) |
| `DAT_0064b118`| int     | **treaty_cost** -- gold cost of current diplomatic treaty being negotiated |
| `DAT_0064b0ec`| int     | **ai_target** -- target for AI operations |
| `DAT_0064b0fc`| int     | **ai_ally** |
| `DAT_0064b100`| int     | **ai_enemy** |
| `DAT_0064b11c`| int     | **scenario_flag** |
| `DAT_00655b02`| byte    | **save_format_version** -- determines how data is read from save files |

---

## 7. Wonder Obsolescence Table

- **Base address:** `0x0064BA28`
- **Count:** 28 (`0x1C`)
- **Entry size:** 1 byte
- **Loaded from:** RULES.TXT `[ENDWONDER]` section

Each byte is the tech ID that makes the corresponding wonder obsolete (-3 = error).

---

## 8. Government Names Table

- **Base address:** `0x0064B9A0`
- **Stride:** 4 bytes (pointer to string)
- **Indexed by:** government_type field from Civilization struct (offset 0x15)

---

## Cross-Reference: How Structs Link Together

1. **Unit -> Unit Type:** `unit.type_id` (offset 0x06) indexes into Unit Type Table at `0x0064B1B8 + type_id * 0x14`
2. **Unit -> Owner Civ:** `unit.owner` (offset 0x07) indexes into Civilization array at `0x0064C6A0 + owner * 0x594`
3. **City -> Owner Civ:** `city.owner` (offset 0x08) indexes into Civilization array
4. **City -> Building Type:** `city.building_what` (offset 0x39) negative values index into Improvement table at `0x0064C488 + (-type) * 8`; positive values into Unit Type table
5. **Civ -> Leader Portrait:** `civ.leader_graphic_id` (offset 0x06) indexes into `DAT_006554FC + id * 0x30`
6. **Civ -> Research Tech:** `civ.researching_tech` (offset 0x0A) indexes into tech table at `DAT_00627684 + tech * 0x10`
7. **Improvement -> Obsolescence:** Improvement's prerequisite_tech chains through `DAT_0062768e[tech * 0x10]`


---

# Part IV: Game Formulas & Mechanics

> **Source**: `reverse_engineering/Civ2_Game_Formulas.md`
>
> Contains 7 major game formulas reverse-engineered from the Civ2 MGE executable via Ghidra
> decompilation. Each formula includes the original decompiled C pseudocode, a plain-English
> explanation, and a ready-to-use JavaScript implementation. Also includes the complete COSMIC
> constants table and all relevant struct field references.
>
> For the data structures these formulas operate on, see [Part III](#part-iii-data-structures).
> For the integration plan to use these formulas in the browser game, see [Part VIII](#part-viii-integration-roadmap).

# Civ2 MGE Game Formulas - Extracted from Decompiled Code

This document contains key game formulas reverse-engineered from the Civ2 MGE executable
using Ghidra decompilation. Each section includes the decompiled pseudocode, a plain-English
explanation, and JavaScript implementation.

---

## Key Data Structures and Constants

### Global Variable Map

From `FUN_00419d23` (COSMIC rules loading at `block_00410000.c`):

| Variable | COSMIC Index | Default | Range | Meaning |
|----------|-------------|---------|-------|---------|
| `DAT_0064bcc8` | 0 | 1 | 1-10 | Road movement multiplier |
| `DAT_0064bcc9` | 1 | 1 | 1-100 | (unused/trade route related) |
| `DAT_0064bcca` | 2 | 0 | 0-10 | Riot factor (citizens per city for WLTKD) |
| `DAT_0064bccb` | 3 | 4 | 4-20 | **Food box size factor** (forced even) |
| `DAT_0064bccc` | 4 | 4 | 4-20 | **Shield box size factor** |
| `DAT_0064bccd` | 5 | 0 | 0-10 | Tech transfer rate (same continent) |
| `DAT_0064bcce` | 6 | 0 | 0-10 | Tech transfer rate (different continent) |
| `DAT_0064bccf` | 7 | 4 | 4-12 | **Content citizens base** |
| `DAT_0064bcd0` | 8 | 10 | 10-100 | **Unhappiness offset** |
| `DAT_0064bcd1` | 9 | 4 | 4-50 | (related to city radius) |
| `DAT_0064bcd2` | 10 | 4 | 4-50 | (related to city radius) |
| `DAT_0064bcd3` | 11 | 3 | 3-10 | **Tech cost multiplier** (tenths) |
| `DAT_0064bcd4` | 12 | 5 | 5-100 | (future tech cost?) |
| `DAT_0064bcd5` | 13 | 0 | 0-8 | **Free support: Monarchy** (case 2) |
| `DAT_0064bcd6` | 14 | 0 | 0-8 | **Free support: Communism** (case 3) |
| `DAT_0064bcd7` | 15 | 0 | 0-8 | **Free support: Fundamentalism** |
| `DAT_0064bcd8` | 16 | 1 | 1-20 | **Communism corruption equiv. distance** |
| `DAT_0064bcd9` | 17 | 0 | 0-100 | **Fundamentalism science penalty percent** |
| `DAT_0064bcda` | 18 | 0 | 0-100 | (related to combat) |
| `DAT_0064bcdb` | 19 | 4 | 4-100 | (city related) |
| `DAT_0064bcdc` | 20 | 25 | 25-200 | (movement related) |
| `DAT_0064bcdd` | 21 | 0 | 0-10 | **Max science rate under Fundamentalism** |

### City Struct Layout (stride = 0x58 = 88 bytes, base = `DAT_0064f340`)

| Offset | Variable | Type | Meaning |
|--------|----------|------|---------|
| +0x00 | `DAT_0064f340` | short | City X coordinate |
| +0x02 | `DAT_0064f342` | short | City Y coordinate |
| +0x04 | `DAT_0064f344` | uint32 | City flags bitfield |
| +0x08 | `DAT_0064f348` | byte | Owner civ index |
| +0x09 | `DAT_0064f349` | byte | **City population (size)** |
| +0x1A | `DAT_0064f35a` | short | **Food stored** |
| +0x1C | `DAT_0064f35c` | short | **Shields stored** |
| +0x1E | `DAT_0064f35e` | short | Trade (gross) |
| +0x20 | `DAT_0064f360` | char[] | City name string |
| +0x34 | `DAT_0064f374` | byte[5] | **Building flags** (bitfield) |
| +0x39 | `DAT_0064f379` | byte | **Currently building** (neg=unit) |
| +0x3A | `DAT_0064f37a` | byte | Trade route count |
| +0x4A | `DAT_0064f38a` | short | Luxury output |
| +0x4C | `DAT_0064f38c` | short | Science output |
| +0x4E | `DAT_0064f38e` | short | Gold (tax) output |
| +0x50 | `DAT_0064f390` | byte | Food surplus |
| +0x51 | `DAT_0064f391` | byte | Shield surplus |
| +0x52 | `DAT_0064f392` | byte | **Happy citizens** |
| +0x53 | `DAT_0064f393` | byte | **Unhappy citizens** |
| +0x54 | `DAT_0064f394` | int | (city exists flag) |

### Civ Struct Layout (stride = 0x594 = 1428 bytes, base = `DAT_0064c6a0`)

| Offset | Variable | Type | Meaning |
|--------|----------|------|---------|
| +0x00 | `DAT_0064c6a0` | ushort | Civ flags |
| +0x02 | `DAT_0064c6a2` | int | **Gold treasury** |
| +0x08 | `DAT_0064c6a8` | short | **Research accumulated** |
| +0x0A | `DAT_0064c6aa` | short | **Current research target** (-1=none) |
| +0x10 | `DAT_0064c6b0` | byte | **Techs known (count A)** |
| +0x12 | `DAT_0064c6b2` | byte | **Techs known (count B)** |
| +0x13 | `DAT_0064c6b3` | byte | **Science rate** (tenths, 0-10) |
| +0x14 | `DAT_0064c6b4` | byte | **Tax rate** (tenths, 0-10); luxury = 10 - science - tax |
| +0x15 | `DAT_0064c6b5` | byte | **Government type** |

### Government Type Values

| Value | Government |
|-------|-----------|
| 0 | Anarchy |
| 1 | Despotism |
| 2 | Monarchy |
| 3 | Communism |
| 4 | Fundamentalism |
| 5 | Republic |
| 6 | Democracy |

### Other Globals

| Variable | Meaning |
|----------|---------|
| `DAT_00655b08` | **Difficulty level** (0=Chieftain, 5=Deity) |
| `DAT_00655b0b` | **Human player bitmask** |
| `DAT_00655b18` | Max number of cities |
| `DAT_00655b16` | Max number of units |
| `DAT_006d1da0` | **Current player civ index** |
| `DAT_00655af8` | **Current turn number** |

### Building Improvement IDs (param_2 to `FUN_0043d20a`)

| ID | Building |
|----|----------|
| 0x01 (1) | Palace |
| 0x04 (4) | Temple |
| 0x05 (5) | Marketplace |
| 0x06 (6) | Library |
| 0x07 (7) | Courthouse |
| 0x0A (10) | Bank |
| 0x0B (11) | Cathedral |
| 0x0C (12) | University |
| 0x0D (13) | Mass Transit |
| 0x0E (14) | Colosseum |
| 0x0F (15) | Factory |
| 0x10 (16) | Manufacturing Plant |
| 0x11 (17) | SDI Defense |
| 0x12 (18) | Recycling Center |
| 0x13 (19) | Power Plant |
| 0x14 (20) | Hydro Plant |
| 0x15 (21) | Nuclear Plant |
| 0x16 (22) | Stock Exchange |
| 0x18 (24) | Supermarket |
| 0x19 (25) | Superhighways |
| 0x1A (26) | Research Lab |
| 0x1D (29) | Solar Plant |
| 0x1E (30) | Harbor (food+1 ocean) |
| 0x1F (31) | Offshore Platform (shield+1 ocean) |
| 0x20 (32) | Airport |
| 0x21 (33) | Police Station |
| 0x22 (34) | Port Facility |

---

## 1. Production Rush-Buy Cost

**Function:** `city_button_buy` at `0x00509B48` in `block_00500000.c`

### Decompiled Pseudocode (cleaned up)

```c
// city_button_buy @ 0x509B48
void city_button_buy(int param_1) {
    int city_idx = get_current_city();
    int civ_idx = city[city_idx].owner;
    int building_id = city[city_idx].currently_building;  // DAT_0064f379

    int total_cost;
    int remaining_shields;
    int shields_stored = city[city_idx].shields_stored;    // DAT_0064f35c

    if (building_id < 0) {
        // UNIT production (building_id is negative, negate to get unit type)
        int unit_type = -building_id;
        int unit_shield_cost = unit_table[unit_type].shield_cost;  // DAT_0064c48c[type*8]
        remaining_shields = clamp(
            shield_box_factor * unit_shield_cost - shields_stored,
            0, 999
        );
        total_cost = remaining_shields * 2;

        // WONDER multiplier: if unit_type > 0x22 (wonders)
        if (unit_type > 0x22) {
            total_cost = remaining_shields * 4;  // 4x for wonders
        }
    }
    else {
        // BUILDING/IMPROVEMENT production
        int bldg_shield_cost = building_table[building_id].shield_cost;  // DAT_0064b1c8[id*0x14]
        remaining_shields = clamp(
            shield_box_factor * bldg_shield_cost - shields_stored,
            0, 999
        );
        // Quadratic formula for buildings
        total_cost = (remaining_shields * remaining_shields) / 20 + remaining_shields * 2;
    }

    // If no shields invested yet, DOUBLE the cost
    if (shields_stored == 0) {
        total_cost = total_cost * 2;
    }

    // Check if player can afford it
    if (total_cost <= civ[civ_idx].gold) {
        // Buy it: deduct gold, complete production
        civ[civ_idx].gold -= total_cost;
        city[city_idx].shields_stored = shield_box_factor * shield_cost;
    }
}
```

### Key Lines from Decompiled Code

```c
// Unit formula (line 4568):
local_35c = iVar5 * 2;        // cost = remaining * 2
if (0x22 < -iVar4) {           // if wonder
    local_35c = iVar5 << 2;   // cost = remaining * 4
}

// Building formula (line 4582):
local_35c = (iVar5 * iVar5) / 0x14 + iVar5 * 2;  // cost = remaining^2/20 + remaining*2

// Double if nothing invested (line 4587):
if (shields_stored == 0) {
    local_35c = local_35c << 1;  // cost *= 2
}
```

### Plain English

- **Units:** Cost = 2 gold per remaining shield
- **Buildings/Improvements:** Cost = (remaining^2 / 20) + (2 * remaining) -- a quadratic formula
- **Wonders:** Cost = 4 gold per remaining shield
- **No investment penalty:** If zero shields have been accumulated, the total cost is doubled
- `shield_box_factor` (`DAT_0064bccc`, default 10) multiplied by the item's base cost gives total shields needed

### JavaScript Implementation

```javascript
function calculateBuyCost(item, shieldsStored, shieldBoxFactor = 10) {
    const totalShieldsNeeded = shieldBoxFactor * item.shieldCost;
    const remaining = Math.max(0, Math.min(999, totalShieldsNeeded - shieldsStored));

    let cost;
    if (item.type === 'unit') {
        cost = remaining * 2;
    } else if (item.type === 'wonder') {
        cost = remaining * 4;
    } else {
        // Building: quadratic formula
        cost = Math.floor(remaining * remaining / 20) + remaining * 2;
    }

    // Double cost if no shields invested
    if (shieldsStored === 0) {
        cost *= 2;
    }

    return cost;
}
```

---

## 2. Food Storage / City Growth

**Function:** `FUN_004e7eb1` at `0x004E7EB1` (food box calculation)
**Function:** turn processing in `block_004E0000.c` line 4656 (growth check)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e7eb1 @ 0x4E7EB1 - Calculate food box size
void calculate_food_box(int city_idx, int civ_idx) {
    int food_box_factor = COSMIC_food_box;  // DAT_0064bccb, default 10

    if (is_human_player(civ_idx)) {
        // Human player: use rules.txt value directly
        food_box_size = food_box_factor;
    } else {
        // AI: adjusted by difficulty
        food_box_size = 13 - difficulty_level;  // DAT_00655b08
        if (difficulty_level < 3) {
            food_box_size = 14 - difficulty_level;
        }
        if (difficulty_level == 0) {
            food_box_size += 1;  // Chieftain bonus
        }

        // Late-game adjustment for AI (turn > 200, difficulty > 1)
        // Reduces food box based on diplomatic situation
        if (turn > 200 && difficulty > 1 && human_is_alive) {
            int adjust = clamp(diplomatic_factor, 0, 2);
            food_box_size -= adjust;
        }

        // Scale to rules.txt factor (if not default 10)
        if (food_box_factor != 10) {
            food_box_size = (food_box_factor * food_box_size) / 10;
            if (food_box_size & 1) food_box_size++;  // Force even
        }
    }
}

// Growth check (line 4656):
int food_needed = (city_population + 1) * food_box_size;
if (food_stored >= food_needed) {
    // City grows!
    city_population++;

    // Granary check (FUN_0043d20a with param 3 = granary):
    if (has_building(city_idx, GRANARY) || has_wonder_effect(civ_idx, PYRAMIDS)) {
        // Granary: store half the food box for new size
        food_stored = (city_population + 1) * (food_box_factor / 2);
    } else {
        food_stored = 0;
    }
}
```

### Key Lines from Decompiled Code

```c
// Food box needed to grow (line 4656):
iVar3 = ((char)(&DAT_0064f349)[param_1 * 0x58] + 1) * DAT_006a6560;

// Granary effect (line 4669-4670):
*(short *)(&DAT_0064f35a + param_1 * 0x58) =
    ((char)(&DAT_0064f349)[param_1 * 0x58] + 1) * (short)((int)(uint)DAT_0064bccb >> 1);
// That is: food_stored = (new_pop + 1) * (food_box_factor / 2)
```

### Plain English

- **Food box to grow:** `(population + 1) * food_box_size`
  - Default food_box_size = 10 for humans
  - AI gets difficulty-adjusted values (easier AI = bigger food box = slower growth)
- **Granary effect:** After growth, food stored = `(new_population + 1) * (food_box_factor / 2)`
  - With default factor of 10, that means granary stores `(pop+1) * 5` food
  - Effectively starts you at 50% of the next food box
- **Starvation:** If food surplus is negative, city shrinks (pop-1), and if pop reaches 0, city is destroyed

### JavaScript Implementation

```javascript
function calculateFoodBox(population, foodBoxFactor = 10) {
    return (population + 1) * foodBoxFactor;
}

function processFood(city, foodBoxFactor = 10) {
    const foodNeeded = calculateFoodBox(city.population, foodBoxFactor);

    if (city.foodStored >= foodNeeded) {
        // City grows
        city.population++;

        if (city.hasBuilding(GRANARY) || city.hasWonderEffect(PYRAMIDS)) {
            // Granary: keep half the food box
            city.foodStored = (city.population + 1) * Math.floor(foodBoxFactor / 2);
        } else {
            city.foodStored = 0;
        }
    } else if (city.foodSurplus < 0 && city.foodStored < 0) {
        // Starvation
        city.population--;
        city.foodStored = 0;
        if (city.population <= 0) {
            destroyCity(city);
        }
    }
}

// AI food box calculation
function calculateAIFoodBox(difficultyLevel, foodBoxFactor = 10) {
    let size = 13 - difficultyLevel;
    if (difficultyLevel < 3) size = 14 - difficultyLevel;
    if (difficultyLevel === 0) size += 1;

    if (foodBoxFactor !== 10) {
        size = Math.floor(foodBoxFactor * size / 10);
        if (size % 2 !== 0) size++;
    }
    return size;
}
```

---

## 3. Resource Calculation per Tile

**Function:** `FUN_004e868f` at `0x004E868F` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e868f @ 0x4E868F - Calculate resource output for a tile
// param_1 = city index, param_2 = tile offset (0-20), param_3 = resource type (0=food, 1=shields, 2=trade)
int get_tile_resource(int city_idx, int tile_offset, int resource_type) {
    int civ_idx = city[city_idx].owner;

    // Calculate actual tile coordinates using city radius spiral offsets
    // city_offset_x/y = CitySpiralDX/DY: signed byte arrays, 21 entries for city radius
    // tile_offset range: 0-20 (see "City Radius Spiral" in the City Record section)
    // city.x is in doubled-X coordinates (native save format)
    int tile_x = city[city_idx].x + city_offset_x[tile_offset];  // DAT_00628370 (CitySpiralDX)
    int tile_y = city[city_idx].y + city_offset_y[tile_offset];  // DAT_006283a0 (CitySpiralDY)

    int terrain_type = get_terrain_type(tile_x, tile_y);  // 0-10 (ocean=10, grassland=2, etc.)
    int special = get_special_resource(tile_x, tile_y);   // 0 or 1-10 (special resource)
    byte improvements = get_tile_improvements(tile_x, tile_y);

    // Base value from terrain table: terrain_table[(special * 11 + terrain_type) * 24 + resource_type]
    int output = terrain_table[(special * 11 + terrain_type) * 0x18 + resource_type];
    // DAT_00627cca is the terrain resource table base

    // Global doubling (DAT_00655b02 -- likely cheat/scenario flag)
    if (global_double_flag && scenario_flag) {
        output *= 2;
    }

    // ---- FOOD (resource_type == 0) ----
    if (resource_type == 0) {
        if (terrain_type == 10) {  // Ocean
            if (has_building(city_idx, 0x1E)) {  // Harbor
                output += 1;
            }
        } else {
            if (improvements & IRRIGATED) {  // bits 0x02 | 0x04
                output += irrigation_bonus[terrain_type];  // DAT_00627cd0[type*0x18]
                if (has_building(city_idx, 0x18)) {  // Supermarket
                    if (improvements & FARMLAND) {  // bit 0x08 | 0x02
                        output += output / 2;  // +50% (Supermarket with farmland)
                    }
                }
            }
        }
    }

    // ---- SHIELDS (resource_type == 1) ----
    else if (resource_type == 1) {
        if ((improvements & MINED) || (irrigated_and_no_mining_bonus)) {
            output += mining_bonus[terrain_type];  // DAT_00627cd1[type*0x18]
        }
        if (terrain_type == 2 && !has_ocean_shields(tile_x, tile_y)) {
            output = 0;  // Grassland without bonus shield resource
        }
        if (tile_offset == 20 && output == 0) {
            output = 1;  // City center always produces at least 1 shield
        }
    }

    // ---- TRADE (resource_type == 2) ----
    else if (resource_type == 2) {
        if (has_river(tile_x, tile_y)) {
            output += 1;  // River bonus
        }
        if (improvements & ROAD_OR_RAILROAD) {
            if (terrain_type < 3 || output > 0) {
                output += 1;  // Road/railroad trade bonus
            }
        }
        if (output > 0 && has_wonder_effect(city_idx, COLOSSUS)) {
            output += 1;  // Colossus
        }
    }

    // Railroad bonus for shields (resource_type == 1)
    if (resource_type == 1 && has_wonder_effect(city_idx, KING_RICHARDS)) {
        output += 1;
    }
    if (resource_type == 1) {
        if (improvements & RAILROAD) {
            output += output / 2;  // Railroad: +50% shields
        }
    }

    // Despotism penalty: any output > 2 gets -1 under Despotism/Anarchy
    if (output > 2 && !city_has_WLTKD(city_idx)) {
        if (government_type < 2) {  // Anarchy or Despotism
            output -= 1;
        }
    }

    // Trade government bonus
    if (output > 0 && resource_type == 2) {
        // Republic/Democracy: +1 trade per tile that produces trade
        if (government_type >= appropriate_threshold) {
            output += 1;
        }
    }

    // Superhighways (trade): +50%
    if (resource_type == 2 && (improvements & ROAD_OR_RAILROAD) &&
        has_building(city_idx, 0x19)) {
        output += output / 2;
    }

    // Pollution halves output
    if (improvements & POLLUTED) {
        output = (output + 1) >> 1;
    }

    if (output < 0) output = 0;
    return output;
}
```

### Key Lines from Decompiled Code

```c
// Base terrain lookup (line 3102):
local_10 = (int)(char)(&DAT_00627cca)[(iVar5 * 0xb + uVar7) * 0x18 + param_3];

// Irrigation food bonus (line 3123):
local_10 = local_10 + (char)(&DAT_00627cd0)[uVar7 * 0x18];

// Supermarket +50% (line 3130):
local_10 = local_10 + (local_10 >> 1);

// Mining shield bonus (line 3137):
local_10 = local_10 + (char)(&DAT_00627cd1)[uVar7 * 0x18];

// Railroad +50% shields (line 3178):
local_10 = local_10 + (local_10 >> 1);

// Despotism penalty (line 3185-3186):
if ((byte)government_type < 2) {
    local_10 = local_10 + -1;  // -1 for tiles producing 3+
}

// Republic/Democracy trade bonus (line 3196):
if (government_type >= threshold) {  // Republic(5) or Democracy(6)
    local_10 = local_10 + 1;
}

// Superhighways trade +50% (line 3201):
local_10 = local_10 + local_10 / 2;

// Pollution halves output (line 3204):
local_10 = local_10 + 1 >> 1;  // (output+1)/2 rounds up
```

### Plain English

1. Look up base food/shields/trade from the terrain table (11 terrain types x special resources)
2. Apply improvement bonuses: irrigation adds food (+ Supermarket +50% with farmland), mining adds shields, roads/rivers add trade
3. Apply wonder effects: Colossus +1 trade, King Richard's +1 shield
4. Railroad gives +50% to shield production
5. Despotism/Anarchy penalty: -1 on tiles producing 3+ (unless WLTKD)
6. Republic/Democracy: +1 trade on tiles producing trade
7. Superhighways +50% trade (with road/railroad)
8. Pollution halves all output (rounded up)

### JavaScript Implementation

```javascript
const TERRAIN_TABLE_SIZE = 0x18; // 24 bytes per entry

function getTileResource(city, tileOffset, resourceType, gameState) {
    const tileX = city.x + CITY_OFFSET_X[tileOffset];
    const tileY = city.y + CITY_OFFSET_Y[tileOffset];

    const terrainType = getTerrainType(tileX, tileY);
    const special = getSpecialResource(tileX, tileY);
    const improvements = getTileImprovements(tileX, tileY);
    const govType = gameState.civs[city.owner].government;

    // Base value from terrain table
    let output = TERRAIN_TABLE[(special * 11 + terrainType) * 24 + resourceType];

    // --- FOOD ---
    if (resourceType === 0) {
        if (terrainType === 10) { // Ocean
            if (cityHasBuilding(city, OFFSHORE_PLATFORM)) output += 1;
        } else if (improvements & IRRIGATED) {
            output += IRRIGATION_BONUS[terrainType];
            if (cityHasBuilding(city, SUPERMARKET) && (improvements & FARMLAND)) {
                output += Math.floor(output / 2); // +50%
            }
        }
    }

    // --- SHIELDS ---
    if (resourceType === 1) {
        if (improvements & MINED) {
            output += MINING_BONUS[terrainType];
        }
        if (terrainType === 2 && !hasOceanShields(tileX, tileY)) {
            output = 0;
        }
        if (tileOffset === 20 && output === 0) {
            output = 1; // City center minimum
        }
    }

    // --- TRADE ---
    if (resourceType === 2) {
        if (hasRiver(tileX, tileY)) output += 1;
        if (improvements & ROAD) {
            if (terrainType < 3 || output > 0) output += 1;
        }
        if (output > 0 && hasWonderEffect(city, COLOSSUS)) output += 1;
    }

    // King Richard's Crusade: +1 shield
    if (resourceType === 1 && hasWonderEffect(city, KING_RICHARDS)) output += 1;

    // Railroad: +50% shields
    if (resourceType === 1 && (improvements & RAILROAD)) {
        output += Math.floor(output / 2);
    }

    // Despotism/Anarchy penalty
    if (output > 2 && !city.weLoveTheKing && govType < 2) {
        output -= 1;
    }

    // Republic/Democracy trade bonus
    if (output > 0 && resourceType === 2 && govType >= 5) {
        output += 1;
    }

    // Superhighways: +50% trade
    if (resourceType === 2 && (improvements & ROAD) && cityHasBuilding(city, SUPERHIGHWAYS)) {
        output += Math.floor(output / 2);
    }

    // Pollution halves output
    if (improvements & POLLUTED) {
        output = (output + 1) >> 1;
    }

    return Math.max(0, output);
}
```

---

## 4. Happiness Calculation

**Function:** `FUN_004ea8e4` at `0x004EA8E4` in `block_004E0000.c` (2627 bytes -- the big happiness function)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004ea8e4 @ 0x4EA8E4 - Master happiness calculation
int calculate_happiness(int city_idx) {
    int civ_idx = city[city_idx].owner;
    int gov_type = civ[civ_idx].government;
    int population = city[city_idx].population;
    int difficulty = DAT_00655b08;

    // ============================================
    // STEP 1: Calculate initial unhappy citizens
    // ============================================
    int unhappy;

    if (!is_human(civ_idx)) {
        // AI: simpler calculation
        unhappy = (population - 1) - (COSMIC_content_base - 5);
        // DAT_0064bccf default 7 => content_base-5 = 2
    } else {
        // Human player
        // Empire-size spread (raging hordes adds 2 to spread, NOT to content base)
        int spread = COSMIC_unhappy_offset + difficulty * -2;   // DAT_0064bcd0
        if (DAT_00655af0 & 4) {  // raging hordes flag
            spread += 2;
        }
        int divisor = ((gov_type >> 1) + 2) * spread / 2;
        if (divisor < 2) divisor = 1;

        // Content citizens base
        int content_base = COSMIC_content_base - difficulty;   // DAT_0064bccf
        // Special case: Palace bonus for peaceful civs
        if (content_base < 3 && has_building(city_idx, PALACE) &&
            military_abroad == 0 && garrison_count == 0) {
            content_base = 2;
        }

        unhappy = (population - 1) - (content_base - 2);

        // Empire size penalty (Communism exempt)
        if (gov_type != COMMUNISM) {  // != 0x03
            unhappy += (civ[civ_idx].city_count - divisor + city_idx % divisor) / divisor;
        }
    }

    // Clamp: if unhappy > population, track surplus
    int surplus_unhappy = 0;
    if (population < unhappy) {
        surplus_unhappy = unhappy - population;
        unhappy = population;
    }

    // ============================================
    // STEP 2: Luxury effect (each 2 luxury = 1 happy)
    // ============================================
    happy = luxury_output / 2;   // DAT_006a65fc >> 1
    // FUN_004ea031 adjusts happy/unhappy balance

    // ============================================
    // STEP 3: Colosseum (building 0x0e = 14)
    // ============================================
    if (has_building(city_idx, COLOSSEUM)) {
        unhappy -= 3;
        if (has_tech(civ_idx, ELECTRONICS)) {  // tech 0x18 = 24
            unhappy -= 1;  // Colosseum + Electronics = 4 unhappy -> content
        }
    }

    // ============================================
    // STEP 4: Cathedral (building 0x0b = 11) or Michelangelo's (wonder 10)
    //   Prerequisite: Monotheism (tech 0x37 = 55), NOT Theology
    //   Effect: 2-4 depending on Theology and Communism techs
    // ============================================
    if (has_tech(civ_idx, MONOTHEISM) &&                           // tech 0x37 = 55
        (has_building(city_idx, CATHEDRAL) || has_wonder_effect(civ_idx, MICHELANGELOS))) {
        int effect = (has_tech(civ_idx, COMMUNISM_TECH) ? 0 : 1)  // tech 0x0f = 15: -1 if has
                   + (has_tech(civ_idx, THEOLOGY) ? 3 : 2);       // tech 0x52 = 82: +1 if has
        // Range: 2 (Communism, no Theology) to 4 (no Communism, has Theology)
        unhappy -= effect;
    }

    // ============================================
    // STEP 5: Temple (building 4)
    //   Base effect 0. +1 for Ceremonial Burial, +1 for Mysticism.
    //   Oracle doubles. In practice always >= 1 since Ceremonial Burial
    //   is a prerequisite for Temple.
    // ============================================
    if (has_building(city_idx, TEMPLE)) {
        int temple_effect = 0;
        if (has_tech(civ_idx, MYSTICISM)) temple_effect++;           // tech 0x38 = 56
        if (has_tech(civ_idx, CEREMONIAL_BURIAL)) temple_effect++;   // tech 9
        if (has_wonder_effect(civ_idx, ORACLE)) temple_effect *= 2;  // wonder 5
        unhappy -= temple_effect;
    }

    // ============================================
    // STEP 5b: City Walls / Palace bonus under Democracy
    // ============================================
    if ((has_building(city_idx, CITY_WALLS) || has_building(city_idx, PALACE)) &&
        gov_type == DEMOCRACY) {  // gov 0x06
        happy += 1;
    }

    // ============================================
    // STEP 6: Fundamentalism / Martial law / Military unhappiness
    // ============================================
    if (gov_type == FUNDAMENTALISM) {  // gov 0x04
        // Fundamentalism: no unhappy citizens at all
        surplus_unhappy = 0;
        unhappy = 0;
    }
    else if (gov_type < REPUBLIC) {  // gov < 5: Anarchy/Despotism/Monarchy/Communism
        // Martial law: military units in city suppress unhappiness
        int garrison = 0;
        for each military unit in city:
            garrison += 1;
            if (gov_type == COMMUNISM) garrison = prev + 2;  // each unit counts double
        int max_martial = 3;
        if (gov_type == COMMUNISM) max_martial = 6;  // effectively 3 units × 2
        garrison = min(garrison, max_martial);
        garrison = clamp(garrison, 0, unhappy);  // can't reduce below 0
        unhappy -= garrison;
    }
    else {  // Republic (0x05) / Democracy (0x06)
        int penalty;
        if (has_wonder_effect(civ_idx, WOMENS_SUFFRAGE) ||   // wonder 0x15 = 21
            has_building(city_idx, POLICE_STATION)) {         // building 0x21 = 33
            penalty = 0;
        } else {
            penalty = 1;
        }
        if (gov_type == DEMOCRACY) penalty++;  // Democracy: +1 per unit abroad

        if (penalty != 0) {
            int abroad = military_units_abroad;
            if (abroad != 0 && gov_type == REPUBLIC) {  // 0x05
                abroad -= 1;  // Republic: one free unit abroad
            }
            unhappy += penalty * abroad;
        }
    }

    // ============================================
    // STEP 7: Wonder effects
    // ============================================
    // Hanging Gardens (wonder 1): +1 happy empire-wide, +3 in wonder city
    if (has_wonder_effect(civ_idx, HANGING_GARDENS)) {  // wonder 1
        happy += 1;
        if (wonder_city(HANGING_GARDENS) == city_idx) {
            happy += 2;  // +3 total in wonder city
        }
    }

    // Cure for Cancer (wonder 0x1b = 27): +1 happy empire-wide
    if (has_wonder_effect(civ_idx, CURE_FOR_CANCER)) {  // wonder 27
        happy += 1;
    }

    // Shakespeare's Theatre (wonder 0x0d = 13): all unhappy -> content in wonder city
    if (wonder_city(SHAKESPEARES_THEATRE) == city_idx) {  // wonder 13
        unhappy = 0;
    }

    // J.S. Bach's Cathedral (wonder 0x0f = 15): -2 unhappy empire-wide
    if (has_wonder_effect(civ_idx, JS_BACHS_CATHEDRAL)) {  // wonder 15
        unhappy -= 2;
    }

    // Store results
    city[city_idx].happy_citizens = happy;
    city[city_idx].unhappy_citizens = unhappy;

    return happy - unhappy;  // Positive = content/happy city, negative = disorder
}
```

### Key Lines from Decompiled Code

```c
// Initial unhappy for AI (line 4077):
DAT_006a65a8 = ((char)(&DAT_0064f349)[param_1 * 0x58] + -1) - (DAT_0064bccf - 5);

// Initial unhappy for human (line 4093):
DAT_006a65a8 = (population - 1) - (content_base - 2);

// Raging hordes → adds to SPREAD, not content base (lines 4080-4083):
local_1c = DAT_0064bcd0 + DAT_00655b08 * -2;  // spread = unhappy_offset - 2*difficulty
if (DAT_00655af0 & 4) local_1c += 2;           // raging hordes adds to spread

// Government spread divisor (line 4084):
iVar5 = (int)((((int)(uint)(byte)government_type >> 1) + 2) * local_1c) / 2;

// Colosseum effect (line 4110):
DAT_006a65a8 = DAT_006a65a8 + -3;  // -3 unhappy
if (has_ELECTRONICS) DAT_006a65a8 -= 1;  // extra -1

// Cathedral effect (lines 4116-4122):
// Prerequisite: Monotheism (0x37 = 55), NOT Theology
// Effect = (no_Communism ? 1 : 0) + (has_Theology ? 3 : 2)  // range 2-4
DAT_006a65a8 -= ((uint)(iVar5 == 0) + (3 - (uint)(iVar6 == 0)));

// Temple effect (lines 4124-4136):
// Base 0. +1 for Mysticism (0x38=56), +1 for Ceremonial Burial (9). Oracle (wonder 5) doubles.
temple_happy = has_MYSTICISM + has_CEREMONIAL_BURIAL;
if (ORACLE) temple_happy *= 2;

// City Walls/Palace + Democracy = +1 happy (lines 4138-4142):
if ((CITY_WALLS || PALACE) && gov == DEMOCRACY) happy += 1;

// Fundamentalism: zeroes all unhappiness (lines 4144-4147):
if (gov == FUNDAMENTALISM) { surplus = 0; unhappy = 0; }

// Martial law (lines 4148-4167):
// Each military unit: +1 content (Communism: +2 per unit, max 6; others: max 3)
// Garrison clamped to [0, unhappy] via thunk_FUN_005adfa0
local_1c = 3;  // max 3 content from garrison
if (gov == COMMUNISM) local_1c = 6;  // Communism allows 6

// Military unhappiness under Rep/Demo (lines 4168-4186):
// Women's Suffrage (wonder 0x15 = 21) or Police Station (0x21 = 33): penalty = 0
// Democracy: penalty += 1. Republic: one free unit abroad.
if (gov >= REPUBLIC) {
    unhappy += abroad_modifier * military_units_abroad;
}

// Hanging Gardens (wonder 1, lines 4188-4195):
DAT_006a6550 += 1;  // +1 happy
if (wonder_city(1) == city_idx) DAT_006a6550 += 2;  // +3 total in wonder city

// Cure for Cancer (wonder 0x1b = 27, line 4198):
DAT_006a6550 += 1;  // +1 happy empire-wide

// Shakespeare's Theatre (wonder 0x0d = 13, line 4202):
if (wonder_city(0x0d) == city_idx) DAT_006a65a8 = 0;  // all unhappy -> content

// J.S. Bach's Cathedral (wonder 0x0f = 15, line 4206):
DAT_006a65a8 -= 2;  // -2 unhappy empire-wide
```

### We Love The King Day Conditions

From `handle_city_disorder_004ef578` at `0x4EF578` (line 5894):

```c
// WLTKD check:
if (unhappy_count == 0 &&               // No unhappy citizens
    population > 2 &&                    // Size 3+
    (population + 1) / 2 <= happy &&     // Half+ citizens are happy
    civ_alive) {                         // Civ exists
    // Trigger "We Love The King Day"
    city_flags |= 0x02;
}

// WLTKD growth under Democracy/Republic (line 5910-5914):
if (gov_type > 4 &&  // Republic or Democracy
    population * riot_factor + food_factor * settlers < city_food_threshold &&
    no_aqueduct_problem) {
    city_population++;  // Free growth during WLTKD!
}
```

### JavaScript Implementation

```javascript
function calculateHappiness(city, gameState) {
    const civ = gameState.civs[city.owner];
    const gov = civ.government;
    const pop = city.population;
    const diff = gameState.difficulty;
    const isHuman = gameState.humanBitmask & (1 << city.owner);

    let happy = 0;
    let unhappy = 0;

    // Step 1: Base unhappy count
    if (!isHuman) {
        unhappy = (pop - 1) - (COSMIC.contentBase - 5);
    } else {
        // Empire-size spread (raging hordes adds 2 to spread, not content base)
        let spread = COSMIC.unhappyOffset + diff * -2;
        if (gameState.ragingHordes) spread += 2;
        const divisor = Math.max(1, Math.floor(((gov >> 1) + 2) * spread / 2));

        // Content base
        let contentBase = COSMIC.contentBase - diff;
        if (contentBase < 3 && cityHasBuilding(city, PALACE) &&
            city.militaryAbroad === 0 && city.garrisonCount === 0) {
            contentBase = 2;
        }

        unhappy = (pop - 1) - (contentBase - 2);

        // Empire size penalty (Communism exempt)
        if (gov !== GOV.COMMUNISM) {
            unhappy += Math.floor((civ.cityCount - divisor + city.index % divisor) / divisor);
        }
    }

    // Clamp surplus
    let surplus = 0;
    if (pop < unhappy) { surplus = unhappy - pop; unhappy = pop; }

    // Step 2: Luxury
    happy = Math.floor(city.luxuryOutput / 2);

    // Step 3: Colosseum
    if (cityHasBuilding(city, COLOSSEUM)) {
        unhappy -= 3;
        if (civHasTech(civ, ELECTRONICS)) unhappy -= 1;
    }

    // Step 4: Cathedral (requires Monotheism, NOT Theology)
    if (civHasTech(civ, MONOTHEISM) &&
        (cityHasBuilding(city, CATHEDRAL) || hasWonderEffect(civ, MICHELANGELOS))) {
        let effect = (civHasTech(civ, COMMUNISM_TECH) ? 0 : 1)   // -1 with Communism
                   + (civHasTech(civ, THEOLOGY) ? 3 : 2);         // +1 with Theology
        unhappy -= effect;  // range 2-4
    }

    // Step 5: Temple (base 0, +1 Ceremonial Burial, +1 Mysticism, Oracle doubles)
    if (cityHasBuilding(city, TEMPLE)) {
        let effect = 0;
        if (civHasTech(civ, MYSTICISM)) effect++;
        if (civHasTech(civ, CEREMONIAL_BURIAL)) effect++;
        if (hasWonderEffect(civ, ORACLE)) effect *= 2;
        unhappy -= effect;
    }

    // Step 5b: City Walls/Palace under Democracy → +1 happy
    if ((cityHasBuilding(city, CITY_WALLS) || cityHasBuilding(city, PALACE)) &&
        gov === GOV.DEMOCRACY) {
        happy += 1;
    }

    // Step 6: Fundamentalism / Martial law / Military unhappiness
    if (gov === GOV.FUNDAMENTALISM) {
        surplus = 0;
        unhappy = 0;
    } else if (gov < GOV.REPUBLIC) {
        const maxGarrison = (gov === GOV.COMMUNISM) ? 6 : 3;
        let garrison = Math.min(countMilitaryInCity(city, gov === GOV.COMMUNISM), maxGarrison);
        garrison = clamp(garrison, 0, unhappy);
        unhappy -= garrison;
    } else {
        let penalty = (hasWonderEffect(civ, WOMENS_SUFFRAGE) ||
                       cityHasBuilding(city, POLICE_STATION)) ? 0 : 1;
        if (gov === GOV.DEMOCRACY) penalty++;
        if (penalty !== 0) {
            let abroad = city.militaryAbroad;
            if (abroad > 0 && gov === GOV.REPUBLIC) abroad--;  // one free unit
            unhappy += penalty * abroad;
        }
    }

    // Step 7: Wonders
    // Hanging Gardens (wonder 1): +1 happy, +3 in wonder city
    if (hasWonderEffect(civ, HANGING_GARDENS)) {
        happy += 1;
        if (getWonderCity(HANGING_GARDENS) === city.index) happy += 2;
    }
    // Cure for Cancer (wonder 27): +1 happy empire-wide
    if (hasWonderEffect(civ, CURE_FOR_CANCER)) happy += 1;
    // Shakespeare's Theatre (wonder 13): unhappy = 0 in wonder city
    if (getWonderCity(SHAKESPEARES_THEATRE) === city.index) unhappy = 0;
    // J.S. Bach's Cathedral (wonder 15): -2 unhappy empire-wide
    if (hasWonderEffect(civ, JS_BACHS_CATHEDRAL)) unhappy -= 2;

    // Clamp
    happy = clamp(happy, 0, pop);
    unhappy = clamp(unhappy, 0, pop);

    return { happy, unhappy, content: pop - happy - unhappy };
}
```

---

## 5. Corruption and Waste

**Function:** `FUN_004e989a` at `0x004E989A` (corruption calc)
**Function:** `FUN_004e9849` at `0x004E9849` (distance-to-government-factor)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e9849 @ 0x4E9849 - Government corruption divisor
int get_corruption_divisor(int city_idx, int gov_type) {
    int divisor = 4;                      // base
    if (gov_type > 0) divisor = 5;       // Despotism+
    if (gov_type > 1) divisor = 6;       // Monarchy+
    if (gov_type > 2) divisor = 7;       // Communism+
    if (gov_type > 4) divisor = 8;       // Republic+
    return divisor;
}

// FUN_004e989a @ 0x4E989A - Calculate corruption/waste
int calculate_corruption(int city_idx, int gross_trade, int is_shield_waste, int update_stats) {
    if (gross_trade < 1) return 0;

    int civ_idx = city[city_idx].owner;
    int gov_type = civ[civ_idx].government;

    // During "We Love The King Day", government counts as one level higher
    if (city_has_WLTKD(city_idx)) {
        gov_type++;
    }

    int corruption;

    // Communism uses flat rate based on COSMIC distance constant
    if (gov_type == COMMUNISM) {
        int distance = COSMIC_communism_equiv_distance;  // DAT_0064bcd8, default 10
        int divisor = get_corruption_divisor(city_idx, gov_type);
        corruption = (distance * gross_trade * 3) / (divisor * 20);
    }

    // Other governments: distance from capital matters
    if (gov_type != COMMUNISM) {
        int capital_distance = DAT_006a6588;
        // Capital distance capped at 16 for waste calculation
        if (is_shield_waste && capital_distance > 16) {
            capital_distance = 16;
        }

        int effective_distance = capital_distance;
        // Difficulty penalty for human under Despotism/Anarchy
        if (gov_type < 2 && effective_distance != 0 && is_human(civ_idx)) {
            effective_distance = clamp(difficulty + capital_distance, 0, 32);
        }

        int divisor = get_corruption_divisor(city_idx, gov_type);
        corruption = (effective_distance * gross_trade * 3) / (divisor * 20);
    }

    // Clamp corruption to not exceed gross_trade
    corruption = clamp(corruption, 0, gross_trade);

    // Courthouse or Palace halves corruption
    if (has_building(city_idx, COURTHOUSE) || has_building(city_idx, PALACE)) {
        corruption = corruption / 2;
    }

    return corruption;
}
```

### Key Lines from Decompiled Code

```c
// Corruption formula (line 3633):
local_10 = (local_1c * param_2 * 3) / (iVar3 * 0x14);
// That is: corruption = (distance * trade * 3) / (divisor * 20)

// Communism flat rate (line 3638):
local_24 = (int)(uVar4 * param_2 * 3) / (iVar3 * 0x14);
// uVar4 = DAT_0064bcd8 (communism equivalent distance)

// Courthouse halves corruption (line 3648-3649):
if (has_courthouse || has_palace) {
    corruption = corruption >> 1;  // halved
}

// Government divisor (FUN_004e9849):
// gov 0 (anarchy):      4
// gov 1 (despotism):     5
// gov 2 (monarchy):      6
// gov 3 (communism):     7
// gov 4 (fundamentalism):7
// gov 5+ (republic/demo):8
```

### Fundamentalism Science Penalty

From `FUN_004ea1f6` (line 3900):
```c
// Fundamentalism science penalty:
if (gov_type == FUNDAMENTALISM) {
    science_output -= (COSMIC_fundamentalism_penalty_pct * science_output) / 100;
    // DAT_0064bcd9, default 0 (but modifiable in rules.txt)
}
```

### Plain English

**Corruption formula:** `corruption = (distance * trade * 3) / (divisor * 20)`

Where:
- `distance` = distance to capital (or fixed COSMIC value for Communism)
- `trade` = gross trade output of the city
- `divisor` = government-dependent (Anarchy=4, Despotism=5, Monarchy=6, Communism=7, Republic/Democracy=8)

**Modifiers:**
- Courthouse or Palace: halves corruption
- Communism: uses a flat "equivalent distance" instead of real distance
- Difficulty penalty: human players under Despotism get extra corruption (distance + difficulty_level)
- We Love The King Day: government treated as one level higher (better corruption rate)

### JavaScript Implementation

```javascript
function getCorruptionDivisor(govType) {
    if (govType <= 0) return 4;   // Anarchy
    if (govType <= 1) return 5;   // Despotism
    if (govType <= 2) return 6;   // Monarchy
    if (govType <= 4) return 7;   // Communism, Fundamentalism
    return 8;                      // Republic, Democracy
}

function calculateCorruption(city, grossTrade, isShieldWaste, gameState) {
    if (grossTrade < 1) return 0;

    const civ = gameState.civs[city.owner];
    let govType = civ.government;

    // WLTKD bonus
    if (city.flags & WLTKD_FLAG) govType++;

    const divisor = getCorruptionDivisor(govType);
    let distance;

    if (govType === GOV.COMMUNISM) {
        distance = COSMIC.communismEquivDistance; // default 10
    } else {
        distance = city.distanceToCapital;
        if (isShieldWaste && distance > 16) distance = 16;

        // Human difficulty penalty under Despotism/Anarchy
        if (govType < 2 && distance > 0 && isHuman(city.owner)) {
            distance = clamp(gameState.difficulty + distance, 0, 32);
        }
    }

    let corruption = Math.floor((distance * grossTrade * 3) / (divisor * 20));
    corruption = clamp(corruption, 0, grossTrade);

    // Courthouse or Palace halves corruption
    if (cityHasBuilding(city, COURTHOUSE) || cityHasBuilding(city, PALACE)) {
        corruption = Math.floor(corruption / 2);
    }

    return corruption;
}
```

---

## 6. Technology Cost

**Function:** `FUN_004c2788` at `0x004C2788` in `block_004C0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004c2788 @ 0x4C2788 - Calculate tech cost in beakers
int calculate_tech_cost(int civ_idx) {
    int total_techs = civ[civ_idx].techs_known_A + civ[civ_idx].techs_known_B;
    if (total_techs < 2) total_techs = 1;

    int difficulty = DAT_00655b08;
    int base_cost;

    if (!is_human(civ_idx)) {
        // AI: lower cost that scales inversely with difficulty
        base_cost = 14 - clamp(difficulty, 0, 4);
    } else {
        // Human: higher cost that scales with difficulty
        base_cost = difficulty * 2 + 6;
    }

    // Catch-up mechanic: compare to most advanced civ
    int leader_techs = civs[most_advanced_civ].techs_A + civs[most_advanced_civ].techs_B;

    if (!(scenario_flags & 0x80) || !custom_tech_rate) {
        if (total_techs < leader_techs) {
            // Behind: reduce cost
            if (difficulty != 0) base_cost--;
            if (difficulty == 5 && total_techs + 4 < leader_techs && turn > 150) {
                base_cost--;  // Extra Deity catchup
            }
        } else {
            // Ahead: increase cost based on lead
            base_cost += (total_techs - leader_techs) / 3;
        }

        // Late-game scaling: penalize if > 19 techs
        int late_penalty = 0;
        if (total_techs > 19) {
            late_penalty = clamp(total_techs - (turn / 8), 0, 6);
        }
        base_cost += late_penalty;
    }

    // Apply COSMIC tech rate multiplier (default 3 = 30%, so *3/10)
    if (!(scenario_flags & 0x80)) {
        if (COSMIC_tech_multiplier != 10) {
            base_cost = (COSMIC_tech_multiplier * base_cost) / 10;
        }
    } else {
        if (custom_tech_rate != 10) {
            base_cost = (custom_tech_rate * base_cost) / 10;
        }
    }

    // Apply modifier: add 75% of base
    int modifier = (base_cost * 3) >> 2;  // 75% of base
    if (total_techs < 20) {
        modifier = (total_techs * modifier) / 20;  // Scale down for early game
    }
    base_cost += modifier;

    // Cap adjustment for max tech count
    if (max_tech_id > 67) {
        base_cost = (base_cost * 67) / max_tech_id;
    }

    // Raging hordes adjustment
    if (raging_hordes_flag) {
        base_cost = (base_cost * 5 + 3) / 4;  // +25%
    }
    // Simplified flag
    if (simplified_flag) {
        base_cost = (base_cost * 4) / 5;  // -20%
    }

    // Minimum cost for human player
    if (is_human(civ_idx) && base_cost < (11 - total_techs)) {
        base_cost = 11 - total_techs;
    }

    // Final cost = base * number of techs known
    int final_cost = base_cost * total_techs;

    if (final_cost < 1 || final_cost > 32000) {
        final_cost = 32000;
    }

    return final_cost;
}
```

### Key Lines from Decompiled Code

```c
// Tech count (line 959):
uVar1 = techs_A + techs_B;
if (uVar1 < 2) uVar1 = 1;

// AI base cost (line 966):
local_14 = 0xe - local_14;  // 14 - difficulty

// Human base cost (line 969):
local_14 = local_14 * 2 + 6;  // difficulty*2 + 6

// COSMIC multiplier (line 998):
local_14 = (COSMIC_tech_multiplier * local_14) / 10;

// 75% modifier (line 1004):
local_1c = local_14 * 3 >> 2;

// Early game scaling (line 1007):
local_1c = (total_techs * local_1c) / 20;

// Final cost (line 1024):
local_18 = local_14 * uVar1;  // base_rate * total_techs
```

### Plain English

The tech cost formula has several layers:

1. **Base rate** depends on difficulty: Human gets `difficulty * 2 + 6`, AI gets `14 - difficulty`
2. **Catch-up mechanic:** If behind the tech leader, cost decreases; if ahead, it increases
3. **COSMIC multiplier:** Rules.txt tech rate (default 3 means 30%, applied as `/10`)
4. **Progressive scaling:** A 75% adder that scales with number of techs known (smaller early game)
5. **Final cost = base_rate * total_techs_known**
6. Capped at 32000 beakers

### JavaScript Implementation

```javascript
function calculateTechCost(civIndex, gameState) {
    const civ = gameState.civs[civIndex];
    let totalTechs = civ.techsA + civ.techsB;
    if (totalTechs < 2) totalTechs = 1;

    const diff = gameState.difficulty;
    const isHuman = gameState.humanBitmask & (1 << civIndex);

    let baseCost;
    if (!isHuman) {
        baseCost = 14 - clamp(diff, 0, 4);
    } else {
        baseCost = diff * 2 + 6;
    }

    // Catch-up mechanic
    const leaderTechs = gameState.civs[gameState.mostAdvancedCiv].techsA +
                        gameState.civs[gameState.mostAdvancedCiv].techsB;

    if (totalTechs < leaderTechs) {
        if (diff !== 0) baseCost--;
        if (diff === 5 && totalTechs + 4 < leaderTechs && gameState.turn > 150) {
            baseCost--;
        }
    } else {
        baseCost += Math.floor((totalTechs - leaderTechs) / 3);
    }

    // Late-game penalty
    if (totalTechs > 19) {
        baseCost += clamp(totalTechs - Math.floor(gameState.turn / 8), 0, 6);
    }

    // COSMIC tech rate (default 3 = 30%)
    if (COSMIC.techMultiplier !== 10) {
        baseCost = Math.floor(COSMIC.techMultiplier * baseCost / 10);
    }

    // Progressive modifier (75% base, scaled by early game)
    let modifier = (baseCost * 3) >> 2;
    if (totalTechs < 20) {
        modifier = Math.floor(totalTechs * modifier / 20);
    }
    baseCost += modifier;

    // Minimum for human
    if (isHuman && baseCost < 11 - totalTechs) {
        baseCost = 11 - totalTechs;
    }

    // Final cost
    let finalCost = baseCost * totalTechs;
    if (finalCost < 1 || finalCost > 32000) finalCost = 32000;

    return finalCost;
}
```

---

## 7. Unit Support

**Function:** `FUN_004e7d7f` at `0x004E7D7F` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e7d7f @ 0x4E7D7F - Check if unit requires support from city
// Returns: 1 if unit costs a shield, 0 if free
int check_unit_support(int city_idx, int unit_idx, int gov_type) {
    static int unit_counter;  // DAT_006a660c - counts units processed
    unit_counter++;

    switch (gov_type) {
        case 0:  // Anarchy
        case 1:  // Despotism
            // Free support = city_population units
            if (city_population < unit_counter) {
                shield_cost++;  // DAT_006a6568
                return shield_cost;
            }
            break;

        case 2:  // Monarchy
            // Free support = COSMIC #13 (DAT_0064bcd5, default 0)
            if (COSMIC_monarchy_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        case 3:  // Communism
            // Free support = COSMIC #14 (DAT_0064bcd6, default 0)
            if (COSMIC_communism_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        case 4:  // Fundamentalism
            // Free if unit has "free_under_fundamentalism" flag (bit 0x08)
            if (!(unit_type_flags & 0x08) && COSMIC_fundamentalism_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        default:  // Republic/Democracy (5+)
            // Every unit costs a shield
            shield_cost++;
            return shield_cost;
    }
    return 0;  // Unit is free
}
```

### Key Lines from Decompiled Code

```c
// Anarchy/Despotism: free = city population (line 2848):
case 0:
case 1:
    if ((char)(&DAT_0064f349)[param_1 * 0x58] < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;

// Republic: COSMIC value (line 2854):
case 2:
    if ((int)(uint)DAT_0064bcd5 < DAT_006a660c) {

// Monarchy/Communism: COSMIC value (line 2860):
case 3:
    if ((int)(uint)DAT_0064bcd6 < DAT_006a660c) {

// Fundamentalism: COSMIC value + flag check (line 2866):
case 4:
    if (!(unit_flags & 8) && DAT_0064bcd7 < unit_counter) {

// Democracy: all cost (line 2873):
default:
    DAT_006a6568 = DAT_006a6568 + 1;
```

### Plain English

| Government | Free Unit Support |
|-----------|-------------------|
| Anarchy / Despotism | City population (size) units are free |
| Republic | COSMIC value (default 0) units are free |
| Monarchy / Communism | COSMIC value (default 0) units are free |
| Fundamentalism | COSMIC value (default 0); fanatic-type units always free |
| Democracy | Every unit costs 1 shield |

Each unit beyond the free limit costs 1 shield per turn from the city.

### JavaScript Implementation

```javascript
function calculateUnitSupport(city, gameState) {
    const civ = gameState.civs[city.owner];
    const gov = civ.government;

    let freeUnits;
    switch (gov) {
        case GOV.ANARCHY:
        case GOV.DESPOTISM:
            freeUnits = city.population;
            break;
        case GOV.REPUBLIC:
            freeUnits = COSMIC.republicFreeSupport; // default 0
            break;
        case GOV.MONARCHY:
        case GOV.COMMUNISM:
            freeUnits = COSMIC.monarchyFreeSupport; // default 0
            break;
        case GOV.FUNDAMENTALISM:
            freeUnits = COSMIC.fundamentalismFreeSupport; // default 0
            // Note: fanatic units are always free under fundamentalism
            break;
        case GOV.DEMOCRACY:
        default:
            freeUnits = 0; // Every unit costs
            break;
    }

    let supportCost = 0;
    let unitCount = 0;

    for (const unit of city.supportedUnits) {
        unitCount++;
        if (gov === GOV.FUNDAMENTALISM && (unit.typeFlags & 0x08)) {
            continue; // Fanatics are free
        }
        if (unitCount > freeUnits) {
            supportCost++; // 1 shield per unsupported unit
        }
    }

    return supportCost;
}
```

---

## 8. Trade Distribution (Luxury / Science / Gold Split)

**Function:** `FUN_004ea1f6` at `0x004EA1F6` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004ea1f6 @ 0x4EA1F6 - Distribute trade to luxury/science/gold
// Output variables (traced from binary):
//   DAT_006a65fc = luxury  (confirmed: entertainer ×2, luxury/2 → happy citizens)
//   DAT_006a6578 = science (confirmed: scientist ×3, Fund. penalty, stored to city+74, fed to research accum.)
//   DAT_006a6554 = gold    (confirmed: taxman ×3, tithe, stored to city+76, added to treasury)
void distribute_trade(int city_idx, int net_trade, int mode, int extra) {
    int civ_idx = city[city_idx].owner;
    int science_rate = civ[civ_idx].science_rate;    // DAT_0064c6b3 (+0x13), tenths
    int tax_rate = civ[civ_idx].tax_rate;            // DAT_0064c6b4 (+0x14), tenths
    // luxury_rate = 10 - science_rate - tax_rate (implicit)

    // Under Fundamentalism, cap science rate (COSMIC #21, default 0)
    if (gov_type == FUNDAMENTALISM && COSMIC_max_science_fund < science_rate) {
        science_rate = COSMIC_max_science_fund;
    }

    // Calculate raw splits (tenths, with rounding)
    luxury_output = clamp((net_trade * (10 - science_rate - tax_rate) + 4) / 10, 0, net_trade);
    science_output = clamp((net_trade * science_rate + 4) / 10, 0, net_trade - luxury_output);
    gold_output = net_trade - (science_output + luxury_output);

    // AI Fundamentalism: redirect all luxury to science (line 3888-3891)
    if (!is_human(civ_idx) && gov_type == FUNDAMENTALISM) {
        science_output += luxury_output;
        luxury_output = 0;
    }

    // Specialist bonuses (Entertainers: +2 luxury, Scientists: +3 science, Taxmen: +3 gold)
    int entertainers = count_specialists(city_idx, ENTERTAINER);  // type 1
    luxury_output += entertainers * 2;
    int taxmen = count_specialists(city_idx, TAXMAN);             // type 2
    gold_output += taxmen * 3;
    int scientists = count_specialists(city_idx, SCIENTIST);      // type 3
    science_output += scientists * 3;

    // Fundamentalism: science penalty (COSMIC #17, default 0, typically 50 in RULES.TXT)
    if (gov_type == FUNDAMENTALISM) {
        science_output -= (COSMIC_fund_science_penalty * science_output) / 100;
    }

    // Fundamentalism: tithe (gold bonus) from happiness buildings
    // DAT_006a6618 accumulates Temple/Colosseum/Cathedral/J.S.Bach effects as gold
    if (gov_type == FUNDAMENTALISM) {
        gold_output += tithe_bonus;  // DAT_006a6618
    }

    // Building multipliers for luxury AND gold (lines 3941-3952)
    int lux_gold_mult = 0;
    if (has_building(city_idx, MARKETPLACE)) lux_gold_mult++;      // 0x05
    if (has_building(city_idx, BANK)) lux_gold_mult++;             // 0x0A
    if (has_building(city_idx, STOCK_EXCHANGE)) lux_gold_mult++;   // 0x16
    luxury_output += (luxury_output * lux_gold_mult) >> 1;         // Each adds +50% luxury
    gold_output += (gold_output * lux_gold_mult) >> 1;             // Each adds +50% gold

    // Building multipliers for science (lines 3958-3977)
    int science_mult = 0;
    if (has_building(city_idx, LIBRARY)) science_mult++;                              // 0x06
    if (has_building(city_idx, UNIVERSITY)) science_mult++;                           // 0x0C
    if (has_building(city_idx, RESEARCH_LAB) || has_wonder_effect(civ_idx, SETI))     // 0x1A
        science_mult++;                                                               // SETI = Research Lab in all cities

    // Isaac Newton's College (wonder 16): doubles science building effect in wonder city
    int science_bonus = science_output * science_mult;
    if (wonder_city(ISAAC_NEWTONS) != city_idx) {
        science_bonus = science_bonus >> 1;            // Normal: +50% per building
    }                                                  // Newton's city: +100% per building
    science_output += science_bonus;

    // Copernicus' Observatory (wonder 11): doubles science output in wonder city
    if (wonder_city(COPERNICUS) == city_idx) {
        science_output <<= 1;                          // science *= 2
    }

    // Store results (luxury is not stored — used directly for happiness)
    city.science = science_output;                     // city+74 (scienceOutput)
    city.gold = gold_output;                           // city+76 (taxOutput)
    city.total_trade = net_trade;                      // city+78 (totalTrade)
}
```

### JavaScript Implementation

```javascript
function distributeTrade(city, netTrade, gameState) {
    const civ = gameState.civs[city.owner];
    let sciRate = civ.scienceRate;                    // +0x13 (DAT_0064c6b3)
    const taxRate = civ.taxRate;                      // +0x14 (DAT_0064c6b4)
    const luxRate = 10 - sciRate - taxRate;            // implicit

    // Fundamentalism: cap science rate (COSMIC #21, default 0)
    if (civ.government === GOV.FUNDAMENTALISM) {
        sciRate = Math.min(sciRate, COSMIC.maxScienceFund);
    }

    // Base distribution (tenths, with rounding)
    let luxury = clamp(Math.floor((netTrade * luxRate + 4) / 10), 0, netTrade);
    let science = clamp(Math.floor((netTrade * sciRate + 4) / 10), 0, netTrade - luxury);
    let gold = netTrade - (science + luxury);

    // Specialists
    luxury += city.entertainers * 2;
    gold += city.taxmen * 3;
    science += city.scientists * 3;

    // Fundamentalism: science penalty (COSMIC #17)
    if (civ.government === GOV.FUNDAMENTALISM) {
        science -= Math.floor(COSMIC.fundSciencePenalty * science / 100);
    }

    // Luxury AND gold multipliers: Marketplace/Bank/Stock Exchange (+50% each)
    let lgMult = 0;
    if (cityHasBuilding(city, MARKETPLACE)) lgMult++;
    if (cityHasBuilding(city, BANK)) lgMult++;
    if (cityHasBuilding(city, STOCK_EXCHANGE)) lgMult++;
    luxury += (luxury * lgMult) >> 1;
    gold += (gold * lgMult) >> 1;

    // Science multipliers: Library/University/Research Lab (+50% each, or SETI)
    let sciMult = 0;
    if (cityHasBuilding(city, LIBRARY)) sciMult++;
    if (cityHasBuilding(city, UNIVERSITY)) sciMult++;
    if (cityHasBuilding(city, RESEARCH_LAB) || hasWonderEffect(civ, SETI)) sciMult++;

    // Isaac Newton's College (wonder 16): doubles science building effect in wonder city
    let sciBonus = science * sciMult;
    if (getWonderCity(ISAAC_NEWTONS) !== city.index) sciBonus >>= 1;  // Normal: +50%
    science += sciBonus;                                               // Newton's: +100%

    // Copernicus' Observatory (wonder 11): doubles science in wonder city
    if (getWonderCity(COPERNICUS) === city.index) science <<= 1;

    return { luxury, science, gold };
}
```

---

## Utility Function: clamp

Used extensively throughout (`FUN_005adfa0` at `0x5ADFA0`):

```c
// Clamp value between min and max
int clamp(int value, int min, int max) {
    if (min > value) value = min;  // Note: parameter order is (value, min, max)
    if (value > max) value = max;
    return value;
}
```

```javascript
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
```

---

## Source Files Reference

| Formula | Function | Address | File |
|---------|----------|---------|------|
| Rush-buy cost | `city_button_buy` | `0x509B48` | `block_00500000.c:4479` |
| Food box size | `FUN_004e7eb1` | `0x4E7EB1` | `block_004E0000.c:2882` |
| City growth | (inline in turn proc) | `0x4EBE01` | `block_004E0000.c:4656` |
| Tile resources | `FUN_004e868f` | `0x4E868F` | `block_004E0000.c:3067` |
| Unit support | `FUN_004e7d7f` | `0x4E7D7F` | `block_004E0000.c:2837` |
| Corruption | `FUN_004e989a` | `0x4E989A` | `block_004E0000.c:3591` |
| Corruption divisor | `FUN_004e9849` | `0x4E9849` | `block_004E0000.c:3563` |
| Tech cost | `FUN_004c2788` | `0x4C2788` | `block_004C0000.c:946` |
| Happiness | `FUN_004ea8e4` | `0x4EA8E4` | `block_004E0000.c:4004` |
| Trade split | `FUN_004ea1f6` | `0x4EA1F6` | `block_004E0000.c:3847` |
| WLTKD/Disorder | `handle_city_disorder_004ef578` | `0x4EF578` | `block_004E0000.c:5815` |
| COSMIC loading | `FUN_00419d23` | `0x419D23` | `block_00410000.c:5060` |
| Clamp utility | `FUN_005adfa0` | `0x5ADFA0` | `block_005A0000.c:4391` |
| Has building | `FUN_0043d20a` | `0x43D20A` | `block_00430000.c:4652` |


---

# Part V: GDI Rendering Pipeline

> **Source**: `GDI_Rendering_Pipeline.md`
>
> Runtime analysis of civ2.exe's rendering pipeline via IAT (Import Address Table) hooking
> with a proxy ddraw.dll. Documents every GDI function the game calls, the exact rendering
> sequence, font creation, text shadow algorithm, sprite blitting technique, and the full
> 256-color palette. Key finding: Civ2 uses pure GDI on Windows 11 (never calls DirectDrawCreate).
>
> For the decompiled city dialog rendering code (from Ghidra), see [Part VI](#part-vi-city-dialog-rendering).
> For sprite sheet layouts and file formats, see [Part II](#part-ii-save-file-format--asset-formats).
> DDraw proxy source: `ddraw_proxy/` in this repository.

# Civ2 MGE — GDI Rendering Pipeline Analysis

Reverse-engineered by hooking civ2.exe's GDI import table at runtime on Windows 11.

> **Method:** A proxy `ddraw.dll` placed in the game folder intercepts all GDI32 and USER32 function calls via IAT (Import Address Table) patching. All rendering operations are logged with timestamps, DC identification, coordinates, sizes, and ROP codes.

---

## Key Finding: No DirectDraw on Windows 11

Civ2 MGE statically imports `DirectDrawCreate` from `DDRAW.dll`, but **never calls it** on Windows 11. The game falls back to a pure GDI rendering path. All graphics are composited using standard Win32 GDI functions: `BitBlt`, `CreateDIBSection`, `SetDIBColorTable`, `SelectObject`, etc.

This means the browser renderer does NOT need to emulate DirectDraw surfaces — Canvas 2D maps directly to the GDI operations the game actually performs.

---

## Startup Sequence

### 1. Font Pre-creation (t=0ms)

The game creates all fonts upfront before any rendering:

| Face | Height | Weight | Use |
|------|--------|--------|-----|
| Times New Roman | -24 | 700 (bold) | Large headers, menu title |
| Times New Roman | -18 | 400 | Body text |
| Times New Roman | -16 | 700 | Status bar text (gold, date, population) |
| Times New Roman | -16 | 400 | Standard UI text |
| Times New Roman | -14 | 700 | Small bold |
| Times New Roman | -14 | 400 | Small text |
| Times New Roman | -12 | 700 | Tiny bold |
| Times New Roman | -10 | 400 | Smallest text |
| Times New Roman | -20 | 400 | Medium text |
| Times New Roman | -21 | 400 | Slightly larger |
| Times New Roman | -24 | 400 | City dialog title bar |
| Times New Roman | -30 | 400 | Very large |
| Times New Roman | -36 | 700 | Largest bold (titles) |
| Arial | -18 | 400 | City dialog labels ("City Resources", "Food:", etc.) |
| Arial | -10 to -16 | 400 | Other secondary UI text |
| System | 16 (w=7) | 700 | System font (restored after each text op) |

**Note:** Height is negative = character height in pixels (not cell height). Weight 400 = normal, 700 = bold. All are non-italic. The game uses `CreateFontIndirectA`.

**Browser equivalent:** CSS `font-family: "Times New Roman", serif` with matching `font-size` and `font-weight` values, drawn via `CanvasRenderingContext2D.fillText()`.

### 2. Rendering Buffer Creation (t≈578ms)

Three primary 640×480 8bpp DIBSections are created as off-screen back buffers:

```
CreateDIBSection 640x480 8bpp → back buffer A
CreateDIBSection 640x480 8bpp → back buffer B
CreateDIBSection 640x480 8bpp → back buffer C (working/compositing)
```

Plus smaller utility buffers:
- **64×32 8bpp** — single isometric tile buffer
- **32×32 8bpp** — unit/icon compositing buffer

All buffers receive a 256-color palette via `SetDIBColorTable(start=0, count=256)`.

### 3. Map Buffer (t≈8500ms, on game load)

When a game is loaded, a large map compositing buffer is created:

```
CreateDIBSection 1652x984 8bpp → full map rendering buffer
```

This is large enough to hold the visible map area at the game's resolution. Map tiles are rendered into this buffer, then it's blitted to the window.

---

## Rendering Architecture

### Surface Hierarchy

```
┌─────────────────────────────────────────────────┐
│  Map Buffer (1652×984 8bpp)                      │
│  - All terrain, units, cities rendered here      │
│  - Text labels (city names, etc.) drawn on top   │
│                                                   │
│  BitBlt (SRCCOPY) ──→ Window DC                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  640×480 Back Buffers (×3)                       │
│  - Used for dialog/menu compositing              │
│  - Used during game startup/menus                │
│                                                   │
│  BitBlt (SRCCOPY) ──→ Window DC via BeginPaint   │
└─────────────────────────────────────────────────┘

┌────────────────────────────┐
│  Temp Buffers (various)     │
│  - 80×40 for tile scratch   │
│  - 32×20 for unit sprites   │
│  - Created/destroyed per op │
└────────────────────────────┘
```

### Multiple Windows (291 unique HWNDs observed)

Civ2 does NOT render everything to a single surface. It uses **many child windows** for UI panels:
- Status bars (307×27 per bar, multiple bars)
- Minimap
- Info panels
- Main map viewport
- Dialog windows (city screen, tech tree, etc.)

Each child window receives `WM_PAINT` messages and renders via `BeginPaint`/`EndPaint` with its own paint DC.

### MFC Window Classes

| Class Name | Sizes Observed | Role |
|-----------|---------------|------|
| MSWindowClass | 1936×1048 | Main game window |
| MSControlClass | 307×27, 156×36, 458×36, 552×36, 313×32, 209×32 | Buttons, status bars, dialog controls |
| MSHyperTextClass | — | Civilopedia / help text |
| MSEditBoxClass | — | Text input fields (city naming) |
| MSScrollBarClass | — | Scroll bars |

---

## City Dialog Architecture (from session 2 — city menu interaction)

The city management dialog reveals a critical architectural pattern: **all non-text rendering is invisible to GDI hooks**.

### DIB Section Rendering Model

The city dialog creates two off-screen DIB sections with direct memory access:

| Surface | Size | Bit Depth | DIB bits pointer | Purpose |
|---------|------|-----------|-----------------|---------|
| City dialog canvas | 972×675 | 8bpp | `0x035e0000` | Full dialog content |
| City panorama view | 640×400 | 8bpp | `0x069c0000` | Isometric city scene |

Both receive the full 256-color palette via `SetDIBColorTable(start=0, count=256)`.

**Key finding:** The game renders all graphical content (wallpaper background, citizen faces, resource icons, unit sprites, improvement thumbnails, food storage wheat, shield grid, panel borders, city panorama) by **writing pixels directly into DIB section memory** — none of this goes through hooked GDI calls. The only GDI operations performed on the city dialog canvas are:

1. `SelectObject(FONT)` → `SetTextColor` → `MoveToEx` → `DrawTextA` — for text labels
2. `BitBlt SRCCOPY` — to composite the finished frame to the window

No `FillRect`, `LineTo`, `BitBlt`, `SRCAND`, or `SRCINVERT` operations target the city dialog canvas. All panel borders visible in the dialog come from the background bitmap, not from GDI line-drawing calls.

### Compositing Sequence

```
1. CreateDIBSection 972×675 8bpp → city dialog canvas (direct memory access)
2. CreateDIBSection 640×400 8bpp → city panorama (direct memory access)
3. [Direct memory writes — invisible to hooks — render all graphics]
4. DrawTextA × N — render all text labels with shadow technique
5. BitBlt 970×36 SRCCOPY → window (title bar strip, shown first)
6. BitBlt 970×675 SRCCOPY → window (full dialog composite)
7. BitBlt 970×675 SRCCOPY → window (second blit, flicker prevention)
```

The window size is 976×680 (including non-client frame), client area is 970×675. At 640×480 base resolution, the dialog would be smaller — these measurements are from a 1920×1080 session.

### Title Bar: 3-Pass Shadow

The city dialog title uses a **3-pass** shadow technique (unique among all text):

```
Pass 1: position (x+2, y+1), color 0x000000 (black)     — deep shadow
Pass 2: position (x+1, y+0), color 0x878787 (gray)      — mid shadow
Pass 3: position (x+0, y+0), color 0x878787 (gray)      — foreground
```

Title text: `"City of {name}, {year}, Population {pop} (Treasury: {gold} Gold)"`
Font: Times New Roman h=-24, weight=400 (regular, not bold)

### Complete City Dialog Text Layout (970×675 canvas)

All positions are in the native dialog coordinate space. Font is Arial h=-18 w=400 unless noted.
**Note:** FG Color values are Windows COLORREF format (0x00BBGGRR), not RGB hex. To convert: `R = byte0, G = byte1, B = byte2`. Example: 0xA74F3F → R=0x3F(63), G=0x4F(79), B=0xA7(167) → rgb(63,79,167) = palette 0x54.

| Text | Shadow Pos | Shadow Color | FG Pos | FG Color | Notes |
|------|-----------|-------------|--------|----------|-------|
| Title (TNR h=-24) | (+2,+1) | 0x000000 | (0,0) | 0x878787 | 3-pass; see above |
| "Citizens" | (128,106) | 0x434343 | (127,105) | 0x3FBBDF | Section header |
| "City Resources" | (424,106) | 0x434343 | (423,105) | 0x3FBBDF | Section header |
| "Resource Map" | (102,320) | 0x003300 | (101,319) | 0x3FBBDF | Dark green shadow |
| "Food Storage" | (758,37) | 0x000000 | (757,36) | 0x239B4B | Black shadow |
| "Units Supported" | (91,362) | 0x434343 | (90,361) | 0x3FBBDF | Section header |
| "City Improvements" | (79,471) | 0x434343 | (78,470) | 0x3FBBDF | Section header |
| "Units Present" | (426,362) | 0x434343 | (425,361) | 0x3FBBDF | Section header |
| "Food: N" | (316,129) | 0x000000 | (315,128) | 0x27AB57 | Green |
| "Surplus: N" | (572,129) | 0x000000 | (571,128) | 0x1F8B3F | Darker green |
| "Trade: N" | (316,190) | 0x000000 | (315,189) | 0x079FEF | Blue |
| "Corruption: N" | (549,190) | 0x000000 | (548,189) | 0x0F53E3 | Dark blue |
| "N% Tax: N" | (316,271) | 0x000000 | (315,270) | 0x079FEF | Blue |
| "N% Lux: N" | (445,271) | 0x000000 | (444,270) | 0xFFFFFF | White |
| "N% Sci: N" | (567,271) | 0x000000 | (566,270) | 0xC7BB3F | Cyan (idx 94) |
| "Support: N" | (316,332) | 0x000000 | (315,331) | 0xA74F3F | Red-brown |
| "Production: N" | (547,332) | 0x000000 | (546,331) | 0x670B07 | Dark red |
| "Supplies: ..." | (307,554) | 0x434343 | (306,553) | 0x0F53E3 | Trade commodities |
| "Demands: ..." | (307,574) | 0x434343 | (306,573) | 0x0F53E3 | Trade commodities |
| Unit home abbr | — | — | varies | 0x878787 | Arial h=-11; e.g. "Min" |

### Button Rendering

City dialog buttons are separate MSControlClass child windows (85×36, 102×36). They use:
- `FillRect` with system brush for background
- `LineTo`/`MoveToEx` for 3D bevel borders (4 lines × 2 depth = 8 lines per button)
- `DrawTextA` format 0x24 (DT_VCENTER|DT_SINGLELINE) for centered text
- `FrameRect` double-border for focused state: outer (0,0)-(W-2,H-2), inner (4,4)-(W-6,H-6)

### Implications for Browser Renderer

- **Text positions are resolution-dependent.** The 970×675 positions above are from a 1080p session. The browser renderer's 636×421 canvas uses positions scaled for the base CITY.GIF resolution. Positions cannot be directly copied without scaling.
- **DIB dump is needed** to capture the non-text rendering. A modified proxy DLL can intercept the final BitBlt and save the DIB section contents as a .bmp file, providing automated frame-perfect screenshots.
- **All Arial fonts are weight 400** (regular) — the browser should not use CSS `font-weight: bold` for city dialog text.

### BMP Frame Analysis — Panel Layout (from DIB dump session)

Pixel-level analysis of captured `frame_0010_972x675.bmp` (San Francisco city dialog at 1080p) reveals the exact panel geometry. See `City_Dialog_Layout.md` for the full specification. Key findings:

**Three-column layout** (972-space, scale ÷1.528 for 636-space):
- Left column:   x=[12..305]  — Citizens, Resource Map, Workers, City Improvements
- Center column: x=[306..662] — City Resources rows (food/trade/tax/support), Units Present, Supplies/Demands
- Right column:  x=[663..959] — Food Storage (green bg), Production (blue gradient)

**Panel backgrounds**:
- Food Storage: solid fill `rgb(7,59,0)` — dark green
- Production: vertical gradient `rgb(0,0,95)` (top) → `rgb(103,127,215)` (bottom)
- All other panels: black background with stone wallpaper border

**Gold 3D panel borders** around Resource Map, Workers/Garrison, City Improvements:
- Bright:  `rgb(223,187,63)` — top/left highlight
- Medium:  `rgb(191,151,47)` — face color
- Dark:    `rgb(159,115,31)` — bottom/right shadow
- Deepest: `rgb(43,27,0)` — inner shadow

**Food icon grid** in Food Storage: 15 rows of wheat icons at x=[749..863] (BMP), icon color `rgb(239,159,7)`.

---

## Transparent Sprite Blitting

### The 3-Step GDI Mask Blit

Civ2 uses the classic GDI technique for color-key transparency, implemented with three ROP (Raster Operation) codes:

```
Step 1: SRCCOPY   (0x00CC0020) — copy mask bitmap to temp
Step 2: SRCINVERT (0x00660046) — XOR sprite onto destination
Step 3: SRCAND    (0x008800C6) — AND mask onto destination
Step 4: SRCINVERT (0x00660046) — XOR sprite again to finalize
Step 5: SRCCOPY   (0x00CC0020) — blit composited result to screen
```

**Observed pattern (unit icon in status bar):**
```
BitBlt temp←mask     size=32x20  SRCCOPY     // copy 1bpp mask
BitBlt comp←dest     size=32x20  SRCCOPY     // save destination background
BitBlt comp^=sprite  size=32x20  SRCINVERT   // XOR sprite
BitBlt comp&=mask    size=32x20  SRCAND      // AND with mask
BitBlt comp^=sprite  size=32x20  SRCINVERT   // XOR again → transparent composite
BitBlt dest←comp     size=32x20  SRCCOPY     // write result to screen
```

The mask bitmap is 1bpp (monochrome): white = opaque pixel, black = transparent pixel.

**Color key setup:** Before the mask blit, the game sets `SetBkColor(0x808000)` (olive) on the sprite DC. This is the **chroma key color** — GDI uses this as the transparent color when creating the 1bpp mask via the SRCCOPY from 8bpp → 1bpp conversion.

**Browser equivalent:** This is exactly what canvas `globalCompositeOperation` or pre-computed alpha channels achieve. The existing browser renderer's color-key approach (checking for magenta/cyan chroma key pixels) is correct and simpler.

---

## ROP Code Reference

| ROP Code | Name | Operation | Count in Session | Use |
|----------|------|-----------|-----------------|-----|
| 0x00CC0020 | SRCCOPY | dst = src | ~2,100 | Standard copy (90% of blits) |
| 0x00660046 | SRCINVERT | dst = dst XOR src | ~150 | Transparency compositing |
| 0x008800C6 | SRCAND | dst = dst AND src | ~75 | Mask application |

---

## Common Blit Sizes

| Size | Count | Meaning |
|------|-------|---------|
| **80×60** | 648 | Isometric tile with vertical overlap for tall sprites |
| **32×20** | 438 | Unit icons in status bar panels |
| **8×6** | 111 | Small UI indicators |
| **240×60** | 78 | 3-tile-wide strip (viewport update) |
| **96×60** | 72 | Slightly wider tile region |
| **85×36** | 49 | ? |
| **156×32** | 34 | ? |
| **480×27** | 33 | Full-width status bar |
| **1652×984** | 3 | Full map buffer to screen |

The dominant size is **80×60** — this is the tile rendering cell, which is wider and taller than the 64×32 isometric diamond to accommodate terrain overlap (mountains, forests extend above/below their tile).

---

## Text Rendering

### Text Function: DrawTextA (USER32)

The game uses **`DrawTextA`** from USER32.dll for all text output (9,338 calls per 88-second session). It does NOT use `TextOutA` or `ExtTextOutA` — those functions are not in civ2.exe's import table at all.

### The Shadow Text Algorithm

Every text string is drawn **twice** — first a shadow pass, then the foreground pass. The complete sequence for each text draw:

```
1. SelectObject(dc, font)              // e.g. "Times New Roman" h=-16 wt=700
2. GetTextExtentPointA(text) → WxH     // measure text size in pixels
3. GetDIBColorTable(paletteIdx, 1)     // look up shadow color FROM PALETTE
4. SetTextColor(shadowColor)           // e.g. 0xBFBFBF
5. SetTextAlign(0x1)                   // TA_NOUPDATECP
6. MoveToEx(x+1, y+1)                 // shadow offset: +1,+1 pixels
7. DrawTextA(text, rect, format=0x0)   // SHADOW PASS
8. SetTextAlign(0x0)
9. GetDIBColorTable(paletteIdx, 1)     // look up foreground color FROM PALETTE
10. SetTextColor(foregroundColor)       // e.g. 0x333333
11. SetTextAlign(0x1)
12. MoveToEx(x, y)                     // actual position
13. DrawTextA(text, rect, format=0x0)  // FOREGROUND PASS
14. SetTextAlign(0x0)
15. SelectObject(dc, systemFont)       // restore System font
```

**Critical detail:** Text colors are not hardcoded — they come from the **8-bit palette** via `GetDIBColorTable(index, 1)`. The game looks up a single palette entry by index and uses its RGB value as the text color. This means text colors change if the palette changes.

### Shadow Color Pairs by Context

| Context | Shadow Color | Foreground Color | Font |
|---------|-------------|-----------------|------|
| **Main menu buttons** | 0xBFBFBF (light gray) | 0x333333 (dark gray) | Times New Roman -24 w400 |
| **Dialog title bar** | 0x000000 (black) | 0x878787 (gray) | Times New Roman -24 w400 |
| **Status bar** (gold, date, etc.) | 0xBFBFBF (light gray) | 0x333333 (dark gray) | Times New Roman -16 w700 |
| **Map city names** | 0x000000 (black) | 0xC7BB3F (gold/yellow) | varies |
| **Map unit labels** | 0x000000 (black) | 0x33DB6F (green) | varies |
| **City dialog: "City Resources"** | 0x434343 (dark gray) | 0x3FBBDF (cyan/teal) | Arial -18 w400 |
| **City dialog: "Resource Map"** | 0x003300 (dark green) | 0x3FBBDF (cyan/teal) | Arial -18 w400 |
| **City dialog: resource values** | 0x000000 (black) | varies by type | Arial -18 w400 |
| **Dialog buttons** (OK/Cancel) | — (see below) | — | — |
| **Dialog popup titles** | 0x000000 (black) | 0x878787 (gray) | varies |

### Button Text Rendering

Buttons use a **different pattern** with `DrawTextA` format flags:

```
1. DrawTextA(text, fullRect, format=0x424)  // DT_CALCRECT|DT_VCENTER|DT_SINGLELINE — measure
2. DrawTextA(text, centeredRect, format=0x24)  // DT_VCENTER|DT_SINGLELINE — draw
```

Button text colors: **0xFFFFFF** (white) for highlight state, **0x808080** (gray) for normal state.

Buttons are rendered into three states (normal, hover, pressed) with different border pen colors:
- Normal: white highlight pen (0xFFFFFF) on top-left, gray (0x808080) on bottom-right
- Pressed: reversed — gray on top-left, white on bottom-right

### DrawTextA Format Flags

| Format | Hex | Count | Meaning |
|--------|-----|-------|---------|
| DT_LEFT \| DT_TOP | 0x0 | 8,937 | Default — used for all game text |
| DT_VCENTER \| DT_SINGLELINE | 0x24 | 262 | Centered button text (draw pass) |
| DT_CALCRECT \| DT_VCENTER \| DT_SINGLELINE | 0x424 | 135 | Button text measurement pass |
| DT_CENTER \| DT_VCENTER \| DT_SINGLELINE | 0x25 | 4 | Fully centered text (rare) |

### Palette Index → Text Color Mapping

The game reads single palette entries via `GetDIBColorTable(index, 1)` to determine text colors:

| Palette Index | Lookups | RGB Color | Used For |
|--------------|---------|-----------|----------|
| 10 | 6,038 | (0,0,0) black | Shadow pass for most text |
| 94 | 1,497 | (199,187,63)* | Map city names (gold/yellow) |
| 16 | 482 | (51,51,51) | Foreground for status bar text |
| 33 | 481 | (191,191,191) | Shadow for status bar text |
| 41 | 179 | (255,255,255) | Button text highlight |
| 175 | 120 | (51,219,111)* | Map unit labels (green) |
| 26 | 91 | (135,135,135) | Dialog title foreground |
| 18 | 14 | (67,67,67) | City dialog label shadow |
| 124 | 12 | (63,187,199)* | City dialog section headers (cyan) |
| 121 | 6 | (239,159,7) | Trade/corruption text — orange/gold |
| 85 | 4 | (55,71,159) | Dark blue text |
| 118 | 4 | — (not captured) | Link/highlight |

\* Approximate — actual RGB depends on the active palette.

**Cross-validation:** The GDI-captured text colors (SetTextColor COLORREF values in the text layout table above) independently confirm the game palette RGB mappings. For example, "Support: N" text uses COLORREF 0xA74F3F = rgb(63,79,167) = palette 84 (0x54), matching the palette dump entry [84]=(63,79,167).

### Text Content Captured

All text drawn by the game goes through DrawTextA. Examples of captured strings:

**Main menu:** "Start a New Game", "Load a Game", "Begin Scenario", "Multiplayer Game", "View Hall of Fame", "View Credits"

**Status bar:** "1104 Gold  3.0.7", "A.D. 680", "1,050,000 People", "Viewing Pieces", "Moving Units", "End of Turn"

**City dialog title:** "City of Issus, A.D. 680, Population 10,000 (Treasury: 1118 Gold)"

**City dialog body:** "City Resources", "Food: 2", "Surplus: 2", "Support: 0", "Production: 4", "Trade: 2", "Corruption: 1", "Resource Map", "City Improvements", "Citizens", "Units Supported", "Units Present", "Food Storage"

**City dialog buttons:** "Buy", "Change", "Rename", "Close", "Info", "Happy", "View", "Map"

**Diplomacy:** "An emissary from Empress Shakala of the Zulus", "wishes to speak with you. Will you receive her?", "Pay 1000 gold in tribute."

**Advisors:** "Defense Minister", "Domestic Advisor", "Travellers Report"

**Tech tree:** "Alphabet", "Bronze Working", "Ceremonial Burial", "Code of Laws", etc.

**Unit orders:** "Found New City", "Fortified", "Sleep", "No Orders", "Disembark", "Make Landfall", "Stay With Ships"

**Browser equivalent:**
```javascript
// Shadow pass
ctx.fillStyle = shadowColor;
ctx.fillText(text, x + 1, y + 1);
// Foreground pass
ctx.fillStyle = foregroundColor;
ctx.fillText(text, x, y);
```

---

## UI Element Rendering

### FillRect (141 calls) and FrameRect (138 calls)

These are USER32 functions (not GDI32). Used for:

- **FillRect:** Background fill for button states (normal, hover, pressed). Uses brush handle `0x00900014`.
- **FrameRect:** Drawing borders around MSControlClass windows (buttons, status bars). Uses brush handle `0x00900013`.

Both are called on MSControlClass windows of various sizes (156×36 for dialog buttons, 307×27 for menu items, 458×36 for wide buttons).

### Button Border Drawing (LineTo/MoveToEx)

Buttons use LineTo/MoveToEx for 3D-effect borders:

```
Normal button:
  Pen 0xFFFFFF (white), width=1: draw top-left L-shape (highlight)
  Pen 0x808080 (gray), width=1: draw bottom-right L-shape (shadow)
  Inner border: repeat with offset +1

Pressed button:
  Reversed pen colors (gray top-left, white bottom-right)
```

### Pen Colors

| Color | Style | Width | Use |
|-------|-------|-------|-----|
| 0xFFFFFF (white) | SOLID | 1 | Button highlight edge |
| 0x808080 (gray) | SOLID | 1 | Button shadow edge |
| 0x000000 (black) | SOLID | 0 | Default pen (reset) |

### Brush Colors

| Color | Use |
|-------|-----|
| 0x637B8F (slate blue-gray) | General fill |

---

## Color System

### 8-bit Paletted (256 colors)

All DIBSections are 8bpp. The palette is set via `SetDIBColorTable` with 256 entries.

Full 256-entry palette (captured from game):

```
[  0] (  0,  0,  0) (128,  0,  0) (  0,128,  0) (128,128,  0) (  0,  0,128) (128,  0,128) (  0,128,128) (192,192,192)
[  8] (192,220,192) (164,200,240) (  0,  0,  0) ( 11, 11, 11) ( 19, 19, 19) ( 27, 27, 27) ( 35, 35, 35) ( 43, 43, 43)
[ 16] ( 51, 51, 51) ( 59, 59, 59) ( 67, 67, 67) ( 75, 75, 75) ( 83, 83, 83) ( 91, 91, 91) ( 99, 99, 99) (107,107,107)
[ 24] (115,115,115) (123,123,123) (135,135,135) (143,143,143) (151,151,151) (159,159,159) (167,167,167) (175,175,175)
[ 32] (183,183,183) (191,191,191) (199,199,199) (207,207,207) (215,215,215) (223,223,223) (231,231,231) (239,239,239)
[ 40] (247,247,247) (255,255,255) ( 87,171, 39) ( 83,163, 39) ( 75,155, 35) ( 71,147, 31) ( 63,139, 31) ( 59,131, 27)
[ 48] ( 55,123, 23) ( 47,115, 23) ( 43,107, 19) ( 35, 99, 19) ( 31, 91, 15) ( 23, 83, 11) ( 19, 75, 11) ( 11, 67,  7)
[ 56] (  7, 59,  0) (  0, 51,  0) (187,187, 67) (183,183, 67) (175,175, 67) (167,171, 67) (159,163, 63) (155,155, 63)
[ 64] (147,151, 63) (139,143, 63) (135,139, 59) (127,131, 59) (119,123, 59) (111,119, 55) (107,111, 55) ( 99,107, 55)
[ 72] ( 91, 99, 55) ( 83, 91, 51) (127,163,247) (123,155,239) (115,147,231) (107,139,223) (103,127,215) ( 95,119,207)
[ 80] ( 87,111,199) ( 83,103,191) ( 75, 95,183) ( 67, 87,175) ( 63, 79,167) ( 55, 71,159) ( 47, 59,151) ( 43, 51,143)
[ 88] ( 35, 43,135) ( 27, 35,127) ( 23, 27,119) ( 15, 19,111) (  7, 11,103) (  0,  0, 95) ( 63,187,199) ( 55,175,191)
[ 96] ( 51,167,183) ( 47,155,175) ( 39,143,167) ( 35,135,155) ( 31,123,147) ( 23,111,139) ( 19, 99,131) ( 15, 91,123)
```

**Palette structure:**
- **[0–9]:** Standard Windows system colors (black, dark red, dark green, etc.)
- **[10–41]:** Grayscale ramp (0,0,0 → 255,255,255) — 32 shades used for text, UI, shadows
- **[42–57]:** Green ramp (terrain: grassland, forest)
- **[58–73]:** Yellow-green ramp (terrain: plains, hills)
- **[74–93]:** Blue ramp (water, sky)
- **[94–103]:** Cyan ramp (shallow water, coast)
- **[104+]:** Additional terrain, unit, and UI colors (not yet captured)

**Key city dialog palette indices (with confirmed RGB values):**
| Index | Hex | RGB | Use |
|-------|-----|-----|-----|
| 0x0B | 11 | (11,11,11) | Shield waste bar, deficit labels |
| 0x29 | 41 | (255,255,255) | Science text |
| 0x2A | 42 | (87,171,39) | Food label text |
| 0x2C | 44 | (75,155,35) | Food storage text |
| 0x2D | 45 | (71,147,31) | Food surplus bar |
| 0x30 | 48 | (55,123,23) | Food deficit bar |
| 0x54 | 84 | (63,79,167) | Shield support bar — light blue |
| 0x5C | 92 | (7,11,103) | Shield surplus bar — dark blue |
| 0x76 | 118 | (not captured) | Trade bar, tax text |
| 0x79 | 121 | (239,159,7) | Corruption bar, tax/lux/sci background — orange/gold |
| 0x7C | 124 | (not captured) | Panel title text |

**WARNING: GIF palette ≠ Game runtime palette.** The palette embedded in GIF sprite sheets
(TERRAIN1.GIF, CITIES.GIF, UNITS.GIF, etc.) maps the SAME indices to DIFFERENT RGB values
than the game's runtime palette (set via `SetDIBColorTable`). For example, GIF palette index
0x54 = rgb(60,186,199) cyan, but game palette 0x54 = rgb(63,79,167) blue. When rendering
UI elements that reference palette indices from decompiled code (bar fills, text colors),
always use the game runtime palette values above, NOT the GIF file palette.

---

## Performance Characteristics

From an 88-second play session (168K log lines):

| Event | Count | Per Second |
|-------|-------|-----------|
| SelectObject | 75,515 | 858 |
| GetTextExtentPointA | 18,831 | 214 |
| SetTextAlign | 17,874 | 203 |
| DrawTextA | 9,338 | 106 |
| MoveToEx | 9,387 | 107 |
| SetTextColor | 9,154 | 104 |
| GetDIBColorTable | 8,941 | 102 |
| BitBlt | 2,295 | 26 |
| LineTo | 900 | 10 |
| CreateCompatibleDC / DeleteDC | 402 each | 5 |
| BeginPaint / EndPaint | 208 each | 2 |
| FillRect | 141 | 2 |
| FrameRect | 138 | 2 |
| CreateDIBSection | 124 | 1 |
| CreateFontIndirectA | 146 | 2 |
| RealizePalette | 102 | 1 |
| SetDIBColorTable | 81 | 1 |

**Note:** GdiFlush calls (~700K+) are suppressed from logging. GetDC(NULL)/ReleaseDC(NULL) calls for font measurement are also suppressed.

---

## Implications for Browser Renderer

### Already Correct
- Color-key transparency approach (magenta/cyan chroma keys)
- 8-bit paletted color system
- Isometric tile compositing order

### Should Update
- **Text rendering**: Must use the shadow text algorithm — draw every string twice with (+1,+1) offset shadow, using the correct color pair per context
- **Font matching**: Use "Times New Roman" (bold 700 for status bar, normal 400 for dialogs) and "Arial" (400 for city dialog labels) with specific pixel sizes
- **Text colors from palette**: Use game runtime palette RGB values, NOT GIF palette values. See palette index table in Color System section. The game does `GetDIBColorTable(index, 1)` to get text RGB values
- **Bar fill colors from palette**: Resource row bars must use game palette colors (e.g., 0x54=rgb(63,79,167) for support, 0x5C=rgb(7,11,103) for surplus, 0x79=rgb(239,159,7) for corruption). GIF palettes map the same indices to completely different RGB values
- **Tile cell size**: Rendering cell is 80×60, not just 64×32 — accounts for sprite overlap
- **Button rendering**: 3D beveled borders with white/gray pen lines, text centered with DT_VCENTER|DT_SINGLELINE

### New Information
- The game uses 291 child windows on Windows 11 — the browser renderer's single-canvas approach is simpler and better
- No DirectDraw on modern Windows — the GDI path is the actual rendering pipeline to match
- The 3-step mask blit confirms that `SRCAND`/`SRCINVERT` pattern is used for all transparent sprites
- `DrawTextA` (USER32) is the sole text output function — not TextOutA or ExtTextOutA
- Chroma key color is 0x808000 (olive), set via `SetBkColor` before mask blits
- The game restores the System font after every text operation (select font → draw → restore System font)

---

## Data Collection Method

Proxy DLL source: `ddraw_proxy/` in this repository.

Build: `cd ddraw_proxy && bash build.sh`

Deploy: Copy `ddraw_proxy/ddraw.dll` to the Civ2 game folder.

Remove: Delete `ddraw.dll` from the game folder.

Log output: `ddraw_log.txt` in the game folder (overwritten each session).

### Hooks Installed

**GDI32:** BitBlt, StretchBlt, CreateCompatibleBitmap, CreateCompatibleDC, DeleteDC, SelectObject, CreateDIBSection, CreateBitmap, SetDIBColorTable, GetDIBColorTable, CreatePalette, SetPaletteEntries, GetPaletteEntries, RealizePalette, SelectPalette, AnimatePalette, GetSystemPaletteEntries, SetPixel, SetTextAlign, GetTextExtentPointA, SetBkMode, SetTextColor, SetBkColor, CreateFontIndirectA, MoveToEx, LineTo, CreatePen, CreateSolidBrush, GdiFlush (suppressed)

**USER32:** DrawTextA, FillRect, FrameRect, GetDC, ReleaseDC, InvalidateRect, BeginPaint, EndPaint, ShowWindow, MoveWindow, SetWindowPos

**Not imported by civ2.exe:** TextOutA, ExtTextOutA, PatBlt (failed to hook)


---

# Part VI: City Dialog Rendering

> **Source**: `reverse_engineering/City_Dialog_Rendering_Analysis.md`
>
> Extracted from decompiled city window module (0x500000-0x50FFFF) and GDI rendering layer
> (0x5B0000-0x5DFFFF). Contains exact pixel coordinates for all 12 panels, the zoom/scaling
> system, font specifications, palette color indices, button layout, drawing sequence, and
> the icon spacing algorithm (with decompiled C code).
>
> All coordinates are at zoom level 2 (default) — multiply by `zoom_level / 2` for other zooms.
> For the runtime GDI hooking results that complement this analysis, see [Part V](#part-v-gdi-rendering-pipeline).
> For sprite sheet coordinates referenced here, see [Part II](#part-ii-save-file-format--asset-formats).
> For the game formulas displayed in the city dialog, see [Part IV](#part-iv-game-formulas--mechanics).

# City Dialog Rendering Analysis — From Decompiled civ2.exe

Extracted from decompiled city window module (0x500000-0x50FFFF) and GDI rendering
layer (0x5B0000-0x5DFFFF). All coordinates are at zoom level 2 (the default), which
means they ARE the actual pixel values. Multiply by `zoom_level / 2` for other zooms.

---

## A. Zoom / Scaling System

### Universal Coordinate Scaler: `FUN_00511690` at 0x511690

All pixel coordinates in the city dialog pass through this function:

```c
int FUN_00511690(int base_coord) {
    // cityobj+0x15d4 = zoom level (1, 2, or 3)
    if (zoom_level != 2) {
        return (zoom_level * base_coord) / 2;
    }
    return base_coord;  // at zoom 2, pass through unchanged
}
```

### Zoom Level Selection (`citywin_9028` at 0x509028)
- **Level 1** (small): screen < certain width/height thresholds
- **Level 2** (normal): default
- **Level 3** (large): screen >= ~950px wide AND >= ~950px tall, plus `DAT_006ab198 > 999`

### Sprite Zoom Values (in `citywin_CF06`)
- Zoom 1 → sprite_zoom = -5 (smallest)
- Zoom 2 → sprite_zoom = -2 (normal)
- Zoom 3 → sprite_zoom = 1 (largest)

This sprite_zoom is passed to `FUN_00472cf0` to get actual tile pixel dimensions.

### Sprite Zoom Scaler: `FUN_00472cf0` at 0x472CF0

Converts base sprite dimensions to zoomed pixel sizes:

```c
int FUN_00472cf0(int base, int zoom) {
    // zoom values: -5 (smallest), -2 (normal), 1 (largest)
    return floor((zoom + 8) * base / 8);  // signed integer division with floor rounding
}
```

Example values at normal zoom (sprite_zoom = -2):
| Call | Result | Use |
|------|--------|-----|
| `FUN_00472cf0(0x40, -2)` | 48 | Resource map tile width |
| `FUN_00472cf0(0x20, -2)` | 24 | Resource map tile half-height |
| `FUN_00472cf0(0x45, -2)` | 51 | Unit tile width (info panel) |
| `FUN_00472cf0(0x34, -2)` | 39 | Unit tile height (info panel) |

At city dialog zoom = -3 (Units Supported panel uses -3, not -2):
| Call | Result | Use |
|------|--------|-----|
| `FUN_00472cf0(0x45, -3)` | 43 | Supported unit tile width |
| `FUN_00472cf0(0x34, -3)` | 32 | Supported unit tile height |
| `FUN_00472cf0(0x40, -3)` | 40 | Available width for upkeep icons |
| `FUN_00472cf0(0x20, -3)` | 20 | Icon Y offset from unit top |

---

## B. Window Dimensions

From initialization at `citywin_9429`:
```c
FUN_005cedad(local_4c8, 7, 0, 0, 0x27c, 0x1a5);
```
- **Content area: 636 x 421 pixels** (0x27C = 636, 0x1A5 = 421)
- Background: `CITY.GIF`
- Title bar adds 24px + 8px padding

### Window Centering (`citywin_998F`)
```
x = (screenW / 2) - ((636_scaled + 16) / 2)
y = (screenH / 2) - (totalH / 2)
```

---

## C. All 12 Panel Rectangles

Defined in `citywin_8D24` at 0x508D24, using `citywin_8C84` to compute scaled RECTs.

| Panel | Struct Offset | X | Y | W | H | Purpose |
|---|---|---|---|---|---|---|
| Citizens Row | +0x15dc | 0 | 0 | 436 | 61 | Top bar with citizen faces and titles |
| City Map Outer | +0x15ec | 0 | 61 | 436 | 153 | Terrain map + resource rows area |
| City Map Inner | +0x165c | 7 | 65 | 188 | 137 | Inner terrain map area |
| Food Storage | +0x15fc | 436 | 0 | 200 | 167 | Food/granary panel |
| Production | +0x160c | 436 | 167 | 200 | 189 | What's being built |
| Buy Panel | +0x161c | 436 | 356 | 200 | 65 | Buy/change buttons area |
| Units Supported | +0x162c | 0 | 212 | 192 | 78 | Supported units grid |
| Units Header | +0x167c | 7 | 216 | 181 | 69 | Units title area |
| Improvements | +0x163c | 0 | 290 | 192 | 131 | Building list (outer) |
| Improvements Inner | +0x166c | 6 | 306 | 166 | 108 | Building list (scrollable) |
| Info/Map/Happy | +0x164c | 192 | 212 | 244 | 209 | Mode-switching panel (outer) |
| Info/Map/Happy Inner | +0x168c | 197 | 216 | 233 | 198 | Mode-switching panel (inner) |

### ASCII Layout
```
+--[ Citizens Row (436x61) ]---+--[ Food Storage (200x167) ]--+
|  0,0                  436,61 | 436,0              636,167   |
+------------------------------+                              |
| City Map/Terrain (436x153)   |                              |
| 0,61                 436,214 +--[ Production (200x189) ]----+
+------------------------------+ 436,167             636,356  |
| Units (192x78)   | Info/Map  |                              |
| 0,212      192,290| /Happy   +--[ Buy Panel (200x65) ]------+
+------------------+| (244x209)| 436,356             636,421  |
| Improvements     || 192,212  +------------------------------+
| (192x131)        || to       |
| 0,290    192,421 || 436,421  |
+------------------+|----------|
```

---

## D. Citizens Row (`FUN_0050207f` at 0x50207F)

1. Text style: color index 0x7C (124), font size 18px, bold
2. Title string (resource 0x193 = 403): positioned at panel_left + 2, panel_top + 46
3. Subtitle (resource 0x3F = 63): at panel_left + 199, same Y, width 238
4. Citizen icons: starting at panel_left + 5, panel_top + 9
   - Total width for icons: 422px, icon height: 27px
   - Spacing computed by `FUN_00548b70` (icon spacing algorithm)
   - Each citizen classified as: happy, content, unhappy, or specialist
5. Click rectangles per citizen: width 30, height based on citizen count

---

## E. Resource Rows (`FUN_005025d5` at 0x5025D5, 9761 bytes)

This is the largest function in the city module. Draws terrain map + 3 resource rows.

### Terrain Map Drawing
- Tile width: `FUN_00472cf0(0x40, zoom)` = 48px at zoom -2
- Tile height: `FUN_00472cf0(0x20, zoom)` = 24px half-height at zoom -2
- Map origin: panel_left + 5, panel_top + 11
- 21 tiles drawn in diamond pattern using offset tables at DAT_00630D38 / DAT_00630D50
- Each tile: terrain base, then resource icons (food/shield/trade), then improvements
- **Resource icons on tiles** (from FUN_00502798):
  - Icon size: `FUN_00511690(10)` = 10px in mode 2
  - Icon padding: `FUN_00511690(8)` = 8px left/right from tile edge
  - Available width for icons: tile_width - 2×padding = 48 - 16 = 32px
  - Spacing: `FUN_00548b70(count, iconSize+1, availW)` — uses iconSize+1=11 for 1px gap
  - Icons left-aligned at tile_x + padding, vertically centered at tile_y + halfH - iconSize/2
  - Order: food icons, then shield icons, then trade icons

### Food Row (1st resource row)
- Position: panel_left + 205, panel_top + 14
- Available width: 226px
- Icon size: 14px + 1 = 15px effective
- Separator gap: 4px between surplus and deficit
- **Food surplus bar**: palette color 0x2D (45) = rgb(71,147,31) — green
- **Food deficit bar**: palette color 0x30 (48) = rgb(55,123,23) — darker green
- Label style: color 0x2A (42) = rgb(87,171,39), font 10px
- Deficit label: color 0x0B (11) = rgb(11,11,11), font 29px or color 0x2E (46) = rgb(63,139,31), font 10px

### Shield Row (2nd resource row)
- Y offset: panel_top + 120
- Width: 226px
- Layout order (left to right): Support | Waste | Surplus
- **Shield support bar**: color 0x54 (84) = rgb(63,79,167) — light blue
- **Shield waste bar**: color 0x0B (11) = rgb(11,11,11) — near-black
- **Shield surplus bar**: color 0x5C (92) = rgb(7,11,103) — dark blue
- When surplus ≤ 0, surplus bar merges into support bar (lines 1742-1744 in decompiled)
- Waste bar only appears when waste > 0 (DAT_006a656c != 0)
- Labels: support color 0x54, waste/deficit color 0x0B, surplus color 0x5C

### Trade Row (3rd resource row)
- Y offset: panel_top + 55
- Layout order (left to right): Trade | Corruption
- **Trade bar**: color 0x76 (118) — behind trade arrow icons
- **Corruption bar**: color 0x79 (121) = rgb(239,159,7) — orange/gold, behind corruption icons
- When corruption ≤ 0, corruption bar merges into trade bar (lines 1889-1891 in decompiled)

### Tax/Luxury/Science Row (4th resource row)
- Y offset: panel_top + 79
- **Full-width background bar**: color 0x79 (121) = rgb(239,159,7) — same orange/gold as corruption bar
- Tax icons left-aligned, science right-aligned, luxury centered in gap
- Sub-rows for distribution:
  - Tax (gold): color 0x76, font 10px
  - Science: color 0x29 (41), font 10px
  - Luxury: color 0x5E (94), font 10px
  - Happiness modifier: color 0x76

### Trade Rate Percentages (from civ struct)
- Tax rate = `civ[civ_id].tax_rate * 10` (percentage)
- Luxury rate = `civ[civ_id].luxury_rate * 10`
- Science rate = `(10 - tax - luxury) * 10`

---

## F. Food Storage (`FUN_00504c05` at 0x504C05)

- Text style: color 0x2C (44), font 10px
- Grid dimensions: 183px wide, 147px tall
- Grid starts at: panel_left + 6, panel_top + 15
- Grid inset: 3px padding all sides
- Cell spacing: 17px per citizen icon horizontal, 14px per row vertical
- Grid rows from `DAT_006a6560` (food storage rows based on granary size)
- Grid cols = city_size + 1
- Frame drawing: `FUN_005113f0` with colors 0x2C and 0x39 (57)
- **"We Love" indicator**: sprite 0x2A at center-bottom

---

## G. Production Box (`FUN_0050503e` at 0x50503E)

- Panel: (436, 167, 200, 189)
- Preview rect: 183px wide, 146px tall
- Production item sprite: at panel + (73, 1) for units, or panel + (80, 16) for wonders
- Shield grid frame: colors 0x51 (81) highlight, 0x5D (93) shadow
- Shield icon spacing: 17px wide, 14px tall
- Shields per row: from `DAT_006a657c`
- Max 10 rows of shields

---

## H. Units Supported (`FUN_00505666` at 0x505666)

- Panel: (0, 212, 192, 78)
- Unit tile: width from `FUN_00472cf0(0x45, zoom)`, height from `FUN_00472cf0(0x34, zoom)`
  - At zoom -3: width=43, height=32
- Units per row: `floor(192 / tile_width)` = 4
- Max rows: `floor(78 / tile_height)` = 2 (max 8 units visible)
- Each unit drawn via `FUN_0056baff`
- Title: color 0x7C, font 18px, string 0x1BF (447) — hidden when ≥5 units (no room)
- **Centering** (from decompiled):
  - X start: `panel_x + ((panel_w - tile_w * perRow + 3) >> 1)` = 11
  - Y start (single row): `panel_y + ((panel_h - 30) >> 1)` = 236
  - Y start (two rows): `panel_y + ((panel_h - tile_h * maxRows + 2) >> 1)` = 220
- **Upkeep icons**: drawn per-unit at (unit_x, unit_y + icon_y_offset)
  - Icon Y offset: `FUN_00472cf0(0x20, zoom)` = 20 at zoom -3
  - Available width: `FUN_00472cf0(0x40, zoom)` = 40 at zoom -3
  - Icon size: `FUN_00511690(10)` = 10 in mode 2
  - Icons left-aligned: food icons, then shield icon (if support cost), then unhappy faces
- Clip to panel bounds (0, 212, 192, 78) to prevent overflow

---

## I. Improvements List (`FUN_00505ffa` at 0x505FFA)

- Panel outer: (0, 290, 192, 131), inner: (6, 306, 166, 108)
- Title: string 0x1C0 (448), color 0x7C, font 18px
- List start: panel_left + 2, panel_top + 1
- Row height: 12px
- Visible rows: (panel_height - 0.5) / 12
- Each entry:
  - Icon at (x, y) via FUN_005cef31
  - Text at x + 24, y - 1, color 0x29, font 10px, no shadow
  - Gold upkeep icon: panel_right - 14 - 4
- Scrollbar via `FUN_005db0d0` and `FUN_0040fd40`

---

## J. Info/Map/Happy Panel (`citywin_8ADC` at 0x508ADC)

Three modes selected by `cityobj + 0x15b0`:

### Mode 0: Info View (`citywin_70E5`, 2692 bytes)
- Title: string 0x1C3 (451), color 0x7C, font 18px
- Unit grid: tile_w from FUN_00472cf0(0x40, zoom), tile_h from FUN_00472cf0(0x30, zoom)
- Cols = 244px / tile_w, centered with remaining space
- 4 rows max (2 normal + 2 offset half-tile)
- Unit name labels (first 2 rows): color 10, font 26px
- Food stored display: at panel + (7, 100), grid width 64, icon size 30
- Trade route info: at panel + (0, 133), style color 0x79, font 18px

### Mode 1: Mini-Map View (`citywin_7B69`)
- Title: string 0x1C4 (452), color 0x7C, font 18px
- Tile size: computed to fit (panel_w - 4) / map_tiles_w
- City marker color: 0x29 (green)
- Unit marker color: 0x1D
- Terrain colors: 0x5D or 0x30 (based on ownership)

### Mode 2: Happy View (`citywin_8552`)
- Title: string 0x1C5 (453), color 0x7C, font 18px
- 5 horizontal rows: panel_height / 5 each
- Rows: food, shields, happy citizens, trade/corruption, final
- Before/after comparison with divider
- Divider lines: color 0x7C via FUN_005113b0

---

## K. Button Layout (`citywin_CF06` at 0x50CF06)

All positions relative to window content origin.

| Button | X | Y | W | H | Handler |
|---|---|---|---|---|---|
| Buy | 442 | 181 | 68 | 24 | `city_button_buy` |
| Change | 459 | 364 | 57 | 24 | `citywin_B9A4` |
| Info | 459+58 | 364 | 57 | 24 | `citywin_BA07` |
| Rename | 459+116 | 364 | 57 | 24 | `city_button_rename` |
| Happy | 459 | 364+25 | 57 | 24 | `citywin_BA6A` |
| Panorama | 459+58 | 364+25 | 57 | 24 | `city_button_view` |
| Exit | — | — | — | — | `citywin_BC4F` via FUN_0046ac89(2) |
| Prev City | 437 | 364 | 21 | 24 | `citywin_BF72` |
| Next City | 437 | 364+25 | 21 | 24 | `citywin_BD13` |
| Scrollbar | 192-scrollW | 290+1 | SM_CXVSCROLL | 131-2 | Improvements scroll |

---

## L. Font System (`create_font_8200` at 0x5C8200)

```c
LOGFONTA:
    lfHeight = -param_2          // negative = point size
    lfWidth = 0
    lfWeight = 400 (normal) or 700 (bold, if param_3 & 1)
    lfItalic = param_3 & 2
    lfUnderline = param_3 & 4
    lfStrikeOut = param_3 & 8
    lfCharSet = 0x01 (DEFAULT_CHARSET)
    lfOutPrecision = 0x04 (OUT_TT_PRECIS)
    lfClipPrecision = 0x01
    lfQuality = 0x00 (DEFAULT_QUALITY)
```

| Font ID | Face Name | PitchAndFamily |
|---|---|---|
| 0 | Times New Roman | 0x10 (FF_ROMAN) |
| 1 | Arial | 0x20 (FF_SWISS) |
| 2 | System | 0x00 |
| 3 | Courier | 0x30 (FF_MODERN) |

### Font Sizes in City Dialog
- At zoom < 2: font 12px, title 18px
- At zoom >= 2: font = scale(16), title = scale(24)
- Two fonts: main and small (2/3 of main size)

---

## M. Text/Color System (`FUN_005baee0` at 0x5BAEE0)

Sets current text rendering parameters:
```c
void FUN_005baee0(color_index, font_size, shadow_flag, bold_flag) {
    DAT_006366b0 = color_index;   // palette color index
    DAT_006366b4 = font_size;     // font size
    if (shadow_flag >= 0) DAT_006366b8 = shadow_flag;  // 1 = shadow text
    if (bold_flag >= 0) DAT_006366bc = bold_flag;       // 1 = bold
}
```

### All Palette Color Indices Used in City Dialog

| Index | Hex | Usage |
|---|---|---|
| 0x0B | 11 | Shield support / corruption label text |
| 0x1D | 29 | Unit position markers / warning text |
| 0x29 | 41 | Science icons / green text / city markers / improvement names |
| 0x2A | 42 | Food label / "We Love" indicator |
| 0x2C | 44 | Food storage frame |
| 0x2D | 45 | Food surplus bar fill |
| 0x2E | 46 | Food surplus label text |
| 0x30 | 48 | Food deficit bar fill / owned terrain |
| 0x39 | 57 | Food storage inner frame |
| 0x51 | 81 | Production shield frame highlight |
| 0x54 | 84 | Shield production bar / label |
| 0x5C | 92 | Shield surplus bar |
| 0x5D | 93 | Production shield inner frame / visible terrain |
| 0x5E | 94 | Luxury icons |
| 0x76 | 118 | Gold/tax icons / happiness modifier |
| 0x79 | 121 | Corruption/trade icons / trade route info |
| 0x7C | 124 | Title/header text / divider lines |

**Note**: These are palette indices, not RGB values. To get RGB, need to extract
the game's 8-bit palette via GetDIBColorTable or from a captured palette dump.
The DDraw proxy could capture this, or the GIF files' palettes can be used as
a reasonable approximation.

### Font Sizes Used
| Size | Usage |
|---|---|
| 18 (0x12) | Panel titles (citizens, units, improvements) |
| 26 (0x1A) | Unit name labels in info panel |
| 29 (0x1D) | Corruption/deficit text (larger warning) |
| 10 | Standard resource labels |

---

## N. Drawing Sequence (`citywin_8BC5` at 0x508BC5)

The master refresh draws panels in this exact order:

1. `FUN_0050207f` — **Citizens Row** (faces + titles)
2. `FUN_005025d5` — **Resource Rows** (terrain map + food/shields/trade)
3. `FUN_00504c05` — **Food Storage** (granary grid)
4. `FUN_0050503e` — **Production** (shield grid + item preview)
5. `FUN_005055dd` — **Buy Panel** (simple redraw)
6. `FUN_00505666` — **Units Supported** (unit sprites + upkeep)
7. `FUN_00505ffa` — **Improvements** (scrollable list)
8. `citywin_8ADC` — **Info/Map/Happy** (mode-dependent panel)

### Full Initialization Sequence (`citywin_9429`)
1. `FUN_004eb4ed` — calculate city production/resources
2. `citywin_9028` — determine zoom level, set fonts
3. `citywin_92AF` — set window title text
4. `FUN_005a9780` — prepare rendering surface
5. `FUN_00552112` — begin paint
6. `citywin_8EC6` — draw border/margins
7. `citywin_8D24` — compute all panel rectangles
8. `citywin_8BC5(0)` — draw all panels
9. `FUN_00408460` — end paint / flush

---

## O. Icon Spacing Algorithm (`FUN_00548b70` at 0x548B70)

```c
int FUN_00548b70(int count, int icon_size, int available_width,
                 int *out_fit_count, int *out_remainder) {
    if (icon_size < 2) icon_size = 1;
    if (count < 2) count = 1;
    int spacing = icon_size;
    if (count == 1) {
        *out_remainder = 0;
        *out_fit_count = 1;
    } else {
        available_width -= icon_size;  // space for last icon
        int gap = available_width / (count - 1);
        *out_remainder = available_width % (count - 1);
        *out_fit_count = count;
        if (gap < icon_size) {
            spacing = gap;
            if (gap < 1) {
                *out_fit_count = (available_width - icon_size) + 1;
                spacing = 1;
            }
        }
    }
    return spacing;
}
```

Used for all resource icon rows. When many icons, they overlap (spacing < icon_size).

---

## P. Sprite/Rectangle Drawing Primitives

### FUN_005cef31 — Primary sprite blit
```c
FUN_005cef31(result_rect, surface, x, y)
    → calls FUN_005d056c(result_rect, surface, 0xFFFFFFFF, x, y)
```

### FUN_00408780 — Filled rectangle with palette color
```c
FUN_00408780(x, y, width, height, palette_color_index)
    → creates RECT, fills with palette color via FUN_005c0333
```

### FUN_005113b0 — Horizontal/vertical line
```c
FUN_005113b0(x1, y1, x2, color_index)
```

### FUN_005113f0 — 3D frame (highlight + shadow)
```c
FUN_005113f0(rect, highlight_color, shadow_color)
```

---

## Q. Border/Margin Drawing (`citywin_8EC6` at 0x508EC6)

When the dialog is centered with extra space:
- Margins filled with palette color 10 (grey)
- Left/right: `FUN_00408780(offsetX, offsetY, paddingX, height, 10)`
- Top/bottom: `FUN_00408780(offsetX, offsetY, width, paddingY, 10)`

### Outer Border (4px 3D Bevel)

The entire city dialog window is surrounded by a 4-pixel 3D beveled border drawn
outside the 636x421 content area. The bevel layers from outermost to innermost:

| Layer | Offset | Color | RGB |
|---|---|---|---|
| 1 (outermost) | 0 | Black | rgb(0,0,0) |
| 2 | 1 | Highlight | rgb(223,223,223) |
| 3 | 2 | Light fill | rgb(192,192,192) |
| 4 (innermost) | 3 | Shadow | rgb(67,67,67) |

This expands the total canvas from **636x421** (content only) to **644x454**
(content + 4px border on each side + 25px title bar + 4px top border).
The browser implementation uses `ctx.translate(4, 29)` so that all existing
panel coordinates (which assume 0,0 = content origin) remain unchanged.

### Separator Line

A 1px horizontal line in rgb(67,67,67) is drawn immediately below the title bar,
separating it from the content area.

---

## R. City Name and Title Bar (`citywin_92AF` at 0x5092AF)

### Title Bar Dimensions
- **Height**: 24px (between the top inner border edge and the separator line)
- **Background**: stone texture tiled from `ICONS.GIF` at sprite origin **(199, 322)**, tile size **64x32**
- The stone tile is repeated horizontally across the full title bar width

### Window Control Icons (from ICONS.GIF)

All window icons are **16x16** pixels:

| Icon | Position in ICONS.GIF | Purpose |
|---|---|---|
| Close (X) | (1, 389) | Close the city dialog |
| Zoom Out (-) | (18, 389) | Decrease zoom level |
| Zoom In (+) | (35, 389) | Increase zoom level |

### City Navigation Arrows (from ICONS.GIF)

Navigation arrows are **18x24** pixels:

| Arrow | Position in ICONS.GIF | Purpose |
|---|---|---|
| Next City | (227, 389) | Navigate to next city |
| Prev City | (246, 389) | Navigate to previous city |

### Title Text

- **Format**: `"City of {name}, {year}, Population {pop} (Treasury: {gold} Gold)"`
- **Font**: Times New Roman, h=-24 (18px logical height)
- **Rendering**: 3-pass shadow text:
  1. Pass 1 (shadow): offset (+1, +1), dark color
  2. Pass 2 (shadow): offset (+1, +0) or (+0, +1), mid-dark color
  3. Pass 3 (foreground): offset (0, 0), fg color rgb(135, 135, 135)
- **Alignment**: Centered horizontally within the title bar

### Title Composition (from decompiled code)
1. Load city name format string (resource 0x1F)
2. Append city name from `&DAT_0064f360 + city_idx * 0x58`
3. If multiplayer: append player name + "of" + civ name
4. Append treasury in parentheses (format string 0x9A)
5. Render via `FUN_0055324c`


---

# Part VII: Browser Implementation Status

> **Source**: `reverse_engineering/Browser_Gap_Analysis.md`
>
> Feature-by-feature comparison of the decompiled Civ2 MGE code against the current browser
> implementation in `canvas-test-1/`. Identifies what exists, what's missing, and what the
> decompiled data can fill. Parser fields are cross-referenced with [Part III](#part-iii-data-structures)
> struct definitions. Missing features reference formulas in [Part IV](#part-iv-game-formulas--mechanics)
> and rendering details in [Part VI](#part-vi-city-dialog-rendering).

# Browser Implementation Gap Analysis

Comparison of the decompiled Civ2 MGE code against the current browser
implementation in `canvas-test-1/`. Identifies what exists, what's missing,
and what the decompiled data can fill.

---

## Parser (parser.js): COMPLETE

The save file parser covers every byte of every record type. No changes needed.

| Section | Bytes | Status |
|---|---|---|
| File header | 14 | Complete — magic, flags, type detection |
| Game state preamble | 330 | Complete — toggles, turn, difficulty, wonder IDs, tech bitmasks |
| Per-civ name blocks | 8 x 242 | Complete — leader, tribe, government titles |
| Per-civ data blocks | 8 x 1428 | Complete — treasury, government, tech, treaties, AI state, spaceship |
| Map header | 14 | Complete — dimensions, shape, seed |
| Map block 1 (known improvements) | 7 x map_size | Complete — per-civ fog of war |
| Map block 2 (tile data) | 6 x map_size | Complete — terrain, improvements, ownership |
| Map block 3 (quarter-res) | qw x qh x 2 | Complete |
| Unit records | N x 32 | Complete — all fields including dead slots |
| City records | N x 88 | Complete — every field decoded |
| Gap record | 32 | Complete |
| Tail data | 1807-2979 | Complete — city names, passwords, kill history, engine constants |
| Scenario events | Variable | Complete — triggers, actions, string table |

### City Fields Parsed (all 88 bytes)

| Parser Name | Offset | Size | Notes |
|---|---|---|---|
| cx, cy | +0, +2 | uint16 x 2 | Map coordinates |
| attribs1-4 | +4..+7 | byte x 4 | Decoded into flags below |
| canBuildCoastal | +4 bit 7 | flag | |
| autoBuild | +4 bit 4 | flag | |
| techStolen | +4 bit 3 | flag | |
| improvementSold | +4 bit 2 | flag | |
| weLoveKingDay | +4 bit 1 | flag | |
| civilDisorder | +4 bit 0 | flag | |
| canBuildHydro | +5 bit 2 | flag | |
| canBuildShips | +6 bit 5 | flag | |
| owner | +8 | uint8 | |
| size | +9 | uint8 | |
| originalOwner | +10 | uint8 | |
| turnsSinceCapture | +11 | uint8 | |
| knownToTribes | +12 | bitmask | |
| believedSize[8] | +14..+21 | byte x 8 | |
| specialistBytes[4] | +22..+25 | byte x 4 | 2-bit packed |
| foodInBox | +26 | int16 | |
| shieldsInBox | +28 | int16 | |
| netBaseTrade | +30 | int16 | |
| name | +32 | 16-char string | |
| workersInner/OuterA/OuterB | +48..+50 | byte x 3 | Bitmasks |
| specialistCount | +51 / 4 | uint8 | |
| buildings | +52 | uint32 bitmask | |
| buildingsV | +56 | uint8 bitmask | |
| itemInProduction | +57 | decoded {type, id} | |
| tradeRouteCount | +58 | uint8 | |
| tradeCommoditiesAvail[3] | +59..+61 | byte x 3 | |
| tradeCommoditiesDemand[3] | +62..+64 | byte x 3 | |
| tradeCommoditiesInRoute[3] | +65..+67 | byte x 3 | |
| tradePartnerCityIds[3] | +68..+73 | uint16 x 3 | |
| scienceOutput | +74 | int16 | |
| taxOutput | +76 | int16 | |
| totalTrade | +78 | int16 | |
| foodProduction | +80 | uint8 | |
| shieldProduction | +81 | uint8 | |
| happyCitizens | +82 | uint8 | |
| unhappyCitizens | +83 | uint8 | |
| sequenceId | +84 | uint16 | SAV only |

### Unit Fields Parsed (all 32 bytes)

| Parser Name | Offset | Size |
|---|---|---|
| x, y / gx, gy | +0, +2 | int16 x 2 |
| movementFlags + decoded bits | +4 | uint8 |
| statusFlags + decoded bits (veteran, etc.) | +5 | uint8 |
| type | +6 | uint8 |
| owner | +7 | uint8 |
| movePointsLeft | +8 | uint8 |
| visFlag | +9 | bitmask |
| hpLost | +10 | uint8 |
| lastDirection | +11 | uint8 |
| aiTaskRole | +12 | uint8 |
| cargoWorkFuel | +13 | uint8 |
| dead | +14 | uint8 |
| orders | +15 | uint8 |
| homeCityId | +16 | uint16 |
| gotoX, gotoY | +18, +20 | int16 x 2 |
| nextInStack, prevInStack | +22, +24 | int16 x 2 |
| sequenceId | +26 | uint16 |

### Civ Fields Parsed (all 1428 bytes)

Treasury, government, tech bitmask (93 techs), treaties[8], attitudes[8],
active unit counts[63], casualty counts[63], units in production[63],
continent statistics, power graph data, contact history, spaceship components,
continent goals[64].

---

## Map Renderer (renderer.js): ~90% Complete

### What EXISTS
- Full terrain compositing (base + overlay + coast + river)
- Roads and railroads with directional neighbor computation
- Improvements (irrigation, farmland, mining, pollution)
- Resources (special tiles + grassland shield)
- Goody huts
- City sprites by era/style/size with walls/open variants
- City flags, size boxes, name labels with civ colors
- Unit sprites with civ-color recoloring and shield system (HP bar, order letter, stacking)
- Fortress, airbase, fortify overlays
- Fog of war with three-state visibility (unexplored/dimmed/visible)
- Dither mask FOW rendering
- Ghost cities on dimmed tiles (using believed size)

### What is MISSING

| Feature | Details | Effort | Decompiled Source |
|---|---|---|---|
| Civil disorder indicator | Fist icon or red highlight on map | Medium | City flags bit 0 |
| WLTKD celebration indicator | Celebration effects | Medium | City flags bit 1 |
| Resistance/occupation indicator | Recently captured cities | Low | owner != originalOwner + turnsSinceCapture |
| Automated unit order letter | "A" on unit shield | Low | statusFlags bit 7 |
| AI task display | Task letter on shield (cheat mode) | Low | aiTaskRole high nibble |
| Cargo/commodity display | Caravan commodity tooltip only | Low | cargoWorkFuel field |
| Full unit stacking render | Only top unit shown | Medium | nextInStack/prevInStack linked list |
| Pollution/global warming overlay | Parsed but not visualized | Low | gameState fields |
| City style 4+ extras | CITIES.GIF has 7 rows, code uses 6 | Low | Era calculation |

---

## City Dialog (citydialog.js): ~75% Complete

### What EXISTS (10 panels + chrome)
1. **Outer border** — 4px 3D bevel (black/highlight/light/shadow), expands canvas to 644x454
2. **Title bar** — 24px stone-tiled bar from ICONS.GIF (199,322), 3-pass shadow text, window icons (close/zoom in/zoom out), city nav arrows, separator line
3. Background — CITY.GIF wallpaper with gold 3D beveled borders
4. Section labels — Citizens, City Resources, Food Storage, City Improvements, Resource Map
5. Citizens row — Face sprites by era from PEOPLE.GIF
6. Resource map — Isometric mini-map of 21 tiles with worked tile indicators
7. Resource rows — 4 rows: Food, Trade, Tax/Lux/Sci, Support/Production
8. Food storage — Wheat grid with granary line + growth progress
9. Production panel — Item preview + shield grid + buy cost + turns
10. Units supported — Up to 8 in 4x2 grid
11. City improvements — Scrollable list with thumbnails and sell icons
12. Units present / Info panel — Garrisoned units + trade route info
13. Buttons — Buy, Change, Info, Map, Rename, Happy, Panorama, Exit

### What is MISSING

| Feature | Details | Effort | Decompiled Source |
|---|---|---|---|
| Zoom support (-1/0/+1) | All coords hardcoded for zoom=2 | High | FUN_00511690 scaler |
| Happiness analysis panel | "Happy" button toggle mode | Medium | citywin_8552 (5 rows) |
| World minimap mode | "Map" button toggle mode | Medium | citywin_7B69 |
| Rename functionality | Button registered, no action | Low | city_button_rename |
| Buy/Change actions | Buttons display but don't modify state | Medium | city_button_buy |
| Prev/Next city navigation | Defined in REGIONS but not implemented | Low | citywin_BF72/BD13 |
| Improvement scrolling | Only 9 visible, no scroll arrows | Low | FUN_005db0d0 |
| Angry citizens (Anarchy) | Sprite columns 6-7 extracted but not drawn | Low | Happiness calc |
| Per-tile resource overlay | Only food drawn; shields+trade exist | Low | Resource map loop |
| Trade route revenue | Hardcoded "+1" instead of actual calc | Medium | Trade formulas |
| Resource map terrain overlays | No forest/mountain/hill on mini-map | Low | Terrain compositing |
| Resource map city/unit sprites | Spec says draw on mini-map, not done | Low | citywin_70E5 |

---

## City View (cityview.js): ~80% Complete

### What EXISTS
- Building placement from 68-slot table
- Background selection (ocean/river/inland x epoch)
- Alternative vegetation tiles
- Improvement and wonder sprite rendering

### What is MISSING
- Animated smoke/fire effects
- Population-dependent building density
- Building state changes (e.g., factory with power plant)

---

## Game Simulation: 0% Started

None of the following are implemented. All have been analyzed in the decompiled code.

| System | Parsed Data Available | Decompiled Formula Available | Files |
|---|---|---|---|
| Turn execution | Turn counter, toggles | Yes — main game loop | block_004E0000.c |
| Combat resolution | Unit A/D/HP, veteran | Yes — attack/defense formulas | block_00550000.c |
| Diplomacy | Treaties, attitudes, reputation | Partially — treaty logic | block_00460000.c |
| Research | Tech bitmask, progress, cost | Yes — Civ2_Game_Formulas.md #6 | block_004C0000.c |
| Government | Type, rates, senate | Yes — rate constraints | block_00400000.c |
| City production | What's being built, cost | Yes — Civ2_Game_Formulas.md #1 | block_00500000.c |
| City growth | Food box, granary | Yes — Civ2_Game_Formulas.md #2 | block_004E0000.c |
| Happiness | Happy/content/unhappy | Yes — Civ2_Game_Formulas.md #4 | block_004E0000.c |
| Corruption/waste | Distance, government | Yes — Civ2_Game_Formulas.md #5 | block_004E0000.c |
| Unit support | Free units per government | Yes — Civ2_Game_Formulas.md #7 | block_004E0000.c |
| Tile resources | Terrain + improvements | Yes — Civ2_Game_Formulas.md #3 | block_004E0000.c |
| Trade routes | Revenue, commodity matching | Partially | block_004E0000.c |
| Spaceship | Components, launch | Parsed only | block_00500000.c |
| AI decisions | Continent goals, task roles | Phase 2 renaming needed | block_00450000.c |
| Scenario events | Triggers, actions | Parsed, engine not built | block_00530000.c |

---

## Priority Integration Path

1. **City dialog polish** — Happiness panel, minimap mode, zoom support, per-tile resources
2. **Game formula library** — Centralize all formulas from `Civ2_Game_Formulas.md` into a `gameLogic.js` module
3. **Turn engine prototype** — Apply one turn of city production/growth/food to a loaded save
4. **Combat system** — Attack/defense resolution with terrain modifiers
5. **AI logic** — Phase 2 function renaming, then port decision-making


---

# Part VIII: Integration Roadmap

> **Source**: `reverse_engineering/Integration_Roadmap.md`
>
> Phase-by-phase plan for integrating the reverse-engineered data into the browser game.
> Each integration item references specific formulas from [Part IV](#part-iv-game-formulas--mechanics),
> struct fields from [Part III](#part-iii-data-structures), and rendering coordinates from
> [Part VI](#part-vi-city-dialog-rendering). Priority order: city dialog polish → game formulas
> → rendering fidelity → game simulation → full feature parity.

# Integration Roadmap — Decompiled Civ2 Data → Browser Game

## Overview

This roadmap details how to integrate the reverse-engineered data from `civ2.exe` (5,149 decompiled functions, 225K lines of C pseudocode) into the browser-based Civ2 implementation in `canvas-test-1/`.

**Current state**: The browser app has a complete save file parser, a sophisticated map renderer, and a functional city dialog. What it lacks is game simulation logic and some rendering polish.

## Data Sources Produced by Reverse Engineering

| Document | Lines | Content |
|---|---|---|
| `Civ2_City_Struct.md` | 328 | Complete 88-byte city struct (31 fields, all offsets mapped) |
| `Data_Structures.md` | 371 | Civilization (1428 bytes), Unit Type (20 bytes), Building (8 bytes), Unit Instance (32 bytes) |
| `Civ2_Game_Formulas.md` | 1559 | 7 major formulas with JS implementations: rush-buy, growth, resources, happiness, corruption, tech cost, unit support |
| `reverseEngCiv2EXE.md` | 350+ | Master RE documentation, code region map, function index |
| `rename_map.json` | 251 entries | Named function address map |
| Agent analysis (rendering) | — | Complete city dialog pixel coordinates, colors, fonts, drawing sequences from decompiled GDI code |

## Gap Analysis Summary

### Parser: COMPLETE
Every byte of the 88-byte city record, 32-byte unit record, and 1428-byte civ record is already parsed. No parser changes needed for basic integration.

### Map Renderer: ~90% complete
Missing: civil disorder indicator, WLTKD celebration, resistance/occupation visual, automated unit letter, pollution overlay.

### City Dialog: ~75% complete
Missing: buy cost display, food growth progress, happiness analysis panel, support map, per-tile resource overlay, angry citizens, improvement scrolling, zoom levels.

### Game Simulation: 0% started
Not yet implemented: turn execution, combat, diplomacy, research, government mechanics, AI.

---

## Phase 1: City Dialog Enhancement (Proof of Concept)

**Goal**: Demonstrate direct integration of decompiled data by making the city dialog pixel-perfect and functional.

### 1.1 Rush-Buy Cost Display
- **Source**: `city_button_buy` at 0x509B48 → `Civ2_Game_Formulas.md` Section 1
- **Target**: `citydialog.js` → `_drawProduction()` method
- **Implementation**: Add `calculateBuyCost(item, shieldsStored)` function, display cost below Buy button
- **Formula**:
  - Units: `cost = remaining_shields × 2`
  - Buildings: `cost = remaining² / 20 + remaining × 2`
  - Wonders: `cost = remaining_shields × 4`
  - Double if zero shields invested

### 1.2 Food Growth Progress
- **Source**: `FUN_004e7eb1` → `Civ2_Game_Formulas.md` Section 2
- **Target**: `citydialog.js` → `_drawFoodStorage()` method
- **Implementation**: Show "X/Y food to grow" text, display granary effect
- **Formula**: `food_needed = (city_size + 1) × food_box_factor` (default factor = 10)

### 1.3 Icon Spacing Algorithm (replaces hardcoded table)
- **Source**: `FUN_00548b70` at 0x548B70 (decompiled)
- **Target**: `citydialog.js` → `_resourceSpacing()` method
- **Implementation**: Replace 12-entry lookup table with the actual Civ2 algorithm:
  ```javascript
  function iconSpacing(count, iconSize, availableWidth) {
    if (count <= 1) return iconSize;
    const gap = Math.floor((availableWidth - iconSize) / (count - 1));
    return Math.min(gap, iconSize);
  }
  ```

### 1.4 Panel Coordinate Verification
- **Source**: `citywin_8D24` panel rectangle definitions (decompiled)
- **Current**: Coordinates from Civ2-clone project
- **Decompiled values** (authoritative, at zoom=2):

| Panel | Current (Civ2-clone) | Decompiled (civ2.exe) | Delta |
|---|---|---|---|
| Citizens outer | (3,2,433,44) | (0,0,436,61) | Wider, taller |
| Food Storage | (437,0,195,163) | (436,0,200,167) | 1px left, 5px wider, 4px taller |
| Production | (437,165,195,191) | (436,167,200,189) | 1px left, 2px down, 5px wider |
| Info Panel | (193,215,242,198) | (192,212,244,209) | 1px left, 3px up, 2px wider, 11px taller |
| Units Supported | (7,215,184,69) | (0,212,192,78) | 7px left, 3px up, 8px wider, 9px taller |
| Improvements | (5,306,170,108) | (0,290,192,131) outer / (6,306,166,108) inner | Inner matches |

Note: The current code uses the *inner* draw areas which are close to correct. The decompiled code reveals the *outer* panel bounds are larger. The wallpaper bitmap fills the outer areas, so inner draw origins are more relevant for rendering.

### 1.5 Color Palette Verification
- **Source**: `FUN_005baee0` text color system + decompiled palette indices
- **Decompiled palette color indices used in city dialog**:

| Index | Usage | Need RGB mapping |
|---|---|---|
| 0x0B (11) | Shield support / corruption label | Yes |
| 0x29 (41) | Science / green text / city markers | Yes |
| 0x2C (44) | Food storage frame | Yes |
| 0x2D (45) | Food surplus bar | Yes |
| 0x51 (81) | Production shield frame | Yes |
| 0x54 (84) | Shield production bar | Yes |
| 0x76 (118) | Gold/tax icons | Yes |
| 0x79 (121) | Corruption/trade icons | Yes |
| 0x7C (124) | Title/header text / dividers | Yes |

To map these to RGB: need to extract the actual palette from the game's 8-bit color table (via `GetDIBColorTable` or from a captured palette).

---

## Phase 2: Game Formula Integration

### 2.1 Trade Distribution
- **Source**: `Civ2_Game_Formulas.md` Section 7 (trade split)
- **Target**: `citydialog.js` → `_drawResourceRows()`
- **Impact**: Currently reads cached values from save file; can now verify/compute from scratch
- **Formula**:
  - Luxury AND Gold → Marketplace (×1.5), Bank (×1.5), Stock Exchange (×1.5)
  - Science → Library (×1.5), University (×1.5), Research Lab or SETI (×1.5)
  - Science → Isaac Newton's College doubles building effect in wonder city
  - Science → Copernicus' Observatory doubles total in wonder city

### 2.2 Happiness Calculation
- **Source**: `FUN_004ea8e4` (2627 bytes) → `Civ2_Game_Formulas.md` Section 4
- **Target**: New `_drawHappinessAnalysis()` method in citydialog.js
- **Impact**: Enables the "Happy" button to show happiness breakdown
- **Breakdown rows**: Base, Luxury, Temples, Colosseums, Cathedrals, Police, Wonders, Martial Law, WLTKD

### 2.3 Corruption and Waste
- **Source**: `FUN_004e989a` → `Civ2_Game_Formulas.md` Section 5
- **Target**: Verify corruption display in trade row
- **Formula**: `corruption = (distance × trade × 3) / (gov_divisor × 20)`

### 2.4 Technology Cost
- **Source**: `FUN_004c2788` → `Civ2_Game_Formulas.md` Section 6
- **Target**: Future tech tree display
- **Formula**: `cost = (difficulty × 2 + 6) × techs_known × multiplier`

### 2.5 Unit Support
- **Source**: `FUN_004e7d7f` → `Civ2_Game_Formulas.md` Section 7
- **Target**: `_drawUnitsSupported()` — show upkeep icons per unit
- **Per government**: Anarchy/Despotism = pop free, Republic = 0 free, Democracy = all cost 1

---

## Phase 3: Rendering Fidelity

### 3.1 Zoom Level Support
- **Source**: `FUN_00511690` universal coordinate scaler
- **Impact**: The game supports 3 zoom levels (1=small, 2=normal, 3=large)
- **Implementation**: Multiply all REGIONS coordinates by `zoomLevel / 2`
- **Threshold**: zoom 1 when screen < 636px wide; zoom 3 when screen >= 950px wide and config flag set

### 3.2 Font System Matching
- **Source**: `create_font_8200` at 0x5C8200
- **Exact fonts**: Times New Roman (roman), Arial (swiss), System, Courier (modern)
- **Sizes**: 18px for panel titles, 10px for resource labels, 26px for unit names in info panel
- **Weights**: 400 (normal) or 700 (bold, when param_3 & 1)

### 3.3 Drawing Sequence Verification
- **Source**: `citywin_8BC5` master refresh function
- **Exact order**: Citizens → Resources → Food Storage → Production → Buy Panel → Units Supported → Improvements → Info/Map/Happy
- **Current code matches** this order.

### 3.4 Happiness Panel Mode
- **Source**: `citywin_8552` — divides panel into 5 horizontal rows showing before/after happiness
- **Target**: New `_drawHappinessPanel()` method toggled by "Happy" button
- **Layout**: Panel height / 5 per row, divider lines at color 0x7C

### 3.5 Mini-Map Panel Mode
- **Source**: `citywin_7B69` — fits world map into info panel with colored markers
- **Target**: New `_drawMiniMap()` method toggled by "Map" button
- **Layout**: Tile size computed to fit panel, city markers color 0x29, unit markers color 0x1D

---

## Phase 4: Game Simulation (Future)

### 4.1 Turn Execution Engine
- Build a `turnEngine.js` module that applies one turn of game logic
- Read all city/unit/civ data from parsed save → compute new state → render

### 4.2 Combat Resolution
- **Source**: Functions in 0x550000-0x5AFFFF (decompiled)
- **Formula**: Attack power vs defense power with terrain/veteran/fortification modifiers
- **HP system**: Unit HP × firepower per round

### 4.3 AI Decision Making
- **Source**: Functions in 0x450000-0x4FFFFF (580+ functions, heavily FUN_xxxxxxxx)
- **Phase 2 renaming needed**: Use AI agents to analyze function bodies for semantic names
- **Long-term goal**: Port AI logic for single-player mode

### 4.4 Diplomacy System
- **Source**: Civ struct diplomatic_status[8], attitude[8], border_friction[8]
- **Decompiled**: Treaty flags (contact, ceasefire, peace, alliance, war)

---

## Phase 5: Full Feature Parity

### 5.1 Scenario/Events Engine
- Parser already handles EVNT blocks with trigger/action records
- Need: Event evaluation engine for scenario mode

### 5.2 Multiplayer Foundation
- Decompiled: XDaemon.dll networking, action stacking pattern
- Need: WebSocket-based multiplayer protocol

### 5.3 Sound/Music
- WINMM.dll imports show MCI + wave output
- Need: Web Audio API integration with original MIDIs/WAVs

---

## COSMIC Constants (from RULES.TXT, loaded by decompiled code)

These 22 constants control core game mechanics. The decompiled code shows exactly how each is used:

| # | Default | Meaning | Used in |
|---|---|---|---|
| 0 | 1 | Road movement multiplier | Movement calc |
| 3 | 10 | Food box size factor | City growth (forced even) |
| 4 | 10 | Shield box size factor | Production cost |
| 7 | 4 | Content citizens base | Happiness calc |
| 8 | 10 | Unhappiness offset | Happiness calc |
| 11 | 3 | Tech cost multiplier (tenths) | Research cost |
| 13 | 0 | Free support: Monarchy (case 2) | Unit support |
| 14 | 0 | Free support: Communism (case 3) | Unit support |
| 15 | 0 | Free support: Fundamentalism | Unit support |
| 16 | 1 | Communism equiv. distance | Corruption |
| 21 | 0 | Max luxury under Fundamentalism | Rate slider |

The browser parser currently reads these from the save file tail section. They can be used directly in formula calculations.

---

## File Mapping: Decompiled → Browser

| Decompiled Region | Browser Target | Status |
|---|---|---|
| City window (0x500-0x510) | `citydialog.js` | Active integration |
| GDI layer (0x5B0-0x5D0) | `renderer.js`, `citydialog.js` | Coordinate verification |
| Game logic (0x450-0x4FF) | Future `gameLogic.js` | Formulas extracted |
| Map handlers (0x410-0x412) | `app.js` (click/key handlers) | Reference only |
| Save/load (0x470-0x477) | `parser.js` | Already complete |
| AI (0x450-0x4FF) | Future `ai.js` | Phase 2 renaming needed |
| Combat (0x550-0x5AF) | Future `combat.js` | Partially analyzed |

## Priority Order / Status

### Completed
- Rush-buy cost formula (Section 1) + food growth display (Section 2)
- Icon spacing algorithm (Section O — FUN_00548b70)
- Trade distribution formulas (Section 8 — luxury/science/gold split)
- Unit support display (Section H + Section 7 — per-government free unit rules)
- Happiness calculation (Section 4 — 13 discrepancies fixed)
- Corruption/waste formulas (Section 5)
- Resource row bar colors: support(0x54), surplus(0x5C), corruption(0x79) — confirmed via game palette + screenshots
- Units Supported panel layout (decoded from FUN_00505666, zoom -3 dimensions)
- Resource map icon spacing (tile width=48, padding=8, iconSize+1=11)
- Game palette vs GIF palette distinction documented

### Remaining
- **Shield waste bar**: game palette 0x0B = rgb(11,11,11). Not yet rendered — requires computing raw shield total from tile yields to derive waste = raw − shieldProduction. The corruption/waste formula (Section 5) can be used but needs tile yield summation in the city dialog
- **Trade bar color**: palette 0x76 (118) — RGB not yet captured (beyond palette dump range 0-103). Need to extend ddraw proxy palette capture or sample from game screenshot
- **Tax/Lux/Sci background bar**: game palette 0x79 full-width bar. Binary confirmed (line 2031-2034). Not yet rendered
- **Panel title text color**: palette 0x7C (124) — RGB not yet captured
- **Later**: Turn engine, combat, AI, multiplayer
