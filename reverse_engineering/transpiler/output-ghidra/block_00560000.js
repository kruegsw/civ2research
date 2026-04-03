// Block 0x00560000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 131

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408050, FUN_00408090, FUN_004080f0 } from './block_00400000.js';
import { FUN_00408130, FUN_00408170, FUN_00408230, FUN_00408270, FUN_004082b0, FUN_004082f0 } from './block_00400000.js';
import { FUN_00408330, FUN_00408370, FUN_004083b0, FUN_004083f0, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408680, FUN_004086c0, FUN_004087c0, FUN_00408d33, FUN_0040bbb0 } from './block_00400000.js';
import { FUN_0040bbe0, FUN_0040bc10, FUN_0040bc40, FUN_0040bc80, FUN_0040ef70, FUN_0040efd0 } from './block_00400000.js';
import { FUN_0040fcf0, FUN_0040fd40, FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40, FUN_0040fea0 } from './block_00400000.js';
import { FUN_0040fed0, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, SetDlgCtrlID } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414bb0, FUN_00414d70, FUN_00415133, FUN_00417ef0 } from './block_00410000.js';
import { FUN_00417f70, FUN_00419b80, FUN_00419c8b, FUN_0041a046, FUN_0041a422, FUN_0041a5c4 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421d30, FUN_00421da0, FUN_00421e70, FUN_00421ea0, FUN_00421f10 } from './block_00420000.js';
import { FUN_004259a6, FUN_00426f30, FUN_00426fb0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043c3f0, FUN_0043c520, FUN_0043c690, FUN_0043c6c0, FUN_0043c790, FUN_0043c7c0 } from './block_00430000.js';
import { FUN_0043c810, FUN_0043c840, FUN_0043c8a0, FUN_0043c8d0, FUN_0043c910, FUN_0043ca50 } from './block_00430000.js';
import { FUN_0043cab0, FUN_0043cc00, FUN_0043cf76, FUN_0043d07a, FUN_0043d20a } from './block_00430000.js';
import { FUN_00445e46 } from './block_00440000.js';
import { FUN_00450340, FUN_00451830, FUN_00451860, FUN_004518d0, FUN_00451bf0, FUN_00452768 } from './block_00450000.js';
import { FUN_00452c14, FUN_00453c40, FUN_00453e51, FUN_00456f20, FUN_0045705e, FUN_00458a3b } from './block_00450000.js';
import { FUN_00458df9, FUN_0045918e, FUN_0045ac71, tie } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_00467af0, FUN_0046b14d, FUN_0046e020, FUN_0046e8f0 } from './block_00460000.js';
import { FUN_0046ea3b, FUN_0046ee1e, FUN_0046f460, FUN_0046fbf3 } from './block_00460000.js';
import { FUN_00472cf0, FUN_0047a6b0, FUN_0047c3e0, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf9e } from './block_00470000.js';
import { FUN_0047df20, FUN_0047df50, FUN_0047e94e, GetActiveView } from './block_00470000.js';
import { FUN_004897fa, FUN_00489a0d } from './block_00480000.js';
import { FUN_004923c0, FUN_00493c7d } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a6980, FUN_004a73d9, FUN_004a9785 } from './block_004A0000.js';
import { FUN_004aa9c0, FUN_004aef20, FUN_004aef36, FUN_004af14b } from './block_004A0000.js';
import { FUN_004b0905, FUN_004b0b53, FUN_004b21d7, FUN_004bb540, FUN_004bb800, FUN_004bb840 } from './block_004B0000.js';
import { FUN_004bd9f0, FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004c2788 } from './block_004C0000.js';
import { FUN_004f4793, FUN_004f6244, FUN_004f6564, FUN_004f6646, FUN_004f7bd1, FUN_004f8a9b } from './block_004F0000.js';
import { FUN_005013bc, FUN_00509545 } from './block_00500000.js';
import { FUN_00511880, FUN_0051f19c } from './block_00510000.js';
import { FUN_005227e3, FUN_00522dfa, FUN_00522f8f } from './block_00520000.js';
import { FUN_00552112, FUN_00552ed2, FUN_0055339f, FUN_005534bc, FUN_0055bbc0, FUN_0055c69d } from './block_00550000.js';
import { FUN_0055d1e2, FUN_0055d8d8, FUN_0055f7d1, ~COleCntrFrameWnd } from './block_00550000.js';
import { FUN_0057075c, FUN_00570772, FUN_005784a0, ~CBitmapButton } from './block_00570000.js';
import { FUN_00598ceb, FUN_0059a791, FUN_0059b96a, FUN_0059baf0, FUN_0059c276, FUN_0059db08 } from './block_00590000.js';
import { FUN_0059db65, FUN_0059e356, FUN_0059e5c9, FUN_0059e6a9, FUN_0059ea99, FUN_0059f2a3 } from './block_00590000.js';
import { FUN_005a577e, FUN_005a9780, FUN_005a97cc, FUN_005a9abf, FUN_005a9afe, FUN_005a9b5d } from './block_005A0000.js';
import { FUN_005adfa0, FUN_005ae052 } from './block_005A0000.js';
import { FUN_005b2a39, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69, FUN_005b36df, FUN_005b50ad } from './block_005B0000.js';
import { FUN_005b6898, FUN_005b8931, FUN_005b898b, FUN_005b89bb, FUN_005b89e4, FUN_005b8a81 } from './block_005B0000.js';
import { FUN_005b8b65, FUN_005b8d15, FUN_005b8d62, FUN_005b8ee1, FUN_005b8ffa, FUN_005b94d5 } from './block_005B0000.js';
import { FUN_005b976d, FUN_005bad40, FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bd630, FUN_005bd65c, FUN_005bd696, FUN_005bd915, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { CString, FUN_005c0034, FUN_005c0073, FUN_005c00ce, FUN_005c041f, FUN_005c0479 } from './block_005C0000.js';
import { FUN_005c0c5d, FUN_005c0f57, FUN_005c11b2, FUN_005c19ad, FUN_005c61b0, FUN_005c64da } from './block_005C0000.js';
import { FUN_005c656b, FUN_005cde4d, FUN_005cdf50, FUN_005cedad, FUN_005cef31, FUN_005cf126 } from './block_005C0000.js';
import { InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d225b, FUN_005d2279, FUN_005dae6b, ~_Timevec } from './block_005D0000.js';
import { FID_conflict:__toupper_lk, FID_conflict:_memcpy, FID_conflict:_remove, FUN_005f22d0, FUN_005f22e0, __chdir } from './block_005F0000.js';
import { __getcwd, _atexit, _atoi, _memcmp, _rand, _strcmp } from './block_005F0000.js';
import { _strlen, _strrchr, `eh_vector_constructor_iterator', `eh_vector_destructor_iterator', operator_delete, operator_new } from './block_005F0000.js';
import { __itoa } from './block_00600000.js';
// Unresolved: XD_FlushSendBuffer, XD_LobbySendMessage, XD_ServerCloseConnection, XD_StopConnections

const DAT_00627684 = globalThis.DAT_00627684, DAT_0062768c = globalThis.DAT_0062768c, DAT_0062768d = globalThis.DAT_0062768d, DAT_0062768e = globalThis.DAT_0062768e, DAT_0062768f = globalThis.DAT_0062768f, DAT_00627cc4 = globalThis.DAT_00627cc4;
const DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_0062cd24 = globalThis.DAT_0062cd24, DAT_00633c98 = globalThis.DAT_00633c98, DAT_00633cdc = globalThis.DAT_00633cdc, DAT_00633d6c = globalThis.DAT_00633d6c;
const DAT_00633e10 = globalThis.DAT_00633e10, DAT_00633e14 = globalThis.DAT_00633e14, DAT_00633e18 = globalThis.DAT_00633e18, DAT_00633e1c = globalThis.DAT_00633e1c, DAT_00633e20 = globalThis.DAT_00633e20, DAT_00633e24 = globalThis.DAT_00633e24;
const DAT_00633e28 = globalThis.DAT_00633e28, DAT_00633e2c = globalThis.DAT_00633e2c, DAT_00633e58 = globalThis.DAT_00633e58, DAT_00633e5c = globalThis.DAT_00633e5c, DAT_00633edc = globalThis.DAT_00633edc, DAT_0063cc48 = globalThis.DAT_0063cc48;
const DAT_0063fc58 = globalThis.DAT_0063fc58, DAT_0063fc98 = globalThis.DAT_0063fc98, DAT_00640990 = globalThis.DAT_00640990, DAT_006409d8 = globalThis.DAT_006409d8, DAT_00640a18 = globalThis.DAT_00640a18, DAT_00640ad8 = globalThis.DAT_00640ad8;
const DAT_00642b48 = globalThis.DAT_00642b48, DAT_00642c48 = globalThis.DAT_00642c48, DAT_00643978 = globalThis.DAT_00643978, DAT_00643a38 = globalThis.DAT_00643a38, DAT_00644e48 = globalThis.DAT_00644e48, DAT_00646cb8 = globalThis.DAT_00646cb8;
const DAT_00647748 = globalThis.DAT_00647748, DAT_00647f18 = globalThis.DAT_00647f18, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1c1 = globalThis.DAT_0064b1c1, DAT_0064b1c3 = globalThis.DAT_0064b1c3;
const DAT_0064b1c6 = globalThis.DAT_0064b1c6, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b1cb = globalThis.DAT_0064b1cb, DAT_0064ba28 = globalThis.DAT_0064ba28, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064bcf8 = globalThis.DAT_0064bcf8;
const DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c48e = globalThis.DAT_0064c48e, DAT_0064c5c0 = globalThis.DAT_0064c5c0, DAT_0064c6a0 = globalThis.DAT_0064c6a0, DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a6 = globalThis.DAT_0064c6a6;
const DAT_0064c6a8 = globalThis.DAT_0064c6a8, DAT_0064c6b0 = globalThis.DAT_0064c6b0, DAT_0064c6b3 = globalThis.DAT_0064c6b3, DAT_0064c6b4 = globalThis.DAT_0064c6b4, DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6b6 = globalThis.DAT_0064c6b6;
const DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6bf = globalThis.DAT_0064c6bf, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1, DAT_0064c6c2 = globalThis.DAT_0064c6c2, DAT_0064c6e8 = globalThis.DAT_0064c6e8;
const DAT_0064c708 = globalThis.DAT_0064c708, DAT_0064c70e = globalThis.DAT_0064c70e, DAT_0064c7a5 = globalThis.DAT_0064c7a5, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342;
const DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f34d = globalThis.DAT_0064f34d, DAT_0064f360 = globalThis.DAT_0064f360;
const DAT_00655020 = globalThis.DAT_00655020, DAT_00655324 = globalThis.DAT_00655324, DAT_00655334 = globalThis.DAT_00655334, DAT_0065535c = globalThis.DAT_0065535c, DAT_00655490 = globalThis.DAT_00655490, DAT_006554f8 = globalThis.DAT_006554f8;
const DAT_006554f9 = globalThis.DAT_006554f9, DAT_006554fa = globalThis.DAT_006554fa, DAT_006554fe = globalThis.DAT_006554fe, DAT_00655500 = globalThis.DAT_00655500, DAT_00655c22 = globalThis.DAT_00655c22, DAT_006560f0 = globalThis.DAT_006560f0;
const DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f4 = globalThis.DAT_006560f4, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f8 = globalThis.DAT_006560f8, DAT_006560f9 = globalThis.DAT_006560f9;
const DAT_006560fa = globalThis.DAT_006560fa, DAT_006560fc = globalThis.DAT_006560fc, DAT_006560fd = globalThis.DAT_006560fd, DAT_006560ff = globalThis.DAT_006560ff, DAT_00656102 = globalThis.DAT_00656102, DAT_00656104 = globalThis.DAT_00656104;
const DAT_00656106 = globalThis.DAT_00656106, DAT_00656108 = globalThis.DAT_00656108, DAT_0065610a = globalThis.DAT_0065610a, DAT_00666550 = globalThis.DAT_00666550, DAT_00666570 = globalThis.DAT_00666570, DAT_006665b0 = globalThis.DAT_006665b0;
const DAT_0066c7a8 = globalThis.DAT_0066c7a8, DAT_0066c8cc = globalThis.DAT_0066c8cc, DAT_0066c8d0 = globalThis.DAT_0066c8d0, DAT_0066ca84 = globalThis.DAT_0066ca84, DAT_0066ca8c = globalThis.DAT_0066ca8c, DAT_0066ca90 = globalThis.DAT_0066ca90;
const DAT_0066ca94 = globalThis.DAT_0066ca94, DAT_0066cab0 = globalThis.DAT_0066cab0, DAT_0066cab4 = globalThis.DAT_0066cab4, DAT_0066cabc = globalThis.DAT_0066cabc, DAT_0066cacc = globalThis.DAT_0066cacc, DAT_00679640 = globalThis.DAT_00679640;
const DAT_0067a798 = globalThis.DAT_0067a798, DAT_006a6668 = globalThis.DAT_006a6668, DAT_006a66b0 = globalThis.DAT_006a66b0, DAT_006ab5c0 = globalThis.DAT_006ab5c0, DAT_006ab600 = globalThis.DAT_006ab600, DAT_006ab680 = globalThis.DAT_006ab680;
const DAT_006ab6a8 = globalThis.DAT_006ab6a8, DAT_006abae0 = globalThis.DAT_006abae0, DAT_006abc18 = globalThis.DAT_006abc18, DAT_006abc28 = globalThis.DAT_006abc28, DAT_006abc50 = globalThis.DAT_006abc50, DAT_006abc68 = globalThis.DAT_006abc68;
const DAT_006abcc0 = globalThis.DAT_006abcc0, DAT_006abf48 = globalThis.DAT_006abf48, DAT_006abf98 = globalThis.DAT_006abf98, DAT_006abfa8 = globalThis.DAT_006abfa8, DAT_006abfb8 = globalThis.DAT_006abfb8, DAT_006ac090 = globalThis.DAT_006ac090;
const DAT_006ac0a8 = globalThis.DAT_006ac0a8, DAT_006ac170 = globalThis.DAT_006ac170, DAT_006ac1b0 = globalThis.DAT_006ac1b0, DAT_006ac488 = globalThis.DAT_006ac488, DAT_006ac8a8 = globalThis.DAT_006ac8a8, DAT_006ac8e8 = globalThis.DAT_006ac8e8;
const DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad330 = globalThis.DAT_006ad330, DAT_006ad354 = globalThis.DAT_006ad354, DAT_006ad359 = globalThis.DAT_006ad359, DAT_006ad35c = globalThis.DAT_006ad35c, DAT_006ad558 = globalThis.DAT_006ad558;
const DAT_006ad57c = globalThis.DAT_006ad57c, DAT_006ad59c = globalThis.DAT_006ad59c, DAT_006ad5bc = globalThis.DAT_006ad5bc, DAT_006ad5dc = globalThis.DAT_006ad5dc, DAT_fffff9b4 = globalThis.DAT_fffff9b4, DAT_fffff9c4 = globalThis.DAT_fffff9c4;
const DAT_fffff9d4 = globalThis.DAT_fffff9d4, DAT_fffff9e4 = globalThis.DAT_fffff9e4, DAT_fffff9f4 = globalThis.DAT_fffff9f4, DAT_fffffa04 = globalThis.DAT_fffffa04, DAT_fffffa14 = globalThis.DAT_fffffa14, DAT_fffffa24 = globalThis.DAT_fffffa24;
const DAT_fffffa34 = globalThis.DAT_fffffa34, DAT_fffffa44 = globalThis.DAT_fffffa44, DAT_fffffa54 = globalThis.DAT_fffffa54, DAT_fffffa64 = globalThis.DAT_fffffa64, DAT_fffffa74 = globalThis.DAT_fffffa74, DAT_fffffa80 = globalThis.DAT_fffffa80;
const DAT_fffffa84 = globalThis.DAT_fffffa84, DAT_fffffa90 = globalThis.DAT_fffffa90, DAT_fffffab4 = globalThis.DAT_fffffab4, DAT_fffffbac = globalThis.DAT_fffffbac, DAT_fffffbd0 = globalThis.DAT_fffffbd0, DAT_fffffbf8 = globalThis.DAT_fffffbf8;
const DAT_fffffc18 = globalThis.DAT_fffffc18, DAT_fffffc3c = globalThis.DAT_fffffc3c, DAT_fffffc4c = globalThis.DAT_fffffc4c, DAT_fffffc6c = globalThis.DAT_fffffc6c, DAT_fffffc8c = globalThis.DAT_fffffc8c, DAT_fffffc90 = globalThis.DAT_fffffc90;
const DAT_fffffcb0 = globalThis.DAT_fffffcb0, DAT_fffffcd0 = globalThis.DAT_fffffcd0, DAT_fffffcd4 = globalThis.DAT_fffffcd4, DAT_fffffcf4 = globalThis.DAT_fffffcf4, DAT_fffffd00 = globalThis.DAT_fffffd00, DAT_fffffe54 = globalThis.DAT_fffffe54;
const DAT_fffffe58 = globalThis.DAT_fffffe58, DAT_fffffe64 = globalThis.DAT_fffffe64, DAT_fffffe74 = globalThis.DAT_fffffe74, DAT_fffffea8 = globalThis.DAT_fffffea8, DAT_fffffeb8 = globalThis.DAT_fffffeb8, DAT_fffffec0 = globalThis.DAT_fffffec0;
const DAT_fffffec8 = globalThis.DAT_fffffec8, DAT_fffffed8 = globalThis.DAT_fffffed8, DAT_fffffed9 = globalThis.DAT_fffffed9, DAT_fffffee8 = globalThis.DAT_fffffee8, DAT_fffffeec = globalThis.DAT_fffffeec, DAT_fffffef0 = globalThis.DAT_fffffef0;
const DAT_fffffef8 = globalThis.DAT_fffffef8, DAT_ffffff00 = globalThis.DAT_ffffff00, DAT_ffffff08 = globalThis.DAT_ffffff08, DAT_ffffff18 = globalThis.DAT_ffffff18, DAT_ffffff24 = globalThis.DAT_ffffff24, DAT_ffffff34 = globalThis.DAT_ffffff34;
const DAT_ffffff4c = globalThis.DAT_ffffff4c, DAT_ffffff50 = globalThis.DAT_ffffff50, DAT_ffffff54 = globalThis.DAT_ffffff54, DAT_ffffff5c = globalThis.DAT_ffffff5c, DAT_ffffff70 = globalThis.DAT_ffffff70, DAT_ffffff74 = globalThis.DAT_ffffff74;
const DAT_ffffff78 = globalThis.DAT_ffffff78, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffff84 = globalThis.DAT_ffffff84, DAT_ffffff90 = globalThis.DAT_ffffff90, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffff98 = globalThis.DAT_ffffff98;
const DAT_ffffffa0 = globalThis.DAT_ffffffa0, DAT_ffffffa4 = globalThis.DAT_ffffffa4, DAT_ffffffac = globalThis.DAT_ffffffac, DAT_ffffffb0 = globalThis.DAT_ffffffb0, DAT_ffffffb4 = globalThis.DAT_ffffffb4, DAT_ffffffbc = globalThis.DAT_ffffffbc;
const DAT_ffffffc0 = globalThis.DAT_ffffffc0, DAT_ffffffd0 = globalThis.DAT_ffffffd0, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4;
const DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4, s_ADMIRECITY_00633cb4 = globalThis.s_ADMIRECITY_00633cb4, s_CDROMNOTFOUND2_00633d5c = globalThis.s_CDROMNOTFOUND2_00633d5c;
const s_CITIES.BMP_00634058 = globalThis.s_CITIES.BMP_00634058, s_CITIES.BMP_0063407c = globalThis.s_CITIES.BMP_0063407c, s_CITIES.BMP_00634088 = globalThis.s_CITIES.BMP_00634088, s_CITIES.BMP_00634094 = globalThis.s_CITIES.BMP_00634094, s_CITIES.GIF_00634064 = globalThis.s_CITIES.GIF_00634064, s_CITIES.GIF_00634070 = globalThis.s_CITIES.GIF_00634070;
const s_CRUSADE_00633ce0 = globalThis.s_CRUSADE_00633ce0, s_D:\Ss\Franklinton\startup_player_00633e9c = globalThis.s_D:\Ss\Franklinton\startup_player_00633e9c, s_Failed_to_load_civ2art.gif_00633dcc = globalThis.s_Failed_to_load_civ2art.gif_00633dcc, s_HELPME_00633ccc = globalThis.s_HELPME_00633ccc, s_IGZ_-_Sending_DPLSYS_CONNECTIONS_00633ee0 = globalThis.s_IGZ_-_Sending_DPLSYS_CONNECTIONS_00633ee0, s_IGZ_-_Sending_DPLSYS_DPLAYCONNEC_00633f48 = globalThis.s_IGZ_-_Sending_DPLSYS_DPLAYCONNEC_00633f48;
const s_IGZ_-_XD_LobbySendMessage_return_00633f18 = globalThis.s_IGZ_-_XD_LobbySendMessage_return_00633f18, s_IGZ_-_XD_LobbySendMessage_return_00633f7c = globalThis.s_IGZ_-_XD_LobbySendMessage_return_00633f7c, s_INSTEAD_00633cd4 = globalThis.s_INSTEAD_00633cd4, s_INTRUDERS_00633c5c = globalThis.s_INTRUDERS_00633c5c, s_INTRUDER_00633c68 = globalThis.s_INTRUDER_00633c68, s_JIHAD_00633ce8 = globalThis.s_JIHAD_00633ce8;
const s_NEARCITY_00633cc0 = globalThis.s_NEARCITY_00633cc0, s_NOTICE_00633dc4 = globalThis.s_NOTICE_00633dc4, s_PEDIACIVFACTS_00633d90 = globalThis.s_PEDIACIVFACTS_00633d90, s_PEDIA_00633d74 = globalThis.s_PEDIA_00633d74, s_SENATESCANDAL_00633c9c = globalThis.s_SENATESCANDAL_00633c9c, s_TERMS_00633c54 = globalThis.s_TERMS_00633c54;
const s_UNITS.BMP_00634010 = globalThis.s_UNITS.BMP_00634010, s_UNITS.BMP_00634034 = globalThis.s_UNITS.BMP_00634034, s_UNITS.BMP_00634040 = globalThis.s_UNITS.BMP_00634040, s_UNITS.BMP_0063404c = globalThis.s_UNITS.BMP_0063404c, s_UNITS.GIF_0063401c = globalThis.s_UNITS.GIF_0063401c, s_UNITS.GIF_00634028 = globalThis.s_UNITS.GIF_00634028;
const s_VIOLATE_00633cac = globalThis.s_VIOLATE_00633cac, s_VIOLATORS_00633c74 = globalThis.s_VIOLATORS_00633c74, s_VIOLATOR_00633c80 = globalThis.s_VIOLATOR_00633c80, s_WAITINGONJOIN_00633fac = globalThis.s_WAITINGONJOIN_00633fac, s_WARENDS_00633c4c = globalThis.s_WARENDS_00633c4c, s_WITHDRAWN_00633c8c = globalThis.s_WITHDRAWN_00633c8c;
const s_civ2\civ2art.dll_00633db0 = globalThis.s_civ2\civ2art.dll_00633db0, s_describe._00633d7c = globalThis.s_describe._00633d7c, s_pPlayerPopup_!=_NULL_00633ec4 = globalThis.s_pPlayerPopup_!=_NULL_00633ec4, s_pedia._00633d88 = globalThis.s_pedia._00633d88;


 export function FUN_00560084 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_20;
  let local_14;
  let local_10;
  let local_c;

  w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xffb7));
  if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] === 0)) {
    if (((DAT_00655af8 & 3) !== 0)) {
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfffe));
      }
    }
    else if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 1) === 0)) {
      FUN_0055c69d(param_1, 1);
    }
    else {
      w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfffe));
    }
  }
  if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 1) !== 0)) {
    FUN_0055c69d(param_1, _MEM[DAT_0064c6b5 + param_1 * 0x594]);
  }
  if ((param_1 !== 0)) {
    iVar1 = _rand();
    _MEM[DAT_0064c6b6 + param_1 * 0x594] = (((iVar1 % 0x64)) & 0xFF);
    iVar1 = _rand();
    if (((iVar1 % 3) === 0)) {
      w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) ^ 4));
    }
    if ((_MEM[DAT_0064c6bf + param_1 * 0x594] !== 0)) {
      _MEM[DAT_0064c6bf + param_1 * 0x594] = (_MEM[DAT_0064c6bf + param_1 * 0x594] + 0xff);
    }
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      if ((2 < DAT_00655b02)) {
        FUN_0047e94e(1, 0);
      }
      if (((_MEM[DAT_0064c6c1 + (local_10 * 4 + param_1 * 0x594)] & 0x40) === 0)) {
        w32((DAT_006ab5c0 + local_10 * 4), 0, 0);
      }
      else {
        w32((DAT_006ab5c0 + local_10 * 4), 0, 1);
      }
      w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -0xa04001));
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
          iVar1 = FUN_005adfa0((3 - (u8(_MEM[DAT_0064c6be + local_10 * 0x594]) >> 2)), 1, 3);
          if (((iVar1 + -1) < 1)) {
            local_20 = 0;
          }
          else {
            local_20 = _rand();
            local_20 = (local_20 % iVar1);
          }
          if ((local_20 === 0)) {
            if (((_MEM[DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)] & 8) === 0)) {
              w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -39));
              w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) | 0x80840));
              iVar1 = ((s16((DAT_0064ca82 + (param_1 * 2 + local_10 * 0x594)), 0)) << 16 >> 16);
              if ((((s16((DAT_0064ca82 + (param_1 * 2 + local_10 * 0x594)), 0)) << 16 >> 16) <= (((DAT_00655af8) << 16 >> 16) + -8))) {
                iVar1 = (((DAT_00655af8) << 16 >> 16) + -8);
              }
              w16((DAT_0064ca82 + (param_1 * 2 + local_10 * 0x594)), 0, ((iVar1) & 0xFFFF));
            }
            else {
              FUN_00456f20(param_1, local_10, 0x64);
              w16((DAT_0064ca82 + (param_1 * 2 + local_10 * 0x594)), 0, 0xffff);
              w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -33));
            }
          }
        }
        if ((((1 << (((local_10) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -0x40001));
          if (((DAT_00655af8 & 0x1f) === 0)) {
            if (((_MEM[DAT_0064c6c2 + (local_10 * 4 + param_1 * 0x594)] & 8) === 0)) {
              w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -0x801));
            }
            w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -0x80001));
          }
          if (((DAT_00655af8 & 0xf) === 0)) {
            if (((_MEM[DAT_0064c6c1 + (local_10 * 4 + param_1 * 0x594)] & 4) === 0)) {
              if (((_MEM[DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)] & 8) === 0)) {
                if (((DAT_00655af0 & 1) === 0)) {
                  if (((_MEM[DAT_0064c6c1 + (local_10 * 0x594 + param_1 * 4)] & 8) === 0)) {
                    if ((DAT_00654fa8 === 0)) {
                      uVar2 = FUN_00493c7d(param_1);
                      FUN_0040ff60(0, uVar2);
                      uVar2 = FUN_00493c7d(local_10);
                      FUN_0040ff60(1, uVar2);
                      FUN_00410030(s_WARENDS_00633c4c, DAT_00647748, 0);
                    }
                    if ((2 < DAT_00655b02)) {
                      for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
                        if ((iVar1 !== 0)) {
                          uVar2 = FUN_00493c7d(param_1);
                          FUN_0040ff60(0, uVar2);
                          uVar2 = FUN_00493c7d(local_10);
                          FUN_0040ff60(1, uVar2);
                          FUN_00511880(0x50, s32((DAT_006ad30c + s32((DAT_006ad558 + local_c * 4), 0) * 0x54), 0), 2, 0, 0, 0);
                        }
                      }
                    }
                  }
                }
                else {
                  FUN_0055d8d8(param_1, local_10, 0, 0);
                }
              }
              else {
                FUN_0055d1e2(param_1, local_10);
              }
              if ((((1 << (((local_10) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                FUN_00467750(param_1, local_10, 1);
              }
            }
            w32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)), 0) & -0x401));
          }
          else if (((_MEM[DAT_0064c6c1 + (local_10 * 4 + param_1 * 0x594)] & 4) === 0)) {
            FUN_0055d1e2(param_1, local_10);
          }
        }
      }
    }
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
        if ((2 < DAT_00655b02)) {
          FUN_0047e94e(1, 0);
        }
        if (((_MEM[DAT_0064c6c0 + (local_10 * 4 + param_1 * 0x594)] & 1) !== 0)) {
          if ((DAT_006d1da0 === local_10)) {
            FUN_00560d95(param_1, local_10);
          }
          else if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0xa0, s32((DAT_006ad30c + s32((DAT_006ad558 + local_10 * 4), 0) * 0x54), 0), param_1, local_10, 0, 0, 0, 0, 0, 0);
          }
        }
      }
      FUN_0055f7d1(param_1);
      for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
        if ((2 < DAT_00655b02)) {
          FUN_0047e94e(1, 0);
        }
        if ((((1 << (((local_14) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          if ((DAT_006d1da0 === local_14)) {
            FUN_00562021(param_1, local_14);
          }
          else if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0xa1, s32((DAT_006ad30c + s32((DAT_006ad558 + local_14 * 4), 0) * 0x54), 0), param_1, local_14, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }
  return;
}


 export function FUN_00560d95 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_1c;
  let local_10;
  let local_c;
  let local_8;

  FUN_0055bbc0(param_1, param_2);
  iVar6 = DAT_006ab5e4;
  if (((s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & 0x2008) === 0)) {
    iVar1 = ((s16((DAT_0064f340 + DAT_006ab5e4 * 0x58), 0)) << 16 >> 16);
    iVar2 = ((s16((DAT_0064f342 + DAT_006ab5e4 * 0x58), 0)) << 16 >> 16);
    if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 4) === 0)) {
      if ((s32((DAT_006ab5c0 + param_2 * 4), 0) !== 0));
      uVar4 = _rand();
      uVar7 = (uVar4 >> 0x1f);
      local_2c = (((((uVar4 ^ uVar7) - uVar7) & 1) ^ uVar7) - uVar7);
      if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 0x10) !== 0)) {
        wv(DAT_006ab5ec, (DAT_006ab5ec + 1));
      }
      if ((2 < (u8(_MEM[DAT_0064c6be + param_2 * 0x594]) + DAT_006ab5ec))) {
        if ((((u8(_MEM[DAT_0064c6be + param_2 * 0x594]) + DAT_006ab5ec) === 1) || (((u8(_MEM[DAT_0064c6be + param_2 * 0x594]) + DAT_006ab5ec) + -1) < 0))) {
          local_38 = 0;
        }
        else {
          local_38 = _rand();
          local_38 = (local_38 % (u8(_MEM[DAT_0064c6be + param_2 * 0x594]) + DAT_006ab5ec));
        }
        if ((1 < local_38)) {
          local_2c = 0;
          FUN_00467825(param_1, param_2, 0x20);
        }
      }
      if ((((((DAT_00655af8) << 16 >> 16) + param_1) & 3) === 0)) {
        iVar5 = FUN_00458df9(param_2, param_1, iVar1, iVar2);
        if ((iVar5 !== 0)) {
          if ((s8(_MEM[DAT_0064f348 + iVar6 * 0x58]) !== (param_2 & 0xff))) {
            FUN_0043cc00(iVar6, param_2);
            FUN_0047cea6(iVar1, iVar2);
          }
          FUN_0040ff60(1, (DAT_0064f360 + iVar6 * 0x58));
          if ((local_2c === 0)) {
            FUN_00410030(s_NEARCITY_00633cc0, DAT_00647748, 0);
          }
          else {
            FUN_00410030(s_ADMIRECITY_00633cb4, DAT_00647748, 0);
          }
        }
        FUN_0045918e();
      }
    }
    else {
      if ((s32((DAT_006ab5c0 + param_2 * 4), 0) !== 0)) {
        FUN_0040ff60(1, (DAT_0064f360 + DAT_006ab5e4 * 0x58));
        uVar3 = FUN_00493c7d(param_1);
        FUN_0040ff60(2, uVar3);
        uVar3 = FUN_00410070(param_1);
        FUN_0040ff60(3, uVar3);
        FUN_00410030(s_TERMS_00633c54, DAT_006409d8, 0);
        goto LAB_00561668;
      }
      if (((((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16)) < 3)) {
        FUN_0045705e(param_2, param_1);
        FUN_00458a3b(param_2, param_1);
        if ((s8(_MEM[DAT_0064f348 + iVar6 * 0x58]) !== (param_2 & 0xff))) {
          FUN_0043cc00(iVar6, param_2);
          FUN_005b976d(iVar1, iVar2, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
          FUN_0047cea6(iVar1, iVar2);
        }
        local_34 = (DAT_006ab5e8 + -1);
        FUN_0040ff60(1, (DAT_0064f360 + iVar6 * 0x58));
        if ((DAT_00633ac8 < 2)) {
          FUN_00410030(s_INTRUDER_00633c68, DAT_006409d8, 0);
        }
        else {
          FUN_00410030(s_INTRUDERS_00633c5c, DAT_006409d8, 0);
        }
        goto LAB_00561668;
      }
      FUN_0045705e(param_2, param_1);
      FUN_00458a3b(param_2, param_1);
      if ((s8(_MEM[DAT_0064f348 + iVar6 * 0x58]) !== (param_2 & 0xff))) {
        FUN_0043cc00(iVar6, param_2);
        FUN_005b976d(iVar1, iVar2, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
        FUN_0047cea6(iVar1, iVar2);
      }
      FUN_0040ff60(1, (DAT_0064f360 + iVar6 * 0x58));
      if ((DAT_00633ac8 < 2)) {
        local_2c = FUN_00410030(s_VIOLATOR_00633c80, DAT_006409d8, 0);
      }
      else {
        local_2c = FUN_00410030(s_VIOLATORS_00633c74, DAT_006409d8, 0);
      }
      if ((local_2c === 0)) {
        for (/* cond: (local_30 < ((DAT_00655b16) << 16 >> 16)) */); local_30 = (local_30 < ((DAT_00655b16) << 16 >> 16)); local_30 = (local_30 + 1)) {
          if ((-1 < iVar6)) {
            FUN_005b36df(local_30, ((s16((DAT_0064f340 + iVar6 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar6 * 0x58), 0)) << 16 >> 16), 1);
            _MEM[DAT_006560f9 + local_30 * 0x20] = 0;
            _MEM[DAT_006560ff + local_30 * 0x20] = 0xff;
            if ((_MEM[DAT_0064b1c3 + u8(_MEM[DAT_006560f6 + local_30 * 0x20]) * 0x14] !== 0)) {
              _MEM[DAT_006560fd + local_30 * 0x20] = 0;
            }
          }
        }
        FUN_0047cf9e(DAT_006d1da0, 1);
        FUN_00421da0(0, DAT_006ab5e0);
        FUN_0040bbb0();
        FUN_0040bbe0(s_WITHDRAWN_00633c8c);
        if ((DAT_006ab5e0 === 1)) {
          FUN_0040bbe0(DAT_00633c98);
        }
        FUN_00410030(DAT_00679640, DAT_006409d8, 0);
      }
      else {
        if ((_MEM[DAT_0064c6b5 + param_2 * 0x594] === 6)) {
 LAB_00561364: :
          if (((DAT_0064bc60 & 1) === 0)) {
            uVar3 = FUN_00410070(param_2);
            FUN_0040ff60(0, uVar3);
            FUN_00421ea0(s_SENATESCANDAL_00633c9c);
            FUN_0055c69d(param_2, 0);
          }
        }
        else {
          uVar4 = _rand();
          uVar7 = (uVar4 >> 0x1f);
          if ((_MEM[DAT_0064c6b5 + param_2 * 0x594] === 5));
        FUN_0045ac71(param_2, param_1, -1);
        uVar3 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar3);
        FUN_00410030(s_VIOLATE_00633cac, DAT_00644e48, 0);
      }
      FUN_0045918e();
    }
  }
  for (/* cond: (local_30 < ((DAT_00655b16) << 16 >> 16)) */); local_30 = (local_30 < ((DAT_00655b16) << 16 >> 16)); local_30 = (local_30 + 1)) {
    if ((s32((DAT_0065610a + local_30 * 0x20), 0) !== 0)) {
      w16((DAT_006560f4 + local_30 * 0x20), 0, (s16((DAT_006560f4 + local_30 * 0x20), 0) & 0xfffb));
    }
  }
 LAB_00561668: :
  local_c = 0;
  local_1c = 0;
  local_8 = 0;
  for (/* cond: (local_28 < 8) */); local_28 = (local_28 < 8); local_28 = (local_28 + 1)) {
    if ((_MEM[DAT_0064c6b0 + param_2 * 0x594] < _MEM[DAT_0064c6b0 + local_28 * 0x594])) {
      local_1c = (local_1c + 1);
    }
    iVar6 = FUN_00467af0(param_1, local_28);
    if ((iVar6 !== 0)) {
      local_c = (local_c + 1);
    }
    iVar6 = local_8;
    if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + local_28 * 0x594), 0))) {
      iVar6 = (local_8 + 2);
    }
    local_8 = iVar6;
  }
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) !== 0)) {
    if ((local_c === 0)) {
      if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < s32((DAT_0064c6a2 + param_2 * 0x594), 0))) {
        local_34 = (local_34 + 1);
      }
      if ((DAT_00655b08 !== 0)) {
        local_34 = (local_34 + 1);
      }
      if ((_MEM[DAT_0064c6b0 + param_2 * 0x594] < _MEM[DAT_0064c6b0 + param_1 * 0x594])) {
        local_34 = (local_34 + -1);
      }
      if ((s16((DAT_0064c70e + param_1 * 0x594), 0) < s16((DAT_0064c70e + param_2 * 0x594), 0))) {
        local_34 = (local_34 + 1);
      }
      if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
        local_34 = (local_34 + -1);
      }
    }
    else if ((1 < local_c)) {
      iVar6 = ((local_c - s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30])) + -1);
      if ((iVar6 < 2)) {
        iVar6 = 1;
      }
      local_34 = (local_34 - iVar6);
    }
    if (((u8(_MEM[DAT_0064c6b0 + param_1 * 0x594]) + 8) < u8(_MEM[DAT_0064c6b0 + param_2 * 0x594]))) {
      local_34 = (local_34 + 1);
    }
  }
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 4) !== 0)) {
    local_34 = (local_34 + -2);
  }
  if (((_MEM[DAT_0064c6c1 + (param_2 * 4 + param_1 * 0x594)] & 0x20) === 0)) {
    local_34 = (local_34 + -1);
  }
  if ((0xc8 < DAT_00655af8)) {
    local_10 = (7 - u8(_MEM[DAT_00655c22 + param_2]));
    iVar6 = FUN_00598ceb();
    if ((iVar6 !== 0)) {
      local_10 = 1;
    }
    if ((DAT_00655af8 < 0x190)) {
      local_10 = ((local_10 + 1) >> 1);
    }
    local_34 = (local_34 - local_10);
  }
  if ((DAT_00655b08 !== 0)) {
    local_10 = ((u8(DAT_00655b08) / 3 | 0) + 1);
    if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 0x10) === 0)) {
      local_10 = (local_10 >> 1);
    }
    local_34 = (local_34 + local_10);
  }
  iVar6 = local_34;
  if ((0 < iVar6)) {
    iVar6 = (local_34 + -2);
  }
  local_34 = iVar6;
  iVar6 = (s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) * 3 + s8(_MEM[DAT_006554f9 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2);
  if ((iVar6 < -1)) {
    iVar6 = -2;
  }
  local_20 = (u8(_MEM[DAT_00655c22 + param_2]) - u8(_MEM[DAT_00655c22 + param_1]));
  if ((local_20 < 0)) {
    local_20 = (local_20 / 2 | 0);
  }
  else if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) === 0)) {
    local_20 = (local_20 / 2 | 0);
  }
  local_34 = ((local_34 + iVar6) + local_20);
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 0x10) === 0)) {
    if ((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 4 < ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF))) {
      local_34 = (local_34 + -1);
    }
    if ((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 2 < ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF))) {
      local_34 = (local_34 + -1);
    }
    if (((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 3 / 2 | 0) < ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF))) {
      local_34 = (local_34 + -1);
    }
  }
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) === 0)) {
    if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
      local_34 = (local_34 + 1);
    }
    if ((((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) * 2 < ((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF))) {
      local_34 = (local_34 + 1);
    }
  }
  iVar6 = FUN_00453e51(param_2, 6);
  if ((iVar6 !== 0)) {
    if ((local_34 < 1)) {
      local_34 = (local_34 + -1);
    }
    else {
      local_34 = (local_34 >> 1);
    }
  }
  if ((local_1c === 0)) {
    local_34 = (local_34 + 1);
  }
  if ((_MEM[DAT_0064c6b0 + param_1 * 0x594] < _MEM[DAT_0064c6b0 + param_2 * 0x594])) {
    local_34 = (local_34 + (1 - s8(_MEM[DAT_006554fa + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30])));
  }
  if ((local_34 < 1)) {
    local_34 = 0;
  }
  iVar6 = FUN_00453e51(param_1, 0x14);
  if ((iVar6 !== 0)) {
    local_34 = (local_34 + 1);
  }
  iVar1 = FUN_00453e51(param_2, 0x14);
  iVar6 = local_34;
  if ((iVar1 !== 0)) {
    if ((0 < local_34)) {
      local_34 = (local_34 / 2 | 0);
    }
    iVar6 = (local_34 + -1);
    if ((-1 < (local_34 + -1))) {
      iVar6 = (local_34 + -2);
    }
  }
  local_34 = iVar6;
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 1) === 0)) {
    local_34 = 0;
  }
  FUN_00456f20(param_1, param_2, local_34);
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  return;
}


 export function FUN_00562021 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_6c;
  let local_64;
  let local_60;
  let local_5c;
  let local_c;
  let local_8;

  if (((u8(_MEM[DAT_0064c6be + param_2 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)])) < 6)) {
    for (/* cond: (local_64 < 8) */); local_64 = (local_64 < 8); local_64 = (local_64 + 1)) {
      if ((((1 << (((local_64) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        if (((_MEM[DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)] & 1) !== 0)) {
          if ((((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 2 - ((s16((DAT_0064c70e + local_64 * 0x594), 0)) & 0xFFFF)) === 0) || (((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 2 < ((s16((DAT_0064c70e + local_64 * 0x594), 0)) & 0xFFFF)))) {
            iVar1 = FUN_00458df9(param_2, param_1, -1, -1);
            if ((iVar1 === 0)) {
              iVar1 = ((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16);
              if ((((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16) <= (((DAT_00655af8) << 16 >> 16) + -15))) {
                iVar1 = (((DAT_00655af8) << 16 >> 16) + -15);
              }
              w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, ((iVar1) & 0xFFFF));
            }
            else {
              iVar1 = FUN_005adfa0((s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x64 | 0), 1, 0xa);
              local_60 = -1;
              local_c = -99;
              for (/* cond: (local_6c < 0x64) */); local_6c = (local_6c < 0x64); local_6c = (local_6c + 1)) {
                if ((local_c < local_8)) {
                  local_60 = local_6c;
                  local_c = local_8;
                }
              }
              uVar3 = FUN_00493c7d(local_64);
              FUN_0040ff60(1, uVar3);
              FUN_00421da0(0, iVar1 * 0x32);
              FUN_005f22d0(DAT_ffffffa4, s_HELPME_00633ccc);
              if (((_MEM[DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)] & 8) !== 0)) {
                FUN_0043c840(DAT_ffffffa4, s_INSTEAD_00633cd4);
              }
              if ((-1 < local_60)) {
                FUN_0043c840(DAT_ffffffa4, DAT_00633cdc);
                FUN_004271e8(2, s32((DAT_00627684 + local_60 * 0x10), 0));
              }
              iVar2 = FUN_00410030(DAT_ffffffa4, DAT_0063fc98, 0);
              if ((iVar2 === 0)) {
                iVar1 = ((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16);
                if ((((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16) <= (((DAT_00655af8) << 16 >> 16) + -14))) {
                  iVar1 = (((DAT_00655af8) << 16 >> 16) + -14);
                }
                w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, ((iVar1) & 0xFFFF));
              }
              else {
                if ((-1 < local_60)) {
                  iVar2 = FUN_004bd9f0(param_1, local_60);
                  if ((iVar2 === 0)) {
                    FUN_004bf05b(param_1, local_60, local_64, 0, 0);
                  }
                  FUN_004bf05b(param_2, local_60, param_1, 0, 0);
                }
                FUN_00467825(param_1, param_2, 0xc);
                FUN_0045ac71(param_2, local_64, param_1);
                FUN_00467825(param_2, local_64, 0x2000);
                w32((DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)), 0) | 0x80800));
                w16((DAT_0064ca82 + (local_64 * 2 + param_2 * 0x594)), 0, DAT_00655af8);
                w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, (DAT_00655af8 + 0x10));
                w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + iVar1 * -50));
                w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + iVar1 * 0x32));
                FUN_0056a65e(1);
              }
            }
            FUN_0045918e();
            return;
          }
          if ((_MEM[DAT_00655c22 + param_1] < 6)) {
            iVar1 = FUN_00458df9(param_2, param_1, -1, -1);
            if ((iVar1 === 0)) {
              iVar1 = ((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16);
              if ((((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16) <= (((DAT_00655af8) << 16 >> 16) + -15))) {
                iVar1 = (((DAT_00655af8) << 16 >> 16) + -15);
              }
              w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, ((iVar1) & 0xFFFF));
            }
            else {
              uVar3 = FUN_00493c7d(local_64);
              FUN_0040ff60(1, uVar3);
              FUN_004271e8(2, s32((DAT_00628420 + (u8(((s32((DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)), 0) & 8) === 0)) + 0x73) * 4), 0));
              FUN_005f22d0(DAT_ffffffa4, s_CRUSADE_00633ce0);
              if (((_MEM[DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)] & 8) !== 0)) {
                FUN_005f22d0(DAT_ffffffa4, s_JIHAD_00633ce8);
              }
              iVar1 = FUN_00410030(DAT_ffffffa4, DAT_0063fc98, 0);
              if ((iVar1 === 0)) {
                iVar1 = ((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16);
                if ((((s16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0)) << 16 >> 16) <= (((DAT_00655af8) << 16 >> 16) + -14))) {
                  iVar1 = (((DAT_00655af8) << 16 >> 16) + -14);
                }
                w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, ((iVar1) & 0xFFFF));
              }
              else {
                FUN_00467825(param_1, param_2, 0xc);
                FUN_0045ac71(param_2, local_64, param_1);
                w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, (DAT_00655af8 + 0x10));
                FUN_00467825(param_2, local_64, 0x2000);
                w32((DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_64 * 4 + param_2 * 0x594)), 0) | 0x80800));
                w16((DAT_0064ca82 + (local_64 * 2 + param_2 * 0x594)), 0, DAT_00655af8);
              }
            }
            FUN_0045918e();
            return;
          }
        }
        w32((DAT_0064c6c0 + (param_1 * 0x594 + local_64 * 4)), 0, (s32((DAT_0064c6c0 + (param_1 * 0x594 + local_64 * 4)), 0) & -0x201));
        if ((2 < DAT_00655b02)) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          XD_FlushSendBuffer(0x1388);
        }
      }
    }
  }
  return;
}


 export function FUN_00564470 (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  FUN_006e7b1c(DAT_006e4ff0, DAT_006ab600, 0x80);
  iVar1 = FUN_006e7b10(DAT_006ab600);
  local_8 = (DAT_006ab600 + iVar1);
  do {
    if ((local_8 === 0));
  } while ((_MEM[local_8 + -1] !== 0x5c));
  _MEM[local_8 + 1] = 0;
  do {
    for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
      iVar1 = FUN_0056459f(param_1);
      if ((iVar1 !== 0)) {
        return 1;
      }
    }
    FUN_00421e70(s_CDROMNOTFOUND2_00633d5c, 0x2000001);
  } while ((DAT_00631edc !== 0));
  return 0;
}


 export function FUN_00564549 ()

 {
  return (DAT_006ab680 === 0);
}


 export function FUN_00564574 ()

 {
  let puVar1;

  if ((DAT_006ab680 === 0)) {
    puVar1 = 0;
  }
  else {
    puVar1 = DAT_006ab680;
  }
  return puVar1;
}


 export function FUN_0056459f (param_1)

 {
  let uMode;
  let DVar1;
  let puVar2;
  let local_1a0;
  let local_19c;
  let local_114;
  let local_110;
  let local_10;
  let local_c;
  let local_8;

  uMode = FUN_006e7af8(1);
  DVar1 = FUN_006e7ae8();
  FUN_006e7aec(0x100, DAT_fffffef0);
  local_c = DAT_fffffef0;
  local_1a0 = 0;
  do {
    if ((0x19 < local_1a0)) {
 LAB_005646e1: :
      FUN_006e7af8(uMode);
      if ((DAT_006ab680 === 0)) {
        puVar2 = 0;
      }
      else {
        puVar2 = DAT_006ab680;
      }
      return puVar2;
    }
    local_10 = (1 << (((local_1a0) & 0xFF) & 0x1f));
    if (((DVar1 & local_10) !== 0)) {
      local_114 = FUN_006e7b24(local_c);
      if ((local_114 === 3)) {
        FUN_0040bbb0();
        FUN_0040bbe0(local_c);
        FUN_0040bbe0(param_1);
        local_8 = FUN_006e7b30(DAT_00679640, DAT_fffffe64, 0x4000);
        FUN_004aef20(DAT_006ab680);
        wv(DAT_006ab680, _MEM[local_c]);
        wv(DAT_006ab681, 0);
        FUN_0043c840(DAT_006ab680, DAT_00633d6c);
        goto LAB_005646e1;
      }
      for (/* cond: (_MEM[local_c] !== 0) */); local_c = _MEM[local_c]; local_c = (local_c + 1)) {
      }
      local_c = (local_c + 1);
    }
    local_1a0 = (local_1a0 + 1);
  } ( true );
}


 export function FUN_00564713 (param_1)

 {
  let pcVar1;
  let cVar2;
  let iVar3;
  let uMode;
  let local_1a8;
  let local_128;
  let local_118;
  let local_90;
  let local_10;
  let local_c;
  let local_8;

  iVar3 = FUN_006e7b10(param_1);
  local_c = (param_1 + iVar3);
  local_10 = FUN_006e7b10(param_1);
  local_10 = (local_10 + 1);
  for (/* cond: (_MEM[local_c] !== 0x5c) */); (local_10 = (local_10 !== 0) && (local_c = _MEM[local_c])); local_c = (local_c + -1)) {
    local_10 = (local_10 + -1);
  }
  local_c = (local_c + 1);
  FUN_004aef20(DAT_fffffed8);
  FUN_004aef20(DAT_fffffed8);
  FUN_0043c840(DAT_fffffed8, (param_1 + local_10));
  uMode = FUN_006e7af8(1);
  FUN_004aef20(DAT_ffffff70);
  FUN_0043c840(DAT_ffffff70, DAT_006ab600);
  FUN_0043c840(DAT_ffffff70, DAT_fffffed8);
  local_8 = FUN_006e7b30(DAT_ffffff70, DAT_fffffee8, 0x4000);
  if ((local_8 === -1)) {
    local_c = param_1;
    do {
      if ((_MEM[local_c] === 0));
      cVar2 = _MEM[local_c];
      local_c = pcVar1;
    } while ((cVar2 !== 0x5c));
    FUN_004aef20(DAT_fffffe58);
    FUN_0043c840(DAT_fffffe58, DAT_006ab600);
    if ((_MEM[local_c] === 0)) {
      FUN_0043c840(DAT_fffffe58, param_1);
    }
    else {
      FUN_0043c840(DAT_fffffe58, local_c);
    }
    local_8 = FUN_006e7b30(DAT_fffffe58, DAT_fffffee8, 0x4000);
    if ((local_8 === -1)) {
      if ((DAT_006ab680 === 0)) {
        local_8 = 0;
      }
      else {
        FUN_004aef20(DAT_ffffff70);
        FUN_0043c840(DAT_ffffff70, DAT_006ab680);
        FUN_0043c840(DAT_ffffff70, param_1);
        local_8 = FUN_006e7b30(DAT_ffffff70, DAT_fffffee8, 0x4000);
        if ((local_8 === -1)) {
          local_8 = 0;
        }
        else {
          FUN_004aef20(DAT_fffffe58);
          FUN_0043c840(DAT_fffffe58, DAT_006ab680);
          FUN_0043c840(DAT_fffffe58, param_1);
          FUN_004aef20(param_1);
          FUN_0043c840(param_1, DAT_fffffe58);
          local_8 = 1;
        }
      }
    }
    else {
      FUN_004aef20(param_1);
      FUN_0043c840(param_1, DAT_fffffe58);
      local_8 = 1;
    }
  }
  else {
    FUN_004aef20(param_1);
    FUN_0043c840(param_1, DAT_006ab600);
    FUN_0043c840(param_1, DAT_fffffed8);
    local_8 = 1;
  }
  FUN_006e7af8(uMode);
  return local_8;
}


 export function FUN_00564bf0 (param_1)

 {
  let cVar1;
  let iVar2;
  let local_8;

  if ((_MEM[param_1] === 0x30)) {
    iVar2 = FID_conflict:__toupper_lk(u8(_MEM[param_1 + 1]));
    cVar1 = ((iVar2) & 0xFF);
    if ((cVar1 === 0x58)) {
      local_8 = FUN_0046e8f0((param_1 + 2));
    }
    else if ((cVar1 === 0x42)) {
      local_8 = FUN_005bad40((param_1 + 2));
    }
    else if ((cVar1 === 0x44)) {
      local_8 = _atoi((param_1 + 2));
    }
    else {
      local_8 = _atoi(param_1);
    }
  }
  else {
    local_8 = _atoi(param_1);
  }
  return local_8;
}


 export function FUN_00564d00 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0x658), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0x658), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  for (/* cond: (local_8 < s32((in_ECX + 0x658), 0)) */); local_8 = (local_8 < s32((in_ECX + 0x658), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0x7ec) + local_8 * 4), 0));
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


 export function FUN_00564e6d (in_ECX)

 {
  let iVar1;
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let extraout_EAX_02;
  let extraout_EAX_03;
  let extraout_EAX_04;
  let uVar2;
  let extraout_EAX_05;
  let _Size;
  let extraout_EAX_06;
  // in_ECX promoted to parameter;
  let iVar3;
  let bVar4;
  let local_1ac;
  let local_19c;
  let local_18c;
  let local_17c;
  let local_178;
  let local_174;
  let local_170;
  let local_16c;
  let local_168;
  let local_164;
  let local_160;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let local_130;
  let local_12c;
  let local_128;
  let local_127;
  let local_24;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  FUN_005c00ce(DAT_ffffffe4);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_c = DAT_0067a798;
  local_154 = s32((in_ECX + 0x5f8), 0);
  local_24 = FUN_0040ef70();
  local_158 = (s32((in_ECX + 0x5fc), 0) + 5);
  local_16c = s32(((in_ECX + 0x7ec) + s32((in_ECX + 0x120), 0) * 4), 0);
  FUN_005cef31(DAT_fffffe74, DAT_006a6668, (DAT_0062d858 + local_154), local_158);
  FUN_005c19ad(DAT_00635a1c);
  local_12c = 0;
  for (/* cond: (local_14c < 0x64) */); local_14c = (local_14c < 0x64); local_14c = (local_14c + 1)) {
    if ((s8(_MEM[DAT_0062768f + local_14c * 0x10]) === local_16c)) {
      local_12c = (local_12c + 1);
    }
  }
  for (/* cond: (local_164 < 0x43) */); local_164 = (local_164 < 0x43); local_164 = (local_164 + 1)) {
    if ((s8(_MEM[DAT_0064c48e + local_164 * 8]) === local_16c)) {
      local_12c = (local_12c + 1);
    }
  }
  for (/* cond: (local_15c < 0x3e) */); local_15c = (local_15c < 0x3e); local_15c = (local_15c + 1)) {
    if ((s8(_MEM[DAT_0064b1cb + local_15c * 0x14]) === local_16c)) {
      local_12c = (local_12c + 1);
    }
  }
  local_154 = (s32((in_ECX + 0x5f8), 0) + 0x32);
  FUN_0040bbb0();
  FUN_0040bc10(0x79);
  FUN_0040fe40();
  FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_154 = (local_154 + (iVar1 + 5));
  FUN_0040bbb0();
  if ((_MEM[DAT_0062768f + local_16c * 0x10] < 0)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
  }
  else {
    if ((0xff < _MEM[DAT_0062768e + local_16c * 0x10])) {
      FUN_0040ff00(s32((DAT_00627684 + s8(_MEM[DAT_0062768e + local_16c * 0x10]) * 0x10), 0));
      local_130 = FUN_0040efd0(DAT_00679640);
      local_c = ~_Timevec(local_c);
      FUN_006e7d90(DAT_fffffec0, local_154, local_158, ((local_130 + local_154) + 5), (extraout_EAX + local_158));
      FUN_00452c14(s8(_MEM[DAT_0062768e + local_16c * 0x10]), local_154, local_158, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    }
    if ((0xff < _MEM[DAT_0062768f + local_16c * 0x10])) {
      if ((0xff < _MEM[DAT_0062768e + local_16c * 0x10])) {
        local_154 = (local_154 + (local_130 + 3));
        FUN_0040bbb0();
        FUN_00421d30();
        FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
        local_130 = FUN_0040efd0(DAT_00679640);
        local_130 = (local_130 + 4);
        local_154 = (local_154 + local_130);
      }
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_00627684 + s8(_MEM[DAT_0062768f + local_16c * 0x10]) * 0x10), 0));
      local_130 = FUN_0040efd0(DAT_00679640);
      local_c = ~_Timevec(local_c);
      FUN_006e7d90(DAT_fffffec0, local_154, local_158, ((local_130 + local_154) + 5), (extraout_EAX_00 + local_158));
      FUN_00452c14(s8(_MEM[DAT_0062768f + local_16c * 0x10]), local_154, local_158, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    }
  }
  local_158 = (local_158 + local_24);
  local_154 = (s32((in_ECX + 0x5f8), 0) + 2);
  FUN_0040bbb0();
  FUN_0040bc10(0x7a);
  FUN_0040fe40();
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_20 = ((local_154 + iVar1) + 2);
  if ((local_12c !== 0)) {
    FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
  }
  FUN_0040bbb0();
  for (/* cond: (local_14c < 0x64) */); local_14c = (local_14c < 0x64); local_14c = (local_14c + 1)) {
    local_178 = 0;
    local_174 = -1;
    if ((s8(_MEM[DAT_0062768e + local_14c * 0x10]) === local_16c)) {
      local_178 = 1;
      local_174 = s8(_MEM[DAT_0062768f + local_14c * 0x10]);
    }
    else if ((s8(_MEM[DAT_0062768f + local_14c * 0x10]) === local_16c)) {
      local_178 = 1;
      local_174 = s8(_MEM[DAT_0062768e + local_14c * 0x10]);
    }
    if ((local_178 !== 0)) {
      local_154 = local_20;
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_00627684 + local_14c * 0x10), 0));
      local_130 = FUN_0040efd0(DAT_00679640);
      local_c = ~_Timevec(local_c);
      FUN_006e7d90(DAT_fffffec0, local_154, local_158, ((local_130 + local_154) + 2), (extraout_EAX_01 + local_158));
      FUN_00452c14(local_14c, local_154, local_158, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      iVar1 = FUN_0040efd0(DAT_00679640);
      local_154 = (local_154 + (iVar1 + 2));
      if ((-1 < local_174)) {
        FUN_0040bbb0();
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0x7b);
        FUN_0040fe10();
        FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
        iVar1 = FUN_0040efd0(DAT_00679640);
        local_154 = (local_154 + (iVar1 + 2));
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_00627684 + local_174 * 0x10), 0));
        local_130 = FUN_0040efd0(DAT_00679640);
        local_c = ~_Timevec(local_c);
        FUN_006e7d90(DAT_fffffec0, local_154, local_158, ((local_130 + local_154) + 2), (extraout_EAX_02 + local_158));
        FUN_00452c14(local_174, local_154, local_158, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
        iVar1 = FUN_0040efd0(DAT_00679640);
        local_154 = (local_154 + (iVar1 + 2));
        FUN_0040bbb0();
        FUN_0040fed0();
        FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
      }
      local_158 = (local_158 + local_24);
    }
  }
  local_8 = 0;
  local_154 = local_20;
  for (/* cond: (local_164 < 0x43) */); local_164 = (local_164 < 0x43); local_164 = (local_164 + 1)) {
    if ((s8(_MEM[DAT_0064c48e + local_164 * 8]) === local_16c)) {
      FUN_005cef31(DAT_fffffe64, DAT_006a6668, local_154, local_158);
      iVar1 = FUN_00451830();
      local_154 = (local_154 + (iVar1 + 5));
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_0064c488 + local_164 * 8), 0));
      local_130 = FUN_0040efd0(DAT_00679640);
      local_c = ~_Timevec(local_c);
      local_160 = extraout_EAX_03;
      if (((iVar1 / 2 | 0) <= ((local_130 + local_154) + 5))) {
        iVar1 = FUN_00407f90((in_ECX + 0x5f8));
        local_130 = (((iVar1 / 2 | 0) + -5) - local_154);
      }
      FUN_006e7d90(DAT_fffffec0, local_154, local_158, ((local_130 + local_154) + 5), (local_160 + local_158));
      if ((local_164 < 0x27)) {
        FUN_00452c14(local_164, local_154, local_158, 1, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      }
      else {
        FUN_00452c14(local_164, local_154, local_158, 2, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      }
      bVar4 = (local_8 !== 0);
      if (bVar4) {
        local_158 = (local_158 + local_24);
        local_154 = local_20;
      }
      else {
        local_154 = FUN_00407f90((in_ECX + 0x5f8));
        local_154 = (local_154 / 2 | 0);
      }
      local_8 = u8((!bVar4));
    }
  }
  local_154 = local_20;
  if ((local_8 === 1)) {
    local_158 = (local_158 + local_24);
  }
  local_8 = 0;
  for (/* cond: (local_15c < 0x3e) */); local_15c = (local_15c < 0x3e); local_15c = (local_15c + 1)) {
    if ((s8(_MEM[DAT_0064b1cb + local_15c * 0x14]) === local_16c)) {
      if ((local_12c < 0xb)) {
        iVar1 = FUN_004bb540();
        iVar3 = (local_158 + (iVar1 / 2 | 0));
        iVar1 = FUN_00451860();
        FUN_005cef31(DAT_fffffe54, DAT_006a6668, local_154, (iVar3 - (iVar1 / 2 | 0)));
        iVar1 = FUN_004a6980();
        local_154 = (local_154 + (iVar1 + 5));
        iVar1 = FUN_004bb540();
        local_c = ~_Timevec(local_c);
        local_148 = (((iVar1 / 2 | 0) - (extraout_EAX_04 / 2 | 0)) + local_158);
      }
      else {
        local_148 = local_158;
      }
      FUN_0040bbb0();
      uVar2 = FUN_00428b0c(s32((DAT_0064b1b8 + local_15c * 0x14), 0));
      FUN_0040bbe0(uVar2);
      local_130 = FUN_0040efd0(DAT_00679640);
      local_c = ~_Timevec(local_c);
      FUN_006e7d90(DAT_fffffec0, local_154, local_148, ((local_130 + local_154) + 5), (extraout_EAX_05 + local_148));
      FUN_00452c14(local_15c, local_154, local_148, 3, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      if ((local_8 === 0)) {
        local_154 = FUN_00407f90((in_ECX + 0x5f8));
        local_154 = (local_154 / 2 | 0);
        local_8 = 1;
        local_170 = FUN_00451860();
      }
      else {
        local_154 = local_20;
        local_8 = 0;
        if ((local_12c < 0xb)) {
          iVar1 = FUN_00451860();
          if ((iVar1 < local_170)) {
            local_158 = (local_158 + local_170);
          }
          else {
            iVar1 = FUN_00451860();
            local_158 = (local_158 + iVar1);
          }
        }
        else {
          local_158 = (local_158 + local_24);
        }
      }
    }
  }
  local_154 = local_20;
  if ((local_8 === 1)) {
    iVar1 = FUN_00451860();
    if ((iVar1 < local_170)) {
      local_158 = (local_158 + local_170);
    }
    else {
      iVar1 = FUN_00451860();
      local_158 = (local_158 + iVar1);
    }
  }
  local_168 = s_PEDIA_00633d74;
  iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((iVar1 !== 0)) {
    __chdir(DAT_0064bb08);
    FUN_005f22d0(DAT_fffffed8, s_describe._00633d7c);
    FUN_005f22e0(DAT_fffffed8, DAT_0062cd24);
    iVar1 = FUN_00415133(DAT_fffffed8);
    if ((iVar1 === 0)) {
      FUN_00453c40();
      __chdir(DAT_00655020);
      return;
    }
    __chdir(DAT_00655020);
  }
  local_144 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((local_144 !== 0)) {
    __chdir(DAT_0064bb08);
    FUN_005f22d0(DAT_fffffed8, s_pedia._00633d88);
    FUN_005f22e0(DAT_fffffed8, DAT_0062cd24);
    iVar1 = FUN_00415133(DAT_fffffed8);
    if ((iVar1 === 0)) {
      local_144 = 0;
    }
    __chdir(DAT_00655020);
  }
  FUN_004aef20(DAT_fffffed8);
  iVar1 = FUN_004a2379(local_168, s_PEDIACIVFACTS_00633d90);
  if ((iVar1 === 0)) {
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x15)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x12)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x42)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x43)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x46)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x38)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x18)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x59)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x3b)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x20)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0x3c)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    if ((local_16c === 0xf)) {
      FUN_005c0f57(local_c, (local_150 + u8((_MEM[local_150] === 0x5e))), local_154, local_158, 5);
      local_158 = (local_158 + local_24);
    }
    local_150 = FUN_004a23fc(1);
    FUN_004aef36(local_150);
    FUN_005f22d0(DAT_fffffed8, local_150);
    if ((local_128 === 0x5e)) {
      _Size = _strlen(DAT_fffffed9);
      FID_conflict:_memcpy(DAT_fffffed8, DAT_fffffed9, _Size);
    }
    for (/* cond: (local_17c < 0x1c) */); local_17c = (local_17c < 0x1c); local_17c = (local_17c + 1)) {
      if ((s8(_MEM[DAT_0064ba28 + local_17c]) === local_16c)) {
        FUN_005c0f57(local_c, DAT_fffffed8, local_154, local_158, 5);
        iVar1 = FUN_0040efd0(DAT_fffffed8);
        local_154 = (local_154 + iVar1);
        FUN_0040bbb0();
        FUN_0040ff00(s32(DAT_0064c5c0, local_17c * 2));
        local_130 = FUN_0040efd0(DAT_00679640);
        local_c = ~_Timevec(local_c);
        FUN_006e7d90(DAT_fffffec0, local_154, local_158, (local_130 + local_154), (extraout_EAX_06 + local_158));
        FUN_00452c14((local_17c + 0x27), local_154, local_158, 2, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
        iVar1 = FUN_0040efd0(DAT_00679640);
        local_154 = (local_154 + (iVar1 + 2));
        FUN_0040bbb0();
        FUN_0043c810();
        FUN_005c0f57(local_c, DAT_00679640, local_154, local_158, 5);
        local_154 = local_20;
        local_158 = (local_158 + local_24);
      }
    }
  }
  FUN_00452768(s32((in_ECX + 0x120), 0));
  FUN_005c0073(DAT_ffffffe4);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_00566584 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_006ad908 === 0)) {
    for (/* cond: (s32(((in_ECX + 0x7ec) + local_8 * 4), 0) !== param_1) */);
        (local_8 = (local_8 < s32((in_ECX + 0x658), 0)) && (in_ECX = (in_ECX + 0x7ec)));
        local_8 = (local_8 + 1)) {
    }
    if ((s32((in_ECX + 0x658), 0) !== local_8)) {
      FUN_004f7bd1(1, 0);
      w32((in_ECX + 0x120), 0, local_8);
      w32((in_ECX + 0x1f38), 0, local_8);
      w32((in_ECX + 0x124), 0, 1);
      w32((in_ECX + 0x11c), 0, 1);
      FUN_004f4793();
      FUN_00451bf0();
      uVar1 = FUN_004f8a9b(DAT_006a7d44, local_8);
      FUN_005f22d0((in_ECX + 0x618), uVar1);
      FUN_004f6244();
      FUN_00564e6d();
      FUN_004085f0();
      FUN_00408460();
      FUN_004518d0();
      wv(DAT_006a66b0, DAT_006a66b0);
      FUN_005c61b0();
      wv(DAT_006a66b0, DAT_006a66b0);
    }
  }
  return;
}


 export function FUN_005666da (in_ECX)

 {
  let extraout_EAX;
  let iVar1;
  let piVar2;
  let extraout_EAX_00;
  let iVar3;
  let iVar4;
  let extraout_EAX_01;
  let extraout_EAX_02;
  // in_ECX promoted to parameter;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_138;
  let local_128;
  let local_118;
  let local_108;
  let local_104;
  let aiStack_100;
  let local_e0;
  let aiStack_dc;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_b0;
  let aiStack_ac;
  let local_8c;
  let local_88;
  let aiStack_84;
  let local_74;
  let local_70;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_40;
  let aiStack_30;
  let local_20;
  let local_10;
  let local_c;

  FUN_005c00ce(DAT_ffffffe0);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_004f4793();
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_10 = DAT_0067a798;
  local_108 = s32(((in_ECX + 0x7ec) + s32((in_ECX + 0x120), 0) * 4), 0);
  FUN_0040bbb0();
  FUN_0040ff00(s32((DAT_00627684 + local_108 * 0x10), 0));
  local_4c = FUN_0040efd0(DAT_00679640);
  local_10 = ~_Timevec(local_10);
  local_e0 = (DAT_00646cb8 + (s8(_MEM[DAT_0062768c + local_108 * 0x10]) * 0xf0 + s8(_MEM[DAT_0062768d + local_108 * 0x10]) * 0x3c));
  local_104 = extraout_EAX;
  local_88 = FUN_00451830();
  local_88 = (local_88 + 3);
  local_8c = ((s32((in_ECX + 0x600), 0) + -3) - (local_88 + FUN_0040efd0(DAT_00679640)));
  iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
  local_b4 = ((s32((in_ECX + 0x5fc), 0) + (iVar1 / 2 | 0)) - (local_104 / 2 | 0));
  piVar2 = FUN_005cef31(DAT_fffffee8, DAT_006a6668, local_8c, local_b4);
  local_5c = s32(piVar2, 0);
  local_58 = s32(piVar2, 1);
  local_54 = s32(piVar2, 2);
  local_50 = s32(piVar2, 3);
  local_8c = (local_8c + local_88);
  FUN_006e7d90(DAT_ffffffc0, (local_8c - local_88), local_b4, ((FUN_0040efd0(DAT_00679640) + local_8c) + 5), (local_104 + local_b4));
  FUN_00452c14(local_108, local_8c, local_b4, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
  local_c = s8(_MEM[DAT_0062768e + local_108 * 0x10]);
  local_c = s8(_MEM[DAT_0062768f + local_108 * 0x10]);
  local_4c = local_5c;
  local_4c = local_5c;
  iVar1 = FUN_00407fc0((DAT_ffffff7c + 0xa));
  local_74 = (local_58 + (iVar1 / 2 | 0));
  local_70 = local_74;
  local_10 = ~_Timevec(local_10);
  local_104 = extraout_EAX_00;
  iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
  local_b4 = ((s32((in_ECX + 0x5fc), 0) + ((iVar1 + ((iVar1 >> 0x1f) & 3)) >> 2)) - (local_104 / 2 | 0))
  ;
  for (/* cond: (local_b0 < 2) */); local_b0 = (local_b0 < 2); local_b0 = (local_b0 + 1)) {
    w32(DAT_ffffffd0, local_b0 * 2, -1);
    w32(DAT_ffffffd0, (local_b0 * 2 + 1), -1);
    if ((-1 < s32(DAT_fffffff4, local_b0))) {
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_00627684 + s32(DAT_fffffff4, local_b0) * 0x10), 0));
      local_4c = FUN_0040efd0(DAT_00679640);
      local_e0 = (DAT_00646cb8 + (s8(_MEM[DAT_0062768c + s32(DAT_fffffff4, local_b0) * 0x10]) * 0xf0 + s8(_MEM[DAT_0062768d + s32(DAT_fffffff4, local_b0) * 0x10]) * 0x3c));
      local_88 = FUN_00451830();
      local_88 = (local_88 + 3);
      iVar1 = FUN_00407f90((in_ECX + 0x5f8));
      iVar3 = FUN_00407f90((in_ECX + 0x5f8));
      local_8c = ((((iVar1 * 2 + ((iVar1 * 2 >> 0x1f) & 3)) >> 2) + ((iVar3 + ((iVar3 >> 0x1f) & 7)) >> 3)) + s32((in_ECX + 0x5f8), 0));
      piVar2 = FUN_005cef31(DAT_fffffed8, DAT_006a6668, local_8c, local_b4);
      local_5c = s32(piVar2, 0);
      local_58 = s32(piVar2, 1);
      local_54 = s32(piVar2, 2);
      local_14c = s32(piVar2, 3);
      local_50 = local_14c;
      if ((local_b0 !== 0)) {
        local_14c = (s32(piVar2, 1) + -1);
      }
      iVar1 = s32(DAT_ffffff7c, (local_b0 + 4));
      iVar3 = s32(DAT_ffffffb4, local_b0);
      iVar4 = FUN_00407f90((DAT_ffffff7c + 0xa), local_14c, iVar3, iVar1);
      FUN_005674b9((local_5c + (iVar4 / 2 | 0)), local_14c, iVar3, iVar1);
      local_8c = (local_8c + local_88);
      w32(DAT_ffffffd0, local_b0 * 2, s8(_MEM[DAT_0062768e + s32(DAT_fffffff4, local_b0) * 0x10]));
      w32(DAT_ffffffd0, (local_b0 * 2 + 1), s8(_MEM[DAT_0062768f + s32(DAT_fffffff4, local_b0) * 0x10]));
      w32(DAT_ffffff7c, (local_b0 * 2 + 7), local_5c);
      w32(DAT_ffffff7c, (local_b0 * 2 + 6), s32(DAT_ffffff7c, (local_b0 * 2 + 7)));
      iVar1 = FUN_00407fc0((DAT_ffffff7c + 0xa));
      w32(DAT_ffffff7c, (local_b0 * 2 + 1), (local_58 + (iVar1 / 2 | 0)));
      w32(DAT_ffffff7c, local_b0 * 2, s32(DAT_ffffff7c, (local_b0 * 2 + 1)));
      FUN_006e7d90(DAT_ffffffc0, (local_8c - local_88), local_b4, ((FUN_0040efd0(DAT_00679640) + local_8c) + 5), (local_104 + local_b4));
      FUN_00452c14(s32(DAT_fffffff4, local_b0), local_8c, local_b4, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    }
    iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
    local_b4 = (local_b4 + (iVar1 / 2 | 0));
  }
  local_10 = ~_Timevec(local_10);
  local_104 = extraout_EAX_01;
  iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
  local_b4 = ((s32((in_ECX + 0x5fc), 0) + ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3)) - (local_104 / 2 | 0))
  ;
  for (/* cond: (local_b0 < 2) */); local_b0 = (local_b0 < 2); local_b0 = (local_b0 + 1)) {
    for (/* cond: (local_b8 < 2) */); local_b8 = (local_b8 < 2); local_b8 = (local_b8 + 1)) {
      w32(DAT_ffffff54, (local_b0 * 2 + local_b8) * 2, -1);
      w32(DAT_ffffff54, ((local_b0 * 2 + local_b8) * 2 + 1), -1);
      if ((-1 < s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)))) {
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_00627684 + s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)) * 0x10), 0));
        local_4c = FUN_0040efd0(DAT_00679640);
        local_e0 = (DAT_00646cb8 + (s8(_MEM[DAT_0062768d + s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)) * 0x10]) * 0x3c + s8(_MEM[DAT_0062768c + s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)) * 0x10]) * 0xf0));
        local_88 = FUN_00451830();
        local_88 = (local_88 + 3);
        iVar1 = FUN_00407f90((in_ECX + 0x5f8));
        iVar3 = FUN_00407f90((in_ECX + 0x5f8));
        local_8c = ((((iVar1 + ((iVar1 >> 0x1f) & 3)) >> 2) + ((iVar3 + ((iVar3 >> 0x1f) & 7)) >> 3)) + s32((in_ECX + 0x5f8), 0));
        piVar2 = FUN_005cef31(DAT_fffffec8, DAT_006a6668, local_8c, local_b4);
        local_5c = s32(piVar2, 0);
        local_58 = s32(piVar2, 1);
        local_54 = s32(piVar2, 2);
        local_150 = s32(piVar2, 3);
        local_50 = local_150;
        if ((local_b8 !== 0)) {
          local_150 = (s32(piVar2, 1) + -1);
        }
        iVar1 = s32(DAT_ffffff7c, (local_b0 * 2 + local_b8));
        iVar3 = s32(DAT_ffffff7c, (local_b0 * 2 + (local_b8 + 6)));
        iVar4 = FUN_00407f90((DAT_ffffff7c + 0xa), local_150, iVar3, iVar1);
        FUN_005674b9((local_5c + (iVar4 / 2 | 0)), local_150, iVar3, iVar1);
        local_8c = (local_8c + local_88);
        w32(DAT_ffffff54, (local_b0 * 2 + local_b8) * 2, s8(_MEM[DAT_0062768e + s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)) * 0x10]));
        w32(DAT_ffffff54, ((local_b0 * 2 + local_b8) * 2 + 1), s8(_MEM[DAT_0062768f + s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)) * 0x10]));
        w32(DAT_ffffff24, ((local_b0 * 2 + local_b8) * 2 + 1), local_5c);
        w32(DAT_ffffff24, (local_b0 * 2 + local_b8) * 2, s32(DAT_ffffff24, ((local_b0 * 2 + local_b8) * 2 + 1)));
        iVar1 = FUN_00407fc0((DAT_ffffff7c + 0xa));
        w32(DAT_ffffff00, ((local_b0 * 2 + local_b8) * 2 + 1), (local_58 + (iVar1 / 2 | 0)));
        w32(DAT_ffffff00, (local_b0 * 2 + local_b8) * 2, s32(DAT_ffffff00, ((local_b0 * 2 + local_b8) * 2 + 1)));
        FUN_006e7d90(DAT_ffffffc0, (local_8c - local_88), local_b4, ((FUN_0040efd0(DAT_00679640) + local_8c) + 5), (local_104 + local_b4));
        FUN_00452c14(s32(DAT_ffffffd0, (local_b0 * 2 + local_b8)), local_8c, local_b4, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      }
      iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
      local_b4 = (local_b4 + ((iVar1 + ((iVar1 >> 0x1f) & 3)) >> 2));
    }
  }
  iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
  local_bc = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
  local_10 = ~_Timevec(local_10);
  local_8c = (s32((in_ECX + 0x5f8), 0) + 2);
  local_104 = extraout_EAX_02;
  for (/* cond: (local_b0 < 4) */); local_b0 = (local_b0 < 4); local_b0 = (local_b0 + 1)) {
    for (/* cond: (local_b8 < 2) */); local_b8 = (local_b8 < 2); local_b8 = (local_b8 + 1)) {
      local_b4 = ((((local_b0 * 2 + local_b8) * local_bc + s32((in_ECX + 0x5fc), 0)) + (local_bc / 2 | 0)) - (local_104 / 2 | 0));
      if ((-1 < s32(DAT_ffffff54, (local_b0 * 2 + local_b8)))) {
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_00627684 + s32(DAT_ffffff54, (local_b0 * 2 + local_b8)) * 0x10), 0));
        local_4c = FUN_0040efd0(DAT_00679640);
        local_e0 = (DAT_00646cb8 + (s8(_MEM[DAT_0062768c + s32(DAT_ffffff54, (local_b0 * 2 + local_b8)) * 0x10]) * 0xf0 + s8(_MEM[DAT_0062768d + s32(DAT_ffffff54, (local_b0 * 2 + local_b8)) * 0x10]) * 0x3c));
        local_88 = FUN_00451830();
        local_88 = (local_88 + 3);
        piVar2 = FUN_005cef31(DAT_fffffeb8, DAT_006a6668, local_8c, local_b4);
        local_5c = s32(piVar2, 0);
        local_58 = s32(piVar2, 1);
        local_54 = s32(piVar2, 2);
        local_154 = s32(piVar2, 3);
        local_50 = local_154;
        if ((local_b8 !== 0)) {
          local_154 = (s32(piVar2, 1) + -1);
        }
        iVar1 = s32(DAT_ffffff00, (local_b0 * 2 + local_b8));
        iVar3 = s32(DAT_ffffff24, (local_b0 * 2 + local_b8));
        iVar4 = FUN_00407f90((DAT_ffffff7c + 0xa), local_154, iVar3, iVar1);
        FUN_005674b9((local_5c + (iVar4 / 2 | 0)), local_154, iVar3, iVar1);
        if ((0xff < _MEM[DAT_0062768f + s32(DAT_ffffff54, (local_b0 * 2 + local_b8)) * 0x10])) {
          iVar1 = FUN_00407fc0((DAT_ffffff7c + 0xa));
          FUN_005675b7(local_5c, (local_58 + (iVar1 / 2 | 0)));
        }
        FUN_006e7d90(DAT_ffffffc0, local_8c, local_b4, (((local_88 + UNNAMED) + local_8c) + 5), (local_104 + local_b4));
        FUN_00452c14(s32(DAT_ffffff54, (local_b0 * 2 + local_b8)), (local_88 + local_8c), local_b4, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      }
      iVar1 = FUN_00407fc0((in_ECX + 0x5f8));
      local_b4 = (local_b4 + ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3));
    }
  }
  FUN_005c0073(DAT_ffffffe0);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_005674b9 (param_1, param_2, param_3, param_4)

 {
  if ((param_4 < param_2)) {
    param_2 = (param_2 + 1);
  }
  else {
    param_2 = (param_2 + -1);
  }
  FUN_005c19ad(0xa);
  FUN_005c11b2((param_1 + -1), param_2, (param_1 + -1), param_4);
  FUN_005c11b2((param_1 + 1), param_2, (param_1 + 1), param_4);
  FUN_005c19ad(0x7a);
  FUN_005c11b2(param_1, param_2, param_1, param_4);
  if ((param_1 < param_3)) {
    FUN_005c19ad(0xa);
    FUN_005c11b2((param_1 + 1), (param_4 + -1), param_3, (param_4 + -1));
    FUN_005c11b2((param_1 + 1), (param_4 + 1), param_3, (param_4 + 1));
    FUN_005c19ad(0x7a);
    FUN_005c11b2((param_1 + 1), param_4, param_3, param_4);
  }
  return;
}


 export function FUN_005675b7 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005c19ad(0xa);
  FUN_005c11b2(param_1, (param_2 + -1), s32((in_ECX + 0x5f8), 0), (param_2 + -1));
  FUN_005c11b2(param_1, (param_2 + 1), s32((in_ECX + 0x5f8), 0), (param_2 + 1));
  FUN_005c19ad(0x7a);
  FUN_005c11b2(param_1, param_2, s32((in_ECX + 0x5f8), 0), param_2);
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
  FUN_005680ba();
  FUN_005680d4();
  return;
}


 export function FUN_005680ba ()

 {
  FUN_005c64da();
  return;
}


 export function FUN_005680d4 ()

 {
  _atexit(FUN_005680f1);
  return;
}


 export function FUN_005680f1 ()

 {
  FUN_005c656b();
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
  FUN_00568125();
  FUN_0056813f();
  return;
}


 export function FUN_00568125 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_0056813f ()

 {
  _atexit(FUN_0056815c);
  return;
}


 export function FUN_0056815c ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00568176 ()

 {
  return 1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005681c9 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_128;
  let local_114;
  let local_cc;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00568369;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0046ea3b();
  FUN_005bd630();
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  _DAT_00633dac = 1;
  FUN_004aef20(DAT_ffffff34);
  FUN_0043c840(DAT_ffffff34, s_civ2\civ2art.dll_00633db0);
  iVar1 = FUN_00564713(DAT_ffffff34);
  if ((iVar1 === 0)) {
    FUN_005bd65c(0x40, 0x20);
    FUN_005c041f(0x21);
  }
  else {
    FUN_0043c3f0(DAT_ffffff34);
    local_8 = ((((local_8) >> 8) << 8) | 2);
    iVar1 = FUN_005bf5e1(0x3e7, 0xa, 0xec, DAT_006ab6a8);
    if ((iVar1 === 0)) {
      FUN_006e7dd4(0, s_Failed_to_load_civ2art.gif_00633dcc, s_NOTICE_00633dc4, 0x40);
    }
    else {
      FUN_005cedad(DAT_fffffeec, 2, 1, 1, 0x40, 0x20);
      FUN_005bd65c(0x40, 0x20);
      FUN_005cef31(DAT_fffffed8, DAT_006abae0, 0, 0);
      FUN_005cdf50();
      FUN_004083f0();
    }
    FUN_00450340();
    local_8 = 1;
    FUN_00568348();
  }
  FUN_005683a5();
  local_8 = (UNNAMED << 8);
  FUN_00568354();
  local_8 = -1;
  FUN_0056835d();
  FUN_00568373();
  return;
}


 export function FUN_00568348 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0x114);
  return;
}


 export function FUN_00568354 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0056835d ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00568373 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00568381 ()

 {
  FUN_004083f0();
  FUN_0046ee1e();
  FUN_005683b5();
  return;
}


 export function FUN_005683a5 ()

 {
  return;
}


 export function FUN_005683b5 ()

 {
  return;
}


 export function FUN_005683c5 (param_1, param_2, param_3, param_4)

 {
  let yBottom;
  let xRight;
  let iVar1;
  let uVar2;
  let uVar3;
  let pvVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let local_44;
  let local_3c;
  let local_34;
  let local_28;
  let local_18;
  let local_8;

  if ((param_2 === 0)) {
    yBottom = GetActiveView(param_1);
    xRight = GetActiveView(param_1);
    FUN_006e7d90(DAT_ffffffd8, 0, 0, xRight, yBottom);
  }
  else {
    FUN_006e7d68(DAT_ffffffd8, param_2);
  }
  iVar1 = FUN_00407f90(DAT_ffffffd8);
  uVar2 = (iVar1 / param_3 | 0);
  iVar1 = FUN_00407fc0(DAT_ffffffd8);
  uVar3 = (iVar1 / param_3 | 0);
  local_34 = uVar3 * uVar2;
  pvVar4 = FUN_006e7af0(0x40, local_34 * 8);
  local_8 = FUN_006e7ae4(pvVar4);
  if ((local_8 === 0)) {
    uVar5 = 0;
  }
  else {
    /* switch */ () {
    case 1 :
      for (/* cond: (local_3c < uVar2) */); local_3c = (local_3c < uVar2); local_3c = (local_3c + 1)) {
        for (/* cond: (local_44 < uVar3) */); local_44 = (local_44 < uVar3); local_44 = (local_44 + 1)) {
          FUN_00407ff0();
          w32((local_8 + (local_3c * uVar3 + local_44) * 8), 0, ((uVar2 - local_3c) + -1) * param_3);
          w32((local_8 + ((local_3c * uVar3 + local_44) * 8 + 4)), 0, local_44 * param_3);
        }
      }
      break;
    case 2 :
    case 5 :
      for (/* cond: (local_3c < uVar2) */); local_3c = (local_3c < uVar2); local_3c = (local_3c + 1)) {
        for (/* cond: (local_44 < uVar3) */); local_44 = (local_44 < uVar3); local_44 = (local_44 + 1)) {
          FUN_00407ff0();
          w32((local_8 + (local_3c * uVar3 + local_44) * 8), 0, local_3c * param_3);
          w32((local_8 + ((local_3c * uVar3 + local_44) * 8 + 4)), 0, local_44 * param_3);
        }
      }
      break;
    case 3 :
      for (/* cond: (local_44 < uVar3) */); local_44 = (local_44 < uVar3); local_44 = (local_44 + 1)) {
        for (/* cond: (local_3c < uVar2) */); local_3c = (local_3c < uVar2); local_3c = (local_3c + 1)) {
          FUN_00407ff0();
          w32((local_8 + (local_44 * uVar2 + local_3c) * 8), 0, local_3c * param_3);
          w32((local_8 + ((local_44 * uVar2 + local_3c) * 8 + 4)), 0, local_44 * param_3);
        }
      }
      break;
    case 4 :
      for (/* cond: (local_44 < uVar3) */); local_44 = (local_44 < uVar3); local_44 = (local_44 + 1)) {
        for (/* cond: (local_3c < uVar2) */); local_3c = (local_3c < uVar2); local_3c = (local_3c + 1)) {
          FUN_00407ff0();
          w32((local_8 + (local_44 * uVar2 + local_3c) * 8), 0, local_3c * param_3);
          w32((local_8 + ((local_44 * uVar2 + local_3c) * 8 + 4)), 0, ((uVar3 - local_44) + -1) * param_3);
        }
      }
    }
    if ((param_4 === 5)) {
      while ((local_34 !== 0)) {
        FUN_00407ff0();
        iVar6 = FUN_0059a791(0, (local_34 + -1));
        iVar7 = (s32((local_8 + iVar6 * 8), 0) + UNNAMED);
        iVar8 = (s32((local_8 + (iVar6 * 8 + 4)), 0) + UNNAMED);
        iVar1 = (param_3 + iVar8);
        if (((UNNAMED + -1) <= iVar1)) {
          iVar1 = (UNNAMED + -1);
        }
        iVar10 = (param_3 + iVar7);
        iVar9 = (UNNAMED + -1);
        if ((iVar10 <= (UNNAMED + -1))) {
          iVar9 = iVar10;
        }
        FUN_006e7d90(DAT_ffffffe8, iVar7, iVar8, iVar9, iVar1);
        FUN_00408490(DAT_ffffffe8);
        local_34 = (local_34 + -1);
        w32((local_8 + iVar6 * 8), 0, s32((local_8 + local_34 * 8), 0));
        w32((local_8 + (iVar6 * 8 + 4)), 0, s32((local_8 + (local_34 * 8 + 4)), 0));
      }
    }
    else {
      while ((local_34 !== 0)) {
        FUN_00407ff0();
        iVar1 = ((local_34 + -1) - (uVar3 * 0x14 / param_3 | 0));
        if ((iVar1 < 1)) {
          iVar1 = 0;
        }
        iVar6 = FUN_0059a791(iVar1, (local_34 + -1));
        iVar7 = (s32((local_8 + iVar6 * 8), 0) + UNNAMED);
        iVar8 = (s32((local_8 + (iVar6 * 8 + 4)), 0) + UNNAMED);
        iVar1 = (param_3 + iVar8);
        if (((UNNAMED + -1) <= iVar1)) {
          iVar1 = (UNNAMED + -1);
        }
        iVar10 = (param_3 + iVar7);
        iVar9 = (UNNAMED + -1);
        if ((iVar10 <= (UNNAMED + -1))) {
          iVar9 = iVar10;
        }
        FUN_006e7d90(DAT_ffffffe8, iVar7, iVar8, iVar9, iVar1);
        FUN_00408490(DAT_ffffffe8);
        local_34 = (local_34 + -1);
        w32((local_8 + iVar6 * 8), 0, s32((local_8 + local_34 * 8), 0));
        w32((local_8 + (iVar6 * 8 + 4)), 0, s32((local_8 + (local_34 * 8 + 4)), 0));
      }
    }
    pvVar4 = FUN_006e7b3c(local_8);
    FUN_006e7b20(pvVar4);
    pvVar4 = FUN_006e7b3c(local_8);
    FUN_006e7b40(pvVar4);
    uVar5 = 1;
  }
  return uVar5;
}


 export function FUN_00568861 (param_1)

 {
  let iVar1;

  iVar1 = FUN_004bd9f0(param_1, 5);
  if ((iVar1 !== 0)) {
    return 2;
  }
  iVar1 = FUN_004bd9f0(param_1, 0x3c);
  if ((iVar1 !== 0)) {
    return 1;
  }
  return 0;
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
  FUN_00568b1a();
  FUN_00568b34();
  return;
}


 export function FUN_00568b1a ()

 {
  FUN_0055339f();
  return;
}


 export function FUN_00568b34 ()

 {
  _atexit(FUN_00568b51);
  return;
}


 export function FUN_00568b51 ()

 {
  wv(DAT_006abc68, DAT_006abc68);
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
  FUN_00568b85();
  FUN_00568b9f();
  return;
}


 export function FUN_00568b85 ()

 {
  FUN_0043c690();
  return;
}


 export function FUN_00568b9f ()

 {
  _atexit(FUN_00568bbc);
  return;
}


 export function FUN_00568bbc ()

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
  FUN_00568bf0();
  FUN_00568c0a();
  return;
}


 export function FUN_00568bf0 ()

 {
  FUN_0043c690();
  return;
}


 export function FUN_00568c0a ()

 {
  _atexit(FUN_00568c27);
  return;
}


 export function FUN_00568c27 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00568c41 ()

 {
  wv(DAT_00633e00, 1);
  return;
}


 export function FUN_00568c58 ()

 {
  FUN_00509545();
  wv(DAT_00633e00, 0);
  FUN_0056a787();
  return;
}


 export function FUN_00568c7e ()

 {
  wv(DAT_00633e00, 1);
  FUN_00408090();
  return 0;
}


 export function FUN_00568ca2 ()

 {
  let local_14;
  let local_10;
  let local_8;

  wv(DAT_006abc38, 0);
  local_8 = 2;
  local_10 = 2;
  wv(DAT_006abc60, 0);
  wv(DAT_006abc58, DAT_006abd94);
  local_14 = (DAT_006abd98 + -40);
  wv(DAT_006abf44, 0x28);
  if ((0x12e < local_14)) {
    local_10 = 4;
    wv(DAT_006abf44, 0x50);
    local_14 = (DAT_006abd98 + -80);
  }
  if ((0xed < local_14)) {
    local_10 = 3;
    wv(DAT_006abf44, (DAT_006abf44 + (DAT_006abf44 >> 1)));
    local_14 = (local_14 + -20);
  }
  wv(DAT_006abf40, 8);
  if ((local_14 < 0xb2)) {
    if ((local_14 < 0x10)) {
      wv(DAT_006abc5c, 0);
    }
    else {
      wv(DAT_006abc5c, (local_14 + -8));
    }
  }
  else {
    wv(DAT_006abc5c, (local_14 + -8));
  }
  if ((0x128 < DAT_006abc5c)) {
    local_8 = 4;
  }
  if ((0xfe < DAT_006abc5c)) {
    local_8 = 3;
  }
  if ((local_8 !== DAT_00633df8)) {
    wv(DAT_00633df8, local_8);
    FUN_0043c6c0(0, (local_8 * 0xb >> 1), 1);
  }
  if ((local_10 !== DAT_00633df4)) {
    wv(DAT_00633df4, local_10);
    FUN_0043c6c0(0, (local_10 * 0xb >> 1), 1);
  }
  return;
}


 export function FUN_00568e86 (param_1)

 {
  let uVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006abc5c !== 0)) {
    FUN_005c0073(DAT_006abfa8);
    local_c = DAT_006abf2c;
    local_8 = DAT_006abf30;
    local_14 = (DAT_006abf2c + -8);
    local_10 = (DAT_006abf30 + -6);
    uVar1 = FUN_0043cab0(param_1);
    FUN_0040fdb0(DAT_006abc68, DAT_ffffffec, uVar1);
    FUN_00407ff0();
    FUN_00408490(DAT_ffffffec);
    FUN_005c0034();
    FUN_00407ff0();
  }
  return;
}


 export function FUN_00568f43 (param_1)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;

  if ((0 < iVar1)) {
    FUN_005baeb0(DAT_006abc68);
    FUN_005c0073(DAT_006abc18);
    uVar2 = FUN_00407fc0(DAT_006abc18, 0, 0);
    uVar2 = FUN_00407f90(DAT_006abc18, uVar2);
    FUN_005a9b5d(DAT_006abc68, DAT_00640990, DAT_006abc18, DAT_006abc1c, uVar2);
    FUN_005baee0((((-((DAT_006d1da8 === 0) === DAT_00628058)) & 0xf) + 0x1a), 0xa, 1, 0);
    FUN_005baec8(DAT_006abc50);
    iVar3 = FUN_0040efd0(DAT_00633e10);
    iVar3 = (DAT_006abc18 + iVar3);
    iVar4 = FUN_0040ef70();
    iVar1 = DAT_006abc1c;
    FUN_0040bbb0();
    FUN_0040bc10(0x1b);
    FUN_0043c8d0(DAT_00679640, iVar3, iVar1);
    FUN_0040bbb0();
    FUN_0040fe10();
    FUN_0040fea0();
    FUN_0040bc10(0x1c);
    FUN_0040fed0();
    FUN_0043c8d0(DAT_00679640, iVar3, (iVar1 + (iVar4 + -1)));
    FUN_00407ff0();
    if ((param_1 !== 0)) {
      FUN_00408490(DAT_006abc18);
      FUN_00407ff0();
    }
    FUN_005c0034();
  }
  return;
}


 export function FUN_0056911d (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  FUN_0040bbb0();
  FUN_0040bc10(0xb);
  FUN_0040fe40();
  FUN_0040fea0();
  FUN_0040ff30(param_1);
  FUN_00421d30();
  FUN_0040ff30(param_2);
  FUN_0040fed0();
  FUN_0040fe10();
  uVar1 = FUN_005b8a81(param_1, param_2);
  FUN_0040ff30(uVar1);
  uVar1 = FUN_0043c8d0(DAT_00679640, param_3, param_4);
  return uVar1;
}


 export function FUN_005691a1 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_8;

  iVar1 = s8(_MEM[DAT_006560ff + param_1 * 0x20]);
  if ((0xf < iVar1)) {
    FUN_0040bc10(0x1a);
  }
  else if ((iVar1 === 5)) {
    uVar2 = FUN_005b94d5(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
    if (((uVar2 & 0x10) === 0)) {
      FUN_0040ff00(UNK_006554b8);
    }
    else {
      FUN_0040bc10(0xa0);
    }
  }
  else {
    FUN_0040ff00(s32((DAT_00655490 + iVar1 * 8), 0));
    if ((iVar1 === 0xb)) {
      FUN_0040fe10();
      local_8 = FUN_0043cf76(((s16((DAT_00656102 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + param_1 * 0x20), 0)) << 16 >> 16));
      if ((s8(_MEM[DAT_0064f348 + local_8 * 0x58]) !== u8(DAT_006d1da0))) {
        local_8 = -1;
      }
      if ((local_8 < 0)) {
        FUN_0040fea0();
        FUN_0040ff30(((s16((DAT_00656102 + param_1 * 0x20), 0)) << 16 >> 16));
        FUN_00421d30();
        FUN_0040ff30(((s16((DAT_00656104 + param_1 * 0x20), 0)) << 16 >> 16));
        FUN_0040fed0();
      }
      else {
        FUN_0040bbe0((DAT_0064f360 + local_8 * 0x58));
      }
    }
  }
  return;
}


 export function FUN_00569363 (param_1)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let local_58;
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

  if ((param_1 !== 0)) {
    FUN_005a9780(DAT_006abc68);
    uVar2 = FUN_00407fc0(DAT_006abc28, 0, 0);
    uVar2 = FUN_00407f90(DAT_006abc28, uVar2);
    FUN_005a9b5d(DAT_006abc68, DAT_00640990, DAT_006abc28, DAT_006abc2c, uVar2);
  }
  FUN_005baeb0(DAT_006abc68);
  FUN_005baec8(DAT_006abf98);
  local_28 = FUN_00407f90(DAT_006abc28);
  if ((1 < DAT_00655b14)) {
    iVar3 = FUN_005adfa0(((DAT_00655b14) << 16 >> 16) * 3, 0, 0x64);
    local_20 = (iVar3 * local_28 / 0x64 | 0);
    if ((local_20 !== 0)) {
      FUN_005a97cc(DAT_006abc68, DAT_006abc28, ((DAT_006abc28 + local_20) + -1), DAT_006abc2c, 0x55);
      FUN_005a97cc(DAT_006abc68, DAT_006abc28, ((DAT_006abc28 + local_20) + -1), (DAT_006abc2c + 1), 0x55);
    }
  }
  local_c = FUN_0040efd0(DAT_00633e14);
  local_c = (DAT_006abc28 + local_c);
  local_8 = FUN_0040ef70();
  local_8 = (local_8 + -1);
  local_34 = DAT_006abc2c;
  local_30 = local_c;
  local_2c = (DAT_00633df4 * 4 + -8);
  FUN_005c0073(DAT_006abc28);
  FUN_005baee0(0x10, 0x21, 1, 1);
  FUN_0040bbb0();
  FUN_0043ca50(DAT_006d1da0, -1);
  FUN_0040fe10();
  FUN_0040bc10(0x1e);
  FUN_0043c8d0(DAT_00679640, local_30, local_34);
  local_30 = local_c;
  local_34 = (local_34 + local_8);
  FUN_0040bbb0();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_0043c8d0(DAT_00679640, local_30, local_34);
  local_30 = local_c;
  local_34 = (local_34 + local_8);
  FUN_0040bbb0();
  FUN_0043c8a0(s32((DAT_0064c6a2 + DAT_006d1da0 * 0x594), 0));
  FUN_0040fe10();
  FUN_0040fe10();
  FUN_0040ff30(_MEM[DAT_0064c6b4 + DAT_006d1da0 * 0x594]);
  FUN_005f22e0(DAT_00679640, DAT_00633e18);
  FUN_0040ff30((0xa - (u8(_MEM[DAT_0064c6b3 + DAT_006d1da0 * 0x594]) + u8(_MEM[DAT_0064c6b4 + DAT_006d1da0 * 0x594]))));
  FUN_005f22e0(DAT_00679640, DAT_00633e1c);
  FUN_0040ff30(_MEM[DAT_0064c6b3 + DAT_006d1da0 * 0x594]);
  local_30 = FUN_0043c8d0(DAT_00679640, local_30, local_34);
  local_24 = FUN_00472cf0(0xe, local_2c);
  local_1c = local_24;
  iVar3 = FUN_00407fc0(DAT_006abc28);
  local_18 = (((iVar3 >> 1) + DAT_006abc2c) - (local_24 >> 1));
  uVar4 = FUN_00407f90(DAT_006abc28);
  if (((uVar4 & -2) < 0xc8)) {
    local_58 = 0x64;
  }
  else {
    local_58 = FUN_00407f90(DAT_006abc28);
    local_58 = (local_58 >> 1);
  }
  local_14 = (DAT_006abc28 + local_58);
  FUN_0047df20(local_2c);
  sVar1 = s16((DAT_0064c6a8 + DAT_006d1da0 * 0x594), 0);
  local_10 = FUN_004c2788(DAT_006d1da0);
  local_10 = ((((sVar1) << 16 >> 16) << 2) / local_10 | 0);
  local_10 = FUN_005adfa0(local_10, 0, 3);
  FUN_005cef31(DAT_ffffffbc, DAT_006abc68, local_14, local_18);
  local_14 = (local_14 + (local_1c * 3 / 2 | 0));
  if ((DAT_00655b0e !== 0)) {
    local_10 = FUN_005adfa0((s8(DAT_00655b0e) >> 2), 0, 3);
    FUN_005cef31(DAT_ffffffac, DAT_006abc68, local_14, local_18);
  }
  FUN_0047df50();
  FUN_005c0034();
  if ((param_1 !== 0)) {
    FUN_00407ff0();
    FUN_00408490(DAT_006abc28);
    FUN_00407ff0();
  }
  return;
}


 export function FUN_00569801 ()

 {
  let cVar1;
  let cVar2;
  let bVar3;
  let bVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let iVar8;
  let iVar9;
  let pbVar10;
  let iVar11;
  let iVar12;
  let uVar13;
  let iVar14;
  let iVar15;
  let local_54;
  let local_50;
  let local_3c;
  let local_38;
  let local_34;
  let local_28;
  let local_14;

  FUN_00569363(0);
  if ((DAT_006abc5c !== 0)) {
    FUN_005c0073(DAT_006abfa8);
    FUN_005baec8(DAT_006abc50);
    iVar5 = FUN_0040efd0(DAT_00633e20);
    iVar5 = (DAT_006abfa8 + iVar5);
    iVar6 = FUN_0040ef70();
    iVar11 = DAT_006abfac;
    iVar6 = (iVar6 + -1);
    FUN_0040bbb0();
    FUN_0040bc10(((DAT_006d1da8 === 0) + 9));
    FUN_005baee0(0x29, 0xa, 1, 0);
    uVar7 = FUN_00407f90(DAT_006abfa8);
    FUN_0043c910(DAT_00679640, DAT_006abfa8, iVar11, uVar7);
    FUN_005baee0(0x10, 0x21, 1, 1);
    local_54 = ((iVar11 + iVar6) + (iVar6 >> 1));
    iVar11 = DAT_00633df8 * 3;
    local_3c = 0;
    if ((DAT_0064b9bc !== 0)) {
      local_3c = 1;
      local_14 = ((DAT_00655afe) << 16 >> 16);
      local_28 = ((s16((DAT_006560f0 + local_14 * 0x20), 0)) << 16 >> 16);
      local_38 = ((s16((DAT_006560f2 + local_14 * 0x20), 0)) << 16 >> 16);
      FUN_0056baff(DAT_006abc68, local_14, 4, iVar5, local_54, (iVar11 + -8), 0);
      iVar8 = (local_54 + -2);
      iVar9 = FUN_00472cf0(0x40, (iVar11 + -8));
      iVar12 = ((iVar5 + iVar9) + 2);
      iVar9 = FUN_00472cf0(0x30, (iVar11 + -8));
      local_54 = (local_54 + (iVar9 + 2));
      iVar9 = FUN_005b2a39(local_14);
      bVar4 = _MEM[DAT_006560f8 + local_14 * 0x20];
      iVar15 = ((iVar9 - u8(bVar4)) % u8(DAT_0064bcc8));
      uVar13 = u8(DAT_0064bcc8);
      FUN_0040bbb0();
      FUN_0040bc10(0xc);
      FUN_0040fe40();
      FUN_0040ff30(((iVar9 - u8(bVar4)) / uVar13 | 0));
      if ((iVar15 !== 0)) {
        FUN_0040fe10();
        FUN_0040ff30(iVar15);
        FUN_005f22e0(DAT_00679640, DAT_00633e24);
        FUN_0040ff30(DAT_0064bcc8);
      }
      if ((0 < _MEM[DAT_0064b1c3 + u8(_MEM[DAT_006560f6 + local_14 * 0x20]) * 0x14])) {
        FUN_0040fe10();
        FUN_0040fea0();
        cVar1 = _MEM[DAT_0064b1c3 + u8(_MEM[DAT_006560f6 + local_14 * 0x20]) * 0x14];
        cVar2 = _MEM[DAT_006560fd + local_14 * 0x20];
        iVar9 = FUN_005b2a39(local_14);
        FUN_0040ff30((((s8(cVar1) - s8(cVar2)) * iVar9 - u8(_MEM[DAT_006560f8 + local_14 * 0x20])) / u8(DAT_0064bcc8) | 0));
        FUN_0040fed0();
      }
      FUN_0043c8d0(DAT_00679640, iVar12, iVar8);
      iVar8 = (iVar8 + iVar6);
      FUN_0040bbb0();
      uVar7 = FUN_005b6898(local_14);
      FUN_00414d70(uVar7);
      FUN_0043c8d0(DAT_00679640, iVar12, iVar8);
      FUN_0040bbb0();
      uVar7 = FUN_00410070(s8(_MEM[DAT_006560f7 + local_14 * 0x20]));
      FUN_00414d70(uVar7);
      FUN_0043c8d0(DAT_00679640, iVar12, (iVar8 + iVar6));
      FUN_0040bbb0();
      if (((((s16((DAT_006560f4 + local_14 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
        FUN_0040bc10(0x5c);
        FUN_0040fe10();
      }
      FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_14 * 0x20]) * 0x14), 0));
      if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_14 * 0x20]) * 0x14] === 7)) {
        FUN_0040fe40();
        if ((_MEM[DAT_006560fd + local_14 * 0x20] < 0)) {
          FUN_0040bc10(0x40);
        }
        else {
          FUN_0040ff00(s32((DAT_0064b168 + s8(_MEM[DAT_006560fd + local_14 * 0x20]) * 4), 0));
        }
      }
      else if (((s16((DAT_006560f4 + local_14 * 0x20), 0) & 0x2000) !== 0)) {
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0xd);
        FUN_0040fed0();
      }
      FUN_0043c8d0(DAT_00679640, iVar5, local_54);
    }
    else {
      local_28 = ((DAT_0064b1b4) << 16 >> 16);
      local_38 = ((DAT_0064b1b0) << 16 >> 16);
      local_14 = -1;
      FUN_0056911d(local_28, local_38, iVar5, local_54);
    }
    local_54 = (local_54 + iVar6);
    iVar8 = FUN_004087c0(local_28, local_38);
    if ((iVar8 === 0)) {
      FUN_0040bbb0();
      FUN_0040fea0();
      FUN_0040bc10(0xf5);
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, iVar5, local_54);
      local_54 = (local_54 + iVar6);
    }
    else {
      bVar4 = FUN_005b89bb(local_28, local_38);
      FUN_0040bbb0();
      FUN_0040fea0();
      FUN_0040ff00(s32((DAT_00627cc4 + u8(bVar4) * 0x18), 0));
      pbVar10 = FUN_005b8931(local_28, local_38);
      if (((_MEM[pbVar10] & 0x80) !== 0)) {
        FUN_00421d30();
        FUN_0040bc10(0x12);
      }
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, iVar5, local_54);
      local_54 = (local_54 + iVar6);
      iVar8 = FUN_005b8ee1(local_28, local_38);
      if ((iVar8 !== 0)) {
        FUN_0040bbb0();
        FUN_0040fea0();
        FUN_0040ff00(s32((DAT_00627cc4 + (iVar8 * 0xb + u8(bVar4)) * 0x18), 0));
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, iVar5, local_54);
        local_54 = (local_54 + iVar6);
      }
      iVar8 = FUN_005b8ffa(local_28, local_38);
      if ((iVar8 !== 0)) {
        FUN_0040bbb0();
        FUN_0040fea0();
        FUN_0040bc10(0x1d);
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, iVar5, local_54);
        local_54 = (local_54 + iVar6);
      }
      if ((DAT_006d1da0 !== 0)) {
        pbVar10 = FUN_005b898b(local_28, local_38, DAT_006d1da0);
        bVar4 = _MEM[pbVar10];
      }
      else {
        iVar8 = FUN_005b8931(local_28, local_38);
        bVar4 = _MEM[(iVar8 + 1)];
      }
      if (((bVar4 & 0x1c) !== 0)) {
        FUN_0040bbb0();
        FUN_0040fea0();
        if (((bVar4 & 0x30) !== 0)) {
          if (((bVar4 & 0x20) === 0)) {
            FUN_0040bc10(0x14);
          }
          else {
            FUN_0040bc10(0x13);
          }
          if (((bVar4 & 0xc) !== 0)) {
            FUN_00421d30();
          }
        }
        if (((bVar4 & 0xc) !== 0)) {
          if (((bVar4 & 8) === 0)) {
            FUN_0040bc10(0x17);
          }
          else if (((bVar4 & 4) === 0)) {
            FUN_0040bc10(0x16);
          }
          else {
            FUN_0040bc10(0x15);
          }
        }
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, iVar5, local_54);
        local_54 = (local_54 + iVar6);
      }
      if (((bVar4 & 0x40) !== 0)) {
        FUN_0040bbb0();
        FUN_0040fea0();
        FUN_0040bc10((((-u8(((bVar4 & 2) === 0))) & -51) + 0x61));
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, iVar5, local_54);
        local_54 = (local_54 + iVar6);
      }
      if (((bVar4 & 0x80) !== 0)) {
        FUN_0040bbb0();
        FUN_0040fea0();
        FUN_0040bc10(0x2f);
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, iVar5, local_54);
        local_54 = (local_54 + iVar6);
      }
      local_54 = (local_54 + (iVar6 >> 1));
      if (((DAT_00655aee & 1) === 0)) {
        local_34 = 1;
      }
      else {
        local_34 = 3;
      }
      iVar8 = FUN_005b2e69(local_28, local_38);
      iVar9 = FUN_005b50ad(iVar8, 2);
      for (/* cond: (-1 < local_50) */); iVar12 = DAT_006abfb4, -1 = (-1 < local_50);
          local_50 = FUN_005b2c82(local_50)) {
        if ((local_14 !== local_50)) {
          bVar3 = 0;
          if ((DAT_00655b07 === 0)) {
            local_34 = (local_34 + -1);
          }
          iVar15 = FUN_00472cf0(0x30, (iVar11 + -8));
          if (((iVar12 - ((iVar15 + iVar6 * local_34) + 1)) <= local_54)) {
            FUN_0040bbb0();
            FUN_0040fea0();
            FUN_0040ff30((iVar9 - local_3c));
            FUN_0040fe10();
            FUN_0040bc10(0x18);
            FUN_0040fe10();
            FUN_0040bc10((((-((iVar9 - local_3c) === 1)) & 0x63) + 0x19));
            FUN_0040fed0();
            FUN_0043c8d0(DAT_00679640, iVar5, local_54);
            local_54 = (local_54 + iVar6);
            break;
          }
          local_3c = (local_3c + 1);
          FUN_0056baff(DAT_006abc68, local_50, 4, iVar5, local_54, (iVar11 + -8), 0);
          iVar12 = (local_54 + -2);
          iVar15 = FUN_00472cf0(0x40, (iVar11 + -8));
          iVar14 = ((iVar5 + iVar15) + 2);
          iVar15 = FUN_00472cf0(0x30, (iVar11 + -8));
          local_54 = (local_54 + (iVar15 + 2));
          if (bVar3) {
            FUN_0040bbb0();
            uVar7 = FUN_00410070(s8(_MEM[DAT_006560f7 + local_50 * 0x20]));
            FUN_00414d70(uVar7);
            if ((DAT_00655b07 !== 0)) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(local_50);
              if (((s16((DAT_006560f4 + local_50 * 0x20), 0) & 0x200) !== 0)) {
                FUN_0040bbe0(DAT_00633e28);
              }
              FUN_0040fed0();
            }
            FUN_0043c8d0(DAT_00679640, iVar14, iVar12);
            if (((s16((DAT_006560f4 + local_50 * 0x20), 0) & 0x2000) !== 0)) {
              FUN_0040fe10();
              FUN_0040bc10(0xd);
            }
            FUN_0040bbb0();
            if (((((s16((DAT_006560f4 + local_50 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
              FUN_0040bc10(0x5c);
              FUN_0040fe10();
            }
            FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_50 * 0x20]) * 0x14), 0));
            FUN_0043c8d0(DAT_00679640, iVar14, (iVar12 + iVar6));
            if ((DAT_00655b07 !== 0)) {
              FUN_0040bbb0();
              FUN_005691a1(local_50);
              FUN_0043c8d0(DAT_00679640, iVar14, ((iVar12 + iVar6) + iVar6));
            }
          }
          else {
            FUN_0040bbb0();
            uVar7 = FUN_005b6898(local_50);
            FUN_00414d70(uVar7);
            if ((DAT_00655b07 !== 0)) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(local_50);
              if (((s16((DAT_006560f4 + local_50 * 0x20), 0) & 0x200) !== 0)) {
                FUN_0040bbe0(DAT_00633e2c);
              }
              FUN_0040fed0();
            }
            FUN_0043c8d0(DAT_00679640, iVar14, iVar12);
            FUN_0040bbb0();
            FUN_005691a1(local_50);
            FUN_0043c8d0(DAT_00679640, iVar14, (iVar12 + iVar6));
            FUN_0040bbb0();
            FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_50 * 0x20]) * 0x14), 0));
            if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_50 * 0x20]) * 0x14] === 7)) {
              FUN_0040fe40();
              if ((_MEM[DAT_006560fd + local_50 * 0x20] < 0)) {
                FUN_0040bc10(0x40);
              }
              else {
                FUN_0040ff00(s32((DAT_0064b168 + s8(_MEM[DAT_006560fd + local_50 * 0x20]) * 4), 0));
              }
            }
            else if (((s16((DAT_006560f4 + local_50 * 0x20), 0) & 0x2000) !== 0)) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040bc10(0xd);
              FUN_0040fed0();
            }
            FUN_0043c8d0(DAT_00679640, iVar14, ((iVar12 + iVar6) + iVar6));
          }
        }
      }
    }
    wv(DAT_006abc38, local_54);
    if (((DAT_00655aee & 1) === 0)) {
      wv(DAT_00633dfc, 0);
    }
    else {
      wv(DAT_006abc18, DAT_006abfa8);
      wv(DAT_006abc20, DAT_006abfb0);
      wv(DAT_006abc24, DAT_006abfb4);
      wv(DAT_006abc1c, local_54);
      while ((iVar6 * 3 < iVar11)) {
        wv(DAT_006abc1c, (DAT_006abc1c + iVar6));
      }
      wv(DAT_00633dfc, 1);
      FUN_00568f43(0);
      wv(DAT_006abc38, DAT_006abc24);
    }
    FUN_005c0034();
  }
  return;
}


 export function FUN_0056a65e (param_1)

 {
  let uVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_00633e00 === 0)) {
    local_8 = DAT_006abc38;
    FUN_005a9780(DAT_006abc68);
    uVar1 = FUN_00407fc0(DAT_006abc28, 0, 0);
    uVar1 = FUN_00407f90(DAT_006abc28, uVar1);
    FUN_005a9b5d(DAT_006abc68, DAT_00640990, DAT_006abc28, DAT_006abc2c, uVar1);
    if ((DAT_006abc5c !== 0)) {
      uVar1 = FUN_00407fc0(DAT_006abfa8, 0, 0);
      uVar1 = FUN_00407f90(DAT_006abfa8, uVar1);
      FUN_005a9b5d(DAT_006abc68, DAT_00640990, DAT_006abfa8, DAT_006abfac, uVar1);
    }
    FUN_00568ca2();
    FUN_00569801();
    if ((param_1 !== 0)) {
      FUN_00408490(DAT_006abc28);
      local_18 = DAT_006abfa8;
      local_14 = DAT_006abfac;
      local_10 = DAT_006abfb0;
      local_c = DAT_006abc38;
      if ((DAT_006abc38 <= local_8)) {
        local_c = local_8;
      }
      FUN_00408490(DAT_ffffffe8);
    }
  }
  return;
}


 export function FUN_0056a787 ()

 {
  let uVar1;
  let iVar2;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_00628044 !== 0)) {
    FUN_00552ed2();
    FUN_00568ca2();
    FUN_005a9780(DAT_006abc68);
    FUN_004086c0(DAT_006abc28, DAT_006abc60, 0, DAT_006abc58, DAT_006abf44);
    FUN_004086c0(DAT_006abfa8, DAT_006abc60, 0, DAT_006abc58, DAT_006abc5c);
    FUN_0043c790(DAT_006abc28, DAT_006abd8c, DAT_006abd90);
    FUN_0043c790(DAT_006abfa8, DAT_006abd8c, (u8(DAT_006abf40) + DAT_006abc34));
    FUN_0056a65e(0);
    FUN_00552112();
    FUN_005c0034();
    if ((DAT_006abc5c !== 0)) {
      FUN_00408680(DAT_ffffffec, DAT_006abc28, DAT_006abc34, DAT_006abc30, DAT_006abfac);
      FUN_004bb840(DAT_ffffffec, DAT_00633588, 0);
      local_24 = local_14;
      local_20 = local_10;
      local_1c = local_c;
      local_18 = local_8;
      FUN_004bb800(DAT_ffffffdc, 0, DAT_00633588);
      uVar1 = FUN_00407fc0(DAT_ffffffdc, 0, 0);
      uVar1 = FUN_00407f90(DAT_ffffffdc, uVar1);
      FUN_005a9b5d(DAT_006abc68, DAT_00647f18, local_24, local_20, uVar1);
      local_8 = (local_10 + DAT_00633588);
      FUN_0040fdb0(DAT_006abc68, DAT_ffffffec, DAT_00633590);
      iVar2 = FUN_00407fc0(DAT_ffffffdc);
      FUN_0043c790(DAT_ffffffec, 0, (DAT_00633588 + iVar2));
      FUN_0040fdb0(DAT_006abc68, DAT_ffffffec, DAT_00633594);
    }
    FUN_00408460();
  }
  return;
}


 export function FUN_0056a98b ()

 {
  if ((DAT_0062edf8 === 0)) {
    if (((DAT_00655aee & 1) === 0)) {
      if ((DAT_006d1da8 === 1)) {
        FUN_004897fa(0);
      }
      else {
        FUN_00489a0d(1);
      }
    }
    else {
      wv(DAT_0064b9bc, 0);
    }
  }
  else {
    FUN_005013bc();
  }
  return;
}


 export function FUN_0056a9f4 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let iVar4;

  uVar1 = DAT_00655324;
  iVar2 = FUN_00407fc0(DAT_00655324);
  iVar2 = (DAT_00655328 + iVar2);
  uVar3 = FUN_00407f90(DAT_00655324);
  iVar4 = FUN_00414bb0();
  FUN_004086c0(DAT_00655334, uVar1, iVar2, uVar3, (((iVar4 - iVar2) + -1) + DAT_006335a4));
  return;
}


 export function FUN_0056aa7f ()

 {
  FUN_004080f0(DAT_00655334);
  return;
}


 export function FUN_0056aaa5 ()

 {
  FUN_004080f0(DAT_00655334);
  return;
}


 export function FUN_0056aacb ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;

  wv(DAT_00633e00, 0);
  if ((DAT_00655280 === 0)) {
    FUN_0056a9f4();
  }
  uVar9 = 0;
  uVar8 = 0;
  uVar7 = 6;
  iVar1 = FUN_00407fc0(DAT_00655334, 6, 0, 0);
  iVar1 = (iVar1 - DAT_006335a4);
  iVar2 = FUN_00407f90(DAT_00655334, iVar1);
  iVar2 = (iVar2 - DAT_006335a0);
  uVar4 = 6;
  uVar5 = DAT_00655334;
  uVar6 = DAT_00655338;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x14), 0), 6, DAT_00655334, DAT_00655338, iVar2)
  ;
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, iVar2, iVar1, uVar7, uVar8, uVar9);
  FUN_00408370(0x28, 0x4c);
  FUN_00408270(LAB_00402914);
  FUN_004082b0(LAB_00403909);
  FUN_00408230(LAB_00402671);
  FUN_00408050(1);
  FUN_00408130(LAB_00401e06);
  FUN_00408170(LAB_00401e06);
  wv(DAT_006abcc0, DAT_006abcc0);
  tie(thunk_FUN_00411f91);
  wv(DAT_006abc68, DAT_006abc68);
  FUN_004082f0(LAB_00403ada);
  FUN_00408330(LAB_00402973);
  FUN_005bb574();
  if ((DAT_00655b02 !== 1)) {
    FUN_004085f0();
  }
  return;
}


 export function FUN_0056ac46 ()

 {
  wv(DAT_00633e00, 1);
  FUN_004083b0();
  return;
}


 export function FUN_0056ac67 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (((DAT_006abf90 & 1) === 0)) {
    wv(DAT_006abf90, (DAT_006abf90 | 1));
    FUN_005bd630();
    _atexit(FUN_0056aeed);
  }
  local_14 = 0;
  local_10 = 0;
  local_c = 0;
  local_8 = 0;
  if ((((1 << (DAT_006ad578 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    FUN_005c0073(DAT_006abfa8);
    local_14 = DAT_006abf24;
    local_8 = DAT_006abf30;
    local_c = (DAT_006abf2c + -8);
    local_10 = (DAT_006abf30 + -6);
    iVar1 = FUN_00407f90(DAT_006abfa8);
    if ((iVar1 !== DAT_00633e04)) {
      wv(DAT_00633e04, FUN_00407f90(DAT_006abfa8));
      wv(DAT_00633e08, -1);
      wv(DAT_00633e0c, -1);
      FUN_005bd696(DAT_ffffffec);
      uVar2 = FUN_00407fc0(DAT_ffffffec);
      uVar2 = FUN_00407f90(DAT_ffffffec, uVar2);
      FUN_005a9afe(DAT_006abc68, DAT_006abf48, local_14, local_10, 0, 0, uVar2);
    }
    if ((DAT_00633e0c !== param_1)) {
      wv(DAT_00633e08, param_2);
      wv(DAT_006abfb8, local_14);
      wv(DAT_006abfbc, local_10);
      wv(DAT_006abfc0, local_c);
      wv(DAT_006abfc4, local_8);
      wv(DAT_00633e0c, param_1);
      uVar2 = FUN_00407fc0(DAT_ffffffec);
      uVar2 = FUN_00407f90(DAT_ffffffec, uVar2);
      FUN_005a9afe(DAT_006abf48, DAT_006abc68, 0, 0, local_14, local_10, uVar2);
      FUN_00408490(DAT_ffffffec);
      if ((-1 < param_2)) {
        iVar1 = FUN_00407f90(DAT_ffffffec);
        local_c = (local_14 + (param_1 * iVar1 / 0x64 | 0));
        FUN_0040fdb0(DAT_006abc68, DAT_ffffffec, param_2);
        FUN_00407ff0();
        FUN_00408490(DAT_ffffffec);
      }
      FUN_005c0034();
      FUN_00407ff0();
    }
  }
  return;
}


 export function FUN_0056aeed ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0056b810 (param_1)

 {
  let pcVar1;

  pcVar1 = _strrchr(param_1, 0xa);
  if ((pcVar1 !== 0)) {
    _MEM[pcVar1] = 0;
  }
  return pcVar1;
}


 export function FUN_0056b847 (param_1)

 {
  let sVar1;

  sVar1 = _strlen(param_1);
  _MEM[param_1 + sVar1] = 0xa;
  _MEM[(param_1 + sVar1) + 1] = 0;
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
  FUN_0056b8ba();
  FUN_0056b8d4();
  return;
}


 export function FUN_0056b8ba ()

 {
  FUN_0043c690();
  return;
}


 export function FUN_0056b8d4 ()

 {
  _atexit(FUN_0056b8f1);
  return;
}


 export function FUN_0056b8f1 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0056b90b (param_1)

 {
  let local_8;

  local_8 = FUN_00472cf0(0x20, param_1);
  local_8 = (local_8 / 3 | 0);
  if ((local_8 === 0xa)) {
    local_8 = 0xb;
  }
  if ((local_8 !== DAT_00633e3c)) {
    FUN_00417ef0(1, local_8);
    wv(DAT_00633e3c, local_8);
  }
  return;
}


 export function FUN_0056b96e (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_c;

  local_c = -1;
  local_1c = -1;
  if ((-1 < param_1)) {
    iVar1 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar2 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar3 = FUN_004087c0(iVar1, iVar2);
    if ((iVar3 !== 0)) {
      FUN_005b89e4(iVar1, iVar2);
    }
    for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1))
    {
      local_18 = 1;
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 0)) {
        local_18 = 2;
      }
      if ((s8(_MEM[DAT_006560f7 + param_1 * 0x20]) === u8(None))) {
        local_18 = 4;
      }
      if ((-1 < iVar3)) {
        local_18 = -1;
      }
      if ((local_1c < local_18)) {
        local_1c = local_18;
        local_c = param_1;
      }
    }
  }
  return local_c;
}


 export function FUN_0056baff (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_15c;
  let local_158;
  let local_148;
  let local_138;
  let local_128;
  let local_118;
  let local_108;
  let local_f8;
  let local_e8;
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
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = 0;
  FUN_0047df20(param_6);
  local_c8 = param_2;
  if ((local_c8 < 0));
  local_90 = u8(_MEM[DAT_006560f6 + local_c8 * 0x20]);
  local_94 = local_90;
  if ((local_d4 === 0)) {
    local_94 = 0x3e;
  }
  local_78 = FUN_0043cab0(local_d4);
  local_80 = FUN_0056e1f0(local_d4);
  local_d0 = FUN_00472cf0(s32((DAT_00642c48 + local_94 * 4), 0), param_6);
  local_d0 = (param_4 + local_d0);
  local_74 = FUN_00472cf0(s32((DAT_00642b48 + local_94 * 4), 0), param_6);
  local_74 = (param_5 + local_74);
  local_8c = FUN_00472cf0(0xc, param_6);
  local_c0 = FUN_00472cf0(0x14, param_6);
  local_1c = 1;
  if ((s32((DAT_00642c48 + local_94 * 4), 0) < 0x20)) {
    local_1c = -1;
  }
  if ((0xffff < s16((DAT_00656108 + local_c8 * 0x20), 0))) {
    iVar2 = FUN_00472cf0(4, param_6);
    local_c4 = iVar2 * local_1c;
    local_cc = 0;
    FUN_004086c0(DAT_ffffff4c, (local_c4 + local_d0), local_74, local_8c, local_c0);
    if ((local_c4 < 1)) {
      local_15c = ((~local_c4) + 1);
    }
    else {
      local_15c = local_c4;
    }
    if ((2 < local_15c)) {
      FUN_005cef31(DAT_ffffff18, param_1, ((local_1c + local_c4) + local_d0), ((local_cc + local_74) + 1));
      FUN_0043c790(DAT_ffffff4c, local_1c, 1);
      FUN_005c0479(DAT_ffffff4c, 0x106, 0xf);
      FUN_005c0479(DAT_ffffff4c, 0x105, 0xf);
      FUN_0043c790(DAT_ffffff4c, (-local_1c), -1);
    }
    FUN_005cef31(DAT_ffffff08, param_1, (local_c4 + local_d0), (local_cc + local_74));
    FUN_005c0479(DAT_ffffff4c, 0x106, local_80);
    FUN_005c0479(DAT_ffffff4c, 0x105, local_80);
  }
  FUN_004086c0(DAT_ffffff4c, local_d0, local_74, local_8c, local_c0);
  FUN_005cef31(DAT_fffffef8, param_1, (local_1c + local_d0), (local_74 + 1));
  FUN_0043c790(DAT_ffffff4c, local_1c, 1);
  FUN_005c0479(DAT_ffffff4c, 0x106, 0x10);
  FUN_005c0479(DAT_ffffff4c, 0x105, 0x10);
  FUN_0043c790(DAT_ffffff4c, (-local_1c), -1);
  FUN_005cef31(DAT_fffffee8, param_1, local_d0, local_74);
  FUN_005c0479(DAT_ffffff4c, 0x106, local_78);
  FUN_005c0479(DAT_ffffff4c, 0x105, local_80);
  uVar3 = FUN_00472cf0(2, param_6);
  FUN_004086c0(DAT_ffffff5c, local_d0, local_74, local_8c, uVar3);
  FUN_0040fdb0(param_1, DAT_ffffff5c, 0xa);
  iVar2 = FUN_00407fc0(DAT_ffffff5c);
  local_b0 = (local_b0 + iVar2);
  uVar3 = FUN_00472cf0(3, param_6);
  FUN_004086c0(DAT_ffffffec, local_d0, local_b0, local_8c, uVar3);
  iVar2 = FUN_00407fc0(DAT_ffffffec);
  local_b0 = (local_b0 + iVar2);
  uVar3 = FUN_00472cf0(2, param_6);
  FUN_004086c0(DAT_ffffff5c, local_d0, local_b0, local_8c, uVar3);
  FUN_0040fdb0(param_1, DAT_ffffff5c, 0xa);
  iVar2 = FUN_00407fc0(DAT_ffffff5c);
  local_b0 = (local_b0 + iVar2);
  local_84 = FUN_00407f90(DAT_ffffffec);
  local_88 = s8(_MEM[DAT_0064b1c6 + u8(_MEM[DAT_006560f6 + local_c8 * 0x20]) * 0x14]);
  local_b8 = u8(_MEM[DAT_006560fa + local_c8 * 0x20]);
  if ((local_88 === 0)) {
    local_88 = 0xa;
  }
  if (((DAT_00655ae8 & 0x10) === 0)) {
    local_b8 = 0;
  }
  if (((param_3 & 4) === 0)) {
    local_b8 = 0;
  }
  if ((param_6 < -3)) {
    local_b8 = 0;
  }
  local_20 = ((local_88 - local_b8) * local_84 / local_88 | 0);
  if ((local_b8 < (local_88 / 3 | 0))) {
    local_7c = 0x2a;
  }
  else if ((local_b8 < (local_88 * 2 / 3 | 0))) {
    local_7c = 0x7a;
  }
  else {
    local_7c = 0x6a;
  }
  if ((local_84 !== local_20)) {
    FUN_0040fdb0(param_1, DAT_ffffffec, 0xa);
  }
  if ((local_20 !== 0)) {
    local_a4 = local_14;
    local_a0 = local_10;
    local_98 = local_8;
    local_9c = (local_c - (local_84 - local_20));
    FUN_0040fdb0(param_1, DAT_ffffff5c, local_7c);
  }
  local_d8 = (s8(_MEM[DAT_006560ff + local_c8 * 0x20]) & 0xf);
  if ((_MEM[DAT_006560ff + local_c8 * 0x20] === 0x10)) {
    local_d8 = -1;
  }
  if ((local_d8 < 1)) {
 LAB_0056c269: :
    local_18 = 0x2d;
    if (((((s16((DAT_006560f4 + local_c8 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
      local_18 = 0x2a;
    }
  }
  else if ((local_d8 < 0xb)) {
    local_18 = _MEM[(local_d8 * 8 + 0x655494)];
  }
  else {
    if ((local_d8 !== 0xb)) {
      if ((((1 << (((local_d4) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        local_18 = 0x2d;
      }
      else {
        local_18 = UNK_006554ec;
      }
    }
    else {
      local_18 = _MEM[DAT_006560fc + local_c8 * 0x20];
    }
  }
  if ((local_18 !== 0)) {
    local_70 = local_18;
    local_70 = 0;
    iVar2 = FUN_00472cf0(3, param_6);
    local_a8 = (local_a8 - iVar2);
    iVar2 = FID_conflict:__toupper_lk(s8(local_18));
    if ((iVar2 === 0x4d)) {
      iVar2 = FUN_00472cf0(1, param_6);
      local_b0 = (local_b0 - iVar2);
      iVar2 = FUN_00472cf0(1, param_6);
      local_a8 = (local_a8 - iVar2);
    }
    FUN_0056b90b(param_6);
    FUN_005c19ad(0xa);
    if (((((s16((DAT_006560f4 + local_c8 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
      FUN_005c19ad(0x1d);
    }
    uVar3 = 0;
    iVar2 = FUN_00407fc0(DAT_ffffff4c, 0);
    iVar4 = (local_b0 + (iVar2 / 2 | 0));
    iVar2 = FUN_00407f90(DAT_ffffff4c, iVar4);
    FUN_005c0f57(DAT_006ac090, DAT_ffffff90, (local_b4 + (iVar2 / 2 | 0)), iVar4, uVar3);
  }
  local_bc = u8((_MEM[DAT_006560ff + local_c8 * 0x20] === 3));
  if ((DAT_0062804c === 0)) {
    local_bc = 1;
  }
  if ((local_bc === 0)) {
    FUN_005cef31(DAT_fffffec8, param_1, param_4, param_5);
  }
  else {
    FUN_005cf126(DAT_fffffed8, param_1, param_4, param_5, 0x1a);
  }
  if ((_MEM[DAT_006560ff + local_c8 * 0x20] === 2)) {
    FUN_005cef31(DAT_fffffeb8, param_1, param_4, param_5);
  }
  iVar2 = FUN_004087c0(((s16((DAT_006560f0 + local_c8 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_c8 * 0x20), 0)) << 16 >> 16));
  if ((param_7 === 0)) {
    FUN_005cef31(DAT_fffffea8, param_1, param_4, param_5);
  }
 LAB_0056c5e8: :
  FUN_0047df50();
  return;
}


 export function FUN_0056c5fc (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12)

 {
  param_3 = (param_3 - param_5);
  param_4 = (param_4 - param_6);
  param_7 = (param_7 - param_9);
  param_8 = (param_8 - param_10);
  if ((param_3 < 0)) {
    param_7 = (param_7 - param_3);
    param_11 = (param_11 + param_3);
    param_3 = 0;
  }
  if ((param_7 < 0)) {
    param_3 = (param_3 - param_7);
    param_11 = (param_11 + param_7);
    param_7 = 0;
  }
  if ((param_4 < 0)) {
    param_8 = (param_8 - param_4);
    param_12 = (param_12 + param_4);
    param_4 = 0;
  }
  if ((param_8 < 0)) {
    param_4 = (param_4 - param_8);
    param_12 = (param_12 + param_8);
    param_8 = 0;
  }
  if ((0 < param_12)) {
    FUN_005a9afe(param_1, param_2, (param_5 + param_3), (param_6 + param_4), (param_9 + param_7), (param_10 + param_8), param_11, param_12);
  }
  return;
}


 export function FUN_0056c705 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let aiStack_454;
  let local_434;
  let auStack_430;
  let local_410;
  let local_40c;
  let aiStack_408;
  let aiStack_3e8;
  let local_3c8;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b8;
  let auStack_3b4;
  let aiStack_394;
  let local_374;
  let aiStack_370;
  let aiStack_350;
  let local_330;
  let aiStack_32c;
  let acStack_30c;
  let local_304;
  let local_300;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let aiStack_b0;
  let local_90;
  let local_8c;
  let aiStack_88;
  let local_68;
  let local_64;
  let local_60;
  let aiStack_50;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0056d271;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8c = 0;
  `eh_vector_constructor_iterator'(DAT_fffffd00, 0x48, 8, FUN_005bd630, FUN_005bd915);
  local_8 = 0;
  local_64 = 0;
  wv(DAT_006ad908, 1);
  wv(DAT_006ad6a4, -1);
  wv(DAT_006ad6a8, -1);
  local_410 = s8(_MEM[DAT_00628350 + param_4]);
  cVar1 = _MEM[DAT_00628360 + param_4];
  local_40c = FUN_005ae052((local_410 + param_2));
  local_434 = (s8(cVar1) + param_3);
  FUN_0047ce1e(param_2, param_3, 0, DAT_006d1da0, 0);
  FUN_0047ce1e(local_40c, local_434, 0, DAT_006d1da0, 0);
  wv(DAT_00633e54, -1);
  for (/* cond: (local_90 < 8) */); local_90 = (local_90 < 8); local_90 = (local_90 + 1)) {
    _MEM[DAT_fffffcf4 + local_90] = 0;
    if ((iVar2 !== 0)) {
      _MEM[DAT_fffffcf4 + local_90] = 1;
      w32(DAT_ffffffd0, local_90, s32(DAT_0066ca90, local_90 * 0xfc));
      w32(DAT_ffffff78, local_90, s32(DAT_0066ca94, local_90 * 0xfc));
      FUN_0047a6b0(DAT_ffffff98, DAT_fffffcd0, param_2, param_3);
      FUN_0047a6b0(DAT_ffffff4c, DAT_fffffc8c, local_40c, local_434);
      local_330 = (local_330 - s32(DAT_0066cabc, local_90 * 0xfc));
      local_374 = (local_374 - s32(DAT_0066cabc, local_90 * 0xfc));
      iVar2 = local_b4;
      if ((local_68 <= local_b4)) {
        iVar2 = local_68;
      }
      w32(DAT_fffffc90, local_90, iVar2);
      iVar2 = local_374;
      if ((local_330 <= local_374)) {
        iVar2 = local_330;
      }
      w32(DAT_fffffc18, local_90, iVar2);
      iVar2 = local_b4;
      if ((local_b4 <= local_68)) {
        iVar2 = local_68;
      }
      w32(DAT_fffffc6c, local_90, ((s32((DAT_0066cab0 + local_90 * 0x3f0), 0) + iVar2) + -1));
      iVar2 = local_374;
      if ((local_374 <= local_330)) {
        iVar2 = local_330;
      }
      w32(DAT_fffffbf8, local_90, ((s32((DAT_0066cacc + local_90 * 0x3f0), 0) + iVar2) + -1));
      w32(DAT_fffffcd4, local_90, local_68);
      w32(DAT_fffffcb0, local_90, local_330);
      FUN_00408680(DAT_ffffffa0, s32(DAT_fffffc90, local_90), s32(DAT_fffffc18, local_90), (s32(DAT_fffffc6c, local_90) + 1), (s32(DAT_fffffbf8, local_90) + 1));
      uVar3 = FUN_00407f90(DAT_ffffffa0);
      w32(DAT_fffffc4c, local_90, uVar3);
      uVar3 = FUN_00407fc0(DAT_ffffffa0);
      w32(DAT_fffffbd0, local_90, uVar3);
      if ((local_8c === 0)) {
        local_8c = 1;
        local_3c8 = 0x10;
        iVar2 = FUN_0056e180(2);
        w32(DAT_ffffff50, local_90, iVar2);
        iVar2 = s32(DAT_ffffff50, local_90);
        if ((iVar2 < 2)) {
          iVar2 = 1;
        }
        w32(DAT_ffffff50, local_90, iVar2);
        if ((s32(DAT_ffffff50, local_90) === 3)) {
          w32(DAT_ffffff50, local_90, 4);
        }
        local_b8 = ((s32((DAT_0066cab4 + local_90 * 0x3f0), 0) / s32(DAT_ffffff50, local_90) | 0) + 1);
        local_3c8 = ((local_3c8 << 4) / local_b8 | 0);
        if (((u8(DAT_00655b0b) & (1 << (_MEM[DAT_006560f7 + param_1 * 0x20] & 0x1f))) !== 0)) {
          w32(DAT_ffffff50, local_90, (s32(DAT_ffffff50, local_90) << 1));
          local_b8 = ((s32((DAT_0066cab4 + local_90 * 0x3f0), 0) / s32(DAT_ffffff50, local_90) | 0) + 1);
        }
      }
      else {
        w32(DAT_ffffff50, local_90, (s32((DAT_0066cab4 + local_90 * 0x3f0), 0) / local_b8 | 0));
      }
      FUN_005bd65c(s32(DAT_fffffc4c, local_90), s32(DAT_fffffbd0, local_90));
      FUN_0056c5fc((DAT_0066c7a8 + local_90 * 0x3f0), (DAT_fffffd00 + local_90 * 0x48), s32(DAT_fffffc90, local_90), s32(DAT_fffffc18, local_90), s32(DAT_0066c8cc, local_90 * 0xfc), s32(DAT_0066c8d0, local_90 * 0xfc), 0, 0, 0, 0, s32(DAT_fffffc4c, local_90), s32(DAT_fffffbd0, local_90));
      w32(DAT_fffffbac, local_90, s32(DAT_ffffff50, local_90) * local_410);
      w32(DAT_ffffffb0, local_90, (s32(DAT_ffffff50, local_90) * s8(cVar1) / 2 | 0));
    }
  }
  if ((local_8c !== 0)) {
    local_bc = FUN_006e7f58();
    for (/* cond: (local_c0 < local_b8) */); local_c0 = (local_c0 < local_b8); local_c0 = (local_c0 + 1)) {
      for (/* cond: (local_90 < 8) */); local_90 = (local_90 < 8); local_90 = (local_90 + 1)) {
        if ((_MEM[DAT_fffffcf4 + local_90] !== 0)) {
          iVar2 = FUN_0047c3e0(param_2, param_3);
          if ((s32(DAT_0066ca94, local_90 * 0xfc) !== s32(DAT_ffffff78, local_90))) {
            _MEM[DAT_fffffcf4 + local_90] = 0;
          }
          else {
            if ((-1 < param_5)) {
              local_64 = 1;
              FUN_0046e020(param_5, param_6, 0, 0);
            }
            FUN_0056baff((DAT_0066c7a8 + local_90 * 0x3f0), param_1, 5, s32(DAT_fffffcd4, local_90), s32(DAT_fffffcb0, local_90), ((s16(DAT_0066ca8c, local_90 * 0x1f8)) << 16 >> 16), 1);
            FUN_004086c0(DAT_fffffc3c, (s32(DAT_fffffcd4, local_90) + s32(DAT_ffffff50, local_90) * -2), (s32(DAT_fffffcb0, local_90) + s32(DAT_ffffff50, local_90) * -2), (s32(DAT_ffffff50, local_90) * 4 + s32((DAT_0066cab0 + local_90 * 0x3f0), 0)), (s32(DAT_ffffff50, local_90) * 4 + s32((DAT_0066cacc + local_90 * 0x3f0), 0)));
            iVar2 = s32(DAT_fffffc90, local_90);
            if ((s32(DAT_fffffc90, local_90) <= local_3c4)) {
              iVar2 = local_3c4;
            }
            local_3c4 = iVar2;
            iVar2 = s32(DAT_fffffc18, local_90);
            if ((s32(DAT_fffffc18, local_90) <= local_3c0)) {
              iVar2 = local_3c0;
            }
            local_3c0 = iVar2;
            iVar2 = (s32(DAT_fffffc6c, local_90) + 1);
            if ((local_3bc <= (s32(DAT_fffffc6c, local_90) + 1))) {
              iVar2 = local_3bc;
            }
            local_3bc = iVar2;
            iVar2 = (s32(DAT_fffffbf8, local_90) + 1);
            if ((local_3b8 <= (s32(DAT_fffffbf8, local_90) + 1))) {
              iVar2 = local_3b8;
            }
            local_3b8 = iVar2;
            FUN_00408490(DAT_fffffc3c);
            FUN_0056c5fc((DAT_fffffd00 + local_90 * 0x48), (DAT_0066c7a8 + local_90 * 0x3f0), (s32(DAT_fffffcd4, local_90) - s32(DAT_fffffc90, local_90)), (s32(DAT_fffffcb0, local_90) - s32(DAT_fffffc18, local_90)), 0, 0, s32(DAT_fffffcd4, local_90), s32(DAT_fffffcb0, local_90), s32(DAT_0066c8cc, local_90 * 0xfc), s32(DAT_0066c8d0, local_90 * 0xfc), s32((DAT_0066cab0 + local_90 * 0x3f0), 0), s32((DAT_0066cacc + local_90 * 0x3f0), 0));
            w32(DAT_fffffcd4, local_90, (s32(DAT_fffffcd4, local_90) + s32(DAT_fffffbac, local_90)));
            w32(DAT_fffffcb0, local_90, (s32(DAT_fffffcb0, local_90) + s32(DAT_ffffffb0, local_90)));
          }
        }
      }
      if ((local_c0 < (local_b8 + -1))) {
        do {
          FUN_00407ff0();
          local_304 = FUN_006e7f58();
          if ((2 < DAT_00655b02)) {
            FUN_0047e94e(1, 0);
          }
        } while (((local_304 - local_bc) < local_3c8));
        local_bc = local_304;
      }
    }
    wv(DAT_006ad908, 0);
    local_8 = -1;
    FUN_0056d25b();
    FUN_0056d27b();
    return;
  }
  wv(DAT_006ad908, 0);
  local_8 = -1;
  FUN_0056d25b();
  FUN_0056d27b();
  return;
}


 export function FUN_0056d25b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((unaff_EBP + -0x2fc), 0x48, 8, FUN_005bd915);
  return;
}


 export function FUN_0056d27b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0056d289 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let cVar1;
  let sVar2;
  let iVar3;
  let sVar4;
  let local_8c;
  let local_7c;
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
  let local_28;
  let local_24;
  let local_20;
  let local_18;
  let local_14;
  let local_8;

  FUN_0047df20(param_6);
  local_50 = FUN_00472cf0(0x40, param_6);
  local_54 = FUN_00472cf0(0x30, param_6);
  local_5c = s8(_MEM[DAT_0064f348 + param_2 * 0x58]);
  FUN_004086c0(DAT_ffffffe8, param_4, param_5, local_50, local_54);
  FUN_005a9780(param_1);
  local_48 = FUN_0056e1f0(local_5c);
  local_40 = FUN_0043cab0(local_5c);
  iVar3 = FUN_005b8d62(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
  local_28 = u8((-1 < iVar3));
  iVar3 = FUN_0043d20a(param_2, 8);
  if ((iVar3 === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = 1;
  }
  local_3c = (u8((-1 < param_6)) + 1);
  sVar2 = s16((DAT_00655500 + ((s16((DAT_0064c6a6 + local_5c * 0x594), 0)) << 16 >> 16) * 0x30), 0);
  if ((((1 << (((local_5c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    sVar2 = s16((DAT_0064bcf8 + local_5c * 0xf2), 0);
  }
  local_58 = ((sVar2) << 16 >> 16);
  iVar3 = FUN_004bd9f0(local_5c, 0x25);
  if ((iVar3 !== 0)) {
    local_58 = 4;
  }
  iVar3 = FUN_004bd9f0(local_5c, 5);
  if ((iVar3 !== 0)) {
    local_58 = 5;
  }
  if (((param_3 & 0x1000) !== 0)) {
    cVar1 = _MEM[DAT_0064f349 + param_2 * 0x58];
  }
  else {
    cVar1 = _MEM[DAT_0064f34d + (param_2 * 0x58 + DAT_006d1da0)];
  }
  local_8 = s8(cVar1);
  if ((local_58 < 4)) {
    if ((local_8 < 4)) {
      local_4c = 0;
    }
    else if ((local_8 < 6)) {
      local_4c = 1;
    }
    else if ((local_8 < 8)) {
      local_4c = 2;
    }
    else {
      local_4c = 3;
    }
  }
  else if ((local_58 === 4)) {
    if ((local_8 < 5)) {
      local_4c = 0;
    }
    else if ((local_8 < 8)) {
      local_4c = 1;
    }
    else if ((local_8 < 0xb)) {
      local_4c = 2;
    }
    else {
      local_4c = 3;
    }
  }
  else if ((local_8 < 5)) {
    local_4c = 0;
  }
  else if ((local_8 < 0xb)) {
    local_4c = 1;
  }
  else if ((local_8 < 0x13)) {
    local_4c = 2;
  }
  else {
    local_4c = 3;
  }
  iVar3 = FUN_0043d20a(param_2, 1);
  if ((local_4c < 3)) {
    local_4c = (local_4c + 1);
  }
  FUN_005cef31(DAT_ffffff94, param_1, param_4, param_5);
  iVar3 = FUN_005b8d62(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
  if (((param_3 & 2) === 0)) {
    local_38 = FUN_00472cf0(s32((DAT_00640a18 + (local_58 * 0x20 + (local_24 * 4 + local_4c * 8))), 0), param_6);
    local_38 = (param_4 + local_38);
    local_44 = FUN_00472cf0(s32((DAT_00640ad8 + (local_58 * 0x20 + (local_24 * 4 + local_4c * 8))), 0), param_6);
    local_44 = (param_5 + local_44);
    FUN_005cef31(DAT_ffffff84, param_1, local_38, local_44);
  }
  if (((param_3 & 1) === 0)) {
    if (((_MEM[DAT_0064f344 + param_2 * 0x58] & 1) === 0)) {
      FUN_0056b90b(param_6);
      FUN_005baec8(DAT_006ac090);
      FUN_005baeb0(param_1);
      __itoa(local_8, DAT_ffffffe0, 0xa);
      local_50 = FUN_0040efd0(DAT_ffffffe0);
      local_54 = FUN_0040ef70();
      FUN_005f22d0(DAT_ffffffd0, DAT_00633e58);
      sVar4 = _strlen(DAT_ffffffe0);
      if ((1 < sVar4)) {
        FUN_005f22e0(DAT_ffffffd0, DAT_00633e5c);
      }
      local_34 = FUN_0040efd0(DAT_ffffffd0);
      local_34 = (local_34 - local_50);
      if ((local_34 < 0)) {
        local_34 = 0;
      }
      local_50 = (local_50 + (local_34 + 5));
      local_54 = (local_54 + 2);
      FUN_004086c0(DAT_ffffffe8, 0, 0, local_50, local_54);
      iVar3 = FUN_00472cf0(s32((DAT_00643a38 + (local_58 * 0x20 + (local_24 * 4 + local_4c * 8))), 0), param_6);
      iVar3 = FUN_00472cf0(s32((DAT_00643978 + (local_58 * 0x20 + (local_24 * 4 + local_4c * 8))), 0), param_6, (param_5 + iVar3));
      FUN_0043c790(DAT_ffffffe8, (param_4 + iVar3));
      FUN_0043c7c0(param_1, DAT_ffffffe8, 0xa);
      FUN_004bb800(DAT_ffffffe8, 1, 1);
      FUN_0040fdb0(param_1, DAT_ffffffe8, local_40);
      FUN_005baee0(0xa, 0xa, 1, 0);
      FUN_0043c8d0(DAT_ffffffe0, ((local_18 + (local_34 >> 1)) + 1), local_14);
    }
    else {
      FUN_005cef31(DAT_ffffff74, param_1, param_4, param_5);
      FUN_005c0479(DAT_ffffffe8, 0x106, local_40);
    }
  }
  FUN_0047df50();
  return;
}


 export function FUN_0056e180 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0056e1c0(param_1, ((s16((in_ECX + 0x2e4), 0)) << 16 >> 16));
  return;
}


 export function FUN_0056e1c0 (param_1, param_2)

 {
  let iVar1;

  iVar1 = ((param_2 + 8) * param_1 + 4);
  return ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
}


 export function FUN_0056e1f0 (param_1)

 {
  let local_8;

  if ((param_1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = ((s16((DAT_006554fe + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16);
  }
  return s32((DAT_0065535c + local_8 * 0x10), 0);
}


 export function FUN_0056e270 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  w32((in_ECX + 4), 0, 1);
  w32((in_ECX + 0x28), 0, 0);
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x54) + local_8 * 4), 0, 0);
  }
  return in_ECX;
}


 export function FUN_0056e2c9 ()

 {
  FUN_0059baf0();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0056e2e9 (in_ECX, param_1, param_2)

 {
  let pvVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_28;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0056ec77;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((param_2 === 3)) {
    FUN_0046b14d(2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    w32(in_ECX, 0, 0);
    wv(DAT_006ad57c, 0);
    FUN_005f22d0(DAT_006ad59c, DAT_00666550);
    FUN_005f22d0(DAT_006ad5bc, DAT_00666570);
    FUN_005f22d0(DAT_006ad5dc, DAT_00666570);
  }
  else {
    pvVar1 = operator_new(0x2f4);
    local_8 = 0;
    if ((pvVar1 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = FUN_0059db08(0x4000);
    }
    local_8 = -1;
    w32(in_ECX, 0, local_28);
    if ((s32(in_ECX, 0) === 0)) {
      FUN_005dae6b(7, s_pPlayerPopup_!=_NULL_00633ec4, s_D:\Ss\Franklinton\startup_player_00633e9c, 0x34);
    }
    w32(in_ECX, 0x13, PTR_DAT_00635a48);
    FUN_004aef20((in_ECX + 0xb));
    FUN_004af14b((in_ECX + 0xb), 0x28b);
    wv(PTR_DAT_00635a48, (in_ECX + 0xb));
    FUN_0040bc40(0x81801);
    FUN_0040bbb0();
    FUN_0040bc10(0x288);
    if ((param_2 === 0)) {
      FUN_005f22e0(DAT_00679640, DAT_00633edc);
      FUN_005f22e0(DAT_00679640, DAT_006665b0);
    }
    FUN_0059e6a9(DAT_00679640);
    FUN_0040bbb0();
    FUN_0040bc10(0x120);
    FUN_0059f2a3(DAT_00679640);
    FUN_0056f301();
    FUN_0059e5c9(7, 0x1b7, 0);
    FUN_0059ea99((s32(in_ECX, 1) + -1));
    FUN_005a577e();
    in_ECX = s32(in_ECX, 0);
    if ((DAT_006ad228 === 2)) {
      FUN_005d225b(s_IGZ_-_Sending_DPLSYS_CONNECTIONS_00633ee0);
      iVar2 = XD_LobbySendMessage(1);
      if ((iVar2 !== 0)) {
        FUN_005d2279(s_IGZ_-_XD_LobbySendMessage_return_00633f18, iVar2);
      }
      FUN_005d225b(s_IGZ_-_Sending_DPLSYS_DPLAYCONNEC_00633f48);
      iVar2 = XD_LobbySendMessage(3);
      if ((iVar2 !== 0)) {
        FUN_005d2279(s_IGZ_-_XD_LobbySendMessage_return_00633f7c, iVar2);
      }
    }
    while ((s32((s32(in_ECX, 0) + 0xdc), 0) !== 1)) {
      FUN_0046b14d(2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      w32((s32(in_ECX, 0) + 0x3c), 0, (s32((s32(in_ECX, 0) + 0x3c), 0) & -0x401));
      w32((s32(in_ECX, 0) + 0xd8), 0, 0);
      w32((s32(in_ECX, 0) + 0xdc), 0, s32((s32(in_ECX, 0) + 0xd8), 0));
      iVar2 = FUN_0040bc80(0);
      if ((s32((s32(in_ECX, 0) + 0xdc), 0) !== 1));
      iVar2 = FUN_0056f42b(iVar2);
      if ((iVar4 === 0)) {
        FUN_0046b14d(5, s32((DAT_006ad30c + iVar2 * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x2bf20);
        XD_ServerCloseConnection(((s32((DAT_006ad30c + iVar2 * 0x54), 0)) & 0xFFFF));
        uVar5 = FUN_0056edd3(iVar3);
        w32((s32(in_ECX, 0) + 0x220), 0, uVar5);
        FUN_0056eed7(iVar3);
        FUN_0059b96a(s32((DAT_006ad30c + iVar2 * 0x54), 0));
        FUN_0056f301();
      }
    }
    if ((iVar2 < 0)) {
      FUN_0046b14d(0xb, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      wv(PTR_DAT_00635a48, s32(in_ECX, 0x13));
      FUN_0056ee2c();
      if ((s32(in_ECX, 0) !== 0)) {
        FUN_00426f30(1);
      }
      w32(in_ECX, 0, 0);
      XD_StopConnections();
      uVar5 = 0;
      goto LAB_0056ec81;
    }
    FUN_005f22d0(DAT_006ad57c, DAT_006665b0);
    FUN_005f22d0(DAT_006ad59c, DAT_00666550);
    FUN_005f22d0(DAT_006ad5bc, DAT_00666570);
    FUN_005f22d0(DAT_006ad5dc, DAT_00666570);
    FUN_0059db65();
    wv(PTR_DAT_00635a48, s32(in_ECX, 0x13));
    FUN_0056ee2c();
    if ((s32(in_ECX, 0) !== 0)) {
      FUN_00426f30(1);
    }
    w32(in_ECX, 0, 0);
    FUN_00419b80();
  }
  if ((1 < DAT_006ad308)) {
    FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  wv(DAT_006ad640, 1);
  FUN_0046b14d(0x28, 0xff, 1, 0, 0, 0, 0, 0, 0, 0);
  FUN_005f22d0(DAT_006ad330, DAT_00666570);
  FUN_004b21d7();
  FUN_0059c276();
  FUN_0046b14d(6, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(9, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  wv(DAT_006ad304, 0);
  iVar2 = FUN_004259a6(1);
  if ((iVar2 === -1)) {
    FUN_0046b14d(0x32, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x2bf20);
    uVar5 = 0;
  }
  else {
    if ((DAT_00654fa4 === 0)) {
      FUN_00522dfa();
      wv(DAT_00655b0a, 0);
      iVar2 = FUN_0051f19c(0, 3, 0);
      if ((iVar2 !== 0)) {
        if ((1 < DAT_006ad308)) {
          FUN_0046b14d(0xb, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        XD_StopConnections();
        uVar5 = 0;
        goto LAB_0056ec81;
      }
    }
    else {
      iVar2 = FUN_00445e46(0);
      if ((iVar2 !== 0)) {
        if ((1 < DAT_006ad308)) {
          FUN_0046b14d(0xb, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        XD_StopConnections();
        uVar5 = 0;
        goto LAB_0056ec81;
      }
    }
    w32((DAT_006ad558 + s8(DAT_00655b03) * 4), 0, 0);
    wv(DAT_006ad35c, s8(DAT_00655b03));
    wv(DAT_006ad359, 1);
    wv(DAT_006ad358, 1);
    if ((1 < DAT_006ad308)) {
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      wv(DAT_00635a3c, LAB_0040266c);
      _DAT_006ad674 = FUN_00421bb0();
      iVar2 = FUN_00426fb0(s_WAITINGONJOIN_00633fac, 0x2000001, DAT_0063fc58, 0);
      if ((iVar2 === -1)) {
        FUN_0046b14d(0xb, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_StopConnections();
        uVar5 = 0;
        goto LAB_0056ec81;
      }
    }
    if ((1 < DAT_006ad308)) {
      FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if ((DAT_0062c488 === 0)) {
      uVar5 = FUN_005227e3();
      FUN_00522f8f(uVar5);
      FUN_004a73d9();
      FUN_0041a046(1);
      FUN_0041a5c4(1);
      FUN_0041a422(1);
      FUN_00419c8b();
      FUN_00408d33(param_1);
      FUN_004b21d7();
      FUN_004b0905();
      FUN_004aa9c0();
      if ((DAT_00631ee8 !== 0)) {
        FUN_004a9785((DAT_00631ee8 + -1));
      }
      if ((DAT_00628048 !== 0)) {
        wv(DAT_00655b03, DAT_00628048);
        wv(DAT_006d1da0, s8(DAT_00628048));
      }
    }
    else {
      FUN_004b21d7();
      FUN_004b0905();
    }
    FUN_004a2020();
    if ((1 < DAT_006ad308)) {
      FUN_0046b14d(0xa, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      FUN_004b0b53(0xff, 1, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
      FUN_0046b14d(0x25, 0xff, DAT_00627670, DAT_0064b998, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x16, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      XD_FlushSendBuffer(0x2bf20);
    }
    FUN_0059c276();
    wv(DAT_006ad640, 3);
    FUN_0046b14d(0x28, 0xff, 3, 0, 0, 0, 0, 0, 0, 0);
    uVar5 = 1;
  }
 LAB_0056ec81: :
  w32(unaff_FS_OFFSET, 0, local_10);
  return uVar5;
}


 export function FUN_0056ec92 ()

 {
  let local_c;
  let local_8;

  FUN_0047e94e(1, 0);
  local_8 = 0;
  for (/* cond: (local_c < 7) */); local_c = (local_c < 7); local_c = (local_c + 1)) {
    if ((s32(DAT_006ad35c, local_c * 0x15) === -1)) {
      local_8 = (local_8 + 1);
    }
  }
  if ((local_8 === 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad640, 2);
    FUN_0046b14d(0x28, 0xff, 2, 0, 0, 0, 0, 0, 0, 0);
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_0056ed62 ()

 {
  FUN_0047e94e(1, 0);
  return;
}


 export function FUN_0056ed80 ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006c90a8 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_0056edd3 (param_1)

 {
  let local_8;

  local_8 = param_1;
  if ((s32((param_1 + 0x10), 0) !== 0)) {
    local_8 = s32((param_1 + 0x10), 0);
  }
  if ((s32((param_1 + 0x14), 0) !== 0)) {
    local_8 = s32((param_1 + 0x14), 0);
  }
  return local_8;
}


 export function FUN_0056ee2c (in_ECX)

 {
  let pvVar1;
  // in_ECX promoted to parameter;
  let local_c;

  local_c = s32(in_ECX, 0xa);
  while ((local_c !== 0)) {
    pvVar1 = s32((local_c + 0x10), 0);
    operator_delete(s32((local_c + 8), 0));
    operator_delete(local_c);
    local_c = pvVar1;
  }
  w32(in_ECX, 0xa, 0);
  w32((s32(in_ECX, 0) + 0x28), 0, 0);
  w32((s32(in_ECX, 0) + 0x228), 0, 0);
  w32((s32(in_ECX, 0) + 0x220), 0, 0);
  return;
}


 export function FUN_0056eed7 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 !== 0)) {
    if ((s32((param_1 + 0x14), 0) === 0)) {
      w32((s32(in_ECX, 0) + 0x228), 0, s32((param_1 + 0x10), 0));
      w32(in_ECX, 0xa, s32((s32(in_ECX, 0) + 0x228), 0));
    }
    else {
      w32((s32((param_1 + 0x14), 0) + 0x10), 0, s32((param_1 + 0x10), 0));
    }
    if ((s32((param_1 + 0x10), 0) !== 0)) {
      w32((s32((param_1 + 0x10), 0) + 0x14), 0, s32((param_1 + 0x14), 0));
    }
    operator_delete(s32((param_1 + 8), 0));
    operator_delete(param_1);
    w32((s32(in_ECX, 0) + 0x28), 0, (s32((s32(in_ECX, 0) + 0x28), 0) + -1));
  }
  return;
}


 export function FUN_0056ef93 (in_ECX, param_1, param_2)

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
    w32(in_ECX, 0xa, puVar1);
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
  w32((s32(in_ECX, 0) + 0x228), 0, s32(in_ECX, 0xa));
  w32((s32(in_ECX, 0) + 0x210), 0, s32((s32(in_ECX, 0) + 0x228), 0));
  return puVar1;
}


 export function FUN_0056f113 ()

 {
  let iVar1;
  let local_10;
  let local_c;

  if ((DAT_006ad10c !== 0)) {
    iVar1 = s32((s32((s32(DAT_006ad10c, 0) + 0x220), 0) + 4), 0);
    FUN_0056ee2c();
    if ((DAT_006ad308 === 0)) {
      FUN_0056f301();
    }
    else {
      for (/* cond: (local_10 < 7) */); local_10 = (local_10 < 7); local_10 = (local_10 + 1)) {
        if ((_MEM[DAT_006ad359 + local_10 * 0x54] !== 0)) {
          if ((s32((DAT_006ad354 + local_10 * 0x54), 0) === 0)) {
            w32((DAT_006ad354 + local_10 * 0x54), 0, s32(DAT_006ad10c, 1));
            w32(DAT_006ad10c, 1, (s32(DAT_006ad10c, 1) + 1));
          }
          FUN_0056ef93((DAT_006ad330 + local_10 * 0x54), s32((DAT_006ad354 + local_10 * 0x54), 0));
        }
      }
      FUN_0056f301();
    }
    for (/* cond: (s32((local_c + 4), 0) !== iVar1) */); (local_c = (local_c !== 0) && (local_c = (local_c + 4)));
        local_c = s32((local_c + 0x10), 0)) {
    }
    if ((local_c === 0)) {
      for (/* cond: (s32((local_c + 4), 0) < iVar1) */);
          (local_c = (local_c + 0x10) && (local_c = (local_c + 4)));
          local_c = s32((local_c + 0x10), 0)) {
      }
      if ((local_c === 0)) {
        local_c = s32(DAT_006ad10c, 0xa);
      }
    }
    w32((s32(DAT_006ad10c, 0) + 0x228), 0, s32(DAT_006ad10c, 0xa));
    w32((s32(DAT_006ad10c, 0) + 0x210), 0, s32((s32(DAT_006ad10c, 0) + 0x228), 0));
    FUN_0059ea99(s32((local_c + 4), 0));
    FUN_005a577e();
  }
  return;
}


 export function FUN_0056f301 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x28), 0) === 0)) {
    FUN_0040bbb0();
    FUN_0040bc10(0x28c);
    uVar1 = s32((DAT_006ad10c + 4), 0);
    w32((DAT_006ad10c + 4), 0, (s32((DAT_006ad10c + 4), 0) + 1));
    FUN_0056ef93(DAT_00679640, uVar1);
    FUN_0059ea99(s32((s32((DAT_006ad10c + 0x28), 0) + 4), 0));
  }
  return;
}


 export function FUN_0056f372 (in_ECX)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  FUN_0040bbb0();
  FUN_0040bc10(0x28c);
  iVar1 = s32((in_ECX + 0x28), 0);
  if ((iVar2 === 0)) {
    return iVar1;
  }
  return 0;
}


 export function FUN_0056f3e0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (s32((local_8 + 4), 0) !== param_1) */); (local_8 = (local_8 !== 0) && (local_8 = (local_8 + 4)));
      local_8 = s32((local_8 + 0x10), 0)) {
  }
  return local_8;
}


 export function FUN_0056f42b (param_1)

 {
  let local_8;

  for (/* cond: (s32((DAT_006ad354 + local_8 * 0x54), 0) !== param_1) */); (local_8 = (local_8 < 7) && (wv(DAT_006ad354, DAT_006ad354)));
      local_8 = (local_8 + 1)) {
  }
  return local_8;
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
  FUN_0056f92a();
  FUN_0056f944();
  return;
}


 export function FUN_0056f92a ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_0056f944 ()

 {
  _atexit(FUN_0056f961);
  return;
}


 export function FUN_0056f961 ()

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
  FUN_0056f995();
  FUN_0056f9af();
  return;
}


 export function FUN_0056f995 ()

 {
  wv(DAT_006ac170, DAT_006ac170);
  return;
}


 export function FUN_0056f9af ()

 {
  _atexit(FUN_0056f9cc);
  return;
}


 export function FUN_0056f9cc ()

 {
  FUN_005cde4d();
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
  FUN_0056fa00();
  FUN_0056fa1a();
  return;
}


 export function FUN_0056fa00 ()

 {
  wv(DAT_006ac8a8, DAT_006ac8a8);
  return;
}


 export function FUN_0056fa1a ()

 {
  _atexit(FUN_0056fa37);
  return;
}


 export function FUN_0056fa37 ()

 {
  FUN_005cde4d();
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
  FUN_0056fa6b();
  FUN_0056fa85();
  return;
}


 export function FUN_0056fa6b ()

 {
  wv(DAT_006ac8e8, DAT_006ac8e8);
  return;
}


 export function FUN_0056fa85 ()

 {
  _atexit(FUN_0056faa2);
  return;
}


 export function FUN_0056faa2 ()

 {
  FUN_005cde4d();
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
  FUN_0056fad6();
  FUN_0056faf0();
  return;
}


 export function FUN_0056fad6 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_0056faf0 ()

 {
  _atexit(FUN_0056fb0d);
  return;
}


 export function FUN_0056fb0d ()

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
  FUN_0056fb41();
  FUN_0056fb5b();
  return;
}


 export function FUN_0056fb41 ()

 {
  FUN_0055339f();
  return;
}


 export function FUN_0056fb5b ()

 {
  _atexit(FUN_0056fb78);
  return;
}


 export function FUN_0056fb78 ()

 {
  wv(DAT_006ac1b0, DAT_006ac1b0);
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
  FUN_0056fbac();
  FUN_0056fbc6();
  return;
}


 export function FUN_0056fbac ()

 {
  FUN_005784a0();
  return;
}


 export function FUN_0056fbc6 ()

 {
  _atexit(FUN_0056fbe3);
  return;
}


 export function FUN_0056fbe3 ()

 {
  wv(DAT_006ac488, DAT_006ac488);
  return;
}


 export function FUN_0056fbfd (param_1, param_2, param_3)

 {
  let local_14;
  let local_c;

  param_2 = (param_2 + -1);
  param_3 = (param_3 + -1);
  for (/* cond: (local_c < 0x40) */); local_c = (local_c < 0x40); local_c = (local_c + 1)) {
    FUN_005c0c5d(((param_2 + local_c) + 1), param_3, 8);
  }
  FUN_005c0c5d(((param_2 + s32((DAT_00642c48 + param_1 * 4), 0)) + 1), param_3, 4);
  for (/* cond: (local_14 < 0x30) */); local_14 = (local_14 < 0x30); local_14 = (local_14 + 1)) {
    FUN_005c0c5d(param_2, ((local_14 + param_3) + 1), 8);
  }
  FUN_005c0c5d(param_2, ((s32((DAT_00642b48 + param_1 * 4), 0) + param_3) + 1), 4);
  return;
}


 export function FUN_0056fce4 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_580;
  let local_570;
  let local_560;
  let local_55c;
  let local_558;
  let local_554;
  let local_550;
  let local_54c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0056ffc2;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee8, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_UNITS.BMP_00634010, 0xa, 0xc0, DAT_fffffab4);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_UNITS.GIF_0063401c, 0xa, 0xc0, DAT_fffffab4);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_UNITS.GIF_00634028, 0xa, 0xc0, DAT_fffffab4);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_554 = 1;
  local_560 = 0;
  local_55c = 0;
  local_550 = 1;
  local_14 = 1;
  for (/* cond: (local_558 < 0x3f) */); local_558 = (local_558 < 0x3f); local_558 = (local_558 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_14, local_550, uVar3);
    FUN_005cef31(DAT_fffffa90, DAT_006ac0a8, local_14, local_550);
    FUN_005cef31(DAT_fffffa80, DAT_006ac0a8, local_14, local_550);
    FUN_0056fbfd(local_558, local_14, local_550);
    local_55c = (local_55c + 1);
    local_14 = (local_14 + 0x41);
    if ((8 < local_55c)) {
      local_55c = 0;
      local_560 = (local_560 + 1);
      local_550 = (local_550 + 0x31);
      local_14 = local_554;
    }
  }
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_UNITS.BMP_00634034);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_UNITS.BMP_00634040);
    if ((iVar2 !== 0));
 LAB_0056ff8c: :
  __chdir(DAT_fffffee8);
  FUN_004083f0();
  local_8 = -1;
  FUN_0056ffb6();
  FUN_0056ffcc();
  return;
}


 export function FUN_0056ffb6 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0056ffcc (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0056ffda ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_64c;
  let local_63c;
  let local_62c;
  let local_61c;
  let local_60c;
  let local_5fc;
  let local_5ec;
  let local_5dc;
  let local_5cc;
  let local_5bc;
  let local_5ac;
  let local_59c;
  let local_58c;
  let local_57c;
  let local_56c;
  let local_568;
  let local_564;
  let local_560;
  let local_55c;
  let local_558;
  let local_554;
  let local_550;
  let local_54c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00570768;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee8, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_CITIES.BMP_00634058, 0xa, 0xc0, DAT_fffffab4);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_CITIES.GIF_00634064, 0xa, 0xc0, DAT_fffffab4);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_CITIES.GIF_00634070, 0xa, 0xc0, DAT_fffffab4);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_550 = 1;
  local_554 = 0x27;
  local_558 = 0x14e;
  for (/* cond: (local_56c < 6) */); local_56c = (local_56c < 6); local_56c = (local_56c + 1)) {
    for (/* cond: (local_14 < 4) */); local_14 = (local_14 < 4); local_14 = (local_14 + 1)) {
      local_564 = local_14 * 0x41;
      uVar1 = FUN_00417f70();
      uVar3 = FUN_004bb540(uVar1);
      uVar3 = FUN_004a6980(uVar3);
      FUN_005a9abf(DAT_006ac0a8, (local_564 + local_550), local_554, uVar3);
      FUN_005cef31(DAT_fffffa84, DAT_006ac0a8, (local_564 + local_550), local_554);
      FUN_005cef31(DAT_fffffa74, DAT_006ac0a8, (local_564 + local_550), local_554);
      uVar1 = FUN_00417f70();
      uVar3 = FUN_004bb540(uVar1);
      uVar3 = FUN_004a6980(uVar3);
      FUN_005a9abf(DAT_006ac0a8, (local_564 + local_558), local_554, uVar3);
      FUN_005cef31(DAT_fffffa64, DAT_006ac0a8, (local_564 + local_558), local_554);
      FUN_005cef31(DAT_fffffa54, DAT_006ac0a8, (local_564 + local_558), local_554);
    }
    local_554 = (local_554 + 0x31);
  }
  local_550 = 1;
  local_55c = 0x1a9;
  local_560 = 0x1c0;
  for (/* cond: (local_568 < 8) */); local_568 = (local_568 < 8); local_568 = (local_568 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c, uVar3);
    FUN_005cef31(DAT_fffffa44, DAT_006ac0a8, local_550, local_55c);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_560, uVar3);
    FUN_005cef31(DAT_fffffa34, DAT_006ac0a8, local_550, local_560);
    local_550 = (local_550 + 0xf);
  }
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 0x8f, 0x1a7, uVar3);
  FUN_005cef31(DAT_fffffa24, DAT_006ac0a8, 0x8f, 0x1a7);
  FUN_005cef31(DAT_fffffa14, DAT_006ac0a8, 0x8f, 0x1a7);
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 0xd0, 0x1a7, uVar3);
  FUN_005cef31(DAT_fffffa04, DAT_006ac0a8, 0xd0, 0x1a7);
  FUN_005cef31(DAT_fffff9f4, DAT_006ac0a8, 0xd0, 0x1a7);
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 0x111, 0x1a7, uVar3);
  FUN_005cef31(DAT_fffff9e4, DAT_006ac0a8, 0x111, 0x1a7);
  FUN_005cef31(DAT_fffff9d4, DAT_006ac0a8, 0x111, 0x1a7);
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 0x152, 0x1a7, uVar3);
  FUN_005cef31(DAT_fffff9c4, DAT_006ac0a8, 0x152, 0x1a7);
  FUN_005cef31(DAT_fffff9b4, DAT_006ac0a8, 0x152, 0x1a7);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_CITIES.BMP_0063407c);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_CITIES.BMP_00634088);
    if ((iVar2 !== 0));
 LAB_00570732: :
  __chdir(DAT_fffffee8);
  FUN_004083f0();
  local_8 = -1;
  FUN_0057075c();
  FUN_00570772();
  return;
}
