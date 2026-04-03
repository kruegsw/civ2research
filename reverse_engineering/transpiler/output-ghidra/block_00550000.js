// Block 0x00550000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 152

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_004080c0, FUN_00408230, FUN_004082b0 } from './block_00400000.js';
import { FUN_004083b0, FUN_004083f0, FUN_00408460, FUN_00408490, FUN_004085f0, FUN_004086c0 } from './block_00400000.js';
import { FUN_004087c0, FUN_0040894c, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc40 } from './block_00400000.js';
import { FUN_0040bc80, FUN_0040ddc6, FUN_0040ef70, FUN_0040efd0, FUN_0040fe10, FUN_0040fe40 } from './block_00400000.js';
import { FUN_0040fea0, FUN_0040fed0, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_0041033a, FUN_00413476, FUN_00414bb0, FUN_00414d10 } from './block_00410000.js';
import { FUN_00414d40, FUN_00417ef0, FUN_004183d0, FUN_004190d0, FUN_00419100, FUN_00419130 } from './block_00410000.js';
import { Create, FUN_00421bb0, FUN_00421d60, FUN_00421da0, FUN_00421e70, FUN_00421ea0 } from './block_00420000.js';
import { FUN_00421ed0, FUN_00426fb0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_00437c6f, FUN_0043c460, FUN_0043c520, FUN_0043c790, FUN_0043c8d0, FUN_0043c9d0 } from './block_00430000.js';
import { FUN_0043cef9, FUN_0043cf76, FUN_0043d07a, FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_004413d1, FUN_00444270, FUN_004442e0, FUN_0044c5a0, FUN_0044cba0, FUN_0044f799 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_004503d0, FUN_00451900, FUN_00451930 } from './block_00450000.js';
import { FUN_004519b0, FUN_00451a60, FUN_00453aa0, FUN_00453e51, FUN_0045b0d6 } from './block_00450000.js';
import { FUN_00460129, FUN_00467580, FUN_00467750, FUN_00467825, FUN_00467af0, FUN_0046b14d } from './block_00460000.js';
import { FUN_0046e020, FUN_0046e6a9 } from './block_00460000.js';
import { FUN_00472b0a, FUN_004741be, FUN_0047758c, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf9e } from './block_00470000.js';
import { FUN_0047df50, GetActiveView } from './block_00470000.js';
import { FUN_004824e3, FUN_00484d3b, FUN_00484d52, FUN_00484fec, FUN_004897fa } from './block_00480000.js';
import { FUN_004904c0, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00493d13, FUN_00497d00 } from './block_00490000.js';
import { FUN_004a6980, FUN_004a7577, FUN_004aa378, FUN_004ad0d1, FUN_004af14b } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b7645, FUN_004b768d, FUN_004b7eb6, FUN_004bb540, FUN_004bb800 } from './block_004B0000.js';
import { FUN_004bd9f0, FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004c195e, FUN_004c21d5, FUN_004c2788, FUN_004c4280, FUN_004cff70 } from './block_004C0000.js';
import { FUN_004e1763, FUN_004e4ceb, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f8d51, FUN_004fa569, FUN_004fbe84 } from './block_004F0000.js';
import { FUN_00509429, FUN_0050994f, FUN_0050c679 } from './block_00500000.js';
import { FUN_00511880, FUN_00518ec0, FUN_0051d63b, FUN_0051d75d, FUN_0051d7bc, FUN_0051d7d6 } from './block_00510000.js';
import { FUN_0051d817, FUN_0051ea8e } from './block_00510000.js';
import { FUN_00564713, FUN_0056a65e, FUN_0056ac67 } from './block_00560000.js';
import { FUN_0059d5f5, FUN_0059db08, FUN_0059db65, FUN_0059df8a, FUN_0059ea99, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a632a, FUN_005a9780, FUN_005a99fc, FUN_005a9afe, FUN_005a9b5d, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005ae052, FUN_005ae0b0, FUN_005ae3bf } from './block_005A0000.js';
import { FUN_005b29aa, FUN_005b2c82, FUN_005b2e69, FUN_005b319e, FUN_005b345f, FUN_005b3d06 } from './block_005B0000.js';
import { FUN_005b47fa, FUN_005b4c63, FUN_005b50ad, FUN_005b6aea, FUN_005b8931, FUN_005b898b } from './block_005B0000.js';
import { FUN_005b89bb, FUN_005b89e4, FUN_005b8a81, FUN_005b8b1a, FUN_005b8b65, FUN_005b8c42 } from './block_005B0000.js';
import { FUN_005b8ca6, FUN_005b8d62, FUN_005b94d5, FUN_005baeb0, FUN_005baec8, FUN_005baee0 } from './block_005B0000.js';
import { FUN_005bb4ae, FUN_005bb574, FUN_005bcaa7, FUN_005bd630, FUN_005bd65c, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0034, FUN_005c0073, FUN_005c0f57, FUN_005c19ad, FUN_005c62ee, FUN_005c64da } from './block_005C0000.js';
import { FUN_005c656b, FUN_005cd775, FUN_005cef31, InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d1f50, FUN_005d2004, FUN_005d225b, FUN_005d3dbf, FUN_005d3e92 } from './block_005D0000.js';
import { FUN_005dbb20, FUN_005dbb4f, ~_Timevec } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, __ftol, _atexit, _memset, _rand } from './block_005F0000.js';
import { _strcmp, _strlen, _strncpy, operator_delete, operator_new } from './block_005F0000.js';
import { FID_conflict:__mkdir, __itoa, __strupr } from './block_00600000.js';
// Unresolved: XD_FlushSendBuffer

const DAT_00627684 = globalThis.DAT_00627684, DAT_00627689 = globalThis.DAT_00627689, DAT_0062768e = globalThis.DAT_0062768e, DAT_0062768f = globalThis.DAT_0062768f, DAT_00627cc4 = globalThis.DAT_00627cc4, DAT_00627cce = globalThis.DAT_00627cce;
const DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_00628370 = globalThis.DAT_00628370, DAT_006283a0 = globalThis.DAT_006283a0, DAT_006283d0 = globalThis.DAT_006283d0, DAT_006283e0 = globalThis.DAT_006283e0;
const DAT_006335a8 = globalThis.DAT_006335a8, DAT_006335ac = globalThis.DAT_006335ac, DAT_006335b0 = globalThis.DAT_006335b0, DAT_006335b4 = globalThis.DAT_006335b4, DAT_006335b8 = globalThis.DAT_006335b8, DAT_006335bc = globalThis.DAT_006335bc;
const DAT_006335c0 = globalThis.DAT_006335c0, DAT_006335c4 = globalThis.DAT_006335c4, DAT_006335c8 = globalThis.DAT_006335c8, DAT_006335cc = globalThis.DAT_006335cc, DAT_006335d0 = globalThis.DAT_006335d0, DAT_006335d4 = globalThis.DAT_006335d4;
const DAT_006335d8 = globalThis.DAT_006335d8, DAT_006335dc = globalThis.DAT_006335dc, DAT_006335e0 = globalThis.DAT_006335e0, DAT_006335f8 = globalThis.DAT_006335f8, DAT_00633694 = globalThis.DAT_00633694, DAT_006336cc = globalThis.DAT_006336cc;
const DAT_006336d0 = globalThis.DAT_006336d0, DAT_006336ec = globalThis.DAT_006336ec, DAT_006336fc = globalThis.DAT_006336fc, DAT_00633754 = globalThis.DAT_00633754, DAT_00633780 = globalThis.DAT_00633780, DAT_00633784 = globalThis.DAT_00633784;
const DAT_006338f4 = globalThis.DAT_006338f4, DAT_006338f8 = globalThis.DAT_006338f8, DAT_006359d4 = globalThis.DAT_006359d4, DAT_0063cc48 = globalThis.DAT_0063cc48, DAT_0063cd4c = globalThis.DAT_0063cd4c, DAT_0063ce50 = globalThis.DAT_0063ce50;
const DAT_0063fc58 = globalThis.DAT_0063fc58, DAT_0063fc98 = globalThis.DAT_0063fc98, DAT_006409d8 = globalThis.DAT_006409d8, DAT_00643af8 = globalThis.DAT_00643af8, DAT_00644e48 = globalThis.DAT_00644e48, DAT_00646878 = globalThis.DAT_00646878;
const DAT_00648018 = globalThis.DAT_00648018, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1c0 = globalThis.DAT_0064b1c0, DAT_0064b1c1 = globalThis.DAT_0064b1c1, DAT_0064b1c4 = globalThis.DAT_0064b1c4;
const DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b1cb = globalThis.DAT_0064b1cb, DAT_0064b9a0 = globalThis.DAT_0064b9a0, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064bc62 = globalThis.DAT_0064bc62;
const DAT_0064bcb4 = globalThis.DAT_0064bcb4, DAT_0064bcfa = globalThis.DAT_0064bcfa, DAT_0064bd12 = globalThis.DAT_0064bd12, DAT_0064bd2a = globalThis.DAT_0064bd2a, DAT_0064c6a0 = globalThis.DAT_0064c6a0, DAT_0064c6a2 = globalThis.DAT_0064c6a2;
const DAT_0064c6a6 = globalThis.DAT_0064c6a6, DAT_0064c6a8 = globalThis.DAT_0064c6a8, DAT_0064c6aa = globalThis.DAT_0064c6aa, DAT_0064c6b0 = globalThis.DAT_0064c6b0, DAT_0064c6b1 = globalThis.DAT_0064c6b1, DAT_0064c6b4 = globalThis.DAT_0064c6b4;
const DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6b6 = globalThis.DAT_0064c6b6, DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6bf = globalThis.DAT_0064c6bf, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1;
const DAT_0064c6c2 = globalThis.DAT_0064c6c2, DAT_0064c6e0 = globalThis.DAT_0064c6e0, DAT_0064c6f8 = globalThis.DAT_0064c6f8, DAT_0064c708 = globalThis.DAT_0064c708, DAT_0064c70e = globalThis.DAT_0064c70e, DAT_0064c778 = globalThis.DAT_0064c778;
const DAT_0064c7a5 = globalThis.DAT_0064c7a5, DAT_0064c832 = globalThis.DAT_0064c832, DAT_0064c8b2 = globalThis.DAT_0064c8b2, DAT_0064c932 = globalThis.DAT_0064c932, DAT_0064ca32 = globalThis.DAT_0064ca32, DAT_0064ca74 = globalThis.DAT_0064ca74;
const DAT_0064ca7e = globalThis.DAT_0064ca7e, DAT_0064ca80 = globalThis.DAT_0064ca80, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064ca92 = globalThis.DAT_0064ca92, DAT_0064cab4 = globalThis.DAT_0064cab4, DAT_0064cab6 = globalThis.DAT_0064cab6;
const DAT_0064cab8 = globalThis.DAT_0064cab8, DAT_0064cab9 = globalThis.DAT_0064cab9, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f348 = globalThis.DAT_0064f348;
const DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f34d = globalThis.DAT_0064f34d, DAT_0064f35c = globalThis.DAT_0064f35c, DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f374 = globalThis.DAT_0064f374;
const DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00654fe0 = globalThis.DAT_00654fe0, DAT_00655020 = globalThis.DAT_00655020, DAT_006553d8 = globalThis.DAT_006553d8, DAT_006554f8 = globalThis.DAT_006554f8;
const DAT_006554fc = globalThis.DAT_006554fc, DAT_00655502 = globalThis.DAT_00655502, DAT_00655504 = globalThis.DAT_00655504, DAT_00655506 = globalThis.DAT_00655506, DAT_0065550c = globalThis.DAT_0065550c, DAT_00655b82 = globalThis.DAT_00655b82;
const DAT_00655be6 = globalThis.DAT_00655be6, DAT_00655c22 = globalThis.DAT_00655c22, DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f4 = globalThis.DAT_006560f4, DAT_006560f6 = globalThis.DAT_006560f6;
const DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f8 = globalThis.DAT_006560f8, DAT_006560f9 = globalThis.DAT_006560f9, DAT_006560fa = globalThis.DAT_006560fa, DAT_006560fd = globalThis.DAT_006560fd, DAT_006560ff = globalThis.DAT_006560ff;
const DAT_00656100 = globalThis.DAT_00656100, DAT_0065610a = globalThis.DAT_0065610a, DAT_0066c7a8 = globalThis.DAT_0066c7a8, DAT_00673d38 = globalThis.DAT_00673d38, DAT_00679640 = globalThis.DAT_00679640, DAT_006a8c00 = globalThis.DAT_006a8c00;
const DAT_006aa864 = globalThis.DAT_006aa864, DAT_006ab178 = globalThis.DAT_006ab178, DAT_006ab180 = globalThis.DAT_006ab180, DAT_006ab190 = globalThis.DAT_006ab190, DAT_006ab1a0 = globalThis.DAT_006ab1a0, DAT_006ab1b8 = globalThis.DAT_006ab1b8;
const DAT_006ab4b8 = globalThis.DAT_006ab4b8, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad330 = globalThis.DAT_006ad330, DAT_006ad558 = globalThis.DAT_006ad558, DAT_fffffb74 = globalThis.DAT_fffffb74, DAT_fffffbbc = globalThis.DAT_fffffbbc;
const DAT_fffffcec = globalThis.DAT_fffffcec, DAT_fffffcf0 = globalThis.DAT_fffffcf0, DAT_fffffcf4 = globalThis.DAT_fffffcf4, DAT_fffffcfc = globalThis.DAT_fffffcfc, DAT_fffffdf0 = globalThis.DAT_fffffdf0, DAT_fffffea0 = globalThis.DAT_fffffea0;
const DAT_fffffec8 = globalThis.DAT_fffffec8, DAT_fffffeec = globalThis.DAT_fffffeec, DAT_fffffef4 = globalThis.DAT_fffffef4, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffffb8 = globalThis.DAT_ffffffb8, DAT_ffffffc0 = globalThis.DAT_ffffffc0;
const DAT_ffffffd0 = globalThis.DAT_ffffffd0, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4, DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec;
const DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4, DAT_fffffff8 = globalThis.DAT_fffffff8, PTR_FUN_0061d6dc = globalThis.PTR_FUN_0061d6dc, PTR_FUN_0061d6e0 = globalThis.PTR_FUN_0061d6e0, s_ALLYMAKESPEACE_00633ba0 = globalThis.s_ALLYMAKESPEACE_00633ba0;
const s_ALLYMAKESPEACE_00633bb0 = globalThis.s_ALLYMAKESPEACE_00633bb0, s_ALLYMAKESWAR_00633bf4 = globalThis.s_ALLYMAKESWAR_00633bf4, s_ALLYMAKESWAR_00633c04 = globalThis.s_ALLYMAKESWAR_00633c04, s_BADNAME_006336a4 = globalThis.s_BADNAME_006336a4, s_CANCELALLIED_00633be4 = globalThis.s_CANCELALLIED_00633be4, s_CANCELPEACE_00633c14 = globalThis.s_CANCELPEACE_00633c14;
const s_CHANGED_00633aec = globalThis.s_CHANGED_00633aec, s_CITYEDIT_0063385c = globalThis.s_CITYEDIT_0063385c, s_COPYCITY_00633874 = globalThis.s_COPYCITY_00633874, s_Civilization_II_Once_Only_00633a40 = globalThis.s_Civilization_II_Once_Only_00633a40, s_DEBUG_006337a4 = globalThis.s_DEBUG_006337a4, s_DEBUG_006359dc = globalThis.s_DEBUG_006359dc;
const s_DECLAREWAR_00633c20 = globalThis.s_DECLAREWAR_00633c20, s_DEMOCRATS_00633ae0 = globalThis.s_DEMOCRATS_00633ae0, s_DIREXISTS_006336b8 = globalThis.s_DIREXISTS_006336b8, s_EDITATTITUDE_006338b8 = globalThis.s_EDITATTITUDE_006338b8, s_EDITBETRAY_006338c8 = globalThis.s_EDITBETRAY_006338c8, s_EDITHOMECITY_0063383c = globalThis.s_EDITHOMECITY_0063383c;
const s_EDITINCREMENT_00633940 = globalThis.s_EDITINCREMENT_00633940, s_EDITKINGNAME_006338e4 = globalThis.s_EDITKINGNAME_006338e4, s_EDITKING_00633890 = globalThis.s_EDITKING_00633890, s_EDITMAXTURNS_00633960 = globalThis.s_EDITMAXTURNS_00633960, s_EDITPARADIGM_00633930 = globalThis.s_EDITPARADIGM_00633930, s_EDITPROGRESS_006338d4 = globalThis.s_EDITPROGRESS_006338d4;
const s_EDITRULES_00633918 = globalThis.s_EDITRULES_00633918, s_EDITSCEN_00633924 = globalThis.s_EDITSCEN_00633924, s_EDITSTARTYEAR_00633950 = globalThis.s_EDITSTARTYEAR_00633950, s_EDITTECH_00633774 = globalThis.s_EDITTECH_00633774, s_EDITTREATIES_0063389c = globalThis.s_EDITTREATIES_0063389c, s_EDITVICTORYOBJ_00633908 = globalThis.s_EDITVICTORYOBJ_00633908;
const s_EDITVICTORY_006338fc = globalThis.s_EDITVICTORY_006338fc, s_ENTER_WINDOW_DRAG_00633a94 = globalThis.s_ENTER_WINDOW_DRAG_00633a94, s_EXIT_WINDOW_DRAG_00633aa8 = globalThis.s_EXIT_WINDOW_DRAG_00633aa8, s_GAMEYEAR_006337fc = globalThis.s_GAMEYEAR_006337fc, s_GAVETECH_0063375c = globalThis.s_GAVETECH_0063375c, s_JOINWAR_00633b00 = globalThis.s_JOINWAR_00633b00;
const s_LASTCONTACT_006338ac = globalThis.s_LASTCONTACT_006338ac, s_MILITARYAID1_00633c2c = globalThis.s_MILITARYAID1_00633c2c, s_MILITARYAID2_00633c3c = globalThis.s_MILITARYAID2_00633c3c, s_MONEY_00633818 = globalThis.s_MONEY_00633818, s_MSWindowClass_00633a5c = globalThis.s_MSWindowClass_00633a5c, s_NEWFOLDER_00633698 = globalThis.s_NEWFOLDER_00633698;
const s_NEWGOVT_00633ad8 = globalThis.s_NEWGOVT_00633ad8, s_OVERTHROWN_00633af4 = globalThis.s_OVERTHROWN_00633af4, s_PARLEYBUSY_00633b18 = globalThis.s_PARLEYBUSY_00633b18, s_PARLEYBUSY_00633b50 = globalThis.s_PARLEYBUSY_00633b50, s_PARLEYBUSY_00633b6c = globalThis.s_PARLEYBUSY_00633b6c, s_PARLEYCANCEL_00633b24 = globalThis.s_PARLEYCANCEL_00633b24;
const s_PARLEYCANCEL_00633b5c = globalThis.s_PARLEYCANCEL_00633b5c, s_PARLEYGOAWAY_00633b34 = globalThis.s_PARLEYGOAWAY_00633b34, s_PARLEYOK_00633b44 = globalThis.s_PARLEYOK_00633b44, s_PARLEYWAITING_00633b08 = globalThis.s_PARLEYWAITING_00633b08, s_PASSWORDNOCHEAT1_00633718 = globalThis.s_PASSWORDNOCHEAT1_00633718, s_PASSWORDNOCHEAT2_0063372c = globalThis.s_PASSWORDNOCHEAT2_0063372c;
const s_PICKGOVT_00633acc = globalThis.s_PICKGOVT_00633acc, s_REALLYCHEAT_006336d8 = globalThis.s_REALLYCHEAT_006336d8, s_REALLYCHEAT_00633740 = globalThis.s_REALLYCHEAT_00633740, s_SCENNAME_00633970 = globalThis.s_SCENNAME_00633970, s_SETCITYSHIELDS_00633880 = globalThis.s_SETCITYSHIELDS_00633880, s_SETCITYSIZE_00633868 = globalThis.s_SETCITYSIZE_00633868;
const s_SIGNALLIED_00633bd8 = globalThis.s_SIGNALLIED_00633bd8, s_SIGNNATO_00633bcc = globalThis.s_SIGNNATO_00633bcc, s_SIGNPEACE_00633bc0 = globalThis.s_SIGNPEACE_00633bc0, s_SUPPLYSEARCH_0063384c = globalThis.s_SUPPLYSEARCH_0063384c, s_TERRAIN_0063379c = globalThis.s_TERRAIN_0063379c, s_TOOKTECH_00633768 = globalThis.s_TOOKTECH_00633768;
const s_UNFORCE_00633b78 = globalThis.s_UNFORCE_00633b78, s_UNFORCE_00633b8c = globalThis.s_UNFORCE_00633b8c, s_UNITEDIT_00633820 = globalThis.s_UNITEDIT_00633820, s_UNITHITPOINTS_0063382c = globalThis.s_UNITHITPOINTS_0063382c, s_WALLFORCE_00633b80 = globalThis.s_WALLFORCE_00633b80, s_WALLFORCE_00633b94 = globalThis.s_WALLFORCE_00633b94;
const s_WARNING_006336e4 = globalThis.s_WARNING_006336e4, s_WARNING_006336f4 = globalThis.s_WARNING_006336f4, s_WARNING_0063374c = globalThis.s_WARNING_0063374c, s_\SCENARIO\_006336ac = globalThis.s_\SCENARIO\_006336ac, s_\SOUND_006336c4 = globalThis.s_\SOUND_006336c4, s_civ2\intro.dll_00633a2c = globalThis.s_civ2\intro.dll_00633a2c;


 export function FUN_00550017 ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_0055002d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00551cd0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004fa569();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* protected: */  /* char */  /* * */  /* __thiscall */  /* streambuf::egptr(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function egptr (this)

 {
  return s32((this + 0x2c), 0);
}


 export function FUN_00551d50 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d3dbf(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_00551d80 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d3e92(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00551dc0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 export function FUN_00551df0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_1);
  return;
}


 export function FUN_00551e20 (param_1, param_2, param_3)

 {
  FUN_00419130(DAT_006359d4, param_1, param_2, param_3);
  return;
}


 export function FUN_00551e60 (param_1, param_2, param_3)

 {
  FUN_00419130(s_DEBUG_006359dc, param_1, param_2, param_3);
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
  FUN_00551eba();
  FUN_00551ed8();
  return;
}


 export function FUN_00551eba ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_00551ed8 ()

 {
  _atexit(FUN_00551ef5);
  return;
}


 export function FUN_00551ef5 ()

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
  FUN_00551f29();
  FUN_00551f47();
  return;
}


 export function FUN_00551f29 ()

 {
  FUN_0043c460(0, 0xa);
  return;
}


 export function FUN_00551f47 ()

 {
  _atexit(FUN_00551f64);
  return;
}


 export function FUN_00551f64 ()

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
  FUN_00551f98();
  FUN_00551fb6();
  return;
}


 export function FUN_00551f98 ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_00551fb6 ()

 {
  _atexit(FUN_00551fd3);
  return;
}


 export function FUN_00551fd3 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00551fed ()

 {
  let iVar1;

  FUN_005bcaa7(DAT_006ab180);
  wv(DAT_006ab198, FUN_00407f90(DAT_006ab180));
  wv(DAT_006ab19c, FUN_00407fc0(DAT_006ab180));
  wv(DAT_00633580, 0x10);
  if ((0x3e7 < FUN_00407f90(DAT_006ab180))) {
    wv(DAT_00633580, 0x18);
  }
  wv(DAT_00633584, u8((0x3e7 < FUN_00407f90(DAT_006ab180))));
  FUN_00417ef0(0, DAT_00633580);
  FUN_00417ef0(0, (DAT_00633580 * 2 / 3 | 0));
  FUN_00417ef0(0, DAT_00633580);
  iVar1 = FUN_0040ef70();
  wv(DAT_00633598, ((iVar1 + DAT_0063358c * 2) + DAT_00633588 * 2));
  wv(DAT_0063359c, (DAT_00633588 * 2 + DAT_0063358c * 2));
  iVar1 = FUN_006e7d8c(7);
  wv(DAT_006335a0, iVar1 * 2);
  iVar1 = FUN_006e7d8c(8);
  wv(DAT_006335a4, iVar1 * 2);
  return;
}


 export function FUN_005520fa (param_1)

 {
  wv(DAT_0063357c, param_1);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00552112 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let sVar4;
  // in_ECX promoted to parameter;
  let local_168;
  let local_164;
  let local_160;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let local_13c;
  let local_138;
  let local_134;
  let local_130;
  let local_12c;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_005c0034();
  local_120 = DAT_00633590;
  local_140 = DAT_00633594;
  local_144 = DAT_00633588;
  if ((s32((in_ECX + 0x118), 0) === 0)) {
    local_164 = s32((in_ECX + 0x11c), 0);
  }
  else {
    local_164 = s32((in_ECX + 0x118), 0);
  }
  local_148 = (local_164 + DAT_00633588 * -2);
  local_138 = FUN_00407f90((in_ECX + 0x2ac));
  FUN_005a9b5d(in_ECX, DAT_0063357c, 0, local_144, local_138, local_148, 0, local_144);
  local_148 = (s32((in_ECX + 0x11c), 0) + local_144 * -2);
  local_12c = FUN_00407fc0((in_ECX + 0x2ac));
  local_12c = (local_12c - (local_144 + local_148));
  FUN_005a9b5d(in_ECX, DAT_0063357c, 0, local_12c, local_138, local_148, 0, local_12c);
  local_138 = (s32((in_ECX + 0x11c), 0) + local_144 * -2);
  local_148 = FUN_00407fc0((in_ECX + 0x2ac));
  FUN_005a9b5d(in_ECX, DAT_0063357c, local_144, 0, local_138, local_148, local_144, 0);
  local_12c = FUN_00407f90((in_ECX + 0x2ac));
  local_12c = (local_12c - (local_144 + local_138));
  FUN_005a9b5d(in_ECX, DAT_0063357c, local_12c, 0, local_138, local_148, local_12c, 0);
  local_14 = s32((in_ECX + 0x2ac), 0);
  local_10 = s32((in_ECX + 0x2b0), 0);
  local_c = s32((in_ECX + 0x2b4), 0);
  local_8 = s32((in_ECX + 0x2b8), 0);
  for (/* cond: (local_118 < local_144) */); local_118 = (local_118 < local_144); local_118 = (local_118 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, local_120, local_140);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004bb800(DAT_ffffffec, (s32((in_ECX + 0x11c), 0) + local_144 * -2), 0);
  if ((s32((in_ECX + 0x118), 0) === 0)) {
    local_168 = s32((in_ECX + 0x11c), 0);
  }
  else {
    local_168 = s32((in_ECX + 0x118), 0);
  }
  local_10 = (local_10 + (local_168 + local_144 * -2));
  local_8 = (local_8 - (s32((in_ECX + 0x11c), 0) + local_144 * -2));
  for (/* cond: (local_118 < local_144) */); local_118 = (local_118 < local_144); local_118 = (local_118 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, local_140, local_120);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  local_130 = DAT_0063359c;
  for (/* cond: (local_118 < s32((in_ECX + 0x1fc), 0)) */); local_118 = (local_118 < s32((in_ECX + 0x1fc), 0)); local_118 = (local_118 + 1)) {
    local_138 = (s32(((in_ECX + 0x20c) + local_118 * 0x1c), 0) * s32((in_ECX + 0x118), 0) / 0x18 | 0);
    local_148 = (s32(((in_ECX + 0x210) + local_118 * 0x1c), 0) * s32((in_ECX + 0x118), 0) / 0x18 | 0);
    local_134 = ((s32((in_ECX + 0x118), 0) >> 1) - (local_148 >> 1));
    FUN_004086c0(DAT_ffffffec, local_130, local_134, local_138, local_148);
    FUN_005cd775(s32((in_ECX + 0x118), 0), 0x18);
    FUN_005cef31(DAT_fffffea0, in_ECX, local_130, local_134);
    FUN_0047df50();
    local_130 = (local_130 + (local_138 + DAT_0063358c));
  }
  if ((s32((in_ECX + 0x1e4), 0) === 0)) {
    if ((s32((in_ECX + 0x1e0), 0) === 0)) {
      _MEM[(in_ECX + 0x1b8)] = 0;
    }
    else if ((s32((in_ECX + 0x1e8), 0) !== DAT_00633a78)) {
      if ((s32((in_ECX + 0x1e8), 0) === -1)) {
        w32((in_ECX + 0x1e8), 0, (DAT_00654b70 / 0x3e8 | 0));
      }
      else {
        w32((in_ECX + 0x1e8), 0, DAT_00633a78);
      }
      if ((s32((in_ECX + 0x1e8), 0) < 0)) {
        w32((in_ECX + 0x1e8), 0, 0);
      }
      local_150 = ((s32((in_ECX + 0x1e8), 0) + -1) / 0x3c | 0);
      local_14c = ((s32((in_ECX + 0x1e8), 0) + -1) + local_150 * -60);
      if ((local_150 < 0xa)) {
        _MEM[(in_ECX + 0x1b8)] = 0x30;
        __itoa(local_150, (in_ECX + 0x1b9), 0xa);
      }
      else {
        __itoa(local_150, (in_ECX + 0x1b8), 0xa);
      }
      _MEM[(in_ECX + 0x1ba)] = 0x3a;
      if ((local_14c < 0xa)) {
        if ((local_14c < 0)) {
          local_14c = 0;
        }
        _MEM[(in_ECX + 0x1bb)] = 0x30;
        __itoa(local_14c, (in_ECX + 0x1bc), 0xa);
      }
      else {
        __itoa(local_14c, (in_ECX + 0x1bb), 0xa);
      }
    }
  }
  else if ((((DAT_00654faa) << 16 >> 16) !== s32((in_ECX + 0x1e8), 0))) {
    w32((in_ECX + 0x1e8), 0, ((DAT_00654faa) << 16 >> 16));
    __itoa(((DAT_00654faa) << 16 >> 16), (in_ECX + 0x1b8), 0xa);
  }
  FUN_005f22d0(DAT_fffffeec, (in_ECX + 0x134));
  if ((DAT_006ad684 !== 0)) {
    if ((DAT_006ad684 !== 0)) {
      if ((((1 << (((None) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_005f22e0(DAT_fffffeec, DAT_006335c0);
        if ((DAT_00628064 === 1)) {
          FUN_005f22e0(DAT_fffffeec, DAT_006335c4);
        }
        else {
          FUN_005f22e0(DAT_fffffeec, DAT_006335c8);
        }
        FUN_005f22e0(DAT_fffffeec, DAT_006335cc);
        FUN_004af14b(DAT_fffffeec, 0x369);
        if ((_MEM[(in_ECX + 0x1b8)] !== 0)) {
          FUN_005f22e0(DAT_fffffeec, DAT_006335d0);
          FUN_005f22e0(DAT_fffffeec, (in_ECX + 0x1b8));
        }
        FUN_005f22e0(DAT_fffffeec, DAT_006335d4);
      }
      else if ((_MEM[(in_ECX + 0x1b8)] !== 0)) {
        FUN_005f22e0(DAT_fffffeec, DAT_006335d8);
        FUN_005f22e0(DAT_fffffeec, (in_ECX + 0x1b8));
        FUN_005f22e0(DAT_fffffeec, DAT_006335dc);
      }
    }
  }
  else {
    FUN_005f22e0(DAT_fffffeec, DAT_006335a8);
    if ((((1 << (((None) & 0xFF) & 0x1f)) & u8(DAT_006c31a9)) === 0)) {
      if ((((1 << (((None) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        if ((DAT_00628064 === 1)) {
          FUN_005f22e0(DAT_fffffeec, DAT_006335ac);
        }
        else {
          FUN_005f22e0(DAT_fffffeec, DAT_006335b0);
        }
        if ((DAT_00654fa8 === 0)) {
          _MEM[(in_ECX + 0x1b8)] = 0;
        }
      }
      else {
        FUN_005f22e0(DAT_fffffeec, (DAT_006ad330 + s32((DAT_006ad558 + None * 4), 0) * 0x54));
      }
    }
    else {
      uVar1 = FUN_00493d13(/* ? */);
      FUN_005f22e0(DAT_fffffeec, uVar1);
      if ((DAT_00654fa8 === 0)) {
        _MEM[(in_ECX + 0x1b8)] = 0;
      }
    }
    FUN_005f22e0(DAT_fffffeec, DAT_006335b4);
    FUN_004af14b(DAT_fffffeec, 0x369);
    if ((_MEM[(in_ECX + 0x1b8)] !== 0)) {
      FUN_005f22e0(DAT_fffffeec, DAT_006335b8);
      FUN_005f22e0(DAT_fffffeec, (in_ECX + 0x1b8));
    }
    FUN_005f22e0(DAT_fffffeec, DAT_006335bc);
  }
  local_138 = FUN_00407f90((in_ECX + 0x2ac));
  local_13c = FUN_0040efd0(DAT_fffffeec);
  local_13c = (local_13c + 4);
  local_11c = ((local_138 >> 1) - (local_13c >> 1));
  local_124 = (local_144 + 1);
  local_128 = s32((in_ECX + 0x2cc), 0);
  if ((local_11c < local_130)) {
    local_11c = local_130;
  }
  if ((local_138 < (local_13c + local_11c))) {
    local_128 = s32((in_ECX + 0x2d0), 0);
    local_13c = FUN_0040efd0(DAT_fffffeec);
    local_13c = (local_13c + 4);
    local_11c = ((local_138 >> 1) - (local_13c >> 1));
    if ((local_11c < local_130)) {
      local_11c = local_130;
    }
    iVar2 = FUN_0040ef70();
    iVar3 = FUN_0040ef70();
    local_124 = (local_124 + ((iVar2 - iVar3) >> 1));
    while ((local_138 < ((local_11c + iVar2) + 4))) {
      sVar4 = _strlen(DAT_fffffeec);
      _MEM[DAT_fffffeec + (sVar4 - 1)] = 0;
    }
  }
  FUN_005c19ad(0xa);
  FUN_005c0f57(local_128, DAT_fffffeec, (local_11c + 2), (local_124 + 1), 5);
  FUN_005c19ad(0x1a);
  FUN_005c0f57(local_128, DAT_fffffeec, (local_11c + 1), local_124, 5);
  FUN_005c0f57(local_128, DAT_fffffeec, local_11c, local_124, 5);
  FUN_005c0073((in_ECX + 0x2bc));
  return;
}


 export function FUN_00552e5b (param_1)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32((local_8 + 0x2a8), 0) !== 0)) {
    local_8 = (local_8 + 0x2a8);
  }
  return;
}


 export function FUN_00552ed2 (in_ECX)

 {
  let pCVar1;
  let pCVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let pvVar6;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_40;
  let local_3c;
  let local_28;
  let local_24;
  let local_20;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00553174;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  pCVar1 = GetActiveView(in_ECX);
  pCVar2 = GetActiveView(in_ECX);
  FUN_004086c0((in_ECX + 0x2ac), 0, 0, pCVar1, pCVar2);
  FUN_004086c0((in_ECX + 0x2bc), 0, 0, (pCVar1 + s32((in_ECX + 0x11c), 0) * -2), (pCVar2 - (s32((in_ECX + 0x118), 0) + s32((in_ECX + 0x11c), 0))));
  FUN_0043c790((in_ECX + 0x2bc), s32((in_ECX + 0x11c), 0), s32((in_ECX + 0x118), 0));
  w32((in_ECX + 0x124), 0, s32((in_ECX + 0x2bc), 0));
  w32((in_ECX + 0x128), 0, s32((in_ECX + 0x2c0), 0));
  uVar3 = FUN_00407f90((in_ECX + 0x2bc));
  w32((in_ECX + 0x12c), 0, uVar3);
  uVar3 = FUN_00407fc0((in_ECX + 0x2bc));
  w32((in_ECX + 0x130), 0, uVar3);
  FUN_005532d7();
  local_28 = DAT_0063359c;
  for (/* cond: (local_24 < s32((in_ECX + 0x1fc), 0)) */); local_24 = (local_24 < s32((in_ECX + 0x1fc), 0)); local_24 = (local_24 + 1)) {
    iVar4 = (s32((in_ECX + (local_24 * 0x1c + 0x20c)), 0) * s32((in_ECX + 0x118), 0) / 0x18 | 0);
    iVar5 = (s32((in_ECX + (local_24 * 0x1c + 0x210)), 0) * s32((in_ECX + 0x118), 0) / 0x18 | 0);
    FUN_004086c0(DAT_ffffffe0, local_28, ((s32((in_ECX + 0x118), 0) >> 1) - (iVar5 >> 1)), iVar4, iVar5)
    ;
    pvVar6 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar6 === 0)) {
      local_3c = 0;
    }
    else {
      local_3c = FUN_00451930();
    }
    local_8 = -1;
    w32((in_ECX + (local_24 * 0x1c + 0x218)), 0, local_3c);
    if ((in_ECX === 0)) {
      local_40 = 0;
    }
    else {
      local_40 = (in_ECX + 0x48);
    }
    FUN_004519b0(local_40, (local_24 + 0x3e8), DAT_ffffffe0);
    FUN_00451a60(LAB_00401b68);
    local_28 = (local_28 + (iVar4 + DAT_0063358c));
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_0055318c (in_ECX, param_1, param_2)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1fc), 0) < 6)) {
    iVar1 = s32((in_ECX + 0x1fc), 0);
    w32((in_ECX + 0x1fc), 0, (s32((in_ECX + 0x1fc), 0) + 1));
    w32(((in_ECX + 0x214) + iVar1 * 0x1c), 0, param_1);
    w32(((in_ECX + 0x200) + iVar1 * 0x1c), 0, param_2);
    uVar2 = FUN_004a6980();
    w32(((in_ECX + 0x20c) + iVar1 * 0x1c), 0, uVar2);
    uVar2 = FUN_004bb540();
    w32(((in_ECX + 0x210) + iVar1 * 0x1c), 0, uVar2);
    w32(((in_ECX + 0x218) + iVar1 * 0x1c), 0, 0);
  }
  return;
}


 export function FUN_0055324c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  _memset((in_ECX + 0x134), 0, 0x84);
  _strncpy((in_ECX + 0x134), param_1, 0x83);
  FUN_00552112();
  local_14 = s32((in_ECX + 0x2ac), 0);
  local_10 = s32((in_ECX + 0x2b0), 0);
  local_c = s32((in_ECX + 0x2b4), 0);
  local_8 = s32((in_ECX + 0x2c0), 0);
  FUN_00408490(DAT_ffffffec);
  return;
}


 export function FUN_005532d7 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 0x218) + local_8 * 0x1c), 0) !== 0)) {
      if ((s32(((in_ECX + 0x218) + local_8 * 0x1c), 0) !== 0)) {
        FUN_00453aa0(1);
      }
      w32(((in_ECX + 0x218) + local_8 * 0x1c), 0, 0);
    }
  }
  return;
}


 export function FUN_00553379 ()

 {
  FUN_005532d7();
  FUN_004083b0();
  return;
}


 export function FUN_0055339f (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0055342b;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  w32(in_ECX, 0, PTR_FUN_0061d6dc);
  for (/* cond: (local_14 < 6) */); local_14 = (local_14 < 6); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 * 7 + 0x86), 0);
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* __thiscall */
 /* COleCntrFrameWnd::~COleCntrFrameWnd(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~COleCntrFrameWnd (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005534a4;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(this, 0, PTR_FUN_0061d6dc);
  local_8 = 0;
  FUN_005532d7();
  FUN_004083b0();
  local_8 = -1;
  FUN_0055349b();
  FUN_005534ae();
  return;
}


 export function FUN_0055349b ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_005534ae (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005534bc (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((param_1 === 0)) {
    FUN_005f22d0((in_ECX + 0x134), DAT_006335e0);
  }
  else {
    FUN_005f22d0((in_ECX + 0x134), param_1);
  }
  w32((in_ECX + 0x2d4), 0, DAT_006ab1a0);
  w32((in_ECX + 0x2cc), 0, DAT_006ab190);
  w32((in_ECX + 0x2d0), 0, DAT_006ab178);
  w32((in_ECX + 0x1e0), 0, 0);
  w32((in_ECX + 0x1e4), 0, 0);
  w32((in_ECX + 0x114), 0, param_2);
  w32((in_ECX + 0x118), 0, param_8);
  w32((in_ECX + 0x11c), 0, param_9);
  w32((in_ECX + 0x120), 0, param_7);
  w32((in_ECX + 0x1fc), 0, 0);
  w32((in_ECX + 0x2a8), 0, 0);
  if (((param_2 & 4) !== 0)) {
    w32((in_ECX + 0x118), 0, DAT_00633598);
    w32((in_ECX + 0x11c), 0, DAT_0063359c);
  }
  if (((param_2 & 8) === 0)) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if ((s32((in_ECX + 0x118), 0) !== 0)) {
    local_8 = (local_8 | 0x400);
  }
  if ((s32((in_ECX + 0x120), 0) !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_2 & 2) === 0)) {
    param_5 = (param_5 + s32((in_ECX + 0x11c), 0) * 2);
    param_6 = (param_6 + (s32((in_ECX + 0x118), 0) + s32((in_ECX + 0x11c), 0)));
  }
  if (((param_2 & 1) !== 0)) {
    param_3 = ((DAT_006ab198 >> 1) - (param_5 >> 1));
    param_4 = ((DAT_006ab19c >> 1) - (param_6 >> 1));
  }
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, DAT_006a8c00, DAT_006553d8);
  if ((s32((in_ECX + 0x118), 0) !== 0)) {
    FUN_00497d00(s32((in_ECX + 0x118), 0));
  }
  if ((s32((in_ECX + 0x120), 0) !== 0)) {
    FUN_004cff70(s32((in_ECX + 0x120), 0));
  }
  FUN_00552ed2();
  FUN_00553d30(LAB_00402a1d);
  FUN_00553d70(LAB_00401401);
  return;
}


 export function FUN_00553d30 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x60), 0);
  w32((in_ECX + 0x60), 0, param_1);
  return uVar1;
}


 export function FUN_00553d70 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x64), 0);
  w32((in_ECX + 0x64), 0, param_1);
  return uVar1;
}


 export function FUN_00553db0 (param_1)

 {
  __strupr(param_1);
  while ((_MEM[DAT_006335f8 + s8(_MEM[param_1])] !== 0)) {
    param_1 = (param_1 + 1);
  }
  return s8(_MEM[param_1]);
}


 export function FUN_00553dfd ()

 {
  let iVar1;
  let sVar2;
  let DVar3;
  let local_210;
  let local_10c;
  let local_8;

  iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((iVar1 === 0)) {
    do {
      local_8 = 0;
      do {
        iVar1 = FUN_0051d63b(s_DEBUG_006359dc, s_NEWFOLDER_00633698, 8, DAT_00633694, DAT_fffffdf0);
        if ((iVar1 < 0)) {
          return 0;
        }
        sVar2 = _strlen(DAT_fffffdf0);
      } while ((sVar2 === 0));
      iVar1 = FUN_00553db0(DAT_fffffdf0);
      if ((iVar1 === 0)) {
        FUN_005f22d0(DAT_fffffef4, DAT_00655020);
        FUN_005f22e0(DAT_fffffef4, s_\SCENARIO\_006336ac);
        FUN_005f22e0(DAT_fffffef4, DAT_fffffdf0);
        DVar3 = FUN_006e7b04(DAT_fffffef4);
        if ((DVar3 !== -1)) {
          FUN_0040ff60(0, DAT_fffffef4);
          FUN_004190d0(s_DEBUG_006359dc, s_DIREXISTS_006336b8);
          local_8 = 1;
        }
      }
      else {
        FUN_0040ff60(0, DAT_fffffdf0);
        FUN_004190d0(s_DEBUG_006359dc, s_BADNAME_006336a4);
        local_8 = 1;
      }
    } while ((local_8 !== 0));
    FID_conflict:__mkdir(DAT_fffffef4);
    FUN_005f22d0(DAT_0064bb08, DAT_fffffef4);
    FUN_005f22e0(DAT_fffffef4, s_\SOUND_006336c4);
    FID_conflict:__mkdir(DAT_fffffef4);
    FUN_005f22d0(DAT_fffffef4, DAT_0064bb08);
    FUN_005f22e0(DAT_fffffef4, DAT_006336cc);
    FUN_005f22e0(DAT_fffffef4, DAT_fffffdf0);
    FUN_005f22e0(DAT_fffffef4, DAT_006336d0);
    FUN_004741be(DAT_fffffef4, 1);
  }
  return 1;
}


 export function FUN_00553ff6 ()

 {
  let iVar1;

  if (((DAT_00655af0 & 0x10) === 0)) {
    iVar1 = FUN_00410030(s_REALLYCHEAT_006336d8, DAT_0063fc58, 0);
    if ((iVar1 === 0)) {
      return;
    }
    wv(DAT_00655af0, (DAT_00655af0 | 0x10));
    wv(DAT_00655aea, (DAT_00655aea | 0x8000));
    iVar1 = FUN_00553dfd();
    if ((iVar1 !== 0)) {
      FUN_004190d0(DAT_006336ec, s_WARNING_006336e4);
      wv(DAT_00655af0, ((DAT_00655af0 | 0x10) | 0x80));
    }
  }
  else if ((iVar1 === 0)) {
    iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
    if ((iVar1 === 0)) {
      FUN_004190d0(DAT_006336fc, s_WARNING_006336f4);
    }
    iVar1 = FUN_00553dfd();
    if ((iVar1 === 0)) {
      return;
    }
    wv(DAT_00655aea, (DAT_00655aea | 0x8000));
    wv(DAT_00655af0, (DAT_00655af0 | 0x80));
  }
  else {
    wv(DAT_00655af0, (DAT_00655af0 & 0xff7f));
  }
  FUN_004e4ceb();
  return;
}


 export function FUN_00554145 (param_1)

 {
  let uVar1;
  let unaff_FS_OFFSET;
  let local_308;
  let local_304;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0055427e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_304 = DAT_fffffcfc;
  for (/* cond: (local_308 < 8) */); local_308 = local_308; local_308 = (local_308 + 1)) {
    if ((((1 << (((local_308) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      FUN_0040bbb0();
      uVar1 = FUN_00410070(local_308);
      FUN_0040bbe0(uVar1);
      FUN_0059edf0(DAT_00679640, local_308, 0);
    }
  }
  FUN_0059ea99(DAT_006d1da0);
  FUN_0040bc80(0);
  local_8 = -1;
  FUN_00554272();
  FUN_00554288();
  return;
}


 export function FUN_00554272 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00554288 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00554297 ()

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    if ((s32((DAT_00673d38 + local_c * 4), 0) !== 0)) {
      local_8 = (local_8 + 1);
    }
  }
  if ((local_8 === 0)) {
    if (((DAT_00655af0 & 0x10) === 0)) {
      iVar3 = FUN_00410030(s_REALLYCHEAT_00633740, DAT_0063fc58, 0);
      if ((iVar3 === 0)) {
        return;
      }
      uVar2 = (DAT_00655af0 | 0x10);
      uVar1 = (DAT_00655af0 & 0x80);
      wv(DAT_00655af0, uVar2);
      if ((uVar1 !== 0)) {
        FUN_004190d0(DAT_00633754, s_WARNING_0063374c);
      }
    }
    wv(DAT_00655aea, (DAT_00655aea ^ 0x8000));
    if ((((DAT_00655aea ^ 0x8000) & 0x8000) === 0)) {
      if ((DAT_00655b02 !== 0)) {
        FUN_0055ae80(1);
        wv(DAT_00654b70, DAT_00654c7e);
        FUN_0055b046(1);
      }
    }
    else {
      FUN_0055ae80(1);
      wv(DAT_00654c7e, DAT_00654b70);
      wv(DAT_00654b70, 0);
    }
    FUN_004e4ceb();
  }
  else {
    FUN_00421da0(0, local_8);
    if ((local_8 === 1)) {
      FUN_00410030(s_PASSWORDNOCHEAT1_00633718, DAT_0063fc58, 0);
    }
    else {
      FUN_00410030(s_PASSWORDNOCHEAT2_0063372c, DAT_0063fc58, 0);
    }
  }
  return;
}


 export function FUN_00554423 ()

 {
  let iVar1;

  iVar1 = FUN_00554145(0);
  if ((-1 < iVar1)) {
    FUN_004c21d5(iVar1, 0);
  }
  return;
}


 export function FUN_00554460 (param_1)

 {
  let local_c;

  if ((_MEM[DAT_0064c6b1 + param_1 * 0x594] === 0)) {
    for (/* cond: (local_c < 0x64) */); local_c = (local_c < 0x64); local_c = (local_c + 1)) {
      FUN_004bf05b(param_1, local_c, 0, 0, 0);
    }
    _MEM[DAT_0064c6b1 + param_1 * 0x594] = 1;
    FUN_00444270(s_GAVETECH_0063375c);
  }
  else {
    for (/* cond: (local_c < 0xd) */); local_c = (local_c < 0xd); local_c = (local_c + 1)) {
      _MEM[DAT_0064c6f8 + (param_1 * 0x594 + local_c)] = 0;
    }
    for (/* cond: (local_c < 0x64) */); local_c = (local_c < 0x64); local_c = (local_c + 1)) {
      _MEM[DAT_00655b82 + local_c] = (_MEM[DAT_00655b82 + local_c] & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
    }
    _MEM[DAT_0064c6b1 + param_1 * 0x594] = 0;
    _MEM[DAT_0064c6b0 + param_1 * 0x594] = 1;
    FUN_00444270(s_TOOKTECH_00633768);
  }
  FUN_00509429();
  return;
}


 export function FUN_005545d3 ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_318;
  let local_314;
  let local_310;
  let local_30c;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0055494a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = -1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  wv(DAT_0062804c, 0);
  iVar1 = FUN_00554145(0);
  if ((-1 < iVar1)) {
    while ((iVar2 < 0)) {
      FUN_0040ffa0(s_EDITTECH_00633774, 1);
      for (/* cond: (local_314 < 0x64) */); local_314 = (local_314 < 0x64); local_314 = (local_314 + 1)) {
        if ((_MEM[DAT_00627689 + local_314 * 0x10] !== 0)) {
          FUN_0040bbb0();
          FUN_0040ff00(s32((DAT_00627684 + local_314 * 0x10), 0));
          FUN_0040fe10();
          iVar2 = FUN_004bd9f0(iVar1, local_314);
          if ((iVar2 === 0)) {
            iVar2 = FUN_004bd9f0(iVar1, s8(_MEM[DAT_0062768e + local_314 * 0x10]));
            if ((iVar2 === 0)) {
              FUN_0040bbe0(DAT_00633784);
            }
          }
          else {
            FUN_0040bbe0(DAT_00633780);
          }
          FUN_0059edf0(DAT_00679640, local_314, 0);
        }
      }
      if ((-1 < local_14)) {
        FUN_0059ea99(local_14);
      }
      iVar2 = FUN_0040bc80(0);
      if ((iVar2 < 0)) {
        iVar3 = FUN_004bd9f0(iVar1, iVar2);
        if ((iVar3 === 0)) {
          FUN_004bf05b(iVar1, iVar2, 0, 0, 0);
        }
        else {
          FUN_005ae3bf(iVar2, DAT_fffffcf0, DAT_fffffcf4);
          _MEM[DAT_0064c6f8 + (iVar1 * 0x594 + local_310)] = (_MEM[DAT_0064c6f8 + (iVar1 * 0x594 + local_310)] & (~((UNNAMED) & 0xFF)));
          local_318 = ((iVar1) & 0xFF);
          _MEM[DAT_00655b82 + iVar2] = (_MEM[DAT_00655b82 + iVar2] & (~(((1 << (local_318 & 0x1f))) & 0xFF)));
        }
        _MEM[DAT_0064c6b0 + iVar1 * 0x594] = 0;
        local_14 = iVar2;
        for (/* cond: (local_314 < 0x64) */); local_314 = (local_314 < 0x64); local_314 = (local_314 + 1)) {
          iVar2 = FUN_004bd9f0(iVar1, local_314);
          if ((iVar2 !== 0)) {
            _MEM[DAT_0064c6b0 + iVar1 * 0x594] = (_MEM[DAT_0064c6b0 + iVar1 * 0x594] + 1);
          }
        }
        FUN_00509429();
      }
      else {
        FUN_00554460(iVar1);
      }
    }
    local_8 = -1;
    FUN_0055493e();
    FUN_00554954();
    return;
  }
  local_8 = -1;
  FUN_0055493e();
  FUN_00554954();
  return;
}


 export function FUN_0055493e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00554954 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00554962 ()

 {
  let iVar1;

  iVar1 = FUN_00554145(0);
  if ((-1 < iVar1)) {
    FUN_0055c3d3(iVar1, 1);
  }
  return;
}


 export function FUN_0055499f ()

 {
  let bVar1;
  let iVar2;
  let pbVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let unaff_FS_OFFSET;
  let uVar7;
  let local_324;
  let local_320;
  let local_314;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0055519b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar2 = FUN_004087c0(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((iVar2 === 0)) {
    local_8 = -1;
    FUN_0055518f();
    FUN_005551a5();
    return;
  }
  iVar2 = FUN_005b8ca6(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((-1 < iVar2)) {
    local_8 = -1;
    FUN_0055518f();
    FUN_005551a5();
    return;
  }
  pbVar3 = FUN_005b8931(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  bVar1 = FUN_005b89bb(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  uVar6 = u8(bVar1);
  local_20 = uVar6;
  iVar2 = FUN_005b89e4(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((iVar2 === 0)) {
    local_314 = DAT_fffffcec;
    uVar7 = 0;
    uVar4 = local_20;
    uVar5 = FUN_00428b0c(s32((DAT_00627cc4 + local_20 * 0x18), 0), local_20, 0);
    FUN_0059edf0(uVar5, uVar4, uVar7);
    while ((0xff < _MEM[DAT_00627cce + local_20 * 0x18])) {
      uVar4 = s8(_MEM[DAT_00627cce + local_20 * 0x18]);
      uVar7 = 0;
      local_20 = uVar4;
      uVar5 = FUN_00428b0c(s32((DAT_00627cc4 + uVar4 * 0x18), 0), uVar4, 0);
      FUN_0059edf0(uVar5, uVar4, uVar7);
    }
    if ((uVar6 !== local_20)) {
      if ((local_20 < 0)) {
        local_8 = -1;
        FUN_0055518f();
        FUN_005551a5();
        return;
      }
      _MEM[pbVar3] = (_MEM[pbVar3] & 0x80);
      _MEM[pbVar3] = (_MEM[pbVar3] | ((local_20) & 0xFF));
    }
    local_14 = _MEM[pbVar3 + 1];
    FUN_0051d7d6(0, (local_14 & 4));
    FUN_0051d7d6(1, (local_14 & 8));
    FUN_0051d7d6(2, (local_14 & 0x10));
    FUN_0051d7d6(3, (local_14 & 0x20));
    FUN_0051d7d6(4, ((local_14 & 0x42) === 0x40));
    FUN_0051d7d6(5, ((local_14 & 0x42) === 0x42));
    FUN_0051d7d6(6, (local_14 & 0x80));
    if ((DAT_00633678 < 0)) {
      iVar2 = FUN_00419100(s_DEBUG_006337a4, s_TERRAIN_0063379c, 1);
      if ((iVar2 < 0)) {
        local_8 = -1;
        FUN_0055518f();
        FUN_005551a5();
        return;
      }
      if ((DAT_00631edc === 0)) {
        wv(DAT_00633678, DAT_00631ed8);
      }
    }
    else {
      wv(DAT_00631ed8, DAT_00633678);
    }
    if ((DAT_00631edc === 0)) {
      if (((local_14 & 0x80) !== 0)) {
        wv(DAT_00655b12, (DAT_00655b12 + 0xffff));
      }
      local_14 = (local_14 & 1);
      iVar2 = FUN_0051d817(0);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 4);
      }
      iVar2 = FUN_0051d817(1);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 8);
      }
      iVar2 = FUN_0051d817(2);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 0x10);
      }
      iVar2 = FUN_0051d817(3);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 0x30);
      }
      iVar2 = FUN_0051d817(4);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 0x40);
      }
      iVar2 = FUN_0051d817(5);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 0x42);
      }
      iVar2 = FUN_0051d817(6);
      if ((iVar2 !== 0)) {
        local_14 = (local_14 | 0x80);
        wv(DAT_00655b12, (DAT_00655b12 + 1));
      }
      _MEM[pbVar3 + 1] = local_14;
      for (/* cond: (local_324 < 8) */); local_324 = (local_324 < 8); local_324 = (local_324 + 1)) {
        iVar2 = FUN_005b8b65(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16), local_324);
        if ((iVar2 !== 0)) {
          FUN_005b8b1a(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16), local_324);
        }
      }
      FUN_0047ce1e(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16), 1, DAT_006d1da0, 1);
      local_8 = -1;
      FUN_0055518f();
      FUN_005551a5();
      return;
    }
  }
  FUN_0059db65();
  FUN_0059d5f5();
  local_314 = DAT_fffffcec;
  for (/* cond: (local_20 < 0xb) */); local_20 = local_20; local_20 = (local_20 + 1)) {
    uVar7 = 0;
    uVar4 = local_20;
    uVar5 = FUN_00428b0c(s32((DAT_00627cc4 + local_20 * 0x18), 0), local_20, 0);
    FUN_0059edf0(uVar5, uVar4, uVar7);
    if ((uVar6 === local_20)) {
      FUN_0059ea99(local_20);
    }
  }
  local_20 = FUN_0040bc80(0);
  if ((local_20 < 0)) {
    local_8 = -1;
    FUN_0055518f();
    FUN_005551a5();
    return;
  }
  if ((uVar6 === local_20)) {
    local_8 = -1;
    FUN_0055518f();
    FUN_005551a5();
    return;
  }
  if ((local_20 === 0xa)) {
    _MEM[pbVar3] = 0xa;
    local_320 = 0x3f;
    for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
      uVar5 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_18]) + ((DAT_0064b1b4) << 16 >> 16)));
      local_1c = (s8(_MEM[DAT_00628360 + local_18]) + ((DAT_0064b1b0) << 16 >> 16));
      iVar2 = FUN_004087c0(uVar5, local_1c);
      if ((iVar2 < local_320)) {
        local_320 = iVar2;
      }
    }
    _MEM[pbVar3 + 3] = ((local_320) & 0xFF);
  }
  else {
    _MEM[pbVar3] = (_MEM[pbVar3] & 0x80);
    _MEM[pbVar3] = (_MEM[pbVar3] | ((local_20) & 0xFF));
    if ((uVar6 === 0xa)) {
      local_320 = 0x3f;
      for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
        uVar5 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_18]) + ((DAT_0064b1b4) << 16 >> 16)));
        local_1c = (s8(_MEM[DAT_00628360 + local_18]) + ((DAT_0064b1b0) << 16 >> 16));
        iVar2 = FUN_004087c0(uVar5, local_1c);
        if ((iVar2 < local_320)) {
          local_320 = iVar2;
        }
      }
      _MEM[pbVar3 + 3] = ((local_320) & 0xFF);
    }
  }
  FUN_0047cea6(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  local_8 = -1;
  FUN_0055518f();
  FUN_005551a5();
  return;
}


 export function FUN_0055518f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005551a5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005551b3 ()

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let iVar3;
  let uVar4;
  let local_308;
  let local_304;
  let local_228;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005555f7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006d1da0 !== DAT_0063367c)) {
    wv(DAT_0063367c, DAT_006d1da0);
    wv(DAT_00633680, -1);
  }
  if ((DAT_00633680 < 0)) {
    wv(DAT_00633680, DAT_006d1da0);
  }
  while ((iVar1 < 0)) {
    local_304 = DAT_fffffcfc;
    for (/* cond: (local_308 < 0x3e) */); local_308 = (local_308 < 0x3e); local_308 = (local_308 + 1)) {
      if ((iVar1 !== 0)) {
        FUN_0040bbb0();
        if ((DAT_00633688 !== 0)) {
          FUN_0040bc10(0xd);
          FUN_0040fe10();
        }
        FUN_0040ff00(s32((DAT_0064b1b8 + local_308 * 0x14), 0));
        FUN_0059edf0(DAT_00679640, local_308, 0);
        if ((DAT_00633684 < 0)) {
          wv(DAT_00633684, local_308);
        }
      }
    }
    if ((-1 < DAT_00633684)) {
      FUN_0059ea99(DAT_00633684);
    }
    iVar1 = FUN_0040bc80(0);
    wv(DAT_00633684, iVar1);
    if ((iVar1 < 0)) {
    case 1 :
      FUN_0040bc40(1);
      for (/* cond: (DAT_00633680 < 8) */); wv(DAT_00633680, (DAT_00633680 < 8)); wv(DAT_00633680, (DAT_00633680 + 1))) {
        if ((((1 << (((DAT_00633680) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
          uVar4 = 0;
          iVar3 = DAT_00633680;
          uVar2 = FUN_00493c7d(DAT_00633680, DAT_00633680, 0);
          FUN_0059edf0(uVar2, iVar3, uVar4);
        }
      }
      wv(DAT_00633680, FUN_0040bc80(0));
      if ((FUN_0040bc80(0) < 0)) {
        local_8 = -1;
        FUN_005555eb();
        FUN_00555601();
        return;
      }
    default :
      iVar1 = FUN_005b3d06(iVar1, DAT_00633680, ((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
      if ((DAT_00633688 !== 0)) {
        w16((DAT_006560f4 + iVar1 * 0x20), 0, (s16((DAT_006560f4 + iVar1 * 0x20), 0) | 0x2000));
      }
      FUN_0047cea6(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
      wv(DAT_0062804c, 0);
      local_8 = -1;
      FUN_005555eb();
      FUN_00555601();
      return;
    case 2 :
      wv(DAT_00633688, (DAT_00633688 === 0));
      wv(DAT_00633684, -1);
      break;
    case 3 :
      wv(DAT_0063368c, (DAT_0063368c === 0));
      wv(DAT_00633684, -1);
      break;
    case 4 :
      wv(DAT_00633690, (DAT_00633690 === 0));
      wv(DAT_00633684, -1);
    }
  }
  local_8 = -1;
  FUN_005555eb();
  FUN_00555601();
  return;
}


 export function FUN_005555eb ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00555601 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0055560f ()

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let uVar4;
  let local_30c;
  let local_308;
  let local_304;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00555827;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_304 = DAT_fffffcfc;
  for (/* cond: (local_30c < 8) */); local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
    FUN_0040bbb0();
    uVar1 = FUN_00410070(local_30c);
    FUN_0040bbe0(uVar1);
    FUN_0059edf0(DAT_00679640, local_30c, 0);
  }
  uVar4 = 0;
  uVar3 = 0x62;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x13c), 0), 0x62, 0);
  FUN_0059edf0(uVar1, uVar3, uVar4);
  uVar4 = 0;
  uVar3 = 0x63;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x138), 0), 0x63, 0);
  FUN_0059edf0(uVar1, uVar3, uVar4);
  if ((DAT_00655b06 < 0)) {
    FUN_0059ea99(0x62);
  }
  else {
    FUN_0059ea99(0x63);
  }
  iVar2 = FUN_0040bc80(0);
  if ((iVar2 < 0)) {
    local_8 = -1;
    FUN_0055581b();
    FUN_00555831();
    return;
  }
  if ((iVar2 === 0x62)) {
    wv(DAT_00655b07, 1);
    wv(DAT_00655b06, 0xff);
  }
  else if ((iVar2 === 0x63)) {
    wv(DAT_00655b07, 0);
    wv(DAT_00655b06, 0xff);
  }
  else {
    wv(DAT_00655b07, 0);
    local_308 = ((iVar2) & 0xFF);
    wv(DAT_00655b06, local_308);
  }
  if ((0xff < DAT_00655b06)) {
    wv(DAT_006d1da0, s8(DAT_00655b06));
    wv(DAT_00655b0b, (((1 << (DAT_00655b06 & 0x1f))) & 0xFF));
  }
  FUN_00413476();
  FUN_0047cf9e(DAT_006d1da0, 1);
  local_8 = -1;
  FUN_0055581b();
  FUN_00555831();
  return;
}


 export function FUN_0055581b ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00555831 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0055583f ()

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let uVar4;
  let local_30c;
  let local_308;
  let local_304;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005559ea;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_304 = DAT_fffffcfc;
  for (/* cond: (local_30c < 8) */); local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
    if ((((1 << (((local_30c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      FUN_0040bbb0();
      uVar1 = FUN_00410070(local_30c);
      FUN_0040bbe0(uVar1);
      FUN_0059edf0(DAT_00679640, local_30c, 0);
    }
  }
  uVar4 = 0;
  uVar3 = 0x63;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x140), 0), 0x63, 0);
  FUN_0059edf0(uVar1, uVar3, uVar4);
  iVar2 = FUN_0040bc80(0);
  if ((-1 < iVar2)) {
    if ((iVar2 === 0x63)) {
      wv(DAT_00655b0b, 0);
      wv(DAT_0064b9bc, 0);
    }
    else {
      local_308 = ((iVar2) & 0xFF);
      wv(DAT_00655b0b, (((1 << (local_308 & 0x1f))) & 0xFF));
      wv(DAT_00655b03, local_308);
      wv(DAT_00655b05, local_308);
      wv(DAT_006d1da0, iVar2);
      FUN_0047cf9e(iVar2, 1);
      FUN_004897fa(1);
    }
    local_8 = -1;
    FUN_005559de();
    FUN_005559f4();
    return;
  }
  local_8 = -1;
  FUN_005559de();
  FUN_005559f4();
  return;
}


 export function FUN_005559de ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005559f4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00555a02 ()

 {
  let iVar1;
  let local_8;

  FUN_00421da0(0, ((DAT_00655af8) << 16 >> 16));
  iVar1 = FUN_0051d75d(s_DEBUG_006359dc, s_GAMEYEAR_006337fc, ((DAT_00655af8) << 16 >> 16), DAT_fffffff8);
  if ((iVar1 === 0)) {
    wv(DAT_00655af8, UNNAMED);
    wv(DAT_00655afa, FUN_00484fec(((UNNAMED) << 16 >> 16)));
    FUN_0056a65e(1);
    FUN_00509429();
  }
  return;
}


 export function FUN_00555a8b ()

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_310;
  let local_308;
  let local_304;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00555c99;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_304 = DAT_fffffcfc;
  for (/* cond: (local_310 < 8) */); local_310 = (local_310 < 8); local_310 = (local_310 + 1)) {
    if ((((1 << (((local_310) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      FUN_0040bbb0();
      uVar1 = FUN_00410070(local_310);
      FUN_0040bbe0(uVar1);
      FUN_0059edf0(DAT_00679640, local_310, 0);
    }
  }
  iVar2 = FUN_0040bc80(0);
  if ((-1 < iVar2)) {
    local_310 = ((iVar2) & 0xFF);
    wv(DAT_00655b0b, (DAT_00655b0b & (~(((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF))));
    if ((2 < DAT_00655b02)) {
      FUN_0046b14d(0x31, 0, 0, iVar2, 0, 0, 0, 0, 0, 0);
    }
    local_308 = ((DAT_00655b18) << 16 >> 16);
    while ((-1 < local_308)) {
      if ((s8(_MEM[DAT_0064f348 + local_308 * 0x58]) === iVar2)) {
        FUN_004413d1(local_308, 0);
      }
    }
    FUN_004aa378(iVar2, DAT_006d1da0);
    local_8 = -1;
    FUN_00555c8d();
    FUN_00555ca3();
    return;
  }
  local_8 = -1;
  FUN_00555c8d();
  FUN_00555ca3();
  return;
}


 export function FUN_00555c8d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00555ca3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00555cb1 ()

 {
  let uVar1;

  uVar1 = FUN_005b2e69(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  FUN_005b47fa(uVar1, 1);
  return;
}


 export function FUN_00555ced (param_1)

 {
  let local_8;

  local_8 = 0x29;
  if ((param_1 === 5)) {
    local_8 = 0x2a;
  }
  if ((param_1 === 0x15)) {
    local_8 = 0x1d;
  }
  if ((param_1 === 0)) {
    local_8 = 0x6a;
  }
  if ((param_1 === 1)) {
    local_8 = 0x7a;
  }
  if ((param_1 === 4)) {
    local_8 = 0x55;
  }
  if ((param_1 === 2)) {
    local_8 = 0x5e;
  }
  return local_8;
}


 export function FUN_00555d70 ()

 {
  let iVar1;
  let uVar2;
  let extraout_EAX;
  let pCVar3;
  let local_28;
  let local_20;
  let local_1c;
  let local_18;
  let local_c;
  let local_8;

  local_28 = DAT_006d1da0;
  if ((-1 < iVar1)) {
    local_28 = s8(_MEM[DAT_0064f348 + iVar1 * 0x58]);
  }
  for (/* cond: (local_c < 0x30) */); local_c = (local_c < 0x30); local_c = (local_c + 1)) {
    if ((-1 < s8(_MEM[DAT_0064cab8 + (local_c * 6 + local_28 * 0x594)]))) {
      uVar2 = FUN_00555ced(s8(_MEM[DAT_0064cab8 + (local_c * 6 + local_28 * 0x594)]));
      FUN_00472b0a(((s16((DAT_0064cab4 + (local_c * 6 + local_28 * 0x594)), 0)) << 16 >> 16), ((s16((DAT_0064cab6 + (local_c * 6 + local_28 * 0x594)), 0)) << 16 >> 16), s8(_MEM[DAT_0064cab9 + (local_c * 6 + local_28 * 0x594)]), uVar2);
      local_8 = local_c;
      while ((local_8 < 0x30)) {
        if ((s16((DAT_0064cab6 + (local_c * 6 + local_28 * 0x594)), 0) === s16((DAT_0064cab6 + (local_28 * 0x594 + local_8 * 6)), 0))) {
          _MEM[DAT_0064cab8 + (local_28 * 0x594 + local_8 * 6)] = 0xff;
        }
      }
    }
  }
  local_18 = 4;
  local_1c = 2;
  FUN_005baeb0(DAT_0066c7a8);
  FUN_005baec8(DAT_006aa864);
  for (/* cond: (local_20 < 0x40) */); local_20 = (local_20 < 0x40); local_20 = (local_20 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff30(local_20);
    FUN_0040fe40();
    FUN_0040ff30(_MEM[DAT_0064ca32 + (local_28 * 0x594 + local_20)]);
    uVar2 = FUN_00555ced(_MEM[DAT_0064ca32 + (local_28 * 0x594 + local_20)], 0xa, 1, 1);
    FUN_005baee0(uVar2);
    FUN_0043c8d0(DAT_00679640, local_18, local_1c);
    wv(DAT_006aa864, DAT_006aa864);
    local_1c = (local_1c + extraout_EAX);
    pCVar3 = GetActiveView(DAT_0066c7a8);
    if (((pCVar3 + -12) <= local_1c)) {
      local_1c = 2;
      local_18 = (local_18 + 0x30);
    }
  }
  FUN_00408460();
  return;
}


 export function FUN_005560c9 ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_10;
  let local_c;

  for (/* cond: (local_c < DAT_0066caa0) */); local_c = (local_c < DAT_0066caa0); local_c = (local_c + 2)) {
    for (/* cond: (local_10 < DAT_0066caa4) */); local_10 = (local_10 < DAT_0066caa4); local_10 = (local_10 + 1)) {
      iVar1 = (DAT_0066ca90 + local_c);
      iVar2 = (DAT_0066ca94 + local_10);
      uVar3 = FUN_005b8c42(iVar1, iVar2, 0x6a);
      FUN_00472b0a(iVar1, iVar2, uVar3);
    }
  }
  return;
}


 export function FUN_0055615c ()

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_8;

  iVar1 = FUN_00554145(0);
  if ((-1 < iVar1)) {
    uVar2 = FUN_00410070(iVar1);
    FUN_0040ff60(0, uVar2);
    FUN_00467580(0, s32((DAT_0064c6a2 + iVar1 * 0x594), 0));
    iVar3 = FUN_0051d75d(s_DEBUG_006359dc, s_MONEY_00633818, s32((DAT_0064c6a2 + iVar1 * 0x594), 0), DAT_fffffff8);
    if ((iVar3 === 0)) {
      if ((0x7530 < local_8)) {
        local_8 = 0x7530;
      }
      if ((local_8 < 0)) {
        local_8 = 0;
      }
      w32((DAT_0064c6a2 + iVar1 * 0x594), 0, local_8);
      FUN_00509429();
      FUN_0056a65e(1);
    }
  }
  return;
}


 export function FUN_0055625b ()

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_230;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005569cb;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar2 = FUN_004087c0(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((iVar2 === 0)) {
    local_8 = -1;
    FUN_005569bf();
    FUN_005569d5();
    return;
  }
  local_31c = FUN_005b2e69(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((-1 < local_31c)) {
    iVar2 = FUN_005b50ad(local_31c, 2);
    if ((1 < iVar2)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xf8), 0), 1);
      local_31c = FUN_005b6aea(local_31c, uVar3);
      if ((local_31c < 0)) {
        local_8 = -1;
        FUN_005569bf();
        FUN_005569d5();
        return;
      }
    }
    cVar1 = _MEM[DAT_006560f7 + local_31c * 0x20];
    while ((iVar2 === 0)) {
      uVar3 = FUN_00410070(s8(cVar1));
      FUN_0040ff60(0, uVar3);
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_31c * 0x20]) * 0x14), 0));
      if (((s16((DAT_006560f4 + local_31c * 0x20), 0) & 0x2000) !== 0)) {
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0xd);
        FUN_0040fed0();
      }
      FUN_0040fe10();
      FUN_0040fea0();
      if ((_MEM[DAT_00656100 + local_31c * 0x20] === 0xff)) {
        FUN_0040bc10(0xe);
      }
      else {
        FUN_0040bbe0((DAT_0064f360 + u8(_MEM[DAT_00656100 + local_31c * 0x20]) * 0x58));
      }
      FUN_0040fed0();
      FUN_0040ff60(1, DAT_00679640);
      iVar2 = FUN_00421ea0(s_UNITEDIT_00633820);
      if ((iVar2 === 0)) {
        w16((DAT_006560f4 + local_31c * 0x20), 0, (s16((DAT_006560f4 + local_31c * 0x20), 0) ^ 0x2000));
        FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
        FUN_0056a65e(1);
      }
      else if ((iVar2 === 2)) {
        _MEM[DAT_006560f8 + local_31c * 0x20] = 0;
        FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
        FUN_0056a65e(1);
      }
      else if ((iVar2 === 3)) {
        uVar3 = FUN_005b29aa(local_31c);
        FUN_00421da0(0, uVar3);
        iVar2 = FUN_00518ec0(s_UNITHITPOINTS_0063382c, _MEM[DAT_006560fa + local_31c * 0x20], DAT_ffffffe8);
        if ((iVar2 === 0)) {
          _MEM[DAT_006560fa + local_31c * 0x20] = UNNAMED;
        }
        FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
        FUN_0056a65e(1);
      }
      else if ((iVar2 === 4)) {
        local_310 = 0;
        FUN_0040ffa0(s_EDITHOMECITY_0063383c, 1);
        for (/* cond: (local_314 < ((DAT_00655b18) << 16 >> 16)) */); local_314 = (local_314 < ((DAT_00655b18) << 16 >> 16)); local_314 = (local_314 + 1)) {
          if ((s8(_MEM[DAT_0064f348 + local_314 * 0x58]) === s8(cVar1))) {
            FUN_0059edf0((DAT_0064f360 + local_314 * 0x58), local_314, 0);
            local_310 = (local_310 + 1);
          }
        }
        if ((-1 < iVar2)) {
          if ((local_230 === 0)) {
            local_318 = ((iVar2) & 0xFF);
            _MEM[DAT_00656100 + local_31c * 0x20] = local_318;
          }
          else {
            _MEM[DAT_00656100 + local_31c * 0x20] = 0xff;
          }
          FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
          FUN_0056a65e(1);
        }
      }
      else if ((iVar2 === 5)) {
        if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + local_31c * 0x20]) * 0x14] === 0)) {
          if ((_MEM[DAT_006560ff + local_31c * 0x20] === 2)) {
            _MEM[DAT_006560ff + local_31c * 0x20] = 0xff;
          }
          else {
            _MEM[DAT_006560ff + local_31c * 0x20] = 2;
          }
          FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
          FUN_0056a65e(1);
        }
      }
      else {
        if ((iVar2 !== 6)) {
          local_8 = -1;
          FUN_005569bf();
          FUN_005569d5();
          return;
        }
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_31c * 0x20]) * 0x14] === 7)) {
          FUN_0040ffa0(s_SUPPLYSEARCH_0063384c, 1);
          for (/* cond: (local_14 < 0x10) */); local_14 = (local_14 < 0x10); local_14 = (local_14 + 1)) {
            uVar4 = 0;
            iVar2 = local_14;
            uVar3 = FUN_00428b0c(s32((DAT_0064b168 + local_14 * 4), 0), local_14, 0);
            FUN_0059edf0(uVar3, iVar2, uVar4);
            if ((s8(_MEM[DAT_006560fd + local_31c * 0x20]) === local_14)) {
              FUN_0059ea99(local_14);
            }
          }
          uVar5 = 0;
          uVar4 = 0x10;
          uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x300), 0), 0x10, 0);
          FUN_0059edf0(uVar3, uVar4, uVar5);
          if ((_MEM[DAT_006560fd + local_31c * 0x20] < 0)) {
            FUN_0059ea99(0x10);
          }
          iVar2 = FUN_0040bc80(0);
          if ((-1 < iVar2)) {
            if ((iVar2 < 0x10)) {
              local_318 = ((iVar2) & 0xFF);
              _MEM[DAT_006560fd + local_31c * 0x20] = local_318;
            }
            else {
              _MEM[DAT_006560fd + local_31c * 0x20] = 0xff;
            }
            FUN_0047cea6(((s16((DAT_006560f0 + local_31c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_31c * 0x20), 0)) << 16 >> 16));
            FUN_0056a65e(1);
          }
        }
      }
    }
    local_8 = -1;
    FUN_005569bf();
    FUN_005569d5();
    return;
  }
  local_8 = -1;
  FUN_005569bf();
  FUN_005569d5();
  return;
}


 export function FUN_005569bf ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005569d5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005569e3 ()

 {
  let cVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let unaff_FS_OFFSET;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00556f3c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar3 = FUN_004087c0(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((iVar3 === 0)) {
    local_8 = -1;
    FUN_00556f30();
    FUN_00556f46();
    return;
  }
  iVar3 = FUN_0043cf76(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  if ((-1 < iVar3)) {
    cVar1 = _MEM[DAT_0064f348 + iVar3 * 0x58];
    while ((iVar5 !== 6)) {
      while ((iVar5 !== 5)) {
        while ((iVar5 !== 4)) {
          while ((iVar5 !== 3)) {
            while ((iVar5 !== 2)) {
              while ((iVar5 !== 1)) {
                FUN_00421da0(0, ((s32((DAT_0064f344 + iVar3 * 0x58), 0) & 0x4000000) >>> 0x1a));
                FUN_0040bbb0();
                FUN_0040bbe0((DAT_0064f360 + iVar3 * 0x58));
                FUN_0040fe10();
                FUN_0040fea0();
                uVar4 = FUN_00410070(s8(cVar1));
                FUN_0040bbe0(uVar4);
                FUN_0040fed0();
                FUN_0040ff60(0, DAT_00679640);
                iVar5 = FUN_00421ea0(s_CITYEDIT_0063385c);
                if ((iVar5 === 0)) {
                  local_8 = -1;
                  FUN_00556f30();
                  FUN_00556f46();
                  return;
                }
                if ((iVar5 !== 1));
                if ((iVar5 === 0)) {
                  _MEM[DAT_0064f349 + iVar3 * 0x58] = ((local_1c) & 0xFF);
                }
                FUN_0047cea6(((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar3 * 0x58), 0)) << 16 >> 16));
                FUN_0056a65e(1);
              }
              if ((iVar5 !== 2)); local_20 = (local_20 < 0x1c); local_20 = (local_20 + 1)) {
                if ((((s16((DAT_00655be6 + local_20 * 2), 0)) << 16 >> 16) === iVar3)) {
                  w16((DAT_00655be6 + local_20 * 2), 0, 0xffff);
                }
              }
              FUN_0047cea6(((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar3 * 0x58), 0)) << 16 >> 16));
              FUN_0056a65e(1);
            }
            if ((iVar5 !== 3));
            FUN_0047cea6(((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar3 * 0x58), 0)) << 16 >> 16));
          }
          if ((iVar5 !== 4));
          bVar2 = 0;
          for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
            if ((local_14 !== iVar3)) {
              FUN_0059edf0((DAT_0064f360 + local_14 * 0x58), local_14, 0);
              bVar2 = 1;
            }
          }
          if ((-1 < local_14)) {
            uVar4 = FUN_0043d20a(iVar3, 1);
            for (/* cond: (local_18 < 5) */); local_18 = (local_18 < 5); local_18 = (local_18 + 1)) {
              _MEM[DAT_0064f374 + (iVar3 * 0x58 + local_18)] = _MEM[DAT_0064f374 + (local_14 * 0x58 + local_18)]
              ;
            }
            FUN_0043d289(iVar3, 1, uVar4);
            FUN_00509429();
          }
        }
        if ((iVar5 !== 5));
        if ((iVar5 === 0)) {
          w16((DAT_0064f35c + iVar3 * 0x58), 0, ((local_1c) & 0xFFFF));
        }
        FUN_0047cea6(((s16((DAT_0064f340 + iVar3 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar3 * 0x58), 0)) << 16 >> 16));
        FUN_0056a65e(1);
        FUN_00509429();
      }
      if ((iVar5 !== 6));
    }
    local_8 = -1;
    FUN_00556f30();
    FUN_00556f46();
    return;
  }
  local_8 = -1;
  FUN_00556f30();
  FUN_00556f46();
  return;
}


 export function FUN_00556f30 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00556f46 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00556f54 ()

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_31c;
  let local_318;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00557e14;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar1 = FUN_00554145(0);
  if ((iVar1 < 0)) {
    local_8 = -1;
    FUN_00557e08();
    FUN_00557e1e();
    return;
  }
  while ((iVar3 !== 0xc)) {
    while ((iVar3 !== 0xb)) {
      while ((iVar3 !== 0xa)) {
        while ((iVar3 !== 9)) {
          while ((iVar3 !== 8)) {
            while ((iVar3 !== 7)) {
              while ((iVar3 !== 6)) {
                while ((iVar3 !== 5)) {
                  while ((iVar3 !== 4)) {
                    while ((iVar3 !== 3)) {
                      while ((iVar3 !== 2)) {
                        while ((iVar3 !== 1)) {
                          FUN_00421da0(0, ((((s16((DAT_0064c6a0 + iVar1 * 0x594), 0)) & 0xFFFF) & 0x200) >>> 9));
                          FUN_0040bbb0();
                          uVar2 = FUN_00493b10(iVar1);
                          FUN_0040bbe0(uVar2);
                          FUN_0040ff60(0, DAT_00679640);
                          iVar3 = FUN_00421ea0(s_EDITKING_00633890);
                          if ((iVar3 === 0)) {
                            local_8 = -1;
                            FUN_00557e08();
                            FUN_00557e1e();
                            return;
                          }
                          if ((iVar3 !== 1));
                          if ((-1 < local_1c)) {
                            uVar2 = FUN_00493b10(local_1c);
                            FUN_0040ff60(1, uVar2);
                            FUN_0051d7bc();
                            FUN_0051d7d6(0, (s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 1));
                            FUN_0051d7d6(1, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 2) >>> 1));
                            FUN_0051d7d6(2, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 4) >>> 2));
                            FUN_0051d7d6(3, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 8) >>> 3));
                            FUN_0051d7d6(4, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 0x2000) >>> 0xd));
                            FUN_0051d7d6(5, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 0x10) >>> 4));
                            FUN_0051d7d6(6, ((s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & 0x80) >>> 7));
                            iVar3 = FUN_00421e70(s_EDITTREATIES_0063389c, 1);
                            if ((-1 < iVar3)) {
                              FUN_00467750(iVar1, local_1c, 0x60);
                              iVar3 = FUN_0051d817(0);
                              if ((iVar3 === 0)) {
                                FUN_00467750(iVar1, local_1c, 1);
                              }
                              else {
                                FUN_00467825(iVar1, local_1c, 1);
                              }
                              iVar3 = FUN_0051d817(4);
                              if ((iVar3 === 0)) {
                                FUN_00467750(iVar1, local_1c, 0x200e);
                                iVar3 = FUN_0051d817(1);
                                if ((iVar3 !== 0)) {
                                  FUN_00467825(iVar1, local_1c, 2);
                                }
                                iVar3 = FUN_0051d817(2);
                                if ((iVar3 !== 0)) {
                                  FUN_00467825(iVar1, local_1c, 4);
                                }
                                iVar3 = FUN_0051d817(3);
                                if ((iVar3 !== 0)) {
                                  FUN_00467825(iVar1, local_1c, 8);
                                }
                              }
                              else {
                                FUN_00467825(iVar1, local_1c, 0x2000);
                              }
                              w32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0, (s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) & -0x91));
                              iVar3 = FUN_0051d817(5);
                              if ((iVar3 !== 0)) {
                                w32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0, (s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) | 0x10));
                              }
                              iVar3 = FUN_0051d817(6);
                              if ((iVar3 !== 0)) {
                                w32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0, (s32((DAT_0064c6c0 + (iVar1 * 0x594 + local_1c * 4)), 0) | 0x80));
                              }
                            }
                          }
                        }
                        if ((iVar3 !== 2));
                        if ((-1 < local_1c)) {
                          uVar2 = FUN_00493b10(local_1c);
                          FUN_0040ff60(1, uVar2);
                          FUN_00421da0(0, ((DAT_00655af8) << 16 >> 16));
                          iVar3 = FUN_00518ec0(s_LASTCONTACT_006338ac, ((s16((DAT_0064ca82 + (iVar1 * 0x594 + local_1c * 2)), 0)) << 16 >> 16), DAT_ffffffe0);
                          if ((iVar3 === 0)) {
                            w16((DAT_0064ca82 + (iVar1 * 0x594 + local_1c * 2)), 0, ((local_20) & 0xFFFF));
                          }
                        }
                      }
                      if ((iVar3 !== 3));
                      if ((-1 < local_1c)) {
                        uVar2 = FUN_00493b10(local_1c);
                        FUN_0040ff60(1, uVar2);
                        iVar3 = FUN_00518ec0(s_EDITATTITUDE_006338b8, _MEM[DAT_0064c6e0 + (iVar1 * 0x594 + local_1c)], DAT_ffffffe0);
                        if ((iVar3 === 0)) {
                          _MEM[DAT_0064c6e0 + (iVar1 * 0x594 + local_1c)] = ((local_20) & 0xFF);
                        }
                      }
                    }
                    if ((iVar3 !== 4));
                    if ((iVar3 === 0)) {
                      _MEM[DAT_0064c6be + iVar1 * 0x594] = ((local_20) & 0xFF);
                    }
                  }
                  if ((iVar3 !== 5));
                }
                if ((iVar3 !== 6)); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
                  for (/* cond: (local_1c < 8) */); local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
                    w16((DAT_0064ca82 + (local_14 * 2 + local_1c * 0x594)), 0, DAT_00655af8);
                  }
                }
              }
              if ((iVar3 !== 7));
            }
            if ((iVar3 !== 8));
            FUN_00421da0(0, uVar2);
            iVar3 = FUN_00518ec0(s_EDITPROGRESS_006338d4, ((s16((DAT_0064c6a8 + iVar1 * 0x594), 0)) << 16 >> 16), DAT_ffffffe0);
            if ((iVar3 === 0)) {
              w16((DAT_0064c6a8 + iVar1 * 0x594), 0, ((local_20) & 0xFFFF));
              FUN_0056a65e(1);
            }
          }
          if ((iVar3 !== 9));
        }
        if ((iVar3 !== 0xa));
        uVar2 = FUN_00493c7d(iVar1);
        FUN_0040bbe0(uVar2);
        FUN_0040ff60(0, DAT_00679640);
        if ((0xffff < s16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
          uVar2 = FUN_00428b0c(((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bcfa + iVar1 * 0xf2), uVar2);
          w16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        }
        if ((0xffff < s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
          uVar2 = FUN_00428b0c(((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd12 + iVar1 * 0xf2), uVar2);
          w16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        }
        if ((0xffff < s16((DAT_00655506 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
          uVar2 = FUN_00428b0c(((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd2a + iVar1 * 0xf2), uVar2);
          w16((DAT_00655506 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        }
        for (/* cond: (local_18 < 7) */); local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
          for (/* cond: (local_318 < 2) */); local_318 = (local_318 < 2); local_318 = (local_318 + 1)) {
            w16((DAT_0065550c + (local_18 * 4 + (((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30 + local_318 * 2))), 0, ((s32((DAT_00654fe0 + (local_318 * 4 + local_18 * 8)), 0)) & 0xFFFF));
          }
        }
        FUN_0040ff60(1, (DAT_0064bd12 + iVar1 * 0xf2));
        FUN_0040ff60(2, (DAT_0064bd2a + iVar1 * 0xf2));
        FUN_005a632a(DAT_006359d4, s_EDITKINGNAME_006338e4, 0x17, (DAT_0064bcfa + iVar1 * 0xf2), 0, 0, 0, 1);
        iVar3 = FUN_0040bc80(0);
        if ((-1 < iVar3)) {
          FUN_005f22d0((DAT_0064bcfa + iVar1 * 0xf2), DAT_0063cc48);
          FUN_005f22d0((DAT_0064bd12 + iVar1 * 0xf2), DAT_0063cd4c);
          FUN_005f22d0((DAT_0064bd2a + iVar1 * 0xf2), DAT_0063ce50);
        }
      }
      if ((iVar3 !== 0xb));
      if ((0 < local_1c)) {
        for (/* cond: (local_31c < 0xd) */); local_31c = (local_31c < 0xd); local_31c = (local_31c + 1)) {
          _MEM[DAT_0064c6f8 + (iVar1 * 0x594 + local_31c)] = _MEM[DAT_0064c6f8 + (local_1c * 0x594 + local_31c)]
          ;
        }
        _MEM[DAT_0064c6b0 + iVar1 * 0x594] = 0;
        for (/* cond: (local_31c < 0x64) */); local_31c = (local_31c < 0x64); local_31c = (local_31c + 1)) {
          iVar3 = FUN_004bd9f0(iVar1, local_31c);
          if ((iVar3 !== 0)) {
            _MEM[DAT_0064c6b0 + iVar1 * 0x594] = (_MEM[DAT_0064c6b0 + iVar1 * 0x594] + 1);
          }
        }
      }
    }
    if ((iVar3 !== 0xc));
    if (((s16((DAT_0064c6a0 + iVar1 * 0x594), 0) & 0x200) === 0)) {
      _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] = 0;
    }
    else {
      _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] = 1;
    }
    _MEM[DAT_0064ca92 + iVar1 * 0x594] = _MEM[DAT_0064c6a6 + iVar1 * 0x594];
    if ((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + iVar1 * 0x594), 0)) << 16 >> 16) * 0x30] !== 0)) {
      _MEM[DAT_0064ca92 + iVar1 * 0x594] = (_MEM[DAT_0064ca92 + iVar1 * 0x594] + 0x15);
    }
  }
  local_8 = -1;
  FUN_00557e08();
  FUN_00557e1e();
  return;
}


 export function FUN_00557e08 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00557e1e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00557e2c ()

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let local_31c;
  let local_314;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00558183;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  while ((iVar1 < 1)) {
    local_18 = 0;
    local_14 = 0;
    for (/* cond: (local_314 < ((DAT_00655b18) << 16 >> 16)) */); local_314 = (local_314 < ((DAT_00655b18) << 16 >> 16)); local_314 = (local_314 + 1)) {
      if ((s32((DAT_0064f394 + local_314 * 0x58), 0) !== 0)) {
        iVar1 = FUN_0043cef9(local_314);
        local_18 = (local_18 + iVar1);
        if ((s8(_MEM[DAT_0064f348 + local_314 * 0x58]) === ((DAT_0064bcba) << 16 >> 16))) {
          iVar1 = FUN_0043cef9(local_314);
          local_14 = (local_14 + iVar1);
        }
      }
    }
    FUN_0040bbb0();
    FUN_0040ff30(local_18);
    FUN_0040bbe0(DAT_006338f4);
    FUN_0040ff30(local_14);
    FUN_0040bbe0(DAT_006338f8);
    FUN_0040ff60(1, DAT_00679640);
    uVar2 = FUN_00493c7d(((DAT_0064bcba) << 16 >> 16));
    FUN_0040ff60(0, uVar2);
    FUN_00421da0(0, ((((DAT_0064bc60) << 16 >> 16) & 2) >>> 1));
    FUN_00421da0(1, ((((DAT_0064bc60) << 16 >> 16) & 4) >>> 2));
    FUN_00421da0(2, ((DAT_0064bcbc) << 16 >> 16));
    FUN_00421da0(3, ((DAT_0064bcbe) << 16 >> 16));
    FUN_00421da0(4, ((DAT_0064bcc0) << 16 >> 16));
    FUN_00421da0(5, ((DAT_0064bcc2) << 16 >> 16));
    iVar1 = FUN_00421ea0(s_EDITVICTORY_006338fc);
    if ((iVar1 < 1)) {
      wv(DAT_0064bc60, (DAT_0064bc60 ^ 2));
    }
    else if ((iVar1 === 2)) {
      wv(DAT_0064bc60, (DAT_0064bc60 ^ 4));
    }
    else if ((iVar1 === 3)) {
      FUN_0040bc40(1);
      uVar5 = 0;
      uVar4 = 0;
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x38), 0), 0, 0);
      FUN_0059edf0(uVar2, uVar4, uVar5);
      for (/* cond: (local_31c < 8) */); local_31c = (local_31c < 8); local_31c = (local_31c + 1)) {
        uVar4 = 0;
        iVar1 = local_31c;
        uVar2 = FUN_00493c7d(local_31c, local_31c, 0);
        FUN_0059edf0(uVar2, iVar1, uVar4);
      }
      iVar1 = FUN_0040bc80(0);
      if ((-1 < iVar1)) {
        wv(DAT_0064bcba, ((iVar1) & 0xFFFF));
      }
    }
    else {
      if ((7 < iVar1)) {
        local_8 = -1;
        FUN_00558177();
        FUN_0055818d();
        return;
      }
      iVar3 = FUN_00518ec0(s_EDITVICTORYOBJ_00633908, ((s16(DAT_0064bcb4, iVar1)) << 16 >> 16), DAT_ffffffe4);
      if ((iVar3 === 0)) {
        w16(DAT_0064bcb4, iVar1, ((local_1c) & 0xFFFF));
      }
    }
  }
  local_8 = -1;
  FUN_00558177();
  FUN_0055818d();
  return;
}


 export function FUN_00558177 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0055818d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0055819b ()

 {
  let iVar1;

  while ((iVar1 !== 4)) {
    while ((iVar1 !== 3)) {
      while ((iVar1 !== 2)) {
        while ((iVar1 !== 1)) {
          FUN_00421da0(0, ((((DAT_0064bc60) << 16 >> 16) & 0x10) >>> 4));
          FUN_00421da0(1, ((((DAT_0064bc60) << 16 >> 16) & 0x20) >>> 5));
          FUN_00421da0(2, ((((DAT_0064bc60) << 16 >> 16) & 0x40) >>> 6));
          FUN_00421da0(3, ((((DAT_0064bc60) << 16 >> 16) & 0x8000) >>> 0xf));
          iVar1 = FUN_00421ea0(s_EDITRULES_00633918);
          if ((iVar1 === 0)) {
            return;
          }
          if ((iVar1 !== 1));
        }
        if ((iVar1 !== 2));
      }
      if ((iVar1 !== 3));
    }
    if ((iVar1 !== 4));
  }
  return;
}


 export function FUN_005582ad ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_140;
  let local_13c;
  let local_138;
  let local_34;
  let aiStack_30;
  let local_10;
  let local_c;
  let local_8;

  while ((iVar2 === 0)) {
    wv(DAT_00655afa, FUN_00484fec(((DAT_00655af8) << 16 >> 16)));
    FUN_0056a65e(1);
    FUN_00509429();
    FUN_00421da0(0, ((DAT_0064bcb2) << 16 >> 16));
    FUN_00421da0(1, ((DAT_0064bcb4) << 16 >> 16));
    FUN_00421da0(2, ((DAT_0064bcb6) << 16 >> 16));
    FUN_00421da0(3, ((DAT_0064bcb8) << 16 >> 16));
    FUN_00421da0(4, (DAT_0064bc60 & 1));
    if (((DAT_00655af0 & 0x80) === 0)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x68c), 0));
      FUN_0040ff60(0, uVar1);
    }
    else {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x688), 0));
      FUN_0040ff60(0, uVar1);
    }
    FUN_0040ff60(1, DAT_0064bc62);
    iVar2 = FUN_00421ea0(s_EDITSCEN_00633924);
    if ((iVar2 === 0)) {
      iVar2 = FUN_00518ec0(s_EDITPARADIGM_00633930, ((DAT_0064bcb2) << 16 >> 16), DAT_fffffff4);
      if ((iVar2 === 0)) {
        wv(DAT_0064bcb2, ((local_c) & 0xFFFF));
      }
    }
    else if ((iVar2 === 2)) {
      iVar2 = FUN_00518ec0(s_EDITINCREMENT_00633940, ((DAT_0064bcb4) << 16 >> 16), DAT_fffffff4);
      if ((iVar2 === 0)) {
        wv(DAT_0064bcb4, ((local_c) & 0xFFFF));
      }
    }
    else if ((iVar2 === 3)) {
      iVar2 = FUN_00518ec0(s_EDITSTARTYEAR_00633950, ((DAT_0064bcb6) << 16 >> 16), DAT_fffffff4);
      if ((iVar2 === 0)) {
        wv(DAT_0064bcb6, ((local_c) & 0xFFFF));
      }
    }
    else if ((iVar2 === 4)) {
      iVar2 = FUN_00518ec0(s_EDITMAXTURNS_00633960, ((DAT_0064bcb8) << 16 >> 16), DAT_fffffff4);
      if ((iVar2 === 0)) {
        wv(DAT_0064bcb8, ((local_c) & 0xFFFF));
      }
    }
    else if ((iVar2 === 5)) {
      local_10 = DAT_00636598;
      for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
        if (((_MEM[(local_10 + 5)] & 0xf0) === 0xf0)) {
          _MEM[(local_10 + 5)] = (_MEM[(local_10 + 5)] & 0xf);
        }
        local_10 = (local_10 + 6);
      }
      FUN_0047cf9e(DAT_006d1da0, 1);
    }
    else if ((iVar2 === 6)) {
      local_10 = DAT_00636598;
      for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
        if (((_MEM[(local_10 + 1)] & 3) === 0)) {
          _MEM[(local_10 + 5)] = (_MEM[(local_10 + 5)] | 0xf0);
        }
        local_10 = (local_10 + 6);
      }
      FUN_0047cf9e(DAT_006d1da0, 1);
    }
    else if ((iVar2 === 7)) {
      local_34 = FUN_005b8931(0, 0);
      for (/* cond: (local_140 < 8) */); local_140 = (local_140 < 8); local_140 = (local_140 + 1)) {
        iVar2 = FUN_005b898b(0, 0, local_140);
        w32(DAT_ffffffd0, local_140, iVar2);
      }
      for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
        _MEM[(local_34 + 4)] = 0xff;
        for (/* cond: (local_140 < 8) */); local_140 = (local_140 < 8); local_140 = (local_140 + 1)) {
          _MEM[s32(DAT_ffffffd0, local_140)] = _MEM[(local_34 + 1)];
          w32(DAT_ffffffd0, local_140, (s32(DAT_ffffffd0, local_140) + 1));
        }
        local_34 = (local_34 + 6);
      }
      for (/* cond: (local_13c < ((DAT_00655b18) << 16 >> 16)) */); local_13c = (local_13c < ((DAT_00655b18) << 16 >> 16)); local_13c = (local_13c + 1)) {
        if ((s32((DAT_0064f394 + local_13c * 0x58), 0) !== 0)) {
          _MEM[DAT_0064f34c + local_13c * 0x58] = 0xff;
          for (/* cond: (local_140 < 8) */); local_140 = (local_140 < 8); local_140 = (local_140 + 1)) {
            _MEM[DAT_0064f34d + (local_13c * 0x58 + local_140)] = _MEM[DAT_0064f349 + local_13c * 0x58];
          }
          iVar2 = FUN_005b8931(((s16((DAT_0064f340 + local_13c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_13c * 0x58), 0)) << 16 >> 16));
          _MEM[(iVar2 + 4)] = 0xff;
        }
      }
      wv(DAT_0064bc60, (DAT_0064bc60 | 8));
      FUN_0047cf9e(DAT_006d1da0, 1);
    }
    else if ((iVar2 === 8)) {
      local_34 = FUN_005b8931(0, 0);
      for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
        _MEM[(local_34 + 4)] = 0;
        if ((uVar3 < 8)) {
          local_140 = ((uVar3) & 0xFF);
          _MEM[(local_34 + 4)] = (((1 << ((uVar3) & 0xFF))) & 0xFF);
        }
        local_34 = (local_34 + 6);
      }
      wv(DAT_0064bc60, (DAT_0064bc60 & 0xfff7));
      FUN_0047cf9e(DAT_006d1da0, 1);
    }
    else if ((iVar2 === 9)) {
      iVar2 = FUN_00421ed0(s_SCENNAME_00633970, 0x18, DAT_0064bc62, DAT_fffffec8);
      if ((iVar2 === 0)) {
        FUN_005f22d0(DAT_0064bc62, DAT_fffffec8);
      }
    }
    else if ((iVar2 === 0xa)) {
      wv(DAT_0064bc60, (DAT_0064bc60 ^ 1));
    }
    else if ((iVar2 === 0xb)) {
      FUN_00557e2c();
    }
    else {
      if ((iVar2 !== 0xc)) {
        return;
      }
      FUN_0055819b();
    }
  }
  return;
}


 export function FUN_0055891d ()

 {
  FUN_0047758c(1);
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
  FUN_00559c3a();
  FUN_00559c54();
  return;
}


 export function FUN_00559c3a ()

 {
  FUN_00559e3c();
  return;
}


 export function FUN_00559c54 ()

 {
  _atexit(FUN_00559c71);
  return;
}


 export function FUN_00559c71 ()

 {
  wv(DAT_006ab1b8, DAT_006ab1b8);
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
  FUN_00559ca5();
  FUN_00559cbf();
  return;
}


 export function FUN_00559ca5 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00559cbf ()

 {
  _atexit(FUN_00559cdc);
  return;
}


 export function FUN_00559cdc ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00559cf6 (param_1, param_2)

 {
  let unaff_FS_OFFSET;
  let local_48c;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00559dd5;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_00407ff0();
  FUN_005bf5e1((DAT_006ab498 + 0x384), 0xa, 0xc0, DAT_fffffbbc);
  FUN_00407ff0();
  FUN_005bd65c(param_1, param_2);
  FUN_0055a930(DAT_fffffb74, DAT_006ab4b8, 0, 0, param_1, param_2);
  FUN_004083f0();
  local_8 = (((local_8) >> 8) << 8);
  FUN_00559dbd();
  local_8 = -1;
  FUN_00559dc9();
  FUN_00559ddf();
  return;
}


 export function FUN_00559dbd ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00559dc9 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00559ddf (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00559ded (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2dc), 0, 0x64);
  w32((in_ECX + 0x2d8), 0, s32((in_ECX + 0x2dc), 0));
  w32((in_ECX + 0x2e0), 0, 1);
  w32((in_ECX + 0x2e4), 0, 0);
  return;
}


 export function FUN_00559e3c (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00559ebb;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_004502b0();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  w32(in_ECX, 0, PTR_FUN_0061d6e0);
  FUN_00559ded();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* __thiscall */
 /* CMiniFrameWnd::~CMiniFrameWnd(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CMiniFrameWnd (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00559f48;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(this, 0, PTR_FUN_0061d6e0);
  local_8 = 1;
  local_8 = 0;
  FUN_00559ded();
  local_8 = (0 << 8);
  FUN_00559f30();
  local_8 = -1;
  FUN_00559f3f();
  FUN_00559f52();
  return;
}


 export function FUN_00559f30 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00559f3f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00559f52 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00559f60 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_00407fc0(param_1);
  uVar1 = FUN_00407f90(param_1, uVar1);
  FUN_005a9afe(DAT_006ab4b8, in_ECX, (s32(param_1, 0) - s32((in_ECX + 0x124), 0)), (s32(param_1, 1) - s32((in_ECX + 0x128), 0)), s32(param_1, 0), s32(param_1, 1), uVar1);
  return;
}


 export function FUN_00559fcf (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005a9780();
  FUN_005baeb0(in_ECX);
  FUN_00559f60(param_1);
  return;
}


 export function FUN_0055a00b (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  // in_ECX promoted to parameter;

  FUN_004086c0(param_1, (s32((in_ECX + 0x124), 0) + param_2), (s32((in_ECX + 0x128), 0) + param_3), param_4, param_5);
  return;
}


 export function FUN_0055a051 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00552ed2();
  FUN_00559cf6(s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
  FUN_0055a00b((in_ECX + 0x2e8), 0, 0, s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
  FUN_005a9780(in_ECX);
  FUN_00552112();
  FUN_00559fcf((in_ECX + 0x2e8));
  FUN_00408460();
  return;
}


 export function FUN_0055a0e1 ()

 {
  FUN_004503d0();
  FUN_00451900();
  FUN_00484d52();
  return 0;
}


 export function FUN_0055a10d (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_004086c0(param_1, param_2, param_3, ((param_4 + 0x10) + DAT_006335a0), ((param_5 + 0x10) + DAT_006335a4));
  return;
}


 export function FUN_0055a15e ()

 {
  FUN_0055a051();
  return;
}


 export function FUN_0055a178 ()

 {
  FUN_0055a051();
  return;
}


 export function FUN_0055a192 (param_1, param_2)

 {
  let iVar1;

  /* switch */ () {
  case 0 :
  case 5 :
    param_1 = 0;
    break;
  case 1 :
    param_1 = ((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1);
    break;
  case 2 :
    iVar1 = FUN_004080c0();
    param_1 = ((iVar1 - (param_2 + 0x10)) / 2 | 0);
    break;
  case 3 :
    iVar1 = FUN_004080c0();
    param_1 = (((iVar1 - (param_2 + 0x10)) - (((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3)) + -1);
    break;
  case 4 :
    param_1 = FUN_004080c0();
    param_1 = (param_1 - (param_2 + 0x10));
    if ((param_1 < 0)) {
      param_1 = 0;
    }
    break;
  case 6 :
    param_1 = ((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1);
    break;
  case 7 :
    iVar1 = FUN_00414bb0();
    param_1 = ((iVar1 - (param_2 + 0x10)) / 2 | 0);
    break;
  case 8 :
    iVar1 = FUN_00414bb0();
    param_1 = (((iVar1 - (param_2 + 0x10)) - (((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3)) + -1);
    break;
  case 9 :
    param_1 = FUN_00414bb0();
    param_1 = (param_1 - (param_2 + 0x10));
    if ((param_1 < 0)) {
      param_1 = 0;
    }
  }
  return param_1;
}


 export function FUN_0055a329 (param_1, param_2)

 {
  let uVar1;

  /* switch */ () {
  case 1 :
    if ((param_1 === 0)) {
      uVar1 = 0x178;
    }
    else {
      uVar1 = 0xe3;
    }
    break;
  case 2 :
  case 3 :
  case 4 :
  case 5 :
    if ((param_1 === 0)) {
      uVar1 = 0x247;
    }
    else {
      uVar1 = 0x101;
    }
    break;
  case 6 :
  case 7 :
  case 8 :
  case 9 :
    if ((param_1 === 0)) {
      uVar1 = 0x248;
    }
    else {
      uVar1 = 0x102;
    }
    break;
  case 10 :
  case 0xb :
  case 0xc :
  case 0xd :
    if ((param_1 === 0)) {
      uVar1 = 0x196;
    }
    else {
      uVar1 = 0x102;
    }
    break;
  default :
    uVar1 = 0x64;
  }
  return uVar1;
}


 export function FUN_0055a41d (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let uVar5;
  let local_14;
  let local_10;

  if ((s32((in_ECX + 0x2e4), 0) !== 0)) {
    w32((in_ECX + 0x2e0), 0, param_3);
    uVar1 = FUN_0055a329(0, s32((in_ECX + 0x2e0), 0));
    w32((in_ECX + 0x2d8), 0, uVar1);
    uVar1 = FUN_0055a329(1, s32((in_ECX + 0x2e0), 0));
    w32((in_ECX + 0x2dc), 0, uVar1);
    uVar1 = FUN_0055a192(param_1, s32((in_ECX + 0x2d8), 0));
    uVar2 = FUN_0055a192(param_2, s32((in_ECX + 0x2dc), 0));
    FUN_0055a10d(DAT_ffffffec, uVar1, uVar2, s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
    uVar5 = 8;
    uVar2 = 8;
    uVar1 = 0;
    iVar3 = FUN_00407fc0(DAT_ffffffec, 0, 8, 8);
    iVar3 = (iVar3 - DAT_006335a4);
    iVar4 = FUN_00407f90(DAT_ffffffec, iVar3);
    FUN_005534bc(0, 2, local_14, local_10, (iVar4 - DAT_006335a0), iVar3, uVar1, uVar2, uVar5);
    FUN_00408230(LAB_00401005);
    in_ECX = EnableStackedTabs(in_ECX, 0x403544);
    FUN_004082b0(LAB_00403b0c);
    FUN_005bb574();
    FUN_004085f0();
  }
  return;
}


 export function FUN_0055a567 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2e4), 0) !== 0)) {
    FUN_004083b0();
    FUN_004083f0();
    FUN_00484d52();
  }
  return;
}


 export function FUN_0055a5a4 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2e4), 0) !== 0)) {
    FUN_004083b0();
    FUN_004083f0();
    FUN_0055a64a();
  }
  return;
}


 export function FUN_0055a5e4 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_84;

  FUN_005f22d0(DAT_ffffff7c, s_civ2\intro.dll_00633a2c);
  iVar1 = FUN_00564713(DAT_ffffff7c);
  if ((iVar1 !== 0)) {
    FUN_004502e0(DAT_ffffff7c);
    w32((in_ECX + 0x2e4), 0, 1);
  }
  return;
}


 export function FUN_0055a64a (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2e4), 0) !== 0)) {
    FUN_00450340();
    w32((in_ECX + 0x2e4), 0, 0);
  }
  return;
}


 export function FUN_0055a930 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005a9afe(param_1, param_2, param_3, param_4, param_3, param_4, param_5, param_6);
  return;
}


 export function FUN_0055a980 ()

 {
  let iVar1;
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

  wv(DAT_0062d040, 1);
  for (/* cond: (local_3c < 2) */); local_3c = (local_3c < 2); local_3c = (local_3c + 1)) {
    if ((local_3c === 0)) {
      local_8 = DAT_006365e0;
    }
    else {
      local_8 = DAT_006365e4;
    }
    local_2c = u8((!(local_3c === 0)));
    _memset(local_8, 0, ((DAT_006d116a) << 16 >> 16) * ((DAT_006d116c) << 16 >> 16));
    for (/* cond: (local_34 < ((DAT_006d116a) << 16 >> 16)) */); local_34 = (local_34 < ((DAT_006d116a) << 16 >> 16)); local_34 = (local_34 + 1)) {
      for (/* cond: (local_20 < ((DAT_006d116c) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_006d116c) << 16 >> 16)); local_20 = (local_20 + 1)) {
        local_1c = (local_34 * 4 + 1);
        local_24 = (local_20 * 4 + 1);
        local_18 = FUN_0055ac37(local_1c, local_24, DAT_ffffffd8, DAT_ffffffd0, local_2c);
        if ((-1 < local_18)) {
          for (/* cond: (local_44 < 4) */); local_44 = (local_44 < 4); local_44 = (local_44 + 1)) {
            local_10 = FUN_005ae052((s8(_MEM[DAT_006283d0 + local_44]) * 4 + local_1c));
            local_14 = (s8(_MEM[DAT_006283e0 + local_44]) * 4 + local_24);
            iVar1 = FUN_004087c0(local_10, local_14);
            if ((local_38 < 5)) {
              _MEM[((((DAT_006d116a) << 16 >> 16) * local_20 + local_34) + local_8)] = (_MEM[((((DAT_006d116a) << 16 >> 16) * local_20 + local_34) + local_8)] | (((1 << (((local_44) & 0xFF) & 0x1f))) & 0xFF));
              local_10 = FUN_005ae0b0((s8(_MEM[DAT_006283d0 + local_44]) + local_34));
              local_14 = (s8(_MEM[DAT_006283e0 + local_44]) + local_20);
              if ((local_14 < ((DAT_006d116c) << 16 >> 16))) {
                _MEM[((((DAT_006d116a) << 16 >> 16) * local_14 + local_10) + local_8)] = (_MEM[((((DAT_006d116a) << 16 >> 16) * local_14 + local_10) + local_8)] | (((1 << ((((local_44) & 0xFF) - 4) & 7))) & 0xFF));
              }
            }
          }
        }
      }
      FUN_0040894c();
    }
  }
  wv(DAT_0062d040, 0);
  return;
}


 export function FUN_0055ac37 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_8;

  local_8 = 0;
  while ((iVar3 === param_5)) {
    if ((1 < local_8)) {
      return -1;
    }
    uVar1 = FUN_005ae052((param_1 + local_8));
    iVar2 = (param_2 + local_8);
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((iVar3 === param_5));
  }
  uVar4 = FUN_005b8a81(uVar1, iVar2);
  w32(param_3, 0, uVar1);
  w32(param_4, 0, iVar2);
  return uVar4;
}


 export function FUN_0055add0 (param_1, param_2)

 {
  let DVar1;
  let iVar2;
  let hWnd;

  FUN_006e7afc(0, 1, s_Civilization_II_Once_Only_00633a40);
  DVar1 = FUN_006e7b00();
  if ((DVar1 === 0xb7)) {
    hWnd = FUN_006e7d70(s_MSWindowClass_00633a5c, 0);
    if ((hWnd !== 0)) {
      FUN_006e7da0(hWnd);
    }
  }
  else {
    iVar2 = FUN_005dbb20(param_1, param_2);
    if ((iVar2 !== 0)) {
      FUN_004c4280();
      FUN_005dbb4f();
    }
  }
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055ae80 (param_1)

 {
  if ((DAT_006ad578 === DAT_006d1da0)) {
    FUN_0050994f();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  if ((DAT_00633a74 !== 0)) {
    FUN_005d2004(DAT_00633a74);
    wv(DAT_00633a74, 0);
    FUN_0056ac67(0x64, -1);
    if ((DAT_0064b9bc !== 0)) {
      FUN_0046b14d(0x6e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055af2e (param_1)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006ad578 === DAT_006d1da0)) {
    FUN_0050994f();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  wv(DAT_00633a78, (DAT_00654b70 / 0x3e8 | 0));
  wv(DAT_006ab5ac, 0);
  _DAT_0066c990 = -1;
  FUN_00552112();
  local_14 = DAT_0066ca54;
  local_10 = DAT_0066ca58;
  local_c = DAT_0066ca5c;
  local_8 = DAT_0066ca68;
  FUN_00408490(DAT_ffffffec);
  if ((DAT_00633a74 !== 0)) {
    FUN_005d2004(DAT_00633a74);
  }
  wv(DAT_00633a74, FUN_005d1f50(LAB_00402220, 0x1f4, 1));
  _DAT_00633a7c = FUN_00421bb0();
  if ((2 < DAT_00655b02)) {
    FUN_0046b14d(0x6d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055b046 (param_1)

 {
  FUN_0050994f();
  FUN_00437c6f();
  FUN_0044f799();
  FUN_004f8d51();
  if ((DAT_0066c988 !== 0)) {
    if ((DAT_00633a74 !== 0)) {
      FUN_005d2004(DAT_00633a74);
    }
    wv(DAT_00633a74, FUN_005d1f50(LAB_00402220, 0x1f4, 1));
    _DAT_00633a7c = FUN_00421bb0();
    if ((2 < DAT_00655b02)) {
      FUN_0046b14d(0x6f, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055b0fb ()

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_00654b70 !== 0)) {
    wv(DAT_006ab5ac, (DAT_006ab5ac ^ 1));
    if (((DAT_006ab5ac ^ 1) !== 0)) {
      if ((DAT_00633a78 !== 0)) {
        FUN_00421bb0();
        iVar1 = __ftol();
        wv(DAT_00633a78, (DAT_00633a78 - iVar1));
        if (((DAT_00633a78 - iVar1) < 0)) {
          wv(DAT_00633a78, 0);
        }
        _DAT_00633a7c = FUN_00421bb0();
      }
      if ((DAT_00633a78 === 0)) {
        FUN_0050994f();
        FUN_00437c6f();
        FUN_0044f799();
        FUN_004f8d51();
        wv(DAT_0064b9bc, 0);
        FUN_0056ac67(0x64, -1);
        return;
      }
      FUN_00552112();
      local_14 = DAT_0066ca54;
      local_10 = DAT_0066ca58;
      local_c = DAT_0066ca5c;
      local_8 = DAT_0066ca68;
      FUN_00408490(DAT_ffffffec);
    }
    iVar1 = (DAT_00633a78 * 0x186a0 / DAT_00654b70 | 0);
    if ((iVar1 < 0x21)) {
      local_18 = 0x6a;
    }
    else if ((iVar1 < 0x42)) {
      local_18 = 0x7a;
    }
    else {
      local_18 = 0x2a;
    }
    if ((DAT_006ab5ac !== 0)) {
      local_18 = -1;
    }
    FUN_0056ac67(iVar1, local_18);
    if ((DAT_00633a74 !== 0)) {
      FUN_005d2004(DAT_00633a74);
    }
    wv(DAT_00633a74, FUN_005d1f50(LAB_00402220, 0x1f4, 1));
  }
  return;
}


 export function FUN_0055b2c6 ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0055ae80(1);
  FUN_006e7d64(0x1b);
  iVar1 = FUN_0051ea8e(1);
  if ((iVar1 === 0)) {
    if ((DAT_00654b70 === 0)) {
      wv(DAT_0066c988, 0);
      FUN_00552112();
      local_14 = DAT_0066ca54;
      local_10 = DAT_0066ca58;
      local_c = DAT_0066ca5c;
      local_8 = DAT_0066ca68;
      FUN_00408490(DAT_ffffffec);
    }
    else {
      wv(DAT_0066c988, 1);
      FUN_0055af2e(1);
    }
    if ((2 < DAT_00655b02)) {
      FUN_0046b14d(0x6c, 0xff, DAT_00654b70, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  else {
    FUN_0055b046(1);
  }
  if ((DAT_00654fa8 !== 0)) {
    wv(DAT_0064b9bc, 0);
  }
  return;
}


 export function FUN_0055b3c8 ()

 {
  if ((DAT_00633a80 !== 0)) {
    FUN_005d2004(DAT_00633a80);
    wv(DAT_00633a80, 0);
  }
  return;
}


 export function FUN_0055b3fd ()

 {
  if ((2 < DAT_00655b02)) {
    if ((DAT_00633a80 !== 0)) {
      FUN_005d2004(DAT_00633a80);
    }
    wv(DAT_00633a80, FUN_005d1f50(thunk_FUN_0055b5fa, 0x1f4, 1));
  }
  return;
}


 export function FUN_0055b451 ()

 {
  if ((DAT_00633a84 !== 0)) {
    FUN_0055b5fa(0, 0);
  }
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055b47e ()

 {
  FUN_005d225b(s_ENTER_WINDOW_DRAG_00633a94);
  wv(DAT_00633a84, 1);
  wv(DAT_00633a88, FUN_00421bb0());
  _DAT_00633a8c = 0;
  wv(DAT_00633a90, FUN_005c62ee());
  if ((DAT_006ad2f7 !== 0)) {
    FUN_0046b14d(0x5d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  wv(DAT_006ab5b4, FUN_006e7d74(7, LAB_00402856, DAT_006e4ff0, 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055b515 ()

 {
  FUN_005d225b(s_EXIT_WINDOW_DRAG_00633aa8);
  wv(DAT_00633a84, 0);
  wv(DAT_00633a88, 0);
  _DAT_00633a8c = 0;
  wv(DAT_00633a90, 0);
  FUN_006e7d78(DAT_006ab5b4);
  if ((DAT_006ad2f7 !== 0)) {
    FUN_0046b14d(0x5e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  return;
}


 export function FUN_0055b59e ()

 {
  let iVar1;
  let Msg;
  let wParam;
  let lParam;

  if ((DAT_00633a84 !== 0)) {
    if ((DAT_00633a90 !== 0)) {
      lParam = 0;
      wParam = 0;
      Msg = 0x202;
      iVar1 = FUN_00414d10();
      FUN_006e7d7c(s32((iVar1 + 4), 0), Msg, wParam, lParam);
      FUN_00414d40();
    }
    wv(DAT_00633a84, 0);
  }
  return;
}


 export function FUN_0055b5fa ()

 {
  let iVar1;

  if ((DAT_006ad685 === 0)) {
    FUN_0055b59e();
  }
  FUN_0055b3fd();
  return;
}


 export function FUN_0055b677 ()

 {
  let iVar1;

  if ((DAT_00633a84 !== 0)) {
    iVar1 = FUN_00421bb0();
    if (((DAT_00633a88 + 0x7c) < iVar1)) {
      w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
      wv(DAT_006ad678, s32(DAT_006ad678, 0));
    }
  }
  return;
}


 export function FUN_0055b6c7 ()

 {
  let uVar1;

  if ((DAT_006ad698 === 0)) {
    if ((DAT_00655b02 === 0)) {
      FUN_0046e6a9();
      FUN_00484d3b();
    }
    else {
      if ((2 < DAT_00655b02)) {
        if ((DAT_00633a74 !== 0)) {
          FUN_005d2004(DAT_00633a74);
          wv(DAT_00633a74, 0);
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar1 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar1);
        uVar1 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(1, uVar1);
        uVar1 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(2, uVar1);
        uVar1 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(3, uVar1);
        if ((DAT_00654c76 === 0)) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        }
        else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      wv(DAT_00628054, 0);
      FUN_0041033a();
      if ((((~(1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & u8(DAT_00655b0b)) === 0)) {
        wv(DAT_00655b0b, (DAT_00655b0b & (~(((1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & 0xFF))));
        if ((2 < DAT_00655b02)) {
          FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      }
      else {
        FUN_004e1763(DAT_006d1da0, 0, 0);
      }
      FUN_00484d3b();
      wv(DAT_0064b9bc, 0);
      wv(DAT_006ad685, 1);
      FUN_0055ae80(0);
      if ((DAT_006ad2f7 === 0)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0xa2, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
      }
      else {
        FUN_004824e3();
      }
    }
  }
  return;
}


 export function FUN_0055bbc0 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  wv(DAT_006ab5e4, -1);
  wv(DAT_00633ac8, 0);
  wv(DAT_006ab5e0, 0);
  wv(DAT_006ab5e8, 0);
  wv(DAT_006ab5ec, 0);
  if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 8) === 0)) {
    for (/* cond: (local_18 < ((DAT_00655b18) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_00655b18) << 16 >> 16)); local_18 = (local_18 + 1)) {
      if ((s8(_MEM[DAT_0064f348 + local_18 * 0x58]) === param_1)) {
        local_1c = 0;
        local_8 = 0;
 LAB_0055bc9b: :
        if ((local_8 < 0x14)) {
          uVar1 = FUN_005ae052((((s16((DAT_0064f340 + local_18 * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_00628370 + local_8])));
          iVar2 = (((s16((DAT_0064f342 + local_18 * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_006283a0 + local_8]));
          iVar3 = FUN_004087c0(uVar1, iVar2);
          if ((iVar3 !== param_2));
          for (/* cond: (-1 < local_20) */); -1 = (-1 < local_20);
              local_20 = FUN_005b2c82(local_20)) {
            if (((s16((DAT_006560f4 + local_20 * 0x20), 0) & 4) === 0)) {
              if ((local_18 !== DAT_006ab5e4)) {
                wv(DAT_00633ac8, (DAT_00633ac8 + 1));
              }
              wv(DAT_006ab5e4, local_18);
              if (((s16((DAT_006560f4 + local_20 * 0x20), 0) & 0x20) === 0)) {
                w16((DAT_006560f4 + local_20 * 0x20), 0, (s16((DAT_006560f4 + local_20 * 0x20), 0) | 0x20));
              }
              else {
                wv(DAT_006ab5ec, (DAT_006ab5ec + 1));
              }
              w16((DAT_006560f4 + local_20 * 0x20), 0, (s16((DAT_006560f4 + local_20 * 0x20), 0) | 4));
              iVar2 = DAT_006ab5e8;
              local_1c = (local_1c + 1);
              wv(DAT_006ab5e0, (DAT_006ab5e0 + 1));
              wv(DAT_006ab5e8, (DAT_006ab5e8 + 1));
              if (((uVar4 & 0x10) !== 0)) {
                wv(DAT_006ab5e8, (iVar2 + 2));
              }
              if (((uVar4 & 0x20) !== 0)) {
                wv(DAT_006ab5e8, (DAT_006ab5e8 + 1));
              }
              if (((uVar4 & 8) !== 0)) {
                wv(DAT_006ab5e8, (DAT_006ab5e8 + 1));
              }
              if (((uVar4 & 4) !== 0)) {
                wv(DAT_006ab5e8, (DAT_006ab5e8 + 1));
              }
              if (((uVar4 & 0x40) !== 0)) {
                wv(DAT_006ab5e8, (DAT_006ab5e8 + 2));
              }
            }
          }
        }
        if ((3 < local_1c)) {
          wv(DAT_006ab5ec, (DAT_006ab5ec + 1));
        }
      }
    }
  }
  else {
    wv(DAT_006ab5e8, 0);
  }
  return DAT_006ab5e8;
 LAB_0055bc98: :
  local_8 = (local_8 + 1);
  goto LAB_0055bc9b;
}


 export function FUN_0055bef9 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let local_8;

  if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] < 5)) {
    uVar1 = 0;
  }
  else if (((DAT_0064bc60 & 1) === 0)) {
    local_8 = 0;
    if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x10) !== 0)) {
      local_8 = 0x19;
    }
    iVar2 = FUN_00453e51(param_1, 0x18);
    if ((iVar2 !== 0)) {
      local_8 = 0x32;
    }
    iVar2 = FUN_005adfa0((local_8 + u8(_MEM[DAT_0064c6be + param_2 * 0x594]) * 0xf), 0, 0x4b);
    if ((u8(_MEM[DAT_0064c6b6 + param_1 * 0x594]) < iVar2)) {
      uVar1 = 0;
    }
    else if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] < 6)) {
      if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 4) === 0)) {
        uVar1 = 0;
      }
      else {
        uVar1 = 1;
      }
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_0055c066 (param_1, param_2)

 {
  let cVar1;
  let local_c;
  let local_8;

  cVar1 = _MEM[DAT_0064c6b5 + param_1 * 0x594];
  _MEM[DAT_0064c6b5 + param_1 * 0x594] = ((param_2) & 0xFF);
  if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] !== cVar1)) {
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
        w32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0) & -17));
      }
    }
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      wv(DAT_00655aee, (DAT_00655aee & 0xfffb));
      for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
        if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] !== 4)) {
          _MEM[DAT_0064f379 + local_c * 0x58] = 0xb;
        }
      }
    }
  }
  if ((DAT_00654fa8 === 0)) {
    FUN_0040ddc6(param_1);
  }
  return;
}


 export function FUN_0055c277 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = 1;
  iVar1 = FUN_00453e51(param_1, 0x13);
  /* switch */ () {
  case 2 :
    iVar2 = FUN_004bd9f0(param_1, 0x36);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    break;
  case 3 :
    iVar2 = FUN_004bd9f0(param_1, 0xf);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    break;
  case 4 :
    iVar2 = FUN_004bd9f0(param_1, 0x1f);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    if ((DAT_00627879 === 0)) {
      local_8 = 0;
    }
    break;
  case 5 :
    iVar2 = FUN_004bd9f0(param_1, 0x47);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    break;
  case 6 :
    iVar2 = FUN_004bd9f0(param_1, 0x15);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_0055c3d3 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0055c685;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    local_8 = -1;
    FUN_0055c679();
    FUN_0055c68f();
    return;
  }
  if ((DAT_006d1da0 !== param_1)) {
    FUN_0046b14d(0x9f, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), param_2, 0, 0, 0, 0, 0, 0, 0);
    local_8 = -1;
    FUN_0055c679();
    FUN_0055c68f();
    return;
  }
  FUN_0043c9d0(s_PICKGOVT_00633acc);
  for (/* cond: (local_14 < 7) */); local_14 = local_14; local_14 = (local_14 + 1)) {
    if ((iVar1 !== 0)) {
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_0064b9a0 + local_14 * 4), 0));
      FUN_0059edf0(DAT_00679640, local_14, 0);
    }
  }
  iVar1 = FUN_0040bc80(0);
  if ((-1 < iVar1)) {
    FUN_0055c066(param_1, iVar1);
    FUN_0046e020(0x14, 1, 0, 0);
    uVar2 = FUN_00493b10(param_1);
    FUN_0040ff60(0, uVar2);
    uVar2 = FUN_00493ba6(param_1);
    FUN_0040ff60(1, uVar2);
    uVar2 = FUN_00410070(param_1);
    FUN_0040ff60(2, uVar2);
    FUN_004271e8(3, s32((DAT_0064b9a0 + iVar1 * 4), 0));
    FUN_00410030(s_NEWGOVT_00633ad8, (DAT_00646878 + iVar1 * 0x3c), 0);
    if (((DAT_00655af4 & 0x20) === 0)) {
      FUN_004271e8(0, s32((DAT_0064b9a0 + iVar1 * 4), 0));
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_DEMOCRATS_00633ae0, DAT_00643af8, 0);
      wv(DAT_00655af4, (DAT_00655af4 | 0x20));
    }
  }
  local_8 = -1;
  FUN_0055c679();
  FUN_0055c68f();
  return;
}


 export function FUN_0055c679 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0055c68f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0055c69d (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_10;
  let local_c;
  let local_8;

  uVar3 = u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]);
  if ((param_2 !== 0)) {
    w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 8));
  }
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 1) !== 0)) {
      uVar1 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar1);
      FUN_004271e8(1, s32((DAT_0064b9a0 + param_2 * 4), 0));
      uVar1 = FUN_00493b10(param_1);
      FUN_0040ff60(2, uVar1);
      uVar1 = FUN_00493ba6(param_1);
      FUN_0040ff60(3, uVar1);
      local_10 = 0;
      if ((DAT_00655b07 !== 0)) {
        if ((DAT_00654fa8 !== 0)) {
          if ((DAT_00654fa8 === 0)) {
            FUN_00410030(s_OVERTHROWN_00633af4, (DAT_00646878 + uVar3 * 0x3c), (((DAT_00633584 === 0) - 1) & 8));
            w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 1));
          }
        }
        else {
          FUN_00410030(s_CHANGED_00633aec, (DAT_00646878 + param_2 * 0x3c), (((DAT_00633584 === 0) - 1) & 8));
          w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfffe));
        }
        if ((param_2 < 4)) {
          local_8 = param_2;
        }
        else {
          local_8 = (param_2 - 1);
        }
        _MEM[DAT_0064c6b4 + param_1 * 0x594] = (4 - (((local_8 >> 1)) & 0xFF));
      }
      if ((2 < DAT_00655b02)) {
        for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
          if ((iVar2 !== 0)) {
            if ((DAT_00654fa8 !== 0)) {
              FUN_00511880(0x2c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_c * 4), 0) * 0x54), 0), 1, 0, uVar3, (((DAT_00633584 === 0) - 1) & 8));
              w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 1));
              local_10 = (local_10 + 1);
            }
            else {
              FUN_00511880(0x2b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_c * 4), 0) * 0x54), 0), 4, 0, param_2, (((DAT_00633584 === 0) - 1) & 8));
              w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfffe));
              local_10 = (local_10 + 1);
            }
          }
        }
      }
      if ((local_10 !== 0)) {
        if ((param_2 < 4)) {
          local_8 = param_2;
        }
        else {
          local_8 = (param_2 - 1);
        }
        _MEM[DAT_0064c6b4 + param_1 * 0x594] = (4 - (((local_8 >> 1)) & 0xFF));
      }
    }
  }
  else if ((param_2 !== 0)) {
    FUN_0055c3d3(param_1, 0);
    return;
  }
  FUN_0055c066(param_1, param_2);
  return;
}


 export function FUN_0055cbd5 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let iVar3;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  bVar1 = _MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)];
  if (((_MEM[DAT_0064c6c1 + (param_2 * 4 + param_1 * 0x594)] & 8) === 0)) {
    if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 0x10) === 0)) {
      for (/* cond: (local_20 < 8) */); local_20 = (local_20 < 8); local_20 = (local_20 + 1)) {
        if ((((1 << (((local_20) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          iVar3 = FUN_00467af0(param_1, local_20);
          if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + local_20 * 0x594)] & 8) === 0)) {
            return 0;
          }
          iVar3 = FUN_00467af0(param_2, local_20);
          if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + local_20 * 0x594)] & 8) === 0)) {
            return 0;
          }
        }
      }
      if ((_MEM[DAT_0064c7a5 + param_1 * 0x594] < _MEM[DAT_0064c7a5 + param_2 * 0x594])) {
        uVar2 = 0;
      }
      else {
        local_c = 0;
        for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
          if ((local_10 !== param_2)) {
            iVar3 = FUN_00467af0(param_1, local_10);
            if ((iVar3 !== 0)) {
              local_c = (local_c + 1);
            }
            iVar3 = local_c;
            if ((_MEM[DAT_00655c22 + param_2] < _MEM[DAT_00655c22 + local_10])) {
              iVar3 = (local_c + 2);
            }
            local_c = iVar3;
            if ((((1 << (((local_10) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              local_c = (local_c + -1);
            }
            if (((_MEM[DAT_0064c6c1 + (local_10 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
              local_c = (local_c + -1);
            }
          }
        }
        iVar3 = FUN_00467af0(param_1, param_2);
        if ((iVar3 === 0)) {
          local_c = (local_c + 1);
        }
        if (((bVar1 & 8) !== 0)) {
          local_c = (local_c + 1);
        }
        local_8 = 0;
        local_1c = 0;
        local_24 = 1;
        for (/* cond: (local_18 < 0x3f) */); local_18 = (local_18 < 0x3f); local_18 = (local_18 + 1)) {
          if (((((s16((DAT_0064c8b2 + (local_18 * 2 + param_1 * 0x594)), 0)) & 0xFFFF) + ((s16((DAT_0064c832 + (local_18 * 2 + param_1 * 0x594)), 0)) & 0xFFFF)) < ((s16((DAT_0064c8b2 + (local_18 * 2 + param_2 * 0x594)), 0)) & 0xFFFF))) {
            return 0;
          }
          if ((s16((DAT_0064c832 + (local_18 * 2 + param_2 * 0x594)), 0) !== 0)) {
            local_1c = (local_1c + ((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_18 * 2)), 0)) & 0xFFFF));
            local_24 = (local_24 + ((((s16((DAT_0064c8b2 + (param_2 * 0x594 + local_18 * 2)), 0)) & 0xFFFF) >> 1) + ((s16((DAT_0064c832 + (param_2 * 0x594 + local_18 * 2)), 0)) & 0xFFFF)));
            local_8 = (local_8 + u8(_MEM[DAT_0064c932 + (param_1 * 0x594 + local_18)]));
          }
        }
        if ((local_8 !== 0)) {
          uVar2 = 0;
        }
        else {
          uVar2 = 1;
        }
      }
    }
    else {
      uVar2 = 1;
    }
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_0055d1e2 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;

  local_14 = 0;
  local_18 = 0;
  local_10 = 0;
  if (((DAT_0064bc60 & 0x20) === 0)) {
    if ((_MEM[DAT_0064c6b0 + u8(DAT_00655c31) * 0x594] <= _MEM[DAT_0064c6b0 + param_2 * 0x594])) {
      bVar1 = 0;
    }
    else {
      bVar1 = 1;
    }
    for (/* cond: (local_1c < 0x64) */); local_1c = (local_1c < 0x64); local_1c = (local_1c + 1)) {
      if ((_MEM[DAT_0062768f + local_1c * 0x10] !== 0xfe)) {
        iVar3 = FUN_004bd9f0(param_1, local_1c);
        if ((iVar3 !== 0)) {
          iVar3 = _rand();
          iVar4 = FUN_004bdb2c(param_1, local_1c);
          iVar4 = ((iVar3 % 3) + iVar4);
          if ((local_14 < iVar4)) {
            local_20 = local_1c;
            local_10 = (local_10 | 1);
            local_14 = iVar4;
          }
        }
        else {
          iVar3 = FUN_004bd9f0(param_2, local_1c);
          if ((iVar3 !== 0)) {
            iVar3 = _rand();
            iVar4 = FUN_004bdb2c(param_2, local_1c);
            iVar4 = ((iVar3 % 3) + iVar4);
            if ((local_18 < iVar4)) {
              local_24 = local_1c;
              local_10 = (local_10 | 2);
              local_18 = iVar4;
            }
          }
        }
      }
    }
    if ((local_10 === 3)) {
      FUN_004bf05b(param_1, local_20, param_2, 0, 0);
      FUN_004bf05b(param_2, local_24, param_1, 0, 0);
      uVar2 = 1;
    }
    else {
      if ((local_10 === 1)) {
        if (((_MEM[DAT_0064c6c2 + (param_1 * 0x594 + param_2 * 4)] & 4) === 0)) {
          FUN_00467825(param_1, param_2, 0x40000);
          FUN_004bf05b(param_1, local_20, param_2, 0, 0);
          return 1;
        }
      }
      else if (((_MEM[DAT_0064c6c2 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
        FUN_00467825(param_1, param_2, 0x40000);
        FUN_004bf05b(param_2, local_24, param_1, 0, 0);
        return 1;
      }
      uVar2 = 0;
    }
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_0055d685 (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;

  if (((s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & 0x2008) === 0)) {
    if (((_MEM[DAT_0064c6c1 + (param_2 * 4 + param_3 * 0x594)] & 0x20) === 0)) {
      if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_3 * 0x594)] & 0x10) !== 0)) {
        w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x20));
        w32((DAT_0064c6c0 + (param_3 * 0x594 + param_2 * 4)), 0, (s32((DAT_0064c6c0 + (param_3 * 0x594 + param_2 * 4)), 0) | 0x20));
      }
      uVar1 = 0;
    }
    else {
      if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 0x10) === 0)) {
          if (((((s16((DAT_0064ca82 + (param_2 * 0x594 + param_1 * 2)), 0)) << 16 >> 16) - ((DAT_00655af8) << 16 >> 16)) < 6)) {
            return 0;
          }
          if (((iVar2 % 3) !== 0)) {
            return 0;
          }
        }
        w16((DAT_0064ca82 + (param_2 * 0x594 + param_1 * 2)), 0, DAT_00655af8);
        w16((DAT_0064ca82 + (param_2 * 0x594 + param_3 * 2)), 0, DAT_00655af8);
      }
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar1);
      uVar1 = FUN_00493c7d(param_3);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(2, uVar1);
      FUN_00410030(s_JOINWAR_00633b00, DAT_00644e48, 0);
      FUN_00467825(param_1, param_2, 0x2000);
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0055d8d8 (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let bVar6;
  let bVar7;
  let local_2c;
  let local_28;
  let local_1c;
  let local_14;

  if ((param_1 === 0)) {
    return;
  }
  if ((param_2 === 0)) {
    return;
  }
  if ((DAT_00655af8 === 0)) {
    return;
  }
  if ((iVar3 === 0)) {
    return;
  }
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0)) << 16 >> 16)))) {
      FUN_0046b14d(0x99, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_2 * 0x594 + param_1 * 2)), 0)) << 16 >> 16)))) {
      FUN_0046b14d(0x99, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), param_2, param_1, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0)) << 16 >> 16)))) {
      if ((DAT_006d1da0 !== param_1)) {
        return;
      }
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_2 * 0x594 + param_1 * 2)), 0)) << 16 >> 16)))) {
      if ((DAT_006d1da0 !== param_2)) {
        return;
      }
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if ((DAT_00655b02 < 3)) {
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0)) << 16 >> 16)))) {
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_2 * 0x594 + param_1 * 2)), 0)) << 16 >> 16)))) {
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if ((0xf < (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0)) << 16 >> 16)))) {
    wv(DAT_0063f278, -1);
    wv(DAT_00626a2c, 1);
    FUN_00511880(0x3d, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 0, 0, param_1, 0);
    uVar4 = FUN_00493b10(param_2);
    FUN_0040ff60(1, uVar4);
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    wv(DAT_00635a3c, LAB_0040326a);
    _DAT_0063e4e8 = FUN_00421bb0();
    iVar3 = FUN_00426fb0(s_PARLEYWAITING_00633b08, 0x2000001, DAT_0063fc58, 0);
    if ((DAT_006ad698 === 0)) {
      if ((DAT_006c91e4 === 0)) {
        if ((iVar3 === -1)) {
          FUN_0046b14d(0x81, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
          wv(DAT_0067a8c0, -1);
          wv(DAT_00626a2c, 0);
        }
        else if ((-1 < 1)) {
          wv(DAT_00635a3c, LAB_00403c74);
          FUN_00410030(s_PARLEYGOAWAY_00633b34, DAT_0063fc58, 0);
          wv(DAT_00626a2c, 0);
        }
        else if ((-1 === 1)) {
          wv(DAT_0063f278, -1);
          wv(DAT_0067a8c0, param_2);
          wv(DAT_00635a3c, LAB_0040326a);
          _DAT_0063e4e8 = FUN_00421bb0();
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          FUN_00410030(s_PARLEYOK_00633b44, DAT_0063fc58, 0);
          if ((DAT_006ad698 === 0)) {
            if ((DAT_006c91e4 === 0)) {
              FUN_004b7eb6(param_2, 3);
            }
            else {
              wv(DAT_0067a8c0, -1);
              wv(DAT_006c91e4, 0);
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(0, uVar4);
              wv(DAT_00635a3c, LAB_00403c74);
              FUN_00410030(s_PARLEYCANCEL_00633b5c, DAT_0063fc58, 0);
              wv(DAT_00626a2c, 0);
            }
          }
          else {
            wv(DAT_0067a8c0, -1);
            wv(DAT_00635a3c, LAB_00403c74);
            FUN_00410030(s_PARLEYBUSY_00633b50, DAT_0063fc58, 0);
            wv(DAT_00626a2c, 0);
          }
        }
        else {
          wv(DAT_00635a3c, LAB_00403c74);
          FUN_00410030(s_PARLEYBUSY_00633b6c, DAT_0063fc58, 0);
          wv(DAT_00626a2c, 0);
        }
      }
      else {
        wv(DAT_006c91e4, 0);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(0, uVar4);
        wv(DAT_00635a3c, LAB_00403c74);
        FUN_00410030(s_PARLEYCANCEL_00633b24, DAT_0063fc58, 0);
        wv(DAT_0067a8c0, -1);
        wv(DAT_00626a2c, 0);
      }
    }
    else {
      wv(DAT_00635a3c, LAB_00403c74);
      FUN_00410030(s_PARLEYBUSY_00633b18, DAT_0063fc58, 0);
      wv(DAT_00626a2c, 0);
    }
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 1) === 0)) {
    FUN_00467825(param_1, param_2, 0x4000);
  }
  bVar6 = ((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 1) === 0);
  FUN_00467825(param_1, param_2, 0x401);
  if ((4 < DAT_00655af8)) {
    iVar3 = FUN_0055cbd5(param_1, param_2);
    if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + param_1 * 4)] & 8) === 0)) {
      FUN_0055d1e2(param_1, param_2);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 4) === 0)) {
        if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + param_2 * 4)] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(1, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(2, uVar4);
          iVar3 = FUN_00453e51(param_2, 0x18);
          if ((iVar3 === 0)) {
            iVar3 = FUN_00453e51(param_2, 6);
            if ((iVar3 !== 0)) {
              FUN_00410030(s_WALLFORCE_00633b80, DAT_006409d8, 0);
            }
          }
          else {
            FUN_00410030(s_UNFORCE_00633b78, DAT_006409d8, 0);
          }
        }
        if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + param_1 * 4)] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(2, uVar4);
          iVar3 = FUN_00453e51(param_1, 0x18);
          if ((iVar3 === 0)) {
            iVar3 = FUN_00453e51(param_1, 6);
            if ((iVar3 !== 0)) {
              FUN_00410030(s_WALLFORCE_00633b94, DAT_006409d8, 0);
            }
          }
          else {
            FUN_00410030(s_UNFORCE_00633b8c, DAT_006409d8, 0);
          }
        }
        if (((_MEM[DAT_0064c6c0 + (DAT_006d1da0 * 0x594 + param_1 * 4)] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030(s_ALLYMAKESPEACE_00633ba0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        }
        else if (((_MEM[DAT_0064c6c0 + (DAT_006d1da0 * 0x594 + param_2 * 4)] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(1, uVar4);
          FUN_00410030(s_ALLYMAKESPEACE_00633bb0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        }
        else if ((DAT_00655b07 !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030(s_SIGNPEACE_00633bc0, DAT_006409d8, 0);
        }
        FUN_00467825(param_1, param_2, 4);
      }
      else {
        bVar7 = ((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 8) !== 0);
        bVar1 = 0;
        bVar6 = bVar7;
        if ((3 < _MEM[DAT_00655c22 + param_2])) {
          bVar6 = 0;
          bVar1 = 1;
        }
        if ((3 < _MEM[DAT_00655c22 + param_1])) {
          bVar6 = 0;
          bVar1 = 1;
        }
        local_14 = 0;
        local_2c = -1;
        bVar2 = 0;
        for (/* cond: (local_28 < 8) */); local_28 = (local_28 < 8); local_28 = (local_28 + 1)) {
          if ((local_28 !== param_2)) {
            if (((_MEM[DAT_0064c6c0 + (param_2 * 0x594 + local_28 * 4)] & 8) === 0)) {
              if ((DAT_00655af8 < 0xc9)) {
                bVar2 = 0;
              }
              else {
                bVar2 = 1;
              }
              if (bVar2) {
                if (bVar6) {
                  if (((_MEM[DAT_0064c6c0 + (param_2 * 0x594 + local_28 * 4)] & 4) === 0)) {
 LAB_0055ecb6: :
                    local_2c = local_28;
                    break;
                  }
                }
                else if ((_MEM[DAT_00655c22 + param_2] <= _MEM[DAT_00655c22 + local_28])) {
              local_14 = (local_14 + 1);
            }
          }
        }
        if ((1 < DAT_00655af8)) {
          local_2c = 0;
        }
        if ((!bVar6)) {
          if ((DAT_00655b07 !== 0)) {
            uVar4 = FUN_00493c7d(param_1);
            FUN_0040ff60(0, uVar4);
            uVar4 = FUN_00493c7d(param_2);
            FUN_0040ff60(1, uVar4);
            FUN_00410030(s_CANCELALLIED_00633be4, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
          }
          FUN_00467750(param_1, param_2, 8);
        }
        else {
          if ((!bVar7)) {
            local_1c = 0;
            if (((_MEM[DAT_0064c6c0 + (DAT_006d1da0 * 0x594 + param_2 * 4)] & 1) !== 0)) {
              uVar4 = FUN_00493c7d(param_1);
              FUN_0040ff60(0, uVar4);
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(1, uVar4);
              if (bVar2) {
                iVar3 = FUN_0043d07a(param_3, param_4, param_1, -1, param_2);
                if ((-1 < iVar3)) {
                  FUN_0040ff60(2, (DAT_0064f360 + iVar3 * 0x58));
                }
                uVar4 = FUN_00410070(local_2c);
                FUN_0040ff60(3, uVar4);
                FUN_00410030(s_SIGNNATO_00633bcc, DAT_00648018, 0);
              }
              else if ((DAT_00654fa8 === 0)) {
                uVar4 = FUN_00493c7d(local_2c);
                FUN_0040ff60(2, uVar4);
                FUN_00410030(s_SIGNALLIED_00633bd8, DAT_0063fc98, 0);
              }
              local_1c = FUN_0055d685(param_1, local_2c, param_2);
              uVar5 = FUN_0055d685(param_2, local_2c, param_1);
              local_1c = (local_1c | uVar5);
            }
            if ((local_1c === 0)) {
              if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + local_2c * 4)] & 0x20) === 0)) {
                FUN_00467825(param_1, local_2c, 0x10000);
              }
              if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + local_2c * 4)] & 0x20) === 0)) {
                FUN_00467825(param_2, local_2c, 0x10000);
              }
            }
          }
          FUN_00467825(param_1, param_2, 8);
        }
      }
    }
    else if (bVar6) {
      if (((_MEM[DAT_0064c6c0 + (DAT_006d1da0 * 0x594 + param_1 * 4)] & 8) !== 0)) {
        iVar3 = FUN_0055cbd5(param_1, param_2);
        if ((iVar3 === 0)) {
          FUN_0045b0d6(param_1, param_2);
        }
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar4);
        FUN_00410030(s_ALLYMAKESWAR_00633bf4, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      }
      else if (((_MEM[DAT_0064c6c0 + (DAT_006d1da0 * 0x594 + param_2 * 4)] & 8) !== 0)) {
        iVar3 = FUN_0055cbd5(param_2, param_1);
        if ((iVar3 === 0)) {
          FUN_0045b0d6(param_2, param_1);
        }
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar4);
        FUN_00410030(s_ALLYMAKESWAR_00633c04, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      }
      else if ((DAT_00655b07 !== 0)) {
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar4);
        if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 8) !== 0)) {
          FUN_00410030(s_DECLAREWAR_00633c20, DAT_00644e48, 0);
        }
        else {
          FUN_00410030(s_CANCELPEACE_00633c14, DAT_00644e48, 0);
        }
      }
      FUN_00467750(param_1, param_2, 4);
      FUN_00467825(param_1, param_2, 0x2000);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 0x10) !== 0)) {
        FUN_00467750(param_1, param_2, 0x10);
        w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x800));
      }
    }
  }
  return;
}


 export function FUN_0055f5a3 (param_1, param_2)

 {
  let bVar1;
  let sVar2;
  let iVar3;
  let local_18;
  let local_14;
  let local_8;

  if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] === 0)) {
    local_8 = 6;
    if ((param_2 !== 0)) {
      local_8 = 5;
      iVar3 = _rand();
      if (((iVar3 % 3) !== 0)) {
        local_8 = 4;
      }
    }
    if ((_MEM[DAT_00655c22 + param_1] < 6)) {
      if ((6 < (u8(bVar1) - u8(_MEM[DAT_0064c6b0 + param_1 * 0x594])))) {
        w16((DAT_0064ca80 + param_1 * 0x594), 0, 0xfffe);
      }
      if ((8 < (u8(bVar1) - u8(_MEM[DAT_0064c6b0 + param_1 * 0x594])))) {
        w16((DAT_0064ca7e + param_1 * 0x594), 0, 0xffff);
      }
    }
    if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] < 6)) {
      local_8 = 1;
    }
    sVar2 = 0xfc19;
    local_18 = 1;
    for (/* cond: (local_14 <= local_8) */); local_14 = (local_14 <= local_8); local_14 = (local_14 + 1)) {
      iVar3 = FUN_0055c277(param_1, local_14);
      if ((sVar2 <= s16((DAT_0064ca74 + (local_14 * 2 + param_1 * 0x594)), 0))) {
        sVar2 = s16((DAT_0064ca74 + (local_14 * 2 + param_1 * 0x594)), 0);
        local_18 = local_14;
      }
    }
    FUN_0055c69d(param_1, local_18);
  }
  return;
}


 export function FUN_0055f7d1 (param_1)

 {
  let cVar1;
  let cVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_14;
  let local_10;
  let local_c;

  local_14 = 0;
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    if (((_MEM[DAT_0064c6c1 + (local_10 * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
      local_14 = (local_14 + 1);
    }
  }
  local_10 = 1;
  do {
    if ((7 < local_10)) {
      return;
    }
    if ((local_14 === 0)) {
      for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
        if ((_MEM[DAT_00655c22 + local_10] <= _MEM[DAT_00655c22 + local_2c])) {
          local_34 = -1;
          local_c = 0;
          for (/* cond: (local_30 < ((DAT_00655b16) << 16 >> 16)) */); local_30 = (local_30 < ((DAT_00655b16) << 16 >> 16)); local_30 = (local_30 + 1)) {
            if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + local_30 * 0x20]) * 0x14] === 0)) {
              iVar3 = ((s16((DAT_006560f0 + local_30 * 0x20), 0)) << 16 >> 16);
              iVar4 = ((s16((DAT_006560f2 + local_30 * 0x20), 0)) << 16 >> 16);
              iVar5 = FUN_004087c0(iVar3, iVar4);
              if ((local_14 === 0)) {
                cVar1 = _MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + local_30 * 0x20]) * 0x14];
                cVar2 = _MEM[DAT_0064b1c5 + u8(_MEM[DAT_006560f6 + local_30 * 0x20]) * 0x14];
                iVar3 = FUN_005b29aa(local_30);
                iVar3 = (s8(cVar2) + s8(cVar1) * 2) * iVar3;
                if ((local_c < iVar3)) {
                  local_34 = local_30;
                  local_c = iVar3;
                }
              }
            }
          }
          if ((-1 < local_34)) {
            for (/* cond: (local_28 < ((DAT_00655b18) << 16 >> 16)) */); local_28 = (local_28 < ((DAT_00655b18) << 16 >> 16)); local_28 = (local_28 + 1)) {
              if ((s8(_MEM[DAT_0064f348 + local_28 * 0x58]) === local_10)) {
                iVar3 = ((s16((DAT_0064f340 + local_28 * 0x58), 0)) << 16 >> 16);
                iVar4 = ((s16((DAT_0064f342 + local_28 * 0x58), 0)) << 16 >> 16);
                iVar5 = FUN_005b8d62(iVar3, iVar4);
                if ((-1 < iVar5)) {
                  FUN_005b319e(local_34, 1);
                  _MEM[DAT_0064c778 + (param_1 * 0x594 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]))] = (_MEM[DAT_0064c778 + (param_1 * 0x594 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]))] + 0xff);
                  _MEM[DAT_006560f7 + local_34 * 0x20] = ((local_10) & 0xFF);
                  _MEM[DAT_00656100 + local_34 * 0x20] = ((local_28) & 0xFF);
                  _MEM[DAT_006560f9 + local_34 * 0x20] = 0;
                  _MEM[DAT_0064c778 + (local_10 * 0x594 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]))] = (_MEM[DAT_0064c778 + (local_10 * 0x594 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]))] + 1);
                  FUN_005b345f(local_34, iVar3, iVar4, 1);
                  FUN_0050c679(local_28);
                  FUN_0047cea6(((s16((DAT_0064f340 + local_28 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_28 * 0x58), 0)) << 16 >> 16));
                  FUN_0050c679(iVar5);
                  FUN_0047cea6(((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
                  if ((DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]) * 0x14), 0));
                    uVar6 = FUN_00493c7d(local_10);
                    FUN_0040ff60(2, uVar6);
                    if ((DAT_006d1da0 === local_2c)) {
                      FUN_004442e0(s_MILITARYAID1_00633c2c, local_34);
                    }
                    else if ((2 < DAT_00655b02)) {
                      FUN_00511880(0x51, s32((DAT_006ad30c + s32((DAT_006ad558 + local_2c * 4), 0) * 0x54), 0), 3, 0, local_34, 0);
                    }
                  }
                  if ((DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_34 * 0x20]) * 0x14), 0));
                    FUN_0040ff60(2, (DAT_0064f360 + local_28 * 0x58));
                    uVar6 = FUN_00493c7d(local_2c);
                    FUN_0040ff60(3, uVar6);
                    if ((DAT_006d1da0 === local_10)) {
                      FUN_004442e0(s_MILITARYAID2_00633c3c, local_34);
                    }
                    else if ((2 < DAT_00655b02)) {
                      FUN_00511880(0x52, s32((DAT_006ad30c + s32((DAT_006ad558 + local_10 * 4), 0) * 0x54), 0), 4, 0, local_34, 0);
                    }
                  }
                  if ((DAT_00655b02 < 3)) {
                    return;
                  }
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  XD_FlushSendBuffer(0x1388);
                  return;
                }
              }
            }
          }
        }
      }
    }
    local_10 = (local_10 + 1);
  } ( true );
}
