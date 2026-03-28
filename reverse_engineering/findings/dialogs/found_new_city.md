# Found New City Dialog

Appears when a Settler unit presses B to build a city.
Shows the city name (editable) with an OK button.

Captured during Deity game, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x00490B82 | visible | "Found New City"
  class:   MSWindowClass
  window:  736×264 @ (595, 411)
  client:  730×258 (border: 6w 6h)
  style:   WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
  exstyle: WS_EX_WINDOWEDGE
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x009E02CA | button (OK)
    class:   MSControlClass
    window:  718×36 @ (604, 633)
    client:  716×34 (border: 2w 2h)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "Found New City"
- **Body:** City name text (editable, GDI-drawn input area — not a child control)
- **Button:** Single OK button, 718×36, at bottom of dialog
- **Position:** roughly centered (595, 411)
- **Size:** 736×264

---

## Screenshots

- `screenshots/20260328_113937/top_0x00490B82_Found_New_City.bmp`
- `screenshots/20260328_114313/top_0x00490B82_Found_New_City.bmp`
- `screenshots/20260328_114321/top_0x00490B82_Found_New_City.bmp`
- `screenshots/20260328_114344/top_0x00490B82_Found_New_City.bmp`

---

## Notes

- After clicking OK (or pressing Enter), a "What Shall We Build?" production
  picker dialog appears briefly — not captured yet (too fast).
  Use F11 hotkey to capture it next time.
- The Settler unit is consumed ("UNIT KILLED" in sniffer log) after the city is founded.
