# Village Dialog (Goody Hut)

Appears when a unit enters a goody hut (minor village) tile.
Displays the reward (gold, tech, unit, map, etc.).

Captured during Deity game, 3 civs, Turn 2 (2026-03-28).
Reward was 50 gold.

---

## Window Hierarchy

```
HWND 0x0015021E | visible | "Village"
  class:   MSWindowClass
  window:  540×152 @ (693, 467)
  client:  534×146 (border: 6w 6h)
  style:   WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
  owner:   0x001809F8

  HWND 0x00310782 | button (OK)
    class:   MSControlClass
    window:  522×36 @ (702, 577)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "Village"
- **Body:** Reward text (GDI-drawn)
- **1 button** (522×36) at bottom — OK / dismiss
- **Size:** 540×152 — small dialog
- **Position:** centered (693, 467)

---

## Screenshot

`screenshots/20260328_115856/top_0x0015021E_Village.bmp`
