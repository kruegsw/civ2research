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
| 121 | 6 | — | Blue text |
| 85 | 4 | — | Dark blue |
| 118 | 4 | — | Link/highlight |

\* Approximate — actual RGB depends on the active palette.

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
- **[104+]:** Additional terrain, unit, and UI colors

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
- **Text colors from palette**: Text colors should be derived from the game palette, not hardcoded — the game does `GetDIBColorTable(index, 1)` to get text RGB values
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
