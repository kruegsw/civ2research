// Block 0x00460000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 107

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408130, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408650, FUN_004086c0, FUN_004087c0, FUN_0040bbb0, FUN_0040bbe0 } from './block_00400000.js';
import { FUN_0040ef70, FUN_0040efd0, FUN_0040f380, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0 } from './block_00400000.js';
import { FUN_0040fd40, FUN_0040fd80, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, SetDlgCtrlID } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414ce0, FUN_00414d40, FUN_00414d70, FUN_00415133 } from './block_00410000.js';
import { FUN_004190d0, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421ea0, FUN_004271e8, FUN_00428a95, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043060b, FUN_0043c5f0, FUN_0043c840, FUN_0043d07a } from './block_00430000.js';
import { FUN_0044263f, FUN_004442a0, FUN_0044c730, FUN_0044ca60 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_004503d0, FUN_00450400, FUN_00451830 } from './block_00450000.js';
import { FUN_00451860, FUN_00451890, FUN_004518d0, FUN_00451930, FUN_004519b0, FUN_00451a60 } from './block_00450000.js';
import { FUN_00451ac0, FUN_00453c40, FUN_00453c80, FUN_00453e51, FUN_00456f20, FUN_00456f8b } from './block_00450000.js';
import { FUN_0045705e, FUN_00458a3b, FUN_00458df9, FUN_0045918e, FUN_0045950b, FUN_0045a535 } from './block_00450000.js';
import { FUN_0045a6ab, FUN_0045a7a8, FUN_0045ac71, FUN_0045b472, FUN_0045b4da, FUN_0045dd7f } from './block_00450000.js';
import { FUN_0045f0b1, FUN_0045fd67, FUN_0045fe19, SetHelpID } from './block_00450000.js';
import { FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_004941ee } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a2534, FUN_004a257a, FUN_004a7577 } from './block_004A0000.js';
import { FUN_004aef20, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b153c, FUN_004b18e1, FUN_004b1a15, FUN_004b1c11, FUN_004bb870, FUN_004bd9f0 } from './block_004B0000.js';
import { FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004fa4be, FUN_004fa569, FUN_004fbe84 } from './block_004F0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_0052e971, FUN_0052ec47 } from './block_00520000.js';
import { FUN_00552112, FUN_0055bbc0, FUN_0055bef9 } from './block_00550000.js';
import { FUN_00564574, FUN_00564713, FUN_0056a65e } from './block_00560000.js';
import { FUN_00589ef8 } from './block_00580000.js';
import { FUN_0059a791, FUN_0059c0e1, FUN_0059c31f, FUN_0059df8a } from './block_00590000.js';
import { FUN_005adfa0, FUN_005ae052, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b3ae0, FUN_005b50ad, FUN_005b5bab, FUN_005b6898, FUN_005b89e4, FUN_005b8a81 } from './block_005B0000.js';
import { FUN_005bb3f0, FUN_005bb574, FUN_005bcaa7, FUN_005bd65c } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c041f, FUN_005c0d69, FUN_005c0f57 } from './block_005C0000.js';
import { FUN_005c19ad, FUN_005c19d3, FUN_005c1a62, FUN_005c5f20, FUN_005c61b0, FUN_005c62ee } from './block_005C0000.js';
import { FUN_005c6480, FUN_005c64da, FUN_005c656b, FUN_005c6b63, FUN_005c6b93, FUN_005c71f3 } from './block_005C0000.js';
import { FUN_005c72f8, FUN_005c738e, FUN_005cd775, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d2279, FUN_005d22f9, FUN_005d237d, FUN_005d6038, FUN_005d61ab, FUN_005dae6b } from './block_005D0000.js';
import { FUN_005db0d0, FUN_005dba95, FUN_005dbab8, FUN_005dcc10, FUN_005dcdf9, FUN_005dce29 } from './block_005D0000.js';
import { FUN_005dce4f, FUN_005dce96, FUN_005dd010, FUN_005dd1a0, FUN_005dd27e, FUN_005dd377 } from './block_005D0000.js';
import { FUN_005dd3c2, FUN_005dd51d, FUN_005dd71e, FUN_005ddbc7, FUN_005dde9d, FUN_005ddeff } from './block_005D0000.js';
import { FUN_005de6fc, FUN_005dea9e, FUN_005deb12, ~_Timevec } from './block_005D0000.js';
import { FID_conflict:__toupper_lk, FID_conflict:_memcpy, FUN_005f22d0, FUN_005f22e0, __filbuf, __fsopen } from './block_005F0000.js';
import { _atexit, _fclose, _fputc, _fread, _fwrite, _isdigit } from './block_005F0000.js';
import { _memset, _rand, _strcmp, _strlen, _strncpy, operator_delete } from './block_005F0000.js';
import { operator_new } from './block_005F0000.js';
// Unresolved: XD_SendBroadcastData, XD_SendSecureData

const DAT_00000000 = globalThis.DAT_00000000, DAT_00000001 = globalThis.DAT_00000001, DAT_00000002 = globalThis.DAT_00000002, DAT_00000003 = globalThis.DAT_00000003, DAT_00000004 = globalThis.DAT_00000004, DAT_00627008 = globalThis.DAT_00627008;
const DAT_00627220 = globalThis.DAT_00627220, DAT_00627228 = globalThis.DAT_00627228, DAT_00627680 = globalThis.DAT_00627680, DAT_00627684 = globalThis.DAT_00627684, DAT_0062768e = globalThis.DAT_0062768e, DAT_0062768f = globalThis.DAT_0062768f;
const DAT_00627cc0 = globalThis.DAT_00627cc0, DAT_0062832c = globalThis.DAT_0062832c, DAT_00628330 = globalThis.DAT_00628330, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_0062840c = globalThis.DAT_0062840c;
const DAT_00628410 = globalThis.DAT_00628410, DAT_00628414 = globalThis.DAT_00628414, DAT_00628418 = globalThis.DAT_00628418, DAT_0062a78c = globalThis.DAT_0062a78c, DAT_0062af0c = globalThis.DAT_0062af0c, DAT_0062af44 = globalThis.DAT_0062af44;
const DAT_0062af48 = globalThis.DAT_0062af48, DAT_0062b438 = globalThis.DAT_0062b438, DAT_0062b640 = globalThis.DAT_0062b640, DAT_0062b674 = globalThis.DAT_0062b674, DAT_0062b678 = globalThis.DAT_0062b678, DAT_0062b748 = globalThis.DAT_0062b748;
const DAT_0062b74c = globalThis.DAT_0062b74c, DAT_0063cc30 = globalThis.DAT_0063cc30, DAT_006409d8 = globalThis.DAT_006409d8, DAT_00641848 = globalThis.DAT_00641848, DAT_00644e48 = globalThis.DAT_00644e48, DAT_00647748 = globalThis.DAT_00647748;
const DAT_00648018 = globalThis.DAT_00648018, DAT_0064b168 = globalThis.DAT_0064b168, DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b9a0 = globalThis.DAT_0064b9a0, DAT_0064b9c0 = globalThis.DAT_0064b9c0;
const DAT_0064ba10 = globalThis.DAT_0064ba10, DAT_0064ba28 = globalThis.DAT_0064ba28, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064bcc8 = globalThis.DAT_0064bcc8, DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c6a0 = globalThis.DAT_0064c6a0;
const DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a6 = globalThis.DAT_0064c6a6, DAT_0064c6b0 = globalThis.DAT_0064c6b0, DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6bf = globalThis.DAT_0064c6bf;
const DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1, DAT_0064c6c2 = globalThis.DAT_0064c6c2, DAT_0064c6e0 = globalThis.DAT_0064c6e0, DAT_0064c6e8 = globalThis.DAT_0064c6e8, DAT_0064c708 = globalThis.DAT_0064c708;
const DAT_0064c70e = globalThis.DAT_0064c70e, DAT_0064c832 = globalThis.DAT_0064c832, DAT_0064c8b2 = globalThis.DAT_0064c8b2, DAT_0064c932 = globalThis.DAT_0064c932, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064caa2 = globalThis.DAT_0064caa2;
const DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00654fd4 = globalThis.DAT_00654fd4;
const DAT_00654fe0 = globalThis.DAT_00654fe0, DAT_00655020 = globalThis.DAT_00655020, DAT_00655490 = globalThis.DAT_00655490, DAT_006554f8 = globalThis.DAT_006554f8, DAT_006554fc = globalThis.DAT_006554fc, DAT_00655c22 = globalThis.DAT_00655c22;
const DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f9 = globalThis.DAT_006560f9, DAT_006560ff = globalThis.DAT_006560ff;
const DAT_00656100 = globalThis.DAT_00656100, DAT_0065610a = globalThis.DAT_0065610a, DAT_00666570 = globalThis.DAT_00666570, DAT_006665b0 = globalThis.DAT_006665b0, DAT_0066be80 = globalThis.DAT_0066be80, DAT_0066be90 = globalThis.DAT_0066be90;
const DAT_0066bfd0 = globalThis.DAT_0066bfd0, DAT_0066ca84 = globalThis.DAT_0066ca84, DAT_00679640 = globalThis.DAT_00679640, DAT_0067a798 = globalThis.DAT_0067a798, DAT_0067a7a0 = globalThis.DAT_0067a7a0, DAT_0067a7a8 = globalThis.DAT_0067a7a8;
const DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ad110 = globalThis.DAT_006ad110, DAT_006ad308 = globalThis.DAT_006ad308, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad558 = globalThis.DAT_006ad558, DAT_006ad6ae = globalThis.DAT_006ad6ae;
const DAT_006ad7b2 = globalThis.DAT_006ad7b2, DAT_006d1190 = globalThis.DAT_006d1190, DAT_fffff534 = globalThis.DAT_fffff534, DAT_fffff5b4 = globalThis.DAT_fffff5b4, DAT_fffff5dc = globalThis.DAT_fffff5dc, DAT_fffff5ec = globalThis.DAT_fffff5ec;
const DAT_fffff5fc = globalThis.DAT_fffff5fc, DAT_fffff60c = globalThis.DAT_fffff60c, DAT_fffff61c = globalThis.DAT_fffff61c, DAT_fffff62c = globalThis.DAT_fffff62c, DAT_fffff63c = globalThis.DAT_fffff63c, DAT_fffff64c = globalThis.DAT_fffff64c;
const DAT_fffff65c = globalThis.DAT_fffff65c, DAT_fffff66c = globalThis.DAT_fffff66c, DAT_fffff67c = globalThis.DAT_fffff67c, DAT_fffff68c = globalThis.DAT_fffff68c, DAT_fffff69c = globalThis.DAT_fffff69c, DAT_fffff6b0 = globalThis.DAT_fffff6b0;
const DAT_fffff6c0 = globalThis.DAT_fffff6c0, DAT_fffff6d0 = globalThis.DAT_fffff6d0, DAT_fffff6e0 = globalThis.DAT_fffff6e0, DAT_fffff6f0 = globalThis.DAT_fffff6f0, DAT_fffff704 = globalThis.DAT_fffff704, DAT_fffff714 = globalThis.DAT_fffff714;
const DAT_fffff728 = globalThis.DAT_fffff728, DAT_fffff738 = globalThis.DAT_fffff738, DAT_fffff748 = globalThis.DAT_fffff748, DAT_fffff87c = globalThis.DAT_fffff87c, DAT_fffff88c = globalThis.DAT_fffff88c, DAT_fffff89c = globalThis.DAT_fffff89c;
const DAT_fffff8ac = globalThis.DAT_fffff8ac, DAT_fffff8bc = globalThis.DAT_fffff8bc, DAT_fffff8d0 = globalThis.DAT_fffff8d0, DAT_fffff8d4 = globalThis.DAT_fffff8d4, DAT_fffff938 = globalThis.DAT_fffff938, DAT_fffff948 = globalThis.DAT_fffff948;
const DAT_fffffb9c = globalThis.DAT_fffffb9c, DAT_fffffba0 = globalThis.DAT_fffffba0, DAT_fffffbb8 = globalThis.DAT_fffffbb8, DAT_fffffbca = globalThis.DAT_fffffbca, DAT_fffffbe4 = globalThis.DAT_fffffbe4, DAT_fffffbfc = globalThis.DAT_fffffbfc;
const DAT_fffffcce = globalThis.DAT_fffffcce, DAT_fffffdd4 = globalThis.DAT_fffffdd4, DAT_fffffde4 = globalThis.DAT_fffffde4, DAT_fffffee8 = globalThis.DAT_fffffee8, DAT_fffffef0 = globalThis.DAT_fffffef0, DAT_fffffef8 = globalThis.DAT_fffffef8;
const DAT_ffffff78 = globalThis.DAT_ffffff78, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffff90 = globalThis.DAT_ffffff90, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe8 = globalThis.DAT_ffffffe8;
const DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, s_(NM_POP_RETIREDIE)_00629990 = globalThis.s_(NM_POP_RETIREDIE)_00629990, s_(sock_>=_0_&&_sock_<=_MAX_NET_PL_0062a67c = globalThis.s_(sock_>=_0_&&_sock_<=_MAX_NET_PL_0062a67c, s_ACCURSEDUN_00627020 = globalThis.s_ACCURSEDUN_00627020, s_ACCURSEDWALL_00627010 = globalThis.s_ACCURSEDWALL_00627010;
const s_AIRCOMBT_0062af70 = globalThis.s_AIRCOMBT_0062af70, s_ALLYBRAG_0062725c = globalThis.s_ALLYBRAG_0062725c, s_ALLYPLEA_00627250 = globalThis.s_ALLYPLEA_00627250, s_AMBASSADORS_00627290 = globalThis.s_AMBASSADORS_00627290, s_ATTITUDEALLY_00627190 = globalThis.s_ATTITUDEALLY_00627190, s_ATTITUDEPEACE_006271a0 = globalThis.s_ATTITUDEPEACE_006271a0;
const s_ATTITUDE_006271b0 = globalThis.s_ATTITUDE_006271b0, s_BEGONE0_00626fe8 = globalThis.s_BEGONE0_00626fe8, s_BEGONE1_00626ff0 = globalThis.s_BEGONE1_00626ff0, s_CANCELALLIANCE_0062831c = globalThis.s_CANCELALLIANCE_0062831c, s_CANCELTREATY_00626fbc = globalThis.s_CANCELTREATY_00626fbc, s_CASHFORPEACE_00627128 = globalThis.s_CASHFORPEACE_00627128;
const s_CEASEEXPIRE_00627284 = globalThis.s_CEASEEXPIRE_00627284, s_CHEERS_0062b430 = globalThis.s_CHEERS_0062b430, s_CIV2\SOUND\_0062b440 = globalThis.s_CIV2\SOUND\_0062b440, s_CONTINUEWAR_006270e0 = globalThis.s_CONTINUEWAR_006270e0, s_D:\Ss\Franklinton\Grey.cpp_0062b550 = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b550, s_D:\Ss\Franklinton\Grey.cpp_0062b580 = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b580;
const s_D:\Ss\Franklinton\Grey.cpp_0062b5a4 = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b5a4, s_D:\Ss\Franklinton\Grey.cpp_0062b5d0 = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b5d0, s_D:\Ss\Franklinton\Grey.cpp_0062b5fc = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b5fc, s_D:\Ss\Franklinton\Grey.cpp_0062b624 = globalThis.s_D:\Ss\Franklinton\Grey.cpp_0062b624, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a658 = globalThis.s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a658, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a6d0 = globalThis.s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a6d0;
const s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a790 = globalThis.s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a790, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a7c4 = globalThis.s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a7c4, s_DOODYALLY_006271dc = globalThis.s_DOODYALLY_006271dc, s_DOODY_006271e8 = globalThis.s_DOODY_006271e8, s_Error_reading_bitmap_image_0062b704 = globalThis.s_Error_reading_bitmap_image_0062b704, s_Error_reading_file_header_0062b67c = globalThis.s_Error_reading_file_header_0062b67c;
const s_Error_reading_file_palette_0062b6c8 = globalThis.s_Error_reading_file_palette_0062b6c8, s_Error_reading_info_header_0062b6ac = globalThis.s_Error_reading_info_header_0062b6ac, s_Error_writing_bitmap_image_0062b7a4 = globalThis.s_Error_writing_bitmap_image_0062b7a4, s_Error_writing_file_header_0062b750 = globalThis.s_Error_writing_file_header_0062b750, s_Error_writing_file_palette_0062b788 = globalThis.s_Error_writing_file_palette_0062b788, s_Error_writing_info_header_0062b76c = globalThis.s_Error_writing_info_header_0062b76c;
const s_GIVECASH_006270c0 = globalThis.s_GIVECASH_006270c0, s_GIVECIV_006270b8 = globalThis.s_GIVECIV_006270b8, s_GRANTCEASE_00627064 = globalThis.s_GRANTCEASE_00627064, s_GROVEL_006270cc = globalThis.s_GROVEL_006270cc, s_HOWDYALLY_006271bc = globalThis.s_HOWDYALLY_006271bc, s_HOWDYPEACE_006271c8 = globalThis.s_HOWDYPEACE_006271c8;
const s_HOWDY_006271d4 = globalThis.s_HOWDY_006271d4, s_Image_not_640_x_480_x_256_color_0062b6e4 = globalThis.s_Image_not_640_x_480_x_256_color_0062b6e4, s_Incompatable_compression_mode_(B_0062b720 = globalThis.s_Incompatable_compression_mode_(B_0062b720, s_Invalid_bitmap_file_0062b698 = globalThis.s_Invalid_bitmap_file_0062b698, s_LABELS_00628428 = globalThis.s_LABELS_00628428, s_LABELS_00628430 = globalThis.s_LABELS_00628430;
const s_LABELS_00628438 = globalThis.s_LABELS_00628438, s_LABELS_00628440 = globalThis.s_LABELS_00628440, s_NOPEACE_00627138 = globalThis.s_NOPEACE_00627138, s_NOTORIOUS_00627214 = globalThis.s_NOTORIOUS_00627214, s_OUTAHEREALLY_00626fa0 = globalThis.s_OUTAHEREALLY_00626fa0, s_OUTAHERE_00626f94 = globalThis.s_OUTAHERE_00626f94;
const s_OUTAHERE_00626fb0 = globalThis.s_OUTAHERE_00626fb0, s_OVERABARREL_00626fdc = globalThis.s_OVERABARREL_00626fdc, s_OVERRULECEASE_006270a8 = globalThis.s_OVERRULECEASE_006270a8, s_OVERRULEPEACE_00627118 = globalThis.s_OVERRULEPEACE_00627118, s_PATIENCEALLY_00627268 = globalThis.s_PATIENCEALLY_00627268, s_PATIENCE_00627278 = globalThis.s_PATIENCE_00627278;
const s_PERHAPSDIDNTPROVE_00627050 = globalThis.s_PERHAPSDIDNTPROVE_00627050, s_PERHAPSSOLIDARITY_0062703c = globalThis.s_PERHAPSSOLIDARITY_0062703c, s_PLEASECITIES_00627234 = globalThis.s_PLEASECITIES_00627234, s_PLEASECITY_00627244 = globalThis.s_PLEASECITY_00627244, s_PROPOSEALLIANCE_0062702c = globalThis.s_PROPOSEALLIANCE_0062702c, s_PROPOSECEASE_0062707c = globalThis.s_PROPOSECEASE_0062707c;
const s_PROPOSEPEACE_006270ec = globalThis.s_PROPOSEPEACE_006270ec, s_PROVOKE_00626ff8 = globalThis.s_PROVOKE_00626ff8, s_Popup_Type:_%s_0062a754 = globalThis.s_Popup_Type:_%s_0062a754, s_REJECT0_00627000 = globalThis.s_REJECT0_00627000, s_SCHISM_0062729c = globalThis.s_SCHISM_0062729c, s_SENATECEASE_00627184 = globalThis.s_SENATECEASE_00627184;
const s_SENATEPEACE_00627178 = globalThis.s_SENATEPEACE_00627178, s_SMALL_0062722c = globalThis.s_SMALL_0062722c, s_SendToConnections:_FAILED_on_sen_0062a704 = globalThis.s_SendToConnections:_FAILED_on_sen_0062a704, s_SendToEveryone:_FAILED._Return_V_0062a764 = globalThis.s_SendToEveryone:_FAILED._Return_V_0062a764, s_TAKECIV_00626fd4 = globalThis.s_TAKECIV_00626fd4, s_TRIBUTE_00626fcc = globalThis.s_TRIBUTE_00626fcc;
const s_UNOVERCEASE_0062709c = globalThis.s_UNOVERCEASE_0062709c, s_UNOVERCEASE_0062716c = globalThis.s_UNOVERCEASE_0062716c, s_UNOVERPEACE_0062710c = globalThis.s_UNOVERPEACE_0062710c, s_UNOVERPEACE_00627150 = globalThis.s_UNOVERPEACE_00627150, s_VFWNOTREGISTERED_0062af4c = globalThis.s_VFWNOTREGISTERED_0062af4c, s_WALLCEASE_00627070 = globalThis.s_WALLCEASE_00627070;
const s_WALLOVERCEASE_0062708c = globalThis.s_WALLOVERCEASE_0062708c, s_WALLOVERCEASE_0062715c = globalThis.s_WALLOVERCEASE_0062715c, s_WALLOVERPEACE_006270fc = globalThis.s_WALLOVERPEACE_006270fc, s_WALLOVERPEACE_00627140 = globalThis.s_WALLOVERPEACE_00627140, s_WELCOMEALLY_006271f0 = globalThis.s_WELCOMEALLY_006271f0, s_WELCOMEPEACE_006271fc = globalThis.s_WELCOMEPEACE_006271fc;
const s_WELCOME_0062720c = globalThis.s_WELCOME_0062720c, s_WORTHLESS_006270d4 = globalThis.s_WORTHLESS_006270d4, s_[ERROR:LABELS.TXT]_00628448 = globalThis.s_[ERROR:LABELS.TXT]_00628448, s_\SOUND\_0062b44c = globalThis.s_\SOUND\_0062b44c, s_address_!=_NULL_0062a7b4 = globalThis.s_address_!=_NULL_0062a7b4, s_address_0062a7e8 = globalThis.s_address_0062a7e8;
const s_civ2\civ2art.dll_0062af18 = globalThis.s_civ2\civ2art.dll_0062af18, s_civ2\video\opening.avi_0062af2c = globalThis.s_civ2\video\opening.avi_0062af2c, s_hLocPal_0062b59c = globalThis.s_hLocPal_0062b59c, s_handle_colors_0062b5ec = globalThis.s_handle_colors_0062b5ec, s_handle_fullcolors_0062b56c = globalThis.s_handle_fullcolors_0062b56c, s_handle_grey_0062b618 = globalThis.s_handle_grey_0062b618;
const s_handle_palette_0062b5c0 = globalThis.s_handle_palette_0062b5c0, s_pMsg->size_>_0_0062a6f4 = globalThis.s_pMsg->size_>_0_0062a6f4;


 export function FUN_00460104 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0046011a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00460129 (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let bVar7;
  let bVar8;
  let bVar9;
  let bVar10;
  let bVar11;
  let uVar12;
  let iVar13;
  let uVar14;
  let uVar15;
  let uVar16;
  let bVar17;
  let local_7c;
  let local_78;
  let local_70;
  let local_6c;
  let local_60;
  let local_5c;
  let local_50;
  let local_4c;
  let local_44;
  let local_38;
  let local_34;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  bVar6 = 0;
  bVar9 = 0;
  bVar5 = 0;
  bVar3 = 0;
  bVar8 = 0;
  bVar10 = 0;
  local_34 = 0;
  bVar4 = 0;
  bVar7 = 0;
  bVar11 = 0;
  _DAT_00626a28 = 1;
  if ((iVar13 === 0)) {
    _DAT_00626a28 = 0;
    return;
  }
  wv(DAT_0064b120, param_1);
  wv(DAT_0064b110, param_2);
  wv(DAT_0064b0f0, 0);
  if ((param_5 === 0)) {
    _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
  }
  wv(DAT_00626a1c, 0);
  wv(DAT_00626a20, 1);
  FUN_0045705e(param_1, param_2);
  wv(DAT_00626a1c, 1);
  wv(DAT_00626a20, 0);
  wv(DAT_0064b138, u8(((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 2) !== 0)));
  bVar17 = ((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 1) === 0);
  if ((param_5 === 0)) {
    w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
    FUN_00467750(param_2, param_1, 0x40002);
  }
  else {
    if ((_MEM[DAT_0064c6bf + param_2 * 0x594] < 0)) {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
    }
    if (((_MEM[DAT_0064c6c1 + (param_2 * 4 + param_1 * 0x594)] & 8) !== 0)) {
      uVar12 = FUN_00456f8b(param_1, param_2);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = uVar12;
    }
    if (((_MEM[DAT_0064c6c2 + (param_2 * 4 + param_1 * 0x594)] & 1) === 0)) {
      if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
        FUN_00467825(param_2, param_1, 0x200000);
      }
    }
    else {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
      FUN_00467750(param_2, param_1, 0x200000);
    }
  }
  wv(DAT_00626a34, u8((param_5 !== 0)));
  if ((param_5 !== 0)) {
    if (((_MEM[DAT_0064c6c2 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
      if ((DAT_00626a30 === 0)) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_004941ee(4);
      FUN_00421ea0(s_OUTAHERE_00626f94);
      bVar9 = 1;
      goto LAB_00463d3b;
    }
    cVar1 = _MEM[DAT_0064c6bf + param_2 * 0x594];
    iVar13 = FUN_00456f8b(param_1, param_2);
    if (((_MEM[DAT_0064c6c2 + (param_2 * 4 + param_1 * 0x594)] & 0x80) !== 0)) {
      if ((DAT_00626a30 === 0)) {
        FUN_00458a3b(param_1, param_2);
      }
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
        FUN_004941ee(4);
        FUN_00421ea0(s_OUTAHERE_00626fb0);
      }
      else {
        FUN_004941ee(3);
        FUN_00410030(s_OUTAHEREALLY_00626fa0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      }
      bVar9 = 1;
      goto LAB_00463d3b;
    }
    FUN_00458df9(param_1, param_2, param_3, param_4);
  }
  FUN_00467825(param_1, param_2, 0x800000);
  bVar11 = 1;
  local_34 = u8(((_MEM[DAT_0064c6c2 + (param_1 * 4 + param_2 * 0x594)] & 0x40) !== 0));
  FUN_00467750(param_2, param_1, 0x400000);
  if (((((DAT_0064bc60) << 16 >> 16) & 0x8000) !== 0)) {
    if ((param_1 === 3)) {
      wv(DAT_0064b104, 0);
      wv(DAT_0064b124, -1);
      wv(DAT_0064b118, 0);
      local_34 = 0;
    }
    if ((param_1 === 3)) {
      wv(DAT_0064b124, -1);
      wv(DAT_0064b104, 0);
      local_34 = 0;
    }
  }
  FUN_0045950b(param_1, param_2, param_3, param_4, 1, 0);
  if ((2 < DAT_0064b0ec));
  if ((((1 << (((DAT_0064b104) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    wv(DAT_0064b104, -1);
  }
  if ((DAT_0064b12c !== 0)) {
    wv(DAT_0064b104, -1);
  }
  if ((iVar13 !== 0)) {
    local_38 = 2;
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 4) !== 0)) {
      local_38 = 1;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 8) !== 0)) {
      local_38 = 0;
    }
    uVar15 = FUN_00493c7d(DAT_0064b104);
    FUN_0040ff60(1, uVar15);
    if ((DAT_0064b0f8 === 0)) {
      local_14 = 0x6d;
    }
    else {
      local_14 = 0x6c;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      local_14 = 0x6e;
    }
    FUN_004271e8(2, s32((DAT_00628420 + local_14 * 4), 0));
    FUN_0040bbb0();
    FUN_0040bbe0(s_CANCELTREATY_00626fbc);
    FUN_0040ff30(local_38);
    iVar13 = FUN_00421ea0(DAT_00679640);
    if ((iVar13 === 0)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
        FUN_00456f20(param_2, param_1, 5);
      }
      else {
        if ((DAT_0064b148 !== 0)) {
          FUN_00456f20(param_2, param_1, 0x14);
        }
        bVar3 = 1;
      }
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
    }
    else {
      FUN_0045ac71(param_1, DAT_0064b104, param_2);
      bVar6 = 1;
      wv(DAT_0064b0f8, 0);
      wv(DAT_0064b0fc, -1);
      wv(DAT_0064b104, -1);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
        uVar14 = _rand();
        uVar16 = (uVar14 >> 0x1f);
        if ((DAT_0064b138 !== 0)) {
          FUN_00467825(param_2, param_1, 2);
        }
      }
      else {
        wv(DAT_0064b118, 0);
        bVar5 = 1;
      }
    }
    FUN_00458a3b(param_1, param_2);
  }
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) !== 0)) {
    if ((!bVar5)) {
      bVar3 = 1;
    }
    if ((-1 < DAT_0064b124)) {
      if ((_MEM[DAT_00655c22 + param_2] < _MEM[DAT_00655c22 + param_1])) {
        if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < s32((DAT_0064c6a2 + param_2 * 0x594), 0))) {
          wv(DAT_0064b118, 0);
        }
      }
      else if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < s32((DAT_0064c6a2 + param_2 * 0x594), 0))) {
        wv(DAT_0064b118, 0);
      }
    }
    if ((DAT_0064b12c !== 0)) {
      bVar3 = 1;
      wv(DAT_0064b118, 0);
    }
    if ((param_1 === 7)) {
      wv(DAT_0064b118, 0);
      wv(DAT_0064b124, -1);
      bVar3 = 1;
    }
  }
  iVar13 = FUN_004bd9f0(param_1, 0x35);
  if ((iVar13 === 0)) {
    iVar13 = FUN_004bd9f0(param_1, 0x11);
    if ((iVar13 === 0)) {
      iVar13 = FUN_004bd9f0(param_1, 0x23);
      if ((iVar13 === 0)) {
        bVar4 = 1;
      }
    }
    else {
      iVar13 = FUN_004bd9f0(param_2, 0x11);
      if ((iVar13 === 0)) {
        bVar4 = 1;
      }
    }
  }
  else {
    iVar13 = FUN_004bd9f0(param_2, 0x35);
    if ((iVar13 === 0)) {
      bVar4 = 1;
    }
  }
  if ((iVar13 !== 0)) {
    bVar4 = 0;
  }
  if ((iVar13 !== 0)) {
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      iVar13 = (s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 2 | 0);
      if ((iVar13 < 0x65)) {
        iVar13 = 0x64;
      }
      if ((iVar13 <= DAT_0064b118)) {
        wv(DAT_0064b118, iVar13);
      }
    }
    uVar15 = FUN_00493b10(param_2);
    FUN_0040ff60(1, uVar15);
    uVar15 = FUN_00493ba6(param_2);
    FUN_0040ff60(2, uVar15);
    uVar15 = FUN_00410070(param_2);
    FUN_0040ff60(3, uVar15);
    FUN_004271e8(4, s32(((DAT_00628420 + 0x1a8) + u8((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30] === 0)) * -4), 0));
    FUN_00421da0(0, DAT_0064b118);
    FUN_0040bbb0();
    FUN_004941ee(4);
    FUN_0040bbe0(s_TRIBUTE_00626fcc);
    local_14 = FUN_0059a791(0, 3);
    if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
      local_14 = 2;
    }
    if ((DAT_00655b44 === 0)) {
      local_14 = 1;
    }
    if (bVar4) {
      local_14 = 8;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      local_14 = 9;
    }
    FUN_0040ff30(local_14);
    if ((local_14 === 9)) {
      local_70 = FUN_00410030(DAT_00679640, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    }
    else {
      local_70 = FUN_00421ea0(DAT_00679640);
    }
    if ((local_70 === 1)) {
      w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - DAT_0064b118));
      w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + DAT_0064b118));
      wv(DAT_0064b0f8, 0);
      bVar5 = 1;
      FUN_0056a65e(1);
      if ((_MEM[DAT_0064c6bf + param_2 * 0x594] !== 0)) {
        _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      }
      iVar13 = FUN_0045b472(DAT_0064b118);
      FUN_00456f20(param_2, param_1, (-iVar13));
      FUN_00458a3b(param_1, param_2);
      if ((DAT_0064b138 !== 0)) {
        FUN_00467825(param_2, param_1, 2);
      }
    }
    wv(DAT_0064b118, 0x3e7);
  }
  if ((3 < iVar13)) {
    bVar3 = 1;
  }
  if ((iVar13 !== 0)) {
    FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
    uVar15 = FUN_00493b10(param_2);
    FUN_0040ff60(3, uVar15);
    uVar15 = FUN_00493ba6(param_2);
    FUN_0040ff60(2, uVar15);
    FUN_004271e8(4, s32(((DAT_00628420 + 0x1a8) + u8((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30] === 0)) * -4), 0));
    FUN_0040bbb0();
    FUN_0040bbe0(s_TAKECIV_00626fd4);
    local_14 = FUN_0059a791(0, 2);
    if ((local_14 < 2)) {
      local_14 = 8;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      local_14 = 9;
    }
    FUN_0040ff30(local_14);
    if ((local_14 === 9)) {
      local_70 = FUN_00410030(DAT_00679640, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    }
    else {
      local_70 = FUN_00421ea0(DAT_00679640);
    }
    if ((local_70 === 1)) {
      FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
      iVar13 = FUN_004bdb2c(param_2, DAT_0064b124);
      FUN_00456f20(param_2, param_1, (-(iVar13 * 3 / 2 | 0)));
      iVar13 = DAT_0064b10c;
      wv(DAT_0064b124, DAT_0064b10c);
      wv(DAT_0064b10c, -1);
      if ((iVar13 < 0)) {
        bVar5 = 1;
      }
      else {
        FUN_004271e8(1, s32((DAT_00627684 + iVar13 * 0x10), 0));
        FUN_004941ee(4);
        iVar13 = FUN_00421ea0(s_OVERABARREL_00626fdc);
        if ((iVar13 === 1)) {
          FUN_004bf05b(param_2, DAT_0064b10c, param_1, 0, 0);
          iVar13 = FUN_004bdb2c(param_2, DAT_0064b10c);
          FUN_00456f20(param_2, param_1, (-(iVar13 * 3 / 2 | 0)));
          wv(DAT_0064b124, -1);
          bVar5 = 1;
        }
      }
      if (bVar5) {
        wv(DAT_0064b0f8, 0);
        if ((DAT_0064b138 !== 0)) {
          FUN_00467825(param_2, param_1, 2);
        }
        if ((_MEM[DAT_0064c6bf + param_2 * 0x594] !== 0)) {
          _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
        }
      }
    }
    else if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      FUN_00456f20(param_2, param_1, ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) + 2) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])));
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
    }
    FUN_00458a3b(param_1, param_2);
    wv(DAT_0064b118, 0x3e7);
  }
  if ((!bVar5)) {
    FUN_00458df9(param_1, param_2, param_3, param_4);
    if ((DAT_00626a30 === 0)) {
      FUN_00458a3b(param_1, param_2);
    }
    FUN_004941ee(4);
    if ((DAT_0064b118 === 0x3e7)) {
      FUN_00410030(s_BEGONE0_00626fe8, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    }
    else {
      FUN_00410030(s_BEGONE1_00626ff0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    }
    FUN_00467ef2(param_2, param_1);
    w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
    if ((3 < DAT_00655b08)) {
      wv(DAT_0064b0e8, 1);
    }
    goto LAB_00463d3b;
  }
  if ((DAT_0064b0f8 === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = 1;
  }
  if ((local_34 !== 0)) {
    wv(DAT_0064b0f8, 0);
  }
  if ((iVar13 === 0)) {
    uVar14 = _rand();
    uVar16 = (uVar14 >> 0x1f);
    if ((u8(_MEM[DAT_0064c6b5 + param_2 * 0x594]) < (6 - (((((uVar14 ^ uVar16) - uVar16) & 1) ^ uVar16) - uVar16)))) {
      wv(DAT_0064b0f8, 1);
    }
  }
  if (((_MEM[DAT_0064c6c2 + (param_1 * 4 + param_2 * 0x594)] & 1) === 0)) {
    FUN_00458df9(param_1, param_2, param_3, param_4);
    if ((DAT_00626a30 === 0)) {
      FUN_00458a3b(param_1, param_2);
    }
    FUN_0040bbb0();
    FUN_004941ee(4);
    FUN_0040bbe0(s_PROVOKE_00626ff8);
    uVar15 = FUN_0059a791(0, 2);
    FUN_0040ff30(uVar15);
    FUN_00467825(param_2, param_1, 0x2000);
    iVar13 = FUN_00467904(param_2, param_1);
    if ((iVar13 < 0x4b)) {
      FUN_00467933(param_2, param_1, 0x4b);
    }
    FUN_00410030(DAT_00679640, DAT_00644e48, 0);
    w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
    goto LAB_00463d3b;
  }
  if ((DAT_0064b118 === 0x3e7)) {
    if ((DAT_00626a30 === 0)) {
      FUN_00458a3b(param_1, param_2);
    }
    FUN_004941ee(4);
    FUN_00467825(param_2, param_1, 0x2000);
    iVar13 = FUN_00467904(param_2, param_1);
    if ((iVar13 < 0x4b)) {
      FUN_00467933(param_2, param_1, 0x4b);
    }
    FUN_00410030(s_REJECT0_00627000, DAT_00644e48, 0);
    w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
    goto LAB_00463d3b;
  }
  if ((param_5 !== 0)) {
    FUN_00458df9(param_1, param_2, param_3, param_4);
    if ((DAT_00626a30 === 0)) {
      FUN_00458a3b(param_1, param_2);
    }
    FUN_004941ee(4);
    FUN_00467825(param_2, param_1, 0x2000);
    iVar13 = FUN_00467904(param_2, param_1);
    if ((iVar13 < 0x4b)) {
      FUN_00467933(param_2, param_1, 0x4b);
    }
    FUN_00410030(DAT_00627008, DAT_00644e48, 0);
    w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
    goto LAB_00463d3b;
  }
  if ((DAT_0064b0f8 !== 0)) {
    FUN_004941ee(4);
    iVar13 = FUN_00453e51(param_1, 6);
    if ((iVar13 === 0)) {
      FUN_00421ea0(s_ACCURSEDUN_00627020);
    }
    else {
      FUN_00421ea0(s_ACCURSEDWALL_00627010);
    }
  }
  if ((DAT_0064b11c === 0)) {
    local_44 = 0;
    for (/* cond: (local_6c < 8) */); local_6c = (local_6c < 8); local_6c = (local_6c + 1)) {
      if (((_MEM[DAT_0064c6c0 + (local_6c * 4 + param_1 * 0x594)] & 8) !== 0)) {
        local_44 = (local_44 + 1);
      }
    }
    if ((_MEM[DAT_00655c22 + param_2] < 6)) {
      bVar3 = 1;
    }
    else {
      bVar3 = 0;
    }
    if ((0xc8 < DAT_00655af8)) {
      bVar2 = 8;
      for (/* cond: (local_6c < 8) */); local_6c = (local_6c < 8); local_6c = (local_6c + 1)) {
        if (((s32((DAT_0064c6c0 + (local_6c * 4 + param_2 * 0x594)), 0) & 0x2008) === 0)) {
          wv(DAT_0064b104, local_6c);
          bVar2 = _MEM[DAT_00655c22 + local_6c];
        }
      }
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 0xe) === 0)) {
      bVar4 = 0;
    }
    else {
      bVar4 = 1;
    }
    if ((iVar13 === 0)) {
      bVar3 = 1;
      if ((-1 < DAT_0064b104)) {
        bVar3 = 0;
        uVar15 = FUN_00493c7d(DAT_0064b104);
        FUN_0040ff60(4, uVar15);
        FUN_004941ee(3);
        iVar13 = FUN_00421ea0(s_PERHAPSSOLIDARITY_0062703c);
        if ((iVar13 === 1)) {
          FUN_0045ac71(param_1, DAT_0064b104, param_2);
          w32((DAT_0064c6c0 + (DAT_0064b104 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (DAT_0064b104 * 4 + param_2 * 0x594)), 0) | 0x80800));
          wv(DAT_0064b104, -1);
          bVar3 = 1;
        }
        else {
          FUN_00456f20(param_2, param_1, 0xa);
          FUN_00458a3b(param_1, param_2);
          if ((0x19 < DAT_0064b114)) {
            bVar3 = 0;
            FUN_004941ee(4);
            FUN_00421ea0(s_PERHAPSDIDNTPROVE_00627050);
          }
        }
      }
      if (bVar3) {
        FUN_0045a535(param_1, param_2);
        FUN_00458a3b(param_1, param_2);
      }
      bVar8 = 1;
    }
  }
  if ((iVar13 !== 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar15);
    if (bVar5) {
      local_70 = FUN_00410030(s_GRANTCEASE_00627064, DAT_00647748, 0);
    }
    else if ((local_34 === 0)) {
      uVar15 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar15);
      local_70 = FUN_00410030(s_PROPOSECEASE_0062707c, DAT_00647748, 0);
    }
    else {
      local_70 = FUN_00410030(s_WALLCEASE_00627070, DAT_00647748, 0);
    }
    if ((local_70 !== 0)) {
      iVar13 = FUN_00453e51(param_2, 6);
      if ((iVar13 === 0)) {
        iVar13 = FUN_0055bef9(param_1, param_2);
        if ((iVar13 === 0)) {
          FUN_0045fd67(param_1, param_2);
        }
        else {
          FUN_00410030(s_OVERRULECEASE_006270a8, DAT_00647748, 0);
          local_70 = 0;
          bVar7 = 1;
        }
      }
      else {
        uVar15 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar15);
        iVar13 = FUN_00453e51(param_2, 6);
        if ((iVar13 === 0)) {
          FUN_00410030(s_UNOVERCEASE_0062709c, DAT_00647748, 0);
        }
        else {
          FUN_00410030(s_WALLOVERCEASE_0062708c, DAT_00647748, 0);
        }
        local_70 = 0;
        bVar7 = 1;
      }
    }
    local_50 = ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) + 1);
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) !== 0)) {
      local_50 = local_50 * 2;
    }
    if ((local_70 !== 0)) {
      if (((local_50 === 1) || ((local_50 + -1) < 0))) {
        local_78 = 0;
      }
      else {
        local_78 = _rand();
        local_78 = (local_78 % local_50);
      }
      if ((local_78 === 0)) {
        if ((-1 < DAT_0064b144)) {
          FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b144 * 0x10), 0));
          FUN_004941ee(4);
          iVar13 = FUN_00410030(s_GIVECIV_006270b8, DAT_00647748, 0);
          if ((iVar13 !== 0)) {
            local_70 = 0;
            FUN_004bf05b(param_1, DAT_0064b144, param_2, 0, 0);
            bVar10 = 1;
          }
        }
        if ((local_70 !== 0)) {
          local_14 = FUN_005adfa0((DAT_0064b0ec * 2 + -4), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) / 0x32 | 0));
          local_14 = local_14 * 0x32;
          iVar13 = FUN_00453e51(param_2, 6);
          if ((iVar13 !== 0)) {
            local_14 = (local_14 / 2 | 0);
          }
          if ((local_14 !== 0)) {
            FUN_00421da0(0, local_14);
            FUN_004941ee(4);
            iVar13 = FUN_00410030(s_GIVECASH_006270c0, DAT_00647748, 0);
            if ((iVar13 !== 0)) {
              w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) - local_14));
              w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + local_14));
              local_70 = 0;
              FUN_0056a65e(1);
              bVar10 = 1;
            }
          }
        }
        if ((iVar13 === 0)) {
          FUN_00467580(0, s32((DAT_0064c6a2 + param_2 * 0x594), 0));
          FUN_004941ee(4);
          iVar13 = FUN_00410030(s_GROVEL_006270cc, DAT_00647748, 0);
          if ((iVar13 !== 0)) {
            local_70 = 0;
            w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + s32((DAT_0064c6a2 + param_2 * 0x594), 0)));
            w32((DAT_0064c6a2 + param_2 * 0x594), 0, 0);
            FUN_0056a65e(1);
            bVar10 = 1;
            for (/* cond: (local_60 < 0x64) */); local_60 = (local_60 < 0x64); local_60 = (local_60 + 1)) {
              iVar13 = FUN_004bd9f0(param_2, local_60);
              if ((_MEM[DAT_0062768f + local_60 * 0x10] !== 0xfe)) {
                FUN_004bf05b(param_1, local_60, param_2, 0, 0);
              }
            }
          }
        }
        if ((local_70 === 0)) {
          wv(DAT_0064b108, ((DAT_00655af8) << 16 >> 16));
        }
      }
    }
    if ((local_70 !== 0)) {
      FUN_004941ee(4);
      FUN_00421ea0(s_CONTINUEWAR_006270e0);
      w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
      goto LAB_00463d3b;
    }
    bVar8 = 1;
    FUN_0045a7a8(param_1, param_2);
    FUN_00458a3b(param_1, param_2);
    if ((6 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      FUN_004941ee(4);
      FUN_00421ea0(s_WORTHLESS_006270d4);
    }
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
    local_10 = 3;
    if ((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 2 < ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF))) {
      local_10 = 2;
    }
    if (((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) * 3 / 2 | 0) < ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF))) {
      local_10 = (local_10 + -1);
    }
    if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
      local_10 = (local_10 + 1);
    }
    if ((((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) * 2 < ((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF))) {
      local_10 = (local_10 + 1);
    }
    if ((iVar13 !== 0)) {
      uVar15 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar15);
      local_70 = FUN_00410030(s_PROPOSEPEACE_006270ec, DAT_006409d8, 0);
      if ((local_70 !== 0)) {
        iVar13 = FUN_00453e51(param_2, 6);
        if ((iVar13 === 0)) {
 LAB_00462bb9: :
          iVar13 = FUN_0055bef9(param_1, param_2);
          if ((iVar13 === 0)) {
 LAB_00462c12: :
            if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x40) === 0)) {
              FUN_0045fd67(param_1, param_2);
            }
          }
          else {
            if (bVar7) {
              uVar14 = _rand();
              uVar16 = (uVar14 >> 0x1f);
              if ((((((uVar14 ^ uVar16) - uVar16) & 1) ^ uVar16) === uVar16));
            local_70 = 0;
          }
        }
        else {
          if (bVar7) {
            uVar14 = _rand();
            uVar16 = (uVar14 >> 0x1f);
            if ((((((uVar14 ^ uVar16) - uVar16) & 1) ^ uVar16) === uVar16));
          if ((iVar13 === 0)) {
            FUN_00410030(s_UNOVERPEACE_0062710c, DAT_006409d8, 0);
          }
          else {
            FUN_00410030(s_WALLOVERPEACE_006270fc, DAT_006409d8, 0);
          }
          local_70 = 0;
        }
      }
      if ((local_70 !== 0)) {
        local_50 = ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) + 1);
        if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) !== 0)) {
          local_50 = local_50 * 2;
        }
        if (((local_50 === 1) || ((local_50 + -1) < 0))) {
          local_7c = 0;
        }
        else {
          local_7c = _rand();
          local_7c = (local_7c % local_50);
        }
        if ((local_7c === 0)) {
          local_14 = FUN_005adfa0((DAT_0064b0ec * 2 + -4), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) / 0x32 | 0));
          local_14 = local_14 * 0x32;
          iVar13 = FUN_00453e51(param_2, 6);
          if ((iVar13 !== 0)) {
            local_14 = (local_14 / 2 | 0);
          }
          if ((local_14 !== 0)) {
            FUN_00421da0(0, local_14);
            iVar13 = FUN_00410030(s_CASHFORPEACE_00627128, DAT_006409d8, 0);
            if ((iVar13 !== 0)) {
              w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) - local_14));
              w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + local_14));
              local_70 = 0;
              bVar10 = 1;
              FUN_0056a65e(1);
            }
          }
        }
      }
      bVar8 = 1;
      if ((local_70 === 0)) {
        FUN_0045a6ab(param_1, param_2);
        FUN_00458a3b(param_1, param_2);
      }
      else {
        FUN_004941ee(4);
        FUN_00421ea0(s_NOPEACE_00627138);
      }
    }
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 1) === 0)) {
    if ((6 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      local_4c = 0;
      for (/* cond: (local_6c < 8) */); local_6c = (local_6c < 8); local_6c = (local_6c + 1)) {
        if (((_MEM[DAT_0064c6c0 + (local_6c * 4 + param_2 * 0x594)] & 8) !== 0)) {
          local_4c = (local_4c + 1);
        }
      }
      if ((s16((DAT_0064c70e + param_1 * 0x594), 0) < s16((DAT_0064c70e + param_2 * 0x594), 0))) {
        wv(DAT_0064b0e8, 1);
      }
    }
    if (bVar17) {
      FUN_00458df9(param_1, param_2, param_3, param_4);
    }
    if ((param_5 === 0)) {
      if ((DAT_0064b0e8 === 0)) {
        iVar13 = FUN_00453e51(param_2, 6);
        if ((iVar13 === 0)) {
          iVar13 = FUN_0055bef9(param_1, param_2);
          if ((iVar13 === 0)) {
            FUN_0045fd67(param_1, param_2);
          }
          else {
            uVar15 = FUN_00410070(param_2);
            FUN_0040ff60(1, uVar15);
            if ((DAT_0064b0ec !== 0)) {
              FUN_00410030(s_SENATEPEACE_00627178, DAT_006409d8, 0);
              FUN_00467825(param_2, param_1, 4);
              w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, (DAT_00655af8 + 0x10));
            }
            if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
              FUN_00410030(s_SENATECEASE_00627184, DAT_00647748, 0);
              FUN_00467825(param_2, param_1, 2);
              w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
            }
          }
        }
        else {
          uVar15 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar15);
          if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
            if ((DAT_0064b0ec !== 0)) {
              iVar13 = FUN_00453e51(param_2, 6);
              if ((iVar13 === 0)) {
                FUN_00410030(s_UNOVERPEACE_00627150, DAT_006409d8, 0);
              }
              else {
                FUN_00410030(s_WALLOVERPEACE_00627140, DAT_006409d8, 0);
              }
              FUN_00467825(param_2, param_1, 4);
              w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, (DAT_00655af8 + 0x10));
            }
            if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
              iVar13 = FUN_00453e51(param_2, 6);
              if ((iVar13 === 0)) {
                FUN_00410030(s_UNOVERCEASE_0062716c, DAT_00647748, 0);
              }
              else {
                FUN_00410030(s_WALLOVERCEASE_0062715c, DAT_00647748, 0);
              }
              FUN_00467825(param_2, param_1, 2);
              w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
            }
          }
        }
      }
    }
    else {
      if ((DAT_00626a30 === 0)) {
        FUN_00458a3b(param_1, param_2);
      }
      if (bVar8) {
        if ((param_5 === 0)) {
          local_c = -1;
          cVar1 = 0xff;
          for (/* cond: (local_6c < 8) */); local_6c = (local_6c < 8); local_6c = (local_6c + 1)) {
            if ((_MEM[DAT_0064c6e8 + (param_1 * 0x594 + local_6c)] <= cVar1)) {
              local_c = local_6c;
              cVar1 = _MEM[DAT_0064c6e8 + (param_1 * 0x594 + local_6c)];
            }
          }
          if ((-1 < local_c)) {
            uVar15 = FUN_00493c7d(local_c);
            FUN_0040ff60(1, uVar15);
            _MEM[DAT_0064c6e8 + (param_1 * 0x594 + local_c)] = (_MEM[DAT_0064c6e8 + (param_1 * 0x594 + local_c)] + 1);
            FUN_0040bbb0();
            FUN_0040bbe0(s_NOTORIOUS_00627214);
            if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + local_c * 4)] & 0x20) === 0)) {
              if ((s16((DAT_0064c70e + param_1 * 0x594), 0) < s16((DAT_0064c70e + param_2 * 0x594), 0))) {
                FUN_004941ee(3);
                FUN_0040bbe0(DAT_00627228);
              }
              else {
                FUN_004941ee(3);
                FUN_0040bbe0(s_SMALL_0062722c);
              }
            }
            else {
              FUN_004941ee(4);
              FUN_0040bbe0(DAT_00627220);
            }
            FUN_00421ea0(DAT_00679640);
          }
        }
      }
      else if (bVar5) {
        if ((param_5 === 0)) {
          local_14 = 0x71;
          if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) === 0)) {
            if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
              local_14 = 0x70;
            }
            iVar13 = FUN_004679ab(DAT_0064b114);
            if (((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) < 3)) {
              local_14 = 0x70;
            }
            if ((DAT_0064b0ec !== 0)) {
              local_14 = 0x6f;
            }
          }
          FUN_004271e8(1, s32((DAT_00628420 + local_14 * 4), 0));
          uVar15 = FUN_00410070(param_1);
          FUN_0040ff60(2, uVar15);
          uVar15 = FUN_00493ba6(param_1);
          FUN_0040ff60(3, uVar15);
          uVar15 = FUN_00493b10(param_1);
          FUN_0040ff60(4, uVar15);
          FUN_004941ee(2);
          if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
            if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
              FUN_00421ea0(s_WELCOME_0062720c);
            }
            else {
              FUN_00421ea0(s_WELCOMEPEACE_006271fc);
            }
          }
          else {
            FUN_00421ea0(s_WELCOMEALLY_006271f0);
          }
        }
        else {
          uVar15 = FUN_00493c7d(param_1);
          FUN_0040ff60(2, uVar15);
          if ((_MEM[DAT_0064c6bf + param_2 * 0x594] < 2)) {
            FUN_004941ee(2);
            if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
              if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
                FUN_00421ea0(s_HOWDY_006271d4);
              }
              else {
                FUN_00421ea0(s_HOWDYPEACE_006271c8);
              }
            }
            else {
              FUN_00421ea0(s_HOWDYALLY_006271bc);
            }
          }
          else {
            FUN_004941ee(2);
            if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
              FUN_004941ee(3);
              FUN_00421ea0(s_DOODY_006271e8);
            }
            else {
              FUN_004941ee(2);
              FUN_00421ea0(s_DOODYALLY_006271dc);
            }
          }
        }
      }
      else {
        FUN_004941ee(4);
        if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
          if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 6) === 0)) {
            FUN_00421ea0(s_ATTITUDE_006271b0);
          }
          else {
            FUN_00421ea0(s_ATTITUDEPEACE_006271a0);
          }
        }
        else {
          FUN_00421ea0(s_ATTITUDEALLY_00627190);
        }
      }
      if ((DAT_006ab5e8 !== 0)) {
        FUN_0040ff60(1, (DAT_0064f360 + DAT_006ab5e4 * 0x58));
        uVar15 = FUN_00410070(param_2);
        FUN_0040ff60(2, uVar15);
        if ((DAT_006ab5e4 < 2)) {
          FUN_00421ea0(s_PLEASECITY_00627244);
        }
        else {
          FUN_00421ea0(s_PLEASECITIES_00627234);
        }
      }
      if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) !== 0)) {
        local_1c = 0;
        if ((0 < DAT_0064b0fc)) {
          for (/* cond: (local_5c < 0x3f) */); local_5c = (local_5c < 0x3f); local_5c = (local_5c + 1)) {
            if ((s16((DAT_0064c832 + (local_5c * 2 + param_2 * 0x594)), 0) < s16((DAT_0064c8b2 + (local_5c * 2 + DAT_0064b0fc * 0x594)), 0))) {
              local_1c = (local_1c + 1);
            }
          }
        }
        if ((local_1c === 0)) {
          if ((0 < DAT_0064b100)) {
            local_1c = 0;
            for (/* cond: (local_5c < 0x3f) */); local_5c = (local_5c < 0x3f); local_5c = (local_5c + 1)) {
              if ((s16((DAT_0064c832 + (local_5c * 2 + DAT_0064b100 * 0x594)), 0) < s16((DAT_0064c8b2 + (local_5c * 2 + param_2 * 0x594)), 0))) {
                local_1c = (local_1c + 1);
              }
            }
            if ((local_1c !== 0)) {
              uVar15 = FUN_00493c7d(DAT_0064b100);
              FUN_0040ff60(1, uVar15);
              FUN_004941ee(3);
              FUN_00421ea0(s_ALLYBRAG_0062725c);
            }
          }
        }
        else {
          uVar15 = FUN_00493c7d(DAT_0064b0fc);
          FUN_0040ff60(1, uVar15);
          FUN_004941ee(2);
          FUN_00421ea0(s_ALLYPLEA_00627250);
        }
      }
      do {
        if ((_MEM[DAT_0064c6bf + param_2 * 0x594] < 0)) {
          _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
        }
        iVar13 = FUN_0045fe19(param_1, param_2);
        if ((iVar13 === 0)) {
          bVar9 = 1;
          goto LAB_00463d3b;
        }
        if ((iVar13 === 7)) {
          FUN_0045dd7f(param_1, param_2);
        }
        else if ((iVar13 === 8)) {
          FUN_0045f0b1(param_1, param_2);
        }
        else {
          iVar13 = FUN_0045b4da(param_1, param_2, iVar13);
          if ((iVar13 !== 0));
        cVar1 = _MEM[DAT_0064c6bf + param_2 * 0x594];
        iVar13 = FUN_00456f8b(param_1, param_2);
      } while ((s8(cVar1) < iVar13));
      FUN_00458a3b(param_1, param_2);
      FUN_004941ee(3);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
        FUN_00421ea0(s_PATIENCE_00627278);
      }
      else {
        FUN_00421ea0(s_PATIENCEALLY_00627268);
      }
    }
  }
 LAB_00463d3b: :
  FUN_00467750(param_2, param_1, 0x10000);
  if (((s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & 0x2008) !== 0)) {
    w32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0) & -33));
  }
  else {
    w32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0) | 0x20));
  }
  if ((!bVar9)) {
    _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
  }
  if ((local_34 !== 0)) {
    while ((s8(_MEM[DAT_0064c6bf + param_2 * 0x594]) < (local_34 + iVar13))) {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
    }
  }
  FUN_0045918e();
  if (((s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & 0x200c) === 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar15);
    FUN_00410030(s_CEASEEXPIRE_00627284, DAT_00647748, 0);
  }
  if ((iVar13 !== 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar15);
    FUN_004442a0(s_AMBASSADORS_00627290, 0x2e, 0);
    w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x80));
    FUN_0043060b(param_1, param_2);
  }
  if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(0, uVar15);
    FUN_004190d0(PTR_s_TUTORIAL_00627678, s_SCHISM_0062729c);
  }
  _DAT_00626a28 = 0;
  return;
}


 export function FUN_00467580 (param_1, param_2)

 {
  w32((DAT_0063cc30 + param_1 * 4), 0, param_2);
  return;
}


 export function FUN_004675b0 ()

 {
  FUN_004675ca();
  FUN_004675e9();
  return;
}


 export function FUN_004675ca ()

 {
  FUN_004fa4be(0xc350);
  return;
}


 export function FUN_004675e9 ()

 {
  _atexit(FUN_00467606);
  return;
}


 export function FUN_00467606 ()

 {
  FUN_004fa569();
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
  FUN_0046763a();
  FUN_00467654();
  return;
}


 export function FUN_0046763a ()

 {
  FUN_0044c730();
  return;
}


 export function FUN_00467654 ()

 {
  _atexit(FUN_00467671);
  return;
}


 export function FUN_00467671 ()

 {
  FUN_0044ca60();
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
  FUN_004676a5();
  FUN_004676bf();
  return;
}


 export function FUN_004676a5 ()

 {
  FUN_005dcc10();
  return;
}


 export function FUN_004676bf ()

 {
  _atexit(FUN_004676dc);
  return;
}


 export function FUN_004676dc ()

 {
  wv(DAT_00654fd4, DAT_00654fd4);
  return;
}


 export function FUN_00467750 (param_1, param_2, param_3)

 {
  if (((param_3 & 4) !== 0)) {
    FUN_00467750(param_1, param_2, 8);
  }
  if (((param_3 & 0x2000) !== 0)) {
    FUN_00467750(param_1, param_2, 0x1800);
  }
  if (((param_3 & 1) !== 0)) {
    FUN_00467750(param_1, param_2, 0x2000);
  }
  w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & (~param_3)));
  w32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (param_2 * 0x594 + param_1 * 4)), 0) & (~param_3)));
  return;
}


 export function FUN_00467825 (param_1, param_2, param_3)

 {
  if (((param_3 & 8) !== 0)) {
    FUN_00467825(param_1, param_2, 4);
  }
  if (((param_3 & 0xe) !== 0)) {
    FUN_00467750(param_1, param_2, 0x2a60);
  }
  if (((param_3 & 0x2000) !== 0)) {
    FUN_00467750(param_1, param_2, 0xe);
    param_3 = (param_3 | 0x200000);
  }
  w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | param_3));
  w32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0) | param_3));
  return;
}


 export function FUN_00467904 (param_1, param_2)

 {
  return _MEM[DAT_0064c6e0 + (param_1 * 0x594 + param_2)];
}


 export function FUN_00467933 (param_1, param_2, param_3)

 {
  let uVar1;

  if ((DAT_006d1da0 === param_1)) {
    uVar1 = FUN_005adfa0(param_3, 0, 0x64);
    _MEM[DAT_0064c6e0 + (param_1 * 0x594 + param_2)] = uVar1;
  }
  return;
}


 export function FUN_004679ab (param_1)

 {
  let uVar1;

  if ((param_1 < 0)) {
    uVar1 = 0;
  }
  else if ((param_1 < 0xb)) {
    uVar1 = 1;
  }
  else if ((param_1 < 0x1a)) {
    uVar1 = 2;
  }
  else if ((param_1 < 0x27)) {
    uVar1 = 3;
  }
  else if ((param_1 < 0x3e)) {
    uVar1 = 4;
  }
  else if ((param_1 < 0x4b)) {
    uVar1 = 5;
  }
  else if ((param_1 < 0x5a)) {
    uVar1 = 6;
  }
  else if ((param_1 < 0x64)) {
    uVar1 = 7;
  }
  else {
    uVar1 = 8;
  }
  return uVar1;
}


 export function FUN_00467a5d (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00467904(param_1, param_2);
  FUN_004679ab(uVar1);
  return;
}


 export function FUN_00467a86 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_00467a5d(param_1, param_2);
  return (iVar1 < 4);
}


 export function FUN_00467abb (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_00467a5d(param_1, param_2);
  return (4 < iVar1);
}


 export function FUN_00467af0 (param_1, param_2)

 {
  let bVar1;
  let iVar2;

  if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + param_2 * 4)] & 0x20) === 0)) {
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 8) === 0)) {
      if (((((s32((DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)), 0)) & 0xFF) & 5) === 1)) {
        iVar2 = FUN_00467904(param_1, param_2);
        bVar1 = (0x31 < iVar2);
      }
      else {
        bVar1 = 0;
      }
    }
    else {
      bVar1 = 0;
    }
  }
  else {
    bVar1 = 1;
  }
  return bVar1;
}


 export function FUN_00467baf (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_28;
  let local_24;
  let local_c;
  let local_8;

  for (/* cond: (local_28 < ((DAT_00655b16) << 16 >> 16)) */); local_28 = (local_28 < ((DAT_00655b16) << 16 >> 16)); local_28 = (local_28 + 1)) {
    if ((s8(_MEM[DAT_006560f7 + local_28 * 0x20]) === param_1)) {
      iVar1 = ((s16((DAT_006560f0 + local_28 * 0x20), 0)) << 16 >> 16);
      iVar2 = ((s16((DAT_006560f2 + local_28 * 0x20), 0)) << 16 >> 16);
      iVar3 = FUN_0043d07a(iVar1, iVar2, param_1, -1, param_2);
      if ((s8(_MEM[DAT_0064f348 + iVar3 * 0x58]) === param_2)) {
        iVar3 = FUN_005b8a81(iVar1, iVar2);
        iVar4 = FUN_005b89e4(iVar1, iVar2);
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_28 * 0x20]) * 0x14] !== 7)) {
          if ((iVar4 === 0)) {
            local_24 = FUN_0043d07a(iVar1, iVar2, param_1, -1, -1);
          }
          else {
            local_8 = 0x270f;
            local_24 = -1;
            for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
              if ((iVar4 < local_8)) {
                local_24 = local_c;
                local_8 = iVar4;
              }
            }
          }
          if ((_MEM[DAT_006560f7 + local_28 * 0x20] === _MEM[DAT_0064f348 + local_24 * 0x58])) {
            FUN_005b5bab(local_28, 0);
            FUN_005b3ae0(local_28, ((s16((DAT_0064f340 + local_24 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_24 * 0x58), 0)) << 16 >> 16), 1);
            if ((((DAT_00655afe) << 16 >> 16) === local_28)) {
              wv(DAT_0064b1b4, s16((DAT_0064f340 + local_24 * 0x58), 0));
              wv(DAT_0064b1b0, s16((DAT_0064f342 + local_24 * 0x58), 0));
            }
            _MEM[DAT_006560ff + local_28 * 0x20] = 0xff;
          }
        }
      }
    }
  }
  return;
}


 export function FUN_00467ef2 (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  FUN_00467750(param_1, param_2, 8);
  FUN_00467baf(param_1, param_2);
  FUN_00467baf(param_2, param_1);
  FUN_0047cf9e(DAT_006d1da0, 1);
  FUN_0040bbb0();
  FUN_0040bbe0(s_CANCELALLIANCE_0062831c);
  if ((DAT_00654fa8 === 0)) {
    if ((DAT_006d1da0 === param_1)) {
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00410070(param_2);
      FUN_0040ff60(2, uVar1);
    }
    else {
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00410070(param_1);
      FUN_0040ff60(2, uVar1);
    }
    FUN_0040bbe0(DAT_0062832c);
    FUN_00410030(DAT_00679640, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
  }
  else {
    if ((DAT_00655b07 === 0)) {
      return;
    }
    if ((DAT_00654fa8 === 0)) {
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(2, uVar1);
      FUN_0040bbe0(DAT_00628330);
      FUN_00410030(DAT_00679640, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    }
  }
  return;
}


 export function FUN_004683f0 (in_ECX, param_1, param_2, param_3)

 {
  let piVar1;
  let iVar2;
  let pvVar3;
  // in_ECX promoted to parameter;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_40;
  let local_3c;
  let local_34;
  let local_2c;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0046877d;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = FUN_005c62ee();
  if ((local_14 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (local_14 + -72);
  }
  w32((DAT_0066be80 + param_2 * 4), 0, param_3);
  local_24 = s32(param_1, 0);
  local_20 = s32(param_1, 1);
  local_1c = s32(param_1, 2);
  local_18 = s32(param_1, 3);
  wv(DAT_0066be78, 0);
  FUN_00469bdc(param_2, 0);
  if ((s32(((in_ECX + 0x3e8) + param_2 * 4), 0) < 1)) {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, -1);
  }
  else {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, 0);
  }
  w32(((in_ECX + 0x3e0) + param_2 * 4), 0, 0);
  iVar4 = (param_2 * 0x10 + in_ECX);
  w32((iVar4 + 0x3c0), 0, s32(param_1, 0));
  w32((iVar4 + 0x3c4), 0, s32(param_1, 1));
  w32((iVar4 + 0x3c8), 0, s32(param_1, 2));
  w32((iVar4 + 0x3cc), 0, s32(param_1, 3));
  if ((s32(((in_ECX + 0x10420) + param_2 * 4), 0) < s32(((in_ECX + 0x3e8) + param_2 * 4), 0))) {
    iVar2 = FUN_006e7d8c(2);
    iVar4 = local_1c;
    piVar1 = ((param_2 * 0x10 + 0x3c8) + in_ECX);
    w32(piVar1, 0, (s32(piVar1, 0) - iVar2));
    local_24 = FUN_006e7d8c(2);
    local_24 = (iVar4 - local_24);
    pvVar3 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar3 === 0)) {
      local_2c = 0;
    }
    else {
      local_2c = FUN_0040fb00();
    }
    local_8 = -1;
    w32(((in_ECX + 0x37c) + param_2 * 4), 0, local_2c);
    if ((in_ECX === 0)) {
      local_3c = 0;
    }
    else {
      local_3c = (in_ECX + 0x48);
    }
    FUN_0040fc50(local_3c, (param_2 + 0x3fa), DAT_ffffffdc, 1);
    FUN_0040fd40(0, (s32(((in_ECX + 0x3e8) + param_2 * 4), 0) - s32(((in_ECX + 0x10420) + param_2 * 4), 0)));
    FUN_0040fcf0(0);
    FUN_005db0d0((s32(((in_ECX + 0x10420) + param_2 * 4), 0) + -1));
    FUN_0040fd80((LAB_004035fd + ((u8((param_2 === 0)) - 1) & 0x276)));
    FUN_00451ac0((LAB_004035fd + ((u8((param_2 === 0)) - 1) & 0x276)));
  }
  pvVar3 = operator_new(0x40);
  local_8 = 1;
  if ((pvVar3 === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = FUN_00451930();
  }
  local_8 = -1;
  w32(((in_ECX + 0x384) + param_2 * 4), 0, local_34);
  if ((in_ECX === 0)) {
    local_40 = 0;
  }
  else {
    local_40 = (in_ECX + 0x48);
  }
  FUN_004519b0(local_40, (param_2 + 0x3fc), ((param_2 * 0x10 + in_ECX) + 0x3c0));
  FUN_00451a60(LAB_00401dac);
  in_ECX = (in_ECX + 0x384);
  FUN_00468bb9(param_2);
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00468797 (param_1)

 {
  FUN_004687d3(0, param_1);
  return;
}


 export function FUN_004687b5 (param_1)

 {
  FUN_004687d3(1, param_1);
  return;
}


 export function FUN_004687d3 (param_1, param_2)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  w32(((local_8 + 0x10410) + param_1 * 4), 0, param_2);
  FUN_00468bb9(param_1);
  return;
}


 export function FUN_00468834 (param_1)

 {
  let puVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  local_c = (param_1 + -0x3fc);
  FUN_00451890(DAT_fffffff0, DAT_ffffffec);
  if ((iVar2 < s32(((local_8 + 0x3e8) + local_c * 4), 0))) {
    iVar3 = FUN_005dba95();
    if ((iVar3 === 0)) {
      iVar3 = FUN_005dbab8();
      if ((iVar3 === 0)) {
        for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0));
            local_18 = (local_18 + 1)) {
          if ((local_18 !== iVar2)) {
            w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 0);
          }
        }
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((local_c * 0x2004 + iVar2 * 4) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
      else {
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((local_c * 0x2004 + iVar2 * 4) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
    }
    else {
      for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)); local_18 = (local_18 + 1))
      {
        w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 0);
      }
      if ((s32(((local_8 + 0x10418) + local_c * 4), 0) < iVar2)) {
        local_18 = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_1c = iVar2;
      }
      else {
        local_1c = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_18 = iVar2;
      }
      for (/* cond: (local_18 <= local_1c) */); local_18 = (local_18 <= local_1c); local_18 = (local_18 + 1)) {
        w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 1);
      }
    }
    FUN_00468bb9(local_c);
  }
  return;
}


 export function FUN_00468aa7 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_2 < s32(((param_3 * 0x10 + 0x3c4) + local_8), 0))) {
    iVar1 = -1;
  }
  else if ((param_2 < s32(((param_3 * 0x10 + 0x3cc) + local_8), 0))) {
    if ((param_1 < s32(((param_3 * 0x10 + 0x3c0) + local_8), 0))) {
      iVar1 = -3;
    }
    else if ((param_1 < s32(((param_3 * 0x10 + 0x3c8) + local_8), 0))) {
      iVar1 = s32(((param_3 * 0x10 + 0x3c4) + local_8), 0);
      iVar2 = FUN_00407fc0(((param_3 * 0x10 + local_8) + 0x3c0));
      iVar1 = (((param_2 - iVar1) / (iVar2 / s32(((local_8 + 0x10420) + param_3 * 4), 0) | 0) | 0) + s32(((local_8 + 0x10410) + param_3 * 4), 0));
    }
    else {
      iVar1 = -4;
    }
  }
  else {
    iVar1 = -2;
  }
  return iVar1;
}


 export function FUN_00468bb9 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_80;
  let local_7c;
  let local_78;
  let local_70;
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
  let local_1c;
  let local_18;
  let local_8;

  local_34 = FUN_005c62ee();
  if ((local_34 === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = (local_34 + -72);
  }
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073(((param_1 * 0x10 + local_34) + 0x3c0));
 LAB_00468c0c: :
  FUN_005c0333(((param_1 * 0x10 + local_34) + 0x3c0), DAT_00635a18);
  if ((s32((local_34 + 0x154), 0) === 0)) {
    local_8 = DAT_0067a7a0;
  }
  else {
    local_8 = DAT_0067a798;
  }
  local_4c = s32(((param_1 * 0x10 + 0x3c0) + local_34), 0);
  local_48 = FUN_00407f90(((param_1 * 0x10 + local_34) + 0x3c0));
  local_1c = FUN_00407fc0(((param_1 * 0x10 + local_34) + 0x3c0));
  local_1c = (local_1c / s32(((local_34 + 0x10420) + param_1 * 4), 0) | 0);
  iVar1 = (local_1c / 2 | 0);
  iVar2 = FUN_0040ef70();
  local_60 = (iVar1 - (iVar2 / 2 | 0));
  w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
  for (/* cond: (local_54 < s32(((local_34 + 0x3e8) + param_1 * 4), 0)) */); local_54 = (local_54 < s32(((local_34 + 0x3e8) + param_1 * 4), 0)); local_54 = (local_54 + 1)) {
    if ((s32((((local_54 * 4 + param_1 * 0x2004) + 0x8400) + local_34), 0) !== 0)) {
      w32(((local_34 + 0x1e4) + param_1 * 4), 0, 1);
      break;
    }
  }
  local_54 = 0;
  do {
    if ((s32(((local_34 + 0x10420) + param_1 * 4), 0) <= local_54)) {
 LAB_004692ba: :
      FUN_005c0073(DAT_ffffffe8);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    local_50 = (s32(((param_1 * 0x10 + 0x3c4) + local_34), 0) + local_1c * local_54);
    FUN_006e7d90(DAT_ffffffd4, local_4c, local_50, (local_48 + local_4c), (local_1c + local_50));
    if ((s32(((local_34 + 0x10410) + param_1 * 4), 0) === -1)) {
      local_30 = s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0x8400) + local_34), 0);
      if ((local_30 === 0)) {
        local_38 = DAT_00635a1c;
        local_44 = DAT_00635a20;
      }
      else {
        local_38 = DAT_00635a28;
        local_44 = DAT_00635a2c;
      }
      local_5c = 0;
      if ((local_5c < 0));
      if ((s32((local_34 + 0x154), 0) === 0)) {
        iVar1 = FUN_00451830();
        local_78 = (iVar1 * 2 / 3 | 0);
      }
      else {
        local_78 = FUN_00451830();
      }
      local_40 = ((((-u8((s32((local_34 + 0x154), 0) === 0))) & -4) + 0xa) + local_78 * 2);
      local_2c = (UNNAMED + (local_40 + -3));
      if ((local_30 === 0)) {
        local_7c = DAT_00635a18;
      }
      else {
        local_7c = DAT_00635a24;
      }
      FUN_005c0333(DAT_ffffffd4, local_7c);
      if ((s32(((local_34 + 0x10410) + param_1 * 4), 0) === -1)) {
        FUN_0040bbb0();
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb7c), 0));
        FUN_0040bbe0(uVar3);
        w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
        iVar1 = FUN_00407f90(((param_1 * 0x10 + local_34) + 0x3c0));
        iVar2 = FUN_0040efd0(DAT_00679640);
        local_40 = ((iVar1 - iVar2) / 2 | 0);
      }
      else {
        iVar1 = FUN_0040ef70(0x30);
        FUN_005cd775(iVar1 * 2);
        iVar1 = FUN_0040ef70();
        local_58 = ((iVar1 << 7) / 0x30 | 0);
        local_80 = local_58;
        if ((((s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) & 1) === 0)) {
          local_80 = 0;
        }
        iVar4 = (local_50 + (local_1c / 2 | 0));
        iVar1 = FUN_00451860();
        iVar2 = FUN_0040ef70();
        FUN_005cef31(DAT_ffffff90, DAT_0067a7a8, (local_4c + local_80), (iVar4 - (iVar1 * iVar2 / 0x30 | 0)));
        FUN_005cd775(1, 1);
        if ((DAT_0066be78 === 0)) {
          FUN_0040bbb0();
          FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_5c * 0x20]) * 0x14), 0))
          ;
          if ((_MEM[(local_34 + 0x3bc)] !== 0)) {
            FUN_00414d70(DAT_0062840c);
            uVar3 = FUN_005b6898(local_5c);
            FUN_00414d70(uVar3);
            FUN_00414d70(DAT_00628410);
          }
        }
        else {
          FUN_0040bbb0();
          uVar3 = FUN_005b6898(local_5c);
          FUN_00414d70(uVar3);
          FUN_00414d70(DAT_00628414);
          FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + local_5c * 0x20]) * 0x14), 0))
          ;
          FUN_00414d70(DAT_00628418);
        }
      }
      if ((local_44 !== local_38)) {
        FUN_005c19ad(local_44);
        FUN_005c0f57(local_8, DAT_00679640, ((local_40 + local_4c) + 2), ((local_60 + local_50) + 1), 5);
        FUN_005c19ad(local_38);
        FUN_005c0f57(local_8, DAT_00679640, ((local_40 + local_4c) + 1), (local_60 + local_50), 5);
      }
      FUN_005c19ad(local_38);
      FUN_005c0f57(local_8, DAT_00679640, (local_40 + local_4c), (local_60 + local_50), 5);
    }
    local_54 = (local_54 + 1);
  } ( true );
  FUN_00469bdc(param_1, 1);
  if ((s32(((local_34 + 0x3e8) + param_1 * 4), 0) === 0)) {
    w32(((local_34 + 0x10410) + param_1 * 4), 0, -1);
  }
  else if ((s32(((local_34 + 0x3e8) + param_1 * 4), 0) < s32(((local_34 + 0x3e8) + param_1 * 4), 0))) {
    w32(((local_34 + 0x10410) + param_1 * 4), 0, (s32(((local_34 + 0x3e8) + param_1 * 4), 0) + -1));
  }
  goto LAB_00468c0c;
}


 export function FUN_004692ea ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  _MEM[(local_8 + 0x3bd)] = 1;
  FUN_00453c80();
  FUN_00453c80();
  FUN_0046b14d(0xa7, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3bd)]), 0, 0, 0, 0, 0, 0);
  FUN_00468bb9(0);
  return;
}


 export function FUN_004693c5 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  _MEM[(local_8 + 0x3bd)] = 0;
  FUN_00453c40();
  FUN_00453c40();
  FUN_0046b14d(0xa8, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3bd)]), 0, 0, 0, 0, 0, 0);
  FUN_0046968b(0, (s32((local_8 + 0x3e8), 0) + -1), 0);
  FUN_00468bb9(0);
  return;
}


 export function FUN_004694b7 ()

 {
  let uVar1;

  FUN_005c62ee();
  FUN_004518d0();
  uVar1 = FUN_00493c7d(DAT_006d1da0);
  FUN_0040ff60(0, uVar1);
  FUN_00511880(0x64, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 1, 0, DAT_006d1da0, 0);
  return;
}


 export function FUN_00469547 ()

 {
  FUN_0046957b(0);
  return;
}


 export function FUN_00469561 ()

 {
  FUN_0046957b(1);
  return;
}


 export function FUN_0046957b (param_1)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0046990a(0, (s32(((local_8 + 0x3e8) + param_1 * 4), 0) + -1), param_1);
  FUN_00468bb9(param_1);
  return;
}


 export function FUN_004695e9 ()

 {
  FUN_0046961d(0);
  return;
}


 export function FUN_00469603 ()

 {
  FUN_0046961d(1);
  return;
}


 export function FUN_0046961d (param_1)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0046968b(0, (s32(((local_8 + 0x3e8) + param_1 * 4), 0) + -1), param_1);
  FUN_00468bb9(param_1);
  return;
}


 export function FUN_0046968b (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let local_14;
  let local_10;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((1 < s32(((local_8 + 0x3e8) + param_3 * 4), 0))) {
    wv(DAT_0066be78, 0);
    for (/* cond: (local_10 < param_2) */); local_14 = local_10, local_10 = (local_10 < param_2); local_10 = (local_10 + 1)) {
      while ((local_14 <= param_2)) {
        iVar2 = _strcmp(s32((DAT_0066be90 + u8(_MEM[DAT_006560f6 + s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0) * 0x20]) * 4), 0), s32((DAT_0066be90 + u8(_MEM[DAT_006560f6 + s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0) * 0x20]) * 4), 0));
        if ((0 < iVar2)) {
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, uVar1);
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, uVar1);
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, uVar1);
        }
      }
    }
  }
  return;
}


 export function FUN_0046990a (param_1, param_2, param_3)

 {
  let uVar1;
  let _Str2;
  let _Str1;
  let iVar2;
  let local_14;
  let local_10;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32(((local_8 + 0x3e8) + param_3 * 4), 0) < 2)) {
    return;
  }
  wv(DAT_0066be78, 1);
  local_10 = param_1;
 LAB_0046996e: :
  local_14 = local_10;
  if ((param_2 <= local_10)) {
    return;
  }
 LAB_00469989: :
  do {
    local_14 = (local_14 + 1);
    if ((param_2 < local_14)) {
      if ((_MEM[DAT_00656100 + s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0) * 0x20] !== 0xff)) {
        _Str2 = FUN_005b6898(s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0));
        _Str1 = FUN_005b6898(s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0));
        iVar2 = _strcmp(_Str1, _Str2);
        if ((iVar2 < 1));
      w32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0));
      w32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, uVar1);
      uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0);
      w32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0));
      w32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, uVar1);
      uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0);
      w32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0));
      w32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, uVar1);
    }
  } while ( true );
  local_10 = (local_10 + 1);
  goto LAB_0046996e;
}


 export function FUN_00469bdc (in_ECX, param_1, param_2)

 {
  let piVar1;
  let cVar2;
  let sVar3;
  let sVar4;
  let bVar5;
  let uVar6;
  let iVar7;
  // in_ECX promoted to parameter;
  let local_30;
  let local_2c;
  let local_28;
  let local_18;
  let local_c;
  let local_8;

  local_18 = 0;
  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_2 !== 0)) {
    local_18 = operator_new((s32(((local_8 + 0x3e8) + param_1 * 4), 0) << 2));
    if ((local_18 === 0)) {
      param_2 = 0;
    }
    else {
      local_2c = s32(((local_8 + 0x3e8) + param_1 * 4), 0);
      for (/* cond: (local_30 < local_2c) */); local_30 = (local_30 < local_2c); local_30 = (local_30 + 1)) {
        if ((s32((((param_1 * 0x2004 + local_30 * 4) + 0x8400) + local_8), 0) === 0)) {
          w32((local_18 + local_30 * 4), 0, -1);
        }
        else {
          w32((local_18 + local_30 * 4), 0, s32((((param_1 * 0x2004 + local_30 * 4) + 0x43f8) + local_8), 0));
        }
      }
    }
  }
  w32(((local_8 + 0x3e8) + param_1 * 4), 0, 0);
  local_30 = 0;
  do {
    if ((((DAT_00655b16) << 16 >> 16) <= local_30)) {
      if ((local_18 !== 0)) {
        operator_delete(local_18);
      }
      if ((DAT_0066be78 === 0)) {
        FUN_0046968b(0, (s32(((local_8 + 0x3e8) + param_1 * 4), 0) + -1), param_1);
      }
      else {
        FUN_0046990a(0, (s32(((local_8 + 0x3e8) + param_1 * 4), 0) + -1), param_1);
      }
      return;
    }
    if ((s8(_MEM[DAT_006560f7 + local_30 * 0x20]) === (DAT_006d1da0 & 0xff))) {
      sVar3 = s16((DAT_006560f0 + local_30 * 0x20), 0);
      sVar4 = s16((DAT_006560f2 + local_30 * 0x20), 0);
      bVar5 = 0;
      for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
        uVar6 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_c]) + ((sVar3) << 16 >> 16)));
        cVar2 = _MEM[DAT_00628360 + local_c];
        iVar7 = FUN_004087c0(uVar6, (s8(cVar2) + ((sVar4) << 16 >> 16)));
        if ((iVar7 === 0)) {
          bVar5 = 1;
          break;
        }
      }
      if ((iVar7 === 1)) {
        w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x3f0) + local_8), 0, local_30);
        w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x43f8) + local_8), 0, s32((DAT_0065610a + local_30 * 0x20), 0));
        w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x8400) + local_8), 0, 0);
        if ((local_18 !== 0)) {
          for (/* cond: (local_28 < local_2c) */); local_28 = (local_28 < local_2c); local_28 = (local_28 + 1)) {
            if ((s32((DAT_0065610a + local_30 * 0x20), 0) === s32((local_18 + local_28 * 4), 0))) {
              w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x8400) + local_8), 0, 1);
              break;
            }
          }
        }
        piVar1 = ((local_8 + 0x3e8) + param_1 * 4);
        w32(piVar1, 0, (s32(piVar1, 0) + 1));
      }
    }
    local_30 = (local_30 + 1);
  } ( true );
}


 export function FUN_0046a740 ()

 {
  if ((DAT_0062841c !== 0)) {
    FUN_0046ab00(DAT_0062841c);
    FUN_0046aaa0(DAT_0062841c);
    wv(DAT_0062841c, 0);
  }
  wv(DAT_00628424, 0);
  return;
}


 export function FUN_0046a78d ()

 {
  let iVar1;
  let uVar2;
  let local_110;
  let local_c;
  let local_8;

  local_8 = -1;
  iVar1 = FUN_004a2379(s_LABELS_00628430, s_LABELS_00628428);
  if ((iVar1 === 0)) {
    FUN_004a23fc(1);
    wv(DAT_00628424, FUN_004a2534());
    wv(DAT_0062841c, FUN_004bb870(0xde0));
    if ((FUN_004bb870(0xde0) === 0)) {
      FUN_00589ef8(-9, 4, 0, 0x378, 4);
    }
    else {
      wv(DAT_00628420, FUN_0046aad0(FUN_004bb870(0xde0)));
      if ((FUN_0046aad0(FUN_004bb870(0xde0)) === 0)) {
        FUN_00589ef8(-10, 4, 0, FUN_004bb870(0xde0), 0x378);
      }
      else {
        for (/* cond: (local_c < DAT_00628424) */); local_c = (local_c < DAT_00628424); local_c = (local_c + 1)) {
          uVar2 = FUN_004a257a();
          w32((DAT_00628420 + local_c * 4), 0, uVar2);
        }
        if ((local_c < 0x378)) {
          FUN_005f22d0(DAT_fffffef0, DAT_0064bb08);
          FUN_005f22d0(DAT_0064bb08, DAT_00655020);
          iVar1 = FUN_004a2379(s_LABELS_00628440, s_LABELS_00628438);
          if ((iVar1 === 0)) {
            FUN_004a23fc(1);
            iVar1 = FUN_004a2534();
            for (/* cond: (local_c < DAT_00628424) */); local_c = (local_c < DAT_00628424); local_c = (local_c + 1)) {
              FUN_004a23fc(1);
            }
            for (/* cond: (local_c < iVar1) */); local_c = (local_c < iVar1); local_c = (local_c + 1)) {
              uVar2 = FUN_004a257a();
              w32((DAT_00628420 + local_c * 4), 0, uVar2);
            }
          }
          FUN_005f22d0(DAT_0064bb08, DAT_fffffef0);
          if ((local_c < 0x378)) {
            uVar2 = FUN_00428a95(s_[ERROR:LABELS.TXT]_00628448);
            for (/* cond: (local_c < 0x378) */); local_c = (local_c < 0x378); local_c = (local_c + 1)) {
              w32((DAT_00628420 + local_c * 4), 0, uVar2);
            }
          }
        }
        local_8 = local_c;
      }
    }
  }
  else {
    FUN_00589ef8(-8, 4, 0, 0, 0);
  }
  FUN_004a2020();
  if ((local_8 < 1)) {
    FUN_0046a740();
  }
  return local_8;
}


 export function FUN_0046aaa0 (param_1)

 {
  FUN_005dce96(param_1);
  return;
}


 export function FUN_0046aad0 (param_1)

 {
  FUN_005dcdf9(param_1);
  return;
}


 export function FUN_0046ab00 (param_1)

 {
  FUN_005dce29(param_1);
  return;
}


 export function FUN_0046ab30 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return in_ECX;
}


 export function FUN_0046ab49 ()

 {
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CRichEditDoc::InvalidateObjectCache(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function InvalidateObjectCache (this)

 {
  w32((this + 0x12c0), 0, 0);
  return;
}


 export function FUN_0046ab82 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let iVar1;
  let puVar2;
  let puVar3;
  let local_8;

  for (/* cond: (local_8 < (s32((in_ECX + 0x12c0), 0) + -1)) */); local_8 = (local_8 < (s32((in_ECX + 0x12c0), 0) + -1)); local_8 = (local_8 + 1)) {
    puVar2 = ((local_8 * 3 + 3) * 8 + in_ECX);
    puVar3 = (local_8 * 0x18 + in_ECX);
    for (/* cond: (iVar1 !== 0) */); iVar1 = (iVar1 !== 0); iVar1 = (iVar1 + -1)) {
      w32(puVar3, 0, s32(puVar2, 0));
      puVar2 = (puVar2 + 1);
      puVar3 = (puVar3 + 1);
    }
  }
  w32((in_ECX + 0x12c0), 0, (s32((in_ECX + 0x12c0), 0) + -1));
  return;
}


 export function FUN_0046abed (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = -1;
  local_8 = 0;
  do {
    if ((s32((in_ECX + 0x12c0), 0) <= local_8)) {
 LAB_0046ac67: :
      if ((-1 < local_c)) {
        FUN_0046ab82(local_c);
      }
      return;
    }
    if ((s32(((in_ECX + 0x14) + local_8 * 0x18), 0) === param_1)) {
      local_c = local_8;
      goto LAB_0046ac67;
    }
    local_8 = (local_8 + 1);
  } ( true );
}


 export function FUN_0046ac89 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0x12c0), 0);
  while ((-1 < local_8)) {
    if ((s32(((in_ECX + 0x10) + local_8 * 0x18), 0) === param_1)) {
      FUN_0046ab82(local_8);
    }
  }
  return;
}


 export function FUN_0046ace7 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = -1;
  if ((s32((in_ECX + 0x12c0), 0) < 0xc8)) {
    local_8 = s32((in_ECX + 0x12c0), 0);
    w32((in_ECX + 0x12c0), 0, (s32((in_ECX + 0x12c0), 0) + 1));
    FUN_004086c0((local_8 * 0x18 + in_ECX), param_3, param_4, param_5, param_6);
    w32(((in_ECX + 0x14) + local_8 * 0x18), 0, param_1);
    w32(((in_ECX + 0x10) + local_8 * 0x18), 0, param_2);
  }
  return local_8;
}


 export function FUN_0046ad85 (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = -1;
  local_8 = 0;
  do {
    if ((s32((in_ECX + 0x12c0), 0) <= local_8)) {
 LAB_0046ae34: :
      if ((-1 < local_c)) {
        if ((param_3 !== 0)) {
          w32(param_3, 0, s32(((in_ECX + 0x14) + local_c * 0x18), 0));
        }
        if ((param_4 !== 0)) {
          w32(param_4, 0, s32(((in_ECX + 0x10) + local_c * 0x18), 0));
        }
      }
      return local_c;
    }
    if ((param_2 < s32(((in_ECX + 0xc) + local_8 * 0x18), 0))) {
      local_c = local_8;
      goto LAB_0046ae34;
    }
    local_8 = (local_8 + 1);
  } ( true );
}


 export function FUN_0046af70 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  if ((param_1 !== 0)) {
    FUN_005dae6b(7, s_(sock_>=_0_&&_sock_<=_MAX_NET_PL_0062a67c, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a658, 0x139);
  }
  if ((s32((param_2 + 8), 0) === 0)) {
    FUN_005dae6b(7, s_pMsg->size_>_0_0062a6f4, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a6d0, 0x13a);
  }
  w32((param_2 + 0xc), 0, DAT_00628468);
  wv(DAT_00628468, (DAT_00628468 + 1));
  iVar1 = XD_SendSecureData(((param_1) & 0xFFFF), param_2, s32((param_2 + 8), 0), 0);
  w32((in_ECX + 0x578), 0, iVar1);
  if ((s32((in_ECX + 0x578), 0) < 0)) {
    FUN_005d22f9(s_SendToConnections:_FAILED_on_sen_0062a704, param_1, s32((in_ECX + 0x578), 0), s32((param_2 + 4), 0));
    if ((s32((param_2 + 4), 0) === 0x6a)) {
      FUN_005d237d(s_Popup_Type:_%s_0062a754, (s_(NM_POP_RETIREDIE)_00629990 + s32((param_2 + 0x10), 0) * 0x20));
    }
    uVar2 = 0;
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_0046b0a1 (in_ECX, param_1)

 {
  let bVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  w32((param_1 + 0xc), 0, DAT_00628468);
  wv(DAT_00628468, (DAT_00628468 + 1));
  iVar2 = XD_SendBroadcastData(param_1, s32((param_1 + 8), 0), 0);
  w32((in_ECX + 0x578), 0, iVar2);
  bVar1 = (s32((in_ECX + 0x578), 0) < s32((param_1 + 8), 0));
  if (bVar1) {
    FUN_005d2279(s_SendToEveryone:_FAILED._Return_V_0062a764, s32((in_ECX + 0x578), 0));
  }
  return (!bVar1);
}


 export function FUN_0046b11d (param_1, param_2)

 {
  FUN_0046b14d(param_1, 0, 0, 0, 0, 0, 0, 0, param_2, 0);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0046cdce)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0046b14d (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let cVar1;
  let sVar2;
  let local_a24;
  let local_a14;
  let local_a04;
  let local_9f4;
  let local_9e4;
  let local_9d4;
  let local_9c4;
  let local_9b4;
  let local_9a4;
  let local_994;
  let local_984;
  let local_974;
  let local_964;
  let local_950;
  let local_940;
  let local_930;
  let local_920;
  let local_910;
  let local_8fc;
  let local_8f8;
  let local_8f4;
  let local_8f0;
  let local_8ec;
  let local_8d8;
  let local_8c8;
  let local_8b8;
  let local_784;
  let local_774;
  let local_764;
  let local_754;
  let local_744;
  let local_734;
  let local_730;
  let local_72c;
  let local_6c8;
  let local_6b8;
  let local_448;
  let local_438;
  let local_436;
  let local_332;
  let local_22c;
  let local_21c;
  let local_88;
  let local_84;
  let local_c;
  let local_8;

  local_c = 0;
  /* switch */ () {
  case 1 :
    FUN_0046d5f0(param_1, DAT_0062a78c);
    cVar1 = FUN_0046b0a1(DAT_ffffff7c);
    return s8(cVar1);
  case 2 :
    FUN_0046d720();
    local_88 = ((DAT_006ad640) & 0xFFFF);
    cVar1 = FUN_0046b0a1(DAT_fffffde4);
    return s8(cVar1);
  default :
    return 0;
  case 4 :
    FUN_0046d860();
    FID_conflict:_memcpy(DAT_fffff948, DAT_006ad308, 0x270);
    cVar1 = FUN_0046af70(param_2, DAT_fffff938);
    return s8(cVar1);
  case 5 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffffdd4);
    return s8(cVar1);
  case 6 :
    FUN_0046d8a0();
    local_438 = DAT_006ad6ac;
    FUN_005f22d0(DAT_fffffbca, DAT_006ad6ae);
    FUN_005f22d0(DAT_fffffcce, DAT_006ad7b2);
    cVar1 = FUN_0046af70(param_2, DAT_fffffbb8);
    return s8(cVar1);
  case 7 :
  case 8 :
  case 9 :
  case 10 :
    local_730 = 0;
    if ((param_1 === 7)) {
      local_734 = FUN_004b1a15(DAT_fffff8d0);
    }
    else if ((param_1 === 8)) {
      local_734 = FUN_004b1c11(DAT_fffff8d0);
    }
    else if ((param_1 === 9)) {
      local_734 = FUN_004b153c(DAT_fffff8d0);
    }
    else if ((param_1 === 0xa)) {
      local_734 = FUN_004b18e1(DAT_fffff8d0);
    }
    local_734 = u8((local_734 !== -1));
    if ((local_730 === 0)) {
      FUN_005dae6b(7, s_address_!=_NULL_0062a7b4, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a790, 0x22c);
    }
    local_730 = FUN_0059c0e1(param_1, local_730, local_734, 0, 0, 0, 0, 0, 0);
    cVar1 = FUN_0046af70(param_2, local_730);
    local_734 = s8(cVar1);
    operator_delete(local_730);
    return local_734;
  case 0xb :
  case 0xc :
  case 0xd :
  case 0xe :
  case 0xf :
  case 0x10 :
  case 0x11 :
  case 0x32 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff8bc);
    return s8(cVar1);
  case 0x12 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff87c);
    return s8(cVar1);
  case 0x13 :
    FUN_0046d8e0();
    cVar1 = FUN_0046af70(param_2, DAT_fffff748);
    return s8(cVar1);
  case 0x14 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff738);
    return s8(cVar1);
  case 0x15 :
  case 0x5c :
    cVar1 = FUN_0046af70(param_2, param_10);
    if ((cVar1 === 0)) {
      return 0;
    }
    return s32((param_10 + 8), 0);
  case 0x16 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff714);
    return s8(cVar1);
  case 0x17 :
    local_c = FUN_0059c0e1(param_1, DAT_0064bcc8, 0, 0, 0, 0, 0, 0, 0x29);
    break;
  case 0x18 :
    local_c = FUN_0059c0e1(param_1, DAT_00627680, 0, 0, 0, 0, 0, 0, 0x640);
    break;
  case 0x19 :
    local_c = FUN_0059c0e1(param_1, DAT_0064c488, 0, 0, 0, 0, 0, 0, 0x218);
    break;
  case 0x1a :
    local_c = FUN_0059c0e1(param_1, DAT_0064ba28, 0, 0, 0, 0, 0, 0, 0x1c);
    break;
  case 0x1b :
    local_c = FUN_0059c0e1(param_1, DAT_0064b1b8, 0, 0, 0, 0, 0, 0, 0x4d8);
    break;
  case 0x1c :
    local_c = FUN_0059c0e1(param_1, DAT_00627cc0, 0, 0, 0, 0, 0, 0, 0x318);
    break;
  case 0x1d :
    local_c = FUN_0059c0e1(param_1, DAT_0064b9a0, 0, 0, 0, 0, 0, 0, 0x1c);
    break;
  case 0x1e :
    local_c = FUN_0059c0e1(param_1, DAT_00654fe0, 0, 0, 0, 0, 0, 0, 0x38);
    break;
  case 0x1f :
    local_c = FUN_0059c0e1(param_1, DAT_006554f8, 0, 0, 0, 0, 0, 0, 0x3f0);
    break;
  case 0x20 :
    local_c = FUN_0059c0e1(param_1, DAT_0064c6a0, 0, 0, 0, 0, 0, 0, 0x7524);
    break;
  case 0x21 :
    local_c = FUN_0059c0e1(param_1, DAT_0064b168, 0, 0, 0, 0, 0, 0, 0x40);
    break;
  case 0x22 :
    local_c = FUN_0059c0e1(param_1, DAT_00655490, 0, 0, 0, 0, 0, 0, 0x68);
    break;
  case 0x23 :
    local_c = FUN_0059c0e1(param_1, DAT_0064ba10, 0, 0, 0, 0, 0, 0, 0x18);
    break;
  case 0x24 :
    local_c = FUN_0059c0e1(param_1, DAT_0064b9c0, 0, 0, 0, 0, 0, 0, 0x24);
    break;
  case 0x25 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x26 :
  case 0x27 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff63c);
    return s8(cVar1);
  case 0x28 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x2a :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    wv(DAT_006c9088, (DAT_006c9088 + 1));
    break;
  case 0x2b :
  case 0x2c :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff5ec);
    return s8(cVar1);
  case 0x2d :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x2e :
    cVar1 = FUN_0046af70(param_2, DAT_006ad110);
    return s8(cVar1);
  case 0x2f :
    FUN_0046d780(param_3);
    cVar1 = FUN_0046af70(param_2, DAT_fffff8d4);
    return s8(cVar1);
  case 0x30 :
    if ((DAT_006ad2f7 === 0)) {
      local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
      break;
    }
    if ((((1 << (((param_4) & 0xFF) & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) === 0)) {
      wv(DAT_00654fb0, (DAT_00654fb0 | (((1 << (((param_4) & 0xFF) & 0x1f))) & 0xFFFF)));
      FUN_0046b14d(0x2a, 0xff, (((DAT_00654fb0 | (((1 << (((param_4) & 0xFF) & 0x1f))) & 0xFFFF))) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
      wv(DAT_006c9078, (DAT_006c9078 + 1));
      return 1;
    }
    wv(DAT_006c907c, (DAT_006c907c + 1));
  case 0x31 :
    if ((DAT_006ad2f7 !== 0)) {
      wv(DAT_00655b0b, (DAT_00655b0b & ((DAT_00654fb0) & 0xFF)));
      if ((((1 << (((param_4) & 0xFF) & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) !== 0)) {
        wv(DAT_00654fb0, (DAT_00654fb0 & (~(((1 << (((param_4) & 0xFF) & 0x1f))) & 0xFFFF))));
        wv(DAT_00655b0b, ((DAT_00655b0b & ((DAT_00654fb0) & 0xFF)) & (((DAT_00654fb0 & (~(((1 << (((param_4) & 0xFF) & 0x1f))) & 0xFFFF)))) & 0xFF)));
        FUN_0046b14d(0x2a, 0xff, (((DAT_00654fb0 & (~(((1 << (((param_4) & 0xFF) & 0x1f))) & 0xFFFF)))) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
        wv(DAT_006c9088, (DAT_006c9088 + 1));
      }
      return 1;
    }
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x33 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x34 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x35 :
  case 0x81 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff6b0);
    return s8(cVar1);
  case 0x37 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x38 :
    local_c = FUN_0059c0e1(param_1, (DAT_006560f0 + param_3 * 0x20), param_3, ((DAT_00655b16) << 16 >> 16), param_5, param_6, param_7, param_8, 0x20);
    break;
  case 0x39 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x3a :
    local_c = FUN_0059c0e1(param_1, (DAT_0064f340 + param_3 * 0x58), param_3, ((DAT_00655b18) << 16 >> 16), param_5, param_6, param_7, param_8, 0x58);
    break;
  case 0x3b :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x3c :
    if ((param_3 === -1)) {
      local_c = FUN_0059c0e1(param_1, 0, -1, 0, 0, 0, 0, 0, 0);
    }
    else {
      local_c = FUN_0059c0e1(param_1, (DAT_0064f340 + param_3 * 0x58), param_3, ((DAT_00655b18) << 16 >> 16), param_5, param_6, param_7, param_8, 0x58);
    }
    break;
  case 0x3d :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x3e :
    if ((param_3 === -1)) {
      local_c = FUN_0059c0e1(param_1, 0, -1, 0, 0, 0, 0, 0, 0);
    }
    else {
      local_c = FUN_0059c0e1(param_1, (DAT_006560f0 + param_3 * 0x20), param_3, ((DAT_00655b16) << 16 >> 16), param_5, param_6, param_7, param_8, 0x20);
    }
    break;
  case 0x3f :
  case 0x4b :
  case 0x4d :
  case 0x4f :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x40 :
  case 0x4c :
  case 0x4e :
  case 0x50 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff67c);
    return s8(cVar1);
  case 0x41 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x42 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff66c);
    return s8(cVar1);
  case 0x43 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x44 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff65c);
    return s8(cVar1);
  case 0x45 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x46 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff64c);
    return s8(cVar1);
  case 0x47 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x48 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x49 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x4a :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x51 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x52 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x53 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x54 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x55 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x56 :
  case 0x57 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x58 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff60c);
    return s8(cVar1);
  case 0x59 :
    local_c = FUN_0059c0e1(param_1, DAT_006d1190, 0, 0, 0, 0, 0, 0, (DAT_006365f4 << 2));
    break;
  case 0x5a :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, param_8, 0);
    break;
  case 0x5b :
  case 0x65 :
  case 0x66 :
  case 0xa3 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff5dc);
    return s8(cVar1);
  case 0x5d :
  case 0x5e :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff728);
    return s8(cVar1);
  case 0x5f :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x60 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x61 :
  case 0x62 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 99 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 100 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x68 :
    sVar2 = _strlen(param_9);
    local_c = FUN_0059c0e1(param_1, param_9, param_3, param_4, param_5, 0, 0, 0, (sVar2 + 1));
    break;
  case 0x69 :
    FUN_0046d930(param_3);
    _DAT_0066c990 = -1;
    FUN_00552112();
    local_8fc = DAT_0066ca54;
    local_8f8 = DAT_0066ca58;
    local_8f4 = DAT_0066ca5c;
    local_8f0 = DAT_0066ca68;
    FUN_00408490(DAT_fffff704);
    cVar1 = FUN_0046af70(param_2, DAT_fffff6f0);
    return s8(cVar1);
  case 0x6a :
    local_c = FUN_0059c0e1(param_1, param_10, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x6b :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x6c :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x6d :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff8ac);
    return s8(cVar1);
  case 0x6e :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff89c);
    return s8(cVar1);
  case 0x6f :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff88c);
    return s8(cVar1);
  case 0x70 :
    local_c = FUN_0059c0e1(param_1, (DAT_006560f0 + param_3 * 0x20), param_3, param_4, param_5, param_6, param_7, param_8, 0x20);
    break;
  case 0x71 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x72 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x73 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x74 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff6e0);
    return s8(cVar1);
  case 0x75 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x76 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x77 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x78 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff6d0);
    return s8(cVar1);
  case 0x79 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff6c0);
    return s8(cVar1);
  case 0x7a :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x7b :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x7c :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x7d :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x7e :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x7f :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x80 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x82 :
    cVar1 = FUN_0046af70(param_2, param_10);
    if ((cVar1 === 0)) {
      return 0;
    }
    return s32((param_10 + 8), 0);
  case 0x83 :
  case 0x84 :
  case 0x85 :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff69c);
    return s8(cVar1);
  case 0x86 :
    cVar1 = FUN_0046af70(param_2, param_10);
    if ((cVar1 === 0)) {
      return 0;
    }
    return s32((param_10 + 8), 0);
  case 0x87 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x88 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x89 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x8a :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff68c);
    return s8(cVar1);
  case 0x8b :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff62c);
    return s8(cVar1);
  case 0x8c :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x8d :
  case 0x8e :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff61c);
    return s8(cVar1);
  case 0x8f :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0x90 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x91 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x92 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, 0, 0);
    break;
  case 0x93 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x94 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x95 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x96 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x97 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, param_7, param_8, 0);
    break;
  case 0x98 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, 0, 0, 0, 0);
    break;
  case 0x99 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x9a :
  case 0xa0 :
  case 0xa1 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0x9b :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, param_5, param_6, 0, 0, 0);
    break;
  case 0x9c :
  case 0x9d :
  case 0x9e :
    FUN_0046d5a0(param_1);
    cVar1 = FUN_0046af70(param_2, DAT_fffff5fc);
    return s8(cVar1);
  case 0x9f :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0xa2 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, 0, 0, 0, 0, 0, 0);
    break;
  case 0xa4 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0xa5 :
  case 0xa6 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
    break;
  case 0xa7 :
  case 0xa8 :
    local_c = FUN_0059c0e1(param_1, 0, param_3, param_4, 0, 0, 0, 0, 0);
  }
  if ((local_c === 0)) {
    FUN_005dae6b(7, s_address_0062a7e8, s_D:\Ss\Franklinton\NetMgr_Send.cp_0062a7c4, 0x523);
    local_8 = 0;
  }
  else {
    cVar1 = FUN_0046af70(param_2, local_c);
    local_8 = s8(cVar1);
    operator_delete(local_c);
  }
  return local_8;
}


 export function FUN_0046d5a0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 2, 0x10);
  w32(in_ECX, 0, 0x66606660);
  w32(in_ECX, 1, param_1);
  return in_ECX;
}


 export function FUN_0046d5f0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_0046d6a0(0);
  w32((in_ECX + 0x70), 0, param_1);
  _memset((in_ECX + 0x30), 0, 0x20);
  _strncpy((in_ECX + 0x30), param_2, 0x20);
  _memset((in_ECX + 0x50), 0, 0x20);
  _strncpy((in_ECX + 0x50), DAT_006665b0, 0x20);
  w32((in_ECX + 8), 0, 0x74);
  return in_ECX;
}


 export function FUN_0046d6a0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(param_1);
  _memset((in_ECX + 0x10), 0, 0x20);
  _strncpy((in_ECX + 0x10), DAT_006665b0, 0x20);
  w32((in_ECX + 8), 0, 0x30);
  return in_ECX;
}


 export function FUN_0046d720 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5f0(2, DAT_0062af0c);
  FUN_0059c31f((in_ECX + 0x74));
  w32((in_ECX + 8), 0, 0x198);
  return in_ECX;
}


 export function FUN_0046d780 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(0x2f);
  w32((in_ECX + 0x10), 0, param_1);
  _memset((in_ECX + 0x14), 0, 0x20);
  _strncpy((in_ECX + 0x14), DAT_006665b0, 0x20);
  FUN_005f22d0((in_ECX + 0x34), DAT_00666570);
  w32((in_ECX + 0x54), 0, 0);
  w32((in_ECX + 0x58), 0, 0);
  _MEM[(in_ECX + 0x5c)] = 0;
  _MEM[(in_ECX + 0x5d)] = 0;
  w32((in_ECX + 0x60), 0, -1);
  w32((in_ECX + 8), 0, 0x64);
  return in_ECX;
}


 export function FUN_0046d860 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(4);
  w32((in_ECX + 8), 0, 0x280);
  return in_ECX;
}


 export function FUN_0046d8a0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(6);
  w32((in_ECX + 8), 0, 0x21c);
  return in_ECX;
}


 export function FUN_0046d8e0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(0x13);
  FUN_0059c31f((in_ECX + 0x10));
  w32((in_ECX + 8), 0, 0x134);
  return in_ECX;
}


 export function FUN_0046d930 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0046d5a0(0x69);
  w32((in_ECX + 0x10), 0, param_1);
  w32((in_ECX + 8), 0, 0x14);
  return in_ECX;
}


 export function FUN_0046d980 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let puVar7;

  puVar7 = DAT_006a8c00;
  uVar6 = 0x64;
  uVar5 = 0x100;
  uVar4 = 0;
  uVar3 = 0;
  uVar2 = 0x69;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 8), 0), 0x69, 0, 0, 0x100, 0x64, DAT_006a8c00);
  FUN_005bb3f0(uVar1, uVar2, uVar3, uVar4, uVar5, uVar6, puVar7);
  FUN_00484d52();
  FUN_00450400();
  FUN_005c041f(9);
  FUN_005c19ad(0);
  uVar4 = 0;
  uVar3 = 0x32;
  uVar2 = 0x80;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + param_2 * 4), 0), 0x80, 0x32, 0);
  FUN_005c0d69(uVar1, uVar2, uVar3, uVar4);
  FUN_004085f0();
  FUN_00419b80();
  return;
}


 export function FUN_0046da40 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_acc;
  let local_a4c;
  let local_a04;
  let local_9f4;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0046ddc8;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005dd010();
  local_8 = 0;
  FUN_0044c730();
  local_8 = 1;
  FUN_005c64da();
  local_8 = 2;
  FUN_004502b0();
  local_8 = 3;
  FUN_005bcaa7(DAT_ffffffdc);
  wv(DAT_0062af14, DAT_fffff5b4);
  FUN_004aef20(DAT_fffff534);
  FUN_0043c840(DAT_fffff534, s_civ2\civ2art.dll_0062af18);
  iVar1 = FUN_00564713(DAT_fffff534);
  if ((iVar1 === 0)) {
    local_8 = 2;
    FUN_0046dd98();
    local_8 = 1;
    FUN_0046dda4();
    local_8 = (((local_8) >> 8) << 8);
    FUN_0046ddb0();
    local_8 = -1;
    FUN_0046ddbc();
    FUN_0046ddd2();
    return;
  }
  FUN_004502e0(DAT_fffff534);
  FUN_004aef20(DAT_fffff534);
  FUN_0043c840(DAT_fffff534, s_civ2\video\opening.avi_0062af2c);
  iVar1 = FUN_00564713(DAT_fffff534);
  if ((iVar1 === 0)) {
    local_8 = 2;
    FUN_0046dd98();
    local_8 = 1;
    FUN_0046dda4();
    local_8 = (((local_8) >> 8) << 8);
    FUN_0046ddb0();
    local_8 = -1;
    FUN_0046ddbc();
    FUN_0046ddd2();
    return;
  }
  FUN_005c5f20(DAT_0062af44, 0x800, 0, 0, local_1c, (local_18 + 5), DAT_006a8c00);
  FUN_00419ba0(0);
  wv(DAT_0062af14, DAT_fffff5b4);
  FUN_005dd27e(DAT_0062af48, 0x800, 0, 0);
  FUN_00408130(FUN_0046dea1);
  local_9f4 = DAT_fffff60c;
  local_a4c = DAT_fffff5b4;
  FUN_005dd71e(1);
  local_14 = FUN_005dd377(DAT_fffff534);
  if ((local_14 !== 0)) {
    if ((local_14 === -0x7ffbfeac)) {
      FUN_00421ea0(s_VFWNOTREGISTERED_0062af4c);
    }
    wv(DAT_0062af14, 0);
    local_8 = 2;
    FUN_0046dd98();
    local_8 = 1;
    FUN_0046dda4();
    local_8 = (UNNAMED << 8);
    FUN_0046ddb0();
    local_8 = -1;
    FUN_0046ddbc();
    FUN_0046ddd2();
    return;
  }
  FUN_005c041f(0);
  FUN_00450400();
  FUN_00408650();
  FUN_00419b80();
  FUN_004085f0();
  FUN_00419b80();
  FUN_005dd3c2();
  FUN_00414ce0();
  if ((2 < DAT_00655b02)) {
    local_a04 = DAT_fffff5fc;
  }
  FUN_005c61b0();
  local_a04 = DAT_fffff5fc;
  FUN_00414d40();
  FUN_005dd51d();
  FUN_004503d0();
  FUN_00419b80();
  FUN_004503d0();
  wv(DAT_0062af14, 0);
  FUN_00450340();
  local_8 = 2;
  FUN_0046dd98();
  local_8 = 1;
  FUN_0046dda4();
  local_8 = (UNNAMED << 8);
  FUN_0046ddb0();
  local_8 = -1;
  FUN_0046ddbc();
  FUN_0046ddd2();
  return;
}


 export function FUN_0046dd98 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0xacc);
  return;
}


 export function FUN_0046dda4 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0046ddb0 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_0046ddbc ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_0046ddd2 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0046dde0 ()

 {
  if ((DAT_0062af14 !== 0)) {
    wv(DAT_0062af14, (DAT_0062af14 + 0x48));
    wv(DAT_0062af10, 1);
    FUN_0046e020(0x6b, 0, 1, 0);
  }
  return;
}


 export function FUN_0046de25 (param_1)

 {
  if ((param_1 < 0xd3)) {
    FUN_0046e020(0x6b, 0, 1, 0);
    wv(DAT_0062af10, 1);
    if ((DAT_0062af14 !== 0)) {
      wv(DAT_0062af14, (DAT_0062af14 + 0x48));
    }
  }
  return;
}


 export function FUN_0046dea1 ()

 {
  if ((DAT_0062af14 !== 0)) {
    wv(DAT_0062af14, (DAT_0062af14 + 0x48));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x114), 0, param_1);
  return;
}


 export function FUN_0046e020 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let pcVar2;
  let local_118;
  let local_108;
  let local_88;
  let local_8;

  wv(DAT_0066bfc4, param_1);
  wv(DAT_0066bfc0, param_2);
  if ((param_1 < 0)) {
    FUN_005d61ab(((~param_1) + 1));
  }
  else if ((param_1 < 0x85)) {
    FUN_005f22d0(DAT_fffffee8, (s_AIRCOMBT_0062af70 + param_1 * 9));
    iVar1 = _strcmp(DAT_fffffee8, s_CHEERS_0062b430);
    if ((iVar1 === 0)) {
      iVar1 = FUN_0059a791(0, 2);
      FUN_004af1d5(DAT_fffffee8, (iVar1 + 1));
    }
    FUN_005f22e0(DAT_fffffee8, DAT_0062b438);
    FUN_004aef20(DAT_fffffef8);
    FUN_0043c840(DAT_fffffef8, s_CIV2\SOUND\_0062b440);
    FUN_0043c840(DAT_fffffef8, DAT_fffffee8);
    FUN_004aef20(DAT_ffffff78);
    FUN_0043c840(DAT_ffffff78, DAT_0064bb08);
    FUN_0043c840(DAT_ffffff78, s_\SOUND\_0062b44c);
    FUN_0043c840(DAT_ffffff78, DAT_fffffee8);
    iVar1 = FUN_00415133(DAT_ffffff78);
    if ((iVar1 === 0)) {
      pcVar2 = FUN_00564574();
      iVar1 = FUN_00564713(DAT_fffffef8);
      if ((iVar1 === 0)) {
        return;
      }
      if ((UNNAMED === _MEM[pcVar2])) {
        return;
      }
    }
    else {
      FUN_005f22d0(DAT_fffffef8, DAT_ffffff78);
    }
    local_8 = 3;
    if ((param_2 === 0)) {
      local_8 = 0x13;
    }
    if ((param_3 !== 0)) {
      local_8 = (local_8 | 8);
    }
    if ((param_2 === 0x63)) {
      FUN_006e7fb0(DAT_fffffef8, local_8);
    }
    else {
      FUN_005d6038(DAT_fffffef8, (((param_3 === 0) - 1) & 8), param_1, param_4);
    }
    FUN_00407ff0();
  }
  return;
}


 export function FUN_0046e287 (param_1)

 {
  let DVar1;
  let DVar2;

  DVar1 = FUN_006e7f58();
  do {
    FUN_00407ff0();
    DVar2 = FUN_006e7f58();
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
  } while (((DVar2 - DVar1) < (param_1 * 0x32 / 3 | 0)));
  return;
}


 export function FUN_0046e2f4 ()

 {
  wv(DAT_0062b420, 1);
  if ((DAT_0062b42c !== 0)) {
    FUN_0046e6c8();
  }
  return;
}


 export function FUN_0046e320 ()

 {
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  while ((local_8 < 0xa)) {
    local_8 = (local_8 + 1);
    local_c = FUN_005ddeff();
    if ((local_c === 0xa)) {
    wv(DAT_0062b420, 0);
  }
  else {
    while ((local_10 !== DAT_0062b428)) {
      if ((local_c === 0xc)) {
        if (((local_c === 4) || ((local_c + -4) < 0))) {
          local_18 = 0;
        }
        else {
          local_18 = _rand();
          local_18 = (local_18 % (local_c + -3));
        }
        local_10 = (local_18 + 4);
        wv(DAT_0062b424, 0);
      }
      else {
        if (((local_c === 2) || ((local_c + -2) < 0))) {
          local_14 = 0;
        }
        else {
          local_14 = _rand();
          local_14 = (local_14 % (local_c + -1));
        }
        local_10 = (local_14 + 2);
        wv(DAT_0062b424, 1);
      }
      if ((local_10 !== DAT_0062b428));
    }
    wv(DAT_0062b420, 0);
    wv(DAT_0062b428, local_10);
    wv(DAT_0062b42c, 1);
    FUN_005ddbc7(local_10);
  }
  return;
}


 export function FUN_0046e4a9 ()

 {
  let iVar1;

  FUN_005de6fc(LAB_00403120);
  iVar1 = FUN_005ddeff();
  if ((iVar1 === 1)) {
    wv(DAT_0062b420, 0);
  }
  else if ((iVar1 === 0xc)) {
    wv(DAT_0062b42c, 1);
    wv(DAT_0062b420, 1);
    wv(DAT_0062b424, 0);
  }
  else {
    wv(DAT_0062b42c, 1);
    wv(DAT_0062b420, 1);
    wv(DAT_0062b424, 1);
  }
  return;
}


 export function FUN_0046e571 (param_1, param_2)

 {
  let local_c;
  let local_8;

  if (((DAT_00655aea & 8) === 0)) {
    if ((DAT_0062b420 === 0)) {
      FUN_0046e6a9();
    }
  }
  else if ((DAT_0062b424 === 0)) {
    local_8 = 0;
    while ((local_8 < 0xa)) {
      local_8 = (local_8 + 1);
      local_c = FUN_005ddeff();
      if ((local_c === 0xa)) {
      wv(DAT_0062b420, 0);
    }
    else {
      wv(DAT_0062b42c, 0);
      FUN_005dde9d();
      FUN_005de6fc(LAB_00403120);
      FUN_005ddbc7(param_1);
      wv(DAT_0062b428, param_1);
      wv(DAT_0062b42c, 1);
      wv(DAT_0062b420, 0);
    }
  }
  return;
}


 export function FUN_0046e6a9 ()

 {
  FUN_005dde9d();
  wv(DAT_0062b420, 1);
  return;
}


 export function FUN_0046e6c8 ()

 {
  if (((DAT_00655aea & 8) === 0)) {
    if ((DAT_0062b420 === 0)) {
      FUN_0046e6a9();
    }
  }
  else if ((DAT_0062b420 !== 0)) {
    FUN_0046e320();
  }
  return;
}


 export function FUN_0046e8f0 (param_1)

 {
  let cVar1;
  let _C;
  let iVar2;
  let local_8;

  local_8 = 0;
  while ((_MEM[param_1] !== 0)) {
    cVar1 = _MEM[param_1];
    param_1 = (param_1 + 1);
    _C = FID_conflict:__toupper_lk(s8(cVar1));
    iVar2 = _isdigit(_C);
    if ((iVar2 === 0)) {
      if ((0x46 < _C)) {
        for (/* cond: (_MEM[param_1] !== 0) */); param_1 = _MEM[param_1]; param_1 = (param_1 + 1)) {
        }
      }
      else {
        local_8 = (local_8 * 0x10 + (_C + -55));
      }
    }
    else {
      local_8 = (local_8 * 0x10 + (_C + -48));
    }
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
  FUN_0046e9ea();
  FUN_0046ea04();
  return;
}


 export function FUN_0046e9ea ()

 {
  FUN_005c64da();
  return;
}


 export function FUN_0046ea04 ()

 {
  _atexit(FUN_0046ea21);
  return;
}


 export function FUN_0046ea21 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0046ea3b ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let plpal;
  let h;
  let iVar4;
  let iVar5;
  let UVar6;
  let local_24;

  iVar1 = FUN_005dce4f(0x2c4);
  if ((iVar1 === 0)) {
    FUN_005dae6b(7, s_handle_fullcolors_0062b56c, s_D:\Ss\Franklinton\Grey.cpp_0062b550, 0x22);
  }
  else {
    iVar2 = FUN_005dcdf9(iVar1);
    FUN_005c6b63(iVar2, 0xa, 0x20);
    iVar3 = FUN_005dce4f(0x88);
    if ((iVar3 === 0)) {
      FUN_005dae6b(7, s_hLocPal_0062b59c, s_D:\Ss\Franklinton\Grey.cpp_0062b580, 0x2a);
      FUN_005dce29(iVar1);
      FUN_005dce96(iVar1);
    }
    else {
      plpal = FUN_005dcdf9(iVar3);
      w16(DAT_00000000, 0, 0x300);
      w16(DAT_00000002, 0, 0x20);
      for (/* cond: (local_24 < 0x60) */); local_24 = (local_24 < 0x60); local_24 = (local_24 + 3)) {
        _MEM[DAT_00000000] = _MEM[(local_24 + iVar2)];
        _MEM[DAT_00000001] = _MEM[((local_24 + 1) + iVar2)];
        _MEM[DAT_00000002] = _MEM[((local_24 + 2) + iVar2)];
        _MEM[DAT_00000003] = 4;
      }
      h = FUN_006e7a8c(plpal);
      if ((h === 0)) {
        FUN_005dae6b(7, s_handle_palette_0062b5c0, s_D:\Ss\Franklinton\Grey.cpp_0062b5a4, 0x3e);
        FUN_005dce29(iVar1);
        FUN_005dce96(iVar1);
      }
      else {
        FUN_005dce29(iVar3);
        FUN_005dce96(iVar3);
        iVar3 = FUN_005dce4f(0x2c4);
        if ((iVar3 === 0)) {
          FUN_005dae6b(7, s_handle_colors_0062b5ec, s_D:\Ss\Franklinton\Grey.cpp_0062b5d0, 0x48);
          FUN_005dce29(iVar1);
          FUN_005dce96(iVar1);
        }
        else {
          iVar4 = FUN_005dcdf9(iVar3);
          wv(DAT_0066c408, FUN_005dce4f(0xec));
          if ((FUN_005dce4f(0xec) === 0)) {
            FUN_005dae6b(7, s_handle_grey_0062b618, s_D:\Ss\Franklinton\Grey.cpp_0062b5fc, 0x51);
            FUN_005dce29(iVar1);
            FUN_005dce96(iVar1);
            FUN_005dce29(iVar3);
            FUN_005dce96(iVar3);
          }
          else {
            iVar5 = FUN_005dcdf9(FUN_005dce4f(0xec));
            FUN_005c6b63(iVar4, 0xa, 0xec);
            for (/* cond: (local_24 < 0x2c4) */); local_24 = (local_24 < 0x2c4); local_24 = (local_24 + 3)) {
              UVar6 = FUN_006e7a90(h, ((_MEM[((local_24 + 2) + iVar4)] << 16) | ((_MEM[((local_24 + 1) + iVar4)] << 8) | _MEM[(local_24 + iVar4)])));
              _MEM[(iVar5 + (local_24 / 3 | 0))] = (((UVar6) & 0xFF) + 0xa);
              FUN_005c6b93(((local_24 / 3 | 0) + 0xa), (((UVar6 * 3 >>> 8) << 8) | _MEM[(UVar6 * 3 + iVar2)]), (((UVar6 * 3 >>> 8) << 8) | _MEM[((UVar6 * 3 + 1) + iVar2)]), (((UVar6 * 3 >>> 8) << 8) | _MEM[((UVar6 * 3 + 2) + iVar2)]));
            }
            FUN_006e7a94(h);
            FUN_005dce29(iVar3);
            FUN_005dce96(iVar3);
            FUN_005dce29(iVar1);
            FUN_005dce96(iVar1);
            FUN_005dce29(DAT_0066c408);
          }
        }
      }
    }
  }
  return;
}


 export function FUN_0046ee1e ()

 {
  if ((DAT_0066c408 !== 0)) {
    wv(DAT_0066c408, FUN_005dce96(DAT_0066c408));
  }
  return;
}


 export function FUN_0046ee4e ()

 {
  let iVar1;
  let local_c;

  iVar1 = FUN_005dcdf9(DAT_0066c408);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((s16((DAT_0066ca84 + local_c * 0x3f0), 0) !== 0)) {
        FUN_005c1a62(iVar1, 0xa, 0xec);
      }
    }
    FUN_005c1a62(iVar1, 0xa, 0xec);
    FUN_005c1a62(iVar1, 0xa, 0xec);
    FUN_005c1a62(iVar1, 0xa, 0xec);
    FUN_005dce29(DAT_0066c408);
    FUN_0046f18f();
  }
  return;
}


 export function FUN_0046ef3f ()

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_005bb574();
    }
  }
  FUN_005bb574();
  FUN_005bb574();
  FUN_005bb574();
  FUN_00419b80();
  return;
}


 export function FUN_0046efd6 ()

 {
  let local_8;

  wv(DAT_0062804c, 0);
  if ((DAT_00638b48 !== 0)) {
    FUN_005c71f3(0xa, 0xec, 0xa, DAT_0066bfd0);
    FUN_0046f18f();
    local_8 = 0xa;
    while ((-1 < local_8)) {
      FUN_005c738e(local_8);
      FUN_0046e287(1);
      local_8 = (local_8 + -1);
    }
    FUN_0046f108();
    FUN_0046ee4e();
    FUN_005c72f8();
    FUN_0046f108();
  }
  return;
}


 export function FUN_0046f06f ()

 {
  let local_8;

  if ((DAT_00638b48 !== 0)) {
    FUN_005c71f3(0xa, 0xec, 0xa, DAT_0066bfd0);
    FUN_005c738e(0);
    FUN_0046ef3f();
    FUN_0046f18f();
    local_8 = 0;
    while ((local_8 < 0xb)) {
      FUN_005c738e(local_8);
      FUN_0046e287(1);
      local_8 = (local_8 + 1);
    }
    FUN_005c72f8();
    FUN_0046f108();
  }
  return;
}


 export function FUN_0046f108 ()

 {
  let iVar1;
  let local_c;

  iVar1 = FUN_0046f440();
  if ((iVar1 === 0)) {
    FUN_005dae6b(7, DAT_0062b640, s_D:\Ss\Franklinton\Grey.cpp_0062b624, 0xbc);
  }
  for (/* cond: (local_c < 0x100) */); local_c = (local_c < 0x100); local_c = (local_c + 1)) {
    _MEM[((iVar1 + 7) + local_c * 4)] = 4;
  }
  FUN_005c6480(0xa, 0xec);
  return;
}


 export function FUN_0046f18f ()

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_00408460();
    }
  }
  FUN_00408460();
  FUN_00408460();
  FUN_00408460();
  FUN_00419b80();
  return;
}


 export function FUN_0046f440 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return in_ECX;
}


 export function FUN_0046f460 (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let sVar2;
  let uVar3;
  let iVar4;
  let local_468;
  let local_464;
  let local_460;
  let local_45c;
  let local_456;
  let local_454;
  let local_444;
  let local_43c;
  let local_438;
  let local_434;
  let local_430;
  let local_42c;
  let local_428;
  let local_424;
  let local_420;
  let local_41c;
  let local_40c;
  let local_408;
  let local_404;
  let auStack_402;

  local_408 = DAT_0062b674;
  local_438 = 0;
  local_43c = __fsopen(param_2, DAT_0062b678, 0x40);
  if ((local_43c === 0)) {
    local_438 = 0;
  }
  else {
    sVar2 = _fread(DAT_fffffbe4, 0xe, 1, local_43c);
    if ((sVar2 === 0)) {
      local_408 = s_Error_reading_file_header_0062b67c;
    }
    else if (((UNNAMED & 0xffff) === 0x4d42)) {
      sVar2 = _fread(DAT_fffffb9c, 4, 1, local_43c);
      if ((sVar2 === 0)) {
        local_408 = s_Error_reading_info_header_0062b6ac;
      }
      else {
        sVar2 = _fread(DAT_fffffbfc, 0x400, 1, local_43c);
        if ((sVar2 === 0)) {
          local_408 = s_Error_reading_file_palette_0062b6c8;
        }
        else if ((local_456 === 8)) {
          local_438 = 1;
          if ((param_5 !== 0)) {
            iVar4 = param_4;
            if ((param_4 <= local_444)) {
              iVar4 = param_4;
            }
            param_4 = iVar4;
            if ((0x100 < (param_4 + param_3))) {
              param_4 = (0x100 - param_3);
            }
            local_434 = 0;
            for (/* cond: (local_430 < (param_4 + param_3)) */); local_430 = (local_430 < (param_4 + param_3)); local_430 = (local_430 + 1)) {
              uVar3 = FUN_0046f440(local_430, s32((DAT_fffffbfc + (local_434 * 4 + 2)), 0), s32((DAT_fffffbfc + (local_434 * 4 + 1)), 0), s32((DAT_fffffbfc + local_434 * 4), 0));
              FUN_005deb12(uVar3);
              local_434 = (local_434 + 1);
            }
            FUN_005c6480(param_3, param_4);
          }
          FUN_005bd65c(local_460, local_45c);
          cVar1 = ((param_3) & 0xFF);
          if ((local_454 === 0)) {
            do {
              local_42c = (local_45c + -1);
              if ((local_438 === 0));
              for (/* cond: (local_428 < local_460) */); local_45c = local_42c, local_428 = (local_428 < local_460);
                  local_428 = (local_428 + 1)) {
                w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                if ((s32(DAT_00000004, 0) < 0)) {
                  local_40c = __filbuf(local_43c);
                }
                else {
                  local_40c = u8(_MEM[s32(DAT_00000000, 0)]);
                  w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                }
                if ((local_40c === -1)) {
                  local_408 = s_Error_reading_bitmap_image_0062b704;
                  local_438 = 0;
                  local_45c = local_42c;
                  break;
                }
                _MEM[local_420] = (((local_40c) & 0xFF) + cVar1);
                local_420 = (local_420 + 1);
              }
            } while ( true );
          }
          if ((local_454 === 1)) {
            local_42c = (local_45c + -1);
            local_420 = FUN_005c19d3(0, local_42c);
            while ((local_40c === -1)) {
              w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
              if ((s32(DAT_00000004, 0) < 0)) {
                local_40c = __filbuf(local_43c);
              }
              else {
                local_40c = u8(_MEM[s32(DAT_00000000, 0)]);
                w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
              }
              if ((local_40c === -1)) {
                w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                if ((s32(DAT_00000004, 0) < 0)) {
                  local_40c = __filbuf(local_43c);
                }
                else {
                  local_40c = u8(_MEM[s32(DAT_00000000, 0)]);
                  w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                }
                if ((local_40c === 0)) {
                  local_42c = (local_42c + -1);
                  local_420 = FUN_005c19d3(0, local_42c);
                }
                else {
                  if ((local_40c === 1)) {
                    w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                    if ((s32(DAT_00000004, 0) < 0)) {
                      iVar4 = __filbuf(local_43c);
                      local_42c = (local_42c - iVar4);
                    }
                    else {
                      local_42c = (local_42c - u8(_MEM[s32(DAT_00000000, 0)]));
                      w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                    }
                    w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                    if ((s32(DAT_00000004, 0) < 0)) {
                      iVar4 = __filbuf(local_43c);
                      local_428 = (local_428 + iVar4);
                    }
                    else {
                      local_428 = (local_428 + u8(_MEM[s32(DAT_00000000, 0)]));
                      w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                    }
                    local_420 = FUN_005c19d3(local_428, local_42c);
                  }
                  else {
                    for (/* cond: (local_430 < local_40c) */); local_430 = (local_430 < local_40c); local_430 = (local_430 + 1)) {
                      w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                      if ((s32(DAT_00000004, 0) < 0)) {
                        iVar4 = __filbuf(local_43c);
                        local_468 = ((iVar4) & 0xFF);
                      }
                      else {
                        local_468 = _MEM[s32(DAT_00000000, 0)];
                        w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                      }
                      _MEM[local_420] = (local_468 + cVar1);
                      local_420 = (local_420 + 1);
                    }
                    if (((local_40c & 1) !== 0)) {
                      w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                      if ((s32(DAT_00000004, 0) < 0)) {
                        __filbuf(local_43c);
                      }
                      else {
                        w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                      }
                    }
                    local_428 = (local_428 + local_40c);
                  }
                }
              }
              else {
                w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
                if ((s32(DAT_00000004, 0) < 0)) {
                  local_424 = __filbuf(local_43c);
                }
                else {
                  local_424 = u8(_MEM[s32(DAT_00000000, 0)]);
                  w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
                }
                for (/* cond: (local_430 < local_40c) */); local_430 = (local_430 < local_40c); local_430 = (local_430 + 1)) {
                  _MEM[local_420] = (cVar1 + ((local_424) & 0xFF));
                  local_420 = (local_420 + 1);
                }
                local_428 = (local_428 + local_40c);
              }
            }
          }
          else if ((local_454 === 2)) {
            local_438 = 0;
            local_408 = s_Incompatable_compression_mode_(B_0062b720;
          }
        }
        else {
          local_408 = s_Image_not_640_x_480_x_256_color_0062b6e4;
        }
      }
    }
    else {
      local_408 = s_Invalid_bitmap_file_0062b698;
    }
 LAB_0046fbb4: :
    _fclose(local_43c);
    if ((local_438 === 0)) {
      FUN_006e7dd4(0, local_408, 0, 0);
    }
  }
  return local_438;
}


 export function FUN_0046fbf3 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let sVar2;
  let iVar3;
  let local_460;
  let local_45c;
  let local_458;
  let local_454;
  let local_452;
  let local_450;
  let local_44c;
  let local_448;
  let local_444;
  let local_440;
  let local_43c;
  let local_438;
  let local_434;
  let local_430;
  let local_42c;
  let local_428;
  let local_424;
  let local_420;
  let local_41c;
  let local_41a;
  let local_416;
  let local_414;
  let local_412;
  let local_40c;
  let local_408;
  let local_404;

  local_434 = 0;
  local_408 = DAT_0062b748;
  local_41c = 0x4d42;
  local_41a = 0x4b436;
  local_416 = 0;
  local_414 = 0;
  local_412 = 0x436;
  local_460 = 0x28;
  local_45c = 0x280;
  local_458 = 0x1e0;
  local_454 = 1;
  local_452 = 8;
  local_450 = 0;
  local_44c = 0x4b000;
  local_448 = 0;
  local_444 = 0;
  local_440 = 0;
  local_43c = 0;
  for (/* cond: (local_42c < 0x100) */); local_42c = (local_42c < 0x100); local_42c = (local_42c + 1)) {
    _MEM[DAT_fffffbfc + local_42c * 4] = 0;
    _MEM[DAT_fffffbfc + (local_42c * 4 + 1)] = _MEM[DAT_fffffbfc + local_42c * 4];
    _MEM[DAT_fffffbfc + (local_42c * 4 + 2)] = _MEM[DAT_fffffbfc + (local_42c * 4 + 1)];
  }
  for (/* cond: (local_42c < 0xfa) */); local_42c = (local_42c < 0xfa); local_42c = (local_42c + 1)) {
    _MEM[DAT_fffffbfc + local_42c * 4] = 0xff;
    _MEM[DAT_fffffbfc + (local_42c * 4 + 1)] = _MEM[DAT_fffffbfc + local_42c * 4];
  }
  local_404 = 0xff;
  local_404 = 0x7f;
  local_404 = 0xff;
  local_404 = 0xff;
  local_404 = 0xff;
  local_404 = 0xff;
  local_404 = 0x87;
  local_404 = 0x87;
  local_404 = 0x54;
  if ((param_5 !== 0)) {
    local_430 = 0;
    for (/* cond: (local_42c < (param_4 + param_3)) */); local_42c = (local_42c < (param_4 + param_3)); local_42c = (local_42c + 1)) {
      uVar1 = FUN_0046f440(local_42c, (DAT_fffffbfc + (local_430 * 4 + 2)), (DAT_fffffbfc + (local_430 * 4 + 1)), (DAT_fffffbfc + local_430 * 4));
      FUN_005dea9e(uVar1);
      local_430 = (local_430 + 1);
    }
  }
  local_438 = __fsopen(param_2, DAT_0062b74c, 0x40);
  if ((local_438 === 0)) {
    local_434 = 0;
  }
  else {
    sVar2 = _fwrite(DAT_fffffbe4, 0xe, 1, local_438);
    if ((sVar2 === 0)) {
      local_408 = s_Error_writing_file_header_0062b750;
    }
    else {
      sVar2 = _fwrite(DAT_fffffba0, 0x28, 1, local_438);
      if ((sVar2 === 0)) {
        local_408 = s_Error_writing_info_header_0062b76c;
      }
      else {
        sVar2 = _fwrite(DAT_fffffbfc, 0x400, 1, local_438);
        if ((sVar2 !== 0)) {
          local_434 = 1;
          local_428 = local_458;
          do {
            local_428 = (local_428 + -1);
            if ((local_434 === 0));
            for (/* cond: (local_424 < local_45c) */); local_424 = (local_424 < local_45c); local_424 = (local_424 + 1)) {
              local_40c = (u8(_MEM[local_420]) - param_3);
              local_420 = (local_420 + 1);
              iVar3 = _fputc(local_40c, local_438);
              if ((iVar3 === -1)) {
                local_408 = s_Error_writing_bitmap_image_0062b7a4;
                local_434 = 0;
                break;
              }
            }
          } while ( true );
        }
        local_408 = s_Error_writing_file_palette_0062b788;
      }
    }
 LAB_0046ffb7: :
    _fclose(local_438);
    if ((local_434 === 0)) {
      FUN_006e7dd4(0, local_408, 0, 0);
    }
  }
  return local_434;
}
