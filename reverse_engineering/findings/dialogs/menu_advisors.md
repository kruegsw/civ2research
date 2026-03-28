# Menu: Advisors

Observed: 2026-03-28, Turn 1, 4000 B.C. — user clicked "Advisors" in menu bar.

## Window

```
HWND 0x00170B9A  class: #32768  (standard Win32 popup menu class)
  window:  247x231 @ (196,42)
  client:  241x225
  style:   WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CAPTION | WS_BORDER
  exstyle: WS_EX_DLGMODALFRAME | WS_EX_TOPMOST | WS_EX_TOOLWINDOW | WS_EX_WINDOWEDGE
  owner:   0x00050B48 (main game window)
```

**Key:** Class `#32768` is the Windows system-reserved class for popup menus (`MENUCLASS`).
This means Civ2's menu bar uses **standard Win32 menus** (not custom-drawn popups).
The menu items, separators, accelerators, and disabled states are all rendered by Windows,
not by Civ2's own drawing code.

## Menu Items

| Item | Shortcut | State |
|------|----------|-------|
| Chat with Kings | Ctrl+C | **Greyed out** (disabled in single-player) |
| Consult High Council | — | Enabled |
| *(separator)* | | |
| City Status | F1 | Enabled |
| Defense Minister | F2 | Enabled |
| Foreign Minister | F3 | Enabled |
| *(separator)* | | |
| Attitude Advisor | F4 | Enabled |
| Trade Advisor | F5 | Enabled |
| Science Advisor | F6 | Enabled |
| *(separator)* | | |
| Casualty Timeline | Ctrl+D | Enabled |

## Visual Design

- **Background:** white (standard Win32 menu background)
- **Font:** system default menu font (NOT Times New Roman — standard Windows UI font)
- **Disabled items:** greyed out — "Chat with Kings" rendered in mid-grey (WS_EX_TOOLWINDOW grays it automatically)
- **Separators:** thin horizontal lines between groups
- **Keyboard shortcuts:** right-aligned, same font, lighter grey
- **No icons** — text-only menu items
- **3 visual groups:** Chat / Consult | City/Defense/Foreign | Attitude/Trade/Science | Casualty

## "Chat with Kings" — Disabled
Only relevant in multiplayer (send message to other human players).
Greyed automatically because no other human players exist in this session.

## Known Keyboard Shortcuts (from this menu)
- **F1** — City Status (advisor)
- **F2** — Defense Minister
- **F3** — Foreign Minister
- **F4** — Attitude Advisor
- **F5** — Trade Advisor
- **F6** — Science Advisor
- **Ctrl+C** — Chat with Kings (multiplayer)
- **Ctrl+D** — Casualty Timeline

## Full Menu Bar (confirmed from screenshot)
`Game | Kingdom | View | Orders | Advisors | World | Cheat | Editor | Civilopedia`

"Advisors" is the 5th item. At x=196 the menu aligns with ~"Advisors" label position
in the menu bar.

## Screenshots

Saved to `reverse_engineering/findings/screenshots/20260328_004722/`:
- `top_0x00170B9A_notitle.bmp` — menu popup (247×231)
- `top_0x00050B48_Civilization_II_Multiplayer_Go.bmp` — full screen (1936×1048)
