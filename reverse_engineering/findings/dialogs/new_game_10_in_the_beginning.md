# Dialog: In the Beginning . . .

Observed: 2026-03-28, after clicking OK on "Select Your City Style" (Classical Forum selected).

## Window Hierarchy

```
[top-level] 0x001005AE  MSWindowClass  "In the Beginning . . ."  (DIALOG, WS_POPUP)
  [child z=0] 0x001309F8  MSControlClass  — OK (full-width button)
```

## Dialog Window (0x001005AE)

- Title: **"In the Beginning . . ."**
- Size: 750×172 @ (588,867) — bottom-center, widest dialog so far
- Client area: 744×166 (6px border each side)
- Style: `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME`
- ExStyle: `WS_EX_WINDOWEDGE`
- Owner: 0x00050B48 (main game window)
- HWND suffix `05AE` — same suffix class as the artwork banner child windows (coincidence or pattern TBD)

## Content

Dialog body contains:
- **Small civ medallion/seal** rendered on the left (~50×50px) — the American Columbia seal
- **Flavor text** (self-drawn via WM_PAINT):

> "Abe Lincoln, you have risen to become leader of the Americans. May your reign be long
> and prosperous. The Americans have knowledge of Irrigation, Mining, and Roads."

### Game Data Embedded in Text

- **Player name confirmed:** Abe Lincoln
- **Civ confirmed:** Americans
- **Starting technologies (3):** Irrigation, Mining, Roads

These are the Americans' starting techs as defined in RULES.TXT. The dialog reads them
from memory and formats them into the flavor string at game start.

## OK Button (z=0)

- Size: **732×36** — spans almost full dialog width (no Cancel)
- Screen Y: 997
- Screen X: 597
- This is the only button — no Cancel option (game setup is committed at this point)

## Background / Main Window Changes

**Significant changes from setup dialogs:**

1. **Menu bar now live** — Game, Kingdom, View, Orders, Advisors, World, Cheat, Editor, Civilopedia
   - "Cheat" menu visible in menu bar
2. **Artwork banner child window gone** — no more cycling 606×279 photo banner
3. **Background:** Full golden/sepia tone with large centered Civilization II medallion
   (Columbia/Liberty figure with shield, "CIVILIZATION II" text at bottom)
4. Main game window is still `WS_DISABLED` (dialog is blocking)

This is the transition point from setup dialogs to the live game state.

## Memory State

- sniff-game.py still showing 0 changes at time of capture
- **World generation has likely completed** by the time this dialog appears
- First memory snapshot should be taken immediately after clicking OK
- Expected: civ struct at 0x64C6A0, city struct at 0x64F340, map data, unit instances

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_001348/`:
- `top_0x001005AE_In_the_Beginning_._._..bmp` — dialog (750×172)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
