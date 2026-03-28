# Findings

Live reverse engineering discoveries from sniff-game.py + sniff-windows.py sessions.

## Structure

- `dialogs/` — Win32 window layout, options, and button positions for each dialog
  - `dialog_visual_design.md` — comprehensive visual design reference (colors, fonts, fills, borders)
  - `main_game_window.md` — main game window child panel layout
- `init_sequence/` — Memory changes step-by-step as a new game is created
- `memory_map/` — Newly discovered DAT_ addresses and what they control
- `game_params/` — How difficulty, map size, civ, seed, etc. are stored in memory
- `ui_flow/` — Sequence of dialogs/screens and what triggers transitions
- `assets/` — Sprite sheet inventory, dimensions, coordinates, chroma key info

## Tile Array

| Address | Description |
|---------|-------------|
| `0x00636598` | Pointer to tile array base (heap allocated) |
| `0x006D1160` | mapWidth (e.g. 80); `0x006D1162` = mapHeight (50); `0x006D1164` = ms (2000) |
| Formula | `tilePtr = base + (mapWidth * y + (x & ~1)) * 3` |
| Format | 6 bytes/record, two isometric positions share one record; matches .sav file exactly |

Full details: `memory_map/tile_array.md`

---

## Key Memory Addresses (title screen session, 2026-03-27)

| Address      | Description                                    | Stride | Count |
|--------------|------------------------------------------------|--------|-------|
| 0x0064B1C4   | Unit type stats table (atk/def/hp/fp/moves)    | 20     | 60    |
| 0x04BD53D9   | Unit name string table                         | 15     | 60    |
| 0x04BD4600   | Tech full name strings (variable length)       | ~20    | 80    |
| 0x04BD4D80   | Building name strings (variable length)        | ~25    | 39+   |
| 0x04BD5A00   | Civ/leader/government title strings            | var    | 21+   |
| 0x0064BCC8   | Cosmic parameters (@COSMIC, 22 bytes)          | 1      | 22    |
| 0x00627684   | Tech tree struct (abbreviated names + prereqs) | 16     | 90    |
| 0x006560F0   | Unit instance array                            | 32     | —     |
| 0x0064F340   | City array                                     | 88     | —     |
| 0x0064C6A0   | Civilization array                             | 0x594  | —     |
| 0x00655AF8   | Current turn number                            | —      | —     |
| 0x00655B02   | Difficulty level                               | —      | —     |
| 0x00655BE6   | Wonders built array                            | —      | —     |

## Tools

- `charlizationv4/sniff-game.py --log charlizationv4/game.log` — continuous memory polling
- `charlizationv4/sniff-windows.py` — one-shot Win32 window snapshot (run anytime)
