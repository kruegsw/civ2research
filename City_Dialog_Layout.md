# City Dialog Layout — Pixel-Level Analysis

Source: `frame_0010_972x675.bmp` (San Francisco, captured from Civ2 MGE at 1080p)

## DIB Section Dimensions

The city dialog renders into a **972×675** 8bpp DIB section at 1920×1080 desktop resolution.
The CITY.GIF wallpaper is 636×421 (from the 640×480 game assets), tiled to fill.
Scale factor from asset coordinates to 1080p: **~1.528× horizontal, ~1.604× vertical**.

The browser renderer currently uses a 636×421 canvas, which matches the CITY.GIF asset size.
All coordinates below are given in **972×675 space** with scaled 636×421 equivalents.

## Outer Frame

```
Wallpaper border:  x=[0..11] left, x=[960..971] right
                   y=[0..33] top,  y=[667..674] bottom
Dark separator:    y=34..35 — rgb(67,67,67) horizontal line below title
Content area:      x=[12..959], y=[36..666]
```

## Title Bar

```
Text region:       y=[8..24], x=[50..843]
Font:              Times New Roman, h=-24, w400 (from GDI hooks)
3-pass shadow:     black at (+2,+1), gray at (+1,0), gray at (0,0)
Foreground color:  rgb(135,135,135) = #878787
```

## Three-Column Layout

| Column | BMP x range | Width | Scaled 636 x | Browser code x |
|--------|-------------|-------|-------------|----------------|
| Left   | 12–305      | 294   | 8–200       | ~3–200         |
| Center | 306–662     | 357   | 200–433     | 203–431        |
| Right  | 663–959     | 297   | 434–628     | 437–632        |

## Major Panels

### Food Storage (green background)
```
BMP:     x=[663..955], y=[36..279]  — 293×244
Scaled:  x=[434..625], y=[22..174]  — 192×152
Browser: x=437, y=0..163             (panel at 437,0 size 195×163)
Background: rgb(7,59,0) dark green fill
Border: green (75,155,35) top/left, dark green (0,51,0) bottom/right
```

**Food icon grid**: 15 rows visible (size-dependent), icons at x=[749..863] in BMP.
Icon spacing ~21px vertical in 972-space (~13px in 636-space, matches wheat spacing table).
Icon color: rgb(239,159,7) gold.

### Production Panel (blue gradient)
```
BMP:     x=[663..955], y=[283..569]  — 293×287
Scaled:  x=[434..625], y=[176..355]  — 192×179
Browser: x=437, y=165..356            (panel at 437,165 size 195×191)
Background: vertical gradient
  Top:    rgb(0,0,95) dark blue
  Bottom: rgb(103,127,215) light blue
```

### Resource Map (gold-bordered)
```
Gold border: x=[12..305], y=[127..344]  — 294×218
Content:     x=[18..299], y=[133..339]  — 282×207 (green terrain)
Scaled border: x=[8..200], y=[79..215]
Browser:       offX=5, offY=84
```

**Gold border colors** (3D beveled):
- Bright: rgb(223,187,63)
- Medium: rgb(191,151,47)
- Dark:   rgb(159,115,31)
- Shadow: rgb(43,27,0)

### Citizens Row
```
BMP:     x=[16..171], y=[58..89]  — faces span ~155×32
Scaled:  x=[10..112], y=[36..55]
Browser: x=5, y=9  (faces start too high by ~27px scaled)
```

### City Resources (center column)
```
Section header "City Resources": ~y=88 in BMP, ~y=55 scaled, browser cy=52 ✓
Food row text:    BMP ~y=105..122
Trade row:        BMP ~y=147..186
Tax/Lux/Sci:      BMP ~y=187..234
Support/Prod:     BMP ~y=307..352
```

### Worker/Garrison (bottom-left)
```
BMP:     x=[12..305], y=[345..465]  — 294×121
Scaled:  x=[8..200], y=[215..290]
Browser: "Units Supported" at x=3, y=212
```

### City Improvements (bottom-left below workers)
```
BMP:     x=[12..290], y=[466..657]  — 279×192
Scaled:  x=[8..190], y=[291..410]
Browser: label at cx=96, cy=296
```

### Units Present / Supplies+Demands (bottom-center)
```
BMP:     x=[306..662], y=[354..657]  — 357×304
"Units Present" header: ~y=370
Supplies text (red-orange): ~y=557, color rgb(227,83,15)
Demands text: ~y=577
```

## Key Color Palette

| Element | RGB | Hex | Notes |
|---------|-----|-----|-------|
| Title text fg | 135,135,135 | #878787 | GDI verified |
| Title shadow | 0,0,0 | #000000 | |
| Section headers | 63,187,199 | #3FBBC7 | Cyan, GDI verified |
| Header shadow | 67,67,67 | #434343 | GDI verified |
| Gold border bright | 223,187,63 | #DFBB3F | |
| Gold border medium | 191,151,47 | #BF972F | |
| Gold border dark | 159,115,31 | #9F731F | |
| Gold border shadow | 43,27,0 | #2B1B00 | |
| Food Storage bg | 7,59,0 | #073B00 | Dark green |
| Production bg top | 0,0,95 | #00005F | Dark blue |
| Production bg bottom | 103,127,215 | #677FD7 | Light blue |
| Food icon | 239,159,7 | #EF9F07 | Gold wheat |
| Supplies text | 227,83,15 | #E3530F | Red-orange |
| Wallpaper | ~183–223 | grayscale | Stone texture |

## Rendering Differences: Real vs Browser

### Missing in browser (high impact):
1. **Gold panel borders** — Resource map, improvements, workers panels all have 3D gold borders
2. **Food Storage green fill** — Real game fills entire area; browser only draws outline
3. **Production blue gradient** — Real game has dark→light blue gradient; browser has no fill
4. **Dark separator line** — Below title bar at y=34..35
5. **Black content fill** — Real game has black between wallpaper and panels

### Position offsets (moderate impact):
1. **Citizens faces** — Browser y=9 vs real ~y=36 (scaled), off by ~27px
2. **Food Storage label** — Browser y=7 vs real ~y=25 (scaled), off by 18px
3. **Resource Map label** — Browser y=195 vs real ~y=213 (scaled), off by 18px

### Already correct (from prior GDI work):
- Shadow direction (+1,+1) ✓
- Font weight 400 (non-bold) ✓
- Section header cyan color ✓
- Title text color #878787 ✓
