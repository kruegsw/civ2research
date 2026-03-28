# Dialog: Select Level Of Competition

Observed: 2026-03-28, after clicking OK on "Select Difficulty Level" (Deity selected).

## Window Hierarchy

```
[top-level] 0x000C09F8  MSWindowClass  "Select Level Of Competition"  (DIALOG, WS_POPUP)
  [child z=0] 0x00230B82  MSControlClass  — 7 Civilizations
  [child z=1] 0x00330B70  MSControlClass  — 6 Civilizations
  [child z=2] 0x00060B50  MSControlClass  — 5 Civilizations   ← default selected
  [child z=3] 0x00050B5E  MSControlClass  — 4 Civilizations
  [child z=4] 0x00190B06  MSControlClass  — 3 Civilizations
  [child z=5] 0x00060084  MSControlClass  — OK     (bordered, x=1430)
  [child z=6] 0x003102B8  MSControlClass  — Cancel (bordered, x=1594)
  [child z=7] 0x00060B5C  MSControlClass  — Random (bordered, x=1267)
```

## Dialog Window (0x000C09F8)

- Title: **"Select Level Of Competition"**
- Size: 506×248 @ (1258,760) — bottom-right of screen
- Client area: 500×242 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0..4)

- Size: 480×27, no border
- **Default selection: 5 Civilizations (z=2)**

| z | Screen Y | Label            | # of civs |
|---|----------|------------------|------------|
| 0 | 803      | 7 Civilizations  | 7          |
| 1 | 835      | 6 Civilizations  | 6          |
| 2 | 867      | 5 Civilizations  | 5          |
| 3 | 899      | 4 Civilizations  | 4          |
| 4 | 931      | 3 Civilizations  | 3          |

## Bottom Buttons (z=5,6,7)

- Size: 161×36, client 159×34 (2px border)
- Screen Y: 966
- Screen order (left→right): Random → OK → Cancel

| z | Screen X | Label  |
|---|----------|--------|
| 7 | 1267     | Random |
| 5 | 1430     | OK     |
| 6 | 1594     | Cancel |

Note: z-order (5,6,7) does NOT match left-to-right screen order — Random is z=7 but leftmost.

## Background Artwork Change

The 605×278 photo banner (HWND 0x000805AE) has:
- **Moved:** x position 1160 → 161 (back to top-left)
- **New image:** Classical engraving of a group of historical figures — warriors and nobles in a procession/gathering scene, dark ink-on-paper style

Artwork rotation pattern so far:
1. Select Size of World: aerial city panorama photo, top-center (x=660)
2. Select Difficulty Level: stone idol/Olmec head close-up, top-right (x=1160)
3. Select Level of Competition: classical engraving of ancient figures, top-left (x=161)

The banner cycles through positions (left/center/right) and images with each dialog.

## Memory State

- No game memory changes yet — still pre-world-generation
- Number of civs will be written to memory once confirmed

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_000249/`:
- `top_0x000C09F8_Select_Level_Of_Competition.bmp` — dialog (506×248)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
