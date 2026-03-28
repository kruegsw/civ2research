# Dialog: Select Difficulty Level

Observed: 2026-03-28, after clicking OK on "Select Size of World" (Small selected).

## Window Hierarchy

```
[top-level] 0x000B09F8  MSWindowClass  "Select Difficulty Level"  (DIALOG, WS_POPUP)
  [child z=0] 0x00050B5C  MSControlClass  — Chieftain (easiest)
  [child z=1] 0x003002B8  MSControlClass  — Warlord
  [child z=2] 0x00050084  MSControlClass  — Prince        ← default selected
  [child z=3] 0x00180B06  MSControlClass  — King
  [child z=4] 0x00040B5E  MSControlClass  — Emperor
  [child z=5] 0x00050B50  MSControlClass  — Deity (toughest)
  [child z=6] 0x00220B82  MSControlClass  — OK     (bordered button)
  [child z=7] 0x00320B70  MSControlClass  — Cancel (bordered button)
```

## Dialog Window (0x000B09F8)

- Title: **"Select Difficulty Level"**
- Size: 506×280 @ (161,728) — bottom-left of screen
- Client area: 500×274 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0..5)

- Size: 480×27, no border
- Style: `WS_CHILD | WS_VISIBLE | WS_TABSTOP`
- **Default selection: Prince (z=2)**

| z | Screen Y | Label              | Internal value |
|---|----------|--------------------|----------------|
| 0 | 771      | Chieftain (easiest)| 0              |
| 1 | 803      | Warlord            | 1              |
| 2 | 835      | Prince             | 2              |
| 3 | 867      | King               | 3              |
| 4 | 899      | Emperor            | 4              |
| 5 | 931      | Deity (toughest)   | 5              |

## Bottom Buttons (z=6,7)

- Size: 243×36, client 241×34 (2px border)
- Screen Y: 966

| z | Screen X | Label  |
|---|----------|--------|
| 6 | 170      | OK     |
| 7 | 415      | Cancel |

## Background Artwork Change

The 605×278 photo banner child window (HWND 0x000705AE) has:
- **Moved:** x position 660 → 1160 (shifted to top-right corner)
- **New image:** Close-up of a stone idol / Olmec-style carved head sculpture (dark, dramatic)
- Previous image (Select Size of World): Aerial city/civilization panorama

**Key finding:** The artwork banner changes image AND position with each dialog screen — thematically relevant art per question. This needs to be replicated in the browser version.

## Memory State

- No game memory changes — still pre-world-generation
- Difficulty level will be written to 0x00655B02 once confirmed

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_000109/`:
- `top_0x000B09F8_Select_Difficulty_Level.bmp` — dialog (506×280)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)

## Notes

- Same pattern: no ctrlIDs, MSControlClass, text drawn by Civ2
- Difficulty maps to memory address 0x00655B02 (confirmed from sniff-game.py)
- Values: 0=Chieftain, 1=Warlord, 2=Prince, 3=King, 4=Emperor, 5=Deity
