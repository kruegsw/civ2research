# Civ2 Sprite Sheets (GIF Assets)

Documented 2026-03-27 from Civ2 MGE install at:
`C:\Users\stuar\OneDrive\Documents\Games\Civilization II Multiplayer Gold Edition\`

All GIFs are 640×480 (GIF89a) except SCREDITS.GIF.

## Sprite Sheet Inventory

| Filename      | Size (bytes) | Dimensions | Purpose                                    |
|---------------|-------------|------------|--------------------------------------------|
| CITIES.GIF    | 46,452      | 640×480    | City size sprites (tile overlays per civ/size) |
| CITY.GIF      | 66,152      | 640×480    | City view window background & interior graphics |
| EDITORAS.GIF  | 36,558      | 640×480    | Scenario editor — action sprites           |
| EDITORPT.GIF  | 40,635      | 640×480    | Scenario editor — terrain palette          |
| EDITORSA.GIF  | 29,841      | 640×480    | Scenario editor — scenario sprites         |
| EDITORSQ.GIF  | 34,060      | 640×480    | Scenario editor — square/tile graphics     |
| ICONS.GIF     | 54,217      | 640×480    | UI chrome: title bars, buttons, arrows, panels |
| PEOPLE.GIF    | 21,227      | 640×480    | Citizen sprites (workers, entertainers, etc.) |
| SCREDITS.GIF  | 139,115     | 600×400    | Credits screen background                  |
| TERRAIN1.GIF  | 46,491      | 640×480    | Base terrain tiles (ocean, plains, grassland, forest, hills, mountains, desert, tundra, arctic, swamp, jungle) |
| TERRAIN2.GIF  | 55,966      | 640×480    | Special terrain overlays, roads, rivers, irrigation, mining, pollution, fortresses |
| UNITS.GIF     | 54,012      | 640×480    | Unit sprites (all 60 unit types × all civ colors) |

## Known ICONS.GIF Sprite Coordinates

These have been confirmed via GDI hook analysis (ddraw_proxy session):

| Sprite              | Origin (x, y) | Size    | Notes                             |
|---------------------|---------------|---------|-----------------------------------|
| Title bar wallpaper | (199, 322)    | 64×32   | Stone texture tile (repeating)    |
| Close button        | (1, 389)      | 16×16   | Window close icon                 |
| Zoom out button     | (18, 389)     | 16×16   | Zoom out icon                     |
| Zoom in button      | (35, 389)     | 16×16   | Zoom in icon                      |
| Next city arrow     | (227, 389)    | 18×24   | Navigate to next city             |
| Prev city arrow     | (246, 389)    | 18×24   | Navigate to previous city         |

## Chroma Key

- Sprite transparency mask color: **0x808000** (olive / dark yellow)
- Used via SetBkColor in GDI BitBlt operations
- Any pixel matching this color is treated as transparent when blitting sprites

## Premade World Maps

Also in install folder (`.MP` format):
- `EUROPE.MP`
- `GREECE.MP`
- `MEDITERR.MP`
- `PACIFIC.MP`
- `WORLD.MP`
- `WORLD_M.MP`
- `WORLD_S.MP`

## Notes for Browser Recreation

- All sprite sheets use a 256-color GIF palette — colors are indexed, not RGB
- The game palette is important: text/shadow colors are derived via `GetDIBColorTable`
- For Canvas rendering: load GIFs, draw with `drawImage(sheet, sx, sy, sw, sh, dx, dy, dw, dh)`
- Chroma-key transparency: before drawing, pre-process sheets to replace 0x808000 with `rgba(0,0,0,0)`
  or use `ctx.globalCompositeOperation` tricks
- Tile size for terrain: isometric diamond tiles are 64×32 pixels (standard Civ2 isometric)
- Unit sprites: each unit appears to be 64×48 pixels with multiple frames/colors
