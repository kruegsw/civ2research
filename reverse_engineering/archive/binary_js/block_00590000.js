// ═══════════════════════════════════════════════════════════════════
// block_00590000.js — Mechanical transpilation of block_00590000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00590000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00590000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s32, w16 } from './mem.js';
import { FUN_005ae052 } from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

let DAT_00634ca0 = 0;       // reentry guard for move_unit
let DAT_006ad0cc = 0;       // move_unit flags byte
let DAT_006ad0d0 = 0;       // is-current-player flag
let DAT_00655b16 = 0;       // current turn number
let DAT_00655aee = 0;       // global unit flags
let DAT_006560f0 = [];      // unit X position (short, stride 0x20)
let DAT_006560f2 = [];      // unit Y position (short, stride 0x20)
let DAT_006560f4 = [];      // unit status flags (ushort, stride 0x20)
let DAT_006560f6 = [];      // unit type (byte, stride 0x20)
let DAT_006560f7 = [];      // unit owner (byte, stride 0x20)
let DAT_006560f8 = [];      // unit movement points used (byte, stride 0x20)
let DAT_006560f9 = [];      // unit visibility mask (byte, stride 0x20)
let DAT_006560fa = [];      // unit hit points (byte, stride 0x20)
let DAT_006560fb = [];      // unit last-direction (byte, stride 0x20)
let DAT_006560fc = [];      // unit cargo index (byte, stride 0x20)
let DAT_006560fd = [];      // unit counter (byte, stride 0x20)
let DAT_006560fe = [];      // unit long-move counter (byte, stride 0x20)
let DAT_006560ff = [];      // unit orders (byte, stride 0x20)
let DAT_0065610a = [];      // unit alive flag (int, stride 0x20)
let DAT_00656102 = [];      // unit goto X (short, stride 0x20)
let DAT_00656104 = [];      // unit goto Y (short, stride 0x20)
let DAT_00656106 = [];      // unit home city (short, stride 0x20)
let DAT_00656108 = [];      // unit transport link (short, stride 0x20)
let DAT_0064b1b0 = 0;       // scratch Y for movement display
let DAT_0064b1b4 = 0;       // scratch X for movement display
let DAT_0064b1b8 = [];      // unit type name pointer (stride 0x14)
let DAT_0064b1bc = [];      // unit type flagsA (byte, stride 0x14)
let DAT_0064b1bd = [];      // unit type flagsB (byte, stride 0x14)
let DAT_0064b1c1 = [];      // unit type domain (byte, stride 0x14)
let DAT_0064b1c3 = [];      // unit type fuel (byte, stride 0x14)
let DAT_0064b1c4 = [];      // unit type attack (byte, stride 0x14)
let DAT_0064b1c5 = [];      // unit type defense (byte, stride 0x14)
let DAT_0064b1c9 = [];      // unit type cargo capacity (byte, stride 0x14)
let DAT_0064b1ca = [];      // unit type role (byte, stride 0x14)
let DAT_0064bcc8 = 0;       // movement rate constant
let DAT_0064bcc9 = 0;       // trireme loss chance
let DAT_0064bcdc = 0;       // spaceship speed constant
let DAT_0064c6c0 = [];      // diplomacy treaty flags array (stride 0x594)
let DAT_0064c6f0 = [];      // diplomacy peace counter
let DAT_0064c832 = [];      // per-civ continental threat tracking (short, stride 0x594)
let DAT_0064ca32 = [];      // civ zone info
let DAT_0064caa0 = [];      // spaceship flags (byte, stride 0x594)
let DAT_0064caa2 = [];      // spaceship arrival year (short, stride 0x594)
let DAT_0064caa4 = [];      // spaceship support (short, stride 0x594)
let DAT_0064caa6 = [];      // spaceship fuel reserve (short, stride 0x594)
let DAT_0064caa8 = [];      // spaceship component counts (short[6], stride 0x594)
let DAT_0064caaa = [];      // spaceship fuel count (short, stride 0x594)
let DAT_0064caac = [];      // spaceship propulsion count (short, stride 0x594)
let DAT_0064caae = [];      // spaceship habitation count (short, stride 0x594)
let DAT_0064cab0 = [];      // spaceship life support count (short, stride 0x594)
let DAT_0064cab2 = [];      // spaceship solar panel count (short, stride 0x594)
let DAT_0064c5a4 = [];      // spaceship tech weight table
let DAT_0064c5a6 = [];      // spaceship tech requirement table
let DAT_0064c5ae = 0;       // spaceship build tech
let DAT_0064c6a2 = [];      // civ total score
let DAT_0064c6be = [];      // civ ceasefire flag
let DAT_0064f340 = [];      // city X (short, stride 0x58)
let DAT_0064f342 = [];      // city Y (short, stride 0x58)
let DAT_0064f348 = [];      // city owner (byte, stride 0x58)
let DAT_0064f349 = [];      // city size (byte, stride 0x58)
let DAT_0064f360 = [];      // city name (stride 0x58)
let DAT_0064f394 = [];      // city alive (int, stride 0x58)
let DAT_006d1da0 = 0;       // current player civ index
let DAT_00654fa8 = 0;       // auto-play mode
let DAT_00655b00 = 0;       // current unit index (short)
let DAT_00655b02 = 0;       // game mode / network type
let DAT_00655b07 = 0;       // cease fire flag byte
let DAT_00655b08 = 0;       // difficulty level
let DAT_00655b09 = 0;       // barbarian level
let DAT_00655b0a = 0;       // active civ bitmask
let DAT_00655b0b = 0;       // human player bitmask
let DAT_00655b0d = 0;       // civ count index
let DAT_00655b18 = 0;       // total city count
let DAT_00655b91 = 0;       // gender flag
let DAT_00655aea = 0;       // scenario flags
let DAT_00655af0 = 0;       // game option flags
let DAT_00655af8 = 0;       // current turn
let DAT_00655afa = 0;       // target arrival year
let DAT_00655afc = 0;       // launch turn
let DAT_00655afe = 0;       // scratch unit index
let DAT_00655bce = 0;       // space tech bitmask
let DAT_00655c18 = 0;       // space victory tech id
let DAT_00655c22 = [];      // civ ranking byte array
let DAT_00655ae8 = 0;       // scenario flags byte
let DAT_006ad0e0 = 0;       // spaceship estimated arrival year
let DAT_006ad0e4 = 0;       // spaceship mass
let DAT_006ad0e8 = 0;       // spaceship energy ratio %
let DAT_006ad0ec = 0;       // spaceship success probability %
let DAT_006ad0f0 = 0;       // spaceship fuel ratio %
let DAT_006ad0f4 = 0;       // spaceship flight time
let DAT_006ad0dc = 0;       // spaceship life support ratio %
let DAT_006ad2f7 = 0;       // network turnbased flag
let DAT_006ad2f8 = 0;       // saved network mode
let DAT_006ad300 = 0;       // server seat index
let DAT_006ad2f5 = 0;       // connected to server flag
let DAT_006ad308 = 0;       // multiplayer player count
let DAT_006ad30c = [];      // seat table names
let DAT_006ad558 = [];      // seat-to-civ mapping
let DAT_006ad359 = [];      // seat active flags
let DAT_006ad684 = 0;       // realtime movement lock enabled
let DAT_006ad8cc = 0;       // mp_lock_map state
let DAT_006ad8d0 = 0;       // mp_unlock_map state
let DAT_0064ba48 = [];      // mp lock ack (stride 0x18)
let DAT_0064ba4c = [];      // mp lock result (stride 0x18)
let DAT_0064ba50 = [];      // mp lock src X (stride 0x18)
let DAT_0064ba54 = [];      // mp lock src Y (stride 0x18)
let DAT_0064ba58 = [];      // mp lock dst X (stride 0x18)
let DAT_0064ba5c = [];      // mp lock dst Y (stride 0x18)
let DAT_00628044 = 0;       // game running flag
let DAT_00628350 = [];      // direction dx table
let DAT_00628360 = [];      // direction dy table
let DAT_00627cc8 = [];      // terrain movement cost table (stride 0x18)
let DAT_006c914c = 0;       // MP stacker response
let DAT_006c8fac = 0;       // network send pending
let DAT_006c8fa0 = 0;       // network receive pending
let DAT_006c8fb0 = 0;       // last callback size
let DAT_006c8fb4 = 0;       // lost connection count
let DAT_006c8fb8 = 0;       // last legal netmsg size
let DAT_006c8fbc = 0;       // network state flag
let DAT_006c8fc0 = [];      // per-slot lost connection count
let DAT_006c8fe0 = [];      // network message counters
let DAT_006c9284 = 0;       // last legal sequence number
let DAT_006c9288 = 0;       // network mode id
let DAT_00636058 = 0;       // stack movement flag
let DAT_00633584 = 0;       // wonders built flag
let DAT_00633e4c = 0;       // combat source X
let DAT_00633e50 = 0;       // combat source Y
let DAT_00633e54 = 0;       // combat target unit
let DAT_00634c9c = 0;       // movement intercept flag
let DAT_0062804c = 0;       // something cleared on move
let DAT_00634f60 = [];      // spaceship part config table (stride 0xc, int entries)
let DAT_00634f64 = [];      // spaceship base limits array[6*3]
let DAT_00634f68 = [];      // spaceship weight table
let DAT_00634f70 = 0;       // spaceship fuel limit
let DAT_00634f7c = 0;       // spaceship propulsion limit
let DAT_00634f88 = 0;       // spaceship habitation limit
let DAT_00634f94 = 0;       // spaceship life support limit
let DAT_00634fa0 = 0;       // spaceship solar panel limit
let DAT_00635094 = 0;       // RNG seed
let DAT_00635098 = 0;       // last legal net message type
let _DAT_00673b08 = 0;      // network player bitmask
let DAT_006cec84 = 0;       // active popup instance
let DAT_006ad678 = null;     // popup stack pointer
let DAT_00635a9c = 0;        // popup stack index
let DAT_00635a58 = [];       // popup stack array
let DAT_006359c0 = 0;        // UI background override
let DAT_006359c4 = 0;        // custom parent window handle
let DAT_006359cc = 0;        // popup position X override
let DAT_006359d0 = 0;        // popup position Y override
let DAT_006359fc = 0;        // popup param 1
let DAT_006359f8 = 0;        // popup param 2
let DAT_006359f4 = 0;        // popup param 3
let DAT_00635a00 = 0;        // popup param 4
let DAT_00635a04 = 0;        // popup param 5
let DAT_00635a08 = 0;        // popup param 6
let DAT_00635a0c = 0;        // popup param 7
let DAT_00635a10 = 0;        // popup param 8
let DAT_00635a14 = 0;        // popup param 9
let DAT_00635a18 = 0;        // popup label 1
let DAT_00635a1c = 0;        // popup label 2
let DAT_00635a20 = 0;        // popup label 3
let DAT_00635a24 = 0;        // popup label 4
let DAT_00635a28 = 0;        // popup label 5
let DAT_00635a2c = 0;        // popup label 6
let DAT_00635a30 = 0;        // popup label 7
let DAT_00635a34 = 0;        // popup default width
let DAT_00635a38 = 0;        // popup default height
let PTR_DAT_006359e4 = null;  // popup font ptr
let PTR_DAT_006359e8 = null;  // popup schema ptr
let PTR_DAT_006359ec = null;  // popup margin ptr
let PTR_DAT_00635a48 = [];    // popup button label ptrs
let DAT_006ceca8 = 0;         // default font
let DAT_006cec78 = 0;         // default schema
let DAT_006cec88 = 0;         // default margin
let DAT_006cec98 = [];         // popup label resource ids
let DAT_00634718 = 0;         // UI active flag
let DAT_00628420 = 0;         // string resource table
let DAT_00628468 = 0;         // net sequence counter
let DAT_00654c74 = 0;         // map width/height
let DAT_00654c7c = 0;         // map config
let DAT_00654b70 = 0;         // scenario seed
let DAT_00654fac = 0;         // map option 1
let DAT_00654fae = 0;         // map option 2
let DAT_0064bcb4 = 0;         // game speed
let DAT_0064bcb6 = 0;         // game speed 2
let DAT_006d1160 = 0;         // map config extra 1
let DAT_006d1162 = 0;         // map config extra 2
let DAT_006ad59c = '';         // game name string
let DAT_006665b0 = '';         // player name string
let DAT_00666570 = '';         // password string
let DAT_0064bc62 = '';         // scenario path
let DAT_006af220 = [];         // combat log overflow count
let DAT_006af260 = [];         // combat log tail index
let DAT_006af280 = [];         // combat log head index
let DAT_006af2a0 = [];         // combat log entries (stride 0x27d8 * civ + 0x22 * idx)
let DAT_006af2a2 = [];         // combat log field
let DAT_006af2a4 = [];         // combat log field
let DAT_006af2a6 = [];         // combat log field
let DAT_006af2a8 = [];         // combat log field
let DAT_006af2aa = [];         // combat log civ name (strncpy dest, 0x18 bytes)
let DAT_006af2c1 = [];         // combat log null term
let DAT_0063e948 = 0;          // combat log UI active
let DAT_0062f004 = 0;          // debug/test flag
let DAT_006a85a4 = 0;          // pedia scroll state
let DAT_006a677c = 0;          // pedia enabled
let DAT_006ad908 = 0;          // pedia lock
let _DAT_006cec80 = 0;         // timestamp
let DAT_00633a84 = 0;          // auto-save flag
let DAT_0064c48c = [];          // pedia data fields (stride 8)
let DAT_0064c48e = [];          // pedia data fields (stride 8)
let DAT_00626a2c = 0;          // state flag
let _DAT_0064caa2 = 0;         // overlap alias for spaceship arrival


// ═══════════════════════════════════════════════════════════════════
// String constants (s_ prefixed in C)
// ═══════════════════════════════════════════════════════════════════
const s_NOTONMAP_00634d2c = 'NOTONMAP';
const s_AMPHIB_00634d4c = 'AMPHIB';
const s_NONCOMBAT_00634d54 = 'NONCOMBAT';
const s_FIGHTER_00634d60 = 'FIGHTER';
const s_EXPEL_00634d68 = 'EXPEL';
const s_NOEXPEL_00634dc4 = 'NOEXPEL';
const s_UPMINE_00634d70 = 'UPMINE';
const s_UPMINE_00634d80 = 'UPMINE';
const s_UPYOURS_00634d78 = 'UPYOURS';
const s_UPYOURSTOO_00634d88 = 'UPYOURSTOO';
const s_UPYOURSTOO_00634d94 = 'UPYOURSTOO';
const s_UPYOURSTOO_00634da0 = 'UPYOURSTOO';
const s_UPYOURS_00634dac = 'UPYOURS';
const s_UPYOURS_00634db4 = 'UPYOURS';
const s_UPYOURS_00634dbc = 'UPYOURS';
const s_FATIGUE_00634dcc = 'FATIGUE';
const s_NOLANDFALL_00634dd4 = 'NOLANDFALL';
const s_LANDFALL_00634de0 = 'LANDFALL';
const s_OCCUPY_00634dec = 'OCCUPY';
const s_LANDING_00634df4 = 'LANDING';
const s_ALLIEDREPAIR_00634d3c = 'ALLIEDREPAIR';
const s_LONGMOVE_00634e60 = 'LONGMOVE';
const s_TRIREME_00634e58 = 'TRIREME';
const s_SERVERCONNECTTIME_00634e3c = 'SERVERCONNECTTIME';
const s_FUEL_00634e50 = 'FUEL';


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════


// FUN_00590607 — popup close thunk for move_unit epilog
export function FUN_00590607() {
  FUN_0059df8a();
}

// FUN_0059061d — SEH unwind for move_unit
// Source: decompiled/block_00590000.c FUN_0059061d (14 bytes)
export function FUN_0059061d() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0059062c — move_unit (17963 bytes, the main unit movement fn)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0059062c(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let bVar4 = false;
  let bVar5 = false;
  let bVar6 = false;
  let cVar7;
  let bVar8;
  let SVar9;
  let uVar10;
  let iVar11;
  let uVar12;
  let iVar15;
  let uVar16;
  let iVar17;
  let iVar18;
  let uVar19;
  let local_120;
  let local_118;
  let local_114;
  let local_100;
  let local_fc;
  let local_f8;
  let local_f0;
  let local_ec;
  let local_e4;
  let local_d8;
  let local_d0;
  let local_c4;
  let local_bc;
  let local_b4;
  let local_a4;
  let aiStack_a0 = [0, 0, 0, 0, 0, 0, 0, 0];
  let aiStack_80 = [0, 0, 0, 0, 0, 0, 0, 0];
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c = 0;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30 = 1;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c = 0;
  let local_8;
  let pbVar13;
  let pbVar14;

  bVar6 = false;
  bVar4 = false;

  if ((DAT_00634ca0 !== 0) || (DAT_0065610a[param_1 * 0x20] === 0) ||
      (s8(DAT_006560f0[param_1 * 0x20]) < 0) ||
      (s8(DAT_006560f2[param_1 * 0x20]) < 0)) {
    return 0;
  }
  DAT_00634ca0 = 1;
  DAT_006ad0cc = param_3;
  FUN_00407ff0();

  // ── main while(true) loop ──
  let goto_LAB_00594a80 = false;
  let goto_LAB_00594aaa = false;
  let goto_LAB_00593d80 = false;
  let break_main_while = false;

  while (true) {
    iVar15 = param_1;
    DAT_00634c9c = 0;
    bVar5 = false;
    local_a4 = 0;
    local_f0 = 0;
    goto_LAB_00594a80 = false;
    goto_LAB_00594aaa = false;
    goto_LAB_00593d80 = false;
    break_main_while = false;

    if ((DAT_006ad0cc & 1) !== 0) {
      DAT_0062804c = 0;
    }
    local_2c = DAT_00655b16;
    DAT_00655aee = DAT_00655aee | 4;
    local_bc = s8(DAT_006560f0[param_1 * 0x20]);
    local_d0 = s8(DAT_006560f2[param_1 * 0x20]);
    local_fc = local_d0;
    local_ec = local_bc;
    if (param_2 >= 0) {
      local_ec = FUN_005ae052(s8(DAT_00628350[param_2]) + local_bc);
      local_fc = s8(DAT_00628360[param_2]) + local_d0;
    }
    cVar1 = s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
    bVar2 = u8(DAT_006560f7[param_1 * 0x20]);
    uVar10 = s8(bVar2);
    iVar11 = FUN_0043cf76(local_bc, local_d0);
    if (iVar11 < 0) {
      FUN_005b99e8(local_bc, local_d0, uVar10, 1);
    }
    DAT_006ad0d0 = (DAT_00654fa8 === 0 && DAT_006d1da0 === uVar10) ? 1 : 0;
    iVar11 = FUN_004087c0(local_ec, local_fc);
    if (iVar11 === 0) {
      if (((DAT_006ad0cc & 1) !== 0) && (DAT_006ad0d0 !== 0)) {
        FUN_00410030(s_NOTONMAP_00634d2c, 0, 0);
      }
      param_1 = iVar15;
      if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
        FUN_005b6787(param_1);
      }
      goto_LAB_00594a80 = true;
    }

    if (!goto_LAB_00594a80) {
      if ((2 < DAT_00655b02) && (DAT_006ad684 !== 0) &&
          ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0 && (param_2 >= 0))) {
        iVar11 = FUN_00594d42(uVar10, local_bc, local_d0, local_ec, local_fc, local_30);
        if (iVar11 === 0) {
          if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
            FUN_005b6787(param_1);
          }
          goto_LAB_00594aaa = true;
        } else {
          bVar6 = true;
        }
      }
    }

    if (!goto_LAB_00594a80 && !goto_LAB_00594aaa) {
      cVar7 = s8(FUN_005b89bb(local_bc, local_d0));
      bVar8 = u8(FUN_005b89bb(local_ec, local_fc));
      local_58 = bVar8;
      local_54 = (cVar7 === 10) ? 1 : 0;
      local_40 = (local_58 === 10) ? 1 : 0;
      local_44 = FUN_005b8da4(local_ec, local_fc);
      local_28 = FUN_005b2e69(local_ec, local_fc);
      if (local_28 >= 0) {
        local_44 = s8(DAT_006560f7[local_28 * 0x20]);
      }
      iVar11 = FUN_0043cf76(local_ec, local_fc);
      if (iVar11 >= 0) {
        local_44 = s8(DAT_0064f348[iVar11 * 0x58]);
      }

      if (param_2 < 0) {
        FUN_005b6787(param_1);
        goto_LAB_00593d80 = true;
      }
    }

    if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
      DAT_006560f4[param_1 * 0x20] = DAT_006560f4[param_1 * 0x20] | 0x40;

      // ── cVar1 === 0 (land/sea unit not air) ──
      if (cVar1 === 0) {
        // ZOC check: no enemy unit, own ZOC blocks
        if ((local_28 < 0) && (FUN_005b4d8c(local_bc, local_d0, uVar10) !== 0) &&
            (FUN_005b4d8c(local_ec, local_fc, uVar10) !== 0) &&
            (local_54 === 0) &&
            ((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 2) === 0)) {
          if ((DAT_006ad0d0 !== 0) && ((DAT_006ad0cc & 1) !== 0)) {
            FUN_0046e020(0x69, 1, 0, 0);
            if ((DAT_006ad0d0 !== 0) && ((DAT_00655aea & 0x100) !== 0)) {
              FUN_00410030(0, 0, 0);
            }
            FUN_0058fda9(local_ec, local_fc, uVar10);
          }
          param_1 = iVar15;
          if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
            FUN_005b6787(param_1);
          }
          goto_LAB_00594a80 = true;
        }

        if (!goto_LAB_00594a80) {
          // Spy entering city
          if ((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 7) &&
              (iVar11 >= 0)) {
            if ((local_44 !== uVar10) && ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0)) {
              if (2 < DAT_00655b02) {
                FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
              }
              FUN_004105f8(local_bc, local_d0, uVar10);
              FUN_0046e287(10);
              FUN_005b5bab(param_1, 1);
              FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
              FUN_005b36df(param_1, local_bc, local_d0, 1);
              if (2 < DAT_00655b02) {
                FUN_0046b14d(0x75, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
              }
              FUN_0047cea6(local_ec, local_fc);
            }
            iVar17 = FUN_0058fedb(param_1, iVar11);
            param_1 = iVar15;
            if (iVar17 !== 0) { goto_LAB_00594a80 = true; }
          }
        }

        if (!goto_LAB_00594a80) {
          // Diplomat approaching enemy unit
          if ((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 6) &&
              (local_44 >= 0) && (local_44 !== uVar10)) {
            if (iVar11 >= 0) {
              if ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0) {
                if (2 < DAT_00655b02) {
                  FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
                }
                FUN_004105f8(local_bc, local_d0, uVar10);
                FUN_0046e287(0x14);
                FUN_005b5bab(param_1, 1);
                FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
                FUN_005b36df(param_1, local_bc, local_d0, 1);
                if (2 < DAT_00655b02) {
                  FUN_0046b14d(0x75, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
                }
                FUN_0047cea6(local_ec, local_fc);
              }
              FUN_004c6bf5(param_1, iVar11);
              param_1 = iVar15;
              goto_LAB_00594a80 = true;
            }
            if (!goto_LAB_00594a80) {
              iVar17 = FUN_004c9ebd(param_1, local_28, uVar10);
              param_1 = iVar15;
              if (iVar17 !== 0) { goto_LAB_00594a80 = true; }
              if (!goto_LAB_00594a80) {
                local_44 = FUN_005b8da4(local_ec, local_fc);
              }
            }
          }
        }

        if (!goto_LAB_00594a80) {
          // Allied repair / peace territory
          if ((iVar11 >= 0) && (local_44 >= 0) &&
              (local_44 !== uVar10) && ((DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 8) !== 0)) {
            local_14 = FUN_005b29aa(param_1);
            local_14 = (local_14 / 10) | 0;
            iVar17 = FUN_0043d20a(iVar11, 2);
            if (iVar17 !== 0) {
              local_14 = local_14 << 1;
            }
            local_14 = FUN_005adfa0(local_14, 0, DAT_006560fa[param_1 * 0x20]);
            DAT_006560fa[param_1 * 0x20] = u8(DAT_006560fa[param_1 * 0x20] - local_14);
            FUN_005b6787(param_1);
            DAT_006560f4[param_1 * 0x20] = DAT_006560f4[param_1 * 0x20] & 0xffbf;
            if ((DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
                (DAT_006d1da0 === uVar10)) {
              FUN_0046e020(0x68, 1, 0, 0);
              uVar16 = FUN_00493c7d(local_44);
              FUN_0040ff60(1, uVar16);
              FUN_004271e8(2, DAT_0064b1b8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
              FUN_00410030(s_ALLIEDREPAIR_00634d3c, 0, 0);
            }
            param_1 = iVar15;
            if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
              FUN_005b6787(param_1);
            }
            goto_LAB_00594a80 = true;
          }
        }
      } // end cVar1 === 0

      // ── cannot land on ocean if not transport ──
      if (!goto_LAB_00594a80) {
        if ((cVar1 === 0) && (local_40 !== 0)) {
          param_1 = iVar15;
          if ((local_44 !== uVar10) || (FUN_005b50ad(local_28, 6) < 1)) {
            goto_LAB_00594a80 = true;
          } else {
            bVar5 = true;
          }
        }
      }

      // ── enemy unit on destination tile ──
      if (!goto_LAB_00594a80 && (local_28 >= 0) && (s8(DAT_006560f7[local_28 * 0x20]) !== uVar10)) {
        local_44 = s8(DAT_006560f7[local_28 * 0x20]);

        // Amphib check
        if ((local_54 !== 0) &&
            (cVar1 === 0) &&
            ((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 4) === 0)) {
          param_1 = iVar15;
          if (((DAT_006ad0cc & 1) !== 0) && (DAT_006ad0d0 !== 0)) {
            FUN_00410030(s_AMPHIB_00634d4c, 0, 0);
          }
          goto_LAB_00594a80 = true;
        }

        if (!goto_LAB_00594a80) {
          // Cannot attack from ocean to land
          if ((local_40 === 0) &&
              ((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) !== 0)) {
            param_1 = iVar15;
            goto_LAB_00594a80 = true;
          }
        }

        if (!goto_LAB_00594a80) {
          // Capture enemy transport
          if (((DAT_0064b1bc[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] & 8) !== 0) &&
              (FUN_005b50ad(local_28, 2) === 1) &&
              ((1 << (bVar2 & 0x1f) & u8(DAT_006560f9[local_28 * 0x20])) === 0) &&
              (s8(DAT_006560f7[local_28 * 0x20]) !== bVar2) &&
              ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
            param_1 = iVar15;
            if ((DAT_006ad0cc & 1) !== 0) {
              DAT_006560ff[param_1 * 0x20] = 0xff;
              FUN_005b490e(local_28, uVar10);
              FUN_0047cea6(local_ec, local_fc);
              FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
            }
            goto_LAB_00594a80 = true;
          }
        }

        if (!goto_LAB_00594a80) {
          // Diplomat unit approaching enemy unit
          if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 6) {
            DAT_006560ff[param_1 * 0x20] = 0xff;
            local_f0 = DAT_00655b0b & (1 << (bVar2 & 0x1f));
            param_1 = iVar15;
            goto_LAB_00594a80 = true;
          }
        }

        if (!goto_LAB_00594a80) {
          // Non-combat unit cannot attack
          if (s8(DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) {
            if (((DAT_006ad0cc & 1) !== 0) && (DAT_006ad0d0 !== 0) &&
                ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
              FUN_0046e020(0x69, 0, 0, 0);
              FUN_00410030(s_NONCOMBAT_00634d54, 0, 0);
            }
            param_1 = iVar15;
            if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
              FUN_005b6787(param_1);
            }
            goto_LAB_00594a80 = true;
          }
        }

        if (!goto_LAB_00594a80) {
          // Fighter range check
          if ((iVar11 < 0) && (FUN_005b8d15(local_ec, local_fc) < 0) &&
              (FUN_005b50ad(local_28, 7) !== 0) &&
              ((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) === 0) &&
              (FUN_005b50ad(local_28, 9) === 0)) {
            if (((DAT_006ad0cc & 1) !== 0) && (DAT_006ad0d0 !== 0)) {
              FUN_00410030(s_FIGHTER_00634d60, 0, 0);
            }
            param_1 = iVar15;
            if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
              FUN_005b6787(param_1);
            }
            goto_LAB_00594a80 = true;
          }
        }

        if (!goto_LAB_00594a80) {
          // Diplomat expel logic
          if ((s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) === 6) &&
              (FUN_005b50ad(local_28, 2) === 1) &&
              ((DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 6) !== 0)) {
            local_20 = FUN_0043d07a(local_ec, local_fc, -1, -1, -1);
            if ((local_20 < 0) || (s8(DAT_0064f348[local_20 * 0x58]) !== uVar10)) {
              if ((DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
                FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]);
                if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) !== 6) {
                  FUN_004271e8(1, DAT_00628420 + 0x234);
                }
                FUN_00410030(s_NOEXPEL_00634dc4, 0, 0);
              }
            } else {
              uVar16 = FUN_00410070(local_44);
              FUN_0040ff60(0, uVar16);
              FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]);
              uVar16 = FUN_00493c7d(uVar10);
              FUN_0040ff60(2, uVar16);
              if (((DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 8) === 0) &&
                  ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
                if (DAT_00654fa8 === 0) {
                  local_e4 = FUN_004442e0(s_EXPEL_00634d68, local_28);
                }
              } else {
                local_e4 = 0;
              }
              param_1 = iVar15;
              if (local_e4 === 2) { goto_LAB_00594a80 = true; }
              if (!goto_LAB_00594a80 && local_e4 === 0) {
                if (((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) ||
                    ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0)) {
                  if (2 < DAT_00655b02) {
                    FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
                  }
                  FUN_004105f8(local_bc, local_d0, uVar10);
                  FUN_0046e287(10);
                  FUN_005b5bab(param_1, 1);
                  FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
                  FUN_005b36df(param_1, local_bc, local_d0, 1);
                  if (2 < DAT_00655b02) {
                    FUN_0046b14d(0x75, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
                  }
                  FUN_0047cea6(local_ec, local_fc);
                }
                local_f8 = -1;
                local_18 = -1;
                if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) !== 6) {
                  local_18 = 9999;
                }
                for (local_20 = 0; local_20 < DAT_00655b18; local_20 = local_20 + 1) {
                  if ((s32(DAT_0064f394, local_20 * 0x58) !== 0) &&
                      (s8(DAT_0064f348[local_20 * 0x58]) === local_44)) {
                    if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) === 6) {
                      local_3c = s8(DAT_0064f349[local_20 * 0x58]);
                      iVar17 = FUN_0043d20a(local_20, 1);
                      if (iVar17 !== 0) { local_3c = local_3c + 0x32; }
                      if (local_18 < local_3c) {
                        local_18 = local_3c;
                        local_f8 = local_20;
                      }
                    } else {
                      local_3c = FUN_005ae31d(local_bc, local_d0,
                          s8(DAT_0064f340[iVar11 * 0x58]),
                          s8(DAT_0064f342[iVar11 * 0x58]));
                      if (local_3c < local_18) {
                        local_f8 = local_20;
                        local_18 = local_3c;
                      }
                    }
                  }
                }
                if (local_f8 >= 0) {
                  local_20 = local_f8;
                  FUN_005b36df(local_28, s8(DAT_0064f340[local_f8 * 0x58]),
                      s8(DAT_0064f342[local_f8 * 0x58]), 1);
                  DAT_006560f9[local_28 * 0x20] = 0;
                  FUN_0040ff60(3, DAT_0064f360[local_20 * 0x58]);
                }
                FUN_0047cea6(local_ec, local_fc);
                FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);

                // Expel notification logic (extensive diplomacy messages)
                if ((DAT_00654fa8 === 0) && ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0)) {
                  if (DAT_00655b02 < 3) {
                    FUN_0046e020(0x5d, 0, 0, 0);
                    FUN_004442e0(s_UPMINE_00634d80, local_28);
                  } else if (DAT_006d1da0 === local_44) {
                    FUN_0046e020(0x5d, 0, 0, 0);
                    FUN_004442e0(s_UPMINE_00634d70, local_28);
                    if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) {
                      FUN_00511880(0x60, DAT_006ad30c + s32(DAT_006ad558, uVar10 * 4) * 0x54, 4, 0, local_28, 0);
                    }
                  } else {
                    FUN_00511880(0x5f, DAT_006ad30c + s32(DAT_006ad558, local_44 * 4) * 0x54, 4, 0, local_28, 0);
                    if (DAT_006d1da0 === uVar10) {
                      FUN_0046e020(0x5d, 0, 0, 0);
                      FUN_004442e0(s_UPYOURS_00634d78, local_28);
                    }
                  }
                } else if ((DAT_00654fa8 === 0) &&
                    ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
                    ((DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 8) !== 0)) {
                  if (DAT_00655b02 < 3) {
                    FUN_0046e020(0x5d, 0, 0, 0);
                    FUN_004442e0(s_UPYOURSTOO_00634da0, local_28);
                  } else if (DAT_006d1da0 === uVar10) {
                    FUN_0046e020(0x5d, 0, 0, 0);
                    FUN_004442e0(s_UPYOURSTOO_00634d88, local_28);
                    if ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0) {
                      FUN_00511880(0x61, DAT_006ad30c + s32(DAT_006ad558, local_44 * 4) * 0x54, 4, 0, local_28, 0);
                    }
                  } else {
                    FUN_00511880(0x61, DAT_006ad30c + s32(DAT_006ad558, uVar10 * 4) * 0x54, 4, 0, local_28, 0);
                    if (((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0) &&
                        (DAT_006d1da0 === local_44)) {
                      FUN_0046e020(0x5d, 0, 0, 0);
                      FUN_004442e0(s_UPYOURSTOO_00634d94, local_28);
                    }
                  }
                } else if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) {
                  if (DAT_00655b02 < 3) {
                    if (DAT_00654fa8 === 0) {
                      FUN_0046e020(0x5d, 0, 0, 0);
                      FUN_004442e0(s_UPYOURS_00634dbc, local_28);
                    }
                  } else if (DAT_006d1da0 === uVar10) {
                    if (DAT_00654fa8 === 0) {
                      FUN_0046e020(0x5d, 0, 0, 0);
                      FUN_004442e0(s_UPYOURS_00634dac, local_28);
                      if ((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0) {
                        FUN_00511880(0x60, DAT_006ad30c + s32(DAT_006ad558, local_44 * 4) * 0x54, 4, 0, local_28, 0);
                      }
                    }
                  } else if (DAT_00654fa8 === 0) {
                    FUN_00511880(0x60, DAT_006ad30c + s32(DAT_006ad558, uVar10 * 4) * 0x54, 4, 0, local_28, 0);
                    if (((1 << (u8(local_44) & 0x1f) & DAT_00655b0b) !== 0) &&
                        (DAT_006d1da0 === local_44)) {
                      FUN_0046e020(0x5d, 0, 0, 0);
                      FUN_004442e0(s_UPYOURS_00634db4, local_28);
                    }
                  }
                  iVar17 = FUN_00598d45(local_44);
                  if (iVar17 === 0) {
                    uVar12 = _rand();
                    uVar19 = uVar12 >> 31;
                    FUN_00456f20(local_44, uVar10, ((uVar12 ^ uVar19) - uVar19 & 3 ^ uVar19) - uVar19);
                  } else if ((DAT_0064c6c0[uVar10 * 4 + local_44 * 0x594] & 0x20) === 0) {
                    DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] =
                        DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] | 0x20;
                  } else {
                    DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] =
                        DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] & 0xffffffd9;
                    DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] =
                        DAT_0064c6c0[local_44 * 0x594 + uVar10 * 4] | 0x40;
                  }
                }
                goto_LAB_00594a80 = true;
              }
            }
          }
        }

        if (!goto_LAB_00594a80) {
          // Fatigue check
          iVar17 = FUN_005b2c3d(param_1);
          if (iVar17 < DAT_0064bcc8) {
            if ((DAT_006ad0d0 === 0) || ((DAT_006ad0cc & 1) === 0)) {
              if (((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) &&
                  (FUN_005b2c3d(param_1) < (DAT_0064bcc8 - 1))) {
                param_1 = iVar15;
                goto_LAB_00594a80 = true;
              }
            } else {
              uVar16 = FUN_005b2c3d(param_1);
              FUN_00421da0(0, uVar16);
              FUN_004c4210(1, DAT_0064bcc8);
              iVar17 = FUN_004442e0(s_FATIGUE_00634dcc, param_1);
              param_1 = iVar15;
              if (iVar17 !== 0) { goto_LAB_00594a80 = true; }
            }
          }
        }

        if (!goto_LAB_00594a80) {
          DAT_00655b00 = param_1;
          DAT_006560f4[param_1 * 0x20] = DAT_006560f4[param_1 * 0x20] & 0xfeff;
          if ((DAT_006ad0cc & 2) === 0) {
            iVar17 = FUN_00580341(param_1, param_2, 1);
            if (iVar17 === 0) {
              local_f0 = 1;
              param_1 = iVar15;
            } else {
              local_f0 = 0;
              param_1 = iVar15;
            }
          } else {
            iVar17 = FUN_00580341(param_1, param_2, 1);
            param_1 = iVar15;
            if (iVar17 !== 0) {
              local_4c = 1;
              iVar15 = DAT_00655b00;
              local_fc = local_d0;
              local_ec = local_bc;
              goto_LAB_00593d80 = true;
            }
          }
          if (!goto_LAB_00593d80) {
            goto_LAB_00594a80 = true;
          }
        }
      }
    } // end main block

    // ── air unit on ocean with no carrier (domain === 2) ──
    if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
      if ((local_40 !== 0) || (iVar11 >= 0) || (cVar1 !== 2)) {
        break_main_while = true;
      } else {
        param_1 = iVar15;
        if ((DAT_006ad0d0 === 0) ||
            (FUN_005b8ca6(local_bc, local_d0) >= 0)) {
          goto_LAB_00594a80 = true;
        }
        if (!goto_LAB_00594a80) {
          if (DAT_00655b16 === local_2c) {
            DAT_006560ff[param_1 * 0x20] = 0xff;
          }
          local_2c = 0;
          local_100 = -1;
          local_50 = 0;
          for (param_1 = FUN_005b2d39(param_1); param_1 >= 0; param_1 = FUN_005b2c82(param_1)) {
            if ((s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) &&
                ((DAT_006560ff[param_1 * 0x20] !== 3) ||
                 (s8(DAT_00656102[param_1 * 0x20]) < 0) ||
                 (s8(DAT_00656102[param_1 * 0x20]) === iVar15))) {
              local_50 = 1;
              iVar17 = FUN_005b2c3d(param_1);
              if (DAT_0064bcc8 <= iVar17) {
                local_100 = param_1;
                break;
              }
            }
          }
          if (local_100 < 0) {
            param_1 = iVar15;
            if ((DAT_00654fa8 === 0) && (local_50 !== 0) && ((DAT_006ad0cc & 1) !== 0)) {
              FUN_004442e0(s_NOLANDFALL_00634dd4, iVar15);
            }
            goto_LAB_00594a80 = true;
          }
          if (!goto_LAB_00594a80) {
            if ((DAT_00654fa8 === 0) && ((DAT_006ad0cc & 1) !== 0)) {
              local_e4 = FUN_004442e0(s_LANDFALL_00634de0, iVar15);
              param_1 = iVar15;
              if (local_e4 === 0) { goto_LAB_00594a80 = true; }
            }
            if (!goto_LAB_00594a80) {
              param_1 = local_100;
              DAT_006560ff[local_100 * 0x20] = 0xff;
            }
          }
        }
      }
    }

    if (break_main_while) break;
    if (goto_LAB_00594a80 || goto_LAB_00594aaa || goto_LAB_00593d80) {
      // fall through to end-of-loop handling below
    } else {
      continue;
    }

    // Handle goto targets — these all eventually reach LAB_00594a80
    if (goto_LAB_00593d80) {
      // LAB_00593d80 handling is done after the main while loop
      break;
    }
    if (goto_LAB_00594a80 || goto_LAB_00594aaa) {
      break;
    }
  } // end while(true)

  // ── Post while-loop: city combat / enemy city on dest ──
  if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
    // Code after `break` from while loop
    if ((iVar11 >= 0) && (s8(DAT_0064f348[iVar11 * 0x58]) !== uVar10)) {
      local_44 = s8(DAT_0064f348[iVar11 * 0x58]);
      if ((cVar1 !== 0) &&
          ((cVar1 !== 1) || (s8(DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 0))) {
        if (s8(DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) < 99) {
          param_1 = iVar15;
          if (((DAT_006ad0cc & 1) !== 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
              (DAT_006ad0d0 !== 0)) {
            FUN_0046e020(0x69, 0, 0, 0);
            FUN_00410030(s_OCCUPY_00634dec, 0, 0);
          }
        } else if ((DAT_006ad0cc & 2) === 0) {
          local_f0 = 1;
          param_1 = iVar15;
        } else {
          iVar17 = FUN_0057f9e3(uVar10, local_ec, local_fc, 1);
          if (iVar17 === 0) {
            FUN_005b5d93(param_1, 1);
            FUN_0047cea6(local_bc, local_d0);
            FUN_0046b14d(0x72, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
            param_1 = iVar15;
          } else {
            DAT_0064c6f0[uVar10 * 0x594 + local_44] = 0;
            param_1 = iVar15;
          }
        }
        goto_LAB_00594a80 = true;
      }
      if (!goto_LAB_00594a80) {
        if ((DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 0xe) !== 0) {
          if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) {
            DAT_006560ff[param_1 * 0x20] = 0xff;
            param_1 = iVar15;
            goto_LAB_00594a80 = true;
          }
          if (!goto_LAB_00594a80) {
            if (((DAT_006ad0cc & 1) !== 0) && (DAT_006ad0d0 !== 0)) {
              iVar17 = FUN_00579ed0(uVar10, local_44, 0xe);
              param_1 = iVar15;
              if (iVar17 !== 0) { goto_LAB_00594a80 = true; }
            }
          }
        }
      }
    }
  }

  // ── Movement cost calculation ──
  if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
    iVar17 = FUN_005b2c3d(param_1);
    param_1 = iVar15;
    if (iVar17 === 0) { goto_LAB_00594a80 = true; }
  }

  if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
    if (cVar1 === 0) {
      pbVar13 = FUN_005b8931(local_bc, local_d0);
      pbVar14 = FUN_005b8931(local_ec, local_fc);
      if (((pbVar13[1] & 0x22) === 0) || ((pbVar14[1] & 0x22) === 0)) {
        if ((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 2) === 0) {
          if (((pbVar13[1] & 0x12) === 0) || ((pbVar14[1] & 0x12) === 0)) {
            if (((pbVar14[0] & pbVar13[0] & 0x80) !== 0) &&
                (FUN_005ae10e(local_bc, local_ec) === 1)) {
              if (local_d0 === local_fc || local_d0 - local_fc < 0) {
                local_114 = -(local_d0 - local_fc) + 1;
              } else {
                local_114 = local_d0 - local_fc;
              }
              if (local_114 === 1) {
                local_24 = 1;
              } else {
                local_24 = s8(DAT_00627cc8[local_58 * 0x18]) * DAT_0064bcc8;
              }
            } else {
              local_24 = s8(DAT_00627cc8[local_58 * 0x18]) * DAT_0064bcc8;
            }
          } else {
            local_24 = 1;
          }
        } else {
          local_24 = 1;
        }
      } else {
        local_24 = 0;
      }
    } else {
      local_24 = DAT_0064bcc8;
    }

    // ── Random MP check / exhaustion ──
    iVar17 = FUN_005b2c3d(param_1);
    if ((iVar17 < local_24) && (cVar1 === 0) && (DAT_006560f8[param_1 * 0x20] !== 0) &&
        (((DAT_006ad0d0 !== 0 && ((DAT_006ad0cc & 1) !== 0)) ||
         ((DAT_006d1da0 === uVar10 && ((DAT_006ad0cc & 1) !== 0))) ||
         (((DAT_006ad0cc & 2) !== 0 && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)))))) {
      if (local_24 === 1 || (local_24 - 1) < 0) {
        local_118 = 0;
      } else {
        local_118 = _rand();
        local_118 = local_118 % local_24;
      }
      iVar17 = FUN_005b2c3d(param_1);
      if (iVar17 <= local_118) {
        FUN_005b6787(param_1);
        local_f0 = 1;
        goto_LAB_00594a80 = true;
      }
    }
  }

  if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
    if ((DAT_006ad0cc & 2) === 0) {
      local_f0 = 1;
      goto_LAB_00594a80 = true;
    }
  }

  // ── Execute movement (actual move, combat resolution) ──
  if (!goto_LAB_00594a80 && !goto_LAB_00594aaa && !goto_LAB_00593d80) {
    bVar8 = u8(DAT_006560f8[param_1 * 0x20]);
    local_1c = bVar8;
    DAT_006560f8[param_1 * 0x20] = u8(DAT_006560f8[param_1 * 0x20] + local_24);

    // AI movement logic checks
    if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) {
      if (((((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 6) ||
            ((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) &&
             (s8(DAT_0064b1c5[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * 2 <
              s8(DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14])))) &&
           (DAT_006560ff[param_1 * 0x20] === 0x0b)) &&
          (((bVar8 !== 0) &&
            (cVar7 = s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]),
             FUN_005b2c3d(param_1) <= (cVar7 !== 6 ? 1 : 0)) &&
           (FUN_005b2a39(param_1) > local_24)))) &&
         ((FUN_005ae1b0(local_ec, local_fc,
                        s8(DAT_00656102[param_1 * 0x20]),
                        s8(DAT_00656104[param_1 * 0x20])) === 1) ||
          (((FUN_005b49cf(local_ec, local_fc, uVar10) !== 0 ||
             ((DAT_00655b0b & DAT_006560f9[param_1 * 0x20]) !== 0)) &&
            (FUN_005b49cf(local_bc, local_d0, uVar10) === 0))))) {
        goto_LAB_00594a80 = true;
      }
      if (!goto_LAB_00594a80) {
        if ((((s8(DAT_006560fb[param_1 * 0x20]) ^ 4) === param_2) && (local_1c !== 0)) &&
            ((s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 1) &&
             (FUN_005b50ad(param_1, 2) < 3))) {
          FUN_005b6787(param_1);
          goto_LAB_00594a80 = true;
        }
      }
      if (!goto_LAB_00594a80) {
        if (((local_28 >= 0) && (local_44 === uVar10)) && (iVar11 < 0) &&
            ((cVar1 === 0) &&
             (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 6))) {
          iVar17 = FUN_005b2c3d(param_1);
          iVar18 = FUN_005b50ad(local_28, 2);
          if (((iVar17 === 0 ? 2 : 4)) <= iVar18) {
            FUN_005b6787(param_1);
            goto_LAB_00594a80 = true;
          }
        }
      }
    }

    // Barbarian ocean check
    if (!goto_LAB_00594a80) {
      if (((uVar10 === 0) && (local_40 === 0)) &&
          ((FUN_005b8b65(local_bc, local_d0, DAT_006d1da0) !== 0) &&
           (((1 << (u8(DAT_006d1da0) & 0x1f) & u8(DAT_006560f9[param_1 * 0x20])) === 0) &&
            (s8(DAT_006560f7[param_1 * 0x20]) !== (DAT_006d1da0 & 0xff))) &&
           (iVar15 = FUN_0043d07a(local_bc, local_d0, -1, -1, -1), iVar15 >= 0) &&
           (s8(DAT_0064f348[iVar15 * 0x58]) === DAT_006d1da0))) {
        iVar15 = FUN_005b8931(local_bc, local_d0);
        DAT_006560f9[param_1 * 0x20] = u8(iVar15[4] | DAT_006560f9[param_1 * 0x20]);
      }

      // Contact tracking
      if (((iVar11 >= 0) && (local_44 !== uVar10)) &&
          (FUN_005b8b65(local_ec, local_fc, DAT_006d1da0) !== 0) &&
          (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + uVar10 * 4] & 0x80) !== 0) ||
           ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + local_44 * 4] & 0x80) !== 0) ||
           (DAT_006d1da0 === local_44))) {
        FUN_005b490e(param_1, DAT_006d1da0);
      }

      // Per-civ visibility and interception setup
      for (local_34 = 1; local_34 < 8; local_34 = local_34 + 1) {
        aiStack_a0[local_34] = 0;
        aiStack_80[local_34] = aiStack_a0[local_34];
        if (((1 << (u8(local_34) & 0x1f) & DAT_00655b0a) !== 0) &&
            ((2 < DAT_00655b02) || (DAT_006d1da0 === local_34)) &&
            (((DAT_00654fa8 !== 0 && ((_DAT_00673b08 & (1 << (u8(local_34) & 0x1f))) !== 0)) ||
              ((1 << (u8(local_34) & 0x1f) & DAT_00655b0b) !== 0)))) {
          if ((((1 << (u8(local_34) & 0x1f) & u8(DAT_006560f9[param_1 * 0x20])) === 0) &&
               (s8(DAT_006560f7[param_1 * 0x20]) !== (local_34 & 0xff))) &&
              (uVar10 !== local_34) && (DAT_00655b07 === 0)) {
            for (local_38 = 0; local_38 < 8; local_38 = local_38 + 1) {
              local_10 = FUN_005ae052(s8(DAT_00628350[local_38]) + local_ec);
              local_60 = s8(DAT_00628360[local_38]) + local_fc;
              iVar15 = FUN_004087c0(local_10, local_60);
              if ((iVar15 !== 0) && (FUN_005b8da4(local_10, local_60) === local_34)) {
                aiStack_a0[local_34] = 1;
                break;
              }
            }
          } else {
            aiStack_a0[local_34] = 1;
          }
          if ((DAT_006d1da0 === local_34) && (aiStack_a0[local_34] !== 0)) {
            if (((DAT_006d1da0 === uVar10) || ((DAT_00655aea & 0x1000) !== 0)) || (iVar11 >= 0)) {
              aiStack_80[DAT_006d1da0] = 1;
              SVar9 = GetAsyncKeyState(0x10);
              local_8 = u8(SVar9 >> 8);
              if (local_8 !== 0) {
                aiStack_80[DAT_006d1da0] = 0;
              }
              if ((((local_24 === 0) || (local_8 !== 0)) ||
                  ((DAT_006d1da0 === uVar10 && (cVar1 === 1)))) &&
                 ((DAT_006d1da0 !== uVar10) || (DAT_006560ff[param_1 * 0x20] === 0x0b))) {
                aiStack_80[DAT_006d1da0] = 0;
                DAT_00634c9c = 1;
                if (DAT_006d1da0 === uVar10) {
                  DAT_00634c9c = 2;
                  DAT_0064b1b4 = local_ec;
                  DAT_0064b1b0 = local_fc;
                }
              }
            }
          } else if (((DAT_006d1da0 !== local_34) && (aiStack_a0[local_34] !== 0)) &&
                    ((aiStack_80[local_34] = 1,
                      (local_24 === 0) ||
                      ((uVar10 === local_34 &&
                       (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1)))) &&
                     ((uVar10 !== local_34) || (DAT_006560ff[param_1 * 0x20] === 0x0b)))) {
            aiStack_80[local_34] = 0;
          }
        }
      }

      // Landing notification
      if ((((aiStack_a0[DAT_006d1da0] !== 0) &&
            (FUN_004105f8(local_bc, local_d0, uVar10), local_54 !== 0)) && (local_40 === 0)) &&
          ((DAT_006d1da0 !== uVar10) && (uVar10 !== 0)) &&
          (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) &&
          ((iVar15 = FUN_005b8a81(local_ec, local_fc),
            DAT_0064c832[iVar15 * 2 + uVar10 * 0x594] === 0) &&
           (DAT_0064c832[uVar10 * 0x594 + iVar15 * 2] = DAT_0064c832[uVar10 * 0x594 + iVar15 * 2] + 1,
            (DAT_0064c6c0[local_44 * 4 + uVar10 * 0x594] & 6) === 0)) &&
          ((iVar15 = FUN_0043d07a(local_bc, local_d0, -1, -1, -1), 0 < iVar15) &&
           (s8(DAT_0064f348[iVar15 * 0x58]) === DAT_006d1da0) && (DAT_00654fa8 === 0))) {
        uVar16 = FUN_00493c7d(uVar10);
        FUN_0040ff60(0, uVar16);
        FUN_0040ff60(1, DAT_0064f360[iVar15 * 0x58]);
        FUN_004442e0(s_LANDING_00634df4, param_1);
      }

      // Execute move animation and MP notification
      FUN_004b0b53(0xff, 2, 0, 0, 1);
      if (((DAT_00655b02 < 3) || (DAT_006ad2f7 !== 0)) ||
          ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)) {
        FUN_005b5bab(param_1, 0);
        if (2 < DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 1);
          for (local_34 = 1; local_34 < 8; local_34 = local_34 + 1) {
            if ((DAT_006d1da0 === local_34) || (aiStack_80[local_34] === 0)) {
              if ((DAT_006d1da0 !== local_34) && (aiStack_a0[local_34] !== 0)) {
                FUN_0046b14d(0x72, DAT_006ad30c + s32(DAT_006ad558, local_34 * 4) * 0x54,
                    local_bc, local_d0, 0, 0, 0, 0, 0, 0);
              }
            } else {
              FUN_0046b14d(0x70, DAT_006ad30c + s32(DAT_006ad558, local_34 * 4) * 0x54,
                  param_1, local_bc, local_d0, param_2, -1, 1, 0, 0);
            }
          }
          XD_FlushSendBuffer(5000);
        }
        if (aiStack_80[DAT_006d1da0] === 0) {
          if (aiStack_a0[DAT_006d1da0] !== 0) {
            FUN_0047cea6(local_bc, local_d0);
          }
        } else {
          FUN_0046e020(99, 1, 0, 0);
          FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
        }
        FUN_005b48b1(param_1);
        if (local_40 === 0) {
          FUN_005b496e(param_1, local_44);
        }
        local_a4 = FUN_005b8ffa(local_ec, local_fc);
        FUN_005b3ae0(param_1, local_ec, local_fc, 0);
        FUN_004b0b53(0xff, 2, 0, 0, 1);
      } else {
        // MP realtime path
        local_a4 = FUN_005b8ffa(local_ec, local_fc);
        DAT_006c914c = -2;
        FUN_0046b14d(0x5a, 0, uVar10, local_44, param_1, local_40, local_ec, local_fc, 0, 0);
        bVar4 = true;
        XD_FlushSendBuffer(5000);
        if (aiStack_80[DAT_006d1da0] === 0) {
          if (aiStack_a0[DAT_006d1da0] !== 0) {
            FUN_0047cea6(local_bc, local_d0);
          }
        } else {
          FUN_0046e020(99, 1, 0, 0);
          iVar15 = FUN_005b8931(local_bc, local_d0);
          uVar16 = FUN_005b2e69(local_bc, local_d0, 2);
          iVar17 = FUN_005b50ad(uVar16);
          if (iVar17 === 1) {
            iVar15[1] = iVar15[1] & 0xfe;
          } else if (1 < iVar17) {
            DAT_00633e4c = s8(DAT_006560f0[param_1 * 0x20]);
            DAT_00633e50 = s8(DAT_006560f2[param_1 * 0x20]);
            iVar17 = FUN_005b50ad(param_1, 5);
            if (iVar17 === 0) {
              if (s8(DAT_00656108[param_1 * 0x20]) < 0) {
                if (s8(DAT_00656106[param_1 * 0x20]) < 0) {
                  iVar15[1] = iVar15[1] & 0xfe;
                } else {
                  DAT_00633e54 = s8(DAT_00656106[param_1 * 0x20]);
                }
              } else {
                DAT_00633e54 = s8(DAT_00656108[param_1 * 0x20]);
              }
            } else {
              iVar17 = FUN_005b50ad(param_1, 5);
              if (iVar17 < 2) {
                iVar15[1] = iVar15[1] & 0xfe;
              } else {
                DAT_00633e54 = FUN_005b2d39(param_1);
                let _done = false;
                while (!_done) {
                  if ((DAT_00633e54 !== param_1) &&
                      (s8(DAT_0064b1c1[u8(DAT_006560f6[DAT_00633e54 * 0x20]) * 0x14]) === 2)) {
                    _done = true;
                    break;
                  }
                  DAT_00633e54 = s8(DAT_00656108[DAT_00633e54 * 0x20]);
                  if (DAT_00633e54 < 0) {
                    iVar15[1] = iVar15[1] & 0xfe;
                    _done = true;
                  }
                }
              }
            }
          }
          // LAB_005936b6
          DAT_00636058 = 1;
          FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
          DAT_00636058 = 0;
          uVar16 = FUN_005b2e69(local_bc, local_d0, 2);
          iVar17 = FUN_005b50ad(uVar16);
          if (iVar17 !== 0) {
            if (DAT_006ad2f7 === 0) {
              iVar15[1] = iVar15[1] | 1;
            } else {
              FUN_005b94fc(local_bc, local_d0, 1, 1, 1);
            }
          }
        }
        for (local_34 = 1; local_34 < 8; local_34 = local_34 + 1) {
          if ((DAT_006d1da0 === local_34) || (aiStack_80[local_34] === 0)) {
            if (DAT_006d1da0 !== local_34) {
              FUN_0046b14d(0x72, DAT_006ad30c + s32(DAT_006ad558, local_34 * 4) * 0x54,
                  local_bc, local_d0, 0, 0, 0, 0, 0, 0);
            }
          } else {
            FUN_0046b14d(0x70, DAT_006ad30c + s32(DAT_006ad558, local_34 * 4) * 0x54,
                param_1, local_bc, local_d0, param_2, -1, 1, 0, 0);
          }
        }
        if (local_30 !== 0) {
          iVar15 = FUN_00421bb0();
          while (FUN_00421bb0() - iVar15 < 0xe10 && (DAT_006c914c !== 1)) {
            FUN_0047e94e(1, 1);
          }
          if (DAT_006c914c !== 1) {
            debug_log('move_unit NM_REALTIME_STACKER timeout');
            FUN_00410030(s_SERVERCONNECTTIME_00634e3c, 0, 0);
            DAT_00628044 = 0;
          }
        }
        while ((DAT_006c8fac !== 0) || (DAT_006c8fa0 !== 0)) {
          FUN_0047e94e(1, 0);
        }
        bVar6 = false;
      }

      // Ocean zone tracking
      if (((cVar1 === 0) && (local_54 !== 0)) && (local_40 === 0)) {
        iVar15 = FUN_005b8a81(local_ec, local_fc);
        DAT_0064c832[uVar10 * 0x594 + iVar15 * 2] =
            DAT_0064c832[uVar10 * 0x594 + iVar15 * 2] + 1;
      }

      // Capture city
      if ((iVar11 >= 0) && (local_44 !== uVar10)) {
        DAT_006560fa[param_1 * 0x20] = 0;
        DAT_00655b00 = param_1;
        FUN_0057b5df(iVar11, uVar10, 0);
        param_1 = DAT_00655b00;
      }
      iVar15 = param_1;

      // Barbarian contact
      if (((uVar10 === 0) && (local_40 === 0)) &&
          ((FUN_005b8b65(local_ec, local_fc, DAT_006d1da0) !== 0) &&
           (((1 << (bVar2 & 0x1f) & u8(DAT_006560f9[param_1 * 0x20])) === 0) &&
            (s8(DAT_006560f7[param_1 * 0x20]) !== bVar2)) &&
           (iVar17 = FUN_0043d07a(local_ec, local_fc, -1, -1, -1), iVar17 >= 0) &&
           (s8(DAT_0064f348[iVar17 * 0x58]) === DAT_006d1da0))) {
        iVar17 = FUN_005b8931(local_ec, local_fc);
        FUN_005b4ee2(param_1, iVar17[4]);
      }

      // Clear sentry on coast
      if (((local_54 !== 0) && (iVar11 >= 0)) &&
          (((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
           (s8(DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 0))) {
        for (param_1 = FUN_005b2d39(param_1); param_1 >= 0; param_1 = FUN_005b2c82(param_1)) {
          if (DAT_006560ff[param_1 * 0x20] === 3) {
            DAT_006560ff[param_1 * 0x20] = 0xff;
          }
        }
      }

      goto_LAB_00593d80 = true;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LAB_00593d80 — post-move processing
  // ═══════════════════════════════════════════════════════════════
  if (goto_LAB_00593d80) {
    param_1 = iVar15;
    iVar15 = param_1;
    if ((((DAT_00655b02 < 3) || (DAT_006ad2f7 !== 0)) || (!bVar4)) &&
        ((s8(DAT_00656108[param_1 * 0x20]) >= 0) &&
         (s8(DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0))) {
      FUN_005b389f(param_1, 0);
    }
    FUN_004274a6(param_1, 1);
    FUN_citywin_C494(param_1, local_bc, local_d0);
    if ((((DAT_006d1da0 !== uVar10) && (aiStack_a0[DAT_006d1da0] !== 0)) &&
        ((DAT_00655aea & 0x800) === 0)) &&
        (GetAsyncKeyState(0x10) === 0)) {
      if (((DAT_00655aea & 0x1000) === 0) || (DAT_00634c9c !== 0)) {
        FUN_0046e287(10);
      } else {
        FUN_0046e287(0xf);
      }
    }

    // Air unit landing/crash logic
    if (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1) {
      iVar11 = FUN_005b8ca6(local_ec, local_fc);
      if ((iVar11 < 0) && (FUN_005b8d15(local_ec, local_fc) < 0)) {
        bVar4 = false;
      } else {
        bVar4 = true;
      }
      if (!bVar4) {
        for (local_d8 = FUN_005b2d39(param_1); local_d8 >= 0;
            local_d8 = FUN_005b2c82(local_d8)) {
          if ((DAT_0064b1bc[u8(DAT_006560f6[local_d8 * 0x20]) * 0x14] & 0x80) !== 0) {
            bVar4 = true;
            break;
          }
          if (((DAT_0064b1bc[u8(DAT_006560f6[local_d8 * 0x20]) * 0x14] & 8) !== 0) &&
              ((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) {
            bVar4 = true;
            break;
          }
        }
      }
      if ((bVar4) && (s8(DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1) &&
          (FUN_005b2c3d(param_1) !== 0) && (local_4c !== 0)) {
        bVar4 = false;
      }
      if (bVar4) {
        DAT_006560fd[param_1 * 0x20] = 0;
        FUN_005b6787(param_1);
        FUN_005b389f(param_1, 1);
        FUN_0047cea6(local_ec, local_fc);
        FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
        // goto LAB_00594255 — handled below
      } else {
        if (((s8(DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) ||
            (FUN_005b2c3d(param_1) !== 0)) ||
           (DAT_006560fd[param_1 * 0x20] = u8(DAT_006560fd[param_1 * 0x20] + 1),
            s8(DAT_006560fd[param_1 * 0x20]) <
            s8(DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]))) {
          // goto LAB_00594255 — handled below
        } else {
          // Air unit crash
          if (DAT_006ad0d0 !== 0) {
            if (u8(DAT_006560f6[param_1 * 0x20]) < 0x1e) {
              FUN_0046e020(0x1a, 0, 0, 0);
            } else {
              FUN_0046e020(0x4e, 0, 0, 0);
            }
          }
          local_bc = s8(DAT_006560f0[param_1 * 0x20]);
          local_d0 = s8(DAT_006560f2[param_1 * 0x20]);
          let uVar3 = DAT_006560f6[param_1 * 0x20];
          FUN_005b4391(param_1, 1);
          FUN_0047ce1e(local_bc, local_d0, 0, DAT_006d1da0, 1);
          FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
          if (DAT_006ad0d0 !== 0) {
            FUN_004442a0(s_FUEL_00634e50, uVar3, (DAT_00633584 === 0) ? 0 : 8);
          }
          goto_LAB_00594a80 = true;
        }
      }
    }

    // LAB_00594255 — post-move cleanup for non-crashed units
    if (!goto_LAB_00594a80) {
      // Trireme loss check
      if (((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x20) !== 0) &&
          (DAT_006ad0d0 !== 0) &&
          ((FUN_005b2c3d(param_1) === 0) && (FUN_00453e51(uVar10, 3) === 0))) {
        local_c4 = DAT_0064bcc9;
        iVar11 = FUN_004bd9f0(uVar10, 0x4b);
        if ((iVar11 !== 0) && ((local_c4 = local_c4 * 2) < 3)) {
          local_c4 = 2;
        }
        iVar11 = FUN_004bd9f0(uVar10, 0x39);
        if (iVar11 !== 0) { local_c4 = local_c4 << 1; }
        if ((local_c4 - 1) < 1) {
          local_120 = 0;
        } else {
          local_120 = _rand();
          local_120 = local_120 % local_c4;
        }
        if (local_120 === 0) {
          bVar4 = false;
          for (local_38 = 0; local_38 < 9; local_38 = local_38 + 1) {
            uVar16 = FUN_005ae052(s8(DAT_00628350[local_38]) + local_ec);
            local_48 = s8(DAT_00628360[local_38]) + local_fc;
            iVar11 = FUN_004087c0(uVar16, local_48);
            if ((iVar11 !== 0) && (FUN_005b89e4(uVar16, local_48) === 0)) {
              bVar4 = true;
              break;
            }
          }
          if (!bVar4) {
            if (DAT_006ad0d0 !== 0) { FUN_0046e020(9, 1, 0, 0); }
            local_bc = s8(DAT_006560f0[param_1 * 0x20]);
            local_d0 = s8(DAT_006560f2[param_1 * 0x20]);
            let uVar3 = DAT_006560f6[param_1 * 0x20];
            FUN_005b5d93(param_1, 1);
            FUN_0047ce1e(local_bc, local_d0, 0, DAT_006d1da0, 1);
            FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
            if (DAT_006ad0d0 !== 0) {
              FUN_004442a0(s_TRIREME_00634e58, uVar3, (DAT_00633584 === 0) ? 0 : 8);
            }
            goto_LAB_00594a80 = true;
          }
        }
      }
    }

    if (!goto_LAB_00594a80) {
      // Paratrooper drop check
      if ((local_a4 !== 0) &&
          (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0)) {
        FUN_0058f040(param_1);
      }

      // Carrier rebase — clear orders for empty planes
      if (((cVar1 === 2) &&
           (s8(DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 0)) &&
          ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
          ((FUN_005b2c3d(param_1) === 0) && (FUN_005b53b6(param_1, 0) !== 0))) {
        bVar4 = false;
        for (local_38 = 0; local_38 < 8; local_38 = local_38 + 1) {
          iVar11 = FUN_005ae052(s8(DAT_00628350[local_38]) + local_ec);
          local_48 = s8(DAT_00628360[local_38]) + local_fc;
          iVar17 = FUN_004087c0(iVar11, local_48);
          if (((iVar17 !== 0) && (FUN_005b89e4(iVar11, local_48) === 0)) &&
              (iVar17 = FUN_005b8a81(iVar11, local_48),
               DAT_0064ca32[uVar10 * 0x594 + iVar17] !== 4)) {
            for (local_5c = 0; local_5c < 8; local_5c = local_5c + 1) {
              uVar16 = FUN_005ae052(s8(DAT_00628350[local_5c]) + iVar11);
              iVar17 = s8(DAT_00628360[local_5c]) + local_48;
              iVar18 = FUN_004087c0(uVar16, iVar17);
              if ((iVar18 !== 0) && (FUN_005b8b65(uVar16, iVar17, uVar10) === 0)) {
                bVar4 = true;
                break;
              }
            }
            if (bVar4) break;
          }
        }
        if (bVar4) {
          for (param_1 = FUN_005b2d39(param_1); param_1 >= 0;
              param_1 = FUN_005b2c82(param_1)) {
            if (((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) &&
                (s8(DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0)) &&
               (DAT_006560f8[param_1 * 0x20] === 0)) {
              DAT_006560ff[param_1 * 0x20] = 0xff;
            }
          }
        }
      }

      // Transport boarding
      if (bVar5) {
        FUN_005b2f50(iVar15);
        FUN_005b6787(iVar15);
        for (local_b4 = FUN_005b2d39(iVar15); local_b4 >= 0;
            local_b4 = FUN_005b2c82(local_b4)) {
          if (((s8(DAT_0064b1c1[u8(DAT_006560f6[local_b4 * 0x20]) * 0x14]) === 2) &&
              (bVar8 = u8(DAT_006560f8[local_b4 * 0x20]),
               FUN_005b2a39(local_b4) >= bVar8)) &&
             (FUN_005b542e(local_b4, 0, 0),
              s8(DAT_00656102[iVar15 * 0x20]) === local_b4)) {
            DAT_006560ff[local_b4 * 0x20] = 0xff;
            DAT_00655afe = local_b4;
            break;
          }
        }
        FUN_0047cea6(local_ec, local_fc);
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
      }

      // Long-move counter
      if (DAT_006ad0d0 !== 0) {
        if ((DAT_006560ff[iVar15 * 0x20] === 0x0b) ||
            ((DAT_006560f4[iVar15 * 0x20] & 0x8000) !== 0)) {
          DAT_006560fe[iVar15 * 0x20] = u8(DAT_006560fe[iVar15 * 0x20] + 1);
          if ((s8(DAT_006560fb[iVar15 * 0x20]) ^ 4) === param_2) {
            DAT_006560fe[iVar15 * 0x20] = u8(DAT_006560fe[iVar15 * 0x20] + 0x0f);
          }
          if (s8(DAT_006560fe[iVar15 * 0x20]) > 0x2f) {
            iVar11 = FUN_004442e0(s_LONGMOVE_00634e60, iVar15);
            if (iVar11 !== 0) {
              DAT_006560ff[iVar15 * 0x20] = 0xff;
              DAT_006560f4[iVar15 * 0x20] = DAT_006560f4[iVar15 * 0x20] & 0x7fff;
            }
            DAT_006560fe[iVar15 * 0x20] = 0;
          }
        } else {
          DAT_006560fe[iVar15 * 0x20] = 0;
        }
      }
      DAT_006560fb[iVar15 * 0x20] = u8(param_2);
      local_f0 = 1;
      param_1 = iVar15;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LAB_00594a80 — final cleanup
  // ═══════════════════════════════════════════════════════════════
  if (bVar6) {
    FUN_0059511c(uVar10, local_30);
  }

  // LAB_00594aaa
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  if (DAT_00655b16 !== local_2c) {
    DAT_00634ca0 = 0;
    return 0;
  }
  if (local_f0 === 0) {
    DAT_006560ff[param_1 * 0x20] = 0xff;
    if ((DAT_006560f4[param_1 * 0x20] & 0x8000) !== 0) {
      FUN_005b6787(param_1);
    }
    if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 4) {
      DAT_006560fd[param_1 * 0x20] = u8(DAT_00655af8 & 7);
    }
    if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) {
      if ((DAT_006560f4[param_1 * 0x20] & 0x100) !== 0) {
        DAT_006560ff[param_1 * 0x20] = 2;
      }
      DAT_006560fe[param_1 * 0x20] = u8(DAT_006560fe[param_1 * 0x20] + 1);
      if (s8(DAT_006560fe[param_1 * 0x20]) > 0x13) {
        DAT_006560fe[param_1 * 0x20] = 0;
        FUN_005b6787(param_1);
      }
    }
  } else {
    DAT_006560f4[param_1 * 0x20] = DAT_006560f4[param_1 * 0x20] & 0xfeff;
  }
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  DAT_00634ca0 = 0;
  return local_f0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00594d42 — mp_lock_map (971 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00594d42(param_1, param_2, param_3, param_4, param_5, param_6) {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_14;
  let local_10;
  let local_c;

  DAT_006ad8cc = 1;
  DAT_0064ba4c[param_1 * 0x18] = 0;
  DAT_0064ba48[param_1 * 0x18] = DAT_0064ba4c[param_1 * 0x18];
  if (DAT_006ad2f7 === 0) {
    DAT_006ad8cc = 0;
    FUN_0046b14d(0x51, 0, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
    XD_FlushSendBuffer(60000);
    if (param_6 === 0) {
      uVar1 = 1;
    } else {
      iVar2 = FUN_00421bb0();
      while (true) {
        iVar3 = FUN_00421bb0();
        if ((0xe0f < iVar3 - iVar2) || (DAT_0064ba4c[param_1 * 0x18] !== 0)) break;
        FUN_0047e94e(1, 1);
      }
      if (DAT_0064ba4c[param_1 * 0x18] === 0) {
        debug_log('LockMap: Connection to server timed out');
        FUN_00410030(s_SERVERCONNECTTIME_00634e3c, 0, 0);
        DAT_00628044 = 0;
        uVar1 = 0;
      } else if (DAT_0064ba4c[param_1 * 0x18] === 1) {
        uVar1 = 1;
      } else {
        uVar1 = 0;
      }
    }
  } else {
    local_10 = -1;
    local_14 = -1;
    for (local_c = 1; local_c < 8; local_c = local_c + 1) {
      if (((DAT_0064ba50[local_c * 0x18] === param_2) &&
          (DAT_0064ba54[local_c * 0x18] === param_3)) ||
         ((DAT_0064ba58[local_c * 0x18] === param_2) &&
          (DAT_0064ba5c[local_c * 0x18] === param_3))) {
        local_14 = 0;
        break;
      }
      if (((DAT_0064ba50[local_c * 0x18] === param_4) &&
          (DAT_0064ba54[local_c * 0x18] === param_5)) ||
         ((DAT_0064ba58[local_c * 0x18] === param_4) &&
          (DAT_0064ba5c[local_c * 0x18] === param_5))) {
        local_10 = 0;
        break;
      }
    }
    if ((local_14 === -1) && (local_10 === -1)) {
      DAT_0064ba50[param_1 * 0x18] = param_2;
      DAT_0064ba54[param_1 * 0x18] = param_3;
      DAT_0064ba58[param_1 * 0x18] = param_4;
      DAT_0064ba5c[param_1 * 0x18] = param_5;
      if ((DAT_006d1da0 !== param_1) &&
          (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) &&
           (DAT_006ad359[DAT_006ad558[param_1 * 4] * 0x54] !== 0))) {
        FUN_0046b14d(0x53, DAT_006ad30c + s32(DAT_006ad558, param_1 * 4) * 0x54,
            param_1, 1, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(60000);
      }
      DAT_006ad8cc = 0;
      uVar1 = 1;
    } else {
      if (((DAT_006d1da0 !== param_1) && ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0)) &&
         (DAT_006ad359[DAT_006ad558[param_1 * 4] * 0x54] !== 0)) {
        FUN_0046b14d(0x53, DAT_006ad30c + s32(DAT_006ad558, param_1 * 4) * 0x54,
            param_1, -1, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(60000);
      }
      DAT_006ad8cc = 0;
      uVar1 = 0;
    }
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0059511c — mp_unlock_map (324 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0059511c(param_1, param_2) {
  let iVar1;
  let iVar2;

  DAT_006ad8d0 = 1;
  if (DAT_006ad2f7 === 0) {
    DAT_006ad8d0 = 0;
    DAT_0064ba48[param_1 * 0x18] = 0;
    FUN_0046b14d(0x52, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    if (param_2 !== 0) {
      iVar1 = FUN_00421bb0();
      while (true) {
        iVar2 = FUN_00421bb0();
        if ((0xe0f < iVar2 - iVar1) || (DAT_0064ba48[param_1 * 0x18] !== 0)) break;
        FUN_0047e94e(1, 1);
      }
      if (DAT_0064ba48[param_1 * 0x18] === 0) {
        debug_log('UnlockMap: Connection to server timed out');
        FUN_00410030(s_SERVERCONNECTTIME_00634e3c, 0, 0);
        DAT_00628044 = 0;
      }
    }
  } else {
    _memset(DAT_0064ba48, param_1 * 0x18, -1, 0x18);
    FUN_0046b14d(0x55, 0xff, param_1, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(60000);
    DAT_006ad8d0 = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00596b00 — spaceship_cost_calc (264 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00596b00(param_1, param_2) {
  let iVar1;
  let local_8 = DAT_00634f64[param_2 * 3];
  if ((param_2 === 1) || (param_2 === 2)) {
    iVar1 = (s16(DAT_0064caa8, param_1 * 0x594) + 1) - (param_2 * 2 - 2);
    local_8 = FUN_005adfa0(local_8, 0, ((iVar1 + (iVar1 >> 31 & 3)) >> 2));
  } else if (param_2 !== 0) {
    iVar1 = (s16(DAT_0064caa8, param_1 * 0x594) + 1) - (param_2 * 4 - 0xc);
    local_8 = FUN_005adfa0(local_8, 0, ((iVar1 + (iVar1 >> 31 & 7)) >> 3));
    if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
      local_8 = FUN_005adfa0(local_8, 0, 1);
    }
    if (local_8 < 0) { local_8 = 0; }
  }
  return local_8;
}


// FUN_00596c08 — spaceship_cost_current (89 bytes)
export function FUN_00596c08(param_1, param_2) {
  let sVar1 = s16(DAT_0064caa8, param_1 * 0x594);
  let uVar2 = FUN_00596b00(param_1, param_2);
  return FUN_005adfa0(sVar1, 0, uVar2);
}


// FUN_00596c61 — spaceship_capacity (140 bytes)
export function FUN_00596c61(param_1, param_2) {
  let iVar1, iVar2, iVar3;
  if (param_2 === 0) {
    iVar1 = FUN_00596b00(param_1, 0);
  } else if (param_2 === 1) {
    iVar2 = FUN_00596b00(param_1, 2);
    iVar1 = FUN_00596b00(param_1, 1);
    iVar1 = iVar1 + iVar2;
  } else {
    iVar2 = FUN_00596b00(param_1, 3);
    iVar3 = FUN_00596b00(param_1, 4);
    iVar1 = FUN_00596b00(param_1, 5);
    iVar1 = iVar1 + iVar2 + iVar3;
  }
  return iVar1;
}


// FUN_00596ced — spaceship_base_capacity (79 bytes)
export function FUN_00596ced(param_1) {
  let iVar1;
  if (param_1 === 0) {
    iVar1 = DAT_00634f64[0];
  } else if (param_1 === 1) {
    iVar1 = DAT_00634f7c + DAT_00634f70;
  } else {
    iVar1 = DAT_00634fa0 + DAT_00634f88 + DAT_00634f94;
  }
  return iVar1;
}


// FUN_00596d3c — spaceship_part_total (202 bytes)
export function FUN_00596d3c(param_1, param_2) {
  let iVar1;
  if (param_2 === 0) {
    iVar1 = DAT_0064caa8[param_1 * 0x594];
  } else if (param_2 === 1) {
    iVar1 = DAT_0064caaa[param_1 * 0x594] + DAT_0064caac[param_1 * 0x594];
  } else {
    iVar1 = DAT_0064caae[param_1 * 0x594] + DAT_0064cab0[param_1 * 0x594] + DAT_0064cab2[param_1 * 0x594];
  }
  return iVar1;
}


// FUN_00596e06 — spaceship_part_current (140 bytes)
export function FUN_00596e06(param_1, param_2) {
  let iVar1, iVar2, iVar3;
  if (param_2 === 0) {
    iVar1 = FUN_00596c08(param_1, 0);
  } else if (param_2 === 1) {
    iVar2 = FUN_00596c08(param_1, 2);
    iVar1 = FUN_00596c08(param_1, 1);
    iVar1 = iVar1 + iVar2;
  } else {
    iVar2 = FUN_00596c08(param_1, 3);
    iVar3 = FUN_00596c08(param_1, 4);
    iVar1 = FUN_00596c08(param_1, 5);
    iVar1 = iVar1 + iVar2 + iVar3;
  }
  return iVar1;
}


// FUN_00596e92 — spaceship_population_calc (90 bytes)
export function FUN_00596e92(param_1) {
  let local_8 = 0;
  for (let local_c = 0; local_c < param_1; local_c = local_c + 1) {
    let iVar1 = local_8 + 1;
    if (3 < local_c) { iVar1 = local_8 + 2; }
    local_8 = iVar1;
    if (5 < local_c) { local_8 = local_8 + 1; }
  }
  return local_8;
}


// FUN_00596eec — spaceship_compute_stats (1297 bytes)
export function FUN_00596eec(param_1, param_2) {
  let bVar1, iVar4, iVar6, iVar7, local_1c, local_18, local_14, local_10, local_c, local_8;

  iVar4 = FUN_004a7577(param_1);
  if (iVar4 === 0) {
    iVar4 = FUN_004bd9f0(param_1, 0x20);
    if (iVar4 !== 0) {
      DAT_0064caa0[param_1 * 0x594] = DAT_0064caa0[param_1 * 0x594] | 8;
    }
  }
  bVar1 = DAT_0064caa0[param_1 * 0x594];
  DAT_006ad0e4 = 0;
  for (local_1c = 0; local_1c < 6; local_1c = local_1c + 1) {
    DAT_006ad0e4 = DAT_006ad0e4 +
        DAT_0064caa8[param_1 * 0x594 + local_1c * 2] * DAT_00634f68[local_1c * 0xc];
  }
  local_18 = DAT_006ad0e4;
  for (local_1c = 0; local_1c < 6; local_1c = local_1c + 1) {
    if (DAT_0064caa8[local_1c * 2 + param_1 * 0x594] === 0) {
      local_18 = local_18 + DAT_00634f68[local_1c * 0xc];
    }
  }
  DAT_006ad0ec = 100;
  iVar4 = FUN_00596c08(param_1, 4);
  let uVar5 = FUN_00596c08(param_1, 3, 1, 99);
  iVar6 = FUN_005adfa0(uVar5);
  DAT_006ad0f0 = ((iVar4 * 100) / iVar6) | 0;
  if (param_2 !== 0) {
    iVar4 = FUN_005adfa0(DAT_006ad0f0, 0, 100);
    DAT_006ad0ec = ((iVar4 * DAT_006ad0ec) / 100) | 0;
  }
  iVar4 = FUN_00596c08(param_1, 5);
  iVar6 = FUN_00596c08(param_1, 3, 1, 99);
  iVar7 = FUN_00596c08(param_1, 4);
  iVar6 = FUN_005adfa0(iVar6 + iVar7);
  DAT_006ad0e8 = ((iVar4 * 200) / iVar6) | 0;
  iVar4 = FUN_005adfa0(DAT_006ad0e8, 0, 100);
  DAT_006ad0ec = ((iVar4 * DAT_006ad0ec) / 100) | 0;
  iVar4 = FUN_00596c08(param_1, 2);
  uVar5 = FUN_00596c08(param_1, 1, 1, 99);
  iVar6 = FUN_005adfa0(uVar5);
  DAT_006ad0dc = ((iVar4 * 100) / iVar6) | 0;
  local_c = DAT_0064bcdc;
  if ((bVar1 & 8) !== 0) {
    local_c = (local_c * 3) >> 2;
  }
  local_8 = 1;
  while (100 < local_c) {
    local_c = local_c >> 1;
    local_8 = local_8 << 1;
  }
  iVar6 = DAT_006ad0e4 * local_c;
  uVar5 = FUN_00596c08(param_1, 2);
  iVar4 = FUN_00596e92(uVar5);
  uVar5 = FUN_00596c08(param_1, 1, 0, iVar4 * 10);
  iVar4 = FUN_00596e92(uVar5);
  iVar4 = FUN_005adfa0(iVar4 * 10);
  DAT_006ad0f4 = (iVar6 / (iVar4 + 1)) | 0;
  uVar5 = FUN_00596c08(param_1, 2);
  iVar4 = FUN_00596e92(uVar5);
  uVar5 = FUN_00596c08(param_1, 1, 0, iVar4 * 10);
  iVar4 = FUN_00596e92(uVar5);
  iVar4 = FUN_005adfa0(iVar4 * 10);
  local_10 = ((local_c * local_18) / (iVar4 + 1)) | 0;
  iVar4 = FUN_00596e92(DAT_0064caac[param_1 * 0x594]);
  iVar4 = FUN_00596e92(DAT_0064caaa[param_1 * 0x594], 0, iVar4 * 10);
  iVar4 = FUN_005adfa0(iVar4 * 10);
  local_14 = ((local_c * local_18) / (iVar4 + 1)) | 0;
  if (1 < local_8) {
    DAT_006ad0f4 = local_8 * DAT_006ad0f4;
    local_10 = local_8 * local_10;
    local_14 = local_8 * local_14;
  }
  if (0x96 < DAT_006ad0f4) {
    DAT_006ad0ec = DAT_006ad0ec - ((DAT_006ad0f4 - 0x96) / 10) | 0;
  }
  DAT_006ad0ec = FUN_005adfa0(DAT_006ad0ec, 0, 100);
  iVar4 = FUN_004a7577(param_1);
  if (iVar4 === 0) {
    DAT_0064caa6[param_1 * 0x594] = FUN_00596c08(param_1, 3);
    DAT_0064caa4[param_1 * 0x594] = FUN_00484fec(DAT_00655af8);
    let sVar3 = FUN_00484fec(DAT_00655af8);
    DAT_0064caa2[param_1 * 0x594] = sVar3 + ((local_10 / 10) | 0);
    iVar4 = FUN_00484fec(DAT_00655af8);
    DAT_006ad0e0 = iVar4 + ((local_14 / 10) | 0);
  }
}


// FUN_005973fd — spaceship_launch (815 bytes)
export function FUN_005973fd(param_1) {
  let uVar1, iVar2, local_c, local_8;

  DAT_0064caa0[param_1 * 0x594] = DAT_0064caa0[param_1 * 0x594] | 2;
  if (DAT_00655afc < 0) {
    DAT_00655afc = DAT_00655af8;
  }
  uVar1 = FUN_00493c7d(param_1);
  FUN_0040ff60(0, uVar1);
  FUN_00421da0(0, DAT_0064caa2[param_1 * 0x594]);
  if (2 < DAT_00655b02) {
    FUN_00511880(0xb, 0xff, 1, 1, param_1, 0);
  }
  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    FUN_00421ea0('LAUNCHED');
    FUN_004d0208(-param_1);
  }
  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
      if ((s32(DAT_0064f394, local_c * 0x58) !== 0) &&
         (s8(DAT_0064f348[local_c * 0x58]) === param_1)) {
        FUN_00441b11(local_c, 99);
      }
    }
  } else {
    for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if ((((local_8 !== param_1) && ((1 << (u8(local_8) & 0x1f) & DAT_00655b0b) === 0)) &&
          (FUN_004a7577(local_8) !== 0)) &&
         (DAT_0064caa2[param_1 * 0x594] < DAT_0064caa2[local_8 * 0x594])) {
        if (DAT_00655b08 < 4) {
          if ((DAT_00655b08 < 2) || (DAT_0064c6be[param_1 * 0x594] === 0)) {
            FUN_00467825(param_1, local_8, 0x10000);
          } else {
            DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] =
                DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] | 0x20;
          }
        } else if ((DAT_0064c6c0[local_8 * 4 + param_1 * 0x594] & 8) === 0) {
          DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] =
              DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] & 0xffffffd9;
          DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] =
              DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] | 0x80840;
        } else {
          DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] =
              DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] | 0x20;
        }
      }
    }
  }
}


// FUN_0059772c — spaceship_dialog (1567 bytes) — UI dialog, stubbed
export function FUN_0059772c(param_1, param_2) {
  // DEVIATION: Win32 API (FUN_0059db08 dialog init, SEH frame)
  let bVar2 = false;
  FUN_00596eec(param_1, 1);
  if (DAT_0064caae[param_1 * 0x594] === 0) {
    param_2 = 0;
  }
  // DEVIATION: Win32 API (FUN_00410070, FUN_0040ff60, FUN_00493b10, FUN_00493c7d — civ name formatting)
  // DEVIATION: Win32 API (__strupr, FUN_0043c9d0 "SPACESHIP" — dialog setup)
  // DEVIATION: Win32 API (loop: FUN_0040bbb0/FUN_0040ff00/FUN_0040fe40/FUN_0040ff30/FUN_0059edf0 — display component counts)
  // DEVIATION: Win32 API (mass, fuel%, energy%, flight time, success% display lines)
  let iVar4 = FUN_004a7577(param_1);
  if (iVar4 === 0) {
    // Not yet launched — show launch button if human and can interact
    if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (param_2 !== 0) &&
       (DAT_006ad0ec !== 0)) {
      // DEVIATION: Win32 API (FUN_00428b0c, FUN_0059f2a3 — add Launch button)
    }
  } else {
    // Already launched — display arrival info
    // DEVIATION: Win32 API (arrival year display)
  }
  // FUN_0040bc80(0) — popup list selection, returns selected item index
  let local_230 = FUN_0040bc80(0);
  if (local_230 !== 0) {
    FUN_00421da0(0, DAT_006ad0ec);
    iVar4 = FUN_00421ea0('LAUNCH');
    if (iVar4 !== 0) {
      FUN_005973fd(param_1);
    }
  }
  // DEVIATION: Win32 API (SEH cleanup: FUN_00597d4b, FUN_00597d61)
}


// FUN_00597d4b — spaceship_dialog_close
export function FUN_00597d4b() { FUN_0059df8a(); }

// FUN_00597d61 — SEH unwind
export function FUN_00597d61() { /* SEH unwind — no-op */ }


// FUN_00597d6f — spaceship_ai_build (1064 bytes)
export function FUN_00597d6f(param_1, param_2) {
  let sVar1, bVar2, bVar3, iVar4, iVar5, local_10, local_c;

  FUN_00596eec(param_1, 0);
  iVar4 = FUN_004a7577(param_1);
  if (iVar4 !== 0) { return -1; }
  sVar1 = 9999;
  for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
    if (((1 << (u8(local_10) & 0x1f) & DAT_00655b0b) !== 0) &&
        (0 < DAT_0064caa2[local_10 * 0x594]) &&
        (DAT_0064caa2[local_10 * 0x594] < sVar1)) {
      sVar1 = DAT_0064caa2[local_10 * 0x594];
    }
  }
  if (((DAT_0064caa2[param_1 * 0x594] === 0) ||
      (0xe < DAT_0064caa2[param_1 * 0x594] - DAT_00655afa)) ||
     (sVar1 <= DAT_0064caa2[param_1 * 0x594])) {
    bVar2 = false;
  } else {
    bVar2 = true;
  }
  bVar3 = false;
  if (param_2 === 0) {
    iVar4 = FUN_00596e06(param_1, 2);
    iVar5 = FUN_00596c61(param_1, 2);
    if (iVar4 < iVar5) {
      bVar3 = true;
    } else if (!bVar2) {
      iVar4 = FUN_00596e06(param_1, 1);
      iVar5 = FUN_00596c61(param_1, 1);
      if (iVar4 < iVar5) { bVar3 = true; }
    }
  }
  if ((!bVar3) && ((param_2 !== 1) || (!bVar2))) {
    iVar4 = FUN_00596e06(param_1, param_2);
    iVar5 = FUN_00596c61(param_1, param_2);
    if ((iVar4 < iVar5) && (FUN_00599910(param_1, param_2) !== 0)) {
      // goto LAB_0059803b — fall through
    }
  }
  for (local_c = 2; (param_2 === 0 ? 0 : -1) <= local_c; local_c = local_c - 1) {
    iVar4 = FUN_00599910(param_1, local_c);
    if ((iVar4 !== 0) && ((local_c !== 1) || (!bVar2))) {
      iVar4 = FUN_00596e06(param_1, local_c);
      iVar5 = FUN_00596c61(param_1, local_c);
      if (iVar4 < iVar5) {
        param_2 = local_c;
        break;
      }
    }
  }
  // LAB_0059803b
  if (param_2 === 0) {
    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      if ((((1 << (u8(local_10) & 0x1f) & DAT_00655b0b) !== 0) &&
           (FUN_004a7577(local_10) !== 0)) &&
          (DAT_0064caa2[local_10 * 0x594] <= DAT_006ad0e0) &&
          ((FUN_005998b0(param_1, 1) === 0) && (FUN_004bd9f0(param_1, DAT_0064c5ae) !== 0))) {
        sVar1 = DAT_0064caaa[param_1 * 0x594];
        iVar4 = FUN_00596b00(param_1, 1);
        if (sVar1 <= iVar4) { return 1; }
        sVar1 = DAT_0064caac[param_1 * 0x594];
        iVar4 = FUN_00596b00(param_1, 2);
        if (sVar1 <= iVar4) { return 1; }
      }
    }
  }
  iVar4 = FUN_00599910(param_1, param_2);
  if (iVar4 === 0) { param_2 = -2; }
  return param_2;
}


// FUN_00598197 — spaceship_add_part (2111 bytes) — mostly UI, game logic preserved
export function FUN_00598197(param_1, param_2) {
  let sVar1, bVar2, iVar3, local_20, local_18 = -1, local_14, local_10, local_c;

  FUN_00596eec(param_1, 0);
  iVar3 = FUN_004a7577(param_1);
  if (iVar3 !== 0) { return local_18; }

  // C: while(true) loop with retry when human player selects a full slot
  while (true) {
    if (param_2 === 0) {
      if (DAT_00634f64[0] <= DAT_0064caa8[param_1 * 0x594]) { return local_18; }
      local_18 = 0;
    } else if (param_2 === 1) {
      if ((DAT_00634f70 <= DAT_0064caaa[param_1 * 0x594]) &&
         (DAT_00634f7c <= DAT_0064caac[param_1 * 0x594])) { return local_18; }
      if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
        if (DAT_0064caaa[param_1 * 0x594] < DAT_0064caac[param_1 * 0x594]) {
          local_18 = 1;
        } else {
          local_18 = 2;
        }
      } else {
        FUN_00421da0(0, DAT_0064caaa[param_1 * 0x594]);
        FUN_00421da0(1, DAT_0064caac[param_1 * 0x594]);
        local_18 = FUN_00421ea0('COMPONENT') + 1;
      }
    } else {
      if (((DAT_00634f88 <= DAT_0064caae[param_1 * 0x594]) &&
          (DAT_00634f94 <= DAT_0064cab0[param_1 * 0x594])) &&
         (DAT_00634fa0 <= DAT_0064cab2[param_1 * 0x594])) { return local_18; }
      if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
        sVar1 = 999;
        for (local_10 = 3; local_10 < 6; local_10 = local_10 + 1) {
          if (DAT_0064caa8[local_10 * 2 + param_1 * 0x594] < sVar1) {
            sVar1 = DAT_0064caa8[local_10 * 2 + param_1 * 0x594];
            local_18 = local_10;
          }
        }
      } else {
        FUN_00421da0(0, DAT_0064caae[param_1 * 0x594]);
        FUN_00421da0(1, DAT_0064cab0[param_1 * 0x594]);
        FUN_00421da0(2, DAT_0064cab2[param_1 * 0x594]);
        local_18 = FUN_00421ea0('MODULE') + 3;
      }
    }
    // Break if AI player, or if selected slot is not yet full
    if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) ||
       (DAT_0064caa8[local_18 * 2 + param_1 * 0x594] <
        DAT_00634f64[local_18 * 3])) { break; }
    // Slot full — show "no further" dialog and retry
    FUN_004271e8(0, DAT_00628420 + DAT_00634f60[local_18 * 0xc * 4]);
    FUN_00421ea0('NOFURTHER');
  }

  // Add part
  iVar3 = FUN_004a75a6(param_1);
  if (iVar3 === 0) {
    DAT_0064caa0[param_1 * 0x594] = DAT_0064caa0[param_1 * 0x594] | 1;
    for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
      if (((1 << (u8(local_20) & 0x1f) & DAT_00655b0b) !== 0) &&
          ((local_20 === param_1) || (FUN_004a75a6(local_20) === 0))) {
        for (local_14 = 1; local_14 < 8; local_14 = local_14 + 1) {
          // C: *(undefined2 *)(&DAT_0064ca82 + local_14 * 2 + local_20 * 0x594) = 0;
          w16(DAT_0064ca82, local_14 * 2 + local_20 * 0x594, 0);
        }
      }
    }
  }
  DAT_0064caa8[local_18 * 2 + param_1 * 0x594] = DAT_0064caa8[local_18 * 2 + param_1 * 0x594] + 1;
  FUN_00596eec(param_1, 0);

  // AI auto-launch logic
  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    bVar2 = true;
    for (local_18 = 0; local_18 < 3; local_18 = local_18 + 1) {
      if (DAT_0064caa8[local_18 * 2 + param_1 * 0x594] < DAT_00634f64[local_18 * 3]) {
        bVar2 = false;
      }
    }
    iVar3 = FUN_004a7577(param_1);
    if ((iVar3 === 0) && (0x27 < DAT_006ad0ec)) {
      if (bVar2) {
        FUN_005973fd(param_1);
      } else {
        local_c = 0;
        for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
          if (((1 << (u8(local_20) & 0x1f) & DAT_00655b0b) !== 0) &&
             (FUN_004a7577(local_20) !== 0)) {
            if (local_c === 0) { local_c = local_20; }
            else if (DAT_0064caa2[local_20 * 0x594] < DAT_0064caa2[local_c * 0x594]) {
              local_c = local_20;
            }
          }
        }
        if ((local_c === 0) && (3 < DAT_00655b08)) {
          // Check if any civ beats us
          for (local_14 = 1; local_14 < 8; local_14 = local_14 + 1) {
            if ((((local_14 !== param_1) &&
                 ((1 << (u8(local_14) & 0x1f) & DAT_00655b0b) === 0)) &&
                (FUN_004a7577(local_14) !== 0)) &&
               (DAT_0064caa2[local_14 * 0x594] < _DAT_0064caa2)) {
              return local_18;
            }
          }
        }
        if (local_c === 0) {
          bVar2 = 0x4b < DAT_006ad0ec;
          if (!bVar2) {
            for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
              if ((1 << (u8(local_20) & 0x1f) & DAT_00655b0b) !== 0) {
                if (u8(DAT_00655c22[param_1]) < u8(DAT_00655c22[local_20])) {
                  bVar2 = true;
                  break;
                }
                iVar3 = FUN_004a75a6(local_20);
                if ((iVar3 !== 0) && (999 < DAT_0064c6a2[local_20 * 0x594])) {
                  bVar2 = true;
                  break;
                }
              }
            }
          }
          if (bVar2) { FUN_005973fd(param_1); }
        } else if (DAT_0064caa2[param_1 * 0x594] < DAT_0064caa2[local_c * 0x594]) {
          FUN_005973fd(param_1);
        }
      }
    }
  }
  return local_18;
}


// FUN_00598a05 — spaceship_check_part (324 bytes)
export function FUN_00598a05(param_1, param_2) {
  if (param_2 === 0x23) {
    if (DAT_00634f64[0] <= DAT_0064caa8[param_1 * 0x594]) { return 1; }
  } else if (param_2 === 0x24) {
    if ((DAT_00634f70 <= DAT_0064caaa[param_1 * 0x594]) &&
       (DAT_00634f7c <= DAT_0064caac[param_1 * 0x594])) { return 1; }
  } else if (((DAT_00634f88 <= DAT_0064caae[param_1 * 0x594]) &&
             (DAT_00634f94 <= DAT_0064cab0[param_1 * 0x594])) &&
            (DAT_00634fa0 <= DAT_0064cab2[param_1 * 0x594])) {
    return 1;
  }
  return 0;
}


// FUN_00598b4e — spaceship_dialog_list (377 bytes) — UI dialog with game-state
export function FUN_00598b4e() {
  // DEVIATION: Win32 API (dialog/SEH frame setup)
  let bVar1 = false;
  FUN_0059db08(0x4000);
  // DEVIATION: Win32 API (FUN_0040ffa0 — set dialog title)
  for (let local_30c = 1; local_30c < 8; local_30c = local_30c + 1) {
    let iVar2 = FUN_004a75a6(local_30c);
    if (iVar2 !== 0) {
      let uVar3 = FUN_00493c7d(local_30c);
      FUN_0059edf0(uVar3, local_30c, 0);
      bVar1 = true;
    }
  }
  if (!bVar1) {
    FUN_00421ea0('NOSPACESHIPS');
    FUN_00598cc7();
    FUN_00598cdd();
    return;
  }
  let iVar2 = FUN_0040bc80(0);
  if (iVar2 < 0) {
    FUN_00598cc7();
    FUN_00598cdd();
    return;
  }
  FUN_004d01ae(iVar2);
  let iVar4 = FUN_004d0208(iVar2);
  if (iVar4 === 0) {
    FUN_0059772c(iVar2, DAT_00655b0b & (1 << (u8(iVar2) & 0x1f)));
  }
  FUN_00598cc7();
  FUN_00598cdd();
}
// FUN_00598cc7 — popup close thunk
export function FUN_00598cc7() { FUN_0059df8a(); }
// FUN_00598cdd — SEH unwind
export function FUN_00598cdd() { /* SEH unwind — no-op */ }


// FUN_00598ceb — spaceship_victory_possible (90 bytes)
export function FUN_00598ceb() {
  if ((DAT_00655ae8 & 0x80) === 0) {
    if ((DAT_00655c18 === -1) && ((DAT_00655b0b & DAT_00655bce) === 0)) {
      return 0;
    } else {
      return 1;
    }
  }
  return 0;
}


// FUN_00598d45 — spaceship_should_race (583 bytes)
export function FUN_00598d45(param_1) {
  let iVar1, local_18, local_10, local_c, local_8;

  iVar1 = FUN_00598ceb();
  if ((iVar1 !== 0) && (FUN_004a7577(param_1) === 0) &&
      ((DAT_00655af0 & 2) === 0) &&
      (DAT_00655b08 !== 0) && ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0)) {
    for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if (((1 << (u8(local_8) & 0x1f) & DAT_00655b0b) !== 0) &&
         (FUN_004a7577(local_8) !== 0)) {
        return 1;
      }
    }
    local_18 = 0;
    for (local_10 = 0; local_10 < 6; local_10 = local_10 + 1) {
      iVar1 = FUN_005adfa0((local_10 + 1) / 2, 0, 2);
      local_18 = local_18 +
          DAT_0064caa8[param_1 * 0x594 + local_10 * 2] * u8(DAT_0064c5a4[iVar1 * 8]);
    }
    for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if ((((1 << (u8(local_8) & 0x1f) & DAT_00655b0b) !== 0) &&
          (FUN_004bd9f0(local_8, 0x4c) !== 0)) && (local_8 !== param_1)) {
        local_c = 0;
        for (local_10 = 0; local_10 < 6; local_10 = local_10 + 1) {
          iVar1 = FUN_005adfa0((local_10 + 1) / 2, 0, 2);
          local_c = local_c + DAT_0064caa8[local_8 * 0x594 + local_10 * 2] *
                              u8(DAT_0064c5a4[iVar1 * 8]);
        }
        if (local_18 <= local_c) { return 1; }
      }
    }
  }
  return 0;
}


// FUN_005998b0 — spaceship_has_capacity (66 bytes)
export function FUN_005998b0(param_1, param_2) {
  let iVar1 = FUN_00596ced(param_2);
  let iVar2 = FUN_00596d3c(param_1, param_2);
  return iVar1 <= iVar2;
}


// FUN_00599910 — spaceship_can_build (132 bytes)
export function FUN_00599910(param_1, param_2) {
  let iVar1 = FUN_005999c0(param_1, param_2);
  if (((iVar1 === 0) || (FUN_00596d3c(param_1, param_2) === 0)) &&
      (FUN_005998b0(param_1, param_2) === 0) &&
      (FUN_004bd9f0(param_1, s8(DAT_0064c5a6[param_2 * 8])) !== 0)) {
    return 1;
  }
  return 0;
}


// FUN_005999c0 — spaceship_parts_full (70 bytes)
export function FUN_005999c0(param_1, param_2) {
  let iVar1 = FUN_00596d3c(param_1, param_2);
  let iVar2 = FUN_00596c61(param_1, param_2);
  return iVar2 <= iVar1;
}


// FUN_00599a20 — pedia_list_init (365 bytes)
export function FUN_00599a20() {
  // DEVIATION: Win32 API (in_ECX-based pedia list initialization, scroll state, painting)
}

// FUN_00599b8d — pedia_list_paint (1488 bytes)
export function FUN_00599b8d() {
  // DEVIATION: Win32 API (in_ECX-based pedia list rendering, GDI drawing, sprintf)
}

// FUN_0059a15d — pedia_load_text (388 bytes)
export function FUN_0059a15d() {
  // DEVIATION: Win32 API (file I/O, string parsing, pedia text loading)
}

// FUN_0059a2e6 — pedia_show_item (369 bytes)
export function FUN_0059a2e6(param_1) {
  // DEVIATION: Win32 API (in_ECX-based pedia UI navigation, FUN_004f7bd1, painting)
}


// FUN_0059a6f0 — rng_seed_get_set (62 bytes)
export function FUN_0059a6f0(param_1) {
  let iVar1 = DAT_00635094;
  if (param_1 === 0) {
    iVar1 = 0;
  } else {
    DAT_00635094 = param_1;
  }
  return iVar1;
}


// FUN_0059a733 — rng_next (94 bytes)
export function FUN_0059a733() {
  DAT_00635094 = (DAT_00635094 * 0x19660d + 0x3c6ef35f) | 0;
  return DAT_00635094 / 0xffffffff;
}


// FUN_0059a791 — rng_range (113 bytes)
export function FUN_0059a791(param_1, param_2) {
  if (param_2 === param_1) {
    FUN_0059a733();
  } else {
    if (param_2 < param_1) { param_1 = param_2; }
    FUN_0059a733();
    param_1 = Math.floor(FUN_0059a733() * (param_2 - param_1)) + param_1;
  }
  return param_1;
}


// FID_conflict___E31 — CRT init thunks
export function FID_conflict___E31() { FUN_0059a86a(); FUN_0059a884(); }
export function FUN_0059a86a() { FUN_0059a8bb(); }
export function FUN_0059a884() { /* _atexit registration — no-op */ }
export function FUN_0059a8a1() { FUN_0059ad40(); }


// FUN_0059a8bb — net_manager_init (196 bytes)
export function FUN_0059a8bb() {
  // DEVIATION: Win32 API (in_ECX-based NetManager constructor, SEH, XDaemon callback registration)
  FUN_0059d080();
  // DEVIATION: Win32 API (FUN_00514220 — CRT init)
  // DEVIATION: Win32 API (XD_SetBroadcastReceive, XD_SetSecureReceive, etc.)
}

// FUN_0059a998 — net_manager_reset (936 bytes)
export function FUN_0059a998() {
  // DEVIATION: Win32 API (in_ECX-based NetManager reset — 90+ field clears)
  DAT_006c8fbc = 0;
  DAT_006c9288 = -1;
  DAT_00626a2c = 0;
  FUN_0059b293(1);
  FUN_0059c2b8();
}

// FUN_0059ad40 — net_manager_destroy (136 bytes)
export function FUN_0059ad40() {
  // DEVIATION: Win32 API (in_ECX-based destructor, SEH, operator_delete)
  FUN_0059b293(1);
  FUN_0059c2b8();
  FUN_0059adc8();
  FUN_0059ade1();
}

// FUN_0059adc8 — net_manager_shutdown_thunk (15 bytes)
export function FUN_0059adc8() {
  // DEVIATION: Win32 API (FUN_00514254 — CRT cleanup)
}

// FUN_0059ade1 — SEH unwind (14 bytes)
// Source: decompiled/block_00590000.c FUN_0059ade1 (14 bytes)
export function FUN_0059ade1() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// FUN_0059adef — net_connect (1167 bytes)
export function FUN_0059adef(param_1, param_2) {
  // DEVIATION: Win32 API (XDaemon socket init, modem, serial — all Win32 network code)
  // Game-state side effects:
  FUN_0059a998();
  switch (param_1) {
    case 0:
      DAT_00655b02 = 3;
      break;
    case 1:
      DAT_00655b02 = 3;
      break;
    case 2:
      DAT_00655b02 = 5;
      break;
    case 3:
      DAT_00655b02 = 6;
      break;
  }
  // DEVIATION: Win32 API (XD_InitializeSocketsTCP, GetPrivateProfileIntA, etc.)
  FUN_0059c2b8();
  FUN_0059c276();
  return 0;
}

// FUN_0059b293 — net_disconnect (691 bytes)
export function FUN_0059b293(param_1) {
  // DEVIATION: Win32 API (in_ECX-based disconnect, XD_FlushSendBuffer, XD_CloseConnection, etc.)
  debug_log('Disconnecting from network');
  FUN_0059baf0();
  FUN_0059b55b();
  // DEVIATION: Win32 API (XD_ShutdownSockets, XD_ShutdownModem, XD_ResetLibrary)
  FUN_0059c2b8();
}

// FUN_0059b55b — net_disconnect_helper (22 bytes)
// Source: decompiled/block_00590000.c FUN_0059b55b (6 bytes)
export function FUN_0059b55b() {
  // C: return; (truly empty function)
}

// FUN_0059b571 — net_player_list_update (651 bytes)
export function FUN_0059b571(param_1) {
  // DEVIATION: Win32 API (in_ECX-based linked list manipulation, strncmp, operator_new, memcpy)
}

// FUN_0059b7fc — net_add_player (366 bytes)
export function FUN_0059b7fc(param_1) {
  // DEVIATION: Win32 API (in_ECX-based player slot management, memset, strncpy)
}

// FUN_0059b96a — net_remove_player (390 bytes)
export function FUN_0059b96a(param_1) {
  // DEVIATION: Win32 API (in_ECX-based player removal)
  // Game-state side effect:
  // DAT_00655b0b mask update when removing player with assigned civ
}

// FUN_0059baf0 — net_free_player_list (100 bytes)
export function FUN_0059baf0() {
  // DEVIATION: Win32 API (in_ECX-based linked list free, operator_delete)
}

// FUN_0059bb54 — net_broadcast_receive (237 bytes)
export function FUN_0059bb54(param_1, param_2) {
  // DEVIATION: Win32 API (network broadcast receive callback, packet validation)
}

// FUN_0059bc41 — net_secure_receive (884 bytes)
export function FUN_0059bc41(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (network secure receive callback, packet parsing, debug logging)
  if (param_3 > 3) {
    // DEVIATION: Win32 API (FUN_0051438f — process net message)
    DAT_006c8fb0 = param_3;
    DAT_006c9284 = DAT_00628468;
    DAT_00635098 = 0; // C: DAT_00635098 = param_2[1] — type field from message header
  }
}

// FUN_0059bfb5 — net_new_client (38 bytes)
export function FUN_0059bfb5(param_1, param_2) {
  // DEVIATION: Win32 API (FUN_005d2279 — debug log new client connection)
}

// FUN_0059bfdb — net_connected_to_server (112 bytes)
export function FUN_0059bfdb(param_1) {
  if ((param_1 >= 0) && (param_1 < 8)) {
    DAT_006ad300 = param_1;
    DAT_006ad2f5 = 1;
    FUN_0046b14d(0x2f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
  }
}

// FUN_0059c04b — net_connection_lost (89 bytes)
export function FUN_0059c04b(param_1) {
  DAT_006c8fb4 = DAT_006c8fb4 + 1;
  if (param_1 < 7) {
    DAT_006c8fc0[param_1] = DAT_006c8fc0[param_1] + 1;
  }
}

// FUN_0059c0a4 — net_oversized_msg (61 bytes)
export function FUN_0059c0a4(param_1) {
  debug_log('Oversized XDaemon message: ' + param_1);
}

// FUN_0059c0e1 — net_build_message (405 bytes)
export function FUN_0059c0e1(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX-based message buffer construction, operator_new, memcpy)
  return null;
}

// FUN_0059c276 — net_clear_counters (66 bytes)
export function FUN_0059c276() {
  for (let local_8 = 0; local_8 < 0xa9; local_8 = local_8 + 1) {
    DAT_006c8fe0[local_8] = 0;
  }
}

// FUN_0059c2b8 — net_clear_lost_connections (73 bytes)
export function FUN_0059c2b8() {
  DAT_006c8fb4 = 0;
  for (let local_8 = 0; local_8 < 7; local_8 = local_8 + 1) {
    DAT_006c8fc0[local_8] = 0;
  }
}

// FUN_0059c301 — net_poll (30 bytes)
export function FUN_0059c301() { FUN_0047e94e(1, 0); }

// FUN_0059c31f — net_build_game_info (598 bytes)
export function FUN_0059c31f(param_1) {
  // DEVIATION: Win32 API (builds game info packet for network — memset, strncpy)
  // Game-state reads: DAT_006665b0, DAT_006ad59c, DAT_00666570, DAT_00654c74,
  //   DAT_00655b08, DAT_00655b09, DAT_00655b0a, DAT_00655b0d, DAT_006ad308,
  //   DAT_00654b70, DAT_0064bc62, DAT_00654fae, DAT_00654fac, DAT_00655af0,
  //   DAT_00655afc, DAT_0064bcb4, DAT_0064bcb6, DAT_00655af8, DAT_00654c7c,
  //   DAT_006d1160, DAT_006d1162
}


// FUN_0059c575 — combat_log_add (762 bytes)
export function FUN_0059c575(param_1, param_2, param_3, param_4, param_5) {
  let civ = s8(DAT_006560f7[param_1 * 0x20]);
  let idx = DAT_006af280[civ * 4];
  DAT_006af2a0[civ * 0x27d8 + idx * 0x22] = u8(DAT_006560f6[param_1 * 0x20]);
  DAT_006af2a2[civ * 0x27d8 + idx * 0x22] = param_4;
  DAT_006af2a4[civ * 0x27d8 + idx * 0x22] = param_5;
  DAT_006af2a6[civ * 0x27d8 + idx * 0x22] = param_3;
  DAT_006af2a8[civ * 0x27d8 + idx * 0x22] = FUN_0043cb30(s8(DAT_006560f7[param_2 * 0x20]));
  // C: _strncpy(civ * 0x27d8 + idx * 0x22 + 0x6af2aa, FUN_00493c7d(civ_of_param2), 0x18)
  let _Source = FUN_00493c7d(s8(DAT_006560f7[param_2 * 0x20]));
  DAT_006af2aa[civ * 0x27d8 + idx * 0x22] = _Source.substring(0, 0x18);
  DAT_006af2c1[civ * 0x27d8 + idx * 0x22] = 0;
  DAT_006af280[civ * 4] = DAT_006af280[civ * 4] + 1;
  if (DAT_006af280[civ * 4] === 300) {
    DAT_006af280[civ * 4] = 0;
  }
  if (DAT_006af280[civ * 4] === DAT_006af260[civ * 4]) {
    DAT_006af260[civ * 4] = DAT_006af260[civ * 4] + 1;
    if (DAT_006af260[civ * 4] === 300) {
      DAT_006af260[civ * 4] = 0;
    }
  } else {
    DAT_006af220[civ * 4] = DAT_006af220[civ * 4] + 1;
  }
  if (DAT_0063e948 >= 0) {
    FUN_005bb574();
  }
}


// FUN_0059d080 — popup_base_init (209 bytes)
export function FUN_0059d080() {
  // DEVIATION: Win32 API (in_ECX-based popup base class constructor, field init)
}

// FUN_0059d190, FUN_0059d1aa, FUN_0059d1ca — CRT init thunks
export function FUN_0059d190() { FUN_0059d1aa(); FUN_0059d1ca(); }
export function FUN_0059d1aa() { /* CRT init — stub */ }
export function FUN_0059d1ca() { /* _atexit — no-op */ }
export function FUN_0059d1e7() { /* CRT cleanup — stub */ }

// FID_conflict___E51 variants — CRT static init
export function FID_conflict___E51_d201() { FUN_0059d21b(); FUN_0059d239(); }
export function FUN_0059d21b() { /* CRT init — stub */ }
export function FUN_0059d239() { /* _atexit — no-op */ }
export function FUN_0059d256() { /* CRT cleanup — stub */ }
export function FID_conflict___E51_d270() { FUN_0059d28a(); FUN_0059d2a8(); }
export function FUN_0059d28a() { /* CRT init — stub */ }
export function FUN_0059d2a8() { /* _atexit — no-op */ }
export function FUN_0059d2c5() { /* CRT cleanup — stub */ }
export function FID_conflict___E51_d2df() { FUN_0059d2f9(); FUN_0059d317(); }
export function FUN_0059d2f9() { /* CRT init — stub */ }
export function FUN_0059d317() { /* _atexit — no-op */ }
export function FUN_0059d334() { /* CRT cleanup — stub */ }

// FUN_0059d34e — global init thunk
export function FUN_0059d34e() { FUN_0059d363(); }
// FUN_0059d363 — set popup default
export function FUN_0059d363() { DAT_006cec84 = DAT_00635a58; }
// FUN_0059d37d — timestamp
export function FUN_0059d37d() { _DAT_006cec80 = FUN_00421bb0(); }
// FUN_0059d397 — timestamp (duplicate)
export function FUN_0059d397() { _DAT_006cec80 = FUN_00421bb0(); }
// FUN_0059d3b1 — set background
export function FUN_0059d3b1(param_1) { DAT_006359c0 = param_1; }
// FUN_0059d3c9 — set parent window
export function FUN_0059d3c9(param_1) { DAT_006359c4 = param_1; }
// FUN_0059d3e1 — set popup position
export function FUN_0059d3e1(param_1, param_2) { DAT_006359cc = param_1; DAT_006359d0 = param_2; }

// FUN_0059d401 — popup_load_labels (129 bytes)
export function FUN_0059d401() {
  let iVar1 = FUN_004a2379('LABELS', 'POPUPS');
  if (iVar1 === 0) {
    for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
      let uVar2 = FUN_004a257a();
      DAT_006cec98[local_8] = uVar2;
      // DEVIATION: Win32 API (FUN_00428b0c — load string resource)
    }
  }
}

// FUN_0059d487 — popup_set_params (88 bytes)
export function FUN_0059d487(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
  DAT_006359fc = p1; DAT_006359f8 = p2; DAT_006359f4 = p3;
  DAT_00635a00 = p4; DAT_00635a04 = p5; DAT_00635a08 = p6;
  DAT_00635a0c = p7; DAT_00635a10 = p8; DAT_00635a14 = p9;
}

// FUN_0059d4df — popup_set_labels (72 bytes)
export function FUN_0059d4df(p1, p2, p3, p4, p5, p6, p7) {
  DAT_00635a18 = p1; DAT_00635a1c = p2; DAT_00635a20 = p3;
  DAT_00635a24 = p4; DAT_00635a28 = p5; DAT_00635a2c = p6; DAT_00635a30 = p7;
}

// FUN_0059d527, FUN_0059d53f, FUN_0059d557 — set font/schema/margin ptrs
export function FUN_0059d527(param_1) { PTR_DAT_006359e4 = param_1; }
export function FUN_0059d53f(param_1) { PTR_DAT_006359e8 = param_1; }
export function FUN_0059d557(param_1) { PTR_DAT_006359ec = param_1; }

// FUN_0059d56f — popup_reset_defaults (46 bytes)
export function FUN_0059d56f() {
  PTR_DAT_006359e4 = DAT_006ceca8;
  PTR_DAT_006359e8 = DAT_006cec78;
  PTR_DAT_006359ec = DAT_006cec88;
}

// FUN_0059d59d — popup_set_aa0 (24 bytes)
export function FUN_0059d59d(param_1) {
  // DEVIATION: Win32 API (in_ECX-based field set: DAT_00635aa0 = param_1)
}

// FUN_0059d5b5 — popup_reset_font (64 bytes)
export function FUN_0059d5b5(param_1) {
  // DEVIATION: Win32 API (in_ECX-based font reset: FUN_004980ec, FUN_00497ea0)
}

// FUN_0059d5f5 — popup_init_state (1299 bytes)
export function FUN_0059d5f5() {
  // DEVIATION: Win32 API (in_ECX-based popup state initialization — 90+ field assignments)
  // Reads: DAT_00635a34, DAT_00635a38, DAT_006359cc, DAT_006359d0,
  //   DAT_00635a04, DAT_006359fc, DAT_006359f8, DAT_006359f4, DAT_00635a00,
  //   DAT_00635a08, DAT_00635a0c, DAT_00635a10, DAT_00635a14,
  //   DAT_00635a18-DAT_00635a30
}

// FUN_0059db08 — popup_create (93 bytes)
export function FUN_0059db08(param_1) {
  // DEVIATION: Win32 API (in_ECX-based popup create: FUN_00428cb0, FUN_0059d5f5)
  FUN_0059d5f5();
  return 0;
}

// FUN_0059db65 — popup_cleanup (1061 bytes)
export function FUN_0059db65() {
  // DEVIATION: Win32 API (in_ECX-based popup cleanup — destroy bitmaps, controls, stack management)
  // Game-state side effects in popup stack:
  if (DAT_006cec84 !== null) {
    if (DAT_00635a9c > 0 && DAT_00635a9c <= 0x10) {
      DAT_00635a9c = DAT_00635a9c - 1;
      DAT_006ad678 = DAT_00635a58[DAT_00635a9c];
      DAT_006cec84 = DAT_006ad678;
      _DAT_006cec80 = FUN_00421bb0();
    }
  }
}

// FUN_0059df8a — popup_close (47 bytes)
export function FUN_0059df8a() {
  // DEVIATION: Win32 API (in_ECX-based: FUN_0059db65 + FUN_004980ec)
  FUN_0059db65();
}

// FUN_0059dfb9 — popup_configure (306 bytes)
export function FUN_0059dfb9(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 API (in_ECX-based popup configuration — font, schema, margin, title, window)
  FUN_0059e472(PTR_DAT_006359e4);
  FUN_0059e4c5(PTR_DAT_006359ec);
}

// FUN_0059e0eb — popup_set_text (160 bytes)
export function FUN_0059e0eb(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX-based linked list text field update)
  return 0;
}

// FUN_0059e18b — popup_add_text_entry (412 bytes)
export function FUN_0059e18b(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 API (in_ECX-based text entry creation, memory allocation)
  return null;
}

// FUN_0059e327 — popup_is_modal (47 bytes)
export function FUN_0059e327() {
  // DEVIATION: Win32 API (in_ECX-based: returns (*(byte*)(in_ECX + 0x3c) & 0x80) !== 0)
  return false;
}

// FUN_0059e356 — popup_default_line_height (32 bytes)
export function FUN_0059e356() { return 0x20; }

// FUN_0059e376 — popup_calc_line_height (132 bytes)
export function FUN_0059e376() {
  // DEVIATION: Win32 API (in_ECX-based: calculates line height from font metrics)
  return 0x20;
}

// FUN_0059e3fa — popup_row_height (78 bytes)
export function FUN_0059e3fa() {
  // DEVIATION: Win32 API (in_ECX-based: returns row height from stored array or font height + 1)
  return 0x20;
}

// FUN_0059e448 — popup_header_height (42 bytes)
export function FUN_0059e448() {
  // DEVIATION: Win32 API (in_ECX-based: returns line_height + 10)
  return 30;
}

// FUN_0059e472 — popup_set_font (50 bytes)
export function FUN_0059e472(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: set font ptr, calc line height)
}

// CArchive::SetObjectSchema — MFC library function (33 bytes)
export function CArchive_SetObjectSchema(param_1) {
  // DEVIATION: Win32 API (MFC CArchive method)
}

// FUN_0059e4c5 — popup_set_margin (33 bytes)
export function FUN_0059e4c5(param_1) {
  // DEVIATION: Win32 API (in_ECX + 0x10 = param_1)
}

// FUN_0059e4e6 — popup_set_field_38 (33 bytes)
export function FUN_0059e4e6(param_1) {
  // DEVIATION: Win32 API (in_ECX + 0x38 = param_1)
}

// FUN_0059e507 — popup_set_columns (126 bytes)
export function FUN_0059e507(param_1) {
  // DEVIATION: Win32 API (in_ECX-based column/row setup)
}

// FUN_0059e585 — popup_set_list_page (68 bytes)
export function FUN_0059e585(param_1) {
  // DEVIATION: Win32 API (in_ECX + 0x48 = param_1, clamped 0-1)
}

// FUN_0059e5c9 — popup_set_list_params (91 bytes)
export function FUN_0059e5c9(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based list param setup, calls FUN_0059e507)
}

// CPropertySheet::EnableStackedTabs — MFC library (appears 8 times, 36 bytes each)
export function CPropertySheet_EnableStackedTabs(param_1) {
  // DEVIATION: Win32 API (MFC CPropertySheet method — field write)
}

// FUN_0059e648 — popup_calc_width (46 bytes)
export function FUN_0059e648() {
  // DEVIATION: Win32 API (in_ECX-based: line_height + 4 + in_ECX[0xb8] * 2)
  return 30;
}

// FUN_0059e676 — popup_text_width (51 bytes)
export function FUN_0059e676(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: text extent + 4 + margin * 4)
  return 100;
}

// FUN_0059e6a9 — popup_set_title (86 bytes)
export function FUN_0059e6a9(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: allocate and copy title string)
}

// FUN_0059e6ff — popup_set_window_width (99 bytes)
export function FUN_0059e6ff(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: scale width if aspect ratio differs)
}

// ios::delbuf — MFC/CRT library (33 bytes)
export function ios_delbuf(param_1) {
  // DEVIATION: Win32 API (MFC ios method: this + 0x1c = param_1)
}

// FUN_0059e783 — popup_set_position (42 bytes)
export function FUN_0059e783(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX + 0x14 = param_1, in_ECX + 0x18 = param_2)
}

// FUN_0059e7ad — popup_find_by_id (101 bytes)
export function FUN_0059e7ad(param_1) {
  // DEVIATION: Win32 API (in_ECX-based linked list search by ID)
  return 0;
}

// FUN_0059e812 — popup_find_by_type (101 bytes)
export function FUN_0059e812(param_1) {
  // DEVIATION: Win32 API (in_ECX-based linked list search by type)
  return 0;
}

// FUN_0059e877 — popup_find_button (100 bytes)
export function FUN_0059e877(param_1) {
  // DEVIATION: Win32 API (in_ECX-based linked list search in button list)
  return null;
}

// FUN_0059e8db — popup_enable_item (76 bytes)
export function FUN_0059e8db(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX-based: find item, set/clear bit 0)
}

// FUN_0059e927 — popup_enable_item2 (76 bytes)
export function FUN_0059e927(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX-based: find item, set/clear bit 1)
}

// FUN_0059e973 — popup_disable_all (64 bytes)
export function FUN_0059e973() {
  // DEVIATION: Win32 API (in_ECX-based: clear bit 0 on all items)
}

// FUN_0059e9b3 — popup_disable_all2 (64 bytes)
export function FUN_0059e9b3() {
  // DEVIATION: Win32 API (in_ECX-based: clear bit 1 on all items)
}

// FUN_0059e9f3 — popup_check_flag (90 bytes)
export function FUN_0059e9f3(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: find item, check bit 2)
  return 0;
}

// FUN_0059ea4d — popup_set_flag (76 bytes)
export function FUN_0059ea4d(param_1, param_2) {
  // DEVIATION: Win32 API (in_ECX-based: find item, set/clear bit 2)
}

// FUN_0059ea99 — popup_set_focus (116 bytes)
export function FUN_0059ea99(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: set focus to button or list item)
}

// FUN_0059eb0d — popup_callback (53 bytes)
export function FUN_0059eb0d(param_1, param_2) {
  // DEVIATION: Win32 API (FUN_00418a70 — invoke callback)
}

// FUN_0059eb42 — popup_callback_wrapper (38 bytes)
export function FUN_0059eb42(param_1) {
  FUN_0059eb0d(0, param_1);
}

// FUN_0059ec88 — popup_add_button (360 bytes)
export function FUN_0059ec88(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: allocate button, add to linked list, measure text)
  return null;
}

// FUN_0059edf0 — popup_add_list_item (566 bytes)
export function FUN_0059edf0(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: allocate list item, add to doubly-linked list, measure text)
  return null;
}

// FUN_0059f026 — popup_add_radio (71 bytes)
export function FUN_0059f026(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: add radio button via FUN_0059edf0)
  return null;
}

// FUN_0059f06d — popup_add_edit (566 bytes)
export function FUN_0059f06d(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: allocate text edit field, linked list, measure text)
  return null;
}

// FUN_0059f2a3 — popup_add_link (119 bytes)
export function FUN_0059f2a3(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: allocate and store link string)
}

// FUN_0059f31a — popup_set_color (189 bytes)
export function FUN_0059f31a(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: set text color based on params)
}

// FUN_0059f3d7 — popup_draw_text (226 bytes)
export function FUN_0059f3d7(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 API (in_ECX-based: draw text with shadow, measure text width)
  return param_3;
}

// FUN_0059f5ba — popup_draw_at (61 bytes)
export function FUN_0059f5ba(param_1, param_2, param_3) {
  // DEVIATION: Win32 API (in_ECX-based: draw string at offset position)
}

// FUN_0059f5f7 — popup_has_text (83 bytes)
export function FUN_0059f5f7() {
  // DEVIATION: Win32 API (in_ECX-based: check if any text entries have size < 1)
  return 0;
}

// FUN_0059f64a — popup_layout_text (1326 bytes)
export function FUN_0059f64a(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: word-wrap and layout text entries for popup display)
  return 0;
}

// FUN_0059fb78 — popup_find_list_index (156 bytes)
export function FUN_0059fb78(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: find index of item in list by matching ID)
  return 0;
}

// FUN_0059fc19 — popup_get_list_item (156 bytes)
export function FUN_0059fc19(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: get Nth item matching current page)
  return 0;
}

// FUN_0059fcba — popup_get_page (56 bytes)
export function FUN_0059fcba(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: FUN_0059fb78(param_1) / columns)
  return 0;
}

// FUN_0059fcf2 — popup_set_page (56 bytes)
export function FUN_0059fcf2(param_1) {
  // DEVIATION: Win32 API (in_ECX-based: FUN_0059fc19(columns * param_1))
}

// FUN_0059fd2a — popup_layout (4785 bytes)
export function FUN_0059fd2a() {
  // DEVIATION: Win32 API (in_ECX-based: massive popup layout calculation —
  //   button positioning, scrollbar creation, text wrapping, window sizing)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL STUBS — functions from other blocks called by this block
// ═══════════════════════════════════════════════════════════════════

function FUN_00407ff0() { /* stub — clear_display_state */ }
function FUN_004087c0(x, y) { return 1; /* stub — is_valid_tile */ }
function FUN_00410030(a, b, c) { /* stub — show_message */ }
function FUN_0040ff60(a, b) { /* stub — set_format_arg */ }
function FUN_00410070(a) { return ''; /* stub — get_civ_name */ }
function FUN_00421bb0() { return Date.now(); /* stub — get_tick_count */ }
function FUN_00421da0(a, b) { /* stub — set_dialog_number */ }
function FUN_00421ea0(a) { return 0; /* stub — show_dialog */ }
function FUN_004271e8(a, b) { /* stub — set_dialog_text */ }
function FUN_004274a6(a, b) { /* stub — update_unit_display */ }
function FUN_0043cb30(a) { return 0; /* stub — get_civ_short_name */ }
function FUN_0043cf76(a, b) { return -1; /* stub — find_city_at */ }
function FUN_0043d07a(a, b, c, d, e) { return -1; /* stub — find_nearest_city */ }
function FUN_0043d20a(a, b) { return 0; /* stub — city_has_building */ }
function FUN_00441b11(a, b) { /* stub — city_set_production */ }
function FUN_004442a0(a, b, c) { /* stub — show_unit_lost_dialog */ }
function FUN_004442e0(a, b) { return 0; /* stub — show_confirm_dialog */ }
function FUN_00453e51(a, b) { return 0; /* stub — check_civ_ability */ }
function FUN_00456f20(a, b, c) { /* stub — diplomacy_adjust */ }
function FUN_00467825(a, b, c) { /* stub — diplomacy_demand */ }
function FUN_004a7577(a) { return 0; /* stub — spaceship_launched */ }
function FUN_004a75a6(a) { return 0; /* stub — spaceship_building */ }
function FUN_004b0b53(a, b, c, d, e) { /* stub — flush_display */ }
function FUN_004bd9f0(a, b) { return 0; /* stub — civ_has_tech */ }
function FUN_004c4210(a, b) { /* stub — set_dialog_number_2 */ }
function FUN_004c6bf5(a, b) { /* stub — diplomat_enter_city */ }
function FUN_004c9ebd(a, b, c) { return 0; /* stub — diplomat_engage_unit */ }
function FUN_004d0208(a) { return 0; /* stub — civ_status_dialog */ }
function FUN_004105f8(a, b, c) { /* stub — clear_fog_at */ }
function FUN_00484fec(a) { return 0; /* stub — turn_to_year */ }
function FUN_00493c7d(a) { return ''; /* stub — get_civ_full_name */ }
function FUN_00493b10(a) { return ''; /* stub — get_leader_name */ }
function FUN_00511880(a, b, c, d, e, f) { /* stub — send_event */ }
function FUN_0046b14d(a, b, c, d, e, f, g, h, i, j) { /* stub — send_net_message */ }
function FUN_0046e020(a, b, c, d) { /* stub — play_sound */ }
function FUN_0046e287(a) { /* stub — delay_frames */ }
function FUN_0047ce1e(a, b, c, d, e) { /* stub — update_tile_display */ }
function FUN_0047cea6(a, b) { /* stub — refresh_tile */ }
function FUN_0047e94e(a, b) { /* stub — process_messages */ }
function FUN_00580341(a, b, c) { return 0; /* stub — combat_resolve */ }
function FUN_0056c705(a, b, c, d, e, f) { /* stub — animate_move */ }
function FUN_00579ed0(a, b, c) { return 0; /* stub — declare_war_confirm */ }
function FUN_0057b5df(a, b, c) { /* stub — capture_city */ }
function FUN_0057f9e3(a, b, c, d) { return 0; /* stub — air_attack_city */ }
function FUN_0058f040(a) { /* stub — paradrop_check */ }
function FUN_0058fda9(a, b, c) { /* stub — zoc_display */ }
function FUN_0058fedb(a, b) { return 0; /* stub — spy_city_action */ }
function FUN_005ae31d(a, b, c, d) { return 0; /* stub — tile_distance */ }
function FUN_005ae10e(a, b) { return 0; /* stub — wrap_distance_x */ }
function FUN_005ae1b0(a, b, c, d) { return 0; /* stub — adjacent_check */ }
function FUN_005b29aa(a) { return 0; /* stub — unit_max_hp */ }
function FUN_005b2a39(a) { return 0; /* stub — unit_max_mp */ }
function FUN_005b2c3d(a) { return 0; /* stub — unit_remaining_mp */ }
function FUN_005b2c82(a) { return -1; /* stub — unit_next_in_stack */ }
function FUN_005b2d39(a) { return -1; /* stub — unit_first_in_stack */ }
function FUN_005b2e69(a, b) { return -1; /* stub — find_unit_at */ }
function FUN_005b2f50(a) { /* stub — unit_unload */ }
function FUN_005b36df(a, b, c, d) { /* stub — unit_move_to */ }
function FUN_005b389f(a, b) { /* stub — unit_set_transport */ }
function FUN_005b3ae0(a, b, c, d) { /* stub — unit_place_at */ }
function FUN_005b4391(a, b) { /* stub — unit_kill */ }
function FUN_005b48b1(a) { /* stub — unit_update_visibility */ }
function FUN_005b490e(a, b) { /* stub — unit_set_contact */ }
function FUN_005b496e(a, b) { /* stub — unit_enter_territory */ }
function FUN_005b49cf(a, b, c) { return 0; /* stub — tile_has_enemy */ }
function FUN_005b4d8c(a, b, c) { return 0; /* stub — zoc_check */ }
function FUN_005b4ee2(a, b) { /* stub — barbarian_contact */ }
function FUN_005b50ad(a, b) { return 0; /* stub — count_units_at */ }
function FUN_005b53b6(a, b) { return 0; /* stub — carrier_has_planes */ }
function FUN_005b542e(a, b, c) { /* stub — unit_set_order */ }
function FUN_005b5bab(a, b) { /* stub — unit_wake */ }
function FUN_005b5d93(a, b) { /* stub — unit_destroy_with_anim */ }
function FUN_005b6787(a) { /* stub — unit_clear_orders */ }
function FUN_005b8931(a, b) { return [0, 0, 0, 0, 0]; /* stub — get_tile_ptr */ }
function FUN_005b89bb(a, b) { return 0; /* stub — get_terrain_type */ }
function FUN_005b89e4(a, b) { return 0; /* stub — is_land_tile */ }
function FUN_005b8a81(a, b) { return 0; /* stub — get_continent_id */ }
function FUN_005b8b65(a, b, c) { return 0; /* stub — tile_visible_to */ }
function FUN_005b8ca6(a, b) { return -1; /* stub — find_airbase_at */ }
function FUN_005b8d15(a, b) { return -1; /* stub — find_carrier_at */ }
function FUN_005b8da4(a, b) { return -1; /* stub — tile_owner */ }
function FUN_005b8ffa(a, b) { return 0; /* stub — tile_has_airfield */ }
function FUN_005b94fc(a, b, c, d, e) { /* stub — update_fog */ }
function FUN_005b99e8(a, b, c, d) { /* stub — reveal_tile */ }
function FUN_005bb574() { /* stub — combat_log_ui_update */ }
function FUN_005adfa0(a, b, c) { return a; /* stub — clamp */ }
function FUN_citywin_C494(a, b, c) { /* stub — city_window_update */ }
function XD_FlushSendBuffer(a) { /* stub — network flush */ }
function GetAsyncKeyState(a) { return 0; /* stub — Win32 API */ }
function _rand() { return Math.floor(Math.random() * 0x7fffffff); }
function _memset(a, b, c, d) { /* stub — memset */ }
function debug_log(a) { /* stub — debug logging */ }
function FUN_004d01ae(a) { /* stub */ }
function FUN_004a257a() { return 0; /* stub — parse next int from file */ }
function FUN_004a2379(a, b) { return 0; /* stub — open rules section */ }
function FUN_0043c9d0(a) { /* stub — set dialog title from key */ }
function FUN_0040bc80(a) { return 0; /* stub — popup show and get result */ }
function FUN_0040bbb0() { /* stub — string builder reset */ }
function FUN_0040bbe0(a) { /* stub — string builder append */ }
function FUN_0040bc10(a) { /* stub — string builder append resource */ }
function FUN_0040fe40() { /* stub — format begin */ }
function FUN_0040fe70() { /* stub — format percent */ }
function FUN_0040fe10() { /* stub — format separator */ }
function FUN_0040fea0() { /* stub — format space */ }
function FUN_0040fed0() { /* stub — format end */ }
function FUN_0040ff00(a) { /* stub — format string value */ }
function FUN_0040ff30(a) { /* stub — format int value */ }
function FUN_0040ffa0(a, b) { /* stub — set dialog title */ }
function FUN_00428b0c(a) { return ''; /* stub — load string resource */ }
// FUN_004a2379 (duplicate stub removed)
