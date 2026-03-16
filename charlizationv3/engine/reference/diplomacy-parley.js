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
                       sourceAddr: 'FUN_0057b5df' },
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
// TREATY EXECUTION — execute_alliance, execute_peace, execute_ceasefire
// Source: FUN_0045a535, FUN_0045a6ab, FUN_0045a7a8 @ block_00450000.c
// ═══════════════════════════════════════════════════════════════════════

export const TREATY_EXECUTION = {
  executeAlliance: {
    // @ FUN_0045a535 (374 bytes)
    attitudeAdjust: -25,         // 0xFFFFFFE7: adjust_attitude(civA, civB, -25)
    treatyFlagSet: 0x08,         // set alliance flag
    civFlagsSet: 0x100,          // set nuke awareness flag on civ
    dialogString: 'ALLIANCE',    // game.txt dialog key
    sourceAddr: '0x0045A535',
  },

  executePeace: {
    // @ FUN_0045a6ab (253 bytes)
    treatyFlagsSet: 0x4004,      // peace (0x04) + recent contact (0x4000)
    attitudeClamp: { min: 0, max: 0x32 },  // clamp attitude to 0-50
    dialogString: 'TREATY',      // game.txt dialog key
    sourceAddr: '0x0045A6AB',
  },

  executeCeasefire: {
    // @ FUN_0045a7a8 (315 bytes)
    treatyFlagsSet: 0x4002,      // ceasefire (0x02) + recent contact (0x4000)
    clearFlag: 0x40000,          // clear tribute demanded flag
    attitudeClamp: { min: 0, max: 0x32 },  // clamp attitude to 0-50
    clearOnAllCivs: 0x800,       // clear attacked flag on all civs (loop 1..7)
    dialogString: 'CEASEFIRE',   // game.txt dialog key
    sourceAddr: '0x0045A7A8',
  },

  allianceChainWar: {
    // @ FUN_0045a8e3 (398 bytes)
    civLoop: { start: 1, end: 7 },     // iterate civs 1..7
    allianceCheck: 0x08,                // check alliance flag
    nonWarCheck: 0x2008,                // check !(treaty & 0x2008) to avoid re-declaring
    soundIds: { ai: 0x39, human: 0x38 }, // war declaration sound effects
    warFlags: 0x80800,                   // set war + betrayal flags
    declaredWarFlags: 0x2401,            // declared war + contact + ceasefire
    sourceAddr: '0x0045A8E3',
  },

  declareWarTiers: {
    // @ FUN_0045ac71 (1125 bytes)
    noTreaty: {
      attitudeAdjust: -5,    // 0xFFFFFFFB
      patienceIncrement: 1,
    },
    ceasefireOrPeace: {
      attitudeAdjust: -15,   // 0xFFFFFFF1
      patienceIncrement: 1,
      provocationFlag: 0x10,
    },
    alliance: {
      attitudeAdjust: -25,   // 0xFFFFFFE7
      patienceIncrement: 2,
      provocationFlag: 0x10,
    },
    warFlags: {
      declaredWar: 0x2000,
      warAndBetray: 0x80800,
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
