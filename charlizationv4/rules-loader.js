// ═══════════════════════════════════════════════════════════════════
// rules-loader.js — Parse RULES.TXT into flat memory arrays
//
// Field offsets are from the AUTHORITATIVE source: the binary's own
// RULES.TXT parser in decompiled/block_00410000.c:
//   @COSMIC:  FUN_00419d23 (line 5060) → DAT_0064bcc8..DAT_0064bcdd
//   @UNITS:   FUN_0041a5c4 (line 5294) → DAT_0064b1bc (stride 0x14)
//   @TERRAIN: FUN_0041a95f (line 5386) → DAT_00627cc0 (stride 0x18)
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';

// ── Tech abbreviation → index mapping ──
// Order matches @CIVILIZE section in RULES.TXT (0-based, 89 standard techs)
const TECH_ABBREVS = [
  'AFl','Alp','Amp','Ast','Ato','Aut','Ban','Bri','Bro','Cer',
  'Che','Chi','CoL','CA','Cmb','Cmn','Cmp','Csc','Cst','Cor',
  'Cur','Dem','Eco','E1','E2','Eng','Env','Esp','Exp','Feu',
  'Fli','Fun','FP','Gen','Gue','Gun','Hor','Ind','Inv','Iro',
  'Lab','Las','Ldr','Lit','Too','Mag','Map','Mas','MP','Mat',
  'Med','Met','Min','Mob','Mon','MT','Mys','Nav','NF','NP',
  'Phi','Phy','Pla','Plu','PT','Pot','Rad','RR','Rec','Ref',
  'Rfg','Rep','Rob','Roc','San','Sea','SFl','Sth','SE','Stl',
  'Sup','Tac','The','ToG','Tra','Uni','War','Whe','Wri',
];
const TECH_MAP = {};
for (let i = 0; i < TECH_ABBREVS.length; i++) TECH_MAP[TECH_ABBREVS[i]] = i;

// Terrain abbreviations → indices
const TERRAIN_MAP = {
  'Drt': 0, 'Pln': 1, 'Grs': 2, 'For': 3, 'Hil': 4,
  'Mou': 5, 'Tun': 6, 'Gla': 7, 'Swa': 8, 'Jun': 9, 'Oce': 10,
};

function techIndex(abbr) {
  if (!abbr || abbr === 'nil' || abbr === 'no') return 0xFE; // binary uses 0xFE for "none"
  const idx = TECH_MAP[abbr];
  return idx !== undefined ? idx : 0xFE;
}

function terrainIndex(abbr) {
  if (!abbr || abbr === 'yes') return 0xFF; // "yes" = improve in place (no terrain change)
  if (abbr === 'no') return 0xFE;           // "no" = can't improve
  const idx = TERRAIN_MAP[abbr];
  return idx !== undefined ? idx : 0xFE;
}

// ═══════════════════════════════════════════════════════════════════
// GIF and DLL Resource Inventory
//
// These files contain GRAPHICS ONLY — no game logic data.
// The v3 renderer (charlizationv3/public/js/) already parses them.
// Listed here for completeness.
//
// GIF Files (sprite sheets):
//   TERRAIN1.GIF  46KB  Base terrain tiles, roads, railroads, rivers
//   TERRAIN2.GIF  56KB  Dithering overlays, coastlines, resources
//   UNITS.GIF     54KB  Unit sprites (9×7 grid, 63 types × 3 states)
//   CITIES.GIF    46KB  City sprites (4 styles × 4 eras × walled/unwalled)
//   CITY.GIF      66KB  City window UI elements
//   ICONS.GIF     54KB  Tech icons, improvement icons, wonder images
//   PEOPLE.GIF    21KB  Citizen type sprites (happy/content/unhappy/specialist)
//   SCREDITS.GIF 139KB  Credits screen background
//   EDITOR*.GIF   ~35KB each  Scenario editor terrain/unit palettes
//
// DLL Files (embedded GIF resources, 243 total across 8 DLLs):
//   cv.dll       5.0MB  Main game graphics (terrain, units, UI elements)
//   mk.dll       3.2MB  Multiplayer graphics
//   pv.dll       2.0MB  Planet view graphics
//   ss.dll       1.5MB  Spaceship view graphics
//   Tiles.dll    1.4MB  Alternative tile graphics
//   Intro.dll    1.2MB  Intro sequence graphics
//   Civ2Art.dll  257KB  Art assets (advisors, diplomacy)
//   Wonder.dll   186KB  Wonder completion movie frames
//   timerdll.dll 131KB  Timer DLL (code, not graphics)
//   XDaemon.dll   96KB  Network daemon (code, not graphics)
//
// Other .TXT Files (UI strings, no game logic):
//   Game.txt     103KB  Dialog/popup text, menu strings, messages
//   Labels.txt    12KB  UI label strings, button text
//   Describe.txt 212KB  Civilopedia entries
//   HELP.TXT      24KB  Help text
//   MISC.TXT      21KB  Miscellaneous UI strings
//   PEDIA.TXT     16KB  Civilopedia index
//   TUTORIAL.TXT  12KB  Tutorial messages
//   ADVICE.TXT     5KB  Advisor dialog text
//   Menu.txt       2KB  Menu bar definitions
//   SC.TXT         2KB  Credits text
//   HERALD.TXT    444B  Herald warning messages
//   MAPMENU.TXT   675B  Map editor menu strings
//   ALEXANDR.TXT  775B  Alexander scenario text
//   ROME.TXT      1.2KB Rome scenario text
//   WWII.TXT      552B  WWII scenario text
//
// Key rendering facts (from v3):
//   - UNITS.GIF grid is 9×7 (NOT 10×7)
//   - Per-civ unit recoloring uses ±3 tolerance on template colors
//   - Terrain variants < 50% opaque pixels are auto-discarded
//   - Chroma keys: magenta ±15, cyan ±15, gray varies by sheet
// ═══════════════════════════════════════════════════════════════════

/**
 * Parse CIV2.DAT — multiplayer configuration file (516 bytes).
 * Contains player names, IP address, connection settings.
 * Not needed for single-player game logic but documented for completeness.
 *
 * Layout:
 *   0x00-0x03: flags/checksum (uint32)
 *   0x04-0x5F: connection settings (port, player count, etc.)
 *   0x60-0x7F: player name 1 (32 bytes, null-terminated)
 *   0x80-0x9F: player name 2 (32 bytes, null-terminated)
 *   0xA0-0xBF: (unused)
 *   0xC0-0xDF: server IP address (32 bytes, null-terminated)
 *   0xE0-0x10F: timing/sync settings
 *   0x110-0x203: padding (zeros)
 */
export function loadCiv2Dat(buf) {
  const readStr = (off, len) => {
    let s = '';
    for (let i = 0; i < len; i++) {
      if (buf[off + i] === 0) break;
      s += String.fromCharCode(buf[off + i]);
    }
    return s;
  };
  return {
    playerName1: readStr(0x60, 32),
    playerName2: readStr(0x80, 32),
    serverIP: readStr(0xC0, 32),
    size: buf.length,
  };
}

/**
 * Parse CITY.TXT — default city names per civilization.
 * Format: @CIVNAME / city names / @STOP, repeated for each civ.
 * Returns: { civNames: { 'Romans': ['Rome','Veii',...], ... } }
 */
export function loadCityNames(text) {
  const civNames = {};
  let currentCiv = null;

  for (const raw of text.split('\n')) {
    const trimmed = raw.replace(/;.*$/, '').trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('@')) {
      if (trimmed === '@STOP' || trimmed === '@end') {
        currentCiv = null;
      } else {
        currentCiv = trimmed.substring(1); // remove @
        civNames[currentCiv] = [];
      }
      continue;
    }

    if (currentCiv) {
      civNames[currentCiv].push(trimmed);
    }
  }

  return civNames;
}

/**
 * Initialize constant tables from the binary's data segment.
 * These values are hardcoded in civ2.exe, not parsed from any file.
 * Values verified against charlizationv3/engine/defs.js (CITY_RADIUS_DOUBLED).
 */
export function initBinaryConstants() {
  // City radius tile offsets (doubled-X coordinates, relative to city center)
  // 25 entries: 21 city radius tiles + 4 extended (N/E/S/W at distance 4)
  // Order matches city worker bitmask layout.
  // DAT_00628370 = dx offsets, DAT_006283a0 = dy offsets
  const cityDx = [+1,+2,+1, 0,-1,-2,-1, 0, +2,+2,-2,-2, +1,+3,+3,+1,-1,-3,-3,-1, 0, 0,+4,0,-4];
  const cityDy = [-1, 0,+1,+2,+1, 0,-1,-2, -2,+2,+2,-2, -3,-1,+1,+3,+3,+1,-1,-3, 0, -4,0,+4,0];
  for (let i = 0; i < 25; i++) {
    G.DAT_00628370[i] = cityDx[i] & 0xFF; // signed byte
    G.DAT_006283a0[i] = cityDy[i] & 0xFF;
  }
}

/**
 * Parse RULES.TXT content and populate flat memory arrays.
 * All field offsets verified against decompiled/block_00410000.c
 */
export function loadRules(text) {
  const lines = text.split('\n');
  let section = '';
  let improveIdx = 0; // @IMPROVE
  let wonderIdx = 0;  // @ENDWONDER
  let civIdx = 0;     // @CIVILIZE
  let unitIdx = 0;    // @UNITS
  let terrainIdx = 0; // @TERRAIN
  let govIdx = 0;     // @GOVERNMENTS
  let leaderIdx = 0;  // @LEADERS
  let caravanIdx = 0; // @CARAVAN
  let orderIdx = 0;   // @ORDERS
  let diffIdx = 0;    // @DIFFICULTY
  let attIdx = 0;     // @ATTITUDES
  const cosmicValues = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.replace(/;.*$/, '').trim();

    if (trimmed.startsWith('@')) {
      section = trimmed;
      continue;
    }
    if (!trimmed) continue;

    // ══════════════════════════════════════════════════════════
    // @COSMIC — 22 sequential byte values starting at DAT_0064bcc8
    // Source: FUN_00419d23 (block_00410000.c:5060)
    // ══════════════════════════════════════════════════════════
    if (section === '@COSMIC') {
      const val = parseInt(trimmed);
      if (!isNaN(val)) cosmicValues.push(val);
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @CARAVAN — 16 entries, string names only (no gameplay values)
    // Source: FUN_0041b00e (block_00410000.c:5583)
    // DAT_0064b168[i*4] = name ref (uint32, display only)
    // ══════════════════════════════════════════════════════════
    if (section === '@CARAVAN' && caravanIdx < 16) {
      caravanIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @ORDERS — 12 entries (indices 1-12), string names + key chars
    // Source: FUN_0041b00e (block_00410000.c:5589)
    // DAT_00655490[i*8] = name ref, DAT_00655494[i*8] = key char
    // ══════════════════════════════════════════════════════════
    if (section === '@ORDERS' && orderIdx < 12) {
      orderIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @DIFFICULTY — 6 entries, string names only
    // Source: FUN_0041b00e (block_00410000.c:5597)
    // DAT_0064ba10[i*4] = name ref (uint32, display only)
    // ══════════════════════════════════════════════════════════
    if (section === '@DIFFICULTY' && diffIdx < 6) {
      diffIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @ATTITUDES — 9 entries, string names only
    // Source: FUN_0041b00e (block_00410000.c:5602)
    // DAT_0064b9c0[i*4] = name ref (uint32, display only)
    // ══════════════════════════════════════════════════════════
    if (section === '@ATTITUDES' && attIdx < 9) {
      attIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @IMPROVE — 67 entries (0x43), stride 8
    // Source: FUN_0041a422 (block_00410000.c:5242)
    //
    // RULES.TXT: Name, cost(×10), upkeep, prereq_tech
    //
    // Binary layout: base DAT_0064c480, stride 8
    //   DAT_0064c488[i*8] (+0x08): name ref (uint32)
    //   DAT_0064c48c[i*8] (+0x0C): cost (×10 for shields)
    //   DAT_0064c48d[i*8] (+0x0D): upkeep
    //   DAT_0064c48e[i*8] (+0x0E): prereq tech (0xFE=none)
    // ══════════════════════════════════════════════════════════
    if (section === '@IMPROVE' && improveIdx < 67) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 4) continue;

      const cost = parseInt(fields[1]);
      const upkeep = parseInt(fields[2]);
      const prereq = techIndex(fields[3]);

      // Write using absolute array addresses (flat memory handles sharing)
      G.DAT_0064c48c[improveIdx * 8] = cost;
      G.DAT_0064c48d[improveIdx * 8] = upkeep;
      G.DAT_0064c48e[improveIdx * 8] = prereq;

      improveIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @ENDWONDER — 28 entries, 1 byte each
    // Source: FUN_0041a422 (block_00410000.c:5274)
    // DAT_0064ba28[i] = tech that obsoletes wonder i
    // ══════════════════════════════════════════════════════════
    if (section === '@ENDWONDER' && wonderIdx < 28) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 1) continue;
      G.DAT_0064ba28[wonderIdx] = techIndex(fields[0]);
      wonderIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @GOVERNMENTS — 7 entries, stride 4 (name ref only)
    // Source: FUN_0041ab18 (block_00410000.c:5454)
    // Binary: DAT_0064b9a0[i*4] = name ref, DAT_00654fe0[i*8] = male title, DAT_00654fe4[i*8] = female title
    // Gameplay values are in @LEADERS, not here. This is display data.
    // ══════════════════════════════════════════════════════════
    if (section === '@GOVERNMENTS' && govIdx < 7) {
      // Just count — names are string refs we can't use in headless mode
      govIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @LEADERS — 21 entries, stride 0x30 (48 bytes)
    // Source: FUN_0041ab18 (block_00410000.c:5464)
    //
    // RULES.TXT: leader, female_leader, female_flag, color, style, tribe, adjective,
    //            attack, expand, civilize, [govt, male_title, female_title, ...]
    //
    // Binary layout (DAT_006554f8 + i*0x30):
    //   +0x00 (DAT_006554f8): color/style byte
    //   +0x01 (DAT_006554f9): city style byte
    //   +0x02 (DAT_006554fa): plural/personality byte
    //   +0x04 (DAT_006554fc): personality type
    //   +0x06 (DAT_006554fe): civilized tendency (int16)
    //   +0x08 (DAT_00655500): expand tendency (int16)
    //   +0x0A (DAT_00655502): computed title ref (int16)
    //   +0x0C (DAT_00655504): attack name ref (int16)
    //   +0x0E (DAT_00655506): defend name ref (int16)
    //   +0x10 (DAT_00655508): male leader name ref (int16)
    //   +0x12 (DAT_0065550a): female leader name ref (int16)
    //   +0x14 (DAT_0065550c): government bonus table (7×4 bytes)
    // ══════════════════════════════════════════════════════════
    if (section === '@LEADERS' && leaderIdx < 21) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 11) continue;

      // Fields: leader, female_leader, female_flag, color, style, tribe, adjective,
      //         attack, expand, civilize, [govt overrides...]
      const femaleFlag = parseInt(fields[2]);
      const color = parseInt(fields[3]);
      const style = parseInt(fields[4]);
      // fields[5] = tribe name, fields[6] = adjective (string refs, skip)
      const attack = parseInt(fields[7]);
      const expand = parseInt(fields[8]);
      const civilize = parseInt(fields[9]);

      const base = leaderIdx * 0x30;
      G.DAT_006554f8[base] = color;       // +0x00
      G.DAT_006554f8[base + 1] = style;   // +0x01 (DAT_006554f9)
      G.DAT_006554f8[base + 2] = civilize & 0xFF; // +0x02 (DAT_006554fa)
      // Store attack/expand as int16 LE
      const feOff = base + 6;  // DAT_006554fe offset
      G.DAT_006554f8[feOff] = attack & 0xFF;
      G.DAT_006554f8[feOff + 1] = (attack >> 8) & 0xFF;
      const exOff = base + 8;  // DAT_00655500 offset
      G.DAT_006554f8[exOff] = expand & 0xFF;
      G.DAT_006554f8[exOff + 1] = (expand >> 8) & 0xFF;

      leaderIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @CIVILIZE — 100 entries max, stride 0x10 (16 bytes)
    // Source: FUN_0041a046 (block_00410000.c:5137)
    //
    // RULES.TXT: Name, AI_Value, Modifier, Prereq1, Prereq2, Epoch, Category
    //
    // Binary layout (DAT_00627680 + i*0x10):
    //   +0x04: name ref (uint32, skipped)
    //   +0x09: enabled flag (0 or 1, set based on prereqs)
    //   +0x0A: AI value
    //   +0x0B: civilized modifier (signed)
    //   +0x0C: category (0-4)
    //   +0x0D: epoch (0-3)
    //   +0x0E: prereq 1 (tech index, 0xFE=none)
    //   +0x0F: prereq 2 (tech index, 0xFE=none)
    // ══════════════════════════════════════════════════════════
    if (section === '@CIVILIZE' && civIdx < 100) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 6) continue;

      const aiValue = parseInt(fields[1]);
      const modifier = parseInt(fields[2]); // signed
      const prereq1 = techIndex(fields[3]);
      const prereq2 = techIndex(fields[4]);
      const epoch = parseInt(fields[5]);
      const category = fields.length > 6 ? parseInt(fields[6]) : 0;

      const base = civIdx * 0x10;
      G.DAT_00627680[base + 0x0A] = aiValue;
      G.DAT_00627680[base + 0x0B] = modifier & 0xFF; // signed → unsigned byte
      G.DAT_00627680[base + 0x0C] = category;
      G.DAT_00627680[base + 0x0D] = epoch;
      G.DAT_00627680[base + 0x0E] = prereq1;
      G.DAT_00627680[base + 0x0F] = prereq2;
      // Enabled flag: 1 if prereq1 is not 0xFE, else 0
      G.DAT_00627680[base + 0x09] = (prereq1 !== 0xFE) ? 1 : 0;

      civIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @UNITS — 62 entries max, stride 0x14 (20 bytes)
    // Source: FUN_0041a5c4 (block_00410000.c:5294)
    //
    // RULES.TXT field order:
    //   Name, obsolete_tech, domain, move_rate, range,
    //   attack, defense, hit_points, firepower,
    //   cost, hold_count, role, prereq_tech, flags
    //
    // Binary memory layout (DAT_0064b1bc + i*0x14):
    //   +0x00: flags (uint16 LE, bottom 16 bits of 15-bit flag string)
    //   +0x02-0x03: upper bytes of flags write (zeroed)
    //   +0x04: obsolete_tech (byte, 0xFE = none)
    //   +0x05: domain (byte, 0=land 1=air 2=sea)
    //   +0x06: move_rate × DAT_0064bcc8 (movement multiplier)
    //   +0x07: range (byte)
    //   +0x08: attack (byte)
    //   +0x09: defense (byte)
    //   +0x0A: hit_points × 10 (byte)
    //   +0x0B: firepower (byte)
    //   +0x0C: cost (byte)
    //   +0x0D: hold_count (byte, carry capacity for ships)
    //   +0x0E: role (byte)
    //   +0x0F: prereq_tech (byte, 0xFE = none)
    // ══════════════════════════════════════════════════════════
    if (section === '@UNITS' && unitIdx < 62) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 14) continue;

      const obsoleteTech = techIndex(fields[1]);
      const domain = parseInt(fields[2]);
      const moveRate = parseInt(fields[3]);
      const range = parseInt(fields[4]);
      const attack = parseInt(fields[5]);
      const defense = parseInt(fields[6]);
      const hitPoints = parseInt(fields[7]);
      const firepower = parseInt(fields[8]);
      const cost = parseInt(fields[9]);
      const holdCount = parseInt(fields[10]);
      const role = parseInt(fields[11]);
      const prereqTech = techIndex(fields[12]);
      const flagStr = fields[13] || '000000000000000';
      const flagBits = parseInt(flagStr, 2) || 0;

      const base = unitIdx * 0x14;
      // +0x00-0x01: flags (uint16 LE)
      G.DAT_0064b1bc[base + 0x00] = flagBits & 0xFF;
      G.DAT_0064b1bc[base + 0x01] = (flagBits >> 8) & 0xFF;
      G.DAT_0064b1bc[base + 0x02] = 0; // upper flag bytes (zeroed by & 0xffff)
      G.DAT_0064b1bc[base + 0x03] = 0;
      G.DAT_0064b1bc[base + 0x04] = obsoleteTech;
      G.DAT_0064b1bc[base + 0x05] = domain;
      G.DAT_0064b1bc[base + 0x06] = moveRate * (cosmicValues[0] || 3); // × movement multiplier
      G.DAT_0064b1bc[base + 0x07] = range;
      G.DAT_0064b1bc[base + 0x08] = attack;
      G.DAT_0064b1bc[base + 0x09] = defense;
      G.DAT_0064b1bc[base + 0x0A] = hitPoints * 10; // × 10 per binary (cVar2 * '\n')
      G.DAT_0064b1bc[base + 0x0B] = firepower;
      G.DAT_0064b1bc[base + 0x0C] = cost;
      G.DAT_0064b1bc[base + 0x0D] = holdCount;
      G.DAT_0064b1bc[base + 0x0E] = role;
      G.DAT_0064b1bc[base + 0x0F] = prereqTech;

      unitIdx++;
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // @TERRAIN — 33 entries (11 base + 22 specials), stride 0x18 (24 bytes)
    // Source: FUN_0041a95f (block_00410000.c:5386)
    //
    // RULES.TXT field order (base terrains):
    //   Name, move_cost, defense, food, shields, trade,
    //   irr_type, irr_bonus, irr_turns, irr_ai,
    //   mine_type, mine_bonus, mine_turns, mine_ai,
    //   transform_to
    //
    // Binary memory layout (DAT_00627cc0 + i*0x18):
    //   +0x04: name ref (4 bytes, skipped)
    //   +0x08: move_cost (byte)      ← DAT_00627cc8
    //   +0x09: defense (byte)        ← DAT_00627cc9
    //   +0x0A: food yield (byte)     ← DAT_00627cca[+0]
    //   +0x0B: shields yield (byte)  ← DAT_00627cca[+1]
    //   +0x0C: trade yield (byte)    ← DAT_00627cca[+2]
    //   +0x0D: transform_to (byte)   ← DAT_00627ccd
    //   +0x0E: irr_transform (byte)  ← DAT_00627cce[+0]
    //   +0x0F: mine_transform (byte) ← DAT_00627cce[+1]
    //   +0x10: irr_bonus (byte)      ← DAT_00627cd0[+0]
    //   +0x11: mine_bonus (byte)     ← DAT_00627cd0[+1]
    //   +0x12: irr_turns (byte)      ← DAT_00627cd2[+0]
    //   +0x13: mine_turns (byte)     ← DAT_00627cd2[+1]
    //   +0x14: irr_ai_level (byte)   ← DAT_00627cd4[+0]
    //   +0x15: mine_ai_level (byte)  ← DAT_00627cd4[+1]
    // ══════════════════════════════════════════════════════════
    if (section === '@TERRAIN' && terrainIdx < 33) {
      const fields = trimmed.split(',').map(s => s.trim());
      if (fields.length < 6) continue;

      const moveCost = parseInt(fields[1]);
      const defense = parseInt(fields[2]);
      const food = parseInt(fields[3]);
      const shields = parseInt(fields[4]);
      const trade = parseInt(fields[5]);

      const base = terrainIdx * 0x18;
      G.DAT_00627cc0[base + 0x08] = moveCost;
      G.DAT_00627cc0[base + 0x09] = defense;
      G.DAT_00627cc0[base + 0x0A] = food;
      G.DAT_00627cc0[base + 0x0B] = shields;
      G.DAT_00627cc0[base + 0x0C] = trade;

      // Irrigate/mine/transform only for base terrains (first 11)
      if (terrainIdx < 11 && fields.length >= 15) {
        const irrType = fields[6];
        const irrBonus = parseInt(fields[7]);
        const irrTurns = parseInt(fields[8]);
        const irrAi = parseInt(fields[9]);
        const mineType = fields[10];
        const mineBonus = parseInt(fields[11]);
        const mineTurns = parseInt(fields[12]);
        const mineAi = parseInt(fields[13]);
        const transformStr = fields[14].trim();

        G.DAT_00627cc0[base + 0x0D] = terrainIndex(transformStr); // transform-to
        G.DAT_00627cc0[base + 0x0E] = terrainIndex(irrType);      // irrigate transform
        G.DAT_00627cc0[base + 0x0F] = terrainIndex(mineType);     // mine transform
        G.DAT_00627cc0[base + 0x10] = irrBonus;
        G.DAT_00627cc0[base + 0x11] = mineBonus;
        G.DAT_00627cc0[base + 0x12] = irrTurns;
        G.DAT_00627cc0[base + 0x13] = mineTurns;
        G.DAT_00627cc0[base + 0x14] = irrAi;
        G.DAT_00627cc0[base + 0x15] = mineAi;
      }

      terrainIdx++;
      continue;
    }
  }

  // ══════════════════════════════════════════════════════════
  // Set cosmic parameters at DAT_0064bcc8..DAT_0064bcdd
  // Source: FUN_00419d23 (block_00410000.c:5060)
  // Each value is one byte, stored sequentially
  // ══════════════════════════════════════════════════════════
  const cosmicAddrs = [
    'DAT_0064bcc8', // 0:  Road movement multiplier (3)
    'DAT_0064bcc9', // 1:  Trireme loss chance (2)
    'DAT_0064bcca', // 2:  Food per citizen per turn (2)
    'DAT_0064bccb', // 3:  Food box rows (10) — forced even
    'DAT_0064bccc', // 4:  Shield box rows (10)
    'DAT_0064bccd', // 5:  Settlers eat ≤Monarchy (1)
    'DAT_0064bcce', // 6:  Settlers eat ≥Communism (2)
    'DAT_0064bccf', // 7:  First unhappy city size (7)
    'DAT_0064bcd0', // 8:  Riot factor (14)
    'DAT_0064bcd1', // 9:  Aqueduct size limit (8)
    'DAT_0064bcd2', // 10: Sewer size limit (12)
    'DAT_0064bcd3', // 11: Tech paradigm (10)
    'DAT_0064bcd4', // 12: Engineer transform time (20)
    'DAT_0064bcd5', // 13: Monarchy free support (3)
    'DAT_0064bcd6', // 14: Communism free support (3)
    'DAT_0064bcd7', // 15: Fundamentalism free support (10)
    'DAT_0064bcd8', // 16: Communism palace equiv distance (0)
    'DAT_0064bcd9', // 17: Fundamentalism science penalty % (50)
    'DAT_0064bcda', // 18: Production change penalty % (50)
    'DAT_0064bcdb', // 19: Max paradrop range (10)
    'DAT_0064bcdc', // 20: Mass/Thrust paradigm (75)
    'DAT_0064bcdd', // 21: Max fundamentalism science rate (5)
  ];

  for (let i = 0; i < Math.min(cosmicValues.length, cosmicAddrs.length); i++) {
    G[cosmicAddrs[i]] = cosmicValues[i];
  }

  // Force food box rows even (per binary: if odd, add 1)
  if (cosmicValues.length > 3 && (G.DAT_0064bccb & 1) !== 0) {
    G.DAT_0064bccb = G.DAT_0064bccb + 1;
  }

  // Count enabled techs (per binary: DAT_00655b1a)
  let enabledTechs = 0;
  for (let i = 0; i < civIdx; i++) {
    if (G.DAT_00627680[i * 0x10 + 0x09] !== 0) enabledTechs++;
  }
  G.DAT_00655b1a = enabledTechs;

  return {
    govCount: govIdx,
    leaderCount: leaderIdx,
    caravanCount: caravanIdx,
    orderCount: orderIdx,
    difficultyCount: diffIdx,
    attitudeCount: attIdx,
    improveCount: improveIdx,
    wonderCount: wonderIdx,
    techCount: civIdx,
    unitCount: unitIdx,
    terrainCount: terrainIdx,
    cosmicCount: cosmicValues.length,
    cosmicValues,
  };
}
