// Block 0x00420000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 157

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408130, FUN_00408330, FUN_004083f0 } from './block_00400000.js';
import { FUN_00408460, FUN_004085f0, FUN_00408680, FUN_004086c0, FUN_004087c0, FUN_0040bbb0 } from './block_00400000.js';
import { FUN_0040bbe0, FUN_0040bc10, FUN_0040bc40, FUN_0040bc80, FUN_0040ef50, FUN_0040ef70 } from './block_00400000.js';
import { FUN_0040efd0, FUN_0040f010, FUN_0040f350, FUN_0040f380, FUN_0040f680, FUN_0040f7d0 } from './block_00400000.js';
import { FUN_0040f840, FUN_0040f880, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80 } from './block_00400000.js';
import { FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00 } from './block_00400000.js';
import { FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0, FUN_0040ffe0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414d70, FUN_00415133, FUN_00417ef0, FUN_00417f70 } from './block_00410000.js';
import { FUN_00417fa0, FUN_004183d0, FUN_00418bf0, FUN_00418c70, FUN_00418ce0, FUN_00418d60 } from './block_00410000.js';
import { FUN_00418d90, FUN_00418dd0, FUN_004190d0, FUN_00419100, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00419be0, FUN_00419c8b, FUN_0041e864 } from './block_00410000.js';
import { FUN_0043c260, FUN_0043c3f0, FUN_0043c460, FUN_0043c4c0, FUN_0043c520, FUN_0043c5c0 } from './block_00430000.js';
import { FUN_0043c5f0, FUN_0043c790, FUN_0043c7c0, FUN_0043c870, FUN_0043c8a0, FUN_0043c8d0 } from './block_00430000.js';
import { FUN_0043c910, FUN_0043ca80, FUN_0043cab0, FUN_0043cb30, FUN_0043cc00, FUN_0043cf76 } from './block_00430000.js';
import { FUN_0043d20a, ~CDaoFieldInfo } from './block_00430000.js';
import { FUN_00445e46, FUN_00448f92 } from './block_00440000.js';
import { FUN_00453e51, FUN_0045705e } from './block_00450000.js';
import { FUN_004679ab, FUN_0046b14d, FUN_0046e020, FUN_0046e6a9 } from './block_00460000.js';
import { FUN_004729ab, FUN_00472d20, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf22, FUN_0047e94e } from './block_00470000.js';
import { GetActiveView } from './block_00470000.js';
import { FUN_00484d52, FUN_00484fec, FUN_00485208 } from './block_00480000.js';
import { FUN_0049301b, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497ea0, FUN_004980ec } from './block_00490000.js';
import { FUN_00498159, FUN_0049882b } from './block_00490000.js';
import { FUN_004a2020, FUN_004aef20, FUN_004aef36, FUN_004aef96, FUN_004af01a, FUN_004af03b } from './block_004A0000.js';
import { FUN_004af122, FUN_004af14b, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b21d7, FUN_004bd9f0 } from './block_004B0000.js';
import { FUN_004c0cf7, FUN_004c2788, FUN_004ccb6a } from './block_004C0000.js';
import { FUN_004e4ceb, FUN_004e75a6, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f00f0 } from './block_004F0000.js';
import { FUN_00509590 } from './block_00500000.js';
import { FUN_0051d564, FUN_0051d63b, FUN_0051f19c } from './block_00510000.js';
import { FUN_00548b70, FUN_00548c78 } from './block_00540000.js';
import { FUN_00552112, FUN_00552ed2, FUN_00553379, FUN_005534bc, FUN_0055d8d8 } from './block_00550000.js';
import { FUN_00566584, FUN_0056baff, FUN_0056d289 } from './block_00560000.js';
import { FUN_00573e59 } from './block_00570000.js';
import { FUN_0059baf0, FUN_0059c276, FUN_0059d3c9, FUN_0059db08, FUN_0059db65, FUN_0059df8a } from './block_00590000.js';
import { FUN_0059dfb9, FUN_0059e0eb, FUN_0059e18b, FUN_0059e356, FUN_0059e585, FUN_0059e5c9 } from './block_00590000.js';
import { FUN_0059e6a9, FUN_0059e6ff, FUN_0059ea99, FUN_0059ec88, FUN_0059edf0, FUN_0059fb78 } from './block_00590000.js';
import { FUN_0059fc19, FUN_0059fd2a } from './block_00590000.js';
import { FUN_005a1c52, FUN_005a577e, FUN_005a5f34, FUN_005a632a, FUN_005a9abf, FUN_005a9afe } from './block_005A0000.js';
import { FUN_005adfa0, FUN_005ae052 } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2d39, FUN_005b2e69, FUN_005b496e, FUN_005b50ad, FUN_005b8931 } from './block_005B0000.js';
import { FUN_005b898b, FUN_005b89e4, FUN_005b8b1a, FUN_005b8b65, FUN_005b8ca6, FUN_005b8da4 } from './block_005B0000.js';
import { FUN_005b976d, FUN_005b9d81, FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0, FUN_005baec8 } from './block_005B0000.js';
import { FUN_005baee0, FUN_005bb024, FUN_005bb574, FUN_005bb9c0, FUN_005bc5da, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c5aeb, FUN_005c61b0, FUN_005c62ee, FUN_005c64da, FUN_005c656b, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005cef66, InvalidateObjectCache, delbuf } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d1f50, FUN_005d2004, FUN_005d225b, FUN_005d2279, FUN_005d2550 } from './block_005D0000.js';
import { FUN_005d2568, FUN_005d2590, FUN_005d25a8, FUN_005d268e, FUN_005d41e0, FUN_005d7c6e } from './block_005D0000.js';
import { FUN_005d8236, FUN_005d83d6, FUN_005d8476, FUN_005d8721, FUN_005dabc7, FUN_005dae6b } from './block_005D0000.js';
import { FUN_005db0d0, ~_Timevec } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0, __chdir, __strnicmp, _atexit } from './block_005F0000.js';
import { _atoi, _memset, _strchr, _strcmp, _strlen, _strncmp } from './block_005F0000.js';
import { _strncpy, operator_delete, operator_new } from './block_005F0000.js';
import { __ltoa, __strupr } from './block_00600000.js';
// Unresolved: XD_CloseConnection, XD_FlushSendBuffer, XD_LobbySendMessage, XD_OpenConnection

const DAT_00625a04 = globalThis.DAT_00625a04, DAT_00625d14 = globalThis.DAT_00625d14, DAT_00625d18 = globalThis.DAT_00625d18, DAT_00625d1c = globalThis.DAT_00625d1c, DAT_00625d20 = globalThis.DAT_00625d20, DAT_00625d24 = globalThis.DAT_00625d24;
const DAT_00625d28 = globalThis.DAT_00625d28, DAT_00625d2c = globalThis.DAT_00625d2c, DAT_00625d30 = globalThis.DAT_00625d30, DAT_00625d34 = globalThis.DAT_00625d34, DAT_00625d38 = globalThis.DAT_00625d38, DAT_00625d3c = globalThis.DAT_00625d3c;
const DAT_00625d40 = globalThis.DAT_00625d40, DAT_00625d44 = globalThis.DAT_00625d44, DAT_00625d48 = globalThis.DAT_00625d48, DAT_00625d4c = globalThis.DAT_00625d4c, DAT_00625d50 = globalThis.DAT_00625d50, DAT_00625d54 = globalThis.DAT_00625d54;
const DAT_00625d58 = globalThis.DAT_00625d58, DAT_00625d5c = globalThis.DAT_00625d5c, DAT_00625d60 = globalThis.DAT_00625d60, DAT_00625d64 = globalThis.DAT_00625d64, DAT_00625d68 = globalThis.DAT_00625d68, DAT_00625d6c = globalThis.DAT_00625d6c;
const DAT_00625d70 = globalThis.DAT_00625d70, DAT_00625e50 = globalThis.DAT_00625e50, DAT_00625e54 = globalThis.DAT_00625e54, DAT_00625e58 = globalThis.DAT_00625e58, DAT_00625e70 = globalThis.DAT_00625e70, DAT_00625e74 = globalThis.DAT_00625e74;
const DAT_00625e90 = globalThis.DAT_00625e90, DAT_00625efc = globalThis.DAT_00625efc, DAT_00625f1c = globalThis.DAT_00625f1c, DAT_00625f20 = globalThis.DAT_00625f20, DAT_00625f24 = globalThis.DAT_00625f24, DAT_00625f28 = globalThis.DAT_00625f28;
const DAT_00625f2c = globalThis.DAT_00625f2c, DAT_00627684 = globalThis.DAT_00627684, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_00628370 = globalThis.DAT_00628370, DAT_006283a0 = globalThis.DAT_006283a0;
const DAT_006359d4 = globalThis.DAT_006359d4, DAT_0063cc30 = globalThis.DAT_0063cc30, DAT_0063cc48 = globalThis.DAT_0063cc48, DAT_0063cd4c = globalThis.DAT_0063cd4c, DAT_0063ce50 = globalThis.DAT_0063ce50, DAT_0063cf54 = globalThis.DAT_0063cf54;
const DAT_0063d058 = globalThis.DAT_0063d058, DAT_0063d15c = globalThis.DAT_0063d15c, DAT_0063d260 = globalThis.DAT_0063d260, DAT_0063d364 = globalThis.DAT_0063d364, DAT_0063d468 = globalThis.DAT_0063d468, DAT_0063d56c = globalThis.DAT_0063d56c;
const DAT_0063d670 = globalThis.DAT_0063d670, DAT_0063d774 = globalThis.DAT_0063d774, DAT_0063e4c0 = globalThis.DAT_0063e4c0, DAT_0063e4f0 = globalThis.DAT_0063e4f0, DAT_0063e4f8 = globalThis.DAT_0063e4f8, DAT_0063eaa0 = globalThis.DAT_0063eaa0;
const DAT_0063eab8 = globalThis.DAT_0063eab8, DAT_0063eac0 = globalThis.DAT_0063eac0, DAT_0063eb10 = globalThis.DAT_0063eb10, DAT_0063eb58 = globalThis.DAT_0063eb58, DAT_0063edcc = globalThis.DAT_0063edcc, DAT_0063fc58 = globalThis.DAT_0063fc58;
const DAT_0063fe50 = globalThis.DAT_0063fe50, DAT_006442f8 = globalThis.DAT_006442f8, DAT_00644334 = globalThis.DAT_00644334, DAT_006465d8 = globalThis.DAT_006465d8, DAT_00646650 = globalThis.DAT_00646650, DAT_00647fa0 = globalThis.DAT_00647fa0;
const DAT_00647fdc = globalThis.DAT_00647fdc, DAT_006488d8 = globalThis.DAT_006488d8, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1bc = globalThis.DAT_0064b1bc, DAT_0064b1bd = globalThis.DAT_0064b1bd;
const DAT_0064b1c1 = globalThis.DAT_0064b1c1, DAT_0064b1c2 = globalThis.DAT_0064b1c2, DAT_0064b1c4 = globalThis.DAT_0064b1c4, DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1c6 = globalThis.DAT_0064b1c6, DAT_0064b1c7 = globalThis.DAT_0064b1c7;
const DAT_0064b1c8 = globalThis.DAT_0064b1c8, DAT_0064b1c9 = globalThis.DAT_0064b1c9, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b9a0 = globalThis.DAT_0064b9a0, DAT_0064b9c0 = globalThis.DAT_0064b9c0, DAT_0064bb08 = globalThis.DAT_0064bb08;
const DAT_0064bc62 = globalThis.DAT_0064bc62, DAT_0064bd12 = globalThis.DAT_0064bd12, DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c48c = globalThis.DAT_0064c48c, DAT_0064c6a0 = globalThis.DAT_0064c6a0, DAT_0064c6a2 = globalThis.DAT_0064c6a2;
const DAT_0064c6a6 = globalThis.DAT_0064c6a6, DAT_0064c6a8 = globalThis.DAT_0064c6a8, DAT_0064c6aa = globalThis.DAT_0064c6aa, DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1;
const DAT_0064c706 = globalThis.DAT_0064c706, DAT_0064c778 = globalThis.DAT_0064c778, DAT_0064c7b6 = globalThis.DAT_0064c7b6, DAT_0064c7f4 = globalThis.DAT_0064c7f4, DAT_0064ca92 = globalThis.DAT_0064ca92, DAT_0064f344 = globalThis.DAT_0064f344;
const DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f34d = globalThis.DAT_0064f34d, DAT_0064f35c = globalThis.DAT_0064f35c, DAT_0064f360 = globalThis.DAT_0064f360;
const DAT_0064f370 = globalThis.DAT_0064f370, DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f37b = globalThis.DAT_0064f37b, DAT_0064f37e = globalThis.DAT_0064f37e, DAT_0064f38a = globalThis.DAT_0064f38a, DAT_0064f38c = globalThis.DAT_0064f38c;
const DAT_0064f38e = globalThis.DAT_0064f38e, DAT_0064f390 = globalThis.DAT_0064f390, DAT_0064f391 = globalThis.DAT_0064f391, DAT_0064f392 = globalThis.DAT_0064f392, DAT_0064f393 = globalThis.DAT_0064f393, DAT_0064f394 = globalThis.DAT_0064f394;
const DAT_00654fe0 = globalThis.DAT_00654fe0, DAT_00655020 = globalThis.DAT_00655020, DAT_006554f8 = globalThis.DAT_006554f8, DAT_006554f9 = globalThis.DAT_006554f9, DAT_006554fa = globalThis.DAT_006554fa, DAT_006554fc = globalThis.DAT_006554fc;
const DAT_00655502 = globalThis.DAT_00655502, DAT_00655504 = globalThis.DAT_00655504, DAT_00655506 = globalThis.DAT_00655506, DAT_0065550c = globalThis.DAT_0065550c, DAT_00655b1e = globalThis.DAT_00655b1e, DAT_006560f0 = globalThis.DAT_006560f0;
const DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f9 = globalThis.DAT_006560f9, DAT_006560ff = globalThis.DAT_006560ff, DAT_0065610a = globalThis.DAT_0065610a;
const DAT_00679640 = globalThis.DAT_00679640, DAT_006a4f90 = globalThis.DAT_006a4f90, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad558 = globalThis.DAT_006ad558, DAT_006ad59c = globalThis.DAT_006ad59c, DAT_006ad5dc = globalThis.DAT_006ad5dc;
const DAT_006ad5fc = globalThis.DAT_006ad5fc, DAT_006ad7b2 = globalThis.DAT_006ad7b2, DAT_fffff2a0 = globalThis.DAT_fffff2a0, DAT_fffff598 = globalThis.DAT_fffff598, DAT_fffff69c = globalThis.DAT_fffff69c, DAT_fffff7a8 = globalThis.DAT_fffff7a8;
const DAT_fffffbac = globalThis.DAT_fffffbac, DAT_fffffbbc = globalThis.DAT_fffffbbc, DAT_fffffe74 = globalThis.DAT_fffffe74, DAT_fffffe84 = globalThis.DAT_fffffe84, DAT_fffffe94 = globalThis.DAT_fffffe94, DAT_fffffea4 = globalThis.DAT_fffffea4;
const DAT_fffffeb4 = globalThis.DAT_fffffeb4, DAT_fffffec4 = globalThis.DAT_fffffec4, DAT_fffffed4 = globalThis.DAT_fffffed4, DAT_fffffef8 = globalThis.DAT_fffffef8, DAT_ffffff30 = globalThis.DAT_ffffff30, DAT_ffffff38 = globalThis.DAT_ffffff38;
const DAT_ffffff80 = globalThis.DAT_ffffff80, DAT_ffffff90 = globalThis.DAT_ffffff90, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffffac = globalThis.DAT_ffffffac, DAT_ffffffbc = globalThis.DAT_ffffffbc, DAT_ffffffc4 = globalThis.DAT_ffffffc4;
const DAT_ffffffcc = globalThis.DAT_ffffffcc, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec;
const DAT_fffffff0 = globalThis.DAT_fffffff0, s_CITIES_00625e88 = globalThis.s_CITIES_00625e88, s_CITYMISC_00625e98 = globalThis.s_CITYMISC_00625e98, s_DEBUG_006359dc = globalThis.s_DEBUG_006359dc, s_EDITORSQ.GIF_00625ea4 = globalThis.s_EDITORSQ.GIF_00625ea4, s_GAMEPROFILE_00625d74 = globalThis.s_GAMEPROFILE_00625d74;
const s_IPOFGAME_00625a08 = globalThis.s_IPOFGAME_00625a08, s_NUMBER_00625e48 = globalThis.s_NUMBER_00625e48, s_STRING_00625e40 = globalThis.s_STRING_00625e40, s_SUPPLYNONE_00625f00 = globalThis.s_SUPPLYNONE_00625f00, s_SUPPLYSEARCH_00625f0c = globalThis.s_SUPPLYSEARCH_00625f0c, s_SUPPLYSHOW_00625ef0 = globalThis.s_SUPPLYSHOW_00625ef0;
const s_TILES.DLL_00625ed4 = globalThis.s_TILES.DLL_00625ed4, s_TITLE.GIF_00625ca4 = globalThis.s_TITLE.GIF_00625ca4, s_WAITINGFORSERVER_00625b24 = globalThis.s_WAITINGFORSERVER_00625b24, s_WAITINGFORSERVER_00625b38 = globalThis.s_WAITINGFORSERVER_00625b38, s_WAITINGFORSERVER_00625c24 = globalThis.s_WAITINGFORSERVER_00625c24, s_WAITINGONJOIN_00625cd0 = globalThis.s_WAITINGONJOIN_00625cd0;
const s_WAITINGONJOIN_00625cf8 = globalThis.s_WAITINGONJOIN_00625cf8, s_WAITTOJOIN_00625c70 = globalThis.s_WAITTOJOIN_00625c70, s_scredits.gif_00625ee0 = globalThis.s_scredits.gif_00625ee0;


 export function FUN_004201ef ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_004201fb ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00420207 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0042021d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00421bb0 ()

 {
  FUN_005d41e0();
  return;
}


 export function FUN_00421bd0 ()

 {
  FUN_005bb9c0();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Same */  /* Base */
 /* Name */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CHtmlStream::Realloc(unsigned */  /* char */
 /* *,unsigned */
 /* long) */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CMemFile::Realloc(unsigned */  /* char */  /* *,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Realloc (param_1)

 {
  FUN_005d83d6(param_1);
  return;
}


 export function FUN_00421c30 ()

 {
  FUN_005d8476();
  return;
}


 export function FUN_00421c60 ()

 {
  FUN_005d8721();
  return;
}


 export function FUN_00421ca0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((-1 < param_1)) {
    w32(((s32((in_ECX + 0x48), 0) + 0x18) + param_1 * 0xa4), 0, 1);
    FUN_005dabc7(s32((s32((in_ECX + 0x48), 0) + param_1 * 0xa4), 0));
  }
  return;
}


 export function FUN_00421d30 ()

 {
  FUN_004aef96(DAT_00679640);
  return;
}


 export function FUN_00421d60 (param_1, param_2)

 {
  FUN_005f22d0((DAT_0063cc48 + param_1 * 0x104), param_2);
  return;
}


 export function FUN_00421da0 (param_1, param_2)

 {
  w32((DAT_0063cc30 + param_1 * 4), 0, param_2);
  return;
}


 export function FUN_00421dd0 ()

 {
  FUN_0059dfb9(0, 0, 0, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */  /* CSocket::Create(unsigned */  /* int,int,char */  /* const */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Create (this, param_1, param_2, param_3)

 {
  let iVar1;

  iVar1 = FUN_0040ffe0(param_1, param_2, 0, param_3);
  return iVar1;
}


 export function FUN_00421e40 (param_1, param_2)

 {
  wv(DAT_00635a34, param_1);
  wv(DAT_00635a38, param_2);
  return;
}


 export function FUN_00421e70 (param_1, param_2)

 {
  FUN_00419100(DAT_006359d4, param_1, param_2);
  return;
}


 export function FUN_00421ea0 (param_1)

 {
  FUN_004190d0(DAT_006359d4, param_1);
  return;
}


 export function FUN_00421ed0 (param_1, param_2, param_3, param_4)

 {
  FUN_0051d63b(DAT_006359d4, param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_00421f10 (param_1)

 {
  FUN_00485208(DAT_00679640, param_1);
  return;
}


 export function FUN_00421f40 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return _MEM[(in_ECX + 0x1ef)];
}


 export function FUN_00421f70 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, 1);
  w32((in_ECX + 0x14c), 0, 0);
  w32((in_ECX + 0x174), 0, 0);
  return in_ECX;
}


 export function FUN_00421fad ()

 {
  FUN_0059baf0();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004222be)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00421fcd (param_1)

 {
  let iVar1;
  let sVar2;
  let pvVar3;
  let sVar4;
  let _Str2;
  let extraout_ECX;
  let unaff_FS_OFFSET;
  let local_11c8;
  let local_11a0;
  let local_1198;
  let local_d60;
  let local_a6c;
  let local_a68;
  let local_964;
  let local_860;
  let local_85c;
  let local_858;
  let local_320;
  let uStackY_48;
  let uStackY_44;
  let uStackY_40;
  let puStackY_3c;
  let pcStackY_38;
  let uStackY_34;
  let puStackY_30;
  let pcStackY_2c;
  let iVar5;
  let iVar6;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00424141;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  FUN_0059db08();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_0059c276();
  if ((param_1 === 3)) {
    _MEM[(extraout_ECX + 0x22)] = 0;
    iVar1 = XD_OpenConnection((extraout_ECX + 0x22), DAT_006ad8b8 * 0x3e8);
    if ((iVar1 < 0)) {
      if ((DAT_006ad2f8 !== 3)) {
        FUN_005d2279();
        FUN_005f22d0();
        pcStackY_2c = 0x4220cd;
        FUN_00410030();
      }
      local_8 = (UNNAMED << 8);
      FUN_00424129();
      local_8 = -1;
      FUN_00424135();
      FUN_0042414b();
      return;
    }
  }
  else {
    if ((param_1 === 0)) {
 LAB_00422109: :
      if ((DAT_006ad228 === -1));
      FUN_005f22d0();
      goto LAB_00422228;
    }
    FUN_0059baf0();
    pvVar3 = operator_new(0x2f4);
    local_8 = 2;
    if ((pvVar3 === 0)) {
      local_11c8 = 0;
    }
    else {
      local_11c8 = FUN_0059db08();
    }
    local_8 = 1;
    w32(extraout_ECX, 0, local_11c8);
    if ((s32(extraout_ECX, 0) === 0)) {
      pcStackY_2c = 7;
      puStackY_30 = 0x42271c;
      FUN_005dae6b();
    }
    w32(extraout_ECX, 0x5c, PTR_DAT_00635a48);
    FUN_004aef20();
    FUN_004af14b();
    wv(PTR_DAT_00635a48, (extraout_ECX + 0x54));
    FUN_0040bc40();
    FUN_0059e6ff();
    extraout_ECX = s32(extraout_ECX, 0);
    FUN_0040bbb0();
    FUN_0040bc10();
    FUN_0059e6a9();
    FUN_0059e585();
    pcStackY_2c = 0x4227e9;
    FUN_0059e5c9();
    extraout_ECX = s32(extraout_ECX, 0);
    FUN_0042486f();
    FUN_0040bbb0();
    FUN_0040bc10();
    FUN_004254a8();
    FUN_0059ea99();
    FUN_0042472a();
    FUN_005a577e();
    extraout_ECX = s32(extraout_ECX, 0);
    while ((-1 < iVar1)) {
      while ((iVar5 === 0)) {
        while ((s16((iVar1 + 0xb0), 0) !== 0)) {
          do {
            wv(DAT_006ad2f6, 1);
            FUN_00425607();
            iVar5 = FUN_0040bc80();
            wv(DAT_006ad2f6, 0);
            FUN_00425650();
            iVar1 = DAT_006c31d4;
            if ((iVar5 < 0)) {
              wv(PTR_DAT_00635a48, s32(extraout_ECX, 0x5c));
              FUN_004253ef();
              if ((s32(extraout_ECX, 0) !== 0)) {
                FUN_00426f30();
              }
              w32(extraout_ECX, 0, 0);
              _MEM[(extraout_ECX + 0x22)] = 0;
              local_8 = (UNNAMED << 8);
              FUN_00424129();
              local_8 = -1;
              FUN_00424135();
              FUN_0042414b();
              return;
            }
            for (/* cond: (s32((iVar1 + 0x2c), 0) !== iVar5) */); (iVar1 = (iVar1 !== 0) && (iVar1 = (iVar1 + 0x2c))); iVar1 = s32((iVar1 + 0x20), 0)
                ) {
            }
          } while ((iVar1 === 0));
          local_320 = 0;
          iVar5 = 0;
          local_85c = u8(_MEM[(iVar1 + 0xb4)]);
          for (/* cond: (local_320 < 8) */); local_320 = (local_320 < 8); local_320 = (local_320 + 1)) {
            if (((local_85c & 1) !== 0)) {
              iVar5 = (iVar5 + 1);
            }
            local_85c = (local_85c >> 1);
          }
          local_320 = 0;
          iVar6 = 0;
          local_85c = u8(_MEM[(iVar1 + 0xb5)]);
          for (/* cond: (local_320 < 8) */); local_320 = (local_320 < 8); local_320 = (local_320 + 1)) {
            if (((local_85c & 1) !== 0)) {
              iVar6 = (iVar6 + 1);
            }
            local_85c = (local_85c >> 1);
          }
          if ((s16((iVar1 + 0xb0), 0) !== 0)) {
            pcStackY_2c = 0x422a88;
            FUN_00410030();
          }
        }
        sVar4 = _strlen((iVar1 + 0x30));
        sVar2 = _strlen(PTR_s_5.4.0f_Multiplayer_26-March-99_0062765c);
        if ((iVar5 === 0));
        FUN_005f22d0();
        FUN_005f22d0();
        pcStackY_2c = 0x422b23;
        FUN_00410030();
        wv(PTR_DAT_00635a48, (extraout_ECX + 0x54));
      }
      if ((param_1 === 3)) {
        _MEM[(extraout_ECX + 0x22)] = 0;
      }
      else {
        FUN_005f22d0();
      }
      FUN_005f22d0();
      FUN_005f22d0();
      wv(DAT_006d1160, s16((iVar1 + 0x11a), 0));
      wv(DAT_006d1162, s16((iVar1 + 0x11c), 0));
      if ((param_1 === 3)) {
        wv(DAT_006ad57c, 0);
      }
      else {
        FUN_005f22d0();
      }
      FUN_005f22d0();
      FUN_005f22d0();
      FUN_005f22d0();
      iVar1 = XD_OpenConnection((extraout_ECX + 0x22), DAT_006ad8b8 * 0x3e8);
      if ((-1 < iVar1));
      FUN_005f22d0();
      pcStackY_2c = 0x422cc2;
      FUN_00410030();
    }
    FUN_0059db65();
    wv(PTR_DAT_00635a48, s32(extraout_ECX, 0x5c));
    FUN_004253ef();
    if ((s32(extraout_ECX, 0) !== 0)) {
      FUN_00426f30();
    }
    w32(extraout_ECX, 0, 0);
    FUN_00419b80();
  }
 LAB_00422d3d: :
  wv(DAT_00635a3c, LAB_00402b58);
  _DAT_006ad674 = FUN_00421bb0();
  if ((param_1 !== 0)) {
    FUN_0059c276();
  }
  FUN_005f22d0();
  pcStackY_2c = s_WAITINGFORSERVER_00625c24;
  puStackY_30 = 0x422d89;
  iVar1 = FUN_00426fb0();
  if ((iVar1 === -1)) {
    pcStackY_2c = 0;
    puStackY_30 = 0;
    uStackY_34 = 0;
    pcStackY_38 = 0;
    puStackY_3c = 0;
    uStackY_40 = 0;
    uStackY_44 = 0x32;
    uStackY_48 = 0x422db2;
    FUN_0046b14d();
    XD_FlushSendBuffer(0x2bf20);
    local_8 = (UNNAMED << 8);
    FUN_00424129();
    local_8 = -1;
    FUN_00424135();
    FUN_0042414b();
    return;
  }
  if ((DAT_006c9024 !== 0)) {
    FUN_0040ff60();
    FUN_005f22d0();
    if ((DAT_006c8ff4 === 0)) {
      if ((DAT_006c900c === 0)) {
        pcStackY_2c = 0x422e9e;
        FUN_00410030();
      }
      else {
        pcStackY_2c = 0x422e85;
        FUN_00410030();
      }
    }
    else {
      pcStackY_2c = 0x422e5f;
      FUN_00410030();
    }
    local_8 = (UNNAMED << 8);
    FUN_00424129();
    local_8 = -1;
    FUN_00424135();
    FUN_0042414b();
    return;
  }
  if ((iVar1 === -2)) {
    FUN_005f22d0();
    FUN_005f22d0();
    pcStackY_2c = 0x422f1c;
    FUN_00410030();
    local_8 = (UNNAMED << 8);
    FUN_00424129();
    local_8 = -1;
    FUN_00424135();
    FUN_0042414b();
    return;
  }
  FUN_004b21d7();
  wv(DAT_00635a3c, LAB_004039e5);
  _DAT_006ad674 = FUN_00421bb0();
  if ((param_1 !== 0)) {
    FUN_0059c276();
  }
  FUN_005f22d0();
  pcStackY_2c = s_WAITTOJOIN_00625c70;
  puStackY_30 = 0x422f9a;
  iVar1 = FUN_00426fb0();
  if ((DAT_006c900c === 0)) {
    if ((sVar4 !== 0)) {
      FUN_005f22d0();
      FUN_005f22e0();
      local_860 = __chdir(DAT_fffff69c);
      if ((local_860 < 0)) {
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = 0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x32;
        uStackY_48 = 0x4230e9;
        FUN_0046b14d();
        XD_FlushSendBuffer(0x2bf20);
        FUN_0040ff60();
        FUN_0040ff60();
        pcStackY_2c = 0x42312e;
        FUN_00410030();
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      FUN_005f22e0();
      FUN_0041e864();
      if (((DAT_00655af0 & 0x80) !== 0)) {
        FUN_0059db08();
        local_8 = 3;
        FUN_005c64da();
        local_8 = ((UNNAMED << 8) | 4);
        for (/* cond: (local_11a0 < 8) */); local_11a0 = (local_11a0 < 8); local_11a0 = (local_11a0 + 1)) {
          if (((s16((DAT_0064c6a0 + local_11a0 * 0x594), 0) & 0x200) === 0)) {
            _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30] = 0;
          }
          else {
            _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30] = 1;
          }
          _MEM[DAT_0064ca92 + local_11a0 * 0x594] = _MEM[DAT_0064c6a6 + local_11a0 * 0x594];
          if ((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30] !== 0)) {
            _MEM[DAT_0064ca92 + local_11a0 * 0x594] = (_MEM[DAT_0064ca92 + local_11a0 * 0x594] + 0x15);
          }
          _Str2 = FUN_00428b0c();
          iVar1 = _strcmp((DAT_0064bd12 + local_11a0 * 0xf2), _Str2);
          if ((iVar1 === 0)) {
            for (/* cond: (local_a6c < 7) */); local_a6c = (local_a6c < 7); local_a6c = (local_a6c + 1)) {
              for (/* cond: (local_1198 < 2) */); local_1198 = (local_1198 < 2); local_1198 = (local_1198 + 1)) {
                w16((DAT_0065550c + (local_a6c * 4 + (((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30 + local_1198 * 2))), 0, ((s32((DAT_00654fe0 + (local_1198 * 4 + local_a6c * 8)), 0)) & 0xFFFF));
              }
            }
          }
          if ((0 < s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            w16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          }
          if ((0 < s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            w16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          }
          if ((0 < s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            w16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_11a0 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          }
        }
        if ((DAT_0062b420 === 0)) {
          FUN_0046e6a9();
          pcStackY_2c = 0x6b;
          puStackY_30 = 0x42361a;
          FUN_0046e020();
        }
        FUN_00484d52();
        __chdir(DAT_0064bb08);
        iVar1 = FUN_00415133();
        if ((iVar1 !== 0)) {
          pcStackY_2c = s_TITLE.GIF_00625ca4;
          puStackY_30 = 0x423661;
          iVar1 = FUN_005bf071();
          if ((iVar1 !== 0)) {
            FUN_00419be0();
            FUN_00419ba0();
            FUN_00426f80();
            FUN_00419b80();
            FUN_00421bd0();
          }
        }
        __chdir(DAT_00655020);
        FUN_005f22d0();
        FUN_005f22e0();
        FUN_005f22e0();
        pcStackY_2c = 0x4236fa;
        FUN_004729ab();
        if ((DAT_0062b420 !== 0)) {
          pcStackY_2c = 0x6a;
          puStackY_30 = 0x423717;
          FUN_0046e020();
        }
        wv(DAT_00655aea, (DAT_0064bc1e & -0x8001));
        wv(DAT_00655af2, DAT_0064bc22);
        FUN_0040ff60();
        FUN_00421da0();
        FUN_0040bbb0();
        FUN_00484fec();
        FUN_00421f10();
        FUN_0040ff60();
        FUN_0040bbb0();
        if ((DAT_0064bcb8 === 0)) {
          FUN_00421f10();
        }
        else {
          FUN_00484fec();
          FUN_00421f10();
        }
        FUN_0040ff60();
        if ((DAT_0062b420 !== 0)) {
          FUN_00419c8b();
        }
        wv(DAT_00635a3c, LAB_00403c74);
        _DAT_006cec80 = FUN_00421bb0();
        FUN_00421dd0();
        pcStackY_2c = 0x423827;
        iVar1 = Create(DAT_fffff2a0, DAT_fffff598, 0x625cb4, 0x4008001);
        if ((iVar1 === 0)) {
          iVar1 = ((DAT_00655afe) << 16 >> 16);
          if ((s8(_MEM[DAT_006560f7 + iVar1 * 0x20]) === ((DAT_0064bcba) << 16 >> 16))) {
            pcStackY_2c = 0x4238c4;
            FUN_0059ec88();
          }
          iVar1 = FUN_0040bc80();
          if ((iVar1 < 0)) {
            pcStackY_2c = 0x6a;
            puStackY_30 = 0x4238e6;
            FUN_0046e020();
            pcStackY_2c = 0x5a;
            puStackY_30 = 0x423903;
            FUN_005bf5e1();
            FUN_00419be0();
            FUN_00419ba0();
            FUN_00419b80();
            pcStackY_2c = 0;
            puStackY_30 = 0;
            uStackY_34 = 0;
            pcStackY_38 = 0;
            puStackY_3c = 0;
            uStackY_40 = 0;
            uStackY_44 = 0x32;
            uStackY_48 = 0x42393f;
            FUN_0046b14d();
            pcStackY_2c = 0;
            puStackY_30 = 0;
            uStackY_34 = 0;
            pcStackY_38 = DAT_006d1da0;
            puStackY_3c = 0;
            uStackY_40 = 0;
            uStackY_44 = 0x31;
            uStackY_48 = 0x42395f;
            FUN_0046b14d();
            XD_FlushSendBuffer(0x2bf20);
            local_8 = 3;
            FUN_00424101();
            local_8 = 1;
            FUN_0042410d();
            local_8 = (((local_8) >> 8) << 8);
            FUN_00424129();
            local_8 = -1;
            FUN_00424135();
            FUN_0042414b();
            return;
          }
        }
        else {
          iVar1 = FUN_00421e70();
          if ((iVar1 < 0)) {
            pcStackY_2c = 0;
            puStackY_30 = 0;
            uStackY_34 = 0;
            pcStackY_38 = 0;
            puStackY_3c = 0;
            uStackY_40 = 0;
            uStackY_44 = 0x32;
            uStackY_48 = 0x4239e0;
            FUN_0046b14d();
            pcStackY_2c = 0;
            puStackY_30 = 0;
            uStackY_34 = 0;
            pcStackY_38 = DAT_006d1da0;
            puStackY_3c = 0;
            uStackY_40 = 0;
            uStackY_44 = 0x31;
            uStackY_48 = 0x423a00;
            FUN_0046b14d();
            XD_FlushSendBuffer(0x2bf20);
            local_8 = 3;
            FUN_00424101();
            local_8 = 1;
            FUN_0042410d();
            local_8 = (((local_8) >> 8) << 8);
            FUN_00424129();
            local_8 = -1;
            FUN_00424135();
            FUN_0042414b();
            return;
          }
        }
        local_8 = 3;
        FUN_00424101();
        local_8 = 1;
        FUN_0042410d();
      }
    }
    FUN_0049882b();
    iVar1 = FUN_004259a6();
    if ((iVar1 === -1)) {
      pcStackY_2c = 0;
      puStackY_30 = 0;
      uStackY_34 = 0;
      pcStackY_38 = 0;
      puStackY_3c = 0;
      uStackY_40 = 0;
      uStackY_44 = 0x32;
      uStackY_48 = 0x423a8f;
      FUN_0046b14d();
      XD_FlushSendBuffer(0x2bf20);
      local_8 = (UNNAMED << 8);
      FUN_00424129();
      local_8 = -1;
      FUN_00424135();
      FUN_0042414b();
      return;
    }
    if ((DAT_006ad640 < 2)) {
      pcStackY_2c = 0x423bce;
      iVar1 = FUN_0051f19c();
      if ((iVar1 !== 0)) {
        if ((DAT_006ad6ac === 2)) {
          pcStackY_2c = 0x6a;
          puStackY_30 = 0x423bf6;
          FUN_0046e020();
          pcStackY_2c = 0x5a;
          puStackY_30 = 0x423c13;
          FUN_005bf5e1();
          FUN_00419be0();
          FUN_00419ba0();
          FUN_00419b80();
        }
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = 0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x32;
        uStackY_48 = 0x423c4f;
        FUN_0046b14d();
        XD_FlushSendBuffer(0x2bf20);
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
    }
    else {
      iVar1 = FUN_00445e46();
      if ((iVar1 !== 0)) {
        if ((DAT_006ad6ac === 2)) {
          pcStackY_2c = 0x6a;
          puStackY_30 = 0x423b27;
          FUN_0046e020();
          pcStackY_2c = 0x5a;
          puStackY_30 = 0x423b44;
          FUN_005bf5e1();
          FUN_00419be0();
          FUN_00419ba0();
          FUN_00419b80();
        }
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = 0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x32;
        uStackY_48 = 0x423b80;
        FUN_0046b14d();
        XD_FlushSendBuffer(0x2bf20);
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
    }
    pcStackY_2c = 0;
    puStackY_30 = 0;
    uStackY_34 = 0;
    pcStackY_38 = 0;
    puStackY_3c = 0;
    uStackY_40 = 0;
    uStackY_44 = 0x2e;
    uStackY_48 = 0x423ca2;
    FUN_0046b14d();
    FUN_004b21d7();
    wv(DAT_00635a3c, LAB_00402617);
    _DAT_006ad674 = FUN_00421bb0();
    FUN_0059c276();
    FUN_005f22d0();
    pcStackY_2c = s_WAITINGONJOIN_00625cd0;
    puStackY_30 = 0x423cec;
    iVar1 = FUN_00426fb0();
    if ((iVar1 !== -1)) {
      if ((DAT_006c9010 !== 0)) {
        if ((DAT_006ad6ac === 2)) {
          pcStackY_2c = 0x6a;
          puStackY_30 = 0x423e03;
          FUN_0046e020();
          pcStackY_2c = 0x5a;
          puStackY_30 = 0x423e20;
          FUN_005bf5e1();
          FUN_00419be0();
          FUN_00419ba0();
          FUN_00419b80();
        }
        FUN_0040ff60();
        FUN_005f22d0();
        if ((DAT_006c900c === 0)) {
          pcStackY_2c = 0x423ea3;
          FUN_00410030();
        }
        else {
          pcStackY_2c = 0x423e8a;
          FUN_00410030();
        }
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      wv(DAT_006c9038, 0);
      wv(DAT_00635a3c, LAB_0040230b);
      _DAT_006ad674 = FUN_00421bb0();
      FUN_005f22d0();
      pcStackY_2c = s_WAITINGONJOIN_00625cf8;
      puStackY_30 = 0x423f17;
      iVar1 = FUN_00426fb0();
      if ((iVar1 === -1)) {
        if ((DAT_006ad6ac === 2)) {
          pcStackY_2c = 0x6a;
          puStackY_30 = 0x423f44;
          FUN_0046e020();
          pcStackY_2c = 0x5a;
          puStackY_30 = 0x423f61;
          FUN_005bf5e1();
          FUN_00419be0();
          FUN_00419ba0();
          FUN_00419b80();
        }
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = 0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x32;
        uStackY_48 = 0x423f9d;
        FUN_0046b14d();
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = DAT_006d1da0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x31;
        uStackY_48 = 0x423fbd;
        FUN_0046b14d();
        XD_FlushSendBuffer(0x2bf20);
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      if ((DAT_006c900c === 0)) {
        FUN_0059c276();
        FUN_004a2020();
        FUN_00419c8b();
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      if ((DAT_006ad6ac === 2)) {
        pcStackY_2c = 0x6a;
        puStackY_30 = 0x424021;
        FUN_0046e020();
        pcStackY_2c = 0x5a;
        puStackY_30 = 0x42403e;
        FUN_005bf5e1();
        FUN_00419be0();
        FUN_00419ba0();
        FUN_00419b80();
      }
      FUN_0040ff60();
      FUN_005f22d0();
      pcStackY_2c = 0x42409b;
      FUN_00410030();
      local_8 = (UNNAMED << 8);
      FUN_00424129();
      local_8 = -1;
      FUN_00424135();
      FUN_0042414b();
      return;
    }
    if ((DAT_006ad6ac === 2)) {
      pcStackY_2c = 0x6a;
      puStackY_30 = 0x423d19;
      FUN_0046e020();
      pcStackY_2c = 0x5a;
      puStackY_30 = 0x423d36;
      FUN_005bf5e1();
      FUN_00419be0();
      FUN_00419ba0();
      FUN_00419b80();
    }
    pcStackY_2c = 0;
    puStackY_30 = 0;
    uStackY_34 = 0;
    pcStackY_38 = 0;
    puStackY_3c = 0;
    uStackY_40 = 0;
    uStackY_44 = 0x32;
    uStackY_48 = 0x423d72;
    FUN_0046b14d();
    pcStackY_2c = 0;
    puStackY_30 = 0;
    uStackY_34 = 0;
    pcStackY_38 = DAT_006d1da0;
    puStackY_3c = 0;
    uStackY_40 = 0;
    uStackY_44 = 0x31;
    uStackY_48 = 0x423d92;
    FUN_0046b14d();
    XD_FlushSendBuffer(0x2bf20);
    local_8 = (UNNAMED << 8);
    FUN_00424129();
    local_8 = -1;
    FUN_00424135();
    FUN_0042414b();
    return;
  }
  if ((iVar1 === -1)) {
    pcStackY_2c = 0;
    puStackY_30 = 0;
    uStackY_34 = 0;
    pcStackY_38 = 0;
    puStackY_3c = 0;
    uStackY_40 = 0;
    uStackY_44 = 0x32;
    uStackY_48 = 0x422fda;
    FUN_0046b14d();
  }
  else {
    FUN_0040ff60();
    FUN_005f22d0();
    pcStackY_2c = 0x42301c;
    FUN_00410030();
  }
  XD_FlushSendBuffer(0x2bf20);
  local_8 = (UNNAMED << 8);
  FUN_00424129();
  local_8 = -1;
  FUN_00424135();
  FUN_0042414b();
  return;
 code_r0x00422119: :
  pcStackY_2c = 0;
  puStackY_30 = DAT_00625a04;
  uStackY_34 = 0x1f;
  pcStackY_38 = s_IPOFGAME_00625a08;
  puStackY_3c = DAT_006359d4;
  uStackY_40 = 0x42213d;
  FUN_005a632a();
  iVar1 = FUN_005a5f34();
  if ((iVar1 === -1)) {
    _MEM[(extraout_ECX + 0x22)] = 0;
    local_8 = (UNNAMED << 8);
    FUN_00424129();
    local_8 = -1;
    FUN_00424135();
    FUN_0042414b();
    return;
  }
  sVar4 = _strlen(DAT_fffff7a8);
  if ((sVar4 !== 0)) {
    FUN_005f22d0();
    FUN_005f22d0();
 LAB_00422228: :
    iVar1 = XD_OpenConnection((extraout_ECX + 0x22), DAT_006ad8b8 * 0x3e8);
    if ((iVar1 < 0)) {
      FUN_005d2279();
      FUN_005f22d0();
      pcStackY_2c = 0x422290;
      FUN_00410030();
    }
    else {
      if ((DAT_006ad228 !== -1)) {
        FUN_005d225b();
        iVar1 = XD_LobbySendMessage(1);
        if ((iVar1 !== 0)) {
          FUN_005d2279();
        }
        FUN_005d225b();
        iVar1 = XD_LobbySendMessage(3);
        if ((iVar1 !== 0)) {
          FUN_005d2279();
        }
      }
      _DAT_006ad674 = FUN_00421bb0();
      wv(DAT_00635a3c, LAB_004022a2);
      FUN_005f22d0();
      iVar5 = 0x2000001;
      pcStackY_2c = s_WAITINGFORSERVER_00625b24;
      puStackY_30 = 0x4223a6;
      iVar1 = FUN_00426fb0();
      if ((iVar1 === -1)) {
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      if ((DAT_006ad300 !== -1)) {
        FUN_004b21d7();
        FUN_0059c276();
        pcStackY_2c = 0;
        puStackY_30 = 0;
        uStackY_34 = 0;
        pcStackY_38 = 0;
        puStackY_3c = 0;
        uStackY_40 = 0;
        uStackY_44 = 0x12;
        uStackY_48 = 0x422410;
        FUN_0046b14d();
        wv(DAT_00635a3c, LAB_0040113b);
        FUN_005f22d0();
        pcStackY_2c = s_WAITINGFORSERVER_00625b38;
        puStackY_30 = 0x422446;
        iVar1 = FUN_00426fb0();
        if ((iVar1 === -1)) {
          pcStackY_2c = 0;
          puStackY_30 = 0;
          uStackY_34 = 0;
          pcStackY_38 = 0;
          puStackY_3c = 0;
          uStackY_40 = 0;
          uStackY_44 = 0x32;
          uStackY_48 = 0x42246f;
          FUN_0046b14d();
          XD_FlushSendBuffer(0x2bf20);
          local_8 = (UNNAMED << 8);
          FUN_00424129();
          local_8 = -1;
          FUN_00424135();
          FUN_0042414b();
          return;
        }
        if ((DAT_006c900c !== 0)) {
          FUN_0040ff60();
          FUN_005f22d0();
          if ((DAT_006c8ff4 === 0)) {
            pcStackY_2c = 0x422528;
            FUN_00410030();
          }
          else {
            pcStackY_2c = 0x42250f;
            FUN_00410030();
          }
          local_8 = (UNNAMED << 8);
          FUN_00424129();
          local_8 = -1;
          FUN_00424135();
          FUN_0042414b();
          return;
        }
        sVar4 = _strlen(DAT_006ad5fc);
        sVar2 = _strlen(PTR_s_5.4.0f_Multiplayer_26-March-99_0062765c);
        if ((iVar1 !== 0)) {
          FUN_005f22d0();
          FUN_005f22d0();
          pcStackY_2c = 0x4225e3;
          FUN_00410030();
          local_8 = (UNNAMED << 8);
          FUN_00424129();
          local_8 = -1;
          FUN_00424135();
          FUN_0042414b();
          return;
        }
        goto LAB_00422d3d;
      }
      if ((3 < iVar5)) {
        pcStackY_2c = 0x422656;
        FUN_00410030();
        local_8 = (UNNAMED << 8);
        FUN_00424129();
        local_8 = -1;
        FUN_00424135();
        FUN_0042414b();
        return;
      }
      XD_CloseConnection();
    }
  }
  goto LAB_00422109;
}


 export function FUN_00424101 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0042410d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00424129 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00424135 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0042414b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0042415c ()

 {
  FUN_0047e94e(1, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042417a ()

 {
  FUN_00421bb0();
  FUN_0047e94e(1, 0);
  if ((DAT_006c9024 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004241f8 ()

 {
  let iVar1;
  let sVar2;
  let pcVar3;
  let pcVar4;

  iVar1 = FUN_00421bb0();
  iVar1 = (iVar1 - DAT_006ad674);
  FUN_0047e94e(1, 0);
  if ((DAT_006c900c === 0)) {
    if ((2 < iVar1)) {
      pcVar4 = s32((s32((s32(DAT_006ad678, 0x8c) + 0x1c), 0) + 8), 0);
      sVar2 = _strlen(pcVar4);
      pcVar3 = _strchr(pcVar4, 0x3e);
      if (((pcVar4 + (sVar2 - 1)) === pcVar3)) {
        _MEM[pcVar3] = 0x3c;
      }
      else {
        _MEM[pcVar3] = 0x2d;
        _MEM[pcVar3 + 1] = 0x3e;
      }
      pcVar3 = _strchr(pcVar4, 0x3c);
      if ((pcVar3 === 0)) {
        pcVar4 = _strchr(pcVar4, 0x3e);
        _MEM[pcVar4 + -1] = 0x3c;
      }
      else if ((pcVar3 === pcVar4)) {
        _MEM[pcVar3] = 0x3e;
      }
      else {
        _MEM[pcVar3] = 0x2d;
        _MEM[pcVar3 + -1] = 0x3c;
      }
      FUN_005a577e();
      _DAT_006ad674 = FUN_00421bb0();
    }
  }
  else {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_0042433c ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006c9010 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_0042439c ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006c900c !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_004243ef ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006c8ff4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042444f ()

 {
  let iVar1;

  iVar1 = FUN_00421bb0();
  iVar1 = (iVar1 - DAT_006ad674);
  FUN_0047e94e(1, 0);
  if ((0x4d8 < iVar1)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  else if ((DAT_006ad300 !== -1)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_004244e0 (in_ECX)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005a1c52(0);
  FUN_0040fd40(0, (iVar1 + -1));
  uVar2 = FUN_00424688((in_ECX + 2), (in_ECX + 0xa));
  w32((s32(in_ECX, 0) + 0x220), 0, uVar2);
  if ((iVar1 < 0xb)) {
    w32((s32(in_ECX, 0) + 0x210), 0, s32(in_ECX, 0x53));
  }
  else {
    uVar2 = FUN_00424688((in_ECX + 0x12), (in_ECX + 0x1a));
    w32((s32(in_ECX, 0) + 0x210), 0, uVar2);
  }
  if ((s32((s32(in_ECX, 0) + 0x1b8), 0) !== 0)) {
    iVar3 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x210), 0));
    iVar1 = s32((s32(in_ECX, 0) + 0x5c), 0);
    iVar4 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x220), 0));
    if (((iVar1 + iVar3) <= iVar4)) {
      iVar1 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x220), 0));
      uVar2 = FUN_0059fc19(((iVar1 - s32((s32(in_ECX, 0) + 0x5c), 0)) + 1));
      w32((s32(in_ECX, 0) + 0x210), 0, uVar2);
    }
    iVar1 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x210), 0));
    iVar3 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x220), 0));
    if ((iVar3 < iVar1)) {
      w32((s32(in_ECX, 0) + 0x210), 0, s32((s32(in_ECX, 0) + 0x220), 0));
    }
  }
  uVar2 = FUN_0059fb78(s32((s32(in_ECX, 0) + 0x210), 0));
  FUN_0040fcf0(uVar2);
  return;
}


 export function FUN_00424688 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = s32((in_ECX + 0x14c), 0);
  local_8 = DAT_006c31d4;
  while ((iVar1 === 0)) {
    if ((local_8 === 0)) {
      return s32((in_ECX + 0x14c), 0);
    }
    iVar1 = _strcmp((local_8 + 0x70), param_1);
    if ((iVar1 === 0));
    local_8 = s32((local_8 + 0x20), 0);
  }
  return local_c;
}


 export function FUN_0042472a (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((DAT_006c31d4 === 0)) {
    _MEM[(in_ECX + 2)] = 0;
    _MEM[(in_ECX + 0xa)] = 0;
    _MEM[(in_ECX + 0x12)] = 0;
    _MEM[(in_ECX + 0x1a)] = 0;
  }
  else {
    FUN_004247b2(s32((s32(in_ECX, 0) + 0x220), 0), (in_ECX + 2), (in_ECX + 0xa));
    FUN_004247b2(s32((s32(in_ECX, 0) + 0x210), 0), (in_ECX + 0x12), (in_ECX + 0x1a));
  }
  return;
}


 export function FUN_004247b2 (param_1, param_2, param_3)

 {
  let local_c;
  let local_8;

  for (/* cond: (s32((param_1 + 4), 0) !== s32((local_8 + 0x2c), 0)) */); (local_8 = (local_8 !== 0) && (param_1 = (param_1 + 4)))
      ; local_8 = s32((local_8 + 0x20), 0)) {
  }
  if ((local_8 === 0)) {
    local_8 = DAT_006c31d4;
    for (/* cond: (local_c !== 0) */); (local_8 = (local_8 + 0x20) && (local_c = (local_c !== 0)));
        local_c = (local_c + -1)) {
      local_8 = s32((local_8 + 0x20), 0);
    }
  }
  FUN_005f22d0(param_2, (local_8 + 0x70));
  FUN_005f22d0(param_3, (local_8 + 0x90));
  return;
}


 export function FUN_0042486f (in_ECX)

 {
  let iVar1;
  let piVar2;
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let extraout_EAX_02;
  let extraout_EAX_03;
  let extraout_EAX_04;
  let extraout_EAX_05;
  let extraout_EAX_06;
  // in_ECX promoted to parameter;

  FUN_0059fd2a();
  iVar1 = ((s32((s32(in_ECX, 0) + 0xd0), 0) + s32((s32(in_ECX, 0) + 0xb8), 0)) + 2);
  piVar2 = FUN_0059e18b(DAT_00625d14, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4a, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX);
  piVar2 = FUN_0059e18b(DAT_00625d18, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4b, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_00);
  piVar2 = FUN_0059e18b(DAT_00625d1c, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4c, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_01);
  piVar2 = FUN_0059e18b(DAT_00625d20, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4d, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_02);
  piVar2 = FUN_0059e18b(DAT_00625d24, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4e, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_03);
  piVar2 = FUN_0059e18b(DAT_00625d28, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x4f, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_04);
  piVar2 = FUN_0059e18b(DAT_00625d2c, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x50, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  iVar1 = (iVar1 + extraout_EAX_05);
  piVar2 = FUN_0059e18b(DAT_00625d30, 0xe6, iVar1, 0x80, 0);
  w32(in_ECX, 0x51, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  piVar2 = FUN_0059e18b(DAT_00625d34, 0xe6, (iVar1 + extraout_EAX_06), 0x80, 0);
  w32(in_ECX, 0x52, s32(piVar2, 0));
  in_ECX = s32(in_ECX, 0);
  return;
}


 export function FUN_00424ae9 ()

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_118;
  let local_114;
  let local_110;
  let local_108;
  let local_f3;
  let local_8;

  local_8 = DAT_006c31d4;
  if ((DAT_006c31d4 === 0)) {
    FUN_0059e0eb(s32(DAT_006ad108, 0x4a), DAT_00625d48);
    FUN_0059e0eb(s32(DAT_006ad108, 0x4b), DAT_00625d4c);
    FUN_0059e0eb(s32(DAT_006ad108, 0x4c), DAT_00625d50);
    FUN_0059e0eb(s32(DAT_006ad108, 0x4d), DAT_00625d54);
    FUN_0059e0eb(s32(DAT_006ad108, 0x4e), DAT_00625d58);
    FUN_0059e0eb(s32(DAT_006ad108, 0x4f), DAT_00625d5c);
    FUN_0059e0eb(s32(DAT_006ad108, 0x50), DAT_00625d60);
    FUN_0059e0eb(s32(DAT_006ad108, 0x51), DAT_00625d64);
    FUN_0059e0eb(s32(DAT_006ad108, 0x52), DAT_00625d68);
  }
  else {
    for (/* cond: (s32((local_8 + 0x2c), 0) !== s32((s32((s32(DAT_006ad108, 0) + 0x220), 0) + 4), 0)) */); (local_8 = (local_8 !== 0) &&
           (local_8 = (local_8 + 0x2c)));
        local_8 = s32((local_8 + 0x20), 0)) {
    }
    if ((local_8 !== 0)) {
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x26f);
      FUN_004aef36(DAT_fffffef8);
      FUN_005f22e0(DAT_fffffef8, (local_8 + 0x70));
      FUN_004aef36(DAT_fffffef8);
      FUN_004af01a(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, (u8((s16((local_8 + 0xb0), 0) === 0)) + 0x277));
      FUN_004af03b(DAT_fffffef8);
      FUN_0059e0eb(s32(DAT_006ad108, 0x4a), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x270);
      FUN_004aef36(DAT_fffffef8);
      FUN_005f22e0(DAT_fffffef8, (local_8 + 0x90));
      FUN_0059e0eb(s32(DAT_006ad108, 0x4b), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      sVar1 = _strlen((local_8 + 0xbc));
      if ((sVar1 === 0)) {
        FUN_004af14b(DAT_fffffef8, 0x34c);
      }
      else {
        FUN_005f22d0(DAT_fffffef8, (local_8 + 0xbc));
      }
      sVar1 = _strlen(DAT_fffffef8);
      if ((0x19 < sVar1)) {
        local_f3 = 0;
      }
      FUN_004aef36(DAT_fffffef8);
      FUN_004af01a(DAT_fffffef8);
      wv(DAT_00655af0, s16((local_8 + 0x110), 0));
      wv(DAT_00655afc, s16((local_8 + 0x112), 0));
      wv(DAT_0064bcb4, s16((local_8 + 0x114), 0));
      wv(DAT_0064bcb6, s16((local_8 + 0x116), 0));
      wv(DAT_00655b08, _MEM[(local_8 + 0xb2)]);
      uVar2 = FUN_00484fec(((s16((local_8 + 0x118), 0)) << 16 >> 16));
      FUN_00485208(DAT_fffffef8, uVar2);
      FUN_004af03b(DAT_fffffef8);
      FUN_0059e0eb(s32(DAT_006ad108, 0x4c), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, (u8(_MEM[(local_8 + 0xb2)]) + 0x279));
      FUN_004aef36(DAT_fffffef8);
      FUN_004af01a(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, (0x34e - u8((s16((local_8 + 0x11e), 0) === 0))));
      FUN_004af03b(DAT_fffffef8);
      FUN_0059e0eb(s32(DAT_006ad108, 0x4d), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x36c);
      FUN_004aef36(DAT_fffffef8);
      FUN_004af1d5(DAT_fffffef8, (((s16((local_8 + 0x11a), 0)) << 16 >> 16) / 2 | 0));
      FUN_005f22e0(DAT_fffffef8, DAT_00625d38);
      FUN_004af1d5(DAT_fffffef8, ((s16((local_8 + 0x11c), 0)) << 16 >> 16));
      FUN_0059e0eb(s32(DAT_006ad108, 0x4e), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, (0x350 - u8((s16((local_8 + 0x10e), 0) === 0))));
      FUN_005f22e0(DAT_fffffef8, DAT_00625d3c);
      FUN_004af14b(DAT_fffffef8, (0x352 - u8((s16((local_8 + 0x10c), 0) === 0))));
      FUN_0059e0eb(s32(DAT_006ad108, 0x4f), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x273);
      FUN_004aef36(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, (u8(_MEM[(local_8 + 0xb3)]) + 0x27f));
      FUN_0059e0eb(s32(DAT_006ad108, 0x50), DAT_fffffef8);
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x276);
      FUN_004aef36(DAT_fffffef8);
      if ((s32((local_8 + 0xb8), 0) === 0)) {
        FUN_004af14b(DAT_fffffef8, 0x285);
      }
      else {
        iVar3 = (s32((local_8 + 0xb8), 0) / 0x3e8 | 0);
        iVar4 = (iVar3 / 0x3c | 0);
        iVar3 = (iVar3 % 0x3c);
        if ((iVar4 < 0xa)) {
          FUN_004af1d5(DAT_fffffef8, 0);
        }
        FUN_004af1d5(DAT_fffffef8, iVar4);
        FUN_005f22e0(DAT_fffffef8, DAT_00625d40);
        if ((iVar3 < 0xa)) {
          FUN_004af1d5(DAT_fffffef8, 0);
        }
        FUN_004af1d5(DAT_fffffef8, iVar3);
      }
      FUN_0059e0eb(s32(DAT_006ad108, 0x51), DAT_fffffef8);
      local_110 = 1;
      local_114 = 0;
      local_118 = u8(_MEM[(local_8 + 0xb4)]);
      for (/* cond: (local_110 < 8) */); local_118 = (local_118 >> 1), local_110 = (local_110 < 8); local_110 = (local_110 + 1)) {
        if (((local_118 & 1) !== 0)) {
          local_114 = (local_114 + 1);
        }
      }
      FUN_004aef20(DAT_fffffef8);
      FUN_004af14b(DAT_fffffef8, 0x274);
      FUN_004aef36(DAT_fffffef8);
      FUN_004af1d5(DAT_fffffef8, local_114);
      FUN_005f22e0(DAT_fffffef8, DAT_00625d44);
      FUN_004af14b(DAT_fffffef8, 0x275);
      FUN_004aef36(DAT_fffffef8);
      local_110 = 0;
      local_114 = 0;
      local_118 = u8(_MEM[(local_8 + 0xb5)]);
      for (/* cond: (local_110 < 8) */); local_110 = (local_110 < 8); local_110 = (local_110 + 1)) {
        if (((local_118 & 1) !== 0)) {
          local_114 = (local_114 + 1);
        }
        local_118 = (local_118 >> 1);
      }
      if ((local_114 === 0)) {
        FUN_004af14b(DAT_fffffef8, 0x353);
      }
      else {
        FUN_004af1d5(DAT_fffffef8, local_114);
      }
      FUN_004af03b(DAT_fffffef8);
      FUN_0059e0eb(s32(DAT_006ad108, 0x52), DAT_fffffef8);
    }
  }
  uVar2 = FUN_0059fb78(s32((s32(DAT_006ad108, 0) + 0x210), 0));
  FUN_0040fcf0(uVar2);
  FUN_005a577e();
  return 1;
}


 export function FUN_004253ef (in_ECX)

 {
  let pvVar1;
  // in_ECX promoted to parameter;
  let local_c;

  local_c = s32(in_ECX, 0x53);
  FUN_0042472a();
  while ((local_c !== 0)) {
    pvVar1 = s32((local_c + 0x10), 0);
    operator_delete(s32((local_c + 8), 0));
    operator_delete(local_c);
    local_c = pvVar1;
  }
  w32(in_ECX, 0x53, 0);
  w32((s32(in_ECX, 0) + 0x28), 0, 0);
  w32((s32(in_ECX, 0) + 0x228), 0, 0);
  w32((s32(in_ECX, 0) + 0x220), 0, 0);
  return;
}


 export function FUN_004254a8 (in_ECX, param_1, param_2)

 {
  let puVar1;
  let sVar2;
  let pvVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;

  local_10 = 0;
  for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
    local_10 = local_c;
  }
  puVar1 = operator_new(0x18);
  w32(puVar1, 4, 0);
  w32(puVar1, 5, local_10);
  if ((local_10 === 0)) {
    w32(in_ECX, 0x53, puVar1);
    w32((s32(in_ECX, 0) + 0x228), 0, puVar1);
  }
  else {
    w32((local_10 + 0x10), 0, puVar1);
  }
  w32(puVar1, 0, 0);
  sVar2 = _strlen(param_1);
  pvVar3 = operator_new((sVar2 + 1));
  w32(puVar1, 2, pvVar3);
  FUN_005f22d0(s32(puVar1, 2), param_1);
  if ((_MEM[param_1] === 0)) {
    w32(puVar1, 0, (s32(puVar1, 0) | 1));
  }
  w32(puVar1, 1, param_2);
  w32(puVar1, 3, 0);
  iVar4 = FUN_0040efd0(s32(puVar1, 2));
  iVar5 = FUN_0059e356();
  iVar4 = (((iVar4 + iVar5) + s32((s32(in_ECX, 0) + 0xac), 0)) + 5);
  iVar5 = s32((s32(in_ECX, 0) + 0x118), 0);
  if ((s32((s32(in_ECX, 0) + 0x118), 0) <= iVar4)) {
    iVar5 = iVar4;
  }
  w32((s32(in_ECX, 0) + 0x118), 0, iVar5);
  w32((s32(in_ECX, 0) + 0x28), 0, (s32((s32(in_ECX, 0) + 0x28), 0) + 1));
  return puVar1;
}


 export function FUN_00425607 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x174), 0) !== 0)) {
    FUN_00425650();
  }
  uVar1 = FUN_005d1f50(param_1, 0x32, 1);
  w32((in_ECX + 0x174), 0, uVar1);
  return;
}


 export function FUN_00425650 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x174), 0) !== 0)) {
    FUN_005d2004(s32((in_ECX + 0x174), 0));
    w32((in_ECX + 0x174), 0, 0);
  }
  return;
}


 export function FUN_00425695 ()

 {
  let uVar1;

  FUN_0046b14d(1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0042570c();
  if ((s32((DAT_006ad108 + 0x174), 0) !== 0)) {
    FUN_005d2004(s32((DAT_006ad108 + 0x174), 0));
  }
  uVar1 = FUN_005d1f50(LAB_0040130c, 0xfa, 1);
  w32((DAT_006ad108 + 0x174), 0, uVar1);
  return;
}


 export function FUN_0042570c ()

 {
  let pvVar1;
  let bVar2;
  let iVar3;
  let local_c;

  bVar2 = 0;
  local_c = DAT_006c31d4;
  iVar3 = FUN_00421bb0();
  while ((local_c !== 0)) {
    if ((DAT_006ad8b8 * 0x3c < (iVar3 - s32((local_c + 0x28), 0)))) {
      if ((DAT_006c31d4 === local_c)) {
        wv(DAT_006c31d4, s32((local_c + 0x20), 0));
      }
      if ((s32((local_c + 0x24), 0) !== 0)) {
        w32((s32((local_c + 0x24), 0) + 0x20), 0, s32((local_c + 0x20), 0))
        ;
      }
      if ((s32((local_c + 0x20), 0) !== 0)) {
        w32((s32((local_c + 0x20), 0) + 0x24), 0, s32((local_c + 0x24), 0))
        ;
      }
      pvVar1 = s32((local_c + 0x20), 0);
      operator_delete(local_c);
      bVar2 = 1;
      local_c = pvVar1;
    }
    else {
      local_c = s32((local_c + 0x20), 0);
    }
  }
  if (bVar2) {
    FUN_004257fe();
  }
  return;
}


 export function FUN_004257fe ()

 {
  let puVar1;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006ad108 !== 0)) {
    FUN_004253ef();
    if ((DAT_006c31d4 === 0)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x286);
      FUN_004254a8(DAT_00679640, 0);
      FUN_0042472a();
    }
    else {
      for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x20), 0)) {
        if ((s32((local_c + 0x2c), 0) === 0)) {
          w32((local_c + 0x2c), 0, s32(DAT_006ad108, 1));
          w32(DAT_006ad108, 1, (s32(DAT_006ad108, 1) + 1));
        }
        puVar1 = FUN_004254a8((local_c + 0x70), s32((local_c + 0x2c), 0));
        local_18 = 0;
        local_10 = 0;
        local_1c = u8(_MEM[(local_c + 0xb4)]);
        for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
          if (((local_1c & 1) !== 0)) {
            local_10 = (local_10 + 1);
          }
          local_1c = (local_1c >> 1);
        }
        local_18 = 0;
        local_8 = 0;
        local_1c = u8(_MEM[(local_c + 0xb5)]);
        for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
          if (((local_1c & 1) !== 0)) {
            local_8 = (local_8 + 1);
          }
          local_1c = (local_1c >> 1);
        }
        if ((s16((local_c + 0xb0), 0) === 0)) {
          w32(puVar1, 0, (s32(puVar1, 0) | 1));
        }
      }
    }
    FUN_004244e0();
    FUN_00424ae9(s32(DAT_006ad108, 0), 0);
  }
  return;
}


 export function FUN_004259a6 (param_1)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let local_3c;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_3c = 0;
  local_3c = 1;
  local_3c = 3;
  local_3c = 7;
  local_3c = 0xf;
  local_3c = 0x1f;
  local_3c = 0x3f;
  local_3c = 0x7f;
  local_3c = 0xff;
  FUN_004aef20(DAT_0063cc48);
  FUN_005f22e0(DAT_0063cc48, DAT_006ad59c);
  FUN_004aef20(DAT_0063cd4c);
  FUN_004af14b(DAT_0063cd4c, (u8((DAT_00654c74 === 0)) + 0x277));
  FUN_004aef20(DAT_0063ce50);
  FUN_005f22e0(DAT_0063ce50, DAT_006ad5dc);
  FUN_004aef20(DAT_0063cf54);
  sVar1 = _strlen(DAT_0064bc62);
  if ((sVar1 === 0)) {
    FUN_004af14b(DAT_0063cf54, 0x34c);
  }
  else {
    FUN_005f22d0(DAT_0063cf54, DAT_0064bc62);
  }
  FUN_004aef36(DAT_0063cf54);
  FUN_004af01a(DAT_0063cf54);
  uVar2 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
  FUN_00485208(DAT_0063cf54, uVar2);
  FUN_004af03b(DAT_0063cf54);
  FUN_004aef20(DAT_0063d058);
  FUN_004af14b(DAT_0063d058, (u8(DAT_00655b08) + 0x279));
  FUN_004aef36(DAT_0063d058);
  FUN_004af01a(DAT_0063d058);
  FUN_004af14b(DAT_0063d058, (0x34e - u8((DAT_00654c7c === 0))));
  FUN_004af03b(DAT_0063d058);
  FUN_004aef20(DAT_0063d670);
  FUN_004af1d5(DAT_0063d670, (((DAT_006d1160) << 16 >> 16) / 2 | 0));
  FUN_004aef20(DAT_0063d774);
  FUN_004af1d5(DAT_0063d774, ((DAT_006d1162) << 16 >> 16));
  FUN_004aef20(DAT_0063d15c);
  FUN_004af14b(DAT_0063d15c, (0x350 - u8((DAT_00654fac === 0))));
  FUN_005f22e0(DAT_0063d15c, DAT_00625d6c);
  FUN_004af14b(DAT_0063d15c, (0x352 - u8((DAT_00654fae === 0))));
  FUN_004aef20(DAT_0063d260);
  FUN_004af14b(DAT_0063d260, (u8(DAT_00655b09) + 0x27f));
  FUN_004aef20(DAT_0063d364);
  if ((DAT_00654b70 === 0)) {
    FUN_004af14b(DAT_0063d364, 0x285);
  }
  else {
    iVar3 = ((DAT_00654b70 / 0x3e8 | 0) / 0x3c | 0);
    local_c = ((DAT_00654b70 / 0x3e8 | 0) % 0x3c);
    if ((iVar3 < 0xa)) {
      FUN_004af1d5(DAT_0063d364, 0);
    }
    FUN_004af1d5(DAT_0063d364, iVar3);
    FUN_005f22e0(DAT_0063d364, DAT_00625d70);
    if ((local_c < 0xa)) {
      FUN_004af1d5(DAT_0063d364, 0);
    }
    FUN_004af1d5(DAT_0063d364, local_c);
  }
  FUN_004aef20(DAT_0063d468);
  local_14 = 0;
  local_3c = u8(DAT_00655b0a);
  for (/* cond: (local_10 < 8) */); local_3c = (UNNAMED >> 1), local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    if ((((UNNAMED >> 1) & 1) !== 0)) {
      local_14 = (local_14 + 1);
    }
  }
  FUN_004af1d5(DAT_0063d468, local_14);
  FUN_004aef20(DAT_0063d56c);
  local_8 = 0;
  if ((DAT_00655b02 === 0)) {
    local_8 = 1;
  }
  else if ((DAT_00655b02 === 1)) {
    local_8 = u8(DAT_006c31a9);
  }
  else {
    local_8 = s32(DAT_ffffffc4, DAT_006ad308);
  }
  local_14 = 0;
  local_3c = local_8;
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    if (((UNNAMED & 1) !== 0)) {
      local_14 = (local_14 + 1);
    }
    local_3c = (UNNAMED >> 1);
  }
  if ((param_1 !== 0)) {
    local_14 = (local_14 + -1);
  }
  FUN_004af1d5(DAT_0063d56c, local_14);
  wv(DAT_00635a3c, LAB_00403c74);
  uVar2 = FUN_0051d564(DAT_006359d4, s_GAMEPROFILE_00625d74, (param_1 !== 0), DAT_0063fc58, 0);
  return uVar2;
}


 export function FUN_00426f30 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0059df8a();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_00426f80 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc5da(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00426fb0 (param_1, param_2, param_3, param_4)

 {
  FUN_0051d564(DAT_006359d4, param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_00426ff0 (param_1, param_2)

 {
  let pcVar1;
  let iVar2;
  let sVar3;
  let local_34;
  let local_30;
  let local_2c;

  _MEM[param_2] = 0;
  do {
    pcVar1 = _strchr(param_1, 0x25);
    if ((pcVar1 !== 0)) {
      _MEM[pcVar1] = 0;
    }
    if ((_MEM[param_1] !== 0)) {
      FUN_005f22e0(param_2, param_1);
    }
    local_34 = pcVar1;
    if ((pcVar1 !== 0)) {
      local_34 = (pcVar1 + 1);
      iVar2 = __strnicmp(local_34, s_STRING_00625e40, 6);
      if ((iVar2 === 0)) {
        iVar2 = _atoi((pcVar1 + 7));
        FUN_005f22e0(param_2, (DAT_0063cc48 + iVar2 * 0x104));
        param_1 = (pcVar1 + 8);
        if ((9 < iVar2)) {
          param_1 = (pcVar1 + 9);
        }
      }
      else {
        iVar2 = _strncmp(local_34, s_NUMBER_00625e48, 6);
        if ((iVar2 === 0)) {
          iVar2 = _atoi((pcVar1 + 7));
          __ltoa(s32((DAT_0063cc30 + iVar2 * 4), 0), DAT_ffffffd4, 0xa);
          FUN_005f22e0(param_2, DAT_ffffffd4);
          param_1 = (pcVar1 + 8);
        }
        else {
          iVar2 = _strncmp(local_34, DAT_00625e50, 3);
          if ((iVar2 === 0)) {
            iVar2 = _atoi((pcVar1 + 4));
            __ltoa(s32((DAT_0063cc30 + iVar2 * 4), 0), DAT_ffffffd4, 0x10);
            for (/* cond: (local_30 < (4 - sVar3)) */); sVar3 = _strlen(DAT_ffffffd4), local_30 = (local_30 < (4 - sVar3));
                local_30 = (local_30 + 1)) {
              FUN_005f22e0(param_2, DAT_00625e54);
            }
            FUN_005f22e0(param_2, DAT_ffffffd4);
            param_1 = (pcVar1 + 5);
          }
          else {
            param_1 = local_34;
            if ((_MEM[pcVar1 + 1] === 0x25)) {
              FUN_005f22e0(param_2, DAT_00625e58);
              param_1 = (pcVar1 + 2);
            }
          }
        }
      }
    }
  } while ((local_34 !== 0));
  return;
}


 export function FUN_004271e8 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00428b0c(param_2);
  FUN_00421d60(param_1, uVar1);
  return;
}


 export function FUN_00427211 (param_1, param_2)

 {
  FUN_004271e8(param_1, s32((DAT_00628420 + param_2 * 4), 0));
  return;
}


 export function FUN_004272d0 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;

  if ((-1 < param_3)) {
    FUN_005b9ec6();
    FUN_005b976d(param_1, param_2, ((1 << (((param_3) & 0xFF) & 0x1f)) & 0xff), 1, 1);
    FUN_005b8b1a(param_1, param_2, param_3);
    iVar1 = FUN_0043cf76(param_1, param_2);
    if ((iVar1 < 0)) {
      uVar2 = FUN_005b2e69(param_1, param_2);
      FUN_005b496e(uVar2, param_3);
    }
    else {
      FUN_0043cc00(iVar1, param_3);
    }
    FUN_005b9f1c();
  }
  return;
}


 export function FUN_0042738c (param_1)

 {
  if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 7)) {
    _MEM[DAT_006560ff + param_1 * 0x20] = 0xff;
  }
  return;
}


 export function FUN_004273e6 (param_1)

 {
  let iVar1;

  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    if ((iVar1 === 0)) {
      _MEM[DAT_006560ff + param_1 * 0x20] = 0xff;
    }
  }
  return;
}


 export function FUN_004274a6 (param_1, param_2)

 {
  let bVar1;
  let cVar2;
  let bVar3;
  let cVar4;
  let bVar5;
  let bVar6;
  let cVar7;
  let iVar8;
  let iVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let iVar13;
  let iVar14;
  let uVar15;
  let iVar16;
  let uVar17;
  let pcVar18;
  let iVar19;
  let iVar20;
  let iVar21;
  let uVar22;
  let uVar23;
  let bVar24;
  let local_5c;
  let local_50;
  let local_30;
  let local_10;
  let local_8;

  bVar6 = 0;
  iVar8 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar9 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  bVar1 = _MEM[DAT_006560f7 + param_1 * 0x20];
  uVar10 = s8(bVar1);
  uVar11 = (s32((DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0) & 1);
  uVar12 = (s32((DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0) & 8);
  cVar2 = _MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14];
  iVar13 = FUN_005b89e4(iVar8, iVar9);
  uVar23 = ((1 << (bVar1 & 0x1f)) & 0xff);
  local_30 = 0;
  bVar24 = (DAT_006d1da0 === uVar10);
  if ((uVar10 === 0)) {
    iVar14 = FUN_005b8931(iVar8, iVar9);
    _MEM[DAT_006560f9 + param_1 * 0x20] = (_MEM[(iVar14 + 4)] | _MEM[DAT_006560f9 + param_1 * 0x20]);
  }
  cVar7 = DAT_00655b07;
  if (((DAT_0064bc60 & 8) === 0)) {
    bVar5 = 0;
  }
  else {
    bVar5 = 1;
  }
  FUN_005b9ec6();
  for (/* cond: (local_10 < 0x19) */); local_10 = (local_10 < 0x19); local_10 = (local_10 + 1)) {
    uVar15 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_10]) + iVar8));
    iVar14 = (s8(_MEM[DAT_006283a0 + local_10]) + iVar9);
    iVar16 = FUN_004087c0(uVar15, iVar14);
    if ((uVar17 === u8((cVar2 === 2)))) {
      iVar16 = FUN_005b8931(uVar15, iVar14);
      if ((uVar10 !== 0)) {
        pcVar18 = FUN_005b898b(uVar15, iVar14, uVar10);
        if (((uVar23 & u8(_MEM[(iVar16 + 4)])) === 0)) {
          if ((local_10 < 8)) {
            local_30 = (local_30 | 5);
          }
          else {
            local_30 = (local_30 | 0xa);
          }
        }
        FUN_005b9d81(uVar15, iVar14, _MEM[(iVar16 + 1)], uVar10, 0, 1);
      }
      FUN_005b976d(uVar15, iVar14, uVar23, 1, 1);
    }
  }
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    uVar15 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_10]) + iVar8));
    iVar14 = (s8(_MEM[DAT_00628360 + local_10]) + iVar9);
    iVar16 = FUN_004087c0(uVar15, iVar14);
    if ((iVar16 !== 0)) {
      iVar16 = FUN_0043cf76(uVar15, iVar14);
      if ((uVar17 !== uVar10)) {
        if ((!bVar5)) {
          if (((uVar23 & s8(_MEM[DAT_0064f34c + iVar16 * 0x58])) === 0)) {
            local_30 = (local_30 | 5);
          }
          else if ((_MEM[DAT_0064f34d + (iVar16 * 0x58 + uVar10)] !== _MEM[DAT_0064f349 + iVar16 * 0x58])) {
            local_30 = (local_30 | 1);
          }
        }
        FUN_0043cc00(iVar16, uVar10);
        if ((uVar12 === 0)) {
          FUN_005b496e(param_1, uVar17);
        }
        if (((_MEM[DAT_0064c6c0 + (uVar10 * 4 + uVar17 * 0x594)] & 4) === 0)) {
          FUN_0049301b(uVar17, uVar15, iVar14, 0, 4);
          FUN_0049301b(uVar17, uVar15, iVar14, 1, 2);
        }
      }
      iVar19 = FUN_005b89e4(uVar15, iVar14);
      if ((iVar19 !== 0)) {
        iVar20 = FUN_005b2e69(uVar15, iVar14);
        if ((iVar20 < 0)) {
          iVar16 = FUN_005b89e4(iVar8, iVar9);
          if (((_MEM[DAT_0064c6c0 + (uVar17 * 4 + uVar10 * 0x594)] & 1) === 0)) {
            if ((!bVar6)) {
              FUN_0047cea6(iVar8, iVar9);
              if ((2 < DAT_00655b02)) {
                FUN_004b0b53(0xff, 2, 0, 0, 0);
                FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
              }
              bVar6 = 1;
            }
            if ((param_2 !== 0)) {
              FUN_0055d8d8(uVar10, uVar17, uVar15, iVar14);
            }
          }
        }
        else {
          bVar3 = _MEM[DAT_006560f7 + iVar20 * 0x20];
          uVar17 = s8(bVar3);
          if ((uVar17 !== uVar10)) {
            uVar22 = u8(_MEM[DAT_006560f6 + iVar20 * 0x20]);
            if (((_MEM[DAT_0064b1bd + uVar22 * 0x14] & 0x40) !== 0)) {
              iVar21 = FUN_005b8ca6(iVar8, iVar9);
              if ((iVar21 < 0)) {
                FUN_005b496e(param_1, uVar17);
              }
              if (((_MEM[DAT_0064c6c0 + (uVar17 * 4 + uVar10 * 0x594)] & 8) === 0)) {
                FUN_004273e6(iVar20);
              }
              if ((((1 << (bVar3 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                if ((iVar13 === 0)) {
                  FUN_0042738c(iVar20);
                }
              }
              else if ((iVar19 === iVar13)) {
                FUN_0042738c(iVar20);
              }
            }
            if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 0x40) !== 0)) {
              if ((iVar16 < 0)) {
                if (((uVar23 & u8(_MEM[DAT_006560f9 + iVar20 * 0x20])) === 0)) {
                  local_30 = (local_30 | 1);
                }
                FUN_005b496e(iVar20, uVar10);
              }
              if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                if ((cVar2 === 1)) {
                  FUN_0042738c(param_1);
                }
              }
              else if ((cVar2 === 1)) {
                FUN_0042738c(param_1);
              }
              if (((_MEM[DAT_0064c6c0 + (uVar17 * 4 + uVar10 * 0x594)] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar14, 2, (3 - u8(((s32((DAT_0064b1bc + uVar22 * 0x14), 0) & 8) === 0))));
              }
            }
            if ((-1 < iVar16)) {
              if ((cVar7 === 0)) {
                FUN_0047cea6(iVar8, iVar9);
                if ((2 < DAT_00655b02)) {
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
                }
                bVar6 = 1;
              }
              if ((_MEM[DAT_006560f6 + param_1 * 0x20] !== 9)) {
                FUN_0055d8d8(uVar10, uVar17, uVar15, iVar14);
              }
              if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] < 6)) {
                FUN_0049301b(uVar17, uVar15, iVar14, 1, (2 - u8((uVar10 === 0))));
              }
              if (((_MEM[DAT_0064c6c0 + (uVar17 * 4 + uVar10 * 0x594)] & 4) === 0)) {
                local_8 = 1;
                if ((_MEM[DAT_0064b1ca + uVar22 * 0x14] !== 1)) {
                  local_8 = 3;
                }
                FUN_0049301b(uVar10, uVar15, iVar14, 0, local_8);
              }
            }
          }
        }
      }
    }
  }
  for (/* cond: (local_10 < 0x19) */); local_10 = (local_10 < 0x19); local_10 = (local_10 + 1)) {
    if ((local_10 !== 0x14)) {
      uVar15 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_10]) + iVar8));
      iVar13 = (s8(_MEM[DAT_006283a0 + local_10]) + iVar9);
      iVar14 = FUN_004087c0(uVar15, iVar13);
      if ((iVar14 !== 0)) {
        iVar14 = FUN_005b2e69(uVar15, iVar13);
        uVar17 = FUN_005b8da4(uVar15, iVar13);
        iVar16 = FUN_0043cf76(uVar15, iVar13);
        if ((uVar17 !== uVar10)) {
          if ((uVar22 === u8((cVar2 === 2)))) {
            if ((-1 < iVar16)) {
              if ((!bVar5)) {
                if (((uVar23 & s8(_MEM[DAT_0064f34c + iVar16 * 0x58])) === 0)) {
                  local_30 = (local_30 | 0xa);
                }
                else if ((_MEM[DAT_0064f34d + (iVar16 * 0x58 + uVar10)] !== _MEM[DAT_0064f349 + iVar16 * 0x58])) {
                  local_30 = (local_30 | 2);
                }
              }
              FUN_0043cc00(iVar16, uVar10);
            }
            if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + iVar14 * 0x20]) * 0x14] & 8) === 0)) {
              if ((iVar16 < 0)) {
                if (((uVar23 & u8(_MEM[DAT_006560f9 + param_1 * 0x20])) === 0)) {
                  local_30 = (local_30 | 2);
                }
                FUN_005b496e(iVar14, uVar10);
              }
              iVar19 = FUN_005b89e4(uVar15, iVar13);
              if (((_MEM[DAT_0064c6c0 + (uVar17 * 4 + uVar10 * 0x594)] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar13, 2, 2);
              }
            }
          }
          if ((u8((cVar4 === 2)) === uVar22)) {
            FUN_0042738c(iVar14);
            FUN_004273e6(iVar14);
            iVar14 = FUN_005b8ca6(iVar8, iVar9);
            if ((iVar14 < 0)) {
              FUN_005b496e(param_1, uVar17);
            }
            iVar13 = FUN_005b89e4(uVar15, iVar13);
            if (((_MEM[DAT_0064c6c0 + (uVar10 * 4 + uVar17 * 0x594)] & 4) === 0)) {
              FUN_0049301b(uVar17, iVar8, iVar9, 2, 2);
            }
          }
          if ((uVar12 === 0)) {
            FUN_005b496e(param_1, uVar17);
          }
        }
      }
    }
  }
  if ((DAT_00655af8 === 0)) {
    FUN_005b9f1c();
  }
  else {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    if ((DAT_006d1da0 !== uVar10)) {
      for (/* cond: (local_50 < 8) */); local_50 = local_50; local_50 = (local_50 + 1)) {
        if ((s8(_MEM[DAT_006560f7 + param_1 * 0x20]) === (local_50 & 0xff))) {
          if ((DAT_006d1da0 === local_50)) {
            FUN_0047cf22(iVar8, iVar9);
          }
          else if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0x75, s32((DAT_006ad30c + s32((DAT_006ad558 + local_50 * 4), 0) * 0x54), 0), iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
      if ((2 < DAT_00655b02)) {
        FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
      }
    }
    else {
      local_5c = 2;
      if (((local_30 & 2) === 0)) {
        local_5c = 1;
        if (((local_30 & 4) !== 0)) {
          local_5c = 2;
        }
      }
      else if (((local_30 & 8) !== 0)) {
        local_5c = 3;
      }
      if (bVar6) {
        FUN_005b9f1c();
        return;
      }
      if ((DAT_006d1da0 === uVar10)) {
        FUN_0047ce1e(iVar8, iVar9, local_5c, uVar10, 1);
      }
      else if ((2 < DAT_00655b02)) {
        FUN_0046b14d(0x76, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar10 * 4), 0) * 0x54), 0), iVar8, iVar9, local_5c, uVar10, 0, 0, 0, 0);
      }
    }
    FUN_005b9f1c();
  }
  return;
}


 export function FUN_004289e0 ()

 {
  FUN_004289f5();
  return;
}


 export function FUN_004289f5 ()

 {
  FUN_00428cb0();
  return;
}


 export function FUN_00428a0f (param_1)

 {
  if ((DAT_00625e64 === 0)) {
    wv(DAT_00625e64, 1);
    FUN_00497ea0(DAT_0063e4c0, 2, param_1);
  }
  else {
    FUN_004980ec(DAT_0063e4c0);
    FUN_00497ea0(DAT_0063e4c0, 2, param_1);
  }
  wv(DAT_00625e60, 0);
  return;
}


 export function FUN_00428a78 ()

 {
  FUN_004980ec(DAT_0063e4c0);
  return;
}


 export function FUN_00428a95 (param_1)

 {
  let sVar1;
  let iVar2;

  sVar1 = _strlen(param_1);
  if ((sVar1 === 0)) {
    iVar2 = 0;
  }
  else {
    sVar1 = _strlen(param_1);
    wv(DAT_0063e4b8, FUN_00498159(DAT_0063e4c0, (sVar1 + 1)));
    FUN_005f22d0(FUN_00498159(DAT_0063e4c0, (sVar1 + 1)), param_1);
    iVar2 = DAT_00625e60;
    wv(DAT_00625e60, (DAT_00625e60 + 1));
  }
  return iVar2;
}


 export function FUN_00428b0c (param_1)

 {
  let local_8;

  local_8 = DAT_0063e4c8;
  for (/* cond: (param_1 !== 0) */); param_1 = (param_1 !== 0); param_1 = (param_1 + -1)) {
    for (/* cond: (_MEM[local_8] !== 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    }
    for (/* cond: (_MEM[local_8] === 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    }
  }
  return local_8;
}


 export function FUN_00428b68 (param_1, param_2)

 {
  let iVar1;
  let sVar2;
  let local_8;

  sVar2 = _strlen(param_1);
  if ((param_2 < (sVar2 + 1))) {
    local_8 = _strlen(param_1);
    local_8 = (local_8 + 1);
  }
  else {
    local_8 = param_2;
  }
  wv(DAT_0063e4b8, FUN_00498159(DAT_0063e4c0, local_8));
  _memset(FUN_00498159(DAT_0063e4c0, local_8), 0, local_8);
  _strncpy(FUN_00498159(DAT_0063e4c0, local_8), param_1, local_8);
  sVar2 = _strlen(param_1);
  if ((sVar2 === 0)) {
    _MEM[FUN_00498159(DAT_0063e4c0, local_8)] = 0x20;
  }
  iVar1 = DAT_00625e60;
  wv(DAT_00625e60, (DAT_00625e60 + 1));
  return iVar1;
}


 export function FUN_00428cb0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, 0);
  w32((in_ECX + 8), 0, 0);
  w16((in_ECX + 0xe), 0, 0);
  return in_ECX;
}


 export function FUN_00428d00 ()

 {
  FUN_004293a8();
  return;
}


 export function FUN_00428d1b ()

 {
  wv(DAT_006a1d7c, 0);
  wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
  FUN_004e4ceb();
  return;
}


 export function FUN_00428d48 ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_00625e90, s_CITIES_00625e88);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_00428da7 ()

 {
  wv(DAT_006a1d7c, 0);
  wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
  return;
}


 export function FUN_00428dcf ()

 {
  let uVar1;

  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 1, LAB_0040123a);
  FUN_00573e59((DAT_0063fe50 + ((s32((DAT_006a4f88 + 0x2f4), 0) * 0x3c + s32((DAT_006a4f88 + 0x2ec), 0) * 0x1e0) + s32((DAT_006a4f88 + 0x2f0), 0) * 0x78)), uVar1);
  FUN_00428d00();
  return;
}


 export function FUN_00428e50 ()

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_8;

  local_8 = 2;
  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  iVar1 = FUN_00419100(s_DEBUG_006359dc, s_CITYMISC_00625e98, 1);
  if ((iVar1 !== -1)) {
    /* switch */ () {
    case 0 :
      local_10 = DAT_006465d8;
      break;
    case 1 :
      local_10 = DAT_00647fa0;
      break;
    default :
      if ((iVar1 < 0xa)) {
        local_10 = (DAT_006442f8 + (iVar1 * 8 + -16) * 0xf);
      }
      else {
        local_10 = (DAT_00644334 + (iVar1 * 8 + -96) * 0xf);
      }
      local_8 = 3;
      break;
    case 10 :
      local_10 = DAT_00646650;
      break;
    case 0xb :
      local_10 = DAT_00647fdc;
    }
    if ((local_10 !== 0)) {
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), local_8, LAB_0040123a);
      FUN_00573e59(local_10, uVar2);
    }
  }
  FUN_0059d3c9(0);
  return;
}


 export function FUN_00428fd2 ()

 {
  let uVar1;

  uVar1 = FUN_00418d60();
  w32((DAT_006a4f88 + 0x2ec), 0, uVar1);
  uVar1 = FUN_00418d60();
  w32((DAT_006a4f88 + 0x2f0), 0, uVar1);
  uVar1 = FUN_00418d60();
  w32((DAT_006a4f88 + 0x2f4), 0, uVar1);
  FUN_00428d00();
  return;
}


 export function FUN_0042903e (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, ((s32(DAT_00625e70, param_1 * 2) + s32((in_ECX + 0x124), 0)) + -30), (s32(DAT_00625e74, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0xa0, (s32((in_ECX + 0x2e8), 0) << 3));
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_24, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(thunk_FUN_00428fd2);
  if ((param_1 === 0)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x834), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x838), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x83c), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x840), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x844), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x848), 0));
    FUN_00418ce0(uVar2);
  }
  else if ((param_1 === 1)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x84c), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x850), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x854), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x858), 0));
    FUN_00418ce0(uVar2);
  }
  else if ((param_1 === 2)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x85c), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x860), 0));
    FUN_00418ce0(uVar2);
  }
  return;
}


 export function FUN_004293a8 (in_ECX)

 {
  let uVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00552112();
  if ((DAT_006a1d7c === 0)) {
    FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1d);
  }
  else {
    FUN_005a9afe(DAT_0062e018, in_ECX, 0, 0, s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
  }
  local_8 = (s32((in_ECX + 0x124), 0) + 0x20);
  local_c = (s32((in_ECX + 0x128), 0) + 0x20);
  local_18 = (DAT_0063fe50 + ((s32((in_ECX + 0x2f4), 0) * 0x3c + s32((in_ECX + 0x2ec), 0) * 0x1e0) + s32((in_ECX + 0x2f0), 0) * 0x78));
  uVar1 = FUN_00417f70();
  FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, uVar1);
  FUN_005cef66(DAT_ffffffd8, in_ECX, 0, local_8, (local_c + 8));
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x40, 0x40, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  local_10 = ((DAT_00625e70 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00625e74 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x864), 0));
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625e78 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00625e7c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x868), 0));
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625e80 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00625e84 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x86c), 0));
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  FUN_00408460();
  return;
}


 export function FUN_00429671 (in_ECX)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
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
  puStack_c = LAB_00429e5f;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  wv(DAT_006a1d7c, 1);
  wv(DAT_006a4f88, in_ECX);
  pvVar2 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar2 === 0)) {
    local_468 = 0;
  }
  else {
    local_468 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  wv(DAT_0062e018, local_468);
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  FUN_005d25a8(DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 0);
  wv(DAT_006a1d80, 0xc9);
  FUN_005bf071(s_EDITORSQ.GIF_00625ea4, 0xa, 0xc0, DAT_fffffbbc);
  uVar3 = FUN_0040ef70();
  w32((in_ECX + 0x2e8), 0, uVar3);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar3 = s32((in_ECX + 0x2dc), 0);
  uVar9 = s32((in_ECX + 0x2d8), 0);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x738), 0), 0xd, 0, 0, uVar9, uVar3, 0, 0, 0);
  FUN_005534bc(uVar4, uVar6, uVar7, uVar8, uVar9, uVar3, uVar10, uVar11, uVar12);
  for (/* cond: (local_460 < 3) */); local_460 = (local_460 < 3); local_460 = (local_460 + 1)) {
    FUN_0042903e(local_460);
  }
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, ((s32((in_ECX + 0x12c), 0) + -8) / 3 | 0));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040317f);
  iVar1 = ((iVar1 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_478, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402888);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_47c, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00403706);
  FUN_0040f840();
  w32((in_ECX + 0x2e0), 0, 0x4d);
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  iVar1 = s32((in_ECX + 0x124), 0);
  iVar5 = s32((in_ECX + 0x128), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x19), (iVar5 + 0x68), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7cc), 0));
  FUN_0040f680(local_480, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00401c21);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x19), ((iVar5 + 0x68) + (s32((in_ECX + 0x2e4), 0) + 2)), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8f0), 0));
  FUN_0040f680(local_484, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040120d);
  FUN_0040f350(0);
  w32((in_ECX + 0x2f4), 0, 0);
  w32((in_ECX + 0x2f0), 0, s32((in_ECX + 0x2f4), 0));
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_00418d90(s32((in_ECX + 0x2f0), 0));
  FUN_00418d90(s32((in_ECX + 0x2f4), 0));
  w32((in_ECX + 0x2f8), 0, 3);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x403ae9);
  FUN_00428fd2(0xc9);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) {
    FUN_0040ef50();
  }
  if ((DAT_0062e018 !== 0)) {
    FUN_0040f010(1);
  }
  wv(DAT_0062e018, 0);
  w32((in_ECX + 0x2f8), 0, 0);
  local_8 = -1;
  FUN_00429e53();
  FUN_00429e69();
  return;
}


 export function FUN_00429e53 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00429e69 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00429e77 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00429edc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_00429671();
  FUN_005bb574();
  local_8 = -1;
  FUN_00429ed0();
  FUN_00429ee6();
  return;
}


 export function FUN_00429ed0 ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_00429ee6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0042a380 ()

 {
  FUN_0042a39a();
  FUN_0042a3ba();
  return;
}


 export function FUN_0042a39a ()

 {
  FUN_0043c4c0(0, 0x18, 1);
  return;
}


 export function FUN_0042a3ba ()

 {
  _atexit(FUN_0042a3d7);
  return;
}


 export function FUN_0042a3d7 ()

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
  FUN_0042a40b();
  FUN_0042a429();
  return;
}


 export function FUN_0042a40b ()

 {
  FUN_0043c460(0, 0x12);
  return;
}


 export function FUN_0042a429 ()

 {
  _atexit(FUN_0042a446);
  return;
}


 export function FUN_0042a446 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0042a460 ()

 {
  FUN_0042a47a();
  FUN_0042a49a();
  return;
}


 export function FUN_0042a47a ()

 {
  FUN_0043c4c0(0, 0x10, 1);
  return;
}


 export function FUN_0042a49a ()

 {
  _atexit(FUN_0042a4b7);
  return;
}


 export function FUN_0042a4b7 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0042a4d1 ()

 {
  FUN_0042a4eb();
  FUN_0042a50b();
  return;
}


 export function FUN_0042a4eb ()

 {
  FUN_0043c4c0(0, 0xe, 1);
  return;
}


 export function FUN_0042a50b ()

 {
  _atexit(FUN_0042a528);
  return;
}


 export function FUN_0042a528 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0042a542 ()

 {
  FUN_0042a55c();
  FUN_0042a57c();
  return;
}


 export function FUN_0042a55c ()

 {
  FUN_0043c4c0(0, 0xc, 1);
  return;
}


 export function FUN_0042a57c ()

 {
  _atexit(FUN_0042a599);
  return;
}


 export function FUN_0042a599 ()

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
  FUN_0042a5cd();
  FUN_0042a5eb();
  return;
}


 export function FUN_0042a5cd ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_0042a5eb ()

 {
  _atexit(FUN_0042a608);
  return;
}


 export function FUN_0042a608 ()

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
  FUN_0042a63c();
  FUN_0042a656();
  return;
}


 export function FUN_0042a63c ()

 {
  FUN_0043c260();
  return;
}


 export function FUN_0042a656 ()

 {
  _atexit(FUN_0042a673);
  return;
}


 export function FUN_0042a673 ()

 {
  wv(DAT_0063eb10, DAT_0063eb10);
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
  FUN_0042a6a7();
  FUN_0042a6c1();
  return;
}


 export function FUN_0042a6a7 ()

 {
  FUN_0043c260();
  return;
}


 export function FUN_0042a6c1 ()

 {
  _atexit(FUN_0042a6de);
  return;
}


 export function FUN_0042a6de ()

 {
  wv(DAT_0063e4f8, DAT_0063e4f8);
  return;
}


 export function FUN_0042a6f8 ()

 {
  FUN_0042a712();
  FUN_0042a731();
  return;
}


 export function FUN_0042a712 ()

 {
  FUN_0043c3f0(s_TILES.DLL_00625ed4);
  return;
}


 export function FUN_0042a731 ()

 {
  _atexit(FUN_0042a74e);
  return;
}


 export function FUN_0042a74e ()

 {
  wv(DAT_0063e4f0, DAT_0063e4f0);
  return;
}


 export function FUN_0042a768 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((-1 < s32((in_ECX + 0x450), 0))) {
    w32((in_ECX + 0x450), 0, -1);
    FUN_005c5aeb();
    FUN_004083f0();
    FUN_00553379();
  }
  return;
}


 export function FUN_0042a7bc (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let pCVar2;
  let iVar3;
  // unaff_EBX promoted to parameter;
  let iVar4;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar5;
  let iVar6;
  let iVar7;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0042aba7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  iVar5 = extraout_var;
  FUN_0042a768();
  FUN_005d8236(DAT_0063eaa0);
  w32((iVar5 + 0x498), 0, 0);
  w32((iVar5 + 0x454), 0, 0);
  w32((iVar5 + 0x458), 0, 1);
  w32((iVar5 + 0x460), 0, 0);
  w32((iVar5 + 0x45c), 0, 1);
  w32((iVar5 + 0x49c), 0, 0);
  w32((iVar5 + 0x450), 0, param_2);
  w32((iVar5 + 0x4a0), 0, param_3);
  iVar1 = FUN_006e7d8c(2);
  w32((iVar5 + 0x494), 0, iVar1);
  iVar1 = DAT_0063359c;
  if ((param_1 < 0)) {
    param_1 = ((~param_1) + 1);
  }
  else if ((param_1 !== 0x2710)) {
    param_1 = (param_1 + 0x31);
  }
  w32((iVar5 + 0x48c), 0, param_4);
  w32((iVar5 + 0x474), 0, param_5);
  FUN_00407ff0();
  if ((param_1 === 0x2710)) {
    FUN_005bf071(s_scredits.gif_00625ee0, 0xa, 0xc0, DAT_fffffbbc);
  }
  else {
    FUN_005bf5e1(param_1, 0xa, 0xc0, DAT_fffffbbc);
  }
  FUN_00407ff0();
  if ((param_4 < 1)) {
    pCVar2 = GetActiveView((iVar5 + 0x2d8));
    w32((iVar5 + 0x48c), 0, pCVar2);
  }
  if ((param_5 < 1)) {
    pCVar2 = GetActiveView((iVar5 + 0x2d8));
    w32((iVar5 + 0x474), 0, pCVar2);
  }
  w32((iVar5 + 0x490), 0, param_6);
  w32((iVar5 + 0x478), 0, param_7);
  if ((s32((iVar5 + 0x490), 0) === 0)) {
    w32((iVar5 + 0x490), 0, s32((iVar5 + 0x48c), 0));
  }
  if ((s32((iVar5 + 0x490), 0) < 0)) {
    w32((iVar5 + 0x490), 0, (s32((iVar5 + 0x48c), 0) - s32((iVar5 + 0x490), 0)));
  }
  if ((s32((iVar5 + 0x478), 0) === 0)) {
    w32((iVar5 + 0x478), 0, s32((iVar5 + 0x474), 0));
  }
  if ((s32((iVar5 + 0x478), 0) < 0)) {
    w32((iVar5 + 0x478), 0, (s32((iVar5 + 0x474), 0) - s32((iVar5 + 0x478), 0)));
  }
  iVar4 = DAT_006ab19c;
  iVar7 = (s32((iVar5 + 0x490), 0) + iVar1 * 2);
  iVar6 = (s32((iVar5 + 0x478), 0) + iVar1 * 2);
  iVar3 = FUN_0043c5c0();
  iVar4 = (iVar4 - iVar3);
  iVar3 = ((iVar4 >> 1) - (iVar6 >> 1));
  FUN_005534bc(0, (((s32((iVar5 + 0x4a0), 0) === 0) - 1) & 8), ((DAT_006ab198 >> 1) - (iVar7 >> 1)), iVar3, s32((iVar5 + 0x48c), 0), s32((iVar5 + 0x474), 0), 0, iVar1, iVar1);
  local_8 = -1;
  FUN_0042ab9b();
  FUN_0042abb1(unaff_ESI, unaff_EBX, iVar5, iVar6, iVar7, iVar3, iVar4);
  return;
}


 export function FUN_0042ab9b ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0042abb1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0042abc1 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005a9afe((in_ECX + 0x2d8));
  return;
}


 export function FUN_0042ac18 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0042abc1(0, 0, s32((in_ECX + 0x48c), 0), s32((in_ECX + 0x474), 0));
  return;
}


 export function FUN_0042ac4e ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32((local_8 + 0x4a0), 0) === 0)) {
    FUN_0042a768();
  }
  else {
    local_8 = (local_8 + 0x48);
  }
  return;
}


 export function FUN_0042acb0 (in_ECX)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_18;
  let local_14;

  FUN_004086c0(DAT_ffffffec, 2, 0, 0x254, 0x18);
  iVar1 = s32((in_ECX + 0x128), 0);
  iVar2 = FUN_00407fc0(DAT_ffffffec);
  FUN_0043c790(DAT_ffffffec, s32((in_ECX + 0x124), 0), ((iVar1 - iVar2) + 0x18e));
  if ((in_ECX === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_18, 0x64, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00401235);
  FUN_0040f7d0();
  FUN_0040f840();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042b48e)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042ad8f ()

 {
  let extraout_EAX;
  let uVar1;
  let iVar2;
  let iVar3;
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
  let local_8;

  local_70 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_50 = (DAT_0063ec38 + 2);
  local_64 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_1c = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x54c), 0));
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_50, DAT_0063ec3c);
  local_50 = (local_50 + local_1c);
  FUN_0040bbb0();
  local_60 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + local_70 * 0x594]) - 1), 0, 4);
  FUN_0040bc10((local_60 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar1 = FUN_00493c7d(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_50, DAT_0063ec3c);
  local_50 = (local_50 + local_1c);
  FUN_0040bbb0();
  uVar1 = FUN_00493ba6(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  uVar1 = FUN_00493b10(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_50, DAT_0063ec3c);
  local_50 = ((local_50 + local_1c) + 6);
  if ((0xffff < s16((DAT_0064c6aa + local_70 * 0x594), 0))) {
    local_44 = local_50;
    FUN_0040bbb0();
    FUN_0040bc10(0xec);
    FUN_0040fe40();
    FUN_0040ff00(s32((DAT_00627684 + ((s16((DAT_0064c6aa + local_70 * 0x594), 0)) << 16 >> 16) * 0x10), 0));
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_50, DAT_0063ec3c);
    local_50 = (local_50 + local_1c);
    local_6c = (local_50 + 9);
    iVar2 = FUN_00407f90(DAT_0063edcc, 1);
    uVar1 = FUN_004c2788(local_70, 0xe, (iVar2 + -10));
    FUN_00548c78(DAT_0063eb10, DAT_006488d8, (DAT_0063edcc + 5), local_6c, ((s16((DAT_0064c6a8 + local_70 * 0x594), 0)) << 16 >> 16), uVar1);
    local_54 = (local_50 + 0x20);
    local_50 = local_54;
    FUN_00408680(DAT_ffffffe8, (DAT_0063edcc + 2), local_44, (DAT_0063edd4 + -2), local_54);
    FUN_0043c7c0(DAT_0063eb10, DAT_ffffffe8, 0x29);
    local_50 = (local_50 + 6);
  }
  local_34 = FUN_004c2788(local_70);
  local_68 = 0;
  for (/* cond: (local_48 < ((DAT_00655b18) << 16 >> 16)) */); local_48 = (local_48 < ((DAT_00655b18) << 16 >> 16)); local_48 = (local_48 + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_48 * 0x58]) === local_70)) {
      local_68 = (local_68 + ((s16((DAT_0064f38a + local_48 * 0x58), 0)) << 16 >> 16));
    }
  }
  if ((local_68 !== 0)) {
    FUN_0040bbb0();
    FUN_0040bc10(0x170);
    FUN_0040fe10();
    FUN_0040ff30((((local_68 + -1) + local_34) / local_68 | 0));
    FUN_0040fe10();
    FUN_0040bc10(0x171);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_50, DAT_0063ec3c);
    local_50 = (local_50 + (local_1c + 6));
  }
  local_3c = FUN_006e7d8c(3);
  local_64 = (local_64 - (local_3c + 2));
  local_1c = 0x16;
  wv(DAT_0063ef80, 0x16);
  _DAT_0063ef78 = local_50;
  _DAT_0063ef7c = (local_64 - local_50);
  wv(DAT_0063ef74, FUN_005adfa0(((local_64 - local_50) / 0x16 | 0), 1, 0x63));
  _DAT_0063ef90 = (DAT_0063ec34 + 2);
  local_38 = ((DAT_0063ec3c + DAT_0063ec34) + -2);
  wv(DAT_0063ef94, (local_38 - (DAT_0063ec34 + 2)));
  wv(DAT_0063ef98, ((local_38 - (DAT_0063ec34 + 2)) / 3 | 0));
  wv(DAT_0063ef8c, FUN_005adfa0(((local_64 - local_50) / 0x16 | 0), 1, 0x63) * 3);
  local_2c = 0;
  local_30 = (DAT_0063ec34 + 2);
  local_8 = FUN_005adfa0(((local_64 - local_50) / 0x16 | 0), 1, 0x63);
  for (/* cond: (local_40 < 0x64) */); local_40 = (local_40 < 0x64); local_40 = (local_40 + 1)) {
    iVar2 = FUN_004bd9f0(local_70, local_40);
    if ((iVar2 !== 0)) {
      local_2c = (local_2c + 1);
    }
  }
  _DAT_0063ef68 = FUN_005adfa0((((local_8 + -1) + local_2c) / local_8 | 0), 1, 0x63);
  uVar1 = FUN_005adfa0((local_2c + -1), 0, 0x3e7);
  wv(DAT_0063ef70, FUN_005adfa0(DAT_0063ef70, 0, uVar1));
  local_4c = 0;
  local_24 = 0;
  local_20 = 0;
  local_6c = local_50;
  local_5c = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
  FUN_005baec8(DAT_0063eab8);
  for (/* cond: (local_40 < 0x64) */); local_40 = (local_40 < 0x64); local_40 = (local_40 + 1)) {
    iVar3 = FUN_004bd9f0(local_70, local_40);
    iVar2 = local_4c;
    if ((local_4c < (DAT_0063ef8c + local_5c))) {
      local_6c = (local_20 * local_1c + local_50);
      local_58 = (DAT_0063ef98 * local_24 + local_30);
      local_4c = iVar2;
      FUN_005cef31(DAT_ffffff80, DAT_0063eb10, local_58, local_6c);
      local_28 = (local_58 + 0x26);
      FUN_005baee0((((-u8((s8(_MEM[DAT_00655b1e + local_40]) === local_70))) & -53) + 0x5e), 0x12, 1, 1);
      uVar1 = FUN_00428b0c(s32((DAT_00627684 + local_40 * 0x10), 0), local_28, (local_6c + 2));
      FUN_0043c8d0(uVar1);
      local_20 = (local_20 + 1);
      iVar2 = local_4c;
      if ((local_8 <= local_20)) {
        local_20 = 0;
        local_24 = (local_24 + 1);
        if ((2 < local_24));
  }
  if ((DAT_0063efa8 === 0)) {
    FUN_00408680(DAT_ffffffe8, local_30, local_64, local_38, (local_64 + local_3c));
    FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 0);
    uVar1 = FUN_005adfa0(((((local_8 + -1) + local_2c) / local_8 | 0) + -1), 0, 0x3e7);
    FUN_0040fd40(0, uVar1);
    FUN_0040fcf0(DAT_0063ef70);
    FUN_005db0d0(1);
    FUN_0040fd80(LAB_00402798);
    FUN_0040f380();
    FUN_00408130(LAB_004034c2);
    wv(DAT_0063efa8, 1);
  }
  FUN_00408460();
  return;
}


 export function FUN_0042b540 (param_1)

 {
  wv(DAT_0063ef70, DAT_0063ef74 * param_1);
  FUN_0042ad8f();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042b563 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let bVar4;
  let local_14;
  let local_10;

  if ((iVar2 < 3)) {
    iVar2 = (DAT_0063ef74 * iVar2 + DAT_0063ef70);
    local_10 = 0;
    for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
      iVar3 = FUN_004bd9f0(DAT_0063ef6c, local_14);
      if (bVar4) {
        FUN_00566584(local_14);
        return;
      }
    }
  }
  return;
}


 export function FUN_0042b65b ()

 {
  FUN_004c0cf7(DAT_0063ef6c, 1, 0);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042b72b)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0042b7b6)  */ */ export function FUN_0042b67d (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  FUN_0042a7bc(6, 6, 0, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
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
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5cc), 0));
  FUN_0040f680(DAT_0063eb58, 0x65, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00401ae6);
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 export function FUN_0042b824 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_31c;
  let local_318;
  let local_314;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0042bc2e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_004271e8(0, s32((DAT_0064b168 + param_2 * 4), 0));
  FUN_0040ffa0(s_SUPPLYSHOW_00625ef0, 0x40001);
  local_314 = 0;
  for (/* cond: (local_18 < 2) */); local_18 = (local_18 < 2); local_18 = (local_18 + 1)) {
    local_318 = 0;
    for (/* cond: (local_31c < ((DAT_00655b18) << 16 >> 16)) */); local_31c = (local_31c < ((DAT_00655b18) << 16 >> 16)); local_31c = (local_31c + 1)) {
      if ((DAT_00655b07 !== 0)) {
        bVar1 = 0;
        for (/* cond: (local_14 < 3) */); local_14 = (local_14 < 3); local_14 = (local_14 + 1)) {
          if ((local_18 === 0)) {
            if ((s8(_MEM[DAT_0064f37e + (local_31c * 0x58 + local_14)]) === param_2)) {
              bVar1 = 1;
            }
          }
          else if ((s8(_MEM[DAT_0064f37b + (local_31c * 0x58 + local_14)]) === param_2)) {
            bVar1 = 1;
          }
        }
        if (bVar1) {
          FUN_0040bbb0();
          FUN_0040bbe0((DAT_0064f360 + local_31c * 0x58));
          FUN_0040fea0();
          if ((s8(_MEM[DAT_0064f348 + local_31c * 0x58]) === param_1)) {
            FUN_0040ff30(s8(_MEM[DAT_0064f349 + local_31c * 0x58]));
          }
          else {
            uVar3 = FUN_00410070(s8(_MEM[DAT_0064f348 + local_31c * 0x58]));
            FUN_0040bbe0(uVar3);
            FUN_00421d30();
            if ((_MEM[DAT_0064f34d + (local_31c * 0x58 + param_1)] !== 0)) {
              FUN_0040ff30(s8(_MEM[DAT_0064f34d + (local_31c * 0x58 + param_1)]));
            }
            else {
              FUN_0040ff30(s8(_MEM[DAT_0064f349 + local_31c * 0x58]));
            }
          }
          FUN_0040fed0();
          FUN_0040fe10();
          FUN_0040bc10(((local_18 === 0) + 0x56));
          FUN_0040fe10();
          FUN_0040ff00(s32((DAT_0064b168 + param_2 * 4), 0));
          FUN_0059edf0(DAT_00679640, local_31c, 0);
          local_314 = (local_314 + 1);
          local_318 = (local_318 + 1);
        }
      }
    }
    if ((local_318 !== 0)) {
      FUN_0059edf0(DAT_00625efc, -1, 0);
    }
  }
  if ((local_314 === 0)) {
    FUN_00421e70(s_SUPPLYNONE_00625f00, 1);
  }
  else {
    FUN_0040bc80(0);
  }
  local_8 = -1;
  FUN_0042bc22();
  FUN_0042bc38();
  return;
}


 export function FUN_0042bc22 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0042bc38 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0042bc47 (param_1)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0042bd77;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar1 = FUN_004bd9f0(param_1, 0x54);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_0042bd6b();
    FUN_0042bd81();
    return;
  }
  while ((iVar1 < 0)) {
    FUN_0040ffa0(s_SUPPLYSEARCH_00625f0c, 0x40001);
    for (/* cond: (local_14 < 0x10) */); local_14 = (local_14 < 0x10); local_14 = (local_14 + 1)) {
      uVar3 = 0;
      iVar1 = local_14;
      uVar2 = FUN_00428b0c(s32((DAT_0064b168 + local_14 * 4), 0), local_14, 0);
      FUN_0059edf0(uVar2, iVar1, uVar3);
    }
    iVar1 = FUN_0040bc80(0);
    if ((iVar1 < 0));
    if ((iVar1 < 0)) {
      local_8 = -1;
      FUN_0042bd6b();
      FUN_0042bd81();
      return;
    }
  }
  local_8 = -1;
  FUN_0042bd6b();
  FUN_0042bd81();
  return;
}


 export function FUN_0042bd6b ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0042bd81 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042cc50)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042bd8f ()

 {
  let extraout_EAX;
  let uVar1;
  let iVar2;
  let local_18c;
  let local_17c;
  let local_16c;
  let local_15c;
  let local_14c;
  let local_13c;
  let local_12c;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;
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
  let aiStack_c8;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  local_11c = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_f4 = (DAT_0063ec38 + 2);
  local_10c = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_20 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x548), 0));
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_f4, DAT_0063ec3c);
  local_f4 = (local_f4 + local_20);
  FUN_0040bbb0();
  local_108 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + local_11c * 0x594]) - 1), 0, 4);
  FUN_0040bc10((local_108 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar1 = FUN_00493c7d(local_11c);
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_f4, DAT_0063ec3c);
  local_f4 = (local_f4 + local_20);
  FUN_0040bbb0();
  uVar1 = FUN_00493ba6(local_11c);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  uVar1 = FUN_00493b10(local_11c);
  FUN_0040bbe0(uVar1);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_f4, DAT_0063ec3c);
  _DAT_0063ef78 = (local_f4 + local_20);
  local_f4 = ((local_f4 + local_20) + 4);
  local_20 = 0x18;
  wv(DAT_0063ef80, 0x18);
  _DAT_0063ef78 = ((local_f4 + local_20) + 0xc);
  _DAT_0063ef7c = (local_10c - local_f4);
  wv(DAT_0063ef74, FUN_005adfa0(((local_10c - local_f4) / 0x18 | 0), 1, 0x63));
  local_8 = FUN_005adfa0(((local_10c - local_f4) / 0x18 | 0), 1, 0x63);
  for (/* cond: (local_fc < 0x27) */); local_fc = (local_fc < 0x27); local_fc = (local_fc + 1)) {
    w32(DAT_ffffff38, local_fc, 0);
  }
  local_d8 = 0;
  local_1c = 0;
  local_114 = 0;
  local_cc = 0;
  local_e0 = 0;
  for (/* cond: (local_ec < ((DAT_00655b18) << 16 >> 16)) */); local_ec = (local_ec < ((DAT_00655b18) << 16 >> 16)); local_ec = (local_ec + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_ec * 0x58]) === local_11c)) {
      local_e0 = (local_e0 + 1);
      for (/* cond: (local_fc < 0x27) */); local_fc = (local_fc < 0x27); local_fc = (local_fc + 1)) {
        local_e8 = FUN_004f00f0(local_11c, local_fc);
        if ((iVar2 !== 0)) {
          w32(DAT_ffffff38, local_fc, (s32(DAT_ffffff38, local_fc) + 1));
        }
      }
      if (((_MEM[DAT_0064f344 + local_ec * 0x58] & 1) === 0)) {
        local_cc = (local_cc + ((s16((DAT_0064f38c + local_ec * 0x58), 0)) << 16 >> 16));
        local_114 = (local_114 + ((s16((DAT_0064f38a + local_ec * 0x58), 0)) << 16 >> 16));
      }
    }
  }
  for (/* cond: (local_fc < 0x27) */); local_fc = (local_fc < 0x27); local_fc = (local_fc + 1)) {
    if ((s32(DAT_ffffff38, local_fc) !== 0)) {
      iVar2 = FUN_004f00f0(local_11c, local_fc);
      local_1c = (local_1c + iVar2 * s32(DAT_ffffff38, local_fc));
      local_d8 = (local_d8 + 1);
    }
  }
  local_28 = (local_e0 + 6);
  local_f8 = (local_d8 + 3);
  local_24 = local_f8;
  if ((local_f8 <= local_28)) {
    local_24 = local_28;
  }
  _DAT_0063ef68 = FUN_005adfa0((((local_8 + -1) + local_24) / local_8 | 0), 1, 0x63);
  uVar1 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
  wv(DAT_0063ef70, FUN_005adfa0(DAT_0063ef70, 0, uVar1));
  local_118 = local_f4;
  local_104 = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
  local_f0 = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
  do {
    if (((local_104 + local_8) <= local_f0)) {
      if ((DAT_0063efa8 === 0)) {
        FUN_00408680(DAT_ffffffe8, ((DAT_0063edd4 - DAT_0063efa4) + -2), local_f4, (DAT_0063edd4 + -2), local_10c);
        FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 1);
        uVar1 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
        FUN_0040fd40(0, uVar1);
        FUN_0040fcf0(DAT_0063ef70);
        FUN_005db0d0(DAT_0063ef74);
        FUN_0040fd80(LAB_0040268f);
        FUN_0040f380();
        wv(DAT_0063efa8, 1);
      }
      FUN_00408460();
      return;
    }
    if ((local_f0 < local_24)) {
      local_100 = (DAT_0063ec34 + 2);
      local_d0 = (DAT_0063ec34 + 0x14f);
      if ((local_f0 === 0)) {
        local_e4 = (local_118 + 0xa);
        FUN_0040bbb0();
        uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x5b0), 0));
        FUN_0040bbe0(uVar1);
        FUN_005baec8(DAT_0063eac0);
        FUN_005baee0(0x29, 0xa, 1, 1);
        FUN_0043c8d0(DAT_00679640, (local_100 + 0x8a), local_e4);
        FUN_0040bbb0();
        uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x5b4), 0));
        FUN_0040bbe0(uVar1);
        FUN_0043c8d0(DAT_00679640, local_d0, local_e4);
        local_118 = (local_118 + local_20);
      }
      else {
        local_e4 = (local_118 + 9);
        local_d4 = (local_f0 - 1);
        if ((local_d4 < local_e0)) {
          local_2c = 0;
          local_110 = -1;
          for (/* cond: (local_ec < ((DAT_00655b18) << 16 >> 16)) */); local_ec = (local_ec < ((DAT_00655b18) << 16 >> 16)); local_ec = (local_ec + 1)) {
            if ((s8(_MEM[DAT_0064f348 + local_ec * 0x58]) === local_11c)) {
              if ((local_d4 === local_2c)) {
                local_110 = local_ec;
                break;
              }
              local_2c = (local_2c + 1);
            }
          }
          if ((-1 < local_110)) {
            local_ec = local_110;
            local_dc = ((local_f0 & 1) * 0x40 + local_100);
            FUN_0056d289(DAT_0063eb10, local_110, 0, local_dc, local_118, 0);
            FUN_005baec8(DAT_0063eab8);
            FUN_005baee0(0x25, 0x12, 1, 1);
            local_100 = (local_100 + 0x8a);
            FUN_0043c8d0((DAT_0064f360 + local_ec * 0x58), local_100, local_e4);
            local_100 = (local_100 + 0x69);
            local_dc = local_100;
            if (((_MEM[DAT_0064f344 + local_ec * 0x58] & 1) === 0)) {
              FUN_0040bbb0();
              FUN_0040ff30(((s16((DAT_0064f38c + local_ec * 0x58), 0)) << 16 >> 16));
              local_dc = FUN_0043c8d0(DAT_00679640, local_dc, local_e4);
              local_dc = (local_dc + 2);
              FUN_005cef31(DAT_fffffed4, DAT_0063eb10, local_dc, (local_e4 + 2));
              local_dc = (local_dc + 0x12);
              FUN_0040bbb0();
              FUN_0040ff30(((s16((DAT_0064f38a + local_ec * 0x58), 0)) << 16 >> 16));
              local_dc = FUN_0043c8d0(DAT_00679640, local_dc, local_e4);
              local_dc = (local_dc + 2);
              FUN_005cef31(DAT_fffffec4, DAT_0063eb10, local_dc, (local_e4 + 2));
              local_dc = (local_dc + 0x12);
            }
            else {
              FUN_0040bbb0();
              FUN_0040bc10(0x86);
              FUN_005baee0(0x6a, 0x12, 1, 1);
              FUN_0043c8d0(DAT_00679640, local_dc, local_e4);
            }
          }
        }
        else if (((local_e0 + 1) === local_d4)) {
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x29, 0xa, 1, 1);
          FUN_0040bbb0();
          FUN_0040bc10(0x87);
          FUN_0040fe40();
          FUN_0040ff30(local_1c);
          local_dc = FUN_0043c8d0(DAT_00679640, (local_100 + 0x8a), local_e4);
          FUN_005cef31(DAT_fffffeb4, DAT_0063eb10, local_dc, (local_e4 + 2));
        }
        else if (((local_e0 + 2) === local_d4)) {
          FUN_0040bbb0();
          FUN_0040bc10(0x88);
          FUN_0040fe40();
          FUN_0043c870(local_cc);
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x29, 0xa, 1, 1);
          local_dc = FUN_0043c8d0(DAT_00679640, (local_100 + 0x8a), local_e4);
          FUN_005cef31(DAT_fffffea4, DAT_0063eb10, local_dc, (local_e4 + 2));
        }
        else if (((local_e0 + 3) === local_d4)) {
          FUN_0040bbb0();
          FUN_0040bc10(0x16e);
          FUN_0040fe40();
          FUN_0040ff30(local_114);
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x29, 0xa, 1, 1);
          local_dc = FUN_0043c8d0(DAT_00679640, (local_100 + 0x8a), local_e4);
          FUN_005cef31(DAT_fffffe94, DAT_0063eb10, local_dc, (local_e4 + 2));
        }
        else if (((local_e0 + 4) === local_d4)) {
          FUN_0040bbb0();
          FUN_0040bc10(0x89);
          FUN_0040fe40();
          local_e8 = FUN_004c2788(local_11c);
          if ((local_e8 < 2)) {
            local_e8 = 1;
          }
          if ((local_114 < 2)) {
            local_114 = 1;
          }
          FUN_0040ff30((((local_114 + -1) + local_e8) / local_114 | 0));
          FUN_0040fe10();
          FUN_0040bc10(0x2c);
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x29, 0xa, 1, 1);
          FUN_0043c8d0(DAT_00679640, (local_100 + 0x8a), local_e4);
        }
        if ((local_d4 < local_d8)) {
          local_110 = -1;
          local_2c = 0;
          for (/* cond: (local_fc < 0x27) */); local_fc = (local_fc < 0x27); local_fc = (local_fc + 1)) {
            if ((s32(DAT_ffffff38, local_fc) !== 0)) {
              if ((local_d4 === local_2c)) {
                local_110 = local_fc;
                break;
              }
              local_2c = (local_2c + 1);
            }
          }
          if ((-1 < local_110)) {
            FUN_005baec8(DAT_0063eab8);
            local_fc = local_110;
            FUN_0040bbb0();
            FUN_0040ff30(s32(DAT_ffffff38, local_fc));
            FUN_0040fe10();
            FUN_0040ff00(s32((DAT_0064c488 + local_fc * 8), 0));
            FUN_0040fe10();
            FUN_0040fea0();
            FUN_0040bc10(0x84);
            FUN_0040fe40();
            iVar2 = FUN_004f00f0(local_11c, local_fc);
            FUN_0040ff30(iVar2 * s32(DAT_ffffff38, local_fc));
            FUN_005baee0(0x7a, 0xa, 1, 1);
            local_dc = FUN_0043c8d0(DAT_00679640, local_d0, local_e4);
            FUN_005cef31(DAT_fffffe84, DAT_0063eb10, local_dc, (local_e4 + 2));
            local_dc = (local_dc + 0xe);
            FUN_0040bbb0();
            FUN_0040fed0();
            local_dc = FUN_0043c8d0(DAT_00679640, local_dc, local_e4);
          }
        }
        else if (((local_d8 + 1) === local_d4)) {
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x7a, 0xa, 1, 1);
          FUN_0040bbb0();
          FUN_0040bc10(0x87);
          FUN_0040fe40();
          FUN_0040ff30(local_1c);
          local_dc = FUN_0043c8d0(DAT_00679640, local_d0, local_e4);
          FUN_005cef31(DAT_fffffe74, DAT_0063eb10, local_dc, (local_e4 + 2));
        }
        local_118 = (local_118 + local_20);
      }
    }
    local_f0 = (local_f0 + 1);
  } ( true );
}


 export function FUN_0042ccf4 (param_1)

 {
  wv(DAT_0063ef70, param_1);
  FUN_0042bd8f();
  return;
}


 export function FUN_0042cd11 ()

 {
  FUN_0042bc47(DAT_0063ef6c);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042cddd)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0042ce68)  */ */ export function FUN_0042cd2f (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  FUN_0042a7bc(5, 5, 0, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
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
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x5bc), 0));
  FUN_0040f680(DAT_0063eb58, 0x65, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00402ca2);
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042d56a)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042ced6 ()

 {
  let uVar1;
  let extraout_EAX;
  let uVar2;
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
  let local_8;

  local_5c = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_40 = (DAT_0063ec38 + 2);
  local_54 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_1c = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x538), 0));
  FUN_0040bbe0(uVar2);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_40, DAT_0063ec3c);
  local_40 = (local_40 + local_1c);
  FUN_0040bbb0();
  local_50 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + local_5c * 0x594]) - 1), 0, 4);
  FUN_0040bc10((local_50 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar2 = FUN_00493c7d(local_5c);
  FUN_0040bbe0(uVar2);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_40, DAT_0063ec3c);
  local_40 = (local_40 + local_1c);
  FUN_0040bbb0();
  uVar2 = FUN_00493ba6(local_5c);
  FUN_0040bbe0(uVar2);
  FUN_0040fe10();
  uVar2 = FUN_00493b10(local_5c);
  FUN_0040bbe0(uVar2);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_40, DAT_0063ec3c);
  _DAT_0063ef78 = (local_40 + local_1c);
  local_40 = ((local_40 + local_1c) + 2);
  local_1c = 0x18;
  wv(DAT_0063ef80, 0x18);
  _DAT_0063ef78 = ((local_40 + local_1c) + 0xa);
  _DAT_0063ef7c = (local_54 - local_40);
  wv(DAT_0063ef74, FUN_005adfa0(((local_54 - local_40) / 0x18 | 0), 1, 0x63));
  local_28 = 0;
  for (/* cond: (local_38 < ((DAT_00655b18) << 16 >> 16)) */); local_38 = (local_38 < ((DAT_00655b18) << 16 >> 16)); local_38 = (local_38 + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_38 * 0x58]) === local_5c)) {
      local_28 = (local_28 + 1);
    }
  }
  local_8 = FUN_005adfa0(((local_54 - local_40) / 0x18 | 0), 1, 0x63);
  _DAT_0063ef68 = FUN_005adfa0((((FUN_005adfa0(((local_54 - local_40) / 0x18 | 0), 1, 0x63) + -1) + local_28) / FUN_005adfa0(((local_54 - local_40) / 0x18 | 0), 1, 0x63) | 0), 1, 0x63);
  uVar2 = FUN_005adfa0((local_28 + -1), 0, 0x3e7);
  wv(DAT_0063ef70, FUN_005adfa0(DAT_0063ef70, 0, uVar2));
  local_3c = 0;
  local_58 = local_40;
  local_4c = FUN_005adfa0(DAT_0063ef70, 0, uVar2);
  for (/* cond: (local_38 < ((DAT_00655b18) << 16 >> 16)) */); local_38 = (local_38 < ((DAT_00655b18) << 16 >> 16)); local_38 = (local_38 + 1)) {
    uVar1 = local_3c;
    if ((local_3c < (local_4c + local_8))) {
      local_48 = (((uVar1 & 1) * 0x40 + DAT_0063ec34) + 2);
      local_3c = uVar1;
      FUN_0056d289(DAT_0063eb10, local_38, 0, local_48, local_58, 0);
      FUN_005baec8(DAT_0063eab8);
      FUN_005baee0(0x25, 0x12, 1, 1);
      local_2c = (local_58 + 9);
      local_48 = (DAT_0063ec34 + 0x8c);
      FUN_0043c8d0((DAT_0064f360 + local_38 * 0x58), local_48, local_2c);
      local_48 = (local_48 + 0x69);
      local_24 = local_48;
      for (/* cond: (local_20 < 3) */); local_20 = (local_20 < 3); local_20 = (local_20 + 1)) {
        FUN_0040bbb0();
        if ((local_20 === 0)) {
          FUN_0040ff30(_MEM[DAT_0064f390 + local_38 * 0x58]);
        }
        else if ((local_20 === 1)) {
          FUN_0040ff30(_MEM[DAT_0064f391 + local_38 * 0x58]);
        }
        else {
          FUN_0040ff30(((s16((DAT_0064f38e + local_38 * 0x58), 0)) << 16 >> 16));
        }
        local_24 = FUN_0043c8d0(DAT_00679640, local_24, local_2c);
        local_24 = (local_24 + 2);
        FUN_005cef31(DAT_ffffff94, DAT_0063eb10, local_24, local_2c);
        local_24 = (local_24 + 0x12);
      }
      local_48 = (local_48 + 0x78);
      local_24 = local_48;
      FUN_0040bbb0();
      if ((_MEM[DAT_0064f379 + local_38 * 0x58] < 0)) {
        local_44 = (-s8(_MEM[DAT_0064f379 + local_38 * 0x58]));
        FUN_0040ff00(s32((DAT_0064c488 + s8(_MEM[DAT_0064f379 + local_38 * 0x58]) * -8), 0));
        FUN_0040fe10();
        if ((0x26 < local_44)) {
          FUN_005baee0(0x5e, 0xa, -1, -1);
        }
        local_30 = u8(_MEM[DAT_0064c48c + local_44 * 8]);
      }
      else {
        FUN_005baee0(0x7a, 0xa, -1, -1);
        local_34 = s8(_MEM[DAT_0064f379 + local_38 * 0x58]);
        FUN_0040ff00(s32((DAT_0064b1b8 + local_34 * 0x14), 0));
        FUN_0040fe10();
        local_30 = s8(_MEM[DAT_0064b1c8 + local_34 * 0x14]);
      }
      local_24 = FUN_0043c8d0(DAT_00679640, local_24, local_2c);
      local_24 = (local_24 + 4);
      FUN_0040bbb0();
      FUN_0040fea0();
      FUN_0040ff30(((s16((DAT_0064f35c + local_38 * 0x58), 0)) << 16 >> 16));
      FUN_0040bbe0(DAT_00625f1c);
      FUN_0040ff30(u8(DAT_0064bccc) * local_30);
      FUN_0040fed0();
      FUN_005baee0(0x21, 0x12, -1, -1);
      FUN_0043c8d0(DAT_00679640, local_24, local_2c);
      local_58 = (local_58 + local_1c);
      uVar1 = local_3c;
    }
    local_3c = uVar1;
  }
  if ((DAT_0063efa8 === 0)) {
    FUN_00408680(DAT_ffffffe8, ((DAT_0063edd4 - DAT_0063efa4) + -2), local_40, (DAT_0063edd4 + -2), local_54);
    FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 1);
    uVar2 = FUN_005adfa0((local_28 + -1), 0, 0x3e7);
    FUN_0040fd40(0, uVar2);
    FUN_0040fcf0(DAT_0063ef70);
    FUN_005db0d0(DAT_0063ef74);
    FUN_0040fd80(LAB_00403314);
    FUN_0040f380();
    FUN_00408130(LAB_00402437);
    wv(DAT_0063efa8, 1);
  }
  FUN_00408460();
  return;
}


 export function FUN_0042d618 (param_1)

 {
  wv(DAT_0063ef70, param_1);
  FUN_0042ced6();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042d635 (param_1, param_2)

 {
  let iVar1;
  let bVar2;
  let local_c;
  let local_8;

  if ((iVar1 < DAT_0063ef74)) {
    local_8 = 0;
    for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
      if (bVar2) {
        FUN_00509590(local_c);
        return;
      }
    }
  }
  return;
}


 export function FUN_0042d71e (param_1)

 {
  FUN_0042a7bc(1, 1, 0, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 export function FUN_0042d781 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let puVar1;
  let puVar2;
  let iVar3;
  let uVar4;
  let local_54;
  let local_44;
  let local_34;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = FUN_00548b70(s8(_MEM[DAT_0064f349 + param_1 * 0x58]), 0x1c, param_4, 0, 0);
  local_8 = 0;
  wv(DAT_006a6604, (s32((DAT_0064f370 + param_1 * 0x58), 0) >>> 0x1a));
  for (/* cond: (local_c < param_5) */); local_c = (local_c < param_5); local_c = (local_c + 1)) {
    puVar2 = DAT_0063eb10;
    puVar1 = DAT_ffffffdc;
    iVar3 = param_2;
    uVar4 = param_3;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]), puVar1, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(puVar1, puVar2, iVar3, uVar4);
    param_2 = (param_2 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) - ((param_6 + DAT_006a6604) + param_5))) */);
      local_c = (local_c < (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) - ((param_6 + DAT_006a6604) + param_5))); local_c = (local_c + 1)) {
    puVar2 = DAT_0063eb10;
    puVar1 = DAT_ffffffcc;
    iVar3 = param_2;
    uVar4 = param_3;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]), puVar1, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(puVar1, puVar2, iVar3, uVar4);
    param_2 = (param_2 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < param_6) */); local_c = (local_c < param_6); local_c = (local_c + 1)) {
    if ((local_c < (param_6 - param_7))) {
      local_14 = 4;
    }
    else {
      local_14 = 6;
    }
    puVar2 = DAT_0063eb10;
    puVar1 = DAT_ffffffbc;
    iVar3 = param_2;
    uVar4 = param_3;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]), puVar1, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(puVar1, puVar2, iVar3, uVar4);
    param_2 = (param_2 + local_10);
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_c < DAT_006a6604) */); local_c = (local_c < DAT_006a6604); local_c = (local_c + 1)) {
    puVar2 = DAT_0063eb10;
    puVar1 = DAT_ffffffac;
    iVar3 = param_2;
    uVar4 = param_3;
    FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]), puVar1, DAT_0063eb10, param_2, param_3);
    FUN_004e75a6(param_1, local_c);
    FUN_005cef31(puVar1, puVar2, iVar3, uVar4);
    param_2 = (param_2 + local_10);
  }
  return local_10;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042dfd1)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042da1d ()

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let extraout_EAX;
  let uVar7;
  let iVar8;
  let local_50;
  let local_38;
  let local_34;
  let local_24;
  let local_18;
  let local_8;

  iVar4 = DAT_0063ef6c;
  uVar2 = (DAT_00655aee & 4);
  wv(DAT_00655aee, (DAT_00655aee & 0xfffb));
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar5 = (DAT_0063ec38 + 2);
  iVar6 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar7 = FUN_00428b0c(s32((DAT_00628420 + 0x544), 0));
  FUN_0040bbe0(uVar7);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar5, DAT_0063ec3c);
  iVar5 = (iVar5 + extraout_EAX);
  FUN_0040bbb0();
  iVar8 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + iVar4 * 0x594]) - 1), 0, 4);
  FUN_0040bc10((iVar8 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar7 = FUN_00493c7d(iVar4);
  FUN_0040bbe0(uVar7);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar5, DAT_0063ec3c);
  iVar5 = (iVar5 + extraout_EAX);
  FUN_0040bbb0();
  uVar7 = FUN_00493ba6(iVar4);
  FUN_0040bbe0(uVar7);
  FUN_0040fe10();
  uVar7 = FUN_00493b10(iVar4);
  FUN_0040bbe0(uVar7);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar5, DAT_0063ec3c);
  iVar5 = ((iVar5 + extraout_EAX) + 2);
  wv(DAT_0063ef80, 0x20);
  _DAT_0063ef7c = (iVar6 - iVar5);
  _DAT_0063ef78 = iVar5;
  wv(DAT_0063ef74, FUN_005adfa0(((iVar6 - iVar5) / 0x20 | 0), 1, 0x63));
  local_24 = 0;
  for (/* cond: (local_34 < ((DAT_00655b18) << 16 >> 16)) */); local_34 = (local_34 < ((DAT_00655b18) << 16 >> 16)); local_34 = (local_34 + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_34 * 0x58]) === iVar4)) {
      local_24 = (local_24 + 1);
    }
  }
  local_8 = FUN_005adfa0(((iVar6 - iVar5) / 0x20 | 0), 1, 0x63);
  _DAT_0063ef68 = FUN_005adfa0((((FUN_005adfa0(((iVar6 - iVar5) / 0x20 | 0), 1, 0x63) + -1) + local_24) / FUN_005adfa0(((iVar6 - iVar5) / 0x20 | 0), 1, 0x63) | 0), 1, 0x63);
  uVar7 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
  iVar8 = FUN_005adfa0(DAT_0063ef70, 0, uVar7);
  local_38 = 0;
  wv(DAT_0063ef70, iVar8);
  local_50 = iVar5;
  for (/* cond: (local_34 < ((DAT_00655b18) << 16 >> 16)) */); local_34 = (local_34 < ((DAT_00655b18) << 16 >> 16)); local_34 = (local_34 + 1)) {
    uVar1 = local_38;
    if ((local_38 < (iVar8 + local_8))) {
      if ((4 < _MEM[DAT_0064c6b5 + iVar4 * 0x594])) {
        FUN_004eb4ed(local_34, 1);
      }
      FUN_0056d289(DAT_0063eb10, local_34, 0, (((uVar1 & 1) * 0x40 + DAT_0063ec34) + 2), local_50, 0);
      FUN_005baec8(DAT_0063eab8);
      FUN_005baee0(0x25, 0x12, 1, 1);
      if (((s8(_MEM[DAT_0064f349 + local_34 * 0x58]) - s8(_MEM[DAT_0064f392 + local_34 * 0x58])) <= (s8(_MEM[DAT_0064f349 + local_34 * 0x58]) >> 1))) {
        FUN_005baee0(0x29, 0x12, -1, -1);
      }
      if ((_MEM[DAT_0064f392 + local_34 * 0x58] < _MEM[DAT_0064f393 + local_34 * 0x58])) {
        FUN_005baee0(0x6a, 0x12, -1, -1);
      }
      iVar3 = DAT_0063ec34;
      FUN_0043c8d0((DAT_0064f360 + local_34 * 0x58), (DAT_0063ec34 + 0x8c), (local_50 + 9));
      FUN_0042d781(local_34, (iVar3 + 0xf5), (local_50 + 3), (((DAT_0063edd4 - DAT_0063efa4) + -32) - (iVar3 + 0xf5)), s8(_MEM[DAT_0064f392 + local_34 * 0x58]), s8(_MEM[DAT_0064f393 + local_34 * 0x58]), 0);
      local_50 = (local_50 + 0x20);
    }
    local_38 = uVar1;
  }
  if ((DAT_0063efa8 === 0)) {
    FUN_00408680(DAT_ffffffe8, ((DAT_0063edd4 - DAT_0063efa4) + -2), iVar5, (DAT_0063edd4 + -2), iVar6);
    FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 1);
    uVar7 = FUN_005adfa0((local_24 + -1), 0, 0x3e7);
    FUN_0040fd40(0, uVar7);
    FUN_0040fcf0(DAT_0063ef70);
    FUN_005db0d0(DAT_0063ef74);
    FUN_0040fd80(LAB_004032fb);
    FUN_0040f380();
    FUN_00408130(LAB_004019fb);
    wv(DAT_0063efa8, 1);
  }
  FUN_00408460();
  return;
}


 export function FUN_0042e07f (param_1)

 {
  wv(DAT_0063ef70, param_1);
  FUN_0042da1d();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042e09c (param_1, param_2)

 {
  let iVar1;
  let bVar2;
  let local_c;
  let local_8;

  if ((iVar1 < DAT_0063ef74)) {
    local_8 = 0;
    for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
      if (bVar2) {
        FUN_00509590(local_c);
        return;
      }
    }
  }
  return;
}


 export function FUN_0042e185 (param_1)

 {
  FUN_0042a7bc(4, 4, 0, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  FUN_0042acb0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 export function FUN_0042e1e8 (param_1)

 {
  if ((DAT_0063e4f4 !== 0)) {
    FUN_00421d30();
  }
  wv(DAT_0063e4f4, 1);
  FUN_0040bc10(param_1);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042ef32)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042e220 ()

 {
  let uVar1;
  let cVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let extraout_EAX;
  let uVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let local_94;
  let local_78;
  let local_74;
  let acStack_70;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  iVar3 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar4 = (DAT_0063ec38 + 2);
  iVar5 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_1c = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x53c), 0));
  FUN_0040bbe0(uVar6);
  FUN_0040fe40();
  if ((DAT_0063efac === 0)) {
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x560), 0));
    FUN_0040bbe0(uVar6);
  }
  else {
    uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x564), 0));
    FUN_0040bbe0(uVar6);
  }
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar4, DAT_0063ec3c);
  iVar4 = (iVar4 + local_1c);
  FUN_0040bbb0();
  iVar7 = FUN_005adfa0((u8(_MEM[DAT_0064c6b5 + iVar3 * 0x594]) - 1), 0, 4);
  FUN_0040bc10((iVar7 + 0x148));
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar6 = FUN_00493c7d(iVar3);
  FUN_0040bbe0(uVar6);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar4, DAT_0063ec3c);
  iVar4 = (iVar4 + local_1c);
  FUN_0040bbb0();
  uVar6 = FUN_00493ba6(iVar3);
  FUN_0040bbe0(uVar6);
  FUN_0040fe10();
  uVar6 = FUN_00493b10(iVar3);
  FUN_0040bbe0(uVar6);
  FUN_0040fe40();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar4, DAT_0063ec3c);
  iVar4 = (iVar4 + local_1c);
  iVar7 = (iVar4 + 2);
  local_1c = 0x18;
  wv(DAT_0063ef80, 0x18);
  _DAT_0063ef78 = (iVar4 + 0x1a);
  _DAT_0063ef7c = (iVar5 - iVar7);
  wv(DAT_0063ef74, FUN_005adfa0(((iVar5 - iVar7) / 0x18 | 0), 1, 0x63));
  local_8 = FUN_005adfa0(((iVar5 - iVar7) / 0x18 | 0), 1, 0x63);
  local_2c = 0;
  local_74 = 0;
  do {
    if ((0x3d < local_74)) {
      _DAT_0063ef68 = FUN_005adfa0((((local_8 + -1) + local_2c) / local_8 | 0), 1, 0x63);
      uVar6 = FUN_005adfa0((local_2c + -1), 0, 0x3e7);
      iVar4 = FUN_005adfa0(DAT_0063ef70, 0, uVar6);
      local_78 = 0;
      wv(DAT_0063ef70, iVar4);
      local_94 = iVar7;
      for (/* cond: (local_74 < 0x3e) */); local_74 = (local_74 < 0x3e); local_74 = (local_74 + 1)) {
        uVar1 = local_78;
        if ((local_78 < (iVar4 + local_8))) {
          iVar8 = ((uVar1 & 1) * 0x40 + DAT_0063ec34);
          uVar6 = FUN_00472d20(local_74, iVar3);
          FUN_0056baff(DAT_0063eb10, uVar6, 0, (iVar8 + 2), local_94, 0, 0);
          FUN_005baec8(DAT_0063eab8);
          FUN_005baee0(0x25, 0x12, 1, 1);
          iVar8 = DAT_0063ec34;
          local_30 = (local_94 + 0x11);
          uVar6 = FUN_00428b0c(s32((DAT_0064b1b8 + local_74 * 0x14), 0), (DAT_0063ec34 + 0x8c), local_30);
          FUN_0043c8d0(uVar6);
          local_28 = (iVar8 + 0xec);
          if ((DAT_0063efac === 0)) {
            FUN_0040bbb0();
            FUN_0040ff30(s8(_MEM[DAT_0064b1c4 + local_74 * 0x14]));
            FUN_0040bbe0(DAT_00625f20);
            FUN_0040ff30(s8(_MEM[DAT_0064b1c5 + local_74 * 0x14]));
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 4) !== 0)) {
              FUN_0040bbe0(DAT_00625f24);
            }
            FUN_0040bbe0(DAT_00625f28);
            FUN_0040ff30((s8(_MEM[DAT_0064b1c2 + local_74 * 0x14]) / u8(DAT_0064bcc8) | 0));
            FUN_0043c8d0(DAT_00679640, local_28, local_30);
            local_28 = (iVar8 + 0x123);
            FUN_0040bbb0();
            FUN_0040ff30((s8(_MEM[DAT_0064b1c6 + local_74 * 0x14]) / 0xa | 0));
            FUN_0040bbe0(DAT_00625f2c);
            FUN_0040ff30(s8(_MEM[DAT_0064b1c7 + local_74 * 0x14]));
            FUN_0043c8d0(DAT_00679640, local_28, local_30);
            local_28 = (iVar8 + 0x143);
            if ((_MEM[DAT_0064c778 + (iVar3 * 0x594 + local_74)] !== 0)) {
              FUN_005baee0(0x7a, 0xa, -1, -1);
              FUN_0040bbb0();
              FUN_0040ff30(_MEM[DAT_0064c778 + (iVar3 * 0x594 + local_74)]);
              FUN_0040fe10();
              FUN_0040bc10(0x15a);
              FUN_0043c8d0(DAT_00679640, local_28, local_30);
            }
            local_28 = (iVar8 + 0x180);
            if ((_MEM[DAT_0064c7f4 + (iVar3 * 0x594 + local_74)] !== 0)) {
              FUN_005baee0(0x5e, 0xa, -1, -1);
              FUN_0040bbb0();
              FUN_0040ff30(_MEM[DAT_0064c7f4 + (iVar3 * 0x594 + local_74)]);
              FUN_0040fe10();
              FUN_0040bc10(0x15b);
              FUN_0043c8d0(DAT_00679640, local_28, local_30);
            }
            local_28 = (iVar8 + 0x1c1);
            FUN_0040bbb0();
            FUN_005baee0(0x7a, 0xa, -1, -1);
            wv(DAT_0063e4f4, 0);
            cVar2 = _MEM[DAT_0064b1c9 + local_74 * 0x14];
            if ((cVar2 !== 0)) {
              FUN_0040bc10(0x15c);
              FUN_0040fe10();
              FUN_0040ff30(s8(_MEM[DAT_0064b1c9 + local_74 * 0x14]));
            }
            wv(DAT_0063e4f4, u8((cVar2 !== 0)));
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 0x10) === 0)) {
              if ((_MEM[DAT_0064b1c1 + local_74 * 0x14] === 1)) {
                FUN_0042e1e8(0x15d);
              }
            }
            else {
              FUN_0042e1e8(0x15e);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 1) !== 0)) {
              FUN_0042e1e8(0x15f);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 2) !== 0)) {
              FUN_0042e1e8(0x160);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 0x40) !== 0)) {
              FUN_0042e1e8(0x161);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 4) !== 0)) {
              FUN_0042e1e8(0x162);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 8) !== 0)) {
              FUN_0042e1e8(0x163);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 0x80) !== 0)) {
              FUN_0042e1e8(0x164);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 1) !== 0)) {
              FUN_0042e1e8(0x165);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 2) !== 0)) {
              FUN_0042e1e8(0x166);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 4) !== 0)) {
              FUN_0042e1e8(0x167);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 0x20) !== 0)) {
              FUN_0042e1e8(0x168);
            }
            if (((_MEM[DAT_0064b1bc + local_74 * 0x14] & 0x20) !== 0)) {
              FUN_0042e1e8(0x169);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 8) !== 0)) {
              FUN_0042e1e8(0x16a);
            }
            if (((_MEM[DAT_0064b1bd + local_74 * 0x14] & 0x40) !== 0)) {
              FUN_0042e1e8(0x16b);
            }
            if ((DAT_0063e4f4 !== 0)) {
              FUN_0043c8d0(DAT_00679640, local_28, local_30);
            }
          }
          else {
            iVar8 = (iVar8 + 0x100);
            local_28 = iVar8;
            if ((_MEM[DAT_0064c7b6 + (iVar3 * 0x594 + local_74)] !== 0)) {
              uVar6 = FUN_0043cb30(iVar3, 0x12, -1, -1);
              FUN_005baee0(uVar6);
              FUN_0040bbb0();
              FUN_0040ff30(_MEM[DAT_0064c7b6 + (iVar3 * 0x594 + local_74)]);
              FUN_0043c8d0(DAT_00679640, local_28, local_30);
            }
            local_28 = (local_28 + 0x1e);
            for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
              if ((iVar9 !== 0)) {
                if ((_MEM[DAT_0064c7b6 + (local_24 * 0x594 + local_74)] !== 0)) {
                  uVar6 = FUN_0043cb30(local_24, 0x12, -1, -1);
                  FUN_005baee0(uVar6);
                  FUN_0040bbb0();
                  FUN_0040ff30(_MEM[DAT_0064c7b6 + (local_24 * 0x594 + local_74)]);
                  FUN_0043c8d0(DAT_00679640, local_28, local_30);
                }
                local_28 = (local_28 + 0x1e);
              }
            }
            local_20 = iVar8;
          }
          local_94 = (local_94 + local_1c);
        }
        local_78 = uVar1;
      }
      if ((DAT_0063efac !== 0)) {
        FUN_00408680(DAT_ffffffe8, (local_20 + -8), iVar7, (local_20 + 0x10), iVar5);
        uVar6 = FUN_0043cab0(iVar3);
        FUN_0043c7c0(DAT_0063eb10, DAT_ffffffe8, uVar6);
      }
      if ((DAT_0063efa8 === 0)) {
        FUN_00408680(DAT_ffffffe8, ((DAT_0063edd4 - DAT_0063efa4) + -2), iVar7, (DAT_0063edd4 + -2), iVar5);
        FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 1);
        FUN_0040fd80(LAB_00403abc);
      }
      uVar6 = FUN_005adfa0((local_2c + -1), 0, 0x3e7);
      FUN_0040fd40(0, uVar6);
      FUN_0040fcf0(DAT_0063ef70);
      FUN_005db0d0(DAT_0063ef74);
      if ((DAT_0063efa8 === 0)) {
        FUN_0040f380();
        wv(DAT_0063efa8, 1);
      }
      FUN_00408460();
      return;
    }
    if ((DAT_0063efac === 0)) {
      if ((_MEM[DAT_0064c7f4 + (iVar3 * 0x594 + local_74)] === 0)) {
        _MEM[DAT_ffffff90 + local_74] = 0;
      }
      else {
        _MEM[DAT_ffffff90 + local_74] = 1;
      }
      if ((_MEM[DAT_ffffff90 + local_74] !== 0)) {
        local_2c = (local_2c + 1);
      }
    }
    else {
      _MEM[DAT_ffffff90 + local_74] = 0;
      for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        if ((iVar4 !== 0)) {
          _MEM[DAT_ffffff90 + local_74] = 1;
          local_2c = (local_2c + 1);
          break;
        }
      }
    }
    local_74 = (local_74 + 1);
  } ( true );
}


 export function FUN_0042efe3 (param_1)

 {
  wv(DAT_0063ef70, param_1);
  FUN_0042e220();
  return;
}


 export function FUN_0042f000 ()

 {
  wv(DAT_0063efac, u8((DAT_0063efac === 0)));
  if ((u8((DAT_0063efac === 0)) === 0)) {
    FUN_0043c5f0();
    FUN_0040f380();
  }
  else {
    FUN_0043c5f0();
    FUN_0040f380();
  }
  FUN_0042e220();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042f1bc)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0042f131)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0042f21a)  */ */ export function FUN_0042f079 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  FUN_0042a7bc(2, 2, 0, 0x258, 0x190, 0, 0);
  wv(DAT_0063ef6c, param_1);
  wv(DAT_0063efac, 0);
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
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x564), 0));
  FUN_0040f680(DAT_0063eb58, 0x65, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00403c1a);
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x560), 0));
  FUN_0040f680(DAT_0063eb58, 0x66, DAT_ffffffec, uVar3);
  FUN_0040f880(LAB_00403c1a);
  FUN_0043c5f0();
  wv(DAT_0063eb10, DAT_0063eb10);
  FUN_005bb574();
  FUN_004085f0();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004301aa)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0042f293 ()

 {
  let extraout_EAX;
  let uVar1;
  let extraout_EAX_00;
  let iVar2;
  let iVar3;
  let local_d0;
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
  let local_1c;
  let local_18;
  let local_8;

  local_c0 = DAT_0063ef6c;
  local_74 = DAT_0063efac;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_a8 = (DAT_0063ec38 + 2);
  local_b8 = (DAT_0063ec38 + 0x174);
  wv(DAT_0063eac0, DAT_0063eac0);
  local_1c = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x540), 0));
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_a8, DAT_0063ec3c);
  local_a8 = (local_a8 + local_1c);
  FUN_0040bbb0();
  uVar1 = FUN_00493ba6(local_74);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  uVar1 = FUN_00493b10(local_74);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar1 = FUN_00493c7d(local_74);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0045705e(local_c0, local_74);
  local_90 = FUN_004679ab(DAT_0064b114);
  FUN_0040fea0();
  FUN_0040ff00(s32((DAT_0064b9c0 + local_90 * 4), 0));
  if (((_MEM[DAT_0064c6c1 + (local_c0 * 0x594 + local_74 * 4)] & 0x20) === 0)) {
    if (((_MEM[DAT_0064c6c0 + (local_c0 * 0x594 + local_74 * 4)] & 8) === 0)) {
      if (((_MEM[DAT_0064c6c0 + (local_c0 * 0x594 + local_74 * 4)] & 4) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (local_c0 * 0x594 + local_74 * 4)] & 2) !== 0)) {
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
  FUN_0040fed0();
  uVar1 = FUN_0043cb30(local_74, 0x12, -1, -1);
  FUN_005baee0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_a8, DAT_0063ec3c);
  local_a8 = (local_a8 + local_1c);
  FUN_0040bbb0();
  local_8c = ((s16((DAT_0064c6a6 + local_74 * 0x594), 0)) << 16 >> 16);
  if ((_MEM[DAT_006554f8 + local_8c * 0x30] === 1)) {
    FUN_0040bc10(0x92);
    FUN_0040fe10();
  }
  if ((_MEM[DAT_006554f8 + local_8c * 0x30] === 0xff)) {
    FUN_0040bc10(0x93);
    FUN_0040fe10();
  }
  if ((_MEM[DAT_006554fa + local_8c * 0x30] === 1)) {
    FUN_0040bc10(0x96);
    FUN_0040fe10();
  }
  if ((_MEM[DAT_006554fa + local_8c * 0x30] === 0xff)) {
    FUN_0040bc10(0x97);
    FUN_0040fe10();
  }
  if ((_MEM[DAT_006554f9 + local_8c * 0x30] === 1)) {
    FUN_0040bc10(0x94);
    FUN_0040fe10();
  }
  if ((_MEM[DAT_006554f9 + local_8c * 0x30] === 0xff)) {
    FUN_0040bc10(0x95);
    FUN_0040fe10();
  }
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_a8, DAT_0063ec3c);
  local_a8 = ((local_a8 + local_1c) + 6);
  local_84 = (DAT_0063ec34 + 2);
  local_88 = ((DAT_0063ec3c + DAT_0063ec34) + -4);
  FUN_005baec8(DAT_0063eab8);
  wv(DAT_0063eab8, DAT_0063eab8);
  local_1c = extraout_EAX_00;
  FUN_0040bbb0();
  FUN_0040bc10(0x98);
  FUN_0040fe40();
  FUN_005baee0(0x7a, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_00679640, local_84, local_a8);
  FUN_0040bbb0();
  FUN_0040ff00(s32((DAT_0064b9a0 + u8(_MEM[DAT_0064c6b5 + local_74 * 0x594]) * 4), 0));
  FUN_005baee0(0x25, 0x12, -1, -1);
  FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  local_94 = -1;
  for (/* cond: (local_a0 < ((DAT_00655b18) << 16 >> 16)) */); local_a0 = (local_a0 < ((DAT_00655b18) << 16 >> 16)); local_a0 = (local_a0 + 1)) {
    if ((iVar2 !== 0)) {
      local_94 = local_a0;
      break;
    }
  }
  FUN_0040bbb0();
  FUN_0040bc10(0x99);
  FUN_0040fe40();
  FUN_0043ca80(local_94);
  iVar2 = local_88;
  local_7c = FUN_0040efd0(DAT_00679640);
  local_7c = (iVar2 - local_7c);
  FUN_0040bbb0();
  FUN_0040bc10(0x99);
  FUN_0040fe40();
  FUN_005baee0(0x7a, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  FUN_0040bbb0();
  FUN_0043ca80(local_94);
  FUN_005baee0(0x25, 0x12, -1, -1);
  FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  local_a8 = (local_a8 + local_1c);
  FUN_0040bbb0();
  FUN_0040bc10(0x9a);
  FUN_0040fe40();
  FUN_005baee0(0x7a, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_00679640, local_84, local_a8);
  FUN_0040bbb0();
  FUN_0043c8a0(s32((DAT_0064c6a2 + local_74 * 0x594), 0));
  FUN_005baee0(0x25, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  if ((DAT_00655b08 < 2)) {
    local_7c = (local_7c + 6);
    FUN_0040bbb0();
    FUN_0040bc10(0x9b);
    FUN_0040fe40();
    FUN_005baee0(0x7a, 0x12, -1, -1);
    local_7c = FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
    FUN_0040bbb0();
    FUN_0040ff30(((s16((DAT_0064c706 + local_74 * 0x594), 0)) << 16 >> 16));
    FUN_0040fe10();
    FUN_0040bc10(0x19);
    FUN_005baee0(0x25, 0x12, -1, -1);
    local_7c = FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  }
  FUN_0040bbb0();
  FUN_0040bc10(0xec);
  FUN_0040fe40();
  FUN_004aef20(DAT_ffffff94);
  if ((s16((DAT_0064c6aa + local_74 * 0x594), 0) < 0)) {
    FUN_004af14b(DAT_ffffff94, 0xe);
  }
  else {
    FUN_004af122(DAT_ffffff94, s32((DAT_00627684 + ((s16((DAT_0064c6aa + local_74 * 0x594), 0)) << 16 >> 16) * 0x10), 0));
  }
  FUN_0040bbe0(DAT_ffffff94);
  iVar2 = local_88;
  local_7c = FUN_0040efd0(DAT_00679640);
  local_7c = (iVar2 - local_7c);
  FUN_0040bbb0();
  FUN_0040bc10(0xec);
  FUN_0040fe40();
  FUN_005baee0(0x7a, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_00679640, local_7c, local_a8);
  FUN_005baee0(0x25, 0x12, -1, -1);
  local_7c = FUN_0043c8d0(DAT_ffffff94, local_7c, local_a8);
  local_a8 = ((local_a8 + local_1c) + 6);
  for (/* cond: (local_ac < 8) */); local_ac = (local_ac < 8); local_ac = (local_ac + 1)) {
    if (((_MEM[DAT_0064c6c0 + (local_ac * 4 + local_74 * 0x594)] & 1) !== 0)) {
      FUN_0040bbb0();
      FUN_004aef20(DAT_ffffff94);
      if (((_MEM[DAT_0064c6c1 + (local_ac * 4 + local_74 * 0x594)] & 0x20) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (local_ac * 4 + local_74 * 0x594)] & 8) === 0)) {
          if (((_MEM[DAT_0064c6c0 + (local_ac * 4 + local_74 * 0x594)] & 4) === 0)) {
            if (((_MEM[DAT_0064c6c0 + (local_ac * 4 + local_74 * 0x594)] & 2) === 0)) {
              FUN_004af14b(DAT_ffffff94, 0x9d);
            }
            else {
              FUN_004af14b(DAT_ffffff94, 0x8f);
            }
          }
          else {
            FUN_0040bc10(0x9c);
            FUN_0040fe10();
            FUN_004af14b(DAT_ffffff94, 0x8e);
          }
        }
        else {
          FUN_004af14b(DAT_ffffff94, 0x8d);
        }
      }
      else {
        FUN_0040bc10(0x9c);
        FUN_0040fe10();
        FUN_004af14b(DAT_ffffff94, 0x90);
      }
      __strupr(DAT_ffffff94);
      FUN_0040bbe0(DAT_ffffff94);
      FUN_0040fe10();
      FUN_0040bc10(0x7b);
      FUN_0040fe10();
      uVar1 = FUN_00493ba6(local_ac);
      FUN_0040bbe0(uVar1);
      FUN_0040fe10();
      uVar1 = FUN_00493b10(local_ac);
      FUN_0040bbe0(uVar1);
      FUN_0040fe10();
      FUN_0040bc10(0x8c);
      FUN_0040fe10();
      uVar1 = FUN_00493c7d(local_ac);
      FUN_0040bbe0(uVar1);
      uVar1 = FUN_0043cb30(local_ac, 0x12, -1, -1);
      FUN_005baee0(uVar1);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_a8, DAT_0063ec3c);
      local_a8 = (local_a8 + local_1c);
    }
  }
  local_a8 = (local_a8 + 6);
  local_98 = FUN_006e7d8c(3);
  local_b8 = (local_b8 - (local_98 + 2));
  local_1c = 0x16;
  wv(DAT_0063ef80, 0x16);
  _DAT_0063ef78 = local_a8;
  _DAT_0063ef7c = (local_b8 - local_a8);
  wv(DAT_0063ef74, FUN_005adfa0(((local_b8 - local_a8) / 0x16 | 0), 0, 0x63));
  local_8 = FUN_005adfa0(((local_b8 - local_a8) / 0x16 | 0), 0, 0x63);
  if ((0 < FUN_005adfa0(((local_b8 - local_a8) / 0x16 | 0), 0, 0x63))) {
    _DAT_0063ef90 = (DAT_0063ec34 + 2);
    local_88 = ((DAT_0063ec3c + DAT_0063ec34) + -2);
    wv(DAT_0063ef94, (local_88 - (DAT_0063ec34 + 2)));
    wv(DAT_0063ef98, ((local_88 - (DAT_0063ec34 + 2)) / 3 | 0));
    wv(DAT_0063ef8c, FUN_005adfa0(((local_b8 - local_a8) / 0x16 | 0), 0, 0x63) * 3);
    local_80 = 0;
    local_84 = (DAT_0063ec34 + 2);
    for (/* cond: (local_9c < 0x64) */); local_9c = (local_9c < 0x64); local_9c = (local_9c + 1)) {
      iVar2 = FUN_004bd9f0(local_74, local_9c);
      if ((iVar2 !== 0)) {
        local_80 = (local_80 + 1);
      }
    }
    _DAT_0063ef68 = FUN_005adfa0((((local_8 + -1) + local_80) / local_8 | 0), 1, 0x63);
    uVar1 = FUN_005adfa0((local_80 + -1), 0, 0x3e7);
    wv(DAT_0063ef70, FUN_005adfa0(DAT_0063ef70, 0, uVar1));
    local_a4 = 0;
    local_78 = 0;
    local_70 = 0;
    local_bc = local_a8;
    local_b4 = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
    FUN_005baec8(DAT_0063eab8);
    for (/* cond: (local_9c < 0x64) */); local_9c = (local_9c < 0x64); local_9c = (local_9c + 1)) {
      iVar3 = FUN_004bd9f0(local_74, local_9c);
      iVar2 = local_a4;
      if ((local_a4 < (DAT_0063ef8c + local_b4))) {
        local_bc = (local_1c * local_70 + local_a8);
        local_b0 = (DAT_0063ef98 * local_78 + local_84);
        local_a4 = iVar2;
        FUN_005cef31(DAT_ffffff30, DAT_0063eb10, local_b0, local_bc);
        local_7c = (local_b0 + 0x26);
        iVar2 = FUN_004bd9f0(DAT_006d1da0, local_9c, 0x12, 1, 1);
        FUN_005baee0((((-u8((iVar2 === 0))) & -53) + 0x5e));
        uVar1 = FUN_00428b0c(s32((DAT_00627684 + local_9c * 0x10), 0), local_7c, (local_bc + 2));
        FUN_0043c8d0(uVar1);
        local_70 = (local_70 + 1);
        iVar2 = local_a4;
        if ((local_8 <= local_70)) {
          local_70 = 0;
          local_78 = (local_78 + 1);
          if ((2 < local_78));
    }
    if ((DAT_0063efa8 === 0)) {
      FUN_00408680(DAT_ffffffe8, local_84, local_b8, local_88, (local_b8 + local_98));
      FUN_0040fc50(DAT_0063eb58, 0xc8, DAT_ffffffe8, 0);
      uVar1 = FUN_005adfa0(((((local_8 + -1) + local_80) / local_8 | 0) + -1), 0, 0x3e7);
      FUN_0040fd40(0, uVar1);
      FUN_0040fcf0(DAT_0063ef70);
      FUN_005db0d0(1);
      FUN_0040fd80(LAB_00403d23);
      FUN_0040f380();
      FUN_00408130(LAB_004036f2);
      wv(DAT_0063efa8, 1);
    }
  }
  FUN_00408460();
  return;
}
