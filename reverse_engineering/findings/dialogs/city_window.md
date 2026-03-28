# City Window

The city screen is a **child window** inside the main game window (not a popup dialog).
Unlike modal dialogs, the main window stays **enabled** while the city window is open.

Captured during Deity game, 3 civs, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x00470B9C | city window (child of main game window's map panel)
  class:   MSWindowClass
  window:  976×680 @ (475, 200)
  client:  970×674 (border: 6w 6h)
  style:   WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
  exstyle: WS_EX_NOPARENTNOTIFY | WS_EX_WINDOWEDGE
  parent:  main game window (0x001809F8)
```

---

## Child Controls

### Title Bar Icons (24×24, no border — plain MSControlClass)
| HWND | Position | Likely Function |
|------|----------|----------------|
| `0x004A0B82` | (486, 209) | Close button (X) |
| `0x009F02CA` | (512, 209) | Zoom out |
| `0x00460708` | (538, 209) | Zoom in |

### Navigation / Action Buttons (with border, 2w 2h)
| Size | Position | Likely Function |
|------|----------|----------------|
| 102×36 | (1149, 510) | Buy |
| 102×36 | (1321, 510) | Change (production) |
| 31×36 | (1141, 785) | City nav prev (up arrow) |
| 31×36 | (1141, 822) | City nav next (down arrow) |
| 85×36 | (1174, 785) | Rename? |
| 85×36 | (1261, 785) | Happy? |
| 85×36 | (1348, 822) | Exit / Close |
| 85×36 | (1174, 822) | Info? |
| 85×36 | (1261, 822) | Map? |

---

## Layout Notes

- **Size:** 976×680 — large panel covering most of the map area
- **Position:** (475, 200) — offset from top-left, overlapping the map panel
- All content (city name, resource display, citizen icons, improvements list,
  production progress, unit roster) is GDI-drawn, not child controls
- Only the clickable buttons are child windows
- The two 102×36 buttons at y=510 are likely **Buy** and **Change** (production area)
- The 31×36 buttons at x=1141 are city navigation arrows (prev/next city)
- The 85×36 buttons at y=785-822 are the bottom row: Info/Happy/Map/Rename/Exit

---

## Screenshot

`screenshots/20260328_114344/top_0x001809F8_Civilization_II_Multiplayer_Go.bmp`
(City window is visible as a child panel within the main window screenshot)

---

## Notes

- This matches `main_game_window.md` which documented the city window panel
  as a hidden child at z=3. When a city is opened, this panel becomes visible.
- F11 hotkey triggered the game's F11 function key instead of our capture.
  Need to use a different hotkey or capture from outside the game.

> **TODO:** Identify exact button labels from screenshot. Compare against
> the city dialog reference in `Civ2_City_Struct.md`.
