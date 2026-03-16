/**
 * Civ2 MGE UI Constants -- Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), blocks 00500000, 00450000, 004E0000, 004C0000
 *
 * This module documents every game-relevant UI constant found in the city dialog,
 * civilopedia, production change dialog, and related screens. All addresses
 * reference the Civ2 MGE executable.
 *
 * NOT executable code -- reference data only. Each constant includes its
 * binary address as a comment.
 */

// ============================================================================
// === CITY DIALOG ===
// Binary ref: block_00500000.c — 123 functions
// ============================================================================

export const CITY_DIALOG = {
  // --- Base dimensions ---
  // @ FUN_00509028 citywin_calc_zoom_and_layout (647 bytes)
  baseWidth: 636,    // @ 0x00509028: base content = 636 pixels
  baseHeight: 421,   // @ 0x00509028: base content = 421 pixels

  // --- Zoom levels ---
  // @ FUN_00509028 + FUN_00509a49 citywin_set_zoom_and_position
  zoom: {
    small:   1,      // @ FUN_00509028: if width < threshold_lo || height < threshold_lo
    default: 2,      // @ FUN_00509028: default zoom
    large:   3,      // @ FUN_00509028: if width >= threshold_hi && height >= threshold_hi
    largeScreenThreshold: 1000,  // @ FUN_00509a49: if screen > 999: zoom = 3
  },

  // --- Font sizes ---
  // @ FUN_00509028
  fonts: {
    normal: 0x0C,    // 12pt — zoom 1
    large:  0x10,    // 16pt — zoom 2/3
  },

  // --- Panel coordinates (base, before zoom scaling) ---
  // @ FUN_00508d24 citywin_calc_all_rects (418 bytes)
  // Format: { x, y, width, height } — 12 panels total
  // Zoom formula: (zoom * coord + 1) / 2 + offset @ FUN_00508c84
  panels: {
    citizens:      { x: 0x000, y: 0x000, w: 0x1B4, h: 0x03D },  // (0, 0, 436, 61)
    resources:     { x: 0x000, y: 0x03D, w: 0x1B4, h: 0x099 },  // (0, 61, 436, 153)
    resourceLabel: { x: 0x007, y: 0x041, w: 0x0BC, h: 0x089 },  // (7, 65, 188, 137)
    food:          { x: 0x1B4, y: 0x000, w: 0x0C8, h: 0x0A7 },  // (436, 0, 200, 167)
    production:    { x: 0x1B4, y: 0x0A7, w: 0x0C8, h: 0x0BD },  // (436, 167, 200, 189)
    buy:           { x: 0x1B4, y: 0x164, w: 0x0C8, h: 0x041 },  // (436, 356, 200, 65)
    supported:     { x: 0x000, y: 0x0D4, w: 0x0C0, h: 0x04E },  // (0, 212, 192, 78)
    supportedLabel:{ x: 0x007, y: 0x0D8, w: 0x0B5, h: 0x045 },  // (7, 216, 181, 69)
    improvements:  { x: 0x000, y: 0x122, w: 0x0C0, h: 0x083 },  // (0, 290, 192, 131)
    impScrollbar:  { x: 0x006, y: 0x132, w: 0x0A6, h: 0x06C },  // (6, 306, 166, 108)
    info:          { x: 0x0C0, y: 0x0D4, w: 0x0F4, h: 0x0D1 },  // (192, 212, 244, 209)
    infoLabel:     { x: 0x0C5, y: 0x0D8, w: 0x0E9, h: 0x0C6 },  // (197, 216, 233, 198)
  },

  // --- Panel rendering order ---
  // @ FUN_00508bc5 citywin_redraw_all_panels
  renderOrder: [
    'citizens',      // draw_citizens_row
    'resources',     // draw_resource_rows
    'food',          // draw_food_storage
    'production',    // draw_production_box
    'buy',           // draw_buy_panel
    'supported',     // draw_units_supported
    'improvements',  // draw_improvements_list
    'info',          // draw_info_panel
  ],

  // --- Border fill ---
  // @ FUN_00508ec6 citywin_draw_border_fills (354 bytes)
  borderFillColor: 10,  // palette index for margins when window > content

  // --- Background ---
  // @ FUN_0050101f citywin_load_background
  backgroundGif: 'CITY_GIF',
  backgroundSurfaceSize: { w: 0x27C, h: 0x1A5 },  // (636, 421)

  // --- Surface handles ---
  // @ FUN_0050dcb6 citywin_on_create
  surfaceAddresses: {
    food:   '@ DAT_00645120',
    shield: '@ DAT_00648820',
    trade:  '@ DAT_00647788',
  },
};

// ============================================================================
// === SPECIALIST CYCLING ===
// Binary ref: FUN_00501819 citywin_click_citizen @ block_00500000.c (424 bytes)
// ============================================================================

export const SPECIALIST_CYCLING = {
  // @ FUN_00501819
  cycleOrder: [1, 2, 3],  // Elvis -> Scientist -> Taxman -> Elvis
  // new_type = current_type + 1; if new_type > 3: new_type = 1

  smallCityRestriction: {
    threshold: 5,           // @ FUN_00501819: if city.size < 5
    allowedType: 1,         // only Elvis (type 1) allowed in small cities
    errorMessage: 'ELVISERR',
  },

  specialistTypes: {
    1: 'Elvis (Entertainer)',
    2: 'Scientist',
    3: 'Taxman',
  },
};

// ============================================================================
// === BUY/SELL FORMULAS ===
// Binary ref: FUN_00509b48 city_button_buy @ block_00500000.c (1642 bytes)
// Binary ref: FUN_00505d3d citywin_sell_improvement @ block_00500000.c (701 bytes)
// Binary ref: FUN_00506637 citywin_unit_popup_supported @ block_00500000.c (985 bytes)
// ============================================================================

export const BUY_SELL = {
  rushBuy: {
    // @ FUN_00509b48 city_button_buy
    building: {
      formula: 'remaining * 2',
      remainingFormula: 'max(0, cost * COSMIC[4] - city.shield_box)',
    },
    wonder: {
      formula: 'remaining * 4',
      remainingFormula: 'max(0, cost * COSMIC[4] - city.shield_box)',
    },
    unit: {
      formula: '(remaining^2 / 20) + remaining * 2',
      remainingFormula: 'max(0, cost * COSMIC[4] - city.shield_box)',
    },
    nothingAccumulatedPenalty: {
      // @ FUN_00509b48: if city.shield_box == 0: buy_cost *= 2
      condition: 'city.shield_box == 0',
      effect: 'double the buy cost',
    },
    disorderRestriction: 'Cannot rush-buy units during civil disorder',
    cosmicIndex: 4,  // COSMIC[4] = shields-per-row multiplier (default 10)
    confirmDialog: 'COMPLETE0',
    successSound: 0x68,
  },

  sellImprovement: {
    // @ FUN_00505d3d citywin_sell_improvement
    refundFormula: 'improvement_cost * COSMIC[4]',
    cosmicIndex: 4,
    restrictions: {
      oncePerTurn: true,           // city.flags & 4 = already sold
      alreadySoldMessage: 'ALREADYSOLD',
      alreadySoldSound: 0x69,
      palaceCannotSell: true,      // building_id == 1 (Palace)
      palaceMessage: 'CANTHOCKTHIS',
      palaceSound: 0x69,
    },
    confirmDialog: 'HOCKTHIS',
    successSound: 0x6E,
    flagOnSell: 4,                 // city.flags |= 4 to mark sold this turn
  },

  disbandUnit: {
    // @ FUN_00506637 citywin_unit_popup_supported
    refundFormula: 'unit_type_cost * COSMIC[4] / 2',
    destination: 'city_at_unit.shield_box += refund',
    notes: 'Refund goes to the city at the unit location, not necessarily home city.',
  },
};

// ============================================================================
// === PRODUCTION LIST (Change Production) ===
// Binary ref: FUN_0050a473 city_button_change @ block_00500000.c (4544 bytes)
// ============================================================================

export const PRODUCTION_LIST = {
  // @ FUN_0050a473 city_button_change
  buildOrder: [
    { range: '0..61', type: 'units', check: 'can_build_unit(civ_id, cityIdx, unit_type)' },
    { range: '1..38', type: 'buildings', check: 'can_build_building(civ_id, cityIdx, building)' },
    { range: '0..27', type: 'wonders', check: 'can_build_wonder(civ_id, wonder)', prefix: '* if already started' },
  ],

  displayFormat: {
    unit: 'name (cost, A/D/M, N turns)',
    building: 'name (cost, N turns)',
    wonder: '*name (cost, N turns)',
  },

  productionChange: {
    // Shields loss on switch
    shieldsLostCondition: 'new_cost < city.shield_box',
    confirmDialog: 'PRODCHANGE',
    flagsClearedOnChange: 0x03000010,  // clear auto-governor + other flags
    unitEverBuiltTracking: {
      onSwitchFrom: 'civ.unit_ever_built[old_prod]--',
      onSwitchTo: 'civ.unit_ever_built[new_prod]++',
    },
    shieldBoxClamp: 'city.shield_box = min(city.shield_box, new_cost)',
  },

  autoGovernor: {
    // @ FUN_0050a473 case 1
    flagBit: 0x10,           // city.flags & 0x10 = auto-governor enabled
    dialog: 'AUTOMODE',
  },

  worklistSupport: {
    featureFlag: '@ DAT_00655aea bit 2',
    enabled: 'scenario flag determines availability',
  },
};

// ============================================================================
// === CITY DIALOG BUTTONS ===
// Binary ref: FUN_0050cf06 citywin_create_all_buttons @ block_00500000.c (2883 bytes)
// ============================================================================

export const CITY_BUTTONS = {
  // @ FUN_0050cf06 citywin_create_all_buttons
  buttonCount: 10,
  buttonObjectSize: 0x3C,  // 60 bytes per button

  layout: [
    { name: 'Close',      offset: 0x16B4, position: { x: 0x1CB, y: 0x16C }, callback: 'citywin_button_close' },
    { name: 'Change',     offset: 0x16B8, position: { x: 0x1BA, y: 0x0B5 }, callback: 'city_button_change' },
    { name: 'Buy',        offset: 0x16C4, position: { x: 0x1BA, y: 0x0B5 }, callback: 'city_button_buy' },
    { name: 'View',       offset: 0x16C0, callback: 'city_button_view' },
    { name: 'Rename',     offset: 0x16BC, callback: 'city_button_rename' },
    { name: 'Tab Units',  offset: 0x16CC, callback: 'citywin_button_tab_units' },
    { name: 'Tab Map',    offset: 0x16D0, callback: 'citywin_button_tab_minimap' },
    { name: 'Tab Happy',  offset: 0x16C8, callback: 'citywin_button_tab_happiness' },
    { name: 'Prev City',  offset: 0x16D4, callback: 'citywin_button_prev_city' },
    { name: 'Next City',  offset: 0x16D8, callback: 'citywin_button_next_city' },
  ],

  cityNavigation: {
    // @ FUN_0050bd13 citywin_button_next_city (607 bytes)
    // @ FUN_0050bf72 citywin_button_prev_city (607 bytes)
    algorithm: 'Alphabetical sort of city names (case-insensitive strcmpi)',
    nextCity: 'Find closest city name alphabetically AFTER current; wrap to first',
    prevCity: 'Find closest city name alphabetically BEFORE current; wrap to last',
    wrapSentinel: {
      next: '""',                          // empty string as lower bound
      prev: '"zzzzzzzzzzzzzzzzzzzzzzzzz"', // all z's as upper bound
    },
  },
};

// ============================================================================
// === CITY DIALOG MOUSE HIT-TEST ===
// Binary ref: FUN_0050c1d1 city_mouse @ block_00500000.c (535 bytes)
// ============================================================================

export const CITY_MOUSE = {
  // @ FUN_0050c1d1
  panelIds: {
    1: { name: 'Resource Map', action: 'click_resource_map(x, y)' },
    2: { name: 'Citizen Row', action: 'click_citizen(slot_idx)' },
    3: { name: 'Units Present', action: 'unit_popup_present(slot_idx)' },
    4: { name: 'Improvements', action: 'sell_improvement(slot_idx)' },
    5: { name: 'Unused', action: 'no-op' },
    6: { name: 'Units Supported', action: 'unit_popup_supported(slot_idx)' },
  },
};

// ============================================================================
// === CITY INFO PANEL TABS ===
// Binary ref: FUN_0050b9a4..FUN_0050ba6a @ block_00500000.c
// Binary ref: FUN_00508adc citywin_draw_info_panel @ block_00500000.c (228 bytes)
// ============================================================================

export const INFO_PANEL_TABS = {
  // @ FUN_00508adc: switch on this+0x15b0
  views: {
    0: { name: 'Units Present', drawFunction: 'citywin_draw_units_present' },
    1: { name: 'Minimap', drawFunction: 'citywin_draw_minimap' },
    2: { name: 'Happiness', drawFunction: 'citywin_draw_happiness_panel' },
  },
  stateAddress: '@ this+0x15B0 (DAT_006aa768)',
  switchSound: 99,  // @ FUN_0050b9a4: play_sound(99)
};

// ============================================================================
// === HAPPINESS PANEL ===
// Binary ref: FUN_00508552 citywin_draw_happiness_panel @ block_00500000.c (1393 bytes)
// Binary ref: FUN_00508177 citywin_draw_happiness_modifiers @ block_00500000.c (987 bytes)
// ============================================================================

export const HAPPINESS_PANEL = {
  // @ FUN_00508552
  rows: 5,
  rowMeaning: [
    { index: 0, name: 'Base Content', notes: 'Initial citizen state before modifiers' },
    { index: 1, name: 'Luxury Effect', notes: 'Luxury spending converting unhappy to content/happy' },
    { index: 2, name: 'Building Effects', notes: 'Temple, Cathedral, Colosseum, etc.' },
    { index: 3, name: 'Military/Government', notes: 'Garrison or military abroad unhappiness' },
    { index: 4, name: 'Wonder Effects', notes: 'Wonder-based happiness modifiers' },
  ],

  dataArrays: {
    happyCounts:   '@ DAT_006a6620[0..4]',  // post-modifier happy per row
    unhappyCounts: '@ DAT_006a65f0[0..4]',  // post-modifier unhappy per row
    extraUnhappy:  '@ DAT_006a6628[0..4]',  // extra unhappy type per row
  },

  militaryModifiers: {
    // @ FUN_00508177 citywin_draw_happiness_modifiers
    fundamentalism: {
      govtId: 4,
      display: 'Government name text (no garrison/unit display)',
    },
    despotismMonarchyCommunism: {
      govtRange: [0, 4],  // govt < 5 (excluding Fundamentalism=4... actually govt<5 includes 0,1,2,3)
      garrisonDisplay: 'Up to 3 garrisoned military units drawn as icons',
    },
    republicDemocracy: {
      govtRange: [5, 6],
      womensSuffrageWonder: 0x15,  // wonder 21
      policeStationBuilding: 0x21, // building 33
      unhappyPerUnitAbroad: {
        republic: 1,    // @ FUN_00508177: unhappy_per_unit = ws_active ? 0 : 1
        democracy: 2,   // @ FUN_00508177: if govt == 6: unhappy_per_unit++
      },
      republicFirstUnitFree: true, // @ FUN_00508177: if govt == 5 && military_unhappy > 0: military_unhappy--
    },
  },

  fundamentalismTithe: {
    // @ FUN_00508552: if row == 2 && govt == 4
    dataAddress: '@ DAT_006a6618',
    notes: 'Shows tithe icon and text instead of citizen icons for Fundamentalism row 2',
  },
};

// ============================================================================
// === SUPPORTED UNITS PANEL ===
// Binary ref: FUN_00505666 draw_units_supported @ block_00500000.c (1751 bytes)
// ============================================================================

export const SUPPORTED_UNITS_PANEL = {
  // @ FUN_00505666
  unitSpriteDimensions: {
    baseWidth: 0x45,   // 69 pixels
    baseHeight: 0x34,  // 52 pixels
  },
  zoomFactors: {
    zoom1: -6,    // sprite scale factor
    zoom2: -3,    // default
    zoom3: 0,     // large
  },
  maxUnits: '(panel_width / unit_w) * (panel_height / unit_h)',

  supportCost: {
    // @ FUN_00505666
    baseFreeSupport: '@ DAT_006a6608',
    extraSupportFlag: 0x800,     // unit.flags & 0x800 adds 1 support shield
    militaryAbroadFlag: 0x400,   // unit.flags & 0x400 for democracy unhappiness check
    democracyGovtId: 6,          // govt > 4 triggers abroad-unhappiness check
    womensSuffrageCheck: 'wonder 21',
    policeStationCheck: 'building 0x21',
  },
};

// ============================================================================
// === FOOD STORAGE BOX ===
// Binary ref: FUN_00504c05 draw_food_storage @ block_00500000.c (1081 bytes)
// ============================================================================

export const FOOD_STORAGE = {
  // @ FUN_00504c05
  gridColumns: 'city.size + 1',   // icons per row
  granaryDividerLine: {
    condition: 'has_building(cityIdx, 3) OR wonder_active(city.owner, 0)',
    // Building 3 = Granary, Wonder 0 = Pyramids
    position: 'food_box_capacity / 2',
    paletteColor: 0x2A,
  },
  cityRecordOffsets: {
    foodBox: 0x1A,   // city+0x1A = food stored
  },
};

// ============================================================================
// === PRODUCTION BOX ===
// Binary ref: FUN_0050503e draw_production_box @ block_00500000.c (1434 bytes)
// ============================================================================

export const PRODUCTION_BOX = {
  // @ FUN_0050503e
  shieldGrid: {
    maxRows: 10,
    shieldsPerRow: '@ DAT_006a657c',
    totalCostFormula: 'building_cost * COSMIC[4] (or unit cost * COSMIC[4])',
  },
  cityRecordOffsets: {
    currentProduction: 0x39,   // city+0x39 (negative=building, positive=unit)
    shieldBox: 0x1C,           // city+0x1C = shields stored
  },
  capitolPlaceholder: -0x26,   // @ FUN_0050503e: current_prod != -0x26
  zoomAdjustments: {
    zoom1: -5,   // sprite offset
    zoom2: -1,
    zoom3: 1,
  },
};

// ============================================================================
// === RESOURCE ROWS ===
// Binary ref: FUN_005025d5 draw_resource_rows @ block_00500000.c (9761 bytes)
// ============================================================================

export const RESOURCE_ROWS = {
  // @ FUN_005025d5 (largest city dialog function: 9761 bytes)
  cityRadiusTiles: 21,   // 0..20 spiral positions
  tileDimensions: {
    width: 0x40,   // 64 pixels base
    height: 0x20,  // 32 pixels base
  },

  paletteColors: {
    foodBar: 0x2D,          // green
    foodDeficit: 0x30,      // red
    shieldProduction: 0x54,
    shieldWaste: 0x0B,
    shieldSurplus: 0x5C,
    tradeBar: 0x76,
    corruption: 0x79,
    goldIcon: 0x76,
    luxuryIcon: 0x29,
    scienceIcon: 0x5E,
  },

  fundamentalismTithe: {
    govtId: 4,
    titheBonusAddress: '@ DAT_006a6618',
    notes: 'Extra display line for Fundamentalism tithe bonus if non-zero',
  },

  dataAddresses: {
    foodSurplus: '@ DAT_006a65c8',
    supportCost: '@ DAT_006a6568',
    waste: '@ DAT_006a656c',
    netShields: '@ DAT_006a65cc',
    grossTrade: '@ DAT_006a65d0',
    corruption: '@ DAT_006a6580',
    gold: '@ DAT_006a6554',
    luxury: '@ DAT_006a65fc',
    science: '@ DAT_006a6578',
  },
};

// ============================================================================
// === WORKER TILE MANAGEMENT ===
// Binary ref: FUN_005022c0 citywin_click_resource_map @ block_00500000.c (784 bytes)
// Binary ref: FUN_004e7549..FUN_004e790c @ block_004E0000.c
// ============================================================================

export const WORKER_TILES = {
  clickResourceMap: {
    // @ FUN_005022c0
    spiralSlots: 21,        // 0..20 city radius positions
    resetSlot: 0x14,        // slot 20 = center tile -> reset workers
    diamondHitTest: 'FUN_005c0bf2 (quadrant detection within tile)',
    subTileAdjustments: 'CitySpiralAdjDX/DY arrays for fine positioning',
  },

  bitmaskEncoding: {
    // @ FUN_004e7549 set_worker_tile_status
    statusValues: { unworked: 0, worked: 1, autoAssigned: 2 },
    bitsPerTile: 2,
    formula: 'byte_index = tile_offset / 4; bit_position = (tile_offset % 4) * 2',
    mask: '0x03 << bit_position',
  },

  tileOwnership: {
    // @ FUN_004e78ce is_tile_worked
    tileByteOffset: 5,     // tile byte[5] stores working city ID (0xFF = none)
    noneMarker: 0xFF,
  },
};

// ============================================================================
// === TITLE BAR ===
// Binary ref: FUN_005092af citywin_draw_title_bar @ block_00500000.c (378 bytes)
// ============================================================================

export const TITLE_BAR = {
  // @ FUN_005092af
  format: {
    singlePlayer: 'city_name',
    multiplayer: 'city_name + turn_number + player_name + gold',
  },
  autoGovernor: {
    flagBit: 2,              // city.flags & 2 = auto-governor active
    flagAddress: '@ DAT_0064bc60',
    indicator: 'governor symbol shown in title',
  },
  multiplayerCivCount: '@ DAT_006aa78c',
};

// ============================================================================
// === CITY WINDOW INITIALIZATION ===
// Binary ref: FUN_0050dcb6 citywin_on_create @ block_00500000.c (498 bytes)
// Binary ref: FUN_00501440 citywin_init_members @ block_00500000.c (127 bytes)
// ============================================================================

export const CITY_INIT = {
  // @ FUN_00501440
  memberDefaults: {
    scrollbarControl: { offset: 0x16BC, value: 0 },
    blockedFlag:      { offset: 0x15A4, value: 1 },
    closingFlag:      { offset: 0x15A0, value: 0 },
    extraBlocked:     { offset: 0x15A8, value: 0 },
    cityIndex:        { offset: 0x159C, value: -1 },   // none
    impScrollPos:     { offset: 0x15B4, value: 0 },
    needFullRedraw:   { offset: 0x15B8, value: 1 },
  },
};

// ============================================================================
// === CIVILOPEDIA ===
// Binary ref: block_00450000.c — 48 UI.civilopedia functions
// Binary ref: FUN_00451bf0 pedia_init_tabs @ block_00450000.c (1391 bytes)
// Binary ref: FUN_00452315 pedia_show_article @ block_00450000.c (1059 bytes)
// ============================================================================

export const CIVILOPEDIA = {
  // All 48 civilopedia functions are Win32 UI rendering with no game logic.
  // The data structures and navigation model are documented here for reference.

  tabCount: 17,        // @ FUN_00451bf0: init 17 category tabs
  windowClass: 'MSHyperTextClass',  // @ FUN_004529df register_wndclass_29DF

  entryStructure: {
    source: 'describe.txt (game text file)',
    articleLoader: 'FUN_00452315 pedia_show_article',
    descriptionSwitch: 'FUN_00452768 pedia_show_description (switch on category)',
    renderTabs: 'FUN_00452188 pedia_render_tab_content (switch on tab index)',
    listPanel: 'FUN_00450480 pedia_setup_list_panel (1602 bytes, builds tech/improvement list)',
  },

  hyperlinks: {
    // @ FUN_00452c14 pedia_add_hyperlink (1361 bytes)
    nodeSize: 'link node object',
    clickTypes: [1, 2, 3, 4, 5],  // 5 link click handler types
    handlers: {
      1: 'FUN_004531b8 pedia_link_click_left',
      2: 'FUN_0045323a pedia_link_click_right',
      3: 'FUN_004532bc pedia_link_click_3',
      4: 'FUN_0045333e pedia_link_click_4',
      5: 'FUN_004533c0 pedia_link_click_5',
    },
  },

  scrollbar: {
    itemsPerPage: 9,   // @ FUN_00490590: modulo 9 alignment for pages
    alignment: 'modulo grid alignment to 9-item pages',
  },

  headerRendering: {
    // @ FUN_00451af0 pedia_draw_header (256 bytes)
    style: 'text with shadow',
  },

  buttonWidget: {
    // @ FUN_00451930 pedia_button_ctor (83 bytes)
    // @ FUN_004519b0 pedia_button_create (139 bytes)
    callbackOffset: 0x34,       // this+0x34 = callback function
    scrollHandlerOffset: 0x30,  // this+0x30 = scroll handler
  },
};

// ============================================================================
// === ADVISOR DIALOG (City View) ===
// Binary ref: FUN_00454260..FUN_00456e90 @ block_00450000.c (46 functions)
// ============================================================================

export const ADVISOR_DIALOG = {
  // The city improvement advisor (building grid with animated portraits)
  // 46 functions — all Win32 UI rendering, no game formulas.

  objectSize: 0x1CB4,  // @ FUN_00454260: alloc 0x1CB4 bytes
  dllSource: 'cv.dll',

  portraitSelection: {
    // @ FUN_00454f83 advisor_setup_portraits (414 bytes)
    algorithm: 'Choose advisor portrait based on coastal/inland city location',
  },

  gridRendering: {
    // @ FUN_00455314 advisor_render_building_grid (1694 bytes)
    notes: 'Renders building/wonder sprites in a grid layout with civ-colored backgrounds',
  },

  shuffleMechanics: {
    // @ FUN_00455b8e advisor_pop_wonder_shuffle (207 bytes)
    // @ FUN_00455c5d advisor_pop_building_shuffle (219 bytes)
    algorithm: 'Pop random item from shuffle deck for animated placement',
  },

  scrollAnimation: {
    // @ FUN_0045638b advisor_scroll_right (285 bytes)
    // @ FUN_004564a8 advisor_scroll_left (274 bytes)
    notes: 'Animated horizontal scroll between building pages',
  },
};

// ============================================================================
// === DEFENSE BUILDINGS IN HAPPINESS ===
// Binary ref: FUN_00507f31 citywin_draw_defense_buildings @ block_00500000.c (561 bytes)
// ============================================================================

export const DEFENSE_BUILDING_ICONS = {
  // @ FUN_00507f31: draws up to 3 defensive building icons in happiness panel
  maxIcons: 3,
  checks: [
    { order: 0, buildingId: 0x0E, name: 'City Walls (14)' },
    { order: 1, buildingId: 0x0B, name: 'Coastal Fortress (11)', wonderFallback: { wonderId: 10, buildingId: 0x37, name: 'Great Wall' } },
    { order: 2, buildingId: 4, name: 'Temple' },
    { order: 3, buildingId: 1, name: 'Barracks', altBuildingId: 7, altName: 'Library', govtRestriction: 'govt != 6 (Democracy)' },
  ],
};

// ============================================================================
// === MINIMAP (City Info Panel) ===
// Binary ref: FUN_00507b69 citywin_draw_minimap @ block_00500000.c (968 bytes)
// ============================================================================

export const CITY_MINIMAP = {
  // @ FUN_00507b69
  paletteColors: {
    ownedTile: 0x5D,    // bright — civ owns unit/city here
    otherTile: 0x30,    // dim — visible but not owned
    unitPosition: 0x1D, // green — unit positions
    cityPosition: 0x29, // bright — city location
  },
  scrolling: {
    algorithm: 'Center on capital city, wrap if map wraps',
    margin: 4,  // pixels border inside panel
  },
};

// ============================================================================
// === RENAME DIALOG ===
// Binary ref: FUN_0050b74e city_button_rename @ block_00500000.c (598 bytes)
// ============================================================================

export const RENAME = {
  // @ FUN_0050b74e
  maxNameLength: 15,         // @ 0x50b74e: show_input_dialog("RENAMECITY", 0xf, ...)
  dialogTemplate: 'RENAMECITY',
  cityNameFieldOffset: 0x20, // city+0x20 (16 chars max including null terminator)
  successSound: 0x68,
};

// ============================================================================
// === CITY DISORDER / TUTORIAL ===
// Binary ref: FUN_00509590 handle_city_disorder @ block_00500000.c (933 bytes)
// ============================================================================

export const CITY_DISORDER = {
  // @ FUN_00509590
  disorderFlag: 'DAT_00655aee |= 2',
  tutorialHooks: {
    cityStuff: {
      condition: 'tutorial_enabled && city.size > 3 && !tutorial_flag',
      message: 'CITYSTUFF',
    },
    disorder: {
      condition: 'city.disorder_flag || city.resistance',
      messages: ['DISORDER', 'DISORDER2', 'DISORDER3'],
    },
  },
  multiplayerIdleTimeout: 0x4B0,  // 1200ms = 1.2 seconds (@ FUN_0050b674)
};

// ============================================================================
// === UNIT POPUP MENUS ===
// Binary ref: FUN_00506a42 citywin_unit_popup_present @ block_00500000.c (1608 bytes)
// Binary ref: FUN_00506637 citywin_unit_popup_supported @ block_00500000.c (985 bytes)
// ============================================================================

export const UNIT_POPUPS = {
  presentUnit: {
    // @ FUN_00506a42
    dialog: 'UNITOPTIONS',
    options: {
      1: 'Activate',
      2: 'Sentry/Wake (if unit.orders != -1)',
      3: 'Fortify (if unit.orders != 3)',
      4: 'Disband (if not already fortifying/fortified)',
      5: 'Change Home City (if unit.owner != city.owner)',
      6: 'View Home City (if unit.homeCity valid)',
      7: 'Disband + return shields (cost/2 to city shield_box)',
      8: 'Paradrop (if applicable)',
      9: 'Airlift (if applicable)',
    },
    reentrancyGuard: '@ DAT_00630d2c',
  },

  supportedUnit: {
    // @ FUN_00506637
    dialog: 'CHILDCLICK',
    options: {
      3: 'Go to home city (goto order 0x0B)',
      4: 'Disband (refund cost/2 shields)',
      1: 'Activate (if can_move)',
      2: 'Activate + close city dialog',
    },
  },
};

// ============================================================================
// === TRADE ROUTES (City Info Panel) ===
// Binary ref: FUN_005070e5 citywin_draw_units_present @ block_00500000.c (2692 bytes)
// ============================================================================

export const TRADE_ROUTES_DISPLAY = {
  // @ FUN_005070e5 (embedded in units_present drawing function)
  maxRoutes: 3,
  supplySlotOffsets: [0x3B, 0x3C, 0x3D],    // city+0x3B..0x3D (relative offsets)
  demandSlotOffsets: [0x3E, 0x3F, 0x40],    // city+0x3E..0x40

  activeTradeSign: {
    positive: 'supply/demand commodities (inactive)',
    negative: 'actively traded (shown with parens)',
  },
  commodityNamesAddress: '@ DAT_0064b168[commodityId]',
  revenueAddress: '@ DAT_006a6590[route]',

  partnerDisplay: {
    establishing: 'negative revenue => "establishing..."',
    active: 'partner city name + revenue + arrow icon',
  },

  prerequisiteCheck: 'has_trade_routes(city.owner, 0x54)',
  airCapacityAddress: '@ DAT_006a6584',
};

// ============================================================================
// === AUTO-GOVERNOR FLAGS ===
// Binary ref: FUN_005092af citywin_draw_title_bar @ block_00500000.c
// Binary ref: FUN_0050ccb3 citywin_create_change_button @ block_00500000.c
// Binary ref: FUN_0050a473 city_button_change @ block_00500000.c
// ============================================================================

export const AUTO_GOVERNOR = {
  flags: {
    enabled: 0x10,      // city.flags & 0x10 = auto-governor active
    titleIndicator: 0x02, // city.flags & 2 = show governor in title (@ DAT_0064bc60)
  },
  changeButtonArt: {
    // @ FUN_0050ccb3
    stateVariable: '@ DAT_00630d24',
    artDifference: 'Different resource offsets for governor on vs off button sprites',
  },
  clearOnProductionChange: 0x03000010,  // city.flags &= ~0x03000010 on manual change
};

// ============================================================================
// === CIV COLOR LOOKUP ===
// Binary ref: FUN_0043cab0 get_civ_primary_color @ block_00430000.c (92 bytes)
// Binary ref: FUN_0043cb30 get_civ_secondary_color @ block_00430000.c (92 bytes)
// ============================================================================

export const CIV_COLORS = {
  // @ FUN_0043cab0 / FUN_0043cb30
  lookupChain: 'civId -> leaderIndex (civ+0x594*id) -> colorIndex (@ DAT_006554fe) -> color table',
  primaryColorTable: '@ DAT_00655358 (stride 0x10, offset +0x00)',
  secondaryColorTable: '@ DAT_00655360 (stride 0x10, offset +0x08)',
  barbarianColorIndex: 0,  // civId == 0 always uses index 0
};

// ============================================================================
// === IMPROVEMENTS LIST ===
// Binary ref: FUN_00505ffa draw_improvements_list @ block_00500000.c (1102 bytes)
// ============================================================================

export const IMPROVEMENTS_LIST = {
  // @ FUN_00505ffa
  buildingRange: { start: 0, end: 38 },    // buildings 0..38
  wonderRange: { start: 0, end: 27 },      // wonders 0..27 (mapped to indices 39..66)
  wonderOffset: 0x27,  // wonder display index = 0x27 + wonderIdx

  scrollPosition: '@ DAT_006aa76c (this+0x15B4)',
  totalCountAddress: '@ DAT_006aa770',

  maintenanceIcon: {
    spriteZoom: 'sprite_zoom * 3 - 7',
    shownForBuildings: true,
    shownForWonders: false,
  },
};
