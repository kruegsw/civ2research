/**
 * Civ2 MGE AI Diplomacy -- Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra)
 *
 * Primary sources:
 * - FUN_00560084 (3,345B) -- AI diplomacy turn processing
 * - FUN_00560d95 (4,728B) -- Attitude scoring / diplomacy decisions
 * - FUN_00562021 (2,292B) -- Alliance/treaty proposals
 * - FUN_0055bbc0 (820B)   -- Border/war readiness scoring (calc_war_readiness)
 * - FUN_0055f7d1 (2,222B) -- AI military aid (unit gifting to allies)
 *
 * NOT executable code -- reference data only. Each constant includes its
 * binary address as a comment.
 *
 * Notation:
 *   param_1 = aiCiv (the AI evaluating), param_2 = humanCiv (being evaluated)
 *   civ_base = DAT_0064c6a0 (stride 0x594 per civ slot)
 *   treaty[A][B] = civ_base + A*0x594 + 0x20 + B*4 (4-byte flags per pair)
 *   leader[civ]  = DAT_006554f8[rulesCivNumber * 0x30] (stride 0x30)
 */

// ============================================================================
// === CIV DATA STRUCTURE OFFSETS ===
// Binary ref: DAT_0064c6a0 base, stride 0x594 per civ
// ============================================================================

export const CIV_STRUCT = {
  base:          0x0064c6a0,
  stride:        0x594,        // 1428 bytes per civ
  fields: {
    flags:         { offset: 0x00, size: 2, type: 'ushort',
                     notes: 'Bit 0=senate override, bit 2=senate toggle, bit 3+6=cleared each turn' },
    treasury:      { offset: 0x02, size: 4, type: 'int',       // @ DAT_0064c6a2
                     notes: 'Gold treasury' },
    rulesCivNumber:{ offset: 0x06, size: 2, type: 'short',     // @ DAT_0064c6a6
                     notes: 'Index into LEADERS.TXT (0-20), used to look up personality' },
    techCount:     { offset: 0x10, size: 1, type: 'byte',      // @ DAT_0064c6b0
                     notes: 'Number of techs discovered' },
    government:    { offset: 0x15, size: 1, type: 'byte',      // @ DAT_0064c6b5
                     notes: '0=Anarchy,1=Despot,2=Monarchy,3=Commun,4=Fundam,5=Republic,6=Democracy' },
    aiRandomSeed:  { offset: 0x16, size: 1, type: 'byte',      // @ DAT_0064c6b6
                     notes: 'rand()%100 rolled each turn for AI randomization' },
    tolerance:     { offset: 0x1E, size: 1, type: 'byte',      // @ DAT_0064c6be
                     notes: 'Per-civ tolerance value (derived from leader personality)' },
    patience:      { offset: 0x1F, size: 1, type: 'byte',      // @ DAT_0064c6bf
                     notes: 'Patience counter, decremented every 3 turns' },
    treatyFlags:   { offset: 0x20, size: 32, type: 'uint[8]',  // @ DAT_0064c6c0
                     notes: '4-byte treaty flags for each of 8 civs' },
    attitudes:     { offset: 0x48, size: 8,  type: 'char[8]',  // @ DAT_0064c6e8
                     notes: 'Signed byte: attitude toward each civ (-100..+100)' },
    cityCount:     { offset: 0x68, size: 2, type: 'short',     // @ DAT_0064c708
                     notes: 'Number of cities owned' },
    militaryPower: { offset: 0x6E, size: 2, type: 'ushort',    // @ DAT_0064c70e
                     notes: 'Aggregate military power score' },
    spaceshipFlag: { offset: 0x105, size: 1, type: 'byte',     // @ DAT_0064c7a5
                     notes: 'Non-zero if spaceship launched/active' },
    contactTurns:  { offset: 0x3E2, size: 16, type: 'short[8]',// @ DAT_0064ca82
                     notes: 'Last contact turn per civ pair, used for cooldowns' },
  },
};

// ============================================================================
// === GLOBAL DATA ADDRESSES ===
// ============================================================================

export const GLOBALS = {
  turnNumber:      0x00655af8, // short: current game turn
  humanBitmask:    0x00655b0b, // byte: bitmask of human-controlled civs
  aliveBitmask:    0x00655b0a, // byte: bitmask of alive civs
  difficulty:      0x00655b08, // byte: difficulty level (0=Chieftain..5=Deity)
  currentHumanCiv: 0x006d1da0, // int: civ slot of the currently active human
  mpVersion:       0x00655b02, // byte: save format / multiplayer version
  gamePaused:      0x00654fa8, // byte: game paused flag
  gameFlags:       0x00655af0, // byte: game/scenario flags (bit 0=scenario, bit 7=automation)
  scenarioFlags:   0x00655af0, // same as gameFlags, bit 7 = scenario override
  scenarioBits:    0x0064bc60, // byte: scenario-specific bits
  powerRanking:    0x00655c22, // byte[8]: per-civ power ranking 0-7 (7=strongest)
                                // @ FUN_004853e7: sorted by tech*3 + research*8 + gold/32 + unitValue
};

// ============================================================================
// === LEADER PERSONALITY TABLE ===
// Binary ref: DAT_006554f8, stride 0x30 per leader entry
// Indexed by rulesCivNumber (civ+0x06), maps to LEADERS.TXT order
// Confirmed at block_00420000.md:2422 and block_00560000.c:489-490
// ============================================================================

export const LEADER_PERSONALITY_STRUCT = {
  base:   0x006554f8,
  stride: 0x30,           // 48 bytes per leader entry
  fields: {
    expansionism: { offset: 0, size: 1, type: 'char', // @ DAT_006554f8
                    range: [-1, 0, 1],
                    notes: '-1=isolationist, 0=neutral, 1=expansionist' },
    militarism:   { offset: 1, size: 1, type: 'char', // @ DAT_006554f9
                    range: [-1, 0, 1],
                    notes: '-1=peaceful, 0=neutral, 1=aggressive (called "development" in some refs)' },
    tolerance:    { offset: 2, size: 1, type: 'char', // @ DAT_006554fa
                    range: [-1, 0, 1],
                    notes: '-1=intolerant, 0=neutral, 1=tolerant (called "aggression" in some refs)' },
  },
};

// Per-civ personality values (from LEADERS.TXT / Civ2 binary)
// Format: [expansionism, militarism, tolerance]
export const CIV_PERSONALITIES = [
  { id:  0, name: 'Romans',         expansionism:  1, militarism:  1, tolerance:  0 },
  { id:  1, name: 'Babylonians',    expansionism:  0, militarism: -1, tolerance:  1 },
  { id:  2, name: 'Germans',        expansionism:  1, militarism:  1, tolerance: -1 },
  { id:  3, name: 'Egyptians',      expansionism:  0, militarism:  0, tolerance:  0 },
  { id:  4, name: 'Americans',      expansionism:  1, militarism:  0, tolerance:  1 },
  { id:  5, name: 'Greeks',         expansionism:  0, militarism: -1, tolerance:  1 },
  { id:  6, name: 'Indians',        expansionism: -1, militarism: -1, tolerance:  1 },
  { id:  7, name: 'Russians',       expansionism:  1, militarism:  1, tolerance: -1 },
  { id:  8, name: 'Zulus',          expansionism:  1, militarism:  1, tolerance: -1 },
  { id:  9, name: 'French',         expansionism:  0, militarism:  0, tolerance:  0 },
  { id: 10, name: 'Aztecs',         expansionism:  1, militarism:  1, tolerance: -1 },
  { id: 11, name: 'Chinese',        expansionism:  1, militarism:  0, tolerance:  0 },
  { id: 12, name: 'English',        expansionism:  0, militarism:  0, tolerance:  0 },
  { id: 13, name: 'Mongols',        expansionism:  1, militarism:  1, tolerance: -1 },
  { id: 14, name: 'Celts',          expansionism:  0, militarism:  0, tolerance:  0 },
  { id: 15, name: 'Japanese',       expansionism:  1, militarism:  1, tolerance: -1 },
  { id: 16, name: 'Vikings',        expansionism:  1, militarism:  1, tolerance: -1 },
  { id: 17, name: 'Spanish',        expansionism:  1, militarism:  0, tolerance:  0 },
  { id: 18, name: 'Persians',       expansionism:  0, militarism:  0, tolerance:  0 },
  { id: 19, name: 'Carthaginians',  expansionism:  1, militarism:  0, tolerance:  0 },
  { id: 20, name: 'Sioux',          expansionism:  0, militarism:  1, tolerance: -1 },
];

// ============================================================================
// === TREATY FLAG BITS ===
// Binary ref: DAT_0064c6c0 (civ_base + 0x20 + otherCiv*4)
// Each treaty entry is 4 bytes (uint32). Bit assignments confirmed at
// block_00420000.md:2422 and cross-referenced across all diplomacy functions.
// ============================================================================

export const TREATY_FLAGS = {
  // --- Byte 0 (low byte) ---
  CONTACT:             0x01,  // bit 0:  have made contact
  CEASE_FIRE_BROKEN:   0x02,  // bit 1:  ceasefire broken (used in alliance logic)
  CEASEFIRE:           0x04,  // bit 2:  ceasefire active
  WAR:                 0x08,  // bit 3:  at war
  TRESPASS:            0x10,  // bit 4:  trespass/intrusion detected
  ALLIANCE_VIOLATION:  0x20,  // bit 5:  alliance violation / hatred flag
  PREV_VIOLATION:      0x40,  // bit 6:  previous alliance violation (saved across turns)
  EMBASSY:             0x80,  // bit 7:  embassy established

  // --- Byte 1 (bits 8-15) ---
  // 0x0100:  (bit 8)
  // 0x0200:  (bit 9)  "attacked" flag, cleared by alliance proposal loop
  PERIODIC_FLAG_10:    0x0400, // bit 10: cleared every 16 turns
  WAR_STARTED:         0x0800, // bit 11: war just started, cleared every 32 turns

  // --- Byte 2 (bits 16-23) ---
  ALLIANCE:            0x2000, // bit 13: formal alliance
  TRANSIENT_14:        0x4000, // bit 14: transient, cleared each turn @ 0xFF5FBFFF
  // 0x8000:  (bit 15)

  // --- Byte 3 (bits 24-31) ---
  PERIODIC_FLAG_18:    0x40000,  // bit 18: periodic, cleared for AI-AI each turn
  PERIODIC_FLAG_19:    0x80000,  // bit 19: cleared every 32 turns

  // --- Compound masks used in code ---
  WAR_DECLARATION_SET: 0x80840,  // set when declaring war via alliance violation
                                  // = WAR(0x08) | WAR_STARTED(0x800) | 0x80000
  CLEAR_WAR_BITS:      0xFFFFFFD9, // ~(CEASEFIRE|TRESPASS) = clear bits 1,2,5
  CLEAR_TRANSIENT:     0xFF5FBFFF, // clear bits 14, 17, 23 each turn
  WAR_OR_ALLIANCE:     0x2008,     // at war OR has alliance
  ALLIED_CHECK:        0x2000,     // alliance bit only
};

// ============================================================================
// === ATTITUDE SCORING ALGORITHM ===
// Binary ref: FUN_00560d95 @ block_00560000.c, lines 226-573
// Called once per AI civ per human civ per turn.
//
// param_1 = aiCiv, param_2 = humanCiv
// local_34 = running score (starts from borderScore when intruders detected,
//            otherwise from uninitialized stack -- effectively 0 in practice)
// local_c  = warCount (wars aiCiv is currently fighting)
// local_1c = techRankCount (civs with more techs than humanCiv)
// local_8  = allianceStrength (number of humanCiv's allies + power bonus)
// ============================================================================

export const ATTITUDE_SCORING = {
  // --- Overview ---
  // The final attitude value is set via set_attitude(aiCiv, humanCiv, score)
  // at @ 0x00561FC2. Score can be negative or positive; higher = more friendly.
  // The attitude value is stored as a signed byte at civ+0x48+humanCiv.

  // --- Phase 1: Border proximity base score ---
  // @ FUN_0055bbc0 (calc_war_readiness) runs first, sets DAT_006ab5e8
  // The border score accumulates: +1 per enemy unit near our city,
  // +1 for road, +1 for railroad, +1 for fortress, +1 for city tile,
  // +2 for airbase. Higher score = more threatened.
  baseScore: {
    description: 'Border proximity score from calc_war_readiness (DAT_006ab5e8)',
    address: '0x006ab5e8',
    notes: [
      'Set by FUN_0055bbc0 before attitude scoring begins (@ 0x00560D9D)',
      'If no intruders detected (DAT_00633ac8 == 0), score starts from uninitialized stack (likely 0)',
      'If intruders detected + no ceasefire: local_34 = borderScore (@ 0x00560E6E)',
      'If intruders detected + ceasefire + no intruder units: local_34 = borderScore - 1 (@ 0x00561240)',
    ],
  },

  // --- Phase 2: Pre-scoring data collection loop ---
  // @ 0x00561668 (LAB_00561668), lines 401-421
  preScoring: {
    description: 'Iterates all 7 civs to compute techRankCount, warCount, allianceStrength',
    techRankCount: {
      // local_1c: how many civs have more techs than humanCiv
      // @ 0x0056168A: if civ[otherCiv].techCount > civ[humanCiv].techCount, increment
      address: '0x0056168A',
      field: 'civ+0x10 (techCount, byte)',
      notes: 'Compared across all 7 civs; counts how many are ahead of human',
    },
    warCount: {
      // local_c: how many civs aiCiv is at war with
      // @ 0x005616AA: calls count_wars_between(aiCiv, otherCiv) [FUN_00467af0]
      address: '0x005616AA',
      notes: 'Uses FUN_00467af0 to check war status',
    },
    allianceStrength: {
      // local_8: sum of alliance bonuses for humanCiv
      // @ 0x005616BE: if treaty byte1 & 0x20 (alliance with human), +1
      // @ 0x005616D8: if human.militaryPower < ally.militaryPower, +1 more (total +2)
      address: '0x005616BE',
      formula: 'for each civ allied with humanCiv: +1, and if ally is militarily stronger: +1 more',
      field: 'civ+0x6E (militaryPower, ushort)',
      notes: 'Alliance bit is treaty[otherCiv] & 0x20 in byte 1 (= 0x2000 in full word)',
    },
  },

  // --- Phase 3: War modifiers (only when at war with human) ---
  // @ 0x005616F0: if treaty[humanCiv][aiCiv] & 0x08 (at war)
  warModifiers: {
    condition: 'treaty[humanCiv][aiCiv] & 0x08 (WAR flag)',
    address: '0x005616F0',

    // Path A: No other wars (warCount == 0)
    noOtherWars: {
      condition: 'warCount == 0',
      address: '0x005616F8',
      modifiers: [
        {
          name: 'goldDisadvantage',
          delta: +1,
          condition: 'aiCiv.treasury < humanCiv.treasury',
          address: '0x00561704',
          field: 'civ+0x02 (treasury, int)',
          notes: 'AI has less gold -> more willing to negotiate (+1)',
        },
        {
          name: 'techDisadvantage',
          delta: +1,
          condition: 'aiCiv.techCount < humanCiv.techCount AND difficulty > 0',
          address: '0x00561720',
          field: 'civ+0x10 (techCount), DAT_00655b08 (difficulty)',
          notes: 'AI behind in tech (only on non-Chieftain) -> more willing (+1)',
        },
        {
          name: 'techAdvantage',
          delta: -1,
          condition: 'humanCiv.techCount < aiCiv.techCount',
          address: '0x00561740',
          notes: 'Human behind in tech -> AI less willing to negotiate (-1)',
        },
        {
          name: 'militaryDisadvantage',
          delta: +1,
          condition: 'aiCiv.militaryPower < humanCiv.militaryPower',
          address: '0x00561758',
          field: 'civ+0x6E (militaryPower, ushort)',
          notes: 'AI weaker militarily -> more willing to negotiate (+1)',
        },
        {
          name: 'militaryAdvantage',
          delta: -1,
          condition: 'humanCiv.militaryPower < aiCiv.militaryPower',
          address: '0x00561774',
          notes: 'AI stronger -> less willing to negotiate (-1)',
        },
      ],
    },

    // Path B: Multiple wars (warCount > 0)
    multipleWars: {
      condition: 'leader.expansionism < 1 OR warCount > 1',
      address: '0x00561790',
      formula: 'penalty = warCount - leader.expansionism - 1; if penalty < 2: penalty = 1; score -= penalty',
      field: 'DAT_006554f8[rulesCivNumber * 0x30] (expansionism)',
      notes: [
        'Non-expansionist civs (expansionism < 1) always take penalty for multi-front wars',
        'Expansionist civs (expansionism >= 1) only penalized when warCount > 1',
        'Minimum penalty of 1 (clamped)',
      ],
    },

    // Large tech gap bonus (both paths)
    largeTechGap: {
      delta: +1,
      condition: 'aiCiv.techCount + 8 < humanCiv.techCount',
      address: '0x005617C0',
      notes: 'If human is 9+ techs ahead, AI more willing to negotiate (+1)',
    },
  },

  // --- Phase 4: Treaty status modifiers ---
  treatyModifiers: {
    ceasefire: {
      delta: -2,
      condition: 'treaty[humanCiv][aiCiv] & 0x04 (CEASEFIRE)',
      address: '0x005617DC',
      notes: 'Ceasefire penalty: AI is less friendly during ceasefire (-2)',
    },
    noAlliance: {
      delta: -1,
      condition: 'NOT (treaty byte1[humanCiv][aiCiv] & 0x20) — no alliance',
      address: '0x005617F0',
      notes: 'Not allied: -1 attitude. If allied AND score < 1, floor to 0 (@ 0x00561962)',
    },
  },

  // --- Phase 5: Late-game spaceship / power penalties ---
  lateGame: {
    // Spaceship penalty for non-top-ranked human
    spaceshipPenalty: {
      condition: 'humanCiv.powerRank < 7 AND turn > 200',
      address: '0x00561804',
      formula: [
        'penalty = 7 - humanCiv.powerRank',
        'if spaceship_is_enabled() [FUN_00598ceb]: penalty = 1',
        'if turn < 400: penalty = (penalty + 1) >> 1  (halved, round up)',
        'score -= penalty',
      ],
      field: 'DAT_00655c22[humanCiv] (powerRanking 0-7)',
      notes: 'Lower-ranked humans get bigger penalty; halved in mid-game (turn 200-400)',
    },

    // Power ranking bonus for top-ranked human
    powerRankingBonus: {
      condition: 'humanCiv.powerRank == 7 AND humanCiv.cityCount > 3 AND turn > 200 AND difficulty > 0',
      address: '0x00561840',
      formula: [
        'bonus = difficulty / 3 + 1',
        'if (tolerance - attitude[aiCiv][humanCiv] <= allianceStrength) AND NOT trespass: bonus >>= 1',
        'score += bonus',
      ],
      field: 'DAT_00655b08 (difficulty), civ+0x68 (cityCount)',
      notes: [
        'Top-ranked human with 4+ cities gets friendship bonus on higher difficulties',
        'Bonus halved if human has strong alliances and no trespass flag',
        'Chieftain (difficulty 0) never gets this bonus',
      ],
    },
  },

  // --- Phase 6: Spaceship active penalties ---
  spaceshipActive: {
    humanLaunched: {
      delta: -1,
      condition: 'humanCiv.spaceshipFlag != 0',
      address: '0x00561886',
      field: 'civ+0x105 (spaceshipFlag, byte)',
    },
    humanLaunchedAiNot: {
      delta: -1,
      condition: 'humanCiv.spaceshipFlag != 0 AND aiCiv.spaceshipFlag == 0 AND score > 0',
      address: '0x0056189E',
      notes: 'Extra penalty only if AI has NOT launched and score is still positive',
    },
  },

  // --- Phase 7: Leader personality modifier ---
  personalityModifier: {
    address: '0x005618B4',
    formula: 'personalityMod = expansionism * 3 + militarism * 2',
    clamp: 'if personalityMod < -1: personalityMod = -2',
    fields: {
      expansionism: 'DAT_006554f8[rulesCivNumber * 0x30 + 0] (char, -1/0/1)',
      militarism:   'DAT_006554f9[rulesCivNumber * 0x30 + 1] (char, -1/0/1)',
    },
    exampleValues: {
      // expansionism * 3 + militarism * 2
      'Romans (1,1)':           5,   // 3 + 2 = 5  (very aggressive)
      'Indians (-1,-1)':       -2,   // -3 + -2 = -5, clamped to -2  (very peaceful)
      'Babylonians (0,-1)':    -2,   // 0 + -2 = -2  (peaceful)
      'Egyptians (0,0)':        0,   // 0 + 0 = 0  (neutral)
      'Americans (1,0)':        3,   // 3 + 0 = 3  (somewhat aggressive)
      'Sioux (0,1)':            2,   // 0 + 2 = 2  (somewhat aggressive)
    },
    notes: [
      'Added to score at @ 0x00561920 along with powerDiff',
      'Positive = more aggressive (more willing to stay at war)',
      'Clamp at -2 prevents extremely peaceful personalities from making AI a total pushover',
    ],
  },

  // --- Phase 8: Power differential ---
  powerDifferential: {
    address: '0x005618DC',
    formula: [
      'powerDiff = humanCiv.powerRank - aiCiv.powerRank',
      'if powerDiff < 0: powerDiff /= 2  (human weaker: halved effect)',
      'else if NOT atWar: powerDiff /= 2  (human stronger but peaceful: halved)',
      'score += personalityMod + powerDiff',
    ],
    field: 'DAT_00655c22 (powerRanking, byte[8], 0-7 scale)',
    notes: [
      'Positive powerDiff = human is stronger ranked -> AI more aggressive (higher score)',
      'When at war with stronger human, full effect; peaceful/weaker gets halved',
      'Combined with personality modifier in single addition at @ 0x00561920',
    ],
  },

  // --- Phase 9: Military power comparison (conditional) ---
  militaryPowerComparison: {
    // Gate condition: NOT scenario mode OR (tolerance - attitude <= allianceStrength AND no trespass)
    condition: '(gameFlags & 1) == 0 OR (tolerance - attitude <= allianceStrength AND !(treaty & TRESPASS))',
    address: '0x00561924',
    modifiers: [
      {
        name: 'overwhelmingHumanPower',
        delta: -1,
        condition: 'aiCiv.militaryPower * 4 < humanCiv.militaryPower',
        address: '0x00561958',
        notes: 'Human 4x+ stronger: -1',
      },
      {
        name: 'doubleHumanPower',
        delta: -1,
        condition: 'aiCiv.militaryPower * 2 < humanCiv.militaryPower',
        address: '0x00561970',
        notes: 'Human 2x+ stronger: -1 (stacks with above, so 4x+ = -2)',
      },
      {
        name: 'significantHumanPower',
        delta: -1,
        condition: 'aiCiv.militaryPower * 3/2 < humanCiv.militaryPower',
        address: '0x0056198A',
        notes: 'Human 1.5x+ stronger: -1 (stacks, so 4x+ = -3 total)',
      },
    ],
    notes: 'All three can stack: max -3 if human has 4x military power',
  },

  // --- Phase 10: Peaceful strength bonus (only when NOT at war) ---
  peacefulStrengthBonus: {
    condition: 'NOT atWar(humanCiv, aiCiv)',
    address: '0x005619A4',
    modifiers: [
      {
        name: 'aiStronger',
        delta: +1,
        condition: 'humanCiv.militaryPower < aiCiv.militaryPower',
        address: '0x005619B0',
        notes: 'AI stronger than human: +1 (AI feels confident, more friendly)',
      },
      {
        name: 'aiMuchStronger',
        delta: +1,
        condition: 'humanCiv.militaryPower * 2 < aiCiv.militaryPower',
        address: '0x005619C6',
        notes: 'AI 2x+ stronger: +1 more (stacks to +2)',
      },
    ],
  },

  // --- Phase 11: Wonder effects ---
  wonderEffects: {
    // Great Wall (wonder 6) or United Nations (wonder 24)
    greatWallOrUN: {
      condition: 'humanCiv has Great Wall (wonder 6) OR United Nations (wonder 24)',
      address: '0x005619DC',
      formula: 'if score < 1: score -= 1; else: score >>= 1 (halved)',
      wonderIds: { greatWall: 6, unitedNations: 0x18 },
      checkFunction: 'civ_has_active_wonder (FUN_00453e51)',
      notes: [
        'CORRECTION: Pseudocode annotation said "Navigation" but binary says wonder 0x18 = United Nations',
        'If AI attitude is already hostile (score < 1), makes it -1 worse',
        'If AI attitude is friendly (score >= 1), halves it (dampens hostility)',
        'Great Wall = wonder index 6, United Nations = wonder index 24 (0x18)',
      ],
    },
    // Statue of Liberty (wonder 20 = 0x14)
    statueOfLiberty: {
      aiHasStatueOfLiberty: {
        delta: +1,
        condition: 'aiCiv has Statue of Liberty (wonder 0x14)',
        address: '0x00561998',
        notes: 'AI civ owning Statue of Liberty: +1 attitude toward human',
      },
      humanHasStatueOfLiberty: {
        address: '0x005619A8',
        formula: [
          'if score > 0: score /= 2  (integer division)',
          'temp = score - 1',
          'if (score - 1) >= 0: temp = score - 2',
          'score = temp',
        ],
        notes: [
          'CORRECTION: Pseudocode annotation said "Democracy advance" but binary checks wonder 0x14',
          'Statue of Liberty = wonder index 20 (0x14)',
          'Very strong anti-human effect: halves positive score, then -2 if result >= 1, else -1',
          'Examples: score=4 -> /2=2 -> -2=0; score=1 -> /2=0 -> -1=-1; score=-2 -> -1=-3',
        ],
      },
    },
  },

  // --- Phase 12: Tech rank bonus ---
  lowestTechRank: {
    delta: +1,
    condition: 'techRankCount == 0 (human has more techs than ALL other civs)',
    address: '0x00561A04',
    notes: 'Tech leader gets +1 attitude (AI respects technological superiority)',
  },

  // --- Phase 13: Tech count comparison with tolerance ---
  techCountWithTolerance: {
    condition: 'aiCiv.techCount < humanCiv.techCount',
    address: '0x00561A12',
    formula: 'score += (1 - leader.tolerance)',
    field: 'DAT_006554fa[rulesCivNumber * 0x30 + 2] (tolerance, char)',
    exampleValues: {
      'tolerance = -1 (intolerant)': '+2 (1 - (-1))',
      'tolerance =  0 (neutral)':    '+1 (1 - 0)',
      'tolerance =  1 (tolerant)':   '+0 (1 - 1)',
    },
    notes: [
      'When AI has fewer techs than human: intolerant leaders get bigger attitude bonus',
      'Counterintuitive: being behind in tech makes AI MORE friendly (wants peace to catch up)',
      'But tolerant leaders get less bonus from this (they care less about the tech gap)',
    ],
  },

  // --- Phase 14: Alliance floor ---
  allianceFloor: {
    condition: 'treaty[humanCiv][aiCiv] & 0x2000 (ALLIANCE) AND score < 1',
    address: '0x00561962',
    result: 'score = 0',
    notes: 'Allied civs have a minimum attitude of 0 (never hostile toward ally)',
  },

  // --- Phase 15: No contact reset ---
  noContactReset: {
    condition: 'treaty[humanCiv][aiCiv] & 0x01 == 0 (no CONTACT flag)',
    address: '0x00561FBC',
    result: 'score = 0',
    notes: 'If no contact has been made, attitude is always 0 (neutral)',
  },

  // --- Final: Set attitude ---
  finalSet: {
    address: '0x00561FC2',
    call: 'set_attitude(aiCiv, humanCiv, score)  [FUN_00456f20]',
    notes: 'Stores final score as signed byte at civ+0x48+humanCiv',
  },
};

// ============================================================================
// === PATIENCE MECHANICS ===
// Binary ref: FUN_00560084 @ block_00560000.c, lines 50-52
// ============================================================================

export const PATIENCE = {
  field: {
    offset: 0x1F,               // @ DAT_0064c6bf
    address: '0x0064c6bf',
    type: 'byte (unsigned)',
    perCiv: true,
  },

  decrement: {
    address: '0x005602B4',
    interval: 3,               // every 3rd turn: turnNumber % 3 == 0
    amount: 1,                 // patience -= 1
    condition: 'patience > 0 AND turnNumber % 3 == 0',
    formula: 'if (turn % 3 == 0 && civ.patience > 0) civ.patience--',
    notes: 'Patience is only decremented for non-barbarian, non-zero patience values',
  },

  effectOnAllianceViolation: {
    // @ 0x005602E6 (alliance violation detection)
    address: '0x005602E6',
    formula: 'toleranceRolls = clamp(3 - (tolerance >> 2), 1, 3)',
    rollCheck: 'rollResult = (toleranceRolls <= 1) ? 0 : rand() % toleranceRolls',
    triggerCondition: 'rollResult == 0 -> trigger war declaration or max hostility',
    notes: [
      'Lower tolerance -> fewer rolls -> more likely to trigger (roll must hit 0)',
      'tolerance=0: rolls=clamp(3,1,3)=3, 33% chance per check',
      'tolerance=4: rolls=clamp(2,1,3)=2, 50% chance per check',
      'tolerance=8+: rolls=clamp(1,1,3)=1, 100% chance (always triggers)',
      'This uses the civ tolerance field (civ+0x1E), NOT the leader trait',
    ],
  },

  zeroConsequence: {
    description: 'When patience reaches 0, it simply stops decrementing. ' +
      'Patience affects tolerance-based checks indirectly through the civ tolerance field. ' +
      'No explicit "patience == 0" trigger found in the three main diplomacy functions.',
    notes: [
      'Patience appears to be set externally (e.g., by diplomacy encounters, tribute demands)',
      'It slowly decays toward 0, representing fading goodwill from past agreements',
    ],
  },
};

// ============================================================================
// === AI DIPLOMACY TURN PROCESSING ===
// Binary ref: FUN_00560084 @ block_00560000.c, lines 10-217
// Called once per AI civ per turn from the main turn loop.
// ============================================================================

export const TURN_PROCESSING = {
  // --- Phase 1: Government management ---
  governmentManagement: {
    address: '0x00560084',
    steps: [
      'Clear civ.flags bits 3 and 6 (& 0xFFB7) @ 0x0056008E',
      'If in Anarchy (govt == 0): auto-select government via set_government(civId, 1)',
      'If non-human AND senate flag set: restore government',
    ],
    notes: 'Barbarians (civId == 0) return immediately after government check',
  },

  // --- Phase 2: AI random seed ---
  aiRandomSeed: {
    address: '0x005602A0',
    formula: 'civ.aiRandomSeed = rand() % 100',
    field: 'civ+0x16 (byte)',
    notes: 'Re-rolled every turn; used for stochastic AI decisions elsewhere',
  },

  // --- Phase 3: Senate override toggle ---
  senateToggle: {
    address: '0x005602AA',
    formula: 'if rand() % 3 == 0: civ.flags ^= 0x04',
    notes: '33% chance per turn to toggle the senate override bit',
  },

  // --- Phase 4: Periodic flag clearing ---
  periodicFlags: {
    every32Turns: {
      condition: '(turnNumber & 0x1F) == 0',
      address: '0x00560342',
      actions: [
        'Clear WAR_STARTED (0x800) if next-civ not at war',
        'Clear 0x80000 periodic flag',
      ],
    },
    every16Turns: {
      condition: '(turnNumber & 0x0F) == 0',
      address: '0x00560378',
      actions: [
        'Fire "WARENDS" event if conditions met (embassy OR Navigation tech OR Writing tech)',
        'Attempt diplomacy_encounter if ceasefire active',
        'Attempt tech_negotiation if at war',
        'Call shared-visibility diplomacy check',
        'Clear bit 0x400 (PERIODIC_FLAG_10)',
      ],
    },
    every8Turns: {
      condition: '(turnNumber & 0x07) == 0',
      address: '0x005604A4',
      actions: ['tech_negotiation if at war and not allied'],
    },
  },

  // --- Phase 5: AI-to-human evaluation ---
  humanEvaluation: {
    address: '0x005604C2',
    condition: 'NOT isHuman(aiCiv)',
    steps: [
      'For each human civ with contact: call evaluate_diplomacy_toward_human',
      'In MP: delegate to remote human via message 0xA0',
    ],
  },

  // --- Phase 6: Post-processing ---
  postProcessing: {
    address: '0x00560510',
    call: 'ai_military_aid(civId)  [FUN_0055f7d1]',
    notes: 'Evaluates giving military units to weaker allies',
  },

  // --- Phase 7: Alliance proposals ---
  allianceProposals: {
    address: '0x00560518',
    steps: [
      'For each human civ: call propose_alliance_or_crusade',
      'In MP: delegate to remote human via message 0xA1',
    ],
  },
};

// ============================================================================
// === ALLIANCE VIOLATION DETECTION ===
// Binary ref: FUN_00560084 @ 0x005602D8
// ============================================================================

export const ALLIANCE_VIOLATION = {
  // --- Detection ---
  detection: {
    triggerFlag: 0x20,         // treaty & 0x20 = alliance violation / hatred flag
    address: '0x005602D8',
    notes: 'Checked for each AI-otherCiv pair in the main diplomacy loop',
  },

  // --- Response ---
  response: {
    // If not already at war: declare war
    declareWar: {
      condition: 'treaty[otherCiv][aiCiv] & 0x08 == 0 (not at war)',
      address: '0x0056030A',
      actions: [
        'Clear ceasefire+peace bits (& 0xFFFFFFD9)',
        'Set war flags (| 0x80840 = WAR | WAR_STARTED | 0x80000)',
        'Set contactTurn = max(current, turn - 8)',
      ],
    },
    // If already at war: max hostility
    maxHostility: {
      condition: 'treaty[otherCiv][aiCiv] & 0x08 != 0 (already at war)',
      address: '0x00560324',
      actions: [
        'set_attitude(aiCiv, otherCiv, 100) — maximum hostility',
        'contactTurn = 0xFFFF — permanent cooldown',
        'Clear violation flag (& ~0x20)',
      ],
      notes: 'Attitude 100 = absolute maximum hostility, locks out all diplomacy',
    },
  },

  // --- Previous violation memory ---
  previousViolation: {
    address: '0x005602C0',
    flag: 0x40,               // treaty & 0x40 = previous violation
    notes: [
      'Saved to tempAllianceViolation[] at start of diplomacy loop',
      'Used in intruder detection phase of FUN_00560d95',
      'If prev violation exists + ceasefire active: fire "TERMS" reminder event',
    ],
  },
};

// ============================================================================
// === BORDER INTRUSION / INTRUDER SYSTEM ===
// Binary ref: FUN_00560d95 @ 0x00560DA0 (intruder detection phase)
// Also: FUN_0055bbc0 (calc_war_readiness)
// ============================================================================

export const INTRUDER_SYSTEM = {
  globals: {
    nearestCityIdx:    { address: '0x006ab5e4', notes: 'Index of nearest AI city to intrusion' },
    borderScore:       { address: '0x006ab5e8', notes: 'Accumulated border threat score' },
    intruderCount:     { address: '0x006ab5ec', notes: 'Number of intruding military units' },
    intruderDetailCnt: { address: '0x00633ac8', notes: 'Detailed intruder city count (cities threatened)' },
    unitCount:         { address: '0x006ab5e0', notes: 'Total units involved in border check' },
  },

  // --- Event chains based on intrusion type ---
  eventChains: {
    // No ceasefire, no previous violation
    peaceful: {
      condition: 'NOT ceasefire AND NOT previousViolation',
      address: '0x00560E50',
      events: {
        ADMIRECITY: {
          condition: 'random bit == 1 (50% chance)',
          notes: 'Friendly event: AI admires human city',
        },
        NEARCITY: {
          condition: 'random bit == 0 (50% chance)',
          notes: 'Neutral event: AI notices human units near city',
        },
      },
      intrusionEscalation: {
        condition: 'tolerance + intruderCount > 2',
        formula: 'roll = rand() % (tolerance + intruderCount); if roll > 1: set ALLIANCE_VIOLATION flag',
        address: '0x00560E88',
        notes: 'More intruders or lower tolerance = higher chance of setting violation flag',
      },
      timingGate: {
        condition: '(turn + aiCiv) & 3 == 0',
        address: '0x00560EC0',
        notes: 'Only checks every 4th turn (staggered per AI civ)',
      },
    },

    // Ceasefire active, previous violation exists
    ceasefireViolationReminder: {
      condition: 'ceasefire AND previousViolation',
      event: 'TERMS',
      address: '0x00560F1A',
      notes: 'Reminds player of previous terms violation',
    },

    // Ceasefire active, no intruder units but detailed count > 0
    ceasefireIntruder: {
      condition: 'ceasefire AND intruderCount == 0 AND intruderDetailCount > 0',
      events: {
        INTRUDER:  { condition: 'intruderDetailCount < 2' },
        INTRUDERS: { condition: 'intruderDetailCount >= 2' },
      },
      address: '0x0056110A',
      actions: ['demand_tribute', 'reveal_city', 'set_visibility'],
    },

    // Ceasefire active, intruder units present
    ceasefireViolation: {
      condition: 'ceasefire AND intruderCount > 0',
      events: {
        VIOLATOR:  { condition: 'intruderDetailCount < 2' },
        VIOLATORS: { condition: 'intruderDetailCount >= 2' },
      },
      address: '0x005611A0',
      playerChoices: {
        withdraw: {
          responseCode: 0,
          actions: [
            'Iterate all units; if alive AND has ceasefire flag AND owner == humanCiv:',
            '  Clear ceasefire flag on unit',
            '  Find nearest friendly city, move unit there',
            '  Clear orders, clear home city',
            'Fire "WITHDRAWN" event',
          ],
          address: '0x005611E0',
        },
        violate: {
          responseCode: 1,
          actions: [
            'Senate scandal check:',
            '  Democracy (govt 6): always triggers SENATESCANDAL',
            '  Republic (govt 5): 50% chance (rand() & 1)',
            '  Others: no scandal',
            'If scandal and NOT scenario override: set_government(humanCiv, ANARCHY)',
            'set_attitude(aiCiv, humanCiv, 50) — hostile',
            'declare_war(humanCiv, aiCiv, -1)',
            'Fire "VIOLATE" event',
          ],
          address: '0x00561330',
          senateScandal: {
            address: '0x00561364',
            democracyGovtId: 6,
            republicGovtId: 5,
            scenarioOverride: '(DAT_00655af0 & 0x80) AND (DAT_0064bc60 & 1)',
          },
        },
      },
    },
  },
};

// ============================================================================
// === ALLIANCE / TREATY PROPOSALS ===
// Binary ref: FUN_00562021 @ block_00560000.c, lines 582-738
// ============================================================================

export const ALLIANCE_PROPOSALS = {
  // --- Timing gate ---
  timingGate: {
    address: '0x00562021',
    formula: '(turn & 0x1F) == aiCiv << 2',
    notes: [
      'Each AI civ only proposes on specific turns within a 32-turn cycle',
      'aiCiv=1 fires on turn%32 == 4',
      'aiCiv=2 fires on turn%32 == 8',
      'aiCiv=3 fires on turn%32 == 12',
      'aiCiv=7 fires on turn%32 == 28',
      'This spaces out proposals so they do not all arrive on the same turn',
    ],
    effectivePeriod: 32,       // turns between possible proposals per AI civ
  },

  // --- Attitude prerequisite ---
  attitudePrerequisite: {
    address: '0x00562040',
    formula: 'tolerance - attitude[aiCiv][humanCiv] < 6',
    field: 'civ+0x1E (tolerance), civ+0x48+humanCiv (attitude)',
    notes: [
      'If tolerance minus current attitude >= 6, skip all proposals',
      'Higher tolerance leaders tolerate worse attitudes before giving up',
      'Example: tolerance=3, attitude=-2 -> 3-(-2)=5 < 6, OK',
      'Example: tolerance=3, attitude=-4 -> 3-(-4)=7 >= 6, SKIP',
    ],
  },

  // --- Target selection ---
  targetSelection: {
    address: '0x00562060',
    conditions: [
      'targetCiv != aiCiv AND targetCiv != humanCiv',
      'targetCiv is alive',
      'aiCiv is at war with targetCiv (treaty byte1 & 0x02)',
      'aiCiv is NOT at war/alliance with humanCiv (treaty & 0x2008 == 0)',
      'humanCiv has no existing wars with targetCiv (count_wars == 0)',
      'Both aiCiv and humanCiv have contact with targetCiv (treaty & 0x01)',
    ],
  },

  // --- Path A: HELPME (AI is weaker) ---
  helpMe: {
    condition: 'aiCiv.militaryPower * 2 <= targetCiv.militaryPower',
    address: '0x005620CE',
    field: 'civ+0x6E (militaryPower, ushort)',

    goldOffer: {
      formula: 'clamp(aiCiv.treasury / 100, 1, 10)',
      displayAmount: 'goldOffer * 50',       // gold shown in dialog = goldOffer * 0x32
      address: '0x005620FC',
      field: 'civ+0x02 (treasury, int)',
      notes: 'Minimum 50 gold, maximum 500 gold offered to human',
    },

    techOffer: {
      address: '0x0056210A',
      formula: [
        'For each tech 0-99:',
        '  Skip if both prereqs == -2 (unresearchable future tech)',
        '  Skip if humanCiv already has it',
        '  Include if aiCiv has it, OR if targetCiv has it AND no embargo',
        '  Score via score_tech(humanCiv, tech) [FUN_004bdb2c]',
        '  Track best tech with highest score',
      ],
      embargoCheck: {
        condition: 'treaty[humanCiv][aiCiv] & 0x80 == 0 (no embassy) AND no Navigation/Writing tech',
        address: '0x0056213E',
        notes: 'Cannot share target civ techs if human cannot verify (no embassy, no Navigation/Writing)',
      },
    },

    dialogKeys: {
      base: 'HELPME',
      ifAlreadyAtWar: 'HELPMEINSTEAD',      // @ 0x005621C2: if human already at war with target
      ifTechAvailable: '+ tech suffix',      // @ 0x005621D4: append tech name to dialog
    },

    // On acceptance
    acceptance: {
      address: '0x0056221E',
      actions: [
        'Transfer best tech to aiCiv (from target, if AI did not have it)',
        'Transfer best tech to humanCiv (from aiCiv)',
        'Set ceasefire+peace between aiCiv and humanCiv (0x0C)',
        'Declare war: humanCiv vs targetCiv (via aiCiv)',
        'Set alliance between humanCiv and targetCiv (0x2000)',
        'Set war declaration flags on target->human (0x80800)',
        'contactTurn[targetCiv][humanCiv] = turn',
        'contactTurn[aiCiv][humanCiv] = turn + 16',
        'Transfer gold: aiCiv.treasury -= goldOffer*50, humanCiv.treasury += goldOffer*50',
      ],
    },

    // On rejection
    rejection: {
      address: '0x00562206',
      action: 'contactTurn = max(current, turn - 14)',
      cooldown: 14,            // 14-turn minimum before next proposal
    },
  },

  // --- Path B: CRUSADE/JIHAD (AI is weaker than target but not 2x weaker) ---
  crusade: {
    condition: 'aiCiv.militaryPower < targetCiv.militaryPower AND (humanCiv.powerRank < 6 OR aiCiv.powerRank < 6)',
    address: '0x0056228A',
    field: 'civ+0x6E (militaryPower), DAT_00655c22 (powerRanking)',

    dialogKeys: {
      base: 'CRUSADE',
      ifTargetAtWar: 'JIHAD',               // @ 0x005622F0: if target is already at war with human
    },

    // On acceptance
    acceptance: {
      address: '0x0056230A',
      actions: [
        'Set ceasefire+peace between aiCiv and humanCiv (0x0C)',
        'Declare war: humanCiv vs targetCiv (via aiCiv)',
        'contactTurn[aiCiv][humanCiv] = turn + 16',
        'Set alliance between humanCiv and targetCiv (0x2000)',
        'Set war declaration flags on target->human (0x80800)',
        'contactTurn[targetCiv][humanCiv] = turn',
      ],
      notes: 'No gold or tech offered in CRUSADE path (AI is asking for help, not buying it)',
    },

    // On rejection
    rejection: {
      cooldown: 14,            // same as HELPME: contactTurn = max(current, turn - 14)
    },

    powerRankGate: {
      condition: 'humanCiv.powerRank < 6 OR aiCiv.powerRank < 6',
      address: '0x00562298',
      notes: 'Both top-2 ranked civs (rank 6-7) cannot propose crusade against each other',
    },
  },

  // --- Contact cooldown mechanics ---
  contactCooldown: {
    onAcceptance: {
      aiToHuman: { value: 'turn + 16', address: '0x00562264 / 0x0056231E' },
      targetToHuman: { value: 'turn', address: '0x00562268 / 0x00562322' },
      notes: '+16 turns cooldown for aiCiv after accepted proposal',
    },
    onRejection: {
      value: 'max(currentContactTurn, turn - 14)',
      address: '0x00562206 / 0x00562300',
      notes: 'Sets cooldown to at most 14 turns ago (prevents re-proposing for ~14 turns)',
    },
    onCannotReach: {
      value: 'max(currentContactTurn, turn - 15)',
      address: '0x005620E8 / 0x005622C6',
      notes: 'If check_near_city fails (cannot reach human), 15-turn backoff',
    },
  },

  // --- Post-loop cleanup ---
  cleanup: {
    address: '0x00562348',
    action: 'Clear "attacked" flag: treaty[aiCiv][targetCiv] &= ~0x200',
    notes: 'Clears bit 9 (0x200) after alliance proposal processing',
  },
};

// ============================================================================
// === DIPLOMATIC EVENT CHAINS ===
// Binary ref: FUN_00560084 and FUN_00560d95
// Events fired via fire_event (FUN_00410030) with dialog string keys
// ============================================================================

export const EVENT_CHAINS = [
  // --- War/Peace Events ---
  {
    event: 'WARENDS',
    source: 'FUN_00560084 @ 0x005603FA',
    condition: [
      'Every 16 turns',
      'Both civs alive and not at war/allied',
      'Has contact + alliance between them',
      'Visibility: embassy OR Navigation tech (0x18) OR Writing tech (0x09)',
    ],
    visibilityTechs: { navigation: 0x18, writing: 0x09 },
    notes: 'Announced to human player; MP broadcasts to all visible human players',
  },

  // --- Intrusion Events ---
  {
    event: 'NEARCITY',
    source: 'FUN_00560d95 @ 0x00560F00',
    condition: 'No ceasefire, intrusion detected, random bit == 0, timing gate (turn+aiCiv)&3==0',
  },
  {
    event: 'ADMIRECITY',
    source: 'FUN_00560d95 @ 0x00560EFC',
    condition: 'No ceasefire, intrusion detected, random bit == 1, timing gate',
  },
  {
    event: 'TERMS',
    source: 'FUN_00560d95 @ 0x00560F50',
    condition: 'Ceasefire active + previous alliance violation',
  },
  {
    event: 'INTRUDER',
    source: 'FUN_00560d95 @ 0x0056118C',
    condition: 'Ceasefire + no intruder units + intruderDetailCount == 1',
  },
  {
    event: 'INTRUDERS',
    source: 'FUN_00560d95 @ 0x00561186',
    condition: 'Ceasefire + no intruder units + intruderDetailCount >= 2',
  },
  {
    event: 'VIOLATOR',
    source: 'FUN_00560d95 @ 0x005611C8',
    condition: 'Ceasefire + intruder units present + intruderDetailCount == 1',
    playerChoice: true,
  },
  {
    event: 'VIOLATORS',
    source: 'FUN_00560d95 @ 0x005611C2',
    condition: 'Ceasefire + intruder units present + intruderDetailCount >= 2',
    playerChoice: true,
  },
  {
    event: 'WITHDRAWN',
    source: 'FUN_00560d95 @ 0x00561284',
    condition: 'Player chose to withdraw units after VIOLATOR/VIOLATORS',
    followsEvent: 'VIOLATOR or VIOLATORS (response 0)',
  },
  {
    event: 'VIOLATE',
    source: 'FUN_00560d95 @ 0x0056139A',
    condition: 'Player chose to violate ceasefire',
    followsEvent: 'VIOLATOR or VIOLATORS (response 1)',
    consequence: 'War declared, attitude set to 50 (hostile)',
  },
  {
    event: 'SENATESCANDAL',
    source: 'FUN_00560d95 @ 0x0056136C',
    condition: 'Democracy: always; Republic: 50% chance; during ceasefire violation',
    consequence: 'Government forced to Anarchy',
  },

  // --- Alliance Events ---
  {
    event: 'HELPME',
    source: 'FUN_00562021 @ 0x005621AA',
    condition: 'AI is 2x+ weaker than target; offers gold + tech',
    variants: ['HELPMEINSTEAD (human already at war with target)'],
    playerChoice: true,
  },
  {
    event: 'CRUSADE',
    source: 'FUN_00562021 @ 0x005622E0',
    condition: 'AI is weaker than target but not 2x weaker; proposes joint attack',
    playerChoice: true,
  },
  {
    event: 'JIHAD',
    source: 'FUN_00562021 @ 0x005622F0',
    condition: 'Same as CRUSADE but target is already at war with human',
    playerChoice: true,
  },
];

// ============================================================================
// === BORDER SCORING (calc_war_readiness) ===
// Binary ref: FUN_0055bbc0 @ block_00550000.c (820 bytes)
// Called by FUN_00560d95 before attitude scoring begins
// ============================================================================

export const BORDER_SCORING = {
  address: '0x0055bbc0',
  outputs: {
    lastCityIdx:       'DAT_006ab5e4 — index of most recently threatened city',
    borderScore:       'DAT_006ab5e8 — accumulated threat score',
    intruderCount:     'DAT_006ab5ec — veteran unit count (units flagged before)',
    intruderDetailCnt: 'DAT_00633ac8 — number of distinct cities threatened',
    unitCount:         'DAT_006ab5e0 — total units involved',
  },

  // If already allied (treaty & 0x08), returns 0 immediately
  allianceShortCircuit: {
    condition: 'treaty[civA][civB] & 0x08',
    result: 'borderScore = 0, return 0',
  },

  perUnitScoring: {
    base: '+1 per enemy unit near our city',
    tileImprovements: {
      road:     { flag: 0x10, bonus: +1 },
      railroad: { flag: 0x20, bonus: +1 },
      fortress: { flag: 0x08, bonus: +1 },
      cityTile: { flag: 0x04, bonus: +1 },
      airbase:  { flag: 0x40, bonus: +2 },
    },
    notes: 'Only counts units with role < 5 (military) and not already mobilized (flag & 0x04)',
  },

  cityBonus: {
    condition: 'unitsInCity > 3',
    bonus: '+1 to intruderCount',
    notes: 'Cities with 4+ mobilized military units get extra weight',
  },
};

// ============================================================================
// === WAR-TIME ATTITUDE MODIFIERS SUMMARY ===
// Complete summary of all score modifiers in FUN_00560d95.
// Positive score = AI is more HOSTILE (wants war / won't negotiate).
// Negative score = AI is more FRIENDLY (wants peace).
//
// NOTE: The pseudocode annotations use inconsistent sign convention in places.
// In the binary, set_attitude(aiCiv, humanCiv, score) stores the raw score.
// Higher values in the attitude field mean the AI is MORE willing to take
// aggressive action (the 100 used for max hostility in alliance violation
// confirms this: attitude 100 = maximum aggression).
// ============================================================================

export const MODIFIER_SUMMARY = [
  // --- Base ---
  { name: 'Border proximity score',     range: '0 to ~20',  source: 'calc_war_readiness' },

  // --- War-only modifiers (Phase 3) ---
  { name: 'AI poorer (gold)',            delta: '+1',  condition: 'at war, no other wars, AI treasury < human' },
  { name: 'AI fewer techs',             delta: '+1',  condition: 'at war, no other wars, AI techCount < human, diff > 0' },
  { name: 'Human fewer techs',          delta: '-1',  condition: 'at war, no other wars, human techCount < AI' },
  { name: 'AI weaker military',         delta: '+1',  condition: 'at war, no other wars, AI milPower < human' },
  { name: 'AI stronger military',       delta: '-1',  condition: 'at war, no other wars, human milPower < AI' },
  { name: 'Multi-war penalty',          delta: '-1 to -6', condition: 'at war, warCount > 0, based on expansionism' },
  { name: 'Large tech gap',             delta: '+1',  condition: 'at war, AI techCount + 8 < human techCount' },

  // --- Treaty modifiers (Phase 4) ---
  { name: 'Ceasefire penalty',          delta: '-2',  condition: 'ceasefire active' },
  { name: 'No alliance penalty',        delta: '-1',  condition: 'not allied' },

  // --- Late game (Phase 5) ---
  { name: 'Spaceship penalty',          delta: '-1 to -6', condition: 'humanRank < 7, turn > 200' },
  { name: 'Top power bonus',            delta: '+1 to +2', condition: 'humanRank == 7, cities > 3, turn > 200, diff > 0' },

  // --- Spaceship (Phase 6) ---
  { name: 'Human launched spaceship',   delta: '-1',  condition: 'human spaceship active' },
  { name: 'Only human has spaceship',   delta: '-1',  condition: 'human spaceship + AI no spaceship + score > 0' },

  // --- Personality (Phase 7) ---
  { name: 'Leader personality',          delta: '-2 to +5', formula: 'exp*3 + mil*2, floor -2' },

  // --- Power ranking (Phase 8) ---
  { name: 'Power differential',         delta: '-3 to +3', formula: 'humanRank - aiRank, halved in some cases' },

  // --- Military comparison (Phase 9) ---
  { name: 'Human 1.5x military',        delta: '-1',  condition: 'AI*1.5 < human, conditional gate' },
  { name: 'Human 2x military',          delta: '-1',  condition: 'AI*2 < human, stacks with above' },
  { name: 'Human 4x military',          delta: '-1',  condition: 'AI*4 < human, stacks (max -3)' },

  // --- Peaceful bonuses (Phase 10) ---
  { name: 'AI stronger (peaceful)',      delta: '+1',  condition: 'not at war, human milPower < AI' },
  { name: 'AI 2x stronger (peaceful)',   delta: '+1',  condition: 'not at war, human*2 < AI (stacks to +2)' },

  // --- Wonders (Phase 11) ---
  { name: 'Great Wall / UN',            delta: '-1 or /2', condition: 'human has wonder 6 or 24' },
  { name: 'AI has Statue of Liberty',   delta: '+1',  condition: 'AI has wonder 20' },
  { name: 'Human has Statue of Liberty', delta: '-1 to -2', formula: '/2 then -2 if >=1, else -1' },

  // --- Tech/tolerance (Phases 12-13) ---
  { name: 'Tech leader bonus',          delta: '+1',  condition: 'human has most techs (techRankCount == 0)' },
  { name: 'AI fewer techs + tolerance', delta: '0 to +2', formula: '1 - tolerance (leader trait)' },

  // --- Alliance floor (Phase 14) ---
  { name: 'Alliance floor',             delta: 'floor to 0', condition: 'allied + score < 1' },

  // --- No contact reset (Phase 15) ---
  { name: 'No contact',                 delta: '= 0', condition: 'no contact flag' },
];

// ============================================================================
// === ATTITUDE THRESHOLDS ===
// These are the values used in diplomacy decisions based on the attitude score
// set by FUN_00560d95. Not all are in the attitude function itself; some are
// in the greeting/demand evaluation (FUN_0045705e) and war declaration logic.
// ============================================================================

export const ATTITUDE_THRESHOLDS = {
  // From FUN_00560d95
  maxHostility:          100,   // @ 0x00560334: set_attitude(aiCiv, otherCiv, 100) on alliance violation while at war
  ceasefireViolation:     50,   // @ 0x0056139A: set_attitude(aiCiv, humanCiv, 0x32) on ceasefire violation
  allianceFloor:           0,   // @ 0x00561962: if allied AND score < 1, set to 0

  // From FUN_0045705e (greeting classification)
  hostile:               -25,   // attitude < -25: hostile greeting
  guarded:                 0,   // attitude -25..-1: guarded
  neutral:                25,   // attitude 0..24: neutral
  friendly:               50,   // attitude 25..49: friendly
  enthusiastic:           50,   // attitude >= 50: enthusiastic

  // From FUN_00562021 (alliance proposal gate)
  allianceProposalGate:    6,   // tolerance - attitude must be < 6 for proposals
};

// ============================================================================
// === AI MILITARY AID (Unit Gifting) ===
// Binary ref: FUN_0055f7d1 @ block_00550000.c (2,222 bytes)
// Called after attitude evaluation, before alliance proposals
// ============================================================================

export const MILITARY_AID = {
  address: '0x0055f7d1',
  description: 'AI evaluates gifting military units to weaker allies fighting enemies',
  conditions: [
    'Ally must be at war with an enemy (treaty byte1 & 0x20 AND & 0x02)',
    'Ally must be weaker than enemy (totalAtkDefSum AND powerRank checks)',
    'AI must not be fighting its own wars (or ally must be weaker than AI)',
    'Unit must be: land domain, non-civilian, in a city with other units',
    'Unit must be on a continent with attack(4) or defend(5) AI goal',
  ],
  action: 'Pick up unit from AI, place at ally city, change ownership',
  notes: 'Not ported in JS engine; no unit gifting mechanism exists',
};
