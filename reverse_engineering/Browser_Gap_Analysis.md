# Browser Implementation Gap Analysis

Comparison of the decompiled Civ2 MGE code against the current browser
implementation in `canvas-test-1/`. Identifies what exists, what's missing,
and what the decompiled data can fill.

---

## Parser (parser.js): COMPLETE

The save file parser covers every byte of every record type. No changes needed.

| Section | Bytes | Status |
|---|---|---|
| File header | 14 | Complete — magic, flags, type detection |
| Game state preamble | 330 | Complete — toggles, turn, difficulty, wonder IDs, tech bitmasks |
| Per-civ name blocks | 8 x 242 | Complete — leader, tribe, government titles |
| Per-civ data blocks | 8 x 1428 | Complete — treasury, government, tech, treaties, AI state, spaceship |
| Map header | 14 | Complete — dimensions, shape, seed |
| Map block 1 (known improvements) | 7 x map_size | Complete — per-civ fog of war |
| Map block 2 (tile data) | 6 x map_size | Complete — terrain, improvements, ownership |
| Map block 3 (quarter-res) | qw x qh x 2 | Complete |
| Unit records | N x 32 | Complete — all fields including dead slots |
| City records | N x 88 | Complete — every field decoded |
| Gap record | 32 | Complete |
| Tail data | 1807-2979 | Complete — city names, passwords, kill history, engine constants |
| Scenario events | Variable | Complete — triggers, actions, string table |

### City Fields Parsed (all 88 bytes)

| Parser Name | Offset | Size | Notes |
|---|---|---|---|
| cx, cy | +0, +2 | uint16 x 2 | Map coordinates |
| attribs1-4 | +4..+7 | byte x 4 | Decoded into flags below |
| canBuildCoastal | +4 bit 7 | flag | |
| autoBuild | +4 bit 5 | flag | |
| techStolen | +4 bit 3 | flag | |
| improvementSold | +4 bit 2 | flag | |
| weLoveKingDay | +4 bit 1 | flag | |
| civilDisorder | +4 bit 0 | flag | |
| canBuildHydro | +5 bit 2 | flag | |
| canBuildShips | +6 bit 5 | flag | |
| owner | +8 | uint8 | |
| size | +9 | uint8 | |
| originalOwner | +10 | uint8 | |
| turnsSinceCapture | +11 | uint8 | |
| knownToTribes | +12 | bitmask | |
| believedSize[8] | +14..+21 | byte x 8 | |
| specialistBytes[4] | +22..+25 | byte x 4 | 2-bit packed |
| foodInBox | +26 | int16 | |
| shieldsInBox | +28 | int16 | |
| netBaseTrade | +30 | int16 | |
| name | +32 | 16-char string | |
| workersInner/OuterA/OuterB | +48..+50 | byte x 3 | Bitmasks |
| specialistCount | +51 / 4 | uint8 | |
| buildings | +52 | uint32 bitmask | |
| buildingsV | +56 | uint8 bitmask | |
| itemInProduction | +57 | decoded {type, id} | |
| tradeRouteCount | +58 | uint8 | |
| tradeCommoditiesAvail[3] | +59..+61 | byte x 3 | |
| tradeCommoditiesDemand[3] | +62..+64 | byte x 3 | |
| tradeCommoditiesInRoute[3] | +65..+67 | byte x 3 | |
| tradePartnerCityIds[3] | +68..+73 | uint16 x 3 | |
| scienceOutput | +74 | int16 | |
| taxOutput | +76 | int16 | |
| totalTrade | +78 | int16 | |
| foodProduction | +80 | uint8 | |
| shieldProduction | +81 | uint8 | |
| happyCitizens | +82 | uint8 | |
| unhappyCitizens | +83 | uint8 | |
| sequenceId | +84 | uint16 | SAV only |

### Unit Fields Parsed (all 32 bytes)

| Parser Name | Offset | Size |
|---|---|---|
| x, y / gx, gy | +0, +2 | int16 x 2 |
| movementFlags + decoded bits | +4 | uint8 |
| statusFlags + decoded bits (veteran, etc.) | +5 | uint8 |
| type | +6 | uint8 |
| owner | +7 | uint8 |
| movePointsLeft | +8 | uint8 |
| visFlag | +9 | bitmask |
| hpLost | +10 | uint8 |
| lastDirection | +11 | uint8 |
| aiTaskRole | +12 | uint8 |
| cargoWorkFuel | +13 | uint8 |
| dead | +14 | uint8 |
| orders | +15 | uint8 |
| homeCityId | +16 | uint16 |
| gotoX, gotoY | +18, +20 | int16 x 2 |
| nextInStack, prevInStack | +22, +24 | int16 x 2 |
| sequenceId | +26 | uint16 |

### Civ Fields Parsed (all 1428 bytes)

Treasury, government, tech bitmask (93 techs), treaties[8], attitudes[8],
active unit counts[63], casualty counts[63], units in production[63],
continent statistics, power graph data, contact history, spaceship components,
continent goals[64].

---

## Map Renderer (renderer.js): ~90% Complete

### What EXISTS
- Full terrain compositing (base + overlay + coast + river)
- Roads and railroads with directional neighbor computation
- Improvements (irrigation, farmland, mining, pollution)
- Resources (special tiles + grassland shield)
- Goody huts
- City sprites by era/style/size with walls/open variants
- City flags, size boxes, name labels with civ colors
- Unit sprites with civ-color recoloring and shield system (HP bar, order letter, stacking)
- Fortress, airbase, fortify overlays
- Fog of war with three-state visibility (unexplored/dimmed/visible)
- Dither mask FOW rendering
- Ghost cities on dimmed tiles (using believed size)

### What is MISSING

| Feature | Details | Effort | Decompiled Source |
|---|---|---|---|
| Civil disorder indicator | Fist icon or red highlight on map | Medium | City flags bit 0 |
| WLTKD celebration indicator | Celebration effects | Medium | City flags bit 1 |
| Resistance/occupation indicator | Recently captured cities | Low | owner != originalOwner + turnsSinceCapture |
| Automated unit order letter | "A" on unit shield | Low | statusFlags bit 7 |
| AI task display | Task letter on shield (cheat mode) | Low | aiTaskRole high nibble |
| Cargo/commodity display | Caravan commodity tooltip only | Low | cargoWorkFuel field |
| Full unit stacking render | Only top unit shown | Medium | nextInStack/prevInStack linked list |
| Pollution/global warming overlay | Parsed but not visualized | Low | gameState fields |
| City style 4+ extras | CITIES.GIF has 7 rows, code uses 6 | Low | Era calculation |

---

## City Dialog (citydialog.js): ~75% Complete

### What EXISTS (10 panels)
1. Background — CITY.GIF wallpaper with gold 3D beveled borders
2. Section labels — Citizens, City Resources, Food Storage, City Improvements, Resource Map
3. Citizens row — Face sprites by era from PEOPLE.GIF
4. Resource map — Isometric mini-map of 21 tiles with worked tile indicators
5. Resource rows — 4 rows: Food, Trade, Tax/Lux/Sci, Support/Production
6. Food storage — Wheat grid with granary line + growth progress (NEW)
7. Production panel — Item preview + shield grid + buy cost + turns (NEW)
8. Units supported — Up to 8 in 4x2 grid
9. City improvements — Scrollable list with thumbnails and sell icons
10. Units present / Info panel — Garrisoned units + trade route info
11. Buttons — Buy, Change, Info, Map, Rename, Happy, Panorama, Exit

### What is MISSING

| Feature | Details | Effort | Decompiled Source |
|---|---|---|---|
| Zoom support (-1/0/+1) | All coords hardcoded for zoom=2 | High | FUN_00511690 scaler |
| Happiness analysis panel | "Happy" button toggle mode | Medium | citywin_8552 (5 rows) |
| World minimap mode | "Map" button toggle mode | Medium | citywin_7B69 |
| Rename functionality | Button registered, no action | Low | city_button_rename |
| Buy/Change actions | Buttons display but don't modify state | Medium | city_button_buy |
| Prev/Next city navigation | Defined in REGIONS but not implemented | Low | citywin_BF72/BD13 |
| Improvement scrolling | Only 9 visible, no scroll arrows | Low | FUN_005db0d0 |
| Angry citizens (Anarchy) | Sprite columns 6-7 extracted but not drawn | Low | Happiness calc |
| Per-tile resource overlay | Only food drawn; shields+trade exist | Low | Resource map loop |
| Trade route revenue | Hardcoded "+1" instead of actual calc | Medium | Trade formulas |
| Resource map terrain overlays | No forest/mountain/hill on mini-map | Low | Terrain compositing |
| Resource map city/unit sprites | Spec says draw on mini-map, not done | Low | citywin_70E5 |

---

## City View (cityview.js): ~80% Complete

### What EXISTS
- Building placement from 68-slot table
- Background selection (ocean/river/inland x epoch)
- Alternative vegetation tiles
- Improvement and wonder sprite rendering

### What is MISSING
- Animated smoke/fire effects
- Population-dependent building density
- Building state changes (e.g., factory with power plant)

---

## Game Simulation: 0% Started

None of the following are implemented. All have been analyzed in the decompiled code.

| System | Parsed Data Available | Decompiled Formula Available | Files |
|---|---|---|---|
| Turn execution | Turn counter, toggles | Yes — main game loop | block_004E0000.c |
| Combat resolution | Unit A/D/HP, veteran | Yes — attack/defense formulas | block_00550000.c |
| Diplomacy | Treaties, attitudes, reputation | Partially — treaty logic | block_00460000.c |
| Research | Tech bitmask, progress, cost | Yes — Civ2_Game_Formulas.md #6 | block_004C0000.c |
| Government | Type, rates, senate | Yes — rate constraints | block_00400000.c |
| City production | What's being built, cost | Yes — Civ2_Game_Formulas.md #1 | block_00500000.c |
| City growth | Food box, granary | Yes — Civ2_Game_Formulas.md #2 | block_004E0000.c |
| Happiness | Happy/content/unhappy | Yes — Civ2_Game_Formulas.md #4 | block_004E0000.c |
| Corruption/waste | Distance, government | Yes — Civ2_Game_Formulas.md #5 | block_004E0000.c |
| Unit support | Free units per government | Yes — Civ2_Game_Formulas.md #7 | block_004E0000.c |
| Tile resources | Terrain + improvements | Yes — Civ2_Game_Formulas.md #3 | block_004E0000.c |
| Trade routes | Revenue, commodity matching | Partially | block_004E0000.c |
| Spaceship | Components, launch | Parsed only | block_00500000.c |
| AI decisions | Continent goals, task roles | Phase 2 renaming needed | block_00450000.c |
| Scenario events | Triggers, actions | Parsed, engine not built | block_00530000.c |

---

## Priority Integration Path

1. **City dialog polish** — Happiness panel, minimap mode, zoom support, per-tile resources
2. **Game formula library** — Centralize all formulas from `Civ2_Game_Formulas.md` into a `gameLogic.js` module
3. **Turn engine prototype** — Apply one turn of city production/growth/food to a loaded save
4. **Combat system** — Attack/defense resolution with terrain modifiers
5. **AI logic** — Phase 2 function renaming, then port decision-making
