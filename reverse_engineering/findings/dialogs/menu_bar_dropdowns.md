# Menu Bar Dropdowns

All dropdown menus use the Win32 system menu class `#32768` — no child windows.
Menu items are drawn internally by Windows, not as child controls.
All menus appear at y=42 (just below the menu bar).

The main window (`0x001809F8`) stays **enabled** while menus are open
(unlike modal dialogs which disable it).

Captured during Chieftain game, Turn 1 (2026-03-28).

---

## Menu Dimensions

| Menu | Size (w×h) | Position (x,y) | Screenshot |
|------|------------|----------------|------------|
| Game | 241×328 | (0, 42) | `screenshots/20260328_110410/` |
| Kingdom | 240×112 | (45, 42) | `screenshots/20260328_110510/` |
| View | 247×297 | (108, 42) | `screenshots/20260328_110543/` |
| Orders | 272×359 | (147, 42) | `screenshots/20260328_110605/` |
| World | 232×125 | (255, 42) | `screenshots/20260328_110653/` |
| Cheat | 309×425 | (301, 42) | `screenshots/20260328_110739/` |
| Editor | 274×213 | (346, 42) | `screenshots/20260328_110814/` |
| Civilopedia | 214×209 | (391, 42) | `screenshots/20260328_111133/` |

---

## Win32 Properties (all menus share these)

- **Class:** `#32768` (system menu window class)
- **Style:** `WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CAPTION | WS_BORDER`
- **ExStyle:** `WS_EX_DLGMODALFRAME | WS_EX_TOPMOST | WS_EX_TOOLWINDOW | WS_EX_WINDOWEDGE`
- **Owner:** main game window (`0x001809F8`)
- **Children:** none (menu items are Win32-internal)

---

## Notes

- Menu bar order: Game | Kingdom | View | Orders | Advisors | World | Cheat | Editor | Civilopedia
- Advisors menu was documented separately in `menu_advisors.md` (captured in prior session)
- Cheat menu is the widest (309px) and tallest (425px) dropdown
- Kingdom menu is the smallest (112px tall) — only 3-4 items
