// Block 0x00430000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 114

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00408460, FUN_00408490, FUN_004085f0, FUN_00408680 } from './block_00400000.js';
import { FUN_004086c0, FUN_004087c0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80 } from './block_00400000.js';
import { FUN_0040efd0, FUN_0040f010, FUN_0040f380, FUN_0040f3e0, FUN_0040f570, FUN_0040f680 } from './block_00400000.js';
import { FUN_0040f7d0, FUN_0040f840, FUN_0040f880, FUN_0040fb00, FUN_0040fbb0, FUN_0040fc50 } from './block_00400000.js';
import { FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80, FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40 } from './block_00400000.js';
import { FUN_0040fe70, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60 } from './block_00400000.js';
import { FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00410402, FUN_00414ca0, FUN_00414d10, FUN_00414f02 } from './block_00410000.js';
import { Create, FUN_00421bb0, FUN_00421d30, FUN_00421ea0, FUN_00421f10, FUN_00421f40 } from './block_00420000.js';
import { FUN_00426fb0, FUN_00426ff0, FUN_004271e8, FUN_00428b0c, FUN_00428cb0, FUN_0042a768 } from './block_00420000.js';
import { FUN_0042a7bc, FUN_0042abc1, FUN_0042ac18, FUN_0042acb0, FUN_0042d781, FUN_0042f293 } from './block_00420000.js';
import { FUN_00444270, FUN_00448f92 } from './block_00440000.js';
import { FUN_00453e51, FUN_0045705e } from './block_00450000.js';
import { FUN_00460129, FUN_00467825, FUN_004679ab, FUN_0046b14d, FUN_0046e571 } from './block_00460000.js';
import { FUN_00472d20, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52, FUN_00484fec } from './block_00480000.js';
import { FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497ea0, FUN_004980ec, FUN_00498159 } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a2645, FUN_004a28b0, FUN_004aef20 } from './block_004A0000.js';
import { FUN_004aefd8, FUN_004af122, FUN_004af14b, FUN_004af174, FUN_004af1d5, FUN_004af284 } from './block_004A0000.js';
import { FUN_004af2b9 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b7eb6, FUN_004bd9f0, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004e75a6, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004fbe84 } from './block_004F0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_00552112, FUN_00552ed2, FUN_0055339f, FUN_005534bc, ~COleCntrFrameWnd } from './block_00550000.js';
import { FUN_00566584, FUN_0056baff, FUN_0056d289 } from './block_00560000.js';
import { FUN_0059a791, FUN_0059db08, FUN_0059df8a, FUN_0059dfb9, FUN_0059e18b, FUN_0059e4e6 } from './block_00590000.js';
import { FUN_0059ea99, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a9798, FUN_005a97cc, FUN_005a98e4, FUN_005a9afe, FUN_005adfa0, FUN_005ae052 } from './block_005A0000.js';
import { FUN_005ae31d, FUN_005ae3bf, FUN_005ae3ec } from './block_005A0000.js';
import { FUN_005b3d06, FUN_005b8931, FUN_005b89bb, FUN_005b89e4, FUN_005b8a81, FUN_005b8aa8 } from './block_005B0000.js';
import { FUN_005b8b1a, FUN_005b8c18, FUN_005b8ca6, FUN_005b8ee1, FUN_005b94d5, FUN_005b94fc } from './block_005B0000.js';
import { FUN_005b976d, FUN_005b98b7, FUN_005b9c49, FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0 } from './block_005B0000.js';
import { FUN_005baec8, FUN_005baee0, FUN_005baf57, FUN_005bb024, FUN_005bb0af, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bbfee, FUN_005bca3d, FUN_005bd630, FUN_005bd65c, FUN_005bd915, FUN_005bf5e1 } from './block_005B0000.js';
import { CString, FUN_005c0073, FUN_005c041f, FUN_005c0cc5, FUN_005c61b0, FUN_005c64da } from './block_005C0000.js';
import { FUN_005c656b, FUN_005c8200, FUN_005c841d, FUN_005c847f, FUN_005c8b58, FUN_005cde4d } from './block_005C0000.js';
import { FUN_005cedad, FUN_005cef31, InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d1f50, FUN_005d2004, FUN_005d225b, FUN_005db0d0, FUN_005db140 } from './block_005D0000.js';
import { FUN_005db55b } from './block_005D0000.js';
import { FID_conflict:_memcpy, FUN_005f22d0, FUN_005f22e0, __chdir, __strnicmp, _atoi } from './block_005F0000.js';
import { _fclose, _fopen, _fread, _fwrite, _memset, _strlen } from './block_005F0000.js';
import { _strncpy, operator_delete, operator_new } from './block_005F0000.js';
// Unresolved: XD_FlushSendBuffer

const DAT_00626000 = globalThis.DAT_00626000, DAT_00626004 = globalThis.DAT_00626004, DAT_00626030 = globalThis.DAT_00626030, DAT_00626040 = globalThis.DAT_00626040, DAT_00626044 = globalThis.DAT_00626044, DAT_00626048 = globalThis.DAT_00626048;
const DAT_0062604c = globalThis.DAT_0062604c, DAT_00626054 = globalThis.DAT_00626054, DAT_00626058 = globalThis.DAT_00626058, DAT_00626064 = globalThis.DAT_00626064, DAT_0062606c = globalThis.DAT_0062606c, DAT_00626070 = globalThis.DAT_00626070;
const DAT_00626074 = globalThis.DAT_00626074, DAT_00626078 = globalThis.DAT_00626078, DAT_0062607c = globalThis.DAT_0062607c, DAT_00626080 = globalThis.DAT_00626080, DAT_00626084 = globalThis.DAT_00626084, DAT_00626088 = globalThis.DAT_00626088;
const DAT_0062608c = globalThis.DAT_0062608c, DAT_00626090 = globalThis.DAT_00626090, DAT_00626098 = globalThis.DAT_00626098, DAT_0062609c = globalThis.DAT_0062609c, DAT_006260a4 = globalThis.DAT_006260a4, DAT_006260b0 = globalThis.DAT_006260b0;
const DAT_006260b4 = globalThis.DAT_006260b4, DAT_00626110 = globalThis.DAT_00626110, DAT_00626114 = globalThis.DAT_00626114, DAT_00626118 = globalThis.DAT_00626118, DAT_00626120 = globalThis.DAT_00626120, DAT_00626134 = globalThis.DAT_00626134;
const DAT_00626194 = globalThis.DAT_00626194, DAT_00626198 = globalThis.DAT_00626198, DAT_006261a0 = globalThis.DAT_006261a0, DAT_00626238 = globalThis.DAT_00626238, DAT_0062623c = globalThis.DAT_0062623c, DAT_00626248 = globalThis.DAT_00626248;
const DAT_0062624c = globalThis.DAT_0062624c, DAT_00626258 = globalThis.DAT_00626258, DAT_00626260 = globalThis.DAT_00626260, DAT_00627cce = globalThis.DAT_00627cce, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360;
const DAT_00628370 = globalThis.DAT_00628370, DAT_006283a0 = globalThis.DAT_006283a0, DAT_006359d4 = globalThis.DAT_006359d4, DAT_0063e4e0 = globalThis.DAT_0063e4e0, DAT_0063e4f8 = globalThis.DAT_0063e4f8, DAT_0063e540 = globalThis.DAT_0063e540;
const DAT_0063e9a0 = globalThis.DAT_0063e9a0, DAT_0063ea20 = globalThis.DAT_0063ea20, DAT_0063ea28 = globalThis.DAT_0063ea28, DAT_0063eaa8 = globalThis.DAT_0063eaa8, DAT_0063eab8 = globalThis.DAT_0063eab8, DAT_0063eac0 = globalThis.DAT_0063eac0;
const DAT_0063eac8 = globalThis.DAT_0063eac8, DAT_0063eae0 = globalThis.DAT_0063eae0, DAT_0063eaf8 = globalThis.DAT_0063eaf8, DAT_0063eb10 = globalThis.DAT_0063eb10, DAT_0063eb58 = globalThis.DAT_0063eb58, DAT_0063efb8 = globalThis.DAT_0063efb8;
const DAT_0063f030 = globalThis.DAT_0063f030, DAT_0063f038 = globalThis.DAT_0063f038, DAT_0063f050 = globalThis.DAT_0063f050, DAT_0063f0c8 = globalThis.DAT_0063f0c8, DAT_0063f0ca = globalThis.DAT_0063f0ca, DAT_0063f0cc = globalThis.DAT_0063f0cc;
const DAT_0063f0ce = globalThis.DAT_0063f0ce, DAT_0063f0d0 = globalThis.DAT_0063f0d0, DAT_0063f0d2 = globalThis.DAT_0063f0d2, DAT_0063f0d4 = globalThis.DAT_0063f0d4, DAT_0063f0d6 = globalThis.DAT_0063f0d6, DAT_0063f0d8 = globalThis.DAT_0063f0d8;
const DAT_0063f0da = globalThis.DAT_0063f0da, DAT_0063f0dc = globalThis.DAT_0063f0dc, DAT_0063f0de = globalThis.DAT_0063f0de, DAT_0063f540 = globalThis.DAT_0063f540, DAT_0063f544 = globalThis.DAT_0063f544, DAT_0063f668 = globalThis.DAT_0063f668;
const DAT_0063f66c = globalThis.DAT_0063f66c, DAT_0063fc58 = globalThis.DAT_0063fc58, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1bd = globalThis.DAT_0064b1bd, DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1c8 = globalThis.DAT_0064b1c8;
const DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b9c0 = globalThis.DAT_0064b9c0, DAT_0064ba10 = globalThis.DAT_0064ba10, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064bcbc = globalThis.DAT_0064bcbc, DAT_0064c488 = globalThis.DAT_0064c488;
const DAT_0064c5c0 = globalThis.DAT_0064c5c0, DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a6 = globalThis.DAT_0064c6a6, DAT_0064c6ac = globalThis.DAT_0064c6ac, DAT_0064c6ae = globalThis.DAT_0064c6ae, DAT_0064c6b0 = globalThis.DAT_0064c6b0;
const DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1, DAT_0064c6e0 = globalThis.DAT_0064c6e0, DAT_0064c706 = globalThis.DAT_0064c706;
const DAT_0064c708 = globalThis.DAT_0064c708, DAT_0064c70e = globalThis.DAT_0064c70e, DAT_0064c7f4 = globalThis.DAT_0064c7f4, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f344 = globalThis.DAT_0064f344;
const DAT_0064f346 = globalThis.DAT_0064f346, DAT_0064f347 = globalThis.DAT_0064f347, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34a = globalThis.DAT_0064f34a, DAT_0064f34b = globalThis.DAT_0064f34b;
const DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f34d = globalThis.DAT_0064f34d, DAT_0064f356 = globalThis.DAT_0064f356, DAT_0064f35a = globalThis.DAT_0064f35a, DAT_0064f35c = globalThis.DAT_0064f35c, DAT_0064f35e = globalThis.DAT_0064f35e;
const DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f370 = globalThis.DAT_0064f370, DAT_0064f374 = globalThis.DAT_0064f374, DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f37a = globalThis.DAT_0064f37a, DAT_0064f37b = globalThis.DAT_0064f37b;
const DAT_0064f37c = globalThis.DAT_0064f37c, DAT_0064f37e = globalThis.DAT_0064f37e, DAT_0064f37f = globalThis.DAT_0064f37f, DAT_0064f381 = globalThis.DAT_0064f381, DAT_0064f384 = globalThis.DAT_0064f384, DAT_0064f38a = globalThis.DAT_0064f38a;
const DAT_0064f38c = globalThis.DAT_0064f38c, DAT_0064f38e = globalThis.DAT_0064f38e, DAT_0064f390 = globalThis.DAT_0064f390, DAT_0064f391 = globalThis.DAT_0064f391, DAT_0064f392 = globalThis.DAT_0064f392, DAT_0064f393 = globalThis.DAT_0064f393;
const DAT_0064f394 = globalThis.DAT_0064f394, DAT_00655020 = globalThis.DAT_00655020, DAT_00655358 = globalThis.DAT_00655358, DAT_00655360 = globalThis.DAT_00655360, DAT_006554fc = globalThis.DAT_006554fc, DAT_006554fd = globalThis.DAT_006554fd;
const DAT_006554fe = globalThis.DAT_006554fe, DAT_00655504 = globalThis.DAT_00655504, DAT_006558e8 = globalThis.DAT_006558e8, DAT_00655be6 = globalThis.DAT_00655be6, DAT_00655c22 = globalThis.DAT_00655c22, DAT_00655c38 = globalThis.DAT_00655c38;
const DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560fd = globalThis.DAT_006560fd, DAT_00656100 = globalThis.DAT_00656100, DAT_0065610a = globalThis.DAT_0065610a, DAT_00666130 = globalThis.DAT_00666130, DAT_00666134 = globalThis.DAT_00666134;
const DAT_0067963f = globalThis.DAT_0067963f, DAT_00679640 = globalThis.DAT_00679640, DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad558 = globalThis.DAT_006ad558, DAT_006af220 = globalThis.DAT_006af220;
const DAT_006af260 = globalThis.DAT_006af260, DAT_006af280 = globalThis.DAT_006af280, DAT_006af2a0 = globalThis.DAT_006af2a0, DAT_006af2a2 = globalThis.DAT_006af2a2, DAT_006af2a4 = globalThis.DAT_006af2a4, DAT_006af2a6 = globalThis.DAT_006af2a6;
const DAT_006af2a8 = globalThis.DAT_006af2a8, DAT_fffff9c8 = globalThis.DAT_fffff9c8, DAT_fffff9e0 = globalThis.DAT_fffff9e0, DAT_fffffc9c = globalThis.DAT_fffffc9c, DAT_fffffcb8 = globalThis.DAT_fffffcb8, DAT_fffffcd4 = globalThis.DAT_fffffcd4;
const DAT_fffffcf0 = globalThis.DAT_fffffcf0, DAT_fffffe10 = globalThis.DAT_fffffe10, DAT_fffffe30 = globalThis.DAT_fffffe30, DAT_fffffe64 = globalThis.DAT_fffffe64, DAT_fffffe8c = globalThis.DAT_fffffe8c, DAT_fffffeac = globalThis.DAT_fffffeac;
const DAT_fffffed4 = globalThis.DAT_fffffed4, DAT_fffffed8 = globalThis.DAT_fffffed8, DAT_fffffef4 = globalThis.DAT_fffffef4, DAT_ffffff04 = globalThis.DAT_ffffff04, DAT_ffffff1c = globalThis.DAT_ffffff1c, DAT_ffffff20 = globalThis.DAT_ffffff20;
const DAT_ffffff40 = globalThis.DAT_ffffff40, DAT_ffffff6c = globalThis.DAT_ffffff6c, DAT_ffffff70 = globalThis.DAT_ffffff70, DAT_ffffff74 = globalThis.DAT_ffffff74, DAT_ffffff78 = globalThis.DAT_ffffff78, DAT_ffffff7c = globalThis.DAT_ffffff7c;
const DAT_ffffff80 = globalThis.DAT_ffffff80, DAT_ffffff84 = globalThis.DAT_ffffff84, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffffa0 = globalThis.DAT_ffffffa0, DAT_ffffffa4 = globalThis.DAT_ffffffa4, DAT_ffffffb4 = globalThis.DAT_ffffffb4;
const DAT_ffffffd0 = globalThis.DAT_ffffffd0, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe4 = globalThis.DAT_ffffffe4, DAT_ffffffe8 = globalThis.DAT_ffffffe8;
const DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4, DAT_fffffff8 = globalThis.DAT_fffffff8, PTR_FUN_0061c05c = globalThis.PTR_FUN_0061c05c, s_%STRING0_006260d0 = globalThis.s_%STRING0_006260d0;
const s_%STRING0_006260fc = globalThis.s_%STRING0_006260fc, s_,000_0062605c = globalThis.s_,000_0062605c, s_0,000_00626240 = globalThis.s_0,000_00626240, s_0,000_00626250 = globalThis.s_0,000_00626250, s_@STOP_00626268 = globalThis.s_@STOP_00626268, s_@STOP_00626278 = globalThis.s_@STOP_00626278;
const s_CREDITS_00626148 = globalThis.s_CREDITS_00626148, s_CREDITS_00626150 = globalThis.s_CREDITS_00626150, s_CREDITS_00626158 = globalThis.s_CREDITS_00626158, s_CREDITS_0062616c = globalThis.s_CREDITS_0062616c, s_CREDITS_00626180 = globalThis.s_CREDITS_00626180, s_Create_City:_Connection_to_serve_00626280 = globalThis.s_Create_City:_Connection_to_serve_00626280;
const s_EXTRA_00626270 = globalThis.s_EXTRA_00626270, s_Error_006260dc = globalThis.s_Error_006260dc, s_Error_00626108 = globalThis.s_Error_00626108, s_FCREDITS_00626174 = globalThis.s_FCREDITS_00626174, s_FEMALEFAME_006260b8 = globalThis.s_FEMALEFAME_006260b8, s_FEMALEFAME_006260e4 = globalThis.s_FEMALEFAME_006260e4;
const s_HALLFAME.DAT_00626124 = globalThis.s_HALLFAME.DAT_00626124, s_HALLFAME.DAT_00626138 = globalThis.s_HALLFAME.DAT_00626138, s_HISTORIANS_00626010 = globalThis.s_HISTORIANS_00626010, s_HISTORIES_0062601c = globalThis.s_HISTORIES_0062601c, s_HISTORYRANK_00626034 = globalThis.s_HISTORYRANK_00626034, s_HISTORY_00626028 = globalThis.s_HISTORY_00626028;
const s_INTELLCITY_00625f30 = globalThis.s_INTELLCITY_00625f30, s_MALEFAME_006260c4 = globalThis.s_MALEFAME_006260c4, s_MALEFAME_006260f0 = globalThis.s_MALEFAME_006260f0, s_MPCREDITS_00626160 = globalThis.s_MPCREDITS_00626160, s_NOFOREIGN_00625f60 = globalThis.s_NOFOREIGN_00625f60, s_NOINTEL_00625ff8 = globalThis.s_NOINTEL_00625ff8;
const s_PARLEYBUSY_00625fd0 = globalThis.s_PARLEYBUSY_00625fd0, s_PARLEYBUSY_00625fec = globalThis.s_PARLEYBUSY_00625fec, s_PARLEYCANCEL_00625fa4 = globalThis.s_PARLEYCANCEL_00625fa4, s_PARLEYCANCEL_00625fdc = globalThis.s_PARLEYCANCEL_00625fdc, s_PARLEYGOAWAY_00625fb4 = globalThis.s_PARLEYGOAWAY_00625fb4, s_PARLEYOK_00625fc4 = globalThis.s_PARLEYOK_00625fc4;
const s_PARLEYWAITING_00625f94 = globalThis.s_PARLEYWAITING_00625f94, s_PEACENOBETRAY_00625f84 = globalThis.s_PEACENOBETRAY_00625f84, s_REPORTFOREIGNMULTI_00625f4c = globalThis.s_REPORTFOREIGNMULTI_00625f4c, s_REPORTFOREIGN_00625f3c = globalThis.s_REPORTFOREIGN_00625f3c, s_SCREDITS_00626188 = globalThis.s_SCREDITS_00626188, s_SERVERCONNECTTIME_006262b0 = globalThis.s_SERVERCONNECTTIME_006262b0;
const s_TOOMANYCITIES_006262c4 = globalThis.s_TOOMANYCITIES_006262c4, s_WONDERS_00626008 = globalThis.s_WONDERS_00626008, s__006260a8 = globalThis.s__006260a8;


 export function FUN_00430267 (param_1)

 {
  wv(DAT_0063ef70, DAT_0063ef74 * param_1);
  FUN_0042f293();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0043028a (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let bVar5;
  let local_18;
  let local_14;

  uVar1 = DAT_0063efac;
  if ((iVar3 < 3)) {
    iVar3 = (DAT_0063ef74 * iVar3 + DAT_0063ef70);
    local_14 = 0;
    for (/* cond: (local_18 < 0x64) */); local_18 = (local_18 < 0x64); local_18 = (local_18 + 1)) {
      iVar4 = FUN_004bd9f0(uVar1, local_18);
      if (bVar5) {
        FUN_00566584(local_18);
        wv(DAT_0063eb58, DAT_0063eb58);
        wv(DAT_00625ec4, 1);
        return;
      }
    }
  }
  return;
}


 export function FUN_0043039d ()

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_310;
  let local_30c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004305f3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  iVar1 = DAT_0063efac;
  local_8 = 0;
  uVar2 = FUN_00493c7d(DAT_0063efac);
  FUN_0040ff60(0, uVar2);
  FUN_0043c9d0(s_INTELLCITY_00625f30);
  for (/* cond: (local_30c < ((DAT_00655b18) << 16 >> 16)) */); local_30c = (local_30c < ((DAT_00655b18) << 16 >> 16)); local_30c = (local_30c + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_30c * 0x58]) === iVar1)) {
      FUN_0040bbb0();
      FUN_0040bbe0((DAT_0064f360 + local_30c * 0x58));
      iVar3 = FUN_0043d20a(local_30c, 1);
      if ((iVar3 !== 0)) {
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0x99);
        FUN_0040fed0();
      }
      if ((_MEM[DAT_0064f379 + local_30c * 0x58] < 0xda)) {
        if ((_MEM[DAT_0064f379 + local_30c * 0x58] < 1)) {
          local_310 = ((~s8(_MEM[DAT_0064f379 + local_30c * 0x58])) + 1);
        }
        else {
          local_310 = s8(_MEM[DAT_0064f379 + local_30c * 0x58]);
        }
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0xf4);
        FUN_0040fe10();
        FUN_0040ff00(s32((DAT_0064c488 + local_310 * 8), 0));
        FUN_0040fed0();
      }
      FUN_0059edf0(DAT_00679640, local_30c, 0);
    }
  }
  FUN_0043c630();
  FUN_0040bc80(0);
  FUN_0043c660();
  wv(DAT_0063eb58, DAT_0063eb58);
  wv(DAT_00625ec4, 1);
  local_8 = -1;
  FUN_004305e7();
  FUN_004305fd();
  return;
}


 export function FUN_004305e7 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004305fd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004306c1)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0043074c)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0043060b (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  FUN_0042a7bc(3, 3, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  wv(DAT_0063efac, param_2);
  FUN_004086c0(DAT_ffffffec, 2, 0, 0x129, 0x18);
  iVar1 = DAT_0063ec38;
  iVar2 = FUN_00407fc0(DAT_ffffffec);
  FUN_0043c790(DAT_ffffffec, DAT_0063ec34, ((iVar1 - iVar2) + 0x18e));
  FUN_0043c790(DAT_ffffffec, 0x12b, 0);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(DAT_0063eb58, 0x64, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00401235);
  FUN_0040f7d0();
  FUN_0040f840();
  FUN_0043c790(DAT_ffffffec, -0x12b, 0);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x314), 0));
  FUN_0040f680(DAT_0063eb58, 0x65, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00402261);
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  do {
    wv(DAT_00625ec4, 0);
    if ((2 < DAT_00655b02)) {
      wv(DAT_0063eb58, DAT_0063eb58);
    }
    _DAT_00625ec0 = FUN_00421bb0();
    FUN_005c61b0();
    wv(DAT_0063eb58, DAT_0063eb58);
  } while ((DAT_00625ec4 !== 0));
  FUN_0042a768();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00430822 ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if ((DAT_006c91e4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
    if ((DAT_0063f278 === -1)) {
      wv(DAT_0063f278, 0);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004308ae (param_1)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let local_330;
  let local_32c;
  let local_320;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_2d3;
  let local_234;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0043155b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_0067a8bc === 0)) {
    iVar1 = FUN_00414d10();
    FUN_006e7da0(s32((iVar1 + 4), 0));
    local_8 = -1;
    FUN_0043154f();
    FUN_00431565();
    return;
  }
  while ((local_234 === 2)) {
    while ((local_234 !== 1)) {
      iVar1 = FUN_005adfa0(_MEM[DAT_00655c22 + param_1], 1, 7);
      FUN_004271e8(0, s32(((DAT_00628420 + 0x38c) + iVar1 * 4), 0));
      iVar1 = FUN_005adfa0(_MEM[DAT_0064c6be + param_1 * 0x594], 0, 7);
      FUN_004271e8(1, s32(((DAT_00628420 + 0x370) + iVar1 * 4), 0));
      if ((DAT_00655b02 === 0)) {
        FUN_0040ffa0(s_REPORTFOREIGN_00625f3c, 0x2000001);
      }
      else {
        FUN_0040ffa0(s_REPORTFOREIGNMULTI_00625f4c, 0x2000001);
      }
      local_310 = DAT_fffffcf0;
      FUN_0043c990(0x4b, 0);
      local_314 = 0;
      iVar1 = FUN_00453e51(param_1, 0x18);
      if ((iVar1 === 0)) {
        local_31c = 0;
      }
      else {
        local_31c = 1;
      }
      if ((DAT_00655b07 === 0)) {
        local_14 = 0;
      }
      else {
        local_14 = 1;
      }
      for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
        if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
          if ((DAT_00655b08 !== 0)) {
            local_1c = 0;
          }
          else {
            local_1c = 1;
          }
          if (((_MEM[DAT_0064c6c0 + (local_18 * 4 + param_1 * 0x594)] & 1) !== 0)) {
            local_314 = (local_314 + 1);
            FUN_0040bbb0();
            uVar2 = FUN_00493ba6(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            uVar2 = FUN_00493b10(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            FUN_0040bc10(0x8c);
            FUN_0040fe10();
            uVar2 = FUN_00493c7d(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            FUN_0045705e(param_1, local_18);
            local_318 = FUN_004679ab(DAT_0064b114);
            FUN_0040fea0();
            FUN_0040ff00(s32((DAT_0064b9c0 + local_318 * 4), 0));
            if (((_MEM[DAT_0064c6c1 + (local_18 * 4 + param_1 * 0x594)] & 0x20) === 0)) {
              if (((_MEM[DAT_0064c6c0 + (local_18 * 4 + param_1 * 0x594)] & 8) === 0)) {
                if (((_MEM[DAT_0064c6c0 + (local_18 * 4 + param_1 * 0x594)] & 4) === 0)) {
                  if (((_MEM[DAT_0064c6c0 + (local_18 * 4 + param_1 * 0x594)] & 2) !== 0)) {
                    FUN_00421d30();
                    FUN_0040bc10(0x8f);
                  }
                }
                else {
                  FUN_00421d30();
                  FUN_0040bc10(0x8e);
                }
              }
              else {
                FUN_00421d30();
                FUN_0040bc10(0x8d);
              }
            }
            else {
              FUN_00421d30();
              FUN_0040bc10(0x90);
            }
            if ((local_31c === 0)) {
              FUN_00421d30();
              FUN_0040bc10(0x91);
            }
            else {
              FUN_00421d30();
              FUN_0043c8a0(s32((DAT_0064c6a2 + local_18 * 0x594), 0));
              if ((DAT_00655b08 < 2)) {
                FUN_00421d30();
                FUN_0040ff30(((s16((DAT_0064c706 + local_18 * 0x594), 0)) << 16 >> 16));
                FUN_0040fe10();
                FUN_0040bc10(0x19);
              }
            }
            FUN_0040fed0();
            FUN_0059edf0(DAT_00679640, local_18, 0);
          }
        }
      }
      if ((local_314 === 0)) {
        FUN_00421ea0(s_NOFOREIGN_00625f60);
        local_8 = -1;
        FUN_0043154f();
        FUN_00431565();
        return;
      }
      local_18 = FUN_0040bc80(0);
      if (((local_2d3 & 0x20) !== 0)) {
        local_234 = 2;
      }
      if ((local_234 === 0)) {
        local_8 = -1;
        FUN_0043154f();
        FUN_00431565();
        return;
      }
      if ((local_234 !== 1)) {
        FUN_00410030(s_NOINTEL_00625ff8, DAT_0063fc58, 0);
      }
      else {
        FUN_0043060b(param_1, local_18);
      }
    }
    if ((local_234 === 2));
    uVar2 = FUN_00493ba6(local_18);
    FUN_0040bbe0(uVar2);
    FUN_0040fe10();
    uVar2 = FUN_00493b10(local_18);
    FUN_0040bbe0(uVar2);
    FUN_0040fe10();
    FUN_0040bc10(0x8c);
    FUN_0040fe10();
    uVar2 = FUN_00493c7d(local_18);
    FUN_0040bbe0(uVar2);
    FUN_0040ff60(0, DAT_00679640);
    local_318 = Create(DAT_fffffcf0, 0x625f7c, 0x625f6c, 1);
    if ((local_318 === 0)) {
      FUN_0059e4e6(3);
      for (/* cond: (local_318 < 9) */); local_318 = (local_318 < 9); local_318 = (local_318 + 1)) {
        uVar3 = 0;
        iVar1 = local_318;
        uVar2 = FUN_00428b0c(s32((DAT_0064b9c0 + local_318 * 4), 0), local_318, 0);
        FUN_0059edf0(uVar2, iVar1, uVar3);
      }
      if ((_MEM[DAT_0064c6e0 + (param_1 * 0x594 + local_18)] === 0)) {
        local_330 = 0;
      }
      else {
        local_330 = FUN_004679ab(_MEM[DAT_0064c6e0 + (param_1 * 0x594 + local_18)]);
      }
      FUN_0059ea99(local_330);
      local_318 = FUN_0040bc80(0);
      if ((-1 < local_318)) {
        local_32c = 0;
        local_32c = 5;
        local_32c = 0x11;
        local_32c = 0x1f;
        local_32c = 0x32;
        local_32c = 0x44;
        local_32c = 0x52;
        local_32c = 0x5f;
        local_32c = 0x64;
        _MEM[DAT_0064c6e0 + (param_1 * 0x594 + local_18)] = _MEM[DAT_fffffcd4 + local_318];
        FUN_0046b14d(0x98, 0xff, param_1, local_18, _MEM[DAT_fffffcd4 + local_318], 0, 0, 0, 0, 0);
      }
    }
  }
  if ((iVar1 !== 0)) {
    if ((2 < DAT_00655b02)) {
      if ((2 < DAT_00655b02)) {
        FUN_00467825(param_1, local_18, 0x401);
        wv(DAT_0063f278, -1);
        wv(DAT_00626a2c, 1);
        FUN_00511880(0x3d, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 0, 0, param_1, 0);
        uVar2 = FUN_00493b10(local_18);
        FUN_0040ff60(1, uVar2);
        uVar2 = FUN_00493c7d(local_18);
        FUN_0040ff60(2, uVar2);
        wv(DAT_00635a3c, LAB_0040326a);
        _DAT_0063e4e8 = FUN_00421bb0();
        local_320 = FUN_00426fb0(s_PARLEYWAITING_00625f94, 0x2000001, DAT_0063fc58, 0);
        if ((DAT_006c91e4 === 0)) {
          if ((local_320 === -1)) {
            FUN_0046b14d(0x81, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
            wv(DAT_0067a8c0, -1);
            wv(DAT_00626a2c, 0);
          }
          else if ((-1 < 1)) {
            wv(DAT_00635a3c, LAB_00403c74);
            FUN_00410030(s_PARLEYGOAWAY_00625fb4, DAT_0063fc58, 0);
            wv(DAT_00626a2c, 0);
          }
          else if ((-1 === 1)) {
            wv(DAT_0063f278, -1);
            wv(DAT_0067a8c0, local_18);
            wv(DAT_00635a3c, LAB_0040326a);
            _DAT_0063e4e8 = FUN_00421bb0();
            uVar2 = FUN_00493c7d(param_1);
            FUN_0040ff60(0, uVar2);
            FUN_00410030(s_PARLEYOK_00625fc4, DAT_0063fc58, 0);
            if ((DAT_006ad698 === 0)) {
              if ((DAT_006c91e4 === 0)) {
                FUN_004b7eb6(local_18, 3);
              }
              else {
                wv(DAT_0067a8c0, -1);
                wv(DAT_006c91e4, 0);
                uVar2 = FUN_00493c7d(local_18);
                FUN_0040ff60(0, uVar2);
                wv(DAT_00635a3c, LAB_00403c74);
                FUN_00410030(s_PARLEYCANCEL_00625fdc, DAT_0063fc58, 0);
                wv(DAT_00626a2c, 0);
              }
            }
            else {
              wv(DAT_0067a8c0, -1);
              wv(DAT_00635a3c, LAB_00403c74);
              FUN_00410030(s_PARLEYBUSY_00625fd0, DAT_0063fc58, 0);
              wv(DAT_00626a2c, 0);
            }
          }
          else {
            wv(DAT_00635a3c, LAB_00403c74);
            FUN_00410030(s_PARLEYBUSY_00625fec, DAT_0063fc58, 0);
            wv(DAT_00626a2c, 0);
          }
        }
        else {
          wv(DAT_006c91e4, 0);
          uVar2 = FUN_00493c7d(local_18);
          FUN_0040ff60(0, uVar2);
          wv(DAT_00635a3c, LAB_00403c74);
          FUN_00410030(s_PARLEYCANCEL_00625fa4, DAT_0063fc58, 0);
          wv(DAT_0067a8c0, -1);
          wv(DAT_00626a2c, 0);
        }
      }
    }
    else {
      FUN_00467825(param_1, local_18, 0x401);
      FUN_00460129(param_1, local_18, -1, -1, 1);
    }
  }
  else {
    FUN_00421ea0(s_PEACENOBETRAY_00625f84);
  }
 LAB_0043153e: :
  local_8 = -1;
  FUN_0043154f();
  FUN_00431565();
  return;
}


 export function FUN_0043154f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00431565 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00431bb2)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00431573 ()

 {
  let extraout_EAX;
  let uVar1;
  let iVar2;
  let local_88;
  let local_84;
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
  let local_18;
  let aiStack_14;

  local_74 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_58 = (DAT_0063ec38 + 2);
  local_6c = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_30 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x29, 0x12, 2, 1);
  for (/* cond: (local_2c < 4) */); local_2c = (local_2c < 4); local_2c = (local_2c + 1)) {
    w32(DAT_ffffffec, local_2c, 0);
  }
  local_34 = 0;
  for (/* cond: (local_3c < 0x1c) */); local_3c = (local_3c < 0x1c); local_3c = (local_3c + 1)) {
    if ((s16((DAT_00655be6 + local_3c * 2), 0) !== 0xffff)) {
      local_2c = (local_3c / 7 | 0);
      iVar2 = (local_34 + 1);
      if ((s32(DAT_ffffffec, local_2c) === 0)) {
        iVar2 = (local_34 + 2);
      }
      local_34 = iVar2;
      w32(DAT_ffffffec, local_2c, (s32(DAT_ffffffec, local_2c) + 1));
    }
  }
  if ((local_34 === 0)) {
    FUN_0040bbb0();
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x550), 0));
    FUN_0040bbe0(uVar1);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_58, DAT_0063ec3c);
    local_58 = ((local_58 + local_30) + 4);
    FUN_0040bbb0();
    FUN_0040bbe0(DAT_00626000);
    FUN_0040bc10(0x125);
    FUN_0040bbe0(DAT_00626004);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_58, DAT_0063ec3c);
    local_58 = (local_58 + local_30);
  }
  local_30 = 0x28;
  wv(DAT_0063ef80, 0x28);
  _DAT_0063ef78 = local_58;
  _DAT_0063ef7c = (local_6c - local_58);
  wv(DAT_0063ef74, FUN_005adfa0(((local_6c - local_58) / 0x28 | 0), 1, 0x63));
  local_18 = FUN_005adfa0(((local_6c - local_58) / 0x28 | 0), 1, 0x63);
  _DAT_0063ef68 = FUN_005adfa0((((FUN_005adfa0(((local_6c - local_58) / 0x28 | 0), 1, 0x63) + -1) + local_34) / FUN_005adfa0(((local_6c - local_58) / 0x28 | 0), 1, 0x63) | 0), 1, 0x63);
  uVar1 = FUN_005adfa0((local_34 + -1), 0, 0x3e7);
  wv(DAT_0063ef70, FUN_005adfa0(DAT_0063ef70, 0, uVar1));
  local_70 = local_58;
  local_54 = 0;
  for (/* cond: (local_2c < 4) */); local_2c = (local_2c < 4); local_2c = (local_2c + 1)) {
    w32(DAT_ffffffec, local_2c, 0);
  }
  local_68 = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
  for (/* cond: (local_3c < 0x1c) */); local_3c = (local_3c < 0x1c); local_3c = (local_3c + 1)) {
    if ((s16((DAT_00655be6 + local_3c * 2), 0) !== 0xffff)) {
      local_60 = (local_3c + 0x27);
      local_2c = (local_3c / 7 | 0);
      if ((s32(DAT_ffffffec, local_2c) === 0)) {
        w32(DAT_ffffffec, local_2c, (s32(DAT_ffffffec, local_2c) + 1));
        if ((local_54 < (local_68 + local_18))) {
          iVar2 = FUN_004a2645(DAT_006558e8, s_WONDERS_00626008, local_2c);
          if ((iVar2 === 0)) {
            local_40 = (local_70 + 0xf);
            FUN_005baee0(0x29, 0x12, 1, 1);
            FUN_0043c910(DAT_00679640, DAT_0063ec34, local_40, (DAT_0063ec3c - (DAT_0063efa4 + 2)));
          }
          local_70 = (local_70 + local_30);
        }
        local_54 = (local_54 + 1);
      }
      if ((local_54 < (local_68 + local_18))) {
        local_4c = (local_70 + 2);
        FUN_0040bbb0();
        if ((DAT_00628064 === 0)) {
          FUN_0040bc10(0xd7);
          FUN_0040fe10();
        }
        FUN_0040ff00(s32((DAT_0064c488 + local_60 * 8), 0));
        FUN_0040fe10();
        if ((s16((DAT_00655be6 + local_3c * 2), 0) < 0)) {
          FUN_0040fea0();
          FUN_0040bc10(0xac);
          FUN_0040fed0();
          local_38 = 0;
        }
        else {
          if ((DAT_00628064 === 0)) {
            local_88 = 0xad;
          }
          else {
            local_88 = 0xd8;
          }
          FUN_0040bc10(local_88);
          FUN_0040fe10();
          local_50 = ((s16((DAT_00655be6 + local_3c * 2), 0)) << 16 >> 16);
          FUN_0040bbe0((DAT_0064f360 + local_50 * 0x58));
          FUN_0040fe10();
          FUN_0040fea0();
          uVar1 = FUN_00410070(s8(_MEM[DAT_0064f348 + local_50 * 0x58]));
          FUN_0040bbe0(uVar1);
          FUN_0040fed0();
          local_38 = s8(_MEM[DAT_0064f348 + local_50 * 0x58]);
        }
        FUN_005baec8(DAT_0063eac0);
        uVar1 = FUN_0043cb30(local_38, 0x12, 1, 1);
        FUN_005baee0(uVar1);
        local_48 = FUN_0040efd0(DAT_00679640);
        local_48 = (local_48 + 0x43);
        local_44 = (DAT_0063ec3c - (DAT_0063efa4 + 2));
        local_64 = (((local_44 >> 1) + DAT_0063ec34) - (local_48 >> 1));
        FUN_005cef31(DAT_ffffff7c, DAT_0063eb10, local_64, (local_70 + 0xa));
        local_64 = (local_64 + 0x42);
        local_40 = (local_70 + 8);
        FUN_0043c8d0(DAT_00679640, local_64, local_40);
        local_70 = (local_70 + local_30);
        local_5c = (local_70 + -2);
        FUN_00408680(DAT_ffffffd8, (DAT_0063ec34 + 2), local_4c, (((DAT_0063ec3c + DAT_0063ec34) - DAT_0063efa4) + -4), local_5c);
        uVar1 = FUN_0043cab0(local_38);
        FUN_0043c7c0(DAT_0063eb10, DAT_ffffffd8, uVar1);
      }
      local_54 = (local_54 + 1);
    }
  }
  if ((DAT_0063efa8 === 0)) {
    FUN_00408680(DAT_ffffffd8, ((DAT_0063edd4 - DAT_0063efa4) + -2), local_58, (DAT_0063edd4 + -2), local_6c);
    FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffd8, 1);
    uVar1 = FUN_005adfa0((local_34 + -1), 0, 0x3e7);
    FUN_0040fd40(0, uVar1);
    FUN_0040fcf0(DAT_0063ef70);
    FUN_005db0d0(DAT_0063ef74);
    FUN_0040fd80(LAB_00402d1a);
    FUN_0040f380();
    wv(DAT_0063efa8, 1);
  }
  FUN_00408460();
  return;
}


 export function FUN_00431c56 (param_1)

 {
  wv(DAT_0063ef70, param_1);
  FUN_00431573();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00431c73 (param_1)

 {
  FUN_0042a7bc(7, 7, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return;
}


 export function FUN_00431d22 ()

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let local_650;
  let local_648;
  let local_640;
  let local_63c;
  let local_638;
  let local_630;
  let local_62c;
  let local_628;
  let local_624;
  let local_620;
  let local_4fc;
  let local_4f8;
  let local_4f4;
  let local_4f0;
  let local_364;
  let local_360;
  let local_35c;
  let local_358;
  let local_348;
  let local_300;
  let local_2fc;
  let local_258;
  let local_254;
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
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004325f9;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_0043c690();
  local_8 = 1;
  FUN_0043c690();
  local_8 = 2;
  FUN_0059db08(0x4000);
  local_8 = 3;
  local_18 = 0;
  local_14 = 0;
  FUN_0043c6c0(0, 0xc, 1);
  FUN_0043c6c0(0, 0xe, 1);
  pvVar2 = operator_new(0x48);
  local_8 = 4;
  if ((pvVar2 === 0)) {
    local_648 = 0;
  }
  else {
    local_648 = FUN_005bd630();
  }
  local_8 = 3;
  local_18 = local_648;
  pvVar2 = operator_new(0x434);
  local_8 = 5;
  if ((pvVar2 === 0)) {
    local_650 = 0;
  }
  else {
    local_650 = FUN_005c64da();
  }
  local_8 = ((UNNAMED << 8) | 3);
  local_14 = local_650;
  FUN_005bf5e1(0x33, 0xa, 0xc0, local_650);
  uVar11 = 0;
  uVar10 = 0;
  uVar9 = 0;
  uVar8 = 0x1a9;
  uVar7 = 0x258;
  uVar6 = 0x14;
  uVar5 = 0;
  uVar4 = 0xd;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x358), 0), 0xd, 0, 0x14, 0x258, 0x1a9, 0, 0, 0);
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, uVar7, uVar8, uVar9, uVar10, uVar11);
  FUN_005baeb0(DAT_fffff9e0);
  FUN_005baec8(DAT_fffffcb8);
  local_630 = local_4fc;
  local_38 = local_4f8;
  FUN_00552ed2();
  FUN_00552112();
  FUN_005a9afe(local_18, DAT_fffff9e0, 0, 0, local_630, local_38, 0x258, 0x190);
  local_2c = local_364;
  local_24 = local_35c;
  local_20 = local_358;
  local_28 = (local_360 + 0x190);
  FUN_0040fdb0(DAT_fffff9e0, DAT_ffffffd4, 0x14);
  FUN_004086c0(DAT_ffffffd4, (local_630 + 8), (local_38 + 2), 0x248, 0x16e);
  FUN_0043c7c0(DAT_fffff9e0, DAT_ffffffd4, 0xa);
  if (((DAT_0064bc60 & 2) === 0)) {
    local_30 = ((((DAT_00655af8) << 16 >> 16) + ((((DAT_00655af8) << 16 >> 16) >> 0x1f) & 3)) >> 2);
  }
  else {
    local_30 = (((DAT_00655af8) << 16 >> 16) / 2 | 0);
  }
  local_30 = FUN_005adfa0(local_30, 0, 0x96);
  if (((DAT_0064bc60 & 2) === 0)) {
    local_34 = 0x32;
  }
  else {
    local_34 = 0x19;
  }
  local_1c = 0x32;
  for (/* cond: (local_640 < 8) */); local_640 = (local_640 < 8); local_640 = (local_640 + 1)) {
    for (/* cond: (local_3c < local_30) */); local_3c = (local_3c < local_30); local_3c = (local_3c + 1)) {
      if ((local_1c < u8(_MEM[DAT_00655c38 + (local_3c * 8 + local_640)]))) {
        local_1c = u8(_MEM[DAT_00655c38 + (local_3c * 8 + local_640)]);
      }
    }
  }
  for (/* cond: (local_3c < 0x259) */); (local_3c = (local_3c <= ((DAT_00655af8) << 16 >> 16)) && (local_3c = (local_3c < 0x259)));
      local_3c = (local_3c + local_34)) {
    if (((DAT_0064bc60 & 2) === 0)) {
      local_624 = local_3c;
    }
    else {
      local_624 = local_3c * 2;
    }
    FUN_005a9798(DAT_fffff9e0, ((local_624 + local_630) + 8), (local_38 + 2), ((local_624 + local_630) + 8), (local_38 + 0x170), 0xa);
    if (((local_3c % local_34 * 2) === 0)) {
      local_4c = FUN_00484fec((local_3c + 1));
      FUN_0040bbb0();
      FUN_00421f10(local_4c);
      FUN_005baee0(0x25, 0xa, 2, 1);
      FUN_0043c8d0(DAT_00679640, (local_624 + local_630), (local_38 + 0x172));
    }
  }
  FUN_005c0073(DAT_ffffffd4);
  for (/* cond: (local_640 < 8) */); local_640 = (local_640 < 8); local_640 = (local_640 + 1)) {
    if ((((1 << (((local_640) & 0xFF) & 0x1f)) & u8(DAT_00655b0c)) !== 0)) {
      local_628 = 0;
      local_62c = 0;
      for (/* cond: (local_3c < 0x96) */); (local_3c = (local_3c < local_30) && (local_3c = (local_3c < 0x96))); local_3c = (local_3c + 1)) {
        local_40 = local_3c * 4;
        local_44 = (u8(_MEM[DAT_00655c38 + (local_3c * 8 + local_640)]) * 0x168 / local_1c | 0);
        FUN_005a9798(DAT_fffff9e0, ((local_628 + local_630) + 9), ((local_38 - local_62c) + 0x171), ((local_40 + local_630) + 9), ((local_38 - local_44) + 0x171), 0x12);
        local_628 = local_40;
        local_62c = local_44;
      }
    }
  }
  FUN_005c0073(DAT_fffffc9c);
  FUN_005baec8(DAT_fffff9c8);
  local_63c = 0;
  for (/* cond: (local_640 < 8) */); local_640 = (local_640 < 8); local_640 = (local_640 + 1)) {
    if ((((1 << (((local_640) & 0xFF) & 0x1f)) & u8(DAT_00655b0c)) !== 0)) {
      local_48 = FUN_0043cab0(local_640);
      FUN_005baee0(local_48, 0xa, 2, 1);
      iVar1 = (local_63c + 1);
      uVar3 = FUN_00493c7d(local_640, (local_630 + 0xa), ((local_63c * 0xe + local_38) + 1));
      FUN_0043c8d0(uVar3);
      local_628 = 0;
      local_62c = 0;
      for (/* cond: (local_3c < 0x96) */); (local_63c = iVar1, local_3c = (local_3c < local_30) && (local_3c = (local_3c < 0x96)));
          local_3c = (local_3c + 1)) {
        local_40 = local_3c * 4;
        local_44 = (u8(_MEM[DAT_00655c38 + (local_3c * 8 + local_640)]) * 0x168 / local_1c | 0);
        FUN_005a9798(DAT_fffff9e0, ((local_628 + local_630) + 8), ((local_38 + 0x170) - local_62c), ((local_40 + local_630) + 8), ((local_38 + 0x170) - local_44), local_48);
        local_628 = local_40;
        local_62c = local_44;
      }
    }
  }
  FUN_004085f0();
  FUN_0059dfb9(DAT_fffff9e0, 0, 0, 0x114000);
  local_300 = local_4f4;
  local_2fc = local_4f0;
  local_258 = local_4fc;
  local_254 = local_4f8;
  FUN_0040bc80(0);
  if ((local_18 !== 0)) {
    FUN_0040f010(1);
  }
  if ((local_14 !== 0)) {
    FUN_0043c740(1);
  }
  local_8 = 2;
  FUN_004325c9();
  local_8 = 1;
  FUN_004325d5();
  local_8 = (((local_8) >> 8) << 8);
  FUN_004325e1();
  local_8 = -1;
  FUN_004325ed();
  FUN_00432603();
  return;
}


 export function FUN_004325c9 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004325d5 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004325e1 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004325ed (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0x61c);
  return;
}


 export function FUN_00432603 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00432611 ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_394;
  let local_390;
  let local_38c;
  let local_388;
  let local_384;
  let local_88;
  let local_84;
  let local_34;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00432c04;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  iVar1 = FUN_004a2379(DAT_006558e8, s_HISTORIANS_00626010);
  if ((iVar1 === 0)) {
    FUN_004a23fc(1);
    iVar1 = _atoi(DAT_00679640);
    if ((iVar1 !== 0)) {
      iVar1 = FUN_0059a791(0, (iVar1 + -1));
      for (/* cond: (local_38c <= iVar1) */); local_38c = (local_38c <= iVar1); local_38c = (local_38c + 1)) {
        FUN_004a23fc(1);
      }
      FUN_0040ff60(1, DAT_00679640);
      iVar1 = FUN_0059a791(0, 4);
      FUN_004a2645(DAT_006558e8, s_HISTORIES_0062601c, iVar1);
      FUN_0040ff60(2, DAT_00679640);
      FUN_0040ffa0(s_HISTORY_00626028, 0x40000);
      FUN_0059e18b(DAT_00626030, -1, -1, -1, 0);
      for (/* cond: (local_394 < 8) */); local_394 = (local_394 < 8); local_394 = (local_394 + 1)) {
        w32(DAT_ffffffd0, local_394, 0);
      }
      for (/* cond: (local_388 < ((DAT_00655b18) << 16 >> 16)) */); local_388 = (local_388 < ((DAT_00655b18) << 16 >> 16)); local_388 = (local_388 + 1)) {
        if ((s32((DAT_0064f394 + local_388 * 0x58), 0) !== 0)) {
          if ((iVar1 === 3)) {
            w32(DAT_ffffffd0, s8(_MEM[DAT_0064f348 + local_388 * 0x58]), (s32(DAT_ffffffd0, s8(_MEM[DAT_0064f348 + local_388 * 0x58])) + ((s8(_MEM[DAT_0064f349 + local_388 * 0x58]) + s8(_MEM[DAT_0064f392 + local_388 * 0x58])) - s8(_MEM[DAT_0064f393 + local_388 * 0x58]))));
          }
          else if ((iVar1 === 4)) {
            w32(DAT_ffffffd0, s8(_MEM[DAT_0064f348 + local_388 * 0x58]), (s32(DAT_ffffffd0, s8(_MEM[DAT_0064f348 + local_388 * 0x58])) + s8(_MEM[DAT_0064f349 + local_388 * 0x58])));
          }
        }
      }
      for (/* cond: (local_394 < 8) */); local_394 = (local_394 < 8); local_394 = (local_394 + 1)) {
        if ((iVar1 === 0)) {
          w32(DAT_ffffffd0, local_394, (s32(DAT_ffffffd0, local_394) + s32((DAT_0064c6a2 + local_394 * 0x594), 0)));
        }
        else if ((iVar1 === 1)) {
          w32(DAT_ffffffd0, local_394, (s32(DAT_ffffffd0, local_394) + ((s16((DAT_0064c70e + local_394 * 0x594), 0)) & 0xFFFF)));
        }
        else if ((iVar1 === 2)) {
          for (/* cond: (local_384 < 0x64) */); local_384 = (local_384 < 0x64); local_384 = (local_384 + 1)) {
            iVar2 = FUN_004bd9f0(local_394, local_384);
            if ((iVar2 !== 0)) {
              w32(DAT_ffffffd0, local_394, (s32(DAT_ffffffd0, local_394) + 1));
            }
          }
        }
      }
      iVar1 = FUN_004a2379(DAT_006558e8, s_HISTORYRANK_00626034);
      if ((iVar1 === 0)) {
        for (/* cond: (local_88 < 8) */); local_88 = (local_88 < 8); local_88 = (local_88 + 1)) {
          FUN_004a23fc(1);
          FUN_005f22d0(DAT_ffffff7c, DAT_00679640);
          local_390 = -1;
          local_34 = 0;
          for (/* cond: (local_394 < 8) */); local_394 = (local_394 < 8); local_394 = (local_394 + 1)) {
            if ((((1 << (((local_394) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
              local_34 = s32(DAT_ffffffd0, local_394);
              local_390 = local_394;
            }
          }
          if ((local_390 < 0));
          FUN_0040bbb0();
          FUN_0040bbe0(DAT_00626040);
          FUN_0040ff30(local_88);
          FUN_0043c810();
          FUN_0040bc10(0x174);
          FUN_0040fe10();
          FUN_0040bbe0(DAT_ffffff7c);
          FUN_0040fe10();
          FUN_0040bc10(0xd9);
          if ((DAT_00628064 === 2)) {
            FUN_0040fe40();
          }
          else {
            FUN_0040fe10();
            FUN_0040bc10(0x8c);
            FUN_0040fe10();
          }
          uVar3 = FUN_00493c7d(local_390);
          FUN_0040bbe0(uVar3);
          if ((DAT_00655b08 === 0)) {
            FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
          }
        }
        FUN_0040bc80(0);
      }
    }
  }
  local_8 = -1;
  FUN_00432bf8();
  FUN_00432c0e();
  return;
}


 export function FUN_00432bf8 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00432c0e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00432c1c ()

 {
  let extraout_EAX;
  let uVar1;
  let local_8c;
  let aiStack_7c;
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
  let aiStack_2c;
  let local_18;
  let local_14;

  for (/* cond: (local_34 < 5) */); local_34 = (local_34 < 5); local_34 = (local_34 + 1)) {
    w32(DAT_ffffff84, local_34, -1);
    w32(DAT_ffffffd4, local_34, s32(DAT_ffffff84, local_34));
  }
  local_58 = 0;
  while ((s32((DAT_0064f394 + local_58 * 0x58), 0) !== 0)) {
    if ((((DAT_00655b18) << 16 >> 16) <= local_58)) {
      FUN_00552ed2();
      FUN_00552112();
      FUN_0042ac18();
      local_5c = (DAT_0063ec38 + 2);
      local_68 = (DAT_0063ec38 + 0x174);
      wv(DAT_0063eac0, DAT_0063eac0);
      local_30 = extraout_EAX;
      FUN_005baeb0(DAT_0063eb10);
      FUN_005baec8(DAT_0063eac0);
      FUN_005baee0(0x25, 0x12, 2, 1);
      FUN_0040bbb0();
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x554), 0));
      FUN_0040bbe0(uVar1);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
      _DAT_0063ef78 = (local_5c + local_30);
      local_5c = ((local_5c + local_30) + 0xa);
      local_30 = 0x18;
      wv(DAT_0063ef80, 0x18);
      _DAT_0063ef78 = ((local_5c + local_30) + 0x12);
      _DAT_0063ef7c = (local_68 - local_5c);
      for (/* cond: (local_34 < 5) */); local_34 = (local_34 < 5); local_34 = (local_34 + 1)) {
        local_58 = s32(DAT_ffffff84, local_34);
        if ((-1 < s32(DAT_ffffff84, local_34))) {
          local_54 = local_5c;
          FUN_0040bbb0();
          FUN_0040ff30((local_34 + 1));
          FUN_0043c810();
          FUN_0040bbe0((DAT_0064f360 + local_58 * 0x58));
          FUN_0040fe10();
          FUN_0040fea0();
          uVar1 = FUN_00410070(s8(_MEM[DAT_0064f348 + local_58 * 0x58]));
          FUN_0040bbe0(uVar1);
          FUN_0040fed0();
          FUN_005baec8(DAT_0063eac0);
          uVar1 = FUN_0043cb30(s8(_MEM[DAT_0064f348 + local_58 * 0x58]), 0x12, 1, 1);
          FUN_005baee0(uVar1);
          FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
          local_5c = (local_5c + local_30);
          local_64 = (DAT_0063ec34 + 5);
          FUN_0056d289(DAT_0063eb10, local_58, 0x1000, local_64, (local_5c + -15), 0);
          local_44 = (local_64 + 0x42);
          local_48 = ((DAT_0063ec3c + DAT_0063ec34) + -5);
          local_4c = (local_48 - local_44);
          local_50 = ((local_4c >> 1) + local_44);
          FUN_0042d781(local_58, local_44, local_5c, ((local_50 + -2) - local_44), s8(_MEM[DAT_0064f392 + local_58 * 0x58]), s8(_MEM[DAT_0064f393 + local_58 * 0x58]), 0);
          local_40 = local_50;
          for (/* cond: (local_38 < 0x1c) */); local_38 = (local_38 < 0x1c); local_38 = (local_38 + 1)) {
            if ((0x23 < (local_48 - local_40))) {
              FUN_005cef31(DAT_ffffff74, DAT_0063eb10, local_40, (local_5c + 6));
              local_40 = (local_40 + 0x26);
            }
          }
          local_60 = (local_5c + 0x20);
          local_5c = local_60;
          FUN_00408680(DAT_ffffffec, (DAT_0063ec34 + 3), local_54, ((DAT_0063ec3c + DAT_0063ec34) + -3), local_60);
          uVar1 = FUN_0043cab0(s8(_MEM[DAT_0064f348 + local_58 * 0x58]));
          FUN_0043c7c0(DAT_0063eb10, DAT_ffffffec, uVar1);
          local_5c = (local_5c + 6);
        }
      }
      FUN_00408460();
      return;
    }
    if ((s32((DAT_0064f394 + local_58 * 0x58), 0) !== 0));
  }
  local_18 = ((s8(_MEM[DAT_0064f349 + local_58 * 0x58]) + s8(_MEM[DAT_0064f392 + local_58 * 0x58])) - s8(_MEM[DAT_0064f393 + local_58 * 0x58]));
  for (/* cond: (local_38 < 0x1c) */); local_38 = (local_38 < 0x1c); local_38 = (local_38 + 1)) {
    if ((((s16((DAT_00655be6 + local_38 * 2), 0)) << 16 >> 16) === local_58)) {
      local_18 = (local_18 + 0xa);
    }
  }
  local_34 = 0;
 LAB_00432d26: :
  if ((local_34 < 5)) {
    if ((local_18 <= s32(DAT_ffffffd4, local_34))); local_34 = (local_34 <= local_3c); local_3c = (local_3c + -1)) {
      w32(DAT_ffffffd4, (local_3c + 1), s32(DAT_ffffffd4, local_3c));
      w32(DAT_ffffff84, (local_3c + 1), s32(DAT_ffffff84, local_3c));
    }
    w32(DAT_ffffffd4, local_34, local_18);
    w32(DAT_ffffff84, local_34, local_58);
  }
  goto LAB_00432c6b;
 LAB_00432d23: :
  local_34 = (local_34 + 1);
  goto LAB_00432d26;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00433122 (param_1)

 {
  FUN_0042a7bc(8, 8, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return;
}


 export function FUN_004331d1 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 1;
  local_14 = -0x270f;
  local_8 = param_2;
  if ((param_3 < 0)) {
    w32((param_1 + param_2 * 4), 0, (-s32((param_1 + param_2 * 4), 0)));
  }
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      if ((param_2 !== local_c)) {
        w32((param_1 + local_c * 4), 0, (-s32((param_1 + local_c * 4), 0)));
      }
      if ((s32((param_1 + param_2 * 4), 0) < s32((param_1 + local_c * 4), 0))) {
        local_10 = (local_10 + 1);
      }
      if ((local_14 < s32((param_1 + local_c * 4), 0))) {
        local_14 = s32((param_1 + local_c * 4), 0);
        local_8 = local_c;
      }
    }
  }
  if ((param_3 < 1)) {
    param_3 = ((~param_3) + 1);
  }
  if ((local_14 < 1)) {
    local_14 = ((~local_14) + 1);
  }
  FUN_0040bbb0();
  FUN_0040bc10((local_10 + 0x189));
  FUN_0043c8d0(DAT_00679640, param_5, param_3);
  if ((iVar1 !== 0)) {
    FUN_0040bbb0();
    FUN_0040fea0();
    uVar2 = FUN_00493c7d(local_8);
    FUN_0040bbe0(uVar2);
    FUN_0040bbe0(DAT_00626044);
    FUN_0043c870(local_14);
    FUN_0040bbe0(param_4);
    FUN_0040fed0();
    uVar2 = FUN_0043cb30(local_8, 0x12, 1, 1);
    FUN_005baee0(uVar2);
    FUN_0043c950(DAT_00679640, param_5, param_3, (param_6 - param_5));
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00433434 ()

 {
  let iVar1;
  let iVar2;
  let extraout_EAX;
  let uVar3;
  let iVar4;
  let aiStack_1f0;
  let aiStack_1d0;
  let local_1b0;
  let local_1ac;
  let local_1a8;
  let local_1a4;
  let local_1a0;
  let aiStack_19c;
  let local_17c;
  let local_178;
  let aiStack_174;
  let aiStack_154;
  let local_134;
  let local_130;
  let aiStack_12c;
  let aiStack_10c;
  let local_ec;
  let local_e8;
  let local_e4;
  let local_c4;
  let local_c0;
  let local_70;
  let aiStack_6c;
  let aiStack_4c;
  let local_2c;
  let aiStack_28;
  let local_8;

  iVar1 = DAT_0063ef6c;
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffffb4, local_e8, 0);
    w32(DAT_fffffe10, local_e8, s32(DAT_ffffffb4, local_e8));
    w32(DAT_fffffe64, local_e8, s32(DAT_fffffe10, local_e8));
    w32(DAT_fffffe8c, local_e8, 0);
    w32(DAT_fffffe30, local_e8, s32(DAT_fffffe8c, local_e8));
    w32(DAT_fffffed4, local_e8, s32(DAT_fffffe30, local_e8));
    w32(DAT_ffffffd8, local_e8, s32(DAT_fffffed4, local_e8));
    w32(DAT_fffffef4, local_e8, 0);
    w32(DAT_fffffeac, local_e8, s32(DAT_fffffef4, local_e8));
    w32(DAT_ffffff94, local_e8, 1);
  }
  local_130 = (DAT_00636598 + 5);
  for (/* cond: (local_c4 < ((DAT_006d1164) << 16 >> 16)) */); local_c4 = (local_c4 < ((DAT_006d1164) << 16 >> 16)); local_c4 = (local_c4 + 1)) {
    local_e8 = (u8(_MEM[local_130]) >> 4);
    if ((local_e8 < 8)) {
      w32(DAT_fffffe30, local_e8, (s32(DAT_fffffe30, local_e8) + 1));
    }
    local_130 = (local_130 + 6);
  }
  for (/* cond: (local_1a4 < ((DAT_00655b18) << 16 >> 16)) */); local_1a4 = (local_1a4 < ((DAT_00655b18) << 16 >> 16)); local_1a4 = (local_1a4 + 1)) {
    if ((s32((DAT_0064f394 + local_1a4 * 0x58), 0) !== 0)) {
      local_e8 = s8(_MEM[DAT_0064f348 + local_1a4 * 0x58]);
      FUN_004eb4ed(local_1a4, 1);
      w32(DAT_ffffff94, local_e8, (s32(DAT_ffffff94, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      w32(DAT_fffffe64, local_e8, (s32(DAT_fffffe64, local_e8) + ((s8(_MEM[DAT_0064f349 + local_1a4 * 0x58]) + DAT_006a6550) - DAT_006a65a8)));
      w32(DAT_fffffed4, local_e8, (s32(DAT_fffffed4, local_e8) + (DAT_006a65fc * 2 + DAT_006a6554)));
      w32(DAT_fffffe8c, local_e8, (s32(DAT_fffffe8c, local_e8) + (DAT_006a65c8 + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58]) * -2)));
      w32(DAT_fffffef4, local_e8, (s32(DAT_fffffef4, local_e8) + ((DAT_006a65cc + DAT_006a65d0) + DAT_006a65c8)));
      w32(DAT_fffffeac, local_e8, (s32(DAT_fffffeac, local_e8) + DAT_006a65cc));
      if ((DAT_006a65f8 < 2)) {
        wv(DAT_006a65f8, 1);
      }
      local_134 = (((DAT_006a65cc / DAT_006a65f8 | 0) + -20) + ((s8(_MEM[DAT_0064f349 + local_1a4 * 0x58]) * DAT_006a65c4 + ((s8(_MEM[DAT_0064f349 + local_1a4 * 0x58]) * DAT_006a65c4 >> 0x1f) & 3)) >> 2))
      ;
      if ((0 < local_134)) {
        w32(DAT_fffffe10, local_e8, (s32(DAT_fffffe10, local_e8) + local_134));
      }
      iVar2 = FUN_0043d20a(local_1a4, 3);
      if ((iVar2 !== 0)) {
        w32(DAT_ffffffb4, local_e8, (s32(DAT_ffffffb4, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      }
      iVar2 = FUN_0043d20a(local_1a4, 9);
      if ((iVar2 !== 0)) {
        w32(DAT_ffffffb4, local_e8, (s32(DAT_ffffffb4, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      }
      iVar2 = FUN_0043d20a(local_1a4, 0x17);
      if ((iVar2 !== 0)) {
        w32(DAT_ffffffb4, local_e8, (s32(DAT_ffffffb4, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      }
      iVar2 = FUN_0043d20a(local_1a4, 6);
      if ((iVar2 !== 0)) {
        w32(DAT_ffffffd8, local_e8, (s32(DAT_ffffffd8, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      }
      iVar2 = FUN_0043d20a(local_1a4, 0xc);
      if ((iVar2 !== 0)) {
        w32(DAT_ffffffd8, local_e8, (s32(DAT_ffffffd8, local_e8) + s8(_MEM[DAT_0064f349 + local_1a4 * 0x58])));
      }
    }
  }
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_1a8 = (DAT_0063ec38 + 2);
  local_1b0 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_70 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  if ((DAT_00628064 === 0)) {
    uVar3 = FUN_00410070(iVar1);
    FUN_0040bbe0(uVar3);
    FUN_0040fe10();
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x558), 0));
  FUN_0040bbe0(uVar3);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_1a8, DAT_0063ec3c);
  iVar2 = ((local_1a8 + local_70) + 0xa);
  local_70 = 0x19;
  wv(DAT_0063ef80, 0x19);
  _DAT_0063ef7c = (local_1b0 - iVar2);
  local_ec = 0x25;
  local_178 = (DAT_0063ec34 + 2);
  local_17c = (DAT_0063ec34 + 0xb4);
  local_1a0 = (DAT_0063ec34 + 0x142);
  local_1ac = ((DAT_0063ec3c + local_178) + -4);
  local_2c = (DAT_0063ec34 + 2);
  local_8 = ((DAT_0063ec3c + DAT_0063ec34) + -2);
  _DAT_0063ef78 = iVar2;
  local_1a8 = iVar2;
  FUN_005baee0(0x25, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5d4), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    iVar4 = s32(DAT_ffffff94, local_e8);
    if ((iVar4 < 2)) {
      iVar4 = 1;
    }
    w32(DAT_ffffff1c, local_e8, (s32(DAT_fffffe64, local_e8) * 0x32 / iVar4 | 0));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_00626048, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5d8), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    iVar4 = FUN_0043cce5(local_e8);
    w32(DAT_ffffff1c, local_e8, iVar4);
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043ca50(local_e8, -1);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_0062604c, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5dc), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, s32(DAT_fffffed4, local_e8));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe10();
      FUN_0040bc10(0x188);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_00626054);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_00626058, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5e0), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, s32(DAT_fffffeac, local_e8));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe10();
      FUN_0040bc10(0x182);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004aef20(DAT_ffffff40);
  FUN_004af14b(DAT_ffffff40, 0x182);
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_ffffff40, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5e4), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, s32(DAT_fffffe30, local_e8));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040bbe0(s_,000_0062605c);
      FUN_0040bc10(0x183);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_00626064, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5e8), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, ((s32(DAT_ffffff94, local_e8) * 2 + s32(DAT_ffffffd8, local_e8)) * 2 / s32(DAT_ffffff94, local_e8) | 0));
    iVar4 = FUN_004bd9f0(local_e8, 1);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) << 1));
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x58);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) << 1));
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x2b);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) << 1));
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x55);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) << 1));
    }
    iVar4 = FUN_005adfa0(s32(DAT_ffffff1c, local_e8), 0, 0x64);
    w32(DAT_ffffff1c, local_e8, iVar4);
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_0062606c, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5ec), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff94, local_e8) * 0x32 / (s32(DAT_ffffffb4, local_e8) + s32(DAT_ffffff94, local_e8)) | 0));
    iVar4 = FUN_004bd9f0(local_e8, 0x32);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) / 2 | 0));
    }
    iVar4 = FUN_00453e51(local_e8, 0x1b);
    if ((iVar4 !== 0)) {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) / 2 | 0));
    }
    w32(DAT_ffffffb4, local_e8, (0x708 / (s32(DAT_ffffff1c, local_e8) + 0x14) | 0));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, (-iVar2), DAT_00626070, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5f0), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, s32(DAT_fffffe10, local_e8));
    w32(DAT_ffffffb4, local_e8, (s32(DAT_ffffffb4, local_e8) - (s32(DAT_fffffe10, local_e8) * 0xa / s32(DAT_ffffff94, local_e8) | 0)));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040bbe0(DAT_00626074);
      FUN_0040bc10(0x184);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004aef20(DAT_ffffff40);
  FUN_0043c840(DAT_ffffff40, DAT_00626078);
  FUN_004af14b(DAT_ffffff40, 0x184);
  FUN_004331d1(DAT_ffffff1c, iVar1, (-iVar2), DAT_ffffff40, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5f4), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    iVar4 = FUN_005adfa0(s32(DAT_ffffffb4, local_e8), 0x14, 0x63);
    w32(DAT_ffffff1c, local_e8, iVar4);
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe10();
      FUN_0040bc10(0x185);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004aef20(DAT_ffffff40);
  FUN_004af14b(DAT_ffffff40, 0x186);
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_ffffff40, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5f8), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, ((s32(DAT_fffffe8c, local_e8) * 0x28 / s32(DAT_ffffff94, local_e8) | 0) + 0x14));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870((s32(DAT_ffffff1c, local_e8) / 0xa | 0));
      FUN_0040bbe0(DAT_0062607c);
      FUN_0043c870((s32(DAT_ffffff1c, local_e8) % 0xa));
      FUN_0040fe10();
      FUN_0040bc10(0x187);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
    w32(DAT_ffffff1c, local_e8, (s32(DAT_ffffff1c, local_e8) / 0xa | 0));
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_00626080, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5fc), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, (((s16((DAT_0064c706 + local_e8 * 0x594), 0)) << 16 >> 16) * 0xa / s32(DAT_ffffff94, local_e8) | 0));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040fe10();
      FUN_0040bc10(0x185);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_ffffff40, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x600), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    if ((s32(DAT_fffffed4, local_e8) < (0x7530 / (u8(_MEM[DAT_0064c6b0 + local_e8 * 0x594]) + 1) | 0))) {
      w32(DAT_ffffff1c, local_e8, (u8(_MEM[DAT_0064c6b0 + local_e8 * 0x594]) * s32(DAT_fffffed4, local_e8) / s32(DAT_ffffff94, local_e8) | 0));
    }
    else {
      w32(DAT_ffffff1c, local_e8, (s32(DAT_fffffed4, local_e8) / s32(DAT_ffffff94, local_e8) | 0) * u8(_MEM[DAT_0064c6b0 + local_e8 * 0x594]));
    }
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0040bbe0(DAT_00626084);
      FUN_0040bc10(0x189);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_00626088, local_1a0, local_1ac);
  FUN_005a97cc(DAT_0063eb10, local_2c, local_8, ((iVar2 + local_70) + -2), 0x63);
  iVar2 = (iVar2 + local_70);
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x604), 0), local_178, iVar2);
  FUN_0043c8d0(uVar3);
  for (/* cond: (local_e8 < 8) */); local_e8 = local_e8; local_e8 = (local_e8 + 1)) {
    w32(DAT_ffffff1c, local_e8, (s32(DAT_fffffef4, local_e8) * 0xa / s32(DAT_ffffff94, local_e8) | 0));
    if ((local_e8 === iVar1)) {
      FUN_0040bbb0();
      FUN_0043c870(s32(DAT_ffffff1c, local_e8));
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(DAT_ffffff1c, iVar1, iVar2, DAT_0062608c, local_1a0, local_1ac);
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00434d8a (param_1)

 {
  FUN_0042a7bc(9, 9, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00434e39 ()

 {
  let extraout_EAX;
  let uVar1;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let iVar2;
  let local_90;
  let local_80;
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
  let local_10;
  let local_c;
  let local_8;

  local_70 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_5c = (DAT_0063ec38 + 2);
  local_64 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_10 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x55c), 0));
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  local_5c = (local_5c + local_10);
  FUN_005baec8(DAT_0063eab8);
  wv(DAT_0063eab8, DAT_0063eab8);
  local_10 = extraout_EAX_00;
  FUN_0040bbb0();
  uVar1 = FUN_00493ba6(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  uVar1 = FUN_00493b10(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar1 = FUN_00493c7d(local_70);
  FUN_0040bbe0(uVar1);
  FUN_00421d30();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  _DAT_0063ef78 = ((local_5c + local_10) + 4);
  wv(DAT_0063ef80, local_10);
  _DAT_0063ef7c = (local_64 - ((local_5c + local_10) + 4));
  local_60 = (DAT_0063ec34 + 2);
  local_6c = ((local_5c + local_10) + 4);
  if (((DAT_00655af0 & 0x20) === 0)) {
    if (((DAT_0064bc60 & 2) === 0)) {
      local_5c = ((local_5c + local_10) + 4);
      local_c = FUN_00448f92(local_70);
      local_38 = local_6c;
      local_34 = local_60;
      local_44 = 0;
      local_20 = 0;
      local_50 = 0;
      local_18 = 0x12;
      local_8 = 0x14;
      local_14 = 0;
      for (/* cond: (local_54 < ((DAT_00655b18) << 16 >> 16)) */); local_54 = (local_54 < ((DAT_00655b18) << 16 >> 16)); local_54 = (local_54 + 1)) {
        if ((s8(_MEM[DAT_0064f348 + local_54 * 0x58]) === local_70)) {
          FUN_004eb4ed(local_54, 1);
          local_4c = DAT_006a6550;
          local_2c = DAT_006a65a8;
          local_68 = ((((s8(_MEM[DAT_0064f349 + local_54 * 0x58]) - DAT_006a6550) - DAT_006a65a8) - DAT_006a6604) - DAT_006a659c);
          for (/* cond: (local_30 < s8(_MEM[DAT_0064f349 + local_54 * 0x58])) */); local_30 = (local_30 < s8(_MEM[DAT_0064f349 + local_54 * 0x58]));
              local_30 = (local_30 + 1)) {
            if ((local_30 < local_4c)) {
              local_58 = (local_44 & 1);
            }
            else if (((local_30 - local_4c) < local_68)) {
              local_58 = ((local_44 & 1) + 2);
            }
            else if ((((local_30 - local_4c) - local_68) < local_2c)) {
              local_58 = ((local_44 & 1) + 4);
            }
            else if (((((local_30 - local_4c) - local_68) - local_2c) < DAT_006a659c)) {
              local_58 = ((local_44 & 1) + 6);
            }
            else {
              iVar2 = FUN_004e75a6(local_54, ((((local_30 - local_4c) - local_68) - local_2c) - DAT_006a659c));
              local_58 = (iVar2 + 7);
            }
            local_44 = (local_44 + 1);
            FUN_005cef31(DAT_ffffff80, DAT_0063eb10, local_34, local_38);
            local_14 = 0;
            local_34 = (local_34 + local_8);
            local_50 = (local_50 + 1);
            if ((((DAT_0063ec3c + DAT_0063ec34) + -29) < local_34)) {
              local_50 = 0;
              local_20 = (local_20 + 1);
              local_14 = 1;
              local_34 = ((local_8 / 2 | 0) * (local_20 & 1) + local_60);
              local_38 = (local_38 + local_18);
              if ((0xf0 < local_38)) {
        local_38 = (local_38 - local_18);
      }
      local_6c = (local_38 + 0x22);
      FUN_004a28b0(local_70);
      FUN_0040bbb0();
      if ((DAT_00628064 !== 1)) {
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
      }
      FUN_0040bc10(0x193);
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30(DAT_00673f78);
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = ((local_6c + local_10) + 4);
      local_34 = local_60;
      local_50 = 0;
      local_14 = 0;
      local_38 = local_6c;
      for (/* cond: (local_28 < 0x1c) */); local_28 = (local_28 < 0x1c); local_28 = (local_28 + 1)) {
        if ((s8(_MEM[DAT_0064f348 + local_54 * 0x58]) === local_70)) {
          FUN_005cef31(DAT_ffffff70, DAT_0063eb10, local_34, local_38);
          local_40 = (local_34 + 0x26);
          FUN_005baee0(0x5e, 0x12, -1, -1);
          uVar1 = FUN_00428b0c(s32(DAT_0064c5c0, local_28 * 2), local_40, (local_38 + 3));
          FUN_0043c8d0(uVar1);
          local_14 = 0;
          local_50 = (local_50 + 1);
          local_34 = (local_34 + 0xc4);
          if ((2 < local_50)) {
            local_50 = 0;
            local_34 = local_60;
            local_38 = (local_38 + 0x16);
            local_14 = 1;
            if ((0x122 < local_38)) {
        local_38 = (local_38 + 0x16);
      }
      local_6c = (local_38 + 4);
      FUN_005baee0(0x25, 0x12, -1, -1);
      FUN_0040bbb0();
      if ((DAT_00628064 !== 1)) {
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
      }
      FUN_0040bc10(0x194);
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30(DAT_00673f5c);
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = (local_6c + local_10);
      if ((DAT_00673f84 !== 0)) {
        FUN_0040bbb0();
        FUN_0040bc10(0x195);
        FUN_0040fe40();
        FUN_0040fea0();
        if ((DAT_00673f60 === 0)) {
          FUN_0040ff30(DAT_00673f84);
          FUN_0040fe10();
          FUN_0040bc10(0x199);
        }
        else {
          FUN_0040ff30(DAT_00673f60);
        }
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, local_60, local_6c);
        local_6c = (local_6c + local_10);
      }
      local_14 = 0;
      FUN_0040bbb0();
      if ((DAT_00673f58 !== 0)) {
        FUN_0040bc10(0x17c);
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040ff30(DAT_00673f58);
        FUN_0040fed0();
        FUN_0040bbe0(DAT_00626090);
        local_14 = 1;
      }
      if ((DAT_00673f8c !== 0)) {
        FUN_0040bc10(0x196);
        FUN_0040fe40();
        FUN_0040fea0();
        FUN_0040bbe0(DAT_00626098);
        FUN_0040ff30(DAT_00673f8c);
        FUN_0040fed0();
        FUN_0040bbe0(DAT_0062609c);
        local_14 = 1;
      }
      if ((DAT_00673f6c !== 0)) {
        FUN_0040ff00(DAT_00627c14);
        FUN_0040fe40();
        FUN_0040fea0();
        FUN_0040bbe0(DAT_006260a4);
        FUN_0040ff30(DAT_00673f6c);
        FUN_0040fed0();
        FUN_0040bbe0(s__006260a8);
        local_14 = 1;
      }
      FUN_0040bc10(0xf);
      FUN_0040fe40();
      FUN_0040fea0();
      if ((-1 < DAT_00673f74)) {
        FUN_0040bbe0(DAT_006260b0);
      }
      FUN_0040ff30(DAT_00673f74);
      FUN_0040fed0();
      local_14 = 1;
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = (local_6c + local_10);
    }
    else {
      local_6c = ((local_5c + local_10) + 0x2a);
      local_5c = ((local_5c + local_10) + 4);
      FUN_004a28b0(local_70);
      FUN_0040bbb0();
      FUN_0040bc10(0x1b1);
      FUN_0040fe40();
      FUN_0040ff30(DAT_00673f70);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
      local_6c = (local_6c + local_10);
      if ((DAT_0064bcba !== 0)) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(((DAT_0064bcba) << 16 >> 16));
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040bc10(0x1b2);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f64);
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = (local_6c + local_10);
      }
      if ((((DAT_0064bcba) << 16 >> 16) !== local_70)) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040bc10(0x1b2);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f80);
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = (local_6c + local_10);
      }
      if ((DAT_0064bcba === 0)) {
        local_24 = local_70;
      }
      else {
        local_24 = ((DAT_0064bcba) << 16 >> 16);
      }
      local_6c = (local_6c + 6);
      FUN_005baee0(0x5e, 0x12, 1, 1);
      for (/* cond: (local_3c < 4) */); local_3c = (local_3c < 4); local_3c = (local_3c + 1)) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(local_24);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        if ((local_3c === 0)) {
          FUN_0040bc10(0x1b3);
        }
        else if ((local_3c === 1)) {
          FUN_0040bc10(0x1b4);
        }
        else if ((local_3c === 2)) {
          FUN_0040bc10(0x1b6);
        }
        else if ((local_3c === 3)) {
          FUN_0040bc10(0x1b7);
        }
        FUN_0040fe40();
        FUN_0040ff30(((s16(DAT_0064bcbc, local_3c)) << 16 >> 16));
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = (local_6c + local_10);
      }
      local_6c = (local_6c + 6);
      FUN_005baee0(0x7a, 0x12, 1, 1);
      FUN_005baec8(DAT_0063eac0);
      wv(DAT_0063eac0, DAT_0063eac0);
      local_10 = extraout_EAX_01;
      FUN_0040bbb0();
      uVar1 = FUN_00410070(local_24);
      FUN_0040bbe0(uVar1);
      FUN_0040fe10();
      FUN_0040bc10((DAT_00673f54 + 0x1b3));
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
      local_6c = ((local_6c + local_10) + 6);
    }
    local_1c = 0;
    local_48 = 0;
    if (((DAT_0064bc60 & 2) !== 0)) {
      wv(DAT_00673f7c, -1);
      wv(DAT_00673f88, DAT_00673f68);
      local_1c = 1;
    }
    while ((local_1c !== 1)) {
      FUN_005baec8(DAT_0063eac0);
      FUN_0040bbb0();
      if ((DAT_00673f88 < DAT_00673f7c)) {
        FUN_0040bc10(0x198);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f7c);
      }
      else {
        FUN_0040bc10(0x197);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f88);
      }
      if ((local_1c === 1)) {
        iVar2 = FUN_0040efd0(DAT_00679640);
        local_48 = (local_48 + iVar2);
      }
      else {
        FUN_005baee0(0x25, 0x12, 1, 1);
        local_34 = FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      }
      if (((DAT_00655af0 & 0x80) !== 0)) {
        local_34 = (local_34 + 0x19);
        FUN_005baee0(0x7a, 0x12, -1, -1);
        FUN_0040bbb0();
        FUN_0040bc10(0x1a2);
        if ((local_1c === 1)) {
          iVar2 = FUN_0040efd0(DAT_00679640);
          local_48 = ((local_48 + iVar2) + 0x19);
        }
        else {
          local_34 = FUN_0043c8d0(DAT_00679640, local_34, local_6c);
        }
      }
      local_34 = (local_34 + 0x19);
      if (((DAT_00655af0 & 0x10) !== 0)) {
        FUN_005baee0(0x6a, 0x12, -1, -1);
        FUN_0040bbb0();
        FUN_0040bc10(0x19a);
        if ((local_1c === 1)) {
          iVar2 = FUN_0040efd0(DAT_00679640);
          local_48 = ((local_48 + iVar2) + 0x19);
        }
        else {
          FUN_0043c8d0(DAT_00679640, local_34, local_6c);
        }
      }
      if ((local_1c !== 1));
      local_1c = 2;
    }
  }
  else {
    local_5c = ((local_5c + local_10) + 4);
    FUN_0040bbb0();
    FUN_0040bc10(0x1c9);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  }
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00435d15 (param_1)

 {
  FUN_0042a7bc(0xa, 0xa, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00435dc4 ()

 {
  let iVar1;
  let iVar2;
  let extraout_EAX;
  let iVar3;
  let uVar4;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let local_80;
  let local_74;
  let local_68;
  let local_64;
  let local_60;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar2 = (DAT_0063ec38 + 1);
  local_80 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_10 = (extraout_EAX + -3);
  local_68 = (u8(DAT_00655b08) + 4);
  if ((2 < DAT_00655b08)) {
    local_68 = (u8(DAT_00655b08) + 5);
  }
  if ((3 < DAT_00655b08)) {
    local_68 = (local_68 + 1);
  }
  if ((4 < DAT_00655b08)) {
    local_68 = (local_68 + 2);
  }
  local_8 = DAT_00673f88;
  if ((DAT_00673f88 <= DAT_00673f7c)) {
    local_8 = DAT_00673f7c;
  }
  iVar3 = (local_68 * local_8 / 0x64 | 0);
  local_74 = 0;
  for (/* cond: (local_64 < 0x19) */); local_64 = (local_64 < 0x19); local_64 = (local_64 + 1)) {
    if (((local_64 * local_64 / 3 | 0) <= iVar3)) {
      local_74 = (local_64 + -1);
    }
  }
  if ((0x17 < local_74)) {
    local_74 = 0x17;
  }
  wv(DAT_0063e4ec, local_74);
  wv(DAT_0063ea18, iVar3);
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x670), 0));
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  FUN_0040ff30(iVar3);
  FUN_0040bbe0(DAT_006260b4);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  iVar2 = (iVar2 + local_10);
  FUN_0040bbb0();
  FUN_0040bc10(0x19d);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  iVar2 = (iVar2 + local_10);
  FUN_0040bbb0();
  FUN_0040bc10(0x19e);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  _DAT_0063ef78 = ((iVar2 + local_10) + 4);
  wv(DAT_0063ef80, local_10);
  _DAT_0063ef7c = (local_80 - ((iVar2 + local_10) + 4));
  if ((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] === 0)) {
    FUN_005f22d0(DAT_ffffffa0, s_MALEFAME_006260c4);
  }
  else {
    FUN_005f22d0(DAT_ffffffa0, s_FEMALEFAME_006260b8);
  }
  local_c = FUN_004a2379(DAT_006558e8, DAT_ffffffa0);
  uVar4 = FUN_00493b10(iVar1);
  FUN_0040ff60(0, uVar4);
  for (/* cond: (local_64 <= local_74) */); local_64 = (local_64 <= local_74); local_64 = (local_64 + 1)) {
    if ((local_c === 0)) {
      FUN_004a23fc(1);
      FUN_005f22d0(DAT_ffffffa0, DAT_00679640);
    }
    else if ((local_74 === local_64)) {
      FUN_005f22d0(DAT_ffffffa0, s_%STRING0_006260d0);
    }
    else {
      FUN_005f22d0(DAT_ffffffa0, s_Error_006260dc);
    }
    FUN_00426ff0(DAT_ffffffa0, DAT_00679640);
    if ((local_64 < local_74)) {
      FUN_005baec8(DAT_0063e4e0);
      FUN_005baee0(0x1d, 0x12, -1, -1);
      wv(DAT_0063e4e0, DAT_0063e4e0);
      local_10 = (extraout_EAX_00 + -3);
    }
    else {
      FUN_005baec8(DAT_0063eac0);
      wv(DAT_0063eac0, DAT_0063eac0);
      local_10 = (extraout_EAX_01 + -4);
      FUN_005baee0(0x25, 0x12, -1, -1);
    }
    local_80 = (local_80 - local_10);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_80, DAT_0063ec3c);
  }
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004361cc (param_1)

 {
  FUN_0042a7bc(0xa, 0xa, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_0046e571(3, 0);
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return;
}


 export function FUN_00436287 (param_1)

 {
  if ((param_1 === 0xc)) {
    if ((DAT_0063e948 === 0xc)) {
      FUN_005bb574();
    }
  }
  else if ((DAT_0063ef60 === param_1)) {
    FUN_005bb574();
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004362e2 ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let extraout_EAX;
  let uVar4;
  let extraout_EAX_00;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;
  let local_fc;
  let local_ec;
  let local_e4;
  let local_e0;
  let local_90;
  let local_8c;
  let local_88;

  iVar1 = DAT_0063efac;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar2 = (DAT_0063ec38 + 1);
  iVar3 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_90 = (extraout_EAX + -2);
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x6e8), 0));
  FUN_0040bbe0(uVar4);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  iVar2 = (iVar2 + local_90);
  FUN_005baec8(DAT_0063f030);
  wv(DAT_0063f030, DAT_0063f030);
  wv(DAT_0063ef80, (extraout_EAX_00 + -3));
  _DAT_0063ef78 = (iVar2 + 6);
  _DAT_0063ef7c = (iVar3 - (iVar2 + 6));
  local_fc = (iVar2 + 6);
  local_90 = (extraout_EAX_00 + -3);
  for (/* cond: (local_ec < 6) */); local_ec = (local_ec < 6); local_ec = (local_ec + 1)) {
    if ((0xffff < s16((DAT_0063f0c8 + local_ec * 0x48), 0))) {
      if ((s16((DAT_0063f0dc + local_ec * 0x48), 0) === 0)) {
        FUN_005f22d0(DAT_ffffff20, s_MALEFAME_006260f0);
      }
      else {
        FUN_005f22d0(DAT_ffffff20, s_FEMALEFAME_006260e4);
      }
      local_8c = FUN_004a2379(DAT_006558e8, DAT_ffffff20);
      FUN_0040ff60(0, (local_ec * 0x48 + 0x63f0e0));
      for (/* cond: (local_e4 <= ((s16((DAT_0063f0de + local_ec * 0x48), 0)) << 16 >> 16)) */); local_e4 = (local_e4 <= ((s16((DAT_0063f0de + local_ec * 0x48), 0)) << 16 >> 16));
          local_e4 = (local_e4 + 1)) {
        if ((local_8c === 0)) {
          FUN_004a23fc(1);
          FUN_005f22d0(DAT_ffffff20, DAT_00679640);
        }
        else if ((((s16((DAT_0063f0de + local_ec * 0x48), 0)) << 16 >> 16) === local_e4)) {
          FUN_005f22d0(DAT_ffffff20, s_%STRING0_006260fc);
        }
        else {
          FUN_005f22d0(DAT_ffffff20, s_Error_00626108);
        }
        FUN_00426ff0(DAT_ffffff20, DAT_ffffff78);
      }
      FUN_0040bbb0();
      FUN_0040ff30((local_ec + 1));
      FUN_0040bbe0(DAT_00626110);
      FUN_0040bbe0(DAT_ffffff78);
      FUN_0040fe10();
      FUN_0040bc10(0x8c);
      FUN_0040fe10();
      FUN_0040bbe0((local_ec * 0x48 + 0x63f0f8));
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040bc10(0x1bb);
      FUN_0040fe10();
      if ((0xffff < s16((DAT_0063f0d4 + local_ec * 0x48), 0))) {
        local_118 = ((s16((DAT_0063f0ce + local_ec * 0x48), 0)) << 16 >> 16);
        if ((local_118 < 0)) {
          if ((local_118 < 1)) {
            local_118 = ((~local_118) + 1);
          }
          FUN_0040ff30(local_118);
          FUN_0040fe10();
          FUN_0040bc10(0);
        }
        else if ((DAT_00628064 === 0)) {
          FUN_0040bc10(1);
          FUN_0040fe10();
          local_110 = local_118;
          if ((local_118 < 1)) {
            local_110 = ((~local_118) + 1);
          }
          FUN_0040ff30(local_110);
        }
        else {
          local_114 = local_118;
          if ((local_118 < 1)) {
            local_114 = ((~local_118) + 1);
          }
          FUN_0040ff30(local_114);
          FUN_0040fe10();
          FUN_0040bc10(1);
        }
      }
      else {
        if ((s16((DAT_0063f0d4 + local_ec * 0x48), 0) < 1)) {
          local_104 = ((~((s16((DAT_0063f0d4 + local_ec * 0x48), 0)) << 16 >> 16)) + 1);
        }
        else {
          local_104 = ((s16((DAT_0063f0d4 + local_ec * 0x48), 0)) << 16 >> 16);
        }
        local_10c = ((((s16((DAT_0063f0cc + local_ec * 0x48), 0)) << 16 >> 16) * local_104 + ((s16((DAT_0063f0d6 + local_ec * 0x48), 0)) << 16 >> 16)) + -1);
        if (((local_10c % 0xc) < 1)) {
          local_108 = ((~(local_10c % 0xc)) + 1);
        }
        else {
          local_108 = (local_10c % 0xc);
        }
        FUN_0040bc10((local_108 + 0x1a4));
        FUN_0040fe10();
        if (((local_10c / 0xc | 0) < 1)) {
          local_10c = ((~(local_10c / 0xc | 0)) + 1);
        }
        else {
          local_10c = (local_10c / 0xc | 0);
        }
        FUN_0040ff30(local_10c);
      }
      FUN_0040fed0();
      if ((iVar1 === local_ec)) {
        FUN_005baee0(0x7a, 0x12, -1, -1);
      }
      else {
        FUN_005baee0(0xaf, 0x12, -1, -1);
      }
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_fc, DAT_0063ec3c);
      local_fc = (local_fc + local_90);
      FUN_0040bbb0();
      if ((s16((DAT_0063f0d2 + local_ec * 0x48), 0) < 0)) {
        FUN_0040bc10(0x22);
        FUN_0040fe40();
        FUN_0043cda6(DAT_00679640, 0, ((s16((DAT_0063f0d0 + local_ec * 0x48), 0)) << 16 >> 16));
      }
      else {
        FUN_0040bc10(0x1b2);
        FUN_0040fe40();
        FUN_0040ff30(((s16((DAT_0063f0d2 + local_ec * 0x48), 0)) << 16 >> 16));
      }
      FUN_0040fe10();
      FUN_0040fe10();
      FUN_0040bc10(0x1bc);
      FUN_0040fe40();
      FUN_0040ff30(((s16((DAT_0063f0c8 + local_ec * 0x48), 0)) << 16 >> 16));
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff00(s32((DAT_0064ba10 + (((s16((DAT_0063f0ca + local_ec * 0x48), 0)) << 16 >> 16) & 0xf) * 4), 0));
      if ((s16((DAT_0063f0d8 + local_ec * 0x48), 0) !== 0)) {
        FUN_0040fe40();
        FUN_0040bc10(0x1a2);
      }
      if (((s16((DAT_0063f0ca + local_ec * 0x48), 0) & 0x80) !== 0)) {
        FUN_0040fe40();
        FUN_0040bc10(0x19a);
      }
      FUN_0040fed0();
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_fc, DAT_0063ec3c);
      local_fc = (local_fc + local_90);
      FUN_0040bbb0();
      FUN_0040bbe0(DAT_00626114);
      FUN_0040bc10(0x1bd);
      FUN_0040fe40();
      FUN_0040ff30(((s16((DAT_0063f0da + local_ec * 0x48), 0)) << 16 >> 16));
      FUN_0040bbe0(DAT_00626118);
      FUN_005baee0(0x25, 0x12, -1, -1);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_fc, DAT_0063ec3c);
      local_fc = ((local_fc + local_90) + 6);
    }
  }
  FUN_00408460();
  return;
}


 export function FUN_00436b92 ()

 {
  wv(DAT_0063ef6c, 1);
  wv(DAT_0063eb58, DAT_0063eb58);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00436c7e)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00436d09)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00436bb7 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  FUN_00436e28();
  FUN_0042a7bc(8, 8, 1, 0x258, 0x190, 0, 0);
  wv(DAT_0063efac, param_1);
  wv(DAT_0063ef6c, 0);
  if ((param_1 < 0)) {
    FUN_0042acb0();
  }
  else {
    FUN_004086c0(DAT_ffffffec, 2, 0, 0x129, 0x18);
    iVar1 = DAT_0063ec38;
    iVar2 = FUN_00407fc0(DAT_ffffffec);
    FUN_0043c790(DAT_ffffffec, DAT_0063ec34, ((iVar1 - iVar2) + 0x18e));
    FUN_0043c790(DAT_ffffffec, 0x12b, 0);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
    FUN_0040f680(DAT_0063eb58, 0x64, DAT_ffffffec, uVar3);
    FUN_0040f880(LAB_00401235);
    FUN_0040f7d0();
    FUN_0040f840();
    FUN_0043c790(DAT_ffffffec, -0x12b, 0);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x6f8), 0));
    FUN_0040f680(DAT_0063eb58, 0x65, DAT_ffffffec, uVar3);
    FUN_0040f880(LAB_00402c61);
  }
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  wv(DAT_0063eb58, DAT_0063eb58);
  FUN_0042a768();
  return DAT_0063ef6c;
}


 export function FUN_00436dd7 ()

 {
  let local_8;

  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    w16((DAT_0063f0c8 + local_8 * 0x48), 0, 0xffff);
    w16((DAT_0063f0da + local_8 * 0x48), 0, 0xffff);
  }
  return;
}


 export function FUN_00436e28 ()

 {
  let bVar1;
  let _File;
  let sVar2;
  let local_8;

  FUN_00436dd7();
  _File = _fopen(s_HALLFAME.DAT_00626124, DAT_00626120);
  if ((_File !== 0)) {
    bVar1 = 0;
    for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
      sVar2 = _fread((DAT_0063f0c8 + local_8 * 0x48), 0x48, 1, _File);
      if ((sVar2 === 0)) {
        bVar1 = 1;
        break;
      }
    }
    if (bVar1) {
      FUN_00436dd7();
    }
    _fclose(_File);
  }
  return;
}


 export function FUN_00436ed2 ()

 {
  let _File;
  let sVar1;
  let local_8;

  _File = _fopen(s_HALLFAME.DAT_00626138, DAT_00626134);
  if ((_File !== 0)) {
    local_8 = 0;
    while ((sVar1 !== 0)) {
      local_8 = (local_8 + 1);
    }
    _fclose(_File);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00436f5a (param_1)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  local_c = -1;
  iVar2 = DAT_00673f88;
  if ((DAT_00673f88 <= DAT_00673f7c)) {
    iVar2 = DAT_00673f7c;
  }
  _DAT_0063eac8 = ((iVar2) & 0xFFFF);
  wv(DAT_0063eaca, u8(DAT_00655b08));
  if (((DAT_00655af0 & 0x10) !== 0)) {
    wv(DAT_0063eaca, (u8(DAT_00655b08) | 0x80));
  }
  _DAT_0063eacc = DAT_00655af8;
  _DAT_0063eace = DAT_00655afa;
  _DAT_0063ead0 = FUN_0043cce5(param_1);
  if (((DAT_0064bc60 & 2) === 0)) {
    _DAT_0063ead2 = 0xffff;
  }
  else {
    _DAT_0063ead2 = ((DAT_00673f80) & 0xFFFF);
  }
  _DAT_0063ead4 = DAT_0064bcb4;
  _DAT_0063ead6 = DAT_0064bcb6;
  _DAT_0063ead8 = (DAT_00655af0 & 0x80);
  wv(DAT_0063eada, ((DAT_0063ea18) & 0xFFFF));
  _DAT_0063eadc = u8(_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]);
  _DAT_0063eade = ((DAT_0063e4ec) & 0xFFFF);
  uVar1 = FUN_00493b10(param_1);
  FUN_005f22d0(DAT_0063eae0, uVar1);
  uVar1 = FUN_00493c7d(param_1);
  FUN_005f22d0(DAT_0063eaf8, uVar1);
  FUN_00436e28();
  _DAT_0063f230 = 0xffff;
  _DAT_0063f242 = 0xffff;
  do {
    local_8 = 0;
    while ((s16((DAT_0063f0da + local_8 * 0x48), 0) < DAT_0063eada)) {
      if ((5 < local_8));
    }
    for (/* cond: (local_8 < local_10) */); local_8 = (local_8 < local_10); local_10 = (local_10 + -1)) {
      FID_conflict:_memcpy((DAT_0063f0c8 + local_10 * 0x48), (DAT_0063f0c8 + (local_10 * 8 + -8) * 9), 0x48);
    }
    FID_conflict:_memcpy((DAT_0063f0c8 + local_8 * 0x48), DAT_0063eac8, 0x48);
    local_c = local_8;
 LAB_00437186: :
    FUN_00436ed2();
    iVar2 = FUN_00436bb7(local_c);
    if ((iVar2 === 0)) {
      return;
    }
    FUN_00436dd7();
  } /* goto */ ( true );
}


 export function FUN_004371b3 ()

 {
  FUN_004371c8();
  return;
}


 export function FUN_004371c8 ()

 {
  FUN_00428cb0();
  return;
}


 export function FUN_004371e2 (param_1)

 {
  FUN_00497ea0(DAT_0063f038, 2, param_1);
  wv(DAT_00625ec8, 0);
  return;
}


 export function FUN_0043720f ()

 {
  FUN_004980ec(DAT_0063f038);
  return;
}


 export function FUN_0043722c (param_1)

 {
  let iVar1;
  let sVar2;
  let uVar3;

  sVar2 = _strlen(param_1);
  uVar3 = FUN_00498159(DAT_0063f038, (sVar2 + 1));
  FUN_005f22d0(uVar3, param_1);
  iVar1 = DAT_00625ec8;
  wv(DAT_00625ec8, (DAT_00625ec8 + 1));
  return iVar1;
}


 export function FUN_00437284 (param_1)

 {
  let local_8;

  local_8 = DAT_0063f040;
  for (/* cond: (param_1 !== 0) */); param_1 = (param_1 !== 0); param_1 = (param_1 + -1)) {
    for (/* cond: (_MEM[local_8] !== 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    }
    local_8 = (local_8 + 1);
  }
  return local_8;
}


 export function FUN_004372cd (param_1)

 {
  let iVar1;
  let local_8;

  local_8 = 1;
  /* switch */ () {
  case 0 :
    iVar1 = FUN_004a2379(s_CREDITS_00626150, s_CREDITS_00626148);
    break;
  case 1 :
    iVar1 = FUN_004a2379(s_MPCREDITS_00626160, s_CREDITS_00626158);
    break;
  case 2 :
    iVar1 = FUN_004a2379(s_FCREDITS_00626174, s_CREDITS_0062616c);
    goto joined_r0x00437377;
  case 3 :
    iVar1 = FUN_004a2379(s_SCREDITS_00626188, s_CREDITS_00626180);
 joined_r0x00437377: :
    if ((iVar1 !== 0)) {
      return 1;
    }
    goto LAB_004373c4;
  default :
    goto switchD_004373ad_default;
  }
  if ((iVar1 === 0)) {
 LAB_004373c4: :
    while ((DAT_00679640 !== 0x40)) {
      FUN_0043722c(DAT_00679640);
    }
    local_8 = 0;
  }
 switchD_004373ad_default: :
  return local_8;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0043742f (param_1)

 {
  let uVar1;
  let uVar2;
  let extraout_EAX;
  let unaff_FS_OFFSET;
  let local_94;
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
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004379f8;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((DAT_00625ed0 === 0)) {
    param_1 = 1;
  }
  if ((param_1 === 0)) {
    uVar1 = FUN_00407fc0(DAT_0063eaa8);
    uVar2 = FUN_00407f90(DAT_0063eaa8, uVar1);
    FUN_0042abc1((DAT_0063eaa8 - DAT_0063ec34), (DAT_0063eaac - DAT_0063ec38), uVar2, uVar1);
  }
  else {
    FUN_00552ed2();
    FUN_0042ac18();
  }
  local_54 = DAT_0063ec38;
  local_5c = (DAT_0063ec38 + 0x176);
  wv(DAT_0063ea20, DAT_0063ea20);
  local_28 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063ea20);
  FUN_005baee0(0x25, 0x12, 2, 1);
  wv(DAT_0063ef80, local_28);
  _DAT_0063ef78 = local_54;
  _DAT_0063ef7c = (local_5c - local_54);
  local_58 = (DAT_0063ec34 + 2);
  local_60 = local_54;
  local_64 = DAT_00625ecc;
  local_50 = (DAT_00625ecc / (local_28 / 2 | 0) | 0);
  if ((local_50 < DAT_00625ec8)) {
    local_60 = (local_54 + (DAT_00625ecc % (local_28 / 2 | 0)) * -2);
    for (/* cond: (local_2c < 0x1e) */); local_2c = (local_2c < 0x1e); local_2c = (local_2c + 1)) {
      if ((s32((DAT_0063ea28 + local_2c * 4), 0) < local_50)) {
        local_6c = s32((DAT_0063efb8 + local_2c * 4), 0);
        local_68 = local_6c;
        if ((local_6c !== 0)) {
          FUN_0043cbb0(1);
        }
        w32((DAT_0063efb8 + local_2c * 4), 0, 0);
        w32((DAT_0063ea28 + local_2c * 4), 0, -1);
      }
    }
    local_3c = 2;
    for (/* cond: (local_50 < DAT_00625ec8) */); (local_60 = (local_60 < local_5c) && (local_50 = (local_50 < DAT_00625ec8))); local_50 = (local_50 + 1)) {
      local_38 = FUN_00437284(local_50);
      local_14 = -1;
      local_34 = -1;
      for (/* cond: (local_2c < 0x1e) */); local_2c = (local_2c < 0x1e); local_2c = (local_2c + 1)) {
        if ((s32((DAT_0063ea28 + local_2c * 4), 0) === local_50)) {
          local_14 = local_2c;
          break;
        }
        if ((local_34 < 0)) {
          local_34 = local_2c;
        }
      }
      if ((local_14 < 0)) {
        if ((local_34 < 0)) {
          local_38 = (local_38 + 1);
          FUN_0040bbb0();
          FUN_0040bbe0(local_38);
          local_38 = DAT_00679640;
          FUN_005baee0(0xba, 0x12, -1, -1);
        }
        else {
          FUN_005baee0(0xbe, 0x12, -1, -1);
        }
        local_4c = FUN_0040efd0(local_38);
        local_70 = operator_new(0x48);
        local_8 = 0;
        if ((local_70 === 0)) {
          local_74 = 0;
        }
        else {
          local_74 = FUN_005bd630();
        }
        local_8 = -1;
        local_30 = local_74;
        if ((local_4c !== 0)) {
          FUN_005bd65c(local_4c, local_28);
          FUN_005c0cc5(DAT_006a8c00);
          FUN_005baeb0(local_30);
          FUN_005c041f(0xfa);
          FUN_0043c8d0(local_38, 0, 0);
        }
        local_78 = operator_new(0x3c);
        local_8 = 1;
        if ((local_78 === 0)) {
          local_7c = 0;
        }
        else {
          local_7c = CString(local_78);
        }
        local_8 = -1;
        w32((DAT_0063efb8 + local_34 * 4), 0, local_7c);
        if ((local_4c !== 0)) {
          FUN_005cedad(local_30, 0xfa, 0, 0, local_4c, local_28);
        }
        local_84 = local_30;
        local_80 = local_30;
        if ((local_30 !== 0)) {
          FUN_0040f010(1);
        }
        w32((DAT_0063ea28 + local_34 * 4), 0, local_50);
        w32((DAT_0063f050 + local_34 * 4), 0, (((DAT_0063ec3c >> 1) + DAT_0063ec34) - (local_4c >> 1)));
        w32((DAT_0063e9a0 + local_34 * 4), 0, local_4c);
        local_14 = local_34;
      }
      local_4c = s32((DAT_0063e9a0 + local_14 * 4), 0);
      if ((local_4c !== 0)) {
        FUN_005cef31(DAT_ffffff6c, DAT_0063eb10, s32((DAT_0063f050 + local_14 * 4), 0), local_60);
      }
      if ((local_3c <= local_4c)) {
        local_3c = local_4c;
      }
      local_60 = (local_60 + local_28);
    }
    local_3c = (local_3c + 2);
    local_48 = ((DAT_0063ec3c >> 1) + DAT_0063ec34);
    local_40 = (local_48 - (local_3c >> 1));
    local_44 = (local_3c + local_40);
    FUN_00408680(DAT_ffffffdc, local_40, local_54, local_44, local_5c);
    wv(DAT_0063eaa8, local_24);
    wv(DAT_0063eaac, local_20);
    wv(DAT_0063eab0, local_1c);
    wv(DAT_0063eab4, local_18);
    if ((DAT_0063ec3c <= local_3c)) {
      param_1 = 1;
    }
    wv(DAT_00625ed0, u8((!(DAT_0063ec3c <= local_3c))));
    if ((param_1 === 0)) {
      FUN_00408490(DAT_ffffffdc);
    }
    else {
      FUN_00552112();
      FUN_00408460();
    }
  }
  else {
    wv(DAT_0063eb58, DAT_0063eb58);
  }
 LAB_00437a02: :
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00437a10 ()

 {
  FUN_0043742f(1);
  return;
}


 export function FUN_00437a2a ()

 {
  wv(DAT_00625ecc, (DAT_00625ecc + 1));
  FUN_0043742f(0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00437a4a (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_c = -1;
  FUN_004371e2(0x1000);
  for (/* cond: (local_8 < 0x1e) */); local_8 = (local_8 < 0x1e); local_8 = (local_8 + 1)) {
    w32((DAT_0063efb8 + local_8 * 4), 0, 0);
    w32((DAT_0063ea28 + local_8 * 4), 0, -1);
  }
  iVar1 = FUN_004372cd(param_1);
  if ((iVar1 === 0)) {
    wv(DAT_00625ecc, 0);
    wv(DAT_00625ed0, 0);
    wv(DAT_0063ef6c, 0);
    if ((param_1 === 3)) {
      FUN_0042a7bc(0x2710, 8, 1, 0x258, 0x190, 0, 0);
    }
    else {
      FUN_0042a7bc(-95, 8, 1, 0x258, 0x190, 0, 0);
    }
    FUN_0042acb0();
    wv(DAT_0063eb10, DAT_0063eb10);
    FUN_0046e571(3, 0);
    FUN_005bb574();
    FUN_004085f0();
    FUN_00484d52();
    local_c = FUN_005d1f50(LAB_004010f0, 0x32, -1);
    if ((2 < DAT_00655b02)) {
      wv(DAT_0063eb58, DAT_0063eb58);
    }
    _DAT_00625ec0 = FUN_00421bb0();
    FUN_005c61b0();
    wv(DAT_0063eb58, DAT_0063eb58);
    FUN_0042a768();
  }
  for (/* cond: (local_8 < 0x1e) */); local_8 = (local_8 < 0x1e); local_8 = (local_8 + 1)) {
    if ((-1 < s32((DAT_0063ea28 + local_8 * 4), 0))) {
      if ((s32((DAT_0063efb8 + local_8 * 4), 0) !== 0)) {
        FUN_0043cbb0(1);
      }
      w32((DAT_0063efb8 + local_8 * 4), 0, 0);
      w32((DAT_0063ea28 + local_8 * 4), 0, -1);
    }
  }
  if ((-1 < local_c)) {
    FUN_005d2004(local_c);
  }
  FUN_0043720f();
  return;
}


 export function FUN_00437c6f ()

 {
  wv(DAT_0063eb58, DAT_0063eb58);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00437c8a ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if ((0x4b0 < (iVar1 - DAT_00625ec0))) {
    FUN_00437c6f();
    _DAT_00625ec0 = FUN_00421bb0();
  }
  return;
}


 export function FUN_00437ccd (param_1)

 {
  wv(DAT_0063e958, param_1);
  FUN_00437cea();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004384ab)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00437cea ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let extraout_EAX;
  let uVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let sVar10;
  let local_50;
  let local_38;
  let local_30;
  let local_24;
  let local_18;
  let local_8;

  iVar1 = DAT_0063e954;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar2 = (DAT_0063e620 + 2);
  iVar3 = (DAT_0063e620 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  FUN_005baeb0(DAT_0063e4f8);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x53c), 0));
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0xda0), 0));
  FUN_0040bbe0(uVar4);
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = (iVar2 + extraout_EAX);
  FUN_0040bbb0();
  iVar5 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + iVar1 * 0x594]) - 1), 0, 4);
  FUN_0040bc10((iVar5 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar4 = FUN_00493c7d(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = (iVar2 + extraout_EAX);
  FUN_0040bbb0();
  uVar4 = FUN_00493ba6(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0040fe10();
  uVar4 = FUN_00493b10(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = (iVar2 + extraout_EAX);
  iVar5 = (iVar2 + 2);
  wv(DAT_0063e968, 0x18);
  wv(DAT_0063e960, (iVar2 + 0x1a));
  _DAT_0063e964 = (iVar3 - iVar5);
  wv(DAT_0063e95c, FUN_005adfa0(((iVar3 - iVar5) / 0x18 | 0), 1, 0x63));
  local_24 = 0;
  if ((s32((DAT_006af260 + iVar1 * 4), 0) < s32((DAT_006af280 + iVar1 * 4), 0))) {
    local_24 = (s32((DAT_006af280 + iVar1 * 4), 0) - s32((DAT_006af260 + iVar1 * 4), 0));
  }
  else if ((s32((DAT_006af260 + iVar1 * 4), 0) < s32((DAT_006af280 + iVar1 * 4), 0))) {
    local_24 = 0x12c;
  }
  local_8 = FUN_005adfa0(((iVar3 - iVar5) / 0x18 | 0), 1, 0x63);
  if ((local_24 !== 0)) {
    _DAT_0063e950 = FUN_005adfa0((((FUN_005adfa0(((iVar3 - iVar5) / 0x18 | 0), 1, 0x63) + -1) + local_24) / FUN_005adfa0(((iVar3 - iVar5) / 0x18 | 0), 1, 0x63) | 0), 1, 0x63);
    uVar4 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
    iVar2 = FUN_005adfa0(DAT_0063e958, 0, uVar4);
    local_30 = 1;
    local_38 = ((s32((DAT_006af280 + iVar1 * 4), 0) + -1) - iVar2);
    wv(DAT_0063e958, iVar2);
    local_50 = iVar5;
    if ((local_38 < 0)) {
      local_38 = (local_38 + 0x12c);
    }
    while ((local_38 < s32((DAT_006af280 + iVar1 * 4), 0))) {
      iVar6 = (((local_30 + 1) & 1) * 0x40 + DAT_0063e61c);
      uVar4 = FUN_00472d20(((s16((DAT_006af2a0 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16), iVar1);
      FUN_0056baff(DAT_0063e4f8, uVar4, 0, (iVar6 + 2), local_50, 0, 0);
      FUN_005baec8(DAT_0063eab8);
      FUN_005baee0(0x25, 0x12, 1, 1);
      iVar6 = DAT_0063e61c;
      iVar7 = (local_50 + 0x11);
      iVar8 = (DAT_0063e61c + 0x8c);
      FUN_0040bbb0();
      uVar4 = FUN_00428b0c(s32((DAT_0064b1b8 + ((s16((DAT_006af2a0 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16) * 0x14), 0));
      FUN_0040bbe0(uVar4);
      while ((0x60 < iVar9)) {
        sVar10 = _strlen(DAT_00679640);
        _MEM[DAT_0067963f + sVar10] = 0;
      }
      FUN_0043c8d0(DAT_00679640, iVar8, iVar7);
      FUN_0040bbb0();
      FUN_00421f10(((s16((DAT_006af2a6 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16));
      while ((0x4c < iVar8)) {
        sVar10 = _strlen(DAT_00679640);
        _MEM[DAT_0067963f + sVar10] = 0;
      }
      FUN_0043c8d0(DAT_00679640, (iVar6 + 0xec), iVar7);
      FUN_005baee0(0x5e, 0xa, -1, -1);
      FUN_0040bbb0();
      FUN_0040ff30(((s16((DAT_006af2a2 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16));
      FUN_0040bbe0(DAT_00626194);
      FUN_0040ff30(((s16((DAT_006af2a4 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16));
      iVar8 = FUN_0043d07a(((s16((DAT_006af2a2 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16), ((s16((DAT_006af2a4 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16), -1, -1, -1);
      if ((-1 < iVar8)) {
        FUN_0040bbe0(DAT_00626198);
        FUN_0040bbe0((DAT_0064f360 + iVar8 * 0x58));
        FUN_0040bbe0(DAT_006261a0);
      }
      while ((0xaa < iVar8)) {
        sVar10 = _strlen(DAT_00679640);
        _MEM[DAT_0067963f + sVar10] = 0;
      }
      FUN_0043c8d0(DAT_00679640, (iVar6 + 0x138), iVar7);
      FUN_005baee0(((s16((DAT_006af2a8 + (iVar1 * 0x27d8 + local_38 * 0x22)), 0)) << 16 >> 16), 0x12, -1, -1);
      FUN_0040bbb0();
      FUN_0040bbe0(((local_38 * 0x22 + iVar1 * 0x27d8) + 0x6af2aa));
      while ((((iVar9 + -2) - (iVar6 + 0x1e2)) < iVar8)) {
        sVar10 = _strlen(DAT_00679640);
        _MEM[DAT_0067963f + sVar10] = 0;
      }
      FUN_0043c8d0(DAT_00679640, (iVar6 + 0x1e2), iVar7);
      local_30 = (local_30 + 1);
      local_38 = (local_38 + -1);
      if ((local_38 < 0)) {
        local_38 = 0x12b;
      }
      local_50 = (local_50 + 0x18);
    }
  }
  if ((DAT_0063e990 === 0)) {
    FUN_00408680(DAT_ffffffe8, ((DAT_0063e7bc - None) + -2), iVar5, (DAT_0063e7bc + -2), iVar3);
    FUN_0040fc50(DAT_0063e540, 0xc8, DAT_ffffffe8, 1);
    FUN_0040fd80(LAB_00401398);
    FUN_00414ca0(LAB_0040320b);
  }
  uVar4 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
  FUN_0040fd40(0, uVar4);
  FUN_0040fcf0(DAT_0063e958);
  FUN_005db0d0(DAT_0063e95c);
  if ((DAT_0063e990 === 0)) {
    FUN_0040f380();
    wv(DAT_0063e990, 1);
  }
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00438634)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0043856b (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  if ((DAT_0063e948 < 0)) {
    FUN_0042a7bc(2, 0xc, 0, 0x258, 0x190, 0, 0);
    wv(DAT_0063e954, param_1);
    _DAT_0063e994 = 0;
    FUN_004086c0(DAT_ffffffec, 2, 0, 0x254, 0x18);
    iVar1 = DAT_0063e620;
    iVar2 = FUN_00407fc0(DAT_ffffffec);
    FUN_0043c790(DAT_ffffffec, DAT_0063e61c, ((iVar1 - iVar2) + 0x18e));
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
    FUN_0040f680(DAT_0063e540, 0x64, DAT_ffffffec, uVar3);
    FUN_0040f880(LAB_00401235);
    FUN_0040f7d0();
    FUN_0040f840();
    wv(DAT_0063e4f8, DAT_0063e4f8);
    FUN_005bb574();
    FUN_004085f0();
  }
  else {
    FUN_005bb574();
    FUN_004085f0();
  }
  return;
}


 export function FUN_004386b8 (param_1, param_2)

 {
  let local_c;

  param_2 = (param_2 - (DAT_0063e960 - (DAT_0063e968 / 2 | 0)));
  if ((param_2 < DAT_0063e95c)) {
    local_c = (((s32((DAT_006af280 + DAT_0063e954 * 4), 0) + -1) - DAT_0063e958) - param_2);
    if ((local_c < 0)) {
      local_c = (local_c + 0x12c);
    }
    if ((local_c < s32((DAT_006af280 + DAT_0063e954 * 4), 0))) {
      FUN_00410402(((s16((DAT_006af2a2 + (DAT_0063e954 * 0x27d8 + local_c * 0x22)), 0)) << 16 >> 16), ((s16((DAT_006af2a4 + (DAT_0063e954 * 0x27d8 + local_c * 0x22)), 0)) << 16 >> 16));
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* CDaoFieldInfo::~CDaoFieldInfo(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CDaoFieldInfo (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0043c1ff;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 5;
  FUN_0043c19c();
  local_8 = 4;
  FUN_0043c1ab();
  local_8 = 3;
  FUN_0043c1ba();
  local_8 = 2;
  FUN_0043c1c9();
  local_8 = 1;
  FUN_0043c1d8();
  local_8 = (0 << 8);
  FUN_0043c1e7();
  local_8 = -1;
  FUN_0043c1f6();
  FUN_0043c209();
  return;
}


 export function FUN_0043c19c ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_0043c1ab ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0043c1ba ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0043c1c9 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0043c1d8 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0043c1e7 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0043c1f6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0043c209 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0043c260 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0043c37c;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_005bd630();
  local_8 = 1;
  FUN_0040f3e0();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 5);
  FUN_0040fb00();
  w32(in_ECX, 0, PTR_FUN_0061c05c);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0043c3f0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005db140(param_1);
  w32(in_ECX, 0, uVar1);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* _Timevec::~_Timevec(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~_Timevec (this)

 {
  FUN_005db55b(s32(this, 0));
  return;
}


 export function FUN_0043c460 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005c8200(param_1, param_2, 0);
  w32(in_ECX, 0, uVar1);
  uVar1 = FUN_005c847f(s32(in_ECX, 0));
  w32(in_ECX, 1, uVar1);
  return in_ECX;
}


 export function FUN_0043c4c0 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005c8200(param_1, param_2, param_3);
  w32(in_ECX, 0, uVar1);
  uVar1 = FUN_005c847f(s32(in_ECX, 0));
  w32(in_ECX, 1, uVar1);
  return in_ECX;
}


 export function FUN_0043c520 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005c841d(s32(in_ECX, 0));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* class */  /* CView */  /* * */  /* __thiscall */  /* COleClientItem::GetActiveView(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetActiveView (this)

 {
  return s32((this + 8), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* class */  /* CView */  /* * */  /* __thiscall */  /* COleClientItem::GetActiveView(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetActiveView (this)

 {
  return s32((this + 4), 0);
}


 export function FUN_0043c5c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bca3d(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_0043c5f0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005c8b58(s32((in_ECX + 0x1c), 0));
  }
  return;
}


 export function FUN_0043c630 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bbfee(s32((in_ECX + 8), 0), 0);
  return;
}


 export function FUN_0043c660 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bbfee(s32((in_ECX + 8), 0), 1);
  return;
}


 export function FUN_0043c690 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  return in_ECX;
}


 export function FUN_0043c6c0 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005c841d(s32(in_ECX, 0));
  }
  iVar1 = FUN_005c8200(param_1, param_2, param_3);
  w32(in_ECX, 0, iVar1);
  iVar1 = FUN_005c847f(s32(in_ECX, 0));
  w32(in_ECX, 1, iVar1);
  return;
}


 export function FUN_0043c740 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005c656b();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_0043c790 (param_1, param_2, param_3)

 {
  FUN_006e7da4(param_1, param_2, param_3);
  return;
}


 export function FUN_0043c7c0 (param_1, param_2, param_3)

 {
  FUN_005a98e4(param_1, s32(param_2, 0), s32(param_2, 1), (s32(param_2, 2) + -1), (s32(param_2, 3) + -1), param_3);
  return;
}


 export function FUN_0043c810 ()

 {
  FUN_004aefd8(DAT_00679640);
  return;
}


 export function FUN_0043c840 (param_1, param_2)

 {
  FUN_005f22e0(param_1, param_2);
  return;
}


 export function FUN_0043c870 (param_1)

 {
  FUN_004af284(DAT_00679640, param_1);
  return;
}


 export function FUN_0043c8a0 (param_1)

 {
  FUN_004af2b9(DAT_00679640, param_1);
  return;
}


 export function FUN_0043c8d0 (param_1, param_2, param_3)

 {
  FUN_005baf57(DAT_006366a8, param_1, param_2, param_3);
  return;
}


 export function FUN_0043c910 (param_1, param_2, param_3, param_4)

 {
  FUN_005bb024(DAT_006366a8, param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_0043c950 (param_1, param_2, param_3, param_4)

 {
  FUN_005bb0af(DAT_006366a8, param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_0043c990 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32(((in_ECX + 0x208) + param_2 * 4), 0, param_1);
  return;
}


 export function FUN_0043c9d0 (param_1)

 {
  FUN_0043ca10(DAT_006359d4, param_1);
  return;
}


 export function FUN_0043ca10 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  in_ECX = Create(in_ECX, param_1, param_2, 0);
  return;
}


 export function FUN_0043ca50 (param_1, param_2)

 {
  FUN_0043cda6(DAT_00679640, param_1, param_2);
  return;
}


 export function FUN_0043ca80 (param_1)

 {
  FUN_0043f444(DAT_00679640, param_1);
  return;
}


 export function FUN_0043cab0 (param_1)

 {
  let local_8;

  if ((param_1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = ((s16((DAT_006554fe + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16);
  }
  return s32((DAT_00655358 + local_8 * 0x10), 0);
}


 export function FUN_0043cb30 (param_1)

 {
  let local_8;

  if ((param_1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = ((s16((DAT_006554fe + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16);
  }
  return s32((DAT_00655360 + local_8 * 0x10), 0);
}


 export function FUN_0043cbb0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005cde4d();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_0043cc00 (param_1, param_2)

 {
  if ((-1 < param_2)) {
    _MEM[DAT_0064f34c + param_1 * 0x58] = (_MEM[DAT_0064f34c + param_1 * 0x58] | (((1 << (((param_2) & 0xFF) & 0x1f))) & 0xFF));
    _MEM[DAT_0064f34d + (param_1 * 0x58 + param_2)] = _MEM[DAT_0064f349 + param_1 * 0x58];
  }
  return;
}


 export function FUN_0043cc7e (param_1)

 {
  let local_c;
  let local_8;

  local_c = 0;
  for (/* cond: (local_8 <= s8(_MEM[DAT_0064f349 + param_1 * 0x58])) */); local_8 = (local_8 <= s8(_MEM[DAT_0064f349 + param_1 * 0x58])); local_8 = (local_8 + 1)) {
    local_c = (local_c + local_8);
  }
  if ((local_c < 2)) {
    local_c = 1;
  }
  return local_c;
}


 export function FUN_0043cce5 (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_c * 0x58]) === param_1)) {
      iVar1 = FUN_0043cc7e(local_c);
      local_8 = (local_8 + iVar1);
    }
  }
  if ((0x7d00 < local_8)) {
    local_8 = 0x7d00;
  }
  if ((local_8 < 2)) {
    local_8 = 1;
  }
  return local_8;
}


 export function FUN_0043cda6 (param_1, param_2, param_3)

 {
  let local_8;

  if ((param_3 < 0)) {
    local_8 = FUN_0043cce5(param_2);
  }
  else {
    local_8 = param_3;
  }
  if ((0x63 < local_8)) {
    FUN_004af1d5(param_1, (local_8 / 0x64 | 0));
    FUN_005f22e0(param_1, DAT_00626238);
    local_8 = (local_8 % 0x64);
    if ((local_8 < 0xa)) {
      FUN_005f22e0(param_1, DAT_0062623c);
    }
  }
  FUN_004af1d5(param_1, local_8);
  FUN_005f22e0(param_1, s_0,000_00626240);
  return;
}


 export function FUN_0043ce5a (param_1, param_2)

 {
  let local_8;

  local_8 = FUN_0043cc7e(param_2);
  if ((0x63 < local_8)) {
    FUN_004af1d5(param_1, (local_8 / 0x64 | 0));
    FUN_005f22e0(param_1, DAT_00626248);
    local_8 = (local_8 % 0x64);
    if ((local_8 < 0xa)) {
      FUN_005f22e0(param_1, DAT_0062624c);
    }
  }
  FUN_004af1d5(param_1, local_8);
  FUN_005f22e0(param_1, s_0,000_00626250);
  return;
}


 export function FUN_0043cef9 (param_1)

 {
  let local_c;
  let local_8;

  local_c = u8(((_MEM[DAT_0064f347 + param_1 * 0x58] & 4) !== 0));
  if (((DAT_0064bc60 & 4) !== 0)) {
    for (/* cond: (local_8 < 0x1c) */); local_8 = (local_8 < 0x1c); local_8 = (local_8 + 1)) {
      if ((((s16((DAT_00655be6 + local_8 * 2), 0)) << 16 >> 16) === param_1)) {
        local_c = (local_c + 1);
      }
    }
  }
  return local_c;
}


 export function FUN_0043cf76 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((-1 < iVar1)) {
    for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
      if ((((s16((DAT_0064f342 + local_8 * 0x58), 0)) << 16 >> 16) === param_2)) {
        return local_8;
      }
    }
  }
  return -1;
}


 export function FUN_0043d07a (param_1, param_2, param_3, param_4, param_5)

 {
  let sVar1;
  let sVar2;
  let iVar3;
  let local_18;
  let local_14;
  let local_8;

  local_14 = -1;
  wv(DAT_0063f660, 0x270f);
  if ((local_18 < 0)) {
    param_4 = -1;
  }
  for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
    if ((s32((DAT_0064f394 + local_8 * 0x58), 0) !== 0)) {
      sVar1 = s16((DAT_0064f340 + local_8 * 0x58), 0);
      sVar2 = s16((DAT_0064f342 + local_8 * 0x58), 0);
      if ((iVar3 <= DAT_0063f660)) {
        local_14 = local_8;
        wv(DAT_0063f660, iVar3);
      }
    }
  }
  return local_14;
}


 export function FUN_0043d20a (param_1, param_2)

 {
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  if (((UNNAMED & _MEM[DAT_0064f374 + (param_1 * 0x58 + local_10)]) !== 0)) {
    local_8 = 1;
  }
  return local_8;
}


 export function FUN_0043d289 (param_1, param_2, param_3)

 {
  let local_c;
  let local_8;

  if ((param_2 < 0x23)) {
    FUN_005ae3bf(param_2, DAT_fffffff4, DAT_fffffff8);
    if ((param_3 === 0)) {
      _MEM[DAT_0064f374 + (param_1 * 0x58 + local_c)] = (_MEM[DAT_0064f374 + (param_1 * 0x58 + local_c)] & (~UNNAMED));
    }
    else {
      _MEM[DAT_0064f374 + (param_1 * 0x58 + local_c)] = (_MEM[DAT_0064f374 + (param_1 * 0x58 + local_c)] | UNNAMED);
    }
  }
  return;
}


 export function FUN_0043d348 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  while ((s8(_MEM[DAT_0064f37b + (param_1 * 0x58 + local_8)]) === param_2)) {
    if ((2 < local_8)) {
      return 0;
    }
    if ((s8(_MEM[DAT_0064f37b + (param_1 * 0x58 + local_8)]) === param_2));
  }
  return 1;
}


 export function FUN_0043d3a4 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  while ((s8(_MEM[DAT_0064f37e + (param_1 * 0x58 + local_8)]) === param_2)) {
    if ((2 < local_8)) {
      return 0;
    }
    if ((s8(_MEM[DAT_0064f37e + (param_1 * 0x58 + local_8)]) === param_2));
  }
  return 1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0043d400 (param_1)

 {
  let piVar1;
  let cVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let pbVar6;
  let uVar7;
  let uVar8;
  let iVar9;
  let local_13c;
  let local_138;
  let local_130;
  let local_12c;
  let local_128;
  let local_fc;
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
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  if ((((((DAT_00655af8) << 16 >> 16) + param_1) & 0xf) === 0)) {
    w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) & -0x20001));
    local_90 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
    local_98 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
    iVar4 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
    local_a4 = FUN_005b8a81(local_90, local_98);
    local_b0 = ((s8(_MEM[DAT_0064f349 + param_1 * 0x58]) + 2) / 5 | 0);
    local_8c = u8(_MEM[DAT_0064c6b0 + s8(_MEM[DAT_0064f348 + param_1 * 0x58]) * 0x594]);
    local_14 = (local_98 - (((DAT_006d1162) << 16 >> 16) >> 1));
    local_6c = (local_90 - (((DAT_006d1160) << 16 >> 16) >> 1));
    local_ac = 0;
    local_64 = 0;
    local_94 = 0;
    local_a0 = 0;
    if ((local_14 < 0)) {
      local_a0 = ((~local_14) + 1);
    }
    if ((0 < local_14)) {
      local_94 = local_14;
    }
    if ((0 < local_6c)) {
      local_64 = local_6c;
    }
    if ((local_6c < 0)) {
      local_ac = ((~local_6c) + 1);
    }
    if ((local_14 < 1)) {
      local_14 = ((~local_14) + 1);
    }
    if ((local_6c < 1)) {
      local_6c = ((~local_6c) + 1);
    }
    local_b4 = 0;
    for (/* cond: (local_68 < 0xb) */); local_68 = (local_68 < 0xb); local_68 = (local_68 + 1)) {
      w32(DAT_fffffed8, local_68, 0);
    }
    for (/* cond: (local_68 < 0x10) */); local_68 = (local_68 < 0x10); local_68 = (local_68 + 1)) {
      w32(DAT_0063f540, local_68, 0);
      w32(DAT_0063f668, local_68, s32(DAT_0063f540, local_68));
      w32(DAT_ffffffa4, local_68, local_68);
      w32(DAT_ffffff04, local_68, s32(DAT_ffffffa4, local_68));
    }
    for (/* cond: (local_68 < 0x15) */); local_68 = (local_68 < 0x15); local_68 = (local_68 + 1)) {
      local_70 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_68]) + local_90));
      local_80 = (s8(_MEM[DAT_006283a0 + local_68]) + local_98);
      iVar5 = FUN_004087c0(local_70, local_80);
      if ((iVar5 !== 0)) {
        bVar3 = FUN_005b89bb(local_70, local_80);
        local_78 = u8(bVar3);
        w32(DAT_fffffed8, u8(bVar3), (s32(DAT_fffffed8, u8(bVar3)) + 1));
        iVar5 = FUN_005b8ee1(local_70, local_80);
        if ((iVar5 !== 0)) {
          w32(DAT_fffffed8, local_78, (s32(DAT_fffffed8, local_78) + 3));
        }
        pbVar6 = FUN_005b8931(local_70, local_80);
        if (((_MEM[pbVar6] & 0x80) !== 0)) {
          local_b4 = (local_b4 + 1);
        }
        uVar7 = FUN_005b94d5(local_70, local_80);
        if (((uVar7 & 0x10) !== 0)) {
          local_12c = (local_12c + 1);
        }
      }
    }
    local_128 = (UNNAMED + UNNAMED);
    local_128 = 0;
    wv(DAT_0063f668, (((UNNAMED * 3 + (UNNAMED + UNNAMED) * 6) + UNNAMED * 4) + local_b4 * 3));
    if ((local_8c < 0x10)) {
      wv(DAT_0063f668, (((UNNAMED * 3 + (UNNAMED + UNNAMED) * 6) + UNNAMED * 4) + local_b4 * 3) * 2);
    }
    if ((local_8c < 0x18)) {
      wv(DAT_0063f668, (DAT_0063f668 << 1));
    }
    if ((local_8c < 0x31)) {
      if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 3)) {
        wv(DAT_0063f668, (DAT_0063f668 << 1));
      }
    }
    else {
      wv(DAT_0063f668, (DAT_0063f668 / 2 | 0));
    }
    if ((7 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f668, (DAT_0063f668 / 2 | 0));
    }
    local_bc = ((UNNAMED + UNNAMED) + 2);
    if (((((DAT_006d1162) << 16 >> 16) / 3 | 0) < local_14)) {
      local_bc = ((UNNAMED + UNNAMED) + 3);
    }
    _DAT_0063f66c = (((local_b4 / 2 | 0) + UNNAMED * 2) + UNNAMED) * local_bc;
    wv(DAT_0063f670, (UNNAMED * 8 - local_14));
    if ((9 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f670, ((UNNAMED * 8 - local_14) >> 1));
    }
    if ((0x20 < local_8c)) {
      wv(DAT_0063f670, (DAT_0063f670 >> 1));
    }
    iVar9 = ((UNNAMED * 3 + UNNAMED) - local_b4);
    iVar5 = FUN_005adfa0((local_8c / 0xa | 0), 1, 2);
    wv(DAT_0063f674, iVar9 * iVar5);
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f674, (iVar9 * iVar5 * 3 >> 1));
    }
    if ((local_8c < 8)) {
      wv(DAT_0063f674, (DAT_0063f674 >> 1));
    }
    if ((local_8c < 0x10)) {
      wv(DAT_0063f674, (DAT_0063f674 >> 1));
    }
    wv(DAT_0063f678, (((UNNAMED * 3 + UNNAMED * 4) + UNNAMED * 2) - (local_8c / 6 | 0)));
    iVar5 = FUN_004bd9f0(iVar4, 0x41);
    if ((iVar5 === 0)) {
      wv(DAT_0063f678, ((((UNNAMED * 3 + UNNAMED * 4) + UNNAMED * 2) - (local_8c / 6 | 0)) / 3 | 0));
    }
    iVar5 = FUN_0043d20a(param_1, 9);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f678, (DAT_0063f678 + (DAT_0063f678 >> 1)));
    }
    if ((local_a4 < 6)) {
      wv(DAT_0063f678, (DAT_0063f678 + (DAT_0063f678 >> 1)));
    }
    wv(DAT_0063f67c, ((((UNNAMED + UNNAMED) + UNNAMED) + UNNAMED) + 1) * UNNAMED * 5);
    iVar5 = (local_b0 / 2 | 0);
    if ((1 < iVar5)) {
      iVar5 = 2;
    }
    wv(DAT_0063f67c, FUN_005ae3ec(((((UNNAMED + UNNAMED) + UNNAMED) + UNNAMED) + 1) * UNNAMED * 5, (iVar5 + -1)));
    if ((1 < local_a4)) {
      wv(DAT_0063f67c, (FUN_005ae3ec(((((UNNAMED + UNNAMED) + UNNAMED) + UNNAMED) + 1) * UNNAMED * 5, (iVar5 + -1)) + (FUN_005ae3ec(((((UNNAMED + UNNAMED) + UNNAMED) + UNNAMED) + 1) * UNNAMED * 5, (iVar5 + -1)) >> 1)));
    }
    if ((local_8c < 0x14)) {
      wv(DAT_0063f67c, (DAT_0063f67c >> 1));
    }
    wv(DAT_0063f680, (UNNAMED * 5 + UNNAMED * 5));
    if (((local_a4 & 1) === 0)) {
      wv(DAT_0063f680, (UNNAMED * 5 + UNNAMED * 5) * 2);
    }
    iVar5 = ((UNNAMED * 5 - UNNAMED) + local_b4);
    wv(DAT_0063f684, iVar5 * 2);
    if (((local_a4 & 3) === 0)) {
      wv(DAT_0063f684, iVar5 * 4);
    }
    local_8 = (local_b4 * 5 - UNNAMED);
    local_1c = (UNNAMED << 2);
    local_8 = FUN_005adfa0(local_8, 0, local_1c);
    local_1c = FUN_005adfa0(local_1c, 0, local_8);
    wv(DAT_0063f688, ((local_1c + (((((DAT_006d1160) << 16 >> 16) >> 1) - local_6c) / 2 | 0)) + local_8));
    if ((local_94 !== 0)) {
      wv(DAT_0063f688, (((local_1c + (((((DAT_006d1160) << 16 >> 16) >> 1) - local_6c) / 2 | 0)) + local_8) >> 1));
    }
    uVar8 = FUN_005adfa0((local_b0 + -1), -2, 1);
    wv(DAT_0063f688, FUN_005ae3ec(DAT_0063f688, uVar8));
    if ((((local_a4 - 2) & 3) === 0)) {
      wv(DAT_0063f688, (FUN_005ae3ec(DAT_0063f688, uVar8) + (FUN_005ae3ec(DAT_0063f688, uVar8) >> 1)));
    }
    if ((s16((DAT_0064c6a6 + iVar4 * 0x594), 0) === 9)) {
      wv(DAT_0063f688, (DAT_0063f688 << 1));
    }
    if ((0xa < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f688, (DAT_0063f688 >> 1));
    }
    wv(DAT_0063f68c, ((UNNAMED * 2 + UNNAMED) + 1) * (UNNAMED + 1));
    if (((local_a4 % 5) === 0)) {
      wv(DAT_0063f68c, (((UNNAMED * 2 + UNNAMED) + 1) * (UNNAMED + 1) + local_64 * 2) * 2);
    }
    if ((s16((DAT_0064c6a6 + iVar4 * 0x594), 0) === 0xb)) {
      wv(DAT_0063f68c, (DAT_0063f68c << 1));
    }
    wv(DAT_0063f690, UNNAMED * 8);
    if ((UNNAMED * 8 !== 0)) {
      wv(DAT_0063f690, (UNNAMED * 8 + (UNNAMED + local_6c)));
      iVar5 = FUN_004bd9f0(iVar4, 0x27);
      if ((iVar5 === 0)) {
        wv(DAT_0063f690, ((UNNAMED * 8 + (UNNAMED + local_6c)) >> 1));
      }
      if ((8 < local_a4)) {
        wv(DAT_0063f690, (DAT_0063f690 + (DAT_0063f690 >> 1)));
      }
      if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 5)) {
        wv(DAT_0063f690, (DAT_0063f690 >> 1));
      }
    }
    if ((s16((DAT_0064c6a6 + iVar4 * 0x594), 0) === 0xa)) {
      wv(DAT_0063f68c, (DAT_0063f68c << 1));
    }
    wv(DAT_0063f694, ((UNNAMED * 3 + UNNAMED * 2) + UNNAMED * 2) * ((UNNAMED + local_b4) / 2 | 0));
    if ((((UNNAMED * 3 + UNNAMED * 2) + UNNAMED * 2) * ((UNNAMED + local_b4) / 2 | 0) !== 0)) {
      if ((local_14 < 0xa)) {
        wv(DAT_0063f694, ((UNNAMED * 3 + UNNAMED * 2) + UNNAMED * 2) * ((UNNAMED + local_b4) / 2 | 0) * 2);
      }
      wv(DAT_0063f694, (DAT_0063f694 - local_14));
      if ((s16((DAT_00666130 + local_a4 * 0x10), 0) < 0x1a)) {
        wv(DAT_0063f694, ((DAT_0063f694 - local_14) + ((DAT_0063f694 - local_14) >> 1)));
      }
      if ((0x12c < s16((DAT_00666130 + local_a4 * 0x10), 0))) {
        wv(DAT_0063f694, (DAT_0063f694 >> 1));
      }
      if ((local_a4 === 1)) {
        wv(DAT_0063f694, (DAT_0063f694 >> 1));
      }
    }
    wv(DAT_0063f698, ((UNNAMED + 1) * (UNNAMED + 1) * (UNNAMED + 1) + UNNAMED));
    if ((((UNNAMED + 1) * (UNNAMED + 1) * (UNNAMED + 1) + UNNAMED) !== 0)) {
      iVar5 = FUN_005adfa0(local_b0, 1, 4);
      wv(DAT_0063f698, (iVar5 * ((UNNAMED + 1) * (UNNAMED + 1) * (UNNAMED + 1) + UNNAMED) / 2 | 0));
      if ((local_a4 === 7)) {
        wv(DAT_0063f698, ((iVar5 * ((UNNAMED + 1) * (UNNAMED + 1) * (UNNAMED + 1) + UNNAMED) / 2 | 0) + ((iVar5 * ((UNNAMED + 1) * (UNNAMED + 1) * (UNNAMED + 1) + UNNAMED) / 2 | 0) >> 1)));
      }
    }
    wv(DAT_0063f69c, ((UNNAMED + (UNNAMED / 2 | 0)) + 1) * (local_b4 + 2));
    if ((2 < UNNAMED)) {
      wv(DAT_0063f69c, ((UNNAMED + (UNNAMED / 2 | 0)) + 1) * (local_b4 + 2) * 2);
    }
    if ((4 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f69c, (DAT_0063f69c << 1));
    }
    if ((9 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f69c, (DAT_0063f69c << 1));
    }
    wv(DAT_0063f6a0, (((UNNAMED * 8 + UNNAMED * 0xa) + UNNAMED * 6) + UNNAMED * 0xc));
    if ((DAT_00655b90 === 0)) {
      wv(DAT_0063f6a0, ((((UNNAMED * 8 + UNNAMED * 0xa) + UNNAMED * 6) + UNNAMED * 0xc) >> 3));
    }
    if ((DAT_0063f6a0 === 0)) {
      wv(DAT_0063f6a0, -1);
    }
    else {
      if ((local_a4 === 0x11)) {
        wv(DAT_0063f6a0, DAT_0063f6a0 * 3);
      }
      else if ((((local_a4 - 1) & 7) === 0)) {
        wv(DAT_0063f6a0, (DAT_0063f6a0 + (DAT_0063f6a0 >> 1)));
      }
      iVar5 = FUN_005adfa0(((local_b0 / 2 | 0) + -2), 1, 2);
      wv(DAT_0063f6a0, iVar5 * DAT_0063f6a0);
    }
    wv(DAT_0063f6a4, ((UNNAMED + UNNAMED) + 1) * ((UNNAMED + local_b4) + 1) * (UNNAMED + 1));
    iVar5 = FUN_004bd9f0(iVar4, 0x3a);
    if ((iVar5 === 0)) {
      wv(DAT_0063f6a4, 0);
    }
    if ((DAT_0063f6a4 === 0)) {
      wv(DAT_0063f6a4, -1);
    }
    else {
      if (((local_a4 % 0xa) === 0)) {
        wv(DAT_0063f6a4, (DAT_0063f6a4 + (DAT_0063f6a4 >> 1)));
      }
      iVar5 = local_b0;
      if ((5 < local_b0)) {
        iVar5 = 6;
      }
      wv(DAT_0063f6a4, (DAT_0063f6a4 * iVar5 / 6 | 0));
    }
    wv(DAT_0063f540, ((((UNNAMED + UNNAMED) * 5 + (local_14 * 3 / 2 | 0)) + UNNAMED * 2) + UNNAMED));
    iVar5 = (local_8c / 0xa | 0) * ((((UNNAMED + UNNAMED) * 5 + (local_14 * 3 / 2 | 0)) + UNNAMED * 2) + UNNAMED);
    _DAT_0063f54c = ((UNNAMED * 4 + UNNAMED * 4) + ((iVar5 + ((iVar5 >> 0x1f) & 7)) >> 3))
    ;
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 3)) {
      wv(DAT_0063f540, ((((UNNAMED + UNNAMED) * 5 + (local_14 * 3 / 2 | 0)) + UNNAMED * 2) + UNNAMED) * 2);
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f540, (DAT_0063f540 / 3 | 0));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x30);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f540, 1);
    }
    if ((local_8c < 0xa)) {
      wv(DAT_0063f540, (DAT_0063f540 << 1));
    }
    if ((local_8c < 0x14)) {
      wv(DAT_0063f540, (DAT_0063f540 << 1));
    }
    if ((0x2f < local_8c)) {
      wv(DAT_0063f540, (DAT_0063f540 / 2 | 0));
    }
    if ((((((DAT_006d1162) << 16 >> 16) >> 2) === local_14) || (((((DAT_006d1162) << 16 >> 16) >> 2) - local_14) < 0))) {
      local_138 = ((~((((DAT_006d1162) << 16 >> 16) >> 2) - local_14)) + 1);
    }
    else {
      local_138 = ((((DAT_006d1162) << 16 >> 16) >> 2) - local_14);
    }
    wv(DAT_0063f544, ((local_138 * 2 + UNNAMED * 2) + UNNAMED));
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f544, (((local_138 * 2 + UNNAMED * 2) + UNNAMED) << 1));
    }
    wv(DAT_0063f548, (local_14 + ((0x15 - UNNAMED) * 3 / 2 | 0)));
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 4)) {
      wv(DAT_0063f548, ((local_14 + ((0x15 - UNNAMED) * 3 / 2 | 0)) + ((local_14 + ((0x15 - UNNAMED) * 3 / 2 | 0)) >> 1)));
    }
    if ((0xb < _MEM[DAT_0064f349 + param_1 * 0x58])) {
      wv(DAT_0063f548, (DAT_0063f548 / 2 | 0));
    }
    if ((0x2f < local_8c)) {
      wv(DAT_0063f548, (DAT_0063f548 / 2 | 0));
    }
    local_18 = 8;
    for (/* cond: (0 < local_88) */); (local_18 = (local_18 !== 0) && (0 = (0 < local_88)));
        local_88 = (local_88 - local_9c)) {
      local_9c = FUN_005adfa0(local_88, 0, 5);
      _DAT_0063f550 = (None + local_9c * local_18);
      local_18 = (local_18 / 2 | 0);
    }
    _DAT_0063f550 = (None - (local_8c / 2 | 0));
    wv(DAT_0063f554, ((local_14 + 0xa) * local_b0 + local_8c));
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 5)) {
      wv(DAT_0063f554, 0);
    }
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 8)) {
      wv(DAT_0063f554, (DAT_0063f554 >> 1));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f554, (DAT_0063f554 << 1));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x17);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f554, (DAT_0063f554 << 1));
    }
    iVar5 = FUN_0043d20a(param_1, 0x13);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f554, (DAT_0063f554 << 1));
    }
    iVar5 = FUN_0043d20a(param_1, 0x14);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f554, (DAT_0063f554 >> 3));
    }
    wv(DAT_0063f558, ((local_b4 + local_12c) + 1) * local_b0);
    if ((((local_b4 + local_12c) + 1) * local_b0 <= DAT_0063f680)) {
      wv(DAT_0063f558, (((local_b4 + local_12c) + 1) * local_b0 >> 1));
    }
    iVar5 = FUN_0043d20a(param_1, 5);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f558, (DAT_0063f558 + (DAT_0063f558 >> 1)));
    }
    iVar5 = FUN_0043d20a(param_1, 0xa);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f558, (DAT_0063f558 + (DAT_0063f558 >> 1)));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x17);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f558, (DAT_0063f558 + (DAT_0063f558 >> 1)));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x10);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f558, ((DAT_0063f558 + ((DAT_0063f558 >> 0x1f) & 3)) >> 2));
    }
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 5)) {
      wv(DAT_0063f558, (DAT_0063f558 >> 1));
    }
    wv(DAT_0063f55c, (DAT_0063f674 + local_12c));
    iVar5 = FUN_004bd9f0(iVar4, 0xa);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f55c, ((DAT_0063f674 + local_12c) / 2 | 0));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x30);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f55c, (DAT_0063f55c / 2 | 0));
    }
    if (((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) === ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16)) || ((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) - ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16)) < 0))) {
      local_13c = ((~(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) - ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16))) + 1);
    }
    else {
      local_13c = (((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) - ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
    }
    _DAT_0063f560 = ((local_b0 * 4 + 4) + local_13c);
    wv(DAT_0063f564, ((((((((((DAT_006d1162) << 16 >> 16) >> 1) - local_14) * 2 - local_6c) + (((DAT_006d1160) << 16 >> 16) >> 1)) + UNNAMED * 4) + (UNNAMED / 2 | 0)) + UNNAMED * 2) + UNNAMED * 4));
    uVar8 = FUN_005adfa0((local_b0 + -1), -1, 1);
    wv(DAT_0063f564, FUN_005ae3ec(((((((((((DAT_006d1162) << 16 >> 16) >> 1) - local_14) * 2 - local_6c) + (((DAT_006d1160) << 16 >> 16) >> 1)) + UNNAMED * 4) + (UNNAMED / 2 | 0)) + UNNAMED * 2) + UNNAMED * 4), uVar8));
    if (((param_1 & 2) !== 0)) {
      wv(DAT_0063f564, (FUN_005ae3ec(((((((((((DAT_006d1162) << 16 >> 16) >> 1) - local_14) * 2 - local_6c) + (((DAT_006d1160) << 16 >> 16) >> 1)) + UNNAMED * 4) + (UNNAMED / 2 | 0)) + UNNAMED * 2) + UNNAMED * 4), uVar8) + (FUN_005ae3ec(((((((((((DAT_006d1162) << 16 >> 16) >> 1) - local_14) * 2 - local_6c) + (((DAT_006d1160) << 16 >> 16) >> 1)) + UNNAMED * 4) + (UNNAMED / 2 | 0)) + UNNAMED * 2) + UNNAMED * 4), uVar8) >> 1)));
    }
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 7)) {
      wv(DAT_0063f564, (DAT_0063f564 >> 1));
    }
    wv(DAT_0063f568, (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) << 3));
    wv(DAT_0063f574, 0);
    _DAT_0063f570 = 0;
    local_84 = 0xa;
    iVar5 = ((((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16)) % 3);
    if ((iVar5 === 1)) {
      local_84 = 0xc;
      _DAT_0063f570 = (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) << 3);
    }
    else if ((iVar5 === 2)) {
      local_84 = 0xd;
      wv(DAT_0063f574, (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) << 3));
    }
    iVar5 = FUN_0043d20a(param_1, 0xb);
    if ((iVar5 !== 0)) {
      w32(DAT_0063f540, local_84, (s32(DAT_0063f540, local_84) * 3 >> 1));
    }
    iVar5 = FUN_0043d20a(param_1, 0xa);
    if ((iVar5 !== 0)) {
      w32(DAT_0063f540, local_84, (s32(DAT_0063f540, local_84) * 3 >> 1));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x16);
    if ((iVar5 !== 0)) {
      w32(DAT_0063f540, local_84, (s32(DAT_0063f540, local_84) >> 1));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x10);
    if ((iVar5 !== 0)) {
      w32(DAT_0063f540, local_84, (s32(DAT_0063f540, local_84) >> 1));
    }
    if ((s16((DAT_0064c6a6 + iVar4 * 0x594), 0) === 0x11)) {
      w32(DAT_0063f540, local_84, (s32(DAT_0063f540, local_84) << 1));
    }
    iVar5 = (local_8c - 0xc);
    if ((iVar5 < 1)) {
      iVar5 = 0;
    }
    wv(DAT_0063f56c, ((((s16((DAT_00666130 + local_a4 * 0x10), 0)) << 16 >> 16) / 0xa | 0) - iVar5));
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 4)) {
      wv(DAT_0063f56c, (((((s16((DAT_00666130 + local_a4 * 0x10), 0)) << 16 >> 16) / 0xa | 0) - iVar5) / 2 | 0));
    }
    if ((0x190 < s16((DAT_00666130 + local_a4 * 0x10), 0))) {
      if ((7 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
        wv(DAT_0063f56c, (DAT_0063f56c << 1));
      }
      if (((((-((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16)) - ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16)) & 3) === 0)) {
        wv(DAT_0063f56c, 0);
      }
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x46);
    if ((iVar5 !== 0)) {
      wv(DAT_0063f56c, (DAT_0063f56c >> 1));
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 === 0)) {
      wv(DAT_0063f578, -1);
    }
    else {
      wv(DAT_0063f578, (local_8c / 3 | 0) * (local_b0 + 2));
      if (((local_8c / 3 | 0) * (local_b0 + 2) <= DAT_0063f6a0)) {
        wv(DAT_0063f578, ((local_8c / 3 | 0) * (local_b0 + 2) >> 1));
      }
      iVar5 = FUN_0043d20a(param_1, 0xf);
      if ((iVar5 === 0)) {
        if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 5)) {
          wv(DAT_0063f578, (DAT_0063f578 >> 1));
        }
        if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 0xa)) {
          wv(DAT_0063f578, (DAT_0063f578 >> 1));
        }
        if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 0x14)) {
          wv(DAT_0063f578, (DAT_0063f578 >> 1));
        }
      }
      else {
        wv(DAT_0063f578, (DAT_0063f578 * 3 / 2 | 0));
      }
      iVar5 = FUN_004bd9f0(iVar4, 5);
      if ((iVar5 !== 0)) {
        wv(DAT_0063f578, DAT_0063f578 * 3);
      }
      iVar5 = FUN_0043d20a(param_1, 0x19);
      if ((iVar5 !== 0)) {
        wv(DAT_0063f578, (DAT_0063f578 << 1));
      }
      iVar5 = FUN_0043d20a(param_1, 0xd);
      if ((iVar5 !== 0)) {
        wv(DAT_0063f578, (DAT_0063f578 >> 1));
      }
      iVar5 = FUN_0043d20a(param_1, 0x12);
      if ((iVar5 !== 0)) {
        wv(DAT_0063f578, (DAT_0063f578 >> 1));
      }
    }
    iVar5 = FUN_004bd9f0(iVar4, 0x3a);
    if ((iVar5 === 0)) {
      wv(DAT_0063f57c, -1);
    }
    else {
      wv(DAT_0063f57c, local_8c * local_8c);
      uVar8 = FUN_005adfa0((local_b0 + -3), -3, 0);
      wv(DAT_0063f57c, FUN_005ae3ec(local_8c * local_8c, uVar8));
      iVar5 = FUN_0043d20a(param_1, 0x15);
      if ((iVar5 !== 0)) {
        wv(DAT_0063f57c, (DAT_0063f57c << 1));
      }
    }
    for (/* cond: (local_68 < 0x10) */); local_68 = (local_68 < 0x10); local_68 = (local_68 + 1)) {
      if ((s32(DAT_0063f668, local_68) < s32(DAT_0063f540, local_68))) {
        if ((0 < s32(DAT_0063f668, local_68))) {
          w32(DAT_0063f668, local_68, 0);
        }
      }
      else if ((0 < s32(DAT_0063f540, local_68))) {
        w32(DAT_0063f540, local_68, 0);
      }
    }
    FUN_00414f02(0x10, DAT_ffffff04, DAT_0063f668);
    FUN_00414f02(0x10, DAT_ffffffa4, DAT_0063f540);
    local_b8 = 0xf;
    for (/* cond: (local_68 < 3) */); local_68 = (local_68 < 3); local_68 = (local_68 + 1)) {
      do {
        piVar1 = (DAT_ffffff04 + local_b8);
        local_74 = s32(DAT_ffffff04, local_b8);
        iVar5 = local_74;
        local_b8 = (local_b8 + -1);
      } while ((s32((DAT_0063f66c + local_b8 * 4), 0) < 0));
      local_74 = ((s32(DAT_ffffff04, local_b8)) & 0xFF);
      _MEM[DAT_0064f37b + (param_1 * 0x58 + local_68)] = ((s32(DAT_ffffff04, local_b8)) & 0xFF);
      local_74 = iVar5;
    }
    local_b8 = 0xf;
    for (/* cond: (local_68 < 3) */); local_68 = (local_68 < 3); local_68 = (local_68 + 1)) {
      do {
        piVar1 = (DAT_ffffffa4 + local_b8);
        local_74 = s32(DAT_ffffffa4, local_b8);
        iVar5 = local_74;
        local_b8 = (local_b8 + -1);
      } while ((s32(DAT_0063f544, local_b8) < 0));
      local_74 = ((s32(DAT_ffffffa4, local_b8)) & 0xFF);
      _MEM[DAT_0064f37e + (param_1 * 0x58 + local_68)] = ((s32(DAT_ffffffa4, local_b8)) & 0xFF);
      local_74 = iVar5;
    }
    if ((local_8c < 0x20)) {
      local_60 = ((((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) * 5 + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) * 3) % 0xe);
      local_c = ((((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) * 7 + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) * 0xd) % 0xe);
    }
    else {
      local_60 = (((((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) * 5 + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) * 3) % 9) + 5);
      local_c = (((((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) * 7 + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) * 0xd) % 9) + 5);
    }
    if ((local_c === local_60)) {
      local_c = -2;
    }
    local_a8 = 0;
    for (/* cond: (local_68 < 3) */); local_68 = (local_68 < 3); local_68 = (local_68 + 1)) {
      if ((0xd < _MEM[DAT_0064f37e + (param_1 * 0x58 + local_68)])) {
        local_a8 = (local_a8 | 1);
      }
      if ((0xd < _MEM[DAT_0064f37b + (param_1 * 0x58 + local_68)])) {
        local_a8 = (local_a8 | 2);
      }
      if ((s8(_MEM[DAT_0064f37e + (param_1 * 0x58 + local_68)]) === local_60)) {
        local_60 = -2;
      }
      if ((s8(_MEM[DAT_0064f37e + (param_1 * 0x58 + local_68)]) === local_c)) {
        local_c = -2;
      }
    }
    if (((local_a8 & 1) === 0)) {
      iVar5 = FUN_004bd9f0(iVar4, 0x25);
      if (((local_60 & 1) === 0)) {
        iVar5 = FUN_004bd9f0(iVar4, 0x3a);
        if (((local_60 & 1) === 0)) {
          local_60 = 0xf;
        }
      }
      else {
        local_60 = 0xe;
      }
    }
    if ((-1 < local_60)) {
      _MEM[DAT_0064f37f + param_1 * 0x58] = ((local_60) & 0xFF);
    }
    if (((local_a8 & 2) === 0)) {
      local_c = ((local_c & 1) + 0xe);
      if ((iVar5 === 0)) {
        local_c = -1;
      }
      if ((iVar4 === 0)) {
        local_c = -1;
      }
    }
    if ((-1 < local_c)) {
      _MEM[DAT_0064f37c + param_1 * 0x58] = ((local_c) & 0xFF);
    }
    for (/* cond: (local_68 < s8(_MEM[DAT_0064f37a + param_1 * 0x58])) */); local_68 = (local_68 < s8(_MEM[DAT_0064f37a + param_1 * 0x58])); local_68 = (local_68 + 1)) {
      cVar2 = _MEM[DAT_0064f381 + (param_1 * 0x58 + local_68)];
      if ((0xff < cVar2)) {
        for (/* cond: (local_7c < 3) */); local_7c = (local_7c < 3); local_7c = (local_7c + 1)) {
          if ((_MEM[DAT_0064f37b + (param_1 * 0x58 + local_7c)] === cVar2)) {
            _MEM[DAT_0064f37b + (param_1 * 0x58 + local_7c)] = (-_MEM[DAT_0064f37b + (param_1 * 0x58 + local_7c)])
            ;
          }
        }
        iVar4 = ((s16((DAT_0064f384 + (local_68 * 2 + param_1 * 0x58)), 0)) << 16 >> 16);
        cVar2 = 0xff;
        for (/* cond: (local_7c < s8(_MEM[DAT_0064f37a + iVar4 * 0x58])) */); local_7c = (local_7c < s8(_MEM[DAT_0064f37a + iVar4 * 0x58])); local_7c = (local_7c + 1))
        {
          if ((((s16((DAT_0064f384 + (local_7c * 2 + iVar4 * 0x58)), 0)) << 16 >> 16) === param_1)) {
            cVar2 = _MEM[DAT_0064f381 + (iVar4 * 0x58 + local_7c)];
          }
        }
        if ((0xff < cVar2)) {
          for (/* cond: (local_7c < 3) */); local_7c = (local_7c < 3); local_7c = (local_7c + 1)) {
            if ((_MEM[DAT_0064f37e + (param_1 * 0x58 + local_7c)] === cVar2)) {
              _MEM[DAT_0064f37e + (param_1 * 0x58 + local_7c)] = (-_MEM[DAT_0064f37e + (param_1 * 0x58 + local_7c)]);
            }
          }
        }
      }
    }
    for (/* cond: (local_130 < ((DAT_00655b16) << 16 >> 16)) */); local_130 = (local_130 < ((DAT_00655b16) << 16 >> 16)); local_130 = (local_130 + 1)) {
      if ((0xff < _MEM[DAT_006560fd + local_130 * 0x20])) {
        for (/* cond: (local_68 < 3) */); local_68 = (local_68 < 3); local_68 = (local_68 + 1)) {
          if ((_MEM[DAT_0064f37b + (param_1 * 0x58 + local_68)] === _MEM[DAT_006560fd + local_130 * 0x20])) {
            _MEM[DAT_0064f37b + (param_1 * 0x58 + local_68)] = (-_MEM[DAT_0064f37b + (param_1 * 0x58 + local_68)])
            ;
          }
        }
      }
    }
  }
  return;
}


 export function FUN_0043f444 (param_1, param_2)

 {
  if ((param_2 < 0)) {
    FUN_004af14b(param_1, 0xe);
  }
  else {
    FUN_004af174(param_1, (DAT_0064f360 + param_2 * 0x58));
  }
  return;
}


 export function FUN_0043f493 (param_1)

 {
  let iVar1;
  let iVar2;
  let sVar3;
  let local_2c;
  let local_24;
  let local_20;
  let local_1c;

  local_20 = 0;
  iVar1 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
  FUN_004aef20(DAT_ffffffe4);
  if ((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0) < 1)) {
    local_2c = ((~((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16)) + 1);
  }
  else {
    local_2c = ((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16);
  }
  FUN_004af122(DAT_ffffffe4, local_2c);
 LAB_0043f557: :
  do {
    local_20 = (local_20 + 1);
    if ((2 < local_20)) {
 LAB_0043f78e: :
      FUN_004a2020();
      return;
    }
    _MEM[DAT_006554fd + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] = (_MEM[DAT_006554fd + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] + 1);
    local_24 = u8(_MEM[DAT_006554fd + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30]);
    __chdir(DAT_0064bb08);
    iVar2 = FUN_004a2379(DAT_00626258, DAT_ffffffe4);
    if ((iVar2 !== 0)) {
      __chdir(DAT_00655020);
      iVar2 = FUN_004a2379(DAT_00626260, DAT_ffffffe4);
      if ((iVar2 !== 0));
    for (/* cond: (0 < local_24) */); 0 = (0 < local_24); local_24 = (local_24 - 1)) {
      FUN_004a23fc(1);
      sVar3 = _strlen(DAT_00679640);
      if ((iVar2 === 0)) {
 LAB_0043f714: :
      if ((local_24 < 1)) {
        _memset((DAT_0064f360 + param_1 * 0x58), 0, 0x10);
        _strncpy((DAT_0064f360 + param_1 * 0x58), DAT_00679640, 0xf);
        goto LAB_0043f78e;
      }
      _MEM[DAT_006554fd + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] = 0;
      goto LAB_0043f557;
    }
    iVar2 = FUN_004a2379(0, s_EXTRA_00626270);
    if ((iVar2 === 0)) {
      for (/* cond: (0 < local_24) */); 0 = (0 < local_24); local_24 = (local_24 - 1)) {
        FUN_004a23fc(1);
        sVar3 = _strlen(DAT_00679640);
        if ((iVar2 === 0));
  } /* goto */ ( true );
}


 export function FUN_0043f7a7 (param_1)

 {
  let cVar1;
  let sVar2;
  let sVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_8;

  sVar2 = s16((DAT_0064f340 + param_1 * 0x58), 0);
  sVar3 = s16((DAT_0064f342 + param_1 * 0x58), 0);
  cVar1 = _MEM[DAT_0064f348 + param_1 * 0x58];
  FUN_005b9ec6();
  for (/* cond: (local_8 < 0x2d) */); local_8 = (local_8 < 0x2d); local_8 = (local_8 + 1)) {
    uVar4 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_8]) + ((sVar2) << 16 >> 16)));
    iVar5 = (s8(_MEM[DAT_006283a0 + local_8]) + ((sVar3) << 16 >> 16));
    iVar6 = FUN_004087c0(uVar4, iVar5);
    if ((iVar6 !== 0)) {
      uVar7 = FUN_005b8c18(uVar4, iVar5, 1);
      FUN_005b98b7(uVar4, iVar5, (uVar7 & 7));
      if ((local_8 < 0x15)) {
        FUN_005b9c49(uVar4, iVar5, s8(cVar1), 1);
      }
    }
  }
  FUN_005b9f1c();
  return;
}


 export function FUN_0043f8b0 (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let pbVar7;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;

  wv(DAT_006ad8c4, 1);
  if ((cVar1 !== 0)) {
    for (/* cond: (s32((DAT_0064f394 + local_28 * 0x58), 0) !== 0) */); (local_28 = (local_28 < ((DAT_00655b18) << 16 >> 16)) && (wv(DAT_0064f394, DAT_0064f394)))
        ; local_28 = (local_28 + 1)) {
    }
    if ((((DAT_00655b18) << 16 >> 16) === local_28)) {
      if ((0xfe < DAT_00655b18)) {
        if ((DAT_00655b02 < 3)) {
          FUN_00444270(s_TOOMANYCITIES_006262c4);
        }
        wv(DAT_006ad8c4, 0);
        return -1;
      }
      wv(DAT_00655b18, (DAT_00655b18 + 1));
    }
    w16((DAT_0064c708 + param_3 * 0x594), 0, (s16((DAT_0064c708 + param_3 * 0x594), 0) + 1));
    w16((DAT_0064c6ae + param_3 * 0x594), 0, DAT_00655af8);
    FUN_005b94fc(param_1, param_2, 2, 1, 1);
    FUN_005b94fc(param_1, param_2, 0x40, 0, 1);
    w16((DAT_0064f340 + local_28 * 0x58), 0, ((param_1) & 0xFFFF));
    w16((DAT_0064f342 + local_28 * 0x58), 0, ((param_2) & 0xFFFF));
    _MEM[DAT_0064f348 + local_28 * 0x58] = ((param_3) & 0xFF);
    w32((DAT_0064f394 + local_28 * 0x58), 0, DAT_00627fdc);
    wv(DAT_00627fdc, (DAT_00627fdc + 1));
    _MEM[DAT_0064f34a + local_28 * 0x58] = ((param_3) & 0xFF);
    _MEM[DAT_0064f34b + local_28 * 0x58] = 0;
    w32((DAT_0064f344 + local_28 * 0x58), 0, 0x20000);
    _MEM[DAT_0064f349 + local_28 * 0x58] = 1;
    if ((DAT_00655c18 < 0)) {
      _MEM[DAT_0064f34c + local_28 * 0x58] = 0;
      for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
        _MEM[DAT_0064f34d + (local_28 * 0x58 + local_2c)] = 0;
      }
    }
    else {
      _MEM[DAT_0064f34c + local_28 * 0x58] = 0xff;
      for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
        _MEM[DAT_0064f34d + (local_28 * 0x58 + local_2c)] = 1;
      }
      FUN_005b976d(param_1, param_2, 0xff, 1, 1);
      for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
        FUN_005b8b1a(param_1, param_2, local_2c);
      }
    }
    w32((DAT_0064f356 + local_28 * 0x58), 0, 0);
    _MEM[DAT_0064f379 + local_28 * 0x58] = 0;
    local_10 = 0;
    for (/* cond: (local_24 < 0x3e) */); local_24 = (local_24 < 0x3e); local_24 = (local_24 + 1)) {
      if ((iVar4 !== 0)) {
        local_c = ((s8(_MEM[DAT_0064b1c5 + local_24 * 0x14]) << 3) / s8(_MEM[DAT_0064b1c8 + local_24 * 0x14]) | 0);
        if (((_MEM[DAT_0064b1bd + local_24 * 0x14] & 4) !== 0)) {
          local_c = (local_c + 1);
        }
        if ((local_10 <= local_c)) {
          local_10 = local_c;
          _MEM[DAT_0064f379 + local_28 * 0x58] = ((local_24) & 0xFF);
        }
      }
    }
    _MEM[DAT_0064c7f4 + (param_3 * 0x594 + s8(_MEM[DAT_0064f379 + local_28 * 0x58]))] = (_MEM[DAT_0064c7f4 + (param_3 * 0x594 + s8(_MEM[DAT_0064f379 + local_28 * 0x58]))] + 1);
    w16((DAT_0064f35a + local_28 * 0x58), 0, 0);
    w16((DAT_0064f35c + local_28 * 0x58), 0, 0);
    w16((DAT_0064f35e + local_28 * 0x58), 0, 0);
    _MEM[DAT_0064f360 + local_28 * 0x58] = 0;
    FUN_0043f493(local_28);
    w32((DAT_0064f370 + local_28 * 0x58), 0, 0);
    _memset((DAT_0064f374 + local_28 * 0x58), 0, 5);
    if ((s16((DAT_0064c708 + param_3 * 0x594), 0) === 1)) {
      FUN_0043d289(local_28, 1, 1);
      w16((DAT_0064c6ac + param_3 * 0x594), 0, ((param_1) & 0xFFFF));
      if ((((1 << (((param_3) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_005b9ec6();
        for (/* cond: (local_14 < 0x14) */); local_14 = (local_14 < 0x14); local_14 = (local_14 + 1)) {
          uVar6 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_14]) + param_1));
          iVar4 = (s8(_MEM[DAT_006283a0 + local_14]) + param_2);
          iVar5 = FUN_004087c0(uVar6, iVar4);
          if ((_MEM[DAT_00627cce + u8(bVar2) * 0x18] === 0xfe)) {
            FUN_005b94fc(uVar6, iVar4, 4, 1, 1);
          }
        }
        FUN_005b9f1c();
        if (((DAT_00655b0b & _MEM[(iVar4 + 4)]) === 0)) {
          uVar3 = FUN_005adfa0(((((DAT_00655af8) << 16 >> 16) + -20) / 0x14 | 0), 2, 0xa);
          _MEM[DAT_0064f349 + local_28 * 0x58] = uVar3;
          FUN_0043d289(local_28, 4, 1);
          FUN_0043d289(local_28, 5, 1);
          FUN_0043d289(local_28, 6, 1);
        }
        if ((_MEM[DAT_0064f379 + local_28 * 0x58] !== 0)) {
          FUN_005b3d06(s8(_MEM[DAT_0064f379 + local_28 * 0x58]), param_3, param_1, param_2);
        }
      }
    }
    _MEM[DAT_0064f37a + local_28 * 0x58] = 0;
    _memset((DAT_0064f384 + local_28 * 0x58), 0, 3);
    _memset((DAT_0064f381 + local_28 * 0x58), 0, 3);
    for (/* cond: (local_14 < 9) */); local_14 = (local_14 < 9); local_14 = (local_14 + 1)) {
      uVar6 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_14]) + param_1));
      iVar4 = (s8(_MEM[DAT_00628360 + local_14]) + param_2);
      iVar5 = FUN_004087c0(uVar6, iVar4);
      if ((iVar5 !== 0)) {
        iVar5 = FUN_005b89e4(uVar6, iVar4);
        if ((iVar5 !== 0)) {
          iVar5 = FUN_005b8a81(uVar6, iVar4);
          if (((_MEM[DAT_0064f344 + local_28 * 0x58] & 0x80) !== 0)) {
            w32((DAT_0064f344 + local_28 * 0x58), 0, (s32((DAT_0064f344 + local_28 * 0x58), 0) | 0x200000));
          }
          w32((DAT_0064f344 + local_28 * 0x58), 0, (s32((DAT_0064f344 + local_28 * 0x58), 0) | 0x80));
        }
        pbVar7 = FUN_005b8931(uVar6, iVar4);
        if ((cVar1 === 5)) {
          w32((DAT_0064f344 + local_28 * 0x58), 0, (s32((DAT_0064f344 + local_28 * 0x58), 0) | 0x800));
        }
      }
    }
    FUN_0043f7a7(local_28);
    FUN_0043d400(local_28);
    w16((DAT_0064f38a + local_28 * 0x58), 0, 0);
    w16((DAT_0064f38c + local_28 * 0x58), 0, 0);
    w16((DAT_0064f38e + local_28 * 0x58), 0, 0);
    _MEM[DAT_0064f390 + local_28 * 0x58] = 0;
    _MEM[DAT_0064f391 + local_28 * 0x58] = 0;
    _MEM[DAT_0064f392 + local_28 * 0x58] = 0;
    _MEM[DAT_0064f393 + local_28 * 0x58] = 0;
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8c4, 0);
  }
  else {
    wv(DAT_006ad8c4, 0);
    wv(DAT_006c90d0, -2);
    FUN_0046b14d(0x3b, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
    iVar4 = FUN_00421bb0();
    while (((iVar5 - iVar4) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90d0 === -2)) {
      FUN_005d225b(s_Create_City:_Connection_to_serve_00626280);
      FUN_00410030(s_SERVERCONNECTTIME_006262b0, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return local_28;
}
