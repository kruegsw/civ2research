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
      const wpCanvas = document.createElement('canvas');
      wpCanvas.width = 636;
      wpCanvas.height = 421;
      const wpCtx = wpCanvas.getContext('2d');
      wpCtx.drawImage(cityGifCtx.canvas, 0, 0, 636, 421, 0, 0, 636, 421);
      cdSprites.wallpaper = wpCanvas;
    }

    return cdSprites;
  },

  // ── Text drawing with 1px drop shadow (GDI pipeline: DrawTextA at +1,+1 offset) ──
  _text(ctx, text, x, y, color, font, shadowColor) {
    if (font) ctx.font = font;
    ctx.fillStyle = shadowColor || '#000';
    ctx.fillText(text, x + 1, y + 1);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  },

  // ── Draw a filled diamond (isometric tile) for the mini-map ──
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

  // ── Get worked tile set from worker bitmaps ──
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

  // ── Citizen face spacing (28-value table from Civ2-clone) ──
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

  // ── Food storage wheat spacing (15-value table) ──
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

  // ── Resource icon spacing (12-value table) ──
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

  // ── Main canvas render ──
  render(canvas, city, cityIndex, mapData, cdSprites, mapSprites) {
    canvas.width = 636;
    canvas.height = 421;
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });
    const clickRegions = [];

    // ── Background: CITY.GIF wallpaper or solid fallback ──
    if (cdSprites && cdSprites.wallpaper) {
      ctx.drawImage(cdSprites.wallpaper, 0, 0);
    } else {
      ctx.fillStyle = '#1c1c3c';
      ctx.fillRect(0, 0, 636, 421);
    }

    // ── Common data ──
    const civNames = mapData.civNames || {};
    const civData = mapData.civData && mapData.civData[city.owner];
    const ownerName = civNames[city.owner] || `Civ ${city.owner}`;
    const govName = civData ? (this.GOVERNMENT_NAMES[civData.government] || '') : '';
    const epoch = mapData.civTechs ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner]) : 0;
    const ownerColor = Civ2Renderer.CIV_COLORS[city.owner] || '#fff';
    const specs = this.getSpecialists(city);
    const totalSpecs = specs.entertainer + specs.taxman + specs.scientist;
    const supported = this.getSupportedUnits(cityIndex, mapData);

    // ── Exact Civ2 colors (from Civ2-clone Draw.CityPanel.cs + BMP pixel analysis) ──
    const COL = {
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
    };

    // ── Helper: 3D gold panel border (BMP-verified) ──
    const _goldBorder = (x, y, w, h) => {
      // Outer bright edge (top + left)
      ctx.strokeStyle = COL.goldBright;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      // Inner medium face
      ctx.strokeStyle = COL.goldMedium;
      ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
      // Dark shadow (bottom + right) — overdraw bottom/right edges
      ctx.strokeStyle = COL.goldDark;
      ctx.beginPath();
      ctx.moveTo(x + w - 0.5, y + 0.5);
      ctx.lineTo(x + w - 0.5, y + h - 0.5);
      ctx.lineTo(x + 0.5, y + h - 0.5);
      ctx.stroke();
      ctx.strokeStyle = COL.goldShadow;
      ctx.beginPath();
      ctx.moveTo(x + w - 1.5, y + 1.5);
      ctx.lineTo(x + w - 1.5, y + h - 1.5);
      ctx.lineTo(x + 1.5, y + h - 1.5);
      ctx.stroke();
    };

    // ── Panel background fills (BMP-verified: drawn before all content) ──
    // Units Present: lighter gray background (BMP verified rgb(159,159,159))
    ctx.fillStyle = 'rgb(159,159,159)';
    ctx.fillRect(200, 221, 233, 189);
    // Food Storage: green fill in right column (BMP: x=663..955, y=36..279)
    ctx.fillStyle = COL.foodStorageBg;
    ctx.fillRect(434, 22, 192, 152);
    // Production: blue gradient in right column (BMP: x=663..955, y=283..569)
    const prodGrad = ctx.createLinearGradient(434, 176, 434, 355);
    prodGrad.addColorStop(0, COL.prodDark);
    prodGrad.addColorStop(1, COL.prodLight);
    ctx.fillStyle = prodGrad;
    ctx.fillRect(434, 176, 192, 179);
    // Dark separator line below title bar (BMP: y=34..35, x=12..960)
    ctx.fillStyle = COL.separator;
    ctx.fillRect(8, 21, 620, 2);
    // Gold panel border around Resource Map (BMP: x=12..305, y=127..344)
    _goldBorder(8, 79, 192, 136);
    // Gold panel border around City Improvements (BMP: x=12..290, y=466..657)
    _goldBorder(8, 291, 183, 120);
    // Gold panel border around Workers/Garrison (BMP: x=12..305, y=345..464)
    _goldBorder(8, 215, 192, 75);

    // ── Section labels (centered, gold with dark shadow) ──
    // From CityWindow.cs: Draw.Text centered at (x, y) with shadow (67,67,67) offset (1,1)
    const _label = (text, cx, cy, color, shadow) => {
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = shadow || COL.headerShadow;
      ctx.fillText(text, cx + 1, cy + 1);
      ctx.fillStyle = color || COL.headerCyan;
      ctx.fillText(text, cx, cy);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    };
    _label('Citizens', 101, 26);
    _label('City Resources', 319, 72);
    _label('Food Storage', 531, 28, 'rgb(75,155,35)');
    _label('City Improvements', 99, 273);
    _label('Resource Map', 101, 213, COL.headerCyan, COL.resourceMapShadow);

    // ═══════════════════════════════════════════════════════════
    // CITIZENS PANEL (faces at y=9, spacing table)
    // ═══════════════════════════════════════════════════════════

    // Citizen faces with 28-value spacing table
    // From Draw.CityPanel.cs CityCitizens: dest.X + 5, dest.Y + 9, shadow at +1,+1
    if (cdSprites && cdSprites.citizens) {
      const eraRow = Math.min(epoch, 3);
      const happy = city.happyCitizens || 0;
      const unhappy = city.unhappyCitizens || 0;
      const content = Math.max(0, city.size - happy - unhappy - totalSpecs);
      const faceSpace = this._citizenSpacing(city.size);
      const faceY = 31;
      let fx = 10;

      // People types: 0/1=happy, 2/3=content, 4/5=unhappy, 6/7=entertainer?, 8=entertainer, 9=taxman, 10=scientist
      // Odd indices alternate appearance (men/women)
      const drawFace = (drawIdx, x) => {
        // Shadow at (+1,+1)
        const shadow = cdSprites.citizens[eraRow] && cdSprites.citizens[eraRow][drawIdx];
        // For shadow we'd need a shadow sprite; just draw the face
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
    }

    // ═══════════════════════════════════════════════════════════
    // RESOURCE MAP — from CityWindow.cs CityResourcesMap
    // Renders actual terrain tile sprites at reduced scale
    // offsetX=5, offsetY=84, tileW=24 gridding, sprite drawn at ~48x24
    // ═══════════════════════════════════════════════════════════

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

    // Use terrain sprites if available, otherwise fall back to colored diamonds
    const hasTerrain = mapSprites && mapSprites.terrain;
    // Tile grid scaled to fill gold border content area (12,83,184,128)
    // Gold border: (8, 79, 192, 136), content inset ~4px each side
    const gridW = 26, gridH = 14;
    const sprW = 52, sprH = 28;
    const mapOffX = 26, mapOffY = 105;
    // Clip to content area so tiles don't overflow the gold border
    ctx.save();
    ctx.beginPath();
    ctx.rect(12, 83, 184, 128);
    ctx.clip();

    for (let i = 0; i < radiusTiles.length; i++) {
      const rt = radiusTiles[i];
      const tileGx = city.gx + rt.dx;
      const tileGy = city.gy + rt.dy;
      const wgx = mapData.wrap ? mapData.wrap(tileGx) : tileGx;
      const inBounds = tileGy >= 0 && tileGy < mapData.mh && wgx >= 0 && wgx < mapData.mw;

      // Screen position: convert game grid offsets to pixel position
      // Account for staggered grid parity
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
    ctx.restore();  // end resource map clip

    // ═══════════════════════════════════════════════════════════
    // CITY RESOURCES — 4 rows (BMP-verified positions)
    // Food bar y=92..107, Trade y=117..130, Tax y=131..145, Support y=191..206
    // ═══════════════════════════════════════════════════════════

    if (cdSprites) {
      const corruption = Math.max(0, city.totalTrade - city.scienceOutput - city.taxOutput);
      const luxOutput = Math.max(0, city.totalTrade - city.taxOutput - city.scienceOutput - corruption);
      // Support = shield upkeep from supported units, Production = net shields
      const support = supported.length;  // approximate: 1 shield per unit under most govs
      const production = city.shieldProduction || 0;
      // Tax/Lux/Sci rates from civ data (0-10, ×10 = percentage)
      const sciRate = civData ? (civData.scienceRate || 0) * 10 : 0;
      const taxRate = civData ? (civData.taxRate || 0) * 10 : 0;
      const luxRate = 100 - sciRate - taxRate;

      // Row 1: FOOD — green bar y=92..107 (BMP y=148..171)
      const foodTotal = city.foodProduction || 0;
      const foodSurplus = foodTotal - (city.size * 2);
      // Green background bar
      ctx.fillStyle = 'rgb(71,147,31)';
      ctx.fillRect(200, 92, 233, 15);
      ctx.font = 'bold 13px Arial, sans-serif';
      // Text above bar
      ctx.textAlign = 'left';
      this._text(ctx, `Food: ${foodTotal}`, 203, 88, 'rgb(87,171,39)', 'bold 13px Arial, sans-serif');
      ctx.textAlign = 'right';
      this._text(ctx, `Surplus: ${foodSurplus}`, 431, 88, 'rgb(63,139,31)');
      ctx.textAlign = 'left';
      // Food icons inside green bar
      const foodIconCount = foodTotal + Math.abs(foodSurplus);
      const foodSpacing = this._resourceSpacing(foodIconCount);
      for (let i = 0; i < foodTotal; i++)
        ctx.drawImage(cdSprites.food, 206 + i * foodSpacing, 93, 14, 14);
      if (foodSurplus < 0) {
        const hungerCount = Math.abs(foodSurplus);
        const hungerStartX = 431 - (foodSpacing * hungerCount + 14 - foodSpacing);
        for (let i = 0; i < hungerCount; i++)
          ctx.drawImage(cdSprites.hunger, hungerStartX + i * foodSpacing, 93, 14, 14);
      } else if (foodSurplus > 0) {
        const surpStartX = 431 - (foodSpacing * foodSurplus + 14 - foodSpacing);
        for (let i = 0; i < foodSurplus; i++)
          ctx.drawImage(cdSprites.food, surpStartX + i * foodSpacing, 93, 14, 14);
      }

      // Row 2: TRADE — y=117..130 (BMP y=187..209)
      const tradeTotal = city.totalTrade || 0;
      ctx.textAlign = 'left';
      this._text(ctx, `Trade: ${tradeTotal}`, 203, 114, 'rgb(239,159,7)', 'bold 13px Arial, sans-serif');
      ctx.textAlign = 'right';
      this._text(ctx, `Corruption: ${corruption}`, 431, 114, 'rgb(227,83,15)');
      ctx.textAlign = 'left';
      const tradeIconCount = tradeTotal + corruption;
      const tradeSpacing = this._resourceSpacing(tradeIconCount);
      for (let i = 0; i < tradeTotal; i++)
        ctx.drawImage(cdSprites.trade, 206 + i * tradeSpacing, 118, 14, 14);
      if (corruption > 0) {
        const corrStartX = 431 - (tradeSpacing * corruption + 14 - tradeSpacing);
        for (let i = 0; i < corruption; i++)
          ctx.drawImage(cdSprites.corruption, corrStartX + i * tradeSpacing, 118, 14, 14);
      }

      // Row 3: TAX + LUX + SCI — bar y=131..145 (BMP y=210..233)
      const taxCount = city.taxOutput || 0;
      const sciCount = city.scienceOutput || 0;
      const tlsTotal = taxCount + luxOutput + sciCount;
      const tlsSpacing = this._resourceSpacing(tlsTotal);
      // Text above bar
      ctx.textAlign = 'left';
      this._text(ctx, `${taxRate}% Tax: ${taxCount}`, 204, 129, 'rgb(239,159,7)', 'bold 13px Arial, sans-serif');
      ctx.textAlign = 'center';
      this._text(ctx, `${luxRate}% Lux: ${luxOutput}`, 317, 129, 'rgb(255,255,255)');
      ctx.textAlign = 'right';
      this._text(ctx, `${sciRate}% Sci: ${sciCount}`, 431, 129, 'rgb(63,187,199)');
      ctx.textAlign = 'left';
      // Icons in bar area
      for (let i = 0; i < taxCount; i++)
        ctx.drawImage(cdSprites.tax, 206 + i * tlsSpacing, 132, 14, 14);
      for (let i = 0; i < luxOutput; i++)
        ctx.drawImage(cdSprites.luxury, 290 + i * tlsSpacing, 132, 14, 14);
      if (sciCount > 0) {
        const sciStartX = 431 - (tlsSpacing * sciCount + 14 - tlsSpacing);
        for (let i = 0; i < sciCount; i++)
          ctx.drawImage(cdSprites.science, sciStartX + i * tlsSpacing, 132, 14, 14);
      }

      // Row 4: SUPPORT + PRODUCTION — blue bar y=191..206 (BMP y=307..330)
      // Blue background bar
      ctx.fillStyle = 'rgb(63,79,167)';
      ctx.fillRect(200, 191, 233, 15);
      ctx.textAlign = 'left';
      this._text(ctx, `Support: ${support}`, 204, 188, 'rgb(63,79,167)', 'bold 13px Arial, sans-serif');
      ctx.textAlign = 'right';
      this._text(ctx, `Production: ${production}`, 431, 188, 'rgb(7,11,103)');
      ctx.textAlign = 'left';
      const spTotal = support + production;
      const spSpacing = this._resourceSpacing(spTotal);
      for (let i = 0; i < support; i++)
        ctx.drawImage(cdSprites.shields, 206 + i * spSpacing, 192, 14, 14);
      if (production > 0) {
        const prodStartX = 431 - (spSpacing * production + 14 - spSpacing);
        for (let i = 0; i < production; i++)
          ctx.drawImage(cdSprites.shields, prodStartX + i * spSpacing, 192, 14, 14);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // FOOD STORAGE — from Draw.CityPanel.cs CityFoodStorage
    // Panel at (437, 0, 195, 163). Centered border rect.
    // Size+1 columns, 10 rows, wheat spacing table.
    // Only draws stored food (no empty outlines). Granary at y=87.
    // ═══════════════════════════════════════════════════════════

    if (cdSprites && cdSprites.food) {
      const hasGranary = !!(city.buildings & (1 << 3));
      const foodStored = city.foodInBox || 0;
      const wheatW = 14, wheatH = 14;
      const wheatSpacing = this._wheatSpacing(city.size);

      // Centered border rectangle (BMP: dark green top/left, bright green bottom/right)
      const lineWidth = city.size * wheatSpacing + wheatW + 7;
      const panelCenterX = 434 + 192 / 2;  // center of food storage panel
      const startingX = Math.round(panelCenterX - lineWidth / 2);
      const startingY = 36;  // below Food Storage header
      const lineHeight = 130;

      // Border: top/left = dark green, bottom/right = bright green (3D bevel)
      ctx.strokeStyle = 'rgb(0,51,0)';
      ctx.lineWidth = 1;
      // Top horizontal
      ctx.beginPath(); ctx.moveTo(startingX, startingY); ctx.lineTo(startingX + lineWidth, startingY); ctx.stroke();
      // Left vertical
      ctx.beginPath(); ctx.moveTo(startingX, startingY); ctx.lineTo(startingX, startingY + lineHeight); ctx.stroke();
      ctx.strokeStyle = 'rgb(75,155,35)';
      // Bottom horizontal
      ctx.beginPath(); ctx.moveTo(startingX, startingY + lineHeight); ctx.lineTo(startingX + lineWidth, startingY + lineHeight); ctx.stroke();
      // Right vertical
      ctx.beginPath(); ctx.moveTo(startingX + lineWidth, startingY); ctx.lineTo(startingX + lineWidth, startingY + lineHeight); ctx.stroke();

      // Draw wheat icons — only stored food, Size+1 columns per row
      // BMP: 9px tall icons, 10px row spacing → scaled ~6px tall, ~7px spacing
      let count = 0;
      const iconStartX = startingX + 3;
      const wheatDrawH = 7;     // scaled from 9px BMP
      const wheatRowStep = 8;   // scaled from 10px BMP (with 1px gap)
      for (let row = 0; row < 16; row++) {
        for (let col = 0; col <= city.size; col++) {
          ctx.drawImage(cdSprites.food, iconStartX + wheatSpacing * col, startingY + 3 + wheatRowStep * row, wheatW, wheatDrawH);
          count++;
          if (count >= foodStored) break;
        }
        if (count >= foodStored) break;
      }

      // Granary line at halfway point
      if (hasGranary) {
        const granLineWidth = lineWidth - 10;
        const granStartX = iconStartX + 2;
        const granY = startingY + Math.round(lineHeight / 2);
        ctx.strokeStyle = 'rgb(75,155,35)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(granStartX, granY); ctx.lineTo(granStartX + granLineWidth, granY); ctx.stroke();
      }
    }

    // ═══════════════════════════════════════════════════════════
    // PRODUCTION — from Draw.CityPanel.cs CityProduction
    // Panel at (437, 165, 195, 191).
    // Unit sprite at (72, 3) relative to panel; building name at (97, 8), icon at (79, 18)
    // Shield grid: border at y=207, x=442 to x=624
    // max(cost,10) cols, min(cost,10) rows, spacing = (182-14-4)/(max(cost,10)-1)
    // ═══════════════════════════════════════════════════════════

    const item = city.itemInProduction;
    const prodName = this.getProductionName(item);
    const panelPX = 434, panelPY = 176;

    // Draw production item sprite
    if (item && cdSprites) {
      if (item.type === 'unit' && mapSprites && mapSprites.unitTemplates) {
        const template = mapSprites.unitTemplates[item.id];
        if (template) {
          const colored = Civ2Renderer._recolorUnit(template, ownerColor);
          ctx.drawImage(colored, panelPX + 72, panelPY + 3, 64, 48);
        }
      } else {
        // Building or wonder — name centered at (97,8) relative to panel, icon at (79,18)
        ctx.textAlign = 'center';
        this._text(ctx, prodName, panelPX + 97, panelPY + 15, 'rgb(63,79,167)', '13px Arial, sans-serif');
        ctx.textAlign = 'left';
        if (!item.type || item.type === 'building') {
          if (item.id >= 1 && item.id <= 38 && cdSprites.improvements[item.id]) {
            ctx.drawImage(cdSprites.improvements[item.id], panelPX + 79, panelPY + 18, 36, 20);
          }
        }
        if (item.type === 'wonder' || (item.id >= 39 && item.id <= 66)) {
          const wIdx = item.id - 39;
          if (cdSprites.wonders[wIdx]) {
            ctx.drawImage(cdSprites.wonders[wIdx], panelPX + 79, panelPY + 18, 36, 20);
          }
        }
      }
    }

    // Shield grid with colored border rectangle
    if (cdSprites && cdSprites.shields) {
      const cost = this._getProductionCost(item);
      const stored = city.shieldsInBox || 0;
      // Shield grid: 10 columns, ceil(cost/10) rows (BMP: 25px spacing, 21px row height)
      const numCols = 10;
      const numRows = cost > 0 ? Math.ceil(cost / 10) : 0;

      if (cost > 0) {
        // Border rectangle (BMP: x=675..926, y=349..413+ scaled)
        const boxTop = panelPY + 42;
        const boxLeft = panelPX + 8;
        const boxRight = panelPX + 172;
        const boxBottom = boxTop + 4 + numRows * 13;
        ctx.strokeStyle = 'rgb(83,103,191)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(boxLeft, boxTop); ctx.lineTo(boxRight, boxTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(boxLeft, boxTop); ctx.lineTo(boxLeft, boxBottom); ctx.stroke();
        ctx.strokeStyle = 'rgb(0,0,95)';
        ctx.beginPath(); ctx.moveTo(boxLeft, boxBottom); ctx.lineTo(boxRight, boxBottom); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(boxRight, boxTop); ctx.lineTo(boxRight, boxBottom); ctx.stroke();

        const dx = (164 - 14) / (numCols - 1);  // ~16.7px center-to-center
        const dy = 13;  // scaled from 21px BMP row height
        let count = 0;
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const sx = boxLeft + 2 + Math.round(col * dx);
            const sy = boxTop + 2 + dy * row;
            ctx.drawImage(cdSprites.shields, sx, sy, 14, 13);
            count++;
            if (count >= stored) break;
          }
          if (count >= stored) break;
        }
      }
    }

    // ═══════════════════════════════════════════════════════════
    // UNITS SUPPORTED — from CityWindow.cs
    // Panel at (3, 212). Up to 8 units, 4 per row.
    // Positions: (8 + (40+3)*col, 8 + 32*row) relative to panel
    // If <=4 units, single row at y=24 relative to panel
    // Label "Units Supported" centered at (189/2, 12) rel to panel, only if <5 units
    // ═══════════════════════════════════════════════════════════

    const supPanelX = 8, supPanelY = 215;

    if (supported.length < 5) {
      _label('Units Supported', supPanelX + 189 / 2, supPanelY + 12);
    }

    if (mapSprites && mapSprites.unitTemplates && supported.length > 0) {
      for (let i = 0; i < Math.min(8, supported.length); i++) {
        const u = supported[i];
        const template = mapSprites.unitTemplates[u.type];
        if (!template) continue;
        const cacheKey = `${u.type}-${u.owner}`;
        let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
        if (!colored) {
          colored = Civ2Renderer._recolorUnit(template, Civ2Renderer.CIV_COLORS[u.owner] || '#ccc');
        }
        let ux = supPanelX + 8 + (40 + 3) * (i % 4);
        let uy;
        if (supported.length <= 4) {
          uy = supPanelY + 24;
        } else {
          uy = supPanelY + 8 + 32 * Math.floor(i / 4);
        }
        // Draw at reduced scale (unit sprites are 64x48, scale down for this panel)
        ctx.drawImage(colored, ux, uy, 40, 30);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // CITY IMPROVEMENTS — from CityWindow.cs Surface_Paint
    // Text list: icon at (8, 307+12*i), name at (30, 305+12*i), 12px row height
    // 9 visible rows. Wonders don't have sell icon.
    // Improvements text is white, wonders are gold.
    // ═══════════════════════════════════════════════════════════

    const improvements = this.getCityImprovements(city, cityIndex, mapData);
    if (improvements.length > 0 && cdSprites) {
      ctx.font = '9px Arial, sans-serif';
      const impStartY = 284;  // below "City Improvements" header at y=273, inside gold border at y=291
      for (let i = 0; i < Math.min(9, improvements.length); i++) {
        const imp = improvements[i];
        // Small improvement icon
        let thumb = imp.isWonder ? cdSprites.wonders[imp.id - 39] : cdSprites.improvements[imp.id];
        if (thumb) {
          ctx.drawImage(thumb, 12, impStartY + 12 * i, 20, 11);
        }
        // Improvement/wonder name
        const nameColor = imp.isWonder ? COL.wonder : '#fff';
        this._text(ctx, imp.name, 34, impStartY + 12 * i + 9, nameColor);
        // Sell icon for non-wonder improvements
        if (!imp.isWonder && cdSprites.sellIcon) {
          ctx.drawImage(cdSprites.sellIcon, 160, impStartY + 1 + 12 * i, 12, 12);
        }
      }
    }

    // ═══════════════════════════════════════════════════════════
    // UNITS PRESENT / INFO PANEL — from CityWindow.cs
    // Panel at (193, 212). "Units Present" label centered at (242/2, 12) rel panel
    // Up to 18 units: first 10 at (1+48*(i%5), 3+39*floor(i/5))
    // If <=5, single row at y=22 rel panel
    // Trade text at bottom: Supplies at (203, 351), Demands at (203, 364)
    // ═══════════════════════════════════════════════════════════

    const unitPanelX = 200, unitPanelY = 221;
    const garrison = this.getGarrisonedUnits(city, mapData);

    if (garrison.length < 6) {
      _label('Units Present', unitPanelX + 242 / 2, unitPanelY + 12);
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
          ux = unitPanelX + 1 + 48 * i;
          uy = unitPanelY + 22;
        } else if (i < 10) {
          ux = unitPanelX + 1 + 48 * (i % 5);
          uy = unitPanelY + 3 + 39 * Math.floor(i / 5);
        } else {
          ux = unitPanelX + 25 + 48 * ((i - 10) % 4);
          uy = unitPanelY + 22 + 39 * Math.floor((i - 10) / 4);
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
    this._text(ctx, `Supplies: ${suppliedNames.join(', ') || 'None'}`, 203, 351, 'rgb(227,83,15)', null, COL.headerShadow);
    // Demands
    const demandedNames = [];
    if (city.tradeCommoditiesDemanded) {
      for (const cIdx of city.tradeCommoditiesDemanded) {
        if (cIdx !== undefined && cIdx < 16) demandedNames.push(this.COMMODITY_NAMES[cIdx]);
      }
    }
    this._text(ctx, `Demands: ${demandedNames.join(', ') || 'None'}`, 203, 364, 'rgb(227,83,15)', null, COL.headerShadow);
    // Trade routes
    if (city.tradeRouteCount > 0) {
      for (let i = 0; i < Math.min(3, city.tradeRouteCount); i++) {
        const partnerId = city.tradePartnerCityIds[i];
        if (partnerId === 0xFFFF) continue;
        const commodity = this.COMMODITY_NAMES[city.tradeCommoditiesInRoute[i]] || '?';
        const partner = this.findCityBySequenceId(mapData, partnerId);
        const partnerName = partner ? partner.name : `City #${partnerId}`;
        this._text(ctx, `${partnerName} ${commodity}: +1`, 203, 377 + i * 13, 'rgb(227,83,15)');
      }
    }

    // ═══════════════════════════════════════════════════════════
    // BUTTONS — from CityWindow.cs
    // Buy(442,181) 68x24, Change(557,181) 68x24
    // Info(459,364) 57x24, Map(517,364), Rename(575,364)
    // Happy(459,389), View(517,389), Exit(575,389)
    // ═══════════════════════════════════════════════════════════

    // Buttons are drawn by the wallpaper background, but we register click regions
    // Buy button
    clickRegions.push({ x: 442, y: 181, w: 68, h: 24, action: 'buy' });
    // Change button
    clickRegions.push({ x: 557, y: 181, w: 68, h: 24, action: 'change' });
    // Info button
    clickRegions.push({ x: 459, y: 364, w: 57, h: 24, action: 'info' });
    // Map button
    clickRegions.push({ x: 517, y: 364, w: 57, h: 24, action: 'map' });
    // Rename button
    clickRegions.push({ x: 575, y: 364, w: 57, h: 24, action: 'rename' });
    // Happy button
    clickRegions.push({ x: 459, y: 389, w: 57, h: 24, action: 'happy' });
    // View button
    clickRegions.push({ x: 517, y: 389, w: 57, h: 24, action: 'panorama' });
    // Exit button
    clickRegions.push({ x: 575, y: 389, w: 57, h: 24, action: 'exit' });

    return clickRegions;
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
