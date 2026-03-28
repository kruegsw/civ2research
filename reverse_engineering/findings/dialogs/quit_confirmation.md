# Quit Confirmation Dialog

Appears when selecting Game → Quit from the menu bar.

Captured during Chieftain game, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x002B0852 | visible | "Confirmation"
  class:   MSWindowClass
  window:  570×184 @ (678, 451)
  client:  564×178 (border: 6w 6h)
  style:   WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
  exstyle: WS_EX_WINDOWEDGE
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x00250084 | text line 1
    class:   MSControlClass
    window:  480×27 @ (759, 526)
    style:   WS_CHILD | WS_VISIBLE | WS_MAXIMIZEBOX

  HWND 0x002702B4 | text line 2
    class:   MSControlClass
    window:  480×27 @ (759, 558)
    style:   WS_CHILD | WS_VISIBLE | WS_MAXIMIZEBOX

  HWND 0x003E0B9C | button (OK/Yes)
    class:   MSControlClass
    window:  552×36 @ (687, 593)
    client:  550×34 (border: 2w 2h)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "Confirmation"
- **2 text controls** (480×27 each) — radio button options or text lines
- **1 button** (552×36) at bottom — likely "Yes, I want to quit"
- **Position:** roughly centered (678, 451)

---

## Screenshot

`screenshots/20260328_111147/top_0x002B0852_Confirmation.bmp`

> **TODO:** Verify exact text content from screenshot
