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
  - Luxury → excess gold via Marketplace (×1.5), Bank (×1.5), Stock Exchange (×1.5)
  - Science → Library (×1.5), University (×1.5), Research Lab (×1.5), Copernicus (×1.5)

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
| 13 | 0 | Free support: Republic/Democracy | Unit support |
| 14 | 0 | Free support: Monarchy/Communism | Unit support |
| 15 | 0 | Free support: Fundamentalism | Unit support |
| 16 | 1 | Communism equiv. distance | Corruption |
| 21 | 0 | Max luxury under Communism | Rate slider |

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

## Priority Order

1. **NOW**: Rush-buy cost + food growth display (proves the pipeline works)
2. **Next**: Happiness panel, icon spacing algorithm, panel coordinate corrections
3. **Soon**: Trade distribution formulas, unit support display, mini-map panel
4. **Later**: Turn engine, combat, AI, multiplayer
