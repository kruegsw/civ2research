# Dialog: Please Enter Your Name

Observed: 2026-03-28, after clicking OK on "Select Your Tribe" (Americans selected, Male gender).

## Window Hierarchy

```
[top-level] 0x001109F8  MSWindowClass    "Please Enter Your Name"  (DIALOG, WS_POPUP)
  [child z=0] 0x0026064C  MSEditBoxClass  — text input, pre-filled "Abe Lincoln"
  [child z=1] 0x002F0B7C  MSControlClass  — OK     (bordered, x=629)
  [child z=2] 0x00600B0E  MSControlClass  — Cancel (bordered, x=964)
```

## Dialog Window (0x001109F8)

- Title: **"Please Enter Your Name"**
- Size: 686×126 @ (620,882) — bottom-center, wider than most but narrower than tribe dialog
- Client area: 680×120 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)

## Text Input (z=0) — FIRST MSEditBoxClass SEEN

- Class: **MSEditBoxClass** (new control type — all previous dialogs used MSControlClass)
- HWND: 0x0026064C
- Size: 345×30 @ (696,922)
- Font: **Times New Roman h=-16 Regular** charset=1 quality=0
- Pre-filled value: **"Abe Lincoln"** (male Americans leader name from civ/leader string table)
- No border (0w 0h)
- Style: `WS_CHILD | WS_VISIBLE`

## "Name:" Label

- No separate label control in window hierarchy — self-drawn via WM_PAINT on dialog
- Rendered to the left of the MSEditBoxClass control (approx x=629, y=922)

## Bottom Buttons (z=1,2)

- Size: 333×36, client 331×34 (2px border)
- Screen Y: 966

| z | Screen X | Label  |
|---|----------|--------|
| 1 | 629      | OK     |
| 2 | 964      | Cancel |

No "Random" button — only OK/Cancel (same as Select Game Rules and Select Gender).

## Pre-fill Logic

The default name is determined by:
1. Tribe selection (Americans → civ index 4)
2. Gender selection (Male → male leader slot)
3. Lookup in civ/leader string table at `0x04BD5A00`–`0x04BD5E00`
   → "Abe Lincoln" for Americans male

If Female had been selected, default would be "E. Roosevelt".

## Background Artwork

- Banner: same tribal figures as Select Your Tribe, x=660 (top-center) — no change
- **NEW: Large circular seal/medallion** now visible on main game background
  - Appears to be the American seal (Columbia/Liberty figure with shield)
  - Civ-specific emblem, drawn onto the background after tribe confirmation
  - This is the first background element drawn on the main game canvas — suggests tribe
    selection triggers a civ-specific background render

## Memory State

- No game memory changes yet (still 0 changes in sniff-game.py log at ~4370s)
- Name string may be written to memory on OK, or deferred until world generation

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_001045/`:
- `top_0x001109F8_Please_Enter_Your_Name.bmp` — dialog (686×126)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
