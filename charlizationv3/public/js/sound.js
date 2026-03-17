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
// Binary ref: string table at 0x0062AF70, 9-byte entries (8-char + NUL)
// Max sound ID: 0x84 (132), enforced at 0x0046E020
// ═══════════════════════════════════════════════════════════════════
export const SOUND_ID_MAP = {
  // -- Combat sounds (0x00..0x1D) --
  0x00: 'AIRCOMBT',  0x01: 'SWORDFGT', 0x02: 'SWRDHORS', 0x03: 'RIFLE',
  0x04: 'INFANTRY',  0x05: 'MCHNGUNS', 0x06: 'CAVALRY',  0x07: 'CATAPULT',
  0x08: 'BIGGUN',    0x09: 'MEDGUN',   0x0A: 'TANKMOTR', 0x0B: 'NAVBTTLE',
  0x0C: 'SUBMRINE',  0x0D: 'TORPEDOS', 0x0E: 'BOATSINK', 0x0F: 'HELICPTR',
  0x10: 'HELISHOT',  0x11: 'DIVEBOMB', 0x12: 'DIVCRASH', 0x13: 'JETCOMBT',
  0x14: 'JETPLANE',  0x15: 'JETBOMB',  0x16: 'JETCRASH', 0x17: 'JETSPUTR',
  0x18: 'AIRPLANE',  0x19: 'MISSILE',  0x1A: 'SMALLEXP', 0x1B: 'MEDEXPL',
  0x1C: 'LARGEXPL',  0x1D: 'NUKEXPLO',

  // -- City/Building sounds (0x1E..0x29) --
  0x1E: 'BLDCITY',   0x1F: 'AQUEDUCT', 0x20: 'BARRACKS', 0x21: 'CATHEDRL',
  0x22: 'MRKTPLCE',  0x23: 'NEWBANK',  0x24: 'STKMARKT', 0x25: 'NEWONDER',
  0x26: 'BLDSPCSH',  0x27: 'NEWGOVT',  0x28: 'REVOLT',   0x29: 'CIVDISOR',

  // -- Government/Event sounds (0x2A..0x32) --
  0x2A: 'CHEERS',    0x2B: 'CRWDBUGL', 0x2C: 'GUILLOTN', 0x2D: 'SPYSOUND',
  0x2E: 'MOVPIECE',  0x2F: 'ENDOTURN', 0x30: 'MENUOK',   0x31: 'MENULOOP',
  0x32: 'MENUEND',

  // -- UI/Misc sounds (0x33..0x3A) --
  0x33: 'LETTER',    0x34: 'DIESEL',   0x35: 'ENGNSPUT', 0x36: 'FIRE---',
  0x37: 'ELEPHANT',  0x38: 'CHEERS1',  0x39: 'CHEERS2',  0x3A: 'CHEERS3',

  // -- Undocumented slots (0x3B..0x3D) --
  // WAV files exist on disk but have no confirmed table entry.
  // Likely candidates based on address spacing:
  0x3B: 'NEG1',      // negative diplomacy response
  0x3C: 'POS1',      // positive diplomacy response
  0x3D: 'POMPCIRC',  // pomp & circumstance fanfare

  // -- Fanfare sounds (0x3E..0x45) --
  0x3E: 'FANFARE1',  0x3F: 'FANFARE2', 0x40: 'FANFARE3', 0x41: 'FANFARE4',
  0x42: 'FANFARE5',  0x43: 'FANFARE6', 0x44: 'FANFARE7', 0x45: 'FANFARE8',

  // -- Feedback sounds (0x46..0x4D) --
  0x46: 'FEEDBK01',  0x47: 'FEEDBK02', 0x48: 'FEEDBK03', 0x49: 'FEEDBK04',
  0x4A: 'FEEDBK05',  0x4B: 'FEEDBK06', 0x4C: 'FEEDBK07', 0x4D: 'FEEDBK08',

  // -- Duplicate/alternate refs (0x4E..0x52) --
  0x4E: 'NUKEXPLO',  0x4F: 'JETSPUTR', 0x50: 'AIRPLANE', 0x51: 'NAVBTTLE',
  0x52: 'BOATSINK',

  // -- Drum rolls (0x53..0x5E, combat animations) --
  // 3 sets (A/B/C) x 4 variants (L/Y/0/N)
  0x53: 'DRUMAL',    0x54: 'DRUMAY',   0x55: 'DRUMA0',   0x56: 'DRUMAN',
  0x57: 'DRUMBL',    0x58: 'DRUMBY',   0x59: 'DRUMB0',   0x5A: 'DRUMBN',
  0x5B: 'DRUMCL',    0x5C: 'DRUMCY',   0x5D: 'DRUMC0',   0x5E: 'DRUMCN',

  // -- Custom/Extra sounds (0x5F..0x68) --
  0x5F: 'CUSTOM1',   0x60: 'CUSTOM2',  0x61: 'CUSTOM3',
  0x62: 'EXTRA1',    0x63: 'EXTRA2',   0x64: 'EXTRA3',
  0x65: 'EXTRA4',    0x66: 'EXTRA5',   0x67: 'EXTRA6',   0x68: 'EXTRA7',

  // -- Special system sounds (re-mapped duplicates 0x69..0x6F) --
  0x69: 'MOVPIECE',  0x6A: 'MENUOK',   0x6B: 'MENULOOP', 0x6C: 'MENUEND',
  0x6D: 'SELL',      0x6E: 'LETTER',   0x6F: 'ENDOTURN',

  // -- Missile unit sounds (0x65..0x67 overloaded, 0x7D..0x84) --
  // 0x65-0x67 are EXTRA4-6 in base table, MISSILE1-3 when used by missile units
  // 0x7D: 'NUKE1', 0x7E: 'NUKE2', 0x7F: 'NUKE3', 0x80: 'NUKE4',
  // 0x81: 'NUKE5', 0x82: 'NUKE6', 0x83: 'NUKE7', 0x84: 'NUKE8',
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
sfxLoad('FEEDBK05');
sfxLoad('FEEDBK08');
sfxLoad('SUBMARINE');
sfxLoad('RIFLE');
sfxLoad('HELICPTR');
sfxLoad('JETPLANE');
sfxLoad('TANKMOTR');
sfxLoad('AIRPLANE');

// ═══════════════════════════════════════════════════════════════════
// 5. UNIT_ATK_SFX — Unit type → attack sound name
// Binary ref: sound_editor_populate_slots @ 0x0058AFB6
// ═══════════════════════════════════════════════════════════════════
export const UNIT_ATK_SFX = [
  null,       null,       'SWORDFGT','SWORDFGT','MEDGUN',  'SWORDFGT', // 0-5
  'SWORDFGT','SWORDFGT','SWORDFGT','SWORDFGT','INFANTRY','SWORDFGT', // 6-11
  'INFANTRY','INFANTRY','INFANTRY','CAVALRY', 'SWRDHORS','ELEPHANT', // 12-17
  'SWRDHORS','CAVALRY', 'CAVALRY', 'CAVALRY', 'MCHNGUNS','CATAPULT', // 18-23
  'CATAPULT','CATAPULT','BIGGUN',  'AIRCOMBT','DIVEBOMB','HELISHOT', // 24-29
  'AIRCOMBT','DIVEBOMB','ENGNSPUT','ENGNSPUT','ENGNSPUT','FIRE---',  // 30-35
  'NAVBTTLE','NAVBTTLE','BIGGUN',  'NAVBTTLE','BIGGUN',  'TORPEDOS', // 36-41
  'DIESEL',  'DIESEL',  'JETBOMB', 'MISSILE', 'SPYSOUND','SPYSOUND', // 42-47
  null,       null,       'MEDGUN',  null,                             // 48-51
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
 * Implements the binary's priority-based dispatch:
 *   1. Unit-specific (missile/nuke types)
 *   2. Domain-based (air, sea, ground) with era branching
 *
 * @param {number} unitType - attacker unit type index
 * @param {number} [defenderType] - defender unit type (for domain checks)
 * @returns {string|null} WAV filename to play
 */
export function getCombatAttackSound(unitType, defenderType) {
  // Priority 1: Nuke/missile-specific sounds (unit types 0x33-0x3D)
  const missileMap = {
    0x33: 'EXTRA4',   0x34: 'EXTRA5',   0x35: 'EXTRA6',   // scenario missiles
    0x36: 'NUKE1',    0x37: 'NUKE2',    0x38: 'NUKE3',    0x39: 'NUKE4',
    0x3A: 'NUKE5',    0x3B: 'NUKE6',    0x3C: 'NUKE7',    0x3D: 'NUKE8',
  };
  if (missileMap[unitType]) return missileMap[unitType];

  // Fall back to UNIT_ATK_SFX table (which covers the common dispatch)
  return UNIT_ATK_SFX[unitType] || null;
}

/**
 * Get the post-combat resolution sound based on outcome and unit era.
 * Binary ref: FUN_00580341 lines 880-903
 *
 * @param {number} deadUnitType - type of the unit that was destroyed
 * @param {boolean} wasNavalOrAir - true if naval/air combat (local_ac != 0)
 * @returns {string} WAV filename
 */
export function getCombatResolutionSound(deadUnitType, wasNavalOrAir) {
  if (wasNavalOrAir) return 'NEWBANK';      // 0x23 — naval/aircraft explosion
  if (deadUnitType < 0x1E) return 'JETSPUTR'; // 0x17 — ancient unit death
  return 'JETSPUTR';                          // 0x4F — modern unit death (same WAV)
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

// Building ID → sound ID mapping from binary switch statement
const PRODUCTION_BUILDING_SOUNDS = {
  2:  0x20,  // Barracks   → BARRACKS
  9:  0x1F,  // Aqueduct   → AQUEDUCT
  10: 0x2F,  // Bank       → ENDOTURN (sound ID 0x2F)
  11: 0x21,  // Cathedral  → CATHEDRL
  12: 0x37,  // University → ELEPHANT (sound ID 0x37)
  22: 0x45,  // Stock Exch → FANFARE8
};

/**
 * Get the WAV name to play when a production item completes.
 * @param {'unit'|'building'|'wonder'} itemType
 * @param {number} itemId - building/wonder/unit index
 * @returns {string|null} WAV filename to play, or null for units
 */
export function getProductionSound(itemType, itemId) {
  if (itemType === 'unit') return null; // units have no special completion sound

  if (itemType === 'wonder') {
    return SOUND_ID_MAP[0x25]; // NEWONDER (wonder ID 0x25 = NEWONDER)
  }

  // Spaceship parts: building IDs 35-37 (0x23-0x25)
  if (itemType === 'building' && itemId >= 35 && itemId <= 37) {
    return SOUND_ID_MAP[0x08]; // BIGGUN
  }

  // Building-specific sounds
  if (itemType === 'building') {
    const soundId = PRODUCTION_BUILDING_SOUNDS[itemId];
    if (soundId !== undefined) return SOUND_ID_MAP[soundId];
    return SOUND_ID_MAP[0x02]; // default: SWRDHORS
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
    case 'combatHitShields':
      sfx('FANFARE7');       // 0x44 — shield hit, most common combat sound
      break;
    case 'combatUnitDestroyed':
      sfx('NEWGOVT');        // 0x27 — unit destroyed in combat
      break;
    case 'combatExplosion':
      sfx('NEWBANK');        // 0x23 — explosion effect
      break;
    case 'combatVictoryFanfare':
      sfx('FANFARE6');       // 0x43 — city captured in combat
      break;

    // -- Tech/Science --
    case 'techDiscovered':
      sfx('DRUMC0');         // 0x5D — technology advance discovered
      break;

    // -- City Events --
    case 'cityGrowth':
      sfx('POS1');           // positive feedback
      break;
    case 'famine':
      sfx('NEG1');           // negative feedback
      break;
    case 'wonderBuilt':
      sfx('NEWONDER');       // 0x25 — wonder completion
      break;
    case 'cityFounded':
      sfx('BLDCITY');        // 0x1E — city established by settler
      break;
    case 'cityCaptured':
      sfx('MCHNGUNS');       // 0x05 — city capture (all variants)
      break;

    // -- Unit Events --
    case 'unitPromotion':
      sfx('FANFARE2');       // 0x3F — unit promotion fanfare
      break;
    case 'unitFortified':
      sfx('TORPEDOS');       // 0x0D — unit fortification/sentry
      break;

    // -- Government --
    case 'governmentChanged':
      sfx('NEWGOVT');        // 0x27 — new government adopted
      break;

    // -- Diplomacy/Trade --
    case 'caravanArrived':
      sfx('JETCRASH');       // 0x16 — caravan arrives at destination
      break;
    case 'freightArrived':
      sfx('GUILLOTN');       // 0x2C — freight arrives at destination
      break;
    case 'letterReceived':
      sfx('LETTER');         // 0x33/0x6E — diplomatic letter received
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
      sfx('NUKEXPLO');       // 0x1D/0x4E — nuclear detonation
      break;
    case 'nuclearLaunch':
      sfx('NUKEXPLO');       // 0x4E — nuclear missile launch
      break;

    // -- Spy --
    case 'spyAction':
      sfx('SPYSOUND');       // 0x2D — spy/diplomat action
      break;

    // -- Turn --
    case 'endOfTurn':
      sfx('ENDOTURN');       // 0x2F/0x6F — end of turn
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
      sfx('FANFARE1');       // 0x3E — palace completion / capital relocation
      break;

    // -- Manhattan Project (8. MANHATTAN_PROJECT_SOUND) --
    case 'manhattanProject':
      sfx('NEWBANK');        // 0x23 — Manhattan Project completion broadcast
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
      sfx(SOUND_ID_MAP[0x03]); // RIFLE — retirement/score screen
      break;

    // -- Scenario --
    case 'scenarioEvent':
      sfx('FANFARE1');       // 0x3E — generic scenario event trigger
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
