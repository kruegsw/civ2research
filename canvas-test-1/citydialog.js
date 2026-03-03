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

  // ── Production cost tables (RULES.TXT cost × 10 = shields needed) ──
  UNIT_COSTS: [1,1,2,3,4,3,4,5,3,4,6,2,3,5,8,12,10,5,6,8,16,2,3,2,3,3,3,4,5,2,3,5,4,6,4,5,12,3,4,3,6,8,3,5,10,16,6,10,12,16,6,4,4,6,8,4,5,12,16,16,16,5,5].map(c => c * 10),
  IMPROVE_COSTS: [0,0,4,6,4,8,8,12,8,12,12,16,6,10,20,32,20,12,16,24,16,22,12,8,16,16,0,0,0,0,0,32,16,8,4,32,32,32,60].map(c => c * 10),
  WONDER_COSTS: [20,20,20,20,30,30,30,30,30,20,40,20,30,40,40,40,40,40,30,40,30,20,15,60,15,60,60,60].map(c => c * 10),

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
      { x: 5, y: 79, w: 194, h: 137 },   // Resource Map
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
    ctx.fillStyle = color || C.headerCyan;
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
    this._label(ctx, 'Resource Map', L.resourceMap.x, L.resourceMap.y, C.headerCyan, C.resourceMapShadow);
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

    // Row 3: TAX + LUX + SCI
    const tlsR = RES.taxLuxSci;
    const taxCount = city.taxOutput || 0;
    const sciCount = city.scienceOutput || 0;
    const tlsTotal = taxCount + luxOutput + sciCount;
    const tlsSpacing = this._resourceSpacing(tlsTotal);
    ctx.textAlign = 'left';
    this._text(ctx, `${taxRate}% Tax: ${taxCount}`, tlsR.textX, tlsR.textY, 'rgb(239,159,7)', 'bold 13px Arial, sans-serif');
    ctx.textAlign = 'center';
    this._text(ctx, `${luxRate}% Lux: ${luxOutput}`, tlsR.centerX, tlsR.textY, 'rgb(255,255,255)');
    ctx.textAlign = 'right';
    this._text(ctx, `${sciRate}% Sci: ${sciCount}`, tlsR.rightX, tlsR.textY, 'rgb(63,187,199)');
    ctx.textAlign = 'left';
    for (let i = 0; i < taxCount; i++)
      ctx.drawImage(cdSprites.tax, tlsR.iconX + i * tlsSpacing, tlsR.iconY, 14, 14);
    for (let i = 0; i < luxOutput; i++)
      ctx.drawImage(cdSprites.luxury, tlsR.luxIconX + i * tlsSpacing, tlsR.iconY, 14, 14);
    if (sciCount > 0) {
      const sciStartX = tlsR.rightX - (tlsSpacing * sciCount + 14 - tlsSpacing);
      for (let i = 0; i < sciCount; i++)
        ctx.drawImage(cdSprites.science, sciStartX + i * tlsSpacing, tlsR.iconY, 14, 14);
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

  _drawFoodStorage(ctx, city, cdSprites) {
    if (!(cdSprites && cdSprites.food)) return;
    const R = this.REGIONS.foodStorage;
    const hasGranary = !!(city.buildings & (1 << 3));
    const foodStored = city.foodInBox || 0;
    const wheatW = 14, wheatH = 14;
    const wheatSpacing = this._wheatSpacing(city.size);

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

    // Granary line
    if (hasGranary) {
      const granLineWidth = lineWidth - 10;
      const granStartX = iconStartX + 2;
      ctx.strokeStyle = 'rgb(75,155,35)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(granStartX, R.granaryY); ctx.lineTo(granStartX + granLineWidth, R.granaryY); ctx.stroke();
    }
  },

  _drawProduction(ctx, city, cdSprites, mapSprites, ownerColor) {
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

    // Shield grid with colored border rectangle
    if (cdSprites && cdSprites.shields) {
      const SG = R.shieldGrid;
      const cost = this._getProductionCost(item);
      const stored = city.shieldsInBox || 0;
      const numCols = SG.cols;
      const numRows = cost > 0 ? Math.ceil(cost / numCols) : 0;

      if (cost > 0) {
        const boxHeight = 4 + numRows * 14;
        ctx.strokeStyle = 'rgb(83,103,191)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY); ctx.lineTo(SG.borderRight, SG.borderY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY); ctx.lineTo(SG.borderX, SG.borderY + boxHeight); ctx.stroke();
        ctx.strokeStyle = 'rgb(0,0,95)';
        ctx.beginPath(); ctx.moveTo(SG.borderX, SG.borderY + boxHeight); ctx.lineTo(SG.borderRight, SG.borderY + boxHeight); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(SG.borderRight, SG.borderY); ctx.lineTo(SG.borderRight, SG.borderY + boxHeight); ctx.stroke();

        // Shield icons: adaptive horizontal spacing, 14px vertical
        const dx = numCols > 1 ? (SG.borderRight - SG.borderX - 14 - 4) / (numCols - 1) : 0;
        const dy = 14;
        let count = 0;
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const sx = SG.x + Math.round(2 + col * dx);
            const sy = SG.y + dy * row;
            ctx.drawImage(cdSprites.shields, sx, sy, 14, 14);
            count++;
            if (count >= stored) break;
          }
          if (count >= stored) break;
        }
      }
    }
  },

  _drawUnitsSupported(ctx, supported, mapSprites) {
    const R = this.REGIONS.unitsSupported;

    if (supported.length < 5) {
      this._label(ctx, 'Units Supported', R.x + R.w / 2, R.y + 12);
    }

    if (!(mapSprites && mapSprites.unitTemplates && supported.length > 0)) return;

    for (let i = 0; i < Math.min(8, supported.length); i++) {
      const u = supported[i];
      const template = mapSprites.unitTemplates[u.type];
      if (!template) continue;
      const cacheKey = `${u.type}-${u.owner}`;
      let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
      if (!colored) {
        colored = Civ2Renderer._recolorUnit(template, Civ2Renderer.CIV_COLORS[u.owner] || '#ccc');
      }
      const ux = R.x + 8 + (40 + 3) * (i % 4);
      const uy = supported.length <= 4 ? R.y + 24 : R.y + 8 + 32 * Math.floor(i / 4);
      ctx.drawImage(colored, ux, uy, 40, 30);
    }
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
  },

  _drawUnitsPresent(ctx, city, mapData, cdSprites, mapSprites) {
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
        // Home city abbreviation below first 10 units
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
    // Supplies
    const suppliedNames = [];
    if (city.tradeCommoditiesSupplied) {
      for (const cIdx of city.tradeCommoditiesSupplied) {
        if (cIdx !== undefined && cIdx < 16) suppliedNames.push(this.COMMODITY_NAMES[cIdx]);
      }
    }
    this._text(ctx, `Supplies: ${suppliedNames.join(', ') || 'None'}`, R.tradeX, R.suppliesY, 'rgb(227,83,15)', null, C.headerShadow);
    // Demands
    const demandedNames = [];
    if (city.tradeCommoditiesDemanded) {
      for (const cIdx of city.tradeCommoditiesDemanded) {
        if (cIdx !== undefined && cIdx < 16) demandedNames.push(this.COMMODITY_NAMES[cIdx]);
      }
    }
    this._text(ctx, `Demands: ${demandedNames.join(', ') || 'None'}`, R.tradeX, R.demandsY, 'rgb(227,83,15)', null, C.headerShadow);
    // Trade routes
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

  _registerButtons() {
    const B = this.REGIONS.buttons;
    return Object.entries(B).map(([action, r]) => ({ x: r.x, y: r.y, w: r.w, h: r.h, action }));
  },

  // ═══════════════════════════════════════════════════════════════════
  // MAIN RENDER — orchestrator that calls each draw method in order
  // ═══════════════════════════════════════════════════════════════════

  render(canvas, city, cityIndex, mapData, cdSprites, mapSprites) {
    const R = this.REGIONS;
    canvas.width = R.canvas.w;
    canvas.height = R.canvas.h;
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    // Computed data shared across draw methods
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
    this._drawFoodStorage(ctx, city, cdSprites);
    this._drawProduction(ctx, city, cdSprites, mapSprites, ownerColor);
    this._drawUnitsSupported(ctx, supported, mapSprites);
    this._drawImprovements(ctx, city, cityIndex, mapData, cdSprites);
    this._drawUnitsPresent(ctx, city, mapData, cdSprites, mapSprites);
    return this._registerButtons();
  },

  // ── Click handler ──
  handleClick(x, y, clickRegions) {
    for (const r of clickRegions) {
      if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h)
        return { action: r.action };
    }
    return null;
  },
};
