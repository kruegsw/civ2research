# Dialog: Select Level Of Barbarian Activity

Observed: 2026-03-28, after clicking OK on "Select Level Of Competition" (5 Civilizations).

## Window Hierarchy

```
[top-level] 0x000D09F8  MSWindowClass  "Select Level Of Barbarian Activity"  (DIALOG, WS_POPUP)
  [child z=0] 0x00070084  MSControlClass  — Villages Only    ← default selected
  [child z=1] 0x003202B8  MSControlClass  — Roving Bands
  [child z=2] 0x00070B5C  MSControlClass  — Restless Tribes
  [child z=3] 0x001A0B06  MSControlClass  — Raging Hordes
  [child z=4] 0x00060B5E  MSControlClass  — OK     (bordered, x=333)
  [child z=5] 0x00070B50  MSControlClass  — Cancel (bordered, x=497)
  [child z=6] 0x00340B70  MSControlClass  — Random (bordered, x=170)
```

## Dialog Window (0x000D09F8)

- Title: **"Select Level Of Barbarian Activity"**
- Size: 506×216 @ (161,792) — bottom-left of screen
- Client area: 500×210 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0..3)

- Size: 480×27, no border
- **Default selection: Villages Only (z=0)**

| z | Screen Y | Label           | Internal value |
|---|----------|-----------------|----------------|
| 0 | 835      | Villages Only   | 0              |
| 1 | 867      | Roving Bands    | 1              |
| 2 | 899      | Restless Tribes | 2              |
| 3 | 931      | Raging Hordes   | 3              |

## Bottom Buttons (z=4,5,6)

- Size: 161×36, client 159×34 (2px border)
- Screen Y: 966
- Screen order (left→right): Random → OK → Cancel

| z | Screen X | Label  |
|---|----------|--------|
| 6 | 170      | Random |
| 4 | 333      | OK     |
| 5 | 497      | Cancel |

## Background Artwork Change

The 605×278 photo banner (HWND 0x000905AE):
- **Position:** x=1160 (top-right)
- **Image:** Barbarian raid scene — mounted warriors attacking a settlement, classical engraving style. Thematically matched to "Barbarian Activity".

Artwork rotation so far (confirmed pattern):
1. Select Size of World:          aerial city panorama,          top-center (x=660)
2. Select Difficulty Level:       stone idol / Olmec head,       top-right  (x=1160)
3. Select Level of Competition:   classical figures procession,  top-left   (x=161)
4. Select Barbarian Activity:     barbarian raid / cavalry,      top-right  (x=1160)

## Memory State

- No game memory changes yet
- Barbarian level will be encoded in memory once game starts

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_000413/`:
- `top_0x000D09F8_Select_Level_Of_Barbarian_Acti.bmp` — dialog (506×216)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
