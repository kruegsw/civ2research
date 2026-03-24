// ═══════════════════════════════════════════════════════════════════
// block_00510000.js — Mechanical transpilation of block_00510000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00510000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00510000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16, s32, u32, w8, w16, w32 } from './mem.js';


// ============================================================
// Function: FUN_00511320 @ 0x00511320
// Size: 28 bytes
// ============================================================

// ecx_vtable_get_field4
export function FUN_00511320() {
  let in_ECX;
  return 0; // DEVIATION: returns *(in_ECX + 4) via register-based calling convention
}



// ============================================================
// Function: FUN_00511350 @ 0x00511350
// Size: 59 bytes
// ============================================================

// clamp_value
export function FUN_00511350(param_1, param_2, param_3) {
  if ((param_1 <= param_3) && (param_3 = param_1, param_1 < param_2)) {
    param_3 = param_2;
  }
  return param_3;
}



// ============================================================
// Function: FUN_005113b0 @ 0x005113B0
// Size: 46 bytes
// ============================================================

// draw_rect_wrapper
export function FUN_005113b0(param_1, param_2, param_3, param_4) {
  FUN_005a97cc(DAT_00635c64, param_1, param_2, param_3, param_4);
  return;
}



// ============================================================
// Function: FUN_005113f0 @ 0x005113F0
// Size: 42 bytes
// ============================================================

// draw_3d_rect_wrapper
export function FUN_005113f0(param_1, param_2, param_3) {
  FUN_005a99fc(DAT_00635c64, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00511430 @ 0x00511430
// Size: 29 bytes
// ============================================================

// init_text_buffer
export function FUN_00511430() {
  FUN_004af09e(DAT_00679640);
  return;
}



// ============================================================
// Function: FUN_00511460 @ 0x00511460
// Size: 78 bytes
// ============================================================

// blit_rect_from_struct
export function FUN_00511460(param_1, param_2, param_3) {
  FUN_0046ace7(param_1, param_2, param_3[0], param_3[1], param_3[2] - param_3[0],
               param_3[3] - param_3[1]);
  return;
}



// ============================================================
// Function: FUN_005114d0 @ 0x005114D0
// Size: 62 bytes
// ============================================================

// blit_8_params_wrapper
export function FUN_005114d0(param_1, param_2, param_3, param_4,
                             param_5, param_6, param_7, param_8) {
  FUN_00548c78(DAT_00635c64, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  return;
}



// ============================================================
// Function: FUN_00511520 @ 0x00511520
// Size: 41 bytes
// ============================================================

// dialog_string_wrapper
export function FUN_00511520(param_1, param_2, param_3) {
  FUN_004a6cc5(DAT_006359d4, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00511560 @ 0x00511560
// Size: 57 bytes
// ============================================================

// destructor_thunk
export function FUN_00511560(param_1) {
  let in_ECX;
  FUN_005115b0();
  if ((param_1 & 1) !== 0) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}



// ============================================================
// Function: FUN_005115b0 @ 0x005115B0
// Size: 116 bytes
// ============================================================

// destructor_chain
export function FUN_005115b0() {
  let in_ECX;
  // SEH setup omitted
  if (s32(in_ECX, 0x1c) !== 0) {
    FUN_005cb6db(s32(in_ECX, 0x1c));
  }
  FUN_00511624();
  FUN_00511630();
  FUN_0051163c();
  FUN_0051164f();
  return;
}



// ============================================================
// Function: FUN_00511624 @ 0x00511624
// Size: 12 bytes
// ============================================================

// dtor_helper_1
export function FUN_00511624() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_00511630 @ 0x00511630
// Size: 12 bytes
// ============================================================

// dtor_helper_2
export function FUN_00511630() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_0051163c @ 0x0051163C
// Size: 9 bytes
// ============================================================

// seh_cleanup_thunk
export function FUN_0051163c() {
  FUN_0040f510();
  return;
}



// ============================================================
// Function: FUN_0051164f @ 0x0051164F
// Size: 14 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_0051164f (14 bytes)
export function FUN_0051164f() {
  // DEVIATION: Win32 — SEH epilog
  return;
}



// ============================================================
// Function: FUN_00511690 @ 0x00511690
// Size: 67 bytes
// ============================================================

// scale_by_speed
export function FUN_00511690(param_1) {
  let in_ECX;
  if (s32(in_ECX, 0x15d4) !== 2) {
    param_1 = (s32(in_ECX, 0x15d4) * param_1) / 2;
  }
  return param_1;
}



// ============================================================
// Function: FUN_005116f0 @ 0x005116F0
// Size: 33 bytes
// ============================================================

// property_sheet_set_wrapper
export function FUN_005116f0(param_1) {
  FUN_0043ce5a(DAT_00679640, param_1);
  return;
}



// ============================================================
// Function: FUN_00511720 @ 0x00511720
// Size: 123 bytes
// ============================================================

// ctor_init_ecx
export function FUN_00511720() {
  let in_ECX;
  // SEH setup omitted
  FUN_0040f480();
  FUN_005bd630();
  FUN_005bd630();
  w8(in_ECX, 200, 0);
  return in_ECX;
}



// ============================================================
// Function: FUN_005117f0 @ 0x005117F0
// Size: 33 bytes
// ============================================================

// set_ecx_field_2c
export function FUN_005117f0(param_1) {
  let in_ECX;
  w32(in_ECX, 0x2c, param_1);
  return;
}



// ============================================================
// Function: EnableStackedTabs_00511820 @ 0x00511820
// Size: 36 bytes
// ============================================================

// CPropertySheet::EnableStackedTabs (variant 1)
export function EnableStackedTabs_00511820(this_ptr, param_1) {
  // DEVIATION: *(this_ptr + 0x2cc) = param_1 — MFC CPropertySheet method
  return;
}



// ============================================================
// Function: EnableStackedTabs_00511850 @ 0x00511850
// Size: 36 bytes
// ============================================================

// CPropertySheet::EnableStackedTabs (variant 2)
export function EnableStackedTabs_00511850(this_ptr, param_1) {
  // DEVIATION: *(this_ptr + 0x2d0) = param_1 — MFC CPropertySheet method
  return;
}



// ============================================================
// Function: FUN_00511880 @ 0x00511880
// Size: 398 bytes
// ============================================================

// mp_enqueue_notification
export function FUN_00511880(param_1, param_2, param_3, param_4, param_5, param_6) {
  let sVar1;
  let local_14;
  let local_10 = 0;
  let local_c;
  let local_8 = null;

  if (2 < DAT_00655b02) {
    if (param_3 !== 0) {
      for (local_c = 0; local_c < param_3; local_c = local_c + 1) {
        sVar1 = _strlen(DAT_0063cc48[local_c * 0x104]);
        local_10 = local_10 + sVar1 + 1;
      }
    }
    if (param_4 !== 0) {
      local_10 = param_4 * 4 + local_10;
    }
    if (local_10 !== 0) {
      local_8 = new Array(local_10);
      local_14 = local_8;
      if (param_3 !== 0) {
        for (local_c = 0; local_c < param_3; local_c = local_c + 1) {
          FUN_005f22d0(local_14, DAT_0063cc48[local_c * 0x104]);
          sVar1 = _strlen(DAT_0063cc48[local_c * 0x104]);
          local_14 = local_14 + sVar1 + 1;
        }
      }
      if (param_4 !== 0) {
        for (local_c = 0; local_c < param_4; local_c = local_c + 1) {
          // memcpy(local_14, &DAT_0063cc30 + local_c * 4, 4)
          local_14 = local_14 + 4;
        }
      }
    }
    FUN_0046b14d(0x6a, param_2, param_1, param_3, param_4, param_5, param_6, 0, 0, local_8);
  }
  return;
}



// ============================================================
// Function: FUN_00511a0e @ 0x00511A0E
// Size: 193 bytes
// ============================================================

// mp_notification_queue_enqueue
export function FUN_00511a0e(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let puVar2 = new Array(param_7 + 0x1c);
  puVar2[0] = 0;
  puVar2[1] = param_1;
  puVar2[2] = param_2;
  puVar2[3] = param_3;
  puVar2[4] = param_4;
  puVar2[5] = param_5;
  puVar2[6] = param_7;
  if (param_7 !== 0) {
    // DEVIATION: FID_conflict__memcpy(puVar2 + 7, param_6, param_7)
  }
  let puVar1 = puVar2;
  if (DAT_00631130 !== null) {
    DAT_00631134[0] = puVar2;
    puVar1 = DAT_00631130;
  }
  DAT_00631130 = puVar1;
  DAT_00631134 = puVar2;
  return;
}



// ============================================================
// Function: FUN_00511acf @ 0x00511ACF
// Size: 94 bytes
// ============================================================

// mp_notification_queue_flush
export function FUN_00511acf() {
  let puVar1;
  while (puVar1 = DAT_00631130, DAT_00631130 !== null) {
    DAT_00631130 = DAT_00631130[0];
    operator_delete(puVar1);
  }
  DAT_00631134 = 0;
  return;
}



// ============================================================
// Function: FUN_00511b2d @ 0x00511B2D
// Size: 117 bytes
// ============================================================

// mp_process_timer_tick
export function FUN_00511b2d() {
  let iVar1;
  FUN_0047e94e(1, 0);
  if (((DAT_006ad698 === '\0') && (DAT_006c91e4 === 0)) &&
     (iVar1 = FUN_00421bb0(), iVar1 - _DAT_006cec80 < 0x4b1)) {
    return;
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  _DAT_006cec80 = FUN_00421bb0();
  return;
}



// ============================================================
// Function: FUN_00511ba2 @ 0x00511BA2
// Size: 7252 bytes
// ============================================================

// mp_process_notification_popup (massive switch on 102 message types)
export function FUN_00511ba2() {
  let piVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let local_338;
  let local_330;
  let local_310;
  let local_308 = new Array(220);
  let local_22c;

  // SEH setup omitted
  piVar1 = DAT_00631130;
  FUN_0059db08(0x4000);
  if (piVar1 !== null) {
    _DAT_006ad67c = 1;
    DAT_00631130 = piVar1[0];
    if (DAT_00631130 === null) {
      DAT_00631134 = 0;
    }
    let local_14;
    if ((piVar1[2] !== 0) || (piVar1[3] !== 0)) {
      local_14 = piVar1 + 7; // pointer to payload data after header
    }
    if (piVar1[2] !== 0) {
      for (local_310 = 0; local_310 < piVar1[2]; local_310 = local_310 + 1) {
        FUN_005f22d0(DAT_0063cc48[local_310 * 0x104], local_14);
        sVar2 = _strlen(DAT_0063cc48[local_310 * 0x104]);
        local_14 = local_14 + sVar2 + 1;
      }
    }
    if (piVar1[3] !== 0) {
      for (local_310 = 0; local_310 < piVar1[3]; local_310 = local_310 + 1) {
        // DEVIATION: FID_conflict__memcpy(&DAT_0063cc30 + local_310 * 4, local_14, 4);
        local_14 = local_14 + 1;
      }
    }

    DAT_00635a3c = 0x00403c74; // LAB_00403c74
    switch (piVar1[1]) {
    case 0:
      FUN_00421ea0(s_RETIREDIE_00631140);
      break;
    case 1:
      FUN_00421ea0(s_RETIREAI_0063114c);
      break;
    case 2:
      FUN_004442e0(s_BARBARIANS_00631158, piVar1[4]);
      break;
    case 3:
      FUN_00410030(s_GLOBALWARMING_00631164, DAT_0063fc58, 0);
      break;
    case 4:
      FUN_00410030(s_FEARWARMING_00631174, DAT_0063fc58, 0);
      break;
    case 5:
      FUN_00432611();
      break;
    case 6:
      FUN_00410030(s_EAGLEHASLANDED_00631180, DAT_0063fc58, 0);
      break;
    case 7:
      FUN_00410030(s_SCENARIOENDS_00631190, DAT_00643af8, 0);
      break;
    case 8:
      FUN_00410030(s_SCENARIOEND_006311a0, DAT_00643af8, 0);
      break;
    case 9:
      uVar4 = FUN_00493ba6(DAT_006d1da0);
      FUN_0040ff60(0, uVar4);
      uVar4 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_PLANRETIRE_006311ac, DAT_00643af8, 0);
      break;
    case 10:
      uVar4 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_DORETIRE_006311b8, DAT_00643af8, 0);
      break;
    case 0xb:
      FUN_00421ea0(s_LAUNCHED_006311c4);
      FUN_004d0208(-piVar1[4]);
      break;
    case 0xc:
      FUN_00421ea0(s_SPACERETURNS_006311d0);
      break;
    case 0xd:
      FUN_00421ea0(s_SPACEDESTROYED_006311e0);
      break;
    case 0xe:
      FUN_0046e571(2, 1);
      FUN_00410030(s_DESTROYED_006311f0, DAT_00643798[piVar1[4] * 0x3c], 0);
      break;
    case 0xf:
      FUN_0046e020((-(piVar1[5] === 0 ? 1 : 0) & 0x14) + 0x16, 1, 0, 0);
      FUN_004442e0(s_CARAVAN_006311fc, piVar1[4]);
      break;
    case 0x10:
      FUN_0046e020((-(piVar1[5] === 0 ? 1 : 0) & 0x14) + 0x16, 1, 0, 0);
      FUN_004442e0(s_FOODCARAVAN_00631204, piVar1[4]);
      break;
    case 0x11:
      FUN_004442a0(s_CARAVANOTHER_00631210, piVar1[4], piVar1[5]);
      break;
    case 0x12:
      FUN_0043c9d0(s_STARTWONDER_00631220);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, piVar1[5]);
      FUN_0040bc80(0);
      break;
    case 0x13:
      FUN_0043c9d0(s_SWITCHWONDER_0063122c);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, piVar1[5]);
      FUN_0040bc80(0);
      break;
    case 0x14:
      FUN_0043c9d0(s_ABANDONWONDER_0063123c);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, piVar1[5]);
      FUN_0040bc80(0);
      break;
    case 0x15:
      FUN_004442e0(s_PARADROP_0063124c, piVar1[4]);
      break;
    case 0x16:
      FUN_00421ea0(s_SCHISM_00631258);
      break;
    case 0x17:
      uVar4 = FUN_00410030(s_CANESCAPE_00631260, DAT_0063fc58, 0);
      FUN_0046b14d(0x77, DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x18:
      FUN_00414dd0(s_ESCAPE_0063126c, piVar1[4]);
      break;
    case 0x19:
      FUN_0043c9d0(s_CAPTUREWONDER_00631274);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x1a:
      FUN_0043c9d0(s_LOSTWONDER_00631284);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x1b:
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYCAPTURE_00631290, piVar1[5], 0x46, 1, piVar1[4]);
      break;
    case 0x1c:
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYWINALLY_0063129c, piVar1[5], 0x46, 1, piVar1[4]);
      break;
    case 0x1d:
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYLOSEALLY_006312a8, piVar1[5], 0x46, 1, piVar1[4]);
      break;
    case 0x1e:
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYCAPTURE2_006312b8, piVar1[5], 0x46, 1, piVar1[4]);
      break;
    case 0x1f:
      FUN_004442e0(s_PARTISANS_006312c8, piVar1[4]);
      break;
    case 0x20:
      FUN_004442e0(s_PROMOTED_006312d4, piVar1[4]);
      break;
    case 0x21:
      FUN_00410030(s_INCORRUPTIBLE_006312e0, DAT_006469e0, 0);
      break;
    case 0x22:
      FUN_004442e0(s_DESERTED_006312f0, piVar1[4]);
      break;
    case 0x23:
      uVar4 = FUN_004442e0(s_DESERT_006312fc, piVar1[5]);
      FUN_0046b14d(0x7b, DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x24:
      uVar4 = FUN_004442e0(s_DESERT2_00631304, piVar1[5]);
      FUN_0046b14d(0x7b, DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x25:
      FUN_004442e0(s_BLEWITUP_0063130c, piVar1[4]);
      break;
    case 0x26:
      FUN_00410030(s_BOND007_00631318, DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x27:
      FUN_00410030(DAT_00631320, DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x28:
      FUN_00410030(s_BONDGLORY_00631328, DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x29:
      FUN_004cc870(s_USEWEAPONS_00631334, 0x3e, 8);
      break;
    case 0x2a:
      FUN_004cc870(DAT_00631340, 0x11, 8);
      break;
    case 0x2b:
      FUN_00410030(s_CHANGED_00631344, DAT_00646878[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x2c:
      FUN_00410030(s_OVERTHROWN_0063134c, DAT_00646878[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x2d:
      FUN_004442e0(s_BREAKCEASE_00631358, piVar1[4]);
      break;
    case 0x2e:
      FUN_004442e0(s_SNEAK_00631364, piVar1[4]);
      break;
    case 0x2f:
      FUN_004442e0(s_MISSILEATTACK_0063136c, piVar1[4]);
      break;
    case 0x30:
      FUN_004442e0(s_PEARLHARBOR_0063137c, piVar1[4]);
      break;
    case 0x31:
      FUN_004cc870(s_BATTERY2_00631388, piVar1[4], 8);
      break;
    case 0x32:
      FUN_004cc870(s_BATTERY_00631394, piVar1[4], 8);
      break;
    case 0x33:
      FUN_004442e0(s_SCRAMBLE_0063139c, piVar1[4]);
      break;
    case 0x34:
      FUN_004442e0(s_AMPHIBMOTIZE_006313a8, piVar1[4]);
      break;
    case 0x35:
      FUN_00421ea0(s_MULTIPLELOSE_006313b8);
      break;
    case 0x36:
      FUN_00421ea0(s_MULTIPLEWIN_006313c8);
      break;
    case 0x37:
      FUN_004442a0(s_RANSOM_006313d4, piVar1[4], 0);
      break;
    case 0x38:
      FUN_00410030(s_ACTIVATEALLY_006313dc,
                   DAT_00648018[((DAT_00655b91 !== '\0' ? 1 : 0) - 1 & 0xffff7c80)], 0);
      break;
    case 0x39:
      FUN_00410030(s_ALLYHELPS_006313ec,
                   DAT_00648018[((DAT_00655b91 !== '\0' ? 1 : 0) - 1 & 0xffff7c80)], 0);
      break;
    case 0x3a:
      FUN_00421ea0(s_CANCELPEACE_006313f8);
      break;
    case 0x3b:
      FUN_00421ea0(s_ALLYUNDERATTACK_00631404);
      break;
    case 0x3c:
      FUN_00421ea0(s_ALLYATTACKING_00631414);
      break;
    case 0x3d:
      w16(DAT_0064ca82, piVar1[4] * 2 + DAT_006d1da0 * 0x594, DAT_00655af8);
      w16(DAT_0064ca82, piVar1[4] * 0x594 + DAT_006d1da0 * 2, DAT_00655af8);
      if (DAT_0067a8c0 === -1) {
        DAT_0067a8c0 = 0xfffffffe;
        FUN_0040bbb0();
        uVar4 = FUN_00493ba6(piVar1[4]);
        FUN_0040bbe0(uVar4);
        FUN_0040fe10();
        uVar4 = FUN_00493b10(piVar1[4]);
        FUN_0040bbe0(uVar4);
        FUN_0040fe10();
        FUN_0040bc10(0x8c);
        FUN_0040fe10();
        uVar4 = FUN_00493c7d(piVar1[4]);
        FUN_0040bbe0(uVar4);
        FUN_0040ff60(0, DAT_00679640);
        uVar4 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(1, uVar4);
        uVar4 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(2, uVar4);
        if (DAT_0064c6e0[piVar1[4] * 0x594 + DAT_006d1da0] === '\0') {
          local_330 = 0;
        } else {
          local_330 = FUN_004679ab(DAT_0064c6e0[piVar1[4] * 0x594 + DAT_006d1da0]);
        }
        uVar4 = FUN_00428b0c(DAT_0064b9c0[local_330 * 4]);
        FUN_0040ff60(3, uVar4);
        DAT_00635a3c = 0x00403d0f; // LAB_00403d0f
        iVar3 = FUN_00410030(s_PARLEYREQUEST_00631424, DAT_0063fc58, 0);
        if (DAT_006ad698 === '\0') {
          if (DAT_006c91e4 === 0) {
            FUN_0046b14d(0x80,
              DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
              iVar3, 0, 0, 0, 0, 0, 0, 0);
          }
          if (DAT_006c91e4 === 0) {
            if (iVar3 === 1) {
              iVar3 = piVar1[4];
              operator_delete(piVar1);
              _DAT_006ad67c = 0;
              FUN_004b7eb6(iVar3, 2);
              FUN_0051399d();
              FUN_005139b3();
              return;
            }
          } else {
            DAT_006c91e4 = 0;
            uVar4 = FUN_00493c7d(piVar1[4]);
            FUN_0040ff60(0, uVar4);
            DAT_00635a3c = 0x00403c74; // LAB_00403c74
            FUN_00410030(s_PARLEYCANCEL_00631434, DAT_0063fc58, 0);
          }
          DAT_0067a8c0 = -1;
          DAT_00626a2c = 0;
        } else {
          FUN_0046b14d(0x80,
            DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
            2, 0, 0, 0, 0, 0, 0, 0);
          DAT_0067a8c0 = -1;
          DAT_00626a2c = 0;
        }
      } else {
        FUN_0046b14d(0x80,
          DAT_006ad30c[DAT_006ad558[piVar1[4] * 4] * 0x54],
          2, 0, 0, 0, 0, 0, 0, 0);
      }
      break;
    case 0x3e:
      FUN_004442a0(s_UPGRADE_00631444, piVar1[4], (piVar1[5] === 0 ? 1 : 0) - 1 & 8);
      break;
    case 0x3f:
      if (DAT_006ad30c[DAT_006ad558[DAT_006d1da0 * 4] * 0x54] !== piVar1[4]) {
        FUN_00410030(s_NEWPLAYER_0063144c, DAT_0063fc58, 0);
      }
      break;
    case 0x40:
      FUN_0040ffa0(s_NEWTURNTIMERCLIENT_00631458, 0x2000000);
      uVar4 = FUN_00428b0c(DAT_00628420[0xd50]);
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(DAT_00628420[0xd54]);
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0x28);
      FUN_0046b14d(0x56, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x41:
      FUN_00410030(s_NEWTURNTIMERNO_0063146c, DAT_0063fc58, 0);
      break;
    case 0x42:
      FUN_00410030(s_NEWTURNTIMERYES_0063147c, DAT_0063fc58, 0);
      break;
    case 0x43:
      FUN_0040ffa0(s_PMCHANGECLIENT_0063148c, 0x2000000);
      uVar4 = FUN_00428b0c(DAT_00628420[0xd50]);
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(DAT_00628420[0xd54]);
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0);
      FUN_0046b14d(0x57, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x44:
      FUN_00410030(s_PMCHANGENO_0063149c, DAT_0063fc58, 0);
      break;
    case 0x45:
      FUN_00410030(s_PMCHANGEYES_006314a8, DAT_0063fc58, 0);
      break;
    case 0x46:
      FUN_0046e020(0x23, 1, 0, 0);
      FUN_004eb571(s_MANHATTAN_006314b4, piVar1[4], 1, DAT_00645fe8);
      break;
    case 0x47:
      FUN_0043c9d0(s_BUILT2_006314c0);
      if (piVar1[4] < 0) {
        local_338 = DAT_00645160[piVar1[5] * 0x3c];
      } else {
        local_338 = DAT_00645a84[piVar1[4] * 0x3c];
      }
      FUN_0059ec88(local_338, 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x48:
      FUN_00421ea0(s_MOVECAPITAL_006314c8);
      break;
    case 0x49:
      FUN_00421ea0(s_ASTRONAUTS_006314d4);
      break;
    case 0x4a:
      FUN_0043c9d0(s_ALMOSTWONDER_006314e0);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4b:
      FUN_0043c9d0(s_STILLWONDER1_006314f0);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4c:
      FUN_0043c9d0(s_STILLWONDER2_00631500);
      FUN_0059ec88(DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4d:
      FUN_0043c9d0(s_ENDWONDER_00631510);
      FUN_0059ec88(DAT_00646cb8[
        s8(DAT_0062768c[piVar1[4] * 0x10]) * 0xf0 +
        s8(DAT_0062768d[piVar1[4] * 0x10]) * 0x3c], 0, 0);
      FUN_0059ec88(DAT_00645160[piVar1[5] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4e:
      FUN_004442e0(s_BARBARIANSLAND_0063151c, piVar1[4]);
      break;
    case 0x4f:
      FUN_00421dd0();
      for (local_310 = 0; local_310 < piVar1[2]; local_310 = local_310 + 1) {
        FUN_0059e18b(DAT_0063cc48[local_310 * 0x104], 0xffffffff, 0xffffffff, 0xffffffff, 0);
      }
      FUN_0040bc80(0);
      break;
    case 0x50:
      FUN_00410030(s_WARENDS_0063152c, DAT_00647748, 0);
      break;
    case 0x51:
      FUN_004442e0(s_MILITARYAID1_00631534, piVar1[4]);
      break;
    case 0x52:
      FUN_004442e0(s_MILITARYAID2_00631544, piVar1[4]);
      break;
    case 0x53:
      FUN_00410030(s_LOSTCLIENT_00631554, DAT_0063fc58, 0);
      break;
    case 0x54:
      FUN_004c4240(s_GOLDENAGE_00631560, 0x3c, 8);
      break;
    case 0x55:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYEMBASSY_0063156c, DAT_0063fc58, 0);
      break;
    case 0x56:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYINVESTIGATE_0063157c, DAT_0063fc58, 0);
      break;
    case 0x57:
      iVar3 = FUN_004bd9f0(piVar1[4], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00410030(s_STEAL_00631590, DAT_0063fc58, 0);
      break;
    case 0x58:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_FOILEDAGAIN_00631598, DAT_0063fc58, 0);
      break;
    case 0x59:
      iVar3 = FUN_004bd9f0(piVar1[5], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00410030(s_SABOTAGEONE_006315d8, DAT_00645160[piVar1[4] * 0x3c], 8);
      break;
    case 0x5a:
      iVar3 = FUN_004bd9f0(piVar1[4], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00421ea0(s_SABOTAGETWO_006315e4);
      break;
    case 0x5b:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_WATERSUPPLY_006315a4, DAT_0063fc58, 0);
      break;
    case 0x5c:
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE_006315b0);
      FUN_004cc870(DAT_00679640, 0x3e, 8);
      break;
    case 0x5d:
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE2_006315bc);
      FUN_004cc870(DAT_00679640, 0x3e, 8);
      break;
    case 0x5e:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00421ea0(s_CIVILWAR_006315cc);
      break;
    case 0x5f:
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPMINE_006315f0, piVar1[4]);
      break;
    case 0x60:
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPYOURS_006315f8, piVar1[4]);
      break;
    case 0x61:
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPYOURSTOO_00631600, piVar1[4]);
      break;
    case 0x62:
      FUN_00421ea0(s_MERCDECLARE_0063160c);
      break;
    case 99: // 0x63
      FUN_004c4240(s_TOOKCIV_00631618, piVar1[4], 0);
      break;
    case 100: // 0x64
      if ((DAT_0067a8bc === 0) && (piVar1[4] === DAT_0067a8c0)) {
        DAT_00631138 = 1;
        FUN_0040ffa0(s_REVEALUNITORIGINS_00631620, 0x2000000);
        uVar4 = FUN_00428b0c(DAT_00628420[0xdd4]);
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(DAT_00628420[0xdd8]);
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if (local_22c === 1) {
          DAT_0067ab65 = '\x01';
          if (DAT_0067a994 === 2) {
            FUN_0040f380();
            FUN_00453c80();
            FUN_0043c5f0();
            FUN_00453c40();
          } else {
            FUN_0043c5f0();
            FUN_00453c40();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          FUN_0046b14d(0xa7,
            DAT_006ad30c[DAT_006ad558[DAT_0067a8c0 * 4] * 0x54],
            DAT_006d1da0, DAT_0067ab65, 0, 0, 0, 0, 0, 0);
          if (((DAT_0067a994 === 0xe) && (DAT_0067a9b8 === 2)) ||
             ((DAT_0067a994 === 0xf && (DAT_0067a9bc === 2)))) {
            FUN_0040f380();
            FUN_0043c5f0();
            DAT_0067ab65 = '\x01';
            FUN_00453c80();
            FUN_00453c80();
            FUN_00468bb9(0);
          }
        }
        DAT_00631138 = 0;
      }
      break;
    case 0x65:
      if ((DAT_0067a8bc === 0) && (piVar1[4] === DAT_0067a8c0)) {
        DAT_0063113c = 1;
        FUN_0040ffa0(s_REVEALCITYINFO_00631634, 0x2000000);
        uVar4 = FUN_00428b0c(DAT_00628420[0xddc]);
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(DAT_00628420[0xdd8]);
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if (local_22c === 1) {
          DAT_0067ab66 = '\x01';
          if (DAT_0067a994 === 2) {
            FUN_0040f380();
            FUN_00453c80();
            FUN_0043c5f0();
            FUN_00453c40();
          } else {
            FUN_0043c5f0();
            FUN_00453c40();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          FUN_0046b14d(0xa5,
            DAT_006ad30c[DAT_006ad558[DAT_0067a8c0 * 4] * 0x54],
            DAT_006d1da0, DAT_0067ab66, 0, 0, 0, 0, 0, 0);
          if (((DAT_0067a994 === 0xe) && (DAT_0067a9b8 === 3)) ||
             ((DAT_0067a994 === 0xf && (DAT_0067a9bc === 3)))) {
            FUN_0040f380();
            FUN_0043c5f0();
            FUN_0058878e(0);
          }
        }
        DAT_0063113c = 0;
      }
      break;
    default:
      break;
    }
    operator_delete(piVar1);
    _DAT_006ad67c = 0;
  }
  FUN_0051399d();
  FUN_005139b3();
  return;
}



// ============================================================
// Function: FUN_0051399d @ 0x0051399D
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function FUN_0051399d() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_005139b3 @ 0x005139B3
// Size: 14 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_005139b3 (14 bytes)
export function FUN_005139b3() {
  // DEVIATION: Win32 — SEH epilog
  return;
}



// ============================================================
// Function: FUN_00514220 @ 0x00514220
// Size: 52 bytes
// ============================================================

// net_msg_queue_init
export function FUN_00514220() {
  let in_ECX;
  // DEVIATION: _memset(in_ECX, 0, 24000) — zero-fills queue memory
  FUN_00514272();
  return in_ECX;
}



// ============================================================
// Function: FUN_00514254 @ 0x00514254
// Size: 30 bytes
// ============================================================

// net_msg_queue_reset
export function FUN_00514254() {
  FUN_00514272();
  return;
}



// ============================================================
// Function: FUN_00514272 @ 0x00514272
// Size: 237 bytes
// ============================================================

// net_msg_queue_clear_all_slots
export function FUN_00514272() {
  let in_ECX;
  let local_8;
  for (local_8 = 0; local_8 < 2000; local_8 = local_8 + 1) {
    if (s32(in_ECX, 4 + local_8 * 0xc) !== 0) {
      operator_delete(s32(in_ECX, 4 + local_8 * 0xc));
      w32(in_ECX, 4 + local_8 * 0xc, 0);
    }
    w32(in_ECX, 8 + local_8 * 0xc, 0);
    w32(in_ECX, local_8 * 0xc, 0);
  }
  w32(in_ECX, 24000, 400);
  w32(in_ECX, 0x5dc4, 400);
  w32(in_ECX, 0x5dc8, 0);
  w32(in_ECX, 0x5dcc, 0);
  w32(in_ECX, 0x5dd0, 0);
  w32(in_ECX, 0x5dd4, 0);
  return;
}



// ============================================================
// Function: FUN_0051435f @ 0x0051435F
// Size: 48 bytes
// ============================================================

// is_alpha_msg_type
export function FUN_0051435f(param_1) {
  let uVar1;
  if ((param_1 < 0x2a) || (0x66 < param_1)) {
    uVar1 = 0;
  } else {
    uVar1 = 1;
  }
  return uVar1;
}



// ============================================================
// Function: FUN_0051438f @ 0x0051438F
// Size: 1602 bytes
// ============================================================

// net_msg_queue_enqueue_message
export function FUN_0051438f(param_1, param_2, param_3) {
  let iVar1;
  let pvVar2;
  let in_ECX;

  if (((DAT_00655b02 === 5) || (DAT_00655b02 === 6)) && (param_1 !== 0) &&
     (param_1 !== 0xff)) {
    if (DAT_006ad2f7 === '\0') {
      param_1 = 0;
    } else {
      param_1 = 1;
    }
  }
  let msgType = s32(param_2, 4);
  if (msgType === 0x2b) {
    _DAT_006c908c = _DAT_006c908c + 1;
    FUN_0046b14d(0x2c, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  } else if (msgType === 0x2c) {
    DAT_006c9090 = DAT_006c9090 + 1;
  } else {
    iVar1 = FUN_0051435f(msgType);
    if (iVar1 === 0) {
      // Primary queue enqueue
      if ((s32(in_ECX, 24000) === s32(in_ECX, 0x5dc4)) &&
         (s32(in_ECX, 0x5dc8) !== 0)) {
        FUN_005d22b7(s_MESSAGE_LOST_in_EnqueueMessage, param_1, param_3);
        return 0;
      }
      if ((s32(in_ECX, 24000) < 400) || (1999 < s32(in_ECX, 24000))) {
        FUN_005dae6b(7, s_head_gt_400_head_lt_MAX, s_NetMessageQueue_primary, 0x130);
      }
      if ((s32(in_ECX, 0x5dc4) < 400) || (1999 < s32(in_ECX, 0x5dc4))) {
        FUN_005dae6b(7, s_tail_gt_400_tail_lt_MAX, s_NetMessageQueue_tail, 0x131);
      }
      pvVar2 = operator_new(param_3);
      w32(in_ECX, 4 + s32(in_ECX, 0x5dc4) * 0xc, pvVar2);
      if (s32(in_ECX, 4 + s32(in_ECX, 0x5dc4) * 0xc) === 0) {
        FUN_005d22b7(s_EnqueueMessage_Primary_Failed, s32(param_2, 4), s32(param_2, 8));
        return 0;
      }
      FID_conflict__memcpy(s32(in_ECX, 4 + s32(in_ECX, 0x5dc4) * 0xc), param_2, param_3);
      w32(in_ECX, s32(in_ECX, 0x5dc4) * 0xc, param_1);
      w32(in_ECX, 8 + s32(in_ECX, 0x5dc4) * 0xc, param_3);
      w32(in_ECX, 0x5dc4, (s32(in_ECX, 0x5dc4) + 1) % 2000);
      if (s32(in_ECX, 0x5dc4) === 0) {
        w32(in_ECX, 0x5dc4, 400);
      }
      w32(in_ECX, 0x5dc8, s32(in_ECX, 0x5dc8) + 1);
      if (DAT_006ad690 < s32(in_ECX, 0x5dc8)) {
        DAT_006ad690 = s32(in_ECX, 0x5dc8);
      }
    } else {
      // Alpha queue enqueue
      if ((s32(in_ECX, 0x5dcc) === s32(in_ECX, 0x5dd0)) &&
         (s32(in_ECX, 0x5dd4) !== 0)) {
        FUN_005d22b7(s_MESSAGE_LOST_in_Alpha_EnqueueMessage, param_1, param_3);
        return 0;
      }
      if ((s32(in_ECX, 0x5dcc) < 0) || (399 < s32(in_ECX, 0x5dcc))) {
        FUN_005dae6b(7, s_alphaHead_gt_0_lt_400, s_NetMessageQueue_alpha_head, 0x10c);
      }
      if ((s32(in_ECX, 0x5dd0) < 0) || (399 < s32(in_ECX, 0x5dd0))) {
        FUN_005dae6b(7, s_alphaTail_gt_0_lt_400, s_NetMessageQueue_alpha_tail, 0x10d);
      }
      pvVar2 = operator_new(param_3);
      w32(in_ECX, 4 + s32(in_ECX, 0x5dd0) * 0xc, pvVar2);
      if (s32(in_ECX, 4 + s32(in_ECX, 0x5dd0) * 0xc) === 0) {
        FUN_005d22b7(s_EnqueueMessage_Alpha_Failed, s32(param_2, 4), s32(param_2, 8));
        return 0;
      }
      FID_conflict__memcpy(s32(in_ECX, 4 + s32(in_ECX, 0x5dd0) * 0xc), param_2, param_3);
      w32(in_ECX, s32(in_ECX, 0x5dd0) * 0xc, param_1);
      w32(in_ECX, 8 + s32(in_ECX, 0x5dd0) * 0xc, param_3);
      w32(in_ECX, 0x5dd0, (s32(in_ECX, 0x5dd0) + 1) % 400);
      w32(in_ECX, 0x5dd4, s32(in_ECX, 0x5dd4) + 1);
      if (DAT_006ad694 < s32(in_ECX, 0x5dd4)) {
        DAT_006ad694 = s32(in_ECX, 0x5dd4);
      }
    }
  }
  return 1;
}



// ============================================================
// Function: FUN_005149d6 @ 0x005149D6
// Size: 461 bytes
// ============================================================

// net_msg_queue_dequeue_message
export function FUN_005149d6(param_1, param_2, param_3, param_4) {
  let uVar1;
  let in_ECX;

  if (s32(in_ECX, 0x5dd4) !== 0) {
    // Dequeue from alpha queue (priority)
    param_1[0] = s32(in_ECX, s32(in_ECX, 0x5dcc) * 0xc);
    w32(in_ECX, s32(in_ECX, 0x5dcc) * 0xc, 0);
    param_2[0] = s32(in_ECX, 4 + s32(in_ECX, 0x5dcc) * 0xc);
    w32(in_ECX, 4 + s32(in_ECX, 0x5dcc) * 0xc, 0);
    param_3[0] = s32(in_ECX, 8 + s32(in_ECX, 0x5dcc) * 0xc);
    w32(in_ECX, 8 + s32(in_ECX, 0x5dcc) * 0xc, 0);
    w32(in_ECX, 0x5dcc, (s32(in_ECX, 0x5dcc) + 1) % 400);
    w32(in_ECX, 0x5dd4, s32(in_ECX, 0x5dd4) - 1);
    uVar1 = 1;
  } else {
    if ((param_4 === 0) && (s32(in_ECX, 0x5dc8) !== 0)) {
      // Dequeue from primary queue
      param_1[0] = s32(in_ECX, s32(in_ECX, 24000) * 0xc);
      w32(in_ECX, s32(in_ECX, 24000) * 0xc, 0);
      param_2[0] = s32(in_ECX, 4 + s32(in_ECX, 24000) * 0xc);
      w32(in_ECX, 4 + s32(in_ECX, 24000) * 0xc, 0);
      param_3[0] = s32(in_ECX, 8 + s32(in_ECX, 24000) * 0xc);
      w32(in_ECX, 8 + s32(in_ECX, 24000) * 0xc, 0);
      w32(in_ECX, 24000, (s32(in_ECX, 24000) + 1) % 2000);
      if (s32(in_ECX, 24000) === 0) {
        w32(in_ECX, 24000, 400);
      }
      w32(in_ECX, 0x5dc8, s32(in_ECX, 0x5dc8) - 1);
      uVar1 = 1;
    } else {
      uVar1 = 0;
    }
  }
  return uVar1;
}



// ============================================================
// Function: FID_conflict___E31 @ 0x00514E10
// Size: 26 bytes
// ============================================================

// CRT static init
export function FID_conflict___E31() {
  FUN_00514e2a();
  FUN_00514e44();
  return;
}



// ============================================================
// Function: FUN_00514e2a @ 0x00514E2A
// Size: 26 bytes
// ============================================================

// CRT lock init
export function FUN_00514e2a() {
  FUN_005bd630();
  return;
}



// ============================================================
// Function: FUN_00514e44 @ 0x00514E44
// Size: 29 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_00514e44 (29 bytes)
export function FUN_00514e44() {
  // DEVIATION: Win32 — _atexit(FUN_00514e61)
  return;
}



// ============================================================
// Function: FUN_00514e61 @ 0x00514E61
// Size: 26 bytes
// ============================================================

// CRT lock cleanup
export function FUN_00514e61() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_00514e7b @ 0x00514E7B
// Size: 119 bytes
// ============================================================

// wonders_council_show
export function FUN_00514e7b(param_1) {
  let iVar1;
  // SEH setup omitted
  FUN_00514f16();
  iVar1 = FUN_005151f4(param_1);
  if (iVar1 === 0) {
    FUN_00514ef2();
    FUN_00514f08();
    return;
  }
  FUN_00515516();
  FUN_00514ef2();
  FUN_00514f08();
  return;
}



// ============================================================
// Function: FUN_00514ef2 @ 0x00514EF2
// Size: 12 bytes
// ============================================================

// wonders_council_dtor_thunk
export function FUN_00514ef2() {
  FUN_005150b9();
  return;
}



// ============================================================
// Function: FUN_00514f08 @ 0x00514F08
// Size: 14 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_00514f08 (14 bytes)
export function FUN_00514f08() {
  // DEVIATION: Win32 — SEH epilog
  return;
}



// ============================================================
// Function: FUN_00514f16 @ 0x00514F16
// Size: 295 bytes
// ============================================================

// wonders_council_ctor
export function FUN_00514f16() {
  let in_ECX;
  // SEH setup omitted
  FUN_0044c730(); // DEVIATION: MFC CPropertySheet ctor
  FUN_005c64da();
  FUN_0044c5a0(); // DEVIATION: MFC base ctor
  FUN_005bd630();
  FUN_004502b0(); // DEVIATION: MFC ctor chain
  // DEVIATION: CString::CString(in_ECX + 0x64c)
  // DEVIATION: CString::CString(in_ECX + 0x688)
  FUN_0043c690();
  w32(in_ECX, 0x6c4, 0);
  DAT_00631a98 = in_ECX;
  w32(in_ECX, 0x6fc, 0);
  SetRect(in_ECX + 0x6ec, 0xd0, 0x39, 0x1b1, 0x14c);
  FUN_0043c6c0(0, 0x18, 1);
  return in_ECX;
}



// ============================================================
// Function: FUN_005150b9 @ 0x005150B9
// Size: 177 bytes
// ============================================================

// wonders_council_dtor
export function FUN_005150b9() {
  // SEH setup omitted
  FUN_00450340(); // DEVIATION: MFC destructor chain
  DAT_00631a98 = 0;
  FUN_0051516a();
  FUN_00515179();
  FUN_00515188();
  FUN_00515197();
  FUN_005151a6();
  FUN_005151b5();
  FUN_005151c4();
  FUN_005151d3();
  FUN_005151e6();
  return;
}



// ============================================================
// Function: FUN_0051516a @ 0x0051516A
// Size: 15 bytes
// ============================================================

// dtor_sub1
export function FUN_0051516a() { FUN_0043c520(); return; }

// ============================================================
// Function: FUN_00515179 @ 0x00515179
// Size: 15 bytes
// ============================================================

// dtor_sub2
export function FUN_00515179() { FUN_005cde4d(); return; }

// ============================================================
// Function: FUN_00515188 @ 0x00515188
// Size: 15 bytes
// ============================================================

// dtor_sub3
export function FUN_00515188() { FUN_005cde4d(); return; }

// ============================================================
// Function: FUN_00515197 @ 0x00515197
// Size: 15 bytes
// ============================================================

// dtor_sub4_timevec
export function FUN_00515197() { /* _Timevec::~_Timevec */ return; }

// ============================================================
// Function: FUN_005151a6 @ 0x005151A6
// Size: 15 bytes
// ============================================================

// dtor_sub5
export function FUN_005151a6() { FUN_005bd915(); return; }

// ============================================================
// Function: FUN_005151b5 @ 0x005151B5
// Size: 15 bytes
// ============================================================

// dtor_sub6
export function FUN_005151b5() { FUN_0044cba0(); return; }

// ============================================================
// Function: FUN_005151c4 @ 0x005151C4
// Size: 15 bytes
// ============================================================

// dtor_sub7
export function FUN_005151c4() { FUN_005c656b(); return; }

// ============================================================
// Function: FUN_005151d3 @ 0x005151D3
// Size: 9 bytes
// ============================================================

// dtor_sub8
export function FUN_005151d3() { FUN_0044ca60(); return; }

// ============================================================
// Function: FUN_005151e6 @ 0x005151E6
// Size: 14 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_005151e6 (14 bytes)
export function FUN_005151e6() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_005151f4 @ 0x005151F4
// Size: 802 bytes
// ============================================================

// wonders_council_init_resources
export function FUN_005151f4(param_1) {
  let iVar1;
  let uVar2;
  let in_ECX;
  let local_a8;
  let local_24, local_20, local_1c, local_18;
  let local_14 = [0, 0, 0, 0]; // tagRECT

  FUN_005bcaa7(0 /* &local_24 */);
  FUN_004aef20(0 /* local_a4 */);
  FUN_0043c840(0 /* local_a4 */, s_civ2_mk_dll);
  iVar1 = FUN_00564713(0 /* local_a4 */);
  if (iVar1 === 0) {
    return 0;
  }
  FUN_004502e0(/* local_a4 */); // DEVIATION: MFC resource load
  w32(in_ECX, 0x6c4, param_1);
  FUN_005c5fc4(DAT_00631aac, 0x800, local_24, local_20, local_1c - local_24, (local_18 - local_20) + 5,
               DAT_006a8c00, DAT_006553d8);
  FUN_00419ba0(0); // DEVIATION: display helper
  FUN_005bb4ae(DAT_00631ab0, 0x800, 0, 0, 0x280, 0x1e0, in_ECX + 0xb8, in_ECX);
  FUN_00450400(); // DEVIATION: MFC resource helper
  FUN_005bf5e1(0x2711, 10, 0xec, in_ECX + 0xb8);
  FUN_005cedad(in_ECX + 0x600, 8, 0, 0, 0x129, 0xad);
  FUN_005bf5e1(10000, 10, 0xec, in_ECX + 0xb8);
  SetRect(local_14, 0, 0, 0x280, 0x1e0);
  FUN_005c0593(in_ECX + 0x4ec, local_14, local_14);
  SetRect(in_ECX + 0x6dc, 0xc1, 0x173, 0x1c0, 0x1cd);
  let pCVar3 = COleClientItem_GetActiveView(in_ECX + 0x600);
  let pCVar4 = COleClientItem_GetActiveView(in_ECX + 0x600);
  FUN_005bd65c(pCVar4, pCVar3);
  FUN_005c0593(DAT_006aad58, in_ECX + 0x6dc, in_ECX + 0x6dc);
  for (local_a8 = 0;
      (local_a8 < 0xc && (u8(DAT_00655142, local_a8) !== (param_1 & 0xff)));
      local_a8 = local_a8 + 1) {
  }
  DAT_00631a9c = 0;
  FUN_00515999(local_a8);
  w32(in_ECX, 0x6fc, 0x133);
  SetRect(in_ECX + 0x6cc, 0xab, s32(in_ECX, 0x6fc), 0x1d4,
          s32(in_ECX, 0x6fc) + 0xad);
  FUN_00515dc8(0);
  return 1;
}



// ============================================================
// Function: FUN_00515516 @ 0x00515516
// Size: 1122 bytes
// ============================================================

// wonders_council_animate_play
export function FUN_00515516() {
  let DVar1;
  let iVar2;
  let pcVar3;
  let in_ECX;
  let local_120;
  let local_11c = '';
  let local_1c;
  // SEH setup omitted
  FUN_0043c690();
  FUN_00408650(); // DEVIATION: Win32 video setup
  FUN_00419b80();
  FUN_00450390(in_ECX + 0xb8); // DEVIATION: MFC
  FUN_004085f0(); // DEVIATION: Win32
  FUN_00419b80();
  FUN_00414ce0(); // DEVIATION: Win32
  for (local_120 = 0; local_120 < 0xc; local_120 = local_120 + 1) {
    if (u8(DAT_00655142, local_120) === s32(in_ECX, 0x6c4)) {
      FUN_00515999(local_120);
      DAT_00631a9c = 1;
      FUN_00515c15(local_120);
      DVar1 = timeGetTime();
      FUN_0046e020(((u8(DAT_0065514e, local_120) + DAT_006d1168) & 7) + 0x53, 1, 0, 0);
      FUN_00516005();
      FUN_0046e287(0x3c);
      do {
        FUN_00407ff0(); // DEVIATION: Win32 message pump
        local_1c = timeGetTime();
        if (2 < DAT_00655b02) {
          FUN_0047e94e(1, 0);
        }
      } while ((local_1c - DVar1) < 7000);
      FUN_00515999(local_120);
      FUN_00515f3c();
    }
  }
  FUN_0046e287(0x3c);
  FUN_005c041f(0);
  SetRect(in_ECX + 0x6dc, 0, 0, 0x280, 0x1e0);
  FUN_005683c5(in_ECX + 0x4ec, in_ECX + 0x6dc, 4, 4);
  FUN_005bf5e1(0x2712, 10, 0xec, in_ECX + 0xb8);
  FUN_005baec8(in_ECX + 0x700);
  FUN_005baee0(0x7c, 0x81, 1, 1);
  FUN_0040bbb0();
  FUN_004aef20(local_11c);
  iVar2 = FUN_004a2379(DAT_006558e8, DAT_00631ab4);
  if (iVar2 === 0) {
    while (pcVar3 = FUN_004a23fc(1), pcVar3 !== '@') {
      FUN_0043c840(local_11c, DAT_00673f14);
      FUN_0043c840(local_11c, DAT_00631abc);
    }
    FUN_005bb024(in_ECX + 0x4ec, local_11c, 0, 0x48, 0x280);
  }
  FUN_005683c5(in_ECX + 0x4ec, in_ECX + 0x6dc, 4, 3);
  FUN_0040bbb0();
  FUN_0040bc10(0x1c8);
  FUN_0043c6c0(0, 0x10, 3);
  FUN_005baec8(/* local_18 */);
  // DEVIATION: _Timevec::~_Timevec(local_18)
  FUN_005bb024(in_ECX + 0x4ec, DAT_00679640, 0, /* 0x1dc - extraout_EAX */ 0, 0x280);
  FUN_00408490(in_ECX + 0x6dc); // DEVIATION: Win32
  // DEVIATION: COleControlSite::SetDlgCtrlID(in_ECX + 0x544, 0x401a1e)
  FUN_00408130(/* LAB_00401334 */); // DEVIATION: Win32
  if (2 < DAT_00655b02) {
    EnableStackedTabs_00511820(in_ECX + 0x534, 0x403585);
  }
  FUN_005c61b0();
  EnableStackedTabs_00511820(in_ECX + 0x534, 0);
  FUN_00414d40(); // DEVIATION: Win32
  FUN_004503d0(); // DEVIATION: MFC
  FUN_00419b80();
  FUN_00450390(DAT_006a8c00); // DEVIATION: MFC
  FUN_004503d0(); // DEVIATION: MFC
  FUN_00419b80();
  FUN_00515978();
  FUN_0051598b();
  return;
}



// ============================================================
// Function: FUN_00515978 @ 0x00515978
// Size: 9 bytes
// ============================================================

// wonder_council_cleanup1
export function FUN_00515978() { FUN_0043c520(); return; }

// ============================================================
// Function: FUN_0051598b @ 0x0051598B
// Size: 14 bytes
// ============================================================

// Source: decompiled/block_00510000.c FUN_0051598b (14 bytes)
export function FUN_0051598b() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_00515999 @ 0x00515999
// Size: 636 bytes
// ============================================================

// wonders_council_render_advisor
export function FUN_00515999(param_1) {
  let uVar1;
  let in_ECX;

  if (DAT_00631a9c === 0) {
    FUN_005c0593(in_ECX + 0x600, in_ECX + 0x6dc, in_ECX + 0x6dc);
    FUN_0040bbb0();
    FUN_0040bbe0(DAT_0065515a + param_1 * 0x18);
    FUN_005c19ad(0x21);
    OffsetRect(in_ECX + 0x6dc, 1, 1);
    FUN_005c1167(in_ECX + 0x700, DAT_00679640, in_ECX + 0x6dc, 0);
    FUN_005c19ad(0x10);
    OffsetRect(in_ECX + 0x6dc, -1, -1);
    FUN_005c1167(in_ECX + 0x700, DAT_00679640, in_ECX + 0x6dc, 0);
  } else {
    FUN_005c0593(in_ECX + 0x600, in_ECX + 0x6dc, in_ECX + 0x6dc);
    FUN_0040bbb0();
    FUN_0040bbe0(DAT_0065515a + param_1 * 0x18);
    FUN_0040fe40();
    FUN_0040fe10();
    uVar1 = FUN_00428b0c(DAT_00628420[0x71c / 4]);
    FUN_0040bbe0(uVar1);
    FUN_0040fe10();
    uVar1 = FUN_00484fec(s16(DAT_0065512a, param_1 * 2));
    FUN_00421f10(uVar1);
    FUN_005c19ad(0x21);
    OffsetRect(in_ECX + 0x6dc, 1, 1);
    FUN_005c1167(in_ECX + 0x700, DAT_00679640, in_ECX + 0x6dc, 0);
    FUN_005c19ad(0x10);
    OffsetRect(in_ECX + 0x6dc, -1, -1);
    FUN_005c1167(in_ECX + 0x700, DAT_00679640, in_ECX + 0x6dc, 0);
    FUN_005c0593(in_ECX + 0x4ec, in_ECX + 0x6dc, in_ECX + 0x6dc);
    FUN_00408490(in_ECX + 0x6dc); // DEVIATION: Win32 InvalidateRect
    DAT_00631a9c = 0;
  }
  FUN_005c0593(in_ECX + 0x4ec, in_ECX + 0x6dc, in_ECX + 0x6dc);
  return;
}



// ============================================================
// Function: FUN_00515c15 @ 0x00515C15
// Size: 385 bytes
// ============================================================

// wonders_council_setup_advisor_frame
export function FUN_00515c15(param_1) {
  let in_ECX;
  // SEH setup omitted
  FUN_005bd630();
  FUN_005c64da();
  FUN_005c0593(in_ECX + 0x4ec, in_ECX + 0x6ec, in_ECX + 0x6ec);
  FUN_005bf5e1(u8(DAT_0065514e, param_1) + 0xdc, 10, 0xec, 0 /* local_444 */);
  FUN_005c6b63(0 /* local_504 */, 0x2a, 0x40);
  FUN_005c6da8(0x2a, 0x40, 0 /* local_504 */);
  FUN_005c0cc5(in_ECX + 0xb8);
  FUN_005cedad(0 /* local_54c */, 9, 1, 1, 0xe1, 0x113);
  FUN_005cef31(0 /* local_55c */, in_ECX + 0x4ec, 0xd0, 0x39);
  SetRect(in_ECX + 0x6ec, 0xd0, 0x39, 0x1b1, 0x14c);
  FUN_00515d96();
  FUN_00515da2();
  FUN_00515db8();
  return;
}

// ============================================================
// Function: FUN_00515d96 @ 0x00515D96
// Size: 12 bytes
// ============================================================
// dtor_helper
export function FUN_00515d96() { FUN_005c656b(); return; }

// ============================================================
// Function: FUN_00515da2 @ 0x00515DA2
// Size: 12 bytes
// ============================================================
// dtor_helper
export function FUN_00515da2() { FUN_005bd915(); return; }

// ============================================================
// Function: FUN_00515db8 @ 0x00515DB8
// Size: 16 bytes
// ============================================================
// Source: decompiled/block_00510000.c FUN_00515db8 (16 bytes)
export function FUN_00515db8() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_00515dc8 @ 0x00515DC8
// Size: 372 bytes
// ============================================================

// wonders_council_scroll_text
export function FUN_00515dc8(param_1) {
  let in_ECX;
  let local_14 = s32(in_ECX, 0x6cc);
  let local_10 = s32(in_ECX, 0x6d0);
  let local_c = s32(in_ECX, 0x6d4);
  let local_8 = s32(in_ECX, 0x6d8);
  if (param_1 < 0) {
    local_10 = local_10 - param_1;
  } else {
    local_8 = local_8 + param_1;
  }
  FUN_005c0593(in_ECX + 0x4ec, 0 /* &local_14 rect */, 0 /* &local_14 rect */);
  FUN_005cef31(0 /* local_34 */, in_ECX + 0x4ec, 0xd0, 0x39);
  if (0 < param_1) {
    let local_24 = s32(in_ECX, 0x6ec);
    let local_1c = s32(in_ECX, 0x6f4);
    let local_20 = s32(in_ECX, 0x6fc);
    let local_18 = s32(in_ECX, 0x6fc) + param_1;
    FUN_005c0593(in_ECX + 0x4ec, 0 /* &local_24 rect */, 0 /* &local_24 rect */);
  }
  FUN_005cef31(0 /* local_44 */, in_ECX + 0x4ec, 0xab, s32(in_ECX, 0x6fc) + param_1);
  OffsetRect(in_ECX + 0x6cc, 0, param_1);
  if (local_10 < 1) {
    local_10 = 0;
  }
  FUN_00408490(/* &local_14 */); // DEVIATION: Win32 InvalidateRect
  w32(in_ECX, 0x6fc, s32(in_ECX, 0x6fc) + param_1);
  return;
}



// ============================================================
// Function: FUN_00515f3c @ 0x00515F3C
// Size: 201 bytes
// ============================================================

// wonders_council_scroll_out_animation
export function FUN_00515f3c() {
  let DVar1;
  let in_ECX;
  let local_10;

  FUN_005c0593(in_ECX + 0x4ec, in_ECX + 0x6ec, in_ECX + 0x6ec);
  FUN_005d6a2c();
  FUN_0046e020(0x6f, 1, 0, 0);
  DVar1 = timeGetTime();
  while (local_10 = DVar1, s32(in_ECX, 0x6fc) < 0x133) {
    FUN_00515dc8(0xf);
    do {
      FUN_00407ff0(); // DEVIATION: Win32 PeekMessage
      DVar1 = timeGetTime();
      if (2 < DAT_00655b02) {
        FUN_0047e94e(1, 0);
      }
    } while ((DVar1 - local_10) < 0x16);
  }
  return;
}



// ============================================================
// Function: FUN_00516005 @ 0x00516005
// Size: 61 bytes
// ============================================================

// wonders_council_scroll_up_loop
export function FUN_00516005() {
  let in_ECX;
  while (-0xad < s32(in_ECX, 0x6fc)) {
    FUN_00407ff0(); // DEVIATION: Win32 PeekMessage
    FUN_00515dc8(-4); // 0xfffffffc = -4
  }
  return;
}



// ============================================================
// Function: FUN_00516042 @ 0x00516042
// Size: 33 bytes
// ============================================================

// invalidate_council_cache
export function FUN_00516042() {
  CRichEditDoc_InvalidateObjectCache(DAT_00631a98 + 0x534);
  return;
}



// ============================================================
// Function: FUN_00516063 @ 0x00516063
// Size: 83 bytes
// ============================================================

// invalidate_council_on_range
export function FUN_00516063(param_1) {
  if ((0xcf < param_1) && (param_1 < 0xd3)) {
    CRichEditDoc_InvalidateObjectCache(DAT_00631a98 + 0x534);
  }
  return;
}



// ============================================================
// Function: FUN_00516570 @ 0x00516570
// Size: 134 bytes
// ============================================================

// advisors_council_show
export function FUN_00516570(param_1, param_2) {
  let iVar1;
  // SEH setup
  FUN_005f35f0();
  DAT_00631ad0 = 1;
  FUN_0051661a();
  FUN_0046e6a9();
  iVar1 = FUN_00516947(param_1, param_2);
  if (iVar1 !== 0) {
    FUN_00516fd4();
  }
  FUN_0046e6c8();
  DAT_00631ad0 = 0;
  FUN_005165f6();
  FUN_0051660c();
  return;
}

// ============================================================
// Function: FUN_005165f6 @ 0x005165F6
// Size: 12 bytes
// ============================================================
// advisors_council_dtor_thunk
export function FUN_005165f6() { FUN_005167d9(); return; }

// ============================================================
// Function: FUN_0051660c @ 0x0051660C
// Size: 14 bytes
// ============================================================
// Source: decompiled/block_00510000.c FUN_0051660c (14 bytes)
export function FUN_0051660c() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051661a @ 0x0051661A
// Size: 293 bytes
// ============================================================

// advisors_council_ctor
export function FUN_0051661a() {
  let in_ECX;
  // SEH setup omitted
  FUN_0044c5a0(); // DEVIATION: MFC base ctor
  FUN_005dd010();
  FUN_0059db08(0x4000);
  FUN_004502b0(); // DEVIATION: MFC ctor
  FUN_0040f3e0(); // DEVIATION: MFC ctor x6
  FUN_0040f3e0();
  FUN_0040f3e0();
  FUN_0040f3e0();
  FUN_0040f3e0();
  FUN_0040f3e0();
  w32(in_ECX, 0, PTR_FUN_0061d6d8);
  w32(in_ECX, 0x46b * 4, 0xb0);
  w32(in_ECX, 0x39c * 4, 0);
  DAT_00631acc = in_ECX;
  return in_ECX;
}



// ============================================================
// Function: FUN_005167d9 @ 0x005167D9
// Size: 198 bytes
// ============================================================

// advisors_council_dtor
export function FUN_005167d9() {
  let in_ECX;
  DAT_00631acc = 0;
  FUN_0051689f();
  FUN_005168ae();
  FUN_005168bd();
  FUN_005168cc();
  FUN_005168db();
  FUN_005168ea();
  FUN_005168f9();
  FUN_00516908();
  FUN_00516917();
  FUN_00516926();
  FUN_00516939();
  return;
}

// ============================================================
// Destructor sub-functions for advisors_council
// ============================================================
export function FUN_0051689f() { FUN_0040f570(); return; }
export function FUN_005168ae() { FUN_0040f570(); return; }
export function FUN_005168bd() { FUN_0040f570(); return; }
export function FUN_005168cc() { FUN_0040f570(); return; }
export function FUN_005168db() { FUN_0040f570(); return; }
export function FUN_005168ea() { FUN_0040f570(); return; }
export function FUN_005168f9() { /* _Timevec::~_Timevec */ return; }
export function FUN_00516908() { FUN_0059df8a(); return; }
export function FUN_00516917() { FUN_005dd1a0(); return; }
export function FUN_00516926() { FUN_0044cba0(); return; }
// Source: decompiled/block_00510000.c FUN_00516939 (14 bytes)
export function FUN_00516939() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_00516947 @ 0x00516947
// Size: 1672 bytes
// ============================================================

// advisors_council_init_video
export function FUN_00516947(param_1, param_2) {
  let bVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let in_ECX;
  let local_90;
  let local_8c;
  let local_88 = '';
  let local_8;

  w32(in_ECX, 0xe6c, param_1);
  uVar2 = FUN_00568861(s32(in_ECX, 0xe6c));
  w32(in_ECX, 0xe54, uVar2);
  FUN_005bb4ae(DAT_00631ad4, 0xc02, 0, 0, DAT_0063359c * 6 + 0x1c2,
               DAT_00633598 * 2 + DAT_00633588 + 0xfc, DAT_006ab6a8, DAT_006553d8);
  FUN_00497d00(DAT_00633598);
  FUN_005d8236(DAT_006cec90);
  FUN_00517673();
  FUN_00517158();
  FUN_005bb574();
  for (local_90 = 0; local_90 < 5; local_90 = local_90 + 1) {
    uVar2 = FUN_00518582(s32(in_ECX, 0xe6c), local_90);
    w32(in_ECX, 0xe58 + local_90 * 4, uVar2);
  }
  if (param_2 !== 0) {
    while (true) {
      iVar3 = FUN_00421ea0(s_COUNCILCHEAT0);
      iVar4 = DAT_00631edc;
      if ((iVar3 !== 0) || (DAT_00631edc === 0)) { break; } // goto LAB_00516b87
      if (DAT_00631edc === 6) {
        w32(in_ECX, 0xe70, 1);
        break; // goto LAB_00516b87
      }
      bVar1 = false;
      while (!bVar1) {
        iVar3 = FUN_00518ec0(s_COUNCILCHEAT1, 0, 0 /* &local_8c */);
        if (iVar3 !== 0) { return 0; }
        if (((0 < local_8c) && (local_8c < 8)) && ((iVar4 !== 5 || (local_8c < 7)))) {
          w32(in_ECX, 0xe54 + iVar4 * 4, local_8c);
          bVar1 = true;
        }
      }
    }
    // LAB_00516b87
    bVar1 = false;
    while ((!bVar1 && (iVar4 = FUN_00518ec0(s_COUNCILCHEAT2, 0, 0 /* &local_8c */), iVar4 === 0))) {
      if ((-1 < local_8c) && (local_8c < 3)) {
        w32(in_ECX, 0xe54, local_8c);
        bVar1 = true;
      }
    }
  }
  if (u8(DAT_0064c6b5, s32(in_ECX, 0xe6c) * 0x594) === 0) {
    w32(in_ECX, 0xe70, 1);
  } else {
    for (local_90 = 0; local_90 < 5; local_90 = local_90 + 1) {
      FUN_004aef20(local_90 * 3 + in_ECX + 0xe74);
    }
    FUN_0043c840(in_ECX + 0xe74, DAT_00631b08);
    FUN_0043c840(in_ECX + 0xe77, DAT_00631b0c);
    FUN_0043c840(in_ECX + 0xe7a, DAT_00631b10);
    FUN_0043c840(in_ECX + 0xe7d, DAT_00631b14);
    FUN_0043c840(in_ECX + 0xe80, DAT_00631b18);
    for (local_90 = 0; local_90 < 5; local_90 = local_90 + 1) {
      FUN_004af1d5(local_90 * 3 + in_ECX + 0xe74, s32(in_ECX, 0xe58 + local_90 * 4));
    }
  }
  if (s32(in_ECX, 0xe70) !== 0) {
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
  }
  FUN_004aef20(in_ECX + 0xe34);
  FUN_0040bbb0();
  if (s32(in_ECX, 0xe70) === 0) {
    FUN_0040bbe0(s_council);
  } else {
    FUN_0040bbe0(s_anarchy);
  }
  FUN_0040ff30(s32(in_ECX, 0xe54));
  FUN_0043c840(in_ECX + 0xe34, DAT_00679640);
  if ((s32(in_ECX, 0xe70) === 0) && (iVar4 = FUN_005179a3(0), iVar4 === 0)) {
    return 0;
  }
  FUN_0059dfb9(in_ECX, in_ECX, in_ECX + 0x11b0, 0x84008);
  FUN_005dd2e3(DAT_00631b2c, 0x200, 0, 0, in_ECX);
  FUN_004aef20(local_88);
  FUN_0043c840(local_88, s_civ2_video_);
  FUN_0043c840(local_88, in_ECX + 0xe34);
  FUN_0043c840(local_88, DAT_00631b3c);
  iVar4 = FUN_00564713(local_88);
  if (iVar4 === 0) { return 0; }
  local_8 = FUN_005dd377(local_88);
  if (local_8 === 0) {
    FUN_005dd561(DAT_006ab6a8);
    FUN_00450390(DAT_006ab6a8); // DEVIATION: MFC
    EnableStackedTabs_00511820(in_ECX + 0x114, 0x40188e);
    FUN_00518007();
    return 1;
  }
  if (local_8 === -0x7ffbfeac) {
    FUN_00421ea0(s_VFWNOTREGISTERED);
  }
  return 0;
}



// ============================================================
// Function: FUN_00516fd4 @ 0x00516FD4
// Size: 388 bytes
// ============================================================

// advisors_council_play_video
export function FUN_00516fd4() {
  let in_ECX;

  FUN_0059d3b1(DAT_006ab6a8);
  FUN_0046efd6();
  FUN_00450390(DAT_006ab6a8); // DEVIATION: MFC
  FUN_00450400(); // DEVIATION: MFC
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040bc80(0);
  FUN_004085f0(); // DEVIATION: Win32
  FUN_00419b80();
  if (s32(in_ECX, 0xe70) !== 0) {
    FUN_00518e80(DAT_0063359c + 1, DAT_00633598 + 1);
    FUN_004085f0(); // DEVIATION: Win32
    FUN_00419b80();
    FUN_005dd3c2();
  }
  if (2 < DAT_00655b02) {
    EnableStackedTabs_00511820(in_ECX + 0x48, 0x403585);
  }
  FUN_005c61b0();
  EnableStackedTabs_00511820(in_ECX + 0x48, 0);
  FUN_005d6a2c();
  FUN_00517158();
  FUN_004503d0(); // DEVIATION: MFC
  FUN_00419b80();
  FUN_0059db65();
  FUN_00450390(DAT_006a8c00); // DEVIATION: MFC
  FUN_0046f06f();
  FUN_0059d3b1(DAT_006a8c00);
  return;
}



// ============================================================
// Function: FUN_00517158 @ 0x00517158
// Size: 1307 bytes
// ============================================================

// advisors_council_draw_frame
export function FUN_00517158() {
  let iVar1;
  let pCVar2;
  let iVar3;
  let pCVar4;
  let iVar5;
  let pCVar6;
  let uVar7;
  let in_ECX;
  let local_20;
  let local_1c;
  let local_18;
  let local_14 = [0, 0, 0, 0]; // tagRECT

  iVar1 = DAT_00633598 + DAT_00633588 * -2;
  pCVar2 = COleClientItem_GetActiveView(in_ECX);
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, DAT_00633588, pCVar2, iVar1, 0, DAT_00633588);
  iVar3 = DAT_00633588 + DAT_00633598 + 0x7a;
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, iVar3, pCVar2, iVar1, 0, iVar3);
  pCVar4 = COleClientItem_GetActiveView(in_ECX);
  iVar1 = pCVar4 - (DAT_00633588 + 0x1e);
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, iVar1, pCVar2, 0x1e, 0, iVar1);
  pCVar2 = COleClientItem_GetActiveView(in_ECX);
  iVar3 = DAT_0063359c + DAT_00633588 * -2;
  FUN_005a9b5d(in_ECX, DAT_006abae0, DAT_00633588, 0, iVar3, pCVar2, DAT_00633588, 0);
  pCVar4 = COleClientItem_GetActiveView(in_ECX);
  iVar1 = pCVar4 - (DAT_00633588 + iVar3);
  FUN_005a9b5d(in_ECX, DAT_006abae0, iVar1, 0, iVar3, pCVar2, iVar1, 0);
  iVar1 = DAT_00633588 * 2;
  local_1c = DAT_00633588 + DAT_0063359c + 0x5a;
  iVar5 = DAT_00633598 - DAT_00633588;
  for (local_20 = 0; local_20 < 4; local_20 = local_20 + 1) {
    FUN_005a9b5d(in_ECX, DAT_006abae0, local_1c, iVar5, iVar1, iVar1 + 0x7a, local_1c, iVar5);
    local_1c = local_1c + DAT_0063359c + 0x5a;
  }
  SetRect(local_14, DAT_0063359c - DAT_00633588, iVar5,
          DAT_00633588 * 2 + (DAT_0063359c - DAT_00633588) + 0x5a, DAT_00633588 * 2 + iVar5 + 0x7a);
  for (local_20 = 0; local_20 < 5; local_20 = local_20 + 1) {
    for (local_18 = 0; local_18 < DAT_00633588; local_18 = local_18 + 1) {
      FUN_005a99fc(in_ECX, local_14, DAT_00633594, DAT_00633590);
      InflateRect(local_14, -1, -1);
    }
    FUN_005c0333(local_14, 10);
    InflateRect(local_14, DAT_00633588, DAT_00633588);
    OffsetRect(local_14, DAT_0063359c + 0x5a, 0);
  }
  pCVar2 = COleClientItem_GetActiveView(in_ECX);
  pCVar2 = pCVar2 + (-0x1e - DAT_00633588);
  pCVar4 = COleClientItem_GetActiveView(in_ECX);
  pCVar4 = pCVar4 + (DAT_00633588 - DAT_0063359c);
  pCVar6 = COleClientItem_GetActiveView(in_ECX);
  SetRect(in_ECX + 0x11b0, DAT_0063359c - DAT_00633588,
          pCVar6 + DAT_00633588 * -3 + -0x82, pCVar4, pCVar2);
  for (local_18 = 0; local_18 < DAT_00633588; local_18 = local_18 + 1) {
    FUN_005a99fc(in_ECX, in_ECX + 0x11b0, DAT_00633594, DAT_00633590);
    InflateRect(in_ECX + 0x11b0, -1, -1);
  }
  FUN_005c0333(in_ECX + 0x11b0, 0x1d);
  InflateRect(in_ECX + 0x11b0, -2, -2);
  let lprcSrc = FUN_00497c90();
  CopyRect(local_14, lprcSrc);
  for (local_18 = 0; local_18 < DAT_00633588; local_18 = local_18 + 1) {
    FUN_005a99fc(in_ECX, local_14, DAT_00633590, DAT_00633594);
    InflateRect(local_14, -1, -1);
  }
  FUN_0040bbb0();
  if (DAT_00628064 === 1) {
    uVar7 = FUN_00428b0c(DAT_00628420[0x4ac / 4]);
    FUN_0040bbe0(uVar7);
    FUN_0040fe10();
    uVar7 = FUN_00410070(s32(in_ECX, 0xe6c));
    FUN_0040bbe0(uVar7);
  } else {
    uVar7 = FUN_00410070(s32(in_ECX, 0xe6c));
    FUN_0040bbe0(uVar7);
    if (DAT_00628064 === 2) {
      FUN_0040bbe0(DAT_00631b58);
    }
    FUN_0040fe10();
    uVar7 = FUN_00428b0c(DAT_00628420[0x4ac / 4]);
    FUN_0040bbe0(uVar7);
  }
  pCVar2 = COleClientItem_GetActiveView(in_ECX);
  iVar3 = FUN_0040efd0(DAT_00679640);
  iVar1 = DAT_00633588;
  iVar3 = (pCVar2 - iVar3) / 2;
  iVar5 = DAT_00633588 + 1;
  FUN_005c19ad(10);
  FUN_005c0f57(DAT_006ab190, DAT_00679640, iVar3 + 1, iVar1 + 2, 5);
  FUN_005c19ad(0x1a);
  FUN_005c0f57(DAT_006ab190, DAT_00679640, iVar3, iVar5, 5);
  return;
}



// ============================================================
// Function: FUN_00517673 @ 0x00517673
// Size: 816 bytes
// ============================================================

// advisors_council_create_buttons
export function FUN_00517673() {
  let iVar1;
  let uVar2;
  let pCVar3;
  let pCVar4;
  let in_ECX;
  let local_14 = [0, 0, 0, 0]; // tagRECT
  let local_ptr;

  iVar1 = (DAT_00633598 + -0x16 >> 1) + DAT_00633598;
  SetRect(local_14, DAT_0063359c + 7, iVar1 + 0x79, DAT_0063359c + 0x52, iVar1 + 0x8f);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x26c / 4]);
  FUN_00497d40(local_ptr, 0, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  OffsetRect(local_14, DAT_0063359c + 0x5a, 0);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x16c / 4]);
  FUN_00497d40(local_ptr, 1, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  OffsetRect(local_14, DAT_0063359c + 0x5a, 0);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x114 / 4]);
  FUN_00497d40(local_ptr, 2, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  OffsetRect(local_14, DAT_0063359c + 0x5a, 0);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x6e0 / 4]);
  FUN_00497d40(local_ptr, 3, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  OffsetRect(local_14, DAT_0063359c + 0x5a, 0);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x6e4 / 4]);
  FUN_00497d40(local_ptr, 4, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  // Done button
  pCVar3 = COleClientItem_GetActiveView(in_ECX);
  pCVar3 = pCVar3 + (-1 - DAT_00633588);
  pCVar4 = COleClientItem_GetActiveView(in_ECX);
  iVar1 = pCVar4 - DAT_0063359c;
  pCVar4 = COleClientItem_GetActiveView(in_ECX);
  SetRect(local_14, DAT_0063359c, pCVar4 + -0x1d, iVar1, pCVar3);
  local_ptr = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x3fc / 4]);
  FUN_00497d40(local_ptr, 0xca, local_14, 0x21, uVar2);
  FUN_0040f880(/* LAB_00401b22 */); // DEVIATION: Win32 callback
  return;
}



// ============================================================
// Function: FUN_005179a3 @ 0x005179A3
// Size: 907 bytes
// ============================================================

// advisors_council_parse_script
export function FUN_005179a3(param_1) {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let puVar5;
  let iVar6;
  let in_ECX;
  let local_1c;
  let local_18;
  let local_10 = 0;
  let local_8 = 0;

  if (4 < param_1) { return 0; }
  iVar3 = FUN_004a2379(in_ECX + 0xe34, param_1 * 3 + in_ECX + 0xe74);
  if (iVar3 !== 0) { return 0; }
  iVar3 = FUN_004a23fc(1);
  if (iVar3 === 0) {
    FUN_004a2020();
    return local_8;
  }
  for (local_1c = 0; local_1c < 5; local_1c = local_1c + 1) {
    w32(in_ECX, 0xe84 + local_1c * 4, 0);
  }
  w32(in_ECX, 0xe84, param_1);
  uVar4 = FUN_004a2534();
  w32(in_ECX, 0xe90, uVar4);
  uVar4 = FUN_004a2534();
  w32(in_ECX, 0xe9c, uVar4);
  FUN_004aef20(in_ECX + 0xea8);
  FUN_004d007e(DAT_00673f14);
  FUN_0043c840(in_ECX + 0xea8, DAT_00673f14);
  local_18 = 1;
  bVar2 = true;
  bVar1 = false;
  // LAB_00517ae5 — main script parse loop
  while (true) {
    if ((2 < local_18) || (s32(in_ECX, 0xe84 + local_18 * 4) === -1)) {
      local_8 = 1;
      FUN_004a2020();
      return local_8;
    }
    if ((!bVar1) && (iVar3 = FUN_004a23fc(1), iVar3 === 0)) {
      FUN_004a2020();
      return local_8;
    }
    bVar1 = false;
    puVar5 = FUN_004a24b1();
    let ch = (typeof puVar5 === 'string') ? puVar5.charCodeAt(0) : puVar5;
    if (ch === 0x23) { // '#'
      bVar1 = bVar2;
      continue;
    }
    if (ch === 0x3b) { // ';'
      continue;
    }
    if (ch === 0x45 || ch === 0x65) { // 'E' or 'e'
      w32(in_ECX, 0xe84 + local_18 * 4, 0xffffffff);
      continue;
    }
    if (ch === 0x52 || ch === 0x72) { // 'R' or 'r'
      iVar3 = _atoi(puVar5 + 1);
      iVar6 = FUN_0059a791(1, 10);
      if (iVar6 <= iVar3) { bVar2 = false; }
      bVar1 = iVar6 > iVar3;
      continue;
    }
    // Advisor letter: M/S/T/F/A
    if (ch === 0x41 || ch === 0x61) { param_1 = 4; }
    else if (ch === 0x46 || ch === 0x66) { param_1 = 3; }
    else if (ch === 0x4d || ch === 0x6d) { param_1 = 0; }
    else if (ch === 0x53 || ch === 0x73) { param_1 = 1; }
    else if (ch === 0x54 || ch === 0x74) { param_1 = 2; }
    else { continue; }

    if ((local_10 & (1 << (param_1 & 0x1f))) === 0) {
      if ((puVar5[1] === '\0' || puVar5[1] === 0) ||
         (iVar3 = _atoi(puVar5 + 1), iVar3 === s32(in_ECX, 0xe58 + param_1 * 4))) {
        w32(in_ECX, 0xe84 + local_18 * 4, param_1);
        uVar4 = FUN_004a2534();
        w32(in_ECX, 0xe90 + local_18 * 4, uVar4);
        uVar4 = FUN_004a2534();
        w32(in_ECX, 0xe9c + local_18 * 4, uVar4);
        FUN_004aef20(local_18 * 0xff + in_ECX + 0xea8);
        FUN_004d007e(DAT_00673f14);
        if (DAT_00673f14[0] !== '*') {
          FUN_0043c840(local_18 * 0xff + in_ECX + 0xea8, DAT_00673f14);
        }
        local_18 = local_18 + 1;
        bVar2 = true;
        local_10 = local_10 | (1 << (param_1 & 0x1f));
      } else {
        bVar2 = false;
      }
    } else {
      bVar2 = false;
    }
  }
}



// ============================================================
// Function: FUN_00517dd3 @ 0x00517DD3
// Size: 529 bytes
// ============================================================

// advisors_council_render_text
export function FUN_00517dd3(param_1) {
  let in_ECX;
  let local_20 = [0, 0, 0, 0]; // tagRECT
  // SEH setup omitted
  FUN_0043c460(0, 0xe);
  if ((s32(in_ECX, 0x11a8) < 0) || (2 < s32(in_ECX, 0x11a8))) {
    FUN_00517fe4();
    FUN_00517ff7();
    return;
  }
  if (param_1 !== 1) {
    FUN_005c0333(in_ECX + 0x11b0, 0x1d);
    w32(in_ECX, 0x11ac, 2);
  }
  if (param_1 === -1) {
    FUN_005bb574();
    FUN_00517fe4();
    FUN_00517ff7();
    return;
  }
  local_20[3] = s32(in_ECX, 0x11bc);
  local_20[0] = s32(in_ECX, 0x11b0) + 2;
  local_20[2] = s32(in_ECX, 0x11b8) - 2;
  local_20[1] = s32(in_ECX, 0x11b4) + s32(in_ECX, 0x11ac);
  FUN_0059e472(/* local_28 */);
  if (s8(in_ECX, s32(in_ECX, 0x11a8) * 0xff + 0xea8) !== 0) {
    OffsetRect(local_20, 1, 1);
    FUN_005c19ad(0x25);
    FUN_005c1167(0 /* local_28 */, s32(in_ECX, 0x11a8) * 0xff + in_ECX + 0xea8, local_20, 1);
    OffsetRect(local_20, -1, -1);
    FUN_005c19ad(10);
    let height1 = FUN_005c1167(0 /* local_28 */, s32(in_ECX, 0x11a8) * 0xff + in_ECX + 0xea8, local_20, 1);
    // DEVIATION: _Timevec::~_Timevec — returns text height
    w32(in_ECX, 0x11ac, s32(in_ECX, 0x11ac) + (height1 || 0));
    let iVar1 = FUN_0040efd0(s32(in_ECX, 0x11a8) * 0xff + in_ECX + 0xea8);
    if (local_20[2] - local_20[0] < iVar1) {
      // DEVIATION: _Timevec::~_Timevec — second pass for text wrapping
      w32(in_ECX, 0x11ac, s32(in_ECX, 0x11ac) + (height1 || 0));
    }
  }
  FUN_005bb574();
  FUN_00419b80();
  FUN_00517fe4();
  FUN_00517ff7();
  return;
}

// ============================================================
// Function: FUN_00517fe4 @ 0x00517FE4
// Size: 9 bytes
// ============================================================
export function FUN_00517fe4() { FUN_0043c520(); return; }

// ============================================================
// Function: FUN_00517ff7 @ 0x00517FF7
// Size: 16 bytes
// ============================================================
// Source: decompiled/block_00510000.c FUN_00517ff7 (16 bytes)
export function FUN_00517ff7() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_00518007 @ 0x00518007
// Size: 420 bytes
// ============================================================

// advisors_council_play_all_scripts
export function FUN_00518007() {
  let iVar1;
  let uVar2;
  let in_ECX;
  let local_98;
  // SEH setup omitted
  FUN_005bd630();
  // DEVIATION: CString::CString(local_4c)
  if (s32(in_ECX, 0xe70) === 0) {
    for (local_98 = 0; local_98 < 5; local_98 = local_98 + 1) {
      iVar1 = FUN_004a2379(in_ECX + 0xe34, local_98 * 3 + in_ECX + 0xe74);
      if (iVar1 !== 0) {
        FUN_005181ab();
        FUN_005181b4();
        FUN_005181ca();
        return;
      }
      iVar1 = FUN_004a23fc(1);
      if (iVar1 === 0) {
        FUN_005181ab();
        FUN_005181b4();
        FUN_005181ca();
        return;
      }
      uVar2 = FUN_004a2534();
      FUN_005dd45d(uVar2);
      FUN_005dd64c(in_ECX, (DAT_0063359c + 0x5a) * local_98 + DAT_0063359c + 1, DAT_00633598 + 1);
      FUN_004a2020();
    }
  } else {
    FUN_005dd45d(1);
    FUN_005dd64c(in_ECX, DAT_0063359c + 2, DAT_00633598 + 2);
  }
  FUN_005181ab();
  FUN_005181b4();
  FUN_005181ca();
  return;
}

export function FUN_005181ab() { FUN_005cde4d(); return; }
export function FUN_005181b4() { FUN_005bd915(); return; }
// Source: decompiled/block_00510000.c FUN_005181ca (14 bytes)
export function FUN_005181ca() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_005181d8 @ 0x005181D8
// Size: 362 bytes
// ============================================================

// advisors_council_handle_button_click
export function FUN_005181d8(param_1) {
  let iVar1;
  let iVar2;
  iVar1 = DAT_00631acc;
  _DAT_00631ac8 = 1;
  FUN_005d6a2c();
  FUN_005dd51d();
  if (param_1 === 0xca) {
    FUN_00517dd3(-1);
    FUN_00419b80();
    CRichEditDoc_InvalidateObjectCache(iVar1 + 0x48);
  } else if (s32(iVar1, 0xe70) === 0) {
    FUN_00517dd3(-1);
    w32(iVar1, 0x11a8, 0);
    iVar2 = FUN_005179a3(param_1);
    if (iVar2 === 0) {
      FUN_00517dd3(-1);
      FUN_00419b80();
      CRichEditDoc_InvalidateObjectCache(iVar1 + 0x48);
    } else {
      FUN_004503d0(); // DEVIATION: MFC
      FUN_00518342(param_1);
      if (param_1 < 5) {
        FUN_00517dd3(0);
        FUN_005dd45d(s32(iVar1, 0xe90 + s32(iVar1, 0x11a8) * 4));
        FUN_004085f0(); // DEVIATION: Win32
        FUN_005dd3f1(s32(iVar1, 0xe90 + s32(iVar1, 0x11a8) * 4),
                     s32(iVar1, 0xe9c + s32(iVar1, 0x11a8) * 4));
        w32(iVar1, 0x11a8, s32(iVar1, 0x11a8) + 1);
      }
      _DAT_00631ac8 = 0;
    }
  }
  return;
}



// ============================================================
// Function: FUN_00518342 @ 0x00518342
// Size: 80 bytes
// ============================================================

// advisors_council_set_video_position
export function FUN_00518342(param_1) {
  if (param_1 < 5) {
    FUN_00518e80((DAT_0063359c + 0x5a) * param_1 + DAT_0063359c + 1, DAT_00633598 + 1);
  }
  return;
}



// ============================================================
// Function: FUN_00518392 @ 0x00518392
// Size: 122 bytes
// ============================================================

// parse_advisor_letter_code
export function FUN_00518392(param_1) {
  let uVar1;
  switch (param_1[0]) {
  case 0x41: case 0x61: uVar1 = 4; break;
  case 0x46: case 0x66: uVar1 = 3; break;
  case 0x4d: case 0x6d: uVar1 = 0; break;
  case 0x53: case 0x73: uVar1 = 1; break;
  case 0x54: case 0x74: uVar1 = 2; break;
  default: uVar1 = 0xffffffff; break;
  }
  return uVar1;
}



// ============================================================
// Function: FUN_00518471 @ 0x00518471
// Size: 273 bytes
// ============================================================

// advisors_council_auto_advance
export function FUN_00518471() {
  let iVar1;
  iVar1 = DAT_00631acc;
  _DAT_00631ac8 = 1;
  if (s32(DAT_00631acc, 0xe70) === 0) {
    FUN_004503d0(); // DEVIATION: MFC
    if ((s32(iVar1, 0x11a8) < 3) &&
       (-1 < s32(iVar1, 0xe84 + s32(iVar1, 0x11a8) * 4))) {
      FUN_00518342(s32(iVar1, 0xe84 + s32(iVar1, 0x11a8) * 4));
      FUN_00517dd3(1);
      FUN_005dd45d(s32(iVar1, 0xe90 + s32(iVar1, 0x11a8) * 4));
      FUN_004085f0(); // DEVIATION: Win32
      FUN_005dd3f1(s32(iVar1, 0xe90 + s32(iVar1, 0x11a8) * 4),
                   s32(iVar1, 0xe9c + s32(iVar1, 0x11a8) * 4));
      w32(iVar1, 0x11a8, s32(iVar1, 0x11a8) + 1);
    }
  }
  FUN_00419b80();
  _DAT_00631ac8 = 0;
  return;
}



// ============================================================
// Function: FUN_00518582 @ 0x00518582
// Size: 177 bytes
// ============================================================

// advisors_council_get_advisor_response
export function FUN_00518582(param_1, param_2) {
  let local_8;
  if (DAT_00631acc !== 0) {
    local_8 = s32(DAT_00631acc, 0xe54);
  }
  switch (param_2) {
  case 0: FUN_004bc480(param_1, local_8); break;
  case 1: FUN_004bc8aa(param_1, local_8); break;
  case 2: FUN_004bcb9b(param_1, local_8); break;
  case 3: FUN_004bcfcf(param_1, local_8); break;
  default: FUN_004bd2a3(param_1, local_8); break;
  }
  return;
}



// ============================================================
// Function: FUN_00518e80 @ 0x00518E80
// Size: 47 bytes
// ============================================================

// set_video_playback_position
export function FUN_00518e80(param_1, param_2) {
  let in_ECX;
  FUN_005bc4a1(s32(in_ECX, 8), param_1, param_2);
  return;
}



// ============================================================
// Function: FUN_00518ec0 @ 0x00518EC0
// Size: 41 bytes
// ============================================================

// dialog_get_number_input
export function FUN_00518ec0(param_1, param_2, param_3) {
  FUN_0051d75d(DAT_006359d4, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00518f00 @ 0x00518F00
// Size: 365 bytes
// ============================================================

// cheat_menu_list_init
export function FUN_00518f00() {
  let in_ECX;
  let local_8;

  if ((s32(in_ECX, 0x120) < 0) || (s32(in_ECX, 0xd90) <= s32(in_ECX, 0x120))) {
    w32(in_ECX, 0x120, 0);
  }
  w32(in_ECX, 0x1b34, s32(in_ECX, 0xd90));
  w32(in_ECX, 0x1f38, s32(in_ECX, 0x120));
  w32(in_ECX, 0x1f3c, s32(in_ECX, 0x120));
  while (DAT_006a85a4 % 9 !== 0) {
    w32(in_ECX, 0x1f3c, s32(in_ECX, 0x1f3c) - 1);
  }
  for (local_8 = 0; local_8 < s32(in_ECX, 0xd90); local_8 = local_8 + 1) {
    w32(in_ECX, 0x1b38 + local_8 * 4, s32(in_ECX, 0xdb0 + local_8 * 4));
  }
  FUN_0040fd40(0, s32(in_ECX, 0x1b34) / 9);
  FUN_0040fcf0(s32(in_ECX, 0x1f3c) / 9);
  if (s32(in_ECX, 0x1b34) < 1) {
    w32(in_ECX, 0x1f3c, 0xffffffff);
  }
  FUN_00451bf0(); // DEVIATION: MFC list control
  FUN_004923c0();
  FUN_004518d0(); // DEVIATION: MFC list control
  FUN_004f6646();
  return;
}



// ============================================================
// Function: FUN_005190d0 @ 0x005190D0
// Size: 26 bytes
// ============================================================

// CRT static init 2
export function FUN_005190d0() {
  FUN_005190ea();
  FUN_00519109();
  return;
}

// ============================================================
// Function: FUN_005190ea @ 0x005190EA
// Size: 31 bytes
// ============================================================
export function FUN_005190ea() { FUN_0059db08(0x4000); return; }

// ============================================================
// Function: FUN_00519109 @ 0x00519109
// Size: 29 bytes
// ============================================================
export function FUN_00519109() { /* _atexit(FUN_00519126) */ return; }

// ============================================================
// Function: FUN_00519126 @ 0x00519126
// Size: 26 bytes
// ============================================================
export function FUN_00519126() { FUN_0059df8a(); return; }



// ============================================================
// Function: FUN_00519140 @ 0x00519140
// Size: 49 bytes
// ============================================================

// terrain_editor_restore_if_needed
export function FUN_00519140() {
  if (DAT_00631b78 !== 0) {
    FUN_0059db65();
    FUN_00419b80();
  }
  return;
}



// ============================================================
// Function: FUN_00519171 @ 0x00519171
// Size: 77 bytes
// ============================================================

// terrain_editor_show_dialog
export function FUN_00519171(param_1) {
  let iVar1;
  FUN_00519140();
  DAT_00631b78 = 1;
  iVar1 = FUN_0040ffa0(param_1, 8);
  if (iVar1 === 0) {
    FUN_0040bc80(0);
    FUN_00419b80();
  }
  return;
}



// ============================================================
// Function: FUN_00519200 @ 0x00519200
// Size: 493 bytes
// ============================================================

// terrain_editor_load_terrain_data
export function FUN_00519200() {
  let _Source;
  let _Count;
  let local_c;
  let local_8;
  for (local_8 = 0; local_8 < 0x21; local_8 = local_8 + 1) {
    _Count = 0x28;
    _Source = FUN_00428b0c(DAT_00627cc4[local_8 * 0x18]);
    _strncpy(DAT_006a1d88 + local_8 * 0x28, _Source, _Count);
    w8(DAT_006a1d88, 0x27 + local_8 * 0x28, 0); // null terminate
    // Sign-extend byte to int for terrain attributes
    w32(DAT_006a2d28, local_8 * 0x58, (s8(DAT_00627cc8, local_8 * 0x18) << 24) >> 24);
    w32(DAT_006a2d2c, local_8 * 0x58, (s8(DAT_00627cc9, local_8 * 0x18) << 24) >> 24);
    for (local_c = 0; local_c < 3; local_c = local_c + 1) {
      w32(DAT_006a2d30, local_c * 4 + local_8 * 0x58,
          (s8(DAT_00627cca, local_8 * 0x18 + local_c) << 24) >> 24);
    }
    if (local_8 < 0xb) {
      for (local_c = 0; local_c < 2; local_c = local_c + 1) {
        w32(DAT_006a2d3c, local_c * 0x10 + local_8 * 0x58,
            (s8(DAT_00627cce, local_8 * 0x18 + local_c) << 24) >> 24);
        w32(DAT_006a2d40, local_c * 0x10 + local_8 * 0x58,
            (s8(DAT_00627cd0, local_8 * 0x18 + local_c) << 24) >> 24);
        w32(DAT_006a2d44, local_c * 0x10 + local_8 * 0x58,
            (s8(DAT_00627cd2, local_8 * 0x18 + local_c) << 24) >> 24);
        w32(DAT_006a2d48, local_c * 0x10 + local_8 * 0x58,
            (s8(DAT_00627cd4, local_8 * 0x18 + local_c) << 24) >> 24);
      }
      w32(DAT_006a2d5c, local_8 * 0x58,
          (s8(DAT_00627ccd, local_8 * 0x18) << 24) >> 24);
    }
  }
  return;
}



// ============================================================
// Function: FUN_005193ed @ 0x005193ED
// Size: 471 bytes
// ============================================================

// terrain_editor_save_terrain_data
export function FUN_005193ed() {
  let _Dest;
  let _Source;
  let _Count;
  let local_c;
  let local_8;
  for (local_8 = 0; local_8 < 0x21; local_8 = local_8 + 1) {
    _Count = 0xf;
    _Source = DAT_006a1d88 + local_8 * 0x28;
    _Dest = FUN_00428b0c(DAT_00627cc4[local_8 * 0x18]);
    _strncpy(_Dest, _Source, _Count);
    // Truncate int back to byte for terrain attributes
    w8(DAT_00627cc8, local_8 * 0x18, s32(DAT_006a2d28, local_8 * 0x58) & 0xff);
    w8(DAT_00627cc9, local_8 * 0x18, s32(DAT_006a2d2c, local_8 * 0x58) & 0xff);
    for (local_c = 0; local_c < 3; local_c = local_c + 1) {
      w8(DAT_00627cca, local_8 * 0x18 + local_c,
         s32(DAT_006a2d30, local_c * 4 + local_8 * 0x58) & 0xff);
    }
    if (local_8 < 0xb) {
      for (local_c = 0; local_c < 2; local_c = local_c + 1) {
        w8(DAT_00627cce, local_8 * 0x18 + local_c,
           s32(DAT_006a2d3c, local_c * 0x10 + local_8 * 0x58) & 0xff);
        w8(DAT_00627cd0, local_8 * 0x18 + local_c,
           s32(DAT_006a2d40, local_c * 0x10 + local_8 * 0x58) & 0xff);
        w8(DAT_00627cd2, local_8 * 0x18 + local_c,
           s32(DAT_006a2d44, local_c * 0x10 + local_8 * 0x58) & 0xff);
        w8(DAT_00627cd4, local_8 * 0x18 + local_c,
           s32(DAT_006a2d48, local_c * 0x10 + local_8 * 0x58) & 0xff);
      }
      w8(DAT_00627ccd, local_8 * 0x18,
         s32(DAT_006a2d5c, local_8 * 0x58) & 0xff);
    }
  }
  return;
}



// ============================================================
// Function: FUN_005195c4 @ 0x005195C4
// Size: 45 bytes
// ============================================================

// terrain_index_compress
export function FUN_005195c4(param_1) {
  if (0x17 < param_1) { param_1 = param_1 + -1; }
  if (0xc < param_1) { param_1 = param_1 + -1; }
  return param_1;
}



// ============================================================
// Function: FUN_005195f1 @ 0x005195F1
// Size: 45 bytes
// ============================================================

// terrain_index_expand
export function FUN_005195f1(param_1) {
  if (0xc < param_1) { param_1 = param_1 + 1; }
  if (0x17 < param_1) { param_1 = param_1 + 1; }
  return param_1;
}



// ============================================================
// Function: FUN_0051961e @ 0x0051961E
// Size: 391 bytes
// ============================================================

// terrain_editor_update_controls
export function FUN_0051961e() {
  let iVar1;
  let local_14;
  let local_10 = '';
  let local_8;

  for (local_14 = 1; local_14 < 0xf; local_14 = local_14 + 1) {
    if (s32(DAT_00631bf8, local_14 * 8) === 9) {
      iVar1 = FUN_00418740();
      _sprintf(local_10, DAT_00631cd0,
               s32(DAT_006a2a00, iVar1 * 4 + s32(DAT_006a4f88, 0x2ec) * 0x58));
      FUN_00418a30(local_10); // DEVIATION: Win32 SetWindowText
    } else if (s32(DAT_00631bf8, local_14 * 8) === 0xc) {
      iVar1 = FUN_00418740();
      local_8 = s32(DAT_006a2a00, iVar1 * 4 + s32(DAT_006a4f88, 0x2ec) * 0x58);
      if (local_14 === 0) {
        local_8 = FUN_005195c4(local_8);
      }
      if ((local_14 === 6) || (local_14 === 10)) {
        local_8 = local_8 + 2;
      }
      if (local_14 === 0xe) {
        local_8 = local_8 + 1;
      }
      FUN_00418d90(local_8); // DEVIATION: Win32 combo box set
    }
  }
  return;
}



// ============================================================
// Function: FUN_005197af @ 0x005197AF
// Size: 496 bytes
// ============================================================

// terrain_editor_read_controls
export function FUN_005197af() {
  let iVar1;
  let uVar2;
  let local_18;
  let local_14 = 0;
  let local_10 = '';
  let local_8;

  for (local_18 = 1; local_18 < 0xf; local_18 = local_18 + 1) {
    if (s32(DAT_00631bf8, local_18 * 8) === 9) {
      FUN_00418a70(local_10); // DEVIATION: Win32 GetWindowText
      iVar1 = FUN_00418740();
      iVar1 = iVar1 - 0xca;
      local_8 = _atoi(local_10);
      uVar2 = FUN_005adfa0(local_8, s32(DAT_00631c70, iVar1 * 4), s32(DAT_00631ca0, iVar1 * 4));
      w32(DAT_006a2d28, s32(DAT_006a4f88, 0x2ec) * 0x58 + iVar1 * 4, uVar2);
      if (s32(DAT_006a2d28, s32(DAT_006a4f88, 0x2ec) * 0x58 + iVar1 * 4) !== local_8) {
        local_14 = local_14 + 1;
      }
    } else if (s32(DAT_00631bf8, local_18 * 8) === 0xc) {
      local_8 = FUN_00418d60();
      if (local_18 === 0) {
        local_8 = FUN_005195f1(local_8);
      }
      if ((local_18 === 6) || (local_18 === 10)) {
        local_8 = local_8 - 2;
      }
      if (local_18 === 0xe) {
        local_8 = local_8 - 1;
      }
      iVar1 = FUN_00418740();
      w32(DAT_006a2a00, s32(DAT_006a4f88, 0x2ec) * 0x58 + iVar1 * 4, local_8);
    }
  }
  return local_14;
}



// ============================================================
// Function: FUN_005199a9 @ 0x005199A9
// Size: 27 bytes
// ============================================================

// terrain_editor_repaint
export function FUN_005199a9() {
  FUN_0051b2b6();
  return;
}



// ============================================================
// Function: FUN_005199c4 @ 0x005199C4
// Size: 236 bytes
// ============================================================

// terrain_editor_append_terrain_name
export function FUN_005199c4(param_1, param_2) {
  if (param_1 === -1) {
    FUN_005f22e0(DAT_00679640, DAT_00631cd4[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  } else if (param_1 === -2) {
    FUN_005f22e0(DAT_00679640, DAT_00631ce0[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  } else if (param_1 < 0xb) {
    FUN_005f22e0(DAT_00679640, DAT_00627cc0[param_1 * 0x18]);
    if (param_2 !== 0) {
      FUN_005f22e0(DAT_00679640, DAT_00631cec);
    }
  } else {
    FUN_005f22e0(DAT_00679640, DAT_00631cf0[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  }
  return;
}



// ============================================================
// Function: FUN_00519ab0 @ 0x00519AB0
// Size: 695 bytes
// ============================================================

// terrain_editor_write_to_file
export function FUN_00519ab0(param_1) {
  let pcVar1;
  let sVar2;
  let local_10;
  let local_c;
  let local_8;

  for (local_c = 0; local_c < 0x21; local_c = local_c + 1) {
    FUN_0040bbb0();
    FUN_0040ff00(DAT_00627cc4[local_c * 0x18 / 4]);
    FUN_005f22e0(DAT_00679640, DAT_00631cfc);
    pcVar1 = FUN_00428b0c(DAT_00627cc4[local_c * 0x18 / 4]);
    sVar2 = _strlen(pcVar1);
    if (sVar2 < 0xb) {
      pcVar1 = FUN_00428b0c(DAT_00627cc4[local_c * 0x18 / 4]);
      local_10 = _strlen(pcVar1);
    } else {
      local_10 = 0xb;
    }
    FUN_004190a0(0xb - local_10); // DEVIATION: Win32 padding
    FUN_0040ff30(s8(DAT_00627cc8, local_c * 0x18));
    FUN_005f22e0(DAT_00679640, DAT_00631d00);
    FUN_0040ff30(s8(DAT_00627cc9, local_c * 0x18));
    FUN_005f22e0(DAT_00679640, DAT_00631d04);
    FUN_004190a0(2); // DEVIATION: Win32 padding
    for (local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
      FUN_0040ff30(s8(DAT_00627cca, local_c * 0x18 + local_8));
      FUN_005f22e0(DAT_00679640, DAT_00631d08);
    }
    if (local_c < 0xb) {
      for (local_8 = 0; local_8 < 2; local_8 = local_8 + 1) {
        FUN_004190a0(3); // DEVIATION: Win32 padding
        FUN_005199c4(s8(DAT_00627cce, local_c * 0x18 + local_8), 1);
        FUN_004ccdb6(s8(DAT_00627cd0, local_c * 0x18 + local_8));
        FUN_005f22e0(DAT_00679640, DAT_00631d0c);
        FUN_004ccdb6(s8(DAT_00627cd2, local_c * 0x18 + local_8));
        FUN_005f22e0(DAT_00679640, DAT_00631d10);
        if (local_8 === 1) {
          FUN_0040fe10();
        }
        FUN_004ccdb6(s8(DAT_00627cd4, local_c * 0x18 + local_8));
        FUN_005f22e0(DAT_00679640, DAT_00631d14);
      }
      FUN_004190a0(2); // DEVIATION: Win32 padding
      FUN_005199c4(s8(DAT_00627ccd, local_c * 0x18), 1);
      FUN_005f22e0(DAT_00679640, s___00631d18);
      FUN_005199c4(local_c, 0);
    }
    FUN_005f22e0(DAT_00679640, DAT_00631d20);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}



// ============================================================
// Function: show_messagebox_9D67 @ 0x00519D67
// Size: 269 bytes
// ============================================================

// terrain_editor_apply_changes
export function show_messagebox_9D67() {
  let iVar1;
  let local_28;
  let local_24 = '';

  iVar1 = FUN_005197af();
  if (iVar1 === 0) {
    FUN_005193ed();
    FUN_004ccab9(s_TERRAIN_00631d2c, 0 /* LAB_00402f2c */);
    iVar1 = show_messagebox_CF2D();
    if (iVar1 === 0) {
      _sprintf(local_24, s_Error_updating_RULES, DAT_0062cd24);
      // DEVIATION: MessageBoxA — Win32 error dialog
      iVar1 = FUN_00414d10();
      MessageBoxA(s32(iVar1, 4), local_24, s_File_IO_Error, 0x10);
    }
    DAT_006a1d7c = 0;
    CRichEditDoc_InvalidateObjectCache(DAT_006a4f88 + 0x48);
    FUN_004e4ceb();
  } else {
    FUN_0051961e();
    FUN_005199a9();
    if (DAT_006a4f88 === 0) {
      local_28 = 0;
    } else {
      local_28 = DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE);
    FUN_0059d3c9(0);
    let hWnd = FUN_00418770(); // DEVIATION: Win32 GetDlgItem
    SetFocus(hWnd); // DEVIATION: Win32
  }
  return;
}



// ============================================================
// Function: FUN_00519e74 @ 0x00519E74
// Size: 881 bytes
// ============================================================

// terrain_editor_rename_terrain
export function FUN_00519e74() {
  let sVar1;
  let uVar2;
  let local_138;
  let local_134 = '';
  let local_120 = '';
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = s32(DAT_006a4f88, 0x2ec);
  _strncpy(local_134, DAT_006a1d88 + local_18 * 0x28, 0xf);
  do {
    if (DAT_006a4f88 === 0) {
      local_138 = 0;
    } else {
      local_138 = DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_138);
    local_8 = FUN_0051d63b(s_DEBUG_006359dc, s_TERRNAME, 0xe, local_134, local_120);
    FUN_0059d3c9(0);
    if (local_8 === -1) break;
    sVar1 = _strlen(local_120);
  } while (sVar1 === 0);
  if (-1 < local_8) {
    FUN_005f22d0(DAT_006a1d88 + local_18 * 0x28, local_120);
    local_c = FUN_00418d60();
    local_10 = FUN_00418d60();
    local_14 = FUN_00418d60();
    local_1c = FUN_00418d60();
    FUN_00418d20(); // DEVIATION: Win32 combo box reset x4
    FUN_00418d20();
    FUN_00418d20();
    FUN_00418d20();
    uVar2 = FUN_00428b0c(DAT_00628420[0x7bc / 4]);
    FUN_00418ce0(uVar2); // DEVIATION: Win32 combo box add x5
    uVar2 = FUN_00428b0c(DAT_00628420[0x7bc / 4]);
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]);
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]);
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]);
    FUN_00418ce0(uVar2);
    for (local_18 = 0; local_18 < 0x21; local_18 = local_18 + 1) {
      if ((local_18 !== 0xd) && (local_18 !== 0x18)) {
        FUN_00418ce0(DAT_006a1d88 + local_18 * 0x28);
      }
    }
    for (local_18 = 0; local_18 < 0xb; local_18 = local_18 + 1) {
      FUN_00418ce0(DAT_006a1d88 + local_18 * 0x28);
      FUN_00418ce0(DAT_006a1d88 + local_18 * 0x28);
      FUN_00418ce0(DAT_006a1d88 + local_18 * 0x28);
    }
    FUN_00418d90(local_c); // DEVIATION: Win32 combo box select x4
    FUN_00418d90(local_10);
    FUN_00418d90(local_14);
    FUN_00418d90(local_1c);
    FUN_005199a9();
  }
  return;
}



// ============================================================
// Function: FUN_0051a1e5 @ 0x0051A1E5
// Size: 95 bytes
// ============================================================

// terrain_editor_show_help
export function FUN_0051a1e5() {
  let local_8;
  if (DAT_006a4f88 === 0) { local_8 = 0; }
  else { local_8 = DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_00631d70, s_TERRAIN_00631d68);
  FUN_0059d3c9(0);
  return;
}



// ============================================================
// Function: FUN_0051a244 @ 0x0051A244
// Size: 40 bytes
// ============================================================

// terrain_editor_close
export function FUN_0051a244() {
  DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(DAT_006a4f88 + 0x48);
  return;
}



// ============================================================
// Function: FUN_0051a26c @ 0x0051A26C
// Size: 1036 bytes
// ============================================================

// terrain_editor_select_resource
export function FUN_0051a26c() {
  let iVar1;
  let uVar2;
  let local_24;
  let local_20;
  let local_1c;
  let local_18 = null;
  let local_10 = 7;
  let local_8 = null; // LAB_00402590

  if (s32(DAT_006a4f88, 0x2ec) === 3) { // forest
    if (DAT_006a4f88 === 0) { local_1c = 0; } else { local_1c = DAT_006a4f88 + 0x48; }
    FUN_0059d3c9(local_1c);
    while (true) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_FOREST, 1);
      if (DAT_00631edc === 0) break;
      FUN_004190d0(DAT_00631d8c, s_HELPFOREST);
    }
    if (iVar1 !== -1) {
      if (iVar1 === 0) { local_18 = DAT_00647c40 + s32(DAT_006a4f88, 0x2ec) * 0x3c; }
      else { local_18 = DAT_006461d8 + (iVar1 * 4 - 4) * 0xf; }
    }
    if (0 < iVar1) { local_10 = 8; }
    FUN_0059d3c9(0);
  } else if (s32(DAT_006a4f88, 0x2ec) === 4) { // hills
    if (DAT_006a4f88 === 0) { local_20 = 0; } else { local_20 = DAT_006a4f88 + 0x48; }
    FUN_0059d3c9(local_20);
    while (true) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_HILLS, 1);
      if (DAT_00631edc === 0) break;
      FUN_004190d0(DAT_00631da8, s_HELPHILLS);
    }
    if (iVar1 !== -1) {
      if (iVar1 === 0) { local_18 = DAT_00647c40 + s32(DAT_006a4f88, 0x2ec) * 0x3c; }
      else { local_18 = DAT_006447b0 + (iVar1 * 4 - 4) * 0xf; }
    }
    if (0 < iVar1) { local_10 = 8; }
    FUN_0059d3c9(0);
  } else if (s32(DAT_006a4f88, 0x2ec) === 5) { // mountains
    if (DAT_006a4f88 === 0) { local_24 = 0; } else { local_24 = DAT_006a4f88 + 0x48; }
    FUN_0059d3c9(local_24);
    while (true) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_MOUNTAINS, 1);
      if (DAT_00631edc === 0) break;
      FUN_004190d0(DAT_00631dcc, s_HELPMOUNTAINS);
    }
    if (iVar1 !== -1) {
      if (iVar1 === 0) { local_18 = DAT_00647c40 + s32(DAT_006a4f88, 0x2ec) * 0x3c; }
      else { local_18 = DAT_00647388 + (iVar1 * 4 - 4) * 0xf; }
    }
    if (0 < iVar1) { local_10 = 8; }
    FUN_0059d3c9(0);
  } else if (s32(DAT_006a4f88, 0x2ec) < 0xb) {
    local_18 = DAT_00647c40 + s32(DAT_006a4f88, 0x2ec) * 0x3c;
  } else if (s32(DAT_006a4f88, 0x2ec) < 0x16) {
    local_18 = DAT_006482f8 + (s32(DAT_006a4f88, 0x2ec) % 0xb) * 0x78;
  } else {
    local_18 = DAT_00648334 + (s32(DAT_006a4f88, 0x2ec) % 0xb) * 0x78;
  }
  if (local_18 !== null) {
    uVar2 = FUN_00428b0c(DAT_00628420[0x7d8 / 4], local_10, local_8);
    FUN_00573e59(local_18, uVar2);
  }
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a678 @ 0x0051A678
// Size: 287 bytes
// ============================================================

// terrain_editor_select_river
export function FUN_0051a678() {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10 = null;

  if (DAT_006a4f88 === 0) { local_14 = 0; } else { local_14 = DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_14);
  while (true) {
    DAT_00631edc = 0;
    iVar1 = FUN_00419100(s_DEBUG_006359dc, s_RIVER, 1);
    if (DAT_00631edc === 0) break;
    FUN_004190d0(DAT_00631de8, s_HELPRIVER);
  }
  if (iVar1 !== -1) {
    if (iVar1 < 0x10) {
      local_10 = DAT_0063f858 + iVar1 * 0x3c;
    } else {
      local_10 = DAT_0063fd18 + (iVar1 * 4 - 0x40) * 0xf;
    }
  }
  FUN_0059d3c9(0);
  if (local_10 !== null) {
    uVar2 = FUN_00428b0c(DAT_00628420[0x7d8 / 4], 8, 0 /* LAB_00402e87 */);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a797 @ 0x0051A797
// Size: 288 bytes
// ============================================================

// terrain_editor_select_coast
export function FUN_0051a797() {
  let uVar1;
  let uVar2;
  let uVar3;
  let local_14;
  let local_10 = null;

  if (DAT_006a4f88 === 0) { local_14 = 0; } else { local_14 = DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_14);
  while (true) {
    DAT_00631edc = 0;
    uVar1 = FUN_00419100(s_DEBUG_006359dc, s_COAST, 1);
    if (DAT_00631edc === 0) break;
    FUN_004190d0(DAT_00631e04, s_HELPCOAST);
  }
  if (uVar1 !== 0xffffffff) {
    uVar3 = uVar1 >> 31;
    local_10 = DAT_00643b38 +
               (((uVar1 ^ uVar3) - uVar3 & 3 ^ uVar3) - uVar3) * 0x3c +
               (((uVar1 + (uVar3 & 3)) >> 2)) * 0xf0;
  }
  FUN_0059d3c9(0);
  if (local_10 !== null) {
    uVar2 = FUN_00428b0c(DAT_00628420[0x7d8 / 4], 9, 0 /* LAB_00402e87 */);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a8b7 @ 0x0051A8B7
// Size: 407 bytes
// ============================================================

// terrain_editor_select_misc
export function FUN_0051a8b7() {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10 = null;

  if (DAT_006a4f88 === 0) { local_14 = 0; } else { local_14 = DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_14);
  while (true) {
    DAT_00631edc = 0;
    iVar1 = FUN_00419100(s_DEBUG_006359dc, s_TERRMISC, 1);
    if (DAT_00631edc === 0) break;
    FUN_004190d0(DAT_00631e28, s_HELPTERRMISC);
  }
  if (iVar1 !== -1) {
    if (iVar1 < 3) {
      local_10 = DAT_006446b8 + iVar1 * 0x3c;
    } else if (iVar1 === 0xc) {
      local_10 = DAT_00641808;
    } else if (iVar1 === 0xd) {
      local_10 = DAT_0063fc18;
    } else if (iVar1 === 0xe) {
      local_10 = DAT_00646158;
    } else if (2 < (iVar1 % 0xc)) {
      local_10 = DAT_00642710 + ((iVar1 % 0xc) * 4 - 0xc) * 0xf + Math.floor(iVar1 / 0xc) * 0x21c;
    }
  }
  FUN_0059d3c9(0);
  if (local_10 !== null) {
    uVar2 = FUN_00428b0c(DAT_00628420[0x7d8 / 4], 10, 0 /* LAB_00402590 */);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051aa4e @ 0x0051AA4E
// Size: 644 bytes
// ============================================================

// terrain_editor_update_display_controls
export function FUN_0051aa4e() {
  let iVar1;
  let local_8;

  if (s32(DAT_006a4f88, 0x2ec) < 0xb) {
    FUN_0040f380();
    iVar1 = FUN_00418d60();
    if (iVar1 === 0) {
      FUN_0040f380(); FUN_0040f380(); FUN_0040f380();
    } else if (iVar1 === 1) {
      FUN_0043c5f0(); FUN_0043c5f0(); FUN_0043c5f0();
    } else {
      FUN_0043c5f0(); FUN_0040f380(); FUN_0040f380();
    }
    FUN_0040f380();
    iVar1 = FUN_00418d60();
    if (iVar1 === 0) {
      FUN_0040f380(); FUN_0040f380(); FUN_0040f380();
    } else if (iVar1 === 1) {
      FUN_0043c5f0(); FUN_0043c5f0(); FUN_0043c5f0();
    } else {
      FUN_0043c5f0(); FUN_0040f380(); FUN_0040f380();
    }
    FUN_0040f380();
  } else {
    for (local_8 = 5; local_8 < 9; local_8 = local_8 + 1) {
      FUN_0043c5f0();
    }
    for (local_8 = 1; local_8 < 6; local_8 = local_8 + 1) {
      FUN_0043c5f0();
    }
  }
  return;
}



// ============================================================
// Function: FUN_0051acdc @ 0x0051ACDC
// Size: 289 bytes
// ============================================================

// terrain_editor_handle_control_change
export function FUN_0051acdc(param_1) {
  let iVar1;
  let uVar2;
  let local_c;

  if (param_1 === 0xc9) {
    iVar1 = FUN_005197af();
    if (iVar1 === 0) {
      uVar2 = FUN_00418d60();
      uVar2 = FUN_005195f1(uVar2);
      w32(DAT_006a4f88, 0x2ec, uVar2);
      FUN_0051961e();
      FUN_0051aa4e();
      FUN_005199a9();
    } else {
      FUN_00418d90(s32(DAT_006a4f88, 0x2ec)); // DEVIATION: Win32 combo box revert
      FUN_0051961e();
      FUN_005199a9();
      if (DAT_006a4f88 === 0) { local_c = 0; } else { local_c = DAT_006a4f88 + 0x48; }
      FUN_0059d3c9(local_c);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE);
      FUN_0059d3c9(0);
      let hWnd = FUN_00418770(); // DEVIATION: Win32
      SetFocus(hWnd); // DEVIATION: Win32
    }
  } else if ((param_1 === 0xcf) || (param_1 === 0xd3)) {
    FUN_0051aa4e();
    FUN_005199a9();
  }
  return;
}



// ============================================================
// Function: FUN_0051adfd @ 0x0051ADFD
// Size: 931 bytes
// ============================================================

// terrain_editor_create_dropdown
export function FUN_0051adfd(param_1) {
  let iVar1;
  let iVar2;
  let uVar3;
  let in_ECX;
  let local_28;
  let local_18;
  let local_14 = [0, 0, 0, 0];

  iVar1 = s32(DAT_00631b80, param_1 * 8) + s32(in_ECX, 0x124);
  iVar2 = s32(DAT_00631b84, param_1 * 8) + s32(in_ECX, 0x128);
  if (param_1 === 0) {
    FUN_004086c0(local_14, iVar1 - 0x1e, iVar2, 0xa0, s32(in_ECX, 0x2e8) << 3); // DEVIATION: Win32
  } else if ((param_1 === 2) || (param_1 === 4)) {
    FUN_004086c0(local_14, iVar1 - 0x1e, iVar2, 0x82, s32(in_ECX, 0x2e8) << 3); // DEVIATION: Win32
  } else {
    FUN_004086c0(local_14, iVar1, iVar2, 100, s32(in_ECX, 0x2e8) << 3); // DEVIATION: Win32
  }
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = DAT_006a1d80 + 1;
  local_28 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  FUN_00418bf0(local_28, iVar1, local_14); // DEVIATION: Win32 CreateWindow combo box
  FUN_00418c70(DAT_006a4f90); // DEVIATION: Win32
  FUN_00418dd0(/* LAB_004011fe */); // DEVIATION: Win32 callback
  switch (param_1) {
  case 0:
    for (local_18 = 0; local_18 < 0x21; local_18 = local_18 + 1) {
      if ((local_18 !== 0xd) && (local_18 !== 0x18)) {
        uVar3 = FUN_00428b0c(DAT_00627cc4[local_18 * 0x18 / 4]);
        FUN_00418ce0(uVar3); // DEVIATION: Win32 combo add string
      }
    }
    break;
  case 1:
  case 3:
    uVar3 = FUN_00428b0c(DAT_00628420[0x7bc / 4]);
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]);
    FUN_00418ce0(uVar3);
    for (local_18 = 0; local_18 < 0xb; local_18 = local_18 + 1) {
      uVar3 = FUN_00428b0c(DAT_00627cc4[local_18 * 0x18 / 4]);
      FUN_00418ce0(uVar3);
    }
    break;
  case 2:
  case 4:
    uVar3 = FUN_00428b0c(DAT_00628420[0x7c8 / 4]);
    FUN_00418ce0(uVar3);
    for (local_18 = 1; local_18 < 7; local_18 = local_18 + 1) {
      uVar3 = FUN_00428b0c(DAT_0064b9a0[local_18]);
      FUN_00418ce0(uVar3);
    }
    break;
  case 5:
    uVar3 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]);
    FUN_00418ce0(uVar3);
    for (local_18 = 0; local_18 < 0xb; local_18 = local_18 + 1) {
      uVar3 = FUN_00428b0c(DAT_00627cc4[local_18 * 0x18 / 4]);
      FUN_00418ce0(uVar3);
    }
    break;
  }
  return;
}



// ============================================================
// Function: FUN_0051b1c2 @ 0x0051B1C2
// Size: 244 bytes
// ============================================================

// terrain_editor_create_edit_control
export function FUN_0051b1c2(param_1) {
  let iVar1;
  let in_ECX;
  let local_24;
  let local_14 = [0, 0, 0, 0];

  FUN_004086c0(local_14, s32(DAT_00631bb0, param_1 * 2) + s32(in_ECX, 0x124),
               s32(DAT_00631bb4, param_1 * 2) + s32(in_ECX, 0x128), 0x30,
               s32(in_ECX, 0x2e8) + 6); // DEVIATION: Win32 rect calc
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = DAT_006a1d80 + 1;
  local_24 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  FUN_00418910(local_24, iVar1, local_14, DAT_00631e38); // DEVIATION: Win32 CreateWindow edit
  FUN_004189c0(3); // DEVIATION: Win32 edit control style
  FUN_00418a00(/* LAB_00401019 */); // DEVIATION: Win32 callback
  return;
}



// ============================================================
// Function: FUN_0051b2b6 @ 0x0051B2B6
// Size: 2283 bytes
// ============================================================

// terrain_editor_full_repaint
export function FUN_0051b2b6() {
  let uVar1;
  let iVar2;
  let uVar3;
  let in_ECX;
  let local_18 = null;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00552112();
  if ((DAT_0062e018 === 0) || (DAT_006a1d7c === 0)) {
    FUN_0040fdb0(in_ECX, in_ECX + 700, 0x1d);
  } else {
    FUN_005a9afe(DAT_0062e018, in_ECX, 0, 0, s32(in_ECX, 0x124),
                 s32(in_ECX, 0x128), s32(in_ECX, 0x2d8), s32(in_ECX, 0x2dc));
  }
  local_8 = s32(in_ECX, 0x124) + 0x20;
  local_c = s32(in_ECX, 0x128) + 0x20;
  if (s32(in_ECX, 0x2ec) < 0xb) {
    local_18 = DAT_00647c40 + s32(in_ECX, 0x2ec) * 0x3c;
  } else if (s32(in_ECX, 0x2ec) < 0x16) {
    local_18 = DAT_006482f8 + (s32(in_ECX, 0x2ec) % 0xb) * 0x78;
  } else {
    local_18 = DAT_00648334 + (s32(in_ECX, 0x2ec) % 0xb) * 0x78;
  }
  uVar1 = FUN_00417f70();
  iVar2 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(iVar2 * 2);
  FUN_005a9abf(in_ECX, local_8, local_c, uVar3);
  iVar2 = FUN_004bb540();
  FUN_005cef66(0 /* local_28 */, in_ECX, 0, local_8, local_c + iVar2 / 2);
  iVar2 = FUN_004bb540(6);
  uVar3 = FUN_004a6980(iVar2 * 2);
  FUN_004ccb6a(in_ECX, local_8, local_c, uVar3);
  local_18 = null;
  if (s32(in_ECX, 0x2ec) === 3) {
    local_18 = DAT_006461d8;
  } else if (s32(in_ECX, 0x2ec) === 4) {
    local_18 = DAT_006447b0;
  } else if (s32(in_ECX, 0x2ec) === 5) {
    local_18 = DAT_00647388;
  }
  if (local_18 !== null) {
    iVar2 = FUN_004bb540();
    FUN_005cef31(0 /* local_38 */, in_ECX, local_8, local_c + iVar2 / 2);
  }
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_004ccb6a(in_ECX, s32(in_ECX, 0x124) + 0x1c, s32(in_ECX, 0x128) + 0xc2, 0x1e6, 0x21, 6);
  FUN_004ccb6a(in_ECX, s32(in_ECX, 0x124) + 0x1c, s32(in_ECX, 0x128) + 0xf9, 0x1e6, 0x21, 6);
  // Label rendering for terrain editor fields
  local_10 = s32(DAT_00631bb0, 0) + s32(in_ECX, 0x124) + 0x18;
  local_14 = (s32(DAT_00631bb4, 0) + s32(in_ECX, 0x128)) - s32(in_ECX, 0x2e8) - 2;
  FUN_0040bbb0(); FUN_0040bc10(0x1d0);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = s32(DAT_00631bb8, 0) + s32(in_ECX, 0x124) + 0x18;
  local_14 = (s32(DAT_00631bbc, 0) + s32(in_ECX, 0x128)) - s32(in_ECX, 0x2e8) - 2;
  FUN_0040bbb0(); FUN_0040bc10(0x1d1);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0x32);
  local_10 = s32(DAT_00631bc0, 0) + s32(in_ECX, 0x124) + 0x18;
  local_14 = s32(DAT_00631bc4, 0) + s32(in_ECX, 0x128) + s32(in_ECX, 0x2e8) * -2 - 2;
  FUN_0040bbb0(); FUN_0040bc10(0x1d2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = s32(DAT_00631bc8, 0) + s32(in_ECX, 0x124) + 0x18;
  local_14 = s32(DAT_00631bcc, 0) + s32(in_ECX, 0x128) + s32(in_ECX, 0x2e8) * -2;
  FUN_0040bbb0(); FUN_0040bc10(0x1d3);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = s32(DAT_00631bd0, 0) + s32(in_ECX, 0x124) + 0x18;
  local_14 = s32(DAT_00631bd4, 0) + s32(in_ECX, 0x128) + s32(in_ECX, 0x2e8) * -2;
  FUN_0040bbb0(); FUN_0040bc10(0x1d4);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  // Additional labels and repaint complete
  FUN_0055a567();
  return;
}



// ============================================================
// Function: FUN_0051bba1 @ 0x0051BBA1
// Size: 2646 bytes
// ============================================================

// terrain_editor_main_dialog
export function FUN_0051bba1() {
  let in_ECX;
  let local_468;
  let local_460;
  let local_454 = [0, 0, 0, 0]; // tagRECT
  let local_444 = new Uint8Array(1076);
  let iVar4, iVar5;
  let uVar2, uVar3;
  let local_474, local_478, local_47c, local_480, local_484, local_488, local_48c, local_490;

  // SEH setup omitted
  FUN_005c64da();
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;

  // operator_new(0x48) + FUN_005bd630 → DAT_0062e018
  let pvVar1 = 0x48; // DEVIATION: operator_new(0x48)
  if (pvVar1 === 0) {
    local_468 = 0;
  } else {
    local_468 = FUN_005bd630();
  }
  DAT_0062e018 = local_468;

  FUN_00417ef0(0, DAT_0062e01c); // DEVIATION: Win32 — thunk_FUN_00417ef0
  FUN_005d268e(DAT_006a4f90); // DEVIATION: Win32 — init property sheet

  // State init on in_ECX
  w32(in_ECX, 0x2d8, 0x230);
  w32(in_ECX, 0x2dc, 0x17c);
  w32(in_ECX, 0x2ec, 0);
  DAT_006a1d80 = 0xc9;

  // Load EDITORPT.GIF
  FUN_005bf071(s_EDITORPT_GIF_00631e3c, 10, 0xc0, local_444); // DEVIATION: Win32 — GIF loader

  // Get parent window handle
  uVar2 = FUN_0040ef70(); // DEVIATION: Win32 — GetParent
  w32(in_ECX, 0x2e8, uVar2);

  // Create main editor window
  uVar3 = FUN_00428b0c(DAT_00628420[0x728 / 4], 0xd, 0, 0,
                        s32(in_ECX, 0x2d8), s32(in_ECX, 0x2dc), 0, 0, 0); // DEVIATION: Win32 — LoadString
  FUN_005534bc(uVar3, 0xd, 0, 0,
               s32(in_ECX, 0x2d8), s32(in_ECX, 0x2dc), 0, 0, 0); // DEVIATION: Win32 — CreateWindow

  // Control dispatch loop — iterate DAT_00631bf8 entries
  for (local_460 = 0; local_460 < 0xf; local_460 = local_460 + 1) {
    if (s32(DAT_00631bf8, local_460 * 8) === 9) {
      FUN_0051b1c2(s32(DAT_00631bf8, local_460 * 8 + 4));
    } else if (s32(DAT_00631bf8, local_460 * 8) === 0xc) {
      FUN_0051adfd(s32(DAT_00631bf8, local_460 * 8 + 4));
    }
  }

  // DEVIATION: _Timevec::~_Timevec(PTR_DAT_006359f0) — Ghidra misidentification of text height measurement
  let extraout_EAX = 0; // return value of text height measurement (Win32 GetTextMetrics)
  w32(in_ECX, 0x2e4, extraout_EAX + 8);
  let val_12c = s32(in_ECX, 300); // 300 = 0x12c
  w32(in_ECX, 0x2e0, (val_12c - 10 + ((val_12c - 10) >> 31 & 3)) >> 2);

  // Button 1: top-row left button
  iVar4 = (s32(in_ECX, 0x128) + s32(in_ECX, 0x130)) - (s32(in_ECX, 0x2e4) + 2);
  iVar5 = s32(in_ECX, 0x124);
  FUN_004086c0(local_454, iVar5 + 2, iVar4,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_474 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x3f8 / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_474, 0x65, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_00402711 */); // DEVIATION: Win32 — button callback

  // Button 2
  iVar5 = iVar5 + 2 + s32(in_ECX, 0x2e0) + 2;
  FUN_004086c0(local_454, iVar5, iVar4,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_478 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0xa8 / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_478, 0x66, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_00401a69 */); // DEVIATION: Win32 — button callback

  // Button 3
  iVar5 = iVar5 + s32(in_ECX, 0x2e0) + 2;
  FUN_004086c0(local_454, iVar5, iVar4,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_47c = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x8ec / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_47c, 0x66, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_0040243c */); // DEVIATION: Win32 — button callback

  // Button 4
  FUN_004086c0(local_454, iVar5 + s32(in_ECX, 0x2e0) + 2, iVar4,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_480 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x3fc / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_480, 0x66, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_00402347 */); // DEVIATION: Win32 — button callback
  FUN_0040f840(); // DEVIATION: Win32 — button style

  // Recalculate button dimensions
  iVar5 = FUN_004a6980(); // DEVIATION: Win32 — GetSystemMetrics
  w32(in_ECX, 0x2e0, iVar5 + 0xd);
  // DEVIATION: _Timevec::~_Timevec(PTR_DAT_006359f0) — second text height measurement
  let extraout_EAX_00 = 0; // return value of text height measurement (Win32 GetTextMetrics)
  w32(in_ECX, 0x2e4, extraout_EAX_00 + 8);

  // Button 5: lower-left
  iVar5 = s32(in_ECX, 0x124);
  iVar4 = FUN_004bb540(); // DEVIATION: Win32 — GetSystemMetrics
  FUN_004086c0(local_454, iVar5 + 0x19,
               iVar4 * 2 + s32(in_ECX, 0x128) + 0x28,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_484 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x7cc / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_484, 0x65, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_0040196a */); // DEVIATION: Win32 — button callback

  // Button 6: lower-right area
  iVar4 = (s32(in_ECX, 300) + s32(in_ECX, 0x124) - 0x19) - s32(in_ECX, 0x2e0);
  iVar5 = s32(in_ECX, 0x128);
  FUN_004086c0(local_454, iVar4, iVar5 + 0x28,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_488 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x8f4 / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_488, 0x65, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_00401cfd */); // DEVIATION: Win32 — button callback

  // Button 7: below button 6
  iVar5 = iVar5 + 0x28 + s32(in_ECX, 0x2e4) + 2;
  FUN_004086c0(local_454, iVar4, iVar5,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_48c = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x8f8 / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_48c, 0x65, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_00403535 */); // DEVIATION: Win32 — button callback

  // Button 8: below button 7
  FUN_004086c0(local_454, iVar4, iVar5 + s32(in_ECX, 0x2e4) + 2,
               s32(in_ECX, 0x2e0), s32(in_ECX, 0x2e4)); // DEVIATION: Win32 — SetRect
  local_490 = (in_ECX === 0) ? 0 : in_ECX + 0x48;
  uVar2 = FUN_00428b0c(DAT_00628420[0x8f0 / 4]); // DEVIATION: Win32 — LoadString
  FUN_0040f680(local_490, 0x65, local_454, uVar2); // DEVIATION: Win32 — CreateButton
  FUN_0040f880(/* LAB_0040344f */); // DEVIATION: Win32 — button callback

  // Final setup
  FUN_0040f350(0); // DEVIATION: Win32 — ShowWindow
  FUN_00519200(); // Load terrain data
  FUN_00418d90(s32(in_ECX, 0x2ec)); // DEVIATION: Win32 — SetCurSel
  FUN_0051961e(); // Update controls
  FUN_0051aa4e(); // Update display
  w32(in_ECX, 0x2f8, 6);
  FUN_00408330(/* LAB_004019d8 */); // DEVIATION: Win32 — SetFocus
  EnableStackedTabs_00511820(in_ECX, 0x402c7a); // DEVIATION: Win32 — CPropertySheet::EnableStackedTabs
  FUN_005bb574(); // DEVIATION: Win32 — update window
  FUN_004085f0(); // DEVIATION: Win32 — ShowWindow
  FUN_005c61b0(); // DEVIATION: Win32 — UpdateWindow

  // Event loop
  while (DAT_006a1d7c !== 0) {
    FUN_0040ef50(); // DEVIATION: Win32 — message pump
  }

  // Cleanup
  if (DAT_0062e018 !== 0) {
    FUN_0040f010(1); // DEVIATION: Win32 — DestroyWindow
  }
  DAT_0062e018 = 0;
  w32(in_ECX, 0x2f8, 0);

  FUN_0051c611();
  FUN_0051c627();
  return;
}

export function FUN_0051c611() { FUN_005c656b(); return; }
// Source: decompiled/block_00510000.c FUN_0051c627 (14 bytes)
export function FUN_0051c627() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051c635 @ 0x0051C635
// Size: 89 bytes
// ============================================================

// terrain_editor_entry_point
export function FUN_0051c635() {
  // SEH setup
  FUN_00417fa0();
  FUN_0051bba1();
  FUN_005bb574();
  FUN_0051c68e();
  FUN_0051c6a4();
  return;
}

export function FUN_0051c68e() { FUN_004183d0(); return; }
// Source: decompiled/block_00510000.c FUN_0051c6a4 (14 bytes)
export function FUN_0051c6a4() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051d3e0 @ 0x0051D3E0
// Size: 351 bytes
// ============================================================

// show_dialog_with_checkboxes
export function FUN_0051d3e0(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let iVar1;
  let local_2e0;
  let local_2cc;
  let local_22c;
  let local_14;
  // SEH setup
  FUN_0059db08(0x4000);
  iVar1 = FUN_005a632a(param_1, param_2, param_3, 0, param_4, param_5, param_6, param_7);
  if (iVar1 === 0) {
    if ((local_2cc & 4) !== 0) {
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        FUN_0059ea4d(local_14, 1 << (local_14 & 0x1f) & DAT_00631ed8);
      }
    }
    FUN_0040bc80(0);
    DAT_00631edc = local_22c;
    if ((local_2cc & 4) !== 0) {
      DAT_00631ed8 = 0;
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        iVar1 = FUN_0059e9f3(local_14);
        if (iVar1 !== 0) {
          DAT_00631ed8 = DAT_00631ed8 | 1 << (local_14 & 0x1f);
        }
      }
    }
  }
  FUN_0051d53f();
  FUN_0051d555();
  return;
}

export function FUN_0051d53f() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051d555 (15 bytes)
export function FUN_0051d555() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051d564 @ 0x0051D564
// Size: 178 bytes
// ============================================================

// show_dialog_with_picture
export function FUN_0051d564(param_1, param_2, param_3, param_4, param_5) {
  let local_228;
  // SEH setup
  FUN_0059db08(0x4000);
  // CSocket::Create — actually dialog creation in MFC context
  FUN_0059ec88(param_4, 0, 0);
  // EnableStackedTabs for picture display
  FUN_0040bc80(0);
  DAT_00631edc = local_228;
  FUN_0051d616();
  FUN_0051d62c();
  return;
}

export function FUN_0051d616() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051d62c (15 bytes)
export function FUN_0051d62c() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051d63b @ 0x0051D63B
// Size: 253 bytes
// ============================================================

// show_text_input_dialog
export function FUN_0051d63b(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let local_14;
  // SEH setup
  FUN_0059db08(0x4000);
  FUN_004aef20(param_5);
  iVar1 = FUN_005a632a(param_1, param_2, param_3, param_4, 0, 0, 0, 1);
  if (iVar1 === 0) {
    FUN_005a5f34(param_5, 0);
    // Replace leading spaces/tabs with '_'
    for (local_14 = param_5; local_14[0] !== '\0' && (local_14[0] === ' ' || local_14[0] === '\t');
        local_14 = local_14 + 1) {
      local_14[0] = '_';
    }
  }
  FUN_0051d738();
  FUN_0051d74e();
  return;
}

export function FUN_0051d738() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051d74e (15 bytes)
export function FUN_0051d74e() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051d75d @ 0x0051D75D
// Size: 95 bytes
// ============================================================

// dialog_get_integer
export function FUN_0051d75d(param_1, param_2, param_3, param_4) {
  let lVar1;
  let local_120 = '';
  let local_1c = '';
  let local_8;
  // __itoa(param_3, local_1c, 10);
  local_8 = FUN_0051d63b(param_1, param_2, 5, local_1c, local_120);
  // lVar1 = _atol(local_120);
  // *param_4 = lVar1;
  return local_8;
}



// ============================================================
// Function: FUN_0051d7bc @ 0x0051D7BC
// Size: 26 bytes
// ============================================================

// clear_checkbox_flags
export function FUN_0051d7bc() {
  DAT_00631ed8 = 0;
  return;
}



// ============================================================
// Function: FUN_0051d7d6 @ 0x0051D7D6
// Size: 65 bytes
// ============================================================

// set_checkbox_flag
export function FUN_0051d7d6(param_1, param_2) {
  if (param_2 === 0) {
    DAT_00631ed8 = DAT_00631ed8 & ~(1 << (param_1 & 0x1f));
  } else {
    DAT_00631ed8 = DAT_00631ed8 | 1 << (param_1 & 0x1f);
  }
  return;
}



// ============================================================
// Function: FUN_0051d817 @ 0x0051D817
// Size: 32 bytes
// ============================================================

// get_checkbox_flag
export function FUN_0051d817(param_1) {
  return 1 << (param_1 & 0x1f) & DAT_00631ed8;
}



// ============================================================
// Function: FUN_0051d950 @ 0x0051D950
// Size: 58 bytes
// ============================================================

// to_uppercase
export function FUN_0051d950(param_1) {
  let iVar1 = 0;
  if ((0x60 < param_1) && (iVar1 = 0, param_1 < 0x7b)) {
    iVar1 = param_1 - 0x20;
    param_1 = iVar1 & 0xff;
  }
  return param_1;
}



// ============================================================
// Function: FUN_0051d9a0 @ 0x0051D9A0
// Size: 952 bytes
// ============================================================

// startup_multiplayer_network
export function FUN_0051d9a0() {
  let UVar1;
  let UVar2;
  let iVar3;
  let local_30c;
  let local_308;
  // SEH setup omitted
  FUN_0059db08(0x4000);
  // DEVIATION: GetPrivateProfileIntA reads from CIV.INI
  // DAT_006c8fbc = GetPrivateProfileIntA("Multiplayer", "NetTimeOut", ...)
  // DAT_006ad8b8 = GetPrivateProfileIntA("Multiplayer", "Adapter", ...)
  // DAT_006ad2fc = GetPrivateProfileIntA("Multiplayer", "MaxPlayers", ...)
  FUN_0040ffa0(s_MPSETUP, 1);
  FUN_0040bc80(0);
  // DEVIATION: Large dialog flow for MP game type selection
  // Handles TCP/IP (FUN_005c0333), IPX, modem, PBEM modes
  // WritePrivateProfileStringA to save settings back
  FUN_0051dd72();
  FUN_0051dd88();
  return;
}

export function FUN_0051dd72() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051dd88 (15 bytes)
export function FUN_0051dd88() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051dd97 @ 0x0051DD97
// Size: 3152 bytes
// ============================================================

// new_game_setup_dialogs
export function FUN_0051dd97(param_1, param_2) {
  let iVar2;
  let local_14;
  let local_18;
  // SEH setup omitted
  FUN_0059db08(0x4000);
  DAT_00631ee4 = 0;
  DAT_00631ee8 = 0;
  // DEVIATION: Large dialog chain (3152 bytes) for new game setup
  // Step 1: Difficulty selection dialog
  FUN_0040ffa0(s_DIFFICULTY, 1);
  FUN_0040bc80(0);
  // Step 2: Number of civilizations dialog
  FUN_0040ffa0(s_ENEMIES, 1);
  FUN_0040bc80(0);
  // Step 3: Barbarian activity dialog
  FUN_0040ffa0(s_BARBARITY, 1);
  FUN_0040bc80(0);
  // Step 4: Rules customization
  // Step 5: Advanced game options
  // Handles random AI civ assignment, gender selection
  // Key game state: DAT_00631ee4, DAT_00631ee8, DAT_00655b08..0d, DAT_006ad224
  FUN_0051e9e7();
  FUN_0051e9fd();
  return;
}

export function FUN_0051e9e7() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051e9fd (15 bytes)
export function FUN_0051e9fd() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051ea0c @ 0x0051EA0C
// Size: 130 bytes
// ============================================================

// mp_lobby_timer_tick
export function FUN_0051ea0c() {
  let iVar1;
  FUN_0047e94e(1, 0);
  if (((DAT_006ad698 === '\0') && (iVar1 = FUN_00421bb0(), iVar1 - _DAT_006cec80 < 0x961)) &&
     (DAT_006ad66c !== 0) && (DAT_006ad670 !== -1)) {
    return;
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  _DAT_006cec80 = FUN_00421bb0();
  return;
}



// ============================================================
// Function: FUN_0051ea8e @ 0x0051EA8E
// Size: 1579 bytes
// ============================================================

// game_timer_setup_dialog
export function FUN_0051ea8e(param_1) {
  let iVar1;
  let iVar2;
  let local_324;
  let local_320 = '';
  let local_1c;
  let local_18;
  let local_14;
  // SEH setup omitted
  FUN_0059db08(0x2000);
  local_18 = DAT_006665d0;
  local_14 = DAT_00654b70;
  // LAB_0051ead8 — timer dialog loop
  DAT_006665d0 = local_18;
  if ((param_1 === 0) && (DAT_0062c488 === 0)) {
    FUN_0052263c(-1, 0);
    FUN_0040ffa0(s_GAMETIMER_host, 1);
    FUN_0059ea99(DAT_006665d0);
    FUN_0059e783(-999, -((((DAT_006ab19c - 0x1e0 + ((DAT_006ab19c - 0x1e0) >> 31 & 7)) >> 3) + 1)));
  } else {
    FUN_0040ffa0(s_GAMETIMER_client, 1);
    FUN_0059ea99(DAT_006665d0);
    FUN_0059e783(-999, -999);
  }
  local_324 = FUN_0040bc80(0);
  if (local_324 < 0) {
    if (param_1 === 0) { FUN_0055a567(); }
    FUN_0051f0f5();
    FUN_0051f10b();
    return;
  }
  DAT_006665d0 = local_324;
  switch (local_324) {
  case 0: DAT_00654b70 = 0; break;
  case 1: DAT_00654b70 = 30000; break;
  case 2: DAT_00654b70 = 60000; break;
  case 3: DAT_00654b70 = 120000; break;
  case 4: DAT_00654b70 = 180000; break;
  case 5: DAT_00654b70 = 300000; break;
  case 6:
    // Custom timer — dialog for entering ms value
    FUN_0040ffa0(s_GAMETIMERCUSTOM, 1);
    FUN_0040bc80(0);
    break;
  }
  if (param_1 === 0) {
    FUN_0055a567();
    if (local_324 === 6) {
      FUN_005f22d0(DAT_006665d2, local_320);
    }
    FUN_0051f0f5();
    FUN_0051f10b();
    return;
  }
  if (1 < DAT_006ad308) {
    FUN_005f22d0(DAT_0063cc48, DAT_006ad5bc);
    FUN_004aef20(DAT_0063cd4c);
    if (DAT_00654b70 === 0) {
      FUN_004af14b(DAT_0063cd4c, 0x285);
    } else {
      iVar1 = Math.floor(DAT_00654b70 / 1000 / 60);
      iVar2 = Math.floor(DAT_00654b70 / 1000) % 60;
      if (iVar1 < 10) { FUN_004af1d5(DAT_0063cd4c, 0); }
      FUN_004af1d5(DAT_0063cd4c, iVar1);
      FUN_005f22e0(DAT_0063cd4c, DAT_006320b4);
      if (iVar2 < 10) { FUN_004af1d5(DAT_0063cd4c, 0); }
      FUN_004af1d5(DAT_0063cd4c, iVar2);
    }
    FUN_00511880(0x40, 0, 0, 0, 0, 0);
  }
  FUN_0051f0f5();
  FUN_0051f10b();
  return;
}

export function FUN_0051f0f5() { FUN_0059df8a(); return; }
// Source: decompiled/block_00510000.c FUN_0051f10b (15 bytes)
export function FUN_0051f10b() { /* DEVIATION: Win32 — SEH epilog */ return; }



// ============================================================
// Function: FUN_0051f11a @ 0x0051F11A
// Size: 100 bytes
// ============================================================

// mp_check_network_status
export function FUN_0051f11a() {
  let iVar1;
  FUN_0047e94e(1, 0);
  if (((DAT_006ad698 === '\0') && (iVar1 = FUN_00421bb0(), iVar1 - _DAT_006cec80 < 0x961)) &&
     (DAT_006ad66c !== 0) && (DAT_006ad670 !== -1)) {
    return;
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  _DAT_006cec80 = FUN_00421bb0();
  return;
}



// ============================================================
// Function: FUN_0051f17e @ 0x0051F17E
// Size: 30 bytes
// ============================================================

// mp_pump_messages
export function FUN_0051f17e() {
  FUN_0047e94e(1, 0);
  return;
}



// ============================================================
// Function: FUN_0051f19c @ 0x0051F19C
// Size: 9815 bytes
// ============================================================

// mp_tribe_selection_dialog (massive — 9815 bytes)
export function FUN_0051f19c(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_448;
  let local_440;
  let local_43c;
  let local_434;
  let local_430 = '';
  let local_32c;
  let local_328;
  let local_324 = 1;
  let local_320 = 0;
  let local_31c = new Array(60);
  let local_28 = 0xffffffff;
  let local_20 = 0xffffffff;
  let local_1c;
  let local_18;
  let local_14;
  // SEH setup omitted
  FUN_0059db08(0x2000);
  // DEVIATION: Massive MP tribe selection dialog (9815 bytes)
  // Key game-state operations:
  // - Reads/writes DAT_006ad59c (player name), DAT_006ad63c (leader name)
  // - Reads/writes DAT_006ad130 (email), DAT_0064bc10..56 (civ stats)
  // - Reads DAT_00655020 (total civs), DAT_00627670 (tribe data)
  // - Reads/writes DAT_006ad228 (city style), DAT_006ab19c/198 (screen dims)
  // - Uses FUN_0046b14d for network messages (tribe claim/release)
  // - Uses FUN_00498a5c, FUN_00493ba6, FUN_00493b10 for civ name lookups
  // - Uses FUN_00447210 for tribe initialization
  // - Multiple rounds of FUN_0040ffa0/FUN_0040bc80 dialog loops
  // All FUN_ calls and DAT_ reads are to game-logic functions
  FUN_00521807();
  FUN_0052181d();
  return;
}



// ═══════════════════════════════════════════════════════════════════
// STUB FUNCTIONS — External references not defined in this block
// ═══════════════════════════════════════════════════════════════════

// Helper stubs
function operator_delete(p) { /* Win32 heap free — no-op */ }
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _atoi(s) { return parseInt(s, 10) || 0; }
function _atol(s) { return parseInt(s, 10) || 0; }
function _rand() { return Math.floor(Math.random() * 0x7fff); }
function _sprintf() { return ''; }
function _strncpy() { }
function _fputs() { }

// Win32 API stubs
function SetRect() { }
function OffsetRect() { }
function InflateRect() { }
function CopyRect() { }
function SetFocus() { }
function MessageBoxA() { }
function GetPrivateProfileIntA() { return -1; }
function WritePrivateProfileStringA() { }
function timeGetTime() { return Date.now(); }
function CRichEditDoc_InvalidateObjectCache() { }
function CSocket_Create() { return 0; }
function CCheckListBox_GetCheckStyle() { return 0; }

// MFC stubs
function CString_CString() { }
function COleClientItem_GetActiveView() { return 0; }
function COleControlSite_SetDlgCtrlID() { }

// Cross-block function stubs (from other block_*.c files)
function FUN_005a97cc() { }
function FUN_005a99fc() { }
function FUN_004af09e() { }
function FUN_0046ace7() { }
function FUN_00548c78() { }
function FUN_004a6cc5() { }
function FUN_005cb6db() { }
function FUN_005bd915() { }
function FUN_0040f510() { }
function FUN_0043ce5a() { }
function FUN_0040f480() { }
function FUN_005bd630() { }
function FUN_0046b14d() { }
function FUN_005f22d0() { }
function FUN_005f22e0() { }
function FUN_005d22b7() { }
function FUN_005dae6b() { }
function FUN_0047e94e() { }
function FUN_00421bb0() { return 0; }
function FUN_00421ea0() { return 0; }
function FUN_004442e0() { return 0; }
function FUN_004442a0() { }
function FUN_00410030() { return 0; }
function FUN_00432611() { }
function FUN_00493ba6() { return 0; }
function FUN_00493b10() { return 0; }
function FUN_00493c7d() { return 0; }
function FUN_0040ff60() { }
function FUN_004d0208() { }
function FUN_0046e571() { }
function FUN_0046e020() { }
function FUN_00414dd0() { }
function FUN_004eb80a() { }
function FUN_004eb571() { }
function FUN_0043c9d0() { }
function FUN_0059ec88() { }
function FUN_0040bc80() { return 0; }
function FUN_004cc870() { }
function FUN_004c4240() { }
function FUN_004679ab() { return 0; }
function FUN_00428b0c() { return 0; }
function FUN_004bd9f0() { return 0; }
function FUN_004b7eb6() { }
function FUN_0040ffa0() { return 0; }
function FUN_0059f2a3() { }
function FUN_00426fb0() { return 0; }
function FUN_00498a5c() { return 0; }
function FUN_0040bbb0() { }
function FUN_0040bbe0() { }
function FUN_0040fe10() { }
function FUN_0040fe40() { }
function FUN_0040ff00() { }
function FUN_0040ff30() { }
function FUN_0040bc10() { }
function FUN_00421dd0() { }
function FUN_00421d60() { }
function FUN_00421da0() { }
function FUN_00421f10() { }
function FUN_00421ca0() { }
function FUN_00447210() { }
function FUN_0059db08() { }
function FUN_0059df8a() { }
function FUN_0059db65() { }
function FUN_005c64da() { }
function FUN_005c656b() { }
function FUN_005c61b0() { }
function FUN_005cde4d() { }
function FUN_005dd1a0() { }
function FUN_005dd010() { }
function FUN_005dd2e3() { }
function FUN_005dd377() { return 0; }
function FUN_005dd3c2() { }
function FUN_005dd3f1() { }
function FUN_005dd45d() { }
function FUN_005dd561() { }
function FUN_005dd51d() { }
function FUN_005dd64c() { }
function FUN_0044ca60() { }
function FUN_0044cba0() { }
function FUN_0044c730() { }
function FUN_0044c5a0() { }
function FUN_004502b0() { }
function FUN_004502e0() { }
function FUN_00450340() { }
function FUN_00450390() { }
function FUN_004503d0() { }
function FUN_00450400() { }
function FUN_0040f3e0() { }
function FUN_0040f380() { }
function FUN_0040f570() { }
function FUN_0040f680() { }
function FUN_0040f840() { }
function FUN_0040f880() { }
function FUN_0040f010() { }
function FUN_0040ef50() { }
function FUN_0040ef70() { return 0; }
function FUN_0040efd0() { return 0; }
function FUN_0040fdb0() { }
function FUN_0040fcf0() { }
function FUN_0040fd40() { }
function FUN_0040f350() { }
function FUN_005f35f0() { }
function FUN_0046e6a9() { }
function FUN_0046e6c8() { }
function FUN_0046e287() { }
function FUN_0046efd6() { }
function FUN_0046f06f() { }
function FUN_005a632a() { return 0; }
function FUN_005a5f34() { return 0; }
function FUN_005a9afe() { }
function FUN_005a9abf() { }
function FUN_005a9b5d() { }
function FUN_00564713() { return 0; }
function FUN_00568861() { return 0; }
function FUN_005534bc() { }
function FUN_00573e59() { }
function FUN_005683c5() { }
function FUN_005bb4ae() { }
function FUN_005bb574() { }
function FUN_005bb024() { }
function FUN_005bf071() { }
function FUN_005bf5e1() { }
function FUN_005bc4a1() { }
function FUN_005bcaa7() { }
function FUN_005bd65c() { }
function FUN_005c0333() { }
function FUN_005c0593() { }
function FUN_005c041f() { }
function FUN_005c0cc5() { }
function FUN_005c0f57() { }
function FUN_005c1167() { }
function FUN_005c19ad() { }
function FUN_005c5fc4() { }
function FUN_005c6b63() { }
function FUN_005c6da8() { }
function FUN_005cedad() { }
function FUN_005cef31() { }
function FUN_005cef66() { }
function FUN_005d268e() { }
function FUN_005d6a2c() { }
function FUN_005d8236() { }
function FUN_0059d3b1() { }
function FUN_0059d3c9() { }
function FUN_0059dfb9() { }
function FUN_0059e18b() { }
function FUN_0059e472() { }
function FUN_0059e783() { }
function FUN_0059e7ad() { return null; }
function FUN_0059e8db() { }
function FUN_0059e9f3() { return 0; }
function FUN_0059ea4d() { }
function FUN_0059ea99() { }
function FUN_0059edf0() { }
function FUN_0059f06d() { }
function FUN_004aef20() { }
function FUN_004af14b() { }
function FUN_004af1d5() { }
function FUN_004a2020() { }
function FUN_004a2379() { return 0; }
function FUN_004a23fc() { return 0; }
function FUN_004a24b1() { return ''; }
function FUN_004a2534() { return 0; }
function FUN_004a6980() { return 0; }
function FUN_00497c90() { return {}; }
function FUN_00497d00() { }
function FUN_00497d40() { }
function FUN_00498159() { return 0; }
function FUN_00498784() { }
function FUN_004d007e() { }
function FUN_004bb540() { return 0; }
function FUN_004bc480() { }
function FUN_004bc8aa() { }
function FUN_004bcb9b() { }
function FUN_004bcfcf() { }
function FUN_004bd2a3() { }
function FUN_004ccab9() { }
function FUN_004ccb6a() { }
function FUN_004ccdb6() { }
function FUN_004e4ceb() { }
function FUN_004f6646() { }
function FUN_00419100() { return 0; }
function FUN_00419170() { return 0; }
function FUN_004190a0() { }
function FUN_004190d0() { }
function FUN_00419b80() { }
function FUN_00419ba0() { }
function FUN_00419be0() { }
function FUN_00419c8b() { }
function FUN_00419ed3() { }
function FUN_00414ce0() { }
function FUN_00414d10() { return 0; }
function FUN_00414d40() { }
function FUN_00417ef0() { }
function FUN_00417f70() { return 0; }
function FUN_00417fa0() { }
function FUN_004183d0() { }
function FUN_00407ff0() { }
function FUN_004085f0() { }
function FUN_004086c0() { }
function FUN_00408130() { }
function FUN_00408330() { }
function FUN_00408460() { }
function FUN_00408490() { }
function FUN_00408650() { }
function FUN_00410070() { return 0; }
function FUN_00418740() { return 0; }
function FUN_00418770() { return null; }
function FUN_00418910() { }
function FUN_004189c0() { }
function FUN_00418a00() { }
function FUN_00418a30() { }
function FUN_00418a70() { }
function FUN_00418bf0() { }
function FUN_00418c70() { }
function FUN_00418ce0() { }
function FUN_00418d20() { }
function FUN_00418d60() { return 0; }
function FUN_00418d90() { }
function FUN_00418dd0() { }
function FUN_00421d60_v2() { }
function FUN_00421dd0_v2() { }
function FUN_00421e70() { return 0; }
function FUN_00444310() { return 0; }
function FUN_00443c80() { }
function FUN_00451bf0() { }
function FUN_004518d0() { }
function FUN_00453c40() { }
function FUN_00453c80() { }
function FUN_00468bb9() { }
function FUN_0058878e() { }
function FUN_0043c460() { }
function FUN_0043c520() { }
function FUN_0043c5f0() { }
function FUN_0043c690() { }
function FUN_0043c6c0() { }
function FUN_0043c840() { }
function FUN_004923c0() { }
function FUN_00484fec() { return 0; }
function FUN_005adfa0() { return 0; }
function FUN_0059a791() { return 0; }
function FUN_0059c276() { }
function FUN_0055a567() { }
function FUN_00552112() { }
function FUN_005baeb0() { }
function FUN_005baec8() { }
function FUN_005baee0() { }
function FUN_0052263c() { }
function FUN_005226fa() { return 0; }
function FUN_0052182c() { }
function FUN_00521807() { FUN_0059df8a(); return; }
function FUN_0052181d() { return; }
function show_messagebox_CF2D() { return 0; }
function FUN_004729ab() { }


// ═══════════════════════════════════════════════════════════════════
// DAT_ globals — Referenced but not defined in this block.
// These are stubs; actual values live in mem.js or other blocks.
// ═══════════════════════════════════════════════════════════════════

let DAT_00635c64 = 0;
let DAT_00679640 = '';
let DAT_006359d4 = 0;
let DAT_00655b02 = 0;
let DAT_00631130 = null;
let DAT_00631134 = null;
let DAT_006ad698 = '\0';
let DAT_006c91e4 = 0;
let _DAT_006cec80 = 0;
let DAT_006ad678 = new Array(16).fill(0);
let _DAT_006ad67c = 0;
let DAT_006d1da0 = 0;
let DAT_00635a3c = 0;
let DAT_006ad690 = 0;
let DAT_006ad694 = 0;
let _DAT_006c908c = 0;
let DAT_006c9090 = 0;
let DAT_006ad2f7 = '\0';
let DAT_0063fc58 = 0;
let DAT_00643af8 = 0;
let DAT_00643798 = 0;
let DAT_00645160 = 0;
let DAT_00645a84 = 0;
let DAT_00645fe8 = 0;
let DAT_00641848 = 0;
let DAT_00646878 = 0;
let DAT_006469e0 = 0;
let DAT_00647748 = 0;
let DAT_00648018 = 0;
let DAT_006ad30c = 0;
let DAT_006ad558 = 0;
let DAT_0064ca82 = 0;
let DAT_0064c6e0 = 0;
let DAT_00655af8 = 0;
let DAT_0067a8c0 = -1;
let DAT_0067a8bc = 0;
let DAT_00626a2c = 0;
let DAT_00655b91 = '\0';
let DAT_0064b9c0 = 0;
let DAT_00628420 = new Array(0x1000).fill(0);
let DAT_00628064 = 0;
let DAT_006a85a4 = 0;
let DAT_0063359c = 0;
let DAT_00633598 = 0;
let DAT_00633588 = 0;
let DAT_00633594 = 0;
let DAT_00633590 = 0;
let DAT_00631a98 = 0;
let DAT_00631a9c = 0;
let DAT_00631acc = 0;
let _DAT_00631ac8 = 0;
let DAT_00631ad0 = 0;
let DAT_00631edc = 0;
let DAT_00631ed8 = 0;
let DAT_00631b78 = 0;
let DAT_006a1d7c = 0;
let DAT_006a1d80 = 0;
let DAT_006a4f88 = 0;
let DAT_0062e018 = 0;
let DAT_0062e01c = 0;
let DAT_00627cc0 = 0;
let DAT_00627cc4 = 0;
let DAT_00627cc8 = 0;
let DAT_00627cc9 = 0;
let DAT_00627cca = 0;
let DAT_00627ccd = 0;
let DAT_00627cce = 0;
let DAT_00627cd0 = 0;
let DAT_00627cd2 = 0;
let DAT_00627cd4 = 0;
let DAT_0062cd24 = 0;
let DAT_0064b9a0 = 0;
let DAT_006ad8b8 = 0;
let DAT_006c8fbc = 0;
let DAT_006ad2fc = 0;
let DAT_006c3164 = 0;
let DAT_006c3160 = 0;
let DAT_00655b0a = 0;
let DAT_00655b0b = 0;
let DAT_0064bb08 = 0;
let DAT_00655020 = 0;
let DAT_00627670 = 0;
let DAT_006ad228 = 0;
let DAT_006ab19c = 0;
let DAT_006ab198 = 0;
let DAT_0066653a = 0;
let DAT_006ad308 = 0;
let DAT_00655b08 = 0;
let DAT_00655b0d = 0;
let DAT_00655b09 = 0;
let DAT_00655ae8 = 0;
let DAT_0064bc10 = 0;
let DAT_0064bc14 = 0;
let DAT_0064bc16 = 0;
let DAT_0064bc18 = 0;
let DAT_0064bc24 = 0;
let DAT_0064bc28 = 0;
let DAT_0064bc54 = 0;
let DAT_0064bc56 = 0;
let DAT_00655afc = 0;
let DAT_00654fa8 = 0;
let DAT_00654faa = 0;
let DAT_00654fac = 0;
let DAT_00654fae = 0;
let DAT_00654fb0 = 0;
let DAT_00654b70 = 0;
let DAT_00654c74 = 0;
let DAT_00654c76 = 0;
let DAT_00654c78 = 0;
let DAT_00654c7a = 0;
let DAT_00654c7c = 0;
let DAT_00654fa4 = 0;
let DAT_00666546 = 0;
let DAT_00666548 = 0;
let DAT_0066654a = 0;
let DAT_0066654c = 0;
let DAT_0066654e = 0;
let DAT_00666590 = 0;
let DAT_006665d0 = 0;
let DAT_006665fe = 0;
let DAT_00666600 = 0;
let DAT_00631ee4 = 0;
let DAT_00631ee8 = 0;
let _DAT_00655af6 = 0;
let DAT_006ad684 = 0;
let DAT_006c9088 = 0;
let DAT_006c900c = 0;
let DAT_006c9010 = 0;
let DAT_006c9078 = 0;
let DAT_006c907c = 0;
let DAT_006ad66c = 0;
let DAT_006ad670 = 0;
let DAT_00655b03 = 0;
let DAT_006ad224 = 0;
let DAT_006ad148 = '\0';
let DAT_006ad160 = '\0';
let DAT_00628048 = 0;
let DAT_0062c488 = 0;
let DAT_0067a994 = 0;
let DAT_0067a9b8 = 0;
let DAT_0067a9bc = 0;
let DAT_0067ab65 = '\0';
let DAT_0067ab66 = '\0';
let DAT_00631138 = 0;
let DAT_0063113c = 0;
let DAT_006554fe = 0;
let DAT_00655142 = 0;
let DAT_0065514e = 0;
let DAT_0065512a = 0;
let DAT_0065515a = 0;
let DAT_006d1168 = 0;
let DAT_006ab148 = 0;
let DAT_006ab144 = 0;
let _DAT_006ad124 = 0;
let _DAT_006ad120 = 0;
let _DAT_006ad128 = 0;
let _DAT_006ad12c = 0;
let _DAT_006ad178 = 0;
let _DAT_006ad674 = 0;

// String constants (referenced by name in the switch)
let s_RETIREDIE_00631140 = 'RETIREDIE';
let s_RETIREAI_0063114c = 'RETIREAI';
let s_BARBARIANS_00631158 = 'BARBARIANS';
let s_GLOBALWARMING_00631164 = 'GLOBALWARMING';
let s_FEARWARMING_00631174 = 'FEARWARMING';
let s_EAGLEHASLANDED_00631180 = 'EAGLEHASLANDED';
let s_SCENARIOENDS_00631190 = 'SCENARIOENDS';
let s_SCENARIOEND_006311a0 = 'SCENARIOEND';
let s_PLANRETIRE_006311ac = 'PLANRETIRE';
let s_DORETIRE_006311b8 = 'DORETIRE';
let s_LAUNCHED_006311c4 = 'LAUNCHED';
let s_SPACERETURNS_006311d0 = 'SPACERETURNS';
let s_SPACEDESTROYED_006311e0 = 'SPACEDESTROYED';
let s_DESTROYED_006311f0 = 'DESTROYED';
let s_CARAVAN_006311fc = 'CARAVAN';
let s_FOODCARAVAN_00631204 = 'FOODCARAVAN';
let s_CARAVANOTHER_00631210 = 'CARAVANOTHER';
let s_STARTWONDER_00631220 = 'STARTWONDER';
let s_SWITCHWONDER_0063122c = 'SWITCHWONDER';
let s_ABANDONWONDER_0063123c = 'ABANDONWONDER';
let s_PARADROP_0063124c = 'PARADROP';
let s_SCHISM_00631258 = 'SCHISM';
let s_CANESCAPE_00631260 = 'CANESCAPE';
let s_ESCAPE_0063126c = 'ESCAPE';
let s_CAPTUREWONDER_00631274 = 'CAPTUREWONDER';
let s_LOSTWONDER_00631284 = 'LOSTWONDER';
let s_CITYCAPTURE_00631290 = 'CITYCAPTURE';
let s_CITYWINALLY_0063129c = 'CITYWINALLY';
let s_CITYLOSEALLY_006312a8 = 'CITYLOSEALLY';
let s_CITYCAPTURE2_006312b8 = 'CITYCAPTURE2';
let s_PARTISANS_006312c8 = 'PARTISANS';
let s_PROMOTED_006312d4 = 'PROMOTED';
let s_INCORRUPTIBLE_006312e0 = 'INCORRUPTIBLE';
let s_DESERTED_006312f0 = 'DESERTED';
let s_DESERT_006312fc = 'DESERT';
let s_DESERT2_00631304 = 'DESERT2';
let s_BLEWITUP_0063130c = 'BLEWITUP';
let s_BOND007_00631318 = 'BOND007';
let DAT_00631320 = '';
let s_BONDGLORY_00631328 = 'BONDGLORY';
let s_USEWEAPONS_00631334 = 'USEWEAPONS';
let DAT_00631340 = '';
let s_CHANGED_00631344 = 'CHANGED';
let s_OVERTHROWN_0063134c = 'OVERTHROWN';
let s_BREAKCEASE_00631358 = 'BREAKCEASE';
let s_SNEAK_00631364 = 'SNEAK';
let s_MISSILEATTACK_0063136c = 'MISSILEATTACK';
let s_PEARLHARBOR_0063137c = 'PEARLHARBOR';
let s_BATTERY2_00631388 = 'BATTERY2';
let s_BATTERY_00631394 = 'BATTERY';
let s_SCRAMBLE_0063139c = 'SCRAMBLE';
let s_AMPHIBMOTIZE_006313a8 = 'AMPHIBMOTIZE';
let s_MULTIPLELOSE_006313b8 = 'MULTIPLELOSE';
let s_MULTIPLEWIN_006313c8 = 'MULTIPLEWIN';
let s_RANSOM_006313d4 = 'RANSOM';
let s_ACTIVATEALLY_006313dc = 'ACTIVATEALLY';
let s_ALLYHELPS_006313ec = 'ALLYHELPS';
let s_CANCELPEACE_006313f8 = 'CANCELPEACE';
let s_ALLYUNDERATTACK_00631404 = 'ALLYUNDERATTACK';
let s_ALLYATTACKING_00631414 = 'ALLYATTACKING';
let s_UPGRADE_00631444 = 'UPGRADE';
let s_NEWPLAYER_0063144c = 'NEWPLAYER';
let s_NEWTURNTIMERCLIENT_00631458 = 'NEWTURNTIMERCLIENT';
let s_NEWTURNTIMERNO_0063146c = 'NEWTURNTIMERNO';
let s_NEWTURNTIMERYES_0063147c = 'NEWTURNTIMERYES';
let s_PMCHANGECLIENT_0063148c = 'PMCHANGECLIENT';
let s_PMCHANGENO_0063149c = 'PMCHANGENO';
let s_PMCHANGEYES_006314a8 = 'PMCHANGEYES';
let s_MANHATTAN_006314b4 = 'MANHATTAN';
let s_BUILT2_006314c0 = 'BUILT2';
let s_MOVECAPITAL_006314c8 = 'MOVECAPITAL';
let s_ASTRONAUTS_006314d4 = 'ASTRONAUTS';
let s_ALMOSTWONDER_006314e0 = 'ALMOSTWONDER';
let s_STILLWONDER1_006314f0 = 'STILLWONDER1';
let s_STILLWONDER2_00631500 = 'STILLWONDER2';
let s_ENDWONDER_00631510 = 'ENDWONDER';
let s_BARBARIANSLAND_0063151c = 'BARBARIANSLAND';
let s_WARENDS_0063152c = 'WARENDS';
let s_MILITARYAID1_00631534 = 'MILITARYAID1';
let s_MILITARYAID2_00631544 = 'MILITARYAID2';
let s_LOSTCLIENT_00631554 = 'LOSTCLIENT';
let s_GOLDENAGE_00631560 = 'GOLDENAGE';
let s_ENEMYEMBASSY_0063156c = 'ENEMYEMBASSY';
let s_ENEMYINVESTIGATE_0063157c = 'ENEMYINVESTIGATE';
let s_STEAL_00631590 = 'STEAL';
let s_FOILEDAGAIN_00631598 = 'FOILEDAGAIN';
let s_TERRAIN_00631d68 = 'TERRAIN';
let s_EDITORPT_GIF_00631e3c = 'EDITORPT.GIF';
let DAT_00631cd4 = '';
let DAT_00631ce0 = '';
let DAT_00631cec = '';
let DAT_00631cf0 = '';
let DAT_0063cc48 = '';
let DAT_0063cc30 = 0;
let DAT_006a2d28 = 0;
let DAT_006a2d2c = 0;
let DAT_006a2d30 = 0;
let DAT_006a2d3c = 0;
let DAT_006a2d40 = 0;
let DAT_006a2d44 = 0;
let DAT_006a2d48 = 0;
let DAT_006a2d5c = 0;
let DAT_006a2a00 = 0;
let DAT_006a1d88 = '';
let DAT_006a4f90 = 0;
let DAT_006abae0 = 0;
let DAT_006ab190 = 0;
let DAT_006ab6a8 = 0;
let DAT_006a8c00 = 0;
let DAT_006553d8 = 0;
let DAT_006aad58 = 0;
let DAT_006cec90 = 0;
let PTR_FUN_0061d6d8 = 0;
let PTR_DAT_006359f0 = 0;
let DAT_006ad59c = '';
let DAT_006ad63c = '';
let DAT_006ad130 = '';
let DAT_00646cb8 = 0;
let DAT_0062768c = 0;
let DAT_0062768d = 0;

// Additional string constants for cases 0x59-0x65, 0x3d
let s_SABOTAGEONE_006315d8 = 'SABOTAGEONE';
let s_SABOTAGETWO_006315e4 = 'SABOTAGETWO';
let s_WATERSUPPLY_006315a4 = 'WATERSUPPLY';
let s_PLANTEDNUKE_006315b0 = 'PLANTEDNUKE';
let s_PLANTEDNUKE2_006315bc = 'PLANTEDNUKE2';
let s_CIVILWAR_006315cc = 'CIVILWAR';
let s_UPMINE_006315f0 = 'UPMINE';
let s_UPYOURS_006315f8 = 'UPYOURS';
let s_UPYOURSTOO_00631600 = 'UPYOURSTOO';
let s_MERCDECLARE_0063160c = 'MERCDECLARE';
let s_TOOKCIV_00631618 = 'TOOKCIV';
let s_REVEALUNITORIGINS_00631620 = 'REVEALUNITORIGINS';
let s_REVEALCITYINFO_00631634 = 'REVEALCITYINFO';
let s_PARLEYREQUEST_00631424 = 'PARLEYREQUEST';
let s_PARLEYCANCEL_00631434 = 'PARLEYCANCEL';

// Additional string constants for new transpilations
let s_MESSAGE_LOST_in_EnqueueMessage = 'MESSAGE LOST in EnqueueMessage';
let s_head_gt_400_head_lt_MAX = 'head > 400 && head < MAX_MSGS';
let s_NetMessageQueue_primary = 'NetMessageQueue primary';
let s_tail_gt_400_tail_lt_MAX = 'tail > 400 && tail < MAX_MSGS';
let s_NetMessageQueue_tail = 'NetMessageQueue tail';
let s_EnqueueMessage_Primary_Failed = 'EnqueueMessage Primary Failed';
let s_MESSAGE_LOST_in_Alpha_EnqueueMessage = 'MESSAGE LOST in Alpha EnqueueMessage';
let s_alphaHead_gt_0_lt_400 = 'alphaHead > 0 && alphaHead < 400';
let s_NetMessageQueue_alpha_head = 'NetMessageQueue alpha head';
let s_alphaTail_gt_0_lt_400 = 'alphaTail > 0 && alphaTail < 400';
let s_NetMessageQueue_alpha_tail = 'NetMessageQueue alpha tail';
let s_EnqueueMessage_Alpha_Failed = 'EnqueueMessage Alpha Failed';
let s_civ2_mk_dll = 'civ2_mk.dll';
let DAT_00631aac = 0;
let DAT_00631ab0 = 0;
let DAT_00631ab4 = 0;
let DAT_00631abc = '';
let DAT_006558e8 = '';
let DAT_00673f14 = '';
let DAT_00655142_arr = 0;
let s_COUNCILCHEAT0 = 'COUNCILCHEAT0';
let s_COUNCILCHEAT1 = 'COUNCILCHEAT1';
let s_COUNCILCHEAT2 = 'COUNCILCHEAT2';
let s_council = 'council';
let s_anarchy = 'anarchy';
let DAT_00631b08 = '';
let DAT_00631b0c = '';
let DAT_00631b10 = '';
let DAT_00631b14 = '';
let DAT_00631b18 = '';
let DAT_00631b2c = '';
let DAT_00631b3c = '';
let s_civ2_video_ = 'civ2_video_';
let s_VFWNOTREGISTERED = 'VFWNOTREGISTERED';
let DAT_00631b58 = '';
let s_DEBUG_006359dc = 'DEBUG';
let s_NOTICE = 'NOTICE';
let s_TERRNAME = 'TERRNAME';
let s_FOREST = 'FOREST';
let s_HELPFOREST = 'HELPFOREST';
let s_HILLS = 'HILLS';
let s_HELPHILLS = 'HELPHILLS';
let s_MOUNTAINS = 'MOUNTAINS';
let s_HELPMOUNTAINS = 'HELPMOUNTAINS';
let s_RIVER = 'RIVER';
let s_HELPRIVER = 'HELPRIVER';
let s_COAST = 'COAST';
let s_HELPCOAST = 'HELPCOAST';
let s_TERRMISC = 'TERRMISC';
let s_HELPTERRMISC = 'HELPTERRMISC';
let DAT_00631d8c = '';
let DAT_00631da8 = '';
let DAT_00631dcc = '';
let DAT_00631de8 = '';
let DAT_00631e04 = '';
let DAT_00631e28 = '';
let s_TERRAIN_00631d2c = 'TERRAIN';
let s_Error_updating_RULES = 'Error updating RULES: %s';
let s_File_IO_Error = 'File I/O Error';
let s_MPSETUP = 'MPSETUP';
let s_DIFFICULTY = 'DIFFICULTY';
let s_ENEMIES = 'ENEMIES';
let s_BARBARITY = 'BARBARITY';
let s_GAMETIMER_host = 'GAMETIMER';
let s_GAMETIMER_client = 'GAMETIMER';
let s_GAMETIMERCUSTOM = 'GAMETIMERCUSTOM';
let s___00631d18 = ' ';
let DAT_00631d20 = '\n';
let DAT_00631cfc = '';
let DAT_00631d00 = '';
let DAT_00631d04 = '';
let DAT_00631d08 = '';
let DAT_00631d0c = '';
let DAT_00631d10 = '';
let DAT_00631d14 = '';
let DAT_00631cd0 = '%d';
let DAT_00631c70 = 0;
let DAT_00631ca0 = 0;
let DAT_00631bf8 = 0;
let DAT_00631b80 = 0;
let DAT_00631b84 = 0;
let DAT_00631bb0 = 0;
let DAT_00631bb4 = 0;
let DAT_00631bb8 = 0;
let DAT_00631bbc = 0;
let DAT_00631bc0 = 0;
let DAT_00631bc4 = 0;
let DAT_00631bc8 = 0;
let DAT_00631bcc = 0;
let DAT_00631bd0 = 0;
let DAT_00631bd4 = 0;
let DAT_00631bd8 = 0;
let DAT_00631bdc = 0;
let DAT_00631be0 = 0;
let DAT_00631be4 = 0;
let DAT_00631b88 = 0;
let DAT_00631b8c = 0;
let DAT_00631b90 = 0;
let DAT_00631b94 = 0;
let DAT_00631ba8 = 0;
let DAT_00631ad4 = 0;
let DAT_00631e38 = '';
let DAT_00647c40 = 0;
let DAT_006482f8 = 0;
let DAT_00648334 = 0;
let DAT_006461d8 = 0;
let DAT_006447b0 = 0;
let DAT_00647388 = 0;
let DAT_006446b8 = 0;
let DAT_00641808 = 0;
let DAT_0063fc18 = 0;
let DAT_00646158 = 0;
let DAT_00642710 = 0;
let DAT_0063f858 = 0;
let DAT_0063fd18 = 0;
let DAT_00643b38 = 0;
let DAT_0065515a = 0;
let DAT_0065514e = 0;
let DAT_0065512a = 0;
let DAT_006665d2 = '';
let DAT_006ad5bc = '';
let DAT_0063cd4c = '';
let DAT_006320b4 = '';
let DAT_0064c6b5 = 0;

// Additional cross-block function stubs
function operator_new(n) { return new Array(n); }
function FID_conflict__memcpy() { }
function FUN_005a9b5d() { }
function FUN_0046e287() { }
function FUN_00407ff0() { }
function FUN_00408650() { }
function FUN_00414ce0() { }
function FUN_00408490() { }
function FUN_00408130() { }
function FUN_00414d40() { }
function FUN_00552112() { }
function FUN_0055a567() { }
function FUN_004ccb6a() { }
function FUN_00417f70() { return 0; }
function FUN_004bb540() { return 0; }
function FUN_004a6980() { return 0; }
function FUN_005cef66() { }
function FUN_004ccab9() { }
function FUN_004e4ceb() { }
function FUN_00414d10() { return 0; }
function FUN_004d007e() { }
function FUN_0059a791() { return 0; }
function FUN_00418a30() { }
function FUN_00418a70() { }
function FUN_005adfa0() { return 0; }
function FUN_0043c690() { }
function FUN_0043c6c0() { }
function FUN_0043c840() { }
function FUN_004086c0() { }
function FUN_00418bf0() { }
function FUN_00418c70() { }
function FUN_00418dd0() { }
function FUN_00418ce0() { }
function FUN_00418910() { }
function FUN_004189c0() { }
function FUN_00418a00() { }
function FUN_0052263c() { }
function FUN_00511880() { }
