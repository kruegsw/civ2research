/**
 * Civ2 MGE Diplomacy Parley, Transaction System, AI Goals & Civ Naming
 * — Binary-Extracted Reference Data
 *
 * Source: civ2.exe decompilation (Ghidra) — blocks 004D0000, 00450000,
 *         00490000, 00550000
 *
 * Phase F, Agent 2 extraction.
 */

// ═══════════════════════════════════════════════════════════════════════
// TRANSACTION TYPES — Parley offer/demand types from parley_serialize_offer
// Source: FUN_004dbab4 @ 0x004DBAB4 (1074 bytes)
// Used in: parley_build_packet @ 0x004DB690, parley_execute_transaction @ 0x004DD285
// ═══════════════════════════════════════════════════════════════════════

export const TRANSACTION_TYPES = {
  // --- Offer types (used in parley_serialize_offer switch) ---
  TREATY:           { id: 5,    desc: 'Treaty proposal (ceasefire/peace/alliance)',
                      subtypes: { CEASEFIRE: 0, PEACE: 1, ALLIANCE: 2, CANCEL_ALL: 3 },
                      sourceAddr: '0x004DBAB4 case 5,6' },
  TREATY_RESPONSE:  { id: 6,    desc: 'Treaty response (same as 5, used for receiving side)',
                      sourceAddr: '0x004DBAB4 case 5,6' },
  GIVE_TECH_SINGLE: { id: 7,    desc: 'Give a single technology',
                      sourceAddr: '0x004DBAB4 case 7' },
  GIVE_TECH_LIST:   { id: 8,    desc: 'Give multiple technologies (checklist)',
                      sourceAddr: '0x004DBAB4 case 8,0xc' },
  GIVE_GOLD:        { id: 9,    desc: 'Give gold (amount in payload)',
                      sourceAddr: '0x004DBAB4 case 9' },
  GIVE_UNITS:       { id: 10,   desc: 'Transfer units to other civ',
                      sourceAddr: '0x004DBAB4 case 10' },
  DECLARE_WAR:      { id: 0x0b, desc: 'Declare war (no payload)',
                      sourceAddr: '0x004DBEE6 case 0xb' },
  SHARE_MAPS:       { id: 0x0c, desc: 'Share map knowledge (civ list)',
                      sourceAddr: '0x004DBAB4 case 8,0xc' },
  ATTITUDE_CHANGE:  { id: 0x0d, desc: 'Attitude level change (0=ceasefire,1=peace,2=alliance)',
                      sourceAddr: '0x004DBAB4 case 0xd' },
  TRADE_EXCHANGE:   { id: 0x0e, desc: 'Two-sided trade (both civs offer something)',
                      sourceAddr: '0x004DB690 type==0xe' },
  DEMAND:           { id: 0x0f, desc: 'One-sided demand (execute only offering side)',
                      sourceAddr: '0x004DBEE6 case 0xf' },
  GIVE_CITIES:      { id: 0x11, desc: 'Transfer cities (seq_id + gold value per entry)',
                      sourceAddr: '0x004DBAB4 case 0x11' },
};

// ═══════════════════════════════════════════════════════════════════════
// TREATY FLAGS — Bit layout for treaty byte array
// Source: DAT_0064c6c0 (per-civ treaty flags, stride 0x594)
//         parley_execute_treaty @ 0x004DF10F
//         process_diplomatic_contact @ 0x0055D8D8
// ═══════════════════════════════════════════════════════════════════════

export const TREATY_FLAGS = {
  // --- Byte 0 (low byte) ---
  CONTACT:           { bit: 0x01,    desc: 'Civs have met',
                       sourceAddr: '0x0055D8D8 set_treaty_flag 0x401' },
  CEASEFIRE:         { bit: 0x02,    desc: 'Ceasefire treaty active',
                       sourceAddr: '0x004DF10F case 0' },
  PEACE:             { bit: 0x04,    desc: 'Peace treaty active',
                       sourceAddr: '0x004DF10F case 1' },
  ALLIANCE:          { bit: 0x08,    desc: 'Alliance active',
                       sourceAddr: '0x004DF10F case 2' },
  EMBASSY:           { bit: 0x10,    desc: 'Embassy established / has contact info',
                       sourceAddr: '0x0055BEF9' },

  // --- Byte 1 (bits 0x100-0xFF00 of the 16-bit treaty word) ---
  NUKE_AWARENESS:    { bit: 0x100,   desc: 'Aware other civ has nuclear weapons',
                       sourceAddr: '0x0045705E' },
  ATTACKED:          { bit: 0x800,   desc: 'Attacked / betrayal flag',
                       sourceAddr: '0x0045AC71' },
  PROVOKED:          { bit: 0x800,   desc: 'Provoked (same bit, context-dependent)',
                       sourceAddr: '0x0045A8E3' },
  DECLARED_WAR:      { bit: 0x2000,  desc: 'Has formally declared war (vendetta)',
                       sourceAddr: '0x0055CBD5 byte1 0x08 mapped to 0x2000' },
  // 0x2401 = war + contact + declared
  RECENT_CONTACT:    { bit: 0x4000,  desc: 'Recent contact flag (post first-contact)',
                       sourceAddr: '0x0055D8D8 set_treaty_flag 0x4000' },

  // --- Byte 2 (high bits) ---
  TRIBUTE_DEMANDED:  { bit: 0x40000, desc: 'Tribute has been demanded (alliance context)',
                       sourceAddr: '0x0055D1E2 set_treaty_flag 0x40000' },
  CITY_PROVOCATION:  { bit: 0x10000, desc: 'City-level provocation (allied AI sets this)',
                       sourceAddr: '0x0055D8D8' },
  WAR_WEARINESS:     { bit: 0x100000, desc: 'War weariness flag (cleared when no allies)',
                       sourceAddr: '0x0045705E' },

  // --- Vendetta byte 1 ---
  VENDETTA:          { bit: 0x20,    desc: 'Vendetta / hatred (byte 1, tested separately)',
                       note: 'treaty_byte1[civA][civB] & 0x20',
                       sourceAddr: '0x0055CBD5' },
  RECENT_ATTACK:     { bit: 0x08,    desc: 'Attacked recently (byte 1)',
                       sourceAddr: '0x0055CBD5 fast path' },
  CEASEFIRE_BROKEN:  { bit: 0x02,    desc: 'Ceasefire was broken (byte 1)',
                       sourceAddr: '0x0055F7D1' },
};

// ═══════════════════════════════════════════════════════════════════════
// TRANSACTION VALUATION — How the AI values different offers
// Source: ai_evaluate_diplomacy @ 0x0045705E (6616 bytes)
//         diplo_sell_tech @ 0x004591CB, handle_exchange_gift @ 0x0045950B
//         calc_gold_to_attitude @ 0x0045B472
// ═══════════════════════════════════════════════════════════════════════

export const TRANSACTION_VALUATION = {
  // --- Tech pricing (diplo_sell_tech @ 0x004591CB) ---
  techSellFormula: {
    base: 'tech_value(civB, techId) * 20',                    // @ 0x004591CB+0x40
    attitudeMultiplier: 'if attitudeScore > 50: price = (attitudeScore * price) / 50',
    difficultyMultiplier: 'if emperor(7) AND cities>4 AND turn>200: price *= 2',
    epochScaling: 'epoch = max(tech_epoch - 1, 1); price = (price / epoch) * 10',
    treasuryScaling: [
      'if treasury > 1500: price = (price * 30) / 20',        // +50%
      'if treasury > 3000: price = (price * 3) / 2',          // +50% again
    ],
    allianceDiscount: [
      'if allied AND techLevel < other: price /= 2',
      'if allied AND techLevel >= other: price -= price / 4',  // 25% off
      'if allied AND techLevel + 4 < other: price /= 2',      // additional halving
    ],
    clamp: 'clamp(100, 30000)',
    sourceAddr: '0x004591CB',
  },

  // --- Gold-to-attitude conversion (calc_gold_to_attitude @ 0x0045B472) ---
  goldToAttitude: {
    formula: 'Diminishing returns: first 50g at 1:10, then 100g brackets at 1:(10+5n)',
    pseudocode: `
      attitude = 0; divisor = 10; bracket = 50
      while gold > 0:
        portion = min(gold, bracket)
        attitude += portion / divisor
        divisor += 5; gold -= bracket; bracket = 100
    `,
    examples: {
      gold50: 'attitude = 5',
      gold100: 'attitude = 5 + (50/15) = ~8',
      gold250: 'attitude = 5 + 6 + 5 = ~16',
    },
    sourceAddr: '0x0045B472',
  },

  // --- Gold gift in parley (parley_execute_give_gold @ 0x004DDF04) ---
  goldGiftPenalty: {
    formula: '-(abs(amount) * 3 / 2) attitude adjustment',
    sourceAddr: '0x004DDF04',
  },

  // --- Tech gift attitude (show_gift_menu @ 0x0045F0B1) ---
  techGiftAttitude: {
    bestTech: 'adjust_attitude(civB, civA, -(tech_value * 4))',
    secondTech: 'adjust_attitude(civB, civA, -(tech_value * 2))',
    sourceAddr: '0x0045F0B1',
  },

  // --- Tech exchange attitude (handle_exchange_gift @ 0x0045950B) ---
  techExchangeAttitude: {
    formula: 'adjust_attitude(civB, civA, -(techValue * 2))',
    sourceAddr: '0x0045950B',
  },

  // --- Tribute calculation (ai_evaluate_diplomacy @ 0x0045705E) ---
  tributeFormula: {
    // Per-continent scan accumulates tributeAmount
    continentScan: 'tributeAmount += (civA_strength * difficulty_factor) / (civB_strength + 1)',
    personalityDivision: 'tributeAmount /= ((patience - 1) / 2 + 1)',
    finalTribute: 'tribute = ((difficulty + 1) * techDemand + 16) / 32 * 50',
    treasuryClamp: 'if tribute > treasury AND tribute < treasury*2 AND treasury > 49: tribute = (treasury/50)*50',
    resetAfterDemands: 'if consecutiveDemands > 9: reset to 0',
    sourceAddr: '0x0045705E',
  },

  // --- Map sharing value (parley_execute_share_maps @ 0x004DD8AD) ---
  mapSharing: {
    modes: {
      full: 'mode=0: share tiles + units + cities (3 passes, 21-tile radius reveal)',
      visibility: 'mode=1: share tile visibility + cities only',
    },
    mapPrereqTechs: 'Alphabet (0x2E) and/or Writing required for map exchange',
    mapRefusalConditions: [
      'At war (no alliance)',
      'attitudeScore > 25 (too hostile)',
      'Neither civ has Alphabet (0x2E)',
    ],
    sourceAddr: '0x004DD8AD',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY EVALUATION GLOBALS — Output variables of ai_evaluate_diplomacy
// Source: FUN_0045705E @ 0x0045705E (6616 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const DIPLO_EVAL_GLOBALS = {
  wantsToInitiate:       { addr: 'DAT_0064b0e8', desc: 'Should initiate diplomacy (0/1)' },
  tributeAmount:         { addr: 'DAT_0064b0ec', desc: 'Computed tribute demand (gold)' },
  borderViolations:      { addr: 'DAT_0064b0f4', desc: 'Count of border-violating units' },
  wantsMore:             { addr: 'DAT_0064b0f8', desc: '0=satisfied, 1=wants tribute, 2=aggressive demand' },
  thirdPartyCivForTech:  { addr: 'DAT_0064b0fc', desc: 'Third-party civ for tech demand (-1=none)' },
  thirdPartyCivForCancel: { addr: 'DAT_0064b100', desc: 'Third-party civ for treaty cancel (-1=none)' },
  thirdPartyCivForWar:   { addr: 'DAT_0064b104', desc: 'Third-party civ for war target (-1=none)' },
  lastTributeTurn:       { addr: 'DAT_0064b108', desc: 'Turn of last tribute payment' },
  negotiatingCivB:       { addr: 'DAT_0064b110', desc: 'CivB in current negotiation' },
  liveAttitudeScore:     { addr: 'DAT_0064b114', desc: 'Live attitude score during negotiation' },
  techDemand:            { addr: 'DAT_0064b118', desc: 'Computed tech demand value' },
  shouldDeclareWar:      { addr: 'DAT_0064b11c', desc: 'Flag: should declare war (0/1)' },
  negotiatingCivA:       { addr: 'DAT_0064b120', desc: 'CivA in current negotiation' },
  wantsMap:              { addr: 'DAT_0064b128', desc: 'Wants to exchange maps (0/1)' },
  wantsDeclareWar:       { addr: 'DAT_0064b13c', desc: 'Final war-desire flag' },
  shouldDeclareWarScore: { addr: 'DAT_0064b140', desc: 'War-desire score (higher = more aggressive)' },
  techToSell:            { addr: 'DAT_0064b144', desc: 'Tech ID to sell (-1=none)' },
  wantsNothing:          { addr: 'DAT_0064b148', desc: '0=open to offers, 1=satisfied, 2=aggressive' },
};

// ═══════════════════════════════════════════════════════════════════════
// PATIENCE THRESHOLD — calc_patience_threshold
// Source: FUN_00456F8B @ 0x00456F8B (211 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const PATIENCE_THRESHOLD = {
  base: 2,                                                     // @ 0x00456F8B
  lowAttitudeBonus: 'if liveAttitudeScore < 25: threshold = 3', // +1
  highAttitudeReduction: 'if liveAttitudeScore > 60: threshold -= 1',
  statueOfLibertyBonus: 'if has_wonder(STATUE_OF_LIBERTY): threshold += 1',
  embassyBonus: 'if treaty & 0x04 (embassy): threshold += 1',
  allianceBonus: 'if treaty & 0x08 (alliance): threshold += 2',
  hatredOverride: 'if treaty_byte1 & 0x20 (vendetta): threshold = 2', // hard reset
  sourceAddr: '0x00456F8B',
};

// ═══════════════════════════════════════════════════════════════════════
// AI NEGOTIATION MENU — diplo_ai_negotiate response handler
// Source: FUN_0045B4DA @ 0x0045B4DA (10271 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const NEGOTIATE_MENU_CHOICES = {
  PROPOSE_ALLIANCE: {
    id: 1,
    desc: 'Player proposes alliance to AI',
    willingnessFactors: [
      'thirdPartyCiv existence (-/+ depending)',
      'difficulty < 2: willingness--',
      'both weak: willingness--',
      'civA weaker: willingness++ per difficulty tier',
      'shouldDeclareWar: willingness++',
      'tributeAmount > 0: willingness--',
      'civB_is_weaker: willingness--',
    ],
    demands: [
      'Tech prerequisite (PERHAPSSECRET dialog)',
      'Gold prerequisite (PERHAPSTHROWIN dialog)',
      'Joint war vs third party (PERHAPSSOLIDARITY dialog)',
    ],
    refusalReasons: [
      'ALLIANCENOSMALL — weaker civ',
      'ALLIANCENOPATIENCE — low patience',
      'ALLIANCENODISLIKE — hostile attitude',
      'ALLIANCENOWINNING — AI is winning',
      'ALLIANCENOBETRAY — bad reputation',
      'NOBETRAYWEAK — weak + desperate',
    ],
    sourceAddr: '0x0045B4DA case 1',
  },
  PROPOSE_PEACE: {
    id: 2,
    desc: 'Player proposes peace treaty',
    condition: 'shouldDeclareWar == 0 AND attitudeScore < 51 AND reputation <= threshold',
    refusalReasons: [
      'PEACENOWINNING',
      'PEACENODISLIKE',
      'PEACENOPATIENCE',
      'PEACENOBETRAY',
    ],
    sourceAddr: '0x0045B4DA case 2',
  },
  CEASEFIRE: {
    id: 3,
    desc: 'Player proposes ceasefire',
    attitudeBonus: 'adjust_attitude(civB, civA, 5-10) depending on relative power',
    sourceAddr: '0x0045B4DA case 3',
  },
  SURRENDER: {
    id: 4,
    desc: 'Player surrenders / submits',
    attitudeBonus: 'adjust_attitude(civB, civA, 10)',
    sourceAddr: '0x0045B4DA case 4',
  },
  WAR_WEARINESS: {
    id: 5,
    desc: 'War weariness response',
    attitudeBonus: 'adjust_attitude(civB, civA, 2)',
    sourceAddr: '0x0045B4DA case 5',
  },
  CANCEL_ALLIANCE: {
    id: 6,
    desc: 'Player cancels alliance',
    effects: [
      'clear_treaty_flags(ALLIANCE)',
      'adjust_attitude(civB, civA, 50)',  // major hostility
      'patience++',
    ],
    sourceAddr: '0x0045B4DA case 6',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY MAIN MENU — diplo_show_main_menu
// Source: FUN_0045FE19 @ 0x0045FE19 (747 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const DIPLO_MAIN_MENU = {
  options: [
    { id: 0, label: 'Negotiate',       condition: 'always',                sourceAddr: '0x0045FE19' },
    { id: 1, label: 'Propose peace',   condition: 'hasPeace (treaty & 0x04)' },
    { id: 2, label: 'Propose ceasefire', condition: '!hasPeace AND !isAllied' },
    { id: 3, label: 'Demand tribute',  condition: 'isAllied (treaty & 0x08)' },
    { id: 4, label: 'Ask for map',     condition: '!isAllied AND military_happiness < 5' },
    { id: 5, label: 'Cancel treaty',   condition: 'hasPeace AND no recent_peace (0x40)' },
    { id: 6, label: 'Cancel alliance', condition: 'isAllied' },
    { id: 7, label: 'Gift',            condition: 'always' },
    { id: 8, label: 'End audience',    condition: 'always' },
  ],
  sourceAddr: '0x0045FE19',
};

// ═══════════════════════════════════════════════════════════════════════
// GIFT MENU — show_gift_menu
// Source: FUN_0045F0B1 @ 0x0045F0B1 (3218 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const GIFT_MENU = {
  options: [
    {
      id: 1, label: 'Give technology',
      attitudeEffect: 'best: -(tech_value * 4), second: -(tech_value * 2)',
      patienceCost: 'patience -= (giftCount + 2); giftCount++',
      sourceAddr: '0x0045F0B1 choice 1',
    },
    {
      id: 2, label: 'Give gold',
      amounts: '25%/50%/75%/100% of treasury, rounded to nearest 50',
      attitudeEffect: '-(calc_gold_to_attitude(amount) * 3 / 2)',
      patienceCost: 'patience -= (giftCount + 2); giftCount++',
      sourceAddr: '0x0045F0B1 choice 2',
    },
    {
      id: 3, label: 'Give military unit',
      conditions: [
        'attitudeLevel <= 4',
        'civA_techLevel >= civB_techLevel',
        'civA_difficulty >= civB_difficulty',
        'civA_military >= civB_military',
      ],
      attitudeEffect: '-(UNIT_UPKEEP[unitType] * 3), halved if civB has relevant tech',
      specialEffect: '50% chance: grant prerequisite tech for gifted unit type',
      sourceAddr: '0x0045F0B1 choice 3',
    },
  ],
  sourceAddr: '0x0045F0B1',
};

// ═══════════════════════════════════════════════════════════════════════
// FAVOR MENU — diplo_favor_menu
// Source: FUN_0045DD7F @ 0x0045DD7F (4878 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const FAVOR_MENU = {
  options: [
    {
      id: 1, label: 'Exchange tech',
      handler: 'handle_exchange_gift(civA, civB, -1, -1, 0, 0)',
      sourceAddr: '0x0045DD7F choice 1',
    },
    {
      id: 2, label: 'Hire mercenary (declare war on third party)',
      priceFormula: 'clamp(complex_formula(reputation, treasury, military), 2, 500) * 50',
      modifiers: [
        'no treaty: -33%',
        'richer player: +33%',
        'allied target: *3 clamped 500-25000',
        'emperor target: /2',
        'target not at war with player: +33%',
      ],
      refusal: 'reputationScore > 6: HELLNOWEWONTGO',
      betrayalChance: '50% if friendly with target: MERCBETRAY / MERCBETRAYALLY',
      sourceAddr: '0x0045DD7F choice 2',
    },
    {
      id: 3, label: 'Exchange maps',
      conditions: [
        'Not at war (or allied)',
        'attitudeScore <= 25 (or has Alphabet tech 0x2E)',
        'or: has wonder 9 (Intelligence Agency) or wonder 12 (Marco Polo)',
      ],
      effect: 'Mutual tile/unit/city visibility reveal, patience += 2',
      sourceAddr: '0x0045DD7F choice 3',
    },
  ],
  sourceAddr: '0x0045DD7F',
};

// ═══════════════════════════════════════════════════════════════════════
// WAR DECLARATION — diplo_declare_war reputation effects
// Source: FUN_0045AC71 @ 0x0045AC71 (1125 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const WAR_DECLARATION = {
  reputationDamage: {
    breakingAlliance: {
      desc: 'Worst damage — double penalty for breaking alliance',
      effects: [
        'patience++ (if emperor, cities>4, no third party)',
        'patience++ (if difficulty>0 AND no Statue of Liberty)',
        'adjust_attitude(thirdParty, civA, -15)',
        'provocation flag set (0x10)',
        'If also had peace+ceasefire: penalties doubled',
      ],
      sourceAddr: '0x0045AC71',
    },
    breakingPeace: {
      desc: 'Moderate damage — breaking peace/ceasefire treaty',
      effects: [
        'patience++ (single)',
        'adjust_attitude(thirdParty, civA, -5)',
        'declared war flag 0x2000',
      ],
      sourceAddr: '0x0045AC71',
    },
    noTreaty: {
      desc: 'Minimal damage — no existing treaty',
      effects: [
        'patience++ (if difficulty>0 AND no Statue of Liberty)',
        'patience++ (if no third party)',
        'adjust_attitude(thirdParty, civA, -25)',
      ],
      sourceAddr: '0x0045AC71',
    },
  },
  allianceActivation: {
    desc: 'Allies are dragged into war via diplo_activate_alliance_wars',
    humanAlly: 'ACTIVATEALLY dialog, adjust_attitude(ally, enemy, 100)',
    aiAlly: 'ALLYHELPS notification, auto-declare war',
    sourceAddr: '0x0045A8E3',
  },
  sourceAddr: '0x0045AC71',
};

// ═══════════════════════════════════════════════════════════════════════
// WAR READINESS — calc_war_readiness
// Source: FUN_0055BBC0 @ 0x0055BBC0 (820 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const WAR_READINESS = {
  globals: {
    warLastCity:       { addr: 'DAT_006ab5e4', desc: 'Last city scanned' },
    warCityCount:      { addr: 'DAT_00633ac8', desc: 'Count of threatened cities' },
    warUnitCount:      { addr: 'DAT_006ab5e0', desc: 'Count of mobilized units' },
    warReadinessScore: { addr: 'DAT_006ab5e8', desc: 'Total readiness score' },
    warVeteranCount:   { addr: 'DAT_006ab5ec', desc: 'Count of previously mobilized units' },
  },
  scoring: {
    basePerUnit: 1,
    tileImprovementBonuses: {
      road:     { bonus: 1, tileBit: 0x10, sourceAddr: '0x0055BBC0' },
      railroad: { bonus: 1, tileBit: 0x20, sourceAddr: '0x0055BBC0' },
      fortress: { bonus: 1, tileBit: 0x08, sourceAddr: '0x0055BBC0' },
      cityTile: { bonus: 1, tileBit: 0x04, sourceAddr: '0x0055BBC0' },
      airbase:  { bonus: 2, tileBit: 0x40, sourceAddr: '0x0055BBC0' },
    },
    multiUnitBonus: 'if unitsInCity > 3: warVeteranCount += 1',
  },
  sourceAddr: '0x0055BBC0',
};

// ═══════════════════════════════════════════════════════════════════════
// AI SHOULD DECLARE WAR — ai_should_declare_war decision tree
// Source: FUN_0055CBD5 @ 0x0055CBD5 (1549 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const AI_WAR_DECISION = {
  fastPaths: {
    recentlyAttacked: 'if treaty_byte1 & 0x08: return true',     // @ 0x0055CBD5
    hasEmbassyProvocation: 'if treaty & 0x10: return true',
  },
  thirdPartyChecks: {
    desc: 'Scan civs 1-7 for powerful allies that would deter war',
    deterrent: 'If thirdCiv allied with target AND stronger: return false (dont provoke)',
  },
  powerRankingCheck: 'if civA.powerRanking < civB.powerRanking: return false',
  allyScoring: {
    allyOfAttacker: '+1 per ally',
    mutualAlly: '+1, +1 more if very powerful',
    unreliableAlly: '-1 (allied with us but at war with target)',
    superpowerEnemy: '-1 (rank 7 at war with target, turn > 199)',
    noVendetta: '+1 if no existing vendetta with target',
    existingWar: '+1 if already at war',
  },
  continentStrengthCheck: {
    outgunned: 'if outgunned on any continent with goals: return false',
    formula: 'ourStrength += continent_atk; theirStrength += (continent_atk >> 1) + continent_mil',
  },
  finalDecision: {
    formula: '(ourStrength << 2) / theirStrengthPlusDefense < threshold',
    threshold: 'allyScore - patience + 4',
    result: 'if below threshold AND continentCount > 0: return false (not strong enough)',
  },
  perContinentData: {
    militaryCounts: 'DAT_0064c832',                              // @ 0x0055CBD5
    attackStrength: 'DAT_0064c8b2',
    goalFlags: 'DAT_0064c932',
  },
  powerRankingAddr: 'DAT_00655c22 (0-7 scale, 7 = superpower)',
  sourceAddr: '0x0055CBD5',
};

// ═══════════════════════════════════════════════════════════════════════
// AI TECH EXCHANGE — ai_tech_exchange between two AI civs
// Source: FUN_0055D1E2 @ 0x0055D1E2 (1182 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const AI_TECH_EXCHANGE = {
  scenarioBlock: 'if (game_flags & 0x80) AND (scenario_flags & 0x20): blocked',
  superiorCivBlock: {
    desc: 'If strongest human civ has power rank >= 5, turn > 200, higher tech: block AI exchange',
    sourceAddr: '0x0055D1E2',
  },
  scoring: {
    formula: 'score = rand() % 3 + calc_tech_value(civ, tech)',
    desc: 'Find best tech each civ can give the other, with slight randomization',
  },
  outcomes: {
    fairExchange: 'Both have something: swap best techs (grant_advance both)',
    tributeDemand: 'Only one side wants: if allied AND tech gap > (6-difficulty)*2, set 0x40000 flag + grant anyway',
    noExchange: 'Neither has useful tech: return 0',
  },
  sourceAddr: '0x0055D1E2',
};

// ═══════════════════════════════════════════════════════════════════════
// AI-vs-AI DIPLOMACY FLOW — process_diplomatic_contact
// Source: FUN_0055D8D8 @ 0x0055D8D8 (7326 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const AI_VS_AI_DIPLOMACY = {
  triggerCondition: {
    frequency: '(game_turn + civA + civB) % 4 == 0 OR wasFirstContact',
    desc: 'AI civs re-evaluate every 4 turns or on first contact',
    sourceAddr: '0x0055D8D8',
  },
  firstContact: {
    initialTreaty: 'set_treaty_flag(civA, civB, 0x401) — contact + ceasefire',
    recentContactFlag: 'set_treaty_flag(civA, civB, 0x4000)',
    sourceAddr: '0x0055D8D8',
  },
  peacePath: {
    condition: '(warA == 0 OR peaceBlocked_A) AND (warB == 0 OR peaceBlocked_B)',
    peaceBlockers: [
      'civ_has_wonder(Great Wall, 6)',
      'civ_has_wonder(United Nations, 0x18)',
      'government > 4 (Republic/Democracy) AND no attacked flag',
    ],
    actions: [
      'ai_tech_exchange(civA, civB)',
      'If no peace treaty yet: set peace flag 0x04',
      'Alliance evaluation (check power ranks, mutual enemies)',
    ],
  },
  allianceFormation: {
    superpowerBlock: 'rank 7 + rank > 3 => wont ally',
    mutualEnemyRequired: 'Search for third civ both dislike or are at war with',
    breakExisting: 'If no mutual enemy AND existing alliance: clear 0x08',
    formNew: 'set_treaty_flag(0x08) + check_join_war against mutual enemy',
    sourceAddr: '0x0055D8D8',
  },
  warPath: {
    condition: 'warA or warB is true',
    actions: [
      'Notify allied human players (ALLYMAKESWAR)',
      'Clear peace flag 0x04',
      'Set vendetta 0x2000',
      'If had embassy: clear + set betrayal 0x800',
    ],
  },
  mpEvents: {
    parleyRequest: { id: 0x3D, desc: 'Send parley request to remote player' },
    timeout: { id: 0x81, desc: 'Parley timeout notification' },
    redirect: { id: 0x99, desc: 'Redirect diplomacy to remote human player' },
  },
  sourceAddr: '0x0055D8D8',
};

// ═══════════════════════════════════════════════════════════════════════
// PARLEY DIALOG FLOW — The sequence of a diplomatic meeting
// Source: diplo_ai_emissary @ 0x00458DF9 (880 bytes),
//         diplo_show_greeting @ 0x00458AB1 (804 bytes),
//         diplo_show_main_menu @ 0x0045FE19 (747 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_DIALOG_FLOW = {
  steps: [
    {
      step: 1,
      name: 'Emissary approach',
      func: 'diplo_ai_emissary',
      desc: 'Pre-diplomacy screen: nuclear check, evaluate, validate position',
      options: ['Accept audience', 'Refuse', 'Spy mission (result=2)'],
      sourceAddr: '0x00458DF9',
    },
    {
      step: 2,
      name: 'Greeting',
      func: 'diplo_show_greeting',
      desc: 'Ruler portrait, government type, attitude-based text from GREETINGS section',
      attitudeLevels: 'Text varies by war/peace state + random(0,3) variant',
      nuclearNotification: 'If either civ has nukes: add NUCLEARWEAPONS option',
      sourceAddr: '0x00458AB1',
    },
    {
      step: 3,
      name: 'Main menu',
      func: 'diplo_show_main_menu',
      desc: 'Dynamic menu based on treaty status — see DIPLO_MAIN_MENU',
      sourceAddr: '0x0045FE19',
    },
    {
      step: 4,
      name: 'AI response',
      func: 'diplo_ai_negotiate',
      desc: 'Process player choice, generate AI response — see NEGOTIATE_MENU_CHOICES',
      sourceAddr: '0x0045B4DA',
    },
  ],
  stateFlags: {
    greetingShown:  { addr: 'DAT_00626a24', desc: 'Greeting has been displayed' },
    dialogActive:   { addr: 'DAT_00626a30', desc: 'Dialog is in progress' },
    dialogResult:   { addr: 'DAT_00626a34', desc: 'Dialog result code' },
    aiInitiated:    { addr: 'DAT_00626a1c', desc: 'AI-initiated meeting flag' },
    mpDiploActive:  { addr: 'DAT_00626a2c', desc: 'MP diplomacy in progress' },
    mpParleyTarget: { addr: 'DAT_0067a8c0', desc: 'MP parley target civ (-1=none)' },
  },
  resetFunc: { name: 'diplo_reset_state', sourceAddr: '0x0045918E' },
};

// ═══════════════════════════════════════════════════════════════════════
// MP PARLEY PACKET FORMAT — Network diplomacy protocol
// Source: parley_build_packet @ 0x004DB690 (1060 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_PACKET = {
  header: {
    magic:      { offset: 0x00, value: 0x66606660, desc: 'Packet magic number' },
    msgId:      { offset: 0x04, value: 0x82,       desc: 'Message type: parley' },
    totalSize:  { offset: 0x08,                     desc: 'Total packet size in bytes' },
    remoteCiv:  { offset: 0x10,                     desc: 'Remote civ ID (this+0x1ec)' },
    localCiv:   { offset: 0x14,                     desc: 'Current player (DAT_006d1da0)' },
    sessionId:  { offset: 0x18,                     desc: 'Session identifier (this+0x118)' },
    offerFlags: { offset: 0x1c,                     desc: 'Offer flags bitfield' },
  },
  offerPayload: {
    offset: 0x20,
    desc: 'First side offer data (type-dependent)',
    secondSide: 'For TRADE (0xe): second offer at offset 0x20 + firstSideSize',
  },
  offerEntryFormat: {
    type:  { offset: 0, desc: 'Transaction type (see TRANSACTION_TYPES)' },
    value: { offset: 1, desc: 'Type-dependent value (treaty type, tech id, gold amount, attitude level)' },
    count: { offset: 2, desc: 'Number of items (for lists)' },
    items: { offset: 3, desc: 'Item list (tech ids, unit seq ids, city seq ids)' },
  },
  buildSourcePath: 'D:\\Ss\\Franklinton\\parleywin.tran',
  sourceAddr: '0x004DB690',
};

// ═══════════════════════════════════════════════════════════════════════
// ATTITUDE LEVELS — How attitude scores map to behavior
// Source: ai_evaluate_diplomacy @ 0x0045705E
//         calc_patience_threshold @ 0x00456F8B
// ═══════════════════════════════════════════════════════════════════════

export const ATTITUDE_THRESHOLDS = {
  // The binary uses continuous attitude scores (0-100) with these thresholds:
  hostile:   { range: [0, 25],   desc: 'techDemand /= 2; wantsMore = 0',
               sourceAddr: '0x0045705E' },
  unfriendly: { range: [26, 50], desc: 'techDemand = techDemand * 2 / 3' },
  neutral:   { range: [51, 74],  desc: 'Standard behavior' },
  friendly:  { range: [75, 100], desc: 'techDemand = techDemand * 3 / 2; wantsMore = 1' },

  // Clamps applied at end of evaluation:
  clamps: [
    'if tributeAmount == 0 AND attitudeScore < 2: attitudeScore = 1',
    'if no vendetta AND attitudeScore > 98: attitudeScore = 99',
    'if (alliance OR wantsNothing == 0) AND attitudeScore > 73: attitudeScore = 74',
    'if vendetta AND attitudeScore < 27: attitudeScore = 26',
  ],

  // Attitude adjustment function
  adjustFunc: {
    name: 'adjust_attitude',
    params: '(civA, civB, delta)',
    desc: 'Adds delta to civA attitude toward civB; updates live negotiation tracker if pair matches',
    sourceAddr: '0x00456F20',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// WONDER EFFECTS ON DIPLOMACY
// Source: Various functions in blocks 00450000 and 00550000
// ═══════════════════════════════════════════════════════════════════════

export const DIPLO_WONDER_EFFECTS = {
  GREAT_WALL: {
    wonderId: 6,
    effects: [
      'shouldDeclareWar = 0 (prevents AI war declaration)',       // @ 0x0045705E
      'wantsMore = 0 (no tribute demands)',
      'attitudeScore -= 10',
      'AI-vs-AI peace blocking',                                 // @ 0x0055D8D8
      'goldDemand = 0 in ceasefire negotiation',                  // @ 0x0045B4DA
    ],
    sourceAddr: '0x0045705E, 0x0055D8D8',
  },
  UNITED_NATIONS: {
    wonderId: 0x18, // 24
    effects: [
      'Same as Great Wall effects',
      'senate_war_check override',
      'CONTINUEUN war weariness dialog instead of CONTINUEHAWKS',
    ],
    sourceAddr: '0x0045705E, 0x0045FD67',
  },
  GREAT_LIBRARY: {
    wonderId: 9,
    effects: ['techDemand += techDemand / 4 (25% bonus to tech demand value)'],
    sourceAddr: '0x0045705E',
  },
  STATUE_OF_LIBERTY: {
    wonderId: 0x13, // 19
    effects: [
      'patience threshold += 1',                                  // @ 0x00456F8B
      'War declaration: patience penalty skipped',                 // @ 0x0045AC71
    ],
    sourceAddr: '0x00456F8B, 0x0045AC71',
  },
  MARCO_POLO: {
    wonderId: 0x18, // shared with UN in some contexts
    note: 'Marco Polo (wonder 9) vs UN (wonder 24/0x18) — verify per context',
    effects: [
      'check_can_declare_war: betrayal threshold = 50',            // @ 0x0055BEF9
      'Intelligence access for notifications',
    ],
    sourceAddr: '0x0055BEF9',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// AI GOAL SYSTEM — Binary goal data structures
// Source: block_00490000 pseudocode, FUN_0049301B..FUN_0049376F
// Data:   DAT_0064cab4 (List A), DAT_0064cbd4 (List B), per civ stride 0x594
// ═══════════════════════════════════════════════════════════════════════

export const AI_GOALS = {
  // --- Goal types (from binary goal type byte) ---
  types: [
    { id: 0xFF, name: 'EMPTY',         desc: 'Empty/cleared slot (type = 0xFF)' },
    { id: 0,    name: 'NONE',          desc: 'No goal (JS-side sentinel, binary uses 0xFF)' },
    { id: 1,    name: 'ATTACK_CITY',   desc: 'Attack an enemy city' },
    { id: 2,    name: 'DEFEND_CITY',   desc: 'Defend own city' },
    { id: 3,    name: 'EXPLORE',       desc: 'Explore / scout area' },
    { id: 4,    name: 'BUILD_ROAD',    desc: 'Build road to location' },
    { id: 5,    name: 'ESCORT',        desc: 'Escort another unit' },
    { id: 6,    name: 'TRANSPORT',     desc: 'Transport units by sea' },
    { id: 7,    name: 'NAVAL_ASSAULT', desc: 'Naval assault on coastal target' },
    { id: 8,    name: 'AIR_STRIKE',    desc: 'Air strike target' },
    { id: 9,    name: 'REINFORCE',     desc: 'Reinforce position' },
  ],

  // --- Data structure ---
  dataLayout: {
    listA: {
      offset: '+0x414 in civ record (DAT_0064cab4)',
      maxEntries: 48,
      entrySize: 6,
      entryFormat: '[x:int16, y:int16, type:int8, priority:int8]',
      desc: 'Long-term / tactical goals, priority-sorted',
      sourceAddr: '0x0064CAB4',
    },
    listB: {
      offset: '+0x534 in civ record (DAT_0064cbd4)',
      maxEntries: 16,
      entrySize: 6,
      entryFormat: '[x:int16, y:int16, type:int8, priority:int8]',
      desc: 'Short-term / strategic goals, merged into List A each turn',
      sourceAddr: '0x0064CBD4',
    },
  },

  // --- Functions ---
  functions: {
    ai_add_goal_a: {
      desc: 'Add goal to List A (48 slots). Priority-sorted insertion with recursive shift.',
      unitRedirection: 'If human civ AND type 2 or 3: redirect nearby idle units toward goal (GOTO)',
      existingCheck: 'If exact (x,y,type) match with higher priority exists: skip',
      sourceAddr: '0x0049301B',
    },
    ai_add_goal_b: {
      desc: 'Add goal to List B (16 slots). Same logic but no unit redirection.',
      sourceAddr: '0x004933F2',
    },
    ai_negate_goal_priority: {
      desc: 'Take absolute value then negate. Marks goal for removal next turn.',
      formula: 'priority = -abs(priority)',
      sourceAddr: '0x00492B60',
    },
    ai_remove_goals_near: {
      desc: 'Remove goals from List B within isometric distance of (x,y)',
      listScope: 'List B only (16 entries)',
      clearMarker: 'type = 0xFF, priority = 0',
      sourceAddr: '0x00492C15',
    },
    ai_find_max_goal_priority: {
      desc: 'Find max abs(priority) for matching (x,y,type) in List A',
      returns: 'Absolute value of max priority (considers both active and cancelled)',
      sourceAddr: '0x00492E60',
    },
    ai_decay_and_merge_goals: {
      desc: 'Called once per turn. Two-turn decay cycle:',
      steps: [
        'Step 1: In List A, remove entries with negative priority (decayed last turn)',
        'Step 2: Negate all List A priorities (mark active goals for potential removal)',
        'Step 3: Merge List B goals into List A (promoting short-term to long-term)',
      ],
      decayCycle: '2 turns — goal must be refreshed (re-added) within 2 turns or it dies',
      sourceAddr: '0x00493602',
    },
    ai_clear_goals_b: {
      desc: 'Clear all List B entries (type=0xFF, priority=0)',
      sourceAddr: '0x0049376F',
    },
  },

  // --- Per-continent data used by goal evaluation ---
  continentData: {
    continentGoals: { addr: 'DAT_0064c9f2', desc: 'Per-continent goal flags' },
    continentAtk:   { addr: 'DAT_0064c8b2', desc: 'Per-continent attack strength' },
    continentMil:   { addr: 'DAT_0064c832', desc: 'Per-continent military unit count' },
    continentGoalCount: { addr: 'DAT_0064c932', desc: 'Per-continent goal count' },
    continentStatus: { desc: 'Continent-level status (attack=4, defend=5 in ai_military_aid)' },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CIVILIZATION NAMING — How civ names, leader titles, and adjectives work
// Source: block_00490000 functions FUN_00493b10..FUN_00493d13
//         Data: DAT_0064c6a6 (styleIndex), DAT_00655502 (leader name table),
//               DAT_0064bcfa (custom civ names, stride 0xF2)
// ═══════════════════════════════════════════════════════════════════════

export const CIV_NAMING = {
  // --- Name resolution algorithm ---
  assignmentAlgorithm: {
    desc: 'Civ names resolve through a two-level lookup: styleIndex -> leader name table -> LABELS.TXT',
    steps: [
      '1. Read civ.styleIndex from civ record (+0x6A6 in civ struct, addr DAT_0064c6a6)',
      '2. Use styleIndex * 0x30 as base into leader name table (DAT_00655502)',
      '3. Read name index from table at appropriate offset',
      '4. If index >= 0: return LABELS.TXT[index]',
      '5. If index < 0: return custom name from DAT_0064bcfa[civ_id * 0xF2 + fieldOffset]',
    ],
    barbarianSpecialCase: 'civ_id < 1: returns hardcoded label from LABELS.TXT (different per function)',
  },

  // --- Name types and their offsets ---
  nameTypes: {
    nounName: {
      func: 'get_civ_noun_name',
      tableOffset: 0x502,       // leader_name_table[style * 0x30 + 0x502]
      customOffset: 0x00,       // custom_names[civ_id * 0xF2 + 0x00]
      barbarianLabel: 'DAT_00628420 + 0x44',
      example: '"Romans", "Babylonians", "Germans"',
      sourceAddr: '0x00493B10',
    },
    peopleName: {
      func: 'get_civ_people_name',
      tableOffset: 0x504,       // leader_name_table[style * 0x30 + 0x504]
      customOffset: 0x18,       // custom_names[civ_id * 0xF2 + 0x18]
      barbarianLabel: 'DAT_00628420 + 0x3C',
      example: '"Roman", "Babylonian", "German" (people form)',
      sourceAddr: '0x00493C7D',
    },
    adjectiveName: {
      func: 'get_civ_adjective_name',
      tableOffset: 0x506,       // leader_name_table[style * 0x30 + 0x506]
      customOffset: 0x30,       // custom_names[civ_id * 0xF2 + 0x30]
      barbarianLabel: 'DAT_00628420 + 0x40',
      example: '"Roman", "Babylonian", "German" (adjective form)',
      sourceAddr: '0x00493D13',
    },
    leaderTitle: {
      func: 'get_civ_leader_title',
      desc: 'Government-dependent title (e.g., Emperor, President, Comrade)',
      formula: 'leader_name_table[style * 0x30 + 0x50C + portraitIdx * 2 + govtType * 4]',
      portraitSource: 'DAT_006554fc (leader portrait offset)',
      govtSource: 'DAT_0064c6b5 (government type, 0-6)',
      customOffset: 'custom_leader_titles[civ_id * 0xF2 + govtType * 0x18]',
      sourceAddr: '0x00493BA6',
    },
  },

  // --- Data addresses ---
  dataAddresses: {
    styleIndex:       'DAT_0064c6a6 + civ_id * 0x594',
    leaderNameTable:  'DAT_00655502',
    customCivNames:   'DAT_0064bcfa (stride 0xF2 per civ)',
    customLeaderTitles: 'DAT_0064bd42 (stride 0x18 per govt per civ)',
    leaderPortrait:   'DAT_006554fc',
    governmentType:   'DAT_0064c6b5 + civ_id * 0x594',
    labelsTxtBase:    'DAT_00628420',
  },

  // --- City naming ---
  cityNaming: {
    desc: 'Cities are named sequentially from CIV_CITY_NAMES[rulesCivNumber] in defs.js',
    algorithm: [
      '1. On city founding, take next unused name from the civ city name list',
      '2. If list exhausted, city gets a generated/reused name',
      '3. Names are stored in city record at +0x18 (24 bytes, null-terminated string)',
    ],
    cityNameAddr: 'DAT_0064f360 + cityIdx * 0x58',
    note: 'Full city name lists already in defs.js CIV_CITY_NAMES (21 lists, 10-16 names each)',
  },

  // --- Leader assignment at game start ---
  leaderAssignment: {
    desc: 'Each civ slot (1-7) is assigned a rulesCivNumber (0-20) at game start',
    styleIndexDerivation: 'styleIndex = rulesCivNumber (for standard games), can be negative for scenarios',
    maxCivs: 21,
    maxPlayableSlots: 7, // slots 1-7, slot 0 = barbarians
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CITY TRANSFER — parley_transfer_city (diplomacy city gift/trade)
// Source: FUN_004DE0E2 @ 0x004DE0E2 (2217 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const CITY_TRANSFER = {
  buildingsRemoved: [
    { id: 1,  name: 'Palace',   sourceAddr: '0x004DE0E2' },
    { id: 4,  name: 'Temple',   sourceAddr: '0x004DE0E2' },
    { id: 0xb, name: 'Library', sourceAddr: '0x004DE0E2' },
    { id: 7,  name: 'Courthouse', sourceAddr: '0x004DE0E2' },
  ],
  tileRevealRadius: 21, // 0x14 + 1 spiral positions
  unitTransfer: {
    desc: 'Units in the city change ownership; units with home city but not in city are disbanded',
    newHomeCity: 'Assigned to nearest city of new owner',
    ordersCleared: 'orders = 0, goto_city = 0xFF',
  },
  recordUpdate: {
    originalOwner: 'city_data[cityIdx].original_owner = old_owner (+0x0A)',
    turnTransferred: 'city_data[cityIdx].turn_transferred = currentTurn (+0x0B)',
  },
  sourceAddr: '0x004DE0E2',
};

// ═══════════════════════════════════════════════════════════════════════
// AI GOVERNMENT SELECTION — ai_choose_government
// Source: FUN_0055F5A3 @ 0x0055F5A3 (558 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const AI_GOVERNMENT_SELECTION = {
  maxGovtCap: {
    normal: 6,           // Democracy
    revolution: 5,       // Cap during revolution
    revolutionLow: 4,    // 2/3 chance even lower cap during revolution
  },
  techDeficitDemotion: {
    desc: 'If not a superpower (rank < 6) and tech gap is large: auto-demote',
    gap6: 'govtPreference[0] = -2 (strong demotion)',
    gap8: 'govtPreference[-1] = -1 (extreme demotion)',
    sourceAddr: '0x0055F5A3',
  },
  personalityFormula: {
    desc: 'After government change, set personality: 4 - (adjustedGovt >> 1)',
    adjustedGovt: '(newGovt < 4) ? newGovt : newGovt - 1',
    result: 'Maps: Anarchy->4, Despotism->3, Monarchy->3, Communism->2, Fundamentalism->2, Republic->1, Democracy->1',
    sourceAddr: '0x0055C69D',
  },
  govtRankingAddr: 'DAT_0064ca74 + civIdx * 0x594 + govtType * 2 (signed short)',
  sourceAddr: '0x0055F5A3',
};

// ═══════════════════════════════════════════════════════════════════════
// SENATE WAR CHECK — check_can_declare_war (democracy restrictions)
// Source: FUN_0055BEF9 @ 0x0055BEF9 (365 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const SENATE_WAR_CHECK = {
  appliesToGovt: 'government >= 5 (Republic and Democracy)',
  betrayalThreshold: {
    base: 0,
    embassy: 'if treaty & 0x10 (embassy): threshold = 25',
    marcoPolo: 'if has_wonder(Marco Polo, 0x18): threshold = 50',
    patienceModifier: 'threshold = clamp(threshold + patience * 15, 0, 75)',
  },
  democracyRequires: 'senate override flag (civ.flags & 0x04)',
  higherGovt: 'government >= 6: always allowed',
  sourceAddr: '0x0055BEF9',
};
