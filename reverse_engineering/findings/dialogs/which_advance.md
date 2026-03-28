# Which Advance Dialog (Tech Goal Picker)

Appears after selecting immediate research — asks which long-term tech goal to pursue.

Captured during Deity game, 3 civs, Turn 2 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x00A10B78 | visible | "Which advance are you trying to..."
  class:   MSWindowClass
  window:  746×337 @ (590, 374)
  style:   WS_POPUP | WS_VISIBLE | WS_CAPTION | WS_DLGFRAME
  owner:   0x001809F8

  HWND 0x004B0B32 | button 1 (left)
    class:   MSControlClass
    window:  144×36 @ (599, 669)

  HWND 0x00280B5C | button 2 (middle)
    class:   MSControlClass
    window:  144×36 @ (1037, 669)

  HWND 0x011D0B74 | button 3 (right)
    class:   MSControlClass
    window:  144×36 @ (1183, 669)

  HWND 0x001E035E | scrollbar
    class:   MSScrollBarClass / MSControlClass
    window:  720×17 @ (603, 646)
```

---

## Layout

- **Title bar:** "Which advance are you trying to...?" (truncated in window title)
- **Body:** Scrollable list of tech goals (GDI-drawn)
- **Scrollbar:** 720×17 horizontal
- **3 buttons** (144×36 each) at bottom
- **Size:** 746×337
- **Position:** centered (590, 374)

---

## Screenshot

`screenshots/20260328_115631/top_0x00A10B78_Which_advance_are_you_trying_t.bmp`
