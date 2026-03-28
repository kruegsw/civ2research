# Dialog: Select Gender

Observed: 2026-03-28, after clicking OK on "Select Game Rules" (Use Standard Rules).

## Window Hierarchy

```
[top-level] 0x000F09F8  MSWindowClass  "Select Gender"  (DIALOG, WS_POPUP)
  [child z=0] 0x00360B70  MSControlClass  — Male    ← default selected
  [child z=1] 0x001C0B06  MSControlClass  — Female
  [child z=2] 0x00090B50  MSControlClass  — OK     (bordered, x=719)
  [child z=3] 0x00080B5E  MSControlClass  — Cancel (bordered, x=964)
```

## Dialog Window (0x000F09F8)

- Title: **"Select Gender"**
- Size: 506×152 @ (710,856) — bottom-center of screen
- Client area: 500×146 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0,1)

- Size: 480×27, no border
- **Default selection: Male (z=0)**

| z | Screen Y | Label  | Effect                                      |
|---|----------|--------|---------------------------------------------|
| 0 | 899      | Male   | Uses male leader name (e.g. "Abe Lincoln")  |
| 1 | 931      | Female | Uses female leader name (e.g. "E. Roosevelt") |

## Bottom Buttons (z=2,3)

- Size: 243×36, client 241×34 (2px border)
- Screen Y: 966

| z | Screen X | Label  |
|---|----------|--------|
| 2 | 719      | OK     |
| 3 | 964      | Cancel |

## Game Logic Note

Gender selection maps to which leader name is used for the player civ. From memory dump of civ/leader strings:
- Romans: Caesar (male) / Livia (female)
- Babylonians: Hammurabi (male) / Ishtari (female)
- Germans: Frederick (male) / Maria Theresa (female)
- Egyptians: Ramesses (male) / Cleopatra (female)
- Americans: Abe Lincoln (male) / E. Roosevelt (female)
- Greeks: Alexander (male) / Hippolyta (female)
- Indians: Mohandas Gandhi (male) / Indira Gandhi (female)

## Background Artwork Change

The 606×279 photo banner (HWND 0x000B05AE):
- **Position:** x=660 (top-center)
- **Image:** Group of figures in Middle Eastern/Ottoman-style robes and turbans — diverse peoples and dress styles. Thematically: peoples/cultures for leader identity selection.

Artwork rotation so far:
1. Select Size of World:        aerial city panorama,          top-center (x=660)
2. Select Difficulty Level:     stone idol / Olmec head,       top-right  (x=1160)
3. Select Level of Competition: classical figures procession,  top-left   (x=161)
4. Select Barbarian Activity:   barbarian raid / cavalry,      top-right  (x=1160)
5. Select Game Rules:           naval battle scene,            top-left   (x=161)
6. Select Gender:               Ottoman/Middle Eastern figures, top-center (x=660)

Position pattern appears to cycle: center → right → left → right → left → center → ...

## Memory State

- No game memory changes yet

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_000632/`:
- `top_0x000F09F8_Select_Gender.bmp` — dialog (506×152)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
