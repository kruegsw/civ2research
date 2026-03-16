/**
 * Civ2 MGE Sound Triggers & Music — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), SMEDS32 audio engine analysis
 *
 * Sound system architecture:
 * - play_sound_effect(soundId, channel, loop, param4) @ 0x0046E020
 * - soundId indexes into AIRCOMBT string table at 0x0062AF70 (9-byte entries)
 * - Max sound ID: 0x84 (132), enforced at 0x0046E020
 * - WAV files loaded from: scenarioDir + "\\SOUND\\" or "CIV2\\SOUND\\"
 * - Extension ".WAV" appended automatically
 * - SMEDS wave engine at 0x005D6038: max 5 simultaneous sounds (DAT_0063858c)
 * - Sound enabled flag: DAT_00655aea bit 4 (0x10)
 * - CD audio enabled flag: DAT_00655aea bit 3 (0x08)
 */

// === Sound Name Table ===
// Binary ref: string table at 0x0062AF70, 9-byte entries (8-char name + NUL)
// Indexed by soundId (0x00..0x84). Names are WAV filenames without extension.
export const SOUND_NAMES = {
  // -- Combat sounds (IDs 0x00..0x29) --
  0x00: { name: 'AIRCOMBT', sourceAddr: '0x0062AF70' },
  0x01: { name: 'SWORDFGT', sourceAddr: '0x0062AF79' },
  0x02: { name: 'SWRDHORS', sourceAddr: '0x0062AF82' },
  0x03: { name: 'RIFLE',    sourceAddr: '0x0062AF8B' },
  0x04: { name: 'INFANTRY', sourceAddr: '0x0062AF94' },
  0x05: { name: 'MCHNGUNS', sourceAddr: '0x0062AF9D' },
  0x06: { name: 'CAVALRY',  sourceAddr: '0x0062AFA6' },
  0x07: { name: 'CATAPULT', sourceAddr: '0x0062AFAF' },
  0x08: { name: 'BIGGUN',   sourceAddr: '0x0062AFB8' },
  0x09: { name: 'MEDGUN',   sourceAddr: '0x0062AFC1' },
  0x0A: { name: 'TANKMOTR', sourceAddr: '0x0062AFCA' },
  0x0B: { name: 'NAVBTTLE', sourceAddr: '0x0062AFD3' },
  0x0C: { name: 'SUBMRINE', sourceAddr: '0x0062AFDC' },
  0x0D: { name: 'TORPEDOS', sourceAddr: '0x0062AFE5' },
  0x0E: { name: 'BOATSINK', sourceAddr: '0x0062AFEE' },
  0x0F: { name: 'HELICPTR', sourceAddr: '0x0062AFF7' },
  0x10: { name: 'HELISHOT', sourceAddr: '0x0062B000' },
  0x11: { name: 'DIVEBOMB', sourceAddr: '0x0062B009' },
  0x12: { name: 'DIVCRASH', sourceAddr: '0x0062B012' },
  0x13: { name: 'JETCOMBT', sourceAddr: '0x0062B01B' },
  0x14: { name: 'JETPLANE', sourceAddr: '0x0062B024' },
  0x15: { name: 'JETBOMB',  sourceAddr: '0x0062B02D' },
  0x16: { name: 'JETCRASH', sourceAddr: '0x0062B036' },
  0x17: { name: 'JETSPUTR', sourceAddr: '0x0062B03F' },
  0x18: { name: 'AIRPLANE', sourceAddr: '0x0062B048' },
  0x19: { name: 'MISSILE',  sourceAddr: '0x0062B051' },
  0x1A: { name: 'SMALLEXP', sourceAddr: '0x0062B05A' },
  0x1B: { name: 'MEDEXPL',  sourceAddr: '0x0062B063' },
  0x1C: { name: 'LARGEXPL', sourceAddr: '0x0062B06C' },
  0x1D: { name: 'NUKEXPLO', sourceAddr: '0x0062B075' },

  // -- City/Building sounds (IDs 0x1E..0x29 approx) --
  0x1E: { name: 'BLDCITY',  sourceAddr: '0x0062B07E' },
  0x1F: { name: 'AQUEDUCT', sourceAddr: '0x0062B087' },
  0x20: { name: 'BARRACKS', sourceAddr: '0x0062B090' },
  0x21: { name: 'CATHEDRL', sourceAddr: '0x0062B099' },
  0x22: { name: 'MRKTPLCE', sourceAddr: '0x0062B0A2' },
  0x23: { name: 'NEWBANK',  sourceAddr: '0x0062B0AB' },
  0x24: { name: 'STKMARKT', sourceAddr: '0x0062B0B4' },
  0x25: { name: 'NEWONDER', sourceAddr: '0x0062B0BD' },
  0x26: { name: 'BLDSPCSH', sourceAddr: '0x0062B0C6' },
  0x27: { name: 'NEWGOVT',  sourceAddr: '0x0062B0CF' },
  0x28: { name: 'REVOLT',   sourceAddr: '0x0062B0D8' },
  0x29: { name: 'CIVDISOR', sourceAddr: '0x0062B0E1' },

  // -- Government/Event sounds (IDs 0x2A..0x32) --
  0x2A: { name: 'CHEERS',   sourceAddr: '0x0062B0EA' },  // Special: has random variants (CHEERS1/2/3)
  0x2B: { name: 'CRWDBUGL', sourceAddr: '0x0062B0F3' },
  0x2C: { name: 'GUILLOTN', sourceAddr: '0x0062B0FC' },
  0x2D: { name: 'SPYSOUND', sourceAddr: '0x0062B105' },
  0x2E: { name: 'MOVPIECE', sourceAddr: '0x0062B10E' },
  0x2F: { name: 'ENDOTURN', sourceAddr: '0x0062B117' },
  0x30: { name: 'MENUOK',   sourceAddr: '0x0062B120' },
  0x31: { name: 'MENULOOP', sourceAddr: '0x0062B129' },
  0x32: { name: 'MENUEND',  sourceAddr: '0x0062B132' },

  // -- UI/Misc sounds (IDs 0x33..0x3D) --
  0x33: { name: 'LETTER',   sourceAddr: '0x0062B13B' },
  0x34: { name: 'DIESEL',   sourceAddr: '0x0062B144' },
  0x35: { name: 'ENGNSPUT', sourceAddr: '0x0062B14D' },
  0x36: { name: 'FIRE---',  sourceAddr: '0x0062B156' },
  0x37: { name: 'ELEPHANT', sourceAddr: '0x0062B15F' },
  0x38: { name: 'CHEERS1',  sourceAddr: '0x0062B168' },
  0x39: { name: 'CHEERS2',  sourceAddr: '0x0062B171' },
  0x3A: { name: 'CHEERS3',  sourceAddr: '0x0062B17A' },

  // -- Fanfare sounds (IDs 0x3E..0x52) --
  0x3E: { name: 'FANFARE1', sourceAddr: '0x0062B1A4' },
  0x3F: { name: 'FANFARE2', sourceAddr: '0x0062B1AD' },
  0x40: { name: 'FANFARE3', sourceAddr: '0x0062B1B6' },
  0x41: { name: 'FANFARE4', sourceAddr: '0x0062B1BF' },
  0x42: { name: 'FANFARE5', sourceAddr: '0x0062B1C8' },
  0x43: { name: 'FANFARE6', sourceAddr: '0x0062B1D1' },
  0x44: { name: 'FANFARE7', sourceAddr: '0x0062B1DA' },
  0x45: { name: 'FANFARE8', sourceAddr: '0x0062B1E3' },

  // -- Feedback sounds (IDs 0x46..0x4D) --
  0x46: { name: 'FEEDBK01', sourceAddr: '0x0062B1EC' },
  0x47: { name: 'FEEDBK02', sourceAddr: '0x0062B1F5' },
  0x48: { name: 'FEEDBK03', sourceAddr: '0x0062B1FE' },
  0x49: { name: 'FEEDBK04', sourceAddr: '0x0062B207' },
  0x4A: { name: 'FEEDBK05', sourceAddr: '0x0062B210' },
  0x4B: { name: 'FEEDBK06', sourceAddr: '0x0062B219' },
  0x4C: { name: 'FEEDBK07', sourceAddr: '0x0062B222' },
  0x4D: { name: 'FEEDBK08', sourceAddr: '0x0062B22B' },

  // -- Misc engine/movement sounds --
  0x4E: { name: 'NUKEXPLO', sourceAddr: '0x0062B234' },  // alternate nuke ref
  0x4F: { name: 'JETSPUTR', sourceAddr: '0x0062B23D' },  // alternate jet sputter
  0x50: { name: 'AIRPLANE', sourceAddr: '0x0062B246' },  // alternate airplane
  0x51: { name: 'NAVBTTLE', sourceAddr: '0x0062B24F' },  // alternate naval
  0x52: { name: 'BOATSINK', sourceAddr: '0x0062B258' },  // alternate boat sink

  // -- Drum rolls (IDs 0x53..0x5E, used for combat animations) --
  0x53: { name: 'DRUMAL',   sourceAddr: '0x0062B261' },
  0x54: { name: 'DRUMAY',   sourceAddr: '0x0062B26A' },
  0x55: { name: 'DRUMA0',   sourceAddr: '0x0062B273' },
  0x56: { name: 'DRUMAN',   sourceAddr: '0x0062B27C' },
  0x57: { name: 'DRUMBL',   sourceAddr: '0x0062B285' },
  0x58: { name: 'DRUMBY',   sourceAddr: '0x0062B28E' },
  0x59: { name: 'DRUMB0',   sourceAddr: '0x0062B297' },
  0x5A: { name: 'DRUMBN',   sourceAddr: '0x0062B2A0' },
  0x5B: { name: 'DRUMCL',   sourceAddr: '0x0062B2A9' },
  0x5C: { name: 'DRUMCY',   sourceAddr: '0x0062B2B2' },
  0x5D: { name: 'DRUMC0',   sourceAddr: '0x0062B2BB' },
  0x5E: { name: 'DRUMCN',   sourceAddr: '0x0062B2C4' },

  // -- Custom/Extra sounds (IDs 0x5F..0x6E) --
  0x5F: { name: 'CUSTOM1',  sourceAddr: '0x0062B2CD' },
  0x60: { name: 'CUSTOM2',  sourceAddr: '0x0062B2D6' },
  0x61: { name: 'CUSTOM3',  sourceAddr: '0x0062B2DF' },
  0x62: { name: 'EXTRA1',   sourceAddr: '0x0062B2E8' },
  0x63: { name: 'EXTRA2',   sourceAddr: '0x0062B2F1' },
  0x64: { name: 'EXTRA3',   sourceAddr: '0x0062B2FA' },
  0x65: { name: 'EXTRA4',   sourceAddr: '0x0062B303' },  // also overloaded as MISSILE1
  0x66: { name: 'EXTRA5',   sourceAddr: '0x0062B30C' },  // also overloaded as MISSILE2
  0x67: { name: 'EXTRA6',   sourceAddr: '0x0062B315' },  // also overloaded as MISSILE3
  0x68: { name: 'EXTRA7',   sourceAddr: '0x0062B31E' },  // used for spaceship + allied repair

  // -- Special system sounds --
  0x69: { name: 'MOVPIECE', sourceAddr: '(dup)' },       // unit movement (re-mapped)
  0x6A: { name: 'MENUOK',   sourceAddr: '(dup)' },       // generic UI confirm
  0x6B: { name: 'MENULOOP', sourceAddr: '(dup)' },       // menu background music loop
  0x6C: { name: 'MENUEND',  sourceAddr: '(dup)' },       // menu end sound
  0x6E: { name: 'LETTER',   sourceAddr: '(dup)' },       // notification letter
  0x6F: { name: 'ENDOTURN', sourceAddr: '(dup)' },       // end of turn notification

  // -- Missile unit sounds (IDs 0x65..0x84) --
  // These map to specific missile/nuke unit types in the sound editor
  0x65: { name: 'MISSILE1', sourceAddr: '(computed)' },   // Cruise Missile (type 0x33)
  0x66: { name: 'MISSILE2', sourceAddr: '(computed)' },   // type 0x34
  0x67: { name: 'MISSILE3', sourceAddr: '(computed)' },   // type 0x35
  0x7D: { name: 'NUKE1',    sourceAddr: '(computed)' },   // type 0x36
  0x7E: { name: 'NUKE2',    sourceAddr: '(computed)' },   // type 0x37
  0x7F: { name: 'NUKE3',    sourceAddr: '(computed)' },   // type 0x38
  0x80: { name: 'NUKE4',    sourceAddr: '(computed)' },   // type 0x39
  0x81: { name: 'NUKE5',    sourceAddr: '(computed)' },   // type 0x3A
  0x82: { name: 'NUKE6',    sourceAddr: '(computed)' },   // type 0x3B
  0x83: { name: 'NUKE7',    sourceAddr: '(computed)' },   // type 0x3C
  0x84: { name: 'NUKE8',    sourceAddr: '(computed)' },   // type 0x3D
};

// === Sound Effect Triggers ===
// Binary ref: all call sites of thunk_FUN_0046e020 (play_sound_effect)
// Parameters: (soundId, channel, loop, param4)
//   channel 0 = background/ambient (SND_NOSTOP), 1 = foreground, 99 = sndPlaySoundA direct
//   loop != 0 = SND_LOOP flag set
//   Negative soundId = stop sound with tag abs(soundId)
export const SOUND_TRIGGERS = {
  // -- Combat --
  combatDrumRoll: {
    soundId: '0x53-0x5E',
    wav: 'DRUMxx.WAV',
    condition: 'Combat animation: drum roll selected from 3 sets of 4 variants (A/B/C × L/Y/0/N). Formula: ((unitByte + DAT_006d1168) & 7) + 0x53',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:1849, 0x004B0000:3879',
  },
  combatHitShields: {
    soundId: 0x44,
    wav: 'FANFARE7.WAV',
    condition: 'Combat round: defender/attacker loses HP (shield hit). Most common combat sound.',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:950-1006, 0x004C0000:2281-3047',
  },
  combatUnitDestroyed: {
    soundId: 0x27,
    wav: 'NEWGOVT.WAV',
    condition: 'Unit destroyed in combat (attacker or defender killed)',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:963-987, 0x004C0000:2769',
  },
  combatExplosion: {
    soundId: 0x23,
    wav: 'NEWBANK.WAV',
    condition: 'Explosion effect in combat or city event',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:876, 0x00580000:887, 0x004E0000:4969',
  },
  combatVictoryFanfare: {
    soundId: 0x43,
    wav: 'FANFARE6.WAV',
    condition: 'City captured in combat',
    channel: 1, loop: false,
    sourceAddr: '0x004C0000:3128',
  },

  // -- Unit Movement --
  unitMoveGround: {
    soundId: '0x16 or 0x2A',
    wav: 'JETCRASH.WAV or CHEERS.WAV',
    condition: 'Ground unit movement. soundId = (unit.domain==0) ? 0x16 : 0x2A. If unit has no moves, adds 0x14',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:594-598, 0x00440000:271-373',
    note: 'Expression: (-(piVar1[5] == 0) & 0x14U) + 0x16 — if unit has 0 moves left, sound offset is +0x14',
  },
  unitMoveNaval: {
    soundId: 0x05,
    wav: 'MCHNGUNS.WAV',
    condition: 'Naval unit movement (sailing sound)',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:650-662, 0x00570000:4864',
  },

  // -- Unit Type Combat Sounds (from sound editor populate_slots @ 0x0058AFB6) --
  combatSwordUnit: {
    soundId: 0x01,
    wav: 'SWORDFGT.WAV',
    condition: 'Ancient melee: Warriors, Phalanx, Legion, Pikemen, Musketeers',
    channel: 1, loop: false,
    sourceAddr: '0x0058AFB6 (sound_editor_populate_slots)',
  },
  combatRifleUnit: {
    soundId: 0x03,
    wav: 'RIFLE.WAV',
    condition: 'Rifle-era combat: Riflemen, Fanatics',
    channel: 1, loop: false,
    sourceAddr: '0x0058AFB6',
  },
  combatSeaAncient: {
    soundId: 0x00,
    wav: 'AIRCOMBT.WAV',
    condition: 'Sea vs sea combat, ancient era units (trireme)',
    channel: 0, loop: false,
    sourceAddr: '0x00580000:621',
  },
  combatSeaModern: {
    soundId: 0x52,
    wav: 'BOATSINK.WAV (dup)',
    condition: 'Sea vs sea combat, modern era units',
    channel: 0, loop: false,
    sourceAddr: '0x00580000:624',
  },
  combatSeaBombard: {
    soundId: 0x18,
    wav: 'AIRPLANE.WAV',
    condition: 'Sea unit bombarding land target, ancient era',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:631',
  },
  combatSeaBombardModern: {
    soundId: 0x50,
    wav: 'AIRPLANE.WAV (dup)',
    condition: 'Sea unit bombarding land target, modern era',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:634',
  },
  combatNoBombard: {
    soundId: 0x21,
    wav: 'CATHEDRL.WAV',
    condition: 'Sea unit with no bombard capability',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:628',
  },
  combatStealth: {
    soundId: 0x4D,
    wav: 'FEEDBK08.WAV',
    condition: 'Air unit with stealth flag',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:645',
  },
  combatMissileUnit: {
    soundId: 0x19,
    wav: 'MISSILE.WAV',
    condition: 'Missile unit type 0x11 (Cruise Missile)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:649',
  },
  combatHelicopterUnit: {
    soundId: 0x4A,
    wav: 'FEEDBK05.WAV',
    condition: 'Helicopter-type units (types 0xF,0x10,0x13,0x12)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:652',
  },
  combatSubUnit: {
    soundId: 0x0C,
    wav: 'SUBMRINE.WAV',
    condition: 'Submarine-type units (types 0x14,0x15)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:655',
  },
  combatArmorUnit: {
    soundId: 0x22,
    wav: 'MRKTPLCE.WAV',
    condition: 'Armor/mech units (types 7,0xB,0xA,9)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:658',
  },
  combatArtilleryUnit: {
    soundId: 0x26,
    wav: 'BLDSPCSH.WAV',
    condition: 'Artillery-type units (types 8,0xD,0xC,0xE)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:661',
  },
  combatCavalryUnit: {
    soundId: 0x49,
    wav: 'FEEDBK04.WAV',
    condition: 'Default combat sound for unclassified ground units',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:664',
  },
  combatTankUnit: {
    soundId: 0x0A,
    wav: 'TANKMOTR.WAV',
    condition: 'Tank-era cavalry units (type 0x17)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:667',
  },
  combatLargeExplosion: {
    soundId: 0x1C,
    wav: 'LARGEXPL.WAV',
    condition: 'Large explosion for heavy units (types > 0x17)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:672',
  },
  combatRangedBombard: {
    soundId: 0x29,
    wav: 'CIVDISOR.WAV',
    condition: 'Ranged bombardment, range < 99',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:678',
  },

  // -- City Events --
  cityProduction: {
    soundId: 0x30,
    wav: 'MENUOK.WAV',
    condition: 'City production complete (building, unit, or wonder finished)',
    channel: 0, loop: false,
    sourceAddr: '0x00480000:3449-4051, 0x005A0000:3392-3837',
  },
  cityPopulationGrowth: {
    soundId: 0x23,
    wav: 'NEWBANK.WAV',
    condition: 'City population increase (growth event)',
    channel: 1, loop: false,
    sourceAddr: '0x004E0000:4969',
  },
  cityProductionItem: {
    soundId: 'variable',
    wav: 'variable',
    condition: 'Production complete plays the item-specific sound from RULES.TXT',
    channel: 1, loop: false,
    sourceAddr: '0x004E0000:5048',
  },
  cityImprovementBuilt: {
    soundId: 0x08,
    wav: 'BIGGUN.WAV',
    condition: 'Improvement/building constructed',
    channel: 1, loop: false,
    sourceAddr: '0x004E0000:5051',
  },
  wonderBuilt: {
    soundId: 0x30,
    wav: 'MENUOK.WAV',
    condition: 'Wonder production complete notification',
    channel: 1, loop: false,
    sourceAddr: '0x004E0000:5055',
  },
  unitBoatSink: {
    soundId: 0x0E,
    wav: 'BOATSINK.WAV',
    condition: 'Naval unit sunk/destroyed',
    channel: 1, loop: false,
    sourceAddr: '0x004E0000:5833',
  },

  // -- Tech/Science --
  techDiscovered: {
    soundId: 0x5D,
    wav: 'DRUMC0.WAV',
    condition: 'Technology advance discovered',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:1010-1018, 0x00590000:447-526',
  },

  // -- Spaceship --
  spaceshipEvent: {
    soundId: 0x69,
    wav: 'MOVPIECE.WAV (dup)',
    condition: 'Spaceship component added, dialog opened, or launch',
    channel: 0, loop: false,
    sourceAddr: '0x00590000:200-641, 0x00500000:2640-2670',
  },
  spaceshipComponentBuilt: {
    soundId: 0x68,
    wav: 'specific',
    condition: 'Spaceship component construction complete',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:273, 0x00500000:4623-5337',
  },

  // -- Trade --
  caravanArrived: {
    soundId: 0x16,
    wav: 'JETCRASH.WAV',
    condition: 'Caravan arrives at destination city (trade route established)',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:5437',
  },
  freightArrived: {
    soundId: 0x2C,
    wav: 'GUILLOTN.WAV',
    condition: 'Freight unit arrives at destination city',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:5440',
  },

  // -- Diplomacy --
  diplomacyLoop: {
    soundId: 0x6B,
    wav: 'MENULOOP.WAV (dup)',
    condition: 'Diplomacy screen background music (looping)',
    channel: 0, loop: true,
    sourceAddr: '0x00460000:4110-4126, 0x00440000:1773',
  },
  parleyDiplomatMeeting: {
    soundId: '0x53-0x5A',
    wav: 'DRUMxx.WAV (drum roll variant)',
    condition: 'Diplomat meeting initiated (parley window open). Formula: ((DAT_006d1168 + param_1) & 7) + 0x53. DAT_006d1168 = turn counter, param_1 = target civ ID. Range: 0x53 (DRUMAL) to 0x5A (DRUMBL).',
    channel: 1, loop: false,
    sourceAddr: '0x004B7EB6:3879 (FUN_004b7eb6)',
    note: 'Same drum roll table as combat, but formula uses target civId instead of unitByte. Played at end of parley open function for all diplomacy modes.',
  },

  // -- UI / Menu --
  menuConfirm: {
    soundId: 0x6A,
    wav: 'MENUOK.WAV (dup)',
    condition: 'Menu/dialog OK click, city screen open, game load, generic UI confirmation',
    channel: 0, loop: false,
    sourceAddr: '0x00410000:4661-7478, 0x00440000:1152-2153, 0x00510000:5412-6819, 0x00520000:97-1285',
    note: 'Most frequently triggered sound in the game (100+ call sites)',
  },
  menuMusicLoop: {
    soundId: 0x6B,
    wav: 'MENULOOP.WAV (dup)',
    condition: 'Main menu background music loop',
    channel: 0, loop: true,
    sourceAddr: '0x00410000:6927-7532',
  },
  menuMusicStop: {
    soundId: -0x6B,
    wav: null,
    condition: 'Stop menu music (negative soundId = stop)',
    channel: 0, loop: false,
    sourceAddr: '0x00410000:7526-7538',
    note: 'Negative soundId triggers wave_stop_sound_by_tag at 0x005D61AB',
  },
  menuEndStop: {
    soundId: -0x6C,
    wav: null,
    condition: 'Stop menu end sound',
    channel: 0, loop: false,
    sourceAddr: '0x00410000:5014, 7538',
  },
  menuEndSound: {
    soundId: 0x6C,
    wav: 'MENUEND.WAV (dup)',
    condition: 'Menu end transition sound',
    channel: 0, loop: false,
    sourceAddr: '0x00410000:5014',
  },
  endOfTurn: {
    soundId: 0x6F,
    wav: 'ENDOTURN.WAV (dup)',
    condition: 'End of turn notification sound',
    channel: 1, loop: false,
    sourceAddr: '0x00510000:2146',
  },
  letterNotification: {
    soundId: 0x6E,
    wav: 'LETTER.WAV (dup)',
    condition: 'Diplomatic letter/message received',
    channel: 0, loop: false,
    sourceAddr: '0x00500000:2650',
  },
  civilDisorder: {
    soundId: 0x5E,
    wav: 'DRUMCN.WAV',
    condition: 'Civil disorder in city (multiple citizens unhappy)',
    channel: 1, loop: false,
    sourceAddr: '0x00440000:8698-8760',
  },
  retirementScore: {
    soundId: 0x03,
    wav: 'RIFLE.WAV',
    condition: 'Retirement/score screen opened',
    channel: 0, loop: false,
    sourceAddr: '0x004361CC (show_retirement_dialog)',
  },
  combatInitiated: {
    soundId: 100,
    wav: 'FANFARE7.WAV area',
    condition: 'General combat initiated event',
    channel: 1, loop: false,
    sourceAddr: '0x00480000:2933',
  },
  unitFortified: {
    soundId: 0x0D,
    wav: 'TORPEDOS.WAV',
    condition: 'Unit fortification/sentry action',
    channel: 1, loop: false,
    sourceAddr: '0x00440000:7814-7832',
  },
  mapViewSound: {
    soundId: 99,
    wav: '(index 99 in table)',
    condition: 'Map view interaction (scrolling/zooming/centering)',
    channel: 0, loop: false,
    sourceAddr: '0x00500000:5378-5487',
  },
  jetplaneSound: {
    soundId: 0x14,
    wav: 'JETPLANE.WAV',
    condition: 'Jet/airplane unit activation or flight',
    channel: 1, loop: false,
    sourceAddr: '0x00550000:5044',
  },
  scenarioEvent: {
    soundId: 0x3E,
    wav: 'FANFARE1.WAV',
    condition: 'Scenario event trigger (generic)',
    channel: 1, loop: false,
    sourceAddr: '0x00400000:3733',
  },
  cityScreenEvent: {
    soundId: 0x17,
    wav: 'JETSPUTR.WAV',
    condition: 'City screen: building sold or rush-buy',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:892-899',
  },
  cityScreenBuildingComplete: {
    soundId: 0x4F,
    wav: 'JETSPUTR.WAV (dup)',
    condition: 'City screen: building/wonder view complete',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:895-902',
  },
  catapultSound: {
    soundId: 0x07,
    wav: 'CATAPULT.WAV',
    condition: 'Catapult/trebuchet siege unit fires',
    channel: 1, loop: false,
    sourceAddr: '0x00580000:3767',
  },
  nukeExplosion: {
    soundId: 0x1A,
    wav: 'SMALLEXP.WAV',
    condition: 'Nuclear detonation small effect',
    channel: 0, loop: false,
    sourceAddr: '0x00590000:1088',
  },
  nuclearLaunch: {
    soundId: 0x4E,
    wav: 'NUKEXPLO.WAV (dup)',
    condition: 'Nuclear missile launch',
    channel: 0, loop: false,
    sourceAddr: '0x00590000:1091',
  },
  spyAction: {
    soundId: 0x09,
    wav: 'MEDGUN.WAV',
    condition: 'Spy/diplomat performing action',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:1139',
  },
  combatInitiateViewport: {
    soundId: 0x22,
    wav: 'MRKTPLCE.WAV',
    condition: 'Combat initiated from viewport (unit attack order)',
    channel: 1, loop: false,
    sourceAddr: '0x00570000:5196',
  },
  cityFoundedSound: {
    soundId: 0x32,
    wav: 'MENUEND.WAV',
    condition: 'City established by settler',
    channel: 0, loop: false,
    sourceAddr: '0x00570000:5794',
  },

  // -- City Capture Events (dispatch_mp_event cases 0x1B-0x1E) --
  cityCaptureEvent: {
    soundId: 0x05,
    wav: 'MCHNGUNS.WAV',
    condition: 'City captured (CITYCAPTURE): player captures enemy city',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:650',
    note: 'Same sound ID 0x05 used for all 4 city capture variants in dispatch_mp_event',
  },
  cityWinAllyEvent: {
    soundId: 0x05,
    wav: 'MCHNGUNS.WAV',
    condition: 'City captured by ally (CITYWINALLY)',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:654',
  },
  cityLoseAllyEvent: {
    soundId: 0x05,
    wav: 'MCHNGUNS.WAV',
    condition: 'City lost to ally (CITYLOSEALLY)',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:658',
  },
  cityCapture2Event: {
    soundId: 0x05,
    wav: 'MCHNGUNS.WAV',
    condition: 'City captured variant 2 (CITYCAPTURE2)',
    channel: 0, loop: false,
    sourceAddr: '0x00510000:662',
  },

  // -- Government Change --
  governmentChanged: {
    soundId: 0x14,
    wav: 'JETPLANE.WAV',
    condition: 'New government adopted from PICKGOVT dialog (FUN_0055c69d). Plays after player selects new government type.',
    channel: 1, loop: false,
    sourceAddr: '0x00550000:5044',
    note: 'Sound 0x14 (JETPLANE) reused for government change event. Dialog shown: NEWGOVT.',
  },

  // -- MP Turn Notification --
  mpTurnToMove: {
    soundId: 0x30,
    wav: 'MENUOK.WAV',
    condition: 'Multiplayer: "Our turn to move" notification at start of human turn (client and server loops). Plays for both OURTURNTOMOVE and CASUALTIES dialogs.',
    channel: 0, loop: false,
    sourceAddr: '0x0048BFEC:3732-3748, 0x0048C9F3:4040-4051',
  },

  // -- Trireme Lost at Sea --
  triremeLost: {
    soundId: 0x09,
    wav: 'MEDGUN.WAV',
    condition: 'Trireme lost at sea: unit fails random survival check (no adjacent land tile found). Dialog: TRIREME.',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:1139',
    note: 'Same sound ID 0x09 as MEDGUN in sound name table. Played when move_unit detects trireme sinking.',
  },

  // -- Noncombat Move Attempt --
  noncombatMoveBlocked: {
    soundId: 0x69,
    wav: 'MOVPIECE.WAV (dup)',
    condition: 'Non-combat unit attempts to move into occupied tile. Dialog: NONCOMBAT.',
    channel: 0, loop: false,
    sourceAddr: '0x00590000:333',
    note: 'Played when a non-combat unit (domain byte == 0) cannot enter a tile with enemy units.',
  },

  // -- Allied Repair in City --
  alliedRepair: {
    soundId: 0x68,
    wav: 'specific',
    condition: 'Unit repaired in allied city (ALLIEDREPAIR). Played when a unit enters an allied city and is healed.',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:273',
    note: 'Sound ID 0x68 indexes into the AIRCOMBT string table. Condition: DAT_00654fa8==0 AND player is human AND DAT_006d1da0 matches civ.',
  },

  // -- Spaceship Move Animation --
  spaceshipMoveSound: {
    soundId: 0x69,
    wav: 'MOVPIECE.WAV (dup)',
    condition: 'Spaceship component move/repair event in move_unit. Played when unit is on spaceship-related tile.',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:200',
    note: 'Distinct from the spaceship dialog event; this is the move animation variant.',
  },

  // -- Nuclear Unit Type Sound Branch --
  nukeMissileTypeSound: {
    soundId: 0x1A,
    wav: 'SMALLEXP.WAV',
    condition: 'Nuclear/missile unit destroyed: unit type byte < 0x1E (early-era unit) plays 0x1A; otherwise plays 0x4E (NUKEXPLO dup).',
    channel: 0, loop: false,
    sourceAddr: '0x00590000:1088-1091',
    note: 'Branch in move_unit: if unit_type_byte < 0x1E then soundId=0x1A else soundId=0x4E. Both play before unit deletion.',
  },

  // -- Bribe/Capture Map View Sound --
  bribeCaptureViewSound: {
    soundId: 99,
    wav: '(index 99 in table)',
    condition: 'Map view update after unit bribe/capture in move_unit (DAT_006d1da0 visible)',
    channel: 1, loop: false,
    sourceAddr: '0x00590000:886-909',
    note: 'Plays when the current player can see the bribe/capture action. Both local and remote paths.',
  },

  // -- Menu WM_COMMAND Loop Sound --
  viewMenuCommandLoop: {
    soundId: 0x6B,
    wav: 'MENULOOP.WAV (dup)',
    condition: 'View menu command (WM_COMMAND IDs 0xD0-0xD2): triggers background music loop restart. FUN_0046de25 handles commands in range (0xCF < param_1 < 0xD3).',
    channel: 0, loop: true,
    sourceAddr: '0x0046DE25',
    note: 'Also sets DAT_0062af10 = 1 and invalidates object cache if DAT_0062af14 != 0.',
  },

  // -- Advisor Panel Music Restart --
  advisorPanelMusic: {
    soundId: 0x6B,
    wav: 'MENULOOP.WAV (dup)',
    condition: 'Advisor/intelligence panel opened (FUN_0046dde0). Restarts background music loop.',
    channel: 0, loop: true,
    sourceAddr: '0x0046DDE0',
  },
};

// === CHEERS Special Handling ===
// Binary ref: 0x0046E020, strcmp with "CHEERS" at 0x0062B430
// When soundId maps to "CHEERS", a random variant (1-3) is appended
export const CHEERS_VARIANT = {
  baseName: 'CHEERS',
  variants: 3,   // CHEERS1.WAV, CHEERS2.WAV, CHEERS3.WAV
  algorithm: 'random(0, 2) + 1',
  sourceAddr: '0x0046E020',
};

// === Music Track Selection ===
// Binary ref: select_random_music_track @ 0x0046E320
// Music is CD audio tracks, NOT MIDI in MGE (despite MIDI init at 0x004675CA)
export const MUSIC_SELECTION = {
  algorithm: `CD audio track selection. Queries CD for track count, then:
    - If trackCount in {10, 18, 24, 12}: "major" mode → track = 4 + random(0, trackCount-3)
    - Otherwise: "minor" mode → track = 2 + random(0, trackCount-1)
    - Avoids repeating same track consecutively
    - Falls back to no music if trackCount <= 1`,
  sourceAddr: '0x0046E320',
  cdTrackLayout: {
    note: 'MGE CD has game data as track 1, music tracks start at track 2+',
    majorTrackCounts: [10, 12, 18, 24],
    majorStartOffset: 4,
    minorStartOffset: 2,
  },
  playFunction: {
    name: 'play_music_track',
    sourceAddr: '0x0046E571',
    params: '(trackId, force)',
    behavior: `If CD audio enabled (bit 3 of DAT_00655aea):
      - Skip if already playing this track and !force
      - Only play when track_type == 0 (major mode)
      - Query CD, stop current, start new track`,
  },
  stopFunction: {
    name: 'stop_music',
    sourceAddr: '0x0046E6A9',
    behavior: 'stop_cd_playback(); music_stopped = 1',
  },
  resumeFunction: {
    name: 'resume_music',
    sourceAddr: '0x0046E6C8',
    behavior: 'If music was stopped and CD enabled: select_random_music_track()',
  },
  initFunction: {
    name: 'init_cd_music',
    sourceAddr: '0x0046E4A9',
    behavior: 'Initialize CD audio device for music playback',
  },
  triggerOnChange: {
    name: 'trigger_music_change',
    sourceAddr: '0x0046E2F4',
    behavior: 'music_stopped = 1; if music_loaded: resume_music()',
  },
  civDestroyedMusic: {
    name: 'civ_destroyed_music_trigger',
    sourceAddr: '0x00510000:590',
    behavior: 'play_music_track(2, 1) — plays CD track 2 (forced) when a civilization is destroyed (dispatch_mp_event case 0x0E: DESTROYED)',
  },
  pickMusicDialog: {
    sourceAddr: '0x004E25EF',
    trackSources: {
      0x18: 'PICKMUSICFANWORLDS',   // 24 tracks: Fan Worlds edition
      0x12: 'PICKMUSICSCENARIO',    // 18 tracks: Scenario edition
      0x0C: 'PICKMUSICGOLD',        // 12 tracks: Gold edition
      0x0A: 'PICKMUSIC',            // 10 tracks: Standard edition
    },
    noMusicKey: 'NOPICKMUSICNEW',
    note: 'Track selection dialog at View → Pick Music. User selection calls play_music_track(selectedIndex + 2, 1)',
  },
};

// === MIDI System ===
// Binary ref: init_midi_system @ 0x004675CA, FUN_004FA4BE
export const MIDI_SYSTEM = {
  initBufferSize: 50000,
  sourceAddr: '0x004675CA',
  note: `MIDI system initialized but MGE primarily uses CD audio for music.
    MIDI is a fallback for systems without the game CD. The SMEDS engine
    supports both MCI MIDI (0x005EDEBF) and CD audio (0x005EE0B1) simultaneously.`,
  midiOpen: { sourceAddr: '0x005EDEBF', note: 'mci_open_midi: MCI sequencer device' },
  midiPlay: { sourceAddr: '0x005EE002', note: 'midi_play_ex: play with range' },
  midiStop: { sourceAddr: '0x005EE04C', note: 'midi_stop: stop + seek to start' },
  midiClose: { sourceAddr: '0x005EE088', note: 'midi_close: close MIDI device' },
  midiSetTempo: { sourceAddr: '0x005EDFCD', note: 'midi_set_tempo: via MCI_SET' },
};

// === Audio System Constants ===
// Binary ref: SMEDS32 wave engine (block 005D0000)
export const AUDIO_SYSTEM = {
  maxSimultaneousSounds: 5,
  maxSimultaneousAddr: 'DAT_0063858c (count), enforced at 0x005D6038',
  waveFormat: {
    sampleRate: 22050,
    bitsPerSample: 8,
    channels: 1,  // mono
    sourceAddr: '0x005D4A11 (wave_out_open)',
    note: 'SMEDS requires 22050 Hz 8-bit mono PCM WAV files',
  },
  soundNodeSize: 0xBC,
  soundNodeStride: '0xBC bytes per active sound node',
  soundListHead: 'DAT_006385d0',
  soundNodeNextPtr: '+0x2E offset within node',
  soundNodeTag: '+0x8A offset (used for stop-by-tag)',
  soundEnabledFlag: {
    global: 'DAT_00655aea',
    soundBit: 0x10,  // bit 4
    cdBit: 0x08,     // bit 3
    sourceAddr: '0x0046E020',
  },
  mixEngine: {
    bufferCallback: '0x005D6C99 (wave_buffer_callback: WOM_DONE)',
    mixLoop: '0x005D717F (wave_mix_and_dispatch)',
    mixSingle: '0x005D753E (wave_mix_into_buffer)',
    mixAdditive: '0x005D778C (wave_mix_secondary)',
    silenceValue: 0x80,
    note: 'XOR each sample with 0x80 for unsigned→signed conversion at 0x005D6947',
  },
  volumeControl: {
    waveVolume: { set: '0x005EE6E3', get: '0x005EE757', note: 'waveOutSetVolume/Get' },
    cdVolume: { set: '0x005EE7B1', get: '0x005EE825', note: 'auxSetVolume for CD' },
    midiVolume: { set: '0x005EE87F', note: 'midiOutSetVolume' },
  },
  soundDirectorySearch: {
    primary: 'scenarioDir + "\\SOUND\\"',
    fallback: '"CIV2\\SOUND\\"',
    sourceAddr: '0x0046E020',
    note: 'Scenario sounds take priority. Falls back to install dir.',
  },
};

// === Sound Editor (Cheat Mode) ===
// Binary ref: 0x0058B47E (sound_editor_init_window)
export const SOUND_EDITOR = {
  slots: 6,
  layout: '3x2 grid',
  labelTable: 'DAT_00634930',
  soundSlotArray: 'DAT_006ACD38 (6 int32 indices into AIRCOMBT table)',
  importSlotArray: 'DAT_006ACA14 (indices for import file dialog)',
  note: 'Cheat-mode sound editor. 6 buttons show current unit sound assignments. Click plays sound, can import custom WAV files.',
  sourceAddr: '0x0058B47E',
};

// === Unit Type → Combat Sound Mapping ===
// Binary ref: sound_editor_populate_slots @ 0x0058AFB6
// This maps unit types to their primary combat sound ID
export const UNIT_COMBAT_SOUNDS = {
  // domain-based defaults
  seaAncient: { soundId: 0x00, wav: 'AIRCOMBT', condition: 'Sea unit vs sea, ancient era' },
  seaModern: { soundId: 0x52, wav: 'BOATSINK (dup)', condition: 'Sea unit vs sea, modern era' },
  seaBombardAncient: { soundId: 0x18, wav: 'AIRPLANE', condition: 'Sea bombard, ancient' },
  seaBombardModern: { soundId: 0x50, wav: 'AIRPLANE (dup)', condition: 'Sea bombard, modern' },
  seaNoBombard: { soundId: 0x21, wav: 'CATHEDRL', condition: 'Sea, no bombard' },
  airStealth: { soundId: 0x4D, wav: 'FEEDBK08', condition: 'Air stealth unit' },

  // specific unit type mappings (from populate_slots switch @ 0x0058AFB6)
  0x11: { soundId: 0x19, wav: 'MISSILE', note: 'Type 0x11 = Cruise Missile' },
  0x0F: { soundId: 0x4A, wav: 'FEEDBK05', note: 'Helicopter types (0xF,0x10,0x13,0x12)' },
  0x10: { soundId: 0x4A, wav: 'FEEDBK05', note: 'Helicopter types' },
  0x12: { soundId: 0x4A, wav: 'FEEDBK05', note: 'Helicopter types' },
  0x13: { soundId: 0x4A, wav: 'FEEDBK05', note: 'Helicopter types' },
  0x14: { soundId: 0x0C, wav: 'SUBMRINE', note: 'Submarine types (0x14,0x15)' },
  0x15: { soundId: 0x0C, wav: 'SUBMRINE', note: 'Submarine types' },
  0x07: { soundId: 0x22, wav: 'MRKTPLCE', note: 'Armor/mech (7,0xB,0xA,9)' },
  0x09: { soundId: 0x22, wav: 'MRKTPLCE', note: 'Armor/mech' },
  0x0A: { soundId: 0x22, wav: 'MRKTPLCE', note: 'Armor/mech' },
  0x0B: { soundId: 0x22, wav: 'MRKTPLCE', note: 'Armor/mech' },
  0x08: { soundId: 0x26, wav: 'BLDSPCSH', note: 'Artillery (8,0xD,0xC,0xE)' },
  0x0C: { soundId: 0x26, wav: 'BLDSPCSH', note: 'Artillery' },
  0x0D: { soundId: 0x26, wav: 'BLDSPCSH', note: 'Artillery' },
  0x0E: { soundId: 0x26, wav: 'BLDSPCSH', note: 'Artillery' },
  0x17: { soundId: 0x0A, wav: 'TANKMOTR', note: 'Tank-era cavalry' },
  defaultGround: { soundId: 0x49, wav: 'FEEDBK04', note: 'Unclassified ground units' },

  // Missile unit sounds (type 0x33..0x3D)
  0x33: { soundId: 0x65, wav: 'MISSILE1', note: 'Cruise Missile variant' },
  0x34: { soundId: 0x66, wav: 'MISSILE2' },
  0x35: { soundId: 0x67, wav: 'MISSILE3' },
  0x36: { soundId: 0x7D, wav: 'NUKE1', note: 'Nuclear missile variants' },
  0x37: { soundId: 0x7E, wav: 'NUKE2' },
  0x38: { soundId: 0x7F, wav: 'NUKE3' },
  0x39: { soundId: 0x80, wav: 'NUKE4' },
  0x3A: { soundId: 0x81, wav: 'NUKE5' },
  0x3B: { soundId: 0x82, wav: 'NUKE6' },
  0x3C: { soundId: 0x83, wav: 'NUKE7' },
  0x3D: { soundId: 0x84, wav: 'NUKE8' },

  sourceAddr: '0x0058AFB6',
};

// === Animation Timing ===
// Binary ref: wait_for_animation @ 0x0046E287
export const ANIMATION_TIMING = {
  frameDelay: {
    formula: '(frames * 50) / 3',
    note: 'Each animation frame = ~16.7ms (60 FPS). frames parameter = number of frames to wait.',
    sourceAddr: '0x0046E287',
  },
};

// === Production Completion Sounds ===
// Binary ref: FUN_004ec3fe (city production handler) @ block_004E0000.c:5024-5056
// When a building/wonder/spaceship part is completed, the game plays an item-specific sound.
// local_3c = wonder index (>=0 means wonder), local_24 = building index (when local_3c < 0).
export const PRODUCTION_COMPLETION_SOUNDS = {
  note: 'Sound played via thunk_FUN_0046e020(soundId, 1, 0, 0) when production completes.',

  // --- Building-specific sounds (local_3c < 0, i.e. NOT a wonder) ---
  // Switch on local_24 (building ID from RULES.TXT @IMPROVE section):
  buildings: {
    2:  { soundId: 0x05, note: 'Granary' },
    9:  { soundId: 0x04, note: 'Aqueduct' },
    10: { soundId: 0x2F, note: 'SDI Defense' },
    0xB: { soundId: 0x0B, note: 'Library' },
    0xC: { soundId: 0x37, note: 'University' },
    0x16: { soundId: 0x45, note: 'Stock Exchange' },
    default: { soundId: 0x02, note: 'All other buildings not in switch' },
  },

  // --- Spaceship parts (building IDs 0x23..0x25) ---
  spaceshipParts: {
    range: '0x23-0x25',
    soundId: 0x08,
    note: 'SS Structural, SS Component, SS Module',
  },

  // --- Wonder completed (local_3c >= 0) ---
  wonder: {
    soundId: 0x30,
    note: 'Any wonder completion',
  },

  // --- City advisor notification sounds (from same function area) ---
  // Building type -> advisor portrait image index (local_4c), used for city notification:
  advisorPortraits: {
    0x1B: { portraitId: 0xB8, note: 'Palace built -> specific advisor portrait' },
    9:    { portraitId: 0xBA, note: 'Aqueduct/Sewer/Harbour/Airport advisor' },
    7:    { portraitId: 0xBA, note: 'Harbour' },
    8:    { portraitId: 0xBA, note: 'Airport' },
    0xE:  { portraitId: 0xBA, note: 'Sewer System' },
    0x12: { portraitId: 0xBA, note: 'Superhighways' },
    0xC:  { portraitId: 0xBA, note: 'University' },
    0x15: { portraitId: 0xB9, note: 'Nuclear Plant' },
    default: { portraitId: 0xBB, note: 'Standard building advisor portrait' },
  },

  sourceAddr: '0x004EC3FE',
};

// === Manhattan Project Sound ===
// Binary ref: block_004E0000.c:4957-4969
// When wonder 0x17 (Manhattan Project) is built, each visible civ hears sound 0x23.
export const MANHATTAN_PROJECT_SOUND = {
  wonderId: 0x17,
  soundId: 0x23,
  note: 'Manhattan Project completion alert played for all civs that can see the building civ.',
  eventText: 'MANHATTAN',
  sourceAddr: '0x004E0000:4957',
};

// === City Disorder / WLtKD Sounds ===
// Binary ref: handle_city_disorder_004ef578 @ block_004E0000.c:5819-5931
export const CITY_STATUS_SOUNDS = {
  disorder: {
    soundId: 0x0E,
    note: 'Played when city enters disorder (happy < unhappy). thunk_FUN_0046e020(0xe,1,0,0)',
    eventText: 'DISORDER',
    messageId: 0x48,
    sourceAddr: '0x004EF578',
  },
  weLoveTheKing: {
    soundId: null,
    note: 'WLtKD start uses thunk_FUN_0046e571(3,0) for music, not a one-shot sound.',
    musicChannel: 3,
    eventText: 'WELOVEKING',
    messageId: 0x4A,
    sourceAddr: '0x004EF578',
  },
  weDontLoveTheKing: {
    eventText: 'WEDONTLOVEKING',
    note: 'WLtKD ends. No sound played, just a text notification.',
    sourceAddr: '0x004EF578',
  },
  revolt: {
    eventText: 'REVOLT',
    note: 'Democracy in disorder -> forced revolution to Anarchy (govt 6, govt set to 0).',
    condition: 'govt == 6 (Democracy) AND continuing disorder AND not scenario-protected',
    sourceAddr: '0x004EF578',
  },
};

// === Move Capital Sound ===
// Binary ref: block_004E0000.c:5117-5134
// Building 1 (Palace) triggers capital relocation.
export const MOVE_CAPITAL_SOUND = {
  buildingId: 1,
  messageId: 0x48,
  eventText: 'MOVECAPITAL',
  note: 'Palace built -> capital moves to this city. Network message 0x48 sent.',
  sourceAddr: '0x004E0000:5117',
};

// === Unit Production Notification ===
// Binary ref: block_004E0000.c:5457-5464
// When an AI civ completes a unit, the notification portrait depends on the unit role.
export const UNIT_BUILT_NOTIFICATION_PORTRAITS = {
  default: { portraitId: 0xBB, note: 'Standard unit built notification' },
  settler: { portraitId: 0xB6, note: 'Settler/Engineer type (unit role 6)' },
  diplomat: { portraitId: 0xBC, note: 'Diplomat/Spy type (unit role 7)' },
  sourceAddr: '0x004E0000:5457',
};

// ============================================================================
// === TURN-PROCESSING SOUND EVENTS ===
// Binary ref: FUN_00511880 calls in FUN_00487371 (turn processing),
//             FUN_0048aedc (game end), FUN_00486c2e (pollution),
//             FUN_004868fb (warming) — all in block_00480000.c
// These are the numeric event IDs passed to FUN_00511880 during turn processing.
// The first parameter is the event ID; 0xFF = broadcast to all players.
// ============================================================================

export const TURN_PROCESSING_SOUND_EVENTS = {
  // Event ID → game event mapping
  events: {
    3: { name: 'GLOBAL_WARMING',      trigger: 'Global warming event fires',
         sourceAddr: '0x004868FB', dialog: 'GLOBALWARMING' },
    4: { name: 'POLLUTION_WARNING',    trigger: 'Pollution counter reaches 12 (warning)',
         sourceAddr: '0x00486C2E', dialog: 'FEARWARMING' },
    5: { name: 'HISTORIAN_REPORT',     trigger: 'Historian report interval reached',
         sourceAddr: '0x00487371' },
    6: { name: 'SPACESHIP_ARRIVED',    trigger: 'Spaceship arrives at Alpha Centauri',
         sourceAddr: '0x00487371', dialog: 'EAGLEHASLANDED' },
    7: { name: 'SCENARIO_WARNING',     trigger: 'Scenario ends in 5 turns',
         sourceAddr: '0x0048AEDC', dialog: 'SCENARIOENDS' },
    8: { name: 'SCENARIO_END',         trigger: 'Scenario end turn reached',
         sourceAddr: '0x0048AEDC', dialog: 'SCENARIOEND' },
    9: { name: 'PLAN_RETIREMENT',      trigger: 'Year 2000 reached (plan retirement)',
         sourceAddr: '0x0048AEDC', dialog: 'PLANRETIRE' },
    10: { name: 'FORCE_RETIREMENT',    trigger: 'Year 2020 reached (forced retirement)',
          sourceAddr: '0x0048AEDC', dialog: 'DORETIRE' },
  },

  // Event 0x3D: Diplomacy request (human-to-human in network MP)
  events_0x3D: {
    0x3D: { name: 'DIPLOMACY_REQUEST',  trigger: 'Human player requests diplomacy with another human player',
            sourceAddr: '0x004308AE line ~464',
            condition: 'Both players human (DAT_00655b0b bits set) AND DAT_00655b02 > 2 (network MP)',
            note: 'Sent to specific target player (not broadcast). Triggers PARLEYWAITING dialog on receiver.' },
  },

  // Call signature: FUN_00511880(eventId, targetPlayer, param3, param4, param5, param6)
  // targetPlayer 0xFF = broadcast to all connected players
  callSignature: 'FUN_00511880(eventId, 0xFF, 0, 0, 0, 0)',
};
