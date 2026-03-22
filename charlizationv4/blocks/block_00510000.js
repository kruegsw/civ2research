// ═══════════════════════════════════════════════════════════════════
// block_00510000.js — Mechanical transpilation of block_00510000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00510000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00510000.c
// ═══════════════════════════════════════════════════════════════════



// ============================================================
// Function: FUN_00511320 @ 0x00511320
// Size: 28 bytes
// ============================================================

// ecx_vtable_get_field4
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407ff0, FUN_00408130, FUN_00408330, FUN_00408460, FUN_00408490, FUN_004085f0 } from './block_00400000.js';
import { FUN_00408650, FUN_004086c0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80 } from './block_00400000.js';
import { FUN_0040ef50, FUN_0040ef70, FUN_0040efd0, FUN_0040f010, FUN_0040f350, FUN_0040f380 } from './block_00400000.js';
import { FUN_0040f3e0, FUN_0040f480, FUN_0040f510, FUN_0040f570, FUN_0040f680, FUN_0040f840 } from './block_00400000.js';
import { FUN_0040f880, FUN_0040fcf0, FUN_0040fd40, FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40 } from './block_00400000.js';
import { FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414ce0, FUN_00414d10, FUN_00414d40, FUN_00414dd0 } from './block_00410000.js';
import { FUN_00417ef0, FUN_00417f70, FUN_00417fa0, FUN_004183d0, FUN_00418740, FUN_00418770 } from './block_00410000.js';
import { FUN_00418910, FUN_004189c0, FUN_00418a00, FUN_00418a30, FUN_00418a70, FUN_00418bf0 } from './block_00410000.js';
import { FUN_00418c70, FUN_00418ce0, FUN_00418d20, FUN_00418d60, FUN_00418d90, FUN_00418dd0 } from './block_00410000.js';
import { FUN_004190a0, FUN_004190d0, FUN_00419100, FUN_00419170, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00419be0, FUN_00419c8b, FUN_00419ed3 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421ca0, FUN_00421d60, FUN_00421da0, FUN_00421dd0, FUN_00421e70 } from './block_00420000.js';
import { FUN_00421ea0, FUN_00421f10, FUN_00426fb0, FUN_00428b0c } from './block_00420000.js';
import { FUN_00432611, FUN_0043c460, FUN_0043c520, FUN_0043c5f0, FUN_0043c690, FUN_0043c6c0 } from './block_00430000.js';
import { FUN_0043c840, FUN_0043c9d0, FUN_0043ce5a } from './block_00430000.js';
import { FUN_004442a0, FUN_004442e0, FUN_00444310, FUN_00447210, FUN_0044c5a0, FUN_0044c730 } from './block_00440000.js';
import { FUN_0044ca60, FUN_0044cba0 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400 } from './block_00450000.js';
import { FUN_004518d0, FUN_00451bf0, FUN_00453c40, FUN_00453c80 } from './block_00450000.js';
import { FUN_004679ab, FUN_00468bb9, FUN_0046ace7, FUN_0046b14d, FUN_0046e020, FUN_0046e287 } from './block_00460000.js';
import { FUN_0046e571, FUN_0046e6a9, FUN_0046e6c8, FUN_0046efd6, FUN_0046f06f } from './block_00460000.js';
import { FUN_004729ab, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484fec } from './block_00480000.js';
import { FUN_004923c0, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497c90, FUN_00497d00 } from './block_00490000.js';
import { FUN_00497d40, FUN_00498159, FUN_00498784, FUN_00498a5c } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a24b1, FUN_004a2534, FUN_004a6980 } from './block_004A0000.js';
import { FUN_004a6cc5, FUN_004aef20, FUN_004af09e, FUN_004af14b, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b7eb6, FUN_004bb540, FUN_004bc480, FUN_004bc8aa, FUN_004bcb9b, FUN_004bcfcf } from './block_004B0000.js';
import { FUN_004bd2a3 } from './block_004B0000.js';
import { FUN_004c4240, FUN_004cc870, FUN_004ccab9, FUN_004ccb6a, FUN_004ccdb6 } from './block_004C0000.js';
import { FUN_004d007e, FUN_004d0208 } from './block_004D0000.js';
import { FUN_004e4ceb, FUN_004eb571, FUN_004eb80a } from './block_004E0000.js';
import { FUN_004f6646 } from './block_004F0000.js';
import { FUN_00521807, FUN_0052181d, FUN_0052182c, FUN_0052263c, FUN_005226fa } from './block_00520000.js';
import { FUN_00548c78 } from './block_00540000.js';
import { FUN_00552112, FUN_005534bc, FUN_0055a567 } from './block_00550000.js';
import { FUN_00564713, FUN_005683c5, FUN_00568861 } from './block_00560000.js';
import { FUN_00573e59 } from './block_00570000.js';
import { FUN_0058878e } from './block_00580000.js';
import { FUN_0059a791, FUN_0059c276, FUN_0059d3b1, FUN_0059d3c9, FUN_0059db08, FUN_0059db65 } from './block_00590000.js';
import { FUN_0059df8a, FUN_0059dfb9, FUN_0059e18b, FUN_0059e472, FUN_0059e783, FUN_0059e7ad } from './block_00590000.js';
import { FUN_0059e8db, FUN_0059e9f3, FUN_0059ea4d, FUN_0059ea99, FUN_0059ec88, FUN_0059edf0 } from './block_00590000.js';
import { FUN_0059f06d, FUN_0059f2a3 } from './block_00590000.js';
import { FUN_005a5f34, FUN_005a632a, FUN_005a97cc, FUN_005a99fc, FUN_005a9abf, FUN_005a9afe } from './block_005A0000.js';
import { FUN_005a9b5d, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb024, FUN_005bb4ae, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bc4a1, FUN_005bcaa7, FUN_005bd630, FUN_005bd65c, FUN_005bd915, FUN_005bf071 } from './block_005B0000.js';
import { FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0333, FUN_005c041f, FUN_005c0593, FUN_005c0cc5, FUN_005c0f57, FUN_005c1167 } from './block_005C0000.js';
import { FUN_005c19ad, FUN_005c5fc4, FUN_005c61b0, FUN_005c64da, FUN_005c656b, FUN_005c6b63 } from './block_005C0000.js';
import { FUN_005c6da8, FUN_005cb6db, FUN_005cde4d, FUN_005cedad, FUN_005cef31, FUN_005cef66 } from './block_005C0000.js';
import { FUN_005d22b7, FUN_005d268e, FUN_005d6a2c, FUN_005d8236, FUN_005dae6b, FUN_005dd010 } from './block_005D0000.js';
import { FUN_005dd1a0, FUN_005dd2e3, FUN_005dd377, FUN_005dd3c2, FUN_005dd3f1, FUN_005dd45d } from './block_005D0000.js';
import { FUN_005dd51d, FUN_005dd561, FUN_005dd64c } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0 } from './block_00600000.js';

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
  FUN_005a97cc(G.DAT_00635c64, param_1, param_2, param_3, param_4);
  return;
}



// ============================================================
// Function: FUN_005113f0 @ 0x005113F0
// Size: 42 bytes
// ============================================================

// draw_3d_rect_wrapper
export function FUN_005113f0(param_1, param_2, param_3) {
  FUN_005a99fc(G.DAT_00635c64, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00511430 @ 0x00511430
// Size: 29 bytes
// ============================================================

// init_text_buffer
export function FUN_00511430() {
  FUN_004af09e(G.DAT_00679640);
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
  FUN_00548c78(G.DAT_00635c64, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  return;
}



// ============================================================
// Function: FUN_00511520 @ 0x00511520
// Size: 41 bytes
// ============================================================

// dialog_string_wrapper
export function FUN_00511520(param_1, param_2, param_3) {
  FUN_004a6cc5(G.DAT_006359d4, param_1, param_2, param_3);
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
  if (in_ECX !== undefined && in_ECX !== 0) {
    // DEVIATION: if (*(in_ECX + 0x1c) !== 0) FUN_005cb6db(*(in_ECX + 0x1c));
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

// seh_epilog_restore
export function FUN_0051164f() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00511690 @ 0x00511690
// Size: 67 bytes
// ============================================================

// scale_by_speed
export function FUN_00511690(param_1) {
  let in_ECX;
  // DEVIATION: in_ECX is register-based (this pointer)
  // if (s32(in_ECX, 0x15d4) !== 2) {
  //   param_1 = (s32(in_ECX, 0x15d4) * param_1) / 2;
  // }
  return param_1;
}



// ============================================================
// Function: FUN_005116f0 @ 0x005116F0
// Size: 33 bytes
// ============================================================

// property_sheet_set_wrapper
export function FUN_005116f0(param_1) {
  FUN_0043ce5a(G.DAT_00679640, param_1);
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
  // DEVIATION: *(in_ECX + 200) = 0 — register-based this pointer
  return in_ECX;
}



// ============================================================
// Function: FUN_005117f0 @ 0x005117F0
// Size: 33 bytes
// ============================================================

// set_ecx_field_2c
export function FUN_005117f0(param_1) {
  let in_ECX;
  // DEVIATION: *(in_ECX + 0x2c) = param_1 — register-based this pointer
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

  if (2 < G.DAT_00655b02) {
    if (param_3 !== 0) {
      for (local_c = 0; local_c < param_3; local_c = local_c + 1) {
        sVar1 = _strlen(G.DAT_0063cc48[local_c * 0x104]);
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
          FUN_005f22d0(local_14, G.DAT_0063cc48[local_c * 0x104]);
          sVar1 = _strlen(G.DAT_0063cc48[local_c * 0x104]);
          local_14 = local_14 + sVar1 + 1;
        }
      }
      if (param_4 !== 0) {
        for (local_c = 0; local_c < param_4; local_c = local_c + 1) {
          // memcpy(local_14, &G.DAT_0063cc30 + local_c * 4, 4)
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
  if (G.DAT_00631130 !== null) {
    G.DAT_00631134[0] = puVar2;
    puVar1 = G.DAT_00631130;
  }
  G.DAT_00631130 = puVar1;
  G.DAT_00631134 = puVar2;
  return;
}



// ============================================================
// Function: FUN_00511acf @ 0x00511ACF
// Size: 94 bytes
// ============================================================

// mp_notification_queue_flush
export function FUN_00511acf() {
  let puVar1;
  while (puVar1 = G.DAT_00631130, G.DAT_00631130 !== null) {
    G.DAT_00631130 = G.DAT_00631130[0];
    operator_delete(puVar1);
  }
  G.DAT_00631134 = 0;
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
  if (((G.DAT_006ad698 === '\0') && (G.DAT_006c91e4 === 0)) &&
     (iVar1 = FUN_00421bb0(), iVar1 - _DAT_006cec80 < 0x4b1)) {
    return;
  }
  G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
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
  piVar1 = G.DAT_00631130;
  FUN_0059db08(0x4000);
  if (piVar1 !== null) {
    _DAT_006ad67c = 1;
    G.DAT_00631130 = piVar1[0];
    if (G.DAT_00631130 === null) {
      G.DAT_00631134 = 0;
    }
    let local_14;
    if ((piVar1[2] !== 0) || (piVar1[3] !== 0)) {
      local_14 = piVar1 + 7; // pointer to payload data after header
    }
    if (piVar1[2] !== 0) {
      for (local_310 = 0; local_310 < piVar1[2]; local_310 = local_310 + 1) {
        FUN_005f22d0(G.DAT_0063cc48[local_310 * 0x104], local_14);
        sVar2 = _strlen(G.DAT_0063cc48[local_310 * 0x104]);
        local_14 = local_14 + sVar2 + 1;
      }
    }
    if (piVar1[3] !== 0) {
      for (local_310 = 0; local_310 < piVar1[3]; local_310 = local_310 + 1) {
        // DEVIATION: FID_conflict__memcpy(&G.DAT_0063cc30 + local_310 * 4, local_14, 4);
        local_14 = local_14 + 1;
      }
    }

    G.DAT_00635a3c = 0x00403c74; // LAB_00403c74
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
      FUN_00410030(s_GLOBALWARMING_00631164, G.DAT_0063fc58, 0);
      break;
    case 4:
      FUN_00410030(s_FEARWARMING_00631174, G.DAT_0063fc58, 0);
      break;
    case 5:
      FUN_00432611();
      break;
    case 6:
      FUN_00410030(s_EAGLEHASLANDED_00631180, G.DAT_0063fc58, 0);
      break;
    case 7:
      FUN_00410030(s_SCENARIOENDS_00631190, G.DAT_00643af8, 0);
      break;
    case 8:
      FUN_00410030(s_SCENARIOEND_006311a0, G.DAT_00643af8, 0);
      break;
    case 9:
      uVar4 = FUN_00493ba6(G.DAT_006d1da0);
      FUN_0040ff60(0, uVar4);
      uVar4 = FUN_00493b10(G.DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_PLANRETIRE_006311ac, G.DAT_00643af8, 0);
      break;
    case 10:
      uVar4 = FUN_00493b10(G.DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_DORETIRE_006311b8, G.DAT_00643af8, 0);
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
      FUN_00410030(s_DESTROYED_006311f0, G.DAT_00643798[piVar1[4] * 0x3c], 0);
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
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, piVar1[5]);
      FUN_0040bc80(0);
      break;
    case 0x13:
      FUN_0043c9d0(s_SWITCHWONDER_0063122c);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, piVar1[5]);
      FUN_0040bc80(0);
      break;
    case 0x14:
      FUN_0043c9d0(s_ABANDONWONDER_0063123c);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
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
      uVar4 = FUN_00410030(s_CANESCAPE_00631260, G.DAT_0063fc58, 0);
      FUN_0046b14d(0x77, G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x18:
      FUN_00414dd0(s_ESCAPE_0063126c, piVar1[4]);
      break;
    case 0x19:
      FUN_0043c9d0(s_CAPTUREWONDER_00631274);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x1a:
      FUN_0043c9d0(s_LOSTWONDER_00631284);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
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
      FUN_00410030(s_INCORRUPTIBLE_006312e0, G.DAT_006469e0, 0);
      break;
    case 0x22:
      FUN_004442e0(s_DESERTED_006312f0, piVar1[4]);
      break;
    case 0x23:
      uVar4 = FUN_004442e0(s_DESERT_006312fc, piVar1[5]);
      FUN_0046b14d(0x7b, G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x24:
      uVar4 = FUN_004442e0(s_DESERT2_00631304, piVar1[5]);
      FUN_0046b14d(0x7b, G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
                   uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x25:
      FUN_004442e0(s_BLEWITUP_0063130c, piVar1[4]);
      break;
    case 0x26:
      FUN_00410030(s_BOND007_00631318, G.DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x27:
      FUN_00410030(G.DAT_00631320, G.DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x28:
      FUN_00410030(s_BONDGLORY_00631328, G.DAT_00641848[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x29:
      FUN_004cc870(s_USEWEAPONS_00631334, 0x3e, 8);
      break;
    case 0x2a:
      FUN_004cc870(G.DAT_00631340, 0x11, 8);
      break;
    case 0x2b:
      FUN_00410030(s_CHANGED_00631344, G.DAT_00646878[piVar1[4] * 0x3c], piVar1[5]);
      break;
    case 0x2c:
      FUN_00410030(s_OVERTHROWN_0063134c, G.DAT_00646878[piVar1[4] * 0x3c], piVar1[5]);
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
                   G.DAT_00648018[((G.DAT_00655b91 !== '\0' ? 1 : 0) - 1 & 0xffff7c80)], 0);
      break;
    case 0x39:
      FUN_00410030(s_ALLYHELPS_006313ec,
                   G.DAT_00648018[((G.DAT_00655b91 !== '\0' ? 1 : 0) - 1 & 0xffff7c80)], 0);
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
      // DEVIATION: w16(G.DAT_0064ca82, piVar1[4] * 2 + G.DAT_006d1da0 * 0x594, G.DAT_00655af8);
      // DEVIATION: w16(G.DAT_0064ca82, piVar1[4] * 0x594 + G.DAT_006d1da0 * 2, G.DAT_00655af8);
      if (G.DAT_0067a8c0 === -1) {
        G.DAT_0067a8c0 = 0xfffffffe;
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
        FUN_0040ff60(0, G.DAT_00679640);
        uVar4 = FUN_00493b10(G.DAT_006d1da0);
        FUN_0040ff60(1, uVar4);
        uVar4 = FUN_00493c7d(G.DAT_006d1da0);
        FUN_0040ff60(2, uVar4);
        if (G.DAT_0064c6e0[piVar1[4] * 0x594 + G.DAT_006d1da0] === '\0') {
          local_330 = 0;
        } else {
          local_330 = FUN_004679ab(G.DAT_0064c6e0[piVar1[4] * 0x594 + G.DAT_006d1da0]);
        }
        uVar4 = FUN_00428b0c(G.DAT_0064b9c0[local_330 * 4]);
        FUN_0040ff60(3, uVar4);
        G.DAT_00635a3c = 0x00403d0f; // LAB_00403d0f
        iVar3 = FUN_00410030(s_PARLEYREQUEST_00631424, G.DAT_0063fc58, 0);
        if (G.DAT_006ad698 === '\0') {
          if (G.DAT_006c91e4 === 0) {
            FUN_0046b14d(0x80,
              G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
              iVar3, 0, 0, 0, 0, 0, 0, 0);
          }
          if (G.DAT_006c91e4 === 0) {
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
            G.DAT_006c91e4 = 0;
            uVar4 = FUN_00493c7d(piVar1[4]);
            FUN_0040ff60(0, uVar4);
            G.DAT_00635a3c = 0x00403c74; // LAB_00403c74
            FUN_00410030(s_PARLEYCANCEL_00631434, G.DAT_0063fc58, 0);
          }
          G.DAT_0067a8c0 = -1;
          G.DAT_00626a2c = 0;
        } else {
          FUN_0046b14d(0x80,
            G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
            2, 0, 0, 0, 0, 0, 0, 0);
          G.DAT_0067a8c0 = -1;
          G.DAT_00626a2c = 0;
        }
      } else {
        FUN_0046b14d(0x80,
          G.DAT_006ad30c[G.DAT_006ad558[piVar1[4] * 4] * 0x54],
          2, 0, 0, 0, 0, 0, 0, 0);
      }
      break;
    case 0x3e:
      FUN_004442a0(s_UPGRADE_00631444, piVar1[4], (piVar1[5] === 0 ? 1 : 0) - 1 & 8);
      break;
    case 0x3f:
      if (G.DAT_006ad30c[G.DAT_006ad558[G.DAT_006d1da0 * 4] * 0x54] !== piVar1[4]) {
        FUN_00410030(s_NEWPLAYER_0063144c, G.DAT_0063fc58, 0);
      }
      break;
    case 0x40:
      FUN_0040ffa0(s_NEWTURNTIMERCLIENT_00631458, 0x2000000);
      uVar4 = FUN_00428b0c(G.DAT_00628420[0xd50]);
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(G.DAT_00628420[0xd54]);
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0x28);
      FUN_0046b14d(0x56, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x41:
      FUN_00410030(s_NEWTURNTIMERNO_0063146c, G.DAT_0063fc58, 0);
      break;
    case 0x42:
      FUN_00410030(s_NEWTURNTIMERYES_0063147c, G.DAT_0063fc58, 0);
      break;
    case 0x43:
      FUN_0040ffa0(s_PMCHANGECLIENT_0063148c, 0x2000000);
      uVar4 = FUN_00428b0c(G.DAT_00628420[0xd50]);
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(G.DAT_00628420[0xd54]);
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0);
      FUN_0046b14d(0x57, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x44:
      FUN_00410030(s_PMCHANGENO_0063149c, G.DAT_0063fc58, 0);
      break;
    case 0x45:
      FUN_00410030(s_PMCHANGEYES_006314a8, G.DAT_0063fc58, 0);
      break;
    case 0x46:
      FUN_0046e020(0x23, 1, 0, 0);
      FUN_004eb571(s_MANHATTAN_006314b4, piVar1[4], 1, G.DAT_00645fe8);
      break;
    case 0x47:
      FUN_0043c9d0(s_BUILT2_006314c0);
      if (piVar1[4] < 0) {
        local_338 = G.DAT_00645160[piVar1[5] * 0x3c];
      } else {
        local_338 = G.DAT_00645a84[piVar1[4] * 0x3c];
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
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4b:
      FUN_0043c9d0(s_STILLWONDER1_006314f0);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4c:
      FUN_0043c9d0(s_STILLWONDER2_00631500);
      FUN_0059ec88(G.DAT_00645160[piVar1[4] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4d:
      FUN_0043c9d0(s_ENDWONDER_00631510);
      FUN_0059ec88(G.DAT_00646cb8[
        s8(G.DAT_0062768c[piVar1[4] * 0x10]) * 0xf0 +
        s8(G.DAT_0062768d[piVar1[4] * 0x10]) * 0x3c], 0, 0);
      FUN_0059ec88(G.DAT_00645160[piVar1[5] * 0x3c], 0, 0);
      EnableStackedTabs_00511850(local_308, 8);
      FUN_0040bc80(0);
      break;
    case 0x4e:
      FUN_004442e0(s_BARBARIANSLAND_0063151c, piVar1[4]);
      break;
    case 0x4f:
      FUN_00421dd0();
      for (local_310 = 0; local_310 < piVar1[2]; local_310 = local_310 + 1) {
        FUN_0059e18b(G.DAT_0063cc48[local_310 * 0x104], 0xffffffff, 0xffffffff, 0xffffffff, 0);
      }
      FUN_0040bc80(0);
      break;
    case 0x50:
      FUN_00410030(s_WARENDS_0063152c, G.DAT_00647748, 0);
      break;
    case 0x51:
      FUN_004442e0(s_MILITARYAID1_00631534, piVar1[4]);
      break;
    case 0x52:
      FUN_004442e0(s_MILITARYAID2_00631544, piVar1[4]);
      break;
    case 0x53:
      FUN_00410030(s_LOSTCLIENT_00631554, G.DAT_0063fc58, 0);
      break;
    case 0x54:
      FUN_004c4240(s_GOLDENAGE_00631560, 0x3c, 8);
      break;
    case 0x55:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYEMBASSY_0063156c, G.DAT_0063fc58, 0);
      break;
    case 0x56:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYINVESTIGATE_0063157c, G.DAT_0063fc58, 0);
      break;
    case 0x57:
      iVar3 = FUN_004bd9f0(piVar1[4], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00410030(s_STEAL_00631590, G.DAT_0063fc58, 0);
      break;
    case 0x58:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_FOILEDAGAIN_00631598, G.DAT_0063fc58, 0);
      break;
    case 0x59:
      iVar3 = FUN_004bd9f0(piVar1[5], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00410030(s_SABOTAGEONE_006315d8, G.DAT_00645160[piVar1[4] * 0x3c], 8);
      break;
    case 0x5a:
      iVar3 = FUN_004bd9f0(piVar1[4], 0x23);
      if (iVar3 === 0) { FUN_0046e020(0x44, 1, 0, 0); }
      else { FUN_0046e020(0x27, 1, 0, 0); }
      FUN_00421ea0(s_SABOTAGETWO_006315e4);
      break;
    case 0x5b:
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_WATERSUPPLY_006315a4, G.DAT_0063fc58, 0);
      break;
    case 0x5c:
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE_006315b0);
      FUN_004cc870(G.DAT_00679640, 0x3e, 8);
      break;
    case 0x5d:
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE2_006315bc);
      FUN_004cc870(G.DAT_00679640, 0x3e, 8);
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
      if ((G.DAT_0067a8bc === 0) && (piVar1[4] === G.DAT_0067a8c0)) {
        G.DAT_00631138 = 1;
        FUN_0040ffa0(s_REVEALUNITORIGINS_00631620, 0x2000000);
        uVar4 = FUN_00428b0c(G.DAT_00628420[0xdd4]);
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(G.DAT_00628420[0xdd8]);
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if (local_22c === 1) {
          G.DAT_0067ab65 = '\x01';
          if (G.DAT_0067a994 === 2) {
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
            G.DAT_006ad30c[G.DAT_006ad558[G.DAT_0067a8c0 * 4] * 0x54],
            G.DAT_006d1da0, G.DAT_0067ab65, 0, 0, 0, 0, 0, 0);
          if (((G.DAT_0067a994 === 0xe) && (G.DAT_0067a9b8 === 2)) ||
             ((G.DAT_0067a994 === 0xf && (G.DAT_0067a9bc === 2)))) {
            FUN_0040f380();
            FUN_0043c5f0();
            G.DAT_0067ab65 = '\x01';
            FUN_00453c80();
            FUN_00453c80();
            FUN_00468bb9(0);
          }
        }
        G.DAT_00631138 = 0;
      }
      break;
    case 0x65:
      if ((G.DAT_0067a8bc === 0) && (piVar1[4] === G.DAT_0067a8c0)) {
        G.DAT_0063113c = 1;
        FUN_0040ffa0(s_REVEALCITYINFO_00631634, 0x2000000);
        uVar4 = FUN_00428b0c(G.DAT_00628420[0xddc]);
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(G.DAT_00628420[0xdd8]);
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if (local_22c === 1) {
          G.DAT_0067ab66 = '\x01';
          if (G.DAT_0067a994 === 2) {
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
            G.DAT_006ad30c[G.DAT_006ad558[G.DAT_0067a8c0 * 4] * 0x54],
            G.DAT_006d1da0, G.DAT_0067ab66, 0, 0, 0, 0, 0, 0);
          if (((G.DAT_0067a994 === 0xe) && (G.DAT_0067a9b8 === 3)) ||
             ((G.DAT_0067a994 === 0xf && (G.DAT_0067a9bc === 3)))) {
            FUN_0040f380();
            FUN_0043c5f0();
            FUN_0058878e(0);
          }
        }
        G.DAT_0063113c = 0;
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

// SEH epilog (no-op in JS)
export function FUN_005139b3() {
  return;
}



// ============================================================
// Function: FUN_00514220 @ 0x00514220
// Size: 52 bytes
// ============================================================

// net_msg_queue_init
export function FUN_00514220() {
  let in_ECX;
  // DEVIATION: _memset(in_ECX, 0, 24000) — register-based this pointer
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
  // DEVIATION: in_ECX is register-based this pointer for message queue object
  for (local_8 = 0; local_8 < 2000; local_8 = local_8 + 1) {
    // DEVIATION: if (*(in_ECX + 4 + local_8 * 0xc) !== 0) {
    //   operator_delete(*(in_ECX + 4 + local_8 * 0xc));
    //   *(in_ECX + 4 + local_8 * 0xc) = 0;
    // }
    // *(in_ECX + 8 + local_8 * 0xc) = 0;
    // *(in_ECX + local_8 * 0xc) = 0;
  }
  // *(in_ECX + 24000) = 400;
  // *(in_ECX + 0x5dc4) = 400;
  // *(in_ECX + 0x5dc8) = 0;
  // *(in_ECX + 0x5dcc) = 0;
  // *(in_ECX + 0x5dd0) = 0;
  // *(in_ECX + 0x5dd4) = 0;
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
  // DEVIATION: in_ECX is register-based this pointer for message queue object
  // All memory accesses below use in_ECX + offset pattern

  if (((G.DAT_00655b02 === 5) || (G.DAT_00655b02 === 6)) && (param_1 !== 0) &&
     (param_1 !== 0xff)) {
    if (G.DAT_006ad2f7 === '\0') {
      param_1 = 0;
    } else {
      param_1 = 1;
    }
  }
  // DEVIATION: param_2 is pointer-based struct access *(param_2 + 4), *(param_2 + 8)
  let msgType = 0; // *(int *)((int)param_2 + 4)
  if (msgType === 0x2b) {
    _DAT_006c908c = _DAT_006c908c + 1;
    FUN_0046b14d(0x2c, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  } else if (msgType === 0x2c) {
    G.DAT_006c9090 = G.DAT_006c9090 + 1;
  } else {
    iVar1 = FUN_0051435f(msgType);
    if (iVar1 === 0) {
      // Primary queue enqueue
      // DEVIATION: Circular buffer logic using in_ECX + offset for head/tail/count
      // if queue full, log message lost and return 0
      // otherwise allocate, memcpy, advance tail
      // *(in_ECX + 0x5dc8) += 1; // count
      // if (G.DAT_006ad690 < count) G.DAT_006ad690 = count;
    } else {
      // Alpha queue enqueue
      // DEVIATION: Same circular buffer logic for alpha queue at in_ECX + 0x5dcc..0x5dd4
      // if queue full, log message lost and return 0
      // otherwise allocate, memcpy, advance tail
      // *(in_ECX + 0x5dd4) += 1; // alpha count
      // if (G.DAT_006ad694 < alphaCount) G.DAT_006ad694 = alphaCount;
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
  // DEVIATION: in_ECX is register-based this pointer for message queue object
  // param_1, param_2, param_3 are output pointers

  // Alpha queue has priority — dequeue from alpha first if non-empty
  // if (*(in_ECX + 0x5dd4) !== 0) {
  //   // Dequeue from alpha queue (head at 0x5dcc, count at 0x5dd4)
  //   *param_1 = *(in_ECX + *(in_ECX + 0x5dcc) * 0xc);
  //   *(in_ECX + *(in_ECX + 0x5dcc) * 0xc) = 0;
  //   *param_2 = *(in_ECX + 4 + *(in_ECX + 0x5dcc) * 0xc);
  //   *(in_ECX + 4 + *(in_ECX + 0x5dcc) * 0xc) = 0;
  //   *param_3 = *(in_ECX + 8 + *(in_ECX + 0x5dcc) * 0xc);
  //   *(in_ECX + 8 + *(in_ECX + 0x5dcc) * 0xc) = 0;
  //   *(in_ECX + 0x5dcc) = (*(in_ECX + 0x5dcc) + 1) % 400;
  //   *(in_ECX + 0x5dd4) = *(in_ECX + 0x5dd4) - 1;
  //   uVar1 = 1;
  // } else {
  //   if ((param_4 === 0) && (*(in_ECX + 0x5dc8) !== 0)) {
  //     // Dequeue from primary queue (head at 24000, count at 0x5dc8)
  //     *param_1 = *(in_ECX + *(in_ECX + 24000) * 0xc);
  //     ... advance head = (head + 1) % 2000; if (head === 0) head = 400;
  //     *(in_ECX + 0x5dc8) -= 1;
  //     uVar1 = 1;
  //   } else {
  //     uVar1 = 0;
  //   }
  // }
  uVar1 = 0;
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

// register_atexit
export function FUN_00514e44() {
  // _atexit(FUN_00514e61) — no-op in JS
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

// SEH epilog (no-op)
export function FUN_00514f08() {
  return;
}



// ============================================================
// Function: FUN_00514f16 @ 0x00514F16
// Size: 295 bytes
// ============================================================

// wonders_council_ctor
export function FUN_00514f16() {
  let in_ECX;
  // SEH setup, MFC object construction
  // Initializes CPropertySheet, CString, various UI components
  G.DAT_00631a98 = in_ECX;
  // SetRect, thunk calls...
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
  G.DAT_00631a98 = 0;
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

// SEH epilog (no-op)
export function FUN_005151e6() { return; }



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
  // Loads civ2_mk.dll, sets up bitmaps and rect regions for wonder council
  // See C source for full detail
  return 1; // or 0 on failure
}



// ============================================================
// Function: FUN_00515516 @ 0x00515516
// Size: 1122 bytes
// ============================================================

// wonders_council_animate_play
export function FUN_00515516() {
  let in_ECX;
  // Animation loop with timeGetTime, sound, text rendering
  // See C source for full detail
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

// SEH epilog (no-op)
export function FUN_0051598b() { return; }



// ============================================================
// Function: FUN_00515999 @ 0x00515999
// Size: 636 bytes
// ============================================================

// wonders_council_render_advisor
export function FUN_00515999(param_1) {
  let in_ECX;
  // Renders advisor text with shadow effect, OffsetRect calls
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_00515c15 @ 0x00515C15
// Size: 385 bytes
// ============================================================

// wonders_council_setup_advisor_frame
export function FUN_00515c15(param_1) {
  let in_ECX;
  // SEH setup, bitmap loading, rect setup for advisor frame
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
// SEH epilog (no-op)
export function FUN_00515db8() { return; }



// ============================================================
// Function: FUN_00515dc8 @ 0x00515DC8
// Size: 372 bytes
// ============================================================

// wonders_council_scroll_text
export function FUN_00515dc8(param_1) {
  let in_ECX;
  // Scrolls text region by param_1 pixels, OffsetRect
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_00515f3c @ 0x00515F3C
// Size: 201 bytes
// ============================================================

// wonders_council_scroll_out_animation
export function FUN_00515f3c() {
  let in_ECX;
  // Scroll-out animation loop with timeGetTime
  return;
}



// ============================================================
// Function: FUN_00516005 @ 0x00516005
// Size: 61 bytes
// ============================================================

// wonders_council_scroll_up_loop
export function FUN_00516005() {
  let in_ECX;
  // Scrolls upward until position reached
  return;
}



// ============================================================
// Function: FUN_00516042 @ 0x00516042
// Size: 33 bytes
// ============================================================

// invalidate_council_cache
export function FUN_00516042() {
  CRichEditDoc_InvalidateObjectCache(G.DAT_00631a98 + 0x534);
  return;
}



// ============================================================
// Function: FUN_00516063 @ 0x00516063
// Size: 83 bytes
// ============================================================

// invalidate_council_on_range
export function FUN_00516063(param_1) {
  if ((0xcf < param_1) && (param_1 < 0xd3)) {
    CRichEditDoc_InvalidateObjectCache(G.DAT_00631a98 + 0x534);
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
  G.DAT_00631ad0 = 1;
  FUN_0051661a();
  FUN_0046e6a9();
  iVar1 = FUN_00516947(param_1, param_2);
  if (iVar1 !== 0) {
    FUN_00516fd4();
  }
  FUN_0046e6c8();
  G.DAT_00631ad0 = 0;
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
// SEH epilog (no-op)
export function FUN_0051660c() { return; }



// ============================================================
// Function: FUN_0051661a @ 0x0051661A
// Size: 293 bytes
// ============================================================

// advisors_council_ctor
export function FUN_0051661a() {
  let in_ECX;
  // SEH setup, MFC construction chain (CPropertySheet, CString, etc.)
  G.DAT_00631acc = in_ECX;
  return in_ECX;
}



// ============================================================
// Function: FUN_005167d9 @ 0x005167D9
// Size: 198 bytes
// ============================================================

// advisors_council_dtor
export function FUN_005167d9() {
  let in_ECX;
  G.DAT_00631acc = 0;
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
export function FUN_00516939() { return; } // SEH epilog



// ============================================================
// Function: FUN_00516947 @ 0x00516947
// Size: 1672 bytes
// ============================================================

// advisors_council_init_video
export function FUN_00516947(param_1, param_2) {
  let iVar3;
  let iVar4;
  let in_ECX;
  let local_90;
  let local_8c;
  let local_8;
  // Initializes video resources for council advisors
  // Handles cheat mode council, loads AVI files
  // See C source for full detail
  return 1; // or 0 on failure
}



// ============================================================
// Function: FUN_00516fd4 @ 0x00516FD4
// Size: 388 bytes
// ============================================================

// advisors_council_play_video
export function FUN_00516fd4() {
  let in_ECX;
  // Plays advisor video, renders frames, handles anarchy mode
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_00517158 @ 0x00517158
// Size: 1307 bytes
// ============================================================

// advisors_council_draw_frame
export function FUN_00517158() {
  let in_ECX;
  // Draws council frame border, advisor panels, title text
  // Extensive use of SetRect, InflateRect, etc.
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_00517673 @ 0x00517673
// Size: 816 bytes
// ============================================================

// advisors_council_create_buttons
export function FUN_00517673() {
  let in_ECX;
  // Creates 5 advisor buttons plus a Done button
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_005179a3 @ 0x005179A3
// Size: 907 bytes
// ============================================================

// advisors_council_parse_script
export function FUN_005179a3(param_1) {
  let in_ECX;
  let local_1c;
  let local_18;
  let local_10 = 0;
  let local_8 = 0;
  // Parses advisor script file, handles M/S/T/F/A/R/E commands
  // See C source for full detail
  return local_8;
}



// ============================================================
// Function: FUN_00517dd3 @ 0x00517DD3
// Size: 529 bytes
// ============================================================

// advisors_council_render_text
export function FUN_00517dd3(param_1) {
  let in_ECX;
  // Renders advisor speech text with shadow effect
  // See C source for full detail
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
export function FUN_00517ff7() { return; } // SEH epilog



// ============================================================
// Function: FUN_00518007 @ 0x00518007
// Size: 420 bytes
// ============================================================

// advisors_council_play_all_scripts
export function FUN_00518007() {
  let in_ECX;
  let local_98;
  // SEH setup, plays advisor scripts for all 5 advisors or anarchy mode
  FUN_005181ab();
  FUN_005181b4();
  FUN_005181ca();
  return;
}

export function FUN_005181ab() { FUN_005cde4d(); return; }
export function FUN_005181b4() { FUN_005bd915(); return; }
export function FUN_005181ca() { return; } // SEH epilog



// ============================================================
// Function: FUN_005181d8 @ 0x005181D8
// Size: 362 bytes
// ============================================================

// advisors_council_handle_button_click
export function FUN_005181d8(param_1) {
  let iVar1;
  let iVar2;
  iVar1 = G.DAT_00631acc;
  _DAT_00631ac8 = 1;
  // Handles advisor button click, plays corresponding video/script
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_00518342 @ 0x00518342
// Size: 80 bytes
// ============================================================

// advisors_council_set_video_position
export function FUN_00518342(param_1) {
  if (param_1 < 5) {
    FUN_00518e80((G.DAT_0063359c + 0x5a) * param_1 + G.DAT_0063359c + 1, G.DAT_00633598 + 1);
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
  iVar1 = G.DAT_00631acc;
  _DAT_00631ac8 = 1;
  // Auto-advances council video playback
  // See C source for full detail
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
  if (G.DAT_00631acc !== 0) {
    // local_8 = *(G.DAT_00631acc + 0xe54);
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
  // FUN_005bc4a1(*(in_ECX + 8), param_1, param_2);
  return;
}



// ============================================================
// Function: FUN_00518ec0 @ 0x00518EC0
// Size: 41 bytes
// ============================================================

// dialog_get_number_input
export function FUN_00518ec0(param_1, param_2, param_3) {
  FUN_0051d75d(G.DAT_006359d4, param_1, param_2, param_3);
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
  // Initializes cheat menu scrollable list
  // Sets up head/tail, copies items, configures scrollbar
  // See C source for full detail
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
  if (G.DAT_00631b78 !== 0) {
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
  G.DAT_00631b78 = 1;
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
  // Loads terrain names and attributes from G.DAT_00627cc0 table into editor arrays
  for (local_8 = 0; local_8 < 0x21; local_8 = local_8 + 1) {
    _Count = 0x28;
    _Source = FUN_00428b0c(G.DAT_00627cc4[local_8 * 0x18]);
    // _strncpy(G.DAT_006a1d88 + local_8 * 0x28, _Source, _Count);
    // Copy terrain attributes...
  }
  return;
}



// ============================================================
// Function: FUN_005193ed @ 0x005193ED
// Size: 471 bytes
// ============================================================

// terrain_editor_save_terrain_data
export function FUN_005193ed() {
  let local_c;
  let local_8;
  // Saves modified terrain data back from editor arrays to game tables
  for (local_8 = 0; local_8 < 0x21; local_8 = local_8 + 1) {
    // Copy terrain names and attributes back...
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
  // Updates edit controls with terrain data values
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_005197af @ 0x005197AF
// Size: 496 bytes
// ============================================================

// terrain_editor_read_controls
export function FUN_005197af() {
  let iVar1;
  let local_18;
  let local_14 = 0;
  let local_10 = '';
  let local_8;
  // Reads values from terrain editor controls back into data arrays
  // Returns count of values that were clamped
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
    FUN_005f22e0(G.DAT_00679640, G.DAT_00631cd4[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  } else if (param_1 === -2) {
    FUN_005f22e0(G.DAT_00679640, G.DAT_00631ce0[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  } else if (param_1 < 0xb) {
    FUN_005f22e0(G.DAT_00679640, G.DAT_00627cc0[param_1 * 0x18]);
    if (param_2 !== 0) {
      FUN_005f22e0(G.DAT_00679640, G.DAT_00631cec);
    }
  } else {
    FUN_005f22e0(G.DAT_00679640, G.DAT_00631cf0[((param_2 !== 0 ? 1 : 0) - 1) & 8]);
  }
  return;
}



// ============================================================
// Function: FUN_00519ab0 @ 0x00519AB0
// Size: 695 bytes
// ============================================================

// terrain_editor_write_to_file
export function FUN_00519ab0(param_1) {
  // Writes terrain data to a file in formatted text
  // See C source for full detail
  return 1;
}



// ============================================================
// Function: show_messagebox_9D67 @ 0x00519D67
// Size: 269 bytes
// ============================================================

// terrain_editor_apply_changes
export function show_messagebox_9D67() {
  let iVar1;
  iVar1 = FUN_005197af();
  if (iVar1 === 0) {
    FUN_005193ed();
    // Apply terrain changes, write RULES file, update display
  } else {
    FUN_0051961e();
    FUN_005199a9();
    // Show notice about clamped values
  }
  return;
}



// ============================================================
// Function: FUN_00519e74 @ 0x00519E74
// Size: 881 bytes
// ============================================================

// terrain_editor_rename_terrain
export function FUN_00519e74() {
  let local_18;
  // Dialog to rename a terrain type, then update all references
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_0051a1e5 @ 0x0051A1E5
// Size: 95 bytes
// ============================================================

// terrain_editor_show_help
export function FUN_0051a1e5() {
  let local_8;
  if (G.DAT_006a4f88 === 0) { local_8 = 0; }
  else { local_8 = G.DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_8);
  FUN_004190d0(G.DAT_00631d70, s_TERRAIN_00631d68);
  FUN_0059d3c9(0);
  return;
}



// ============================================================
// Function: FUN_0051a244 @ 0x0051A244
// Size: 40 bytes
// ============================================================

// terrain_editor_close
export function FUN_0051a244() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006a4f88 + 0x48);
  return;
}



// ============================================================
// Function: FUN_0051a26c @ 0x0051A26C
// Size: 1036 bytes
// ============================================================

// terrain_editor_select_resource
export function FUN_0051a26c() {
  let iVar1;
  // Shows dialog to select terrain resource variant (forest/hills/mountains/etc.)
  // See C source for full detail
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a678 @ 0x0051A678
// Size: 287 bytes
// ============================================================

// terrain_editor_select_river
export function FUN_0051a678() {
  // Shows dialog to select river variant
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a797 @ 0x0051A797
// Size: 288 bytes
// ============================================================

// terrain_editor_select_coast
export function FUN_0051a797() {
  // Shows dialog to select coast variant
  FUN_005199a9();
  return;
}



// ============================================================
// Function: FUN_0051a8b7 @ 0x0051A8B7
// Size: 407 bytes
// ============================================================

// terrain_editor_select_misc
export function FUN_0051a8b7() {
  // Shows dialog to select misc terrain variant
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
  // Updates terrain editor display with proper control states
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_0051acdc @ 0x0051ACDC
// Size: 289 bytes
// ============================================================

// terrain_editor_handle_control_change
export function FUN_0051acdc(param_1) {
  let iVar1;
  if (param_1 === 0xc9) {
    iVar1 = FUN_005197af();
    if (iVar1 === 0) {
      // Apply and refresh
      FUN_005195f1(FUN_00418d60());
      FUN_0051961e();
      FUN_0051aa4e();
      FUN_005199a9();
    } else {
      // Revert and show notice
      FUN_0051961e();
      FUN_005199a9();
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
  let in_ECX;
  let local_18;
  // Creates dropdown controls for terrain editor
  // Handles 6 different dropdown types (names, colors, resources, etc.)
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_0051b1c2 @ 0x0051B1C2
// Size: 244 bytes
// ============================================================

// terrain_editor_create_edit_control
export function FUN_0051b1c2(param_1) {
  let in_ECX;
  // Creates a text edit control for terrain editor
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_0051b2b6 @ 0x0051B2B6
// Size: 2283 bytes
// ============================================================

// terrain_editor_full_repaint
export function FUN_0051b2b6() {
  let in_ECX;
  // Full repaint of terrain editor — background, terrain tile preview,
  // labels, values, improvement icons
  // See C source for full detail
  return;
}



// ============================================================
// Function: FUN_0051bba1 @ 0x0051BBA1
// Size: 2646 bytes
// ============================================================

// terrain_editor_main_dialog
export function FUN_0051bba1() {
  let in_ECX;
  // Main terrain editor dialog — creates window, buttons, controls,
  // runs event loop until closed
  // SEH setup omitted
  FUN_005c64da();
  G.DAT_006a1d7c = 1;
  G.DAT_006a4f88 = in_ECX;
  // ... extensive UI setup ...
  FUN_0051c611();
  FUN_0051c627();
  return;
}

export function FUN_0051c611() { FUN_005c656b(); return; }
export function FUN_0051c627() { return; } // SEH epilog



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
export function FUN_0051c6a4() { return; } // SEH epilog



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
        FUN_0059ea4d(local_14, 1 << (local_14 & 0x1f) & G.DAT_00631ed8);
      }
    }
    FUN_0040bc80(0);
    G.DAT_00631edc = local_22c;
    if ((local_2cc & 4) !== 0) {
      G.DAT_00631ed8 = 0;
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        iVar1 = FUN_0059e9f3(local_14);
        if (iVar1 !== 0) {
          G.DAT_00631ed8 = G.DAT_00631ed8 | 1 << (local_14 & 0x1f);
        }
      }
    }
  }
  FUN_0051d53f();
  FUN_0051d555();
  return;
}

export function FUN_0051d53f() { FUN_0059df8a(); return; }
export function FUN_0051d555() { return; } // SEH epilog



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
  G.DAT_00631edc = local_228;
  FUN_0051d616();
  FUN_0051d62c();
  return;
}

export function FUN_0051d616() { FUN_0059df8a(); return; }
export function FUN_0051d62c() { return; } // SEH epilog



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
export function FUN_0051d74e() { return; } // SEH epilog



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
  G.DAT_00631ed8 = 0;
  return;
}



// ============================================================
// Function: FUN_0051d7d6 @ 0x0051D7D6
// Size: 65 bytes
// ============================================================

// set_checkbox_flag
export function FUN_0051d7d6(param_1, param_2) {
  if (param_2 === 0) {
    G.DAT_00631ed8 = G.DAT_00631ed8 & ~(1 << (param_1 & 0x1f));
  } else {
    G.DAT_00631ed8 = G.DAT_00631ed8 | 1 << (param_1 & 0x1f);
  }
  return;
}



// ============================================================
// Function: FUN_0051d817 @ 0x0051D817
// Size: 32 bytes
// ============================================================

// get_checkbox_flag
export function FUN_0051d817(param_1) {
  return 1 << (param_1 & 0x1f) & G.DAT_00631ed8;
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
  // SEH setup
  FUN_0059db08(0x4000);
  // Reads CIV.INI settings: NetTimeOut, Adapter, MaxPlayers
  // Initializes multiplayer game type selection dialog
  // Handles TCP/IP, IPX, modem, and PBEM game types
  // See C source for full detail
  FUN_0051dd72();
  FUN_0051dd88();
  return;
}

export function FUN_0051dd72() { FUN_0059df8a(); return; }
export function FUN_0051dd88() { return; } // SEH epilog



// ============================================================
// Function: FUN_0051dd97 @ 0x0051DD97
// Size: 3152 bytes
// ============================================================

// new_game_setup_dialogs
export function FUN_0051dd97(param_1, param_2) {
  let iVar2;
  let local_14;
  let local_18;
  // SEH setup
  FUN_0059db08(0x4000);
  G.DAT_00631ee4 = 0;
  G.DAT_00631ee8 = 0;
  // Difficulty, enemies, barbarity, rules, advanced options dialogs
  // Handles randomized settings for AI opponents
  // See C source for full detail (3152 bytes of dialog flow)
  FUN_0051e9e7();
  FUN_0051e9fd();
  return;
}

export function FUN_0051e9e7() { FUN_0059df8a(); return; }
export function FUN_0051e9fd() { return; } // SEH epilog



// ============================================================
// Function: FUN_0051ea0c @ 0x0051EA0C
// Size: 130 bytes
// ============================================================

// mp_lobby_timer_tick
export function FUN_0051ea0c() {
  let iVar1;
  FUN_00421bb0();
  FUN_0047e94e(1, 0);
  if ((G.DAT_006c9088 !== 0) || (G.DAT_006c900c !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
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
  // SEH setup
  FUN_0059db08(0x2000);
  local_18 = G.DAT_006665d0;
  local_14 = G.DAT_00654b70;
  // Game timer dialog — select from presets or custom time
  // Handles server-side timer negotiation for multiplayer
  // See C source for full detail
  FUN_0051f0f5();
  FUN_0051f10b();
  return;
}

export function FUN_0051f0f5() { FUN_0059df8a(); return; }
export function FUN_0051f10b() { return; } // SEH epilog



// ============================================================
// Function: FUN_0051f11a @ 0x0051F11A
// Size: 100 bytes
// ============================================================

// mp_check_network_status
export function FUN_0051f11a() {
  FUN_00421bb0();
  FUN_0047e94e(1, 0);
  if ((G.DAT_006c9088 !== 0) || (G.DAT_006c900c !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
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
  // SEH setup
  FUN_0059db08(0x2000);
  // Massive multiplayer tribe selection dialog
  // Handles gender, tribe name, leader name, city style, email
  // Server/client coordination for tribe claiming
  // See C source for full detail (9815 bytes)
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
function FUN_00421d60_v2() { }
function FUN_00421dd0_v2() { }
function FUN_00443c80() { }
function show_messagebox_CF2D() { return 0; }


// ═══════════════════════════════════════════════════════════════════
// DAT_ globals — Referenced but not defined in this block.
// These are stubs; actual values live in mem.js or other blocks.
// ═══════════════════════════════════════════════════════════════════

let _DAT_006cec80 = 0;
let _DAT_006ad67c = 0;
let _DAT_006c908c = 0;
let _DAT_00631ac8 = 0;
let _DAT_00655af6 = 0;
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
let s_BONDGLORY_00631328 = 'BONDGLORY';
let s_USEWEAPONS_00631334 = 'USEWEAPONS';
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
let PTR_FUN_0061d6d8 = 0;
let PTR_DAT_006359f0 = 0;

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
