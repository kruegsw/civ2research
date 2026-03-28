# What Shall We Build Dialog (Production Picker)

Appears when clicking "Change" in the city window, or automatically after founding a city.
Title includes the city name.

Captured during Deity game, 3 civs, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x00230B5C | visible | "What shall we build in Washington?"
  class:   MSWindowClass
  window:  686×274 @ (620, 765)
  style:   WS_POPUP | WS_VISIBLE | WS_CAPTION | WS_DLGFRAME
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x009C0B78 | button 1 (left)
    class:   MSControlClass
    window:  221×36 @ (629, 997)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX

  HWND 0x00370852 | button 2 (middle)
    class:   MSControlClass
    window:  221×36 @ (852, 997)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX

  HWND 0x0019035E | button 3 (right)
    class:   MSControlClass
    window:  221×36 @ (1076, 997)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "What shall we build in {city name}?"
- **Body:** Scrollable list of available units/buildings/wonders (GDI-drawn)
- **3 buttons** (221×36 each) at bottom, evenly spaced:
  - Left (629, 997) — likely "Units" / category filter
  - Middle (852, 997) — likely "Improvements" / category filter
  - Right (1076, 997) — likely "OK" or "Wonders"
- **Size:** 686×274
- **Position:** lower area of screen (620, 765)

---

## Advisor Popups

When the production picker opens, advisor windows appear simultaneously:

```
HWND 0x01170B74 | "Domestic Advisor" | 399×192 @ (1521, 5)
HWND 0x00440B32 | "Military Advisor" | (uses shared dialog template)
```

These are positioned at the top-right of the screen and provide advice on what to build.

---

## Screenshot

`screenshots/20260328_115145/top_0x00230B5C_What_shall_we_build_in_Washing.bmp`
`screenshots/20260328_115145/top_0x00440B32_Military_Advisor.bmp`
`screenshots/20260328_115145/top_0x01170B74_Domestic_Advisor.bmp`

---

## Notes

- This dialog auto-appears after founding a city (can be too fast to capture manually)
- The backslash key (\) triggers window capture via sniff-game.py --hooks
- Advisor popups may vary depending on game state and available improvements
