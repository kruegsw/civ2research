// ═══════════════════════════════════════════════════════════════════
// sound.js — Sound system: sfx preloading, playback, combat sounds,
//            event dispatch, production sounds, city status, music
// Binary ref: engine/reference/sound-triggers.js
// ═══════════════════════════════════════════════════════════════════

const SFX = {};

export function sfxLoad(name) {
  const a = new Audio(`assets/sounds/${name}.WAV`);
  SFX[name] = a;
  return a;
}

export function sfx(name) {
  const a = SFX[name];
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {});
}

// ═══════════════════════════════════════════════════════════════════
// 1. SOUND_ID_MAP — Complete hex sound ID → WAV filename mapping
// AUTHORITATIVE: extracted directly from civ2.exe string table at 0x0062AF70
// (file offset 0x229f70), 9-byte entries, 133 slots (0x00..0x84)
// ═══════════════════════════════════════════════════════════════════
export const SOUND_ID_MAP = {
  0x00: 'AIRCOMBT',  0x01: 'AIRPLANE',  0x02: 'CHEERS',    0x03: 'CRWDBUGL',
  0x04: 'AQUEDUCT',  0x05: 'BARRACKS',  0x06: 'BIGGUN',    0x07: 'BLDCITY',
  0x08: 'BLDSPCSH',  0x09: 'BOATSINK',  0x0a: 'CATAPULT',  0x0b: 'CATHEDRL',
  0x0c: 'CAVALRY',   0x0d: 'CHEERS',    0x0e: 'CIVDISOR',  0x0f: 'CHEERS',
  0x10: 'CHEERS',    0x11: 'NEWGOVT',   0x12: 'CHEERS',    0x13: 'CRWDBUGL',
  0x14: 'NEWGOVT',   0x15: 'NEWGOVT',   0x16: 'DIESEL',    0x17: 'DIVCRASH',
  0x18: 'DIVEBOMB',  0x19: 'ELEPHANT',  0x1a: 'ENGNSPUT',  0x1b: 'CHEERS',
  0x1c: 'FIRE---',   0x1d: 'NEWGOVT',   0x1e: 'CHEERS',    0x1f: 'CHEERS',
  0x20: 'HELICPTR',  0x21: 'HELISHOT',  0x22: 'INFANTRY',  0x23: 'LARGEXPL',
  0x24: 'CHEERS',    0x25: 'CHEERS',    0x26: 'MCHNGUNS',  0x27: 'MEDEXPL',
  0x28: 'MEDGUN',    0x29: 'MISSILE',   0x2a: 'MRKTPLCE',  0x2b: 'NEWGOVT',
  0x2c: 'CHEERS',    0x2d: 'CHEERS',    0x2e: 'NAVBTTLE',  0x2f: 'NEWBANK',
  0x30: 'NEWONDER',  0x31: 'CHEERS',    0x32: 'NUKEXPLO',  0x33: 'CHEERS',
  0x34: 'CHEERS',    0x35: 'CRWDBUGL',  0x36: 'CHEERS',    0x37: 'CHEERS',
  0x38: 'CHEERS',    0x39: 'CHEERS',    0x3a: 'CHEERS',    0x3b: 'CHEERS',
  0x3c: 'CHEERS',    0x3d: 'NEWGOVT',   0x3e: 'REVOLT',    0x3f: 'RIFLE',
  0x40: 'CHEERS',    0x41: 'CHEERS',    0x42: 'CHEERS',    0x43: 'SMALLEXP',
  0x44: 'SPYSOUND',  0x45: 'STKMARKT',  0x46: 'SUBMRINE',  0x47: 'CHEERS',
  0x48: 'CHEERS',    0x49: 'SWORDFGT',  0x4a: 'SWRDHORS',  0x4b: 'TANKMOTR',
  0x4c: 'CHEERS',    0x4d: 'TORPEDOS',  0x4e: 'JETSPUTR',  0x4f: 'JETCRASH',
  0x50: 'JETBOMB',   0x51: 'JETPLANE',  0x52: 'JETCOMBT',  0x53: 'FANFARE1',
  0x54: 'FANFARE2',  0x55: 'FANFARE3',  0x56: 'FANFARE4',  0x57: 'FANFARE5',
  0x58: 'FANFARE6',  0x59: 'FANFARE7',  0x5a: 'FANFARE8',  0x5b: 'FEEDBK01',
  0x5c: 'FEEDBK02',  0x5d: 'FEEDBK03',  0x5e: 'FEEDBK04',  0x5f: 'FEEDBK05',
  0x60: 'FEEDBK06',  0x61: 'FEEDBK07',  0x62: 'FEEDBK08',  0x63: 'MOVPIECE',
  0x64: 'ENDOTURN',  0x65: 'CUSTOM1',   0x66: 'CUSTOM2',   0x67: 'CUSTOM3',
  0x68: 'POS1',      0x69: 'NEG1',      0x6a: 'MENUOK',    0x6b: 'MENULOOP',
  0x6c: 'MENUEND',   0x6d: 'BUY',       0x6e: 'SELL',      0x6f: 'GUILLOTN',
  0x70: 'DRUMAL',    0x71: 'DRUMAY',    0x72: 'DRUMA0',    0x73: 'DRUMAN',
  0x74: 'DRUMBL',    0x75: 'DRUMBY',    0x76: 'DRUMB0',    0x77: 'DRUMBN',
  0x78: 'DRUMCL',    0x79: 'DRUMCY',    0x7a: 'DRUMC0',    0x7b: 'DRUMCN',
  0x7c: 'LETTER',    0x7d: 'EXTRA1',    0x7e: 'EXTRA2',    0x7f: 'EXTRA3',
  0x80: 'EXTRA4',    0x81: 'EXTRA5',    0x82: 'EXTRA6',    0x83: 'EXTRA7',
  0x84: 'EXTRA8',
};

// ═══════════════════════════════════════════════════════════════════
// 6. ANIMATION_TIMING — Frame delay constant
// Binary ref: wait_for_animation @ 0x0046E287
// Formula: (frames * 50) / 3 => ~16.7ms per frame (60fps)
// ═══════════════════════════════════════════════════════════════════
export const COMBAT_FRAME_DELAY_MS = 17;

// ═══════════════════════════════════════════════════════════════════
// Preload all sounds
// ═══════════════════════════════════════════════════════════════════

// Menu loop
export const menuLoop = sfxLoad('MENULOOP');
sfxLoad('MENUOK');
sfxLoad('MENUEND');
menuLoop.loop = true;

// Gameplay sounds
sfxLoad('MOVPIECE');
sfxLoad('ENDOTURN');
sfxLoad('BLDCITY');
sfxLoad('SELL');
sfxLoad('NEWONDER');
sfxLoad('NEWGOVT');
sfxLoad('GUILLOTN');
sfxLoad('FANFARE1');
sfxLoad('SPYSOUND');
sfxLoad('CIVDISOR');
sfxLoad('POMPCIRC');
sfxLoad('AQUEDUCT');
sfxLoad('LETTER');
sfxLoad('POS1');
sfxLoad('NEG1');
sfxLoad('CRWDBUGL');
sfxLoad('NUKEXPLO');
sfxLoad('FEEDBK04');
sfxLoad('CATHEDRL');
sfxLoad('MRKTPLCE');
sfxLoad('CHEERS1');
sfxLoad('CHEERS2');
sfxLoad('CHEERS3');
sfxLoad('NEWBANK');
sfxLoad('BARRACKS');
sfxLoad('SMALLEXP');
sfxLoad('MEDEXPL');
sfxLoad('LARGEXPL');
sfxLoad('BOATSINK');
sfxLoad('JETCRASH');
sfxLoad('DIVCRASH');

// Combat attack sounds
sfxLoad('SWORDFGT');
sfxLoad('INFANTRY');
sfxLoad('CAVALRY');
sfxLoad('ELEPHANT');
sfxLoad('SWRDHORS');
sfxLoad('CATAPULT');
sfxLoad('BIGGUN');
sfxLoad('MCHNGUNS');
sfxLoad('FIRE---');
sfxLoad('AIRCOMBT');
sfxLoad('DIVEBOMB');
sfxLoad('JETBOMB');
sfxLoad('HELISHOT');
sfxLoad('NAVBTTLE');
sfxLoad('TORPEDOS');
sfxLoad('MISSILE');
sfxLoad('MEDGUN');
sfxLoad('DIESEL');
sfxLoad('ENGNSPUT');

// Additional fanfares (FANFARE2-8)
sfxLoad('FANFARE2');
sfxLoad('FANFARE3');
sfxLoad('FANFARE4');
sfxLoad('FANFARE5');
sfxLoad('FANFARE6');
sfxLoad('FANFARE7');
sfxLoad('FANFARE8');

// Drum rolls (combat animations)
sfxLoad('DRUMAL');
sfxLoad('DRUMAY');
sfxLoad('DRUMA0');
sfxLoad('DRUMAN');
sfxLoad('DRUMBL');
sfxLoad('DRUMBY');
sfxLoad('DRUMB0');
sfxLoad('DRUMBN');
sfxLoad('DRUMCL');
sfxLoad('DRUMCY');
sfxLoad('DRUMC0');
sfxLoad('DRUMCN');

// Additional sounds from reference
sfxLoad('STKMARKT');
sfxLoad('BLDSPCSH');
sfxLoad('FEEDBK03');
sfxLoad('JETSPUTR');
sfxLoad('JETCOMBT');

// Movement event sounds (binary ref: move_unit @ FUN_0059062c)
// Corrected to actual MGE Sound/ filenames
sfxLoad('FEEDBK03');
sfxLoad('FEEDBK04');
sfxLoad('TORPEDOS');   // submarine attack
sfxLoad('INFANTRY');   // rifle/infantry attack
sfxLoad('HELISHOT');   // helicopter
sfxLoad('JETCOMBT');   // jet fighter
sfxLoad('DIESEL');     // tank/motor
sfxLoad('DIVEBOMB');   // propeller airplane

// ═══════════════════════════════════════════════════════════════════
// 5. UNIT_ATK_SFX — Unit type → attack sound name
// Binary ref: sound_editor_populate_slots @ 0x0058AFB6
// ═══════════════════════════════════════════════════════════════════
// UNIT_ATK_SFX — Simplified per-unit-type attack sound (fallback when full dispatch unavailable)
// Derived from binary FUN_00580341 ground combat switch (lines 648-675).
// All sound names use the authoritative mapping from civ2.exe string table at 0x0062AF70.
// For accurate dispatch including domain/era/range checks, use getCombatAttackSound().
export const UNIT_ATK_SFX = [
  null,       null,       'SWORDFGT','SWORDFGT','SWORDFGT','SWORDFGT', // 0-5: Settlers,Engineers,Warriors,Phalanx,Archers,Legion → default
  'SWORDFGT','INFANTRY','MCHNGUNS','INFANTRY','INFANTRY','INFANTRY',   // 6-11: Pikemen,Musketeers,Fanatics,Partisans,Alpine,Riflemen
  'MCHNGUNS','MCHNGUNS','MCHNGUNS','SWRDHORS','SWRDHORS','ELEPHANT',   // 12-17: Marines,Paratroopers,Mech.Inf,Horsemen,Chariot,Elephant
  'SWRDHORS','SWRDHORS','CAVALRY', 'CAVALRY', 'SWORDFGT','CATAPULT',   // 18-23: Crusaders,Knights,Dragoons,Cavalry,Armor,Catapult
  'FIRE---', 'FIRE---', 'FIRE---', 'AIRCOMBT','DIVEBOMB','HELISHOT',   // 24-29: Cannon,Artillery,Howitzer,Fighter,Bomber,Helicopter
  'AIRCOMBT','JETBOMB', 'CATAPULT', 'CATAPULT','CATAPULT','FIRE---',    // 30-35: StlthFtr,StlthBmb,Trireme,Caravel,Galleon,Frigate
  'FIRE---', 'FIRE---', 'FIRE---', 'FIRE---', 'FIRE---', 'FIRE---',  // 36-41: Ironclad,Destroyer,Cruiser,AEGIS,Battleship,Submarine
  null,       null,      'MISSILE', 'MISSILE', 'SPYSOUND','SPYSOUND',  // 42-47: Carrier,Transport,CruiseMsl,NuclearMsl,Diplomat,Spy
  null,       null,      null,      null,                              // 48-51: Caravan,Freight,Explorer,ExtraLand
];

// Unit type → death sound
const UNIT_DOMAIN_IMPORTED = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   // 0-14 ground
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             // 15-26 ground
  1, 1, 1, 1, 1,                                     // 27-31 air
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,               // 32-43 sea
  1, 1,                                               // 44-45 air (missiles)
  0, 0, 0, 0, 0, 0,                                   // 46-51 ground
];

export function getDeathSfx(unitType) {
  const domain = UNIT_DOMAIN_IMPORTED[unitType] ?? 0;
  if (domain === 2) return 'BOATSINK';
  if (domain === 1) return unitType === 29 ? 'DIVCRASH' : 'JETCRASH';
  if (unitType >= 22 && unitType <= 26) return 'LARGEXPL';
  if (unitType >= 10 && unitType <= 14) return 'MEDEXPL';
  return 'SMALLEXP';
}

// ═══════════════════════════════════════════════════════════════════
// MOVE_UNIT_SOUNDS — Sound IDs for unit movement events
// Binary ref: move_unit @ FUN_0059062c (thunk_FUN_0046e020 calls)
// ═══════════════════════════════════════════════════════════════════
export const MOVE_UNIT_SOUNDS = {
  BLOCKED:       'MOVPIECE',  // 0x69 — can't move / ZOC blocked / non-combat blocked
  ALLIED_REPAIR: 'EXTRA7',    // 0x68 — allied unit repair in allied city
  UNIT_EXPELLED: 'DRUMC0',    // 0x5d — unit captured/expelled from tile
  AIR_LANDING:   'SMALLEXP',  // 0x1a — air unit landing
  AIR_CRASH:     'NUKEXPLO',  // 0x4e — air unit crash / out of fuel
  TRIREME_LOST:  'MEDGUN',    // 0x09 — trireme lost at sea
  UNIT_MOVE:     'EXTRA2',    // 0x63 — standard unit movement sound
};

// ═══════════════════════════════════════════════════════════════════
// MOVE_UNIT_DELAYS — Post-movement animation delays (ticks)
// Binary ref: move_unit @ FUN_0059062c (thunk_FUN_0046e287 calls)
// Formula: ticks * (50/3) ≈ 16.7ms per tick
// ═══════════════════════════════════════════════════════════════════
export const MOVE_UNIT_DELAYS = {
  POST_EXPEL:       10,    // after expelling/capturing unit
  POST_DIPLOMACY:   0x14,  // 20 ticks after diplomat enters foreign city
  POST_MOVE_VISIBLE: 10,   // after visible movement (no animation flags)
  POST_MOVE_FAST:   0x0f,  // 15 ticks after visible movement (with animation flags)
};

// ═══════════════════════════════════════════════════════════════════
// COMBAT_ATTACK_SOUNDS — Full dispatch by unit type/domain/era
// Binary ref: FUN_00580341 @ block_00580000.c lines 584-679
// ═══════════════════════════════════════════════════════════════════

/**
 * Get the combat attack sound for an attacker unit type.
 * Faithful port of FUN_00580341 lines 581-679 (block_00580000.c).
 *
 * Priority chain:
 *   1. Scenario unit types 51-61 → direct sound mapping
 *   2. Missile flag (flags_hi & 0x10) → CIVDISOR for non-nuclear
 *   3. Air domain → air-vs-air / bombing / no-bombard branching
 *   4. Sea domain → stealth flag check
 *   5. Ground → type-specific switch
 *
 * @param {number} atkType - attacker unit type index
 * @param {number} atkDomain - attacker domain (0=land, 1=air, 2=sea)
 * @param {number} defDomain - defender domain (0=land, 1=air, 2=sea)
 * @param {boolean} atkHasMissileFlag - attacker flags_hi & 0x10
 * @param {number} atkAttack - attacker attack value (for nuclear check)
 * @param {number} atkRange - attacker range value (for bombard check)
 * @param {boolean} atkHasCarryAirFlag - attacker flags_lo & 0x08
 * @returns {{ sound: string|null, animDelay: number, navalAnim: number }}
 */
export function getCombatAttackSound(atkType, atkDomain, defDomain, atkHasMissileFlag, atkAttack, atkRange, atkHasCarryAirFlag) {
  let sound = null;
  let animDelay = 0;
  let navalAnim = 0; // local_ac in binary

  // All sound IDs below are looked up in SOUND_ID_MAP (authoritative, extracted
  // from civ2.exe string table at 0x0062AF70).

  // Priority 1: Scenario/extra unit types 51-61 (0x33-0x3D) — C lines 584-616
  //   type 0x33-0x35 → sound IDs 0x65-0x67 (CUSTOM1-3)
  //   type 0x36-0x3D → sound IDs 0x7D-0x84 (EXTRA1-8)
  const scenarioMap = {
    0x33: 0x65, 0x34: 0x66, 0x35: 0x67,
    0x36: 0x7D, 0x37: 0x7E, 0x38: 0x7F, 0x39: 0x80,
    0x3A: 0x81, 0x3B: 0x82, 0x3C: 0x83, 0x3D: 0x84,
  };
  if (scenarioMap[atkType] != null) {
    return { sound: SOUND_ID_MAP[scenarioMap[atkType]], animDelay, navalAnim };
  }

  // Priority 2: Missile flag gate — C line 617 and 677-678
  if (atkHasMissileFlag) {
    // non-nuclear missile → sound ID 0x29 = MISSILE
    if (atkAttack < 99) sound = SOUND_ID_MAP[0x29]; // MISSILE
    return { sound, animDelay, navalAnim };
  }

  // Priority 3: Air domain — C lines 618-635
  if (atkDomain === 1) {
    if (defDomain === 1) {
      // air-vs-air: era-based
      // ancient (type < 0x1E): sound 0x00 = AIRCOMBT
      // modern: sound 0x52 = JETCOMBT
      sound = atkType < 0x1E ? SOUND_ID_MAP[0x00] : SOUND_ID_MAP[0x52];
    } else if (atkRange === 0) {
      // no bombard ability: sound 0x21 = HELISHOT (C: FUN_0046e020(0x21,1,0,0))
      sound = SOUND_ID_MAP[0x21]; // HELISHOT
    } else {
      // bombing:
      // ancient (type < 0x1E): sound 0x18 = DIVEBOMB
      // modern: sound 0x50 = JETBOMB
      sound = atkType < 0x1E ? SOUND_ID_MAP[0x18] : SOUND_ID_MAP[0x50];
    }
    return { sound, animDelay, navalAnim };
  }

  // Priority 4: Sea domain — C lines 637-646
  if (atkDomain === 2) {
    if (!atkHasCarryAirFlag) {
      // standard naval — lines 638-642 (no sound, just animation)
      navalAnim = 6;
      if (atkType === 0x28 || atkType === 0x26 || atkType === 0x27 || atkType === 0x25) {
        navalAnim = 0x2E;
      }
    } else {
      // carrier/stealth — line 645 → sound 0x4D = TORPEDOS
      sound = SOUND_ID_MAP[0x4D]; // TORPEDOS
    }
    return { sound, animDelay, navalAnim };
  }

  // Priority 5: Ground domain — C lines 648-675
  // ALL sound IDs here confirmed against the binary's string table at 0x0062AF70.
  if (atkType === 0x11) {
    // Elephant (17) → sound 0x19 = ELEPHANT
    sound = SOUND_ID_MAP[0x19];
  } else if (atkType === 0x0F || atkType === 0x10 || atkType === 0x13 || atkType === 0x12) {
    // Horsemen(15), Chariot(16), Knights(19), Crusaders(18) → sound 0x4a = SWRDHORS
    sound = SOUND_ID_MAP[0x4A];
  } else if (atkType === 0x14 || atkType === 0x15) {
    // Dragoons(20), Cavalry(21) → sound 0x0c = CAVALRY
    sound = SOUND_ID_MAP[0x0C];
  } else if (atkType === 7 || atkType === 0x0B || atkType === 0x0A || atkType === 9) {
    // Musketeers(7), Riflemen(11), Alpine(10), Partisans(9) → sound 0x22 = INFANTRY
    sound = SOUND_ID_MAP[0x22];
  } else if (atkType === 8 || atkType === 0x0D || atkType === 0x0C || atkType === 0x0E) {
    // Fanatics(8), Paratroopers(13), Marines(12), Mech.Inf(14) → sound 0x26 = MCHNGUNS
    sound = SOUND_ID_MAP[0x26];
  } else if (atkType < 0x16 || atkType > 0x1A) {
    // Default ground (Warriors, Phalanx, Archers, Legion, etc.) → sound 0x49 = SWORDFGT
    sound = SOUND_ID_MAP[0x49];
  } else if (atkType === 0x17) {
    // Catapult (23) → sound 0x0a = CATAPULT
    sound = SOUND_ID_MAP[0x0A];
  } else {
    // Cannon(24), Artillery(25), Howitzer(26) → sound 0x1c = FIRE--- + delay
    navalAnim = 0x28;
    if (atkType > 0x17) {
      sound = SOUND_ID_MAP[0x1C]; // FIRE---
      animDelay = 0x14;
    }
  }

  return { sound, animDelay, navalAnim };
}

/**
 * Get the post-combat resolution sound based on outcome and unit type.
 * Binary ref: FUN_00580341 lines 880-903 (block_00580000.c).
 *
 * IMPORTANT — binary semantics:
 *   - sound 0x23 = LARGEXPL plays only when local_ac != 0 (naval / heavy weapon
 *     combat where the attack-sound dispatch set a non-zero animation flag)
 *   - sound 0x17 = DIVCRASH plays when an AIR unit dies and is ancient (type<30)
 *   - sound 0x4F = JETCRASH plays when an AIR unit dies and is modern (type>=30)
 *   - For ordinary GROUND combat the binary plays NO post-combat resolution
 *     sound — only the attack sound is heard. This function returns null in
 *     that case.
 *
 * Previous JS implementations played JETSPUTR for every ground combat. That
 * was a port of the OLD wrong sound-ID table where 0x17 was mistakenly labelled
 * "JETSPUTR" — the corrected table (extracted from civ2.exe at 0x0062AF70)
 * has 0x17 = DIVCRASH and 0x4f = JETCRASH, and JETSPUTR is at 0x4e.
 *
 * @param {number} deadUnitType - type of the unit that was destroyed
 * @param {number} deadUnitDomain - domain of the dead unit (0=land, 1=air, 2=sea)
 * @param {boolean} navalAnimSet - true if attack dispatch set local_ac != 0
 * @returns {string|null} WAV filename to play, or null if none
 */
export function getCombatResolutionSound(deadUnitType, deadUnitDomain, navalAnimSet) {
  // Naval / heavy-weapon combat → LARGEXPL (binary line 887)
  if (navalAnimSet) return SOUND_ID_MAP[0x23]; // LARGEXPL
  // Air unit death → DIVCRASH (ancient) or JETCRASH (modern) (lines 891-902)
  if (deadUnitDomain === 1) {
    return deadUnitType < 0x1E ? SOUND_ID_MAP[0x17] : SOUND_ID_MAP[0x4f]; // DIVCRASH | JETCRASH
  }
  // Ground / sea-without-anim → no resolution sound
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// 3. CHEERS_VARIANT — Random cheers selection
// Binary ref: 0x0046E020, strcmp with "CHEERS" at 0x0062B430
// When soundId maps to "CHEERS", a random variant (1-3) is appended
// ═══════════════════════════════════════════════════════════════════
export function playRandomCheers() {
  sfx('CHEERS' + (1 + Math.floor(Math.random() * 3)));
}

// ═══════════════════════════════════════════════════════════════════
// 7. PRODUCTION_COMPLETION_SOUNDS — Building completion sounds
// Binary ref: FUN_004ec3fe @ block_004E0000.c:5024-5056
// ═══════════════════════════════════════════════════════════════════

// Building ID → sound ID mapping from binary FUN_004ec3fe:5024-5048.
// Sound IDs use the corrected table (extracted from civ2.exe at 0x0062AF70).
const PRODUCTION_BUILDING_SOUNDS = {
  2:  0x05,  // Barracks       → BARRACKS
  9:  0x04,  // Aqueduct       → AQUEDUCT
  10: 0x2f,  // Bank           → NEWBANK
  11: 0x0b,  // Cathedral      → CATHEDRL
  12: 0x37,  // University     → CHEERS (binary plays generic cheers)
  22: 0x45,  // Stock Exchange → STKMARKT
};

/**
 * Get the WAV name to play when a production item completes.
 * Binary ref: FUN_004ec3fe @ block_004E0000.c:5024-5056
 *
 * @param {'unit'|'building'|'wonder'} itemType
 * @param {number} itemId - building/wonder/unit index
 * @returns {string|null} WAV filename to play, or null for units
 */
export function getProductionSound(itemType, itemId) {
  if (itemType === 'unit') return null; // units have no completion sound

  if (itemType === 'wonder') {
    return SOUND_ID_MAP[0x30]; // NEWONDER (binary line 5055)
  }

  // Spaceship parts: building IDs 35-37 (0x23-0x25 in binary)
  if (itemType === 'building' && itemId >= 35 && itemId <= 37) {
    return SOUND_ID_MAP[0x08]; // BLDSPCSH (binary line 5051)
  }

  // Building-specific sounds (binary switch at line 5026)
  if (itemType === 'building') {
    const soundId = PRODUCTION_BUILDING_SOUNDS[itemId];
    if (soundId !== undefined) return SOUND_ID_MAP[soundId];
    return SOUND_ID_MAP[0x02]; // default: CHEERS (binary line 5031)
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════
// 9. CITY_STATUS_SOUNDS — Disorder/WLtKD/Revolution sounds
// Binary ref: handle_city_disorder_004ef578 @ block_004E0000.c:5819-5931
// ═══════════════════════════════════════════════════════════════════

/**
 * Play the sound for a city status change event.
 * @param {'civilDisorder'|'weLoveKingDay'|'revolution'} eventType
 */
export function playCityStatusSound(eventType) {
  switch (eventType) {
    case 'civilDisorder':
      sfx('CIVDISOR');   // sound ID 0x0E (civil disorder warning)
      break;
    case 'weLoveKingDay':
      sfx('POMPCIRC');   // WLtKD uses music channel (thunk_FUN_0046e571(3,0))
      break;
    case 'revolution':
      sfx('GUILLOTN');   // revolution/guillotine sound
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// 11. TURN_PROCESSING_SOUND_EVENTS — Turn event sounds
// Binary ref: FUN_00511880 calls in FUN_00487371, FUN_0048aedc,
//             FUN_00486c2e, FUN_004868fb — block_00480000.c
// ═══════════════════════════════════════════════════════════════════

/**
 * Play the sound for a turn-processing event.
 * @param {number} eventId - numeric event ID from turn processing
 */
export function playTurnEventSound(eventId) {
  switch (eventId) {
    case 3:  // GLOBAL_WARMING
      sfx('CRWDBUGL');
      break;
    case 4:  // POLLUTION_WARNING
      sfx('NEG1');
      break;
    case 6:  // SPACESHIP_ARRIVED
      sfx('FANFARE1');
      break;
    case 9:  // PLAN_RETIREMENT (year 2000)
      sfx('FANFARE1');
      break;
    case 10: // FORCE_RETIREMENT (year 2020)
      sfx('CIVDISOR');
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// 4. MUSIC_SELECTION — Background music track selection
// Binary ref: select_random_music_track @ 0x0046E320
// CD audio track selection adapted for browser (loaded music files)
// ═══════════════════════════════════════════════════════════════════

// Track counts that use "major" mode (offset 4)
const MAJOR_TRACK_COUNTS = new Set([10, 12, 18, 24]);
let lastMusicTrack = -1;

/**
 * Select a music track index, avoiding consecutive repeats.
 * @param {number} trackCount - total number of available music tracks
 * @returns {number} track index (0-based) to play, or -1 if no music
 */
export function selectMusicTrack(trackCount) {
  if (trackCount <= 1) return -1; // no music available

  let track;
  if (MAJOR_TRACK_COUNTS.has(trackCount)) {
    // Major mode: track = 4 + random(0, trackCount-3)
    // Binary: skip first 4 tracks (data + intro), pick from remaining
    const range = trackCount - 3;
    do {
      track = 4 + Math.floor(Math.random() * range);
    } while (track === lastMusicTrack && range > 1);
  } else {
    // Minor mode: track = 2 + random(0, trackCount-1)
    const range = trackCount - 1;
    do {
      track = 2 + Math.floor(Math.random() * range);
    } while (track === lastMusicTrack && range > 1);
  }

  lastMusicTrack = track;
  return track;
}

// ═══════════════════════════════════════════════════════════════════
// 2. SOUND_TRIGGERS — Event-to-sound dispatch system
// Binary ref: all call sites of thunk_FUN_0046e020 (play_sound_effect)
// ═══════════════════════════════════════════════════════════════════

/**
 * Play the sound effect for a game event.
 * Maps game events to their binary-accurate sound triggers.
 *
 * @param {string} eventType - event name
 * @param {object} [data] - event-specific data
 *   combatDrumRoll: { unitByte: number, seed: number }
 *   combatUnitDestroyed: (no data needed)
 *   combatHitShields: (no data needed)
 *   combatExplosion: (no data needed)
 *   combatVictoryFanfare: (no data needed)
 *   techDiscovered: (no data needed)
 *   cityGrowth: (no data needed)
 *   famine: (no data needed)
 *   wonderBuilt: (no data needed)
 *   unitPromotion: (no data needed)
 *   cityFounded: (no data needed)
 *   governmentChanged: (no data needed)
 *   unitFortified: (no data needed)
 *   caravanArrived: (no data needed)
 *   freightArrived: (no data needed)
 *   cityCaptured: (no data needed)
 *   nukeExplosion: (no data needed)
 *   nuclearLaunch: (no data needed)
 *   spyAction: (no data needed)
 *   letterReceived: (no data needed)
 *   endOfTurn: (no data needed)
 *   palaceBuilt: (no data needed)
 *   capitalMoved: (no data needed)
 *   manhattanProject: (no data needed)
 *   retirementScore: (no data needed)
 *   scenarioEvent: (no data needed)
 *   parleyDiplomatMeeting: { civId: number, turn: number }
 *   productionComplete: { itemType: string, itemId: number }
 *   civilDisorder: (no data needed)
 *   weLoveKingDay: (no data needed)
 *   revolution: (no data needed)
 *   turnEvent: { eventId: number }
 */
export function playSoundForEvent(eventType, data) {
  switch (eventType) {
    // -- Combat --
    case 'combatDrumRoll': {
      // Formula: ((unitByte + seed) & 7) + 0x53
      // Selects from 3 sets of 4 drum variants (A/B/C x L/Y/0/N)
      const unitByte = (data && data.unitByte) || 0;
      const seed = (data && data.seed) || 0;
      const drumIdx = ((unitByte + seed) & 7) + 0x53;
      const drumName = SOUND_ID_MAP[drumIdx];
      if (drumName) sfx(drumName);
      break;
    }
    // NOTE: combat sounds are dispatched directly in unit-ui.js
    // animateCombat() via getCombatAttackSound + getCombatResolutionSound,
    // matching binary FUN_00580341. The cases below are JS-only event hooks
    // for non-combat or out-of-band notifications.
    case 'combatHitShields':
      sfx('FANFARE7');       // 0x59 — shield hit (JS-only event, no binary equivalent)
      break;
    case 'combatUnitDestroyed':
      sfx('NEWGOVT');        // 0x11 — unit destroyed (JS-only)
      break;
    case 'combatExplosion':
      sfx('NEWBANK');        // 0x2f — explosion effect (JS-only)
      break;
    case 'combatVictoryFanfare':
      sfx('FANFARE6');       // 0x58 — city captured fanfare
      break;

    // -- Tech/Science --
    case 'techDiscovered':
      sfx('DRUMC0');         // 0x7a — technology advance discovered
      break;

    // -- City Events --
    case 'cityGrowth':
      sfx('POS1');           // 0x68 — positive feedback
      break;
    case 'famine':
      sfx('NEG1');           // 0x69 — negative feedback
      break;
    case 'wonderBuilt':
      sfx('NEWONDER');       // 0x30 — wonder completion
      break;
    case 'cityFounded':
      sfx('BLDCITY');        // 0x07 — city established by settler
      break;
    case 'cityCaptured':
      sfx('MCHNGUNS');       // 0x26 — city capture
      break;

    // -- Unit Events --
    case 'unitPromotion':
      sfx('FANFARE2');       // 0x54 — unit promotion fanfare
      break;
    case 'unitFortified':
      sfx('TORPEDOS');       // 0x4d — unit fortification/sentry
      break;

    // -- Government --
    case 'governmentChanged':
      sfx('NEWGOVT');        // 0x11 — new government adopted
      break;

    // -- Diplomacy/Trade --
    case 'caravanArrived':
      sfx('JETCRASH');       // 0x4f — caravan arrives at destination
      break;
    case 'freightArrived':
      sfx('GUILLOTN');       // 0x6f — freight arrives at destination
      break;
    case 'letterReceived':
      sfx('LETTER');         // 0x7c — diplomatic letter received
      break;
    case 'parleyDiplomatMeeting': {
      // Formula: ((turn + civId) & 7) + 0x53
      const turn = (data && data.turn) || 0;
      const civId = (data && data.civId) || 0;
      const drumIdx = ((turn + civId) & 7) + 0x53;
      const drumName = SOUND_ID_MAP[drumIdx];
      if (drumName) sfx(drumName);
      break;
    }

    // -- Nuke --
    case 'nukeExplosion':
      sfx('NUKEXPLO');       // 0x32 — nuclear detonation
      break;
    case 'nuclearLaunch':
      sfx('NUKEXPLO');       // 0x32 — nuclear missile launch
      break;

    // -- Spy --
    case 'spyAction':
      sfx('SPYSOUND');       // 0x44 — spy/diplomat action
      break;

    // -- Turn --
    case 'endOfTurn':
      sfx('ENDOTURN');       // 0x64 — end of turn
      break;

    // -- Production --
    case 'productionComplete': {
      const snd = getProductionSound(
        data && data.itemType, data && data.itemId
      );
      if (snd) sfx(snd);
      break;
    }

    // -- Palace/Capital (10. MOVE_CAPITAL_SOUND) --
    case 'palaceBuilt':
    case 'capitalMoved':
      sfx('FANFARE1');       // 0x53 — palace completion / capital relocation
      break;

    // -- Manhattan Project (8. MANHATTAN_PROJECT_SOUND) --
    case 'manhattanProject':
      sfx('NEWBANK');        // 0x2f — Manhattan Project completion broadcast (FUN_0046e020(0x23,...) → LARGEXPL in binary, but this is the JS event hook)
      break;

    // -- City Status (9. CITY_STATUS_SOUNDS) --
    case 'civilDisorder':
      playCityStatusSound('civilDisorder');
      break;
    case 'weLoveKingDay':
      playCityStatusSound('weLoveKingDay');
      break;
    case 'revolution':
      playCityStatusSound('revolution');
      break;

    // -- Turn Events (11. TURN_PROCESSING_SOUND_EVENTS) --
    case 'turnEvent':
      if (data && data.eventId != null) playTurnEventSound(data.eventId);
      break;

    // -- Score/Retirement --
    case 'retirementScore':
      sfx(SOUND_ID_MAP[0x3f]); // RIFLE — retirement/score screen
      break;

    // -- Scenario --
    case 'scenarioEvent':
      sfx('FANFARE1');       // 0x53 — generic scenario event trigger
      break;

    // -- Spaceship --
    case 'spaceshipComponent':
      sfx('MOVPIECE');       // 0x69 — spaceship component event
      break;

    // -- Cheers --
    case 'cheers':
      playRandomCheers();
      break;
  }
}
