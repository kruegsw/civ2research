// Block 0x00470000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 139

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_0040733c, FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_004083b0, FUN_00408460 } from './block_00400000.js';
import { FUN_00408490, FUN_004085f0, FUN_00408650, FUN_004086c0, FUN_004087c0, FUN_0040bbb0 } from './block_00400000.js';
import { FUN_0040bbe0, FUN_0040bc80, FUN_0040bcb0, FUN_0040ddc6, FUN_0040decc, FUN_0040ef70 } from './block_00400000.js';
import { FUN_0040efd0, FUN_0040fb00, FUN_0040fbb0, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00410402, FUN_004105f8, FUN_00410f77, FUN_00411705 } from './block_00410000.js';
import { FUN_00411f91, FUN_004125c6, FUN_00414ce0, FUN_00414d10, FUN_00414d40, FUN_00415133 } from './block_00410000.js';
import { FUN_00417ef0, FUN_00419b80, FUN_00419ba0, FUN_00419be0, FUN_00419ed3, FUN_0041a046 } from './block_00410000.js';
import { FUN_0041a422, FUN_0041a5c4, FUN_0041e864 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421d60, FUN_00421da0, FUN_00421ea0, FUN_00421f10 } from './block_00420000.js';
import { FUN_004257fe, FUN_00426f80, FUN_00426fb0, FUN_00426ff0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_00436287, FUN_0043c520, FUN_0043c690, FUN_0043c6c0, FUN_0043c790, FUN_0043c840 } from './block_00430000.js';
import { FUN_0043c910, FUN_0043c9d0, FUN_0043cab0, FUN_0043cb30, FUN_0043cf76, FUN_0043d07a } from './block_00430000.js';
import { FUN_0043f8b0 } from './block_00430000.js';
import { FUN_004413d1, FUN_00444270, FUN_0044c5a0, FUN_0044c730, FUN_0044ca60, FUN_0044cba0 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400 } from './block_00450000.js';
import { FUN_00453af0, FUN_00453c40, FUN_00453c80, FUN_0045b0d6 } from './block_00450000.js';
import { FUN_00467580, FUN_00467750, FUN_00467825, FUN_00468bb9, FUN_0046968b, FUN_0046b14d } from './block_00460000.js';
import { FUN_0046e020, FUN_0046e287, FUN_0046e4a9, FUN_0046e571, FUN_0046e6a9, FUN_0046e6c8 } from './block_00460000.js';
import { FUN_00482305, FUN_00482311, FUN_00482327, FUN_004823d6, FUN_0048308f, FUN_00484cc0 } from './block_00480000.js';
import { FUN_00484d52, FUN_0048de75 } from './block_00480000.js';
import { FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497da0, FUN_00497e0f, FUN_00498159 } from './block_00490000.js';
import { FUN_00498784, FUN_0049882b } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a76f5, FUN_004a7ce9, FUN_004aa378 } from './block_004A0000.js';
import { FUN_004aef20, FUN_004aef36, FUN_004af01a, FUN_004af03b, FUN_004af122, FUN_004af14b } from './block_004A0000.js';
import { FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b1de3, FUN_004b2010, FUN_004b24a2, FUN_004b251a, FUN_004b7645 } from './block_004B0000.js';
import { FUN_004b81dd, FUN_004b90ad, FUN_004bd9f0, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004cef35 } from './block_004C0000.js';
import { FUN_004dd285 } from './block_004D0000.js';
import { FUN_004e1763, FUN_004e2803, FUN_004e4ceb, FUN_004e7270 } from './block_004E0000.js';
import { FUN_004f1220, FUN_004fa5d9, FUN_004fa617, FUN_004fbd2b, FUN_004fc516 } from './block_004F0000.js';
import { FUN_00509429, FUN_00509b48, FUN_0050a473, FUN_0050b74e, FUN_0050bacd, FUN_0050c1d1 } from './block_00500000.js';
import { FUN_0050c449, FUN_0050c494, FUN_0050c679 } from './block_00500000.js';
import { FUN_00511a0e, FUN_00511ba2, FUN_005149d6 } from './block_00510000.js';
import { FUN_005233fc, FUN_00523d8a } from './block_00520000.js';
import { FUN_00552112, FUN_00552ed2, FUN_0055339f, FUN_0055ae80, FUN_0055af2e, FUN_0055b046 } from './block_00550000.js';
import { FUN_0055c3d3, ~COleCntrFrameWnd } from './block_00550000.js';
import { FUN_00560d95, FUN_00562021, FUN_00564470, FUN_00564713, FUN_005683c5, FUN_00569363 } from './block_00560000.js';
import { FUN_0056a65e, FUN_0056baff, FUN_0056c705, FUN_0056d289, FUN_0056f113 } from './block_00560000.js';
import { FUN_0057940d, FUN_0057ed3f, FUN_0057f657 } from './block_00570000.js';
import { FUN_005802fd, FUN_0058878e, FUN_00589ef8 } from './block_00580000.js';
import { FUN_00594d42, FUN_0059511c, FUN_0059b571, FUN_0059b7fc, FUN_0059b96a, FUN_0059c575 } from './block_00590000.js';
import { FUN_0059db08, FUN_0059db65, FUN_0059df8a, FUN_0059ec88 } from './block_00590000.js';
import { FUN_005a9aa3, FUN_005ae006, FUN_005ae052, FUN_005ae1b0, FUN_005ae296, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2590, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69, FUN_005b319e, FUN_005b345f } from './block_005B0000.js';
import { FUN_005b36df, FUN_005b389f, FUN_005b3ae0, FUN_005b3d06, FUN_005b4391, FUN_005b48b1 } from './block_005B0000.js';
import { FUN_005b490e, FUN_005b496e, FUN_005b50ad, FUN_005b542e, FUN_005b5bab, FUN_005b5d93 } from './block_005B0000.js';
import { FUN_005b6042, FUN_005b633f, FUN_005b6787, FUN_005b8635, FUN_005b8783, FUN_005b8931 } from './block_005B0000.js';
import { FUN_005b898b, FUN_005b89bb, FUN_005b8a1d, FUN_005b8b65, FUN_005b8ca6, FUN_005b8ee1 } from './block_005B0000.js';
import { FUN_005b8ffa, FUN_005b94d5, FUN_005b94fc, FUN_005b9646, FUN_005b976d, FUN_005b98b7 } from './block_005B0000.js';
import { FUN_005b99e8, FUN_005b9b35, FUN_005b9c49, FUN_005b9d81, FUN_005ba206, FUN_005baeb0 } from './block_005B0000.js';
import { FUN_005baec8, FUN_005baee0, FUN_005baf57, FUN_005bb3f0, FUN_005bcaa7, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd65c, FUN_005bd915, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c041f, FUN_005c0479, FUN_005c0593, FUN_005c0bf2, FUN_005c0cc5 } from './block_005C0000.js';
import { FUN_005c1020, FUN_005c1167, FUN_005c19ad, FUN_005c5fc4, FUN_005c61b0, FUN_005c6303 } from './block_005C0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005cd775, FUN_005cef31, InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d225b, FUN_005d22b7, FUN_005d22f9, FUN_005d687b, FUN_005dae6b } from './block_005D0000.js';
import { FUN_005dd010, FUN_005dd1a0, FUN_005dd27e, FUN_005dd377, FUN_005dd3c2, FUN_005dd64c } from './block_005D0000.js';
import { FUN_005dd71e, ~_Timevec } from './block_005D0000.js';
import { FID_conflict:__expand, FID_conflict:_memcpy, FUN_005f22d0, FUN_005f22e0, __chdir, __strnicmp } from './block_005F0000.js';
import { _atexit, _fclose, _fgetc, _fopen, _fputc, _fputs } from './block_005F0000.js';
import { _fread, _fwrite, _memset, _rand, _strchr, _strcmp } from './block_005F0000.js';
import { _strlen, _strncmp, _strncpy, _strrchr, _strstr, `eh_vector_constructor_iterator' } from './block_005F0000.js';
import { `eh_vector_destructor_iterator', operator_delete, operator_new } from './block_005F0000.js';
import { __itoa, __strlwr, __strupr } from './block_00600000.js';
// Unresolved: CommDlgExtendedError, GetOpenFileNameA, GetSaveFileNameA, XD_FlushSendBuffer, XD_InFlushSendBuffer

const DAT_0000002c = globalThis.DAT_0000002c, DAT_00627680 = globalThis.DAT_00627680, DAT_00627684 = globalThis.DAT_00627684, DAT_00627cc0 = globalThis.DAT_00627cc0, DAT_00628338 = globalThis.DAT_00628338, DAT_0062833b = globalThis.DAT_0062833b;
const DAT_0062833c = globalThis.DAT_0062833c, DAT_00628343 = globalThis.DAT_00628343, DAT_00628344 = globalThis.DAT_00628344, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_00628370 = globalThis.DAT_00628370;
const DAT_006283a0 = globalThis.DAT_006283a0, DAT_0062b824 = globalThis.DAT_0062b824, DAT_0062b828 = globalThis.DAT_0062b828, DAT_0062b850 = globalThis.DAT_0062b850, DAT_0062b864 = globalThis.DAT_0062b864, DAT_0062b8d0 = globalThis.DAT_0062b8d0;
const DAT_0062b8d4 = globalThis.DAT_0062b8d4, DAT_0062b900 = globalThis.DAT_0062b900, DAT_0062b924 = globalThis.DAT_0062b924, DAT_0062b928 = globalThis.DAT_0062b928, DAT_0062b944 = globalThis.DAT_0062b944, DAT_0062b970 = globalThis.DAT_0062b970;
const DAT_0062b974 = globalThis.DAT_0062b974, DAT_0062ba38 = globalThis.DAT_0062ba38, DAT_0062ba40 = globalThis.DAT_0062ba40, DAT_0062ba48 = globalThis.DAT_0062ba48, DAT_0062ba50 = globalThis.DAT_0062ba50, DAT_0062ba58 = globalThis.DAT_0062ba58;
const DAT_0062ba7c = globalThis.DAT_0062ba7c, DAT_0062bad4 = globalThis.DAT_0062bad4, DAT_0062bad8 = globalThis.DAT_0062bad8, DAT_0062bae0 = globalThis.DAT_0062bae0, DAT_0062bae4 = globalThis.DAT_0062bae4, DAT_0062baf8 = globalThis.DAT_0062baf8;
const DAT_0062bb00 = globalThis.DAT_0062bb00, DAT_0062bb08 = globalThis.DAT_0062bb08, DAT_0062bb0c = globalThis.DAT_0062bb0c, DAT_0062bb10 = globalThis.DAT_0062bb10, DAT_0062bb14 = globalThis.DAT_0062bb14, DAT_0062bb18 = globalThis.DAT_0062bb18;
const DAT_0062bb1c = globalThis.DAT_0062bb1c, DAT_0062bb20 = globalThis.DAT_0062bb20, DAT_0062bb24 = globalThis.DAT_0062bb24, DAT_0062bb28 = globalThis.DAT_0062bb28, DAT_0062bb2c = globalThis.DAT_0062bb2c, DAT_0062bb30 = globalThis.DAT_0062bb30;
const DAT_0062bb34 = globalThis.DAT_0062bb34, DAT_0062bb60 = globalThis.DAT_0062bb60, DAT_0062bb64 = globalThis.DAT_0062bb64, DAT_0062bb68 = globalThis.DAT_0062bb68, DAT_0062bb6c = globalThis.DAT_0062bb6c, DAT_0062bcb8 = globalThis.DAT_0062bcb8;
const DAT_0062bcc8 = globalThis.DAT_0062bcc8, DAT_0062c468 = globalThis.DAT_0062c468, DAT_0062cd24 = globalThis.DAT_0062cd24, DAT_0063cc48 = globalThis.DAT_0063cc48, DAT_0063fc58 = globalThis.DAT_0063fc58, DAT_00644e48 = globalThis.DAT_00644e48;
const DAT_00648018 = globalThis.DAT_00648018, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b0 = globalThis.DAT_0064b1b0, DAT_0064b1b4 = globalThis.DAT_0064b1b4, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1c1 = globalThis.DAT_0064b1c1;
const DAT_0064b1c4 = globalThis.DAT_0064b1c4, DAT_0064b984 = globalThis.DAT_0064b984, DAT_0064b9a0 = globalThis.DAT_0064b9a0, DAT_0064b9c0 = globalThis.DAT_0064b9c0, DAT_0064ba10 = globalThis.DAT_0064ba10, DAT_0064ba28 = globalThis.DAT_0064ba28;
const DAT_0064ba48 = globalThis.DAT_0064ba48, DAT_0064ba4c = globalThis.DAT_0064ba4c, DAT_0064ba50 = globalThis.DAT_0064ba50, DAT_0064ba54 = globalThis.DAT_0064ba54, DAT_0064ba58 = globalThis.DAT_0064ba58, DAT_0064ba5c = globalThis.DAT_0064ba5c;
const DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064bc60 = globalThis.DAT_0064bc60, DAT_0064bc62 = globalThis.DAT_0064bc62, DAT_0064bcc8 = globalThis.DAT_0064bcc8, DAT_0064bcf8 = globalThis.DAT_0064bcf8, DAT_0064bcfa = globalThis.DAT_0064bcfa;
const DAT_0064bd12 = globalThis.DAT_0064bd12, DAT_0064bd2a = globalThis.DAT_0064bd2a, DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c6a0 = globalThis.DAT_0064c6a0, DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a6 = globalThis.DAT_0064c6a6;
const DAT_0064c6bc = globalThis.DAT_0064c6bc, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6e0 = globalThis.DAT_0064c6e0, DAT_0064c6f8 = globalThis.DAT_0064c6f8, DAT_0064c706 = globalThis.DAT_0064c706, DAT_0064c714 = globalThis.DAT_0064c714;
const DAT_0064c778 = globalThis.DAT_0064c778, DAT_0064c7b6 = globalThis.DAT_0064c7b6, DAT_0064c7f4 = globalThis.DAT_0064c7f4, DAT_0064c832 = globalThis.DAT_0064c832, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064ca92 = globalThis.DAT_0064ca92;
const DAT_0064caa2 = globalThis.DAT_0064caa2, DAT_0064caa4 = globalThis.DAT_0064caa4, DAT_0064caa6 = globalThis.DAT_0064caa6, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f348 = globalThis.DAT_0064f348;
const DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f34d = globalThis.DAT_0064f34d, DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00654b40 = globalThis.DAT_00654b40;
const DAT_00654fe0 = globalThis.DAT_00654fe0, DAT_00655020 = globalThis.DAT_00655020, DAT_00655128 = globalThis.DAT_00655128, DAT_00655284 = globalThis.DAT_00655284, DAT_00655294 = globalThis.DAT_00655294, DAT_006552a4 = globalThis.DAT_006552a4;
const DAT_00655324 = globalThis.DAT_00655324, DAT_00655334 = globalThis.DAT_00655334, DAT_00655344 = globalThis.DAT_00655344, DAT_006553d8 = globalThis.DAT_006553d8, DAT_00655490 = globalThis.DAT_00655490, DAT_006554f8 = globalThis.DAT_006554f8;
const DAT_006554fb = globalThis.DAT_006554fb, DAT_006554fc = globalThis.DAT_006554fc, DAT_006554fd = globalThis.DAT_006554fd, DAT_00655502 = globalThis.DAT_00655502, DAT_00655504 = globalThis.DAT_00655504, DAT_00655506 = globalThis.DAT_00655506;
const DAT_0065550c = globalThis.DAT_0065550c, DAT_006558e8 = globalThis.DAT_006558e8, DAT_00655ae8 = globalThis.DAT_00655ae8, DAT_00655b1e = globalThis.DAT_00655b1e, DAT_00655b82 = globalThis.DAT_00655b82, DAT_00655be6 = globalThis.DAT_00655be6;
const DAT_00655c38 = globalThis.DAT_00655c38, DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f8 = globalThis.DAT_006560f8;
const DAT_006560f9 = globalThis.DAT_006560f9, DAT_006560ff = globalThis.DAT_006560ff, DAT_00656100 = globalThis.DAT_00656100, DAT_00656106 = globalThis.DAT_00656106, DAT_00656108 = globalThis.DAT_00656108, DAT_0065610a = globalThis.DAT_0065610a;
const DAT_00666110 = globalThis.DAT_00666110, DAT_00666130 = globalThis.DAT_00666130, DAT_00666570 = globalThis.DAT_00666570, DAT_0066c4e8 = globalThis.DAT_0066c4e8, DAT_0066c4e9 = globalThis.DAT_0066c4e9, DAT_0066c4f8 = globalThis.DAT_0066c4f8;
const DAT_0066c600 = globalThis.DAT_0066c600, DAT_0066c602 = globalThis.DAT_0066c602, DAT_0066c60a = globalThis.DAT_0066c60a, DAT_0066c652 = globalThis.DAT_0066c652, DAT_0066c65a = globalThis.DAT_0066c65a, DAT_0066c662 = globalThis.DAT_0066c662;
const DAT_0066c670 = globalThis.DAT_0066c670, DAT_0066c720 = globalThis.DAT_0066c720, DAT_0066c7a8 = globalThis.DAT_0066c7a8, DAT_0066ca84 = globalThis.DAT_0066ca84, DAT_0066ca86 = globalThis.DAT_0066ca86, DAT_0066ca88 = globalThis.DAT_0066ca88;
const DAT_0066ca8a = globalThis.DAT_0066ca8a, DAT_0066ca8c = globalThis.DAT_0066ca8c, DAT_0066cae0 = globalThis.DAT_0066cae0, DAT_0066ed98 = globalThis.DAT_0066ed98, DAT_0066fd98 = globalThis.DAT_0066fd98, DAT_00670da0 = globalThis.DAT_00670da0;
const DAT_00671da0 = globalThis.DAT_00671da0, DAT_00673a78 = globalThis.DAT_00673a78, DAT_00673a98 = globalThis.DAT_00673a98, DAT_00673ab8 = globalThis.DAT_00673ab8, DAT_00673ad8 = globalThis.DAT_00673ad8, DAT_00679640 = globalThis.DAT_00679640;
const DAT_0067a420 = globalThis.DAT_0067a420, DAT_0067a424 = globalThis.DAT_0067a424, DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ab180 = globalThis.DAT_006ab180, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad35c = globalThis.DAT_006ad35c;
const DAT_006ad57c = globalThis.DAT_006ad57c, DAT_006ad59c = globalThis.DAT_006ad59c, DAT_006ad5bc = globalThis.DAT_006ad5bc, DAT_006ad5fc = globalThis.DAT_006ad5fc, DAT_006ad6ae = globalThis.DAT_006ad6ae, DAT_006ad7b2 = globalThis.DAT_006ad7b2;
const DAT_006ad920 = globalThis.DAT_006ad920, DAT_006ad924 = globalThis.DAT_006ad924, DAT_006ad928 = globalThis.DAT_006ad928, DAT_006ad92c = globalThis.DAT_006ad92c, DAT_006ad930 = globalThis.DAT_006ad930, DAT_006ad934 = globalThis.DAT_006ad934;
const DAT_006c3168 = globalThis.DAT_006c3168, DAT_006c3188 = globalThis.DAT_006c3188, DAT_006c8fc0 = globalThis.DAT_006c8fc0, DAT_006c8fe0 = globalThis.DAT_006c8fe0, DAT_006ced20 = globalThis.DAT_006ced20, DAT_fffff54c = globalThis.DAT_fffff54c;
const DAT_fffff68c = globalThis.DAT_fffff68c, DAT_fffff79c = globalThis.DAT_fffff79c, DAT_fffff7f8 = globalThis.DAT_fffff7f8, DAT_fffff8a4 = globalThis.DAT_fffff8a4, DAT_fffff8a5 = globalThis.DAT_fffff8a5, DAT_fffff8d8 = globalThis.DAT_fffff8d8;
const DAT_fffff8e4 = globalThis.DAT_fffff8e4, DAT_fffff904 = globalThis.DAT_fffff904, DAT_fffff920 = globalThis.DAT_fffff920, DAT_fffff93c = globalThis.DAT_fffff93c, DAT_fffff9a8 = globalThis.DAT_fffff9a8, DAT_fffff9c4 = globalThis.DAT_fffff9c4;
const DAT_fffff9d8 = globalThis.DAT_fffff9d8, DAT_fffffa20 = globalThis.DAT_fffffa20, DAT_fffffa28 = globalThis.DAT_fffffa28, DAT_fffffb2c = globalThis.DAT_fffffb2c, DAT_fffffb3c = globalThis.DAT_fffffb3c, DAT_fffffbbc = globalThis.DAT_fffffbbc;
const DAT_fffffcd4 = globalThis.DAT_fffffcd4, DAT_fffffcd8 = globalThis.DAT_fffffcd8, DAT_fffffcdc = globalThis.DAT_fffffcdc, DAT_fffffdc0 = globalThis.DAT_fffffdc0, DAT_fffffdc4 = globalThis.DAT_fffffdc4, DAT_fffffdd0 = globalThis.DAT_fffffdd0;
const DAT_fffffdd4 = globalThis.DAT_fffffdd4, DAT_fffffddc = globalThis.DAT_fffffddc, DAT_fffffde4 = globalThis.DAT_fffffde4, DAT_fffffde8 = globalThis.DAT_fffffde8, DAT_fffffdef = globalThis.DAT_fffffdef, DAT_fffffdf0 = globalThis.DAT_fffffdf0;
const DAT_fffffdf4 = globalThis.DAT_fffffdf4, DAT_fffffe04 = globalThis.DAT_fffffe04, DAT_fffffe14 = globalThis.DAT_fffffe14, DAT_fffffe24 = globalThis.DAT_fffffe24, DAT_fffffe34 = globalThis.DAT_fffffe34, DAT_fffffe44 = globalThis.DAT_fffffe44;
const DAT_fffffe54 = globalThis.DAT_fffffe54, DAT_fffffe60 = globalThis.DAT_fffffe60, DAT_fffffe64 = globalThis.DAT_fffffe64, DAT_fffffe74 = globalThis.DAT_fffffe74, DAT_fffffe84 = globalThis.DAT_fffffe84, DAT_fffffe94 = globalThis.DAT_fffffe94;
const DAT_fffffea4 = globalThis.DAT_fffffea4, DAT_fffffeb4 = globalThis.DAT_fffffeb4, DAT_fffffec4 = globalThis.DAT_fffffec4, DAT_fffffed0 = globalThis.DAT_fffffed0, DAT_fffffed4 = globalThis.DAT_fffffed4, DAT_fffffee0 = globalThis.DAT_fffffee0;
const DAT_fffffee4 = globalThis.DAT_fffffee4, DAT_fffffee8 = globalThis.DAT_fffffee8, DAT_fffffeec = globalThis.DAT_fffffeec, DAT_fffffef0 = globalThis.DAT_fffffef0, DAT_fffffef4 = globalThis.DAT_fffffef4, DAT_fffffef5 = globalThis.DAT_fffffef5;
const DAT_fffffef8 = globalThis.DAT_fffffef8, DAT_ffffff04 = globalThis.DAT_ffffff04, DAT_ffffff14 = globalThis.DAT_ffffff14, DAT_ffffff24 = globalThis.DAT_ffffff24, DAT_ffffff34 = globalThis.DAT_ffffff34, DAT_ffffff44 = globalThis.DAT_ffffff44;
const DAT_ffffff68 = globalThis.DAT_ffffff68, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffff88 = globalThis.DAT_ffffff88, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffff98 = globalThis.DAT_ffffff98, DAT_ffffff9c = globalThis.DAT_ffffff9c;
const DAT_ffffffa4 = globalThis.DAT_ffffffa4, DAT_ffffffa8 = globalThis.DAT_ffffffa8, DAT_ffffffac = globalThis.DAT_ffffffac, DAT_ffffffc0 = globalThis.DAT_ffffffc0, DAT_ffffffcc = globalThis.DAT_ffffffcc, DAT_ffffffd8 = globalThis.DAT_ffffffd8;
const DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4, DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0;
const DAT_fffffff4 = globalThis.DAT_fffffff4, DAT_fffffff8 = globalThis.DAT_fffffff8, PTR_FUN_0061d1e4 = globalThis.PTR_FUN_0061d1e4, PTR_s_No_error_00639e60 = globalThis.PTR_s_No_error_00639e60, s_(*.eml)_0062baac = globalThis.s_(*.eml)_0062baac, s_(*.hot)_0062ba98 = globalThis.s_(*.hot)_0062ba98;
const s_(*.mp)_0062ba74 = globalThis.s_(*.mp)_0062ba74, s_(*.net)_0062bac0 = globalThis.s_(*.net)_0062bac0, s_(*.sav)_0062ba84 = globalThis.s_(*.sav)_0062ba84, s_(*.scn)_0062ba60 = globalThis.s_(*.scn)_0062ba60, s_*.ALT_0062bb74 = globalThis.s_*.ALT_0062bb74, s_*.eml_0062bab8 = globalThis.s_*.eml_0062bab8;
const s_*.hot_0062baa4 = globalThis.s_*.hot_0062baa4, s_*.net_0062bacc = globalThis.s_*.net_0062bacc, s_*.sav_0062ba90 = globalThis.s_*.sav_0062ba90, s_*.scn_0062ba6c = globalThis.s_*.scn_0062ba6c, s_0,000_0062b880 = globalThis.s_0,000_0062b880, s_0,000_0062b8ec = globalThis.s_0,000_0062b8ec;
const s_0,000_0062b92c = globalThis.s_0,000_0062b92c, s_ARCHAEOLOGISTS3_0062b854 = globalThis.s_ARCHAEOLOGISTS3_0062b854, s_ARCHAEOLOGISTS_0062b840 = globalThis.s_ARCHAEOLOGISTS_0062b840, s_BEGINEVENTS_0062bbb4 = globalThis.s_BEGINEVENTS_0062bbb4, s_CENTAURI3_0062b904 = globalThis.s_CENTAURI3_0062b904, s_CENTAURI_0062b888 = globalThis.s_CENTAURI_0062b888;
const s_CENTAURI_0062b8f4 = globalThis.s_CENTAURI_0062b8f4, s_CENTAURI_BEATEN_0062b934 = globalThis.s_CENTAURI_BEATEN_0062b934, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd14 = globalThis.s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd14, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd88 = globalThis.s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd88, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062be28 = globalThis.s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062be28, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bea4 = globalThis.s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bea4;
const s_DANGERHEX_0062b980 = globalThis.s_DANGERHEX_0062b980, s_DANGER_0062b978 = globalThis.s_DANGER_0062b978, s_EMAILSAVED_0062bb4c = globalThis.s_EMAILSAVED_0062bb4c, s_EVENTS._0062bbac = globalThis.s_EVENTS._0062bbac, s_EVENTS_0062bbc0 = globalThis.s_EVENTS_0062bbc0, s_GAME._0062bae8 = globalThis.s_GAME._0062bae8;
const s_Hold_off_0062bef0 = globalThis.s_Hold_off_0062bef0, s_Hold_on_0062bee8 = globalThis.s_Hold_on_0062bee8, s_LOADBADSAVE_0062bb94 = globalThis.s_LOADBADSAVE_0062bb94, s_LOADNEWSAVE_0062bba0 = globalThis.s_LOADNEWSAVE_0062bba0, s_LOADNOTSAVE_0062bb7c = globalThis.s_LOADNOTSAVE_0062bb7c, s_LOADOK_0062bbe0 = globalThis.s_LOADOK_0062bbe0;
const s_LOADOLDSAVE_0062bb88 = globalThis.s_LOADOLDSAVE_0062bb88, s_PRETEXTALLIED_0062befc = globalThis.s_PRETEXTALLIED_0062befc, s_PRETEXT_0062bf0c = globalThis.s_PRETEXT_0062bf0c, s_Poll:_Retrieved_non-Civ_message._0062be5c = globalThis.s_Poll:_Retrieved_non-Civ_message._0062be5c, s_Poll:_Unstacking_XD_FlushSendBuf_0062bdf8 = globalThis.s_Poll:_Unstacking_XD_FlushSendBuf_0062bdf8, s_Received_unknown_message_type._0062bf14 = globalThis.s_Received_unknown_message_type._0062bf14;
const s_SAVEERROR_0062bb38 = globalThis.s_SAVEERROR_0062bb38, s_SAVEOK_0062bb58 = globalThis.s_SAVEOK_0062bb58, s_SCENOK_0062bb44 = globalThis.s_SCENOK_0062bb44, s_STACKED_DRAW_stack_full._Flushin_0062bcf0 = globalThis.s_STACKED_DRAW_stack_full._Flushin_0062bcf0, s_Stacked_Unit_in_save._Unit:_%d,_T_0062bbe8 = globalThis.s_Stacked_Unit_in_save._Unit:_%d,_T_0062bbe8, s_TITLE.GIF_0062bbc8 = globalThis.s_TITLE.GIF_0062bbc8;
const s_TITLE.GIF_0062bbd4 = globalThis.s_TITLE.GIF_0062bbd4, s_VFWNOTREGISTERED_0062b82c = globalThis.s_VFWNOTREGISTERED_0062b82c, s_VFWNOTREGISTERED_0062b8d8 = globalThis.s_VFWNOTREGISTERED_0062b8d8, s_WAITONGAMEXMIT_0062be94 = globalThis.s_WAITONGAMEXMIT_0062be94, s_WAITONGAMEXMIT_0062bed8 = globalThis.s_WAITONGAMEXMIT_0062bed8, s_\GAME_0062baf0 = globalThis.s_\GAME_0062baf0;
const s_\civ2art.dll_0062b814 = globalThis.s_\civ2art.dll_0062b814, s_\loser.avi_0062b808 = globalThis.s_\loser.avi_0062b808, s_civ2\civ2.exe_0062b894 = globalThis.s_civ2\civ2.exe_0062b894, s_civ2\civ2art.dll_0062b8bc = globalThis.s_civ2\civ2art.dll_0062b8bc, s_civ2\civ2art.dll_0062b910 = globalThis.s_civ2\civ2art.dll_0062b910, s_civ2\video\winwin.avi_0062b8a4 = globalThis.s_civ2\video\winwin.avi_0062b8a4;
const s_gNetMgr.bServer_0062bec8 = globalThis.s_gNetMgr.bServer_0062bec8, s_gNetMgr.firstStackedDraw_>=_0_&&_0062bd38 = globalThis.s_gNetMgr.firstStackedDraw_>=_0_&&_0062bd38, s_gNetMgr.lastStackedDraw_>=_0_&&_g_0062bdac = globalThis.s_gNetMgr.lastStackedDraw_>=_0_&&_g_0062bdac, s_load_gpk:_Fixing_up:_game.enemie_0062b9a0 = globalThis.s_load_gpk:_Fixing_up:_game.enemie_0062b9a0, s_load_gpk:_Fixing_up:_game.enemie_0062b9ec = globalThis.s_load_gpk:_Fixing_up:_game.enemie_0062b9ec, s_pData_!=_NULL_0062be4c = globalThis.s_pData_!=_NULL_0062be4c;


 export function FUN_004702e0 (param_1)

 {
  let pvVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_18;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004703bc;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  pvVar1 = operator_new(0x137c);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = FUN_004703d4();
  }
  local_8 = -1;
  wv(DAT_0062b804, local_18);
  if ((local_18 !== 0)) {
    iVar2 = FUN_004705d7(param_1);
    if ((iVar2 !== 0)) {
      FUN_004708db();
    }
    if ((DAT_0062b804 !== 0)) {
      FUN_00471020(1);
    }
    wv(DAT_0062b804, 0);
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004703d4 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004704d3;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_005dd010();
  local_8 = 2;
  FUN_004502b0();
  local_8 = 3;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 4);
  FUN_005bd630();
  w32((in_ECX + 0xf18), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004704ec ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004705bf;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 4;
  FUN_0047056b();
  local_8 = 3;
  FUN_0047057a();
  local_8 = 2;
  FUN_00470589();
  local_8 = 1;
  FUN_00470598();
  local_8 = (0 << 8);
  FUN_004705a7();
  local_8 = -1;
  FUN_004705b6();
  FUN_004705c9();
  return;
}


 export function FUN_0047056b ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0047057a ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00470589 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00470598 ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_004705a7 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004705b6 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_004705c9 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004705d7 (in_ECX, param_1)

 {
  let HVar1;
  let uVar2;
  let pCVar3;
  let pCVar4;
  // in_ECX promoted to parameter;
  let local_1a0;
  let local_120;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;

  FUN_005bcaa7(DAT_ffffff68);
  FUN_004aef20(DAT_ffffff7c);
  FUN_0043c840(DAT_ffffff7c, DAT_00655020);
  FUN_0043c840(DAT_ffffff7c, s_\loser.avi_0062b808);
  HVar1 = FUN_006e7b30(DAT_ffffff7c, DAT_fffffee0, 0x4000);
  if ((HVar1 === -1)) {
    uVar2 = 0;
  }
  else {
    FUN_004aef20(DAT_fffffe60);
    FUN_0043c840(DAT_fffffe60, DAT_00655020);
    FUN_0043c840(DAT_fffffe60, s_\civ2art.dll_0062b814);
    HVar1 = FUN_006e7b30(DAT_fffffe60, DAT_fffffee0, 0x4000);
    if ((HVar1 === -1)) {
      uVar2 = 0;
    }
    else {
      FUN_004502e0(DAT_fffffe60);
      if ((param_1 < 1)) {
        w32((in_ECX + 0xf18), 0, ((~param_1) + 1));
      }
      else {
        w32((in_ECX + 0xf18), 0, param_1);
      }
      FUN_005c5fc4(DAT_0062b824, 0x800, local_98, local_94, (local_90 - local_98), ((local_8c - local_94) + 5), DAT_006a8c00, DAT_006553d8);
      FUN_00419ba0(0);
      FUN_005bf5e1(0xfa0, 0xa, 0xec, (in_ECX + 0xb8));
      FUN_005dd27e(DAT_0062b828, 0x800, 0, 0);
      FUN_005dd71e(1);
      local_88 = FUN_005dd377(DAT_ffffff7c);
      if ((local_88 === 0)) {
        FUN_005c041f(0);
        FUN_00450400();
        in_ECX = (in_ECX + 0x4ec);
        FUN_006e7d90((in_ECX + 0x136c), 0x28, 0x64, 0x258, 0x1e0);
        pCVar3 = GetActiveView((in_ECX + 0x4ec));
        pCVar4 = GetActiveView((in_ECX + 0x4ec));
        FUN_005bd65c(pCVar4, pCVar3);
        FUN_005dd64c((in_ECX + 0x1324), 0, 0);
        FUN_0043c6c0(0, 0x12, 2);
        FUN_00450340();
        uVar2 = 1;
      }
      else {
        if ((local_88 === -0x7ffbfeac)) {
          FUN_00421ea0(s_VFWNOTREGISTERED_0062b82c);
        }
        uVar2 = 0;
      }
    }
  }
  return uVar2;
}


 export function FUN_004708db (in_ECX)

 {
  let iVar1;
  let uVar2;
  let pcVar3;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  FUN_0046e571(2, 1);
  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0xb8));
  FUN_004085f0();
  FUN_00419b80();
  FUN_00414ce0();
  FUN_005c19ad(0xff);
  local_c = 0;
  while ((iVar1 === 0)) {
    local_c = (local_c + 1);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_c * 0x10), 0));
  FUN_0040ff60(0, uVar2);
  FUN_006e7d58(DAT_0063cc48);
  uVar2 = FUN_00493b10(s32((in_ECX + 0xf18), 0));
  FUN_0040ff60(1, uVar2);
  for (/* cond: (local_8 < 3) */); local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
    FUN_004aef20((in_ECX + 0xf24));
    FUN_0040bbb0();
    FUN_0040bbe0(s_ARCHAEOLOGISTS_0062b840);
    FUN_0040ff30(local_8);
    iVar1 = FUN_004a2379(DAT_006558e8, DAT_00679640);
    if ((iVar1 === 0)) {
      while ((_MEM[pcVar3] !== 0x40)) {
        FUN_0043c840((in_ECX + 0xf24), DAT_00673f14);
        FUN_0043c840((in_ECX + 0xf24), DAT_0062b850);
      }
      FUN_0040bbb0();
      FUN_00426ff0((in_ECX + 0xf24), DAT_00679640);
      FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x136c), (in_ECX + 0x136c));
      FUN_006e7da4((in_ECX + 0x136c), 1, 1);
      FUN_005c19ad(0);
      FUN_005c1167((in_ECX + 0xf1c), DAT_00679640, (in_ECX + 0x136c), 0);
      FUN_006e7da4((in_ECX + 0x136c), -1, -1);
      FUN_005c19ad(0xff);
      FUN_005c1167((in_ECX + 0xf1c), DAT_00679640, (in_ECX + 0x136c), 0);
      FUN_005683c5((in_ECX + 0x4ec), (in_ECX + 0x136c), 4, 5);
      FUN_004a2020();
      FUN_0046e287(0x168);
    }
  }
  FUN_005dd3c2();
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
  return;
}


 export function FUN_00470c0c ()

 {
  return;
}


 export function FUN_00470c1c ()

 {
  let iVar1;
  let pcVar2;

  FUN_004aef20((DAT_0062b804 + 0xf24));
  FUN_0040bbb0();
  iVar1 = FUN_004a2379(DAT_006558e8, s_ARCHAEOLOGISTS3_0062b854);
  if ((iVar1 === 0)) {
    while ((_MEM[pcVar2] === 0x40)) {
      pcVar2 = FUN_004a23fc(1);
      if ((_MEM[pcVar2] === 0x40));
      FUN_0043c840((DAT_0062b804 + 0xf24), DAT_0062b864);
    }
    FUN_00426ff0((DAT_0062b804 + 0xf24), DAT_00679640);
    FUN_006e7d5c(DAT_00679640);
    FUN_004086c0((DAT_0062b804 + 0x136c), 0xe5, 0x4c, 0xc8, 0x85);
    FUN_005c19ad(0);
    FUN_005c1167((DAT_0062b804 + 0xf1c), DAT_00679640, (DAT_0062b804 + 0x136c), 0);
    FUN_005683c5((DAT_0062b804 + 0x4ec), (DAT_0062b804 + 0x136c), 4, 5);
    FUN_004a2020();
  }
  FUN_0046e287(0x168);
  wv(DAT_0062b804, (DAT_0062b804 + 0x534));
  return;
}


 export function FUN_00471020 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004704ec();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* class */  /* CRichEditView */  /* * */  /* __thiscall */
 /* CRichEditCntrItem::GetActiveView(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetActiveView (this)

 {
  let pCVar1;

  pCVar1 = GetActiveView(this);
  return pCVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* class */  /* CRichEditView */  /* * */  /* __thiscall */
 /* CRichEditCntrItem::GetActiveView(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetActiveView (this)

 {
  let pCVar1;

  pCVar1 = GetActiveView(this);
  return pCVar1;
}


 export function FUN_004710d0 (param_1)

 {
  let pvVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_30c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0047134a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((param_1 < 0)) {
    FUN_00471dd8(param_1);
    FUN_00471354();
    return;
  }
  FUN_0046e6a9();
  pvVar1 = operator_new(0x137c);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_30c = 0;
  }
  else {
    local_30c = FUN_00471362();
  }
  local_8 = -1;
  wv(DAT_0062b87c, local_30c);
  if ((local_30c === 0)) {
    FUN_00471354();
    return;
  }
  iVar2 = FUN_00471565(param_1);
  if ((iVar2 === 0)) {
    FUN_0040bbb0();
    FUN_00421f10(((s16((DAT_0064caa4 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_0040ff60(0, DAT_00679640);
    FUN_0040bbb0();
    FUN_0040ff30(((s16((DAT_0064caa6 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_0040bbe0(s_0,000_0062b880);
    FUN_0040ff60(1, DAT_00679640);
    uVar3 = FUN_00410070(param_1);
    FUN_0040ff60(2, uVar3);
    FUN_0040bbb0();
    FUN_00421f10(((s16((DAT_0064caa2 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_00421da0(3, ((s16((DAT_0064caa2 + param_1 * 0x594), 0)) << 16 >> 16));
    uVar3 = FUN_00493b10(param_1);
    FUN_0040ff60(4, uVar3);
    FUN_0059db08(0x4000);
    local_8 = 1;
    FUN_0043c9d0(s_CENTAURI_0062b888);
    FUN_0059ec88(DAT_0063fc58, 0, 0);
    FUN_0040bc80(0);
    local_8 = -1;
    FUN_0047132e();
  }
  else {
    FUN_00471856();
  }
  if ((DAT_0062b87c !== 0)) {
    FUN_004728c0(1);
  }
  wv(DAT_0062b87c, 0);
  FUN_00471354();
  return;
}


 export function FUN_0047132e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00471354 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00471362 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00471461;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_005dd010();
  local_8 = 2;
  FUN_004502b0();
  local_8 = 3;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 4);
  FUN_005bd630();
  w32((in_ECX + 0xf18), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0047147a ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0047154d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 4;
  FUN_004714f9();
  local_8 = 3;
  FUN_00471508();
  local_8 = 2;
  FUN_00471517();
  local_8 = 1;
  FUN_00471526();
  local_8 = (0 << 8);
  FUN_00471535();
  local_8 = -1;
  FUN_00471544();
  FUN_00471557();
  return;
}


 export function FUN_004714f9 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00471508 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00471517 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00471526 ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_00471535 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00471544 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_00471557 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00471565 (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  let pCVar3;
  let pCVar4;
  // in_ECX promoted to parameter;
  let local_118;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;

  if ((param_1 < 1)) {
    w32((in_ECX + 0xf18), 0, ((~param_1) + 1));
  }
  else {
    w32((in_ECX + 0xf18), 0, param_1);
  }
  FUN_005bcaa7(DAT_ffffff68);
  FUN_00564470(s_civ2\civ2.exe_0062b894);
  FUN_004aef20(DAT_ffffff7c);
  FUN_0043c840(DAT_ffffff7c, s_civ2\video\winwin.avi_0062b8a4);
  iVar1 = FUN_00564713(DAT_ffffff7c);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else {
    FUN_004aef20(DAT_fffffee8);
    FUN_0043c840(DAT_fffffee8, s_civ2\civ2art.dll_0062b8bc);
    iVar1 = FUN_00564713(DAT_fffffee8);
    if ((iVar1 === 0)) {
      uVar2 = 0;
    }
    else {
      FUN_004502e0(DAT_fffffee8);
      FUN_005c5fc4(DAT_0062b8d0, 0x800, local_98, local_94, (local_90 - local_98), ((local_8c - local_94) + 5), DAT_006a8c00, DAT_006553d8);
      FUN_00419ba0(0);
      FUN_005bf5e1(0x7d0, 0xa, 0xec, (in_ECX + 0xb8));
      FUN_005dd27e(DAT_0062b8d4, 0x800, 0, 0);
      FUN_005dd71e(1);
      local_88 = FUN_005dd377(DAT_ffffff7c);
      if ((local_88 === 0)) {
        FUN_005c041f(0);
        FUN_00450400();
        in_ECX = (in_ECX + 0x4ec);
        FUN_00472910(LAB_00401d43, 0x2ab);
        FUN_006e7d90((in_ECX + 0x136c), 2, 0x64, 0x27e, 0x1e0);
        pCVar3 = GetActiveView((in_ECX + 0x4ec));
        pCVar4 = GetActiveView((in_ECX + 0x4ec));
        FUN_005bd65c(pCVar4, pCVar3);
        FUN_005dd64c((in_ECX + 0x1324), 0, 0);
        FUN_0043c6c0(0, 0x12, 3);
        FUN_00450340();
        uVar2 = 1;
      }
      else {
        if ((local_88 === -0x7ffbfeac)) {
          FUN_00421ea0(s_VFWNOTREGISTERED_0062b8d8);
        }
        uVar2 = 0;
      }
    }
  }
  return uVar2;
}


 export function FUN_00471856 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let pcVar3;
  // in_ECX promoted to parameter;
  let local_8;

  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0xb8));
  FUN_004085f0();
  FUN_00419b80();
  FUN_00414ce0();
  FUN_005c19ad(0xff);
  FUN_004aef20((in_ECX + 0xf24));
  FUN_0040bbb0();
  FUN_00421f10(((s16((DAT_0064caa4 + s32((in_ECX + 0xf18), 0) * 0x594), 0)) << 16 >> 16));
  FUN_0040ff60(0, DAT_00679640);
  FUN_0040bbb0();
  FUN_0040ff30(((s16((DAT_0064caa6 + s32((in_ECX + 0xf18), 0) * 0x594), 0)) << 16 >> 16));
  FUN_0040bbe0(s_0,000_0062b8ec);
  FUN_0040ff60(1, DAT_00679640);
  uVar1 = FUN_00410070(s32((in_ECX + 0xf18), 0));
  FUN_0040ff60(2, uVar1);
  FUN_0040bbb0();
  FUN_00421f10(((s16((DAT_0064caa2 + s32((in_ECX + 0xf18), 0) * 0x594), 0)) << 16 >> 16));
  FUN_0040ff60(3, DAT_00679640);
  uVar1 = FUN_00493b10(s32((in_ECX + 0xf18), 0));
  FUN_0040ff60(4, uVar1);
  for (/* cond: (local_8 < 3) */); local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
    FUN_004aef20((in_ECX + 0xf24));
    FUN_0040bbb0();
    FUN_0040bbe0(s_CENTAURI_0062b8f4);
    FUN_0040ff30(local_8);
    iVar2 = FUN_004a2379(DAT_006558e8, DAT_00679640);
    if ((iVar2 === 0)) {
      while ((_MEM[pcVar3] === 0x40)) {
        pcVar3 = FUN_004a23fc(1);
        if ((_MEM[pcVar3] === 0x40));
        FUN_0043c840((in_ECX + 0xf24), DAT_0062b900);
      }
      FUN_0040bbb0();
      FUN_00426ff0((in_ECX + 0xf24), DAT_00679640);
      FUN_005c0593((in_ECX + 0x4ec), (in_ECX + 0x136c), (in_ECX + 0x136c));
      FUN_006e7da4((in_ECX + 0x136c), 1, 1);
      FUN_005c19ad(0);
      FUN_005c1167((in_ECX + 0xf1c), DAT_00679640, (in_ECX + 0x136c), 0);
      FUN_006e7da4((in_ECX + 0x136c), -1, -1);
      FUN_005c19ad(0xf1);
      FUN_005c1167((in_ECX + 0xf1c), DAT_00679640, (in_ECX + 0x136c), 0);
      FUN_005683c5((in_ECX + 0x4ec), (in_ECX + 0x136c), 4, 5);
      FUN_004a2020();
      FUN_0046e287(0x168);
    }
  }
  FUN_005dd3c2();
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x534);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x534);
  FUN_00414d40();
  FUN_004503d0();
  FUN_00419b80();
  FUN_004503d0();
  FUN_00450390(DAT_006a8c00);
  FUN_00419b80();
  return;
}


 export function FUN_00471bfe ()

 {
  return;
}


 export function FUN_00471c14 ()

 {
  return;
}


 export function FUN_00471c2a ()

 {
  let iVar1;
  let pcVar2;
  let uVar3;
  let extraout_EAX;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  w32((DAT_0062b87c + 0xa98), 0, 0);
  FUN_004aef20((DAT_0062b87c + 0xf24));
  FUN_0040bbb0();
  iVar1 = FUN_004a2379(DAT_006558e8, s_CENTAURI3_0062b904);
  if ((iVar1 === 0)) {
    local_1c = 0xc;
    FUN_005baec8((DAT_0062b87c + 0xf1c));
    FUN_005baeb0((DAT_0062b87c + 0x4ec));
    FUN_005baee0(0xff, 0, 1, 1);
    while ((_MEM[pcVar2] === 0x40)) {
      pcVar2 = FUN_004a23fc(1);
      if ((_MEM[pcVar2] === 0x40));
      FUN_0043c840((DAT_0062b87c + 0xf24), DAT_00673f14);
      FUN_00426ff0((DAT_0062b87c + 0xf24), DAT_00679640);
      uVar3 = FUN_00407f90((DAT_0062b87c + 0x136c));
      FUN_0043c910(DAT_00679640, s32((DAT_0062b87c + 0x136c), 0), local_1c, uVar3);
      wv(DAT_0062b87c, (DAT_0062b87c + 0xf1c));
      local_1c = (local_1c + extraout_EAX);
    }
    local_14 = s32((DAT_0062b87c + 0x136c), 0);
    local_c = s32((DAT_0062b87c + 0x1374), 0);
    local_10 = 0xc;
    local_8 = local_1c;
    FUN_005683c5((DAT_0062b87c + 0x4ec), DAT_ffffffec, 4, 5);
    FUN_004a2020();
  }
  return;
}


 export function FUN_00471db7 ()

 {
  wv(DAT_0062b87c, (DAT_0062b87c + 0x534));
  return;
}


 export function FUN_00471dd8 (param_1)

 {
  let iVar1;
  let uVar2;
  let pcVar3;
  let unaff_FS_OFFSET;
  let local_808;
  let local_63c;
  let local_62c;
  let local_628;
  let local_5e0;
  let local_5d8;
  let local_4d4;
  let local_4d0;
  let local_4cc;
  let local_4c8;
  let local_4c4;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004723db;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_004502b0();
  local_8 = 1;
  FUN_0044c730();
  local_8 = 2;
  FUN_005c64da();
  local_8 = 3;
  FUN_005bd630();
  local_8 = 4;
  FUN_0043c690();
  local_8 = 5;
  if ((param_1 < 1)) {
    param_1 = ((~param_1) + 1);
  }
  FUN_0043c6c0(0, 0x12, 3);
  FUN_004aef20(DAT_fffffb3c);
  FUN_0043c840(DAT_fffffb3c, s_civ2\civ2art.dll_0062b910);
  iVar1 = FUN_00564713(DAT_fffffb3c);
  if ((iVar1 !== 0)) {
    FUN_004502e0(DAT_fffffb3c);
    FUN_005bcaa7(DAT_fffffb2c);
    FUN_006e7d90(DAT_fffff9c4, 0, 0, 0x280, 0xf0);
    FUN_006e7d60(DAT_fffff9c4, -10, 0);
    FUN_005c5fc4(DAT_0062b924, 0x800, local_4d4, local_4d0, (local_4cc - local_4d4), ((local_4c8 - local_4d0) + 5), DAT_006a8c00, DAT_006553d8);
    FUN_00419ba0(0);
    FUN_005bb3f0(DAT_0062b928, 0x800, 0, 0, 0x280, 0xf0, DAT_fffffbbc);
    FUN_005bf5e1(0x7530, 0xa, 0xec, DAT_fffffbbc);
    FUN_00450400();
    FUN_005bd65c(0x280, 0xf0);
    FUN_005c0593(DAT_fffff9d8, DAT_fffff9c4, DAT_fffff9c4);
    FUN_005c0cc5(DAT_fffffbbc);
    FUN_00408650();
    FUN_00419b80();
    FUN_00450390(DAT_fffffbbc);
    FUN_004085f0();
    FUN_00419b80();
    FUN_00414ce0();
    FUN_005c19ad(0xff);
    FUN_0040bbb0();
    FUN_00421f10(((s16((DAT_0064caa4 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_0040ff60(0, DAT_00679640);
    FUN_0040bbb0();
    FUN_0040ff30(((s16((DAT_0064caa6 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_0040bbe0(s_0,000_0062b92c);
    FUN_0040ff60(1, DAT_00679640);
    uVar2 = FUN_00410070(param_1);
    FUN_0040ff60(2, uVar2);
    FUN_0040bbb0();
    FUN_00421f10(((s16((DAT_0064caa2 + param_1 * 0x594), 0)) << 16 >> 16));
    FUN_0040ff60(3, DAT_00679640);
    uVar2 = FUN_00493b10(DAT_006d1da0);
    FUN_0040ff60(4, uVar2);
    iVar1 = FUN_0040ef70();
    local_63c = ((UNNAMED + iVar1 * -2) >> 1);
    for (/* cond: (local_62c < 5) */); local_62c = (local_62c < 5); local_62c = (local_62c + 1)) {
      FUN_004aef20(DAT_fffffa28);
      FUN_0040bbb0();
      FUN_0040bbe0(s_CENTAURI_BEATEN_0062b934);
      FUN_0040ff30(local_62c);
      iVar1 = FUN_004a2379(DAT_006558e8, DAT_00679640);
      if ((iVar1 === 0)) {
        while ((_MEM[pcVar3] !== 0x40)) {
          FUN_0043c840(DAT_fffffa28, DAT_00673f14);
          FUN_0043c840(DAT_fffffa28, DAT_0062b944);
        }
        FUN_0040bbb0();
        FUN_00426ff0(DAT_fffffa28, DAT_00679640);
        FUN_005c0593(DAT_fffff7f8, DAT_fffff9c4, DAT_fffff9c4);
        FUN_006e7da4(DAT_fffff9c4, 1, 1);
        FUN_005c19ad(0);
        FUN_005c1167(DAT_fffffa20, DAT_00679640, DAT_fffff9c4, 0);
        FUN_006e7da4(DAT_fffff9c4, -1, -1);
        FUN_005c19ad(0xff);
        FUN_005c1167(DAT_fffffa20, DAT_00679640, DAT_fffff9c4, 0);
        FUN_005683c5(DAT_fffff7f8, DAT_fffff9c4, 4, 5);
        FUN_004a2020();
        FUN_0046e287(0x168);
      }
    }
    FUN_00414d40();
    FUN_004503d0();
    FUN_00419b80();
    FUN_00450390(DAT_006a8c00);
    FUN_004503d0();
    FUN_00419b80();
    FUN_00450340();
    local_8 = 4;
    FUN_00472393();
    local_8 = 3;
    FUN_0047239f();
    local_8 = 2;
    FUN_004723ab();
    local_8 = 1;
    FUN_004723b7();
    local_8 = (UNNAMED << 8);
    FUN_004723c3();
    local_8 = -1;
    FUN_004723cf();
    FUN_004723e5();
    return;
  }
  local_8 = 4;
  FUN_00472393();
  local_8 = 3;
  FUN_0047239f();
  local_8 = 2;
  FUN_004723ab();
  local_8 = 1;
  FUN_004723b7();
  local_8 = (((local_8) >> 8) << 8);
  FUN_004723c3();
  local_8 = -1;
  FUN_004723cf();
  FUN_004723e5();
  return;
}


 export function FUN_00472393 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0047239f ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004723ab ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004723b7 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_004723c3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0x4d4);
  return;
}


 export function FUN_004723cf ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_004723e5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004728c0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0047147a();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_00472910 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x118), 0, param_1);
  w32((in_ECX + 0xa20), 0, param_2);
  return;
}


 export function FUN_00472950 (param_1, param_2)

 {
  let pcVar1;

  pcVar1 = _strrchr(param_1, 0x2e);
  if ((pcVar1 === 0)) {
    FUN_005f22e0(param_1, DAT_0062b970);
    FUN_005f22e0(param_1, param_2);
  }
  __strupr(param_1);
  return;
}


 export function FUN_004729ab (param_1, param_2, param_3)

 {
  let pcVar1;

  if ((param_2 !== param_1)) {
    FUN_005f22d0(param_1, param_2);
  }
  pcVar1 = _strrchr(param_1, 0x2e);
  if ((pcVar1 !== 0)) {
    _MEM[pcVar1] = 0;
  }
  FUN_005f22e0(param_1, DAT_0062b974);
  FUN_005f22e0(param_1, param_3);
  __strupr(param_1);
  return;
}


 export function FUN_00472a60 (param_1, param_2, param_3, param_4)

 {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGER_0062b978);
  return;
}


 export function FUN_00472ab5 (param_1, param_2, param_3, param_4)

 {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGERHEX_0062b980);
  return;
}


 export function FUN_00472b0a (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_6c;
  let local_68;
  let local_64;
  let local_14;

  iVar1 = FUN_0047c3e0(param_1, param_2);
  if ((iVar1 !== 0)) {
    FUN_0047a6b0(DAT_ffffff98, DAT_ffffff94, param_1, param_2);
    uVar2 = FUN_00472cf0(0x40, ((DAT_0066ca8c) << 16 >> 16));
    uVar3 = FUN_00472cf0(0x20, ((DAT_0066ca8c) << 16 >> 16));
    FUN_004086c0(DAT_ffffffec, local_68, local_6c, uVar2, uVar3);
    __itoa(param_3, DAT_ffffff9c, 0xa);
    FUN_005c19ad(0xa);
    FUN_0043c790(DAT_ffffffec, -1, -1);
    FUN_005c1020(DAT_0066cae0, DAT_ffffff9c, DAT_ffffffec, 0);
    FUN_0043c790(DAT_ffffffec, 3, 3);
    FUN_005c1020(DAT_0066cae0, DAT_ffffff9c, DAT_ffffffec, 0);
    FUN_0043c790(DAT_ffffffec, -2, -2);
    FUN_005c19ad(param_4);
    FUN_005c1020(DAT_0066cae0, DAT_ffffff9c, DAT_ffffffec, 0);
    FUN_00408490(DAT_ffffffec);
  }
  return;
}


 export function FUN_00472cf0 (param_1, param_2)

 {
  param_1 = (param_2 + 8) * param_1;
  return ((param_1 + ((param_1 >> 0x1f) & 7)) >> 3);
}


 export function FUN_00472d20 (param_1, param_2)

 {
  wv(DAT_006660f6, param_1);
  wv(DAT_006660f7, param_2);
  wv(DAT_006660f0, 0xffce);
  wv(DAT_006660f2, 0xffce);
  wv(DAT_006660f4, 0);
  wv(DAT_00666100, 0xff);
  wv(DAT_006660f8, 0);
  wv(DAT_006660f9, 0);
  wv(DAT_006660fe, 0);
  wv(DAT_006660fd, 0);
  wv(DAT_00666106, 0xffff);
  wv(DAT_00666108, 0xffff);
  wv(DAT_006660ff, 0xff);
  wv(DAT_00666102, 0xffff);
  wv(DAT_00666104, 0xffff);
  return 0x800;
}


 export function FUN_00472e1d (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  uVar1 = FUN_00472d20(param_1, param_2);
  FUN_005b345f(uVar1, param_3, param_4, 1);
  return uVar1;
}


 export function FUN_00472e5c ()

 {
  if ((0xff < DAT_006660f7)) {
    FUN_005b4391(0x800, 1);
    wv(DAT_006660f7, 0xff);
  }
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
  FUN_00472f2a();
  FUN_00472f44();
  return;
}


 export function FUN_00472f2a ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00472f44 ()

 {
  _atexit(FUN_00472f61);
  return;
}


 export function FUN_00472f61 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00472f7b ()

 {
  let local_8;

  wv(DAT_0066c600, ((DAT_00655280) & 0xFFFF));
  FUN_0047314e(DAT_00655284, DAT_0066c602);
  FUN_0047314e(DAT_00655294, DAT_0066c60a);
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    FUN_0047314e((DAT_006552a4 + local_8 * 0x10), (local_8 * 8 + 0x66c612));
  }
  FUN_0047314e(DAT_00655324, DAT_0066c652);
  FUN_0047314e(DAT_00655334, DAT_0066c65a);
  FUN_0047314e(DAT_00655344, DAT_0066c662);
  return;
}


 export function FUN_00473064 ()

 {
  let local_8;

  wv(DAT_00655280, ((DAT_0066c600) << 16 >> 16));
  FUN_00473190(DAT_0066c602, DAT_00655284);
  FUN_00473190(DAT_0066c60a, DAT_00655294);
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    FUN_00473190((local_8 * 8 + 0x66c612), (DAT_006552a4 + local_8 * 0x10));
  }
  FUN_00473190(DAT_0066c652, DAT_00655324);
  FUN_00473190(DAT_0066c65a, DAT_00655334);
  FUN_00473190(DAT_0066c662, DAT_00655344);
  return;
}


 export function FUN_0047314e (param_1, param_2)

 {
  w16(param_2, 0, ((s32(param_1, 0)) & 0xFFFF));
  w16(param_2, 2, ((s32(param_1, 2)) & 0xFFFF));
  w16(param_2, 1, ((s32(param_1, 1)) & 0xFFFF));
  w16(param_2, 3, ((s32(param_1, 3)) & 0xFFFF));
  return;
}


 export function FUN_00473190 (param_1, param_2)

 {
  w32(param_2, 0, ((s16(param_1, 0)) << 16 >> 16));
  w32(param_2, 2, ((s16(param_1, 2)) << 16 >> 16));
  w32(param_2, 1, ((s16(param_1, 1)) << 16 >> 16));
  w32(param_2, 3, ((s16(param_1, 3)) << 16 >> 16));
  return;
}


 export function FUN_004731d2 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let BVar2;
  let local_58;
  let local_54;
  let local_50;
  let local_48;
  let local_3c;
  let local_38;
  let local_34;
  let local_24;
  let local_20;
  let local_18;

  _memset(DAT_ffffffac, 0, 0x4c);
  local_54 = 0x4c;
  local_50 = 0;
  if ((param_1 !== 0)) {
    iVar1 = FUN_00414d10();
    local_50 = s32((iVar1 + 4), 0);
  }
  local_48 = param_4;
  local_3c = 1;
  local_38 = param_3;
  local_34 = 0x100;
  local_24 = param_2;
  local_18 = param_5;
  if ((param_6 === 0)) {
    local_20 = 0x80e;
  }
  else {
    local_20 = 0x180e;
  }
  if ((param_7 === 0)) {
    BVar2 = GetOpenFileNameA(DAT_ffffffac);
    local_58 = ((BVar2) & 0xFF);
  }
  else {
    BVar2 = GetSaveFileNameA(DAT_ffffffac);
    local_58 = ((BVar2) & 0xFF);
  }
  if ((!(local_58 === 1))) {
    CommDlgExtendedError();
  }
  return (local_58 === 1);
}


 export function FUN_004732a6 (param_1, param_2)

 {
  let sVar1;
  let local_8;

  if ((param_1 < 0x2a)) {
    if ((param_1 === 0x29)) {
      for (/* cond: (local_8 < ((DAT_00655b16) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
        sVar1 = _fread((DAT_006560f0 + local_8 * 0x20), 0x1e, 1, param_2);
        if ((sVar1 === 0)) {
          return 0;
        }
      }
      if ((sVar1 === 0)) {
        return 0;
      }
      for (/* cond: (local_8 < ((DAT_00655b16) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
        if ((s32((DAT_0065610a + local_8 * 0x20), 0) !== 0)) {
          w32((DAT_0065610a + local_8 * 0x20), 0, DAT_00627fd8);
          wv(DAT_00627fd8, (DAT_00627fd8 + 1));
        }
      }
      for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
        if ((s32((DAT_0064f394 + local_8 * 0x58), 0) !== 0)) {
          w32((DAT_0064f394 + local_8 * 0x58), 0, DAT_00627fdc);
          wv(DAT_00627fdc, (DAT_00627fdc + 1));
        }
      }
    }
    else {
      for (/* cond: (local_8 < ((DAT_00655b16) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
        sVar1 = _fread((DAT_006560f0 + local_8 * 0x20), 0x1a, 1, param_2);
        if ((sVar1 === 0)) {
          return 0;
        }
      }
      for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
        sVar1 = _fread((DAT_0064f340 + local_8 * 0x58), 0x54, 1, param_2);
        if ((sVar1 === 0)) {
          return 0;
        }
      }
      for (/* cond: (local_8 < ((DAT_00655b16) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
        w32((DAT_0065610a + local_8 * 0x20), 0, DAT_00627fd8);
        wv(DAT_00627fd8, (DAT_00627fd8 + 1));
      }
      for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
        w32((DAT_0064f394 + local_8 * 0x58), 0, DAT_00627fdc);
        wv(DAT_00627fdc, (DAT_00627fdc + 1));
      }
    }
  }
  else {
    if ((sVar1 === 0)) {
      return 0;
    }
    if ((sVar1 === 0)) {
      return 0;
    }
    for (/* cond: (local_8 < ((DAT_00655b16) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
      if ((s32((DAT_0065610a + local_8 * 0x20), 0) !== 0)) {
        w32((DAT_0065610a + local_8 * 0x20), 0, DAT_00627fd8);
        wv(DAT_00627fd8, (DAT_00627fd8 + 1));
      }
    }
    for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
      if ((s32((DAT_0064f394 + local_8 * 0x58), 0) !== 0)) {
        w32((DAT_0064f394 + local_8 * 0x58), 0, DAT_00627fdc);
        wv(DAT_00627fdc, (DAT_00627fdc + 1));
      }
    }
  }
  return 1;
}


 export function FUN_00473660 (param_1, param_2)

 {
  let sVar1;
  let iVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 < 0x28)) {
    if ((param_1 !== 0x27)) {
      return 0;
    }
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      for (/* cond: (local_10 < 0x3e) */); local_10 = (local_10 < 0x3e); local_10 = (local_10 + 1)) {
        _MEM[DAT_0064c778 + (local_c * 0x594 + local_10)] = 0;
        _MEM[DAT_0064c7b6 + (local_c * 0x594 + local_10)] = 0;
        _MEM[DAT_0064c7f4 + (local_c * 0x594 + local_10)] = 0;
      }
    }
    for (/* cond: (local_10 < 0x64) */); local_10 = (local_10 < 0x64); local_10 = (local_10 + 1)) {
      _MEM[DAT_00655b1e + local_10] = 0;
      _MEM[DAT_00655b82 + local_10] = 0;
      for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
        _MEM[DAT_0064c714 + (local_c * 0x594 + local_10)] = 0;
      }
    }
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      for (/* cond: (local_10 < 0xd) */); local_10 = (local_10 < 0xd); local_10 = (local_10 + 1)) {
        _MEM[DAT_0064c6f8 + (local_c * 0x594 + local_10)] = 0;
      }
    }
    sVar1 = _fread(DAT_00655ae8, 0x36, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    sVar1 = _fread(DAT_00655b1e, 0x5d, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    sVar1 = _fread(DAT_00655b82, 0x5d, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    sVar1 = _fread(DAT_00655be6, 0x4c, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    iVar2 = FUN_005ae006(DAT_00655b0a);
    local_14 = (iVar2 - 1);
    if (((DAT_00655b0a & 1) !== 0)) {
      local_14 = (iVar2 - 2);
    }
    if ((u8(DAT_00655b0d) !== local_14)) {
      FUN_005d22b7(s_load_gpk:_Fixing_up:_game.enemie_0062b9ec, DAT_00655b0d, DAT_00655b0a);
      wv(DAT_00655b0d, ((local_14) & 0xFF));
    }
    sVar1 = _fread(DAT_0064bcf8, 0x790, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      sVar1 = _fread((DAT_0064c6a0 + local_10 * 0x594), 0x58, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c6f8 + local_10 * 0x594), 0xc, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c706 + local_10 * 0x594), 0xe, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c714 + local_10 * 0x594), 0x5d, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c778 + local_10 * 0x594), 0x36, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c7b6 + local_10 * 0x594), 0x36, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c7f4 + local_10 * 0x594), 0x36, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread(DAT_fffffff8, 1, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
      sVar1 = _fread((DAT_0064c832 + local_10 * 0x594), 0x402, 1, param_2);
      if ((sVar1 === 0)) {
        return 0;
      }
    }
  }
  else {
    sVar1 = _fread(DAT_00655ae8, 0x14a, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    iVar2 = FUN_005ae006(DAT_00655b0a);
    local_14 = (iVar2 - 1);
    if (((DAT_00655b0a & 1) !== 0)) {
      local_14 = (iVar2 - 2);
    }
    if ((u8(DAT_00655b0d) !== local_14)) {
      FUN_005d22b7(s_load_gpk:_Fixing_up:_game.enemie_0062b9a0, DAT_00655b0d, DAT_00655b0a);
      wv(DAT_00655b0d, ((local_14) & 0xFF));
    }
    sVar1 = _fread(DAT_0064bcf8, 0x790, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
    sVar1 = _fread(DAT_0064c6a0, 0x2ca0, 1, param_2);
    if ((sVar1 === 0)) {
      return 0;
    }
  }
  return 1;
}


 export function FUN_00473c12 (param_1, param_2)

 {
  let iVar1;
  let uVar2;

  iVar1 = _fputs(param_1, param_2);
  if ((iVar1 === -1)) {
    uVar2 = -1;
  }
  else {
    iVar1 = _fputc(0, param_2);
    if ((iVar1 === -1)) {
      uVar2 = -1;
    }
    else {
      uVar2 = 0;
    }
  }
  return uVar2;
}


 export function FUN_00473c68 (param_1)

 {
  let pcVar1;
  let iVar2;
  let iVar3;
  let sVar4;
  let local_114;
  let local_110;
  let local_c;
  let local_8;

  local_114 = 0;
  do {
    local_c = _fgetc(param_1);
    iVar3 = local_c;
    if ((local_c === -1)) {
      return 0;
    }
    if ((0xfe < local_114));
    _MEM[DAT_fffffef0 + local_114] = ((local_c) & 0xFF);
    local_c = iVar3;
    pcVar1 = (DAT_fffffef0 + local_114);
    local_114 = iVar2;
  } while ((_MEM[DAT_fffffef0 + local_114] !== 0));
  _MEM[DAT_fffffef0 + local_114] = 0;
  sVar4 = _strlen(DAT_fffffef0);
  local_8 = FUN_00498159(DAT_0064b984, (sVar4 + 1));
  if ((local_8 === 0)) {
    FUN_00589ef8(-9, 3, 0, 0, 0);
    local_8 = 0;
  }
  else {
    FUN_005f22d0(local_8, DAT_fffffef0);
  }
  return local_8;
}


 export function FUN_00473d5e (param_1)

 {
  if ((param_1 === 0)) {
    if ((DAT_00655b02 === 0)) {
      FUN_005f22d0(DAT_0066c4e8, DAT_0062ba40);
    }
    else if ((DAT_00655b02 === 1)) {
      FUN_005f22d0(DAT_0066c4e8, DAT_0062ba48);
    }
    else if ((DAT_00655b02 === 2)) {
      FUN_005f22d0(DAT_0066c4e8, DAT_0062ba50);
    }
    else if ((DAT_00655b02 === 6)) {
      FUN_005f22d0(DAT_0066c4e8, DAT_0062ba58);
    }
  }
  else {
    FUN_005f22d0(DAT_0066c4e8, DAT_0062ba38);
  }
  return;
}


 export function FUN_00473e55 (param_1, param_2, param_3)

 {
  let sVar1;
  let local_8;

  if ((param_2 === 0)) {
    if ((param_3 === 0)) {
      _memset(DAT_0066c4f8, 0, 0x104);
      local_8 = FUN_00473ff2(DAT_00655b02, DAT_0066c4f8);
      if ((param_1 === 0)) {
        if ((DAT_00655b02 !== 0)) {
          local_8 = FUN_00473ff2(0, local_8);
        }
        if ((DAT_00655b02 < 3)) {
          local_8 = FUN_00473ff2(3, local_8);
        }
        if ((DAT_00655b02 !== 1)) {
          FUN_00473ff2(1, local_8);
        }
      }
    }
    else {
      _memset(DAT_0066c4f8, 0, 0x104);
      FUN_004af14b(DAT_0066c4f8, 0x105);
      FUN_005f22e0(DAT_0066c4f8, s_(*.mp)_0062ba74);
      sVar1 = _strlen(DAT_0066c4f8);
      FUN_005f22e0((sVar1 + 0x66c4f9), DAT_0062ba7c);
    }
  }
  else {
    _memset(DAT_0066c4f8, 0, 0x104);
    FUN_004af14b(DAT_0066c4f8, 0x19f);
    FUN_005f22e0(DAT_0066c4f8, s_(*.scn)_0062ba60);
    sVar1 = _strlen(DAT_0066c4f8);
    FUN_005f22e0((sVar1 + 0x66c4f9), s_*.scn_0062ba6c);
  }
  return DAT_0066c4f8;
}


 export function FUN_00473ff2 (param_1, param_2)

 {
  let sVar1;

  /* switch */ () {
  case 0 :
    FUN_004af14b(param_2, 0xee);
    FUN_005f22e0(param_2, s_(*.sav)_0062ba84);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    FUN_005f22e0(param_2, s_*.sav_0062ba90);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    break;
  case 1 :
    FUN_004af14b(param_2, 0x357);
    FUN_005f22e0(param_2, s_(*.hot)_0062ba98);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    FUN_005f22e0(param_2, s_*.hot_0062baa4);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    break;
  case 2 :
    FUN_004af14b(param_2, 0x35a);
    FUN_005f22e0(param_2, s_(*.eml)_0062baac);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    FUN_005f22e0(param_2, s_*.eml_0062bab8);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    break;
  case 3 :
  case 4 :
  case 5 :
  case 6 :
    FUN_004af14b(param_2, 0x35d);
    FUN_005f22e0(param_2, s_(*.net)_0062bac0);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    FUN_005f22e0(param_2, s_*.net_0062bacc);
    sVar1 = _strlen(param_2);
    param_2 = (param_2 + (sVar1 + 1));
    break;
  default :
    param_2 = 0;
  }
  return param_2;
}


 export function FUN_004741be (param_1, param_2)

 {
  let pcVar1;
  let sVar2;
  let iVar3;
  let local_130;
  let local_12c;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;

  local_118 = 1;
  if ((DAT_00655b02 === 1)) {
    local_114 = DAT_00655b0b;
    wv(DAT_00655b0b, DAT_006c31a9);
  }
  FUN_00473d5e(param_2);
  FUN_005f22d0(DAT_fffffef8, param_1);
  pcVar1 = _strchr(DAT_fffffef8, 0x2e);
  if ((pcVar1 === 0)) {
    FUN_005f22e0(DAT_fffffef8, DAT_0066c4e8);
  }
  local_11c = _fopen(DAT_fffffef8, DAT_0062bad4);
  if ((local_11c !== 0)) {
    FUN_00497e0f(PTR_s_CIVILIZE_0062b990, local_11c);
    wv(DAT_00655b04, None);
    local_110 = 0x2c;
    sVar2 = _fwrite(DAT_fffffef0, 2, 1, local_11c);
    if ((sVar2 !== 0)) {
      if ((param_2 === 0)) {
        wv(DAT_00655af0, (DAT_00655af0 & 0xffbf));
      }
      else {
        wv(DAT_00655af0, (DAT_00655af0 | 0x40));
        for (/* cond: (local_124 < 0x64) */); local_124 = (local_124 < 0x64); local_124 = (local_124 + 1)) {
          _MEM[DAT_00655b82 + local_124] = 0;
          for (/* cond: (local_128 < 8) */); local_128 = (local_128 < 8); local_128 = (local_128 + 1)) {
            iVar3 = FUN_004bd9f0(local_128, local_124);
            if ((iVar3 !== 0)) {
              _MEM[DAT_00655b82 + local_124] = (_MEM[DAT_00655b82 + local_124] | (((1 << (((local_128) & 0xFF) & 0x1f))) & 0xFF));
            }
          }
          if ((_MEM[DAT_00655b82 + local_124] !== 0)) {
            iVar3 = FUN_005ae006(s8(_MEM[DAT_00655b82 + local_124]));
            if ((iVar3 === 1)) {
              for (/* cond: (local_128 < 8) */); local_128 = (local_128 < 8); local_128 = (local_128 + 1)) {
                iVar3 = FUN_004bd9f0(local_128, local_124);
                if ((iVar3 !== 0)) {
                  _MEM[DAT_00655b1e + local_124] = ((local_128) & 0xFF);
                }
              }
            }
            else {
              _MEM[DAT_00655b1e + local_124] = 8;
            }
          }
        }
        for (/* cond: (local_128 < 8) */); local_128 = (local_128 < 8); local_128 = (local_128 + 1)) {
          w16((DAT_0064c6a0 + local_128 * 0x594), 0, (s16((DAT_0064c6a0 + local_128 * 0x594), 0) & 0xff96));
        }
      }
      if (((DAT_00655af0 & 0x80) !== 0)) {
        for (/* cond: (local_128 < 8) */); local_128 = (local_128 < 8); local_128 = (local_128 + 1)) {
          if ((0xffff < s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            FUN_004aef20((DAT_0064bd2a + local_128 * 0xf2));
            FUN_004af122((DAT_0064bd2a + local_128 * 0xf2), ((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16))
            ;
          }
          if ((0xffff < s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            FUN_004aef20((DAT_0064bd12 + local_128 * 0xf2));
            FUN_004af122((DAT_0064bd12 + local_128 * 0xf2), ((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16))
            ;
          }
          if ((0xffff < s16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
            FUN_004aef20((DAT_0064bcfa + local_128 * 0xf2));
            FUN_004af122((DAT_0064bcfa + local_128 * 0xf2), ((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_128 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16))
            ;
          }
        }
      }
      sVar2 = _fwrite(DAT_00655ae8, 0x14a, 1, local_11c);
      if ((sVar2 !== 0)) {
        for (/* cond: (local_10c < 0x15) */); local_10c = (local_10c < 0x15); local_10c = (local_10c + 1)) {
          sVar2 = _fwrite((DAT_006554fb + local_10c * 0x30), 1, 1, local_11c);
          if ((sVar2 === 0));
        if ((sVar2 !== 0)) {
          if ((DAT_00655b02 === 0)) {
            sVar2 = _fwrite((DAT_006554f8 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0x30, 1, local_11c);
            if ((sVar2 === 0)) {
            local_128 = s8(DAT_00655b03);
            for (/* cond: (local_10c < 8) */); local_10c = (local_10c < 8); local_10c = (local_10c + 1)) {
              if ((((1 << (((local_10c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                wv(DAT_00655b03, ((local_10c) & 0xFF));
                sVar2 = _fwrite((DAT_006554f8 + ((s16((DAT_0064c6a6 + s8(((local_10c) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0x30, 1, local_11c);
                if ((sVar2 === 0)) {
                  wv(DAT_00655b03, ((local_128) & 0xFF));
                  goto LAB_0047530a;
                }
              }
            }
            wv(DAT_00655b03, ((local_128) & 0xFF));
          }
          sVar2 = _fwrite(DAT_00655c38, 0x4b0, 1, local_11c);
          if ((sVar2 !== 0)) {
            wv(DAT_00655284, DAT_006ab180);
            wv(DAT_00655288, DAT_006ab184);
            wv(DAT_0065528c, DAT_006ab188);
            wv(DAT_00655290, DAT_006ab18c);
            FUN_00472f7b();
            sVar2 = _fwrite(DAT_0066c600, 0x6a, 1, local_11c);
            if ((sVar2 !== 0)) {
              for (/* cond: (local_10c < 8) */); local_10c = (local_10c < 8); local_10c = (local_10c + 1)) {
                sVar2 = _fwrite((DAT_0066ca84 + local_10c * 0x3f0), 2, 1, local_11c);
                if ((sVar2 === 0)) {
                if ((DAT_00655b02 !== 0)) {
                  local_12c = u8(DAT_00654fa4);
                  wv(DAT_00654fa4, DAT_006ad578);
                  sVar2 = _fwrite(DAT_00654b40, 0x494, 1, local_11c);
                  if ((sVar2 === 0));
                }
                if ((param_2 === 0)) {
                  iVar3 = _fputs(DAT_0062bad8, local_11c);
                  if ((iVar3 === -1));
                  for (/* cond: (local_120 !== 0) */); local_120 = (local_120 !== 0);
                      local_120 = s32((local_120 + 0x1bc), 0)) {
                    local_130 = (local_130 + 1);
                  }
                  sVar2 = _fwrite(DAT_fffffed0, 4, 1, local_11c);
                  if ((sVar2 === 0)); local_120 = (local_120 !== 0);
                      local_120 = s32((local_120 + 0x1bc), 0)) {
                    sVar2 = _fwrite(local_120, 0x1bc, 1, local_11c);
                    if ((sVar2 === 0)); local_120 = (local_120 !== 0);
                      local_120 = s32((local_120 + 0x1bc), 0)) {
                    if ((iVar3 === -1));
                    while ((s32((local_120 + (local_130 * 4 + 0x38)), 0) !== 0)) {
                      iVar3 = FUN_00473c12(s32((local_120 + (local_130 * 4 + 0x38)), 0), local_11c)
                      ;
                      if ((iVar3 === -1));
                    }
                    if ((iVar3 === -1));
              }
            }
          }
        }
      }
    }
  }
 LAB_0047530a: :
  if ((DAT_00655b02 === 1)) {
    wv(DAT_00655b0b, local_114);
  }
  if ((local_11c !== 0)) {
    _fclose(local_11c);
  }
  return local_118;
}


 export function FUN_0047543c (param_1)

 {
  let pcVar1;
  let _File;
  let iVar2;
  let sVar3;
  let local_214;
  let local_210;
  let local_20c;
  let local_108;

  local_214 = 1;
  FUN_00473d5e(0);
  FUN_005f22d0(DAT_fffffef8, param_1);
  pcVar1 = _strchr(DAT_fffffef8, 0x2e);
  if ((pcVar1 === 0)) {
    FUN_005f22e0(DAT_fffffef8, DAT_0066c4e8);
  }
  _File = _fopen(DAT_fffffef8, DAT_0062bae0);
  if ((iVar2 !== 0)) {
    iVar2 = _strcmp(PTR_s_CIVILIZE_0062b990, DAT_fffffdf4);
    if ((iVar2 === 0)) {
      sVar3 = _fread(DAT_fffffdf0, 2, 1, _File);
      if ((sVar3 !== 0)) {
        if ((UNNAMED < 0x2d)) {
          if ((UNNAMED < 0x26)) {
            local_214 = 2;
          }
          else {
            local_214 = 3;
            iVar2 = FUN_00473660(((UNNAMED) << 16 >> 16), _File);
            if ((iVar2 === 0)) {
              wv(DAT_006d1166, (DAT_00655ae8 & 0x8000));
              local_214 = 0;
            }
          }
        }
        else {
          local_214 = 4;
        }
      }
    }
    else {
      local_214 = 1;
    }
  }
  if ((_File !== 0)) {
    _fclose(_File);
  }
  return local_214;
}


 export function FUN_00475666 (param_1)

 {
  let cVar1;
  let pcVar2;
  let _File;
  let iVar3;
  let sVar4;
  let sVar5;
  let _DstBuf;
  let uVar6;
  let iVar7;
  let local_74c;
  let local_748;
  let local_744;
  let local_73c;
  let local_738;
  let local_734;
  let local_730;
  let local_728;
  let local_71c;
  let asStack_714;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_220;
  let local_21c;
  let local_218;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;

  local_338 = 1;
  local_110 = 0;
  local_334 = u8(DAT_00655b02);
  FUN_00473d5e(0);
  FUN_005f22d0(DAT_fffffde8, param_1);
  pcVar2 = _strchr(DAT_fffffde8, 0x2e);
  if ((pcVar2 === 0)) {
    FUN_005f22e0(DAT_fffffde8, DAT_0066c4e8);
  }
  _File = _fopen(DAT_fffffde8, DAT_0062bae4);
  if ((iVar3 === 0));
  if ((iVar3 !== 0)) {
    local_338 = 1;
    goto LAB_00477352;
  }
  sVar4 = _fread(DAT_fffffcd4, 2, 1, _File);
  if ((sVar4 === 0)) {
    local_338 = 4;
    goto LAB_00477352;
  }
  if (((local_32c & 0xffff) === 0x2b)) {
    local_338 = 2;
    goto LAB_00477352;
  }
  FUN_00484d52();
  FUN_005f22d0(DAT_0064bb08, param_1);
  local_10c = _strrchr(DAT_0064bb08, 0x5c);
  _MEM[local_10c] = 0;
  __chdir(DAT_0064bb08);
  FUN_005f22d0(DAT_fffffef8, s_GAME._0062bae8);
  FUN_005f22e0(DAT_fffffef8, DAT_0062cd24);
  iVar3 = FUN_00415133(DAT_fffffef8);
  if ((iVar3 === 0)) {
    FUN_005f22d0(DAT_006558e8, DAT_0062baf8);
  }
  else {
    FUN_005f22d0(DAT_006558e8, DAT_0064bb08);
    FUN_005f22e0(DAT_006558e8, s_\GAME_0062baf0);
  }
  local_10c = _strrchr(param_1, 0x5c);
  local_10c = (local_10c + 1);
  FUN_005f22d0(DAT_006ad6ae, local_10c);
  sVar4 = _strlen(DAT_00655020);
  iVar3 = __strnicmp(param_1, DAT_00655020, sVar4);
  if ((iVar3 === 0)) {
    sVar4 = _strlen(DAT_00655020);
    local_10c = (param_1 + sVar4);
    sVar4 = _strlen(local_10c);
    sVar5 = _strlen(DAT_006ad6ae);
    if ((sVar4 !== sVar5)) {
      _memset(DAT_006ad7b2, 0, 0x104);
      sVar4 = _strlen(local_10c);
      sVar5 = _strlen(DAT_006ad6ae);
      _strncpy(DAT_006ad7b2, local_10c, ((sVar4 - sVar5) - 1));
    }
  }
  __chdir(DAT_00655020);
  FUN_00484d52();
  FUN_0041e864(1);
  local_338 = 3;
  FUN_00484d52();
  iVar3 = FUN_00473660((local_32c & 0xffff), _File);
  if ((iVar3 === 0)) {
    wv(DAT_00655aea, (DAT_00655aea & -0x8001));
  }
  if (((DAT_00655af0 & 0x80) === 0)) {
    local_220 = 0;
  }
  else {
    local_220 = 1;
  }
  if ((local_220 !== 0)) {
    wv(DAT_00655af0, (DAT_00655af0 | 0x80));
  }
  if (((DAT_00655af0 & 0x40) !== 0)) {
    wv(DAT_00655aea, (DAT_00655aea & -0x8001));
    wv(DAT_00655b07, 0);
    wv(DAT_00655af0, (DAT_00655af0 & 0xffef));
  }
  wv(DAT_00655af0, (DAT_00655af0 & 0xffbf));
  iVar3 = FUN_005b8783(_File, 0);
  if ((sVar4 === 0));
  sVar4 = _fread(DAT_00666130, 0x400, 1, _File);
  if ((iVar3 === 0)); local_21c = (local_21c < 0x15); local_21c = (local_21c + 1)) {
    sVar4 = _fread((DAT_006554fb + local_21c * 0x30), 1, 1, _File);
    if ((sVar4 === 0));
  if ((sVar4 === 0)) {
    sVar4 = _fread(DAT_fffff8d8, 0x30, 1, _File);
    if ((sVar4 === 0)) {
    for (/* cond: (local_21c < 8) */); wv(DAT_00655b03, cVar1), local_21c = (local_21c < 8); local_21c = (local_21c + 1)) {
      if ((((1 << (((local_21c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        wv(DAT_00655b03, ((local_21c) & 0xFF));
        sVar4 = _fread((DAT_fffff8d8 + ((s16((DAT_0064c6a6 + s8(((local_21c) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0x30, 1, _File);
        wv(DAT_00655b03, cVar1);
        if ((sVar4 === 0));
  if ((sVar4 === 0));
  FUN_00484d52();
  for (/* cond: (local_21c < 8) */); local_21c = (local_21c < 8); local_21c = (local_21c + 1)) {
    sVar4 = _fread((DAT_0066ca84 + local_21c * 0x3f0), 2, 1, _File);
    if ((sVar4 === 0)) {
    FUN_00484cc0();
  }
  else {
    sVar4 = _fread(DAT_0064bc60, 0x64, 1, _File);
    if ((sVar4 === 0)) {
    sVar4 = _fread(DAT_00655128, 0x152, 1, _File);
    if ((sVar4 === 0)) {
    FUN_004a76f5();
  }
  wv(DAT_006d1da0, s8(DAT_00655b04));
  if ((DAT_00655b02 === 0)) {
    FUN_00498784();
    wv(DAT_00654c74, 1);
    wv(DAT_00654c76, DAT_00666548);
    wv(DAT_00654c78, DAT_0066654a);
    wv(DAT_00654c7a, DAT_0066654c);
    wv(DAT_00654fac, 0);
    wv(DAT_00654fae, 0);
    wv(DAT_0066654e, 0);
    wv(DAT_00654fa4, ((s8(DAT_00655b04)) & 0xFF));
    wv(DAT_00628048, ((s8(DAT_00655b04)) & 0xFF));
  }
  else {
    _memset(DAT_00654b40, 0, 0x494);
    sVar4 = _fread(DAT_00654b40, 0x494, 1, _File);
    if ((sVar4 === 0)) {
      wv(DAT_00654fa4, DAT_00655b05);
    }
    if ((DAT_00654fa4 === 0)) {
      for (/* cond: (local_328 < 8) */); local_328 = (local_328 < 8); local_328 = (local_328 + 1)) {
        if ((((1 << (((local_328) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
          wv(DAT_00654fa4, ((local_328) & 0xFF));
          break;
        }
      }
    }
    wv(DAT_00628048, DAT_00654fa4);
    FUN_0049882b();
  }
  wv(DAT_00627670, 0);
  sVar4 = _fread(DAT_fffffeec, 4, 1, _File);
  if ((iVar3 === 0)) {
    sVar4 = _fread(DAT_fffffcd8, 4, 1, _File);
    if ((sVar4 === 0));
    for (/* cond: (local_330 < local_328) */); local_330 = (local_330 < local_328); local_330 = (local_330 + 1)) {
      _DstBuf = FUN_004fa617();
      if ((_DstBuf === 0)) {
        FUN_00589ef8(-9, 3, 0, 0, 0);
      }
      sVar4 = _fread(_DstBuf, 0x1bc, 1, _File);
      if ((sVar4 === 0)); local_734 = (local_734 !== 0); local_734 = s32((local_734 + 0x1bc), 0)) {
      if ((s32((local_734 + 8), 0) !== 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 8), 0, uVar6);
        if ((s32((local_734 + 8), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x10), 0, uVar6);
        if ((s32((local_734 + 0x10), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x14), 0, uVar6);
        if ((s32((local_734 + 0x14), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x20), 0, uVar6);
        if ((s32((local_734 + 0x20), 0) === 0)); (local_330 = (local_330 < 0x14) && (local_734 = (local_734 + 0x38)));
          local_330 = (local_330 + 1)) {
        uVar6 = FUN_00473c68(_File);
        w32(((local_734 + 0x38) + local_330 * 4), 0, uVar6);
        if ((s32(((local_734 + 0x38) + local_330 * 4), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x88), 0, uVar6);
        if ((s32((local_734 + 0x88), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x90), 0, uVar6);
        if ((s32((local_734 + 0x90), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0xc4), 0, uVar6);
        if ((s32((local_734 + 0xc4), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0xcc), 0, uVar6);
        if ((s32((local_734 + 0xcc), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0xd4), 0, uVar6);
        if ((s32((local_734 + 0xd4), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0xdc), 0, uVar6);
        if ((s32((local_734 + 0xdc), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x13c), 0, uVar6);
        if ((s32((local_734 + 0x13c), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x140), 0, uVar6);
        if ((s32((local_734 + 0x140), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x148), 0, uVar6);
        if ((s32((local_734 + 0x148), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x174), 0, uVar6);
        if ((s32((local_734 + 0x174), 0) === 0)) {
        uVar6 = FUN_00473c68(_File);
        w32((local_734 + 0x184), 0, uVar6);
        if ((s32((local_734 + 0x184), 0) === 0));
    wv(DAT_00627670, 1);
  }
  FUN_00484d52();
  FUN_00419ed3();
  cVar1 = DAT_00655b03;
  if (((DAT_00655af0 & 0x80) === 0)) {
    if ((DAT_00655b02 === 0)) {
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      if ((UNNAMED < 0)) {
        w16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      }
      if ((UNNAMED < 0)) {
        w16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      }
      for (/* cond: (local_21c < 7) */); local_21c = (local_21c < 7); local_21c = (local_21c + 1)) {
        for (/* cond: (local_738 < 2) */); local_738 = (local_738 < 2); local_738 = (local_738 + 1)) {
          if ((s16(DAT_fffff8e4, (local_738 + (local_21c * 2 + 4))) < 0)) {
            w16((DAT_0065550c + (local_21c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_738 * 2))), 0, (-s16((DAT_0065550c + (local_21c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_738 * 2))), 0)));
          }
        }
      }
    }
    else {
      for (/* cond: (local_748 < 8) */); wv(DAT_00655b03, cVar1), local_748 = (local_748 < 8); local_748 = (local_748 + 1)) {
        if ((((1 << (((local_748) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          wv(DAT_00655b03, ((local_748) & 0xFF));
          w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(((local_748) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(((local_748) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          if ((s16(DAT_fffff8e4, ((s16((DAT_0064c6a6 + s8(((local_748) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x18) < 0)) {
            w16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(((local_748) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(((local_748) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          }
          if ((s16(DAT_fffff8e4, (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x18 + 1)) < 0)) {
            w16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
          }
          for (/* cond: (local_21c < 7) */); local_21c = (local_21c < 7); local_21c = (local_21c + 1)) {
            for (/* cond: (local_738 < 2) */); local_738 = (local_738 < 2); local_738 = (local_738 + 1)) {
              if ((s16(DAT_fffff8e4, (local_21c * 2 + (local_738 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x18 + 4)))) < 0)) {
                w16((DAT_0065550c + (local_21c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_738 * 2))), 0, (-s16((DAT_0065550c + (local_21c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_738 * 2))), 0)));
              }
            }
          }
        }
      }
    }
  }
  else {
    for (/* cond: (local_748 < 8) */); local_748 = (local_748 < 8); local_748 = (local_748 + 1)) {
      if (((s16((DAT_0064c6a0 + local_748 * 0x594), 0) & 0x200) === 0)) {
        _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30] = 0;
      }
      else {
        _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30] = 1;
      }
      _MEM[DAT_0064ca92 + local_748 * 0x594] = _MEM[DAT_0064c6a6 + local_748 * 0x594];
      if ((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30] !== 0)) {
        _MEM[DAT_0064ca92 + local_748 * 0x594] = (_MEM[DAT_0064ca92 + local_748 * 0x594] + 0x15);
      }
      if ((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0) < 1)) {
        local_74c = ((~((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_74c = ((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16);
      }
      pcVar2 = FUN_00428b0c(local_74c);
      iVar3 = _strcmp((DAT_0064bd12 + local_748 * 0xf2), pcVar2);
      if ((iVar3 === 0)) {
        for (/* cond: (local_21c < 7) */); local_21c = (local_21c < 7); local_21c = (local_21c + 1)) {
          for (/* cond: (local_738 < 2) */); local_738 = (local_738 < 2); local_738 = (local_738 + 1)) {
            w16((DAT_0065550c + (local_21c * 4 + (((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30 + local_738 * 2))), 0, ((s32((DAT_00654fe0 + (local_738 * 4 + local_21c * 8)), 0)) & 0xFFFF));
          }
        }
      }
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      w16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      w16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + local_748 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
    }
  }
  FUN_00484d52();
  for (/* cond: (local_748 < 8) */); local_748 = (local_748 < 8); local_748 = (local_748 + 1)) {
    for (/* cond: (local_730 < 0x3e) */); local_730 = (local_730 < 0x3e); local_730 = (local_730 + 1)) {
      _MEM[DAT_0064c7f4 + (local_748 * 0x594 + local_730)] = 0;
      _MEM[DAT_0064c778 + (local_748 * 0x594 + local_730)] = 0;
    }
    for (/* cond: (local_744 < ((DAT_00655b16) << 16 >> 16)) */); local_744 = (local_744 < ((DAT_00655b16) << 16 >> 16)); local_744 = (local_744 + 1)) {
      if ((s8(_MEM[DAT_006560f7 + local_744 * 0x20]) === local_748)) {
        _MEM[DAT_0064c778 + (local_748 * 0x594 + u8(_MEM[DAT_006560f6 + local_744 * 0x20]))] = (_MEM[DAT_0064c778 + (local_748 * 0x594 + u8(_MEM[DAT_006560f6 + local_744 * 0x20]))] + 1);
      }
    }
    for (/* cond: (local_73c < ((DAT_00655b18) << 16 >> 16)) */); local_73c = (local_73c < ((DAT_00655b18) << 16 >> 16)); local_73c = (local_73c + 1)) {
      if ((0xff < _MEM[DAT_0064f379 + local_73c * 0x58])) {
        _MEM[DAT_0064c7f4 + (local_748 * 0x594 + s8(_MEM[DAT_0064f379 + local_73c * 0x58]))] = (_MEM[DAT_0064c7f4 + (local_748 * 0x594 + s8(_MEM[DAT_0064f379 + local_73c * 0x58]))] + 1);
      }
    }
  }
  wv(DAT_0062ee08, -1);
  FUN_0041a046(1);
  FUN_0041a422(1);
  FUN_0041a5c4(1);
  FUN_004a2020();
  wv(DAT_00655280, 1);
  iVar3 = FUN_00407f90(DAT_00655284);
  iVar7 = FUN_00407f90(DAT_006ab180);
  if ((iVar3 === iVar7)) {
    iVar3 = FUN_00407fc0(DAT_00655284);
    iVar7 = FUN_00407fc0(DAT_006ab180);
    if ((local_220 !== 0)) {
 LAB_0047733e: :
    wv(DAT_00655280, 0);
  }
  local_338 = 0;
 LAB_00477352: :
  if ((_File !== 0)) {
    _fclose(_File);
  }
  if ((u8(DAT_00655b02) !== local_334)) {
    wv(DAT_00654c74, 1);
    if ((local_334 === 0)) {
      wv(DAT_00654fac, 0);
      wv(DAT_00654fae, 0);
    }
    wv(DAT_0066654e, 0);
    if ((DAT_00655b0b === 0)) {
      if ((((1 << (DAT_00628048 & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
        for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
          if ((((1 << (((local_330) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
            wv(DAT_00655b0b, (((1 << (((local_330) & 0xFF) & 0x1f))) & 0xFF));
            break;
          }
        }
      }
      else {
        wv(DAT_00655b0b, (((1 << (DAT_00628048 & 0x1f))) & 0xFF));
      }
    }
    if ((local_334 !== 0)) {
      wv(DAT_00655b02, ((local_334) & 0xFF));
    }
  }
  return local_338;
}


 export function FUN_0047758c (param_1)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let local_254;
  let local_250;
  let local_24c;
  let local_248;
  let local_240;
  let local_230;
  let acStack_211;
  let local_10c;
  let acStack_10b;
  let local_8;

  if ((DAT_00654fd8 !== 0)) {
    FUN_0055ae80(1);
    do {
      FUN_00473d5e(param_1);
      FUN_004aef20(DAT_fffffef4);
      FUN_004af14b(DAT_fffffef4, (((-u8((param_1 === 0))) & -0xb1) + 0x19f));
      FUN_004aef36(DAT_fffffef4);
      FUN_004af01a(DAT_fffffef4);
      FUN_0043c840(DAT_fffffef4, DAT_0062bb08);
      FUN_0043c840(DAT_fffffef4, DAT_0066c4e9);
      FUN_004af03b(DAT_fffffef4);
      sVar1 = _strlen(DAT_fffffef4);
      local_8 = (DAT_fffffef5 + sVar1);
      FUN_004aef20(local_8);
      FUN_0043c840(local_8, DAT_0062bb0c);
      FUN_0043c840(local_8, DAT_0066c4e9);
      sVar1 = _strlen(local_8);
      local_8 = (local_8 + (sVar1 + 1));
      FUN_004aef20(local_8);
      FUN_004aef20((DAT_fffffdef + 1));
      uVar2 = FUN_00493b10(DAT_006d1da0);
      FUN_005f22e0((DAT_fffffdef + 1), uVar2);
      acStack_211 = 0;
      FUN_0043c840((DAT_fffffdef + 1), DAT_0062bb10);
      local_8 = DAT_fffffdef;
      while ((_MEM[local_8 + 1] !== 0)) {
        if ((_MEM[local_8 + 1] < 0x41)) {
          _MEM[local_8 + 1] = 0x5f;
        }
      }
      FUN_0040bbb0();
      if ((DAT_00655afa < 0)) {
        FUN_0040bbe0(DAT_0062bb18);
      }
      else {
        FUN_0040bbe0(DAT_0062bb14);
      }
      FUN_004aef36((DAT_fffffdef + 1));
      sVar1 = _strlen((DAT_fffffdef + 1));
      _MEM[DAT_fffffdef + sVar1] = DAT_00679640;
      if ((DAT_00655afa < 1)) {
        local_248 = ((~((DAT_00655afa) << 16 >> 16)) + 1);
      }
      else {
        local_248 = ((DAT_00655afa) << 16 >> 16);
      }
      FUN_004af1d5((DAT_fffffdef + 1), local_248);
      if ((param_1 === 0)) {
        FUN_006e7b2c(DAT_fffffdc0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb1c);
        __itoa((UNNAMED >>> 0x10), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb20);
        __itoa(((UNNAMED) & 0xFFFF), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb24);
        __itoa((UNNAMED & 0xffff), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb28);
        __itoa((UNNAMED & 0xffff), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb2c);
        __itoa((UNNAMED >>> 0x10), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb30);
        __itoa((UNNAMED & 0xffff), DAT_fffffdd0, 0xa);
        FUN_005f22e0((DAT_fffffdef + 1), DAT_fffffdd0);
      }
      FUN_005f22e0((DAT_fffffdef + 1), DAT_0062bb34);
      FUN_005f22e0((DAT_fffffdef + 1), DAT_0066c4e9);
      __strlwr((DAT_fffffdef + 1));
      if ((DAT_0064bcb4 < 0)) {
        FUN_004aef20((DAT_fffffdef + 1));
        if (((((DAT_00655afa) << 16 >> 16) / 0xc | 0) < 1)) {
          local_24c = ((~(((DAT_00655afa) << 16 >> 16) / 0xc | 0)) + 1);
        }
        else {
          local_24c = (((DAT_00655afa) << 16 >> 16) / 0xc | 0);
        }
        FUN_004af1d5((DAT_fffffdef + 1), local_24c);
        if ((DAT_00655afa < 0)) {
          if (((((DAT_00655afa) << 16 >> 16) % 0xc) < 1)) {
            local_254 = ((~(((DAT_00655afa) << 16 >> 16) % 0xc)) + 1);
          }
          else {
            local_254 = (((DAT_00655afa) << 16 >> 16) % 0xc);
          }
          FUN_004af14b((DAT_fffffdef + 1), (0x1af - local_254));
        }
        else {
          if (((((DAT_00655afa) << 16 >> 16) % 0xc) < 1)) {
            local_250 = ((~(((DAT_00655afa) << 16 >> 16) % 0xc)) + 1);
          }
          else {
            local_250 = (((DAT_00655afa) << 16 >> 16) % 0xc);
          }
          FUN_004af14b((DAT_fffffdef + 1), (local_250 + 0x1a4));
        }
        FUN_005f22e0((DAT_fffffdef + 1), DAT_0066c4e8);
        __strlwr((DAT_fffffdef + 1));
      }
      __chdir(DAT_0064bb08);
      FUN_00473e55(1, param_1, 0);
      uVar2 = FUN_00428b0c(s32(((DAT_00628420 + 0x680) + ((-u8((param_1 === 0))) & -0xb1) * 4), 0), (DAT_fffffdef + 1), DAT_0066c4f8, DAT_0066c4e9, 0, 1);
      iVar3 = FUN_004731d2(DAT_006553d8, uVar2);
      if ((iVar3 !== 0)) {
        __chdir(DAT_00655020);
        iVar3 = FUN_004741be((DAT_fffffdef + 1), param_1);
        if ((iVar3 === 0)) {
          if ((param_1 === 0)) {
            if ((DAT_00655b02 === 2)) {
              FUN_0040ff60(0, (DAT_fffffdef + 1));
              FUN_00421ea0(s_EMAILSAVED_0062bb4c);
            }
            else {
              uVar2 = FUN_00493ba6(DAT_006d1da0);
              FUN_0040ff60(0, uVar2);
              uVar2 = FUN_00493b10(DAT_006d1da0);
              FUN_0040ff60(1, uVar2);
              uVar2 = FUN_00493c7d(DAT_006d1da0);
              FUN_0040ff60(2, uVar2);
              FUN_0040bbb0();
              FUN_00421f10(((DAT_00655afa) << 16 >> 16));
              FUN_0040ff60(3, DAT_00679640);
              FUN_004271e8(4, s32((DAT_0064ba10 + u8(DAT_00655b08) * 4), 0));
              FUN_00421ea0(s_SAVEOK_0062bb58);
            }
          }
          else {
            FUN_0040ff60(0, DAT_0064bc62);
            FUN_00421ea0(s_SCENOK_0062bb44);
          }
        }
        else {
          FUN_00421d60(0, s32(PTR_s_No_error_00639e60, DAT_00639f14));
          FUN_00421ea0(s_SAVEERROR_0062bb38);
        }
        break;
      }
      __chdir(DAT_00655020);
    } while ((DAT_00655b02 === 2));
    FUN_0055b046(1);
  }
  return;
}


 export function FUN_00477d8c (param_1, param_2, param_3)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let pcVar4;
  let pvVar5;
  let BVar6;
  let unaff_FS_OFFSET;
  let local_ac4;
  let local_abc;
  let local_ab4;
  let local_974;
  let local_870;
  let local_86c;
  let local_868;
  let local_864;
  let local_760;
  let local_75c;
  let acStack_75b;
  let local_658;
  let local_224;
  let local_120;
  let local_11c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00478704;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_760 = 1;
  FUN_005c64da();
  local_8 = 0;
  if ((param_1 === 0)) {
    FUN_00473d5e(0);
    wv(DAT_006ad6ac, 1);
  }
  else {
    FUN_00473d5e(1);
    wv(DAT_006ad6ac, 2);
  }
  FUN_004aef20(DAT_fffff8a4);
  FUN_004af14b(DAT_fffff8a4, (((-u8((param_1 === 0))) & -0xb1) + 0x19f));
  FUN_004aef36(DAT_fffff8a4);
  FUN_004af01a(DAT_fffff8a4);
  FUN_0043c840(DAT_fffff8a4, DAT_0062bb60);
  FUN_0043c840(DAT_fffff8a4, DAT_0066c4e9);
  FUN_004af03b(DAT_fffff8a4);
  sVar1 = _strlen(DAT_fffff8a4);
  local_120 = (DAT_fffff8a5 + sVar1);
  FUN_004aef20(local_120);
  FUN_0043c840(local_120, DAT_0062bb64);
  FUN_0043c840(local_120, DAT_0066c4e9);
  sVar1 = _strlen(local_120);
  local_120 = (local_120 + (sVar1 + 1));
  FUN_004aef20(local_120);
  FUN_005f22d0(DAT_fffff79c, DAT_0062bb68);
  FUN_005f22e0(DAT_fffff79c, DAT_0066c4e9);
  __chdir(DAT_0064bb08);
  FUN_00473e55(0, param_1, 0);
  uVar2 = FUN_00428b0c(s32(((DAT_00628420 + 0x684) + ((-u8((param_1 === 0))) & -0xb1) * 4), 0), DAT_fffff79c, DAT_0066c4f8, DAT_0066c4e9, 1, 0);
  iVar3 = FUN_004731d2(DAT_006553d8, uVar2);
  if ((iVar3 === 0)) {
    __chdir(DAT_00655020);
  }
  else {
    __chdir(DAT_00655020);
    for (/* cond: (local_11c < 8) */); local_11c = (local_11c < 8); local_11c = (local_11c + 1)) {
      if ((s16((DAT_0066ca84 + local_11c * 0x3f0), 0) !== 0)) {
        w16((DAT_0066ca84 + local_11c * 0x3f0), 0, 0);
        FUN_004083b0();
      }
    }
    FUN_005f22d0(DAT_fffffee8, DAT_fffff79c);
    __strupr(DAT_fffffee8);
    pcVar4 = _strstr(DAT_fffffee8, DAT_0062bb6c);
    if ((pcVar4 !== 0)) {
      FUN_005f22d0(DAT_fffffee8, DAT_fffff79c);
      local_86c = _strrchr(DAT_fffffee8, 0x5c);
      local_86c = (local_86c + 1);
      _MEM[local_86c + 1] = 0;
      FUN_005f22d0(DAT_fffff68c, DAT_fffffee8);
      FUN_005f22e0(DAT_fffff68c, s_*.ALT_0062bb74);
      local_870 = 0;
      pvVar5 = FUN_006e7b14(DAT_fffff68c, DAT_fffff54c);
      if ((pvVar5 !== -1)) {
        do {
          local_870 = (local_870 + 1);
          BVar6 = FUN_006e7b28(pvVar5, DAT_fffff54c);
        } while ((BVar6 === 1));
      }
      if ((local_870 !== 0)) {
        iVar3 = _rand();
        local_abc = (iVar3 * (local_870 + 1) >>> 0xf);
        if ((local_abc !== 0)) {
          pvVar5 = FUN_006e7b14(DAT_fffff68c, DAT_fffff54c);
          while ((local_abc !== 0)) {
            FUN_006e7b28(pvVar5, DAT_fffff54c);
          }
          FUN_005f22e0(DAT_fffffee8, DAT_0000002c);
          FUN_005f22d0(DAT_fffff79c, DAT_fffffee8);
        }
      }
    }
    FUN_0046e020(-107, 0, 0, 0);
    FUN_0046e020(-108, 0, 0, 0);
    FUN_0046e020(0x6a, 0, 0, 0);
    local_14 = FUN_00475666(DAT_fffff79c);
    if ((local_14 === 0)) {
      FUN_00484d52();
      if (((DAT_00655af0 & 0x80) !== 0)) {
        wv(DAT_00627670, 0);
        __chdir(DAT_0064bb08);
        FUN_005f22d0(DAT_fffffddc, s_EVENTS._0062bbac);
        FUN_005f22e0(DAT_fffffddc, DAT_0062cd24);
        iVar3 = FUN_00415133(DAT_fffffddc);
        if ((iVar3 !== 0)) {
          FUN_005f22d0(DAT_fffffddc, DAT_00679640);
          FUN_004fa5d9(0xc350);
          iVar3 = FUN_004fc516(s_EVENTS_0062bbc0, s_BEGINEVENTS_0062bbb4);
          if ((iVar3 === 0)) {
            FUN_004cef35();
            wv(DAT_00627670, 1);
          }
          FUN_005f22d0(DAT_00679640, DAT_fffffddc);
        }
      }
      if ((DAT_00627670 === 0)) {
        FUN_004fa5d9(0xc350);
      }
      wv(DAT_00655aea, DAT_0064bc1e);
      FUN_005d687b(8);
      FUN_0046e4a9();
      if (((DAT_0064bc1e & 8) !== 0)) {
        if ((DAT_00627670 === 0)) {
          FUN_0046e6c8();
        }
        else {
          FUN_004fbd2b();
          FUN_0046e6c8();
        }
      }
      if ((param_3 !== 0)) {
        FUN_00484d52();
        iVar3 = FUN_00415133(s_TITLE.GIF_0062bbc8);
        if ((iVar3 !== 0)) {
          FUN_00419be0(DAT_0066c670);
          FUN_00419ba0(0x9e);
          FUN_00426f80();
          FUN_00419b80();
          FUN_00421bd0();
        }
      }
      __chdir(DAT_00655020);
      local_760 = 0;
      uVar2 = FUN_00493ba6(DAT_006d1da0);
      FUN_0040ff60(0, uVar2);
      uVar2 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar2);
      uVar2 = FUN_00493c7d(DAT_006d1da0);
      FUN_0040ff60(2, uVar2);
      FUN_0040bbb0();
      FUN_00421f10(((DAT_00655afa) << 16 >> 16));
      FUN_0040ff60(3, DAT_00679640);
      FUN_004271e8(4, s32((DAT_0064ba10 + u8(DAT_00655b08) * 4), 0));
      if ((DAT_00655b02 !== 0)) {
        local_ac4 = 0;
      }
      else {
        local_ac4 = 1;
      }
      FUN_0057940d(0x701, local_ac4);
      if ((DAT_00655b02 === 0)) {
        FUN_00421ea0(s_LOADOK_0062bbe0);
      }
      wv(DAT_006ad2f7, 1);
      for (/* cond: (local_868 < ((DAT_00655b16) << 16 >> 16)) */); local_868 = (local_868 < ((DAT_00655b16) << 16 >> 16)); local_868 = (local_868 + 1)) {
        if ((s32((DAT_0065610a + local_868 * 0x20), 0) === 0)) {
          w16((DAT_00656108 + local_868 * 0x20), 0, 0xffff);
          w16((DAT_00656106 + local_868 * 0x20), 0, 0xffff);
        }
        else {
          FUN_005b2590(local_868);
          if ((s16((DAT_006560f2 + local_868 * 0x20), 0) < 0)) {
            FUN_005d22f9(s_Stacked_Unit_in_save._Unit:_%d,_T_0062bbe8, local_868, _MEM[DAT_006560f6 + local_868 * 0x20], s8(_MEM[DAT_006560f7 + local_868 * 0x20]));
            FUN_005b4391(local_868, 0);
          }
        }
      }
      FUN_0040bbb0();
      FUN_0040bbe0(DAT_fffff79c);
    }
    else {
      /* switch */ () {
      case 1 :
        FUN_00421ea0(s_LOADNOTSAVE_0062bb7c);
        break;
      case 2 :
        FUN_00421ea0(s_LOADOLDSAVE_0062bb88);
        break;
      case 3 :
        FUN_00421d60(0, s32(PTR_s_No_error_00639e60, DAT_00639f14));
        FUN_00421ea0(s_LOADBADSAVE_0062bb94);
        break;
      case 4 :
        FUN_00421d60(0, s32(PTR_s_No_error_00639e60, DAT_00639f14));
        FUN_00421ea0(s_LOADNEWSAVE_0062bba0);
      }
    }
  }
  if ((local_760 !== 0)) {
    wv(DAT_006ad6ac, 0);
  }
  local_8 = -1;
  FUN_004786f8();
  FUN_0047870e();
  return;
}


 export function FUN_004786f8 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0047870e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00479d20 ()

 {
  FUN_00479d3a();
  FUN_00479d65();
  return;
}


 export function FUN_00479d3a ()

 {
  `eh_vector_constructor_iterator'(DAT_0066c7a8, 0x3f0, 8, LAB_004037f6, LAB_0040340e);
  return;
}


 export function FUN_00479d65 ()

 {
  _atexit(FUN_00479d82);
  return;
}


 export function FUN_00479d82 ()

 {
  `eh_vector_destructor_iterator'(DAT_0066c7a8, 0x3f0, 8, LAB_0040340e);
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
  FUN_00479dc2();
  FUN_00479ddc();
  return;
}


 export function FUN_00479dc2 ()

 {
  FUN_0040fb00();
  return;
}


 export function FUN_00479ddc ()

 {
  _atexit(FUN_00479df9);
  return;
}


 export function FUN_00479df9 ()

 {
  FUN_0040fbb0();
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
  FUN_00479e2d();
  FUN_00479e47();
  return;
}


 export function FUN_00479e2d ()

 {
  FUN_0040fb00();
  return;
}


 export function FUN_00479e47 ()

 {
  _atexit(FUN_00479e64);
  return;
}


 export function FUN_00479e64 ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_00479e7e (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00410402(((param_1) << 16 >> 16), ((s16((in_ECX + 0x2e2), 0)) << 16 >> 16));
  return;
}


 export function FUN_00479eae (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00410402(((s16((in_ECX + 0x2e0), 0)) << 16 >> 16), ((param_1) << 16 >> 16));
  return;
}


 export function FUN_00479ede (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2d8), 0, param_1);
  if ((param_1 === 0)) {
    w16((in_ECX + 0x2de), 0, 1);
  }
  else {
    w16((in_ECX + 0x2de), 0, 0);
  }
  w32((in_ECX + 0x358), 0, -1);
  if ((DAT_00628048 === 0)) {
    w16((in_ECX + 0x2e4), 0, 0);
    w16((in_ECX + 0x2e0), 0, (DAT_006d1160 >> 1));
    w16((in_ECX + 0x2e2), 0, (DAT_006d1162 >> 1));
    if (((s16((in_ECX + 0x2e0), 0) & 1) !== 0)) {
      w16((in_ECX + 0x2e0), 0, (s16((in_ECX + 0x2e0), 0) + 0xffff));
    }
    if (((s16((in_ECX + 0x2e2), 0) & 1) !== 0)) {
      w16((in_ECX + 0x2e0), 0, (s16((in_ECX + 0x2e0), 0) + 1));
    }
  }
  w32((in_ECX + 0x35c), 0, -0x3e7);
  return;
}


 export function FUN_00479fbe (in_ECX)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_8;

  w32((in_ECX + 0x328), 0, s32((in_ECX + 0x12c), 0));
  w32((in_ECX + 0x32c), 0, s32((in_ECX + 0x130), 0));
  uVar2 = FUN_0047dfb0(0x40);
  w32((in_ECX + 0x308), 0, uVar2);
  uVar2 = FUN_0047dfb0(0x20);
  w32((in_ECX + 0x30c), 0, uVar2);
  w32((in_ECX + 0x310), 0, (s32((in_ECX + 0x308), 0) / 2 | 0));
  w32((in_ECX + 0x314), 0, (s32((in_ECX + 0x30c), 0) / 2 | 0));
  w32((in_ECX + 0x318), 0, ((s32((in_ECX + 0x308), 0) + ((s32((in_ECX + 0x308), 0) >> 0x1f) & 3)) >> 2));
  w32((in_ECX + 0x31c), 0, ((s32((in_ECX + 0x30c), 0) + ((s32((in_ECX + 0x30c), 0) >> 0x1f) & 3)) >> 2));
  w32((in_ECX + 0x320), 0, s32((in_ECX + 0x308), 0));
  w32((in_ECX + 0x324), 0, (s32((in_ECX + 0x30c), 0) + s32((in_ECX + 0x314), 0)));
  w32((in_ECX + 0x2f8), 0, (((s32((in_ECX + 0x328), 0) + -1) + s32((in_ECX + 0x308), 0)) / s32((in_ECX + 0x308), 0) | 0));
  w32((in_ECX + 0x2fc), 0, (((s32((in_ECX + 0x32c), 0) + -1) + s32((in_ECX + 0x30c), 0)) / s32((in_ECX + 0x30c), 0) | 0));
  w32((in_ECX + 0x300), 0, (((s32((in_ECX + 0x310), 0) * 3 + -1) + s32((in_ECX + 0x328), 0)) / s32((in_ECX + 0x308), 0) | 0));
  w32((in_ECX + 0x304), 0, (((s32((in_ECX + 0x314), 0) * 3 + -1) + s32((in_ECX + 0x32c), 0)) / s32((in_ECX + 0x30c), 0) | 0));
  w32((in_ECX + 0x330), 0, 0);
  w32((in_ECX + 0x334), 0, 0);
  if (((((DAT_006d1160) << 16 >> 16) / 2 | 0) < s32((in_ECX + 0x2f8), 0))) {
    w32((in_ECX + 0x2f8), 0, (((DAT_006d1160) << 16 >> 16) / 2 | 0));
    w32((in_ECX + 0x330), 0, ((s32((in_ECX + 0x328), 0) - s32((in_ECX + 0x308), 0) * s32((in_ECX + 0x2f8), 0)) >> 1));
    w32((in_ECX + 0x300), 0, (s32((in_ECX + 0x2f8), 0) + 1));
  }
  if ((((DAT_006d1162) << 16 >> 16) < s32((in_ECX + 0x2fc), 0))) {
    w32((in_ECX + 0x2fc), 0, (((DAT_006d1162) << 16 >> 16) / 2 | 0));
    w32((in_ECX + 0x334), 0, ((s32((in_ECX + 0x32c), 0) - s32((in_ECX + 0x30c), 0) * s32((in_ECX + 0x2fc), 0)) >> 1));
    w32((in_ECX + 0x304), 0, (((DAT_006d1162) << 16 >> 16) + 1));
  }
  uVar1 = FUN_005ae052(((s16((in_ECX + 0x2e0), 0)) << 16 >> 16));
  w16((in_ECX + 0x2e0), 0, uVar1);
  w32((in_ECX + 0x2ec), 0, (((s16((in_ECX + 0x2e2), 0)) << 16 >> 16) - s32((in_ECX + 0x2fc), 0)));
  uVar2 = FUN_005ae052((((s16((in_ECX + 0x2e0), 0)) << 16 >> 16) - s32((in_ECX + 0x2f8), 0)));
  w32((in_ECX + 0x2e8), 0, uVar2);
  if (((((DAT_006d1160) << 16 >> 16) + 1) < (s32((in_ECX + 0x2f8), 0) * 2 + s32((in_ECX + 0x2e8), 0)))) {
    w32((in_ECX + 0x2e8), 0, ((((DAT_006d1160) << 16 >> 16) + 1) + s32((in_ECX + 0x2f8), 0) * -2));
  }
  if (((((DAT_006d1162) << 16 >> 16) + 1) < (s32((in_ECX + 0x2fc), 0) * 2 + s32((in_ECX + 0x2ec), 0)))) {
    w32((in_ECX + 0x2ec), 0, ((((DAT_006d1162) << 16 >> 16) + 1) + s32((in_ECX + 0x2fc), 0) * -2));
  }
  uVar3 = s32((in_ECX + 0x2e8), 0);
  if ((0x7fffffff < uVar3)) {
    uVar3 = -1;
  }
  w32((in_ECX + 0x2e8), 0, uVar3);
  uVar3 = s32((in_ECX + 0x2ec), 0);
  if ((0x7fffffff < uVar3)) {
    uVar3 = -1;
  }
  w32((in_ECX + 0x2ec), 0, uVar3);
  if (((_MEM[(in_ECX + 0x2e8)] & 1) !== 0)) {
    w32((in_ECX + 0x2e8), 0, (s32((in_ECX + 0x2e8), 0) + -1));
  }
  if (((_MEM[(in_ECX + 0x2ec)] & 1) !== 0)) {
    w32((in_ECX + 0x2e8), 0, (s32((in_ECX + 0x2e8), 0) + 1));
  }
  uVar2 = FUN_005ae052(((s32((in_ECX + 0x300), 0) * 2 + -2) + s32((in_ECX + 0x2e8), 0)));
  w32((in_ECX + 0x2f0), 0, uVar2);
  w32((in_ECX + 0x2f4), 0, ((s32((in_ECX + 0x304), 0) * 2 + -2) + s32((in_ECX + 0x2ec), 0)));
  if ((((s16((in_ECX + 0x2e4), 0)) << 16 >> 16) !== s32((in_ECX + 0x35c), 0))) {
    FUN_005bd65c(s32((in_ECX + 0x308), 0), s32((in_ECX + 0x30c), 0));
    FUN_005bd65c(s32((in_ECX + 0x308), 0), s32((in_ECX + 0x30c), 0));
    w32((in_ECX + 0x35c), 0, ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16));
    FUN_0047dff0();
    FUN_005cef31(DAT_ffffffe8, (in_ECX + 0x360), 0, 0);
    FUN_005cef31(DAT_ffffffd8, (in_ECX + 0x3a8), 0, 0);
    FUN_0047df50();
  }
  local_8 = (s32((in_ECX + 0x30c), 0) * 3 / 5 | 0);
  if ((s32((in_ECX + 0x348), 0) !== local_8)) {
    FUN_00417ef0(0, local_8);
    w32((in_ECX + 0x348), 0, local_8);
  }
  local_8 = ((s32((in_ECX + 0x30c), 0) + ((s32((in_ECX + 0x30c), 0) >> 0x1f) & 3)) >> 2);
  if ((s32((in_ECX + 0x34c), 0) !== local_8)) {
    FUN_00417ef0(1, local_8);
    w32((in_ECX + 0x34c), 0, local_8);
  }
  return;
}


 export function FUN_0047a540 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_10;
  let local_8;

  param_3 = (param_3 - ((s32((in_ECX + 0x124), 0)) & 0xFFFF));
  param_4 = (param_4 - ((s32((in_ECX + 0x128), 0)) & 0xFFFF));
  if ((param_4 < 0)) {
    uVar2 = 1;
  }
  else if ((((param_4) << 16 >> 16) < s32((in_ECX + 0x130), 0))) {
    param_3 = (param_3 - ((s32((in_ECX + 0x330), 0)) & 0xFFFF));
    param_4 = (param_4 - ((s32((in_ECX + 0x334), 0)) & 0xFFFF));
    local_10 = (((((param_3) << 16 >> 16) / s32((in_ECX + 0x308), 0) | 0) * 2 + s32((in_ECX + 0x2e8), 0)) + 1);
    local_8 = (((((((param_4) << 16 >> 16) / s32((in_ECX + 0x30c), 0) | 0)) & 0xFFFF) * 2 + ((s32((in_ECX + 0x2ec), 0)) & 0xFFFF)) + 1);
    iVar3 = FUN_005c0bf2((((((((param_3) << 16 >> 16) % s32((in_ECX + 0x308), 0))) & 0xFFFF)) << 16 >> 16), (((((((param_4) << 16 >> 16) % s32((in_ECX + 0x30c), 0))) & 0xFFFF)) << 16 >> 16));
    iVar3 = ((iVar3 + -10) >> 4);
    if ((iVar3 !== 0)) {
      local_10 = (local_10 + s8(_MEM[DAT_0062833b + iVar3]));
      local_8 = (local_8 + s8(_MEM[DAT_00628343 + iVar3]));
    }
    sVar1 = FUN_005ae052(local_10);
    w32(param_1, 0, ((sVar1) << 16 >> 16));
    w32(param_2, 0, ((local_8) << 16 >> 16));
    uVar2 = 0;
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_0047a6b0 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  iVar2 = FUN_005ae052((param_3 - s32((in_ECX + 0x2e8), 0)));
  iVar1 = s32((in_ECX + 0x2ec), 0);
  w32(param_1, 0, (s32((in_ECX + 0x310), 0) * (iVar2 + -1) + s32((in_ECX + 0x330), 0)));
  w32(param_2, 0, (s32((in_ECX + 0x314), 0) * ((param_4 - iVar1) + -1) + s32((in_ECX + 0x334), 0)));
  w32(param_1, 0, (s32(param_1, 0) + s32((in_ECX + 0x124), 0)));
  w32(param_2, 0, (s32(param_2, 0) + s32((in_ECX + 0x128), 0)));
  return;
}


 export function FUN_0047a747 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let local_14;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < 4) */); local_c = local_c; local_c = (local_c + 1)) {
    _MEM[DAT_0066c720 + local_c] = 0;
  }
  iVar2 = FUN_004087c0(param_1, param_2);
  if ((iVar2 === 0)) {
    local_8 = 0;
  }
  else {
    for (/* cond: (local_c < 8) */); local_c = local_c; local_c = (local_c + 1)) {
      uVar3 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_c]) + param_1));
      cVar1 = _MEM[DAT_00628360 + local_c];
      iVar2 = FUN_004087c0(uVar3, (s8(cVar1) + param_2));
      if ((iVar2 === 0)) {
        local_14 = 7;
      }
      else {
        local_14 = FUN_005b89bb(uVar3, (s8(cVar1) + param_2));
      }
      if ((local_14 !== 0xa)) {
        local_8 = (local_8 + 1);
        if (((local_c & 1) === 0)) {
          iVar2 = (local_c >> 1);
          uVar4 = ((iVar2 + 1) & 3);
          _MEM[DAT_0066c720 + iVar2] = (_MEM[DAT_0066c720 + iVar2] | 4);
          _MEM[DAT_0066c720 + uVar4] = (_MEM[DAT_0066c720 + uVar4] | 1);
        }
        else {
          uVar4 = (((local_c + 1) & 6) >>> 1);
          _MEM[DAT_0066c720 + uVar4] = (_MEM[DAT_0066c720 + uVar4] | 2);
        }
      }
    }
  }
  return local_8;
}


 export function FUN_0047a8c9 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let bVar1;
  let uVar2;
  let iVar3;
  let pbVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let local_24c;
  let local_248;
  let local_244;
  let local_240;
  let local_23c;
  let local_22c;
  let local_21c;
  let local_20c;
  let local_1fc;
  let local_1ec;
  let local_1dc;
  let local_1cc;
  let local_1bc;
  let local_1ac;
  let local_19c;
  let local_18c;
  let local_17c;
  let local_16c;
  let local_15c;
  let local_14c;
  let local_13c;
  let local_12c;
  let local_11c;
  let local_10c;
  let local_fc;
  let local_ec;
  let local_dc;
  let local_cc;
  let local_bc;
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
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let auStack_14;

  if ((((s16((in_ECX + 0x2e4), 0)) << 16 >> 16) === param_7)) {
    local_50 = s32((in_ECX + 0x308), 0);
    local_18 = s32((in_ECX + 0x30c), 0);
    local_70 = s32((in_ECX + 0x310), 0);
    local_5c = s32((in_ECX + 0x314), 0);
  }
  else {
    local_50 = FUN_00472cf0(0x40, param_7);
    local_18 = FUN_00472cf0(0x20, param_7);
    local_70 = (local_50 >> 1);
    local_5c = (local_18 >> 1);
  }
  if ((param_8 < 0)) {
    iVar3 = FUN_004087c0(param_4, param_5);
    local_9c = u8((iVar3 === 0));
  }
  else {
    local_9c = u8((0x14 < param_8));
    if ((local_9c === 0)) {
      iVar3 = FUN_004087c0(param_4, param_5);
      if ((iVar3 === 0)) {
        local_9c = 1;
      }
      else {
        local_9c = 0;
      }
    }
  }
  FUN_0047df20(param_7);
  if ((local_9c !== 0)) {
    if ((local_9c === 0)) {
      iVar3 = FUN_005b8b65(param_4, param_5, param_6);
      if ((iVar3 === 0)) {
        local_9c = 1;
      }
      else {
        local_9c = 0;
      }
    }
    if ((local_9c !== 0)) {
      FUN_005cef31(DAT_ffffff44, param_1, param_2, param_3);
      goto LAB_0047ba07;
    }
  }
  iVar3 = FUN_004087c0(param_4, param_5);
  if ((iVar3 === 0)) {
    local_9c = 1;
    local_a4 = 7;
    local_6c = 7;
    local_88 = 0;
    local_20 = 0;
    local_80 = 0;
  }
  else {
    local_9c = 0;
    local_80 = FUN_005b8931(param_4, param_5);
    local_a4 = u8(_MEM[local_80]);
    local_6c = (local_a4 & 0xf);
    local_20 = (local_a4 & 0x80);
    if ((param_6 < 1)) {
      local_88 = u8(_MEM[local_80 + 1]);
    }
    else {
      pbVar4 = FUN_005b898b(param_4, param_5, param_6);
      local_88 = u8(_MEM[pbVar4]);
    }
  }
  for (/* cond: (local_54 < 4) */); local_54 = (local_54 < 4); local_54 = (local_54 + 1)) {
    w32(DAT_ffffffec, local_54, -1);
  }
  if ((local_6c === 0xa)) {
    if ((param_7 < -3)) {
      FUN_005cef31(DAT_ffffff34, param_1, param_2, param_3);
    }
    else {
      local_8c = FUN_0047a747(param_4, param_5);
      for (/* cond: (local_1c < 4) */); local_1c = (local_1c < 4); local_1c = (local_1c + 1)) {
        local_24 = ((s32((DAT_0062bcb8 + local_1c * 4), 0) + 1) * (local_70 >> 1) + param_2);
        local_44 = (s32((DAT_0062bcc8 + local_1c * 4), 0) * (local_5c >> 1) + param_3);
        FUN_005cef31(DAT_ffffff24, param_1, local_24, local_44);
      }
      for (/* cond: (local_54 < 4) */); local_54 = (local_54 < 4); local_54 = (local_54 + 1)) {
        local_ac = FUN_005ae052((s8(_MEM[DAT_0062833c + local_54]) + param_4));
        local_60 = (s8(_MEM[DAT_00628344 + local_54]) + param_5);
        iVar3 = FUN_004087c0(local_ac, local_60);
        if (((_MEM[pbVar4] & 0x80) !== 0)) {
          FUN_005cef31(DAT_ffffff14, param_1, param_2, param_3);
        }
      }
    }
  }
  else {
    local_8c = 0;
    local_78 = 0;
    if ((param_7 < -4)) {
      local_78 = 0xf;
    }
    else {
      for (/* cond: (local_54 < 4) */); local_54 = (local_54 < 4); local_54 = (local_54 + 1)) {
        local_ac = FUN_005ae052((s8(_MEM[DAT_0062833c + local_54]) + param_4));
        local_60 = (s8(_MEM[DAT_00628344 + local_54]) + param_5);
        iVar3 = FUN_004087c0(local_ac, local_60);
        if ((iVar3 !== 0)) {
          local_74 = FUN_005b8931(local_ac, local_60);
          bVar1 = _MEM[local_74];
          local_48 = u8(bVar1);
          local_a0 = (local_48 & 0xf);
          if ((local_a0 === local_6c)) {
            local_8c = (local_8c + s8(_MEM[DAT_00628338 + local_54]));
          }
          else if ((local_a0 === 0xa)) {
            w32(DAT_ffffffec, local_54, 0xc);
          }
          else {
            w32(DAT_ffffffec, local_54, local_a0);
          }
          if ((local_a0 === 0xa)) {
            local_78 = (local_78 + s8(_MEM[DAT_00628338 + local_54]));
          }
        }
      }
    }
    FUN_005cef31(DAT_ffffff04, param_1, param_2, param_3);
    if ((-5 < param_7)) {
      for (/* cond: (local_84 < 4) */); local_84 = (local_84 < 4); local_84 = (local_84 + 1)) {
        if ((-1 < s32(DAT_ffffffec, local_84))) {
          if ((local_84 < 2)) {
            local_240 = local_70;
          }
          else {
            local_240 = 0;
          }
          local_4c = (local_240 + param_2);
          if ((((((local_84) & 0xFF) + 1) & 3) < 2)) {
            local_244 = 0;
          }
          else {
            local_244 = local_5c;
          }
          local_58 = (local_244 + param_3);
          FUN_005cef31(DAT_fffffef4, param_1, local_4c, local_58);
        }
      }
    }
    if ((local_6c === 3)) {
      FUN_005cef31(DAT_fffffee4, param_1, param_2, param_3);
    }
    else if ((local_6c === 5)) {
      FUN_005cef31(DAT_fffffed4, param_1, param_2, param_3);
    }
    else if ((local_6c === 4)) {
      FUN_005cef31(DAT_fffffec4, param_1, param_2, param_3);
    }
    if (((((local_88) & 0xFF) & 0xc) === 0xc)) {
      FUN_005cef31(DAT_fffffeb4, param_1, param_2, param_3);
    }
    if ((DAT_0062bcd8 === 0)) {
      FUN_005cef31(DAT_fffffea4, param_1, param_2, param_3);
    }
    if ((-4 < param_7)) {
      local_3c = 0;
      if (((((local_88) & 0xFF) & 0x42) === 2)) {
        for (/* cond: (local_54 < 5) */); local_54 = (local_54 < 5); local_54 = (local_54 + 2)) {
          local_ac = FUN_005ae052((s8(_MEM[DAT_00628350 + local_54]) + param_4));
          local_60 = (s8(_MEM[DAT_00628360 + local_54]) + param_5);
          iVar3 = FUN_004087c0(local_ac, local_60);
          uVar2 = local_3c;
          if (((local_68 & 8) !== 0)) {
            uVar2 = (local_3c | 3);
          }
          local_3c = uVar2;
        }
      }
      if ((DAT_0062bcd8 === 0)) {
        if ((local_3c === 1)) {
          FUN_005cef31(DAT_fffffe94, param_1, param_2, param_3);
        }
        else if (((local_3c & 2) !== 0)) {
          FUN_005cef31(DAT_fffffe84, param_1, param_2, param_3);
        }
      }
    }
    if ((iVar3 !== 0)) {
      FUN_005cef31(DAT_fffffe74, param_1, param_2, param_3);
    }
  }
  if ((local_38 !== 0)) {
    FUN_005cef31(DAT_fffffe64, param_1, param_2, param_3);
  }
  if ((-1 < iVar3)) {
    local_90 = 0;
    local_94 = 0;
    if ((iVar3 < 0)) {
      local_40 = 0;
    }
    else {
      local_40 = 1;
    }
    for (/* cond: (local_54 < 8) */); local_54 = (local_54 < 8); local_54 = (local_54 + 1)) {
      local_ac = FUN_005ae052((s8(_MEM[DAT_00628350 + local_54]) + param_4));
      local_60 = (s8(_MEM[DAT_00628360 + local_54]) + param_5);
      iVar3 = FUN_004087c0(local_ac, local_60);
      if ((iVar3 !== 0)) {
        if ((param_6 < 1)) {
          local_68 = FUN_005b94d5(local_ac, local_60);
        }
        else {
          pbVar4 = FUN_005b898b(local_ac, local_60, param_6);
          local_68 = u8(_MEM[pbVar4]);
        }
        if (((local_68 & 0x22) === 0)) {
          FUN_005cef31(DAT_fffffe54, param_1, param_2, param_3);
        }
      }
    }
    if ((local_40 !== 0)) {
      for (/* cond: (local_54 < 8) */); local_54 = (local_54 < 8); local_54 = (local_54 + 1)) {
        local_ac = FUN_005ae052((s8(_MEM[DAT_00628350 + local_54]) + param_4));
        local_60 = (s8(_MEM[DAT_00628360 + local_54]) + param_5);
        iVar3 = FUN_004087c0(local_ac, local_60);
        if ((iVar3 !== 0)) {
          if ((param_6 < 1)) {
            local_68 = FUN_005b94d5(local_ac, local_60);
          }
          else {
            pbVar4 = FUN_005b898b(local_ac, local_60, param_6);
            local_68 = u8(_MEM[pbVar4]);
          }
          if (((local_68 & 0x22) !== 0)) {
            local_94 = (local_94 + 1);
            FUN_005cef31(DAT_fffffe44, param_1, param_2, param_3);
          }
        }
      }
    }
    iVar3 = FUN_005b8ca6(param_4, param_5);
    if ((iVar3 < 0)) {
      if ((local_40 === 0)) {
        if ((local_90 === 0)) {
          FUN_005cef31(DAT_fffffe24, param_1, param_2, param_3);
        }
      }
      else if ((local_94 === 0)) {
        FUN_005cef31(DAT_fffffe34, param_1, param_2, param_3);
      }
    }
  }
  if (((((local_88) & 0xFF) & 0xc) === 8)) {
    FUN_005cef31(DAT_fffffe14, param_1, param_2, param_3);
  }
  if ((local_9c === 0)) {
    if (((local_88 & 0x80) !== 0)) {
      FUN_005cef31(DAT_fffffe04, param_1, param_2, param_3);
    }
    iVar3 = FUN_005b8ffa(param_4, param_5);
    if ((DAT_0062bcd8 === 0)) {
      FUN_005cef31(DAT_fffffdf4, param_1, param_2, param_3);
    }
    if ((DAT_0062bcd8 === 0)) {
      FUN_005cef31(DAT_fffffde4, param_1, param_2, (param_3 - local_5c));
    }
    if ((DAT_0062bcd8 === 0)) {
      local_8c = 0;
      for (/* cond: (-1 < local_98) */); -1 = (-1 < local_98);
          local_98 = FUN_005b2c82(local_98)) {
        if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + local_98 * 0x20]) * 0x14] === 1)) {
          local_8c = 1;
          break;
        }
      }
      FUN_005cef31(DAT_fffffdd4, param_1, param_2, (param_3 - local_5c));
      FUN_004086c0(DAT_ffffffcc, param_2, (param_3 - local_5c), local_50, (local_5c + local_18));
      uVar5 = FUN_005b8a1d(param_4, param_5);
      uVar5 = FUN_0043cab0(uVar5);
      FUN_005c0479(DAT_ffffffcc, 0x106, uVar5);
    }
  }
  if ((-1 < param_6)) {
    for (/* cond: (local_54 < 4) */); local_54 = (local_54 < 4); local_54 = (local_54 + 1)) {
      local_ac = FUN_005ae052((s8(_MEM[DAT_0062833c + local_54]) + param_4));
      local_60 = (s8(_MEM[DAT_00628344 + local_54]) + param_5);
      local_64 = 0;
      if ((param_8 < 0)) {
        iVar3 = FUN_004087c0(local_ac, local_60);
        if ((iVar3 !== 0)) {
        if ((param_8 < 0x15)) {
          iVar3 = FUN_004087c0(local_ac, local_60);
          if ((iVar3 === 0)) {
            local_64 = 1;
          }
          if (((s8(_MEM[DAT_0062833c + local_54]) + s8(_MEM[DAT_00628370 + param_8])) < 1)) {
            local_7c = ((~(s8(_MEM[DAT_0062833c + local_54]) + s8(_MEM[DAT_00628370 + param_8]))) + 1);
          }
          else {
            local_7c = (s8(_MEM[DAT_0062833c + local_54]) + s8(_MEM[DAT_00628370 + param_8]));
          }
          if (((s8(_MEM[DAT_00628344 + local_54]) + s8(_MEM[DAT_006283a0 + param_8])) < 1)) {
            local_a8 = ((~(s8(_MEM[DAT_00628344 + local_54]) + s8(_MEM[DAT_006283a0 + param_8]))) + 1);
          }
          else {
            local_a8 = (s8(_MEM[DAT_00628344 + local_54]) + s8(_MEM[DAT_006283a0 + param_8]));
          }
          iVar3 = FUN_005ae296(local_7c, local_a8);
          if ((2 < iVar3)) {
            local_64 = 1;
          }
        }
        else {
          local_64 = 1;
        }
 LAB_0047b934: :
        if ((local_64 === 0)) {
          iVar3 = FUN_005b8b65(local_ac, local_60, param_6);
          if ((iVar3 === 0)) {
            local_64 = 1;
          }
          else {
            local_64 = 0;
          }
        }
        if ((local_64 !== 0)) {
          if ((local_54 < 2)) {
            local_248 = local_70;
          }
          else {
            local_248 = 0;
          }
          local_4c = (local_248 + param_2);
          if ((((((local_54) & 0xFF) + 1) & 3) < 2)) {
            local_24c = 0;
          }
          else {
            local_24c = local_5c;
          }
          local_58 = (local_24c + param_3);
          FUN_005cef31(DAT_fffffdc4, param_1, local_4c, local_58);
        }
      }
    }
  }
 LAB_0047ba07: :
  FUN_0047df50();
  return;
}


 export function FUN_0047ba1d (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_8;

  iVar1 = FUN_0043cf76(param_3, param_4);
  if ((iVar2 !== 0)) {
    local_8 = FUN_005b8b65(param_3, param_4, DAT_006d1da0);
    if ((s8(_MEM[DAT_0064f348 + iVar1 * 0x58]) !== (DAT_006d1da0 & 0xff))) {
      if ((_MEM[DAT_0064f34d + (iVar1 * 0x58 + DAT_006d1da0)] === 0)) {
        local_8 = 0;
      }
      else {
        local_8 = 1;
      }
    }
    if (((DAT_0064bc60 & 8) !== 0)) {
      FUN_0056d289(in_ECX, iVar1, 0, param_1, (param_2 - s32((in_ECX + 0x314), 0)), ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16));
    }
  }
  return;
}


 export function FUN_0047bba5 ()

 {
  FUN_0056baff();
  return;
}


 export function FUN_0047bbea ()

 {
  if ((DAT_006d1da8 !== 1)) {
    FUN_0056baff();
  }
  return;
}


 export function FUN_0047bc59 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  if ((DAT_006d1da8 !== 1)) {
    FUN_0047a6b0(DAT_fffffff8, DAT_fffffff4, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
    local_c = (local_c - s32((in_ECX + 0x314), 0));
    FUN_0056baff(in_ECX, param_1, 5, local_8, local_c, ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16), 0);
  }
  return;
}


 export function FUN_0047bd04 (param_1, param_2, param_3)

 {
  let iVar1;

  if ((DAT_00633e48 !== param_1)) {
    if ((param_1 !== DAT_00633e54)) {
      if ((iVar1 !== 0)) {
        FUN_0047bbea(((DAT_00655afe) << 16 >> 16), param_2, param_3);
        return;
      }
      FUN_0047bba5(param_1, 4, param_2, param_3);
    }
    else {
      FUN_0056baff();
    }
  }
  else {
    FUN_0047bbea(param_1, param_2, param_3);
  }
  return;
}


 export function FUN_0047be63 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  param_2 = (param_2 - s32((in_ECX + 0x314), 0));
  iVar1 = FUN_004087c0(param_3, param_4);
  if ((iVar1 !== 0)) {
    local_c = FUN_005b2e69(param_3, param_4);
    if ((DAT_00633e44 !== param_4)) {
      if ((param_4 !== DAT_00633e50)) {
        iVar1 = FUN_005b8ca6(param_3, param_4);
        if ((-1 < iVar1)) {
          if ((DAT_006d1da8 !== 1)) {
            return;
          }
          if ((DAT_0062804c === 0)) {
            return;
          }
          for (/* cond: (-1 < local_c) */); (wv(DAT_00655afe, ((DAT_00655afe) << 16 >> 16)) && (-1 = (-1 < local_c))); local_c = FUN_005b2c82(local_c))
          {
          }
          if ((local_c < 0)) {
            return;
          }
          iVar1 = FUN_005b633f(local_c);
          if ((iVar1 === 0)) {
            return;
          }
          if ((_MEM[DAT_006560ff + local_c * 0x20] === 1)) {
            return;
          }
          if ((_MEM[DAT_006560ff + local_c * 0x20] === 2)) {
            return;
          }
        }
        local_8 = FUN_005b8b65(param_3, param_4, DAT_006d1da0);
        if ((s8(_MEM[DAT_006560f7 + local_c * 0x20]) !== (DAT_006d1da0 & 0xff))) {
          if ((s8(_MEM[DAT_006560f7 + local_c * 0x20]) !== (DAT_006d1da0 & 0xff))) {
            local_8 = 0;
          }
          else {
            local_8 = 1;
          }
        }
        if ((DAT_00655b07 !== 0)) {
          FUN_0047bd04(local_c, param_1, param_2);
        }
      }
      else {
        FUN_0047bd04(DAT_00633e54, param_1, param_2);
      }
    }
    else {
      for (/* cond: (-1 < local_c) */); (local_c = (local_c !== DAT_00633e48) && (-1 = (-1 < local_c))); local_c = FUN_005b2c82(local_c)) {
      }
      FUN_0047bd04(local_c, param_1, param_2);
    }
  }
  return;
}


 export function FUN_0047c103 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_34;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047a6b0(DAT_fffffff4, DAT_fffffff0, param_1, param_2);
  FUN_0047a8c9(in_ECX, local_c, local_10, param_1, param_2, param_3, ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16), -1);
  FUN_00407ff0();
  if ((2 < DAT_00655b02)) {
    FUN_0047e94e(1, 0);
  }
  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== 0)) {
    if ((DAT_0062bcd8 === 0)) {
      FUN_0047ba1d(local_c, local_10, param_1, param_2);
      FUN_0047be63(local_c, local_10, param_1, param_2);
    }
    if (((None & 0x20) !== 0)) {
      local_8 = 0;
      FUN_0047dff0();
      for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
        if ((iVar1 < 3)) {
          local_8 = 1;
          break;
        }
      }
      if ((local_8 === 0)) {
        FUN_005cef31(DAT_ffffffcc, in_ECX, local_c, local_10);
      }
      else {
        FUN_005cef31(DAT_ffffffdc, in_ECX, local_c, local_10);
      }
      FUN_0047df50();
    }
  }
  return;
}


 export function FUN_0047c2f2 (param_1, param_2, param_3)

 {
  let uVar1;

  if (((DAT_00655ae8 & 0x8000) === 0)) {
    if ((param_1 < param_2)) {
      param_1 = (param_1 + ((DAT_006d1160) << 16 >> 16));
    }
    if (((param_2 + param_3) <= param_1)) {
      param_1 = (param_1 - ((DAT_006d1160) << 16 >> 16));
    }
  }
  if ((param_1 < param_2)) {
    uVar1 = 0;
  }
  else if ((((param_2 + param_3) - param_1) < 1)) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_0047c37f (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let uVar2;

  iVar1 = FUN_0047c2f2(param_1, param_3, param_5);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else if ((param_2 < param_4)) {
    uVar2 = 0;
  }
  else if ((param_2 < (param_6 + param_4))) {
    uVar2 = 1;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_0047c3e0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_0047c37f(param_1, param_2, s32((in_ECX + 0x2e8), 0), s32((in_ECX + 0x2ec), 0), (s32((in_ECX + 0x2f8), 0) + s32((in_ECX + 0x300), 0)), ((s32((in_ECX + 0x2fc), 0) + s32((in_ECX + 0x304), 0)) + 1));
  return;
}


 export function FUN_0047c443 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_28;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_0062bcd8 === 0)) {
    if ((-1 < param_3)) {
      param_3 = (param_3 + 3);
    }
    FUN_005baec8((in_ECX + 0x338));
    for (/* cond: (local_1c < ((DAT_00655b18) << 16 >> 16)) */); local_1c = (local_1c < ((DAT_00655b18) << 16 >> 16)); local_1c = (local_1c + 1)) {
      if ((s32((DAT_0064f394 + local_1c * 0x58), 0) !== 0)) {
        local_10 = ((s16((DAT_0064f340 + local_1c * 0x58), 0)) << 16 >> 16);
        local_14 = ((s16((DAT_0064f342 + local_1c * 0x58), 0)) << 16 >> 16);
        if ((iVar1 !== 0)) {
          local_c = FUN_005b8b65(local_10, local_14, DAT_006d1da0);
          if ((s8(_MEM[DAT_0064f348 + local_1c * 0x58]) !== (DAT_006d1da0 & 0xff))) {
            if ((_MEM[DAT_0064f34d + (local_1c * 0x58 + DAT_006d1da0)] === 0)) {
              local_c = 0;
            }
            else {
              local_c = 1;
            }
          }
          if ((DAT_00655b07 !== 0)) {
            local_c = 1;
          }
          if ((local_c !== 0)) {
            FUN_0047a6b0(DAT_ffffffe8, DAT_ffffffe0, local_10, local_14);
            iVar1 = (s32((in_ECX + 0x310), 0) + local_18);
            local_8 = ((s32((in_ECX + 0x30c), 0) * 3 >> 2) + local_20);
            FUN_005baee0(0xa, -1, -1, -1);
            iVar2 = FUN_0047dfb0(2);
            if ((iVar2 < 3)) {
              local_28 = FUN_0047dfb0(2);
            }
            else {
              local_28 = 2;
            }
            local_28 = (local_8 + local_28);
            iVar2 = FUN_0040efd0((DAT_0064f360 + local_1c * 0x58));
            FUN_005baf57(in_ECX, (DAT_0064f360 + local_1c * 0x58), (iVar1 - (iVar2 >> 1)), local_28)
            ;
            iVar2 = FUN_0047dfb0(2);
            if ((iVar2 < 3)) {
              local_2c = FUN_0047dfb0(2);
            }
            else {
              local_2c = 2;
            }
            uVar3 = FUN_0043cb30(s8(_MEM[DAT_0064f348 + local_1c * 0x58]), 0xa, local_2c, 0);
            FUN_005baee0(uVar3);
            iVar2 = local_8;
            iVar4 = FUN_0040efd0((DAT_0064f360 + local_1c * 0x58));
            FUN_005baf57(in_ECX, (DAT_0064f360 + local_1c * 0x58), (iVar1 - (iVar4 >> 1)), iVar2);
          }
        }
      }
    }
  }
  return;
}


 export function FUN_0047c7aa (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047a6b0(DAT_fffffff8, DAT_fffffff4, param_1, param_2);
  local_c = (local_c - (param_3 * 2 + 1) * s32((in_ECX + 0x314), 0));
  local_8 = (local_8 + s32((in_ECX + 0x310), 0) * param_3 * -2);
  local_10 = (param_3 * 2 + 1) * s32((in_ECX + 0x308), 0);
  FUN_004086c0(DAT_ffffffe0, local_8, local_c, local_10, (param_3 * 4 + 3) * s32((in_ECX + 0x314), 0))
  ;
  FUN_0047df80(param_4, DAT_ffffffe0, (in_ECX + 0x2bc));
  return;
}


 export function FUN_0047c869 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_34;
  let local_2c;
  let local_24;
  let local_18;
  let local_14;

  FUN_0047c7aa(param_1, param_2, param_3, DAT_ffffffec);
  FUN_005c0073(DAT_ffffffec);
  uVar1 = (param_3 * 2 + 2);
  for (/* cond: (local_2c <= uVar1) */); local_2c = local_2c; local_2c = (local_2c + 1)) {
    if ((local_2c < 1)) {
      uVar2 = ((~local_2c) + 1);
    }
    else {
      uVar2 = (local_2c & 1);
    }
    local_18 = (uVar1 - uVar2);
    for (/* cond: (local_24 <= local_18) */); local_24 = local_24; local_24 = (local_24 + 2)) {
      if ((local_24 < 1)) {
        local_34 = ((~local_24) + 1);
      }
      else {
        local_34 = local_24;
      }
      if ((local_34 !== uVar1)) {
        uVar3 = FUN_005ae052((local_24 + param_1));
        iVar4 = FUN_0047c3e0(uVar3, (param_2 + local_2c));
        if ((iVar4 !== 0)) {
          FUN_0047c103(uVar3, (param_2 + local_2c), param_4);
        }
      }
    }
  }
  FUN_0047c443(param_1, param_2, param_3);
  FUN_005c0073((in_ECX + 0x2bc));
  return;
}


 export function FUN_0047c9d4 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_18;
  let local_14;

  if ((s32((in_ECX + 0x334), 0) !== 0)) {
    FUN_005a9aa3();
  }
  for (/* cond: (local_1c < ((s32((in_ECX + 0x2fc), 0) + s32((in_ECX + 0x304), 0)) + 1)) */); local_1c = local_1c;
      local_1c = (local_1c + 1)) {
    iVar1 = s32((in_ECX + 0x2ec), 0);
    iVar2 = s32((in_ECX + 0x2e8), 0);
    if (((local_1c & 1) === 0)) {
      local_14 = s32((in_ECX + 0x300), 0);
    }
    else {
      local_14 = s32((in_ECX + 0x2f8), 0);
    }
    for (/* cond: (local_18 < local_14) */); local_18 = (local_18 < local_14); local_18 = (local_18 + 1)) {
      uVar3 = FUN_005ae052((local_18 * 2 + (iVar2 + (local_1c & 1))));
      FUN_0047c103(uVar3, (iVar1 + local_1c), param_1);
    }
  }
  FUN_0047c443(0, 0, -1);
  return;
}


 export function FUN_0047caea (param_1, param_2, param_3)

 {
  let local_14;

  FUN_0047c7aa(param_1, param_2, param_3, DAT_ffffffec);
  FUN_00408490(DAT_ffffffec);
  return;
}


 export function FUN_0047cb26 (param_1, param_2)

 {
  FUN_0047caea(param_1, param_2, 0);
  return;
}


 export function FUN_0047cb50 ()

 {
  FUN_00407ff0();
  if ((2 < DAT_00655b02)) {
    FUN_0047e94e(1, 0);
  }
  FUN_00408460();
  FUN_00407ff0();
  if ((2 < DAT_00655b02)) {
    FUN_0047e94e(1, 0);
  }
  return;
}


 export function FUN_0047cbb4 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  if ((DAT_00628044 !== 0)) {
    wv(DAT_006ad908, 1);
    if ((DAT_00655b07 === 0)) {
      local_20 = param_4;
    }
    else {
      local_20 = -1;
    }
    FUN_0047c869(param_1, param_2, param_3, local_20);
    if ((iVar1 !== 0)) {
      FUN_0047a6b0(DAT_fffffff4, DAT_fffffff8, ((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
      FUN_0047dff0();
      FUN_005cef31(DAT_ffffffe4, in_ECX, local_c, local_8);
      FUN_0047df50();
    }
    if ((param_5 !== 0)) {
      FUN_0047caea(param_1, param_2, param_3);
    }
    wv(DAT_006ad908, 0);
  }
  return;
}


 export function FUN_0047cced (param_1, param_2)

 {
  FUN_0047cbb4(param_1, param_2, 0, DAT_006d1da0, 1);
  return;
}


 export function FUN_0047cd1f (param_1, param_2)

 {
  FUN_0047cbb4(param_1, param_2, 1, DAT_006d1da0, 1);
  return;
}


 export function FUN_0047cd51 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_00628044 !== 0)) {
    wv(DAT_006ad908, 1);
    FUN_00552ed2();
    FUN_00479fbe();
    FUN_00552112();
    if ((DAT_00655b07 === 0)) {
      local_8 = param_1;
    }
    else {
      local_8 = -1;
    }
    FUN_0047c9d4(local_8);
    if ((s32((in_ECX + 0x2d8), 0) === 0)) {
      FUN_0040733c();
    }
    if ((DAT_006ad684 === 0)) {
      FUN_00421bd0();
    }
    wv(DAT_006ad908, 0);
  }
  return;
}


 export function FUN_0047ce1e (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5);
    }
  }
  return;
}


 export function FUN_0047cea6 (param_1, param_2)

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_0047cced(param_1, param_2);
    }
  }
  return;
}


 export function FUN_0047cf22 (param_1, param_2)

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_0047cd1f(param_1, param_2);
    }
  }
  return;
}


 export function FUN_0047cf9e (param_1, param_2)

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_0047cd51(param_1, param_2);
    }
  }
  return;
}


 export function FUN_0047dce0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0047ddba;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_0043c690();
  local_8 = 1;
  FUN_0043c690();
  local_8 = 2;
  FUN_005bd630();
  local_8 = ((((local_8) >> 8) << 8) | 3);
  FUN_005bd630();
  w32(in_ECX, 0, PTR_FUN_0061d1e4);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* __thiscall */
 /* CBitmapButton::~CBitmapButton(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CBitmapButton (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0047dec7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 3;
  FUN_0047de82();
  local_8 = 2;
  FUN_0047de91();
  local_8 = 1;
  FUN_0047dea0();
  local_8 = (0 << 8);
  FUN_0047deaf();
  local_8 = -1;
  FUN_0047debe();
  FUN_0047ded1();
  return;
}


 export function FUN_0047de82 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0047de91 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0047dea0 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0047deaf ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0047debe (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0047ded1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0047df20 (param_1)

 {
  FUN_005cd775((param_1 + 8), 8);
  return;
}


 export function FUN_0047df50 ()

 {
  FUN_005cd775(1, 1);
  return;
}


 export function FUN_0047df80 (param_1, param_2, param_3)

 {
  FUN_006e7d48(param_1, param_2, param_3);
  return;
}


 export function FUN_0047dfb0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00472cf0(param_1, ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16));
  return;
}


 export function FUN_0047dff0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0047df20(((s16((in_ECX + 0x2e4), 0)) << 16 >> 16));
  return;
}


 export function FUN_0047e030 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_005b8b65(param_1, param_2, DAT_006d1da0);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((iVar1 !== 0)) {
        return 1;
      }
    }
  }
  return 0;
}


 export function FUN_0047e0e5 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_24;
  let local_8;

  if ((DAT_006ad90c !== 0)) {
    FUN_005d225b(s_STACKED_DRAW_stack_full._Flushin_0062bcf0);
    if ((DAT_006ad918 !== 0)) {
      wv(DAT_006ad914, ((DAT_006ad910 + 1) % 0x64));
    }
    else {
      wv(DAT_006ad910, 0);
      wv(DAT_006ad914, 0);
    }
    wv(DAT_006ad90c, u8((DAT_006ad918 !== 0)));
    FUN_0047e0e5(0xa3, DAT_ffffffdc, 0);
    iVar1 = FUN_0047e0e5(0x74, DAT_ffffffdc, 0);
  }
  else {
    if ((0x63 < DAT_006ad910)) {
      FUN_005dae6b(7, s_gNetMgr.firstStackedDraw_>=_0_&&_0062bd38, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd14, 0x5a);
    }
    if ((0x63 < DAT_006ad914)) {
      FUN_005dae6b(7, s_gNetMgr.lastStackedDraw_>=_0_&&_g_0062bdac, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bd88, 0x5b);
    }
    w32((DAT_006ad920 + DAT_006ad914 * 0x40), 0, param_1);
    for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
      w32((DAT_006ad924 + (local_8 * 4 + DAT_006ad914 * 0x40)), 0, s32((param_2 + local_8 * 4), 0));
    }
    if ((param_1 === 0x70)) {
      FID_conflict:_memcpy((DAT_006ad914 * 0x40 + 0x6ad940), param_3, 0x20);
    }
    wv(DAT_006ad90c, (DAT_006ad90c + 1));
    if ((DAT_006ad91c < (DAT_006ad90c + 1))) {
      wv(DAT_006ad91c, (DAT_006ad90c + 1));
    }
    iVar1 = ((DAT_006ad914 + 1) / 0x64 | 0);
    wv(DAT_006ad914, ((DAT_006ad914 + 1) % 0x64));
  }
  return iVar1;
}


 export function FUN_0047e2b3 ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let local_8;

  /* switch */ (s32((DAT_006ad920 + DAT_006ad910 * 0x40), 0) ( *) (DAT_006ad920 (DAT_006ad920 + DAT_006ad910 * 0x40) DAT_006ad910 * 0x40  )) {
  case 0x70 :
    iVar6 = s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0);
    iVar1 = s32((DAT_006ad92c + DAT_006ad910 * 0x40), 0);
    uVar4 = s32((DAT_006ad930 + DAT_006ad910 * 0x40), 0);
    FUN_005b2590(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0));
    iVar2 = FUN_0047e030(iVar6, iVar1);
    if ((iVar2 !== 0)) {
      FID_conflict:_memcpy(DAT_00666110, (DAT_006ad910 * 0x40 + 0x6ad940), 0x20);
      wv(DAT_00666126, 0xffff);
      wv(DAT_00666128, 0xffff);
      FUN_004105f8(iVar6, iVar1, s8(DAT_00666117));
      if ((s32((DAT_006ad934 + DAT_006ad910 * 0x40), 0) === -1)) {
        FUN_0046e020(0x63, 1, 0, 0);
      }
      iVar2 = FUN_005b8931(iVar6, iVar1);
      uVar3 = FUN_005b2e69(iVar6, iVar1, 2);
      local_8 = FUN_005b50ad(uVar3);
      if ((((DAT_00666112) << 16 >> 16) !== iVar1)) {
        local_8 = (local_8 + 1);
      }
      if ((local_8 === 1)) {
        _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] & 0xfe);
      }
      else if ((1 < local_8)) {
        wv(DAT_00633e4c, ((DAT_00666110) << 16 >> 16));
        wv(DAT_00633e50, ((DAT_00666112) << 16 >> 16));
        iVar5 = FUN_005b50ad(0x801, 5);
        if ((iVar5 === 0)) {
          if ((DAT_00666128 < 0)) {
            if ((DAT_00666126 < 0)) {
              _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] & 0xfe);
            }
            else {
              wv(DAT_00633e54, ((DAT_00666126) << 16 >> 16));
            }
          }
          else {
            wv(DAT_00633e54, ((DAT_00666128) << 16 >> 16));
          }
        }
        else {
          iVar5 = FUN_005b50ad(0x801, 5);
          if ((iVar5 < 2)) {
            _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] & 0xfe);
          }
          else {
            wv(DAT_00633e54, FUN_005b2d39(0x801));
            do {
              if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + DAT_00633e54 * 0x20]) * 0x14] === 2));
            } while ((-1 < ((s16((DAT_00656108 + DAT_00633e54 * 0x20), 0)) << 16 >> 16)));
            _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] & 0xfe);
          }
        }
      }
 LAB_0047e5c2: :
      wv(DAT_00636058, 1);
      FUN_0056c705(0x801, iVar6, iVar1, uVar4, DAT_006ad6a4, DAT_006ad6a8);
      wv(DAT_00636058, 0);
      uVar4 = FUN_005b2e69(iVar6, iVar1, 2);
      iVar5 = FUN_005b50ad(uVar4);
      if ((iVar5 !== 0)) {
        if ((DAT_006ad2f7 === 0)) {
          _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] | 1);
        }
        else {
          FUN_005b94fc(iVar6, iVar1, 1, 1, 1);
        }
      }
    }
    break;
  case 0x71 :
    iVar6 = FUN_005b8b65(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0), DAT_006d1da0);
    if ((iVar6 !== 0)) {
      FUN_004105f8(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad92c + DAT_006ad910 * 0x40), 0));
    }
    break;
  case 0x72 :
    FUN_0047cea6(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0));
    break;
  case 0x73 :
    FUN_005802fd(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad92c + DAT_006ad910 * 0x40), 0), s32((DAT_006ad930 + DAT_006ad910 * 0x40), 0));
    break;
  case 0x74 :
    FUN_0047cf9e(DAT_006d1da0, 1);
    break;
  case 0x75 :
    FUN_0047cf22(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0));
    break;
  case 0x76 :
    FUN_0047ce1e(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad92c + DAT_006ad910 * 0x40), 0), s32((DAT_006ad930 + DAT_006ad910 * 0x40), 0), 1);
    break;
  case 0x7c :
    iVar6 = FUN_0047e030(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0));
    if ((iVar6 !== 0)) {
      FUN_0057ed3f(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad92c + DAT_006ad910 * 0x40), 0));
    }
    break;
  case 0x7d :
    iVar6 = FUN_0047e030(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0));
    if ((iVar6 !== 0)) {
      FUN_0057f657(s32((DAT_006ad924 + DAT_006ad910 * 0x40), 0), s32((DAT_006ad928 + DAT_006ad910 * 0x40), 0));
    }
    break;
  case 0xa3 :
    wv(DAT_006c926c, (DAT_006c926c + 1));
  }
  wv(DAT_006ad90c, (DAT_006ad90c + -1));
  iVar6 = (DAT_006ad910 + 1);
  wv(DAT_006ad910, (iVar6 % 0x64));
  return (iVar6 / 0x64 | 0);
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0047e94e (in_ECX, unaff_ESI, unaff_EBX, param_1, param_2)

 {
  let piVar1;
  let iVar2;
  let cVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  // in_ECX promoted to parameter;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let bVar7;
  let local_748;
  let local_740;
  let local_738;
  let local_734;
  let local_718;
  let local_714;
  let local_6fc;
  let local_6e0;
  let local_6dc;
  let local_6d8;
  let local_6d4;
  let local_6d0;
  let local_6cc;
  let local_6c8;
  let local_6c4;
  let local_6c0;
  let local_6bc;
  let local_6b8;
  let local_6b0;
  let local_6ac;
  let local_6a8;
  let local_6a4;
  let local_6a0;
  let local_69c;
  let local_698;
  let local_694;
  let local_690;
  let local_68c;
  let local_688;
  let local_684;
  let local_680;
  let local_67c;
  let local_678;
  let local_380;
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
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0048231d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_1c = 0;
  local_44 = 0;
  if ((iVar4 !== 0)) {
    FUN_00482327(unaff_ESI, unaff_EBX);
    return;
  }
  if ((iVar4 === 0)) {
    local_64 = s32((in_ECX + 0x160a4), 0);
    wv(DAT_0062bcec, 1);
    FUN_005d225b(s_Poll:_Unstacking_XD_FlushSendBuf_0062bdf8);
    w32((in_ECX + 0x160a4), 0, 0);
    /* switch */ () {
    case 1 :
      if ((s16((s32((in_ECX + 0x160c4), 0) + 0x2dc), 0) !== 0)) {
        if ((s32((in_ECX + 0x160c4), 0) === 0)) {
          local_734 = 0;
        }
        else {
          local_734 = (s32((in_ECX + 0x160c4), 0) + 0x48);
        }
        FUN_005c6303(local_734);
        FUN_00410f77(s32((in_ECX + 0x160a8), 0), s32((in_ECX + 0x160ac), 0), s32((in_ECX + 0x160b0), 0));
      }
      break;
    case 2 :
      if ((s16((s32((in_ECX + 0x160c4), 0) + 0x2dc), 0) !== 0)) {
        if ((s32((in_ECX + 0x160c4), 0) === 0)) {
          local_738 = 0;
        }
        else {
          local_738 = (s32((in_ECX + 0x160c4), 0) + 0x48);
        }
        FUN_005c6303(local_738);
        FUN_00411705(s32((in_ECX + 0x160a8), 0), s32((in_ECX + 0x160ac), 0));
      }
      break;
    case 4 :
      local_68 = DAT_006c31c4;
      local_60 = ((((local_60) >> 8) << 8) | DAT_006c31c8);
      FUN_004125c6(s32((in_ECX + 0x160a8), 0));
      if ((local_68 === 3)) {
        FUN_00411f91(local_60);
      }
      break;
    case 5 :
      FUN_004e2803(s32((in_ECX + 0x160a8), 0), s32((in_ECX + 0x160ac), 0));
      break;
    case 6 :
      if ((s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x160a8), 0) * 0x58]) === s32((in_ECX + 0x160ac), 0))) {
        FUN_0050c1d1(s32((in_ECX + 0x160b0), 0), s32((in_ECX + 0x160b4), 0), s32((in_ECX + 0x160b8), 0));
      }
      break;
    case 7 :
      if ((s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x160a8), 0) * 0x58]) === s32((in_ECX + 0x160ac), 0))) {
        FUN_00509b48(s32((in_ECX + 0x160b0), 0));
      }
      break;
    case 8 :
      if ((s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x160a8), 0) * 0x58]) === s32((in_ECX + 0x160ac), 0))) {
        FUN_0050a473(s32((in_ECX + 0x160b0), 0));
      }
      break;
    case 9 :
      if ((s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x160a8), 0) * 0x58]) === s32((in_ECX + 0x160ac), 0))) {
        FUN_0050bacd(s32((in_ECX + 0x160b0), 0));
      }
      break;
    case 10 :
      if ((s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x160a8), 0) * 0x58]) === s32((in_ECX + 0x160ac), 0))) {
        FUN_0050b74e(s32((in_ECX + 0x160b0), 0));
      }
    }
    wv(DAT_0062bcec, 0);
  }
  w32((in_ECX + 0x580), 0, (s32((in_ECX + 0x580), 0) + 1));
  if ((s32((in_ECX + 0x584), 0) < s32((in_ECX + 0x580), 0))) {
    w32((in_ECX + 0x584), 0, s32((in_ECX + 0x580), 0));
  }
 LAB_0047efdc: :
  do {
    if ((param_1 === 0)) {
 LAB_00482295: :
      if ((local_1c !== 0)) {
        FUN_004257fe();
      }
      if ((DAT_00631130 !== 0)) {
        FUN_00511ba2();
      }
      w32((in_ECX + 0x580), 0, (s32((in_ECX + 0x580), 0) + -1));
      FUN_00482327(unaff_ESI, unaff_EBX);
      return;
    }
    if ((0 < s32((in_ECX + 0x804), 0))) {
      w32((in_ECX + 0x810), 0, 1);
      if ((s32((in_ECX + 0x804), 0) < 0x22)) {
        local_54 = 1;
      }
      else {
        local_54 = 2;
      }
      for (/* cond: (0 < local_54) */); 0 = (0 < local_54); local_54 = (local_54 + -1)) {
        FUN_0047e2b3();
      }
      w32((in_ECX + 0x810), 0, 0);
    }
    if ((DAT_006c8fac < 0x22)) {
      FUN_00453af0();
      param_1 = (param_1 + -1);
    }
    if ((DAT_006c8fac < 0x22)) {
      local_740 = param_2;
    }
    else {
      local_740 = 1;
    }
    cVar3 = FUN_005149d6(DAT_ffffffa8, DAT_ffffffe0, DAT_ffffffa4, local_740);
    if ((cVar3 === 0)) {
      FUN_005dae6b(7, s_pData_!=_NULL_0062be4c, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062be28, 0x195);
    }
    local_24 = local_20;
    if ((s32(local_20, 0) === 0x66606660)) {
      w32((DAT_006c8fe0 + s32(local_20, 1) * 4), 0, (s32((DAT_006c8fe0 + s32(local_20, 1) * 4), 0) + 1));
      if ((DAT_00654fd8 === 0)) {
        operator_delete(local_20);
        goto LAB_00482295;
      }
      local_48 = (local_20 + 0xb);
      /* switch */ ((local_20 + 1) []) {
      case 0 :
        local_84 = local_20;
        w32((DAT_006c8fe0 + s32(local_20, 0x1c) * 4), 0, (s32((DAT_006c8fe0 + s32(local_20, 0x1c) * 4), 0) + 1));
        if ((s32(local_20, 0x1c) === 1)) {
          if ((DAT_006ad2f0 !== 0)) {
            FUN_0046b14d(2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          }
        }
        else if ((s32(local_20, 0x1c) === 2)) {
          FUN_0059b571(local_20);
          local_1c = 1;
        }
        break;
      default :
        FUN_005d225b(s_Received_unknown_message_type._0062bf14);
        break;
      case 4 :
        FID_conflict:_memcpy((in_ECX + 0x200), (local_20 + 4), 0x270);
        for (/* cond: (local_54 < 7) */); local_54 = (local_54 < 7); local_54 = (local_54 + 1)) {
          if ((s32(((in_ECX + 0x204) + local_54 * 0x54), 0) === s32((in_ECX + 0x1f8), 0))) {
            w32((in_ECX + 0x1fc), 0, local_54);
            break;
          }
        }
        break;
      case 5 :
        uVar5 = FUN_00421bb0();
        w32((in_ECX + 0x56c), 0, uVar5);
        break;
      case 6 :
        wv(DAT_006ad6ac, ((s32(local_20, 4)) & 0xFFFF));
        FUN_005f22d0(DAT_006ad6ae, (local_20 + 0x12));
        FUN_005f22d0(DAT_006ad7b2, (local_24 + 0x116));
        break;
      case 7 :
      case 8 :
      case 9 :
        local_4c = 0x2c;
        local_50 = s32(local_20, 4);
        local_18 = (local_5c - 0x2c);
        FID_conflict:_memcpy(local_20, (local_20 + 0xb), local_18);
        local_20 = FID_conflict:__expand(local_20, local_18);
        FUN_004b1de3(DAT_ffffffe0, local_50);
        break;
      case 10 :
        local_4c = 0x2c;
        local_50 = s32(local_20, 4);
        local_18 = (local_5c - 0x2c);
        FID_conflict:_memcpy(local_20, (local_20 + 0xb), local_18);
        local_20 = FID_conflict:__expand(local_20, local_18);
        FUN_004b2010(DAT_ffffffe0, local_50);
        break;
      case 0xb :
      case 0xc :
      case 0x11 :
        break;
      case 0xd :
        break;
      case 0xe :
        _MEM[(in_ECX + 0x590)] = (_MEM[(in_ECX + 0x590)] + 1);
        break;
      case 0xf :
        _MEM[(in_ECX + 0x590)] = (_MEM[(in_ECX + 0x590)] + 1);
        break;
      case 0x10 :
        wv(DAT_006ad664, (DAT_006ad664 + -1));
        break;
      case 0x12 :
        FUN_0046b14d(0x13, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x13 :
        if ((DAT_006ad108 !== 0)) {
          FUN_005f22d0((DAT_006ad108 + 0x88), (local_20 + 4));
          FUN_005f22d0((DAT_006ad108 + 0xa8), (local_24 + 0x20));
          FUN_005f22d0((DAT_006ad108 + 0xc8), (local_24 + 0x28));
          FUN_005f22d0((DAT_006ad108 + 0xe8), (local_24 + 0x10));
        }
        FUN_005f22d0(DAT_006ad57c, (local_24 + 4));
        FUN_005f22d0(DAT_006ad59c, (local_24 + 0x20));
        FUN_005f22d0(DAT_006ad5bc, DAT_00666570);
        FUN_005f22d0(DAT_006ad5fc, (local_24 + 0x10));
        break;
      case 0x14 :
        break;
      case 0x15 :
      case 0x5c :
        local_694 = 0;
        local_6a0 = 0;
        local_69c = 0;
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((DAT_0062d0bc !== 0)) {
          for (/* cond: (local_6a4 < local_40) */); local_6a4 = (local_6a4 < local_40); local_6a4 = (local_6a4 + 1)) {
            local_6d0 = s32(local_48, 0);
            local_698 = s32(local_48, 1);
            local_684 = s32(local_48, 2);
            local_48 = (local_48 + 3);
            if (((local_6d0 & 0x7fff) === 1)) {
              local_680 = DAT_00655afe;
              local_6b0 = DAT_00655b00;
              local_6cc = DAT_00655b02;
              local_6ac = DAT_00655b03;
              local_68c = DAT_00655b04;
              local_688 = DAT_00655b05;
              local_67c = DAT_00655aea;
              local_690 = DAT_00655af2;
            }
            else if ((local_6a0 !== 0)) {
              if (((local_6d0 & 0x7fff) === 0xb)) {
                local_69c = 1;
              }
            }
            else {
              local_6a0 = 1;
              for (/* cond: (local_6c8 < ((DAT_00655b16) << 16 >> 16)) */); local_6c8 = (local_6c8 < ((DAT_00655b16) << 16 >> 16)); local_6c8 = (local_6c8 + 1)) {
                w16((DAT_0066fd98 + local_6c8 * 2), 0, s16((DAT_006560f0 + local_6c8 * 0x20), 0));
                w16((DAT_00670da0 + local_6c8 * 2), 0, s16((DAT_006560f2 + local_6c8 * 0x20), 0));
                w16((DAT_0066ed98 + local_6c8 * 2), 0, s16((DAT_00656108 + local_6c8 * 0x20), 0));
                w16((DAT_00671da0 + local_6c8 * 2), 0, s16((DAT_00656106 + local_6c8 * 0x20), 0));
              }
            }
            if (((local_6d0 & 0x8000) === 0)) {
              FID_conflict:_memcpy((s32(DAT_0067a424, local_6d0 * 6) + local_698), local_48, local_684);
              FID_conflict:_memcpy(((s32((DAT_0067a420 + local_6d0 * 0x18), 0) + local_698) + DAT_0062d0bc), local_48, local_684);
            }
            else {
              local_6d0 = (local_6d0 & 0x7fff);
              local_6c0 = (local_684 + local_48);
              local_6c4 = local_48;
              local_6a8 = FUN_004b24a2(DAT_fffff93c);
              local_6bc = (s32(DAT_0067a424, local_6d0 * 6) + local_698);
              local_6b8 = (local_6bc + local_6a8);
              FUN_004b251a(DAT_fffff93c);
              FID_conflict:_memcpy(((s32((DAT_0067a420 + local_6d0 * 0x18), 0) + local_698) + DAT_0062d0bc), (s32(DAT_0067a424, local_6d0 * 6) + local_698), local_6a8);
            }
            if ((local_6d0 === 1)) {
              wv(DAT_00655afe, local_680);
              wv(DAT_00655b00, local_6b0);
              wv(DAT_00655b02, local_6cc);
              wv(DAT_00655b03, local_6ac);
              wv(DAT_00655b04, local_68c);
              wv(DAT_00655b05, local_688);
              wv(DAT_00655aea, local_67c);
              wv(DAT_00655af2, local_690);
            }
            if ((local_6d0 === 6)) {
              local_694 = 1;
            }
            local_48 = (local_48 + local_684);
          }
          if ((local_694 !== 0)) {
            FUN_00509429();
          }
          if ((local_6a0 !== 0)) {
            for (/* cond: (local_6c8 < ((DAT_00655b16) << 16 >> 16)) */); local_6c8 = (local_6c8 < ((DAT_00655b16) << 16 >> 16)); local_6c8 = (local_6c8 + 1)) {
              w16((DAT_006560f0 + local_6c8 * 0x20), 0, s16((DAT_0066fd98 + local_6c8 * 2), 0));
              w16((DAT_006560f2 + local_6c8 * 0x20), 0, s16((DAT_00670da0 + local_6c8 * 2), 0));
              w16((DAT_00656108 + local_6c8 * 0x20), 0, s16((DAT_0066ed98 + local_6c8 * 2), 0));
              w16((DAT_00656106 + local_6c8 * 0x20), 0, s16((DAT_00671da0 + local_6c8 * 2), 0));
            }
          }
          if ((local_69c !== 0)) {
            wv(DAT_00628048, DAT_00654fa4);
          }
        }
        break;
      case 0x16 :
        break;
      case 0x17 :
        FID_conflict:_memcpy(DAT_0064bcc8, local_48, 0x29);
        break;
      case 0x18 :
        FID_conflict:_memcpy(DAT_00627680, local_48, 0x640);
        break;
      case 0x19 :
        FID_conflict:_memcpy(DAT_0064c488, local_48, 0x218);
        break;
      case 0x1a :
        FID_conflict:_memcpy(DAT_0064ba28, local_48, 0x1c);
        break;
      case 0x1b :
        FID_conflict:_memcpy(DAT_0064b1b8, local_48, 0x4d8);
        break;
      case 0x1c :
        FID_conflict:_memcpy(DAT_00627cc0, local_48, 0x318);
        break;
      case 0x1d :
        FID_conflict:_memcpy(DAT_0064b9a0, local_48, 0x1c);
        break;
      case 0x1e :
        FID_conflict:_memcpy(DAT_00654fe0, local_48, 0x38);
        break;
      case 0x1f :
        FID_conflict:_memcpy(DAT_006554f8, local_48, 0x3f0);
        break;
      case 0x20 :
        FID_conflict:_memcpy(DAT_0064c6a0, local_48, 0x7524);
        break;
      case 0x21 :
        FID_conflict:_memcpy(DAT_0064b168, local_48, 0x40);
        break;
      case 0x22 :
        FID_conflict:_memcpy(DAT_00655490, local_48, 0x68);
        break;
      case 0x23 :
        FID_conflict:_memcpy(DAT_0064ba10, local_48, 0x18);
        break;
      case 0x24 :
        FID_conflict:_memcpy(DAT_0064b9c0, local_48, 0x24);
        break;
      case 0x25 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00627670, local_40);
        wv(DAT_0064b998, local_3c);
        if ((local_40 !== 0)) {
          FUN_0048308f();
        }
        break;
      case 0x26 :
        break;
      case 0x27 :
        break;
      case 0x28 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006ad640, local_40);
        break;
      case 0x2a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00654fb0, ((local_40) & 0xFFFF));
        wv(DAT_00655b0b, (DAT_00655b0b & ((local_40) & 0xFF)));
        _DAT_006c90a0 = (None + 1);
        break;
      case 0x2b :
        FUN_0046b14d(0x2c, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x2c :
        break;
      case 0x2d :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_006c3188 + local_40 * 4), 0, 1);
        FUN_0048de75();
        break;
      case 0x2e :
        if ((DAT_006ad2f7 === 0)) {
          FUN_005dae6b(7, s_gNetMgr.bServer_0062bec8, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062bea4, 0x22a);
        }
        if ((DAT_006ad698 === 0)) {
          iVar4 = FUN_005233fc(local_24, local_58);
          if ((iVar4 === 0)) {
            FUN_0046b14d(0xc, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
          }
          else {
            _DAT_006c90a0 = (None + 1);
            if ((2 < DAT_006ad640)) {
              FUN_0059db08(0x4000);
              local_8 = 1;
              FUN_0046b14d(0x65, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
              FUN_0055ae80(0);
              FUN_0040ffa0(s_WAITONGAMEXMIT_0062bed8, 0x2000000);
              FUN_0040bc80(0);
              FUN_0046b14d(0x33, local_58, ((DAT_00654fac) << 16 >> 16), ((DAT_00654fae) << 16 >> 16), ((DAT_00654c7c) << 16 >> 16), 0, 0, 0, 0, 0);
              FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
              XD_FlushSendBuffer(0x1388);
              FUN_004b0b53(0xff, 2, 0, 0, 0);
              XD_FlushSendBuffer(0x1388);
              FUN_0046b14d(0xa, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
              FUN_004b0b53(local_58, 1, 0, 0, 0);
              XD_FlushSendBuffer(0x1388);
              FUN_0046b14d(0x25, local_58, DAT_00627670, DAT_0064b998, 0, 0, 0, 0, 0, 0);
              FUN_00523d8a(local_58);
              XD_FlushSendBuffer(0x1388);
              FUN_0046b14d(0x28, local_58, DAT_006ad640, 0, 0, 0, 0, 0, 0, 0);
              FUN_0046b14d(0x16, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
              FUN_0046b14d(0x9c, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
              local_380 = FUN_00421bb0();
              do {
                iVar4 = XD_FlushSendBuffer(0x1388);
                if ((iVar4 === 0));
                iVar4 = FUN_00421bb0();
              } while ((0x464f < (iVar4 - local_380)));
              FUN_0046b14d(0x66, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
              FUN_0059db65();
              FUN_0055b046(0);
              for (/* cond: (s32((DAT_006ad30c + local_678 * 0x54), 0) !== local_58) */);
                  (local_678 = (local_678 < 7) && (wv(DAT_006ad30c, DAT_006ad30c)));
                  local_678 = (local_678 + 1)) {
              }
              if ((local_678 < 7)) {
                w32(((in_ECX + 0x53c) + s32(DAT_006ad35c, local_678 * 0x15) * 4), 0, 1);
              }
              local_8 = -1;
              FUN_00482305();
            }
          }
        }
        else {
          FUN_0046b14d(0xb, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        break;
      case 0x2f :
        if ((DAT_006ad698 === 0)) {
          if ((DAT_006ad308 < DAT_006c3164)) {
            FUN_0059b7fc(local_20);
            if ((s32(DAT_006ad10c, 0) === 0)) {
              if ((0 < DAT_006ad640)) {
                FUN_0046b14d(0x28, local_58, DAT_006ad640, 0, 0, 0, 0, 0, 0, 0);
                FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
                FUN_0046b14d(6, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
                FUN_0046b14d(9, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
              }
            }
            else {
              FUN_0056f113();
            }
          }
          else {
            FUN_0046b14d(0x11, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
          }
        }
        else {
          FUN_0046b14d(0xb, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        break;
      case 0x30 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if (((((DAT_00654fb0) << 16 >> 16) & (1 << (((local_3c) & 0xFF) & 0x1f))) === 0)) {
          wv(DAT_00654fb0, ((((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF) | DAT_00654fb0));
          FUN_0046b14d(0x26, local_58, ((((((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF) | DAT_00654fb0)) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x2a, 0xff, ((((((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF) | DAT_00654fb0)) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
          _DAT_006c90a0 = (None + 1);
        }
        else {
          FUN_0046b14d(0x27, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        break;
      case 0x31 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00655b0b, (DAT_00655b0b & ((DAT_00654fb0) & 0xFF)));
        if (((((DAT_00654fb0) << 16 >> 16) & (1 << (((local_3c) & 0xFF) & 0x1f))) !== 0)) {
          wv(DAT_00654fb0, ((~(((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF)) & DAT_00654fb0));
          wv(DAT_00655b0b, ((DAT_00655b0b & ((DAT_00654fb0) & 0xFF)) & ((((~(((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF)) & DAT_00654fb0)) & 0xFF)));
          FUN_0046b14d(0x2a, 0xff, ((((~(((1 << (((local_3c) & 0xFF) & 0x1f))) & 0xFFFF)) & DAT_00654fb0)) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
          _DAT_006c90a0 = (None + 1);
        }
        break;
      case 0x32 :
        w32((DAT_006c8fc0 + local_58 * 4), 0, -1);
        FUN_0059b96a(local_58);
        if ((s32(DAT_006ad10c, 0) !== 0)) {
          FUN_0056f113();
        }
        break;
      case 0x33 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00654fac, ((local_40) & 0xFFFF));
        wv(DAT_00654fae, ((local_3c) & 0xFFFF));
        wv(DAT_006ad684, ((local_38) & 0xFF));
        wv(DAT_00654c7c, s8(((local_38) & 0xFF)));
        break;
      case 0x34 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_004e1763(local_40, 0, 0);
        FUN_0046b14d(0x35, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x35 :
        wv(DAT_006c90b4, 1);
        break;
      case 0x37 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((s32((DAT_0065610a + local_40 * 0x20), 0) !== 0)) {
          local_7c = ((s16((DAT_006560f0 + local_40 * 0x20), 0)) << 16 >> 16);
          local_80 = ((s16((DAT_006560f2 + local_40 * 0x20), 0)) << 16 >> 16);
        }
        FUN_005b4391(local_40, 1);
        FUN_0046b14d(0x38, local_58, local_40, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x38 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c90c0, 1);
        break;
      case 0x39 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_004413d1(local_40, 0);
        FUN_0046b14d(0x3a, local_58, local_40, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x3a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c90c8, 1);
        FID_conflict:_memcpy((DAT_0064f340 + local_40 * 0x58), local_48, 0x58);
        break;
      case 0x3b :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_14 = FUN_0043f8b0(local_40, local_3c, local_38);
        FUN_0046b14d(0x3c, local_58, local_14, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x3c :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c90d0, local_40);
        if ((local_40 !== -1)) {
          FID_conflict:_memcpy((DAT_0064f340 + local_40 * 0x58), local_48, 0x58);
          wv(DAT_00655b18, ((local_3c) & 0xFFFF));
        }
        break;
      case 0x3d :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_14 = FUN_005b3d06(local_40, local_3c, local_38, local_34);
        FUN_0046b14d(0x3e, local_58, local_14, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x3e :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c90d8, local_40);
        if ((local_40 !== -1)) {
          wv(DAT_00655b16, ((local_3c) & 0xFFFF));
        }
        break;
      case 0x3f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b319e(local_40, 1);
        FUN_0046b14d(0x40, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x40 :
        wv(DAT_006c90e0, 1);
        break;
      case 0x41 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b345f(local_40, local_3c, local_38, 1);
        FUN_0046b14d(0x42, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x42 :
        wv(DAT_006c90e8, 1);
        break;
      case 0x43 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b389f(local_40, 1);
        FUN_0046b14d(0x44, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x44 :
        wv(DAT_006c90f0, 1);
        break;
      case 0x45 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b36df(local_40, local_3c, local_38, 1);
        FUN_0046b14d(0x46, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x46 :
        wv(DAT_006c90f8, 1);
        break;
      case 0x47 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_14 = FUN_004e7270(local_40, local_3c, local_38, local_34, local_30);
        FUN_0046b14d(0x48, local_58, local_14, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        break;
      case 0x48 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c9100, local_40);
        break;
      case 0x49 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        uVar5 = FUN_005b542e(local_40, local_3c, 1);
        FUN_0046b14d(0x4a, local_58, uVar5, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x4a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c9108, local_40);
        break;
      case 0x4b :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b5bab(local_40, 1);
        FUN_0046b14d(0x4c, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x4c :
        wv(DAT_006c9110, 1);
        break;
      case 0x4d :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b5d93(local_40, 1);
        FUN_0046b14d(0x4e, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x4e :
        wv(DAT_006c9118, 1);
        break;
      case 0x4f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b6042(local_40, 1);
        FUN_0046b14d(0x50, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x50 :
        wv(DAT_006c9120, 1);
        break;
      case 0x51 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_00594d42(local_40, local_3c, local_38, local_34, local_30, 0);
        break;
      case 0x52 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0059511c(local_40, 0);
        FUN_0046b14d(0x54, local_58, local_40, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x53 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_0064ba4c + local_40 * 0x18), 0, local_3c);
        break;
      case 0x54 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_0064ba48 + local_40 * 0x18), 0, (s32((DAT_0064ba48 + local_40 * 0x18), 0) + 1));
        break;
      case 0x55 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_0064ba50 + local_40 * 0x18), 0, local_3c);
        w32((DAT_0064ba54 + local_40 * 0x18), 0, local_38);
        w32((DAT_0064ba58 + local_40 * 0x18), 0, local_34);
        w32((DAT_0064ba5c + local_40 * 0x18), 0, local_30);
        w32((DAT_0064ba4c + local_40 * 0x18), 0, 0);
        w32((DAT_0064ba48 + local_40 * 0x18), 0, s32((DAT_0064ba4c + local_40 * 0x18), 0));
        break;
      case 0x56 :
      case 0x57 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006ad66c, (DAT_006ad66c + -1));
        if ((local_40 === 2)) {
          wv(DAT_006ad670, -1);
        }
        break;
      case 0x58 :
        FUN_004f1220();
        break;
      case 0x59 :
        FUN_005ba206(local_48);
        break;
      case 0x5a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b5bab(local_38, 0);
        FUN_005b48b1(local_38);
        if ((local_34 === 0)) {
          FUN_005b496e(local_38, local_3c);
        }
        FUN_005b3ae0(local_38, local_30, local_2c, 0);
        if ((_MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + local_38 * 0x20]) * 0x14] === 0)) {
          FUN_005b389f(local_38, 0);
        }
        if ((DAT_006ad684 !== 0)) {
          FUN_0059511c(local_40, 0);
        }
        FUN_004b0b53(0xff, 2, 0, 0, 1);
        FUN_0046b14d(0x5b, local_58, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0xea60);
        break;
      case 0x5b :
        wv(DAT_006c914c, 1);
        break;
      case 0x5d :
        wv(DAT_006c31d0, 1);
        FUN_005d225b(s_Hold_on_0062bee8);
        break;
      case 0x5e :
        wv(DAT_006c31d0, 0);
        FUN_005d225b(s_Hold_off_0062bef0);
        break;
      case 0x5f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_14 = FUN_004a7ce9(local_40);
        FUN_0046b14d(0x61, local_58, local_14, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x60 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_14 = FUN_004aa378(local_40, local_3c);
        FUN_0046b14d(0x62, local_58, local_14, 0, 0, 0, 0, 0, 0, 0);
        break;
      case 0x61 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c9164, local_40);
        break;
      case 0x62 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006c9168, local_40);
        break;
      case 99 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        iVar2 = local_3c;
        iVar4 = local_40;
        cVar3 = _MEM[DAT_006560f7 + local_40 * 0x20];
        w32((DAT_0064c6a2 + local_3c * 0x594), 0, (s32((DAT_0064c6a2 + local_3c * 0x594), 0) - local_38));
        _MEM[DAT_0064c778 + (s8(cVar3) * 0x594 + u8(_MEM[DAT_006560f6 + local_40 * 0x20]))] = (_MEM[DAT_0064c778 + (s8(cVar3) * 0x594 + u8(_MEM[DAT_006560f6 + local_40 * 0x20]))] + 0xff);
        _MEM[DAT_0064c778 + (local_3c * 0x594 + u8(_MEM[DAT_006560f6 + local_40 * 0x20]))] = (_MEM[DAT_0064c778 + (local_3c * 0x594 + u8(_MEM[DAT_006560f6 + local_40 * 0x20]))] + 1);
        w16((DAT_0064c6bc + local_3c * 0x594), 0, (s16((DAT_0064c6bc + local_3c * 0x594), 0) + 1));
        local_714 = ((local_3c) & 0xFF);
        _MEM[DAT_006560f7 + local_40 * 0x20] = local_714;
        _MEM[DAT_00656100 + local_40 * 0x20] = 0xff;
        _MEM[DAT_006560f8 + local_40 * 0x20] = 0;
        _MEM[DAT_006560ff + local_40 * 0x20] = 0xff;
        iVar6 = FUN_0043d07a(((s16((DAT_006560f0 + local_40 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_40 * 0x20), 0)) << 16 >> 16), -1, -1, -1);
        if ((s8(_MEM[DAT_0064f348 + iVar6 * 0x58]) === iVar2)) {
          local_718 = ((iVar6) & 0xFF);
          _MEM[DAT_00656100 + iVar4 * 0x20] = local_718;
        }
        FUN_005b490e(iVar4, s8(cVar3));
        FUN_005b99e8(((s16((DAT_006560f0 + iVar4 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar4 * 0x20), 0)) << 16 >> 16), iVar2, 1);
        FUN_004b0b53(0xff, 2, 0, 0, 1);
        break;
      case 100 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0059c575(local_40, local_3c, local_38, local_34, local_30);
        break;
      case 0x65 :
        FUN_0059db08(0x4000);
        local_8 = 0;
        local_88 = s32((in_ECX + 0x574), 0);
        w32((in_ECX + 0x574), 0, 1);
        FUN_0055ae80(0);
        wv(DAT_006c9178, 0);
        wv(DAT_00635a3c, LAB_00402c2a);
        FUN_00426fb0(s_WAITONGAMEXMIT_0062be94, 0x2000000, DAT_0063fc58, 0);
        FUN_0059db65();
        w32((in_ECX + 0x574), 0, local_88);
        FUN_0055b046(0);
        local_8 = -1;
        FUN_00482311();
        break;
      case 0x66 :
        break;
      case 0x68 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_4c = 0x2c;
        FUN_004b90ad(local_40, local_3c, local_38, (local_20 + 0xb));
        break;
      case 0x69 :
        bVar7 = (s32((in_ECX + 0x810), 0) !== 0);
        if (bVar7) {
          wv(DAT_006ad914, ((DAT_006ad910 + 1) % 0x64));
        }
        else {
          wv(DAT_006ad910, 0);
          wv(DAT_006ad914, 0);
        }
        wv(DAT_006ad90c, u8(bVar7));
        FUN_0047e0e5(0xa3, DAT_fffff904, 0);
        FUN_0047e0e5(0x74, DAT_fffff904, 0);
        wv(DAT_00655b05, ((s32(local_24, 4)) & 0xFF));
        _DAT_006ad578 = s8(((s32(local_24, 4)) & 0xFF));
        FUN_0055ae80(1);
        FUN_004e4ceb();
        _DAT_0066c990 = -1;
        FUN_00552112();
        local_6e0 = DAT_0066ca54;
        local_6dc = DAT_0066ca58;
        local_6d8 = DAT_0066ca5c;
        local_6d4 = DAT_0066ca68;
        FUN_00408490(DAT_fffff920);
        break;
      case 0x6a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        local_4c = 0x2c;
        if ((DAT_00626a2c !== 0)) {
          FUN_0046b14d(0x80, local_58, 2, 0, 0, 0, 0, 0, 0, 0);
        }
        else {
          if ((local_40 === 0x3d)) {
            wv(DAT_00626a2c, 1);
          }
          if ((DAT_0063113c !== 1)) {
            if ((local_28 === 0)) {
              local_748 = 0;
            }
            else {
              local_748 = (local_20 + 0xb);
            }
            FUN_00511a0e(local_40, local_3c, local_38, local_34, local_30, local_748, local_28);
          }
        }
        break;
      case 0x6b :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00655af0, ((local_40) & 0xFFFF));
        wv(DAT_0064b1ac, local_3c);
        wv(DAT_0062c5b4, local_38);
        break;
      case 0x6c :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_00654b70, local_40);
        if ((local_40 === 0)) {
          wv(DAT_0066c988, 0);
          FUN_00552112();
          local_78 = DAT_0066ca54;
          local_74 = DAT_0066ca58;
          local_70 = DAT_0066ca5c;
          local_6c = DAT_0066ca68;
          FUN_00408490(DAT_ffffff88);
        }
        else {
          wv(DAT_0066c988, 1);
          FUN_0055af2e(1);
        }
        break;
      case 0x6d :
        if ((DAT_00654b70 !== 0)) {
          wv(DAT_0066c988, 1);
        }
        FUN_0055af2e(0);
        break;
      case 0x6e :
        FUN_0055ae80(0);
        break;
      case 0x6f :
        FUN_0055b046(0);
        break;
      case 0x70 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((local_2c !== 0)) {
          uVar5 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_34]) + local_3c));
          iVar4 = FUN_0043cf76(uVar5, (s8(_MEM[DAT_00628360 + local_34]) + local_38));
          if (((DAT_00655aea & 0x1000) === 0)) {
            w32(local_24, 1, 0x72);
            local_40 = local_3c;
            local_3c = local_38;
          }
        }
        FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, local_48);
        break;
      case 0x71 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        break;
      case 0x72 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        iVar4 = FUN_0047e030(local_40, local_3c);
        if ((iVar4 !== 0)) {
          FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        }
        break;
      case 0x73 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        iVar4 = FUN_0047e030(local_40, local_3c);
        if ((iVar4 !== 0)) {
          FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        }
        break;
      case 0x74 :
        FUN_0047e0e5(s32(local_20, 1), DAT_ffffffc0, 0);
        break;
      case 0x75 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        iVar4 = FUN_0047e030(local_40, local_3c);
        if ((iVar4 !== 0)) {
          FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        }
        break;
      case 0x76 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        iVar4 = FUN_0047e030(local_40, local_3c);
        if ((iVar4 !== 0)) {
          FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        }
        break;
      case 0x77 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006acb38, local_40);
        break;
      case 0x78 :
        FUN_00569363(1);
        break;
      case 0x79 :
        FUN_0056a65e(1);
        break;
      case 0x7a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0046e020(local_40, local_3c, 0, 0);
        break;
      case 0x7b :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006a1870, local_40);
        break;
      case 0x7c :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        break;
      case 0x7d :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0047e0e5(s32(local_24, 1), DAT_ffffffc0, 0);
        break;
      case 0x7e :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0045b0d6(local_40, local_3c);
        break;
      case 0x7f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_00436287(local_40);
        break;
      case 0x80 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_0063f278, local_40);
        break;
      case 0x81 :
        if ((DAT_0067a8bc === 0)) {
          if ((DAT_0067a8bc === 0)) {
            FUN_004b7645();
          }
          else if ((DAT_0067a8c0 === -2)) {
            wv(DAT_0067a8c0, -1);
          }
          wv(DAT_00626a2c, 0);
        }
        break;
      case 0x82 :
        if ((DAT_0067a9dc !== 0)) {
          operator_delete(DAT_0067a9dc);
          wv(DAT_0067a9dc, 0);
        }
        wv(DAT_0067a9dc, operator_new(local_5c));
        if ((operator_new(local_5c) !== 0)) {
          FID_conflict:_memcpy(operator_new(local_5c), local_20, local_5c);
        }
        FUN_004b81dd();
        break;
      case 0x83 :
        FUN_004b81dd();
        break;
      case 0x84 :
        FUN_004b81dd();
        break;
      case 0x85 :
        FUN_004b81dd();
        break;
      case 0x86 :
        FUN_004dd285(local_20);
        break;
      case 0x87 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0050c494(local_40, local_3c, local_38);
        break;
      case 0x88 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0050c679(local_40);
        break;
      case 0x89 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0050c449(local_40);
        break;
      case 0x8a :
        if ((DAT_006aa760 === 0)) {
          FUN_00509429();
        }
        break;
      case 0x8b :
        break;
      case 0x8c :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_006ced20 + local_40 * 4), 0, (s32((DAT_006ced20 + local_40 * 4), 0) + 1));
        break;
      case 0x8d :
        break;
      case 0x8e :
        break;
      case 0x8f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_006ced20 + local_40 * 4), 0, (s32((DAT_006ced20 + local_40 * 4), 0) + 1));
        for (/* cond: (local_54 < ((DAT_00655b16) << 16 >> 16)) */); local_54 = (local_54 < ((DAT_00655b16) << 16 >> 16)); local_54 = (local_54 + 1)) {
          if ((s8(_MEM[DAT_006560f7 + local_54 * 0x20]) === local_40)) {
            FUN_005b6787(local_54);
          }
        }
        break;
      case 0x90 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b94fc(local_40, local_3c, local_38, local_34, local_30);
        break;
      case 0x91 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b9646(local_40, local_3c, local_38, local_34);
        break;
      case 0x92 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b976d(local_40, local_3c, local_38, local_34, local_30);
        break;
      case 0x93 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b98b7(local_40, local_3c, local_38, local_34);
        break;
      case 0x94 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b99e8(local_40, local_3c, local_38, local_34);
        break;
      case 0x95 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b9b35(local_40, local_3c, local_38, local_34);
        break;
      case 0x96 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b9c49(local_40, local_3c, local_38, local_34);
        break;
      case 0x97 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_005b9d81(local_40, local_3c, local_38, local_34, local_30, local_2c);
        break;
      case 0x98 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        _MEM[DAT_0064c6e0 + (local_40 * 0x594 + local_3c)] = ((local_38) & 0xFF);
        break;
      case 0x99 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_0062c468 + local_3c * 4), 0, 1);
        w32((DAT_00673ad8 + local_3c * 4), 0, local_40);
        w32((DAT_00673ab8 + local_3c * 4), 0, local_3c);
        w32((DAT_00673a78 + local_3c * 4), 0, local_38);
        w32((DAT_00673a98 + local_3c * 4), 0, local_34);
        break;
      case 0x9a :
        FUN_004823d6(local_20, DAT_ffffffc0);
        wv(DAT_006ad6a4, local_40);
        wv(DAT_006ad6a8, local_3c);
        break;
      case 0x9b :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_004bf05b(local_40, local_3c, local_38, local_34, 0);
        break;
      case 0x9c :
        break;
      case 0x9d :
        FUN_0040ddc6(DAT_006d1da0);
        break;
      case 0x9e :
        FUN_0040decc(DAT_006d1da0);
        break;
      case 0x9f :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_0055c3d3(DAT_006d1da0, local_40);
        break;
      case 0xa0 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_00560d95(local_40, local_3c);
        break;
      case 0xa1 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        FUN_00562021(local_40, local_3c);
        break;
      case 0xa2 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        w32((DAT_006c3168 + local_40 * 4), 0, (s32((DAT_006c3168 + local_40 * 4), 0) + 1));
        break;
      case 0xa3 :
        FUN_0047e0e5(s32(local_20, 1), DAT_ffffffc0, 0);
        break;
      case 0xa4 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        uVar5 = FUN_00493c7d(local_40);
        FUN_0040ff60(0, uVar5);
        uVar5 = FUN_00493c7d(local_3c);
        FUN_0040ff60(1, uVar5);
        if (((_MEM[DAT_0064c6c0 + (local_3c * 0x594 + local_40 * 4)] & 8) === 0)) {
          iVar4 = FUN_00410030(s_PRETEXT_0062bf0c, DAT_00644e48, 0);
          if ((iVar4 === 1)) {
            FUN_00467825(local_40, local_3c, 0x2000);
            w16((DAT_0064ca82 + (local_3c * 0x594 + local_40 * 2)), 0, DAT_00655af8);
          }
        }
        else {
          iVar4 = FUN_00410030(s_PRETEXTALLIED_0062befc, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
          if ((iVar4 === 1)) {
            FUN_00467750(local_40, local_3c, 8);
            w16((DAT_0064ca82 + (local_3c * 0x594 + local_40 * 2)), 0, DAT_00655af8);
          }
        }
        break;
      case 0xa5 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((DAT_0067a8c0 === local_40)) {
          wv(DAT_0067ab67, ((local_3c) & 0xFF));
          if ((DAT_0067a9bc === 3)) {
            FUN_00453c40();
            FUN_00453c40();
            FUN_0058878e(1);
          }
        }
        break;
      case 0xa6 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((DAT_0067a8c0 === local_40)) {
          wv(DAT_0067ab67, ((local_3c) & 0xFF));
          if ((DAT_0067a9bc === 3)) {
            FUN_00453c80();
            FUN_00453c80();
            FUN_0058878e(1);
          }
        }
        break;
      case 0xa7 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((DAT_0067a8c0 === local_40)) {
          wv(DAT_0067ab64, ((local_3c) & 0xFF));
          if ((DAT_0067a9bc === 2)) {
            FUN_00453c40();
            FUN_00453c40();
            FUN_00453c80();
            FUN_00453c80();
            FUN_00468bb9(1);
          }
        }
        break;
      case 0xa8 :
        FUN_004823d6(local_20, DAT_ffffffc0);
        if ((DAT_0067a8c0 === local_40)) {
          wv(DAT_0067ab64, ((local_3c) & 0xFF));
          if ((DAT_0067a9bc === 2)) {
            FUN_00453c80();
            FUN_00453c80();
            FUN_00453c40();
            FUN_00453c40();
            FUN_0046968b(0, (DAT_0067ab94 + -1), 1);
            FUN_00468bb9(1);
          }
        }
      }
      operator_delete(local_20);
      goto LAB_0047efdc;
    }
    FUN_005d22b7(s_Poll:_Retrieved_non-Civ_message._0062be5c, s32(local_20, 1), s32(local_20, 2));
  } /* goto */ ( true );
}
