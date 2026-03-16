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
    // Raw numeric thresholds from binary:
    //   0x1A (26), 0x33 (51), 0x4B (75), 0x4C (76), 0x62 (98)
    friendly:    { range: '< 26 (0x1A)', techDemandEffect: '/= 2', wantsMoreEffect: 'forced 0' },
    neutral:     { range: '26-50', techDemandEffect: '*= 2/3' },
    hostile:     { range: '> 74 (0x4B)', techDemandEffect: '*= 3/2', wantsMoreEffect: 'forced 1' },
    allianceAdj: -25,    // if has alliance
    vendettaAdj: +25,    // if has vendetta (0x20)
    personalityAdj: '(patience - 1 - treatyViolations) * 5',
    // Clamps applied at end of evaluation:
    clamps: {
      minNoTribute: { condition: 'tributeAmount == 0 && score < 2', clampTo: 1 },
      maxNoVendetta: { condition: '!vendetta && score > 98', clampTo: 99 },
      maxAllianceOrOpen: { condition: '(alliance || wantsNothing==0) && score > 73', clampTo: 74 },
      minVendetta: { condition: 'vendetta && score < 27', clampTo: 26 },
    },
    nukeAwareness: {
      flag: 0x100,             // @ FUN_0045705e: treaty flag for nuke awareness
      effect: 'Set when AI detects other civ has nuclear capability',
    },
  },

  wonderEffects: {
    greatWall: {
      wonderId: 6,
      effect: 'shouldDeclareWar = 0, wantsMore = 0, attitudeScore -= 10',
    },
    unitedNations: {
      wonderId: 24,  // 0x18
      effect: 'Same as Great Wall',
    },
    greatLibrary: {
      wonderId: 9,
      effect: 'techDemand += techDemand / 4 (25% bonus)',
    },
    statueOfLiberty: {
      wonderId: 0x14,  // 20
      effect: '+1 patience threshold',
    },
  },

  // --- AI treaty response decision tree ---
  // @ FUN_0045b4da ai_respond_to_treaty (10271 bytes)
  aiTreatyResponse: {
    // Case 1: Alliance proposal
    allianceAcceptance: {
      willingnessFactors: [
        'thirdPartyCiv existence (+/- depending)',
        'difficulty < 2: willingness--',
        'both weak: willingness--',
        'civA weaker per difficulty tier: willingness++',
        'shouldDeclareWar: willingness++',
        'tributeAmount > 0: willingness--',
        'civB is weaker: willingness--',
      ],
      subNegotiations: {
        techDemand: 'PERHAPSSECRET',     // AI wants a tech
        goldDemand: 'PERHAPSTHROWIN',    // AI wants gold sweetener
        warDemand: 'PERHAPSSOLIDARITY',  // AI wants joint war vs third party
      },
      refusalStrings: [
        'ALLIANCENOSMALL',      // too small
        'ALLIANCENOPATIENCE',   // low patience
        'ALLIANCENODISLIKE',    // hostile attitude
        'ALLIANCENOWINNING',    // AI is winning
        'ALLIANCENOBETRAY',     // bad reputation
        'NOBETRAYWEAK',         // weak + desperate
      ],
    },
    // Case 2: Peace proposal
    peaceAcceptance: {
      condition: 'shouldDeclareWar == 0 AND attitudeScore < 51 AND reputation <= threshold',
      refusalStrings: ['PEACENOWINNING', 'PEACENODISLIKE', 'PEACENOPATIENCE', 'PEACENOBETRAY'],
    },
    // Cases 3-5: Ceasefire/tribute/surrender
    ceasefireAcceptance: {
      attitudeBonus: '5-10 depending on relative power',
      surrenderBonus: 10,            // adjust_attitude(civB, civA, 10)
      warWearinessBonus: 2,          // adjust_attitude(civB, civA, 2)
    },
    // Case 6: Cancel alliance
    cancelAlliance: {
      attitudeAdjust: 50,            // massive hostility: adjust_attitude(civB, civA, 50)
      patienceIncrement: 1,
    },
    // Gold sweetener formula
    goldSweetenerFormula: {
      useFunction: 'calc_gold_to_attitude',
      minMeaningfulGold: 50,
      firstBracketDivisor: 10,
      subsequentDivisorIncrement: 5,
    },
    sourceAddr: '0x0045B4DA',
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

// ============================================================================
// === CIV_HAS_TECH (tech ownership bitmask lookup) ===
// Binary ref: FUN_004bd9f0 @ block_004B0000.c (181 bytes)
// ============================================================================

export const CIV_HAS_TECH = {
  // Returns 1 if civ owns the tech, 0 otherwise. Bitmask-based lookup.
  specialCases: {
    paramNeg2:    { value: -2,   result: 0, notes: 'Always false (future tech placeholder)' },
    paramNegOther: { condition: 'param < 0', result: 1, notes: 'All negative except -2 → always true' },
    paramFutureTech: { value: 0x59, result: 0, notes: 'Future Tech (89) → always false' },
    paramOver100: { condition: 'param >= 100', result: 0, notes: 'Out of range → false' },
    paramCiv0:    { condition: 'civId < 1', result: 0, notes: 'Barbarians (civ 0) never have tech' },
  },
  bitmaskLookup: {
    // FUN_005ae3bf splits techId into byte index + bit mask
    formula: '(tech_bitmask_byte & civ_tech_array[civ * 0x594 + byteIndex]) != 0',
    techArrayOffset: '@ DAT_0064c6f8 (civ struct + 0x6F8, 13 bytes for 100 techs)',
  },
};

// ============================================================================
// === TECH PREREQUISITE CHECK (recursive) ===
// Binary ref: FUN_004bdaa5 @ block_004B0000.c (135 bytes)
// ============================================================================

export const TECH_PREREQUISITE_CHECK = {
  // Recursive: returns 1 if targetTech is a prerequisite of sourceTech
  algorithm: 'if sourceTech < 0: return 0; if sourceTech == targetTech: return 1; else recurse on both prereqs',
  techRecordStride: 0x10,  // tech table entry stride
  prereq1Offset: '@ DAT_0062768e[techId * 0x10] (signed byte)',
  prereq2Offset: '@ DAT_0062768f[techId * 0x10] (signed byte)',
  notes: 'No max recursion guard — relies on DAG structure of tech tree',
};

// ============================================================================
// === AI MILITARY ADVISOR ASSESSMENT ===
// Binary ref: FUN_004bc480 @ block_004B0000.c (1066 bytes)
// ============================================================================

export const AI_MILITARY_ADVISOR = {
  // Returns assessment value 1-7 based on military readiness
  // param_1 = civId

  cityLoop: {
    cityRecordStride: 0x58,
    cityOwnerOffset: '@ DAT_0064f348[slot * 0x58] (civ that owns city)',
    cityExistsOffset: '@ DAT_0064f394[slot * 0x58] (nonzero = city exists)',
    maxCities: '@ DAT_00655b18',
    barracksBuilding: { id: 2, check: 'FUN_0043d20a(citySlot, 2)' },
    cityWallsBuilding: { id: 1, check: 'FUN_0043d20a(citySlot, 1)' },
  },

  unitLoop: {
    unitRecordStride: 0x20,
    unitOwnerOffset: '@ DAT_006560f7[slot * 0x20]',
    unitExistsOffset: '@ DAT_0065610a[slot * 0x20]',
    maxUnits: '@ DAT_00655b16',
  },

  unitToPopRatio: {
    // (cityCount - 1 + unitCount) / cityCount < threshold
    formula: '(cities - 1 + units) / max(cities, 1)',
    threshold: '(era < 5 ? 2 : 2) + 1 if era < 5',  // 2 + (era < 5 ? 1 : 0) = 3 early, 2 late
    eraOffset: '@ DAT_0064c6b5[civ * 0x594]',
    earlyEraThreshold: 5,  // era < 5 adds 1 to threshold
    result1: { value: 1, condition: 'Too few units relative to cities' },
  },

  techComparison: {
    // Counts advanced-era techs per civ, compares to others
    militaryTechIds: [
      { id: 0x4B, name: 'Rocketry', weight: 1 },
      { id: 0x3B, name: 'Nuclear Fission', weight: 1 },
    ],
    unitTypeTableStride: 0x14,
    maxUnitTypes: 0x3E,  // 62 unit types
    unitPrereqTechOffset: '@ DAT_0064b1cb[type * 0x14]',
    unitDomainOffset: '@ DAT_0064b1c1[type * 0x14]',   // domain: 0=land, 1=sea, 2=air
    unitRoleOffset: '@ DAT_0064b1ca[type * 0x14]',
    // domain == 2 (air): count in aiStack_68 (offensive tech)
    // role == 0 or 1 (land/sea defense): count in aiStack_24 (defensive tech)
    offensiveBehindThreshold: {
      formula: '(aliveCivs - 1) / 2',
      aliveCivsFunction: 'FUN_005ae006(DAT_00655b0a)',
      result2: { value: 2, condition: 'Behind more than half of civs in defensive tech' },
      result3: { value: 3, condition: 'Behind more than half of civs in offensive tech' },
    },
  },

  fortificationCheck: {
    gunpowderTech: { id: 0x2F, name: 'Gunpowder' },
    coastalDefenseBuilding: { id: 8, name: 'Coastal Fortress' },
    greatWallWonder: { id: 6, name: 'Great Wall' },
    // Returns 5 if: has Gunpowder, has a city with walls, that city lacks Coastal Fortress,
    // and civ does NOT have Great Wall wonder
    result5: { value: 5, condition: 'Has Gunpowder + walled city without coastal defense and no Great Wall' },
  },

  remainingAssessments: {
    result4: { value: 4, condition: 'No cities with barracks' },
    result6: { value: 6, condition: 'Has barracks, has enemies or is not advanced era' },
    result7: { value: 7, condition: 'Has barracks, no hatred flags (0x20), era > 4' },
  },

  hatredFlag: 0x20,  // @ DAT_0064c6c1[civ * 0x594 + otherCiv * 4] & 0x20
  eraLookup: '@ DAT_00655c22[civId]',  // byte, civ era from tech progress
  eraAdvancedThreshold: 4,  // era > 4 for "at peace" assessment
};

// ============================================================================
// === AI SCIENCE/BUILD ADVISOR ASSESSMENT ===
// Binary ref: FUN_004bc8aa @ block_004B0000.c (753 bytes)
// ============================================================================

export const AI_SCIENCE_ADVISOR = {
  // Returns assessment value 1-7 based on science and building readiness
  // param_1 = civId, param_2 = era category (0=ancient, 1=middle, 2=modern)

  techRanking: {
    // Compares civ's tech level (DAT_0064c6b0) against all other civs
    techLevelOffset: '@ DAT_0064c6b0[civ * 0x594]',
    result7: { value: 7, condition: 'No other civ has equal or more techs (most advanced)' },
  },

  governmentCheck: {
    // Early era (< 5): if government != 4 (Fundamentalism) and govtType < 6, return 2
    // Late era (>= 5): if govtType < 4, return 2
    governmentOffset: '@ DAT_0064c6b5[civ * 0x594]',
    earlyEra: {
      eraThreshold: 5,
      excludeGovernment: 4,  // Fundamentalism excluded from check
      minGovernment: 6,      // need government type >= 6 to pass
    },
    lateEra: {
      minGovernment: 4,      // need government type >= 4 to pass
    },
    scienceRateOffset: '@ DAT_0064c6b3[civ * 0x594]',
    result2: { value: 2, condition: 'Government type too low for era' },
  },

  buildingTargets: {
    // Target building varies by era category
    byEra: [
      { era: 0, buildingId: 6,    name: 'Marketplace' },
      { era: 1, buildingId: 0x0C, name: 'Factory (12)' },
      { era: 2, buildingId: 0x1A, name: 'Research Lab (26)' },
    ],
    prerequisiteTechLookup: '@ DAT_0064c48e[buildingId * 8] (tech required)',
    coverageCheck: {
      // If civ has the prerequisite tech but < half cities have the building
      formula: 'targetBuildingCount < totalCities / 2',
      result3: { value: 3, condition: 'Has tech for target building but coverage < 50%' },
    },
  },

  electronicsTech: {
    id: 0x54,  // Electronics
    // Checks if civ has Electronics; if so, checks specialist count vs cities/4
    specialistFields: {
      offset1: '@ DAT_0064c7a8[civ * 0x594]',  // specialist count byte 1
      offset2: '@ DAT_0064c7a9[civ * 0x594]',  // specialist count byte 2
    },
    cityPopAdjust: '@ DAT_0064f37a[slot * 0x58] (signed byte, added per city)',
    formula: 'totalSpecialists + sum(cityPopAdjust) < totalCities / 4',
    result4: { value: 4, condition: 'Has Electronics but too few specialists' },
  },

  aliveCivsComparison: {
    // Compares tech ranking position to half of alive civs
    formula: 'behindCount < aliveCivs / 2',
    result5: { value: 5, condition: 'Tech rank in bottom half of alive civs' },
    result1: { value: 1, condition: 'Tech rank in top half (but not top)' },
  },
};

// ============================================================================
// === AI DOMESTIC/CITY ADVISOR ASSESSMENT ===
// Binary ref: FUN_004bcb9b @ block_004B0000.c (1071 bytes)
// ============================================================================

export const AI_DOMESTIC_ADVISOR = {
  // Returns assessment value 1-7 based on city management quality
  // param_1 = civId, param_2 = era category (0=ancient, 1=middle, 2=modern)

  eraTargets: {
    // Target building, building coverage divisor, and maintenance threshold by era
    byEra: [
      { era: 0, targetBuilding: 0x14, targetBuildingId: 5, maintenanceDivisor: 2 },  // Temple, coverage/2
      { era: 1, targetBuilding: 6,    targetBuildingId: 10, maintenanceDivisor: 3 },  // Marketplace, coverage/3
      { era: 2, targetBuilding: 0x16, targetBuildingId: 0x16, maintenanceDivisor: 4 }, // Supermarket(22), coverage/4
    ],
  },

  buildingCensus: {
    totalBuildingTypes: 0x27,  // 39 building types counted
    perCityBuildingCheck: 'FUN_0043d20a(citySlot, buildingId) for each of 0x27 types',
    maintenanceCost: 'FUN_004f00f0(civId, buildingId) — returns per-turn cost',
    totalMaintenance: 'sum of (count[buildingId] * maintenanceCost[buildingId])',
    cityProductionOffset: '@ DAT_0064f38c[slot * 0x58] (int16, shields produced)',
    cityAttribsOffset: '@ DAT_0064f344[slot * 0x58]',
    disorderBit: 0x01,  // city.attribs & 1 → city in disorder (skip production)
  },

  productionVsMaintenance: {
    // If total shield production < total building maintenance AND treasury < 100
    treasuryOffset: '@ DAT_0064c6a2[civ * 0x594] (int32, gold in treasury)',
    treasuryThreshold: 100,
    result1: { value: 1, condition: 'Maintenance exceeds production and treasury < 100 gold' },
  },

  techChecks: {
    targetTechByEra: {
      0: { techId: 0x14, name: 'Construction' },    // ancient era target tech
      1: { techId: 6,    name: 'Currency' },         // middle era target tech
      2: { techId: 0x16, name: 'Electronics' },      // modern era target tech
    },
    result2: { value: 2, condition: 'Does not have era-appropriate tech' },
  },

  buildingCoverage: {
    // target building count vs (totalCities / maintenanceDivisor)
    formula: 'targetBuildingCount < totalCities / divisor',
    result3: { value: 3, condition: 'Target building coverage below era threshold' },
  },

  electronicsTech: {
    id: 0x54,  // Electronics
    specialistCheck: {
      // Same specialist formula as science advisor
      formula: 'totalSpecialists < totalCities / 4',
      result5: { value: 5, condition: 'Has Electronics but specialist count too low' },
    },
    result4: { value: 4, condition: 'Does not have Electronics' },
  },

  surplusCheck: {
    // production - maintenance < 6
    surplusThreshold: 6,
    result6: { value: 6, condition: 'Production surplus is less than 6 shields' },
    result7: { value: 7, condition: 'Production surplus >= 6 shields (healthy economy)' },
  },
};

// ============================================================================
// === AI FOREIGN ADVISOR ASSESSMENT ===
// Binary ref: FUN_004bcfcf @ block_004B0000.c (724 bytes)
// ============================================================================

export const AI_FOREIGN_ADVISOR_ASSESSMENT = {
  // Returns assessment value 1-7 based on diplomatic situation
  // param_1 = civId, param_2 = era category (0=ancient, 1=middle, 2=modern)

  treatyScanning: {
    // Iterates all 7 other civs checking treaty flags
    treatyByteOffset: '@ DAT_0064c6c0[otherCiv * 4 + myCiv * 0x594]',
    contactFlag:  0x01,  // has contact
    allianceFlag: 0x08,  // alliance treaty
    hatredFlag:   0x20,  // @ byte+1: DAT_0064c6c1 & 0x20 — vendetta/hatred
    embassyFlag:  0x80,  // embassy established
    result1: { value: 1, condition: 'No contacts with any other civ' },
  },

  intelligenceCheck: {
    // Check if player civ can see other civs via embassy/SETI/Great Library
    setiWonder: { id: 0x18, name: 'SETI Program' },
    greatLibraryWonder: { id: 9, name: 'Great Library' },
    // Has embassy (0x80 in DAT_0064c6c0 from human civ's row) OR has SETI OR has Great Library
    playerCivAddress: '@ DAT_006d1da0 (current human player civId)',
  },

  diplomacyTech: {
    // Tech required depends on era
    earlyTech: { id: 0x58, name: 'Writing', condition: 'era != 2 (ancient/middle)' },
    lateTech:  { id: 0x1B, name: 'Espionage', condition: 'era == 2 (modern)' },
    result3: { value: 3, condition: 'Does not have era-appropriate diplomacy tech' },
  },

  aggressionCheck: {
    // Complex multi-condition: low contacts, or high militarism, or alliance exists,
    // or civ attribs flag 0x100, or advanced era
    militarismOffset: '@ DAT_0064c6be[civ * 0x594]',
    militarismThreshold: 1,  // militarism > 1 triggers aggressive path
    highMilitarismThreshold: 3,  // militarism >= 3 → always result 4
    civAttribsOffset: '@ DAT_0064c6a0[civ * 0x594] (uint16)',
    attribsWarFlag: 0x0100,
    eraThreshold: 6,  // era > 6 triggers aggressive path
    result2: { value: 2, condition: 'Has diplomacy tech but low contacts, no alliances, peaceful, early era' },
    result4: { value: 4, condition: 'High militarism (>= 3) OR all contacts are hateful and militarism > 1' },
  },

  detailedDiplomacy: {
    // Reached when militarism < 3 and conditions not met for result 2
    civilianFlag: {
      civAttribsBit: 0x80,  // DAT_0064c6a0 & 0x80 — has been in war / aggression bit
      result6_noWar: { value: 6, condition: 'No aggression flag (0x80) set' },
    },
    result5: { value: 5, condition: 'Has embassy flag but no intelligence on all hateful civs' },
    result6: { value: 6, condition: 'All hateful but has intelligence' },
    result7: { value: 7, condition: 'Intelligence on non-hateful civs available' },
  },
};

// ============================================================================
// === AI HAPPINESS/TAX ADVISOR ASSESSMENT ===
// Binary ref: FUN_004bd2a3 @ block_004B0000.c (770 bytes)
// ============================================================================

export const AI_HAPPINESS_ADVISOR = {
  // Returns assessment value 1-7 based on citizen happiness & tax balance
  // param_1 = civId

  recalcTrigger: {
    // If DAT_00655aee has bit 0x04, clears it and recalculates city production for late-era civs
    flag: 'DAT_00655aee & 0x04',
    eraThreshold: 4,  // only recalc if DAT_0064c6b5[civ] > 4
    recalcFunction: 'FUN_004eb4ed(citySlot, 1)',
  },

  citizenCounting: {
    // Per-city: compare happy citizens vs unhappy citizens
    happyCitizensOffset: '@ DAT_0064f392[slot * 0x58]',   // city+0x4A (signed char)
    unhappyCitizensOffset: '@ DAT_0064f393[slot * 0x58]',  // city+0x4B (signed char)
    // If happy < unhappy: city is unhappy (local_10++)
    // If happy == unhappy: city is neutral (local_18++)
    cityAttribsOffset: '@ DAT_0064f344[slot * 0x58]',
    disorderBit: 0x01,  // city in civil disorder
    revoltBit:   0x02,  // city in revolt
    weLoveKingCheck: 'happy > unhappy AND attribs & 1 (we-love-the-king day)',
  },

  taxBalance: {
    // Checks if tax rates sum to 10 (maximum)
    scienceRateOffset: '@ DAT_0064c6b3[civ * 0x594]',
    luxuryRateOffset:  '@ DAT_0064c6b4[civ * 0x594]',
    totalRatesFormula: 'scienceRate + luxuryRate',
    maxRateSum: 10,  // if sum == 10, rates are maxed out
    earlyEra: {
      // era < 5: bVar1 = false only if (no unhappy cities AND has neutral cities
      // AND no revolts AND scienceRate + luxuryRate == 10)
      eraThreshold: 5,
      perfectCondition: 'unhappyCities == 0 AND neutralCities > 0 AND revoltCities == 0 AND rateSum == 10',
    },
    lateEra: {
      // era >= 5: bVar1 = (scienceRate + luxuryRate < 9)
      rateThreshold: 9,  // rates must sum to >= 9 to be considered balanced
    },
  },

  assessmentLogic: {
    // unhappyCities == 0 (all cities happy/content):
    noUnhappy_canImprove: { value: 5, condition: 'No unhappy cities, rates can be improved, no revolts' },
    noUnhappy_canImprove_revolt: { value: 6, condition: 'No unhappy cities, rates can be improved, has revolts' },
    noUnhappy_perfect: { value: 4, condition: 'No unhappy cities, rates already optimal' },

    // unhappyCities > 0:
    hasUnhappy_canImprove: {
      noDisorder: { value: 3, condition: 'Has unhappy cities, rates not maxed, no disorder-with-WeLoveKing' },
      withDisorder: { value: 1, condition: 'Has unhappy cities, rates not maxed, disorder cities with WeLoveKing AND government == Democracy(6)' },
    },
    hasUnhappy_ratesMaxed: { value: 2, condition: 'Has unhappy cities but rates already maxed' },
  },

  governmentChecks: {
    democracy: 6,  // government type 6 = Democracy, special disorder handling
    governmentOffset: '@ DAT_0064c6b5[civ * 0x594]',
  },
};

// ============================================================================
// === AI TECH VALUATION ===
// Binary ref: FUN_004bdb2c @ block_004B0000.c (2869 bytes)
// ============================================================================

export const AI_TECH_VALUATION = {
  // Returns integer valuation score for a tech for a given civ
  // param_1 = civId, param_2 = techId

  civStyleBonusBase: {
    // local_38 = civ style bonus from leader table
    leaderTableOffset: '@ DAT_006554fa[styleIndex * 0x30]',
    styleIndexOffset: '@ DAT_0064c6a6[civ * 0x594] (int16)',
    leaderTableStride: 0x30,
  },

  deadTechPenalty: {
    // If civ is dead (not in DAT_00655b0b alive bitmask) AND style bonus >= 0:
    // Check continent overlap with alive hateful civs having more techs
    // Subtract from style bonus for each shared continent zone
    // If hateful civ has militarism > 6: set style bonus to -1 (dead tech)
    aliveBitmask: '@ DAT_00655b0b',
    hatredFlag: 0x20,  // DAT_0064c6c1 & 0x20
    techLevelOffset: '@ DAT_0064c6b0[civ * 0x594]',
    continentArrayOffset: '@ DAT_0064c932[civ * 0x594 + zoneId]',
    maxZones: 0x3F,
    militarismDeadThreshold: 6,  // militarism > 6 → bonus = -1
  },

  baseFormula: {
    // local_8 = techMilitarism * styleBonus + techBaseValue
    techMilitarisimOffset: '@ DAT_0062768b[techId * 0x10]',
    techBaseValueOffset: '@ DAT_0062768a[techId * 0x10]',
    formula: 'militarism_byte * style_bonus + base_value_byte',
    techRecordStride: 0x10,
  },

  continentBonus: {
    // Bonus from prerequisite depth to research goals
    researchGoals: {
      goal1: '@ DAT_0064b44b',  // depth 3 bonus
      goal2: '@ DAT_0064b45f',  // depth 2 bonus
      goal3: '@ DAT_0064b487',  // depth 2 bonus
      goal4: '@ DAT_0064b527',  // depth 1 bonus
    },
    depthToBonus: { 3: 'goal1 match', 2: 'goal2 or goal3 match', 1: 'goal4 match', 0: 'no match' },
    scenarioDoubleFlag: 'DAT_00655af0 & 4',  // doubles the continent bonus
    // If bonus > 0: check if any other alive civ shares a continent with this civ
    // If unique continent: add full bonus; if shared: add 1
    uniqueContinentBonus: 'local_8 += local_10 (full bonus)',
    sharedContinentBonus: 'local_8 += 1',
  },

  researchGoalBonus: {
    // If DAT_0064c59e == techId: add researchPriority / 4
    currentResearchGoal: '@ DAT_0064c59e',
    researchPriority: '@ DAT_0064c70a[civ * 0x594] (int16)',
    formula: 'local_8 += priority / 4',
  },

  humanCivBonuses: {
    // Only applied if civ is NOT in DAT_00655b0b alive bitmask (i.e., dead/AI check)
    wonderObsolescenceCheck: {
      // If wonder obsolescence tech matches this tech and civ already has the wonder: -2
      // But if tech is "Philosophy" (0x25): skip the -2 penalty
      wonderObsoleteTable: '@ DAT_0064ba28[wonderId] (byte, tech that obsoletes)',
      totalWonders: 0x1C,  // 28 wonders
      philosophyException: 0x25,  // Philosophy tech exempt from wonder obsolescence penalty
      ownedWonderPenalty: -2,
      // If wonder is built and owned by alive civ: +2
      rivalWonderBonus: 2,
    },
    eraCheckTech: {
      techId: 0x20,  // Navigation
      // If prerequisite: +2 bonus
      bonus: 2,
    },
    futureWonderRange: {
      // For building IDs 0x23..0x25 (wonder slots 35-37): if building prereq tech == this tech: +3
      startBuildingId: 0x23,
      endBuildingId: 0x25,  // exclusive: < 0x26
      buildingPrereqOffset: '@ DAT_0064c48e[buildingId * 8]',
      bonus: 3,
    },
    researchGoalFitBonus: {
      // If DAT_0064b3fb >= 0 and alive and is prereq of goal tech: +2
      // If goal IS this tech: +5
      aiResearchGoal: '@ DAT_0064b3fb',
      aliveCheck: '@ DAT_00655b82[goalTechId]',
      prereqBonus: 2,
      exactMatchBonus: 5,
    },
  },

  populationGrowthBonus: {
    // If tech == DAT_0064c4d6 or DAT_0064c546 (granary/aqueduct growth techs):
    // Find max city size in empire, compare to growth threshold
    growthTech1: '@ DAT_0064c4d6',  // tech for growth building 1
    growthTech2: '@ DAT_0064c546',  // tech for growth building 2
    growthThreshold1: '@ DAT_0064bcd1',  // size threshold for tech 1
    growthThreshold2: '@ DAT_0064bcd2',  // size threshold for tech 2
    citySizeOffset: '@ DAT_0064f349[slot * 0x58] (signed byte)',
    bonus: 2,  // added if largest city >= growth threshold
  },

  nuclearBonus: {
    // If civ has style bonus >= 0, has Radio (0x55), and this tech is a prereq of 0x10 (Composites?):
    radioTech: { id: 0x55, name: 'Radio' },
    targetTech: { id: 0x10, name: 'Composites/Nuclear prerequisite chain' },
    prereqBonus: 'style_bonus + 1',
    exactMatchBonus: 2,  // if techId == 0x10: +2 extra
  },

  fusionBonus: {
    // If civ has tech 0x26 (Fusion Power?) and tech is prereq of 0x25 (some advanced tech):
    fusionTech: { id: 0x26 },
    targetTech: { id: 0x25 },
    // Additional check: if civ also has tech 0x39: bonus = 2; else bonus = 1
    advancedTechId: 0x39,
    bonusWithAdvanced: 2,
    bonusWithout: 1,
  },

  // === PER-CIV-STYLE TECH BONUSES (21 cases) ===
  // Switch on DAT_0064c6a6[civ * 0x594] (style index, 0x00-0x14)
  civStyleBonuses: {
    0: {  // Romans
      bonusTechs: [
        { id: 0x27, bonus: 2, name: 'Engineering/Republic' },
        { id: 0x08, bonus: 2, name: 'Bronze Working' },
        { id: 0x56, bonus: 2, name: 'Warrior Code' },
      ],
      penaltyTechs: [
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    1: {  // Babylonians
      bonusTechs: [
        { id: 0x0C, bonus: 1, name: 'Code of Laws' },
      ],
    },
    2: {  // Germans
      bonusTechs: [
        { id: 0x06, bonus: 1, name: 'Astronomy' },
        { id: 0x52, bonus: 1, name: 'University' },
        { id: 0x3C, bonus: 1, name: 'Theology' },
      ],
    },
    3: {  // Egyptians
      bonusTechs: [
        { id: 0x2F, bonus: 2, name: 'Gunpowder' },
      ],
    },
    4: {  // Americans
      bonusTechs: [
        { id: 0x15, bonus: 2, name: 'Democracy' },
        { id: 0x49, bonus: 1, name: 'Industrialization' },
        { id: 0x10, bonus: 1, name: 'Composites' },
        { id: 0x2A, bonus: 1, name: 'Philosophy' },
      ],
      penaltyTechs: [
        { id: 0x0F, bonus: -1, name: 'Communism' },
      ],
    },
    5: {  // Greeks
      bonusTechs: [
        { id: 0x40, bonus: 1, name: 'Seafaring' },
        { id: 0x08, bonus: 1, name: 'Bronze Working' },
        { id: 0x01, bonus: 1, name: 'Alphabet' },
        { id: 0x2E, bonus: 1, name: 'Map Making' },
        { id: 0x3C, bonus: 2, name: 'Theology' },
      ],
      penaltyTechs: [
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    6: {  // Indians
      bonusTechs: [
        { id: 0x40, bonus: 2, name: 'Seafaring' },
        { id: 0x24, bonus: 1, name: 'Mathematics' },
        { id: 0x38, bonus: 1, name: 'Navigation' },
        { id: 0x09, bonus: 1, name: 'Ceremonial Burial' },
      ],
      penaltyTechs: [
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    7: {  // Russians
      bonusTechs: [
        { id: 0x0F, bonus: 2, name: 'Communism' },
        { id: 0x3C, bonus: 1, name: 'Theology' },
        { id: 0x22, bonus: 1, name: 'Literacy' },
      ],
    },
    8: {  // Zulus
      bonusTechs: [
        { id: 0x40, bonus: 2, name: 'Seafaring' },
        { id: 0x24, bonus: 1, name: 'Mathematics' },
        { id: 0x38, bonus: 1, name: 'Navigation' },
        { id: 0x09, bonus: 1, name: 'Ceremonial Burial' },
      ],
      penaltyTechs: [
        { id: 0x08, bonus: -1, name: 'Bronze Working' },
        { id: 0x27, bonus: -1, name: 'Engineering/Republic' },
      ],
    },
    9: {  // French
      bonusTechs: [
        { id: 0x2A, bonus: 1, name: 'Philosophy' },
        { id: 0x51, bonus: 1, name: 'The Wheel' },
        { id: 0x11, bonus: 1, name: 'Conscription' },
      ],
    },
    10: {  // Aztecs
      penaltyTechs: [
        { id: 0x23, bonus: -2, name: 'Horseback Riding' },
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    11: {  // Chinese (0x0B)
      special: 'If unique continent (local_34 != 0): subtract continent bonus',
      bonusTechs: [
        { id: 0x23, bonus: 1, name: 'Horseback Riding' },
      ],
    },
    12: {  // English (0x0C)
      special: 'If continent bonus > 0: +1 extra',
      bonusTechs: [
        { id: 0x37, bonus: 1, name: 'Mysticism' },
      ],
    },
    // 13 (0x0D): no bonuses
    // 14 (0x0E): no bonuses
    15: {  // Persians (0x0F)
      bonusTechs: [
        { id: 0x4F, bonus: 1, name: 'Monotheism' },
        { id: 0x34, bonus: 1, name: 'Feudalism' },
      ],
    },
    16: {  // Carthaginians (0x10)
      bonusTechs: [
        { id: 0x2E, bonus: 1, name: 'Map Making' },
      ],
    },
    17: {  // Arabs (0x11)
      special: 'If continent bonus > 1: +1 extra',
      bonusTechs: [
        { id: 0x37, bonus: 1, name: 'Mysticism' },
      ],
    },
    18: {  // Vikings (0x12)
      bonusTechs: [
        { id: 0x40, bonus: 2, name: 'Seafaring' },
        { id: 0x24, bonus: 1, name: 'Mathematics' },
        { id: 0x38, bonus: 1, name: 'Navigation' },
        { id: 0x09, bonus: 1, name: 'Ceremonial Burial' },
      ],
      penaltyTechs: [
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    19: {  // Spanish (0x13) — same as Vikings (0x12)
      bonusTechs: [
        { id: 0x40, bonus: 2, name: 'Seafaring' },
        { id: 0x24, bonus: 1, name: 'Mathematics' },
        { id: 0x38, bonus: 1, name: 'Navigation' },
        { id: 0x09, bonus: 1, name: 'Ceremonial Burial' },
      ],
      penaltyTechs: [
        { id: 0x37, bonus: -1, name: 'Mysticism' },
      ],
    },
    20: {  // Celts (0x14)
      bonusTechs: [
        { id: 0x24, bonus: 2, name: 'Mathematics' },
      ],
    },
  },

  firstDiscovererBonus: {
    // If no other civ has researched this tech: +1
    techDiscoveryBitmask: '@ DAT_00655b82[techId]',
    bonus: 1,
    condition: 'DAT_00655b82[techId] == 0 (no civ has this tech yet)',
  },

  knownPrereqPenalty: {
    // For each tech 0..99: if this tech is a prereq of that tech and civ already has it: -1
    formula: 'For each tech whose prereq1 or prereq2 == this tech: if civ has that tech, local_8 -= 1',
    maxTechs: 100,
  },

  minimumValue: {
    clamp: 2,  // if local_8 < 2: local_8 = 1 (minimum valuation is 1)
    notes: 'Values below 2 are clamped to 1',
  },
};

// ============================================================================
// === LEONARDO'S WORKSHOP UNIT UPGRADE ===
// Binary ref: FUN_004be6ba @ block_004B0000.c (970 bytes)
// ============================================================================

export const LEONARDOS_WORKSHOP = {
  // Triggered per civ: upgrades all units when prerequisite tech is researched
  wonderId: 0x0E,  // Leonardo's Workshop
  wonderCheck: 'FUN_00453e51(civId, 0x0E)',

  unitTypeTable: {
    stride: 0x14,        // 20 bytes per unit type entry
    maxTypes: 0x3E,      // 62 unit types
    obsoleteTechOffset: '@ DAT_0064b1c0[type * 0x14] (signed byte, tech that obsoletes)',
    domainOffset: '@ DAT_0064b1ca[type * 0x14]',   // 0=land, 1=sea
    attackOffset: '@ DAT_0064b1c5[type * 0x14]',
    defenseOffset: '@ DAT_0064b1c9[type * 0x14]',
    prereqTechOffset: '@ DAT_0064b1cb[type * 0x14]',
  },

  advancedUpgrade: {
    // If unit role == 1 (sea domain) and attack < threshold and has Horseback Riding: upgrade to land unit 0x23
    techId: 0x23,        // Horseback Riding prerequisite for advanced upgrade
    attackThreshold: '@ DAT_0064b251 (global attack threshold)',
    condition: 'role == 1 AND attack < threshold AND civ_has_tech(civId, 0x23)',
    upgradeTo: 0x23,     // land unit type for advanced upgrade
  },

  upgradeSearch: {
    // For each unit: find highest-tier replacement with same role, matching prereq tech, higher stats
    algorithm: 'Iterate all 0x3E unit types, find best match where prereqTech == obsoleteTech AND same role AND attack >= current AND defense >= current',
    notification: {
      singlePlayer: 'dialog "UPGRADE" with old/new unit names',
      multiplayer: 'network message 0x3E via FUN_00511880',
      multiplayerThreshold: 'DAT_00655b02 > 2 (3+ players)',
    },
    unitFieldUpdate: {
      typeId: '@ DAT_006560f6[slot * 0x20]',
      veteranFlag: '@ DAT_006560f4[slot * 0x20] &= ~0x2000 (clear veteran)',
    },
  },
};

// ============================================================================
// === TECH-TRIGGERED GOVERNMENT REVOLUTION ===
// Binary ref: FUN_004bea84 @ block_004B0000.c (973 bytes)
// ============================================================================

export const TECH_GOVERNMENT_REVOLUTION = {
  // Called when a civ discovers a tech that enables a new government form

  monarchyTech: {
    techId: 0x36,  // Monarchy tech
    targetGovernment: 1,  // Monarchy
    condition: 'current government == Despotism(1)',
    dialog: 'AUTOMONARCHY',
    startRevDialog: 'STARTREV',
    revolutionFunction: 'FUN_0055c066(civId, 0)',
  },

  republicTech: {
    techId: 0x47,  // Republic tech
    targetGovernment: 5,  // Republic
    skipIfAlready: 'government == 5 (already Republic)',
    tutorialCheck: {
      flag: 'DAT_00655aea byte1 & 1',
      eraThreshold: 3,  // era < 3 triggers tutorial
      tutorialDialog: 'REPUBLIC',
    },
  },

  democracyTech: {
    techId: 0x15,  // Democracy
    targetGovernment: 6,  // Democracy
  },

  communismTech: {
    techId: 0x0F,  // Communism
    targetGovernment: 3,
    skipIfAlready: 'government == 3',
  },

  fundamentalismTech: {
    techId: 0x1F,  // Fundamentalism
    targetGovernment: 4,
    skipIfAlready: 'government == 4',
  },

  skipConditions: [
    'government == Democracy(6)',   // Democracy never auto-revolts
    'government == Anarchy(0)',     // Anarchy can\'t revolt
  ],

  revolutionDialog: 'AUTOREV',
  governmentNames: '@ DAT_0064b9a0[govtType * 4]',
  techNames: '@ DAT_00627684[techId * 0x10]',

  tutorialTriggers: {
    // Tutorial popups triggered by specific tech discoveries
    railroads: { techId: 0x43, dialog: 'RAILROADS' },
    farmland:  { techId: 0x46, dialog: 'FARMLAND' },
    trade:     { techId: 0x54, dialog: 'TRADE' },
    seafaring: { techId: 0x4B, dialog: 'SEAFARING' },
    writing:   { techId: 0x58, dialog: 'WRITING' },
    flag: 'DAT_00655aea byte1 & 1 (tutorial mode)',
  },
};

// ============================================================================
// === GOLDEN AGE EVENT ===
// Binary ref: FUN_004bee56 @ block_004B0000.c (379 bytes)
// ============================================================================

export const GOLDEN_AGE = {
  // Selects a random city for the golden age event, weighted by city size

  eventName: 'GOLDENAGE',
  citySelection: {
    algorithm: 'Iterate all cities owned by civ; for each city: weight = city.size',
    cityWallsBonus: {
      buildingId: 1,  // City Walls
      effect: 'weight = size * 2 (doubles chance)',
    },
    randomSelection: 'rand() % weight; highest (random+1) wins',
    minimumSize: 'weight of 1 or less → treated as 0 chance',
  },

  notification: {
    multiplayerMessage: {
      messageType: 0x54,
      threshold: 'DAT_00655b02 > 2',
    },
    displayDialog: {
      template: 'GOLDENAGE',
      musicTrack: 0x3C,  // 60
      displayMode: 8,
    },
    cityNameOffset: '@ DAT_0064f360[slot * 0x58]',
  },
};

// ============================================================================
// === TECH ACQUISITION EFFECTS / BARRACKS OBSOLESCENCE ===
// Binary ref: FUN_004bf05b @ block_004B0000.c (3391 bytes)
// ============================================================================

export const TECH_ACQUISITION = {
  // Master function called when a civ acquires a new tech. Handles all side effects.
  // param_1=civId, param_2=techId, param_3=sourceCivOrFlag, param_4=flag, param_5=networkFlag

  networkForwarding: {
    // If multiplayer (DAT_00655b02 > 2), not networkFlag, civ is alive and in game:
    // Forward to network via message type 0x9B
    messageType: 0x9B,
    multiplayerThreshold: 3,  // DAT_00655b02 > 2
  },

  techBitmaskUpdate: {
    // Sets the bit in civ's tech ownership array
    futureTechId: 0x59,  // future tech: increments counter instead
    futureTechCounterOffset: '@ DAT_0064c6b1[civ * 0x594]',
    techArrayOffset: '@ DAT_0064c6f8[civ * 0x594 + byteIndex]',
    techDiscoveryOrder: '@ DAT_0064c714[civ * 0x594 + techId]',
    globalDiscoveryBitmask: '@ DAT_00655b82[techId]',
    firstDiscovererFlag: 'local_1c = 1 if was 0 before (first in world)',
  },

  discoveryNotification: {
    // Shows discovery dialog to human player (if applicable)
    // Checks embassy, SETI (0x18), Great Library (9), alliance (0x08), and reveal flag
    setiWonder: 0x18,
    greatLibraryWonder: 9,
    embassyFlag: 0x80,
    allianceFlag: 0x08,
    revealFlag: '@ DAT_00655b07',
    techCivlopediaEntry: '@ DAT_00627684[techId * 0x10]',
    techIconCalculation: '@ DAT_0062768d[techId * 0x10] * 0x3C + DAT_0062768c[techId * 0x10] * 0xF0',
  },

  buildingUnlock: {
    // Lists buildings and units enabled by this tech
    buildingPrereqTable: '@ DAT_0064c48e[buildingId * 8]',
    totalBuildingSlots: 0x43,  // 67 building/wonder slots
    unitPrereqTable: '@ DAT_0064b1cb[unitType * 0x14]',
    totalUnitTypes: 0x3E,      // 62 unit types
  },

  barracksObsolescence: {
    // Triggered when specific tech is discovered (horseback riding chain tech, or barracks obsolete tech)
    triggerTech: 0x23,  // tech that obsoletes barracks (Gunpowder via chain ending at 0x35)
    barracksBuilding: 2,
    // Iterates tech tree: walks from tech 0x35 up prereqs until reaching a tech with (&DAT_00627689)[tech*0x10] != 0
    // If param_2 == that tech OR param_2 == 0x23: trigger barracks removal
    refundFormula: {
      // refund = DAT_0064c49c * DAT_0064bccc * barracksCount
      productionCostMult: '@ DAT_0064c49c',
      shieldCostMult: '@ DAT_0064bccc',
      formula: 'productionCostMult * shieldCostMult * barracksCount',
      addToTreasury: '@ DAT_0064c6a2[civ * 0x594] += refund',
    },
    removalFunction: 'FUN_0043d289(citySlot, 2, 0)',
    notification: {
      dialog: 'BARRACKS',
      iconAddress: '@ DAT_006451d8 (barracks civlopedia icon)',
    },
  },

  goldenAgeTrigger: {
    // If this is the first-in-world discovery (local_1c != 0) and tech 0x3C (Theology):
    techId: 0x3C,  // Theology triggers golden age
    civAttribsFlagSet: 0x20,  // DAT_0064c6a0 |= 0x20
    condition: 'firstDiscoverer AND tech == 0x3C AND (not loading AND (not self-discovery OR sourceCiv != 0))',
    function: 'FUN_004bee56(civId)',
  },

  wonderObsolescence: {
    // For all 0x1C (28) wonders: if wonder's obsolete tech == this tech
    totalWonders: 0x1C,
    wonderObsoleteTable: '@ DAT_0064ba28[wonderId]',
    wonderCityTable: '@ DAT_00655be6[wonderId * 2] (int16)',
    notification: {
      dialog: 'ENDWONDER',
      multiplayerMessage: 0x4D,
    },
  },

  leonardosWorkshop: {
    // Always called at end: FUN_004be6ba(civId)
    function: 'FUN_004be6ba(civId)',
  },

  greatLibraryCascade: {
    // If Great Library (wonder 4) owner exists and hasn't researched this tech:
    // Count how many civs have the tech; if >= 2: give tech to Great Library owner
    greatLibraryWonderId: 4,
    minimumKnowers: 2,  // at least 2 civs must have the tech
    cascadeCall: 'FUN_004bf05b(wonderOwner, techId, 0xFFFFFFFE, 0, 0)',
    sourceCivFlag: 0xFFFFFFFE,  // -2, indicates Great Library gift
  },

  networkSync: {
    // After all processing: sync state
    syncMessage: 'FUN_004b0b53(0xFF, 2, 0, 0, 0)',
    multiplayerThreshold: 3,
  },
};

// ============================================================================
// === UNIT BUILDABILITY CHECK ===
// Binary ref: FUN_004bfe5a @ block_004B0000.c (1095 bytes)
// ============================================================================

export const UNIT_BUILDABILITY = {
  // Returns 1 if civ can build unit type, 0 otherwise
  // param_1=civId, param_2=citySlot (-1 for no city check), param_3=unitTypeId

  unitTypeTable: {
    stride: 0x14,
    prereqTechOffset: '@ DAT_0064b1cb[type * 0x14] (signed byte)',
    obsoleteTechOffset: '@ DAT_0064b1c0[type * 0x14] (signed byte)',
    domainOffset: '@ DAT_0064b1ca[type * 0x14]',  // 0=land, 1=sea, 2=air
    roleOffset: '@ DAT_0064b1c1[type * 0x14]',
    attackOffset: '@ DAT_0064b1c4[type * 0x14]',
    defenseOffset: '@ DAT_0064b1c5[type * 0x14]',
    moveRateOffset: '@ DAT_0064b1c2[type * 0x14]',
    nameOffset: '@ DAT_0064b1b8[type * 0x14] (char*)',
  },

  prereqChecks: {
    // 1. prereqTech >= -2 (not disabled)
    // 2. prereqTech < 0 → always available, OR civ has prereqTech
    // 3. obsoleteTech < 0 → never obsoletes, OR civ does NOT have obsoleteTech
    techDisabledValue: -2,  // prereq == -2 means unit is disabled
  },

  horsbackRidingCheck: {
    // If domain == 1 (sea) and attack < threshold and civ has Horseback Riding (0x23):
    // Then the obsolete version of this sea unit exists, so it can't be built
    techId: 0x23,
    attackThreshold: '@ DAT_0064b251',
    condition: 'role == 1 AND defense < threshold AND has_tech(0x23) → cannot build',
  },

  specialUnitChecks: {
    // Nuclear missile: requires attack >= 99 (0x63)
    nuclearAttackThreshold: 0x63,  // 99
    nuclearRequirements: {
      manhattanProjectFlag: '@ DAT_00655c14 != -1',
      prerequisiteTech: { id: 0x3A, name: 'Nuclear Fission' },
    },
  },

  cityRequirements: {
    // If param_2 (citySlot) >= 0 and unit role == 2 (air):
    // City must have coast access (DAT_0064f346 & 0x20) and be valid (DAT_0064f344 & 0x80)
    airUnitRole: 2,
    coastalBit: 0x20,   // city.flags[+2] & 0x20
    validCityBit: 0x80,  // city.flags[+0] & 0x80
  },

  aiDuplicateCheck: {
    // For AI civs (not in alive bitmask): if unit has same role and domain as another
    // buildable unit with better stats, skip this one
    condition: 'civ not in DAT_00655b0b AND moveRate > global threshold AND role == 0 (land)',
    moveRateThreshold: '@ DAT_0064bcc8',
    algorithm: 'Iterate all 0x3E types; if another type has same role+domain, higher attack+defense, and civ has its prereq tech: return 0',
  },

  fundamentalismCheck: {
    // Unit type 8 (Fanatics) requires government type 4 (Fundamentalism)
    unitTypeId: 8,
    requiredGovernment: 4,  // Fundamentalism
    governmentOffset: '@ DAT_0064c6b5[civ * 0x594]',
  },
};

// ============================================================================
// === BEST CITY SELECTION (for military display) ===
// Binary ref: FUN_004b0157 @ block_004B0000.c (484 bytes)
// ============================================================================

export const BEST_CITY_SELECTION = {
  // Finds the "best" city for a civ (highest score) for military display purposes
  cityScoring: {
    baseScore: 'city.size (DAT_0064f349[slot * 0x58])',
    cityWallsBonus: 200,    // +200 if city has City Walls (building 1)
    capitalBonus: 100,       // +100 if city.production == -1 (capital marker at DAT_0064f379)
  },
  highResDisplay: {
    // Different layout widths for high-res vs low-res
    lowResWidth: 0x18,
    highResWidth: 0x24,
    highResFlag: '@ local_14 + 0x154 (nonzero = high-res)',
  },
};

// ============================================================================
// === COMBAT RESOLUTION FORMULA ===
// Binary ref: FUN_00580341 @ block_00580000.c (15052 bytes)
// ============================================================================

export const COMBAT_RESOLUTION = {
  // The master combat function. param_1=attacker unit index, param_2=direction,
  // param_3=0 for AI evaluation (returns odds ratio), nonzero for actual combat.

  unitRecordStride: 0x20,          // 32 bytes per unit record
  unitTypeRecordStride: 0x14,      // 20 bytes per unit type record @ DAT_0064b1b8
  civRecordStride: 0x594,          // 1428 bytes per civ record

  attackComputation: {
    // local_a0 = base attack power (from FUN_0057e2c3)
    // Adjusted by movement points remaining vs max movement
    movementScaling: {
      formula: 'if param_3 != 0: attack = attack * min(movesLeft, maxMoves) / maxMoves',
      maxMovesAddr: 'DAT_0064bcc8',  // cosmic parameter: base movement rate
    },
    // Attacker type 0x09 (Diplomat) vs defender with 0 attack: attack *= 8
    diplomatVsZeroAttack: {
      attackerType: 0x09,
      multiplier: 8,
      condition: 'attacker.type == 0x09 AND defender.attack == 0',
      sourceAddr: '0x00580341+line183',
    },
    // Barbarian attacker (civId == 0): attack /= 2 (human defender) or *= (diff+1)/4
    barbarianPenalty: {
      humanDefender: 'attack /= 2',
      aiDefender: 'attack = (difficulty + 1) * attack / 4',
      sourceAddr: '0x00580341+line213',
    },
    // Sneak attack bonus: attack *= 2
    sneakAttackBonus: {
      multiplier: 2,
      condition: 'no peace/ceasefire/alliance treaty between attacker and defender',
      turnTracker: '@ DAT_0064ca82[defender*0x594 + attacker*2] = current turn',
      sourceAddr: '0x00580341+line384',
    },
    // Difficulty-based adjustments
    difficultyAdjustments: {
      lowDifficulty_humanDefender: 'attack >>= 1 (halved)',  // difficulty < 2 AND defender is human
      zeroDifficulty_humanAttacker: 'attack <<= 1 (doubled)',  // difficulty == 0 AND attacker is human
      sourceAddr: '0x00580341+line389',
    },
    // Maximum attack clamp
    maxAttackClamp: 3999,          // @ 0x00580341+line257: while (local_a0 > 3999) { attack >>= 1; defense >>= 1 }
  },

  defenseComputation: {
    // local_64 = base defense (from FUN_0057e33a)
    // Terrain and building modifiers applied to defense

    // Submarine vs non-submarine: defender loses half defense, firepower = 1
    submarineRule: {
      defenderFlag: 0x04,   // unit flags & 0x04 = submarine
      condition: 'defender has sub flag AND attacker domain == sea AND attacker has no bombard',
      effect: 'defense -= defense/2; defender firepower = 1',
      sourceAddr: '0x00580341+line127',
    },
    // Air defense bonus: defender gets 150% defense when full movement AND land domain AND max_direction == 10
    airDefenseBonus: {
      multiplier: 1.5,      // defense += defense/2
      condition: 'defender has flag 0x04 AND attacker moves == maxMoves*2 AND attacker domain == land AND closest_dir == 10',
      sourceAddr: '0x00580341+line136',
    },
    // Anti-air vs sea: defense *= 3 (without air flag) or *= 5 (with air flag)
    antiAirVsSea: {
      noAirFlag: 3,          // defense *= 3
      withAirFlag: 5,        // defense *= 5
      condition: 'defender flag 0x20 AND attacker domain == sea',
      sourceAddr: '0x00580341+line142',
    },
    // SAM Missile Battery (building 0x1C): defense *= 2
    samBatteryBonus: {
      buildingId: 0x1C,      // SAM Missile Battery
      multiplier: 2,
      condition: 'attacker domain == air AND defender domain != air AND city has SAM Battery',
      sourceAddr: '0x00580341+line151',
    },
    // Coastal Fortress (building 0x11): defense *= 2
    coastalFortressBonus: {
      buildingId: 0x11,
      multiplier: 2,
      condition: 'attacker domain == sea AND city has Coastal Fortress AND attacker has air flag AND attacker attack < 99',
      sourceAddr: '0x00580341+line164',
    },
    // City Walls (building 0x1B): defense *= 2
    cityWallsBonus: {
      buildingId: 0x1B,
      multiplier: 2,
      condition: 'attacker domain == sea AND city has City Walls',
      sourceAddr: '0x00580341+line174',
    },
    // Great Wall wonder: attack /= 2, city considered walled
    greatWallEffect: {
      wonderId: 6,
      effect: 'attack /= 2; city.has_walls = true',
      condition: 'defender has Great Wall wonder AND defender city count < 8',
      sourceAddr: '0x00580341+line222',
    },
    // Barbarian defender (civId == 0): special handling
    barbarianDefender: {
      settlerType: 0x04,    // settler
      workerType: 0x05,     // worker (engineer)
      defenseHalved: 'defense /= 2; if defense < 2: defense = 1',
      sourceAddr: '0x00580341+line240',
    },
  },

  oddsCalculation: {
    // When param_3 == 0 (AI evaluation mode):
    // Simplified combat uses HP-scaled odds
    simplifiedCombat: {
      flag: 'DAT_00655ae8 & 0x10',  // simplified combat flag
      formula: 'attack = (attacker.hp + attacker.firepower * 8) * attack; defense = (defender.hp + defender.firepower * 8) * defense',
      sourceAddr: '0x00580341+line250',
    },
    maxClamp: 3999,
    oddsFormula: {
      formula: 'odds = (attack * 8) / (defense + 1)',
      maxOdds: 0x400,        // 1024 — clamped to this value
      returnValue: 'min(odds, 0x400) or 999 if no defender found',
      sourceAddr: '0x00580341+line260',
    },
  },

  combatRounds: {
    // When param_3 != 0 (actual combat):
    // Round-by-round resolution with HP damage
    hpBarAnimThreshold: {
      formula: '10 >> local_cc',  // local_cc = loop counter for display frequency
      note: 'Controls how often HP bar updates are shown during combat animation',
      sourceAddr: '0x00580341+line700 approx',
    },
    roundFormula: {
      attackerWinChance: 'attack / (attack + defense)',
      damage: 'firepower points of HP removed per round',
      veteranBonus: {
        multiplier: 1.5,  // 50% bonus to attack/defense for veteran units
        sourceAddr: '0x00580341 — applied via FUN_0057e2c3/FUN_0057e33a',
      },
    },
    ransomFormula: {
      // When a unit with role 5 (settler) is captured: ransom = DAT_00655b09 * 100 / 2
      formula: 'ransom = DAT_00655b09 * 100 / 2',
      condition: 'defender role == 5 (settler/worker)',
      sourceAddr: '0x00580341+line900 approx',
    },
  },
};

// ============================================================================
// === TECH COST FORMULA ===
// Binary ref: FUN_004c2788 @ block_004C0000.c (1003 bytes)
// ============================================================================

export const TECH_COST = {
  // Returns the total science points required for a civ's current research.
  // param_1 = civId

  baseTechCount: {
    // uVar1 = techCount + futureTechCount
    techCountOffset: '@ DAT_0064c6b0[civ * 0x594] (byte, techs researched)',
    futureTechOffset: '@ DAT_0064c6b2[civ * 0x594] (byte, future techs)',
    minimumCount: 2,  // if uVar1 < 2: uVar1 = 1
    sourceAddr: '0x004c2788',
  },

  difficultyScaling: {
    // local_14 = base cost from difficulty table
    // FUN_005adfa0(difficulty, 0, 4) clamps difficulty to [0,4]
    humanCiv: {
      formula: 'local_14 = clamp(difficulty, 0, 4) * 2 + 6',
      table: { 0: 6, 1: 8, 2: 10, 3: 12, 4: 14 },
      notes: 'Human civs pay MORE for tech at higher difficulty',
    },
    aiCiv: {
      formula: 'local_14 = 14 - clamp(difficulty, 0, 4)',
      table: { 0: 14, 1: 13, 2: 12, 3: 11, 4: 10 },
      notes: 'AI civs pay LESS for tech at higher difficulty',
    },
    sourceAddr: '0x004c2788+line964',
  },

  leadingCivAdjustment: {
    // Compare civ's tech count to the leading civ's tech count (DAT_00655c20)
    leadingCivAddr: '@ DAT_00655c20 (civ with most techs)',
    behindPenalty: {
      condition: 'civ techCount < leader techCount',
      anyDifficulty: 'cost -= 1',  // if difficulty != 0
      deitySuperBehind: {
        condition: 'difficulty == 5 AND techCount + 4 < leaderTechCount AND turnNumber > 150',
        turnThreshold: 0x96,    // 150 turns
        effect: 'cost -= 1 (additional penalty)',
        sourceAddr: '0x004c2788+line977',
      },
    },
    aheadBonus: {
      condition: 'civ techCount >= leader techCount',
      formula: 'cost += (techCount - leaderTechCount) / 3',
    },
    lateTechPenalty: {
      condition: 'techCount > 19 (0x13)',
      formula: 'cost += clamp(techCount - turnNumber/8, 0, 6)',
      sourceAddr: '0x004c2788+line990',
    },
    sourceAddr: '0x004c2788+line971',
  },

  scenarioOverrides: {
    // DAT_00655af0 & 0x80 (scenario flag) with DAT_0064bcb4 != 0 skips leading civ adjustment
    scenarioFlag: 0x80,
    techCostMultiplier: {
      normalMode: {
        cosmicParam: '@ DAT_0064bcd3',  // from RULES.TXT / cosmic editor
        formula: 'if DAT_0064bcd3 != 10: cost = cost * DAT_0064bcd3 / 10',
        default: 10,  // 1.0x multiplier
      },
      scenarioMode: {
        cosmicParam: '@ DAT_0064bcb2',
        formula: 'if DAT_0064bcb2 != 10: cost = cost * DAT_0064bcb2 / 10',
      },
    },
    sourceAddr: '0x004c2788+line996',
  },

  cityCountScaling: {
    // Additional cost from number of cities (only if cityCount > 0x43=67)
    formula: 'local_1c = cost * 3 / 4',
    earlyGameReduction: {
      condition: 'techCount < 20 (0x14)',
      formula: 'local_1c = techCount * local_1c / 20',
    },
    finalCost: 'cost = cost + local_1c',
    cityCapThreshold: 0x43,  // 67 cities
    cityCapFormula: 'if numCities > 67: cost = cost * 67 / numCities',
    numCitiesAddr: '@ DAT_00655b1a',
    sourceAddr: '0x004c2788+line1004',
  },

  scenarioSpeedFlags: {
    // DAT_00655af0 bits 2 and 3 modify tech speed
    doubleSpeed: {
      flag: 0x04,    // bit 2
      formula: 'cost = cost * 5 / 4 (25% more expensive — SLOWER research despite name)',
      sourceAddr: '0x004c2788+line1014',
    },
    halfSpeed: {
      flag: 0x08,    // bit 3
      formula: 'cost = cost * 4 / 5 (20% cheaper — FASTER research despite name)',
      sourceAddr: '0x004c2788+line1017',
    },
  },

  humanMinimumCost: {
    // Human civs have a minimum tech cost floor
    condition: '(1 << civId) & DAT_00655b0b (is human)',
    formula: 'if cost < (11 - techCount): cost = 11 - techCount',
    minimumFloor: 'max(1, 11 - techCount)',
    sourceAddr: '0x004c2788+line1020',
  },

  finalCalculation: {
    formula: 'totalCost = cost * techCount',
    clamp: { min: 1, max: 32000 },
    sourceAddr: '0x004c2788+line1024',
  },
};

// ============================================================================
// === ESPIONAGE SYSTEM ===
// Binary ref: FUN_004c6bf5 @ block_004C0000.c (10469 bytes)
// ============================================================================

export const ESPIONAGE = {
  // Master espionage function. param_1 = spy unit index, param_2 = target city index.
  // Spy unit type = 0x2F (47), Diplomat unit type = 0x09

  spyUnitType: 0x2F,       // unit type for Spy
  diplomatUnitType: 0x09,  // unit type for Diplomat (no spy missions, only diplomat ones)

  missionTypes: {
    // 8 espionage missions (local_3ac values), selected from SPYOPTIONS dialog
    0: {
      name: 'Establish Embassy',
      embassyFlag: 0x80,    // treaty[target][spy_civ] |= 0x80
      soundId: 0x44,
      spySurvival: 'spy always survives (diplomat consumed if not spy)',
      sourceAddr: '0x004c6bf5+case0',
    },
    1: {
      name: 'Investigate City',
      cityFlag: 0x400000,   // city.flags |= 0x400000
      soundId: 0x44,
      sourceAddr: '0x004c6bf5+case1',
    },
    2: {
      name: 'Steal Technology',
      techSearch: {
        algorithm: 'random start (rand()%100), scan all 100 techs for one target has but spy civ lacks',
        maxTechs: 100,
        priorityTechs: ['DAT_0064c5a6', 'DAT_0064c5ae', 'DAT_0064c5b6', '0x20 (Navigation)'],
        note: 'Priority techs break the search early',
      },
      specificStealDialog: 'STEALSPECIFIC',
      hardStealDialog: 'STEALHARD',
      alreadyStolenFlag: 0x08,  // city.flags & 0x08 means already stolen from
      sourceAddr: '0x004c6bf5+case2',
    },
    3: {
      name: 'Sabotage (Industrial)',
      conditionFlags: 'city.flags & 0x08 must be 0 (no walls) OR spy is Spy type',
      sourceAddr: '0x004c6bf5+case3',
    },
    4: {
      name: 'Incite Revolt',
      condition: 'spy must be Spy type AND city.size > 1',
      sourceAddr: '0x004c6bf5+case4',
    },
    5: {
      name: 'Plant Nuclear Device',
      requirements: [
        'spy must be Spy type',
        'civ must have tech 0x49 (Industrialization)',
        'civ must have tech 0x3A (Nuclear Fission)',
        'Manhattan Project wonder (0x17) must exist (not == -1)',
      ],
      sourceAddr: '0x004c6bf5+case5',
    },
    6: {
      name: 'Poison Water Supply',
      condition: 'city must NOT have City Walls (building 1)',
      sourceAddr: '0x004c6bf5+case6',
    },
    7: {
      name: 'Subvert Unit / Sabotage (MP only)',
      condition: 'multiplayer (DAT_00655b02 > 2) AND target is human AND city has walls AND no prior counter-espionage (treaty & 1 == 0)',
      sourceAddr: '0x004c6bf5+case7',
    },
  },

  aiMissionSelection: {
    // When the acting civ is AI (not in DAT_00655b0b bitmask), missions are auto-selected
    defaultMission: 2,  // steal tech
    counterIntelOverride: {
      flag: 0x10,  // treaty[target][spy_civ] & 0x10 = counter-intelligence active
      chance: '1 in 3 (rand() % 3 == 0)',
      mission: 4,  // incite revolt
    },
    allianceOverride: {
      flag: 0x04,  // alliance treaty
      mission: 2,  // steal tech
    },
    cityRevoltOverride: {
      condition: 'difficulty > 3 OR (difficulty == 3 AND target city count > 5)',
      extraCondition: 'treaty & 0x2010 != 0 AND target government != Democracy(6)',
      mission: 6,  // poison water
    },
    wallsOverride: {
      condition: 'city has walls (building 1) AND spy is diplomat (not spy type) AND treaty & 0x0E != 0',
      mission: 0,  // establish embassy (fallback)
    },
    sourceAddr: '0x004c6bf5+line2249',
  },

  inciteRevoltCost: {
    // Binary ref: FUN_004c5fae @ block_004C0000.c
    // This is the separate spy survival + incite cost function
    maxCost: 0x3A99,  // 15001 gold — maximum incite revolt cost
    sourceAddr: '0x004c5fae',
  },

  spySurvival: {
    // Binary ref: FUN_004c5fae @ block_004C0000.c
    // Spy survival after mission — probability varies by mission and counter-espionage level
    counterEspionageTable: [5, 4, 3, 2, 1, 0],  // base survival odds by difficulty (higher = better)
    missionSurvivalModifier: [0, 0, 0, 0, 1, 2, 2, 3, 4],  // additional risk by mission type
    sourceAddr: '0x004c5fae',
  },

  civilWar: {
    // Binary ref: FUN_004c66ba @ block_004C0000.c (1339 bytes)
    // Triggered when incite revolt succeeds on a city
    unitTransferRadius: 2,   // units within distance 2 of city transfer to new civ
    cityRadiusTiles: 0x15,   // 21 tiles scanned for visibility update (city radius)
    visibilityUpdate: 'sets visibility bit (1 << newCivId) for all tiles in city radius',
    sourceAddr: '0x004c66ba',
  },
};

// ============================================================================
// === RESEARCH GOAL DIALOG ===
// Binary ref: FUN_004c0cf7 @ block_004C0000.c
// ============================================================================

export const RESEARCH_GOAL_DIALOG = {
  // 3-tab dialog for selecting research goals
  totalTechs: 100,        // 100 tech IDs scanned (0..99)
  totalAdvances: 0x3E,    // 62 unit types checked for unlockable advances
  totalImprovements: 0x43, // 67 building/wonder slots
  specialTech: 0x59,       // Future Tech — excluded from goal selection
  tabs: 3,                 // research / advance / improvement tabs
  sourceAddr: '0x004c0cf7',
};

// ============================================================================
// === UNIT MOVEMENT POINT FORMULAS ===
// Binary ref: FUN_005b29aa, FUN_005b29d7, FUN_005b2a39, FUN_005b2c3d
// @ block_005B0000.c
// ============================================================================

export const UNIT_MOVEMENT = {
  // --- Base movement points ---
  // @ FUN_005b29aa: return unit_types[unit.type * 0x14 + 0x0E]
  baseMP: {
    formula: 'unit_type_table[unit.type * 0x14].movePoints',
    note: 'Signed byte at offset 0x0E within 0x14-byte unit type record (DAT_0064B1C6)',
  },

  // --- Remaining movement points ---
  // @ FUN_005b29d7: if (gameFlags & 0x10 == 0) { damage = 0; } return max(0, baseMP - damage)
  remainingMP: {
    formula: 'max(0, baseMP - unit.hpLost)',
    simplifiedCombatFlag: 0x10,   // DAT_00655AE8 bit 4: if set, damage reduces movement
    note: 'In simplified combat, hpLost is zeroed so it does not reduce MP',
  },

  // --- Total movement with wonder bonuses (sea units) ---
  // @ FUN_005b2a39 (516 bytes)
  totalMP: {
    seaDomain: 2,                  // domain == 2 triggers wonder checks
    lighthouseWonderId: 0x3B,      // adds 1x MP_PER_TURN
    magellanWonderId: 0x0C,        // adds 2x MP_PER_TURN
    nuclearPowerWonderId: 3,       // adds 1x MP_PER_TURN if unit flag 0x20 NOT set
    nuclearPowerExcludeFlag: 0x20, // DAT_0064B1BC[type*0x14] & 0x20 → skip bonus
    mpPerTurnGlobal: 'DAT_0064BCC8',

    // Simplified combat fractional MP:
    // totalMP = (remainingMP * totalMP) / max(2, baseMP)
    // Rounded up to next MP_PER_TURN boundary, minimum depends on domain
    simplifiedCombatMinimum: {
      sea: 'MP_PER_TURN * 2',
      ground: 'MP_PER_TURN',
    },
  },

  // --- Movement remaining for current turn ---
  // @ FUN_005b2c3d: return max(0, totalMP - unit.moveSpent)
  currentMP: {
    formula: 'max(0, totalMP(unit) - unit.moveSpent)',
  },

  // sourceAddr: '0x005B29AA', '0x005B29D7', '0x005B2A39', '0x005B2C3D'
};

// ============================================================================
// === SHIP CARGO / LOADING MECHANICS ===
// Binary ref: FUN_005b542e @ block_005B0000.c (1912 bytes)
// ============================================================================

export const SHIP_CARGO = {
  // Two-pass loading system: pass 0 = air units, pass 1 = ground units
  passes: 2,
  airOnlyPasses: 1,              // carrier/invisible transports → air only
  airThenGround: 2,              // normal ships → air then ground

  // Cargo capacity from unit type field holdCapacity (offset 0x11 in type record)
  // Special override for settler-flag units (flagsA & 0x80), invisible transports
  // (flagsA & 0x08 without 0x80), or barbarian-owned ships: capacity = 0x14 (20)
  defaultOverrideCapacity: 0x14,

  // Loading criteria (ground pass):
  alreadyLoadedFlag: 0x1000,     // unit flags bit — skip if already loaded this cycle
  orderGoto: 3,                  // only load units with goto order targeting this ship

  // Limbo coordinates for units at sea:
  limboCoordShip: '(owner * 4 + 4) * -0x4B',  // ships sent to sea
  limboCoordUnit: '(owner * 4 + 4) * -0x19',  // individual units picked up
  limboCoordStack: '(owner * 5 + 5) * -0x28', // stack unloading

  // sourceAddr: '0x005B542E', '0x005B3B78', '0x005B319E'
};

// ============================================================================
// === NUCLEAR FALLOUT MECHANICS ===
// Binary ref: FUN_005b9179 @ block_005B0000.c (696 bytes)
// ============================================================================

export const NUCLEAR_FALLOUT = {
  // Affects 9 tiles (center + 8 neighbors) using direction tables + center entry
  AFFECTED_TILES: 9,

  // Per-tile effects (if valid, no city, not ocean):
  // 1. Remove fortress (bit 0x40) if present as standalone (not city fortress)
  // 2. Add pollution (bit 0x20) with 50% chance (rand & 1)
  // 3. Destroy irrigation (0x08) and mine (0x04) — if both set, only mine removed (50%)
  //    otherwise each removed independently at 50%
  // 4. Global pollution added with 2/3 chance (rand() % 3 != 0)
  // 5. Visibility updated for all 7 civs per affected tile

  pollutionBit: 0x20,
  irrigationBit: 0x08,
  mineBit: 0x04,
  fortressBit: 0x40,
  destroyChance: '50%',
  globalPollutionChance: '2/3',  // rand() % 3 != 0

  // City effects: population halved
  cityPopulationFormula: 'city.size -= city.size >> 1',

  // sourceAddr: '0x005B9179'
};

// ============================================================================
// === RESOURCE / HUT GENERATION FORMULAS ===
// Binary ref: FUN_005b8ee1 (resource), FUN_005b8ffa (hut) @ block_005B0000.c
// ============================================================================

export const RESOURCE_GENERATION = {
  // --- Resource placement ---
  // @ FUN_005b8ee1: pseudo-random from seed + coordinates
  // Preconditions: tile valid, no city bonus (bit 0x40 clear), terrain != desert (2)
  // Coordinate transform: s = (y + x) >> 1, d = x - s
  // Match: (s & 3) + (d & 3) * 4 == ((s >> 2) * 0x0B + (d >> 2) * 0x0D + seed) & 0x0F
  resource: {
    MULTIPLIER_S: 0x0B,
    MULTIPLIER_D: 0x0D,
    MATCH_MASK: 0x0F,
    // Bonus resource: bonusBit = 1 << ((seed >> 4) & 3)
    //   if (bonusBit & s) == (bonusBit & d) → special resource (type 2)
    bonusBitFormula: '1 << ((seed >> 4) & 3)',
  },

  // --- Hut placement ---
  // @ FUN_005b8ffa: same coordinate transform, different constants
  // Match: (s & 3) + (d & 3) * 4 == ((s >> 2) * 0x0B + (d >> 2) * 0x0D + seed + 8) & 0x1F
  hut: {
    OFFSET: 8,
    MATCH_MASK: 0x1F,            // wider mask = rarer placement
  },

  // --- Resource seed ---
  // @ FUN_005b85fe: seed = GetTickCount() & 0x7FFF; if (seed == 0) seed = 1
  SEED_ADDR: 'DAT_006D1168',
  SEED_MASK: 0x7FFF,
  SEED_MIN: 1,

  // sourceAddr: '0x005B8EE1', '0x005B8FFA', '0x005B85FE'
};

// ============================================================================
// === UNIT CREATION / INITIALIZATION ===
// Binary ref: FUN_005b3d06 @ block_005B0000.c (1675 bytes)
// ============================================================================

export const UNIT_CREATION = {
  // Slot allocation: scan for first empty slot (id == 0), expand if needed
  // Per-civ counters updated: military count (if role < 5), type count, total count
  militaryRoleCap: 5,
  SEQUENTIAL_ID_GLOBAL: 'DAT_00627FD8',

  fieldDefaults: {
    moveSpent: 0,
    hpLost: 0,
    shieldCost: 0x58,          // 88 — default shield charge
    statusFlags: 0,
    order: 0xFF,               // no order
    homeCity: 0xFF,            // no home city (resolved after placement)
    gotoTarget: 0xFF,
    prevStack: -1,             // 0xFFFF
    nextStack: -1,
    x: -1,                     // placed by put_down_unit
    y: -1,
    goToX: -1,
    goToY: -1,
  },

  // Network: message 0x3D for create request; 0xE10 tick timeout
  networkMessage: 0x3D,
  networkTimeout: 0xE10,       // 3600 ticks

  // sourceAddr: '0x005B3D06'
};

// ============================================================================
// === UNIT STACK VALIDATION ===
// Binary ref: FUN_005b2590 @ block_005B0000.c (1050 bytes)
// ============================================================================

export const UNIT_STACK_VALIDATION = {
  // 4-pass validation of doubly-linked stack:
  // Pass 1-2: walk prev/next chains, unlink dead units (id == 0)
  // Pass 3-4: walk prev/next chains, unlink crossed-location units (different x,y)
  infiniteStackThreshold: 0x7FF,  // >= 2047 units triggers recovery
  loadingBypass: 'DAT_006AD918',  // skip validation during load
  // sourceAddr: '0x005B2590'
};

// ============================================================================
// === UNIT STACK QUERY FUNCTIONS ===
// Binary ref: FUN_005b50ad @ block_005B0000.c (724 bytes)
// ============================================================================

export const UNIT_STACK_QUERIES = {
  // FUN_005b50ad(unitId, queryType): aggregate stats over unit stack
  queries: {
    0:  'sum of hitPoints',
    1:  'sum of defense',
    2:  'unit count (also 0xB)',
    3:  'sum of attack',
    4:  'airborne count (air with prev link)',
    5:  'sea unit count',
    6:  'cargo balance (+holdCapacity for ships, -1 for ground)',
    7:  'multi-range air count (range > 1)',
    8:  'paradrop-capable count (flagsB & 0x10)',
    9:  'settler count (flagsA & 0x80)',
    10: 'invisible count (flagsA & 0x08)',
    11: 'raw count (nextInStack only, no validation)',
  },
  MAX_ITERATION: 0x800,
  // sourceAddr: '0x005B50AD'
};

// ============================================================================
// === CITY CAPTURE MECHANICS ===
// Binary ref: FUN_0057b5df @ block_00570000.c (11,451 bytes)
// Also: FUN_00579c40 (pre-capture diplomacy), FUN_00579dbb (gold plunder),
//        FUN_0057a27a (tech stealing), FUN_0057a904 (civ schism)
// ============================================================================

export const CITY_CAPTURE = {
  // --- Pre-capture diplomacy (FUN_00579c40, 379 bytes) ---
  // Called before main capture if param_3 < 2 (non-nuke, non-special)
  preDiplomacy: {
    // Set treaty flags: break ceasefire/peace (0x60 = bits 5+6)
    breakTreatyMask: 0x60,       // thunk_FUN_00467750(attacker, defender, 0x60)
    // Set war flag (0x0C = bits 2+3)
    setWarMask: 0x0C,            // thunk_FUN_00467750(attacker, defender, 0x0C)
    // Break alliance with defender
    breakAllianceFlag: 0x2000,   // thunk_FUN_00467825(attacker, defender, 0x2000)
    // Attitude hit: -100 for both directions
    attitudeHit: 100,            // thunk_FUN_00467933(A,B,100); thunk_FUN_00467933(B,A,100)
    // Vendetta flag: set if neither side has 0x10 in treaty byte 2
    vendettaFlag: 0x1000,        // treaty[defender][attacker] |= 0x1000
    vendettaCheckMask: 0x10,     // DAT_0064c6c1 (treaty byte 1, bit 4 = 0x10 of uint)
    sourceAddr: '0x00579C40',
  },

  // --- Gold plunder (FUN_00579dbb, 277 bytes) ---
  goldPlunder: {
    // cityOwner = city[param_1 * 0x58].owner (DAT_0064f348)
    // citySize  = city[param_1 * 0x58].size  (DAT_0064f349)
    // treasury  = civ[owner * 0x594].treasury (DAT_0064c6a2)
    // totalPop  = civ[owner * 0x594].totalPop (DAT_0064c70c, short)
    //
    // if (treasury < 32000 / citySize):
    //   gold = (citySize * treasury) / (totalPop + 1)
    // else:
    //   gold = (treasury / (totalPop + 1)) * citySize
    // if (gold < 0): gold = 32000  // overflow protection
    formula: '(citySize * treasury) / (totalPop + 1)',
    overflowThreshold: 32000,    // if treasury >= 32000/citySize, reorder multiply
    overflowCap: 32000,          // negative result capped at 32000
    cityRecordStride: 0x58,
    ownerOffset: 'DAT_0064f348', // city+0x00 owner
    sizeOffset: 'DAT_0064f349',  // city+0x01 size
    treasuryAddr: 'DAT_0064c6a2',
    totalPopAddr: 'DAT_0064c70c',
    sourceAddr: '0x00579DBB',
  },

  // --- War declaration dialog (FUN_00579ed0, 933 bytes) ---
  warDeclaration: {
    // Checks treaty state to pick correct dialog key
    dialogKeys: {
      atWar: 'ANNOYALLIED',         // already at war (treaty & 8)
      ceasefire: 'ANNOYPEACE',       // ceasefire active (treaty & 4)
      ceasefireBroken: 'ANNOYCEASE', // broken ceasefire (treaty & 2), no vassal
      vassal: 'ANNOYVASSAL',         // broken ceasefire + vassal (treaty byte 2 & 4)
      noTreaty: 'ANNOY',             // no treaties
    },
    // Senate override mechanics (government > 4 = Republic/Democracy)
    senateGovernmentThreshold: 4,    // if govt > 4, senate may block
    senateDialogKeys: {
      overrule: 'OVERRULE',
      allowUN: 'ALLOWUN',            // UN active (wonder 0x18)
      allowAggressor: 'ALLOWAGGRESSOR',
      allowHawks: 'ALLOWHAWKS',
    },
    // Government council address table: DAT_00646878, stride 0x3C per government
    councilTableAddr: 'DAT_00646878',
    councilTableStride: 0x3C,
    sourceAddr: '0x00579ED0',
  },

  // --- Tech stealing (FUN_0057a27a, 999 bytes) ---
  techStealing: {
    totalTechs: 100,                 // scan IDs 0..99
    dialogKey: 'TAKECIV',
    // Scenario restriction: (DAT_00655af0 & 0x80) && (DAT_0064bc60 & 0x10) can block
    scenarioFlagMask: 0x80,          // game flags bit 7
    scenarioTechBlockBit: 0x10,      // scenario bits: tech stealing blocked
    // Stack size for tech list: 0x4000 bytes
    stackAlloc: 0x4000,
    sourceAddr: '0x0057A27A',
  },

  // --- Civ schism / civil war (FUN_0057a904, 3291 bytes) ---
  civSchism: {
    // Precondition: FUN_004fc20d(parentCiv) != 0 (enough cities for split)
    // Find empty civ slot: iterate 1..7, look for unitCount==0 AND cityCount==0
    maxCivSlots: 8,                  // slots 0-7, search starts at 1
    civUnitCountAddr: 'DAT_0064c706',
    civCityCountAddr: 'DAT_0064c708',

    // Resource splitting
    treasurySplit: 2,                // child gets parent.treasury / 2
    militaryPowerSplit: 2,           // child gets parent.militaryPower >> 1
    governmentCopied: true,          // child.govt = parent.govt (DAT_0064c6b5)
    techCountCopied: true,           // child.techCount = parent.techCount (DAT_0064c6b0)
    techFlagsCopied: true,           // 13 bytes of tech flags (DAT_0064c6f8, 0..0xC)
    techFlagCount: 13,               // for (i=0; i<0xD; i++) copy

    // Contact turns initialized to currentTurn - 8
    contactTurnOffset: -8,           // DAT_0064ca82[*] = DAT_00655af8 - 8

    // Treaty between parent and child
    childToParentTreaty: 0x2001,     // CONTACT + ALLIANCE
    parentToChildTreaty: 0x82801,    // CONTACT + WAR_STARTED(0x800) + ALLIANCE(0x2000) + 0x80000

    // Continent-based city assignment with 64 continents max
    maxContinents: 64,               // aiStack_13c[64]
    // Capital continent = local_154, capital city identified by FUN_0043d20a(city, 1)
    // Cities split based on continent population comparison:
    //   if capitalPop < otherPop * 2 AND otherPop <= capitalPop → continent-based split
    //   else → distance-based split (farthest cities first, up to totalPop/3)
    distanceSplitRatio: 3,           // while (transferred * 3 < totalPop)

    // Unit transfer: units follow their home city's new owner
    // Visibility: copy parent's visibility bits to child for all tiles
    // Network: MP event 0x16 (CITYCAPTURE) and opcode 0x74 sent after schism
    mpEventSchism: 0x16,
    networkOpcode: 0x74,

    dialogKey: 'SCHISM',
    sourceAddr: '0x0057A904',
  },

  // --- Main capture function (FUN_0057b5df) constants ---
  mainCapture: {
    stackAlloc: 0x4000,
    cityRecordStride: 0x58,
    civRecordStride: 0x594,
    unitRecordStride: 0x20,

    // Capital escape attempt
    capitalEscape: {
      // Triggered if: AI attacker, captured city is capital, > 4 cities
      minCitiesForCapitalCheck: 4,   // *(short*)(DAT_0064c708 + owner*0x594) > 4
      // New capital selected from same-owner cities: size >= capturedSize/2, size > 7
      minSizeForCapital: 7,          // 0x07 < citySize
      minSizeRatio: 2,               // capturedSize / 2 <= candidateSize
      // Score = citySize*3 - distance + stackCount*4
      sizeMultiplier: 3,
      distancePenalty: 1,
      stackMultiplier: 4,
      // Bonuses: palace wonder (0x1B) → *3/2, city walls (8) or Great Wall (6) → *2
      palaceWonderId: 0x1B,
      palaceBonus: '3/2',            // local_14 = (local_14 * 3) / 2
      cityWallsBuildingId: 8,
      greatWallWonderId: 6,
      wallsBonus: 2,                 // local_14 <<= 1
      // Coastal bonus: if same continent → /2 penalty for diff continent
      coastalWonderId: 0x11,         // Coastal Fortress? bonus *3
      coastalBonus: 3,
      continentPenalty: 2,           // diff continent → /2

      // Human capital escape: ask with 'CANESCAPE' dialog, cost 1000 gold
      escapeCost: 1000,
      escapeDialog: 'CANESCAPE',
      escapeAnimDialog: 'ESCAPE',
      // AI auto-escape: difficulty > 2 AND (spaceship OR cities > 11 OR treasury > 1999)
      aiDifficultyThreshold: 2,
      aiCityThreshold: 11,           // 0x0B
      aiTreasuryThreshold: 1999,
      // MP timeout: 0xE10 (3600) ticks for response
      mpTimeout: 0xE10,
      // MP events: 0x17 CITYCAPTUREDBY, 0x18 CAPITALCAPTURE
      mpEventCaptured: 0x17,
      mpEventCapitalEscape: 0x18,

      // AI sets unit order to goto captured city with priority 99
      aiGotoPriority: 99,
    },

    // Wonder capture display
    wonderCapture: {
      totalWonders: 0x1C,            // 28 wonders (loop 0..0x1B)
      wonderCityOffset: 0x27,        // wonder ID + 0x27 = improvement slot
      // Wonders that DON'T show normal capture text: 7..19 skip, except 0x13, 0x14, >0x16
      normalCaptureExclusions: 'local_8c < 7 || local_8c == 0x13 || local_8c == 0x14 || 0x16 < local_8c',
      // Special: wonder 0x14 (Marco Polo) triggers embassy update
      marcoPoloWonderId: 0x14,
      // Sprite ID for wonder header: 0xF3
      wonderHeaderSpriteId: 0xF3,
      dialogKeys: {
        captureLost: 'LOSTWONDER',
        captureWon: 'CAPTUREWONDER',
        abandoned: 'ABANDONWONDER',
        stillBuilding: 'STILLWONDER',
      },
      // MP events: 0x14 WONDERCAPTURED, 0x4B/0x4C wonder-related
      mpEventWonderCaptured: 0x14,
      mpEventWonderA: 0x4B,
      mpEventWonderB: 0x4C,
      // Wonder announcement: 0x1A
      mpEventWonderAnnounce: 0x1A,
    },

    // Gold transfer (uses FUN_0057_9dbb result)
    goldTransfer: {
      // local_74 = gold from FUN_00579dbb
      // Clamped by FUN_005adfa0(gold, 0, defenderTreasury)
      // Subtracted from defender, added to attacker
    },

    // City flags/production reset on capture
    cityReset: {
      productionCleared: true,       // DAT_0064f35c = 0 (city shields)
      flagsMask: 0xFFFFFFc4,         // city.flags &= 0xC4 (keep bits 2, 6, 7)
      // Building count decremented for previous owner
    },

    // Building destruction (param_3 == 0 and not own city)
    buildingDestruction: {
      // Random destruction of buildings via mask 0xAA
      // Applied to 5 bytes of building bitfield at city+0x34 (offsets 0..4)
      buildingBytesStart: 'DAT_0064f374',  // city + 0x2C relative to record
      buildingByteCount: 5,
      destructionMask: 0xAA,         // 10101010 binary — targets even-numbered buildings
      // Shift amount: rand() & 1 (0 or 1), determines which half of AA gets cleared
      randomShiftBits: 1,            // (abs(rand()) & 1) used as shift amount
    },

    // Population loss mechanics
    populationLoss: {
      // City size reduced by 1 unless:
      //   - size < 2 AND complex conditions about human/AI, barb, visibility
      // Small city (size < 2) may be destroyed entirely
      minSizeForSurvival: 2,
      // If city survives at size 0, call delete_city
    },

    // Tile visibility update after capture
    visibilityUpdate: {
      tilesScanned: 0x15,            // 21 tiles (city radius)
      directionTableAddr: 'DAT_00628370', // x offsets
      directionTableAddr2: 'DAT_006283a0', // y offsets
    },

    // Defender unit disbanding
    unitDisband: {
      // Units homed to captured city (home_city == param_1) and owned by defender
      // Diplomats (type 9) have home city set to 0xFF instead of disbanded
      diplomatTypeId: 9,
      noHomeCityValue: 0xFF,
      // Non-combat air units in city → try re-home to nearby city
      // Otherwise: disband via FUN_005b6042
      cityFlagOnDisband: 0x20,       // city.flags |= 0x20 when unit disbanded from city
    },

    // City production assignment for human capture
    humanCapture: {
      // If human captures: set city.we_love flag, trigger disorder check
      setWeLoveFlag: true,           // DAT_0062edf8 = 1
      // Choose best producible unit for city defense
      bestDefenderScan: 0x3E,        // scan unit types 0..0x3E (62) in reverse
    },

    // Partisan generation
    partisans: {
      // Triggered after kill_civ check, if:
      //   defender govt is Communist (3) or Democracy (6)
      //   OR DAT_00655b40 != 0 (scenario override)
      //   OR defender has tech 0x0F (Guerrilla Warfare)
      governmentCommunism: 3,
      governmentDemocracy: 6,
      scenarioPartisanFlag: 'DAT_00655b40',
      guerrillaWarfareTechId: 0x0F,

      // Partisan count formula:
      //   govtDiff = abs(defender.govt - attacker.govt)
      //   ageDiff  = abs(defender.powerRank - attacker.powerRank)
      //   count = ((citySize + 5) / 8 * (govtDiff + ageDiff + 1)) / 2
      //   if (param_3 != 0): count /= 2  (e.g., bribe/subvert)
      formula: '((citySize + 5) / 8 * (govtDiff + ageDiff + 1)) / 2',
      halvingDivisor: 8,             // (size+5)/8 uses arithmetic shift right 3
      subvertHalving: true,          // param_3 != 0 → count /= 2

      // Tech prerequisites for partisans to appear:
      //   Must have tech 0x11 (Communism) — if not, count -= 1
      //   Must have tech 0x22 (Guerrilla Warfare) — if not, need 0x0F AND 0x23
      //   If attacker also has 0x22: count += 1; else: count *= 2
      techCommunism: 0x11,
      techGuerrillaWarfare: 0x22,
      techGunpowder: 0x0F,
      techCombinedArms: 0x23,

      // Partisan unit type: 9 (Partisan)
      unitType: 9,                   // FUN_005b3d06(9, ...)
      initialOrder: 2,               // order = fortify (0x02)

      // Veteran chance: random based on defender tolerance and trespass flag
      //   iVar6 = ((treaty[def][atk] & 0x10) == 0 ? 0 : 2) + (defender.tolerance - 4)
      //   if iVar6 < 1: iVar6 = 0
      //   veteranChance = rand() % (iVar6 + 1)
      veteranFlag: 0x2000,
      trespassFlag: 0x10,
      toleranceBase: 4,              // tolerance - 4

      // Placement: scan 20 tiles (DAT_00628370/DAT_006283a0) around city
      //   Pick tile with best terrain defense * 2, +1 for road, +1 for railroad, *2 for fortress
      placementTiles: 0x14,          // 20 tiles
      terrainDefenseMultiplier: 2,
      roadBonus: 1,
      railroadBonus: 1,              // improvement & 0x10
      fortressMultiplier: 2,         // (bVar3 & 0x42) == 0x40

      // Sound effect: 0x22 for first partisan
      soundEffect: 0x22,
      dialogKey: 'PARTISANS',

      // MP event: 0x1F PARTISANS, sound 0x7A PLAY_SOUND
      mpEventPartisans: 0x1F,
      mpSoundOpcode: 0x7A,

      sourceAddr: '0x0057B5DF (lines ~5103-5243)',
    },

    // Capture notification treaty flag
    captureNotifyFlag: 0x10000,      // thunk_FUN_00467825(attacker, defender, 0x10000)
    // Multiple captures vendetta: 0x400000 flag
    multiCaptureVendettaFlag: 0x400000,  // set when even number of captured units > 1

    // Condition for vendetta: democracy (govt 6) + highest power rank (7)
    //   OR attacker power rank > defender power rank
    vendettaDemocracyGovt: 6,
    vendettaMaxPowerRank: 7,         // powerRanking[param_2] == 7

    // Trespass flag on large AI city capture (size > 14)
    aiLargeCitySizeThreshold: 14,    // 0x0E: city size > 14 triggers trespass
    trespassFlag: 0x10,

    // War started flag
    warStartedFlag: 0x800,           // thunk_FUN_00467750(attacker, defender, 0x800)

    // Republic/Democracy senate flag on capture
    senateGovernmentThreshold: 4,    // govt > 4 (Republic=5, Democracy=6)
    senateFlagOnCapture: 0x01,       // city.flags |= 1

    // Network opcodes used during capture
    networkOpcodes: {
      CITY_RENAME: 0x89,
      CITY_REFRESH: 0x8A,
      DRAW_VISIBILITY: 0x71,
      DRAW_TILE: 0x72,
      ATTACK_ANIM: 0x78,
      PLAY_SOUND: 0x7A,
      DRAW_EFFECT_B: 0x7D,
    },

    // MP events during capture
    mpEvents: {
      WONDERCAPTURED: 0x14,
      CITYCAPTURE: 0x16,
      CITYCAPTUREDBY: 0x17,
      CAPITALCAPTURE: 0x18,
      FIRSTCONTACT: 0x1B,
      CITYWINALLY: 0x1C,
      CITYLOSEALLY: 0x1D,
      CITYCAPTURE2: 0x1E,
      PARTISANS: 0x1F,
      PROMOTED: 0x20,
    },

    // Dialog keys used in capture flow
    dialogKeys: {
      CITYCAPTURE: 'CITYCAPTURE',
      CITYCAPTURE2: 'CITYCAPTURE2',
      CITYWINALLY: 'CITYWINALLY',
      CITYLOSEALLY: 'CITYLOSEALLY',
      PARTISANS: 'PARTISANS',
    },

    // City capture sound effects
    flushBufferTimeout: 5000,        // XD_FlushSendBuffer(5000)

    // Post-capture: record capturedBy and capturedTurn
    capturedByOffset: 'DAT_0064f34a', // city + 0x02 (byte)
    capturedTurnOffset: 'DAT_0064f34b', // city + 0x03 (byte)

    // Marco Polo wonder (0x0E) triggers embassy discovery
    marcoPoloId: 0x0E,

    sourceAddr: '0x0057B5DF',
  },
};

// ============================================================================
// === COMBAT: FIREPOWER CALCULATION ===
// Binary ref: FUN_0057e2c3 @ block_00570000.c (119 bytes)
// ============================================================================

export const COMBAT_FIREPOWER = {
  // Firepower = base_attack * 8, with veteran and fortify bonuses
  // base_attack = DAT_0064b1c4[unitType * 0x14] (signed byte, attack stat)
  unitTypeStride: 0x14,
  attackStatOffset: 'DAT_0064b1c4',   // offset within unit type record
  baseMultiplier: 8,                   // firepower = attack * 8

  // Veteran bonus: +50% (firepower += firepower >> 1)
  veteranFlag: 0x2000,                 // unit.statusFlags & 0x2000
  veteranBonus: '50%',                 // fp += fp >> 1

  // Fortified bonus: +50% (firepower += firepower >> 1)
  fortifiedFlag: 0x10,                 // unit.statusFlags & 0x10
  fortifiedBonus: '50%',              // fp += fp >> 1

  sourceAddr: '0x0057E2C3',
};

// ============================================================================
// === COMBAT: DEFENSE STRENGTH ===
// Binary ref: FUN_0057e33a @ block_00570000.c (931 bytes)
// ============================================================================

export const COMBAT_DEFENSE = {
  // Defense = (terrain_bonus + base_defense) * defense_stat * 4
  // Then multiplied by position multiplier (DAT_006acb34)
  unitTypeStride: 0x14,
  defenseStatOffset: 'DAT_0064b1c5',   // defense stat in unit type record
  terrainDefenseAddr: 'DAT_00627cc9',   // terrain defense table, stride 0x18
  terrainStride: 0x18,

  // Base formula: ((river_bonus + terrain_defense) * defense * 4)
  //   river_bonus = top bit of tile byte (>> 7)
  baseMultiplier: 4,

  // Position multiplier (DAT_006acb34):
  defenseMultiplierAddr: 'DAT_006acb34',
  multiplierValues: {
    DEFAULT: 2,                        // open field, or sea domain units
    NON_COMBAT_IN_CITY: 3,            // order == 2 (fortify) AND unit role == 0 (non-combat)
    FORTRESS: 4,                       // tile has fortress (0x40) without city bit (0x02)
    CITY_WALLS: 6,                     // city with walls (building 8) or Great Wall (wonder 6)
  },

  // Fortress detection: tile_improvements & 0x42 == 0x40 (fortress without city)
  fortressMask: 0x42,
  fortressValue: 0x40,

  // City walls / Great Wall: only for ground units (role == 0)
  cityWallsBuildingId: 8,
  greatWallWonderId: 6,

  // Attacker flag modifiers for city wall multiplier:
  //   If attacker is sea unit (role==1) with flag 0x10, and defender is also sea with flag 0x10:
  //     Both have 0x10 → multiply by 2 (<<1)
  //     Attacker has 0x10, defender doesn't → multiply by 4 (<<2)
  seaUnitWallModifier: {
    bothHaveFlag: 'DAT_006acb34 <<= 1',
    onlyAttackerFlag: 'DAT_006acb34 <<= 2',
  },

  // Multiplier application: if multiplier != 2: defense = defense * multiplier >> 1
  //   (effectively: defense * multiplier / 2)
  //   if multiplier == 2: no change (2/2 = 1x)

  // Sea domain units in city always get multiplier = 2 (no terrain bonus from city)
  seaDomainOverride: 2,

  // Veteran bonus applied AFTER position: +50%
  veteranFlag: 0x2000,
  veteranBonus: '50%',

  sourceAddr: '0x0057E33A',
};

// ============================================================================
// === COMBAT: BEST DEFENDER SELECTION ===
// Binary ref: FUN_0057e6e2 @ block_00570000.c (786 bytes)
// ============================================================================

export const COMBAT_BEST_DEFENDER = {
  // Iterates all units in defender stack, picks highest effective defense
  // Skips ocean terrain (terrain==10) unless unit is sea domain (role != 0)
  oceanTerrainId: 10,

  // Simplified combat: defense scaled by remaining/base MP
  simplifiedCombatFlag: 0x10,          // DAT_00655ae8 & 0x10
  simplifiedFormula: '(remainingMP * defense) / baseMP',

  // Unit type modifiers (from flagsB = DAT_0064b1bd):
  modifiers: {
    // flagsB & 0x04: +1 defense (e.g., pikeman bonus)
    pikeBonusFlag: 0x04,
    pikeBonus: 1,

    // flagsB & 0x20: anti-air/anti-sea bonus
    antiFlag: 0x20,
    antiVsUnknown: 1,                  // if attacker == -1 (unknown): +1
    antiVsSea: {
      // if attacker is sea (role==1) and attacker has flag 0x10: *5
      // if attacker is sea (role==1) and no flag 0x10: *3
      withFlag: 5,
      withoutFlag: 3,
    },

    // flagsA & 0x10: submarine/stealth bonus vs sea
    subFlag: 0x10,                     // DAT_0064b1bc
    subVsSea: 2,                       // defense <<= 1 (double)

    // Air units (role==2) in city with no SAM (wonder 0x1B):
    airInCity: {
      cityRequired: true,              // DAT_006acb08 >= 0
      samWonderId: 0x1B,
      vsUnknown: '/ 2',               // attacker == -1: halved
      vsSea: '*2',                     // attacker is sea + no SAM: doubled
      default: '/ 2',                  // everything else: halved
    },
  },

  sourceAddr: '0x0057E6E2',
};

// ============================================================================
// === COMBAT: VETERAN PROMOTION ===
// Binary ref: FUN_0057ebfd @ block_00570000.c (322 bytes)
// ============================================================================

export const COMBAT_VETERAN_PROMOTION = {
  // Promote if: not already veteran AND unit type allows veteran
  veteranFlag: 0x2000,                 // status flag bit 13
  noVeteranTypeFlag: 0x10,             // DAT_0064b1bd[type*0x14] & 0x10 = can't be veteran

  // Promotion sets flag: statusFlags |= 0x2000
  // Shows 'PROMOTED' dialog if human player
  dialogKey: 'PROMOTED',

  // MP event: 0x20
  mpEvent: 0x20,

  sourceAddr: '0x0057EBFD',
};

// ============================================================================
// === COMBAT: KILL RESULT / ANIMATION ===
// Binary ref: FUN_0057e9f9 (411 bytes), FUN_0057eb94 (105 bytes)
// @ block_00570000.c
// ============================================================================

export const COMBAT_RESULT = {
  // Per-civ kill counter: DAT_0064c7b6[owner*0x594 + unitType]
  //   Incremented on each kill (capped at 255, -1 means max)
  killCounterAddr: 'DAT_0064c7b6',
  killCounterMax: 255,                 // != -1 check before increment

  // Animation: calls FUN_0059c575 for local player
  //   For MP remote: sends opcode 100 (0x64) with combat params
  animationOpcode: 100,

  // Round counter: DAT_006acb0c, incremented each kill
  roundCounterAddr: 'DAT_006acb0c',

  // FUN_0057eb94: resets round counter to 0, iterates all units in stack
  //   Calls FUN_0057e9f9 for each unit (mass kill on stack wipe)
  batchKillResetCounter: true,

  // Multiplayer game recording: FUN_004fbd9d if DAT_00627670 != 0
  gameRecordingFlag: 'DAT_00627670',

  sourceAddr: '0x0057E9F9',
};

// ============================================================================
// === COMBAT: BATTLE ANIMATION ===
// Binary ref: FUN_0057ed3f @ block_00570000.c (2281 bytes)
// ============================================================================

export const COMBAT_ANIMATION = {
  // 8 animation frames, 8 viewports (one per civ)
  frameCount: 8,
  viewportCount: 8,

  // Sprite IDs for battle animation
  spriteIds: {
    battleFlash: 0x20,               // thunk_FUN_0047dfb0(0x20) — attack flash sprite
  },

  // Frame timing: 0x40 (64ms) per frame
  frameDelayMs: 0x40,                // (local_33c - local_384) < 0x40

  // Post-animation delay: 10 ticks
  postAnimDelay: 10,                 // thunk_FUN_0046e287(10)

  // Animation state flag: DAT_006ad908 = 1 during animation, 0 after
  animStateAddr: 'DAT_006ad908',
  // MP cancel flag: DAT_006c926c
  mpCancelAddr: 'DAT_006c926c',

  // Viewport stride: 0x3F0 per civ
  viewportStride: 0x3F0,
  viewportBase: 'DAT_0066c7a8',

  sourceAddr: '0x0057ED3F',
};

// ============================================================================
// === NUCLEAR ATTACK ===
// Binary ref: FUN_0057f9e3 @ block_00570000.c (1236 bytes)
// ============================================================================

export const NUCLEAR_ATTACK = {
  // Pre-attack: check for SDI (city with tech 0x11 within range 4)
  sdiCheck: {
    range: 4,                          // FUN_005ae1b0(...) < 4
    sdiTechId: 0x11,                   // FUN_0043d20a(city, 0x11)
    dialogKey: 'USEWEAPONS',
    dialogSpriteA: 0x3E,
    dialogSpriteB: 8,
  },

  // If SDI intercepts: show dialog 0x29 (MP) or local text
  mpEventNukeWarning: 0x29,
  mpEventNukeIntercept: 0x2A,

  // Treaty impact on all neighbors (9 tiles around target)
  neighborTiles: 9,                    // loop 0..8 using DAT_00628350/DAT_00628360
  treatyFlags: {
    victimToAttacker: 0x110,           // treaty[victim][attacker] |= 0x110 (WAR+TRESPASS_BIT8)
    attackerToVictim: 0x20000,         // treaty[attacker][victim] |= 0x20000
  },
  attitudeHit: 100,                    // FUN_00456f20(victim, attacker, 100)

  // Kill all units on affected tiles
  // Then apply nuclear fallout (FUN_005b9179)

  // Network: opcode 0x7D (DRAW_EFFECT_B) for mushroom cloud
  networkOpcode: 0x7D,

  // Nuke animation: FUN_0057f657 (885 bytes)
  nukeAnimation: {
    spriteId: 0x5B,                    // mushroom cloud sprite
    spriteHeight: 0x48,
    preDelay: 0x157C,                  // 5500ms delay before explosion if flag set
    preDelayFlag: 0x10,                // DAT_00655aea & 0x10
    animFrames: 0x0B,                  // 11 frames
    frameDelayMs: 100,                 // (local_2c - local_3c) < 100
    drawModeAddr: 'DAT_0066c7a8',
    viewRedraw: 0x32,                  // FUN_0046e020(0x32, ...)
  },

  sourceAddr: '0x0057F9E3',
};

// ============================================================================
// === NUCLEAR RESPONSE / RETALIATION ===
// Binary ref: FUN_0057febc @ block_00570000.c (1084 bytes)
// ============================================================================

export const NUCLEAR_RESPONSE = {
  // Two phases:
  // Phase 1: Search for interceptor missile (own units with flagsB & 1, in city)
  interceptor: {
    flagsB: 0x01,                      // DAT_0064b1bd[type*0x14] & 1 — missile unit
    mustBeInCity: true,                // FUN_005b8ca6 >= 0
    // Additional checks: not fortified (order==0 or statusFlags & 0x100),
    //   not asleep (statusFlags & 0x10 == 0)
    allowSleepFlag: 0x100,             // statusFlags & 0x100 bypasses order check
    blockFortifyFlag: 0x10,            // statusFlags & 0x10 blocks response
    // Range check: FUN_005ae1b0 <= DAT_0064bcdb (configurable max range)
    maxRangeAddr: 'DAT_0064bcdb',
  },

  // Phase 2: Rally nearby units to nuke site
  rally: {
    maxDistance: 7,                     // FUN_005ae1b0(...) < 7
    // Eligible: same owner OR at war with nuker AND not human AND ground (role==0)
    //   AND has attack > 0, AND has movement remaining, AND on same continent
    groundDomainOnly: true,            // DAT_0064b1c1[type*0x14] == 0
    mustHaveAttack: true,              // DAT_0064b1c4[type*0x14] != 0
    mustHaveMovement: true,            // FUN_005b2c3d(unit) != 0
    sameContinentRequired: true,       // FUN_005b8a81(unit) == FUN_005b8a81(target)

    // Set unit goto to nuke site
    gotoOrder: 0x0B,                   // unit.order = 0x0B (goto)
    gotoCounter: 0x4B,                 // unit.counter = 0x4B (75)
    // Also sets goto target coordinates

    // Path check: FUN_004abfe5 must return > 0 and != 8
    pathBlockedResult: 8,
    movementMultiplier: 2,             // pass currentMP * 2 to pathfinder
  },

  sourceAddr: '0x0057FEBC',
};

// ============================================================================
// === CITY CALCULATION PIPELINE ===
// Binary ref: block_004E0000.c — complete city processing sequence
// Called from FUN_004f0a9c (city turn processing, 1903 bytes)
// ============================================================================

export const CITY_CALC_PIPELINE = {
  // Record strides used throughout city calculation
  CITY_STRIDE: 0x58,          // 88 bytes per city record (DAT_0064F340 base)
  UNIT_STRIDE: 0x20,          // 32 bytes per unit record (DAT_006560F0 base)
  UNIT_TYPE_STRIDE: 0x14,     // 20 bytes per unit type (DAT_0064B1B8 base)
  CIV_STRIDE: 0x594,          // 1428 bytes per civ record (DAT_0064C6A0 base)

  // City record field offsets (relative to city base DAT_0064F340)
  cityFields: {
    x:              0x00,     // int16  — DAT_0064F340
    y:              0x02,     // int16  — DAT_0064F342
    statusFlags:    0x04,     // uint32 — DAT_0064F344 (bits: 0x01=disorder, 0x02=WLtKD, 0x4000=rapture)
    owner:          0x08,     // int8   — DAT_0064F348
    size:           0x09,     // int8   — DAT_0064F349
    foundedBy:      0x0A,     // byte   — DAT_0064F34A (original founder civ)
    turnAge:        0x0B,     // byte   — DAT_0064F34B (turn counter, used for age checks)
    workerTileBits: 0x16,     // uint32 — DAT_0064F356 (2 bits per tile, 16 tiles)
    foodStored:     0x1A,     // int16  — DAT_0064F35A (negative = starvation countdown)
    shieldStored:   0x1C,     // int16  — DAT_0064F35C
    buildingBits:   0x30,     // uint32 — DAT_0064F370 (bits 0..25 = building flags, bits 26..31 = specialist count)
    attitude:       0x39,     // int8   — DAT_0064F379 (signed, -0x26 = capitulation)
    goldPerTurn:    0x4A,     // int16  — DAT_0064F38A
    sciencePerTurn: 0x4C,     // int16  — DAT_0064F38C
    tradeArrows:    0x4E,     // int16  — DAT_0064F38E
    population:     0x54,     // uint32 — DAT_0064F394 (0 = destroyed/empty slot)
  },

  // Processing order (FUN_004f0a9c):
  // 1. FUN_004eb4ed — first pass: tile analysis, worker assignment, yields
  // 2. FUN_004ec3fe — production processing
  // 3. FUN_004eef23 — unit disbanding (excess support)
  // 4. FUN_004eb4ed — second pass: recalculate with DAT_0062edfc=1, DAT_0062edf8=1
  // 5. FUN_004ef578 — disorder/WLtKD check
  // 6. FUN_004efbc6 — science doubling (Chieftain/AI)
  // 7. FUN_004efd44 — pollution and nuclear meltdown
  // 8. FUN_004f0221 — building maintenance
  // 9. FUN_004f080d — settler/worker auto-improvement
  sourceAddr: '0x004F0A9C',
};

// ============================================================================
// === WORKER TILE MANAGEMENT ===
// Binary ref: FUN_004e7549, FUN_004e75a6, FUN_004e75ea @ block_004E0000.c
// ============================================================================

export const WORKER_TILE_MANAGEMENT = {
  // 2-bit status per tile stored in city.buildingBits (offset 0x30 = DAT_0064F370)
  // Lower 26 bits: 2 bits x 13 tiles (tiles 0..12, center is tile 0x14=20)
  // Upper 6 bits (bits 26..31): specialist count encoded as (count * 0x4000000)
  tileCount: 0x10,            // 16 tiles checked in loops (indices 0..15)
  bitsPerTile: 2,
  tileStatusValues: {
    0: 'unworked',
    1: 'worked (auto-assigned)',
    2: 'taxman specialist',
    3: 'scientist specialist',
  },

  // FUN_004e7549: set tile status — shift = tileIndex * 2, mask = 3 << shift
  // FUN_004e75a6: get tile status — (word >> (tileIndex * 2)) & 3; index >= 0x10 returns 1
  // FUN_004e75ea: count tiles with given status — loop 0..0x10

  centerTileIndex: 0x14,      // 20 — the city center tile
  centerTileBitInBuildingWord: 0x100000, // bit 20 in the building/worker bitmask
  specialistShift: 26,        // bits 26..31 = specialist count
  specialistIncrement: 0x4000000,  // 1 << 26 = value per specialist

  sourceAddr: '0x004E7549',
};

// ============================================================================
// === SURROUNDING TILE ANALYSIS ===
// Binary ref: FUN_004e7641 @ block_004E0000.c (653 bytes)
// ============================================================================

export const SURROUNDING_TILE_ANALYSIS = {
  // Scans 25 tiles around city (indices 0..0x18 = 0..24)
  totalTilesScanned: 0x19,    // 25 tiles (city radius + extended)
  cityRadiusTiles: 0x15,      // 21 tiles = workable city radius (indices 0..20)

  // Direction offset tables for tile scanning
  DX_TABLE: 'DAT_00628370',
  DY_TABLE: 'DAT_006283A0',

  // Per-tile flags stored in DAT_006A6530 array (1 byte per tile)
  tileFlags: {
    0x01: 'invalid / off-map / not visible to city owner',
    0x04: 'enemy unit present (military, not settler-flag)',
    0x08: 'foreign city present on tile',
    0x10: 'tile claimed by nearby rival city (within distance 3)',
    0x20: 'enemy unit belongs to civ at war',
  },

  humanPollutionCounter: 'DAT_00655B10',
  unitOwnerOffset: 0x07,
  unitAttackOffset: 0x0C,
  allianceFlag: 0x08,

  sourceAddr: '0x004E7641',
};

// ============================================================================
// === GARRISON AND NEAREST CITY PROXIMITY ===
// Binary ref: FUN_004e7967 @ block_004E0000.c (1048 bytes)
// ============================================================================

export const GARRISON_PROXIMITY = {
  defaultDistance: 0x20,      // 32 — if city has no garrison
  noGarrisonValue: 0,

  nearCityThreshold: 6,
  tileClaimRadius: 3,
  tileClaimFlag: 0x10,

  tradeCapabilityAddr: 'DAT_006A6574',
  superhighwaysBuildingId: 0x43,
  harborCheckBuildingId: 0x20,

  sourceAddr: '0x004E7967',
};

// ============================================================================
// === FREE SUPPORT (Government-Based Unit Maintenance) ===
// Binary ref: FUN_004e7eb1 @ block_004E0000.c (512 bytes)
// ============================================================================

export const FREE_SUPPORT = {
  // Human formula: base = 0x0D - difficulty
  // If difficulty < 3: base += 1; if difficulty == 0: base += 1 more
  humanBaseFormula: '0x0D - difficulty',
  humanBonusUnder3: 1,
  humanBonusAt0: 1,

  // Alliance modifier (turn > 200, difficulty > 1, human has allies)
  allianceTurnThreshold: 200, // DAT_00655AF8 > 200
  allianceDifficultyMin: 2,
  allianceMaxAdjust: 2,

  // Government multiplier: if rules.txt support != 10:
  // result = (govtSupport * base) / 10, rounded up if odd
  defaultMultiplier: 10,

  // AI: free support from rules.txt constants
  aiFreeSupport: 'DAT_0064BCCB',
  aiFreeShieldSupport: 'DAT_0064BCCC',

  // Shield support (FUN_004e80b1): same formula pattern
  humanShieldBase: '0x0D - difficulty',
  humanShieldBonusAt0: 0x0E,

  govtThresholdLow: 2,
  govtThresholdHigh: 2,

  sourceAddr: '0x004E7EB1',
};

// ============================================================================
// === UNIT ENUMERATION (Support/Unhappy Counting) ===
// Binary ref: FUN_004e80b1 @ block_004E0000.c (1497 bytes)
// ============================================================================

export const UNIT_ENUMERATION = {
  flagBits: {
    clearMask: 0xF3FF,       // bits 0x0400 and 0x0800 cleared at start
    supportCostBit: 0x0800,  // unit exceeds free support
    unhappyCostBit: 0x0400,  // unit causes unhappiness
  },

  roleThreshold: 6,          // unit_type.role < 6 = military

  // Government support types (FUN_004e7d7f param_3):
  supportTypes: {
    0: { threshold: 'city.size', note: 'Anarchy/Despotism' },
    1: { threshold: 'city.size', note: 'Monarchy/Communism' },
    2: { threshold: 'DAT_0064BCD5', note: 'settler threshold' },
    3: { threshold: 'DAT_0064BCD6', note: 'military threshold' },
    4: { threshold: 'DAT_0064BCD7', note: 'attack unit threshold (requires attack > 0)' },
  },

  settlerRoleId: 5,
  fortressTileMask: 0x42,
  fortressTileValue: 0x40,
  fortressProximityRadius: 4,

  sourceAddr: '0x004E80B1',
};

// ============================================================================
// === TILE YIELD CALCULATION ===
// Binary ref: FUN_004e868f @ block_004E0000.c (1528 bytes)
// ============================================================================

export const TILE_YIELD = {
  // Terrain yield table: DAT_00627CCA[(resourceType * 11 + terrainType) * 0x18 + yieldType]
  yieldTableAddr: 'DAT_00627CCA',
  yieldTableStride: 0x18,
  terrainTypes: 11,

  // Double resource: DAT_00655B02 != 0 and DAT_00654FAC != 0
  doubleResourceFlag: 'DAT_00655B02',
  doubleResourceCheck: 'DAT_00654FAC',

  // Ocean terrain (type 10) bonuses:
  oceanTerrainType: 10,
  oceanFoodBuildingId: 0x1E,
  oceanShieldsBuildingId: 0x1F,
  oceanTradeWonderId: 0x02,

  // Improvement bonuses
  irrigationBonusAddr: 'DAT_00627CD0',
  mineBonusAddr: 'DAT_00627CD1',
  farmlandBuildingId: 0x18,
  colossusWonderId: 0x02,

  // Government penalty (Anarchy/Despotism): if yield > 2 and govt < 2: yield -= 1
  govtPenaltyThreshold: 2,
  govtPenaltyGovtMax: 2,
  govtPenaltyAmount: 1,

  govtTradeBonusMin: 2,

  sourceAddr: '0x004E868F',
};

// ============================================================================
// === WORKER ASSIGNMENT ALGORITHM ===
// Binary ref: FUN_004e8f42 @ block_004E0000.c (2002 bytes)
// ============================================================================

export const WORKER_ASSIGNMENT = {
  specialistShift: 0x1A,      // 26
  specialistMask: 0x3F,

  availableWorkersFormula: 'city.size + 1',

  recalcTurnMask: 3,          // (DAT_00655AF8 + cityIndex) & 3 == 0 triggers full recalc

  foodPerPopAddr: 'DAT_0064BCCA',
  foodPerPopMin: 2,

  buildingWordLayout: {
    tileBits: '0x000FFFFF',
    centerBit: 0x100000,
    specialistBits: '0xFC000000',
  },

  sourceAddr: '0x004E8F42',
};

// ============================================================================
// === TRADE DISTRIBUTION ===
// Binary ref: FUN_004ea1f6 @ block_004E0000.c (1769 bytes)
// ============================================================================

export const TRADE_DISTRIBUTION = {
  luxuryRateOffset: 0x13,     // DAT_0064C6B3 relative to civ base
  scienceRateOffset: 0x14,
  govtTypeOffset: 0x15,

  roundingOffset: 4,          // +4 before /10

  specialistBonuses: {
    taxman:    { status: 1, bonus: 2 },
    scientist: { status: 2, bonus: 3 },
    elvis:     { status: 3, bonus: 3 },
  },

  communistSciencePenalty: 'DAT_0064BCD9',
  communistGovtId: 4,
  capitulationAttitude: -0x26,

  goldMultiplierBuildings: {
    marketplace:   { buildingId: 0x04 },
    bank:          { buildingId: 0x0E },
    stockExchange: { buildingId: 0x16 },
  },
  goldMultiplierFormula: 'gold += (gold * count) >> 1',

  scienceMultiplierBuildings: {
    library:     { buildingId: 0x06 },
    university:  { buildingId: 0x0C },
    researchLab: { buildingId: 0x1A },
  },
  scienceMultiplierFormula: 'science += (science * count) >> 1',

  copernicusWonderId: 0x10,
  setiWonderId: 0x0B,

  happinessBuildings: {
    temple: 0x04,
    mysticismTech: 0x38,
    oracleWonder: 0x09,
    shakespeareWonder: 0x05,
    cathedral: 0x0E,
    michelangeloWonder: 0x18,
    jsBachWonder: 0x37,
    cureForCancerWonder: 0x0F,
  },

  sourceAddr: '0x004EA1F6',
};

// ============================================================================
// === CORRUPTION CALCULATION ===
// Binary ref: FUN_004e989a @ block_004E0000.c (890 bytes)
// ============================================================================

export const CORRUPTION_CALC = {
  // Government factor (FUN_004e9849): divisor based on govt type
  govtFactorTable: { 0: 4, 1: 5, 2: 6, 3: 7, 4: 8, 5: 8 },

  // Formula: corruption = clamp((distance * trade * 3) / (govtFactor * 20), 0, trade)
  distanceCap: 0x10,          // 16 max
  aiDistanceMaxAdjusted: 0x20,

  // Communism: flat rate using DAT_0064BCD8 instead of distance
  communismGovtId: 3,
  communismCorruptionRate: 'DAT_0064BCD8',

  // Palace/Courthouse: corruption >> 1
  palaceBuildingId: 0x07,
  courthouseBuildingId: 0x01,

  sourceAddr: '0x004E989A',
};

// ============================================================================
// === TRADE ROUTE / CORRUPTION / SCIENCE INTEGRATION ===
// Binary ref: FUN_004e9c14 @ block_004E0000.c (1053 bytes)
// ============================================================================

export const TRADE_SCIENCE_INTEGRATION = {
  // Building multiplier pattern (each adds +2 to accumulator):
  powerPlantTypes: {
    marketplace: 0x0F,
    bank: 0x10,
    superhighways: 0x13,
    nuclearPlant: 0x14,
    powerPlant: 0x15,
    hooverDamWonder: 0x16,
    recyclingCenter: 0x12,
    solarPlant: 0x1D,
  },
  powerLevels: { 1: 'no power', 2: 'power/nuclear/hoover', 3: 'recycling/solar' },

  pollutionBaseOffset: 0x14,

  tradeCapabilityDivisor: 3,
  luxuryZeroGovts: [0, 4, 6],

  sourceAddr: '0x004E9C14',
};

// ============================================================================
// === DISORDER AND WE LOVE THE KING DAY ===
// Binary ref: handle_city_disorder_004ef578 @ block_004E0000.c (1614 bytes)
// ============================================================================

export const DISORDER_WLTK = {
  // Disorder: unhappy > happy (DAT_006A6550 - DAT_006A65A8 < 0)
  // WLtKD: unhappy==0, size>2, happy >= (size+1)/2, govt != 0

  disorderFlags: {
    firstTimeDisorder: 0x4001,
    continuingDisorder: 0x2000,
    wasRapture: 0x100000,
    disorderClear: 0xFFEFDFFE,
  },

  wltkdFlag: 0x02,
  raptureFoodSurplus: 0x4000,
  wltkdClear: 0xFFFFFFFD,
  wltkdGrowthGovtMin: 5,

  // Democracy revolution on continuing disorder
  democracyGovtId: 6,
  scenarioFlagMask: 0x80,
  gameOptionMask: 0x10,

  treasuryOffset: 0x02,       // DAT_0064C6A2 relative to civ base

  disorderSoundId: 0x0E,
  wltkdSoundId: 0x03,

  sourceAddr: '0x004EF578',
};

// ============================================================================
// === SCIENCE DOUBLING (Chieftain / AI Spaceship Rush) ===
// Binary ref: FUN_004efbc6 @ block_004E0000.c (382 bytes)
// ============================================================================

export const SCIENCE_DOUBLING = {
  chieftainDifficultyId: 0,
  futureTechId: 0x59,
  techInProgressCheck: 'DAT_0064C6AA + civ * 0x594',

  // AI spaceship rush: difficulty > 1, building spaceship
  aiDifficultyMin: 2,
  spaceshipPartsRange: { start: 0x23, end: 0x25 },

  sourceAddr: '0x004EFBC6',
};

// ============================================================================
// === POLLUTION AND NUCLEAR MELTDOWN ===
// Binary ref: FUN_004efd44 @ block_004E0000.c (940 bytes)
// ============================================================================

export const POLLUTION_MELTDOWN = {
  // pollutionScore = (techLevel * difficulty) >> 1
  pollutionFormula: '(techLevel * difficulty) >> 1',
  scenarioPollutionDisable: { scenarioFlag: 0x80, gameOption: 0x40 },

  solarPlantBuildingId: 0x1D,
  pollutionScoreCap: 0xFF,

  pollutionRandomBase: 0x100,
  cityRadiusTileCount: 0x14,
  pollutionTileBit: 0x80,
  noPolluteFlags: 0x82,

  // Nuclear meltdown: disorder + Nuclear Plant (0x15) + no Fusion Power (0x20)
  nuclearPlantBuildingId: 0x15,
  fusionPowerTechId: 0x20,
  meltdownChanceFormula: 'rand() % max(1, 6 - difficulty)',
  meltdownDifficultyBase: 6,
  meltdownDialogString: 's_CHERNOBYL_0062ef70',

  sourceAddr: '0x004EFD44',
};

// ============================================================================
// === UNIT DISBANDING (Food Deficit / AI Auto-Disband) ===
// Binary ref: FUN_004eef23 @ block_004E0000.c (1621 bytes)
// ============================================================================

export const UNIT_DISBANDING = {
  aiDisbandTurnMask: 7,
  aiDisbandGovtMin: 5,

  roleSkipThreshold: 4,
  fortressCheckMask: 0x42,
  fortressCheckValue: 0x40,
  fortressNearCityRadius: 4,

  shieldRecoveryFormula: '(hitPoints * freeShieldSupport) / 2',
  postDisbandFlagClear: 0xFFEFDFFE,

  sourceAddr: '0x004EEF23',
};

// ============================================================================
// === BUILDING MAINTENANCE ===
// Binary ref: FUN_004f0221 @ block_004F0000.c (406 bytes)
// ============================================================================

export const BUILDING_MAINTENANCE = {
  buildingRange: { start: 1, end: 0x27 },
  maintenanceCostAddr: 'DAT_0064C48D',
  maintenanceCostStride: 8,

  chieftainReduction: { difficultyMax: 2, buildingType: 2, reduction: 1 },
  shakespeareWonderId: 0x11,
  communismFreeBuildingIds: [0x04, 0x0E, 0x0B],

  sellRecoveryFormula: 'DAT_0064C48C[buildingId * 8] * freeShieldSupport',
  sellNotification: 's_INHOCK_0062ef7c',

  sourceAddr: '0x004F0221',
};

// ============================================================================
// === EVENT SYSTEM PARSER ===
// Binary ref: FUN_004fa250..FUN_004ff6f7 @ block_004F0000.c
// ============================================================================

export const EVENT_SYSTEM = {
  civIdentifiers: {
    ANYBODY: -2,
    TRIGGERATTACKER: -3,
    TRIGGERDEFENDER: -4,
    TRIGGERRECEIVER: -4,
  },

  unitTypeCount: 0x3E,
  anyUnitId: -2,
  terrainTypeCount: 11,

  parserStates: { INITIAL: 1, IF: 2, THEN: 3, ENDIF: 5, SKIP: 6, DONE: 10 },

  eventTypes: {
    UNITKILLED: 1,
    NEGOTIATION: 2,
    playerTypes: { HUMAN: 1, COMPUTER: 2, HUMANORCOMPUTER: 4 },
  },

  maxCivs: 8,

  sourceAddr: '0x004FA250',
};

// ============================================================================
// === GAME INITIALIZATION (new_game) ===
// Binary ref: FUN_004aa9c0 @ block_004A0000.c (1345 bytes)
// Sets up a brand new game: zero all state, create civs, assign tax rates
// ============================================================================

export const GAME_INIT = {
  // Initial global state values set during new game creation
  initialTurn: 0,                      // DAT_00655AF8 = 0
  initialYear: 0xF060,                 // DAT_00655AFA = 0xF060 (calendar epoch)
  initialFutureYear: 0xFFFF,           // DAT_00655AFC = 0xFFFF (-1 / sentinel)
  initialUnitCount: 0,                 // DAT_00655B16 = 0
  initialCityCount: 0,                 // DAT_00655B18 = 0
  initialMapExplored: 0,               // DAT_00655AFE = 0
  initialGlobalWarming: 0,             // DAT_00655B0E = 0
  initialNukeMeltdown: 0,              // DAT_00655B0F = 0
  initialPollutionLevel: 0,            // DAT_00655B10 = 0
  turnOrderStart: 1,                   // DAT_006D1DA8 = 1

  // Power graph data init: 150 turns * 8 civs = 1200 entries, all zero
  powerGraphMaxTurns: 0x96,            // 150 turns
  powerGraphCivCount: 8,
  powerGraphAddr: 'DAT_00655C38',      // byte[turn * 8 + civ]

  // Historian next-report random init: rand() % 50
  historianMaxRand: 0x32,              // 50 turns

  // Wonder cascade data: 0x1C wonders, all set to 0xFFFF (unbuilt)
  wonderCount: 0x1C,                   // 28 wonder slots
  wonderUnbuiltSentinel: 0xFFFF,       // -1 = no city owns this wonder

  // Civ tech table: 0x40 techs per civ, all zeroed
  techsPerCiv: 0x40,                   // 64 tech slots

  // Tax rate validation on start: science + luxury <= 10, default 6:4
  maxTaxLuxSciTotal: 10,
  defaultScience: 6,                   // DAT_0064BC1A = 6
  defaultLuxury: 4,                    // DAT_0064BC1C = 4
  defaultTreasury: 0x32,               // 50 gold for single human if difficulty=0

  // Game options initial flags (from DAT_0064BC1E)
  gameOptionsInitial: 0x3F3258,        // @ FUN_004a70b0, default game flags
  disableIfNoMem: 0xFFDFFFFF,          // & mask if allocation < 10M fails (bit 21 off)
  memCheckThreshold: 10000000,         // 10M bytes memory check

  // sourceAddr: '0x004AA9C0' (new_game), '0x004A70B0' (init game options)
};

// ============================================================================
// === CIV CREATION (new_civ) ===
// Binary ref: new_civ @ 0x004A7CE9 (5834 bytes) in block_004A0000.c
// Creates a new civilization: picks tribe, places settlers, sets diplomacy
// ============================================================================

export const NEW_CIV = {
  // Per-civ record stride
  civRecordStride: 0x594,              // 1428 bytes per civ

  // Initial civ values
  initialGold: 0,                      // DAT_0064C6A2 = 0
  initialResearchPoints: 0,            // DAT_0064C6A8 = 0
  initialGovernment: 0,                // despotism
  initialPopulation: 0,
  initialMinTurn: 10,                  // if DAT_00655AF8 < 0x0B, clamp to 10

  // Tax rate defaults for new civ
  defaultScience: 4,                   // DAT_0064C6B3 = 4 (or tribe-specific + 3)
  defaultLuxury: 1,                    // DAT_0064C6B5 = 1
  maxTaxRateSum: 9,                    // science + luxury = 9 (+ 1 implied tax = 10)

  // Tech flags: 10 slots, indices 0,1,3,6 set to 1 initially
  initialTechFlags: [0, 1, 3, 6],      // these tech flag indices = 1

  // Diplomacy regard initialization
  selfRegard: 100,                     // regard towards self = 100
  aiToHumanRegard: {
    formula: 'rand() % 80 + 10',       // 10..89 range
    min: 10, max: 89,                  // 0x50 range, +10 base
  },
  humanToAIRegard: {
    formula: 'difficulty * 5 + rand() % 80 + 10',
    clamp: { min: 10, max: 75 },       // 0x0A..0x4B
  },

  // City tile naming: 100 tiles tracked per civ, sentinel 0xFF
  maxCityTiles: 100,
  unownedTileSentinel: 0xFF,

  // Settler placement search limits
  maxPlacementAttempts: 2001,           // local_14c < 0x7D1
  minSettlerDistance: {
    nearCivs: 2,                       // iVar4 < 2 = too close
    roundWorld: {
      // For round world (no flat earth flag):
      // If map > 0x51 width: x restricted to 8..width-16
      minMapWidth: 0x51,               // 81 tiles
      borderSkip: 8,                   // skip 8 tiles from each edge
    },
  },

  // Settler terrain suitability checks
  minTerrainQuality: 0x0C,             // 12 — base terrain quality threshold
  terrainQualityDecay: {
    formula: '0x0C - (attempts >> 5)',  // reduces by 1 every 32 attempts
  },
  minDistanceToExisting: 0x10,         // 16 — min dist to nearest existing civ
  distanceDecay: {
    formula: '0x10 - (attempts >> 7)',  // reduces by 1 every 128 attempts
  },

  // Late-game entry threshold (won't place if too late in game)
  lateGameThreshold: {
    formula: 'difficulty * -0x23 + 0x15E',  // turn threshold varies by difficulty
  },

  // 3-pole Y boundary: won't place within 3 rows of map edge
  mapEdgeBuffer: 3,

  // Connection timeout for MP new_civ: 0xE10 (3600 ticks)
  mpConnectionTimeout: 0xE10,          // 3600 ticks

  // sourceAddr: '0x004A7CE9' (new_civ)
};

// ============================================================================
// === CIV ELIMINATION (kill_civ) ===
// Binary ref: kill_civ @ 0x004AA378 (1608 bytes) in block_004A0000.c
// Handles civ death: records history, removes units, reassigns tiles
// ============================================================================

export const KILL_CIV = {
  // Destroyed civ history table: max 12 entries
  maxDestroyedRecords: 0x0C,           // 12 destroyed civ records
  recordFields: {
    turnDestroyed: 'uint16',           // DAT_0065512A[i*2] = current turn
    destroyerCiv: 'byte',             // DAT_00655142[i] = killing civ
    originalTribe: 'byte',            // DAT_0065514E[i] = tribe of destroyed civ
    civName: { maxLen: 0x18, addr: 'DAT_0065515A + i * 0x18' },
  },

  // After kill: game end check — if only 1 human left and no AI alive
  minPlayersForContinue: 2,            // if alive < 2: game ending
  gameEndFlag: 3,                      // DAT_0064B1AC = 3 → game over
  gameEndBitmask: 2,                   // DAT_00655AF0 |= 2

  // MP: kill_civ request uses msg type 0x60 with 0xE10 timeout
  mpMsgType: 0x60,
  mpTimeout: 0xE10,                    // 3600 ticks

  // Sound events on civ elimination (DAT_00655B02 >= 3 for MP)
  soundEventId: 0x0E,                  // sound 0x0E on destruction

  // sourceAddr: '0x004AA378' (kill_civ)
};

// ============================================================================
// === SPACESHIP STATE ===
// Binary ref: FUN_004a74bc, FUN_004a75d5, FUN_004a762d @ block_004A0000.c
// Spaceship per-civ data: 6 uint16 component counts + flags at civ * 0x594
// ============================================================================

export const SPACESHIP_CIV_DATA = {
  civStride: 0x594,                    // per-civ record stride
  flagsOffset: 0xCAA0,                // relative to DAT_0064CAA0 + civ * 0x594
  componentCountOffset: 0xCAA8,        // 6 x uint16 component counts

  // Spaceship state flags (byte at civBase + 0xCAA0)
  FLAGS: {
    LAUNCHED: 0x02,                    // bit 1 = spaceship launched
    HAS_SHIP: 0x01,                    // bit 0 = has spaceship parts
  },

  // Launch check: launched AND turn <= currentTurn
  launchCheckAddr: 'DAT_00655AFA',     // current turn counter

  // Spaceship arrival event: dispatches sound 0x0C (SPACERETURNS)
  arrivalSoundId: 0x0C,
  // Spaceship destruction event: dispatches sound 0x0D (SPACEDESTROYED)
  destructionSoundId: 0x0D,
  // Both require DAT_00655B02 > 2 (MP or network game)

  // Reset: zeros all 6 component counts + flags
  componentCount: 6,

  // sourceAddr: '0x004A74BC' (reset), '0x004A75D5' (launch check), '0x004A762D' (arrival/destroy)
};

// ============================================================================
// === CIV2.DAT PREFERENCES FILE ===
// Binary ref: FUN_004a733d (read), FUN_004a73d9 (write) @ block_004A0000.c
// Persistent game preferences stored in CIV2.DAT
// ============================================================================

export const CIV2_DAT_FILE = {
  filename: 'CIV2.DAT',               // PTR_s_CIV2_DAT_0062CEC8

  // Block 1: game options (0x48 = 72 bytes)
  optionsBlock: {
    addr: 'DAT_0064BC10',
    size: 0x48,                        // 72 bytes
    fields: {
      flags1: { offset: 0x00, value: 0x3F, note: 'initial game option flags' },
      // DAT_0064BC12 = 0 (or 2 if turn > 999)
      difficulty: { offset: 0x04, note: 'difficulty level' },
      barbarians: { offset: 0x06, note: 'barbarian aggressiveness' },
      competition: { offset: 0x08, note: 'competition level' },
      science: { offset: 0x0A, note: 'science rate (default 6)' },
      luxury: { offset: 0x0C, note: 'luxury rate (default 4)' },
      options2: { offset: 0x0E, value: 0x3F3258, note: 'extended game options bitmask' },
      messageOpts: { offset: 0x12, note: 'message suppression options' },
      randomSeed: { offset: 0x18, note: 'AI randomization setting' },
    },
  },

  // Block 2: civ preferences (0x1BC = 444 bytes)
  prefsBlock: {
    addr: 'DAT_00666538',
    size: 0x1BC,                       // 444 bytes
    note: 'Per-civ AI/diplomacy preferences',
  },

  // If file not found: init defaults via FUN_004a70b0 + FUN_004a71bb
  // On write failure: file is deleted (FID_conflict__remove)

  // sourceAddr: '0x004A733D' (read), '0x004A73D9' (write)
};

// ============================================================================
// === SCENARIO CIVS STARTUP ===
// Binary ref: FUN_004a9785 @ 0x004A9785 (3059 bytes) in block_004A0000.c
// Sets up advanced-start civilizations for scenarios
// ============================================================================

export const SCENARIO_STARTUP = {
  // Turn-to-year formula for scenario start: ((param * 4) + 4) * 5 + 1
  turnToYear: {
    formula: '((startingEra * 4) + 4) * 5 + 1',
    // startingEra 0 → turn 21 (4000 BC)
    // startingEra 1 → turn 41 (~1000 BC)
    // startingEra 2 → turn 61 (~1 AD)
    // startingEra 3 → turn 81 (~500 AD)
  },

  // Per-era tech grants (IDs given to each civ at start)
  eraBaseTechs: {
    allEras: [0x24, 9, 1, 8],          // Alphabet(9), Ceremonial Burial(1), Code of Laws(8), Bronze Working(0x24)
  },

  // City population: rand() % 50 + 25 → (25..74) * (era + 1)
  cityPopFormula: {
    base: { min: 0x19, max: 0x4A },    // rand() % 0x32 + 0x19
    multiplier: 'startingEra + 1',
  },

  // City initial size: era 0 → size 3, era > 0 → size 5
  initialCitySize: { era0: 3, eraPlus: 5 },

  // Road building: 50 tiles max per city, connect cities within distance 0x17 (23)
  roadMaxTiles: 0x32,                  // 50 tiles of road building
  roadConnectMaxDist: 0x17,            // 23 tiles max city-to-city road

  // Second city placement: search 8 directions * distance 5 for best site
  secondCitySearchRadius: 5,

  // sourceAddr: '0x004A9785' (scenario_startup_civs)
};

// ============================================================================
// === PATHFINDING ENGINE ===
// Binary ref: FUN_004abfe5 @ 0x004ABFE5 (4118 bytes) — A* pathfinder
//             FUN_004adafc @ 0x004ADAFC (2516 bytes) — AI unit move direction
//             FUN_004ad20f @ 0x004AD20F (1392 bytes) — long-range pathing
//             FUN_004ad0d1 @ 0x004AD0D1 (318 bytes)  — distance-limited path
// All in block_004A0000.c
// ============================================================================

export const PATHFINDING = {
  // A* search grid: 0x30 x 0x30 (48 x 48) tiles, centered on origin
  gridSize: 0x30,                      // 48 tiles in each axis
  gridHalfSize: 0x18,                  // 24 tile offset to center
  gridTotalCells: 0x2400,              // 48 * 48 * 4 bytes = 9216 DWORD entries
  gridAddr: 'DAT_006CED60',

  // BFS queue: circular buffer of 0x900 (2304) entries
  queueSize: 0x900,                    // 2304 slots
  queueWritePtr: 'DAT_00673FBC',
  queueReadPtr: 'DAT_00673FC4',
  queueXAddr: 'DAT_00673FC8',
  queueYAddr: 'DAT_006763C8',

  // Maximum search distance from origin (Manhattan-like): 0x30 (48) even tiles
  maxSearchDist: 0x30,                 // (absX + absY) & 0xFFFFFFFE < 0x30

  // Terrain movement costs (multiplied by DAT_0064BCC8 = road movement multiplier)
  moveCosts: {
    railroad: 1,                       // instant (cost = 1)
    road: 4,                           // cost = roadMultiplier * 4
    jungle: { formula: 'terrainCost[terrainType] * roadMultiplier * 4' },
    water: 1,                          // naval: cost = 1
  },

  // Special path cost modifiers
  ztocPenalty: 0x10,                   // zone-of-control: +16 to path cost
  cityFortPenalty: 4,                  // entering enemy fort/city: +4 cost

  // Long-range path uses 4x4 super-tile grid
  longRangeGridScale: 4,              // each super-tile = 4x4 real tiles
  longRangeQueueSize: 0x100,          // 256 slots (circular, & 0xFF)
  longRangeMaxDist: 0x17,             // 23 tiles — if distance >= this, use long-range

  // AI direction selection: evaluates all 8 directions + diagonal preference
  directionEvalCount: 8,
  backtrackPenalty: {
    formula: '(direction ^ 4) == lastDirection',
    effect: 'reset destination, skip unit for this turn',
  },

  // sourceAddr: '0x004ABFE5' (A* pathfinder), '0x004ADAFC' (AI move),
  //             '0x004AD20F' (long-range), '0x004AD0D1' (distance-limited)
};

// ============================================================================
// === BARBARIAN CAMP SPAWNING ===
// Binary ref: FUN_004a7754 @ 0x004A7754 (1408 bytes) in block_004A0000.c
// Distributes barbarian huts across the map at game start
// ============================================================================

export const BARBARIAN_CAMP_SPAWNING = {
  // Evaluates each of 7 civs' settler locations for hut placement quality
  civsToEvaluate: 7,                   // civs 1..7

  // Quality scoring per settler location:
  // - Terrain type 2 (grassland): +1
  // - River (tile & 0x80): +4
  // - Population of continent / 50: add 3..6 (clamped)
  terrainGrasslandScore: 1,
  riverScore: 4,
  continentPopScoreClamp: { min: 3, max: 6 },
  continentPopDivisor: 0x32,           // 50

  // Distance scoring between settler locations:
  closeDistance: 9,                    // < 10 = no bonus
  mediumDistance: 0x14,                // 10..19 = +1
  farDistance: 999,                    // 20+ = +2
  soloContinent: {                     // no other settler on same continent
    formula: 'continentPop / 50, clamped to 3..6',
  },

  // Government check for barbarian type: DAT_00655B08 == 5 (democracy)
  // If civ is human AND democracy → weaker barbarians (+1 instead of +3)
  democracyGovtId: 5,
  democracyBonus: 1,
  normalBonus: 3,

  // Hut placement: for each settler, add (maxScore - thisScore) barbarian units
  // via FUN_004c21d5(civId, 0) — create barbarian unit

  // sourceAddr: '0x004A7754'
};

// ============================================================================
// === TRIBE/LEADER EDITOR ===
// Binary ref: FUN_004a54d9 (show_title_screen) @ 0x004A54D9 (2171 bytes)
//             FUN_004a4a58 @ 0x004A4A58 (1084 bytes) — editor panel draw
//             FUN_004a4f89 @ 0x004A4F89 (1360 bytes) — editor paint
// All in block_004A0000.c
// ============================================================================

export const TRIBE_EDITOR = {
  // Editor window dimensions
  windowWidth: 0x230,                  // 560 pixels
  windowHeight: 0x17C,                 // 380 pixels

  // Tribe count: 0x15 (21) tribes
  tribeCount: 0x15,                    // 21 tribes
  // Government names: 7 entries
  governmentCount: 7,
  governmentNameMaxLen: 0x0F,          // 15 chars per government name
  // Leader title entries: 14 (7 governments × male/female)
  leaderTitleCount: 0x0E,              // 14 entries
  // City style options: 4 (as shown in switch: 0..3)
  cityStyleCount: 4,

  // Common name count: 0x10 (16) entries for renaming
  commonNameCount: 0x10,               // 16 common names
  commonNameMaxLen: 10,                // 10 chars per name

  // GIF resource loaded: EDITORSA.GIF with 10 frames, 0xC0 palette
  editorGif: 'EDITORSA.GIF',
  editorGifFrames: 10,
  editorGifPalette: 0xC0,

  // Leader portrait: 0x40 x 0x40 (64x64) pixels
  portraitSize: 0x40,                  // 64x64 pixel portrait

  // Flag/shield: 0x10 x 0x10 (16x16) overlay at portrait center
  flagOverlaySize: 0x10,              // 16x16 flag/shield

  // Tribe record: per-tribe stride 0x30 (48 bytes)
  tribeRecordStride: 0x30,            // 48 bytes per tribe

  // Button IDs for editor actions
  buttonIds: {
    selectTribe: 0xC9,                // 201
    confirmEdit: 0xCA,                // 202
  },

  // File I/O: writes GOVERNMENTS, LEADERS, CARAVAN sections to RULES.TXT
  rulesSections: ['GOVERNMENTS', 'LEADERS', 'CARAVAN'],

  // sourceAddr: '0x004A54D9' (editor init), '0x004A4A58' (panels), '0x004A4F89' (paint)
};

// ============================================================================
// === LOWERCASE-TO-UPPERCASE CONVERSION ===
// Binary ref: FUN_004a7070 @ 0x004A7070 (43 bytes) in block_004A0000.c
// Simple ASCII lowercase→uppercase for a single character
// ============================================================================

export const ASCII_TOUPPER = {
  lowercaseRange: { min: 0x61, max: 0x7A },  // 'a'..'z'
  offset: -0x20,                               // subtract 32 to get uppercase
  // sourceAddr: '0x004A7070'
};

// ============================================================================
// === AI TERRITORY ANALYSIS ===
// Binary ref: FUN_00530280..FUN_005305d0 @ block_00530000.c
// 8-direction neighbor scanning for continent/territory evaluation
// ============================================================================

export const AI_TERRITORY_ANALYSIS = {
  maxContinents: 0x40,              // 64 continent zones tracked                // 0x00530280
  directionTableDx: 'DAT_00628350', // int8[8]: dx offsets for 8 directions      // 0x00530280
  directionTableDy: 'DAT_00628360', // int8[8]: dy offsets for 8 directions      // 0x00530280
  // Direction order: NE, E, SE, S, SW, W, NW, N (standard Civ2 8-dir)

  continentArrayOffset: '@ DAT_0064c932[civ * 0x594 + zoneId]',               // 0x00530280
  maxZones: 0x3F,                   // 63 usable zones (index 0..0x3E)           // 0x00530280

  // Territory scoring: count cities per continent per civ
  cityCountPerContinent: {
    cityRecordStride: 0x58,         // 88 bytes per city                         // 0x005305d0
    maxCities: 'DAT_00655b18',      // total city count                          // 0x005305d0
  },

  // sourceAddr: '0x00530280' (territory analysis), '0x005305d0' (city counting)
};

// ============================================================================
// === AI UNIT DECISION LOOP (MASTER) ===
// Binary ref: FUN_00538a29 @ block_00530000.c (44,777 bytes)
// The largest single function in civ2.exe — processes every AI unit each turn.
// ============================================================================

export const AI_UNIT_DECISION = {
  functionAddr: '0x00538a29',
  functionSize: 44777,              // bytes — largest function in the binary

  // --- AI Order Codes ---
  // Internal order byte values assigned to units during AI processing
  orderCodes: {
    PATROL:         0x30,           // patrol between locations                   // 0x00538a29
    ESCORT:         0x34,           // escort another unit                        // 0x00538a29
    AI_MOVE:        0x39,           // generic AI move toward goal                // 0x00538a29
    ATTACK:         0x41,           // attack target                              // 0x00538a29
    SETTLE:         0x42,           // found a city                               // 0x00538a29
    EXPLORE:        0x44,           // explore unknown territory                  // 0x00538a29
    FORTIFY:        0x46,           // fortify in place                           // 0x00538a29
    HIBERNATE:      0x48,           // hibernate (skip processing)                // 0x00538a29
    GOTO_CITY:      0x53,           // move to specified city                     // 0x00538a29
    MOVE_ALLIED:    0x61,           // move to allied city                        // 0x00538a29
    AUTO:           0x64,           // automated (100 decimal)                    // 0x00538a29
    WAIT:           0x68,           // wait (skip this turn cycle)                // 0x00538a29
    TRADE:          0x74,           // execute trade route                        // 0x00538a29
  },

  // --- Scoring Sentinel Values ---
  // Used as min/max/impossible markers in distance and priority scoring
  sentinels: {
    MAX_DISTANCE:    9999,          // impossibly far — used as initial best      // 0x00538a29
    HIGH_PRIORITY:   999,           // very high priority score                   // 0x00538a29
    LOW_PRIORITY:    -999,          // very low priority (avoid)                  // 0x00538a29
    IMPOSSIBLE:      -9999,         // impossible / disabled target               // 0x00538a29
  },

  // --- Threat Assessment Thresholds ---
  threatThresholds: {
    lowThreat:       0x32,          // 50 — threat score below this is low        // 0x00538a29
    highThreat:      0x3C,          // 60 — threat score above this is high       // 0x00538a29
  },

  // --- AI Scoring Bonuses ---
  scoringBonuses: {
    nearbyCity:      0x28,          // 40 — bonus for targets near own city       // 0x00538a29
    strategicGoal:   0x3C,          // 60 — bonus for strategic goal targets      // 0x00538a29
    minorBonus:      0x14,          // 20 — minor situational bonus               // 0x00538a29
  },

  // --- Unit Record Access ---
  unitRecordStride: 0x20,           // 32 bytes per unit                         // 0x00538a29
  unitTypeStride:   0x14,           // 20 bytes per unit type definition         // 0x00538a29
  maxUnitTypes:     0x3E,           // 62 unit types                             // 0x00538a29

  // sourceAddr: '0x00538A29'
};

// ============================================================================
// === AI SETTLER / MILITARY LOGIC ===
// Binary ref: FUN_00537331 @ block_00530000.c (5,855 bytes)
// AI decision-making for settler placement and military unit deployment.
// ============================================================================

export const AI_SETTLER_MILITARY = {
  functionAddr: '0x00537331',
  functionSize: 5855,

  // --- City Site Evaluation ---
  citySiteScoring: {
    minDistanceFromOwnCity: 4,      // tiles — don't settle too close            // 0x00537331
    coastalBonus: 2,                // bonus for coastal city sites               // 0x00537331
    resourceBonus: 3,               // bonus per nearby resource                  // 0x00537331
  },

  // --- Military Unit Allocation ---
  defenseRatings: {
    fortifiedBonus: 1.5,            // 50% defense bonus when fortified           // 0x00537331
    veteranBonus: 1.5,              // 50% bonus for veteran status               // 0x00537331
    cityWallsMultiplier: 2,         // 2x defense with city walls                 // 0x00537331
  },

  // --- Diplomacy Checks in AI Logic ---
  diplomacyThresholds: {
    hostilityCheck: 0x32,           // 50 — attitude score indicating hostility   // 0x00537331
    warReadiness: 0x3C,             // 60 — threshold for war preparation         // 0x00537331
    hatredFlag: 0x20,               // treaty byte1 bit for vendetta/hatred       // 0x00537331
    warFlag: 0x08,                  // treaty byte0 bit for active war            // 0x00537331
    allianceFlag: 0x04,             // treaty byte0 bit for alliance              // 0x00537331
    peaceFlag: 0x02,                // treaty byte0 bit for peace treaty          // 0x00537331
    embassyFlag: 0x80,              // treaty byte0 bit for embassy established   // 0x00537331
  },

  // sourceAddr: '0x00537331'
};

// ============================================================================
// === AI DIRECTION TABLES (8-NEIGHBOR OFFSETS) ===
// Binary ref: DAT_00628350, DAT_00628360 @ block_00530000.c / block_00520000.c
// Used throughout AI and pathfinding for 8-directional map scanning.
// ============================================================================

export const AI_DIRECTION_TABLES = {
  // 8-direction dx/dy tables for neighbor tile scanning
  // Each entry is a signed byte offset applied to (x, y) coordinates.
  // Referenced by: FUN_00538a29, FUN_0052ec47, FUN_00530280, and many others.
  dxTable: { addr: 'DAT_00628350', entries: 8, type: 'int8[8]' },             // 0x00628350
  dyTable: { addr: 'DAT_00628360', entries: 8, type: 'int8[8]' },             // 0x00628360
  // Standard Civ2 direction order: NE(+1,-1), E(+2,0), SE(+1,+1), S(0,+2),
  //                                 SW(-1,+1), W(-2,0), NW(-1,-1), N(0,-2)
  // Note: Civ2 uses staggered isometric coordinates where x advances by 2 for E/W

  // 9-neighbor scan (8 directions + center): used in some adjacency checks
  neighborScanCount: 9,             // loop 0..8 includes center tile            // 0x0052ec47

  // sourceAddr: '0x00628350' (dx), '0x00628360' (dy)
};

// ============================================================================
// === AI TURN UNIT PROCESSING LOOP ===
// Binary ref: FUN_00543cd6 @ block_00540000.c (801 bytes)
// Outer loop that iterates all AI units each turn, calling FUN_00543b80
// (single-unit AI decision) and FUN_00538a29 (master AI decision loop).
// ============================================================================

export const AI_TURN_PROCESSING = {
  sourceAddr: '0x00543CD6',
  functionSize: 801,

  // --- Two-pass structure ---
  // The function runs 2 passes (local_c = 0..1) over all units.
  // Pass 0: Process air units first (domain == 1), skip others on certain conditions.
  // Pass 1: Process remaining units.
  passCount: 2,                            // do { ... local_c++ } while (local_c < 2) // 0x00543cd6

  // --- Per-unit iteration limit ---
  // Each unit gets at most 0x14 (20) attempts to complete its AI order.
  // If after 20 attempts the unit still has pending movement, it is forcibly finished.
  maxIterationsPerUnit: 0x14,              // if (0x14 < local_14) { finish_unit() }   // 0x00543cd6

  // --- Network sync during AI turn ---
  // In multiplayer (DAT_00655b02 > 2), after each unit decision:
  networkSync: {
    mpThreshold: 2,                        // if (2 < DAT_00655b02): do network sync   // 0x00543cd6
    diffSyncParams: [0xFF, 2, 0, 0, 0],   // thunk_FUN_004b0b53(0xFF, 2, 0, 0, 0)    // 0x00543cd6
    flushTimeout: 5000,                    // XD_FlushSendBuffer(5000)                 // 0x00543cd6
    pollParams: [1, 0],                    // thunk_FUN_0047e94e(1, 0) -- process msgs // 0x00543cd6
    // Early exit: if DAT_006ad698 != 0 or DAT_006ad685 != 0, abort turn
    abortFlags: ['DAT_006ad698', 'DAT_006ad685'],                                      // 0x00543cd6
  },

  // --- Scenario MP flag check ---
  // Special handling when scenario flag 0x80 is set, extended flags & 0x8000,
  // turn == 1, and current player matches: air units processed first pass only.
  scenarioMpFlags: {
    scenarioFlag: 0x80,                    // DAT_00655af0 & 0x80                      // 0x00543cd6
    extendedFlag: 0x8000,                  // DAT_0064bc60 & 0x8000                    // 0x00543cd6
    turnCheck: 1,                          // DAT_00655af8 == 1                        // 0x00543cd6
  },

  // --- Unit processing order ---
  // Units iterated in reverse order: local_18 = DAT_00655b16 - 1, decrementing to 0.
  // Each unit checked: alive (id != 0), owner matches current AI civ, domain checks.
  unitIterationOrder: 'reverse (high index to low)',                                    // 0x00543cd6

  // --- Forced completion ---
  // thunk_FUN_005b6787(unitIdx) called when unit exceeds iteration limit or
  // when FUN_00538a29 (master AI) returns 0 and unit still has movement.
  forcedCompletionFn: 'thunk_FUN_005b6787',                                             // 0x00543cd6

  // --- Guard against cargo-capable units ---
  // Pass 0 skips units with holdCapacity != 0 and role != 2 (not settler role)
  // when the air-first flag is active.
  cargoSkipCheck: {
    holdCapacityOffset: 'DAT_0064b1c9',   // unit type + 0x11 (holdCapacity)          // 0x00543cd6
    roleOffset: 'DAT_0064b1ca',           // unit type + 0x12 (role)                  // 0x00543cd6
    domainOffset: 'DAT_0064b1c1',         // unit type + 0x09 (domain)                // 0x00543cd6
    airDomain: 1,                          // domain == 1 for air units                // 0x00543cd6
  },
};

// ============================================================================
// === DEMOGRAPHICS BINARY DETAILS ===
// Binary ref: FUN_00433434 @ block_00430000.c (6486 bytes)
// Supplements the DEMOGRAPHICS export above with exact binary constants
// extracted from the raw decompiled source (block_00430000.c).
// ============================================================================

export const DEMOGRAPHICS_BINARY = {
  sourceAddr: '0x00433434',
  size: 6486,

  // --- Approval Rating ---
  // Per-city: happy = city.size + happyCitizens - unhappyCitizens
  // Sum across all cities, then: (happySum * 0x32) / totalPopulation
  approvalRating: {
    multiplier: 0x32,             // 50
    cityFields: {
      size: 0x01,                 // city+0x01 (byte)
      happyCitizens: 0x4A,        // city+0x4A (byte)
      unhappyCitizens: 0x4B,      // city+0x4B (byte)
    },
    formula: '(sum_of(city.size + happy - unhappy) * 50) / totalPop',
  },

  // --- Disease Rate ---
  // Base: 0x708 (1800) / (diseaseCityScore + 0x14)
  // diseaseCityScore = sum of city.size for cities with Aqueduct (6) or Sewer (12)
  diseaseRate: {
    baseNumerator: 0x708,         // 1800
    baseDenominator: 0x14,        // 20 (added to diseaseCityScore)
    buildingChecks: [
      { buildingId: 6,  name: 'Aqueduct',     effect: '+city.size to diseaseCityScore' },
      { buildingId: 12, name: 'Sewer System',  effect: '+city.size to diseaseCityScore' },
    ],
    techHalvings: [
      { techId: 0x32, name: 'Medicine' },
      { techId: 0x1b, name: 'Sanitation' },
    ],
    formula: '1800 / (diseaseCityScore + 20), then halved per tech',
  },

  // --- Family Size ---
  // base = 0x14 (20), multiplier = 0x28 (40)
  // foodSupply = sum_of(city.foodSurplus + city.size * -2)
  // familySize = foodSupply * 40 / pop + 20, displayed as X.Y (divide by 10 for display)
  familySize: {
    baseValue: 0x14,              // 20 (added after division)
    multiplier: 0x28,             // 40
    displayDivisor: 10,           // displayed as familySize/10 with one decimal place
    formula: '(foodSupply * 40 / pop) + 20, then display as (result / 10).(result % 10)',
  },

  // --- Literacy Rate ---
  // literacyCityScore = sum of city.size for cities with Granary(3), Library(9), or University(23)
  // base = (pop * 2 + literacyCityScore) * 2 / pop
  // Then doubled for each of 4 techs the civ has
  literacyRate: {
    buildingChecks: [
      { buildingId: 0x03, name: 'Granary (or Pottery tech)' },
      { buildingId: 0x09, name: 'Library' },
      { buildingId: 0x17, name: 'University' },
    ],
    techDoublings: [
      { techId: 0x01, name: 'Alphabet' },
      { techId: 0x58, name: 'Feudalism' },
      { techId: 0x2B, name: 'Physics' },
      { techId: 0x55, name: 'Radio' },
    ],
    clamp: { min: 0, max: 100 },
  },

  // --- Military Service ---
  // Per-city: building checks for Barracks(6) and an unidentified building(12)
  militaryService: {
    buildingChecks: [
      { buildingId: 0x06, name: 'Barracks', effect: '+city.size to militaryCityScore' },
      { buildingId: 0x0C, name: 'Building 12', effect: '+city.size to militaryCityScore' },
    ],
    note: 'Building IDs 0x06 and 0x0C may be Barracks and SAM Battery or similar military buildings',
  },

  // --- Ranking display ---
  // FUN_004331d1 render_demog_row_with_rank (611 bytes)
  rankDisplay: {
    sourceAddr: '0x004331D1',
    rankStringBase: 0x189,        // string ID = rank + 0x189 (e.g., rank 1 = string 0x18A)
    intelligenceCheck: {
      embassyFlag: 0x80,          // treaty[currentPlayer][otherCiv] & 0x80
      wonderIds: [0x18, 9],       // United Nations (24), Great Library (9)
      globalReveal: 'DAT_00655b07',
    },
  },
};

// ============================================================================
// === HISTORIANS REPORT BINARY DETAILS ===
// Binary ref: FUN_00432611 @ block_00430000.c (1501 bytes)
// Supplements the HISTORIANS_REPORT export with exact binary constants.
// ============================================================================

export const HISTORIANS_BINARY = {
  sourceAddr: '0x00432611',
  size: 1501,

  // game.txt section keys
  sectionKeys: {
    categories: 'HISTORIANS',     // @ s_HISTORIANS_00626010
    adjectives: 'HISTORIES',      // @ s_HISTORIES_0062601c
    displayTemplate: 'HISTORY',   // @ s_HISTORY_00626028
    ranking: 'HISTORYRANK',       // @ s_HISTORYRANK_00626034
  },

  // Category scoring (5 categories, random selection)
  categories: {
    0: {
      name: 'Wealthiest',
      formula: 'sum_of(civ.treasury)',
      field: 'DAT_0064c6a2[civ * 0x594]',  // int32 treasury
    },
    1: {
      name: 'Most Powerful',
      formula: 'sum_of(civ.militaryUnitCount)',
      field: 'DAT_0064c70e[civ * 0x594]',  // uint16 military count
    },
    2: {
      name: 'Most Advanced',
      formula: 'count_of(techs owned by civ)',
      method: 'Loop 0..99, call civ_has_tech(civId, techId), count nonzero',
    },
    3: {
      name: 'Happiest',
      formula: 'sum_of(city.size + happyCitizens - unhappyCitizens)',
      cityFields: {
        size: 'DAT_0064f349[slot * 0x58]',
        happy: 'DAT_0064f392[slot * 0x58]',
        unhappy: 'DAT_0064f393[slot * 0x58]',
      },
    },
    4: {
      name: 'Largest',
      formula: 'sum_of(city.size) per civ',
      cityField: 'DAT_0064f349[slot * 0x58]',
    },
  },

  // Adjective selection: random(0, 4) for 5 possible adjective strings
  adjectiveRange: { min: 0, max: 4 },

  // Ranking display
  ranking: {
    maxCivs: 8,                   // civs 1..7 ranked
    sortOrder: 'descending',
    displayLayout: {
      rankPosition: 0x174,        // x offset for rank number
      namePosition: 0xD9,         // x offset for civ name
      adjPosition: 0x8C,          // x offset for adjective (non-scenario)
    },
    visibilityCheck: 'currentPlayer == civ OR has_contact(currentPlayer, civ) OR FOW disabled',
    aliveBitmask: 'DAT_00655b0a', // alive civs bitmask
  },
};

// ============================================================================
// === TOP 5 CITIES BINARY DETAILS ===
// Binary ref: FUN_00432c1c @ block_00430000.c (1281 bytes)
// Supplements the TOP_5_CITIES export with exact binary constants.
// ============================================================================

export const TOP_5_CITIES_BINARY = {
  sourceAddr: '0x00432C1C',
  size: 1281,

  scoring: {
    // score = city.size + happyCitizens - unhappyCitizens
    // + 10 per wonder located in this city
    cityFields: {
      size: 'DAT_0064f349[slot * 0x58]',         // byte: city size
      happyCitizens: 'DAT_0064f392[slot * 0x58]', // byte: happy citizens
      unhappyCitizens: 'DAT_0064f393[slot * 0x58]', // byte: unhappy citizens
    },
    wonderBonus: 10,
    wonderCount: 0x1C,              // 28 wonders checked
    wonderCityIds: 'DAT_00655be6',  // int16[28]: city slot per wonder (-1 = not built)
  },

  // Insertion sort into 5-slot array
  sort: {
    maxEntries: 5,
    algorithm: 'insertion sort: if score > aiStack_2c[i], shift entries i..3 right, insert at i',
    initValue: -1,                  // slots initialized to -1 (empty)
  },

  // Display layout
  display: {
    rowHeight: 0x20,                // 32 pixels per entry
    cityNameFromAddr: 'DAT_0064f360[slot * 0x58]',  // city name string
    happinessBarFn: 'FUN_0042d781',
    wonderIconFn: 'FUN_005cef31',
    wonderIconSpacing: 0x26,        // pixels between wonder icons
    maxWonderIconWidth: 0x23,       // 35 pixels minimum space required
    civColorBorder: 'FUN_0043c7c0 with civ color from FUN_0043cab0',
  },
};

// ============================================================================
// === FAME / TITLE SYSTEM BINARY DETAILS ===
// Binary ref: FUN_00435dc4 render_retirement_score @ block_00430000.c
// Supplements the SCORE export with the exact (n*n)/3 title tier formula.
// ============================================================================

export const FAME_TITLE_BINARY = {
  sourceAddr: '0x00435DC4',

  // The rank formula: iterate levels 1..24 (0x17+1), find highest where (level^2)/3 <= rawScore
  rankFormula: {
    maxLevel: 0x17,               // 23 (0-indexed max rank)
    levelCount: 24,               // iterate 1..24
    formula: 'for level = 1 to 24: if (level * level) / 3 <= rawScore: rank = level - 1',
    tiers: [
      // level: (level^2)/3 = threshold
      { level: 1,  threshold: 0,   rank: 0 },
      { level: 2,  threshold: 1,   rank: 1 },
      { level: 3,  threshold: 3,   rank: 2 },
      { level: 4,  threshold: 5,   rank: 3 },
      { level: 5,  threshold: 8,   rank: 4 },
      { level: 6,  threshold: 12,  rank: 5 },
      { level: 7,  threshold: 16,  rank: 6 },
      { level: 8,  threshold: 21,  rank: 7 },
      { level: 9,  threshold: 27,  rank: 8 },
      { level: 10, threshold: 33,  rank: 9 },
      { level: 11, threshold: 40,  rank: 10 },
      { level: 12, threshold: 48,  rank: 11 },
      { level: 13, threshold: 56,  rank: 12 },
      { level: 14, threshold: 65,  rank: 13 },
      { level: 15, threshold: 75,  rank: 14 },
      { level: 16, threshold: 85,  rank: 15 },
      { level: 17, threshold: 96,  rank: 16 },
      { level: 18, threshold: 108, rank: 17 },
      { level: 19, threshold: 120, rank: 18 },
      { level: 20, threshold: 133, rank: 19 },
      { level: 21, threshold: 147, rank: 20 },
      { level: 22, threshold: 161, rank: 21 },
      { level: 23, threshold: 176, rank: 22 },
      { level: 24, threshold: 192, rank: 23 },
    ],
  },

  // Title strings from game.txt
  titleSections: {
    male: 'MALEFAME',             // game.txt section for male titles
    female: 'FEMALEFAME',         // game.txt section for female titles
  },
  genderSource: 'DAT_006554fc',   // leader portrait data, determines gender

  // Difficulty multiplier table (derived from binary)
  difficultyMultiplier: {
    formula: 'base = difficulty + 4; if d>2: +1; if d>3: +1; if d>4: +2',
    table: [
      { difficulty: 0, name: 'Chieftain', multiplier: 4 },
      { difficulty: 1, name: 'Warlord',   multiplier: 5 },
      { difficulty: 2, name: 'Prince',    multiplier: 6 },
      { difficulty: 3, name: 'King',      multiplier: 8 },
      { difficulty: 4, name: 'Emperor',   multiplier: 10 },
      { difficulty: 5, name: 'Deity',     multiplier: 12 },
    ],
  },
};

// ============================================================================
// === DEMOGRAPHICS ROW RENDERING ===
// Binary ref: FUN_0042ad8f @ block_00420000.c / block_00430000.c
// The demographics screen layout with per-row format strings and column widths.
// ============================================================================

export const DEMOGRAPHICS_LAYOUT = {
  sourceAddr: '0x0042AD8F',

  // Screen setup
  screenInit: {
    creditsFn: 'show_credits(8, 8, 1, 600, 400, 0, 0)',
    musicTrackSelection: 'random(0, 4) + 0x148',  // string ID for era-based section header
  },

  // Research progress display
  researchDisplay: {
    condition: 'civ.currentResearch >= 0',    // DAT_0064c6aa[civ * 0x594] >= 0
    scienceBarFn: 'FUN_00548c78',
    progressField: 'DAT_0064c6a8[civ * 0x594]', // accumulated beakers
    techNameSource: 'DAT_00627684[techId * 0x10]',
    turnsLabel: 'string 0x170 / 0x171',
    turnsFormula: '(researchLeft - 1 + sciencePerTurn) / sciencePerTurn',
  },

  // Technology list (3-column layout)
  techList: {
    maxPerColumn: 'DAT_0063ef74 (computed from available height / row height)',
    maxColumns: 3,
    rowHeight: 0x16,              // 22 pixels per tech row
    columnWidth: 'DAT_0063ef98 = totalWidth / 3',
    techIconFn: 'FUN_005cef31',
    techIconSize: 0x26,           // 38 pixels wide
    ownedTechColor: 0x5E,         // base color for owned techs
    currentResearchColor: 'base - 0x35', // different color for currently researching
    totalTechs: 100,              // loop 0..99 checking civ_has_tech
    paginationFn: 'DAT_0063ef70 (scroll offset), DAT_0063ef68 (page count)',
  },
};

// ============================================================================
// === AI GOAL SYSTEM ===
// Binary ref: FUN_00492e60 (find, 443B), FUN_0049301b (add, 958B),
//             FUN_004933f2 (secondary add, 518B), FUN_00493602 (process, 365B)
// Per-civ goal lists at DAT_0064cab4 (main) and DAT_0064cbd4 (secondary).
// ============================================================================

export const AI_GOAL_SYSTEM = {
  // Main goal array: 48 entries (0x30), 6 bytes each, per-civ at stride 0x594
  mainGoals: {
    count: 0x30,                  // 48 goals per civ                          // 0x00492e60
    entrySize: 6,                 // bytes per goal entry                      // 0x00492e60
    baseAddr: 'DAT_0064cab4',     // first goal entry                          // 0x00492e60
    fields: {
      x:        { offset: 0, size: 2, type: 'int16' },  // DAT_0064cab4       // 0x00492e60
      y:        { offset: 2, size: 2, type: 'int16' },  // DAT_0064cab6       // 0x00492e60
      goalType: { offset: 4, size: 1, type: 'int8'  },  // DAT_0064cab8       // 0x00492e60
      priority: { offset: 5, size: 1, type: 'int8'  },  // DAT_0064cab9       // 0x00492e60
    },
    emptyMarker: 0xFF,            // goalType = -1 (0xFF) means slot is empty  // 0x0049301b
    perCivStride: 0x594,          // 1428 bytes per civ record                 // 0x00492e60
  },

  // Secondary goal array: 16 entries (0x10), 6 bytes each
  secondaryGoals: {
    count: 0x10,                  // 16 secondary goals per civ               // 0x004933f2
    entrySize: 6,                 // bytes per entry                           // 0x004933f2
    baseAddr: 'DAT_0064cbd4',     // first secondary goal entry               // 0x004933f2
    fields: {
      x:        { offset: 0, size: 2, type: 'int16' },  // DAT_0064cbd4       // 0x004933f2
      y:        { offset: 2, size: 2, type: 'int16' },  // DAT_0064cbd6       // 0x004933f2
      goalType: { offset: 4, size: 1, type: 'int8'  },  // DAT_0064cbd8       // 0x004933f2
      priority: { offset: 5, size: 1, type: 'int8'  },  // DAT_0064cbd9       // 0x004933f2
    },
    emptyMarker: 0xFF,            // goalType = -1 means empty                 // 0x004933f2
  },

  // Goal processing: negative priorities are cleared, then secondary goals
  // are promoted into the main list via FUN_00493602
  goalProcessing: {
    clearNegativePriority: true,  // if priority < 0, mark slot as empty       // 0x00493602
    negateAbsValue: true,         // priorities are negated each turn           // 0x00492b60
    promoteSecondaryToMain: true, // secondary goals with goalType >= 0 added  // 0x00493602
  },

  // sourceAddr: '0x00492E60' (find), '0x0049301B' (add), '0x004933F2' (secondary add)
};

// ============================================================================
// === CHAT MACROS ===
// Binary ref: FUN_004923f0 @ 0x004923F0 (849 bytes) in block_00490000.c
// Multiplayer chat system with command IDs and macro text file loading.
// ============================================================================

export const CHAT_MACROS = {
  // Chat command IDs (switch cases in FUN_004923f0)
  commandIds: {
    cycleCivName:    0x2B0,       // cycle to next civ, show nickname          // 0x004923f0
    cycleCivTitle:   0x2B1,       // cycle to next civ, show title+leader name // 0x004923f0
    loadMacro1:      0x2B2,       // load from chatmac1.txt                    // 0x004923f0
    loadMacro2:      0x2B3,       // load from chatmac2.txt                    // 0x004923f0
    loadMacro3:      0x2B4,       // load from chatmac3.txt                    // 0x004923f0
  },

  // Macro text files
  macroFiles: [
    's_chatmac1_txt_0062c9a4',   // chatmac1.txt                              // 0x004923f0
    's_chatmac2_txt_0062c9b4',   // chatmac2.txt                              // 0x004923f0
    's_chatmac3_txt_0062c9c4',   // chatmac3.txt                              // 0x004923f0
  ],

  // Chat macro file reader: reads up to 0x100 (256) bytes per line
  macroReadBufferSize: 0x100,     // max bytes for chat message                // 0x0049275a

  // Civ cycling: wraps from 8 back to 1 (skips barbarians at 0)
  civCycleRange: { min: 1, max: 8 },  // cycles 1..7, wraps at 8              // 0x004923f0

  // Visibility checks for cycling: requires contact or embassy
  contactCheck: {
    embassyBit: 0x80,             // treaty byte0 bit for embassy              // 0x004923f0
    contactBit: 0x01,             // treaty byte0 bit for contact              // 0x004923f0
  },

  // sourceAddr: '0x004923F0'
};

// ============================================================================
// === INTELLIGENCE ADVISOR ===
// Binary ref: FUN_00493f0f @ 0x00493F0F (546 bytes) in block_00490000.c
// Intelligence advisor initialization, music selection, and object allocation.
// ============================================================================

export const INTELLIGENCE_ADVISOR = {
  // Object allocation
  objectSize: 0x108C,             // bytes allocated for advisor object         // 0x00493f0f

  // Music track selection
  musicFormula: {
    formula: '((turnNumber + civId) & 7) + 0x53',                              // 0x00493f0f
    turnAddr: 'DAT_006d1168',     // turn number                               // 0x00493f0f
    baseMusicId: 0x53,            // 83 decimal — added to masked value         // 0x00493f0f
    mask: 7,                      // low 3 bits = 8 possible tracks             // 0x00493f0f
  },

  // Background music for advisor panels (per-civ faction)
  panelMusic: {
    civTribeOffset: 'DAT_0061d1e8[abs(tribeId)]',                              // 0x00493f0f
    musicIdFormula: 'factionByte * 4 + 0x70',                                  // 0x00493f0f
    subPanelIds: 3,               // 3 sub-panels with music IDs +1, +2, +3    // 0x00493f0f
  },

  // Advisor panel setup: FUN_00494949 uses 640x480 (0x280 x 0x1E0)
  panelSize: {
    width: 0x280,                 // 640 pixels                                // 0x00494949
    height: 0x1E0,                // 480 pixels                                // 0x00494949
  },

  // Government sprite index: (govLevel + 200) used to load GIF frame
  govSpriteBase: 200,             // government level + 200 = sprite index     // 0x00494949

  // Intelligence tile grid: 7 columns x 3 rows, tile size 0x5A x 0x6E
  tileGrid: {
    columns: 7,                   // 7 columns of tiles                        // 0x004966c4
    rows: 3,                      // 3 rows of tiles                           // 0x004966c4
    tileWidth: 0x5A,              // 90 pixels per tile                        // 0x004966c4
    tileHeight: 0x6E,             // 110 pixels per tile                       // 0x004966c4
  },

  // Portrait: 0x40 x 0x40 (64x64) via FUN_0049488e
  portraitSize: 0x40,             // 64x64 pixel leader portrait               // 0x0049488e
  portraitSpriteBase: 299,        // sprite ID for portrait frame              // 0x0049488e

  // Military ranking: civRank - 1, with special case for rank 0
  militaryRankDisplay: {
    rankOffset: -1,               // display rank = internal rank - 1          // 0x00494b5f
    spriteBase: 0xD7,             // 215 decimal — base sprite for mil. rank   // 0x00494b5f
  },

  // Gender: 0x15 (21) entries per civ/government for female portrait offset
  femalePortraitOffset: 0x15,     // added to tile index for female leaders    // 0x00496ecf

  // sourceAddr: '0x00493F0F' (init), '0x004966C4' (render), '0x0049488E' (portrait)
};

// ============================================================================
// === PASSWORD ENCRYPTION ===
// Binary ref: FUN_004988b8 (encrypt, 139B), FUN_00498943 (decrypt, 144B),
//             FUN_00498784 (init, 167B) in block_00490000.c
// Password system for multiplayer: XOR + 5-bit rotation on 0x100-byte block.
// ============================================================================

export const PASSWORD_ENCRYPTION = {
  // Password block: 0x100 (256) bytes total at DAT_00654b74
  blockAddr: 'DAT_00654b74',
  blockSize: 0x100,               // 256 bytes total                           // 0x004988b8
  maxPlayers: 8,                  // 8 player slots                            // 0x00498784
  bytesPerPlayer: 0x20,           // 32 bytes per player password              // 0x00498784

  // Initialization (FUN_00498784): fill with rand(), then clear first byte of each player
  init: {
    fillRange: 0xFF,              // fill bytes 0..254 with rand() values      // 0x00498784
    clearInterval: 0x20,          // every 32nd byte set to 0 (password start) // 0x00498784
    statusArrays: {
      hasPassword: 'DAT_00673d18[player * 4]',  // 0 or 1                     // 0x00498784
      isLocked:    'DAT_00673d38[player * 4]',  // 0 or 1                     // 0x00498784
    },
  },

  // Encrypt (FUN_004988b8): forward scan, XOR with index, 5-bit right rotation
  encrypt: {
    direction: 'forward',         // loop 0..255                               // 0x004988b8
    xorWithIndex: true,           // byte[i] ^= i                              // 0x004988b8
    rotateRight: 5,               // bits: (byte >> 3) | (prevByte << 5)       // 0x004988b8
    carrySource: 'previous byte (with wraparound from byte[255])',             // 0x004988b8
  },

  // Decrypt (FUN_00498943): reverse scan, undo rotation then XOR
  decrypt: {
    direction: 'reverse',         // loop 255..0                               // 0x00498943
    rotateLeft: 3,                // undo: (byte << 3) | (nextByte >> 5)       // 0x00498943
    xorWithIndex: true,           // byte[i] ^= i                              // 0x00498943
    carrySource: 'next byte (with wraparound from byte[0])',                   // 0x00498943
  },

  // Password dialog string IDs
  dialogStrings: {
    setNew: 0x26C,                // "Enter new password"                      // 0x0049836a
    enterExisting: 0x26D,         // "Enter current password"                  // 0x0049836a
    verify: 0x26B,                // "Verify password"                         // 0x004985f4
  },

  // sourceAddr: '0x004988B8' (encrypt), '0x00498943' (decrypt), '0x00498784' (init)
};

// ============================================================================
// === CITY PREFERENCES ===
// Binary ref: load_city_preferences @ 0x00498D40 (326 bytes) in block_00490000.c
// Loads CITYPREF.TXT with NODEFEND and AUTOBUILD sections.
// ============================================================================

export const CITY_PREFERENCES = {
  file: 'CITYPREF.TXT',          // s_CITYPREF_TXT_0062ccd4                   // 0x00498d40

  // NODEFEND section: cities that should not be defended
  nodefend: {
    sectionKey: 'NODEFEND',       // s_NODEFEND_0062ccc8                       // 0x00498d40
    flagAddr: 'DAT_0062ccc4',     // set to 1 if section found                 // 0x00498d40
  },

  // AUTOBUILD section: list of building names to auto-build
  autobuild: {
    sectionKey: 'AUTOBUILD',      // s_AUTOBUILD_0062cce4                      // 0x00498d40
    maxEntries: 0x20,             // 32 max auto-build entries                 // 0x00498d40
    buildingIdRange: { min: 1, max: 0x26 },  // building IDs 1..38            // 0x00498d40
    entryArrayAddr: 'DAT_00673d70',  // byte[32] building ID list              // 0x00498d40
    countAddr: 'DAT_0062ccc0',    // current number of entries                 // 0x00498d40
    matchMethod: '_strcmpi against building name from string table',           // 0x00498d40
    buildingNameTable: 'DAT_0064c488[buildingId * 8]',                         // 0x00498d40
  },

  // sourceAddr: '0x00498D40'
};

// ============================================================================
// === TURN PROCESSING ===
// Binary ref: FUN_00487371 @ 0x00487371 (1744 bytes) in block_00480000.c
// Per-turn processing: barbarians, pollution, power graph, historian reports,
// diplomatic attitude decay, spaceship arrival.
// ============================================================================

export const TURN_PROCESSING = {
  // Turn 0 skips barbarians/pollution/power graph
  skipOnFirstTurn: true,          // if (DAT_00655af8 != 0)                    // 0x00487371

  // Turn increment and year calculation
  turnIncrement: {
    turnAddr: 'DAT_00655af8',     // current turn counter                      // 0x00487371
    yearAddr: 'DAT_00655afa',     // current year (computed from turn)          // 0x00487371
    yearCalcFn: 'FUN_00484fec',   // turn-to-year conversion                   // 0x00487371
  },

  // Score milestone: after turn 199, increment DAT_00655b14 each turn
  scoreMilestone: {
    threshold: 199,               // turn > 199 triggers score increment       // 0x00487371
    scoreAddr: 'DAT_00655b14',    // incremented score counter                 // 0x00487371
  },

  // Diplomatic attitude decay: every (difficulty+1)*12 turns
  diplomaticDecay: {
    formula: '(difficulty + 1) * 12',  // 0xC = 12                             // 0x00487371
    halfDecayFormula: '(difficulty + 1) * 24',  // 0x18 = 24                   // 0x00487371
    decayAmount: -1,              // reduce attitude by 1                       // 0x00487371
    clampToGovernment: true,      // clamp attitude to range [0, govLevel]     // 0x00487371
    techIdForHalfDecay: 0x14,     // Democracy tech — halves decay interval    // 0x00487371
  },

  // Historian report timing
  historianReport: {
    nextReportAddr: 'DAT_00655c1e',  // turn number of next report             // 0x00487371
    intervalFormula: 'currentTurn + rand(0,39) + 20',  // 0x28=40, 0x14=20     // 0x00487371
    minInterval: 20,              // minimum 20 turns between reports           // 0x00487371
    maxInterval: 59,              // maximum 59 turns between reports           // 0x00487371
    soundEvent: 5,                // sound event ID for historian               // 0x00487371
  },

  // Spaceship arrival check
  spaceshipArrival: {
    spaceshipCheckFn: 'FUN_004a7577 (has launched) + FUN_004a75d5 (has arrived)',
    victoryFlag: 0x04,            // DAT_0064caa0[civ * 0x594] |= 4           // 0x00487371
    landedFlag: 0x10,             // DAT_0064caa0[civ * 0x594] |= 0x10        // 0x00487371
    soundEvent: 6,                // sound event for landing                    // 0x00487371
    dialogKey: 'EAGLEHASLANDED',  // s_EAGLEHASLANDED_0062c5f8                 // 0x00487371
  },

  // sourceAddr: '0x00487371'
};

// ============================================================================
// === YEAR CALCULATION ===
// Binary ref: FUN_00484fec @ 0x00484FEC (540 bytes) in block_00480000.c
// Piecewise-linear turn-to-year conversion with per-difficulty tables.
// Also: FUN_00485208 (month display, 479 bytes) for scenario calendar.
// ============================================================================

export const YEAR_CALCULATION = {
  // Year table: at DAT_0062c490, stride 0x48 (72) per difficulty, 6 periods
  yearTable: {
    baseAddr: 'DAT_0062c490',     // start of year table                       // 0x00484fec
    stridePerDifficulty: 0x48,    // 72 bytes per difficulty level              // 0x00484fec
    periodsPerLevel: 6,           // 6 piecewise periods                       // 0x00484fec
    entryStride: 0x0C,            // 12 bytes per period entry                 // 0x00484fec
    fields: {
      startYear:  'DAT_0062c490 + period * 0xC + difficulty * 0x48',           // 0x00484fec
      turnCount:  'DAT_0062c494 + period * 0xC + difficulty * 0x48',           // 0x00484fec
      yearsPerTurn: 'DAT_0062c498 + period * 0xC + difficulty * 0x48',         // 0x00484fec
    },
    // After all 6 periods exhausted: year = lastYear + lastRate*lastCount + remainingTurns
    overflowFormula: 'DAT_0062c4cc + DAT_0062c4d0 * DAT_0062c4d4 + remainingTurns',
  },

  // Difficulty adjustment
  difficultySource: 'DAT_00655b08',  // difficulty level 0..5                  // 0x00484fec
  scenarioFlags: 'DAT_00655af0',     // bit 2 = adjust -1, bit 3 = adjust +1  // 0x00484fec
  scenarioOffsetTurn: 'DAT_00655afc', // if >= 0, subtract from turn           // 0x00484fec

  // Scenario calendar mode: when DAT_00655af0 & 0x80 and DAT_0064bcb4/b6 set
  scenarioCalendar: {
    condition: '(DAT_00655af0 & 0x80) && DAT_0064bcb4 && DAT_0064bcb6',       // 0x00484fec
    formula: 'DAT_0064bcb6 + turn * abs(DAT_0064bcb4) - 1',                   // 0x00484fec
  },

  // Zero-year avoidance: if calculated year == 0, return 1 instead
  zeroYearFix: true,              // year 0 becomes year 1                     // 0x00484fec

  // Month display (FUN_00485208): scenario mode shows month names
  monthDisplay: {
    monthStringIds: {
      positive: { base: 0x1A4, formula: 'month % 12 + 0x1A4' },  // Jan=0x1A4 // 0x00485208
      negative: { base: 0x1AF, formula: '0x1AF - abs(month % 12)' },          // 0x00485208
    },
    monthsPerYear: 12,            // 0x0C                                      // 0x00485208
    yearDivisor: 12,              // divide by 12 for year portion             // 0x00485208
  },

  // sourceAddr: '0x00484FEC' (year calc), '0x00485208' (month display)
};

// ============================================================================
// === BARBARIAN SPAWNING ===
// Binary ref: FUN_00485c15 @ 0x00485C15 (3297 bytes) in block_00480000.c
// Per-turn barbarian unit spawning in unsettled territory and near cities.
// ============================================================================

export const BARBARIAN_SPAWNING = {
  // Barbarian level: DAT_00655b09 (0=off, 1=roaming, 2=restless, 3=raging)
  levelAddr: 'DAT_00655b09',

  // Timing formula: when barbarians start spawning
  timingFormula: {
    // For difficulty < 5 (Chieftain..Emperor):
    normal: '((3 - barbLevel) * 3 + 0x1E) * (5 - difficulty)',                 // 0x00485c15
    // For difficulty >= 5 (Deity):
    deity: '(3 - barbLevel) * 3 + 0x0F',                                       // 0x00485c15
  },

  // Frequency mask: determines how often spawning occurs
  frequencyMask: {
    level1: 0x0F,                 // roaming: every 16 turns (turn & 0xF == 0) // 0x00485c15
    level2: 0x07,                 // restless: every 8 turns                   // 0x00485c15
    level3: 0x07,                 // raging: every 8 turns                     // 0x00485c15
  },

  // Wilderness spawning: place barbarian in random empty terrain
  wildernessSpawn: {
    maxAttempts: 1000,            // give up after 1000 placement attempts     // 0x00485c15
    minOceanTiles: 0x10,          // tile must have >= 16 in ocean count       // 0x00485c15
    yMargin: 3,                   // avoid 3 rows from poles                   // 0x00485c15
    unitCountFormula: 'turn / (0xFA - barbLevel * 0x32) + 1, clamped [1, 5]', // 0x00485c15
    extraAtRaging: 1,             // raging adds +1 to unit count              // 0x00485c15
  },

  // Unit types for wilderness spawning
  unitTypes: {
    base: 0x20,                   // Barbarian basic unit (32)                 // 0x00485c15
    withExpansion1: 0x21,         // with DAT_00655bbb set                     // 0x00485c15
    withExpansion2: 0x23,         // with DAT_00655baf set                     // 0x00485c15
    escort: 0x2E,                 // escort/leader unit (46)                   // 0x00485c15
  },

  // City-based spawning: barbarian uprising near random city
  citySpawn: {
    searchRadius: 0x0D,           // 13-tile search radius around city         // 0x00485c15
    maxAttempts: 'barbLevel * 0x32',  // 50/100/150 by level                   // 0x00485c15
    minCitySize: 2,               // clamp unit count to min 2                 // 0x00485c15
    maxCitySize: 99,              // clamp unit count to max 99                // 0x00485c15
    ragingBonusTurnThreshold: 0x95, // 149 turns for raging bonus              // 0x00485c15
  },

  // Advanced unit types for city-based spawning
  advancedUnits: {
    landBasic: 0x0F,              // basic land attack unit                    // 0x00485c15
    landExpansion: 0x10,          // land unit with expansion flag             // 0x00485c15
    mounted: 0x12,                // mounted attack unit                       // 0x00485c15
    naval: 0x13,                  // naval barbarian unit                      // 0x00485c15
    advanced: 0x14,               // advanced era barbarian                    // 0x00485c15
    modernOffense: 0x15,          // modern offense                            // 0x00485c15
    modernDefense: 0x19,          // modern defense                            // 0x00485c15
    cavalry: 0x18,                // cavalry/mounted                           // 0x00485c15
    artilleryCavalry: 0x08,       // siege unit for cavalry civ                // 0x00485c15
    artillerySea: 0x0B,           // naval siege unit                          // 0x00485c15
  },

  // Veteran flag: 50% chance of veteran status on spawned unit
  veteranChance: '50% (rand() % 2 == 0 → set bit 0x2000 on unit flags)',      // 0x00485c15

  // Notification
  alertDialogKey: 'BARBARIANS',   // s_BARBARIANS_0062c5d0                     // 0x00485c15
  mpMessageId: 0x72,              // network message for barbarian alert       // 0x00485c15

  // sourceAddr: '0x00485C15'
};

// ============================================================================
// === POLLUTION AND GLOBAL WARMING ===
// Binary ref: FUN_00486c2e (pollution, 487B), FUN_004868fb (warming, 819B)
// in block_00480000.c. Pollution counter and terrain degradation events.
// ============================================================================

export const POLLUTION_AND_WARMING = {
  // Pollution counter: DAT_00655b0e, increments/decrements based on output
  pollutionCounter: {
    addr: 'DAT_00655b0e',         // char: pollution counter                   // 0x00486c2e
    formula: 'DAT_00655b12 - DAT_00655b10 + DAT_00655b10 / 2',
    multiCivDivisor: 'numAliveCivs',  // divided by alive civ count            // 0x00486c2e
    netFormula: '(pollutionScore * 2 - DAT_00655b0f * 4) - nuclearPlantCities',
    nuclearPlantBuildingId: 0x1D, // building 29: Nuclear Plant                // 0x00486c2e
    clampRange: { min: 0, max: 99 },  // clamped to 0..99                     // 0x00486c2e
  },

  // Warning threshold
  warningThreshold: 12,           // 0x0C: warning shown when counter == 12    // 0x00486c2e
  warningMinPollution: 6,         // only warn if pollutionScore > 6           // 0x00486c2e
  warningSoundEvent: 4,           // sound event for pollution warning         // 0x00486c2e
  warningDialogKey: 'FEARWARMING', // s_FEARWARMING_0062c5ec                   // 0x00486c2e

  // Global warming event threshold
  eventThreshold: 0x10,           // 16: warming event triggers when > 16      // 0x00486c2e
  warmingCounterAddr: 'DAT_00655b0f',  // incremented on each warming event    // 0x00486c2e
  warmingSoundEvent: 3,           // sound event for global warming            // 0x004868fb
  warmingDialogKey: 'GLOBALWARMING',  // s_GLOBALWARMING_0062c5dc              // 0x004868fb

  // Terrain degradation (FUN_004868fb)
  terrainDegradation: {
    neighborScanRange: 0x14,      // 20 neighbors checked for land adjacency   // 0x004868fb
    landThreshold: 'if adjacentLand < (7 - warmingCount)',                     // 0x004868fb
    hashFormula: '(x * 3 - y * 3) & 7 == warmingCount',                       // 0x004868fb
    degradeSteps: {
      terrain0or1: 'set terrain to 0, then set special terrain to 1',          // 0x004868fb
      terrain2: 'set terrain to 1',                                            // 0x004868fb
      terrain3: 'set terrain to 9 and clear improvements (0x0C mask)',         // 0x004868fb
    },
    clearImprovementsMask: 0x0C,  // clear bits 2-3 (irrigation + mining)      // 0x004868fb
  },

  // sourceAddr: '0x00486C2E' (pollution), '0x004868FB' (warming event)
};

// ============================================================================
// === RESEARCH COST ===
// Binary ref: FUN_00486e15 @ 0x00486E15 (90 bytes) in block_00480000.c
// Formula for research cost based on tech level and difficulty.
// ============================================================================

export const RESEARCH_COST = {
  // Formula: sum((7 - difficulty) * i for i in 0..techLevel) / 2 + 1
  formula: {
    difficultyFactor: '7 - difficulty',  // DAT_00655b08                       // 0x00486e15
    summation: 'sum of (7-diff) * i for i = 0 to techLevel',                  // 0x00486e15
    divisor: 2,                   // divide sum by 2                           // 0x00486e15
    addend: 1,                    // add 1 to result                           // 0x00486e15
    pseudocode: 'total = 0; for (i = 0; i <= techLevel; i++) total += (7-diff)*i; return total/2 + 1',
  },

  // Tech level threshold for auto-research
  autoResearchThreshold: {
    minTurns: '(difficulty * 20) + 1',  // DAT_0064bc56 * 0x14 + 1            // 0x00486e6f
    maxTechLevel: 0x26,           // 38 max tech level                         // 0x00486e6f
    autoResearchFlag: 0x02,       // DAT_00655aea bit for auto-research        // 0x00486e6f
  },

  // sourceAddr: '0x00486E15'
};

// ============================================================================
// === POWER GRAPH BINARY DETAILS ===
// Binary ref: FUN_004853e7 @ 0x004853E7 (2094 bytes) in block_00480000.c
// Power graph data storage, scoring composition, and ranking computation.
// Supplements the POWER_GRAPH export above with exact scoring formulas.
// ============================================================================

export const POWER_GRAPH_BINARY = {
  // Power graph data array
  dataArray: {
    addr: 'DAT_00655c38',         // byte[150 * 8]: power data per turn/civ   // 0x004853e7
    maxTurns: 150,                // 0x96 turns of history                     // 0x004853e7
    civsPerTurn: 8,               // 8 civs (0..7)                             // 0x004853e7
    indexFormula: '(turn / 4) % 150 * 8 + civId',  // for normal games        // 0x004853e7
    scenarioFormula: '(turn / 2) % 150 * 8 + civId',  // for scenarios        // 0x004853e7
    turnDivisorNormal: 4,         // divide turn by 4 for index               // 0x004853e7
    turnDivisorScenario: 2,       // divide turn by 2 for scenarios           // 0x004853e7
    maxTurnNormal: 600,           // 600 turns max for normal                  // 0x004853e7
    maxTurnScenario: 0x4B,        // 75 turns max for scenarios                // 0x004853e7
  },

  // Power score composition (non-scenario)
  scoring: {
    techWeight: 3,                // numTechs * 3                              // 0x004853e7
    militaryWeight: 8,            // numCities * 8                             // 0x004853e7
    treasuryWeight: '>> 5',       // treasury / 32                             // 0x004853e7
    unitStrengthFormula: 'sum over all unit types: unitCount * (attack+defense+1)/2 * movePoints/2',
    unitTypeStride: 0x14,         // 20 bytes per unit type definition         // 0x004853e7
    maxUnitTypes: 0x3E,           // 62 unit types                             // 0x004853e7
  },

  // Ranking array
  ranking: {
    addr: 'DAT_00655c22',         // byte[8]: rank per civ (0=first)           // 0x004853e7
    formula: 'rank = 8 - sortPosition',  // 0x08 - local_28                    // 0x004853e7
    inverseAddr: 'DAT_00655c2a',  // byte[8]: civId per rank position          // 0x004853e7
  },

  // Leader civ tracking
  leaderCiv: {
    bestHumanAddr: 'DAT_00655c20', // best human civ rank index                // 0x004853e7
    worstHumanAddr: 'DAT_00655c21', // worst human civ rank index              // 0x004853e7
    topAiAddr: 'DAT_00655c31',    // top-ranked AI civ                         // 0x004853e7
  },

  // AI domination check: triggers alpha-strike diplomacy
  dominationCheck: {
    minCities: 4,                 // top AI must have > 4 cities               // 0x004853e7
    minTurns: 200,                // must be past turn 200                     // 0x004853e7
    minDifficulty: 1,             // difficulty must be > 0                    // 0x004853e7
    vendettaFlag: 0x20,           // treaty flag for vendetta/hatred           // 0x004853e7
  },

  // sourceAddr: '0x004853E7'
};

// ============================================================================
// === GAME END CONDITIONS ===
// Binary ref: FUN_0048aedc @ 0x0048AEDC (649 bytes) in block_00480000.c
// Retirement and scenario-end conditions.
// ============================================================================

export const GAME_END_CONDITIONS = {
  // Normal game retirement
  planRetireYear: 2000,           // DAT_00655afa == 2000                      // 0x0048aedc
  forceRetireYear: 0x7E4,        // 2020 decimal                              // 0x0048aedc

  // Sound events
  planRetireSoundEvent: 9,        // sound event for plan retirement           // 0x0048aedc
  forceRetireSoundEvent: 10,      // sound event for forced retirement         // 0x0048aedc

  // Dialog keys
  planRetireDialogKey: 'PLANRETIRE',   // s_PLANRETIRE_0062c6f8               // 0x0048aedc
  forceRetireDialogKey: 'DORETIRE',    // s_DORETIRE_0062c704                 // 0x0048aedc

  // On forced retirement: set game-over flag
  gameOverFlags: {
    gameEndedBit: 0x02,           // DAT_00655af0 |= 2                         // 0x0048aedc
    endReason: 5,                 // DAT_0064b1ac = 5                          // 0x0048aedc
  },

  // Scenario end conditions
  scenarioEnd: {
    warningTurnsBeforeEnd: 5,     // DAT_0064bcb8 - 5 = warning turn          // 0x0048aedc
    warningSoundEvent: 7,         // sound event for scenario warning          // 0x0048aedc
    endSoundEvent: 8,             // sound event for scenario end              // 0x0048aedc
    warningDialogKey: 'SCENARIOENDS', // s_SCENARIOENDS_0062c6dc              // 0x0048aedc
    endDialogKey: 'SCENARIOEND',  // s_SCENARIOEND_0062c6ec                   // 0x0048aedc
    scenarioTurnAddr: 'DAT_0064bcb8',  // scenario end turn                   // 0x0048aedc
  },

  // sourceAddr: '0x0048AEDC'
};

// ============================================================================
// === COUNCIL MEETING ===
// Binary ref: FUN_0048aa24 @ 0x0048AA24 (1208 bytes) in block_00480000.c
// Periodic council/advisor meeting and tutorial triggers.
// ============================================================================

export const COUNCIL_MEETING = {
  // Council timing: every 50 turns (0x32)
  interval: 0x32,                 // 50 turns between council meetings         // 0x0048aa24
  formula: '(turn - 1) / 0x32, remainder == 0',                               // 0x0048aa24
  minTurn: 2,                     // must be turn > 1                          // 0x0048aa24

  // Council meeting requires a city — randomly selects largest
  citySelection: {
    method: 'find largest city, weighted by size (doubled if has Palace)',      // 0x0048aa24
    palaceBuildingId: 1,          // Palace = building 1, doubles weight       // 0x0048aa24
  },

  // Council dialog key
  dialogKey: 'COUNCILTIME',       // s_COUNCILTIME_0062c6a4                    // 0x0048aa24
  enableFlag: 0x10,               // DAT_00655aea bit for council enabled      // 0x0048aa24

  // Tutorial triggers (in same function)
  tutorial: {
    firstMoveTurn: 1,             // turn 1: show FIRSTMOVE tutorial           // 0x0048aa24
    help1Turns: [0x14, 0x3C],     // turns 20, 60: show HELP1                  // 0x0048aa24
    help2Turns: [0x28, 0x50],     // turns 40, 80: show HELP2                  // 0x0048aa24
    oneCityTurn: 0x23,            // turn 35: suggest building city             // 0x0048aa24
    expandInterval: 0x18,         // 24 turns without new city → EXPAND0       // 0x0048aa24
    maxCitiesForExpand: 6,        // only suggest if < 6 cities                // 0x0048aa24
  },

  // sourceAddr: '0x0048AA24'
};

// ============================================================================
// === MP SYNC ===
// Binary ref: FUN_004824e3 (server quit, 577B), FUN_004828a5 (client transfer, 2021B)
// in block_00480000.c. Multiplayer synchronization constants.
// ============================================================================

export const MP_SYNC = {
  // Player slot structure
  playerSlots: {
    maxPlayers: 7,                // slots 1..6 (loop < 7)                     // 0x004824e3
    slotStride: 0x54,             // 84 bytes per player slot                  // 0x004824e3
    slotArrayAddr: 'DAT_006ad30c', // base of player slot array                // 0x004824e3
    activeSlotAddr: 'DAT_006ad358', // active slot indicator                   // 0x004824e3
    socketMapAddr: 'DAT_006ad558', // int[8]: socket handle per civ            // 0x004824e3
    playerCountAddr: 'DAT_006ad308', // current player count                   // 0x004824e3
  },

  // Network flush timeout
  flushTimeout: 60000,            // XD_FlushSendBuffer(60000) ms              // 0x004824e3
  fastFlushTimeout: 5000,         // XD_FlushSendBuffer(5000) ms               // 0x0048a416

  // Server quit protocol
  serverQuit: {
    disconnectMsgId: 0x0E,        // message type for disconnect               // 0x004824e3
    transferMsgId: 0x0F,          // message type for host transfer            // 0x004824e3
    hostTransferMsgId: 0x16,      // announce new host                         // 0x004824e3
    refreshMsgId: 0x04,           // refresh game state                        // 0x004824e3
    waitDialogKey: 'SERVERQUITWAIT', // s_SERVERQUITWAIT_0062bf34              // 0x004824e3
  },

  // Alive bitmask check
  aliveCheckFormula: '~(1 << civId) & aliveBitmask',                           // 0x004824e3
  nextPlayerFormula: '((currentTurn + 1) >> 31 ^ abs(currentTurn + 1)) & 7',  // 0x004824e3

  // sourceAddr: '0x004824E3' (server quit), '0x004828A5' (client transfer)
};

// ============================================================================
// === COSMIC RULE DEFAULTS ===
// Binary ref: FUN_00484cc0 @ 0x00484CC0 (123 bytes) in block_00480000.c
// Default values for cosmic rules and scenario flags.
// ============================================================================

export const COSMIC_RULE_DEFAULTS = {
  defaults: {
    scenarioFlags1: 0,            // DAT_0064bc60 = 0                          // 0x00484cc0
    scenarioFlags2: 0,            // DAT_0064bc62 = 0                          // 0x00484cc0
    roadTradeMultiplier: 10,      // DAT_0064bcb2 = 10 (default road bonus)    // 0x00484cc0
    scenarioCustom1: 0,           // DAT_0064bcb4 = 0                          // 0x00484cc0
    scenarioCustom2: 0,           // DAT_0064bcb6 = 0                          // 0x00484cc0
    scenarioCustom3: 0,           // DAT_0064bcb8 = 0                          // 0x00484cc0
    scenarioCustom4: 0,           // DAT_0064bcba = 0                          // 0x00484cc0
  },

  // Extra defaults: 4 bytes at DAT_0064bcbc cleared to 0
  extraDefaults: {
    addr: 'DAT_0064bcbc',
    count: 4,                     // 4 values cleared                          // 0x00484cc0
  },

  // sourceAddr: '0x00484CC0'
};

// ============================================================================
// === ROAD CONNECTIVITY CHECK ===
// Binary ref: FUN_00488a45 @ 0x00488A45 (682 bytes) in block_00480000.c
// A* pathfinding for road/railroad connectivity between two cities.
// ============================================================================

export const ROAD_CONNECTIVITY = {
  // Distance check: max 23 tiles (0x17) for road connection check
  maxDistanceTiles: 0x17,         // 23 tiles — reject if farther             // 0x00488a45

  // Pathfinding: A* with max 50 steps (0x32)
  maxSteps: 0x32,                 // 50 maximum path steps                     // 0x00488a45
  pathCostLimit: 99,              // max cost parameter to pathfinder          // 0x00488a45

  // Pathfinding setup
  pathfinderConfig: {
    goalTrackingAddr: 'DAT_0062d040', // 1 = active, 0 = done                 // 0x00488a45
    goalXAddr: 'DAT_00673fa0',    // target X coordinate                       // 0x00488a45
    goalYAddr: 'DAT_00673fa4',    // target Y coordinate                       // 0x00488a45
    modeAddr: 'DAT_0062d03c',     // pathfinding mode (2 = road check)         // 0x00488a45
  },

  // Return values
  returnValues: {
    noConnection: 0,              // no road/rail path exists                   // 0x00488a45
    railroadOnly: 1,              // path uses only railroad                    // 0x00488a45
    roadConnection: 2,            // path uses road (possibly mixed with rail) // 0x00488a45
  },

  // Connectivity checks: road bit 0x10, railroad bit 0x20
  roadBit: 0x10,                  // tile improvement bit for road             // 0x00488a45
  railroadBit: 0x20,             // tile improvement bit for railroad          // 0x00488a45

  // Same-landmass check required before pathfinding
  landmassCheckFn: 'FUN_005b8aa8', // returns landmass ID for (x, y)          // 0x00488a45

  // sourceAddr: '0x00488A45'
};

// ============================================================================
// === AI PRODUCTION URGENCY FORMULAS ===
// Binary ref: FUN_004ec312 @ block_004E0000.c lines 5525-5577 (city turn processing)
// ============================================================================
// When the AI evaluates how urgently a city should rush-buy or prioritize shield
// production, it uses the civ's total treasury (DAT_0064c6a2[civ * 0x594]) as
// a base and applies bit-shift divisors depending on what is being built.
// local_34 = urgency value; local_84 = civ index; local_24 = production item.
// DAT_006a657c = shield cost multiplier; DAT_0064c6a2 = civ treasury.

export const AI_PRODUCTION_URGENCY = {
  // --- Wonder production (local_24 > 0x26, i.e., item index > 38 = wonder slot) ---
  wonderBase: {
    divisor: 64,                 // treasury >> 6                              // line 5525
    condition: 'item is a wonder AND matching domain AND no treaty conflict',
    note: 'Base urgency for wonder production',
  },
  wonderWithCompetition: {
    divisor: 128,                // treasury >> 7                              // line 5538
    condition: 'another civ is also building this wonder AND has more progress',
    note: 'Higher divisor (lower urgency) when behind in wonder race',
  },
  spaceshipOverproduction: {
    divisor: 256,                // treasury >> 8                              // line 5535
    condition: 'spaceship part AND civ already has more parts than the threshold',
    note: 'Reduces urgency when civ already has excess spaceship parts',
  },
  spaceshipWithCompetition: {
    divisor: 128,                // treasury >> 7                              // line 5548
    condition: 'spaceship part (0x23..0x26) AND another civ is also building spaceship',
    note: 'Urgency when competing in space race',
  },
  doubleUrgencyThreshold: {
    value: 0x9C3,                // 2499                                       // line 5540
    effect: 'urgency <<= 1 (doubled)',
    condition: 'treasury > 2499',
    note: 'Rich civs double their wonder/spaceship urgency',
  },

  // --- Coastal city / capitulation urgency ---
  coastalCapitulation: {
    divisor: 8,                  // treasury >> 3                              // line 5559
    condition: '(city.flags & 1) != 0 AND item != 0 AND shields_in_box != 0',
    note: 'Coastal cities with civil disorder and active production get high urgency',
  },

  // --- Defensive / city-under-threat urgency ---
  underThreat: {
    divisor: 8,                  // treasury >> 3                              // line 5566
    condition: 'no landmass connection OR (city.flags & 0x20) set, AND valid production AND shields > 0',
    note: 'Isolated or threatened cities get high urgency for military production',
  },

  // --- Capitulation building (item == 1, i.e., Barracks) ---
  barracksUrgency: {
    divisor: 8,                  // treasury >> 3                              // line 5569
    condition: 'item == 1 AND shields_in_box != 0',
    note: 'Barracks always get high urgency when being built',
  },

  // --- Empty production queue ---
  emptyQueue: {
    divisor: 16,                 // treasury >> 4                              // line 5573
    condition: 'production item is "-" (0x2D) AND civ has no government AND shields > 0',
    note: 'Cities with nothing queued and no government get moderate urgency',
  },

  // --- Late-game extra urgency ---
  lateGameBonus: {
    divisor: 512,                // treasury >> 9                              // line 5576
    condition: 'treasury > 2000',
    formula: 'urgency += treasury >> 9',
    note: 'Additive bonus for rich civs (treasury > 2000), not a replacement',
  },

  // --- Clamping and application ---
  clampFormula: 'urgency = clamp(0, urgency, shieldCost - shields_in_box)',     // line 5578
  application: {
    formula: 'shields_in_box += urgency',                                        // line 5579-5580
    goldCost: 'goldSpent = DAT_00655b08 * urgency / 10 / (8 - civRank)',        // line 5581-5582
    note: 'AI "rush-buys" by converting treasury to shields at a rate based on difficulty and civ rank',
  },

  sourceAddr: '0x004EC312',
};

// ============================================================================
// === UNIT COMBAT FLAGS (status bitfield at offset +0x04, uint16) ===
// Binary ref: DAT_006560F4 with stride 0x20 (UNIT_RECORD_FIELDS.flags)
// ============================================================================
// The unit record flags field is a 16-bit value spanning bytes +4 (low byte,
// "movementFlags" in parser) and +5 (high byte, "statusFlags" in parser).
// These two bits are used in combat/AI evaluation but were previously undocumented.

export const UNIT_COMBAT_FLAGS = {
  // --- Bit 0x80 (bit 7 of byte +4 / movementFlags) ---
  GOTO_ARRIVED: {
    mask: 0x80,
    byte: 'movementFlags (offset +4)',
    meaning: 'Unit has reached its goto/rally destination',
    setBy: [
      'FUN_004c4e70 (unit movement) — set when current pos == goto pos AND not fortified, order → 0xFF',
      'FUN_005335ea (AI rally processing) — set when unit position matches rally point coords, order → 0x10',
      'FUN_00535e10 (AI sentry processing) — set when sentry unit reaches goto destination, order → 0xFF',
    ],
    clearedBy: 'FUN_004c4e70 — cleared (& 0xFF7F) when unit starts moving toward goto',
    checkedBy: [
      'block_00530000.c:4479 — AI uses this to determine if unit has arrived for defense evaluation',
    ],
    sourceAddr: '0x004C4E70, 0x005335EA, 0x00535E10',
  },

  // --- Bit 0x100 (bit 0 of byte +5 / statusFlags) ---
  WAS_FORTIFIED: {
    mask: 0x100,
    byte: 'statusFlags (offset +5)',
    meaning: 'Unit was fortifying/fortified before AI reassigned it temporarily',
    setBy: [
      'FUN_005335ea (AI turn start) — set when unit order is 0x01 (fortifying) or 0x02 (fortified) AND max movement < 99',
    ],
    clearedBy: [
      'FUN_00590790 (AI action completion) — cleared (& 0xFEFF) when unit has a new task to perform',
    ],
    checkedBy: [
      'block_00570000.c:6012 — defense unit selection: unit with this flag can be selected even without remaining moves',
      'block_00590000.c:1261 — when AI unit finishes action: if set, restores order to 0x02 (fortified)',
      'block_00530000.c:2763 — AI attack decision: unit with this flag considered as committed defender',
      'block_00530000.c:2789 — AI attack decision: unit WITHOUT this flag and in threatened city considered vulnerable',
      'block_00530000.c:4756 — AI unit processing: affects unit assignment to defensive roles',
      'block_00530000.c:5450 — AI sentry: affects whether unit stays on sentry duty',
      'block_00530000.c:5515 — AI patrol: unit with this flag included in patrol eligibility',
      'block_00530000.c:1789 — AI rally: checked when deciding if unit should respond to rally point',
    ],
    sourceAddr: '0x005335EA, 0x00590790, 0x00570000+6012',
  },
};
