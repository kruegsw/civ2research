// ═══════════════════════════════════════════════════════════════════
// citydialog.js — City Management Dialog (Canvas-based renderer)
// Reproduction of the Civ2 MGE city management screen.
// Read-only display of city data: buildings, production, citizens,
// trade routes, supported units, resource map
//
// Primary sources (authoritative — the goal is to match these):
//   CITY.GIF — wallpaper background (636×421 crop from 640×480)
//   ICONS.GIF — resource icons, improvement/wonder thumbnails, sell icon
//   PEOPLE.GIF — citizen face sprites by era
//   TERRAIN1.GIF — terrain tile sprites (used in resource map)
//   civ2.exe — panel rectangles, spacing tables, layout constants
//   Real Civ2 MGE screenshots — visual verification
//
// Decoding aids (used to understand the primary sources, not copied):
//   Civ2-clone (axx0) — github.com/axx0/Civ2-clone
//     Draw.CityPanel.cs: icon positions, spacing table values, colors
//     CityWindow.cs: button positions, section labels, unit panel layout
//     Images.ImportBitmaps.cs: sprite extraction coordinates
//   RULES.TXT — production cost values for units/improvements/wonders
// ═══════════════════════════════════════════════════════════════════

const Civ2CityDialog = {

  BUILDING_NAMES: {
    1: 'Palace', 2: 'Barracks', 3: 'Granary', 4: 'Temple', 5: 'Marketplace',
    6: 'Library', 7: 'Courthouse', 8: 'City Walls', 9: 'Aqueduct', 10: 'Bank',
    11: 'Cathedral', 12: 'University', 13: 'Mass Transit', 14: 'Colosseum',
    15: 'Factory', 16: 'Mfg. Plant', 17: 'SDI Defense', 18: 'Recycling Center',
    19: 'Power Plant', 20: 'Hydro Plant', 21: 'Nuclear Plant', 22: 'Stock Exchange',
    23: 'Sewer System', 24: 'Supermarket', 25: 'Superhighways', 26: 'Research Lab',
    27: 'SAM Battery', 28: 'Coastal Fortress', 29: 'Solar Plant', 30: 'Harbour',
    31: 'Offshore Platform'
  },

  BUILDINGSV_NAMES: {
    32: 'Airport', 33: 'Police Station', 34: 'Port Facility',
    35: 'SS Structural', 36: 'SS Component', 37: 'SS Module', 38: 'Capitalization'
  },

  WONDER_NAMES: [
    'Pyramids', 'Hanging Gardens', 'Colossus', 'Lighthouse', 'Great Library',
    'Oracle', 'Great Wall', "Sun Tzu's War Academy", "King Richard's Crusade",
    "Marco Polo's Embassy", "Michelangelo's Chapel", "Copernicus' Observatory",
    "Shakespeare's Theatre", "Magellan's Expedition", "Da Vinci's Workshop",
    "J.S. Bach's Cathedral", "Isaac Newton's College", "Adam Smith's Trading Co.",
    "Darwin's Voyage", 'Statue of Liberty', 'Eiffel Tower', 'Hoover Dam',
    "Women's Suffrage", 'Manhattan Project', 'United Nations', 'Apollo Program',
    'SETI Program', 'Cure for Cancer'
  ],

  GOVERNMENT_NAMES: ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy'],

  COMMODITY_NAMES: ['Hides','Wool','Beads','Cloth','Salt','Coal','Copper','Dye',
    'Wine','Silk','Silver','Spice','Gems','Gold','Oil','Uranium'],

  ORDER_NAMES: {
    0:'', 1:'Fortifying', 2:'Fortified', 3:'Sleep', 4:'Build Fortress',
    5:'Build Road', 6:'Build Irrigation', 7:'Build Mine', 8:'Transform',
    9:'Clean Pollution', 10:'Build Airbase', 11:'GoTo', 255:''
  },

  // ── Production cost tables (RULES.TXT cost × shield_box_factor) ──
  // shield_box_factor (COSMIC #4) defaults to 10; cost × factor = total shields needed
  UNIT_COSTS: [1,1,2,3,4,3,4,5,3,4,6,2,3,5,8,12,10,5,6,8,16,2,3,2,3,3,3,4,5,2,3,5,4,6,4,5,12,3,4,3,6,8,3,5,10,16,6,10,12,16,6,4,4,6,8,4,5,12,16,16,16,5,5].map(c => c * 10),
  IMPROVE_COSTS: [0,0,4,6,4,8,8,12,8,12,12,16,6,10,20,32,20,12,16,24,16,22,12,8,16,16,0,0,0,0,0,32,16,8,4,32,32,32,60].map(c => c * 10),
  WONDER_COSTS: [20,20,20,20,30,30,30,30,30,20,40,20,30,40,40,40,40,40,30,40,30,20,15,60,15,60,60,60].map(c => c * 10),

  // ── Game formulas from decompiled civ2.exe (reverse_engineering/Civ2_Game_Formulas.md) ──

  // Rush-buy cost: city_button_buy @ 0x509B48
  // Units: 2 gold per remaining shield. Buildings: quadratic. Wonders: 4 gold per shield.
  // Double if zero shields invested.
  calculateBuyCost(item, shieldsStored) {
    const totalNeeded = this._getProductionCost(item);
    if (totalNeeded <= 0) return 0;
    const remaining = Math.max(0, Math.min(999, totalNeeded - shieldsStored));
    if (remaining === 0) return 0;
    let cost;
    if (item.type === 'unit') {
      cost = remaining * 2;
    } else if (item.id >= 39 && item.id <= 66) {
      // Wonder: 4x
      cost = remaining * 4;
    } else {
      // Building: quadratic formula (remaining^2 / 20 + remaining * 2)
      cost = Math.floor(remaining * remaining / 20) + remaining * 2;
    }
    if (shieldsStored === 0) cost *= 2;
    return cost;
  },

  // Food box to grow: FUN_004e7eb1 @ 0x4E7EB1
  // food_needed = (city_size + 1) × food_box_factor (COSMIC #3, default 10)
  getFoodToGrow(citySize, foodBoxFactor) {
    return (citySize + 1) * (foodBoxFactor || 10);
  },

  // Icon spacing algorithm: FUN_00548b70 @ 0x548B70 (exact decompiled logic)
  // Computes optimal pixel spacing for a row of overlapping resource icons.
  _iconSpacing(count, iconSize, availableWidth) {
    if (iconSize < 2) iconSize = 1;
    if (count < 2) return { spacing: iconSize, fitCount: Math.min(count, 1), remainder: 0 };
    const usable = availableWidth - iconSize;  // space for last icon
    const gap = Math.floor(usable / (count - 1));
    const remainder = usable % (count - 1);
    if (gap >= iconSize) return { spacing: iconSize, fitCount: count, remainder: 0 };
    if (gap < 1) return { spacing: 1, fitCount: usable - iconSize + 1, remainder: 0 };
    return { spacing: gap, fitCount: count, remainder };
  },

  // ── Outer frame (border + title bar) wrapping the 636×421 content area ──
  FRAME: {
    borderW: 10, titleBarH: 24, separatorH: 1,
    contentW: 636, contentH: 421,
    get totalW() { return this.contentW + this.borderW * 2; },       // 644
    get totalH() { return this.contentH + this.borderW * 2 + this.titleBarH + this.separatorH; }, // 454
    get contentX() { return this.borderW; },                          // 4
    get contentY() { return this.borderW + this.titleBarH + this.separatorH; }, // 29
  },

  // ── Layout regions — all coordinates absolute on the 636×421 wallpaper ──
  // Sources: GetCityWindowDefinition() in Civ2-clone Civ2Interface.cs (panel boxes),
  //   EtoFormsUI CityWindow.cs Surface_Paint (draw origins, label centers),
  //   Draw.CityPanel.cs (resource row bounds, icon positions). BMP-verified where noted.
  REGIONS: {
    canvas: { x: 0, y: 0, w: 636, h: 421 },

    // ── Panel bounding boxes (GetCityWindowDefinition) ──
    panels: {
      citizens:     { x: 3,   y: 2,   w: 433, h: 44  },
      tileMap:      { x: 7,   y: 65,  w: 188, h: 137 },
      foodStorage:  { x: 437, y: 0,   w: 195, h: 163 },
      production:   { x: 437, y: 165, w: 195, h: 191 },
      infoPanel:    { x: 193, y: 215, w: 242, h: 198 },
      unitSupport:  { x: 7,   y: 215, w: 184, h: 69  },
      improvements: { x: 5,   y: 306, w: 170, h: 108 },
      unitsPresent: { x: 193, y: 215, w: 232, h: 84  },  // resolved from InfoPanel + (0,0)
    },

    // ── Citizens row (face draw origin within citizensPanel) ──
    citizens: { x: 5, y: 9 },

    // ── Resource map tile grid ──
    resourceMap: { x: 5, y: 84, gridW: 24, gridH: 12, sprW: 48, sprH: 24 },

    // ── Resource icon rows ──
    resources: {
      title:       { x: 199, y: 46,  w: 238, h: 15 },
      food:        { x: 203, y: 75,  w: 230, h: 13, textX: 203, textY: 68, iconX: 206, iconY: 76, rightX: 431 },
      trade:       { x: 206, y: 116, w: 224, h: 16, textX: 203, textY: 109, iconX: 206, iconY: 117, rightX: 431 },
      taxLuxSci:   { x: 206, y: 140, w: 224, h: 16, textX: 204, textY: 163, iconX: 206, iconY: 141, rightX: 431, luxIconX: 290, centerX: 317 },
      supportProd: { x: 199, y: 181, w: 238, h: 16, textX: 204, textY: 203, iconX: 206, iconY: 181, rightX: 431 },
    },

    // ── Food storage ──
    foodStorage: {
      x: 437, y: 0, w: 195, h: 163,
      borderY: 15, lineH: 144, bottomY: 160,
      wheatY: 18, granaryY: 87,
    },

    // ── Production panel (all sub-elements absolute) ──
    production: {
      x: 437, y: 165, w: 195, h: 191,
      unitSprite:   { x: 509, y: 168, w: 64, h: 48 },    // panel(437,165) + (72, 3)
      buildingIcon: { x: 516, y: 183, w: 36, h: 20 },    // panel + (79, 18)
      buildingName: { x: 534, y: 180 },                    // panel + (97, 15), center-aligned
      iconCenter:   { x: 534.5, y: 183 },                  // panel + (97.5, 18)
      shieldGrid: {
        x: 443, y: 210,                                    // panel + (6, 45), icon draw origin
        borderX: 442, borderY: 207, borderRight: 624,      // border rectangle edges
        cols: 10,
      },
    },

    // ── Units supported (draw origin) ──
    unitsSupported: { x: 3, y: 212, w: 189 },

    // ── Info panel / units present (draw origin + trade text positions) ──
    infoPanel: {
      x: 193, y: 212, w: 242,
      tradeX: 203,                                          // x for Supplies/Demands/routes text
      suppliesY: 358, demandsY: 371, tradeRoutesY: 384,    // absolute Y for trade text rows
    },

    // ── Improvements list ──
    improvements: {
      x: 5, y: 306, w: 170, h: 108,
      thumbX: 8, thumbY: 307, thumbW: 20, thumbH: 11,
      nameX: 30, nameY: 305,
      sellX: 156, sellY: 306, sellSize: 12,
      rowH: 12, maxRows: 9,
    },

    // ── Buttons ──
    buttons: {
      buy:      { x: 442, y: 181, w: 68, h: 24 },        // production panel + (5, 16)
      change:   { x: 557, y: 181, w: 68, h: 24 },        // production panel + (120, 16)
      info:     { x: 459, y: 364, w: 57, h: 24 },
      map:      { x: 517, y: 364, w: 57, h: 24 },
      rename:   { x: 575, y: 364, w: 57, h: 24 },
      happy:    { x: 459, y: 389, w: 57, h: 24 },
      panorama: { x: 517, y: 389, w: 57, h: 24 },
      exit:     { x: 575, y: 389, w: 57, h: 24 },
      prevCity: { x: 440, y: 389, w: 21, h: 24 },         // not yet implemented
      nextCity: { x: 440, y: 364, w: 21, h: 24 },         // not yet implemented
    },

    // ── Labels (x,y = absolute draw center for _label(); rect = layout box) ──
    labels: {
      citizens:        { x: 101, y: 53,  rect: { x: 3,   y: 48,  w: 189, h: 12 } },
      cityResources:   { x: 317, y: 52,  rect: { x: 199, y: 46,  w: 238, h: 15 } },
      foodStorage:     { x: 535, y: 7,   rect: { x: 437, y: 0,   w: 195, h: 12 } },
      improvements:    { x: 96,  y: 296, rect: { x: 3,   y: 291, w: 189, h: 12 } },
      resourceMap:     { x: 101, y: 195, rect: { x: 7,   y: 190, w: 189, h: 12 } },
      unitsSupported:  { x: 97,  y: 227, rect: { x: 3,   y: 215, w: 189, h: 12 } },
      unitsPresent:    { x: 314, y: 227, rect: { x: 193, y: 215, w: 232, h: 12 } },
      itemInProduction:{ x: 534, y: 169, rect: { x: 437, y: 169, w: 195, h: 12 } },
      supplies:        { x: 203, y: 351, rect: { x: 193, y: 345, w: 232, h: 12 } },
      demands:         { x: 203, y: 364, rect: { x: 193, y: 358, w: 232, h: 12 } },
    },

    // ── Support map mode (inside InfoPanel) ──
    supportMap: { x: 107, y: 118, squareW: 2, squareH: 1 },

    // ── Gold borders (3D beveled frames drawn on top of wallpaper) ──
    goldBorders: [
      { x: 3, y: 288, w: 192, h: 130 },   // City Improvements
      { x: 3, y: 212, w: 192, h: 74 },    // Workers/Garrison
    ],
  },

  // ── Exact Civ2 colors (from Civ2-clone Draw.CityPanel.cs + BMP pixel analysis) ──
  COL: {
    title:    'rgb(135,135,135)',
    header:   'rgb(223,187,63)',
    food:     'rgb(87,171,39)',
    foodDark: 'rgb(0,51,0)',
    prod:     'rgb(83,103,191)',
    prodDark: 'rgb(0,0,95)',
    prodLight:'rgb(103,127,215)',     // production panel gradient bottom (BMP verified)
    trade:    'rgb(239,159,7)',
    science:  'rgb(63,187,199)',
    luxury:   'rgb(255,255,255)',
    wonder:   'rgb(223,187,63)',
    gray:     'rgb(192,192,192)',
    dimGray:  'rgb(128,128,128)',
    // GDI-verified colors from DrawTextA hooking (9,338 calls captured)
    headerCyan:       'rgb(63,187,199)',   // 0x3FBBDF — real section header foreground
    headerShadow:     'rgb(67,67,67)',     // 0x434343 — section header shadow
    resourceMapShadow:'rgb(0,51,0)',       // 0x003300 — "Resource Map" shadow
    // Gold panel border colors (BMP pixel analysis: 3D beveled)
    goldBright:  'rgb(223,187,63)',   // top/left highlight
    goldMedium:  'rgb(191,151,47)',   // face
    goldDark:    'rgb(159,115,31)',   // bottom/right shadow
    goldShadow:  'rgb(43,27,0)',      // deepest shadow
    // Panel backgrounds (BMP pixel analysis)
    foodStorageBg: 'rgb(7,59,0)',     // dark green fill
    separator:     'rgb(67,67,67)',   // dark line below title bar
    // Outer 3D beveled border colors
    borderBlack:     'rgb(0,0,0)',
    borderHighlight: 'rgb(223,223,223)',
    borderLight:     'rgb(192,192,192)',
    borderShadow:    'rgb(67,67,67)',
    // Title bar text
    titleFg:      'rgb(135,135,135)',
    titleShadow1: 'rgb(0,0,0)',
    titleShadow2: 'rgb(67,67,67)',
  },

  // ── Data lookup helpers ──

  getProductionName(item) {
    if (!item) return '?';
    if (item.type === 'unit') return Civ2Renderer.UNIT_NAMES[item.id] || `Unit #${item.id}`;
    if (item.id >= 1 && item.id <= 31) return this.BUILDING_NAMES[item.id] || `Improvement #${item.id}`;
    if (item.id >= 32 && item.id <= 38) return this.BUILDINGSV_NAMES[item.id] || `Improvement #${item.id}`;
    if (item.id >= 39 && item.id <= 66) return this.WONDER_NAMES[item.id - 39] || `Wonder #${item.id}`;
    return `Item #${item.id}`;
  },

  getCityImprovements(city, cityIndex, mapData) {
    const result = [];
    for (let bit = 1; bit <= 31; bit++) {
      if (city.buildings & (1 << bit))
        result.push({ id: bit, name: this.BUILDING_NAMES[bit] || `#${bit}`, isWonder: false });
    }
    for (let bit = 0; bit <= 6; bit++) {
      if (city.buildingsV & (1 << bit)) {
        const type = bit + 32;
        if (type === 38) continue;  // Capitalization is a production option, not a building
        result.push({ id: type, name: this.BUILDINGSV_NAMES[type] || `#${type}`, isWonder: false });
      }
    }
    const wonderCityIds = mapData.gameState && mapData.gameState.wonderCityIds;
    if (wonderCityIds) {
      for (let w = 0; w < 28; w++) {
        if (wonderCityIds[w] === cityIndex)
          result.push({ id: w + 39, name: this.WONDER_NAMES[w] || `Wonder #${w}`, isWonder: true });
      }
    }
    return result;
  },

  getSpecialists(city) {
    const specs = { entertainer: 0, taxman: 0, scientist: 0 };
    if (!city.specialistBytes) return specs;
    for (let b = 0; b < 4; b++) {
      const byte = city.specialistBytes[b];
      for (let s = 0; s < 4; s++) {
        const val = (byte >> (s * 2)) & 0x03;
        if (val === 1) specs.entertainer++;
        else if (val === 2) specs.taxman++;
        else if (val === 3) specs.scientist++;
      }
    }
    return specs;
  },

  findCityBySequenceId(mapData, seqId) {
    if (seqId === 0xFFFF) return null;
    for (const c of mapData.cities) {
      if (c.sequenceId === seqId) return c;
    }
    return null;
  },

  getGarrisonedUnits(city, mapData) {
    return mapData.units.filter(u => u.gx === city.gx && u.gy === city.gy);
  },

  getSupportedUnits(cityIndex, mapData) {
    return mapData.units.filter(u => u.homeCityId === cityIndex);
  },

  _getProductionCost(item) {
    if (!item) return 0;
    if (item.type === 'unit') return this.UNIT_COSTS[item.id] || 0;
    if (item.id >= 39 && item.id <= 66) return this.WONDER_COSTS[item.id - 39] || 0;
    if (item.id >= 1 && item.id <= 38) return this.IMPROVE_COSTS[item.id] || 0;
    return 0;
  },

  // ── Terrain colors for mini-map ──
  TERRAIN_COLORS: [
    '#dcb468', '#c8b432', '#00b400', '#006400', '#968c00',
    '#646464', '#b4b4b4', '#e0e0ff', '#647832', '#008c00', '#0046b4'
  ],

  // ── Extract city dialog sprites from ICONS.GIF, PEOPLE.GIF, and optionally CITY.GIF ──
  extractSprites(iconsCtx, peopleCtx, cityGifCtx) {
    const CK = [[255, 0, 255, 15], [255, 159, 163, 15]];
    const cdSprites = {};

    // Resource icons 14x14
    const resIcons = {
      hunger:  {x:1, y:290}, shortage: {x:16, y:290}, corruption: {x:31, y:290},
      food:    {x:1, y:305}, shields:  {x:16, y:305}, trade:      {x:31, y:305},
      luxury:  {x:1, y:320}, tax:     {x:16, y:320}, science:    {x:31, y:320}
    };
    for (const [name, pos] of Object.entries(resIcons)) {
      cdSprites[name] = Civ2Renderer.extractSprite(iconsCtx, pos.x, pos.y, 14, 14, CK, false);
    }

    // Small resource icons 10x10
    cdSprites.foodSmall = Civ2Renderer.extractSprite(iconsCtx, 49, 334, 10, 10, CK, false);
    cdSprites.shieldSmall = Civ2Renderer.extractSprite(iconsCtx, 60, 334, 10, 10, CK, false);
    cdSprites.tradeSmall = Civ2Renderer.extractSprite(iconsCtx, 71, 334, 10, 10, CK, false);

    // Sell icon 14x14 from ICONS.GIF at (16, 320) — used in improvements list
    cdSprites.sellIcon = Civ2Renderer.extractSprite(iconsCtx, 16, 320, 14, 14, CK, false);

    // Title bar stone texture tile 64x32 from ICONS.GIF
    cdSprites.titleBarTile = Civ2Renderer.extractSprite(iconsCtx, 199, 322, 64, 32, [], false);

    // Window control icons 16x16 from ICONS.GIF
    cdSprites.iconClose   = Civ2Renderer.extractSprite(iconsCtx, 1,  389, 16, 16, CK, false);
    cdSprites.iconZoomOut = Civ2Renderer.extractSprite(iconsCtx, 18, 389, 16, 16, CK, false);
    cdSprites.iconZoomIn  = Civ2Renderer.extractSprite(iconsCtx, 35, 389, 16, 16, CK, false);

    // City nav arrows 18x24 from ICONS.GIF
    cdSprites.arrowNext = Civ2Renderer.extractSprite(iconsCtx, 227, 389, 18, 24, CK, false);
    cdSprites.arrowPrev = Civ2Renderer.extractSprite(iconsCtx, 246, 389, 18, 24, CK, false);

    // Improvement thumbnails 36x20, 5 rows x 8 cols, origin (343,1), stride 37x21
    cdSprites.improvements = {};
    for (let idx = 1; idx <= 38; idx++) {
      const col = (idx - 1) % 8;
      const row = Math.floor((idx - 1) / 8);
      cdSprites.improvements[idx] = Civ2Renderer.extractSprite(
        iconsCtx, 343 + 37 * col, 1 + 21 * row, 36, 20, CK, false
      );
    }

    // Wonder thumbnails 36x20, 4 rows x 7 cols, origin (343,106), stride 37x21
    cdSprites.wonders = {};
    for (let idx = 0; idx < 28; idx++) {
      const col = idx % 7;
      const row = Math.floor(idx / 7);
      cdSprites.wonders[idx] = Civ2Renderer.extractSprite(
        iconsCtx, 343 + 37 * col, 106 + 21 * row, 36, 20, CK, false
      );
    }

    // Citizen faces 27x30, 11 cols x 5 rows, origin (2,6), stride 28x31
    const PKC = [[255, 0, 255, 15]];
    cdSprites.citizens = [];
    for (let row = 0; row < 5; row++) {
      cdSprites.citizens[row] = [];
      for (let col = 0; col < 11; col++) {
        cdSprites.citizens[row][col] = Civ2Renderer.extractSprite(
          peopleCtx, 2 + 28 * col, 6 + 31 * row, 27, 30, PKC, false
        );
      }
    }

    // Wallpaper from CITY.GIF (636x421 crop from 640x480)
    if (cityGifCtx) {
      const R = this.REGIONS.canvas;
      const wpCanvas = document.createElement('canvas');
      wpCanvas.width = R.w;
      wpCanvas.height = R.h;
      const wpCtx = wpCanvas.getContext('2d');
      wpCtx.drawImage(cityGifCtx.canvas, 0, 0, R.w, R.h, 0, 0, R.w, R.h);
      cdSprites.wallpaper = wpCanvas;
    }

    return cdSprites;
  },

  // ── Drawing primitives ──

  // Text with 1px drop shadow (GDI pipeline: DrawTextA at +1,+1 offset)
  _text(ctx, text, x, y, color, font, shadowColor) {
    if (font) ctx.font = font;
    ctx.fillStyle = shadowColor || '#000';
    ctx.fillText(text, x + 1, y + 1);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  },

  // Filled diamond (isometric tile) for the mini-map
  _diamond(ctx, cx, cy, hw, hh, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - hh);
    ctx.lineTo(cx + hw, cy);
    ctx.lineTo(cx, cy + hh);
    ctx.lineTo(cx - hw, cy);
    ctx.closePath();
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  },

  // 3D gold panel border (BMP-verified)
  _goldBorder(ctx, x, y, w, h) {
    const C = this.COL;
    // Outer bright edge (top + left)
    ctx.strokeStyle = C.goldBright;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    // Inner medium face
    ctx.strokeStyle = C.goldMedium;
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    // Dark shadow (bottom + right) — overdraw bottom/right edges
    ctx.strokeStyle = C.goldDark;
    ctx.beginPath();
    ctx.moveTo(x + w - 0.5, y + 0.5);
    ctx.lineTo(x + w - 0.5, y + h - 0.5);
    ctx.lineTo(x + 0.5, y + h - 0.5);
    ctx.stroke();
    ctx.strokeStyle = C.goldShadow;
    ctx.beginPath();
    ctx.moveTo(x + w - 1.5, y + 1.5);
    ctx.lineTo(x + w - 1.5, y + h - 1.5);
    ctx.lineTo(x + 1.5, y + h - 1.5);
    ctx.stroke();
  },

  // Centered section label with shadow
  _label(ctx, text, cx, cy, color, shadow) {
    const C = this.COL;
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = shadow || C.headerShadow;
    ctx.fillText(text, cx + 1, cy + 1);
    ctx.fillStyle = color || C.header;
    ctx.fillText(text, cx, cy);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  },

  // ── Worked tile set from worker bitmaps ──
  _getWorkedTiles(city) {
    const worked = new Set();
    worked.add(0);
    for (let b = 0; b < 8; b++) {
      if (city.workersInner & (1 << b)) worked.add(1 + b);
    }
    for (let b = 0; b < 8; b++) {
      if (city.workersOuterA & (1 << b)) worked.add(9 + b);
    }
    for (let b = 0; b < 4; b++) {
      if (city.workersOuterB & (1 << b)) worked.add(17 + b);
    }
    return worked;
  },

  // ── Spacing tables ──

  // Citizen face spacing (28-value table from Civ2-clone)
  _citizenSpacing(size) {
    if (size <= 15) return 28;
    if (size === 16) return 26;
    if (size === 17) return 24;
    if (size === 18) return 23;
    if (size === 19) return 21;
    if (size === 20) return 20;
    if (size === 21) return 19;
    if (size === 22) return 18;
    if (size <= 24) return 17;
    if (size === 25) return 16;
    if (size <= 27) return 15;
    if (size <= 29) return 14;
    if (size <= 31) return 13;
    if (size <= 33) return 12;
    if (size <= 36) return 11;
    if (size <= 41) return 10;
    if (size <= 43) return 14;
    if (size <= 50) return 8;
    if (size <= 57) return 7;
    if (size <= 66) return 6;
    if (size <= 79) return 5;
    if (size <= 99) return 4;
    return 3;
  },

  // Food storage wheat spacing (15-value table)
  _wheatSpacing(size) {
    if (size <= 9) return 17;
    if (size === 10) return 16;
    if (size === 11) return 13;
    if (size === 12) return 12;
    if (size === 13) return 11;
    if (size === 14) return 10;
    if (size <= 16) return 9;
    if (size === 17) return 8;
    if (size <= 20) return 7;
    if (size <= 22) return 6;
    if (size <= 26) return 5;
    if (size <= 33) return 4;
    if (size <= 40) return 3;
    if (size <= 80) return 2;
    return 1;
  },

  // Resource icon spacing (12-value table)
  _resourceSpacing(count) {
    if (count <= 15) return 15;
    if (count <= 17) return 13;
    if (count <= 19) return 11;
    if (count <= 21) return 10;
    if (count <= 23) return 9;
    if (count <= 25) return 8;
    if (count <= 29) return 7;
    if (count <= 33) return 6;
    if (count <= 37) return 5;
    if (count <= 49) return 4;
    if (count <= 65) return 3;
    return 2;
  },

  // ═══════════════════════════════════════════════════════════════════
  // DRAW METHODS — each renders one panel region
  // ═══════════════════════════════════════════════════════════════════

  // Outer border: stone-textured fill + 3D bevel lines (absolute canvas coordinates)
  _drawOuterBorder(ctx, cdSprites) {
    const F = this.FRAME;
    const C = this.COL;
    const w = F.totalW, h = F.totalH;
    const bw = F.borderW;

    // Fill entire border area with stone texture
    if (cdSprites && cdSprites.titleBarTile) {
      const tile = cdSprites.titleBarTile;
      const tw = tile.width, th = tile.height;
      // Top border
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, bw);
      // Bottom border
      ctx.rect(0, h - bw, w, bw);
      // Left border
      ctx.rect(0, bw, bw, h - bw * 2);
      // Right border
      ctx.rect(w - bw, bw, bw, h - bw * 2);
      ctx.clip();
      for (let ty = 0; ty < h; ty += th) {
        for (let tx = 0; tx < w; tx += tw) {
          ctx.drawImage(tile, tx, ty);
        }
      }
      ctx.restore();
    } else {
      ctx.fillStyle = C.borderLight;
      ctx.fillRect(0, 0, w, bw);
      ctx.fillRect(0, h - bw, w, bw);
      ctx.fillRect(0, bw, bw, h - bw * 2);
      ctx.fillRect(w - bw, bw, bw, h - bw * 2);
    }

    // 3D bevel lines on top of stone
    // Layer 0: 1px black outermost edge
    ctx.strokeStyle = C.borderBlack;
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
    // Layer 1: highlight top/left, shadow bottom/right
    ctx.strokeStyle = C.borderHighlight;
    ctx.beginPath();
    ctx.moveTo(1.5, h - 1.5); ctx.lineTo(1.5, 1.5); ctx.lineTo(w - 1.5, 1.5);
    ctx.stroke();
    ctx.strokeStyle = C.borderShadow;
    ctx.beginPath();
    ctx.moveTo(w - 1.5, 1.5); ctx.lineTo(w - 1.5, h - 1.5); ctx.lineTo(1.5, h - 1.5);
    ctx.stroke();
    // Inner bevel (at content edge)
    const ix = bw - 1;
    ctx.strokeStyle = C.borderShadow;
    ctx.beginPath();
    ctx.moveTo(ix + 0.5, h - ix - 0.5); ctx.lineTo(ix + 0.5, ix + 0.5); ctx.lineTo(w - ix - 0.5, ix + 0.5);
    ctx.stroke();
    ctx.strokeStyle = C.borderHighlight;
    ctx.beginPath();
    ctx.moveTo(w - ix - 0.5, ix + 0.5); ctx.lineTo(w - ix - 0.5, h - ix - 0.5); ctx.lineTo(ix + 0.5, h - ix - 0.5);
    ctx.stroke();
  },

  // Title bar: stone texture, window icons, city title text (absolute canvas coords)
  _drawTitleBar(ctx, city, mapData, cdSprites) {
    const F = this.FRAME;
    const C = this.COL;
    const tbX = F.borderW, tbY = F.borderW;
    const tbW = F.contentW, tbH = F.titleBarH;

    // Tile stone texture across title bar
    if (cdSprites && cdSprites.titleBarTile) {
      const tile = cdSprites.titleBarTile;
      const tw = tile.width, th = tile.height;
      ctx.save();
      ctx.beginPath();
      ctx.rect(tbX, tbY, tbW, tbH);
      ctx.clip();
      for (let ty = tbY; ty < tbY + tbH; ty += th) {
        for (let tx = tbX; tx < tbX + tbW; tx += tw) {
          ctx.drawImage(tile, tx, ty);
        }
      }
      ctx.restore();

      // Also tile the border walls flanking the title bar with stone
      ctx.save();
      ctx.beginPath();
      ctx.rect(1, tbY, F.borderW - 1, tbH);
      ctx.rect(F.totalW - F.borderW, tbY, F.borderW - 1, tbH);
      ctx.clip();
      for (let ty = tbY; ty < tbY + tbH; ty += th) {
        for (let tx = 0; tx < F.totalW; tx += tw) {
          ctx.drawImage(tile, tx, ty);
        }
      }
      ctx.restore();
    } else {
      ctx.fillStyle = C.borderLight;
      ctx.fillRect(tbX, tbY, tbW, tbH);
    }

    // Window control icons (vertically centered in title bar)
    const iconY = tbY + Math.floor((tbH - 16) / 2);
    if (cdSprites && cdSprites.iconClose)
      ctx.drawImage(cdSprites.iconClose, tbX + 1, iconY);
    if (cdSprites && cdSprites.iconZoomOut)
      ctx.drawImage(cdSprites.iconZoomOut, tbX + 18, iconY);
    if (cdSprites && cdSprites.iconZoomIn)
      ctx.drawImage(cdSprites.iconZoomIn, tbX + 35, iconY);

    // Dark separator line below title bar
    ctx.fillStyle = C.separator;
    ctx.fillRect(tbX, tbY + tbH, tbW, F.separatorH);

    // Title text: "City of {name}, {year}, Population {pop} (Treasury: {gold} Gold)"
    if (city) {
      const year = this._getGameYear(mapData);
      const pop = city.size * 10000;  // approximate Civ2 population display
      const gold = (mapData.civData && mapData.civData[city.owner]) ? mapData.civData[city.owner].treasury || 0 : 0;
      const titleStr = `City of ${city.name}, ${year}, Population ${pop.toLocaleString()} (Treasury: ${gold} Gold)`;
      const textX = tbX + 59;  // after 3 icons + gap
      const textY = tbY + Math.floor(tbH / 2);
      ctx.font = '18px "Times New Roman", serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      // 3-pass shadow: black at (+2,+1), gray at (+1,0), foreground at (0,0)
      ctx.fillStyle = C.titleShadow1;
      ctx.fillText(titleStr, textX + 2, textY + 1);
      ctx.fillStyle = C.titleShadow2;
      ctx.fillText(titleStr, textX + 1, textY);
      ctx.fillStyle = C.titleFg;
      ctx.fillText(titleStr, textX, textY);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }
  },

  // Game year from turn number (copied from cityview.js, with period formatting)
  _getGameYear(mapData) {
    const gs = mapData && mapData.gameState;
    if (!gs) return '';
    const turn = gs.turnsPassed || 0;
    const schedule = [
      { until: 250, perTurn: 20 },
      { until: 300, perTurn: 10 },
      { until: 350, perTurn: 5 },
      { until: 400, perTurn: 2 },
      { until: 450, perTurn: 1 },
      { until: Infinity, perTurn: 1 },
    ];
    let year = -4000;
    let t = 0;
    for (const seg of schedule) {
      const turnsInSeg = Math.min(turn, seg.until) - t;
      if (turnsInSeg <= 0) break;
      year += turnsInSeg * seg.perTurn;
      t += turnsInSeg;
      if (t >= turn) break;
    }
    if (year < 0) return `${-year} B.C.`;
    if (year === 0) return 'A.D. 1';
    return `A.D. ${year}`;
  },

  _drawBackground(ctx, cdSprites) {
    const R = this.REGIONS;
    const C = this.COL;
    if (cdSprites && cdSprites.wallpaper) {
      ctx.drawImage(cdSprites.wallpaper, 0, 0);
    } else {
      ctx.fillStyle = '#1c1c3c';
      ctx.fillRect(0, 0, R.canvas.w, R.canvas.h);
    }
    // Separator line at very top edge
    ctx.fillStyle = C.separator;
    ctx.fillRect(0, 0, R.canvas.w, 1);
    // Gold panel borders (game draws these on top of wallpaper's decorative borders)
    for (const b of R.goldBorders) {
      this._goldBorder(ctx, b.x, b.y, b.w, b.h);
    }
  },

  _drawLabels(ctx) {
    const L = this.REGIONS.labels;
    const C = this.COL;
    this._label(ctx, 'Citizens', L.citizens.x, L.citizens.y);
    this._label(ctx, 'City Resources', L.cityResources.x, L.cityResources.y);
    this._label(ctx, 'Food Storage', L.foodStorage.x, L.foodStorage.y, 'rgb(75,155,35)');
    this._label(ctx, 'City Improvements', L.improvements.x, L.improvements.y);
    this._label(ctx, 'Resource Map', L.resourceMap.x, L.resourceMap.y);
  },

  _drawCitizens(ctx, city, epoch, cdSprites, specs) {
    if (!(cdSprites && cdSprites.citizens)) return;
    const R = this.REGIONS.citizens;
    const eraRow = Math.min(epoch, 3);
    const happy = city.happyCitizens || 0;
    const unhappy = city.unhappyCitizens || 0;
    const totalSpecs = specs.entertainer + specs.taxman + specs.scientist;
    const content = Math.max(0, city.size - happy - unhappy - totalSpecs);
    const faceSpace = this._citizenSpacing(city.size);
    const faceY = R.y;
    let fx = R.x;

    const drawFace = (drawIdx, x) => {
      const face = cdSprites.citizens[eraRow][drawIdx];
      if (face) ctx.drawImage(face, x, faceY);
    };

    let slotIdx = 0;
    for (let i = 0; i < happy; i++) {
      drawFace(slotIdx % 2 === 0 ? 0 : 1, fx);
      fx += faceSpace;
      slotIdx++;
    }
    for (let i = 0; i < content; i++) {
      drawFace(slotIdx % 2 === 0 ? 2 : 3, fx);
      fx += faceSpace;
      slotIdx++;
    }
    for (let i = 0; i < unhappy; i++) {
      drawFace(slotIdx % 2 === 0 ? 4 : 5, fx);
      fx += faceSpace;
      slotIdx++;
    }
    for (let i = 0; i < specs.entertainer; i++) {
      const face = cdSprites.citizens[eraRow][8];
      if (face) ctx.drawImage(face, fx, faceY);
      fx += faceSpace;
    }
    for (let i = 0; i < specs.taxman; i++) {
      const face = cdSprites.citizens[eraRow][9];
      if (face) ctx.drawImage(face, fx, faceY);
      fx += faceSpace;
    }
    for (let i = 0; i < specs.scientist; i++) {
      const face = cdSprites.citizens[eraRow][10];
      if (face) ctx.drawImage(face, fx, faceY);
      fx += faceSpace;
    }
  },

  _drawResourceMap(ctx, city, mapData, cdSprites, mapSprites) {
    const R = this.REGIONS.resourceMap;
    const radiusTiles = [
      { dx: 0, dy: 0 },
      { dx: 0, dy: -2 }, { dx: 1, dy: -1 }, { dx: 1, dy: 1 },
      { dx: 0, dy: 2 }, { dx: -1, dy: 1 }, { dx: -1, dy: -1 },
      { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
      { dx: -1, dy: -3 }, { dx: 0, dy: -3 }, { dx: 1, dy: -2 },
      { dx: 2, dy: -1 }, { dx: 2, dy: 1 }, { dx: 1, dy: 2 },
      { dx: 0, dy: 3 }, { dx: -1, dy: 3 }, { dx: -2, dy: 1 },
      { dx: -2, dy: -1 }, { dx: -1, dy: -2 }, { dx: -1, dy: 2 },
    ];

    const worked = this._getWorkedTiles(city);
    const hasTerrain = mapSprites && mapSprites.terrain;
    const { gridW, gridH, sprW, sprH } = R;
    const mapOffX = R.x, mapOffY = R.y;

    for (let i = 0; i < radiusTiles.length; i++) {
      const rt = radiusTiles[i];
      const tileGx = city.gx + rt.dx;
      const tileGy = city.gy + rt.dy;
      const wgx = mapData.wrap ? mapData.wrap(tileGx) : tileGx;
      const inBounds = tileGy >= 0 && tileGy < mapData.mh && wgx >= 0 && wgx < mapData.mw;

      // Screen position: convert game grid offsets to pixel position
      const adjustX = (rt.dy % 2 !== 0) ? ((city.gy % 2 === 0) ? gridW / 2 : -gridW / 2) : 0;
      const sx = mapOffX + (rt.dx * gridW) + adjustX + (3 * gridW) - sprW / 2;
      const sy = mapOffY + (rt.dy * gridH) + (3 * gridH) - sprH / 2;

      if (hasTerrain && inBounds && mapData.getTerrain) {
        const ter = mapData.getTerrain(tileGx, tileGy);
        const variants = mapSprites.terrain[ter];
        if (variants && variants.length > 0) {
          const vi = ((wgx * 13 + tileGy * 7) & 0x7FFFFFFF) % variants.length;
          ctx.drawImage(variants[vi], sx, sy, sprW, sprH);
        }
      } else if (inBounds && mapData.getTerrain) {
        // Fallback: colored diamonds
        const ter = mapData.getTerrain(tileGx, tileGy);
        const fillColor = this.TERRAIN_COLORS[ter] || 'rgb(0,0,0)';
        const cx = sx + sprW / 2, cy = sy + sprH / 2;
        this._diamond(ctx, cx, cy, gridW / 2, gridH / 2, fillColor, 'rgb(32,32,32)');
      }

      // Worker dot on worked tiles
      if (worked.has(i)) {
        const cx = sx + sprW / 2, cy = sy + sprH / 2;
        ctx.fillStyle = 'rgb(240,220,0)';
        ctx.fillRect(cx - 1, cy - 1, 3, 3);
      }

      // White outline on center tile
      if (i === 0) {
        const cx = sx + sprW / 2, cy = sy + sprH / 2;
        this._diamond(ctx, cx, cy, gridW / 2, gridH / 2, null, '#fff');
      }
    }

    // Draw small food/shield/trade icons on worked tiles
    if (cdSprites && cdSprites.foodSmall) {
      for (let i = 0; i < radiusTiles.length; i++) {
        if (!worked.has(i)) continue;
        const rt = radiusTiles[i];
        const adjustX = (rt.dy % 2 !== 0) ? ((city.gy % 2 === 0) ? gridW / 2 : -gridW / 2) : 0;
        const cx = mapOffX + (rt.dx * gridW) + adjustX + (3 * gridW);
        const cy = mapOffY + (rt.dy * gridH) + (3 * gridH);
        ctx.drawImage(cdSprites.foodSmall, cx - 5, cy - 5, 10, 10);
      }
    }
  },

  _drawResourceRows(ctx, city, cdSprites, civData, supported) {
    if (!cdSprites) return;
    const RES = this.REGIONS.resources;

    const corruption = Math.max(0, city.totalTrade - city.scienceOutput - city.taxOutput);
    const luxOutput = Math.max(0, city.totalTrade - city.taxOutput - city.scienceOutput - corruption);
    const support = supported.length;
    const production = city.shieldProduction || 0;
    const sciRate = civData ? (civData.scienceRate || 0) * 10 : 0;
    const taxRate = civData ? (civData.taxRate || 0) * 10 : 0;
    const luxRate = 100 - sciRate - taxRate;

    // Row 1: FOOD
    const foodR = RES.food;
    const foodTotal = city.foodProduction || 0;
    const foodSurplus = foodTotal - (city.size * 2);
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'left';
    this._text(ctx, `Food: ${foodTotal}`, foodR.textX, foodR.textY, 'rgb(87,171,39)', 'bold 13px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Surplus: ${foodSurplus}`, foodR.rightX, foodR.textY, 'rgb(63,139,31)');
    ctx.textAlign = 'left';
    const foodIconCount = foodTotal + Math.abs(foodSurplus);
    const foodSpacing = this._resourceSpacing(foodIconCount);
    for (let i = 0; i < foodTotal; i++)
      ctx.drawImage(cdSprites.food, foodR.iconX + i * foodSpacing, foodR.iconY, 14, 14);
    if (foodSurplus < 0) {
      const hungerCount = Math.abs(foodSurplus);
      const hungerStartX = foodR.rightX - (foodSpacing * hungerCount + 14 - foodSpacing);
      for (let i = 0; i < hungerCount; i++)
        ctx.drawImage(cdSprites.hunger, hungerStartX + i * foodSpacing, foodR.iconY, 14, 14);
    } else if (foodSurplus > 0) {
      const surpStartX = foodR.rightX - (foodSpacing * foodSurplus + 14 - foodSpacing);
      for (let i = 0; i < foodSurplus; i++)
        ctx.drawImage(cdSprites.food, surpStartX + i * foodSpacing, foodR.iconY, 14, 14);
    }

    // Row 2: TRADE
    const tradeR = RES.trade;
    const tradeTotal = city.totalTrade || 0;
    ctx.textAlign = 'left';
    this._text(ctx, `Trade: ${tradeTotal}`, tradeR.textX, tradeR.textY, 'rgb(239,159,7)', 'bold 13px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Corruption: ${corruption}`, tradeR.rightX, tradeR.textY, 'rgb(227,83,15)');
    ctx.textAlign = 'left';
    const tradeIconCount = tradeTotal + corruption;
    const tradeSpacing = this._resourceSpacing(tradeIconCount);
    for (let i = 0; i < tradeTotal; i++)
      ctx.drawImage(cdSprites.trade, tradeR.iconX + i * tradeSpacing, tradeR.iconY, 14, 14);
    if (corruption > 0) {
      const corrStartX = tradeR.rightX - (tradeSpacing * corruption + 14 - tradeSpacing);
      for (let i = 0; i < corruption; i++)
        ctx.drawImage(cdSprites.corruption, corrStartX + i * tradeSpacing, tradeR.iconY, 14, 14);
    }

    // Row 3: TAX / LUX / SCI — single horizontal row (matching real Civ2 layout)
    const tlsR = RES.taxLuxSci;
    const taxCount = city.taxOutput || 0;
    const sciCount = city.scienceOutput || 0;

    // Text line: "30% Tax: X" left, "0% Lux: X" center, "70% Sci: X" right
    const textY = tlsR.iconY - 2;
    ctx.font = 'bold 11px Arial, sans-serif';
    ctx.textAlign = 'left';
    this._text(ctx, `${taxRate}% Tax: ${taxCount}`, tlsR.textX, textY, 'rgb(239,159,7)', 'bold 11px Arial, sans-serif');
    ctx.textAlign = 'center';
    this._text(ctx, `${luxRate}% Lux: ${luxOutput}`, tlsR.centerX, textY, 'rgb(255,255,255)', 'bold 11px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `${sciRate}% Sci: ${sciCount}`, tlsR.rightX, textY, 'rgb(63,187,199)', 'bold 11px Arial, sans-serif');
    ctx.textAlign = 'left';

    // Icons row below text: tax from left, lux from center, sci from right
    const iconY = tlsR.iconY + 1;
    // Tax icons (left-aligned)
    if (taxCount > 0) {
      const sectionW = tlsR.luxIconX - tlsR.iconX - 4;
      const taxSp = this._iconSpacing(taxCount, 14, sectionW);
      for (let i = 0; i < taxCount; i++)
        ctx.drawImage(cdSprites.tax, tlsR.iconX + i * taxSp.spacing, iconY, 14, 14);
    }
    // Luxury icons (center section)
    if (luxOutput > 0) {
      const luxStartX = tlsR.luxIconX;
      const luxEndX = tlsR.centerX + (tlsR.centerX - tlsR.luxIconX);
      const luxSp = this._iconSpacing(luxOutput, 14, luxEndX - luxStartX);
      for (let i = 0; i < luxOutput; i++)
        ctx.drawImage(cdSprites.luxury, luxStartX + i * luxSp.spacing, iconY, 14, 14);
    }
    // Science icons (right-aligned)
    if (sciCount > 0) {
      const sciStartX = tlsR.centerX + (tlsR.centerX - tlsR.luxIconX);
      const sciSp = this._iconSpacing(sciCount, 14, tlsR.rightX - sciStartX);
      for (let i = 0; i < sciCount; i++)
        ctx.drawImage(cdSprites.science, sciStartX + i * sciSp.spacing, iconY, 14, 14);
    }

    // Row 4: SUPPORT + PRODUCTION
    const spR = RES.supportProd;
    ctx.textAlign = 'left';
    this._text(ctx, `Support: ${support}`, spR.textX, spR.textY, 'rgb(63,79,167)', 'bold 13px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Production: ${production}`, spR.rightX, spR.textY, 'rgb(7,11,103)');
    ctx.textAlign = 'left';
    const spTotal = support + production;
    const spSpacing = this._resourceSpacing(spTotal);
    for (let i = 0; i < support; i++)
      ctx.drawImage(cdSprites.shields, spR.iconX + i * spSpacing, spR.iconY, 14, 14);
    if (production > 0) {
      const prodStartX = spR.rightX - (spSpacing * production + 14 - spSpacing);
      for (let i = 0; i < production; i++)
        ctx.drawImage(cdSprites.shields, prodStartX + i * spSpacing, spR.iconY, 14, 14);
    }
  },

  _drawFoodStorage(ctx, city, cdSprites, mapData) {
    if (!(cdSprites && cdSprites.food)) return;
    const R = this.REGIONS.foodStorage;
    const hasGranary = !!(city.buildings & (1 << 3));
    const hasPyramids = mapData && mapData.gameState && mapData.gameState.wonderCityIds &&
      mapData.gameState.wonderCityIds[0] !== 0xFF && mapData.gameState.wonderCityIds[0] !== 0xFFFF;
    const foodStored = city.foodInBox || 0;
    const wheatW = 14, wheatH = 14;
    const wheatSpacing = this._wheatSpacing(city.size);

    // Food to grow: (size + 1) × food_box_factor (from decompiled FUN_004e7eb1 @ 0x4E7EB1)
    // COSMIC #3 food_box_factor defaults to 10, parsed from save file tail if available
    const foodBoxFactor = (mapData && mapData.tail && mapData.tail.cosmicFoodRows) || 10;
    const foodToGrow = this.getFoodToGrow(city.size, foodBoxFactor);

    // Centered border rectangle
    const lineWidth = city.size * wheatSpacing + wheatW + 7;
    const panelCenterX = R.x + R.w / 2;
    const startingX = Math.round(panelCenterX - lineWidth / 2);
    const startingY = R.borderY;
    const lineHeight = R.lineH;

    ctx.strokeStyle = 'rgb(75,155,35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(startingX, startingY); ctx.lineTo(startingX + lineWidth, startingY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(startingX, startingY); ctx.lineTo(startingX, startingY + lineHeight); ctx.stroke();
    ctx.strokeStyle = 'rgb(0,51,0)';
    ctx.beginPath(); ctx.moveTo(startingX, R.bottomY); ctx.lineTo(startingX + lineWidth, R.bottomY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(startingX + lineWidth, startingY); ctx.lineTo(startingX + lineWidth, startingY + lineHeight); ctx.stroke();

    // Draw wheat icons — only stored food, Size+1 columns per row, 10 rows max
    let count = 0;
    const iconStartX = startingX + 3;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col <= city.size; col++) {
        ctx.drawImage(cdSprites.food, iconStartX + wheatSpacing * col, R.wheatY + wheatH * row, wheatW, wheatH);
        count++;
        if (count >= foodStored) break;
      }
      if (count >= foodStored) break;
    }

    // Granary line (halfway point — city keeps 50% food after growth with granary or Pyramids)
    if (hasGranary || hasPyramids) {
      const granLineWidth = lineWidth - 10;
      const granStartX = iconStartX + 2;
      ctx.strokeStyle = 'rgb(75,155,35)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(granStartX, R.granaryY); ctx.lineTo(granStartX + granLineWidth, R.granaryY); ctx.stroke();
    }

    // Food progress text: "X/Y to grow" (from decompiled growth formula)
    const foodSurplus = (city.foodProduction || 0) - (city.size * 2);
    const turnsToGrow = foodSurplus > 0 ? Math.ceil((foodToGrow - foodStored) / foodSurplus) : 0;
    const progressColor = foodSurplus > 0 ? 'rgb(87,171,39)' : foodSurplus < 0 ? 'rgb(227,83,15)' : 'rgb(135,135,135)';
    const progressText = `${foodStored}/${foodToGrow}`;
    const turnsText = foodSurplus > 0 && foodStored < foodToGrow
      ? `(${turnsToGrow} turn${turnsToGrow !== 1 ? 's' : ''})`
      : foodSurplus < 0 ? '(Starving!)' : '';
    ctx.textAlign = 'center';
    this._text(ctx, progressText, panelCenterX, R.bottomY + 3, progressColor, 'bold 10px Arial, sans-serif');
    if (turnsText) {
      this._text(ctx, turnsText, panelCenterX, R.bottomY + 14, progressColor, '10px Arial, sans-serif');
    }
    ctx.textAlign = 'left';
  },

  _drawProduction(ctx, city, cdSprites, mapSprites, ownerColor, civData) {
    const R = this.REGIONS.production;
    const item = city.itemInProduction;
    const prodName = this.getProductionName(item);

    // Draw production item sprite
    if (item && cdSprites) {
      if (item.type === 'unit' && mapSprites && mapSprites.unitTemplates) {
        const template = mapSprites.unitTemplates[item.id];
        if (template) {
          const colored = Civ2Renderer._recolorUnit(template, ownerColor);
          ctx.drawImage(colored, R.unitSprite.x, R.unitSprite.y, R.unitSprite.w, R.unitSprite.h);
        }
      } else {
        // Building or wonder — name centered, icon below
        ctx.textAlign = 'center';
        this._text(ctx, prodName, R.buildingName.x, R.buildingName.y, 'rgb(63,79,167)', '13px Arial, sans-serif');
        ctx.textAlign = 'left';
        if (!item.type || item.type === 'building') {
          if (item.id >= 1 && item.id <= 38 && cdSprites.improvements[item.id]) {
            ctx.drawImage(cdSprites.improvements[item.id], R.buildingIcon.x, R.buildingIcon.y, R.buildingIcon.w, R.buildingIcon.h);
          }
        }
        if (item.type === 'wonder' || (item.id >= 39 && item.id <= 66)) {
          const wIdx = item.id - 39;
          if (cdSprites.wonders[wIdx]) {
            ctx.drawImage(cdSprites.wonders[wIdx], R.buildingIcon.x, R.buildingIcon.y, R.buildingIcon.w, R.buildingIcon.h);
          }
        }
      }
    }

    // Shield grid with dark background (like food storage)
    if (cdSprites && cdSprites.shields) {
      const SG = R.shieldGrid;
      const cost = this._getProductionCost(item);
      const stored = city.shieldsInBox || 0;
      const numCols = SG.cols;
      const numRows = cost > 0 ? Math.ceil(cost / numCols) : 0;

      if (cost > 0) {
        const boxHeight = 4 + numRows * 14;
        // Dark blue background fill (like food storage green bg)
        ctx.fillStyle = 'rgb(0,0,95)';
        ctx.fillRect(SG.borderX + 1, SG.borderY + 1, SG.borderRight - SG.borderX - 1, boxHeight - 1);
        // 3D border
        ctx.strokeStyle = 'rgb(83,103,191)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY); ctx.lineTo(SG.borderRight, SG.borderY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY); ctx.lineTo(SG.borderX, SG.borderY + boxHeight); ctx.stroke();
        ctx.strokeStyle = 'rgb(0,0,63)';
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY + boxHeight); ctx.lineTo(SG.borderRight, SG.borderY + boxHeight); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(SG.borderRight, SG.borderY); ctx.lineTo(SG.borderRight, SG.borderY + boxHeight); ctx.stroke();

        // Draw ALL shield positions up to cost; produced shields full, remaining dark
        const dx = numCols > 1 ? (SG.borderRight - SG.borderX - 14 - 4) / (numCols - 1) : 0;
        const dy = 14;
        let count = 0;
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            if (count >= cost) break;
            const sx = SG.x + Math.round(2 + col * dx);
            const sy = SG.y + dy * row;
            if (count < stored) {
              // Produced: full bright shield
              ctx.drawImage(cdSprites.shields, sx, sy, 14, 14);
            } else {
              // Remaining: dim shield (draw at reduced opacity)
              ctx.globalAlpha = 0.25;
              ctx.drawImage(cdSprites.shields, sx, sy, 14, 14);
              ctx.globalAlpha = 1.0;
            }
            count++;
          }
        }

        // Production progress text below shield grid
        const shieldsPerTurn = city.shieldProduction || 0;
        const turnsLeft = shieldsPerTurn > 0 ? Math.ceil((cost - stored) / shieldsPerTurn) : 999;
        const progressText = `${stored}/${cost}`;
        const turnsText = stored >= cost ? 'Complete!' : turnsLeft < 999 ? `${turnsLeft} turn${turnsLeft !== 1 ? 's' : ''}` : '';
        const progressY = SG.borderY + boxHeight + 12;
        ctx.textAlign = 'center';
        this._text(ctx, progressText, (SG.borderX + SG.borderRight) / 2, progressY,
          'rgb(103,127,215)', '10px Arial, sans-serif');
        if (turnsText) {
          this._text(ctx, turnsText, (SG.borderX + SG.borderRight) / 2, progressY + 12,
            'rgb(135,135,135)', '10px Arial, sans-serif');
        }
        ctx.textAlign = 'left';
      }

      // Buy cost display (from decompiled city_button_buy @ 0x509B48)
      if (item && cost > 0 && stored < cost) {
        const buyCost = this.calculateBuyCost(item, stored);
        const treasury = civData ? civData.treasury : 0;
        const canAfford = treasury >= buyCost;
        const buyText = `Buy: ${buyCost} gold`;
        const buyColor = canAfford ? 'rgb(223,187,63)' : 'rgb(159,115,31)';
        ctx.textAlign = 'center';
        this._text(ctx, buyText, R.x + 37, R.y + 34, buyColor, '10px Arial, sans-serif');
        ctx.textAlign = 'left';
      }
    }
  },

  _drawUnitsSupported(ctx, supported, mapSprites) {
    const R = this.REGIONS.unitsSupported;
    const P = this.REGIONS.panels.unitSupport;  // { x:7, y:215, w:184, h:69 }

    if (supported.length < 5) {
      this._label(ctx, 'Units Supported', R.x + R.w / 2, R.y + 12);
    }

    if (!(mapSprites && mapSprites.unitTemplates && supported.length > 0)) return;

    const unitW = 51, unitH = 39;
    const maxShow = Math.min(12, supported.length);
    const drawY = supported.length <= 3 ? R.y + 20 : R.y + 6;
    const rows = maxShow <= 3 ? 1 : 2;
    const perRow = Math.ceil(maxShow / rows);

    // Clip to the panel box to prevent overflow
    ctx.save();
    ctx.beginPath();
    ctx.rect(P.x, P.y, P.w, P.h);
    ctx.clip();

    for (let row = 0; row < rows; row++) {
      const rowStart = row * perRow;
      const rowCount = Math.min(perRow, maxShow - rowStart);
      if (rowCount <= 0) break;

      // Compute horizontal spacing — overlap if too many to fit
      const availW = R.w - 8;
      const totalNeeded = rowCount * unitW;
      const spacing = totalNeeded <= availW ? unitW + 4 : Math.floor((availW - unitW) / Math.max(1, rowCount - 1));
      const uy = rows === 1 ? drawY : R.y + 6 + row * 35;

      for (let i = 0; i < rowCount; i++) {
        const idx = rowStart + i;
        const u = supported[idx];
        const template = mapSprites.unitTemplates[u.type];
        if (!template) continue;
        const cacheKey = `${u.type}-${u.owner}`;
        let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
        if (!colored) {
          colored = Civ2Renderer._recolorUnit(template, Civ2Renderer.CIV_COLORS[u.owner] || '#ccc');
        }
        const ux = R.x + 8 + i * spacing;
        ctx.drawImage(colored, ux, uy, unitW, unitH);
      }
    }
    ctx.restore();
  },

  _drawImprovements(ctx, city, cityIndex, mapData, cdSprites) {
    const improvements = this.getCityImprovements(city, cityIndex, mapData);
    if (!(improvements.length > 0 && cdSprites)) return;
    const R = this.REGIONS.improvements;
    const C = this.COL;
    ctx.font = '9px Arial, sans-serif';
    for (let i = 0; i < Math.min(R.maxRows, improvements.length); i++) {
      const imp = improvements[i];
      const thumb = imp.isWonder ? cdSprites.wonders[imp.id - 39] : cdSprites.improvements[imp.id];
      if (thumb) {
        ctx.drawImage(thumb, R.thumbX, R.thumbY + R.rowH * i, R.thumbW, R.thumbH);
      }
      const nameColor = imp.isWonder ? C.wonder : '#fff';
      this._text(ctx, imp.name, R.nameX, R.nameY + R.rowH * i + 9, nameColor);
      if (!imp.isWonder && cdSprites.sellIcon) {
        ctx.drawImage(cdSprites.sellIcon, R.sellX, R.sellY + R.rowH * i, R.sellSize, R.sellSize);
      }
    }

    // Scrollbar (visual-only) — position from FUN_00505ffa + SM_CXVSCROLL=17
    const sbX = 175, sbY = 291, sbW = 17, sbH = 129;
    const btnH = 17;
    // Track
    ctx.fillStyle = 'rgb(192,192,192)';
    ctx.fillRect(sbX, sbY, sbW, sbH);
    // 3D frame around whole scrollbar
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.strokeRect(sbX + 0.5, sbY + 0.5, sbW - 1, sbH - 1);
    // Up button
    ctx.fillStyle = 'rgb(192,192,192)';
    ctx.fillRect(sbX, sbY, sbW, btnH);
    ctx.strokeStyle = '#ccc';
    ctx.beginPath(); ctx.moveTo(sbX + 0.5, sbY + btnH - 0.5); ctx.lineTo(sbX + 0.5, sbY + 0.5); ctx.lineTo(sbX + sbW - 0.5, sbY + 0.5); ctx.stroke();
    ctx.strokeStyle = '#555';
    ctx.beginPath(); ctx.moveTo(sbX + sbW - 0.5, sbY + 0.5); ctx.lineTo(sbX + sbW - 0.5, sbY + btnH - 0.5); ctx.lineTo(sbX + 0.5, sbY + btnH - 0.5); ctx.stroke();
    // Up arrow
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.moveTo(sbX + sbW / 2, sbY + 4); ctx.lineTo(sbX + sbW / 2 + 4, sbY + btnH - 4); ctx.lineTo(sbX + sbW / 2 - 4, sbY + btnH - 4); ctx.closePath(); ctx.fill();
    // Down button
    const dbY = sbY + sbH - btnH;
    ctx.fillStyle = 'rgb(192,192,192)';
    ctx.fillRect(sbX, dbY, sbW, btnH);
    ctx.strokeStyle = '#ccc';
    ctx.beginPath(); ctx.moveTo(sbX + 0.5, dbY + btnH - 0.5); ctx.lineTo(sbX + 0.5, dbY + 0.5); ctx.lineTo(sbX + sbW - 0.5, dbY + 0.5); ctx.stroke();
    ctx.strokeStyle = '#555';
    ctx.beginPath(); ctx.moveTo(sbX + sbW - 0.5, dbY + 0.5); ctx.lineTo(sbX + sbW - 0.5, dbY + btnH - 0.5); ctx.lineTo(sbX + 0.5, dbY + btnH - 0.5); ctx.stroke();
    // Down arrow
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.moveTo(sbX + sbW / 2, dbY + btnH - 4); ctx.lineTo(sbX + sbW / 2 + 4, dbY + 4); ctx.lineTo(sbX + sbW / 2 - 4, dbY + 4); ctx.closePath(); ctx.fill();
    // Proportional thumb
    const trackTop = sbY + btnH;
    const trackH = sbH - btnH * 2;
    const totalItems = improvements.length;
    const thumbH = Math.max(12, Math.round(trackH * Math.min(R.maxRows, totalItems) / Math.max(totalItems, 1)));
    ctx.fillStyle = 'rgb(192,192,192)';
    ctx.fillRect(sbX + 1, trackTop, sbW - 2, thumbH);
    ctx.strokeStyle = '#ccc';
    ctx.beginPath(); ctx.moveTo(sbX + 1.5, trackTop + thumbH - 0.5); ctx.lineTo(sbX + 1.5, trackTop + 0.5); ctx.lineTo(sbX + sbW - 1.5, trackTop + 0.5); ctx.stroke();
    ctx.strokeStyle = '#555';
    ctx.beginPath(); ctx.moveTo(sbX + sbW - 1.5, trackTop + 0.5); ctx.lineTo(sbX + sbW - 1.5, trackTop + thumbH - 0.5); ctx.lineTo(sbX + 1.5, trackTop + thumbH - 0.5); ctx.stroke();
  },

  infoPanelMode: 0,

  _drawInfoPanel(ctx, city, mapData, cdSprites, mapSprites) {
    const R = this.REGIONS.infoPanel;
    const C = this.COL;
    const mode = this.infoPanelMode || 0;

    if (mode === 0) {
      // Mode 0: Units Present + trade text
      this._drawInfoPanelUnits(ctx, city, mapData, cdSprites, mapSprites);
    } else if (mode === 1) {
      // Mode 1: Mini-map
      this._drawInfoPanelMap(ctx, city, mapData);
    } else if (mode === 2) {
      // Mode 2: Happiness
      this._drawInfoPanelHappy(ctx, city);
    }
  },

  _drawInfoPanelUnits(ctx, city, mapData, cdSprites, mapSprites) {
    const R = this.REGIONS.infoPanel;
    const C = this.COL;
    const garrison = this.getGarrisonedUnits(city, mapData);

    if (garrison.length < 6) {
      this._label(ctx, 'Units Present', R.x + R.w / 2, R.y + 12);
    }

    if (mapSprites && mapSprites.unitTemplates && garrison.length > 0) {
      ctx.font = '9px Arial, sans-serif';
      for (let i = 0; i < Math.min(18, garrison.length); i++) {
        const u = garrison[i];
        const template = mapSprites.unitTemplates[u.type];
        if (!template) continue;
        const cacheKey = `${u.type}-${u.owner}`;
        let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
        if (!colored) {
          colored = Civ2Renderer._recolorUnit(template, Civ2Renderer.CIV_COLORS[u.owner] || '#ccc');
        }
        let ux, uy;
        if (garrison.length <= 5) {
          ux = R.x + 1 + 48 * i;
          uy = R.y + 22;
        } else if (i < 10) {
          ux = R.x + 1 + 48 * (i % 5);
          uy = R.y + 3 + 39 * Math.floor(i / 5);
        } else {
          ux = R.x + 25 + 48 * ((i - 10) % 4);
          uy = R.y + 22 + 39 * Math.floor((i - 10) / 4);
        }
        ctx.drawImage(colored, ux, uy, 48, 36);
        if (i < 10) {
          const homeCity = u.homeCityId !== 0xFFFF && u.homeCityId !== 0x00FF
            ? mapData.cities[u.homeCityId] : null;
          const abbr = homeCity ? (homeCity.name.length < 3 ? homeCity.name : homeCity.name.substring(0, 3)) : 'NON';
          ctx.textAlign = 'center';
          this._text(ctx, abbr, ux + 24, uy + 36, 'rgb(135,135,135)', '9px Arial, sans-serif');
          ctx.textAlign = 'left';
        }
      }
    }

    // Trade text at bottom of info panel
    ctx.font = '9px Arial, sans-serif';
    const suppliedNames = [];
    if (city.tradeCommoditiesSupplied) {
      for (const cIdx of city.tradeCommoditiesSupplied) {
        if (cIdx !== undefined && cIdx < 16) suppliedNames.push(this.COMMODITY_NAMES[cIdx]);
      }
    }
    this._text(ctx, `Supplies: ${suppliedNames.join(', ') || 'None'}`, R.tradeX, R.suppliesY, 'rgb(227,83,15)', null, C.headerShadow);
    const demandedNames = [];
    if (city.tradeCommoditiesDemanded) {
      for (const cIdx of city.tradeCommoditiesDemanded) {
        if (cIdx !== undefined && cIdx < 16) demandedNames.push(this.COMMODITY_NAMES[cIdx]);
      }
    }
    this._text(ctx, `Demands: ${demandedNames.join(', ') || 'None'}`, R.tradeX, R.demandsY, 'rgb(227,83,15)', null, C.headerShadow);
    if (city.tradeRouteCount > 0) {
      for (let i = 0; i < Math.min(3, city.tradeRouteCount); i++) {
        const partnerId = city.tradePartnerCityIds[i];
        if (partnerId === 0xFFFF) continue;
        const commodity = this.COMMODITY_NAMES[city.tradeCommoditiesInRoute[i]] || '?';
        const partner = this.findCityBySequenceId(mapData, partnerId);
        const partnerName = partner ? partner.name : `City #${partnerId}`;
        this._text(ctx, `${partnerName} ${commodity}: +1`, R.tradeX, R.tradeRoutesY + i * 13, 'rgb(227,83,15)');
      }
    }
  },

  _drawInfoPanelMap(ctx, city, mapData) {
    const R = this.REGIONS.infoPanel;
    this._label(ctx, 'Map', R.x + R.w / 2, R.y + 12);

    if (!mapData || !mapData.mw || !mapData.mh) return;
    const panelX = R.x + 2, panelY = R.y + 20;
    const panelW = R.w - 4, panelH = 160;
    // Scale to fit
    const scaleX = panelW / mapData.mw;
    const scaleY = panelH / (mapData.mh / 2);
    const scale = Math.min(scaleX, scaleY);
    const mapPixW = Math.floor(mapData.mw * scale);
    const mapPixH = Math.floor((mapData.mh / 2) * scale);
    const offX = panelX + Math.floor((panelW - mapPixW) / 2);
    const offY = panelY + Math.floor((panelH - mapPixH) / 2);

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(panelX, panelY, panelW, panelH);

    // Draw terrain colored rects
    if (mapData.getTerrain) {
      const pw = Math.max(1, Math.ceil(scale));
      const ph = Math.max(1, Math.ceil(scale));
      for (let gy = 0; gy < mapData.mh; gy++) {
        for (let gx = gy % 2; gx < mapData.mw; gx += 2) {
          const ter = mapData.getTerrain(gx, gy);
          const col = this.TERRAIN_COLORS[ter];
          if (!col) continue;
          ctx.fillStyle = col;
          const px = offX + Math.floor(gx * scale);
          const py = offY + Math.floor((gy / 2) * scale);
          ctx.fillRect(px, py, pw, ph);
        }
      }
    }

    // City markers (palette 0x29 = yellow-ish)
    ctx.fillStyle = '#ffff00';
    for (const c of mapData.cities) {
      const px = offX + Math.floor(c.gx * scale);
      const py = offY + Math.floor((c.gy / 2) * scale);
      ctx.fillRect(px - 1, py - 1, 3, 3);
    }

    // Current city marker highlight
    ctx.fillStyle = '#ff0000';
    const cx = offX + Math.floor(city.gx * scale);
    const cy = offY + Math.floor((city.gy / 2) * scale);
    ctx.fillRect(cx - 2, cy - 2, 5, 5);
  },

  _drawInfoPanelHappy(ctx, city) {
    const R = this.REGIONS.infoPanel;
    this._label(ctx, 'Happy', R.x + R.w / 2, R.y + 12);

    const panelX = R.x + 2, panelY = R.y + 20;
    const panelW = R.w - 4, panelH = 160;
    const rowCount = 5;
    const rowH = Math.floor(panelH / rowCount);

    // Row labels
    const rowLabels = ['Happy', 'Content', 'Unhappy', 'Entertainers', 'Taxmen'];
    const rowColors = ['rgb(0,200,0)', 'rgb(200,200,0)', 'rgb(200,0,0)', 'rgb(200,100,200)', 'rgb(200,200,100)'];

    const happy = city.happyCitizens || 0;
    const unhappy = city.unhappyCitizens || 0;
    const specs = this.getSpecialists(city);
    const content = Math.max(0, city.size - happy - unhappy - specs.entertainer - specs.taxman - specs.scientist);
    const rowCounts = [happy, content, unhappy, specs.entertainer, specs.taxman];

    for (let r = 0; r < rowCount; r++) {
      const ry = panelY + r * rowH;
      // Divider line (palette 0x7C = gray)
      if (r > 0) {
        ctx.fillStyle = 'rgb(124,124,124)';
        ctx.fillRect(panelX, ry, panelW, 1);
      }
      // Label
      ctx.textAlign = 'left';
      this._text(ctx, rowLabels[r] + ': ' + rowCounts[r], panelX + 2, ry + 12, rowColors[r], '10px Arial, sans-serif');
      // Citizen dots
      ctx.fillStyle = rowColors[r];
      for (let d = 0; d < rowCounts[r]; d++) {
        ctx.beginPath();
        ctx.arc(panelX + 80 + d * 10, ry + rowH / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },

  BUTTON_LABELS: {
    buy: 'Buy', change: 'Change', info: 'Info', map: 'Map', rename: 'Rename',
    happy: 'Happy', panorama: 'View', exit: 'Exit', prevCity: '<', nextCity: '>'
  },

  _drawButtons(ctx, cdSprites) {
    const B = this.REGIONS.buttons;
    const labels = this.BUTTON_LABELS;
    const infoLabels = ['Info', 'Map', 'Happy'];
    ctx.font = 'bold 11px Arial, sans-serif';
    for (const [action, r] of Object.entries(B)) {
      // Arrow buttons: gray button with small filled triangle
      if (action === 'nextCity' || action === 'prevCity') {
        ctx.fillStyle = 'rgb(192,192,192)';
        ctx.fillRect(r.x, r.y, r.w, r.h);
        // 3D button edges
        ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(r.x+0.5,r.y+r.h-0.5); ctx.lineTo(r.x+0.5,r.y+0.5); ctx.lineTo(r.x+r.w-0.5,r.y+0.5); ctx.stroke();
        ctx.strokeStyle = '#555';
        ctx.beginPath(); ctx.moveTo(r.x+r.w-0.5,r.y+0.5); ctx.lineTo(r.x+r.w-0.5,r.y+r.h-0.5); ctx.lineTo(r.x+0.5,r.y+r.h-0.5); ctx.stroke();
        // Triangle centered in button
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        if (action === 'nextCity') {
          // Up arrow ▲
          ctx.moveTo(cx, cy - 5); ctx.lineTo(cx + 5, cy + 4); ctx.lineTo(cx - 5, cy + 4);
        } else {
          // Down arrow ▼
          ctx.moveTo(cx, cy + 5); ctx.lineTo(cx + 5, cy - 4); ctx.lineTo(cx - 5, cy - 4);
        }
        ctx.closePath(); ctx.fill();
        continue;
      }
      // Gray fill
      ctx.fillStyle = 'rgb(192,192,192)';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      // 3D highlight (top + left)
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r.x + 0.5, r.y + r.h - 0.5);
      ctx.lineTo(r.x + 0.5, r.y + 0.5);
      ctx.lineTo(r.x + r.w - 0.5, r.y + 0.5);
      ctx.stroke();
      // 3D shadow (bottom + right)
      ctx.strokeStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(r.x + r.w - 0.5, r.y + 0.5);
      ctx.lineTo(r.x + r.w - 0.5, r.y + r.h - 0.5);
      ctx.lineTo(r.x + 0.5, r.y + r.h - 0.5);
      ctx.stroke();
      // Center-aligned label text (Info button shows mode-dependent label)
      let label;
      if (action === 'info') {
        label = infoLabels[this.infoPanelMode || 0];
      } else {
        label = labels[action] || action;
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000';
      ctx.fillText(label, r.x + r.w / 2, r.y + r.h / 2);
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  },

  _registerButtons() {
    const B = this.REGIONS.buttons;
    const regions = Object.entries(B).map(([action, r]) => ({ x: r.x, y: r.y, w: r.w, h: r.h, action }));
    // Title bar close icon (in content-offset coordinates, so negative Y)
    // Icon drawn at tbX+1, tbY+4 in canvas coords; content origin is at (borderW, borderW+24+1)
    // So in content coords: x=1, y = -(titleBarH + separatorH - 4) = -(24+1-4) = -21
    regions.push({ x: 1, y: -21, w: 16, h: 16, action: 'exit' });
    return regions;
  },

  // ═══════════════════════════════════════════════════════════════════
  // MAIN RENDER — orchestrator that calls each draw method in order
  // ═══════════════════════════════════════════════════════════════════

  render(canvas, city, cityIndex, mapData, cdSprites, mapSprites) {
    const F = this.FRAME;
    canvas.width = F.totalW;
    canvas.height = F.totalH;
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    // Phase 1: draw border + title bar in absolute canvas coordinates
    this._drawOuterBorder(ctx, cdSprites);
    this._drawTitleBar(ctx, city, mapData, cdSprites);

    // Phase 2: translate to content area, draw everything else unchanged
    ctx.save();
    ctx.translate(F.contentX, F.contentY);

    const epoch = mapData.civTechs ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner]) : 0;
    const civData = mapData.civData && mapData.civData[city.owner];
    const ownerColor = Civ2Renderer.CIV_COLORS[city.owner] || '#fff';
    const specs = this.getSpecialists(city);
    const supported = this.getSupportedUnits(cityIndex, mapData);

    this._drawBackground(ctx, cdSprites);
    this._drawLabels(ctx);
    this._drawCitizens(ctx, city, epoch, cdSprites, specs);
    this._drawResourceMap(ctx, city, mapData, cdSprites, mapSprites);
    this._drawResourceRows(ctx, city, cdSprites, civData, supported);
    this._drawFoodStorage(ctx, city, cdSprites, mapData);
    this._drawProduction(ctx, city, cdSprites, mapSprites, ownerColor, civData);
    this._drawUnitsSupported(ctx, supported, mapSprites);
    this._drawImprovements(ctx, city, cityIndex, mapData, cdSprites);
    this._drawInfoPanel(ctx, city, mapData, cdSprites, mapSprites);
    this._drawButtons(ctx, cdSprites);

    ctx.restore();
    return this._registerButtons();
  },

  // ── Click handler ──
  handleClick(x, y, clickRegions) {
    for (const r of clickRegions) {
      if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) {
        if (r.action === 'info') {
          this.infoPanelMode = ((this.infoPanelMode || 0) + 1) % 3;
        }
        return { action: r.action };
      }
    }
    return null;
  },
};
