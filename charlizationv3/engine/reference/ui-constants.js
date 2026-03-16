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
    // @ FUN_00509028: zoom threshold offsets from base (iVar4 = window decoration size)
    thresholdLo: { width: 0x1B9, height: 0x278 },  // width+0x1B9=441, height*2+0x278=632
    thresholdHi: { width: 0x297, height: 0x3B6 },  // width+0x297=663, height*2+0x3B6=950
    // @ FUN_0050cf06: zoom-to-sprite-scale mapping for unit/building sprites
    spriteScale: {
      zoom1: 0xFFFFFFFB,  // -5 (@ citywin_CF06: in_ECX+0x15d8)
      zoom2: 0xFFFFFFFE,  // -2
      zoom3: 1,            //  1
    },
  },

  // --- Font sizes ---
  // @ FUN_00509028
  fonts: {
    normal: 0x0C,    // 12pt — zoom 1
    large:  0x10,    // 16pt — zoom 2/3
    titleBar: 0x18,  // @ FUN_00509028: this+0x118 = 0x18 (24pt) for zoom 2/3; 0x12 (18pt) for zoom 1
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
    food:   '@ DAT_00645120',   // surface 1
    shield: '@ DAT_00648820',   // surface 2
    trade:  '@ DAT_00647788',   // surface 3
  },

  // --- Window sizing ---
  // @ FUN_0050998f citywin_calc_window_position (186 bytes)
  windowPadding: {
    horizontalBorder: 0x10,  // 16 pixels total horizontal padding
    titleBarHeight: 0x18,    // 24 pixels title bar
    extraVertical: 8,        // 8 pixels extra vertical padding
  },

  // --- Zoom change dialog ---
  // @ FUN_0050dbde citywin_handle_zoom_key (211 bytes)
  zoomChange: {
    shrinkKey: 2,            // param_1 == 2 => zoom out (DAT_006aa78c--)
    growKey: 3,              // param_1 == 3 => zoom in  (DAT_006aa78c++)
    closeKey: 1,             // param_1 == 1 => close city dialog
    minZoom: 2,              // cannot shrink below 2
    maxZoomNormal: 2,        // max 2 on screens <= 999
    maxZoomLarge: 3,         // max 3 on screens > 999
  },

  // --- City modal name ---
  // @ FUN_005013bc citywin_modal_setup
  modalName: 'CITYMODAL',   // @ s_CITYMODAL_00630d78
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

  // --- Citizen row rendering ---
  // @ FUN_005019c1 citywin_draw_citizen_row (1186 bytes)
  // @ FUN_00501e63 citywin_draw_citizen_row_small (540 bytes)
  citizenRow: {
    spriteHeight: {
      large: 0x1B,  // @ FUN_005019c1: thunk_FUN_00511690(0x1b) — 27px citizen sprite
      small: 0x0F,  // @ FUN_00501e63: thunk_FUN_00511690(0xf) — 15px citizen sprite
    },
    specialistIconTypes: {
      unhappy: 4,   // @ FUN_005019c1: if local_c < param_5 - param_6 => type 4
      extra: 6,     // @ FUN_005019c1: else => type 6
    },
    backgroundPaletteColor: 10,  // @ FUN_005019c1/FUN_00501e63: palette color 10 for citizen bg
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
      wonderThreshold: 0x22,  // @ FUN_00509b48: if -iVar4 > 0x22 => wonder (34 = first wonder index)
    },
    unit: {
      formula: '(remaining^2 / 20) + remaining * 2',
      remainingFormula: 'max(0, cost * COSMIC[4] - city.shield_box)',
      divisionConstant: 0x14,  // @ FUN_00509b48: (iVar5 * iVar5) / 0x14 = remaining^2 / 20
    },
    nothingAccumulatedPenalty: {
      // @ FUN_00509b48: if city.shield_box == 0: buy_cost *= 2
      condition: 'city.shield_box == 0',
      effect: 'double the buy cost',
    },
    disorderRestriction: {
      // @ FUN_00509b48: if unit && (city.flags & 1) => disorder flag set, button shows '2'
      disorderFlagBit: 1,  // city.flags & 1 = civil disorder
      disorderChar: 0x32,  // '2' = dialog shows can't buy during disorder
    },
    capitalCannotBuy: -0x26,  // @ FUN_00509b48: if -iVar4 == 0x26 => Capitol, can't buy
    cosmicIndex: 4,  // COSMIC[4] = shields-per-row multiplier (default 10)
    confirmDialog: 'COMPLETE0',    // @ s_COMPLETE0_00630e54
    successSound: 0x68,
    affordableChar: 0x31,  // @ FUN_00509b48: local_58 = 0x31 ('1') if can afford
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
    confirmDialog: 'PRODCHANGE',       // @ s_PRODCHANGE_00630f5c
    flagsClearedOnChange: 0xFCFFFFEF,  // @ FUN_0050a473: city.flags &= 0xfcffffef (clears 0x03000010)
    flagMask: 0x03000010,              // inverse of cleared bits: auto-governor + sub-modes
    unitEverBuiltTracking: {
      onSwitchFrom: 'civ.unit_ever_built[old_prod]--',
      onSwitchTo: 'civ.unit_ever_built[new_prod]++',
      address: '@ DAT_0064c7f4[civ*0x594 + unitType]',
    },
    shieldBoxClamp: 'city.shield_box = min(city.shield_box, new_cost)',
    shieldOverflowFlag: 0x200,  // @ FUN_0050a473: (DAT_00655af2 & 0x200) == 0 => show confirm
    cosmicLostShields: '@ DAT_0064bcda',  // @ FUN_0050a473: threshold for lost shield warning
  },

  // --- Production list rendering ---
  productionDialog: 'PRODUCTION',  // @ s_PRODUCTION_00630f1c
  listRanges: {
    unitRange: 0x3E,     // @ FUN_0050a473: for local_660 = 0; < 0x3e (62 unit types)
    buildingRange: 0x27, // @ FUN_0050a473: for local_95c = 1; < 0x27 (39 buildings)
    wonderRange: 0x1C,   // @ FUN_0050a473: for local_6c = 0; < 0x1c (28 wonders)
  },
  listIndexing: {
    unitOffset: 0,       // units: 0..0x3D in list
    buildingOffset: 0x3E, // buildings: 0x3E..0x64 in list
    wonderOffset: 0x65,  // wonders: 0x65+ in list
    wonderDisplayPrefix: 0x27,  // @ FUN_0050a473: wonder index in building namespace = 0x27 + wonderIdx
  },

  // --- Turn estimate text IDs ---
  turnEstimateIds: {
    singular: 0x2D,  // @ FUN_00509ac0: thunk_FUN_0040bc10(0x2d) — "1 turn"
    plural: 0x2C,    // @ FUN_00509ac0: thunk_FUN_0040bc10(0x2c) — "N turns"
    unitStatsA: 0xAA, // @ FUN_0050a473: thunk_FUN_0040bc10(0xaa) — A/D stats
    unitStatsM: 0xAB, // @ FUN_0050a473: thunk_FUN_0040bc10(0xab) — movement stats
  },

  autoGovernor: {
    // @ FUN_0050a473 case 1
    flagBit: 0x10,           // city.flags & 0x10 = auto-governor enabled
    dialog: 'AUTOMODE',      // @ s_AUTOMODE_00630f48
    subModeFlags: {
      mode1: 0x1000000,     // @ FUN_0050a473: city.flags |= 0x1000000 for auto-mode result 1
      mode2: 0x2000000,     // @ FUN_0050a473: city.flags |= 0x2000000 for auto-mode result 2
    },
    soundOnEnable: 99,      // @ FUN_0050a473: thunk_FUN_00441b11(cityIdx, 99)
  },

  freebieDialog: 'FREEBIE',  // @ s_FREEBIE_00630f54 — shown when AI grants free items

  worklistSupport: {
    featureFlag: '@ DAT_00655aea bit 2',  // @ FUN_0050a473: (DAT_00655aea._1_1_ & 2)
    enabled: 'scenario flag determines availability',
    maxEntries: 0x0C,      // @ FUN_0050a473: if 0xb < local_65c => local_65c = 0xc (cap at 12)
  },

  // --- Production list item rendering ---
  // @ FUN_0050a1d6 citywin_render_prod_item_unit (289 bytes)
  // @ FUN_0050a2f7 citywin_render_prod_item_city (380 bytes)
  prodItemRendering: {
    unitBoundary: 0x3E,      // @ FUN_0050a1d6: if param_3 < 0x3e => unit item
    wonderOffset: 0x26,      // @ FUN_0050a1d6: if (param_4 & 1) => local_10 = param_5 + 0x26
    capitalScoring: {
      palaceBonus: 200,      // @ FUN_0050a2f7: if has_building(city, 1) => score + 200
      noProductionBonus: 100, // @ FUN_0050a2f7: if current_prod == -1 => score + 100
    },
    spriteScale: 0xFFFFFFFE, // @ FUN_0050a1d6: thunk_FUN_0047df20(0xfffffffe) — zoom -2
    unitSpriteHeight: 0x30,  // @ FUN_0050a1d6: thunk_FUN_00472cf0(0x30, -2) — 48px at zoom -2
    buildingSpriteHeight: 0x14, // @ FUN_0050a1d6: (0x14 - param_7) / 2 for wonder centering
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
  navArrowObjectSize: 0xCC, // @ FUN_0050cf06: operator_new(0xcc) for prev/next city arrows
  scrollbarObjectSize: 0x40, // @ FUN_0050cf06: operator_new(0x40) for improvements scrollbar

  layout: [
    { name: 'Close',      offset: 0x16B4, position: { x: 0x1CB, y: 0x16C }, size: { w: 0x39, h: 0x18 }, callback: 'citywin_button_close' },
    { name: 'Change',     offset: 0x16B8, position: { x: 0x1BA, y: 0x0B5 }, size: { w: 0x44, h: 0x18 }, callback: 'city_button_change' },
    { name: 'Buy',        offset: 0x16C4, position: { x: 0x1BA, y: 0x0B5 }, size: { w: 0x44, h: 0x18 }, callback: 'city_button_buy' },
    { name: 'View',       offset: 0x16C0, callback: 'city_button_view' },
    { name: 'Rename',     offset: 0x16BC, callback: 'city_button_rename' },
    { name: 'Tab Units',  offset: 0x16CC, callback: 'citywin_button_tab_units' },
    { name: 'Tab Map',    offset: 0x16D0, callback: 'citywin_button_tab_minimap' },
    { name: 'Tab Happy',  offset: 0x16C8, callback: 'citywin_button_tab_happiness' },
    { name: 'Prev City',  offset: 0x16D4, callback: 'citywin_button_prev_city' },
    { name: 'Next City',  offset: 0x16D8, callback: 'citywin_button_next_city' },
  ],

  // --- Close button (@ FUN_0050ca8d) ---
  closeButton: {
    position: { x: 0x1CB, y: 0x16C },  // @ FUN_0050ca8d: thunk_FUN_00511690(0x1cb), thunk_FUN_00511690(0x16c)
    size: { w: 0x39, h: 0x18 },        // @ FUN_0050ca8d: thunk_FUN_00511690(0x39), thunk_FUN_00511690(0x18)
    hotspotOffset: { w: 0x3A, h: 0x19 }, // @ FUN_0050ca8d: thunk_FUN_00511690(0x19), thunk_FUN_00511690(0x3a)
    closeModeOffset: 0x15AC,            // @ FUN_0050ca8d: different art based on this+0x15ac == 2
    closeModeArtOffset: 0xCC,           // @ FUN_0050ca8d: -(uint)(==2) & 0xcc = 204 entries apart
  },

  // --- Change button (@ FUN_0050ccb3) ---
  changeButton: {
    position: { x: 0x1BA, y: 0x0B5 },  // @ FUN_0050ccb3: thunk_FUN_00511690(0x1ba), thunk_FUN_00511690(0xb5)
    size: { w: 0x44, h: 0x18 },        // @ FUN_0050ccb3: thunk_FUN_00511690(0x44), thunk_FUN_00511690(0x18)
    hotspotOffset: { w: 0x73 },         // @ FUN_0050ccb3: thunk_FUN_00511690(0x73)
    autoGovernorFlag: 0x10,             // @ FUN_0050ccb3: (city.flags & 0x10) != 0
    stateTracker: '@ DAT_00630d24',     // @ FUN_0050ccb3: tracks governor state for art swap
  },

  // --- Buy button (@ FUN_0050cf06) ---
  buyButton: {
    position: { x: 0x1BA, y: 0x0B5 },  // @ FUN_0050cf06: same coords as change, placed adjacently
    size: { w: 0x44, h: 0x18 },
  },

  // --- Tab buttons (@ FUN_0050cf06) ---
  tabButtons: {
    // 3 tab buttons at y=0x16C, stacked with 0x3A offset each
    unitsTab:   { position: { x: 0x1CB, y: 0x16C }, size: { w: 0x39, h: 0x18 } },
    happyTab:   { notes: 'offset by 0x3A from units tab' },
    mapTab:     { notes: 'offset by 0x3A from happy tab' },
    renameTab:  { notes: 'offset by -0xC6 (two 0xffffffc6) from map tab, then 0x19 down' },
    viewTab:    { notes: 'offset by 0x3A from rename tab' },
  },

  // --- Prev/Next city arrows (@ FUN_0050cf06) ---
  navArrows: {
    prevCitySurface: '@ DAT_00644770',  // @ FUN_0050cf06: left arrow surface
    nextCitySurface: '@ DAT_006480d8',  // @ FUN_0050cf06: right arrow surface
    prevPaletteColor: 0x5E,  // @ FUN_0050cf06: local_24 = 0x5e for prev arrow
    nextPaletteColor: 0x76,  // @ FUN_0050cf06: local_24 = 0x76 for next arrow
    arrowSize: { w: 0x15, h: 0x18 },  // @ FUN_0050cf06: thunk_FUN_00511690(0x15), thunk_FUN_00511690(0x18)
    arrowPosition: { x: 0x1B5, y: 0x16C },  // @ FUN_0050cf06: thunk_FUN_00511690(0x1b5), thunk_FUN_00511690(0x16c)
    arrowVerticalStep: 0x19,  // @ FUN_0050cf06: thunk_FUN_00511690(0x19) between arrows
  },

  // --- Improvements scrollbar (@ FUN_0050cf06) ---
  improvementsScrollbar: {
    position: { x: 0xC0, y: 0x122 },  // @ FUN_0050cf06: thunk_FUN_00511690(0xc0) + thunk_FUN_00511690(0)
    height: 0x83,            // @ FUN_0050cf06: thunk_FUN_00511690(0x83)
    scrollWidthFromSystemMetrics: true, // @ FUN_0050cf06: GetSystemMetrics(2) for scrollbar width
    itemHeight: 0x0C,        // @ FUN_0050cf06: thunk_FUN_00511690(0xc) — item row height
    controlId: 99,           // @ FUN_0050cf06: thunk_FUN_0040fc50(&DAT_006a9200, 99, ...)
  },

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

  // --- Happiness panel labels ---
  textLabelId: 0x1C5,        // @ FUN_00508552: thunk_FUN_0040bc10(0x1c5) — "Happiness" header
  headerBorderColor: 0x7C,   // @ FUN_00508552: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)
  separatorColor: 0x7C,      // @ FUN_00508552: thunk_FUN_005113b0(..., 0x7c) between rows

  // --- Luxury row ---
  luxurySprite: {
    spriteHeight: 0x0E,    // @ FUN_00508552: thunk_FUN_00511690(0x0e) for luxury icon
  },

  // --- Building effects (row 2) ---
  buildingChecks: {
    // @ FUN_00508552 case 2: checks these buildings to decide if row has content
    temple: 4,               // building 4
    cityWalls: 0x0E,         // building 14
    coastalFortress: 0x0B,   // building 11
    greatWallWonder: 10,     // wonder 10
    library: 7,              // building 7
    barracks: 1,             // building 1
    democracyGovtId: 6,      // if govt == 6 => skip barracks/library check
  },

  // --- Military happiness modifiers ---
  militaryUnhappyIcon: {
    surfaceAddress: '@ DAT_00646598',  // @ FUN_00508177: military unhappy icon surface
    maxGarrison: 3,                     // @ FUN_00508177: if local_28 > 3 => return
  },

  // --- Tithe display ---
  titheLabelId: 0x5D,        // @ FUN_00508552: thunk_FUN_0040bc10(0x5d) for tithe

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
    zoom1: -6,    // sprite scale factor: 0xFFFFFFFA
    zoom2: -3,    // default: 0xFFFFFFFD
    zoom3: 0,     // large
  },
  maxUnits: '(panel_width / unit_w) * (panel_height / unit_h)',

  // --- Panel label ---
  textLabelId: 0x1BF,    // @ FUN_00505666: thunk_FUN_0040bc10(0x1bf) — "Supported Units" header
  labelBorderColor: 0x7C, // @ FUN_00505666: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)

  // --- Per-unit rendering ---
  panelSizes: {
    panelWidth: 0xC0,    // @ FUN_00505666: thunk_FUN_00511690(0xc0) — 192px
    panelHeight: 0x4E,   // @ FUN_00505666: thunk_FUN_00511690(0x4e) — 78px
    tileWidth: 0x40,     // @ FUN_00505666: thunk_FUN_00472cf0(0x40, zoom)
    halfTileHeight: 0x30, // @ FUN_00505666: thunk_FUN_00472cf0(0x30, zoom) — for single row
  },

  supportCost: {
    // @ FUN_00505666
    baseFreeSupport: '@ DAT_006a6608',
    extraSupportFlag: 0x800,     // unit.flags & 0x800 adds 1 support shield
    militaryAbroadFlag: 0x400,   // unit.flags & 0x400 for democracy unhappiness check
    democracyGovtId: 6,          // govt > 4 triggers abroad-unhappiness check
    womensSuffrageCheck: 'wonder 21',   // wonder 0x15
    policeStationCheck: 'building 0x21', // building 33
    settlerDomainId: 5,          // @ FUN_00505666: (&DAT_0064b1ca)[unitType*0x14] == 5 => settler
    republicFirstUnitFree: true, // @ FUN_00505666: govt == 5 && first military unit is free
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

  // --- Sprite dimensions ---
  // @ FUN_00504c05
  panelRect: {
    width: 0xB7,   // @ FUN_00504c05: thunk_FUN_00511690(0xb7) — 183px
    height: 0x93,  // @ FUN_00504c05: thunk_FUN_00511690(0x93) — 147px
  },
  foodIconSprite: {
    widthId: 0x11,   // @ FUN_00504c05: thunk_FUN_00511690(0x11) — 17px per food icon
    heightId: 0x0E,  // @ FUN_00504c05: thunk_FUN_00511690(0xe) — 14px per food row
    surfaceAddress: '@ DAT_00644f3c',  // @ FUN_00504c05: food icon surface
  },
  borderPadding: {
    offset: 0x0F,    // @ FUN_00504c05: thunk_FUN_00511690(0xf) — panel x-offset
    yOffset: 6,      // @ FUN_00504c05: thunk_FUN_00511690(6) — panel y-offset
    shrink: 3,       // @ FUN_00504c05: thunk_FUN_004bb800(&local_14, 3, 3) — inset
  },
  fillColors: {
    background: 0x2C,  // @ FUN_00504c05: thunk_FUN_005baee0(0x2c, 10, 1, 1)
    border: 0x39,      // @ FUN_00504c05: thunk_FUN_005113f0(&local_14, 0x2c, 0x39)
  },
  maxRows: '@ DAT_006a6560',  // @ FUN_00504c05: food box capacity in rows
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
    zoom1: -5,   // sprite offset: 0xFFFFFFFB
    zoom2: -1,   // sprite offset: 0xFFFFFFFF
    zoom3: 1,    // sprite offset: 1
  },

  // --- Sprite rendering ---
  // @ FUN_0050503e
  buildingSprite: {
    yOffset: 0x10,  // @ FUN_0050503e: thunk_FUN_00511690(0x10) — building sprite y-start
    xOffset: 0x50,  // @ FUN_0050503e: thunk_FUN_00511690(0x50) — building sprite x-offset
  },
  unitSprite: {
    xOffset: 0x49,  // @ FUN_0050503e: thunk_FUN_00511690(0x49) — unit sprite x-offset
    yOffset: 1,     // @ FUN_0050503e: thunk_FUN_00511690(1) — unit sprite y-start
  },
  shieldSurface: '@ DAT_00644fb4',  // @ FUN_0050503e: shield icon surface
  panelRect: {
    width: 0xB7,    // @ FUN_0050503e: thunk_FUN_00511690(0xb7)
    height: 0x92,   // @ FUN_0050503e: thunk_FUN_00511690(0x92)
  },
  fillColors: {
    shieldFill: 0x51,  // @ FUN_0050503e: thunk_FUN_005113f0(&local_14, 0x51, 0x5d)
    shieldBorder: 0x5D,
    background: 0x54,  // @ FUN_0050503e: thunk_FUN_005baee0(0x54, 10, 1, 1) for production bg
  },
  shieldIconWidth: 0x11,   // @ FUN_0050503e: thunk_FUN_00511690(0x11) — 17px per shield
  shieldRowHeight: 0x0E,   // @ FUN_0050503e: thunk_FUN_00511690(0xe) — 14px per row
  topPadding: 0x28,        // @ FUN_0050503e: thunk_FUN_00511690(0x28) — yOffset from panel top
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
    foodDeficit: 0x30,      // red (@ 0x41 deficit label, 0x4a deficit label)
    shieldProduction: 0x54,
    shieldWaste: 0x0B,
    shieldSurplus: 0x5C,
    tradeBar: 0x76,
    corruption: 0x79,
    goldIcon: 0x76,
    luxuryIcon: 0x29,
    scienceIcon: 0x5E,
  },

  // --- Text label string IDs (@ thunk_FUN_0040bc10 calls) ---
  textLabelIds: {
    resourceHeader: 0x1C2,  // @ FUN_005025d5: "Resource" label at top
    foodLabel: 0x40,        // @ FUN_005025d5: "Food" label
    foodSurplus: 0x41,      // @ FUN_005025d5: "+N Food" (positive surplus)
    foodDeficit: 0x4A,      // @ FUN_005025d5: "-N Food" (negative = starvation)
    supportLabel: 0xCC,     // @ FUN_005025d5: "Support" label
    wasteLabel: 0x43,       // @ FUN_005025d5: "Waste" label
    shieldSurplus: 0x44,    // @ FUN_005025d5: "+N Shields" label
    shieldDeficit: 0x4B,    // @ FUN_005025d5: "-N Shields" label
    tradeLabel: 0x45,       // @ FUN_005025d5: "Trade" label
    corruptionLabel: 0x46,  // @ FUN_005025d5: "Corruption" label
    goldLabel: 0x47,        // @ FUN_005025d5: "Gold" label
    luxuryLabel: 0x48,      // @ FUN_005025d5: "Luxury" label
    scienceLabel: 0x49,     // @ FUN_005025d5: "Science" label
    titheBonusLabel: 0x5D,  // @ FUN_005025d5: Fundamentalism tithe label
    foodCountWithPenalty: 0xA9, // @ FUN_005025d5: food excess text with WLtKD penalty
  },

  // --- Citizen overlay panel (@ FUN_0050207f) ---
  citizenPanel: {
    headerTextId: 0x193,     // @ FUN_0050207f: thunk_FUN_0040bc10(0x193) — resource map header
    citizenNameTextId: 0x3F, // @ FUN_0050207f: thunk_FUN_0040bc10(0x3f) — citizen name
    borderColor: 0x7C,       // @ FUN_0050207f: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)
    citizenSpriteHeight: 0x1E, // @ FUN_0050207f: thunk_FUN_00511690(0x1e)
  },

  fundamentalismTithe: {
    govtId: 4,
    titheBonusAddress: '@ DAT_006a6618',
    titheBonusString: '@ DAT_00630d90',  // @ FUN_005025d5: thunk_FUN_0040bbe0(&DAT_00630d90)
    notes: 'Extra display line for Fundamentalism tithe bonus if non-zero',
  },

  dataAddresses: {
    foodSurplus: '@ DAT_006a65c8',
    foodNeeded: '@ DAT_006a65d8 * DAT_006a6608',  // food needed = settlers * freeSupport
    supportCost: '@ DAT_006a6568',
    waste: '@ DAT_006a656c',
    netShields: '@ DAT_006a65cc',
    grossTrade: '@ DAT_006a65d0',
    corruption: '@ DAT_006a6580',
    gold: '@ DAT_006a6554',
    luxury: '@ DAT_006a65fc',
    science: '@ DAT_006a6578',
    foodRowCounts: '@ DAT_006a65b8[0..2]',  // @ FUN_005025d5: 3 food icon types
    foodExcess: '@ DAT_006a65b0',            // @ FUN_005025d5: food excess (WLtKD)
    foodDifference: '@ DAT_006a6558',        // @ FUN_005025d5: food difference
    taxRate: '@ DAT_0064c6b4[civ*0x594]',    // @ FUN_005025d5: tax rate
    sciRate: '@ DAT_0064c6b3[civ*0x594]',    // @ FUN_005025d5: science rate
    perCitizenFood: '@ DAT_0064bcca',        // @ FUN_005025d5: food per citizen
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
    quadrantAdjustDX: '@ DAT_0062833b[quadrant]',  // @ FUN_005022c0: x adjustment per quadrant
    quadrantAdjustDY: '@ DAT_00628343[quadrant]',  // @ FUN_005022c0: y adjustment per quadrant
    spiralDX: '@ DAT_00628370[0..20]',  // @ FUN_005022c0: spiral x-offset per slot
    spiralDY: '@ DAT_006283a0[0..20]',  // @ FUN_005022c0: spiral y-offset per slot
    quadrantShift: { subtractBase: 10, rightShift: 4 },  // @ FUN_005022c0: (result - 10) >> 4
    gridFormula: {
      xToSpiral: '(param_1 / tileW) * 2 - 3',   // @ FUN_005022c0: local_18
      yToSpiral: '(param_2 / tileH) * 2 - 3',   // @ FUN_005022c0: local_20
    },
  },

  tileStatusFlags: {
    // @ FUN_005025d5: flags in DAT_006a6530[slot]
    hasCity:     0x08,  // @ FUN_005025d5: (&DAT_006a6530)[local_94] & 8 => city present
    hasUnit:     0x04,  // @ FUN_005025d5: & 4 => unit present (draw unit)
    specialMark: 0x02,  // @ FUN_005025d5: & 2 => draw special overlay
    pollution:   0x10,  // @ FUN_005025d5: & 0x10 => pollution overlay (only if !(& 9))
    workerFree:  0x09,  // @ FUN_005025d5: mask for city+hasUnit check
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

  // --- Text label string IDs ---
  textLabelIds: {
    cityName: 0x1F,        // @ FUN_005092af: thunk_FUN_0040bc10(0x1f) — city name format
    turnNumber: 0x22,      // @ FUN_005092af: thunk_FUN_0040bc10(0x22) — turn number label
    goldAmount: 0x9A,      // @ FUN_005092af: thunk_FUN_0040bc10(0x9a) — gold display
    governorLabel: 0x1B0,  // @ FUN_005092af: thunk_FUN_0040bc10(0x1b0) — governor indicator
  },
  governorCountText: '@ DAT_00630dd8',  // @ FUN_005092af: governor count text template

  autoGovernor: {
    flagBit: 2,              // city.flags & 2 = auto-governor active
    flagAddress: '@ DAT_0064bc60',
    indicator: 'governor symbol shown in title',
  },
  multiplayerCivCount: '@ DAT_006aa78c',
  treasuryAddress: '@ DAT_0064c6a2[civ*0x594]',  // @ FUN_005092af: gold display
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

  tabCount: 17,        // @ FUN_00451bf0: init 17 category tabs (17x thunk_FUN_0043c5f0)

  // --- Tab content types ---
  // @ FUN_00452188 pedia_render_tab_content (356 bytes)
  // switch on tab index (in_stack_00000014): 9 cases (0-8)
  tabContentTypes: {
    0: { name: 'empty/spacer', handler: 'no-op' },
    1: { name: 'Advances', handler: 'FUN_00564d00 / FUN_00564e6d (has sub-mode)' },
    2: { name: 'City Improvements', handler: 'FUN_00599a20 / FUN_00599b8d' },
    3: { name: 'Units', handler: 'FUN_005261a0 / FUN_0052630d' },
    4: { name: 'Terrain', handler: 'FUN_005ac840 / FUN_005ac9ad' },
    5: { name: 'Concepts', handler: 'FUN_00490590 (single mode only)' },
    6: { name: 'Wonders', handler: 'FUN_00518f00 (single mode only)' },
    7: { name: 'Governments', handler: 'FUN_004a69b0 (single mode only)' },
    8: { name: 'Civilizations', handler: 'FUN_005666da (no sub-mode check)' },
  },

  // --- Category list index offset arrays ---
  // @ FUN_00452315 pedia_show_article (1059 bytes)
  // Each category stores its item indices at a different offset in the pedia object
  categoryListOffsets: {
    1: 0x65C,   // @ case 1: extraout_ECX + 0x65c + param_1 * 4  (Advances)
    2: 0x980,   // @ case 2: extraout_ECX + 0x980 + param_1 * 4  (City Improvements)
    3: 0xABC,   // @ case 3: extraout_ECX + 0xabc + param_1 * 4  (Units)
    4: 0xBA0,   // @ case 4: extraout_ECX + 0xba0 + param_1 * 4  (Terrain)
    5: 0xDD0,   // @ case 5: extraout_ECX + 0xdd0 + param_1 * 4  (Concepts)
    6: 0xD94,   // @ case 6: extraout_ECX + 0xd94 + param_1 * 4  (Wonders)
    7: 0xEDC,   // @ case 7: extraout_ECX + 0xedc + param_1 * 4  (Governments)
  },

  // --- Article buffer ---
  // @ FUN_00452315: char local_110c[4096]
  articleBufferSize: 4096,   // 0x1000 bytes for describe.txt article text
  maxArticleLineLength: 0x800,  // @ _fgets(&DAT_00679640, 0x800, ...)

  // --- describe.txt parser ---
  // @ FUN_00452315 + FUN_00452768 pedia_show_description
  describeParser: {
    sectionMarker: '@',           // @ FUN_00452315: local_108[0] != '@'
    commentMarker: ';',           // @ FUN_00452315: DAT_00679640 == ';' => skip line
    newlineChar: 10,              // @ FUN_00452315: _strrchr(&DAT_00679640, 10) => strip newline
    scenarioOverride: {
      // @ FUN_00452768: if (DAT_00655af0 & 0x80) and scenario has own describe.txt
      scenarioFlag: 0x80,         // DAT_00655af0 & 0x80
      filename: 'describe',       // s_describe__006268fc
    },
  },

  // --- Hyperlinks ---
  // @ FUN_00452c14 pedia_add_hyperlink (1361 bytes)
  hyperlinks: {
    nodeSize: 0x48,           // @ FUN_00452c14: operator_new(0x48) -- 72 bytes per link node
    baseControlId: 0xFB4,     // @ FUN_00452c14: local_1c + 0xfb4 (link control base ID)
    linkedListOffset: 0x44,   // @ FUN_00452c14: *(int *)(local_18 + 0x44) for next-node pointer
    linkedListHead: 8000,     // @ FUN_00452c14: *(int *)(in_ECX + 8000) = head of link list
    clickTypes: [1, 2, 3, 4, 5],  // 5 link click handler types (maps to DAT_006a6780 values)
    handlers: {
      1: 'FUN_004531b8 pedia_link_click_left',
      2: 'FUN_0045323a pedia_link_click_right',
      3: 'FUN_004532bc pedia_link_click_3',
      4: 'FUN_0045333e pedia_link_click_4',
      5: 'FUN_004533c0 pedia_link_click_5',
    },
    // @ FUN_00452c14: category help IDs per link type (param_4)
    categoryHelpIds: {
      0: 0x401C76,  // @ case 0: CDialog::SetHelpID(0x401c76)
      1: 0x4019CE,  // @ case 1: CDialog::SetHelpID(0x4019ce)
      2: 0x403729,  // @ case 2: CDialog::SetHelpID(0x403729)
      3: 0x402333,  // @ case 3: CDialog::SetHelpID(0x402333)
      4: 0x4019B0,  // @ case 4: CDialog::SetHelpID(0x4019b0)
    },
    // @ FUN_00452c14: category item arrays used for hyperlink target lookup
    categoryArrays: {
      0: { countOffset: 0x658, itemOffset: 0x7EC },
      1: { countOffset: 0x97C, itemOffset: 0xA1C },
      2: { countOffset: 0xAB8, itemOffset: 0xB2C },
      3: { countOffset: 0xB9C, itemOffset: 0xC98 },
      4: { countOffset: 0xDCC, itemOffset: 0xE54 },
    },
    // @ FUN_00452c14: link text colors
    linkColor: {
      known: 0x6A,    // @ FUN_00452c14: FUN_005c19ad(0x6a) if player has tech
      unknown: 0x55,   // @ FUN_00452c14: FUN_005c19ad(0x55) otherwise
      shadow: 10,      // @ FUN_00452c14: FUN_005c19ad(10) for shadow text
    },
  },

  // --- Palette colors for list rendering ---
  // @ FUN_00450f0b pedia_render_list (1333 bytes)
  paletteColors: {
    background: 'DAT_00635a18',           // @ FUN_00450f0b: FUN_005c0333(..., DAT_00635a18)
    unselectedText: 'DAT_00635a1c',       // @ FUN_00450f0b: local_38 when local_30 == 0
    unselectedShadow: 'DAT_00635a20',     // @ FUN_00450f0b: local_44 when local_30 == 0
    selectedBackground: 'DAT_00635a24',   // @ FUN_00450f0b: local_78 when local_30 != 0
    selectedText: 'DAT_00635a28',         // @ FUN_00450f0b: local_38 when local_30 != 0
    selectedShadow: 'DAT_00635a2c',       // @ FUN_00450f0b: local_44 when local_30 != 0
  },

  // --- Window class registration ---
  // @ register_wndclass_29DF (136 bytes)
  windowClass: {
    className: 'MSHyperTextClass',      // @ s_MSHyperTextClass_00626908
    style: 0x88,                         // @ register_wndclass_29DF: local_2c.style = 0x88
    cbWndExtra: 0x10,                    // @ register_wndclass_29DF: 16 extra bytes per window
    cursorResourceId: 0x212,             // @ register_wndclass_29DF: LoadCursorA(..., 0x212)
    createExStyle: 4,                    // @ FUN_00452ae2: CreateWindowExA(4, ...)
    createStyle: 0x50000000,             // @ FUN_00452ae2: WS_VISIBLE | WS_CHILD
    registeredFlag: 'DAT_00626850',      // singleton guard (set to 1 after first register)
  },

  // --- Tech list panel ---
  // @ FUN_00450480 pedia_setup_list_panel (1602 bytes)
  techListPanel: {
    maxTechs: 100,            // @ FUN_00450480: for (local_2c = 0; local_2c < 100; ...)
    techFilterThreshold: 0x59, // @ FUN_00450480: local_2c < 0x59 (89) for prereq check
    prereqFlag: 0x01,         // @ FUN_00450480: (&DAT_00627689)[local_2c * 0x10] == '\x01'
    intelligenceCheck: {
      setiWonderId: 0x18,        // @ FUN_00450480: thunk_FUN_00453e51(DAT_006d1da0, 0x18)
      greatLibraryWonderId: 9,   // @ FUN_00450480: thunk_FUN_00453e51(DAT_006d1da0, 9)
      embassyFlag: 0x80,         // @ FUN_00450480: treaty & 0x80
      allianceFlag: 0x08,        // @ FUN_00450480: treaty & 8
      spyFlag: 'DAT_00655b07',   // @ FUN_00450480: DAT_00655b07 != '\0'
    },
    perTabItemStride: 0x2004,    // @ FUN_00450480: param_2 * 0x2004 (item array stride per tab)
    itemArrayOffset: 0x3F0,      // @ FUN_00450480: + 0x3f0 + in_ECX (item index array)
    selectionArrayOffset: 0x8400, // @ FUN_00450480: + 0x8400 + in_ECX (selection flag array)
    itemCountBase: 1000,         // @ FUN_00450480: in_ECX + 1000 + param_2 * 4 (item count)
    noSelectionSentinel: -1,     // @ FUN_00450480: 0xffffffff when list empty
    scrollButtonSize: 0x40,      // @ FUN_00450480: operator_new(0x40) for scroll button
    listTextIds: {
      noItemsSelected: 0x36B,    // @ FUN_00450f0b: thunk_FUN_0040bc10(0x36b) -- tab 0
      noItemsOther: 0x36A,       // @ FUN_00450f0b: thunk_FUN_0040bc10(0x36a) -- other tabs
    },
  },

  entryStructure: {
    source: 'describe.txt (game text file)',
    articleLoader: 'FUN_00452315 pedia_show_article',
    descriptionSwitch: 'FUN_00452768 pedia_show_description (switch on category)',
    renderTabs: 'FUN_00452188 pedia_render_tab_content (switch on tab index)',
    listPanel: 'FUN_00450480 pedia_setup_list_panel (1602 bytes, builds tech/improvement list)',
  },

  // --- Scrollbar ---
  // @ FUN_00451bf0 pedia_init_tabs
  scrollbar: {
    controlId: 0xFA9,          // @ FUN_00451bf0: thunk_FUN_004519b0(local_3c, 0xfa9, &local_20)
    helpId: 0x40196F,          // @ FUN_00451bf0: CDialog::SetHelpID(..., 0x40196f)
    scrollCallback: 0x402270,  // @ FUN_00451bf0: thunk_FUN_00451a60(&LAB_00402270)
    itemsPerPage: 9,           // @ FUN_00490590: modulo 9 alignment for pages
    alignment: 'modulo grid alignment to 9-item pages',
  },

  // --- Header rendering ---
  // @ FUN_00451af0 pedia_draw_header (256 bytes)
  headerRendering: {
    shadowColor: 10,           // @ FUN_00451af0: FUN_005c19ad(10) -- shadow text color
    verticalPaddingMultiplier: 0x0D, // @ FUN_00451af0: DAT_0062d85c * 0xd in height calc
    fontHeightCount: 9,        // @ FUN_00451af0: iVar2 * 9 + iVar3 + ... for header height
    style: 'text with shadow',
  },

  // --- Button widget ---
  // @ FUN_00451930 pedia_button_ctor (83 bytes)
  // @ FUN_004519b0 pedia_button_create (139 bytes)
  buttonWidget: {
    callbackOffset: 0x34,       // this+0x34 = callback function
    scrollHandlerOffset: 0x30,  // this+0x30 = scroll handler
    buttonObjectSize: 0x40,     // @ FUN_00450480: operator_new(0x40) -- 64 bytes per button
    tabButtonBase: 0x411,       // @ FUN_00450480: param_2 + 0x411 for tab button ID
    tabButtonHelpId: 0x4017DA,  // @ FUN_00450480: CDialog::SetHelpID(..., 0x4017da)
    widgetStorageStride: {
      scrollButtons: 0x37C,     // @ FUN_00450480: in_ECX + 0x37c + param_2 * 4
      tabButtons: 900,          // @ FUN_00450480: in_ECX + 900 + param_2 * 4
    },
  },

  // --- Sub-mode state ---
  // @ FUN_00451bf0: this+0x11c controls sub-mode (0, 1, 2)
  subModeOffset: 0x11C,
  // @ FUN_00451bf0: this+0x118 stores current tab type
  tabTypeOffset: 0x118,
  // @ FUN_00451bf0: this+0x1b20 stores scrollbar handle
  scrollbarHandleOffset: 0x1B20,
  // @ FUN_00451bf0: this+0x154 controls text source selection
  textSourceOffset: 0x154,
};

// ============================================================================
// === ADVISOR DIALOG (City View) ===
// Binary ref: FUN_00454260..FUN_00456e90 @ block_00450000.c (46 functions)
// ============================================================================

export const ADVISOR_DIALOG = {
  // The city improvement advisor (building grid with animated portraits)
  // 46 functions — all Win32 UI rendering, no game formulas.

  objectSize: 0x1CB4,  // @ FUN_00454260: operator_new(0x1cb4) -- 7348 bytes
  dllSource: 'cv.dll',

  // --- Grid cell dimensions ---
  // @ FUN_004548a9 advisor_setup (loaded from cv.dll)
  gridCells: {
    building: { width: 0x9E, height: 0x72 },   // 158x114 pixels per building cell
    wonder:   { width: 0x7B, height: 0x52 },   // 123x82 pixels per wonder cell
    buildingStride: 0x9F,                        // horizontal stride (cell + 1px gap)
    wonderStride: 0x7C,                          // horizontal stride (cell + 1px gap)
    columnsPerPage: 4,                           // 4 buildings/wonders per row
  },

  // --- Title bar rendering ---
  // @ FUN_004560f8 advisor_title_render
  titleBar: {
    shadowPaletteColor: 10,        // @ FUN_004560f8: palette 10 for shadow text
    foregroundPaletteColor: 0x1A,  // @ FUN_004560f8: palette 0x1a (26) for foreground
    titleRectHeight: 0x28,         // @ FUN_00454354: SetRect(..., 0, 0, w, 0x28) -- 40px
  },

  // --- Portrait selection ---
  // @ FUN_00454f83 advisor_setup_portraits (414 bytes)
  portraitSelection: {
    algorithm: 'Choose advisor portrait based on coastal/inland city location',
    surroundingTilesChecked: 9,
    types: {
      scenario: {
        id: 0, condition: 'scenario flags & 0x80',
        frames: 0x3C, variants: 0, rangeStart: 0x18, rangeEnd: 0x1B,
      },
      coastal: {
        id: 1, condition: 'any surrounding tile is ocean/coast',
        frames: 0x39, variants: 1, rangeStart: 0x18, rangeEnd: 0x1B,
      },
      inland: {
        id: 2, condition: 'default (no coast nearby)',
        frames: 0x3C, variants: 2, rangeStart: 0x18, rangeEnd: 0x1F,
      },
    },
  },

  // --- Building grid rendering ---
  // @ FUN_00455314 advisor_render_building_grid (1694 bytes)
  gridRendering: {
    notes: 'Renders building/wonder sprites in a grid layout with civ-colored backgrounds',
    specialSlotMapping: {
      0x08: 0x35,   // building 8 -> icon 53
      0x1C: 0x23,   // building 28 -> icon 35
      0x1E: 0x36,   // building 30 -> icon 54
      0x1F: 0x39,   // building 31 -> icon 57
      0x22: 0x37,   // building 34 -> icon 55
    },
    maxBuildings: 0x3C,  // @ FUN_00454354: loop 0..59
  },

  // --- Shuffle mechanics ---
  shuffleMechanics: {
    algorithm: 'Pop random item from shuffle deck for animated placement',
  },

  // --- Scroll animation ---
  // @ FUN_0045638b advisor_scroll_right (285 bytes)
  // @ FUN_004564a8 advisor_scroll_left (274 bytes)
  scrollAnimation: {
    stepPixels: 4,             // scroll step = 4 pixels per tick
    maxWidth: 0x500,           // max content width 1280 pixels
    maxHeight: 0x1E0,          // max content height 480 pixels
    horizontalOffset: 'DAT_00626a00',
  },

  // --- Keyboard controls ---
  // @ FUN_0045629b advisor_keypress
  keyCodes: {
    scrollLeft:  [0xA4, 0xC2],
    scrollRight: [0xA6, 0xC3],
    close:       [0xD0, 0xD1, 0xD2],
  },

  // --- Internal data layout ---
  // @ FUN_00454354 advisor_ctor (578 bytes)
  internalLayout: {
    buildingGridArray: 0x14EC,
    animDataBlocks: {
      block1: { src: 'DAT_0061cce0', dst: 0x19F8, size: 0x174 },
      block2: { src: 'DAT_0061ce58', dst: 0x1B6C, size: 0x120 },
    },
    colorSetup: { palette: 0, entries: 0x24, mode: 1 },
  },
};

// ============================================================================
// === DEFENSE BUILDINGS IN HAPPINESS ===
// Binary ref: FUN_00507f31 citywin_draw_defense_buildings @ block_00500000.c (561 bytes)
// ============================================================================

export const DEFENSE_BUILDING_ICONS = {
  // @ FUN_00507f31: draws up to 3 defensive building icons in happiness panel
  maxIcons: 3,
  spriteSize: 0x24,          // @ FUN_00507f31: thunk_FUN_00511690(0x24) — 36px per building icon
  spriteVerticalId: 0x14,    // @ FUN_00507f31: thunk_FUN_00511690(0x14) — 20px centering height
  spacingId: 2,              // @ FUN_00507f31: thunk_FUN_00511690(2) — gap between icons
  checks: [
    { order: 0, buildingId: 0x0E, name: 'City Walls (14)' },
    { order: 1, buildingId: 0x0B, name: 'Coastal Fortress (11)', wonderFallback: { wonderId: 10, buildingId: 0x37, name: 'Great Wall', greatWallBuildingId: 0x31 } },
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
  textLabelId: 0x1C4,       // @ FUN_00507b69: thunk_FUN_0040bc10(0x1c4) — "Minimap" header
  headerBorderColor: 0x7C,  // @ FUN_00507b69: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)

  paletteColors: {
    ownedTile: 0x5D,    // bright — civ owns unit/city here
    otherTile: 0x30,    // dim — visible but not owned (formula: (-(iVar6==0) & 0xffffffd3) + 0x5d)
    unitPosition: 0x1D, // green — unit positions
    cityPosition: 0x29, // bright — city location
  },

  mapDimensions: {
    width: '@ DAT_006d1160',   // @ FUN_00507b69: map width for pixel scale
    height: '@ DAT_006d1162',  // @ FUN_00507b69: map height for pixel scale
  },
  capitalAddress: '@ DAT_0064c6ac[civ*0x594]', // @ FUN_00507b69: capital city x for centering
  wrapFlag: 0x8000,  // @ FUN_00507b69: (DAT_00655ae8 & 0x8000) != 0 => no wrap, center at 0

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
  // --- Unit info text ---
  // @ FUN_00506448 citywin_unit_info_popup (495 bytes)
  unitInfoText: {
    veterancyFlag: 0x2000,   // @ FUN_00506448: (unit.flags & 0x2000) != 0 => show veteran text
    veteranTextId: 0x0D,     // @ FUN_00506448: thunk_FUN_0040bc10(0xd) — "Veteran" label
    nearCityTextId: 0xB2,    // @ FUN_00506448: thunk_FUN_0040bc10(0xb2) — "near city_name"
    popupSurface: { width: 0x40, height: 0x20 },  // @ FUN_00506448: FUN_005cdea1(0x40, 0x20, 0)
  },

  presentUnit: {
    // @ FUN_00506a42
    dialog: 'UNITOPTIONS',   // @ s_UNITOPTIONS_00630dc8
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
    gotoOrder: 0x0B,          // @ FUN_00506a42 case 3: unit.orders = 0x0b (go home)
    disbandOrder: 0xFF,       // @ FUN_00506a42 case 1/8: unit.orders = 0xff (activate)
    popupSizeId: 8,           // @ FUN_00506a42: DAT_0063605c = 8
  },

  supportedUnit: {
    // @ FUN_00506637
    dialog: 'CHILDCLICK',    // @ s_CHILDCLICK_00630dbc
    options: {
      3: 'Go to home city (goto order 0x0B)',
      4: 'Disband (refund cost/2 shields)',
      1: 'Activate (if can_move)',
      2: 'Activate + close city dialog',
    },
    popupSizeId: 8,           // @ FUN_00506637: DAT_0063605c = 8
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

  // --- Text label string IDs ---
  textLabelIds: {
    tradeHeader: 0x1C3,       // @ FUN_005070e5: thunk_FUN_0040bc10(0x1c3) — "Trade Routes" header
    supplyLabel: 0x56,        // @ FUN_005070e5: thunk_FUN_0040bc10(0x56) — "Supply" commodities
    demandLabel: 0x57,        // @ FUN_005070e5: thunk_FUN_0040bc10(0x57) — "Demand" commodities
    establishingLabel: 0xC0,  // @ FUN_005070e5: thunk_FUN_0040bc10(0xc0) — "establishing..."
    noHomeLabel: 0x0E,        // @ FUN_005070e5: thunk_FUN_0040bc10(0xe) — unit with no home
  },
  headerBorderColor: 0x7C,    // @ FUN_005070e5: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)
  unitNameColor: { palette: 10, style: 0x1A }, // @ FUN_005070e5: thunk_FUN_005baee0(10, 0x1a, 1, 1)
  establishingString: '@ DAT_00630dd4',  // @ FUN_005070e5: thunk_FUN_0040bbe0(&DAT_00630dd4)

  // --- Air capacity display ---
  airCapacitySurface: '@ DAT_006466c8',  // @ FUN_005070e5: thunk_FUN_005114d0(&DAT_006466c8, ...)
  airCapacitySprite: {
    widthId: 0x40,   // @ FUN_005070e5: thunk_FUN_00511690(0x40) — 64px plane icon
    yOffset: 100,    // @ FUN_005070e5: thunk_FUN_00511690(100) — y offset for air capacity
    xOffset: 7,      // @ FUN_005070e5: thunk_FUN_00511690(7) — x offset
  },

  // --- Units present layout ---
  unitTileDimensions: {
    tileWidth: 0x40,     // @ FUN_005070e5: thunk_FUN_00472cf0(0x40, zoom)
    halfTileHeight: 0x30, // @ FUN_005070e5: thunk_FUN_00472cf0(0x30, zoom)
    tileHeight: 0x34,    // @ FUN_005070e5: thunk_FUN_00472cf0(0x34, zoom)
  },
  panelWidthId: 0xF4,     // @ FUN_005070e5: thunk_FUN_00511690(0xf4) — 244px panel width
  tradeRouteTextStyle: 0x79, // @ FUN_005070e5: thunk_FUN_005baee0(0x79, 0x12, 1, 1)
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
  totalRange: 0x43,    // @ FUN_00505ffa: for local_40 = 0; < 0x43 (67 total items)

  scrollPosition: '@ DAT_006aa76c (this+0x15B4)',
  totalCountAddress: '@ DAT_006aa770',

  // --- Panel header ---
  textLabelId: 0x1C0,       // @ FUN_00505ffa: thunk_FUN_0040bc10(0x1c0) — "Improvements" header
  headerBorderColor: 0x7C,  // @ FUN_00505ffa: thunk_FUN_005baee0(0x7c, 0x12, 1, 1)

  // --- Scrollbar ---
  scrollbarItemHeight: 0x0C, // @ FUN_00505ffa: thunk_FUN_00511690(0xc) — 12px per item row
  scrollbarPanelWidth: 0xC0, // @ FUN_00505ffa: thunk_FUN_00511690(0xc0) — 192px scrollbar width
  scrollbarPadding: 4,       // @ FUN_00505ffa: thunk_FUN_00511690(4) — padding from edge

  // --- Improvement sprite ---
  spriteXOffset: 0x18,       // @ FUN_00505ffa: thunk_FUN_00511690(0x18) — 24px name text x-offset
  spriteTextColor: 0x29,     // @ FUN_00505ffa: thunk_FUN_005baee0(0x29, 10, 1, 0)

  maintenanceIcon: {
    spriteZoom: 'sprite_zoom * 3 - 7',  // @ FUN_00505ffa: *(in_ECX+0x15d4) * 3 + -7
    zoomFormula: 'this.zoom * 2 + -8',  // @ FUN_00505ffa: local_18 = *(in_ECX+0x15d4) * 2 + -8
    shownForBuildings: true,
    shownForWonders: false,
  },

  buildingNameAddress: '@ DAT_0064c488[building*8]',  // @ FUN_00505ffa: building name lookup
};

// ============================================================================
// === SCENARIO EDITOR ===
// Binary ref: FUN_005b1037 @ block_005B0000.c (init, 2484 bytes)
// Binary ref: FUN_005b09dc @ block_005B0000.c (paint, 1627 bytes)
// Binary ref: FUN_005b0473 @ block_005B0000.c (tab list population)
// Binary ref: FUN_005b08e8 @ block_005B0000.c (checkbox tab creation)
// Binary ref: FUN_005b0373 @ block_005B0000.c (button handler)
// Binary ref: FUN_005b02a5 @ block_005B0000.c (tab toggle logic)
// Full scenario editor window — edit units, terrain, improvements, etc.
// ============================================================================

export const SCENARIO_EDITOR = {
  // --- Window dimensions ---
  // @ FUN_005b1037: *(in_ECX + 0x2d8) = 0x230; *(in_ECX + 0x2dc) = 0x17c
  windowSize: {
    width: 0x230,              // 560 pixels
    height: 0x17C,             // 380 pixels
  },

  // --- Window style ---
  // @ FUN_005b1037: FUN_005d2550(0x29), FUN_005d2568(0x12,1,1), FUN_005d2590(0x25)
  style: {
    textColor: 0x29,           // palette index for text
    borderStyle: { color: 0x12, bold: 1, shadow: 1 },
    backgroundColor: 0x25,
  },

  // --- GIF background ---
  // @ FUN_005b1037: FUN_005bf071(s_EDITORSA_GIF_00635fe4, 10, 0xC0, local_444)
  backgroundGif: {
    name: 'EDITORSA_GIF',      // @ s_EDITORSA_GIF_00635fe4
    param1: 10,
    param2: 0xC0,              // 192
  },

  // --- Object allocation ---
  // @ FUN_005b1037: operator_new(0x48)
  objectSize: 0x48,

  // --- Initial button ID counter ---
  // @ FUN_005b1037: DAT_006a1d80 = 0xC9 (201 decimal)
  initialButtonId: 0xC9,

  // --- Button handler ---
  // @ FUN_005b0373: param_1 == 0xC9 → toggle mode; param_1 == 0xCD → tab toggle
  buttonIds: {
    toggleMode: 0xC9,          // @ FUN_005b0373: main toggle (get/set via FUN_005af4ae/418d90)
    tabToggle: 0xCD,           // @ FUN_005b0373: else if param_1 == 0xCD → FUN_005b02a5
  },

  // --- Debug strings ---
  // @ FUN_005b0373: thunk_FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00635fd8)
  debugStrings: {
    debug: '@ s_DEBUG_006359dc',
    notice: '@ s_NOTICE_00635fd8',
  },

  // --- Tab system ---
  // @ FUN_005b1037: for (local_460 = 0; local_460 < 0xD; ...) — 13 tabs total
  tabCount: 0x0D,              // 13 tabs

  // Tab layout table at DAT_00635E60 (8 bytes per entry: type, subIndex)
  // @ FUN_005b1037: DAT_00635e60[i*8] = type, DAT_00635e64[i*8] = subIndex
  tabLayoutTable: {
    base: 'DAT_00635E60',      // tab type+subIndex pairs
    stride: 8,
    typeField: 'DAT_00635E60 + i*8',   // tab type
    indexField: 'DAT_00635E64 + i*8',   // tab sub-index
    types: {
      checkbox: 9,             // type 9 → FUN_005b08e8 (checkbox control)
      list: 0x0C,              // type 12 → FUN_005b0473 (listbox control)
    },
  },

  // --- Tab header art ---
  // @ FUN_005b1037: thunk_FUN_00428b0c(DAT_00628420 + 0x72C) — header image, count=0xD
  tabHeaderArt: {
    spriteOffset: 0x72C,       // @ DAT_00628420 + 0x72C
    count: 0x0D,               // 13 tab images
  },

  // --- Checkbox tabs ---
  // @ FUN_005b08e8: checkbox at tab position table DAT_00635E20[param_1*2] / DAT_00635E24[param_1*2]
  checkboxTab: {
    positionTableX: 'DAT_00635E20',    // x-offsets per checkbox tab
    positionTableY: 'DAT_00635E24',    // y-offsets per checkbox tab
    stride: 8,                         // 2 ints (8 bytes) per entry
    width: 0x30,              // 48 pixels per checkbox
    heightFormula: 'this.lineHeight + 6', // @ FUN_005b08e8: *(in_ECX + 0x2E8) + 6
    stringTable: 'DAT_00635FE0',       // @ FUN_005b08e8: thunk_FUN_00418910(..., &DAT_00635FE0)
    valueRange: 3,             // @ FUN_005b08e8: thunk_FUN_004189c0(3) — 3-state toggle
    callback: 'LAB_00401019',  // @ FUN_005b08e8: thunk_FUN_00418a00(&LAB_00401019)
  },

  // --- List tabs (FUN_005b0473) ---
  listTab: {
    // Tab position offsets (from another table at DAT_00635DF8)
    positionTableX: 'DAT_00635DF8',    // @ FUN_005b0473: DAT_00635df8[param_1*8]
    positionTableY: 'DAT_00635DFC',    // @ FUN_005b0473: DAT_00635dfc[param_1*8]
    stride: 8,

    // List dimensions differ by tab:
    // tab 0 (units): x-0xF, width=0x82, height = lineHeight << 3
    // tabs 1-4: x-0x1E, width=0xA0, height = lineHeight << 3
    tab0Adjust: { xOffset: -0x0F, width: 0x82 },
    otherAdjust: { xOffset: -0x1E, width: 0xA0 },
    heightFormula: 'lineHeight << 3',   // @ FUN_005b0473: *(in_ECX + 0x2E8) << 3

    callback: 'LAB_0040326f',  // @ FUN_005b0473: thunk_FUN_00418dd0(&LAB_0040326f)

    // --- Per-tab list items ---
    items: {
      // case 0: Unit types — 0x3E (62) items from DAT_0064B1B8 (stride 0x14)
      0: {
        label: 'Unit Types',
        count: 0x3E,           // 62 unit types
        nameBase: 'DAT_0064B1B8',
        nameStride: 0x14,      // unit type record stride
      },
      // cases 1,2: Tech/improvement lists — "None" + "Random" + 100 techs
      '1_2': {
        label: 'Techs (with None/Random prefix)',
        prefixItems: [
          { offset: 0x7C0, note: 'DAT_00628420+0x7C0 — "None" entry' },
          { offset: 0x7C4, note: 'DAT_00628420+0x7C4 — "Random" entry' },
        ],
        techCount: 100,
        techNameBase: 'DAT_00627684',
        techNameStride: 0x10,
      },
      // case 3: Terrain detail — 8 items from DAT_00628420 offsets
      3: {
        label: 'Terrain Detail',
        count: 8,
        spriteOffsets: [0x794, 0x798, 0x7E0, 0x7E4, 0x7E8, 0x7EC, 0x7F0, 0x7F4],
      },
      // case 4: 3 miscellaneous items
      4: {
        label: 'Miscellaneous',
        count: 3,
        spriteOffsets: [0x7F8, 0x7FC, 0x800],
      },
    },
  },

  // --- Minimap ---
  // @ FUN_005b09dc: thunk_FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, uVar1)
  minimap: {
    width: 0x40,               // 64 pixels
    height: 0x40,              // 64 pixels
    xOffset: 0x20,             // @ FUN_005b09dc: local_8 = *(in_ECX + 0x124) + 0x20
    yOffset: 0x20,             // @ FUN_005b09dc: local_c = *(in_ECX + 0x128) + 0x20
    borderWidth: 6,            // @ FUN_005b09dc: thunk_FUN_004ccb6a(..., 6)
  },

  // --- Main content border rect ---
  // @ FUN_005b09dc: thunk_FUN_004ccb6a(in_ECX, +0x79, +0x4F, 0x14D, 0x47, 6)
  contentBorder: {
    xOffset: 0x79,             // 121 pixels from window left
    yOffset: 0x4F,             // 79 pixels from window top
    width: 0x14D,              // 333 pixels
    height: 0x47,              // 71 pixels
    borderWidth: 6,
  },

  // --- Paint text style ---
  // @ FUN_005b09dc: thunk_FUN_005baee0(0x29, 0x12, 1, 1)
  paintStyle: {
    textColor: 0x29,
    borderColor: 0x12,
    bold: 1,
    shadow: 1,
  },

  // --- Tab label string resource IDs ---
  // @ FUN_005b09dc: thunk_FUN_0040bc10(id) for each tab label
  tabLabels: {
    title: 0x1E9,              // @ FUN_005b09dc: 0x1E9 — main editor title (centered above minimap)
    secondLabel: 0x7E,         // @ FUN_005b09dc: 0x7E — second label row
    tab0: 0x1DE,               // tab labels 0x1DE through 0x1E8 (11 tabs)
    tab1: 0x1DF,
    tab2: 0x1E0,
    tab3: 0x1E1,
    tab4: 0x1E2,
    tab5: 0x1E3,
    tab6: 0x1E4,
    tab7: 0x1E5,
    tab8: 0x1E6,
    tab9: 0x1E7,
    tab10: 0x1E8,
    // Tab label position tables:
    // x-positions: DAT_00635E00, +08, +10, +18, +20, +28, +30, +38, +40, +48, +50, +58
    // y-positions: DAT_00635E04, +0C, +14, +1C, +24, +2C, +34, +3C, +44, +4C, +54, +5C
    positionTableBase: 'DAT_00635E00',
    positionStride: 8,         // 2 ints (x,y) per label, 8 bytes apart
    // First label uses +0x32 x-offset, rest use +0x18 x-offset
    xAdjustFirst: 0x32,        // @ FUN_005b09dc: local_10 = DAT_00635e00 + ... + 0x32
    xAdjustRest: 0x18,         // @ FUN_005b09dc: local_10 = DAT_00635eXX + ... + 0x18
    yFormula: '(tabY + windowY) - lineHeight - 2',  // @ FUN_005b09dc
  },

  // --- Bottom toolbar buttons ---
  // @ FUN_005b1037: 4 buttons with IDs 0x65 and 0x66
  toolbarButtons: {
    // Close/OK button
    closeButton: {
      id: 0x65,
      spriteOffset: 0x3F8,     // @ DAT_00628420 + 0x3F8
      callback: 'LAB_00401767',
    },
    // 3 palette-style buttons (all ID 0x66)
    paletteButtons: [
      { id: 0x66, spriteOffset: 0xA8,  callback: 'LAB_00403210' },  // @ DAT_00628420 + 0xA8
      { id: 0x66, spriteOffset: 0x8EC, callback: 'LAB_00403788' },  // @ DAT_00628420 + 0x8EC
      { id: 0x66, spriteOffset: 0x3FC, callback: 'LAB_00403c88' },  // @ DAT_00628420 + 0x3FC
    ],
  },

  // --- Side panel buttons ---
  // @ FUN_005b1037: 3 vertical buttons with ID 0x65
  sidePanelButtons: [
    { id: 0x65, spriteOffset: 0x7CC, callback: 'LAB_00402202' },  // @ DAT_00628420 + 0x7CC
    { id: 0x65, spriteOffset: 2000, callback: 'LAB_004029b4' },   // @ DAT_00628420 + 2000 (0x7D0)
    { id: 0x65, spriteOffset: 0x7D4, callback: 'LAB_00403a85' },  // @ DAT_00628420 + 0x7D4
  ],

  // --- Scenario display globals ---
  // @ FUN_005b1037: _DAT_00635EF0 = 0x7F / DAT_0064BCC8; _DAT_00635F00 = 0xC
  displayGlobals: {
    scaleFormula: '0x7F / DAT_0064BCC8',   // @ FUN_005b1037: _DAT_00635EF0
    scaleDivisorAddr: 'DAT_0064BCC8',
    scaleNumerator: 0x7F,      // 127
    lineConstant: 0x0C,        // @ FUN_005b1037: _DAT_00635F00 = 0xC
  },

  // --- Editor civ record ---
  // @ FUN_005b09dc: DAT_00641848 + *(in_ECX + 0x2EC) * 0x3C — civ data for selected civ
  civRecord: {
    base: 'DAT_00641848',
    stride: 0x3C,              // 60 bytes per civ record
    selectedCivOffset: 0x2EC,  // @ in_ECX + 0x2EC — index of current editor civ
  },

  // --- Fallback paint mode ---
  // @ FUN_005b09dc: if (DAT_0062E018 == 0 || DAT_006A1D7C == 0) → solid fill 0x1D
  fallbackFill: {
    condition: 'DAT_0062E018 == 0 || DAT_006A1D7C == 0',
    fillOffset: 700,           // @ FUN_005b09dc: in_ECX + 700
    fillColor: 0x1D,
  },

  // --- Column width formula (same as cosmic editor) ---
  // @ FUN_005b1037: (*(in_ECX+300) - 10 + 3) >> 2
  columnWidthFormula: '(windowWidth - 10 + 3) >> 2',
  windowWidthField: 300,       // @ in_ECX + 300 (0x12C)

  // --- Event loop ---
  // @ FUN_005b1037: *(in_ECX + 0x2F8) = 5 — initial event state
  initialEventState: 5,
  eventLoopFlag: 'DAT_006A1D7C',  // @ FUN_005b1037: while (DAT_006A1D7C != 0)

  // sourceAddr: '0x005B1037'
};

// ============================================================================
// === RESEARCH GOAL DIALOG ===
// Binary ref: FUN_004c0cf7 @ block_004C0000.c (3119 bytes)
// 3-tab picker for setting a research goal (techs, unit types, improvements)
// ============================================================================

export const RESEARCH_GOAL_DIALOG = {
  // @ FUN_004c0cf7: thunk_FUN_0040ffa0(s_RESEARCHGOAL_0062dbc8, 1)
  dialogTemplate: 'RESEARCHGOAL',
  memoryAlloc: 0x2000,       // @ FUN_004c0cf7: thunk_FUN_0059db08(0x2000)

  // --- 3 tabs ---
  tabs: {
    0: {
      name: 'Advances',
      helpId: 0x402F63,        // @ CPropertySheet::EnableStackedTabs(local_308, 0x402f63)
      itemLoop: { start: 0, end: 100, stride: 0x10 },  // 100 techs
      techDataBase: 'DAT_00627684',   // tech name pointers
      techFlagBase: 'DAT_00627689',   // tech availability flags
      prereqBase1: 'DAT_0062768e',    // prereq 1
      prereqBase2: 'DAT_0062768f',    // prereq 2
      futuretech: { index: 0x59, extraField: 'era counter +1' },  // tech 89 = Future Tech
    },
    1: {
      name: 'Unit Types',
      helpId: 0x401951,        // @ CPropertySheet::EnableStackedTabs(local_308, 0x401951)
      itemLoop: { start: 0, end: 0x3E, stride: 0x14 }, // 62 unit types
      unitTypeBase: 'DAT_0064b1b8',   // unit type name pointers (stride 0x14)
      techReqBase: 'DAT_0064b1cb',    // unit tech requirement (offset 0x13 in type record)
      helponDialog: 'HELPON',          // @ s_HELPON_0062dbe0
      subDialog: { unitInfo: 'FUN_005ad998', techInfo: 'FUN_00566584' },
    },
    2: {
      name: 'Improvements',
      helpId: 0x401776,        // @ CPropertySheet::EnableStackedTabs(local_308, 0x401776)
      itemLoop: { start: 0, end: 0x43, stride: 8 },    // 67 buildings+wonders
      buildingBase: 'DAT_0064c488',    // building name pointers (stride 8)
      techReqBase: 'DAT_0064c48e',     // building tech requirement
      helponDialog: 'HELPON',           // @ s_HELPON_0062dbe8
      subDialog: { buildingInfo: 'FUN_0059a2e6', techInfo: 'FUN_00566584' },
    },
  },

  // --- Tab switching buttons ---
  // DAT_00628420 offsets for tab button art resources:
  tabButtonOffsets: {
    tab0: 0x30C,   // @ FUN_004c0cf7: DAT_00628420 + 0x30c (Advances button)
    tab1: 0x310,   // @ FUN_004c0cf7: DAT_00628420 + 0x310 (Unit Types button)
    tab2: 0x314,   // @ FUN_004c0cf7: DAT_00628420 + 0x314 (Improvements button)
  },

  // --- Goal path computation ---
  // After selection, the function walks through all 100 techs (0..99) to find
  // which unresearched techs lead to the selected goal tech.
  // Uses thunk_FUN_004bdaa5(goalTech, candidateTech) to check reachability.
  pathComputation: {
    techRange: 100,               // loop local_31c = 0..99
    prereqCheckFn: 'thunk_FUN_004bdaa5',  // checks if candidateTech leads to goalTech
    noPathDialog: {
      research: 'RESEARCHNONE',     // @ s_RESEARCHNONE_0062dbfc — "No path to goal"
      steal: 'STEALNONE',           // @ s_STEALNONE_0062dbf0
    },
    confirmDialog: {
      research: 'RESEARCHTHESE',    // @ s_RESEARCHTHESE_0062dc18 — "These techs lead to goal"
      steal: 'STEALTHESE',          // @ s_STEALTHESE_0062dc0c
    },
    andSeparator: 0xB5,             // @ thunk_FUN_0040bc10(0xb5) — "and" text between last two items
  },

  // --- Connecting text ---
  separators: {
    unitToTech: 'DAT_0062dbd8',     // " — " separator between unit name and tech name
    buildingToTech: 'DAT_0062dbdc',  // " — " separator between building name and tech name
  },

  // sourceAddr: '0x004C0CF7'
};

// ============================================================================
// === COSMIC EDITOR WINDOW (Cheat Mode UI) ===
// Binary ref: constructor @ block_00580000.c (around line 1560-1640)
// Binary ref: FUN_005866d3, FUN_005869d4, FUN_00586bb6
// ============================================================================

export const COSMIC_EDITOR_WINDOW = {
  // --- Window dimensions ---
  // @ constructor: *(in_ECX + 0x2d8) = 0x230; *(in_ECX + 0x2dc) = 0x1c6
  windowSize: {
    width: 0x230,              // 560 pixels
    height: 0x1C6,             // 454 pixels
  },

  // --- Window style ---
  // @ constructor: FUN_005d25a8, FUN_005d2550(0x29), FUN_005d2568(0x12,1,1), FUN_005d2590(0x25)
  style: {
    textColor: 0x29,           // palette index for text
    borderStyle: { color: 0x12, bold: 1, shadow: 1 },
    backgroundColor: 0x25,
  },

  // --- Editor object allocation ---
  objectSize: 0x48,            // @ constructor: operator_new(0x48)

  // --- Close button ---
  closeButtonId: 0x65,         // @ constructor: thunk_FUN_0040f680(local_478, 0x65, ...)
  closeCallback: 'LAB_0040342c', // @ constructor: thunk_FUN_0040f880(&LAB_0040342c)

  // --- Listbox scrolling ---
  listboxControlId: 0xC9,     // @ constructor: DAT_006a1d80 starts at 0xC9 (201 decimal)
  listboxCallback: 'LAB_004038a5', // @ constructor: thunk_FUN_00551dc0(&LAB_004038a5)

  // --- Column layout ---
  // @ constructor: line_height = ((width-10 + ((width-10)>>31 & 3)) >> 2
  columnWidthFormula: '(windowWidth - 10 + 3) >> 2',

  // sourceAddr: block_00580000.c ~line 1560-1640
};

// ============================================================================
// === CIVILOPEDIA CATEGORIES ===
// Binary ref: FUN_004f5f23 (page navigation), FUN_004f7ac7 (title strings)
// block_004F0000.c:1735-1784, 2533-2558
// ============================================================================

export const CIVILOPEDIA_CATEGORIES = {
  note: 'Civilopedia uses an internal category ID (1-8) to select content lists and title strings.',

  // --- Category IDs used in the navigation switch (FUN_004f5f23) ---
  // The switch dispatches to different pedia page builders:
  categories: {
    1: { name: 'Civilization Advances',  titleStringId: 0x29F, dataSource: 'DAT_006a7d44' },
    2: { name: 'City Improvements',      titleStringId: 0x2A0, dataSource: 'DAT_006a7d48' },
    3: { name: 'Wonders of the World',   titleStringId: 0x2A1, dataSource: 'DAT_006a7d4c' },
    4: { name: 'Units',                  titleStringId: 0x2A2, dataSource: 'DAT_006a7d50' },
    5: { name: 'Terrain',                titleStringId: 0x2A3, dataSource: 'DAT_006a7d58' },
    6: { name: 'Governments',            titleStringId: 0x2A4, dataSource: 'DAT_006a7d54',
         note: 'Categories 6 and 7 use 2-level navigation (DAT_006a6784 goes to 2 instead of 1)' },
    7: { name: 'Game Concepts',          titleStringId: 0x2A5, dataSource: 'DAT_006a7d5c',
         note: 'Categories 6 and 7 use 2-level navigation' },
    8: { name: 'Miscellaneous',          titleStringId: 0x29F, dataSource: 'DAT_006a7d44',
         note: 'Shares data with category 1 (Advances). Entered via FUN_004f5ed2.' },
  },

  // --- List sizes stored at in_ECX offsets, populated by FUN_004f7c99 ---
  // The pedia populates sorted linked lists for each category by reading
  // Describe.txt sections:
  listPopulation: {
    advances:     { section: '@ADVANCE_INDEX',     maxItems: 100, ecxOffset: 0x658, note: 'in_ECX+0x65c' },
    improvements: { section: '@IMPROVEMENT_INDEX', maxItems: 0x27, ecxOffset: 0x97C, note: 'in_ECX+0x980' },
    wonders:      { section: null,                 maxItems: 0x1C, ecxOffset: null, note: 'in_ECX+0xABC' },
    units:        { section: null,                 maxItems: 0x3E, ecxOffset: null, note: 'in_ECX+0xBA0' },
    terrain:      { section: null,                 maxItems: 0x100, ecxOffset: null, note: 'in_ECX+0xEDC' },
    governments:  { section: null,                 maxItems: 7, ecxOffset: null, note: 'in_ECX+0xD94' },
    concepts:     { section: null,                 maxItems: 0x21, ecxOffset: null, note: 'in_ECX+0xDD0' },
  },

  // --- Display layout ---
  // FUN_004f66c6: grid is 2 columns x 9 rows = 18 items per page
  gridLayout: {
    columns: 2,
    rows: 9,
    itemsPerPage: 18,
    note: 'Navigation: PageUp/PageDown moves ±9, arrows move ±1, Home/End go to start/end.',
  },

  // --- Pedia dialog dimensions ---
  // FUN_004f4b9f: base dimensions 0x280 x 400 (640 x 400)
  dialogDimensions: {
    baseWidth: 0x280,    // 640
    baseHeight: 400,
    spriteScaleDivisor: 0x18, // 24: icon dimensions = (imageWidth * viewHeight) / 0x18
  },

  sourceAddr: '0x004F5F23, 0x004F7AC7, 0x004F4B9F, 0x004F7C99',
};

// ============================================================================
// === MUSIC SELECTION / CD TRACK DETECTION ===
// Binary ref: FUN_004e25ef @ block_004E0000.c:1038-1106
// ============================================================================

export const MUSIC_DETECTION = {
  note: 'On startup, the game detects which Civ2 CD is inserted by counting audio tracks.',

  // FUN_005ddeff returns the number of audio tracks; the game matches:
  cdDetection: {
    0x18: { cd: 'Fantastic Worlds', dialog: 'PICKMUSICFANWORLDS' },
    0x12: { cd: 'Scenarios',        dialog: 'PICKMUSICSCENARIO' },
    0x0C: { cd: 'Gold Edition',     dialog: 'PICKMUSICGOLD' },
    10:   { cd: 'Original',         dialog: 'PICKMUSIC' },
  },

  // If detection fails after 5 retries (200ms each), falls back to:
  fallbackDialog: 'NOPICKMUSICNEW',
  retryCount: 5,
  retryDelayMs: 200,

  sourceAddr: '0x004E25EF',
};

// ============================================================================
// === WINDOW DIMENSIONS / RESOLUTION CONSTANTS ===
// Binary ref: FUN_004e02ef @ block_004E0000.c:146-224
// ============================================================================

export const WINDOW_INIT_DIMENSIONS = {
  note: 'Window setup dimensions depend on DAT_0067a8fc (high-res mode flag).',

  normalMode: { width: 0x208, height: 0x14F },   // 520 x 335
  highResMode: { width: 800, height: 0x1CC },     // 800 x 460

  // The second window (DAT_0068ad3c) uses the same dimension logic.
  sourceAddr: '0x004E02EF',
};


// ============================================================================
// === MAP SIZE PRESETS & CUSTOM MAP LIMITS ===
// Binary ref: FUN_0041cc04 @ block_00410000.c:6542-6579 (game_setup_map_size)
// ============================================================================

export const MAP_SIZE_PRESETS = {
  // Map size selection from new game setup dialog
  // DAT_006d1160 = map width (BEFORE doubling), DAT_006d1162 = map height
  // Width is doubled AFTER preset selection (line 6536: DAT_006d1160 = DAT_006d1160 * 2)
  presets: {
    0: { name: 'Small',  width: 0x28, height: 0x32 },  // 40 x 50  (80 x 50 after doubling)
    1: { name: 'Medium', width: 0x32, height: 0x50 },  // 50 x 80  (100 x 80 after doubling)
    2: { name: 'Large',  width: 0x4b, height: 0x78 },  // 75 x 120 (150 x 120 after doubling)
  },

  // Custom map size limits (from validation at block_00410000.c:6577-6579)
  // Dimensions validated BEFORE width doubling
  custom: {
    minDimension: 20,       // 0x14 — both width and height must be > 0x13 (i.e. >= 20)
    maxDimension: 250,      // 0xfb — both width and height must be < 0xfb (i.e. <= 250)
    minArea: 1000,          // width * height must be > 999 (i.e. >= 1000)
    maxArea: 10000,         // 0x2711 — width * height must be < 0x2711 (i.e. <= 10000)
    dialog: 'CUSTOMSIZE',   // @ s_CUSTOMSIZE_00625550
  },

  // Map size flags (set BEFORE width doubling, based on pre-doubled area)
  sizeFlags: {
    // DAT_00655af0 is the game flags byte
    largeMapFlag: 0x04,     // @ block_00410000.c:6531 — set if width*height > 5999
    smallMapFlag: 0x08,     // @ block_00410000.c:6534 — set if width*height < 3000
    largeMapThreshold: 5999,
    smallMapThreshold: 3000,
  },

  // Width is always doubled after selection/validation:
  // DAT_006d1160 = DAT_006d1160 * 2 (block_00410000.c:6536)
  widthDoublingNote: 'Map width is doubled after preset/custom selection for isometric grid',

  sourceAddr: '0x0041CC04',
};


// ============================================================================
// === RULES.TXT PARSING — SECTION NAMES & RECORD COUNTS ===
// Binary ref: FUN_0041b00e @ block_00410000.c:5577-5600 (parse_rules_file)
// ============================================================================

export const RULES_TXT_SECTIONS = {
  // Master parse order: FUN_0041b00e calls each parser in sequence
  // Each parser seeks to a named section header, then reads N records

  COSMIC: {
    sectionName: 'COSMIC',          // @ s_COSMIC_006252cc (block_00410000.c:5063)
    parser: 'FUN_00419d23',         // 22 byte parameters with min/max validation
    parameterCount: 22,             // 22 cosmic parameters (DAT_0064bcc8..DAT_0064bcdd)
    sourceAddr: '0x00419D23',
  },

  CIVILIZE: {
    sectionName: 'CIVILIZE',        // @ s_CIVILIZE_006252d4 (block_00410000.c:5148)
    parser: 'FUN_0041a046',
    maxRecords: 100,                // loop: local_14 < 100 (block_00410000.c:5150)
    recordStride: 0x10,             // 16 bytes per advance in memory
    dataBase: 'DAT_00627684',       // advance name pointers
    nameLength: 0x14,               // 20-char max name (block_00410000.c:5165)
    sourceAddr: '0x0041A046',
  },

  IMPROVE: {
    sectionName: 'IMPROVE',         // @ s_IMPROVE_006252ec (block_00410000.c:5249)
    parser: 'FUN_0041a422',
    maxRecords: 0x43,               // 67 entries total (block_00410000.c:5250)
    recordStride: 8,                // 8 bytes per improvement in memory
    dataBase: 'DAT_0064c488',       // improvement data table
    nameLength: 0x19,               // 25-char max name (block_00410000.c:5253)
    sourceAddr: '0x0041A422',
  },

  ENDWONDER: {
    sectionName: 'ENDWONDER',       // @ s_ENDWONDER_006252f4 (block_00410000.c:5274)
    // Sub-section of IMPROVE: 0x1c (28) wonder obsolescence records
    maxRecords: 0x1C,               // 28 wonder obsolescence entries (block_00410000.c:5275)
    dataBase: 'DAT_0064ba28',       // wonder obsolescence tech table
    sourceAddr: '0x0041A422',
  },

  UNITS: {
    sectionName: 'UNITS',           // @ s_UNITS_00625300 (block_00410000.c:5308)
    parser: 'FUN_0041a5c4',
    maxRecords: 0x3E,               // 62 unit types (block_00410000.c:5309)
    recordStride: 0x14,             // 20 bytes per unit type in memory
    dataBase: 'DAT_0064b1b8',       // unit type data table
    nameLength: 0x0F,               // 15-char max name (block_00410000.c:5314)
    // Movement is stored as raw value * DAT_0064bcc8 (cosmic road multiplier)
    // Hit points stored as raw value * 10
    sourceAddr: '0x0041A5C4',
  },

  TERRAIN: {
    sectionName: 'TERRAIN',         // @ s_TERRAIN_00625310 (block_00410000.c:5394)
    parser: 'FUN_0041a95f',
    maxRecords: 0x21,               // 33 terrain types (block_00410000.c:5395)
    recordStride: 0x18,             // 24 bytes per terrain type in memory
    dataBase: 'DAT_00627cc4',       // terrain data table (name pointers)
    nameLength: 0x0F,               // 15-char max name (block_00410000.c:5397)
    baseTerrainCount: 0x0B,         // 11 base terrain types have special resource fields (block_00410000.c:5407)
    sourceAddr: '0x0041A95F',
  },

  GOVERNMENTS: {
    sectionName: 'GOVERNMENTS',     // @ s_GOVERNMENTS_00625318 (block_00410000.c:5454)
    parser: 'FUN_0041ab18',
    maxRecords: 7,                  // 7 government types (block_00410000.c:5455)
    recordStride: 4,                // 4 bytes per government name pointer
    dataBase: 'DAT_0064b9a0',       // government name pointers
    nameLength: 0x0F,               // 15-char max name
    // Also reads two title strings per government (male/female titles, 0xF chars each)
    titleBase: 'DAT_00654fe0',       // government title strings (stride 8)
    sourceAddr: '0x0041AB18',
  },

  LEADERS: {
    sectionName: 'LEADERS',         // @ s_LEADERS_00625324 (block_00410000.c:5464)
    // Sub-section of GOVERNMENTS parser
    maxRecords: 0x15,               // 21 civilizations (block_00410000.c:5465)
    recordStride: 0x30,             // 48 bytes per leader entry in memory
    dataBase: 'DAT_006554f8',       // leader personality data
    leaderNameLength: 0x18,         // 24-char max leader name (block_00410000.c:5469)
    // Fields per leader: male name, female name, civ color index, style,
    //   expansionism, militarism, tolerance, plus 7 government title overrides
    sourceAddr: '0x0041AB18',
  },

  CARAVAN: {
    sectionName: 'CARAVAN',         // @ s_CARAVAN_0062532c (block_00410000.c:5583)
    maxRecords: 0x10,               // 16 caravan commodities (block_00410000.c:5584)
    dataBase: 'DAT_0064b168',       // commodity name pointers (stride 4)
    nameLength: 10,                 // 10-char max name (block_00410000.c:5586)
    sourceAddr: '0x0041B00E',
  },

  ORDERS: {
    sectionName: 'ORDERS',          // @ s_ORDERS_00625334 (block_00410000.c:5589)
    maxRecords: 12,                 // records 1..12 (block_00410000.c:5590: local_8 < 0xd, starts at 1)
    dataBase: 'DAT_00655490',       // order data (stride 8: 4-byte value + 4-byte key char)
    sourceAddr: '0x0041B00E',
  },

  DIFFICULTY: {
    sectionName: 'DIFFICULTY',      // @ s_DIFFICULTY_0062533c (block_00410000.c:5597)
    maxRecords: 6,                  // 6 difficulty levels (block_00410000.c:5598)
    sourceAddr: '0x0041B00E',
  },

  ATTITUDES: {
    sectionName: 'ATTITUDES',       // @ s_ATTITUDES_00625348 (inferred from parse order)
    maxRecords: 9,                  // 9 attitude strings (inferred from Civ2 RULES.TXT)
    sourceAddr: '0x0041B00E',
  },

  sourceAddr: '0x0041B00E',
};


// ============================================================================
// === COSMIC PARAMETER VALIDATION RANGES ===
// Binary ref: FUN_00419d23 @ block_00410000.c:5063-5089 (parse_cosmic_section)
// ============================================================================

export const COSMIC_PARAMETER_RANGES = {
  // Each cosmic parameter is read via thunk_FUN_00419cbb(min, max) which clamps
  // the parsed value to [min, max]. These are the 22 COSMIC parameters.
  // Addresses: DAT_0064bcc8 through DAT_0064bcdd (22 consecutive bytes)
  parameters: [
    { index:  0, addr: 'DAT_0064bcc8', min:  1, max:  10, note: 'Road movement multiplier' },
    { index:  1, addr: 'DAT_0064bcc9', min:  1, max: 100, note: 'Trade bonus base (percent)' },
    { index:  2, addr: 'DAT_0064bcca', min:  0, max:  10, note: 'Food per citizen' },
    { index:  3, addr: 'DAT_0064bccb', min:  4, max:  20, note: 'Settler food cost (must be even)' },
    { index:  4, addr: 'DAT_0064bccc', min:  4, max:  20, note: 'Shields per production row' },
    { index:  5, addr: 'DAT_0064bccd', min:  0, max:  10, note: 'Pollution multiplier' },
    { index:  6, addr: 'DAT_0064bcce', min:  0, max:  10, note: 'Cosmic param 6' },
    { index:  7, addr: 'DAT_0064bccf', min:  4, max:  12, note: 'Cosmic param 7' },
    { index:  8, addr: 'DAT_0064bcd0', min: 10, max: 100, note: 'Cosmic param 8' },
    { index:  9, addr: 'DAT_0064bcd1', min:  4, max:  50, note: 'Cosmic param 9' },
    { index: 10, addr: 'DAT_0064bcd2', min:  4, max:  50, note: 'Cosmic param 10' },
    { index: 11, addr: 'DAT_0064bcd3', min:  3, max:  10, note: 'Cosmic param 11' },
    { index: 12, addr: 'DAT_0064bcd4', min:  5, max: 100, note: 'Cosmic param 12' },
    { index: 13, addr: 'DAT_0064bcd5', min:  0, max:   8, note: 'Cosmic param 13' },
    { index: 14, addr: 'DAT_0064bcd6', min:  0, max:   8, note: 'Cosmic param 14' },
    { index: 15, addr: 'DAT_0064bcd7', min:  0, max:   8, note: 'Cosmic param 15' },
    { index: 16, addr: 'DAT_0064bcd8', min:  1, max:  20, note: 'Cosmic param 16' },
    { index: 17, addr: 'DAT_0064bcd9', min:  0, max: 100, note: 'Cosmic param 17' },
    { index: 18, addr: 'DAT_0064bcda', min:  0, max: 100, note: 'Lost shields threshold on production change' },
    { index: 19, addr: 'DAT_0064bcdb', min:  4, max: 100, note: 'Cosmic param 19' },
    { index: 20, addr: 'DAT_0064bcdc', min: 25, max: 200, note: 'Cosmic param 20' },
    { index: 21, addr: 'DAT_0064bcdd', min:  0, max:  10, note: 'Cosmic param 21' },
  ],
  // Note: Param 3 (settler food cost) is forced even: if (val & 1) val++ (block_00410000.c:5068-5070)
  settlerFoodCostMustBeEven: true,

  sourceAddr: '0x00419D23',
};


// ============================================================================
// === TAX RATE DIALOG ===
// Binary ref: FUN_0040ddc6 @ block_00400000.c:3476 (tax_rate_dialog_init)
//             FUN_0040cd64 @ block_00400000.c:3196-3436 (tax_rate_dialog_create)
//             FUN_0040bd10 @ block_00400000.c:2718-2736 (get_max_rate_for_govt)
// ============================================================================

export const TAX_RATE_DIALOG = {
  // 3 sliders summing to 10 (tax + science + luxury = 10 units)
  sliderSum: 10,                   // @ block_00400000.c:3251 — total always 10
  sliderCount: 3,                  // @ block_00400000.c:3372 — for (0..2)
  controlIds: {
    tax:     0x65,                 // @ block_00400000.c:3315 — control ID for tax slider
    science: 0x66,                 // @ block_00400000.c:3330 — control ID for science slider
    luxury:  0x67,                 // @ block_00400000.c:3344 — control ID for luxury slider
  },

  // Government-based maximum rate per slider
  // FUN_0040bd10 @ 0x0040BD10 — returns max slider value based on government type
  // government is at civ_data + 0x594 * civId + DAT_0064c6b5 offset (byte)
  maxRateByGovernment: {
    //  govt < 2 (Anarchy=0, Despotism=1):      max = 6  (60%)
    //  govt == 2 (Monarchy):                    max = 7  (70%)
    //  govt < 6 (Communism=3, Fundamentalism=4, Republic=5): max = 8  (80%)
    //  govt >= 6 (Democracy=6):                 max = 10 (100%)
    0: 6,   // Anarchy
    1: 6,   // Despotism
    2: 7,   // Monarchy
    3: 8,   // Communism
    4: 8,   // Fundamentalism
    5: 8,   // Republic
    6: 10,  // Democracy
  },

  // Dialog base dimensions
  dialogSize: {
    width: 400,                    // @ block_00400000.c:3258 — base width
    height: 0x100,                 // @ block_00400000.c:3259 — base height (256)
  },

  // High-res scaling: if DAT_00633584 > 0, multiply all dimensions by 3/2
  highResScaling: {
    numerator: 3,                  // @ block_00400000.c:3266 — *(width) = width * 3 / 2
    denominator: 2,
    condition: 'DAT_00633584 > 0', // @ block_00400000.c:3265
    fontCode: {
      normal: 0x41,                // @ block_00400000.c:3264 — standard resolution
      highRes: 0x42,               // @ block_00400000.c:3271 — high resolution
    },
  },

  // Layout parameters
  tickMarks: 10,                   // @ block_00400000.c:3260 — 10 tick marks (0-10)
  sliderBarHeight: 6,              // @ block_00400000.c:3261 — slider track height

  // Network message IDs for tax rate changes
  networkMessages: {
    localChange: 0x9D,             // @ block_00400000.c:3501 — sent when local player changes rate
    remoteChange: 0x9E,            // @ block_00400000.c:3569 — sent for remote player's rate dialog
  },

  // Early-game AI tax hint: if turn < 0x0b and government < 2,
  // store current rates to DAT_0064bc1a / DAT_0064bc1c
  aiTaxHint: {
    turnThreshold: 0x0B,           // @ block_00400000.c:3413 — turn < 11
    govtThreshold: 2,              // @ block_00400000.c:3413 — govt < 2 (Anarchy or Despotism)
  },

  sourceAddr: '0x0040DDC6, 0x0040CD64, 0x0040BD10',
};
