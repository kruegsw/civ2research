# City Dialog Rendering Analysis — From Decompiled civ2.exe

Extracted from decompiled city window module (0x500000-0x50FFFF) and GDI rendering
layer (0x5B0000-0x5DFFFF). All coordinates are at zoom level 2 (the default), which
means they ARE the actual pixel values. Multiply by `zoom_level / 2` for other zooms.

---

## A. Zoom / Scaling System

### Universal Coordinate Scaler: `FUN_00511690` at 0x511690

All pixel coordinates in the city dialog pass through this function:

```c
int FUN_00511690(int base_coord) {
    // cityobj+0x15d4 = zoom level (1, 2, or 3)
    if (zoom_level != 2) {
        return (zoom_level * base_coord) / 2;
    }
    return base_coord;  // at zoom 2, pass through unchanged
}
```

### Zoom Level Selection (`citywin_9028` at 0x509028)
- **Level 1** (small): screen < certain width/height thresholds
- **Level 2** (normal): default
- **Level 3** (large): screen >= ~950px wide AND >= ~950px tall, plus `DAT_006ab198 > 999`

### Sprite Zoom Values (in `citywin_CF06`)
- Zoom 1 → sprite_zoom = -5 (smallest)
- Zoom 2 → sprite_zoom = -2 (normal)
- Zoom 3 → sprite_zoom = 1 (largest)

This sprite_zoom is passed to `FUN_00472cf0` to get actual tile pixel dimensions.

---

## B. Window Dimensions

From initialization at `citywin_9429`:
```c
FUN_005cedad(local_4c8, 7, 0, 0, 0x27c, 0x1a5);
```
- **Content area: 636 x 421 pixels** (0x27C = 636, 0x1A5 = 421)
- Background: `CITY.GIF`
- Title bar adds 24px + 8px padding

### Window Centering (`citywin_998F`)
```
x = (screenW / 2) - ((636_scaled + 16) / 2)
y = (screenH / 2) - (totalH / 2)
```

---

## C. All 12 Panel Rectangles

Defined in `citywin_8D24` at 0x508D24, using `citywin_8C84` to compute scaled RECTs.

| Panel | Struct Offset | X | Y | W | H | Purpose |
|---|---|---|---|---|---|---|
| Citizens Row | +0x15dc | 0 | 0 | 436 | 61 | Top bar with citizen faces and titles |
| City Map Outer | +0x15ec | 0 | 61 | 436 | 153 | Terrain map + resource rows area |
| City Map Inner | +0x165c | 7 | 65 | 188 | 137 | Inner terrain map area |
| Food Storage | +0x15fc | 436 | 0 | 200 | 167 | Food/granary panel |
| Production | +0x160c | 436 | 167 | 200 | 189 | What's being built |
| Buy Panel | +0x161c | 436 | 356 | 200 | 65 | Buy/change buttons area |
| Units Supported | +0x162c | 0 | 212 | 192 | 78 | Supported units grid |
| Units Header | +0x167c | 7 | 216 | 181 | 69 | Units title area |
| Improvements | +0x163c | 0 | 290 | 192 | 131 | Building list (outer) |
| Improvements Inner | +0x166c | 6 | 306 | 166 | 108 | Building list (scrollable) |
| Info/Map/Happy | +0x164c | 192 | 212 | 244 | 209 | Mode-switching panel (outer) |
| Info/Map/Happy Inner | +0x168c | 197 | 216 | 233 | 198 | Mode-switching panel (inner) |

### ASCII Layout
```
+--[ Citizens Row (436x61) ]---+--[ Food Storage (200x167) ]--+
|  0,0                  436,61 | 436,0              636,167   |
+------------------------------+                              |
| City Map/Terrain (436x153)   |                              |
| 0,61                 436,214 +--[ Production (200x189) ]----+
+------------------------------+ 436,167             636,356  |
| Units (192x78)   | Info/Map  |                              |
| 0,212      192,290| /Happy   +--[ Buy Panel (200x65) ]------+
+------------------+| (244x209)| 436,356             636,421  |
| Improvements     || 192,212  +------------------------------+
| (192x131)        || to       |
| 0,290    192,421 || 436,421  |
+------------------+|----------|
```

---

## D. Citizens Row (`FUN_0050207f` at 0x50207F)

1. Text style: color index 0x7C (124), font size 18px, bold
2. Title string (resource 0x193 = 403): positioned at panel_left + 2, panel_top + 46
3. Subtitle (resource 0x3F = 63): at panel_left + 199, same Y, width 238
4. Citizen icons: starting at panel_left + 5, panel_top + 9
   - Total width for icons: 422px, icon height: 27px
   - Spacing computed by `FUN_00548b70` (icon spacing algorithm)
   - Each citizen classified as: happy, content, unhappy, or specialist
5. Click rectangles per citizen: width 30, height based on citizen count

---

## E. Resource Rows (`FUN_005025d5` at 0x5025D5, 9761 bytes)

This is the largest function in the city module. Draws terrain map + 3 resource rows.

### Terrain Map Drawing
- Tile width: 64px at normal zoom (via `FUN_00472cf0(0x40, zoom)`)
- Tile height: 32px half-height (via `FUN_00472cf0(0x20, zoom)`)
- Map origin: panel_left + 5, panel_top + 11
- 21 tiles drawn in diamond pattern using offset tables at DAT_00630D38 / DAT_00630D50
- Each tile: terrain base, then resource icons (food/shield/trade), then improvements

### Food Row (1st resource row)
- Position: panel_left + 205, panel_top + 14
- Available width: 226px
- Icon size: 14px + 1 = 15px effective
- Separator gap: 4px between surplus and deficit
- **Food surplus bar**: palette color 0x2D (45)
- **Food deficit bar**: palette color 0x30 (48)
- Label style: color 0x2A (42), font 10px
- Deficit label: color 0x0B (11), font 29px or color 0x2E (46), font 10px

### Shield Row (2nd resource row)
- Y offset: panel_top + 120
- Width: 226px
- **Shield production bar**: color 0x54 (84)
- **Shield support bar**: color 0x0B (11)
- **Shield surplus bar**: color 0x5C (92)
- Labels: production color 0x54, corruption 0x0B, surplus 0x5C or 0x0B

### Trade Row (3rd resource row — gold/luxury/science)
- Y offset: panel_top + 55
- **Gold icons**: color 0x76 (118)
- **Corruption icons**: color 0x79 (121)
- Sub-rows for distribution:
  - Tax (gold): color 0x76, font 10px
  - Science: color 0x29 (41), font 10px
  - Luxury: color 0x5E (94), font 10px
  - Happiness modifier: color 0x76

### Trade Rate Percentages (from civ struct)
- Tax rate = `civ[civ_id].tax_rate * 10` (percentage)
- Luxury rate = `civ[civ_id].luxury_rate * 10`
- Science rate = `(10 - tax - luxury) * 10`

---

## F. Food Storage (`FUN_00504c05` at 0x504C05)

- Text style: color 0x2C (44), font 10px
- Grid dimensions: 183px wide, 147px tall
- Grid starts at: panel_left + 6, panel_top + 15
- Grid inset: 3px padding all sides
- Cell spacing: 17px per citizen icon horizontal, 14px per row vertical
- Grid rows from `DAT_006a6560` (food storage rows based on granary size)
- Grid cols = city_size + 1
- Frame drawing: `FUN_005113f0` with colors 0x2C and 0x39 (57)
- **"We Love" indicator**: sprite 0x2A at center-bottom

---

## G. Production Box (`FUN_0050503e` at 0x50503E)

- Panel: (436, 167, 200, 189)
- Preview rect: 183px wide, 146px tall
- Production item sprite:
  - **Units**: drawn via `FUN_0056baff` at panel + (73, 1), zoom -1, param_3=0 (bare sprite).
    Zoom -1 scaling: `7 × base / 8` → 56×42 pixels (NOT native 64×48)
  - **Buildings/Wonders**: drawn via `FUN_005cef31` at panel + (80, 16), native 36×20
- Shield grid frame: colors 0x51 (81) highlight, 0x5D (93) shadow
- Shield icon spacing: 17px wide, 14px tall
- Shields per row: from `DAT_006a657c`
- Max 10 rows of shields

---

## H. Units Supported (`FUN_00505666` at 0x505666)

- Panel: (0, 212, 192, 78)
- Unit tile: width from `FUN_00472cf0(0x45, zoom)`, height from `FUN_00472cf0(0x34, zoom)`
- Units per row: 192px / tile_width
- Rows: 78px / tile_height
- Each unit drawn via `FUN_0056baff` with **param_3=4** (full decorations:
  shield, HP bar, order letter, fortify overlay, sentry dimming). See Section S.
- Food/shield upkeep icons drawn per-unit below sprite
- Title: color 0x7C, font 18px, string 0x1BF (447)

---

## I. Improvements List (`FUN_00505ffa` at 0x505FFA)

- Panel outer: (0, 290, 192, 131), inner: (6, 306, 166, 108)
- Title: string 0x1C0 (448), color 0x7C, font 18px
- List start: panel_left + 2, panel_top + 1
- Row height: 12px
- Visible rows: (panel_height - 0.5) / 12
- Each entry:
  - Icon at (x, y) via FUN_005cef31
  - Text at x + 24, y - 1, color 0x29, font 10px, no shadow
  - Gold upkeep icon: panel_right - 14 - 4
- Scrollbar via `FUN_005db0d0` and `FUN_0040fd40`

---

## J. Info/Map/Happy Panel (`citywin_8ADC` at 0x508ADC)

Three modes selected by `cityobj + 0x15b0`:

### Mode 0: Info View (`citywin_70E5`, 2692 bytes)
- Title: string 0x1C3 (451), color 0x7C, font 18px
- Unit grid: tile_w from FUN_00472cf0(0x40, zoom), tile_h from FUN_00472cf0(0x30, zoom)
- Cols = 244px / tile_w, centered with remaining space
- 4 rows max (2 normal + 2 offset half-tile)
- Each unit drawn via `FUN_0056baff` with **param_3=4** (full decorations). See Section S.
- Unit name labels (first 2 rows): color 10, font 26px
- Food stored display: at panel + (7, 100), grid width 64, icon size 30
- Trade route info: at panel + (0, 133), style color 0x79, font 18px

### Mode 1: Mini-Map View (`citywin_7B69`)
- Title: string 0x1C4 (452), color 0x7C, font 18px
- Tile size: computed to fit (panel_w - 4) / map_tiles_w
- City marker color: 0x29 (green)
- Unit marker color: 0x1D
- Terrain colors: 0x5D or 0x30 (based on ownership)

### Mode 2: Happy View (`citywin_8552`)
- Title: string 0x1C5 (453), color 0x7C, font 18px
- 5 horizontal rows: panel_height / 5 each
- Rows: food, shields, happy citizens, trade/corruption, final
- Before/after comparison with divider
- Divider lines: color 0x7C via FUN_005113b0

---

## K. Button Layout (`citywin_CF06` at 0x50CF06)

All positions relative to window content origin.

| Button | X | Y | W | H | Handler |
|---|---|---|---|---|---|
| Buy | 442 | 181 | 68 | 24 | `city_button_buy` |
| Change | 459 | 364 | 57 | 24 | `citywin_B9A4` |
| Info | 459+58 | 364 | 57 | 24 | `citywin_BA07` |
| Rename | 459+116 | 364 | 57 | 24 | `city_button_rename` |
| Happy | 459 | 364+25 | 57 | 24 | `citywin_BA6A` |
| Panorama | 459+58 | 364+25 | 57 | 24 | `city_button_view` |
| Exit | — | — | — | — | `citywin_BC4F` via FUN_0046ac89(2) |
| Prev City | 437 | 364 | 21 | 24 | `citywin_BF72` |
| Next City | 437 | 364+25 | 21 | 24 | `citywin_BD13` |
| Scrollbar | 192-scrollW | 290+1 | SM_CXVSCROLL | 131-2 | Improvements scroll |

---

## L. Font System (`create_font_8200` at 0x5C8200)

```c
LOGFONTA:
    lfHeight = -param_2          // negative = point size
    lfWidth = 0
    lfWeight = 400 (normal) or 700 (bold, if param_3 & 1)
    lfItalic = param_3 & 2
    lfUnderline = param_3 & 4
    lfStrikeOut = param_3 & 8
    lfCharSet = 0x01 (DEFAULT_CHARSET)
    lfOutPrecision = 0x04 (OUT_TT_PRECIS)
    lfClipPrecision = 0x01
    lfQuality = 0x00 (DEFAULT_QUALITY)
```

| Font ID | Face Name | PitchAndFamily |
|---|---|---|
| 0 | Times New Roman | 0x10 (FF_ROMAN) |
| 1 | Arial | 0x20 (FF_SWISS) |
| 2 | System | 0x00 |
| 3 | Courier | 0x30 (FF_MODERN) |

### Font Sizes in City Dialog
- At zoom < 2: font 12px, title 18px
- At zoom >= 2: font = scale(16), title = scale(24)
- Two fonts: main and small (2/3 of main size)

---

## M. Text/Color System (`FUN_005baee0` at 0x5BAEE0)

Sets current text rendering parameters:
```c
void FUN_005baee0(color_index, font_size, shadow_flag, bold_flag) {
    DAT_006366b0 = color_index;   // palette color index
    DAT_006366b4 = font_size;     // font size
    if (shadow_flag >= 0) DAT_006366b8 = shadow_flag;  // 1 = shadow text
    if (bold_flag >= 0) DAT_006366bc = bold_flag;       // 1 = bold
}
```

### All Palette Color Indices Used in City Dialog

| Index | Hex | Usage |
|---|---|---|
| 0x0B | 11 | Shield support / corruption label text |
| 0x1D | 29 | Unit position markers / warning text |
| 0x29 | 41 | Science icons / green text / city markers / improvement names |
| 0x2A | 42 | Food label / "We Love" indicator |
| 0x2C | 44 | Food storage frame |
| 0x2D | 45 | Food surplus bar fill |
| 0x2E | 46 | Food surplus label text |
| 0x30 | 48 | Food deficit bar fill / owned terrain |
| 0x39 | 57 | Food storage inner frame |
| 0x51 | 81 | Production shield frame highlight |
| 0x54 | 84 | Shield production bar / label |
| 0x5C | 92 | Shield surplus bar |
| 0x5D | 93 | Production shield inner frame / visible terrain |
| 0x5E | 94 | Luxury icons |
| 0x76 | 118 | Gold/tax icons / happiness modifier |
| 0x79 | 121 | Corruption/trade icons / trade route info |
| 0x7C | 124 | Title/header text / divider lines |

**Note**: These are palette indices, not RGB values. To get RGB, need to extract
the game's 8-bit palette via GetDIBColorTable or from a captured palette dump.
The DDraw proxy could capture this, or the GIF files' palettes can be used as
a reasonable approximation.

### Font Sizes Used
| Size | Usage |
|---|---|
| 18 (0x12) | Panel titles (citizens, units, improvements) |
| 26 (0x1A) | Unit name labels in info panel |
| 29 (0x1D) | Corruption/deficit text (larger warning) |
| 10 | Standard resource labels |

---

## N. Drawing Sequence (`citywin_8BC5` at 0x508BC5)

The master refresh draws panels in this exact order:

1. `FUN_0050207f` — **Citizens Row** (faces + titles)
2. `FUN_005025d5` — **Resource Rows** (terrain map + food/shields/trade)
3. `FUN_00504c05` — **Food Storage** (granary grid)
4. `FUN_0050503e` — **Production** (shield grid + item preview)
5. `FUN_005055dd` — **Buy Panel** (simple redraw)
6. `FUN_00505666` — **Units Supported** (unit sprites + upkeep)
7. `FUN_00505ffa` — **Improvements** (scrollable list)
8. `citywin_8ADC` — **Info/Map/Happy** (mode-dependent panel)

### Full Initialization Sequence (`citywin_9429`)
1. `FUN_004eb4ed` — calculate city production/resources
2. `citywin_9028` — determine zoom level, set fonts
3. `citywin_92AF` — set window title text
4. `FUN_005a9780` — prepare rendering surface
5. `FUN_00552112` — begin paint
6. `citywin_8EC6` — draw border/margins
7. `citywin_8D24` — compute all panel rectangles
8. `citywin_8BC5(0)` — draw all panels
9. `FUN_00408460` — end paint / flush

---

## O. Icon Spacing Algorithm (`FUN_00548b70` at 0x548B70)

```c
int FUN_00548b70(int count, int icon_size, int available_width,
                 int *out_fit_count, int *out_remainder) {
    if (icon_size < 2) icon_size = 1;
    if (count < 2) count = 1;
    int spacing = icon_size;
    if (count == 1) {
        *out_remainder = 0;
        *out_fit_count = 1;
    } else {
        available_width -= icon_size;  // space for last icon
        int gap = available_width / (count - 1);
        *out_remainder = available_width % (count - 1);
        *out_fit_count = count;
        if (gap < icon_size) {
            spacing = gap;
            if (gap < 1) {
                *out_fit_count = (available_width - icon_size) + 1;
                spacing = 1;
            }
        }
    }
    return spacing;
}
```

Used for all resource icon rows. When many icons, they overlap (spacing < icon_size).

---

## P. Sprite/Rectangle Drawing Primitives

### FUN_005cef31 — Primary sprite blit (normal)
```c
FUN_005cef31(result_rect, surface, x, y)
    → FUN_005d056c(result_rect, surface, 0xFFFFFFFF, x, y)
        → FUN_005e518e(...)  // pixel copy loop: *dst = src_pixel
```
The normal blit copies each non-transparent source pixel to the destination.

### FUN_005cf126 — Dimmed sprite blit (silhouette)
```c
FUN_005cf126(result_rect, surface, x, y, palette_index)
    → FUN_005d10cd(result_rect, surface, 0xFFFFFFFF, x, y, palette_index)
        → FUN_005e52bf(...)  // silhouette loop: *dst = fixed_color
```
The dimmed blit replaces ALL non-transparent pixels with a single fixed palette index.
This creates a solid-color silhouette — the sprite's shape is preserved but all color
detail is lost.

**Pixel-level difference** (from decompiled code):
```c
// Normal (FUN_005e518e, 305 bytes):
cVar1 = *(char *)(offset + source);    // read source pixel
if (cVar1 != transparent_color) {
    *dst = cVar1;                       // write source pixel
}

// Dimmed (FUN_005e52bf, 308 bytes):
if (*(char *)(offset + source) != transparent_color) {
    *dst = param_17;                    // write FIXED palette index
}
```

**Usage**: Sentry/sleeping units (orders == 0x03) are drawn with `palette_index = 0x1a` (26),
producing a dark gray silhouette. Sea-domain units in cities with harbors also get this
treatment. See Section S below for the full unit drawing function.

### FUN_00408780 — Filled rectangle with palette color
```c
FUN_00408780(x, y, width, height, palette_color_index)
    → creates RECT, fills with palette color via FUN_005c0333
```

### FUN_005113b0 — Horizontal/vertical line
```c
FUN_005113b0(x1, y1, x2, color_index)
```

### FUN_005113f0 — 3D frame (highlight + shadow)
```c
FUN_005113f0(rect, highlight_color, shadow_color)
```

---

## Q. Border/Margin Drawing (`citywin_8EC6` at 0x508EC6)

When the dialog is centered with extra space:
- Margins filled with palette color 10 (grey)
- Left/right: `FUN_00408780(offsetX, offsetY, paddingX, height, 10)`
- Top/bottom: `FUN_00408780(offsetX, offsetY, width, paddingY, 10)`

### Outer Border (4px 3D Bevel)

The entire city dialog window is surrounded by a 4-pixel 3D beveled border drawn
outside the 636x421 content area. The bevel layers from outermost to innermost:

| Layer | Offset | Color | RGB |
|---|---|---|---|
| 1 (outermost) | 0 | Black | rgb(0,0,0) |
| 2 | 1 | Highlight | rgb(223,223,223) |
| 3 | 2 | Light fill | rgb(192,192,192) |
| 4 (innermost) | 3 | Shadow | rgb(67,67,67) |

This expands the total canvas from **636x421** (content only) to **644x454**
(content + 4px border on each side + 25px title bar + 4px top border).
The browser implementation uses `ctx.translate(4, 29)` so that all existing
panel coordinates (which assume 0,0 = content origin) remain unchanged.

### Separator Line

A 1px horizontal line in rgb(67,67,67) is drawn immediately below the title bar,
separating it from the content area.

---

## R. City Name and Title Bar (`citywin_92AF` at 0x5092AF)

### Title Bar Dimensions
- **Height**: 24px (between the top inner border edge and the separator line)
- **Background**: stone texture tiled from `ICONS.GIF` at sprite origin **(199, 322)**, tile size **64x32**
- The stone tile is repeated horizontally across the full title bar width

### Window Control Icons (from ICONS.GIF)

All window icons are **16x16** pixels:

| Icon | Position in ICONS.GIF | Purpose |
|---|---|---|
| Close (X) | (1, 389) | Close the city dialog |
| Zoom Out (-) | (18, 389) | Decrease zoom level |
| Zoom In (+) | (35, 389) | Increase zoom level |

### City Navigation Arrows (from ICONS.GIF)

Navigation arrows are **18x24** pixels:

| Arrow | Position in ICONS.GIF | Purpose |
|---|---|---|
| Next City | (227, 389) | Navigate to next city |
| Prev City | (246, 389) | Navigate to previous city |

### Title Text

- **Format**: `"City of {name}, {year}, Population {pop} (Treasury: {gold} Gold)"`
- **Font**: Times New Roman, h=-24 (18px logical height)
- **Rendering**: 3-pass shadow text:
  1. Pass 1 (shadow): offset (+1, +1), dark color
  2. Pass 2 (shadow): offset (+1, +0) or (+0, +1), mid-dark color
  3. Pass 3 (foreground): offset (0, 0), fg color rgb(135, 135, 135)
- **Alignment**: Centered horizontally within the title bar

### Title Composition (from decompiled code)
1. Load city name format string (resource 0x1F)
2. Append city name from `&DAT_0064f360 + city_idx * 0x58`
3. If multiplayer: append player name + "of" + civ name
4. Append treasury in parentheses (format string 0x9A)
5. Render via `FUN_0055324c`

---

## S. Unit Drawing Function (`FUN_0056baff` at 0x56BAFF, 2803 bytes)

This is the universal unit sprite renderer used by both the map view and city dialog.
It draws the unit sprite with optional shield, HP bar, order letter, fortification
overlay, and sentry dimming.

### Parameters
```c
FUN_0056baff(surface, unit_ptr, zoom, x, y, param_3)
```
- `param_3` controls what decorations are drawn:
  - `0` = bare sprite only (no shield, no decorations) — used for production preview
  - `4` = full unit with shield, HP bar, order letter, fortify overlay — used for
    Units Supported (`FUN_00505666`) and Units Present (`citywin_70E5`)

### Order Letter Determination (lines 3874-3901)
```c
int order_val = unit->orders & 0xF;
if (order_val != 0 && order_val != 0xFF) {
    char letter = order_string_table[order_val];  // at 0x655494 + order*8
    // Draw letter on shield
}
```
Order string table loaded from RULES.TXT `@ORDERS` section (12 entries, stride 8).
Values: 1='F', 2='F', 3='S', 4='F', 5='R', 6='I', 7='m', 8='O', 9='p', 10='E', 11='G'.

### Sentry/Sleep Dimming (lines 3925-3941)
```c
bool dimmed = (unit->orders == 0x03);  // sleep/sentry

// Also dim sea units in cities with harbors
if (unit->domain == SEA && city_has_harbor) {
    dimmed = true;
}

if (dimmed) {
    FUN_005cf126(sprite, surface, x, y, 0x1a);  // silhouette blit, palette index 26
} else {
    FUN_005cef31(sprite, surface, x, y);          // normal blit
}
```

The dimmed blit (`FUN_005cf126`) replaces every non-transparent pixel with palette
index `0x1a` (26), creating a **dark gray silhouette**. The unit shape is preserved
but all color detail is lost. This is NOT a proportional darkening — it is a flat
solid-color fill. See Section P for the pixel-level implementation.

### Fortification Overlay (lines 3940-3941)
```c
if (unit->orders == 0x02) {  // fully fortified (not 0x01 = fortifying)
    // Draw fortification sprite overlay
}
```

### What param_3=4 Enables
When `param_3 & 4`:
- Shield background drawn (civ-colored)
- HP bar inside shield (3-color: green/yellow/red)
- Order letter on shield (from order string table)
- Veteran star (if unit is veteran)
- Fortification overlay (if orders == 0x02)
- Sentry dimming (if orders == 0x03)

### Production Preview (param_3=0)
When `param_3 = 0` (production box):
- Only the bare unit sprite is drawn
- Zoom is -1, producing 56x42 pixels (`7 * base / 8` scaling)
- No shield, no decorations
