import { Civ2Renderer } from './renderer.js';
import {
  CIV_COLORS, COMMODITY_NAMES, WONDER_NAMES, IMPROVE_NAMES,
  UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS,
  SETTLER_TYPES, NON_COMBAT_TYPES, SUPPORT_EXEMPT_TYPES,
  SEA_COMBAT_TYPES, SEA_TRANSPORT_TYPES, FANATIC_TYPES,
  SETTLER_FOOD_COST, COSMIC_FREE_SUPPORT,
  GOVT_CORRUPTION_DIVISOR, GOVT_FACTOR, GOVT_WLTKD_BUMP,
  DIFFICULTY_KEYS,
} from '../engine/defs.js';
import { getGameYearFromMap } from '../engine/year.js';

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

  // Wonder obsolescence tech IDs for display (wonder index → tech ID that obsoletes it)
  // Different format from engine WONDER_OBSOLETE — only populated for wonders that CAN become obsolete
  WONDER_OBSOLETE_TECH: {
    0: 15,   // Pyramids → Communism
    1: 65,   // Hanging Gardens → Railroad
    2: 22,   // Colossus → Electricity
    3: 48,   // Lighthouse → Magnetism
    4: 22,   // Great Library → Electricity
    5: 82,   // Oracle → Theology
    6: 53,   // Great Wall → Metallurgy
    8: 40,   // King Richard's Crusade → Industrialization
    9: 15,   // Marco Polo's Embassy → Communism
    14: 6,   // Leonardo's Workshop → Automobile
    16: 59,  // Isaac Newton's College → Nuclear Fission
  },

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
    borderW: 10, titleBarH: 24, bevelW: 2, separatorH: 0,
    contentW: 636, contentH: 421,
    get totalW() { return this.contentW + this.borderW * 2; },       // 656
    get totalH() { return this.contentH + this.borderW + this.titleBarH + this.bevelW; }, // 457
    get contentX() { return this.borderW; },                          // 10
    get contentY() { return this.titleBarH + this.bevelW; },          // 26 (bevel + title bar above content)
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
    resourceMap: { x: 5, y: 76, sprW: 48, sprH: 24 },

    // ── Resource icon rows ──
    resources: {
      title:       { x: 199, y: 46,  w: 238, h: 15 },
      food:        { x: 203, y: 75,  w: 230, h: 13, textX: 203, textY: 72, iconX: 206, iconY: 76, rightX: 431 },
      trade:       { x: 206, y: 116, w: 224, h: 16, textX: 203, textY: 113, iconX: 206, iconY: 118, rightX: 431 },
      taxLuxSci:   { x: 206, y: 140, w: 224, h: 16, textX: 204, textY: 163, iconX: 206, iconY: 140, rightX: 431, luxIconX: 290, centerX: 317 },
      supportProd: { x: 199, y: 181, w: 238, h: 16, textX: 204, textY: 203, iconX: 206, iconY: 182, rightX: 431 },
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
      unitSprite:   { x: 508, y: 167, w: 52, h: 39 },    // centered in Buy-Change gap (510..557), top-aligned
      buildingIcon: { x: 516, y: 183, w: 36, h: 20 },    // panel + (79, 18)
      buildingName: { x: 534, y: 180 },                    // panel + (97, 15), center-aligned
      iconCenter:   { x: 534.5, y: 183 },                  // panel + (97.5, 18)
      shieldGrid: {
        // Binary: FUN_0050503e — outer rect at panel + (6, 40), 183×146
        gridX: 443, gridY: 205, gridW: 183, gridH: 146,
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
      happy:    { x: 459, y: 388, w: 57, h: 24 },
      panorama: { x: 517, y: 388, w: 57, h: 24 },
      exit:     { x: 575, y: 388, w: 57, h: 24 },
      prevCity: { x: 436, y: 388, w: 21, h: 24 },
      nextCity: { x: 436, y: 364, w: 21, h: 24 },
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
    titleFg:      'rgb(180,180,180)',
    titleShadow1: 'rgb(0,0,0)',
    titleShadow2: 'rgb(67,67,67)',
  },

  // ── Data lookup helpers ──

  getProductionName(item) {
    if (!item) return '?';
    if (item.type === 'unit') return Civ2Renderer.UNIT_NAMES[item.id] || `Unit #${item.id}`;
    if (item.id >= 1 && item.id <= 38) return IMPROVE_NAMES[item.id] || `Improvement #${item.id}`;
    if (item.id >= 39 && item.id <= 66) return WONDER_NAMES[item.id - 39] || `Wonder #${item.id}`;
    return `Item #${item.id}`;
  },

  getCityImprovements(city, cityIndex, mapData) {
    const result = [];
    if (city.buildings) {
      for (const id of [...city.buildings].sort((a, b) => a - b)) {
        if (id === 36) continue;  // Capitalization is a production option, not a building
        const name = IMPROVE_NAMES[id] || `#${id}`;
        result.push({ id, name, isWonder: false });
      }
    }
    const wonders = mapData.gameState && mapData.gameState.wonders;
    if (wonders) {
      for (let w = 0; w < 28; w++) {
        if (wonders[w].cityIndex === cityIndex)
          result.push({ id: w + 39, name: WONDER_NAMES[w] || `Wonder #${w}`, isWonder: true });
      }
    }
    return result;
  },

  getSpecialists(city) {
    const specs = { entertainer: 0, taxman: 0, scientist: 0 };
    if (!city.specialists) return specs;
    for (const s of city.specialists) {
      if (specs[s] != null) specs[s]++;
    }
    return specs;
  },

  // Full trade distribution (FUN_004ea1f6) — returns {lux, tax, sci}.
  // netTrade must be computed fresh (grossTileTrade - corruption), NOT from city.totalTrade (stale).
  _computeTradeDistribution(netTrade, city, cityIndex, civData, mapData) {
    let sciRate = civData ? (civData.scienceRate || 0) : 0;   // 0-10 tenths
    const taxRate = civData ? (civData.taxRate || 0) : 0;     // 0-10 tenths
    const govt = this._getCityGovernment(city, mapData);

    // Fundamentalism caps science rate at 5 (binary lines 1528-1530)
    if (govt === 'fundamentalism' && sciRate > 5) sciRate = 5;

    const luxRate = 10 - sciRate - taxRate;

    // Base distribution (tenths, with rounding)
    let lux = netTrade > 0 && luxRate > 0
      ? Math.min(netTrade, Math.floor((netTrade * luxRate + 4) / 10)) : 0;
    let sci = netTrade > 0 && sciRate > 0
      ? Math.min(netTrade - lux, Math.floor((netTrade * sciRate + 4) / 10)) : 0;
    let tax = netTrade - (sci + lux);

    // AI Fundamentalism redirects all luxury to science (binary lines 1537-1541)
    if (govt === 'fundamentalism' && mapData && mapData.playerCiv !== undefined && city.owner !== mapData.playerCiv) {
      sci += lux;
      lux = 0;
    }

    // Specialist bonuses (before building multipliers)
    const specs = this.getSpecialists(city);
    lux += specs.entertainer * 2;
    tax += specs.taxman * 3;
    sci += specs.scientist * 3;

    // Luxury AND gold multiplier: Marketplace(5)/Bank(10)/Stock Exchange(22) each +50%
    const has = city.buildings ? id => city.buildings.has(id) : () => false;
    let lgMult = 0;
    if (has(5)) lgMult++;    // Marketplace
    if (has(10)) lgMult++;   // Bank
    if (has(22)) lgMult++;   // Stock Exchange
    lux += (lux * lgMult) >> 1;
    tax += (tax * lgMult) >> 1;

    // Science multiplier: Library(6)/University(12)/Research Lab(26) or SETI(wonder 18)
    let sciMult = 0;
    if (has(6)) sciMult++;    // Library
    if (has(12)) sciMult++;   // University
    if (has(26) || this._civHasWonder(mapData, city.owner, 18)) sciMult++; // Research Lab or SETI

    // Isaac Newton's College (wonder 16): doubles science building effect in wonder city
    let sciBonus = sci * sciMult;
    if (!this._cityHasWonder(cityIndex, 16, mapData)) sciBonus >>= 1; // Normal: +50%/bldg
    sci += sciBonus;

    // Copernicus' Observatory (wonder 11): doubles total science in wonder city
    if (this._cityHasWonder(cityIndex, 11, mapData)) sci <<= 1;

    return { lux, tax, sci };
  },

  findCityBySequenceId(mapData, seqId) {
    if (seqId === 0xFFFF) return null;
    for (const c of mapData.cities) {
      if (c.sequenceId === seqId) return c;
    }
    return null;
  },

  getGarrisonedUnits(city, mapData) {
    // Binary: citywin_draw_units_present (0x005070E5) iterates via the nextInStack
    // linked list. We previously tried to mirror that here, but units created at
    // runtime via makeUnit() (combat, production, hut spawns) have no saveIndex
    // and prevInStack/nextInStack = -1 — so the linked-list walk's visited set
    // ended up keyed on `undefined`, causing all-but-one new unit at a tile to
    // be skipped (visible as units overlapping at slot 0).
    //
    // Just filter directly. We exclude dead units (gx < 0).
    return mapData.units.filter(u => u.gx === city.gx && u.gy === city.gy && u.gx >= 0);
  },

  getSupportedUnits(cityIndex, mapData) {
    // Skip dead units (gx < 0). When a unit dies, killUnit() in helpers.js
    // sets gx/gy to -1 but leaves homeCityId pointing to its old home.
    return mapData.units.filter(u => u.homeCityId === cityIndex && u.gx >= 0);
  },

  _getProductionCost(item) {
    if (!item) return 0;
    if (item.type === 'unit') return UNIT_COSTS[item.id] || 0;
    if (item.id >= 39 && item.id <= 66) return WONDER_COSTS[item.id - 39] || 0;
    if (item.id >= 1 && item.id <= 38) return IMPROVE_COSTS[item.id] || 0;
    return 0;
  },

  // ── Terrain colors for mini-map ──
  TERRAIN_COLORS: [
    '#dcb468', '#c8b432', '#00b400', '#006400', '#968c00',
    '#646464', '#b4b4b4', '#e0e0ff', '#647832', '#008c00', '#0046b4'
  ],

  // ── Standard Civ2 MGE terrain yields: [food, shields, trade] ──
  // Index = terrain ID (0=Desert .. 10=Ocean). Lines 11-21 are special resources.
  //                         food shd trd   irr_bonus  mine_bonus  road_trade
  TERRAIN_BASE: [
    /*  0 Desert    */ [0, 1, 0],
    /*  1 Plains    */ [1, 1, 0],
    /*  2 Grassland */ [2, 0, 0],
    /*  3 Forest    */ [1, 2, 0],
    /*  4 Hills     */ [1, 0, 0],
    /*  5 Mountains */ [0, 1, 0],
    /*  6 Tundra    */ [1, 0, 0],
    /*  7 Glacier   */ [0, 0, 0],
    /*  8 Swamp     */ [1, 0, 0],
    /*  9 Jungle    */ [1, 0, 0],
    /* 10 Ocean     */ [1, 0, 2],
  ],
  // Special resource total yields (replaces base, not added to it)
  SPECIAL_TOTAL: [
    [[3, 1, 0], [0, 4, 0]],   // 0 Desert: Oasis(3/1/0), Oil(0/4/0)
    [[1, 3, 0], [3, 1, 0]],   // 1 Plains: Buffalo(1/3/0), Wheat(3/1/0)
    [null,      [2, 1, 0]],   // 2 Grassland: shield handled separately, Resources
    [[3, 2, 0], [1, 2, 3]],   // 3 Forest: Pheasant(3/2/0), Silk(1/2/3)
    [[1, 2, 0], [1, 0, 4]],   // 4 Hills: Coal(1/2/0), Wine(1/0/4)
    [[0, 1, 6], [0, 4, 0]],   // 5 Mountains: Gold(0/1/6), Iron(0/4/0)
    [[3, 1, 0], [2, 0, 3]],   // 6 Tundra: Game(3/1/0), Furs(2/0/3)
    [[1, 1, 4], [0, 4, 0]],   // 7 Glacier: Ivory(1/1/4), Oil(0/4/0)
    [[1, 4, 0], [3, 0, 4]],   // 8 Swamp: Peat(1/4/0), Spice(3/0/4)
    [[1, 0, 4], [4, 0, 1]],   // 9 Jungle: Gems(1/0/4), Fruit(4/0/1)
    [[3, 0, 2], [2, 2, 3]],   // 10 Ocean: Fish(3/0/2), Whales(2/2/3)
  ],
  IRRIGATION_BONUS: [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  MINING_BONUS:     [1, 0, 0, 0, 3, 1, 0, 1, 0, 0, 0],

  // Check if city has a building by ID (1-38)
  _cityHasBuilding(city, buildingId) {
    return city.buildings ? city.buildings.has(buildingId) : false;
  },

  // Check if a wonder is active and belongs to this city
  _cityHasWonder(cityIndex, wonderIndex, mapData) {
    const wonders = mapData.gameState && mapData.gameState.wonders;
    if (!wonders) return false;
    return wonders[wonderIndex].cityIndex === cityIndex;
  },

  // Get government type string for city's owner
  _getCityGovernment(city, mapData) {
    if (mapData.civs && mapData.civs[city.owner] != null) {
      return mapData.civs[city.owner].government;
    }
    return 'despotism';
  },

  // Game tile distance (FUN_005ae1b0): uses doubled X coordinates from save file format
  // Parser stores gx = savedX >> 1, so we convert back: X = 2*gx + (gy & 1)
  _tileDistance(gx1, gy1, gx2, gy2, mapWidth) {
    const x1 = 2 * gx1 + (gy1 & 1), x2 = 2 * gx2 + (gy2 & 1);
    let dx = Math.abs(x1 - x2);
    if (mapWidth && dx > mapWidth) dx = 2 * mapWidth - dx; // horizontal wrapping
    const dy = Math.abs(gy1 - gy2);
    return (dx + dy) >> 1;
  },

  // Capital distance (FUN_005ae31d + FUN_005ae296): used for waste calculation
  // Uses doubled cx/cy coordinates directly from city record
  _capitalDistance(cx1, cy1, cx2, cy2, mw2, mapShape) {
    // FUN_005ae10e: dx with horizontal wrapping
    let dx = Math.abs(cx1 - cx2);
    if (!(mapShape & 0x8000) && mw2 > 0 && dx > (mw2 >> 1)) dx = mw2 - dx;
    // dy: absolute difference
    const dy = Math.abs(cy1 - cy2);
    // FUN_005ae296: Civ2 isometric distance metric
    const adx = dx, ady = dy;
    const avg = (adx + ady) >> 1;
    if (ady < adx) return adx - ((avg - ady + 1) >> 1);
    return ady - ((avg - adx + 1) >> 1);
  },

  // Shield waste (FUN_004e9c14 lines 3782-3797 + FUN_004e989a)
  // city.shieldProduction stores gross shields (after factory, before waste)
  // Waste must be computed independently from distance to capital
  _calcShieldWaste(city, grossShields, support, mapData) {
    const govt = this._getCityGovernment(city, mapData);
    if (govt === 'fundamentalism' || govt === 'democracy' || city.owner === 0) return 0;
    if (city.hasPalace) return 0;
    const capital = mapData.cities.find(c => c.owner === city.owner && c.hasPalace);
    let distance = 32; // default when no capital
    if (capital) {
      const mw2 = mapData.mw2 || 0;
      const mapShape = mapData.mapShape || 0;
      distance = this._capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
    }
    const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
    const gf = GOVT_FACTOR[effGovt] || 4;
    const available = grossShields - support;
    if (available <= 0) return 0;
    // Binary FUN_004e989a: same formula as corruption.
    // Communism uses flat DAT_0064bcd8 (default 10), cap at 16 for others.
    const distVal = (govt === 'communism') ? 10 : Math.min(distance, 16);
    let waste = Math.trunc((distVal * available * 3) / (gf * 20));
    waste = Math.max(0, Math.min(waste, available));
    // Binary FUN_004e989a:3647-3648: Courthouse OR Palace halves waste
    if (this._cityHasBuilding(city, 7) || this._cityHasBuilding(city, 1)) waste >>= 1;
    // Cap: ensure at least 1 shield after support + waste
    const cap = grossShields - support - 1;
    if (waste > cap) waste = cap;
    if (waste < 0) waste = 0;
    return waste;
  },

  // Trade corruption (FUN_004e989a — same formula for both corruption and waste)
  _calcTradeCorruption(city, grossTrade, mapData) {
    const govt = this._getCityGovernment(city, mapData);
    if (govt === 'fundamentalism' || govt === 'democracy') return 0;
    if (city.hasPalace) return 0;
    if (grossTrade <= 0) return 0;
    const capital = mapData.cities.find(c => c.owner === city.owner && c.hasPalace);
    let distance = 32; // default when no capital (DAT_006a6588 = 0x20)
    if (capital) {
      const mw2 = mapData.mw2 || 0;
      const mapShape = mapData.mapShape || 0;
      distance = this._capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
    }
    const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
    const gf = GOVT_FACTOR[effGovt] || 4;
    // Binary FUN_004e989a:3635: communism uses flat DAT_0064bcd8 (default 10).
    // Other governments: cap distance at 16 (line 3620: min(distance, 0x10)).
    const distVal = (govt === 'communism') ? 10 : Math.min(distance, 16);
    let corruption = Math.trunc((distVal * grossTrade * 3) / (gf * 20));
    corruption = Math.max(0, Math.min(corruption, grossTrade));
    // Binary FUN_004e989a:3647-3648: Courthouse OR Palace halves corruption
    if (this._cityHasBuilding(city, 7) || this._cityHasBuilding(city, 1)) corruption >>= 1;
    return corruption;
  },

  // Check if a land/air unit is "abroad" (FUN_004e7eb1 lines 3009-3054)
  // NOT abroad if: at any friendly city, or in a fortress within distance 3 of a friendly city
  _isUnitAbroad(unit, city, mapData) {
    // At home city
    if (unit.gx === city.gx && unit.gy === city.gy) return false;
    // At any other friendly city
    const owner = city.owner;
    for (const c of mapData.cities) {
      if (c && c.owner === owner && unit.gx === c.gx && unit.gy === c.gy) return false;
    }
    // In a fortress near a friendly city (distance < 4)
    if (mapData.getImprovements) {
      const imp = mapData.getImprovements(unit.gx, unit.gy);
      if (imp.fortress && !imp.city) { // fortress but not city/airbase
        for (const c of mapData.cities) {
          if (c && c.owner === owner) {
            if (this._tileDistance(unit.gx, unit.gy, c.gx, c.gy, mapData.mw) < 4) return false;
          }
        }
      }
    }
    return true;
  },

  // Check if a civ owns a specific wonder (wonder still in their city)
  _civHasWonder(mapData, civIndex, wonderIndex) {
    const wonders = mapData.gameState && mapData.gameState.wonders;
    if (!wonders) return false;
    const w = wonders[wonderIndex];
    if (w.cityIndex == null || w.destroyed) return false;
    const city = mapData.cities[w.cityIndex];
    return city && city.owner === civIndex;
  },

  // Check if a wonder is active for a civ (owned AND not obsolete)
  // Obsolescence: if ANY civ has the obsoleting tech, the wonder is inactive (FUN_00453da0)
  _hasWonderEffect(mapData, civIndex, wonderIndex) {
    if (!this._civHasWonder(mapData, civIndex, wonderIndex)) return false;
    const obsTech = this.WONDER_OBSOLETE_TECH[wonderIndex];
    if (obsTech != null && mapData.civTechs) {
      for (let i = 0; i < mapData.civTechs.length; i++) {
        if (mapData.civTechs[i] && mapData.civTechs[i].has(obsTech)) return false;
      }
    }
    return true;
  },

  // Happiness calculation (FUN_004ea8e4 port)
  // Computes happy/unhappy citizens from first principles instead of using stale save file values.
  // Returns { happy, unhappy }
  _calcHappiness(city, cityIndex, mapData, civData, supported) {
    const gs = mapData.gameState;
    const govt = this._getCityGovernment(city, mapData);
    const pop = city.size;
    const ownerSlot = city.owner;
    const difficulty = gs ? gs.difficulty : 'chieftain';
    const humanPlayers = gs ? gs.humanPlayers : 0;
    const isHuman = !!((1 << ownerSlot) & humanPlayers);

    const civTechs = mapData.civTechs && mapData.civTechs[ownerSlot];
    const hasTech = (id) => civTechs ? civTechs.has(id) : false;

    const specs = this.getSpecialists(city);
    const totalSpecs = specs.entertainer + specs.taxman + specs.scientist;

    // COSMIC defaults from standard RULES.TXT
    const CONTENT_BASE = 7;     // DAT_0064bccf — content citizens base
    const UNHAPPY_OFFSET = 14;  // DAT_0064bcd0 — unhappy citizens offset

    // Mutable state matching binary globals: DAT_006a6550, DAT_006a65a8, DAT_006a659c
    const st = { happy: 0, unhappy: 0, surplus: 0 };

    // FUN_004ea031 — balance happy/unhappy ensuring total doesn't exceed pop - specialists
    const adjust = () => {
      const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
      st.happy = clamp(st.happy, 0, pop);
      // Transfer surplus → unhappy while unhappy < surplus
      while (st.surplus > 0 && st.unhappy < st.surplus) { st.surplus--; st.unhappy++; }
      st.unhappy = clamp(st.unhappy, 0, pop);
      // Ensure happy + unhappy <= pop - specialists
      const cap = clamp(pop - totalSpecs, 0, 99);
      while (st.unhappy + st.happy > cap) {
        if (st.surplus === 0) { st.happy--; st.happy = clamp(st.happy, 0, pop); }
        else { st.surplus--; }
        st.unhappy--;
        st.unhappy = clamp(st.unhappy, 0, pop);
      }
      // Re-add surplus as unhappy if room
      while (st.surplus > 0 && st.unhappy + st.happy < cap) { st.surplus--; st.unhappy++; }
    };

    // ── Step 1: Initial unhappy citizens ──
    if (!isHuman) {
      // AI: simpler formula (line 4077)
      st.unhappy = (pop - 1) - (CONTENT_BASE - 5);
    } else {
      // Human player: empire-size spread
      const diffIdx = DIFFICULTY_KEYS.indexOf(difficulty);
      let spread = UNHAPPY_OFFSET + diffIdx * -2;
      if (gs && gs.barbarianActivity === 'raging') spread += 2;  // raging hordes
      let divisor = Math.floor(((GOVT_CORRUPTION_DIVISOR[govt] || 1) + 1) * spread / 2);
      if (divisor < 2) divisor = 1;

      const contentBase = CONTENT_BASE - diffIdx;
      st.unhappy = (pop - 1) - (contentBase - 2);

      // Empire size penalty (Communism exempt) — line 4094-4098
      if (govt !== 'communism') {
        const cityCount = mapData.cities
          ? mapData.cities.filter(c => c.owner === ownerSlot && c.size > 0).length
          : 1;
        st.unhappy += Math.floor((cityCount - divisor + cityIndex % divisor) / divisor);
      }
    }

    // Clamp: if unhappy > population, track surplus (lines 4100-4103)
    st.surplus = 0;
    if (pop < st.unhappy) {
      st.surplus = st.unhappy - pop;
      st.unhappy = pop;
    }

    adjust(); // Phase 0

    // ── Step 2: Luxury effect (line 4106: happy = luxury_output >> 1) ──
    const grossTileTrade = this._calcGrossTileTrade(city, cityIndex, mapData);
    const corruption = this._calcTradeCorruption(city, grossTileTrade, mapData);
    const netTileTrade = Math.max(0, grossTileTrade - corruption);
    const dist = this._computeTradeDistribution(netTileTrade, city, cityIndex, civData, mapData);
    st.happy = dist.lux >> 1;

    adjust(); // Phase 1

    // ── Step 3: Colosseum (building 14) — line 4108 ──
    if (this._cityHasBuilding(city, 14)) {
      st.unhappy -= 3;
      if (hasTech(24)) st.unhappy -= 1;  // Electronics: extra -1
    }

    // ── Step 4: Cathedral (building 11) or Michelangelo's (wonder 10) — line 4116 ──
    // Prerequisite: Monotheism (tech 55)
    if (hasTech(55) &&
        (this._cityHasBuilding(city, 11) || this._hasWonderEffect(mapData, ownerSlot, 10))) {
      const effect = (hasTech(15) ? 0 : 1)    // Communism tech: -1
                   + (hasTech(82) ? 3 : 2);    // Theology: +1
      st.unhappy -= effect;  // Range 2-4
    }

    // ── Step 5: Temple (building 4) — line 4124 ──
    if (this._cityHasBuilding(city, 4)) {
      let templeEffect = 0;
      if (hasTech(56)) templeEffect++;  // Mysticism
      if (hasTech(9)) templeEffect++;   // Ceremonial Burial
      if (this._hasWonderEffect(mapData, ownerSlot, 5)) templeEffect <<= 1;  // Oracle doubles
      st.unhappy -= templeEffect;
    }

    // ── Step 5b: Courthouse/Palace + Democracy = +1 happy (line 4138) ──
    // Binary checks building 7 (Courthouse) OR building 1 (Palace), NOT City Walls
    if ((this._cityHasBuilding(city, 7) || this._cityHasBuilding(city, 1)) && govt === 'democracy') {
      st.happy += 1;
    }

    adjust(); // Phase 2

    // ── Step 6: Fundamentalism / Martial law / Military unhappiness ──
    if (govt === 'fundamentalism') {  // zero all unhappiness (line 4144)
      st.surplus = 0;
      st.unhappy = 0;
    } else if (govt === 'anarchy' || govt === 'despotism' || govt === 'monarchy' || govt === 'communism') {
      // Martial law (line 4148)
      let garrison = 0;
      for (const u of mapData.units) {
        if (u.gx === city.gx && u.gy === city.gy && u.owner === ownerSlot &&
            !NON_COMBAT_TYPES.has(u.type)) {
          garrison += (govt === 'communism') ? 2 : 1;  // Communism: each unit counts double
        }
      }
      const maxMartial = (govt === 'communism') ? 6 : 3;
      if (garrison > maxMartial) garrison = maxMartial;
      garrison = Math.max(0, Math.min(garrison, st.unhappy));  // clamp to [0, unhappy]
      st.unhappy -= garrison;
    } else {  // Republic / Democracy: military unhappiness (line 4168)
      let penalty;
      if (this._hasWonderEffect(mapData, ownerSlot, 21) ||  // Women's Suffrage
          this._cityHasBuilding(city, 33)) {                 // Police Station
        penalty = 0;
      } else {
        penalty = 1;
      }
      if (govt === 'democracy') penalty++;  // Democracy: +1 per unit abroad

      if (penalty !== 0) {
        let abroad = 0;
        for (const u of supported) {
          if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
          if (NON_COMBAT_TYPES.has(u.type)) continue;
          if (SEA_TRANSPORT_TYPES.has(u.type)) continue;
          if (SEA_COMBAT_TYPES.has(u.type)) { abroad++; continue; }
          if (this._isUnitAbroad(u, city, mapData)) abroad++;
        }
        if (abroad > 0 && govt === 'republic') abroad--;  // Republic: one free unit abroad
        st.unhappy += penalty * abroad;
      }
    }

    adjust(); // Phase 3

    // ── Step 7: Wonder effects ──
    // Hanging Gardens (wonder 1): +1 happy empire-wide, +3 in wonder city (line 4188)
    if (this._hasWonderEffect(mapData, ownerSlot, 1)) {
      st.happy += 1;
      if (this._cityHasWonder(cityIndex, 1, mapData)) st.happy += 2;
    }

    // Cure for Cancer (wonder 27): +1 happy empire-wide (line 4196)
    if (this._hasWonderEffect(mapData, ownerSlot, 27)) {
      st.happy += 1;
    }

    // Shakespeare's Theatre (wonder 13): all unhappy -> content in wonder city (line 4200)
    if (this._cityHasWonder(cityIndex, 13, mapData)) {
      st.unhappy = 0;
    }

    // J.S. Bach's Cathedral (wonder 15): -2 unhappy empire-wide (line 4204)
    if (this._hasWonderEffect(mapData, ownerSlot, 15)) {
      st.unhappy -= 2;
    }

    adjust(); // Phase 4

    return { happy: st.happy, unhappy: st.unhappy };
  },

  // Calculate support overlays per unit (from FUN_004e7eb1 + FUN_00505666)
  // Returns array of { food, shield, unhappy, unhappyType } per supported unit
  _calcUnitSupportOverlays(supported, city, government, mapData) {
    const overlays = [];
    let unitCounter = 0;
    let abroadCounter = 0;

    for (const unit of supported) {
      const ov = { food: 0, shield: false, unhappy: 0, unhappyType: 0 };

      // Diplomats/traders (role >= 6) are exempt from support — no overlays
      if (SUPPORT_EXEMPT_TYPES.has(unit.type)) {
        overlays.push(ov);
        continue;
      }

      // Settler food cost (role 5)
      if (SETTLER_TYPES.has(unit.type)) {
        ov.food = SETTLER_FOOD_COST[government] || 1;
      }

      // Shield support cost (FUN_004e7d7f logic)
      unitCounter++;
      switch (government) {
        case 'anarchy': case 'despotism': // free = city size
          if (unitCounter > city.size) ov.shield = true;
          break;
        case 'monarchy':
          if (unitCounter > COSMIC_FREE_SUPPORT.monarchy) ov.shield = true;
          break;
        case 'communism':
          if (unitCounter > COSMIC_FREE_SUPPORT.communism) ov.shield = true;
          break;
        case 'fundamentalism': // fanatics always free
          if (!FANATIC_TYPES.has(unit.type) &&
              unitCounter > COSMIC_FREE_SUPPORT.fundamentalism) ov.shield = true;
          break;
        default: // republic, democracy: every unit costs
          ov.shield = true;
          break;
      }

      // Military abroad unhappiness — Republic/Democracy only (FUN_004e7eb1 lines 3009-3054)
      // Sea combat units are always abroad; land/air check location vs friendly cities/fortresses
      if ((government === 'republic' || government === 'democracy') && !NON_COMBAT_TYPES.has(unit.type)) {
        const isSeaCombat = SEA_COMBAT_TYPES.has(unit.type);
        const isAbroad = isSeaCombat || this._isUnitAbroad(unit, city, mapData);
        if (isAbroad) {
          const hasWS = this._civHasWonder(mapData, city.owner, 21); // Women's Suffrage
          const hasPS = this._cityHasBuilding(city, 33); // Police Station
          let baseUnhappy = (!hasWS && !hasPS) ? 1 : 0;

          if (government === 'democracy') { // Democracy: always +1
            baseUnhappy += 1;
          } else if (baseUnhappy > 0 && abroadCounter === 0) {
            // Republic: first military unit is free
            baseUnhappy = 0;
          }

          if (baseUnhappy === 0) {
            ov.unhappy = 1;
            ov.unhappyType = 2; // gray face (mitigated)
          } else {
            ov.unhappy = baseUnhappy;
            ov.unhappyType = 1; // red face (unmitigated)
          }
          abroadCounter++;
        }
      }

      overlays.push(ov);
    }
    return overlays;
  },

  // Calculate food yield for a tile
  _calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, cityIndex, mapData) {
    let food = hasSpecial ? this.SPECIAL_TOTAL[ter][specialIdx - 1][0] : this.TERRAIN_BASE[ter][0];

    // Irrigation / Farmland (non-ocean)
    // Binary: (bVar1 & 6) != 0 — city-present bit (0x02) implies irrigation
    if (ter !== 10 && (imp.irrigation || isCenter)) {
      food += this.IRRIGATION_BONUS[ter];
      // Supermarket + Farmland: +50%
      // Binary: (bVar1 & 0x0A) != 0 — city-present bit (0x02) implies farmland
      if ((imp.mining || isCenter) && this._cityHasBuilding(city, 24))
        food = food + Math.floor(food / 2);
    }

    // Harbor (building 30): +1 food on ocean
    if (ter === 10 && this._cityHasBuilding(city, 30)) food += 1;

    // Railroad: +50% food (binary FUN_004e868f: food = food + food / 2)
    const hasRailroad = imp.railroad ||
      (isCenter && mapData.civTechs && mapData.civTechs[city.owner] &&
       mapData.civTechs[city.owner].has(67));
    if (hasRailroad) food = food + Math.floor(food / 2);

    // Despotism/Anarchy penalty: -1 if food > 2 (unless WLTKD)
    const gov = this._getCityGovernment(city, mapData);
    if ((gov === 'anarchy' || gov === 'despotism') && food > 2 && !city.weLoveKingDay) food -= 1;

    // Pollution: halve (applied last)
    if (imp.pollution) food = (food + 1) >> 1;

    return food;
  },

  // Calculate shield yield for a tile
  _calcTileShields(gx, gy, ter, imp, hasSpecial, specialIdx, isCenter, city, cityIndex, mapData) {
    let shields = hasSpecial ? this.SPECIAL_TOTAL[ter][specialIdx - 1][1] : this.TERRAIN_BASE[ter][1];

    // Grassland shield (+1 shield based on coordinate formula, not a special resource)
    if (ter === 2 && !hasSpecial && mapData.hasShield && mapData.hasShield(gx, gy)) shields += 1;

    // Mining (without irrigation)
    if (imp.mining && !imp.irrigation) shields += this.MINING_BONUS[ter];

    // City center: minimum 1 shield
    if (isCenter && shields === 0) shields = 1;

    // King Richard's Crusade (wonder index 8): +1 shield
    if (this._cityHasWonder(cityIndex, 8, mapData)) shields += 1;

    // Railroad: +50%
    // Binary: (bVar1 & 0x20) for explicit railroad, OR city-present
    // + FUN_004bd9f0(civ, 0x43) = civ has Railroad tech (ID 67)
    const hasRailroad = imp.railroad ||
      (isCenter && mapData.civTechs && mapData.civTechs[city.owner] &&
       mapData.civTechs[city.owner].has(67));
    if (hasRailroad) shields = shields + Math.floor(shields / 2);

    // Despotism/Anarchy penalty: -1 if shields > 2 (unless WLTKD)
    const gov = this._getCityGovernment(city, mapData);
    if ((gov === 'anarchy' || gov === 'despotism') && shields > 2 && !city.weLoveKingDay) shields -= 1;

    // Pollution: halve (applied last)
    if (imp.pollution) shields = (shields + 1) >> 1;

    return shields;
  },

  // Calculate trade yield for a tile
  _calcTileTrade(ter, imp, hasSpecial, specialIdx, hasRiver, isCenter, city, cityIndex, mapData) {
    let trade = hasSpecial ? this.SPECIAL_TOTAL[ter][specialIdx - 1][2] : this.TERRAIN_BASE[ter][2];

    // River: +1 trade
    if (hasRiver) trade += 1;

    // Road/Railroad: +1 trade if terrain < 3 OR trade > 0
    const hasRoad = imp.road || imp.railroad || isCenter;
    if (hasRoad) {
      if (ter < 3 || trade > 0) trade += 1;
    }

    // Colossus (wonder index 2): +1 trade if trade > 0
    if (trade > 0 && this._cityHasWonder(cityIndex, 2, mapData)) trade += 1;

    // Despotism/Anarchy penalty: -1 if trade > 2 (unless WLTKD)
    const gov = this._getCityGovernment(city, mapData);
    if ((gov === 'anarchy' || gov === 'despotism') && trade > 2 && !city.weLoveKingDay) trade -= 1;

    // Republic/Democracy: +1 trade if trade > 0
    if ((gov === 'republic' || gov === 'democracy') && trade > 0) trade += 1;

    // Superhighways + road/railroad: +50%
    if (hasRoad && this._cityHasBuilding(city, 25))
      trade = trade + Math.floor(trade / 2);

    // Pollution: halve (applied last)
    if (imp.pollution) trade = (trade + 1) >> 1;

    return trade;
  },

  // Calculate full yields [food, shields, trade] for a specific tile in a city's radius
  _getTileYields(gx, gy, isCenter, city, cityIndex, mapData) {
    const ter = mapData.getTerrain(gx, gy);
    if (ter < 0 || ter > 10) return [0, 0, 0];

    const imp = mapData.getImprovements(gx, gy);
    const res = mapData.getResource(gx, gy);
    const hasRiver = mapData.hasRiver && mapData.hasRiver(gx, gy);

    // Determine if special resource is present
    let hasSpecial = false, specialIdx = 0;
    if (ter === 2 && mapData.hasShield && mapData.hasShield(gx, gy)) {
      // Grassland shield: add +1 shield to base (not a "special resource" per se)
      hasSpecial = false;
    } else if (res > 0 && res <= 2 && this.SPECIAL_TOTAL[ter] && this.SPECIAL_TOTAL[ter][res - 1]) {
      hasSpecial = true;
      specialIdx = res;
    }

    const food = this._calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, cityIndex, mapData);
    const shields = this._calcTileShields(gx, gy, ter, imp, hasSpecial, specialIdx, isCenter, city, cityIndex, mapData);
    const trade = this._calcTileTrade(ter, imp, hasSpecial, specialIdx, hasRiver, isCenter, city, cityIndex, mapData);

    return [food, shields, trade];
  },

  // ═══════════════════════════════════════════════════════════════════
  // Supply/Demand commodity scoring — port of FUN_0043d400 @ 0x0043D400
  // (8,227-byte function from decompiled civ2.exe block_00430000.c:4748-5440)
  //
  // Computes 3 supply and 3 demand commodities for a city based on:
  //   - Terrain types in the 21-tile city radius
  //   - City size, tech level, buildings, wonders
  //   - Geographic position (latitude, longitude, continent size)
  //   - Civ identity (French→Wine, Chinese→Silk, Spanish→Spice)
  //   - Active trade routes and en-route caravans
  //
  // Commodity IDs: 0=Hides,1=Wool,2=Beads,3=Cloth,4=Salt,5=Coal,6=Copper,
  //   7=Dye,8=Wine,9=Silk,10=Silver,11=Spice,12=Gems,13=Gold,14=Oil,15=Uranium
  //
  // Returns { supply: [id, id, id], demand: [id, id, id] }
  //   Negative values = commodity is actively traded (in parentheses in UI)
  // ═══════════════════════════════════════════════════════════════════
  _calcSupplyDemand(city, cityIndex, mapData) {
    if (!mapData.getTerrain || !mapData.getBodyId || !mapData.wrap) return null;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
    const shiftBySigned = (v, s) => s > 0 ? v << s : s < 0 ? (v >> -s) : v;

    // ── City location and identity ──
    // Binary uses doubled-x coordinates (city.cx) and raw y (city.cy = city.gy)
    const gx = city.gx, gy = city.gy;
    const rawX = city.cx;  // local_90 in binary (doubled-x coordinate)
    const rawY = city.cy;  // local_98 in binary (= gy)
    const ownerSlot = city.owner;  // 0-7
    const civData = mapData.civs && mapData.civs[ownerSlot];
    const bodyId = mapData.getBodyId(gx, gy);

    // Tech count (local_8c in binary = number of techs known by this civ)
    const techCount = (mapData.civTechCounts && mapData.civTechCounts[ownerSlot]) || 0;

    // City size tier: (size + 2) / 5, integer division (local_b0)
    const sizeTier = Math.floor((city.size + 2) / 5);

    // Civ identity for trade bonuses (French=9→Wine, Chinese=11→Silk, Spanish=17→Spice)
    const rulesCivNum = civData ? civData.rulesCivNumber : 0;

    // civHasTech helper — checks if ownerSlot has a specific tech
    const civTechs = mapData.civTechs && mapData.civTechs[ownerSlot];
    const hasTech = (techId) => civTechs ? civTechs.has(techId) : false;
    // anyCivHasTech — checks if ANY civ knows a tech (for DAT_00655b90-style checks)
    const anyCivHasTech = (techId) => {
      if (!mapData.civTechs) return false;
      for (let i = 0; i < mapData.civTechs.length; i++) {
        if (mapData.civTechs[i] && mapData.civTechs[i].has(techId)) return true;
      }
      return false;
    };

    // ── Geographic metrics ──
    // Binary uses DAT_006d1160 (map width in doubled-x) and DAT_006d1162 (map height)
    const mw = mapData.mw || 1;
    const mh = mapData.mh || 1;
    const mw2 = mapData.mw2 || (mw * 2);  // doubled map width = DAT_006d1160
    // Distance from equator: local_14 = abs(rawY - mh/2)
    const yDistFromEquator = Math.abs(rawY - (mh >> 1));
    // Distance from prime meridian: local_6c = abs(rawX - mw2/2)
    const xDistFromCenter = Math.abs(rawX - (mw2 >> 1));
    // Directional offsets for body-id scoring (local_94, local_64, local_a0, local_ac)
    const southOffset = Math.max(0, rawY - (mh >> 1));   // positive if south of equator
    const eastOffset = Math.max(0, rawX - (mw2 >> 1));   // positive if east of center

    // ── Count terrain types in the 21-tile city radius ──
    const terrCount = new Array(11).fill(0);
    let riverCount = 0;      // local_b4
    let roadCount = 0;   // local_12c — BUG: uninitialized in binary (stack garbage). Affects Copper & Dye demand.
    const RADIUS = this.CITY_RADIUS_DOUBLED;
    const parC = gy & 1;
    for (let i = 0; i < 21; i++) {
      const [ddx, ddy] = RADIUS[i];
      const parT = ((gy + ddy) % 2 + 2) % 2;
      const tgx = gx + ((parC + ddx - parT) >> 1);
      const tgy = gy + ddy;
      // Bounds check (thunk_FUN_004087c0)
      const wgx = mapData.wrap(tgx);
      if (tgy < 0 || tgy >= mh || wgx < 0 || wgx >= mw) continue;
      const ter = mapData.getTerrain(tgx, tgy);
      if (ter >= 0 && ter <= 10) terrCount[ter]++;
      // Resource bonus: +3 to terrain count (line 4855-4858, FUN_005b8ee1 = check_tile_resource)
      // FUN_005b8ee1 returns 0 for grassland (terrain 2) — grassland never gets resource bonus
      if (mapData.getResource && ter !== 2) {
        const res = mapData.getResource(tgx, tgy);
        if (res > 0) terrCount[ter >= 0 && ter <= 10 ? ter : 0] += 3;
      }
      // River count (line 4859-4862, byte[0] bit 0x80)
      if (mapData.hasRiver && mapData.hasRiver(tgx, tgy)) riverCount++;
      // Road count (line 4863-4866, FUN_005b94d5 = get_tile_improvements, bit 0x10)
      if (mapData.getImprovements) {
        const imp = mapData.getImprovements(tgx, tgy);
        if (imp.road) roadCount++;
      }
    }

    // Merge glacier into tundra, then zero glacier (lines 4869-4870)
    terrCount[6] += terrCount[7];
    terrCount[7] = 0;

    // ── Compute continent land tile count for this city's continent ──
    // (DAT_00666130 + bodyId * 0x10 = continent_land_tile_count)
    // Compute from map data since this is runtime-only data
    let continentLandArea = 0;
    if (bodyId > 0 && mapData.getBodyId) {
      // Count all land tiles with same bodyId
      for (let y = 0; y < mh; y++) {
        for (let x = 0; x < mw; x++) {
          if (mapData.getTerrain(x, y) !== 10 && mapData.getBodyId(x, y) === bodyId) {
            continentLandArea++;
          }
        }
      }
    }

    // ── 16 Supply scores (DAT_0063f668 array, offsets [0]-[15]) ──
    const supply = new Array(16).fill(0);

    // [0] Hides supply (line 4871-4888)
    supply[0] = terrCount[9] * 3 + terrCount[6] * 6 + terrCount[3] * 4 + riverCount * 3;
    if (techCount < 16) supply[0] *= 2;
    if (techCount < 24) supply[0] <<= 1;
    if (techCount < 49) {
      if (city.size < 3) supply[0] <<= 1;
    } else {
      supply[0] = Math.trunc(supply[0] / 2);
    }
    if (city.size > 7) supply[0] = Math.trunc(supply[0] / 2);

    // [1] Wool supply (line 4889-4893)
    let woolMult = terrCount[6] + 2;
    if (yDistFromEquator > Math.trunc(mh / 3)) woolMult = terrCount[6] + 3;
    supply[1] = (Math.trunc(riverCount / 2) + terrCount[4] * 2 + terrCount[2]) * woolMult;

    // [2] Beads supply (line 4894-4900)
    supply[2] = terrCount[10] * 8 - yDistFromEquator;
    if (city.size > 9) supply[2] >>= 1;
    if (techCount > 32) supply[2] >>= 1;

    // [3] Cloth supply (line 4901-4913)
    let clothBase = (terrCount[1] * 3 + terrCount[0]) - riverCount;
    const clothTechMult = clamp(Math.trunc(techCount / 10), 1, 2);
    supply[3] = clothBase * clothTechMult;
    if (hasTech(37)) supply[3] = Math.trunc(supply[3] * 3 / 2);  // Industrialization (0x25)
    if (techCount < 8) supply[3] >>= 1;
    if (techCount < 16) supply[3] >>= 1;

    // [4] Salt supply (line 4914-4925)
    supply[4] = (terrCount[10] * 3 + terrCount[0] * 4 + terrCount[8] * 2) - Math.trunc(techCount / 6);
    if (!hasTech(65)) supply[4] = Math.trunc(supply[4] / 3);  // Radio (0x41)
    if (this._cityHasBuilding(city, 9)) supply[4] += supply[4] >> 1;  // Aqueduct
    if ((bodyId & 1) !== 0 && bodyId < 6) supply[4] += supply[4] >> 1;

    // [5] Coal supply (line 4926-4938)
    supply[5] = (terrCount[9] + terrCount[1] + terrCount[3] + terrCount[8] + 1) * terrCount[4] * 5;
    let coalShift = Math.trunc(sizeTier / 2);
    if (coalShift > 2) coalShift = 2;
    supply[5] = shiftBySigned(supply[5], coalShift - 1);
    if ((bodyId & 1) !== 0 && bodyId > 1) supply[5] += supply[5] >> 1;
    if (techCount < 20) supply[5] >>= 1;

    // [6] Copper supply (line 4939-4942)
    supply[6] = terrCount[5] * 5 + terrCount[4] * 5;
    if (bodyId !== 0 && (bodyId & 1) === 0) supply[6] *= 2;

    // [7] Dye supply (line 4943-4947)
    const dyeBase = (terrCount[2] * 5 - terrCount[1]) + riverCount;
    supply[7] = dyeBase * 2;
    if (bodyId !== 0 && (bodyId & 3) === 0) supply[7] = dyeBase * 4;

    // [8] Wine supply (line 4948-4966)
    // local_8 = clamp(riv*5 - tc[2], 0, tc[1]*4), local_1c = clamp(tc[1]*4, 0, local_8)
    // Since local_8 ≤ tc[1]*4 from first clamp, local_1c = local_8 always
    const wineA = clamp(riverCount * 5 - terrCount[2], 0, terrCount[1] * 4);
    const wineB = clamp(terrCount[1] * 4, 0, wineA);  // = wineA (see analysis above)
    supply[8] = wineB + Math.trunc(((mw2 >> 1) - xDistFromCenter) / 2) + wineA;
    if (southOffset !== 0) supply[8] >>= 1;
    supply[8] = shiftBySigned(supply[8], clamp(sizeTier - 1, -2, 1));
    if (((bodyId - 2) & 3) === 0) supply[8] += supply[8] >> 1;  // bodyId ≡ 2 (mod 4)
    if (rulesCivNum === 9) supply[8] <<= 1;  // French bonus
    if (city.size > 10) supply[8] >>= 1;

    // [9] Silk supply (line 4967-4974 + 4989-4991)
    supply[9] = (terrCount[3] * 2 + terrCount[9] + 1) * (terrCount[4] + 1);
    if (supply[9] !== 0) {
      supply[9] += eastOffset * 2;
      if (bodyId !== 0 && bodyId % 5 === 0) supply[9] *= 2;
    }
    if (rulesCivNum === 11) supply[9] <<= 1;  // Chinese bonus

    // [10] Silver/Iron supply (line 4975-4988)
    supply[10] = terrCount[5] * 8;
    if (supply[10] !== 0) {
      supply[10] += terrCount[4] + xDistFromCenter;
      if (!hasTech(39)) supply[10] >>= 1;  // Iron Working (0x27)
      if (bodyId > 8) supply[10] += supply[10] >> 1;
      if (city.size < 5) supply[10] >>= 1;
    }
    // Line 4989: rulesCivNum == 10 → double supply[9] (Silk)
    // rulesCivNum 10 = Indian. Actually, checking RULES.TXT civ order:
    // 0=Roman,1=Babylonian,2=German,3=Egyptian,4=American,5=Greek,6=Indian,7=Russian,
    // 8=Zulu,9=French,10=Aztec,11=Chinese,12=English,13=Celts,14=Japanese,15=Viking,
    // 16=Spanish,17=Persian,18=Carthaginian,19=Arab,20=Sioux
    // So rulesCivNum 10 = Aztec. Interesting — Aztecs get a silk bonus too.
    if (rulesCivNum === 10) supply[9] <<= 1;  // Aztec bonus to silk

    // [11] Spice supply (line 4992-5008)
    supply[11] = (terrCount[9] * 3 + terrCount[8] * 2 + terrCount[0] * 2) *
                 Math.trunc((terrCount[10] + riverCount) / 2);
    if (supply[11] !== 0) {
      if (yDistFromEquator < 10) supply[11] *= 2;
      supply[11] -= yDistFromEquator;
      // Continent land area check (line 4999-5004)
      if (continentLandArea < 26) supply[11] += supply[11] >> 1;
      if (continentLandArea > 300) supply[11] >>= 1;
      if (bodyId === 1) supply[11] >>= 1;
    }

    // [12] Gems supply (line 5009-5016)
    supply[12] = (terrCount[5] + 1) * (terrCount[8] + 1) * (terrCount[0] + 1) + terrCount[1];
    if (supply[12] !== 0) {
      const gemsSizeMult = clamp(sizeTier, 1, 4);
      supply[12] = Math.trunc(gemsSizeMult * supply[12] / 2);
      if (bodyId === 7) supply[12] += supply[12] >> 1;
    }

    // [13] Gold supply (line 5017-5026)
    supply[13] = (terrCount[5] + Math.trunc(terrCount[4] / 2) + 1) * (riverCount + 2);
    if (terrCount[5] > 2) supply[13] *= 2;
    if (city.size > 4) supply[13] <<= 1;
    if (city.size > 9) supply[13] <<= 1;

    // [14] Oil/Spice supply (line 5027-5043)
    supply[14] = terrCount[6] * 8 + terrCount[0] * 10 + terrCount[8] * 6 + terrCount[7] * 12;
    // DAT_00655b90 = tech_known_bitmask[14] = whether anyone knows Navigation (tech 14)
    if (!anyCivHasTech(14)) supply[14] >>= 3;  // Navigation
    if (supply[14] === 0) {
      supply[14] = -1;  // disabled
    } else {
      if (bodyId === 17) supply[14] *= 3;  // specific continent
      else if (bodyId > 1 && ((bodyId - 1) & 7) === 0) supply[14] += supply[14] >> 1;
      const oilSizeMult = clamp(Math.trunc(sizeTier / 2) - 2, 1, 2);
      supply[14] = oilSizeMult * supply[14];
    }

    // [15] Uranium supply (line 5044-5062)
    supply[15] = (terrCount[6] + terrCount[0] + 1) * (terrCount[4] + riverCount + 1) * (terrCount[5] + 1);
    if (!hasTech(58)) supply[15] = 0;  // Nuclear Fission (0x3a) required
    if (supply[15] === 0) {
      supply[15] = -1;  // disabled
    } else {
      if (bodyId !== 0 && bodyId % 10 === 0) supply[15] += supply[15] >> 1;
      let uraniumSize = sizeTier;
      if (uraniumSize > 5) uraniumSize = 6;
      supply[15] = Math.trunc(supply[15] * uraniumSize / 6);
    }

    // ── 16 Demand scores (DAT_0063f540 array, offsets [0]-[15]) ──
    const demand = new Array(16).fill(0);

    // [0] Hides demand (line 5063-5087)
    demand[0] = (terrCount[6] + terrCount[7]) * 5 + Math.trunc(yDistFromEquator * 3 / 2) +
                terrCount[5] * 2 + terrCount[3];
    const hidesTechScore = Math.trunc(Math.trunc(techCount / 10) * demand[0]);
    demand[3] = terrCount[4] * 4 + terrCount[3] * 4 + ((hidesTechScore + (hidesTechScore < 0 ? 7 : 0)) >> 3);
    // demand[3] is set here (Cloth demand, line 5066-5067: _DAT_0063f54c)
    if (city.size < 3) demand[0] *= 2;
    if (hasTech(37)) demand[0] = Math.trunc(demand[0] / 3);  // Industrialization
    if (hasTech(48)) demand[0] = 1;  // Mass Production (0x30)
    if (techCount < 10) demand[0] <<= 1;
    if (techCount < 20) demand[0] <<= 1;
    if (techCount > 47) demand[0] = Math.trunc(demand[0] / 2);

    // [1] Wool demand (line 5088-5093)
    // abs(mh/4 - yDistFromEquator)
    const quartDist = Math.abs((mh >> 2) - yDistFromEquator);
    demand[1] = quartDist * 2 + terrCount[1] * 2 + terrCount[3];
    if (hasTech(37)) demand[1] <<= 1;  // Industrialization

    // [2] Beads demand (line 5099-5108)
    demand[2] = yDistFromEquator + Math.trunc((21 - terrCount[10]) * 3 / 2);
    if (city.size < 4) demand[2] += demand[2] >> 1;
    if (city.size > 11) demand[2] = Math.trunc(demand[2] / 2);
    if (techCount > 47) demand[2] = Math.trunc(demand[2] / 2);

    // [3] Cloth demand — already set above (line 5066-5067)
    // demand[3] was set during Hides demand computation

    // [4] Salt demand (line 5109-5116)
    // Loop: distributes size across decreasing multipliers
    let saltDemand = 0;
    let saltMult = 8;
    let sizeRemaining = city.size;
    while (saltMult !== 0 && sizeRemaining > 0) {
      const chunk = clamp(sizeRemaining, 0, 5);
      saltDemand += chunk * saltMult;
      saltMult = Math.trunc(saltMult / 2);
      sizeRemaining -= chunk;
    }
    demand[4] = saltDemand - Math.trunc(techCount / 2);

    // [5] Coal demand (line 5117-5131)
    demand[5] = (yDistFromEquator + 10) * sizeTier + techCount;
    if (city.size < 5) demand[5] = 0;
    if (city.size < 8) demand[5] >>= 1;
    if (hasTech(37)) demand[5] <<= 1;  // Industrialization
    if (hasTech(23)) demand[5] <<= 1;  // Electricity (0x17)
    if (this._cityHasBuilding(city, 19)) demand[5] <<= 1;  // Power Plant (building 19 = 0x13)
    // Hydro Plant (20=0x14), Nuclear Plant (21=0x15), or Solar Plant (29=0x1d)
    if (this._cityHasBuilding(city, 20) || this._cityHasBuilding(city, 21) ||
        this._cityHasBuilding(city, 29)) {
      demand[5] >>= 3;
    }

    // [6] Copper demand (line 5141-5163)
    demand[6] = (riverCount + roadCount + 1) * sizeTier;
    if (demand[6] <= supply[6]) demand[6] >>= 1;
    if (this._cityHasBuilding(city, 5)) demand[6] += demand[6] >> 1;  // Marketplace (wonder 5)
    // Actually building 5 = Marketplace. Let me re-check: thunk_FUN_0043d20a is city-has-building.
    // Line 5145: iVar5 = thunk_FUN_0043d20a(param_1, 5) → cityHasBuilding(city, 5) = Marketplace
    if (this._cityHasBuilding(city, 10)) demand[6] += demand[6] >> 1;  // Bank
    if (hasTech(23)) demand[6] += demand[6] >> 1;  // Electricity (0x17)
    if (hasTech(16)) demand[6] = (demand[6] + (demand[6] < 0 ? 3 : 0)) >> 2;  // Computers (0x10)
    if (city.size < 5) demand[6] >>= 1;

    // [7] Dye demand (line 5164-5172)
    demand[7] = supply[3] + roadCount;
    if (hasTech(10)) demand[7] = Math.trunc(demand[7] / 2);  // Chemistry (0x0a)
    if (hasTech(48)) demand[7] = Math.trunc(demand[7] / 2);  // Mass Production (0x30)

    // [8] Wine demand (line 5173-5194)
    // abs(rawX - rawY) — absolute difference of doubled-x and y coordinates
    const coordDiff = Math.abs(rawX - rawY);
    demand[8] = sizeTier * 4 + 4 + coordDiff;

    // [9] Silk demand (line 5185-5194)
    demand[9] = ((mh >> 1) - yDistFromEquator) * 2 - xDistFromCenter + (mw2 >> 1) +
                terrCount[9] * 4 + Math.trunc(terrCount[1] / 2) + terrCount[8] * 2 + terrCount[0] * 4;
    demand[9] = shiftBySigned(demand[9], clamp(sizeTier - 1, -1, 1));
    if (bodyId === 1 && (cityIndex & 2) !== 0) demand[9] += demand[9] >> 1;
    if (city.size < 7) demand[9] >>= 1;

    // [10] Silver demand — city.size * 8 (line 5195)
    demand[10] = city.size << 3;

    // [11] Spice demand — 0 (line 5196)
    demand[11] = 0;

    // [12] Gems demand — 0 (line 5197)
    // Actually line 5197: _DAT_0063f570 = 0, line 5198-5208 set it conditionally
    demand[12] = 0;

    // Special commodity assignment based on (rawX + rawY) % 3 (lines 5198-5208)
    // Determines which slot (10=Silver, 12=Gems, 13=Gold) gets the "population demand"
    let specialSlot = 10;  // default: Silver gets demand[10] = size*8
    const coordMod3 = (rawX + rawY) % 3;
    if (coordMod3 === 1) {
      specialSlot = 12;  // Gems
      demand[12] = demand[10];  // copy size*8 to Gems
      demand[10] = 0;
    } else if (coordMod3 === 2) {
      specialSlot = 13;  // Gold
      demand[13] = demand[10];  // copy size*8 to Gold
      demand[10] = 0;
    }

    // Apply modifiers to the special slot (lines 5209-5227)
    // Copernicus (11) or Marco Polo wonder (10) → ×1.5
    if (this._cityHasBuilding(city, 11) || this._civHasWonder(mapData, ownerSlot, 10)) {
      demand[specialSlot] = Math.trunc(demand[specialSlot] * 3 / 2);
    }
    // Bank (building 10)
    if (this._cityHasBuilding(city, 10)) {
      demand[specialSlot] = Math.trunc(demand[specialSlot] * 3 / 2);
    }
    // Economics tech (0x16 = 22)
    if (hasTech(22)) demand[specialSlot] >>= 1;
    // Computers tech (0x10 = 16)
    if (hasTech(16)) demand[specialSlot] >>= 1;
    // Spanish (rulesCivNum == 17) → double
    if (rulesCivNum === 17) demand[specialSlot] <<= 1;

    // [11] Spice demand (continued, lines 5228-5248)
    // Wait — let me re-check. Line 5195 sets DAT_0063f568 = size*8.
    // DAT_0063f568 = 0x568 - 0x540 = 0x28 = 40, /4 = 10. Yes that's demand[10].
    // Lines 5209-5227 apply modifiers to demand[specialSlot].
    // Now line 5228-5248: DAT_0063f56c = Spice demand (offset 0x56c - 0x540 = 0x2c = 44, /4 = 11)
    const continentLandDiv10 = Math.trunc(continentLandArea / 10);  // *(short*)(DAT_00666130 + bodyId*0x10) / 10
    const techMinus12 = Math.max(techCount - 12, 0);
    demand[11] = continentLandDiv10 - techMinus12;
    if (city.size < 4) demand[11] = Math.trunc(demand[11] / 2);
    if (continentLandArea > 400) {
      if (city.size > 7) demand[11] <<= 1;
      // (-(rawX) - rawY) & 3 == 0 → zero demand
      if (((-rawX - rawY) & 3) === 0) demand[11] = 0;
    }
    if (hasTech(70)) demand[11] >>= 1;  // Republic (0x46)

    // [14] Oil demand (line 5249-5289)
    if (!hasTech(37)) {
      demand[14] = -1;  // No Industrialization → Oil not demanded
    } else {
      demand[14] = Math.trunc(techCount / 3) * (sizeTier + 2);
      if (demand[14] <= supply[14]) demand[14] >>= 1;
      if (this._cityHasBuilding(city, 15)) {  // Factory (building 15 = 0x0f)
        demand[14] = Math.trunc(demand[14] * 3 / 2);
      } else {
        if (city.size < 5) demand[14] >>= 1;
        if (city.size < 10) demand[14] >>= 1;
        if (city.size < 20) demand[14] >>= 1;
      }
      if (hasTech(5)) demand[14] *= 3;  // Automobile (tech 5)
      if (this._cityHasBuilding(city, 25)) demand[14] <<= 1;  // Superhighways (building 25 = 0x19)
      if (this._cityHasBuilding(city, 13)) demand[14] >>= 1;  // Mass Transit (building 13 = 0x0d)
      if (this._cityHasBuilding(city, 18)) demand[14] >>= 1;  // Recycling Center (building 18 = 0x12)
    }

    // [15] Uranium demand (line 5290-5302)
    if (!hasTech(58)) {
      demand[15] = -1;  // No Nuclear Fission → not demanded
    } else {
      demand[15] = techCount * techCount;
      demand[15] = shiftBySigned(demand[15], clamp(sizeTier - 3, -3, 0));
      // Nuclear Plant (21 = 0x15) or SDI (17 = 0x11)
      if (this._cityHasBuilding(city, 21) || this._cityHasBuilding(city, 17)) {
        demand[15] <<= 1;
      }
    }

    // ── Zero the lesser of supply vs demand for each commodity (lines 5303-5312) ──
    const preZeroSupply = [...supply];
    const preZeroDemand = [...demand];
    for (let i = 0; i < 16; i++) {
      if (supply[i] < demand[i]) {
        if (supply[i] > 0) supply[i] = 0;
      } else {
        if (demand[i] > 0) demand[i] = 0;
      }
    }

    // ── Sort and pick top 3 for each (lines 5313-5338) ──
    // Create index arrays and sort by score (descending)
    const supplyIdx = Array.from({length: 16}, (_, i) => i);
    const demandIdx = Array.from({length: 16}, (_, i) => i);
    // Bubble sort by score (ascending — then pick from end)
    supplyIdx.sort((a, b) => supply[a] - supply[b]);
    demandIdx.sort((a, b) => demand[a] - demand[b]);

    // Pick top 3 supply (from end, skipping negative scores)
    const supplyResult = [];
    let si = 15;
    for (let i = 0; i < 3; i++) {
      while (si >= 0 && supply[supplyIdx[si]] < 0) si--;
      if (si >= 0) { supplyResult.push(supplyIdx[si]); si--; }
      else supplyResult.push(0);
    }

    // Pick top 3 demand (from end, skipping negative scores)
    const demandResult = [];
    let di = 15;
    for (let i = 0; i < 3; i++) {
      while (di >= 0 && demand[demandIdx[di]] < 0) di--;
      if (di >= 0) { demandResult.push(demandIdx[di]); di--; }
      else demandResult.push(0);
    }

    const finalSupply = [...supplyResult];
    const finalDemand = [...demandResult];

    // ── Special commodity overwrite (lines 5339-5397) ──
    // Binary variables: local_60 → overwrites demand[1], local_c → overwrites supply[1]
    // Coordinate-based hashing assigns Oil (14) or Uranium (15) to specific cities
    let specDemandHash, specSupplyHash;
    if (techCount < 32) {
      specDemandHash = ((rawY * 5 + rawX * 3) % 14);
      specSupplyHash = ((rawY * 7 + rawX * 13) % 14);
    } else {
      specDemandHash = ((rawY * 5 + rawX * 3) % 9) + 5;
      specSupplyHash = ((rawY * 7 + rawX * 13) % 9) + 5;
    }
    if (specSupplyHash === specDemandHash) specSupplyHash = -2;

    // Check overlap with existing results
    let specFlags = 0;  // bit 1 = demand already has >13, bit 2 = supply already has >13
    for (let i = 0; i < 3; i++) {
      if (finalDemand[i] > 13) specFlags |= 1;
      if (finalSupply[i] > 13) specFlags |= 2;
      if (finalSupply[i] === specDemandHash || finalDemand[i] === specDemandHash) specDemandHash = -2;
      if (finalSupply[i] === specSupplyHash || finalDemand[i] === specSupplyHash) specSupplyHash = -2;
    }

    // Resolve special demand (local_60 → overwrites finalDemand[1])
    // Binary logic (lines 5371-5382): Industrialization + odd hash → Oil; Nuc Fission + even → Uranium
    if (specDemandHash < 0 && (specFlags & 1) === 0) {
      if (hasTech(37) && (specDemandHash & 1) !== 0) {
        specDemandHash = 14;  // Oil (Industrialization + odd hash)
      } else if (hasTech(58) && (specDemandHash & 1) === 0) {
        specDemandHash = 15;  // Uranium (Nuclear Fission + even hash)
      }
    }
    if (specDemandHash >= 0) finalDemand[1] = specDemandHash;

    // Resolve special supply (local_c → overwrites finalSupply[1])
    if (specSupplyHash < 0 && (specFlags & 2) === 0) {
      specSupplyHash = (specSupplyHash & 1) + 14;  // Oil (14) or Uranium (15)
      if (specSupplyHash === 14 && !hasTech(37)) specSupplyHash = -1;
      if (specSupplyHash === 15 && !hasTech(58)) specSupplyHash = -1;
    }
    if (specSupplyHash >= 0) finalSupply[1] = specSupplyHash;

    // ── Negate actively-traded commodities (lines 5398-5437) ──
    // Trade routes: negate supply commodities that are being exported
    if (city.tradeRouteCount > 0) {
      for (let r = 0; r < city.tradeRouteCount; r++) {
        const routeCommodity = city.tradeCommoditiesInRoute[r];
        if (routeCommodity < 0) continue;  // -1 = no commodity
        // Negate matching supply
        for (let j = 0; j < 3; j++) {
          if (finalSupply[j] === routeCommodity) finalSupply[j] = -finalSupply[j];
        }
        // Also negate demand in partner city's supply (we check partner's route back to us)
        const partnerId = city.tradePartnerCityIds[r];
        if (partnerId === 0xFFFF || !mapData.cities) continue;
        const partner = mapData.cities[partnerId];
        if (!partner) continue;
        // Find what commodity the partner is sending to us
        let partnerCommodity = -1;
        if (partner.tradeRouteCount > 0) {
          for (let pr = 0; pr < partner.tradeRouteCount; pr++) {
            if (partner.tradePartnerCityIds[pr] === cityIndex) {
              partnerCommodity = partner.tradeCommoditiesInRoute[pr];
              break;
            }
          }
        }
        if (partnerCommodity >= 0) {
          for (let j = 0; j < 3; j++) {
            if (finalDemand[j] === partnerCommodity) finalDemand[j] = -finalDemand[j];
          }
        }
      }
    }

    // Negate supply for commodities carried by en-route caravans/freight from this city
    // (lines 5425-5437: scan unit array for trade units homed to this city)
    // Binary checks: alive, unit[+0x10] == cityIndex (home city), type role == 7, unit[+0x0D] >= 0
    // In save file: homeCityId is at +16 (uint16), commodityCarried holds commodity for trade units
    if (mapData.units) {
      for (const unit of mapData.units) {
        if (unit.homeCityId !== cityIndex) continue;
        // Trade unit types: 48 (Caravan) and 49 (Freight), role 7
        if (unit.type !== 48 && unit.type !== 49) continue;
        const commodity = unit.commodityCarried;
        if (commodity == null || commodity < 0) continue;
        for (let j = 0; j < 3; j++) {
          if (finalSupply[j] === commodity) finalSupply[j] = -finalSupply[j];
        }
      }
    }

    return { supply: finalSupply, demand: finalDemand, supplyScores: supply, demandScores: demand,
             preZeroSupply, preZeroDemand,
             terrCount, riverCount, roadCount, bodyId, techCount, sizeTier, citySize: city.size,
             continentLandArea, rawX, rawY, yDistFromEquator, xDistFromCenter, rulesCivNum };
  },

  // Scale a sprite canvas to a target size
  _scaleSprite(source, w, h) {
    if (!source) return null;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(source, 0, 0, w, h);
    return c;
  },

  // ── Extract city dialog sprites from ICONS.GIF, PEOPLE.GIF, and optionally CITY.GIF ──
  // Binary ref: FUN_00449a0e @ block_00440000.c (load_icon_sprites)
  // Sprite coordinates verified against engine/reference/sprite-tables.js
  extractSprites(iconsCtx, peopleCtx, cityGifCtx) {
    const CK = [[255, 0, 255, 15], [255, 159, 163, 15]];
    const cdSprites = {};

    // Resource icons 14x14 — ICONS_GIF_EXTRA.researchProgress (3 sets x 2 rows at y=290/305)
    // and ICONS_GIF_EXTRA.globalWarmingProgress (y=320)
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
    // Binary ref: ICONS_GIF.buildingIcons — startX=343, startY=1, w=36, h=20, colStep=37, rowStep=21, perRow=8, count=38
    cdSprites.improvements = {};
    for (let idx = 1; idx <= 38; idx++) {
      const col = (idx - 1) % 8;
      const row = Math.floor((idx - 1) / 8);
      cdSprites.improvements[idx] = Civ2Renderer.extractSprite(
        iconsCtx, 343 + 37 * col, 1 + 21 * row, 36, 20, CK, false
      );
    }

    // Wonder thumbnails 36x20, 4 rows x 7 cols, origin (343,106), stride 37x21
    // Binary ref: ICONS_GIF.wonderIcons — startX=343, startY=106, w=36, h=20, colStep=37, rowStep=21, perRow=7, count=28
    cdSprites.wonders = {};
    for (let idx = 0; idx < 28; idx++) {
      const col = idx % 7;
      const row = Math.floor(idx / 7);
      cdSprites.wonders[idx] = Civ2Renderer.extractSprite(
        iconsCtx, 343 + 37 * col, 106 + 21 * row, 36, 20, CK, false
      );
    }

    // Citizen faces 27x30, 11 cols x 4 rows (+1 specialist row), origin (2,6), stride 28x31
    // Binary ref: PEOPLE_GIF — moods=4, typesPerMood=11, w=27, h=30, startX=2, startY=6, colStep=28, rowStep=31
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

    // Mad face icons 10x10 from ICONS.GIF for unit support overlays (military abroad)
    cdSprites.madFaceRed = Civ2Renderer.extractSprite(iconsCtx, 82, 334, 10, 10, CK, false);
    cdSprites.madFaceGray = Civ2Renderer.extractSprite(iconsCtx, 82, 345, 10, 10, CK, false);

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
    ctx.font = '600 12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = shadow || C.headerShadow;
    ctx.fillText(text, cx + 1, cy + 1);
    ctx.fillStyle = color || C.header;
    ctx.fillText(text, cx, cy);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  },

  // ── Worked tile set from workedTiles array ──
  // Game's canonical tile indices: inner ring 0-7, outer ring 8-19, center=20.
  // Center tile (index 20) is always worked and not stored in the array.
  _getWorkedTiles(city) {
    const worked = new Set(city.workedTiles || []);
    worked.add(20); // center tile is always worked
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

    // Fill border area with stone texture (left, right, bottom — title bar covers top stone)
    const bvW = F.bevelW;
    const tbTop = bvW;  // title bar starts after bevel
    if (cdSprites && cdSprites.titleBarTile) {
      const tile = cdSprites.titleBarTile;
      const tw = tile.width, th = tile.height;
      ctx.save();
      ctx.beginPath();
      // Bottom border
      ctx.rect(0, h - bw, w, bw);
      // Left border (below title bar)
      ctx.rect(0, tbTop + F.titleBarH, bw, h - tbTop - F.titleBarH - bw);
      // Right border (below title bar)
      ctx.rect(w - bw, tbTop + F.titleBarH, bw, h - tbTop - F.titleBarH - bw);
      ctx.clip();
      for (let ty = 0; ty < h; ty += th) {
        for (let tx = 0; tx < w; tx += tw) {
          ctx.drawImage(tile, tx, ty);
        }
      }
      ctx.restore();
    } else {
      ctx.fillStyle = C.borderLight;
      ctx.fillRect(0, h - bw, w, bw);
      ctx.fillRect(0, tbTop + F.titleBarH, bw, h - tbTop - F.titleBarH - bw);
      ctx.fillRect(w - bw, tbTop + F.titleBarH, bw, h - tbTop - F.titleBarH - bw);
    }

    // 2px white outline around entire frame
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
    ctx.strokeRect(1.5, 1.5, w - 3, h - 3);
    // 1px black on inner line of bottom + right only
    ctx.strokeStyle = C.borderBlack;
    ctx.beginPath();
    ctx.moveTo(1.5, h - 1.5); ctx.lineTo(w - 1.5, h - 1.5); // bottom
    ctx.moveTo(w - 1.5, 1.5); ctx.lineTo(w - 1.5, h - 1.5); // right
    ctx.stroke();
  },

  // Title bar: stone texture, window icons, city title text (absolute canvas coords)
  _drawTitleBar(ctx, city, mapData, cdSprites) {
    const F = this.FRAME;
    const C = this.COL;
    const tbX = F.borderW, tbY = F.bevelW;
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
      const year = getGameYearFromMap(mapData);
      // Binary FUN_0043cc7e (block_00430000.c:4455-4468): population is the
      // triangular sum of city size: Σ_{i=1..size} i = size*(size+1)/2.
      // Each "1" here = 10,000 displayed people. Min clamp to 1.
      const popPoints = Math.max(1, (city.size * (city.size + 1)) >> 1);
      const pop = popPoints * 10000;
      const gold = (mapData.civs && mapData.civs[city.owner]) ? mapData.civs[city.owner].treasury || 0 : 0;
      const titleStr = `City of ${city.name}, ${year}, Population ${pop.toLocaleString()} (Treasury: ${gold} Gold)`;
      const textX = tbX + 59;  // after 3 icons + gap
      const textY = tbY + Math.floor(tbH / 2);
      ctx.font = '500 18px "Times New Roman", serif';
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

  _drawCitizens(ctx, city, epoch, cdSprites, specs, computed) {
    if (!(cdSprites && cdSprites.citizens)) {
      console.warn('[citydialog] No citizen sprites — cdSprites:', !!cdSprites, 'citizens:', cdSprites?.citizens?.length);
      return;
    }
    const R = this.REGIONS.citizens;
    const eraRow = Math.min(epoch, 3);
    const happy = computed ? computed.happy : (city.happyCitizens || 0);
    const unhappy = computed ? computed.unhappy : (city.unhappyCitizens || 0);
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

  // Canonical city radius tile offsets in doubled-X coordinates (from decompiled DAT_00628370/DAT_006283A0).
  // Inner ring 0-7 (NE,E,SE,S,SW,W,NW,N), outer diagonals 8-11, outer edges 12-19, center 20.
  CITY_RADIUS_DOUBLED: [
    [+1,-1],[+2,0],[+1,+1],[0,+2],[-1,+1],[-2,0],[-1,-1],[0,-2],   // 0-7: inner ring
    [+2,-2],[+2,+2],[-2,+2],[-2,-2],                                // 8-11: outer diagonals
    [+1,-3],[+3,-1],[+3,+1],[+1,+3],[-1,+3],[-3,+1],[-3,-1],[-1,-3], // 12-19: outer edges
    [0,0]                                                            // 20: center
  ],

  _drawResourceMap(ctx, city, cityIndex, mapData, cdSprites, mapSprites) {
    const R = this.REGIONS.resourceMap;
    const cx = city.gx, cy = city.gy;
    const parC = cy & 1; // parity of center row
    // Convert canonical doubled-X offsets to parser (gx,gy) offsets
    const radiusTiles = this.CITY_RADIUS_DOUBLED.map(([ddx, ddy]) => {
      const parT = ((cy + ddy) % 2 + 2) % 2; // parity of target row (safe mod)
      return { dx: (parC + ddx - parT) >> 1, dy: ddy };
    });

    const worked = this._getWorkedTiles(city);
    const hasTerrain = mapSprites && mapSprites.terrain;
    const { sprW, sprH } = R;
    const TW = sprW, TH = sprH;  // scaled tile dimensions for final positioning
    const FULL_TW = 64, FULL_TH = 32;  // full-res tile dimensions for offscreen rendering

    // Compute scaled tile positions for final ctx output (worker dots, icons, city sprite)
    const panel = this.REGIONS.panels.tileMap;
    const cityPx = city.gx * TW + ((city.gy % 2) ? (TW >> 1) : 0);
    const cityPy = city.gy * (TH >> 1);
    const centerX = R.x + panel.w / 2 + 2;
    const centerY = R.y + panel.h / 2 - (TH >> 2) - 10;
    const offX = centerX - cityPx - (TW >> 1);
    const offY = centerY - cityPy - (TH >> 1);

    if (hasTerrain && mapData.getTerrain) {
      // ── Offscreen full-res rendering with dither blending ──
      // Compute full-res pixel positions for all 21 radius tiles
      const fullPositions = radiusTiles.map(rt => {
        const tgx = city.gx + rt.dx, tgy = city.gy + rt.dy;
        return {
          px: tgx * FULL_TW + ((tgy % 2) ? (FULL_TW >> 1) : 0),
          py: tgy * (FULL_TH >> 1),
          gx: tgx, gy: tgy
        };
      });

      // Bounding box of all tiles at full resolution
      let minPx = Infinity, maxPx = -Infinity, minPy = Infinity, maxPy = -Infinity;
      for (const fp of fullPositions) {
        if (fp.px < minPx) minPx = fp.px;
        if (fp.px + FULL_TW > maxPx) maxPx = fp.px + FULL_TW;
        if (fp.py < minPy) minPy = fp.py;
        if (fp.py + FULL_TH > maxPy) maxPy = fp.py + FULL_TH;
      }
      const offW = maxPx - minPx;
      const offH = maxPy - minPy;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = offW;
      offCanvas.height = offH;
      const offCtx = offCanvas.getContext('2d', { colorSpace: 'srgb', willReadFrequently: true });

      // Pass 1: Draw base terrain at full 64×32 resolution
      for (let i = 0; i < radiusTiles.length; i++) {
        const fp = fullPositions[i];
        const wgx = mapData.wrap ? mapData.wrap(fp.gx) : fp.gx;
        const inBounds = fp.gy >= 0 && fp.gy < mapData.mh && wgx >= 0 && wgx < mapData.mw;
        if (!inBounds) continue;

        const ter = mapData.getTerrain(fp.gx, fp.gy);
        const variants = mapSprites.terrain[ter];
        if (variants && variants.length > 0) {
          const vi = ((wgx * 13 + fp.gy * 7) & 0x7FFFFFFF) % variants.length;
          offCtx.drawImage(variants[vi], fp.px - minPx, fp.py - minPy);
        }
      }

      // Pass 2: Dither blending — pixel manipulation at full resolution
      if (mapSprites.ditherMask) {
        const offImg = offCtx.getImageData(0, 0, offW, offH);
        const offPix = offImg.data;

        // Pre-cache terrain sprite pixel data (first variant per type)
        const terrainPixData = [];
        for (let tid = 0; tid < 11; tid++) {
          if (mapSprites.terrain[tid] && mapSprites.terrain[tid][0]) {
            const tc = mapSprites.terrain[tid][0].getContext('2d', { colorSpace: 'srgb', willReadFrequently: true });
            terrainPixData[tid] = tc.getImageData(0, 0, 64, 32).data;
          }
        }

        for (let i = 0; i < radiusTiles.length; i++) {
          const fp = fullPositions[i];
          const wgx = mapData.wrap ? mapData.wrap(fp.gx) : fp.gx;
          const inBounds = fp.gy >= 0 && fp.gy < mapData.mh && wgx >= 0 && wgx < mapData.mw;
          if (!inBounds) continue;

          const ter = mapData.getTerrain(fp.gx, fp.gy);
          if (ter === 10) continue; // skip ocean
          const px = fp.px - minPx, py = fp.py - minPy;
          const nb = mapData.getNeighbors(fp.gx, fp.gy);

          for (const dir of ['NE', 'SE', 'SW', 'NW']) {
            const [nx, ny] = nb[dir];
            if (ny < 0 || ny >= mapData.mh) continue;
            const nter = mapData.getTerrain(nx, ny);
            if (nter === ter || nter === 10) continue;
            if (!terrainPixData[nter]) continue;
            Civ2Renderer._applyDither(offPix, offW, offH, px, py, terrainPixData[nter], mapSprites.ditherMask, dir);
          }
        }
        offCtx.putImageData(offImg, 0, 0);
      }

      // Pass 3: Overlays at full resolution (coastlines, rivers, terrain overlays, roads, improvements)
      for (let i = 0; i < radiusTiles.length; i++) {
        const fp = fullPositions[i];
        const wgx = mapData.wrap ? mapData.wrap(fp.gx) : fp.gx;
        const inBounds = fp.gy >= 0 && fp.gy < mapData.mh && wgx >= 0 && wgx < mapData.mw;
        if (!inBounds) continue;

        const ter = mapData.getTerrain(fp.gx, fp.gy);
        const sx = fp.px - minPx, sy = fp.py - minPy;
        const tileNb = mapData.getNeighbors(fp.gx, fp.gy);

        // Coastlines
        if (ter === 10 && mapSprites.coast) {
          const L = {};
          for (const d of ['N','NE','E','SE','S','SW','W','NW'])
            L[d] = mapData.isLand(tileNb[d][0], tileNb[d][1]);
          const topG   = (L.NW?1:0) | (L.N?2:0)  | (L.NE?4:0);
          const rightG = (L.NE?1:0) | (L.E?2:0)  | (L.SE?4:0);
          const botG   = (L.SE?1:0) | (L.S?2:0)  | (L.SW?4:0);
          const leftG  = (L.SW?1:0) | (L.W?2:0)  | (L.NW?4:0);
          // Full-res coast quadrant offsets
          const cox = [16, 16, 0, 32];
          const coy = [0, 16, 8, 8];
          offCtx.drawImage(mapSprites.coast[topG   * 4 + 0], sx + cox[0], sy + coy[0]);
          offCtx.drawImage(mapSprites.coast[botG   * 4 + 1], sx + cox[1], sy + coy[1]);
          offCtx.drawImage(mapSprites.coast[leftG  * 4 + 2], sx + cox[2], sy + coy[2]);
          offCtx.drawImage(mapSprites.coast[rightG * 4 + 3], sx + cox[3], sy + coy[3]);
          if (mapSprites.mouths) {
            for (let mi = 0; mi < 4; mi++) {
              const md = ['NE','SE','SW','NW'][mi];
              const [mx, my] = tileNb[md];
              if (mapData.isLand(mx, my) && mapData.hasRiver(mx, my))
                offCtx.drawImage(mapSprites.mouths[mi], sx, sy);
            }
          }
        }

        // Rivers
        if (mapData.hasRiver(fp.gx, fp.gy) && mapSprites.rivers) {
          let rm = 0;
          if (mapData.hasRiver(tileNb.NE[0], tileNb.NE[1]) || mapData.getTerrain(tileNb.NE[0], tileNb.NE[1]) === 10) rm |= 1;
          if (mapData.hasRiver(tileNb.SE[0], tileNb.SE[1]) || mapData.getTerrain(tileNb.SE[0], tileNb.SE[1]) === 10) rm |= 2;
          if (mapData.hasRiver(tileNb.SW[0], tileNb.SW[1]) || mapData.getTerrain(tileNb.SW[0], tileNb.SW[1]) === 10) rm |= 4;
          if (mapData.hasRiver(tileNb.NW[0], tileNb.NW[1]) || mapData.getTerrain(tileNb.NW[0], tileNb.NW[1]) === 10) rm |= 8;
          offCtx.drawImage(mapSprites.rivers[rm], sx, sy);
        }

        // Forest/mountain/hill overlays
        if ((ter === 3 || ter === 4 || ter === 5) && mapSprites.forest) {
          let ovi = 0;
          if (mapData.getTerrain(tileNb.NE[0], tileNb.NE[1]) === ter) ovi |= 1;
          if (mapData.getTerrain(tileNb.SE[0], tileNb.SE[1]) === ter) ovi |= 2;
          if (mapData.getTerrain(tileNb.SW[0], tileNb.SW[1]) === ter) ovi |= 4;
          if (mapData.getTerrain(tileNb.NW[0], tileNb.NW[1]) === ter) ovi |= 8;
          if (ter === 3) offCtx.drawImage(mapSprites.forest[ovi], sx, sy);
          else if (ter === 5) offCtx.drawImage(mapSprites.mountains[ovi], sx, sy);
          else offCtx.drawImage(mapSprites.hills[ovi], sx, sy);
        }

        // Roads & Railroads
        const imp = mapData.getImprovements(fp.gx, fp.gy);
        if ((imp.road || imp.railroad || imp.city) && mapSprites.roads) {
          const DIR_KEYS = ['NE','E','SE','S','SW','W','NW','N'];
          for (let di = 0; di < 8; di++) {
            const [nx, ny] = tileNb[DIR_KEYS[di]];
            const nimp = mapData.getImprovements(nx, ny);
            if ((imp.road || imp.city) && (nimp.road || nimp.city)) offCtx.drawImage(mapSprites.roads[di], sx, sy);
            if ((imp.railroad || imp.city) && (nimp.railroad || nimp.city)) offCtx.drawImage(mapSprites.railroads[di], sx, sy);
          }
        }

        // Irrigation / Farmland
        if (imp.irrigation) {
          if (imp.farmland && mapSprites.farmland) offCtx.drawImage(mapSprites.farmland, sx, sy);
          else if (mapSprites.irrigation) offCtx.drawImage(mapSprites.irrigation, sx, sy);
        }

        // Resources
        if (ter === 2) {
          if (mapData.hasShield && mapData.hasShield(fp.gx, fp.gy) && mapSprites.grasslandShield)
            offCtx.drawImage(mapSprites.grasslandShield, sx, sy);
        } else {
          const res = mapData.getResource(fp.gx, fp.gy);
          if (res > 0 && ter <= 10 && mapSprites.resources[ter * 2 + res])
            offCtx.drawImage(mapSprites.resources[ter * 2 + res], sx, sy);
        }

        // Mining (without irrigation) / Pollution
        if (imp.mining && !imp.irrigation && mapSprites.mining) offCtx.drawImage(mapSprites.mining, sx, sy);
        if (imp.pollution && mapSprites.pollution) offCtx.drawImage(mapSprites.pollution, sx, sy);

        // Fortress / Airbase (64×48 sprites, 16px taller than terrain)
        if (imp.fortress) {
          if (imp.airbase && mapSprites.airbase) {
            // Airbase on city tile — recolor per tile owner
            const tileOwner = mapData.getTileOwnership ? mapData.getTileOwnership(fp.gx, fp.gy) : 0;
            const ownerIdx = tileOwner > 0 && tileOwner <= 7 ? tileOwner : 0;
            const hasAir = mapData.units.some(u => u.gx === fp.gx && u.gy === fp.gy && u.type >= 27 && u.type <= 31);
            const baseSprite = (hasAir && mapSprites.airbaseFull) ? mapSprites.airbaseFull : mapSprites.airbase;
            const variantKey = (hasAir ? 'full-' : 'base-') + ownerIdx;
            if (!mapSprites.airbaseColored[variantKey]) {
              const color = CIV_COLORS[ownerIdx] || '#c80000';
              mapSprites.airbaseColored[variantKey] = Civ2Renderer._recolorUnit(baseSprite, color);
            }
            offCtx.drawImage(mapSprites.airbaseColored[variantKey], sx, sy - 16);
          } else if (mapSprites.fortress) {
            offCtx.drawImage(mapSprites.fortress, sx, sy - 16);
          }
        }
      }

      // Enemy units on radius tiles, with fortress/airbase redraw (same layering as main map)
      // Main renderer order: fortress → unit → fortress redraw (so walls surround unit)
      if (mapSprites.unitTemplates && mapSprites.unitColored) {
        for (let i = 0; i < radiusTiles.length; i++) {
          const fp = fullPositions[i];
          const wgx = mapData.wrap ? mapData.wrap(fp.gx) : fp.gx;
          if (fp.gy < 0 || fp.gy >= mapData.mh || wgx < 0 || wgx >= mapData.mw) continue;
          // Find the top unit on this tile that belongs to an enemy
          let drawnUnit = false;
          for (const u of mapData.units) {
            if (u.gx !== wgx || u.gy !== fp.gy) continue;
            if (u.owner === city.owner) continue;
            const template = mapSprites.unitTemplates[u.type];
            if (!template) continue;
            const cacheKey = u.type + '-' + u.owner;
            if (!mapSprites.unitColored[cacheKey]) {
              const color = CIV_COLORS[u.owner] || '#cccccc';
              mapSprites.unitColored[cacheKey] = Civ2Renderer._recolorUnit(template, color);
            }
            offCtx.drawImage(mapSprites.unitColored[cacheKey], fp.px - minPx, fp.py - minPy - 16);
            drawnUnit = true;
            break; // only draw top enemy unit per tile
          }
          // Redraw fortress/airbase over unit so walls surround it
          if (drawnUnit) {
            const imp = mapData.getImprovements(fp.gx, fp.gy);
            if (imp.fortress) {
              const sx = fp.px - minPx, sy = fp.py - minPy;
              if (imp.airbase && mapSprites.airbase) {
                const tileOwner = mapData.getTileOwnership ? mapData.getTileOwnership(fp.gx, fp.gy) : 0;
                const ownerIdx = tileOwner > 0 && tileOwner <= 7 ? tileOwner : 0;
                const hasAir = mapData.units.some(u => u.gx === fp.gx && u.gy === fp.gy && u.type >= 27 && u.type <= 31);
                const variantKey = (hasAir ? 'full-' : 'base-') + ownerIdx;
                if (mapSprites.airbaseColored[variantKey]) {
                  offCtx.drawImage(mapSprites.airbaseColored[variantKey], sx, sy - 16);
                }
              } else if (mapSprites.fortress) {
                offCtx.drawImage(mapSprites.fortress, sx, sy - 16);
              }
            }
          }
        }
      }

      // Black dither at outer edges of radius (unexplored-style shroud)
      // For each radius tile, if a diagonal neighbor is NOT in the radius, dither toward it
      if (mapSprites.ditherMask) {
        const radiusSet = new Set();
        for (const fp of fullPositions) radiusSet.add(`${fp.gx},${fp.gy}`);
        const offImg = offCtx.getImageData(0, 0, offW, offH);
        const offPix = offImg.data;
        for (let i = 0; i < radiusTiles.length; i++) {
          const fp = fullPositions[i];
          const px = fp.px - minPx, py = fp.py - minPy;
          const nb = mapData.getNeighbors(fp.gx, fp.gy);
          for (const dir of ['NE', 'SE', 'SW', 'NW']) {
            const [nx, ny] = nb[dir];
            if (radiusSet.has(`${nx},${ny}`)) continue;
            Civ2Renderer._applyShroudDither(offPix, offW, offH, px, py, mapSprites.ditherMask, dir);
          }
        }
        offCtx.putImageData(offImg, 0, 0);
      }

      // Scale full-res offscreen canvas down to panel
      // fullPos.px * scale = tileGx * TW + parityOff, so destX = minPx * scale + offX
      const scale = sprW / FULL_TW;  // 48/64 = 0.75
      const destX = minPx * scale + offX;
      const destY = minPy * scale + offY;
      ctx.drawImage(offCanvas, 0, 0, offW, offH, destX, destY, offW * scale, offH * scale);

    } else if (mapData.getTerrain) {
      // Fallback: colored diamonds (no terrain sprites available)
      for (let i = 0; i < radiusTiles.length; i++) {
        const rt = radiusTiles[i];
        const tileGx = city.gx + rt.dx;
        const tileGy = city.gy + rt.dy;
        const wgx = mapData.wrap ? mapData.wrap(tileGx) : tileGx;
        const inBounds = tileGy >= 0 && tileGy < mapData.mh && wgx >= 0 && wgx < mapData.mw;
        if (!inBounds) continue;
        const ter = mapData.getTerrain(tileGx, tileGy);
        const fillColor = this.TERRAIN_COLORS[ter] || 'rgb(0,0,0)';
        const sx = tileGx * TW + ((tileGy % 2) ? (TW >> 1) : 0) + offX;
        const sy = tileGy * (TH >> 1) + offY;
        const dcx = sx + (TW >> 1), dcy = sy + (TH >> 1);
        this._diamond(ctx, dcx, dcy, TW >> 2, TH >> 2, fillColor, 'rgb(32,32,32)');
      }
    }

    // Build set of tiles worked by OTHER cities (for white outline)
    const otherWorkedSet = new Set();
    for (let ci = 0; ci < mapData.cities.length; ci++) {
      if (ci === cityIndex) continue;
      const oc = mapData.cities[ci];
      if (!oc || oc.size === 0) continue;
      const ocWorked = this._getWorkedTiles(oc);
      const ocParC = oc.gy & 1;
      for (const wi of ocWorked) {
        const [ddx, ddy] = this.CITY_RADIUS_DOUBLED[wi];
        const parT = ((oc.gy + ddy) % 2 + 2) % 2;
        const tgx = oc.gx + ((ocParC + ddx - parT) >> 1);
        const tgy = oc.gy + ddy;
        otherWorkedSet.add(`${tgx},${tgy}`);
      }
    }

    // White diamond outlines on tiles worked by other cities
    for (let i = 0; i < radiusTiles.length; i++) {
      const rt = radiusTiles[i];
      const tileGx = city.gx + rt.dx;
      const tileGy = city.gy + rt.dy;
      if (!otherWorkedSet.has(`${tileGx},${tileGy}`)) continue;
      const sx = tileGx * TW + ((tileGy % 2) ? (TW >> 1) : 0) + offX;
      const sy = tileGy * (TH >> 1) + offY;
      const dcx = sx + (TW >> 1), dcy = sy + (TH >> 1);
      this._diamond(ctx, dcx, dcy, TW >> 1, TH >> 1, null, 'rgb(255,255,255)');
    }

    // Worker dots on worked tiles (drawn on main ctx at scaled positions)
    for (let i = 0; i < radiusTiles.length; i++) {
      if (!worked.has(i)) continue;
      const rt = radiusTiles[i];
      const tileGx = city.gx + rt.dx;
      const tileGy = city.gy + rt.dy;
      const sx = tileGx * TW + ((tileGy % 2) ? (TW >> 1) : 0) + offX;
      const sy = tileGy * (TH >> 1) + offY;
      const dcx = sx + (TW >> 1), dcy = sy + (TH >> 1);
      ctx.fillStyle = 'rgb(240,220,0)';
      ctx.fillRect(dcx - 1, dcy - 1, 3, 3);
    }

    // City sprite — drawn after all terrain tiles (same as main renderer Pass 4)
    if (mapSprites && mapSprites.city) {
      const epoch = mapData.civTechs
        ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner])
        : 0;
      const row = Civ2Renderer._getCityRow(epoch, city.style || 0);
      let col = Civ2Renderer._getCitySizeCol(city.size, epoch);
      if (city.hasPalace && col < 3) col++;
      if (city.hasWalls) col += 4;
      if (mapSprites.city[row] && mapSprites.city[row][col]) {
        const citySx = city.gx * TW + ((city.gy % 2) ? (TW >> 1) : 0) + offX;
        const citySy = city.gy * (TH >> 1) + offY;
        const citySprH = Math.round(48 * sprH / 32);
        const cityOffY = Math.round(16 * sprH / 32);
        ctx.drawImage(mapSprites.city[row][col], citySx, citySy - cityOffY, sprW, citySprH);
      }
    }

    // Draw small resource icons on worked tiles (food, then shields, then trade)
    // From decompiled FUN_00502798: icons left-aligned at tileX + padding(8),
    // spacing via FUN_00548b70(count, iconSize+1, availW), iconY = tileY + halfH - 5
    if (cdSprites && cdSprites.foodSmall && cdSprites.shieldSmall && cdSprites.tradeSmall) {
      const iconSize = 10;   // FUN_00511690(10) = 10 in mode 2
      const iconPad = 8;     // FUN_00511690(8) = 8 — left/right padding
      const availW = sprW - iconPad * 2;  // 48 - 16 = 32
      for (let i = 0; i < radiusTiles.length; i++) {
        if (!worked.has(i)) continue;
        const rt = radiusTiles[i];
        const tileGx = city.gx + rt.dx;
        const tileGy = city.gy + rt.dy;
        const wgx = mapData.wrap ? mapData.wrap(tileGx) : tileGx;
        if (tileGy < 0 || tileGy >= mapData.mh || wgx < 0 || wgx >= mapData.mw) continue;

        const isCenter = (i === 20);
        const [food, shields, trade] = this._getTileYields(tileGx, tileGy, isCenter, city, cityIndex, mapData);
        const totalIcons = food + shields + trade;
        if (totalIcons === 0) continue;

        // Game uses iconSize+1 for spacing (1px gap at natural spacing)
        const { spacing } = this._iconSpacing(totalIcons, iconSize + 1, availW);

        const sx = tileGx * TW + ((tileGy % 2) ? (TW >> 1) : 0) + offX;
        const sy = tileGy * (TH >> 1) + offY;
        const startX = sx + iconPad;  // left-aligned at tile + padding
        const iconY = sy + (TH >> 1) - (iconSize >> 1);

        let idx = 0;
        for (let f = 0; f < food; f++, idx++)
          ctx.drawImage(cdSprites.foodSmall, startX + idx * spacing, iconY, iconSize, iconSize);
        for (let s = 0; s < shields; s++, idx++)
          ctx.drawImage(cdSprites.shieldSmall, startX + idx * spacing, iconY, iconSize, iconSize);
        for (let t = 0; t < trade; t++, idx++)
          ctx.drawImage(cdSprites.tradeSmall, startX + idx * spacing, iconY, iconSize, iconSize);
      }
    }
  },

  // Compute gross tile trade by summing per-tile yields across all worked tiles.
  // Used to derive corruption = grossTileTrade - netBaseTrade (city+30).
  _calcGrossTileTrade(city, cityIndex, mapData) {
    const worked = this._getWorkedTiles(city);
    const cx = city.gx, cy = city.gy;
    const parC = cy & 1;
    let gross = 0;
    for (let i = 0; i < this.CITY_RADIUS_DOUBLED.length; i++) {
      if (!worked.has(i)) continue;
      const [ddx, ddy] = this.CITY_RADIUS_DOUBLED[i];
      const parT = ((cy + ddy) % 2 + 2) % 2;
      const tileGx = cx + ((parC + ddx - parT) >> 1);
      const tileGy = cy + ddy;
      const isCenter = (i === 20);
      const [, , trade] = this._getTileYields(tileGx, tileGy, isCenter, city, cityIndex, mapData);
      gross += trade;
    }
    return gross;
  },

  // Compute gross food by summing per-tile food yields across all worked tiles.
  _calcGrossFood(city, cityIndex, mapData) {
    const worked = this._getWorkedTiles(city);
    const cx = city.gx, cy = city.gy;
    const parC = cy & 1;
    let gross = 0;
    for (let i = 0; i < this.CITY_RADIUS_DOUBLED.length; i++) {
      if (!worked.has(i)) continue;
      const [ddx, ddy] = this.CITY_RADIUS_DOUBLED[i];
      const parT = ((cy + ddy) % 2 + 2) % 2;
      const tileGx = cx + ((parC + ddx - parT) >> 1);
      const tileGy = cy + ddy;
      const isCenter = (i === 20);
      const [food] = this._getTileYields(tileGx, tileGy, isCenter, city, cityIndex, mapData);
      gross += food;
    }
    return gross;
  },

  // Compute gross shields (after factory/mfg/power multipliers, before waste).
  // Binary: FUN_004e9c14 lines 3693-3737, DAT_006a65cc after multiplier application.
  _calcGrossShields(city, cityIndex, mapData) {
    const worked = this._getWorkedTiles(city);
    const cx = city.gx, cy = city.gy;
    const parC = cy & 1;
    let base = 0;
    for (let i = 0; i < this.CITY_RADIUS_DOUBLED.length; i++) {
      if (!worked.has(i)) continue;
      const [ddx, ddy] = this.CITY_RADIUS_DOUBLED[i];
      const parT = ((cy + ddy) % 2 + 2) % 2;
      const tileGx = cx + ((parC + ddx - parT) >> 1);
      const tileGy = cy + ddy;
      const isCenter = (i === 20);
      const [, shields] = this._getTileYields(tileGx, tileGy, isCenter, city, cityIndex, mapData);
      base += shields;
    }

    // Factory (building 15) and Mfg. Plant (building 16): each +2 to factoryMult
    let factoryMult = 0;
    if (this._cityHasBuilding(city, 15)) factoryMult += 2;
    if (this._cityHasBuilding(city, 16)) factoryMult += 2;

    // Power sources: Power Plant (19), Hydro Plant (20), Nuclear Plant (21),
    // Solar Plant (29), or Hoover Dam wonder (22) for all civ cities
    let powerMult = 0;
    if (this._cityHasBuilding(city, 19) || this._cityHasBuilding(city, 20) ||
        this._cityHasBuilding(city, 21) || this._cityHasBuilding(city, 29)) {
      powerMult = 2;
    } else if (this._civHasWonder(mapData, city.owner, 22)) {
      powerMult = 2;  // Hoover Dam acts as hydro for all owner's cities
    }

    // Power capped by factory (binary line 3733-3734)
    if (powerMult > factoryMult) powerMult = factoryMult;

    // Apply multipliers (binary line 3736-3737)
    return base + ((base * factoryMult) >> 2) + ((base * powerMult) >> 2);
  },

  _drawResourceRows(ctx, city, cityIndex, cdSprites, civData, supported, mapData) {
    if (!cdSprites) return;
    const RES = this.REGIONS.resources;

    const dpr = window.devicePixelRatio || 1;
    // Trade/corruption computed fresh from tiles + distance formula (FUN_004ea8e4 lines 4027-4034)
    // Stored values (city.netBaseTrade, city.totalTrade) may be stale from previous government
    const grossTileTrade = this._calcGrossTileTrade(city, cityIndex, mapData);
    const corruption = this._calcTradeCorruption(city, grossTileTrade, mapData);
    const netTileTrade = Math.max(0, grossTileTrade - corruption);
    // Full trade distribution from fresh net trade (FUN_004ea1f6)
    const dist = this._computeTradeDistribution(netTileTrade, city, cityIndex, civData, mapData);
    // Support cost: only units exceeding free support limit (government-dependent)
    const government = this._getCityGovernment(city, mapData);
    const overlays = this._calcUnitSupportOverlays(supported, city, government, mapData);
    const support = overlays.filter(ov => ov.shield).length;
    const grossShields = this._calcGrossShields(city, cityIndex, mapData);
    const waste = this._calcShieldWaste(city, grossShields, support, mapData);
    const surplus = Math.max(0, grossShields - support - waste);
    const sciRate = civData ? (civData.scienceRate || 0) * 10 : 0;
    const taxRate = civData ? (civData.taxRate || 0) * 10 : 0;
    const luxRate = 100 - sciRate - taxRate;

    // Row 1: FOOD
    // Binary FUN_004e7eb1: consumption = city.size * food_per_citizen + settlers * settler_food_cost
    // Compute food from worked tiles (city.foodProduction from .sav is a stale cached value)
    const foodR = RES.food;
    const foodTotal = this._calcGrossFood(city, cityIndex, mapData);
    const settlerFoodSupport = overlays.reduce((sum, ov) => sum + ov.food, 0);
    const foodConsumption = city.size * 2 + settlerFoodSupport;
    const foodSurplus = foodTotal - foodConsumption;
    // Binary FUN_005025d5 line 1609: "Food:" label shows consumption (not production)
    const foodEaten = foodSurplus >= 0 ? foodConsumption : foodTotal;
    ctx.font = '600 12px Arial, sans-serif';
    ctx.textAlign = 'left';
    this._text(ctx, `Food: ${foodEaten}`, foodR.textX, foodR.textY, 'rgb(87,171,39)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Surplus: ${foodSurplus}`, foodR.rightX, foodR.textY, 'rgb(63,139,31)');
    ctx.textAlign = 'left';
    // Binary FUN_005025d5 lines 1481-1489: left icons = consumed, right = surplus/hunger
    // Total icons = max(foodTotal, foodConsumption)
    const foodIconCount = Math.max(foodTotal, foodConsumption);
    const foodSpacing = this._resourceSpacing(foodIconCount);
    // Light green fill covers full row — CITY.GIF wallpaper color rgb(59,142,25)
    // Snap to device pixels to avoid sub-pixel seams (same as shield row)
    const foodBarY = Math.round(75 * dpr) / dpr;
    const foodBarB = Math.round(91 * dpr) / dpr;
    const foodBarH = foodBarB - foodBarY;
    ctx.fillStyle = 'rgb(59,142,25)';
    ctx.fillRect(199, foodBarY, foodR.rightX - 199, foodBarH);
    // Left: food consumed icons (population + settlers)
    for (let i = 0; i < foodEaten; i++)
      ctx.drawImage(cdSprites.food, foodR.iconX + i * foodSpacing, foodR.iconY + 1, 14, 14);
    // Right: surplus food or hunger icons
    if (foodSurplus < 0) {
      const hungerCount = Math.abs(foodSurplus);
      const hungerStartX = foodR.rightX - (foodSpacing * hungerCount + 14 - foodSpacing);
      for (let i = 0; i < hungerCount; i++)
        ctx.drawImage(cdSprites.hunger, hungerStartX + i * foodSpacing, foodR.iconY + 1, 14, 14);
    } else if (foodSurplus > 0) {
      const surpStartX = foodR.rightX - (foodSpacing * foodSurplus + 14 - foodSpacing);
      ctx.fillStyle = 'rgb(44,119,19)';
      ctx.fillRect(surpStartX - 2, foodBarY, (foodSurplus - 1) * foodSpacing + 14 + 2, foodBarH);
      for (let i = 0; i < foodSurplus; i++)
        ctx.drawImage(cdSprites.food, surpStartX + i * foodSpacing, foodR.iconY + 1, 14, 14);
    }

    // Row 2: TRADE
    const tradeR = RES.trade;
    const tradeTotal = netTileTrade;
    ctx.textAlign = 'left';
    this._text(ctx, `Trade: ${tradeTotal}`, tradeR.textX, tradeR.textY, 'rgb(239,159,7)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Corruption: ${corruption}`, tradeR.rightX, tradeR.textY, 'rgb(227,83,15)');
    ctx.textAlign = 'left';
    const tradeIconCount = tradeTotal + corruption;
    const tradeSpacing = this._resourceSpacing(tradeIconCount);
    for (let i = 0; i < tradeTotal; i++)
      ctx.drawImage(cdSprites.trade, tradeR.iconX + 1 + i * tradeSpacing, tradeR.iconY - 1, 14, 14);
    if (corruption > 0) {
      const corrStartX = tradeR.rightX - 2 - (tradeSpacing * corruption + 14 - tradeSpacing);
      // Corruption background bar — dark orange, matching CITY.GIF tax/lux/sci wallpaper
      // Bar covers full row height, extends 2px left and 1px right of sprites
      ctx.fillStyle = 'rgb(226,82,13)';
      ctx.fillRect(corrStartX - 2, tradeR.y, (corruption - 1) * tradeSpacing + 14 + 3, tradeR.h);
      for (let i = 0; i < corruption; i++)
        ctx.drawImage(cdSprites.corruption, corrStartX + i * tradeSpacing, tradeR.iconY - 1, 14, 14);
    }

    // Row 3: TAX / LUX / SCI — matching binary FUN_005025d5 lines 1949-2117
    const tlsR = RES.taxLuxSci;
    const taxCount = dist.tax;
    const sciCount = dist.sci;
    const luxCount = dist.lux;

    // Text labels: tax left, lux center, sci right (normal case)
    const textY = tlsR.iconY + 1 + 14 + 2;
    ctx.font = '600 12px Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    this._text(ctx, `${taxRate}% Tax: ${taxCount}`, tlsR.textX, textY, 'rgb(239,159,7)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'center';
    this._text(ctx, `${luxRate}% Lux: ${luxCount}`, tlsR.centerX, textY, 'rgb(255,255,255)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `${sciRate}% Sci: ${sciCount}`, tlsR.rightX, textY, 'rgb(63,187,199)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // CITY.GIF wallpaper already provides the correct background for this row
    const iconY = tlsR.iconY + 1;

    // Icon layout: shared spacing with group separator gaps (binary lines 1949-2057)
    const totalIcons = taxCount + luxCount + sciCount;
    if (totalIcons > 0) {
      const iconEffSize = 15;  // FUN_00511690(0xe) + 1 = 14 + 1 (icon + 1px gap)
      const groupGap = 4;      // FUN_00511690(4)
      const fullAvailW = tlsR.rightX - tlsR.iconX - 2;  // binary: 0xe2 - 2

      // Count non-zero groups and subtract separator gaps
      const groups = (taxCount > 0 ? 1 : 0) + (luxCount > 0 ? 1 : 0) + (sciCount > 0 ? 1 : 0);
      const numSeps = Math.max(0, groups - 1);
      const adjTotal = totalIcons - numSeps;
      const adjAvailW = fullAvailW - numSeps * (iconEffSize + groupGap);

      const { spacing } = this._iconSpacing(adjTotal, iconEffSize, adjAvailW);

      // Tax group width and science group width
      const taxGW = taxCount > 0 ? 1 + (taxCount - 1) * spacing + iconEffSize : 0;
      const sciGW = sciCount > 0 ? 1 + (sciCount - 1) * spacing + iconEffSize : 0;

      // Tax: left-aligned at left edge + 1
      const taxStartX = tlsR.iconX + 1;
      for (let i = 0; i < taxCount; i++)
        ctx.drawImage(cdSprites.tax, taxStartX + i * spacing, iconY, 14, 14);

      // Science: right-aligned
      const sciStartX = tlsR.iconX + (tlsR.rightX - tlsR.iconX) - sciGW;
      for (let i = 0; i < sciCount; i++)
        ctx.drawImage(cdSprites.science, sciStartX + i * spacing, iconY, 14, 14);

      // Luxury: centered in remaining middle space
      if (luxCount > 0) {
        const luxGW = 1 + (luxCount - 1) * spacing + iconEffSize;
        // Middle space = full width minus tax, sci, and gaps
        let midLeft = tlsR.iconX;
        let midRight = tlsR.rightX;
        if (taxCount > 0) midLeft = tlsR.iconX + taxGW + groupGap;
        if (sciCount > 0) midRight = sciStartX - groupGap;
        const midSpace = midRight - midLeft;
        const luxStartX = midLeft + Math.floor((midSpace - luxGW) / 2);
        for (let i = 0; i < luxCount; i++)
          ctx.drawImage(cdSprites.luxury, luxStartX + i * spacing, iconY, 14, 14);
      }
    }

    // Row 4: SUPPORT + WASTE + PRODUCTION
    // Binary FUN_005025d5 lines 1746-1850: three groups left-to-right
    // Support (palette 0x54), Waste (palette 0x0B), Production (palette 0x5C)
    const spR = RES.supportProd;
    const spTextY = spR.iconY + 14 + 3;  // 3px below bottom of icon row
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    this._text(ctx, `Support: ${support}`, spR.textX, spTextY, 'rgb(63,79,167)', '600 12px Arial, sans-serif');
    ctx.textAlign = 'right';
    this._text(ctx, `Production: ${surplus}`, spR.rightX, spTextY, 'rgb(7,11,103)');
    if (waste > 0) {
      ctx.textAlign = 'center';
      ctx.font = '600 12px Arial, sans-serif';
      ctx.fillStyle = 'rgb(11,11,11)';
      ctx.fillText(`Waste: ${waste}`, (spR.textX + spR.rightX) / 2, spTextY);
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const spTotal = support + waste + surplus;
    const spSpacing = this._resourceSpacing(spTotal);
    // Bar height = FUN_00511690(0x0E) + FUN_00511690(0x02) = 14 + 2 = 16
    // Snap bar coords to device pixels to avoid sub-pixel seam at non-integer DPR
    const barY = Math.round(181 * dpr) / dpr;
    const barB = Math.round(197 * dpr) / dpr;
    const barH = barB - barY;
    // Support bar (full width) — CITY.GIF wallpaper color rgb(94,103,170)
    ctx.fillStyle = 'rgb(94,103,170)';
    ctx.fillRect(spR.x, barY, spR.rightX - spR.x, barH);
    // Support icons (left-aligned)
    for (let i = 0; i < support; i++)
      ctx.drawImage(cdSprites.shields, spR.iconX + i * spSpacing, spR.iconY + 1, 14, 14);
    // Production/surplus start X (needed by waste bar to know where to extend to)
    const prodStartX = surplus > 0 ? spR.rightX - (spSpacing * surplus + 14 - spSpacing) : spR.rightX;
    // Waste bar + icons (after support) — game palette 0x0B = rgb(11,11,11)
    // Bar extends from waste icons all the way to the left edge of the production bar
    if (waste > 0) {
      const wasteBarLeft = spR.iconX + support * spSpacing - 1;
      const wasteBarRight = prodStartX - 2;
      const wasteBarW = wasteBarRight - wasteBarLeft;
      ctx.fillStyle = 'rgb(11,11,11)';
      ctx.fillRect(wasteBarLeft, barY, wasteBarW, barH);
      const wasteIconsW = (waste - 1) * spSpacing + 14;
      const wasteCenterX = wasteBarLeft + (wasteBarW - wasteIconsW) / 2;
      for (let i = 0; i < waste; i++)
        ctx.drawImage(cdSprites.shortage, wasteCenterX + i * spSpacing, spR.iconY + 1, 14, 14);
    }
    // Production/surplus bar + icons (right-aligned) — game palette 0x5C
    if (surplus > 0) {
      ctx.fillStyle = 'rgb(10,11,102)';
      ctx.fillRect(prodStartX - 2, barY, (surplus - 1) * spSpacing + 14 + 2, barH);
      for (let i = 0; i < surplus; i++)
        ctx.drawImage(cdSprites.shields, prodStartX + i * spSpacing, spR.iconY + 1, 14, 14);
    }
  },

  _drawFoodStorage(ctx, city, cityIndex, cdSprites, mapData) {
    if (!(cdSprites && cdSprites.food)) return;
    const R = this.REGIONS.foodStorage;
    const hasGranary = city.buildings ? city.buildings.has(3) : false;
    const pyramids = mapData && mapData.gameState && mapData.gameState.wonders &&
      mapData.gameState.wonders[0];
    const hasPyramids = pyramids && pyramids.cityIndex != null && !pyramids.destroyed &&
      mapData.cities[pyramids.cityIndex] && mapData.cities[pyramids.cityIndex].owner === city.owner;
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
    const foodSurplus = this._calcGrossFood(city, cityIndex, mapData) - (city.size * 2);
    const turnsToGrow = foodSurplus > 0 ? Math.ceil((foodToGrow - foodStored) / foodSurplus) : 0;
    // No progress text — the real game doesn't show numeric text here
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
          const ux = R.unitSprite.x, uy = R.unitSprite.y;
          const dw = R.unitSprite.w, dh = R.unitSprite.h;
          ctx.drawImage(colored, ux, uy, dw, dh);
          // Shield
          const so = mapSprites.shieldOffsets ? mapSprites.shieldOffsets[item.id] : null;
          if (so && mapSprites.shieldFront) {
            const scale = dw / 64;
            const shieldX = ux + (so.x - 1) * scale;
            const shieldY = uy + (so.y - 1) * scale;
            const shW = mapSprites.shieldFront.width * scale;
            const shH = mapSprites.shieldFront.height * scale;
            if (mapSprites.shieldShadow) {
              const sdx = (so.x < 32) ? -1 : 1;
              ctx.drawImage(mapSprites.shieldShadow, shieldX + sdx * scale, shieldY + scale, shW, shH);
            }
            const frontKey = 'shieldFront-' + city.owner;
            if (!mapSprites.shieldFrontColored[frontKey]) {
              mapSprites.shieldFrontColored[frontKey] = Civ2Renderer._recolorUnit(mapSprites.shieldFront, ownerColor);
            }
            ctx.drawImage(mapSprites.shieldFrontColored[frontKey], shieldX, shieldY, shW, shH);
            // Full health bar — green, 12×3px at full res
            const barW = 12 * scale, barH = Math.max(1, 3 * scale);
            const barX = shieldX, barY = shieldY + 2 * scale;
            ctx.fillStyle = 'rgb(87,171,39)';
            ctx.fillRect(barX, barY, barW, barH);
            // Order letter: dash (no orders)
            const fontSize = Math.max(7, Math.round(13 * scale));
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#000';
            ctx.fillText('-', shieldX + shW / 2, shieldY + 7 * scale);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
          }
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

    // Shield grid — production progress display
    // Binary: FUN_0050503e lines 2327-2376. DAT_006a657c = shields_per_row (10 for human, standard COSMIC)
    // baseCost = RULES.TXT raw cost (shield rows, same scale as production)
    // baseCost < 10: rows=baseCost, cols=10. baseCost >= 10: rows=10, cols=baseCost
    // Only filled shields drawn; short items bottom-aligned in fixed 10-row frame
    if (cdSprites && cdSprites.shields) {
      const SG = R.shieldGrid;
      const cost = this._getProductionCost(item);
      const stored = city.shieldsInBox || 0;
      const baseCost = Math.round(cost / 10);
      const shieldsPerRow = baseCost < 10 ? 10 : baseCost;
      const numRows = baseCost < 10 ? baseCost : 10;

      if (cost > 0) {
        // 3D bevel frame — scaled to numRows (not always full 10-row height)
        // Palette 0x51=rgb(83,103,191) highlight (top/left), 0x5D=rgb(0,0,95) shadow (bottom/right)
        const fX = SG.gridX + 3, fY = SG.gridY + 3;
        const fW = SG.gridW - 6;
        const rowSpacing = 14;
        const fH = numRows * rowSpacing + 6;  // rows × 14px + padding
        ctx.strokeStyle = 'rgb(83,103,191)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(fX, fY); ctx.lineTo(fX + fW, fY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(fX, fY); ctx.lineTo(fX, fY + fH); ctx.stroke();
        ctx.strokeStyle = 'rgb(0,0,63)';
        ctx.beginPath(); ctx.moveTo(fX, fY + fH); ctx.lineTo(fX + fW, fY + fH); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(fX + fW, fY); ctx.lineTo(fX + fW, fY + fH); ctx.stroke();
        // Col spacing: shieldsPerRow icons of 17px width (binary: FUN_00548b70(DAT_006a657c, 0x11, width))
        const colSpacing = this._iconSpacing(shieldsPerRow, 17, fW).spacing;

        // Center horizontally if icons don't fill the width
        const totalIconW = colSpacing * (shieldsPerRow - 1) + 17;
        const centerOffset = totalIconW < fW ? Math.floor((fW - totalIconW) / 2) : 0;

        // Inner draw origin: frame + 1px + centering + 2px padding (binary lines 2358-2359)
        const drawX = fX + 1 + centerOffset + 2;
        const drawY = fY + 1 + 2;

        // Draw only filled shields — no dimmed placeholders (binary loop: lines 2365-2375)
        let remaining = stored;
        for (let row = 0; row < numRows && remaining > 0; row++) {
          const thisRow = Math.min(shieldsPerRow, remaining);
          for (let col = 0; col < thisRow; col++) {
            const sx = drawX + col * colSpacing;
            const sy = drawY + row * rowSpacing;
            ctx.drawImage(cdSprites.shields, sx, sy, 14, 14);
          }
          remaining -= thisRow;
        }

        // No progress text — the real game doesn't show numeric text here
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

  // Draw a unit sprite with shield, HP bar, order letter, and fortification overlay.
  // Scaled from full-res (64×48 unit, 12×20 shield) to the given drawW × drawH.
  // city: optional, used for harbor dimming of sea units
  _drawUnitWithState(ctx, u, colored, mapSprites, ux, uy, drawW, drawH, city) {
    const scale = drawW / 64;  // scale factor from full-res

    // Sentry/sleep dimming: orders 0x03 → dark gray silhouette (palette 0x1a = rgb(135,135,135))
    // Also sea-domain units (types 32-43) in cities with harbor (building 30)
    // Binary: FUN_0056baff lines 3925-3941
    const isSeaDomain = (u.type >= 32 && u.type <= 43);
    const hasHarbor = city && city.buildings && city.buildings.has(30);
    const isDimmed = (u.orders === 'sleep' || u.orders === 'sentry') || (isSeaDomain && hasHarbor);

    let sprite = colored;
    if (isDimmed) {
      const dimKey = u.type + '-dimmed';
      if (mapSprites.unitColored && !mapSprites.unitColored[dimKey]) {
        mapSprites.unitColored[dimKey] = Civ2Renderer._dimUnit(colored);
      }
      sprite = (mapSprites.unitColored && mapSprites.unitColored[dimKey]) || Civ2Renderer._dimUnit(colored);
    }
    ctx.drawImage(sprite, ux, uy, drawW, drawH);

    // Shield with HP bar and order letter
    const so = mapSprites.shieldOffsets ? mapSprites.shieldOffsets[u.type] : null;
    if (so && mapSprites.shieldFront) {
      const shieldX = ux + (so.x - 1) * scale;
      const shieldY = uy + (so.y - 1) * scale;
      const shW = mapSprites.shieldFront.width * scale;
      const shH = mapSprites.shieldFront.height * scale;

      // Shadow
      if (mapSprites.shieldShadow) {
        const sdx = (so.x < 32) ? -1 : 1;
        ctx.drawImage(mapSprites.shieldShadow, shieldX + sdx * scale, shieldY + scale, shW, shH);
      }

      // Front shield (civ-colored with blacked-out top)
      const frontKey = 'shieldFront-' + u.owner;
      if (!mapSprites.shieldFrontColored[frontKey]) {
        const color = CIV_COLORS[u.owner] || '#cccccc';
        mapSprites.shieldFrontColored[frontKey] = Civ2Renderer._recolorUnit(mapSprites.shieldFront, color);
      }
      ctx.drawImage(mapSprites.shieldFrontColored[frontKey], shieldX, shieldY, shW, shH);

      // HP bar — offset (0,2) from shield, 12×3px at full res
      const maxHp = Civ2Renderer.UNIT_MAX_HP[u.type] || 10;
      const curHp = Math.max(0, maxHp - u.movesRemain);
      const barW = 12 * scale, barH = Math.max(1, 3 * scale);
      const barX = shieldX, barY = shieldY + 2 * scale;
      const greenW = Math.floor((curHp / maxHp) * barW);
      if (greenW > barW * 2/3) ctx.fillStyle = 'rgb(87,171,39)';
      else if (greenW > barW / 3) ctx.fillStyle = 'rgb(255,223,79)';
      else ctx.fillStyle = 'rgb(243,0,0)';
      ctx.fillRect(barX, barY, greenW, barH);

      // Order letter
      const orderLetter = Civ2Renderer.ORDER_KEYS[u.orders] || '-';
      const fontSize = Math.max(7, Math.round(13 * scale));
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#000';
      ctx.fillText(orderLetter, shieldX + shW / 2, shieldY + 7 * scale);

    }

    // Fortification overlay — only for fully fortified (0x02)
    if (mapSprites.fortify && u.orders === 'fortified') {
      ctx.drawImage(mapSprites.fortify, ux, uy, drawW, drawH);
    }

    // Reset text state
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  },

  _drawUnitsSupported(ctx, supported, mapSprites, city, mapData, cdSprites) {
    const R = this.REGIONS.unitsSupported;
    // Panel outer bounds from decompiled citywin_8C84: (0, 0xD4, 0xC0, 0x4E)
    const PX = 0, PY = 212, PW = 192, PH = 78;

    if (supported.length < 5) {
      this._label(ctx, 'Units Supported', R.x + R.w / 2, R.y + 12);
    }

    if (!(mapSprites && mapSprites.unitTemplates && supported.length > 0)) return;

    const government = this._getCityGovernment(city, mapData);
    const overlays = this._calcUnitSupportOverlays(supported, city, government, mapData);
    const epoch = mapData.civTechs ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner]) : 0;
    const eraRow = Math.min(epoch, 3);

    // All dimensions from FUN_00472cf0(base, -3) = floor(5 * base / 8)
    const unitW = 43;       // FUN_00472cf0(0x45, -3)
    const unitH = 32;       // FUN_00472cf0(0x34, -3)
    const iconYOff = 20;    // FUN_00472cf0(0x20, -3) — icon Y offset from unit top
    const iconAvailW = 40;  // FUN_00472cf0(0x40, -3) — available width for icons
    const iconSize = 10;    // FUN_00511690(10) in mode 2

    const maxRows = Math.floor(PH / unitH);  // 78/32 = 2
    const singleRow = supported.length <= Math.floor(PW / unitW);
    // Dynamic perRow: when many units, compress to fit all
    const basePerRow = Math.floor(PW / unitW);  // 4 at normal spacing
    const perRow = singleRow ? basePerRow
      : Math.max(basePerRow, Math.ceil(supported.length / maxRows));
    const colSpacing = Math.min(unitW, Math.floor(PW / perRow));
    const maxShow = supported.length;  // show ALL supported units

    // Centering offsets (from decompiled FUN_00505666)
    const xStart = PX + ((PW - colSpacing * Math.min(perRow, supported.length) + 3) >> 1);
    const yStart = singleRow
      ? PY + ((PH - 30) >> 1)                              // 212 + 24 = 236
      : PY + ((PH - unitH * maxRows + 2) >> 1);            // 212 + 8 = 220

    // Clip to panel bounds
    ctx.save();
    ctx.beginPath();
    ctx.rect(PX, PY, PW, PH);
    ctx.clip();

    let col = 0, row = 0;
    for (let idx = 0; idx < maxShow; idx++) {
      const u = supported[idx];
      if (!u || u.gx < 0) continue;
      const template = mapSprites.unitTemplates[u.type];
      if (!template) continue;
      const cacheKey = `${u.type}-${u.owner}`;
      let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
      if (!colored) {
        colored = Civ2Renderer._recolorUnit(template, CIV_COLORS[u.owner] || '#ccc');
      }
      const ux = xStart + col * colSpacing;
      const uy = yStart + row * unitH;
      this._drawUnitWithState(ctx, u, colored, mapSprites, ux, uy, unitW, unitH, city);

      // Draw support overlay icons (left-aligned at unit X, Y offset from top)
      const ov = overlays[idx];
      if (ov && cdSprites) {
        const numIcons = ov.food + (ov.shield ? 1 : 0) + ov.unhappy;
        if (numIcons > 0) {
          const { spacing } = this._iconSpacing(numIcons, iconSize, Math.min(iconAvailW, colSpacing - 3));
          let ix = ux;
          const iy = uy + iconYOff;

          for (let f = 0; f < ov.food; f++) {
            if (cdSprites.foodSmall) ctx.drawImage(cdSprites.foodSmall, ix, iy, iconSize, iconSize);
            ix += spacing;
          }
          if (ov.shield) {
            if (cdSprites.shieldSmall) ctx.drawImage(cdSprites.shieldSmall, ix, iy, iconSize, iconSize);
            ix += spacing;
          }
          for (let h = 0; h < ov.unhappy; h++) {
            const faceSprite = ov.unhappyType === 2 ? cdSprites.madFaceGray : cdSprites.madFaceRed;
            if (faceSprite) ctx.drawImage(faceSprite, ix, iy, iconSize, iconSize);
            ix += spacing;
          }
        }
      }

      col++;
      if (col >= perRow) {
        col = 0;
        row++;
        if (row >= maxRows) break;
      }
    }
    ctx.restore();
  },

  _drawImprovements(ctx, city, cityIndex, mapData, cdSprites) {
    const improvements = this.getCityImprovements(city, cityIndex, mapData);
    if (!(improvements.length > 0 && cdSprites)) return;
    const R = this.REGIONS.improvements;
    const C = this.COL;
    ctx.font = '600 11px Arial, sans-serif';
    for (let i = 0; i < Math.min(R.maxRows, improvements.length); i++) {
      const imp = improvements[i];
      const thumb = imp.isWonder ? cdSprites.wonders[imp.id - 39] : cdSprites.improvements[imp.id];
      if (thumb) {
        ctx.drawImage(thumb, R.thumbX, R.thumbY + R.rowH * i, R.thumbW, R.thumbH);
      }
      const nameColor = '#fff';
      ctx.textBaseline = 'middle';
      this._text(ctx, imp.name, R.nameX, R.thumbY + R.rowH * i + R.thumbH / 2, nameColor);
      ctx.textBaseline = 'alphabetic';
      if (!imp.isWonder && cdSprites.sellIcon) {
        ctx.drawImage(cdSprites.sellIcon, R.sellX, R.sellY + R.rowH * i, R.sellSize, R.sellSize);
      }
    }

    // Scrollbar (visual-only, Windows 95 classic style) — MSScrollBarClass, SM_CXVSCROLL=17
    const sbX = 175, sbY = 291, sbW = 17, sbH = 129;
    const btnH = 17;
    const face = 'rgb(192,192,192)', hi = 'rgb(255,255,255)', shadow = 'rgb(128,128,128)', dark = 'rgb(0,0,0)';

    // Helper: Win95 4-color bevel (white highlight, face, shadow, dark)
    const bevel = (x, y, w, h) => {
      ctx.fillStyle = face;
      ctx.fillRect(x, y, w, h);
      // Outer highlight (white) — top & left
      ctx.fillStyle = hi;
      ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y, 1, h);
      // Inner shadow (gray) — bottom & right inner edge
      ctx.fillStyle = shadow;
      ctx.fillRect(x + 1, y + h - 2, w - 2, 1); ctx.fillRect(x + w - 2, y + 1, 1, h - 2);
      // Outer dark (black) — bottom & right outer edge
      ctx.fillStyle = dark;
      ctx.fillRect(x, y + h - 1, w, 1); ctx.fillRect(x + w - 1, y, 1, h);
    };

    // Track — Win95 dithered checkerboard pattern
    const trackTop = sbY + btnH;
    const trackH = sbH - btnH * 2;
    ctx.fillStyle = face;
    ctx.fillRect(sbX, sbY, sbW, sbH);
    // Dither pattern on track area
    for (let py = trackTop; py < trackTop + trackH; py++) {
      for (let px = sbX; px < sbX + sbW; px++) {
        if ((px + py) % 2 === 0) {
          ctx.fillStyle = hi;
          ctx.fillRect(px, py, 1, 1);
        }
      }
    }

    // Up button
    bevel(sbX, sbY, sbW, btnH);
    // Up arrow — Win95 style: small 5×3 triangle
    ctx.fillStyle = dark;
    const uCx = sbX + 8, uCy = sbY + 6;
    for (let row = 0; row < 4; row++) {
      ctx.fillRect(uCx - row, uCy + row, 1 + row * 2, 1);
    }

    // Down button
    const dbY = sbY + sbH - btnH;
    bevel(sbX, dbY, sbW, btnH);
    // Down arrow — inverted
    ctx.fillStyle = dark;
    const dCx = sbX + 8, dCy = dbY + btnH - 7;
    for (let row = 0; row < 4; row++) {
      ctx.fillRect(dCx - row, dCy - row, 1 + row * 2, 1);
    }

    // Proportional thumb
    const totalItems = improvements.length;
    const thumbH = Math.max(12, Math.round(trackH * Math.min(R.maxRows, totalItems) / Math.max(totalItems, 1)));
    bevel(sbX, trackTop, sbW, thumbH);
  },

  infoPanelMode: 0,

  _drawInfoPanel(ctx, city, mapData, cdSprites, mapSprites, computed, happiness) {
    const R = this.REGIONS.infoPanel;
    const C = this.COL;
    const mode = this.infoPanelMode || 0;

    if (mode === 0) {
      // Mode 0: Units Present + trade text
      this._drawInfoPanelUnits(ctx, city, mapData, cdSprites, mapSprites, computed);
    } else if (mode === 1) {
      // Mode 1: Mini-map
      this._drawInfoPanelMap(ctx, city, mapData);
    } else if (mode === 2) {
      // Mode 2: Happiness
      this._drawInfoPanelHappy(ctx, city, happiness);
    }
  },

  _drawInfoPanelUnits(ctx, city, mapData, cdSprites, mapSprites, computed) {
    const R = this.REGIONS.infoPanel;
    const C = this.COL;
    const garrison = this.getGarrisonedUnits(city, mapData);

    if (garrison.length < 6) {
      this._label(ctx, 'Units Present', R.x + R.w / 2, R.y + 12);
    }

    if (mapSprites && mapSprites.unitTemplates && garrison.length > 0) {
      ctx.font = '600 9px Arial, sans-serif';
      for (let i = 0; i < Math.min(18, garrison.length); i++) {
        const u = garrison[i];
        const template = mapSprites.unitTemplates[u.type];
        if (!template) continue;
        const cacheKey = `${u.type}-${u.owner}`;
        let colored = mapSprites.unitColored && mapSprites.unitColored[cacheKey];
        if (!colored) {
          colored = Civ2Renderer._recolorUnit(template, CIV_COLORS[u.owner] || '#ccc');
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
        this._drawUnitWithState(ctx, u, colored, mapSprites, ux, uy, 48, 36, city);
        if (i < 10) {
          const homeCity = u.homeCityId !== 0xFFFF && u.homeCityId !== 0x00FF
            ? mapData.cities[u.homeCityId] : null;
          const abbr = homeCity ? (homeCity.name.length < 3 ? homeCity.name : homeCity.name.substring(0, 3)) : 'NON';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.font = '500 12px Arial, sans-serif';
          ctx.fillStyle = 'rgb(0,0,0)';
          ctx.fillText(abbr, ux + 24, uy + 36);
          ctx.textBaseline = 'alphabetic';
          ctx.textAlign = 'left';
        }
      }
    }

    // Trade text at bottom of info panel
    // Use freshly computed supply/demand (FUN_0043d400 port) when available, fall back to save file values
    ctx.font = '400 12px Arial, sans-serif';
    const formatCommodity = (val) => {
      if (val < 0) return `(${COMMODITY_NAMES[-val]})`;
      return COMMODITY_NAMES[val];
    };
    const formatSavedByte = (raw) => {
      const signed = raw > 127 ? raw - 256 : raw;
      if (signed < 0) return `(${COMMODITY_NAMES[-signed]})`;
      return COMMODITY_NAMES[signed];
    };

    // Use save-file values for display. The game's FUN_0043d400 has an uninitialized stack
    // variable (local_12c) making exact reproduction impossible from save data alone.
    // Additionally, saved values may be stale (recalculated every 16 turns per city).
    // Computed values are logged to console for research/diagnostic comparison.
    const suppliedNames = (city.tradeCommoditiesAvail || []).filter(r => r !== undefined).map(formatSavedByte);
    const demandedNames = (city.tradeCommoditiesDemand || []).filter(r => r !== undefined).map(formatSavedByte);
    this._text(ctx, `Supplies: ${suppliedNames.join(', ') || 'None'}`, R.tradeX, R.suppliesY, 'rgb(227,83,15)', null, C.headerShadow);
    this._text(ctx, `Demands: ${demandedNames.join(', ') || 'None'}`, R.tradeX, R.demandsY, 'rgb(227,83,15)', null, C.headerShadow);
    if (city.tradeRouteCount > 0) {
      for (let i = 0; i < Math.min(3, city.tradeRouteCount); i++) {
        const partnerId = city.tradePartnerCityIds[i];
        if (partnerId === 0xFFFF) continue;
        const commodity = COMMODITY_NAMES[city.tradeCommoditiesInRoute[i]] || '?';
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

    // Draw terrain — only explored tiles (visibility bit set for this civ)
    const visBit = city.owner < 8 ? (1 << city.owner) : 0;
    if (mapData.getTerrain) {
      const pw = Math.max(1, Math.ceil(scale));
      const ph = Math.max(1, Math.ceil(scale));
      for (let gy = 0; gy < mapData.mh; gy++) {
        for (let gx = gy % 2; gx < mapData.mw; gx += 2) {
          // Only show explored tiles
          if (visBit && mapData.getVisibility) {
            if (!(mapData.getVisibility(gx, gy) & visBit)) continue;
          }
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

    // City markers — only own cities and cities on explored tiles
    ctx.fillStyle = '#ffff00';
    for (const c of mapData.cities) {
      if (c.size <= 0) continue;
      // Show own cities always; enemy cities only if tile is explored
      if (c.owner !== city.owner) {
        if (visBit && mapData.getVisibility) {
          if (!(mapData.getVisibility(c.gx, c.gy) & visBit)) continue;
        }
      }
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

  _drawInfoPanelHappy(ctx, city, happiness) {
    const R = this.REGIONS.infoPanel;
    this._label(ctx, 'Happy', R.x + R.w / 2, R.y + 12);

    const panelX = R.x + 2, panelY = R.y + 20;
    const panelW = R.w - 4, panelH = 160;
    const rowCount = 5;
    const rowH = Math.floor(panelH / rowCount);

    // Row labels
    const rowLabels = ['Happy', 'Content', 'Unhappy', 'Entertainers', 'Taxmen'];
    const rowColors = ['rgb(0,200,0)', 'rgb(200,200,0)', 'rgb(200,0,0)', 'rgb(200,100,200)', 'rgb(200,200,100)'];

    const happy = happiness ? happiness.happy : (city.happyCitizens || 0);
    const unhappy = happiness ? happiness.unhappy : (city.unhappyCitizens || 0);
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
    ctx.font = '600 12px Arial, sans-serif';
    for (const [action, r] of Object.entries(B)) {
      // Arrow buttons: no fill (background shows through), 1px black outline + 2-depth dark bevel
      if (action === 'nextCity' || action === 'prevCity') {
        // Thin black outline (drawn inside the button rect)
        ctx.strokeStyle = '#000'; ctx.lineWidth = 0.5;
        ctx.strokeRect(r.x + 0.25, r.y + 0.25, r.w - 0.5, r.h - 0.5);
        // Outer highlight (top + left, inset by 1 for outline)
        ctx.strokeStyle = '#b0b0b0'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(r.x+1.5,r.y+r.h-1.5); ctx.lineTo(r.x+1.5,r.y+1.5); ctx.lineTo(r.x+r.w-1.5,r.y+1.5); ctx.stroke();
        // Outer shadow (bottom + right, inset by 1)
        ctx.strokeStyle = '#000';
        ctx.beginPath(); ctx.moveTo(r.x+r.w-1.5,r.y+1.5); ctx.lineTo(r.x+r.w-1.5,r.y+r.h-1.5); ctx.lineTo(r.x+1.5,r.y+r.h-1.5); ctx.stroke();
        // Inner highlight (top + left, inset by 2)
        ctx.strokeStyle = '#808080';
        ctx.beginPath(); ctx.moveTo(r.x+2.5,r.y+r.h-2.5); ctx.lineTo(r.x+2.5,r.y+2.5); ctx.lineTo(r.x+r.w-2.5,r.y+2.5); ctx.stroke();
        // Inner shadow (bottom + right, inset by 2)
        ctx.strokeStyle = '#202020';
        ctx.beginPath(); ctx.moveTo(r.x+r.w-2.5,r.y+2.5); ctx.lineTo(r.x+r.w-2.5,r.y+r.h-2.5); ctx.lineTo(r.x+2.5,r.y+r.h-2.5); ctx.stroke();
        // Triangle centered in button (larger)
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        if (action === 'nextCity') {
          // Up arrow ▲
          ctx.moveTo(cx, cy - 6); ctx.lineTo(cx + 6, cy + 5); ctx.lineTo(cx - 6, cy + 5);
        } else {
          // Down arrow ▼
          ctx.moveTo(cx, cy + 6); ctx.lineTo(cx + 6, cy - 5); ctx.lineTo(cx - 6, cy - 5);
        }
        ctx.closePath(); ctx.fill();
        continue;
      }
      // Gray fill
      ctx.fillStyle = 'rgb(192,192,192)';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      // 2-depth 3D bevel (8 lines: outer + inner)
      // Outer highlight (top + left)
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r.x + 0.5, r.y + r.h - 0.5);
      ctx.lineTo(r.x + 0.5, r.y + 0.5);
      ctx.lineTo(r.x + r.w - 0.5, r.y + 0.5);
      ctx.stroke();
      // Outer shadow (bottom + right)
      ctx.strokeStyle = '#808080';
      ctx.beginPath();
      ctx.moveTo(r.x + r.w - 0.5, r.y + 0.5);
      ctx.lineTo(r.x + r.w - 0.5, r.y + r.h - 0.5);
      ctx.lineTo(r.x + 0.5, r.y + r.h - 0.5);
      ctx.stroke();
      // Inner highlight (top + left, inset by 1)
      ctx.strokeStyle = '#dfdfdf';
      ctx.beginPath();
      ctx.moveTo(r.x + 1.5, r.y + r.h - 1.5);
      ctx.lineTo(r.x + 1.5, r.y + 1.5);
      ctx.lineTo(r.x + r.w - 1.5, r.y + 1.5);
      ctx.stroke();
      // Inner shadow (bottom + right, inset by 1)
      ctx.strokeStyle = '#404040';
      ctx.beginPath();
      ctx.moveTo(r.x + r.w - 1.5, r.y + 1.5);
      ctx.lineTo(r.x + r.w - 1.5, r.y + r.h - 1.5);
      ctx.lineTo(r.x + 1.5, r.y + r.h - 1.5);
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
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillText(label, Math.round(r.x + r.w / 2), Math.round(r.y + r.h / 2));
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  },

  _registerButtons() {
    const F = this.FRAME;
    const B = this.REGIONS.buttons;
    const regions = Object.entries(B).map(([action, r]) => ({ x: r.x, y: r.y, w: r.w, h: r.h, action }));
    // Title bar close icon (in content-offset coordinates, so negative Y)
    // Icon drawn at tbX+1, iconY in canvas coords; contentOrigin is at (borderW, bevelW+titleBarH)
    // tbX=borderW, iconY=bevelW+(24-16)/2=6; content coords: x=1, y=6-26=-20
    regions.push({ x: 1, y: -20, w: 16, h: 16, action: 'exit' });
    return regions;
  },

  // ═══════════════════════════════════════════════════════════════════
  // MAIN RENDER — orchestrator that calls each draw method in order
  // ═══════════════════════════════════════════════════════════════════

  render(canvas, city, cityIndex, mapData, cdSprites, mapSprites) {
    const F = this.FRAME;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = F.totalW * dpr;
    canvas.height = F.totalH * dpr;
    canvas.style.width = F.totalW + 'px';
    canvas.style.height = F.totalH + 'px';
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    // Phase 1: draw title bar first, then border on top
    this._drawTitleBar(ctx, city, mapData, cdSprites);
    this._drawOuterBorder(ctx, cdSprites);

    // Phase 2: translate to content area, draw everything else unchanged
    ctx.save();
    ctx.translate(F.contentX, F.contentY);

    const epoch = mapData.civTechs ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner]) : 0;
    const civData = mapData.civs && mapData.civs[city.owner];
    const ownerColor = CIV_COLORS[city.owner] || '#fff';
    const specs = this.getSpecialists(city);
    const supported = this.getSupportedUnits(cityIndex, mapData);

    // Compute fresh supply/demand (FUN_0043d400 port) and log comparison with save file values
    const computed = this._calcSupplyDemand(city, cityIndex, mapData);
    if (computed) {
      const N = COMMODITY_NAMES;
      const fmt = arr => arr.map(v => v < 0 ? `(${N[-v]})` : N[v]).join(', ');
      const saved = {
        supply: (city.tradeCommoditiesAvail || []).map(r => { const s = r > 127 ? r - 256 : r; return s; }),
        demand: (city.tradeCommoditiesDemand || []).map(r => { const s = r > 127 ? r - 256 : r; return s; }),
      };
      // Supply/demand comparison available via computed vs saved but not logged
      // (expected to differ due to local_12c uninitialized variable in original game)
    }

    // Compute happiness from first principles (FUN_004ea8e4 port)
    // Use server-computed happiness values (stored on city by cityturn.js)
    // instead of the client's local _calcHappiness which can diverge
    const happiness = {
      happy: city.happyCitizens ?? 0,
      unhappy: city.unhappyCitizens ?? 0,
      civilDisorder: city.civilDisorder ?? false,
      weLoveKingDay: city.weLoveKingDay ?? false,
    };

    try {
    this._drawBackground(ctx, cdSprites);
    this._drawLabels(ctx);
    this._drawCitizens(ctx, city, epoch, cdSprites, specs, happiness);
    this._drawResourceMap(ctx, city, cityIndex, mapData, cdSprites, mapSprites);
    this._drawResourceRows(ctx, city, cityIndex, cdSprites, civData, supported, mapData);
    this._drawFoodStorage(ctx, city, cityIndex, cdSprites, mapData);
    this._drawProduction(ctx, city, cdSprites, mapSprites, ownerColor, civData);
    this._drawUnitsSupported(ctx, supported, mapSprites, city, mapData, cdSprites);
    this._drawImprovements(ctx, city, cityIndex, mapData, cdSprites);
    this._drawInfoPanel(ctx, city, mapData, cdSprites, mapSprites, computed, happiness);
    this._drawButtons(ctx, cdSprites);
    } catch (renderErr) {
      console.error('[citydialog] render error:', renderErr);
    }

    ctx.restore();
    const regions = this._registerButtons();

    // Add resource map tile click regions (isometric diamond hit-test via bounding box)
    const RM = this.REGIONS.resourceMap;
    const panel = this.REGIONS.panels.tileMap;
    const { sprW, sprH } = RM;
    const cityPx = city.gx * sprW + ((city.gy % 2) ? (sprW >> 1) : 0);
    const cityPy = city.gy * (sprH >> 1);
    const rmCenterX = RM.x + panel.w / 2 + 2;
    const rmCenterY = RM.y + panel.h / 2 - (sprH >> 2) - 10;
    const rmOffX = rmCenterX - cityPx - (sprW >> 1);
    const rmOffY = rmCenterY - cityPy - (sprH >> 1);
    const parC = city.gy & 1;
    for (let i = 0; i < 20; i++) { // 0-19 (not center 20)
      const [ddx, ddy] = this.CITY_RADIUS_DOUBLED[i];
      const parT = ((city.gy + ddy) % 2 + 2) % 2;
      const tgx = city.gx + ((parC + ddx - parT) >> 1);
      const tgy = city.gy + ddy;
      const sx = tgx * sprW + ((tgy % 2) ? (sprW >> 1) : 0) + rmOffX;
      const sy = tgy * (sprH >> 1) + rmOffY;
      regions.push({
        x: sx, y: sy, w: sprW, h: sprH,
        action: 'toggleTile', tileIndex: i, tileGx: tgx, tileGy: tgy,
      });
    }

    // Add citizen face click regions (specialist cycling)
    const CR = this.REGIONS.citizens;
    const faceSpace = this._citizenSpacing(city.size);
    const totalSpecs = specs.entertainer + specs.taxman + specs.scientist;
    const workerCount = city.size - totalSpecs;
    // Workers are drawn first (happy + content + unhappy), then specialists
    for (let i = 0; i < city.size; i++) {
      const fx = CR.x + i * faceSpace;
      regions.push({
        x: fx, y: CR.y, w: 27, h: 30,
        action: i < workerCount ? 'citizenToSpec' : 'cycleSpec',
        citizenSlot: i,
      });
    }

    // Add units present click regions (only in info panel mode 0)
    if ((this.infoPanelMode || 0) === 0) {
      const IPR = this.REGIONS.infoPanel;
      const garrison = this.getGarrisonedUnits(city, mapData);
      for (let i = 0; i < Math.min(18, garrison.length); i++) {
        const u = garrison[i];
        let ux, uy;
        if (garrison.length <= 5) {
          ux = IPR.x + 1 + 48 * i;
          uy = IPR.y + 22;
        } else if (i < 10) {
          ux = IPR.x + 1 + 48 * (i % 5);
          uy = IPR.y + 3 + 39 * Math.floor(i / 5);
        } else {
          ux = IPR.x + 25 + 48 * ((i - 10) % 4);
          uy = IPR.y + 22 + 39 * Math.floor((i - 10) / 4);
        }
        // Find this unit's index in the main units array
        const unitIndex = mapData.units.indexOf(u);
        if (unitIndex >= 0) {
          regions.push({
            x: ux, y: uy, w: 48, h: 36,
            action: 'unitPresent', unitIndex,
          });
        }
      }
    }

    // Add units supported click regions
    {
      const supported = this.getSupportedUnits(cityIndex, mapData);
      const PX = 0, PY = 212, PW = 192, PH = 78;
      const unitW = 43, unitH = 32;
      const maxRows = Math.floor(PH / unitH);
      const basePerRow = Math.floor(PW / unitW);
      const singleRow = supported.length <= basePerRow;
      const perRow = singleRow ? basePerRow
        : Math.max(basePerRow, Math.ceil(supported.length / maxRows));
      const colSpacing = Math.min(unitW, Math.floor(PW / perRow));
      const xStart = PX + ((PW - colSpacing * Math.min(perRow, supported.length) + 3) >> 1);
      const yStart = singleRow
        ? PY + ((PH - 30) >> 1)
        : PY + ((PH - unitH * maxRows + 2) >> 1);

      for (let idx = 0; idx < supported.length; idx++) {
        const u = supported[idx];
        const col = idx % perRow;
        const row = Math.floor(idx / perRow);
        const ux = xStart + col * colSpacing;
        const uy = yStart + row * unitH;
        const unitIndex = mapData.units.indexOf(u);
        if (unitIndex >= 0) {
          regions.push({
            x: ux, y: uy, w: colSpacing, h: unitH,
            action: 'unitSupported', unitIndex,
          });
        }
      }
    }

    // Add improvement sell icon click regions
    const IR = this.REGIONS.improvements;
    const imps = this.getCityImprovements(city, cityIndex, mapData);
    for (let i = 0; i < Math.min(IR.maxRows, imps.length); i++) {
      const imp = imps[i];
      if (imp.isWonder) continue; // can't sell wonders
      if (imp.id === 1) continue; // can't sell Palace
      regions.push({
        x: IR.sellX - 2, y: IR.sellY + IR.rowH * i - 1,
        w: IR.sellSize + 4, h: IR.sellSize + 2,
        action: 'sell', buildingId: imp.id,
      });
    }

    return regions;
  },

  // ── Click handler ──
  handleClick(x, y, clickRegions) {
    for (const r of clickRegions) {
      // Isometric diamond hit-test for tile regions; rectangular for everything else
      if (r.action === 'toggleTile') {
        const rx = x - r.x - r.w / 2;  // relative to tile center
        const ry = y - r.y - r.h / 2;
        if (Math.abs(rx) / (r.w / 2) + Math.abs(ry) / (r.h / 2) > 1) continue;
      } else if (!(x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h)) {
        continue;
      }
      if (r.action === 'info') {
        this.infoPanelMode = ((this.infoPanelMode || 0) + 1) % 3;
      }
      if (r.action === 'toggleTile') {
        return { action: r.action, tileIndex: r.tileIndex, tileGx: r.tileGx, tileGy: r.tileGy };
      }
      if (r.action === 'citizenToSpec' || r.action === 'cycleSpec') {
        return { action: r.action, citizenSlot: r.citizenSlot };
      }
      if (r.action === 'sell') {
        return { action: r.action, buildingId: r.buildingId };
      }
      if (r.action === 'unitPresent' || r.action === 'unitSupported') {
        return { action: r.action, unitIndex: r.unitIndex };
      }
      return { action: r.action };
    }
    return null;
  },
};

export { Civ2CityDialog };
