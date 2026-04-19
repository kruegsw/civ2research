// ═══════════════════════════════════════════════════════════════════
// parser.js — Civilization II MGE Save File Binary Parser
// Algorithms from Civ2_MGE_Binary_Analysis.md
//
// Primary source (authoritative):
//   .SAV/.SCN binary files — all field offsets, record structures,
//     and data formats reverse-engineered from actual save files
//
// Decoding aids (used to understand the binary format, not copied):
//   Allard Höfelt — Hex-Editing Guide (hexedit.rtf v1.8, 2005)
//     Binary format offsets, tile data structure, map header fields
//   TE Kimball — civ2mod.c: https://github.com/tek10/civ2mod
//     Unit/city record structures
//   TheNamelessOne (CivFanatics) — resource placement algorithm
//     https://forums.civfanatics.com/threads/518649/#post-13002282
//   Civ2-clone (axx0) — https://github.com/axx0/Civ2-clone
//     Resource algorithm port, city style/epoch verification
//   FoxAhead — Civ2Types.pas (TCiv struct), ToT format guide
//     https://github.com/FoxAhead/Civ2-UI-Additions/blob/master/src/Civ2Types.pas
//     https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm
// ═══════════════════════════════════════════════════════════════════

import { improvementFromByte, LEADERS_TXT_NAMES, GOVERNMENT_KEYS, DIFFICULTY_KEYS, BARBARIAN_KEYS } from './defs.js';
import { createAccessors, tileFromBytes } from './state.js';

const Civ2Parser = {

  // ── Binary helpers ──
  u16(buf, off) { return buf[off] | (buf[off + 1] << 8); },
  s16(buf, off) { const v = this.u16(buf, off); return v > 32767 ? v - 65536 : v; },
  u32(buf, off) { return (buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24)) >>> 0; },
  s32(buf, off) { return buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24); },
  nullStr(buf, off, maxLen) {
    let s = '';
    for (let i = 0; i < maxLen; i++) {
      if (buf[off + i] === 0) break;
      s += String.fromCharCode(buf[off + i]);
    }
    return s;
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 1: File Header (0x0000–0x000D, 14 bytes)
  // ═══════════════════════════════════════════════════════════════
  _parseHeader(savBuf, fileName) {
    const isScn = fileName.toLowerCase().endsWith('.scn');
    const isNet = fileName.toLowerCase().endsWith('.net');

    // Magic signature
    const magic = this.nullStr(savBuf, 0x0000, 8);
    if (magic !== 'CIVILIZE') {
      throw new Error(`Invalid file: expected CIVILIZE header, got "${magic}"`);
    }

    const nullSep = savBuf[0x0008];       // always 0x00
    const formatMarker = savBuf[0x0009];  // always 0x1A (ASCII SUB)
    const headerVersion = this.u16(savBuf, 0x000A);
    const headerMapHeight = savBuf[0x000C];
    const headerFlags = savBuf[0x000D];
    const isScenarioSave = !!(headerFlags & 0x01);
    const isLargeMap = !!(headerFlags & 0x80);

    // Record sizes depend on file type
    const unitRecSize = isScn ? 26 : 32;
    const cityRecSize = isScn ? 84 : 88;
    const MAP_HEADER = isScn ? 13432 : 13702;
    const civNameBlockStart = isScn ? 0x0148 : 0x0156;
    const civDataBlockStart = isScn ? 0x08D8 : 0x08E6;
    const civDataBlockSize = isScn ? 1396 : 1428;

    return {
      magic, nullSep, formatMarker, headerVersion, headerMapHeight, headerFlags,
      isScn, isNet, isScenarioSave, isLargeMap,
      unitRecSize, cityRecSize, MAP_HEADER,
      civNameBlockStart, civDataBlockStart, civDataBlockSize
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 2: Game State (0x000C–0x0155 SAV / 0x000C–0x0147 SCN)
  // ═══════════════════════════════════════════════════════════════
  _parseGameState(savBuf, hdr) {
    // ── 2.1 Game Toggle Flags (0x000C–0x0017) ──
    // NOTE: 0x000C–0x000D overlap with header bytes (dual purpose)
    const gameToggles = {
      // 0x000C
      bloodlust:               !!(savBuf[0x000C] & 0x80),
      simplifiedCombat:        !!(savBuf[0x000C] & 0x10),
      barbariansPeaceful:      !!(savBuf[0x000C] & 0x04),
      barbariansRaging:        !!(savBuf[0x000C] & 0x08),
      // 0x000D
      flatEarth:               !!(savBuf[0x000D] & 0x80),
      dontRestartEliminated:   !!(savBuf[0x000D] & 0x01),
      // 0x000E
      moveUnitsWithoutMouse:   !!(savBuf[0x000E] & 0x80),
      enterClosesCityScreen:   !!(savBuf[0x000E] & 0x40),
      showMapGrid:             !!(savBuf[0x000E] & 0x20),
      soundEffects:            !!(savBuf[0x000E] & 0x10),
      music:                   !!(savBuf[0x000E] & 0x08),
      // 0x000F
      cheatMenu:               !!(savBuf[0x000F] & 0x80),
      alwaysWaitAtEndOfTurn:   !!(savBuf[0x000F] & 0x40),
      autosaveEachTurn:        !!(savBuf[0x000F] & 0x20),
      showEnemyMoves:          !!(savBuf[0x000F] & 0x10),
      noPauseAfterEnemyMoves:  !!(savBuf[0x000F] & 0x08),
      fastPieceSlide:          !!(savBuf[0x000F] & 0x04),
      instantAdvice:           !!(savBuf[0x000F] & 0x02),
      tutorialHelp:            !!(savBuf[0x000F] & 0x01),
      // 0x0010
      animatedHeralds:         !!(savBuf[0x0010] & 0x20),
      highCouncil:             !!(savBuf[0x0010] & 0x10),
      civilopediaForAdvances:  !!(savBuf[0x0010] & 0x08),
      throneRoomGraphics:      !!(savBuf[0x0010] & 0x04),
      diplomacyScreenGraphics: !!(savBuf[0x0010] & 0x02),
      wonderMovies:            !!(savBuf[0x0010] & 0x01),
      // 0x0014
      scenarioNoTechLimits:    !!(savBuf[0x0014] & 0x80),
      scenarioFile:            !!(savBuf[0x0014] & 0x40),
      cheatPenalty:            !!(savBuf[0x0014] & 0x10),
      // 0x0016
      announceWeLoveKingDay:   !!(savBuf[0x0016] & 0x80),
      warnFoodDangerouslyLow:  !!(savBuf[0x0016] & 0x40),
      announceCitiesInDisorder:!!(savBuf[0x0016] & 0x20),
      announceOrderRestored:   !!(savBuf[0x0016] & 0x10),
      showNonCombatUnitsBuilt: !!(savBuf[0x0016] & 0x08),
      showInvalidBuildInstr:   !!(savBuf[0x0016] & 0x04),
      warnCityGrowthHalted:    !!(savBuf[0x0016] & 0x02),
      showCityImprovementsBuilt:!!(savBuf[0x0016] & 0x01),
      // 0x0017
      zoomToCityNotDefault:    !!(savBuf[0x0017] & 0x04),
      warnNewPollution:        !!(savBuf[0x0017] & 0x02),
      warnProductionCostShields:!!(savBuf[0x0017] & 0x01),
    };

    // ── 2.2 Unknown toggle bytes ──
    const unknownToggles_0x0011 = [savBuf[0x0011], savBuf[0x0012], savBuf[0x0013]];
    const unknownToggle_0x0015 = savBuf[0x0015];

    // ── 2.3 Core Game State Fields ──
    const turnsPassed        = this.u16(savBuf, 0x001C);
    // currentYear is a signed i16 — negative for BC (e.g. -3900 = 3900 BC).
    // Earlier name "turnsForYear" was a mislabel; confirmed by decompiled
    // code at block_00480000.c:1817 which computes this from the turn.
    const currentYear        = this.s16(savBuf, 0x001E);
    const sentinel_0x0020    = this.u16(savBuf, 0x0020);    // Always 0xFFFF (confirmed across 196+ saves)
    const selectedUnit       = this.u16(savBuf, 0x0022);  // 0xFFFF = none
    const unitCounterRelated = this.u16(savBuf, 0x0024);  // Correlated with totalUnits (r=0.74)
    const spare_0x0026       = savBuf[0x0026];             // Low correlation, purpose unclear
    const activeHumanPlayer  = savBuf[0x0027];
    const playerMap          = savBuf[0x0028];
    const playerCiv          = savBuf[0x0029];
    const mapRelatedByte     = savBuf[0x002A];
    const mapRevealed        = savBuf[0x002B];
    const difficulty         = DIFFICULTY_KEYS[savBuf[0x002C]] || 'chieftain';
    // Binary DAT_00655b09 (0-3): 0=Villages Only (no spawning), 1=Roving,
    // 2=Restless, 3=Raging. There is no "off" state in original Civ2.
    const barbarianActivity  = BARBARIAN_KEYS[savBuf[0x002D]] || 'villages';
    const civsAlive          = savBuf[0x002E];
    const humanPlayers       = savBuf[0x002F];
    const civsEverExisted    = savBuf[0x0030];              // Bitmask — bits stay set after civ death (byte 0x0031 always 0)
    const currentPollution   = savBuf[0x0032];
    const globalWarmingCount = savBuf[0x0033];
    const padding_0x0034     = [savBuf[0x0034], savBuf[0x0035], savBuf[0x0036], savBuf[0x0037]];  // Always 0 in MGE
    const turnsOfPeace       = savBuf[0x0038];
    const padding_0x0039     = savBuf[0x0039];              // Always 0 in MGE
    const totalUnits         = this.u16(savBuf, 0x003A);
    const totalCities        = this.u16(savBuf, 0x003C);
    const techCount          = this.u16(savBuf, 0x003E);
    const padding_0x0040     = [savBuf[0x0040], savBuf[0x0041]];  // Always 0 in MGE

    // ── 2.4 First Discoverer Per Advance (100 bytes at 0x0042) ──
    // Value = civ number (1-7) that first discovered, 0 = not yet discovered
    const firstDiscoverer = new Array(100);
    for (let i = 0; i < 100; i++) firstDiscoverer[i] = savBuf[0x0042 + i];

    // ── 2.5 Tech Discovery Bitmask Per Advance (100 bytes at 0x00A6) ──
    // Each byte: bitmask of which civs have discovered that tech
    const techDiscoveryBitmask = new Array(100);
    for (let i = 0; i < 100; i++) techDiscoveryBitmask[i] = savBuf[0x00A6 + i];

    // Derived: per-civ tech counts and sets (existing logic, compatible)
    const civTechCounts = new Array(8).fill(0);
    const civTechs = Array.from({length: 8}, () => new Set());
    for (let adv = 0; adv < 89; adv++) {
      const byte = techDiscoveryBitmask[adv];
      for (let civ = 0; civ < 8; civ++) {
        if (byte & (1 << civ)) {
          civTechCounts[civ]++;
          civTechs[civ].add(adv);
        }
      }
    }

    // ── 2.6 Wonders (28 × uint16 LE at 0x010A) ──
    // Raw: 0xFFFF = not built, 0xFFEF = destroyed, else = city array index
    const wonders = new Array(28);
    for (let i = 0; i < 28; i++) {
      const raw = this.u16(savBuf, 0x010A + i * 2);
      if (raw === 0xFFFF)      wonders[i] = { cityIndex: null, destroyed: false };
      else if (raw === 0xFFEF) wonders[i] = { cityIndex: null, destroyed: true };
      else                     wonders[i] = { cityIndex: raw,  destroyed: false };
    }

    // ── 2.7 Pre-name blocks: power graph ranking data ──
    // Wonders end at 0x010A + 56 = 0x0142
    // Name blocks start at 0x0156 (SAV) or 0x0148 (SCN)
    // Agent D analysis: contains globalScoreAccumulator, civCountDuplicated, powerGraphRanking[7]
    const preNameBlocksStart = 0x0142;
    const preNameBlocksEnd = hdr.civNameBlockStart;
    const preNameBlocksData = new Array(preNameBlocksEnd - preNameBlocksStart);
    for (let i = 0; i < preNameBlocksData.length; i++) {
      preNameBlocksData[i] = savBuf[preNameBlocksStart + i];
    }

    return {
      // Backward-compatible flat fields
      playerCiv, mapRevealed, civsAlive,
      totalUnits, totalCities,
      civTechCounts, civTechs,
      // New structured fields
      gameToggles,
      turnsPassed, currentYear, selectedUnit,
      activeHumanPlayer, playerMap, mapRelatedByte,
      difficulty, barbarianActivity, humanPlayers,
      currentPollution, globalWarmingCount, turnsOfPeace,
      techCount,
      firstDiscoverer, techDiscoveryBitmask, wonders,
      // Decoded game state fields
      civsEverExisted,         // Bitmask — bits stay set after civ death
      unitCounterRelated,      // Correlated with totalUnits (r=0.74)
      // Remaining unknowns/padding
      unknowns: {
        toggles_0x0011: unknownToggles_0x0011,  // Always 0 in MGE
        toggle_0x0015: unknownToggle_0x0015,     // Always 0 in MGE
        sentinel_0x0020,                          // Always 0xFFFF
        spare_0x0026,
        padding_0x0034,                           // Always 0 in MGE
        padding_0x0039,                           // Always 0 in MGE
        padding_0x0040,                           // Always 0 in MGE
        preNameBlocks: preNameBlocksData,       // Power graph ranking data (partially decoded)
      }
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 3: Per-Civ Name Blocks (8 × 242 bytes)
  // ═══════════════════════════════════════════════════════════════
  _parseCivNameBlocks(savBuf, hdr) {
    const civNameBlocks = new Array(8);
    for (let slot = 0; slot < 8; slot++) {
      const off = hdr.civNameBlockStart + slot * 242;
      civNameBlocks[slot] = {
        style:          savBuf[off] & 0x03,
        unknown_1:      savBuf[off + 1],
        leaderName:     this.nullStr(savBuf, off + 2, 23),
        tribeName:      this.nullStr(savBuf, off + 26, 23),
        tribeAdjective: this.nullStr(savBuf, off + 50, 23),
        titleAnarchy:        this.nullStr(savBuf, off + 74, 23),
        titleDespotism:      this.nullStr(savBuf, off + 98, 23),
        titleMonarchy:       this.nullStr(savBuf, off + 122, 23),
        titleCommunism:      this.nullStr(savBuf, off + 146, 23),
        titleFundamentalism: this.nullStr(savBuf, off + 170, 23),
        titleRepublic:       this.nullStr(savBuf, off + 194, 23),
        titleDemocracy:      this.nullStr(savBuf, off + 218, 23),
        padding_241:    savBuf[off + 241],
      };
    }
    return civNameBlocks;
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 3b: Per-Civ Data Blocks (8 × 1,428 bytes SAV / 1,396 SCN)
  // ═══════════════════════════════════════════════════════════════
  _parseCivDataBlocks(savBuf, hdr) {
    const civData = new Array(8);
    for (let slot = 0; slot < 8; slot++) {
      const off = hdr.civDataBlockStart + slot * hdr.civDataBlockSize;
      // Last block (slot 7) is always 2 bytes shorter
      const blockLen = (slot === 7) ? hdr.civDataBlockSize - 2 : hdr.civDataBlockSize;

      // +0: state flags bitmask (bit 0=skip oedo, bit 1=at war, bit 2=senate override chance [1/3 per turn],
      //   bit 3=recovered from revolution, bit 5=free advance pending)
      // Flags are u16 (2 bytes at +0x0 and +0x1). Older version of this
       // parser read only the low byte as u8, missing high-byte flags
      // (real Civ2 sets bit 9 = 0x200 on some civs at init — unknown meaning).
      // Low-byte bit definitions (skipNextOedoYear, atWar, senateOverride,
      // recoveredFromRevolution, freeAdvancePending) still work since `&`
      // masks to low byte. High-byte bits not yet decoded as named booleans.
      const stateFlags = this.u16(savBuf, off);

      // +32–63: treaties (4 bytes × 8 target civs)
      //   Confirmed via FoxAhead TCiv struct (0x20) and empirical verification:
      //   self-treaty is always all-zeros at +32, not at +31.
      const treaties = new Array(8);
      for (let t = 0; t < 8; t++) {
        const tOff = off + 32 + t * 4;
        treaties[t] = {
          contact:    !!(savBuf[tOff] & 0x01),
          ceaseFire:  !!(savBuf[tOff] & 0x02),
          peace:      !!(savBuf[tOff] & 0x04),
          alliance:   !!(savBuf[tOff] & 0x08),
          vendetta:   !!(savBuf[tOff] & 0x10),
          hatred:     !!(savBuf[tOff] & 0x20),       // FoxAhead: "Hatred" or spaceship-related
          embassy:    !!(savBuf[tOff] & 0x80),
          nukeTalk:   !!(savBuf[tOff + 1] & 0x01),   // FoxAhead: "They talked about nukes with us"
          attacked:   !!(savBuf[tOff + 1] & 0x02),   // CivFanatics: "Attacked a unit of the other tribe"
          war:        !!(savBuf[tOff + 1] & 0x20),
          recentPeace:!!(savBuf[tOff + 1] & 0x40),   // FoxAhead: "Recently signed Peace treaty / Cease fire"
          cityCapture:!!(savBuf[tOff + 2] & 0x01),   // CivFanatics: "Captured a city of the other tribe"
          weNukedThem:!!(savBuf[tOff + 2] & 0x02),   // FoxAhead: "We nuked them"
          tribute:    !!(savBuf[tOff + 2] & 0x04),   // FoxAhead: "Accepted tribute"
          raw: [savBuf[tOff], savBuf[tOff+1], savBuf[tOff+2], savBuf[tOff+3]],
        };
      }

      // +64–71: attitudes toward civs 0–7 (8 entries, including barbarians)
      //   Confirmed via FoxAhead TCiv struct (0x40) and empirical verification:
      //   byte +64 (attitude toward barbs) is always 100 for active civs.
      const attitudes = new Array(8);
      for (let i = 0; i < 8; i++) attitudes[i] = savBuf[off + 64 + i];

      // +88–99: technology bitmask (12 bytes = 96 bits, LSB first)
      const techBitmask = new Array(12);
      for (let i = 0; i < 12; i++) techBitmask[i] = savBuf[off + 88 + i];

      // +114–213: first discoverer flags (100 bytes)
      const firstDiscovererFlags = new Array(100);
      for (let i = 0; i < 100; i++) firstDiscovererFlags[i] = savBuf[off + 114 + i];

      // +216–269: active unit counts (54 bytes, indexed by unit type)
      // Empirically verified on live Deity game turn 3: Indians had 2 Settlers
      // + 1 Chariot → bytes at +216+0=2, +216+16=1. Prior offset +214 was off
      // by 2 (read into trailing padding of prev field). Matches auth doc
      // byte_verification_plan.md (0x0D8-0x10D in data block = decimal
      // 216-269, 54 bytes). Civ2 has 51 unit types; extra 3 are padding.
      // Keep old length (63) on the array so callers indexing types > 53
      // don't fault; extra entries zero-fill since save bytes beyond the
      // 54-byte region are a known 8-byte gap of unknown data before the
      // casualty array.
      const activeUnitCounts = new Array(63);
      for (let i = 0; i < 54; i++) activeUnitCounts[i] = savBuf[off + 216 + i];
      for (let i = 54; i < 63; i++) activeUnitCounts[i] = 0;

      // +278–331: unit casualty counts (54 bytes)
      // Auth doc 0x116-0x14B = decimal 278-331. Prior parser offset +277
      // was off by 1 (reading from the 8-byte gap above).
      const unitCasualtyCounts = new Array(63);
      for (let i = 0; i < 54; i++) unitCasualtyCounts[i] = savBuf[off + 278 + i];
      for (let i = 54; i < 63; i++) unitCasualtyCounts[i] = 0;

      // +340–402: units in production (63 bytes). Empirically verified at
      // this offset earlier (Washington producing Warriors → bytes[2]=1).
      const unitsInProduction = new Array(63);
      for (let i = 0; i < 63; i++) unitsInProduction[i] = savBuf[off + 340 + i];

      // +404–996: per-continent statistics block (593 bytes, byte 403 = padding always 0)
      // Slot index = continent bodyId − 1. Sections A/B are uint16 LE but only low byte used.
      const militaryUnitCountByContinent = new Array(64);
      const landAttackByContinent = new Array(64);
      for (let i = 0; i < 64; i++) {
        militaryUnitCountByContinent[i] = savBuf[off + 404 + i * 2];  // low byte of uint16 LE (high byte always 0)
        landAttackByContinent[i] = savBuf[off + 532 + i * 2];     // low byte of uint16 LE (high byte always 0)
      }
      const cityCountByContinent = new Array(64);
      const citySizeByContinent = new Array(64);
      const continentTransientFlags = new Array(64);
      for (let i = 0; i < 64; i++) {
        cityCountByContinent[i] = savBuf[off + 659 + i];
        citySizeByContinent[i] = savBuf[off + 723 + i];
        continentTransientFlags[i] = savBuf[off + 787 + i];
      }
      const continentStatusFlags = new Array(63);
      for (let i = 0; i < 63; i++) continentStatusFlags[i] = savBuf[off + 851 + i];
      const unitTypeEverBuilt = new Array(64);
      for (let i = 0; i < 64; i++) unitTypeEverBuilt[i] = savBuf[off + 914 + i] === 0;
      const powerGraphData = new Array(9);
      for (let i = 0; i < 9; i++) powerGraphData[i] = this.s16(savBuf, off + 978 + i * 2);

      // +996–1009: last contact turns (7 × uint16 LE)
      const lastContactTurns = new Array(7);
      for (let i = 0; i < 7; i++) lastContactTurns[i] = this.u16(savBuf, off + 996 + i * 2);

      // +1010: AI persona index (uint8)
      //   Formula: (rulesCivNumber % 7) + 7 * leaderPersonality
      //   leaderPersonality is 0–5 (6 personalities), can change on civ death/rebirth
      //   Barbarians (slot 0) always have personaIndex = 0
      const personaIndex = savBuf[off + 1010];

      // +1011–1021: constant padding [1,1,0,1,0,0,1,0,0,0,0] (11 bytes, invariant)

      // +1022–1023: spaceship structural count (uint16 LE)
      const spaceshipStructural = this.u16(savBuf, off + 1022);

      // +1024–1025: spaceship propulsion count (uint16 LE, max 8 in MGE)
      const spaceshipPropulsion = this.u16(savBuf, off + 1024);

      // +1026–1027: spaceship score/year estimate 1 (int16 LE, signed)
      const spaceshipEstimate1 = this.s16(savBuf, off + 1026);

      // +1028–1029: spaceship score/year estimate 2 (int16 LE, signed)
      //   Typically estimate1 − estimate2 = 427 (or 319 with max propulsion)
      const spaceshipEstimate2 = this.s16(savBuf, off + 1028);

      // +1030–1043: zero padding (14 bytes, always 0)

      // +1044–1427: AI continent goals — 64 × 6 bytes (384 bytes)
      //   One entry per continent (bodyId 1–64, index = bodyId − 1)
      //   Each entry: [x uint16 LE, y uint16 LE, goalType uint8, goalExtra int8]
      //   goalType: 0=explore, 1=attack/defend, 5=city site, 7=naval, 21=threat, 255=empty
      //   goalExtra (signed): typically -7..+5, related to civ slot or priority
      //   Civ 7 (slot 7) has only 416 bytes total, so entry 63 is truncated to 4 bytes
      const numGoalEntries = Math.min(64, Math.floor((blockLen - 1044) / 6));
      const continentGoals = new Array(numGoalEntries);
      for (let i = 0; i < numGoalEntries; i++) {
        const gOff = off + 1044 + i * 6;
        const x = this.u16(savBuf, gOff);
        const y = this.u16(savBuf, gOff + 2);
        const goalType = savBuf[gOff + 4];
        const goalExtraRaw = savBuf[gOff + 5];
        const goalExtra = goalExtraRaw > 127 ? goalExtraRaw - 256 : goalExtraRaw;
        continentGoals[i] = { x, y, goalType, goalExtra };
      }

      // Backward-compat: preserve raw tail for any consumers
      const tailLen = blockLen - 1010;
      const unknownBlock_1010_end = new Array(tailLen);
      for (let i = 0; i < tailLen; i++) unknownBlock_1010_end[i] = savBuf[off + 1010 + i];

      civData[slot] = {
        stateFlags,
        skipNextOedoYear:      !!(stateFlags & 0x01),
        atWar:                 !!(stateFlags & 0x02),
        senateOverride:         !!(stateFlags & 0x04),  // FoxAhead: toggled each turn with 1/3 chance; when NOT set, Republic Senate confirms action
        recoveredFromRevolution: !!(stateFlags & 0x08),
        freeAdvancePending:    !!(stateFlags & 0x20),
        gender:                savBuf[off + 1],
        treasury:              this.s32(savBuf, off + 2),
        rulesCivNumber:        savBuf[off + 6],
        civVariant:            savBuf[off + 7],
        researchProgress:      this.u16(savBuf, off + 8),
        techBeingResearched:   savBuf[off + 10],
        techResearchHelper:    savBuf[off + 11],
        startingPosition:      this.u16(savBuf, off + 12),
        turnOfCityBuild:       this.s16(savBuf, off + 14),
        acquiredTechCount:     savBuf[off + 16],
        futureTechCount:       savBuf[off + 17],
        unknown_18:            savBuf[off + 18],
        scienceRate:           savBuf[off + 19],
        taxRate:               savBuf[off + 20],
        government:            GOVERNMENT_KEYS[savBuf[off + 21]] || 'anarchy',
        aiRandomSeed:          savBuf[off + 22],
        unknown_23:            new Array(4).fill(0).map((_, i) => savBuf[off + 23 + i]),
        unused_27:             savBuf[off + 27],   // Always 0 in MGE (confirmed across 1856 records)
        treatyBreakingCount:   savBuf[off + 28],   // Cumulative treaty violations by this civ (byte 29 always 0)
        reputation:            savBuf[off + 30],
        patience:              savBuf[off + 31],   // AI negotiation patience counter (0-6). Confirmed by axx0/Civ2-clone, Catfish Cave, and TOTPP Lua.
        treaties,
        attitudes,
        treatyViolations:      new Array(8).fill(0).map((_, i) => {  // +72-79: per-civ treaty-breaking tracker (int8[8])
          const v = savBuf[off + 72 + i]; return v > 127 ? v - 256 : v;  // signed: negative = we broke treaty, positive = they broke treaty
        }),
        diplomaticInteractionCounters: new Array(8).fill(0).map((_, i) => savBuf[off + 80 + i]),  // +80-87: per-civ diplomatic interaction intensity (uint8[8])
        techBitmask,
        techBitmaskOverflow:   savBuf[off + 100],  // max(0, techBitmaskBitsSet - 80). Byte 101 always 0.
        militaryUnitCount:     this.u16(savBuf, off + 102),  // Renamed from militaryPower. r=0.9941 with counted military units.
        cityCount:             this.u16(savBuf, off + 104),
        navalUnitCount:        this.u16(savBuf, off + 106),
        sumOfCitySizes:        this.u16(savBuf, off + 108),
        totalUnitAtkDefSum:    this.u16(savBuf, off + 110),
        totalUnitAtkSum:       this.u16(savBuf, off + 112),
        firstDiscovererFlags,
        activeUnitCounts,
        unitCasualtyCounts,
        unitsInProduction,
        militaryUnitCountByContinent,
        landAttackByContinent,
        cityCountByContinent,
        citySizeByContinent,
        continentTransientFlags,
        continentStatusFlags,
        unitTypeEverBuilt,
        powerGraphData,
        lastContactTurns,
        personaIndex,
        spaceshipStructural,
        spaceshipPropulsion,
        spaceshipEstimate1,
        spaceshipEstimate2,
        continentGoals,
        unknownBlock_1010_end,
      };
    }
    return civData;
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 3c: Merge name blocks + data blocks into unified civs array
  // ═══════════════════════════════════════════════════════════════
  _mergeCivs(civNameBlocks, civData) {
    const RULES_STYLES = [1,0,3,0,1,1,2,3,0,3,0,2,3,0,0,2,3,3,0,1,0];
    const civs = new Array(8);
    for (let slot = 0; slot < 8; slot++) {
      const nb = civNameBlocks[slot];
      const cd = civData[slot];
      // Derive city style: use name block style if leader exists, else RULES.TXT default
      const style = nb.leaderName
        ? nb.style
        : (cd.rulesCivNumber < RULES_STYLES.length ? RULES_STYLES[cd.rulesCivNumber] : 0);
      // Resolve display name: tribeName → LEADERS_TXT_NAMES → fallback
      const rulesName = cd.rulesCivNumber != null && LEADERS_TXT_NAMES[cd.rulesCivNumber];
      const name = slot === 0 ? 'Barbarians' : (nb.tribeName || rulesName || `Civ ${slot}`);
      civs[slot] = {
        // Identity (from name blocks)
        name,
        style,
        leaderName: nb.leaderName,
        tribeName: nb.tribeName,
        tribeAdjective: nb.tribeAdjective,
        titleAnarchy: nb.titleAnarchy,
        titleDespotism: nb.titleDespotism,
        titleMonarchy: nb.titleMonarchy,
        titleCommunism: nb.titleCommunism,
        titleFundamentalism: nb.titleFundamentalism,
        titleRepublic: nb.titleRepublic,
        titleDemocracy: nb.titleDemocracy,
        // All data fields
        ...cd,
      };
    }
    return civs;
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 4: Map Data (header + Block 1 + Block 2)
  // ═══════════════════════════════════════════════════════════════
  _parseMapData(savBuf, MAP_HEADER) {
    const mw2 = this.u16(savBuf, MAP_HEADER);
    const mh  = this.u16(savBuf, MAP_HEADER + 2);
    const ms  = this.u16(savBuf, MAP_HEADER + 4);
    const mw  = mw2 >> 1;
    const mapShape = this.u16(savBuf, MAP_HEADER + 6);
    const mapSeed = this.u16(savBuf, MAP_HEADER + 8);
    const qw  = this.u16(savBuf, MAP_HEADER + 10);
    const qh  = this.u16(savBuf, MAP_HEADER + 12);

    if (mw * mh !== ms) {
      throw new Error(`Map validation failed: ${mw}×${mh} != ${ms}. Wrong file format?`);
    }

    // Block offsets
    const block1Off = MAP_HEADER + 14;
    const block2Off = block1Off + ms * 7;
    const block3Off = block2Off + ms * 6;
    const block3Size = qw * qh * 2;
    const paddingOff = block3Off + block3Size;
    const paddingSize = 1024;

    // Block 1: per-civ known improvements (7 sections, civs 1-7)
    const knownImprovements = new Array(8).fill(null);
    for (let civ = 1; civ <= 7; civ++) {
      const sectionOff = block1Off + (civ - 1) * ms;
      const section = new Uint8Array(ms);
      for (let i = 0; i < ms; i++) {
        section[i] = savBuf[sectionOff + i];
      }
      knownImprovements[civ] = section;
    }

    // Block 2: tile records (6 bytes each) → named tile objects
    const tileData = new Array(ms);
    for (let i = 0; i < ms; i++) {
      const off = block2Off + i * 6;
      tileData[i] = tileFromBytes(savBuf[off], savBuf[off+1], savBuf[off+2],
                                  savBuf[off+3], savBuf[off+4], savBuf[off+5]);
    }

    // Block 3: quarter-resolution data (qw × qh × 2 bytes)
    const block3Data = new Uint8Array(block3Size);
    for (let i = 0; i < block3Size; i++) block3Data[i] = savBuf[block3Off + i];

    // Padding: 1024 bytes between Block 3 and unit section
    const paddingBlock = new Uint8Array(paddingSize);
    let paddingNonZero = 0;
    for (let i = 0; i < paddingSize; i++) {
      paddingBlock[i] = savBuf[paddingOff + i];
      if (paddingBlock[i] !== 0) paddingNonZero++;
    }
    // paddingNonZero tracked but not logged (expected in some saves)

    return {
      mw, mh, mw2, ms, mapShape, mapSeed, qw, qh,
      block1Off, block2Off, block3Off, paddingOff,
      knownImprovements, tileData, block3Data, paddingBlock
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 5: Unit Records
  // ═══════════════════════════════════════════════════════════════
  _parseUnits(savBuf, unitOff, totalUnits, unitRecSize, mw2, mh) {
    const isSav = unitRecSize === 32;  // SAV/NET have 32-byte records with extra fields
    const units = [];      // live units only (backward-compatible)
    const allUnits = [];   // all records including dead slots

    for (let i = 0; i < totalUnits; i++) {
      const off = unitOff + i * unitRecSize;
      if (off + unitRecSize > savBuf.length) break;

      const ux = this.s16(savBuf, off);
      const uy = this.s16(savBuf, off + 2);
      const flags          = this.u16(savBuf, off + 4);  // save-format: uint16 status flags bitfield
      const movementFlags  = flags & 0xFF;               // low byte — backward compat
      const statusFlags    = (flags >> 8) & 0xFF;         // high byte — backward compat
      const utype          = savBuf[off + 6];
      const uowner         = savBuf[off + 7];
      const moveSpent      = savBuf[off + 8];
      const hpLost         = savBuf[off + 9];   // save-format: "visibility/seen bitmask" (name/note swapped in binary docs)
      const movesRemain    = savBuf[off + 10];  // save-format: "damage taken" (name/note swapped in binary docs)
      const lastDirection  = savBuf[off + 11];
      const shieldCharge   = savBuf[off + 12];
      const caravanDest    = savBuf[off + 13];
      // Split byte +13 into named fields based on unit type context
      // Caravans (48) / Freight (49): commodity carried (0-15)
      // Settlers (0) / Engineers (1): work turns remaining
      // Air units (26-31, 44-45): fuel remaining
      // Transports/carriers: cargo count
      const commodityCarried = (utype === 48 || utype === 49) ? caravanDest : -1;
      const workTurns = (utype === 0 || utype === 1) ? caravanDest : 0;
      const fuelRemaining = (utype >= 26 && utype <= 31) || utype === 44 || utype === 45 ? caravanDest : -1;
      const counter2       = savBuf[off + 14];
      const orderRaw       = savBuf[off + 15];
      const ORDERS_MAP = ['none','fortifying','fortified','sleep','buildFortress','buildRoad','buildIrrigation','buildMine','transform','cleanPollution','buildAirbase','goto'];
      const orders = ORDERS_MAP[orderRaw] || (orderRaw === 255 ? 'none' : `unknown_${orderRaw}`);
      const homeCity        = this.u16(savBuf, off + 16);  // save-format: int8 at +0x10, +0x11 is padding; u16 read for backward compat
      const goToX          = this.s16(savBuf, off + 18);
      const goToY          = this.s16(savBuf, off + 20);
      const prevInStack    = this.s16(savBuf, off + 22);
      const nextInStack    = this.s16(savBuf, off + 24);

      // SAV/NET-only fields (+26..+31)
      const id             = isSav ? this.u32(savBuf, off + 26) : null;  // save-format: uint32 unique sequential ID (0 = dead/empty)
      const padding_30     = isSav ? [savBuf[off+30], savBuf[off+31]] : null;  // padding to 0x20 boundary

      // Earlier this used `counter2 !== 0` (byte at +0x0E) as the dead
      // marker — that byte is actually fuel/turns-remaining (nonzero
      // for Carriers/Transports and Crusaders with a fortify counter),
      // not a death flag. Live units were being filtered out whenever
      // their fuel field was nonzero. The authoritative marker is the
      // uint32 unique ID at +0x1A: 0 = dead/empty slot, nonzero = live.
      const dead = isSav ? (id === 0) : (counter2 !== 0);
      const inBounds = ux >= 0 && ux < mw2 && uy >= 0 && uy < mh;

      const record = {
        // Backward-compatible fields
        gx: inBounds ? ux >> 1 : -1,
        gy: inBounds ? uy : -1,
        type: utype, owner: uowner, order: orderRaw, orders, hpLost, movesRemain,
        saveIndex: i, nextInStack, prevInStack,
        // New fields
        x: ux, y: uy,    // raw doubled-X coordinates
        flags, movementFlags,
        // movementFlags (low byte)
        gotoArrived:     !!(movementFlags & 0x80),
        firstMoved:      !!(movementFlags & 0x40),
        borderSeen:      !!(movementFlags & 0x20),
        paraLaunched:    !!(movementFlags & 0x10),
        borderChecked:   !!(movementFlags & 0x04),
        immobile:        !!(movementFlags & 0x02),
        // statusFlags (high byte)
        statusFlags,
        settlerAutomate: !!(statusFlags & 0x80),
        shipWakeSentries:!!(statusFlags & 0x40),
        veteran:         !!(statusFlags & 0x20),
        gotoNuclearTarget:!!(statusFlags & 0x10),
        aiMobilized:     !!(statusFlags & 0x08),
        aiAttackPath:    !!(statusFlags & 0x04),
        aiSettlerRole:   !!(statusFlags & 0x02),
        aiFortified:     !!(statusFlags & 0x01),
        // backward-compat aliases
        automated:       !!(statusFlags & 0x80),
        waiting:         !!(statusFlags & 0x40),
        moveSpent,
        lastDirection,
        shieldCharge,
        caravanDest, commodityCarried, workTurns, fuelRemaining,
        counter2, dead,
        homeCity, homeCityId: homeCity,  // homeCityId is backward-compat alias
        goToX, goToY, gotoX: goToX, gotoY: goToY,  // gotoX/gotoY are backward-compat aliases
        id, sequenceId: id,  // sequenceId is backward-compat alias
        padding_30,
      };

      allUnits.push(record);

      // Backward-compatible: only live, in-bounds units in the `units` array
      if (!dead && inBounds) {
        units.push(record);
      }
    }

    // Build save-file index → unit lookup for stacking linked list
    const unitBySaveIndex = {};
    for (const u of units) unitBySaveIndex[u.saveIndex] = u;

    return { units, unitBySaveIndex, allUnits };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 6: City Records
  // ═══════════════════════════════════════════════════════════════
  _parseCities(savBuf, cityOff, totalCities, cityRecSize, civs) {
    const isSav = cityRecSize === 88;
    const cities = [];

    for (let i = 0; i < totalCities; i++) {
      const off = cityOff + i * cityRecSize;
      if (off + cityRecSize > savBuf.length) break;

      const cx    = this.u16(savBuf, off);
      const cy    = this.u16(savBuf, off + 2);
      const owner = savBuf[off + 8];
      const size  = savBuf[off + 9];
      const name  = this.nullStr(savBuf, off + 32, 16);

      // Attributes (+4–+7)
      const attribs1 = savBuf[off + 4];
      const attribs2 = savBuf[off + 5];
      const attribs3 = savBuf[off + 6];
      const attribs4 = savBuf[off + 7];

      const originalOwner      = savBuf[off + 10];
      const turnsSinceCapture  = savBuf[off + 11];
      const isOccupied         = (owner !== originalOwner);
      const knownToTribes      = savBuf[off + 12];

      // Believed sizes (+13–+20): one byte per civ, stores last-known city size
      const believedSize = new Array(8);
      for (let civ = 0; civ < 8; civ++) believedSize[civ] = savBuf[off + 13 + civ];

      // Specialists (+22–+25): 16 × 2-bit entries in .sav → string array in model
      const specialistBytesRaw = [savBuf[off+22], savBuf[off+23], savBuf[off+24], savBuf[off+25]];
      const SPEC_TYPES = [null, 'entertainer', 'taxman', 'scientist'];
      const specialists = [];
      for (let b = 0; b < 4; b++) {
        for (let s = 0; s < 4; s++) {
          const val = (specialistBytesRaw[b] >> (s * 2)) & 0x03;
          if (val > 0) specialists.push(SPEC_TYPES[val]);
        }
      }

      // Resource accumulators (+26–+31)
      const foodInBox      = this.s16(savBuf, off + 26);
      const shieldsInBox   = this.s16(savBuf, off + 28);
      const netBaseTrade   = this.s16(savBuf, off + 30);

      // Worker tile assignments (+48–+50): bitmasks in .sav → index array in model
      const workersInnerRaw  = savBuf[off + 48];
      const workersOuterARaw = savBuf[off + 49];
      const workersOuterBRaw = savBuf[off + 50];
      const workedTiles = [];
      for (let b = 0; b < 8; b++) if (workersInnerRaw & (1 << b)) workedTiles.push(b);
      for (let b = 0; b < 8; b++) if (workersOuterARaw & (1 << b)) workedTiles.push(8 + b);
      for (let b = 0; b < 4; b++) if (workersOuterBRaw & (1 << b)) workedTiles.push(16 + b);

      // Specialist count (+51)
      const specialistCountRaw = savBuf[off + 51];
      const specialistCount    = specialistCountRaw >> 2;

      // Building bitmask I-IV (+52–+55) + V (+56) → Set<number>
      const buildingsRaw  = this.u32(savBuf, off + 52);
      const buildingsVRaw = savBuf[off + 56];
      const buildings = new Set();
      for (let bit = 1; bit <= 31; bit++) {
        if (buildingsRaw & (1 << bit)) buildings.add(bit);
      }
      for (let bit = 0; bit <= 6; bit++) {
        if (buildingsVRaw & (1 << bit)) buildings.add(32 + bit);
      }
      const hasWalls  = buildings.has(8);
      const hasPalace = buildings.has(1);

      // Item in production (+57)
      const prodRaw = savBuf[off + 57];
      let itemInProduction;
      if (prodRaw <= 0x3F) {
        itemInProduction = { type: 'unit', id: prodRaw };
      } else {
        const buildId = 256 - prodRaw;
        itemInProduction = { type: buildId >= 39 ? 'wonder' : 'building', id: buildId };
      }

      // Trade routes (+58–+73)
      const tradeRouteCount = savBuf[off + 58];
      const tradeCommoditiesAvail   = [savBuf[off+59], savBuf[off+60], savBuf[off+61]];
      const tradeCommoditiesDemand  = [savBuf[off+62], savBuf[off+63], savBuf[off+64]];
      const tradeCommoditiesInRoute = [savBuf[off+65], savBuf[off+66], savBuf[off+67]];
      const tradePartnerCityIds     = [this.u16(savBuf, off+68), this.u16(savBuf, off+70), this.u16(savBuf, off+72)];

      // Economic output (+74–+83)
      const scienceOutput    = this.s16(savBuf, off + 74);
      const taxOutput        = this.s16(savBuf, off + 76);
      const totalTrade       = this.s16(savBuf, off + 78);
      const foodProduction   = savBuf[off + 80];
      const shieldProduction = savBuf[off + 81];
      const happyCitizens    = savBuf[off + 82];
      const unhappyCitizens  = savBuf[off + 83];

      // SAV/NET-only: city sequence ID (+84–+87)
      const sequenceId = isSav ? this.u16(savBuf, off + 84) : null;
      const padding_86 = isSav ? [savBuf[off + 86], savBuf[off + 87]] : null;

      const style = (civs && civs[owner] && civs[owner].style) || 0;

      if (name && size > 0) {
        cities.push({
          // Backward-compatible fields
          name, cx, cy, gx: cx >> 1, gy: cy,
          owner, size, hasWalls, hasPalace,
          originalOwner, turnsSinceCapture, isOccupied,
          knownToTribes, believedSize, style,
          // Batch F: new fields
          attribs1, attribs2, attribs3, attribs4,
          // attribs1 (byte +4)
          canBuildCoastal:     !!(attribs1 & 0x80),
          aiSettlerNearby:     !!(attribs1 & 0x40),
          autoBuild:           !!(attribs1 & 0x10),
          techStolen:          !!(attribs1 & 0x08),
          improvementSold:     !!(attribs1 & 0x04),
          weLoveKingDay:       !!(attribs1 & 0x02),
          civilDisorder:       !!(attribs1 & 0x01),
          // attribs2 (byte +5)
          raptureGrowth:       !!(attribs2 & 0x80),
          contentSurplus:      !!(attribs2 & 0x40),
          disorderActive:      !!(attribs2 & 0x20),
          canBuildHydro:       !!(attribs2 & 0x08),
          buildingWonder:      !!(attribs2 & 0x01),
          // attribs3 (byte +6)
          investigated:        !!(attribs3 & 0x40),
          canBuildShips:       !!(attribs3 & 0x20),
          wasCelebrating:      !!(attribs3 & 0x10),
          needsNewSettlerSite: !!(attribs3 & 0x08),
          needsRecalc:         !!(attribs3 & 0x02),
          // attribs4 (byte +7)
          objectiveX3:         !!(attribs4 & 0x10),
          coastalFortressUsed: !!(attribs4 & 0x08),
          objectiveX1:         !!(attribs4 & 0x04),
          autoBuildDomestic:   !!(attribs4 & 0x02),
          autoBuildMilitary:   !!(attribs4 & 0x01),
          specialists, specialistCount,
          foodInBox, shieldsInBox, netBaseTrade,
          workedTiles,
          buildings,
          itemInProduction, prodRaw,
          tradeRouteCount, tradeCommoditiesAvail, tradeCommoditiesDemand,
          tradeCommoditiesInRoute, tradePartnerCityIds,
          scienceOutput, taxOutput, totalTrade,
          foodProduction, shieldProduction,
          happyCitizens, unhappyCitizens,
          sequenceId, padding_86,
        });
      }
    }
    return { cities };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 7: Gap Record (32 bytes between cities and tail)
  // ═══════════════════════════════════════════════════════════════
  _parseGapRecord(savBuf, gapOff) {
    const raw = new Uint8Array(32);
    for (let i = 0; i < 32; i++) raw[i] = savBuf[gapOff + i];
    return {
      raw,
      coordX: this.u16(savBuf, gapOff),
      coordY: this.u16(savBuf, gapOff + 2),
      stateFlags: raw.slice(4, 26),
      values: [this.u16(savBuf, gapOff + 26), this.u16(savBuf, gapOff + 28), this.u16(savBuf, gapOff + 30)],
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 8: Tail Data (1,807 / 1,907 / 2,979 bytes)
  // ═══════════════════════════════════════════════════════════════
  _parseTailData(savBuf, tailOff, hdr) {
    // Determine tail size
    let tailSize;
    if (hdr.isNet) {
      tailSize = 2979;
    } else if (hdr.isScn || hdr.isScenarioSave) {
      tailSize = 1907;
    } else {
      tailSize = 1807;
    }

    // City name counters: 21 × 3 bytes
    const cityNameCounters = new Array(21);
    for (let i = 0; i < 21; i++) {
      const o = tailOff + i * 3;
      cityNameCounters[i] = {
        unknown1:    savBuf[o],
        citiesBuilt: savBuf[o + 1],
        unknown2:    savBuf[o + 2],
      };
    }

    // Cursor position
    const cursorPosition = {
      x: this.u16(savBuf, tailOff + 63),
      y: this.u16(savBuf, tailOff + 65),
    };

    // Raw region from +67 to +1288 (history/power graph data + zero padding)
    const historyAndPadding = new Uint8Array(1288 - 67);
    for (let i = 0; i < historyAndPadding.length; i++) {
      historyAndPadding[i] = savBuf[tailOff + 67 + i];
    }

    // Game engine constants (+1288, 97 bytes including trailing 0x00 separator)
    const engineConstants = new Uint8Array(97);
    for (let i = 0; i < 97; i++) engineConstants[i] = savBuf[tailOff + 1288 + i];

    // Fixed constants (+1385, 7 bytes) — validate
    // Doc says +1384 but empirically confirmed at +1385 across all test files
    const fixedConstants = new Uint8Array(7);
    for (let i = 0; i < 7; i++) fixedConstants[i] = savBuf[tailOff + 1385 + i];
    const EXPECTED_FIXED = [0xAB, 0x05, 0x46, 0x03, 0x01, 0x00, 0x03];
    let fixedConstantsValid = true;
    for (let i = 0; i < EXPECTED_FIXED.length; i++) {
      if (fixedConstants[i] !== EXPECTED_FIXED[i]) { fixedConstantsValid = false; break; }
    }
    if (!fixedConstantsValid) {
      console.warn('[parser] Tail fixed constants mismatch at +1385');
    }

    // Post-fixed-constants region (+1392..+1468): per-civ summary values
    const postFixedData = new Uint8Array(1469 - 1392);
    for (let i = 0; i < postFixedData.length; i++) {
      postFixedData[i] = savBuf[tailOff + 1392 + i];
    }

    // Passwords: 224 bytes (7 × 32), at +720 from tail start
    // Doc: "1087 bytes before events/end" → 1807 - 1087 = 720
    const passwordsOff = tailOff + 720;
    const passwords = new Array(7);
    for (let civ = 0; civ < 7; civ++) {
      const pOff = passwordsOff + civ * 32;
      const block = new Uint8Array(32);
      for (let i = 0; i < 32; i++) block[i] = savBuf[pOff + i];
      passwords[civ] = block;
    }

    // Scenario-specific block: 100 bytes inserted at +1469 for scenario saves
    // Contains: 2-byte prefix, scenario name (up to 64 bytes), metadata
    const isScenario = hdr.isScn || hdr.isScenarioSave;
    let scenarioName = null;
    let scenarioBlock = null;
    if (isScenario) {
      scenarioBlock = new Uint8Array(100);
      for (let i = 0; i < 100; i++) scenarioBlock[i] = savBuf[tailOff + 1469 + i];
      scenarioName = this.nullStr(savBuf, tailOff + 1471, 64);
    }

    // Kill history: 338 bytes
    // Standard tail (1807): at +1469
    // Scenario tail (1907): at +1569 (after 100-byte scenario block)
    // NET tail (2979): at +1469 (network data appended after standard tail)
    const killHistoryOff = tailOff + 1469 + (isScenario ? 100 : 0);
    const killHistoryCount = this.u16(savBuf, killHistoryOff);
    const killTurns = new Array(12);
    for (let i = 0; i < 12; i++) killTurns[i] = this.u16(savBuf, killHistoryOff + 2 + i * 2);
    const killerCivIds = new Array(12);
    for (let i = 0; i < 12; i++) killerCivIds[i] = savBuf[killHistoryOff + 26 + i];
    // destroyedCivRulesIds: rulesCivNumber + 21*generation (generation increments on civ death/rebirth)
    const destroyedCivRulesIds = new Array(12);
    for (let i = 0; i < 12; i++) destroyedCivRulesIds[i] = savBuf[killHistoryOff + 38 + i];
    const destroyedCivNames = new Array(12);
    for (let i = 0; i < 12; i++) {
      destroyedCivNames[i] = this.nullStr(savBuf, killHistoryOff + 50 + i * 24, 24);
    }

    // Network-specific data (NET only, appended after standard 1807-byte tail)
    let networkData = null;
    if (hdr.isNet) {
      const netDataSize = 2979 - 1807;
      networkData = new Uint8Array(netDataSize);
      for (let i = 0; i < netDataSize; i++) {
        networkData[i] = savBuf[tailOff + 1807 + i];
      }
    }

    // Store full raw tail for completeness
    const rawTail = new Uint8Array(tailSize);
    for (let i = 0; i < tailSize; i++) rawTail[i] = savBuf[tailOff + i];

    return {
      tailSize, tailOff,
      cityNameCounters, cursorPosition,
      historyAndPadding, engineConstants, postFixedData,
      fixedConstants, fixedConstantsValid,
      passwords,
      scenarioBlock, scenarioName,
      killHistory: {
        count: killHistoryCount,
        killTurns, killerCivIds, destroyedCivRulesIds, destroyedCivNames,
      },
      networkData, rawTail,
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Section 9: Events (Scenario files only)
  // ═══════════════════════════════════════════════════════════════
  _parseEvents(savBuf, hdr) {
    // Search for "EVNT" magic near end of file
    const searchStart = Math.max(0, savBuf.length - 100000);
    let evntOff = -1;
    for (let i = savBuf.length - 4; i >= searchStart; i--) {
      if (savBuf[i] === 0x45 && savBuf[i+1] === 0x56 &&
          savBuf[i+2] === 0x4E && savBuf[i+3] === 0x54) {
        evntOff = i;
        break;
      }
    }
    if (evntOff === -1) return null;

    const eventCount = this.u16(savBuf, evntOff + 4);
    const recordsStart = evntOff + 6;

    const records = new Array(eventCount);
    for (let i = 0; i < eventCount; i++) {
      const rOff = recordsStart + i * 298;
      const triggerBitmask = this.u32(savBuf, rOff);
      const actionBitmask  = this.u32(savBuf, rOff + 4);
      // Store raw 290 parameter bytes
      const params = new Uint8Array(290);
      for (let j = 0; j < 290; j++) params[j] = savBuf[rOff + 8 + j];

      records[i] = {
        triggerBitmask, actionBitmask, params,
        // Decoded trigger flags
        triggers: {
          unitKilled:         !!(triggerBitmask & 0x01),
          cityTaken:          !!(triggerBitmask & 0x02),
          turn:               !!(triggerBitmask & 0x04),
          turnInterval:       !!(triggerBitmask & 0x08),
          negotiation:        !!(triggerBitmask & 0x10),
          scenarioLoaded:     !!(triggerBitmask & 0x20),
          randomTurn:         !!(triggerBitmask & 0x40),
          noSchism:           !!(triggerBitmask & 0x80),
          receivedTechnology: !!(triggerBitmask & 0x100),
        },
        // Decoded action flags
        actions: {
          text:                 !!(actionBitmask & 0x01),
          moveUnit:             !!(actionBitmask & 0x02),
          createUnit:           !!(actionBitmask & 0x04),
          changeMoney:          !!(actionBitmask & 0x08),
          playWaveFile:         !!(actionBitmask & 0x10),
          makeAggression:       !!(actionBitmask & 0x20),
          justOnce:             !!(actionBitmask & 0x40),
          playCDTrack:          !!(actionBitmask & 0x80),
          dontPlayWonders:      !!(actionBitmask & 0x100),
          changeTerrain:        !!(actionBitmask & 0x200),
          destroyACivilization: !!(actionBitmask & 0x400),
        },
      };
    }

    // String table: null-terminated strings after records
    const stringTableStart = recordsStart + eventCount * 298;
    const strings = [];
    let pos = stringTableStart;
    while (pos < savBuf.length) {
      const str = this.nullStr(savBuf, pos, savBuf.length - pos);
      if (pos + str.length + 1 > savBuf.length) break;
      strings.push(str);
      pos += str.length + 1;
      // Stop if we're reading only zeros
      if (str.length === 0 && pos < savBuf.length && savBuf[pos] === 0) break;
    }

    return { evntOff, eventCount, records, strings };
  },

  // ═══════════════════════════════════════════════════════════════
  // Validation helpers
  // ═══════════════════════════════════════════════════════════════
  _validate(map, cities, units, allUnits, getTerrain, gs, tail) {
    // Terrain distribution
    const terrainCounts = new Array(11).fill(0);
    for (let i = 0; i < map.ms; i++) terrainCounts[map.tileData[i].terrain]++;
    const oceanPct = (terrainCounts[10] / map.ms * 100).toFixed(1);

    // City-on-land
    let citiesOnOcean = 0;
    for (const c of cities) {
      if (getTerrain(c.gx, c.gy) === 10) citiesOnOcean++;
    }

    // Unit/city count cross-check
    const unitCountMatch = allUnits.length === gs.totalUnits;
    const cityCountMatch = cities.length === gs.totalCities;

    // Tail fixed constants
    const fixedConstantsValid = tail ? tail.fixedConstantsValid : null;

    // City coordinate parity: cx and cy must have same parity (isometric constraint)
    let parityErrors = 0;
    for (const c of cities) {
      if ((c.cx % 2) !== (c.cy % 2)) parityErrors++;
    }

    // Palace count: exactly one per alive civ (civ 0=barbarians excluded)
    const palacesPerCiv = {};
    for (const c of cities) {
      if (c.hasPalace) {
        palacesPerCiv[c.owner] = (palacesPerCiv[c.owner] || 0) + 1;
      }
    }
    let palaceErrors = 0;
    for (let civ = 1; civ <= 7; civ++) {
      const alive = !!(gs.civsAlive & (1 << civ));
      const count = palacesPerCiv[civ] || 0;
      if (alive && count !== 1) palaceErrors++;
      if (!alive && count > 0) palaceErrors++;
    }

    // Wonder city indices: must reference valid city array indices
    let wonderIdErrors = 0;
    for (let i = 0; i < gs.wonders.length; i++) {
      const w = gs.wonders[i];
      if (w.cityIndex != null && w.cityIndex >= cities.length) wonderIdErrors++;
    }

    // Unit home city IDs: must reference valid city array indices
    // 0xFFFF = no home city; 0x00FF (255) also used for no home city in scenario-created units
    let homeCityErrors = 0;
    for (const u of units) {
      if (u.homeCityId !== 0xFFFF && u.homeCityId !== 0x00FF && u.homeCityId >= cities.length) homeCityErrors++;
    }

    // Worker + specialist = city size
    let workerSizeErrors = 0;
    for (const c of cities) {
      if (c.workedTiles.length + c.specialists.length !== c.size) workerSizeErrors++;
    }

    // Science + tax vs total trade (only for cities without trade routes)
    let tradeErrors = 0;
    for (const c of cities) {
      if (c.tradeRouteCount === 0 && Math.abs(c.scienceOutput + c.taxOutput - c.totalTrade) > 1) tradeErrors++;
    }

    // Only warn on actual data integrity problems (not expected quirks)
    if (citiesOnOcean > 0) console.warn(`[parser] ${citiesOnOcean} cities on ocean tiles`);
    if (!unitCountMatch) console.warn(`[parser] Header says ${gs.totalUnits} units but parsed ${allUnits.length}`);
    if (!cityCountMatch) console.warn(`[parser] Header says ${gs.totalCities} cities but parsed ${cities.length}`);
    if (parityErrors > 0) console.warn(`[parser] ${parityErrors} cities with mismatched cx/cy parity`);
    if (palaceErrors > 0) console.warn(`[parser] ${palaceErrors} civs with wrong palace count`);
    if (wonderIdErrors > 0) console.warn(`[parser] ${wonderIdErrors} wonders referencing invalid city indices`);
    if (homeCityErrors > 0) console.warn(`[parser] ${homeCityErrors} units with invalid home city IDs`);

    return {
      terrainCounts, oceanPct, citiesOnOcean, unitCountMatch, cityCountMatch, fixedConstantsValid,
      parityErrors, palaceErrors, wonderIdErrors, homeCityErrors, workerSizeErrors, tradeErrors,
    };
  },

  // ═══════════════════════════════════════════════════════════════
  // Main parse — orchestrates sub-parsers, builds accessors
  // ═══════════════════════════════════════════════════════════════
  parse(savBuf, fileName) {
    // ── Section 1: Header & file type detection ──
    const hdr = this._parseHeader(savBuf, fileName);

    // ── Section 2: Game state ──
    const gs = this._parseGameState(savBuf, hdr);

    // ── Section 3: Per-civ blocks → unified civs array ──
    const civNameBlocks = this._parseCivNameBlocks(savBuf, hdr);
    const civDataRaw = this._parseCivDataBlocks(savBuf, hdr);
    const civs = this._mergeCivs(civNameBlocks, civDataRaw);

    // ── Section 4: Map data ──
    const map = this._parseMapData(savBuf, hdr.MAP_HEADER);

    // ── Forward chain to locate unit and city sections ──
    const unitOff = map.paddingOff + 1024;
    const cityOff = unitOff + gs.totalUnits * hdr.unitRecSize;

    // ── Section 5: Units ──
    const unitResult = this._parseUnits(savBuf, unitOff, gs.totalUnits, hdr.unitRecSize, map.mw2, map.mh);

    // ── Section 6: Cities ──
    const cityResult = this._parseCities(savBuf, cityOff, gs.totalCities, hdr.cityRecSize, civs);

    // ── Accessor functions (via shared createAccessors factory) ──
    const { mw, mh, mw2, ms, mapSeed, tileData, knownImprovements } = map;
    const acc = createAccessors(mw, mh, map.mapShape, mapSeed, tileData, knownImprovements);
    const { wrap, getTerrain, isLand, hasRiver, getImprovements, getVisibility,
            getResource, getNeighbors, hasGoodyHut, hasShield,
            getCityRadiusOwner, getBodyId, getTileOwnership, getTileFertility,
            getKnownImprovements } = acc;

    // ── Section 7: Gap record (32 bytes after cities) ──
    const gapOff = cityOff + gs.totalCities * hdr.cityRecSize;
    const gapRecord = this._parseGapRecord(savBuf, gapOff);

    // ── Section 8: Tail data ──
    const tailOff = gapOff + 32;
    const tail = this._parseTailData(savBuf, tailOff, hdr);

    // ── Section 9: Events (scenario files only) ──
    const events = this._parseEvents(savBuf, hdr);

    // ── Validation ──
    const validation = this._validate(map, cityResult.cities, unitResult.units, unitResult.allUnits, getTerrain, gs, tail);

    // ── Assemble return object (backward-compatible) ──
    return {
      mw, mh, mw2, ms, mapSeed, qw: map.qw, qh: map.qh, mapShape: map.mapShape, isScn: hdr.isScn,
      tileData, cities: cityResult.cities, units: unitResult.units, civs,
      playerCiv: gs.playerCiv, mapRevealed: gs.mapRevealed, civsAlive: gs.civsAlive,
      civTechCounts: gs.civTechCounts, civTechs: gs.civTechs,
      terrainCounts: validation.terrainCounts, oceanPct: validation.oceanPct, citiesOnOcean: validation.citiesOnOcean,
      // Accessor functions
      getTerrain, isLand, hasRiver, getImprovements, getVisibility, getResource, getNeighbors, wrap,
      // Block 1 / FOW / occupancy data
      knownImprovements, getKnownImprovements, hasGoodyHut, hasShield,
      // Batch D: tile byte 2/3/5 accessors
      getCityRadiusOwner, getBodyId, getTileOwnership, getTileFertility,
      // Batch D: Block 3 + padding
      block3Data: map.block3Data, paddingBlock: map.paddingBlock,
      // Unit stacking linked list
      unitBySaveIndex: unitResult.unitBySaveIndex,
      // Batch E: all unit records (including dead)
      allUnits: unitResult.allUnits,
      // civs already included above (merged civNameBlocks + civData + derived style)
      // ── Batch G: Gap, tail, events ──
      gapRecord, tail, events,
      // ── Batch B: Full header & game state ──
      header: {
        magic: hdr.magic, nullSep: hdr.nullSep, formatMarker: hdr.formatMarker,
        headerVersion: hdr.headerVersion, headerMapHeight: hdr.headerMapHeight,
        headerFlags: hdr.headerFlags, isScenarioSave: hdr.isScenarioSave, isLargeMap: hdr.isLargeMap,
      },
      gameState: {
        gameToggles: gs.gameToggles,
        turnsPassed: gs.turnsPassed, currentYear: gs.currentYear,
        selectedUnit: gs.selectedUnit,
        activeHumanPlayer: gs.activeHumanPlayer, playerMap: gs.playerMap,
        playerCiv: gs.playerCiv, mapRelatedByte: gs.mapRelatedByte,
        mapRevealed: gs.mapRevealed,
        difficulty: gs.difficulty, barbarianActivity: gs.barbarianActivity,
        civsAlive: gs.civsAlive, humanPlayers: gs.humanPlayers,
        currentPollution: gs.currentPollution, globalWarmingCount: gs.globalWarmingCount,
        turnsOfPeace: gs.turnsOfPeace,
        totalUnits: gs.totalUnits, totalCities: gs.totalCities,
        techCount: gs.techCount,
        firstDiscoverer: gs.firstDiscoverer,
        techDiscoveryBitmask: gs.techDiscoveryBitmask,
        wonders: gs.wonders,
        unknowns: gs.unknowns,
      },
      validation,
    };
  }
};

export { Civ2Parser };
