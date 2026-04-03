// Block 0x00500000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 123

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_004080c0, FUN_004080f0, FUN_00408130, FUN_00408170 } from './block_00400000.js';
import { FUN_00408230, FUN_00408270, FUN_004082b0, FUN_004082f0, FUN_00408330, FUN_004083b0 } from './block_00400000.js';
import { FUN_004083f0, FUN_00408460, FUN_00408490, FUN_004085f0, FUN_004086c0, FUN_00408780 } from './block_00400000.js';
import { FUN_004087c0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040ef50 } from './block_00400000.js';
import { FUN_0040f350, FUN_0040f380, FUN_0040f3e0, FUN_0040f680, FUN_0040f810, FUN_0040f840 } from './block_00400000.js';
import { FUN_0040f880, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80 } from './block_00400000.js';
import { FUN_0040fe10, FUN_0040fe40, FUN_0040fe70, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00 } from './block_00400000.js';
import { FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0, SetDlgCtrlID } from './block_00400000.js';
import { FUN_00410070, FUN_00410402, FUN_00410d98, FUN_00414bb0, FUN_00414d10, FUN_00414d70 } from './block_00410000.js';
import { FUN_00414dd0, FUN_00417ef0, FUN_004190d0 } from './block_00410000.js';
import { Create, FUN_00421bb0, FUN_00421d30, FUN_00421da0, FUN_00421ea0, FUN_00421ed0 } from './block_00420000.js';
import { FUN_00421f10, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_00436287, FUN_0043c460, FUN_0043c520, FUN_0043c690, FUN_0043c6c0, FUN_0043c790 } from './block_00430000.js';
import { FUN_0043c7c0, FUN_0043c840, FUN_0043c8a0, FUN_0043c8d0, FUN_0043c910, FUN_0043c950 } from './block_00430000.js';
import { FUN_0043c990, FUN_0043c9d0, FUN_0043ca80, FUN_0043cef9, FUN_0043cf76, FUN_0043d07a } from './block_00430000.js';
import { FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_00441b11, FUN_00444270, FUN_00448f92 } from './block_00440000.js';
import { FUN_004503d0, FUN_00451900, FUN_00451ac0, FUN_00453da0, FUN_00453e51, FUN_00454260 } from './block_00450000.js';
import { tie } from './block_00450000.js';
import { FUN_00467580, FUN_0046ab30, FUN_0046ab49, FUN_0046ac89, FUN_0046ad85, FUN_0046e020 } from './block_00460000.js';
import { FUN_00472cf0, FUN_00472d20, FUN_0047a8c9, FUN_0047cf9e, FUN_0047df20, FUN_0047df50 } from './block_00470000.js';
import { FUN_0047e94e, GetActiveView } from './block_00470000.js';
import { FUN_00484d52, FUN_004897fa, FUN_00489a0d } from './block_00480000.js';
import { FUN_00497c90, FUN_00498d40, FUN_00498e8b } from './block_00490000.js';
import { FUN_004a6980, FUN_004aef20, FUN_004af122 } from './block_004A0000.js';
import { FUN_004bb3b0, FUN_004bb4f0, FUN_004bb540, FUN_004bb570, FUN_004bb800, FUN_004bb840 } from './block_004B0000.js';
import { FUN_004bd9f0, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c02d8, FUN_004c03ae, FUN_004c4210, FUN_004cc870 } from './block_004C0000.js';
import { FUN_004e7240, FUN_004e7492, FUN_004e74df, FUN_004e7549, FUN_004e75a6, FUN_004e78ce } from './block_004E0000.js';
import { FUN_004e790c, FUN_004e8e4d, FUN_004e9719, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_00511320, FUN_00511350, FUN_005113b0, FUN_005113f0, FUN_00511430, FUN_00511460 } from './block_00510000.js';
import { FUN_005114d0, FUN_00511520, FUN_00511560, FUN_00511690, FUN_005116f0, FUN_00511720 } from './block_00510000.js';
import { FUN_005117f0 } from './block_00510000.js';
import { FUN_00548b70 } from './block_00540000.js';
import { FUN_00552112, FUN_00552ed2, FUN_0055318c, FUN_0055324c, FUN_0055339f, FUN_005534bc } from './block_00550000.js';
import { ~COleCntrFrameWnd } from './block_00550000.js';
import { FUN_00569363, FUN_0056baff, FUN_0056d289 } from './block_00560000.js';
import { FUN_00598197, FUN_0059a2e6, FUN_0059db08, FUN_0059db65, FUN_0059df8a, FUN_0059e507 } from './block_00590000.js';
import { FUN_0059e783, FUN_0059ea99, FUN_0059ec88, FUN_0059edf0, FUN_0059f2a3 } from './block_00590000.js';
import { FUN_005a5f34, FUN_005a9780, FUN_005a99fc, FUN_005a9afe, FUN_005ad998, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005ae052, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2c3d, FUN_005b2c82, FUN_005b2e69, FUN_005b2f50, FUN_005b2f92, FUN_005b3863 } from './block_005B0000.js';
import { FUN_005b3d06, FUN_005b50ad, FUN_005b6042, FUN_005b633f, FUN_005b6787, FUN_005b89e4 } from './block_005B0000.js';
import { FUN_005b8b65, FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb574, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd65c, FUN_005bd915, FUN_005bf071 } from './block_005B0000.js';
import { CString, FUN_005c0bf2, FUN_005c0cc5, FUN_005c5aeb, FUN_005c64da, FUN_005c656b } from './block_005C0000.js';
import { FUN_005cde4d, FUN_005cdea1, FUN_005cedad, FUN_005cef31, FUN_005cf126, InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d225b, FUN_005d7cb0, FUN_005d8236, FUN_005db0d0, ~_Timevec } from './block_005D0000.js';
import { FUN_005f22d0, IsTracking, __strcmpi, _atexit, operator_new } from './block_005F0000.js';
// Unresolved: XD_InFlushSendBuffer

const DAT_0062833b = globalThis.DAT_0062833b, DAT_00628343 = globalThis.DAT_00628343, DAT_00628370 = globalThis.DAT_00628370, DAT_006283a0 = globalThis.DAT_006283a0, DAT_00630d38 = globalThis.DAT_00630d38, DAT_00630d50 = globalThis.DAT_00630d50;
const DAT_00630d90 = globalThis.DAT_00630d90, DAT_00630dd4 = globalThis.DAT_00630dd4, DAT_00630dd8 = globalThis.DAT_00630dd8, DAT_00630ec0 = globalThis.DAT_00630ec0, DAT_00630ee0 = globalThis.DAT_00630ee0, DAT_00630f28 = globalThis.DAT_00630f28;
const DAT_00630f2c = globalThis.DAT_00630f2c, DAT_00630f30 = globalThis.DAT_00630f30, DAT_00630f34 = globalThis.DAT_00630f34, DAT_00630f38 = globalThis.DAT_00630f38, DAT_00630f3c = globalThis.DAT_00630f3c, DAT_00630f40 = globalThis.DAT_00630f40;
const DAT_00630f44 = globalThis.DAT_00630f44, DAT_00641848 = globalThis.DAT_00641848, DAT_00644770 = globalThis.DAT_00644770, DAT_00644f3c = globalThis.DAT_00644f3c, DAT_00644fb4 = globalThis.DAT_00644fb4, DAT_00645120 = globalThis.DAT_00645120;
const DAT_00645160 = globalThis.DAT_00645160, DAT_00645a84 = globalThis.DAT_00645a84, DAT_00646598 = globalThis.DAT_00646598, DAT_006466c8 = globalThis.DAT_006466c8, DAT_00647788 = globalThis.DAT_00647788, DAT_006480d8 = globalThis.DAT_006480d8;
const DAT_00648820 = globalThis.DAT_00648820, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1bd = globalThis.DAT_0064b1bd, DAT_0064b1c2 = globalThis.DAT_0064b1c2, DAT_0064b1c4 = globalThis.DAT_0064b1c4;
const DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1c6 = globalThis.DAT_0064b1c6, DAT_0064b1c7 = globalThis.DAT_0064b1c7, DAT_0064b1c8 = globalThis.DAT_0064b1c8, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064c488 = globalThis.DAT_0064c488;
const DAT_0064c48c = globalThis.DAT_0064c48c, DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6ac = globalThis.DAT_0064c6ac, DAT_0064c6b3 = globalThis.DAT_0064c6b3, DAT_0064c6b4 = globalThis.DAT_0064c6b4, DAT_0064c6b5 = globalThis.DAT_0064c6b5;
const DAT_0064c7f4 = globalThis.DAT_0064c7f4, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f346 = globalThis.DAT_0064f346, DAT_0064f348 = globalThis.DAT_0064f348;
const DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f35a = globalThis.DAT_0064f35a, DAT_0064f35c = globalThis.DAT_0064f35c, DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f370 = globalThis.DAT_0064f370, DAT_0064f379 = globalThis.DAT_0064f379;
const DAT_0064f37a = globalThis.DAT_0064f37a, DAT_0064f37b = globalThis.DAT_0064f37b, DAT_0064f37e = globalThis.DAT_0064f37e, DAT_0064f381 = globalThis.DAT_0064f381, DAT_0064f384 = globalThis.DAT_0064f384, DAT_0064f394 = globalThis.DAT_0064f394;
const DAT_00655344 = globalThis.DAT_00655344, DAT_00655be6 = globalThis.DAT_00655be6, DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f4 = globalThis.DAT_006560f4, DAT_006560f6 = globalThis.DAT_006560f6;
const DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560ff = globalThis.DAT_006560ff, DAT_00656100 = globalThis.DAT_00656100, DAT_00656102 = globalThis.DAT_00656102, DAT_00656104 = globalThis.DAT_00656104, DAT_0065610a = globalThis.DAT_0065610a;
const DAT_00679640 = globalThis.DAT_00679640, DAT_006a6530 = globalThis.DAT_006a6530, DAT_006a6590 = globalThis.DAT_006a6590, DAT_006a65b8 = globalThis.DAT_006a65b8, DAT_006a65f0 = globalThis.DAT_006a65f0, DAT_006a6620 = globalThis.DAT_006a6620;
const DAT_006a6628 = globalThis.DAT_006a6628, DAT_006a9120 = globalThis.DAT_006a9120, DAT_006a9170 = globalThis.DAT_006a9170, DAT_006a91b8 = globalThis.DAT_006a91b8, DAT_006a9200 = globalThis.DAT_006a9200, DAT_fffff6a4 = globalThis.DAT_fffff6a4;
const DAT_fffff6ac = globalThis.DAT_fffff6ac, DAT_fffff9a0 = globalThis.DAT_fffff9a0, DAT_fffff9ac = globalThis.DAT_fffff9ac, DAT_fffffb28 = globalThis.DAT_fffffb28, DAT_fffffb38 = globalThis.DAT_fffffb38, DAT_fffffb80 = globalThis.DAT_fffffb80;
const DAT_fffffca0 = globalThis.DAT_fffffca0, DAT_fffffcac = globalThis.DAT_fffffcac, DAT_fffffcc0 = globalThis.DAT_fffffcc0, DAT_fffffe10 = globalThis.DAT_fffffe10, DAT_fffffe20 = globalThis.DAT_fffffe20, DAT_fffffe30 = globalThis.DAT_fffffe30;
const DAT_fffffe40 = globalThis.DAT_fffffe40, DAT_fffffe50 = globalThis.DAT_fffffe50, DAT_fffffe60 = globalThis.DAT_fffffe60, DAT_fffffe70 = globalThis.DAT_fffffe70, DAT_fffffe80 = globalThis.DAT_fffffe80, DAT_fffffe90 = globalThis.DAT_fffffe90;
const DAT_fffffea0 = globalThis.DAT_fffffea0, DAT_fffffeb0 = globalThis.DAT_fffffeb0, DAT_fffffec0 = globalThis.DAT_fffffec0, DAT_fffffed0 = globalThis.DAT_fffffed0, DAT_fffffee0 = globalThis.DAT_fffffee0, DAT_fffffef0 = globalThis.DAT_fffffef0;
const DAT_fffffef8 = globalThis.DAT_fffffef8, DAT_ffffff2c = globalThis.DAT_ffffff2c, DAT_ffffff40 = globalThis.DAT_ffffff40, DAT_ffffff4c = globalThis.DAT_ffffff4c, DAT_ffffff50 = globalThis.DAT_ffffff50, DAT_ffffff60 = globalThis.DAT_ffffff60;
const DAT_ffffff68 = globalThis.DAT_ffffff68, DAT_ffffff6c = globalThis.DAT_ffffff6c, DAT_ffffff70 = globalThis.DAT_ffffff70, DAT_ffffff78 = globalThis.DAT_ffffff78, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffff88 = globalThis.DAT_ffffff88;
const DAT_ffffff8c = globalThis.DAT_ffffff8c, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffff98 = globalThis.DAT_ffffff98, DAT_ffffff9c = globalThis.DAT_ffffff9c, DAT_ffffffa0 = globalThis.DAT_ffffffa0, DAT_ffffffa8 = globalThis.DAT_ffffffa8;
const DAT_ffffffac = globalThis.DAT_ffffffac, DAT_ffffffb4 = globalThis.DAT_ffffffb4, DAT_ffffffbc = globalThis.DAT_ffffffbc, DAT_ffffffc0 = globalThis.DAT_ffffffc0, DAT_ffffffcc = globalThis.DAT_ffffffcc, DAT_ffffffd0 = globalThis.DAT_ffffffd0;
const DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4, DAT_ffffffec = globalThis.DAT_ffffffec;
const DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff8 = globalThis.DAT_fffffff8, PTR_FUN_0061d6d4 = globalThis.PTR_FUN_0061d6d4, s_ALREADYSOLD_00630d94 = globalThis.s_ALREADYSOLD_00630d94, s_AUTOMODE_00630f48 = globalThis.s_AUTOMODE_00630f48, s_CANTHOCKTHIS_00630da0 = globalThis.s_CANTHOCKTHIS_00630da0;
const s_CHILDCLICK_00630dbc = globalThis.s_CHILDCLICK_00630dbc, s_CITY.GIF_00630d6c = globalThis.s_CITY.GIF_00630d6c, s_CITYMODAL_00630d78 = globalThis.s_CITYMODAL_00630d78, s_CITYSTUFF_00630e00 = globalThis.s_CITYSTUFF_00630e00, s_COMPLETE0_00630e54 = globalThis.s_COMPLETE0_00630e54, s_Citywin:_city_button_buy()_block_00630e0c = globalThis.s_Citywin:_city_button_buy()_block_00630e0c;
const s_Citywin:_city_button_change()_bl_00630e60 = globalThis.s_Citywin:_city_button_change()_bl_00630e60, s_Citywin:_city_button_rename()_bl_00630f68 = globalThis.s_Citywin:_city_button_rename()_bl_00630f68, s_Citywin:_city_button_view()_bloc_00630fc0 = globalThis.s_Citywin:_city_button_view()_bloc_00630fc0, s_Citywin:_city_mouse()_blocked_by_00631040 = globalThis.s_Citywin:_city_mouse()_blocked_by_00631040, s_DISORDER2_00630de8 = globalThis.s_DISORDER2_00630de8, s_DISORDER3_00630df4 = globalThis.s_DISORDER3_00630df4;
const s_DISORDER_00630ddc = globalThis.s_DISORDER_00630ddc, s_ELVISERR_00630d84 = globalThis.s_ELVISERR_00630d84, s_FREEBIE_00630f54 = globalThis.s_FREEBIE_00630f54, s_HOCKTHIS_00630db0 = globalThis.s_HOCKTHIS_00630db0, s_PRODCHANGE_00630f5c = globalThis.s_PRODCHANGE_00630f5c, s_PRODUCTION_00630f1c = globalThis.s_PRODUCTION_00630f1c;
const s_RENAMECITY_00630fb4 = globalThis.s_RENAMECITY_00630fb4, s_UNITOPTIONS_00630dc8 = globalThis.s_UNITOPTIONS_00630dc8, s_WONDER_00630ef8 = globalThis.s_WONDER_00630ef8, s__00631008 = globalThis.s__00631008, s_zzzzzzzzzzzzzzzzzzzzzzzzz_00631024 = globalThis.s_zzzzzzzzzzzzzzzzzzzzzzzzz_00631024;


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_00500e1a();
  FUN_00500e38();
  return;
}


 export function FUN_00500e1a ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_00500e38 ()

 {
  _atexit(FUN_00500e55);
  return;
}


 export function FUN_00500e55 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_00500e89();
  FUN_00500ea7();
  return;
}


 export function FUN_00500e89 ()

 {
  FUN_0043c460(0, 0xa);
  return;
}


 export function FUN_00500ea7 ()

 {
  _atexit(FUN_00500ec4);
  return;
}


 export function FUN_00500ec4 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_00500ef8();
  FUN_00500f12();
  return;
}


 export function FUN_00500ef8 ()

 {
  FUN_00501551();
  return;
}


 export function FUN_00500f12 ()

 {
  _atexit(FUN_00500f2f);
  return;
}


 export function FUN_00500f2f ()

 {
  FUN_0050160a();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_00500f63();
  FUN_00500f7d();
  return;
}


 export function FUN_00500f63 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00500f7d ()

 {
  _atexit(FUN_00500f9a);
  return;
}


 export function FUN_00500f9a ()

 {
  FUN_005bd915();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_00500fce();
  FUN_00500fe8();
  return;
}


 export function FUN_00500fce ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00500fe8 ()

 {
  _atexit(FUN_00501005);
  return;
}


 export function FUN_00501005 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0050101f ()

 {
  let uVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_4d8;
  let local_4c8;
  let local_480;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050119c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  FUN_005c64da();
  local_8 = 2;
  if ((DAT_006aa78c === DAT_00630d34)) {
    local_8 = 1;
    FUN_0050117b();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00501187();
    local_8 = -1;
    FUN_00501190();
    FUN_005011a6();
    return;
  }
  wv(DAT_00630d34, DAT_006aa78c);
  FUN_004083f0();
  FUN_005bf071(s_CITY.GIF_00630d6c, 0xa, 0xc0, DAT_fffffb80);
  FUN_005cedad(DAT_fffffb38, 7, 0, 0, 0x27c, 0x1a5);
  FUN_004083f0();
  uVar1 = FUN_00511690(0x1a5);
  uVar2 = FUN_00511690(0x27c);
  FUN_005bd65c(uVar2, uVar1);
  FUN_0047df20((DAT_006aa78c * 4 + -8));
  FUN_005cef31(DAT_fffffb28, DAT_006a9170, 0, 0);
  FUN_0047df50();
  local_8 = 1;
  FUN_0050117b();
  local_8 = (((local_8) >> 8) << 8);
  FUN_00501187();
  local_8 = -1;
  FUN_00501190();
  FUN_005011a6();
  return;
}


 export function FUN_0050117b ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00501187 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00501190 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_005011a6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005011b4 (param_1, param_2, param_3, param_4, param_5)

 {
  let piVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_54;
  let local_44;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = FUN_00407f90(param_5);
  local_34 = FUN_00407fc0(param_5);
  FUN_005d7cb0(param_1, param_2, s32(param_5, 0), s32(param_5, 1), local_10, local_34, param_4, 0x17);
  piVar1 = FUN_00497c90();
  local_30 = s32(piVar1, 0);
  local_2c = s32(piVar1, 1);
  local_28 = s32(piVar1, 2);
  local_24 = s32(piVar1, 3);
  iVar2 = FUN_00407f90(DAT_ffffffd0);
  iVar4 = (local_30 + (iVar2 / 2 | 0));
  iVar2 = FUN_004a6980();
  local_8 = (iVar4 - (iVar2 / 2 | 0));
  iVar2 = FUN_00407fc0(DAT_ffffffd0);
  iVar4 = (local_2c + (iVar2 / 2 | 0));
  iVar2 = FUN_004bb540();
  local_c = (iVar4 - (iVar2 / 2 | 0));
  FUN_005cef31(DAT_ffffffbc, (param_3 + 0x34), local_8, local_c);
  FUN_005cef31(DAT_ffffffac, (param_3 + 0x7c), (local_8 + 2), (local_c + 2));
  FUN_0043c7c0((param_3 + 0x34), DAT_ffffffd0, 0xa);
  FUN_0043c7c0((param_3 + 0x7c), DAT_ffffffd0, 0xa);
  local_20 = local_30;
  local_1c = local_2c;
  local_18 = local_28;
  local_14 = local_24;
  FUN_004bb800(DAT_ffffffe0, 1, 1);
  FUN_005a99fc((param_3 + 0x34), DAT_ffffffe0, 0x1f, 0xf);
  FUN_005a99fc((param_3 + 0x7c), DAT_ffffffe0, 0xf, 0xa);
  FUN_004bb800(DAT_ffffffe0, 1, 1);
  FUN_005a99fc((param_3 + 0x34), DAT_ffffffe0, 0x1f, 0xf);
  FUN_005a99fc((param_3 + 0x7c), DAT_ffffffe0, 0xf, 0xa);
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0cc5(uVar3);
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0cc5(uVar3);
  return;
}


 export function FUN_005013bc ()

 {
  if ((DAT_00630d1c === 0)) {
    wv(DAT_00630d1c, 1);
    FUN_0040bbb0();
    FUN_0040bbe0(s_CITYMODAL_00630d78);
    FUN_0040ff30(((DAT_006aa764 === 2) + 1));
    FUN_00421ea0(DAT_00679640);
    if ((DAT_00631edc !== 0)) {
      FUN_0050bc4f(0);
    }
    wv(DAT_00630d1c, 0);
  }
  return;
}


 export function FUN_00501440 (in_ECX)

 {
  // in_ECX promoted to parameter;

  in_ECX = (in_ECX + 0x2d8);
  w32((in_ECX + 0x15a4), 0, 1);
  w32((in_ECX + 0x15a0), 0, 0);
  w32((in_ECX + 0x15a8), 0, 0);
  w32((in_ECX + 0x159c), 0, -1);
  w32((in_ECX + 0x15b4), 0, 0);
  w32((in_ECX + 0x15b8), 0, 1);
  w32((in_ECX + 0x16bc), 0, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CMiniDockFrameWnd::OnClose(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function OnClose (this)

 {
  FUN_0046ac89(2);
  return;
}


 export function FUN_005014e5 ()

 {
  FUN_0046ac89(1);
  FUN_0046ac89(3);
  FUN_0046ac89(4);
  return;
}


 export function FUN_0050152b (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005014e5();
  in_ECX = OnClose(in_ECX);
  return;
}


 export function FUN_00501551 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005015f1;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_0046ab30();
  local_8 = 1;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 2);
  w32(in_ECX, 0, PTR_FUN_0061d6d4);
  FUN_00501440();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0050160a (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0050169a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d6d4);
  local_8 = 0;
  local_8 = 2;
  FUN_0050152b();
  local_8 = 1;
  FUN_00501673();
  local_8 = (0 << 8);
  FUN_00501682();
  local_8 = -1;
  FUN_00501691();
  FUN_005016a4();
  return;
}


 export function FUN_00501673 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00501682 ()

 {
  FUN_0046ab49();
  return;
}


 export function FUN_00501691 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_005016a4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005016b2 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_00407fc0(param_1);
  uVar1 = FUN_00407f90(param_1, uVar1);
  FUN_005a9afe(DAT_006a9170, in_ECX, ((s32(param_1, 0) - s32((in_ECX + 0x15c4), 0)) - s32((in_ECX + 0x124), 0)), ((s32(param_1, 1) - s32((in_ECX + 0x15c8), 0)) - s32((in_ECX + 0x128), 0)), s32(param_1, 0), s32(param_1, 1), uVar1);
  return;
}


 export function FUN_00501733 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005a9780();
  FUN_005baeb0(in_ECX);
  FUN_005baec8((in_ECX + 0x16ac));
  FUN_005016b2(param_1);
  return;
}


 export function FUN_00501780 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_004eb4ed(s32((in_ECX + 0x159c), 0), 1);
    FUN_0050207f(1, param_1);
    FUN_005025d5(1);
    FUN_00508adc(1);
  }
  return;
}


 export function FUN_00501819 (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_10;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 !== 0)) {
    uVar4 = 0;
    iVar1 = IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar4);
    wv(DAT_006a91b8, DAT_006a91b8);
    iVar1 = IsTracking(DAT_006a91b8);
    if (((s8(_MEM[DAT_0064f349 + iVar1 * 0x58]) - DAT_006a6604) <= ((param_1) << 16 >> 16))) {
      iVar1 = IsTracking(DAT_006a91b8);
      param_1 = (param_1 - (s8(_MEM[DAT_0064f349 + iVar1 * 0x58]) - ((DAT_006a6604) & 0xFFFF)));
      if ((((param_1) << 16 >> 16) < DAT_006a6604)) {
        iVar2 = ((param_1) << 16 >> 16);
        iVar1 = iVar2;
        iVar3 = IsTracking(DAT_006a91b8);
        local_10 = FUN_004e75a6(iVar3, iVar1);
        iVar1 = IsTracking(DAT_006a91b8);
        if ((_MEM[DAT_0064f349 + iVar1 * 0x58] < 5)) {
          if ((local_10 === 1)) {
            iVar1 = IsTracking(DAT_006a91b8);
            FUN_00414dd0(s_ELVISERR_00630d84, iVar1);
            return;
          }
          local_10 = 1;
        }
        else {
          local_10 = (local_10 + 1);
          if ((3 < local_10)) {
            local_10 = 1;
          }
        }
        iVar1 = IsTracking(DAT_006a91b8);
        FUN_004e7549(iVar1, iVar2, local_10);
        FUN_00501780(1);
      }
    }
  }
  return;
}


 export function FUN_005019c1 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let puVar4;
  let uVar5;
  let uVar6;
  let local_94;
  let local_84;
  let local_74;
  let local_64;
  let local_54;
  let local_44;
  let local_34;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
  uVar6 = 0;
  uVar5 = 0;
  iVar1 = FUN_00511690(0x1b);
  local_10 = FUN_00548b70(s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]), (iVar1 + 1), param_3, uVar5, uVar6);
  local_8 = 0;
  for (/* cond: (local_c < param_4) */); local_c = (local_c < param_4); local_c = (local_c + 1)) {
    uVar5 = 0xa;
    iVar2 = (param_2 + 1);
    iVar3 = (param_1 + 1);
    puVar4 = DAT_ffffffdc;
    iVar1 = in_ECX;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, iVar3, iVar2, 0xa);
    FUN_005cf126(puVar4, iVar1, iVar3, iVar2, uVar5);
    puVar4 = DAT_ffffffcc;
    iVar1 = in_ECX;
    iVar2 = param_1;
    iVar3 = param_2;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, param_1, param_2);
    FUN_005cef31(puVar4, iVar1, iVar2, iVar3);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) - ((param_5 + param_4) + DAT_006a6604))) */);
      local_c = (local_c < (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) - ((param_5 + param_4) + DAT_006a6604))); local_c = (local_c + 1)) {
    uVar5 = 0xa;
    iVar2 = (param_2 + 1);
    iVar3 = (param_1 + 1);
    puVar4 = DAT_ffffffbc;
    iVar1 = in_ECX;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, iVar3, iVar2, 0xa);
    FUN_005cf126(puVar4, iVar1, iVar3, iVar2, uVar5);
    puVar4 = DAT_ffffffac;
    iVar1 = in_ECX;
    iVar2 = param_1;
    iVar3 = param_2;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, param_1, param_2);
    FUN_005cef31(puVar4, iVar1, iVar2, iVar3);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < param_5) */); local_c = (local_c < param_5); local_c = (local_c + 1)) {
    if ((local_c < (param_5 - param_6))) {
      local_14 = 4;
    }
    else {
      local_14 = 6;
    }
    uVar5 = 0xa;
    iVar2 = (param_2 + 1);
    iVar3 = (param_1 + 1);
    puVar4 = DAT_ffffff9c;
    iVar1 = in_ECX;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, iVar3, iVar2, 0xa);
    FUN_005cf126(puVar4, iVar1, iVar3, iVar2, uVar5);
    puVar4 = DAT_ffffff8c;
    iVar1 = in_ECX;
    iVar2 = param_1;
    iVar3 = param_2;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, param_1, param_2);
    FUN_005cef31(puVar4, iVar1, iVar2, iVar3);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < DAT_006a6604) */); local_c = (local_c < DAT_006a6604); local_c = (local_c + 1)) {
    uVar5 = 0xa;
    iVar2 = (param_2 + 1);
    iVar3 = (param_1 + 1);
    puVar4 = DAT_ffffff7c;
    iVar1 = in_ECX;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, iVar3, iVar2, 0xa);
    FUN_004e75a6(s32((in_ECX + 0x159c), 0), local_c);
    FUN_005cf126(puVar4, iVar1, iVar3, iVar2, uVar5);
    puVar4 = DAT_ffffff6c;
    iVar1 = in_ECX;
    iVar2 = param_1;
    iVar3 = param_2;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), puVar4, in_ECX, param_1, param_2);
    FUN_004e75a6(s32((in_ECX + 0x159c), 0), local_c);
    FUN_005cef31(puVar4, iVar1, iVar2, iVar3);
    param_1 = (param_1 + local_10);
  }
  FUN_0047df50();
  return local_10;
}


 export function FUN_00501e63 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let puVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let local_54;
  let local_44;
  let local_34;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
  uVar5 = 0;
  uVar3 = 0;
  iVar1 = FUN_00511690(0xf);
  local_10 = FUN_00548b70(s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]), (iVar1 + 1), param_3, uVar3, uVar5);
  local_8 = 0;
  for (/* cond: (local_c < param_4) */); local_c = (local_c < param_4); local_c = (local_c + 1)) {
    FUN_005cef31(DAT_ffffffdc, in_ECX, param_1, param_2);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) - ((param_5 + param_4) + DAT_006a6604))) */);
      local_c = (local_c < (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) - ((param_5 + param_4) + DAT_006a6604))); local_c = (local_c + 1)) {
    FUN_005cef31(DAT_ffffffcc, in_ECX, param_1, param_2);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < param_5) */); local_c = (local_c < param_5); local_c = (local_c + 1)) {
    if ((local_c < (param_5 - param_6))) {
      local_14 = 4;
    }
    else {
      local_14 = 6;
    }
    FUN_005cef31(DAT_ffffffbc, in_ECX, param_1, param_2);
    param_1 = (param_1 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < DAT_006a6604) */); local_c = (local_c < DAT_006a6604); local_c = (local_c + 1)) {
    puVar2 = DAT_ffffffac;
    iVar1 = in_ECX;
    iVar4 = param_1;
    uVar3 = param_2;
    FUN_004e75a6(s32((in_ECX + 0x159c), 0), local_c, puVar2, in_ECX, param_1, param_2);
    FUN_005cef31(puVar2, iVar1, iVar4, uVar3);
    param_1 = (param_1 + local_10);
  }
  FUN_0047df50();
  return local_10;
}


 export function FUN_0050207f (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let uVar6;
  let uVar7;
  let local_28;
  let local_18;
  let local_14;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x15dc));
    FUN_0046ac89(2);
    local_28 = s32((in_ECX + 0x15dc), 0);
    iVar1 = s32((in_ECX + 0x15e0), 0);
    FUN_005baee0(0x7c, 0x12, 1, 1);
    FUN_0040bbb0();
    FUN_0040bc10(0x193);
    uVar2 = FUN_00511690(0xc6);
    iVar3 = FUN_00511690(0x2e);
    iVar3 = (iVar1 + iVar3);
    iVar4 = FUN_00511690(2);
    FUN_0043c910(DAT_00679640, (local_28 + iVar4), iVar3, uVar2);
    FUN_0040bbb0();
    FUN_0040bc10(0x3f);
    uVar2 = FUN_00511690(0xee);
    iVar3 = FUN_00511690(0x2e);
    iVar3 = (iVar1 + iVar3);
    iVar4 = FUN_00511690(0xc7);
    FUN_0043c910(DAT_00679640, (local_28 + iVar4), iVar3, uVar2);
    uVar2 = DAT_006a6550;
    uVar6 = DAT_006a65a8;
    uVar7 = DAT_006a659c;
    uVar5 = FUN_00511690(0x1a6);
    iVar3 = FUN_00511690(9);
    iVar3 = (iVar1 + iVar3);
    iVar4 = FUN_00511690(5);
    iVar3 = FUN_005019c1((local_28 + iVar4), iVar3, uVar5, uVar2, uVar6, uVar7);
    iVar4 = FUN_00511690(5);
    local_28 = (local_28 + iVar4);
    iVar4 = FUN_00511690(9);
    for (/* cond: (local_18 < s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58])) */); local_18 = (local_18 < s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]));
        local_18 = (local_18 + 1)) {
      uVar2 = FUN_00511690(0x1e);
      FUN_004086c0(DAT_ffffffec, local_28, (iVar1 + iVar4), iVar3, uVar2);
      FUN_00511460(local_18, 2, DAT_ffffffec);
      local_28 = (local_28 + iVar3);
    }
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x15dc));
    }
  }
  return;
}


 export function FUN_005022c0 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;

  local_1c = -1;
  iVar1 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 !== 0)) {
    uVar5 = 0;
    iVar1 = IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar5);
    iVar1 = FUN_00472cf0(0x40, DAT_006aa790);
    iVar2 = FUN_00472cf0(0x20, DAT_006aa790);
    iVar3 = FUN_00511690(5);
    iVar3 = (DAT_006aa7a4 + iVar3);
    iVar4 = FUN_00511690(0xb);
    param_1 = (param_1 - iVar3);
    param_2 = (param_2 - ((DAT_006aa7a8 + iVar4) + (iVar2 >> 1)));
    if ((param_2 < iVar2 * 4)) {
      local_18 = ((param_1 / iVar1 | 0) * 2 + -3);
      local_20 = ((param_2 / iVar2 | 0) * 2 + -3);
      if (((param_2 % iVar2) < 0)) {
        local_14 = 0;
      }
      else {
        iVar1 = FUN_005c0bf2((param_1 % iVar1), (param_2 % iVar2));
        local_14 = ((iVar1 + -10) >> 4);
      }
      if ((local_14 !== 0)) {
        local_18 = (local_18 + s8(_MEM[DAT_0062833b + local_14]));
        local_20 = (local_20 + s8(_MEM[DAT_00628343 + local_14]));
      }
      for (/* cond: (local_c < 0x15) */); local_c = (local_c < 0x15); local_c = (local_c + 1)) {
        if ((s8(_MEM[DAT_006283a0 + local_c]) === local_20)) {
          local_1c = local_c;
          break;
        }
      }
      if ((-1 < local_1c)) {
        if ((local_1c === 0x14)) {
          iVar1 = IsTracking(DAT_006a91b8);
          w32((DAT_0064f370 + iVar1 * 0x58), 0, 0);
        }
        else {
          iVar1 = local_1c;
          iVar2 = IsTracking(DAT_006a91b8);
          iVar1 = FUN_004e78ce(iVar2, iVar1);
          if ((iVar1 === 0)) {
            if ((_MEM[DAT_006a6530 + local_1c] !== 0)) {
              return;
            }
            if ((DAT_006a6604 === 0)) {
              iVar1 = IsTracking(DAT_006a91b8);
              w32((DAT_0064f370 + iVar1 * 0x58), 0, 0);
            }
            else {
              uVar5 = 1;
              iVar1 = IsTracking(DAT_006a91b8);
              FUN_004e790c(iVar1, local_1c, uVar5);
              uVar5 = -1;
              iVar1 = IsTracking(DAT_006a91b8);
              FUN_004e9719(iVar1, uVar5);
            }
          }
          else {
            uVar5 = 0;
            iVar1 = IsTracking(DAT_006a91b8);
            FUN_004e790c(iVar1, local_1c, uVar5);
            uVar5 = 1;
            iVar1 = IsTracking(DAT_006a91b8);
            FUN_004e9719(iVar1, uVar5);
          }
        }
        FUN_00501780(0);
      }
    }
  }
  return;
}


 export function FUN_005025d5 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let uVar5;
  let uVar6;
  let uVar7;
  let local_20c;
  let local_208;
  let local_204;
  let local_200;
  let local_1fc;
  let local_1f8;
  let local_1f4;
  let local_1f0;
  let local_1e0;
  let local_1d0;
  let local_1c0;
  let local_1b0;
  let local_1a0;
  let local_190;
  let local_180;
  let local_170;
  let local_160;
  let local_150;
  let local_140;
  let local_130;
  let local_120;
  let local_110;
  let local_100;
  let local_fc;
  let local_f8;
  let local_f4;
  let local_f0;
  let local_ec;
  let local_e8;
  let local_e4;
  let local_e0;
  let local_dc;
  let local_d8;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_b0;
  let local_ac;
  let local_a8;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x15ec));
    local_90 = s32((in_ECX + 0x15ec), 0);
    local_a0 = s32((in_ECX + 0x15f0), 0);
    local_e0 = FUN_00472cf0(0x40, s32((in_ECX + 0x15d8), 0));
    local_100 = FUN_00472cf0(0x20, s32((in_ECX + 0x15d8), 0));
    local_80 = (local_e0 >> 1);
    local_50 = (local_100 >> 1);
    local_58 = FUN_00511690(5);
    local_58 = (local_90 + local_58);
    local_a8 = FUN_00511690(0xb);
    local_a8 = (local_a0 + local_a8);
    FUN_0046ac89(1);
    FUN_004086c0(DAT_ffffffe0, local_58, (local_50 + local_a8), (local_e0 << 2), (local_100 << 2));
    FUN_00511460(0, 1, DAT_ffffffe0);
    local_b4 = (local_80 * 3 + local_58);
    local_8c = (local_50 * 4 + local_a8);
    for (/* cond: (local_3c < 0x15) */); local_3c = (local_3c < 0x15); local_3c = (local_3c + 1)) {
      local_fc = FUN_005ae052((((s16((DAT_0064f340 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_00630d38 + local_3c])));
      local_4c = (((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_00630d50 + local_3c]));
      local_cc = (s8(_MEM[DAT_00630d38 + local_3c]) * local_80 + local_b4);
      local_e4 = (s8(_MEM[DAT_00630d50 + local_3c]) * local_50 + local_8c);
      local_9c = (local_e4 - local_50);
      local_94 = 0;
      for (/* cond: (local_5c < 0x15) */); local_5c = (local_5c < 0x15); local_5c = (local_5c + 1)) {
        if ((_MEM[DAT_006283a0 + local_5c] === _MEM[DAT_00630d50 + local_3c])) {
          local_94 = local_5c;
          break;
        }
      }
      FUN_0047a8c9(in_ECX, local_cc, local_e4, local_fc, local_4c, s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), s32((in_ECX + 0x15d8), 0), local_94);
      if ((local_3c < 0x15)) {
        if (((_MEM[DAT_006a6530 + local_94] & 8) === 0)) {
          if (((_MEM[DAT_006a6530 + local_94] & 4) === 0)) {
            if (((_MEM[DAT_006a6530 + local_94] & 2) !== 0)) {
              FUN_0047df20(s32((in_ECX + 0x15d8), 0));
              FUN_005cef31(DAT_fffffef0, in_ECX, local_cc, local_e4);
              FUN_0047df50();
            }
          }
          else {
            local_dc = FUN_005b2e69(local_fc, local_4c);
            while ((_MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + local_dc * 0x20]) * 0x14] === 0)) {
              local_dc = FUN_005b2c82(local_dc);
            }
            if ((-1 < local_dc)) {
              FUN_0056baff(in_ECX, local_dc, 7, local_cc, local_9c, s32((in_ECX + 0x15d8), 0), 0);
            }
          }
        }
        else {
          local_c0 = FUN_0043cf76(local_fc, local_4c);
          if ((-1 < local_c0)) {
            local_8 = 1;
            FUN_0056d289(in_ECX, local_c0, 1, local_cc, local_9c, s32((in_ECX + 0x15d8), 0))
            ;
          }
        }
        if (((_MEM[DAT_006a6530 + local_94] & 9) === 0)) {
          FUN_0047df20(s32((in_ECX + 0x15d8), 0));
          FUN_005cef31(DAT_fffffee0, in_ECX, local_cc, local_e4);
          FUN_0047df50();
        }
      }
    }
    for (/* cond: (local_3c < 0x15) */); local_3c = (local_3c < 0x15); local_3c = (local_3c + 1)) {
      local_fc = FUN_005ae052((((s16((DAT_0064f340 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_00630d38 + local_3c])));
      local_4c = (((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_00630d50 + local_3c]));
      local_cc = (s8(_MEM[DAT_00630d38 + local_3c]) * local_80 + local_b4);
      local_e4 = (s8(_MEM[DAT_00630d50 + local_3c]) * local_50 + local_8c);
      local_9c = (local_e4 - local_50);
      local_94 = 0;
      for (/* cond: (local_5c < 0x15) */); local_5c = (local_5c < 0x15); local_5c = (local_5c + 1)) {
        if ((_MEM[DAT_006283a0 + local_5c] === _MEM[DAT_00630d50 + local_3c])) {
          local_94 = local_5c;
          break;
        }
      }
      iVar1 = FUN_004e78ce(s32((in_ECX + 0x159c), 0), local_94);
      if ((iVar1 !== 0)) {
        FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
        local_e8 = 0;
        FUN_004e8e4d(s32((in_ECX + 0x159c), 0), local_94, 0);
        iVar1 = local_e0;
        local_7c = ((DAT_006a65bc + DAT_006a65c0) + DAT_006a65b8);
        if ((local_7c === 0)) {
          local_7c = 1;
          local_e8 = 1;
        }
        uVar6 = 0;
        uVar5 = 0;
        iVar2 = FUN_00511690(8);
        iVar1 = (iVar1 + iVar2 * -2);
        iVar2 = FUN_00511690(0xa);
        local_70 = FUN_00548b70(local_7c, (iVar2 + 1), iVar1, uVar5, uVar6);
        iVar1 = local_e0;
        iVar2 = FUN_00511690(8);
        iVar3 = FUN_00511690(0xa);
        local_74 = ((iVar1 + iVar2 * -2) / (iVar3 + 1) | 0);
        if ((local_7c <= local_74)) {
          local_7c = local_74;
        }
        local_c4 = 0;
        local_6c = 0;
        local_78 = FUN_00511690(8);
        local_78 = (local_cc + local_78);
        iVar2 = (local_50 + local_e4);
        iVar1 = FUN_00511690(0xa);
        local_88 = (iVar2 - (iVar1 >> 1));
        for (/* cond: (local_c4 < 3) */); local_c4 = (local_c4 < 3); local_c4 = (local_c4 + 1)) {
          while ((s32(DAT_006a65b8, local_c4) !== 0)) {
            FUN_005cef31(DAT_fffffed0, in_ECX, local_78, local_88);
            local_6c = (local_6c + 1);
            if ((local_6c < local_7c)) {
              local_78 = (local_78 + local_70);
            }
            else {
              local_6c = 0;
              local_78 = FUN_00511690(8);
              local_78 = (local_cc + local_78);
              iVar1 = FUN_00511690(0xb);
              local_88 = (local_88 + iVar1);
            }
            w32(DAT_006a65b8, local_c4, (s32(DAT_006a65b8, local_c4) + -1));
          }
        }
        if ((local_e8 !== 0)) {
          FUN_005cef31(DAT_fffffec0, in_ECX, local_78, local_88);
        }
        FUN_0047df50();
      }
    }
    FUN_005baec8((in_ECX + 0x16ac));
    FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
    FUN_0040bbb0();
    FUN_0040bc10(0x1c2);
    FUN_005baee0(0x7c, 0x39, 1, 1);
    uVar5 = FUN_00407f90((in_ECX + 0x165c));
    iVar1 = s32((in_ECX + 0x1668), 0);
    iVar2 = FUN_00511690(0xe);
    FUN_0043c910(DAT_00679640, s32((in_ECX + 0x165c), 0), (iVar1 - iVar2), uVar5);
    FUN_005baee0(0x29, 0xa, 1, 1);
    local_40 = u8((s32((in_ECX + 0x15d4), 0) === 3));
    local_f0 = (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) * u8(DAT_0064bcca) + DAT_006a65d8 * DAT_006a6608);
    local_48 = DAT_006a65c8;
    local_c = (DAT_006a65c8 - local_f0);
    local_ec = local_f0;
    if ((local_f0 <= DAT_006a65c8)) {
      local_ec = DAT_006a65c8;
    }
    local_98 = local_f0;
    if ((local_c < 0)) {
      local_98 = DAT_006a65c8;
    }
    local_38 = local_f0;
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = (iVar1 - local_2c);
    local_c8 = FUN_00511690(0xe);
    local_c8 = (local_c8 + 1);
    if ((local_f0 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_2c = ((local_2c - iVar1) - local_c8);
      local_ec = (local_ec + -1);
    }
    local_70 = FUN_00548b70(local_ec, local_c8, local_2c, DAT_ffffffd0, 0);
    while ((local_30 < local_ec)) {
      local_ec = (local_ec + -1);
      if ((local_48 < local_38)) {
        local_38 = (local_38 + -1);
      }
      else if ((local_38 === local_48)) {
        local_48 = (local_48 + -1);
        local_38 = (local_38 + -1);
        local_98 = (local_98 + -1);
      }
      else {
        local_48 = (local_48 + -1);
        local_98 = (local_98 + -1);
      }
    }
    if ((local_48 !== 0)) {
      if ((local_c === 0)) {
        local_68 = 0;
      }
      else {
        if ((local_c < 1)) {
          local_1f4 = ((~local_c) + 1);
        }
        else {
          local_1f4 = local_c;
        }
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_68 = (((iVar1 + iVar2) + (local_1f4 - 1) * local_70) + local_c8);
      }
    }
    else {
      local_68 = FUN_00511690(0xe2);
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = (local_f4 - local_68);
    local_10 = FUN_00511690(0xcd);
    local_10 = (local_90 + local_10);
    local_a4 = (local_f4 + local_10);
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    w32((in_ECX + 0x15c0), 0, (iVar1 + iVar2));
    local_4c = FUN_00511690(0xe);
    local_4c = (local_a0 + local_4c);
    if ((s32((in_ECX + 0x15d4), 0) === 3)) {
      local_4c = (local_4c + -1);
    }
    if ((local_c < 0)) {
      local_f4 = (local_f4 + local_68);
      local_68 = 0;
    }
    if ((local_f4 !== 0)) {
      FUN_00408780(local_10, local_4c, local_f4, s32((in_ECX + 0x15c0), 0), 0x2d);
    }
    if ((local_68 !== 0)) {
      uVar6 = 0x30;
      uVar5 = s32((in_ECX + 0x15c0), 0);
      iVar1 = FUN_00511690(6);
      FUN_00408780(local_a4, local_4c, (local_68 + iVar1), uVar5, uVar6);
    }
    iVar1 = FUN_00511690(1);
    local_4c = (local_4c + (local_40 + iVar1));
    if ((0 < local_98)) {
      local_fc = FUN_00511690(1);
      local_fc = (local_10 + local_fc);
      for (/* cond: (local_3c < local_98) */); local_3c = (local_3c < local_98); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffeb0, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((local_c !== 0)) {
      local_fc = local_a4;
      if ((local_98 < 1)) {
        iVar1 = FUN_00511690(1);
        local_fc = (local_fc + iVar1);
      }
      else {
        iVar1 = FUN_00511690(4);
        local_fc = (local_fc + (iVar1 >> 1));
      }
      local_3c = 0;
      while ((local_1f8 <= local_3c)) {
        if ((local_c < 1)) {
          local_1f8 = ((~local_c) + 1);
        }
        else {
          local_1f8 = local_c;
        }
        if ((local_1f8 <= local_3c));
        local_fc = (local_fc + local_70);
        local_3c = (local_3c + 1);
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = (local_90 + local_84);
    iVar1 = FUN_00511690(0xe2);
    local_60 = ((local_84 + iVar1) + -1);
    iVar1 = FUN_00511690(0xe);
    iVar1 = (local_a0 + iVar1);
    local_4c = FUN_00511690(0xe);
    local_4c = (iVar1 - local_4c);
    FUN_0040bbb0();
    FUN_0040bc10(0x40);
    FUN_005baee0(0x2a, 0xa, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30((DAT_006a65b0 + local_98));
    if ((DAT_006a6558 !== DAT_006a65b0)) {
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30((DAT_006a6558 - DAT_006a65b0));
      FUN_0040fe10();
      FUN_0040bc10(0xa9);
      FUN_0040fed0();
    }
    FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    FUN_0040bbb0();
    if ((local_c < 0)) {
      FUN_0040bc10(0x4a);
      FUN_005baee0(0xb, 0x1d, 1, 1);
    }
    else {
      FUN_0040bc10(0x41);
      FUN_005baee0(0x2e, 0xa, 1, 1);
    }
    FUN_0040fe40();
    if ((local_c < 1)) {
      local_1fc = ((~local_c) + 1);
    }
    else {
      local_1fc = local_c;
    }
    FUN_0040ff30(local_1fc);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    local_b8 = DAT_006a6568;
    local_48 = (DAT_006a65cc + DAT_006a656c);
    local_c = (DAT_006a65cc - DAT_006a6568);
    local_54 = DAT_006a6568;
    if ((DAT_006a6568 <= local_48)) {
      local_54 = local_48;
    }
    local_28 = local_48;
    if ((-1 < local_c)) {
      local_28 = DAT_006a6568;
    }
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = (iVar1 - local_2c);
    local_c8 = FUN_00511690(0xe);
    local_c8 = (local_c8 + 1);
    if ((DAT_006a6568 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_2c = ((local_2c - iVar1) - local_c8);
      local_54 = (local_54 + -1);
    }
    if ((DAT_006a656c !== 0)) {
      iVar1 = FUN_00511690(4);
      local_2c = ((local_2c - iVar1) - local_c8);
      local_54 = (local_54 + -1);
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, DAT_ffffff2c, 0);
    while ((local_d4 < local_54)) {
      local_54 = (local_54 + -1);
      if (((local_48 - DAT_006a656c) < local_b8)) {
        local_b8 = (local_b8 + -1);
      }
      else {
        if ((local_48 === DAT_006a656c)) {
          local_48 = (local_48 + -1);
          local_b8 = (local_b8 + -1);
          local_28 = (local_28 + -1);
        }
        else {
          local_48 = (local_48 + -1);
          local_28 = (local_28 + -1);
        }
      }
    }
    local_d8 = 0;
    if ((DAT_006a656c !== 0)) {
      local_d8 = ((DAT_006a656c + -1) * local_70 + local_c8);
      if ((local_c !== 0)) {
        iVar1 = FUN_00511690(4);
        local_d8 = (local_d8 + (iVar1 >> 1));
      }
      if ((local_48 !== DAT_006a656c)) {
        iVar1 = FUN_00511690(4);
        local_d8 = (local_d8 + (iVar1 >> 1));
      }
    }
    if ((local_48 !== 0)) {
      if ((local_c === 0)) {
        local_68 = 0;
      }
      else {
        if ((local_c < 1)) {
          local_200 = ((~local_c) + 1);
        }
        else {
          local_200 = local_c;
        }
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_68 = (((iVar1 + iVar2) + (local_200 - 1) * local_70) + local_c8);
      }
    }
    else {
      local_68 = FUN_00511690(0xe2);
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = (local_f4 - (local_d8 + local_68));
    if ((local_d8 !== 0)) {
      if ((DAT_006a6568 === 0)) {
        local_f4 = 0;
      }
      else {
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_f4 = (((iVar1 + iVar2) + (DAT_006a6568 + -1) * local_70) + local_c8);
      }
      local_d8 = FUN_00511690(0xe2);
      local_d8 = (local_d8 - (local_68 + local_f4));
    }
    local_10 = FUN_00511690(0xcd);
    local_10 = (local_90 + local_10);
    local_34 = (local_f4 + local_10);
    local_a4 = (local_d8 + local_34);
    if ((local_d8 !== 0)) {
      local_bc = (((local_d8 >> 1) + local_34) - (((DAT_006a656c + -1) * local_70 + local_c8) >> 1));
    }
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    w32((in_ECX + 0x15c0), 0, (iVar1 + iVar2));
    local_4c = FUN_00511690(0x78);
    local_4c = (local_a0 + local_4c);
    if ((s32((in_ECX + 0x15d4), 0) === 3)) {
      local_4c = (local_4c + -1);
    }
    if ((local_c < 0)) {
      local_f4 = (local_f4 + local_68);
      local_68 = 0;
    }
    if ((local_f4 !== 0)) {
      FUN_00408780(local_10, local_4c, local_f4, s32((in_ECX + 0x15c0), 0), 0x54);
    }
    if ((local_d8 !== 0)) {
      FUN_00408780(local_34, local_4c, local_d8, s32((in_ECX + 0x15c0), 0), 0xb);
    }
    if ((local_68 !== 0)) {
      uVar6 = 0x5c;
      uVar5 = s32((in_ECX + 0x15c0), 0);
      iVar1 = FUN_00511690(6);
      FUN_00408780(local_a4, local_4c, (local_68 + iVar1), uVar5, uVar6);
    }
    iVar1 = FUN_00511690(1);
    local_4c = (local_4c + (local_40 + iVar1));
    if ((0 < local_28)) {
      local_fc = FUN_00511690(1);
      local_fc = (local_10 + local_fc);
      for (/* cond: (local_3c < local_28) */); local_3c = (local_3c < local_28); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe90, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((0 < DAT_006a656c)) {
      local_fc = FUN_00511690(2);
      local_fc = (local_bc + local_fc);
      for (/* cond: (local_3c < DAT_006a656c) */); local_3c = (local_3c < DAT_006a656c); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe80, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((local_c !== 0)) {
      local_fc = local_a4;
      if ((local_28 < 1)) {
        iVar1 = FUN_00511690(1);
        local_fc = (local_fc + iVar1);
      }
      else {
        iVar1 = FUN_00511690(4);
        local_fc = (local_fc + (iVar1 >> 1));
      }
      local_3c = 0;
      while ((local_204 <= local_3c)) {
        if ((local_c < 1)) {
          local_204 = ((~local_c) + 1);
        }
        else {
          local_204 = local_c;
        }
        if ((local_204 <= local_3c)) {
          FUN_005cef31(DAT_fffffe70, in_ECX, local_fc, local_4c);
        }
        else {
          FUN_005cef31(DAT_fffffe60, in_ECX, local_fc, local_4c);
        }
        local_fc = (local_fc + local_70);
        local_3c = (local_3c + 1);
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = (local_90 + local_84);
    iVar1 = FUN_00511690(0xe2);
    local_60 = ((local_84 + iVar1) + -1);
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    iVar3 = FUN_00511690(0x78);
    iVar4 = FUN_00511690(-1);
    local_4c = ((((iVar1 + iVar2) + iVar3) + iVar4) + local_a0);
    FUN_0040bbb0();
    FUN_0040bc10(0xcc);
    FUN_0040fe40();
    iVar1 = DAT_006a6568;
    if ((local_48 <= DAT_006a6568)) {
      iVar1 = local_48;
    }
    FUN_0040ff30(iVar1);
    FUN_005baee0(0x54, 0xa, 1, 1);
    FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    if ((DAT_006a656c !== 0)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x43);
      FUN_0040fe40();
      FUN_0040ff30(DAT_006a656c);
      FUN_005baee0(0xb, 0x1d, 1, 1);
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    FUN_0040bbb0();
    if ((local_c < 0)) {
      FUN_0040bc10(0x4b);
      FUN_005baee0(0xb, 0x1d, 1, 1);
    }
    else {
      FUN_0040bc10(0x44);
      FUN_005baee0(0x5c, 0xa, 1, 1);
    }
    FUN_0040fe40();
    if ((local_c < 1)) {
      local_208 = ((~local_c) + 1);
    }
    else {
      local_208 = local_c;
    }
    FUN_0040ff30(local_208);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    local_48 = DAT_006a65d0;
    local_54 = DAT_006a65d0;
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = (iVar1 - local_2c);
    local_c8 = FUN_00511690(0xe);
    local_c8 = (local_c8 + 1);
    if ((DAT_006a6580 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_2c = ((local_2c - iVar1) - local_c8);
      local_54 = (local_54 + -1);
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, DAT_ffffff2c, 0);
    for (/* cond: (local_d4 < local_54) */); local_d4 = (local_d4 < local_54); local_54 = (local_54 + -1)) {
      local_48 = (local_48 + -1);
    }
    local_68 = 0;
    if ((DAT_006a6580 !== 0)) {
      if ((DAT_006a6580 < 1)) {
        local_20c = ((~DAT_006a6580) + 1);
      }
      else {
        local_20c = DAT_006a6580;
      }
      iVar1 = FUN_00511690(2);
      iVar2 = FUN_00511690(1);
      local_68 = (((iVar1 + iVar2) + (local_20c - 1) * local_70) + local_c8);
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = (local_f4 - local_68);
    local_10 = FUN_00511690(0xcd);
    local_10 = (local_90 + local_10);
    local_a4 = (local_f4 + local_10);
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    w32((in_ECX + 0x15c0), 0, (iVar1 + iVar2));
    local_4c = FUN_00511690(0x37);
    local_4c = (local_a0 + local_4c);
    if ((local_c < 0)) {
      local_f4 = (local_f4 + local_68);
      local_68 = 0;
    }
    if ((local_f4 !== 0)) {
      FUN_00408780(local_10, local_4c, local_f4, s32((in_ECX + 0x15c0), 0), 0x76);
    }
    if ((local_68 !== 0)) {
      FUN_00408780(local_a4, local_4c, local_68, s32((in_ECX + 0x15c0), 0), 0x79);
    }
    iVar1 = FUN_00511690(1);
    local_4c = (local_4c + (local_40 + iVar1));
    if ((0 < (DAT_006a65d0 - DAT_006a6580))) {
      local_fc = (local_10 + 1);
      for (/* cond: (local_3c < (DAT_006a65d0 - DAT_006a6580)) */); local_3c = (local_3c < (DAT_006a65d0 - DAT_006a6580)); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe50, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((DAT_006a6580 !== 0)) {
      local_fc = local_a4;
      iVar1 = FUN_00511690(4);
      local_fc = (local_fc + (iVar1 >> 1));
      for (/* cond: (local_3c < DAT_006a6580) */); local_3c = (local_3c < DAT_006a6580); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe40, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = (local_90 + local_84);
    iVar1 = FUN_00511690(0xe2);
    local_60 = ((local_84 + iVar1) + -1);
    iVar1 = FUN_00511690(0x37);
    iVar1 = (local_a0 + iVar1);
    local_4c = FUN_00511690(0xe);
    local_4c = (iVar1 - local_4c);
    FUN_0040bbb0();
    FUN_0040bc10(0x45);
    FUN_005baee0(0x76, 0xa, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30((DAT_006a65d0 - DAT_006a6580));
    local_d0 = FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    if ((DAT_006a6618 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_d0 = (local_d0 + iVar1);
      FUN_0040bbb0();
      FUN_0040bc10(0x5d);
      FUN_0040fe40();
      FUN_0040bbe0(DAT_00630d90);
      FUN_0040ff30(DAT_006a6618);
      FUN_005baee0(0x79, 0xa, 1, 1);
      FUN_0043c8d0(DAT_00679640, local_d0, local_4c);
    }
    FUN_0040bbb0();
    FUN_0040bc10(0x46);
    FUN_005baee0(0x79, 0xa, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6580);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    local_48 = DAT_006a65d0;
    local_b0 = DAT_006a6554;
    local_64 = DAT_006a65fc;
    local_44 = DAT_006a6578;
    local_54 = ((DAT_006a6578 + DAT_006a65fc) + DAT_006a6554);
    local_24 = ((u8((0 < DAT_006a6578)) + u8((0 < DAT_006a65fc))) + u8((0 < DAT_006a6554)));
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = (iVar1 - local_2c);
    local_c8 = FUN_00511690(0xe);
    local_c8 = (local_c8 + 1);
    for (/* cond: (1 < local_24) */); 1 = (1 < local_24); local_24 = (local_24 + -1)) {
      iVar1 = FUN_00511690(4);
      local_2c = (local_2c - (local_c8 + iVar1));
      local_54 = (local_54 + -1);
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, DAT_ffffff2c, 0);
    for (/* cond: (local_d4 < local_54) */); local_d4 = (local_d4 < local_54); local_d4 = (local_d4 + 1)) {
      if ((local_44 < local_b0)) {
        local_b0 = (local_b0 + -1);
      }
      else if ((local_64 < local_44)) {
        local_44 = (local_44 + -1);
      }
      else {
        local_64 = (local_64 + -1);
      }
    }
    local_f4 = 0;
    local_10 = FUN_00511690(0xcd);
    local_10 = (local_90 + local_10);
    if ((local_b0 !== 0)) {
      iVar1 = FUN_00511690(1);
      local_f4 = ((iVar1 + (local_b0 + -1) * local_70) + local_c8);
    }
    local_68 = 0;
    if ((local_44 !== 0)) {
      iVar1 = FUN_00511690(1);
      local_68 = ((iVar1 + (local_44 + -1) * local_70) + local_c8);
    }
    iVar1 = FUN_00511690(0xe2);
    iVar2 = FUN_00511690(0xcd);
    local_a4 = (((iVar1 + iVar2) + local_90) - local_68);
    local_d8 = FUN_00511690(0xe2);
    local_d8 = (local_d8 - (local_68 + local_f4));
    local_34 = FUN_00511690(0xcd);
    local_34 = (local_90 + local_34);
    if ((local_f4 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_d8 = (local_d8 - iVar1);
      iVar1 = FUN_00511690(4);
      local_34 = (local_34 + (local_f4 + iVar1));
    }
    if ((local_68 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_d8 = (local_d8 - iVar1);
    }
    local_bc = local_34;
    local_34 = (local_34 + (local_d8 >> 1));
    if ((local_64 !== 0)) {
      local_34 = (local_34 - (((local_64 + -1) * local_70 + local_c8) >> 1));
    }
    local_ac = 0;
    if ((local_b0 !== 0)) {
      if ((local_44 === 0)) {
        local_ac = 2;
        iVar1 = FUN_00511690(1);
        local_24 = ((iVar1 + (local_64 + -1) * local_70) + local_c8);
        iVar1 = FUN_00511690(0xe2);
        iVar2 = FUN_00511690(0xcd);
        local_34 = (((iVar1 + iVar2) + local_90) - local_24);
      }
    }
    else {
      local_ac = 1;
      local_34 = local_10;
    }
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    w32((in_ECX + 0x15c0), 0, (iVar1 + iVar2));
    local_4c = FUN_00511690(0x4f);
    local_4c = (local_a0 + local_4c);
    uVar7 = 0x79;
    uVar5 = s32((in_ECX + 0x15c0), 0);
    uVar6 = FUN_00511690(0xe2);
    FUN_00408780(local_10, local_4c, uVar6, uVar5, uVar7);
    iVar1 = FUN_00511690(1);
    local_4c = (local_4c + (local_40 + iVar1));
    if ((0 < local_b0)) {
      local_fc = FUN_00511690(1);
      local_fc = (local_10 + local_fc);
      for (/* cond: (local_3c < local_b0) */); local_3c = (local_3c < local_b0); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe30, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((local_64 !== 0)) {
      local_fc = local_34;
      for (/* cond: (local_3c < local_64) */); local_3c = (local_3c < local_64); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe20, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    if ((local_44 !== 0)) {
      local_fc = local_a4;
      for (/* cond: (local_3c < local_44) */); local_3c = (local_3c < local_44); local_3c = (local_3c + 1)) {
        FUN_005cef31(DAT_fffffe10, in_ECX, local_fc, local_4c);
        local_fc = (local_fc + local_70);
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = (local_90 + local_84);
    iVar1 = FUN_00511690(0xe2);
    local_60 = ((local_84 + iVar1) + -1);
    iVar1 = FUN_00511690(0x4f);
    iVar2 = FUN_00511690(0xe);
    iVar3 = FUN_00511690(2);
    iVar4 = FUN_00511690(0);
    local_4c = ((((iVar1 + iVar2) + iVar3) + iVar4) + local_a0);
    local_f8 = s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]);
    FUN_0040bbb0();
    FUN_0040ff30(u8(_MEM[DAT_0064c6b4 + local_f8 * 0x594]) * 0xa);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x47);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6554);
    FUN_005baee0(0x76, 0xa, 1, 1);
    if ((local_ac === 1)) {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    else {
      FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    }
    FUN_0040bbb0();
    FUN_0040ff30((0xa - (u8(_MEM[DAT_0064c6b4 + local_f8 * 0x594]) + u8(_MEM[DAT_0064c6b3 + local_f8 * 0x594]))) * 0xa);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x48);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a65fc);
    FUN_005baee0(0x29, 0xa, 1, 1);
    if ((local_ac === 1)) {
      FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    }
    else if ((local_ac === 2)) {
      FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    }
    else {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    FUN_0040bbb0();
    FUN_0040ff30(u8(_MEM[DAT_0064c6b3 + local_f8 * 0x594]) * 0xa);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x49);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6578);
    FUN_005baee0(0x5e, 0xa, 1, 1);
    if ((local_ac === 2)) {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    else {
      FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    }
    FUN_0047df50();
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x15ec));
    }
  }
  return;
}


 export function FUN_00504c05 (in_ECX, param_1)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_24;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x15fc));
    FUN_005baee0(0x2c, 0xa, 1, 1);
    uVar1 = FUN_00407f90((in_ECX + 0x15fc));
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xac), 0), s32((in_ECX + 0x15fc), 0), s32((in_ECX + 0x1600), 0), uVar1);
    FUN_0043c910(uVar1);
    uVar1 = FUN_00511690(0xb7);
    uVar2 = FUN_00511690(0x93);
    uVar3 = FUN_00511690(0xf);
    uVar4 = FUN_00511690(6);
    FUN_004086c0(DAT_ffffffec, uVar4, uVar3, uVar1, uVar2);
    FUN_0043c790(DAT_ffffffec, s32((in_ECX + 0x15fc), 0), s32((in_ECX + 0x1600), 0));
    uVar1 = FUN_00511690(3);
    uVar2 = FUN_00511690(3);
    FUN_004bb800(DAT_ffffffec, uVar2, uVar1);
    uVar1 = FUN_00407f90(DAT_ffffffec, 0, 0);
    uVar2 = FUN_00511690(0x11);
    iVar5 = FUN_00548b70((s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) + 1), uVar2, uVar1);
    uVar1 = FUN_00407fc0(DAT_ffffffec, 0, 0);
    uVar2 = FUN_00511690(0xe);
    iVar6 = FUN_00548b70(DAT_006a6560, uVar2, uVar1);
    iVar5 = (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) + 1) * iVar5;
    iVar7 = FUN_00407f90(DAT_ffffffec);
    if ((iVar5 < iVar7)) {
      iVar7 = FUN_00407f90(DAT_ffffffec, 0);
      FUN_004bb800(DAT_ffffffec, ((iVar7 - iVar5) >> 1));
    }
    iVar5 = iVar6 * DAT_006a6560;
    iVar7 = FUN_00407fc0(DAT_ffffffec);
    if ((iVar5 < iVar7)) {
      iVar7 = FUN_00407fc0(DAT_ffffffec);
      local_8 = (local_8 - (iVar7 - iVar5));
    }
    FUN_004bb840(DAT_ffffffec, 3, 3);
    FUN_005113f0(DAT_ffffffec, 0x2c, 0x39);
    FUN_004bb800(DAT_ffffffec, 1, 1);
    FUN_004bb800(DAT_ffffffec, 2, 2);
    iVar5 = local_14;
    local_1c = 0;
    local_24 = ((s16((DAT_0064f35a + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16);
    local_2c = local_10;
    FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
    for (/* cond: (local_1c < DAT_006a6560) */); (0 = (0 < local_24) && (local_1c = (local_1c < DAT_006a6560))); local_1c = (local_1c + 1)) {
      iVar7 = (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) + 1);
      if ((local_24 <= (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) + 1))) {
        iVar7 = local_24;
      }
      uVar1 = FUN_00407f90(DAT_ffffffec, 1);
      uVar2 = FUN_00511690(0x11);
      FUN_005114d0(DAT_00644f3c, iVar5, local_2c, iVar7, (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x159c), 0) * 0x58]) + 1), uVar2, uVar1);
      local_24 = (local_24 - iVar7);
      local_2c = (local_2c + iVar6);
    }
    FUN_0047df50();
    iVar5 = FUN_0043d20a(s32((in_ECX + 0x159c), 0), 3);
    if ((iVar5 !== 0)) {
      iVar7 = (DAT_006a6560 >> 1);
      iVar5 = FUN_00511690(1);
      iVar6 = (local_10 + (iVar7 * iVar6 - iVar5));
      uVar1 = 0x2a;
      iVar5 = FUN_00511690(2);
      iVar5 = ((local_c + -1) - iVar5);
      iVar7 = FUN_00511690(2);
      FUN_005113b0((local_14 + iVar7), iVar5, iVar6, uVar1);
    }
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x15fc));
    }
  }
  return;
}


 export function FUN_0050503e (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let uVar6;
  let local_6c;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_44 = -1;
  local_38 = -1;
  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x160c));
    local_3c = FUN_00511690(0xb7);
    local_50 = FUN_00511690(0x92);
    local_14 = s32((in_ECX + 0x160c), 0);
    local_10 = s32((in_ECX + 0x1610), 0);
    local_c = s32((in_ECX + 0x1614), 0);
    local_8 = s32((in_ECX + 0x1618), 0);
    local_8 = FUN_00511690(0x28);
    local_8 = (local_10 + local_8);
    FUN_0046ac89(5);
    FUN_00511460(0, 5, DAT_ffffffec);
    if ((_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58] < 0)) {
      if ((_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58] < 1)) {
        local_44 = ((~s8(_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58])) + 1);
      }
      else {
        local_44 = s8(_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58]);
      }
      local_34 = u8(_MEM[DAT_0064c48c + local_44 * 8]);
      FUN_005baee0(0x54, 0xa, 1, 1);
      uVar5 = FUN_00407f90((in_ECX + 0x160c));
      uVar5 = FUN_00428b0c(s32((DAT_0064c488 + local_44 * 8), 0), s32((in_ECX + 0x160c), 0), s32((in_ECX + 0x1610), 0), uVar5);
      FUN_0043c910(uVar5);
      FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
      iVar1 = FUN_00511690(0x10);
      iVar1 = (s32((in_ECX + 0x1610), 0) + iVar1);
      iVar2 = FUN_00511690(0x50);
      FUN_005cef31(DAT_ffffff94, DAT_006a91b8, (s32((in_ECX + 0x160c), 0) + iVar2), iVar1);
      FUN_0047df50();
    }
    else {
      local_38 = s8(_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58]);
      local_34 = s8(_MEM[DAT_0064b1c8 + local_38 * 0x14]);
      local_4c = FUN_00472d20(local_38, s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]));
      local_48 = -1;
      if ((s32((in_ECX + 0x15d4), 0) === 1)) {
        local_48 = -5;
      }
      if ((s32((in_ECX + 0x15d4), 0) === 3)) {
        local_48 = 1;
      }
      uVar6 = 0;
      uVar5 = local_48;
      iVar1 = FUN_00511690(1);
      iVar1 = (s32((in_ECX + 0x1610), 0) + iVar1);
      iVar2 = FUN_00511690(0x49);
      FUN_0056baff(DAT_006a91b8, local_4c, 0, (s32((in_ECX + 0x160c), 0) + iVar2), iVar1, uVar5, uVar6);
    }
    if ((_MEM[DAT_0064f379 + s32((in_ECX + 0x159c), 0) * 0x58] !== 0xda)) {
      uVar5 = local_3c;
      uVar6 = local_50;
      uVar3 = FUN_00511690(0x28);
      uVar4 = FUN_00511690(6);
      FUN_004086c0(DAT_ffffffec, uVar4, uVar3, uVar5, uVar6);
      FUN_0043c790(DAT_ffffffec, s32((in_ECX + 0x160c), 0), s32((in_ECX + 0x1610), 0));
      uVar5 = FUN_00511690(3);
      uVar6 = FUN_00511690(3);
      FUN_004bb800(DAT_ffffffec, uVar6, uVar5);
      uVar5 = FUN_00407fc0(DAT_ffffffec, 0, 0);
      uVar6 = FUN_00511690(0xe);
      local_5c = FUN_00548b70(0xa, uVar6, uVar5);
      local_2c = local_34;
      if ((local_34 < 0xa)) {
        local_2c = DAT_006a657c;
        local_8 = (local_8 - (0xa - local_34) * local_5c);
      }
      uVar5 = FUN_00407f90(DAT_ffffffec, DAT_ffffffa8, 0);
      uVar6 = FUN_00511690(0x11);
      local_54 = FUN_00548b70(DAT_006a657c, uVar6, uVar5);
      local_18 = (local_54 * DAT_006a657c + local_58);
      local_40 = 0;
      iVar1 = FUN_00407f90(DAT_ffffffec);
      if ((local_18 < iVar1)) {
        iVar1 = FUN_00407f90(DAT_ffffffec);
        local_40 = ((iVar1 - local_18) >> 1);
      }
      FUN_004bb840(DAT_ffffffec, 3, 3);
      FUN_005113f0(DAT_ffffffec, 0x51, 0x5d);
      FUN_004bb800(DAT_ffffffec, 1, 1);
      FUN_004bb800(DAT_ffffffec, (local_40 + 2), 2);
      local_1c = 0;
      local_24 = ((s16((DAT_0064f35c + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16);
      local_28 = local_14;
      local_30 = local_10;
      FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
      for (/* cond: (local_1c < 0xa) */); (0 = (0 < local_24) && (local_1c = (local_1c < 0xa))); local_1c = (local_1c + 1)) {
        local_20 = local_24;
        if ((local_2c <= local_24)) {
          local_20 = local_2c;
        }
        uVar5 = FUN_00407f90(DAT_ffffffec, 1);
        uVar6 = FUN_00511690(0x11);
        FUN_005114d0(DAT_00644fb4, local_28, local_30, local_20, local_2c, uVar6, uVar5);
        local_24 = (local_24 - local_20);
        local_30 = (local_30 + local_5c);
      }
      FUN_0047df50();
    }
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x160c));
    }
  }
  return;
}


 export function FUN_005055dd (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 !== 0)) {
    FUN_00408490((in_ECX + 0x161c));
  }
  return;
}


 export function FUN_00505666 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let uVar6;
  let uVar7;
  let local_c0;
  let local_b0;
  let local_a0;
  let local_90;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x162c));
    local_4c = s32((in_ECX + 0x162c), 0);
    local_54 = s32((in_ECX + 0x1630), 0);
    local_20 = -3;
    if ((s32((in_ECX + 0x15d4), 0) === 1)) {
      local_20 = -6;
    }
    if ((s32((in_ECX + 0x15d4), 0) === 3)) {
      local_20 = 0;
    }
    local_48 = FUN_00472cf0(0x45, local_20);
    local_78 = FUN_00472cf0(0x34, local_20);
    local_18 = FUN_00511690(0xc0);
    local_18 = (local_18 / local_48 | 0);
    local_28 = FUN_00511690(0x4e);
    local_28 = (local_28 / local_78 | 0);
    iVar1 = FUN_00511690(0xc0);
    iVar2 = local_48 * local_18;
    iVar3 = FUN_00472cf0(5, local_20);
    local_5c = (((iVar1 - iVar2) + iVar3) >> 1);
    iVar1 = FUN_00511690(0x4e);
    iVar2 = local_78 * local_28;
    iVar3 = FUN_00472cf0(4, local_20);
    local_58 = (((iVar1 - iVar2) + iVar3) >> 1);
    local_3c = FUN_00472cf0(0x20, local_20);
    local_40 = 0;
    for (/* cond: (local_70 < ((DAT_00655b16) << 16 >> 16)) */); local_70 = (local_70 < ((DAT_00655b16) << 16 >> 16)); local_70 = (local_70 + 1)) {
      if ((u8(_MEM[DAT_00656100 + local_70 * 0x20]) === s32((in_ECX + 0x159c), 0))) {
        local_40 = (local_40 + 1);
      }
    }
    if ((local_40 <= local_18)) {
      iVar1 = FUN_00511690(0x4e);
      iVar2 = FUN_00472cf0(0x30, local_20);
      local_58 = ((iVar1 - iVar2) >> 1);
      FUN_0040bbb0();
      FUN_0040bc10(0x1bf);
      FUN_005baee0(0x7c, 0x12, 1, 1);
      uVar4 = FUN_00407f90((in_ECX + 0x167c));
      iVar1 = FUN_00511690(1);
      FUN_0043c910(DAT_00679640, s32((in_ECX + 0x167c), 0), (s32((in_ECX + 0x1680), 0) + iVar1), uVar4);
    }
    local_1c = FUN_00472cf0(0x40, local_20);
    local_6c = (local_5c + local_4c);
    local_74 = (local_58 + local_54);
    local_34 = 0;
    local_60 = 0;
    local_7c = s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]);
    local_64 = u8(_MEM[DAT_0064c6b5 + local_7c * 0x594]);
    local_30 = 0;
    FUN_0046ac89(6);
    for (/* cond: (local_70 < ((DAT_00655b16) << 16 >> 16)) */); local_70 = (local_70 < ((DAT_00655b16) << 16 >> 16)); local_70 = (local_70 + 1)) {
      if ((u8(_MEM[DAT_00656100 + local_70 * 0x20]) === s32((in_ECX + 0x159c), 0))) {
        local_38 = (local_3c + local_74);
        FUN_0056baff(in_ECX, local_70, 4, local_6c, local_74, local_20, 0);
        local_68 = 0;
        local_2c = 0;
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_70 * 0x20]) * 0x14] === 5)) {
          local_68 = DAT_006a6608;
        }
        if (((s16((DAT_006560f4 + local_70 * 0x20), 0) & 0x800) !== 0)) {
          local_68 = (local_68 + 1);
        }
        if ((4 < local_64)) {
          iVar1 = FUN_00453e51(local_7c, 0x15);
          if ((iVar1 === 0)) {
            local_44 = 1;
          }
          else {
            local_44 = 0;
          }
          if ((local_64 === 6)) {
            local_44 = (local_44 + 1);
          }
          else if ((local_30 === 0)) {
            local_44 = 0;
          }
          if ((local_44 === 0)) {
            local_44 = 1;
            local_2c = 2;
          }
          else {
            local_2c = 1;
          }
          local_68 = (local_68 + local_44);
          local_30 = (local_30 + 1);
        }
        FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
        uVar7 = 0;
        uVar6 = 0;
        uVar4 = local_1c;
        uVar5 = FUN_00511690(0xa);
        local_50 = FUN_00548b70(local_68, uVar5, uVar4, uVar6, uVar7);
        local_80 = local_6c;
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_70 * 0x20]) * 0x14] === 5)) {
          for (/* cond: (local_24 < DAT_006a6608) */); local_24 = (local_24 < DAT_006a6608); local_24 = (local_24 + 1)) {
            FUN_005cef31(DAT_ffffff70, in_ECX, local_80, local_38);
            local_80 = (local_80 + local_50);
          }
        }
        if (((s16((DAT_006560f4 + local_70 * 0x20), 0) & 0x800) !== 0)) {
          FUN_005cef31(DAT_ffffff60, in_ECX, local_80, local_38);
          local_80 = (local_80 + local_50);
        }
        if ((local_2c !== 0)) {
          for (/* cond: (local_24 < local_44) */); local_24 = (local_24 < local_44); local_24 = (local_24 + 1)) {
            if ((local_2c === 1)) {
              FUN_005cef31(DAT_ffffff50, in_ECX, local_80, local_38);
            }
            else {
              FUN_005cef31(DAT_ffffff40, in_ECX, local_80, local_38);
            }
            local_80 = (local_80 + local_50);
          }
        }
        FUN_0047df50();
        FUN_004086c0(DAT_ffffffec, local_6c, local_74, local_1c, local_1c);
        FUN_00511460(local_70, 6, DAT_ffffffec);
        local_60 = (local_60 + 1);
        local_6c = (local_6c + local_48);
        if ((local_18 <= local_60)) {
          local_60 = 0;
          local_6c = (local_5c + local_4c);
          local_34 = (local_34 + 1);
          local_74 = (local_74 + local_78);
          if ((local_28 <= local_34)) {
      FUN_00408490((in_ECX + 0x162c));
    }
  }
  return;
}


 export function FUN_00505d3d (param_1)

 {
  let bVar1;
  let sVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_14;
  let local_10;
  let local_c;

  local_c = 0;
  local_10 = -1;
  iVar3 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 !== 0)) {
    iVar3 = IsTracking(DAT_006a91b8);
    if (((DAT_00655af0 & 0x80) !== 0)) {
      uVar6 = 0;
      iVar3 = IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar3, uVar6);
      sVar2 = ((DAT_006aa76c) & 0xFFFF);
      for (/* cond: (local_14 < 0x27) */); local_14 = (local_14 < 0x27); local_14 = (local_14 + 1)) {
        iVar3 = local_14;
        iVar4 = IsTracking(DAT_006a91b8);
        iVar3 = FUN_0043d20a(iVar4, iVar3);
        if ((((((sVar2 + param_1) + 1)) << 16 >> 16) === local_c)) {
          local_10 = local_14;
          break;
        }
      }
      if ((-1 < local_10)) {
        if (((DAT_00655af0 & 0x80) === 0)) {
          FUN_0046e020(0x69, 0, 0, 0);
          FUN_004cc870(s_CANTHOCKTHIS_00630da0, 1, 8);
        }
        else {
          bVar1 = _MEM[DAT_0064c48c + local_10 * 8];
          uVar5 = u8(DAT_0064bccc);
          FUN_004271e8(0, s32((DAT_0064c488 + local_10 * 8), 0));
          FUN_00421da0(0, u8(bVar1) * uVar5);
          iVar3 = FUN_004cc870(s_HOCKTHIS_00630db0, local_10, 8);
          if ((iVar3 === 0)) {
            FUN_0046e020(0x6e, 0, 0, 0);
            uVar6 = 0;
            iVar3 = IsTracking(DAT_006a91b8);
            FUN_0043d289(iVar3, local_10, uVar6);
            iVar3 = IsTracking(DAT_006a91b8);
            w32((DAT_0064c6a2 + s8(_MEM[DAT_0064f348 + iVar3 * 0x58]) * 0x594), 0, (s32((DAT_0064c6a2 + s8(_MEM[DAT_0064f348 + iVar3 * 0x58]) * 0x594), 0) + u8(bVar1) * uVar5));
            iVar3 = IsTracking(DAT_006a91b8);
            w32((DAT_0064f344 + iVar3 * 0x58), 0, (s32((DAT_0064f344 + iVar3 * 0x58), 0) | 4));
            FUN_00509429();
            FUN_00569363(1);
            FUN_00436287(5);
            FUN_00436287(4);
            FUN_00436287(6);
          }
        }
      }
    }
    else {
      FUN_0046e020(0x69, 0, 0, 0);
      iVar3 = IsTracking(DAT_006a91b8);
      FUN_00414dd0(s_ALREADYSOLD_00630d94, iVar3);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00505ffa (in_ECX, param_1)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_78;
  let local_68;
  let local_58;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x163c));
    FUN_0046ac89(4);
    local_30 = s32((in_ECX + 0x166c), 0);
    local_34 = s32((in_ECX + 0x1670), 0);
    FUN_0040bbb0();
    FUN_0040bc10(0x1c0);
    FUN_005baee0(0x7c, 0x12, 1, 1);
    uVar1 = FUN_00407f90((in_ECX + 0x163c));
    iVar3 = s32((in_ECX + 0x1640), 0);
    iVar2 = FUN_00511690(1);
    FUN_0043c910(DAT_00679640, s32((in_ECX + 0x163c), 0), (iVar3 - iVar2), uVar1);
    local_3c = FUN_00511690(2);
    local_3c = (local_30 + local_3c);
    local_44 = FUN_00511690(1);
    local_44 = (local_34 + local_44);
    iVar3 = FUN_00407fc0((in_ECX + 0x166c));
    iVar2 = FUN_00511690(1);
    local_20 = FUN_00511690(0xc);
    local_20 = ((iVar3 - (iVar2 >> 1)) / local_20 | 0);
    local_18 = (s32((in_ECX + 0x15d4), 0) * 2 + -8);
    for (/* cond: (local_1c < local_20) */); local_1c = (local_1c < local_20); local_1c = (local_1c + 1)) {
      uVar1 = FUN_00511690(0xc);
      iVar3 = FUN_00511690(0xc0);
      iVar2 = FUN_00511690(4);
      FUN_004086c0(DAT_ffffffec, local_3c, local_44, (iVar3 - iVar2), uVar1);
      FUN_00511460(local_1c, 4, DAT_ffffffec);
      iVar3 = FUN_00511690(0xc);
      local_44 = (local_44 + iVar3);
    }
    local_44 = (local_34 + 1);
    local_38 = 0;
    for (/* cond: (local_40 < 0x43) */); local_40 = (local_40 < 0x43); local_40 = (local_40 + 1)) {
      if ((local_40 < 0x27)) {
        local_48 = FUN_0043d20a(s32((in_ECX + 0x159c), 0), local_40);
        local_24 = -1;
      }
      else {
        local_24 = (local_40 + -39);
        if ((((s16((DAT_00655be6 + local_24 * 2), 0)) << 16 >> 16) === s32((in_ECX + 0x159c), 0))) {
          local_48 = 1;
        }
        else {
          local_48 = 0;
        }
      }
      if ((local_38 <= (s32((in_ECX + 0x15b4), 0) + local_20))) {
        FUN_0047df20(local_18);
        if ((local_24 < 0)) {
          FUN_005cef31(DAT_ffffff98, in_ECX, local_3c, local_44);
        }
        else {
          FUN_005cef31(DAT_ffffffa8, in_ECX, local_3c, local_44);
        }
        FUN_0047df50();
        local_28 = FUN_00511690(0x18);
        local_28 = (local_3c + local_28);
        local_2c = (local_44 + -1);
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_0064c488 + local_40 * 8), 0));
        FUN_005baee0(0x29, 0xa, 1, 0);
        FUN_0043c8d0(DAT_00679640, local_28, (local_2c + -1));
        iVar3 = s32((in_ECX + 0x1674), 0);
        iVar2 = FUN_00511690(0xe);
        local_28 = FUN_00511690(4);
        local_28 = ((iVar3 - iVar2) - local_28);
        if ((local_24 < 0)) {
          FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 3 + -7));
          FUN_005cef31(DAT_ffffff88, in_ECX, local_28, local_2c);
          FUN_0047df50();
        }
        iVar3 = FUN_00511690(0xc);
        local_44 = (local_44 + iVar3);
      }
    }
    _DAT_006aa770 = local_38;
    FUN_0040fd40(0, (local_38 + -1));
    FUN_005db0d0((local_20 + -1));
    FUN_0040fcf0(s32((in_ECX + 0x15b4), 0));
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x163c));
    }
  }
  return;
}


 export function FUN_00506448 (param_1)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_14;

  FUN_0040bbb0();
  uVar1 = FUN_00410070(s8(_MEM[DAT_006560f7 + param_1 * 0x20]));
  FUN_0040bbe0(uVar1);
  if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
    FUN_0040fe10();
    FUN_0040bc10(0xd);
  }
  FUN_0040fe10();
  FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0));
  FUN_0040ff60(0, DAT_00679640);
  FUN_0040bbb0();
  iVar2 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar3 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar4 = FUN_0043cf76(iVar2, iVar3);
  if ((-1 < iVar4)) {
    FUN_0040bbe0((DAT_0064f360 + iVar4 * 0x58));
    FUN_0040fe10();
  }
  FUN_0040fea0();
  FUN_0040ff30(iVar2);
  FUN_00421d30();
  FUN_0040ff30(iVar3);
  FUN_0040fed0();
  if ((iVar4 < 0)) {
    iVar2 = FUN_0043d07a(iVar2, iVar3, -1, -1, -1);
    if ((-1 < iVar2)) {
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040bc10(0xb2);
      FUN_0040fe10();
      FUN_0040bbe0((DAT_0064f360 + iVar2 * 0x58));
      FUN_0040fed0();
    }
  }
  FUN_0040ff60(1, DAT_00679640);
  FUN_0040bbb0();
  if ((_MEM[DAT_00656100 + param_1 * 0x20] === 0xff)) {
    local_14 = -1;
  }
  else {
    local_14 = u8(_MEM[DAT_00656100 + param_1 * 0x20]);
  }
  FUN_0043ca80(local_14);
  FUN_0040ff60(2, DAT_00679640);
  return;
}


 export function FUN_00506637 (param_1)

 {
  let iVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let uVar4;
  let uVar5;
  let local_340;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00506a2a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = ((((local_8) >> 8) << 8) | 1);
  if ((DAT_00630d2c === 0)) {
    wv(DAT_00630d2c, 1);
    iVar1 = IsTracking(DAT_006a91b8);
    if ((DAT_00655b07 !== 0)) {
      uVar4 = 0;
      iVar1 = IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar1, uVar4);
      wv(DAT_0063605c, 8);
      FUN_005cdea1(0x40, 0x20, 0);
      FUN_00506448(param_1);
      FUN_0040ffa0(s_CHILDCLICK_00630dbc, 1);
      local_340 = DAT_fffffcc0;
      local_340 = DAT_fffffcc0;
      FUN_0059ec88(DAT_ffffffb4, param_1, 0);
      uVar5 = 0;
      uVar3 = 4;
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x4c8), 0), 4, 0);
      FUN_0059edf0(uVar4, uVar3, uVar5);
      iVar1 = FUN_0040bc80(0);
      if ((0 < iVar1)) {
        if ((iVar1 === 3)) {
          _MEM[DAT_006560ff + param_1 * 0x20] = 0xb;
          iVar1 = IsTracking(DAT_006a91b8);
          w16((DAT_00656102 + param_1 * 0x20), 0, s16((DAT_0064f340 + iVar1 * 0x58), 0));
          iVar1 = IsTracking(DAT_006a91b8);
          w16((DAT_00656104 + param_1 * 0x20), 0, s16((DAT_0064f342 + iVar1 * 0x58), 0));
        }
        else if ((iVar1 === 4)) {
          iVar1 = FUN_0043cf76(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
          if ((-1 < iVar1)) {
            w16((DAT_0064f35c + iVar1 * 0x58), 0, ((((s8(_MEM[DAT_0064b1c8 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]) * u8(DAT_0064bccc) / 2 | 0)) & 0xFFFF) + s16((DAT_0064f35c + iVar1 * 0x58), 0)));
            iVar2 = IsTracking(DAT_006a91b8);
            if ((iVar2 === iVar1)) {
              iVar1 = IsTracking(DAT_006a91b8);
              FUN_004e7492(iVar1);
            }
          }
          FUN_005b6042(param_1, 1);
          FUN_00509429();
        }
        else {
          iVar2 = FUN_004087c0(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
          if ((iVar2 !== 0)) {
            iVar2 = FUN_005b633f(param_1);
            if ((iVar2 === 0)) {
              FUN_004897fa(0);
              FUN_00410d98(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
              FUN_00410402(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
            }
            else {
              wv(DAT_00655afe, ((param_1) & 0xFFFF));
              _MEM[DAT_006560ff + param_1 * 0x20] = 0xff;
              wv(DAT_006d1da8, 0);
              FUN_00489a0d(0);
            }
            if ((iVar1 === 2)) {
              FUN_0050994f();
            }
          }
        }
      }
    }
    wv(DAT_00630d2c, 0);
    local_8 = (local_8 & -0x100);
    FUN_00506a15();
    local_8 = -1;
    FUN_00506a1e();
    FUN_00506a34();
    return;
  }
  local_8 = (((local_8) >> 8) << 8);
  FUN_00506a15();
  local_8 = -1;
  FUN_00506a1e();
  FUN_00506a34();
  return;
}


 export function FUN_00506a15 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00506a1e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00506a34 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00506a42 (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let unaff_FS_OFFSET;
  let uVar5;
  let uVar6;
  let uVar7;
  let local_340;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005070cd;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = ((((local_8) >> 8) << 8) | 1);
  if ((DAT_00630d2c !== 0)) {
    local_8 = (((local_8) >> 8) << 8);
    FUN_005070b8();
    local_8 = -1;
    FUN_005070c1();
    FUN_005070d7();
    return;
  }
  wv(DAT_00630d2c, 1);
  FUN_005cdea1(0x40, 0x20, 0);
  iVar1 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 === 0));
  iVar1 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar6);
  if ((DAT_006aa768 !== 0));
  iVar2 = IsTracking(DAT_006a91b8);
  iVar2 = ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16);
  iVar3 = IsTracking(DAT_006a91b8);
  uVar6 = FUN_005b2e69(((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16), iVar2, iVar1);
  iVar1 = FUN_005b2f92(uVar6);
  if ((iVar1 < 0));
  FUN_0040ffa0(s_UNITOPTIONS_00630dc8, 1);
  wv(DAT_0063605c, 8);
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  FUN_0059ec88(DAT_ffffffb4, iVar1, 0);
  uVar7 = 0;
  uVar5 = 0;
  uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x144), 0), 0, 0);
  FUN_0059edf0(uVar6, uVar5, uVar7);
  if ((_MEM[DAT_006560ff + iVar1 * 0x20] !== 0xff)) {
    uVar7 = 0;
    uVar5 = 1;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x148), 0), 1, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    FUN_0059ea99(1);
  }
  if ((_MEM[DAT_006560ff + iVar1 * 0x20] !== 3)) {
    uVar7 = 0;
    uVar5 = 2;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x14c), 0), 2, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  if ((_MEM[DAT_006560ff + iVar1 * 0x20] !== 2)) {
    uVar7 = 0;
    uVar5 = 3;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x150), 0), 3, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  uVar4 = IsTracking(DAT_006a91b8);
  if ((uVar4 !== u8(_MEM[DAT_00656100 + iVar1 * 0x20]))) {
    uVar7 = 0;
    uVar5 = 5;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x2cc), 0), 5, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    if ((_MEM[DAT_00656100 + iVar1 * 0x20] !== 0xff)) {
      uVar7 = 0;
      uVar5 = 6;
      uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x2f4), 0), 6, 0);
      FUN_0059edf0(uVar6, uVar5, uVar7);
    }
  }
  uVar7 = 0;
  uVar5 = 7;
  uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x2d0), 0), 7, 0);
  FUN_0059edf0(uVar6, uVar5, uVar7);
  if ((iVar2 !== 0)) {
    uVar7 = 0;
    uVar5 = 8;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x2f8), 0), 8, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    uVar7 = 0;
    uVar5 = 9;
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x2fc), 0), 9, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  uVar6 = FUN_0040bc80(0);
  /* switch */ () {
  case 1 :
    _MEM[DAT_006560ff + iVar1 * 0x20] = 0xff;
    break;
  case 2 :
    FUN_005b2f50(iVar1);
    break;
  case 3 :
    _MEM[DAT_006560ff + iVar1 * 0x20] = 1;
    FUN_005b6787(iVar1);
    break;
  case 4 :
    FUN_005b3863(iVar1, 1);
    break;
  case 5 :
    iVar2 = IsTracking(DAT_006a91b8);
    _MEM[DAT_00656100 + iVar1 * 0x20] = ((iVar2) & 0xFF);
    FUN_00509429();
    goto LAB_0050708f;
  case 6 :
    FUN_00509590(_MEM[DAT_00656100 + iVar1 * 0x20]);
    goto LAB_0050708f;
  case 7 :
    iVar2 = IsTracking(DAT_006a91b8);
    w16((DAT_0064f35c + iVar2 * 0x58), 0, ((((s8(_MEM[DAT_0064b1c8 + u8(_MEM[DAT_006560f6 + iVar1 * 0x20]) * 0x14]) * u8(DAT_0064bccc) / 2 | 0)) & 0xFFFF) + s16((DAT_0064f35c + iVar2 * 0x58), 0)));
    iVar2 = IsTracking(DAT_006a91b8);
    FUN_004e7492(iVar2);
    FUN_005b6042(iVar1, 1);
    FUN_00509429();
    goto LAB_0050708f;
  case 8 :
    wv(DAT_00655afe, ((iVar1) & 0xFFFF));
    _MEM[DAT_006560ff + iVar1 * 0x20] = 0xff;
    wv(DAT_006d1da8, 0);
    FUN_00489a0d(0);
    break;
  case 9 :
    wv(DAT_00655afe, ((iVar1) & 0xFFFF));
    _MEM[DAT_006560ff + iVar1 * 0x20] = 0xff;
    wv(DAT_006d1da8, 0);
    FUN_00489a0d(0);
    FUN_0050994f();
    goto LAB_0050708f;
  }
  uVar6 = 0;
  iVar1 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar6);
  FUN_00508adc(1);
 LAB_0050708f: :
  wv(DAT_00630d2c, 0);
  local_8 = (local_8 & -0x100);
  FUN_005070b8();
  local_8 = -1;
  FUN_005070c1();
  FUN_005070d7();
  return;
}


 export function FUN_005070b8 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_005070c1 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005070d7 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005070e5 (in_ECX)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let extraout_EAX;
  // in_ECX promoted to parameter;
  let iVar6;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_88;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  local_54 = s32((in_ECX + 0x164c), 0);
  local_58 = s32((in_ECX + 0x1650), 0);
  local_2c = s32((in_ECX + 0x15d8), 0);
  local_6c = FUN_00472cf0(0x40, local_2c);
  local_28 = FUN_00472cf0(0x30, local_2c);
  local_c = FUN_00472cf0(0x40, local_2c);
  local_64 = FUN_00472cf0(0x34, local_2c);
  local_50 = FUN_00511690(0xf4);
  local_50 = (local_50 / local_c | 0);
  iVar1 = FUN_00511690(0xf4);
  local_8 = ((iVar1 - local_c * local_50) / 2 | 0);
  local_20 = FUN_00472cf0(4, local_2c);
  local_3c = (local_50 << 2);
  FUN_0046ac89(3);
  local_78 = FUN_005b2e69(((s16((DAT_0064f340 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16));
  local_68 = 0;
  local_38 = 0;
  local_44 = (local_54 + local_8);
  local_5c = FUN_005b50ad(local_78, 2);
  if ((local_5c <= local_50)) {
    local_20 = (local_20 + (local_64 >> 1));
    FUN_0040bbb0();
    FUN_0040bc10(0x1c3);
    FUN_005baee0(0x7c, 0x12, 1, 1);
    uVar2 = FUN_00407f90((in_ECX + 0x168c));
    iVar1 = FUN_00511690(1);
    FUN_0043c910(DAT_00679640, s32((in_ECX + 0x168c), 0), (s32((in_ECX + 0x1690), 0) + iVar1), uVar2);
  }
  local_70 = local_44;
  local_74 = (local_58 + local_20);
  FUN_005baeb0(in_ECX);
  FUN_005baec8((in_ECX + 0x16ac));
  local_48 = local_50;
  for (/* cond: (-1 < local_78) */); -1 = (-1 < local_78); local_78 = FUN_005b2c82(local_78)) {
    FUN_0056baff(in_ECX, local_78, 4, local_70, local_74, local_2c, 0);
    if ((local_38 < 2)) {
      iVar1 = FUN_00511690(0);
      local_34 = ((local_74 + iVar1) + local_28);
      FUN_0040bbb0();
      if ((_MEM[DAT_00656100 + local_78 * 0x20] === 0xff)) {
        FUN_0040bc10(0xe);
      }
      else {
        FUN_0040bbe0((DAT_0064f360 + u8(_MEM[DAT_00656100 + local_78 * 0x20]) * 0x58));
      }
      wv(DAT_00679643, 0);
      FUN_005baee0(0xa, 0x1a, 1, 1);
      FUN_0043c910(DAT_00679640, local_70, local_34, local_6c);
    }
    local_68 = (local_68 + 1);
    local_70 = (local_70 + local_c);
    if ((local_50 <= local_68)) {
      local_70 = local_44;
      local_74 = (local_74 + local_64);
      local_38 = (local_38 + 1);
      local_68 = 0;
      if ((local_38 === 2)) {
        local_70 = (((local_c >> 1) + local_54) + local_8);
        local_74 = (((local_64 >> 1) + local_58) + local_20);
        local_50 = (local_50 + -1);
        local_44 = local_70;
      }
      else if ((local_38 === 4));
  local_38 = 0;
  local_50 = local_48;
  local_70 = (local_54 + local_8);
  local_74 = (local_58 + local_20);
  local_44 = local_70;
  for (/* cond: (local_40 < local_3c) */); local_40 = (local_40 < local_3c); local_40 = (local_40 + 1)) {
    if ((local_38 === 0)) {
      local_9c = (local_28 + -3);
    }
    else {
      local_9c = local_28;
    }
    FUN_004086c0(DAT_ffffffe4, local_70, local_74, local_6c, local_9c);
    FUN_00511460(local_40, 3, DAT_ffffffe4);
    local_68 = (local_68 + 1);
    local_70 = (local_70 + local_c);
    if ((local_50 <= local_68)) {
      local_68 = 0;
      local_38 = (local_38 + 1);
      local_70 = local_44;
      local_74 = (local_74 + local_64);
      if ((local_38 === 2)) {
        local_70 = (((local_c >> 1) + local_54) + local_8);
        local_74 = (((local_64 >> 1) + local_58) + local_20);
        local_50 = (local_50 + -1);
        local_44 = local_70;
      }
      else if ((local_38 === 4)) {
    FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
    iVar3 = FUN_00407f90((in_ECX + 0x164c), 0);
    iVar1 = FUN_00511690(0xe);
    iVar3 = (iVar3 - iVar1);
    uVar2 = FUN_00511690(0x40);
    iVar1 = DAT_006a6584;
    iVar6 = DAT_006a6584;
    iVar4 = FUN_00511690(0x64);
    iVar4 = (local_58 + iVar4);
    iVar5 = FUN_00511690(7);
    FUN_005114d0(DAT_006466c8, (local_54 + iVar5), iVar4, iVar1, iVar6, uVar2, iVar3);
    FUN_0047df50();
  }
  local_70 = FUN_00511690(7);
  local_70 = (local_54 + local_70);
  local_44 = local_70;
  local_74 = FUN_00511690(0x85);
  local_74 = (local_58 + local_74);
  in_ECX = (in_ECX + 0x16ac);
  local_24 = (extraout_EAX + -2);
  FUN_005baee0(0x79, 0x12, 1, 1);
  iVar1 = FUN_004bd9f0(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), 0x54);
  if ((iVar1 !== 0)) {
    FUN_0040bbb0();
    FUN_0040bc10(0x56);
    FUN_0040fe40();
    for (/* cond: (local_30 < 3) */); local_30 = (local_30 < 3); local_30 = (local_30 + 1)) {
      local_60 = u8((_MEM[DAT_0064f37b + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 0));
      if ((local_60 !== 0)) {
        FUN_0040fea0();
      }
      if ((_MEM[DAT_0064f37b + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 1)) {
        local_a0 = ((~s8(_MEM[DAT_0064f37b + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)])) + 1);
      }
      else {
        local_a0 = s8(_MEM[DAT_0064f37b + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)]);
      }
      FUN_0040ff00(s32((DAT_0064b168 + local_a0 * 4), 0));
      if ((local_60 !== 0)) {
        FUN_0040fed0();
      }
      if ((local_30 < 2)) {
        FUN_00421d30();
      }
    }
    FUN_0043c8d0(DAT_00679640, local_70, local_74);
    local_74 = (local_74 + local_24);
    FUN_0040bbb0();
    FUN_0040bc10(0x57);
    FUN_0040fe40();
    for (/* cond: (local_30 < 3) */); local_30 = (local_30 < 3); local_30 = (local_30 + 1)) {
      local_60 = u8((_MEM[DAT_0064f37e + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 0));
      if ((local_60 !== 0)) {
        FUN_0040fea0();
      }
      if ((_MEM[DAT_0064f37e + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 1)) {
        local_a4 = ((~s8(_MEM[DAT_0064f37e + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)])) + 1);
      }
      else {
        local_a4 = s8(_MEM[DAT_0064f37e + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)]);
      }
      FUN_0040ff00(s32((DAT_0064b168 + local_a4 * 4), 0));
      if ((local_60 !== 0)) {
        FUN_0040fed0();
      }
      if ((local_30 < 2)) {
        FUN_00421d30();
      }
    }
    FUN_0043c8d0(DAT_00679640, local_70, local_74);
    local_74 = (local_74 + local_24);
  }
  iVar1 = FUN_00511690(2);
  local_74 = (local_74 + iVar1);
  for (/* cond: (local_30 < s8(_MEM[DAT_0064f37a + s32((in_ECX + 0x159c), 0) * 0x58])) */); local_30 = (local_30 < s8(_MEM[DAT_0064f37a + s32((in_ECX + 0x159c), 0) * 0x58]));
      local_30 = (local_30 + 1)) {
    FUN_0040bbb0();
    FUN_0040bbe0((DAT_0064f360 + ((s16((DAT_0064f384 + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30 * 2)), 0)) << 16 >> 16) * 0x58));
    FUN_0040fe10();
    if ((_MEM[DAT_0064f381 + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 0)) {
      FUN_0040bc10(0xc0);
    }
    else {
      FUN_0040ff00(s32((DAT_0064b168 + s8(_MEM[DAT_0064f381 + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)]) * 4), 0));
    }
    FUN_0040fe40();
    if ((_MEM[DAT_0064f381 + (s32((in_ECX + 0x159c), 0) * 0x58 + local_30)] < 0)) {
      FUN_0040bbe0(DAT_00630dd4);
      iVar1 = FUN_0043c8d0(DAT_00679640, local_70, local_74);
      local_4c = FUN_00511690(2);
      local_4c = (iVar1 + local_4c);
      FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
      iVar1 = FUN_00511690(3);
      FUN_005cef31(DAT_ffffff68, in_ECX, local_4c, (local_74 + iVar1));
      FUN_0047df50();
    }
    else {
      FUN_00511430();
      FUN_0040ff30(s32((DAT_006a6590 + local_30 * 4), 0));
      iVar1 = FUN_0043c8d0(DAT_00679640, local_70, local_74);
      local_4c = FUN_00511690(2);
      local_4c = (iVar1 + local_4c);
      FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
      iVar1 = FUN_00511690(3);
      FUN_005cef31(DAT_ffffff78, in_ECX, local_4c, (local_74 + iVar1));
      FUN_0047df50();
    }
    local_74 = (local_74 + local_24);
  }
  return;
}


 export function FUN_00507b69 (in_ECX)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_20;
  let local_8;

  cVar1 = _MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58];
  FUN_0040bbb0();
  FUN_0040bc10(0x1c4);
  FUN_005baee0(0x7c, 0x12, 1, 1);
  uVar2 = FUN_00407f90((in_ECX + 0x168c));
  iVar3 = FUN_00511690(1);
  FUN_0043c910(DAT_00679640, s32((in_ECX + 0x168c), 0), (s32((in_ECX + 0x1690), 0) + iVar3), uVar2);
  iVar3 = FUN_00407f90((in_ECX + 0x164c));
  iVar4 = FUN_00407fc0((in_ECX + 0x164c));
  iVar5 = FUN_005adfa0(((iVar3 + -4) / ((DAT_006d1160) << 16 >> 16) | 0), 1, ((iVar4 + -4) / ((DAT_006d1162) << 16 >> 16) | 0));
  iVar3 = (((((iVar3 + -4) - ((DAT_006d1160) << 16 >> 16) * iVar5) >> 1) + 2) + s32((in_ECX + 0x164c), 0));
  iVar4 = (((((iVar4 + -4) - ((DAT_006d1162) << 16 >> 16) * iVar5) >> 1) + 2) + s32((in_ECX + 0x1650), 0));
  local_8 = (((s16((DAT_0064c6ac + s8(cVar1) * 0x594), 0)) << 16 >> 16) - (((DAT_006d1160) << 16 >> 16) >> 1));
  if (((DAT_00655ae8 & 0x8000) !== 0)) {
    local_8 = 0;
  }
  for (/* cond: (local_30 < ((DAT_006d1162) << 16 >> 16)) */); local_30 = (local_30 < ((DAT_006d1162) << 16 >> 16)); local_30 = (local_30 + 1)) {
    for (/* cond: (local_20 < ((DAT_006d1160) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_006d1160) << 16 >> 16)); local_20 = (local_20 + 1)) {
      uVar2 = FUN_005ae052((local_20 + local_8));
      iVar6 = FUN_004087c0(uVar2, local_30);
      if ((DAT_00655b07 !== 0)) {
        iVar6 = FUN_005b89e4(uVar2, local_30);
        FUN_00408780((local_20 * iVar5 + iVar3), (local_30 * iVar5 + iVar4), iVar5, iVar5, (((-u8((iVar6 === 0))) & -45) + 0x5d));
      }
    }
  }
  for (/* cond: (local_34 < ((DAT_00655b16) << 16 >> 16)) */); local_34 = (local_34 < ((DAT_00655b16) << 16 >> 16)); local_34 = (local_34 + 1)) {
    if ((u8(_MEM[DAT_00656100 + local_34 * 0x20]) === s32((in_ECX + 0x159c), 0))) {
      iVar6 = FUN_005ae052((((s16((DAT_006560f0 + local_34 * 0x20), 0)) << 16 >> 16) - local_8));
      FUN_00408780((iVar6 * iVar5 + iVar3), (((s16((DAT_006560f2 + local_34 * 0x20), 0)) << 16 >> 16) * iVar5 + iVar4), iVar5, iVar5, 0x1d);
    }
  }
  iVar6 = FUN_005ae052((((s16((DAT_0064f340 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) - local_8))
  ;
  FUN_00408780((iVar6 * iVar5 + iVar3), (((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) * iVar5 + iVar4), iVar5, iVar5, 0x29);
  return;
}


 export function FUN_00507f31 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  iVar1 = FUN_00511690(0x14);
  local_14 = (((param_3 >> 1) + param_2) - (iVar1 >> 1));
  local_c = 0;
  do {
    if ((3 < local_c)) {
      return;
    }
    local_8 = 0;
    /* switch */ () {
    case 0 :
      local_18 = 0xe;
      break;
    case 1 :
      local_18 = 0xb;
      iVar1 = FUN_004bd9f0(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), 0x37);
      if ((iVar1 !== 0)) {
        iVar1 = FUN_00453e51(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]), 0xa);
        if ((iVar1 !== 0)) {
          local_8 = 1;
          local_18 = 0x31;
        }
        break;
      }
      goto LAB_00507f6b;
    case 2 :
      local_18 = 4;
      break;
    case 3 :
      iVar1 = FUN_0043d20a(s32((in_ECX + 0x159c), 0), 1);
      if ((iVar1 === 0)) {
        local_18 = 7;
      }
      else {
        local_18 = 1;
      }
      if ((_MEM[DAT_0064c6b5 + s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]) * 0x594] !== 6));
    if ((local_8 !== 0)) {
      if ((2 < local_10)) {
        return;
      }
      if ((local_10 !== 0)) {
        iVar1 = FUN_00511690(2);
        w32(param_1, 0, (s32(param_1, 0) - iVar1));
      }
      local_10 = (local_10 + 1);
      iVar1 = FUN_00511690(0x24);
      w32(param_1, 0, (s32(param_1, 0) - iVar1));
      FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
      FUN_005cef31(DAT_ffffffd8, in_ECX, s32(param_1, 0), local_14);
      FUN_0047df50();
    }
 LAB_00507f6b: :
    local_c = (local_c + 1);
  } ( true );
}


 export function FUN_00508177 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let extraout_EAX;
  let uVar5;
  let iVar6;
  // in_ECX promoted to parameter;
  let piVar7;
  let local_38;
  let local_28;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  bVar2 = 0;
  iVar3 = s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]);
  bVar1 = _MEM[DAT_0064c6b5 + iVar3 * 0x594];
  local_c = s32((in_ECX + 0x15d8), 0);
  iVar4 = FUN_00472cf0(0x40, local_c);
  local_8 = FUN_00472cf0(0x30, local_c);
  param_3 = (param_3 >> 1);
  if ((bVar1 === 4)) {
    in_ECX = (in_ECX + 0x16ac);
    FUN_005baee0(0x29, 0xa, 1, 0);
    uVar5 = FUN_00428b0c(UNK_0064b9b0, s32(param_1, 0), ((param_3 + param_2) - (extraout_EAX >> 1)), 0);
    iVar3 = FUN_0043c950(uVar5);
    w32(param_1, 0, iVar3);
  }
  else if ((bVar1 < 5)) {
    local_28 = 0;
    for (/* cond: (local_38 < ((DAT_00655b16) << 16 >> 16)) */); local_38 = (local_38 < ((DAT_00655b16) << 16 >> 16)); local_38 = (local_38 + 1)) {
      if ((_MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + local_38 * 0x20]) * 0x14] !== 0)) {
        local_28 = (local_28 + 1);
        if ((3 < local_28)) {
          return;
        }
        w32(param_1, 0, (s32(param_1, 0) - iVar4));
        if (bVar2) {
          iVar6 = FUN_00511690(2);
          w32(param_1, 0, (s32(param_1, 0) - iVar6));
        }
        else {
          bVar2 = 1;
        }
        FUN_0056baff(in_ECX, local_38, 4, s32(param_1, 0), ((param_3 + param_2) - iVar3), local_c, 0);
      }
    }
  }
  else {
    iVar4 = FUN_00511690(0xa);
    iVar6 = FUN_00453e51(iVar3, 0x15);
    if ((iVar6 === 0)) {
      local_18 = 1;
    }
    else {
      local_18 = 0;
    }
    if ((_MEM[DAT_0064c6b5 + iVar3 * 0x594] === 6)) {
      local_18 = (local_18 + 1);
    }
    if ((local_18 !== 0)) {
      local_20 = DAT_006a65e4;
      if ((_MEM[DAT_0064c6b5 + iVar3 * 0x594] === 5)) {
        local_20 = (DAT_006a65e4 + -1);
      }
      local_14 = local_20 * local_18;
      if ((local_14 !== 0)) {
        iVar3 = FUN_00511690(2);
        param_4 = (param_4 - iVar3);
        uVar5 = 0;
        piVar7 = DAT_ffffffec;
        local_10 = param_4;
        iVar3 = FUN_00511690(0xa);
        iVar3 = FUN_00548b70(local_14, (iVar3 + 1), param_4, piVar7, uVar5);
        local_10 = FUN_00511690(0xa);
        local_10 = (local_10 + (local_14 + -1) * iVar3);
        w32(param_1, 0, (s32(param_1, 0) - local_10));
        FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
        uVar5 = 0;
        iVar3 = local_10;
        iVar6 = FUN_00511690(0xa);
        FUN_005114d0(DAT_00646598, s32(param_1, 0), ((param_3 + param_2) - (iVar4 >> 1)), local_14, local_14, (iVar6 + 1), iVar3, uVar5);
        FUN_0047df50();
      }
    }
  }
  return;
}


 export function FUN_00508552 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let extraout_EAX;
  let extraout_EAX_00;
  let iVar3;
  // in_ECX promoted to parameter;
  let iVar4;
  let local_64;
  let local_54;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_44 = s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]);
  FUN_0040bbb0();
  FUN_0040bc10(0x1c5);
  FUN_005baee0(0x7c, 0x12, 1, 1);
  uVar1 = FUN_00407f90((in_ECX + 0x168c));
  iVar2 = FUN_00511690(1);
  FUN_0043c910(DAT_00679640, s32((in_ECX + 0x168c), 0), (s32((in_ECX + 0x1690), 0) + iVar2), uVar1);
  local_20 = (s32((in_ECX + 0x168c), 0) + 2);
  iVar2 = FUN_00511690(0xe);
  local_34 = ((s32((in_ECX + 0x1690), 0) + iVar2) + 2);
  local_30 = FUN_00407f90((in_ECX + 0x168c));
  local_30 = (local_30 + -4);
  local_3c = FUN_00407fc0((in_ECX + 0x168c));
  local_3c = (local_3c + -4);
  local_10 = (local_3c / 5 | 0);
  local_38 = local_20;
  local_40 = local_34;
  iVar4 = (local_10 >> 1);
  iVar2 = FUN_00511690(0x1e);
  local_24 = (iVar4 - (iVar2 >> 1));
  local_14 = 0;
  local_18 = 0;
  do {
    if ((4 < local_18)) {
      return;
    }
    if ((local_18 !== 0)) {
      FUN_005113b0(s32((in_ECX + 0x168c), 0), (s32((in_ECX + 0x1694), 0) + -1), local_40, 0x7c);
    }
    local_c = (local_30 >> 1);
    local_2c = (local_38 + local_30);
    /* switch */ () {
    case 0 :
      break;
    case 1 :
      if (((u8(_MEM[DAT_006a6620 + local_14]) - u8(_MEM[DAT_006a65f0 + local_14])) !== (u8(DAT_006a6621) - u8(DAT_006a65f1)))) {
        local_14 = 1;
        local_8 = FUN_00511690(0xe);
        local_2c = (local_2c - local_8);
        iVar4 = ((local_10 >> 1) + local_40);
        iVar2 = FUN_00511690(0xe);
        local_1c = (iVar4 - (iVar2 >> 1));
        FUN_0047df20((s32((in_ECX + 0x15d4), 0) * 4 + -8));
        FUN_005cef31(DAT_ffffffac, in_ECX, local_2c, local_1c);
        FUN_0047df50();
        break;
      }
      goto LAB_00508678;
    case 2 :
      iVar2 = FUN_0043d20a(s32((in_ECX + 0x159c), 0), 4);
      if ((_MEM[DAT_0064c6b5 + local_44 * 0x594] !== 6));
      FUN_00507f31(DAT_ffffffd4, local_40, local_10);
      break;
    case 3 :
      if (((u8(_MEM[DAT_006a6620 + local_14]) - u8(_MEM[DAT_006a65f0 + local_14])) === (u8(DAT_006a6623) - u8(DAT_006a65f3))));
      break;
    case 4 :
      if (((u8(DAT_006a6623) - u8(DAT_006a65f3)) === (u8(DAT_006a6624) - u8(DAT_006a65f4))));
      in_ECX = (in_ECX + 0x16ac);
      local_1c = (iVar2 - (extraout_EAX >> 1));
      FUN_005baee0(0x29, 0xa, 1, 0);
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x160), 0), local_2c, local_1c, 0);
      local_2c = FUN_0043c950(uVar1);
    }
    iVar2 = FUN_00511690(2);
    local_2c = (local_2c - iVar2);
    local_28 = (local_2c - local_38);
    iVar2 = local_28;
    if ((local_c <= local_28)) {
      iVar2 = local_c;
    }
    local_c = iVar2;
    if ((_MEM[DAT_0064c6b5 + local_44 * 0x594] === 4)) {
      iVar2 = ((local_10 >> 1) + local_40);
      in_ECX = (in_ECX + 0x16ac);
      local_1c = (iVar2 - (extraout_EAX_00 >> 1));
      FUN_005baee0(0x29, 0xa, 1, 0);
      FUN_0040bbb0();
      FUN_0040bc10(0x5d);
      FUN_0040fe40();
      FUN_0040ff30(DAT_006a6618);
      iVar4 = ((local_10 >> 1) + local_40);
      iVar2 = FUN_00511690(0xe);
      local_1c = (iVar4 - (iVar2 >> 1));
      FUN_005cef31(DAT_ffffff9c, in_ECX, local_38, local_1c);
      iVar2 = local_1c;
      iVar4 = FUN_00511690(0xe);
      iVar3 = FUN_00511690(3);
      FUN_0043c8d0(DAT_00679640, ((iVar4 + iVar3) + local_38), iVar2);
    }
    else {
      FUN_00501e63(local_38, (local_40 + local_24), iVar2, _MEM[DAT_006a6620 + local_18], _MEM[DAT_006a65f0 + local_18], _MEM[DAT_006a6628 + local_18]);
    }
    local_40 = (local_40 + local_10);
 LAB_00508678: :
    local_18 = (local_18 + 1);
  } ( true );
}


 export function FUN_00508adc (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_00501733((in_ECX + 0x164c));
    iVar1 = s32((in_ECX + 0x15b0), 0);
    if ((iVar1 === 0)) {
      FUN_005070e5();
    }
    else if ((iVar1 === 1)) {
      FUN_00507b69();
    }
    else if ((iVar1 === 2)) {
      FUN_00508552();
    }
    if ((param_1 !== 0)) {
      FUN_00408490((in_ECX + 0x164c));
    }
  }
  return;
}


 export function FUN_00508bc5 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    FUN_0050207f(param_1, 0);
    FUN_005025d5(param_1);
    FUN_00504c05(param_1);
    FUN_0050503e(param_1);
    FUN_005055dd(param_1);
    FUN_00505666(param_1);
    FUN_00505ffa(param_1);
    FUN_00508adc(param_1);
  }
  return;
}


 export function FUN_00508c84 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  // in_ECX promoted to parameter;

  FUN_004086c0(param_1, ((s32((in_ECX + 0x15c4), 0) + ((s32((in_ECX + 0x15d4), 0) * param_2 + 1) / 2 | 0)) + s32((in_ECX + 0x124), 0)), ((s32((in_ECX + 0x128), 0) + ((s32((in_ECX + 0x15d4), 0) * param_3 + 1) / 2 | 0)) + s32((in_ECX + 0x15c8), 0)), ((s32((in_ECX + 0x15d4), 0) * param_4 + 1) / 2 | 0), ((s32((in_ECX + 0x15d4), 0) * param_5 + 1) / 2 | 0));
  return;
}


 export function FUN_00508d24 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00508c84((in_ECX + 0x15dc), 0, 0, 0x1b4, 0x3d);
  FUN_00508c84((in_ECX + 0x15ec), 0, 0x3d, 0x1b4, 0x99);
  FUN_00508c84((in_ECX + 0x165c), 7, 0x41, 0xbc, 0x89);
  FUN_00508c84((in_ECX + 0x15fc), 0x1b4, 0, 0xc8, 0xa7);
  FUN_00508c84((in_ECX + 0x160c), 0x1b4, 0xa7, 0xc8, 0xbd);
  FUN_00508c84((in_ECX + 0x161c), 0x1b4, 0x164, 0xc8, 0x41);
  FUN_00508c84((in_ECX + 0x162c), 0, 0xd4, 0xc0, 0x4e);
  FUN_00508c84((in_ECX + 0x167c), 7, 0xd8, 0xb5, 0x45);
  FUN_00508c84((in_ECX + 0x163c), 0, 0x122, 0xc0, 0x83);
  FUN_00508c84((in_ECX + 0x166c), 6, 0x132, 0xa6, 0x6c);
  FUN_00508c84((in_ECX + 0x164c), 0xc0, 0xd4, 0xf4, 0xd1);
  FUN_00508c84((in_ECX + 0x168c), 0xc5, 0xd8, 0xe9, 0xc6);
  return;
}


 export function FUN_00508ec6 (in_ECX)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let uVar7;

  iVar4 = s32((in_ECX + 0x15c4), 0);
  iVar1 = s32((in_ECX + 0x15c8), 0);
  if ((0 < iVar4)) {
    iVar3 = s32((in_ECX + 0x15bc), 0);
    iVar2 = FUN_00511690(0x27c);
    iVar3 = (iVar3 - (iVar4 + iVar2));
    FUN_00408780(s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x15c4), 0), s32((in_ECX + 0x15c0), 0), 0xa);
    uVar6 = 0xa;
    uVar5 = s32((in_ECX + 0x15c0), 0);
    uVar7 = s32((in_ECX + 0x128), 0);
    iVar2 = FUN_00511690(0x27c);
    FUN_00408780(((s32((in_ECX + 0x124), 0) + iVar2) + iVar4), uVar7, iVar3, uVar5, uVar6);
  }
  if ((0 < iVar1)) {
    iVar4 = s32((in_ECX + 0x15c0), 0);
    iVar3 = FUN_00511690(0x1a5);
    iVar4 = (iVar4 - (iVar1 + iVar3));
    FUN_00408780(s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x15bc), 0), s32((in_ECX + 0x15c8), 0), 0xa);
    uVar7 = 0xa;
    uVar5 = s32((in_ECX + 0x15bc), 0);
    iVar3 = FUN_00511690(0x1a5);
    FUN_00408780(s32((in_ECX + 0x124), 0), ((s32((in_ECX + 0x128), 0) + iVar3) + iVar1), uVar5, iVar4, uVar7);
  }
  return;
}


 export function FUN_00509028 (in_ECX)

 {
  let pCVar1;
  let pCVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let uVar6;
  let local_10;

  iVar4 = s32((in_ECX + 0x11c), 0);
  pCVar1 = GetActiveView(in_ECX);
  pCVar2 = GetActiveView(in_ECX);
  w32((in_ECX + 0x15d4), 0, 2);
  if (((iVar4 * 2 + 0x3b6) <= pCVar2)) {
    w32((in_ECX + 0x15d4), 0, 3);
  }
  if ((pCVar2 < (iVar4 * 2 + 0x278))) {
    w32((in_ECX + 0x15d4), 0, 1);
  }
  if ((s32((in_ECX + 0x15d4), 0) < 2)) {
    local_10 = 0xc;
    w32((in_ECX + 0x118), 0, 0x12);
  }
  else {
    local_10 = FUN_00511690(0x10);
    uVar3 = FUN_00511690(0x18);
    w32((in_ECX + 0x118), 0, uVar3);
  }
  FUN_00417ef0(0, local_10);
  FUN_00417ef0(0, (local_10 * 2 / 3 | 0));
  FUN_00552ed2();
  w32((in_ECX + 0x15bc), 0, s32((in_ECX + 0x12c), 0));
  w32((in_ECX + 0x15c0), 0, s32((in_ECX + 0x130), 0));
  FUN_0050101f();
  iVar4 = FUN_00511690(0x27c);
  iVar5 = FUN_00511690(0x1a5);
  if ((iVar4 < s32((in_ECX + 0x15bc), 0))) {
    w32((in_ECX + 0x15c4), 0, ((s32((in_ECX + 0x15bc), 0) - iVar4) >> 1));
  }
  else {
    w32((in_ECX + 0x15c4), 0, 0);
  }
  if ((iVar5 < s32((in_ECX + 0x15c0), 0))) {
    w32((in_ECX + 0x15c8), 0, ((s32((in_ECX + 0x15c0), 0) - iVar5) >> 1));
  }
  else {
    w32((in_ECX + 0x15c8), 0, 0);
  }
  uVar6 = u8((s32((in_ECX + 0x15d4), 0) < 3));
  uVar3 = FUN_00511690(0xc);
  FUN_0043c6c0(1, uVar3, uVar6);
  if ((s32((in_ECX + 0x15c8), 0) === s32((in_ECX + 0x15d0), 0))) {
    if ((s32((in_ECX + 0x15cc), 0) < 0)) {
      FUN_0050cf06();
    }
  }
  else {
    FUN_0050cf06();
  }
  w32((in_ECX + 0x15cc), 0, s32((in_ECX + 0x15c4), 0));
  w32((in_ECX + 0x15d0), 0, s32((in_ECX + 0x15c8), 0));
  return;
}


 export function FUN_005092af (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  FUN_0040bbb0();
  FUN_0040bc10(0x1f);
  FUN_0040fe10();
  FUN_00414d70((DAT_0064f360 + s32((in_ECX + 0x159c), 0) * 0x58));
  if ((1 < DAT_006aa78c)) {
    FUN_00421d30();
    FUN_00421f10(((DAT_00655afa) << 16 >> 16));
    if (((DAT_00655af0 & 0x80) === 0)) {
      FUN_00421d30();
      FUN_0040bc10(0x22);
      FUN_0040fe10();
      FUN_005116f0(s32((in_ECX + 0x159c), 0));
    }
    else if ((iVar1 !== 0)) {
      FUN_00421d30();
      FUN_0040bc10(0x1b0);
      if ((1 < iVar1)) {
        FUN_0040bbe0(DAT_00630dd8);
        FUN_0040ff30(iVar1);
      }
    }
    FUN_0040fe10();
    FUN_0040fea0();
    FUN_0040bc10(0x9a);
    FUN_0040fe40();
    FUN_0043c8a0(s32((DAT_0064c6a2 + s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x159c), 0) * 0x58]) * 0x594), 0));
    FUN_0040fed0();
  }
  FUN_0055324c(DAT_00679640);
  return;
}


 export function FUN_00509429 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((DAT_00628044 !== 0)) {
    if ((s32((in_ECX + 0x15a4), 0) === 0)) {
      FUN_004eb4ed(s32((in_ECX + 0x159c), 0), 1);
      FUN_00509028();
      FUN_005092af();
      FUN_005a9780(in_ECX);
      FUN_00552112();
      FUN_00508ec6();
      FUN_00508d24();
      FUN_00508bc5(0);
      FUN_00408460();
    }
    else {
      FUN_005092af();
    }
  }
  return;
}


 export function FUN_0050951f ()

 {
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 export function FUN_00509545 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x15a0), 0) === 0)) {
    iVar1 = FUN_00414d10();
    FUN_006e7da0(s32((iVar1 + 4), 0));
  }
  return;
}


 export function FUN_00509590 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((DAT_006ad904 === 0)) {
    wv(DAT_00655aee, (DAT_00655aee | 2));
    w32((in_ECX + 0x159c), 0, param_1);
    FUN_004e7492(s32((in_ECX + 0x159c), 0));
    if ((s32((in_ECX + 0x15a4), 0) !== 0)) {
      w32((in_ECX + 0x15b0), 0, 0);
      w32((in_ECX + 0x15b4), 0, 0);
      w32((in_ECX + 0x15b8), 0, 1);
      if ((s32((in_ECX + 0x15a0), 0) !== 0)) {
        FUN_004085f0();
      }
    }
    w32((in_ECX + 0x15a4), 0, 0);
    w32((in_ECX + 0x15a8), 0, 0);
    if ((s32((in_ECX + 0x15a0), 0) === 0)) {
      FUN_005bb574();
      FUN_004085f0();
    }
    else {
      FUN_004e7240();
    }
    if ((DAT_00630d20 !== 0)) {
      FUN_0050ca8d(1);
      wv(DAT_00630d20, 0);
    }
    FUN_0050ccb3(1);
    wv(DAT_00630d18, 0);
    if ((DAT_0062edf8 === 0)) {
      if ((s8(_MEM[DAT_0064f348 + param_1 * 0x58]) !== DAT_006d1da0)) {
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_CITYSTUFF_00630e00);
        wv(DAT_00655af4, (DAT_00655af4 | 1));
      }
    }
    else {
      if ((DAT_00631edc !== 0)) {
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_DISORDER2_00630de8);
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_DISORDER3_00630df4);
      }
      while ((DAT_00630d18 === 0)) {
        FUN_0040ef50();
      }
    }
  }
  return;
}


 export function FUN_00509935 ()

 {
  FUN_00509429();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050994f ()

 {
  wv(DAT_006aa75c, 1);
  FUN_004503d0();
  _DAT_006aa754 = -1;
  FUN_00451900();
  FUN_00484d52();
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050998f ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;

  iVar1 = FUN_00511690(0x27c);
  iVar2 = FUN_00511690(0x1a5);
  iVar3 = FUN_00511690(0x18);
  iVar2 = (iVar2 + (iVar3 + 8));
  iVar3 = FUN_004080c0();
  iVar4 = FUN_00414bb0();
  _DAT_006aa784 = -1;
  FUN_004086c0(DAT_00655344, ((iVar3 >> 1) - ((iVar1 + 0x10) >> 1)), ((iVar4 >> 1) - (iVar2 >> 1)), ((iVar1 + 0x10) + DAT_006335a0), (iVar2 + DAT_006335a4));
  return;
}


 export function FUN_00509a49 ()

 {
  wv(DAT_006aa78c, 2);
  if ((0x3e7 < DAT_006ab198)) {
    wv(DAT_006aa78c, 3);
  }
  FUN_0050998f();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00509a82 ()

 {
  _DAT_006aa758 = 1;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00509a9c ()

 {
  _DAT_006aa758 = 0;
  FUN_00509429();
  return;
}


 export function FUN_00509ac0 (param_1, param_2)

 {
  let iVar1;

  param_1 = param_1 * DAT_006a657c;
  iVar1 = FUN_00511350((DAT_006a65cc - DAT_006a6568), 1, 0x63, 1, 0x3e7);
  iVar1 = FUN_00511350(((((param_1 + -1) - param_2) / iVar1 | 0) + 1));
  FUN_0040ff30(iVar1);
  FUN_0040fe10();
  if ((iVar1 === 1)) {
    FUN_0040bc10(0x2d);
  }
  else {
    FUN_0040bc10(0x2c);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00509b48 (param_1)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let unaff_FS_OFFSET;
  let uVar7;
  let uVar8;
  let local_368;
  let local_35c;
  let local_354;
  let local_60;
  let local_58;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050a1be;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar2 = IsTracking(DAT_006a91b8);
  if ((iVar2 === -1)) {
    local_8 = -1;
    FUN_0050a1b2();
    FUN_0050a1c8();
    return;
  }
  iVar2 = XD_InFlushSendBuffer();
  if ((DAT_006ad904 !== 0)) {
    FUN_005d225b(s_Citywin:_city_button_buy()_block_00630e0c);
    wv(DAT_006c31ac, 7);
    _DAT_006c31b0 = IsTracking(DAT_006a91b8);
    iVar2 = IsTracking(DAT_006a91b8);
    _DAT_006c31b4 = s8(_MEM[DAT_0064f348 + iVar2 * 0x58]);
    _DAT_006c31b8 = param_1;
    local_8 = -1;
    FUN_0050a1b2();
    FUN_0050a1c8();
    return;
  }
  uVar7 = 0;
  iVar2 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar7);
  iVar2 = IsTracking(DAT_006a91b8);
  iVar2 = s8(_MEM[DAT_0064f348 + iVar2 * 0x58]);
  iVar3 = IsTracking(DAT_006a91b8);
  iVar3 = s8(_MEM[DAT_0064f379 + iVar3 * 0x58]);
  iVar4 = IsTracking(DAT_006a91b8);
  iVar4 = s8(_MEM[DAT_0064f379 + iVar4 * 0x58]);
  if ((DAT_00655b07 === 0)) {
    local_8 = -1;
    FUN_0050a1b2();
    FUN_0050a1c8();
    return;
  }
  if (((-iVar4) === 0x26)) {
    local_8 = -1;
    FUN_0050a1b2();
    FUN_0050a1c8();
    return;
  }
  iVar5 = IsTracking(DAT_006a91b8);
  if ((_MEM[DAT_0064f379 + iVar5 * 0x58] < 0)) {
    local_368 = u8(_MEM[DAT_0064c48c + iVar4 * -8]);
    uVar8 = 0x3e7;
    uVar7 = 0;
    uVar6 = u8(DAT_0064bccc);
    iVar5 = IsTracking(DAT_006a91b8);
    iVar5 = FUN_005adfa0((uVar6 * local_368 - ((s16((DAT_0064f35c + iVar5 * 0x58), 0)) << 16 >> 16)), uVar7, uVar8);
    local_35c = iVar5 * 2;
    if ((0x22 < (-iVar4))) {
      local_35c = (iVar5 << 2);
    }
    FUN_004271e8(0, s32((DAT_0064c488 + iVar4 * -8), 0));
  }
  else {
    local_368 = s8(_MEM[DAT_0064b1c8 + iVar3 * 0x14]);
    uVar8 = 0x3e7;
    uVar7 = 0;
    uVar6 = u8(DAT_0064bccc);
    iVar5 = IsTracking(DAT_006a91b8);
    iVar5 = FUN_005adfa0((uVar6 * local_368 - ((s16((DAT_0064f35c + iVar5 * 0x58), 0)) << 16 >> 16)), uVar7, uVar8);
    local_35c = ((iVar5 * iVar5 / 0x14 | 0) + iVar5 * 2);
    FUN_004271e8(0, s32((DAT_0064b1b8 + iVar3 * 0x14), 0));
  }
  iVar5 = IsTracking(DAT_006a91b8);
  if ((s16((DAT_0064f35c + iVar5 * 0x58), 0) === 0)) {
    local_35c = (local_35c << 1);
  }
  FUN_00421da0(0, local_35c);
  FUN_00467580(1, s32((DAT_0064c6a2 + iVar2 * 0x594), 0));
  FUN_005f22d0(DAT_ffffffa0, s_COMPLETE0_00630e54);
  bVar1 = (local_35c <= s32((DAT_0064c6a2 + iVar2 * 0x594), 0));
  if (bVar1) {
    local_58 = 0x31;
  }
  iVar5 = IsTracking(DAT_006a91b8);
  if (((_MEM[DAT_0064f344 + iVar5 * 0x58] & 1) !== 0)) {
    local_58 = 0x32;
    bVar1 = 0;
  }
  FUN_0043c9d0(DAT_ffffffa0);
  iVar5 = IsTracking(DAT_006a91b8);
  if ((_MEM[DAT_0064f379 + iVar5 * 0x58] < 0)) {
    FUN_0059ec88((DAT_00645160 + iVar4 * -60), 0, 0);
  }
  else {
    FUN_0059ec88((DAT_00641848 + iVar3 * 0x3c), 0, 0);
  }
  local_354 = DAT_fffffcac;
  if (bVar1) {
    FUN_0059ea99(1);
  }
  iVar3 = FUN_0040bc80(0);
  if (bVar1) {
    if ((DAT_006aa75c !== 1)) {
      w32((DAT_0064c6a2 + iVar2 * 0x594), 0, (s32((DAT_0064c6a2 + iVar2 * 0x594), 0) - local_35c));
      iVar2 = IsTracking(DAT_006a91b8);
      w16((DAT_0064f35c + iVar2 * 0x58), 0, u8(DAT_0064bccc) * ((local_368) & 0xFFFF));
      iVar2 = IsTracking(DAT_006a91b8);
      FUN_004e7492(iVar2);
      FUN_0046e020(0x68, 1, 0, 0);
      uVar7 = 1;
      iVar2 = IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar2, uVar7);
      FUN_0050503e(1);
      FUN_005092af();
      FUN_00569363(1);
    }
    local_8 = -1;
    FUN_0050a1b2();
    FUN_0050a1c8();
    return;
  }
  local_8 = -1;
  FUN_0050a1b2();
  FUN_0050a1c8();
  return;
}


 export function FUN_0050a1b2 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0050a1c8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0050a1d6 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let local_40;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = -1;
  local_20 = -1;
  local_1c = -2;
  if ((param_3 < 0x3e)) {
    local_18 = param_3;
  }
  else {
    local_20 = (param_3 + -62);
  }
  local_10 = param_5;
  if (((param_4 & 1) !== 0)) {
    local_10 = (param_5 + 0x26);
  }
  if ((-1 < local_18)) {
    local_14 = param_6;
    local_8 = FUN_00472cf0(0x30, -2);
    local_c = ((local_8 - param_7) / 2 | 0);
    local_14 = (local_14 - local_c);
    FUN_0047df20(local_1c);
    FUN_005cef31(DAT_ffffffd0, param_2, local_10, local_14);
    FUN_0047df50();
  }
  if ((-1 < local_20)) {
    local_c = ((0x14 - param_7) / 2 | 0);
    local_14 = (param_6 - local_c);
    FUN_005cef31(DAT_ffffffc0, param_2, local_10, local_14);
  }
  return 0;
}


 export function FUN_0050a2f7 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let local_28;
  let local_20;
  let local_18;
  let local_c;
  let local_8;

  local_c = 0;
  local_28 = -1;
  for (/* cond: (local_20 < ((DAT_00655b18) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_00655b18) << 16 >> 16)); local_20 = (local_20 + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_20 * 0x58]) === param_3)) {
      local_8 = s8(_MEM[DAT_0064f349 + local_20 * 0x58]);
      iVar1 = FUN_0043d20a(local_20, 1);
      if ((iVar1 !== 0)) {
        local_8 = (local_8 + 0xc8);
      }
      if ((_MEM[DAT_0064f379 + local_20 * 0x58] === 0xff)) {
        local_8 = (local_8 + 0x64);
      }
      if ((local_c < local_8)) {
        local_c = local_8;
        local_28 = local_20;
      }
    }
  }
  if ((-1 < local_28)) {
    local_18 = param_5;
    if (((param_4 & 1) !== 0)) {
      local_18 = (param_5 + 0x26);
    }
    iVar1 = FUN_00472cf0(0x30, -2);
    FUN_0056d289(param_2, local_28, 0, local_18, (param_6 - ((iVar1 - param_7) / 2 | 0)), -2);
  }
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050a473 (param_1)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let piVar5;
  let uVar6;
  let piVar7;
  let local_95c;
  let local_958;
  let local_954;
  let local_660;
  let local_65c;
  let local_658;
  let local_654;
  let local_578;
  let local_360;
  let local_6c;
  let local_68;
  let local_64;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050b65c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x8000);
  local_8 = 0;
  FUN_0059db08(0x4000);
  local_8 = 1;
  FUN_0059db08(0x4000);
  local_8 = 2;
  iVar2 = IsTracking(DAT_006a91b8);
  if ((iVar2 === -1)) {
    local_8 = 1;
    FUN_0050b638();
    local_8 = (((local_8) >> 8) << 8);
    FUN_0050b644();
    local_8 = -1;
    FUN_0050b650();
    FUN_0050b666();
    return;
  }
  iVar2 = XD_InFlushSendBuffer();
  if ((DAT_006ad904 !== 0)) {
    FUN_005d225b(s_Citywin:_city_button_change()_bl_00630e60);
    wv(DAT_006c31ac, 8);
    _DAT_006c31b0 = IsTracking(DAT_006a91b8);
    iVar2 = IsTracking(DAT_006a91b8);
    _DAT_006c31b4 = s8(_MEM[DAT_0064f348 + iVar2 * 0x58]);
    _DAT_006c31b8 = param_1;
    local_8 = 1;
    FUN_0050b638();
    local_8 = (((local_8) >> 8) << 8);
    FUN_0050b644();
    local_8 = -1;
    FUN_0050b650();
    FUN_0050b666();
    return;
  }
  uVar6 = 0;
  iVar2 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar6);
  iVar2 = IsTracking(DAT_006a91b8);
  bVar1 = _MEM[DAT_0064f348 + iVar2 * 0x58];
  iVar2 = s8(bVar1);
  if ((DAT_00655b07 === 0)) {
    local_8 = 1;
    FUN_0050b638();
    local_8 = (((local_8) >> 8) << 8);
    FUN_0050b644();
    local_8 = -1;
    FUN_0050b650();
    FUN_0050b666();
    return;
  }
  iVar3 = IsTracking(DAT_006a91b8);
  local_658 = s8(_MEM[DAT_0064f379 + iVar3 * 0x58]);
  while ((local_578 === 0)) {
    iVar3 = IsTracking(DAT_006a91b8);
    if ((iVar3 === -1)) {
      FUN_0059db65();
      FUN_0059db65();
      FUN_0059db65();
      local_8 = 1;
      FUN_0050b638();
      local_8 = (UNNAMED << 8);
      FUN_0050b644();
      local_8 = -1;
      FUN_0050b650();
      FUN_0050b666();
      return;
    }
    if (((None & 2) !== 0)) {
      piVar7 = DAT_fffff6a4;
      piVar5 = DAT_fffff9a0;
      iVar3 = IsTracking(DAT_006a91b8);
      FUN_00498e8b(iVar3, piVar5, piVar7);
      if ((local_660 !== 0x3e7)) {
        FUN_004271e8(0, s32((DAT_0064b1b8 + local_660 * 0x14), 0));
        local_954 = DAT_fffff6ac;
        FUN_004aef20(DAT_ffffff9c);
        FUN_0043c840(DAT_ffffff9c, DAT_00630ec0);
        FUN_004af122(DAT_ffffff9c, s32((DAT_0064b1b8 + local_660 * 0x14), 0));
        FUN_0059ec88((DAT_00641848 + local_660 * 0x3c), 0, 0);
        iVar3 = Create(DAT_fffff6ac, 0x630ec4, DAT_ffffff9c, 0x8000);
        if ((iVar3 !== 0)) {
          local_954 = DAT_fffff6ac;
        }
        FUN_005a5f34(0, 0x12c);
      }
      if ((local_95c !== 0x3e7)) {
        FUN_004aef20(DAT_ffffff9c);
        FUN_0043c840(DAT_ffffff9c, DAT_00630ee0);
        local_360 = DAT_fffffca0;
        if ((local_95c < 0)) {
          iVar3 = local_95c * -8;
          local_95c = (-local_95c);
          FUN_004271e8(0, s32((DAT_0064c488 + iVar3), 0));
          if ((local_95c < 0x27)) {
            FUN_004af122(DAT_ffffff9c, s32((DAT_0064c488 + local_95c * 8), 0));
            FUN_0059ec88((DAT_00645160 + local_95c * 0x3c), (((DAT_00633584 === 0) - 1) & 8), 0);
          }
          else {
            FUN_0043c840(DAT_ffffff9c, s_WONDER_00630ef8);
            FUN_0059ec88((DAT_00645a84 + (local_95c * 4 + -0x9c) * 0xf), (((DAT_00633584 === 0) - 1) & 8), 0);
          }
        }
        else {
          local_660 = local_95c;
          FUN_004271e8(0, s32((DAT_0064b1b8 + local_95c * 0x14), 0));
          FUN_004af122(DAT_ffffff9c, s32((DAT_0064b1b8 + local_660 * 0x14), 0));
          FUN_0059ec88((DAT_00641848 + local_660 * 0x3c), 0, 0);
        }
        iVar3 = Create(DAT_fffffca0, 0x630f00, DAT_ffffff9c, 0x8000);
        if ((iVar3 !== 0)) {
          local_360 = DAT_fffffca0;
        }
        FUN_005a5f34(0, 0x12c);
      }
    }
    iVar3 = IsTracking(DAT_006a91b8);
    FUN_0040ff60(0, (DAT_0064f360 + iVar3 * 0x58));
    FUN_0043c9d0(s_PRODUCTION_00630f1c);
    local_654 = DAT_fffff9ac;
    FUN_0043c990(0x4b, 0);
    local_65c = 0;
    for (/* cond: (local_660 < 0x3e) */); local_660 = (local_660 < 0x3e); local_660 = (local_660 + 1)) {
      iVar3 = local_660;
      iVar4 = IsTracking(DAT_006a91b8);
      iVar3 = FUN_004bfe5a(iVar2, iVar4, iVar3);
      if ((iVar3 !== 0)) {
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_0064b1b8 + local_660 * 0x14), 0));
        FUN_0040fe10();
        FUN_0040bbe0(DAT_00630f28);
        FUN_0040fea0();
        iVar3 = local_660;
        iVar4 = IsTracking(DAT_006a91b8);
        uVar6 = FUN_004e74df(iVar4, iVar3);
        FUN_00509ac0(s8(_MEM[DAT_0064b1c8 + local_660 * 0x14]), uVar6);
        FUN_00421d30();
        FUN_0040bc10(0xaa);
        FUN_0040fe40();
        FUN_0040ff30(s8(_MEM[DAT_0064b1c4 + local_660 * 0x14]));
        FUN_0040bbe0(DAT_00630f2c);
        FUN_0040ff30(s8(_MEM[DAT_0064b1c5 + local_660 * 0x14]));
        if (((_MEM[DAT_0064b1bd + local_660 * 0x14] & 4) !== 0)) {
          FUN_0040bbe0(DAT_00630f30);
        }
        FUN_0040bbe0(DAT_00630f34);
        FUN_0040ff30((s8(_MEM[DAT_0064b1c2 + local_660 * 0x14]) / u8(DAT_0064bcc8) | 0));
        FUN_0040fe10();
        FUN_0040bc10(0xab);
        FUN_0040fe40();
        FUN_0040ff30((s8(_MEM[DAT_0064b1c6 + local_660 * 0x14]) / 0xa | 0));
        FUN_0040bbe0(DAT_00630f38);
        FUN_0040ff30(s8(_MEM[DAT_0064b1c7 + local_660 * 0x14]));
        FUN_0040fed0();
        FUN_0059edf0(DAT_00679640, local_660, 0);
        if ((local_658 === local_660)) {
          FUN_0059ea99(local_660);
        }
        local_65c = (local_65c + 1);
      }
    }
    for (/* cond: (local_95c < 0x27) */); local_95c = (local_95c < 0x27); local_95c = (local_95c + 1)) {
      iVar3 = local_95c;
      iVar4 = IsTracking(DAT_006a91b8);
      iVar3 = FUN_004c03ae(iVar2, iVar4, iVar3);
      if ((iVar3 !== 0)) {
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_0064c488 + local_95c * 8), 0));
        FUN_0040fe10();
        FUN_0040bbe0(DAT_00630f3c);
        FUN_0040fea0();
        iVar3 = (-local_95c);
        iVar4 = IsTracking(DAT_006a91b8);
        uVar6 = FUN_004e74df(iVar4, iVar3);
        FUN_00509ac0(_MEM[DAT_0064c48c + local_95c * 8], uVar6);
        FUN_0040fed0();
        FUN_0059edf0(DAT_00679640, (local_95c + 0x3e), 0);
        if (((-local_658) === local_95c)) {
          FUN_0059ea99((local_95c + 0x3e));
        }
        local_65c = (local_65c + 1);
      }
    }
    for (/* cond: (local_6c < 0x1c) */); local_6c = (local_6c < 0x1c); local_6c = (local_6c + 1)) {
      iVar3 = FUN_004c02d8(iVar2, local_6c);
      if ((iVar3 !== 0)) {
        local_95c = (local_6c + 0x27);
        FUN_0040bbb0();
        iVar3 = FUN_00453da0(local_6c);
        if ((iVar3 !== 0)) {
          FUN_00414d70(DAT_00630f40);
        }
        FUN_0040ff00(s32((DAT_0064c488 + local_95c * 8), 0));
        FUN_0040fe10();
        FUN_0040bbe0(DAT_00630f44);
        FUN_0040fea0();
        iVar3 = (-local_95c);
        iVar4 = IsTracking(DAT_006a91b8);
        uVar6 = FUN_004e74df(iVar4, iVar3);
        FUN_00509ac0(_MEM[DAT_0064c48c + local_95c * 8], uVar6);
        FUN_0040fed0();
        FUN_0059edf0(DAT_00679640, (local_6c + 0x65), 0);
        if (((-local_658) === local_95c)) {
          FUN_0059ea99((local_95c + 0x3e));
        }
        local_65c = (local_65c + 1);
      }
    }
    if ((DAT_00655b02 === 0)) {
      uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x130), 0));
      FUN_0059f2a3(uVar6);
    }
    if (((None & 2) !== 0)) {
      if ((0xb < local_65c)) {
        local_65c = 0xc;
      }
      FUN_0059e783(-0x3e7, -5);
    }
    if ((local_65c < 0x10)) {
      iVar3 = (local_65c + 1);
      if ((iVar3 < 9)) {
        iVar3 = 8;
      }
      FUN_0059e507(iVar3);
    }
    wv(DAT_00630d30, 0);
    wv(DAT_00635a3c, LAB_00402815);
    local_958 = FUN_005a5f34(0, 0x12c);
    wv(DAT_00630d30, 0);
    if ((iVar3 === -1)) {
      FUN_0059db65();
      FUN_0059db65();
      FUN_00484d52();
    }
    iVar3 = IsTracking(DAT_006a91b8);
    w32((DAT_0064f344 + iVar3 * 0x58), 0, (s32((DAT_0064f344 + iVar3 * 0x58), 0) & -0x3000011));
    if ((local_578 === 0)) {
      if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_00498d40();
        iVar2 = IsTracking(DAT_006a91b8);
        local_958 = FUN_00511520(s_AUTOMODE_00630f48, 1, iVar2);
        if ((local_958 < 0));
        w32((DAT_0064f344 + iVar2 * 0x58), 0, (s32((DAT_0064f344 + iVar2 * 0x58), 0) | 0x10));
        if ((local_958 === 1)) {
          iVar2 = IsTracking(DAT_006a91b8);
          w32((DAT_0064f344 + iVar2 * 0x58), 0, (s32((DAT_0064f344 + iVar2 * 0x58), 0) | 0x1000000));
        }
        if ((local_958 === 2)) {
          iVar2 = IsTracking(DAT_006a91b8);
          w32((DAT_0064f344 + iVar2 * 0x58), 0, (s32((DAT_0064f344 + iVar2 * 0x58), 0) | 0x2000000));
        }
      }
      uVar6 = 0x63;
      iVar2 = IsTracking(DAT_006a91b8);
      FUN_00441b11(iVar2, uVar6);
      FUN_0050503e(1);
      goto LAB_0050b609;
    }
    if ((local_578 !== 2)) {
      if ((local_578 === 3)) {
        if ((local_958 < 0x3e)) {
          iVar2 = IsTracking(DAT_006a91b8);
          iVar2 = ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16);
          iVar3 = IsTracking(DAT_006a91b8);
          iVar3 = ((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16);
          iVar4 = IsTracking(DAT_006a91b8);
          FUN_005b3d06(local_958, s8(_MEM[DAT_0064f348 + iVar4 * 0x58]), iVar3, iVar2);
          iVar2 = local_958;
        }
        else {
          iVar2 = (local_958 + -62);
          if ((iVar2 < 0x23)) {
            uVar6 = 1;
            local_958 = iVar2;
            iVar3 = IsTracking(DAT_006a91b8);
            FUN_0043d289(iVar3, iVar2, uVar6);
            iVar2 = local_958;
          }
          else if ((iVar2 < 0x27)) {
            if ((iVar2 < 0x26)) {
              iVar3 = (local_958 + -97);
              local_958 = iVar2;
              iVar2 = IsTracking(DAT_006a91b8);
              FUN_00598197(s8(_MEM[DAT_0064f348 + iVar2 * 0x58]), iVar3);
              iVar2 = local_958;
            }
          }
          else {
            local_958 = (local_958 + -101);
            iVar2 = IsTracking(DAT_006a91b8);
            w16((DAT_00655be6 + local_958 * 2), 0, ((iVar2) & 0xFFFF));
            iVar2 = local_958;
          }
        }
        local_958 = iVar2;
        FUN_00509429();
        FUN_00444270(s_FREEBIE_00630f54);
      }
      goto LAB_0050b5dc;
    }
    if ((local_958 < 0x3e)) {
      FUN_005ad998(local_958);
      local_658 = local_958;
    }
    else {
      local_958 = (local_958 + -62);
      FUN_0059a2e6(local_958);
      local_658 = (-local_958);
    }
  }
  if ((local_958 < 0x3e)) {
    local_14 = local_958;
  }
  else {
    local_14 = (-(local_958 + -62));
  }
  iVar3 = local_14;
  iVar4 = IsTracking(DAT_006a91b8);
  local_68 = FUN_004e74df(iVar4, iVar3);
  iVar3 = IsTracking(DAT_006a91b8);
  if (((DAT_00655af2 & 0x200) === 0)) {
    FUN_004c4210(0, DAT_0064bcda);
    iVar3 = IsTracking(DAT_006a91b8);
    if ((_MEM[DAT_0064f379 + iVar3 * 0x58] < 0)) {
      iVar3 = IsTracking(DAT_006a91b8);
      FUN_004271e8(0, s32((DAT_0064c488 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]) * -8), 0));
    }
    else {
      iVar3 = IsTracking(DAT_006a91b8);
      FUN_004271e8(0, s32((DAT_0064b1b8 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]) * 0x14), 0));
    }
    if ((local_14 < 0)) {
      FUN_004271e8(1, s32((DAT_0064c488 + local_14 * -8), 0));
    }
    else {
      FUN_004271e8(1, s32((DAT_0064b1b8 + local_14 * 0x14), 0));
    }
    iVar3 = FUN_00421ea0(s_PRODCHANGE_00630f5c);
    if ((iVar3 === 0));
  if ((0xff < _MEM[DAT_0064f379 + iVar3 * 0x58])) {
    iVar3 = IsTracking(DAT_006a91b8);
    _MEM[DAT_0064c7f4 + (iVar2 * 0x594 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]))] = (_MEM[DAT_0064c7f4 + (iVar2 * 0x594 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]))] + 0xff);
  }
  iVar3 = IsTracking(DAT_006a91b8);
  _MEM[DAT_0064f379 + iVar3 * 0x58] = ((local_14) & 0xFF);
  iVar3 = IsTracking(DAT_006a91b8);
  if ((0xff < _MEM[DAT_0064f379 + iVar3 * 0x58])) {
    iVar3 = IsTracking(DAT_006a91b8);
    _MEM[DAT_0064c7f4 + (iVar2 * 0x594 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]))] = (_MEM[DAT_0064c7f4 + (iVar2 * 0x594 + s8(_MEM[DAT_0064f379 + iVar3 * 0x58]))] + 1);
  }
  iVar2 = IsTracking(DAT_006a91b8);
  w16((DAT_0064f35c + iVar2 * 0x58), 0, ((local_68) & 0xFFFF));
  FUN_00436287(1);
  FUN_00436287(2);
 LAB_0050b5dc: :
  uVar6 = 1;
  iVar2 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar6);
  FUN_0050503e(1);
  FUN_005025d5(1);
 LAB_0050b609: :
  FUN_0050ccb3(1);
  local_8 = 1;
  FUN_0050b638();
  local_8 = (UNNAMED << 8);
  FUN_0050b644();
  local_8 = -1;
  FUN_0050b650();
  FUN_0050b666();
  return;
}


 export function FUN_0050b638 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0050b644 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0050b650 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0050b666 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0050b674 ()

 {
  let iVar1;

  if ((iVar1 === -1)) {
    if ((DAT_006ad2f7 === 0)) {
      w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
      wv(DAT_006ad678, s32(DAT_006ad678, 0));
    }
    else if ((DAT_00630d30 === 0)) {
      wv(DAT_00630d30, 1);
      wv(DAT_00630d68, FUN_00421bb0());
    }
    else {
      iVar1 = FUN_00421bb0();
      if (((DAT_00630d68 + 0x4b0) < iVar1)) {
        wv(DAT_00630d30, 0);
        w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
        wv(DAT_006ad678, s32(DAT_006ad678, 0));
      }
    }
  }
  FUN_0047e94e(1, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050b74e (param_1)

 {
  let iVar1;
  let puVar2;
  let local_108;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((s8(_MEM[DAT_0064f348 + iVar1 * 0x58]) === DAT_006d1da0)) {
    iVar1 = XD_InFlushSendBuffer();
    if ((DAT_006ad904 === 0)) {
      wv(DAT_00630d30, 0);
      wv(DAT_00635a3c, LAB_00402815);
      puVar2 = DAT_fffffef8;
      iVar1 = IsTracking(DAT_006a91b8);
      iVar1 = FUN_00421ed0(s_RENAMECITY_00630fb4, 0xf, (DAT_0064f360 + iVar1 * 0x58), puVar2);
      if ((iVar1 !== -1)) {
        FUN_0046e020(0x68, 0, 0, 0);
        puVar2 = DAT_fffffef8;
        iVar1 = IsTracking(DAT_006a91b8);
        FUN_005f22d0((DAT_0064f360 + iVar1 * 0x58), puVar2);
        FUN_00509429();
        FUN_0047cf9e(DAT_006d1da0, 1);
      }
      wv(DAT_00630d30, 0);
    }
    else {
      FUN_005d225b(s_Citywin:_city_button_rename()_bl_00630f68);
      wv(DAT_006c31ac, 0xa);
      _DAT_006c31b0 = IsTracking(DAT_006a91b8);
      iVar1 = IsTracking(DAT_006a91b8);
      _DAT_006c31b4 = s8(_MEM[DAT_0064f348 + iVar1 * 0x58]);
      _DAT_006c31b8 = param_1;
    }
  }
  return;
}


 export function FUN_0050b9a4 ()

 {
  let iVar1;
  let uVar2;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1)) {
    wv(DAT_006aa768, 0);
    uVar2 = 0;
    iVar1 = IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    FUN_00508adc(1);
    FUN_0046e020(0x63, 0, 0, 0);
  }
  return;
}


 export function FUN_0050ba07 ()

 {
  let iVar1;
  let uVar2;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1)) {
    wv(DAT_006aa768, 1);
    uVar2 = 0;
    iVar1 = IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    FUN_00508adc(1);
    FUN_0046e020(0x63, 0, 0, 0);
  }
  return;
}


 export function FUN_0050ba6a ()

 {
  let iVar1;
  let uVar2;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1)) {
    wv(DAT_006aa768, 2);
    uVar2 = 0;
    iVar1 = IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    FUN_00508adc(1);
    FUN_0046e020(0x63, 0, 0, 0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050bacd (param_1)

 {
  let iVar1;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1)) {
    iVar1 = XD_InFlushSendBuffer();
    if ((DAT_006ad904 === 0)) {
      iVar1 = IsTracking(DAT_006a91b8);
      FUN_00454260(iVar1);
    }
    else {
      FUN_005d225b(s_Citywin:_city_button_view()_bloc_00630fc0);
      wv(DAT_006c31ac, 9);
      _DAT_006c31b0 = IsTracking(DAT_006a91b8);
      iVar1 = IsTracking(DAT_006a91b8);
      _DAT_006c31b4 = s8(_MEM[DAT_0064f348 + iVar1 * 0x58]);
      _DAT_006c31b8 = param_1;
    }
  }
  return;
}


 export function FUN_0050bc4f ()

 {
  let iVar1;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1)) {
    FUN_0046e020(0x63, 0, 0, 0);
    if ((DAT_006aa764 === 2)) {
      wv(DAT_00630d18, 1);
    }
    else {
      FUN_0050994f();
    }
    FUN_00436287(1);
    FUN_00436287(2);
    FUN_00436287(4);
    FUN_00436287(5);
    FUN_00436287(6);
  }
  return;
}


 export function FUN_0050bcda (param_1)

 {
  let iVar1;
  let uVar2;

  wv(DAT_006aa76c, param_1);
  uVar2 = 0;
  iVar1 = IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar2);
  FUN_00505ffa(1);
  return;
}


 export function FUN_0050bd13 ()

 {
  let iVar1;
  let local_b4;
  let local_64;
  let local_60;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 !== 0)) {
    if ((DAT_0062edf8 === 0)) {
      local_c = IsTracking(DAT_006a91b8);
      local_10 = -1;
      local_8 = local_c;
      FUN_005f22d0(DAT_ffffffa0, s__00631008);
      FUN_005f22d0(DAT_ffffff4c, (DAT_0064f360 + local_8 * 0x58));
      for (/* cond: (local_64 < ((DAT_00655b18) << 16 >> 16)) */); local_64 = (local_64 < ((DAT_00655b18) << 16 >> 16)); local_64 = (local_64 + 1)) {
        if ((_MEM[DAT_0064f348 + local_8 * 0x58] === _MEM[DAT_0064f348 + local_64 * 0x58])) {
          iVar1 = __strcmpi((DAT_0064f360 + local_64 * 0x58), DAT_ffffffa0);
          if ((iVar1 < 0)) {
            local_10 = local_64;
            FUN_005f22d0(DAT_ffffffa0, (DAT_0064f360 + local_64 * 0x58));
          }
          iVar1 = __strcmpi((DAT_0064f360 + local_64 * 0x58), DAT_ffffff4c);
          if ((0 < iVar1)) {
            local_c = local_64;
            FUN_005f22d0(DAT_ffffff4c, (DAT_0064f360 + local_64 * 0x58));
          }
        }
      }
      if ((local_10 < 0)) {
        if ((local_8 !== local_c)) {
          FUN_00509590(local_c);
        }
      }
      else {
        FUN_00509590(local_10);
      }
    }
    else {
      FUN_005013bc();
    }
  }
  return;
}


 export function FUN_0050bf72 ()

 {
  let iVar1;
  let local_b4;
  let local_64;
  let local_60;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = IsTracking(DAT_006a91b8);
  if ((DAT_00655b07 !== 0)) {
    if ((DAT_0062edf8 === 0)) {
      local_c = IsTracking(DAT_006a91b8);
      local_10 = -1;
      local_8 = local_c;
      FUN_005f22d0(DAT_ffffffa0, s_zzzzzzzzzzzzzzzzzzzzzzzzz_00631024);
      FUN_005f22d0(DAT_ffffff4c, (DAT_0064f360 + local_8 * 0x58));
      for (/* cond: (local_64 < ((DAT_00655b18) << 16 >> 16)) */); local_64 = (local_64 < ((DAT_00655b18) << 16 >> 16)); local_64 = (local_64 + 1)) {
        if ((_MEM[DAT_0064f348 + local_8 * 0x58] === _MEM[DAT_0064f348 + local_64 * 0x58])) {
          iVar1 = __strcmpi((DAT_0064f360 + local_64 * 0x58), DAT_ffffffa0);
          if ((0 < iVar1)) {
            local_10 = local_64;
            FUN_005f22d0(DAT_ffffffa0, (DAT_0064f360 + local_64 * 0x58));
          }
          iVar1 = __strcmpi((DAT_0064f360 + local_64 * 0x58), DAT_ffffff4c);
          if ((iVar1 < 0)) {
            local_c = local_64;
            FUN_005f22d0(DAT_ffffff4c, (DAT_0064f360 + local_64 * 0x58));
          }
        }
      }
      if ((local_10 < 0)) {
        if ((local_c !== local_8)) {
          FUN_00509590(local_c);
        }
      }
      else {
        FUN_00509590(local_10);
      }
    }
    else {
      FUN_005013bc();
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0050c1d1 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = XD_InFlushSendBuffer();
  if ((DAT_006ad904 === 0)) {
    local_c = FUN_0046ad85(param_1, param_2, DAT_fffffff0, DAT_fffffff8);
    if ((-1 < local_c)) {
      /* switch */ () {
      case 1 :
        FUN_005022c0(param_1, param_2);
        break;
      case 2 :
        FUN_00501819(local_10);
        break;
      case 3 :
        FUN_00506a42(local_10);
        break;
      case 4 :
        FUN_00505d3d(local_10);
        break;
      case 5 :
        break;
      case 6 :
        FUN_00506637(local_10);
      }
    }
  }
  else {
    FUN_005d225b(s_Citywin:_city_mouse()_blocked_by_00631040);
    wv(DAT_006c31ac, 6);
    _DAT_006c31b0 = IsTracking(DAT_006a91b8);
    iVar1 = IsTracking(DAT_006a91b8);
    _DAT_006c31b4 = s8(_MEM[DAT_0064f348 + iVar1 * 0x58]);
    _DAT_006c31b8 = param_1;
    _DAT_006c31bc = param_2;
    _DAT_006c31c0 = param_3;
  }
  return;
}


 export function FUN_0050c405 (param_1, param_2)

 {
  FUN_0050c1d1(param_1, param_2, 0);
  return;
}


 export function FUN_0050c427 (param_1, param_2)

 {
  FUN_0050c1d1(param_1, param_2, 1);
  return;
}


 export function FUN_0050c449 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 <= s32((in_ECX + 0x159c), 0))) {
    FUN_0050994f();
  }
  return;
}


 export function FUN_0050c494 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  if ((-1 < s32((in_ECX + 0x159c), 0))) {
    if ((param_1 < 0)) {
      if ((((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) === param_3)) {
        FUN_004eb4ed(s32((in_ECX + 0x159c), 0), 0);
        FUN_00508adc(1);
        FUN_0050503e(1);
      }
    }
    else if ((((s16((DAT_0064f342 + s32((in_ECX + 0x159c), 0) * 0x58), 0)) << 16 >> 16) === param_3)) {
      FUN_004eb4ed(s32((in_ECX + 0x159c), 0), 0);
      FUN_00508adc(1);
      FUN_0050503e(1);
      if ((u8(_MEM[DAT_00656100 + param_1 * 0x20]) === s32((in_ECX + 0x159c), 0))) {
        FUN_004eb4ed(s32((in_ECX + 0x159c), 0), 1);
        FUN_00505666(1);
        FUN_00501780(0);
      }
    }
  }
  return;
}


 export function FUN_0050c679 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((-1 < param_1)) {
    FUN_00509429();
  }
  return;
}


 export function FUN_0050c6ef (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((iVar1 < 3)) {
    FUN_00501780(0);
  }
  return;
}


 export function FUN_0050c7a3 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x16b4), 0, 0);
  w32((in_ECX + 0x16b8), 0, 0);
  w32((in_ECX + 0x16bc), 0, 0);
  w32((in_ECX + 0x16c0), 0, s32((in_ECX + 0x16bc), 0));
  w32((in_ECX + 0x16c8), 0, s32((in_ECX + 0x16c0), 0));
  w32((in_ECX + 0x16d0), 0, s32((in_ECX + 0x16c8), 0));
  w32((in_ECX + 0x16cc), 0, s32((in_ECX + 0x16d0), 0));
  w32((in_ECX + 0x16c4), 0, s32((in_ECX + 0x16cc), 0));
  w32((in_ECX + 0x16d8), 0, 0);
  w32((in_ECX + 0x16d4), 0, s32((in_ECX + 0x16d8), 0));
  return;
}


 export function FUN_0050c859 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x16b4), 0) !== 0)) {
    FUN_005c5aeb();
    if ((s32((in_ECX + 0x16b4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16b8), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16c4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16cc), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16d0), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16c8), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16c0), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    if ((s32((in_ECX + 0x16bc), 0) !== 0)) {
      if ((s32((in_ECX + 0x16bc), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32((in_ECX + 0x16bc), 0, 0);
    }
    if ((s32((in_ECX + 0x16d4), 0) !== 0)) {
      FUN_00511560(1);
    }
    if ((s32((in_ECX + 0x16d8), 0) !== 0)) {
      FUN_00511560(1);
    }
    if ((s32((in_ECX + 0x16dc), 0) !== 0)) {
      FUN_004bb4f0(1);
    }
    FUN_0050c7a3();
  }
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0050cc02)  */ */ export function FUN_0050ca8d (in_ECX, param_1)

 {
  let pvVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let iVar5;
  let unaff_FS_OFFSET;
  let local_30;
  let local_20;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050cc99;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((s32((in_ECX + 0x16bc), 0) !== 0)) {
    if ((s32((in_ECX + 0x16bc), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x16bc), 0, 0);
  }
  pvVar1 = operator_new(0x3c);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_30 = 0;
  }
  else {
    local_30 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16bc), 0, local_30);
  FUN_005d8236((in_ECX + 0x16ac));
  uVar2 = FUN_00511690(0x18);
  uVar3 = FUN_00511690(0x39);
  iVar4 = FUN_00511690(0x16c);
  iVar5 = ((s32((in_ECX + 0x15c8), 0) + iVar4) + s32((in_ECX + 0x128), 0));
  iVar4 = FUN_00511690(0x1cb);
  FUN_004086c0(DAT_ffffffe0, ((s32((in_ECX + 0x124), 0) + iVar4) + s32((in_ECX + 0x15c4), 0)), iVar5, uVar3, uVar2);
  uVar2 = FUN_00511690(0x19);
  iVar4 = FUN_00511690(0x3a);
  iVar5 = FUN_00511690(0x3a);
  FUN_0043c790(DAT_ffffffe0, (iVar4 + iVar5), uVar2);
  uVar2 = FUN_00428b0c(s32(((DAT_00628420 + 0x94) + ((-u8((s32((in_ECX + 0x15ac), 0) === 2))) & 0xcc) * 4), 0));
  FUN_0040f680(DAT_006a9200, 8, DAT_ffffffe0, uVar2);
  FUN_0040f840();
  FUN_0040f880(thunk_FUN_0050bc4f);
  if ((param_1 !== 0)) {
    FUN_0040f380();
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0050ce6a)  */ */ export function FUN_0050ccb3 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let pvVar4;
  let uVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_3c;
  let local_24;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050ceec;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = ((_MEM[DAT_0064f344 + s32((in_ECX + 0x159c), 0) * 0x58] & 0x10) !== 0);
  if ((DAT_00630d24 !== local_14)) {
    wv(DAT_00630d24, local_14);
    if ((s32((in_ECX + 0x16b8), 0) !== 0)) {
      if ((s32((in_ECX + 0x16b8), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32((in_ECX + 0x16b8), 0, 0);
    }
    pvVar4 = operator_new(0x3c);
    local_8 = 0;
    if ((pvVar4 === 0)) {
      local_3c = 0;
    }
    else {
      local_3c = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x16b8), 0, local_3c);
    FUN_005d8236((in_ECX + 0x16ac));
    iVar1 = s32((in_ECX + 0x15c4), 0);
    iVar2 = s32((in_ECX + 0x124), 0);
    iVar8 = s32((in_ECX + 0x128), 0);
    iVar3 = s32((in_ECX + 0x15c8), 0);
    uVar5 = FUN_00511690(0x18);
    uVar6 = FUN_00511690(0x44);
    iVar7 = FUN_00511690(0xb5);
    iVar7 = ((iVar8 + iVar3) + iVar7);
    iVar8 = FUN_00511690(0x1ba);
    FUN_004086c0(DAT_ffffffdc, ((iVar1 + iVar2) + iVar8), iVar7, uVar6, uVar5);
    uVar6 = 0;
    uVar5 = FUN_00511690(0x73);
    FUN_0043c790(DAT_ffffffdc, uVar5, uVar6);
    uVar5 = FUN_00428b0c(s32(((DAT_00628420 + 0x510) + ((-u8((local_14 === 0))) & -0x120) * 4), 0));
    FUN_0040f680(DAT_006a9200, 2, DAT_ffffffdc, uVar5);
    FUN_0040f880(thunk_FUN_0050a473);
    if ((param_1 !== 0)) {
      FUN_0040f380();
    }
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d785)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d64a)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d52c)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d3ea)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d307)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d471)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d5bb)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0050d6f6)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0050d871)  */ */ export function FUN_0050cf06 (in_ECX)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  // in_ECX promoted to parameter;
  let iVar7;
  let unaff_FS_OFFSET;
  let local_90;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_23;
  let local_20;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0050dac2;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f350(0);
  FUN_0050c859();
  local_34 = operator_new(0x3c);
  local_8 = 0;
  if ((local_34 === 0)) {
    local_38 = 0;
  }
  else {
    local_38 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16b4), 0, local_38);
  local_3c = operator_new(0x3c);
  local_8 = 1;
  if ((local_3c === 0)) {
    local_40 = 0;
  }
  else {
    local_40 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16b8), 0, local_40);
  local_44 = operator_new(0x3c);
  local_8 = 2;
  if ((local_44 === 0)) {
    local_48 = 0;
  }
  else {
    local_48 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16c4), 0, local_48);
  local_4c = operator_new(0x3c);
  local_8 = 3;
  if ((local_4c === 0)) {
    local_50 = 0;
  }
  else {
    local_50 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16cc), 0, local_50);
  local_54 = operator_new(0x3c);
  local_8 = 4;
  if ((local_54 === 0)) {
    local_58 = 0;
  }
  else {
    local_58 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16d0), 0, local_58);
  local_5c = operator_new(0x3c);
  local_8 = 5;
  if ((local_5c === 0)) {
    local_60 = 0;
  }
  else {
    local_60 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16c8), 0, local_60);
  local_64 = operator_new(0x3c);
  local_8 = 6;
  if ((local_64 === 0)) {
    local_68 = 0;
  }
  else {
    local_68 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x16c0), 0, local_68);
  local_6c = operator_new(0xcc);
  local_8 = 7;
  if ((local_6c === 0)) {
    local_70 = 0;
  }
  else {
    local_70 = FUN_00511720();
  }
  local_8 = -1;
  w32((in_ECX + 0x16d4), 0, local_70);
  local_74 = operator_new(0xcc);
  local_8 = 8;
  if ((local_74 === 0)) {
    local_78 = 0;
  }
  else {
    local_78 = FUN_00511720();
  }
  local_8 = -1;
  w32((in_ECX + 0x16d8), 0, local_78);
  local_7c = operator_new(0x40);
  local_8 = 9;
  if ((local_7c === 0)) {
    local_80 = 0;
  }
  else {
    local_80 = FUN_0040fb00();
  }
  local_8 = -1;
  w32((in_ECX + 0x16dc), 0, local_80);
  local_28 = (s32((in_ECX + 0x15c4), 0) + s32((in_ECX + 0x124), 0));
  local_2c = (s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x15c8), 0));
  FUN_005d8236((in_ECX + 0x16ac));
  FUN_0050ca8d(0);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x44);
  iVar3 = FUN_00511690(0xb5);
  iVar3 = (local_2c + iVar3);
  iVar4 = FUN_00511690(0x1ba);
  FUN_004086c0(DAT_ffffffe0, (local_28 + iVar4), iVar3, uVar2, uVar1);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8c), 0));
  FUN_0040f680(DAT_006a9200, 1, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_00509b48);
  wv(DAT_00630d24, 0xff);
  FUN_0050ccb3(0);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x15);
  iVar3 = FUN_00511690(0x16c);
  iVar3 = (local_2c + iVar3);
  iVar4 = FUN_00511690(0x1b5);
  FUN_004086c0(DAT_ffffffe0, (local_28 + iVar4), iVar3, uVar2, uVar1);
  local_23 = 0;
  local_24 = 0x5e;
  FUN_005011b4(DAT_006a9200, 9, s32((in_ECX + 0x16d4), 0), DAT_00644770, DAT_ffffffe0);
  FUN_005117f0(thunk_FUN_0050bf72);
  uVar1 = FUN_00511690(0x19);
  FUN_0043c790(DAT_ffffffe0, 0, uVar1);
  local_24 = 0x76;
  FUN_005011b4(DAT_006a9200, 0xa, s32((in_ECX + 0x16d8), 0), DAT_006480d8, DAT_ffffffe0);
  FUN_005117f0(thunk_FUN_0050bd13);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x39);
  iVar3 = FUN_00511690(0x16c);
  iVar3 = (local_2c + iVar3);
  iVar4 = FUN_00511690(0x1cb);
  FUN_004086c0(DAT_ffffffe0, (local_28 + iVar4), iVar3, uVar2, uVar1);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x9c), 0));
  FUN_0040f680(DAT_006a9200, 3, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_0050b9a4);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(DAT_ffffffe0, uVar1, uVar2);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xa4), 0));
  FUN_0040f680(DAT_006a9200, 4, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_0050ba07);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(DAT_ffffffe0, uVar1, uVar2);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xa8), 0));
  FUN_0040f680(DAT_006a9200, 5, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_0050b74e);
  uVar1 = FUN_00511690(0x19);
  iVar3 = FUN_00511690(-58);
  iVar4 = FUN_00511690(-58);
  FUN_0043c790(DAT_ffffffe0, (iVar3 + iVar4), uVar1);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xa0), 0));
  FUN_0040f680(DAT_006a9200, 6, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_0050ba6a);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(DAT_ffffffe0, uVar1, uVar2);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x98), 0));
  FUN_0040f680(DAT_006a9200, 7, DAT_ffffffe0, uVar1);
  FUN_0040f880(thunk_FUN_0050bacd);
  local_30 = FUN_006e7d8c(2);
  iVar4 = FUN_00511690(0x83);
  iVar4 = (iVar4 + -2);
  iVar3 = local_30;
  iVar5 = FUN_00511690(0x122);
  iVar7 = ((local_2c + iVar5) + 1);
  iVar5 = FUN_00511690(0xc0);
  iVar6 = FUN_00511690(0);
  FUN_004086c0((in_ECX + 0x169c), (((iVar5 + iVar6) + local_28) - (local_30 + 1)), iVar7, iVar3, iVar4);
  FUN_0040fc50(DAT_006a9200, 0x63, (in_ECX + 0x169c), 1);
  iVar3 = FUN_00407fc0((in_ECX + 0x166c));
  iVar4 = FUN_00511690(1);
  iVar5 = FUN_00511690(0xc);
  FUN_005db0d0(((iVar3 - (iVar4 >> 1)) / iVar5 | 0));
  FUN_0040fd80(LAB_00402f4f);
  FUN_00451ac0(LAB_00402f4f);
  iVar3 = s32((in_ECX + 0x15d4), 0);
  if ((iVar3 === 1)) {
    w32((in_ECX + 0x15d8), 0, -5);
  }
  else if ((iVar3 === 2)) {
    w32((in_ECX + 0x15d8), 0, -2);
  }
  else if ((iVar3 === 3)) {
    w32((in_ECX + 0x15d8), 0, 1);
  }
  if ((s32((in_ECX + 0x15d8), 0) !== DAT_00630d28)) {
    wv(DAT_00630d28, s32((in_ECX + 0x15d8), 0));
    uVar1 = FUN_00472cf0(0x20, s32((in_ECX + 0x15d8), 0));
    uVar2 = FUN_00472cf0(0x40, s32((in_ECX + 0x15d8), 0), uVar1);
    FUN_005bd65c(uVar2, uVar1);
    FUN_0047df20(s32((in_ECX + 0x15d8), 0));
    FUN_005cef31(DAT_ffffff70, DAT_006a9120, 0, 0);
    FUN_0047df50();
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_0050dada (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x15a4), 0) === 0)) {
    w32((in_ECX + 0x15ac), 0, 2);
  }
  else {
    w32((in_ECX + 0x15ac), 0, 1);
  }
  if ((s32((in_ECX + 0x15a4), 0) === 0)) {
    wv(DAT_00630d20, 1);
  }
  return;
}


 export function FUN_0050db36 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = s32((in_ECX + 0x15ac), 0);
  w32((in_ECX + 0x15ac), 0, 0);
  if ((iVar1 === 2)) {
    FUN_0050ca8d(1);
  }
  wv(DAT_00630d20, 0);
  return;
}


 export function FUN_0050db92 ()

 {
  FUN_004080f0(DAT_00655344);
  return;
}


 export function FUN_0050dbb8 ()

 {
  FUN_004080f0(DAT_00655344);
  return;
}


 export function FUN_0050dbde (param_1)

 {
  if ((param_1 === 1)) {
    FUN_0050bc4f(0);
  }
  else if ((param_1 === 2)) {
    if ((1 < DAT_006aa78c)) {
      wv(DAT_006aa78c, (DAT_006aa78c + -1));
      FUN_0050998f();
      FUN_004bb570(DAT_00655344);
    }
  }
  else if ((0x3e7 < DAT_006ab198)) {
    wv(DAT_006aa78c, (DAT_006aa78c + 1));
    FUN_0050998f();
    FUN_004bb570(DAT_00655344);
  }
  return;
}


 export function FUN_0050dcb6 (in_ECX)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;

  FUN_00501440();
  w32((in_ECX + 0x15ac), 0, 0);
  w32((in_ECX + 0x15c8), 0, 0);
  w32((in_ECX + 0x15c4), 0, s32((in_ECX + 0x15c8), 0));
  w32((in_ECX + 0x15d0), 0, -1);
  w32((in_ECX + 0x15cc), 0, s32((in_ECX + 0x15d0), 0));
  w32((in_ECX + 0x15a0), 0, 0);
  if ((DAT_00655280 === 0)) {
    FUN_00509a49();
  }
  uVar9 = 8;
  uVar8 = 0x18;
  uVar7 = 0;
  iVar1 = FUN_00407fc0(DAT_00655344, 0, 0x18, 8);
  iVar1 = (iVar1 - DAT_006335a4);
  iVar2 = FUN_00407f90(DAT_00655344, iVar1);
  iVar2 = (iVar2 - DAT_006335a0);
  uVar4 = 2;
  uVar5 = DAT_00655344;
  uVar6 = DAT_00655348;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x1c), 0), 2, DAT_00655344, DAT_00655348, iVar2)
  ;
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, iVar2, iVar1, uVar7, uVar8, uVar9);
  in_ECX = EnableStackedTabs(in_ECX, 0x6aa898);
  in_ECX = EnableStackedTabs(in_ECX, 0x6a9168);
  FUN_0055318c(DAT_00645120, 1);
  FUN_0055318c(DAT_00648820, 2);
  FUN_0055318c(DAT_00647788, 3);
  in_ECX = EnableStackedTabs(in_ECX, 0x40205e);
  FUN_0050c7a3();
  FUN_00408230(thunk_FUN_0050994f);
  in_ECX = EnableStackedTabs(in_ECX, 0x402abd);
  FUN_00408270(LAB_004014ec);
  FUN_004082b0(LAB_00401780);
  FUN_00408130(LAB_004031ac);
  FUN_00408170(LAB_004021c6);
  in_ECX = (in_ECX + 0x58);
  tie(thunk_FUN_00411f91);
  FUN_004082f0(LAB_00401d7a);
  FUN_00408330(LAB_00403bbb);
  return;
}


 export function FUN_0050dea8 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x15a0), 0, 1);
  FUN_0050c859();
  FUN_004083b0();
  return;
}
