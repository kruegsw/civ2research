// Block 0x00510000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 162

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00511320 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 export function FUN_00511350 (param_1, param_2, param_3)

 {
  if ((param_1 < param_2)) param_3 = param_1 param_1 = (param_1 < param_2) {
    param_3 = param_2;
  }
  return param_3;
}


 export function FUN_005113b0 (param_1, param_2, param_3, param_4)

 {
  FUN_005a97cc(DAT_00635c64, param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_005113f0 (param_1, param_2, param_3)

 {
  FUN_005a99fc(DAT_00635c64, param_1, param_2, param_3);
  return;
}


 export function FUN_00511430 ()

 {
  FUN_004af09e(DAT_00679640);
  return;
}


 export function FUN_00511460 (param_1, param_2, param_3)

 {
  FUN_0046ace7(param_1, param_2, s32(param_3, 0), s32(param_3, 1), (s32(param_3, 2) - s32(param_3, 0)), (s32(param_3, 3) - s32(param_3, 1)));
  return;
}


 export function FUN_005114d0 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_00548c78(DAT_00635c64, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  return;
}


 export function FUN_00511520 (param_1, param_2, param_3)

 {
  FUN_004a6cc5(DAT_006359d4, param_1, param_2, param_3);
  return;
}


 export function FUN_00511560 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005115b0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_005115b0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00511645;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 2;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005cb6db(s32((in_ECX + 0x1c), 0));
  }
  local_8 = 1;
  FUN_00511624();
  local_8 = (UNNAMED << 8);
  FUN_00511630();
  local_8 = -1;
  FUN_0051163c();
  FUN_0051164f();
  return;
}


 export function FUN_00511624 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00511630 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0051163c ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_0051164f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00511690 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x15d4), 0) !== 2)) {
    param_1 = (s32((in_ECX + 0x15d4), 0) * param_1 / 2 | 0);
  }
  return param_1;
}


 export function FUN_005116f0 (param_1)

 {
  FUN_0043ce5a(DAT_00679640, param_1);
  return;
}


 export function FUN_00511720 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005117ad;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  local_8 = 0;
  FUN_005bd630();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  FUN_005bd630();
  _MEM[(in_ECX + 0xc8)] = 0;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005117f0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* void */ /* __thiscall */ /* CPropertySheet::EnableStackedTabs(int) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x2cc), 0, param_1);
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* void */ /* __thiscall */ /* CPropertySheet::EnableStackedTabs(int) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x2d0), 0, param_1);
  return;
}


 export function FUN_00511880 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let sVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_10 = 0;
  if ((2 < DAT_00655b02)) {
    if ((param_3 !== 0)) {
      (local_c < param_3) (local_c = 0; local_c = (local_c < param_3); local_c = (local_c + 1)) {
        sVar1 = _strlen((DAT_0063cc48 + local_c * 0x104));
        local_10 = ((local_10 + sVar1) + 1);
      }
    }
    if ((param_4 !== 0)) {
      local_10 = (param_4 * 4 + local_10);
    }
    if ((local_10 !== 0)) {
      local_8 = operator_new(local_10);
      local_14 = local_8;
      if ((param_3 !== 0)) {
        (local_c < param_3) (local_c = 0; local_c = (local_c < param_3); local_c = (local_c + 1)) {
          FUN_005f22d0(local_14, (DAT_0063cc48 + local_c * 0x104));
          sVar1 = _strlen((DAT_0063cc48 + local_c * 0x104));
          local_14 = (local_14 + (sVar1 + 1));
        }
      }
      if ((param_4 !== 0)) {
        (local_c < param_4) (local_c = 0; local_c = (local_c < param_4); local_c = (local_c + 1)) {
          FID_conflict:_memcpy(local_14, (DAT_0063cc30 + local_c * 4), 4);
          local_14 = (local_14 + 4);
        }
      }
    }
    FUN_0046b14d(0x6a, param_2, param_1, param_3, param_4, param_5, param_6, 0, 0, local_8);
  }
  return;
}


 export function FUN_00511a0e (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let puVar1;
  let puVar2;

  puVar2 = operator_new((param_7 + 0x1c));
  w32(puVar2, 0, 0);
  w32(puVar2, 1, param_1);
  w32(puVar2, 2, param_2);
  w32(puVar2, 3, param_3);
  w32(puVar2, 4, param_4);
  w32(puVar2, 5, param_5);
  w32(puVar2, 6, param_7);
  if ((param_7 !== 0)) {
    FID_conflict:_memcpy((puVar2 + 7), param_6, param_7);
  }
  puVar1 = puVar2;
  if ((DAT_00631130 !== 0)) {
    w32(DAT_00631134, 0, puVar2);
    puVar1 = DAT_00631130;
  }
  DAT_00631130 = puVar1;
  DAT_00631134 = puVar2;
  return;
}


 export function FUN_00511acf ()

 {
  let puVar1;

  while ((DAT_00631130 !== 0)) puVar1 = DAT_00631130 DAT_00631130 = (DAT_00631130 !== 0) {
    DAT_00631130 = s32(DAT_00631130, 0);
    operator_delete(puVar1);
  }
  DAT_00631134 = 0;
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_00511b2d ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (((iVar1 - DAT_006cec80) < 0x4b1)) DAT_006c91e4 = (DAT_006c91e4 === 0) iVar1 = FUN_00421bb0() iVar1 = (iVar1 - DAT_006cec80) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  _DAT_006cec80 = FUN_00421bb0();
  return;
}


 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0051343e) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0051347e) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0051369c) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_00511ba2 ()

 {
  let piVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let unaff_FS_OFFSET;
  let local_338;
  let local_330;
  let local_310;
  let local_308;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005139a9;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  piVar1 = DAT_00631130;
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((piVar1 !== 0)) {
    _DAT_006ad67c = 1;
    DAT_00631130 = s32(piVar1, 0);
    if ((s32(piVar1, 0) === 0)) {
      DAT_00631134 = 0;
    }
    if ((s32(piVar1, 3) !== 0)) piVar1 = (piVar1 + 3) {
      local_14 = (piVar1 + 7);
    }
    if ((s32(piVar1, 2) !== 0)) {
      (local_310 < s32(piVar1, 2)) (local_310 = 0; local_310 = (local_310 < s32(piVar1, 2)); local_310 = (local_310 + 1)) {
        FUN_005f22d0((DAT_0063cc48 + local_310 * 0x104), local_14);
        sVar2 = _strlen((DAT_0063cc48 + local_310 * 0x104));
        local_14 = (local_14 + (sVar2 + 1));
      }
    }
    if ((s32(piVar1, 3) !== 0)) {
      (local_310 < s32(piVar1, 3)) (local_310 = 0; local_310 = (local_310 < s32(piVar1, 3)); local_310 = (local_310 + 1)) {
        FID_conflict:_memcpy((DAT_0063cc30 + local_310 * 4), local_14, 4);
        local_14 = (local_14 + 1);
      }
    }
    DAT_00635a3c = LAB_00403c74;
    /* BRANCHIND */ ((piVar1 + 1) []) {
    case 0 :
      FUN_00421ea0(s_RETIREDIE_00631140);
      break;
    case 1 :
      FUN_00421ea0(s_RETIREAI_0063114c);
      break;
    case 2 :
      FUN_004442e0(s_BARBARIANS_00631158, s32(piVar1, 4));
      break;
    case 3 :
      FUN_00410030(s_GLOBALWARMING_00631164, DAT_0063fc58, 0);
      break;
    case 4 :
      FUN_00410030(s_FEARWARMING_00631174, DAT_0063fc58, 0);
      break;
    case 5 :
      FUN_00432611();
      break;
    case 6 :
      FUN_00410030(s_EAGLEHASLANDED_00631180, DAT_0063fc58, 0);
      break;
    case 7 :
      FUN_00410030(s_SCENARIOENDS_00631190, DAT_00643af8, 0);
      break;
    case 8 :
      FUN_00410030(s_SCENARIOEND_006311a0, DAT_00643af8, 0);
      break;
    case 9 :
      uVar4 = FUN_00493ba6(DAT_006d1da0);
      FUN_0040ff60(0, uVar4);
      uVar4 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_PLANRETIRE_006311ac, DAT_00643af8, 0);
      break;
    case 10 :
      uVar4 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar4);
      FUN_00410030(s_DORETIRE_006311b8, DAT_00643af8, 0);
      break;
    case 0xb :
      FUN_00421ea0(s_LAUNCHED_006311c4);
      FUN_004d0208((-s32(piVar1, 4)));
      break;
    case 0xc :
      FUN_00421ea0(s_SPACERETURNS_006311d0);
      break;
    case 0xd :
      FUN_00421ea0(s_SPACEDESTROYED_006311e0);
      break;
    case 0xe :
      FUN_0046e571(2, 1);
      FUN_00410030(s_DESTROYED_006311f0, (DAT_00643798 + s32(piVar1, 4) * 0x3c), 0);
      break;
    case 0xf :
      FUN_0046e020((((-(s32(piVar1, 5) === 0)) & 0x14) + 0x16), 1, 0, 0);
      FUN_004442e0(s_CARAVAN_006311fc, s32(piVar1, 4));
      break;
    case 0x10 :
      FUN_0046e020((((-(s32(piVar1, 5) === 0)) & 0x14) + 0x16), 1, 0, 0);
      FUN_004442e0(s_FOODCARAVAN_00631204, s32(piVar1, 4));
      break;
    case 0x11 :
      FUN_004442a0(s_CARAVANOTHER_00631210, s32(piVar1, 4), s32(piVar1, 5));
      break;
    case 0x12 :
      FUN_0043c9d0(s_STARTWONDER_00631220);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x13 :
      FUN_0043c9d0(s_SWITCHWONDER_0063122c);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x14 :
      FUN_0043c9d0(s_ABANDONWONDER_0063123c);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x15 :
      FUN_004442e0(s_PARADROP_0063124c, s32(piVar1, 4));
      break;
    case 0x16 :
      FUN_00421ea0(s_SCHISM_00631258);
      break;
    case 0x17 :
      uVar4 = FUN_00410030(s_CANESCAPE_00631260, DAT_0063fc58, 0);
      FUN_0046b14d(0x77, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x18 :
      FUN_00414dd0(s_ESCAPE_0063126c, s32(piVar1, 4));
      break;
    case 0x19 :
      FUN_0043c9d0(s_CAPTUREWONDER_00631274);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x1a :
      FUN_0043c9d0(s_LOSTWONDER_00631284);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x1b :
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYCAPTURE_00631290, s32(piVar1, 5), 0x46, 1, s32(piVar1, 4));
      break;
    case 0x1c :
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYWINALLY_0063129c, s32(piVar1, 5), 0x46, 1, s32(piVar1, 4));
      break;
    case 0x1d :
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYLOSEALLY_006312a8, s32(piVar1, 5), 0x46, 1, s32(piVar1, 4));
      break;
    case 0x1e :
      FUN_0046e020(5, 0, 0, 0);
      FUN_004eb80a(s_CITYCAPTURE2_006312b8, s32(piVar1, 5), 0x46, 1, s32(piVar1, 4));
      break;
    case 0x1f :
      FUN_004442e0(s_PARTISANS_006312c8, s32(piVar1, 4));
      break;
    case 0x20 :
      FUN_004442e0(s_PROMOTED_006312d4, s32(piVar1, 4));
      break;
    case 0x21 :
      FUN_00410030(s_INCORRUPTIBLE_006312e0, DAT_006469e0, 0);
      break;
    case 0x22 :
      FUN_004442e0(s_DESERTED_006312f0, s32(piVar1, 4));
      break;
    case 0x23 :
      uVar4 = FUN_004442e0(s_DESERT_006312fc, s32(piVar1, 5));
      FUN_0046b14d(0x7b, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x24 :
      uVar4 = FUN_004442e0(s_DESERT2_00631304, s32(piVar1, 5));
      FUN_0046b14d(0x7b, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), uVar4, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x25 :
      FUN_004442e0(s_BLEWITUP_0063130c, s32(piVar1, 4));
      break;
    case 0x26 :
      FUN_00410030(s_BOND007_00631318, (DAT_00641848 + s32(piVar1, 4) * 0x3c), s32(piVar1, 5));
      break;
    case 0x27 :
      FUN_00410030(DAT_00631320, (DAT_00641848 + s32(piVar1, 4) * 0x3c), s32(piVar1, 5));
      break;
    case 0x28 :
      FUN_00410030(s_BONDGLORY_00631328, (DAT_00641848 + s32(piVar1, 4) * 0x3c), s32(piVar1, 5));
      break;
    case 0x29 :
      FUN_004cc870(s_USEWEAPONS_00631334, 0x3e, 8);
      break;
    case 0x2a :
      FUN_004cc870(DAT_00631340, 0x11, 8);
      break;
    case 0x2b :
      FUN_00410030(s_CHANGED_00631344, (DAT_00646878 + s32(piVar1, 4) * 0x3c), s32(piVar1, 5));
      break;
    case 0x2c :
      FUN_00410030(s_OVERTHROWN_0063134c, (DAT_00646878 + s32(piVar1, 4) * 0x3c), s32(piVar1, 5));
      break;
    case 0x2d :
      FUN_004442e0(s_BREAKCEASE_00631358, s32(piVar1, 4));
      break;
    case 0x2e :
      FUN_004442e0(s_SNEAK_00631364, s32(piVar1, 4));
      break;
    case 0x2f :
      FUN_004442e0(s_MISSILEATTACK_0063136c, s32(piVar1, 4));
      break;
    case 0x30 :
      FUN_004442e0(s_PEARLHARBOR_0063137c, s32(piVar1, 4));
      break;
    case 0x31 :
      FUN_004cc870(s_BATTERY2_00631388, s32(piVar1, 4), 8);
      break;
    case 0x32 :
      FUN_004cc870(s_BATTERY_00631394, s32(piVar1, 4), 8);
      break;
    case 0x33 :
      FUN_004442e0(s_SCRAMBLE_0063139c, s32(piVar1, 4));
      break;
    case 0x34 :
      FUN_004442e0(s_AMPHIBMOTIZE_006313a8, s32(piVar1, 4));
      break;
    case 0x35 :
      FUN_00421ea0(s_MULTIPLELOSE_006313b8);
      break;
    case 0x36 :
      FUN_00421ea0(s_MULTIPLEWIN_006313c8);
      break;
    case 0x37 :
      FUN_004442a0(s_RANSOM_006313d4, s32(piVar1, 4), 0);
      break;
    case 0x38 :
      FUN_00410030(s_ACTIVATEALLY_006313dc, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      break;
    case 0x39 :
      FUN_00410030(s_ALLYHELPS_006313ec, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      break;
    case 0x3a :
      FUN_00421ea0(s_CANCELPEACE_006313f8);
      break;
    case 0x3b :
      FUN_00421ea0(s_ALLYUNDERATTACK_00631404);
      break;
    case 0x3c :
      FUN_00421ea0(s_ALLYATTACKING_00631414);
      break;
    case 0x3d :
      w16((DAT_0064ca82 + (s32(piVar1, 4) * 2 + DAT_006d1da0 * 0x594)), 0, DAT_00655af8);
      w16((DAT_0064ca82 + (s32(piVar1, 4) * 0x594 + DAT_006d1da0 * 2)), 0, DAT_00655af8);
      if ((DAT_0067a8c0 === -1)) {
        DAT_0067a8c0 = -2;
        FUN_0040bbb0();
        uVar4 = FUN_00493ba6(s32(piVar1, 4));
        FUN_0040bbe0(uVar4);
        FUN_0040fe10();
        uVar4 = FUN_00493b10(s32(piVar1, 4));
        FUN_0040bbe0(uVar4);
        FUN_0040fe10();
        FUN_0040bc10(0x8c);
        FUN_0040fe10();
        uVar4 = FUN_00493c7d(s32(piVar1, 4));
        FUN_0040bbe0(uVar4);
        FUN_0040ff60(0, DAT_00679640);
        uVar4 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(1, uVar4);
        uVar4 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(2, uVar4);
        if ((DAT_0064c6e0[(s32(piVar1, 4) * 0x594 + DAT_006d1da0)] === 0)) {
          local_330 = 0;
        }
        else {
          local_330 = FUN_004679ab(DAT_0064c6e0[(s32(piVar1, 4) * 0x594 + DAT_006d1da0)]);
        }
        uVar4 = FUN_00428b0c(s32((DAT_0064b9c0 + local_330 * 4), 0));
        FUN_0040ff60(3, uVar4);
        DAT_00635a3c = LAB_00403d0f;
        iVar3 = FUN_00410030(s_PARLEYREQUEST_00631424, DAT_0063fc58, 0);
        if ((DAT_006ad698 === 0)) {
          if ((DAT_006c91e4 === 0)) {
            FUN_0046b14d(0x80, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), iVar3, 0, 0, 0, 0, 0, 0, 0);
          }
          if ((DAT_006c91e4 === 0)) {
            if ((iVar3 === 1)) {
              iVar3 = s32(piVar1, 4);
              operator_delete(piVar1);
              _DAT_006ad67c = 0;
              FUN_004b7eb6(iVar3, 2);
              local_8 = -1;
              FUN_0051399d();
              FUN_005139b3();
              return;
            }
          }
          else {
            DAT_006c91e4 = 0;
            uVar4 = FUN_00493c7d(s32(piVar1, 4));
            FUN_0040ff60(0, uVar4);
            DAT_00635a3c = LAB_00403c74;
            FUN_00410030(s_PARLEYCANCEL_00631434, DAT_0063fc58, 0);
          }
          DAT_0067a8c0 = -1;
          DAT_00626a2c = 0;
        }
        else {
          FUN_0046b14d(0x80, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), 2, 0, 0, 0, 0, 0, 0, 0);
          DAT_0067a8c0 = -1;
          DAT_00626a2c = 0;
        }
      }
      else {
        FUN_0046b14d(0x80, s32((DAT_006ad30c + s32((DAT_006ad558 + s32(piVar1, 4) * 4), 0) * 0x54), 0), 2, 0, 0, 0, 0, 0, 0, 0);
      }
      break;
    case 0x3e :
      FUN_004442a0(s_UPGRADE_00631444, s32(piVar1, 4), (((s32(piVar1, 5) === 0) - 1) & 8));
      break;
    case 0x3f :
      if ((s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_006d1da0 * 4), 0) * 0x54), 0) !== s32(piVar1, 4))) {
        FUN_00410030(s_NEWPLAYER_0063144c, DAT_0063fc58, 0);
      }
      break;
    case 0x40 :
      FUN_0040ffa0(s_NEWTURNTIMERCLIENT_00631458, 0x2000000);
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xd50), 0));
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xd54), 0));
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0x28);
      FUN_0046b14d(0x56, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x41 :
      FUN_00410030(s_NEWTURNTIMERNO_0063146c, DAT_0063fc58, 0);
      break;
    case 0x42 :
      FUN_00410030(s_NEWTURNTIMERYES_0063147c, DAT_0063fc58, 0);
      break;
    case 0x43 :
      FUN_0040ffa0(s_PMCHANGECLIENT_0063148c, 0x2000000);
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xd50), 0));
      FUN_0059f2a3(uVar4);
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xd54), 0));
      FUN_0059f2a3(uVar4);
      FUN_0040bc80(0);
      FUN_0046b14d(0x57, 0, local_22c, 0, 0, 0, 0, 0, 0, 0);
      break;
    case 0x44 :
      FUN_00410030(s_PMCHANGENO_0063149c, DAT_0063fc58, 0);
      break;
    case 0x45 :
      FUN_00410030(s_PMCHANGEYES_006314a8, DAT_0063fc58, 0);
      break;
    case 0x46 :
      FUN_0046e020(0x23, 1, 0, 0);
      FUN_004eb571(s_MANHATTAN_006314b4, s32(piVar1, 4), 1, DAT_00645fe8);
      break;
    case 0x47 :
      FUN_0043c9d0(s_BUILT2_006314c0);
      if ((s32(piVar1, 4) < 0)) {
        local_338 = (DAT_00645160 + s32(piVar1, 5) * 0x3c);
      }
      else {
        local_338 = (DAT_00645a84 + s32(piVar1, 4) * 0x3c);
      }
      FUN_0059ec88(local_338, 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x48 :
      FUN_00421ea0(s_MOVECAPITAL_006314c8);
      break;
    case 0x49 :
      FUN_00421ea0(s_ASTRONAUTS_006314d4);
      break;
    case 0x4a :
      FUN_0043c9d0(s_ALMOSTWONDER_006314e0);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x4b :
      FUN_0043c9d0(s_STILLWONDER1_006314f0);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x4c :
      FUN_0043c9d0(s_STILLWONDER2_00631500);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 4) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x4d :
      FUN_0043c9d0(s_ENDWONDER_00631510);
      FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768c[s32(piVar1, 4) * 0x10]) * 0xf0 + s8(DAT_0062768d[s32(piVar1, 4) * 0x10]) * 0x3c)), 0, 0);
      FUN_0059ec88((DAT_00645160 + s32(piVar1, 5) * 0x3c), 0, 0);
      local_308 = DAT_fffffcf8;
      FUN_0040bc80(0);
      break;
    case 0x4e :
      FUN_004442e0(s_BARBARIANSLAND_0063151c, s32(piVar1, 4));
      break;
    case 0x4f :
      FUN_00421dd0();
      (local_310 < s32(piVar1, 2)) (local_310 = 0; local_310 = (local_310 < s32(piVar1, 2)); local_310 = (local_310 + 1)) {
        FUN_0059e18b((DAT_0063cc48 + local_310 * 0x104), -1, -1, -1, 0);
      }
      FUN_0040bc80(0);
      break;
    case 0x50 :
      FUN_00410030(s_WARENDS_0063152c, DAT_00647748, 0);
      break;
    case 0x51 :
      FUN_004442e0(s_MILITARYAID1_00631534, s32(piVar1, 4));
      break;
    case 0x52 :
      FUN_004442e0(s_MILITARYAID2_00631544, s32(piVar1, 4));
      break;
    case 0x53 :
      FUN_00410030(s_LOSTCLIENT_00631554, DAT_0063fc58, 0);
      break;
    case 0x54 :
      FUN_004c4240(s_GOLDENAGE_00631560, 0x3c, 8);
      break;
    case 0x55 :
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYEMBASSY_0063156c, DAT_0063fc58, 0);
      break;
    case 0x56 :
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_ENEMYINVESTIGATE_0063157c, DAT_0063fc58, 0);
      break;
    case 0x57 :
      iVar3 = FUN_004bd9f0(s32(piVar1, 4), 0x23);
      if ((iVar3 === 0)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      else {
        FUN_0046e020(0x27, 1, 0, 0);
      }
      FUN_00410030(s_STEAL_00631590, DAT_0063fc58, 0);
      break;
    case 0x58 :
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_FOILEDAGAIN_00631598, DAT_0063fc58, 0);
      break;
    case 0x59 :
      iVar3 = FUN_004bd9f0(s32(piVar1, 5), 0x23);
      if ((iVar3 === 0)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      else {
        FUN_0046e020(0x27, 1, 0, 0);
      }
      FUN_00410030(s_SABOTAGEONE_006315d8, (DAT_00645160 + s32(piVar1, 4) * 0x3c), 8);
      break;
    case 0x5a :
      iVar3 = FUN_004bd9f0(s32(piVar1, 4), 0x23);
      if ((iVar3 === 0)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      else {
        FUN_0046e020(0x27, 1, 0, 0);
      }
      FUN_00421ea0(s_SABOTAGETWO_006315e4);
      break;
    case 0x5b :
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_WATERSUPPLY_006315a4, DAT_0063fc58, 0);
      break;
    case 0x5c :
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE_006315b0);
      FUN_004cc870(DAT_00679640, 0x3e, 8);
      break;
    case 0x5d :
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE2_006315bc);
      FUN_004cc870(DAT_00679640, 0x3e, 8);
      break;
    case 0x5e :
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00421ea0(s_CIVILWAR_006315cc);
      break;
    case 0x5f :
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPMINE_006315f0, s32(piVar1, 4));
      break;
    case 0x60 :
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPYOURS_006315f8, s32(piVar1, 4));
      break;
    case 0x61 :
      FUN_0046e020(0x5d, 0, 0, 0);
      FUN_004442e0(s_UPYOURSTOO_00631600, s32(piVar1, 4));
      break;
    case 0x62 :
      FUN_00421ea0(s_MERCDECLARE_0063160c);
      break;
    case 99 :
      FUN_004c4240(s_TOOKCIV_00631618, s32(piVar1, 4), 0);
      break;
    case 100 :
      if ((s32(piVar1, 4) === DAT_0067a8c0)) piVar1 = (piVar1 + 4) {
        DAT_00631138 = 1;
        FUN_0040ffa0(s_REVEALUNITORIGINS_00631620, 0x2000000);
        uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xdd4), 0));
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xdd8), 0));
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if ((local_22c === 1)) {
          DAT_0067ab65 = 1;
          if ((DAT_0067a994 === 2)) {
            FUN_0040f380();
            FUN_00453c80();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          else {
            FUN_0043c5f0();
            FUN_00453c40();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          FUN_0046b14d(0xa7, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), DAT_006d1da0, s8(DAT_0067ab65), 0, 0, 0, 0, 0, 0);
          if ((DAT_0067a9bc === 2)) DAT_0067a9b8 = (DAT_0067a9b8 === 2) DAT_0067a994 = (DAT_0067a994 === 0xf) DAT_0067a9bc = (DAT_0067a9bc === 2) {
            FUN_0040f380();
            FUN_0043c5f0();
            DAT_0067ab65 = 1;
            FUN_00453c80();
            FUN_00453c80();
            FUN_00468bb9(0);
          }
        }
        DAT_00631138 = 0;
      }
      break;
    case 0x65 :
      if ((s32(piVar1, 4) === DAT_0067a8c0)) piVar1 = (piVar1 + 4) {
        DAT_0063113c = 1;
        FUN_0040ffa0(s_REVEALCITYINFO_00631634, 0x2000000);
        uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xddc), 0));
        FUN_0059f2a3(uVar4);
        uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xdd8), 0));
        FUN_0059f2a3(uVar4);
        FUN_0040bc80(0x14);
        if ((local_22c === 1)) {
          DAT_0067ab66 = 1;
          if ((DAT_0067a994 === 2)) {
            FUN_0040f380();
            FUN_00453c80();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          else {
            FUN_0043c5f0();
            FUN_00453c40();
            FUN_0043c5f0();
            FUN_00453c40();
          }
          FUN_0046b14d(0xa5, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), DAT_006d1da0, s8(DAT_0067ab66), 0, 0, 0, 0, 0, 0);
          if ((DAT_0067a9bc === 3)) DAT_0067a9b8 = (DAT_0067a9b8 === 3) DAT_0067a994 = (DAT_0067a994 === 0xf) DAT_0067a9bc = (DAT_0067a9bc === 3) {
            FUN_0040f380();
            FUN_0043c5f0();
            FUN_0058878e(0);
          }
        }
        DAT_0063113c = 0;
      }
    }
    operator_delete(piVar1);
    _DAT_006ad67c = 0;
  }
  local_8 = -1;
  FUN_0051399d();
  FUN_005139b3();
  return;
}


 export function FUN_0051399d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005139b3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00514220 (in_ECX)

 {
  // in_ECX promoted to parameter;

  _memset(in_ECX, 0, 0x5dc0);
  FUN_00514272();
  return in_ECX;
}


 export function FUN_00514254 ()

 {
  FUN_00514272();
  return;
}


 export function FUN_00514272 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < 0x7d0) (local_8 = 0; local_8 = (local_8 < 0x7d0); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 4) + local_8 * 0xc), 0) !== 0)) {
      operator_delete(s32(((in_ECX + 4) + local_8 * 0xc), 0));
      w32(((in_ECX + 4) + local_8 * 0xc), 0, 0);
    }
    w32(((in_ECX + 8) + local_8 * 0xc), 0, 0);
    w32((in_ECX + local_8 * 0xc), 0, 0);
  }
  w32((in_ECX + 0x5dc0), 0, 0x190);
  w32((in_ECX + 0x5dc4), 0, 0x190);
  w32((in_ECX + 0x5dc8), 0, 0);
  w32((in_ECX + 0x5dcc), 0, 0);
  w32((in_ECX + 0x5dd0), 0, 0);
  w32((in_ECX + 0x5dd4), 0, 0);
  return;
}


 export function FUN_0051435f (param_1)

 {
  let uVar1;

  if ((0x66 < param_1)) 0x66 = (0x66 < param_1) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051438f (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let pvVar2;
  // in_ECX promoted to parameter;
  let local_208;
  let local_108;
  let local_104;

  if ((param_1 !== 0xff)) DAT_00655b02 = (DAT_00655b02 === 6) param_1 = (param_1 !== 0) param_1 = (param_1 !== 0xff) {
    if ((DAT_006ad2f7 === 0)) {
      param_1 = 0;
    }
    else {
      param_1 = 1;
    }
  }
  if ((s32((param_2 + 4), 0) === 0x2b)) {
    _DAT_006c908c = (DAT_006c908c + 1);
    FUN_0046b14d(0x2c, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  else if ((s32((param_2 + 4), 0) === 0x2c)) {
    DAT_006c9090 = (DAT_006c9090 + 1);
  }
  else {
    iVar1 = FUN_0051435f(s32((param_2 + 4), 0));
    if ((iVar1 === 0)) {
      if ((s32((in_ECX + 0x5dc8), 0) !== 0)) in_ECX = (in_ECX + 0x5dc8) {
        FUN_005f22d0(DAT_fffffdf8, s_MESSAGE_LOST_in_EnqueueMessage:_006318a8);
        FUN_005f22e0(DAT_fffffdf8, (s_NM_DATAGRAM_00628470 + s32((param_2 + 4), 0) * 0x20));
        FUN_005f22e0(DAT_fffffdf8, s_From:_%d_Size:_%d_006318cc);
        FUN_005d22b7(DAT_fffffdf8, param_1, param_3);
        return 0;
      }
      if ((0x7cf < s32((in_ECX + 0x5dc0), 0))) 1999 = (0x7cf < s32((in_ECX + 0x5dc0), 0)) {
        FUN_005dae6b(7, s_head_>=_400_&&_head_<_MAX_MSGS_I_00631908, s_D:\Ss\Franklinton\NetMessageQueu_006318e0, 0x130);
      }
      if ((0x7cf < s32((in_ECX + 0x5dc4), 0))) 1999 = (0x7cf < s32((in_ECX + 0x5dc4), 0)) {
        FUN_005dae6b(7, s_tail_>=_400_&&_tail_<_MAX_MSGS_I_00631958, s_D:\Ss\Franklinton\NetMessageQueu_00631930, 0x131);
      }
      pvVar2 = operator_new(param_3);
      w32(((in_ECX + 4) + s32((in_ECX + 0x5dc4), 0) * 0xc), 0, pvVar2);
      if ((s32(((in_ECX + 4) + s32((in_ECX + 0x5dc4), 0) * 0xc), 0) === 0)) {
        FUN_005d22b7(s_EnqueueMessage[Primary]:_Failed_t_006319c0, s32((param_2 + 4), 0), s32((param_2 + 8), 0));
        return 0;
      }
      if ((s32(((in_ECX + 4) + s32((in_ECX + 0x5dc4), 0) * 0xc), 0) === 0)) {
        FUN_005dae6b(7, s_msgQueue[tail].pData_006319a8, s_D:\Ss\Franklinton\NetMessageQueu_00631980, 0x136);
      }
      FID_conflict:_memcpy(s32(((in_ECX + 4) + s32((in_ECX + 0x5dc4), 0) * 0xc), 0), param_2, param_3)
      ;
      w32((in_ECX + s32((in_ECX + 0x5dc4), 0) * 0xc), 0, param_1);
      w32(((in_ECX + 8) + s32((in_ECX + 0x5dc4), 0) * 0xc), 0, param_3);
      w32((in_ECX + 0x5dc4), 0, ((s32((in_ECX + 0x5dc4), 0) + 1) % 0x7d0));
      if ((s32((in_ECX + 0x5dc4), 0) === 0)) {
        w32((in_ECX + 0x5dc4), 0, 0x190);
      }
      w32((in_ECX + 0x5dc8), 0, (s32((in_ECX + 0x5dc8), 0) + 1));
      if ((DAT_006ad690 < s32((in_ECX + 0x5dc8), 0))) {
        DAT_006ad690 = s32((in_ECX + 0x5dc8), 0);
      }
    }
    else {
      if ((s32((in_ECX + 0x5dd4), 0) !== 0)) in_ECX = (in_ECX + 0x5dd4) {
        FUN_005f22d0(DAT_fffffefc, s_MESSAGE_LOST_in_Alpha_EnqueueMes_00631748);
        FUN_005f22e0(DAT_fffffefc, (s_NM_DATAGRAM_00628470 + s32((param_2 + 4), 0) * 0x20));
        FUN_005f22e0(DAT_fffffefc, s_From:_%d_Size:_%d_00631770);
        FUN_005d22b7(DAT_fffffefc, param_1, param_3);
        return 0;
      }
      if ((0x18f < s32((in_ECX + 0x5dcc), 0))) 399 = (0x18f < s32((in_ECX + 0x5dcc), 0)) {
        FUN_005dae6b(7, s_alphaHead_>=_0_&&_alphaHead_<_40_006317ac, s_D:\Ss\Franklinton\NetMessageQueu_00631784, 0x10c);
      }
      if ((0x18f < s32((in_ECX + 0x5dd0), 0))) 399 = (0x18f < s32((in_ECX + 0x5dd0), 0)) {
        FUN_005dae6b(7, s_alphaTail_>=_0_&&_alphaTail_<_40_006317f8, s_D:\Ss\Franklinton\NetMessageQueu_006317d0, 0x10d);
      }
      pvVar2 = operator_new(param_3);
      w32(((in_ECX + 4) + s32((in_ECX + 0x5dd0), 0) * 0xc), 0, pvVar2);
      if ((s32(((in_ECX + 4) + s32((in_ECX + 0x5dd0), 0) * 0xc), 0) === 0)) {
        local_108 = param_2;
        FUN_005d22b7(s_EnqueueMessage[Alpha]:_Failed_to_00631860, s32((param_2 + 4), 0), s32((param_2 + 8), 0));
        return 0;
      }
      if ((s32(((in_ECX + 4) + s32((in_ECX + 0x5dd0), 0) * 0xc), 0) === 0)) {
        FUN_005dae6b(7, s_msgQueue[alphaTail].pData_00631844, s_D:\Ss\Franklinton\NetMessageQueu_0063181c, 0x112);
      }
      FID_conflict:_memcpy(s32(((in_ECX + 4) + s32((in_ECX + 0x5dd0), 0) * 0xc), 0), param_2, param_3)
      ;
      w32((in_ECX + s32((in_ECX + 0x5dd0), 0) * 0xc), 0, param_1);
      w32(((in_ECX + 8) + s32((in_ECX + 0x5dd0), 0) * 0xc), 0, param_3);
      w32((in_ECX + 0x5dd0), 0, ((s32((in_ECX + 0x5dd0), 0) + 1) % 0x190));
      w32((in_ECX + 0x5dd4), 0, (s32((in_ECX + 0x5dd4), 0) + 1));
      if ((DAT_006ad694 < s32((in_ECX + 0x5dd4), 0))) {
        DAT_006ad694 = s32((in_ECX + 0x5dd4), 0);
      }
    }
  }
  return 1;
}


 export function FUN_005149d6 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x5dd4), 0) === 0)) {
    if ((s32((in_ECX + 0x5dc8), 0) !== 0)) in_ECX = (in_ECX + 0x5dc8) {
      w32(param_1, 0, s32((in_ECX + s32((in_ECX + 0x5dc0), 0) * 0xc), 0));
      w32((in_ECX + s32((in_ECX + 0x5dc0), 0) * 0xc), 0, 0);
      w32(param_2, 0, s32(((in_ECX + 4) + s32((in_ECX + 0x5dc0), 0) * 0xc), 0));
      w32(((in_ECX + 4) + s32((in_ECX + 0x5dc0), 0) * 0xc), 0, 0);
      w32(param_3, 0, s32(((in_ECX + 8) + s32((in_ECX + 0x5dc0), 0) * 0xc), 0));
      w32(((in_ECX + 8) + s32((in_ECX + 0x5dc0), 0) * 0xc), 0, 0);
      w32((in_ECX + 0x5dc0), 0, ((s32((in_ECX + 0x5dc0), 0) + 1) % 0x7d0));
      if ((s32((in_ECX + 0x5dc0), 0) === 0)) {
        w32((in_ECX + 0x5dc0), 0, 0x190);
      }
      w32((in_ECX + 0x5dc8), 0, (s32((in_ECX + 0x5dc8), 0) + -1));
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  else {
    w32(param_1, 0, s32((in_ECX + s32((in_ECX + 0x5dcc), 0) * 0xc), 0));
    w32((in_ECX + s32((in_ECX + 0x5dcc), 0) * 0xc), 0, 0);
    w32(param_2, 0, s32(((in_ECX + 4) + s32((in_ECX + 0x5dcc), 0) * 0xc), 0));
    w32(((in_ECX + 4) + s32((in_ECX + 0x5dcc), 0) * 0xc), 0, 0);
    w32(param_3, 0, s32(((in_ECX + 8) + s32((in_ECX + 0x5dcc), 0) * 0xc), 0));
    w32(((in_ECX + 8) + s32((in_ECX + 0x5dcc), 0) * 0xc), 0, 0);
    w32((in_ECX + 0x5dcc), 0, ((s32((in_ECX + 0x5dcc), 0) + 1) % 0x190));
    w32((in_ECX + 0x5dd4), 0, (s32((in_ECX + 0x5dd4), 0) + -1));
    uVar1 = 1;
  }
  return uVar1;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Different */ /* Base */ /* Names */
    /* _$E26 */
    /* _$E31 */
    /* _$E353 */
    /* _$E354 */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function FID_conflict:_$E31 ()

 {
  FUN_00514e2a();
  FUN_00514e44();
  return;
}


 export function FUN_00514e2a ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00514e44 ()

 {
  _atexit(FUN_00514e61);
  return;
}


 export function FUN_00514e61 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00514e7b (param_1)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00514efe;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00514f16();
  local_8 = 0;
  iVar1 = FUN_005151f4(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00514ef2();
    FUN_00514f08();
    return;
  }
  FUN_00515516();
  local_8 = -1;
  FUN_00514ef2();
  FUN_00514f08();
  return;
}


 export function FUN_00514ef2 ()

 {
  FUN_005150b9();
  return;
}


 export function FUN_00514f08 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00514f16 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005150a0;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_0044c5a0();
  local_8 = 2;
  FUN_005bd630();
  local_8 = 3;
  FUN_004502b0();
  local_8 = 4;
  in_ECX = (in_ECX + 0x64c);
  local_8 = 5;
  in_ECX = (in_ECX + 0x688);
  local_8 = 6;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 7);
  w32((in_ECX + 0x6c4), 0, 0);
  DAT_00631a98 = in_ECX;
  w32((in_ECX + 0x6fc), 0, 0);
  FUN_006e7d90((in_ECX + 0x6ec), 0xd0, 0x39, 0x1b1, 0x14c);
  FUN_0043c6c0(0, 0x18, 1);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005150b9 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005151dc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 7;
  FUN_00450340();
  DAT_00631a98 = 0;
  local_8 = 6;
  FUN_0051516a();
  local_8 = 5;
  FUN_00515179();
  local_8 = 4;
  FUN_00515188();
  local_8 = 3;
  FUN_00515197();
  local_8 = 2;
  FUN_005151a6();
  local_8 = 1;
  FUN_005151b5();
  local_8 = (0 << 8);
  FUN_005151c4();
  local_8 = -1;
  FUN_005151d3();
  FUN_005151e6();
  return;
}


 export function FUN_0051516a ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00515179 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00515188 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00515197 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_005151a6 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_005151b5 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_005151c4 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005151d3 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_005151e6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005151f4 (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  let pCVar3;
  let pCVar4;
  // in_ECX promoted to parameter;
  let local_a8;
  let local_a4;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_005bcaa7(DAT_ffffffdc);
  FUN_004aef20(DAT_ffffff5c);
  FUN_0043c840(DAT_ffffff5c, s_civ2\mk.dll_00631aa0);
  iVar1 = FUN_00564713(DAT_ffffff5c);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else {
    FUN_004502e0(DAT_ffffff5c);
    w32((in_ECX + 0x6c4), 0, param_1);
    FUN_005c5fc4(DAT_00631aac, 0x800, local_24, local_20, (local_1c - local_24), ((local_18 - local_20) + 5), DAT_006a8c00, DAT_006553d8);
    FUN_00419ba0(0);
    FUN_005bb4ae(DAT_00631ab0, 0x800, 0, 0, 0x280, 0x1e0, (in_ECX + 0xb8), in_ECX);
    FUN_00450400();
    FUN_005bf5e1(0x2711, 0xa, 0xec, (in_ECX + 0xb8));
    FUN_005cedad((in_ECX + 0x600), 8, 0, 0, 0x129, 0xad);
    FUN_005bf5e1(0x2710, 0xa, 0xec, (in_ECX + 0xb8));
    FUN_006e7d90(DAT_ffffffec, 0, 0, 0x280, 0x1e0);
    FUN_005c0593((in_ECX + 0x4ec), DAT_ffffffec, DAT_ffffffec);
    FUN_006e7d90((in_ECX + 0x6dc), 0xc1, 0x173, 0x1c0, 0x1cd);
    pCVar3 = GetActiveView((in_ECX + 0x600));
    pCVar4 = GetActiveView((in_ECX + 0x600));
    FUN_005bd65c(pCVar4, pCVar3);
    FUN_005c0593(DAT_006aad58, (in_ECX + 0x6dc), (in_ECX + 0x6dc));
    (u8(DAT_00655142[local_a8]) !== (param_1 & 0xff)) (local_a8 = 0;
        (local_a8 = (local_a8 < 0xc) && (DAT_00655142 = DAT_00655142));
        local_a8 = (local_a8 + 1)) {
    }
    DAT_00631a9c = 0;
    FUN_00515999(local_a8);
    w32((in_ECX + 0x6fc), 0, 0x133);
    FUN_006e7d90((in_ECX + 0x6cc), 0xab, s32((in_ECX + 0x6fc), 0), 0x1d4, (s32((in_ECX + 0x6fc), 0) + 0xad));
    FUN_00515dc8(0);
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_00515516 (in_ECX)

 {
  let DVar1;
  let iVar2;
  let pcVar3;
  let extraout_EAX;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar4;
  let local_120;
  let local_11c;
  let local_1c;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00515981;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0043c690();
  local_8 = 0;
  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0xb8));
  FUN_004085f0();
  FUN_00419b80();
  FUN_00414ce0();
  (local_120 < 0xc) (local_120 = 0; local_120 = (local_120 < 0xc); local_120 = (local_120 + 1)) {
    if ((DAT_00655142[local_120] === _MEM[(in_ECX + 0x6c4)])) {
      FUN_00515999(local_120);
      DAT_00631a9c = 1;
      FUN_00515c15(local_120);
      DVar1 = FUN_006e7f58();
      FUN_0046e020((((u8(DAT_0065514e[local_120]) + DAT_006d1168) & 7) + 0x53), 1, 0, 0)
      ;
      FUN_00516005();
      FUN_0046e287(0x3c);
      do {
        FUN_00407ff0();
        local_1c = FUN_006e7f58();
        if ((2 < DAT_00655b02)) {
          FUN_0047e94e(1, 0);
        }
      } while (((local_1c - DVar1) < 0x1b58)) FUN_00515999(local_120) FUN_00515f3c() FUN_0046e287(0x3c) FUN_005c041f(0) FUN_006e7d90((in_ECX + 0x6dc), 0, 0, 0x280, 0x1e0) FUN_005683c5((in_ECX + 0x4ec), (in_ECX + 0x6dc), 4, 4) FUN_005bf5e1(0x2712, 0xa, 0xec, (in_ECX + 0xb8)) FUN_005baec8((in_ECX + 0x700)) FUN_005baee0(0x7c, 0x81, 1, 1) FUN_0040bbb0() FUN_004aef20(DAT_fffffee4) iVar2 = FUN_004a2379(DAT_006558e8, DAT_00631ab4) {
    while ((_MEM[pcVar3] !== 0x40)) pcVar3 = FUN_004a23fc(1) pcVar3 = _MEM[pcVar3] {
      FUN_0043c840(DAT_fffffee4, DAT_00673f14);
      FUN_0043c840(DAT_fffffee4, DAT_00631abc);
    }
    FUN_005bb024((in_ECX + 0x4ec), DAT_fffffee4, 0, 0x48, 0x280);
  }
  FUN_005683c5((in_ECX + 0x4ec), (in_ECX + 0x6dc), 4, 3);
  FUN_0040bbb0();
  FUN_0040bc10(0x1c8);
  FUN_0043c6c0(0, 0x10, 3);
  FUN_005baec8(DAT_ffffffe8);
  uVar4 = 0x280;
  local_18 = DAT_ffffffe8;
  FUN_005bb024((in_ECX + 0x4ec), DAT_00679640, 0, (0x1dc - extraout_EAX), uVar4);
  FUN_00408490((in_ECX + 0x6dc));
  in_ECX = (in_ECX + 0x544);
  FUN_00408130(LAB_00401334);
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x534);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x534);
  FUN_00414d40();
  FUN_004503d0();
  FUN_00419b80();
  FUN_00450390(DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
  local_8 = -1;
  FUN_00515978();
  FUN_0051598b();
  return;
}


 export function FUN_00515978 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0051598b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00515999 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((DAT_00631a9c === 0)) {
    FUN_005c0593((in_ECX + 0x600), (in_ECX + 0x6dc), (in_ECX + 0x6dc));
    FUN_0040bbb0();
    FUN_0040bbe0((DAT_0065515a + param_1 * 0x18));
    FUN_005c19ad(0x21);
    FUN_006e7da4((in_ECX + 0x6dc), 1, 1);
    FUN_005c1167((in_ECX + 0x700), DAT_00679640, (in_ECX + 0x6dc), 0);
    FUN_005c19ad(0x10);
    FUN_006e7da4((in_ECX + 0x6dc), -1, -1);
    FUN_005c1167((in_ECX + 0x700), DAT_00679640, (in_ECX + 0x6dc), 0);
  }
  else {
    FUN_005c0593((in_ECX + 0x600), (in_ECX + 0x6dc), (in_ECX + 0x6dc));
    FUN_0040bbb0();
    FUN_0040bbe0((DAT_0065515a + param_1 * 0x18));
    FUN_0040fe40();
    FUN_0040fe10();
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x71c), 0));
    FUN_0040bbe0(uVar1);
    FUN_0040fe10();
    uVar1 = FUN_00484fec(((s16((DAT_0065512a + param_1 * 2), 0)) << 16 >> 16));
    FUN_00421f10(uVar1);
    FUN_005c19ad(0x21);
    FUN_006e7da4((in_ECX + 0x6dc), 1, 1);
    FUN_005c1167((in_ECX + 0x700), DAT_00679640, (in_ECX + 0x6dc), 0);
    FUN_005c19ad(0x10);
    FUN_006e7da4((in_ECX + 0x6dc), -1, -1);
    FUN_005c1167((in_ECX + 0x700), DAT_00679640, (in_ECX + 0x6dc), 0);
    FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x6dc), (in_ECX + 0x6dc));
    FUN_00408490((in_ECX + 0x6dc));
    DAT_00631a9c = 0;
  }
  FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x6dc), (in_ECX + 0x6dc));
  return;
}


 export function FUN_00515c15 (in_ECX, unaff_ESI, param_1)

 {
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_55c;
  let local_54c;
  let local_504;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00515dae;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x6ec), (in_ECX + 0x6ec));
  FUN_005bf5e1((u8(DAT_0065514e[param_1]) + 0xdc), 0xa, 0xec, DAT_fffffbbc);
  FUN_005c6b63(DAT_fffffafc, 0x2a, 0x40);
  FUN_005c6da8(0x2a, 0x40, DAT_fffffafc);
  FUN_005c0cc5((in_ECX + 0xb8));
  FUN_005cedad(DAT_fffffab4, 9, 1, 1, 0xe1, 0x113);
  FUN_005cef31(DAT_fffffaa4, (in_ECX + 0x4ec), 0xd0, 0x39);
  FUN_006e7d90((in_ECX + 0x6ec), 0xd0, 0x39, 0x1b1, 0x14c);
  local_8 = (((local_8) >> 8) << 8);
  FUN_00515d96();
  local_8 = -1;
  FUN_00515da2();
  FUN_00515db8(unaff_ESI);
  return;
}


 export function FUN_00515d96 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00515da2 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00515db8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00515dc8 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_44;
  let local_34;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = s32((in_ECX + 0x6cc), 0);
  local_10 = s32((in_ECX + 0x6d0), 0);
  local_c = s32((in_ECX + 0x6d4), 0);
  local_8 = s32((in_ECX + 0x6d8), 0);
  if ((param_1 < 0)) {
    local_10 = (local_10 - param_1);
  }
  else {
    local_8 = (local_8 + param_1);
  }
  FUN_005c0593((in_ECX + 0x4ec), DAT_ffffffec, DAT_ffffffec);
  FUN_005cef31(DAT_ffffffcc, (in_ECX + 0x4ec), 0xd0, 0x39);
  if ((0 < param_1)) {
    local_24 = s32((in_ECX + 0x6ec), 0);
    local_1c = s32((in_ECX + 0x6f4), 0);
    local_20 = s32((in_ECX + 0x6fc), 0);
    local_18 = (s32((in_ECX + 0x6fc), 0) + param_1);
    FUN_005c0593((in_ECX + 0x4ec), DAT_ffffffdc, DAT_ffffffdc);
  }
  FUN_005cef31(DAT_ffffffbc, (in_ECX + 0x4ec), 0xab, (s32((in_ECX + 0x6fc), 0) + param_1));
  FUN_006e7da4((in_ECX + 0x6cc), 0, param_1);
  if ((local_10 < 1)) {
    local_10 = 0;
  }
  FUN_00408490(DAT_ffffffec);
  w32((in_ECX + 0x6fc), 0, (s32((in_ECX + 0x6fc), 0) + param_1));
  return;
}


 export function FUN_00515f3c (in_ECX)

 {
  let DVar1;
  // in_ECX promoted to parameter;
  let local_10;

  FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x6ec), (in_ECX + 0x6ec));
  FUN_005d6a2c();
  FUN_0046e020(0x6f, 1, 0, 0);
  DVar1 = FUN_006e7f58();
  while ((s32((in_ECX + 0x6fc), 0) < 0x133)) local_10 = DVar1 in_ECX = (in_ECX + 0x6fc) {
    FUN_00515dc8(0xf);
    do {
      FUN_00407ff0();
      DVar1 = FUN_006e7f58();
      if ((2 < DAT_00655b02)) {
        FUN_0047e94e(1, 0);
      }
    } while (((DVar1 - local_10) < 0x16)) return


 export function FUN_00516005 (in_ECX)

 {
  // in_ECX promoted to parameter;

  while ((-0xad < s32((in_ECX + 0x6fc), 0))) -0xad = (-0xad < s32((in_ECX + 0x6fc), 0)) {
    FUN_00407ff0();
    FUN_00515dc8(-4);
  }
  return;
}


 export function FUN_00516042 ()

 {
  DAT_00631a98 = (DAT_00631a98 + 0x534);
  return;
}


 export function FUN_00516063 (param_1)

 {
  if ((param_1 < 0xd3)) param_1 = (param_1 < 0xd3) {
    DAT_00631a98 = (DAT_00631a98 + 0x534);
  }
  return;
}


 export function FUN_00516570 (param_1, param_2)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00516602;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  DAT_00631ad0 = 1;
  FUN_0051661a();
  local_8 = 0;
  FUN_0046e6a9();
  iVar1 = FUN_00516947(param_1, param_2);
  if ((iVar1 !== 0)) {
    FUN_00516fd4();
  }
  FUN_0046e6c8();
  DAT_00631ad0 = 0;
  local_8 = -1;
  FUN_005165f6();
  FUN_0051660c();
  return;
}


 export function FUN_005165f6 ()

 {
  FUN_005167d9();
  return;
}


 export function FUN_0051660c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051661a (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005167c0;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_005dd010();
  local_8 = 1;
  FUN_0059db08(0x4000);
  local_8 = 2;
  FUN_004502b0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_0040f3e0();
  local_8 = 5;
  FUN_0040f3e0();
  local_8 = 6;
  FUN_0040f3e0();
  local_8 = 7;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 8);
  FUN_0040f3e0();
  w32(in_ECX, 0, PTR_FUN_0061d6d8);
  w32(in_ECX, 0x46b, 0xb0);
  w32(in_ECX, 0x39c, 0);
  DAT_00631acc = in_ECX;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005167d9 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0051692f;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d6d8);
  local_8 = 0;
  DAT_00631acc = 0;
  local_8 = 8;
  FUN_0051689f();
  local_8 = 7;
  FUN_005168ae();
  local_8 = 6;
  FUN_005168bd();
  local_8 = 5;
  FUN_005168cc();
  local_8 = 4;
  FUN_005168db();
  local_8 = 3;
  FUN_005168ea();
  local_8 = 2;
  FUN_005168f9();
  local_8 = 1;
  FUN_00516908();
  local_8 = (0 << 8);
  FUN_00516917();
  local_8 = -1;
  FUN_00516926();
  FUN_00516939();
  return;
}


 export function FUN_0051689f ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168ae ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168bd ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168cc ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168db ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168ea ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005168f9 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00516908 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00516917 ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_00516926 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_00516939 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00516947 (in_ECX, param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_90;
  let local_8c;
  let local_88;
  let local_8;

  w32((in_ECX + 0xe6c), 0, param_1);
  uVar2 = FUN_00568861(s32((in_ECX + 0xe6c), 0));
  w32((in_ECX + 0xe54), 0, uVar2);
  FUN_005bb4ae(DAT_00631ad4, 0xc02, 0, 0, (DAT_0063359c * 6 + 0x1c2), ((DAT_00633598 * 2 + DAT_00633588) + 0xfc), DAT_006ab6a8, DAT_006553d8);
  FUN_00497d00(DAT_00633598);
  FUN_005d8236(DAT_006cec90);
  FUN_00517673();
  FUN_00517158();
  FUN_005bb574();
  (local_90 < 5) (local_90 = 0; local_90 = (local_90 < 5); local_90 = (local_90 + 1)) {
    uVar2 = FUN_00518582(s32((in_ECX + 0xe6c), 0), local_90);
    w32(((in_ECX + 0xe58) + local_90 * 4), 0, uVar2);
  }
  if ((param_2 !== 0)) {
    while ((DAT_00631edc === 6)) {
      iVar3 = FUN_00421ea0(s_COUNCILCHEAT0_00631ad8);
      iVar4 = DAT_00631edc;
      if ((DAT_00631edc === 0)) DAT_00631edc = (DAT_00631edc === 0) goto LAB_00516b87; break; bVar1 = 0 bVar1 = (!bVar1) {
        iVar3 = FUN_00518ec0(s_COUNCILCHEAT1_00631ae8, 0, DAT_ffffff74);
        if ((iVar3 !== 0)) {
          return 0;
        }
        if ((local_8c < 7)) local_8c = (local_8c < 8) iVar4 = (iVar4 !== 5) local_8c = (local_8c < 7) {
          w32(((in_ECX + 0xe54) + iVar4 * 4), 0, local_8c);
          bVar1 = 1;
        }
      }
    }
    w32((in_ECX + 0xe70), 0, 1);
 LAB_00516b87: :
    bVar1 = 0;
    while ((iVar4 === 0)) bVar1 = (!bVar1) iVar4 = FUN_00518ec0(s_COUNCILCHEAT2_00631af8, 0, DAT_ffffff74) iVar4 = (iVar4 === 0) {
      if ((local_8c < 3)) local_8c = (local_8c < 3) {
        w32((in_ECX + 0xe54), 0, local_8c);
        bVar1 = 1;
      }
    }
  }
  if ((DAT_0064c6b5[s32((in_ECX + 0xe6c), 0) * 0x594] === 0)) {
    w32((in_ECX + 0xe70), 0, 1);
  }
  else {
    (local_90 < 5) (local_90 = 0; local_90 = (local_90 < 5); local_90 = (local_90 + 1)) {
      FUN_004aef20(((local_90 * 3 + in_ECX) + 0xe74));
    }
    FUN_0043c840((in_ECX + 0xe74), DAT_00631b08);
    FUN_0043c840((in_ECX + 0xe77), DAT_00631b0c);
    FUN_0043c840((in_ECX + 0xe7a), DAT_00631b10);
    FUN_0043c840((in_ECX + 0xe7d), DAT_00631b14);
    FUN_0043c840((in_ECX + 0xe80), DAT_00631b18);
    (local_90 < 5) (local_90 = 0; local_90 = (local_90 < 5); local_90 = (local_90 + 1)) {
      FUN_004af1d5(((local_90 * 3 + in_ECX) + 0xe74), s32(((in_ECX + 0xe58) + local_90 * 4), 0));
    }
  }
  if ((s32((in_ECX + 0xe70), 0) !== 0)) {
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
  }
  FUN_004aef20((in_ECX + 0xe34));
  FUN_0040bbb0();
  if ((s32((in_ECX + 0xe70), 0) === 0)) {
    FUN_0040bbe0(s_council_00631b1c);
  }
  else {
    FUN_0040bbe0(s_anarchy_00631b24);
  }
  FUN_0040ff30(s32((in_ECX + 0xe54), 0));
  FUN_0043c840((in_ECX + 0xe34), DAT_00679640);
  if ((iVar4 === 0)) iVar4 = FUN_005179a3(0) iVar4 = (iVar4 === 0) {
    uVar2 = 0;
  }
  else {
    FUN_0059dfb9(in_ECX, in_ECX, (in_ECX + 0x11b0), 0x84008);
    FUN_005dd2e3(DAT_00631b2c, 0x200, 0, 0, in_ECX);
    FUN_004aef20(DAT_ffffff78);
    FUN_0043c840(DAT_ffffff78, s_civ2\video\_00631b30);
    FUN_0043c840(DAT_ffffff78, (in_ECX + 0xe34));
    FUN_0043c840(DAT_ffffff78, DAT_00631b3c);
    iVar4 = FUN_00564713(DAT_ffffff78);
    if ((iVar4 === 0)) {
      uVar2 = 0;
    }
    else {
      local_8 = FUN_005dd377(DAT_ffffff78);
      if ((local_8 === 0)) {
        FUN_005dd561(DAT_006ab6a8);
        FUN_00450390(DAT_006ab6a8);
        in_ECX = (in_ECX + 0x114);
        FUN_00518007();
        uVar2 = 1;
      }
      else {
        if ((local_8 === -0x7ffbfeac)) {
          FUN_00421ea0(s_VFWNOTREGISTERED_00631b44);
        }
        uVar2 = 0;
      }
    }
  }
  return uVar2;
}


 export function FUN_00516fd4 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0059d3b1(DAT_006ab6a8);
  FUN_0046efd6();
  FUN_00450390(DAT_006ab6a8);
  FUN_00450400();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040f380();
  FUN_0040bc80(0);
  FUN_004085f0();
  FUN_00419b80();
  if ((s32((in_ECX + 0xe70), 0) !== 0)) {
    FUN_00518e80((DAT_0063359c + 1), (DAT_00633598 + 1));
    FUN_004085f0();
    FUN_00419b80();
    FUN_005dd3c2();
  }
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x48);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x48);
  FUN_005d6a2c();
  FUN_00517158();
  FUN_004503d0();
  FUN_00419b80();
  FUN_0059db65();
  FUN_00450390(DAT_006a8c00);
  FUN_0046f06f();
  FUN_0059d3b1(DAT_006a8c00);
  return;
}


 export function FUN_00517158 (in_ECX)

 {
  let iVar1;
  let pCVar2;
  let iVar3;
  let pCVar4;
  let iVar5;
  let pCVar6;
  let lprcSrc;
  let uVar7;
  // in_ECX promoted to parameter;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  iVar1 = (DAT_00633598 + DAT_00633588 * -2);
  pCVar2 = GetActiveView(in_ECX);
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, DAT_00633588, pCVar2, iVar1, 0, DAT_00633588);
  iVar3 = ((DAT_00633588 + DAT_00633598) + 0x7a);
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, iVar3, pCVar2, iVar1, 0, iVar3);
  pCVar4 = GetActiveView(in_ECX);
  iVar1 = (pCVar4 - (DAT_00633588 + 0x1e));
  FUN_005a9b5d(in_ECX, DAT_006abae0, 0, iVar1, pCVar2, 0x1e, 0, iVar1);
  pCVar2 = GetActiveView(in_ECX);
  iVar3 = (DAT_0063359c + DAT_00633588 * -2);
  FUN_005a9b5d(in_ECX, DAT_006abae0, DAT_00633588, 0, iVar3, pCVar2, DAT_00633588, 0);
  pCVar4 = GetActiveView(in_ECX);
  iVar1 = (pCVar4 - (DAT_00633588 + iVar3));
  FUN_005a9b5d(in_ECX, DAT_006abae0, iVar1, 0, iVar3, pCVar2, iVar1, 0);
  iVar1 = DAT_00633588 * 2;
  local_1c = ((DAT_00633588 + DAT_0063359c) + 0x5a);
  iVar5 = (DAT_00633598 - DAT_00633588);
  (local_20 < 4) (local_20 = 0; local_20 = (local_20 < 4); local_20 = (local_20 + 1)) {
    FUN_005a9b5d(in_ECX, DAT_006abae0, local_1c, iVar5, iVar3, (iVar1 + 0x7a), local_1c, iVar5);
    local_1c = (local_1c + (DAT_0063359c + 0x5a));
  }
  FUN_006e7d90(DAT_ffffffec, (DAT_0063359c - DAT_00633588), iVar5, ((DAT_00633588 * 2 + (DAT_0063359c - DAT_00633588)) + 0x5a), ((DAT_00633588 * 2 + iVar5) + 0x7a));
  (local_20 < 5) (local_20 = 0; local_20 = (local_20 < 5); local_20 = (local_20 + 1)) {
    (local_18 < DAT_00633588) (local_18 = 0; local_18 = (local_18 < DAT_00633588); local_18 = (local_18 + 1)) {
      FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00633594, DAT_00633590);
      FUN_006e7d60(DAT_ffffffec, -1, -1);
    }
    FUN_005c0333(DAT_ffffffec, 0xa);
    FUN_006e7d60(DAT_ffffffec, DAT_00633588, DAT_00633588);
    FUN_006e7da4(DAT_ffffffec, (DAT_0063359c + 0x5a), 0);
  }
  pCVar2 = GetActiveView(in_ECX);
  pCVar2 = (pCVar2 + (-30 - DAT_00633588));
  pCVar4 = GetActiveView(in_ECX);
  pCVar4 = (pCVar4 + (DAT_00633588 - DAT_0063359c));
  pCVar6 = GetActiveView(in_ECX);
  FUN_006e7d90((in_ECX + 0x11b0), (DAT_0063359c - DAT_00633588), (pCVar6 + (DAT_00633588 * -3 + -0x82)), pCVar4, pCVar2);
  (local_18 < DAT_00633588) (local_18 = 0; local_18 = (local_18 < DAT_00633588); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, (in_ECX + 0x11b0), DAT_00633594, DAT_00633590);
    FUN_006e7d60((in_ECX + 0x11b0), -1, -1);
  }
  FUN_005c0333((in_ECX + 0x11b0), 0x1d);
  FUN_006e7d60((in_ECX + 0x11b0), -2, -2);
  lprcSrc = FUN_00497c90();
  FUN_006e7d68(DAT_ffffffec, lprcSrc);
  (local_18 < DAT_00633588) (local_18 = 0; local_18 = (local_18 < DAT_00633588); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00633590, DAT_00633594);
    FUN_006e7d60(DAT_ffffffec, -1, -1);
  }
  FUN_0040bbb0();
  if ((DAT_00628064 === 1)) {
    uVar7 = FUN_00428b0c(s32((DAT_00628420 + 0x4ac), 0));
    FUN_0040bbe0(uVar7);
    FUN_0040fe10();
    uVar7 = FUN_00410070(s32((in_ECX + 0xe6c), 0));
    FUN_0040bbe0(uVar7);
  }
  else {
    uVar7 = FUN_00410070(s32((in_ECX + 0xe6c), 0));
    FUN_0040bbe0(uVar7);
    if ((DAT_00628064 === 2)) {
      FUN_0040bbe0(DAT_00631b58);
    }
    FUN_0040fe10();
    uVar7 = FUN_00428b0c(s32((DAT_00628420 + 0x4ac), 0));
    FUN_0040bbe0(uVar7);
  }
  pCVar2 = GetActiveView(in_ECX);
  iVar3 = FUN_0040efd0(DAT_00679640);
  iVar1 = DAT_00633588;
  iVar3 = ((pCVar2 - iVar3) / 2 | 0);
  iVar5 = (DAT_00633588 + 1);
  FUN_005c19ad(0xa);
  FUN_005c0f57(DAT_006ab190, DAT_00679640, (iVar3 + 1), (iVar1 + 2), 5);
  FUN_005c19ad(0x1a);
  FUN_005c0f57(DAT_006ab190, DAT_00679640, iVar3, iVar5, 5);
  return;
}


 export function FUN_00517673 (in_ECX)

 {
  let iVar1;
  let uVar2;
  let pCVar3;
  let pCVar4;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_14;

  iVar1 = (((DAT_00633598 + -22) >> 1) + DAT_00633598);
  FUN_006e7d90(DAT_ffffffec, (DAT_0063359c + 7), (iVar1 + 0x79), (DAT_0063359c + 0x52), (iVar1 + 0x8f));
  if ((in_ECX === 0)) {
    local_20 = 0;
  }
  else {
    local_20 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x26c), 0));
  FUN_00497d40(local_20, 0, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  FUN_006e7da4(DAT_ffffffec, (DAT_0063359c + 0x5a), 0);
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x16c), 0));
  FUN_00497d40(local_24, 1, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  FUN_006e7da4(DAT_ffffffec, (DAT_0063359c + 0x5a), 0);
  if ((in_ECX === 0)) {
    local_28 = 0;
  }
  else {
    local_28 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x114), 0));
  FUN_00497d40(local_28, 2, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  FUN_006e7da4(DAT_ffffffec, (DAT_0063359c + 0x5a), 0);
  if ((in_ECX === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x6e0), 0));
  FUN_00497d40(local_2c, 3, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  FUN_006e7da4(DAT_ffffffec, (DAT_0063359c + 0x5a), 0);
  if ((in_ECX === 0)) {
    local_30 = 0;
  }
  else {
    local_30 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x6e4), 0));
  FUN_00497d40(local_30, 4, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  pCVar3 = GetActiveView(in_ECX);
  pCVar3 = (pCVar3 + (-1 - DAT_00633588));
  pCVar4 = GetActiveView(in_ECX);
  iVar1 = (pCVar4 - DAT_0063359c);
  pCVar4 = GetActiveView(in_ECX);
  FUN_006e7d90(DAT_ffffffec, DAT_0063359c, (pCVar4 + -29), iVar1, pCVar3);
  if ((in_ECX === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_00497d40(local_34, 0xca, DAT_ffffffec, 0x21, uVar2);
  FUN_0040f880(LAB_00401b22);
  return;
}


 export function FUN_005179a3 (in_ECX, param_1)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let puVar5;
  let iVar6;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_18;
  let local_10;
  let local_8;

  local_10 = 0;
  local_8 = 0;
  if ((4 < param_1)) {
    return 0;
  }
  iVar3 = FUN_004a2379((in_ECX + 0xe34), ((param_1 * 3 + in_ECX) + 0xe74));
  if ((iVar3 !== 0)) {
    return 0;
  }
  iVar3 = FUN_004a23fc(1);
  if ((iVar3 !== 0)) {
    (local_1c < 5) (local_1c = 0; local_1c = (local_1c < 5); local_1c = (local_1c + 1)) {
      w32(((in_ECX + 0xe84) + local_1c * 4), 0, 0);
    }
    w32((in_ECX + 0xe84), 0, param_1);
    uVar4 = FUN_004a2534();
    w32((in_ECX + 0xe90), 0, uVar4);
    uVar4 = FUN_004a2534();
    w32((in_ECX + 0xe9c), 0, uVar4);
    FUN_004aef20((in_ECX + 0xea8));
    FUN_004d007e(DAT_00673f14);
    FUN_0043c840((in_ECX + 0xea8), DAT_00673f14);
    local_18 = 1;
    bVar2 = 1;
    bVar1 = 0;
 LAB_00517ae5: :
    if ((s32(((in_ECX + 0xe84) + local_18 * 4), 0) === -1)) in_ECX = (in_ECX + 0xe84) goto LAB_00517dae; iVar3 = FUN_004a23fc(1) iVar3 = (iVar3 === 0) goto LAB_00517db5; bVar1 = 0 puVar5 = FUN_004a24b1() {
    case 0x23 :
      bVar1 = bVar2;
      goto LAB_00517ae5;
    case 0x3b :
      goto LAB_00517ae5;
    case 0x41 :
    case 0x61 :
      param_1 = 4;
      break;
    case 0x45 :
    case 0x65 :
      w32(((in_ECX + 0xe84) + local_18 * 4), 0, -1);
      goto LAB_00517ae5;
    case 0x46 :
    case 0x66 :
      param_1 = 3;
      break;
    case 0x4d :
    case 0x6d :
      param_1 = 0;
      break;
    case 0x52 :
    case 0x72 :
      goto switchD_00517c0c_caseD_52;
    case 0x53 :
    case 0x73 :
      param_1 = 1;
      break;
    case 0x54 :
    case 0x74 :
      param_1 = 2;
    }
    if (((local_10 & (1 << (((param_1) & 0xFF) & 0x1f))) === 0)) {
      if ((iVar3 === s32(((in_ECX + 0xe58) + param_1 * 4), 0))) iVar3 = _atoi((puVar5 + 1)) iVar3 = (iVar3 === s32(((in_ECX + 0xe58) + param_1 * 4), 0)) {
        w32(((in_ECX + 0xe84) + local_18 * 4), 0, param_1);
        uVar4 = FUN_004a2534();
        w32(((in_ECX + 0xe90) + local_18 * 4), 0, uVar4);
        uVar4 = FUN_004a2534();
        w32(((in_ECX + 0xe9c) + local_18 * 4), 0, uVar4);
        FUN_004aef20(((local_18 * 0xff + in_ECX) + 0xea8));
        FUN_004d007e(DAT_00673f14);
        if ((_MEM[DAT_00673f14] !== 0x2a)) {
          FUN_0043c840(((local_18 * 0xff + in_ECX) + 0xea8), DAT_00673f14);
        }
        local_18 = (local_18 + 1);
        bVar2 = 1;
        local_10 = (local_10 | (1 << (((param_1) & 0xFF) & 0x1f)));
      }
      else {
        bVar2 = 0;
      }
    }
    else {
      bVar2 = 0;
    }
    goto LAB_00517ae5;
  }
 LAB_00517db5: :
  FUN_004a2020();
  return local_8;
 LAB_00517dae: :
  local_8 = 1;
  goto LAB_00517db5;
 switchD_00517c0c_caseD_52: :
  iVar3 = _atoi((puVar5 + 1));
  iVar6 = FUN_0059a791(1, 0xa);
  if ((iVar6 <= iVar3)) {
    bVar2 = 0;
  }
  bVar1 = (!(iVar6 <= iVar3));
  goto LAB_00517ae5;
}


 export function FUN_00517dd3 (in_ECX, unaff_ESI, param_1)

 {
  let extraout_EAX;
  let iVar1;
  let extraout_EAX_00;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_28;
  let local_20;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00517fed;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0043c460(0, 0xe);
  local_8 = 0;
  if ((2 < s32((in_ECX + 0x11a8), 0))) 2 = (2 < s32((in_ECX + 0x11a8), 0)) {
    local_8 = -1;
    FUN_00517fe4();
    FUN_00517ff7(unaff_ESI);
    return;
  }
  if ((param_1 !== 1)) {
    FUN_005c0333((in_ECX + 0x11b0), 0x1d);
    w32((in_ECX + 0x11ac), 0, 2);
  }
  if ((param_1 === -1)) {
    FUN_005bb574();
    local_8 = -1;
    FUN_00517fe4();
    FUN_00517ff7(unaff_ESI);
    return;
  }
  local_20 = s32((in_ECX + 0x11bc), 0);
  local_20 = (s32((in_ECX + 0x11b0), 0) + 2);
  local_20 = (s32((in_ECX + 0x11b8), 0) + -2);
  local_20 = (s32((in_ECX + 0x11b4), 0) + s32((in_ECX + 0x11ac), 0));
  FUN_0059e472(DAT_ffffffd8);
  if ((_MEM[((s32((in_ECX + 0x11a8), 0) * 0xff + 0xea8) + in_ECX)] !== 0)) {
    FUN_006e7da4(DAT_ffffffe0, 1, 1);
    FUN_005c19ad(0x25);
    FUN_005c1167(DAT_ffffffd8, ((s32((in_ECX + 0x11a8), 0) * 0xff + in_ECX) + 0xea8), DAT_ffffffe0, 1);
    FUN_006e7da4(DAT_ffffffe0, -1, -1);
    FUN_005c19ad(0xa);
    FUN_005c1167(DAT_ffffffd8, ((s32((in_ECX + 0x11a8), 0) * 0xff + in_ECX) + 0xea8), DAT_ffffffe0, 1);
    local_28 = DAT_ffffffd8;
    w32((in_ECX + 0x11ac), 0, (s32((in_ECX + 0x11ac), 0) + extraout_EAX));
    iVar1 = FUN_0040efd0(((s32((in_ECX + 0x11a8), 0) * 0xff + in_ECX) + 0xea8));
    if ((((s32((in_ECX + 0x11b8), 0) + -2) - (s32((in_ECX + 0x11b0), 0) + 2)) < iVar1)) right left {
      local_28 = DAT_ffffffd8;
      w32((in_ECX + 0x11ac), 0, (s32((in_ECX + 0x11ac), 0) + extraout_EAX_00));
    }
  }
  FUN_005bb574();
  FUN_00419b80();
  local_8 = -1;
  FUN_00517fe4();
  FUN_00517ff7(unaff_ESI);
  return;
}


 export function FUN_00517fe4 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00517ff7 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00518007 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_98;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005181c0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  if ((s32((in_ECX + 0xe70), 0) === 0)) {
    (local_98 < 5) (local_98 = 0; local_98 = (local_98 < 5); local_98 = (local_98 + 1)) {
      iVar1 = FUN_004a2379((in_ECX + 0xe34), ((local_98 * 3 + in_ECX) + 0xe74));
      if ((iVar1 !== 0)) {
        local_8 = (UNNAMED << 8);
        FUN_005181ab();
        local_8 = -1;
        FUN_005181b4();
        FUN_005181ca();
        return;
      }
      iVar1 = FUN_004a23fc(1);
      if ((iVar1 === 0)) {
        local_8 = (UNNAMED << 8);
        FUN_005181ab();
        local_8 = -1;
        FUN_005181b4();
        FUN_005181ca();
        return;
      }
      uVar2 = FUN_004a2534();
      FUN_005dd45d(uVar2);
      FUN_005dd64c(in_ECX, (((DAT_0063359c + 0x5a) * local_98 + DAT_0063359c) + 1), (DAT_00633598 + 1));
      FUN_004a2020();
    }
  }
  else {
    FUN_005dd45d(1);
    FUN_005dd64c(in_ECX, (DAT_0063359c + 2), (DAT_00633598 + 2));
  }
  local_8 = (UNNAMED << 8);
  FUN_005181ab();
  local_8 = -1;
  FUN_005181b4();
  FUN_005181ca();
  return;
}


 export function FUN_005181ab ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_005181b4 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_005181ca (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005181d8 (param_1)

 {
  let iVar1;
  let iVar2;

  iVar1 = DAT_00631acc;
  _DAT_00631ac8 = 1;
  FUN_005d6a2c();
  FUN_005dd51d();
  if ((param_1 === 0xca)) {
    FUN_00517dd3(-1);
    FUN_00419b80();
    iVar1 = (iVar1 + 0x48);
  }
  else if ((s32((iVar1 + 0xe70), 0) === 0)) {
    FUN_00517dd3(-1);
    w32((iVar1 + 0x11a8), 0, 0);
    iVar2 = FUN_005179a3(param_1);
    if ((iVar2 === 0)) {
      FUN_00517dd3(-1);
      FUN_00419b80();
      iVar1 = (iVar1 + 0x48);
    }
    else {
      FUN_004503d0();
      FUN_00518342(param_1);
      if ((param_1 < 5)) {
        FUN_00517dd3(0);
        FUN_005dd45d(s32(((iVar1 + 0xe90) + s32((iVar1 + 0x11a8), 0) * 4), 0));
        FUN_004085f0();
        FUN_005dd3f1(s32(((iVar1 + 0xe90) + s32((iVar1 + 0x11a8), 0) * 4), 0), s32(((iVar1 + 0xe9c) + s32((iVar1 + 0x11a8), 0) * 4), 0));
        w32((iVar1 + 0x11a8), 0, (s32((iVar1 + 0x11a8), 0) + 1));
      }
      _DAT_00631ac8 = 0;
    }
  }
  return;
}


 export function FUN_00518342 (param_1)

 {
  if ((param_1 < 5)) {
    FUN_00518e80((((DAT_0063359c + 0x5a) * param_1 + DAT_0063359c) + 1), (DAT_00633598 + 1));
  }
  return;
}


 export function FUN_00518392 (param_1)

 {
  let uVar1;

  /* BRANCHIND */ (_MEM[param_1]) {
  case 0x41 :
  case 0x61 :
    uVar1 = 4;
    break;
  default :
    uVar1 = -1;
    break;
  case 0x46 :
  case 0x66 :
    uVar1 = 3;
    break;
  case 0x4d :
  case 0x6d :
    uVar1 = 0;
    break;
  case 0x53 :
  case 0x73 :
    uVar1 = 1;
    break;
  case 0x54 :
  case 0x74 :
    uVar1 = 2;
  }
  return uVar1;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_00518471 ()

 {
  let iVar1;

  iVar1 = DAT_00631acc;
  _DAT_00631ac8 = 1;
  if ((s32((DAT_00631acc + 0xe70), 0) === 0)) {
    FUN_004503d0();
    if ((-1 < s32(((iVar1 + 0xe84) + s32((iVar1 + 0x11a8), 0) * 4), 0))) -1 = (-1 < s32(((iVar1 + 0xe84) + s32((iVar1 + 0x11a8), 0) * 4), 0)) {
      FUN_00518342(s32(((iVar1 + 0xe84) + s32((iVar1 + 0x11a8), 0) * 4), 0));
      FUN_00517dd3(1);
      FUN_005dd45d(s32(((iVar1 + 0xe90) + s32((iVar1 + 0x11a8), 0) * 4), 0));
      FUN_004085f0();
      FUN_005dd3f1(s32(((iVar1 + 0xe90) + s32((iVar1 + 0x11a8), 0) * 4), 0), s32(((iVar1 + 0xe9c) + s32((iVar1 + 0x11a8), 0) * 4), 0));
      w32((iVar1 + 0x11a8), 0, (s32((iVar1 + 0x11a8), 0) + 1));
    }
  }
  FUN_00419b80();
  _DAT_00631ac8 = 0;
  return;
}


 export function FUN_00518582 (param_1, param_2)

 {
  let local_8;

  if ((DAT_00631acc !== 0)) {
    local_8 = s32((DAT_00631acc + 0xe54), 0);
  }
  /* BRANCHIND */ () {
  case 0 :
    FUN_004bc480(param_1, local_8);
    break;
  case 1 :
    FUN_004bc8aa(param_1, local_8);
    break;
  case 2 :
    FUN_004bcb9b(param_1, local_8);
    break;
  case 3 :
    FUN_004bcfcf(param_1, local_8);
    break;
  default :
    FUN_004bd2a3(param_1, local_8);
  }
  return;
}


 export function FUN_00518e80 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005bc4a1(s32((in_ECX + 8), 0), param_1, param_2);
  return;
}


 export function FUN_00518ec0 (param_1, param_2, param_3)

 {
  FUN_0051d75d(DAT_006359d4, param_1, param_2, param_3);
  return;
}


 export function FUN_00518f00 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xd90), 0) <= s32((in_ECX + 0x120), 0))) in_ECX = (in_ECX + 0xd90) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0xd90), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) DAT_006a85a4 = (DAT_006a85a4 % 9) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  (local_8 < s32((in_ECX + 0xd90), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0xd90), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0xdb0) + local_8 * 4), 0));
  }
  FUN_0040fd40(0, (s32((in_ECX + 0x1b34), 0) / 9 | 0));
  FUN_0040fcf0((s32((in_ECX + 0x1f3c), 0) / 9 | 0));
  if ((s32((in_ECX + 0x1b34), 0) < 1)) {
    w32((in_ECX + 0x1f3c), 0, -1);
  }
  FUN_00451bf0();
  FUN_004923c0();
  FUN_004518d0();
  FUN_004f6646();
  return;
}


 export function FUN_005190d0 ()

 {
  FUN_005190ea();
  FUN_00519109();
  return;
}


 export function FUN_005190ea ()

 {
  FUN_0059db08(0x4000);
  return;
}


 export function FUN_00519109 ()

 {
  _atexit(FUN_00519126);
  return;
}


 export function FUN_00519126 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00519140 ()

 {
  if ((DAT_00631b78 !== 0)) {
    FUN_0059db65();
    FUN_00419b80();
  }
  return;
}


 export function FUN_00519171 (param_1)

 {
  let iVar1;

  FUN_00519140();
  DAT_00631b78 = 1;
  iVar1 = FUN_0040ffa0(param_1, 8);
  if ((iVar1 === 0)) {
    FUN_0040bc80(0);
    FUN_00419b80();
  }
  return;
}


 export function FUN_00519200 ()

 {
  let _Source;
  let _Count;
  let local_c;
  let local_8;

  (local_8 < 0x21) (local_8 = 0; local_8 = (local_8 < 0x21); local_8 = (local_8 + 1)) {
    _Count = 0x28;
    _Source = FUN_00428b0c(s32((DAT_00627cc4 + local_8 * 0x18), 0));
    _strncpy((DAT_006a1d88 + local_8 * 0x28), _Source, _Count);
    DAT_006a1daf[local_8 * 0x28] = 0;
    w32((DAT_006a2d28 + local_8 * 0x58), 0, s8(DAT_00627cc8[local_8 * 0x18]));
    w32((DAT_006a2d2c + local_8 * 0x58), 0, s8(DAT_00627cc9[local_8 * 0x18]));
    (local_c < 3) (local_c = 0; local_c = (local_c < 3); local_c = (local_c + 1)) {
      w32((DAT_006a2d30 + (local_c * 4 + local_8 * 0x58)), 0, s8(DAT_00627cca[(local_8 * 0x18 + local_c)]));
    }
    if ((local_8 < 0xb)) {
      (local_c < 2) (local_c = 0; local_c = (local_c < 2); local_c = (local_c + 1)) {
        w32((DAT_006a2d3c + (local_c * 0x10 + local_8 * 0x58)), 0, s8(DAT_00627cce[(local_8 * 0x18 + local_c)]));
        w32((DAT_006a2d40 + (local_c * 0x10 + local_8 * 0x58)), 0, s8(DAT_00627cd0[(local_8 * 0x18 + local_c)]));
        w32((DAT_006a2d44 + (local_c * 0x10 + local_8 * 0x58)), 0, s8(DAT_00627cd2[(local_8 * 0x18 + local_c)]));
        w32((DAT_006a2d48 + (local_c * 0x10 + local_8 * 0x58)), 0, s8(DAT_00627cd4[(local_8 * 0x18 + local_c)]));
      }
      w32((DAT_006a2d5c + local_8 * 0x58), 0, s8(DAT_00627ccd[local_8 * 0x18]));
    }
  }
  return;
}


 export function FUN_005193ed ()

 {
  let _Dest;
  let _Source;
  let _Count;
  let local_c;
  let local_8;

  (local_8 < 0x21) (local_8 = 0; local_8 = (local_8 < 0x21); local_8 = (local_8 + 1)) {
    _Count = 0xf;
    _Source = (DAT_006a1d88 + local_8 * 0x28);
    _Dest = FUN_00428b0c(s32((DAT_00627cc4 + local_8 * 0x18), 0));
    _strncpy(_Dest, _Source, _Count);
    DAT_00627cc8[local_8 * 0x18] = DAT_006a2d28[local_8 * 0x58];
    DAT_00627cc9[local_8 * 0x18] = DAT_006a2d2c[local_8 * 0x58];
    (local_c < 3) (local_c = 0; local_c = (local_c < 3); local_c = (local_c + 1)) {
      DAT_00627cca[(local_8 * 0x18 + local_c)] = DAT_006a2d30[(local_c * 4 + local_8 * 0x58)];
    }
    if ((local_8 < 0xb)) {
      (local_c < 2) (local_c = 0; local_c = (local_c < 2); local_c = (local_c + 1)) {
        DAT_00627cce[(local_8 * 0x18 + local_c)] = DAT_006a2d3c[(local_c * 0x10 + local_8 * 0x58)]
        ;
        DAT_00627cd0[(local_8 * 0x18 + local_c)] = DAT_006a2d40[(local_c * 0x10 + local_8 * 0x58)]
        ;
        DAT_00627cd2[(local_8 * 0x18 + local_c)] = DAT_006a2d44[(local_c * 0x10 + local_8 * 0x58)]
        ;
        DAT_00627cd4[(local_8 * 0x18 + local_c)] = DAT_006a2d48[(local_c * 0x10 + local_8 * 0x58)]
        ;
      }
      DAT_00627ccd[local_8 * 0x18] = DAT_006a2d5c[local_8 * 0x58];
    }
  }
  return;
}


 export function FUN_005195c4 (param_1)

 {
  if ((0x17 < param_1)) {
    param_1 = (param_1 + -1);
  }
  if ((0xc < param_1)) {
    param_1 = (param_1 + -1);
  }
  return param_1;
}


 export function FUN_005195f1 (param_1)

 {
  if ((0xc < param_1)) {
    param_1 = (param_1 + 1);
  }
  if ((0x17 < param_1)) {
    param_1 = (param_1 + 1);
  }
  return param_1;
}


 export function FUN_0051961e ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_8;

  (local_14 < 0xf) (local_14 = 1; local_14 = (local_14 < 0xf); local_14 = (local_14 + 1)) {
    if ((s32((DAT_00631bf8 + local_14 * 8), 0) === 9)) {
      iVar1 = FUN_00418740();
      _sprintf(DAT_fffffff0, DAT_00631cd0, s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0));
      FUN_00418a30(DAT_fffffff0);
    }
    else if ((s32((DAT_00631bf8 + local_14 * 8), 0) === 0xc)) {
      iVar1 = FUN_00418740();
      local_8 = s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0);
      if ((local_14 === 0)) {
        local_8 = FUN_005195c4(local_8);
      }
      if ((local_14 === 0xa)) local_14 = (local_14 === 0xa) {
        local_8 = (local_8 + 2);
      }
      if ((local_14 === 0xe)) {
        local_8 = (local_8 + 1);
      }
      FUN_00418d90(local_8);
    }
  }
  return;
}


 export function FUN_005197af ()

 {
  let iVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  (local_18 < 0xf) (local_18 = 1; local_18 = (local_18 < 0xf); local_18 = (local_18 + 1)) {
    if ((s32((DAT_00631bf8 + local_18 * 8), 0) === 9)) {
      FUN_00418a70(DAT_fffffff0);
      iVar1 = FUN_00418740();
      iVar1 = (iVar1 + -0xca);
      local_8 = _atoi(DAT_fffffff0);
      uVar2 = FUN_005adfa0(local_8, s32((DAT_00631c70 + iVar1 * 4), 0), s32((DAT_00631ca0 + iVar1 * 4), 0));
      w32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, uVar2);
      if ((s32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0) !== local_8)) {
        local_14 = (local_14 + 1);
      }
    }
    else if ((s32((DAT_00631bf8 + local_18 * 8), 0) === 0xc)) {
      local_8 = FUN_00418d60();
      if ((local_18 === 0)) {
        local_8 = FUN_005195f1(local_8);
      }
      if ((local_18 === 0xa)) local_18 = (local_18 === 0xa) {
        local_8 = (local_8 + -2);
      }
      if ((local_18 === 0xe)) {
        local_8 = (local_8 + -1);
      }
      iVar1 = FUN_00418740();
      w32((DAT_006a2a00 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, local_8);
    }
  }
  return local_14;
}


 export function FUN_005199a9 ()

 {
  FUN_0051b2b6();
  return;
}


 export function FUN_005199c4 (param_1, param_2)

 {
  if ((param_1 === -1)) {
    FUN_005f22e0(DAT_00679640, (DAT_00631cd4 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  else if ((param_1 === -2)) {
    FUN_005f22e0(DAT_00679640, (DAT_00631ce0 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  else if ((param_1 < 0xb)) {
    FUN_005f22e0(DAT_00679640, (DAT_00627cc0 + param_1 * 0x18));
    if ((param_2 !== 0)) {
      FUN_005f22e0(DAT_00679640, DAT_00631cec);
    }
  }
  else {
    FUN_005f22e0(DAT_00679640, (DAT_00631cf0 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  return;
}


 export function FUN_00519ab0 (param_1)

 {
  let pcVar1;
  let sVar2;
  let local_10;
  let local_c;
  let local_8;

  (local_c < 0x21) (local_c = 0; local_c = (local_c < 0x21); local_c = (local_c + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_00627cc4 + local_c * 0x18), 0));
    FUN_005f22e0(DAT_00679640, DAT_00631cfc);
    pcVar1 = FUN_00428b0c(s32((DAT_00627cc4 + local_c * 0x18), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0xb)) {
      pcVar1 = FUN_00428b0c(s32((DAT_00627cc4 + local_c * 0x18), 0));
      local_10 = _strlen(pcVar1);
    }
    else {
      local_10 = 0xb;
    }
    FUN_004190a0((0xb - local_10));
    FUN_0040ff30(s8(DAT_00627cc8[local_c * 0x18]));
    FUN_005f22e0(DAT_00679640, DAT_00631d00);
    FUN_0040ff30(s8(DAT_00627cc9[local_c * 0x18]));
    FUN_005f22e0(DAT_00679640, DAT_00631d04);
    FUN_004190a0(2);
    (local_8 < 3) (local_8 = 0; local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
      FUN_0040ff30(s8(DAT_00627cca[(local_c * 0x18 + local_8)]));
      FUN_005f22e0(DAT_00679640, DAT_00631d08);
    }
    if ((local_c < 0xb)) {
      (local_8 < 2) (local_8 = 0; local_8 = (local_8 < 2); local_8 = (local_8 + 1)) {
        FUN_004190a0(3);
        FUN_005199c4(s8(DAT_00627cce[(local_c * 0x18 + local_8)]), 1);
        FUN_004ccdb6(s8(DAT_00627cd0[(local_c * 0x18 + local_8)]));
        FUN_005f22e0(DAT_00679640, DAT_00631d0c);
        FUN_004ccdb6(s8(DAT_00627cd2[(local_c * 0x18 + local_8)]));
        FUN_005f22e0(DAT_00679640, DAT_00631d10);
        if ((local_8 === 1)) {
          FUN_0040fe10();
        }
        FUN_004ccdb6(s8(DAT_00627cd4[(local_c * 0x18 + local_8)]));
        FUN_005f22e0(DAT_00679640, DAT_00631d14);
      }
      FUN_004190a0(2);
      FUN_005199c4(s8(DAT_00627ccd[local_c * 0x18]), 1);
      FUN_005f22e0(DAT_00679640, s_;_00631d18);
      FUN_005199c4(local_c, 0);
    }
    FUN_005f22e0(DAT_00679640, DAT_00631d20);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_00519d67 ()

 {
  let iVar1;
  let hWnd;
  let lpText;
  let lpCaption;
  let uType;
  let local_28;
  let local_24;

  iVar1 = FUN_005197af();
  if ((iVar1 === 0)) {
    FUN_005193ed();
    FUN_004ccab9(s_TERRAIN_00631d2c, LAB_00402f2c);
    iVar1 = FUN_004ccf2d();
    if ((iVar1 === 0)) {
      _sprintf(DAT_ffffffdc, s_Error_updating_RULES.%s_00631d34, DAT_0062cd24);
      uType = 0x10;
      lpCaption = s_File_I/O_Error_00631d4c;
      lpText = DAT_ffffffdc;
      iVar1 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
    }
    DAT_006a1d7c = 0;
    DAT_006a4f88 = (DAT_006a4f88 + 0x48);
    FUN_004e4ceb();
  }
  else {
    FUN_0051961e();
    FUN_005199a9();
    if ((DAT_006a4f88 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00631d24);
    FUN_0059d3c9(0);
    hWnd = FUN_00418770();
    FUN_006e7d94(hWnd);
  }
  return;
}


 export function FUN_00519e74 ()

 {
  let sVar1;
  let uVar2;
  let local_138;
  let local_134;
  let local_126;
  let local_120;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = s32((DAT_006a4f88 + 0x2ec), 0);
  _strncpy(DAT_fffffecc, (DAT_006a1d88 + local_18 * 0x28), 0xf);
  local_126 = 0;
  do {
    if ((DAT_006a4f88 === 0)) {
      local_138 = 0;
    }
    else {
      local_138 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_138);
    local_8 = FUN_0051d63b(s_DEBUG_006359dc, s_TERRNAME_00631d5c, 0xe, DAT_fffffecc, DAT_fffffee0);
    FUN_0059d3c9(0);
    if ((local_8 === -1)) break; sVar1 = _strlen(DAT_fffffee0) {
    FUN_005f22d0((DAT_006a1d88 + local_18 * 0x28), DAT_fffffee0);
    local_c = FUN_00418d60();
    local_10 = FUN_00418d60();
    local_14 = FUN_00418d60();
    local_1c = FUN_00418d60();
    FUN_00418d20();
    FUN_00418d20();
    FUN_00418d20();
    FUN_00418d20();
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7bc), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7bc), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar2);
    (local_18 < 0x21) (local_18 = 0; local_18 = (local_18 < 0x21); local_18 = (local_18 + 1)) {
      if ((local_18 !== 0x18)) local_18 = (local_18 !== 0x18) {
        FUN_00418ce0((DAT_006a1d88 + local_18 * 0x28));
      }
    }
    (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
      FUN_00418ce0((DAT_006a1d88 + local_18 * 0x28));
      FUN_00418ce0((DAT_006a1d88 + local_18 * 0x28));
      FUN_00418ce0((DAT_006a1d88 + local_18 * 0x28));
    }
    FUN_00418d90(local_c);
    FUN_00418d90(local_10);
    FUN_00418d90(local_14);
    FUN_00418d90(local_1c);
    FUN_005199a9();
  }
  return;
}


 export function FUN_0051a1e5 ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_00631d70, s_TERRAIN_00631d68);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_0051a244 ()

 {
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_0051a26c ()

 {
  let iVar1;
  let uVar2;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_10;
  let local_8;

  local_18 = 0;
  local_8 = LAB_00402590;
  local_10 = 7;
  if ((s32((DAT_006a4f88 + 0x2ec), 0) === 3)) {
    if ((DAT_006a4f88 === 0)) {
      local_1c = 0;
    }
    else {
      local_1c = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_1c);
    while ((0 === 0)) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_FOREST_00631d78, 1);
      if ((0 === 0)) break; FUN_004190d0(DAT_00631d8c, s_HELPFOREST_00631d80) {
      if ((iVar1 === 0)) {
        local_18 = (DAT_00647c40 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c);
      }
      else {
        local_18 = (DAT_006461d8 + (iVar1 * 4 + -4) * 0xf);
      }
    }
    if ((0 < iVar1)) {
      local_8 = LAB_00402e87;
      local_10 = 8;
    }
    FUN_0059d3c9(0);
  }
  else if ((s32((DAT_006a4f88 + 0x2ec), 0) === 4)) {
    if ((DAT_006a4f88 === 0)) {
      local_20 = 0;
    }
    else {
      local_20 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_20);
    while ((0 === 0)) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_HILLS_00631d94, 1);
      if ((0 === 0)) break; FUN_004190d0(DAT_00631da8, s_HELPHILLS_00631d9c) {
      if ((iVar1 === 0)) {
        local_18 = (DAT_00647c40 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c);
      }
      else {
        local_18 = (DAT_006447b0 + (iVar1 * 4 + -4) * 0xf);
      }
    }
    if ((0 < iVar1)) {
      local_8 = LAB_00402e87;
      local_10 = 8;
    }
    FUN_0059d3c9(0);
  }
  else if ((s32((DAT_006a4f88 + 0x2ec), 0) === 5)) {
    if ((DAT_006a4f88 === 0)) {
      local_24 = 0;
    }
    else {
      local_24 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_24);
    while ((0 === 0)) {
      DAT_00631edc = 0;
      iVar1 = FUN_00419100(s_DEBUG_006359dc, s_MOUNTAINS_00631db0, 1);
      if ((0 === 0)) break; FUN_004190d0(DAT_00631dcc, s_HELPMOUNTAINS_00631dbc) {
      if ((iVar1 === 0)) {
        local_18 = (DAT_00647c40 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c);
      }
      else {
        local_18 = (DAT_00647388 + (iVar1 * 4 + -4) * 0xf);
      }
    }
    if ((0 < iVar1)) {
      local_8 = LAB_00402e87;
      local_10 = 8;
    }
    FUN_0059d3c9(0);
  }
  else if ((s32((DAT_006a4f88 + 0x2ec), 0) < 0xb)) {
    local_18 = (DAT_00647c40 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c);
  }
  else if ((s32((DAT_006a4f88 + 0x2ec), 0) < 0x16)) {
    local_18 = (DAT_006482f8 + (s32((DAT_006a4f88 + 0x2ec), 0) % 0xb) * 0x78);
  }
  else {
    local_18 = (DAT_00648334 + (s32((DAT_006a4f88 + 0x2ec), 0) % 0xb) * 0x78);
  }
  if ((local_18 !== 0)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), local_10, local_8);
    FUN_00573e59(local_18, uVar2);
  }
  FUN_005199a9();
  return;
}


 export function FUN_0051a678 ()

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;

  local_10 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  while ((0 === 0)) {
    DAT_00631edc = 0;
    iVar1 = FUN_00419100(s_DEBUG_006359dc, s_RIVER_00631dd4, 1);
    if ((0 === 0)) break; FUN_004190d0(DAT_00631de8, s_HELPRIVER_00631ddc) {
    if ((iVar1 < 0x10)) {
      local_10 = (DAT_0063f858 + iVar1 * 0x3c);
    }
    else {
      local_10 = (DAT_0063fd18 + (iVar1 * 4 + -64) * 0xf);
    }
  }
  FUN_0059d3c9(0);
  if ((local_10 !== 0)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 8, LAB_00402e87);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}


 export function FUN_0051a797 ()

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let local_14;
  let local_10;

  local_10 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  while ((0 === 0)) {
    DAT_00631edc = 0;
    uVar1 = FUN_00419100(s_DEBUG_006359dc, s_COAST_00631df0, 1);
    if ((0 === 0)) break; FUN_004190d0(DAT_00631e04, s_HELPCOAST_00631df8) {
    uVar3 = (uVar1 >> 0x1f);
    local_10 = (DAT_00643b38 + ((((((uVar1 ^ uVar3) - uVar3) & 3) ^ uVar3) - uVar3) * 0x3c + ((uVar1 + (uVar3 & 3)) >> 2) * 0xf0));
  }
  FUN_0059d3c9(0);
  if ((local_10 !== 0)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 9, LAB_00402e87);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}


 export function FUN_0051a8b7 ()

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;

  local_10 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  while ((0 === 0)) {
    DAT_00631edc = 0;
    iVar1 = FUN_00419100(s_DEBUG_006359dc, s_TERRMISC_00631e0c, 1);
    if ((0 === 0)) break; FUN_004190d0(DAT_00631e28, s_HELPTERRMISC_00631e18) {
    if ((iVar1 < 3)) {
      local_10 = (DAT_006446b8 + iVar1 * 0x3c);
    }
    else if ((iVar1 === 0xc)) {
      local_10 = DAT_00641808;
    }
    else if ((iVar1 === 0xd)) {
      local_10 = DAT_0063fc18;
    }
    else if ((iVar1 === 0xe)) {
      local_10 = DAT_00646158;
    }
    else if ((2 < (iVar1 % 0xc))) {
      local_10 = (DAT_00642710 + (((iVar1 % 0xc) * 4 + -12) * 0xf + (iVar1 / 0xc | 0) * 0x21c));
    }
  }
  FUN_0059d3c9(0);
  if ((local_10 !== 0)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 0xa, LAB_00402590);
    FUN_00573e59(local_10, uVar2);
  }
  FUN_005199a9();
  return;
}


 export function FUN_0051aa4e ()

 {
  let iVar1;
  let local_8;

  if ((s32((DAT_006a4f88 + 0x2ec), 0) < 0xb)) {
    FUN_0040f380();
    iVar1 = FUN_00418d60();
    if ((iVar1 === 0)) {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
    }
    else if ((iVar1 === 1)) {
      FUN_0043c5f0();
      FUN_0043c5f0();
      FUN_0043c5f0();
    }
    else {
      FUN_0043c5f0();
      FUN_0040f380();
      FUN_0040f380();
    }
    FUN_0040f380();
    iVar1 = FUN_00418d60();
    if ((iVar1 === 0)) {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
    }
    else if ((iVar1 === 1)) {
      FUN_0043c5f0();
      FUN_0043c5f0();
      FUN_0043c5f0();
    }
    else {
      FUN_0043c5f0();
      FUN_0040f380();
      FUN_0040f380();
    }
    FUN_0040f380();
  }
  else {
    (local_8 < 9) (local_8 = 5; local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
      FUN_0043c5f0();
    }
    (local_8 < 6) (local_8 = 1; local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
      FUN_0043c5f0();
    }
  }
  return;
}


 export function FUN_0051acdc (param_1)

 {
  let iVar1;
  let hWnd;
  let uVar2;
  let local_c;

  if ((param_1 === 0xc9)) {
    iVar1 = FUN_005197af();
    if ((iVar1 === 0)) {
      uVar2 = FUN_00418d60();
      uVar2 = FUN_005195f1(uVar2);
      w32((DAT_006a4f88 + 0x2ec), 0, uVar2);
      FUN_0051961e();
      FUN_0051aa4e();
      FUN_005199a9();
    }
    else {
      FUN_00418d90(s32((DAT_006a4f88 + 0x2ec), 0));
      FUN_0051961e();
      FUN_005199a9();
      if ((DAT_006a4f88 === 0)) {
        local_c = 0;
      }
      else {
        local_c = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_c);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00631e30);
      FUN_0059d3c9(0);
      hWnd = FUN_00418770();
      FUN_006e7d94(hWnd);
    }
  }
  else if ((param_1 === 0xd3)) param_1 = (param_1 === 0xd3) {
    FUN_0051aa4e();
    FUN_005199a9();
  }
  return;
}


 export function FUN_0051adfd (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_14;

  iVar1 = (s32((DAT_00631b80 + param_1 * 8), 0) + s32((in_ECX + 0x124), 0));
  iVar2 = (s32((DAT_00631b84 + param_1 * 8), 0) + s32((in_ECX + 0x128), 0));
  if ((param_1 === 0)) {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -30), iVar2, 0xa0, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  else if ((param_1 === 4)) param_1 = (param_1 === 4) {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -30), iVar2, 0x82, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  else {
    FUN_004086c0(DAT_ffffffec, iVar1, iVar2, 0x64, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_28 = 0;
  }
  else {
    local_28 = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_28, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(LAB_004011fe);
  /* BRANCHIND */ () {
  case 0 :
    (local_18 < 0x21) (local_18 = 0; local_18 = (local_18 < 0x21); local_18 = (local_18 + 1)) {
      if ((local_18 !== 0x18)) local_18 = (local_18 !== 0x18) {
        uVar3 = FUN_00428b0c(s32((DAT_00627cc4 + local_18 * 0x18), 0));
        FUN_00418ce0(uVar3);
      }
    }
    break;
  case 1 :
  case 3 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7bc), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar3);
    (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_00627cc4 + local_18 * 0x18), 0));
      FUN_00418ce0(uVar3);
    }
    break;
  case 2 :
  case 4 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c8), 0));
    FUN_00418ce0(uVar3);
    (local_18 < 7) (local_18 = 1; local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_0064b9a0 + local_18 * 4), 0));
      FUN_00418ce0(uVar3);
    }
    break;
  case 5 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar3);
    (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_00627cc4 + local_18 * 0x18), 0));
      FUN_00418ce0(uVar3);
    }
  }
  return;
}


 export function FUN_0051b1c2 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, (s32(DAT_00631bb0, param_1 * 2) + s32((in_ECX + 0x124), 0)), (s32(DAT_00631bb4, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0x30, (s32((in_ECX + 0x2e8), 0) + 6));
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418910(local_24, iVar1, DAT_ffffffec, DAT_00631e38);
  FUN_004189c0(3);
  FUN_00418a00(LAB_00401019);
  return;
}


 export function FUN_0051b2b6 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_38;
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00552112();
  if ((DAT_006a1d7c === 0)) DAT_006a1d7c = (DAT_006a1d7c === 0) {
    FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1d);
  }
  else {
    FUN_005a9afe(DAT_0062e018, in_ECX, 0, 0, s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
  }
  local_8 = (s32((in_ECX + 0x124), 0) + 0x20);
  local_c = (s32((in_ECX + 0x128), 0) + 0x20);
  if ((s32((in_ECX + 0x2ec), 0) < 0xb)) {
    local_18 = (DAT_00647c40 + s32((in_ECX + 0x2ec), 0) * 0x3c);
  }
  else if ((s32((in_ECX + 0x2ec), 0) < 0x16)) {
    local_18 = (DAT_006482f8 + (s32((in_ECX + 0x2ec), 0) % 0xb) * 0x78);
  }
  else {
    local_18 = (DAT_00648334 + (s32((in_ECX + 0x2ec), 0) % 0xb) * 0x78);
  }
  uVar1 = FUN_00417f70();
  iVar2 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(iVar2 * 2);
  FUN_005a9abf(in_ECX, local_8, local_c, uVar3);
  iVar2 = FUN_004bb540();
  FUN_005cef66(DAT_ffffffd8, in_ECX, 0, local_8, (local_c + (iVar2 / 2 | 0)));
  iVar2 = FUN_004bb540(6);
  uVar3 = FUN_004a6980(iVar2 * 2);
  FUN_004ccb6a(in_ECX, local_8, local_c, uVar3);
  local_18 = 0;
  if ((s32((in_ECX + 0x2ec), 0) === 3)) {
    local_18 = DAT_006461d8;
  }
  else if ((s32((in_ECX + 0x2ec), 0) === 4)) {
    local_18 = DAT_006447b0;
  }
  else if ((s32((in_ECX + 0x2ec), 0) === 5)) {
    local_18 = DAT_00647388;
  }
  if ((local_18 !== 0)) {
    iVar2 = FUN_004bb540();
    FUN_005cef31(DAT_ffffffc8, in_ECX, local_8, (local_c + (iVar2 / 2 | 0)));
  }
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_004ccb6a(in_ECX, (s32((in_ECX + 0x124), 0) + 0x1c), (s32((in_ECX + 0x128), 0) + 0xc2), 0x1e6, 0x21, 6);
  FUN_004ccb6a(in_ECX, (s32((in_ECX + 0x124), 0) + 0x1c), (s32((in_ECX + 0x128), 0) + 0xf9), 0x1e6, 0x21, 6);
  local_10 = ((DAT_00631bb0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631bb4 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d0);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bb8 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631bbc + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d1);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0x32);
  local_10 = ((DAT_00631bc0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631bc4 + s32((in_ECX + 0x128), 0)) + s32((in_ECX + 0x2e8), 0) * -2) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bc8 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = ((DAT_00631bcc + s32((in_ECX + 0x128), 0)) + s32((in_ECX + 0x2e8), 0) * -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d3);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bd0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = ((DAT_00631bd4 + s32((in_ECX + 0x128), 0)) + s32((in_ECX + 0x2e8), 0) * -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d4);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bc0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631bc4 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d5);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bc8 + s32((in_ECX + 0x124), 0)) + 0x18);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bd0 + s32((in_ECX + 0x124), 0)) + 0x18);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631bd8 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631bdc + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -10);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d9);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631be0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00631be4 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -10);
  FUN_0040bbb0();
  FUN_0040bc10(0x1da);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631b88 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00631b8c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -10);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d8);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631b90 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00631b94 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -10);
  FUN_0040bbb0();
  FUN_0040bc10(0x1db);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00631ba8 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((/* DEPTH */ + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1dc);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = (/* DEPTH */ + s32((in_ECX + 0x124), 0));
  local_14 = ((/* DEPTH */ + s32((in_ECX + 0x128), 0)) + 4);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d6);
  iVar2 = FUN_0040efd0(DAT_00679640);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, (-10 - iVar2));
  local_10 = (/* DEPTH */ + s32((in_ECX + 0x124), 0));
  local_14 = ((/* DEPTH */ + s32((in_ECX + 0x128), 0)) + 4);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d7);
  iVar2 = FUN_0040efd0(DAT_00679640);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, (-10 - iVar2));
  local_10 = ((/* DEPTH */ + s32((in_ECX + 0x124), 0)) + 0x30);
  local_14 = ((/* DEPTH */ + s32((in_ECX + 0x128), 0)) + 4);
  FUN_0040bbb0();
  FUN_0040bc10(0x1d2);
  iVar2 = FUN_0040efd0(DAT_00679640);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, (iVar2 + 0xa));
  local_10 = ((/* DEPTH */ + s32((in_ECX + 0x124), 0)) + 0x30);
  local_14 = ((/* DEPTH */ + s32((in_ECX + 0x128), 0)) + 4);
  FUN_0040bbb0();
  FUN_0040bc10(0x1dd);
  iVar2 = FUN_0040efd0(DAT_00679640);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, (iVar2 + 0xa));
  FUN_00408460();
  return;
}


 export function FUN_0051bba1 (in_ECX)

 {
  let pvVar1;
  let uVar2;
  let uVar3;
  let extraout_EAX;
  let iVar4;
  let iVar5;
  let extraout_EAX_00;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let local_490;
  let local_48c;
  let local_488;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_468;
  let local_460;
  let local_454;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051c61d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;
  pvVar1 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar1 === 0)) {
    local_468 = 0;
  }
  else {
    local_468 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  DAT_0062e018 = local_468;
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 0);
  DAT_006a1d80 = 0xc9;
  FUN_005bf071(s_EDITORPT.GIF_00631e3c, 0xa, 0xc0, DAT_fffffbbc);
  uVar2 = FUN_0040ef70();
  w32((in_ECX + 0x2e8), 0, uVar2);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar2 = s32((in_ECX + 0x2dc), 0);
  uVar9 = s32((in_ECX + 0x2d8), 0);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x728), 0), 0xd, 0, 0, uVar9, uVar2, 0, 0, 0);
  FUN_005534bc(uVar3, uVar6, uVar7, uVar8, uVar9, uVar2, uVar10, uVar11, uVar12);
  (local_460 < 0xf) (local_460 = 0; local_460 = (local_460 < 0xf); local_460 = (local_460 + 1)) {
    if ((s32((DAT_00631bf8 + local_460 * 8), 0) === 9)) {
      FUN_0051b1c2(s32((DAT_00631bfc + local_460 * 8), 0));
    }
    else if ((s32((DAT_00631bf8 + local_460 * 8), 0) === 0xc)) {
      FUN_0051adfd(s32((DAT_00631bfc + local_460 * 8), 0));
    }
  }
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, (((s32((in_ECX + 0x12c), 0) + -10) + (((s32((in_ECX + 0x12c), 0) + -10) >> 0x1f) & 3)) >> 2));
  iVar4 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar5 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar5 + 2), iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00402711);
  iVar5 = ((iVar5 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar5, iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xa8), 0));
  FUN_0040f680(local_478, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00401a69);
  iVar5 = (iVar5 + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar5, iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_47c, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_0040243c);
  FUN_004086c0(DAT_fffffbac, (iVar5 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_480, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00402347);
  FUN_0040f840();
  iVar5 = FUN_004a6980();
  w32((in_ECX + 0x2e0), 0, (iVar5 + 0xd));
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  iVar5 = s32((in_ECX + 0x124), 0);
  iVar4 = FUN_004bb540();
  FUN_004086c0(DAT_fffffbac, (iVar5 + 0x19), ((iVar4 * 2 + s32((in_ECX + 0x128), 0)) + 0x28), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7cc), 0));
  FUN_0040f680(local_484, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_0040196a);
  iVar4 = (((s32((in_ECX + 0x12c), 0) + s32((in_ECX + 0x124), 0)) + -25) - s32((in_ECX + 0x2e0), 0));
  iVar5 = s32((in_ECX + 0x128), 0);
  FUN_004086c0(DAT_fffffbac, iVar4, (iVar5 + 0x28), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_488 = 0;
  }
  else {
    local_488 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8f4), 0));
  FUN_0040f680(local_488, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00401cfd);
  iVar5 = ((iVar5 + 0x28) + (s32((in_ECX + 0x2e4), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar4, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_48c = 0;
  }
  else {
    local_48c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8f8), 0));
  FUN_0040f680(local_48c, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00403535);
  FUN_004086c0(DAT_fffffbac, iVar4, (iVar5 + (s32((in_ECX + 0x2e4), 0) + 2)), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_490 = 0;
  }
  else {
    local_490 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((/* DEPTH */ + 0x8f0), 0));
  FUN_0040f680(local_490, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_0040344f);
  FUN_0040f350(0);
  FUN_00519200();
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_0051961e();
  FUN_0051aa4e();
  w32((in_ECX + 0x2f8), 0, 6);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x402c7a);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) DAT_006a1d7c = (DAT_006a1d7c !== 0) {
    FUN_0040ef50();
  }
  if ((DAT_0062e018 !== 0)) {
    FUN_0040f010(1);
  }
  DAT_0062e018 = 0;
  w32((in_ECX + 0x2f8), 0, 0);
  local_8 = -1;
  FUN_0051c611();
  FUN_0051c627();
  return;
}


 export function FUN_0051c611 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0051c627 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051c635 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051c69a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_0051bba1();
  FUN_005bb574();
  local_8 = -1;
  FUN_0051c68e();
  FUN_0051c6a4();
  return;
}


 export function FUN_0051c68e ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_0051c6a4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051d3e0 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_2e0;
  let local_2cc;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051d54b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar1 = FUN_005a632a(param_1, param_2, param_3, 0, param_4, param_5, param_6, param_7);
  if ((iVar1 === 0)) {
    if (((local_2cc & 4) !== 0)) {
      (local_14 < local_2e0) (local_14 = 0; local_14 = (local_14 < local_2e0); local_14 = (local_14 + 1)) {
        FUN_0059ea4d(local_14, ((1 << (((local_14) & 0xFF) & 0x1f)) & DAT_00631ed8));
      }
    }
    FUN_0040bc80(0);
    DAT_00631edc = local_22c;
    if (((local_2cc & 4) !== 0)) {
      DAT_00631ed8 = 0;
      (local_14 < local_2e0) (local_14 = 0; local_14 = (local_14 < local_2e0); local_14 = (local_14 + 1)) {
        iVar1 = FUN_0059e9f3(local_14);
        if ((iVar1 !== 0)) {
          DAT_00631ed8 = (DAT_00631ed8 | (1 << (((local_14) & 0xFF) & 0x1f)));
        }
      }
    }
  }
  local_8 = -1;
  FUN_0051d53f();
  FUN_0051d555();
  return;
}


 export function FUN_0051d53f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051d555 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051d564 (param_1, param_2, param_3, param_4, param_5)

 {
  let unaff_FS_OFFSET;
  let local_304;
  let local_228;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051d622;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_304 = DAT_fffffcfc;
  FUN_0059ec88(param_4, 0, 0);
  local_304 = DAT_fffffcfc;
  FUN_0040bc80(0);
  DAT_00631edc = local_228;
  local_8 = -1;
  FUN_0051d616();
  FUN_0051d62c();
  return;
}


 export function FUN_0051d616 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051d62c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051d63b (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051d744;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_004aef20(param_5);
  iVar1 = FUN_005a632a(param_1, param_2, param_3, param_4, 0, 0, 0, 1);
  if ((iVar1 === 0)) {
    FUN_005a5f34(param_5, 0);
    (_MEM[local_14] === 9) (local_14 = param_5; (local_14 = _MEM[local_14] && ((local_14 = _MEM[local_14] || (local_14 = _MEM[local_14]))));
        local_14 = (local_14 + 1)) {
      _MEM[local_14] = 0x5f;
    }
  }
  local_8 = -1;
  FUN_0051d738();
  FUN_0051d74e();
  return;
}


 export function FUN_0051d738 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051d74e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0051d75d (param_1, param_2, param_3, param_4)

 {
  let lVar1;
  let local_120;
  let local_1c;
  let local_8;

  __itoa(param_3, DAT_ffffffe4, 0xa);
  local_8 = FUN_0051d63b(param_1, param_2, 5, DAT_ffffffe4, DAT_fffffee0);
  lVar1 = _atol(DAT_fffffee0);
  w32(param_4, 0, lVar1);
  return local_8;
}


 export function FUN_0051d7bc ()

 {
  DAT_00631ed8 = 0;
  return;
}


 export function FUN_0051d7d6 (param_1, param_2)

 {
  if ((param_2 === 0)) {
    DAT_00631ed8 = (DAT_00631ed8 & (~(1 << (param_1 & 0x1f))));
  }
  else {
    DAT_00631ed8 = (DAT_00631ed8 | (1 << (param_1 & 0x1f)));
  }
  return;
}


 export function FUN_0051d817 (param_1)

 {
  return ((1 << (param_1 & 0x1f)) & DAT_00631ed8);
}


 export function FUN_0051d950 (param_1)

 {
  let iVar1;

  iVar1 = 0;
  if ((param_1 < 0x7b)) iVar1 = 0 param_1 = (param_1 < 0x7b) {
    iVar1 = (u8(param_1) - 0x20);
    param_1 = ((iVar1) & 0xFF);
  }
  return (((iVar1 >>> 8) << 8) | param_1);
}


 export function FUN_0051d9a0 ()

 {
  let UVar1;
  let UVar2;
  let iVar3;
  let uVar4;
  let unaff_FS_OFFSET;
  let local_30c;
  let local_308;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051dd7e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  UVar2 = FUN_006e7b34(s_Civilization_Gold_00631f08, s_NetTimeOut_00631efc, -1, s_CIV.INI_00631ef4);
  if ((UVar2 === -1)) {
    FUN_006e7b38(s_Civilization_Gold_00631f34, s_NetTimeOut_00631f28, DAT_00631f24, s_CIV.INI_00631f1c);
    DAT_006ad8b8 = 0x1e;
    UVar2 = 0x1e;
  }
  DAT_006ad8b8 = UVar2;
  UVar2 = FUN_006e7b34(s_Civilization_Gold_00631f58, s_Adapter_00631f50, -1, s_CIV.INI_00631f48);
  UVar1 = UVar2;
  if ((UVar2 === -1)) {
    FUN_006e7b38(s_Civilization_Gold_00631f80, s_Adapter_00631f78, DAT_00631f74, s_CIV.INI_00631f6c);
    DAT_006c8fbc = 0;
    DAT_006ad2fc = 0;
    UVar2 = 0;
    UVar1 = 0;
  }
 LAB_0051daa8: :
  DAT_006c8fbc = UVar1;
  DAT_006ad2fc = UVar2;
  DAT_006c3164 = 7;
  local_308 = FUN_006e7b34(s_Civilization_Gold_00631fa8, s_MaxPlayers_00631f9c, -1, s_CIV.INI_00631f94);
  if ((4 < local_308)) {
    if ((7 < local_308)) {
      local_308 = 7;
    }
    DAT_006c3164 = local_308;
    FUN_006e7b38(s_Civilization_Gold_00631fd4, s_MaxPlayers_00631fc8, DAT_00631fc4, s_CIV.INI_00631fbc);
  }
  DAT_00655b02 = 0;
  DAT_00655b0a = 0;
  DAT_00655b0b = 0;
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  DAT_00627670 = 0;
  FUN_00498784();
  if ((DAT_006ad228 === -1)) {
    FUN_0052263c(7, 1);
    FUN_0040ffa0(s_MULTITYPE2_00631fe8, 1);
    FUN_0059ea99(((DAT_0066653a) << 16 >> 16));
    iVar3 = (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1));
    uVar4 = FUN_005226fa(1, iVar3);
    FUN_0059e783(uVar4, iVar3);
    local_30c = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((local_30c < 0)) {
      local_8 = -1;
      FUN_0051dd72();
      FUN_0051dd88();
      return;
    }
    DAT_0066653a = ((local_30c) & 0xFFFF);
  }
  else {
    local_30c = 2;
  }
  if ((3 < local_30c)) 3 = (3 < local_30c) {
    FUN_005dae6b(7, s_event_>=_0_&&_event_<=_3_00632020, s_D:\Ss\Franklinton\startup_multip_00631ff4, 0x66);
  }
  /* BRANCHIND */ () {
  case 0 :
    iVar3 = FUN_00419170();
    break;
  case 1 :
    iVar3 = FUN_00444310(1);
    break;
  case 2 :
    iVar3 = FUN_00444310(0);
    if ((iVar3 === 0)) goto switchD_0051dd3a_default; UVar2 = DAT_006ad2fc UVar1 = DAT_006c8fbc {
      local_8 = -1;
      FUN_0051dd72();
      FUN_0051dd88();
      return;
    }
    goto LAB_0051daa8;
  case 3 :
    DAT_006c3164 = 2;
    iVar3 = FUN_00444310(4);
    break;
  default :
    goto switchD_0051dd3a_default;
  }
  UVar2 = DAT_006ad2fc;
  UVar1 = DAT_006c8fbc;
  if ((iVar3 === 0)) {
 switchD_0051dd3a_default: :
    local_8 = -1;
    FUN_0051dd72();
    FUN_0051dd88();
    return;
  }
  goto LAB_0051daa8;
}


 export function FUN_0051dd72 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051dd88 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051dd97 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_32c;
  let local_328;
  let local_324;
  let local_314;
  let local_2e4;
  let local_2d0;
  let local_230;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051e9f3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  DAT_00631ee4 = 0;
  DAT_00631ee8 = 0;
  FUN_00419ed3();
  _DAT_00655af6 = 0;
 LAB_0051ddf1: :
  do {
    do {
      FUN_0052263c(3, 0);
      FUN_0040ffa0(s_DIFFICULTY_0063203c, 1);
      FUN_0059ea99(((DAT_0064bc14) << 16 >> 16));
      FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((iVar2 < 0)) {
        local_8 = -1;
        FUN_0051e9e7();
        FUN_0051e9fd();
        return;
      }
      local_14 = ((iVar2) & 0xFF);
      DAT_00655b08 = local_14;
      DAT_0064bc14 = ((iVar2) & 0xFFFF);
      FUN_0052263c(4, 0);
      FUN_0040ffa0(s_ENEMIES2_00632048, 1);
      FUN_0059ea99(((DAT_0064bc24) << 16 >> 16));
      FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
    } while ((iVar2 < 0)) {
      DAT_0064bc24 = ((iVar2) & 0xFFFF);
      DAT_00655b0d = (6 - ((iVar2) & 0xFF));
    }
    else {
      iVar2 = _rand();
      DAT_00655b0d = ((((iVar2 % 5)) & 0xFF) + 2);
    }
    FUN_0052263c(5, 0);
    FUN_0040ffa0(s_BARBARITY_00632054, 1);
    FUN_0059ea99(((DAT_0064bc28) << 16 >> 16));
    FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar2 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
  } while ((iVar2 < 0)) {
    local_314 = ((iVar2) & 0xFF);
    DAT_00655b09 = local_314;
    DAT_0064bc28 = ((iVar2) & 0xFFFF);
  }
  else if ((DAT_00655b08 < 2)) {
    iVar2 = _rand();
    bVar1 = (((iVar2 >> 0x1f)) & 0xFF);
    DAT_00655b09 = ((((((((iVar2) & 0xFF) ^ bVar1) - bVar1) & 1) ^ bVar1) - bVar1) + DAT_00655b08);
  }
  else if ((DAT_00655b08 < 5)) {
    iVar2 = _rand();
    DAT_00655b09 = ((((iVar2 % 3)) & 0xFF) + 1);
  }
  else {
    iVar2 = _rand();
    bVar1 = (((iVar2 >> 0x1f)) & 0xFF);
    DAT_00655b09 = ((((((((iVar2) & 0xFF) ^ bVar1) - bVar1) & 1) ^ bVar1) - bVar1) + 2);
  }
 LAB_0051e0f3: :
  DAT_00655ae8 = 0x3f;
  FUN_0052263c(9, 0);
  FUN_0040ffa0(s_RULES_00632060, 1);
  FUN_0059ea99(((DAT_0064bc54) << 16 >> 16));
  FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
  iVar2 = FUN_0040bc80(0);
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  if ((-1 < iVar2)) {
    DAT_0064bc54 = ((iVar2) & 0xFFFF);
    if ((iVar2 !== 0)) goto LAB_0051e1c8; goto LAB_0051e6b0; goto LAB_0051ddf1; LAB_0051e1c8: DAT_00655ae8 = DAT_0064bc10 {
    DAT_00655ae8 = (DAT_0064bc10 & 0x7fff);
  }
  else if ((param_1 === 2)) {
    DAT_00655ae8 = (DAT_0064bc10 | 0x8000);
  }
  FUN_0051d7bc();
  FUN_0051d7d6(0, ((DAT_00655ae8 & 0x10) === 0));
  FUN_0051d7d6(1, (DAT_00655ae8 & 0x8000));
  FUN_0051d7d6(2, 0);
  FUN_0051d7d6(3, ((DAT_0064bc56) << 16 >> 16));
  FUN_0051d7d6(4, (DAT_00655ae8 & 0x80));
  FUN_0051d7d6(5, (DAT_00655ae8 & 0x100));
  FUN_0052263c(9, 0);
  FUN_005a632a(DAT_006359d4, s_ADVANCED_00632068, 0, 0, 0, 0, 0, 0);
  if (((local_2d0 & 4) !== 0)) {
    (local_18 < local_2e4) (local_18 = 0; local_18 = (local_18 < local_2e4); local_18 = (local_18 + 1)) {
      FUN_0059ea4d(local_18, ((1 << (((local_18) & 0xFF) & 0x1f)) & DAT_00631ed8));
    }
  }
  FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
  iVar2 = FUN_0040bc80(0);
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  if ((-1 < iVar2)) {
    DAT_00631edc = local_230;
    if (((local_2d0 & 4) !== 0)) {
      DAT_00631ed8 = 0;
      (local_18 < local_2e4) (local_18 = 0; local_18 = (local_18 < local_2e4); local_18 = (local_18 + 1)) {
        iVar2 = FUN_0059e9f3(local_18);
        if ((iVar2 !== 0)) {
          DAT_00631ed8 = (DAT_00631ed8 | (1 << (((local_18) & 0xFF) & 0x1f)));
        }
      }
    }
    DAT_00655ae8 = 0x2f;
    iVar2 = FUN_0051d817(0);
    if ((iVar2 === 0)) {
      DAT_00655ae8 = (0x2f | 0x10);
    }
    iVar2 = FUN_0051d817(1);
    if ((iVar2 !== 0)) {
      DAT_00655ae8 = (DAT_00655ae8 | 0x8000);
    }
    DAT_00631ee4 = FUN_0051d817(2);
    DAT_00631ee8 = FUN_0051d817(3);
    iVar2 = FUN_0051d817(4);
    if ((iVar2 !== 0)) {
      DAT_00655ae8 = (DAT_00655ae8 | 0x80);
    }
    iVar2 = FUN_0051d817(5);
    if ((iVar2 !== 0)) {
      DAT_00655ae8 = (DAT_00655ae8 | 0x100);
    }
    if ((param_1 === 0)) {
      DAT_0064bc10 = DAT_00655ae8;
    }
    else {
      DAT_0064bc10 = ((DAT_00655ae8 & 0x7fff) | (DAT_0064bc10 & 0x8000));
    }
    if ((FUN_0051d817(3) !== 0)) {
      DAT_00655afc = 0xffff;
      iVar2 = FUN_00484fec(0);
      if ((iVar2 < 1)) {
        uVar3 = FUN_00484fec(0);
        local_324 = ((~uVar3) + 1);
      }
      else {
        local_324 = FUN_00484fec(0);
      }
      FUN_00421da0(0, local_324);
      iVar2 = FUN_00484fec(0x15);
      if ((iVar2 < 1)) {
        uVar3 = FUN_00484fec(0x15);
        local_328 = ((~uVar3) + 1);
      }
      else {
        local_328 = FUN_00484fec(0x15);
      }
      FUN_00421da0(1, local_328);
      iVar2 = FUN_00484fec(0x29);
      if ((iVar2 < 1)) {
        uVar3 = FUN_00484fec(0x29);
        local_32c = ((~uVar3) + 1);
      }
      else {
        local_32c = FUN_00484fec(0x29);
      }
      FUN_00421da0(2, local_32c);
      FUN_0052263c(9, 0);
      FUN_0040ffa0(s_ACCELERATED_00632074, 1);
      FUN_0059ea99(((DAT_0064bc56) << 16 >> 16));
      FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      DAT_00631ee8 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((FUN_0040bc80(0) < 0)) {
        DAT_00631ee8 = 0;
        goto LAB_0051e0f3;
      }
    }
    DAT_0064bc56 = ((DAT_00631ee8) & 0xFFFF);
 LAB_0051e6b0: :
    while ((iVar2 < 0)) {
      FUN_0052263c(9, 0);
      FUN_0051d7bc();
      FUN_0051d7d6(0, ((DAT_00666546) << 16 >> 16));
      FUN_0051d7d6(1, ((DAT_00666548) << 16 >> 16));
      FUN_0051d7d6(2, ((DAT_0066654a) << 16 >> 16));
      FUN_0051d7d6(3, ((DAT_0066654c) << 16 >> 16));
      FUN_0051d7d6(4, ((DAT_006665fe) << 16 >> 16));
      FUN_0051d7d6(5, ((DAT_00666600) << 16 >> 16));
      FUN_005a632a(DAT_006359d4, s_ADVANCEDMP_00632080, 0, 0, 0, 0, 0, 0);
      if ((DAT_006c3160 === 0)) {
        DAT_006ad684 = 0;
        DAT_00654c7c = 0;
      }
      else {
        FUN_0040bbb0();
        FUN_0040bc10(0x364);
        FUN_0059edf0(DAT_00679640, 6, 0);
        FUN_0051d7d6(6, ((DAT_0066654e) << 16 >> 16));
      }
      if (((local_2d0 & 4) !== 0)) {
        (local_18 < local_2e4) (local_18 = 0; local_18 = (local_18 < local_2e4); local_18 = (local_18 + 1)) {
          FUN_0059ea4d(local_18, ((1 << (((local_18) & 0xFF) & 0x1f)) & DAT_00631ed8));
        }
      }
      if ((DAT_006c3160 !== 0)) FUN_0059e8db(3, 1) DAT_006c3160 = (DAT_006c3160 !== 0) {
        FUN_0059e8db(6, 1);
      }
      FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((iVar2 < 0)) break; DAT_00654c74 = FUN_0059e9f3(0) DAT_00666546 = FUN_0059e9f3(0) DAT_00654c76 = FUN_0059e9f3(1) DAT_00666548 = FUN_0059e9f3(1) DAT_00654c78 = FUN_0059e9f3(2) DAT_0066654a = FUN_0059e9f3(2) DAT_00654c7a = FUN_0059e9f3(3) DAT_0066654c = FUN_0059e9f3(3) DAT_00654fac = FUN_0059e9f3(4) DAT_006665fe = FUN_0059e9f3(4) DAT_00654fae = FUN_0059e9f3(5) DAT_00666600 = FUN_0059e9f3(5) {
        DAT_00654c7c = FUN_0059e9f3(6);
        DAT_0066654e = FUN_0059e9f3(6);
      }
      if ((param_2 === 1)) {
        DAT_00654c7a = 0;
        DAT_00654c7c = 0;
      }
      if ((iVar2 === 0)) iVar2 = FUN_0051ea8e(0) iVar2 = (iVar2 === 0) {
        local_8 = -1;
        FUN_0051e9e7();
        FUN_0051e9fd();
        return;
      }
    }
  }
  goto LAB_0051e0f3;
}


 export function FUN_0051e9e7 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051e9fd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051ea0c ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if ((DAT_006ad670 !== -1)) iVar1 = FUN_00421bb0() iVar1 = (iVar1 - DAT_006cec80) DAT_006ad66c = (DAT_006ad66c !== 0) DAT_006ad670 = (DAT_006ad670 !== -1) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  _DAT_006cec80 = FUN_00421bb0();
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051ea8e (param_1)

 {
  let iVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_324;
  let local_320;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0051f101;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  local_18 = DAT_006665d0;
  local_14 = DAT_00654b70;
 LAB_0051ead8: :
  DAT_006665d0 = local_18;
  if ((DAT_0062c488 === 0)) DAT_0062c488 = (DAT_0062c488 === 0) {
    FUN_0052263c(-1, 0);
    FUN_0040ffa0(s_GAMETIMER_0063208c, 1);
    FUN_0059ea99(((local_18) << 16 >> 16));
    FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
  }
  else {
    FUN_0040ffa0(s_GAMETIMER_00632098, 1);
    FUN_0059ea99(((local_18) << 16 >> 16));
    FUN_0059e783(-0x3e7, -0x3e7);
  }
  local_324 = FUN_0040bc80(0);
  if ((local_324 < 0)) {
    if ((param_1 === 0)) {
      FUN_0055a567();
    }
    local_8 = -1;
    FUN_0051f0f5();
    FUN_0051f10b();
    return;
  }
  DAT_006665d0 = ((local_324) & 0xFFFF);
  /* BRANCHIND */ () {
  case 0 :
    DAT_00654b70 = 0;
    break;
  case 1 :
    DAT_00654b70 = 0x7530;
    break;
  case 2 :
    DAT_00654b70 = 0xea60;
    break;
  case 3 :
    DAT_00654b70 = 0x1d4c0;
    break;
  case 4 :
    DAT_00654b70 = 0x2bf20;
    break;
  case 5 :
    DAT_00654b70 = 0x493e0;
    break;
  case 6 :
    goto switchD_0051edf7_caseD_6;
  }
 switchD_0051edf7_default: :
  if ((param_1 === 0)) {
    FUN_0055a567();
    if ((local_324 === 6)) {
      FUN_005f22d0(DAT_006665d2, DAT_fffffce0);
    }
    local_8 = -1;
    FUN_0051f0f5();
    FUN_0051f10b();
    return;
  }
  if ((1 < DAT_006ad308)) {
    FUN_005f22d0(DAT_0063cc48, DAT_006ad5bc);
    FUN_004aef20(DAT_0063cd4c);
    if ((DAT_00654b70 === 0)) {
      FUN_004af14b(DAT_0063cd4c, 0x285);
    }
    else {
      iVar1 = ((DAT_00654b70 / 0x3e8 | 0) / 0x3c | 0);
      iVar2 = ((DAT_00654b70 / 0x3e8 | 0) % 0x3c);
      if ((iVar1 < 0xa)) {
        FUN_004af1d5(DAT_0063cd4c, 0);
      }
      FUN_004af1d5(DAT_0063cd4c, iVar1);
      FUN_005f22e0(DAT_0063cd4c, DAT_006320b4);
      if ((iVar2 < 0xa)) {
        FUN_004af1d5(DAT_0063cd4c, 0);
      }
      FUN_004af1d5(DAT_0063cd4c, iVar2);
    }
    DAT_006ad66c = (DAT_006ad308 + -1);
    DAT_006ad670 = 0;
    FUN_00511880(0x40, 0xff, 2, 0, 0, 0);
    DAT_00635a3c = LAB_004019b5;
    _DAT_006cec80 = FUN_00421bb0();
    iVar1 = FUN_00426fb0(s_NEWTURNTIMERSERVER_006320b8, 0x2000001, DAT_0063fc58, 0);
    if (((DAT_006ad308 + -1) !== 0)) DAT_006ad670 = (0 === -1) DAT_006ad66c = ((DAT_006ad308 + -1) !== 0) {
      DAT_006665d0 = local_18;
      DAT_00654b70 = local_14;
      FUN_00511880(0x41, 0xff, 0, 0, 0, 0);
      FUN_00410030(s_NEWTURNTIMERNO_006320cc, DAT_0063fc58, 0);
      local_8 = -1;
      FUN_0051f0f5();
      FUN_0051f10b();
      return;
    }
    FUN_00511880(0x42, 0xff, 0, 0, 0, 0);
    FUN_00410030(s_NEWTURNTIMERYES_006320dc, DAT_0063fc58, 0);
  }
  local_8 = -1;
  FUN_0051f0f5();
  FUN_0051f10b();
  return;
 switchD_0051edf7_caseD_6: :
  while ((local_324 < 0)) {
    iVar1 = FUN_005a632a(DAT_006359d4, s_CUSTOMGAMETIMER_006320a4, 4, DAT_006665d2, 0, 0, 0, 1);
    if ((iVar1 !== 0)) {
      if ((param_1 === 0)) {
        FUN_0055a567();
      }
      local_8 = -1;
      FUN_0051f0f5();
      FUN_0051f10b();
      return;
    }
    if ((param_1 === 0)) {
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    }
    else {
      FUN_0059e783(-0x3e7, -0x3e7);
    }
    local_324 = FUN_005a5f34(DAT_fffffce0, 0);
    FUN_0046e020(0x6a, 0, 0, 0);
    if ((local_324 < 0)) break; local_1c = _atoi(DAT_fffffce0) {
      DAT_00654fa8 = (DAT_00654fa8 ^ 1);
      DAT_00654faa = (-((local_1c) & 0xFFFF));
    }
    else if ((9 < local_1c)) 9 = (9 < local_1c) {
      DAT_00654b70 = local_1c * 0x3e8;
      goto switchD_0051edf7_default;
    }
  }
  if ((param_1 === 0)) {
    FUN_0055a567();
  }
  goto LAB_0051ead8;
}


 export function FUN_0051f0f5 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0051f10b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051f11a ()

 {
  FUN_00421bb0();
  FUN_0047e94e(1, 0);
  if ((DAT_006c900c !== 0)) DAT_006c900c = (DAT_006c900c !== 0) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    DAT_006ad678 = s32(DAT_006ad678, 0);
  }
  return;
}


 export function FUN_0051f17e ()

 {
  FUN_0047e94e(1, 0);
  return;
}


 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x005212c5) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x005213cc) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0051f19c (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let local_448;
  let local_440;
  let local_43c;
  let local_434;
  let local_430;
  let local_32c;
  let local_328;
  let local_324;
  let local_320;
  let local_31c;
  let local_2e0;
  let local_244;
  let local_240;
  let local_b4;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00521813;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_20 = -1;
  local_324 = 1;
  local_28 = -1;
  FUN_0059db08(0x2000);
  local_8 = 0;
  local_320 = 0;
 LAB_0051f1f6: :
  do {
    if ((-1 < local_20)) {
      if ((s16((DAT_00655502 + local_20 * 0x30), 0) < 1)) {
        w16((DAT_00655502 + local_20 * 0x30), 0, ((~s16((DAT_00655502 + local_20 * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655504 + local_20 * 0x30), 0) < 1)) {
        w16((DAT_00655504 + local_20 * 0x30), 0, ((~s16((DAT_00655504 + local_20 * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655506 + local_20 * 0x30), 0) < 1)) {
        w16((DAT_00655506 + local_20 * 0x30), 0, ((~s16((DAT_00655506 + local_20 * 0x30), 0)) + 1));
      }
      (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
        if ((s16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0) < 1)) {
          w16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0, ((~s16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0)) + 1));
        }
        if ((s16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0) < 1)) {
          w16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0, ((~s16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0)) + 1));
        }
      }
    }
    if ((param_3 === 0)) {
      FUN_0052263c(6, 0);
    }
    FUN_0040ffa0(s_GENDER_006320ec, 1);
    FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
    FUN_0059ea99(((DAT_0064bc18) << 16 >> 16));
    if ((param_3 === 0)) {
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    }
    if ((2 < param_2)) {
      DAT_00635a3c = LAB_00402c3e;
    }
    iVar1 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    if ((param_3 === 0)) {
      FUN_0055a567();
    }
    if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
      FUN_0040ff60(1, DAT_006ad59c);
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      if ((DAT_006c900c === 0)) {
        FUN_00410030(s_LOSTSERVER_00632100, DAT_0063fc58, 0);
      }
      else {
        FUN_00410030(s_SERVERQUIT_006320f4, DAT_0063fc58, 0);
      }
      local_324 = 1;
      goto LAB_0052144f;
    }
    if ((iVar1 < 0)) goto LAB_0052144f; DAT_0064bc18 = ((iVar1) & 0xFFFF) _DAT_006ad128 = ((((iVar1) & 0xFFFF)) << 16 >> 16) {
      FUN_0052263c(-1, 0);
    }
    local_18 = Create(DAT_fffffce4, 0x632114, 0x63210c, 0x801);
    if ((local_18 !== 0)) {
      if ((param_3 === 0)) {
        FUN_0055a567();
      }
      goto LAB_0052144f;
    }
    if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
      FUN_0040ff60(1, DAT_006ad59c);
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      if ((DAT_006c900c === 0)) {
        FUN_00410030(s_LOSTSERVER_00632128, DAT_0063fc58, 0);
      }
      else {
        FUN_00410030(s_SERVERQUIT_0063211c, DAT_0063fc58, 0);
      }
      local_324 = 1;
      goto LAB_0052144f;
    }
    FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
    FUN_0059e4e6(3);
    local_328 = 0;
    (local_440 < 0x15) (local_440 = 0; local_440 = (local_440 < 0x15); local_440 = (local_440 + 1)) {
      if (((((DAT_00654fb0) << 16 >> 16) & (1 << (DAT_006554fe[local_440 * 0x30] & 0x1f))) === 0)) DAT_00654fb0 = ((DAT_00654fb0) << 16 >> 16) {
        if ((s16((DAT_00655502 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655502 + local_440 * 0x30), 0, ((~s16((DAT_00655502 + local_440 * 0x30), 0)) + 1));
        }
        if ((s16((DAT_00655504 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655504 + local_440 * 0x30), 0, ((~s16((DAT_00655504 + local_440 * 0x30), 0)) + 1));
        }
        if ((s16((DAT_00655506 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655506 + local_440 * 0x30), 0, ((~s16((DAT_00655506 + local_440 * 0x30), 0)) + 1));
        }
        (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
          if ((s16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0) < 1)) {
            w16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0, ((~s16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0)) + 1));
          }
          if ((s16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0) < 1)) {
            w16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0, ((~s16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0)) + 1));
          }
        }
      }
      if ((0xffff < s16((DAT_00655504 + local_440 * 0x30), 0))) -1 = (0xffff < s16((DAT_00655504 + local_440 * 0x30), 0)) {
        uVar4 = 0;
        iVar3 = local_440;
        uVar2 = FUN_00428b0c(((s16((DAT_00655504 + local_440 * 0x30), 0)) << 16 >> 16), local_440, 0);
        FUN_0059edf0(uVar2, iVar3, uVar4);
      }
      else {
        FUN_0059edf0((DAT_0064bd12 + ((s16((DAT_006554fe + local_440 * 0x30), 0)) << 16 >> 16) * 0xf2), local_440, 0);
      }
    }
 LAB_0051f8c0: :
    local_328 = 0;
    (local_440 < 0x15) (local_440 = 0; local_440 = (local_440 < 0x15); local_440 = (local_440 + 1)) {
      if (((((DAT_00654fb0) << 16 >> 16) & (1 << (DAT_006554fe[local_440 * 0x30] & 0x1f))) === 0)) DAT_00654fb0 = ((DAT_00654fb0) << 16 >> 16) {
        if ((s16((DAT_00655502 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655502 + local_440 * 0x30), 0, ((~s16((DAT_00655502 + local_440 * 0x30), 0)) + 1));
        }
        if ((s16((DAT_00655504 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655504 + local_440 * 0x30), 0, ((~s16((DAT_00655504 + local_440 * 0x30), 0)) + 1));
        }
        if ((s16((DAT_00655506 + local_440 * 0x30), 0) < 1)) {
          w16((DAT_00655506 + local_440 * 0x30), 0, ((~s16((DAT_00655506 + local_440 * 0x30), 0)) + 1));
        }
        (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
          if ((s16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0) < 1)) {
            w16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0, ((~s16((DAT_0065550c + (local_1c * 4 + local_440 * 0x30)), 0)) + 1));
          }
          if ((s16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0) < 1)) {
            w16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0, ((~s16((DAT_0065550e + (local_1c * 4 + local_440 * 0x30)), 0)) + 1));
          }
        }
      }
      if (((((DAT_00654fb0) << 16 >> 16) & (1 << (DAT_006554fe[local_440 * 0x30] & 0x1f))) === 0)) DAT_00654fb0 = ((DAT_00654fb0) << 16 >> 16) {
        local_328 = (local_328 + 1);
        FUN_0059e8db(local_440, 0);
        if ((local_b4 !== 0)) {
          FUN_00421ca0(local_440);
        }
      }
      else {
        FUN_0059e8db(local_440, 1);
        if ((local_b4 !== 0)) {
          FUN_00447210(local_440);
        }
      }
    }
    if ((local_328 === 0)) {
      FUN_00421ea0(s_JOINEDMAX_00632134);
      FUN_0059db65();
      goto LAB_0052144f;
    }
    (local_32c < 0x15) (local_32c = 0; local_32c = (local_32c < 0x15); local_32c = (local_32c + 1)) {
      local_24 = FUN_0059e7ad(local_320);
      if (((_MEM[local_24] & 1) === 0)) local_24 = _MEM[local_24] {
        FUN_0059ea99(s32((local_24 + 4), 0));
        if ((local_b4 !== 0)) {
          FUN_004472f0(s32((local_24 + 4), 0));
        }
        break;
      }
      local_320 = (local_320 + 1);
      if ((local_320 === 0x15)) {
        local_320 = 0;
      }
    }
    if ((param_3 === 0)) {
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    }
    if ((2 < param_2)) {
      FUN_0059c276();
      _DAT_006ad674 = FUN_00421bb0();
    }
    local_2e0 = (local_2e0 & -0x401);
    local_244 = 0;
    local_240 = 0;
    if ((2 < param_2)) {
      DAT_00635a3c = LAB_0040126c;
    }
    local_20 = FUN_0040bc80(0);
    local_320 = GetCheckStyle(local_b4);
    if ((2 < param_2)) {
      if ((DAT_006c9088 === 0)) {
        if ((DAT_006c9010 === 0)) DAT_006c9010 = (DAT_006c9010 === 0) goto LAB_0051fdd1; FUN_0040ff60(1, DAT_006ad59c) FUN_005f22d0(DAT_0063cc48, DAT_006ad63c) {
          FUN_00410030(s_LOSTSERVER_0063214c, DAT_0063fc58, 0);
        }
        else {
          FUN_00410030(s_SERVERQUIT_00632140, DAT_0063fc58, 0);
        }
        if ((param_3 === 0)) {
          FUN_0055a567();
        }
        FUN_0059db65();
        goto LAB_0052144f;
      }
      local_28 = local_20;
      goto LAB_0051f8c0;
    }
 LAB_0051fdd1: :
    FUN_0046e020(0x6a, 0, 0, 0);
    if ((local_20 < 0)) {
      if ((param_3 === 0)) {
        FUN_0055a567();
      }
      FUN_0059db65();
      goto LAB_0051f1f6;
    }
    local_320 = local_20;
    _DAT_006ad124 = local_20;
    DAT_00655b03 = DAT_006554fe[local_20 * 0x30];
    _DAT_006ad120 = s8(DAT_006554fe[local_20 * 0x30]);
    if ((2 < param_2)) {
      FUN_0059c276();
      FUN_0046b14d(0x30, 0, local_20, s8(DAT_006554fe[local_20 * 0x30]), 0, 0, 0, 0, 0, 0);
      if ((DAT_006ad2f7 === 0)) {
        local_14 = FUN_00421bb0();
        while (((iVar3 - local_14) < DAT_006ad8b8 * 0x3c)) DAT_006c9078 = (DAT_006c9078 === 0) DAT_006c907c = (DAT_006c907c === 0) iVar3 = FUN_00421bb0() iVar3 = (iVar3 - local_14) {
          if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
            FUN_0040ff60(1, DAT_006ad59c);
            FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
            if ((DAT_006c900c === 0)) {
              FUN_00410030(s_LOSTSERVER_00632164, DAT_0063fc58, 0);
            }
            else {
              FUN_00410030(s_SERVERQUIT_00632158, DAT_0063fc58, 0);
            }
            local_324 = 1;
            goto LAB_0052144f;
          }
          FUN_0047e94e(1, 0);
        }
      }
      if ((DAT_006c907c === 0)) DAT_006c907c = (DAT_006c907c === 0) {
        FUN_00410030(s_SERVERCONNECTFAIL_00632170, DAT_0063fc58, 0);
        if ((param_3 === 0)) {
          FUN_0055a567();
        }
        FUN_0059db65();
        goto LAB_0052144f;
      }
      if ((DAT_006c907c === 0)) goto LAB_0051ffec; local_28 = local_20 FUN_00410030(s_ALREADYCHOSEN_00632184, DAT_0063fc58, 0) goto LAB_0051f8c0; LAB_0051ffec: {
      FUN_0055a567();
    }
    DAT_0064bc16 = ((local_20) & 0xFFFF);
    w16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0, ((local_20) & 0xFFFF));
    DAT_0064ca92[s8(DAT_00655b03) * 0x594] = ((local_20) & 0xFF);
    if ((iVar1 !== 0)) {
      DAT_0064ca92[s8(DAT_00655b03) * 0x594] = (DAT_0064ca92[s8(DAT_00655b03) * 0x594] + 0x15);
    }
    DAT_006d1da0 = s8(DAT_00655b03);
    DAT_00655b0b = ((((1 << (DAT_00655b03 & 0x1f))) & 0xFF) | DAT_00655b0b);
    local_434 = ((iVar1) & 0xFF);
    DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_434;
    w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, s16((DAT_00655508 + (u8(DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30)), 0));
    uVar2 = FUN_00428b0c(((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
    FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), uVar2);
    w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
    iVar3 = FUN_00498a5c(s8(DAT_00655b03));
    if ((iVar3 !== 0)) {
      _DAT_006ad12c = 0;
      _DAT_006ad178 = 0;
      if ((local_240 === 0)) {
        do {
          if ((param_3 === 0)) {
            FUN_0052263c(7, 0);
          }
          FUN_005a632a(DAT_006359d4, DAT_006321f8, 0x17, (DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), 0, 0, 0, 1);
          FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
          if ((param_3 === 0)) {
            FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
          }
          if ((2 < param_2)) {
            DAT_00635a3c = LAB_00402c3e;
          }
          local_18 = FUN_005a5f34(DAT_fffffbd0, 0);
        } while ((UNNAMED === 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
          FUN_0040ff60(1, DAT_006ad59c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          if ((DAT_006c900c === 0)) {
            FUN_00410030(s_LOSTSERVER_0063220c, DAT_0063fc58, 0);
          }
          else {
            FUN_00410030(s_SERVERQUIT_00632200, DAT_0063fc58, 0);
          }
          local_324 = 1;
          goto LAB_0052144f;
        }
        FUN_0046e020(0x6a, 0, 0, 0);
        if ((param_3 === 0)) {
          FUN_0055a567();
        }
        if ((local_18 !== 0)) {
          DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
          if ((2 < param_2)) {
            FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
          }
          goto LAB_0051f1f6;
        }
        FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_fffffbd0);
        FUN_005f22d0(DAT_006ad130, DAT_fffffbd0);
        DAT_006ad148 = 0;
        DAT_006ad160 = 0;
      }
      else {
        if ((param_2 === 1)) DAT_006ad160 = (DAT_006ad160 === 0) param_2 = (param_2 === 1) {
          uVar2 = FUN_00428b0c(((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), uVar2);
          uVar2 = FUN_00428b0c(((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), uVar2);
        }
        else {
          FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_006ad130);
          FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), DAT_006ad148);
          FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), DAT_006ad160);
        }
        w16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        w16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
          uVar2 = FUN_00428b0c(((s16((DAT_0065550c + (iVar1 * 2 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_1c * 4))), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_1c * 0x18)), uVar2);
          w16((DAT_0065550c + (iVar1 * 2 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_1c * 4))), 0, (-s16((DAT_0065550c + (iVar1 * 2 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_1c * 4))), 0)));
        }
        while ((local_240 !== 1)) {
          FUN_00421d60(1, (DAT_0064bd12 + s8(DAT_00655b03) * 0xf2));
          FUN_00421d60(2, (DAT_0064bd2a + s8(DAT_00655b03) * 0xf2));
          if ((param_3 === 0)) {
            FUN_0052263c(7, 0);
          }
          local_18 = FUN_005a632a(DAT_006359d4, s_CUSTOMTRIBE_006321ac, 0x17, (DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), 0, 0, 0, 1);
          if ((local_18 !== 0)) {
            DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
            if ((param_3 === 0)) {
              FUN_0055a567();
            }
            if ((2 < param_2)) {
              FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
            }
            goto LAB_0052144f;
          }
          FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
          if ((param_3 === 0)) {
            FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
          }
          if ((2 < param_2)) {
            DAT_00635a3c = LAB_00402c3e;
          }
          iVar1 = FUN_0040bc80(0);
          FUN_0046e020(0x6a, 0, 0, 0);
          if ((param_3 === 0)) {
            FUN_0055a567();
          }
          if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
            FUN_0040ff60(1, DAT_006ad59c);
            FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
            if ((DAT_006c900c === 0)) {
              FUN_00410030(s_LOSTSERVER_006321c4, DAT_0063fc58, 0);
            }
            else {
              FUN_00410030(s_SERVERQUIT_006321b8, DAT_0063fc58, 0);
            }
            local_324 = 1;
            goto LAB_0052144f;
          }
          if ((iVar1 < 0)) {
            DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
            if ((2 < param_2)) {
              FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
            }
            goto LAB_0051f1f6;
          }
          FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_0063cc48);
          FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), DAT_0063cd4c);
          FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), DAT_0063ce50);
          FUN_005f22d0(DAT_006ad130, DAT_0063cc48);
          FUN_005f22d0(DAT_006ad148, DAT_0063cd4c);
          FUN_005f22d0(DAT_006ad160, DAT_0063ce50);
          _DAT_006ad12c = 1;
          if ((local_240 !== 1)) break; {
            FUN_0052263c(7, 0);
          }
          local_18 = FUN_0040ffa0(s_CUSTOMTRIBE2_006321d0, 1);
          if ((local_18 !== 0)) {
            DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
            if ((param_3 === 0)) {
              FUN_0055a567();
            }
            if ((2 < param_2)) {
              FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
            }
            goto LAB_0052144f;
          }
          FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
          (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
            FUN_0040bbb0();
            FUN_0040ff00(s32((DAT_0064b9a0 + local_1c * 4), 0));
            FUN_0040fe40();
            if ((param_2 === 1)) param_2 = (param_2 === 1) {
              FUN_0059f06d(DAT_00679640, (DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_1c * 0x18)), 0x17);
            }
            else {
              FUN_0059f06d(DAT_00679640, (DAT_006ad17c + local_1c * 0x18), 0x17);
            }
          }
          if ((param_3 === 0)) {
            FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
          }
          if ((2 < param_2)) {
            DAT_00635a3c = LAB_00402c3e;
          }
          iVar1 = FUN_0040bc80(0);
          if ((iVar1 === 0)) {
            (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
              FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_1c * 0x18)), (DAT_0063cc48 + local_1c * 0x104));
              FUN_005f22d0((DAT_006ad17c + local_1c * 0x18), (DAT_0063cc48 + local_1c * 0x104));
            }
            _DAT_006ad178 = 1;
          }
          FUN_0046e020(0x6a, 0, 0, 0);
          if ((param_3 === 0)) {
            FUN_0055a567();
          }
        }
        if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
          FUN_0040ff60(1, DAT_006ad59c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          if ((DAT_006c900c === 0)) {
            FUN_00410030(s_LOSTSERVER_006321ec, DAT_0063fc58, 0);
          }
          else {
            FUN_00410030(s_SERVERQUIT_006321e0, DAT_0063fc58, 0);
          }
          local_324 = 1;
          goto LAB_0052144f;
        }
      }
      if ((param_3 === 0)) {
        FUN_0052263c(8, 0);
      }
      FUN_0040ffa0(s_CUSTOMCITY_00632218, 0x20001);
      FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
      (local_43c < 4) (local_43c = 0; local_43c = (local_43c < 4); local_43c = (local_43c + 1)) {
        uVar2 = FUN_00428b0c(s32(((DAT_00628420 + 0x3d8) + local_43c * 4), 0));
        FUN_0059ec88((local_43c * 0x1e0 + 0x63fff4), local_43c, uVar2);
      }
      FUN_0059ea99(((s16((DAT_00655500 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
      if ((param_3 === 0)) {
        FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      }
      if ((2 < param_2)) {
        DAT_00635a3c = LAB_00402c3e;
      }
      iVar1 = FUN_0040bc80(0);
      if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
        FUN_0040ff60(1, DAT_006ad59c);
        FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
        if ((DAT_006c900c === 0)) {
          FUN_00410030(s_LOSTSERVER_00632230, DAT_0063fc58, 0);
        }
        else {
          FUN_00410030(s_SERVERQUIT_00632224, DAT_0063fc58, 0);
        }
        local_324 = 1;
        goto LAB_0052144f;
      }
      FUN_0046e020(0x6a, 0, 0, 0);
      if ((param_3 === 0)) {
        FUN_0055a567();
      }
      if ((iVar1 < 0)) {
        DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
        if ((2 < param_2)) {
          FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
        }
      }
      else {
        DAT_006ad224 = iVar1;
        w16((DAT_0064bcf8 + s8(DAT_00655b03) * 0xf2), 0, ((iVar1) & 0xFFFF));
        local_324 = 0;
        w32((DAT_006ab148 + param_1 * 4), 0, local_20);
        if ((param_2 !== 2)) goto LAB_0052144f; {
          FUN_0052263c(7, 0);
        }
        if ((param_1 === 0)) {
          local_448 = DAT_00666590;
        }
        else {
          local_448 = DAT_0063223c;
        }
        FUN_005a632a(DAT_006359d4, s_EMAILADDRESS_00632240, 0x1f, local_448, 0, 0, 0, 1);
        FUN_0052182c(DAT_fffffce4, (param_1 + 0x25e));
        if ((param_3 === 0)) {
          FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        }
        local_18 = FUN_005a5f34(DAT_fffffbd0, 0);
        if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
          FUN_0040ff60(1, DAT_006ad59c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          if ((DAT_006c900c === 0)) {
            FUN_00410030(s_LOSTSERVER_0063225c, DAT_0063fc58, 0);
          }
          else {
            FUN_00410030(s_SERVERQUIT_00632250, DAT_0063fc58, 0);
          }
          local_324 = 1;
          goto LAB_0052144f;
        }
        FUN_0046e020(0x6a, 0, 0, 0);
        if ((param_3 === 0)) {
          FUN_0055a567();
        }
        if ((local_18 === 0)) {
          FUN_005f22d0((DAT_00654da4 + s8(DAT_00655b03) * 0x20), DAT_fffffbd0);
          if ((param_1 === 0)) {
            FUN_005f22d0(DAT_00666590, DAT_fffffbd0);
            DAT_00654fa4 = ((DAT_006d1da0) & 0xFF);
            DAT_00628048 = ((DAT_006d1da0) & 0xFF);
          }
 LAB_0052144f: :
          if ((-1 < local_20)) -1 = (-1 < local_20) {
            if ((s16((DAT_00655502 + local_20 * 0x30), 0) < 1)) {
              w16((DAT_00655502 + local_20 * 0x30), 0, ((~s16((DAT_00655502 + local_20 * 0x30), 0)) + 1));
            }
            if ((s16((DAT_00655504 + local_20 * 0x30), 0) < 1)) {
              w16((DAT_00655504 + local_20 * 0x30), 0, ((~s16((DAT_00655504 + local_20 * 0x30), 0)) + 1));
            }
            if ((s16((DAT_00655506 + local_20 * 0x30), 0) < 1)) {
              w16((DAT_00655506 + local_20 * 0x30), 0, ((~s16((DAT_00655506 + local_20 * 0x30), 0)) + 1));
            }
            (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
              if ((s16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0) < 1)) {
                w16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0, ((~s16((DAT_0065550c + (local_1c * 4 + local_20 * 0x30)), 0)) + 1));
              }
              if ((s16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0) < 1)) {
                w16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0, ((~s16((DAT_0065550e + (local_1c * 4 + local_20 * 0x30)), 0)) + 1));
              }
            }
          }
          if ((0 < param_1)) local_324 = (local_324 === 1) 0 = (0 < param_1) {
            if ((s16((DAT_00655502 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0) < 1)) {
              w16((DAT_00655502 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0, ((~s16((DAT_00655502 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0)) + 1));
            }
            if ((s16((DAT_00655504 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0) < 1)) {
              w16((DAT_00655504 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0, ((~s16((DAT_00655504 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0)) + 1));
            }
            if ((s16((DAT_00655506 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0) < 1)) {
              w16((DAT_00655506 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0, ((~s16((DAT_00655506 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30), 0)) + 1));
            }
            (local_1c < 7) (local_1c = 0; local_1c = (local_1c < 7); local_1c = (local_1c + 1)) {
              if ((s16((DAT_0065550c + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0) < 1)) {
                w16((DAT_0065550c + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0, ((~s16((DAT_0065550c + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0)) + 1));
              }
              if ((s16((DAT_0065550e + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0) < 1)) {
                w16((DAT_0065550e + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0, ((~s16((DAT_0065550e + (local_1c * 4 + s32((DAT_006ab144 + param_1 * 4), 0) * 0x30)), 0)) + 1));
              }
            }
            DAT_00655b0b = ((~(((1 << (DAT_006554fe[s32((DAT_006ab144 + param_1 * 4), 0) * 0x30] & 0x1f))) & 0xFF)) & DAT_00655b0b);
          }
          local_8 = -1;
          FUN_00521807();
          FUN_0052181d();
          return;
        }
        DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
      }
      goto LAB_0051f1f6;
    }
    if ((DAT_006c9010 !== 0)) DAT_006c9010 = (DAT_006c9010 !== 0) {
      FUN_0040ff60(1, DAT_006ad59c);
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      if ((DAT_006c900c === 0)) {
        FUN_00410030(s_LOSTSERVER_006321a0, DAT_0063fc58, 0);
      }
      else {
        FUN_00410030(s_SERVERQUIT_00632194, DAT_0063fc58, 0);
      }
      local_324 = 1;
      goto LAB_0052144f;
    }
    FUN_0046e020(0x6a, 0, 0, 0);
    if ((param_3 === 0)) {
      FUN_0055a567();
    }
    DAT_00655b0b = ((~(((1 << (DAT_00655b03 & 0x1f))) & 0xFF)) & DAT_00655b0b);
    if ((2 < param_2)) {
      FUN_0046b14d(0x31, 0, local_20, s8(DAT_00655b03), 0, 0, 0, 0, 0, 0);
    }
  } while ( true );
}
