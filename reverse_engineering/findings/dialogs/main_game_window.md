# Main Game Window

Observed: 2026-03-28, Turn 1, 4000 B.C., immediately after clicking OK on "In the Beginning".

## Top-Level Window

```
HWND 0x00050B48  MSWindowClass  "Civilization II Multiplayer Gold"
  window:  1936x1048 @ (-8,-8)  (maximized, bleeds under taskbar)
  client:  1920x989
  style:   WS_VISIBLE | WS_MAXIMIZE | WS_CAPTION | WS_BORDER | WS_DLGFRAME |
           WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX
  state:   ENABLED (was DISABLED during all setup dialogs)
```

Key change from setup: `WS_DISABLED` removed — game is now interactive.

## Child Windows (game UI panels)

### Map Panel (z=0) — 0x01CD0B76
```
  MSWindowClass  1658x989 @ (0,43)  client: 1652x983
  Title: (none) — labeled "American Map" via self-drawn text
  style: WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
```
- Covers left ~86% of client area (0 to 1657px)
- Top 43px = menu bar height
- Contains two 23×23 MSControlClass children at (11,52) and (36,52) — zoom/scroll buttons

### Right Sidebar — Unit/City Info Panel (z=1) — 0x001409F8
```
  MSWindowClass  262x844 @ (1658,192)  client: 256x838
  style: WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
```
- Right panel, lower portion: 262×844, starting y=192
- Contains unit info, orders, terrain description
- Shows "Moving Units" section with unit sprites and stats

### Top-Right Info Panel — Minimap + Status (z=2) — 0x001105AE
```
  MSWindowClass  262x148 @ (1658,43)  client: 256x142
  style: WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
```
- Right panel, upper portion: 262×148, starting y=43 (just below menu bar)
- Contains World minimap + Status (population, year, gold, version)
- Observed content: "World" label, minimap with green dot, "Status" section

### Hidden City/Advisor Window (z=3) — 0x000E0654
```
  MSWindowClass  976x680 @ (475,200)  client: 970x674
  style: WS_CHILD | WS_CLIPSIBLINGS (hidden — no WS_VISIBLE)
```
- Large hidden child window, pre-created at game start
- 976×680 — sized for city screen or advisor dialog
- Hidden until needed (city click or advisor hotkey)

## Layout Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Menu bar (Game | Kingdom | View | Orders | Advisors | World |  │  43px
│           Cheat | Editor | Civilopedia)                         │
├────────────────────────────────────┬──────────────────┬─────────┤
│                                    │  Top-Right Panel │         │
│                                    │  0x001105AE      │  148px  │
│         Map Panel                  │  262x148         │         │
│         0x01CD0B76                 ├──────────────────┤         │
│         1658x989                   │  Right Sidebar   │         │
│         ("American Map")           │  0x001409F8      │  844px  │
│                                    │  262x844         │         │
│                                    │                  │         │
└────────────────────────────────────┴──────────────────┘
 ←————————————— 1658px ————————————→ ←——— 262px ———→
                                      total: 1920px client width
```

## Right Panel Content (from screenshot, Turn 1 4000 B.C.)

### Top-Right (Minimap + Status)
- **"World"** label
- Minimap: black background, green dot = player position
- **Status section:**
  - 10,000 People
  - 4000 B.C.
  - 0 Gold
  - 4.0.6 (game version)

### Right Sidebar (Unit Info)
- **"Moving Units"** section header
- Unit 1: sprite + "Moves: 1 / NONE / American" + "Settlers (Plains)"
- Unit 2: sprite + "NONE / No Orders / Settlers"
- Two Settlers awaiting orders — both visible, both on Plains terrain

## Other Top-Level Windows (hidden)

### Pre-created popup — 0x009B0920
```
  MSWindowClass  646x405 @ (640,294)  HIDDEN
  18 children: z=0 (28x28 icon), z=1-15 (buttons 313/209/156px wide),
               z=16 (MSEditBoxClass 620x314, Times New Roman h=-21, vertical scrollbar),
               z=17 (MSScrollBarClass 620x17, horizontal scrollbar)
```
- Large pre-created hidden dialog with a scrollable text area (620×314)
- Likely: **Civilopedia** or **Advisor text** window
- Two new control classes first seen here:
  - `MSScrollBarClass` — scrollbar control
  - Multiple button groups at varying widths (156, 209, 313px)

### MrTimer — 0x00C40B12
```
  class: MSMrTimerClass  1440x753 @ (104,104)  HIDDEN
  style: WS_CAPTION | WS_BORDER | WS_DLGFRAME | WS_SYSMENU | WS_THICKFRAME |
         WS_MINIMIZEBOX | WS_MAXIMIZEBOX
```
- New window class: **MSMrTimerClass** — multiplayer turn timer
- Hidden at game start in single-player; would become visible in multiplayer
- Full resizable window with title bar and system buttons

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_003022/`:
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
