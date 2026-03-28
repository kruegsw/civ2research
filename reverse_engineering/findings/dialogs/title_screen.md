# Dialog: Title Screen

Observed: 2026-03-27, sniff-windows.py + sniff-game.py session.

## Window Hierarchy

```
[top-level] 0x00050B48  MSWindowClass  "Civilization II Multiplayer Gold"  (MAIN GAME, WS_DISABLED)
  [child]   0x000505AE  MSWindowClass  (no title)                          (medallion/logo overlay, 398x248)

[top-level] 0x000909F8  MSWindowClass  "Civilization II Multiplayer Gold"  (MENU DIALOG, WS_POPUP)
  [child]   0x000B090E  MSControlClass (no title)  z=0  — Start a New Game
  [child]   0x0053070A  MSControlClass (no title)  z=1  — Start on Premade World
  [child]   0x000200BE  MSControlClass (no title)  z=2  — Customize World
  [child]   0x000200AA  MSControlClass (no title)  z=3  — Begin Scenario
  [child]   0x00030084  MSControlClass (no title)  z=4  — Load a Game
  [child]   0x002E02B8  MSControlClass (no title)  z=5  — Multiplayer Game
  [child]   0x00030B5C  MSControlClass (no title)  z=6  — View Hall of Fame
  [child]   0x00160B06  MSControlClass (no title)  z=7  — View Credits
  [child]   0x00030B50  MSControlClass (no title)  z=8  — (bottom-left button, 156x36)
  [child]   0x00020B5E  MSControlClass (no title)  z=9  — (bottom-right button, 156x36)

[top-level] 0x00210B32  MSMMWindow     (no title)  hidden  — multimedia/video window
```

## Main Game Window (0x00050B48)

- Size: 1936×1048 @ (-8,-8) — fullscreen with standard border offset
- Client area: 1920×989 (title bar + border = 16w 59h)
- Style: `WS_VISIBLE | WS_DISABLED | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_MAXIMIZE | WS_CAPTION | WS_BORDER | WS_DLGFRAME | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX`
- ExStyle: `WS_EX_WINDOWEDGE`
- **WS_DISABLED** — main window is disabled while the menu dialog is modal
- Child overlay (0x000505AE): 398×248 @ (161,119), client 392×242, WS_CAPTION+WS_DLGFRAME, 3px border — this is the medallion/intro image

## Menu Dialog (0x000909F8)

- Size: 333×344 @ (1431,664) — positioned bottom-right of screen
- Client area: 327×338 (3px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window) — this is a modal popup, not a child
- **ctrlID=none on all child controls** — Civ2 does not use standard dialog control IDs

### Menu Buttons (z=0..7)

- Class: `MSControlClass`
- Size: 307×27, client 307×27 (no border)
- Style: `WS_CHILD | WS_VISIBLE | WS_TABSTOP` (0x50010000 — the 0x10000 bit = WS_TABSTOP in child context)
- ExStyle: `WS_EX_NOPARENTNOTIFY`
- Positioned at x=1444, y starting at 707, spaced 32px apart:
  | z | y    | Menu Option           |
  |---|------|-----------------------|
  | 0 | 707  | Start a New Game      |
  | 1 | 739  | Start on Premade World|
  | 2 | 771  | Customize World       |
  | 3 | 803  | Begin Scenario        |
  | 4 | 835  | Load a Game           |
  | 5 | 867  | Multiplayer Game      |
  | 6 | 899  | View Hall of Fame     |
  | 7 | 931  | View Credits          |
- Button text is **not** returned by GetWindowTextW — Civ2 draws all text itself via DrawTextA

### Bottom Buttons (z=8..9)

- Size: 156×36, client 154×34 (1px border each side)
- Style: `WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_TABSTOP` — visually distinct from menu buttons (have a border)
- Positioned at y=966:
  | z | x    | Purpose (unknown — likely OK/Quit) |
  |---|------|-------------------------------------|
  | 8 | 1440 | Left bottom button                  |
  | 9 | 1599 | Right bottom button                 |

## Memory State During Title Screen

- All game state addresses read as zero/default
- Wonders array shows all wonders as "built" — uninitialized memory artifact
- Turn=0, Difficulty=Chieftain, Map=0×0, Seed=0
- **0 changes detected** in ~630 seconds of polling at ~4600 Hz
- Title screen is entirely GDI-rendered; no game state written to memory until a menu option is selected

## Font & DPI

- **WM_GETFONT returns NULL on every window** — Civ2 never sets a window font via WM_SETFONT. All text is drawn manually via DrawTextA with custom font creation. No standard font handle is queryable.
- **DPI: 96 (100%)** on all windows — no DPI scaling in effect

## System Colors (Windows theme at time of capture)

These are the Windows system colors active during the session. Civ2 may inherit some of these for UI elements:

| Color Name               | RGB              | Hex     |
|--------------------------|------------------|---------|
| COLOR_WINDOW             | rgb(255,255,255) | #FFFFFF |
| COLOR_BTNFACE            | rgb(240,240,240) | #F0F0F0 |
| COLOR_BTNSHADOW          | rgb(160,160,160) | #A0A0A0 |
| COLOR_BTNHIGHLIGHT       | rgb(255,255,255) | #FFFFFF |
| COLOR_3DDKSHADOW         | rgb(105,105,105) | #696969 |
| COLOR_3DLIGHT            | rgb(227,227,227) | #E3E3E3 |
| COLOR_HIGHLIGHT          | rgb(  0,120,212) | #0078D4 |
| COLOR_HIGHLIGHTTEXT      | rgb(255,255,255) | #FFFFFF |
| COLOR_BTNTEXT            | rgb(  0,  0,  0) | #000000 |
| COLOR_ACTIVECAPTION      | rgb(153,180,209) | #99B4D1 |
| COLOR_INACTIVECAPTION    | rgb(191,205,219) | #BFCDDB |

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260327_231424/`:
- `top_0x000909F8_Civilization_II_Multiplayer_Go.bmp` — menu dialog (333×344)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full game window (1936×1048)

## Key Observations

- Buttons have **no control IDs** — identification is by z-order (creation order) and screen position only
- Main window is **WS_DISABLED** while dialog is open — true Win32 modal pattern
- Dialog is a **WS_POPUP** owned by the main window (not a child window)
- `MSWindowClass` and `MSControlClass` are Civ2's own custom window classes
- All text is self-drawn by Civ2 — WM_GETFONT returns NULL everywhere
