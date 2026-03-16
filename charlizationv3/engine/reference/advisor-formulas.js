/**
 * Civ2 MGE Advisor & Demographics Formulas -- Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), blocks 00430000, 00450000, 00490000, 004E0000
 *
 * This module documents every game-relevant formula, constant, and behavioral
 * detail found in the advisor screens, demographics, intelligence reports,
 * and related systems. All addresses reference the Civ2 MGE executable.
 *
 * NOT executable code -- reference data only. Each constant includes its
 * binary address as a comment.
 */

// ============================================================================
// === DEMOGRAPHICS (11 metrics) ===
// Binary ref: FUN_00433434 render_demographics @ block_00430000.c (6486 bytes)
// Binary ref: FUN_004331d1 render_demog_row_with_rank @ block_00430000.c (611 bytes)
// ============================================================================

export const DEMOGRAPHICS = {
  // The demographics screen computes 11 metrics per civ, then ranks
  // the player against all alive civs. Each metric shows value + rank
  // + the leading civ's value (if intelligence is available).

  // Aggregate loop: FUN_004eb4ed (city_calc_production) called per city
  // Building checks: FUN_0043d20a (has_building)
  // Population calc: FUN_0043cce5 (civ_calc_total_population)

  approvalRating: {
    // @ FUN_00433434+0x200 approx
    formula: '(sum_of(city.size - foodSurplus - foodConsumed) * 50) / total_population',
    unit: '%',
    notes: 'Per-city: city.size minus food surplus and consumed. Summed, then * 50 / pop.',
    lowerIsBetter: false,
  },

  population: {
    // @ FUN_0043cce5 (civ_calc_total_population)
    formula: 'sum_of(city_population_points(city.size)) for all cities owned by civ',
    unit: 'people (formatted as XX,XXX,000)',
    populationPointsFormula: 'size * (size + 1) / 2',  // @ FUN_0043cc7e triangular number
    populationPointsMin: 1,        // @ FUN_0043cc7e: if total < 2, return 1
    populationPointsCap: 32000,    // @ FUN_0043cce5: clamp to 32000
    displayMultiplier: 1000,       // @ FUN_0043cda6: each point = 1000 people
    lowerIsBetter: false,
  },

  gnp: {
    // @ FUN_00433434+0x350 approx
    formula: 'sum_of(tradeRevenue * 2 + scienceOutput) per city',
    unit: 'M tons',
    lowerIsBetter: false,
  },

  mfgGoods: {
    // @ FUN_00433434+0x380 approx
    formula: 'sum_of(shieldProduction + corrupted + waste) per city',
    unit: 'M tons',
    lowerIsBetter: false,
  },

  landArea: {
    // @ FUN_00433434+0x100 approx
    formula: 'count of map tiles where tile_byte5 >> 4 == civId, then * 1000',
    unit: 'sq. mi.',
    notes: 'Iterates entire map. tile_byte5 upper nibble = owning civ.',
    lowerIsBetter: false,
  },

  literacyRate: {
    // @ FUN_00433434+0x500 approx
    formula: '(pop * 2 + literacyCities) * 2 / pop',
    techDoublings: [
      { techId: 0x01, name: 'Alphabet' },     // @ DAT_00627684
      { techId: 0x58, name: 'Feudalism' },
      { techId: 0x2b, name: 'Physics' },
      { techId: 0x55, name: 'Radio' },
    ],
    buildingBoosts: [
      { id: 3, name: 'Granary', notes: '+city.size to literacyCities' },  // or Pottery tech
      { id: 9, name: 'Library', notes: '+city.size to literacyCities' },
      { id: 23, name: 'University', notes: '+city.size to literacyCities' },
    ],
    clamp: [0, 100],   // @ FUN_00433434: clamped to 0..100%
    unit: '%',
    lowerIsBetter: false,
  },

  diseaseRate: {
    // @ FUN_00433434+0x600 approx
    formula: 'pop * 50 / (diseaseCities + pop)',
    techHalvings: [
      { techId: 0x32, name: 'Medicine' },      // halves disease rate
      { techId: 0x1b, name: 'Sanitation' },     // halves again
    ],
    buildingBoosts: [
      { id: 6, name: 'Aqueduct', notes: '+city.size to diseaseCities' },
      { id: 12, name: 'Sewer System', notes: '+city.size to diseaseCities' },
    ],
    unit: 'years',
    lowerIsBetter: true,  // negative param_sign in render_demog_row_with_rank
  },

  pollution: {
    // @ FUN_00433434+0x650 approx
    formula: 'sum_of(literacyPositive) per city',
    lifeExpectancyAdjustment: '-(pollution * 10 / population)',
    unit: 'tons',
    lowerIsBetter: true,
  },

  lifeExpectancy: {
    // @ FUN_00433434+0x700 approx
    formula: 'famine_years = 1800 / (diseaseRate + 20), clamped 20..99',
    notes: 'famine_years derived from disease rate, then adjusted by pollution.',
    clamp: [20, 99],
    unit: 'years',
    lowerIsBetter: false,
  },

  familySize: {
    // @ FUN_00433434+0x750 approx
    formula: 'foodSupply * 40 / pop + 20, displayed as X.Y',
    foodSupplyFormula: 'sum_of(foodSurplus + city.size * -2) per city',
    unit: '',
    notes: 'Displayed as a decimal (e.g., 4.2).',
    lowerIsBetter: false,
  },

  militaryService: {
    // @ FUN_00433434+0x800 approx
    formula: '(treasury * 10) / population, scaled by scienceRate',
    unit: 'years',
    lowerIsBetter: false,
  },

  // --- Ranking algorithm ---
  ranking: {
    // @ FUN_004331d1 render_demog_row_with_rank
    algorithm: 'rank = 1 + count_of(civs with better score than player)',
    notes: [
      'For lower-is-better metrics, values are negated before comparison.',
      'Shows leading civ name + value if player has embassy/spy/contact.',
    ],
    intelligenceRequirement: 'has_embassy OR has_tech(ESPIONAGE) OR has_tech(WRITING) OR globalRevealFlag',
  },
};

// ============================================================================
// === HISTORIANS REPORT ===
// Binary ref: FUN_00432611 show_historians_report @ block_00430000.c (1501 bytes)
// ============================================================================

export const HISTORIANS_REPORT = {
  // Picks random category from HISTORIANS section of game.txt,
  // then random adjective from HISTORIES section.
  categories: [
    { id: 0, name: 'Wealthiest', formula: 'sum_of(civ.treasury)' },
    { id: 1, name: 'Most Powerful', formula: 'sum_of(civ.militaryUnitCount)' },
    { id: 2, name: 'Most Advanced', formula: 'count_of(alive cities per civ)' },
    { id: 3, name: 'Happiest', formula: 'sum_of(city.size + city.happyCitizens - city.unhappyCitizens)' },
    { id: 4, name: 'Largest', formula: 'sum_of(city.size) per civ' },
  ],
  ranking: 'Descending sort by score. Ranks read from HISTORYRANK section of game.txt.',
  adjectiveCount: 5,  // random(0, 4) for adjective selection
  cityFieldOffsets: {
    size: 0x01,           // @ city+0x01
    happyCitizens: 0x4A,  // @ city+0x4A
    unhappyCitizens: 0x4B, // @ city+0x4B
  },
};

// ============================================================================
// === TOP 5 CITIES ===
// Binary ref: FUN_00432c1c render_top5_cities @ block_00430000.c (1281 bytes)
// ============================================================================

export const TOP_5_CITIES = {
  scoreFormula: 'city.size + city.happyCitizens - city.unhappyCitizens + 10 * wonderCount',
  wonderBonus: 10,  // @ FUN_00432c1c: score += 10 per wonder in city
  maxEntries: 5,
  sortOrder: 'descending (insertion sort into 5-slot array)',
  wonderCityIds: '@ DAT_00655be6',  // int16 per wonder, -1 = not built
  display: 'City sprite, happiness bars (happy/unhappy citizens), wonder icons, civ-colored border',
};

// ============================================================================
// === POWER GRAPH ===
// Binary ref: FUN_00431d22 render_power_graph @ block_00430000.c (2183 bytes)
// ============================================================================

export const POWER_GRAPH = {
  dataAddress: '@ DAT_00655c38',  // byte[turn * 8 + civ]
  dataStride: 8,   // 8 bytes per turn (1 per civ slot 0-7)
  dataType: 'byte',  // 0-255 power value per turn
  xAxis: {
    formula: 'turnNumber / 4 (or / 2 for scenario double-speed)',
    clamp: [0, 150],  // @ FUN_00431d22: turnScale = clamp(turnScale, 0, 150)
    gridStep: 50,     // 50 turns per grid line (25 for double-speed)
    yearLabels: 'every 100 turns (or 50 for double-speed)',
    scenarioDoubleSpeedFlag: '@ DAT_00655af0 bit 0x80',
  },
  yAxis: {
    formula: 'powerData[turn*8 + civ] * 360 / yMax',
    maxHeight: 360,   // pixels
    yMaxInit: 50,      // @ FUN_00431d22: initial yMax = 50
    yMaxFormula: 'max(50, max_of(all civ power values across all turns))',
  },
  civVisibility: 'Shows civs that are alive OR have ever been alive',
  legendVisibility: 'civ is contacted OR is self OR FOW disabled',
  scenarioFlagsAddress: '@ DAT_00655af0',
};

// ============================================================================
// === WONDERS OF THE WORLD SCREEN ===
// Binary ref: FUN_00431573 render_wonders_screen @ block_00430000.c (1763 bytes)
// ============================================================================

export const WONDERS_SCREEN = {
  totalWonders: 28,
  erasCount: 4,
  wondersPerEra: 7,  // wonderIdx / 7 = era
  wonderCityIdsAddress: '@ DAT_00655be6',  // int16 per wonder
  states: {
    notBuilt: -1,       // wonderCityIds[idx] == -1
    destroyed: 'negative (wonderCityIds[idx] < 0 but != -1)',
    active: 'positive city slot index',
  },
  display: {
    rowHeight: 40,       // pixels per entry
    eraHeaders: 'From WONDERS section of game.txt',
    wonderNameSource: 'advance index 0x27 + wonderIdx',
    pagination: 'scrollbar from 0 to totalEntries-1',
  },
};

// ============================================================================
// === FOREIGN ADVISOR ===
// Binary ref: FUN_004308ae show_foreign_advisor @ block_00430000.c (3218 bytes)
// ============================================================================

export const FOREIGN_ADVISOR = {
  treatyFlags: {
    embassy:  0x80,   // @ FUN_004308ae: treaty byte
    hatred:   0x20,   // displayed as "Enraged"
    war:      0x08,   // displayed as "War"
    alliance: 0x04,   // displayed as "Alliance"
    peace:    0x02,   // displayed as "Peace"
  },

  visibilityRequirement: 'has_tech(WRITING) OR has_tech(ESPIONAGE) OR globalRevealFlag OR treaty_exists',

  attitudeLevels: [0, 5, 17, 31, 50, 68, 82, 95, 100],
  // @ FUN_004308ae: attitude slider uses 9 levels mapped to these values

  displayFields: {
    leaderName: true,
    nationName: true,
    civAdjective: true,
    governmentName: 'shown if embassy or spy exists',
    treasury: 'shown if embassy or spy exists (gold amount)',
    relationship: 'attitude string from attitude byte',
  },

  actions: {
    inspectCities: {
      id: 1,
      requirement: 'embassy OR spy OR globalReveal',
      noIntelMessage: 'NOINTEL',
    },
    negotiate: {
      id: 2,
      multiplayerProtocol: {
        requestMessage: 0x401,
        waitDialog: 'PARLEYWAITING',
        timeout: 'turnTimerSeconds * 60',
      },
    },
    setAttitude: {
      id: 3,
      levels: 9,
      networkMessage: 'ATTITUDE_CHANGE',
    },
  },

  noForeignCivsMessage: 'NOFOREIGN',
};

// ============================================================================
// === ATTITUDE ADVISOR ===
// Binary ref: FUN_00434e39 render_attitude_advisor @ block_00430000.c (3769 bytes)
// ============================================================================

export const ATTITUDE_ADVISOR = {
  scenarioDisableFlag: '@ DAT_00655af0 bit 0x20',  // no attitude display

  standardMode: {
    // Citizen happiness breakdown
    citizenClassification: {
      0: 'happy male',
      1: 'happy female',
      2: 'content male',
      3: 'content female',
      4: 'unhappy male',
      5: 'unhappy female',
      6: 'specialist male (elvis)',
      7: 'specialist female',
    },
    maxIconRows: 7,       // stops drawing after 7 rows or y > 240px
    iconRowStagger: true,  // alternating rows offset by halfIcon

    wonderDisplay: 'Lists all wonders owned by playerCiv',
    summaryStats: {
      contentCitizens: '@ DAT_00673f78',
      weLoveKingCount: '@ DAT_00673f58',
      revoltCount: '@ DAT_00673f84',
      pollutionCount: '@ DAT_00673f6c',
      globalWarmingCooling: '@ DAT_00673f74',  // positive=warming, negative=cooling
      spaceshipProgress: 'shown if turnNumber > 199 AND DAT_00673f8c != 0',
    },
  },

  scenarioMode: {
    // Shows approval values + spaceship + victory conditions
    spaceshipComponents: 4,  // 4 component types with counts @ DAT_0064bcbc[0..3]
    victoryCondition: 'scenario victory requirement text',
  },
};

// ============================================================================
// === INTELLIGENCE REPORT ===
// Binary ref: FUN_0043039d show_intel_city_list @ block_00430000.c (586 bytes)
// Binary ref: FUN_004308ae show_foreign_advisor @ block_00430000.c
// Binary ref: FUN_00494e2a intel_init_science @ block_00490000.c (3512 bytes)
// ============================================================================

export const INTELLIGENCE_REPORT = {
  cityList: {
    // @ FUN_0043039d show_intel_city_list
    dialogTemplate: 'INTELLCITY',
    columns: 3,            // 3-column layout for city list
    perCityDisplay: {
      name: true,
      wallsIcon: 0x99,     // @ FUN_0043039d: has_building(slot, CITY_WALLS=1)
      tradeInfo: {
        threshold: -0x26,  // city.supply_demand_byte > -0x26 shows trade
        commodityIconId: 0xF4,
      },
      citySprite: true,
    },
  },

  sciencePanel: {
    // @ FUN_00494e2a intel_init_science
    topTechsShown: 6,      // shows 6 most "advanced" (deepest in tree) techs
    techDepthAlgorithm: {
      // @ FUN_00494dae count_tech_depth
      formula: 'recursive prerequisite count (including duplicates across branches)',
      maxRecursionDepth: 101,
      cachingAddress: '@ DAT_00673b30 (100 entries)',
    },
    espionageVisibility: 'treaty[civ][target] & 0x80 OR has_wonder(SETI=0x18) OR has_wonder(GREAT_LIBRARY=9)',
    renderPosition: { x: 0x213, y: 0x89, rowSpacing: 0x1F },
  },

  militaryPanel: {
    // @ FUN_00494b5f intel_init_military
    eraSource: '@ DAT_00655c22[civId]',  // civ era from tech count
    iconPosition: { x: 0x2D, y: 0x82, spacing: 0x1F },
  },

  advisorObject: {
    // @ FUN_00493f0f intel_open_advisor
    objectSize: 0x108C,      // bytes allocated for advisor object
    musicTrackFormula: '((turn_number + civ_id) & 7) + 0x53',
    musicBaseFromStyle: '@ DAT_0061d1e8[absStyle] * 4 + 0x70',
  },
};

// ============================================================================
// === MILITARY ADVISOR / COMBAT LOG ===
// Binary ref: FUN_00437cea render_combat_log @ block_00430000.c (2172 bytes)
// ============================================================================

export const MILITARY_ADVISOR = {
  combatLog: {
    ringBufferAddress: '@ DAT_006af2a0',
    perCivStride: 0x27D8,  // 10200 bytes per civ
    entryStride: 0x22,     // 34 bytes per entry
    maxEntries: 300,       // entries per civ ring buffer
    writePtrAddress: '@ DAT_006af280[civ]',
    readPtrAddress: '@ DAT_006af260[civ]',

    entryFields: {
      unitTypeId:  { offset: 0x00, type: 'int16' },
      mapX:        { offset: 0x02, type: 'int16' },
      mapY:        { offset: 0x04, type: 'int16' },
      year:        { offset: 0x06, type: 'int16' },
      resultFlags: { offset: 0x08, type: 'int16' },
      description: { offset: 0x0A, type: 'char[26]' },
    },

    display: {
      rowHeight: 24,
      ordering: 'most recent first',
      unitNameMaxWidth: 96,    // truncated to fit
      yearTextMaxWidth: 76,
      nearestCityLookup: 'FUN_0043d07a (find_nearest_city)',
      clickAction: 'center map on battle location',
    },
  },
};

// ============================================================================
// === SCORE / RETIREMENT ===
// Binary ref: FUN_00435dc4 render_retirement_score @ block_00430000.c (1032 bytes)
// ============================================================================

export const SCORE = {
  retirement: {
    // @ FUN_00435dc4
    difficultyMultiplier: {
      // scoreMult = difficulty + 4, with bonuses
      formula: 'difficulty + 4 + (difficulty > 2 ? 1 : 0) + (difficulty > 3 ? 1 : 0) + (difficulty > 4 ? 2 : 0)',
      table: {
        0: 4,   // Chieftain
        1: 5,   // Warlord
        2: 6,   // Prince
        3: 8,   // King (6+1+1)
        4: 10,  // Emperor (8+1+1+2... wait: 4+4=8, >2 +1=9, >3 +1=10, >4 no)
        // Actual: d=0→4, d=1→5, d=2→6, d=3→8, d=4→10, d=5→12
      },
    },
    rawScoreFormula: '(scoreMult * max(DAT_00673f88, DAT_00673f7c)) / 100',
    rankFormula: {
      // @ FUN_00435dc4: for level 1..24: if (level^2)/3 <= rawScore: rank = level-1
      formula: 'largest rank where (rank+1)^2 / 3 <= rawScore',
      maxRank: 23,
    },
    rankTitles: {
      section: 'MALEFAME or FEMALEFAME in game.txt',
      genderSource: '@ DAT_006554fc (leader portrait data)',
    },
  },

  hallOfFame: {
    // @ FUN_004362e2 render_hall_of_fame_list (2224 bytes)
    maxRecords: 6,
    recordSize: 0x48,  // 72 bytes
    recordsAddress: '@ DAT_0063f0c8',
    recordFields: {
      score:         { offset: 0x00, type: 'int16' },
      civId:         { offset: 0x02, type: 'int16' },
      year:          { offset: 0x06, type: 'int16' },
      bcFlag:        { offset: 0x08, type: 'int16' },
      yearPerTurn:   { offset: 0x0A, type: 'int16' },
      monthOffset:   { offset: 0x0C, type: 'int16' },
      rankLevel:     { offset: 0x0E, type: 'int16' },
      gender:        { offset: 0x10, type: 'int16' },
      population:    { offset: 0x12, type: 'int16' },
      leaderName:    { offset: 0x18, type: 'char[24]' },
      civName:       { offset: 0x30, type: 'char[24]' },
    },
    difficultyFlags: {
      levelMask: 0x0F,
      scenarioFlag: 0x80,
      alphaCentauri: 'difficulty & 0x80 in display',
    },
    fileFormat: {
      filename: 'HALLFAME.DAT',
      mode: 'rb/wb',
      atomicLoad: true,  // partial read -> discard all
    },
    sortOrder: 'descending by score (insertion at correct position)',
  },
};

// ============================================================================
// === DIPLOMACY EVALUATION ===
// Binary ref: FUN_0045705e ai_evaluate_diplomacy @ block_00450000.c (6616 bytes)
// Binary ref: FUN_00456f20 adjust_attitude @ block_00450000.c (107 bytes)
// Binary ref: FUN_00456f8b calc_patience_threshold @ block_00450000.c (211 bytes)
// ============================================================================

export const DIPLOMACY = {
  attitudeAdjustment: {
    // @ FUN_00456f20 adjust_attitude
    formula: 'currentAttitude = get_attitude(civA, civB); set_attitude(civA, civB, currentAttitude + delta)',
    liveTracker: '@ DAT_0064b114 (updated if negotiation pair matches)',
    negotiatingCivAddresses: {
      civA: '@ DAT_0064b120',
      civB: '@ DAT_0064b110',
    },
  },

  patienceThreshold: {
    // @ FUN_00456f8b calc_patience_threshold
    baseValue: 2,
    modifiers: [
      { condition: 'liveAttitudeScore < 25', effect: '+1 (threshold = 3)' },
      { condition: 'liveAttitudeScore > 60', effect: '-1' },
      { condition: 'civ_has_active_wonder(civA, STATUE_OF_LIBERTY=0x14)', effect: '+1' },
      { condition: 'treaty[civA][civB] & 0x04 (embassy)', effect: '+1' },
      { condition: 'treaty[civA][civB] & 0x08 (alliance)', effect: '+2' },
      { condition: 'treaty[civA][civB].byte1 & 0x20 (hatred)', effect: 'override to 2' },
    ],
  },

  evaluationOutputVariables: {
    // @ FUN_0045705e sets these global DAT_ variables
    tributeAmount:   '@ DAT_0064b0ec',
    techDemand:      '@ DAT_0064b118',
    wantsMore:       '@ DAT_0064b0f8',
    wantsNothing:    '@ DAT_0064b148',
    wantsToInitiate: '@ DAT_0064b0e8',
    shouldDeclareWar: '@ DAT_0064b11c',
    shouldDeclareWarScore: '@ DAT_0064b140',
    wantsDeclareWar: '@ DAT_0064b13c',
    borderViolations: '@ DAT_0064b0f4',
    wantsMap:        '@ DAT_0064b128',
    thirdPartyCivForCancel:     '@ DAT_0064b100',
    thirdPartyCivForTechDemand: '@ DAT_0064b0fc',
    thirdPartyCivForWar:        '@ DAT_0064b104',
  },

  tributeFormula: {
    // @ FUN_0045705e ~line 476
    final: 'tribute = ((difficulty + 1) * techDemand + 16) / 32 * 50',
    clampToTreasury: 'if tribute > treasury && tribute < treasury*2 && treasury > 49: tribute = (treasury/50) * 50',
    resetCondition: 'if consecutiveDemands > 9: reset to 0',
  },

  attitudeThresholds: {
    // @ FUN_0045705e attitude score adjustments
    friendly:    { range: '< 26', techDemandEffect: '/= 2', wantsMoreEffect: 'forced 0' },
    neutral:     { range: '26-49', techDemandEffect: '*= 2/3' },
    hostile:     { range: '> 74', techDemandEffect: '*= 3/2', wantsMoreEffect: 'forced 1' },
    allianceAdj: -25,    // if has alliance
    vendettaAdj: +25,    // if has vendetta (0x20)
    personalityAdj: '(patience - 1 - treatyViolations) * 5',
  },

  wonderEffects: {
    greatWall: {
      wonderId: 6,
      effect: 'shouldDeclareWar = 0, wantsMore = 0, attitudeScore -= 10',
    },
    unitedNations: {
      wonderId: 24,
      effect: 'Same as Great Wall',
    },
    greatLibrary: {
      wonderId: 9,
      effect: 'techDemand += techDemand / 4 (25% bonus)',
    },
    statueOfLiberty: {
      wonderId: 0x14,
      effect: '+1 patience threshold',
    },
  },
};

// ============================================================================
// === SCIENCE ADVISOR (research display) ===
// Binary ref: FUN_00494e2a intel_init_science @ block_00490000.c (3512 bytes)
// Binary ref: FUN_00494dae count_tech_depth @ block_00490000.c
// ============================================================================

export const SCIENCE_ADVISOR = {
  techDepth: {
    // @ FUN_00494dae count_tech_depth
    algorithm: 'Recursive prerequisite traversal. Counts ALL prerequisites including duplicates.',
    maxDepth: 101,           // recursion guard
    cacheAddress: '@ DAT_00673b30 (100 entries, one per tech)',
    globalCounterAddress: '@ DAT_0062ca5c',
    formula: 'For each prereq of techId: counter++; recurse(prereq)',
  },

  turnsToCompleteDisplay: {
    // @ FUN_00509AC0 citywin_format_turns_to_complete (block_00500000)
    formula: 'turns = clamp((total_cost - 1 - accumulated) / net_shields + 1, 1, 999)',
    totalCostFormula: 'cost_mult * shields_per_row_scaling',
    netShieldsFormula: 'clamp(DAT_006a65cc - DAT_006a6568, 1, 999)',
    singularLabel: 'string 0x2d ("turn")',
    pluralLabel: 'string 0x2c ("turns")',
  },
};

// ============================================================================
// === TRADE COMMODITY SUPPLY/DEMAND ===
// Binary ref: FUN_0043d400 calc_city_trade_desirability @ block_00430000.c (8227 bytes)
// ============================================================================

export const TRADE_DESIRABILITY = {
  // This is the massive 8KB function that computes supply/demand for 16 commodities
  // per city, based on terrain, tech, buildings, map position, and continent.

  recalcTrigger: {
    // @ FUN_0043d400 top
    conditions: [
      'city.attribs3 & 0x02',
      'globalRevealFlag != 0',
      '(turnNumber + citySlot) & 0x0F == 0',
    ],
    staleness: 'Values can be stale by up to 15 turns',
  },

  supplyArrayAddress: '@ DAT_0063f668[0..15]',
  demandArrayAddress: '@ DAT_0063f540[0..15]',

  sizeTierFormula: '(city.size + 2) / 5',  // 0,0,1,1,1,1,2,2,2,2,3,...

  commodities: [
    { id: 0,  name: 'Hides' },
    { id: 1,  name: 'Wool' },
    { id: 2,  name: 'Beads' },
    { id: 3,  name: 'Cloth' },
    { id: 4,  name: 'Salt' },
    { id: 5,  name: 'Coal' },
    { id: 6,  name: 'Copper/Wine' },
    { id: 7,  name: 'Dye/Spice' },
    { id: 8,  name: 'Wine/Gems' },
    { id: 9,  name: 'Silk/Gold' },
    { id: 10, name: 'Silver/Ivory' },
    { id: 11, name: 'Spice/Silk' },
    { id: 12, name: 'Gems/Dye' },
    { id: 13, name: 'Gold/Oil' },
    { id: 14, name: 'Oil/Uranium' },
    { id: 15, name: 'Uranium-II' },
  ],

  terrainCounting: {
    // 11 terrain types counted in city radius (21 tiles)
    riverBonus: 3,  // terrainCount[type] += 3 for river tiles
    jungleMerge: 'terrainCount[6] += terrainCount[7]; terrainCount[7] = 0',
  },

  supplyFormulas: {
    // Just the key examples - full formulas in block_00430000.md pseudocode
    hides: 'terrainCount[9]*3 + terrainCount[6]*6 + terrainCount[3]*4 + riverCount*3, doubled if scienceRate < 16/24, halved if city.size > 7',
    coal: '(terrainCount[9]+[1]+[3]+[8]+1) * terrainCount[4] * 5, modified by sizeTier and continent',
    gold: '(terrainCount[3]*2 + terrainCount[9] + 1) * (terrainCount[4] + 1) + distX*2, doubled by specific continent',
    uranium: 'terrainCount[6]*8 + [0]*10 + [8]*6 + [7]*12, divided by 8 if no nuclear flag',
  },

  demandFormulas: {
    salt: 'Decaying weight loop: weight=8, portion=clamp(remainingSize,0,5), demand += portion*weight, weight/=2',
    coal: '(distY+10)*sizeTier+scienceRate, boosted by Factory(19), reduced by MfgPlant/PowerPlant/HydroPlant',
  },

  knownBugs: {
    uninitializedRoadCount: 'Local variable roadCount may be uninitialized (stack garbage). Used in Demand[6] (Wine/Copper).',
    silkModifiesGold: 'Supply[11] calculation at leader==10 modifies supply[9] (Gold) instead of supply[11].',
  },

  cityTradeRoutes: {
    supplySlots: 3,   // city+0x33..0x35
    demandSlots: 3,   // city+0x36..0x38
    activeTradeSign: 'negative commodity value = actively traded',
    commodityNames: '@ DAT_0064b168[commodityId]',
  },
};

// ============================================================================
// === WONDER QUERY FUNCTIONS ===
// Binary ref: FUN_00453da0 is_wonder_obsolete @ block_00450000.c (120 bytes)
// Binary ref: FUN_00453e18 get_wonder_city @ block_00450000.c (57 bytes)
// Binary ref: FUN_00453e51 civ_has_active_wonder @ block_00450000.c (142 bytes)
// Binary ref: FUN_00453edf get_wonder_owner @ block_00450000.c (73 bytes)
// ============================================================================

export const WONDER_QUERIES = {
  isWonderObsolete: {
    // @ FUN_00453da0
    formula: 'Check if any civ (1..7) has researched WONDER_OBSOLETE_TECH[wonderId]',
    obsoleteTechTable: '@ DAT_0064ba28[wonderId] (signed byte, < 0 means no obsolescence)',
  },

  getWonderCity: {
    // @ FUN_00453e18
    formula: 'if wonder obsolete: return -1, else return WONDER_CITY_IDS[wonderId]',
    wonderCityIdsAddress: '@ DAT_00655be6[wonderId * 2] (int16)',
  },

  civHasActiveWonder: {
    // @ FUN_00453e51
    formula: 'get_wonder_city(wonderId) >= 0 AND city.owner == civId',
    statueOfLibertyOverride: {
      wonderId: 0x14,
      condition: 'scenarioFlags & 0x80 AND scenarioBits & 1 => always false',
    },
  },

  getWonderOwner: {
    // @ FUN_00453edf
    formula: 'get_wonder_city(wonderId) => city.owner, or -1 if obsolete/unbuilt',
  },
};

// ============================================================================
// === AI GOAL MANAGEMENT ===
// Binary ref: FUN_00492b60..FUN_0049376f @ block_00490000.c
// ============================================================================

export const AI_GOAL_MANAGEMENT = {
  // Two priority-sorted goal lists per civ, within civ struct (stride 0x594)
  listA: {
    offset: '@ civ + 0x414 (DAT_0064cab4)',
    maxEntries: 48,
    entrySize: 6,  // bytes
    entryFormat: { x: 'int16', y: 'int16', type: 'int8', priority: 'int8' },
    shiftAlgorithm: 'recursive (FUN_00492d18)',
    insertionSort: 'find first slot with priority < new OR type == 0xFF, shift down, insert',
    unitRedirection: 'On insert for human civ, type 2/3 goals: redirect nearby idle units (goto order 0x0B)',
  },
  listB: {
    offset: '@ civ + 0x534 (DAT_0064cbd4)',
    maxEntries: 16,
    entrySize: 6,
    entryFormat: { x: 'int16', y: 'int16', type: 'int8', priority: 'int8' },
    shiftAlgorithm: 'iterative (FUN_00492dd0)',
  },
  decayCycle: {
    // @ FUN_00493602 ai_decay_and_merge_goals (called once per turn)
    step1: 'Negate priorities of all List A entries (active -> marked for removal)',
    step2: 'Remove entries with priority < 0 (were already marked last turn)',
    step3: 'Merge List B entries into List A via ai_add_goal_a',
    result: 'Goals not refreshed within 2 turns are automatically removed',
  },
  clearListB: {
    // @ FUN_0049376f ai_clear_goals_b
    action: 'Set all 16 List B entries to type=0xFF, priority=0',
  },
  emptySlotMarker: 0xFF,
};

// ============================================================================
// === CIV NAME/TITLE LOOKUP ===
// Binary ref: FUN_00493b10..FUN_00493d13 @ block_00490000.c
// ============================================================================

export const CIV_NAME_LOOKUP = {
  // Four related functions for resolving civ names from the style/leader tables

  nounName: {
    // @ FUN_00493b10 get_civ_noun_name
    lookup: 'civ[id].styleIndex -> leader_name_table[style * 0x30 + 0x502]',
    fallback: 'custom_names[civ_id * 0xF2]',
    barbarianLabel: 'labels_txt[DAT_00628420 + 0x44]',
  },

  leaderTitle: {
    // @ FUN_00493ba6 get_civ_leader_title
    lookup: 'style * 0x30 + 0x50C + portraitIdx * 2 + govtType * 4',
    governmentDependent: true,  // title changes with government type (0-6)
    fallback: 'custom_leader_titles[civ_id * 0xF2 + govtType * 0x18]',
  },

  peopleName: {
    // @ FUN_00493c7d get_civ_people_name
    lookup: 'leader_name_table[style * 0x30 + 0x504]',
    fallback: 'custom_names[civ_id * 0xF2 + 0x18]',
    barbarianLabel: 'labels_txt[DAT_00628420 + 0x3C]',
  },

  adjectiveName: {
    // @ FUN_00493d13 get_civ_adjective_name
    lookup: 'leader_name_table[style * 0x30 + 0x506]',
    fallback: 'custom_names[civ_id * 0xF2 + 0x30]',
    barbarianLabel: 'labels_txt[DAT_00628420 + 0x40]',
  },

  dataAddresses: {
    civStyleIndex: '@ DAT_0064c6a6 (civ struct + 0x6A6)',
    leaderNameTable: '@ DAT_00655502',
    customCivNames: '@ DAT_0064bcfa (stride 0xF2)',
    labelsBase: '@ DAT_00628420',
  },
};
