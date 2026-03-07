# Civilization II Map Renderer (HTML Canvas)

Renders Civilization II Multiplayer Gold Edition save files as interactive maps in the browser using the game's actual sprite sheets.

## Files

```
civ2-map-renderer/
├── index.html      ← Open this in a browser
├── parser.js       ← Binary .SAV file parser
├── renderer.js     ← Canvas sprite extraction + multi-pass renderer
├── app.js          ← UI glue: file loading, tooltip, controls
└── README.md       ← You are here
```

## How to Run

### Option A: Direct file open (simplest)

1. Put all 4 files (`index.html`, `parser.js`, `renderer.js`, `app.js`) in the same folder.
2. Double-click `index.html` to open it in your browser (Chrome, Firefox, or Edge).
3. That's it — no server needed. The app runs entirely client-side.

### Option B: Local HTTP server (if file:// has issues)

Some browsers restrict `file://` access. If the page loads but scripts don't run:

```bash
# Python 3
cd civ2-map-renderer
python -m http.server 8000
# Then open http://localhost:8000

# Node.js
npx serve .
# Then open the URL it prints

# VS Code
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

## Usage

1. **Load .SAV**: Click the button and select your Civ2 save file (`.sav`, `.net`, or `.scn`).
2. **TERRAIN1.GIF**: Load from your Civ2 install directory (usually `C:\MPS\CIV2\TERRAIN1.GIF`).
3. **TERRAIN2.GIF**: Same directory.
4. **Render Map**: Click to render. Takes a few seconds for a standard 40×50 map.
5. **Scroll** around the map in the viewport. **Hover** over tiles for info tooltips.

## What It Renders

The renderer implements the full compositing pipeline from the Civ2 engine:

| Layer | Source | Description |
|-------|--------|-------------|
| 1 | TERRAIN1 rows 0-10 | Base terrain tiles (desert, plains, ocean, etc.) |
| 1b | TERRAIN1 row 14 | Dither blending between adjacent terrain types |
| 2 | TERRAIN2 bottom | 4-quadrant coastline transitions (8 groups × 4 pieces) |
| 3 | TERRAIN2 rows 2-3, 10 | River overlays (16 directional masks) + river mouths |
| 4 | TERRAIN2 rows 4-9 | Forest, mountain, and hill overlays (16 variants each) |
| 8 | TERRAIN1 cols 2-3 | Seed-based resource/special icons |
| 9 | — | City markers (colored squares with names + size) |

Layers 5-7 (roads/railroads/improvements) are parsed but not yet rendered as sprites.

## Supported File Types

| Extension | Type | Map Header Offset |
|-----------|------|-------------------|
| `.SAV` | Standard save | 13702 (0x3586) |
| `.NET` | Network save | 13702 |
| `.SCN` | Scenario file | 13432 (0x3478) |

## Technical Notes

- All parsing happens client-side in JavaScript — nothing is uploaded anywhere.
- Sprite transparency uses color-matching rather than palette index (browsers don't expose GIF palette indices), with ±15 tolerance for:
  - **Cyan (0,255,255)** — TERRAIN1 chroma key
  - **Magenta (255,0,255)** — TERRAIN2 chroma key + text label removal
  - **Gray (~132,132,132)** — corner pixels outside diamond
  - **Bright green** — grid annotation lines
- The dither pass uses direct pixel manipulation (`getImageData`/`putImageData`) for performance.
- Neighbor lookup uses the correct isometric stagger rules: even rows shift NE/SE to same column, NW/SW to column-1; odd rows shift NE/SE to column+1, NW/SW to same column.
- Map wraps horizontally (cylindrical world), does not wrap vertically.

## Known Limitations

- **No road/railroad sprites** yet (the data is parsed; just needs sprite extraction from TERRAIN1 rows 11-12 with 8-directional neighbor masks).
- **No unit sprites** (units are parsed but not drawn; needs UNITS.GIF with civ-color substitution).
- **No city sprites** from CITIES.GIF (uses colored squares instead; proper city sprites need era detection + architectural style lookup).
- **No fog of war** rendering (all tiles shown regardless of player visibility).
- **Variant selection** for base terrain uses a simple alternation; the game's actual hash function is unknown.
- **Chroma keying by RGB matching** may occasionally miss edge pixels that the palette-index method would catch.

## Data Format Reference

Based on `Civ2_MGE_Binary_Analysis.md`. Key structures:

- **Map header** (14 bytes at fixed offset): 7 uint16 LE values
- **Block 2 terrain** (6 bytes/tile): byte[0] terrain+river, byte[1] improvements, byte[4] visibility
- **City records** (88 bytes each): +0 XY coords, +8 owner, +9 size, +32 name
- **Unit records** (32 bytes each): +0 XY, +6 type, +7 owner, +14 alive flag
