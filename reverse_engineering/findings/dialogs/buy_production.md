# Buy Production Dialog

Appears when clicking "Buy" in the city window.
Title includes the production item name.

Captured during Deity game, 3 civs, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x00430B32 | visible | "Buy Warriors"
  class:   MSWindowClass
  window:  814×184 @ (556, 451)
  style:   WS_POPUP | WS_VISIBLE | WS_CAPTION | WS_DLGFRAME
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x01160B74 | scrollbar
    class:   MSScrollBarClass? / MSControlClass
    window:  620×17 @ (653, 638)
```

---

## Layout

- **Title bar:** "Buy {item name}" (e.g. "Buy Warriors")
- **Body:** Cost text, treasury info (GDI-drawn)
- **Size:** 814×184 — wider than most dialogs
- **Position:** centered (556, 451)

---

## Screenshot

`screenshots/20260328_115138/top_0x00430B32_Buy_Warriors.bmp`
