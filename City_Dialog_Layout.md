# City Dialog Layout — Pixel-Level Analysis

Source: `frame_0010_972x675.bmp` (San Francisco, captured from Civ2 MGE at 1080p)

## DIB Section Dimensions

The city dialog renders into a **972x675** 8bpp DIB section at 1920x1080 desktop resolution.
The CITY.GIF wallpaper is 636x421 (from the 640x480 game assets), tiled to fill.
Scale factor from asset coordinates to 1080p: **~1.528x horizontal, ~1.604x vertical**.

The browser renderer currently uses a 636x421 canvas, which matches the CITY.GIF asset size.
All coordinates below are given in **972x675 space** with scaled 636x421 equivalents.

## Outer Frame

```
3D beveled dialog border:
  Highlight:   y=0..1  — solid rgb(223,223,223) full width; x=0 is also (223,223,223)
  Shadow:      y=673..674 — solid rgb(67,67,67) full width; x=971 is (0,0,0) black edge
  Left wall:   x=0..11 — wallpaper tiles (gray stone)
  Right wall:  x=960..971 — wallpaper tiles (x=971 = black edge line)
  Top wall:    y=2..33 — wallpaper tiles with title text overlay
  Bottom wall: y=667..672 — wallpaper tiles

Dark separator:  y=34..35 — solid rgb(67,67,67) from x=12 to x=960
Content area:    x=[12..959], y=[36..666]
```

## Title Bar

```
BMP region:      y=[0..33], full width
Text region:     y=[8..24], x=[50..843]
Title text:      "City of San Francisco, A.D. 680, Population 100,000 (Treasury: 1104 Gold)"
Font:            Times New Roman, h=-24, w400 (from GDI hooks)
3-pass shadow:   black at (+2,+1), gray at (+1,0), gray at (0,0)
Foreground:      rgb(135,135,135) = #878787 (palette index 26)
Control icons:   3 small icons at x=0..50, y=0..30 (top-left corner, window controls)
```

## Three-Column Layout

| Column | BMP x range | Width | Scaled 636 x | Browser code x |
|--------|-------------|-------|-------------|----------------|
| Left   | 12-305      | 294   | 8-200       | ~3-200         |
| Center | 306-662     | 357   | 200-433     | 203-431        |
| Right  | 663-959     | 297   | 434-628     | 437-632        |

## Gold Vertical Panel Borders (dithered)

```
Left column left:    x=15..16, y=127..657 (with gaps for panel transitions)
Left-Center divider: x=302, y=358..657 (continuous); x=300..305 have sporadic gold in y=127..344
Center-Right:        No separate gold vertical line — panels butt against column edge
Right column:        No separate gold vertical line on right side
Bottom edge:         y=657 has gold (207,167,55) spanning x=15..650
```

The vertical borders use palette dithering between (207,167,55) and (191,151,47).

---

## LEFT COLUMN (x=12..305)

### Citizens Row
```
BMP:         y=[50..93], x=[16..164]
Face count:  4 citizen heads visible
Face 1:      x~19..51   (Pharaoh/Egyptian style headdress)
Face 2:      x~68..85
Face 3:      x~106..127
Face 4:      x~150..164
Face height: ~40px per face, skin tones (207,151,115) / (231,167,123) / (183,123,91)
Scaled:      y=[31..58], x=[10..107]
```

### Resource Map (gold-bordered)
```
Gold border: x=[12..305], y=[127..344]  — 294x218
Content:     x=[18..299], y=[133..339]  — 282x207

Border construction (top edge):
  y=127..128: Medium (191,151,47) + Dark (175,131,39) + Shadow (159,115,31)
  y=129:      Shadow inside, Medium+Dark outside (beveled)
  y=130..131: Medium outside, Dark+Shadow inside
  y=132:      Bright (223,187,63) + Face (207,167,55) — flat gold interior edge
  y=133+:     Content begins (dark green terrain)

Bottom border: same bevel reversed (shadow on bottom/right)
Left/right: vertical gold lines at x=12..17 and x=298..305

Interior terrain (282x207px):
  50.7% dark forest  — (11,67,7) (19,75,11) (7,59,0) (23,83,11)
  10.2% desert/plains — (207,151,115) (231,167,123) (183,123,91)
   9.5% olive/grass   — (111,119,55) (127,131,59) (139,143,63)
   3.1% black outline
   1.9% gray (roads, structures)
   0.2% ocean — (95,119,207) blue

Features visible:
  - Isometric diamond tile grid (city radius tiles)
  - Road network (dark lines connecting tiles)
  - Irrigation channels (regular patterns in green)
  - Special resources (bright colored spots)
  - Unit sprites on tiles
  - White pixels at x=33..264, y=163..225 — inset box with mine graphic (upper right area)
```

### Workers/Garrison (gold-bordered)
```
BMP:         x=[12..305], y=[345..464]  — 294x120
Scaled:      x=[8..200], y=[215..289]  — 192x75
Gold border: same 3D beveled gold as Resource Map
Content:     Unit sprites with shield markers visible
             6-7 unit sprites in 2 rows (settlers, warriors, etc.)
             Each unit ~40x40px with colored shield overlay
```

### City Improvements (gold-bordered, empty)
```
BMP:         x=[12..290], y=[466..657]  — 279x192
Scaled:      x=[8..190], y=[291..410]
"City Improvements" header: cyan text, centered
Content:     Empty in this capture (no improvements built)
Gold border: same style as other panels
```

---

## CENTER COLUMN (x=306..662)

### City Resources Header
```
BMP:         y=[105..126]
"City Resources" text: gray on wallpaper background
  Text at y=109..122 includes gold (#DFBB3F) at x=424..543 — likely gold text for label
Scaled:      y=[65..78]
```

### Food Row (green bar)
```
Green background bar: y=[148..171], x=[306..662]
  Color: rgb(71,147,31) = #47931F (palette 45) dominant
  Right edge darker: rgb(55,123,23) = #377B17 (palette 48)
Bar height: 24px (BMP), ~15px scaled

"Food: 8" label: left side
"Surplus: 3" label: right side

Food (wheat) icons inside bar:
  8 wheat icons visible on green background
  Icon colors: (255,223,79) #FFDF4F bright gold
               (239,159,7) #EF9F07 medium gold
               (151,87,31) #97571F dark brown (wheat stalk)
               (91,51,15) #5B330F shadow
  Icons centered in bar, spanning x=316..648
```

### Trade Row (orange bar)
```
Orange background bar: y=[187..209], x=[306..662]
  Background: dark wallpaper with colored content overlay

"Trade: 3" label: left side, gold text #EF9F07
"Corruption: 1" label: right side, red-orange text #E3530F

Trade icons at y=193..205:
  Gold (#EF9F07) trade arrows: x=316..380, ~3 icons
  Red-orange (#E3530F) corruption: x=549..648, ~4 pixel groups

Orange gradient bar: y=210..233 — full-width colored bar
  Tax/Luxury/Science distribution:
  Gold (#EF9F07) spans x=315..627 (tax+luxury+science coins)
  Red (#E3530F) spans x=628..653 (corruption portion)
  Some lighter gold (#F3B707) in tax section
```

### Tax/Luxury/Science Bar
```
BMP:         y=[210..233], x=[315..653]
Labels visible:
  "30% Tax: 1"   — left portion
  "0% Lux: 0"    — center
  "70% Sci: 2"   — right portion
Beaker icons visible at right end (blue-tinted)

Gold coin row:    x=315..627 (continuous gold #EF9F07 bar)
Corruption tail:  x=628..653 (red-orange #E3530F)
Colored segments visible within the bar showing tax/lux/sci split
```

### Support/Production Row (blue bar)
```
Blue background bar: y=[307..330], x=[306..662]
  Left:  rgb(63,79,167) = #3F4FA7 (palette 84)
  Right: rgb(7,11,103) = #070B67 (palette 92)

"Support: 3" label: left side
"Production: 3" label: right side

Shield icons in bar:
  y=307..330 — blue+gold diamond shield shapes
  Support shields (left): 3 shield icons at x~308..321
  Production shields (right): colored differently
  Beaker icons also visible in science section

Blue diamond shields: (255,223,79) bright gold + (239,203,71) medium gold
  Same palette as production panel shields but rendered on blue background
  Shield shapes visible at y=309..330 with diamond/pointed pattern
```

### Wallpaper/Text Zone
```
y=[234..306]: Wallpaper texture (gray stone) between resource rows and blue bar
y=[294..306]: Lighter wallpaper area
```

### Units Present Panel
```
BMP:         x=[306..662], y=[354..657]  — 357x304
Background:  rgb(159,159,159) = #9F9F9F — lighter gray than wallpaper
Gold border: y=358..359 top, same gold #DFBB3F

"Units Present" header: y~370, center column, cyan text
Unit sprites: 2 units visible with city name labels "San" below each
  Unit 1: ~x=310..350, y=380..430 (settler? horseback unit)
  Unit 2: ~x=370..410, y=380..430 (Fanatics with flag)
  Each has small shield icon overlay

Supplies text (red-orange #E3530F):
  "Supplies: Cloth, Coal, Salt" at y=557..569
  Text spans x=307..513

Demands text (red-orange #E3530F):
  "Demands: Dye, Wine, Spice" at y=577..589
  Text spans x=307..528

Small trailing pixels at y=570..573 (text descenders/shadow remnants)
```

---

## RIGHT COLUMN (x=663..959)

### Food Storage Panel
```
BMP:         x=[663..955], y=[36..279]  — 293x244
Scaled:      x=[434..625], y=[22..174]  — 192x152

Border:
  Top edge (y=36..39):    rgb(0,51,0) = #003300 dark green
  Left edge (x=663):      rgb(0,51,0) = #003300
  Interior fill:          rgb(7,59,0) = #073B00 (starts at x=665+, y=42+)
  Lighter green zone:     rgb(11,67,7) = #0B4307 (y=52+ inner area)
  Bottom border (y=270..279): bright green rgb(75,155,35) to (83,163,39)
  Bottom-right:           rgb(83,163,39) = #53A327

"Food Storage" header text:
  Color: rgb(75,155,35) = #4B9B23 (palette 44, bright green)
  Position: y=40..51, x=758..864
  Rendered WITH shadow (dark green offset)

Wheat icon grid:
  14 icon rows in this capture (city has food_in_box wheat)
  Row spacing: 10px (top-to-top)
  Each icon: 9px tall
  Gap between icons: 1px (rows at y=62,72,83,93,104,114,125,135,146,156,167,177,188,198)
  Icon x span: x=745..866 (center of panel)
  Icon width at widest: ~22px
  Icon colors:
    Bright gold:  (255,223,79) #FFDF4F — top highlight
    Medium gold:  (239,159,7)  #EF9F07 — main body
    Dark brown:   (151,87,31)  #97571F — stalk
    Shadow brown: (91,51,15)   #5B330F — shadow
    Dark accent:  (139,95,23)  #8B5F17
```

### Gap Between Panels
```
y=[280..282]: wallpaper visible between Food Storage and Production panels
  x=663: (107,107,107) gray wallpaper
```

### Production Panel
```
BMP:         x=[663..955], y=[283..569]  — 293x287
Scaled:      x=[434..625], y=[176..355]  — 192x179

Background: vertical blue gradient using palette indices 74-93
  Top (y=283):    rgb(0,0,95)     = #00005F  (palette 93)
  Mid (y=~425):   rgb(47,59,151)  = #2F3B97  (palette 86)
  Bottom (y=569): rgb(103,127,215) = #677FD7 (palette 78)
  Gradient uses 20 discrete palette steps for smooth transition

Settler unit sprite:
  Position: y=[294..336], x=[783..817]
  Size: 35w x 43h pixels
  Colors: skin tones, olive green, brown leather, dark outlines
  Rendered directly on blue gradient (no background box)
  Small colored shield overlays visible on unit

Shield box (production progress):
  Outlined rectangle visible around shield grid area
  Box top: ~y=349 (thin line)
  Box bottom: ~y=413 (fits 4 rows for settler = 40 shields)
  Box left: ~x=675
  Box right: ~x=926

  Shield grid:
    10 shields per row, spaced 25px center-to-center
    First shield at x=681, last at x=921 (span=240px)
    Each shield: 15px wide at widest point (diamond shape)
    Shield icon height: 21px per row (icon + gap)
    Shield colors:
      Bright: (255,223,79) #FFDF4F — top/highlight edges
      Medium: (239,203,71) #EFCB47 — lower/body edges
      Blue field: palette blues matching background
      Gold border of shield

    Row 1: y=351..371 — 10 shields (FULL)
    Row 2: y=372..392 — 10 shields (FULL)
    Row 3: y=393..413 — 1 shield  (PARTIAL — 21 of 40 shields filled)
    Row 4: y=414..434 — 0 shields (EMPTY — space reserved)

    Total filled: 21 shields of 40 needed for Settler
    Row capacity: 4 rows x 10 = 40 shields (matches settler cost)

  Below shield box: empty blue gradient continues to y=569
  No button visible in production panel below shields
```

### Below Production Panel
```
y=[570..666], x=[663..959]: Pure wallpaper texture (stone gray)
  All pixels are grayscale: (91..143) rgb values
  NO button, NO colored elements, NO text visible
  This area is wallpaper-only in this frame capture
```

---

## DIALOG BOTTOM EDGE

```
y=657: Gold border line — (207,167,55) spanning x=15..650 (bottom of left+center panels)
y=658..666: Wallpaper texture
y=667..668: Bright highlight line — solid (223,223,223) full width x=0..960
y=669..672: Wallpaper strip (gray stone)
y=673..674: Dark shadow line — solid (67,67,67) full width x=12..960; x=0 may be (223,223,223)
```

Note: x=971 is consistently (0,0,0) black — the outermost pixel column is a black border line.

---

## 8-bit Palette Reference (key ranges)

| Index | RGB | Hex | Use |
|-------|-----|-----|-----|
| 0 | 0,0,0 | #000000 | Black, outlines |
| 11-40 | grayscale ramp | #0B0B0B-#F7F7F7 | Wallpaper stone texture |
| 26 | 135,135,135 | #878787 | Title text foreground |
| 41 | 255,255,255 | #FFFFFF | White (rare, inset boxes) |
| 42-57 | green ramp | #57AB27-#003300 | Food storage bg, terrain |
| 44 | 75,155,35 | #4B9B23 | Food Storage header text |
| 56 | 7,59,0 | #073B00 | Food Storage interior fill |
| 57 | 0,51,0 | #003300 | Food Storage border |
| 58-73 | olive-brown ramp | #BBBB43-#535B33 | Terrain (plains, hills) |
| 74-93 | blue gradient | #7FA3F7-#00005F | Production panel gradient |
| 84 | 63,79,167 | #3F4FA7 | Support/Production bar |
| 93 | 0,0,95 | #00005F | Production panel top |
| 94-99 | cyan ramp | #3FBBC7-#23879B | Section header text |
| 94 | 63,187,199 | #3FBBC7 | Primary header cyan |

Additional verified colors from pixel analysis:

| Element | RGB | Hex | Source |
|---------|-----|-----|--------|
| Food bar bg | 71,147,31 | #47931F | Palette 45 |
| Wheat bright | 255,223,79 | #FFDF4F | Icon highlight |
| Wheat body | 239,159,7 | #EF9F07 | Icon main |
| Shield bright | 255,223,79 | #FFDF4F | Same as wheat |
| Shield body | 239,203,71 | #EFCB47 | Slightly different |
| Supplies/Demands | 227,83,15 | #E3530F | Red-orange text |
| Gold border face | 207,167,55 | #CFA737 | Dithered vertical borders |
| Units Present bg | 159,159,159 | #9F9F9F | Lighter than wallpaper |
| Skin tone light | 231,167,123 | #E7A77B | Citizen faces |
| Skin tone dark | 207,151,115 | #CF9773 | Citizen faces |

## Section Header Locations (cyan text)

| Header | BMP y range | BMP x range | Column |
|--------|-------------|-------------|--------|
| "City Resources" | ~y=105..126 | x=326..650 | Center |
| "Resource Map" | ~y=274..286 | x=567..650 | Left (below map) |
| "Food Storage" | ~y=40..51 | x=758..864 | Right (green text, not cyan) |
| "Units Supported" | ~y=380..392 | x=51..275 | Left |
| "Units Present" | ~y=400..420 | x=312..413 | Center |
| "City Improvements"| ~y=427..447 | x=28..108 | Left |

Note: The "Food Storage" header uses green (75,155,35) not cyan. All other section headers use the cyan palette (63,187,199).

The production panel shows a small cyan marker at y=308..321, x=784..796 — this is the shield icon on the Settler unit sprite, not a text header.

## Rendering Differences: Real vs Browser

### Missing in browser (high impact):
1. **Colored resource bars** — Food row has green (#47931F) bg bar; Trade row has dark bg with orange; Tax row has orange gradient bar; Support row has blue (#3F4FA7) bg bar
2. **Gold panel borders** — Resource map, improvements, workers panels all have 3D gold borders
3. **Food Storage green fill** — Real game fills entire area; browser only draws outline
4. **Production blue gradient** — 20-step smooth gradient; browser has approximate fill
5. **Dark separator line** — Below title bar at y=34..35
6. **Units Present lighter background** — (159,159,159) lighter gray than surrounding wallpaper
7. **Shield box outline** — Thin rectangle around shield progress grid
8. **Resource map isometric terrain** — Full rendered mini-map with improvements/units

### Position offsets (moderate impact):
1. **Citizens faces** — Browser y=9 vs real ~y=36 (scaled), off by ~27px
2. **Food Storage label** — Browser y=7 vs real ~y=25 (scaled), off by 18px
3. **Resource Map label** — Browser y=195 vs real ~y=213 (scaled), off by 18px

### Already correct (from prior GDI work):
- Shadow direction (+1,+1) ✓
- Font weight 400 (non-bold) ✓
- Section header cyan color ✓
- Title text color #878787 ✓
- Gold borders on resource map, improvements, workers panels ✓ (added in previous commit)
- Food storage green fill ✓ (added in previous commit)
- Production blue gradient ✓ (added in previous commit)
- Dark separator line ✓ (added in previous commit)

### Button note:
No "Buy" or "Change" button is visible in the bottom-right of this captured frame.
The area below the production panel (y=570..666, x=663..959) is pure wallpaper texture.
Buttons may only appear in certain game states or may be rendered in a different pass.
