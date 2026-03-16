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
    researchBeakers:{ offset: 0x08, size: 2, type: 'short',    // @ DAT_0064c6a8
                     notes: 'Accumulated research beakers toward current tech. ' +
                            'sourceAddr: block_004A0000.c:2642 (init=0), block_00560000.c:2818' },
    currentResearch:{ offset: 0x0A, size: 2, type: 'short',    // @ DAT_0064c6aa
                     notes: 'Tech index currently being researched (-1 = none). ' +
                            'Init to 0xFFFF (-1). Set when player/AI selects research. ' +
                            'Used with DAT_00627684 (tech name pointers) for display. ' +
                            'Checked against 0x59 (89 = max tech count) for validity. ' +
                            'sourceAddr: block_004A0000.c:3580 (init), block_00420000.c:4410-4416 (display)' },
    capitalX:      { offset: 0x0C, size: 2, type: 'short',     // @ DAT_0064c6ac
                     notes: 'X coordinate of capital city / first settler placement. ' +
                            'sourceAddr: block_004A0000.c:2953' },
    foundingTurn:  { offset: 0x0E, size: 2, type: 'short',     // @ DAT_0064c6ae
                     notes: 'Turn number when civ was founded. Init = max(turnNumber, 10). ' +
                            'Used in score calculations: turnNumber - foundingTurn < 25 means "new civ". ' +
                            'sourceAddr: block_004A0000.c:2645-2649, block_00480000.c:2699' },
    techCount:     { offset: 0x10, size: 1, type: 'byte',      // @ DAT_0064c6b0
                     notes: 'Number of techs discovered' },
    leaderTolerance:{ offset: 0x13, size: 1, type: 'byte',     // @ DAT_0064c6b3
                     notes: 'Leader-derived tolerance: leader.tolerance + 3 (range 2-4). ' +
                            'Init = 4 for first civ, then set from leader personality. ' +
                            'sourceAddr: block_004A0000.c:2652,2928-2929' },
    leaderAggression:{ offset: 0x14, size: 1, type: 'byte',    // @ DAT_0064c6b4
                     notes: 'Leader-derived aggression: 9 - leaderTolerance (range 5-7). ' +
                            'Init = 4, then set to 9 - tolerance value. Higher = more aggressive. ' +
                            'Used in AI war/peace decisions and military build priority. ' +
                            'sourceAddr: block_004A0000.c:2651,2930' },
    government:    { offset: 0x15, size: 1, type: 'byte',      // @ DAT_0064c6b5
                     notes: '0=Anarchy,1=Despot,2=Monarchy,3=Commun,4=Fundam,5=Republic,6=Democracy' },
    aiRandomSeed:  { offset: 0x16, size: 1, type: 'byte',      // @ DAT_0064c6b6
                     notes: 'rand()%100 rolled each turn for AI randomization' },
    spaceshipParts:{ offset: 0x17, size: 4, type: 'byte[4]',   // @ DAT_0064c6b7
                     notes: 'Spaceship component counts, 4 slots (one per SS component type). ' +
                            'Zeroed on civ init. Compared against global min/max arrays: ' +
                            'DAT_00673af8[4] = min across human civs (init 99), ' +
                            'DAT_00673afc[4] = max across human civs (init 0). ' +
                            'If civParts < minHuman: AI invests treasury/64 in spaceship. ' +
                            'If civParts > maxHuman+1: AI invests treasury/256. ' +
                            'sourceAddr: block_004A0000.c:2709, block_00480000.c:3003-3018, ' +
                            'block_004E0000.c:5527-5535' },
    tolerance:     { offset: 0x1E, size: 1, type: 'byte',      // @ DAT_0064c6be
                     notes: 'Per-civ tolerance value (derived from leader personality)' },
    patience:      { offset: 0x1F, size: 1, type: 'byte',      // @ DAT_0064c6bf
                     notes: 'Patience counter, decremented every 3 turns' },
    treatyFlags:   { offset: 0x20, size: 32, type: 'uint[8]',  // @ DAT_0064c6c0
                     notes: '4-byte treaty flags for each of 8 civs' },
    reputation:    { offset: 0x40, size: 8,  type: 'char[8]',  // @ DAT_0064c6e0
                     notes: 'Per-civ reputation score (0-100). Passed to FUN_004679ab (attitude_level converter) ' +
                            'to determine displayed reputation level (Enraged..Worshipful). ' +
                            'Init: self=100 (barbarian slot gets 100); AI civs = rand()%80+10 (range 10-89); ' +
                            'human civs = clamp(difficulty*5 + rand()%80 + 10, 10, 75). ' +
                            'Set by: FUN_0046791a (block_00460000.c:1497-1509) — clamped to 0-100. ' +
                            'Modified by: diplomat actions (block_004C0000.c:2669), foreign advisor slider ' +
                            '(block_00430000.c:450), scenario editor (block_00550000.c:2920-2923). ' +
                            'Read by: diplomacy greeting (block_004B0000.c:3778,3782), ' +
                            'intelligence report (block_00510000.c:784,788), ' +
                            'war declaration check (block_00450000.c:3638). ' +
                            'sourceAddr: block_004A0000.c:2671-2687 (init), block_00460000.c:1489 (getter)' },
    attitudes:     { offset: 0x48, size: 8,  type: 'char[8]',  // @ DAT_0064c6e8
                     notes: 'Signed byte: attitude toward each civ (-100..+100)' },
    combatCounter: { offset: 0x50, size: 8,  type: 'char[8]',  // @ DAT_0064c6f0
                     notes: 'Per-civ combat encounter counter. Incremented (+1) each time defender wins ' +
                            'combat (attacker unit destroyed) in FUN_00585480 (block_00580000.c:953). ' +
                            'Reset to 0 when attacker wins (block_00580000.c:966), ' +
                            'when unit moves without combat (block_00580000.c:727, block_00590000.c:658), ' +
                            'or when counter exceeds 9 (block_00450000.c:3753-3754). ' +
                            'At >9 the AI clears its war interest flag (DAT_0064b0f8=0), ' +
                            'preventing war declaration after 10+ consecutive combat losses against a civ. ' +
                            'Init: zeroed per civ pair (block_004A0000.c:2668-2669). ' +
                            'sourceAddr: block_00580000.c:953,966,727, block_00590000.c:658, block_00450000.c:3753' },
    unitCount:     { offset: 0x66, size: 2, type: 'short',     // @ DAT_0064c706
                     notes: 'Total number of units owned. Zeroed at init and start of AI turn. ' +
                            'Incremented per alive unit during AI unit scanning (block_00530000.c). ' +
                            'Checked in city production and power calculations. ' +
                            'sourceAddr: block_004A0000.c:2702 (init), block_00530000.c:541 (reset)' },
    cityCount:     { offset: 0x68, size: 2, type: 'short',     // @ DAT_0064c708
                     notes: 'Number of cities owned' },
    seaUnitCount:  { offset: 0x6A, size: 2, type: 'short',     // @ DAT_0064c70a
                     notes: 'Number of sea-domain units (domain==2). Incremented per unit when ' +
                            'unit_type.domain == 2 (block_00530000.c:707-709). Zeroed at AI turn start. ' +
                            'Used in tech evaluation scoring: seaUnitCount/4 added to tech score when ' +
                            'tech matches current research goal (block_004B0000.c:6148-6149). ' +
                            'sourceAddr: block_00530000.c:708-709, block_004B0000.c:6148' },
    totalPopulation: { offset: 0x6C, size: 2, type: 'short',   // @ DAT_0064c70c
                     notes: 'Sum of all city sizes (total population units). Accumulated per city ' +
                            'in AI turn processing: += city.size (block_00530000.c:759-761). ' +
                            'Used in power ranking formula: techCount*3 + totalPop*8 + treasury/32 ' +
                            '(block_00480000.c:1013-1016). Also used in rush-buy cost scaling: ' +
                            'treasury / (totalPop + 1) (block_00570000.c:3914-3916). ' +
                            'Checked for tutorial: cityCount==1 && totalPop>2 && turn==35 triggers hint ' +
                            '(block_00480000.c:3099-3100). ' +
                            'sourceAddr: block_00530000.c:759-761, block_00480000.c:1015' },
    militaryPower: { offset: 0x6E, size: 2, type: 'ushort',    // @ DAT_0064c70e
                     notes: 'Aggregate military power score: sum of (attack + defense) for all units. ' +
                            'Accumulated per unit in AI turn processing (block_00530000.c:714-717). ' +
                            'Used extensively in diplomacy for military strength comparisons.' },
    totalAttack:   { offset: 0x70, size: 2, type: 'short',     // @ DAT_0064c710
                     notes: 'Sum of attack values for all units. Accumulated per unit: ' +
                            '+= unit_type.attack (block_00530000.c:711-713). Zeroed at AI turn start. ' +
                            'Distinct from militaryPower which sums (attack + defense). ' +
                            'sourceAddr: block_00530000.c:711-713, block_004A0000.c:2704' },
    populationMilestone: { offset: 0x72, size: 2, type: 'short', // @ DAT_0064c712
                     notes: 'Population milestone tracker for "Your empire now spans N people" messages. ' +
                            'If pop < 100: milestone = pop/10; if pop >= 100: milestone = pop/100 + 9. ' +
                            'When milestone increases, triggers notification for human players. ' +
                            'sourceAddr: block_00480000.c:2417-2431' },
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
  // === Byte 0 (low byte) ===
  // Confirmed by: Civ2-clone Read.ClassicSav.cs (lines 303-308),
  //   FUN_004df10f treaty-signing switch (cases 0/1/2),
  //   EDITTREATIES dialog in FUN_0055d8d8 (checkboxes 0-6)
  CONTACT:             0x01,  // bit 0:  have made contact
                               //   FUN_0055d8d8: set via thunk_FUN_00467825(p1,p2,0x401)
  CEASEFIRE:           0x02,  // bit 1:  ceasefire treaty active
                               //   FUN_004df10f case 0: thunk_FUN_00467825(p2,p3,2)
  PEACE:               0x04,  // bit 2:  peace treaty active
                               //   FUN_004df10f case 1: thunk_FUN_00467825(p2,p3,4)
  ALLIANCE:            0x08,  // bit 3:  alliance active
                               //   FUN_004df10f case 2: thunk_FUN_00467825(p2,p3,8)
  VENDETTA:            0x10,  // bit 4:  vendetta — war grudge / embassy expelled
                               //   Civ2-clone: treatyVendetta = GetBit(byte0, 4)
                               //   FUN_0055d8d8 line 5915: cleared when declaring war, sets 0x800
  INTRUDER_FLAG:       0x20,  // bit 5:  set when both sides have embassies (shared intelligence)
                               //   FUN_0055d8d8 line 5430-5433: set if both have 0x10
                               //   cleared by set-treaty cascade (mask 0x2a60)
  HOSTILITY_FLAG:      0x40,  // bit 6:  transient hostility flag
                               //   cleared by set-treaty cascade (mask 0x2a60)
  EMBASSY:             0x80,  // bit 7:  embassy established
                               //   Civ2-clone: treatyEmbassy = GetBit(byte0, 7)
                               //   EDITTREATIES: checkbox 6

  // === Byte 1 (bits 8-15) ===
  SPACESHIP_LAUNCHED:  0x0100, // bit 8:  set on treaty[spaceCiv][otherCiv] when spaceCiv has
                               //   launched a spaceship (civ+0x105 spaceshipFlag != 0).
                               //   Set by: war declaration evaluation (block_00450000.c:3660-3661)
                               //     treaty[spaceCiv][otherCiv] |= 0x100
                               //   Checked by: AI unit targeting (block_00530000.c:1971,1983)
                               //     (treaty & 0x104) == 0x100 means "has spaceship, NOT at peace"
                               //     — makes this civ a high-priority target for AI attack.
                               //   NOTE: 0x0100 is ALSO used on CIV_STRUCT.flags (civ+0x00) as
                               //     ALLIANCE_ACTIVE (set by FUN_0045a535, block_00450000.c:4731-4736)
                               //     — different field, same bit value.
                               //   sourceAddr: block_00450000.c:3661 (treaty), block_00450000.c:4732 (civ flags)
  // 0x0200:  (bit 9)  "attacked" flag, cleared by alliance proposal loop
  PERIODIC_FLAG_10:    0x0400, // bit 10: set on first contact (0x401 = CONTACT + this)
                               //   cleared every 16 turns
  WAR_STARTED:         0x0800, // bit 11: war just started / attacked flag
                               //   cleared every 32 turns; set on city capture / war declaration
  CAPTURE_VENDETTA:    0x1000, // bit 12: vendetta from city capture (FUN_00579c40)
                               //   when neither side has NUCLEAR_PACT, indicates blood feud

  // === Bits 13-15 ===
  WAR:                 0x2000, // bit 13: at war (declared war / vendetta state)
                               //   Civ2-clone: treatyWar = GetBit(byte1, 5) = bit 13
                               //   EDITTREATIES: checkbox 4
                               //   FUN_0055d8d8 line 5914: thunk_FUN_00467825(p1,p2,0x2000)
  RECENT_CONTACT:      0x4000, // bit 14: transient, cleared each turn @ 0xFF5FBFFF
                               //   set on first-contact if not previously contacted
  // 0x8000:  (bit 15) unused / reserved

  // === Bytes 2-3 (bits 16-31) ===
  CAPTURE_NOTIFY:      0x10000, // bit 16: set when city captured (FUN_0057b5df)
                                //   thunk_FUN_00467825(attacker, defender, 0x10000)
  NUCLEAR_ATTACK:      0x20000, // bit 17: set on nuke attacker's treaty toward victim
                                //   (FUN_0057f9e3: treaty[attacker][victim] |= 0x20000)
  PERIODIC_FLAG_18:    0x40000,  // bit 18: periodic, cleared for AI-AI each turn
  PERIODIC_FLAG_19:    0x80000,  // bit 19: cleared every 32 turns
  // 0x100000: (bit 20) unused / unobserved in binary
  WAR_TRACKING:        0x200000, // bit 21: auto-set when WAR (0x2000) is set via cascade
                                 //   FUN_00467825: if setting 0x2000, param_3 |= 0x200000
  MULTI_CAPTURE_VENDETTA: 0x400000, // bit 22: set when even number of units captured > 1
                                    //   from city (FUN_0057b5df) — or democracy+max power
  DIPLOMACY_ACTIVE:    0x800000, // bit 23: set when diplomacy encounter starts
                                 //   FUN_00460129 line 163: thunk_FUN_00467825(p1,p2,0x800000)
  SPY_MISSION_ACTIVE:  0x1000000, // bit 24: spy/diplomat mission is active against this civ
                                  //   Set by: FUN_004c8a78 (spy mission start, "CHATSPYSTART" dialog)
                                  //     block_004C0000.c:2676: treaty[target][spy_owner] |= 0x1000000
                                  //   Cleared by: FUN_00486c27 (turn processing) when spy unit's
                                  //     counter2 expires to 0 — block_00480000.c:1780: treaty &= 0xfeffffff
                                  //   Also cleared by: block_004A0000.c:3444, block_004E0000.c:786
                                  //     (same context — spy mission resolution path)
                                  //   Purpose: tracks active espionage; prevents overlapping spy missions
                                  //     against the same civ and triggers counter-intelligence checks
                                  //   sourceAddr: block_004C0000.c:2676 (set), block_00480000.c:1780 (clear)

  // === Compound masks used in code ===
  TREATY_BITS:         0x0E,       // CEASEFIRE(0x02) | PEACE(0x04) | ALLIANCE(0x08)
  WAR_OR_ALLIANCE:     0x2008,     // WAR(0x2000) | ALLIANCE(0x08)
                                    //   Checked in attitude scoring (block_00560000.c:250):
                                    //   if (treaty & 0x2008) == 0 → not at war and not allied
  SPACESHIP_NO_PEACE:  0x0104,     // SPACESHIP_LAUNCHED(0x100) | PEACE(0x04)
                                    //   Checked as (treaty & 0x104) == 0x100 in AI unit targeting
                                    //   (block_00530000.c:1971,1983): "has spaceship, no peace treaty"
                                    //   — triggers AI to prioritize attacking this civ
  ALLIANCE_CHECK:      0x08,       // alliance bit only
  WAR_CHECK:           0x2000,     // war bit only
  CLEAR_TRANSIENT:     0xFF5FBFFF, // ~(RECENT_CONTACT | NUCLEAR_ATTACK | DIPLOMACY_ACTIVE)
                                    //   clear bits 14, 17, 23 each turn
  CLEAR_DEAD_CIV:      0xFFFFFFD9, // ~(CEASEFIRE(0x02) | INTRUDER_FLAG(0x20))
                                    //   Applied when civ is dead (block_00560000.c:80)

  // === Periodic clearing schedule (FUN_00560084, block_00560000.c) ===
  // Each AI turn: clear 0xFF5FBFFF (transient each turn)
  // Each AI turn (AI-to-AI): clear 0xFFFBFFFF (PERIODIC_FLAG_18, bit 18)
  // Every 16 turns (turnNum & 0x0F == 0): clear 0xFFFFFBFF (PERIODIC_FLAG_10, bit 10)
  // Every 32 turns (turnNum & 0x1F == 0): clear 0xFFFFF7FF (WAR_STARTED, bit 11)
  //                                  AND clear 0xFFF7FFFF (PERIODIC_FLAG_19, bit 19)
  // sourceAddr: block_00560000.c lines 63-108

  // Civ schism initial treaties (FUN_0057a904):
  CHILD_TO_PARENT:     0x2001,     // CONTACT(0x01) + WAR(0x2000) — rebel starts at war
  PARENT_TO_CHILD:     0x82801,    // CONTACT(0x01) + WAR_STARTED(0x800) + WAR(0x2000)
                                    //   + PERIODIC_FLAG_19(0x80000) — parent at war with rebel
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
    condition: '(gameFlags & 1) == 0 OR (tolerance - attitude <= allianceStrength AND !(treaty & VENDETTA))',
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
    // Statue of Liberty (wonder 19 = 0x13)
    statueOfLiberty: {
      aiHasStatueOfLiberty: {
        delta: +1,
        condition: 'aiCiv has Statue of Liberty (wonder 0x13)',
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
          'CORRECTION: Pseudocode annotation said "Democracy advance" but binary checks wonder 0x13',
          'Statue of Liberty = wonder index 19 (0x13)',
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
        'Fire "WARENDS" event if conditions met (embassy OR Electronics tech(0x18) OR Ceremonial Burial tech(0x09))',
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
    // If not already allied: break treaties and set hostility
    breakTreaties: {
      condition: 'treaty[otherCiv][aiCiv] & 0x08 == 0 (not allied)',
      address: '0x0056030A',
      actions: [
        'Clear CEASEFIRE+PEACE+INTRUDER_FLAG (& 0xFFFFFFD9 = ~0x26)',
        'Set hostility flags (| 0x80840 = PERIODIC_FLAG_19 | WAR_STARTED | HOSTILITY_FLAG)',
        'Set contactTurn = max(current, turn - 8)',
      ],
      notes: 'Does NOT use FUN_00467825 cascade — raw bitwise OR, so WAR(0x2000) is NOT set',
    },
    // If already allied: max hostility
    maxHostility: {
      condition: 'treaty[otherCiv][aiCiv] & 0x08 != 0 (allied — alliance exists)',
      address: '0x00560324',
      actions: [
        'set_attitude(aiCiv, otherCiv, 100) — maximum hostility',
        'contactTurn = 0xFFFF — permanent cooldown',
        'Clear INTRUDER_FLAG (& ~0x20)',
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
        condition: 'treaty[humanCiv][aiCiv] & 0x80 == 0 (no embassy) AND no Electronics(0x18)/Ceremonial Burial(0x09) tech',
        address: '0x0056213E',
        notes: 'Cannot share target civ techs if human cannot verify (no embassy, no Electronics(0x18)/Ceremonial Burial(0x09))',
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
      compoundTreatySet: {
        flags: 0x0C,                 // PEACE(0x04) + ALLIANCE(0x08) set simultaneously
        rawC: 'thunk_FUN_00467825(aiCiv, humanCiv, 0x0C)',
        note: 'Sets PEACE and ALLIANCE in a single cascade call',
      },
      warFlags: {
        onTarget: 0x80800,           // WAR_STARTED(0x800) + PERIODIC_FLAG_19(0x80000)
        rawC: 'DAT_0064c6c0[param_2*0x594 + target*4] |= 0x80800',
        note: 'Raw bitwise OR on target treaty toward human — not via cascade',
      },
      goldTransfer: {
        formula: 'aiCiv.treasury -= goldOffer * 50; humanCiv.treasury += goldOffer * 50',
        rawC: 'DAT_0064c6a2[aiCiv*0x594] -= goldOffer*0x32; DAT_0064c6a2[humanCiv*0x594] += goldOffer*0x32',
      },
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

    // --- Sprite resource table offsets (DAT_00628420 + offset) ---
    // @ FUN_00560d95: text register 2 set based on alliance state
    spriteOffsets: {
      labelAllied:    0x1cc,   // DAT_00628420 + 0x1cc — opponent label when allied (treaty & 8 != 0)    // 0x00560D95
      labelNotAllied: 0x1d0,   // DAT_00628420 + 0x1d0 — opponent label when not allied (treaty & 8 == 0)// 0x00560D95
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
      aiToHuman: { value: 'turn + 16', address: '0x00562264 / 0x0056231E',
                   note: '+16 turns into the future — longest cooldown, prevents re-proposing for 16 turns' },
      targetToHuman: { value: 'turn', address: '0x00562268 / 0x00562322' },
      notes: '+16 turns cooldown for aiCiv after accepted proposal',
    },
    onRejection: {
      value: 'max(currentContactTurn, turn - 14)',
      address: '0x00562206 / 0x00562300',
      turns: 14,
      notes: 'Sets cooldown to at most 14 turns ago (prevents re-proposing for ~14 turns)',
    },
    onCannotReach: {
      value: 'max(currentContactTurn, turn - 15)',
      address: '0x005620E8 / 0x005622C6',
      turns: 15,
      notes: 'If check_near_city fails (cannot reach human), 15-turn backoff',
    },
    summary: {
      cannotReach: '15-turn cooldown',
      rejection: '14-turn cooldown',
      acceptance: '+16 turns into future (longest)',
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
      'Visibility: embassy OR Electronics tech (0x18) OR Ceremonial Burial tech (0x09)',
    ],
    visibilityTechs: { electronics: 0x18, ceremonialBurial: 0x09 },
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
      // Binary ref: block_00550000.c lines 4817-4831
      // uVar4 is the tile improvement byte (offset +1 in tile record)
      // Flag values match MAP_STRUCTURE.tileFields.improvements encoding
      road:       { flag: 0x10, bonus: '+1 (replaces base: total 2)',
                    note: 'line 4817: borderScore = savedScore + 2 (overwrites +1 base)' },
      railroad:   { flag: 0x20, bonus: '+1 (additive)',
                    note: 'line 4820: borderScore += 1' },
      mine:       { flag: 0x08, bonus: '+1 (additive)',
                    note: 'line 4823: borderScore += 1' },
      irrigation: { flag: 0x04, bonus: '+1 (additive)',
                    note: 'line 4826: borderScore += 1' },
      fortress:   { flag: 0x40, bonus: '+2 (additive)',
                    note: 'line 4829: borderScore += 2' },
    },
    maxPerUnit: 'base(1) + road_replace(+1) + railroad(+1) + mine(+1) + irrigation(+1) + fortress(+2) = 7',
    notes: 'Only counts units with role < 5 (military) and not already counted (unit flag & 0x04 == 0). ' +
           'Unit flag 0x04 (BORDER_CHECKED) is set after counting to prevent double-counting.',
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
  { name: 'AI has Statue of Liberty',   delta: '+1',  condition: 'AI has wonder 19' },
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
// === ATTITUDE SCORING — HARDCODED NUMERIC CONSTANTS ===
// Binary ref: FUN_00560d95 @ block_00560000.c (4728 bytes)
// All threshold values embedded as numeric literals in the attitude scoring function.
// ============================================================================

export const ATTITUDE_SCORING_CONSTANTS = {
  // Phase 3 — War-only modifiers
  largeTechGap:       8,     // @ 0x00560D95: if AI techCount + 8 < human techCount: +1
  multiWarBase:       1,     // @ 0x00560D95: base penalty per additional war
  multiWarExpDiv:     6,     // formula: warCount - (6 - expansionism); min 1, max 6

  // Phase 5 — Late game
  lateGameTurnGate:   200,   // @ 0x00560D95: spaceship/power checks only if turn > 200
  topPowerCityGate:   3,     // @ 0x00560D95: top power bonus only if human cities > 3

  // Phase 6 — Spaceship
  // Checks DAT_0064caa8 (spaceship data) for active spaceship parts

  // Phase 7 — Personality
  personalityFloor:   -2,    // @ 0x00560D95: personality score floored at -2
  personalityExpMul:  3,     // @ 0x00560D95: expansionism * 3
  personalityMilMul:  2,     // @ 0x00560D95: militarism * 2

  // Phase 8 — Power ranking
  maxPowerDelta:      3,     // @ 0x00560D95: power differential clamped to -3..+3

  // Phase 9 — Military comparison multipliers
  milThreshold1_5x:   1.5,   // @ 0x00560D95: AI * 3/2 < human
  milThreshold2x:     2,     // @ 0x00560D95: AI * 2 < human
  milThreshold4x:     4,     // @ 0x00560D95: AI * 4 < human

  // Phase 12-13 — Tech/tolerance
  techRankZero:       0,     // @ 0x00560D95: techRankCount == 0 means human has most techs

  // Final clamps (from FUN_00560d95 post-scoring)
  allianceViolationMax:  100,  // @ 0x00560334: max hostility on alliance violation while at war
  ceasefireViolation:     50,  // @ 0x0056139A: hostility on ceasefire violation

  sourceAddr: '0x00560D95',
};

// ============================================================================
// === SPACE RACE TECH CHECK ===
// Binary ref: FUN_00568861 @ block_00560000.c
// Checks whether a civ has the technology prerequisites for space race components.
// Used in attitude scoring to evaluate if the human is a spaceship threat.
// ============================================================================

export const SPACE_RACE_TECH_IDS = {
  // Tech IDs checked for space race capability (from FUN_00568861):
  // The function checks if a civ has specific advances that enable spaceship parts.
  // These are cross-referenced with production/wonder eligibility.
  robotics:       0x48,   // tech 72 — Robotics (propulsion)
  steamEngine:    0x4E,   // tech 78 — Steam Engine (structural)
  pottery:        0x41,   // tech 65 — Pottery (habitation)
  geneticEng:     0x21,   // tech 33 — Genetic Engineering (fuel pods)
  steel:          0x4F,   // tech 79 — Steel (not in base rules but checked)
  sourceAddr: '0x00568861',
};

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

  // --- Unit scoring formula ---
  unitScoring: {
    formula: 'score = (defense + attack * 2) * hitpoints',
    rawC: `cVar1 = DAT_0064b1c4[(byte)DAT_006560f6[unit*0x20] * 0x14];  // attack
      cVar2 = DAT_0064b1c5[(byte)DAT_006560f6[unit*0x20] * 0x14];       // defense
      iVar3 = thunk_FUN_005b29aa(unit);                                  // hitpoints
      iVar3 = ((int)cVar2 + cVar1 * 2) * iVar3`,
    fields: {
      attack: 'unit_type.attack (DAT_0064b1c4, offset 0x04 in unit type record)',
      defense: 'unit_type.defense (DAT_0064b1c5, offset 0x05 in unit type record)',
      hitpoints: 'FUN_005b29aa(unitIdx) — current hitpoints of the unit',
    },
    selection: 'Best-scoring unit across all valid candidates (local_34 tracks index, local_c tracks best score)',
    sourceAddr: '0x0055F7D1 ~line 6040-6047',
  },

  // --- MP message types ---
  mpMessages: {
    MILITARYAID1: {
      msgType: 0x51,
      dialogString: 'MILITARYAID1',
      addr: 's_MILITARYAID1_00633c2c',
      desc: 'Shown to ally (human): AI civ gifts a unit to the ally',
      params: 'slot 0: AI civ name, slot 1: unit name, slot 2: ally civ name',
      rawC: 'if (DAT_006d1da0 == local_2c) thunk_FUN_004442e0(s_MILITARYAID1, local_34); ' +
            'else if (2 < DAT_00655b02) thunk_FUN_00511880(0x51, ...)',
      sourceAddr: '0x0055F7D1 ~line 6093-6100',
    },
    MILITARYAID2: {
      msgType: 0x52,
      dialogString: 'MILITARYAID2',
      addr: 's_MILITARYAID2_00633c3c',
      desc: 'Shown to receiving civ (human): ally receives a gifted unit at one of their cities',
      params: 'slot 0: AI civ name, slot 1: unit name, slot 2: city name, slot 3: enemy civ name',
      rawC: 'if (DAT_006d1da0 == local_10) thunk_FUN_004442e0(s_MILITARYAID2, local_34); ' +
            'else if (2 < DAT_00655b02) thunk_FUN_00511880(0x52, ...)',
      sourceAddr: '0x0055F7D1 ~line 6112-6120',
    },
  },

  notes: 'Not ported in JS engine; no unit gifting mechanism exists',
};

// ============================================================================
// === ATTITUDE LEVEL FUNCTION ===
// Binary ref: FUN_004679ab @ 0x004679AB (178 bytes), block_00460000.c
// Converts raw attitude score (0-100) to discrete level (0-8).
// Used throughout diplomacy UI and AI greeting/response selection.
// ============================================================================

export const ATTITUDE_LEVEL = {
  sourceAddr: '0x004679AB',
  // Thresholds: raw attitude score → level
  // Each entry: { maxExclusive, level }
  thresholds: [
    { range: '< 0',    level: 0, label: 'Enraged' },
    { range: '0-10',   level: 1, label: 'Furious',   upperBound: 0x0B },   // < 11
    { range: '11-25',  level: 2, label: 'Annoyed',   upperBound: 0x1A },   // < 26
    { range: '26-38',  level: 3, label: 'Uncooperative', upperBound: 0x27 }, // < 39
    { range: '39-61',  level: 4, label: 'Neutral',   upperBound: 0x3E },   // < 62
    { range: '62-74',  level: 5, label: 'Cordial',   upperBound: 0x4B },   // < 75
    { range: '75-89',  level: 6, label: 'Polite',    upperBound: 0x5A },   // < 90
    { range: '90-99',  level: 7, label: 'Enthusiastic', upperBound: 100 }, // < 100
    { range: '>= 100', level: 8, label: 'Worshipful' },
  ],

  // Helper functions that use attitude level
  helpers: {
    isHostile: {
      // FUN_00467a86: returns true if attitude level < 4
      sourceAddr: '0x00467A86',
      formula: 'get_attitude_level(get_attitude(civA, civB)) < 4',
      note: 'Hostile = Enraged, Furious, Annoyed, or Uncooperative',
    },
    isFriendly: {
      // FUN_00467abb: returns true if attitude level > 4
      sourceAddr: '0x00467ABB',
      formula: 'get_attitude_level(get_attitude(civA, civB)) > 4',
      note: 'Friendly = Cordial, Polite, Enthusiastic, or Worshipful',
    },
  },

  // War readiness trust check: FUN_00467af0
  warReadinessTrust: {
    sourceAddr: '0x00467AF0',
    logic: [
      'if vendetta flag (byte1 & 0x20): return true (always considered hostile)',
      'if alliance (treaty & 0x08): return false (ally = peaceful)',
      'if only contact + ceasefire (treaty & 0x05 == 0x01): return attitude > 0x31 (49)',
      'else: return false',
    ],
    attitudeThreshold: 0x31,  // 49: ceasefire with attitude > 49 = considered peaceful
  },
};

// ============================================================================
// === FOREIGN ADVISOR ATTITUDE DISPLAY THRESHOLDS ===
// Binary ref: block_00430000.c lines 432-452 (foreign advisor dialog)
// Different from the attitude-level thresholds in FUN_004679ab (ATTITUDE_LEVEL above).
// These 9 entries map the foreign advisor's slider position (0-8) to a raw attitude
// value that gets written when the human player adjusts the attitude slider.
// The dialog presents a 9-position slider; selecting position N sets the raw
// attitude to THRESHOLDS[N]. Used only in the foreign advisor UI, not in AI logic.
// ============================================================================

export const FOREIGN_ADVISOR_ATTITUDE_DISPLAY = {
  sourceAddr: 'block_00430000.c lines 441-449',
  // 9-entry threshold table: slider position → raw attitude value
  // local_32c[0..8] = { 0, 5, 0x11, 0x1f, 0x32, 0x44, 0x52, 0x5f, 100 }
  thresholds: [0, 5, 17, 31, 50, 68, 82, 95, 100],
  //            0  1   2   3   4   5   6   7    8   ← slider position index
  // After the player selects a position, the raw attitude is set:
  //   attitude[aiCiv][humanCiv] = thresholds[selectedPosition]
  // and an event is dispatched: FUN_0046b14d(0x98, 0xFF, aiCiv, humanCiv, value, ...)
  // This allows the human player to manually override the AI's attitude in
  // scenarios or cheat mode via the foreign advisor screen.
  note: 'These differ from ATTITUDE_LEVEL thresholds — ATTITUDE_LEVEL converts a raw ' +
        'score to a discrete level (0-8), while these map a slider position BACK to a ' +
        'raw score for manual attitude setting.',
};

// ============================================================================
// === TREATY FLAG CASCADE RULES ===
// Binary ref: FUN_00467750 (clear) @ 0x00467750 (213 bytes), block_00460000.c
// Binary ref: FUN_00467825 (set)   @ 0x00467825 (223 bytes), block_00460000.c
// These functions enforce treaty flag dependencies — clearing or setting one
// flag may automatically clear/set related flags.
// ============================================================================

export const TREATY_FLAG_CASCADE = {
  // --- CLEAR (FUN_00467750 @ 0x00467750) ---
  // Clearing a flag may trigger additional flag clears before applying.
  // Applied symmetrically: treaty[A][B] AND treaty[B][A] both cleared.
  clear: {
    sourceAddr: '0x00467750',
    rules: [
      {
        trigger: 0x04,     // clearing PEACE
        alsoClear: 0x08,   // also clears ALLIANCE
        note: 'Removing peace also removes alliance (hierarchy: CEASEFIRE < PEACE < ALLIANCE)',
      },
      {
        trigger: 0x2000,   // clearing WAR
        alsoClear: 0x1800, // also clears WAR_STARTED(0x800) + CAPTURE_VENDETTA(0x1000)
        note: 'Removing war also clears war-started and city-capture vendetta bits',
      },
      {
        trigger: 0x01,     // clearing CONTACT
        alsoClear: 0x2000, // also clears WAR (which cascades to clear 0x1800)
        note: 'Removing contact clears war (full cascade)',
      },
    ],
    operation: 'treaty[A][B] &= ~param; treaty[B][A] &= ~param',
    symmetric: true,
  },

  // --- SET (FUN_00467825 @ 0x00467825) ---
  // Setting a flag may trigger prerequisite sets and/or clear conflicting flags.
  // Applied symmetrically: treaty[A][B] AND treaty[B][A] both set.
  set: {
    sourceAddr: '0x00467825',
    rules: [
      {
        trigger: 0x08,     // setting ALLIANCE
        alsoSet: 0x04,     // prerequisite: also sets PEACE
        note: 'Alliance requires peace — auto-sets peace flag',
      },
      {
        trigger: 0x0E,     // setting any of CEASEFIRE(0x02)|PEACE(0x04)|ALLIANCE(0x08)
        alsoClear: 0x2A60, // clears WAR(0x2000) + WAR_STARTED(0x0800)
                           //   + INTRUDER_FLAG(0x0020) + HOSTILITY_FLAG(0x0040) + 0x0200
        note: 'Any treaty clears all war/hostility flags',
      },
      {
        trigger: 0x2000,   // setting WAR
        alsoClear: 0x0E,   // clears CEASEFIRE(0x02)|PEACE(0x04)|ALLIANCE(0x08)
        alsoAdd: 0x200000, // adds WAR_TRACKING bit
        note: 'Declaring war clears all existing treaties; adds war-tracking bit',
      },
    ],
    operation: 'treaty[A][B] |= param; treaty[B][A] |= param',
    symmetric: true,
  },
};
