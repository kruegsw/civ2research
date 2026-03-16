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
  // === Byte 0 (low byte) ===
  // Confirmed by: Civ2-clone Read.ClassicSav.cs (lines 303-308),
  //   FUN_004df10f treaty-signing switch (cases 0/1/2),
  //   EDITTREATIES dialog in FUN_0055d8d8 (checkboxes 0-6)
  CONTACT:           { bit: 0x01,    desc: 'Civs have met',
                       sourceAddr: 'FUN_0055d8d8: thunk_FUN_00467825(p1,p2,0x401)' },
  CEASEFIRE:         { bit: 0x02,    desc: 'Ceasefire treaty active',
                       sourceAddr: 'FUN_004df10f case 0: thunk_FUN_00467825(p2,p3,2)' },
  PEACE:             { bit: 0x04,    desc: 'Peace treaty active',
                       sourceAddr: 'FUN_004df10f case 1: thunk_FUN_00467825(p2,p3,4)' },
  ALLIANCE:          { bit: 0x08,    desc: 'Alliance active',
                       sourceAddr: 'FUN_004df10f case 2: thunk_FUN_00467825(p2,p3,8)' },
  VENDETTA:          { bit: 0x10,    desc: 'Vendetta — war grudge / embassy expelled on war declaration',
                       sourceAddr: 'Civ2-clone: GetBit(byte0, 4); FUN_0055d8d8 line 5915' },
  INTRUDER_FLAG:     { bit: 0x20,    desc: 'Set when both sides have embassies (shared intelligence)',
                       sourceAddr: 'FUN_0055d8d8 line 5430-5433; cleared by treaty cascade 0x2a60' },
  HOSTILITY_FLAG:    { bit: 0x40,    desc: 'Transient hostility flag, cleared by treaty cascade',
                       sourceAddr: 'FUN_00467825: cleared in mask 0x2a60' },
  EMBASSY:           { bit: 0x80,    desc: 'Embassy established',
                       sourceAddr: 'Civ2-clone: GetBit(byte0, 7); EDITTREATIES checkbox 6' },

  // === Byte 1 (bits 8-15 of the 32-bit treaty word) ===
  // Note: some binary code tests byte1 directly (DAT_0064c6c1). Byte1 bit N = word bit (N+8).
  NUKE_AWARENESS:    { bit: 0x100,   desc: 'Aware other civ has nuclear weapons',
                       sourceAddr: '0x0045705E' },
  // 0x0200 (bit 9): attacked/provocation flag, cleared by alliance proposal loop
  PERIODIC_FLAG_10:  { bit: 0x400,   desc: 'Set on first contact (0x401 = CONTACT + this)',
                       sourceAddr: 'FUN_0055d8d8: thunk_FUN_00467825(p1,p2,0x401)' },
  WAR_STARTED:       { bit: 0x800,   desc: 'War just started / attacked / betrayal flag',
                       sourceAddr: 'FUN_0045AC71; cleared every 32 turns' },
  CAPTURE_VENDETTA:  { bit: 0x1000,  desc: 'City capture vendetta (FUN_00579c40)',
                       sourceAddr: 'Set when neither side has nuclear pact; blood feud' },
  WAR:               { bit: 0x2000,  desc: 'At war (formally declared)',
                       sourceAddr: 'Civ2-clone: GetBit(byte1, 5); EDITTREATIES checkbox 4; FUN_0055d8d8 line 5914' },
  RECENT_CONTACT:    { bit: 0x4000,  desc: 'Recent contact flag (post first-contact)',
                       sourceAddr: 'FUN_0055d8d8: thunk_FUN_00467825(p1,p2,0x4000)' },

  // === Bytes 2-3 (bits 16-23+) ===
  CAPTURE_NOTIFY:    { bit: 0x10000, desc: 'City captured notification flag',
                       sourceAddr: 'FUN_0057b5df: thunk_FUN_00467825(attacker,defender,0x10000)' },
  NUCLEAR_ATTACK:    { bit: 0x20000, desc: 'Set on nuke attacker toward victim',
                       sourceAddr: 'FUN_0057f9e3: treaty[attacker][victim] |= 0x20000' },
  TRIBUTE_DEMANDED:  { bit: 0x40000, desc: 'Tribute has been demanded (alliance context)',
                       sourceAddr: 'FUN_0055d1e2: thunk_FUN_00467825(p1,p2,0x40000)' },
  PERIODIC_FLAG_19:  { bit: 0x80000, desc: 'Cleared every 32 turns',
                       sourceAddr: 'FUN_00560084 line 107' },
  WAR_TRACKING:      { bit: 0x200000, desc: 'Auto-set when WAR(0x2000) is set via cascade',
                       sourceAddr: 'FUN_00467825: if setting 0x2000, param_3 |= 0x200000' },
  MULTI_CAPTURE_VENDETTA: { bit: 0x400000, desc: 'Multiple captures vendetta',
                       sourceAddr: 'FUN_0057b5df',
                       compoundMask: '0x400008 (MULTI_CAPTURE_VENDETTA + ALLIANCE) used in alliance/vendetta cross-checks' },
  DIPLOMACY_ACTIVE:  { bit: 0x800000, desc: 'Diplomacy encounter active',
                       sourceAddr: 'FUN_00460129 line 163' },
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
  bestTechToDemand:      { addr: 'DAT_0064b124', desc: 'Best tech ID to demand/exchange (-1=none)' },
  secondBestTech:        { addr: 'DAT_0064b10c', desc: 'Second-best tech ID to demand/exchange (-1=none)' },
  ceasefireExpirePending:{ addr: 'DAT_0064b138', desc: 'Ceasefire expiration pending flag (nonzero=pending)' },
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
    acceptanceConstants: {
      earlyGameOverride: {
        condition: 'powerRank < 4 AND powerRank * 20 < currentTurn',
        rawC: '((byte)DAT_00655c22[param_1] < 4) && ((uint)(byte)DAT_00655c22[param_1] * 0x14 < DAT_00655af8)',
        effect: 'bVar2 = true (force accept alliance regardless of other factors)',
        note: 'Low-ranked civs in mid/late game are forced to accept alliance proposals',
      },
      hardReject: {
        attitudeAbove: 0x4B,  // 75: DAT_0064b114 > 0x4B always rejects
        rawC: 'if (0x4b < DAT_0064b114) bVar2 = false',
      },
      patienceBlockNonChieftain: {
        condition: 'patience > 4 AND difficulty > 0 (non-Chieftain)',
        rawC: 'if (\'\\x04\' < (char)DAT_0064c6bf[param_2*0x594]) && (DAT_00655b08 != 0)) bVar2 = false',
        note: 'DAT_00655b08 is difficulty level (0=Chieftain). On Chieftain, patience never blocks alliance.',
      },
      betrayalThreshold: {
        formula: '(-(difficulty==0) & 2) + 2',
        chieftain: 4,     // difficulty 0: threshold = (2) + 2 = 4 (more lenient)
        nonChieftain: 2,  // difficulty > 0: threshold = (0) + 2 = 2 (stricter)
        check: 'tolerance - attitude > threshold => reject',
        rawC: '(int)((-(uint)(DAT_00655b08 == 0) & 2) + 2) < (tolerance - attitude)',
        note: 'DAT_00655b08 is difficulty level, not multiplayer flag',
      },
    },
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
// TREATY EXECUTION — execute_alliance, execute_peace, execute_ceasefire
// Source: FUN_0045a535, FUN_0045a6ab, FUN_0045a7a8 @ block_00450000.c
// ═══════════════════════════════════════════════════════════════════════

export const TREATY_EXECUTION = {
  executeAlliance: {
    // @ FUN_0045a535 (374 bytes)
    attitudeAdjust: -25,         // 0xFFFFFFE7: thunk_FUN_00456f20(civB, civA, 0xffffffe7)
    treatyFlagSet: 0x08,         // thunk_FUN_00467825(civB, civA, 8) — set alliance bit
    civFlagsSet: 0x100,          // DAT_0064c6a0[civ*0x594] |= 0x100 — nuke awareness on BOTH civs
    clearDiploInit: true,        // DAT_0064b0e8 = 0 — reset diplomacy-initiate flag
    clearPatience: true,         // DAT_0064c6bf[civB*0x594] = 0 — reset patience counter
    lastContactTurn: true,       // DAT_0064ca82[civA*0x594 + civB*2] = current_turn
    dialogString: 'ALLIANCE',    // game.txt dialog key
    rawC: 'thunk_FUN_00456f20(p2,p1,0xffffffe7); thunk_FUN_00467825(p2,p1,8); DAT_0064c6a0[p*0x594]|=0x100',
    sourceAddr: '0x0045A535',
  },

  executePeace: {
    // @ FUN_0045a6ab (253 bytes)
    treatyFlagsSet: 0x4004,      // thunk_FUN_00467825(civB, civA, 0x4004) — PEACE(0x04) + RECENT_CONTACT(0x4000)
    attitudeClamp: { min: 0, max: 0x32 },  // thunk_FUN_00467904(civB, civA, 0, 0x32) → clamp attitude to 0-50
    clearPatience: true,         // DAT_0064c6bf[civB*0x594] = 0
    lastContactTurn: true,       // DAT_0064ca82[civA*0x594 + civB*2] = current_turn
    dialogString: 'TREATY',      // game.txt dialog key
    rawC: 'thunk_FUN_00467825(p2,p1,0x4004); thunk_FUN_00467904(p2,p1,0,0x32)',
    sourceAddr: '0x0045A6AB',
  },

  executeCeasefire: {
    // @ FUN_0045a7a8 (315 bytes)
    treatyFlagsSet: 0x4002,      // thunk_FUN_00467825(civB, civA, 0x4002) — CEASEFIRE(0x02) + RECENT_CONTACT(0x4000)
    clearFlag: 0x40000,          // thunk_FUN_00467750(civB, civA, 0x40000) — clear TRIBUTE_DEMANDED
    attitudeClamp: { min: 0, max: 0x32 },  // thunk_FUN_00467904(civB, civA, 0, 0x32) → clamp attitude to 0-50
    clearWarStartedOnAll: {
      flag: 0x800,               // DAT_0064c6c0[civA*4 + civK*0x594] &= ~0x800
      loop: { start: 1, end: 7 },  // for all civs 1..7 (third parties)
      rawC: 'for(k=1;k<8;k++) treaty[civA][k] &= 0xfffff7ff',
    },
    lastContactTurn: true,       // DAT_0064ca82[civA*0x594 + civB*2] = current_turn
    dialogString: 'CEASEFIRE',   // game.txt dialog key
    sourceAddr: '0x0045A7A8',
  },

  allianceChainWar: {
    // @ FUN_0045a8e3 (910 bytes) — diplo_activate_alliance_wars
    civLoop: { start: 1, end: 7 },     // iterate civs 1..7 looking for allies
    precondition: 'treaty[civA][civB] & 0x01',  // CONTACT required between declarers
    perAllyChecks: {
      allianceCheck: 0x08,             // treaty[civA][ally] & 0x08 — must be allied
      nonWarCheck: 0x2008,             // !(treaty[ally][enemy] & 0x2008) — not already at war or allied
      contactCheck: 0x01,              // treaty[ally][enemy] & 0x01 — ally must know enemy
    },
    // If enemy is human: show ACTIVATEALLY dialog, adjust_attitude(ally, enemy, +100)
    humanEnemyPath: {
      dialog: 'ACTIVATEALLY',
      attitudeAdjust: 100,             // thunk_FUN_00456f20(ally, enemy, 100) — massive hostility boost
      soundId: 0x38,                   // human war sound
    },
    // If enemy is AI: show ALLYHELPS notification
    aiEnemyPath: {
      dialog: 'ALLYHELPS',
      soundId: 0x39,                   // AI war sound
    },
    warFlags: 0x80800,                 // treaty[ally][enemy] |= 0x80800 (WAR_STARTED + PERIODIC_FLAG_19)
    declaredWarFlags: 0x2401,          // thunk_FUN_00467825(ally, enemy, 0x2401) — CONTACT + PERIODIC + WAR
    // Also sets: treaty[civA][enemy] |= 0x80800 for the human-enemy path
    alsoSetsOnDeclarer: 0x80800,       // treaty[declarerA][enemy] |= 0x80800
    lastContactTurn: true,             // DAT_0064ca82[enemy*0x594 + ally*2] = current_turn
    rawC: 'FUN_00467825(ally,enemy,0x2401); treaty[ally][enemy]|=0x80800; treaty[declA][enemy]|=0x80800',
    sourceAddr: '0x0045A8E3',
  },

  declareWarTiers: {
    // @ FUN_0045ac71 (1125 bytes) — diplo_declare_war
    // param_1 = declaring civ, param_2 = target, param_3 = third-party witness (-1 = none)
    // Witnesses: if param_3 >= 0, witness patience++ unconditionally at top
    noTreaty: {
      // treaty[target][declarer] & 0x06 == 0 AND treaty[target][declarer] & 0x08 == 0
      attitudeAdjust: -5,    // 0xFFFFFFFB: thunk_FUN_00456f20(witness, declarer, -5)
      patienceIncrement: 1,  // via: emperor+cities>4+no_witness, OR difficulty>0+no_SOL
      rawC: 'thunk_FUN_00456f20(p3,p1,0xfffffffb)',
    },
    ceasefireOrPeace: {
      // treaty[target][declarer] & 0x06 != 0 (has ceasefire or peace, but NOT alliance)
      attitudeAdjust: -15,   // 0xFFFFFFF1: thunk_FUN_00456f20(witness, declarer, -15)
      patienceIncrement: 1,
      provocationFlag: 0x10, // treaty[declarer][target] |= 0x10 (VENDETTA) if human
      // Double patience: if also had peace+ceasefire (both flags 4 and 2 set)
      doublePenalty: {
        condition: 'treaty & 0x04 AND treaty & 0x02',
        extraPatience: 'emperor+cities>4: +1, difficulty>0+no_SOL: +1',
        extraBetrayalDecrement: 'if human: betrayal[declarer][target] -= 1',
      },
      rawC: 'thunk_FUN_00456f20(p3,p1,0xfffffff1)',
    },
    alliance: {
      // treaty[target][declarer] & 0x08 != 0 (has alliance)
      attitudeAdjust: -25,   // 0xFFFFFFE7: thunk_FUN_00456f20(witness, declarer, -25)
      patienceIncrement: 2,  // base 1 (difficulty>0+no_SOL) + 1 (emperor+cities>4+no_witness)
      provocationFlag: 0x10, // treaty[declarer][target] |= 0x10 (VENDETTA) if human
      callsCancelAlliance: true, // thunk_FUN_00467ef2(declarer, target) — unit withdrawal
      extraBetrayalDecrement: 'if human: betrayal[declarer][target] -= 1',
      rawC: 'thunk_FUN_00456f20(p3,p1,0xffffffe7); thunk_FUN_00467ef2(p1,p2)',
    },
    warFlags: {
      declaredWar: 0x2000,   // thunk_FUN_00467825(declarer, target, 0x2000)
      warAndBetray: 0x80800, // treaty[target][declarer] |= 0x80800 (WAR_STARTED + PERIODIC_FLAG_19)
    },
    // Common: patience increments require emperor (rank 7), cities > 4, difficulty > 0, no Statue of Liberty
    patienceConditions: {
      emperor: { rank: 7, addr: 'DAT_00655c22', cities: 'DAT_0064c708 > 4' },
      statueOfLiberty: { wonderId: 0x14, check: 'thunk_FUN_00453e51(civ, 0x14)' },
    },
    sourceAddr: '0x0045AC71',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// HAWKS WARNING — senate war check display
// Source: FUN_0045fd67 @ 0x0045FD67 (178 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const HAWKS_WARNING = {
  militaryLevelThreshold: 4,   // @ FUN_0045fd67: requires militaryLevel > 4
  dialogStrings: {
    hawks: 'CONTINUEHAWKS',    // @ FUN_0045fd67: default war weariness warning
    unitedNations: 'CONTINUEUN', // @ FUN_0045fd67: if UN wonder active
  },
  unitedNationsWonderId: 0x18,  // wonder 24
  sourceAddr: '0x0045FD67',
};

// ═══════════════════════════════════════════════════════════════════════
// GREETING & EMISSARY DIALOGS — diplomacy meeting entry points
// Source: FUN_00458ab1 @ 0x00458AB1 (804 bytes)
//         FUN_00458df9 @ 0x00458DF9 (880 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const GREETING_EMISSARY = {
  greeting: {
    // @ FUN_00458ab1 (804 bytes)
    dialogString: 'GREETINGS',      // game.txt section key
    nuclearAwareness: {
      flagCheck: 0x104,              // @ FUN_00458ab1: check flags & 0x104
      dialogStrings: {
        theyHaveNukes: 'NUCLEARWEAPONS',
        youHaveNukes: 'YOURNUKES',
      },
    },
    sourceAddr: '0x00458AB1',
  },

  emissary: {
    // @ FUN_00458df9 (880 bytes)
    dialogStrings: {
      forced: 'EMISSARYFORCE',       // forced meeting
      normal: 'EMISSARY',            // normal meeting
    },
    intelligenceChecks: {
      embassyFlag: 0x80,             // treaty & 0x80
      setiWonderId: 0x18,            // wonder 24 (SETI)
      greatLibraryWonderId: 9,       // wonder 9
    },
    sourceAddr: '0x00458DF9',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// GOLD-TO-ATTITUDE CONVERSION — calc_gold_to_attitude
// Source: FUN_0045b472 @ 0x0045B472 (104 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const GOLD_TO_ATTITUDE = {
  // Diminishing returns: first 50g at 1:10, then 100g brackets at 1:(10+5n)
  firstBracket: { gold: 50, divisor: 10 },
  subsequentBrackets: { gold: 100, divisorIncrement: 5 },
  // Examples: 50g -> 5 attitude, 150g -> ~11, 250g -> ~16
  sourceAddr: '0x0045B472',
};

// ═══════════════════════════════════════════════════════════════════════
// TECH SELL PRICING — diplo_sell_tech hardcoded constants
// Source: FUN_004591cb @ 0x004591CB (852 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const TECH_SELL_CONSTANTS = {
  basePriceMultiplier: 0x14,     // 20: tech_value * 20
  attitudeThreshold: 50,          // if attitudeScore > 50: scale price
  epochScaling: {
    epochFloor: 1,                // max(epoch - 1, 1)
    scaleFactor: 10,              // (price / epoch) * 10
  },
  treasuryThresholds: {
    tier1: 0x5DC,                 // 1500: if treasury > 1500, price *= 30/20
    tier2: 3000,                  // 3000: if treasury > 3000, price *= 3/2
  },
  allianceDiscounts: {
    techBehind: 'price /= 2',
    techAhead: 'price -= price/4',  // 25% off
    farBehind: 'additional price /= 2',  // techLevel + 4 < other
  },
  clamp: { min: 100, max: 30000 },
  sourceAddr: '0x004591CB',
};

// ═══════════════════════════════════════════════════════════════════════
// TECH EXCHANGE — handle_exchange_gift dialog strings
// Source: FUN_0045950b @ 0x0045950B (1494 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const TECH_EXCHANGE_STRINGS = {
  dialogStrings: {
    exchange: 'EXCHANGE',
    noExchangeMedium: 'NOEXCHANGEMEDIUM',   // medium hostility refusal
    noExchangeMad: 'NOEXCHANGEMAD',          // high hostility refusal
    exchangePetty: 'EXCHANGEPETTY',          // petty exchange attempt
  },
  attitudeEffects: {
    techExchangeFormula: 'adjust_attitude(civB, civA, -(techValue * 2))',
    wonderBlockCheck: 'prevents exchange if would enable wonder construction',
  },
  sourceAddr: '0x0045950B',
};

// ═══════════════════════════════════════════════════════════════════════
// MERCENARY PRICING — favor menu mercenary hire constants
// Source: FUN_0045dd7f @ 0x0045DD7F (4878 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const MERCENARY_PRICING = {
  priceClamp: { min: 2, max: 500 },   // base price clamped, then * 50
  priceMultiplier: 50,                  // final = clamp(base, 2, 500) * 50
  modifiers: {
    noTreaty: -0.33,                    // -33% if no existing treaty
    richerPlayer: +0.33,                // +33% if player is richer
    alliedTarget: { multiplier: 3, clamp: { min: 500, max: 25000 } },
    emperorTarget: 0.5,                 // /2 if target is emperor difficulty
    targetNotAtWarWithPlayer: +0.33,    // +33% if target isn't at war with you
  },
  refusal: {
    reputationThreshold: 6,             // if reputationScore > 6: refuse
    refusalString: 'HELLNOWEWONTGO',
  },
  betrayal: {
    chance: 0.5,                        // 50% chance if friendly with target
    strings: {
      normal: 'MERCBETRAY',
      allied: 'MERCBETRAYALLY',
    },
  },
  sourceAddr: '0x0045DD7F',
};

// ═══════════════════════════════════════════════════════════════════════
// MILITARY GIFT — show_gift_menu military unit constants
// Source: FUN_0045f0b1 @ 0x0045F0B1 (3218 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const MILITARY_GIFT = {
  attitudeFormula: 'unit_cost * 3',      // -(UNIT_UPKEEP[unitType] * 3)
  techDiscount: 0.5,                      // halved if civB has relevant tech
  techGrantChance: 0.5,                   // 50% chance: grant prerequisite tech for unit type
  goldGiftIncrements: 4,                  // 25%/50%/75%/100% of treasury
  goldRounding: 50,                       // round to nearest 50
  patienceCost: 'patience -= (giftCount + 2); giftCount++',
  sourceAddr: '0x0045F0B1',
};

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY MENU — full option list with conditions
// Source: FUN_0045fe19 @ 0x0045FE19 (747 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const DIPLOMACY_MENU = {
  dialogTemplate: 'DIPLOMACYMENU',   // from game.txt
  optionCount: 9,                     // options 0-8
  sourceAddr: '0x0045FE19',
};

// ═══════════════════════════════════════════════════════════════════════
// AI TREATY RESPONSE SUB-NEGOTIATION — PERHAPS* dialog strings
// Source: FUN_0045b4da @ 0x0045B4DA (10271 bytes)
// ═══════════════════════════════════════════════════════════════════════

export const AI_SUBNEGOTIATION = {
  dialogStrings: {
    perhapsSecret: 'PERHAPSSECRET',         // AI wants a tech to sweeten the deal
    perhapsThrowIn: 'PERHAPSTHROWIN',       // AI wants gold added
    perhapsSolidarity: 'PERHAPSSOLIDARITY', // AI wants joint war declaration
    perhapsThanksAnyway: 'PERHAPSTHANKSANYWAY', // AI rejects solidarity but thanks player for gifts (tech/gold given)
    perhapsBye: 'PERHAPSBYE',                   // AI rejects solidarity, no gifts were given
  },
  goldSweetener: {
    formula: 'calc_gold_to_attitude used to convert gold offer to attitude bonus',
    minMeaningful: 50,                       // first bracket starts at 50g
  },
  consecutiveDemandTracking: {
    resetThreshold: 9,                       // if consecutiveDemands > 9: reset tribute to 0
    trackingAddr: 'DAT_0064b108',            // last tribute turn
  },
  sourceAddr: '0x0045B4DA',
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
      road:       { bonus: 1, tileBit: 0x10, sourceAddr: '0x0055BBC0',
                    note: 'line 4817: replaces base +1, sets borderScore = savedScore + 2' },
      railroad:   { bonus: 1, tileBit: 0x20, sourceAddr: '0x0055BBC0',
                    note: 'line 4820: additive +1' },
      mining:     { bonus: 1, tileBit: 0x08, sourceAddr: '0x0055BBC0',
                    note: 'line 4823: additive +1' },
      irrigation: { bonus: 1, tileBit: 0x04, sourceAddr: '0x0055BBC0',
                    note: 'line 4826: additive +1' },
      fortress:   { bonus: 2, tileBit: 0x40, sourceAddr: '0x0055BBC0',
                    note: 'line 4829: additive +2' },
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
// JOIN WAR — AI-to-AI alliance war joining
// Source: FUN_0055d685 @ 0x0055D685 (595 bytes), block_00550000.c line 5418
// Called by FUN_0055d8d8 (process_diplomatic_contact) when two AI civs
// form an alliance and check if they should join each other's wars.
// param_1 = declaring civ, param_2 = target (enemy), param_3 = ally
// ═══════════════════════════════════════════════════════════════════════

export const JOIN_WAR = {
  sourceAddr: '0x0055D685',

  // --- Early exit: skip if already at war or allied with target ---
  skipMask: {
    flags: 0x2008,                   // WAR(0x2000) | ALLIANCE(0x08)
    check: 'treaty[target][declaringCiv] & 0x2008',
    effect: 'If any bit set, return 0 (already at war or allied — no join needed)',
  },

  // --- Vendetta flag check on ally side ---
  vendettaCheck: {
    flag: 0x20,                      // treaty_byte1[target][ally] & 0x20
    rawC: '(DAT_0064c6c1[param_2*4 + param_3*0x594] & 0x20) == 0',
    ifNotSet: {
      // If vendetta NOT set: check if both sides have VENDETTA(0x10) and set INTRUDER
      intruderEscalation: {
        condition: 'treaty[target][declaringCiv] & 0x10 AND treaty[target][ally] & 0x10',
        setFlag: 0x20,               // INTRUDER_FLAG on both sides
        rawC: 'treaty[target][declaringCiv] |= 0x20; treaty[ally][target] |= 0x20',
        note: 'If both declaring civ and ally have vendetta against target, set INTRUDER on both treaty records',
      },
      returnValue: 0,                // no war declared in this path
    },
  },

  // --- Human civ gate (only applies to human target civs) ---
  humanGate: {
    check: '(1 << target) & humanBitmask',
    rawC: '(1 << ((byte)param_2 & 0x1f) & (uint)DAT_00655b0b) != 0',
    note: 'If target is not a human civ, skip cooldown/random checks',
  },

  // --- Contact cooldown: 6-turn minimum ---
  contactCooldown: {
    turns: 6,
    check: 'contactTurn[target][declaringCiv] - currentTurn < 6',
    rawC: '(int)*(short *)(DAT_0064ca82 + param_2*0x594 + param_1*2) - (int)DAT_00655af8 < 6',
    effect: 'If last contact was within 6 turns, return 0 (too soon)',
    note: 'Only checked when VENDETTA(0x10) flag is NOT set on declaring civ',
  },

  // --- Power rank check + random decline ---
  powerRankGate: {
    condition: 'powerRank[target] < 7',
    rawC: '(byte)DAT_00655c22[param_2] < 7',
    randomDecline: {
      formula: 'rand() % 3 != 0',
      probability: '2/3 chance of declining (only 1/3 chance of joining war)',
      rawC: 'iVar2 = _rand(), iVar2 % 3 != 0 => return 0',
    },
    note: 'Superpower targets (rank 7) bypass the random decline — always proceeds to war',
  },

  // --- Contact turn update (both sides) ---
  contactTurnUpdate: {
    rawC: 'contactTurn[target][declaringCiv] = currentTurn; contactTurn[target][ally] = currentTurn',
    note: 'Updates last-contact time for both the declaring civ and ally with the target',
  },

  // --- Dialog and war declaration ---
  dialog: {
    string: 'JOINWAR',
    addr: 's_JOINWAR_00633b00',
    params: [
      'slot 0: get_civ_people_name(declaringCiv)',
      'slot 1: get_civ_people_name(ally)',
      'slot 2: get_civ_people_name(target)',
    ],
  },
  warDeclaration: {
    fn: 'thunk_FUN_00467825(declaringCiv, target, 0x2000)',
    flags: 0x2000,                   // WAR flag set via cascade (also clears CEASEFIRE/PEACE/ALLIANCE)
    note: 'Uses set_treaty_flag cascade which also adds WAR_TRACKING(0x200000)',
  },

  returnValues: {
    0: 'No war declared (skip, cooldown, random decline, or no vendetta)',
    1: 'War declared successfully',
  },
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

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY ENCOUNTER DIALOG STRINGS — AI-vs-AI peace/war notifications
// Source: FUN_0055D8D8 @ 0x0055D8D8 (7326 bytes) — process_diplomatic_contact
// These dialog keys are shown to the human player when AI civs sign or break
// treaties that affect the player's alliances.
// ═══════════════════════════════════════════════════════════════════════

export const DIPLO_ENCOUNTER_STRINGS = {
  // --- Parley request/response (multiplayer diplomacy) ---
  PARLEYBUSY_NOTCONTACT: {
    key: 'PARLEYBUSY',
    addr: 's_PARLEYBUSY_00633b18',
    desc: 'Target civ does not have contact with initiator',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYCANCEL_REJECT: {
    key: 'PARLEYCANCEL',
    addr: 's_PARLEYCANCEL_00633b24',
    desc: 'Target human player cancelled the diplomacy request',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYGOAWAY: {
    key: 'PARLEYGOAWAY',
    addr: 's_PARLEYGOAWAY_00633b34',
    desc: 'Diplomacy state < 1 — AI refuses to meet (cooldown or hostile)',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYOK: {
    key: 'PARLEYOK',
    addr: 's_PARLEYOK_00633b44',
    desc: 'Diplomacy state == 1 — AI accepts meeting, redirect to parley window',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYBUSY_OCCUPIED: {
    key: 'PARLEYBUSY',
    addr: 's_PARLEYBUSY_00633b50',
    desc: 'Target is AI-controlled but occupied (another negotiation in progress)',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYCANCEL_MP: {
    key: 'PARLEYCANCEL',
    addr: 's_PARLEYCANCEL_00633b5c',
    desc: 'Multiplayer: human target rejected; DAT_006c91e4 flag was set',
    sourceAddr: '0x0055D8D8',
  },
  PARLEYBUSY_HUMAN: {
    key: 'PARLEYBUSY',
    addr: 's_PARLEYBUSY_00633b6c',
    desc: 'Target is human but busy (diplomacy state > 1)',
    sourceAddr: '0x0055D8D8',
  },

  // --- Peace treaty notifications ---
  UNFORCE: {
    key: 'UNFORCE',
    addr: 's_UNFORCE_00633b78',
    desc: 'AI civA signs peace with civB — civB had United Nations wonder',
    sourceAddr: '0x0055D8D8',
  },
  WALLFORCE: {
    key: 'WALLFORCE',
    addr: 's_WALLFORCE_00633b80',
    desc: 'AI civA signs peace with civB — civB had Great Wall wonder',
    sourceAddr: '0x0055D8D8',
  },
  UNFORCE_REVERSE: {
    key: 'UNFORCE',
    addr: 's_UNFORCE_00633b8c',
    desc: 'AI civB signs peace with civA — civA had United Nations wonder',
    sourceAddr: '0x0055D8D8',
  },
  WALLFORCE_REVERSE: {
    key: 'WALLFORCE',
    addr: 's_WALLFORCE_00633b94',
    desc: 'AI civB signs peace with civA — civA had Great Wall wonder',
    sourceAddr: '0x0055D8D8',
  },

  // --- Alliance notifications to human player ---
  ALLYMAKESPEACE_A: {
    key: 'ALLYMAKESPEACE',
    addr: 's_ALLYMAKESPEACE_00633ba0',
    desc: 'Human allied with civA; civA signed peace with civB',
    sourceAddr: '0x0055D8D8',
  },
  ALLYMAKESPEACE_B: {
    key: 'ALLYMAKESPEACE',
    addr: 's_ALLYMAKESPEACE_00633bb0',
    desc: 'Human allied with civB; civB signed peace with civA',
    sourceAddr: '0x0055D8D8',
  },
  SIGNPEACE: {
    key: 'SIGNPEACE',
    addr: 's_SIGNPEACE_00633bc0',
    desc: 'Two AI civs sign peace — human has map intel on both (embassy/wonder/observer)',
    conditions: [
      'Human has map sharing (treaty & 0x80) with either civ',
      'Human has United Nations wonder (0x18)',
      'Human has Intelligence Agency wonder (9)',
      'Human is in observer mode (DAT_00655b07)',
    ],
    sourceAddr: '0x0055D8D8',
  },

  // --- War/alliance break notifications ---
  CANCELALLIED: {
    key: 'CANCELALLIED',
    addr: 's_CANCELALLIED_00633be4',
    desc: 'Alliance cancelled between two AI civs — human had allied treaty with one/both',
    conditions: [
      'Prior alliance (treaty & 0x08) existed between civA and civB',
      'No third-party mutual enemy found',
      'Human player sees this via embassy/wonder/observer',
    ],
    sourceAddr: '0x0055D8D8',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY ENCOUNTER — ADDITIONAL CONSTANTS
// Source: FUN_0055D8D8 @ 0x0055D8D8 (7326 bytes) — process_diplomatic_contact
// Constants not in AI_VS_AI_DIPLOMACY above, extracted from deeper analysis.
// ═══════════════════════════════════════════════════════════════════════

export const DIPLO_ENCOUNTER_CONSTANTS = {
  // Encounter frequency gate
  encounterFrequency: {
    modulus: 4,
    formula: '(game_turn + civA + civB) % 4 == 0',
    bypass: 'First contact (treaty & 0x400 not set) always proceeds',
    sourceAddr: '0x0055D8D8',
  },

  // First-contact treaty setup
  firstContact: {
    setFlags: 0x4401,                  // 0x4000 (recent) + 0x400 (?) + 0x01 (contact)
    desc: 'set_treaty_flag(civA, civB, 0x4401) on first meeting',
    sourceAddr: '0x0055D8D8',
  },

  // Scenario special case: civs 6 and 7 in WW2 scenarios
  scenarioWW2SpecialCase: {
    civ1: 6,
    civ2: 7,
    condition: '(DAT_00655af0 & 0x80) != 0 AND (DAT_0064bc60 & 0x8000) != 0',
    turnGate: 'DAT_00655af8 > 1 (not first two turns)',
    extraAllyGate: 'DAT_00655af8 > 4 for contact between civs 3 and 1',
    effect: 'Forces third-party alliance candidate = civ 0 (barbarians/special)',
    desc: 'WW2 scenario: Rome(6) and Celts(7) forced to ally against Barbarians after turn 1',
    sourceAddr: '0x0055D8D8',
  },

  // Alliance evaluation power rank thresholds
  allianceSuperpowerBlock: {
    threshold: 7,                       // rank 7 = superpower
    secondaryThreshold: 3,             // rank > 3 = won\'t ally with superpower
    formula: 'if (rank == 7 AND otherRank > 3): reject alliance',
    sourceAddr: '0x0055D8D8',
  },

  // War declaration: betrayal and diplomatic flags
  warDeclarationFlags: {
    clearPeace: 0x04,                  // clear peace treaty flag
    setVendetta: 0x2000,               // set vendetta flag
    clearEmbassy: 0x10,                // if had embassy: clear
    setBetrayalOnEmbassy: 0x800,       // set betrayal if embassy existed
    sourceAddr: '0x0055D8D8',
  },

  // MP parley redirect codes
  mpRedirect: {
    parleyRequest: 0x3D,               // send parley request to remote
    parleyTimeout: 0x81,               // parley timeout event
    diploRedirect: 0x99,               // redirect diplomacy to remote human
    desc: 'Human-controlled civ in MP: redirect diplomacy to their client',
    sourceAddr: '0x0055D8D8',
  },
};


// ═══════════════════════════════════════════════════════════════════════
// PARLEY EXECUTION DISPATCHER — parley_execute_transaction
// Source: FUN_004dd285 @ 0x004DD285 (1381 bytes)
// Master dispatcher that routes completed parley transactions to their
// specific execution handlers. Called after both sides agree to terms.
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_EXECUTION = {
  sourceAddr: '0x004DD285',

  // --- Packet Layout ---
  // param_1 points to the parley transaction packet
  packetLayout: {
    transactionType: '+0x10',     // switch(*(param_1 + 0x10)) -- transaction type
    civId1:          '+0x14',     // iVar1 = *(param_1 + 0x14) -- first civ
    civId2:          '+0x18',     // iVar2 = *(param_1 + 0x18) -- second civ
    offerData:       '+0x20',     // puVar3 = param_1 + 0x20 -- first offer payload
    counterOffset:   '+0x24',     // *(param_1 + 0x24) = offset to counter-offer
    counterData:     'param_1 + *(param_1 + 0x24) + 0x20',  // second offer payload
  },

  // --- Dispatch Table (transaction type -> handler) ---
  handlers: {
    6:    { fn: 'FUN_004df10f', name: 'execute_treaty',
            args: '(treaty_subtype, civId1, civId2)',
            desc: 'Set ceasefire/peace/alliance or cancel all treaties' },
    7:    { fn: 'FUN_004ddfb2', name: 'give_tech_single',
            args: '(civId2, civId1, offerData)',
            desc: 'Transfer single technology from giver to receiver' },
    8:    { fn: 'FUN_004ddf04', name: 'give_tech_list',
            args: '(civId2, civId1, techCount)',
            desc: 'Transfer multiple technologies' },
    9:    { fn: 'FUN_004de990', name: 'give_gold',
            args: '(civId2, offerData)',
            desc: 'Transfer gold; clamps to sender treasury' },
    10:   { fn: 'FUN_004de049', name: 'give_units',
            args: '(civId2, offerData)',
            desc: 'Transfer units to other civ' },
    0xB:  { fn: 'FUN_004dd8ad', name: 'declare_war',
            args: '(civId2, civId1, param3)',
            desc: 'Declare war: transfers units/cities and reveals tiles' },
    0xC:  { fn: 'FUN_004dde9e', name: 'share_maps',
            args: '(civId, offerData)',
            desc: 'Share map knowledge; called twice (both civs)' },
    0xD:  { fn: 'FUN_004dd8ad', name: 'attitude_change',
            args: 'called twice: (civ1,civ2,sub) then (civ2,civ1,sub)',
            desc: 'Mutual attitude/treaty change for both sides' },
    0xE:  { desc: 'Trade exchange: dispatches BOTH counter-offer and offer',
            note: 'Counter-offer (puVar5) executed first, then offer (puVar3)',
            subDispatch: 'Each side uses sub-switch on *puVar5/*puVar3' },
    0xF:  { desc: 'Demand: dispatches only the offering side (puVar3)',
            note: 'Only the offeror gives; receiver gets for free' },
  },

  // --- Post-Execution Effects ---
  postExecution: {
    // After dispatching: refresh state for both civs
    stateDiffSync: {
      fn: 'thunk_FUN_004b0b53',
      args: '(0xFF, 2, 0, 0, 0)',
      desc: 'Recalculate all civ state after transaction',                       // 0x004DD285+0x47C
    },
    // Send MP message 0x79 to refresh advisor panels for affected civs
    advisorRefresh: {
      msgType: 0x79,
      desc: 'Sent to each civ unless they are the local player',                 // 0x004DD285+0x486
      localPlayerFn: 'thunk_FUN_0056a65e(1)',
      remotePlayerFn: 'thunk_FUN_0046b14d(0x79, ...)',
    },
    // Kill civ check: if city count == 0 AND unit count == 0 -> kill_civ
    killCivCheck: {
      cityCountAddr: 'DAT_0064c708 + civId * 0x594',   // short: city count
      unitCountAddr: 'DAT_0064b9e8 + civId * 4',       // int: total units
      killFn: 'thunk_kill_civ(deadCiv, killerCiv)',
      note: 'Checked for BOTH civId1 and civId2 after execution',               // 0x004DD285+0x4AE
    },
  },

  // --- Debug Logging ---
  debugLog: {
    startMsg: 'Start ExecuteParleyTransaction_M',  // DAT_0062ea04              // 0x004DD285
    endMsg:   'End ExecuteParleyTransaction_Mes',   // DAT_0062ea30              // 0x004DD285+0x4CA
    logLevel: 'DAT_00628468',
  },
};


// ═══════════════════════════════════════════════════════════════════════
// PARLEY TREATY SET/CLEAR -- parley_execute_treaty (parley-side dispatcher)
// Source: FUN_004df10f @ 0x004DF10F (289 bytes)
// Sets or cancels treaty flags between two civs when a parley treaty
// transaction is executed. Distinct from TREATY_EXECUTION above which
// covers the full alliance/peace/ceasefire ceremony functions.
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_TREATY_SET = {
  sourceAddr: '0x004DF10F',
  // param_1 = treaty subtype, param_2 = civA, param_3 = civB
  subtypes: {
    0: { fn: 'FUN_00467825(civA, civB, 2)', desc: 'Set ceasefire (flag 0x02)' },
    1: { fn: 'FUN_00467825(civA, civB, 4)', desc: 'Set peace (flag 0x04)' },
    2: { fn: 'FUN_00467825(civA, civB, 8)', desc: 'Set alliance (flag 0x08)' },
    3: { desc: 'Cancel all: clear ceasefire (2), peace (4), alliance (8)',
         note: 'Checks each flag individually on DAT_0064c6c0[civB*4 + civA*0x594]',
         clearFn: 'FUN_00467750(civA, civB, flag)' },
  },
  treatyFlagAddr: 'DAT_0064c6c0',
  civRecordStride: 0x594,
};


// ═══════════════════════════════════════════════════════════════════════
// GIVE GOLD -- parley_give_gold
// Source: FUN_004ddf04 @ 0x004DDF04 (174 bytes)
// Transfers gold from sender to receiver, clamped to sender's treasury.
// ═══════════════════════════════════════════════════════════════════════

export const GIVE_GOLD_EXECUTION = {
  sourceAddr: '0x004DDF04',
  treasuryAddr: 'DAT_0064c6a2',  // + civId * 0x594 -- gold (int)
  civRecordStride: 0x594,
  // If requested amount > sender treasury, clamp to treasury
  // sender.gold -= amount; receiver.gold += amount
  // Attitude effect: -(calc_gold_to_attitude(amount) * 3 / 2)
  attitudeFormula: {
    fn: 'thunk_FUN_0045b472(goldAmount)',
    multiplier: 3,
    divisor: 2,
    sign: 'negative',  // -(result * 3 / 2)
    applyFn: 'thunk_FUN_00456f20(receiver, sender, attitudeChange)',
  },
};


// ═══════════════════════════════════════════════════════════════════════
// GIVE CITIES -- parley_give_cities (called via share_maps handler)
// Source: FUN_004dde9e @ 0x004DDE9E (102 bytes)
// Transfers map knowledge entries with 0x2000 flag.
// ═══════════════════════════════════════════════════════════════════════

export const GIVE_CITIES_FLAG = {
  sourceAddr: '0x004DDE9E',
  transferFlag: 0x2000,        // passed to FUN_00467825(civId, entry, 0x2000)
  desc: 'Each city entry in the offer list is transferred via set_treaty_flag 0x2000',
};


// ═══════════════════════════════════════════════════════════════════════
// DECLARE WAR -- parley_declare_war
// Source: FUN_004dd8ad @ 0x004DD8AD (1521 bytes)
// Massive function: transfers all shared units/cities, reveals tiles.
// ═══════════════════════════════════════════════════════════════════════

export const DECLARE_WAR_EXECUTION = {
  sourceAddr: '0x004DD8AD',

  // --- Visibility Reveal ---
  // When a unit belongs to the declaring civ, reveal surrounding tiles
  // to both attacker and defender using 0x15 (21) entries from offset tables
  visibilityReveal: {
    entryCount: 0x15,          // 21 entries in the offset tables                // 0x004DD8AD
    xOffsetTable: 'DAT_00628370',  // signed byte X offsets                     // 0x004DD8AD
    yOffsetTable: 'DAT_006283a0',  // signed byte Y offsets                     // 0x004DD8AD
    revealFn: 'thunk_FUN_005b976d(x, y, civBitmask, 1, 1)',
    note: 'Used for both unit transfer and city transfer visibility reveal',
  },

  // --- Unit Transfer Search ---
  // When relocating a transferred unit, search 0x2D (45) candidate positions
  unitPlacementSearch: {
    candidateCount: 0x2D,      // 45 entries searched for valid placement        // 0x004DED07
    xOffsetTable: 'DAT_00628370',  // reuses same tables as visibility reveal   // 0x004DED07
    yOffsetTable: 'DAT_006283a0',  // extended to 45 entries                    // 0x004DED07
    validationChecks: [
      'FUN_004087c0(x, y) != 0',       // valid map tile
      'FUN_005b8ca6(x, y) == targetCiv OR -1',  // owned by target or unowned
      'domain match check on FUN_005b89e4',      // land/sea/air domain match
    ],
    sourceFn: 'FUN_004ded07',
    sourceAddr: '0x004DED07',
  },

  // --- City Transfer ---
  // FUN_004de0e2 (2217 bytes): full city ownership transfer
  cityTransfer: {
    fn: 'FUN_004de0e2',
    sourceAddr: '0x004DE0E2',
    // Sets last contact turn: DAT_0064c6ae + newOwner*0x594 = current_turn
    lastContactTurnAddr: 'DAT_0064c6ae',
    // Increments new owner city count, decrements old owner city count
    cityCountAddr: 'DAT_0064c708',   // + civId * 0x594 (short)
    // Also increments/decrements unit counts at DAT_0064b9e8 + civId*4
    unitCountAddr: 'DAT_0064b9e8',
    // Scans units (stride 0x20) for home city reassignment
    unitRecordStride: 0x20,
    unitOwnerField: 'DAT_006560f7',  // + unitIdx * 0x20
    // City record stride 0x58
    cityRecordStride: 0x58,
    cityOwnerField: 'DAT_0064f348',  // + cityIdx * 0x58
    // Adjacent tile reveal (8 directions) after transfer
    adjacentDirs: 8,                  // for (local_10 = 0; local_10 < 8; ...)
    dirXTable: 'DAT_00628350',        // 8-entry direction X offsets
    dirYTable: 'DAT_00628360',        // 8-entry direction Y offsets
  },

  // --- Network ---
  networkMsg: {
    mapRefresh: 0x74,          // thunk_FUN_0046b14d(0x74, ...) -- redraw map      // 0x004DD8AD
    areaRedraw: 0x75,          // thunk_FUN_0046b14d(0x75, ...) -- area redraw     // 0x004DE0E2
  },

  // --- Flush ---
  flushTimeoutMs: 5000,        // XD_FlushSendBuffer(5000) after unit transfer    // 0x004DE990
};


// ═══════════════════════════════════════════════════════════════════════
// FILE SECTION PARSER -- Rules file '@' section index builder
// Source: FUN_004db23f @ 0x004DB23F (529 bytes)
// Builds an index of '@'-prefixed section headers in rules files
// (RULES.TXT, etc.) for fast random-access by section name.
// ═══════════════════════════════════════════════════════════════════════

export const FILE_SECTION_PARSER = {
  sourceAddr: '0x004DB23F',

  // --- Section Marker Format ---
  // Lines starting with '@' followed by an uppercase letter (A-Z) are section headers
  sectionMarker: '@',                  // local_108 == '@'                         // 0x004DB23F
  uppercaseRange: { min: 0x41, max: 0x5A },  // 'A' (0x41) through 'Z' (0x5A)
  // Condition: local_108 == '@' && local_107 > '@' (0x40) && local_107 < '[' (0x5B)

  // --- Line Reading ---
  lineBuffer: 0xFF,                    // _fgets buffer size (255 bytes)           // 0x004DB23F
  cwdBuffer: 0x104,                    // __getcwd buffer size (260 bytes)         // 0x004DB23F

  // --- Index Entry Format ---
  // Each entry in the index: [file_offset (4 bytes long)] + [section_name (null-terminated)]
  entryOverhead: 5,                    // sVar3 + 5 = string length + 4 (long) + 1 (null)
  indexCountVar: 'DAT_0062e610',       // number of sections found                // 0x004DB23F
  indexActiveVar: 'DAT_0062e60c',      // 1 when index is valid                   // 0x004DB23F
  pathBuffer: 'DAT_0062e508',          // current working directory + filename     // 0x004DB23F
  memoryPool: 'DAT_006a5b38',          // memory pool for index entries            // 0x004DB23F
  poolCapacity: 'DAT_006a5b48',        // remaining pool capacity                 // 0x004DB23F

  // --- Lookup (FUN_004db481) ---
  lookup: {
    sourceAddr: '0x004DB481',
    desc: 'Search index by section name (case-insensitive strcmp)',
    cwdValidation: true,               // only matches if cwd matches cached path
    returnValue: 'file_offset (long) or -1 if not found',
  },

  // --- Path Construction ---
  pathSeparator: 'DAT_0062e61c',       // path separator appended                // 0x004DB23F
  rulesFileSuffix: 'DAT_0062cd24',     // appended to build full path             // 0x004DB23F
  readMode: 'DAT_0062e618',            // fopen mode string (e.g. "r")           // 0x004DB23F

  // --- Pre-processing ---
  trimFn: 'thunk_FUN_0056b810',        // trim whitespace from line               // 0x004DB23F
  stripFn: 'thunk_FUN_004d007e',       // strip comments / trailing content       // 0x004DB23F
};


// ═══════════════════════════════════════════════════════════════════════
// PARLEY PACKET BUILDER -- parley_build_packet
// Source: FUN_004db690 @ 0x004DB690 (990 bytes)
// Allocates and populates a network packet for parley transactions.
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_PACKET_BUILDER = {
  sourceAddr: '0x004DB690',

  // --- Packet Header ---
  magic: 0x66606660,                   // puVar2[0] = 0x66606660                  // 0x004DB690
  messageType: 0x82,                   // puVar2[1] = 0x82                        // 0x004DB690
  // puVar2[2] = total packet size
  // puVar2[4] = *(in_ECX + 0x1EC) -- session/game id
  // puVar2[5] = DAT_006d1da0 -- current player
  // puVar2[6] = *(in_ECX + 0x118) -- parley window id
  // puVar2[7] = transaction_descriptor from DAT_0062e658[param_1 * 4]
  headerSize: 0x20,                    // 8 dwords (32 bytes) of header           // 0x004DB690

  // --- Transaction Size Table ---
  // DAT_0062e698[transactionType * 4] = base size of serialized transaction
  transactionSizeTable: 'DAT_0062e698',                                          // 0x004DB690
  // For types 8, 0xC, 10, 0x11: size += selectedItemCount * 4
  // For type 0x11 with GIVE_CITIES: size += selectedItemCount * 4 (doubled)
  variableSizeTypes: [8, 0xC, 10, 0x11],
  selectedItemCountOffset: 0x10428,    // *(in_ECX + 0x10428 + side * 4)          // 0x004DB690

  // --- Trade Exchange (type 0xE) ---
  // Builds TWO serialized transactions in one packet:
  //   chunk0 at puVar2+8 (size = local_c), chunk1 at puVar2+8+local_c (size = local_8)
  tradeExchangeType: 0x0E,

  // --- Serialization ---
  serializeFn: 'thunk_FUN_004dbab4(dest, transType, chunkSize, sideIndex)',      // 0x004DB690

  // --- Network Send ---
  sendFn: 'thunk_FUN_0046b14d(0x82, targetAddr, 0, 0, 0, 0, 0, 0, 0, puVar2)', // 0x004DB690

  // --- Dev Build Path (assertion) ---
  devPath: 'D:\\Ss\\Franklinton\\parleywin_tran',                                // 0x004DB690
};

// ═══════════════════════════════════════════════════════════════════════
// DIPLOMACY GREETING DIALOG STRINGS — show_diplomacy_greeting
// Source: FUN_00463224 @ 0x00463224, block_00460000.c (lines ~1000-1223)
// The greeting string varies based on:
//   - Whether AI initiated (param_5==0) or player visited (param_5!=0)
//   - Treaty state (alliance/peace/none)
//   - Patience counter (< 2 = patient, >= 2 = impatient)
//   - Attitude (score==999 + hostile => ATTITUDE variants)
// ═══════════════════════════════════════════════════════════════════════

export const DIPLOMACY_GREETING_STRINGS = {
  sourceAddr: '0x00463224',

  // --- AI-initiated meeting (param_5 == 0) ---
  aiInitiated: {
    // String depends on treaty state
    alliance: 'WELCOMEALLY',   // treaty & 0x08                              // 0x006271F0
    peace:    'WELCOMEPEACE',  // treaty & 0x04 (no alliance)                // 0x006271FC
    none:     'WELCOME',       // no treaty                                  // 0x0062720C
    // Before greeting: AI displays demand indicator portrait
    demandPortraits: {
      tribute:    0x6F,        // tributeAmount != 0 → demanding portrait    // 0x00463224
      techBehind: 0x70,        // AI has fewer units than player → concerned // 0x00463224
      default:    0x71,        // normal portrait                            // 0x00463224
    },
    attitudeLevelCheck: {
      // If attitude level < 4 AND (patience - attitude_raw) < 3 → use 0x70
      threshold: 4,
      patienceDelta: 3,
    },
  },

  // --- Player-visited meeting (param_5 != 0), low patience (<2) ---
  playerVisit_patient: {
    alliance: 'HOWDYALLY',     // treaty & 0x08                              // 0x006271BC
    peace:    'HOWDYPEACE',    // treaty & 0x04 (no alliance)                // 0x006271C8
    none:     'HOWDY',         // no treaty                                  // 0x006271D4
  },

  // --- Player-visited meeting (param_5 != 0), high patience (>=2) ---
  playerVisit_impatient: {
    alliance: 'DOODYALLY',     // treaty & 0x08                              // 0x006271DC
    none:     'DOODY',         // no alliance (any other treaty state)       // 0x006271E8
    note: 'No DOODY variant for peace-only — falls through to DOODY for non-alliance',
  },

  // --- Attitude-only greeting (score==999, implies max hostility but not at war) ---
  attitude: {
    alliance: 'ATTITUDEALLY',  // treaty & 0x08                              // 0x00627190
    peace:    'ATTITUDEPEACE', // treaty & 0x06 (peace or ceasefire)         // 0x006271A0
    none:     'ATTITUDE',      // no peace/ceasefire/alliance                // 0x006271B0
  },

  // --- Patience exhaustion (audience ends) ---
  patienceExhausted: {
    alliance: 'PATIENCEALLY',  // treaty & 0x08                              // 0x00627268
    none:     'PATIENCE',      // no alliance                                // 0x00627278
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PATIENCE COUNTER MECHANICS — in show_diplomacy_greeting loop
// Source: FUN_00463224 @ block_00460000.c (lines ~1140-1192)
// ═══════════════════════════════════════════════════════════════════════

export const PATIENCE_COUNTER_MECHANICS = {
  sourceAddr: '0x00463224',

  // patience is stored at civ_struct + 0x1F (DAT_0064c6bf), signed byte
  fieldOffset: 0x1F,
  fieldAddr: 'DAT_0064c6bf',

  // At start of each audience turn:
  clampNegative: {
    condition: 'patience < 0',
    action: 'patience = 0',
    note: 'Patience is clamped to >= 0 before each menu iteration',
  },

  // After each menu action:
  increment: {
    action: 'patience += 1',
    note: 'Incremented after every menu selection (favor, gift, or negotiate)',
  },

  // Loop termination:
  loopEnd: {
    condition: 'patience >= calc_patience_threshold(civA, civB)',
    action: 'Exit menu loop → show PATIENCE/PATIENCEALLY dismissal',
  },

  // Post-audience bonus patience (if bVar10 or local_34 != 0):
  postAudienceBonus: {
    condition: 'AI had demands to make (bVar10) OR AI granted concessions (local_34)',
    action: 'Increment patience until it reaches threshold + local_34',
    note: 'AI that made demands consumes extra patience budget from the player',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CITY PLEA — AI warns about threatened border cities
// Source: FUN_00463224 @ block_00460000.c (lines ~1090-1101)
// Shown after greeting if: no peace/alliance AND war_readiness != 0
// ═══════════════════════════════════════════════════════════════════════

export const CITY_PLEA = {
  sourceAddr: '0x00463224',
  condition: '(treaty & 0x0C) == 0',  // no peace or alliance
  warReadinessCall: 'thunk_FUN_0055bbc0(playerCiv, aiCiv)',
  warReadinessResult: 'DAT_006ab5e8',  // nonzero = cities under threat

  dialogStrings: {
    singleCity:    'PLEASECITY',    // DAT_006ab5e4 < 2 (0 or 1 city threatened)   // 0x00627244
    multipleCities: 'PLEASECITIES', // DAT_006ab5e4 >= 2 (2+ cities threatened)    // 0x00627234
  },
  citySlotGlobal: 'DAT_006ab5e4',  // last city found during war readiness scan
};

// ═══════════════════════════════════════════════════════════════════════
// ALLIANCE PLEA / BRAG — Allied AI discusses third-party threats
// Source: FUN_00463224 @ block_00460000.c (lines ~1102-1139)
// Shown after greeting if: player is allied with AI AND third-party exists
// ═══════════════════════════════════════════════════════════════════════

export const ALLIANCE_PLEA = {
  sourceAddr: '0x00463224',
  condition: '(treaty[player][AI] & 0x08) != 0',  // player and AI are allied

  // Scenario 1: thirdPartyCivForTech exists (DAT_0064b0fc > 0)
  // Scans continents 1..62 to count where thirdParty outguns the player
  techThreat: {
    dialogString: 'ALLYPLEA',     // @ 0x00627250
    note: 'AI warns player about a third-party civ that is militarily superior on some continents',
    continentScan: {
      range: '1..0x3E (62)',
      condition: 'thirdParty has goal priority > 1 AND thirdParty.attackStrength > player.militaryCount',
    },
  },

  // Scenario 2: thirdPartyCivForCancel exists (DAT_0064b100 > 0)
  // Same continent scan but checking if the cancel-target threatens the player
  cancelThreat: {
    dialogString: 'ALLYBRAG',     // @ 0x0062725C
    note: 'AI boasts about helping player against a third-party threat',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CEASEFIRE EXPIRATION — Shown after audience ends
// Source: FUN_00463224 @ block_00460000.c (lines ~1194-1199)
// ═══════════════════════════════════════════════════════════════════════

export const CEASEFIRE_EXPIRATION = {
  sourceAddr: '0x00463224',
  condition: [
    'DAT_0064b138 != 0',                              // ceasefire expiration pending
    '(treaty[aiCiv][playerCiv] & 0x02) == 0',         // no active ceasefire
    '(treaty[playerCiv][aiCiv] & 0x200C) == 0',       // no peace/alliance/declared-war
  ],
  dialogString: 'CEASEEXPIRE',   // @ 0x00627284
  note: 'Notifies player that a ceasefire has expired',
};

// ═══════════════════════════════════════════════════════════════════════
// AMBASSADOR AUTO-ESTABLISHMENT — After audience ends
// Source: FUN_00463224 @ block_00460000.c (lines ~1200-1211)
// Automatically establishes an embassy if conditions are met.
// ═══════════════════════════════════════════════════════════════════════

export const AMBASSADOR_AUTO_ESTABLISH = {
  sourceAddr: '0x00463224',
  conditions: [
    'DAT_00655b08 == 0',                                           // not scenario mode
    '(treaty_byte1[aiCiv][playerCiv] & 0x20) == 0',               // no vendetta
    '(treaty[currentPlayer][aiCiv] & 0x80) == 0',                  // no existing embassy
    'civ_has_active_wonder(currentPlayer, 0x18) == 0',             // no United Nations (wonder 24)
    'civ_has_active_wonder(currentPlayer, 9) == 0',                // no Great Library (wonder 9)
    'civ_has_tech(aiCiv, 0x58) != 0',                              // AI has tech 0x58 (Writing)
  ],
  dialogString: 'AMBASSADORS',  // @ 0x00627290
  dialogParams: { param2: 0x2E },
  action: 'treaty[aiCiv][currentPlayer] |= 0x80',  // set embassy flag
  followUp: 'thunk_FUN_0043060b(aiCiv, playerCiv)',  // show intelligence for this civ
  wonderBlockIds: { unitedNations: 0x18, greatLibrary: 9 },
  embassyTechId: 0x58,  // Writing
};

// ═══════════════════════════════════════════════════════════════════════
// SCHISM TRIGGER — Religious schism event
// Source: FUN_00463224 @ block_00460000.c (lines ~1212-1220)
// ═══════════════════════════════════════════════════════════════════════

export const SCHISM_TRIGGER = {
  sourceAddr: '0x00463224',
  conditions: [
    '(DAT_00655aea byte1 & 0x01) != 0',                  // specific game flag set
    'bVar11 (AI had something to say)',                    // AI actually spoke during meeting
    'DAT_00626a30 != 0 OR param_5 != 0',                  // either global flag or player-initiated
    'DAT_00626a34 != -1',                                  // schism target is valid
    'aiCiv.techCount > 4',                                 // @ DAT_0064c708: AI has > 4 techs
    'aiCiv.powerRank > playerCiv.powerRank + 1',           // @ DAT_00655c22: AI significantly stronger
    '(treaty_byte1[aiCiv][playerCiv] & 0x20) != 0',       // vendetta flag set
  ],
  dialogString: 'SCHISM',        // @ 0x0062729C
  tutorialSection: 'TUTORIAL',   // PTR_s_TUTORIAL_00627678
  note: 'Triggers religious schism — powerful hostile AI with vendetta can fragment the player',
};

// ═══════════════════════════════════════════════════════════════════════
// ALLIANCE CANCELLATION — cancel_alliance function
// Source: FUN_00467ef2 @ 0x00467EF2 (632 bytes), block_00460000.c
// ═══════════════════════════════════════════════════════════════════════

export const ALLIANCE_CANCELLATION = {
  sourceAddr: '0x00467EF2',
  steps: [
    'clear_treaty_flag(civA, civB, 0x08)',                 // clear alliance flag (cascades to peace)
    'withdraw_units(civA, civB)',                           // FUN_00467baf: move civA units away from civB cities
    'withdraw_units(civB, civA)',                           // FUN_00467baf: move civB units away from civA cities
  ],
  dialogString: 'CANCELALLIANCE',  // @ 0x0062831C
  unitWithdrawal: {
    sourceAddr: '0x00467BAF',
    size: 835,
    algorithm: [
      'For each unit owned by civA:',
      '  Find nearest city owned by civB',
      '  If unit is in/near that city:',
      '    If unit is in a city on a continent with AI goals, relocate to nearest own city',
      '    Else: try to find nearest own city on same continent and relocate there',
      '  Clear unit orders (set to 0xFF)',
    ],
    unitRecordStride: 0x20,
    cityRecordStride: 0x58,
  },
  notification: {
    thirdPartyVisible: 'Shown to any player with embassy or SETI/Great Library wonder',
    wonderCheck: [0x18, 9],    // United Nations, Great Library
    embassyFlag: 0x80,
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ALLY DEMAND REFUSAL — FUN_0045b0d6 (allied civ demands player join war)
// Source: FUN_0045b0d6 @ 0x0045B0D6 (919 bytes), block_00450000.c ~line 4972
// When an allied AI demands you join a war and you refuse.
// ═══════════════════════════════════════════════════════════════════════

export const ALLY_DEMAND_REFUSAL = {
  sourceAddr: '0x0045B0D6',

  // Precondition: human player is allied with AI civ, AI wants to drag player into war vs target
  preconditions: [
    'human is allied with civA (treaty[civA][human] & 0x08)',
    'target civB is not already at war with human (treaty[civB][human] & 0x2008 == 0)',
  ],

  // Dialog: DEMANDHELP — AI demands you declare war on third party
  dialog: 'DEMANDHELP',

  // Refusal path (dialog result != 1):
  refusal: {
    dialog: 'DIDNTHELP',         // s_DIDNTHELP_00626bc8
    attitudeCheck: {
      threshold: 0x33,           // DAT_0064b114 < 0x33 (51) — attitude score
      ifBelow: {
        attitudeAdjust: 100,     // thunk_FUN_00456f20(civA, human, 100) — massive hostility
        meaning: 'AI becomes extremely hostile toward player for refusing allied demand',
      },
      ifAboveOrEqual: {
        action: 'break alliance',  // thunk_FUN_00467ef2(human, civA) — cancel_alliance
        meaning: 'AI breaks the alliance outright if attitude >= 51',
      },
    },
    rawC: 'if(DAT_0064b114 < 0x33) adjust_attitude(civA, human, 100); else cancel_alliance(human, civA)',
  },

  // Acceptance path (dialog result == 1):
  acceptance: {
    action: 'declare_war(human, target, civA)',  // thunk_FUN_0045ac71(human, target, civA)
    goldBonus: {
      desc: 'AI may offer gold from continents where target outguns AI',
      continentMilitaryFormula: {
        formula: '(continent_atk_B * ((-(MP==0) & 2) + 2)) / (continent_mil_A + 1)',
        rawC: `local_10 += ((uint)*(ushort *)(DAT_0064c8b2 + local_c*2 + param_2*0x594) *
          ((-(uint)(DAT_00655b08 == '\\0') & 2) + 2)) /
          (*(ushort *)(DAT_0064c832 + local_c*2 + param_1*0x594) + 1)`,
        fields: {
          continent_atk_B: 'DAT_0064c8b2[continent*2 + target*0x594] — target attack strength on continent',
          continent_mil_A: 'DAT_0064c832[continent*2 + AI*0x594] — AI military count on continent',
        },
        difficultyFactor: {
          chieftain: 4,     // (2 + 2) when DAT_00655b08 == 0 (Chieftain difficulty)
          nonChieftain: 2,  // (0 + 2) when DAT_00655b08 != 0 (all other difficulties)
          rawC: '(-(uint)(DAT_00655b08 == \'\\0\') & 2) + 2',
          note: 'DAT_00655b08 is difficulty level, not multiplayer flag',
        },
        condition: 'Only accumulates when AI cities > 1 on continent AND target goalCount > AI militaryCount',
        loop: 'for continent 1..62 (0x3F exclusive)',
      },
      clamp: 'clamp(total, 0, AI_treasury / 50) * 50',
      dialog: 'HELPBONUS',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CEASEFIRE GOLD DEMAND — GROVEL path (takes all treasury)
// Source: block_00460000.c lines ~731-755 (FUN_00463224 sub-block)
// When AI demands gold during ceasefire and target has < 2 cities.
// ═══════════════════════════════════════════════════════════════════════

export const CEASEFIRE_GOLD_DEMAND_GROVEL = {
  sourceAddr: '0x00463224',

  // Conditions for GROVEL path activation
  conditions: [
    'local_70 != 0 (tribute demand still active)',
    'DAT_0064b0ec != 0 (tribute amount nonzero)',
    'target cities < 2 (DAT_0064c708[target*0x594] < 2)',
    'target has no Great Wall (wonder 6)',
    'target has no United Nations (wonder 0x18)',
  ],

  // The GROVEL takes EVERYTHING
  effect: {
    dialog: 'GROVEL',                   // s_GROVEL_006270cc
    goldTransfer: 'ALL treasury',        // target treasury → 0, all gold to AI
    techTransfer: {
      desc: 'Additionally transfers ALL techs from target to AI',
      loop: 'for tech 0..99: if target has tech AND AI lacks it AND prereqs valid: grant to AI',
      rawC: 'for(i=0;i<100;i++) if(has_tech(target,i) && !has_tech(AI,i) && prereqs_ok(i)) grant_tech(AI,i,target)',
    },
    lastTributeTurn: 'DAT_0064b108 = current_turn',
  },

  // Prior to GROVEL: regular gold demand shows GIVECASH
  regularGoldDemand: {
    dialog: 'GIVECASH',                  // s_GIVECASH_006270c0
    formula: 'clamp(DAT_0064b0ec, 0, target_treasury/50) * 50',
    wonderHalving: 'if Great Wall (6) or UN (0x18): demand /= 2',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PEACE ACCEPTANCE THRESHOLDS — diplo_ai_negotiate case 2
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5388
// Conditions under which AI accepts a peace proposal.
// ═══════════════════════════════════════════════════════════════════════

export const PEACE_ACCEPTANCE = {
  sourceAddr: '0x0045B4DA',

  // Primary acceptance condition (boolean, stored in bVar5)
  primaryCondition: {
    shouldDeclareWar: 'DAT_0064b11c == 0',
    attitudeBelow: 0x33,         // DAT_0064b114 < 0x33 (51)
    betrayalThreshold: {
      formula: '(-(difficulty==0) & 2) + 4',
      meaning: 'Chieftain: threshold = 6 (lenient); other difficulties: threshold = 4 (stricter)',
      rawC: '(-(uint)(DAT_00655b08 == 0) & 2) + 4',
      note: 'DAT_00655b08 is difficulty level (0=Chieftain), not multiplayer flag',
    },
    betrayalCheck: 'tolerance - attitude <= threshold',
    rawC: 'bVar5 = (DAT_0064b11c==0) && (DAT_0064b114 < 0x33) && (tolerance - attitude <= ((-(MP==0)&2)+4))',
  },

  // Vendetta override: if vendetta flag 0x10 set, harder threshold
  vendettaOverride: {
    condition: 'treaty[civA][civB] & 0x10 (VENDETTA)',
    modifiedThreshold: '2 - personality_tolerance',
    rawC: '2 - (char)DAT_006554f8[styleIndex * 0x30]',
    effect: 'If vendetta + betrayal > (2 - personality_tolerance): reject peace',
  },

  // Unconditional rejection
  hardReject: {
    attitudeAbove: 0x4B,         // DAT_0064b114 > 0x4B (75): always reject
  },

  // Wonder-based forced acceptance
  wonderOverride: {
    wonders: [6, 0x18],          // Great Wall (6) or United Nations (0x18)
    effect: 'bVar5 |= 8 — forces acceptance bits on',
    rawC: 'if(has_wonder(civA,6) || has_wonder(civA,0x18)) bVar5 |= 8',
  },

  // Gold sweetener formula (PERHAPSTHROWIN)
  goldSweetener: {
    formula: '(treasury/50 * their_power) / (their_power + our_power + 1) + betrayal*2',
    thenMultiply: {
      weaker: '* 0x32 (50)',       // if their_power >= our_power
      stronger: '* 100',           // if their_power < our_power
    },
    clampDown: 'while (demand > treasury): demand -= 50',
    rawC: `iVar8 = ((treasury/0x32) * their_power) / (their_power + our_power + 1) + betrayal*2;
      local_48 = (their_power < our_power) ? iVar8*100 : iVar8*0x32;
      while(treasury < local_48) local_48 -= 0x32`,
    sourceAddr: '0x0045B4DA ~line 5492',
  },

  // Tech sweetener (PERHAPSSECRET)
  techSweetener: {
    condition: 'patience > 1 OR attitude > 0x32 OR betrayal > 0 OR DAT_0064b0e8 != 0',
    attitudeEffect: 'adjust_attitude(civB, civA, -(techValue * 2))',
    sourceAddr: '0x0045B4DA ~line 5467',
  },

  // Third-party war demand (PERHAPSSOLIDARITY)
  solidarityDemand: {
    condition: 'DAT_0064b104 > 0 (third-party war target exists)',
    dialog: 'PERHAPSSOLIDARITY',
    effect: 'declare_war(civA, thirdParty, civB)',
    sourceAddr: '0x0045B4DA ~line 5533',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// DEMAND COOLDOWN — tribute demand timing constraints
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5591
// ═══════════════════════════════════════════════════════════════════════

export const DEMAND_COOLDOWN = {
  sourceAddr: '0x0045B4DA',

  recentCooldown: {
    turns: 8,                    // if (current_turn - lastTributeTurn) < 8
    effect: 'tribute = 0, techDemand = -1 (suppress ALL demands)',
    rawC: 'if(DAT_00655af8 - DAT_0064b108 < 8) { local_10=0; DAT_0064b144=-1; }',
  },

  halfDemandCooldown: {
    turns: 16,                   // 0x10: if (current_turn - lastTributeTurn) < 16
    effect: 'tribute /= 2 (half demand)',
    rawC: 'if(DAT_00655af8 - DAT_0064b108 < 0x10) local_10 = local_10/2',
  },

  ceasefireHalving: {
    condition: '(treaty[civA][civB] & 0x04) == 0',  // no peace treaty
    effect: 'tribute /= 2',
    rawC: 'if((treaty[p1*0x594+p2*4] & 4)==0) local_10 = local_10/2',
  },

  lastTributeTurnAddr: 'DAT_0064b108',
  currentTurnAddr: 'DAT_00655af8',
};

// ═══════════════════════════════════════════════════════════════════════
// SPONTANEOUS WAR DURING PEACE — AI breaks peace to declare war
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5625-5633
// ═══════════════════════════════════════════════════════════════════════

export const SPONTANEOUS_WAR = {
  sourceAddr: '0x0045B4DA',

  // Conditions: AI has peace treaty but NOT alliance, AND decides to break it
  precondition: 'treaty[civA][civB] & 0x04 AND !(treaty[civA][civB] & 0x08)',

  conditions: {
    warDesire: 'DAT_0064b13c != 0 OR attitude > 0x4A (74)',
    tributeZero: 'DAT_0064b0ec == 0 (no outstanding tribute)',
    notProtected: '!bVar3 (no Great Wall / UN protection)',
    militaryCheck: {
      formula: 'militaryLevel > rand()%2 + 5',
      rawC: '(int)(byte)DAT_0064c6b5[civB*0x594] < (int)(((rand()^sign)-sign & 1 ^ sign)-sign) + 5',
      meaning: 'AI military level must exceed random threshold of 5-6',
    },
    noHostilityFlag: '(treaty_byte1[civA][civB] & 0x40) == 0',  // no transient hostility
    attitudeAbove25: 'DAT_0064b114 > 0x19 (25)',
  },

  effect: {
    dialog: 'PROVOKE',
    warDeclaration: 'thunk_FUN_00467825(civB, civA, 0x2000)',  // set WAR flag
    lastContactTurn: true,
  },

  // Unit seizure loop: steals units on civB's territory
  unitSeizure: {
    desc: 'Before war: iterate units belonging to civB near civA cities, relocate them',
    unitFilter: 'unit.owner == civB AND unit near civA AND unit.type < 6 (land units)',
    maxDistance: 3,  // DAT_0063f660 < 3
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ALLIANCE BREAK THRESHOLD — AI decides to break existing alliance
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5685
// ═══════════════════════════════════════════════════════════════════════

export const ALLIANCE_BREAK_THRESHOLD = {
  sourceAddr: '0x0045B4DA',

  // If AI is allied (treaty & 0x08) but decides to break
  conditions: {
    attitudeThreshold: 0x4C,     // DAT_0064b114 < 0x4C (76): peace is possible
    noWarDesire: 'DAT_0064b13c == 0',
    noUnitSeized: 'local_58 == 0 (no units seized in border violation scan)',
    additionalChecks: [
      'DAT_0064b0ec != 0 (tribute exists)',
      'OR bVar3 (wonder protection)',
      'OR hostility flag (treaty_byte1 & 0x40)',
      'OR attitude < 0x1A (26)',
    ],
    randomGate: 'rand() % 3 != 0 (2/3 chance to NOT break)',
  },

  breakPath: {
    dialog: 'PROVOKE',
    // If none of the protections apply AND rand%3==0:
    action: 'declare war: thunk_FUN_00467825(civB, civA, 0x2000)',
    desc: 'TAUNTALLY if allied: cancel alliance then declare war',
    tauntAlly: {
      dialog: 'TAUNTALLY',
      action: 'thunk_FUN_00467ef2(civA, civB)',  // cancel_alliance
    },
  },

  peacePath: {
    condition: 'attitude < 0x33 AND shouldDeclareWar == 0 AND DAT_0064b11c == 0',
    dialog: 'FEEBLEALLY',
    desc: 'AI complains but stays allied',
  },

  sympathyPath: {
    condition: 'civA weaker AND lower era (DAT_0064c6b0 comparison)',
    dialog: 'SYMPATHY',
    desc: 'AI sympathizes but demands nothing',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PROVOCATION CONDITIONS — DAT_0064b0e8 flag and hostility bits
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5573
// ═══════════════════════════════════════════════════════════════════════

export const PROVOCATION_CONDITIONS = {
  sourceAddr: '0x0045B4DA',

  // Provocation is triggered if EITHER condition is true
  condition1: 'DAT_0064b0e8 != 0',     // AI wants to initiate (wantsToInitiate flag)
  condition2: '(treaty[civA][civB] & 0x60) != 0',  // INTRUDER_FLAG (0x20) or HOSTILITY_FLAG (0x40)

  effect: {
    dialog: 'PROVOKE',                  // s_PROVOKE_00626d74
    clearInit: 'DAT_0064b0e8 = 0',
    declareWar: 'thunk_FUN_00467825(civB, civA, 0x2000)',
    lastContactTurn: 'DAT_0064ca82[civA*0x594 + civB*2] = current_turn',
    returnValue: 1,                      // immediately returns from negotiate
  },
  rawC: 'if(DAT_0064b0e8 != 0 || (treaty[p1*4+p2*0x594] & 0x60) != 0)',
};

// ═══════════════════════════════════════════════════════════════════════
// ERA-BASED TRIBUTE ADJUSTMENT — ceasefire case 3
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5586
// ═══════════════════════════════════════════════════════════════════════

export const ERA_TRIBUTE_ADJUSTMENT = {
  sourceAddr: '0x0045B4DA',

  condition: 'param_3 == 3 AND civA_era < civB_era',
  effect: {
    tributeBoost: 'DAT_0064b0ec += (civB_era - civA_era)',
    meaning: 'AI demands more tribute when it is in a higher era than the player',
    rawC: `if((param_3 == 3) && ((byte)DAT_00655c22[p1] < (byte)DAT_00655c22[p2]))
      DAT_0064b0ec = (uint)(byte)DAT_00655c22[p2] - (uint)(byte)DAT_00655c22[p1]`,
  },
};

// ═══════════════════════════════════════════════════════════════════════
// WONDER DEMAND SUPPRESSION — Great Wall / UN suppress tribute in ceasefire
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5601
// ═══════════════════════════════════════════════════════════════════════

export const WONDER_DEMAND_SUPPRESSION = {
  sourceAddr: '0x0045B4DA',

  greatWallOrUN: {
    wonderIds: [6, 0x18],        // Great Wall (6) or United Nations (24/0x18)
    effect: 'tribute = 0 (suppress all gold demands)',
    rawC: `iVar8 = thunk_FUN_00453e51(civB, 6);
      if(iVar8 != 0 || (iVar8 = thunk_FUN_00453e51(civB, 0x18), iVar8 != 0))
        local_10 = 0`,
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ALLIANCE DEMAND SUPPRESSION — allied + weaker target = no tribute
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5605
// ═══════════════════════════════════════════════════════════════════════

export const ALLIANCE_DEMAND_SUPPRESSION = {
  sourceAddr: '0x0045B4DA',

  conditions: [
    'alliance active: treaty[civA][civB] & 0x08',
    'tech demand exists: DAT_0064b144 >= 0',
    'positive target: civA_personality + difficulty < civB_personality',
    'ally weaker: civA_power < civB_power OR civA_era < civB_era',
  ],

  effect: {
    tribute: 0,                  // local_10 = 0
    techDemand: 1,               // DAT_0064b0ec = 1 (minimal tech demand only)
    rawC: `if((treaty[p1*4+p2*0x594] & 8) && DAT_0064b144>=0 &&
      (personality[p1]+difficulty < personality[p2]) &&
      (power[p2] < power[p1] || era[p1] < era[p2]))
      { local_10=0; DAT_0064b0ec=1; }`,
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CEASEFIRE REFUSAL — reputation-based ceasefire rejection
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5621
// ═══════════════════════════════════════════════════════════════════════

export const CEASEFIRE_REFUSAL = {
  sourceAddr: '0x0045B4DA',

  condition: {
    formula: '(tolerance - attitude) > 6',
    rawC: '6 < (int)((uint)(byte)DAT_0064c6be[p1*0x594] - (int)(char)DAT_0064c6e8[p2*0x594+p1])',
    meaning: 'AI reputation score = tolerance - attitude_toward_player; if > 6: reject ceasefire',
    note: 'DAT_0064c6be = tolerance (betrayal tolerance), DAT_0064c6e8 = per-civ attitude',
  },

  effect: {
    bVar3: false,                // disables ceasefire acceptance
    desc: 'AI refuses ceasefire — player too untrustworthy',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CEASEFIRE ATTITUDE TIERS — attitude bonus depends on case
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5659-5675
// ═══════════════════════════════════════════════════════════════════════

export const CEASEFIRE_ATTITUDE_TIERS = {
  sourceAddr: '0x0045B4DA',

  // case 5 (war weariness): flat +2
  warWeariness: {
    case: 5,
    attitudeAdjust: 2,           // thunk_FUN_00456f20(civB, civA, 2)
  },

  // case 4 (surrender): flat +10
  surrender: {
    case: 4,
    attitudeAdjust: 10,          // thunk_FUN_00456f20(civB, civA, 10) — in local_54 default
  },

  // case 3 (ceasefire negotiation): variable
  ceasefire: {
    case: 3,
    defaultAttitude: 10,         // local_54 = 10 (base)
    eraDowngrade: {
      condition: 'civA_era < civB_era',
      attitudeAdjust: 5,         // local_54 = 5 (reduced if player is in lower era)
    },
    zeroAttitude: {
      condition: '(civA_personality < civB_personality AND civA_era < civB_era) OR civA_era < 4',
      attitudeAdjust: 0,         // local_54 = 0 (no goodwill for weak/ancient civs)
      rawC: `if(((byte)DAT_0064c6b0[p1*0x594] < (byte)DAT_0064c6b0[p2*0x594] &&
        (byte)DAT_00655c22[p1] < (byte)DAT_00655c22[p2]) || (byte)DAT_00655c22[p1] < 4)
        local_54 = 0`,
    },
  },

  // Post-adjustment: if units were seized (local_58 != 0), show APOLOGIZE dialog
  unitSeizureApology: {
    condition: 'local_58 != 0',
    dialog: 'APOLOGIZE',
    earlyReturn: 'if param_3 == 5: return 0 (war weariness ends audience)',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CEASEFIRE ACCEPTANCE RANDOMNESS — from Wave 5 audit
// Source: FUN_0045b4da @ 0x0045B4DA, block_00450000.c ~line 5685-5689
// The random gate that determines if ceasefire escalates to war
// ═══════════════════════════════════════════════════════════════════════

export const CEASEFIRE_ACCEPTANCE_RANDOMNESS = {
  sourceAddr: '0x0045B4DA',

  // In the non-alliance path: random check before PROVOKE escalation
  randomGate: {
    formula: 'rand() % 3 != 0',
    probability: '2/3 chance of NOT escalating (1/3 chance of PROVOKE)',
    rawC: 'iVar8 = _rand(); iVar8 % 3 != 0',
  },

  // Vendetta flag 0x10 doubles rejection probability (skips random gate)
  vendettaOverride: {
    condition: 'treaty[civA][civB] & 0x10 (VENDETTA)',
    effect: 'Bypasses random gate — always escalates if other conditions met',
    rawC: '((&DAT_0064c6c0)[p1*4+p2*0x594] & 0x10) != 0 → skip random check',
  },

  // Attitude threshold for peace-violation escalation
  attitudeBase: {
    desc: 'Base attitude for the check',
    formula: '(attitude_base - attitude_penalty) + 1',
    note: 'Peace-violation flag 0x10 presence effectively doubles chance of rejection',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MERCENARY BASE PRICE — Full pricing formula
// Source: FUN_0045dd7f @ 0x0045DD7F, block_00450000.c ~line 5883
// ═══════════════════════════════════════════════════════════════════════

export const MERCENARY_PRICING_DETAIL = {
  sourceAddr: '0x0045DD7F',

  // Base price formula
  basePrice: {
    formula: '((tolerance + treasury/100 - target_tolerance - attitude) * (target_military/2)) / 50',
    rawC: `thunk_FUN_005adfa0(
      (int)(((((uint)(byte)DAT_0064c6be[civA*0x594] + treasury[civB]/100)
        - (uint)(byte)DAT_0064c6be[target*0x594])
        - (int)(char)DAT_0064c6e8[civB*0x594+civA])
        * ((int)(uint)DAT_0064c70e[target*0x594] >> 1)) / 0x32,
      2, 500)`,
    clamp: { min: 2, max: 500 },
    thenMultiply: 50,            // local_14 *= 0x32
    finalRange: { min: 100, max: 25000 },
  },

  // No treaty discount: -33%
  noTreatyDiscount: {
    condition: '(treaty[target][civB] & 0x06) == 0',  // no ceasefire or peace
    formula: 'price -= price / 3',
    rawC: 'local_14 = local_14 - local_14/3',
    sourceAddr: '0x0045DD7F ~line 5890',
  },

  // Richer player surcharge: +33%
  richerPlayerSurcharge: {
    condition: 'civB_treasury < civA_treasury',
    formula: 'price += price / 3',
    rawC: 'local_14 = local_14 + local_14/3',
    sourceAddr: '0x0045DD7F ~line 5893',
  },

  // Alliance price escalation: clamp then *3
  alliancePriceEscalation: {
    condition: 'treaty[target][civB] & 0x08 (allied with target)',
    preClamp: 7000,              // if price > 7000: price = 7000
    multiplier: 3,               // price *= 3
    postClamp: { min: 500, max: 25000 },
    rawC: 'if(7000<local_14) local_14=7000; local_14=clamp(local_14*3,500,25000)',
    sourceAddr: '0x0045DD7F ~line 5897',
  },

  // Superpower discount: /2
  superpowerDiscount: {
    condition: 'target_era == 7 AND target_cities > 4',
    formula: 'price /= 2',
    rawC: 'if(DAT_00655c22[target]==7 && DAT_0064c708[target*0x594]>4) local_14/=2',
    sourceAddr: '0x0045DD7F ~line 5902',
  },

  // Allied no-common-enemy discount: -25%
  alliedDiscount: {
    condition: 'treaty[civA][civB] & 0x08 AND no other civ at war with both',
    formula: 'price -= price / 4',
    rawC: 'if(bVar3) local_14 = local_14 - ((local_14 + (local_14>>0x1f & 3)) >> 2)',
    detail: 'bVar3 = true if no civ K has treaty_byte1[K][civB] & 0x20 (war tracking)',
    sourceAddr: '0x0045DD7F ~line 5908',
  },

  // Vendetta discount: -25%
  vendettaDiscount: {
    condition: 'treaty_byte1[target][civA] & 0x10 (war_declared flag / vendetta)',
    formula: 'price -= price / 4',
    rawC: 'if(DAT_0064c6c1[target*0x594+civA*4] & 0x10) local_14 -= local_14/4',
    sourceAddr: '0x0045DD7F ~line 5916',
  },

  // Era discount: -33%
  eraDiscount: {
    condition: 'ally_era < requester_era (DAT_00655c22[civA] < DAT_00655c22[civB])',
    formula: 'price -= price / 3',
    rawC: 'if((byte)DAT_00655c22[civA] < (byte)DAT_00655c22[civB]) local_14 -= local_14/3',
    sourceAddr: '0x0045DD7F ~line 5921',
  },

  // Final normalization
  finalNormalization: {
    formula: 'price = clamp(price / 100, 1, 500) * 50',
    rawC: 'local_14 = thunk_FUN_005adfa0(local_14/100, 1, 500); local_14 = local_14 * 0x32',
    sourceAddr: '0x0045DD7F ~line 5933',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MERCENARY REFUSAL — reputation-based refusal to hire
// Source: FUN_0045dd7f @ 0x0045DD7F, block_00450000.c ~line 5936-5954
// ═══════════════════════════════════════════════════════════════════════

export const MERCENARY_REFUSAL = {
  sourceAddr: '0x0045DD7F',

  // Reputation score calculation
  reputationScore: {
    base: 'tolerance - attitude - personality_base',
    rawC: `local_324 = ((uint)(byte)DAT_0064c6be[civA*0x594]
      - (int)(char)DAT_0064c6e8[civB*0x594+civA])
      - (int)(char)DAT_006554f8[styleIndex*0x30]`,
    modifiers: [
      { condition: 'treaty[civA][civB] & 0x10 (vendetta)',   delta: +2, rawC: 'local_324 += 2' },
      { condition: 'treaty_byte1[target][civA] & 0x20 == 0', delta: +1, meaning: 'not at war with target' },
      { condition: 'target_era < requester_era',              delta: +1, meaning: 'target technologically behind' },
      { condition: 'civB_era < requester_era',                delta: +1, meaning: 'hiring civ behind requester' },
      { condition: 'treaty[civA][civB] & 0x08 (alliance)',    delta: '/2', meaning: 'halved if allied' },
    ],
  },

  // Refusal condition
  refusal: {
    threshold: 6,                // if reputationScore > 6
    additionalConditions: [
      'target allied with civB (treaty[target][civB] & 0x08)',
      'OR vendetta (treaty[civA][civB] & 0x10)',
      'OR not at war with target (treaty_byte1[target][civA] & 0x20 == 0)',
      'OR target_era < civA_era',
    ],
    dialog: 'HELLNOWEWONTGO',
    rawC: 'if(6 < local_324 && (conditions...)) show HELLNOWEWONTGO',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MERCENARY WAR FLAGS — flags set when mercenary war is declared
// Source: FUN_0045dd7f @ 0x0045DD7F, block_00450000.c ~line 6010
// ═══════════════════════════════════════════════════════════════════════

export const MERCENARY_WAR_FLAGS = {
  sourceAddr: '0x0045DD7F',

  onAcceptance: {
    declareWar: {
      flags: 0x2401,             // thunk_FUN_00467825(civB, target, 0x2401) — CONTACT + PERIODIC + WAR
      rawC: 'thunk_FUN_00467825(param_2, iVar5, 0x2401)',
    },
    warStarted: {
      flags: 0x80800,            // treaty[target][civB] |= 0x80800 (WAR_STARTED + PERIODIC)
      rawC: 'DAT_0064c6c0[target*0x594+civB*4] |= 0x80800',
    },
    mercenaryCommission: {
      flags: 0x100000,           // treaty[civA][civB] |= 0x100000 — mercenary tracking
      rawC: 'DAT_0064c6c0[civA*4+civB*0x594] |= 0x100000',
    },
    dialog: 'MERCDECLARE',       // s_MERCDECLARE_00626e6c
    mpMessage: {
      msgType: 0x62,
      desc: 'MP mercenary war declaration broadcast',
      crossRef: 'See FUN_0045DD7F mercenary hire path — 0x62 sent to remote players when merc declares war',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MERCENARY BETRAYAL ATTITUDE — attitude when merc betrays
// Source: FUN_0045dd7f @ 0x0045DD7F, block_00450000.c ~line 6043
// ═══════════════════════════════════════════════════════════════════════

export const MERCENARY_BETRAYAL = {
  sourceAddr: '0x0045DD7F',

  // 50% chance of betrayal (rand() & 1 == 0)
  chance: '50% — (rand() & 1) == 0',

  // If target has peace with requester (treaty[target][requester] & 0x04):
  peaceBetray: {
    attitudeAdjust: 0x19,        // 25: thunk_FUN_00456f20(target, requester, 0x19)
    dialog: 'MERCBETRAY',        // s_MERCBETRAY_00626e88
    warDeclare: 0x2000,          // thunk_FUN_00467825(requester, target, 0x2000) — declare war
    vendettaSet: 0x10,           // treaty[target][requester] |= 0x10
    rawC: `thunk_FUN_00456f20(target, requester, 0x19);
      thunk_FUN_00467825(requester, target, 0x2000);
      treaty[target*0x594+requester*4] |= 0x10`,
  },

  // If target has alliance with requester (treaty[target][requester] & 0x08):
  allianceBetray: {
    attitudeAdjust: 0x19,        // 25: thunk_FUN_00456f20(target, requester, 0x19)
    dialog: 'MERCBETRAYALLY',    // s_MERCBETRAYALLY_00626e78
    action: 'cancel_alliance(requester, target)',  // thunk_FUN_00467ef2(requester, target)
    rawC: 'thunk_FUN_00456f20(target,requester,0x19); thunk_FUN_00467ef2(requester,target)',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MAP EXCHANGE CONDITIONS — map sharing refusal/acceptance
// Source: FUN_0045dd7f @ 0x0045DD7F, block_00450000.c ~line 6065-6081
// ═══════════════════════════════════════════════════════════════════════

export const MAP_EXCHANGE_DETAIL = {
  sourceAddr: '0x0045DD7F',

  refusalConditions: {
    // Complex compound condition:
    path1: {
      conditions: [
        '!(treaty[civB][civA] & 0x08)',   // not allied
        'attitude > 0 (DAT_0064b114 > 0)',
        '!has_wonder(civA, 9)',            // no Great Library (wonder 9)
        '!has_wonder(civA, 0xc)',          // no wonder 12 (Marco Polo)
      ],
      allRequired: true,
      rawC: `(treaty[p2*4+p1*0x594] & 8)==0 && 0<DAT_0064b114 &&
        !has_wonder(p1,9) && !has_wonder(p1,0xc)`,
    },
    path2: {
      conditions: [
        'attitude > 0x19 (25)',            // too hostile
        'OR neither civ has tech 0x2E (Alphabet)',
      ],
      rawC: '0x19 < DAT_0064b114 || !has_tech(civB, 0x2e) || !has_tech(civA, 0x2e)',
    },
    dialog: 'MAPNO',                       // s_MAPNO_00626e94
  },

  acceptance: {
    dialog: 'MAPYES',                      // s_MAPYES_00626e9c
    patienceCost: 2,                       // patience += 2 — DAT_0064c6bf[civB*0x594] += 2
    rawC: 'DAT_0064c6bf[param_2*0x594] = DAT_0064c6bf[param_2*0x594] + 2',
    effect: 'Mutual tile/unit/city visibility exchange across entire map',
  },

  unitType0x2e: {
    note: 'The check for tech 0x2E (Alphabet) is via FUN_004bd9f0 — checks if civ has researched the tech',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// TECH GIFT ATTITUDE — show_gift_menu first/second choice multipliers
// Source: FUN_0045f0b1 @ 0x0045F0B1, block_00450000.c ~line 6256
// ═══════════════════════════════════════════════════════════════════════

export const TECH_GIFT_ATTITUDE_DETAIL = {
  sourceAddr: '0x0045F0B1',

  // Dialog choice 1 = best tech: 4x multiplier
  firstChoice: {
    dialogResult: 1,             // local_338 == 1
    formula: 'tech_value << 2',  // local_14 = tech_value(civB, techId) << 2 (shift left 2 = *4)
    attitudeAdjust: '-(tech_value * 4)',
    techGrant: 'grant DAT_0064b124 (best tech)',
    rawC: 'local_14 = thunk_FUN_004bdb2c(p2, DAT_0064b124); local_14 = local_14 << 2',
  },

  // Dialog choice 2 = second-best tech: 2x multiplier
  secondChoice: {
    dialogResult: 2,             // local_338 == 2 (second option selected)
    formula: 'tech_value * 2',   // local_14 = tech_value * 2
    attitudeAdjust: '-(tech_value * 2)',
    techGrant: 'grant DAT_0064b10c (second-best tech)',
    rawC: 'local_14 = thunk_FUN_004bdb2c(p2, DAT_0064b124); local_14 = local_14 * 2',
  },

  // Common: apply negative attitude
  attitudeApplication: {
    rawC: 'thunk_FUN_00456f20(civB, civA, -local_14)',
    patienceCost: 'patience -= (giftCount + 2); giftCount++',
    dialog: 'ACCEPT',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// MILITARY GIFT REFUSAL — conditions for AI rejecting military gift
// Source: FUN_0045f0b1 @ 0x0045F0B1, block_00450000.c ~line 6365-6372
// ═══════════════════════════════════════════════════════════════════════

export const MILITARY_GIFT_REFUSAL = {
  sourceAddr: '0x0045F0B1',

  // Refusal if ANY of these is true (OR chain):
  conditions: [
    { check: 'destination < 0',          rawC: 'iVar5 < 0',
      meaning: 'No valid city found for unit placement (FUN_0043d07a returned -1)' },
    { check: 'attitude level > 4',       rawC: 'iVar6 = thunk_FUN_004679ab(DAT_0064b114); 4 < iVar6',
      meaning: 'AI is too hostile to accept gifts (attitude level maps score to 0-6 scale)' },
    { check: 'giver weaker personality',  rawC: '(byte)DAT_0064c6b0[civA*0x594] < (byte)DAT_0064c6b0[civB*0x594]',
      meaning: 'Giver has weaker personality/aggressiveness than receiver' },
    { check: 'giver lower era',           rawC: '(byte)DAT_00655c22[civA] < (byte)DAT_00655c22[civB]',
      meaning: 'Giver is in a lower technological era' },
    { check: 'giver lower power',         rawC: 'DAT_0064c70e[civA*0x594] < DAT_0064c70e[civB*0x594]',
      meaning: 'Giver has lower military power rating' },
  ],

  dialog: 'MILITARYNO',                   // s_MILITARYNO_00626f2c
  prereqCheck: {
    desc: 'Before offering unit, also checks if recipient has prerequisite tech for unit type',
    techCheck: 'FUN_004bd9f0(civB, unit_prereq_tech)',
    dialog: 'MILITARYNO',                 // second variant at s_MILITARYNO_00626f38
  },
};

// ═══════════════════════════════════════════════════════════════════════
// WAR HAWKS TRIGGER — senate war check with scenario and UN suppression
// Source: FUN_0045fd67 @ 0x0045FD67 (178 bytes), block_00450000.c ~line 6510
// ═══════════════════════════════════════════════════════════════════════

export const WAR_HAWKS_DETAIL = {
  sourceAddr: '0x0045FD67',

  conditions: {
    militaryLevel: {
      threshold: 4,              // militaryLevel > 4 (DAT_0064c6b5[civ*0x594])
      rawC: '4 < (byte)DAT_0064c6b5[param_1*0x594]',
    },
    scenarioSuppress: {
      condition: '!(DAT_00655af0 & 0x80) OR !(DAT_0064bc60 & 1)',
      meaning: 'Suppressed if scenario mode flag AND scenario sub-flag both set',
      rawC: '((DAT_00655af0 & 0x80)==0 || (DAT_0064bc60 & 1)==0)',
    },
    aiTestSuppress: {
      condition: 'DAT_00654fa8 == 0',
      meaning: 'Suppressed during AI test/autoplay mode',
    },
  },

  dialog: {
    normal: 'CONTINUEHAWKS',     // s_CONTINUEHAWKS_00626f68
    unitedNations: 'CONTINUEUN', // s_CONTINUEUN_00626f5c
  },

  unitedNationsWonderId: 0x18,   // wonder 24: if has_wonder(civ, 0x18) → show UN dialog
  rawC: `if(4 < militaryLevel && scenario_ok && !autoplay) {
    if(has_wonder(civ, 0x18)) show("CONTINUEUN"); else show("CONTINUEHAWKS"); }`,
};

// ═══════════════════════════════════════════════════════════════════════
// PARLEY STATE MACHINE — FUN_004b8676 state transitions
// Source: FUN_004b8676 @ 0x004B8676 (536 bytes), block_004B0000.c ~line 3998
// Maps DAT_0067a9b0 input values to DAT_0067a994 state output values.
// ═══════════════════════════════════════════════════════════════════════

export const PARLEY_STATE_MACHINE = {
  sourceAddr: '0x004B8676',

  inputVar: 'DAT_0067a9b0',     // parley input state (set by UI or network)
  outputVar: 'DAT_0067a994',    // parley output state (drives dialog rendering)

  // State transition table: DAT_0067a9b0 → DAT_0067a994
  transitions: {
    // -1: initial/default
    '-1': {
      output: 3,
      action: 'thunk_FUN_00453c40()',  // reset diplomacy context
      desc: 'Initial state — show greeting/intro dialog',
    },
    // 0: proceed to main menu
    0: {
      output: 6,
      action: 'thunk_FUN_00453c80()',  // prepare menu context
      desc: 'Main diplomacy menu',
    },
    // 1: negotiate response, sub-state from DAT_0067a9c4
    1: {
      output: 0x0C,               // 12: default negotiate response
      subStateVar: 'DAT_0067a9c4',
      subStateOverride: {
        nonzero: 0x0D,            // 13: if DAT_0067a9c4 != 0 → alternate negotiate response
      },
      action: 'thunk_FUN_00453c80()',
      desc: 'AI negotiate response — sub-state controls variant',
    },
    // 2: treaty/demand response, sub-states from DAT_0067a9c8
    2: {
      subStateVar: 'DAT_0067a9c8',
      subStates: {
        0: { output: 7,  desc: 'Treaty sub-response: ceasefire proposal' },
        1: { output: 8,  desc: 'Treaty sub-response: peace proposal' },
        2: { output: 9,  desc: 'Treaty sub-response: alliance proposal' },
        3: { output: 10, desc: 'Treaty sub-response: demand/tribute' },
        default: { output: 11, desc: 'Treaty sub-response: other/cancel' },
      },
      action: 'thunk_FUN_00453c80()',
    },
    // 3: gift menu
    3: {
      output: 5,
      action: 'thunk_FUN_00453c80()',
      desc: 'Gift menu',
    },
    // 4: end audience / dismiss
    4: {
      output: 0x0F,               // 15
      action: 'thunk_FUN_00453c80()',
      desc: 'End audience / farewell dialog',
    },
  },

  // After setting state: look up dialog coordinates from table
  dialogCoords: {
    xTable: 'DAT_0062d7d0',     // (&DAT_0062d7d0)[state * 2]
    yTable: 'DAT_0062d7d4',     // (&DAT_0062d7d4)[state * 2]
    desc: 'Dialog window position indexed by output state',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// UNIT REASSIGNMENT PATHFINDING — alliance cancellation unit withdrawal
// Source: FUN_00467ef2 @ 0x00467EF2, block_00460000.c lines 1707-1758
// Calls FUN_00467baf for bidirectional unit withdrawal.
// ═══════════════════════════════════════════════════════════════════════

export const UNIT_REASSIGNMENT_PATHFINDING = {
  sourceAddr: '0x00467EF2',

  steps: [
    'clear_treaty_flag(civA, civB, 0x08)',       // thunk_FUN_00467750(civA, civB, 8)
    'withdraw_units(civA, civB)',                  // thunk_FUN_00467baf(civA, civB)
    'withdraw_units(civB, civA)',                  // thunk_FUN_00467baf(civB, civA)
    'recalc_map(currentPlayer, 1)',               // thunk_FUN_0047cf9e(DAT_006d1da0, 1)
  ],

  withdrawUnitsFunc: {
    sourceAddr: '0x00467BAF',
    size: 835,
    desc: 'Iterates all units, finds those in/near opposing cities, relocates to own nearest city',
    algorithm: [
      'For each unit of civA:',
      '  Scan all cities of civB to find nearest city',
      '  If unit is at/near that city location:',
      '    Find nearest city owned by civA',
      '    Check valid target via pathfinding',
      '    Relocate unit to that city (thunk_FUN_005b345f)',
      '    Clear unit orders → 0xFF (no orders)',
    ],
    cityRecordStride: 0x58,
    unitRecordStride: 0x20,
  },

  notification: {
    localPlayer: {
      condition: 'DAT_006d1da0 == civA OR DAT_006d1da0 == civB',
      dialog: 'CANCELALLIANCE',          // s_CANCELALLIANCE_0062831c
    },
    thirdParty: {
      condition: 'Has embassy (0x80) or wonder 0x18 or wonder 9 or observer mode',
      visibilityChecks: [
        'treaty[currentPlayer][civA] & 0x80',
        'has_wonder(currentPlayer, 0x18)',
        'has_wonder(currentPlayer, 9)',
        'DAT_00655b07 (observer mode)',
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// SCHISM CONDITIONS DETAIL — expanded from binary
// Source: block_00460000.c lines 1212-1220 (FUN_00463224)
// ═══════════════════════════════════════════════════════════════════════

export const SCHISM_CONDITIONS_DETAIL = {
  sourceAddr: '0x00463224',

  conditions: {
    gameFlag: {
      check: '(DAT_00655aea byte 1 & 0x01) != 0',
      rawC: '(DAT_00655aea._1_1_ & 1) != 0',
      meaning: 'Bit 9 of DAT_00655aea — specific game scenario flag must be set',
    },
    initialContact: {
      check: 'bVar11 (AI spoke during meeting)',
      meaning: 'The meeting must have had actual diplomatic exchange',
    },
    dialogState: {
      check: 'DAT_00626a30 != 0 OR param_5 != 0',
      meaning: 'Either global dialog flag set or player-initiated meeting',
    },
    validTarget: {
      check: 'DAT_00626a34 != 0xFFFFFFFF',
      meaning: 'Schism target civ is valid (not -1)',
    },
    techLevel: {
      check: 'DAT_0064c708[aiCiv*0x594] > 4',
      rawC: '4 < *(short *)(&DAT_0064c708 + param_2 * 0x594)',
      meaning: 'AI must have more than 4 cities (tech_level proxy)',
    },
    rankComparison: {
      check: 'aiCiv_era > playerCiv_era + 1',
      rawC: '(byte)DAT_00655c22[param_1] + 1 < (uint)(byte)DAT_00655c22[param_2]',
      meaning: 'AI must be at least 2 eras ahead of the player',
    },
    vendettaFlag: {
      check: '(treaty_byte1[aiCiv][playerCiv] & 0x20) != 0',
      rawC: '(DAT_0064c6c1[param_1*4 + param_2*0x594] & 0x20) != 0',
      meaning: 'WAR_STARTED / vendetta flag must be set (active conflict)',
    },
  },

  dialog: 'SCHISM',
  tutorialRef: 'TUTORIAL',
  rawC: `if(((DAT_00655aea._1_1_ & 1) != 0) && bVar11 &&
    ((DAT_00626a30 != 0 || param_5 != 0) &&
    (DAT_00626a34 != -1 && 4 < cities[p2] &&
    era[p1]+1 < era[p2] && (treaty_byte1[p1][p2] & 0x20) != 0)))
    show_dialog("TUTORIAL", "SCHISM")`,
};

// ═══════════════════════════════════════════════════════════════════════
// ADVISOR UNIT LIST RENDER — FUN_00468bb9 (1841 bytes)
// Source: block_00460000.c lines 2053-2229
// Renders the advisor panel unit list (diplomacy/military advisor).
// Uses DAT_0067a994 (parley dialog state) to control display modes.
// ═══════════════════════════════════════════════════════════════════════

export const ADVISOR_UNIT_LIST_RENDER = {
  sourceAddr: '0x00468BB9',

  // --- Sprite Resource Table Offset ---
  // @ line 2163: thunk_FUN_00428b0c(*(undefined4 *)(DAT_00628420 + 0xb7c))
  // Used when advisor panel list index == -1 (empty/header row)
  emptyListSprite: 0xb7c,  // DAT_00628420 + 0xb7c — "no units" placeholder icon

  // --- Display Mode Checks (DAT_0067a994) ---
  // @ lines 2189-2192: special rendering for certain parley states
  displayModes: {
    militaryAdvisor: 9,     // DAT_0067a994 == 9 → show additional unit info decorators
    tradeAdvisor0:  0xe,    // DAT_0067a994 == 0xe && param_1 == 0 → trade panel left
    tradeAdvisor1:  0xe,    // DAT_0067a994 == 0xe && param_1 == 1 → trade panel right
    proposalPanel:  0xf,    // DAT_0067a994 == 0xf → proposal unit list
  },

  // --- Unit sprite scaling ---
  // @ line 2171: thunk_FUN_0040ef70(0x30) — base sprite height 48px
  // @ line 2174: (fontHeight << 7) / 0x30 — scaled offset for even/odd rows
  baseSpriteHeight: 0x30,  // 48 pixels
  scaleShift: 7,           // left-shift for sub-pixel precision
  scaleDivisor: 0x30,      // divide by 48 for final offset

  // --- Adjacency check for unit border warning ---
  // @ lines 2624-2633: checks 8 adjacent tiles for enemy presence
  adjacencyOffsetTableX: 'DAT_00628350',  // 8-entry signed byte X offsets
  adjacencyOffsetTableY: 'DAT_00628360',  // 8-entry signed byte Y offsets
  adjacencyCount: 8,
};

// ============================================================================
// === CIVILOPEDIA UNIT COMPARISON STRINGS ===
// Binary ref: FUN_004906fd @ 0x004906FD (5344 bytes) in block_00490000.c
// Renders Civilopedia concept pages for unit types — compares current vs.
// obsoleting unit stats (attack/defense/firepower/hp/movement).
// ============================================================================

export const CIVILOPEDIA_UNIT_DISPLAY = {
  sourceAddr: '0x004906FD',
  size: 5344,

  // Sprite resource table offsets (DAT_00628420 + offset) — text format strings
  // loaded via thunk_FUN_00428b0c for unit stat comparison display
  spriteOffsets: {
    defaultStatText:     0xb08,  // fallback when stat type is non-standard (e.g., special abilities)
    betterStatFormat:    0xb10,  // "%s has better %s: %d vs %d" (current < obsoleting)
    equalStatText:       0xb14,  // "equal" text when stats match
    attackCompare:       0xb18,  // attack stat comparison format string
    defenseCompare:      0xb1c,  // defense stat comparison format (reused for both branches)
    defenseEqualText:    0xb20,  // defense equal/sufficient text (branch: current >= obsoleting)
    worseOverallText:    0xb24,  // "worse" text when current attack >= obsoleting but defense is worse
    noUpgradeText:       0xb28,  // "no upgrade path" or final fallback text
    unitClassLabel:      0xb0c,  // unit class/category label (used with string ID 0x293)
  },

  // Civilopedia page layout constants
  stringIds: {
    unitClassHeader:  0x293,  // "Unit Class:" header string
    movementHeader:   0x294,  // "Movement:" header string
    terrainHeader:    0x297,  // "Terrain:" header string
    specialHeader:    0x299,  // "Special:" header string
  },
};

// ============================================================================
// === CIVILOPEDIA DETAIL PANEL SPRITES ===
// Binary ref: parley_add_dialog_panel (FUN_00526ca0) @ 0x00526CA0 (26152 bytes)
// in block_00520000.c. This massive function builds the right-side detail panel
// for every civilopedia category. param_1 selects the panel type, param_2 is
// the column index (0 = left, 1 = right in dual-column mode).
// All sprite offsets are DAT_00628420 + value.
// ============================================================================

export const CIVILOPEDIA_DETAIL_SPRITES = {
  sourceAddr: '0x00526CA0',
  size: 26152,

  // --- Common Header Sprites (all panel types) ---
  // Three column header buttons created at top of every detail page
  columnHeaders: {
    col0: 0xba4,     // column 0 header (controlId 0x415)                         // 0x00526CA0
    col1: 0xd84,     // column 1 header (controlId 0x430)                         // 0x00526CA0
    col2: 0xba8,     // column 2 header (controlId 0x416)                         // 0x00526CA0
  },
  detailTextFormat: 0xd2c,  // detail text description format string                // 0x00526CA0

  // --- Shared Title Sprites ---
  // Used across multiple categories to show "has prerequisite" text
  panelTitleLeft:  0xc0c,  // title text when param_2 == 0 (left panel)            // 0x00526CA0
  panelTitleRight: 0xc10,  // title text when param_2 == 1 (right panel)           // 0x00526CA0

  // --- case 2: Unit Detail ---
  units: {
    titleText:   0xb8c,  // unit name/type title (centered, measured for layout)   // 0x00526CA0
    statLabels: [
      0xb90,             // stat column label 0 (attack)                           // 0x00526CA0
      0xb94,             // stat column label 1 (defense)                          // 0x00526CA0
      0xb98,             // stat column label 2 (hp/firepower)                     // 0x00526CA0
      0xb9c,             // stat column label 3 (movement)                         // 0x00526CA0
    ],
    extraLabel:  0xba0,  // additional stat text (cost/category)                   // 0x00526CA0
    listControlId: 0x3f3,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 3: City Improvement Detail ---
  improvements: {
    columnLabels: [
      0xbac,             // column header 0 (name)                                 // 0x00526CA0
      0xbb0,             // column header 1 (cost)                                 // 0x00526CA0
      0xbb4,             // column header 2 (maintenance)                          // 0x00526CA0
      /* 3000 decimal = 0xBB8 */ // column header 3 (prerequisite)                 // 0x00526CA0
      0xbbc,             // column header 4 (effect)                               // 0x00526CA0
      0xbc0,             // column header 5 (makes obsolete)                       // 0x00526CA0
    ],
    extraColumn: 0xd08,  // column header 6 (special/scenario flag)                // 0x00526CA0
    listControlId: 0x3f3,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 4: Wonder Detail ---
  wonders: {
    columnLabels: [
      0xbac,             // reuses improvement column 0 (name)                     // 0x00526CA0
      0xbb0,             // reuses improvement column 1 (cost)                     // 0x00526CA0
      0xbb4,             // reuses improvement column 2                            // 0x00526CA0
      /* 3000 decimal = 0xBB8 */ // reuses improvement column 3                    // 0x00526CA0
      0xbbc,             // reuses improvement column 4                            // 0x00526CA0
      0xbc4,             // wonder-specific column (expiration/obsolete)            // 0x00526CA0
    ],
    extraColumn: 0xd08,  // reuses special column                                  // 0x00526CA0
    listControlId: 0x3f5,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 5: Terrain Detail ---
  terrain: {
    columnLabels: [
      0xbcc,             // terrain column 0 (name/type)                           // 0x00526CA0
      0xbd0,             // terrain column 1 (movement cost)                       // 0x00526CA0
      0xbd4,             // terrain column 2 (defense bonus)                       // 0x00526CA0
      0xbd8,             // terrain column 3 (food/shield/trade)                   // 0x00526CA0
    ],
    altTitleNoPrereq: 0xb90,  // uses unit stat[0] when no prereq text             // 0x00526CA0
    altTitleWithPrereq: 0xd08, // uses special column when prereq text present     // 0x00526CA0
    listControlId: 0x3f6,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 6: Government Detail ---
  governments: {
    titleText:     0xbdc,  // government name title (centered)                     // 0x00526CA0
    // Conditional government type icons based on DAT_0064c6c0 flags:
    typeIcons: {
      militaryGovt:  0xbe0,  // flag & 8: military government (strongest)          // 0x00526CA0
      commerceGovt:  0xbe4,  // flag & 4: commerce government                     // 0x00526CA0
      fundamentalist:0xbcc,  // flag & 2: fundamentalist (reuses terrain col 0)    // 0x00526CA0
      specialGovt:   0xbe8,  // flag2 & 0x20: special government type              // 0x00526CA0
      defaultGovt:   0xbec,  // fallback: no special flags set                     // 0x00526CA0
    },
  },

  // --- case 7: Game Concepts Detail ---
  concepts: {
    titleText: 0xbf0,  // concept section title                                   // 0x00526CA0
    columnLabels: [
      0xbf4,            // concept column 0                                        // 0x00526CA0
      0xbf8,            // concept column 1                                        // 0x00526CA0
      0xbfc,            // concept column 2                                        // 0x00526CA0
      0xc00,            // concept column 3                                        // 0x00526CA0
      0xc04,            // concept column 4                                        // 0x00526CA0
    ],
    listControlId: 0x3f7,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 8: Map/Battle Detail ---
  mapBattle: {
    titleText: 0xc08,  // map/battle section title                                 // 0x00526CA0
  },

  // --- case 9: Gold/Trade Detail ---
  goldTrade: {
    // Conditional text based on local_30 (trade route) flag:
    withTradeRoute:  0xc14,  // single format when trade route exists               // 0x00526CA0
    noRoutePartA:    0xc18,  // first part when no trade route                     // 0x00526CA0
    noRoutePartB:    0xc1c,  // second part, appends player gold amount            // 0x00526CA0
    goldDisplayFmt:  0xc20,  // gold amount display format string                  // 0x00526CA0
    // Navigation buttons:
    navButtonA:      0xc28,  // button (controlId = param_2 + 0x400)               // 0x00526CA0
    navButtonB:      0xc2c,  // button (controlId = param_2 + 0x402)               // 0x00526CA0
    // Navigation sprites for dual-panel mode:
    prevButton:      0xdbc,  // "previous" nav (param_2 == 0)                      // 0x00526CA0
    nextButtonShared:0xdc0,  // "next" nav (shared for both panels)                // 0x00526CA0
    backButton:      0xdc4,  // "back" nav (param_2 == 0)                          // 0x00526CA0
  },

  // --- case 0xA: Diplomacy Detail ---
  diplomacy: {
    titleText: 0xc24,  // diplomacy detail title (no-prereq mode only)             // 0x00526CA0
  },

  // --- case 0xB: Tech Tree Detail ---
  techTree: {
    titleText: 0xc30,  // tech tree section title                                  // 0x00526CA0
    columnLabels: [
      0xc34,            // tech tree column 0 (leads to)                           // 0x00526CA0
      0xc38,            // tech tree column 1 (required for)                       // 0x00526CA0
    ],
    listControlId: 0x40c,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 0xC: Multi-Item Detail (e.g., combat odds) ---
  multiItem: {
    titleSprites: [
      0xc50,            // multi-item title 0 (local situation)                    // 0x00526CA0
      0xc54,            // multi-item title 1 (opponent)                           // 0x00526CA0
      0xc58,            // multi-item title 2 (result)                             // 0x00526CA0
      0xd0c,            // multi-item title 3 (special/extra)                      // 0x00526CA0
    ],
  },

  // --- case 0xD: Government Comparison ---
  govtComparison: {
    titleSprites: [
      0xc3c,            // govt comparison title 0                                 // 0x00526CA0
      0xc40,            // govt comparison title 1                                 // 0x00526CA0
      0xc44,            // govt comparison title 2                                 // 0x00526CA0
      0xc48,            // govt comparison title 3                                 // 0x00526CA0
    ],
    summaryLabel:  0xc4c,  // govt comparison summary/footer label                 // 0x00526CA0
    listControlId: 0x424,  // base controlId (+ param_2)                           // 0x00526CA0
  },

  // --- case 0xF: Full Improvement List ---
  fullImprovementList: {
    // Reuses improvement column headers (0xbac-0xbc4, 0xd08)
    sectionTitleA: 0xc5c,  // first section title                                  // 0x00526CA0
    sectionTitleB: 0xc60,  // second section title                                 // 0x00526CA0
    listControlId: 0x41f,  // scrollable list control ID                           // 0x00526CA0
  },

  // --- case 0x11: Advanced Detail (e.g., scenario info) ---
  advancedDetail: {
    titleText: 0xc68,  // advanced detail title (no-prereq mode only)              // 0x00526CA0
    // Navigation buttons (dual-panel mode only):
    prevButton:       0xdc8,  // "previous" button (param_2==0, controlId=0x408)   // 0x00526CA0
    nextButtonShared: 0xdcc,  // "next" button shared (controlId=0x408/0x40a)      // 0x00526CA0
    backButton:       0xdd0,  // "back" button (param_2==0, controlId=0x40a)       // 0x00526CA0
  },
};

// ============================================================================
// === PARLEY DIALOG TEXT STRINGS ===
// Binary ref: FUN_004b7d72 @ 0x004B7D72 (324 bytes) — parley header builder
//             FUN_004b90ad @ 0x004B90AD (757 bytes) — treaty message formatter
//             FUN_004b9504 @ 0x004B9504 (122 bytes) — player name formatter
//             FUN_004b968a @ 0x004B968A (1304 bytes) — parley event handler
// All in block_004B0000.c
// ============================================================================

export const PARLEY_TEXT_STRINGS = {
  // @ FUN_004b7d72 — builds parley header (title bar text)
  headerBuilder: {
    sourceAddr: '0x004B7D72',
    spriteOffsets: {
      multiplayerHeader: 0xb54,  // "Chat with all players" (when this+0x1ec == 4, multiplayer mode)
      diplomaticHeader:  0xb50,  // "%s of %s" header for diplomatic parley (leader name + nation)
    },
  },

  // @ FUN_004b90ad — formats treaty proposal/acceptance messages
  treatyFormatter: {
    sourceAddr: '0x004B90AD',
    spriteOffsets: {
      treatyFromSingle:  0xb60,  // "Treaty proposal from %s" (param_3 == false, single source)
      treatyFromDual:    0xb58,  // "%s and %s propose..." (param_3 == true, two sources)
      treatyConnector:   0xb5c,  // "and" / connector text between two player names
    },
  },

  // @ FUN_004b9504 — formats player/civ name for display
  nameFormatter: {
    sourceAddr: '0x004B9504',
    spriteOffsets: {
      unknownPlayer: 0xb64,  // "Unknown" placeholder when param_1 == 0
    },
    // When param_1 != 0: uses thunk_FUN_00493ba6(civId) + thunk_FUN_00493b10(civId)
  },

  // @ FUN_004b968a — parley window event handler (msg 0xd0)
  eventHandler: {
    sourceAddr: '0x004B968A',
    spriteOffsets: {
      statusMessage: 0xb68,  // status/notification text in parley window
    },
    msgId: 0xd0,  // Windows message ID that triggers this handler
  },
};

// ============================================================================
// === RESEARCH TREE DISPLAY ===
// Binary ref: FUN_004afc89 @ 0x004AFC89 (1230 bytes) in block_004A0000.c
// Renders research tree entries — shows tech icons and names in research panel.
// ============================================================================

export const RESEARCH_TREE_DISPLAY = {
  sourceAddr: '0x004AFC89',
  size: 1230,

  // Sprite resource table offsets (DAT_00628420 + offset)
  spriteOffsets: {
    unknownResearch: 0xb84,  // "Unknown" text for research goal when target tech == -1
  },
};

// ============================================================================
// === SAVE/LOAD DIALOG SPRITES ===
// Binary ref: FUN_00475666 (save) / FUN_004741be (load) in block_00470000.c
// File dialog for loading and saving .sav/.scn files.
// ============================================================================

export const SAVE_LOAD_DIALOG = {
  // Sprite resource table offsets (DAT_00628420 + offset)
  // @ block_00470000.c lines ~3097-3107, ~3214-3224
  spriteOffsets: {
    // Load dialog: offset depends on file type
    // 0x680 + (-(param_1 == 0) & 0xffffff4f) * 4 — conditional offset for load
    loadDialogBase:  0x680,  // base offset for load dialog title sprite
    // Save dialog: similarly conditional
    saveDialogBase:  0x684,  // base offset for save dialog title sprite
    // Both use thunk_show_open_dialog_31D2 for file picker
  },
};

// ============================================================================
// === RESEARCH / ADVISOR DISPLAY SPRITES ===
// Binary ref: FUN_004c195e @ 0x004C195E (2078 bytes) in block_004C0000.c
// Research goal / intelligence display with tech icons and spy actions.
// ============================================================================

export const RESEARCH_DISPLAY_SPRITES = {
  sourceAddr: '0x004C195E',
  size: 2078,

  // Sprite resource table offsets (DAT_00628420 + offset)
  spriteOffsets: {
    // Tech icon: 0xc4 + (hasTech ? 0 : -4) — conditional tech knowledge icon
    techKnowledgeIcon: 0xc4,  // tech known/unknown icon (via thunk_FUN_004271e8)
    // Spy action: tech steal listbox entry text
    spyTechEntry:      0xd28, // "%s" format for stealable tech in espionage list (via thunk_FUN_0059edf0)
  },
};

// ============================================================================
// === MESSAGE BOX SPRITES ===
// Binary ref: show_messagebox_CA35 @ 0x004CCA35 (132 bytes) in block_004C0000.c
// Simple MessageBoxA wrapper with sprite-based caption/text lookup.
// ============================================================================

export const MESSAGE_BOX_SPRITES = {
  sourceAddr: '0x004CCA35',
  size: 132,

  // Sprite resource table offsets (DAT_00628420 + offset)
  spriteOffsets: {
    msgBoxCaption: 0x8d0,  // MessageBoxA caption (LPCSTR via thunk_FUN_00428b0c)
    msgBoxText:    0x8e8,  // MessageBoxA body text (LPCSTR via thunk_FUN_00428b0c)
  },
  // Triggered when param_2 count exceeds param_1 listbox limit
};

// ============================================================================
// === NETWORK STATUS DISPLAY ===
// Binary ref: FUN_0044dab5 @ 0x0044DAB5 (221 bytes) in block_00440000.c
// Renders network status text in multiplayer lobby.
// ============================================================================

export const NETWORK_STATUS_DISPLAY = {
  sourceAddr: '0x0044DAB5',
  size: 221,

  // Sprite resource table offsets (DAT_00628420 + offset)
  spriteOffsets: {
    statusLabel: 0x720,  // network status text (rendered with shadow at +0x1c34 offset)
  },
};
