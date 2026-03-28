# Dialog: Select Your City Style

Observed: 2026-03-28, after clicking OK on "Please Enter Your Name" (Abe Lincoln).

## Window Hierarchy

```
[top-level] 0x001209F8  MSWindowClass  "Select Your City Style"  (DIALOG, WS_POPUP)
  [child z=0] 0x00300B7C  MSControlClass  — Bronze Age Monolith
  [child z=1] 0x00610B0E  MSControlClass  — Classical Forum
  [child z=2] 0x0027064C  MSControlClass  — Far East Pavilion
  [child z=3] 0x001A02F6  MSControlClass  — Medieval Castle
  [child z=4] 0x00070B8E  MSControlClass  — OK     (bordered, x=1267)
  [child z=5] 0x00760B78  MSControlClass  — Cancel (bordered, x=1512)
```

## Dialog Window (0x001209F8)

- Title: **"Select Your City Style"**
- Size: 506×292 @ (1258,716) — bottom-right of screen
- Client area: 500×286 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)

## Radio Buttons (z=0..3) — With Inline City Icons

- Size: **276×48** (much taller than previous 27px options — renders city art icon + text)
- No border
- **First dialog where radio controls contain artwork, not just text**

| z | Label                | City art style      |
|---|----------------------|---------------------|
| 0 | Bronze Age Monolith  | Pyramid/ziggurat    |
| 1 | Classical Forum      | White columned building (Greek/Roman) |
| 2 | Far East Pavilion    | Red/yellow pagoda   |
| 3 | Medieval Castle      | Stone castle        |

No default selection clearly indicated (no pre-highlighted option visible in screenshot).
No "Random" button on this dialog.

## Bottom Buttons (z=4,5)

- Size: 243×36, client 241×34 (2px border)
- Screen Y: 966

| z | Screen X | Label  |
|---|----------|--------|
| 4 | 1267     | OK     |
| 5 | 1512     | Cancel |

## City Style Icons

Each 276×48 MSControlClass control self-draws a small city isometric icon on the left side
(approx 40×40px) alongside the text label. Icons appear to come from CITIES.GIF or CITY.GIF
sprite sheets. This is the first dialog type where radio buttons contain embedded artwork.

## Background Artwork Change

- Banner moved to **x=161 (top-left)**
- **New image:** Chinese imperial building — wide, dark-roofed structure with courtyard
  (Tiananmen-style). Thematically matched to "City Style" / architecture.
- American seal medallion remains visible in center of main game background

Artwork rotation so far:
1. Select Size of World:          aerial city panorama,           top-center (x=660)
2. Select Difficulty Level:       stone idol / Olmec head,        top-right  (x=1160)
3. Select Level of Competition:   classical figures procession,   top-left   (x=161)
4. Select Barbarian Activity:     barbarian raid / cavalry,       top-right  (x=1160)
5. Select Game Rules:             naval battle scene,             top-left   (x=161)
6. Select Gender:                 Ottoman/Middle Eastern figures, top-center (x=660)
7. Select Your Tribe:             diverse indigenous figures,     top-center (x=660)
8. Please Enter Your Name:        (same as tribe — no change)     top-center (x=660)
9. Select Your City Style:        Chinese imperial building,      top-left   (x=161)

## Memory State

- Still 0 changes in sniff-game.py log — no memory writes yet
- City style selection will likely be written to memory after OK

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_001219/`:
- `top_0x001209F8_Select_Your_City_Style.bmp` — dialog (506×292)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
