# Dialog: Select Game Rules

Observed: 2026-03-28, after clicking OK on "Select Level Of Barbarian Activity" (Villages Only).

## Window Hierarchy

```
[top-level] 0x000E09F8  MSWindowClass  "Select Game Rules"  (DIALOG, WS_POPUP)
  [child z=0] 0x00070B5E  MSControlClass  — Use Standard Rules   ← default selected
  [child z=1] 0x00080B50  MSControlClass  — Customize Rules
  [child z=2] 0x00350B70  MSControlClass  — OK     (bordered, x=1267)
  [child z=3] 0x001B0B06  MSControlClass  — Cancel (bordered, x=1512)
```

## Dialog Window (0x000E09F8)

- Title: **"Select Game Rules"**
- Size: 506×152 @ (1258,856) — bottom-right of screen
- Client area: 500×146 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0,1)

- Size: 480×27, no border
- **Default selection: Use Standard Rules (z=0)**

| z | Screen Y | Label               |
|---|----------|---------------------|
| 0 | 899      | Use Standard Rules  |
| 1 | 931      | Customize Rules     |

Note: "Customize Rules" presumably opens a sub-dialog with individual rule toggles (not explored this session).

## Bottom Buttons (z=2,3)

- Size: 243×36, client 241×34 (2px border) — wider than previous dialogs
- Screen Y: 966

| z | Screen X | Label  |
|---|----------|--------|
| 2 | 1267     | OK     |
| 3 | 1512     | Cancel |

No "Random" button on this dialog (only OK/Cancel).

## Background Artwork Change

The 606×279 photo banner (HWND 0x000A05AE, slightly larger than previous 605×278):
- **Position:** x=161 (top-left)
- **Image:** Naval battle scene — ships on fire at night, cannon smoke, dramatic dark engraving. Thematically matched to "Game Rules" / conflict/warfare.

Artwork rotation so far:
1. Select Size of World:          aerial city panorama,          top-center (x=660)
2. Select Difficulty Level:       stone idol / Olmec head,       top-right  (x=1160)
3. Select Level of Competition:   classical figures procession,  top-left   (x=161)
4. Select Barbarian Activity:     barbarian raid / cavalry,      top-right  (x=1160)
5. Select Game Rules:             naval battle scene,            top-left   (x=161)

## Memory State

- No game memory changes yet

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_000525/`:
- `top_0x000E09F8_Select_Game_Rules.bmp` — dialog (506×152)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
