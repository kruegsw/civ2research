# What Discovery Dialog (Tech Picker)

Appears when the player needs to select a research target — either at start
of game or when a tech is discovered.

Captured during Deity game, 3 civs, Turn 2 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x011A0B74 | visible | "What discovery shall our wise men pursue?"
  class:   MSWindowClass
  window:  476×458 @ (5, 314)
  style:   WS_POPUP | WS_VISIBLE | WS_CAPTION | WS_DLGFRAME
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x001B035E | button 1 (left)
    class:   MSControlClass
    window:  151×36 @ (14, 730)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX

  HWND 0x009E0B78 | button 2 (middle)
    class:   MSControlClass
    window:  151×36 @ (167, 730)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX

  HWND 0x00250B5C | button 3 (right)
    class:   MSControlClass
    window:  151×36 @ (321, 730)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "What discovery shall our wise men pursue?"
- **Body:** Scrollable list of available techs (GDI-drawn)
- **3 buttons** (151×36 each) at bottom, evenly spaced
- **Size:** 476×458 — tall, narrow dialog
- **Position:** left side of screen (5, 314)

---

## Science Advisor Popup

Appears simultaneously with the tech picker:

```
HWND 0x00460B32 | "Science Advisor"
  (shares dialog template with other advisors)
```

---

## Screenshots

- `screenshots/20260328_115521/top_0x011A0B74_What_discovery_shall_our_wise_.bmp`
- `screenshots/20260328_115521/top_0x00460B32_Science_Advisor.bmp`
