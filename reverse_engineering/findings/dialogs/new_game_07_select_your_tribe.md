# Dialog: Select Your Tribe

Observed: 2026-03-28, after clicking OK on "Select Gender" (Male selected).

## Window Hierarchy

```
[top-level] 0x001009F8  MSWindowClass  "Select Your Tribe"  (DIALOG, WS_POPUP)
  [child z=0]  MSControlClass  — Romans           (col 1, x=513)
  [child z=1]  MSControlClass  — Babylonians      (col 1)
  [child z=2]  MSControlClass  — Germans          (col 1)
  [child z=3]  MSControlClass  — Egyptians        (col 1)
  [child z=4]  MSControlClass  — Americans        (col 1) ← default selected
  [child z=5]  MSControlClass  — Greeks           (col 1)
  [child z=6]  MSControlClass  — Indians          (col 1)
  [child z=7]  MSControlClass  — Russians         (col 2, x=813)
  [child z=8]  MSControlClass  — Zulus            (col 2)
  [child z=9]  MSControlClass  — French           (col 2)
  [child z=10] MSControlClass  — Aztecs           (col 2)
  [child z=11] MSControlClass  — Chinese          (col 2)
  [child z=12] MSControlClass  — English          (col 2)
  [child z=13] MSControlClass  — Mongols          (col 2)
  [child z=14] MSControlClass  — Celts            (col 3, x=1113)
  [child z=15] MSControlClass  — Japanese         (col 3)
  [child z=16] MSControlClass  — Vikings          (col 3)
  [child z=17] MSControlClass  — Spanish          (col 3)
  [child z=18] MSControlClass  — Persians         (col 3)
  [child z=19] MSControlClass  — Carthaginians    (col 3)
  [child z=20] MSControlClass  — Sioux            (col 3)
  [child z=21] MSControlClass  — OK     (bordered, x=812)
  [child z=22] MSControlClass  — Cancel (bordered, x=1116)
  [child z=23] MSControlClass  — Custom (bordered, x=509)
```

## Dialog Window (0x001009F8)

- Title: **"Select Your Tribe"**
- Size: 926×312 @ (500,696) — much wider than previous dialogs (926px vs 506px)
- Client area: ~920×306 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- Owner: 0x00050B48 (main game window)

## Radio Buttons — 21 Civs in 3 Columns

- Size: ~300×27, no border
- **Default selection: Americans (z=4, column 1)**

### Column 1 — Screen X ≈ 513

| z | Label        |
|---|--------------|
| 0 | Romans       |
| 1 | Babylonians  |
| 2 | Germans      |
| 3 | Egyptians    |
| 4 | Americans    |
| 5 | Greeks       |
| 6 | Indians      |

### Column 2 — Screen X ≈ 813

| z  | Label    |
|----|----------|
| 7  | Russians |
| 8  | Zulus    |
| 9  | French   |
| 10 | Aztecs   |
| 11 | Chinese  |
| 12 | English  |
| 13 | Mongols  |

### Column 3 — Screen X ≈ 1113

| z  | Label          |
|----|----------------|
| 14 | Celts          |
| 15 | Japanese       |
| 16 | Vikings        |
| 17 | Spanish        |
| 18 | Persians       |
| 19 | Carthaginians  |
| 20 | Sioux          |

## Bottom Buttons (z=21,22,23)

- Size: 301×36 (wider than all previous dialogs)
- Screen Y: ~966
- Screen order (left→right): Custom → OK → Cancel

| z  | Screen X | Label  |
|----|----------|--------|
| 23 | 509      | Custom |
| 21 | 812      | OK     |
| 22 | 1116     | Cancel |

Note: z-order does NOT match screen order (same pattern as competition/barbarian dialogs).

## Background Artwork Change

The photo banner:
- **Position:** x=660 (top-center)
- **Image:** Group of diverse indigenous/tribal figures — various cultural dress styles. Thematically: tribe/people selection.

Artwork rotation so far:
1. Select Size of World:          aerial city panorama,           top-center (x=660)
2. Select Difficulty Level:       stone idol / Olmec head,        top-right  (x=1160)
3. Select Level of Competition:   classical figures procession,   top-left   (x=161)
4. Select Barbarian Activity:     barbarian raid / cavalry,       top-right  (x=1160)
5. Select Game Rules:             naval battle scene,             top-left   (x=161)
6. Select Gender:                 Ottoman/Middle Eastern figures, top-center (x=660)
7. Select Your Tribe:             diverse indigenous figures,     top-center (x=660)

Position pattern: center → right → left → right → left → center → center → ...

## Game Logic Notes

- 21 playable civs total (7 per column × 3 columns)
- "Custom" button presumably opens a sub-dialog for customizing civ settings
- Americans defaults as selected (z=4 in first column) — same as the user's preferred civ
- Leader names for Americans: Abe Lincoln (male) / E. Roosevelt (female) — set in previous dialog

## Memory State

- No game memory changes yet — still pre-world-generation
- First memory writes expected during/after tribe selection or at world generation start

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_*/`:
- `top_0x001009F8_Select_Your_Tribe.bmp` — dialog (926×312)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
