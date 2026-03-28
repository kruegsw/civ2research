# Dialog Visual Design — New Game Setup

Comprehensive visual documentation of all new game setup dialogs.
Derived from screenshots taken 2026-03-28.

---

## Background / Full Screen

### Main background color
- Warm brownish-tan solid fill — approximately rgb(160,130,90) — a muted khaki/ochre tone
- Covers entire game window behind all dialogs and the medallion

### Civilization II Medallion (always centered on background)
- Large circular emblem, always centered on screen throughout all setup dialogs
- Rendered in sepia/golden tones matching background
- Content: Columbia/Liberty figure holding staff + shield on left, second figure on right
- Text "CIVILIZATION II" along bottom arc
- Fades into background — no hard border, blends with warm tan fill
- Diameter: approximately 300–350px at game resolution

### Artwork Banner
- Size: 606×279 (including 6px border) → 600×273 image area
- **Orange/amber outer border frame**: ~3–4px solid orange-amber line surrounding entire banner
- The orange frame is distinctive and consistent across all banner positions
- Artwork inside: either B&W engravings/etchings or color photographs depending on dialog
- Positioned at top of screen (y≈119) — x position cycles per dialog (left/center/right)

---

## Common Dialog Visual Language

All new game setup dialogs (01–09) share the same visual template:

### Overall Structure
```
┌─────────────────────────────────────────┐
│  Title Bar (gradient grey, serif title) │  ~20px
├─────────────────────────────────────────┤
│                                         │
│  Radio Button Area (textured grey)      │  variable
│                                         │
├─────────────────────────────────────────┤
│  Button Strip (lighter, raised)         │  ~38px
└─────────────────────────────────────────┘
```

### Dialog Outer Border
- Thin single-pixel dark border at outermost edge
- Inner: 1px lighter highlight (classic Win32 WS_DLGFRAME 3D bevel)
- 6px padding between border and content

### Title Bar
- Background: smooth light grey — approximately rgb(210,210,210), slight gradient lighter at center
- Title text: **serif font** (Times New Roman or close variant), ~14–16px, **black**, horizontally centered
- No close/minimize buttons — pure dialog style
- Height: approximately 20px

### Radio Button Area (content body)
- Background: **stippled/textured medium grey** — NOT flat
  - Fine noise or crosshatch pattern overlaid on ~rgb(185,185,185) base
  - Pattern appears to be a Windows brush (PatBlt with hatched brush) or custom drawn stipple
  - Distinct from the smooth button strip below it
- 6px left padding before radio button circles

### Radio Button Controls
- Small circle (~10px diameter), thin 1px dark outline
- **Selected state**: filled dark dot in center
- **Unselected state**: empty circle (outline only, transparent center)
- Self-drawn (not standard Win32 BUTTON BS_RADIOBUTTON — no WM_GETFONT, text drawn via DrawTextA)
- Label text: **serif font**, approximately 13px, dark grey (not pure black — approximately rgb(60,60,60))
- Row height: 27px (confirmed from window data)
- Text left-aligned after circle with ~6px gap

### Separator Between Body and Buttons
- Thin 2-line separator: 1px dark line + 1px white line below it
- Classic Win32 inset groove effect
- Separates radio area from button strip

### Button Strip
- Background: solid lighter grey, approximately rgb(200,200,200) — smoother than body
- Height: ~38px (buttons are 36px with 1px padding each side)
- Slight top highlight on strip background (lighter than center)

### Buttons
- **3D bevel/raised appearance:**
  - Top edge: 1–2px white/light highlight
  - Left edge: 1–2px white/light highlight
  - Bottom edge: 1–2px dark shadow (~rgb(100,100,100))
  - Right edge: 1–2px dark shadow
  - Inner face: solid medium grey ~rgb(195,195,195) flat fill
- Label text: **serif font**, ~13px, **black**, horizontally centered
- No icon — text only
- Width varies by dialog (161px, 243px, 301px, 333px depending on button count)

---

## Per-Dialog Visual Notes

### Dialog 01 — Select Size of World
- 3 radio options, label text includes size info: "Small (40x50 squares, quick game)"
- **"Small" selected** (filled dot on first option)
- 3 buttons: Custom | OK | Cancel — each ~161px wide
- Body height accommodates 3 rows @ 27px each

### Dialog 02 — Select Difficulty Level
- 6 radio options
- **"Prince" selected** (3rd option, filled dot)
- 2 buttons only: OK | Cancel — each ~243px wide (wider to fill same strip)
- No Random button
- Tallest setup dialog at 280px

### Dialog 03 — Select Level of Competition
- 5 radio options
- **"5 Civilizations" selected** (3rd option, filled dot)
- 3 buttons: Random | OK | Cancel — each ~161px wide

### Dialog 04 — Select Level of Barbarian Activity
- 4 radio options
- **"Villages Only" selected** (1st option, filled dot)
- 3 buttons: Random | OK | Cancel

### Dialog 05 — Select Game Rules
- 2 radio options
- **"Use Standard Rules" selected** (1st option, filled dot)
- 2 buttons: OK | Cancel — each ~243px wide (wider, matching difficulty dialog)

### Dialog 06 — Select Gender
- 2 radio options
- **"Male" selected** (1st option, filled dot)
- 2 buttons: OK | Cancel
- Shortest content area of any dialog

### Dialog 07 — Select Your Tribe
- **3-column layout** — widest dialog (926px) to fit 21 civs
- Each column has 7 radio options, left-aligned within column
- **"Americans" selected** (col 1, 5th row — filled dot visible)
- All other options: empty circles
- Column spacing: each column ~300px wide
- 3 buttons: Custom | OK | Cancel — each ~301px wide
- Body has same stipple texture but wider

### Dialog 08 — Please Enter Your Name
- **Different layout** — no radio buttons
- "Name:" label self-drawn on left of text input
- **MSEditBoxClass** text input field: white background, pre-filled "Abe Lincoln"
  - Font: Times New Roman h=-16 (slightly smaller than title)
  - White/light fill inside edit box
  - Thin 1px dark border around edit box
- 2 buttons: OK | Cancel — each ~333px wide

### Dialog 09 — Select Your City Style
- **4 options, each 276×48px** (much taller than 27px standard rows)
- Each option renders a small isometric city icon (~40×40px) on left + text label
- City icons appear to come from CITIES.GIF or CITY.GIF sprite sheet
- Text labels: "Bronze Age Monolith", "Classical Forum", "Far East Pavilion", "Medieval Castle"
- Body has same stipple texture; icons drawn directly into control
- 2 buttons: OK | Cancel — each ~243px wide

### Dialog 10 — In the Beginning
- **Completely different layout** — no radio buttons, informational text only
- Left side: small American seal medallion (~50×50px), sepia toned
- Right of seal: multi-line text block, serif font, dark grey
- Body area has same stipple grey texture
- 1 button only: **OK** — full-width (~732px), the only dialog with a single full-width button

---

## Font Summary

| Location | Font | Size (h) | Style | Color |
|----------|------|----------|-------|-------|
| Dialog title bar | Serif (Times New Roman) | ~16px | Regular | Black |
| Radio button labels | Serif | ~13px | Regular | Dark grey ~rgb(60,60,60) |
| Button labels | Serif | ~13px | Regular | Black |
| Name input (dialog 08) | Times New Roman | h=-16 | Regular | Black |
| "In the Beginning" body | Serif | ~13px | Regular | Dark grey |

---

## Main Game Window Visual Design

### Map Panel ("American Map")
- **Background**: pure black (unexplored = black tiles)
- Revealed tiles: isometric terrain graphics (grassland, plains, hills, water)
- Tile size: standard Civ2 isometric (~64×32px diamond tiles)
- **"American Map"** title: drawn at top-center of map panel, serif font, black on light grey header bar
- Starting revealed area: small cluster centered around (39,9) — a few tiles visible
- Zoom controls: two 23×23 buttons at top-left of map panel (zoom in / zoom out icons)

### Right Sidebar

**Top-right panel (minimap + status, 262×148):**
- **"World"** section header: serif, centered, black on grey
- Minimap: black background, ~220×80px, green dot = player position
- Separator line between World and Status sections
- **"Status"** section header: serif, centered
- Status content lines (serif, ~11–12px):
  - "10,000 People"
  - "4000 B.C."
  - "0 Gold. 4.0.6"
  - Small leader portrait icon (~18×18px) to right of year line

**Right sidebar panel (unit info, 262×844):**
- Background: same stipple grey texture as dialogs
- **"Moving Units"** section header: darker background bar, white/light text, centered
- Per-unit entry block:
  - Small unit sprite (~28×28px, isometric) on left
  - Text lines to right: "Moves: 1 / NONE / American" and terrain below unit "(Plains)"
  - Second unit: "NONE / No Orders / Settlers"
- Unit sprite appears to be from UNITS.GIF sprite sheet
- Thin separator lines between unit entries

### Menu Bar
- Standard Win32 menu bar, white/light grey background
- Menu items: **Game | Kingdom | View | Orders | Advisors | World | Cheat | Editor | Civilopedia**
- Font: system default (not Times New Roman — standard Win32 menu font)
- Height: ~43px from top of client area (includes 1px border)
