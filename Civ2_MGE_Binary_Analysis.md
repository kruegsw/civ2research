# Civilization II Multiplayer Gold Edition — Binary Analysis

A comprehensive record of everything discovered through reverse engineering Civilization II save files, executables, and data files during this project. All findings are from **Civ2 Multiplayer Gold Edition (MGE)**, version 5.4.0f, patch 3, dated 26-March-99.

---

## Files Analyzed

### Game Installation Files

| File | Size | Description |
|------|------|-------------|
| `civ2.exe` | 2,489,344 bytes | Main executable. PE32 Intel 80386. Built from `D:\Ss\Franklinton\` (debug path preserved in strings). |
| `XDaemon.dll` | 95,744 bytes | Network/multiplayer library. XDaemon Communications Library v3.5.0, dated 10-Nov-1998. Exports 48 functions for IGZ multiplayer support. |
| `Civ2Art.dll` | 256,512 bytes | Credits/UI art container — 5 embedded GIFs (credits text, starfields, Mesoamerican relief, gray UI panel). Resource-only DLL, debug CRT. Built 1997-04-21. |
| `Tiles.dll` | 1,416,704 bytes | Tile & UI art container — 24 embedded GIFs (civilization backgrounds, historical illustrations, nuke sprite sheet, govt/diplomacy icons, Civ2 seal). Built 1997-04-21. |
| `cv.dll` | 4,980,224 bytes | City View art container — 16 embedded GIFs (building sprites, wonder sprites, vegetation growth, 12 landscape panoramas in 3 terrain × 4 era variants). Built 1997-04-21. |
| `mk.dll` | 3,165,696 bytes | Diplomacy & leader art container — 42 leader portraits (21 civs × 2), 7 throne room backgrounds, military advisor backdrop, 21 CTAB color palettes. Built 1997-04-21. |
| `pv.dll` | 1,999,360 bytes | Palace View art container — 55 embedded GIFs: base palace room + compositable upgrade sprites (walls, floors, columns, thrones, decorations) in 4-tier progression. 2 chroma-key colors. Built 1997-04-21. |
| `ss.dll` | 1,455,616 bytes | Spaceship art container — 46 embedded GIFs: 24 assembly progression views, component sprite sheets (solar panels, beams, pods), Earth/Alpha Centauri scenes, thruster animation. Orange chroma-key. Built 1997-04-21. |
| `Intro.dll` | 1,151,488 bytes | Intro slideshow art container — 13 embedded GIFs: historical engravings, photographs, and a satellite view, all with gold picture-frame borders. Displayed once at game launch. Built 1997-04-21. |
| `Wonder.dll` | 185,856 bytes | Wonder indicator art container — 28 embedded GIFs (74×74 each): one color-tinted panel per wonder for the wonder tracking UI. Smallest resource-only DLL. Built 1997-04-21. |
| `timerdll.dll` | 131,072 bytes | SMEDS engine timer callback DLL (internal name: CALLBACK.dll). Pure code, no resources. 6 exports for multimedia timer→PostMessage bridge. 16 timer slots. Debug build from `D:\SS\Smeds32\timer\`. Built 1997-03-17. |
| `Civ2Map.exe` | — | Map editor executable. |

### Data Files

| File | Size | Description |
|------|------|-------------|
| `LEADERS.TXT` | 2,426 bytes | Defines all 21 civilizations: leader names (male/female), tribe name, adjective, AI personality values, government title overrides. |
| `RULES.TXT` | 26,906 bytes | Core game rules — units, buildings, techs, terrain modifiers. |
| `Game.txt` | 108,656 bytes | UI strings, game text, dialog messages. |
| `CITY.TXT` | — | City name lists per civilization. |
| `PEDIA.TXT` | — | Civilopedia text entries. |
| `HERALD.TXT` | — | Herald/announcement text. |
| `HELP.TXT` | — | In-game help text. |
| `DEBUG.TXT` | — | Debug message templates (reveals internal state variable names). |

### Graphics Files

All main sprite sheets are 640×480 pixels, GIF87a format with 256-color indexed palettes. Sprites are arranged in a 10-column × 15-row grid of 64×32 pixel cells (isometric diamond format). **Two different chroma-key colors** are used for transparency:

| File | Size | Chroma Key | Description |
|------|------|-----------|-------------|
| `TERRAIN1.GIF` | 46,452 | Cyan (0,255,255) idx 248 | Base terrain tiles, improvements, resources, roads, railroads |
| `TERRAIN2.GIF` | 55,966 | Magenta (255,0,255) idx 253 | Terrain overlays: forests, mountains, hills, rivers, coastlines |
| `UNITS.GIF` | 54,012 | Magenta idx 253 + Purplish-gray (135,83,135) idx 255 | All 52 unit types + modding instructions; civ-color via idx 251-252 (red shades) |
| `CITIES.GIF` | 46,452 | Magenta idx 253 + Cyan (0,255,255) idx 236-249 | Map-view city sprites by era × style × size |
| `CITY.GIF` | 66,152 | — | City view screen sprites |
| `PEOPLE.GIF` | 21,227 | Magenta (255,0,255) idx 253 | Citizen type faces by era (92% chroma = mostly empty) |
| `ICONS.GIF` | 54,098 | Magenta (255,0,255) idx 253 | UI icons: wonder thumbnails, government icons, misc |
| `EDITORS*.GIF` | ~35K each | — | Map editor graphics (4 files for different map projections) |

#### TERRAIN1.GIF Sprite Layout

The game embeds text labels directly in the sprite sheet. Layout confirmed by visual inspection:

| Row | Col 0–8 | Col 9 |
|-----|---------|-------|
| 0 | **Desert** base tiles (9 variants) | Desert variant |
| 1 | **Plains** base tiles (9 variants) | Plains variant |
| 2 | **Grassland** base tiles (9 variants) | Grassland variant |
| 3 | **Forest** base filler tiles (9 variants) | **Irrigation** improvement |
| 4 | **Hills** base filler tiles (9 variants) | **Farmland** improvement |
| 5 | **Mountains** base filler tiles (9 variants) | **Mining** improvement |
| 6 | **Tundra** base tiles (9 variants) | **Pollution** overlay |
| 7 | **Arctic/Glacier** base tiles (9 variants) | **Resource** (Grassland special) |
| 8 | **Swamp** base tiles (9 variants) | Swamp variant |
| 9 | **Jungle** base tiles (9 variants) | Jungle variant |
| 10 | **Ocean** base tiles (9 variants) | Ocean variant |
| 11 | Coastline/transition tiles | More transitions |
| 12 | **Road** sprites (directional, 8+ directions) | Road variants |
| 13 | **Railroad** sprites (directional) | Railroad variants |
| 14 | Dither pattern, Mouse cursors, Blank, "Mouse 2" | Utility sprites |

**Rows 0–10 correspond directly to terrain type IDs 0–10** from the save file. The game selects among the 9 column variants using map position or terrain flags to avoid visual repetition.

**Tile compositing order** (back to front): Base terrain (TERRAIN1 rows 0-10) → Coastline transitions (TERRAIN2 bottom section, 4-quadrant system with 32×16 sub-tile sprites) → Rivers (TERRAIN2 rows 2-3, neighbor-computed) → Terrain overlays (TERRAIN2: forests, hills, mountains) → Roads/Railroads (TERRAIN1 rows 11-12, neighbor-computed) → Improvements (TERRAIN1 col 9: irrigation/farmland/mining) → Resource icons → City sprite → Unit sprite. See detailed Rendering Pipeline section at end of document.

#### TERRAIN2.GIF Sprite Layout

Contains overlay sprites composited on top of base terrain. Uses magenta chroma key.

| Row | Content |
|-----|---------|
| 0–1 | **Tile connection masks** (labeled "tile connections") — Green line segments (palette index 254) on magenta diamonds showing which diamond edges connect to land vs water. Purpose unclear; the 4-quadrant coastline sprites (y=429–479) produce correct results without these masks. May be used by the game engine for additional blending. |
| 2–3 | **River sprites** — 16+ pre-combined directional river sprites for 4-bit neighbor mask (bit 0=NE, bit 1=SE, bit 2=SW, bit 3=NW). Mask computed at render time from adjacent river tiles (byte[0] & 0x80). Plus 2 extra variant/label cells (col 8 labeled "rivers"). |
| 4–5 | **Forest** overlay sprites — 16 art variants (8 per row, col 0-7). Composited over Forest base (TERRAIN1 row 3). Col 8 = label "10". |
| 6–7 | **Mountain** overlay sprites — 16 art variants (8 per row). Composited over Mountains base (TERRAIN1 row 5). Col 8 = label "9". |
| 8–9 | **Hill** overlay sprites — 16 art variants (8 per row). Composited over Hills base (TERRAIN1 row 4). Col 8 = label "12". |
| 10 | **River Mouths** — 4 directional sprites (cols 0-3: NE, SE, SW, NW). Drawn on ocean tiles where a diagonal neighbor is land with a river. Remaining cols contain terrain color reference swatches. |
| 11+ (bottom) | **Coastline rendering section** — Uses a **4-quadrant system** with 32 small sub-tile sprites (8 groups × 4 pieces). Rows 11-12 (y=364-410): Encoding DIAGRAMS with "w"/"l" labels (reference only, NOT renderable art). Art sprites on 33px column grid: Row at y=429 = TOP quadrant pieces (p0), Row at y=446 = BOTTOM quadrant pieces (p1), Row at y=463 = LEFT (p2, even cols) + RIGHT (p3, odd cols) quadrant pieces. Each group (0-7) represents a 3-bit neighbor pattern; each quadrant checks 3 neighbors in **clockwise order** around its edge. See Rendering Pipeline for full algorithm. Also in bottom section: River Mouths sprites, color swatches, ocean wave textures, and a "new 25" grassland variant. |

#### UNITS.GIF Sprite Layout

63 standard unit cells (9 columns × 7 rows). Unit type IDs from save file byte +6 map to sprite positions via `col = type % 9`, `row = type // 9`. The rightmost 55px of the image (x=585–639) contains the shield/flag template, not a 10th column.

| Row | Col 0 | Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 | Col 8 |
|-----|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| 0 | Settlers(0) | Engineers(1) | Warriors(2) | Phalanx(3) | Archers(4) | Legion(5) | Pikemen(6) | Musketeers(7) | Fanatics(8) |
| 1 | Partisans(9) | Alpine(10) | Riflemen(11) | Marines(12) | Paratroop(13) | Mech Inf(14) | Horsemen(15) | Chariot(16) | Elephant(17) |
| 2 | Crusaders(18) | Knights(19) | Dragoons(20) | Cavalry(21) | Armor(22) | Catapult(23) | Cannon(24) | Artillery(25) | Howitzer(26) |
| 3 | Fighter(27) | Bomber(28) | Heli(29) | Stealth F(30) | Stealth B(31) | Trireme(32) | Caravel(33) | Galleon(34) | Frigate(35) |
| 4 | Ironclad(36) | Destroyer(37) | Cruiser(38) | AEGIS(39) | Battleship(40) | Submarine(41) | Carrier(42) | Transport(43) | Cruise M(44) |
| 5 | Nuke(45) | Diplomat(46) | Spy(47) | Caravan(48) | Freight(49) | Explorer(50) | ExtraLand(51) | *custom*... | |
| 6 | Additional custom unit slots and modding instruction text | | | | | | | | |

**Unit sprite indexing**: Unit type ID from save file = `row * 9 + col` for rows 0–5. Types 0–51 are standard; types 52+ are mod-defined custom units.

**UNITS.GIF palette (confirmed via Civ2-clone `UnitLoader.cs`)**:

| Index | RGB | Purpose |
|-------|-----|---------|
| 250 | (0,0,255) blue | **Flag marker** — embedded in 1px green border to encode shield position per unit cell |
| 251 | (127,0,0) dark red | **Dark civ-color placeholder** — replaced with owning civ's dark shade at render time |
| 252 | (255,0,0) pure red | **Light civ-color placeholder** — replaced with owning civ's light shade at render time |
| 253 | (255,0,255) magenta | Transparent background inside diamond |
| 254 | (0,255,0) green | Grid border lines (1px between cells) |
| 255 | (135,83,135) purplish-gray | Transparent background outside diamond — **differs from TERRAIN GIFs' (135,135,135)** |

**Shield/flag system** (confirmed via Civ2-clone): Each unit cell encodes its shield position using a blue pixel (idx 250) in the 1px green border. The flag X is found by scanning the top border row for the first non-green pixel, flag Y by scanning the left border column. Shield templates are extracted from the right edge of UNITS.GIF and recolored per-civ using the idx 251/252 replacement.

**Shield templates** in right margin (x=585–639):

| Name | Rectangle (x, y, w, h) | Notes |
|------|------------------------|-------|
| backShield1 | (586, 1, 12, 20) | Primary shield template — used for front/back/shadow |
| backShield2 | (599, 1, 12, 20) | Second variant (unused in Civ2-clone) |
| HPshield | (597, 30, 12, 20) | HP overlay (unused in Civ2-clone) |

Three images are derived from backShield1 at render time:
- **ShieldFront**: top 7 rows filled black (HP bar + order letter background), bottom 13 rows recolored to civ color
- **ShieldBack**: unchanged template recolored to civ color (stacking indicator)
- **ShieldShadow**: civ-color pixels replaced with dark gray rgb(51,51,51), drawn offset behind shields

**Key modding notes embedded in UNITS.GIF text**:
- "Units cannot overlap the area below the main diamond"
- "ONLY colors in palette (only) are for players' (border) (xt.ext=shield)"
- "Borders & writing may be changed to any RGB but must be last 3 colors of palette"

#### CITIES.GIF Sprite Layout

City sprites organized by **era** (rows) × **architectural style** (columns) × **walled/open** (left vs right half). Grid: **65×49 pixel cells** (64×48 sprite + 1px border).

**Two halves** (confirmed from header text "Open" and "Walled"):
- **Left half** (x = 0–260): Open (unwalled) cities, 4 style columns
- **Center** (x = 260–333): Era label column with green text
- **Right half** (x = 333–593): Walled cities, 4 style columns

**Era rows** (confirmed from embedded text labels in center column):

| Row | Y Start | Label | Content |
|-----|---------|-------|---------|
| 0 | 39 | STONE/BRONZE | Primitive structures, huts |
| 1 | 88 | ANCIENT/CLASSICAL | Temples, pyramids, classical buildings |
| 2 | 137 | FAR EAST | Asian-style architecture (may be style-specific) |
| 3 | 186 | MEDIEVAL | Castles, cathedrals, stone buildings |
| 4 | 235 | EARLY INDUSTRIAL | Factories, brick buildings |
| 5 | 284 | MODERN | Skyscrapers, glass buildings |
| 6 | 333+ | MODERN ALT | Alternative modern sprites |

**Bottom section** (y ≈ 395+, confirmed from embedded labels): FLAGS (civ color swatches), FORTIFY icon, FORTRESS sprite, AIRBASE sprite (2 variants), plus 2 large city sprites.

**CITIES.GIF transparency**: Uses **three** chroma key colors — magenta (255,0,255) idx 253, cyan (0,255,255) idx 236-249, and gray (135,135,135) idx 255. The cyan indices are transparent in CITIES.GIF (unlike UNITS.GIF where they are fixed colors). Bright green grid lines should also be removed.

#### PEOPLE.GIF Sprite Layout

Citizen face sprites for the city management screen, organized by era. Only rows 0–4 contain sprites; rows 5–14 are empty magenta.

**Grid structure**: 11 columns × 5 rows, cell size **27×30 pixels**, with 1px black (idx 192) borders.
- Cell origin formula: `x = 2 + 28 * col, y = 6 + 31 * row`
- Horizontal stride: 28px (27px face + 1px border)
- Vertical stride: 31px (30px face + 1px border)
- Chroma key: magenta (255,0,255) idx 253

**Row → Era mapping** (same thresholds as city epoch):

| Row | Era | Trigger |
|-----|-----|---------|
| 0 | Ancient | Default |
| 1 | Renaissance | Invention AND Philosophy |
| 2 | Industrial | Industrialization |
| 3 | Modern | Automobile AND Electronics |
| 4 | Extra specialists | (see below) |

**Column → Citizen type mapping** (source: Civ2-clone `PeopleType` enum):

| Col | Type | Notes |
|-----|------|-------|
| 0 | Happy male | Even citizen positions |
| 1 | Happy female | Odd citizen positions |
| 2 | Content male | Even positions |
| 3 | Content female | Odd positions |
| 4 | Unhappy male | Even positions |
| 5 | Unhappy female | Odd positions |
| 6 | Angry male | Anarchy only (even) |
| 7 | Angry female | Anarchy only (odd) |
| 8 | Entertainer | Specialist (Elvis) |
| 9 | Taxman | Specialist |
| 10 | Scientist | Specialist |

The game alternates male/female faces by citizen slot index (even=male, odd=female) for the first 4 types. Specialists always show their specific face.

Row 4 contains 7 additional specialist-variant faces (cols 0–6 populated, cols 7–10 empty). These appear to be alternate specialist representations.

Source: Civ2-clone `Enums/PeopleType.cs`, `Draw.CityPanel.cs`, `Civ2GoldInterface.cs`

#### ICONS.GIF Sprite Layout

640×480 UI icon sheet containing resource icons, improvement/wonder thumbnails, advance category icons, battle animation frames, and map grid sprites. Chroma key: magenta (255,0,255) idx 253 and light pink (255,159,163) idx 255.

**Resource icons (14×14px)** — used in city screen resource rows:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Hunger | 1 | 290 | Food loss (starvation) |
| Shortage | 16 | 290 | Shield loss (unit support) |
| Corruption | 31 | 290 | Trade loss (corruption/waste) |
| Food | 1 | 305 | Food production |
| Shields | 16 | 305 | Shield/production output |
| Trade | 31 | 305 | Trade arrows |
| Luxury | 1 | 320 | Luxury output |
| Tax/Gold | 16 | 320 | Tax/gold output |
| Science | 31 | 320 | Science beakers |

**Small resource icons (10×10px)** — used on city radius mini-map tile overlays:

| Icon | x | y |
|------|---|---|
| Food (small) | 49 | 334 |
| Shield (small) | 60 | 334 |
| Trade (small) | 71 | 334 |

**Research progress indicators (14×14px)**: 4 icons at y=290, x = 49 + 15×i (i=0–3).
**Global warming indicators (14×14px)**: 4 icons at y=305, x = 49 + 15×i (i=0–3).

**Improvement thumbnail icons (36×20px)** — shown in city improvements list:
- Grid origin: (343, 1), horizontal stride 37px, vertical stride 21px
- Layout: 5 rows × 8 columns = 40 slots (indices 1–38 used; slots 39–40 empty)
- Formula: `x = 343 + 37 * ((index - 1) % 8), y = 1 + 21 * Math.floor((index - 1) / 8)`
- Index matches RULES.TXT @IMPROVE order (1=Palace through 38=last improvement)

**Wonder thumbnail icons (36×20px)** — shown in city improvements list for wonders:
- Grid origin: (343, 106), same stride (37×21)
- Layout: 4 rows × 7 columns = 28 slots (all 28 wonders)
- Formula: `x = 343 + 37 * (wonderIndex % 7), y = 106 + 21 * Math.floor(wonderIndex / 7)`
- Index 0–27 matches wonderCityIds order (0=Pyramids through 27=Cure for Cancer)

**Advance category icons (36×20px)** — used in Civilopedia technology display:
- Grid origin: (343, 211), same stride (37×21)
- Layout: 5 rows × 4 columns = 20 slots

**Battle animation (32×32px)**: 8 frames at `x = 1 + 33 * i, y = 356` (i=0–7).

**Status/event icons (32×32px)** — used in game event notifications:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Toxic triangle | 67 | 223 | Global warming / pollution warning |
| Revolt fist | 166 | 223 | Civil disorder indicator |
| Bomb | 199 | 223 | Espionage / sabotage |
| Scythe | 232 | 223 | Famine / starvation |

**Stone background tiles (32×32px)** — used for dialog/panel textures:

| Tile | x | y | Notes |
|------|---|---|-------|
| Stone variant 1 | 265 | 223 | |
| Stone variant 2 | 298 | 223 | |
| Stone variant 3 | 298 | 190 | |

**Title bar wallpaper tile (64×32px)**: (199, 322) — tiled across city dialog title bar background. Distinct stone texture from the main CITY.GIF wallpaper.

**Window control icons (16×16px)** — city dialog title bar buttons:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Close window | 1 | 389 | Closes the city dialog |
| Zoom out | 18 | 389 | Decrease city dialog zoom level |
| Zoom in | 35 | 389 | Increase city dialog zoom level |
| Unknown (gray) | 52 | 389 | Unused / placeholder |

**Blank button templates (16×16px)**: 7 gray squares with concentric gray/black outlines starting at (69, 389), stride 17px. Generic button background sprites.

**City navigation arrows (18×24px)** — prev/next city buttons in city dialog bottom-right:

| Icon | x | y | Purpose |
|------|---|---|---------|
| Next city (▲) | 227 | 389 | Navigate to next city |
| Prev city (▼) | 246 | 389 | Navigate to previous city |

**Map grid sprites (64×32px)**:

| Sprite | x | y | Notes |
|--------|---|---|-------|
| Grid lines (default) | 183 | 430 | Green diamond outline (palette 254) |
| Grid lines (visible) | 248 | 430 | Alternate grid rendering |
| ViewPiece | 199 | 256 | Selection/cursor indicator |

Source: Civ2-clone `Civ2GoldInterface.cs` PicSources, `IconLoader.cs` extraction rects, manual ICONS.GIF inspection

#### City Management Screen Layout

The city management dialog is a **636×421 pixel** window (at normal zoom, cityZoom=0). It supports three zoom levels: −1 (small), 0 (normal), +1 (large). All coordinates below are for zoom=0. Scaling formula: `value × (2 + cityZoom) / 2`.

Sprite sources: **ICONS.GIF** (resource icons, improvement/wonder thumbnails), **PEOPLE.GIF** (citizen faces), **CITIES.GIF** (unit sprites), **UNITS.GIF** (unit sprites in garrisoned/supported displays).

```
+--------+-------------------+-----------------------------------+-------------------+
|        |   Citizens Box    |                                   |    Food Storage   |
| Close  |   (3,2,433,44)    |         City Resources            |  (437,0,195,163)  |
| ZoomIn |   Citizen faces   |    Food/Trade/Tax+Lux+Sci/Shlds  |   Wheat icons     |
| ZoomOut|                   |                                   |   (granary line)  |
+--------+-------------------------------------------+-----------+-------------------+
|        Tile Map / Resource Map                     |           |   Production Box  |
|        (7,65,188,137)                              |           | (437,165,195,191) |
|        Isometric mini-map showing                  |           | [Buy] [Change]    |
|        21 tiles around city                        |           | Item + shield bar |
+----------------------------+-----------------------+-----------+-------------------+
| Units Supported            | Info Panel                        |                   |
| (7,215,184,69)             | (193,215,242,198)                 |                   |
| Up to 8 supported units    | Toggleable:                       |                   |
|                            |  - Units Present                  |                   |
|                            |  - Happiness Analysis             |                   |
+----------------------------+-----------------------------------+                   |
| City Improvements          | Trade routes / Supplies+Demands   |                   |
| (5,306,170,108)            |                                   |                   |
| Scrollable list with       +-----------------------------------+                   |
| 36x20 improvement icons    | [Info] [Map] [Rename]             |                   |
| and sell buttons            | [Happy] [View] [Exit]             |                   |
+----------------------------+-----------------------------------+-------------------+
```

##### Citizens Box (3, 2, 433×44)

Row of citizen face sprites drawn from PEOPLE.GIF. Each face is 27×30 pixels. The game draws citizens left-to-right in order: happy, content, unhappy, specialists. Male/female faces alternate by slot index (even=male col, odd=female col).

Face spacing decreases as city size grows (source: `Draw.CityPanel.cs`):

| City Size | Spacing (px) |
|-----------|-------------|
| 1–15 | 28 |
| 16–32 | 14 |
| 33–63 | 7 |
| 64–100+ | 3–4 |

Each face is drawn with a 1px black drop shadow (offset +1,+1).

##### City Resources (center area, ~203–431, 61–195)

Four rows of resource icons from ICONS.GIF (14×14px each). Each row shows a count of icons; icon spacing decreases as count increases (15px for 1–15 icons, down to 2px for 66+).

| Row | y (approx) | Left Icons | Right Icons |
|-----|-----------|-----------|-------------|
| Food | ~75 | Food icons (green) | Surplus or Hunger (red) |
| Trade | ~117 | Trade arrows (yellow) | Corruption icons |
| Tax+Lux+Sci | ~141 | Tax (gold), Luxury (blue), Science (beaker) | Combined on one row |
| Support/Production | ~181 | Support shields (unit maintenance) | Production shields |

Text labels above each row show names and numeric values (e.g., "Food: 12", "Surplus: 3").

##### Tile Map / City Radius (7, 65, 188×137)

Isometric mini-map showing the 21 tiles in the city's working radius (a "fat cross" diamond pattern from −3 to +3 relative tile offsets). Rendering order:

1. Draw blank/placeholder tiles for all 21 positions
2. For each position with known terrain, draw actual terrain tile (scaled)
3. If a city occupies the tile, draw its sprite; else if military units present, draw top unit
4. On **worked** tiles, overlay small resource icons (10×10px from ICONS.GIF): food, then shields, then trade — centered horizontally, spacing adjusts by total icon count (11px for 1–2, down to 1px for 10+)

The 21-tile diamond shape (relative to city at 0,0):
```
        (-2,-3)(-1,-3)
    (-3,-2)(-2,-2)(-1,-2)(0,-2)
(-3,-1)(-2,-1)(-1,-1)(0,-1)(1,-1)
    (-3,0)(-2,0)(-1,0)(0,0)(1,0)
(-3,1)(-2,1)(-1,1)(0,1)(1,1)
    (-2,1)(-1,1)(0,1)(1,2)
        (-1,2)(0,2)
```
(Note: actual offsets follow isometric coordinate system with stagger)

##### Food Storage Box (437, 0, 195×163)

Grid of wheat/food icons (14×14px, Food icon from ICONS.GIF) representing food stored toward city growth. Layout:
- Columns: equal to city size (number needed for growth)
- Rows: up to 10 (wraps when columns exceed display width)
- Filled icons: count = `city.foodInBox`
- **Granary line**: a green horizontal divider at the halfway point if the city has a Granary improvement (food carries over the line on growth)

##### Production Box (437, 165, 195×191)

Shows the item currently being produced:
- **Unit production**: draws the unit sprite (from UNITS.GIF) with civ coloring
- **Improvement/Wonder production**: draws the improvement thumbnail (36×20 from ICONS.GIF) plus name text
- **Shield progress grid**: grid of shield icons (14×14 from ICONS.GIF) showing `shieldsInBox` filled out of the total cost
- **Buy** and **Change** buttons at top

##### Units Supported (7, 215, 184×69)

Shows up to 8 supported units (those with `homeCityId` = this city's array index) as small unit sprites in a 4×2 grid. Each unit is rendered as its UNITS.GIF sprite (scaled to ~30×23), with civ-color recoloring.

##### Info Panel (193, 215, 242×198)

Toggleable display with multiple modes:
- **Units Present**: shows units garrisoned in the city (up to ~18 small unit sprites)
- **Happiness Analysis**: breakdown of happiness modifiers (base, improvements, wonders, luxury, entertainers)
- **Trade/Supply info**: available and demanded commodities, active trade routes

##### City Improvements List (5, 306, 170×108)

Scrollable list of built improvements and wonders. Each row contains:
- 36×20 thumbnail icon (from ICONS.GIF improvement/wonder grids)
- Improvement name text
- Sell button (for non-wonders; selling returns half the cost)

Improvements use the thumbnail grid at ICONS.GIF (343, 1), wonders use the grid at (343, 106). The list is scrollable if the city has more improvements than fit in the display area (~5 visible rows).

##### Buttons (bottom row)

6 buttons along the bottom of the window:
- **Info**: toggle info panel mode
- **Map**: toggle support map (world mini-map)
- **Rename**: rename city
- **Happy**: toggle happiness analysis
- **View**: open panoramic city view (cityview.js)
- **Exit**: close city window

Source: Civ2-clone `CityWindow.cs`, `Civ2Interface.cs` `GetCityWindowDefinition()`, `Draw.CityPanel.cs`

#### Fonts & Map UI Element Dimensions

Civ2 MGE uses standard Windows system fonts — no custom bitmap fonts. Confirmed via Win32 `CreateFontA` API calls and Civ2-clone issue #55 ("Civ2 uses 2 fonts: Times new roman + Arial"). Sources: Civ2-clone `Helpers.cs`, `Fonts.cs`, `MapControl.cs`, `TextElement.cs`, `Civ2GoldInterface.cs`; CivFanatics forum thread "Help with Fonts" (Mercator).

**Fonts used on the map view:**

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Unit shield order letter | Arial | 13px | Normal | Black |
| City population size number | Times New Roman | 14px | Bold | Black |
| City name label | Times New Roman | 20px | Normal | Civ text color (with 1px black drop shadow) |

**Unit shield layout** (12×20px, from backShield1):

| Component | Position (relative to shield top-left) | Size | Details |
|-----------|----------------------------------------|------|---------|
| Black top area | (0, 0) | 12×7 | Filled black on ShieldFront only |
| HP bar | (0, 2) | 12×3 | Green rgb(87,171,39) if >8px, yellow rgb(255,223,79) if 4–8px, red rgb(243,0,0) if ≤3px. Width = floor(curHP/maxHP × 12) |
| Order letter | (6, 7) centered | 13px tall area | Arial normal, black. Letter from orders byte: 1/2/4→F, 3→S, 5→R, 6→I, 7→m, 8→O, 9→p, 10→E, 11→G, else→- |
| Shadow offset | (±1, 1) | 12×20 | Dark gray rgb(51,51,51). Direction mirrors stacking side |
| Stacking offset | (±4, 0) | 12×20 | ShieldBack drawn behind ShieldFront. ±4 based on shield X < 32 |

**City size box layout** (dynamic width, 14px tall):

| Component | Details |
|-----------|---------|
| Box size | Width = MeasureText(sizeStr).width, Height = 14 (font size). No padding |
| Box fill | Civ text color (from CITIES.GIF y=423 color strips) |
| Box border | 1px black outline, extends 1px beyond fill on left and right sides only |
| Text | Times New Roman Bold 14px, black, top-left aligned with fill rectangle |
| Position | Orange marker pixel (idx 249, rgb 255,155,0) in CITIES.GIF cell border |

**City name label** (drawn in separate pass, on top of everything):

| Component | Details |
|-----------|---------|
| Font | Times New Roman 20px, normal weight, spacing=1 |
| Shadow | 1px black drop shadow at offset (1, 1) |
| Foreground | Civ text color |
| Position | Centered horizontally on city sprite, vertically at bottom of sprite |

**Orange marker pixel system** (city size box positioning): Analogous to the blue marker pixel for unit shields. Orange pixel rgb(255,155,0) (palette idx 249) embedded in the 1px green border around each city sprite cell in CITIES.GIF. X found by scanning top border row, Y by scanning left border column. Gives the top-left corner of the size box relative to the sprite cell.

### Scenario Files

| File | Description |
|------|-------------|
| `ROME.SCN`, `WWII.SCN` | Pre-built scenarios. |
| `EUROPE.MP`, `GREECE.MP`, `MEDITERR.MP`, `PACIFIC.MP`, `WORLD.MP`, `WORLD_M.MP`, `WORLD_S.MP` | Map templates at various sizes. |

### Save Files Analyzed

Multiple `.SAV` files from different game stages have been analyzed to map the binary format. All share the same structural layout described below.

### Network/Runtime Files

| File | Size | Description |
|------|------|-------------|
| `CIV2.DAT` | 516 bytes | Runtime game configuration. Contains player name, local IP address, game parameters. |
| `Na_Auto.NET` | 71,111 bytes | Network autosave. Same `CIVILIZE` header as `.SAV` files. |
| `Na_Auto2.NET` | 71,023 bytes | Second network autosave. |
| `smeds.log` | — | Game engine log. Records version, network events, data fix-ups. |
| `XDaemon.log` | — | Network library log. Records connection events, timestamps. |
| `HALLFAME.DAT` | — | Hall of Fame records. |

---

## Save File Format (.SAV) — Deep Dive

All `.SAV` files (including `.NET`, `.HOT`, `.EML` network/multiplayer variants) share the same binary structure. The layout consists of seven sequential sections. Section offsets are **not fixed** — they shift depending on the number of civilizations, units, and cities in the game. The structure must be navigated using the header fields and known record sizes.

### Overall File Layout

The layout below applies to `.SAV`, `.NET`, `.HOT`, and `.EML` files. `.SCN` files share the same structure but with shorter per-civ blocks, shorter unit/city records, and different map header offsets — see "SCN vs SAV Structural Differences" below.

```
┌─────────────────────────────────────────────────┐
│ 1. Header (14 bytes, fixed)                     │  0x0000
├─────────────────────────────────────────────────┤
│ 2. Game State Preamble (330 bytes, SAV/NET)     │  0x000E
│    (316 bytes for SCN files)                    │
├─────────────────────────────────────────────────┤
│ 3a. Per-Civ Name Blocks (8 × 242 bytes)        │  0x0156 (SAV/NET)
│                                                 │  0x0148 (SCN)
├─────────────────────────────────────────────────┤
│ 3b. Per-Civ Data Blocks (8 × 1,428 bytes)      │  0x08E6 (SAV/NET)
│     Last block truncated by 2 bytes             │  0x08D8 (SCN, 8 × 1,396)
├─────────────────────────────────────────────────┤
│ 4a. Map Header (14 bytes)                       │  13702/0x3586 (SAV/NET)
│                                                 │  13432/0x3478 (SCN)
├─────────────────────────────────────────────────┤
│ 4b. Block 1: Per-Civ Known Improvements         │  map_header + 14
│     (map_size × 7 bytes)                        │
├─────────────────────────────────────────────────┤
│ 4c. Block 2: TERRAIN DATA ← use this!           │  Block 1 end
│     (map_size × 6 bytes)                        │
├─────────────────────────────────────────────────┤
│ 4d. Block 3: Quarter-Resolution Data            │  Block 2 end
│     (quarter_width × quarter_height × 2)        │
├─────────────────────────────────────────────────┤
│ 4e. 1024-Byte Padding                           │
├─────────────────────────────────────────────────┤
│ 5. Unit Records (num_units × 32 bytes, SAV/NET) │  varies
│    (num_units × 26 bytes for SCN)               │
├─────────────────────────────────────────────────┤
│ 5b. Bridge Record (32 bytes, fixed)             │
├─────────────────────────────────────────────────┤
│ 6. City Records (num_cities × 88 bytes, SAV/NET)│  varies
│    (num_cities × 84 bytes for SCN)              │
├─────────────────────────────────────────────────┤
│ 7. Tail Data (see table below for sizes)        │  EOF - tail_size
└─────────────────────────────────────────────────┘
```

#### Tail Size by File Type

| File Type | Tail Size | Condition |
|-----------|-----------|-----------|
| Standard `.SAV` | **1,807 bytes** | `header[0x0D] & 0x01 == 0` |
| Scenario `.SAV` | **1,907 bytes** | `header[0x0D] & 0x01 == 1` |
| `.SCN` | **1,907 bytes** | Always scenario |
| `.NET` | **2,979 bytes** | Network autosave |

Combined with the city count at header offset `0x3C`, the unit count at offset `0x3A`, and the confirmed record sizes, the entire file can be navigated from the end:

```
# For SAV/NET files (32-byte units, 88-byte cities):
tail_size         = { 1807 if standard SAV, 1907 if scenario SAV, 2979 if NET }
tail_start        = file_size - tail_size
gap_record        = tail_start - 32                     # 32-byte record before tail
city_block_start  = gap_record - (num_cities × 88)
unit_block_start  = city_block_start - (num_units × 32)

# For SCN files (26-byte units, 84-byte cities):
tail_size         = 1907
gap_record        = file_size - tail_size - 32
city_block_start  = gap_record - (num_cities × 84)
unit_block_start  = city_block_start - (num_units × 26)
```

Note: `map_height` is a **single byte** at offset `0x0C` (not uint16). **However**, for tile data calculations, always use the map data header (offset 13702 for SAV/NET, 13432 for SCN), not the file header at 0x0A/0x0C. The end-of-file navigation shown above is useful for locating city and unit blocks, but tile block size should be calculated as `map_size × 6` where `map_size` comes from the map header.

### Section 1: Header (Bytes 0x0000–0x000D, 14 bytes, fixed)

> **⚠️ CRITICAL: DO NOT USE THESE DIMENSIONS FOR MAP RENDERING OR TILE DATA.**
>
> The map width (0x0A) and height (0x0C) in this file header **do not match** the map data header, and they **cannot be used** to calculate tile offsets, tile counts, or coordinate mappings. For example, a file header may say `width=44, height=63` while the map data header says `map_width2=80, map_height=50` (a 40×50 tile grid with 2,000 tiles — not 22×63 = 1,386).
>
> Using the wrong dimensions cascades into every subsequent calculation: wrong Block 2 offset, wrong terrain reads, wrong city-to-tile mapping, and a completely garbled map.
>
> **For ALL map-related work, use the map header at offset 13702.** See Section 4.

| Offset | Size | Field | Values Observed |
|--------|------|-------|-----------------|
| 0x0000 | 8 bytes | Magic signature | `CIVILIZE` (ASCII) |
| 0x0008 | 1 byte | Null separator | Always `0x00` |
| 0x0009 | 1 byte | Format marker | Always `0x1A` (ASCII SUB character) |
| 0x000A | 2 bytes | **Version / Map width** (uint16 LE) | Höfelt bytes 10-11. Dual interpretation: game version AND map width. `0x0027` (39) = CiC or lower, `0x0028` (40) = FW, `0x002C` (44) = MGE patch 1.3, `0x0031` (49) = ToT 1.0, `0x0032` (50) = ToT 1.1. For MGE, this is `44` in all saves analyzed. |
| 0x000C | 1 byte | **Map height** | Height in tiles. Single byte (NOT uint16). Standard=`63`, large=`191`. |
| 0x000D | 1 byte | Flags | Bitmask: **Bit 0** = scenario flag (game loaded from `.SCN`). **Bit 7** = large map flag. Observed: `0x00` = standard game, `0x81` = scenario on large map. |

Notes:
- **Previous documentation error corrected**: Bytes 0x08 and 0x09 were previously described as "separator 0x1A" and "version 0x2C". In reality, 0x08 is a null byte (`0x00`) and 0x09 is `0x1A`. The value `0x2C` (44) at offset 0x0A is the map width, not a version number.
- `.NET` files (network autosaves), `.HOT` (hot-seat), and `.EML` (email play) files all share the same `CIVILIZE` header and binary structure as `.SAV` files.
- `.SCN` files (original scenario data before being loaded as a game) also use `CIVILIZE` but have a **different internal structure** — see "SCN vs SAV Structural Differences" below.
- `.MP` files (map templates) do **NOT** use the `CIVILIZE` header — see "Map Template File Format (.MP)" below.
- **These dimensions disagree with the map data header.** The file header values at 0x0A/0x0C do not match the map data header. Key observations:
  - File header width `44` ≈ `map_width2 / 2 + 4` (i.e., 80/2 + 4 = 44). The "+4" is unexplained.
  - File header height varies: `63` for standard maps, `191` for large maps. Neither has an obvious arithmetic relationship to the actual `map_height`.
  - The formula `total_tiles = (width × height) / 2` using file header values is **incorrect** for tile data purposes.
- **For all map rendering, tile data navigation, and city coordinate mapping: always use the map data header.** See Section 4.

### Section 2: Game State (Bytes 0x000E–variable)

This section contains global game parameters: toggle options, player settings, technology data, and wonder data. It extends from the end of the header to the start of the civilization name blocks. Its total size is 330 bytes for SAV/NET or 316 bytes for SCN.

> **Note on offsets**: Höfelt uses 1-indexed **decimal** byte numbers counted from the start of the save file. To convert: `hex_offset = decimal_byte - 1`. For example, Höfelt "byte 12" = offset `0x000B`. The table below uses hex offsets (0-indexed).

#### Game Toggle Flags (Bytes 0x000C–0x0017)

These bytes store game options that the player can toggle in the game menus:

| Offset | Bits | Field |
|--------|------|-------|
| 0x000C | bit 7 | **Bloodlust** on/off |
| 0x000C | bit 4 | **Simplified combat** |
| 0x000D | bit 7 | **Flat earth** (0=round/wrapping, 1=flat) |
| 0x000D | bit 0 | **Don't restart eliminated** |
| 0x000E | bit 7 | Move units without mouse |
| 0x000E | bit 6 | Enter closes city screen |
| 0x000E | bit 5 | Show map grid |
| 0x000E | bit 4 | Sound effects |
| 0x000E | bit 3 | Music |
| 0x000F | bit 7 | **Cheat menu enabled** (also see 0x0014) |
| 0x000F | bit 6 | Always wait at end of turn |
| 0x000F | bit 5 | Autosave each turn |
| 0x000F | bit 4 | Show enemy moves |
| 0x000F | bit 3 | No pause after enemy moves |
| 0x000F | bit 2 | Fast piece slide |
| 0x000F | bit 1 | Instant advice |
| 0x000F | bit 0 | Tutorial help |
| 0x0010 | bit 5 | Animated heralds |
| 0x0010 | bit 4 | High Council |
| 0x0010 | bit 3 | Civilopedia for advances |
| 0x0010 | bit 2 | Throne room graphics |
| 0x0010 | bit 1 | Diplomacy screen graphics |
| 0x0010 | bit 0 | Wonder movies |
| 0x0014 | bit 7 | **Scenario flag** / don't limit researchable techs |
| 0x0014 | bit 6 | Scenario file (no real effect) |
| 0x0014 | bit 4 | Cheat penalty/warning |
| 0x0016 | bit 7 | Announce "We Love the King Day" |
| 0x0016 | bit 6 | Warn when food dangerously low |
| 0x0016 | bit 5 | Announce cities in disorder |
| 0x0016 | bit 4 | Announce order restored in city |
| 0x0016 | bit 3 | Show non-combat units built |
| 0x0016 | bit 2 | Show invalid build instructions |
| 0x0016 | bit 1 | Warn when city growth halted |
| 0x0016 | bit 0 | Show city improvements built |
| 0x0017 | bit 2 | Zoom to city not default action |
| 0x0017 | bit 1 | Warn when new pollution occurs |
| 0x0017 | bit 0 | Warn when changing production will cost shields |

> **Note on offset mapping**: The hex offsets above differ from Höfelt's decimal byte numbers because Höfelt counts from byte 1 while hex offsets are 0-indexed. Additionally, Höfelt's toggle byte 12 (our 0x000C) overlaps with the file header's "height" and "flags" fields — the same bytes serve dual purposes.

#### Core Game State Fields

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| 0x001C | 2 bytes | **Turns passed** (uint16 LE) | Höfelt byte 28-29. Current game turn count. |
| 0x001E | 2 bytes | **Turns for year calculation** (uint16 LE) | Höfelt byte 30-31. Used for game year display in pop-ups/status bar. May differ from turns passed. |
| 0x0022 | 2 bytes | **Selected unit ID** (uint16 LE) | Höfelt byte 34-35. Unit selected at start of turn. Right-click a unit in-game to see its ID. `0xFFFF` = none. |
| 0x0027 | 1 byte | **Active human player** | Höfelt byte 39. Which human player is currently active. |
| 0x0028 | 1 byte | **Player's map** | Höfelt byte 40. Which civ's map is displayed. |
| 0x0029 | 1 byte | **Player's civ number** | Höfelt byte 41. civ2mod.c: `PLAYERS_CIV_OFFSET 41`. The player's slot in the civ array (0–7, 0=barbarians). |
| 0x002A | 1 byte | **Map-related byte** | Höfelt byte 42. "Changes with map used. Sometimes FF." |
| 0x002B | 1 byte | **Map revealed** | Höfelt byte 43. Whether the full map is revealed (cheat mode). |
| 0x002C | 1 byte | **Difficulty level** | Höfelt byte 44. civ2mod.c: `DIFFICULTY_LEVEL_OFFSET 44`. 0=Chieftain, 1=Warlord, 2=Prince, 3=King, 4=Emperor, 5=Deity. |
| 0x002D | 1 byte | **Barbarian activity** | Höfelt byte 45. civ2mod.c: `BARB_LEVEL_OFFSET 45`. 0=villages only, 1=roving, 2=restless, 3=raging. |
| 0x002E | 1 byte | **Civs alive bitmask** | Höfelt byte 46. civ2mod.c: `CIVS_ACTIVE_OFFSET 46`. Read binary R→L: bit 0=barbarians, bit 1=civ 1 (white), bit 2=civ 2 (green), etc. E.g., `10011101` = barbarians + civs 2, 3, 4, 7 alive. |
| 0x002F | 1 byte | **Human players bitmask** | Höfelt byte 47. Same bit scheme. E.g., `00100110` = civs 1, 2, 5 are human. Toggling enables hotseat mode in FW. |
| 0x0032 | 1 byte | **Current pollution** | Höfelt byte 50. `0x7F` = max, triggers global warming. `0x80`–`0xFF` = negative (still shows icon but resets to 0 at end of turn). |
| 0x0033 | 1 byte | **Global warming count** | Höfelt byte 51. Number of times warming has occurred. `0x7F` = max (next warming turns everything to swamp). `0x80`+ = prevents all future warming (message still appears but terrain unchanged, counter resets to 0). Exploit: set to 0x80 to permanently disable warming. |
| 0x0038 | 1 byte | **Turns of peace** | Höfelt byte 56. Only counts after the 200th turn. |
| 0x003A | 2 bytes | **Total unit count** (uint16 LE) | Höfelt byte 58-59. civ2mod.c: `TOTAL_UNITS_OFFSET 58`. Size of unit list, including empty slots from destroyed units. Lowering removes most recent units; raising causes corrupt reads. |
| 0x003C | 2 bytes | **Total city count** (uint16 LE) | Höfelt byte 60-61. civ2mod.c: `TOTAL_CITIES_OFFSET 60`. Size of city list, including empty slots from destroyed cities. Same caveats as unit count. |
| 0x003E | 2 bytes | **Technology count** (uint16 LE) | Always `89` for standard RULES.TXT. Number of advances defined. |
| 0x0042 | 100 bytes | **First discoverer per advance** | Höfelt bytes 66-165. One byte per advance: civ number (1=white, 2=green, etc.) that first discovered it. 0 if not yet discovered. |
| 0x00A6 | 100 bytes | **Tech discovery bitmask per advance** | Höfelt bytes 166-265. One byte per advance: bit per civ that has discovered it. E.g., `00010010` = civs 1 and 4 have it. |
| 0x010A | 56 bytes | **Wonder city IDs** (28 × uint16 LE) | Höfelt bytes 266-321. Per wonder: `0xFFFF` = not built, `0xFFEF` = destroyed (original city not stored), else city sequence ID (`0x0000` = first city built in game). |

##### TODO: Game State Remaining Unknowns
- [x] Toggle flags at bytes 12–23 decoded (Höfelt)
- [x] Decode 0x2D: barbarian activity (Höfelt + civ2mod.c)
- [x] Decode 0x2E-0x2F: civs alive + human player bitmasks
- [x] Decode 0x0042-0x0149: tech/wonder data
- [ ] Decode 0x0024-0x0026: 3 unknown bytes between selected unit and player fields
- [ ] Decode 0x0030-0x0031: 2 bytes between human player bitmask and pollution
- [ ] Decode 0x0034-0x0037: 4 bytes between global warming and peace turns
- [ ] Decode 0x0039: 1 byte between peace turns and total units
- [ ] Decode 0x0040-0x0041: 2 bytes between tech count and first-discoverer array
- [ ] Decode 0x014A-0x0158: ~14 bytes between wonder data and per-civ name blocks
- [ ] **RENDERING**: "Show map grid" toggle (0x000E bit 5) — when set, the game overlays diamond grid lines on the map. No rendering spec exists: grid line color, thickness, opacity, and drawing method (full diamond outlines vs corner marks) are all unknown.

#### Player's Civ Slot vs. LEADERS.TXT Index

The value at offset 0x0029 is the player's **civ number** (Höfelt byte 41, civ2mod.c `PLAYERS_CIV_OFFSET`) — their position in the game's internal civilization array (0–7, where 0=barbarians). This is **not** the same as the civilization's index in `LEADERS.TXT` (0–20). Offset 0x0027 controls which human player is active, 0x0028 which civ's map is displayed, and 0x0029 which civ number is the player's.

### Section 3: Civilization Data (variable size per game configuration)

This section contains all per-civilization data. It always has **8 civ slots** regardless of the `total_civs` header field or how many civilizations are actually active in the game.

The section has two sub-parts:

| Sub-section | Start Offset (SAV/NET) | Start Offset (SCN) | Size | Description |
|-------------|----------------------|-------------------|------|-------------|
| Per-Civ Name Blocks | `0x0156` | `0x0148` | 8 × 242 = 1,936 bytes | Leader names, tribe names, government titles |
| Per-Civ Data Blocks | `0x08E6` | `0x08D8` | 8 × N bytes (see below) | Technology, diplomacy, AI state, resources |

The name block region and the `"dddddddd"` marker at `0x0926` (SAV/NET) or `0x0918` (SCN) are **fixed-size** across all files of the same type. The per-civ data block size N is **fixed per file type**:

| File Type | Per-Civ Block Size (N) | Total (8 × N - 2)* | Map Header Offset |
|-----------|----------------------|--------------------|--------------------|
| SAV / NET | **1,428 bytes** | 11,422 bytes | 13702 (0x3586) |
| SCN | **1,396 bytes** | 11,166 bytes | 13432 (0x3478) |

\*The last of the 8 per-civ blocks is truncated by 2 bytes (i.e., 7 blocks × N + 1 block × (N-2)).

**SAV vs SCN offset difference**: SAV/NET files have 270 extra bytes before the map header compared to SCN files: 14 bytes in the game state preamble + 32 bytes per civ slot × 8 slots = 14 + 256 = 270 bytes. This is because SAV files include additional per-unit and per-city ID tracking fields that SCN files omit.

#### Per-Civ Name Block (242 bytes each, 7 blocks — excludes barbarians)

Each of the 8 civ slots (including barbarians at slot 0) has a 242-byte block containing identity strings. The block starts at `name_block_start + (slot × 242)` where `name_block_start` is `0x0156` for SAV/NET or `0x0148` for SCN. AI civs typically have all-zero name blocks; their identity data comes from RULES.TXT at runtime.

> **Note**: Höfelt documents only **7** name blocks (slots 1–7, no barbarian slot), covering offsets 584–2277 (FW), consistent with 7 × 242 = 1,694 bytes.

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 1 byte | **City style** | `0x00`=Ancient, `0x01`=Renaissance, `0x02`=Industrial, `0x03`=Modern. Can set to any style without prerequisites. Higher values produce unusual effects. |
| +2–24 | 23 bytes | **Leader name** | Null-terminated, 23 chars max. |
| +26–48 | 23 bytes | **Tribe name** (plural) | e.g., `"Romans"` |
| +50–72 | 23 bytes | **Tribe adjective** (singular) | e.g., `"Roman"` |
| +74–96 | 23 bytes | Title: Anarchy | Default/fallback title |
| +98–120 | 23 bytes | Title: Despotism | |
| +122–144 | 23 bytes | Title: Monarchy | |
| +146–168 | 23 bytes | Title: Communism | |
| +170–192 | 23 bytes | Title: Fundamentalism | |
| +194–216 | 23 bytes | Title: Republic | |
| +218–240 | 23 bytes | Title: Democracy | |
| +241 | 1 byte | Padding | `0x00` |

All string fields are null-terminated within their allocation. Residual bytes from previous save data may appear after the null terminator (e.g., `"andhi"` leftover from overwriting `"Gandhi"` with a shorter name). Unmet or eliminated civs have all-zero blocks.

**Verification**: The player's name always appears at exactly `name_block_start + (player_slot × 242)`, and AI leader names (e.g., `"Mao Tse Tung"`, `"Mohandas Gandhi"`) appear at their corresponding slot offsets.

#### Per-Civ Data Block (1,428 bytes each for SAV/NET; 1,396 bytes for SCN)

Each civ slot has a data block starting at `per_civ_data_start + (slot × block_size)` where `per_civ_data_start` is `0x08E6` for SAV/NET or `0x08D8` for SCN. The last (8th) block is 2 bytes shorter. These blocks contain:

- **Technology state**: 6-byte entries per technology (pattern: `01 XX F0 YY 00 00` where XX encodes acquisition method and YY encodes tech level/era). Matches the 89 technologies from RULES.TXT.
- **Diplomacy/attitudes**: int16 pairs encoding relationships with other civs.
- **AI behavior state**: Strategy priorities, production preferences (non-zero for AI civs; mostly zero for the human player's slot and eliminated civs).
- **Resource/treasury data**: Gold, science, luxury allocation percentages.

The blocks persist even for eliminated civs (retaining historical data). Active AI civs have the most non-zero data. The player's block has minimal data since AI behavior fields are not used.

The 32-byte difference between SAV (1,428) and SCN (1,396) blocks per civ corresponds to the extra unit/city ID tracking fields that the runtime game engine adds when a scenario is loaded and saved.

**Independent confirmation**: AGRICOLA (Apolyton, May 2004) independently confirmed the 1,428-byte block size. Mercator's file format table of contents lists `Properties (8 × 1428 = 11424)` for the Civilizations section.

##### Per-Civ Block Internal Layout (1,428 bytes for SAV/NET; 1,396 bytes for SCN)

All offsets below are **1-indexed** to match Höfelt's convention (byte 1 = first byte of the block). Subtract 1 for 0-based offset within the block.

| Byte(s) | Size | Field | Notes |
|---------|------|-------|-------|
| 1 | 1 byte | **State flags** | Bitmask: bit 0 = skip next oedo year (e.g., after falling to anarchy), bit 1 = at war with another civ (peace turns), bit 2 = senate override chance (toggled every turn with 1/3 probability; when NOT set, Republic Senate confirms your action — per FoxAhead), bit 3 = recovered from revolution (allow gov change), bit 5 = free advance pending (Philosophy bonus), cleared when received. |
| 2 | 1 byte | **Gender** | `0x00` = male, `0x02` = female. May not function in MGE. |
| 3–6 | 4 bytes | **Treasury** (int32 LE) | Gold reserves. Even barbarians can have money. Values above 32,000 are capped to 30,000 by the game engine (Julius Brenzaida's "No Limits" patch removes this cap). |
| 7 | 1 byte | **RULES.TXT civ number** | Which civilization definition from RULES.TXT/LEADERS.TXT this slot uses. Multiple slots can reference the same civ number, producing duplicate civilizations with the same color, portrait, and flag. |
| 8 | 1 byte | **Civ variant** | Values > 0 cause the civ to read its name from LABELS.TXT/MENU.TXT and use a non-standard color (red, alternative green, etc.). Normally 0. |
| 9–10 | 2 bytes | **Research progress** (uint16 LE) | Beakers accumulated toward current research. Also updates the science indicator color bar. |
| 11 | 1 byte | **Tech being researched** | Index into RULES.TXT `@CIVILIZE` section. `0xFF` = no research goal / cleared. |
| 12 | 1 byte | **Tech research helper** | Must be `0xFF` if tech is cleared, otherwise `0x00`. Non-zero with certain tech IDs reads strings from LABELS.TXT. |
| 13–14 | 2 bytes | **Starting position** (uint16 LE) | Column where this civ's settler(s) initially appeared. May be reused to select reappearance position when a destroyed civ respawns. |
| 15–16 | 2 bytes (int16 LE) | **Turn of city build** | Turn number on which this civ last built/founded a city. Range 1–432+ for active civs. Dead civs retain their last value. Barbarians have values based on camp spawning. Confirmed via FoxAhead's `TCiv.TurnOfCityBuild` (offset 0x0E). |
| 17 | 1 byte | **Acquired tech count + 1** | Number of technologies discovered (not counting starting techs) plus 1. **Critical**: this value controls the beaker cost of the next discovery AND strongly influences AI attitude ("Supreme", "Mighty", etc. power ranking). |
| 18 | 1 byte | **Future Tech count + 1** | Number of Future Technologies discovered plus 1. |
| 19 | 1 byte | **Unknown** | Always 0 across all 1856 tested civ slots. FoxAhead labels this `Unknown_12`. Located between Future Tech count and science rate. |
| 20 | 1 byte | **Science rate** | Science slider setting as a multiplier (0–10). Value × 10 = percentage allocated to science. E.g., `6` = 60% science. Confirmed: `scienceRate + taxRate ≤ 10` in all 1530 tested active/barb slots. Luxury rate = `10 − scienceRate − taxRate`. Source: FoxAhead `TCiv.ScienceRate` (0x13). |
| 21 | 1 byte | **Tax rate** | Tax slider setting as a multiplier (0–10). Value × 10 = percentage allocated to tax. Previously labeled "Tax/Science/Luxury rates" (combined field). Source: FoxAhead `TCiv.TaxRate` (0x14). |
| 22 | 1 byte | **Government type** | `0x00`=Anarchy, `0x01`=Despotism, `0x02`=Monarchy, `0x03`=Communism, `0x04`=Fundamentalism, `0x05`=Republic, `0x06`=Democracy. Values ≥ `0x08` cause a crash. Barbarians can be given Democracy (`0x06`) to prevent their cities from being subverted. |
| 23 | 1 byte | **AI random seed** | Near-uniform distribution 0–99 that changes every turn for active AI civs. Always 0 for barbarians and dead civs. FoxAhead labels this `TCiv.SenateChances` (0x16), but empirical data shows no correlation with government type — behaves as a per-turn AI PRNG state or randomizer. |
| 24–27 | 4 bytes | **Unknown (AI diplomatic counters)** | 4 independent uint8 counters with decreasing frequency. Byte 24: range 0–3, 37.8% non-zero. Byte 25: range 0–5, 19.6% non-zero. Byte 26: range 0–3, 4.2% non-zero. Byte 27: range 0–1, 0.8% non-zero. All zeros for barbarians and dead civs. Monotonically decreasing (byte[0] ≥ byte[1] ≥ byte[2] ≥ byte[3]) 92.3% of the time. Most common patterns: `[0,0,0,0]` (57.7%), `[1,0,0,0]` (20.6%), `[1,1,0,0]` (7.3%). Correlates with government type (Despotism avg byte[0]=0.16, Monarchy/Republic avg=0.71–0.72) and tech count (avg techs per byte[0] value: 0→13.6, 1→20.8, 2→29.0, 3→28.7). Best hypothesis: successive AI diplomatic state transition counters — each byte tracks a different threshold event, with decreasing frequency at higher indices. FoxAhead: `Unknown_17` (0x17–0x1A). |
| 28 | 1 byte | **Unused** | Always 0 across all 1856 tested civ records (232 saves × 8 slots). Confirmed unused in MGE. FoxAhead: `Unknown_1B` (0x1B). |
| 29–30 | 2 bytes (uint16 LE) | **Treaty-breaking count** | Cumulative count of treaty violations committed by this civ. Effectively a single byte (byte 30 is always 0). Range 0–4. Always 0 for barbarians and dead civs. 80% of non-zero cases are currently at war. Approximately equals `sum(abs(negative treatyViolations[0..7]))` — 89.9% exact match; the 10.1% mismatch likely reflects timing differences (per-civ entries may reset on civ destruction/re-peace while this field retains the cumulative count, or vice versa). FoxAhead: `Unknown_1C` (0x1C). |
| 31 | 1 byte | **Reputation (betrayals)** | Global diplomatic reputation / betrayals counter. Range 0–7: `0`=Spotless, `1`=Excellent, `2`=Honorable, `3`=Questionable, `4`=Marginal, `5`=Poor, `6`=Despicable, `7`=Atrocious. Increases when this civ breaks treaties; decays slowly over time. Distinct from the per-civ treaty violations array at bytes 73–80 (which tracks bilateral violations). FoxAhead: `TCiv.Reputation` (0x1E). TOTPP Lua: `tribe.betrayals`. |
| 32 | 1 byte | **Patience** | AI negotiation patience counter. Range 0–6, mostly 0 (83%). Determines how long an AI civ will entertain diplomatic meetings before terminating negotiations. Depletes when contacted frequently; resets or decays over time. Always 0 for barbarians and dead civs. FoxAhead: `Unknown_1F` (0x1F). Confirmed as "patience" by axx0/Civ2-clone (read at offset 31 as `patience`), Catfish's Cave ToT documentation (ToT offset +39), and TOTPP Lua API (`tribe.patience` get/set property). Previously misread as the first treaty byte due to a 1-byte offset bug. |
| 33–64 | 32 bytes | **Treaties** | 4 bytes per civ × 8 civs (including barbarians and self). Self-treaty (slot toward self) is always all zeros. See Treaty Byte Layout below. **CORRECTED**: Previously documented at bytes 32–63; confirmed at bytes 33–64 via FoxAhead's `TCiv.Treaties` (offset 0x20) and empirical self-treaty validation across 232 saves. |
| 65–72 | 8 bytes | **Attitudes** | One byte per civ slot (0–7). Byte 65 = attitude toward barbarians (always 100 for active civs), byte 66 = toward civ 1, ..., byte 72 = toward civ 7. Range 0–100. **CORRECTED**: Previously documented as 7 entries at bytes 66–72 (missing barbarian entry); confirmed as 8 entries at bytes 65–72 via FoxAhead's `TCiv.Attitude[0..7]` (offset 0x40). |
| 73–80 | 8 bytes | **Treaty violations** | Per-civ treaty-breaking tracker. 8 × signed int8, indexed by target civ slot (0–7). Value 0 = neutral/no violations (98.3% of entries). **Negative** (−1 to −6) = THIS civ broke a treaty with the target; value = negative count of broken treaties. **Positive** (+1 to +2) = the TARGET broke a treaty with this civ; value = count broken by target. Self-slot always 0, position 0 (barbarians) always 0. 100% correlation: negative value → target has vendetta flag toward this civ. **Cross-references**: Catfish's Cave (ToT +80–87) and TOTPP Lua (`tribe.reputation[otherTribe]`) call this "per-tribe reputation" — the underlying concept is the same (bilateral diplomatic standing), but our empirical analysis shows the values specifically track treaty violations. Distinct from the global betrayals counter at byte 31. |
| 81–88 | 8 bytes | **Diplomatic interaction counters** | Per-civ diplomatic interaction intensity. 8 × uint8, indexed by target civ slot (0–7). Range 0–22. Self-slot always 0. 6× more likely non-zero when at war with target, 9× more likely with contact. Grows with game age (avg sum: 0.08 at turns 0–49, 2.20 at turns 200–249). 84.8% symmetric between civ pairs; 15.2% asymmetric, suggesting per-civ event tracking. Not the mirror of the signed treaty violations array. Best hypothesis: cumulative count of hostile diplomatic interactions or border incidents per target civ. |
| 89–100 | 12 bytes | **Technology bitmask** | One bit per technology, packed LSB first. `0xFF FF FF FF FF FF FF FF FF FF FF FD` = all standard techs. In MGE, all bits in all bytes count (unlike earlier versions where one bit per byte was skipped). Adding user-defined techs changes the last byte from `0xFD` to `0xFF`. |
| 101–102 | 2 bytes (uint16 LE) | **Tech bitmask overflow** | `max(0, techBitmaskBitsSet − 80)`. Effectively a single byte (byte 102 is always 0). 100% exact match across all 1856 tested records. Zero for civs with ≤ 80 tech bits set (98.4% of records). Non-zero only in late-game saves with near-complete tech trees (e.g., 95 of 96 bits → value 15). Likely an internal engine overflow counter or cached computation for demographics/score/tech-cost scaling. |
| 103–104 | 2 bytes | **Military power** (uint16 LE) | Military demographics value. **Naming discrepancy**: axx0/Civ2-clone reads this as `numberMilitaryUnits` (a count), Catfish's Cave (ToT) calls it "total number of military units", while Höfelt calls it "military demographics". May be a count of military units rather than a power/strength metric, or a demographics display value that happens to equal the count. Needs further empirical verification. |
| 105–106 | 2 bytes | **City count** (uint16 LE) | Displayed in multiplayer lobby. No apparent effect in single-player. |
| 107–108 | 2 bytes | **Naval unit count** (uint16 LE) | Count of sea-domain units (types 32–41: Trireme, Caravel, Galleon, Frigate, Ironclad, Transport, Cruiser, AEGIS Cruiser, Battleship, Carrier). Runtime-maintained counter: incremented when a naval unit is built, decremented when one is lost. 96.4% exact match with snapshot-reconstructed ship count across 232 saves; remaining 3.6% explained by dead unit slot recycling. |
| 109–110 | 2 bytes | **Sum of city sizes** (uint16 LE) | Total population across all cities (in size units). |
| 111–112 | 2 bytes | **Total unit atk+def sum** (uint16 LE) | Cumulative sum of `(RULES.TXT attack + defense)` values for all units owned by this civ. Runtime-maintained counter: incremented by `(atk + def)` when a unit is created, decremented when a unit is lost. Pearson r = 0.997 with snapshot-reconstructed atk+def sum. Sequential save analysis confirms exact delta match (du110 = d(atk+def) for each unit gained/lost). Cross-sectional exact match rate is 37.1% due to dead unit slot recycling. |
| 113–114 | 2 bytes | **Total unit attack sum** (uint16 LE) | Cumulative sum of RULES.TXT attack values for all units owned by this civ. Same runtime-maintained counter mechanism as above but tracking attack only. 81.7% exact match with snapshot-reconstructed attack sum across 232 saves; sequential save analysis confirms 100% exact delta match. |
| 115–214 | 100 bytes | **First discoverer flags** | One byte per technology. `0x00` = this civ was the first to discover it. `0xFF` (or any non-zero) = not first. |
| 215–277 | 63 bytes | **Active unit counts** | One byte per unit type (in RULES.TXT `@UNITS` order). Byte 215 = number of settlers, byte 216 = engineers, etc. |
| 278–340 | 63 bytes | **Unit casualty counts** | One byte per unit type. Number of each unit type lost/destroyed. |
| 341–403 | 63 bytes | **Units in production** | One byte per unit type. Number of each type currently being produced. Computed at runtime, so hex-editing has no effect. |
| 404 | 1 byte | **Padding** | Always 0x00. Gap byte between units-in-production and per-continent statistics block. |
| 405–532 | 128 bytes | **Military power per continent** | 64 entries × 2 bytes (uint16 LE). In practice only the low byte of each entry carries data (high byte always 0x00), so effectively 64 single-byte values at even byte positions. Entry index = continent bodyId − 1. Sum across all entries ≈ the `militaryPower` field at bytes 103–104. See Per-Continent Statistics Block below. |
| 533–660 | 128 bytes | **Land attack strength per continent** | Same format as above (64 × uint16 LE, low byte only). Each entry = sum of RULES.TXT attack values for all **land military units** on that continent. Naval, air, and non-combat units (Settlers, Diplomat, Caravan, etc.) contribute 0. Sum across all entries ≈ the `totalUnitAtkSum` field at bytes 113–114 (though the summary field includes ALL unit domains, not just land). Note: byte 660 (high byte of last entry) shares position with the first byte of Section C. |
| 660–723 | 64 bytes | **City count per continent** | 64 single-byte entries. Entry index = continent bodyId − 1. Value = number of cities this civ owns on that continent. Sum across all entries = total city count. |
| 724–787 | 64 bytes | **Sum of city sizes per continent** | 64 single-byte entries. Same indexing. Value = total population (in city-size units) across cities on that continent. Sum = total population. |
| 788–851 | 64 bytes | **Per-continent transient flags** | 64 single-byte entries. Almost always zero (< 0.1% non-zero rate across 232 tested saves). When non-zero, values are small (1–4). Most common at position 0. Likely transient AI planning state (combat activity, exploration missions). |
| 852–914 | 63 bytes | **Per-continent status bitflags** | 63 single-byte entries, one per continent slot (0–62). Observed values: `5` (0b00000101), `10` (0b00001010), `15` (0b00001111), `21` (0b00010101), `31` (0b00011111), `4`, `8`, `13`, `14`, `128`. Player civs tend to show `21` on their primary continent. AI civs typically show `5` or `15`. Zero = no data for this continent. See Per-Continent Status Bitflags below. |
| 915–978 | 64 bytes | **Unit type "ever built" flags** | 64 single-byte entries indexed by unit type ID (0–62, plus position 63). Value `5` = this unit type has never been built. Value `0` = has been built at least once. Positions 0 and 63 are always `5` (sentinels — Settlers at position 0 are tracked differently since every civ starts with one). Dead civs have all 64 bytes set to `5`. |
| 979–996 | 18 bytes | **Power graph ranking data** | 9 × int16 LE (signed). H[0] is always ≥ 0 (range 0–47). H[1]–H[4] are always ≤ 0. H[5]–H[7] are signed with potentially large magnitudes. H[8] = −1 (sentinel). Barbarians typically store `[0,0,0,0,0,0,0,10,−1]`. These values likely correspond to power graph category differentials (military, population, food, land, production, commerce, science, gold). |
| 997–1010 | 14 bytes | **Last contact turns** | 2 bytes per civ (uint16 LE), 7 entries. Bytes 997–998 = last contact with civ 1, etc. `0xFFFF` = no contact yet. (Bytes 995–996 may be barbarian contact, unverified.) |
| 1010 | 1 byte | **AI persona index** | Formula: `(rulesCivNumber % 7) + 7 × leaderPersonality`. The `leaderPersonality` component ranges 0–5 (6 possible values). Changes when a civ is destroyed and reborn. Barbarians (slot 0) always have value 0. |
| 1011–1021 | 11 bytes | **Constant padding** | Always `[1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0]` across all 1784 tested civ records (223 saves × 8 slots). Purpose unknown — may be default spaceship component flags or engine constants. |
| 1022–1023 | 2 bytes | **Spaceship structural** (uint16 LE) | Number of spaceship structural components built. Range observed: 0–30. Only non-zero for AI civs in late-game saves with many technologies. |
| 1024–1025 | 2 bytes | **Spaceship propulsion** (uint16 LE) | Number of spaceship propulsion components built. Maximum observed: 8. Only non-zero in saves where civs have 100+ technologies. |
| 1026–1027 | 2 bytes | **Spaceship estimate 1** (int16 LE) | Signed year or score estimate related to spaceship. When non-zero, typically a large negative value (e.g., −1500 to −2000). |
| 1028–1029 | 2 bytes | **Spaceship estimate 2** (int16 LE) | Signed year or score estimate. Related to estimate 1: typically `estimate1 − estimate2 ≈ 427` (or ≈ 319 with max propulsion of 8). |
| 1030–1043 | 14 bytes | **Zero padding** | Always zero across all tested saves. May be reserved for additional spaceship fields present in ToT but unused in MGE. |
| 1044–1427 | 384 bytes | **AI continent goals** | 64 × 6-byte entries, one per continent slot (index = bodyId − 1). See AI Continent Goal Entry below. **Note**: Civ 7 (slot 7) has only 416 bytes total in the tail (2 fewer than civs 0–6), so entry 63 is truncated to 4 bytes (missing goalType and goalExtra). The parser reads 63 entries for civ 7. |

###### AI Continent Goal Entry (6 bytes)

Each of the 64 entries in the AI continent goals block represents the AI's strategic goal for that continent:

| Byte | Type | Field | Notes |
|------|------|-------|-------|
| 0–1 | uint16 LE | **x** | Map x-coordinate of the goal target. 0 if no goal. |
| 2–3 | uint16 LE | **y** | Map y-coordinate of the goal target. 0 if no goal. |
| 4 | uint8 | **goalType** | Goal type code: `0` = explore, `1` = attack/defend, `5` = city site, `7` = naval(?), `21` = threat(?), `255` = empty/unused. |
| 5 | int8 | **goalExtra** | Signed priority or target civ. Range observed: −7 to +5. Possibly encodes the target civ slot index (signed). |

> **Notes**: Human-controlled civs and barbarians typically have all-zero goal entries. Dead civs show `goalType = 255` for all entries. Active AI civs have non-zero entries corresponding to continents they have explored or are interested in. The number of active goals correlates with the civ's territorial awareness and military activity.

> **Civ 7 truncation**: The per-civ block size for civ 7 is always 2 bytes shorter than for civs 0–6 (1426 vs 1428 in SAV format). This means the last continent goal entry (index 63) is missing its final 2 bytes (goalType and goalExtra), effectively giving civ 7 only 63 complete entries.

> **FoxAhead validation**: FoxAhead's `TCiv` struct splits the 64 AI goals into two arrays: `Unknown_414[0..47]` (48 entries at offset +0x414 / +1044) and `Unknown_534[0..15]` (16 entries at offset +0x534 / +1332). Total: 48 + 16 = 64 entries × 6 bytes = 384 bytes. The `TCivSub1` record type (X: int16, Y: int16, Unknown_4: byte, Unknown_5: byte) matches our decoded goal entry format exactly. The 48/16 split may reflect different priority tiers (active goals vs reserve/overflow).

> **Methodology**: Decoded by statistical analysis across 223 save files (1784 per-civ records). The 11-byte constant at +1011 was confirmed invariant across all records. Spaceship fields confirmed by correlation with late-game saves (only 3 records with non-zero propulsion, all with 100+ technologies). AI goals confirmed by validating coordinates against map dimensions and observing goal activity patterns for human vs AI vs dead civs. Sequential turn analysis using 9 early-game saves confirmed persona index changes on civ death/rebirth. The entry-per-continent mapping was verified by cross-referencing goal coordinates with tile bodyId values.

###### Treaty Byte Layout (4 bytes per civ pair)

| Byte | Bits | Meaning |
|------|------|---------|
| 1st | bit 0 | Contact established |
| 1st | bit 1 | Cease fire |
| 1st | bit 2 | Peace treaty |
| 1st | bit 3 | Alliance (always combined with peace) |
| 1st | bit 4 | Vendetta |
| 1st | bit 5 | Hatred (FoxAhead: possibly spaceship-related) |
| 1st | bit 7 | Embassy |
| 2nd | bit 0 | Nukes discussed (FoxAhead: "They talked about nukes with us") |
| 2nd | bit 1 | Attacked a unit of the other tribe (CivFanatics) |
| 2nd | bit 5 | War |
| 2nd | bit 6 | Recently signed peace treaty / cease fire (FoxAhead) |
| 3rd | bit 0 | Captured a city of the other tribe (CivFanatics) |
| 3rd | bit 1 | We nuked them (FoxAhead) |
| 3rd | bit 2 | Accepted tribute (FoxAhead) |
| 4th | — | Unknown / reserved |

> **Note**: Treaty flags can be combined to create unusual states (e.g., war + alliance simultaneously: units get repaired when attacking enemy cities, but diplomacy screens show war). The 4-byte pattern repeats for each of the 8 civ slots.

##### City Knowledge Entry (6 bytes)

Each entry in the city knowledge list encodes a city this civ knows about:

| Byte | Field | Notes |
|------|-------|-------|
| 0 | **Relationship type** (int8) | `0` to `4` = friendly/own cities. `-5` (0xFB) = ?, `-3` (0xFD) = foreign/known, `-2` (0xFE) = foreign/different state, `-1` (0xFF) = boundary. |
| 1–2 | **X coordinate** (uint16 LE) | Isometric X of the city |
| 3–4 | **Y coordinate** (uint16 LE) | Isometric Y of the city |
| 5 | **Flags** | 0x00 or 0x01 typically. 0xFF = empty sentinel slot. |

**Verified**: City coordinates in these entries match actual city positions in the city record section.

##### Per-Continent Statistics Block (bytes 405–997)

This 593-byte region stores per-continent breakdowns of the civ's aggregate statistics. Civ2 assigns each contiguous land or water body a **body ID** (1–63, where 63 = ocean). The statistics are indexed by **slot = bodyId − 1**, so slot 0 = continent with bodyId 1, slot 1 = bodyId 2, etc.

**Structure overview (593 bytes):**

| Sub-section | Byte Offset | Size | Entry Count × Size | Content |
|-------------|-------------|------|--------------------|---------|
| A | 405–532 | 128 | 64 × 2 bytes | Military power per continent |
| B | 533–660 | 128 | 64 × 2 bytes | Land attack strength per continent |
| C | 660–723 | 64 | 64 × 1 byte | City count per continent |
| D | 724–787 | 64 | 64 × 1 byte | Sum of city sizes per continent |
| E | 788–851 | 64 | 64 × 1 byte | Per-continent transient flags |
| F | 852–914 | 63 | 63 × 1 byte | Per-continent status bitflags |
| G | 915–978 | 64 | 64 × 1 byte | Unit type "ever built" flags |
| H | 979–996 | 18 | 9 × 2 bytes | Power graph ranking data |

**Sections A and B** use a uint16 LE format where in practice only the low byte carries data (the high byte is always `0x00`). The effective data is a single byte at every even position (bytes 405, 407, 409, ... for section A; bytes 533, 535, 537, ... for section B). Note: byte 404 is a padding byte (always 0) separating units-in-production from the per-continent block. **CORRECTED**: Previous versions stated the high byte carried data; empirical verification across 232 saves confirmed data is in the low byte.

**Section A — Military power per continent**: The low byte of each entry represents this civ's military power on the corresponding continent. The sum of all low bytes across 64 entries approximately equals the aggregate `militaryPower` field at bytes 103–104. Exact match rate is ~63% across tested saves; discrepancies arise from lazily-updated cached values that may not be refreshed every turn.

**Section B — Land attack strength per continent**: Same format as A. Each entry = the sum of RULES.TXT attack values for all **land military units** this civ has on that continent. Naval units, air units, and non-combat units (Settlers, Engineers, Diplomat, Spy, Caravan, Freight, Explorer) contribute 0 to this metric. Verified per-unit-type contributions:

| Unit Type | Attack Contribution |
|-----------|-------------------|
| Warriors (2) | 1 |
| Phalanx (3) | 1 |
| Archers (4) | 3 |
| Legion (5) | 4 |
| Pikemen (6) | 1 |
| Musketeers (7) | 3 |
| Riflemen (11) | 5 |
| Marines (12) | 8 |
| Horsemen (15) | 2 |
| Chariot (16) | 3 |
| Elephant (17) | 4 |
| Crusaders (18) | 5 |
| Cavalry (21) | 8 |
| Catapult (23) | 6 |
| Cannon (24) | 8 |
| All naval units | 0 |
| Settlers, Diplomat, Caravan, etc. | 0 |

**Section C — City count per continent**: One byte per continent slot. Value = number of cities this civ owns on that continent. Sum across all 64 entries = total city count (88.8% exact match across 232 saves; remainder due to stale caching).

**Section D — Sum of city sizes per continent**: One byte per continent slot. Value = total population in city-size units across this civ's cities on that continent. Sum across all 64 entries = total city population (88.1% exact match).

**Section E — Per-continent transient flags**: Almost always all zeros. In 232 tested saves, only 83 non-zero bytes were found (< 0.1% hit rate). When non-zero, values are small (1–4), most commonly at position 0 (relative offset within section). Likely represents transient AI state such as active combat or exploration missions on a continent.

**Section G — Unit type "ever built" flags**: 64 bytes indexed by unit type ID (0–62, plus position 63). Value `5` = this unit type has never been built by this civ. Value `0` = has been built at least once (may or may not still exist). Positions 0 and 63 are always `5` (sentinels). When a civ is destroyed, all 64 bytes reset to `5`.

##### Per-Continent Status Bitflags (bytes 852–914)

Section F contains 63 bytes, one per continent slot (0–62). Each byte is a bitmask encoding the civ's status on that continent. Observed values and their bit decomposition:

| Value | Binary | Bits Set | Frequency | Notes |
|-------|--------|----------|-----------|-------|
| 5 | `00000101` | 0, 2 | Most common | Default for known/explored continents |
| 10 | `00001010` | 1, 3 | Common | |
| 15 | `00001111` | 0, 1, 2, 3 | Common | Typical for AI civs with presence |
| 21 | `00010101` | 0, 2, 4 | Common | Typical for human player's continent |
| 31 | `00011111` | 0, 1, 2, 3, 4 | Moderate | Combined activity state |
| 4 | `00000100` | 2 | Moderate | |
| 8 | `00001000` | 3 | Rare | |
| 13 | `00001101` | 0, 2, 3 | Rare | |
| 14 | `00001110` | 1, 2, 3 | Rare | |
| 128 | `10000000` | 7 | Very rare (1 occurrence) | |

The individual bits likely correspond to statuses such as "has units here", "has cities here", "explored", "is primary continent", or "at war on this continent", but the exact per-bit meanings have not been isolated through controlled experiments.

##### Power Graph Ranking Data (bytes 979–996)

Section H contains 9 signed int16 LE values. The last entry (H[8]) is always −1 (sentinel). The remaining 8 entries likely correspond to the 8 power graph/demographics categories, storing ranking differentials or score deltas.

| Entry | Range | Notes |
|-------|-------|-------|
| H[0] | 0 to 47 | Always non-negative. |
| H[1] | −1306 to 0 | Always non-positive. Largest magnitude. |
| H[2] | −684 to 0 | Always non-positive. |
| H[3] | −283 to 0 | Always non-positive. |
| H[4] | −74 to 0 | Always non-positive. Smallest magnitude of the negative group. |
| H[5] | −206 to 401 | Signed, both positive and negative. |
| H[6] | −943 to 699 | Signed, widest range. |
| H[7] | −922 to 703 | Signed, wide range. For barbarians, commonly `10`. |
| H[8] | −1 | Always −1 (sentinel). |

Barbarians (civ 0) typically have all values zero except H[7]=10 and H[8]=−1: `[0, 0, 0, 0, 0, 0, 0, 10, −1]`.

> **Methodology**: Decoded by statistical analysis across 232 save files from diverse games (different maps, players, eras). Continent slot mapping confirmed by correlating C[slot] city counts with actual city positions via `getBodyId()`. Section B attack values confirmed against standard RULES.TXT by isolating single-unit-type continents. This region was previously undocumented across all known community sources (Civ2-clone, Allard Höfelt, Catfish's Cave, TOTPP).
>
> **Independent validation**: FoxAhead's `Civ2Types.pas` (`TCiv` struct) contains arrays `Unknown_192` through `Unknown_392` that match exactly with our decoded Blocks A–G — confirming the array sizes and types (64 × uint16 LE for A/B, 64 × byte for C–G). FoxAhead labels these as "Unknown" but the structural match provides high confidence in our decode. See https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas.

##### TODO: Per-Civ Block — Remaining Unknowns
- [x] Locate per-civ government type → byte 22
- [x] Locate per-civ treasury → bytes 3–6 (int32 LE)
- [x] Locate per-civ tax/luxury/science rates → byte 20 = science rate, byte 21 = tax rate (luxury = 10 − sci − tax). **CORRECTED**: previously a single combined field at byte 21; now split per FoxAhead.
- [x] Identify technology bitmask → bytes 89–100 (12 bytes, 1 bit per tech)
- [x] Decode treaty structure → bytes 33–64 (4 bytes × 8 civs). **CORRECTED**: was bytes 32–63 (off by 1).
- [x] Identify active unit counts → bytes 215–277 (63 bytes, 1 per unit type)
- [x] Identify unit casualty counts → bytes 278–340
- [x] Locate research progress → bytes 9–10
- [x] Locate acquired tech count → byte 17 (controls research cost + AI attitude)
- [x] Locate diplomatic reputation → byte 31
- [x] Locate attitudes → bytes 65–72 (8 entries including barbarians). **CORRECTED**: was 7 entries at bytes 66–72.
- [x] Locate first discoverer flags → bytes 115–214
- [x] Locate last contact turns → bytes 997–1010
- [x] Decode bytes 19–20 → byte 19 = unknown (always 0), byte 20 = science rate, byte 21 = tax rate. Confirmed via FoxAhead `TCiv` struct and sum validation across 1530 slots.
- [x] Decode bytes 23–32 → byte 23 = AI random seed (0–99, changes every turn), bytes 24–27 = small counters (FoxAhead `Unknown_17`), byte 28 = unused (always 0), bytes 29–30 = treaty-breaking count (cumulative violations, effectively uint8, byte 30 always 0), byte 31 = reputation, byte 32 = **patience** (AI negotiation patience counter, 0–6). Patience confirmed by axx0/Civ2-clone, Catfish's Cave, and TOTPP Lua `tribe.patience`.
- [x] Decode bytes 73–88, 101–102 → bytes 73–80 = treaty violations (signed int8[8], per-civ treaty-breaking tracker, 100% vendetta correlation), bytes 81–88 = diplomatic interaction counters (uint8[8], partially decoded — correlates with war/contact/game age), bytes 101–102 = tech bitmask overflow (`max(0, bitsSet − 80)`, 100% match across 1856 records).
- [x] Decode bytes 405–997 → per-continent statistics block (military power, land attack, city count, city sizes, flags, unit history, power graph data)
- [x] Decode bytes 1011–1428 → AI persona index (byte 1010), constant padding (1011–1021), spaceship data (1022–1029), zero padding (1030–1043), AI continent goals 64×6 bytes (1044–1427)
- [x] Determine what the city knowledge list at +64 actually represents → It is the start of the 8-byte attitudes array (bytes 65–72), not a separate city knowledge list. Byte 65 (Höfelt's +64) = attitude toward barbarians (always 100).
- [x] Decode bytes 107–108, 111–114 → naval unit count (uint16, count of sea-domain types 32–41), total unit atk+def sum (uint16, cumulative RULES.TXT attack+defense), total unit attack sum (uint16, cumulative RULES.TXT attack). All three are runtime-maintained counters. Confirmed via sequential save delta analysis (100% exact deltas) and cross-sectional correlation (r=0.997 for atk+def). Cross-sectional exact match rates (81.7% for attack sum, 96.4% for naval count) limited by dead unit slot recycling in save snapshots.
- [ ] Determine what the 32 extra bytes per civ in SAV vs SCN contain (likely unit/city ID tracking)
- [x] Fix treaty/attitude offset bug → treaties shifted from +31 to +32, attitudes from 7@+65 to 8@+64. Confirmed via FoxAhead `TCiv` struct (offsets 0x20 and 0x40) and validated across 232 saves.

> **CORRECTION**: Previous versions of this document described a variable-size "Extended Game Data" section (0 to ~93 KB) between per-civ data and the map header. This was based on an incorrect per-civ block size of 3,833 bytes. The actual per-civ block size is **1,428 bytes** (SAV/NET) or **1,396 bytes** (SCN), and the per-civ data blocks end immediately before the map header with no variable-size gap. The "extended data" observed in some saves was likely the per-civ data itself being misattributed.

##### Dead Unit Slot Recycling

Several per-civ fields (bytes 107–108, 109–110, 111–112, 113–114) are **runtime-maintained counters** — the game engine increments them when a unit is built and decrements them when a unit is lost. These counters are perfectly accurate during gameplay but cannot be exactly reconstructed from a save file snapshot due to **dead unit slot recycling**:

When a unit dies, its 32-byte record in the unit array is marked as dead but retains the original owner and type data. When *any* civ later builds a new unit, the engine reuses the lowest-numbered dead slot, overwriting the previous owner/type with the new unit's data. The save file only records the current occupant of each slot — the original owner's contribution to the per-civ counter is lost.

**Effect on cross-sectional analysis** (computing counters from a single save snapshot):

| Field | Match rate (all saves) | Match rate (no dead slots) | Explanation |
|-------|----------------------|--------------------------|-------------|
| `navalUnitCount` (+107–108) | 96.4% | 98.8% | Low noise — few naval units overall |
| `totalUnitAtkSum` (+113–114) | 81.7% | 87.5% | Moderate noise — each recycled slot adds/subtracts one attack value |
| `totalUnitAtkDefSum` (+111–112) | 37.1% | 45.8% | Higher noise — accumulates both atk+def per recycled slot |

**Sequential save analysis** (comparing consecutive turns) confirms 100% exact delta matches for all three counters, proving the formulas are correct despite the lower cross-sectional match rates.

##### Power Graph and Demographics Formulas

The Civ2 F-key demographics screen and the power graph use pre-cached per-civ values. Several of these are stored in the per-civ block:

| Demographic | Per-Civ Field | Byte(s) | Notes |
|-------------|--------------|---------|-------|
| Population | `sumOfCitySizes` | 109–110 | Direct sum of all city sizes |
| Military units | `militaryPower` | 103–104 | May be a count of military units (see naming discrepancy) |
| Cities | `cityCount` | 105–106 | Direct count |
| Naval forces | `navalUnitCount` | 107–108 | Count of sea-domain units |
| Military strength | `totalUnitAtkSum` | 113–114 | Sum of RULES.TXT attack values |
| Military (atk+def) | `totalUnitAtkDefSum` | 111–112 | Sum of RULES.TXT attack+defense |

**Power Graph formula** (confirmed by CivFanatics community testing):
```
Power = Population + (Techs / 2.67) + (Gold / 256)
```
Military units are NOT included in the power graph rating. Source: https://forums.civfanatics.com/threads/power-rating-vs-power-graph.463/

**Foreign Minister Power Rating** (F3 screen: Pathetic/Weak/Poor/Fair/Good/Excellent/Supreme) uses the **same formula** as the Power Graph. Military units are NOT included. Source: https://civilization.fandom.com/wiki/Diplomacy_(Civ2)

**Military Advisor Weapon Icons** (F3 screen) are a separate assessment from the power rating. The exact Civ2 formula is undocumented; the Civ3 analog is `(3A + 2D) × HP + B`. Community anecdotes suggest Civ2 uses approximately `2A + D` but this is unconfirmed. Source: https://forums.civfanatics.com/threads/military-advisor-relative-strength-assessment-definition.62980/

**Selected Demographics formulas** (confirmed by CivFanatics community testing):

| Demographic | Formula | Source |
|-------------|---------|--------|
| Military Service | `10 × (military units) / (total citizens)` | https://forums.civfanatics.com/threads/demographics.42324/ |
| Disease | `50 × (citizens+1) / (c1 + 2×c2 + 3×c3 + citizens + 1)` where c1/c2/c3 = pop in cities with 1/2/3 of {aqueduct, sewer, granary}. Pyramids count as granary; Medicine halves; Cure for Cancer halves again. | https://forums.civfanatics.com/threads/how-the-demographics-works.37033/ |
| GNP | Total uncorrupted gold production (1 gold = 1 million) | CivFanatics |
| Manufacturing Goods | Total unwasted shields (1 shield = 1 megaton) | CivFanatics |

Other demographics (crop yield, pollution, literacy, life expectancy, family size, approval rating) appear to be computed on-the-fly from city data rather than pre-cached in the per-civ block.

##### Cross-Reference Sources

The per-civ block has been cross-referenced against multiple independent sources. Fields confirmed by 2+ sources are marked with high confidence.

| Source | Type | Key Contribution | URL |
|--------|------|-----------------|-----|
| FoxAhead / Civ2-UI-Additions | Pascal DLL, TCiv struct | Authoritative in-memory layout; confirmed treaty offset, attitude count, field sizes | https://github.com/FoxAhead/Civ2-UI-Additions (`src/Civ2Types.pas`) |
| axx0 / Civ2-clone | C# reimplementation | Field names (`patience`, `numberMilitaryUnits`); save file reader | https://github.com/axx0/Civ2-clone |
| Catfish's Cave (ToT hex guide) | Documentation | ToT per-tribe field names; confirms patience, per-tribe reputation | https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm |
| TOTPP Lua API | Lua scripting interface | Exposes `tribe.patience`, `tribe.reputation[t]`, `tribe.betrayals` | https://profgarfield.github.io/auto_doc/tribeObject.html |
| Allard Höfelt hexedit.rtf v1.8 | Documentation (FW/MGE) | Original community reference; uses 1-indexed offsets. Known off-by-one error at treaty start. | Via https://github.com/tek10/civ2mod (`hexedit.rtf`) |
| CivFanatics forums | Community research | Treaty flag definitions, power graph formula, demographics formulas | https://forums.civfanatics.com/ |
| This project (statistical analysis) | Empirical analysis (232 saves) | Per-continent statistics, AI continent goals, runtime counters, treaty violations | `/tmp/findings_*.md` analysis scripts |

##### Naming Discrepancies Between Sources

| Byte(s) | This Document | FoxAhead | axx0/Civ2-clone | TOTPP Lua | Catfish's Cave (ToT) |
|---------|--------------|----------|----------------|-----------|---------------------|
| +22 | AI random seed | SenateChances | — | — | — |
| +31 | Reputation (betrayals) | Reputation | reputation (discarded) | tribe.betrayals | Reputation |
| +32 | Patience | Unknown_1F | patience (discarded) | tribe.patience | Patience |
| +73–80 | Treaty violations | (in Unknown9) | — | tribe.reputation[t] | Reputation with tribe 0–7 |
| +103–104 | Military power | (in Unknown9) | numberMilitaryUnits | — | Total number of military units |

**Notes on discrepancies:**
- **AI random seed / SenateChances** (+22): FoxAhead's name may derive from the memory offset context in the executable. Empirical analysis across 232 saves shows a uniform 0–99 distribution uncorrelated with government type, behaving as an AI PRNG.
- **Military power / numberMilitaryUnits** (+103–104): Multiple sources call this a "military unit count" rather than a power metric. Empirical verification comparing the stored value against actual military unit counts from the unit records would resolve this. The per-continent section A sums approximately equal this field.
- **Treaty violations / reputation** (+73–80): Catfish's Cave and TOTPP call these "per-tribe reputation" values. Our signed int8 analysis confirms the underlying mechanism: negative values track treaties this civ broke (100% vendetta correlation), positive values track treaties broken by the target. The concept is the same — bilateral diplomatic standing — but "treaty violations" more precisely describes the observed behavior.

##### Test of Time (ToT) → MGE Offset Mapping

The ToT per-tribe block is 3,348 bytes (vs MGE's 1,428). ToT inserts 8 unknown bytes at the start of each block (ToT offsets +2 to +9), shifting all subsequent fields by 8:

```
MGE_offset = ToT_offset − 8   (for approximately the first ~120 bytes)
```

| ToT Offset | MGE Offset | Field |
|-----------|-----------|-------|
| +0 | +0 | State flags |
| +1 | +1 | Gender |
| +2–9 | *(not present)* | ToT-only: 8 unknown bytes |
| +10–13 | +2–5 | Gold (int32) |
| +38 | +30 | Reputation (betrayals) |
| +39 | +31 | Patience |
| +40–71 | +32–63 | Treaties (32 bytes) |
| +72–79 | +64–71 | Attitudes (8 bytes) |
| +80–87 | +72–79 | Per-tribe reputation |
| +88–95 | +80–87 | Unknown (8 bytes) |
| +96–108 | +88–100 | Tech bitmask (13 bytes) |
| +110–111 | +102–103 | Military power / unit count |
| +112–113 | +104–105 | City count |
| +116–117 | +108–109 | Sum of city sizes |

**Warning**: The 8-byte shift applies cleanly to the first ~120 bytes. After that, the ToT format diverges significantly (3,348 vs 1,428 bytes), with ToT having additional fields for multiple maps, extended unit types (80 vs 63), and other expansions. Catfish's Cave labels for ToT offsets +110–123 ("Military Unit Count", "City Count", etc.) do NOT map directly to MGE offsets via the simple −8 formula.

#### Autosave Filename

The autosave produced when "Autosave each turn" is enabled is named `St_Auto.SAV`, saved to the game's installation directory.

### Section 4: Map Data (three blocks + padding)
The map data consists of a **fixed-position map header**, three contiguous data blocks, and a 1024-byte padding block. The map header offset depends on the file type:

| File Type | Map Header Offset | Source |
|-----------|------------------|--------|
| `.SAV`, `.NET`, `.HOT`, `.EML` | **13702** (0x3586) | civ2mod.c: `MAP_HEADER_OFFSET 13702` |
| `.SCN` | **13432** (0x3478) | 270 bytes earlier (14 preamble + 8×32 per-civ) |

#### Map Header (14 bytes)

Seven uint16 LE values (confirmed by civ2mod.c and hexedit.rtf):

| Relative Offset | Field | Example | Notes |
|--------|-------|---------|-------|
| +0 | `map_width2` | 80 | Map width × 2 (Civ2 doubled coordinate system). Actual tile columns = value / 2. |
| +2 | `map_height` | 50 | Map height in rows. |
| +4 | `map_size` | 2000 | Total tiles = (map_width2 / 2) × map_height. |
| +6 | `map_shape` | 0 | 0 = round (wraps horizontally), 1 = flat. |
| +8 | `map_seed` | 16388 | Random seed for map generation. Only 64 patterns exist (Höfelt). Used for resource placement: `s = seed % 64`, then `s & 3` and `(s >> 2) & 3` give the 4×4 grid position for special resource 1; special 2 is offset by (+2, +2). See Layer 8: Resource/Special Icons. |
| +10 | `quarter_width` | 20 | ⌈map_width2 / 4⌉, rounded up. Used for Block 3 dimensions. |
| +12 | `quarter_height` | 13 | ⌈map_height / 4⌉, rounded up. Used for Block 3 dimensions. |

**Validation**: `map_size` must equal `(map_width2 / 2) × map_height`. If not, the header read is at the wrong offset.

**Relationship to file header (offset 0x0A/0x0C):** The file header contains different map dimension values than this map header. The file header value at 0x0A equals approximately `map_width2 / 2 + 4`; the "+4" is unexplained. The file header height at 0x0C has no obvious arithmetic relationship to `map_height`. **⚠️ Always use this map header for tile data calculations. Using the file header values produces completely wrong offsets and a garbled map.** See the Debugging Guide in Common Pitfalls for a detailed symptom→cause table.

#### Block 1: Per-Civ Known Improvements (offset = map_header + 14, size = `map_size × 7`)

Starts immediately after the map header. Contains 7 sections of `map_size` bytes each — one section per non-barbarian civilization. Each byte in a section encodes the tile improvements that civilization has last observed for that tile:

| Bit | Improvement |
|-----|-------------|
| 0x01 | Unit present |
| 0x02 | City present |
| 0x04 | Irrigation |
| 0x08 | Mining |
| 0x10 | Road |
| 0x20 | Railroad (upgrade over road) |
| 0x40 | Fortress |
| 0x80 | Pollution |

Farmland = irrigation + mining (both bits set). Airbase = fortress + city present (explains the airbase "bugs": extra food from city-square treatment, acts as railroad like a city). In Test of Time, transport sites are marked with pollution + city present. Undiscovered tiles are `0x00`.

Note: All cities, including unknown ones, are marked in these blocks. Undiscovered cities generally lack the "unit present" flag. A city that was never discovered and has since been destroyed remains on the civ's map until the area is re-explored. Enemy units lost from sight remain at their last seen location until new intelligence is gathered.

#### Block 2: Terrain Data (offset = `block1_offset + map_size × 7`, size = `map_size × 6`)

**This is the actual map data.** Each tile is a 6-byte record. The block offset is calculated as:

```
block1_offset = MAP_HEADER_OFFSET + 14
block2_offset = block1_offset + (map_size * 7)
```

From civ2mod.c: `map_block2_offset = MAP_DATA_OFFSET + (mapSize * 7)`

**Tile coordinate → file offset** (confirmed from civ2mod.c `getMapItem()`, line 356):

```python
# Convert isometric (x, y) coordinate to Block 2 tile record offset
# x is doubled-coordinate (0 to map_width2-1), y is row (0 to map_height-1)
tile_index = (y * map_width) + (x // 2)    # map_width = map_width2 / 2
tile_offset = block2_offset + (tile_index * 6) + byte_number  # byte 0-5
```

**Map wrapping behavior** (confirmed from civ2mod.c `setMapItemVisible()`, line 602):

- **X axis wraps**: if x < 0, add `map_width2`; if x ≥ `map_width2`, subtract `map_width2`
- **Y axis does NOT wrap**: if y < 0 or y ≥ `map_height`, the coordinate is out of bounds (skipped)

This means the map is a cylinder: wrapping horizontally but clipped at the top and bottom poles.

##### Tile Record Structure (6 bytes per tile)

| Byte | Field | Encoding |
|------|-------|----------|
| 0 | **Terrain type + flags** | Low nibble (`& 0x0F`): terrain ID (0–10). **Bit 7 (0x80)**: **river present** on this tile (confirmed by hexedit.rtf and empirical testing across multiple saves — river direction is computed at render time from neighbor analysis, see Rendering Pipeline). **Bit 6 (0x40)**: "no resource" — prevents the tile from displaying a special resource even when one would normally appear. **Bit 5 (0x20)**: terrain resource animation (Test of Time only, unused in MGE). |
| 1 | **Tile improvements** | Same encoding as Block 1 improvement flags: bit 0 (0x01) = unit present, bit 1 (0x02) = city present, bit 2 (0x04) = irrigation, bit 3 (0x08) = mining, bit 4 (0x10) = road, bit 5 (0x20) = railroad (upgrade over road), bit 6 (0x40) = fortress, bit 7 (0x80) = pollution. Farmland = irrigation + mining. Airbase = fortress + city present. |
| 2 | **City radius owner** | Bits 5–7 encode which civ's city radius claims this tile: `civ_id = (byte >> 5) & 7`. **Confirmed by direct cross-reference**: every civ's city tile has exactly its civ ID encoded here. `0x00` = unclaimed, `0x20` = civ 1, `0x40` = civ 2, `0x60` = civ 3, `0x80` = civ 4, `0xA0` = civ 5, `0xC0` = civ 6, `0xE0` = civ 7. Low 5 bits are **always zero** (verified across all 2,000 tiles). Territory counts: civ 5 = 453 tiles, civ 2 = 160, civ 3 = 105, civ 1 = 40, civ 4 = 16, unclaimed = 1,226. |
| 3 | **Continent/body ID** | Each contiguous body of land or water gets a unique number. Counting starts at the top-left corner and proceeds left-to-right, top-to-bottom. Land and water counters start independently at 1. Water bodies of fewer than 9 tiles always get number 63 but still count toward the total. The body ID is displayed in-game when right-clicking a tile (the third number in `Loc: (X, Y) N`). |
| 4 | **Visibility bitmask** | Per-civ exploration flags. Bit 0 = Red (Barbarians), bit 1 = White (civ 1), bit 2 = Green (civ 2), bit 3 = Blue (civ 3), bit 4 = Yellow (civ 4), bit 5 = Cyan (civ 5), bit 6 = Orange (civ 6), bit 7 = Purple (civ 7). `0x00` = no civilization has explored this tile. |
| 5 | **Ownership + fertility** | **High nibble (`>> 4`)**: tile ownership. `0x0`=Barbarians (Red), `0x1`=White, `0x2`=Green, `0x3`=Blue, `0x4`=Yellow, `0x5`=Cyan, `0x6`=Orange, `0x7`=Purple, `0xF`=no owner. Used for airbase color display, and only tiles with owner value 0 (barbarian/none) can have goody huts. **Low nibble (`& 0x0F`)**: AI fertility score (0–15). `0` = infertile, `15` = most fertile (AI builds a city immediately). Only Plains and Grassland get non-zero initial values; other terrains start at 0 but can increase from improvements. AI only builds cities on tiles with fertility > 7. Fertility within existing city radii is reduced to discourage overlapping settlements. Rivers, resources, farmland, mining, irrigation, and roads may increase fertility. |

> **Höfelt alignment check:** Höfelt's documentation is correct for all 6 bytes. Byte[0]: terrain type (low nibble) confirmed; **Höfelt is correct** that bit 7 = river and bit 6 = no resource. Our earlier analysis incorrectly attributed bit 7 to "resource/shield bonus" and placed rivers in byte[1] bits 0–3; empirical testing across multiple saves (ROMAN, STUBEAR) confirms Höfelt: **byte[0] bit 7 = river**, byte[0] bit 6 = no resource. Rivers have no directional data stored per-tile — direction is computed at render time from neighbor analysis (see Rendering Pipeline section). Byte[1]: improvements confirmed (same encoding as Block 1: bit0=unit, bit1=city, bit2=irrigation, bit3=mining, bit4=road, bit5=railroad, bit6=fortress, bit7=pollution). Byte[2]: city radius confirmed (`civ = byte >> 5`). Byte[3]: body counter confirmed (body 63 for small water < 9 tiles). Byte[4]: visibility confirmed (per-civ bit mapping). Byte[5]: ownership (high nibble) + fertility (low nibble) confirmed.

> **civ2mod.c algorithm confirmation (ownership modification):** The `setContinentOwner()` function at line 403 modifies byte[5] ownership by clearing bits 4-7 (`setbitoff` on bits 4,5,6,7) then adding `newOwner * 16`. This definitively confirms: **high nibble = ownership** (bits 4-7), **low nibble = fertility** (bits 0-3, preserved during ownership change).

##### Visibility Radius Patterns (from civ2mod.c)

The `addToVisibilityMap()` function (line 563) reveals the exact tile offsets used for visibility rings in the isometric coordinate system:

```
Radius 0 (1 tile):   center only
Radius 1 (9 tiles):  center + (-1,-1) (+1,-1) (+1,+1) (-1,+1) (0,-2) (0,+2) (+2,0) (-2,0)
Radius 2 (21 tiles): radius 1 + (-1,-3) (+1,-3) (-2,-2) (+2,-2) (-3,-1) (+3,-1)
                                  (-3,+1) (+3,+1) (-2,+2) (+2,+2) (-1,+3) (+1,+3)
```

In the civ2mod.c code: cities call `addCityToVisibilityMap()` with radius 3, but the function body only implements up to radius 2 (21 tiles). Units on ocean call with radius 1 (9 tiles). These coordinates use the doubled-X isometric system, where each (dx, dy) step represents one tile in the diamond grid.

#### Block 3: Quarter-Resolution Data (offset = Block 2 end, size = `quarter_width × quarter_height × 2`)

Purpose unclear. Höfelt: "This section seems to be entirely pointless. Even more so because in Test of Time there's only ever one third block." Two parts with structure roughly similar to the map at quarter resolution.

#### 1024-Byte Padding

Located between Block 3 and the unit section. Höfelt: "almost certainly nothing to do with the map." In ToT this is 10,240 bytes.

#### Section Navigation Formula (civ2mod.c algorithm)

The complete formula to navigate from the map header to every subsequent section:

```
map_header      = 13702                                    # Fixed
map_width2      = uint16 at 13702
map_height      = uint16 at MAP_HEADER_OFFSET + 2
map_size        = uint16 at MAP_HEADER_OFFSET + 4            # = map_width2/2 * map_height
quarter_width   = uint16 at MAP_HEADER_OFFSET + 10
quarter_height  = uint16 at MAP_HEADER_OFFSET + 12

block1_offset   = MAP_HEADER_OFFSET + 14
block2_offset   = block1_offset + map_size * 7               # Terrain data
block3_offset   = block2_offset + map_size * 6
unit_offset     = block3_offset + quarter_width * quarter_height * 2 + 1024
city_offset     = unit_offset + total_units * UNIT_RECORD_SIZE
```

This matches the civ2mod.c navigation exactly. The city section calculated this way agrees with the end-of-file method (`EOF - tail_size - 32 - num_cities * CITY_RECORD_SIZE`).

#### Terrain Type IDs

| ID | Terrain | ID | Terrain |
|----|---------|----|---------|
| 0 | Desert | 6 | Tundra |
| 1 | Plains | 7 | Glacier |
| 2 | Grassland | 8 | Swamp |
| 3 | Forest | 9 | Jungle |
| 4 | Hills | 10 | Ocean |
| 5 | Mountains | | |

#### Territory / Visibility (Byte 4) — Key Finding

**This is the most important byte for territory visualization.** It is a bitmask where each bit represents one civilization slot:

```
Bit 0 (0x01) = Barbarians (Red)
Bit 1 (0x02) = White (civ 1)
Bit 2 (0x04) = Green (civ 2)
Bit 3 (0x08) = Blue (civ 3)
Bit 4 (0x10) = Yellow (civ 4)
Bit 5 (0x20) = Cyan (civ 5)
Bit 6 (0x40) = Orange (civ 6)
Bit 7 (0x80) = Purple (civ 7)
```

The minimap colors each tile by the **highest bit set** — i.e., the last civ to explore it.

For ocean tiles, multiple bits are commonly set (e.g., `0b00111111` = 63, meaning all 6 civs have sailed there).

##### TODO: Map Data Remaining Unknowns
- [x] Three-block structure confirmed (Höfelt, civ2mod.c)
- [x] All 6 tile bytes decoded and verified against binary data (Session 12)
- [x] Block offset formula confirmed (civ2mod.c)
- [x] Byte[0] bit 7 corrected: **river flag** per hexedit.rtf (Session 12 incorrectly called it resource/shield; corrected after empirical testing)
- [x] Byte[1] fully decoded: bits 0–3 = river directions, bit 4 = road, bit 6 = railroad (Session 12)
- [x] Byte[2] formula confirmed: civ_id = (byte >> 5) & 7, low 5 bits always zero (Session 12)
- [x] Byte[4] per-civ bit mapping verified: bit N = civ N visibility (Session 12)
- [ ] City flags rendering: document exact rules for when per-civ flag sprites (CITIES.GIF y=425, 14×22px) are drawn on cities. Civ2-clone draws them when cities contain units (`tile.UnitsHere.Count > 0`). Need to verify: (a) flags on all garrisoned cities vs only occupied/resistance cities, (b) exact position on city sprite (Civ2-clone uses per-sprite `FlagLoc`), (c) whether row 0 vs row 1 (y=425 vs y=448) are light/dark variants or represent different states (e.g., normal vs occupied).
- [ ] Block 3 purpose — verify whether it has any gameplay effect
- [ ] Determine if the 1024-byte padding block contains any meaningful data
- [ ] Byte[5] high nibble: confirm if values 1–5 are overlay variant indices for TERRAIN2.GIF
- [ ] Byte[1] bits 0–3: verify exact river direction mapping (NE/SE/SW/NW assignment)
- [ ] **RENDERING**: Byte[1] bit 0 "unit present" flag — the doc notes this flag gates unit visibility, but the renderer ignores it. Determine whether the game engine uses this flag to control unit sprite rendering and how it interacts with FOW.
- [ ] **RENDERING**: Byte[5] high nibble "tile ownership" — documented as "used for airbase color display." Determine how airbase sprite color changes per tile owner (recoloring? variant selection? overlay?). Currently renderer draws a single airbase sprite with no per-owner coloring.

### Isometric Coordinate System

Civ2 uses an **isometric diamond grid** with a doubled X coordinate system:

- The map data header at offset 13702 defines the grid: `map_width2` (doubled width) and `map_height`. Actual tile columns per row = `map_width2 / 2` (e.g., 80/2 = 40).
- **Even rows** (0, 2, 4, ...) have tiles at even X positions: 0, 2, 4, ..., `map_width2 − 2`
- **Odd rows** (1, 3, 5, ...) have tiles at odd X positions: 1, 3, 5, ..., `map_width2 − 1`
- Each row stores `map_width2 / 2` tiles sequentially in the tile data blocks.
- Tile index in Block 2: `index = row × (map_width2 / 2) + col_within_row`
- City X coordinates (from city records at +0) range from 0 to `map_width2 − 1` (0–79 for an 80-wide doubled coordinate map).
- City Y coordinates (from city records at +2) range from 0 to `map_height − 1` (0–49 for a 50-tall map).
- To convert city coordinates to grid position: `grid_x = city_x // 2`, `grid_y = city_y`.
- **The map wraps horizontally.** Apply `grid_x % (map_width2 // 2)` when needed.

For rendering, each tile is a **diamond** shape. Odd rows are offset horizontally by half a tile width. See the rendering algorithm below.

> **⚠️ Do NOT use the file header values at 0x0A/0x0C (e.g., 44×63) for coordinate math. Use the map header at offset 13702.**

#### Map Rendering Algorithm (Validated Against Game Screenshot)

The following algorithm produces a map render that matches the actual Civ2 game display. It was validated by comparing the output against a cheat-mode zoomed-out screenshot of the same save file, confirming correct terrain, city positions, continent shapes, and ocean layout.

##### Step 1: Read Map Header

```python
# Determine map header offset based on file type
if file_extension == '.SCN':
    MAP_HEADER_OFFSET = 13432
else:
    MAP_HEADER_OFFSET = 13702     # SAV, NET, HOT, EML

map_width2      = uint16_le(data, MAP_HEADER_OFFSET + 0)    # Width × 2 (doubled coordinate system)
map_height      = uint16_le(data, MAP_HEADER_OFFSET + 2)    # Height in rows
map_size        = uint16_le(data, MAP_HEADER_OFFSET + 4)    # Total tiles
quarter_width   = uint16_le(data, MAP_HEADER_OFFSET + 10)   # For Block 3 size calculation
quarter_height  = uint16_le(data, MAP_HEADER_OFFSET + 12)   # For Block 3 size calculation

map_width = map_width2 // 2                # Actual tile columns per row

# Validate: map_size must equal map_width * map_height
assert map_size == map_width * map_height
```

##### Step 2: Calculate Block 2 Offset (terrain data)

```python
block1_offset = MAP_HEADER_OFFSET + 14
block2_offset = block1_offset + (map_size * 7)     # Skip Block 1 (per-civ improvements)
```

Block 1 is 7 sections of `map_size` bytes each (one per non-barbarian civ, containing known tile improvements). This is the most common source of errors — reading Block 1 instead of Block 2 produces garbage terrain.

##### Step 3: Read Terrain for Each Tile

Tiles are stored row by row, `map_width` tiles per row. For tile at grid position (grid_x, grid_y):

```python
tile_index = grid_y * map_width + grid_x
tile_offset = block2_offset + tile_index * 6

terrain_id = data[tile_offset] & 0x0F      # 0=Desert ... 10=Ocean
has_river  = bool(data[tile_offset] & 0x80)
```

##### Step 4: Convert City Coordinates to Grid Position

City coordinates use the doubled X system. Convert to grid position for rendering:

```python
# City record: X at +0, Y at +2 (uint16 LE), Name at +32
city_x = uint16_le(data, city_offset + 0)   # Doubled coordinate (0 to map_width2-1)
city_y = uint16_le(data, city_offset + 2)   # Row (0 to map_height-1)

grid_x = city_x // 2                        # Grid column (0 to map_width-1)
grid_y = city_y                              # Grid row (unchanged)
```

##### Step 5: Render Isometric Diamond Grid

Each tile is rendered as a diamond. Odd rows are offset horizontally by half a tile width:

```python
TILE_W = 32    # Diamond width in pixels
TILE_H = 16    # Diamond height in pixels

for y in range(map_height):
    for x in range(map_width):
        # Isometric pixel position
        x_pixel_offset = (TILE_W // 2) if (y % 2 == 1) else 0
        px = x * TILE_W + x_pixel_offset
        py = y * (TILE_H // 2)

        # Diamond vertices
        center_x = px + TILE_W // 2
        center_y = py + TILE_H // 2
        diamond = [
            (center_x, py),                    # top
            (px + TILE_W, center_y),           # right
            (center_x, py + TILE_H),           # bottom
            (px, center_y),                    # left
        ]
        draw_polygon(diamond, fill=terrain_color[terrain_id])
```

##### Step 6: Apply Horizontal Wrapping (camera offset)

The game view wraps horizontally. To match a specific camera position (e.g., from a screenshot), apply a column offset:

```python
camera_x_start = 34   # In doubled coordinates; adjust to match desired view

for vis_col in range(map_width):
    actual_grid_x = (vis_col + camera_x_start // 2) % map_width
    # Read tile at (actual_grid_x, y) but render at visual column vis_col
```

##### Step 7: Navigate to City Section

To find city records, chain the offset calculations forward from the map header:

```python
total_units  = uint16_le(data, 0x003A)     # Header offset 0x003A
total_cities = uint16_le(data, 0x003C)     # Header offset 0x003C

block3_offset = block2_offset + map_size * 6
unit_offset   = block3_offset + quarter_width * quarter_height * 2 + 1024

# Record sizes depend on file type
if file_extension == '.SCN':
    unit_record_size = 26
    city_record_size = 84
else:
    unit_record_size = 32      # SAV/NET/HOT/EML
    city_record_size = 88

city_offset = unit_offset + total_units * unit_record_size

# Each city: X at +0, Y at +2, Owner at +8, Name at +32
for i in range(total_cities):
    record = city_offset + i * city_record_size
    cx = uint16_le(data, record + 0)
    cy = uint16_le(data, record + 2)
    owner = data[record + 8]
    name = null_terminated_string(data, record + 32, 16)
```

##### Terrain Color Palette

Approximate RGB values matching the Civ2 game palette:

| ID | Terrain | RGB |
|----|---------|-----|
| 0 | Desert | (210, 180, 100) |
| 1 | Plains | (170, 155, 75) |
| 2 | Grassland | (80, 145, 50) |
| 3 | Forest | (30, 105, 30) |
| 4 | Hills | (155, 125, 75) |
| 5 | Mountains | (170, 160, 150) |
| 6 | Tundra | (175, 190, 200) |
| 7 | Glacier | (230, 240, 250) |
| 8 | Swamp | (50, 85, 65) |
| 9 | Jungle | (20, 70, 20) |
| 10 | Ocean | (40, 60, 155) |

##### Civilization Colors

| Slot | Color | RGB |
|------|-------|-----|
| 0 | Red (Barbarians) | (200, 0, 0) |
| 1 | White | (255, 255, 255) |
| 2 | Green | (0, 180, 0) |
| 3 | Blue | (50, 80, 220) |
| 4 | Yellow | (240, 220, 0) |
| 5 | Cyan | (0, 200, 200) |
| 6 | Orange | (240, 140, 0) |
| 7 | Purple | (180, 0, 200) |

##### Common Pitfalls

1. **Reading Block 1 instead of Block 2**: Block 1 (per-civ improvements) starts immediately after the map header. Block 2 (actual terrain) starts at `block1_offset + map_size * 7`. Forgetting to skip Block 1 is the most common error.

2. **City name at +0 vs +32**: The city record starts with XY coordinates, not the name. The name is at offset +32 within the record. (civ2mod.c: `CITY_ITEM_NAME_OFFSET 32`.)

3. **Doubled coordinate system**: City X coordinates are in the doubled system (0 to `map_width2 - 1`). Divide by 2 to get the grid column. Even rows use even X, odd rows use odd X.

4. **Isometric stagger**: Odd rows must be shifted right by half a tile width when rendering. Without this offset, the map appears as a rectangular grid instead of the correct diamond pattern.

5. **Horizontal wrapping**: The map wraps. Cities near X=0 or X=map_width2 may appear on the opposite edge of the display. Apply modular arithmetic: `grid_x % map_width`.

6. **Tile byte 3 vs byte 4**: Old community docs sometimes had these swapped. Byte 3 is the land/sea body counter; byte 4 is the visibility bitmask. civ2mod.c confirms: `MAP_ITEM_COUNTER 3`, `MAP_ITEM_VISIBILITY 4`.

7. **Two different dimension sources — file header vs. map header**: The file begins with a `CIVILIZE` header containing map width (offset 0x0A) and height (0x0C). These values (e.g., 44×63) are **completely different** from the map data header at offset 13702 (e.g., 80×50 → 40-column × 50-row grid). If you use the file header dimensions:
   - You calculate `total_tiles = 22 × 63 = 1,386` instead of the correct `2,000`
   - You calculate `block2_offset` with the wrong `map_size`, landing inside Block 1
   - You read data ~4,300 bytes too early — likely still inside Block 1 (per-civ improvements), which is mostly zeros
   - Zeros in byte[0] decode as terrain ID 0 (Desert), producing a map that is ~96% desert
   - City coordinate-to-tile mapping uses wrong grid width, placing many cities on ocean
   - The resulting map has wrong continent shapes, wrong terrain, and cities in the water

   **This is the #1 most catastrophic error and the hardest to debug**, because the wrong data can still look superficially plausible (valid terrain IDs, some non-zero values). The correct source for all map dimensions is **always** offset 13702.

8. **Validating terrain reads — the "cities on ocean" test**: After reading terrain, verify that no alive city (size > 0) sits on an ocean tile. For a correctly parsed map, the count should be exactly zero. If any alive city maps to ocean, either the block offset, the terrain byte, or the coordinate mapping is wrong. This is the single most reliable validation check.

9. **Terrain distribution sanity check**: A correctly parsed standard Civ2 map should show roughly 40–55% ocean, with the remaining land distributed across multiple terrain types (no single land type exceeding ~15%). If you see >80% of any terrain type (especially Desert), you are reading the wrong block or the wrong byte within the block.

##### Debugging Guide: Symptom → Root Cause

This section documents failure modes discovered through extensive debugging. If your render doesn't match the game, consult this table first.

| Symptom | Most Likely Root Cause | Fix |
|---------|----------------------|-----|
| Map is ~96% Desert (terrain ID 0) | Reading Block 1 instead of Block 2. Block 1 is per-civ known improvements; undiscovered tiles are `0x00`, which looks like terrain ID 0 (Desert). | Recalculate `block2_offset = MAP_HEADER_OFFSET + 14 + (map_size * 7)` using `map_size` from the map header. |
| Map is ~96% Desert AND `map_size` seems wrong | Using file header dimensions (0x0A/0x0C) instead of the map data header. The wrong map_size produces a wrong Block 2 offset that lands inside Block 1. | Read `map_size` from the map data header (offset 13702 for SAV/NET, 13432 for SCN), NOT from the file header. |
| Terrain distribution looks realistic (~45-55% ocean) but many cities are on ocean tiles | Block 2 offset is close but not exact, OR you're reading the right block but using wrong map dimensions for coordinate-to-tile conversion. Coincidentally plausible distributions can occur at slightly wrong offsets. | Verify `block2_offset` arithmetic. Verify `grid_x = city_x // 2` uses `map_width = map_width2 // 2` from offset 13702. |
| City names and owners are correct, positions are spatially wrong | City record format is correctly parsed (name at +32, coords at +0/+2), but coordinate-to-grid mapping uses wrong map width. | Use `map_width = uint16(offset 13702) // 2` for grid conversion, not file header width. |
| Continent shapes don't match game screenshot | Wrong tile block. Even a few hundred bytes of offset error produces completely different continent shapes. | Double-check: `block2_offset = MAP_HEADER_OFFSET + 14 + (map_size * 7)` with `map_size` from the map header. Cross-validate by checking terrain under known city positions. |
| Ocean appears where land should be (spotty, not systematic) | Possible byte-swap within tile record — reading byte[4] (visibility bitmask) instead of byte[0] (terrain). Visibility bytes can contain `0x0A`-like values. | Terrain is byte[0] & 0x0F in Block 2 tile records. Byte[4] is visibility, byte[3] is body counter. |
| Many tiles show as "unknown terrain" (IDs > 10) | Reading the wrong byte, or at a misaligned offset. All 6-byte tile records in Block 2 should have byte[0] & 0x0F ≤ 10. | If you find IDs > 10, you are NOT reading Block 2 terrain. Recalculate offset. |

##### Implementation Validation Checklist

After parsing the save file, run these checks before attempting a render. If any check fails, **stop and fix the underlying issue** before proceeding — rendering with wrong data wastes time and produces misleading output.

1. **Map header consistency**: `map_size` at offset 13706 must equal `(map_width2 // 2) × map_height`. If not, the header read is wrong.

2. **Terrain distribution**: Count terrain IDs across all `map_size` tiles in Block 2. Expect: Ocean 40–55%, no single land terrain > 15%, at least 7 of 11 terrain types present. If Desert > 30%, you are likely reading Block 1.

3. **Cities on land**: For every alive city (size > 0), convert its coordinates to a grid position and read the terrain at that tile. Expect: zero cities on ocean (terrain 10). If even 1 alive city maps to ocean, the coordinate mapping or block offset is wrong.

4. **Parity check**: City X coordinates must have the same parity as the Y coordinate (even X on even rows, odd X on odd rows). If any city violates this, the coordinate read is wrong.

5. **Coordinate ranges**: All city X values should be 0 to `map_width2 - 1`, all Y values should be 0 to `map_height - 1`. Out-of-range values indicate wrong record structure.

6. **Cross-validation**: The city block can be located two independent ways:
   - Forward: `city_offset = unit_offset + total_units × 32` (chaining from map header)
   - Backward: `city_offset = file_size - tail_size - (num_cities × 88)`
   These must agree. If they differ, one of the intermediate calculations is wrong.

##### Correct Rendering Pipeline (Summary)

For an AI or human implementing a Civ2 save renderer from scratch, follow this exact sequence. Do NOT skip steps or substitute values from the file header.

```
1. OPEN the .sav file as binary data.

2. READ map header at FIXED offset 13702:
     map_width2     = uint16_le(data, 13702)     # e.g., 80
     map_height     = uint16_le(data, 13704)     # e.g., 50
     map_size       = uint16_le(data, 13706)     # e.g., 2000
     quarter_width  = uint16_le(data, 13712)     # e.g., 20
     quarter_height = uint16_le(data, 13714)     # e.g., 13

     map_width = map_width2 // 2                  # Actual tile columns: 40

3. VERIFY: map_size == map_width * map_height     # 40 × 50 = 2000 ✓

4. CALCULATE Block 2 offset (terrain data):
     block1_offset = MAP_HEADER_OFFSET + 14
     block2_offset = block1_offset + (map_size * 7)

5. READ terrain for each tile:
     for y in range(map_height):
         for x in range(map_width):
             idx = y * map_width + x
             off = block2_offset + idx * 6
             terrain_id = data[off] & 0x0F        # 0=Desert...10=Ocean
             has_river  = bool(data[off] & 0x80)

6. VALIDATE: check terrain distribution and cities-on-land (see checklist above).

7. LOCATE cities by chaining forward:
     total_units  = uint16_le(data, 58)
     total_cities = uint16_le(data, 60)
     block3_off   = block2_offset + map_size * 6
     unit_offset  = block3_off + quarter_width * quarter_height * 2 + 1024
     city_offset  = unit_offset + total_units * 32

8. READ city records (88 bytes each):
     city_x = uint16_le(data, city_offset + i*88 + 0)  # Doubled coordinate
     city_y = uint16_le(data, city_offset + i*88 + 2)
     grid_x = city_x // 2                                # Grid column
     grid_y = city_y                                      # Grid row
     owner  = data[city_offset + i*88 + 8]
     size   = data[city_offset + i*88 + 9]
     name   = null_terminated(data, city_offset + i*88 + 32, 16)

9. RENDER isometric diamond grid:
     TILE_W, TILE_H = 32, 16   # or 48×24, 64×32 depending on desired resolution
     for y in range(map_height):
         for x in range(map_width):
             x_offset = (TILE_W // 2) if (y % 2 == 1) else 0
             px = x * TILE_W + x_offset
             py = y * (TILE_H // 2)
             # Draw diamond at (px, py) with terrain color/sprite

10. APPLY camera offset for wrapping (optional):
      To match a specific game view, shift all x reads by a column offset:
      actual_x = (visual_x + camera_col_offset) % map_width
```

##### What the File Header Values (0x0A, 0x0C) Are For

The file header's width (0x0A) and height (0x0C) are read by the game engine during file loading but serve a **different purpose** than the map data header. Hypotheses:

1. **Map generator nominal size**: These may be the "Earth-like", "Random small", etc. template dimensions that the map generator used as a starting point, before the actual tile grid was finalized.

2. **Legacy format compatibility**: Civ2 evolved through multiple versions (Classic → Conflicts in Civilization → Fantastic Worlds → MGE). These fields may be vestigial from an earlier format where the file header dimensions matched the tile grid.

3. **Display/UI parameters**: The game UI (minimap, scrolling bounds) might use these values independently of the tile data dimensions.

Regardless of their purpose, **they must not be used for tile data parsing.** The authoritative dimensions live at offset 13702.

### Section 5: Unit Records

Located between the tile data and city records. The total number of units is stored at header offset `0x003A`. The record size depends on file type:

| File Type | Record Size | Notes |
|-----------|------------|-------|
| SAV / NET / HOT / EML | **32 bytes** | 26 core bytes + 6-byte trailer (unique unit ID + padding) |
| SCN | **26 bytes** | Core record only, no unit ID trailer |

The first 26 bytes of each record are **identical** between SAV and SCN files. SAV/NET files append 6 extra bytes per unit: a **unit sequence ID** (uint16 LE) at offset +26, followed by 4 bytes of zero padding (`0x00000000`). This ID is a globally unique counter assigned at unit creation and never reused — gaps in the sequence indicate destroyed units.

> **CORRECTION**: There is NO 32-byte bridge record between units and cities. Cities start immediately after units. A 32-byte record of unknown purpose exists between the END of city records and the START of the tail section.

**Calculating the unit block position**:
```
# FORWARD CHAIN (preferred):
unit_offset   = MAP_HEADER_OFFSET + 14 + map_size*7 + map_size*6 + qw*qh*2 + 1024
city_offset   = unit_offset + total_units * unit_record_size   # NO bridge gap!
tail_offset   = city_offset + total_cities * city_record_size + 32   # 32-byte gap before tail

# BACKWARD CHAIN (for SAV/NET):
tail_start       = file_size - tail_size
city_block_end   = tail_start - 32                     # 32 bytes before tail
city_block_start = city_block_end - (num_cities × city_record_size)
unit_block_end   = city_block_start
unit_block_start = unit_block_end - (num_units × unit_record_size)
```

#### Unit Record Structure (26 core bytes; 32 bytes in SAV/NET)

All offsets are 0-indexed from the start of each unit record. Höfelt uses 1-indexed byte numbers (FW convention), so Höfelt byte N = offset +(N-1).

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 2 bytes | **X coordinate** (int16 LE) | Doubled-coordinate X (0 to `map_width2 − 1`). Höfelt bytes 1-2. Dead/destroyed units get incorrect coordinate values depending on where they were killed. Unit is invisible if moved unless the terrain tile has the "contains unit" flag set in Block 1. |
| +2 | 2 bytes | **Y coordinate** (int16 LE) | Y coordinate (0 to `map_height − 1`). Höfelt bytes 3-4. |
| +4 | 1 byte | **Movement flags** | Höfelt byte 5 (1st byte of a 2-byte pair). Bitmask: bit 6 = set on first move (remains set permanently), bit 4 = paratrooper launched this turn, bit 1 = unit is immobile. |
| +5 | 1 byte | **Status flags** | Höfelt byte 6 (2nd byte of pair). Bitmask: bit 7 = automate (not just settlers!), bit 6 = unit is "waiting" (W key pressed), bit 5 = **veteran status** (+50% combat). |
| +6 | 1 byte | **Unit type** | Höfelt byte 7. Index into RULES.TXT `@UNITS` section (0=Settlers, 1=Engineers, etc.). Maps to UNITS.GIF: `row = type_id / 9`, `col = type_id % 9`. |
| +7 | 1 byte | **Owner civ slot** | Höfelt byte 8. Which civilization owns this unit (0–7, 0=Barbarians). |
| +8 | 1 byte | **Movement points remaining** | Höfelt byte 9. Multiplied by road move multiplier from RULES.TXT `@COSMIC`, except for "Alpine" units which ignore the multiplier. |
| +9 | 1 byte | **Visibility bitmask** | Höfelt byte 10. Which civs can see this unit. Bit 0 = barbarians, bit 1 = civ 1, etc. The corresponding unit flag in map Block 1 must also be set for the unit to display on that civ's map. |
| +10 | 1 byte | **Hit points lost** | Höfelt byte 11. Damage taken (NOT remaining HP). Subtract from max HP (from RULES.TXT) to get current HP. |
| +11 | 1 byte | **Last direction moved** | Höfelt byte 12. 0=NE, 1=E, 2=SE, 3=S, 4=SW, 5=W, 6=NW, 7=N. `0xFF` = not moved yet. Used by the pathfinder for goto route calculation. |
| +12 | 1 byte | **AI task / role** | Höfelt byte 13. Two 4-bit fields: low nibble = unknown, high nibble = AI-assigned task (displayed on unit shield when map is fully revealed via cheat). Known high values: 2=build city, 9=explore. Value `0x58` appears as standard for human-controlled units. AI reassigns tasks each turn. |
| +13 | 1 byte | **Cargo / work / fuel** | Höfelt byte 14. Overloaded field: for **Caravans** = commodity being carried (0x00=Hides, 0x01=Wool, ..., 0x0A=Uranium; 0xF0=food supply; ≥0x80=food supply). For **Settlers** = turns of work completed on current improvement. For **air units** = turns spent in air (fuel counter). |
| +14 | 1 byte | **Alive status** | Höfelt byte 15. `0x00` = unit alive. Other values = unit dead/destroyed. General use unclear but appears to function as alive/dead indicator. |
| +15 | 1 byte | **Orders** | Höfelt byte 16. `0x01`=fortify (ordered, not yet fortified), `0x02`=fortified, `0x03`=sleep/sentry, `0x04`=build fortress, `0x05`=build road/railroad, `0x06`=build irrigation, `0x07`=build mine, `0x08`=transform terrain, `0x09`=clean pollution, `0x0A`=build airbase, `0x0B`=goto, `0xFF`=no orders. Any other value also means no orders. |
| +16 | 2 bytes | **Home city ID** (uint16 LE) | Höfelt byte 17-18. civ2mod.c: `UNIT_HOMECITY_OFFSET 16`, read via `getLocationAsShort()`. This is the city's **array index** in the city list (0-based), NOT the city sequence ID. `0xFFFF` = no home city. The high byte (+17) is `0x00` for saves with fewer than 256 cities, which is why Höfelt describes byte 18 as "not used (0 always)" — it is actually the high byte of a uint16. |
| +18 | 2 bytes | **Goto X** (int16 LE) | Höfelt bytes 19-20. Destination X coordinate for goto command. `0xFFFF` = no goto. |
| +20 | 2 bytes | **Goto Y** (int16 LE) | Höfelt bytes 21-22. Destination Y coordinate for goto command. `0xFFFF` = no goto. |
| +22 | 2 bytes | **Link to next unit in stack** (int16 LE) | Höfelt bytes 23-24. ID of the unit drawn **on top** of this unit in the same tile. Part of a doubly-linked list for unit stacking. **CAUTION**: modifying can produce strange effects. |
| +24 | 2 bytes | **Link to previous unit in stack** (int16 LE) | Höfelt bytes 25-26. ID of the unit drawn **under** this unit in the same tile. Part of the stacking linked list. **CAUTION**: modifying can produce strange effects. |
| +26 | 2 bytes | **Unit sequence ID** (uint16 LE) | **SAV/NET only** (not present in SCN). Global unique creation counter. Lower = older unit. Gaps represent destroyed units. |
| +28 | 4 bytes | **Always `0x00000000`** | **SAV/NET only** (not present in SCN). Structural padding. |

> **Key correction from Höfelt**: Our earlier analysis misidentified several fields. Byte +7 is the **owner** (not visibility), +8 is **movement points** (not home city), +9 is **visibility** (not special status), +10 is **HP lost** (not owner), +11 is **last direction** (not original builder), +12 is **AI task** (not continent ID), +15 is **orders** (not movement class), +16 is **home city** (not a counter). The bytes +22/+24 are **unit stacking linked list pointers**, not waypoint coordinates.

#### Orders Values Reference

| Value | Order | Notes |
|-------|-------|-------|
| 0x01 | Fortify (in progress) | Ordered but not yet fortified |
| 0x02 | Fortified | Fully fortified, defense bonus active |
| 0x03 | Sleep / Sentry | Wake on enemy sighting |
| 0x04 | Build Fortress | Settler/Engineer order |
| 0x05 | Build Road/Railroad | |
| 0x06 | Build Irrigation | |
| 0x07 | Build Mine | |
| 0x08 | Transform Terrain | Engineer only |
| 0x09 | Clean Pollution | |
| 0x0A | Build Airbase | |
| 0x0B | Goto | Uses +18/+20 destination coordinates |
| 0xFF | No orders | Idle unit |

##### Algorithms from civ2mod.c

**Finding units in a city**: civ2mod.c `setUnitsInCity()` (line 500) detects units garrisoned in a city by comparing the first 4 bytes (X, Y coordinates) of the unit record with the first 4 bytes of the city record. If they match (`memcmp == 0`), the unit is in that city.

**Home city as array index**: civ2mod.c reads the home city field at offset +16 as a `uint16 LE` (`getLocationAsShort(offset+UNIT_HOMECITY_OFFSET)`) and compares it against the city's **array index** (`cityItemOffset / CITY_ITEM_SIZE`). This means the home city ID is the city's position in the city list (0-based), NOT the city sequence ID stored at city byte +84. The value `0xFFFF` = no home city.

##### TODO: Unit Record Remaining Unknowns
- [x] Identified +7 as owner (not visibility) — Höfelt byte 8
- [x] Identified +8 as movement points (not home city) — Höfelt byte 9
- [x] Identified +9 as visibility bitmask — Höfelt byte 10
- [x] Identified +10 as HP lost (not owner) — Höfelt byte 11
- [x] Identified +11 as last direction (not original builder) — Höfelt byte 12
- [x] Identified +12 as AI task (not continent ID) — Höfelt byte 13
- [x] Identified +15 as orders enum (not movement class) — Höfelt byte 16
- [x] Identified +16 as home city ID (not counter) — Höfelt byte 17
- [x] Identified +22/+24 as unit stacking linked list (not waypoint) — Höfelt bytes 23-26
- [ ] Decode +4 bit 6 ("first move") more precisely — confirmed by Höfelt but behavior unclear
- [ ] Decode +12 low nibble (AI task sub-field)
- [ ] Decode +14 alive byte non-zero values (what values indicate death?)
- [ ] **RENDERING**: Unit +5 bit 7 "automate" flag — automated settlers/engineers should display an order letter on their shield (e.g., "A"), but the renderer's ORDER_KEYS table has no automate entry. Determine correct order letter.
- [ ] **RENDERING**: Unit +12 high nibble (AI task) — the doc says this is "displayed on unit shield when map is fully revealed via cheat." Determine what letter/icon is shown per task value (2=build city, 9=explore, etc.) and rendering position.
- [ ] **RENDERING**: Unit +13 cargo byte (Caravan commodity) — determine whether the game visually indicates the commodity being carried. The renderer does not use this field visually.

#### Standard Unit Type IDs (default RULES.TXT)

| ID | Unit | ID | Unit | ID | Unit |
|----|------|----|------|----|------|
| 0 | Settlers | 18 | Crusaders | 36 | Ironclad |
| 1 | Engineers | 19 | Knights | 37 | Destroyer |
| 2 | Warriors | 20 | Dragoons | 38 | Cruiser |
| 3 | Phalanx | 21 | Cavalry | 39 | AEGIS Cruiser |
| 4 | Archers | 22 | Armor | 40 | Battleship |
| 5 | Legion | 23 | Catapult | 41 | Submarine |
| 6 | Pikemen | 24 | Cannon | 42 | Carrier |
| 7 | Musketeers | 25 | Artillery | 43 | Transport |
| 8 | Fanatics | 26 | Howitzer | 44 | Cruise Msl. |
| 9 | Partisans | 27 | Fighter | 45 | Nuclear Msl. |
| 10 | Alpine Troops | 28 | Bomber | 46 | Diplomat |
| 11 | Riflemen | 29 | Helicopter | 47 | Spy |
| 12 | Marines | 30 | Stealth Ftr. | 48 | Caravan |
| 13 | Paratroopers | 31 | Stealth Bmbr. | 49 | Freight |
| 14 | Mech. Inf. | 32 | Trireme | 50 | Explorer |
| 15 | Horsemen | 33 | Caravel | 51 | Extra Land |
| 16 | Chariot | 34 | Galleon | | |
| 17 | Elephant | 35 | Frigate | | |

Note: Unit type IDs above 51 indicate a modded RULES.TXT with custom unit definitions. Order matches the `@UNITS` section in RULES.TXT and the sprite grid in UNITS.GIF (9 columns: `col = id % 9`, `row = id // 9`).

#### Gap Record (32 bytes, between cities and tail)

> **CORRECTION (Session 12):** This 32-byte record is located between the END of city records and the START of the tail section — NOT between units and cities as previously documented. Cities follow directly after units with no gap.

This fixed 32-byte record's exact purpose is not fully decoded, but it appears to contain:
- Bytes 0–3: A coordinate pair (possibly the currently selected unit or map cursor position)
- Bytes 4–25: Game state flags
- Bytes 26–31: Three uint16 values; the last appears related to the number of active civilizations

### Section 6: City Records

City records are stored contiguously immediately after unit records. The record size depends on file type:

| File Type | Record Size | Notes |
|-----------|------------|-------|
| SAV / NET / HOT / EML | **88 bytes** | 84 core bytes + 4-byte trailer (unique city ID + padding) |
| SCN | **84 bytes** | Core record only, no city ID trailer |

The first 84 bytes of each city record are **identical** between SAV and SCN files (verified by byte-for-byte comparison of matching cities). SAV/NET files append 4 extra bytes: a **city sequence ID** (uint16 LE) at offset +84, followed by 2 bytes of zero padding. This ID is a globally unique counter (1-indexed) — gaps indicate destroyed/disbanded cities.

The total count is given by the uint16 at header offset `0x003C`. The city block can be located by:

1. **Forward chain**: `city_offset = unit_offset + total_units * unit_record_size` (no bridge gap)
2. **From the end**: `city_block_start = EOF - tail_size - 32 - (num_cities × city_record_size)`
3. **By searching**: Scan for known city names which appear at **offset +32** within each record. civ2mod.c uses `memmem()` to find the city name string within the city data section, then subtracts `CITY_ITEM_NAME_OFFSET` (32) to get the record start pointer. This works reliably because city names are unique within a save.

#### City Record Structure (84 core bytes; 88 bytes in SAV/NET)

Cross-referenced and confirmed against four independent sources: (1) Allard Höfelt's hex-editing guide v1.8 (hexedit.rtf, FW-centric), (2) TE Kimball's civ2mod.c (MGE-specific C source), (3) Catfish's Cave / FoxAhead's Civ2Types.pas (ToT-based), and (4) direct hex verification of MGE save files.

**CRITICAL LAYOUT CORRECTION**: Previous versions of this document incorrectly stated that the city name was at offset +0 (record start). In fact, the MGE city record layout matches FW exactly: XY coordinates and metadata come FIRST (+0 to +31), city name is in the MIDDLE (+32 to +47), and output/production fields follow (+48 to +87). This is confirmed by civ2mod.c (`CITY_ITEM_NAME_OFFSET 32`, `CITY_ITEM_OWNER_OFFSET 8`) and verified by reading actual save file bytes.

| Offset | Size | Field | Status | Notes |
|--------|------|-------|--------|-------|
| +0 | 2 bytes | **X coordinate** (short LE) | ✅ Confirmed (civ2mod.c, Höfelt) | Isometric map X. civ2mod.c: `getShort(cityblockptr)`. |
| +2 | 2 bytes | **Y coordinate** (short LE) | ✅ Confirmed (civ2mod.c, Höfelt) | Isometric map Y. civ2mod.c: `getShort(cityblockptr+2)`. |
| +4 | 1 byte | **City attributes I** | ✅ Confirmed (Höfelt) | Bitmask: bit 7 (0x80) = can build coastal improvements, bit 4 (0x10) = auto-build active (see +7 for advisor type), bit 3 (0x08) = tech stolen from this city, bit 2 (0x04) = improvement sold this turn, bit 1 (0x02) = "We Love the King Day" active, bit 0 (0x01) = civil disorder. |
| +5 | 1 byte | **City attributes II** | ✅ Hex-verified | bit 2 (0x04) = can build hydroplant. Other bits used by game internally. |
| +6 | 1 byte | **City attributes III** | ✅ Hex-verified | bit 5 (0x20) = can build ships (only effective if coastal flag at +4 is also set). |
| +7 | 1 byte | **City attributes IV** | ✅ Hex-verified | bit 4 (0x10) = objective ×3 (scenario), bit 2 (0x04) = objective ×1 (both can be set simultaneously), bit 1 (0x02) = auto-build under domestic advisor, bit 0 (0x01) = auto-build under military advisor. Both auto bits = 0 means auto-build under both advisors simultaneously. Requires +4 auto-build flag to be active. |
| +8 | 1 byte | **Owning civilization** (0-7) | ✅ Confirmed (civ2mod.c) | `CITY_ITEM_OWNER_OFFSET 8`. 0=barbarians, 1-7=civs. |
| +9 | 1 byte | **City size** | ✅ Confirmed (Höfelt) | Population level. Negative sizes (signed) cultivate no squares but still produce food. |
| +10 | 1 byte | **Founding/last owner tribe** (0-7) | ✅ Hex-verified | Who originally built the city (or more likely the last owner before current). |
| +11 | 1 byte | **Turns since capture counter** | ✅ Hex-verified | Increments each turn. Used to calculate post-capture "extra unhappiness" duration. |
| +12 | 1 byte | **Known to tribes** (bitmask) | ✅ Hex-verified | Which civs know this city exists. Leftmost bit = civ 1 (white), rightmost bit = barbarians. Does NOT apply for the city's own owner. |
| +13 | 1 byte | Padding | ✅ Hex-verified | Always 0x00. |
| +14 | 8 bytes | **Believed city size** | ✅ Hex-verified (Höfelt) | One byte per civ slot (0-7). The size that each foreign civ believes this city has. Foreign city size on the map is NOT updated until you place a unit near the city. A city can appear on a civ's SHIFT+C list but not on the map if the bit in +12 is set and the corresponding size here is 0. |
| +22 | 4 bytes | **Specialist details** | Höfelt, Catfish | 16 × 2-bit entries: 00=none, 01=entertainer, 10=taxman, 11=scientist. Example: 0x06 = 1 taxman (10) + 1 entertainer (01) packed into first byte. |
| +26 | 2 bytes | **Food in food box** (short LE) | ✅ Confirmed (Höfelt) | Accumulated food toward next population growth. 0xFFFF = famine. |
| +28 | 2 bytes | **Shields in shield box** (short LE) | ✅ Confirmed (Höfelt) | Accumulated shields toward current production item. |
| +30 | 2 bytes | **Net base trade** (short LE) | ✅ Hex-verified | Base trade arrows (excluding trade routes). Identical to +78 when no trade routes active (verified 43/43 cities). |
| +32 | 16 bytes | **City name** | ✅ Confirmed (civ2mod.c) | `CITY_ITEM_NAME_OFFSET 32`. 15 chars max + null terminator. |
| +48 | 1 byte | **Workers inner circle** | ✅ Hex-verified | Bitmask: each bit = 1 of 8 inner-ring tiles being worked. See City Radius Spiral below for bit-to-tile mapping. Verification: `popcount(+48) + popcount(+49) + popcount(+50 & 0x0F) + specialists = city_size` holds for ALL 43 cities. |
| +49 | 1 byte | **Workers outer circle A** | ✅ Hex-verified | 8 of the 12 outer-ring tile positions. See City Radius Spiral below. |
| +50 | 1 byte | **Workers outer circle B** | ✅ Hex-verified | Low 4 bits = remaining 4 outer-ring positions. **Bit 4 (0x10) = center tile, ALWAYS set** (43/43 cities). Center tile is free — not counted in population. See City Radius Spiral below. |
| +51 | 1 byte | **Total specialist count × 4** | ✅ Confirmed | Increments by 4 per specialist of ANY type. Specialist count = value ÷ 4. All 0 in main save (no specialists). |

##### City Radius Spiral — Worker Bit-to-Tile Mapping

The city's 21 workable tiles (20 radius + 1 center) are indexed by a spiral pattern stored in two static arrays in the binary:

- **`DAT_00628370`** — CitySpiralDX: signed byte[45] — X offsets (doubled-X coordinate system)
- **`DAT_006283a0`** — CitySpiralDY: signed byte[45] — Y offsets

The first 21 entries (indices 0–20) define the city radius tiles. Entries 21–44 extend to a larger search area used by the AI and tile ownership functions (loop bound `0x2d` = 45 in the decompiled code; tiles within the city radius checked with `index < 0x15` = 21).

**Complete bit-to-tile mapping (verified against axx0/Civ2-clone and 82 cities across 2 saves):**

The save file stores worker assignments as 3 bytes at offsets +48, +49, +50. Each bit indicates whether a citizen is working that tile. The mapping uses the **LSB-first** convention (bit 0 = index 0 of that byte's range):

```
Byte +48 (inner ring, 8 tiles):
  Bit 0 → NE   [+1, -1]     Bit 4 → SW  [-1, +1]
  Bit 1 → E    [+2,  0]     Bit 5 → W   [-2,  0]
  Bit 2 → SE   [+1, +1]     Bit 6 → NW  [-1, -1]
  Bit 3 → S    [ 0, +2]     Bit 7 → N   [ 0, -2]

Byte +49 (outer ring A, 8 tiles):
  Bit 0 → NE diagonal   [+2, -2]     Bit 4 → outer N-NE  [+1, -3]
  Bit 1 → SE diagonal   [+2, +2]     Bit 5 → outer E-NE  [+3, -1]
  Bit 2 → SW diagonal   [-2, +2]     Bit 6 → outer E-SE  [+3, +1]
  Bit 3 → NW diagonal   [-2, -2]     Bit 7 → outer S-SE  [+1, +3]

Byte +50 (outer ring B + center, 5 tiles):
  Bit 0 → outer S-SW  [-1, +3]     Bit 3 → outer N-NW  [-1, -3]
  Bit 1 → outer W-SW  [-3, +1]     Bit 4 → CENTER      [ 0,  0]  (always set)
  Bit 2 → outer W-NW  [-3, -1]
```

All offsets are in doubled-X coordinates (where X is doubled, matching the save file's native coordinate system). To convert to standard game (gx, gy) coordinates: `gx = (parCenter + ddx - parTarget) >> 1` where `parCenter = city.gy & 1` and `parTarget = (city.gy + ddy) & 1`.

**Tile layout diagram** (doubled-X offsets from city center, isometric grid):

```
y=-3:          (-1,-3)          (+1,-3)
y=-2:    (-2,-2)     ( 0,-2)          (+2,-2)
y=-1: (-3,-1)   (-1,-1)     (+1,-1)      (+3,-1)
y= 0:    (-2, 0)     CENTER          (+2, 0)
y=+1: (-3,+1)   (-1,+1)     (+1,+1)      (+3,+1)
y=+2:    (-2,+2)     ( 0,+2)          (+2,+2)
y=+3:          (-1,+3)          (+1,+3)
```

**Equivalence with axx0/Civ2-clone**: The axx0 reimplementation (`MapNavigationFunctions.CityRadius()`) uses MSB-first bit reading with the reverse index ordering — N first (index 0), NE last (index 7) for the inner ring. This is mathematically equivalent: both map the same physical bit to the same physical tile. Verified with zero mismatches across all 82 cities in two test saves.

**Sources**: Decompiled binary (`DAT_00628370`/`DAT_006283a0` references in `block_004E0000.c`, `block_004A0000.c`, et al.), axx0/Civ2-clone `Engine/src/MapObjects/MapNavigationFunctions.cs`, FoxAhead naming convention (CitySpiralDX/CitySpiralDY).
| +52 | 4 bytes | **Building bitmask I-IV** (uint32 LE) | ✅ Confirmed | 32-bit bitmask, **1-indexed**, RULES.TXT order. **Palace validation**: exactly 1 Palace per active civ — Zimbabwe(civ2), Trondheim(civ3), Washington(civ5), Cardiff(civ1). See full mapping below. |
| +56 | 1 byte | **Building bitmask V** | Catfish | Buildings 32+. Bit 0=Airport, Bit 1=Police Station, Bit 2=Port Facility, etc. All 0 in main save. |
| +57 | 1 byte | **Item in production** | ✅ Hex-verified | Units: 0x00-0x3F (direct type ID). Improvements/Wonders: `building_id = 256 - byte_value`. E.g., 0xCA=J.S. Bach's Cathedral (#54), 0xFD=Granary (#3), 0xF8=City Walls (#8). Production includes wonders (#39+ in RULES.TXT). |
| +58 | 1 byte | **Number of active trade routes** | Höfelt | 0-3 (can be >3 via hex edit). |
| +59 | 3 bytes | **Trade commodities available/supplied** | Höfelt | 0x00-0x0F = available (RULES.TXT order). Supplied goods use 0xFF complement (e.g., 0xF3 = commodity 13 supplied). |
| +62 | 3 bytes | **Trade commodities demanded** | Höfelt | 0x00-0x0F. |
| +65 | 3 bytes | **Commodities in trade route** | Catfish | With partners 1-3. 0x00-0x0F = @CARAVAN item, 0xFF = food supplies. |
| +68 | 6 bytes | **Trade partner city IDs** | Catfish | 3 × uint16 LE. City sequence ID of each trade partner. |
| +74 | 2 bytes | **Science output** (short LE) | ✅ Hex-verified | Beakers generated. Verified: sci + tax = trade (±1 rounding) for all 43 cities. |
| +76 | 2 bytes | **Tax output** (short LE) | ✅ Hex-verified | Gold generated. Tax collectors add +3 each. |
| +78 | 2 bytes | **Total trade** (short LE) | ✅ Hex-verified | Total trade arrows including trade routes. = +30 when no routes. |
| +80 | 1 byte | **Total food production** | ✅ Hex-verified | Food from worked tiles. Range 3-21 across 43 cities. Correlates strongly with size (r=0.93). |
| +81 | 1 byte | **Total shield production** | ✅ Hex-verified | Shields from worked tiles. Range 1-10 across 43 cities. |
| +82 | 1 byte | **Happy citizens** | ✅ Confirmed (Catfish, experiment) | Entertainers generate happy citizens (+1 each). In main save: 1 for all human cities (baseline happy), 0 for AI, 3 for WLTK capital. |
| +83 | 1 byte | **Unhappy citizens** | Catfish, Höfelt | In main save: only San Francisco and Kansas City have value 1 (mildly unhappy). |
| +84 | 2 bytes | **City sequence ID** (short LE) | **SAV/NET only** (not present in SCN). 1-indexed unique ID. Gaps indicate destroyed/disbanded cities. Referenced by trade partner fields and wonder assignments. |
| +86 | 2 bytes | Padding | **SAV/NET only** (not present in SCN). Always 0x0000. |

##### Building Bitmask (+52-55, uint32 LE) — CONFIRMED

**Verified via controlled experiment**: Playing as France, built Palace, Granary, Temple, Marketplace, and Library one per turn in Paris, saving after each. The bitmask at +52-55 changed exactly as predicted:

| Save | Buildings present | +52 value | Binary | Bits set |
|------|------------------|-----------|--------|----------|
| base | Palace only | `0x02` | `00000010` | 1 |
| granary | +Granary | `0x0A` | `00001010` | 1,3 |
| temple | +Temple | `0x1A` | `00011010` | 1,3,4 |
| market | +Marketplace | `0x3A` | `00111010` | 1,3,4,5 |
| library | +Library | `0x7A` | `01111010` | 1,3,4,5,6 |

Confirmed by matching the city screen screenshot (showing all 5 improvements in City Improvements list).

The bit numbering is **1-indexed**, matching the RULES.TXT improvement order:

| Bit | Improvement | Bit | Improvement |
|-----|-------------|-----|-------------|
| 0 | *(unknown flag)* | 16 | Manufacturing Plant |
| 1 | Palace | 17 | SDI Defense |
| 2 | Barracks | 18 | Recycling Center |
| 3 | Granary | 19 | Power Plant |
| 4 | Temple | 20 | Hydro Plant |
| 5 | Marketplace | 21 | Nuclear Plant |
| 6 | Library | 22 | Stock Exchange |
| 7 | Courthouse | 23 | Sewer System |
| 8 | City Walls | 24 | Supermarket |
| 9 | Aqueduct | 25 | Superhighways |
| 10 | Bank | 26 | Research Lab |
| 11 | Cathedral | 27 | SAM Missile Battery |
| 12 | University | 28 | Coastal Fortress |
| 13 | Mass Transit | 29 | Solar Plant |
| 14 | Colosseum | 30 | Harbor |
| 15 | Factory | 31 | Offshore Platform |

Additional improvements in **buildingsV** (+56, uint8 bitmask):

| Bit | Improvement |
|-----|-------------|
| 0 (ID 32) | Airport |
| 1 (ID 33) | Police Station |
| 2 (ID 34) | Port Facility |
| 3 (ID 35) | SS Structural |
| 4 (ID 36) | SS Component |
| 5 (ID 37) | SS Module |
| 6 (ID 38) | Capitalization |

Bits 1–6 are confirmed by a controlled experiment. Bits 7–31 are inferred from RULES.TXT order and validated against scenario saves (e.g., cities with City Walls, Aqueduct, Cathedral, SDI Defense all have the expected bits set). Bit 0 appears in some scenario cities but no standard-game cities; its meaning is unknown (possibly a scenario flag or the "Nothing" entry in RULES.TXT).

**Key correction**: +52-55 was previously misidentified as "city size" (byte +52) because the bitmask value for a Palace-only city (`0x02`) coincidentally resembled a size value.

##### Production Item Encoding (+57)

The production item byte encodes both units and improvements/wonders in a single byte:

- **Units**: Direct type ID (0x00-0x3F). E.g., 0x00=Settlers, 0x05=Legion, 0x06=Pikemen, 0x12=Crusaders.
- **Improvements/Wonders**: Inverted encoding: `building_id = 256 - byte_value`. E.g., 0xFF=Palace(#1), 0xFD=Granary(#3), 0xF8=City Walls(#8), 0xD5=Great Library(#43), 0xCA=J.S. Bach's Cathedral(#54).

**Hex-verified production summary** (43 cities in main save):
- 16 cities building Settlers (rapid expansion phase)
- 6 cities building Crusaders (medieval military)
- 5 cities building Pikemen (defense)
- 3 cities building Legion
- 2 cities building Granary, 2 building City Walls
- 1 city each: J.S. Bach's Cathedral (#54), Great Library (#43), Temple, Warriors, Elephant, Light Artillery, Horsemen, Ironclad

##### Resource Field Relationship

##### Natural Growth Experiment (Orleans, France — saves sz1/sz2/sz3)

Verified via natural population growth (no cheats). Orleans grew from size 1→2→3 over turns 6→16→31:

| Field | Size 1 | Size 2 | Size 3 | Interpretation |
|-------|--------|--------|--------|----------------|
| +74 (Science) | 2 | 3 | 4 | Beakers: increases with more worked tiles |
| +78 (Trade) | 4 | 5 | 6 | Trade arrows: increases with more worked tiles |
| +80 (Food) | 4 | 6 | 8 | **Food produced** (+2 per pop) |
| +81 (Shields) | 1 | 2 | 3 | **Shields produced** (+1 per pop) |
| +57 (Production) | 254 | 254 | 2 | Item in production (changed build item) |
| +52 (Buildings) | 0x02 | 0x02 | 0x06 | Bitmask (Palace → Palace+Barracks) |

**Key insight**: With Catfish cross-reference, +74 is confirmed as **science output** (not city size). Science, tax, trade, food, and shield outputs all scale naturally with population as more tiles are worked.

**Cheat bug note**: The Civ2 population cheat writes to an off-by-one city record (+9 of the PREVIOUS city in the array) instead of the target city.

##### Specialist Experiment (Orleans size 5, France — entertainer/tax collector/scientist)

Verified by assigning 1 specialist of each type from a size-5 baseline (no specialists):

| Field | No spec | Entertainer | Tax Collector | Scientist | Notes |
|-------|---------|-------------|---------------|-----------|-------|
| +51 | 0 | **4** | **4** | **4** | +4 per specialist of ANY type |
| +74 (Science) | 5 | 4 (-1) | 4 (-1) | **7 (+2)** | Scientist ADDS to science! |
| +76 (Tax) | 3 | 3 (same) | **6 (+3)** | 3 (same) | Tax collector ADDS to tax! |
| +78 (Trade) | 8 | 7 (-1) | 7 (-1) | 7 (-1) | Always drops by 1 |
| +80 (Food) | 12 | 10 (-2) | 10 (-2) | 10 (-2) | Food always drops by 2 |
| +81 (Shields) | 4 | 4 (same) | 4 (same) | 4 (same) | Shields unchanged |
| +82 (Happy) | 0 | **1 (+1)** | 0 (same) | 0 (same) | Entertainers add happy citizens |

**Key findings**:
- **+51** = total specialist count × 4 (type-independent).
- **+82** = **happy citizens** (Catfish-confirmed). Entertainers generate happy citizens, which is why +82 increments only for entertainers.
- **+74 (Science)** absorbs scientist bonus (+2 per scientist).
- **+76 (Tax)** absorbs tax collector bonus (+3 per tax collector).
- **+78 (Trade)** = total trade (always drops by 1 per specialist, regardless of type — one fewer tile worked).
- **+80 (Food)** = food produced (always drops by 2 per specialist — one fewer tile worked).
- Each specialist type routes its bonus to a DIFFERENT output field while all reduce trade and food equally.

##### TODO: City Record Remaining Unknowns
- [x] All major fields mapped via civ2mod.c, hexedit.rtf, Catfish cross-reference, and controlled experiments
- [x] Layout correction: XY coords at +0, name at +32 (confirmed by civ2mod.c and hex verification)
- [x] Verify +57 as item in production — **confirmed**: units 0x00-0x3F, buildings/wonders via `256 - byte_value`. Washington building J.S. Bach's Cathedral (0xCA=#54), Philadelphia building Great Library (0xD5=#43).
- [x] Verify +48-50 as worker tile assignments — **confirmed**: workers + specialists = city_size for ALL 43 cities. Bit 4 of +50 = center tile, always set. Full bit-to-tile spiral mapping documented and verified against axx0/Civ2-clone (82 cities, 0 mismatches).
- [x] Verify building bitmask 1-indexed — **confirmed**: Palace (bit 1) present in exactly 1 city per active civ (Zimbabwe, Trondheim, Washington, Cardiff).
- [x] Verify +84 as city sequence ID — **confirmed**: 43 unique values (1-46), gaps at 4/13/27 = destroyed cities.
- [x] Verify +30 vs +78 relationship — **confirmed**: identical when no trade routes (43/43 cities).
- [x] Verify +86-87 — **confirmed**: always 0x0000 (padding).
- [ ] Verify +56 as building bitmask V (all 0 in main save — need game with Airport/Police Station)
- [ ] Verify +4-7 attribute bits not yet seen (Auto-build, Tech stolen, Disorder, Objective flags)
- [ ] Decode +6 bit 3 (0x08) — present in 42/43 cities, meaning unknown
- [ ] Investigate +5 bit 3 (0x08) — present in 32/43 cities, possibly "has river in city radius"
- [ ] **RENDERING**: City civil disorder (+4 bit 0) — cities in disorder show a visible indicator in the game (fist icon or red highlight on the map). Determine exact visual indicator, sprite source, and rendering position. The renderer currently only shows disorder in the tooltip.
- [ ] **RENDERING**: City "We Love the King Day" (+4 bit 1) — WLTKD cities may show celebration effects on the map. Determine exact visual representation. Currently tooltip-only.
- [ ] **RENDERING**: City resistance state (+11 turns since capture) — cities under resistance may display differently on the map (e.g., occupation flag or altered sprite). Determine how resistance vs normal occupation is visually distinguished.

##### Cross-Reference: Source Documentation

Four independent sources confirm the MGE city record layout:

**1. hexedit.rtf** (Allard Höfelt, v1.8, 16 April 2005) — The original community hex-editing guide. Documents FW format (84-byte cities, 1-based offsets). Notes that MGE cities are 88 bytes (4 extra at end). FW layout = MGE layout for bytes 1-84; MGE adds bytes 85-88.

**2. civ2mod.c** (TE Kimball) — C program for modifying MGE save files. Confirms via code:
- `CITY_ITEM_SIZE 88` — 88 bytes per city
- `CITY_ITEM_NAME_OFFSET 32` — city name at offset +32
- `CITY_ITEM_OWNER_OFFSET 8` — owner at offset +8
- `findCityItem()` searches for city name then subtracts 32 to get record start
- `addCityToVisibilityMap()` reads X at +0, Y at +2 from record start

**3. Catfish's Cave / FoxAhead** (jp_hex.htm) — Documents ToT format (92-byte cities). ToT adds 2 bytes for map number before the name block and 2 bytes after the name block. ToT byte numbers can be converted to MGE offsets but require careful adjustment for the structural differences.

**4. Direct hex verification** — Reading actual MGE save files confirms Washington at record offset +0=40 (X=40), +2=16 (Y=16), +8=5 (owner=civ 5), +9=1 (size=1), +32="Washington".

**FW-to-MGE offset conversion**: Subtract 1 from Höfelt's 1-based FW byte number to get 0-based MGE offset. FW bytes 1-84 map directly to MGE +0 through +83. MGE SAV/NET files add +84-87 (city sequence ID + padding) that FW does not have. **SCN files match FW's 84-byte city size** — the FW format predates the SAV format's added ID fields.

**Stale player fields caveat**: Fields in the +0-31 range (XY, attributes, owner, size, etc.) appear to be **static/stale for the active human player's cities** — Orleans (player-owned) showed +9=0 at all city sizes, while AI cities (Washington, London) had correct values. The game likely reads player city data from memory rather than from the save file for these fields.

Notes:
- The city count at header offset `0x003C` includes destroyed/disbanded cities which remain as historical records.
- Destroyed cities retain their `owner` byte, which reflects the **last known owner**, not necessarily the founding civilization.
- Cities at coordinates `(0, 0)` with nonsensical names (e.g., single character `"H"`) are likely dummy/invalid records.
- City records for destroyed cities can span the entire map — they are **not** reliable for computing current territorial control. Use the tile visibility bitmask instead.
- A city's "owner" ID is **not** the same as the civ slot number used in tile byte[3]. The relationship between owner IDs and slot numbers must be determined per-save.

### Section 7: Tail Data (variable size by file type)

The final section of every save file contains post-city data. The tail size depends on the file type:

| File Type | Tail Size | Notes |
|-----------|-----------|-------|
| Standard `.SAV` | **1,807 bytes** | `header[0x0D] & 0x01 == 0` |
| Scenario `.SAV` | **1,907 bytes** | `header[0x0D] & 0x01 == 1` (100 extra bytes) |
| `.SCN` | **1,907 bytes** | Always scenario |
| `.NET` | **2,979 bytes** | Network saves (1,172 extra bytes for network state) |

**Scenario saves** have a 100-byte block inserted at tail offset +1469, between the post-fixed-constants region and the kill history. This block contains a 2-byte prefix, the scenario name string (e.g., `"The Rise Of Rome"` at +1471, up to 64 bytes), and additional scenario metadata. This shifts the kill history from +1469 (standard) to +1569 (scenario).

The fixed constants at tail +1385 (`0xAB 0x05 0x46 0x03 0x01 0x00 0x03`) are **identical** in standard, scenario, and network saves. (Note: earlier documentation cited +1384, but empirical testing across multiple files confirms +1385.)

#### Tail Internal Structure

The tail begins immediately after the 32-byte gap that follows the city records.

**Post-city per-civ data** (first 63 bytes):

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 63 bytes | **City name counters** (21 civs × 3 bytes) | Höfelt: 3 bytes per civilization (in RULES.TXT `@LEADERS` order, starting with Romans). Byte 2 of each triplet = number of cities built so far, used to determine which city name to pick from CITIES.TXT. Counter resets to 0 after the last @EXTRA city name. Value `0xFF` causes the next city to get the civilization's header name (e.g., `@ROMANS`). Bytes 1 and 3 of each triplet are mostly 0 or 1, purpose unclear. |
| +63 | 2 bytes | **Cursor X** (uint16 LE) | Horizontal coordinate of the game cursor position. |
| +65 | 2 bytes | **Cursor Y** (uint16 LE) | Vertical coordinate of the game cursor position. |

**Passwords** (224 bytes, located 1087.5 bytes before the event section or end of file):

Höfelt documents passwords as 224 bytes total: 32 bytes per civilization (7 civs). Each 32-byte password block contains up to 31 encrypted character bytes plus a terminating byte. The terminator's high nibble encodes password length mod 16, and the low nibble encodes the civilization ID (2-3=White, 4-5=Green, 6-7=Blue, 8-9=Yellow, 10-11=Cyan, 12-13=Orange, 14-15=Purple).

Password encryption uses a 3-step algorithm: (1) rotate character bits left by 1, (2) XOR with position-dependent mask, (3) add civilization-dependent offset based on character value modulo a divisor. Full algorithm documented in Höfelt v1.8 section 9.

**Civilization kill history** (last 338 bytes before events):

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 2 bytes | **Number of civs killed** | Maximum 12. |
| +2 | 24 bytes | **Kill turns** | 12 × uint16 LE. Turn number when each civ was destroyed. Unused slots are zeroed. |
| +26 | 12 bytes | **Killer civ IDs** | 12 × 1 byte. Which civ dealt the killing blow (0=barbarians). |
| +38 | 12 bytes | **Unknown** | 12 × 1 byte. Purpose unknown. |
| +50 | 288 bytes | **Destroyed civ names** | 12 × 24-byte null-terminated strings. Name of each destroyed civilization in kill order. |

> **Note**: If destroying a civilization triggers an additional "destroyed by barbarians" message, this appears as two kill entries in the same turn. The history section preserves the complete elimination timeline.

**Other tail sub-sections**:

| Offset | Size | Sub-section | Notes |
|--------|------|-------------|-------|
| ~+82 | ~270 bytes | **Historical power graph data** | 8 bytes per entry, one per ~4 game turns. Data behind the in-game Power Graph (Demographics screen). Per-civ metrics tracking civilization growth over time. Values grow monotonically (cumulative scores). When a civ is destroyed, its value drops to 0. Number of entries ≈ `turn_number / 4`. |
| ~+350 | ~940 bytes | Zero padding | Reserved for additional history rows in longer games (max ~117 rows for 500-turn game). |
| +1288 | 97 bytes | Game engine constants | Fixed values across saves: `0x0780` (1920) at +1289, `0x0438` (1080) at +1291, etc. Includes trailing 0x00 separator at +1384. Possibly scoring coefficients or display parameters. |
| +1385 | 7 bytes | Fixed constants | Always `0xAB 0x05 0x46 0x03 0x01 0x00 0x03` — identical across all saves and file types. |
| +1392 | 77 bytes | Per-civ summary values | Repeating pattern of ~10-byte blocks per civ. Purpose unclear. |
| +1469 | 100 bytes | **Scenario block** (scenario only) | 2-byte prefix + scenario name at +1471 (up to 64 bytes) + metadata. Only present in scenario/NET saves. Shifts kill history to +1569. |
| +1469 / +1569 | 338 bytes | **Kill history** | At +1469 for standard saves, +1569 for scenario saves (after scenario block). See kill history table above. |

##### TODO: Tail Data Unknown Fields
<!-- PRIORITY 5: ~60% of 1807 bytes still unknown. -->
- [ ] Decode +0-31 per-civ state flags in detail (alive/dead, government type, war/peace state)
- [ ] Decode +32-43 game counters (what do they count?)
- [ ] Decode +44-81 technology/wonder ID list (which tech/wonder does each uint16 reference?)
- [ ] Map the ~940-byte zero padding region (+350 to +1288) — is it truly empty or does it contain sparse data?
- [ ] Decode +1288-1383 game engine constants (scoring coefficients? display params? spaceship data?)
- [ ] Decode +1392-1397 per-game summary values

### Tribe / Civilization Name

Tribe names appear in two places:
1. **In the tail section** (Section 7): Names of eliminated civilizations appear as null-terminated strings near the end of the file.
2. **In the civilization data** (Section 3): The player's name is stored at `name_block_start + (player_slot × 242)` in the per-civ name block (`0x0156` for SAV/NET, `0x0148` for SCN). Residual bytes from previous names may follow the null terminator (e.g., leftover characters from overwriting a longer name).

**AI tribe names are NOT stored in the save file.** The per-civ name blocks for AI civilizations are empty (all zeros). The game loads AI names from `LEADERS.TXT` and `CITY.TXT` at runtime based on each civ slot's assigned civilization index. To determine which civilization occupies which slot, you must cross-reference the city names in the save (e.g., "Zimbabwe", "Trondheim") against `CITY.TXT` (which maps city names to civilizations).

---

## CIV2.DAT — Runtime Configuration

Size: 516 bytes. Contains game session parameters.

| Offset | Content | Example |
|--------|---------|---------|
| 0x0004 | Difficulty or game parameter | `5` |
| 0x000A | Number of enemy civs | `6` (= 7 total with player) |
| 0x0060 | Player name (ASCII) | `"AmArA"` |
| 0x0080 | Second player slot? | `"cb"` |
| 0x00C0 | Local IP address (ASCII) | `"192.168.1.67"` |

---

## LEADERS.TXT — Civilization Definitions

Defines all 21 civilizations available in the game. Each line contains:

```
LeaderName, FemaleLeader, [3 AI values], TribeName, Adjective, [3 personality values], [optional government titles]
```

The 21 civilizations in order (0-indexed):

| Index | Tribe | Leader | Notable Cities |
|-------|-------|--------|----------------|
| 0 | Romans | Caesar / Livia | Rome, Veii, Cumae, Naples |
| 1 | Babylonians | Hammurabi / Ishtari | Babylon, Ur |
| 2 | Germans | Frederick / Maria Theresa | Berlin, Hamburg |
| 3 | Egyptians | Ramesses / Cleopatra | Thebes, Memphis |
| 4 | Americans | Abe Lincoln / E. Roosevelt | Washington, New York, Boston, Philadelphia, Atlanta, Chicago, etc. |
| 5 | Greeks | Alexander / Hippolyta | Athens, Sparta, Delphi |
| 6 | Indians | Mohandas Gandhi / Indira Gandhi | Delhi, Bombay, Madras, Bangalore, Calcutta, Lahore |
| 7 | Russians | Lenin / Catherine the Great | Moscow, St. Petersburg |
| 8 | Zulus | Shaka / Shakala | Zimbabwe, Ulundi, Isandhlwana, Bapedi, Intombe, Hlobane, Ngome, Mpondo |
| 9 | French | Louis XIV / Joan of Arc | Paris, Orleans, Lyons, Tours, Rheims |
| 10 | Aztecs | Montezuma / Nazca | Tenochtitlan |
| 11 | Chinese | Mao Tse Tung / Wu Zhao | Beijing |
| 12 | English | Henry VIII / Elizabeth I | London, York, Nottingham, Hastings, Canterbury, Coventry, Warwick, Newcastle |
| 13 | Mongols | Genghis Khan / Bortei | — |
| 14 | Celts | Cunobelin / Boadicea | Armagh, Cardiff, Carmarthen, Kells |
| 15 | Japanese | Tokugawa / Amaterasu | Kyoto, Osaka, Satsuma, Kagoshima, Edo |
| 16 | Vikings | Canute / Gunnhild | Kaupang, Trondheim, Uppsala, Hladir, Aarhus |
| 17 | Spanish | Philip II / Isabella | Madrid, Seville |
| 18 | Persians | Xerxes / Scheherezade | Persepolis |
| 19 | Carthaginians | Hannibal / Dido | — |
| 20 | Sioux | Sitting Bull / Sacajawea | — |

---

## Executable Analysis (civ2.exe)

### PE Header & Build Information

| Property | Value |
|----------|-------|
| Size | 2,489,344 bytes |
| Format | PE32 (GUI), Intel 80386 |
| Compiler | Microsoft Visual C++ (MSVC runtime linked) |
| Build timestamp | April 8, 1999 18:33:52 UTC |
| Entry point | `0x001f6e90` |
| Image base | `0x00400000` |
| Image size | 3,194,880 bytes (virtual) |
| Build path | `D:\Ss\Franklinton\` |
| Engine path | `D:\Ss\Smeds32\` |
| Product name | `Civilization II Multiplayer Gold Edition` |
| Publisher | `MicroProse Software` |
| Version string | `5.4.0f Multiplayer 26-March-99, Patch 3` |

### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Flags | Purpose |
|---------|-------------|-------------|----------|-------|---------|
| `.text` | `0x00001000` | 2,199,122 | 2,199,552 | CODE, EXEC, READ | Main game code |
| `ASMGRAF` | `0x0021a000` | 6,979 | 7,168 | CODE, EXEC, READ | Hand-written assembly graphics routines |
| `.rdata` | `0x0021c000` | 32,448 | 32,768 | INIT_DATA, READ | Read-only data (MSVC runtime strings) |
| `.data` | `0x00224000` | 797,548 | 100,352 | INIT_DATA, READ, WRITE | Game data (697 KB BSS/uninitialized) |
| `.idata` | `0x002e7000` | 11,253 | 11,264 | INIT_DATA, READ, WRITE | Import tables |
| `.rsrc` | `0x002ea000` | 20,328 | 20,480 | INIT_DATA, READ | Resources (icons, cursors, bitmaps) |
| `.reloc` | `0x002ef000` | 115,157 | 115,200 | INIT_DATA, READ | Relocation table |

### ASMGRAF Section — Hand-Written Assembly Graphics

The `ASMGRAF` section (6,979 bytes) contains **hand-written x86 assembly** routines for performance-critical graphics operations. Key characteristics:

- Uses 16/32-bit **mixed-mode** instructions (frequent `0x66` operand-size and `0x67` address-size prefixes), suggesting code ported from or compatible with 16-bit real-mode origins.
- Uses `ENTER` (`0xC8`) for stack frame setup instead of the standard `push ebp; mov ebp, esp` prologue — confirming hand-written rather than compiler-generated code.
- Approximately **66.9% padding** with `0xCC` (INT 3 / debug breakpoint) between functions, typical of debug-build assembly alignment.
- Contains roughly 13 functions (identified by RET instructions).
- Likely implements pixel blitting, scanline copying, and color manipulation operations where the C compiler's output was too slow for real-time rendering.

### Embedded Resources

| Type | Count | Details |
|------|-------|---------|
| Cursors | 19 | Custom mouse cursors (IDs 6–24), 308 bytes each |
| Cursor Groups | 19 | Grouped cursor definitions (IDs 500–530) |
| Icons | 5 | Application icons (IDs 1–5), 744 bytes each |
| Icon Groups | 5 | Grouped icon definitions |
| Bitmaps | 6 | Small UI bitmaps (IDs 301–306), ~616–630 bytes each |

All resources use language ID 1033 (English US).

### Imported DLLs & System Dependencies

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 106 | Core OS (file I/O, memory, threads, `GetPrivateProfileIntA` for INI files, `CreateMutexA` for single-instance enforcement) |
| `USER32.dll` | 100 | Windows GUI (windows, messages, cursors, menus, `SetWindowsHookExA` for input hooks) |
| `GDI32.dll` | 40 | Graphics (DIB sections, palettes, font rendering, `CreateDIBSection` for software rendering, `AnimatePalette` for color cycling) |
| `WINMM.dll` | 26 | Multimedia (wave audio, MIDI, CD audio via MCI, `sndPlaySoundA`, timer events) |
| `AVIFIL32.dll` | 14 | AVI video playback for wonder movies and cutscenes |
| `MSVFW32.dll` | 4 | Video for Windows (codec decompression via `ICLocate`/`ICClose`, `MCIWndCreateA`) |
| `DDRAW.dll` | 1 | DirectDraw (`DirectDrawCreate` — single entry point, rest via COM interfaces) |
| `ADVAPI32.dll` | 5 | Windows Registry (`RegCreateKeyExA`, `RegQueryValueExA`, etc.) |
| `comdlg32.dll` | 3 | Common dialogs (Open/Save file dialogs) |
| `COMCTL32.dll` | 1 | Common controls (ordinal #17 = `InitCommonControls`) |
| `XDaemon.dll` | 27 | Multiplayer networking (C++ mangled names, TCP/IP, IPX/SPX, modem, serial) |

### XDaemon.dll — Network Library (Deep Dive)

The XDaemon Communications Library is a standalone multiplayer networking middleware DLL developed by MicroProse Software, authored by **John C. O'Neill**. It abstracts multiple transport protocols behind a unified API for game networking.

#### Version & Build Information

| Property | Value |
|----------|-------|
| File version | 2.2.0.0 |
| Product version | 2.2.0.0 |
| Build timestamp | November 10, 1998, 16:29:15 UTC |
| Product name | XDAEMON Communications Module DLL |
| Internal name | XDAEMON |
| Copyright | Copyright © 1998 MicroProse Software |
| Author | John C. O'Neill |
| Self-reported version | v3.5.0 (in log output string `"10-Nov-1998"`) |
| Image base | `0x10000000` |
| Code size | 62,976 bytes |
| BSS size | ~46 KB (connection tables, socket buffers, state arrays) |

Note: The DLL reports itself as "v3.5.0" in log output (`XDaemon Communications Library v%d.%d.%d Online`), but the PE version resource says 2.2.0.0. The version returned by `XD_GetXDaemonVersion()` likely returns 3.5.0 via three separate `int*` parameters (major, minor, patch).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 62,950 | 62,976 | Executable code |
| `.rdata` | `0x00011000` | 6,147 | 6,656 | Read-only data, export table |
| `.data` | `0x00013000` | 60,700 | 14,336 | Global data (46 KB BSS) |
| `.idata` | `0x00022000` | 3,016 | 3,072 | Import tables |
| `.rsrc` | `0x00023000` | 928 | 1,024 | Version info resource |
| `.reloc` | `0x00024000` | 6,400 | 6,656 | Relocation table |

#### Complete Export Table (48 functions)

**Initialization & Shutdown:**

| # | Function | Signature |
|---|----------|-----------|
| 17 | `XD_InitializeModem` | `int (int modemIndex)` |
| 18 | `XD_InitializeSerial` | `int (int portIndex)` |
| 19 | `XD_InitializeSocketsIPXSPX` | `int (int, int, int, int, unsigned int, callback)` |
| 20 | `XD_InitializeSocketsTCP` | `int (int, int, int, int, unsigned int, callback)` |
| 27 | `XD_ResetLibrary` | `int ()` |
| 44 | `XD_ShutdownModem` | `void ()` |
| 45 | `XD_ShutdownSerial` | `void ()` |
| 46 | `XD_ShutdownSockets` | `void ()` |
| 47 | `XD_ShutdownTEN` | `void ()` |

**Connection Management:**

| # | Function | Signature |
|---|----------|-----------|
| 1 | `XD_ActivateServer` | `int ()` |
| 2 | `XD_CloseConnection` | `int ()` |
| 26 | `XD_OpenConnection` | `int (void* address, unsigned long timeout)` |
| 34 | `XD_ServerCloseConnection` | `int (unsigned short clientId)` |
| 48 | `XD_StopConnections` | `int ()` |

**Data Transfer:**

| # | Function | Signature |
|---|----------|-----------|
| 5 | `XD_FlushSendBuffer` | `int (unsigned long timeout)` |
| 16 | `XD_InFlushSendBuffer` | `int ()` — returns whether flush is in progress |
| 29 | `XD_SendBroadcastData` | `int (void* data, unsigned long size, long flags)` |
| 30 | `XD_SendDirectBroadcastData` | `int (void* dest, void* data, unsigned long size)` |
| 31 | `XD_SendPingRequest` | `int (unsigned short target, unsigned long data, callback)` |
| 32 | `XD_SendSecureData` | `int (unsigned short destId, void* data, unsigned long size, short priority)` |
| 33 | `XD_SendUDPBroadcastData` | `int (void* data, unsigned long size, long flags, const char* addr, int port)` |

**Callbacks (Event Registration):**

| # | Function | Signature |
|---|----------|-----------|
| 35 | `XD_SetBroadcastReceive` | `void (callback(void*, unsigned short, long))` |
| 37 | `XD_SetNewClientConnection` | `void (callback(unsigned short, unsigned short))` |
| 38 | `XD_SetOnClientConnectionToServer` | `void (callback(short))` |
| 39 | `XD_SetOnConnectionLost` | `void (callback(unsigned short))` |
| 40 | `XD_SetOnInvalidSendToSelf` | `void (callback(short))` |
| 41 | `XD_SetOversizedMessageCB` | `int (unsigned long maxSize, callback(unsigned long))` |
| 43 | `XD_SetSecureReceive` | `void (callback(unsigned short, void*, unsigned long, short))` |

**Query & Info:**

| # | Function | Signature |
|---|----------|-----------|
| 7 | `XD_GetConnectedSocketAddr` | `char* ()` |
| 8 | `XD_GetCurrentProtoAddr` | `char* (unsigned int adapterIndex, int protocol)` |
| 9 | `XD_GetCurrentProtocol` | `int ()` |
| 10 | `XD_GetLastError` | `const char* (int* errorCode)` |
| 11 | `XD_GetLoggedAddress` | `const char* (int index)` |
| 12 | `XD_GetModemName` | `const char* (int index)` |
| 13 | `XD_GetNumEnumeratedAdapters` | `int (int protocol)` |
| 14 | `XD_GetNumModems` | `int ()` |
| 15 | `XD_GetXDaemonVersion` | `int (int* major, int* minor, int* patch)` |
| 25 | `XD_LookupErrorCode` | `const char* (int code)` |
| 28 | `XD_SelectModem` | `int (int index)` |

**IGZ Lobby Integration:**

| # | Function | Signature |
|---|----------|-----------|
| 21 | `XD_LaunchZone` | `int (char* url)` — opens IGZ in browser via `ShellExecuteA` |
| 22 | `XD_LaunchedByLobby` | `int (void* hInstance, LobbyLaunchInfo* info)` |
| 23 | `XD_LobbyClose` | `void ()` |
| 24 | `XD_LobbySendMessage` | `int (unsigned long messageType)` |

**Debug/Testing (not used by game in normal operation):**

| # | Function | Signature |
|---|----------|-----------|
| 3 | `XD_EnableDebugFunctions` | `int (int enable)` |
| 4 | `XD_EnableServerLocator` | `int (int enable, unsigned int port)` |
| 6 | `XD_GeneratePortNoise` | `int (int port, short rate, short delta)` — generate noise for testing |
| 36 | `XD_SetDebugPacketDropRate` | `int (int dropRate, int seed)` — simulate packet loss |
| 42 | `XD_SetPacketDelay` | `int (int delay, int variance)` — simulate latency |

#### Imported DLLs

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 77 | Core OS: threads (`CreateThread`, `ExitThread`), synchronization (`WaitForMultipleObjects`, `CreateEventA`, `CriticalSection`), memory, file I/O, TLS |
| `USER32.dll` | 15 | Hidden message windows for async socket events (`CreateWindowExA`, `PeekMessageA`, `SetTimer`, `KillTimer`) |
| `WSOCK32.dll` | 23 | Winsock 1.1 networking (see below) |
| `DPLAYX.dll` | 3 | DirectPlay for modem/serial (`DirectPlayCreate`, `DirectPlayEnumerateA`, `DirectPlayLobbyCreateA`) |
| `ole32.dll` | 3 | COM initialization for DirectPlay (`CoInitialize`, `CoUninitialize`, `CoCreateInstance`) |
| `SHELL32.dll` | 1 | `ShellExecuteA` — launches IGZ lobby URL in browser |
| `ADVAPI32.dll` | 5 | Windows Registry for storing network settings |

#### Winsock Functions Used (WSOCK32.dll)

| Ordinal | Function | Purpose |
|---------|----------|---------|
| #1 | `accept` | Accept incoming TCP connections |
| #2 | `bind` | Bind socket to local address/port |
| #3 | `closesocket` | Close a socket |
| #4 | `connect` | Initiate TCP connection to server |
| #5 | `getpeername` | Get address of connected peer |
| #6 | `getsockname` | Get local socket address |
| #7 | `getsockopt` | Query socket options |
| #9 | `listen` | Listen for incoming connections |
| #10 | `ntohl` | Network-to-host byte order (32-bit) |
| #11 | `ntohs` | Network-to-host byte order (16-bit) |
| #13 | `recv` | Receive data from connected socket |
| #16 | `sendto` | Send data to specific address (UDP) |
| #17 | `setsockopt` | Set socket options (broadcast enable, address reuse) |
| #19 | `socket` | Create a new socket |
| #20 | `gethostbyaddr` | Reverse DNS lookup |
| #21 | `gethostbyname` | DNS hostname resolution |
| #22 | `gethostname` | Get local hostname |
| #23 | `WSAGetLastError` | Get last Winsock error code |
| #52 | `WSAStartup` | Initialize Winsock library |
| #57 | `WSACleanup` | Shutdown Winsock library |
| #101 | `WSAAsyncSelect` | Register async socket event notifications (FD_CONNECT, FD_CLOSE, etc.) |
| #111 | `WSARecvEx` | Extended receive with partial message detection |

#### Internal Architecture

**"QuickSocket" Abstraction Layer**: XDaemon wraps Winsock with an internal "QuickSocket" system that provides:
- Numbered socket instances (`ReallyQuickSocket-%d` windows)
- Automatic async event handling via hidden Windows message windows
- Per-socket receive buffers with size tracking
- Socket reinitialization support (`[Reinit]` operations)
- Oversize message detection with configurable callback

**Dual Transport Model**:
- **TCP/IP and IPX/SPX**: Handled natively via Winsock with QuickSocket abstraction
- **Modem and Serial**: Delegated to DirectPlay (`DPLAYX.dll`) which provides the transport, with XDaemon wrapping the DirectPlay session in its own API

**Connection Architecture**:
- Server-client model with connection IDs (server always ID 0)
- Broadcast channel for discovery (`XD_SendBroadcastData`)
- Secure (reliable) channel for game data (`XD_SendSecureData` with priority levels)
- UDP broadcast for LAN server discovery (`XD_SendUDPBroadcastData`)
- Ping protocol using `"XDPING"` magic string for latency measurement

**Threading**: Uses `CreateThread` and `WaitForMultipleObjects` for asynchronous operations, with `CriticalSection` for thread safety. Events (`CreateEventA`, `SetEvent`) coordinate async socket operations.

**Message Processing**: Uses Windows message pumping (`PeekMessageA`, `TranslateMessage`, `DispatchMessageA`) on hidden windows to receive Winsock async notifications (`FD_CONNECT`, `FD_CLOSE`, etc.). Timer-based polling (`SetTimer`, `KillTimer`) drives periodic operations.

#### IGZ (Internet Gaming Zone) Lobby Protocol

The library integrates with Microsoft's Internet Gaming Zone (IGZ) lobby system:
- `XD_LaunchedByLobby` checks if the game was launched from the IGZ lobby, fills a `LobbyLaunchInfo` structure
- `XD_LobbySendMessage` sends status messages back to the lobby (`DPLSYS_CONNECTIONSETTINGSREAD`, `DPLSYS_DPLAYCONNECTSUCCEEDED`, `DPLSYS_DPLAYCONNECTFAILED`)
- `XD_LaunchZone` opens the IGZ website in the default browser via `ShellExecuteA`
- DirectPlay Lobby interface (`DirectPlayLobbyCreateA`) provides the connection bridge

**LobbyLaunchInfo Structure** (from civ2.exe string analysis):
```
struct LobbyLaunchInfo {
    char IPAddr[32];        // IP address of server
    char LongName[64];      // Full game description
    char ShortName[32];     // Short game name
    char SessionName[64];   // Session identifier
    int  bHost;             // 1 = this instance is hosting
};
```

#### Error Code Table

| Code | Name | Meaning |
|------|------|---------|
| 0 | `XD_SUCCESS` | Operation completed successfully |
| — | `XDERR_NOTINITIALIZE` | Library has not been initialized |
| — | `XDERR_NULLSOCKET` | Socket reference is null |
| — | `XDERR_CANTREINITIALIZE` | Cannot reinitialize while active |
| — | `XDERR_FAILEDINIT` | Initialization procedure failed |
| — | `XDERR_SERVERFUNCTIONONLY` | Function requires server role |
| — | `XDERR_CLIENTFUNCTIONONLY` | Function requires client role |
| — | `XDERR_NOSERVERFOUND` | Server discovery found nothing |
| — | `XDERR_BADPARAMETERS` | Invalid parameters passed |
| — | `XDERR_CANNOTCONNECT` | Connection could not be established |
| — | `XDERR_TOOMANYUSERS` | Maximum player count reached |
| — | `XDERR_DISABLEDFEATURE` | Requested feature is disabled |
| — | `XDERR_FAILEDSEND` | Data transmission failed |
| — | `XDERR_WRONGMODE` | Operation invalid for current transport mode |
| — | `XDERR_NOCONNECTCB` | No connection callback has been registered |
| — | `XDERR_NOTSUPPORTED` | Feature not supported on this platform |
| — | `XDERR_UNKNOWNERROR` | Unclassified error |

Lobby-specific errors: `XLOBBYERR_NOTLOBBIED` (not launched from lobby), `XLOBBYERR_UNKNOWN` (unknown lobby error).

#### DirectPlay (Modem/Serial) Integration

For modem and serial connections, XDaemon delegates to Microsoft DirectPlay:

- Enumerates modems via `DirectPlayEnumerateA`
- Creates a DirectPlay interface via `DirectPlayCreate`
- Initializes COM (`CoInitialize`) for DirectPlay object creation
- Handles modem-specific errors: `DPERR_SENDTOOBIG`, `DPERR_NOTLOGGEDIN`, `DPERR_INVALIDPLAYER`, `DPERR_INVALIDPARAMS`, `DPERR_BUSY`
- Connection flow: `XDaemonModemClass` window → modem enumeration → session search → join or host → player ID exchange

The serial path is similar but bypasses modem enumeration, connecting directly through the COM port.

#### Registry Usage

XDaemon modifies Windows Internet settings to facilitate network games:

| Registry Path | Key | Purpose |
|---------------|-----|---------|
| `Software\MicroProse Software\XDaemonNet` | `ModifiedNet` | Flag: whether Internet settings were modified |
| `Software\MicroProse Software\XDaemonNet` | `OldSetting` | Backup of original `EnableAutodial` value |
| `...\Windows\CurrentVersion\Internet Settings` | `EnableAutodial` | Disables auto-dial during LAN games to prevent unwanted modem connections |

The library saves the original `EnableAutodial` setting before modifying it and stores the backup in its own registry key for restoration on shutdown.

#### Internal Window Classes

| Window Class | Purpose |
|-------------|---------|
| `QSocketWndClass` | Winsock async event receiver window |
| `StreamWindowClass` | Stream data handling for reliable transport |
| `ReallyQuickSocket-%d` | Per-socket instance message windows (numbered) |
| `XDSControlWindow-%d` | Control/management windows (numbered) |
| `XDaemonModemClass` | Modem connection management window |
| `XDSModemControlWindow` | Modem control interface window |
| `LikeSearchOrSomething` | Server search window (quirky developer name) |
| `ServerSearchWindow` | Server locator/broadcast listener window |

#### Logging System

XDaemon logs to `XDaemon.log` with timestamped entries:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
 Log file created and opened, HH:MM:SS on D-M-YYYY
(tick_count) log_message
```

Each log entry is prefixed with a tick count (milliseconds). The library logs all connection events, errors, socket operations, and protocol state changes. Log entries prefixed with `[Reinit]`, `[Modem]`, `[Serial]`, or `DPlay>` indicate subsystem-specific operations.

#### IPX Address Format

For IPX/SPX networking, addresses are displayed as: `NNNNNNNN:MMMMMMMMMMMM` where `N` = 4-byte network number and `M` = 6-byte node (MAC) address, both in hexadecimal. Adapter enumeration logs each network adapter with its full IPX address.

### Civ2Art.dll — Embedded Art Resource Container (Deep Dive)

Civ2Art.dll is a resource-only DLL that serves as a container for embedded GIF artwork used in the game's credits sequence and UI. Despite having 99 KB of code, it contains no meaningful game logic — the entire code section is statically linked MSVC **debug** C runtime.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:14 UTC |
| File version | None (no VERSION_INFO resource) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (~97 KB, virtually all CRT) |
| Resource size | 126,537 bytes (~124 KB) |
| Total file size | 256,512 bytes (250 KB) |
| Compiler | MSVC 5.0 or 6.0 (debug build) |

**Build date significance**: This DLL was built April 21, 1997 — almost two years before the MGE executable (April 8, 1999) and over a year before XDaemon.dll (November 10, 1998). It was carried forward unchanged from the original Civilization II or Fantastic Worlds expansion into the Multiplayer Gold Edition.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (statically linked debug CRT) |
| `.rdata` | `0x0001a000` | 7,640 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data (5.6 KB BSS) |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 126,537 | 126,976 | **GIF image resources** |
| `.reloc` | `0x00041000` | 5,096 | 5,120 | Relocation table |

#### Exports

The DLL exports exactly **one function**:

```
#1: _DllMain@12  (stdcall, 3 parameters)
```

Disassembly of `_DllMain@12`:
```asm
push ebp          ; standard prologue
mov  ebp, esp
push ebx / esi / edi
mov  eax, 1       ; return TRUE (always succeeds)
pop  edi / esi / ebx
leave
ret  12           ; stdcall cleanup (hinstDLL, fdwReason, lpvReserved)
```

This is a trivial DllMain that always returns `TRUE`. The DLL exists **purely as a resource container** — it has no functional code beyond the C runtime startup wrapper.

#### Imports

Only **KERNEL32.dll** (70 functions) — all standard MSVC C runtime dependencies. No graphics, UI, or game-related imports whatsoever.

Notable: The DLL was compiled with the **debug** C runtime statically linked, evidenced by:
- `"Detected memory leaks!"` string
- `"Dumping objects ->"` / `"Object dump complete."` 
- `"Bad memory block found at 0x%08X"` 
- `"DAMAGED"` diagnostic marker
- Full debug heap validation, assertion checking, and allocation tracking
- `"IsTNT"` Citrix check (MSVC 5.0/6.0 CRT signature)

This debug CRT accounts for ~95 KB of the 97 KB code section. The shipping product includes debug instrumentation — likely an oversight where the release build was not recompiled with the release CRT before final packaging.

#### Embedded GIF Resources

All resources use a custom resource type string `"GIFS"` (not a standard Windows resource type). All images are GIF87a format with 256-color palettes. Language ID: 1033 (English US).

| Resource ID | Dimensions | Size | Content |
|-------------|-----------|------|---------|
| **999** | 74×74 | 1,607 bytes | Gray UI panel — 8 shades of gray (palette indices 22–30, 110). Light gray rounded square used as a dialog/panel background element. **23 cross-references** in civ2.exe — the most heavily used resource. |
| **1000** | 640×240 | 10,658 bytes | Credits text overlay — golden text on transparent black: "Producer: Jeffery L. Briggs", "Game Design: Brian Reynolds", "Art Director: Michael Haire", "Original Civilization Design: Sid Meier with Bruce Shelley". 73 unique colors, 92.4% background. |
| **2000** | 640×240 | 3,665 bytes | Sparse starfield — nearly all black with a few scattered white dots. Base layer for scrolling credits. Only 3 unique colors. **5 cross-references** in civ2.exe. |
| **4000** | 640×240 | 84,018 bytes | **Main credits artwork** — Mesoamerican stone relief scene: a Mayan/Aztec warrior figure carved in stone alongside a map/codex element. Warm earth tones (browns, golds, tans). 255 unique colors. The largest resource at 82 KB. |
| **30000** | 640×240 | 4,770 bytes | Dense starfield — black background with many white star dots. Alternative/supplementary starfield layer, possibly for space victory or layered credits parallax. 18 unique colors. |

Total embedded art: **104,718 bytes** (~102 KB) across 5 GIF images.

#### How civ2.exe Loads Resources

The game dynamically loads Civ2Art.dll at runtime (it is **not** in the PE import table):

1. **Path construction**: Builds `"civ2\\civ2art.dll"` relative path (stored at VA `0x0062AF18` in .data)
2. **Dynamic loading**: `LoadLibraryA("civ2\\civ2art.dll")` → returns `HMODULE`
3. **Resource extraction**: `FindResourceA(hModule, MAKEINTRESOURCE(id), "GIFS")` → `HRSRC`
4. **Memory mapping**: `LoadResource(hModule, hRsrc)` → `HGLOBAL`, then `LockResource(hGlobal)` → pointer to raw GIF bytes
5. **Cleanup**: `FreeResource(hGlobal)` after use

The game imports `FindResourceA`, `LoadResource`, `LockResource`, and `FreeResource` from KERNEL32.dll for this purpose.

#### Cross-Reference Counts (from civ2.exe)

| Resource ID | Push Count | Likely Usage |
|-------------|-----------|-------------|
| 999 | 23 | Dialog backgrounds, UI panels (used throughout game) |
| 1000 | 2 | Credits screen text overlay |
| 2000 | 5 | Starfield layer (credits, possibly space screens) |
| 4000 | 2 | Credits artwork display |
| 30000 | 3 | Dense starfield layer |

Resource #999 (the gray panel) is referenced 23 times, suggesting it serves as a standard background element for multiple dialog windows and UI panels throughout the game.

#### Why a DLL for Art?

Packaging art in a DLL rather than loose files serves several purposes:
- **Single-file distribution**: Credits artwork travels as one file rather than 5 separate GIFs
- **Resource protection**: Slightly harder for users to casually modify credits/attribution
- **Clean directory**: Keeps the game directory uncluttered with internal art files
- **Windows resource API**: Leverages the standard `FindResource`/`LoadResource` API for efficient memory-mapped access

### Tiles.dll — Embedded Tile & UI Art Container (Deep Dive)

Tiles.dll is the largest DLL in the game at 1.38 MB, serving as a resource container for 24 GIF images used as tile backgrounds, sprite sheets, UI artwork, and historical illustrations. It is an **identical twin** of Civ2Art.dll in code — the `.text` and `.data` sections match byte-for-byte (100%).

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:13:31 UTC |
| File size | 1,416,704 bytes (1,383 KB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (identical to Civ2Art.dll) |
| Resource size | 1,283,136 bytes (~1.22 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build date**: Built 43 seconds before Civ2Art.dll (18:13:31 vs 18:13:14 UTC), confirming they were compiled in the same build session from the same source project — likely a template resource DLL project where only the `.rsrc` section content differs.

**Code identity**: `.text` section is 100.0% byte-identical to Civ2Art.dll. `.data` section is 100.0% identical. `.rdata` differs by only 34 bytes (0.4%) — solely the DLL name string `"Tiles.dll"` vs `"Civ2Art.dll"` in the export directory. Same trivial `_DllMain@12` (return TRUE), same debug CRT, same imports (KERNEL32.dll only, 70 functions).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll) |
| `.rdata` | `0x0001a000` | 7,638 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 1,283,136 | 1,283,584 | **GIF image resources (1.22 MB)** |
| `.reloc` | `0x0015c000` | 8,209 | 8,704 | Relocation table |

#### Embedded GIF Resources (24 total)

All resources use the custom `"GIFS"` resource type. All are GIF87a format, language ID 1033 (English US).

**Full-Screen Backgrounds (640×480) — Civilization Tile Art (#50–#66)**

These images use a distinctive red (RGB ~255,0,0) region as a transparency/chroma-key area, indicating the portions of each background that should be masked out when composited in-game. The visible artwork area varies per image.

| ID | Size | Content Description |
|----|------|-------------------|
| **50** | 80,447 | Church of the Holy Sepulchre, Jerusalem — domed religious architecture, stone buildings. Warm gray tones. |
| **51** | 56,941 | Conquistadors on horseback — world map background with mounted warriors in period armor. Gray/engraving style. |
| **52** | 51,675 | Byzantine/Medieval emperor — robed standing figure on world map background. Similar style to #51. |
| **53** | 52,730 | World map with historical figure — same base map, different overlaid character illustration. |
| **54** | 55,416 | World map with historical figure — continuation of the map/figure series. |
| **55** | 53,202 | World map with historical figure — continuation of the map/figure series. |
| **56** | 30,694 | Stonehenge — ancient stone monument photograph. Gray-scale. Smallest of the 640×480 backgrounds. |
| **57** | 47,584 | City fireworks celebration — modern cityscape at night with fireworks over waterfront. |
| **58** | 76,492 | Egyptian wall painting — ancient workers/artisans in traditional Egyptian art style. |
| **59** | 47,139 | Classical Greek/Roman column capital — Ionic column detail against mountain landscape. |
| **65** | 23,724 | Royal crown on world map — imperial/monarchy themed, smaller visible area (most area is red chroma key). |
| **66** | 45,681 | World map with royal crown — similar to #65, larger visible map area with crown in top-right. |

**Historical Illustrations (#70–#77) — Civilopedia/Event Art**

These are smaller, irregularly-sized images used in the Civilopedia encyclopedia entries and game event popups.

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **70** | 270×189 | 32,190 | Roman soldiers marching — engraving of armored troops before classical temple/forum. |
| **71** | 145×257 | 17,519 | Military parade formation — massed soldiers in ranks receding into distance. WWII era. |
| **72** | 261×194 | 27,653 | Storming of the Bastille — French Revolution engraving showing fortress under siege. |
| **73** | 230×198 | 23,147 | Solidarity protest — "Solidarność" banner visible, 1980s Polish labor movement. |
| **74** | 277×148 | 30,384 | Medieval Islamic art — illuminated manuscript style, mounted warrior with golden sun. |
| **75** | 178×262 | 35,058 | Ticker-tape parade — aerial view of American flags and crowds filling city street. |
| **76** | 290×176 | 18,175 | Pioneer wagon train — covered wagons with oxen crossing frontier landscape. |
| **77** | 197×294 | 19,010 | Construction crane — modern yellow tower crane against blue sky. |

**Sprite Sheets & UI Art (#85–#95)**

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **85** | 640×480 | 21,611 | **Nuclear explosion sprite sheet** — 12-frame animation sequence (6×2 grid) showing mushroom cloud from initial flash through expanding fireball to dissipation. Magenta borders separate frames. Used for nuclear attack animation. |
| **86** | 640×480 | 41,213 | **Government & diplomacy icon sheet** — Sprite atlas containing: government type icons (Anarchy Ω, Despotism ★, Monarchy ∞, Communism ☭, Republic, Democracy ψ) in both 3D rendered and flat styles; treaty state icons (Cease Fire, Peace, War, Old Alliance, Modern Alliance) with a bronze/silver coin; and diplomatic relation icons. Cyan background = chroma key. Labels: "GOVT ICONS", "TUTORIAL ICON HERE", "DIPLO BACK TILE HERE". |
| **90** | 530×480 | 80,029 | **Civilization II seal** — "IN OMNIA PARATUS" motto with classical allegorical figure (Athena/Minerva) holding staff, seated with shield, scroll, and bust of a philosopher. Ornamental circular border. Sepia tones. Used for title screen and Hall of Fame. |
| **95** | 640×480 | 99,889 | Medieval cavalry procession — detailed engraving of armored knights on horseback with banners and plumed helmets. Gray/sepia tones. Background art for high score or victory screen. |

#### Resource Loading

The game loads `TILES.DLL` by name (stored at exe offset `0x224ED4`), positioned near other art file references (`EDITORSQ.GIF`, `scredits.gif`). Like Civ2Art.dll, it is loaded dynamically via `LoadLibraryA` and resources are extracted via `FindResourceA`/`LoadResource`/`LockResource` using the `"GIFS"` type string and integer resource IDs.

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 24 |
| Total image data | 1,067,603 bytes (1,042 KB) |
| Full-screen backgrounds (640×480) | 14 images |
| Historical illustrations (mixed sizes) | 8 images |
| Sprite sheets / UI art | 2 images |
| Seal/title art | 1 image (530×480) |
| Large background art | 1 image (640×480) |
| Resource overhead (directory, CRT, PE) | ~349 KB (25% of file) |

### cv.dll — City View Art Container (Deep Dive)

cv.dll is the largest DLL in the game at 4.75 MB, containing all isometric 3D-rendered artwork for the City View screen — the detailed city display that shows buildings, wonders, and landscape. The name "cv" stands for **City View**. Like its sibling DLLs, it is a resource-only container with identical code to Civ2Art.dll and Tiles.dll.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:02 UTC |
| File size | 4,980,224 bytes (4.75 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 4,837,384 bytes (4.61 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build timing**: Built 31 seconds after Tiles.dll and 12 seconds before Civ2Art.dll in the same April 21, 1997 build session. All three DLLs share byte-identical `.text` and `.data` sections.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll/Tiles.dll) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 4,837,384 | 4,837,888 | **GIF image resources (4.61 MB)** |
| `.reloc` | `0x004c0000` | 17,757 | 17,920 | Relocation table |

#### Embedded GIF Resources (16 total, 3.84 MB image data)

All resources use the custom `"GIFS"` resource type. All are GIF87a format. The game loads `cv.dll` by name (stored at exe offset `0x225A08`, near diplomacy-related strings like `"GREETINGS"`, `"NUCLEARWEAPONS"`, `"YOURNUKES"`).

**City Improvement Building Sprites (#300)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **300** | 740×710 | 150,543 | **Building sprite sheet** — ~45 isometric 3D-rendered city improvement sprites in a 5×9 grid (cells ~124×83px). Includes: aqueduct, barracks, cathedral, colosseum, factory, marketplace, library, university, nuclear plant, airport, stock exchange, harbor, offshore platform, city walls, SDI defense, submarine pens, and more. Green/magenta borders mark sprite boundaries and chroma-key regions. |

**Wonder & Landmark Sprites (#305)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **305** | 640×1130 | 220,281 | **Wonder of the World sprite sheet** — ~30+ isometric wonder sprites in a variable grid. Includes: Apollo Program (rocket), Great Wall (panoramic, 2-cell wide), Pyramids, Hoover Dam, Eiffel Tower, Statue of Liberty (multiple angles/sizes), lighthouse, Shakespeare's Theatre, Darwin's Voyage statue, Women's Suffrage, United Nations, SETI dish, and more. Bottom section has extra-large sprites for Great Wall panorama and oversized wonders. |

**City Growth Vegetation (#310)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **310** | 640×680 | 148,196 | **Vegetation/population sprite sheet** — ~30 tree/forest cluster sprites in a 6×5 grid. Shows progressive city growth: from sparse trees (small population) to dense canopy with village buildings emerging underneath, then larger medieval/modern buildings visible through foliage. Each row appears to represent a different population density level. Green/magenta chroma key borders. |

**City View Landscape Panoramas (#340–#353)**

The core of cv.dll: 12 wide-format landscape backgrounds for the City View screen. Organized as **3 terrain types × 4 era variants**:

| Series | Terrain Type | Dimensions | Water Coverage | Avg Size |
|--------|-------------|-----------|----------------|----------|
| **#340–343** | **Coastal** (ocean shoreline) | 1280×480 | ~4.2% | 284 KB |
| **#345–348** | **Bay/Inlet** (sheltered water) | 1280×480 | ~1.4% | 294 KB |
| **#350–353** | **Inland** (all land, no water) | 1280×480 | 0.0% | 300 KB |

Within each terrain type, the 4 variants show subtle differences (3–8% pixel change between first and last):
- **Greenness decreases progressively** across variants: 53.7 → 51.7 → 50.8 → 49.0 (coastal series)
- **Brightness shifts slightly** between variants
- Changes are distributed uniformly across the image (not concentrated in any region)
- These likely represent **4 civilization eras** (Ancient → Classical → Industrial → Modern), matching the City View's era-dependent appearance

The base ID (#340) has 138 `mov` register references in civ2.exe, confirming it's the computed base value with offsets +0, +1, +2, +3 for era selection.

| ID | Size | Variant |
|----|------|---------|
| 340 | 283,683 | Coastal — Era 1 (most green/natural) |
| 341 | 288,322 | Coastal — Era 2 |
| 342 | 282,218 | Coastal — Era 3 |
| 343 | 281,379 | Coastal — Era 4 (least green) |
| 345 | 293,736 | Bay — Era 1 |
| 346 | 298,874 | Bay — Era 2 |
| 347 | 291,578 | Bay — Era 3 |
| 348 | 291,760 | Bay — Era 4 |
| 350 | 298,250 | Inland — Era 1 |
| 351 | 305,241 | Inland — Era 2 |
| 352 | 295,893 | Inland — Era 3 |
| 353 | 299,006 | Inland — Era 4 |

**Test Resource (#399)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **399** | 32×32 | 914 | Developer test image — gray square with the word "TEST" and a cursor icon. Placeholder/debug resource left in the shipping build. |

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 16 |
| Total image data | 4,029,874 bytes (3.84 MB) |
| Landscape panoramas | 12 images (3.41 MB, 85% of data) |
| Sprite sheets | 3 images (519 KB) |
| Test/debug | 1 image (914 bytes) |
| Panorama width | 1280px (2× game resolution for scrolling) |
| Chroma key colors | Magenta (255,0,255), Green (0,255,0) |

#### The Resource-Only DLL Family

All eight art DLLs share identical code (.text section) and were built within 98 seconds of each other on April 21, 1997:

| Property | mk | Wonder | Tiles | ss | pv | cv | Civ2Art | Intro |
|----------|-----|--------|-------|-----|-----|-----|---------|-------|
| Build time | 12:44 | 13:13 | 13:31 | 13:40 | 13:51 | 14:02 | 14:14 | 14:22 |
| Resource types | GIFS+CTAB | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS |
| Image count | 56+21 | 28 | 24 | 46 | 55 | 16 | 5 | 13 |
| Image data | 2.52 MB | 44 KB | 1.04 MB | 1.05 MB | 1.48 MB | 3.84 MB | 102 KB | 828 KB |
| **Total file** | **3.02 MB** | **182 KB** | **1.38 MB** | **1.39 MB** | **1.91 MB** | **4.75 MB** | **250 KB** | **1.10 MB** |

### mk.dll — Diplomacy & Leader Art Container (Deep Dive)

mk.dll is the diplomacy and leader portrait art container at 3.02 MB. The name likely stands for **"Make King"** or **"Monarch"**, reflecting its primary content: civilization leader portraits for the diplomacy screen. Unlike the other resource DLLs, mk.dll contains **two** custom resource types: `"GIFS"` for images and `"CTAB"` for color palettes.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:12:44 UTC |
| File size | 3,165,696 bytes (3.02 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 3,027,947 bytes (2.89 MB) |

**Build timing**: The earliest of the four resource DLLs (47 seconds before Tiles.dll). Same byte-identical `.text`/`.data` sections, same debug CRT, same trivial `_DllMain@12`.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to siblings) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 3,027,947 | 3,027,968 | **GIFS + CTAB resources (2.89 MB)** |
| `.reloc` | `0x00306000` | 12,895 | 13,312 | Relocation table |

#### Resource Type: CTAB — Color Palettes (21 resources)

A custom resource type unique to mk.dll. Each CTAB is exactly **773 bytes**: a 5-byte header followed by a 256-entry RGB color palette.

**CTAB Format:**
```
Offset 0-3:  00 00 00 00  (4-byte zero header)
Offset 4:    FF           (0xFF = 255, palette entry count marker)
Offset 5-772: 256 × RGB triplets (3 bytes each = 768 bytes)
```

| Resource IDs | Count | Purpose |
|-------------|-------|---------|
| #1000–#1020 | 21 | One custom color palette per civilization |

Each CTAB represents a **civilization-specific color palette** used to re-colorize the diplomacy screen elements (throne room, UI borders, leader portrait frame) to match the civilization's national colors. Palettes differ by ~38–54% of entries from each other, with the largest differences occurring at transitions between civilization art style groups. CTABs #1016 and #1017 are identical (likely two civs sharing the same palette).

**Palette structure** (from CTAB #1000):
- Indices 0–10: Standard Windows system colors (black, dark primaries, grays)
- Indices 11–40: Grayscale ramp (30 shades from near-black to white)
- Indices 41: Pure white
- Indices 42–106: Bright green `(4,255,4)` — chroma key / unused slots
- Indices 107–245: Civilization-specific colors (warm earth tones, skin tones, fabric colors, architectural hues)
- Indices 246–255: Standard Windows system colors (red, green, yellow, blue, magenta, cyan)

#### Resource Type: GIFS — Images (56 resources)

**Throne Room Backgrounds (#200–#206)**

Seven 640×480 full-screen backgrounds for the throne room screen. Each shows a stone wall interior with ornate window frames bearing the omega (Ω) symbol (representing the default/Anarchy government type). Different backgrounds correspond to different government types, providing the base layer upon which throne room decorations are composited.

| ID | Size | Content |
|----|------|---------|
| **200** | 127,061 | Throne room base — stone walls, two Ω-frame windows, magenta status bar area |
| **201** | 127,061 | Throne room variant (identical size to #200) |
| **202** | 122,882 | Throne room variant |
| **203** | 122,882 | Throne room variant (identical size to #202) |
| **204** | 129,316 | Throne room variant |
| **205** | 128,514 | Throne room variant |
| **206** | 124,705 | Throne room variant |

**Throne Room Decoration Sprites (#210–#211)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **210** | 638×334 | 68,875 | Throne room furniture/decoration sprite sheet — multiple decoration items arranged in a grid with magenta separators. Shows seated figure variations and ornamental objects. |
| **211** | 638×334 | 68,962 | Additional throne room decoration sprites — continuation of the decoration set. |

**Military Unit Buttons (#215)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **215** | 640×480 | 29,312 | Military unit type icon buttons — small button sprites in 4 color variants (gray/default, gold/active, blue/selected, silver/disabled). Each button shows a unit type symbol. Used in the military advisor and unit selection UI. Mostly magenta (chroma key) background. |

**Civilization Leader Portraits (#220–#261)**

The crown jewels of mk.dll: **42 leader portraits** at 227×277 pixels each, one for each civilization's two leaders (typically a male and female variant). Each portrait is a detailed artistic rendering in the visual style of the civilization it represents.

All portraits use cyan `(0,255,255)` as the chroma-key background color.

| ID Range | Count | Content |
|----------|-------|---------|
| **220–261** | 42 | 21 civilizations × 2 leader portraits each |

The portraits are rendered in diverse historical art styles — Roman mosaic medallions, Egyptian tomb paintings, medieval illuminated manuscripts, Aztec codex illustrations, Chinese ink paintings, photographic sepia portraits, and more. Each pair of portraits for a civilization uses a consistent artistic style matching that culture's visual tradition.

Total portrait data: ~1.25 MB (49% of all image data in the DLL).

**Small Icon Sheet (#299)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **299** | 64×64 | 2,188 | Dark embossed icon sheet — small symbols/glyphs on dark background. UI element icons. |

**Score & Advisor Screens (#10000–#10002)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **10000** | 640×480 | 39,343 | Hall of Fame / score background — dark theatrical stage with red curtains, spotlight effect, and a silver name plate at the bottom. Decorative skull/mask motifs in corners. |
| **10001** | 297×173 | 16,212 | Decorative stone frieze — ornamental border with skull reliefs and carved stone columns. Used as a UI frame element. |
| **10002** | 640×480 | 149,388 | Military advisor backdrop — elaborate still-life scene of historical weapons, armor, cannon, helmets, shields, swords, and flags arranged on a checkered floor, framed by red curtains. This is the background art for the military advisor screen. |

#### Resource Loading

The game references `mk.dll` at two locations in civ2.exe:
- `"civ2\\mk.dll"` at exe offset `0x22BAB9` (near civilization abbreviation strings: MON, CEL, JAP, VIK, SPA, PER, CAR, SIO)
- `"mk.dll"` at exe offset `0x22BBD8` (near `"VFWNOTREGISTERED"`)
- `"civ2\\mk.dll"` at exe offset `0x230AA5` (near `"SLAM"`)

#### Summary Statistics

| Metric | Value |
|--------|-------|
| CTAB palette resources | 21 (16 KB total) |
| GIF image resources | 56 (2.52 MB total) |
| Leader portraits (227×277) | 42 images (1.25 MB) |
| Throne room backgrounds (640×480) | 7 images (883 KB) |
| Sprite sheets | 3 images (167 KB) |
| Score/advisor screens | 3 images (205 KB) |
| Icon sheet (64×64) | 1 image (2 KB) |

### pv.dll — Palace View Art Container (Deep Dive)

pv.dll is the **Palace View** art container at 1.91 MB. The name stands for **"Palace View"**, confirmed by its single exe cross-reference at `0x225814` which appears immediately before the strings `THRONE` and `ADDTOTHRONE` — the palace-building minigame where players upgrade their palace after completing city improvements.

**PE Structure**: Identical to the other resource-only DLL siblings (100% code-identical .text section of 99,328 bytes containing debug CRT). Built **1997-04-21 18:13:51 UTC** — third of five siblings, 20 seconds after Tiles.dll and 11 seconds before cv.dll.

**Resources**: 55 embedded GIF images totaling 1.48 MB, all using the custom `"GIFS"` resource type. One base background at 640×480, all 54 sprites at 642×482 (the extra 2px border on each side likely aids compositing alignment).

#### Resource #100 — Palace Base Room (640×480, 134 KB)

The empty palace interior: a symmetrical stone hall with columns, pedestals, and a central plinth. This is the base canvas onto which all component sprites are composited. Unlike the sprites, it has **0% chroma-key** — it fills the entire frame. The sepia/brown palette establishes the stone architectural feel.

#### Palace Component System

The game's palace is built from **compositable sprite layers**, each with cyan chroma-key (`#04C5C5` or `#5AFFFE`) transparency. Components are organized into functional groups, with each group containing **4 variants** representing upgrade tiers (primitive → ornate). The `ADDTOTHRONE` string in the exe confirms the incremental upgrade mechanic.

**Structural Components** (groups of 4 tiers):

| ID Range | Component | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|----------|-----------|--------|--------|--------|--------|
| #105–108 | Wall (upper) | Cave rock | Cave rock (duplicate of #105) | Dark stone/spotlight | Woven brick |
| #110–113 | Floor | Dark cave earth | Rough stone | Polished tile (light) | Smooth sandstone |
| #115–118 | Wall overlays | Animal hide shapes | Dirt path runner | Dark mesh curtain | Patterned tile runner |
| #120–123 | Doorways | Rough cave opening | Rough stone arch | Smooth stone + light | Masonry + light |
| #125–128 | Corner decorations | Crossed-stick torch | Fan palm plant | Mesh curtain/drape | Pillar strips |
| #130–133 | Columns | Wood scaffolding/ladders | Simple post-and-lintel | Round arches on pillars | Ornate classical columns |
| #135–138 | Throne/Seat | Sleeping animal (rock) | Simple wooden stool | Stepped dais with throne | Dark ornate cabinet |
| #140–143 | Window arches | Pointed hide tent frame | Tall narrow posts | Gothic pointed arches | Round classical arches |

Note: #105 and #106 are **byte-identical** (74,478 bytes each) — a duplicate left in the shipping build, similar to the `#399 TEST` image in cv.dll.

**Decorative Accessories** (#160–166, 7 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #160 | Small vases/pots pair | 97.0% |
| #161 | Classical paintings triptych (religious/allegorical) | 79.1% |
| #162 | Grass/hedge strip segments | 93.1% |
| #163 | Grass/hedge border (shorter) | 97.6% |
| #164 | Small hedge border | 97.7% |
| #165 | Topiary trees pair | 96.4% |
| #166 | Boulder/rock decorations with floor tile | 85.2% |

**Furnishings & Architectural Details** (#170–184, 15 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #170 | Golden doorway/gate frame | 85.8% |
| #171 | Dark wooden doors pair with curtain headers | 80.7% |
| #172 | Small dark cabinet/screen | 91.5% |
| #173 | Trapezoid pedestal/base | 83.0% |
| #174 | Ornate gilded columns with entablature | 90.7% |
| #175 | Open sky/clouds visible through colonnade | 82.0% |
| #176 | Tiny square tile/block | 99.2% |
| #177 | Floor tile samples (3 variants) | 90.8% |
| #178 | Small decorative strip | 97.3% |
| #179 | Decorative furniture items row | 94.9% |
| #180–181 | Shelf/rail strips (2 variants) | 98–99% |
| #182–184 | Small shelf/rail details | 97–99% |

#### Compositing System

The palace view works by layering sprites onto the #100 base room:

1. **Base room** (#100, 640×480) — the empty stone hall canvas
2. **Wall textures** (#105–108) — fill the upper wall areas
3. **Floor textures** (#110–113) — replace the base floor
4. **Structural elements** (doorways, columns, windows, overlays) — composited with chroma-key
5. **Throne** (#135–138) — placed at center
6. **Decorative accessories** (#160–184) — scattered throughout

All sprites use **642×482** dimensions (1px larger border on each side than the 640×480 base), suggesting the compositing engine uses the extra pixels for alignment or anti-aliasing bleed.

#### Chroma-Key Colors

Two distinct cyan values are used across the sprite set:
- **#04C5C5** (R:4, G:197, B:197) — used in lower-tier sprites (#105–143)
- **#5AFFFE** (R:90, G:255, B:254) — used in higher-tier and decorative sprites (#170–184)

This dual-palette split may reflect two different artists or two production passes during development.

#### Exe Cross-References

Single reference at `0x225814`: `pv.dll` appears alongside `THRONE`, `ADDTOTHRONE`, and Civilopedia section keys (`@ADVANCE_INDEX`, `@IMPROVEMENT_INDEX`, etc.), placing it in the game's content loading and Civilopedia subsystem.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Base room background | 1 image (640×480) | 134 KB |
| Structural components (4-tier groups) | 32 images (642×482) | 905 KB |
| Decorative accessories | 7 images (642×482) | 108 KB |
| Furnishings & details | 15 images (642×482) | 82 KB |
| **Total** | **55 images** | **1.48 MB** |

### ss.dll — Spaceship Art Container (Deep Dive)

ss.dll is the **Spaceship** art container at 1.39 MB. The name stands for **"Space Ship"** — this is the art for the spaceship construction screen, one of the game's victory conditions where players build a spacecraft to reach Alpha Centauri. Confirmed by its exe cross-reference at `0x22D2E4` which appears alongside `"civ2\\video\\launch.avi"` and localized launch button text (`"Starten"` = German, `"Lancer"` = French).

**PE Structure**: Identical code sibling — 100% .text match with the other four resource-only DLLs. Built **1997-04-21 18:13:40 UTC** — second of five siblings (9 seconds after mk.dll, 11 seconds before pv.dll).

**Resources**: 46 embedded GIF images totaling 1.05 MB, all using the custom `"GIFS"` resource type.

**Chroma-key color**: **Orange #E36F1F** (R:227, G:111, B:31) — uniquely different from the cyan chroma used in pv.dll, mk.dll, and cv.dll. Some images also use **magenta #FF00FF** as a secondary transparency color.

#### Assembled Spaceship Views (#400–440, 24 images, 640×480)

These are pre-rendered views of the spaceship at progressive stages of assembly, displayed to the player in the spaceship construction screen. File sizes increase monotonically from 19 KB (#400) to 45 KB (#440), reflecting the growing visual complexity as more components are added:

- **#400–404** (5 images): Initial assembly — minimal structure, ~5% content (rest is chroma-key)
- **#406–418** (7 images, even IDs): Structural spine additions, growing from ~6% to ~8% content
- **#421–430** (8 images): Module and component additions, ~9–13% content
- **#433–440** (4 images, step-3 IDs): Final assembly stages, reaching ~17% content

The spaceship appears as a metallic blue-grey structure oriented diagonally (upper-left to lower-right) against the orange chroma-key background, with progressively more pods, panels, and structural members attached.

#### Component Sprite Sheets (#441–491, 11 images in 5 paired sets + 1 solo)

Individual spaceship components rendered as sprite strips with numbered left/right variants (labeled "1L, 1r, 2L, 2r..." etc. in magenta text overlays). Each pair consists of an **A variant** (detailed/3D rendered) and a **B variant** (simplified/placeholder rendering of the same shapes).

| IDs | Dimensions | Component Type | Sprites per sheet |
|-----|-----------|---------------|-------------------|
| #441/#442 | 695×110 | Solar panel arrays — triangular/wedge shapes with green panel faces | ~16 (8 L/R pairs) |
| #455/#456 | 905×104 | Structural beams — elongated metallic/wooden beam segments | ~16 (8 L/R pairs) |
| #470/#471 | 290×85 | Habitation modules — round pod/capsule shapes | ~4 |
| #480/#481 | 411×78 | Component segments — cylindrical tube pieces | ~8 (4 L/R pairs) |
| #489/#490 | 550×120 | Brackets/connectors — curved mounting hardware | ~8 (4 A/B pairs) |
| #491 | 750×101 | Structural details — small antennas, struts, solar cells, framework | ~30+ sprites |

#### UI & Scene Art (#497–499, 3 images)

| ID | Dimensions | Description |
|----|-----------|-------------|
| #497 | 640×480 | **Status indicator lights** — 6 small LED-style buttons (2×3 grid) in green/red/amber states, positioned at top-left corner with rest as chroma-key. Used to show component readiness status. |
| #498 | 640×240 | **Alpha Centauri arrival scene** — half-height deep space background with a reddish-brown planet (Alpha Centauri destination) against starfield. Shown upon successful spaceship arrival. |
| #499 | 640×480 | **Earth from orbit** — full-screen view of Earth showing continents, ocean, cloud formations and a cyclone. Shown as the launch departure scene. |

#### Thruster Animation (#20000–20007, 8 frames, 640×480)

An 8-frame animation sequence of rocket thruster exhaust, used during the spaceship launch cinematic. Content grows from 0.6% (#20000, tiny spark) to 3.6% (#20007, full thruster plume), showing cyan-green flame sprites against orange chroma-key. The small sprites grow larger across the sequence, creating the ignition → full-thrust animation.

#### Exe Cross-References

Single reference at `0x22D2E4`: the string `"ss.dll"` appears near:
- `"S.S. "` — spaceship label prefix (as in "S.S. Enterprise")
- `"civ2\\video\\launch.avi"` — the launch cinematic video file
- `"Starten"` / `"Lancer"` — German/French localized "Launch" button text
- `"0,000"` — numeric display format (likely for travel time/distance)

This places ss.dll firmly in the spaceship construction and launch subsystem, with `launch.avi` being the FMV that plays when the player launches their completed spaceship.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Assembled spaceship views (640×480) | 24 images | 678 KB |
| Component sprite sheets (various) | 11 images | 185 KB |
| UI status lights | 1 image | 12 KB |
| Space scene backgrounds | 2 images | 118 KB |
| Thruster animation frames | 8 images | 90 KB |
| **Total** | **46 images** | **1.05 MB** |

### Intro.dll — Intro Sequence Art Container (Deep Dive)

Intro.dll is the **intro slideshow** art container at 1.10 MB. It holds the historical images displayed during the game's opening sequence — a slideshow of civilization-themed photographs and engravings shown once when the game first launches. Confirmed by its exe cross-reference at `0x232A2C` (`"civ2\\intro.dll"`) which appears immediately before the window class name `"Civilization II Once Only"`, indicating a one-time display window.

**PE Structure**: The seventh and **final** code-identical sibling DLL. Built **1997-04-21 18:14:22 UTC** — 8 seconds after Civ2Art.dll, completing the 98-second build run that started with mk.dll at 18:12:44. 100% .text match (99,328 bytes of debug CRT).

**Resources**: 13 embedded GIF images totaling 828 KB, all using the custom `"GIFS"` resource type.

#### Visual Style

All images except #901 are framed with a **painted gold picture frame** border (~3–5px wide, gradient from R:211,G:123,B:47 to R:239,G:163,B:7), giving each image the appearance of a museum painting or gallery exhibit. This fits the intro's theme of presenting human civilization as a curated exhibit of historical moments.

#### Image Catalog

**#901 — Satellite View (376×227, 40 KB)**

Aerial/satellite view of the Nile Delta, Red Sea, and Arabian Peninsula — the "Cradle of Civilization" region. The only image without a gold frame, and the only one at its particular dimensions. Likely serves as the opening or transitional image in the slideshow.

**#902–905 — Historical Engravings, Wide Format (583×257, ~89 KB avg)**

| ID | Description |
|----|-------------|
| #902 | Colonial-era city map/plan showing a port settlement with street grid and waterway |
| #903 | Monumental stone guardian statue (East Asian, likely Chinese Ming Dynasty tomb figure) — largest file at 119 KB |
| #904 | 19th-century engraving of diverse ancient peoples in an encounter scene |
| #905 | Horsemen and explorers near pyramids — Napoleonic-era Egyptian expedition style |

Note: #902 and #904 share the same file size (89,348 bytes) but are **not** byte-identical — they contain completely different images that happen to compress to the same GIF size.

**#906–909 — Historical Engravings & Architecture (584×258, ~66 KB avg)**

| ID | Description |
|----|-------------|
| #906 | Middle Eastern/Ottoman peoples in traditional dress (ethnographic engraving) |
| #907 | Diverse Asian and African peoples in traditional costume (ethnographic engraving) |
| #908 | Photograph of Chinese palace building — the Palace Museum (故宫博物院) at the Forbidden City |
| #909 | Naval battle with burning/sinking ships (19th-century warfare engraving) |

Note: Dimensions are 584×258 — exactly 1px wider and 1px taller than the #902–905 group, suggesting these two sets were prepared in slightly different production passes.

**#910–913 — Natural Landscapes (406×258, ~41 KB avg)**

| ID | Description |
|----|-------------|
| #910 | Grand Canyon — layered red rock formations |
| #911 | Monument Valley — desert butte with distant mesa |
| #912 | Aerial view of an island (tropical atoll or volcanic island) |
| #913 | Alpine mountain lake with snow, pine forest, and reflected peaks |

These narrower landscape photographs likely appear in a different panel position during the slideshow, or are composited alongside the wider historical images.

#### Thematic Progression

The images trace civilization's arc across three visual themes:

1. **Geography & Origin** (#901, #910–913): The physical world — satellite views, canyons, mountains, islands, lakes
2. **Peoples & Culture** (#902–907): Human societies — city planning, monumental art, diverse peoples in traditional dress, exploration
3. **Power & Conflict** (#908–909): Architecture of power (Forbidden City) and warfare (naval battle)

#### Exe Cross-References

Single reference at `0x232A2C`: `"civ2\\intro.dll"` appears near:
- `"Civilization II Once Only"` — the window class name for the one-time intro display
- `"MSWindowClass"` — base Windows class for the intro window
- `"ENTER WINDOW DRAG"` / `"EXIT WINDOW DRAG"` — window interaction events
- Government-related strings (`PICKGOVT`, `NEWGOVT`, `DEMOCRATS`, `OVERTHROWN`) — suggesting the intro code shares a module with the government transition system

A separate exe reference at `0x229F2C` shows `"civ2\\video\\opening.avi"` — the FMV intro video that plays before or after this slideshow sequence.

#### Build Family Position

Intro.dll completes the resource-only DLL build session:

| Order | DLL | Time | Content |
|-------|-----|------|---------|
| 1st | mk.dll | 18:12:44 | Diplomacy & leaders |
| 2nd | Tiles.dll | 18:13:31 | Tile & UI art |
| 3rd | ss.dll | 18:13:40 | Spaceship |
| 4th | pv.dll | 18:13:51 | Palace view |
| 5th | cv.dll | 18:14:02 | City view |
| 6th | Civ2Art.dll | 18:14:14 | Credits art |
| **7th** | **Intro.dll** | **18:14:22** | **Intro slideshow** |

Total build time: **98 seconds** for all 7 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Satellite/aerial view (376×227) | 1 image | 40 KB |
| Historical engravings, wide (583×257) | 4 images | 388 KB |
| Historical/architectural (584×258) | 4 images | 263 KB |
| Natural landscapes (406×258) | 4 images | 166 KB |
| **Total** | **13 images** | **828 KB** |

### Wonder.dll — Wonder Indicator Art Container (Deep Dive)

Wonder.dll is the **smallest** of the resource-only DLL family at just 182 KB. It contains 28 small indicator panels used in the wonder tracking UI — one panel for each of the game's 28 buildable Wonders of the World.

**PE Structure**: The second sibling built in the family. Built **1997-04-21 18:13:13 UTC** — 29 seconds after mk.dll, 18 seconds before Tiles.dll. 100% .text match (99,328 bytes of debug CRT) with all other siblings.

**Resources**: 28 embedded GIF images (#20000–#20027) totaling 44 KB, all using the custom `"GIFS"` resource type. Every image is exactly **74×74 pixels** and exactly **1,607 bytes** — remarkably uniform.

#### The 28 Wonder Panels

Each image is a small gray stone-textured panel (interior avg RGB: 224,224,224) with a subtly tinted **colored border frame** (~2px wide). The panels serve as wonder status indicators in the game's wonder tracking interface, likely displayed in a grid showing which wonders have been built and by whom.

Despite all being 1,607 bytes and 74×74 pixels, all 28 images are **unique** — they differ by approximately 610 bytes each, with the differences concentrated in the border pixels. The border colors form a spectrum:

| Hue Family | Wonder IDs | Border RGB Example | Count |
|------------|-----------|-------------------|-------|
| Blue/Purple | #20000, 03, 05–08, 10–12, 14–17, 20–21, 25–27 | (163,152,179) | 18 |
| Pink/Red | #20001, 04, 09, 13, 18–19, 22–23 | (179,163,171) | 8 |
| Neutral Gray | #20002, 24 | Pure gray | 2 |

The color tinting likely encodes a default or thematic color for each wonder, with the game engine further recoloring these panels at runtime to match the civilization that built each wonder.

These panels are visually identical to the **#999 panel** in Civ2Art.dll (also 74×74 gray), which has 23 cross-references in the exe and serves as the generic/empty version. Wonder.dll provides the 28 wonder-specific variants.

#### Relationship to Wonder Videos

The exe cross-reference at `0x22CA84` shows the loading path:
- `"civ2\\wonder.dll"` — this DLL (indicator panels)
- `"civ2\\video\\wonder"` + `".avi"` — individual wonder construction videos

The wonder video subsystem constructs paths like `civ2\video\wonder001.avi` through `wonder028.avi`, each being a short FMV that plays when a wonder is completed. The nearby string `"VFWNOTREGISTERED"` (Video for Windows) handles the case where the video codec isn't installed.

Also nearby: `"Failed to load civ2art.gif"` — a fallback error message confirming Wonder.dll is loaded as part of the art resource chain.

#### Wonder-Related Game Events

The exe contains extensive wonder event strings, revealing the full wonder lifecycle:

| Event | String | Description |
|-------|--------|-------------|
| Start building | `STARTWONDER` | Player begins wonder construction |
| Switch production | `SWITCHWONDER` | Change which wonder is being built |
| Abandon | `ABANDONWONDER` | Cancel wonder construction |
| Complete | `ENDWONDER` | Wonder finished — triggers video |
| Almost done | `ALMOSTWONDER` | Near completion warning |
| Still building | `STILLWONDER1`, `STILLWONDER2` | Progress updates |
| Captured | `CAPTUREWONDER` | City with wonder captured |
| Lost | `LOSTWONDER` | Wonder lost to enemy |
| Acquired | `NM_ACQUIRE_WONDER` | Network message: wonder acquired |
| No exchange | `NOEXCHANGEWONDER` | Can't trade wonder in diplomacy |
| Don't play videos | `DONTPLAYWONDERS` | Config flag to skip wonder videos |

#### Build Family Position (Corrected)

Wonder.dll slots in as the **second** sibling, correcting the previous 7-sibling count to **8 siblings**:

| Order | DLL | Time | Δ |
|-------|-----|------|---|
| 1st | mk.dll | 18:12:44 | — |
| **2nd** | **Wonder.dll** | **18:13:13** | **+29s** |
| 3rd | Tiles.dll | 18:13:31 | +18s |
| 4th | ss.dll | 18:13:40 | +9s |
| 5th | pv.dll | 18:13:51 | +11s |
| 6th | cv.dll | 18:14:02 | +11s |
| 7th | Civ2Art.dll | 18:14:14 | +12s |
| 8th | Intro.dll | 18:14:22 | +8s |

Total build session: **98 seconds** for all 8 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Wonder indicator panels (74×74) | 28 images | 44 KB |
| **Total** | **28 images** | **44 KB** |

### timerdll.dll — SMEDS Engine Timer Callback DLL (Deep Dive)

timerdll.dll is the game's **high-resolution timer** DLL — and it is fundamentally different from every other DLL in the Civ2 distribution. While the 8 resource-only siblings are art containers with trivial code, timerdll.dll is the opposite: a **pure code DLL** with no resources, providing the SMEDS engine's multimedia timer infrastructure.

**PE Structure**: No .rsrc section. Internal export name is **`CALLBACK.dll`** (its original name before being renamed for shipping). Built **1997-03-17 21:39:57 UTC** — a full **35 days before** the resource DLL family (April 21, 1997), confirming it was developed independently as part of the SMEDS32 engine.

| Property | Value |
|----------|-------|
| File size | 131,072 bytes (128 KB) |
| Build date | March 17, 1997, 21:39:57 UTC |
| Internal name | `CALLBACK.dll` |
| Build config | **Debug** (shipped with debug CRT, assertions enabled) |
| Source path | `D:\SS\Smeds32\timer\Debug\timer.pdb` |
| Build output | `timer\Debug/timer.dll` (note mixed path separators) |
| .text size | 99,840 bytes |
| Actual timer code | **~464 bytes** (0.5% of .text) |
| Debug CRT overhead | ~99 KB (99.5% of .text) |
| Sibling code match | **26.8%** (different CRT build, NOT a sibling) |

#### Exports (6 functions)

| Export | Purpose |
|--------|---------|
| `TimerCallBack` | Main callback invoked by multimedia timer — looks up timer slot, checks notification flag, calls `timeGetTime`, posts message to game window |
| `SetTimerID` | Stores a timer handle into slot N of the 16-slot ID array |
| `GetTimerID` | Retrieves the timer handle from slot N |
| `GetTimerIndex` | Searches all 16 slots for a matching timer handle, returns the index |
| `ResetTimerNotified` | Clears the notification flag for a given timer slot |
| `WEP` | Windows Exit Procedure — Win16 compatibility stub, returns 1 |

#### Imports (3 DLLs, 72 functions)

| DLL | Function | Purpose |
|-----|----------|---------|
| `WINMM.dll` | `timeGetTime` | High-resolution multimedia timer (millisecond precision) |
| `USER32.dll` | `PostMessageA` | Sends asynchronous window messages |
| `KERNEL32.dll` | 70 functions | Standard C runtime (debug build) |

#### Timer Architecture

The DLL implements a **callback-to-message bridge**: Windows multimedia timers fire callbacks in a separate thread context, but Civ2's game logic runs on the main UI thread. This DLL solves the threading problem by converting timer callbacks into Windows messages posted to a hidden window.

**Data structures** (in .data section):
- `TimerID[16]` — array of 16 DWORD timer handles (at RVA 0x1F380)
- `NotifiedFlag[16]` — array of 16 DWORD notification flags (at RVA 0x1F3F0)
- Maximum of **16 concurrent timers**

**TimerCallBack flow**:
1. Called by WINMM when a multimedia timer fires
2. `GetTimerIndex(timerID)` — linear search through 16 slots to find matching handle
3. Check `NotifiedFlag[slot]` — skip if already notified (prevents message flooding)
4. `timeGetTime()` — get current millisecond timestamp
5. `PostMessageA(hWnd, 0x052C, slotIndex, currentTime)` — post to game window
   - Message **0x052C** = `WM_USER + 300` (custom timer notification)
   - wParam = timer slot index (0–15)
   - lParam = current time in milliseconds
6. Set `NotifiedFlag[slot] = 1` — mark as notified until game resets it

**Cleanup function**: Iterates all 16 slots, zeroing both `TimerID` and `NotifiedFlag` arrays.

#### Exe-Side Client (Pctimer.cpp)

The exe contains the consumer code in `D:\Ss\Smeds32\Pctimer.cpp`, which:
- Dynamically loads `timerdll.dll` via `LoadLibraryA` / `GetProcAddress` for all 5 callback functions
- Creates a hidden window with class **`MSMrTimerClass`** and title **`MrTimer`** to receive timer messages
- Handles three error conditions:
  - `ERR_DYNAMICLINKFAILED` — timerdll.dll couldn't be loaded or exports not found
  - `ERR_CANTCREATEWINDOW` — hidden timer window creation failed
  - `ERR_TIMERSETFAILED` — multimedia timer couldn't be started

#### Three Names, One DLL

This DLL has accumulated three different names through its development:
1. **CALLBACK.dll** — the original internal export name (earliest development name)
2. **timer.dll** — the build output name (`timer\Debug/timer.dll`)
3. **timerdll.dll** — the shipping name (renamed to avoid conflicts with system DLLs)

#### Build Date Significance

At March 17, 1997, timerdll.dll is the **oldest DLL** in the Civ2 MGE distribution:

| DLL | Build Date | Age vs. timerdll |
|-----|-----------|-----------------|
| **timerdll.dll** | **1997-03-17** | **baseline** |
| Resource DLLs (×8) | 1997-04-21 | +35 days |
| XDaemon.dll | 1998-11-10 | +603 days |

This is consistent with timerdll.dll being a **reusable SMEDS engine component** built once and never recompiled, while the resource DLLs were rebuilt fresh for the April 1997 release and XDaemon.dll was added later for MGE multiplayer.

### Source Code Structure

Debug strings preserve the original source tree:

**Game code** (`D:\Ss\Franklinton\`):

| Source File | Purpose |
|-------------|---------|
| `Difference Engine.cpp` | Multiplayer state synchronization — RLL-compressed delta encoding of game state |
| `Grey.cpp` | Grayscale palette and color management for BMP loading |
| `Map.cpp` | Map operations with server/client authority checking |
| `NetMgr.cpp` | Network manager core — protocol init, connection lifecycle |
| `NetMgr Poll.cpp` | Network receive polling loop, message dispatch, client transfer on host migration |
| `NetMgr Send.cpp` | Outbound message sending with socket validation |
| `NetMessageQueue.cpp` | Dual message queue (Alpha priority queue [0,400) + Primary queue [400,MAX)) |
| `Popup_1.cpp` | Dialog/popup system (stack depth limit: 16) |
| `Unit.cpp` | Unit lifecycle — creation, deletion, stacking, movement, with infinite-stack repair |
| `parleywin.cpp` | Diplomacy window UI |
| `parleywin add dialog.cpp` | Diplomacy dialog construction (LEFT/RIGHT panel layout) |
| `parleywin transaction.cpp` | Diplomacy transaction protocol (max 2048 char descriptions) |
| `startup LAN.cpp` | LAN game initialization with network type validation |
| `startup joinbox.cpp` | Game join dialog |
| `startup multiplayer.cpp` | Multiplayer setup flow |
| `startup playerbox.cpp` | Player selection with IGZ lobby integration |

**SMEDS Engine** (`D:\Ss\Smeds32\`):

| Source File | Purpose |
|-------------|---------|
| `Port.cpp` | Graphics surface abstraction — loads BMP, GIF, PCX, TGA, and LBM/IFF (Amiga) formats |
| `dd.cpp` | DirectDraw wrapper — surface creation, palette management, hardware capability detection |
| `ddcntrl.cpp` | DirectDraw UI control widgets |
| `Pcmem.cpp` | Memory management |
| `Pctimer.cpp` | Timer system via external `timerdll.dll` (exports: `TimerCallBack`, `SetTimerID`, `GetTimerID`, `GetTimerIndex`, `ResetTimerNotified`) |

The engine name "SMEDS" likely stands for **Sid Meier's Entertainment/Development System** — it's a reusable game framework with its own windowing system (`MSWindowClass`, `MSControlClass`, `MSScrollBarClass`, etc.), sprite engine, and multimedia playback. The log system writes to `smeds.log`.

### Difference Engine — Multiplayer State Sync

The "Difference Engine" (`Difference Engine.cpp`) is the multiplayer state synchronization system. It works by maintaining a mirror of the full game state and transmitting compressed deltas:

- **State blocks**: `btGame` (full game state) and `btMapStruct` (map structure)
- **Compression**: RLL (Run Length Limited) encoding via `RLLEncode` / `RLLBufferDecode`
- **Constraints**: `mirrorLength % sizeof(long) == 0` (state must be DWORD-aligned), diffs capped at `DIFF_ENGINE_MESSAGE_LENGTH`
- **Network messages**: `NM_FULL_GAMESTATE`, `NM_DIFF_GAMESTATE`, `NM_JOIN_GAMESTATE`, `NM_DIFFERENCE_ENGINE`, `NM_ALPHA_DIFFERENCE_ENGINE`

This confirms the in-memory game state is a flat, serializable structure — the same layout that gets written to `.SAV` files.

### Network Protocol Messages (155 total)

The game defines approximately 155 network message types for multiplayer synchronization. They reveal the complete internal game architecture:

**Map & Tile State (17 messages):**
`NM_TERRAIN_SET`, `NM_SEEN_SET`, `NM_OWNER_SET`, `NM_REGION_SET`, `NM_CITY_USING_SET`, `NM_FEATURE_SET`, `NM_FEAT_LOC_SET`, `NM_SITE_SET`, `NM_MAP_STRUCT`, `NM_MAP_PACKETS`, `NM_DO_APOLLO`, `NM_LOCK_MAP`, `NM_UNLOCK_MAP`, `NM_LOCK_MAP_ACK`, `NM_UNLOCK_MAP_ACK`, `NM_LOCK_MAP_SYNC`, `NM_DRAW_MAP_REGION`

These confirm the per-tile data fields we identified in the save format:
- **TERRAIN** → Byte 0 (terrain type + features)
- **SEEN** → Byte 3 (visibility/exploration bitmask)
- **OWNER** → Territory control
- **CITY_USING** → Byte 4 (which city is working this tile)
- **REGION** → Byte 5 (continent/region ID)
- **FEATURE** / **FEAT_LOC** → Byte 1–2 (improvements + locations)
- **SITE** → Special site markers

**Unit Operations (27 messages):**
Full unit lifecycle: `CREATE_UNIT` / `UNIT_CREATED`, `DELETE_UNIT` / `UNIT_DELETED`, `PICK_UP_UNIT` / `UNIT_PICKED_UP`, `PUT_DOWN_UNIT` / `UNIT_PUT_DOWN`, `RELOCATE_UNIT`, `MOVE_TO_BOTTOM`, `STACK_SHIP` / `STACK_UNIT`, `BRIBED_UNIT`, `DEATH_STACK`, `DELETE_SAFELY` / `DELETE_VISIBLY`, `AI_MOVEMENT`, `HUMAN_MOVEMENT` / `HUMAN_MOVE_COMPLETE`, `SLIDE_PIECE`, `REALTIME_STACKER`

**City Operations (17 messages):**
`CREATE_CITY` / `CITY_CREATED`, `DELETE_CITY` / `CITY_DELETED`, `ACQUIRE_WONDER` / `WONDER_ACQUIRED`, `PRODUCTION_BEGIN` / `PRODUCTION_COMPLETE`, `CITYWIN_CHECK_UNIT`, `CITYWIN_CHECK_CITY`, `CITYWIN_DELETED`, `CITYWIN_REDRAW`, `REVEAL_CITY_INFO` / `HIDE_CITY_INFO`, `REVEAL_CITY_ORIGIN` / `HIDE_CITY_ORIGIN`

**Diplomacy (26 messages):**
Full diplomacy protocol: `SET_ATTITUDE`, `SET_CIV`, `NEW_CIV` / `KILL_CIV` (with ACKs), `KINGDOM_RATES`, `TAX_CHECK`, `PICK_GOVT`, `POLITICAL_VIOLATIONS`, `POLITICAL_ATTITUDE`, `PARLEYREQUEST_REPLY` / `PARLEYREQUEST_CANCEL`, `PARLEY_TRANSACTION`, `PARLEY_ACCEPT_OFFER`, `PARLEY_NO_THANKS`, `PARLEY_COUNTER_OFFER`, `PARLEY_EXECUTE`, `DO_AIPARLEY`, `PRETEXT`, `CIVILIZATION_PING`

**Game Event Popups (~70 NM_POP_* messages):**
Every in-game event that triggers a popup notification has its own message type, including: `RETIREDIE`, `BARBARIANS`, `GLOBALWARMING`, `EAGLEHASLANDED`, `SPACELAUNCHED`, `SPACERETURNS`, `SPACEDESTROYED`, `DESTROYED`, `CARAVAN`, `STARTWONDER`, `CAPTUREWONDER`, `CITYCAPTURE`, `PARTISANS`, `PROMOTED`, `BOND007`, `PEARLHARBOR`, `CIVILWAR`, `MANHATTAN`, `GOLDENAGE`, `SPY_ESTABLISHEMBASSY`, `SPY_STOLENCIV`, `SPY_SABOTAGE1`, `SPY_PLANTNUKE`, etc.

### Anti-Piracy / Encryption Block

The `.data` section at VA `0x00227458` contains a 384-byte block with the plaintext marker:

```
PLAINTEXT TARGET
BYTE REPLACEMENT OF THIS BLOCK WITH PUBLIC-KEY CYPHERTEXT
```

This is a placeholder for a public-key encryption check — likely a copy protection mechanism where the block would be encrypted in retail copies and decrypted at runtime to verify authenticity. The block in this installation contains the unencrypted placeholder text.

### CIV.INI Configuration Settings

The game reads/writes settings from `CIV.INI` under the section `[Civilization Gold]`:

| Setting | Default | Purpose |
|---------|---------|---------|
| `Language Preference` | English | UI language (English, Francais, Deutsch) |
| `Simultaneous` | — | Simultaneous turns mode toggle |
| `MaxPlayers` | — | Maximum players in multiplayer |
| `Herald Warning Shown` | 0/1 | Whether the herald warning has been displayed |
| `ChatShowSize` | 8192 (or 57344) | Chat log display buffer size |
| `Window Name` | — | Application window title |
| `Adapter` | 0 | Network adapter index |
| `NetTimeOut` | 30 | General network timeout (seconds) |
| `INTERNET Timeout` | 60 | Internet game timeout (seconds) |
| `TCPIP Timeout` | 15 | LAN TCP/IP timeout (seconds) |
| `IPXSPX Timeout` | 15 | IPX/SPX timeout (seconds) |
| `MODEM Timeout` | 30 | Modem game timeout (seconds) |
| `DIRECT Timeout` | 30 | Direct serial connection timeout (seconds) |

Registry path: `Software\MicroProse Software\Civilization II Multiplayer Gold Edition` (constructed from `Software\%s\%s`).

### Network Protocol Support

| Protocol | Transport | Timeout | Init Function |
|----------|-----------|---------|---------------|
| Internet | TCP/IP | 60s | `XD_InitializeSocketsTCP` |
| LAN | TCP/IP | 15s | `XD_InitializeSocketsTCP` |
| IPX/SPX | IPX | 15s | `XD_InitializeSocketsIPXSPX` |
| Modem | Dial-up | 30s | `XD_InitializeModem` |
| Serial | Direct cable | 30s | `XD_InitializeSerial` |
| IGZ Lobby | Internet Gaming Zone | — | `XD_LaunchedByLobby` |

Host migration is supported: if the server disconnects, a client can `ClientTransferServer` to become the new host.

### Internationalization

Three languages are supported: **English** (default), **French** (`Francais`), **German** (`Deutsch`). Language-specific files use suffixes (e.g., `RULES.FRE`, `RULES.GER`, `CITY.FRE`, `EVENTS.GER`). Language data is stored in `INTER.DAT`. Some German strings appear inline in the executable (`erhalten`, `von den`, `Lancer`, `Starten`).

### Scenario Event Scripting Language

The executable contains a full parser for scenario event scripts (`EVENTS.TXT`), wrapped in `@BEGINEVENTS` / `@ENDEVENTS` blocks:

**IF Triggers** (conditions that fire events):

| Trigger | Parameters |
|---------|------------|
| `@IF UNITKILLED` | `unit=`, `attacker=`, `defender=` |
| `@IF CITYTAKEN` | `city=`, `attacker=`, `defender=` |
| `@IF TURN` | `turn=` (supports `EVERY` keyword) |
| `@IF TURNINTERVAL` | `interval=` |
| `@IF RANDOMTURN` | `denominator=` |
| `@IF SCENARIOLOADED` | (no parameters) |
| `@IF NEGOTIATION` | `talker=`, `talkertype=`, `listener=`, `listenertype=` (HUMAN/COMPUTER/HUMANORCOMPUTER) |
| `@IF NOSCHISM` | `defender=` |
| `@IF RECEIVEDTECHNOLOGY` | `technology=`, `receiver=` |

**THEN Actions** (effects when triggered):

| Action | Parameters |
|--------|------------|
| `@THEN TEXT` | Free text until `ENDTEXT` |
| `@THEN CREATEUNIT` | `unit=`, `owner=`, `veteran=`, `homecity=`, `locations`/`endlocations` |
| `@THEN MOVEUNIT` | `unit=`, `owner=`, `maprect`, `moveto`, `numbertomove=` |
| `@THEN CHANGEMONEY` | `receiver=`, `amount=` |
| `@THEN CHANGETERRAIN` | `terraintype=`, `maprect` |
| `@THEN MAKEAGGRESSION` | `who=`, `whom=` |
| `@THEN DESTROYACIVILIZATION` | `whom=` |
| `@THEN GIVETECHNOLOGY` | `receiver=`, `technology=` |
| `@THEN PLAYCDTRACK` | track number |
| `@THEN PLAYWAVEFILE` | filename |
| `@THEN JUSTONCE` | (fires only once, tracked via `HASTRIGGERED`) |
| `@THEN DONTPLAYWONDERS` | (suppresses wonder movies) |

Special entity references: `ANYBODY`, `ANYUNIT`, `TRIGGERATTACKER`, `TRIGGERDEFENDER`, `TRIGGERRECEIVER`.

### Cheat / Debug Menu

The cheat menu (activated in-game) provides extensive debugging capabilities:

| Command | Function |
|---------|----------|
| `PICKPLAYER` | Switch to control a different civilization |
| `REVEALMAP` | Reveal entire map |
| `MONEY` | Add gold |
| `CREATEUNIT` | Place a unit on the map |
| `KILLCIV` | Eliminate a civilization |
| `SETHUMAN` | Set a civ as human-controlled |
| `GAMEYEAR` | Change the current game year |
| `GAVETECH` / `TOOKTECH` / `EDITTECH` | Technology manipulation |
| `UNITEDIT` / `UNITHITPOINTS` / `EDITHOMECITY` | Unit property editing |
| `CITYEDIT` / `SETCITYSIZE` / `SETCITYSHIELDS` / `COPYCITY` | City property editing |
| `EDITKING` / `EDITKINGNAME` / `EDITTREATIES` | Civilization & diplomacy editing |
| `EDITATTITUDE` / `EDITBETRAY` / `EDITPROGRESS` | AI personality editing |
| `EDITRULES` / `EDITCOSMIC` | Rules & cosmic parameters editing |
| `EDITSCEN` / `EDITPARADIGM` / `EDITINCREMENT` / `EDITSTARTYEAR` / `EDITMAXTURNS` / `SCENNAME` | Scenario editing |
| `HIDDENTERRAIN` | Show hidden terrain types |
| `SUPPLYSEARCH` | Debug supply chain visualization |
| `LASTCONTACT` | Show last diplomatic contact info |
| `EDITVICTORY` / `EDITVICTORYOBJ` | Victory condition editing |

### Diplomacy AI System

The diplomacy system uses a rich set of dialog keys that reveal the AI's decision-making categories:

**Treaty States**: `ATWAR`, `CEASEFIRE`, `TREATY` (Peace), `ALLIANCE`

**AI Greeting Selection** (based on relationship): `HOWDY` / `HOWDYPEACE` / `HOWDYALLY`, `WELCOME` / `WELCOMEPEACE` / `WELCOMEALLY`, `DOODY` / `DOODYALLY` (hostile)

**Alliance Rejection Reasons** (AI evaluates these conditions): `ALLIANCENOBETRAY` (won't betray current ally), `ALLIANCENOWINNING` (player is winning), `ALLIANCENODISLIKE` (dislikes player), `ALLIANCENOSMALL` (player too small), `ALLIANCENOPATIENCE` (out of patience), `ALLIANCENOTHANKS` (general refusal)

**Senate/Government Override**: The game models democratic constraints with `SENATEPEACE`, `SENATECEASE`, `WALLFORCE` (Great Wall forces), `UNFORCE` (UN forces), `OVERRULE` (hawks override senate), `ALLOWUN`, `ALLOWAGGRESSOR`, `ALLOWHAWKS`

**Mercenary System**: AI can hire mercenaries (`CYBERCOP`, `MERCENARY`) and betray allies using them (`MERCBETRAYALLY`, `MERCBETRAY`, `MERCDECLARE`)

**Attitude Modifiers**: `ANNOY` / `ANNOYPEACE` / `ANNOYALLIED` / `ANNOYVASSAL` / `ANNOYCEASE`, `NOTORIOUS`, `SMALL`, `SYMPATHY`, `PATIENCE` / `PATIENCEALLY`, `FEEBLE` / `FEEBLEALLY`, `TAUNTALLY`

### Espionage System

Complete spy/diplomat action set: `ENEMYEMBASSY` (establish embassy), `ENEMYINVESTIGATE` (investigate city), `STEAL` / `STEALHARD` / `STEALSPECIFIC` (technology theft), `SABOTAGE` / `SABOTAGEHARD` / `SABOTAGESPECIFIC` / `SABOTAGEONE` / `SABOTAGETWO` (building/production sabotage), `WATERSUPPLY` (poison water), `PLANTEDNUKE` (plant nuclear device), `DISSIDENTS` / `DISSIDENTOPTIONS` / `NOREVOLT` (incite revolt), `CIVILWAR` (trigger civil war), `DESERT` / `DESERTED` (unit desertion via bribe), `BOND007` / `BONDGLORY` / `NAILED` (spy survival outcomes), `INCORRUPTIBLE` (target immune to bribery)

### Sound Effects (95 total)

Sound effects are loaded from `CIV2\SOUND\` (or `\SOUND\` relative to game dir) as `.WAV` files:

**Combat**: `AIRCOMBT`, `SWORDFGT`, `SWRDHORS`, `RIFLE`, `INFANTRY`, `MCHNGUNS`, `CAVALRY`, `CATAPULT`, `BIGGUN`, `MEDGUN`, `TANKMOTR`, `NAVBTTLE`, `SUBMRINE`, `TORPEDOS`, `BOATSINK`, `HELICPTR`, `HELISHOT`, `DIVEBOMB`, `DIVCRASH`, `JETCOMBT`, `JETPLANE`, `JETBOMB`, `JETCRASH`, `JETSPUTR`, `AIRPLANE`, `MISSILE`

**Explosions**: `SMALLEXP`, `MEDEXPL`, `LARGEXPL`, `NUKEXPLO`

**City/Building**: `BLDCITY`, `AQUEDUCT`, `BARRACKS`, `CATHEDRL`, `MRKTPLCE`, `NEWBANK`, `STKMARKT`, `NEWONDER`, `BLDSPCSH`

**Government/Events**: `NEWGOVT`, `REVOLT`, `CIVDISOR`, `CHEERS`, `CRWDBUGL`, `GUILLOTN`, `SPYSOUND`

**UI**: `MOVPIECE`, `ENDOTURN`, `MENUOK`, `MENULOOP`, `MENUEND`, `LETTER`

**Music Fanfares**: `FANFARE1`–`FANFARE8` (civilization-specific), `FEEDBK01`–`FEEDBK08` (feedback sounds)

**Engine/Misc**: `DIESEL`, `ENGNSPUT`, `FIRE---`, `ELEPHANT`

**Drum Rolls** (3 sets × 4 variants): `DRUMAL`/`DRUMAY`/`DRUMA0`/`DRUMAN`, `DRUMBL`/`DRUMBY`/`DRUMB0`/`DRUMBN`, `DRUMCL`/`DRUMCY`/`DRUMC0`/`DRUMCN`

**Custom/Extra**: `CUSTOM1`–`CUSTOM3`, `EXTRA1`–`EXTRA8`

### Supported File Formats

**Save/Load formats**:

| Extension | Type |
|-----------|------|
| `.sav` | Standard save game |
| `.scn` | Scenario file |
| `.hot` | Hotseat (local multiplayer) save |
| `.eml` | Play-by-Email save |
| `.net` | Network multiplayer save |
| `.ALT` | Alternative/backup save |

**Graphics** (game tries BMP first, falls back to GIF):
`TERRAIN1`, `TERRAIN2`, `UNITS`, `CITIES`, `ICONS`, `PEOPLE` (as `.BMP` or `.GIF`), `TITLE.GIF`, `EDITORPT.GIF`, `EDITORAS.GIF`, `EDITORSQ.GIF`, `EDITORSA.GIF`, `SCREDITS.GIF`

**Video** (AVI): `civ2\video\opening.avi`, `civ2\video\winwin.avi`, `civ2\video\launch.avi`, `civ2\video\wonder\*.avi`, `\loser.avi`

**Data files**: `RULES.TXT` (backed up as `RULES.BAK`), `CITY.TXT` (via `CITY.TMP`/`CITY.BAK`), `EVENTS.TXT` (backed up as `EVENTS.BAK`), `CITYPREF.TXT` (city build preferences), `INTER.DAT` (internationalization), `HALLFAME.DAT`, `CIV2.DAT`, `CIV.INI`, `chatlog.txt`, `chatmac1.txt`–`chatmac3.txt` (chat macros)

### SMEDS Engine — Graphics Port System

The SMEDS engine (`Port.cpp`) supports loading images from multiple formats, tried in this priority order:

1. **BMP** — Windows bitmap (uncompressed only, rejects `BI_RLE4`)
2. **GIF** — GIF87/89a (requires global color map, skips local color tables)
3. **PCX** — ZSoft PCX (256-color or 1-plane only)
4. **TGA** — Targa (uncompressed only — `"Targa Compression Not Implemented Yet."`)
5. **LBM/IFF** — Amiga ILBM/PBM format (FORM-based, for legacy compatibility)

Image validation enforces 640×480 at 256 colors for full-screen graphics.

### DirectDraw Integration

The game uses DirectDraw for hardware-accelerated rendering when available. Capabilities checked at startup:

- Hardware blitting support
- Color key (transparency) support
- Hardware color fills
- Bank switching detection (for VRAM-limited cards)
- 16-bit pixel format identification
- Monitor refresh frequency
- Surface locking for direct pixel access

The game creates primary + back buffer surfaces and an offscreen surface for compositing. The engine has a fallback software renderer for systems without DirectDraw.

### Game Constants (from assertion strings)

| Constant | Context | Notes |
|----------|---------|-------|
| `MAX_UNITS` | `id >= 0 && id < MAX_UNITS + 2` | Maximum units in game (+ 2 sentinel entries) |
| `MAX_NET_PLAYERS` | Socket bounds checking, queue indices | Maximum multiplayer players |
| `MAX_STACKED_DRAWS` | `gNetMgr.firstStackedDraw >= 0` | Draw operation stack depth |
| `MAX_MSGS_IN_QUEUE` | `head >= 400 && head < MAX_MSGS_IN_QUEUE` | Message queue capacity |
| `DIFF_ENGINE_MESSAGE_LENGTH` | `diffLength <= DIFF_ENGINE_MESSAGE_LENGTH` | Max state-diff payload size |
| Popup stack | `popupStackIndex > 0 && popupStackIndex < 17` | Max 16 nested popups |
| Parley description | `strlen(parleyDescription) < 2048` | Max diplomacy text length |

### Internal Terrain Names

| ID | Game Name | Internal Name |
|----|-----------|---------------|
| 0 | Desert | `DESERT` |
| 1 | Plains | `PLAINS` |
| 2 | Grassland | `GRASSLAND` |
| 3 | Forest | `FOREST` |
| 4 | Hills | `HILLS` |
| 5 | Mountains | `MOUNTAINS` |
| 6 | Tundra | `TUNDRA` |
| 7 | Glacier | **`ARCTIC`** (not "Glacier") |
| 8 | Swamp | `SWAMP` |
| 9 | Jungle | `JUNGLE` |
| 10 | Ocean | `OCEAN` |

### Goody Hut Outcomes

When a unit enters a minor tribe village (goody hut), the game selects from: `SURPRISETRIBE` (friendly tribe), `SURPRISENOMADS` (nomads join), `SURPRISESCROLLS` (ancient scrolls = tech), `SURPRISEMETALS` (precious metals = gold), `SURPRISENOTHING` (empty), `SURPRISEBARB` (barbarian ambush), `SURPRISEMERCS` (mercenary unit joins)

---

## Log Files

### smeds.log

Engine log. Key entries:

```
(    0) 5.4.0f Multiplayer 26-March-99       ← Game version
(    0) Patch 3                                ← Patch level
(    0) Bottom-up orientation recommended.     ← Graphics rendering hint
(    0) Not an IGZ Game!!  event = -3          ← Not a lobby-hosted game
(    5) load_gpk: Fixing up: game.enemies(6) inconsistent with game.active(247).
```

The last line reveals: `game.enemies = 6` (plus player = 7 total civs) and `game.active = 247` (possibly active units or game elements).

### XDaemon.log

Network library log:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
XD_LaunchedByLobby - retVal = XLOBBYERR_NOTLOBBIED
```

Confirms the game was launched standalone (not from the IGZ lobby).

---

## Key Findings & Gotchas

### 1. Territory = Visibility Bitmask, NOT City Proximity

The minimap territory display uses **byte[3] of the tile record** — a per-bit visibility mask indicating which civs have explored each tile. This is fundamentally different from a Voronoi/nearest-city approach. The highest set bit determines the tile's color on the minimap.

### 2. Civ Slot ≠ Owner ID

City records use an "owner" byte (offset +8) that does **not** correspond to the civ slot number in the tile visibility bitmask. The owner ID is a separate numbering system. Mapping between them requires cross-referencing city positions with the tile data.

### 3. Destroyed Cities Are Misleading

Cities with size = 0 remain in the save file at their original coordinates. Their "owner" byte reflects the last known controller, but these cities do **not** represent current territorial control. Some dummy records appear at position (0, 0) with garbage names.

### 4. The Map Wraps Horizontally

City X coordinates can exceed the map width. Apply modular arithmetic: `visual_column = (x // 2) % (map_width // 2)`. Wrapping must also be handled in distance calculations for any proximity-based analysis.

### 5. Tile Data Offset Varies

The tile data block does not sit at a fixed offset in the save file. It must be located by scanning for a contiguous run of 6-byte records where the terrain nibble is valid (0–10) and the terrain distribution is realistic (includes ocean, multiple terrain types).

### 6. Isometric Rendering Matters

Civ2 uses a diamond isometric grid. Rendering tiles as rectangles loses half the visual information and misrepresents the map geometry. Tiles must be rendered as diamonds with odd-row horizontal offsets to match the actual game display.

### 7. Autosave Naming

The autosave file is named `St_Auto.SAV` (not `AUTO.SAV` as some community docs suggest). It is written to the game installation directory each turn when "Autosave each turn" is enabled in game options.

---

## Sprite Sheet Mapping (TERRAIN1.GIF / TERRAIN2.GIF)

All Civ2 MGE graphics files are 640×480 paletted GIFs. Transparency is implemented via **palette indices**, not RGB color matching:

- **Palette index 255** = gray, used for the area **outside** the isometric diamond in all sprite cells. Must be made transparent when compositing. **WARNING**: The RGB value of index 255 varies between GIF files: TERRAIN1/TERRAIN2 use `(135,135,135)`, but UNITS.GIF uses `(135,83,135)` (purplish-gray). The Civ2-clone dynamically samples the bottom-right pixel `(639,479)` to detect this color at runtime.
- **Palette index 254** = (0,255,0) bright green — grid border lines separating sprite cells. Also used as flag/shield position markers in UNITS.GIF (see Layer 10).
- **Palette index 253** = (255,0,255) magenta — used for transparent areas **inside** the diamond on overlay sprites (TERRAIN2, roads, improvements). Also used for annotation text baked into base terrain variants (see warning below). Must be made transparent on overlay sprites; on base terrain sprites it indicates contaminated variants that should be avoided.
- **Palette indices 252** = (255,0,0) pure red — **light civ-color placeholder** in UNITS.GIF. Replaced at render time with the owning civilization's primary color.
- **Palette index 251** = (127,0,0) dark red — **dark civ-color placeholder** in UNITS.GIF. Replaced with a darker shade of the owning civilization's color.
- **Palette index 250** = (0,0,255) blue — flag/shield position marker embedded in UNITS.GIF cell borders. Not a transparency color.
- **Palette indices 236–249** = (0,255,255) cyan — transparent areas on city sprites (CITIES.GIF). In UNITS.GIF these indices are present but treated as fixed colors by the game engine.

> **IMPORTANT**: Do NOT use RGB color matching for transparency — use palette index comparison on the original paletted image data. Multiple palette indices map to the same RGB value, and the game's palette can be modded.

> **Browser/Canvas exception**: When rendering in a web browser using HTML5 Canvas, the browser's GIF decoder converts indexed palettes to RGBA, making palette indices inaccessible. In this case, use **fuzzy RGB color matching** (tolerance ±15 per channel) as a fallback. Per-GIF chroma key sets:
> - **TERRAIN1**: magenta `(255,0,255)` + cyan `(0,255,255)` + gray `(135,135,135)`
> - **TERRAIN2**: magenta `(255,0,255)` + gray `(135,135,135)` (gray is ~132,132,132 in TERRAIN2)
> - **CITIES.GIF**: magenta `(255,0,255)` + cyan `(0,255,255)` + gray `(135,135,135)`
> - **UNITS.GIF**: magenta `(255,0,255)` + purplish-gray `(135,83,135)` — do NOT include cyan (it's not a transparency color here); red placeholders `(255,0,0)` and `(127,0,0)` are kept for civ-color recoloring
>
> Also remove bright green grid line pixels (`R<100, G>200, B<100`) from overlay sprites to prevent 1px border artifacts. This RGB approach is imperfect (risk of false positives on near-chroma terrain pixels) but produces acceptable results for unmodded sprite sheets.

### TERRAIN1.GIF — Base Terrain Tiles

Grid: **65×33 pixel cells** (64×32 tile + 1px green border). Isometric diamond tiles.

| Row | Terrain ID | Type | Columns 0-4 | Right Side (cols 5+) |
|-----|-----------|------|-------------|---------------------|
| 0 | 0 | Desert | 5 variants | Oasis special resource |
| 1 | 1 | Plains | 5 variants | Buffalo/Wheat special |
| 2 | 2 | Grassland | 5 variants | Pheasant special |
| 3 | 3 | Forest (base filler) | 5 variants | Irrigation, Farmland overlays |
| 4 | 4 | Hills (base filler) | 5 variants | Mining overlay |
| 5 | 5 | Mountains (base filler) | 5 variants | Pollution overlay |
| 6 | 6 | Tundra | 5 variants | Grassland shield resource |
| 7 | 7 | Glacier/Arctic | 5 variants | Tundra specials |
| 8 | 8 | Swamp | 5 variants | Swamp special |
| 9 | 9 | Jungle | 5 variants | Jungle special |
| 10 | 10 | Ocean | 5 variants | Ocean fish/whale |
| 11 | — | Roads | **8 individual directional segments** (cols 1–8) + col 0 (all-directions debug reference). See direction table in Rendering Pipeline. | — |
| 12 | — | Railroads | **8 individual directional segments** (same layout as roads). Composited identically. | — |
| Bottom | — | Dither, Mouse cursor, Blank | — | — |

**WARNING: Artist annotation text** ("desert", "prairie", "Arctic", "Ocean" etc.) is baked into certain tile variants using palette index 253 (magenta). These pixels are INSIDE the diamond shape and cannot be masked by the diamond outline alone. Empirically verified clean variants (zero palette-253 pixels):

| Terrain | Clean Variants | Contaminated Variants |
|---------|---------------|----------------------|
| Desert (0) | 0, 1, 4 | 2, 3 |
| Plains (1) | 0, 1, 4 | 2, 3 |
| Grassland (2) | 0, 1, 4 | 2, 3 |
| Forest (3) | 0, 1, 4, 5, 6, 8 | 2, 3, 7 |
| Hills (4) | 0, 1, 4, 5, 6, 8 | 2, 3, 7 |
| Mountains (5) | 0, 1, 4, 5, 6 | 2, 3, 7, 8 |
| Tundra (6) | 0, 4 | 1, 2, 3, 8 |
| Glacier (7) | 0, 4 | 1, 2, 3, 8 |
| Swamp (8) | 0, 4 | 1, 2, 3 |
| Jungle (9) | 0, 1, 4, 8 | 2, 3 |
| Ocean (10) | 0, 1, 4 | 2, 3 |

**For safe rendering, use only variants from the "Clean" column.** Variant 0 is clean for all terrain types. Using contaminated variants will produce visible magenta text artifacts on the rendered map.

**Tile extraction formula**: For terrain type T, variant V (0-4): `x = V * 65 + 1`, `y = T * 33 + 1`, extract 64×32 pixels.

### TERRAIN2.GIF — Overlays, Rivers, Coastlines

Same 65×33 grid for main section (rows 0-10), smaller grids in bottom section.

| Row | Content | Notes |
|-----|---------|-------|
| 0-1 | **Coastline edge MASKS** | Contain ONLY palette index 254 (dark green, RGB 0,95,63) on magenta background. Row 0 = upper edge masks, Row 1 = lower edge masks. Index-254 pixels mark which diamond edges face land. Purpose unclear — the 4-quadrant coastline art sprites (y=429–479) produce correct results without these masks. May be used by the game engine for additional pixel-level blending. Text "tile connections" appears on piece 8 (col 8). |
| 2-3 | **River sprites** | 16 directional combos for 4-bit diagonal neighbor mask (bit0=NE, bit1=SE, bit2=SW, bit3=NW). Row 2 cols 0-7 = masks 0-7, Row 3 cols 0-7 = masks 8-15. Col 8 row 2 = "rivers" label text. Ocean neighbors count as connections in the mask. |
| 4-5 | **Forest overlays** | 8+ variants per row. Overlay on Forest base (TERRAIN1 row 3). |
| 6-7 | **Hills overlays** | 8+ variants. Overlay on Hills base (TERRAIN1 row 4). |
| 8-9 | **Mountain overlays** | 8+ variants. Overlay on Mountains base (TERRAIN1 row 5). |
| 10 | **River mouths** + color swatches | 4 river mouth sprites (cols 0-3): col 0=NE, 1=SE, 2=SW, 3=NW. Drawn on ocean tiles where diagonal neighbor is land+river. Remaining cols have terrain color reference squares. |
| Bottom (y≈364+) | **Coastline quadrant sprites + encoding diagrams** | y=364-410 (rows 11-12): Encoding DIAGRAMS with green zigzag lines and "w"/"l" labels showing 3-bit neighbor patterns per quadrant (reference only, NOT renderable art). **Coastline art sprites** on 33px column grid (16 columns = 8 groups × 2 cols each): y=429 = TOP quadrant pieces (piece 0), y=446 = BOTTOM quadrant pieces (piece 1), y=463 = LEFT quadrant pieces (piece 2, even cols) + RIGHT quadrant pieces (piece 3, odd cols). Each piece is 32×16 pixels. See Rendering Pipeline Layer 2 for full extraction and compositing algorithm. Also: River Mouths, color swatches, "new 25" grassland tile. |

**Overlay extraction**: Forest overlays use rows 4-5 (16 variants, cols 0-7 each row). Hills overlays use rows 8-9. Mountains overlays use rows 6-7. ✅ **CONFIRMED**: The 16 variants are indexed by a **4-bit diagonal neighbor connectivity bitmask** (NE=bit0, SE=bit1, SW=bit2, NW=bit3), where each bit is set when the diagonal neighbor is the **same terrain type**. This was confirmed by the [Civ2-clone](https://github.com/axx0/Civ2-clone) open source project and produces correct connected terrain edges. See detailed Rendering Pipeline Layer 4.

### CITIES.GIF — City Graphics

Grid: **65×49 pixel cells** (64×48 sprite + 1px green border). City sprites are taller than terrain tiles (48px vs 32px) to show buildings extending above the diamond base.

**Layout structure** (confirmed by green border analysis):

```
Left half:   4 style columns at x = 0, 65, 130, 195  (borders at x = 0, 65, 130, 195, 260)
Label column: x = 260–333 (contains era/size annotation text: "city sizes", "anc", "renai" etc.)
Right half:  4 style columns at x = 333, 398, 463, 528  (borders at x = 333, 398, 463, 528, 593)
```

Row borders (y): 38, 87, 136, 185, 234, 283, 332, 346, 395 — main rows are 49px each after a 38px header row.

**Style columns** (0–3 in each half): Represent different architectural traditions per civilization. The city style byte in the per-civ name blocks (Section 3) selects which column to use.

**Size/era progression**: Rows progress from smallest/ancient to largest/modern. The left half appears to contain earlier-era cities and the right half later-era cities. Exact size→row mapping requires further analysis, but approximate brackets: row 0 = size 1–3, row 1 = size 4–5, row 2 = size 6–8, row 3 = size 9+.

**Bottom section** (below y≈395): Contains wall overlays, special building sprites, civilization color swatches, and additional graphics.

**Rendering note**: City sprites extend 16px above the tile diamond. When compositing, paste at `(px, py - 16)` where `(px, py)` is the tile's top-left corner. Cities in higher rows may be partially occluded if drawn before the tiles in the row above them — render order must proceed top-to-bottom.

### UNITS.GIF — Unit Sprites

Grid: **65×49 pixel cells** (64×48 unit + 1px border). 9 columns × 7 rows = 63 unit slots (9 × 65 = 585px of sprite cells + 55px shield/flag template area = 640px). Unit type maps to position: `col = type % 9`, `row = type // 9`.

### Rendering Pipeline (Reverse-Engineered)

> ⚠️ **ALGORITHM STATUS**: The rendering algorithms below were reverse-engineered from sprite sheet analysis, save file data correlation, pattern matching, and cross-referencing with the [Civ2-clone](https://github.com/axx0/Civ2-clone) open source reimplementation. Algorithms marked ✅ **CONFIRMED** have been verified against the Civ2-clone source code and/or in-game screenshots. Remaining algorithms (especially base terrain variant selection) are well-informed best guesses. **Confirmed algorithms**: Coastline 4-quadrant system (Layer 2), rivers (Layer 3), terrain overlay neighbor-connectivity bitmask (Layer 4), resource placement (Layer 8), dither blending (Layer 1b).
>
> **RENDERER IMPLEMENTATION STATUS** (`canvas-test-1/renderer.js`): Layers 1–10 are all implemented. City sprites (Layer 9) use a fixed Medieval era — see Layer 9 note. Unit sprites (Layer 10) use per-civ cyan→color substitution — see Layer 10 note. Gray diamond-corner artifacts were fixed by adding palette index 255 gray (135,135,135) to the TERRAIN1 chroma key set alongside magenta and cyan.
>
> **RENDERING PHILOSOPHY**: All rendering in this project is intended to faithfully reproduce the original Civ2 MGE program. The **primary authoritative sources** are the Civ2 program files themselves: the GIF sprite sheets (TERRAIN1/2, CITIES, UNITS, ICONS, PEOPLE, CITY), the `civ2.exe` binary, and observation of the running game via screenshots. Third-party sources — including the [Civ2-clone](https://github.com/axx0/Civ2-clone) (axx0) C# reimplementation, the [FoxAhead UI Additions](https://github.com/FoxAhead/Civ2-UI-Additions) Delphi source, CivFanatics community documentation, and the Scenario League wiki — are used as **aids to decode and understand** the original program files. They are not treated as the template being copied. Where third-party sources disagree with observed Civ2 behavior (via screenshots or binary analysis), the original game takes precedence.

#### Overview: Compositing Order (Back to Front)

Each map tile is rendered as a layered composite. The correct draw order for a single tile:

```
1. Base terrain         (TERRAIN1.GIF, rows 0-10)
1b. Dither blend        (TERRAIN1.GIF, dither tile at y=447)           [between different land terrain types]
2. Coastline transitions (TERRAIN2.GIF, bottom section quadrant sprites) [ocean tiles only]
3. River overlay        (TERRAIN2.GIF, rows 2-3)                    [if byte[0] & 0x80]
4. Terrain overlay      (TERRAIN2.GIF, rows 4-9)                    [forest/hills/mountains only]
5. Road overlay         (TERRAIN1.GIF, row 11)                      [if byte[1] & 0x10]
6. Railroad overlay     (TERRAIN1.GIF, row 12)                      [if byte[1] & 0x20]
7. Improvement overlay  (TERRAIN1.GIF, right-side cols)              [irrigation/farmland/mining/pollution]
8. Resource icon        (TERRAIN1.GIF, cols 2-3 per terrain row)    [special resource, seed-based]
9. City sprite          (CITIES.GIF)                                 [if city present]
10. Unit sprite         (UNITS.GIF)                                  [if unit present]
```

#### Layer 1: Base Terrain Sprite Selection

**Sprite sheet**: TERRAIN1.GIF, 65×33 pixel grid (64×32 tile + 1px green border).

**Row selection**: `row = terrain_type` where terrain_type = `byte[0] & 0x0F` (0=Desert through 10=Ocean). Rows 0-10 map directly to terrain IDs.

**Variant (column) selection**: There are 9 visual variants per terrain type (columns 0-8). The variant is NOT stored in the save file — it is computed at render time from the tile's coordinates. The exact algorithm is unknown, but a position-based hash produces visually correct results:

```python
# BEST GUESS: Variant selection via position hash
# The game likely uses a simple hash to avoid visual repetition
variant = ((grid_x + grid_y) % 9)           # Simple approach
# OR possibly:
variant = ((grid_x * 13 + grid_y * 7) % 9)  # Better distribution
```

**Extraction formula**: For terrain type T, variant V:
```
sprite_x = V * 65 + 1     # Skip 1px left border
sprite_y = T * 33 + 1     # Skip 1px top border
# Extract 64×32 pixels from (sprite_x, sprite_y)
```

**Artist annotation warning**: Several variant cells contain baked-in text labels using palette index 253 (magenta). These are INSIDE the diamond and cannot be masked by corner removal alone. See the verified clean variant table in the TERRAIN1 section above. **For rendering, restrict to clean variants only** (variants 0 and 4 are clean for all terrain types). Using contaminated variants produces visible magenta text on the rendered map.

#### Layer 1b: Dither Blend Between Terrain Types

✅ **VERIFIED** — produces correct speckled blending at terrain boundaries.

**Purpose**: Smooths visual transitions between adjacent tiles of different land terrain types. Creates a speckled blend at tile edges where, for example, grassland meets desert, by punching sparse holes in the current tile through which the neighbor's terrain is visible.

**Dither mask source**: TERRAIN1.GIF bottom section — the dither tile is a 64×32 diamond at **y=447** (labeled "Dither" in the sprite sheet). This tile is NOT on the standard 33px grid — it lives in the non-standard bottom area of the sprite sheet. For rendering, only the bottom 16 rows (y=463–478) are needed; the top half is reconstructed by vertical flip (the diamond is vertically symmetric). The mask uses palette index 0 (black) for dither hole positions, palette index 253 (magenta) for non-hole diamond area, and palette index 255 (gray) for outside the diamond. Only the black pixels (index 0) are dither holes.

```python
# Extract dither mask (boolean array, True = dither hole)
# The dither tile sits at y=447 (32px tall). We need only the bottom 16 rows.
y_dither = 463   # = 447 + 16 (bottom half of the dither tile)
dither_mask = (t1_palette_indices[y_dither:y_dither+16, 1:65] == 0)  # 64×16 boolean
```

**Mask properties**:
- Shape: bottom half of a 64×32 diamond (16 rows, widest at row 0 = 64px, tapering to 2px at row 15)
- Density: ~14% of diamond area (78 out of 544 pixels) — sparse, not a 50% checkerboard
- Dither holes are concentrated near the **edges** of the diamond, not uniformly distributed
- The diamond is left-right symmetric in shape but NOT in dither hole placement
- TERRAIN1 row 14 col 2 contains the **full diamond mask** (solid black, no dither holes) for reference

**Algorithm**: For each land tile, check the 4 diagonal neighbors. If a neighbor has a different land terrain type (not ocean), draw that neighbor's terrain pixels through the dither mask, applied to the appropriate **quadrant** of the current tile. Each direction is restricted to a 32×16 pixel quadrant (not the full 64px-wide half), and the mask is flipped/mirrored for each direction:

```python
# Dither is applied AFTER base terrain, BEFORE coastline/rivers/overlays.
# For each land tile at (gx, gy):
for direction in ['NE', 'SE', 'SW', 'NW']:
    neighbor_terrain = get_terrain(*neighbors[direction])
    if neighbor_terrain != current_terrain and neighbor_terrain != ocean:
        neighbor_sprite = terrain_sprites[neighbor_terrain]

        if direction == 'NE':
            # Top-right quadrant (dx=32..63, dy=0..15), mask V-flipped
            for dy in range(16):
                for dx in range(32, 64):
                    if not in_diamond(dx, dy): continue
                    if dither_mask[15-dy, dx]:
                        canvas[py+dy, px+dx] = neighbor_sprite[dy, dx]

        elif direction == 'SE':
            # Bottom-right quadrant (dx=32..63, dy=16..31), mask as-is
            for dy in range(16):
                for dx in range(32, 64):
                    if not in_diamond(dx, 16+dy): continue
                    if dither_mask[dy, dx]:
                        canvas[py+16+dy, px+dx] = neighbor_sprite[16+dy, dx]

        elif direction == 'SW':
            # Bottom-left quadrant (dx=0..31, dy=16..31), mask H-flipped
            for dy in range(16):
                for dx in range(32):
                    if not in_diamond(dx, 16+dy): continue
                    if dither_mask[dy, 63-dx]:
                        canvas[py+16+dy, px+dx] = neighbor_sprite[16+dy, dx]

        elif direction == 'NW':
            # Top-left quadrant (dx=0..31, dy=0..15), mask H+V-flipped
            for dy in range(16):
                for dx in range(32):
                    if not in_diamond(dx, dy): continue
                    if dither_mask[15-dy, 63-dx]:
                        canvas[py+dy, px+dx] = neighbor_sprite[dy, dx]
```

**Direction → mask transformation**:

| Direction | Tile Quadrant | Mask Horizontal | Mask Vertical |
|-----------|---------------|----------------|---------------|
| NE | Top-right (dx=32..63, dy=0..15) | As-is | Flipped |
| SE | Bottom-right (dx=32..63, dy=16..31) | As-is | As-is |
| SW | Bottom-left (dx=0..31, dy=16..31) | Flipped | As-is |
| NW | Top-left (dx=0..31, dy=0..15) | Flipped | Flipped |

**⚠️ CORRECTION — Quadrant-based, NOT full-half**: An earlier version of this document described each direction as covering the full 64px-wide half of the tile (top or bottom). This was implemented and tested — it produces catastrophic over-dithering because when multiple directions are active simultaneously (e.g., NE and NW neighbors are both different terrain types), both directions' masks overlap across the full top half, producing 2–4× the intended hole density at the tile's horizontal midline. The quadrant-based approach (32px wide per direction) prevents this overlap by partitioning the tile into four non-overlapping zones. The horizontal flip on the mask is still critical because the dither hole pattern is NOT left-right symmetric — H-flip ensures holes are oriented toward the correct diamond edge within each quadrant.

**Rendering order**: Dither is composited directly onto the canvas after base terrain is drawn. It modifies pixels in-place by overwriting them with the neighbor's terrain color at dither hole positions. This must happen BEFORE coastlines, rivers, and other overlays so those layers draw on top of the blended terrain.

**Skipped for ocean tiles**: Dither is only applied between different land terrain types. Ocean tiles use the coastline quadrant system instead.

#### Layer 2: Coastline Transitions (Ocean Tiles Only)

**Applies to**: Ocean tiles (terrain_type == 10) adjacent to land tiles.

**✅ CONFIRMED ALGORITHM**: Coastline rendering uses a **4-quadrant system** with 32 small sub-tile sprites (8 groups × 4 pieces per group). Each ocean tile's diamond is divided into 4 quadrants (TOP, BOTTOM, LEFT, RIGHT), and each quadrant independently selects one of 8 art sprites based on the land/water status of 3 neighboring tiles. This was confirmed by matching against in-game screenshots and the encoding diagrams embedded in the sprite sheet.

##### Sprite Sheet Layout (TERRAIN2.GIF Bottom Section)

The coastline art sprites are arranged in 8 groups (0–7) of 4 pieces each, on a **33-pixel column grid** (32px sprite + 1px border). There are 16 columns total (groups 0–7, two columns per group):

```
Column layout:  g0    g0    g1    g1    g2    g2   ...   g7    g7
                col0  col1  col2  col3  col4  col5 ...  col14 col15
                even  odd   even  odd   even  odd  ...  even  odd
```

**Piece locations** (L-shaped arrangement per group):

| Piece | Quadrant | Y offset | Column within group | Extraction |
|-------|----------|----------|---------------------|------------|
| p0 | TOP | y=429 | Even col (2×group) | `x = (2*group)*33 + 1, y = 429` |
| p1 | BOTTOM | y=446 | Even col (2×group) | `x = (2*group)*33 + 1, y = 446` |
| p2 | LEFT | y=463 | Even col (2×group) | `x = (2*group)*33 + 1, y = 463` |
| p3 | RIGHT | y=463 | Odd col (2×group+1) | `x = (2*group+1)*33 + 1, y = 463` |

Each sprite is **32×16 pixels**. Use palette index 253 (magenta) and 255 (gray) as transparent. Also apply green chroma key (R<100, G>200, B<100) to remove any residual green border pixels.

##### Quadrant Placement

The four 32×16 quadrant sprites are composited onto the 64×32 tile diamond at these offsets (relative to tile top-left):

```
         ┌─────────────────────────────────────────────────────────────┐
         │                    TOP (32×16)                              │
         │              placed at (16, 0)                              │
         ├────────────────────────────┬────────────────────────────────┤
         │     LEFT (32×16)           │        RIGHT (32×16)           │
         │   placed at (0, 8)         │      placed at (32, 8)         │
         ├────────────────────────────┴────────────────────────────────┤
         │                   BOTTOM (32×16)                            │
         │              placed at (16, 16)                             │
         └─────────────────────────────────────────────────────────────┘
```

The four quadrants overlap in the center of the diamond, forming the complete coastline transition.

##### Neighbor Checking & Bit Ordering

Each quadrant checks 3 neighbors to form a 3-bit group index (0–7). The neighbors are read in **clockwise order** around the quadrant's edge of the diamond:

| Quadrant | Piece | bit 0 | bit 1 | bit 2 | Direction |
|----------|-------|-------|-------|-------|-----------|
| TOP | p0 | NW | N | NE | Clockwise along top edge |
| RIGHT | p3 | NE | E | SE | Clockwise along right edge |
| BOTTOM | p1 | SE | S | SW | Clockwise along bottom edge |
| LEFT | p2 | SW | W | NW | Clockwise along left edge |

**⚠️ CRITICAL**: The bit ordering follows a consistent clockwise pattern around the diamond perimeter: TOP reads left-to-right (NW→N→NE), RIGHT reads top-to-bottom (NE→E→SE), BOTTOM reads right-to-left (SE→S→SW), and LEFT reads bottom-to-top (SW→W→NW). Note that BOTTOM's order is **reversed** compared to what you might naively expect (it is NOT SW→S→SE).

Each bit is 1 if the neighbor is land, 0 if water/off-map.

##### Group Index Table

| Group | bit2 | bit1 | bit0 | Meaning |
|-------|------|------|------|---------|
| 0 | W | W | W | All 3 neighbors are water (open ocean) |
| 1 | W | W | L | Only first neighbor is land |
| 2 | W | L | W | Only middle neighbor is land |
| 3 | W | L | L | First + middle neighbors are land |
| 4 | L | W | W | Only third neighbor is land |
| 5 | L | W | L | First + third neighbors are land (channel) |
| 6 | L | L | W | Middle + third neighbors are land |
| 7 | L | L | L | All 3 neighbors are land (cove/inlet) |

##### Complete Algorithm

```python
def render_coastline(gx, gy, tile_position, canvas):
    """Render coastline for an ocean tile at grid position (gx, gy)."""
    neighbors = get_8_neighbors(gx, gy)  # dict of direction -> (nx, ny)
    L = {d: is_land(*neighbors[d]) for d in ['N','NE','E','SE','S','SW','W','NW']}
    
    # TOP quadrant (piece 0): clockwise along top edge
    top_group = (1 if L['NW'] else 0) | (2 if L['N'] else 0) | (4 if L['NE'] else 0)
    
    # RIGHT quadrant (piece 3): clockwise along right edge
    right_group = (1 if L['NE'] else 0) | (2 if L['E'] else 0) | (4 if L['SE'] else 0)
    
    # BOTTOM quadrant (piece 1): clockwise along bottom edge (REVERSED!)
    bot_group = (1 if L['SE'] else 0) | (2 if L['S'] else 0) | (4 if L['SW'] else 0)
    
    # LEFT quadrant (piece 2): clockwise along left edge
    left_group = (1 if L['SW'] else 0) | (2 if L['W'] else 0) | (4 if L['NW'] else 0)
    
    # Composite all 4 quadrants
    paste_with_transparency(coast_sprites[(top_group, 0)],   canvas, tile_position + (16, 0))
    paste_with_transparency(coast_sprites[(bot_group, 1)],   canvas, tile_position + (16, 16))
    paste_with_transparency(coast_sprites[(left_group, 2)],  canvas, tile_position + (0, 8))
    paste_with_transparency(coast_sprites[(right_group, 3)], canvas, tile_position + (32, 8))
```

##### Sprite Extraction Code

```python
from PIL import Image
import numpy as np

t2_p = Image.open('TERRAIN2.GIF')
t2_idx = np.array(t2_p)
t2_rgba = t2_p.convert('RGBA')

def extract_coast_sprite(group, piece):
    """Extract a 32x16 coastline quadrant sprite.
    group: 0-7, piece: 0=TOP, 1=BOTTOM, 2=LEFT, 3=RIGHT"""
    col = group * 2 + (1 if piece == 3 else 0)
    y = [429, 446, 463, 463][piece]
    x = col * 33 + 1  # skip 1px border
    
    sprite = t2_rgba.crop((x, y, x + 32, y + 16)).copy()
    idx_region = t2_idx[y:y+16, x:x+32]
    pixels = np.array(sprite)
    
    # Transparent: palette indices 253 (magenta) and 255 (gray)
    pixels[idx_region == 253] = [0, 0, 0, 0]
    pixels[idx_region == 255] = [0, 0, 0, 0]
    
    # Kill residual green border pixels
    green_mask = (pixels[:,:,1] > 200) & (pixels[:,:,0] < 100) & (pixels[:,:,2] < 100)
    pixels[green_mask & (pixels[:,:,3] > 0)] = [0, 0, 0, 0]
    
    return Image.fromarray(pixels)

# Pre-extract all 32 sprites: coast[(group, piece)]
coast = {}
for g in range(8):
    for p in range(4):
        coast[(g, p)] = extract_coast_sprite(g, p)
```

##### Worked Example: NE+E+SE All Land

For an ocean tile where neighbors NE, E, and SE are land and all others are water:

```
Neighbor map:           NW=W  N=W  NE=L
                        W=W   [O]  E=L
                        SW=W  S=W  SE=L

TOP:    NW=W, N=W, NE=L  → bits: 0,0,1 → bit2 set    → group 4, piece 0
RIGHT:  NE=L, E=L, SE=L  → bits: 1,1,1 → all bits set → group 7, piece 3
BOTTOM: SE=L, S=W, SW=W  → bits: 1,0,0 → bit0 set    → group 1, piece 1
LEFT:   SW=W, W=W, NW=W  → bits: 0,0,0 → no bits set → group 0, piece 2

Result: Shore art appears on the right side of the tile (facing the land).
```

##### Notes

- **All ocean tiles get coastline rendering**, even those surrounded entirely by water (group 0 sprites for all quadrants provide the base ocean appearance with wave textures).
- **E/W cardinal neighbors** do NOT need special handling. The quadrant system naturally incorporates E and W through the RIGHT and LEFT quadrant neighbor checks.
- The encoding diagrams at y=364-410 (rows 11-12) show the same "w"/"l" labeling system and are useful for verifying the bit ordering, but are NOT renderable art.
- **Rows 0-1** contain edge masks with palette index 254 that may be used by the game engine for additional pixel-level blending. The quadrant art sprites produce correct coastline results without these masks.

#### Layer 3: River Overlay

**Applies to**: Tiles where `byte[0] & 0x80` (bit 7 = river flag). ✅ **VERIFIED** — produces correct river rendering including coastal river mouths.

Rivers do NOT store directional data per tile. The river flag is binary (present/absent). The rendering direction is **computed at render time** by checking which diagonal neighbors also have rivers or are ocean.

##### River Sprites (Land Tiles)

**Sprite source**: TERRAIN2.GIF rows 2-3 (65×33 grid). Row 2 cols 0-7 = masks 0-7, Row 3 cols 0-7 = masks 8-15. Col 8 of row 2 contains the label text "rivers". Each sprite is 64×32 pixels with palette indices 253 (magenta) and 255 (gray) as transparent.

**River mask computation** (4-bit, diagonal neighbors only):

```python
river_mask = 0
if has_river(*nb['NE']) or is_ocean(*nb['NE']): river_mask |= 1  # bit 0 = NE
if has_river(*nb['SE']) or is_ocean(*nb['SE']): river_mask |= 2  # bit 1 = SE
if has_river(*nb['SW']) or is_ocean(*nb['SW']): river_mask |= 4  # bit 2 = SW
if has_river(*nb['NW']) or is_ocean(*nb['NW']): river_mask |= 8  # bit 3 = NW
```

⚠️ **CRITICAL**: Ocean neighbors count as river connections. Without this, rivers terminate abruptly at the coast instead of visually flowing into the sea. A river tile adjacent to ocean in the SE direction needs bit 1 set so the river sprite shows water flowing toward SE.

| Mask | Bits | Directions | Visual |
|------|------|------------|--------|
| 0 | 0000 | None | Isolated pond/lake |
| 1 | 0001 | NE | River segment toward NE |
| 2 | 0010 | SE | River segment toward SE |
| 3 | 0011 | NE+SE | River bending from NE to SE |
| 4 | 0100 | SW | River segment toward SW |
| 5 | 0101 | NE+SW | Straight river NE↔SW |
| 6 | 0110 | SE+SW | River bending from SE to SW |
| 7 | 0111 | NE+SE+SW | Three-way junction |
| 8 | 1000 | NW | River segment toward NW |
| 9 | 1001 | NE+NW | River bending from NE to NW |
| 10 | 1010 | SE+NW | Straight river NW↔SE (most common) |
| 11 | 1011 | NE+SE+NW | Three-way junction |
| 12 | 1100 | SW+NW | River bending from SW to NW |
| 13 | 1101 | NE+SW+NW | Three-way junction |
| 14 | 1110 | SE+SW+NW | Three-way junction |
| 15 | 1111 | All four | Four-way crossing |

**Sprite extraction**:
```python
river_row = 2 + (river_mask // 8)   # Row 2 for masks 0-7, Row 3 for masks 8-15
river_col = river_mask % 8           # Column 0-7
sprite_x = river_col * 65 + 1        # 65px grid (64px sprite + 1px border)
sprite_y = river_row * 33 + 1        # 33px grid (32px sprite + 1px border)
# Extract 64×32 sprite with transparency on palette indices 253, 255
```

##### River Mouth Sprites (Ocean Tiles)

**Sprite source**: TERRAIN2.GIF row 10 cols 0-3 (65×33 grid). Four 64×32 sprites, one per diagonal direction. These are overlay sprites drawn on **ocean tiles** where a diagonal neighbor has both land and a river, showing the river outlet flowing into the sea.

| Col | Direction | Meaning |
|-----|-----------|---------|
| 0 | NE | River mouth facing NE (land+river neighbor is to the NE) |
| 1 | SE | River mouth facing SE |
| 2 | SW | River mouth facing SW |
| 3 | NW | River mouth facing NW |

**River mouth logic**: For each ocean tile, check the 4 diagonal neighbors. If a diagonal neighbor is land AND has a river, draw the corresponding mouth sprite on the ocean tile:

```python
# On ocean tiles, after coastline rendering:
if terrain == ocean:
    nb = get_8_neighbors(gx, gy)
    for i, direction in enumerate(['NE', 'SE', 'SW', 'NW']):
        nx, ny = nb[direction]
        if is_land(nx, ny) and has_river(nx, ny):
            mouth_sprite = get_mouth_sprite(i)  # row 10, col i
            composite(mouth_sprite, tile_position)  # overlay on ocean tile
```

##### Complete River Rendering Algorithm

```python
def render_rivers(gx, gy, tile_position, canvas):
    terrain = get_terrain(gx, gy)
    nb = get_8_neighbors(gx, gy)
    
    # River mouths on OCEAN tiles
    if terrain == 10:  # ocean
        for i, d in enumerate(['NE', 'SE', 'SW', 'NW']):
            nx, ny = nb[d]
            if is_land(nx, ny) and has_river(nx, ny):
                paste_with_transparency(mouth_sprites[i], canvas, tile_position)
    
    # River sprites on LAND tiles with river flag
    if has_river(gx, gy):
        river_mask = 0
        if has_river(*nb['NE']) or is_ocean(*nb['NE']): river_mask |= 1
        if has_river(*nb['SE']) or is_ocean(*nb['SE']): river_mask |= 2
        if has_river(*nb['SW']) or is_ocean(*nb['SW']): river_mask |= 4
        if has_river(*nb['NW']) or is_ocean(*nb['NW']): river_mask |= 8
        paste_with_transparency(river_sprites[river_mask], canvas, tile_position)
```

**Compositing order**: River mouths are drawn on ocean tiles AFTER coastline sprites. River sprites on land tiles are drawn AFTER base terrain but before terrain overlays (forest/hills/mountains).

#### Layer 4: Terrain Overlays (Forest, Hills, Mountains)

✅ **CONFIRMED** — variant selection uses 4-bit neighbor connectivity bitmask, verified against [Civ2-clone](https://github.com/axx0/Civ2-clone) source code (`Draw.Terrain.cs`).

**Applies to**: Forest (terrain_type 3), Hills (terrain_type 4), and Mountains (terrain_type 5).

These terrain types use a TWO-LAYER approach:
- **Base filler**: TERRAIN1.GIF rows 3, 4, 5 (flat colored base matching terrain color)
- **Overlay art**: TERRAIN2.GIF rows 4-9 (tree/hill/mountain artwork with magenta transparency)

The overlay adds the visual detail (trees, rocky hills, mountain peaks) on top of the flat base.

**Overlay sprite mapping**:

| Terrain | TERRAIN2 Rows | Total Variants |
|---------|---------------|----------------|
| Forest  | 4-5 (cols 0-7 each) | 16 art sprites (col 8 = label "10") |
| Mountains | 6-7 (cols 0-7 each) | 16 art sprites (col 8 = label "9") |
| Hills | 8-9 (cols 0-7 each) | 16 art sprites (col 8 = label "12") |

**Variant selection — 4-bit neighbor connectivity bitmask**: The 16 overlay variants are NOT random visual variants — they encode which diagonal neighbors share the same terrain type. This produces proper connected terrain: forests show linked canopies, mountains form ridgelines, and hills blend into each other where adjacent.

The variant index is a 4-bit bitmask where each bit is set when the corresponding diagonal neighbor is the **same terrain type** as the current tile:

| Bit | Value | Direction | Meaning |
|-----|-------|-----------|---------|
| 0 | 1 | NE | NE diagonal neighbor is same terrain type |
| 1 | 2 | SE | SE diagonal neighbor is same terrain type |
| 2 | 4 | SW | SW diagonal neighbor is same terrain type |
| 3 | 8 | NW | NW diagonal neighbor is same terrain type |

```python
# CONFIRMED: Overlay variant = 4-bit diagonal neighbor connectivity bitmask
# Source: Civ2-clone Draw.Terrain.cs
def overlay_variant(gx, gy, terrain_type):
    nb = get_diagonal_neighbors(gx, gy)  # NE, SE, SW, NW
    idx = 0
    if get_terrain(*nb['NE']) == terrain_type: idx |= 1   # bit 0
    if get_terrain(*nb['SE']) == terrain_type: idx |= 2   # bit 1
    if get_terrain(*nb['SW']) == terrain_type: idx |= 4   # bit 2
    if get_terrain(*nb['NW']) == terrain_type: idx |= 8   # bit 3
    return idx  # 0-15

# Sprite extraction from the variant index:
overlay_row = base_row + (variant // 8)  # Which of the 2 rows
overlay_col = variant % 8                # Which column (0-7)
# Where base_row is: Forest=4, Mountains=6, Hills=8
```

**Examples**:
- An isolated forest tile (no forest neighbors): variant = 0 → row 4, col 0 (standalone tree cluster)
- A forest with forest neighbors to NE and SE: variant = 3 → row 4, col 3 (trees with right-side connections)
- A forest surrounded by forest in all diagonal directions: variant = 15 → row 5, col 7 (fully connected canopy)

> **⚠️ PREVIOUS ERROR**: Earlier versions of this document and the JavaScript renderer used a position-based hash (`(gx * 13 + gy * 7) % 16`) for variant selection. This produced random-looking, disconnected terrain overlays. The correct bitmask approach was confirmed by the Civ2-clone open source project.

The overlays use magenta chroma key and are drawn AFTER coastlines and rivers but BEFORE roads. Also apply green grid line removal (kill bright green pixels where R<100, G>200, B<100) to prevent 1px border artifacts.

#### Layer 5-6: Road and Railroad Overlays

**Applies to**: Roads if `byte[1] & 0x10`, Railroads if `byte[1] & 0x20`.

Roads and railroads use **individual directional segment sprites** that are composited together. Each sprite in TERRAIN1.GIF rows 11-12 represents a road/railroad segment extending from the tile center toward ONE of 8 neighbors.

**Sprite layout** (TERRAIN1.GIF):

| Column | Direction | Doubled-Coord Neighbor Offset |
|--------|-----------|-------------------------------|
| 0 | (All 8 directions — crossroads reference/debug) | — |
| 1 | NE | (x+1, y-1) |
| 2 | E  | (x+2, y+0) |
| 3 | SE | (x+1, y+1) |
| 4 | S  | (x+0, y+2) |
| 5 | SW | (x-1, y+1) |
| 6 | W  | (x-2, y+0) |
| 7 | NW | (x-1, y-1) |
| 8 | N  | (x+0, y-2) |

Row 11 = road segments, Row 12 = railroad segments (same directional layout).

**Rendering algorithm**:
```python
# For each tile with road/railroad:
for direction in [NE, E, SE, S, SW, W, NW, N]:   # cols 1-8
    neighbor = get_neighbor(tile, direction)
    if neighbor also has road (byte[1] & 0x10):
        composite(road_sprite[direction])          # TERRAIN1 row 11, col = direction
    if tile has railroad AND neighbor has railroad:
        composite(railroad_sprite[direction])      # TERRAIN1 row 12, col = direction
```

The road sprites have **magenta chroma key** in the non-road areas and are composited transparently over the base terrain. Multiple direction sprites are overlaid to create intersections, curves, and straight roads.

> **Note**: Column 0 in both rows shows all 8 directions drawn simultaneously. This is likely a debug/reference sprite and not used in normal rendering. The game composites individual direction sprites (cols 1-8) rather than using pre-combined intersection sprites.

> **RENDERER IMPLEMENTED**: Road and railroad rendering is implemented in `canvas-test-1/renderer.js` Pass 3. Extracts 8 directional road sprites from TERRAIN1 row 11 cols 1-8, and 8 railroad sprites from row 12 cols 1-8. Each segment draws only when the neighbor in that direction also has the matching improvement flag (`byte[1] & 0x10` for roads, `byte[1] & 0x20` for railroads). Uses TERRAIN1 chroma key (magenta + cyan + gray) with green grid line removal.

#### Layer 7: Improvement Overlays

**Sprite sources**: TERRAIN1.GIF right-side columns + CITIES.GIF bottom section.

| Improvement | Detected From | Sprite Location |
|-------------|---------------|-----------------|
| Irrigation | `byte[1] & 0x04` | TERRAIN1 row 3 col 7 |
| Farmland | `byte[1] & 0x04` AND `byte[1] & 0x08` | TERRAIN1 row 4 col 7 |
| Mining | `byte[1] & 0x08` (without irrigation) | TERRAIN1 row 5 col 7 |
| Pollution | `byte[1] & 0x80` | TERRAIN1 row 6 col 7 |
| Fortress | `byte[1] & 0x40` | CITIES.GIF bottom section (labeled "FORTRESS") |
| Airbase | `byte[1] & 0x40` + `byte[1] & 0x02` | CITIES.GIF bottom section (labeled "AIRBASE") |

> **Note**: Farmland = irrigation + mining flags both set. Airbase = fortress + city-present flags (0x40 + 0x02), though the exact detection logic for airbase vs fortress may differ. The CITIES.GIF bottom section labels for FORTRESS and AIRBASE were confirmed by visual inspection of the sprite sheet.
>
> **RENDERER IMPLEMENTED**: Improvement overlays are implemented in `canvas-test-1/renderer.js`. Irrigation/farmland/mining/pollution extracted from TERRAIN1 col 7 rows 3-6 (64×32, tile-sized) and rendered in Pass 3. Fortress/airbase extracted from CITIES.GIF y=423 (64×48, city-sized) and rendered in Pass 6 (after units, so fortress draws on top). Detection: farmland when both 0x04+0x08 set, irrigation when only 0x04, mining when only 0x08, pollution when 0x80 (independent overlay), airbase when 0x40+0x02, fortress when only 0x40. Fortress/airbase draw at py-16 (extends above tile like cities). Note: col 9 in TERRAIN1 contains text labels, not sprites.

#### Layer 8: Resource/Special Icons

✅ **VERIFIED** — resource placement formula confirmed with map seed from save file.

**Applies to**: Tiles where the seed-based position formula selects them for a resource, AND byte[0] bit 6 ("no resource") is NOT set.

##### Resource Placement Formula

Each terrain type has two special resources (Special 1 and Special 2). Resource placement is determined by the **map seed** (field 4 in the map header, offset +8 from map header start) and a repeating 4×4 grid pattern:

```python
seed = uint16_at(map_header_offset + 8)
s = seed % 64                        # Only 64 patterns exist (per Höfelt)
s1_x = s & 3                         # Special 1: grid x position (0-3)
s1_y = (s >> 2) & 3                  # Special 1: grid y position (0-3)
s2_x = (s1_x + 2) % 4               # Special 2: offset by +2 in x
s2_y = (s1_y + 2) % 4               # Special 2: offset by +2 in y

def get_resource(gx, gy):
    """Returns 0=no resource, 1=special 1, 2=special 2."""
    if tile_byte0[gx, gy] & 0x40:    # "no resource" flag suppresses display
        return 0
    if gx % 4 == s1_x and gy % 4 == s1_y:
        return 1                      # Special resource 1
    if gx % 4 == s2_x and gy % 4 == s2_y:
        return 2                      # Special resource 2
    return 0
```

This produces ~6.25% density per special type (~12.5% total), consistent with in-game observation.

##### Resource Sprite Source

**TERRAIN1.GIF**, columns 2 and 3 for each terrain row (0-10):
- **Col 2** = Special Resource 1 sprite (overlay with magenta transparency)
- **Col 3** = Special Resource 2 sprite (overlay with magenta transparency)

| Terrain | Row | Col 2 (Special 1) | Col 3 (Special 2) |
|---------|-----|-------------------|-------------------|
| Desert | 0 | Oasis | Desert Oil |
| Plains | 1 | Buffalo | Wheat |
| Grassland | 2 | Grassland Special | Grassland Special |
| Forest | 3 | Pheasant | Silk |
| Hills | 4 | Coal | Wine |
| Mountains | 5 | Gold | Iron |
| Tundra | 6 | Game | Furs |
| Glacier | 7 | Ivory | Glacier Oil |
| Swamp | 8 | Peat | Spice |
| Jungle | 9 | Gems | Fruit |
| Ocean | 10 | Fish | Whales |

**Extraction formula**:
```python
resource_x = special_col * 65 + 1   # special_col = 2 for special 1, 3 for special 2
resource_y = terrain_type * 33 + 1
# Extract 64×32 sprite, transparent on palette indices 253 AND 255
```

**Compositing**: Resource sprites are drawn AFTER rivers and terrain overlays but BEFORE cities/units. Transparency uses palette indices 253 (magenta) and 255 (gray).

> **Note on RULES.TXT**: The resource names and stats are defined in @TERRAIN section of RULES.TXT. The first 11 lines are base terrain definitions, followed by 22 lines of special resources (2 per terrain, in terrain order). The sprite sheet column 2/3 assignment matches this ordering.

#### Layer 9: City Sprites

**Sprite sheet**: CITIES.GIF, grid structure 65×49 pixels (64×48 sprite + 1px border).

CITIES.GIF has a complex layout with two halves separated by a label column. The header row contains the text "CIV 2000" (top-left), "Open" (left half label), "city" (center), and "Walled" (right half label).

```
Left half:   4 style columns at x = 1, 66, 131, 196  (within borders 0-260) — OPEN (unwalled)
Label column: x = 260-333 (contains era text labels, readable in sprite sheet)
Right half:  4 style columns at x = 334, 399, 464, 529  (within borders 333-593) — WALLED
```

Row borders (y): 38, 87, 136, 185, 234, 283, 332, 346, 395 (49px spacing after 38px header).

**Era rows** (confirmed from embedded green text labels in the center label column):

| Row | Y Start | Label Text (verbatim) | Interpretation |
|-----|---------|----------------------|----------------|
| 0 | 39 | "STONE/ BRONZE" | Stone Age / Bronze Age |
| 1 | 88 | "ANCIENT/ CLASSICAL" | Ancient / Classical era |
| 2 | 137 | "FAR EAST" | Far East architectural style (may be style-specific, not era) |
| 3 | 186 | "MEDIEVAL" | Medieval era |
| 4 | 235 | "EARLY INDUSTRIAL" | Early Industrial era |
| 5 | 284 | "MODERN" | Modern era |
| 6 | 333+ | "MODERN ALT..." | Alternative modern sprites |

**City style** (0–3): Determined by the civilization's city style byte stored in the per-civ name blocks (Section 3). The 4 columns represent different architectural traditions.

**City sprite selection formula**:
```python
# BEST GUESS: City sprite lookup
style = civ_city_style_byte          # 0-3 from per-civ name block
era_row = get_era_from_techs(civ)    # 0-6, determined by tech advancement
has_walls = city_has_improvement(CITY_WALLS)

if has_walls:
    sprite_x = 334 + style * 65      # Right half (walled)
else:
    sprite_x = 1 + style * 65        # Left half (open)

sprite_y = 39 + era_row * 49         # Era row
# Extract 64×48 pixels using magenta + cyan + gray chroma key
```

> **City sprite row selection** (implemented in renderer.js `_getCityRow()`):
> - **Epochs 0–1** (Ancient/Renaissance): Use civ's city style (rows 0–3: Bronze Age, Classical, Far East, Medieval)
> - **Epoch 2** (Industrial): All civs use row 4
> - **Epoch 3** (Modern): Styles 0–1 use row 5, styles 2–3 (Far East/Medieval) use row 6 (MODERN ALT)
>
> **Epoch determination** (`_getEpoch()`): Based on milestone tech combinations: Ancient=default, Renaissance=Invention(38)+Philosophy(60), Industrial=Industrialization(37), Modern=Automobile(5)+Electronics(24). Per-civ tech bitmask parsed from Section 3b of save file (offset 0x00A6, 12 bytes).
>
> City style (0–3) parsed from per-civ name blocks. City Walls detected via building bitmask at city record +52 (bit 8). CITIES.GIF is optional — renderer falls back to colored squares when not provided.

**Bottom section** (y ≈ 395+, confirmed from embedded labels):
- **FLAGS**: Per-civ flag/pennant sprites. 14×22 pixels each, 9 per row × 2 rows. Row 0 at y=425, row 1 at y=448 (23px row spacing). Horizontal: x = 1 + 15 × col, for col 0–8. 8 civ flags (slots 0–7) + 1 unused brown flag (slot 8) per row. Source: Civ2-clone `Rectangle(1 + 15*(i%9), 425 + 23*(i/9), 14, 22)`. Drawn on cities that contain units; position encoded via `FlagLoc` in the Civ2-clone. **TODO**: Determine exact rendering rules — when flags appear (all cities vs only garrisoned/occupied), exact position on city sprite, and whether row 0 vs row 1 represents light/dark variants or different states.
- **FORTIFY**: Fortification icon (tent/barricade sprite) drawn on units with fortify orders
- **FORTRESS**: Fortress improvement sprite (stone walls)
- **AIRBASE**: Airbase improvement sprite (two variants — one with runway, one with X marking)
- Two large detailed city sprites to the right (possibly capital or wonder variants)

#### Layer 10: Unit Sprites

**Sprite sheet**: UNITS.GIF, 65×49 pixel grid (64×48 unit sprite + 1px border), 9 columns × 7 rows.

**Sprite selection**:
```python
unit_type = unit_record[6]          # Byte +6 of unit record
col = unit_type % 9
row = unit_type // 9
sprite_x = col * 65 + 1
sprite_y = row * 49 + 1
# Extract 64×48 pixels
```

Like cities, unit sprites are 48 pixels tall and extend above the tile diamond. Units are drawn with **civilization color substitution**: palette index 252 = (255,0,0) pure red is the **light** civ-color placeholder, and palette index 251 = (127,0,0) dark red is the **dark** civ-color placeholder. At render time, both are replaced with the owning civilization's light and dark colors respectively.

**Important**: UNITS.GIF palette index 255 = (135,83,135) purplish-gray, which differs from TERRAIN1/TERRAIN2's (135,135,135) gray. Both must be made transparent but require different chroma key values.

> **RENDERER IMPLEMENTED** (`canvas-test-1/renderer.js`): Unit sprites are rendered from UNITS.GIF with per-civ color substitution. Template sprites are extracted once with magenta (255,0,255) + purplish-gray (135,83,135) chroma key. Civ-color placeholders — light red (255,0,0) idx 252 and dark red (127,0,0) idx 251 — are recolored per civ at runtime. Recolored sprites are cached by (unit_type, owner) pair. One unit drawn per tile; garrisoned units in cities are hidden. UNITS.GIF is optional.

#### Neighbor Lookup Reference

Many rendering layers require checking adjacent tiles. In the doubled-coordinate system (as stored in save files), the 8 neighbors are:

```
Direction | Offset (dx, dy) | Grid Offset (for linear index)
----------|-----------------|-------------------------------
NE        | (+1, -1)        | -map_width + (y%2==0 ? 0 : 1)
E         | (+2,  0)        | +1
SE        | (+1, +1)        | +map_width + (y%2==0 ? 0 : 1)
S         | ( 0, +2)        | +2*map_width
SW        | (-1, +1)        | +map_width + (y%2==0 ? -1 : 0)
W         | (-2,  0)        | -1
NW        | (-1, -1)        | -map_width + (y%2==0 ? -1 : 0)
N         | ( 0, -2)        | -2*map_width
```

**Concrete implementation** using grid coordinates (gx = column 0..mapWidth-1, gy = row 0..mapHeight-1):

```python
def get_8_neighbors(gx, gy, map_width):
    """Return dict of direction -> (neighbor_gx, neighbor_gy).
    
    In Civ2's staggered isometric grid, diagonal neighbors shift
    differently depending on whether the current row is even or odd.
    Cardinal N/S skip a row; E/W are simply ±1 column.
    Diagonal neighbors are ±1 row, with column offset depending on row parity.
    
    CRITICAL: Even rows shift diagonals LEFT, odd rows shift diagonals RIGHT.
    This is the most common source of rendering bugs.
    """
    wrap = lambda x: x % map_width  # horizontal wrapping (cylindrical world)
    
    if gy % 2 == 0:  # EVEN row
        return {
            'N':  (gx,         gy - 2),
            'NE': (wrap(gx),   gy - 1),   # same column on even rows
            'E':  (wrap(gx+1), gy),
            'SE': (wrap(gx),   gy + 1),   # same column on even rows
            'S':  (gx,         gy + 2),
            'SW': (wrap(gx-1), gy + 1),   # column - 1 on even rows
            'W':  (wrap(gx-1), gy),
            'NW': (wrap(gx-1), gy - 1),   # column - 1 on even rows
        }
    else:  # ODD row
        return {
            'N':  (gx,         gy - 2),
            'NE': (wrap(gx+1), gy - 1),   # column + 1 on odd rows
            'E':  (wrap(gx+1), gy),
            'SE': (wrap(gx+1), gy + 1),   # column + 1 on odd rows
            'S':  (gx,         gy + 2),
            'SW': (wrap(gx),   gy + 1),   # same column on odd rows
            'W':  (wrap(gx-1), gy),
            'NW': (wrap(gx),   gy - 1),   # same column on odd rows
        }
```

**Why the asymmetry**: In the isometric grid, odd rows are rendered shifted right by half a tile. This means the diagonal "NE" neighbor on an even row is directly above-right (same column), but on an odd row it's above-right (column + 1). The key rule: **on even rows, NE/SE use same column and NW/SW use column-1; on odd rows, NE/SE use column+1 and NW/SW use same column.**

**Boundary handling**: Y does NOT wrap — tiles above row 0 or below row (mapHeight-1) should be treated as ocean (terrain type 10). X wraps horizontally (cylindrical world) via modulo mapWidth.

### Isometric Coordinate → Pixel Position

For a tile at save-file linear index `i`, with `TPR = map_width2 / 2 = 40`:
- `row = i // TPR`, `col = i % TPR`
- `pixel_x = col * 64 + (32 if row % 2 else 0)` (half-tile horizontal offset for odd rows)
- `pixel_y = row * 16` (tile_height / 2, rows overlap)
- Image dimensions: `width = TPR * 64 + 32`, `height = (map_height - 1) * 16 + 32`

For city/unit isometric coordinates (cx, cy) to tile position: `col = (cx // 2) % TPR`, `row = cy`.

### ⚠️ Rendering Pitfall: Interleaved Records vs Byte Planes

The tile data in Block 2 is stored as **6-byte interleaved records** (one complete 6-byte record per tile, sequentially). Session 13 initially misread this block as 6 **separate byte planes** (all byte[0] values, then all byte[1] values, etc.), which produced a map with wildly wrong terrain distribution (e.g., 64% "desert" instead of 52% ocean). The correct reading is:

```python
# CORRECT: 6-byte interleaved records
for i in range(map_size):
    offset = block2_offset + i * 6
    byte0, byte1, byte2, byte3, byte4, byte5 = sav[offset:offset+6]

# WRONG: byte planes (DO NOT USE)
# byte0 = sav[block2_offset + i]  ← reads byte[1] of tile i-1 as byte[0] of tile i!
```

An earlier rendering session accidentally used offset `0x076dc` (30428) with a 22×63 grid and 6-byte records, which happened to start 452 records into the tile data block. The resulting map appeared plausible because it coincidentally showed recognizable geography, but it was reading the wrong portion of the data with incorrect dimensions. The **correct parameters** are: `block2_offset = 27716`, `TPR = 40`, `MAP_H = 50`, with 6-byte interleaved records.

---

## Complete Map Rendering Recipe (Python)

This is a self-contained, copy-paste-ready script that renders a Civ2 MGE save file map with base terrain, dither blending, coastlines, rivers, river mouths, terrain overlays (forest/mountain/hill with neighbor-connectivity), and special resources. It requires only `PIL/Pillow` and `numpy`, plus the game's `TERRAIN1.GIF`, `TERRAIN2.GIF`, and a `.SAV` file.

```python
import struct
from PIL import Image
import numpy as np

# ── Configuration ──
TERRAIN1_PATH = 'TERRAIN1.GIF'
TERRAIN2_PATH = 'TERRAIN2.GIF'
SAV_PATH = 'game.sav'
OUTPUT_PATH = 'civ2_map.png'
ZOOM = 2  # integer scale factor for output

# ── Sprite extraction helper ──
def extract(img_rgba, idx_arr, x, y, w, h, trans_indices, kill_green=False):
    """Extract a sprite with palette-index transparency and optional green chroma key."""
    aw, ah = min(w, img_rgba.width - x), min(h, img_rgba.height - y)
    if aw <= 0 or ah <= 0:
        return Image.new('RGBA', (w, h), (0, 0, 0, 0))
    spr = img_rgba.crop((x, y, x + aw, y + ah)).copy()
    ir = idx_arr[y:y+ah, x:x+aw]
    a = np.array(spr)
    for t in trans_indices:
        a[ir == t] = [0, 0, 0, 0]
    if kill_green:
        gm = (a[:,:,1] > 200) & (a[:,:,0] < 100) & (a[:,:,2] < 100) & (a[:,:,3] > 0)
        a[gm] = [0, 0, 0, 0]
    result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    result.paste(Image.fromarray(a), (0, 0))
    return result

# ── Load sprite sheets ──
t1_p = Image.open(TERRAIN1_PATH)
t2_p = Image.open(TERRAIN2_PATH)
t1_idx, t2_idx = np.array(t1_p), np.array(t2_p)
t1_rgba, t2_rgba = t1_p.convert('RGBA'), t2_p.convert('RGBA')
T_OVL = [253, 255]  # TERRAIN2 transparent palette indices

# ── Extract sprites ──
# Base terrain: TERRAIN1 rows 0-10, 65x33 grid (64x32 sprites + 1px border)
terrain = {tid: extract(t1_rgba, t1_idx, 1, tid*33+1, 64, 32, [255]) for tid in range(11)}

# Coastline: TERRAIN2, 8 groups × 4 quadrant pieces (each 32×16 px)
coast = {}
for g in range(8):
    coast[(g,0)] = extract(t2_rgba, t2_idx, g*2*33+1,     429, 32, 16, T_OVL, True)
    coast[(g,1)] = extract(t2_rgba, t2_idx, g*2*33+1,     446, 32, 16, T_OVL, True)
    coast[(g,2)] = extract(t2_rgba, t2_idx, g*2*33+1,     463, 32, 16, T_OVL, True)
    coast[(g,3)] = extract(t2_rgba, t2_idx, (g*2+1)*33+1, 463, 32, 16, T_OVL, True)

# Rivers: TERRAIN2 rows 2-3, 16 directional combos
rivers = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+2)*33+1, 64, 32, T_OVL) for i in range(16)]

# River mouths: TERRAIN2 row 10 cols 0-3 (NE, SE, SW, NW)
mouths = [extract(t2_rgba, t2_idx, col*65+1, 10*33+1, 64, 32, T_OVL, True) for col in range(4)]

# Terrain overlays: TERRAIN2 rows 4-9, 16 variants each (neighbor connectivity bitmask)
# kill_green=True to remove any green grid line bleed
forests   = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+4)*33+1, 64, 32, T_OVL, True) for i in range(16)]
mountains = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+6)*33+1, 64, 32, T_OVL, True) for i in range(16)]
hills     = [extract(t2_rgba, t2_idx, (i%8)*65+1, (i//8+8)*33+1, 64, 32, T_OVL, True) for i in range(16)]

# Resource sprites: TERRAIN1 col 2 = special 1, col 3 = special 2 per terrain row
resources = {}
for tid in range(11):
    resources[(tid, 1)] = extract(t1_rgba, t1_idx, 2*65+1, tid*33+1, 64, 32, [253, 255])
    resources[(tid, 2)] = extract(t1_rgba, t1_idx, 3*65+1, tid*33+1, 64, 32, [253, 255])

# Dither mask: bottom half of the 64×32 dither tile located at y=447 in TERRAIN1.GIF
# (The dither tile is NOT on the standard 33px grid — it sits at y=447-478 in the bottom section.)
# We extract only the bottom 16 rows (y=463-478) and flip vertically for the top half.
# Black pixels (palette index 0) = dither holes
y_dith = 463  # = 447 + 16 (bottom half of dither tile)
dither_mask = (t1_idx[y_dith:y_dith+16, 1:65] == 0)  # 64×16 boolean

# ── Parse save file ──
with open(SAV_PATH, 'rb') as f:
    sav = f.read()

MAP_HEADER = 13702  # Fixed offset for .SAV/.NET files (use 13432 for .SCN)
mw2 = struct.unpack_from('<H', sav, MAP_HEADER)[0]
mh  = struct.unpack_from('<H', sav, MAP_HEADER + 2)[0]
ms  = struct.unpack_from('<H', sav, MAP_HEADER + 4)[0]
mw  = mw2 // 2
assert mw * mh == ms, f"Map validation failed: {mw}×{mh} != {ms}"

block2 = MAP_HEADER + 14 + ms * 7
tiles = [sav[block2 + i*6 : block2 + i*6 + 6] for i in range(ms)]

# Resource seed (map header field 4, offset +8)
seed = struct.unpack_from('<H', sav, MAP_HEADER + 8)[0]
s = seed % 64
s1_x, s1_y = s & 3, (s >> 2) & 3
s2_x, s2_y = (s1_x + 2) % 4, (s1_y + 2) % 4

# ── Map data access ──
def get_terrain(gx, gy):
    if gy < 0 or gy >= mh: return 10
    return tiles[(gy * mw) + (gx % mw)][0] & 0x0F

def is_land(gx, gy):
    return get_terrain(gx, gy) != 10

def has_river(gx, gy):
    if gy < 0 or gy >= mh: return False
    return bool(tiles[(gy * mw) + (gx % mw)][0] & 0x80)

def get_resource(gx, gy):
    if gy < 0 or gy >= mh: return 0
    if tiles[(gy * mw) + (gx % mw)][0] & 0x40: return 0  # "no resource" flag
    if gx % 4 == s1_x and gy % 4 == s1_y: return 1
    if gx % 4 == s2_x and gy % 4 == s2_y: return 2
    return 0

def neighbors(gx, gy):
    w = lambda x: x % mw
    if gy % 2 == 0:
        return {'N':(gx,gy-2),  'NE':(w(gx),gy-1),   'E':(w(gx+1),gy), 'SE':(w(gx),gy+1),
                'S':(gx,gy+2),  'SW':(w(gx-1),gy+1),  'W':(w(gx-1),gy), 'NW':(w(gx-1),gy-1)}
    else:
        return {'N':(gx,gy-2),  'NE':(w(gx+1),gy-1),  'E':(w(gx+1),gy), 'SE':(w(gx+1),gy+1),
                'S':(gx,gy+2),  'SW':(w(gx),gy+1),    'W':(w(gx-1),gy), 'NW':(w(gx),gy-1)}

# ── Dither helper ──
def apply_dither(canvas_arr, px, py, neighbor_sprite, direction):
    na = np.array(neighbor_sprite)
    if direction == 'SE':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[dy, dx] and na[16+dy, dx, 3] > 0:
                    cy, cx = py+16+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[16+dy, dx]
    elif direction == 'SW':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[dy, 63-dx] and na[16+dy, dx, 3] > 0:
                    cy, cx = py+16+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[16+dy, dx]
    elif direction == 'NE':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[15-dy, dx] and na[dy, dx, 3] > 0:
                    cy, cx = py+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[dy, dx]
    elif direction == 'NW':
        for dy in range(16):
            for dx in range(64):
                if dither_mask[15-dy, 63-dx] and na[dy, dx, 3] > 0:
                    cy, cx = py+dy, px+dx
                    if 0 <= cy < canvas_arr.shape[0] and 0 <= cx < canvas_arr.shape[1]:
                        canvas_arr[cy, cx] = na[dy, dx]

# ── Render ──
TW, TH = 64, 32
canvas_w = mw * TW + TW // 2
canvas_h = (mh - 1) * (TH // 2) + TH
canvas = Image.new('RGBA', (canvas_w, canvas_h), (20, 40, 80, 255))

COAST_OFFSET = {0: (16, 0), 1: (16, 16), 2: (0, 8), 3: (32, 8)}

# Pass 1: Base terrain
for gy in range(mh):
    for gx in range(mw):
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        canvas.paste(terrain[get_terrain(gx, gy)], (px, py), terrain[get_terrain(gx, gy)])

# Pass 2: Dither (directly modify canvas pixels)
canvas_arr = np.array(canvas)
for gy in range(mh):
    for gx in range(mw):
        ter = get_terrain(gx, gy)
        if ter == 10: continue
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        nb = neighbors(gx, gy)
        for d in ['NE', 'SE', 'SW', 'NW']:
            nter = get_terrain(*nb[d])
            if nter != ter and nter != 10:
                apply_dither(canvas_arr, px, py, terrain[nter], d)
canvas = Image.fromarray(canvas_arr)

# Pass 3: Coastline, river mouths, rivers, terrain overlays, resources
for gy in range(mh):
    for gx in range(mw):
        px = gx * TW + ((TW // 2) if gy % 2 else 0)
        py = gy * (TH // 2)
        ter = get_terrain(gx, gy)
        nb = neighbors(gx, gy)

        # Coastline + river mouths (ocean tiles only)
        if ter == 10:
            L = {d: is_land(*nb[d]) for d in nb}
            top_g   = (1 if L['NW'] else 0) | (2 if L['N']  else 0) | (4 if L['NE'] else 0)
            right_g = (1 if L['NE'] else 0) | (2 if L['E']  else 0) | (4 if L['SE'] else 0)
            bot_g   = (1 if L['SE'] else 0) | (2 if L['S']  else 0) | (4 if L['SW'] else 0)
            left_g  = (1 if L['SW'] else 0) | (2 if L['W']  else 0) | (4 if L['NW'] else 0)
            for piece, group in [(0,top_g), (1,bot_g), (2,left_g), (3,right_g)]:
                ox, oy = COAST_OFFSET[piece]
                canvas.paste(coast[(group, piece)], (px+ox, py+oy), coast[(group, piece)])
            for i, d in enumerate(['NE', 'SE', 'SW', 'NW']):
                nx, ny = nb[d]
                if is_land(nx, ny) and has_river(nx, ny):
                    canvas.paste(mouths[i], (px, py), mouths[i])

        # Rivers (land tiles, ocean neighbors count as connections)
        if has_river(gx, gy):
            is_oc = lambda x, y: get_terrain(x, y) == 10
            rm = (1 if has_river(*nb['NE']) or is_oc(*nb['NE']) else 0) | \
                 (2 if has_river(*nb['SE']) or is_oc(*nb['SE']) else 0) | \
                 (4 if has_river(*nb['SW']) or is_oc(*nb['SW']) else 0) | \
                 (8 if has_river(*nb['NW']) or is_oc(*nb['NW']) else 0)
            canvas.paste(rivers[rm], (px, py), rivers[rm])

        # Terrain overlays: forest/mountains/hills (4-bit neighbor connectivity bitmask)
        if ter in (3, 4, 5):
            ovi = 0
            if get_terrain(*nb['NE']) == ter: ovi |= 1
            if get_terrain(*nb['SE']) == ter: ovi |= 2
            if get_terrain(*nb['SW']) == ter: ovi |= 4
            if get_terrain(*nb['NW']) == ter: ovi |= 8
            overlay = {3: forests, 4: hills, 5: mountains}[ter]
            canvas.paste(overlay[ovi], (px, py), overlay[ovi])

        # Resources (seed-based placement)
        res = get_resource(gx, gy)
        if res > 0:
            canvas.paste(resources[(ter, res)], (px, py), resources[(ter, res)])

# Save
if ZOOM > 1:
    canvas = canvas.resize((canvas.width * ZOOM, canvas.height * ZOOM), Image.NEAREST)
canvas.convert('RGB').save(OUTPUT_PATH)
print(f"Saved {OUTPUT_PATH} ({canvas.width}×{canvas.height})")
```

This script produces a correct map rendering with verified coastlines, rivers, river mouths, dither terrain blending, terrain overlays (forest/mountain/hill with neighbor-connectivity bitmask), and seed-based resource placement. To use: set the four paths at the top and run.

---

## Rendering TODOs — Underspecified Visual Elements

Items below describe visual elements that are implied or partially described elsewhere in this document but lack sufficient rendering instructions for implementation. Each needs further research (game observation, Civ2-clone source, or reverse engineering) to determine the exact rendering rules.

##### Sprite Sheet Gaps
- [ ] **TERRAIN2 rows 0–1**: "Tile connection masks" — green line segments (palette index 254) on magenta diamonds. Purpose unclear. May be used by the game engine for sub-pixel coastline blending beyond the 4-quadrant system. Need to determine if these have any visible rendering purpose or are engine-internal only.
- [ ] **TERRAIN2 bottom section**: "Ocean wave textures" and "new 25 grassland variant" are mentioned but have no extraction coordinates, rendering conditions, or usage rules. Are wave textures drawn on ocean tiles? When is the "new 25" grassland variant used instead of the standard grassland sprites?
- [ ] **UNITS.GIF HPshield template**: At (597, 30, 12, 20), described as "unused in Civ2-clone." Determine what the game engine actually uses this sprite for — possibly an alternative HP display mode or a tooltip sprite.
- [ ] **CITIES.GIF large city sprites**: "Two large detailed city sprites to the right" in the bottom section (y ≈ 395+). No coordinates, dimensions, or rendering conditions. Possibly capital-city or wonder-city variants. Need to identify their exact position and when the game draws them.
- [ ] **CITIES.GIF airbase second variant**: The doc mentions "two variants — one with runway, one with X marking" but only one is extracted (x=273, y=423). Need coordinates for the second variant and the selection rule between them (e.g., airbase with planes present vs empty?).
- [x] **ICONS.GIF**: ~~CATALOGED~~. Full sprite map documented in "ICONS.GIF Sprite Layout" section above. Contains resource icons (14×14 and 10×10), improvement thumbnails (36×20, 5×8 grid at 343,1), wonder thumbnails (36×20, 4×7 grid at 343,106), advance category icons, battle animation frames (8×32×32 at y=356), and map grid sprites (64×32 at y=430). Only grid sprites are map-relevant; all other icons are city screen / advisor UI. Chroma: magenta idx 253 + light pink idx 255.
- [x] **Tiles.dll nuke sprite sheet**: ~~CATALOGED~~. Resource #85, 6×2 grid = 12 animation frames, 91×72px cells with 1px magenta borders. Grid area: 553×147px in upper-left of 640×480 image. Frame 0 at (1,1), frame 1 at (93,1), etc., stepping by 92px horizontally and 73px vertically. Sequence: flash → fireball → mushroom cloud → dissipation. Rendering trigger: nuclear missile attack on tile. Animation timing TBD.
- [x] **Tiles.dll government/diplomacy icons**: ~~CATALOGED~~. Resource #86, 66px grid spacing (64×64 cells + 2px magenta border). Row 0 (y=2): government icons dark/3D style (cols 0-6 = Anarchy through Democracy). Row 1 (y=68): same in gold/bright style. Row 2 (y=134): diplomacy status text labels (Cease Fire, Peace, War, Old Alliance, Modern Alliance). Row 3 (y=200): diplomacy icons 3D. Row 4 (y=266): diplomacy icons flat. Cyan chroma key for transparency.

##### City Sprite Selection
- [x] **Era/epoch tech thresholds**: ~~RESOLVED~~. City sprite era is determined by milestone tech combinations (not tech count): Ancient=default, Renaissance=Invention+Philosophy, Industrial=Industrialization, Modern=Automobile+Electronics. The `@CIVILIZE` epoch field (0–3) classifies individual techs by era but does not directly control city sprite selection. Tech IDs: Invention=38, Philosophy=60, Industrialization=37, Automobile=5, Electronics=24.
- [x] **City style per-civ assignment**: ~~RESOLVED~~. See "Civilization Style Assignments (`@LEADERS`)" table in the RULES.TXT Reference Data section. Distribution: Bronze Age (0) = 8 civs, Classical (1) = 4, Far East (2) = 3, Medieval (3) = 6.
- [ ] **MODERN ALT row (row 6)**: Described as "possibly used for specific city sizes or as an alternate for variety." When does the game select row 6 instead of row 5 (MODERN)? Is it a style-specific override? A size threshold? Random variety?
- [ ] **FAR EAST row (row 2)**: "May function as a style-specific variant rather than a chronological era." Determine whether this row is selected by era (like rows 0–5) or by city style (certain civs always use this row regardless of era).

##### Base Terrain Rendering
- [ ] **Variant selection algorithm**: The doc says "The exact algorithm is unknown" with a "BEST GUESS" hash formula. The renderer uses `(gx * 13 + gy * 7) % variants.length`. Need to reverse-engineer the actual game's terrain variant selection — the game may use a seed-based or pre-computed value stored in the map data (byte[5] high nibble?).
- [ ] **Dither mask asymmetry**: The doc notes "The diamond is left-right symmetric in shape but NOT in dither hole placement" and horizontal flip is critical, but doesn't document the exact asymmetry pattern. Would benefit from a pixel-level reference image showing which side has more/fewer transparent holes.

##### DLL-Based Screens (Non-Map Rendering)
- [ ] **cv.dll city view**: 16 GIFs total. Improvements (#300, 740×710, 42+ isometric building sprites), wonders (#305, 640×1130, 28+ wonder sprites), surroundings (#310, 640×680, forest/village growth tiles), landscape backgrounds (#340–353, 12 panoramas at 1280×480 each). Exact cell grids, building-ID-to-sprite mappings, and landscape selection rules still needed.
- [ ] **mk.dll diplomacy**: 56 GIFs + 21 CTABs. Leader portraits (#220–261, 42 at 227×277), meeting room backgrounds (#200–206, 7 at 640×480, one per government type), throne rooms (#10000–10002). CTABs (#1000–1020, 773 bytes each = 5-byte header + 256 RGB triples) for per-civ palette colorization. Civ-to-portrait-ID mapping, government-to-background mapping, and CTAB application rules still needed.
- [ ] **pv.dll palace view**: 55 GIFs. Base room (#100, 640×480), rock backgrounds (#105–108), 6 component sets (#110–143, groups of 4), decorative elements (#160–166), fine details (#170–184). All 642×482 (1px border). Positioning rules, tier-selection logic, and compositing order still needed.
- [ ] **ss.dll spaceship**: 46 GIFs. Build stages (#400–440, 24 frames at 640×480), structural components (#441–442, 695×110 strips), propulsion (#455–456, 905×104 strips), habitation (#470–471, 290×85), solar panels (#480–481, 411×78), fuel cells (#489–490, 550×120), earth-from-space (#499, 640×480), build animation (#20000–20007, 8 progressive stages). Component-count-to-view mapping and animation timing still needed.

## Community References

- **Allard Höfelt's Hex-Editing Guide** (hexedit.rtf, v1.8, April 2005): The original and most comprehensive community documentation. Written for Fantastic Worlds but applicable to all versions. Covers header toggle flags, tribes (7 × 242-byte name blocks), per-civ data (8 × 1,428-byte blocks including treasury, treaties, tech bitmask, unit counts), map data (all 6 tile bytes including body counter, visibility, ownership/fertility), units (all 26 fields), cities (all 84 fields), post-city data (city name counters, cursor position, passwords, kill history), and events (EVNT section with 298-byte records). Contributors: AGRICOLA, Captain Nemo, Paul "Kull" Cullivan, Carl "Gothmog" Fritz, Andrew Livings, Javier "yaroslav" Muñoz Kirschberg, Angelo Scotto, SlowThinker, Harlan Thompson, Xin Yu, Jorrit "Mercator" Vermeiren (editor since v1.7). Confirms MGE city = 88 bytes (vs FW 84 bytes), MGE unit = 32 bytes (vs FW 26 bytes). Available in tek10/civ2mod repository.
- **TE Kimball's civ2mod.c**: C program for modifying MGE save files. Provides definitive MGE-specific offset constants (`CITY_ITEM_NAME_OFFSET 32`, `CITY_ITEM_OWNER_OFFSET 8`, `CITY_ITEM_SIZE 88`, `UNIT_ITEM_SIZE 32`, `UNIT_OWNER_OFFSET 7`, `UNIT_TYPE_OFFSET 6`, `UNIT_HOMECITY_OFFSET 16`). Demonstrates complete file navigation from map header through units to cities. Key algorithms confirmed: tile coordinate→offset formula (`(y*mapWidth + x/2) * 6`), map ownership modification (high nibble of byte 5), visibility radius patterns (radius 0/1/2 tile offsets), horizontal wrapping with vertical clipping, unit home city as uint16 array index, and city finding via name string search. Source: https://github.com/tek10/civ2mod
- **Catfish's Cave** (FoxAhead's ToT format guide): https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm — Documents the save format for Test of Time (92-byte cities). Derived from Höfelt's guide with ToT-specific extensions. Useful cross-reference but requires offset conversion for MGE.
- **FoxAhead's Civ2Types.pas**: https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas — Pascal type definitions from the Civ2-UI-Additions project. The `TCiv` record provides authoritative field offsets for the per-civ data block, including treaty start (0x20), attitude array (0x40), and rate fields (0x13–0x14). Based on Catfish's Cave documentation with additions from runtime memory analysis.
- **Civ2-clone** (axx0): https://github.com/axx0/Civ2-clone — Open source C# reimplementation of Civilization II. The most authoritative source for sprite extraction coordinates and rendering algorithms. Key files: `Civ2GoldInterface.cs` (sprite sheet Rectangle coordinates), `Draw.Terrain.cs` (terrain overlay rendering with neighbor-connectivity bitmask). Confirmed the 4-bit diagonal neighbor bitmask for forest/mountain/hill overlay variant selection (NE=1, SE=2, SW=4, NW=8).
- **Scenario League Wiki — The Palette Explained**: https://sleague.civfanatics.com/index.php?title=The_Palette_Explained — Definitive documentation of the Civ2 256-color palette, including reserved indices (253=magenta transparent, 254=green grid, 255=gray transparent) and civ-color substitution indices (251=dark shade, 252=light shade).
- **Apolyton Forums** and **CivFanatics** — Community hex editing threads provided clues for city record structure and map data locations.
- Note: Community documentation is often for original Civ2, Fantastic Worlds, or Test of Time. MGE uses the same layout as FW but with 4 extra bytes per city (88 vs 84) and 6 extra bytes per unit (32 vs 26). **SCN files use the FW record sizes** (26-byte units, 84-byte cities).

---

## SCN vs SAV Structural Differences

`.SCN` files are the original scenario data as authored in the scenario editor, before being loaded into the game engine. When a player opens a `.SCN` and saves it, the resulting `.SAV` file has a different internal structure. The differences are systematic and consistent:

| Feature | SCN | SAV / NET / HOT / EML |
|---------|-----|----------------------|
| Game state preamble size | 316 bytes | 330 bytes (+14) |
| Per-civ name blocks start | 0x014A | 0x0158 |
| Per-civ data block size | 1,396 bytes | 1,428 bytes (+32 each) |
| Map header offset | **13432** (0x3478) | **13702** (0x3586) |
| Unit record size | **26 bytes** | **32 bytes** (+6: unit ID + padding) |
| City record size | **84 bytes** | **88 bytes** (+4: city ID + padding) |
| Unit sequence ID field | Not present | +26: uint16 LE (unique ID) |
| City sequence ID field | Not present | +84: uint16 LE (unique ID) |
| Tail size | 1,907 bytes | 1,807 (standard) / 1,907 (scenario) / 2,979 (NET) |

**Total offset shift**: 14 (preamble) + 8 × 32 (per-civ) = **270 bytes**. This is the constant difference between SCN and SAV map header offsets: 13702 − 13432 = 270.

**Detection**: Check `header[0x0D] & 0x01` for the scenario flag. Additionally, SCN files can be distinguished from scenario SAV files by checking whether the per-civ name blocks start at 0x0148 (SCN) vs 0x0156 (SAV). In practice, the file extension is the most reliable indicator.

**Parsing strategy**: To write a universal parser, determine the file type first, then set record sizes and offsets accordingly:

```python
if is_scn_file:
    MAP_HEADER_OFFSET = 13432
    UNIT_RECORD_SIZE  = 26
    CITY_RECORD_SIZE  = 84
else:
    MAP_HEADER_OFFSET = 13702
    UNIT_RECORD_SIZE  = 32
    CITY_RECORD_SIZE  = 88
```

---

## Map Template File Format (.MP)

`.MP` files are pre-built map templates used by the scenario editor and "Load Map" option. They do **NOT** use the `CIVILIZE` header. The format is simple and self-contained:

### Structure

```
┌──────────────────────────────────────┐
│ Map Header (14 bytes)                │  offset 0
├──────────────────────────────────────┤
│ Starting Positions (84 bytes)        │  offset 14
│   21 civs × 4 bytes (x, y uint16)   │
├──────────────────────────────────────┤
│ Tile Data (map_size × 6 bytes)       │  offset 98
│   6-byte interleaved records         │
└──────────────────────────────────────┘
```

Total file size: `98 + map_size × 6` bytes.

### Map Header (14 bytes, offset 0)

Identical structure to the SAV map header:

| Offset | Size | Field | Example (Small World) |
|--------|------|-------|----------------------|
| 0 | 2 bytes | `map_width2` (uint16 LE) | 80 |
| 2 | 2 bytes | `map_height` (uint16 LE) | 50 |
| 4 | 2 bytes | `map_size` (uint16 LE) | 2000 |
| 6 | 2 bytes | `map_shape` (uint16 LE) | 0=wrapping, 1=flat |
| 8 | 2 bytes | Unknown | |
| 10 | 2 bytes | `quarter_width` (uint16 LE) | 20 |
| 12 | 2 bytes | `quarter_height` (uint16 LE) | 13 |

**Validation**: `map_size` must equal `(map_width2 / 2) × map_height`.

### Starting Positions (84 bytes, offset 14)

21 entries of 4 bytes each — one per civilization in `LEADERS.TXT` order (index 0 = Romans, 1 = Babylonians, ..., 20 = Sioux):

| Offset | Size | Field |
|--------|------|-------|
| 14 + civ×4 | 2 bytes | Starting X (uint16 LE) |
| 14 + civ×4 + 2 | 2 bytes | Starting Y (uint16 LE) |

A value of `0xFFFF` for either coordinate means the civilization has no preset starting location on this map (random placement or unused).

### Tile Data (offset 98, 6 bytes per tile)

Each tile is stored as a 6-byte interleaved record, in the same row-major order as SAV Block 2. The format is similar to but not identical to SAV terrain data:

| Byte | Field | Notes |
|------|-------|-------|
| 0 | Terrain + flags | Low nibble = terrain type (0-10). Bit 7 = special resource. Same encoding as SAV Block 2 byte[0]. |
| 1 | Rivers | Bit 1 (0x02) = river. Same encoding as SAV Block 2 byte[1]. Usually 0x00. |
| 2 | Reserved | Always 0x00 in base maps. |
| 3 | Body ID | Always 0x00 in base maps (assigned at game generation). |
| 4 | Terrain copy | Near-duplicate of byte 0. Possibly used for validation or undo. |
| 5 | Status byte | Usually 0xF0 (240). Occasionally 0xF8, 0x10, or 0x18. Bit meanings not fully decoded. |

**Key differences from SAV Block 2**: MP files lack per-civ visibility data (SAV byte[4]), ownership information, and city radius markings. The tile data represents raw geography only.

---

## RULES.TXT — Game Rules Definition

`RULES.TXT` defines the core game rules and is parsed by the game engine at startup. Scenarios can override it with a local copy. The file uses semicolons (`;`) for comments and `@SECTION` markers for each data block.

### Sections

| Section | Content | Records |
|---------|---------|---------|
| `@COSMIC` | Global game constants | 21 numeric values (road multiplier, food per citizen, tech paradigm, etc.) |
| `@CIVILIZE` | Technology definitions | 93 entries (89 standard + Future Tech + 3 user-defined + 7 extra slots) |
| `@IMPROVE` | City improvements & wonders | 67 entries (improvements 0-38, wonders 39-66) |
| `@ENDWONDER` | Wonder expiration advances | 28 entries (one per wonder) |
| `@UNITS` | Unit type definitions | 62 entries (52 standard + 11 user-defined slots) |
| `@TERRAIN` | Terrain properties | 11 base types + 11 special resource variants |
| `@GOVERNMENTS` | Government types | 7 entries (Anarchy through Democracy) |
| `@LEADERS` | Civilization definitions | 21 entries + 2 extra slots |
| `@CARAVAN` | Trade commodities | 16 entries |
| `@ORDERS` | Unit order names | 11 entries with keyboard shortcuts |
| `@DIFFICULTY` | Difficulty level names | 6 entries (Chieftain through Deity) |
| `@ATTITUDES` | Diplomatic attitude names | 9 entries (Worshipful through Enraged) |

### Unit Definition Format (`@UNITS`)

Each line: `Name, obsolete_tech, domain, move, range, attack, defense, hp, firepower, cost, hold, role, prereq, flags`

- **Domain**: 0=Ground, 1=Air, 2=Sea
- **Role**: 0=Attack, 1=Defend, 2=Naval, 3=Air Superiority, 4=Sea Transport, 5=Settle, 6=Diplomacy, 7=Trade
- **Flags**: 15-bit binary string encoding special abilities (two-space visibility, ignore ZOC, amphibious, submarine, etc.)

Unit type IDs in save files (byte +6 of unit records) correspond directly to the 0-indexed line number in `@UNITS`.

### Civilization Style Assignments (`@LEADERS`)

Each civilization in LEADERS.TXT / RULES.TXT `@LEADERS` has a **city style** (0–3) determining which column of CITIES.GIF to use for city sprites. Colors cycle among the 7 civ slots (civs with the same color number share a palette).

| Slot | Civ | Color | City Style | Style Name |
|------|-----|-------|------------|------------|
| 0 | Romans | 1 (White) | 1 | Classical |
| 1 | Babylonians | 2 (Green) | 0 | Bronze Age |
| 2 | Germans | 3 (Blue) | 3 | Medieval |
| 3 | Egyptians | 4 (Yellow) | 0 | Bronze Age |
| 4 | Americans | 5 (Cyan) | 1 | Classical |
| 5 | Greeks | 6 (Orange) | 1 | Classical |
| 6 | Indians | 7 (Purple) | 2 | Far East |
| 7 | Russians | 1 (White) | 3 | Medieval |
| 8 | Zulus | 2 (Green) | 0 | Bronze Age |
| 9 | French | 3 (Blue) | 3 | Medieval |
| 10 | Aztecs | 4 (Yellow) | 0 | Bronze Age |
| 11 | Chinese | 5 (Cyan) | 2 | Far East |
| 12 | English | 6 (Orange) | 3 | Medieval |
| 13 | Mongols | 7 (Purple) | 0 | Bronze Age |
| 14 | Celts | 1 (White) | 0 | Bronze Age |
| 15 | Japanese | 2 (Green) | 2 | Far East |
| 16 | Vikings | 3 (Blue) | 3 | Medieval |
| 17 | Spanish | 4 (Yellow) | 3 | Medieval |
| 18 | Persians | 5 (Cyan) | 0 | Bronze Age |
| 19 | Carthaginians | 6 (Orange) | 1 | Classical |
| 20 | Sioux | 7 (Purple) | 0 | Bronze Age |

**Style distribution**: Bronze Age (0) = 8 civs, Classical (1) = 4 civs, Far East (2) = 3 civs, Medieval (3) = 6 civs.

### Special Resource Names (`@TERRAIN`)

Each of the 11 base terrain types has 2 special resource variants, placed by the map seed algorithm:

| Terrain | Resource 1 | Resource 2 |
|---------|-----------|-----------|
| Desert | Oasis | Desert Oil |
| Plains | Buffalo | Wheat |
| Grassland | Grassland Shield | Grassland Shield |
| Forest | Pheasant | Silk |
| Hills | Coal | Wine |
| Mountains | Gold | Iron |
| Tundra | Game | Furs |
| Glacier | Ivory | Glacier Oil |
| Swamp | Peat | Spice |
| Jungle | Gems | Fruit |
| Ocean | Fish | Whales |

### Attitude Names (`@ATTITUDES`)

| Value | Attitude |
|-------|----------|
| 0 | Worshipful |
| 1 | Enthusiastic |
| 2 | Cordial |
| 3 | Receptive |
| 4 | Neutral |
| 5 | Uncooperative |
| 6 | Icy |
| 7 | Hostile |
| 8 | Enraged |

### Trade Commodities (`@CARAVAN`)

| ID | Commodity |
|----|-----------|
| 0 | Hides | 1 | Wool | 2 | Beads | 3 | Cloth |
| 4 | Salt | 5 | Coal | 6 | Copper | 7 | Dye |
| 8 | Wine | 9 | Silk | 10 | Silver | 11 | Spice |
| 12 | Gems | 13 | Gold | 14 | Oil | 15 | Uranium |

### Technology Definition Format (`@CIVILIZE`)

Each line: `Name, AI_value, civilize_modifier, prereq1, prereq2, epoch, category`

- **Epoch**: 0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern
- **Category**: 0=Military, 1=Economic, 2=Social, 3=Academic, 4=Applied
- **Prerequisites**: 3-letter abbreviation of another tech, or `nil`/`no` for none

Technology IDs in save files (byte arrays at 0x0042 and 0x00A6) correspond to 0-indexed line numbers in `@CIVILIZE`.

### Improvement/Wonder Definition Format (`@IMPROVE`)

Each line: `Name, cost_x10, upkeep, prerequisite_tech`

- IDs 0-38 are city improvements/special (Nothing=0, Palace=1, Barracks=2, ..., Offshore Platform=31, Airport=32, Police Station=33, Port Facility=34, SS Structural=35, SS Component=36, SS Module=37, Capitalization=38)
- IDs 39-66 are Wonders of the World (28 wonders, matching wonderCityIds[0-27] order)
- The building bitmask in city records (+52-55) uses 1-indexed bits matching these IDs

### Terrain Definition Format (`@TERRAIN`)

Each line: `Name, move_cost, defense, food, shields, trade, irrigate_type, irrigate_bonus, irrigate_turns, ai_irrigate, mine_type, mine_bonus, mine_turns, ai_mine, transform_to`

Terrain type IDs in save file tile data (byte[0] & 0x0F) correspond to 0-indexed line numbers: 0=Desert, 1=Plains, 2=Grassland, 3=Forest, 4=Hills, 5=Mountains, 6=Tundra, 7=Glacier, 8=Swamp, 9=Jungle, 10=Ocean.

Lines 11-21 define **special resource** variants for each terrain type (Oasis for Desert, Buffalo for Plains, etc.), which appear when byte[0] bit 7 is set.

---

## DLL Embedded Resource Catalog

All Civ2 MGE DLLs use a custom PE resource type `GIFS` (language 1033, English US) to embed GIF images. Total: **243 GIF resources** across 8 DLLs. Resource extraction tested with Python `pefile` module; all GIFs saved to `/tmp/civ2_dll_gifs/`. Cross-referenced against [Civ2-clone](https://github.com/axx0/Civ2-clone) `Civ2GoldInterface.cs` where applicable.

| DLL | Size | GIFs | Other | Content |
|-----|------|------|-------|---------|
| Tiles.dll | 1,417 KB | 24 | — | Advisor backgrounds, event illustrations, nuke sprites, govt/diplo icons |
| cv.dll | 4,980 KB | 16 | — | City View: improvement sprites, wonder sprites, landscape backgrounds |
| mk.dll | 3,166 KB | 56 | 21 CTAB | Diplomacy: leader portraits (42), throne room backgrounds, color tables |
| pv.dll | 1,999 KB | 55 | — | Palace View: room backgrounds, building components |
| ss.dll | 1,456 KB | 46 | — | Spaceship: component sprites, build stages, space backgrounds |
| Intro.dll | 1,151 KB | 13 | — | Intro cutscene frames (geographic scenes) |
| Wonder.dll | 186 KB | 28 | — | Wonder movie thumbnails (74×74 each) |
| Civ2Art.dll | 257 KB | 5 | — | Credits, starfield backgrounds, UI panels |

### Tiles.dll — Map-Relevant Resources

**GIFS/85 — Nuke Explosion** (21,611 bytes, 640×480): 6×2 grid = 12 animation frames, 91×72px cells, 1px magenta borders. Grid area 553×147px. Frame coordinates: (col×92+1, row×73+1). Sequence: flash → fireball → mushroom cloud → dissipation.

**GIFS/86 — Government & Diplomacy Icons** (41,213 bytes, 640×480): 66px grid (64×64 cells + 2px magenta border), cyan transparency fill. Row 0: govt icons dark 3D (Anarchy=col 0 through Democracy=col 6). Row 1: govt icons gold/bright. Row 2: diplomacy labels (Cease Fire, Peace, War, Old Alliance, Modern Alliance). Rows 3-4: diplomacy icons (3D shaded / outlined).

**GIFS/50–59** — Advisor backgrounds (640×480): City Report (#50, Jerusalem), Defense Minister (#51, cavalry), Attitude Advisor (#52, Byzantine), Trade Advisor (#53, classical figure), Science Advisor (#54, freight cart), #55 (seated figure with globe), #56 (Stonehenge), #57 (celebration fireworks), #58 (Egyptian painting), #59 (Greek column).

**GIFS/70–77** — Event illustrations (variable sizes): City capture ancient (#70, 270×189), city capture modern (#71, 145×257), revolution (#72, 261×194), democracy protest (#73, 230×198), medieval/Islamic (#74, 277×148), victory parade (#75, 178×262), city founded ancient (#76, 290×176), city founded modern (#77, 197×294).

### mk.dll — Leader Portraits

42 portraits at 227×277px (GIFS/220–261). 21 CTAB palette resources (GIFS/1000–1020, 773 bytes each: 5-byte header + 256 RGB triples) for per-civ palette colorization. 7 meeting room backgrounds (GIFS/200–206, 640×480) for government-specific diplomacy scenes.

### Wonder.dll — Thumbnails

28 wonder thumbnails at 74×74px (GIFS/20000–20027), 1,607 bytes each. One per wonder in standard build order (Pyramids → Marco Polo's Embassy).

---

## Events Section (Scenario Files)

Scenario files (`.SCN` and scenario `.SAV`) can contain an embedded events section at the very end of the file, after all other data. This replaces the external `events.txt` file. The section is optional — if absent, the file simply ends after the tail data.

### Events Structure

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 4 bytes | **Magic signature** | `"EVNT"` (ASCII). Easy to locate by searching for this string. |
| +4 | 2 bytes | **Event count** (uint16 LE) | Number of event records that follow. |
| +6 | N × 298 bytes | **Event records** | 298 bytes per event. |
| after records | variable | **String table** | All text values concatenated as null-terminated strings. |

### Event Record (298 bytes)

| Offset | Size | Field | Notes |
|--------|------|-------|-------|
| +0 | 4 bytes | **Trigger** (uint32 LE) | Bitmask: 1=UnitKilled, 2=CityTaken, 4=Turn, 8=TurnInterval, 16=Negotiation, 32=ScenarioLoaded, 64=RandomTurn, 128=NoSchism, 256=ReceivedTechnology. |
| +4 | 4 bytes | **Action** (uint32 LE) | Bitmask: bit 0 = Text, bit 1 = MoveUnit, bit 2 = CreateUnit, bit 3 = ChangeMoney, bit 4 = PlayWaveFile, bit 5 = MakeAggression, bit 6 = JustOnce, bit 7 = PlayCDTrack, bit 8 = DontPlayWonders, bit 9 = ChangeTerrain, bit 10 = DestroyACivilization, bit 11 = ChangeTerrain (duplicate). |

The remaining 290 bytes of each event record contain parameters for the trigger and action types (coordinates, civ IDs, unit types, monetary amounts, etc.).

### String Table

Immediately after the event records, a string table contains all text values from the original `events.txt` file pasted sequentially, each terminated by a null byte (`0x00`). This includes text between `TEXT` and `ENDTEXT` markers (each line is a separate string) and all values after `=` signs (except numbers and the veteran property value).

> **Note**: It is possible to embed events directly in a scenario `.SCN` file (adding the EVNT section) and omit the separate `events.txt` file entirely.

---

## Other Data Files

### Game.txt — UI String Database

Contains **2,179+ named sections** (marked with `@SECTIONNAME`) defining all UI dialog text, popup messages, menu labels, and in-game notifications. Each section specifies optional width (`@width=N`), title (`@title=...`), button labels, and content lines. Used by the game engine for all localizable user-facing text.

### Describe.txt — Advisor Dialog Text

Contains detailed text blocks for the science advisor, trade advisor, military advisor, and other in-game advisor screens. Organized by section markers similar to Game.txt.

### CITY.TXT — City Name Lists

Defines the ordered list of city names for each of the 21 civilizations. When a civilization founds a new city, the game assigns names sequentially from this list. The order matches `LEADERS.TXT` civilization indices.

### PEDIA.TXT — Civilopedia Entries

Contains the text for all Civilopedia encyclopedia entries (technologies, units, improvements, wonders, terrain types, concepts). Displayed in the in-game Civilopedia reference.

### COUNCIL0/1/2.TXT — Advisor Council Dialogs

Three files for the three eras of advisor council discussions: `COUNCIL0.TXT` (Ancient era), `COUNCIL1.TXT` (Renaissance era), `COUNCIL2.TXT` (Modern era). Each contains dialog lines for the six advisors (military, science, trade, domestic, foreign, attitude) with conditional text based on game state.

### DEBUG.TXT — Debug Message Templates

Contains internal debug message format strings that reveal variable names and data structures used by the game engine. Useful for reverse engineering as it exposes field names like `Attack Factor`, `Defense Factor`, `Hit Points`, and state machine labels.

### Labels.txt — UI Label Strings

Contains **888+ strings** used for UI labels, button text, menu items, and status bar messages. Numbered sequentially. Cross-referencing with game screenshots helps identify which label IDs correspond to which UI elements.

---

## Appendix A: FoxAhead TCiv Record (In-Memory Layout)

The following is the complete `TCiv` packed record from FoxAhead's Civ2-UI-Additions project (`src/Civ2Types.pas`). This represents the in-memory layout of the per-civ data block, which maps 1:1 to the save file per-civ block (1,428 bytes = 0x594). Memory base address: `0x64C6A0`.

Source: https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas

```pascal
TCiv = packed record                              // Size = 0x594 (1428 bytes)
  Flags: Word;                                    // +0x00 (2 bytes: state flags + gender)
  Gold: Integer;                                  // +0x02 (4 bytes, signed)
  Leader: Word;                                   // +0x06 (rulesCivNumber + civVariant)
  Beakers: Word;                                  // +0x08
  ResearchingTech: SmallInt;                      // +0x0A
  CapitalX: SmallInt;                             // +0x0C
  TurnOfCityBuild: SmallInt;                      // +0x0E
  Techs: Byte;                                    // +0x10 (acquired tech count)
  FutureTechs: Byte;                              // +0x11
  Unknown_12: ShortInt;                           // +0x12 (always 0 in MGE)
  ScienceRate: Byte;                              // +0x13 (0-10)
  TaxRate: Byte;                                  // +0x14 (0-10)
  Government: Byte;                               // +0x15 (0=Anarchy..6=Democracy)
  SenateChances: ShortInt;                        // +0x16 (empirically: AI random seed 0-99)
  Unknown_17: array[$17..$1A] of Byte;            // +0x17 (4 bytes: AI diplomatic counters)
  Unknown_1B: Byte;                               // +0x1B (always 0)
  Unknown_1C: Word;                               // +0x1C (treaty-breaking count)
  Reputation: Byte;                               // +0x1E (0-7: Spotless to Atrocious)
  Unknown_1F: Byte;                               // +0x1F (patience counter, 0-6)
  Treaties: array[0..7] of Integer;               // +0x20 (32 bytes: 4 bytes × 8 civs)
  Attitude: array[0..7] of Byte;                  // +0x40 (8 bytes: attitude per civ)
  Unknown9: array[$48..$153] of Byte;             // +0x48 (268 bytes: LARGE UNKNOWN BLOCK)
    // Contains: treaty violations (int8[8] at +0x48), diplomatic counters (uint8[8] at +0x50),
    // tech bitmask (12 bytes at +0x58), tech overflow (byte at +0x64),
    // military power (uint16 at +0x66), city count (uint16 at +0x68),
    // naval unit count (uint16 at +0x6A), sum of city sizes (uint16 at +0x6C),
    // total unit atk+def sum (uint16 at +0x6E), total unit atk sum (uint16 at +0x70),
    // first discoverer flags (100 bytes at +0x72), active unit counts (63 bytes at +0xD6),
    // casualty counts (63 bytes at +0x115), units in production (62 bytes at +0x154)
  DefMinUnitBuilding: array[0..61] of Byte;       // +0x154 (62 bytes: units in production)
  Unknown_192: array[0..63] of Word;              // +0x192 (Block A: military power per continent)
  Unknown_212: array[0..63] of Word;              // +0x212 (Block B: land attack per continent)
  Unknown_292: array[0..63] of Byte;              // +0x292 (Block C: city count per continent)
  Unknown_2D2: array[0..63] of ShortInt;          // +0x2D2 (Block D: city sizes per continent)
  Unknown_312: array[0..63] of ShortInt;          // +0x312 (Block E: transient flags)
  Unknown_352: array[0..63] of ShortInt;          // +0x352 (Block F: status bitflags)
  Unknown_392: array[0..63] of ShortInt;          // +0x392 (Block G: unit "ever built" flags)
  Unknown_3D2: SmallInt;                          // +0x3D2 (Block H: power graph H[0])
  Unknown_3D4: array[0..6] of SmallInt;           // +0x3D4 (Block H: power graph H[1]-H[7])
  Unknown_3E2: array[0..7] of SmallInt;           // +0x3E2 (last contact turns, 7 entries + padding)
  Unknown_3F2: ShortInt;                          // +0x3F2 (AI persona index)
  Unknown_3F3: array[0..9] of ShortInt;           // +0x3F3 (constant padding [1,1,0,1,0,0,1,0,0,0])
  Unknown_3FD: ShortInt;                          // +0x3FD (constant padding byte 11: 0)
  Unknown_3FE: SmallInt;                          // +0x3FE (spaceship structural count)
  SpaceFlags: Byte;                               // +0x400 (0x01=Started, 0x02=Launched, 0x08=Fusion)
  Unknown_401: array[0..18] of ShortInt;          // +0x401 (spaceship propulsion, estimates, zero pad)
  Unknown_414: array[0..47] of TCivSub1;          // +0x414 (AI continent goals, entries 0-47)
  Unknown_534: array[0..15] of TCivSub1;          // +0x534 (AI continent goals, entries 48-63)
end;

TCivSub1 = packed record   // 6 bytes
  X: SmallInt;             // +0: map x-coordinate
  Y: SmallInt;             // +2: map y-coordinate
  Unknown_4: Byte;         // +4: goal type (0=explore, 1=attack, 5=city site, 255=empty)
  Unknown_5: Byte;         // +5: goal extra (signed priority or target civ)
end;
```

> **Notes**: FoxAhead's `Flags` (Word, 2 bytes) combines what our parser splits into `stateFlags` (byte 0) and `gender` (byte 1). Similarly, `Leader` (Word) combines `rulesCivNumber` and `civVariant`. The `Unknown9` block (268 bytes) has been substantially decoded by this project through statistical analysis of 232 save files — see the inline annotations above. FoxAhead's `DefMinUnitBuilding` at +0x154 corresponds to our `unitsInProduction` array.

## Appendix B: FoxAhead TUnit and TUnitType Records

These records from `Civ2Types.pas` define the in-memory layout of unit data, validating our unit parser.

```pascal
TUnit = packed record    // Size = 0x20 (32 bytes)
  X: Word;               // +0x00
  Y: Word;               // +0x02
  Attributes: Word;      // +0x04 (veteran, etc.)
  UnitType: Byte;        // +0x06
  CivIndex: ShortInt;    // +0x07 (owner civ slot)
  MovePoints: ShortInt;  // +0x08
  Visibility: Byte;      // +0x09 (per-civ visibility bitmask)
  HPLost: Byte;          // +0x0A
  MoveDirection: Byte;   // +0x0B
  DebugSymbol: Char;     // +0x0C
  Counter: ShortInt;     // +0x0D
  MoveIteration: Byte;   // +0x0E
  Orders: ShortInt;      // +0x0F (0=none, 1=fortifying, 2=fortified, etc.)
  HomeCity: Byte;         // +0x10 (city array index; 0xFF = no home city)
  byte_11: Byte;          // +0x11
  GotoX: Word;           // +0x12
  GotoY: Word;           // +0x14
  PrevInStack: Word;     // +0x16
  NextInStack: Word;     // +0x18
  ID: Integer;           // +0x1A (unique sequence ID)
  word_1E: Word;         // +0x1E
end;

TUnitType = packed record  // Size = 0x14 (20 bytes)
  StringIndex: Cardinal;
  Abilities: Cardinal;
  Until_: Byte;
  Domain: Byte;            // 0=Ground, 1=Air, 2=Sea
  Move: Byte;
  Range: Byte;
  Att: Byte;               // RULES.TXT attack value
  Def: Byte;               // RULES.TXT defense value
  HitPoints: Byte;
  FirePower: Byte;
  Cost: Byte;
  Hold: Byte;
  Role: Byte;              // 0=Attack, 1=Defend, 2=Naval, 3=Air, 4=Transport, 5=Settle, 6=Diplomacy, 7=Trade
  Preq: Byte;              // prerequisite tech index
end;
```

> **Notes**: `HomeCity` is a single byte (max 255), limiting the number of cities to 255 per civ in standard MGE. TOTPP extends this to a word for >255 city support. `TUnitType.Att` and `TUnitType.Def` are the RULES.TXT base values used by the runtime counters at per-civ bytes 111–114.

## Appendix C: Source URLs

### GitHub Repositories
- **FoxAhead/Civ2-UI-Additions** (Pascal DLL injection, TCiv struct): https://github.com/FoxAhead/Civ2-UI-Additions
- **axx0/Civ2-clone** (C# reimplementation): https://github.com/axx0/Civ2-clone
- **Catfish's Cave** (ToT hex format documentation): https://github.com/FoxAhead/Catfish-s-Cave
- **vinceho/civ2patch** (C++ binary patching): https://github.com/vinceho/civ2patch
- **tek10/civ2mod** (C save editor, ships hexedit.rtf): https://github.com/tek10/civ2mod
- **LukeGoodsell/civ2.pm** (Perl module, minimal): https://github.com/LukeGoodsell/civ2.pm
- **TOTPP Code Library** (Lua scripting library): https://github.com/javiermunozk/TOTPP-Code-Library

### Documentation Pages
- **Catfish's Cave hex doc** (ToT save format): https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm
- **TOTPP Lua auto-docs** (tribe object API): https://profgarfield.github.io/auto_doc/tribeObject.html
- **Allard Höfelt hexedit.rtf v1.8** (original FW/MGE reference, 1-indexed): https://ia800304.us.archive.org/11/items/civ2-hex-editing/Hex%20Editing.pdf
- **Apolyton SAV/SCN format** (Mercator): https://apolyton.net/forum/civilization-series/civilization-i-and-civilization-ii/130935-civilization-ii-sav-scn-file-format
- **Freeciv21 Civ2 loading** (limited import): https://longturn.readthedocs.io/en/latest/Manuals/Advanced/civ2.html

### CivFanatics Forum Threads
- **Civ2 Patch Project**: https://forums.civfanatics.com/threads/mge-civ-2-patch-project.570939/
- **CIV2UIA**: https://forums.civfanatics.com/threads/civilization-ii-mge-user-interface-additions-civ2uia.697565/
- **Civ2-clone**: https://forums.civfanatics.com/threads/making-a-clone-of-civ-ii.697563/
- **TOTPP**: https://forums.civfanatics.com/threads/the-test-of-time-patch-project.517282/
- **TOTPP Lua Reference**: https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/
- **ToT Save Game Format** (treaty flags): https://forums.civfanatics.com/threads/save-game-format.631770/
- **Demographics**: https://forums.civfanatics.com/threads/demographics.42324/
- **How Demographics Works**: https://forums.civfanatics.com/threads/how-the-demographics-works.37033/
- **Power Rating vs Power Graph**: https://forums.civfanatics.com/threads/power-rating-vs-power-graph.463/

### Wiki / Reference
- **Diplomacy (Civ2)**: https://civilization.fandom.com/wiki/Diplomacy_(Civ2) — reputation scale, power rating
- **Reputation (Civ2)**: https://civilization.fandom.com/wiki/Reputation_(Civ2) — betrayals, decay mechanics
- **AI Personalities** (LP Archive): https://lparchive.org/Civilization-2/Update%2030/

