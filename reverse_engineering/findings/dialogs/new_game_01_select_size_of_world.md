# Dialog: Select Size of World

Observed: 2026-03-27, immediately after clicking "Start a New Game" on the title screen.

## Window Hierarchy

```
[top-level] 0x000A09F8  MSWindowClass  "Select Size of World"  (DIALOG, WS_POPUP)
  [child z=0] 0x00040B50  MSControlClass  — Small  (40x50 squares, quick game)
  [child z=1] 0x00030B5E  MSControlClass  — Normal (50x80 squares)
  [child z=2] 0x00170B06  MSControlClass  — Large  (75x120 squares, long game)
  [child z=3] 0x00040B5C  MSControlClass  — OK      (bordered button)
  [child z=4] 0x002F02B8  MSControlClass  — Cancel  (bordered button)
  [child z=5] 0x00040084  MSControlClass  — Custom  (bordered button)
```

## Dialog Window (0x000A09F8)

- Title: **"Select Size of World"**
- Size: 506×184 @ (710,824) — bottom-center of screen
- Client area: 500×178 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)
- ctrlID=none on all children — consistent with all Civ2 dialogs

## Radio Buttons (z=0,1,2)

- Class: `MSControlClass`
- Size: 480×27, client 480×27 (no border)
- Style: `WS_CHILD | WS_VISIBLE | WS_TABSTOP` (0x50010000)
- ExStyle: `WS_EX_NOPARENTNOTIFY`
- **Default selection: Small (z=0)**

| z | Screen Y | Label                            | Map Size    |
|---|----------|----------------------------------|-------------|
| 0 | 867      | Small  (40x50 squares, quick game) | 40×50      |
| 1 | 899      | Normal (50x80 squares)           | 50×80       |
| 2 | 931      | Large  (75x120 squares, long game) | 75×120    |

## Bottom Buttons (z=3,4,5)

- Class: `MSControlClass`
- Size: 161×36, client 159×34 (2px border each side)
- Style: `WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_TABSTOP`
- Screen Y: 966 (all three)

| z | Screen X | Label  |
|---|----------|--------|
| 5 | 719      | Custom |
| 3 | 882      | OK     |
| 4 | 1046     | Cancel |

Note: button z-order (3,4,5) does NOT match left-to-right screen order (Custom=z5, OK=z3, Cancel=z4).

## Background (Main Game Window)

During this dialog, the main window background has changed from the title screen:
- Old: dark aerial landscape photo + medallion, dark blue-tinted background
- New: warm sandy tan background (~rgb(180,160,120)), medallion centered and larger
- New artwork: **605×278 horizontal photo banner** (aerial city/civilization view, orange border)
  at position (660,119) — this is a new child window (HWND 0x000605AE) replacing the old 398×248 medallion overlay

## Memory State

- No game memory changes detected during this dialog
- All setup dialogs are pre-game — memory writes begin at world generation

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260327_235626/`:
- `top_0x000A09F8_Select_Size_of_World.bmp` — dialog (506×184)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)

## Key Observations

- Same `MSControlClass` / no-ctrlID pattern as title screen buttons
- Radio buttons drawn entirely by Civ2 (text not returned by GetWindowTextW)
- "Custom" button (z=5) presumably opens a sub-dialog for manual map dimensions
- World size choices: Small=40×50, Normal=50×80, Large=75×120
