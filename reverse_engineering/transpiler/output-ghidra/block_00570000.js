// Block 0x00570000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 122

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408010, FUN_004083f0, FUN_00408460 } from './block_00400000.js';
import { FUN_00408490, FUN_004085f0, FUN_004086c0, FUN_004087c0, FUN_0040bbb0, FUN_0040bbe0 } from './block_00400000.js';
import { FUN_0040bc10, FUN_0040bc80, FUN_0040ef50, FUN_0040f010, FUN_0040f380, FUN_0040f3e0 } from './block_00400000.js';
import { FUN_0040f570, FUN_0040f680, FUN_0040f7d0, FUN_0040f840, FUN_0040f880, FUN_0040fb00 } from './block_00400000.js';
import { FUN_0040fbb0, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80, FUN_0040fdb0 } from './block_00400000.js';
import { FUN_0040fe10, FUN_0040ff30, FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_004105f8, FUN_00414be0, FUN_00414c20, FUN_00414c60 } from './block_00410000.js';
import { FUN_00414ca0, FUN_00414d10, FUN_00414dd0, FUN_00415133, FUN_00417f70, FUN_00419100 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421da0, FUN_00421ea0, FUN_004271e8, FUN_00428b0c, FUN_00428cb0 } from './block_00420000.js';
import { FUN_0043c9d0, FUN_0043cc00, FUN_0043cf76, FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_004413d1, FUN_00441b11, FUN_00442541, FUN_00444270, FUN_004442e0 } from './block_00440000.js';
import { FUN_00453c40, FUN_00453e18, FUN_00453e51, FUN_00456f20, FUN_0045ac71 } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_00467933, FUN_0046b14d, FUN_0046e020, FUN_0046e287 } from './block_00460000.js';
import { FUN_0046f460, FUN_0046fbf3 } from './block_00460000.js';
import { FUN_004731d2, FUN_0047a6b0, FUN_0047c3e0, FUN_0047cea6, FUN_0047cf22, FUN_0047cf9e } from './block_00470000.js';
import { FUN_0047df20, FUN_0047df50, FUN_0047dfb0, FUN_0047dff0, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_00492c15, FUN_00493c7d, FUN_00497d00, FUN_00497ea0, FUN_0049805e, FUN_004980ec } from './block_00490000.js';
import { FUN_00498159 } from './block_00490000.js';
import { FUN_004a6980, FUN_004a7577, FUN_004a75a6, FUN_004a762d, FUN_004a7ce9, FUN_004aa378 } from './block_004A0000.js';
import { FUN_004abfe5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bb540, FUN_004bd9f0, FUN_004bdb2c, FUN_004be6ba, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c03ae, FUN_004c0cf7, FUN_004c4240, FUN_004ca39e, FUN_004cc870, FUN_004ccb6a } from './block_004C0000.js';
import { FUN_004cff70 } from './block_004C0000.js';
import { FUN_004eb80a, FUN_004ec312 } from './block_004E0000.js';
import { FUN_004fbd9d, FUN_004fc20d, FUN_004fc2bb } from './block_004F0000.js';
import { FUN_00509590, FUN_0050dada, FUN_0050db36 } from './block_00500000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_00552112, FUN_00552ed2, FUN_00553379, FUN_0055339f, FUN_0055bef9, ~COleCntrFrameWnd } from './block_00550000.js';
import { FUN_00569363, FUN_0056c5fc } from './block_00560000.js';
import { FUN_0059c575, FUN_0059d3c9, FUN_0059db08, FUN_0059df8a, FUN_0059ec88, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a6c23, FUN_005a6c45, FUN_005a9964, FUN_005a99fc, FUN_005a9abf, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005ae052, FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b29aa, FUN_005b29d7, FUN_005b2c3d, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69 } from './block_005B0000.js';
import { FUN_005b3d06, FUN_005b4391, FUN_005b47fa, FUN_005b490e, FUN_005b50ad, FUN_005b53b6 } from './block_005B0000.js';
import { FUN_005b6042, FUN_005b8931, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8a81 } from './block_005B0000.js';
import { FUN_005b8b1a, FUN_005b8b65, FUN_005b8ca6, FUN_005b8da4, FUN_005b9179, FUN_005b94d5 } from './block_005B0000.js';
import { FUN_005b976d, FUN_005b99e8, FUN_005b9c49, FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0 } from './block_005B0000.js';
import { FUN_005baec8, FUN_005baee0, FUN_005bb4ae, FUN_005bb574, FUN_005bcdfc, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd65c, FUN_005bf071 } from './block_005B0000.js';
import { CString, FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c041f, FUN_005c044a } from './block_005C0000.js';
import { FUN_005c0bf2, FUN_005c0c5d, FUN_005c61b0, FUN_005c64da, FUN_005c656b, FUN_005cd775 } from './block_005C0000.js';
import { FUN_005cde4d, FUN_005cdf50, FUN_005cebb4, FUN_005cec44, FUN_005cedad, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005cef66, FUN_005cf23f, FUN_005cf467, InvalidateObjectCache } from './block_005C0000.js';
import { FUN_005dcc10, ~_Timevec } from './block_005D0000.js';
import { FUN_005e0f2a, FUN_005e10fb, FUN_005e1118, FUN_005e11be, FUN_005e1226, FUN_005e128c } from './block_005E0000.js';
import { FUN_005e14c8 } from './block_005E0000.js';
import { FID_conflict:_remove, FUN_005f22d0, FUN_005f22e0, __chdir, __getcwd, _isdigit } from './block_005F0000.js';
import { _rand, _sprintf, _strlen, _strncmp, _strrchr, _strstr } from './block_005F0000.js';
import { `eh_vector_constructor_iterator', `eh_vector_destructor_iterator', operator_new } from './block_005F0000.js';
import { __strupr } from './block_00600000.js';
// Unresolved: XD_FlushSendBuffer

const DAT_00627684 = globalThis.DAT_00627684, DAT_0062768e = globalThis.DAT_0062768e, DAT_0062768f = globalThis.DAT_0062768f, DAT_00627cc9 = globalThis.DAT_00627cc9, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360;
const DAT_00628370 = globalThis.DAT_00628370, DAT_006283a0 = globalThis.DAT_006283a0, DAT_006341f0 = globalThis.DAT_006341f0, DAT_006341f4 = globalThis.DAT_006341f4, DAT_0063427c = globalThis.DAT_0063427c, DAT_00634280 = globalThis.DAT_00634280;
const DAT_00634310 = globalThis.DAT_00634310, DAT_00634440 = globalThis.DAT_00634440, DAT_00634444 = globalThis.DAT_00634444, DAT_0063f858 = globalThis.DAT_0063f858, DAT_0063fc18 = globalThis.DAT_0063fc18, DAT_0063fc58 = globalThis.DAT_0063fc58;
const DAT_0063fd18 = globalThis.DAT_0063fd18, DAT_0063fe50 = globalThis.DAT_0063fe50, DAT_006409d8 = globalThis.DAT_006409d8, DAT_00641808 = globalThis.DAT_00641808, DAT_00641848 = globalThis.DAT_00641848, DAT_00642710 = globalThis.DAT_00642710;
const DAT_0064292c = globalThis.DAT_0064292c, DAT_00642b48 = globalThis.DAT_00642b48, DAT_00642c48 = globalThis.DAT_00642c48, DAT_00643b38 = globalThis.DAT_00643b38, DAT_00643b74 = globalThis.DAT_00643b74, DAT_00643bb0 = globalThis.DAT_00643bb0;
const DAT_00643bec = globalThis.DAT_00643bec, DAT_006442f8 = globalThis.DAT_006442f8, DAT_00644334 = globalThis.DAT_00644334, DAT_006446b8 = globalThis.DAT_006446b8, DAT_006447b0 = globalThis.DAT_006447b0, DAT_00644e48 = globalThis.DAT_00644e48;
const DAT_00645160 = globalThis.DAT_00645160, DAT_00645a84 = globalThis.DAT_00645a84, DAT_00646158 = globalThis.DAT_00646158, DAT_006461d8 = globalThis.DAT_006461d8, DAT_006465d8 = globalThis.DAT_006465d8, DAT_00646650 = globalThis.DAT_00646650;
const DAT_00646878 = globalThis.DAT_00646878, DAT_00646cb8 = globalThis.DAT_00646cb8, DAT_00647168 = globalThis.DAT_00647168, DAT_00647388 = globalThis.DAT_00647388, DAT_00647748 = globalThis.DAT_00647748, DAT_00647c40 = globalThis.DAT_00647c40;
const DAT_00647fa0 = globalThis.DAT_00647fa0, DAT_00647fdc = globalThis.DAT_00647fdc, DAT_00648018 = globalThis.DAT_00648018, DAT_006482f8 = globalThis.DAT_006482f8, DAT_00648334 = globalThis.DAT_00648334, DAT_0064b1b8 = globalThis.DAT_0064b1b8;
const DAT_0064b1bc = globalThis.DAT_0064b1bc, DAT_0064b1bd = globalThis.DAT_0064b1bd, DAT_0064b1c1 = globalThis.DAT_0064b1c1, DAT_0064b1c4 = globalThis.DAT_0064b1c4, DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1c8 = globalThis.DAT_0064b1c8;
const DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a8 = globalThis.DAT_0064c6a8, DAT_0064c6ac = globalThis.DAT_0064c6ac;
const DAT_0064c6ae = globalThis.DAT_0064c6ae, DAT_0064c6b0 = globalThis.DAT_0064c6b0, DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1;
const DAT_0064c6c2 = globalThis.DAT_0064c6c2, DAT_0064c6f8 = globalThis.DAT_0064c6f8, DAT_0064c706 = globalThis.DAT_0064c706, DAT_0064c708 = globalThis.DAT_0064c708, DAT_0064c70c = globalThis.DAT_0064c70c, DAT_0064c70e = globalThis.DAT_0064c70e;
const DAT_0064c7b6 = globalThis.DAT_0064c7b6, DAT_0064c7f4 = globalThis.DAT_0064c7f4, DAT_0064c932 = globalThis.DAT_0064c932, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342;
const DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34a = globalThis.DAT_0064f34a, DAT_0064f34b = globalThis.DAT_0064f34b, DAT_0064f34c = globalThis.DAT_0064f34c;
const DAT_0064f35c = globalThis.DAT_0064f35c, DAT_0064f360 = globalThis.DAT_0064f360, DAT_0064f374 = globalThis.DAT_0064f374, DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00655020 = globalThis.DAT_00655020;
const DAT_00655c22 = globalThis.DAT_00655c22, DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f4 = globalThis.DAT_006560f4, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7;
const DAT_006560f8 = globalThis.DAT_006560f8, DAT_006560fc = globalThis.DAT_006560fc, DAT_006560ff = globalThis.DAT_006560ff, DAT_00656100 = globalThis.DAT_00656100, DAT_00656102 = globalThis.DAT_00656102, DAT_00656104 = globalThis.DAT_00656104;
const DAT_00656108 = globalThis.DAT_00656108, DAT_0065610a = globalThis.DAT_0065610a, DAT_0066c7a8 = globalThis.DAT_0066c7a8, DAT_0066c8cc = globalThis.DAT_0066c8cc, DAT_0066c8d0 = globalThis.DAT_0066c8d0, DAT_0066ca84 = globalThis.DAT_0066ca84;
const DAT_0066ca8c = globalThis.DAT_0066ca8c, DAT_0066ca90 = globalThis.DAT_0066ca90, DAT_0066ca94 = globalThis.DAT_0066ca94, DAT_0066cab0 = globalThis.DAT_0066cab0, DAT_0066cab4 = globalThis.DAT_0066cab4, DAT_0066cac0 = globalThis.DAT_0066cac0;
const DAT_00679640 = globalThis.DAT_00679640, DAT_006a4f90 = globalThis.DAT_006a4f90, DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ab178 = globalThis.DAT_006ab178, DAT_006ab190 = globalThis.DAT_006ab190, DAT_006ab1a0 = globalThis.DAT_006ab1a0;
const DAT_006ac0a8 = globalThis.DAT_006ac0a8, DAT_006ac0f8 = globalThis.DAT_006ac0f8, DAT_006ac108 = globalThis.DAT_006ac108, DAT_006ac128 = globalThis.DAT_006ac128, DAT_006ac170 = globalThis.DAT_006ac170, DAT_006ac1b0 = globalThis.DAT_006ac1b0;
const DAT_006ac1f8 = globalThis.DAT_006ac1f8, DAT_006ac208 = globalThis.DAT_006ac208, DAT_006ac2e4 = globalThis.DAT_006ac2e4, DAT_006ac46c = globalThis.DAT_006ac46c, DAT_006ac4d0 = globalThis.DAT_006ac4d0, DAT_006ac5bc = globalThis.DAT_006ac5bc;
const DAT_006ac8a8 = globalThis.DAT_006ac8a8, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad558 = globalThis.DAT_006ad558, DAT_fffff630 = globalThis.DAT_fffff630, DAT_fffff6b8 = globalThis.DAT_fffff6b8, DAT_fffff7c0 = globalThis.DAT_fffff7c0;
const DAT_fffff8c4 = globalThis.DAT_fffff8c4, DAT_fffff980 = globalThis.DAT_fffff980, DAT_fffff990 = globalThis.DAT_fffff990, DAT_fffff9a0 = globalThis.DAT_fffff9a0, DAT_fffff9b0 = globalThis.DAT_fffff9b0, DAT_fffff9c0 = globalThis.DAT_fffff9c0;
const DAT_fffff9d0 = globalThis.DAT_fffff9d0, DAT_fffff9e0 = globalThis.DAT_fffff9e0, DAT_fffff9f0 = globalThis.DAT_fffff9f0, DAT_fffffa00 = globalThis.DAT_fffffa00, DAT_fffffa10 = globalThis.DAT_fffffa10, DAT_fffffa20 = globalThis.DAT_fffffa20;
const DAT_fffffa30 = globalThis.DAT_fffffa30, DAT_fffffa40 = globalThis.DAT_fffffa40, DAT_fffffa50 = globalThis.DAT_fffffa50, DAT_fffffa60 = globalThis.DAT_fffffa60, DAT_fffffa68 = globalThis.DAT_fffffa68, DAT_fffffa70 = globalThis.DAT_fffffa70;
const DAT_fffffa78 = globalThis.DAT_fffffa78, DAT_fffffa80 = globalThis.DAT_fffffa80, DAT_fffffa88 = globalThis.DAT_fffffa88, DAT_fffffa90 = globalThis.DAT_fffffa90, DAT_fffffa98 = globalThis.DAT_fffffa98, DAT_fffffaac = globalThis.DAT_fffffaac;
const DAT_fffffab0 = globalThis.DAT_fffffab0, DAT_fffffab4 = globalThis.DAT_fffffab4, DAT_fffffc28 = globalThis.DAT_fffffc28, DAT_fffffc3c = globalThis.DAT_fffffc3c, DAT_fffffc5c = globalThis.DAT_fffffc5c, DAT_fffffc74 = globalThis.DAT_fffffc74;
const DAT_fffffc80 = globalThis.DAT_fffffc80, DAT_fffffca0 = globalThis.DAT_fffffca0, DAT_fffffcc8 = globalThis.DAT_fffffcc8, DAT_fffffce8 = globalThis.DAT_fffffce8, DAT_fffffec4 = globalThis.DAT_fffffec4, DAT_fffffee4 = globalThis.DAT_fffffee4;
const DAT_fffffee8 = globalThis.DAT_fffffee8, DAT_fffffefc = globalThis.DAT_fffffefc, DAT_ffffff2c = globalThis.DAT_ffffff2c, DAT_ffffff48 = globalThis.DAT_ffffff48, DAT_ffffff50 = globalThis.DAT_ffffff50, DAT_ffffff80 = globalThis.DAT_ffffff80;
const DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffffa0 = globalThis.DAT_ffffffa0, DAT_ffffffa4 = globalThis.DAT_ffffffa4, DAT_ffffffb0 = globalThis.DAT_ffffffb0, DAT_ffffffb4 = globalThis.DAT_ffffffb4, DAT_ffffffb8 = globalThis.DAT_ffffffb8;
const DAT_ffffffc0 = globalThis.DAT_ffffffc0, DAT_ffffffc4 = globalThis.DAT_ffffffc4, DAT_ffffffd0 = globalThis.DAT_ffffffd0, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc;
const DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4, DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4;
const DAT_fffffff8 = globalThis.DAT_fffffff8, PTR_FUN_0061d6fc = globalThis.PTR_FUN_0061d6fc, s_%s*.BMP;%s*.GIF_0063423c = globalThis.s_%s*.BMP;%s*.GIF_0063423c, s_%s_"%s"_0063425c = globalThis.s_%s_"%s"_0063425c, s_%s_%s%c%s*.BMP;%s*.GIF%c%c_00634220 = globalThis.s_%s_%s%c%s*.BMP;%s*.GIF%c%c_00634220, s_%s_%s_0063424c = globalThis.s_%s_%s_0063424c;
const s_ABANDONWONDER_006343ac = globalThis.s_ABANDONWONDER_006343ac, s_ALLOWAGGRESSOR_00634364 = globalThis.s_ALLOWAGGRESSOR_00634364, s_ALLOWHAWKS_00634374 = globalThis.s_ALLOWHAWKS_00634374, s_ALLOWUN_0063435c = globalThis.s_ALLOWUN_0063435c, s_ANNOYALLIED_00634318 = globalThis.s_ANNOYALLIED_00634318, s_ANNOYCEASE_0063433c = globalThis.s_ANNOYCEASE_0063433c;
const s_ANNOYPEACE_00634324 = globalThis.s_ANNOYPEACE_00634324, s_ANNOYVASSAL_00634330 = globalThis.s_ANNOYVASSAL_00634330, s_ANNOY_00634348 = globalThis.s_ANNOY_00634348, s_BMP;GIF_00634254 = globalThis.s_BMP;GIF_00634254, s_CANESCAPE_00634398 = globalThis.s_CANESCAPE_00634398, s_CAPTUREWONDER_006343c8 = globalThis.s_CAPTUREWONDER_006343c8;
const s_CITIES_00634218 = globalThis.s_CITIES_00634218, s_CITYCAPTURE2_0063440c = globalThis.s_CITYCAPTURE2_0063440c, s_CITYCAPTURE_006343e4 = globalThis.s_CITYCAPTURE_006343e4, s_CITYLOSEALLY_006343fc = globalThis.s_CITYLOSEALLY_006343fc, s_CITYWINALLY_006343f0 = globalThis.s_CITYWINALLY_006343f0, s_DEBUG_006359dc = globalThis.s_DEBUG_006359dc;
const s_ESCAPE_006343a4 = globalThis.s_ESCAPE_006343a4, s_EVENTERRAIN_00634270 = globalThis.s_EVENTERRAIN_00634270, s_ICONS.BMP_00634160 = globalThis.s_ICONS.BMP_00634160, s_ICONS.BMP_00634184 = globalThis.s_ICONS.BMP_00634184, s_ICONS.BMP_00634190 = globalThis.s_ICONS.BMP_00634190, s_ICONS.BMP_0063419c = globalThis.s_ICONS.BMP_0063419c;
const s_ICONS.BMP_006341a8 = globalThis.s_ICONS.BMP_006341a8, s_ICONS.BMP_006341cc = globalThis.s_ICONS.BMP_006341cc, s_ICONS.BMP_006341d8 = globalThis.s_ICONS.BMP_006341d8, s_ICONS.BMP_006341e4 = globalThis.s_ICONS.BMP_006341e4, s_ICONS.GIF_0063416c = globalThis.s_ICONS.GIF_0063416c, s_ICONS.GIF_00634178 = globalThis.s_ICONS.GIF_00634178;
const s_ICONS.GIF_006341b4 = globalThis.s_ICONS.GIF_006341b4, s_ICONS.GIF_006341c0 = globalThis.s_ICONS.GIF_006341c0, s_ICONS_00634210 = globalThis.s_ICONS_00634210, s_LOSTWONDER_006343d8 = globalThis.s_LOSTWONDER_006343d8, s_ODDTERRAIN_00634264 = globalThis.s_ODDTERRAIN_00634264, s_OVERRULE_00634350 = globalThis.s_OVERRULE_00634350;
const s_PARTISANS_0063441c = globalThis.s_PARTISANS_0063441c, s_PROMOTED_00634428 = globalThis.s_PROMOTED_00634428, s_RUSURE_006341f8 = globalThis.s_RUSURE_006341f8, s_SCHISM_00634390 = globalThis.s_SCHISM_00634390, s_STILLWONDER_006343bc = globalThis.s_STILLWONDER_006343bc, s_TAKECIV_00634380 = globalThis.s_TAKECIV_00634380;
const s_TERRAIN1.BMP_006340a0 = globalThis.s_TERRAIN1.BMP_006340a0, s_TERRAIN1.BMP_006340d0 = globalThis.s_TERRAIN1.BMP_006340d0, s_TERRAIN1.BMP_006340e0 = globalThis.s_TERRAIN1.BMP_006340e0, s_TERRAIN1.BMP_006340f0 = globalThis.s_TERRAIN1.BMP_006340f0, s_TERRAIN1.GIF_006340b0 = globalThis.s_TERRAIN1.GIF_006340b0, s_TERRAIN1.GIF_006340c0 = globalThis.s_TERRAIN1.GIF_006340c0;
const s_TERRAIN2.BMP_00634100 = globalThis.s_TERRAIN2.BMP_00634100, s_TERRAIN2.BMP_00634130 = globalThis.s_TERRAIN2.BMP_00634130, s_TERRAIN2.BMP_00634140 = globalThis.s_TERRAIN2.BMP_00634140, s_TERRAIN2.BMP_00634150 = globalThis.s_TERRAIN2.BMP_00634150, s_TERRAIN2.GIF_00634110 = globalThis.s_TERRAIN2.GIF_00634110, s_TERRAIN2.GIF_00634120 = globalThis.s_TERRAIN2.GIF_00634120;
const s_TERRAIN_00634208 = globalThis.s_TERRAIN_00634208, s_TOOKCIV_00634388 = globalThis.s_TOOKCIV_00634388, s_UNITS_00634200 = globalThis.s_UNITS_00634200, s_USEWEAPONS_00634434 = globalThis.s_USEWEAPONS_00634434;


 export function FUN_0057075c ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00570772 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00570780 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_680;
  let local_670;
  let local_660;
  let local_650;
  let local_640;
  let local_630;
  let local_620;
  let local_610;
  let local_600;
  let local_5f0;
  let local_5e0;
  let local_5d0;
  let local_5c0;
  let local_5b0;
  let local_5a0;
  let local_590;
  let local_580;
  let local_570;
  let local_560;
  let local_55c;
  let local_558;
  let local_554;
  let local_550;
  let local_11c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00570fae;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee4, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_TERRAIN1.BMP_006340a0, 0xa, 0xc0, DAT_fffffab0);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_TERRAIN1.GIF_006340b0, 0xa, 0xc0, DAT_fffffab0);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_TERRAIN1.GIF_006340c0, 0xa, 0xc0, DAT_fffffab0);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_554 = 1;
  local_55c = 0x83;
  local_560 = 0xc4;
  local_558 = 1;
  for (/* cond: (local_18 < 0xb) */); local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(DAT_fffffa90, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(DAT_fffffa80, DAT_006ac0a8, local_554, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_55c, local_558, uVar3);
    FUN_005cef31(DAT_fffffa70, DAT_006ac0a8, local_55c, local_558);
    FUN_005cef31(DAT_fffffa60, DAT_006ac0a8, local_55c, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_560, local_558, uVar3);
    FUN_005cef31(DAT_fffffa50, DAT_006ac0a8, local_560, local_558);
    FUN_005cef31(DAT_fffffa40, DAT_006ac0a8, local_560, local_558);
    local_558 = (local_558 + 0x21);
  }
  local_554 = 0x1c8;
  local_558 = 0x64;
  for (/* cond: (local_14 < 3) */); local_14 = (local_14 < 3); local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(DAT_fffffa30, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(DAT_fffffa20, DAT_006ac0a8, local_554, local_558);
    local_558 = (local_558 + 0x21);
  }
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(DAT_fffffa10, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(DAT_fffffa00, DAT_006ac0a8, local_554, local_558);
  local_558 = (local_558 + 0x21);
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(DAT_fffff9f0, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(DAT_fffff9e0, DAT_006ac0a8, local_554, local_558);
  local_558 = (local_558 + 0x21);
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(DAT_fffff9d0, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(DAT_fffff9c0, DAT_006ac0a8, local_554, local_558);
  local_558 = 0x16c;
  local_554 = 1;
  for (/* cond: (local_14 < 9) */); local_14 = (local_14 < 9); local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(DAT_fffff9b0, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(DAT_fffff9a0, DAT_006ac0a8, local_554, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, (local_558 + 0x21), uVar3);
    FUN_005cef31(DAT_fffff990, DAT_006ac0a8, local_554, (local_558 + 0x21));
    FUN_005cef31(DAT_fffff980, DAT_006ac0a8, local_554, (local_558 + 0x21));
    local_554 = (local_554 + 0x41);
  }
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_TERRAIN1.BMP_006340d0);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_TERRAIN1.BMP_006340e0);
    if ((iVar2 !== 0));
 LAB_00570f78: :
  __chdir(DAT_fffffee4);
  FUN_004083f0();
  local_8 = -1;
  FUN_00570fa2();
  FUN_00570fb8();
  return;
}


 export function FUN_00570fa2 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00570fb8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00570fc6 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_640;
  let local_630;
  let local_620;
  let local_610;
  let local_600;
  let local_5f0;
  let local_5e0;
  let local_5d0;
  let local_5c0;
  let local_5b0;
  let local_5a0;
  let local_590;
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
  puStack_c = LAB_005718f8;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee8, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_TERRAIN2.BMP_00634100, 0xa, 0xc0, DAT_fffffab4);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_TERRAIN2.GIF_00634110, 0xa, 0xc0, DAT_fffffab4);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_TERRAIN2.GIF_00634120, 0xa, 0xc0, DAT_fffffab4);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_550 = 1;
  local_55c = 0x43;
  for (/* cond: (local_14 < 0x10) */); local_14 = local_14; local_14 = (local_14 + 1)) {
    local_554 = (local_14 & 7) * 0x41;
    local_558 = (local_14 >> 3) * 0x21;
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, (local_550 + local_554), (local_55c + local_558), uVar3);
    FUN_005cef31(DAT_fffffa90, DAT_006ac0a8, (local_550 + local_554), (local_55c + local_558));
    FUN_005cef31(DAT_fffffa80, DAT_006ac0a8, (local_550 + local_554), (local_55c + local_558));
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x42), uVar3);
    FUN_005cef31(DAT_fffffa70, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x42));
    FUN_005cef31(DAT_fffffa60, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x42));
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x84), uVar3);
    FUN_005cef31(DAT_fffffa50, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x84));
    FUN_005cef31(DAT_fffffa40, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0x84));
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0xc6), uVar3);
    FUN_005cef31(DAT_fffffa30, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0xc6));
    FUN_005cef31(DAT_fffffa20, DAT_006ac0a8, (local_550 + local_554), ((local_55c + local_558) + 0xc6));
  }
  local_550 = 1;
  local_55c = 0x14b;
  for (/* cond: (local_14 < 4) */); local_14 = local_14; local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c, uVar3);
    FUN_005cef31(DAT_fffffa10, DAT_006ac0a8, local_550, local_55c);
    FUN_005cef31(DAT_fffffa00, DAT_006ac0a8, local_550, local_55c);
    local_550 = (local_550 + 0x41);
  }
  local_550 = 1;
  local_55c = 0x1ad;
  for (/* cond: (local_560 < 8) */); local_560 = (local_560 < 8); local_560 = (local_560 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c, uVar3);
    FUN_005cef31(DAT_fffff9f0, DAT_006ac0a8, local_550, local_55c);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, (local_550 + 0x21), (local_55c + 0x22), uVar3);
    FUN_005cef31(DAT_fffff9e0, DAT_006ac0a8, (local_550 + 0x21), (local_55c + 0x22));
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, (local_55c + 0x11), uVar3);
    FUN_005cef31(DAT_fffff9d0, DAT_006ac0a8, local_550, (local_55c + 0x11));
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, (local_55c + 0x22), uVar3);
    FUN_005cef31(DAT_fffff9c0, DAT_006ac0a8, local_550, (local_55c + 0x22));
    local_550 = (local_550 + 0x42);
  }
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_TERRAIN2.BMP_00634130);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_TERRAIN2.BMP_00634140);
    if ((iVar2 !== 0));
 LAB_005718c2: :
  __chdir(DAT_fffffee8);
  FUN_004083f0();
  local_8 = -1;
  FUN_005718ec();
  FUN_00571902();
  return;
}


 export function FUN_005718ec ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00571902 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00571910 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_568;
  let local_558;
  let local_554;
  let local_120;
  let local_11c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00571bb6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee4, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_ICONS.BMP_00634160, 0xa, 0xc0, DAT_fffffaac);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_ICONS.GIF_0063416c, 0xa, 0xc0, DAT_fffffaac);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_ICONS.GIF_00634178, 0xa, 0xc0, DAT_fffffaac);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_558 = 0xd3;
  for (/* cond: (local_14 < 4) */); local_14 = (local_14 < 4); local_14 = (local_14 + 1)) {
    local_120 = 0x157;
    for (/* cond: (local_18 < 5) */); local_18 = (local_18 < 5); local_18 = (local_18 + 1)) {
      uVar1 = FUN_00417f70();
      uVar3 = FUN_004bb540(uVar1);
      uVar3 = FUN_004a6980(uVar3);
      FUN_005a9abf(DAT_006ac0a8, local_120, local_558, uVar3);
      FUN_005cef31(DAT_fffffa98, DAT_006ac0a8, local_120, local_558);
      local_120 = (local_120 + 0x25);
    }
    local_558 = (local_558 + 0x15);
  }
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_ICONS.BMP_00634184);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_ICONS.BMP_00634190);
    if ((iVar2 !== 0));
 LAB_00571b80: :
  __chdir(DAT_fffffee4);
  FUN_004083f0();
  local_8 = -1;
  FUN_00571baa();
  FUN_00571bc0();
  return;
}


 export function FUN_00571baa ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00571bc0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00571bce ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_598;
  let local_588;
  let local_578;
  let local_568;
  let local_558;
  let local_554;
  let local_550;
  let local_11c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00572071;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __getcwd(DAT_fffffee8, 0x104);
  __chdir(DAT_0064bb08);
  iVar2 = FUN_0046f460(DAT_006ac0a8, s_ICONS.BMP_006341a8, 0xa, 0xc0, DAT_fffffab0);
  if ((iVar2 === 0)) {
    iVar2 = FUN_005bf071(s_ICONS.GIF_006341b4, 0xa, 0xc0, DAT_fffffab0);
    if ((iVar2 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_ICONS.GIF_006341c0, 0xa, 0xc0, DAT_fffffab0);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_11c = 0x157;
  local_554 = 1;
  local_558 = 0;
  for (/* cond: (local_14 < 0x27) */); local_14 = (local_14 < 0x27); local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(DAT_fffffa98, DAT_006ac0a8, local_11c, local_554);
    local_11c = (local_11c + 0x25);
    local_558 = (local_558 + 1);
    if ((7 < local_558)) {
      local_558 = 0;
      local_554 = (local_554 + 0x15);
      local_11c = 0x157;
    }
  }
  local_11c = 0x157;
  local_554 = 0x6a;
  local_558 = 0;
  for (/* cond: (local_14 < 0x1c) */); local_14 = (local_14 < 0x1c); local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(DAT_fffffa88, DAT_006ac0a8, local_11c, local_554);
    local_11c = (local_11c + 0x25);
    local_558 = (local_558 + 1);
    if ((6 < local_558)) {
      local_558 = 0;
      local_554 = (local_554 + 0x15);
      local_11c = 0x157;
    }
  }
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 0xc7, 0x100, uVar3);
  FUN_005cef31(DAT_fffffa78, DAT_006ac0a8, 0xc7, 0x100);
  local_11c = 1;
  local_554 = 0x164;
  for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(DAT_fffffa68, DAT_006ac0a8, local_11c, local_554);
    local_11c = (local_11c + 0x21);
  }
  __chdir(DAT_0064bb08);
  iVar2 = FUN_00415133(s_ICONS.BMP_006341cc);
  if ((iVar2 !== 0)) {
    iVar2 = FID_conflict:_remove(s_ICONS.BMP_006341d8);
    if ((iVar2 !== 0));
 LAB_0057203b: :
  __chdir(DAT_fffffee8);
  FUN_004083f0();
  local_8 = -1;
  FUN_00572065();
  FUN_0057207b();
  return;
}


 export function FUN_00572065 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0057207b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0057228e)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00572089 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    FUN_005f22d0(DAT_006ac2e4, DAT_006341f0);
  }
  else {
    FUN_005f22d0(DAT_006ac2e4, param_1);
  }
  _DAT_006ac484 = DAT_006ab1a0;
  _DAT_006ac47c = DAT_006ab190;
  _DAT_006ac480 = DAT_006ab178;
  _DAT_006ac2c4 = param_2;
  wv(DAT_006ac2c8, param_8);
  wv(DAT_006ac2cc, param_9);
  wv(DAT_006ac2d0, param_7);
  _DAT_006ac3ac = 0;
  _DAT_006ac458 = 0;
  if (((param_2 & 4) !== 0)) {
    wv(DAT_006ac2c8, DAT_00633598);
    wv(DAT_006ac2cc, DAT_0063359c);
  }
  if (((param_2 & 8) === 0)) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if ((DAT_006ac2c8 !== 0)) {
    local_8 = (local_8 | 0x400);
  }
  if ((param_7 !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_2 & 2) === 0)) {
    param_5 = (param_5 + DAT_006ac2cc * 2);
    param_6 = (param_6 + (DAT_006ac2c8 + DAT_006ac2cc));
  }
  if (((param_2 & 1) !== 0)) {
    param_3 = ((DAT_006ab198 >> 1) - (param_5 >> 1));
    param_4 = ((DAT_006ab19c >> 1) - (param_6 >> 1));
  }
  if ((DAT_006a4f88 === 0)) {
    local_c = 0;
  }
  else {
    local_c = (DAT_006a4f88 + 0x48);
  }
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, DAT_006a8c00, local_c);
  if ((DAT_006ac2c8 !== 0)) {
    FUN_00497d00(DAT_006ac2c8);
  }
  if ((DAT_006ac2d0 !== 0)) {
    FUN_004cff70(DAT_006ac2d0);
  }
  FUN_00552ed2();
  FUN_0059d3c9(DAT_006ac1f8);
  return;
}


 export function FUN_005722ab ()

 {
  let local_14;

  FUN_004086c0(DAT_ffffffec, 0, 0, DAT_006ac878, DAT_006ac87c);
  FUN_005c044a(0x109, 0x107);
  FUN_005cebb4(DAT_006ac128, DAT_ffffffec);
  w32((DAT_00642c48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0, DAT_006ac0f4);
  w32((DAT_00642b48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0, DAT_006ac0f0);
  if ((DAT_006ac888 !== 0)) {
    wv(DAT_006ac888, DAT_006ac888());
  }
  wv(DAT_006ac88c, 0);
  wv(DAT_006ac1f8, DAT_006ac1f8);
  FUN_005bb574();
  return;
}


 export function FUN_00572364 ()

 {
  wv(DAT_006ac88c, 0);
  wv(DAT_006ac1f8, DAT_006ac1f8);
  return;
}


 export function FUN_00572389 ()

 {
  let local_14;

  FUN_005cdf50();
  FUN_004086c0(DAT_ffffffec, 0, 0, DAT_006ac878, DAT_006ac87c);
  FUN_005cec44(DAT_006ac128, 0xfe, DAT_ffffffec);
  wv(DAT_006ac0a4, DAT_006ac0f4);
  wv(DAT_006ac0a0, DAT_006ac0f0);
  return;
}


 export function FUN_005723ee ()

 {
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  if ((DAT_00634000 === 0)) {
    local_18 = DAT_006ac874;
  }
  else {
    local_18 = DAT_00634000;
  }
  FUN_005a9abf(DAT_006ac1b0, (DAT_006ac2d4 + 0x142), (DAT_006ac2d8 + 0xac), 0x20, 0x20, local_18);
  FUN_005a9964(DAT_006ac1b0, (DAT_006ac2d4 + 0x142), (DAT_006ac2d8 + 0xac), 0x20, 0x20, 0xa);
  if ((DAT_00634004 === 0)) {
    local_1c = DAT_006ac874;
  }
  else {
    local_1c = DAT_00634004;
  }
  FUN_005a9abf(DAT_006ac1b0, (DAT_006ac2d4 + 0x14a), (DAT_006ac2d8 + 0xb4), 0x10, 0x10, local_1c);
  FUN_005a9964(DAT_006ac1b0, (DAT_006ac2d4 + 0x14a), (DAT_006ac2d8 + 0xb4), 0x10, 0x10, 0xa);
  if ((DAT_00634008 === 0)) {
    local_20 = DAT_006ac874;
  }
  else {
    local_20 = DAT_00634008;
  }
  FUN_005a9abf(DAT_006ac1b0, (DAT_006ac2d4 + 0x11e), (DAT_006ac2d8 + 0xac), 0x20, 0x20, local_20);
  FUN_005a9964(DAT_006ac1b0, (DAT_006ac2d4 + 0x11e), (DAT_006ac2d8 + 0xac), 0x20, 0x20, 0xa);
  if ((DAT_006ac924 !== 0xb)) {
    if ((DAT_0063400c === 0)) {
      local_24 = DAT_006ac874;
    }
    else {
      local_24 = DAT_0063400c;
    }
    FUN_005a9abf(DAT_006ac1b0, (DAT_006ac2d4 + 0x166), (DAT_006ac2d8 + 0xac), 0x20, 0x20, local_24);
    FUN_005a9964(DAT_006ac1b0, (DAT_006ac2d4 + 0x166), (DAT_006ac2d8 + 0xac), 0x20, 0x20, 0xa);
  }
  FUN_004086c0(DAT_ffffffec, (DAT_006ac2d4 + 0x11e), (DAT_006ac2d8 + 0xac), 0x68, 0x20);
  FUN_00408490(DAT_ffffffec);
  return;
}


 export function FUN_0057261a (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;

  if ((param_4 < 0xca)) {
    uVar3 = ((param_4 - 0xa) >> 0x1f);
    iVar1 = ((((((param_4 - 0xa) ^ uVar3) - uVar3) & 0x1f) ^ uVar3) - uVar3);
    iVar2 = (((param_4 + -10) + (((param_4 + -10) >> 0x1f) & 0x1f)) >> 5);
    FUN_004086c0(DAT_ffffffec, (iVar1 * 0xc + param_2), (iVar2 * 0xc + param_3), 0xa, 0xa);
    FUN_0040fdb0(DAT_006ac1b0, DAT_ffffffec, param_4);
    FUN_005a99fc(DAT_006ac1b0, DAT_ffffffec, 0xa, 0xa);
    FUN_004086c0(DAT_ffffffec, ((iVar1 * 0xc + param_2) + -1), ((iVar2 * 0xc + param_3) + -1), 0xc, 0xc);
    if ((param_4 === DAT_00634004)) {
      FUN_005a99fc(param_1, DAT_ffffffec, 0x29, 0x29);
    }
    else {
      FUN_005a99fc(param_1, DAT_ffffffec, 0x1d, 0x1d);
    }
    FUN_00408490(DAT_ffffffec);
  }
  return;
}


 export function FUN_00572740 (param_1, param_2)

 {
  let iVar1;

  param_1 = (param_1 + -0x11e);
  param_2 = (param_2 + -20);
  if ((0x20 < (param_2 % 0x26))) {
    iVar1 = -1;
  }
  else {
    iVar1 = ((param_1 / 0x24 | 0) + (param_2 / 0x26 | 0) * 3);
  }
  return iVar1;
}


 export function FUN_005727d8 ()

 {
  let local_24;
  let local_14;

  FUN_005c041f(DAT_006ac874);
  /* switch */ () {
  case 1 :
  case 2 :
  case 0xb :
    FUN_005cef31(DAT_ffffffec, DAT_006ac128, 0, 0);
    break;
  case 5 :
  case 7 :
  case 8 :
  case 10 :
    FUN_005cef31(DAT_ffffffdc, DAT_006ac128, 0, 0);
  case 3 :
  case 4 :
  case 6 :
  case 9 :
  }
  return;
}


 export function FUN_00572887 (param_1, param_2)

 {
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

  if ((DAT_006ac124 === 0)) {
    if ((DAT_006ac894 === 0)) {
      local_18 = DAT_006ac874;
    }
    else {
      local_18 = DAT_006ac894;
    }
    FUN_005c0c5d(param_1, param_2, local_18);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0x10), ((DAT_006ac2d8 + param_2 * 4) + 0x10), 4, 4);
    if ((DAT_006ac894 === 0)) {
      local_1c = DAT_006ac874;
    }
    else {
      local_1c = DAT_006ac894;
    }
    FUN_0040fdb0(DAT_006ac1b0, DAT_006ac108, local_1c);
  }
  else if ((DAT_006ac124 === 1)) {
    FUN_005c00ce(DAT_ffffffec);
    FUN_004086c0(DAT_006ac108, (DAT_006ac2d4 + 0x10), (DAT_006ac2d8 + 0x10), (DAT_006ac878 << 2), (DAT_006ac87c << 2));
    FUN_005c0073(DAT_006ac108);
    FUN_004086c0(DAT_006ac108, (param_1 + -1), param_2, 3, 1);
    if ((DAT_006ac894 === 0)) {
      local_20 = DAT_006ac874;
    }
    else {
      local_20 = DAT_006ac894;
    }
    FUN_005c0333(DAT_006ac108, local_20);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0xc), ((DAT_006ac2d8 + param_2 * 4) + 0x10), 0xc, 4);
    if ((DAT_006ac894 === 0)) {
      local_24 = DAT_006ac874;
    }
    else {
      local_24 = DAT_006ac894;
    }
    FUN_0040fdb0(DAT_006ac1b0, DAT_006ac108, local_24);
    FUN_004086c0(DAT_006ac108, param_1, (param_2 + -1), 1, 3);
    if ((DAT_006ac894 === 0)) {
      local_28 = DAT_006ac874;
    }
    else {
      local_28 = DAT_006ac894;
    }
    FUN_005c0333(DAT_006ac108, local_28);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0x10), ((param_2 * 4 + DAT_006ac2d8) + 0xc), 4, 0xc);
    if ((DAT_006ac894 === 0)) {
      local_2c = DAT_006ac874;
    }
    else {
      local_2c = DAT_006ac894;
    }
    FUN_0040fdb0(DAT_006ac1b0, DAT_006ac108, local_2c);
    FUN_005c0073(DAT_ffffffec);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0xc), ((param_2 * 4 + DAT_006ac2d8) + 0xc), 0xc, 0xc);
  }
  else if ((DAT_006ac124 === 2)) {
    FUN_005c00ce(DAT_ffffffec);
    FUN_004086c0(DAT_006ac108, (DAT_006ac2d4 + 0x10), (DAT_006ac2d8 + 0x10), (DAT_006ac878 << 2), (DAT_006ac87c << 2));
    FUN_005c0073(DAT_006ac108);
    FUN_004086c0(DAT_006ac108, (param_1 + -1), param_2, 4, 2);
    if ((DAT_006ac894 === 0)) {
      local_30 = DAT_006ac874;
    }
    else {
      local_30 = DAT_006ac894;
    }
    FUN_005c0333(DAT_006ac108, local_30);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0xc), ((DAT_006ac2d8 + param_2 * 4) + 0x10), 0x10, 8);
    if ((DAT_006ac894 === 0)) {
      local_34 = DAT_006ac874;
    }
    else {
      local_34 = DAT_006ac894;
    }
    FUN_0040fdb0(DAT_006ac1b0, DAT_006ac108, local_34);
    FUN_004086c0(DAT_006ac108, param_1, (param_2 + -1), 2, 4);
    if ((DAT_006ac894 === 0)) {
      local_38 = DAT_006ac874;
    }
    else {
      local_38 = DAT_006ac894;
    }
    FUN_005c0333(DAT_006ac108, local_38);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0x10), ((param_2 * 4 + DAT_006ac2d8) + 0xc), 8, 0x10);
    if ((DAT_006ac894 === 0)) {
      local_3c = DAT_006ac874;
    }
    else {
      local_3c = DAT_006ac894;
    }
    FUN_0040fdb0(DAT_006ac1b0, DAT_006ac108, local_3c);
    FUN_005c0073(DAT_ffffffec);
    FUN_004086c0(DAT_006ac108, ((param_1 * 4 + DAT_006ac2d4) + 0xc), ((param_2 * 4 + DAT_006ac2d8) + 0xc), 0x10, 0x10);
  }
  return DAT_006ac108;
}


 export function FUN_00572da0 ()

 {
  let iVar1;
  let local_18;
  let local_8;

  FUN_005bb574();
  iVar1 = DAT_006ac0f0;
  local_8 = DAT_006ac0f4;
  FUN_005c00ce(DAT_ffffffe8);
  FUN_004086c0(DAT_006ac0f8, (DAT_006ac2d4 + 0x10), (DAT_006ac2d8 + 0x10), (DAT_006ac878 << 2), (DAT_006ac87c << 2));
  FUN_005c0073(DAT_006ac0f8);
  FUN_004086c0(DAT_006ac0f8, (DAT_006ac2d4 + 0x20), (DAT_006ac2d8 + 0x10), 4, 0x3c);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0x6a);
  FUN_004086c0(DAT_006ac0f8, (DAT_006ac2d4 + 0x20), (DAT_006ac2d8 + 0x4c), 0xb4, 4);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0x6a);
  FUN_004086c0(DAT_006ac0f8, (DAT_006ac2d4 + 0xd0), (DAT_006ac2d8 + 0x10), 4, 0x3c);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0x6a);
  FUN_004086c0(DAT_006ac0f8, ((local_8 * 4 + DAT_006ac2d4) + 8), ((DAT_006ac2d8 + iVar1 * 4) + 0x10), 0x14, 4);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0xa);
  FUN_004086c0(DAT_006ac0f8, ((local_8 * 4 + DAT_006ac2d4) + 0x10), ((iVar1 * 4 + DAT_006ac2d8) + 8), 4, 0x14);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0xa);
  FUN_004086c0(DAT_006ac0f8, ((local_8 * 4 + DAT_006ac2d4) + 9), ((DAT_006ac2d8 + iVar1 * 4) + 0x11), 0x12, 2);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0x29);
  FUN_004086c0(DAT_006ac0f8, ((local_8 * 4 + DAT_006ac2d4) + 0x11), ((iVar1 * 4 + DAT_006ac2d8) + 9), 2, 0x12);
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac0f8, 0x29);
  FUN_005c0073(DAT_ffffffe8);
  FUN_00408460();
  return;
}


 export function FUN_00572fff (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let SVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let unaff_FS_OFFSET;
  let local_80;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00573ae5;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_4c = DAT_ffffffb4;
  local_8 = 0;
  iVar4 = FUN_00414d10();
  FUN_006e7d84(s32((iVar4 + 4), 0));
  param_1 = (param_1 - DAT_006ac2d4);
  param_2 = (param_2 - DAT_006ac2d8);
  uVar5 = FUN_00572740(param_1, param_2);
  uVar2 = DAT_006ac0f4;
  uVar1 = DAT_006ac0f0;
  /* switch */ () {
  case 0 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    SVar3 = FUN_006e7d80(1);
    if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
      wv(DAT_00634008, DAT_00634004);
      local_70 = DAT_00634004;
      wv(DAT_00634004, 0);
    }
    SVar3 = FUN_006e7d80(2);
    if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
      wv(DAT_0063400c, DAT_00634000);
      local_70 = DAT_00634000;
      wv(DAT_00634000, 0);
    }
    FUN_005723ee();
    FUN_0057261a(DAT_006ac1b0, (DAT_006ac2d4 + 0xa), (DAT_006ac2d8 + 0xe0), local_70);
    param_2 = 0;
    param_1 = 0;
    break;
  case 1 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, 1);
    wv(DAT_006ac118, 1);
    break;
  case 2 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, 2);
    wv(DAT_006ac118, 2);
    break;
  case 3 :
    local_68 = DAT_006ac0f4;
    local_6c = DAT_006ac0f0;
    wv(DAT_006ac0f4, DAT_006ac0a4);
    wv(DAT_006ac0f0, DAT_006ac0a0);
    wv(DAT_006ac0a4, uVar2);
    wv(DAT_006ac0a0, uVar1);
    FUN_005cdf50();
    FUN_004086c0(DAT_ffffffa4, 0, 0, DAT_006ac878, DAT_006ac87c);
    FUN_005cec44(DAT_006ac128, 0xfe, DAT_ffffffa4);
    FUN_005cef66(DAT_ffffff80, DAT_006ac128, 0xfe, 0, 0);
    FUN_005cdf50();
    FUN_005cf23f(DAT_006ac8a8);
    FUN_00574239();
    if ((DAT_006ac120 === 3)) {
      FUN_00572da0();
    }
    break;
  case 4 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, 0);
    break;
  case 5 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    FUN_00572389();
    FUN_005727d8();
    FUN_00574239();
    break;
  case 6 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    FUN_00572389();
    FUN_005c044a(DAT_00634000, DAT_00634004);
    FUN_00574239();
    break;
  case 7 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    FUN_00572389();
    FUN_005c044a(DAT_00634004, 1);
    FUN_005c044a(DAT_00634000, DAT_00634004);
    FUN_005c044a(1, DAT_00634000);
    FUN_00574239();
    break;
  case 8 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    FUN_00576267();
    break;
  case 9 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    wv(DAT_006ac124, 0);
    break;
  case 10 :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    wv(DAT_006ac124, 1);
    break;
  case 0xb :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    wv(DAT_006ac124, 2);
    break;
  case 0xc :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    SVar3 = FUN_006e7d80(1);
    iVar4 = DAT_00634004;
    if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
      local_70 = DAT_00634004;
      wv(DAT_00634004, DAT_00634008);
      local_60 = DAT_00634008;
      wv(DAT_00634008, iVar4);
    }
    SVar3 = FUN_006e7d80(2);
    iVar4 = DAT_00634000;
    if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
      local_70 = DAT_00634000;
      wv(DAT_00634000, DAT_00634008);
      local_60 = DAT_00634008;
      wv(DAT_0063400c, iVar4);
    }
    FUN_005723ee();
    iVar4 = (DAT_006ac2d4 + 0xa);
    iVar6 = (DAT_006ac2d8 + 0xe0);
    FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_70);
    FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_60);
    param_2 = 0;
    param_1 = 0;
    break;
  case 0xd :
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
    break;
  case 0xe :
    if ((DAT_006ac924 === 0xb)) {
      FUN_00572389();
      wv(DAT_006ac120, 3);
      wv(DAT_006ac0f4, FUN_005adfa0(DAT_006ac0f4, 5, 0x2f));
      wv(DAT_006ac0f0, FUN_005adfa0(DAT_006ac0f0, 0, 0xe));
      FUN_00572da0();
    }
    else {
      if ((DAT_006ac120 === 3)) {
        FUN_005bb574();
      }
      wv(DAT_006ac120, DAT_006ac118);
      SVar3 = FUN_006e7d80(1);
      iVar4 = DAT_00634004;
      if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
        local_70 = DAT_00634004;
        wv(DAT_00634004, DAT_0063400c);
        local_60 = DAT_0063400c;
        wv(DAT_00634008, iVar4);
      }
      SVar3 = FUN_006e7d80(2);
      iVar4 = DAT_00634000;
      if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
        local_70 = DAT_00634000;
        wv(DAT_00634000, DAT_0063400c);
        local_60 = DAT_0063400c;
        wv(DAT_0063400c, iVar4);
      }
      FUN_005723ee();
      iVar4 = (DAT_006ac2d4 + 0xa);
      iVar6 = (DAT_006ac2d8 + 0xe0);
      FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_70);
      FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_60);
      param_2 = 0;
      param_1 = 0;
    }
  }
  if ((0x125 < param_2)) {
    if ((param_2 < (DAT_006ac87c * 4 + 0x10))) {
      /* switch */ () {
      case 0 :
        local_60 = FUN_005c0bf2(((param_1 + -16) >> 2), ((param_2 + -16) >> 2));
        SVar3 = FUN_006e7d80(1);
        if (((((SVar3) << 16 >> 16) & 0x8000) === 0)) {
          SVar3 = FUN_006e7d80(2);
          if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
            wv(DAT_0063400c, DAT_00634000);
            local_70 = DAT_00634000;
            wv(DAT_00634000, local_60);
          }
        }
        else {
          wv(DAT_00634008, DAT_00634004);
          local_70 = DAT_00634004;
          wv(DAT_00634004, local_60);
        }
        FUN_005723ee();
        iVar4 = (DAT_006ac2d4 + 0xa);
        iVar6 = (DAT_006ac2d8 + 0xe0);
        FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_70);
        FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_60);
        if ((DAT_006ac120 === 3)) {
          FUN_005bb574();
        }
        wv(DAT_006ac120, DAT_006ac118);
        wv(DAT_006ac898, 0x204);
        FUN_00408010(0x204);
        FUN_00484d52();
        break;
      case 1 :
      case 2 :
        FUN_00572389();
        wv(DAT_006ac8a4, 1);
        iVar4 = (((param_1 + -16) + (((param_1 + -16) >> 0x1f) & 3)) >> 2);
        iVar6 = (((param_2 + -16) + (((param_2 + -16) >> 0x1f) & 3)) >> 2);
        wv(DAT_006ac880, iVar4);
        wv(DAT_006ac884, iVar6);
        SVar3 = FUN_006e7d80(1);
        if (((((SVar3) << 16 >> 16) & 0x8000) === 0)) {
          SVar3 = FUN_006e7d80(2);
          if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
            wv(DAT_006ac894, DAT_00634000);
          }
        }
        else {
          wv(DAT_006ac894, DAT_00634004);
        }
        local_64 = FUN_00572887(iVar4, iVar6);
        FUN_00408490(local_64);
        break;
      case 3 :
        FUN_00572389();
        wv(DAT_006ac0f4, FUN_005adfa0((((param_1 + -16) + (((param_1 + -16) >> 0x1f) & 3)) >> 2), 5, 0x2f));
        wv(DAT_006ac0f0, FUN_005adfa0((((param_2 + -16) + (((param_2 + -16) >> 0x1f) & 3)) >> 2), 0, 0xe));
        FUN_00572da0();
      }
    }
  }
  else {
    SVar3 = FUN_006e7d80(1);
    if (((((SVar3) << 16 >> 16) & 0x8000) === 0)) {
      SVar3 = FUN_006e7d80(2);
      if (((((SVar3) << 16 >> 16) & 0x8000) !== 0)) {
        wv(DAT_0063400c, DAT_00634000);
        local_70 = DAT_00634000;
        wv(DAT_00634000, ((((param_2 + -0xdf) / 0xc | 0) * 0x20 + ((param_1 + -9) / 0xc | 0)) + 0xa));
        local_60 = ((((param_2 + -0xdf) / 0xc | 0) * 0x20 + ((param_1 + -9) / 0xc | 0)) + 0xa);
      }
    }
    else {
      wv(DAT_00634008, DAT_00634004);
      local_70 = DAT_00634004;
      wv(DAT_00634004, ((((param_2 + -0xdf) / 0xc | 0) * 0x20 + ((param_1 + -9) / 0xc | 0)) + 0xa));
      local_60 = ((((param_2 + -0xdf) / 0xc | 0) * 0x20 + ((param_1 + -9) / 0xc | 0)) + 0xa);
    }
    FUN_005723ee();
    iVar4 = (DAT_006ac2d4 + 0xa);
    iVar6 = (DAT_006ac2d8 + 0xe0);
    FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_70);
    FUN_0057261a(DAT_006ac1b0, iVar4, iVar6, local_60);
    if ((DAT_006ac120 === 3)) {
      FUN_005bb574();
    }
    wv(DAT_006ac120, DAT_006ac118);
  }
  local_8 = -1;
  FUN_00573adc();
  FUN_00573aef();
  return;
}


 export function FUN_00573adc ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00573aef (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00573afd ()

 {
  wv(DAT_006ac8a4, 0);
  FUN_006e7d88();
  return;
}


 export function FUN_00573b1d (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  param_1 = (param_1 - DAT_006ac2d4);
  param_2 = (param_2 - DAT_006ac2d8);
  if ((0x125 < param_2)) {
    if (((DAT_006ac87c * 4 + 0x10) <= param_2)) {
      if ((DAT_006ac898 !== 0x201)) {
        wv(DAT_006ac898, 0x201);
        FUN_00408010(0x201);
        FUN_00484d52();
      }
      wv(DAT_006ac884, -1);
      wv(DAT_006ac880, -1);
      iVar1 = -1;
      iVar2 = -1;
    }
    else {
      if ((DAT_006ac120 === 0)) {
        if ((DAT_006ac898 !== 0x205)) {
          wv(DAT_006ac898, 0x205);
          FUN_00408010(0x205);
          FUN_00484d52();
        }
      }
      else if ((DAT_006ac898 !== 0x204)) {
        wv(DAT_006ac898, 0x204);
        FUN_00408010(0x204);
        FUN_00484d52();
      }
      iVar1 = DAT_006ac880;
      iVar2 = DAT_006ac884;
      if ((DAT_006ac8a4 !== 0)) {
        iVar1 = (((param_1 + -16) + (((param_1 + -16) >> 0x1f) & 3)) >> 2);
        iVar2 = (((param_2 + -16) + (((param_2 + -16) >> 0x1f) & 3)) >> 2);
        if ((DAT_006ac120 === 1)) {
          if ((DAT_006ac884 < 0)) {
            wv(DAT_006ac880, iVar1);
            wv(DAT_006ac884, iVar2);
          }
          iVar4 = (iVar1 - DAT_006ac880);
          iVar5 = (iVar2 - DAT_006ac884);
          local_8 = -1;
          local_18 = -1;
          local_10 = (DAT_006ac880 << 8);
          local_14 = (DAT_006ac884 << 8);
          while ((iVar7 === iVar2)) {
            iVar6 = (local_10 >> 8);
            iVar7 = (local_14 >> 8);
            if ((iVar7 === iVar2)) {
              FUN_00572887(iVar6, iVar7);
              local_18 = iVar6;
              local_8 = iVar7;
            }
            local_10 = (local_10 + iVar4);
            local_14 = (local_14 + iVar5);
          }
          FUN_00408460();
        }
        else if ((DAT_006ac120 === 2)) {
          uVar3 = FUN_00572887(iVar1, iVar2);
          FUN_00408490(uVar3);
        }
      }
    }
  }
  else {
    iVar1 = DAT_006ac880;
    iVar2 = DAT_006ac884;
    if ((DAT_006ac898 !== 0x205)) {
      wv(DAT_006ac898, 0x205);
      FUN_00408010(0x205);
      FUN_00484d52();
      iVar1 = DAT_006ac880;
      iVar2 = DAT_006ac884;
    }
  }
  wv(DAT_006ac884, iVar2);
  wv(DAT_006ac880, iVar1);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0057405e)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x005740e7)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00573e59 (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let extraout_EAX;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_b8;
  let local_a8;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00574221;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f3e0();
  local_8 = 0;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  wv(DAT_006ac924, param_3);
  wv(DAT_006ac8a0, param_1);
  wv(DAT_006ac878, FUN_004a6980());
  wv(DAT_006ac87c, FUN_004bb540());
  bVar1 = FUN_00417f70();
  wv(DAT_006ac874, u8(bVar1));
  wv(DAT_006ac888, param_4);
  FUN_005cdf50();
  FUN_005cf23f(DAT_006ac170);
  FUN_005bd65c(FUN_004a6980(), FUN_004bb540());
  FUN_005727d8();
  FUN_005cef31(DAT_ffffff48, DAT_006ac128, 0, 0);
  wv(DAT_006ac0a4, s32((DAT_00642c48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0));
  wv(DAT_006ac0a0, s32((DAT_00642b48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0));
  wv(DAT_006ac0f0, s32((DAT_00642b48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0));
  wv(DAT_006ac0f4, s32((DAT_00642c48 + s32((DAT_006a4f88 + 0x2ec), 0) * 4), 0));
  FUN_00572389();
  wv(DAT_006ac120, 1);
  wv(DAT_006ac118, 1);
  wv(DAT_006ac124, 0);
  wv(DAT_006ac898, 0x201);
  wv(DAT_006ac88c, 1);
  wv(DAT_006ac8a4, 0);
  FUN_00572089(param_2, 0xd, 0, 0, 0x192, 0x14e, 0, 0, 0);
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  local_68 = (extraout_EAX + 8);
  local_60 = ((DAT_006ac2dc + -6) / 2 | 0);
  local_a8 = ((DAT_006ac2d8 + DAT_006ac2e0) - (extraout_EAX + 0xa));
  local_64 = (DAT_006ac2d4 + 2);
  FUN_004086c0(DAT_ffffffa4, local_64, local_a8, local_60, local_68);
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(DAT_006ac1f8, 0x65, DAT_ffffffa4, uVar2);
  FUN_0040f880(LAB_00401f73);
  local_64 = (local_64 + (local_60 + 2));
  FUN_004086c0(DAT_ffffffa4, local_64, local_a8, local_60, local_68);
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(DAT_006ac1f8, 0x66, DAT_ffffffa4, uVar2);
  FUN_0040f880(LAB_004011ea);
  FUN_0040f840();
  FUN_00414c20(LAB_00401b4f);
  wv(DAT_006ac208, DAT_006ac208);
  FUN_00414ca0(LAB_00401b4f);
  FUN_00414c60(LAB_00402013);
  wv(DAT_006ac208, DAT_006ac208);
  FUN_00414be0(LAB_00403c0b);
  wv(DAT_006ac1b0, DAT_006ac1b0);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006ac88c !== 0)) {
    FUN_0040ef50();
  }
  FUN_0059d3c9(0);
  FUN_00553379();
  local_8 = (local_8 & -0x100);
  FUN_0057420c();
  local_8 = -1;
  FUN_00574218();
  FUN_0057422b();
  return;
}


 export function FUN_0057420c ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00574218 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0057422b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00574239 ()

 {
  let bVar1;
  let local_50;
  let local_40;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_00552112();
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac46c, 0x1d);
  local_20 = (DAT_006ac2d4 + 0x10);
  local_24 = (DAT_006ac2d8 + 0x10);
  local_18 = (DAT_006ac878 << 2);
  local_1c = (DAT_006ac87c << 2);
  FUN_004086c0(DAT_ffffffec, 0, 0, DAT_006ac878, DAT_006ac87c);
  FUN_005cebb4(DAT_006ac128, DAT_ffffffec);
  bVar1 = FUN_00417f70();
  wv(DAT_006ac874, u8(bVar1));
  FUN_005a9abf(DAT_006ac1b0, local_20, local_24, local_18, local_1c, u8(bVar1));
  FUN_005cd775(4, 1);
  FUN_005cef66(DAT_ffffffc0, DAT_006ac1b0, 0, local_20, local_24);
  FUN_005cd775(1, 1);
  FUN_004ccb6a(DAT_006ac1b0, local_20, local_24, local_18, local_1c, 6);
  local_20 = (DAT_006ac2d4 + 0xa);
  local_24 = (DAT_006ac2d8 + 0xe0);
  for (/* cond: (local_28 < 0xc0) */); local_28 = (local_28 < 0xc0); local_28 = (local_28 + 1)) {
    FUN_0057261a(DAT_006ac1b0, local_20, local_24, (local_28 + 0xa));
  }
  local_20 = (DAT_006ac2d4 + 0x11e);
  local_24 = (DAT_006ac2d8 + 0x14);
  for (/* cond: (local_2c < 3) */); local_2c = (local_2c < 3); local_2c = (local_2c + 1)) {
    for (/* cond: (local_30 < 5) */); local_30 = (local_30 < 5); local_30 = (local_30 + 1)) {
      if (((local_30 === 0) && (local_2c === 0))) {
        FUN_005a9abf(DAT_006ac1b0, (local_2c * 0x24 + local_20), (local_30 * 0x26 + local_24), 0x20, 0x20, DAT_006ac874);
      }
      else {
        FUN_005a9abf(DAT_006ac1b0, (local_2c * 0x24 + local_20), (local_30 * 0x26 + local_24), 0x20, 0x20, 0x29);
        FUN_005cef31(DAT_ffffffb0, DAT_006ac1b0, (local_2c * 0x24 + local_20), (local_30 * 0x26 + local_24));
      }
      FUN_005a9964(DAT_006ac1b0, (local_2c * 0x24 + local_20), (local_30 * 0x26 + local_24), 0x20, 0x20, 0xa);
    }
  }
  FUN_005723ee();
  FUN_005baeb0(DAT_006ac1b0);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_00408460();
  return;
}


 export function FUN_00574522 (in_ECX)

 {
  let bVar1;
  let extraout_EAX;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00552112();
  FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1d);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006ab1a0);
  bVar1 = FUN_00417f70();
  wv(DAT_006ac874, u8(bVar1));
  local_c = FUN_004a6980();
  local_c = local_c * 2;
  local_10 = FUN_004bb540();
  local_10 = local_10 * 2;
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  local_1c = (extraout_EAX + 8);
  local_8 = FUN_006e7d8c(3);
  local_8 = (local_8 + 2);
  local_14 = (s32((in_ECX + 0x124), 0) + ((s32((in_ECX + 0x12c), 0) - local_c) / 2 | 0));
  local_18 = (s32((in_ECX + 0x128), 0) + (((((s32((in_ECX + 0x130), 0) - local_10) - local_1c) - local_8) + -4) / 2 | 0));
  FUN_005a9abf(in_ECX, local_14, local_18, local_c, local_10, u8(bVar1));
  FUN_005cd775(2, 1);
  FUN_005cef66(DAT_ffffffd4, in_ECX, 0, local_14, local_18);
  FUN_005cd775(1, 1);
  FUN_004ccb6a(in_ECX, local_14, local_18, local_c, local_10, 6);
  FUN_00408460();
  return;
}


 export function FUN_00574686 ()

 {
  FUN_00574522();
  return;
}


 export function FUN_005746a1 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let local_8;

  w32(param_5, 0, 0);
  w32(param_4, 0, s32(param_5, 0));
  w32(param_3, 0, s32(param_4, 0));
  w32(param_2, 0, s32(param_3, 0));
  local_8 = s32(param_2, 0);
  if ((DAT_006ac924 < 0xc)) {
    uVar1 = (param_1 >> 0x1f);
    /* switch */ () {
    case 0 :
      local_8 = 0x14;
      w32(param_2, 0, (((param_1 + (uVar1 & 3)) >> 2) * 0x25 + 0x157));
      w32(param_3, 0, ((((((param_1 ^ uVar1) - uVar1) & 3) ^ uVar1) - uVar1) * 0x15 + 0xd3));
      w32(param_4, 0, 0x24);
      w32(param_5, 0, 0x14);
      break;
    case 1 :
      if ((param_1 < 0x18)) {
        w32(param_2, 0, 1);
      }
      else {
        w32(param_2, 0, 0x14e);
        param_1 = (param_1 - 0x18);
      }
      uVar1 = (param_1 >> 0x1f);
      w32(param_2, 0, (s32(param_2, 0) + (((((param_1 ^ uVar1) - uVar1) & 3) ^ uVar1) - uVar1) * 0x41));
      w32(param_3, 0, (((param_1 + (uVar1 & 3)) >> 2) * 0x31 + 0x27));
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x30);
      local_8 = 0x30;
      break;
    case 2 :
      local_8 = 4;
      w32(param_2, 0, (param_1 * 0x41 + 0x8f));
      w32(param_3, 0, 0x1a7);
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x30);
      break;
    case 3 :
      local_8 = 0x12;
      w32(param_4, 0, 0xe);
      w32(param_5, 0, 0x16);
      w32(param_2, 0, (((param_1 >> 1) % 9) * (s32(param_4, 0) + 1) + 1));
      w32(param_3, 0, ((s32(param_5, 0) + 1) * (param_1 & 1) + 0x1a9));
      break;
    case 4 :
      local_8 = 0x42;
      w32(param_4, 0, 0x24);
      w32(param_5, 0, 0x14);
      if ((param_1 < 0x26)) {
        w32(param_2, 0, ((((((param_1 ^ uVar1) - uVar1) & 7) ^ uVar1) - uVar1) * 0x25 + 0x157));
        w32(param_3, 0, (((param_1 + (uVar1 & 7)) >> 3) * 0x15 + 1));
      }
      else {
        w32(param_2, 0, (((param_1 - 0x26) % 7) * 0x25 + 0x157));
        w32(param_3, 0, (((param_1 - 0x26) / 7 | 0) * 0x15 + 0x6a));
      }
      break;
    case 5 :
      local_8 = 1;
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x20);
      w32(param_2, 0, 0xc7);
      w32(param_3, 0, 0x100);
      break;
    case 6 :
      local_8 = 8;
      w32(param_4, 0, 0x20);
      w32(param_5, 0, 0x20);
      w32(param_2, 0, ((s32(param_4, 0) + 1) * param_1 + 1));
      w32(param_3, 0, 0x164);
      break;
    case 7 :
      local_8 = 0x2c;
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x20);
      w32(param_2, 0, ((param_1 / 0xb | 0) * 0x41 + 1));
      w32(param_3, 0, ((param_1 % 0xb) * 0x21 + 1));
      break;
    case 8 :
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x20);
      if ((param_1 < 0x40)) {
        w32(param_2, 0, ((((((param_1 ^ uVar1) - uVar1) & 7) ^ uVar1) - uVar1) * 0x41 + 1));
        w32(param_3, 0, ((((u8(((((((param_1 ^ uVar1) - uVar1) & 0xf) ^ uVar1) - uVar1) < 8)) - 1) & 0x21) + ((param_1 + (uVar1 & 0xf)) >> 4) * 0x42) + 0x43));
      }
      else {
        w32(param_2, 0, ((param_1 - 0x40) * 0x41 + 1));
        w32(param_3, 0, 0x14b);
      }
      local_8 = 0x44;
      break;
    case 9 :
      w32(param_4, 0, 0x20);
      w32(param_5, 0, 0x10);
      w32(param_2, 0, 1);
      w32(param_3, 0, 0x1ad);
      /* switch */ ((((param_1 ^ uVar1)  ) ((param_1 ^ uVar1) - uVar1)  (((param_1 ^ uVar1) - uVar1) & 3)  ((((param_1 ^ uVar1) - uVar1) & 3) ^ uVar1) ) (((((param_1 ^ uVar1) - uVar1) & 3) ^ uVar1) - uVar1) ) {
      case 0 :
        break;
      case 1 :
        w32(param_3, 0, (s32(param_3, 0) + 0x22));
        w32(param_2, 0, (s32(param_2, 0) + 0x21));
        break;
      case 2 :
        w32(param_3, 0, (s32(param_3, 0) + 0x11));
        break;
      case 3 :
        w32(param_3, 0, (s32(param_3, 0) + 0x22));
      }
      w32(param_2, 0, (s32(param_2, 0) + ((param_1 + (uVar1 & 3)) >> 2) * 0x42));
      local_8 = 0x20;
      break;
    case 10 :
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x20);
      w32(param_2, 0, 0x1c8);
      if ((param_1 < 6)) {
        w32(param_3, 0, (param_1 * 0x21 + 0x64));
      }
      else {
        w32(param_2, 0, (((param_1 - 6) % 9) * 0x41 + 1));
        w32(param_3, 0, (((param_1 - 6) / 9 | 0) * 0x21 + 0x16c));
      }
      local_8 = 0x18;
      break;
    case 0xb :
      local_8 = 0x3f;
      w32(param_3, 0, ((param_1 / 9 | 0) * 0x31 + 1));
      w32(param_2, 0, ((param_1 % 9) * 0x41 + 1));
      w32(param_4, 0, 0x40);
      w32(param_5, 0, 0x30);
    }
  }
  return local_8;
}


 export function FUN_00574c47 (param_1)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_005746a1(param_1, DAT_fffffff0, DAT_ffffffec, DAT_fffffff8, DAT_fffffff4);
  FUN_005cdf50();
  FUN_005cedad(DAT_006ac0a8, 7, local_10, local_14, local_8, local_c);
  FUN_00574686();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00574e18)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00574ca6 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let local_8;

  if ((param_1 === 0)) {
    FUN_005f22d0(DAT_006ac5bc, DAT_006341f4);
  }
  else {
    FUN_005f22d0(DAT_006ac5bc, param_1);
  }
  _DAT_006ac75c = DAT_006ab1a0;
  _DAT_006ac754 = DAT_006ab190;
  _DAT_006ac758 = DAT_006ab178;
  _DAT_006ac59c = param_2;
  wv(DAT_006ac5a0, param_8);
  wv(DAT_006ac5a4, param_9);
  wv(DAT_006ac5a8, param_7);
  _DAT_006ac684 = 0;
  _DAT_006ac730 = 0;
  if (((param_2 & 4) !== 0)) {
    wv(DAT_006ac5a0, DAT_00633598);
    wv(DAT_006ac5a4, DAT_0063359c);
  }
  if (((param_2 & 8) === 0)) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if ((DAT_006ac5a0 !== 0)) {
    local_8 = (local_8 | 0x400);
  }
  if ((param_7 !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_2 & 2) === 0)) {
    param_5 = (param_5 + DAT_006ac5a4 * 2);
    param_6 = (param_6 + (DAT_006ac5a0 + DAT_006ac5a4));
  }
  if (((param_2 & 1) !== 0)) {
    param_3 = ((DAT_006ab198 >> 1) - (param_5 >> 1));
    param_4 = ((DAT_006ab19c >> 1) - (param_6 >> 1));
  }
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, DAT_006a8c00, DAT_006ac1f8);
  if ((DAT_006ac5a0 !== 0)) {
    FUN_00497d00(DAT_006ac5a0);
  }
  if ((DAT_006ac5a8 !== 0)) {
    FUN_004cff70(DAT_006ac5a8);
  }
  FUN_00552ed2();
  return;
}


 export function FUN_00574e98 ()

 {
  let bVar1;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;

  FUN_005cf467(9, 7);
  local_18 = FUN_004a6980();
  local_1c = FUN_004bb540();
  bVar1 = FUN_00417f70();
  wv(DAT_006ac874, u8(bVar1));
  FUN_005727d8();
  FUN_005cef31(DAT_ffffffd4, DAT_006ac128, 0, 0);
  FUN_005cdf50();
  FUN_004086c0(DAT_ffffffec, 0, 0, local_18, local_1c);
  FUN_005cebb4(DAT_006ac128, DAT_ffffffec);
  wv(DAT_006ac890, 0);
  wv(DAT_006ac11c, (DAT_006ac11c + 0x48));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x00574f76)  */ */ export function FUN_00574f50 ()

 {
  let uVar1;
  let local_3c;
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

  FUN_005a6c23(DAT_006ac4d0);
  local_8 = FUN_00419100(s_DEBUG_006359dc, s_RUSURE_006341f8, 1);
  FUN_005a6c45();
  if ((local_8 === 0)) {
    /* switch */ () {
    case 0 :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        uVar1 = (local_20 >> 0x1f);
        FUN_00575d89((DAT_00646cb8 + (((local_20 + (uVar1 & 3)) >> 2) * 0xf0 + (((((local_20 ^ uVar1) - uVar1) & 3) ^ uVar1) - uVar1) * 0x3c)), local_18, local_1c, local_10, local_14);
      }
      break;
    case 1 :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        local_c = (local_20 % 0x18);
        uVar1 = (local_c >> 0x1f);
        local_24 = ((local_c + (uVar1 & 3)) >> 2);
        local_28 = (((((local_c ^ uVar1) - uVar1) & 3) ^ uVar1) - uVar1);
        local_2c = (local_20 / 0x18 | 0);
        FUN_005cdf50();
        FUN_00575d89((DAT_0063fe50 + ((local_24 * 0x1e0 + local_2c * 0x3c) + local_28 * 0x78)), local_18, local_1c, local_10, local_14);
      }
      break;
    case 2 :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        /* switch */ () {
        case 0 :
          FUN_005cdf50();
          FUN_00575d89(DAT_006465d8, local_18, local_1c, local_10, local_14);
          break;
        case 1 :
          FUN_005cdf50();
          FUN_00575d89(DAT_00646650, local_18, local_1c, local_10, local_14);
          break;
        case 2 :
          FUN_005cdf50();
          FUN_00575d89(DAT_00647fa0, local_18, local_1c, local_10, local_14);
          break;
        case 3 :
          FUN_005cdf50();
          FUN_00575d89(DAT_00647fdc, local_18, local_1c, local_10, local_14);
        }
      }
      break;
    case 3 :
      for (/* cond: (local_20 < 8) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20 * 2, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_006442f8 + local_20 * 0x78), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 * 2 + 1), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00644334 + local_20 * 0x78), local_18, local_1c, local_10, local_14);
      }
      break;
    case 4 :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        if ((local_20 < 0x26)) {
          FUN_005cdf50();
          FUN_00575d89((DAT_00645160 + (local_20 * 4 + 4) * 0xf), local_18, local_1c, local_10, local_14)
          ;
        }
        else {
          FUN_005cdf50();
          FUN_00575d89((DAT_00645a84 + (local_20 * 4 + -0x98) * 0xf), local_18, local_1c, local_10, local_14);
        }
      }
      break;
    case 5 :
      break;
    case 6 :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00647168 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
      break;
    case 7 :
      for (/* cond: (local_20 < 0xb) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00647c40 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0x16), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_006482f8 + local_20 * 0x78), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0x21), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00648334 + local_20 * 0x78), local_18, local_1c, local_10, local_14);
      }
      break;
    case 8 :
      for (/* cond: (local_20 < 0x10) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_0063f858 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0x10), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_006461d8 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0x20), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00647388 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0x30), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_006447b0 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
      for (/* cond: (local_20 < 4) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1((local_20 + 0x40), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_0063fd18 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
      break;
    case 9 :
      for (/* cond: (local_20 < 8) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1((local_20 << 2), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00643b38 + local_20 * 0xf0), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 * 4 + 1), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00643b74 + local_20 * 0xf0), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 * 4 + 2), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00643bb0 + local_20 * 0xf0), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 * 4 + 3), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00643bec + local_20 * 0xf0), local_18, local_1c, local_10, local_14);
      }
      break;
    case 10 :
      for (/* cond: (local_20 < 3) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_006446b8 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
      FUN_005746a1(3, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
      FUN_005cdf50();
      FUN_00575d89(DAT_00641808, local_18, local_1c, local_10, local_14);
      FUN_005746a1(4, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
      FUN_005cdf50();
      FUN_00575d89(DAT_0063fc18, local_18, local_1c, local_10, local_14);
      FUN_005746a1(5, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
      FUN_005cdf50();
      FUN_00575d89(DAT_00646158, local_18, local_1c, local_10, local_14);
      for (/* cond: (local_20 < 9) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1((local_20 + 6), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00642710 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
        FUN_005746a1((local_20 + 0xf), DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_0064292c + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
      break;
    case 0xb :
      for (/* cond: (local_20 < DAT_006ac89c) */); local_20 = local_20; local_20 = (local_20 + 1)) {
        FUN_005746a1(local_20, DAT_ffffffe8, DAT_ffffffe4, DAT_fffffff0, DAT_ffffffec);
        FUN_005cdf50();
        FUN_00575d89((DAT_00641848 + local_20 * 0x3c), local_18, local_1c, local_10, local_14);
      }
    }
    FUN_005cdf50();
    FUN_005cf23f(DAT_006ac170);
    FUN_005bd65c(DAT_006ac878, DAT_006ac87c);
    FUN_005727d8();
    FUN_005cef31(DAT_ffffffc4, DAT_006ac128, 0, 0);
    FUN_005cdf50();
    FUN_005cf23f(DAT_006ac8a8);
    wv(DAT_006ac890, 0);
    wv(DAT_006ac11c, (DAT_006ac11c + 0x48));
    FUN_005bb574();
  }
  return;
}


 export function FUN_00575d89 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005cedad(DAT_006ac0a8, 7, param_2, param_3, param_4, param_5);
  FUN_005cf467(9, 7);
  return;
}


 export function FUN_00575dc4 ()

 {
  wv(DAT_006ac890, 0);
  wv(DAT_006ac11c, (DAT_006ac11c + 0x48));
  return;
}


 export function FUN_00575dec (in_ECX)

 {
  let uVar1;
  let extraout_EAX;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  wv(DAT_006ac11c, in_ECX);
  w32((in_ECX + 0x2d8), 0, 0xf0);
  w32((in_ECX + 0x2dc), 0, 0xf0);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x950), 0), 0xd, 0, 0, s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0), 0, 0, 0);
  FUN_00574ca6(uVar1);
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2f4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2f0), 0, (s32((in_ECX + 0x12c), 0) + -4));
  iVar2 = FUN_006e7d8c(3);
  local_8 = (iVar2 + 2);
  w32((in_ECX + 0x2e8), 0, (s32((in_ECX + 0x12c), 0) + -4));
  local_20 = (((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2f4), 0) + 2)) - (iVar2 + 4));
  local_1c = (s32((in_ECX + 0x124), 0) + 2);
  wv(DAT_006ac89c, FUN_005746a1(0, DAT_ffffffdc, DAT_ffffffdc, DAT_ffffffdc, DAT_ffffffdc));
  FUN_004086c0(DAT_ffffffe8, local_1c, local_20, s32((in_ECX + 0x2e8), 0), local_8);
  if ((in_ECX === 0)) {
    local_28 = 0;
  }
  else {
    local_28 = (in_ECX + 0x48);
  }
  FUN_0040fc50(local_28, 0x65, DAT_ffffffe8, 0);
  FUN_0040fd40(0, (FUN_005746a1(0, DAT_ffffffdc, DAT_ffffffdc, DAT_ffffffdc, DAT_ffffffdc) + -1));
  FUN_0040fcf0(0);
  FUN_0040fd80(thunk_FUN_00574c47);
  FUN_00574c47(0);
  FUN_0040f380();
  w32((in_ECX + 0x2f0), 0, ((s32((in_ECX + 0x12c), 0) + -8) / 3 | 0));
  local_20 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2f4), 0) + 2));
  local_1c = (s32((in_ECX + 0x124), 0) + 2);
  FUN_004086c0(DAT_ffffffe8, local_1c, local_20, s32((in_ECX + 0x2f0), 0), s32((in_ECX + 0x2f4), 0));
  if ((in_ECX === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = (in_ECX + 0x48);
  }
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_2c, 0xc9, DAT_ffffffe8, uVar1);
  FUN_0040f880(LAB_004013c5);
  FUN_0040f7d0();
  local_1c = (local_1c + (s32((in_ECX + 0x2f0), 0) + 2));
  FUN_004086c0(DAT_ffffffe8, local_1c, local_20, s32((in_ECX + 0x2f0), 0), s32((in_ECX + 0x2f4), 0));
  if ((in_ECX === 0)) {
    local_30 = 0;
  }
  else {
    local_30 = (in_ECX + 0x48);
  }
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x954), 0));
  FUN_0040f680(local_30, 0xc9, DAT_ffffffe8, uVar1);
  FUN_0040f880(LAB_004029a5);
  FUN_0040f7d0();
  if ((DAT_006ac924 === 5)) {
    FUN_00453c40();
  }
  local_1c = (local_1c + (s32((in_ECX + 0x2f0), 0) + 2));
  FUN_004086c0(DAT_ffffffe8, local_1c, local_20, s32((in_ECX + 0x2f0), 0), s32((in_ECX + 0x2f4), 0));
  if ((in_ECX === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = (in_ECX + 0x48);
  }
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_34, 0xca, DAT_ffffffe8, uVar1);
  FUN_0040f880(LAB_00402cde);
  FUN_0040f840();
  in_ECX = EnableStackedTabs(in_ECX, 0x403887);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006ac890 !== 0)) {
    FUN_0040ef50();
  }
  FUN_00553379();
  return;
}


 export function FUN_0057624d ()

 {
  FUN_00575dec();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0057656d)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x005763fb)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x00576601)  */ */ export function FUN_00576267 ()

 {
  let uVar1;
  let iVar2;
  let _MaxCount;
  let pcVar3;
  let unaff_FS_OFFSET;
  let pCVar4;
  let pCVar5;
  let UVar6;
  let local_9d0;
  let local_94c;
  let local_948;
  let local_844;
  let local_840;
  let local_73c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005767bf;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  FUN_0059db08(0x4000);
  local_8 = ((((local_8) >> 8) << 8) | 1);
  /* switch */ () {
  case 0 :
  case 4 :
  case 5 :
  case 6 :
    local_844 = s_ICONS_00634210;
    break;
  case 1 :
  case 2 :
  case 3 :
    local_844 = s_CITIES_00634218;
    break;
  case 7 :
  case 8 :
  case 9 :
  case 10 :
    local_844 = s_TERRAIN_00634208;
    break;
  case 0xb :
    local_844 = s_UNITS_00634200;
  }
  do {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x958), 0), 0, local_844, local_844, 0, 0);
    _sprintf(DAT_fffff7c0, s_%s_%s%c%s*.BMP;%s*.GIF%c%c_00634220, local_844, uVar1);
    _sprintf(DAT_fffff6b8, s_%s*.BMP;%s*.GIF_0063423c, local_844, local_844);
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x95c), 0), local_844);
    _sprintf(DAT_fffff630, s_%s_%s_0063424c, uVar1);
    iVar2 = FUN_004731d2(DAT_006ac1f8, DAT_fffff630, DAT_fffff6b8, DAT_fffff7c0, s_BMP;GIF_00634254, 1, 0);
    if ((iVar2 === 0));
    local_94c = 1;
    local_14 = _strrchr(DAT_fffff6b8, 0x5c);
    if ((local_14 === 0)) {
      local_14 = DAT_fffff6b8;
    }
    else {
      local_14 = (local_14 + 1);
    }
    _MaxCount = _strlen(local_844);
    iVar2 = _strncmp(local_14, local_844, _MaxCount);
    if ((iVar2 === 0)) {
      if ((DAT_006ac924 === 0xa)) {
        iVar2 = _isdigit(s8(_MEM[local_14 + 7]));
        if (((_MEM[local_14 + 7] & 1) !== 0));
        FUN_00444270(s_ODDTERRAIN_00634264);
        FUN_005a6c45();
      }
      else if (((_MEM[local_14 + 7] & 1) !== 0)) {
        FUN_005a6c23(DAT_006ac4d0);
        FUN_00444270(s_EVENTERRAIN_00634270);
        FUN_005a6c45();
      }
      else {
 LAB_00576631: :
        pcVar3 = _strstr(DAT_fffff6b8, DAT_0063427c);
        if ((pcVar3 === 0)) {
          pcVar3 = _strstr(DAT_fffff6b8, DAT_00634280);
          if ((pcVar3 === 0)) {
            UVar6 = 0x10;
            pCVar5 = 0;
            pCVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x968), 0));
            iVar2 = FUN_00414d10();
            FUN_006e7dd4(s32((iVar2 + 4), 0), pCVar4, pCVar5, UVar6);
          }
          else {
            iVar2 = FUN_005bf071(DAT_fffff6b8, 0xa, 0xc0, DAT_fffff8c4);
            if ((iVar2 === 0)) {
              UVar6 = 0x10;
              pCVar5 = 0;
              pCVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x964), 0));
              iVar2 = FUN_00414d10();
              FUN_006e7dd4(s32((iVar2 + 4), 0), pCVar4, pCVar5, UVar6);
            }
            else {
              local_94c = 0;
            }
          }
        }
        else {
          iVar2 = FUN_0046f460(DAT_006ac0a8, DAT_fffff6b8, 0xa, 0xc0, DAT_fffff8c4);
          if ((iVar2 === 0)) {
            UVar6 = 0x10;
            pCVar5 = 0;
            pCVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x964), 0));
            iVar2 = FUN_00414d10();
            FUN_006e7dd4(s32((iVar2 + 4), 0), pCVar4, pCVar5, UVar6);
          }
          else {
            local_94c = 0;
          }
        }
      }
    }
    else {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x960), 0), local_844);
      _sprintf(DAT_fffff630, s_%s_"%s"_0063425c, uVar1);
      UVar6 = 0x40;
      pCVar4 = 0;
      pcVar3 = DAT_fffff630;
      iVar2 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar2 + 4), 0), pcVar3, pCVar4, UVar6);
    }
  } while ((local_94c !== 0));
  FUN_0057624d();
  FUN_00574239();
 LAB_00576783: :
  FUN_004083f0();
  local_8 = (local_8 & -0x100);
  FUN_005767a7();
  local_8 = -1;
  FUN_005767b3();
  FUN_005767c9();
  return;
}


 export function FUN_005767a7 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005767b3 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005767c9 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
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

  puStack_c = LAB_00578447;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 3;
  FUN_00578402();
  local_8 = 2;
  FUN_00578411();
  local_8 = 1;
  FUN_00578420();
  local_8 = (0 << 8);
  FUN_0057842f();
  local_8 = -1;
  FUN_0057843e();
  FUN_00578451();
  return;
}


 export function FUN_00578402 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00578411 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00578420 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0057842f ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_0057843e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_00578451 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005784a0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0057857a;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_0040fb00();
  local_8 = 1;
  FUN_0040f3e0();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 3);
  FUN_0040f3e0();
  w32(in_ECX, 0, PTR_FUN_0061d6fc);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* ios_base::precision(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function precision (this, param_1)

 {
  let iVar1;

  iVar1 = s32((this + 0x10), 0);
  w32((this + 0x10), 0, param_1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* ios_base::width(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function width (this, param_1)

 {
  let iVar1;

  iVar1 = s32((this + 0x14), 0);
  w32((this + 0x14), 0, param_1);
  return iVar1;
}


 export function FUN_00578650 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004980ec((in_ECX + 4));
  FUN_00497ea0((in_ECX + 4), 0xb, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* void */  /* __thiscall */
 /* CHtmlStream::Reset(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Reset (this)

 {
  w32((this + 0x1c), 0, 0);
  w32((this + 0x18), 0, 0);
  return;
}


 export function FUN_005786b6 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0049805e((in_ECX + 4));
  in_ECX = Reset(in_ECX);
  FUN_00578650(param_1);
  return;
}


 export function FUN_005786f1 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00578755;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005dcc10();
  local_8 = 0;
  FUN_00428cb0();
  FUN_005786b6(param_1);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00578770 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005787c6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  FUN_004980ec((in_ECX + 4));
  local_8 = -1;
  FUN_005787bd();
  FUN_005787d0();
  return;
}


 export function FUN_005787bd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_005787d0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005787de (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;

  local_c = s32((in_ECX + 0x1c), 0);
  while ((s32((local_c + 4), 0) === param_1)) {
    if ((local_c === 0)) {
      return 0;
    }
    if ((s32((local_c + 4), 0) === param_1));
  }
  return local_c;
}


 export function FUN_00578840 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 1;
  for (/* cond: (param_1 !== local_8) */); (local_8 = (local_8 !== 0) && (param_1 = (param_1 !== local_8)));
      local_8 = s32((local_8 + 0x10), 0)) {
    if (((_MEM[(local_8 + 8)] & 2) === 0)) {
      local_c = (local_c + 1);
    }
  }
  return local_c;
}


 export function FUN_005788a9 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;

  local_10 = 1;
  local_c = s32((in_ECX + 0x1c), 0);
  do {
    if ((local_c === 0)) {
      return -1;
    }
    if (((_MEM[(local_c + 8)] & 2) === 0)) {
      if ((local_10 === param_1)) {
        return s32((local_c + 4), 0);
      }
      local_10 = (local_10 + 1);
    }
    local_c = s32((local_c + 0x10), 0);
  } ( true );
}


 export function FUN_00578922 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_10 = s32((in_ECX + 0x1c), 0);
  do {
    if ((local_10 === 0)) {
      return local_8;
    }
    for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
      if ((s32((local_c + 4), 0) === param_1)) {
        local_8 = local_c;
        break;
      }
    }
    local_10 = s32((local_10 + 0x10), 0);
  } ( true );
}


 export function FUN_005789aa (param_1)

 {
  let local_c;
  let local_8;

  local_c = 1;
  for (/* cond: (param_1 !== local_8) */); (local_8 = (local_8 !== 0) && (param_1 = (param_1 !== local_8)));
      local_8 = s32((local_8 + 0x10), 0)) {
    if (((_MEM[(local_8 + 8)] & 2) === 0)) {
      local_c = (local_c + 1);
    }
  }
  return local_c;
}


 export function FUN_00578a1c (param_1, param_2)

 {
  let iVar1;
  let local_10;
  let local_c;

  local_10 = 1;
  iVar1 = FUN_005787de(param_1);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
      if (((_MEM[(local_c + 8)] & 2) === 0)) {
        if ((local_10 === param_2)) {
          return s32((local_c + 4), 0);
        }
        local_10 = (local_10 + 1);
      }
    }
  }
  return -1;
}


 export function FUN_00578abd (param_1)

 {
  let local_8;

  for (/* cond: (_MEM[local_8] !== 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    if ((_MEM[local_8] === 0x7c)) {
      _MEM[local_8] = 9;
    }
  }
  return;
}


 export function FUN_00578b06 (in_ECX, param_1, param_2)

 {
  let puVar1;
  let sVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_c;

  puVar1 = FUN_00498159((in_ECX + 4), 0x1c);
  if ((s32((in_ECX + 0x1c), 0) === 0)) {
    w32((in_ECX + 0x1c), 0, puVar1);
    w32(puVar1, 5, 0);
  }
  else {
    for (/* cond: (s32((local_c + 0x10), 0) !== 0) */); local_c = (local_c + 0x10);
        local_c = s32((local_c + 0x10), 0)) {
    }
    w32((local_c + 0x10), 0, puVar1);
    w32(puVar1, 5, local_c);
  }
  w32(puVar1, 4, 0);
  w32(puVar1, 6, 0);
  w32(puVar1, 2, 0);
  w32(puVar1, 1, param_1);
  w32(puVar1, 3, 0);
  sVar2 = _strlen(param_2);
  uVar3 = FUN_00498159((in_ECX + 4), (sVar2 + 1));
  w32(puVar1, 0, uVar3);
  FUN_005f22d0(s32(puVar1, 0), param_2);
  FUN_00578abd(s32(puVar1, 0));
  w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
  return puVar1;
}


 export function FUN_00578c12 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let sVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  iVar1 = FUN_005787de(param_1);
  if ((iVar1 !== 0)) {
    local_c = FUN_00498159((in_ECX + 4), 0x1c);
    if ((s32((iVar1 + 0x18), 0) === 0)) {
      w32((iVar1 + 0x18), 0, local_c);
      w32(local_c, 5, 0);
    }
    else {
      for (/* cond: (s32((local_8 + 0x10), 0) !== 0) */); local_8 = (local_8 + 0x10);
          local_8 = s32((local_8 + 0x10), 0)) {
      }
      w32((local_8 + 0x10), 0, local_c);
      w32(local_c, 5, local_8);
    }
    w32(local_c, 6, iVar1);
    w32(local_c, 4, 0);
    w32(local_c, 2, 0);
    w32(local_c, 1, param_2);
    w32(local_c, 3, 0);
    if ((param_3 === 0)) {
      w32(local_c, 0, 0);
    }
    else {
      sVar2 = _strlen(param_3);
      if ((sVar2 < param_4)) {
        local_10 = param_4;
      }
      else {
        local_10 = _strlen(param_3);
      }
      uVar3 = FUN_00498159((in_ECX + 4), (local_10 + 1));
      w32(local_c, 0, uVar3);
      FUN_005f22d0(s32(local_c, 0), param_3);
      FUN_00578abd(s32(local_c, 0));
    }
    w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
  }
  return local_c;
}


 export function FUN_00578d8a (param_1, param_2)

 {
  let uVar1;
  let uVar2;

  if ((DAT_0063430c !== 0)) {
    uVar1 = FUN_005788a9(param_1);
    uVar2 = FUN_00578a1c(uVar1, param_2);
    wv(DAT_0063430c, DAT_0063430c(uVar1, uVar2));
  }
  return;
}


 export function FUN_00578de8 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 !== 0)) {
    wv(DAT_00634304, param_1);
    wv(DAT_00634308, in_ECX);
    FUN_00579b40(in_ECX);
    param_1 = EnableStackedTabs(param_1, 0x40341d);
  }
  return;
}


 export function FUN_00578e38 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  wv(DAT_00634308, in_ECX);
  wv(DAT_0063430c, param_1);
  return;
}


 export function FUN_00578e60 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let uVar4;

  iVar1 = FUN_00578922(param_1);
  if ((iVar1 !== 0)) {
    uVar2 = ((~s32((iVar1 + 8), 0)) & 1);
    uVar3 = FUN_005789aa(iVar1);
    uVar4 = FUN_00578840(s32((iVar1 + 0x18), 0));
    FUN_00579ac0(uVar4, uVar3, uVar2);
  }
  return;
}


 export function FUN_00578ec7 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let uVar4;

  iVar1 = FUN_00578922(param_1);
  if ((iVar1 !== 0)) {
    uVar2 = (s32((iVar1 + 8), 0) & 4);
    uVar3 = FUN_005789aa(iVar1);
    uVar4 = FUN_00578840(s32((iVar1 + 0x18), 0));
    FUN_00579b00(uVar4, uVar3, uVar2);
  }
  return;
}


 export function FUN_00578f2c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;

  if (((_MEM[(in_ECX + 0x19)] & 0x80) === 0)) {
    local_104 = 0;
    local_118 = s32((in_ECX + 0x1c), 0);
    local_114 = 1;
    for (/* cond: (local_118 !== 0) */); local_118 = (local_118 !== 0); local_118 = s32(local_118, 4)) {
      if (((_MEM[(local_118 + 2)] & 2) === 0)) {
        FUN_005f22e0(DAT_fffffefc, s32(local_118, 0));
        FUN_005f22e0(DAT_fffffefc, DAT_00634310);
      }
      if ((param_1 === 0)) {
        for (/* cond: (0 < local_108) */); 0 = (0 < local_108); local_108 = (local_108 + -1)) {
          FUN_00579a40(local_114, local_108);
        }
        w32(local_118, 3, 0);
      }
      local_114 = (local_114 + 1);
    }
    if ((param_1 !== 0)) {
      FUN_005799c0(DAT_fffffefc);
    }
    local_118 = s32((in_ECX + 0x1c), 0);
    local_114 = 1;
    for (/* cond: (local_118 !== 0) */); local_118 = (local_118 !== 0); local_118 = s32((local_118 + 0x10), 0)) {
      if (((_MEM[(local_118 + 8)] & 2) === 0)) {
        if ((param_1 !== 0)) {
          FUN_00579a40(local_114, 1);
        }
        local_10c = s32((local_118 + 0x18), 0);
        local_110 = 1;
        for (/* cond: (local_10c !== 0) */); local_10c = (local_10c !== 0); local_10c = s32(local_10c, 4)) {
          if (((_MEM[(local_10c + 2)] & 2) === 0)) {
            w32((local_118 + 0xc), 0, (s32((local_118 + 0xc), 0) + 1));
            FUN_00579a00(local_114, local_110, s32(local_10c, 0));
            if (((_MEM[(local_10c + 2)] & 1) !== 0)) {
              FUN_00578e60(s32(local_10c, 1));
            }
            if (((_MEM[(local_10c + 2)] & 4) !== 0)) {
              FUN_00578ec7(s32(local_10c, 1));
            }
            local_110 = (local_110 + 1);
          }
        }
        local_114 = (local_114 + 1);
      }
    }
    w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) | 0x8000));
    FUN_00578de8(param_1);
  }
  if ((DAT_00634304 !== 0)) {
    FUN_00579bf0();
  }
  return;
}


 export function FUN_005791df (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005787de(param_1);
  if ((iVar1 !== 0)) {
    if ((param_2 === 0)) {
      if (((_MEM[(iVar1 + 8)] & 2) !== 0)) {
        w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
      }
      w32((iVar1 + 8), 0, (s32((iVar1 + 8), 0) & -3));
    }
    else {
      if (((_MEM[(iVar1 + 8)] & 2) === 0)) {
        w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
      }
      w32((iVar1 + 8), 0, (s32((iVar1 + 8), 0) | 2));
    }
  }
  return;
}


 export function FUN_00579260 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_00578922(param_1);
  if ((iVar1 !== 0)) {
    if ((param_2 === 0)) {
      if (((_MEM[(iVar1 + 8)] & 2) !== 0)) {
        w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
      }
      w32((iVar1 + 8), 0, (s32((iVar1 + 8), 0) & -3));
    }
    else {
      if (((_MEM[(iVar1 + 8)] & 2) === 0)) {
        w32((in_ECX + 0x18), 0, (s32((in_ECX + 0x18), 0) & -0x8001));
      }
      w32((iVar1 + 8), 0, (s32((iVar1 + 8), 0) | 2));
    }
  }
  return;
}


 export function FUN_005792e1 (in_ECX, param_1, param_2)

 {
  let bVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  iVar2 = FUN_00578922(param_1);
  if ((iVar2 !== 0)) {
    bVar1 = _MEM[(iVar2 + 8)];
    if ((param_2 !== 0)) {
      w32((iVar2 + 8), 0, (s32((iVar2 + 8), 0) | 1));
    }
    else {
      w32((iVar2 + 8), 0, (s32((iVar2 + 8), 0) & -2));
    }
    if ((((bVar1 & 1) !== 0) !== (param_2 !== 0))) {
      FUN_00578e60(param_1);
    }
  }
  return;
}


 export function FUN_005793a3 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;

  iVar1 = FUN_00578922(param_1);
  if ((iVar1 !== 0)) {
    uVar2 = FUN_005789aa(iVar1);
    uVar3 = FUN_00578840(s32((iVar1 + 0x18), 0));
    FUN_00579a40(uVar3, uVar2);
    w32((s32((iVar1 + 0x14), 0) + 0x10), 0, s32((iVar1 + 0x10), 0));
  }
  return;
}


 export function FUN_0057940d (in_ECX, param_1, param_2)

 {
  let bVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  iVar2 = FUN_00578922(param_1);
  if ((iVar2 !== 0)) {
    bVar1 = _MEM[(iVar2 + 8)];
    if ((param_2 !== 0)) {
      w32((iVar2 + 8), 0, (s32((iVar2 + 8), 0) | 4));
    }
    else {
      w32((iVar2 + 8), 0, (s32((iVar2 + 8), 0) & -5));
    }
    if ((((bVar1 & 4) !== 0) !== (param_2 !== 0))) {
      FUN_00578ec7(param_1);
    }
  }
  return;
}


 export function FUN_005794cf (param_1, param_2)

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_005787de(param_1);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x10), 0)) {
      FUN_005792e1(s32((local_8 + 4), 0), param_2);
    }
  }
  return;
}


 export function FUN_0057953e (in_ECX, param_1, param_2)

 {
  let puVar1;
  let uVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let uVar4;

  puVar1 = FUN_00578922(param_1);
  if ((puVar1 !== 0)) {
    FUN_005f22d0(s32(puVar1, 0), param_2);
    FUN_00578abd(s32(puVar1, 0));
    if (((_MEM[(puVar1 + 2)] & 2) === 0)) {
      uVar4 = s32(puVar1, 0);
      uVar2 = FUN_005789aa(puVar1);
      uVar3 = FUN_00578840(s32(puVar1, 6));
      FUN_00579a80(uVar3, uVar2, uVar4);
    }
  }
  return;
}


 export function FUN_005799c0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005e0f2a(param_1);
  w32(in_ECX, 0, uVar1);
  return;
}


 export function FUN_00579a00 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e128c(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 export function FUN_00579a40 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005e1226(s32(in_ECX, 0), param_1, param_2);
  return;
}


 export function FUN_00579a80 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e14c8(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 export function FUN_00579ac0 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e1118(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 export function FUN_00579b00 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e11be(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 export function FUN_00579b40 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_00579b90();
  uVar1 = FUN_00414d10(uVar1);
  FUN_005bcdfc(uVar1);
  w32((in_ECX + 0x78), 0, param_1);
  return;
}


 export function FUN_00579b90 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x98), 0, param_1);
  return;
}


 export function FUN_00579bf0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x78), 0) !== 0)) {
    uVar1 = FUN_00414d10();
    FUN_005e10fb(uVar1);
  }
  return;
}


 export function FUN_00579c40 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  FUN_00467750(param_1, param_2, 0x60);
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    FUN_0045ac71(param_1, param_2, -1);
  }
  FUN_00467750(param_1, param_2, 0xc);
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 1) !== 0)) {
    FUN_00467825(param_1, param_2, 0x2000);
    FUN_00467933(param_1, param_2, 0x64);
    FUN_00467933(param_2, param_1, 0x64);
    if (((_MEM[DAT_0064c6c1 + (param_2 * 4 + param_1 * 0x594)] & 0x10) === 0)) {
      w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x1000));
      local_8 = 1;
    }
  }
  return local_8;
}


 export function FUN_00579dbb (param_1)

 {
  let iVar1;
  let local_8;

  iVar1 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
  if ((s32((DAT_0064c6a2 + iVar1 * 0x594), 0) < (0x7d00 / s8(_MEM[DAT_0064f349 + param_1 * 0x58]) | 0))) {
    local_8 = (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) * s32((DAT_0064c6a2 + iVar1 * 0x594), 0) / (((s16((DAT_0064c70c + iVar1 * 0x594), 0)) << 16 >> 16) + 1) | 0);
  }
  else {
    local_8 = (s32((DAT_0064c6a2 + iVar1 * 0x594), 0) / (((s16((DAT_0064c70c + iVar1 * 0x594), 0)) << 16 >> 16) + 1) | 0) * s8(_MEM[DAT_0064f349 + param_1 * 0x58]);
  }
  if ((local_8 < 0)) {
    local_8 = 0x7d00;
  }
  return local_8;
}


 export function FUN_00579ed0 (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let local_8;

  if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + param_2 * 4)] & 0x20) === 0)) {
    if (((param_3 & s32((DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)), 0)) === 0)) {
      uVar1 = 0;
    }
    else if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 8) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 4) === 0)) {
          if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 2) === 0)) {
            local_8 = FUN_00410030(s_ANNOY_00634348, DAT_00644e48, 0);
          }
          else if (((_MEM[DAT_0064c6c2 + (param_1 * 0x594 + param_2 * 4)] & 4) === 0)) {
            local_8 = FUN_00410030(s_ANNOYCEASE_0063433c, DAT_00647748, 0);
          }
          else {
            local_8 = FUN_00410030(s_ANNOYVASSAL_00634330, DAT_00647748, 0);
          }
        }
        else {
          local_8 = FUN_00410030(s_ANNOYPEACE_00634324, DAT_006409d8, 0);
        }
        if ((local_8 === 1)) {
          iVar2 = FUN_0055bef9(param_1, param_2);
          if ((iVar2 === 0)) {
            if ((4 < _MEM[DAT_0064c6b5 + param_1 * 0x594])) {
              iVar2 = FUN_00453e51(param_2, 0x18);
              if ((iVar2 === 0)) {
                if ((_MEM[DAT_0064c6be + param_2 * 0x594] === 0)) {
                  FUN_00410030(s_ALLOWHAWKS_00634374, (DAT_00646878 + u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]) * 0x3c), 0);
                }
                else {
                  uVar1 = FUN_00410070(param_2);
                  FUN_0040ff60(0, uVar1);
                  FUN_00410030(s_ALLOWAGGRESSOR_00634364, (DAT_00646878 + u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]) * 0x3c), 0);
                }
              }
              else {
                FUN_00410030(s_ALLOWUN_0063435c, (DAT_00646878 + u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]) * 0x3c), 0);
              }
            }
            uVar1 = 0;
          }
          else {
            FUN_00410030(s_OVERRULE_00634350, (DAT_00646878 + u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]) * 0x3c), 0);
            uVar1 = 1;
          }
        }
        else {
          uVar1 = 1;
        }
      }
      else {
        FUN_00410030(s_ANNOYALLIED_00634318, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        uVar1 = 1;
      }
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_0057a27a (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let bVar3;
  let uVar4;
  let local_318;
  let local_314;
  let local_230;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0057a66d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_318 = -1;
  local_18 = -0x3e7;
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((param_2 === 0)) {
    local_8 = -1;
    FUN_0057a661();
    FUN_0057a677();
    return;
  }
  bVar3 = (DAT_006d1da0 === param_1);
  if ((DAT_00654fa8 !== 0)) {
    bVar3 = 0;
  }
  while ((local_318 < 0)) {
    if (bVar3) {
      FUN_0043c9d0(s_TAKECIV_00634380);
    }
    for (/* cond: (local_314 < 0x64) */); local_314 = (local_314 < 0x64); local_314 = (local_314 + 1)) {
      iVar1 = FUN_004bd9f0(param_1, local_314);
      if ((_MEM[DAT_0062768f + local_314 * 0x10] !== 0xfe)) {
        if (bVar3) {
          uVar4 = 0;
          iVar1 = local_314;
          uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_314 * 0x10), 0), local_314, 0);
          FUN_0059edf0(uVar2, iVar1, uVar4);
        }
        iVar1 = FUN_004bdb2c(param_1, local_314);
        if ((local_18 <= iVar1)) {
          local_318 = local_314;
          local_18 = iVar1;
        }
      }
    }
    if ((local_318 < 0));
    if ((local_230 === 0)) {
      if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        uVar2 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar2);
        FUN_004271e8(1, s32((DAT_00627684 + local_314 * 0x10), 0));
        if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          if ((DAT_006d1da0 === param_2)) {
            FUN_004c4240(s_TOOKCIV_00634388, local_314, 0);
          }
          else if ((2 < DAT_00655b02)) {
            FUN_00511880(0x63, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 2, 0, local_314, 0);
          }
        }
      }
      FUN_004bf05b(param_1, local_314, param_2, 0, 0);
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_00442541(param_1, -1);
      }
      local_8 = -1;
      FUN_0057a661();
      FUN_0057a677();
      return;
    }
    FUN_004c0cf7(param_1, 0, param_2);
  }
  local_8 = -1;
  FUN_0057a661();
  FUN_0057a677();
  return;
}


 export function FUN_0057a661 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0057a677 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0057a685 (param_1)

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0x7fff;
  local_18 = -1;
  for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((s8(_MEM[DAT_0064f348 + local_14 * 0x58]) === param_1)) {
      local_8 = 0;
      for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
        if ((s8(_MEM[DAT_0064f348 + local_c * 0x58]) === param_1)) {
          iVar1 = FUN_005ae31d(((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_c * 0x58), 0)) << 16 >> 16));
          local_8 = (local_8 + iVar1);
        }
      }
      if ((local_8 < local_10)) {
        local_10 = local_8;
        local_18 = local_14;
      }
    }
  }
  return local_18;
}


 export function FUN_0057a7e9 (param_1, param_2, param_3)

 {
  w16((DAT_0064c708 + param_2 * 0x594), 0, (s16((DAT_0064c708 + param_2 * 0x594), 0) + 0xffff));
  w16((DAT_0064c708 + param_3 * 0x594), 0, (s16((DAT_0064c708 + param_3 * 0x594), 0) + 1));
  w16((DAT_0064c70c + param_2 * 0x594), 0, (s16((DAT_0064c70c + param_2 * 0x594), 0) - s8(_MEM[DAT_0064f349 + param_1 * 0x58])));
  w16((DAT_0064c70c + param_3 * 0x594), 0, (s8(_MEM[DAT_0064f349 + param_1 * 0x58]) + s16((DAT_0064c70c + param_3 * 0x594), 0)));
  _MEM[DAT_0064f348 + param_1 * 0x58] = ((param_3) & 0xFF);
  FUN_005b99e8(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), param_3, 1);
  return;
}


 export function FUN_0057a904 (param_1)

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let aiStack_13c;
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

  iVar2 = FUN_004fc20d(param_1);
  if ((iVar2 === 0)) {
    uVar3 = 0;
  }
  else {
    local_24 = -1;
    for (/* cond: (local_148 < 8) */); local_148 = (local_148 < 8); local_148 = (local_148 + 1)) {
      if ((s16((DAT_0064c708 + local_148 * 0x594), 0) === 0)) {
        local_24 = local_148;
      }
    }
    if ((local_24 < 1)) {
      uVar3 = 0;
    }
    else {
      for (/* cond: (local_3c < 0x40) */); local_3c = (local_3c < 0x40); local_3c = (local_3c + 1)) {
        w32(DAT_fffffec4, local_3c, 0);
      }
      local_154 = -1;
      for (/* cond: (local_140 < ((DAT_00655b18) << 16 >> 16)) */); local_140 = local_140; local_140 = (local_140 + 1)) {
        if ((s8(_MEM[DAT_0064f348 + local_140 * 0x58]) === param_1)) {
          local_3c = FUN_005b8a81(((s16((DAT_0064f340 + local_140 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_140 * 0x58), 0)) << 16 >> 16));
          w32(DAT_fffffec4, local_3c, (s32(DAT_fffffec4, local_3c) + s8(_MEM[DAT_0064f349 + local_140 * 0x58])));
          iVar2 = FUN_0043d20a(local_140, 1);
          if ((s16((DAT_0064c6ac + param_1 * 0x594), 0) === s16((DAT_0064f340 + local_140 * 0x58), 0))) {
            local_154 = local_3c;
            local_15c = ((s16((DAT_0064f340 + local_140 * 0x58), 0)) << 16 >> 16);
            local_8 = ((s16((DAT_0064f342 + local_140 * 0x58), 0)) << 16 >> 16);
            local_144 = local_140;
          }
        }
      }
      if ((local_154 < 0)) {
        uVar3 = 0;
      }
      else {
        wv(DAT_00655b0a, (DAT_00655b0a & (~(((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF))));
        iVar2 = FUN_004a7ce9(local_24);
        if ((iVar2 === 0)) {
          uVar3 = 0;
        }
        else {
          wv(DAT_00655b0a, ((DAT_00655b0a & (~(((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF))) | (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF)));
          uVar3 = FUN_00410070(param_1);
          FUN_0040ff60(0, uVar3);
          uVar3 = FUN_00410070(local_24);
          FUN_0040ff60(1, uVar3);
          FUN_00421ea0(s_SCHISM_00634390);
          if ((2 < DAT_00655b02)) {
            FUN_00511880(0x16, 0xff, 2, 0, 0, 0);
          }
          w32((DAT_0064c6a2 + local_24 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 2 | 0))
          ;
          w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - s32((DAT_0064c6a2 + local_24 * 0x594), 0)));
          w16((DAT_0064c70e + local_24 * 0x594), 0, (((((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF) >> 1)) & 0xFFFF));
          _MEM[DAT_0064c6b5 + local_24 * 0x594] = _MEM[DAT_0064c6b5 + param_1 * 0x594];
          w16((DAT_0064c6a8 + local_24 * 0x594), 0, s16((DAT_0064c6a8 + param_1 * 0x594), 0));
          _MEM[DAT_0064c6b0 + local_24 * 0x594] = _MEM[DAT_0064c6b0 + param_1 * 0x594];
          for (/* cond: (local_18 < 0xd) */); local_18 = (local_18 < 0xd); local_18 = (local_18 + 1)) {
            _MEM[DAT_0064c6f8 + (local_24 * 0x594 + local_18)] = _MEM[DAT_0064c6f8 + (param_1 * 0x594 + local_18)];
          }
          for (/* cond: (local_148 < 8) */); local_148 = (local_148 < 8); local_148 = (local_148 + 1)) {
            w16((DAT_0064ca82 + (local_148 * 0x594 + local_24 * 2)), 0, (DAT_00655af8 + 0xfff8));
          }
          w32((DAT_0064c6c0 + (local_24 * 0x594 + param_1 * 4)), 0, 0x2001);
          w32((DAT_0064c6c0 + (local_24 * 4 + param_1 * 0x594)), 0, 0x82801);
          local_28 = DAT_00636598;
          local_30 = (((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF);
          local_38 = (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF);
          local_158 = 0;
          local_34 = 0;
          FUN_005b9ec6();
          for (/* cond: (local_18 < ((DAT_006d1164) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_006d1164) << 16 >> 16)); local_18 = (local_18 + 1)) {
            iVar2 = FUN_005b8931(local_34, local_158);
            if (((local_30 & _MEM[(iVar2 + 4)]) !== 0)) {
              FUN_005b976d(local_34, local_158, local_38, 1, 1);
            }
            local_34 = (local_34 + 2);
            if ((((DAT_006d1160) << 16 >> 16) <= local_34)) {
              local_158 = (local_158 + 1);
              local_34 = (local_158 & 1);
            }
          }
          FUN_005b9f1c();
          local_14 = s32(DAT_fffffec4, local_154);
          local_20 = 0;
          for (/* cond: (local_3c < 0x40) */); local_3c = (local_3c < 0x40); local_3c = (local_3c + 1)) {
            if ((s32(DAT_fffffec4, local_3c) !== 0)) {
              if ((local_154 === local_3c)) {
                if ((local_154 !== local_3c)) {
                  local_14 = (local_14 + s32(DAT_fffffec4, local_3c));
                }
                w32(DAT_fffffec4, local_3c, 1);
              }
              else {
                local_20 = (local_20 + s32(DAT_fffffec4, local_3c));
                w32(DAT_fffffec4, local_3c, 2);
              }
            }
          }
          if ((local_20 <= local_14)) {
            for (/* cond: (local_140 < ((DAT_00655b18) << 16 >> 16)) */); local_140 = local_140; local_140 = (local_140 + 1)) {
              if ((s8(_MEM[DAT_0064f348 + local_140 * 0x58]) === param_1)) {
                local_3c = FUN_005b8a81(((s16((DAT_0064f340 + local_140 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_140 * 0x58), 0)) << 16 >> 16));
                if ((s32(DAT_fffffec4, local_3c) === 2)) {
                  FUN_0043cc00(local_140, param_1);
                  FUN_0057a7e9(local_140, param_1, local_24);
                }
                else {
                  FUN_0043cc00(local_140, local_24);
                }
              }
            }
          }
          else {
            local_20 = 0;
            local_10 = ((s16((DAT_0064c70c + param_1 * 0x594), 0)) << 16 >> 16);
            while ((local_20 * 3 < local_10)) {
              local_c = 1;
              local_14c = -1;
              for (/* cond: (local_140 < ((DAT_00655b18) << 16 >> 16)) */); local_140 = local_140; local_140 = (local_140 + 1)) {
                if ((s8(_MEM[DAT_0064f348 + local_140 * 0x58]) === param_1)) {
                  FUN_0043cc00(local_140, local_24);
                  FUN_0043cc00(local_140, param_1);
                  local_1c = FUN_005ae31d(local_15c, local_8, ((s16((DAT_0064f340 + local_140 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_140 * 0x58), 0)) << 16 >> 16));
                  if ((local_c < local_1c)) {
                    local_14c = local_140;
                    local_c = local_1c;
                  }
                }
              }
              if ((local_14c < 0));
              FUN_0057a7e9(local_14c, param_1, local_24);
            }
          }
          for (/* cond: (local_150 < ((DAT_00655b16) << 16 >> 16)) */); local_150 = (local_150 < ((DAT_00655b16) << 16 >> 16)); local_150 = (local_150 + 1)) {
            if ((s8(_MEM[DAT_006560f7 + local_150 * 0x20]) === param_1)) {
              local_140 = FUN_0043cf76(((s16((DAT_006560f0 + local_150 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_150 * 0x20), 0)) << 16 >> 16));
              if ((_MEM[DAT_00656100 + local_150 * 0x20] !== 0xff)) {
                local_140 = u8(_MEM[DAT_00656100 + local_150 * 0x20]);
              }
              if ((-1 < local_140)) {
                cVar1 = _MEM[DAT_0064f348 + local_140 * 0x58];
                iVar2 = s8(cVar1);
                if ((iVar2 === local_24)) {
                  FUN_005b99e8(((s16((DAT_006560f0 + local_150 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_150 * 0x20), 0)) << 16 >> 16), iVar2, 1);
                  local_2c = local_150;
                  for (/* cond: (-1 < local_150) */); -1 = (-1 < local_150);
                      local_150 = FUN_005b2c82(local_150)) {
                    _MEM[DAT_006560f7 + local_150 * 0x20] = cVar1;
                    if ((s8(_MEM[DAT_0064f348 + u8(_MEM[DAT_00656100 + local_150 * 0x20]) * 0x58]) !== iVar2)) {
                      _MEM[DAT_00656100 + local_150 * 0x20] = ((local_140) & 0xFF);
                    }
                  }
                  local_150 = local_2c;
                }
              }
            }
          }
          iVar2 = FUN_0057a685(local_24);
          if ((-1 < iVar2)) {
            FUN_0043d289(iVar2, 1, 1);
            w16((DAT_0064c6ac + local_24 * 0x594), 0, s16((DAT_0064f340 + iVar2 * 0x58), 0));
          }
          _MEM[DAT_0064f348 + local_144 * 0x58] = 0xff;
          iVar2 = FUN_0057a685(param_1);
          if ((-1 < iVar2)) {
            FUN_0043d289(iVar2, 1, 1);
            w16((DAT_0064c6ac + param_1 * 0x594), 0, s16((DAT_0064f340 + iVar2 * 0x58), 0));
          }
          _MEM[DAT_0064f348 + local_144 * 0x58] = ((param_1) & 0xFF);
          if ((2 < DAT_00655b02)) {
            FUN_004b0b53(0xff, 2, 0, 0, 0);
            FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          }
          FUN_0047cf9e(DAT_006d1da0, 1);
          uVar3 = 1;
        }
      }
    }
  }
  return uVar3;
}


 export function FUN_0057b5df (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let unaff_FS_OFFSET;
  let local_3ec;
  let local_3e8;
  let local_3e4;
  let local_3e0;
  let local_3d8;
  let local_3cc;
  let local_3c8;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b4;
  let local_3b0;
  let local_398;
  let local_394;
  let local_390;
  let local_38c;
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
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0057e2ab;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_84 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
  iVar4 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
  if ((param_3 < 2)) {
    FUN_00579c40(param_2, local_84);
  }
  local_7c = u8((s8(_MEM[DAT_0064f34a + param_1 * 0x58]) === param_2));
  FUN_005f22d0(DAT_ffffff94, (DAT_0064f360 + param_1 * 0x58));
  if ((DAT_00655b08 < 2)) {
    FUN_00467825(param_2, local_84, 0x10000);
    if ((_MEM[DAT_00655c22 + param_2] !== 7)) {
      if ((_MEM[DAT_00655c22 + local_84] < _MEM[DAT_00655c22 + param_2])) {
        local_88 = 0;
        for (/* cond: (local_1c < ((DAT_00655b18) << 16 >> 16)) */); local_1c = local_1c; local_1c = (local_1c + 1)) {
          if ((s8(_MEM[DAT_0064f348 + local_1c * 0x58]) === param_2)) {
            local_88 = (local_88 + 1);
          }
        }
        if (((local_88 & 1) === 0)) {
          w32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0) | 0x400000));
        }
      }
    }
    else {
      w32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0) | 0x400000));
    }
  }
  FUN_00467750(param_2, local_84, 0x800);
  if ((local_7c === 0)) {
    w32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + local_84 * 0x594)), 0) | 0x10));
  }
  local_398 = -1;
  if ((4 < s16((DAT_0064c708 + local_84 * 0x594), 0))) {
    if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      if ((_MEM[DAT_00655c22 + u8(DAT_00655c21)] < _MEM[DAT_00655c22 + local_84])) {
        bVar2 = 1;
      }
      else {
        bVar2 = 0;
      }
    }
    else {
      bVar2 = (_MEM[DAT_00655c22 + param_2] < _MEM[DAT_00655c22 + local_84]);
    }
    if ((iVar6 === 0)) {
      _MEM[DAT_0064f348 + param_1 * 0x58] = 0xff;
      local_398 = FUN_0057a685(local_84);
      _MEM[DAT_0064f348 + param_1 * 0x58] = ((local_84) & 0xFF);
    }
  }
  local_74 = FUN_00579dbb(param_1);
  iVar6 = FUN_0043d20a(param_1, 1);
  if ((iVar6 !== 0)) {
    local_18 = -0x3e7;
    local_3c8 = -1;
    for (/* cond: (local_1c < ((DAT_00655b18) << 16 >> 16)) */); local_1c = local_1c; local_1c = (local_1c + 1)) {
      if ((7 < _MEM[DAT_0064f349 + local_1c * 0x58])) {
        cVar1 = _MEM[DAT_0064f349 + local_1c * 0x58];
        local_14 = FUN_005ae31d(((s16((DAT_0064f340 + local_1c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_1c * 0x58), 0)) << 16 >> 16), iVar4, iVar5);
        local_14 = (s8(cVar1) * 3 - local_14);
        local_3cc = FUN_005b2e69(((s16((DAT_0064f340 + local_1c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_1c * 0x58), 0)) << 16 >> 16));
        iVar6 = FUN_005b50ad(local_3cc, 2);
        local_14 = (local_14 + iVar6 * 4);
        iVar6 = FUN_0043d20a(local_1c, 0x1b);
        if ((iVar6 !== 0)) {
          local_14 = (local_14 * 3 / 2 | 0);
        }
        iVar6 = FUN_0043d20a(local_1c, 8);
        if ((iVar6 !== 0)) {
          local_14 = (local_14 << 1);
        }
        iVar6 = FUN_0043d20a(local_1c, 0x11);
        if ((iVar6 !== 0)) {
          local_14 = local_14 * 3;
        }
        iVar6 = FUN_005b8a81(((s16((DAT_0064f340 + local_1c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_1c * 0x58), 0)) << 16 >> 16));
        iVar7 = FUN_005b8a81(iVar4, iVar5);
        if ((iVar6 !== iVar7)) {
          local_14 = (local_14 / 2 | 0);
        }
        if ((local_18 < local_14)) {
          local_18 = local_14;
          local_3c8 = local_1c;
        }
      }
    }
    local_3c4 = 0;
    if ((local_398 < 0)) {
      local_1c = local_3c8;
      FUN_0040ff60(1, (DAT_0064f360 + local_3c8 * 0x58));
      uVar8 = FUN_00410070(local_84);
      FUN_0040ff60(2, uVar8);
      FUN_00421da0(0, 0x3e8);
      if ((DAT_00654fa8 !== 0)) {
        if ((DAT_00654fa8 !== 0)) {
          if ((0x7cf < s32((DAT_0064c6a2 + local_84 * 0x594), 0))) {
            local_3c4 = 1;
          }
        }
        else {
          wv(DAT_006acb38, -1);
          FUN_00511880(0x17, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 3, 1, DAT_006d1da0, 0);
          iVar6 = FUN_00421bb0();
          while ((DAT_006acb38 === -1)) {
            FUN_0047e94e(1, 0);
          }
          if ((DAT_006acb38 === -1)) {
            local_3c4 = 0;
            iVar6 = FUN_004a75a6(local_84);
            if ((0x7cf < s32((DAT_0064c6a2 + local_84 * 0x594), 0))) {
              local_3c4 = 1;
            }
          }
        }
      }
      else {
        local_3c4 = FUN_00410030(s_CANESCAPE_00634398, DAT_0063fc58, 0);
      }
    }
    if ((local_3c4 === 1)) {
      w32((DAT_0064c6a2 + local_84 * 0x594), 0, (s32((DAT_0064c6a2 + local_84 * 0x594), 0) + -0x3e8));
      FUN_0043d289(local_1c, 1, 1);
      if ((DAT_006d1da0 === local_84)) {
        FUN_00414dd0(s_ESCAPE_006343a4, local_1c);
      }
      else {
        FUN_00511880(0x18, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 3, 0, local_1c, 0);
      }
      if ((((1 << (((local_84) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_00441b11(local_3c8, 0x63);
      }
    }
    else {
      FUN_004a762d(local_84);
      if ((-1 < local_398)) {
        _MEM[DAT_0064f379 + local_398 * 0x58] = 0xff;
      }
    }
  }
  if ((DAT_00654fa8 === 0)) {
    if ((_MEM[DAT_0064f379 + param_1 * 0x58] < 1)) {
      local_3c0 = ((~s8(_MEM[DAT_0064f379 + param_1 * 0x58])) + 1);
    }
    else {
      local_3c0 = s8(_MEM[DAT_0064f379 + param_1 * 0x58]);
    }
    local_94 = 0;
    for (/* cond: (local_1c < ((DAT_00655b18) << 16 >> 16)) */); local_1c = local_1c; local_1c = (local_1c + 1)) {
      if ((_MEM[DAT_0064f379 + local_1c * 0x58] === _MEM[DAT_0064f379 + param_1 * 0x58])) {
        local_94 = (local_94 + 1);
      }
    }
    uVar8 = FUN_00493c7d(local_84);
    FUN_0040ff60(1, uVar8);
    FUN_004271e8(2, s32((DAT_0064c488 + local_3c0 * 8), 0));
    FUN_00421da0(0, local_94);
    if ((local_94 === 0)) {
      FUN_0043c9d0(s_ABANDONWONDER_006343ac);
      if ((2 < DAT_00655b02)) {
        FUN_00511880(0x14, 0xff, 3, 0, local_3c0, 8);
      }
    }
    else {
      FUN_0040bbb0();
      FUN_0040bbe0(s_STILLWONDER_006343bc);
      uVar8 = FUN_005adfa0(local_94, 1, 2);
      FUN_0040ff30(uVar8);
      FUN_0043c9d0(DAT_00679640);
      iVar6 = FUN_005adfa0(local_94, 1, 2);
      if ((iVar6 === 1)) {
        if ((DAT_00655b02 < 3)) {
          FUN_00511880(0x4c, 0xff, 3, 0, local_3c0, 0);
        }
        else {
          FUN_00511880(0x4b, 0xff, 3, 0, local_3c0, 0);
        }
      }
    }
    FUN_0059ec88((DAT_00645160 + local_3c0 * 0x3c), 0, 0);
    local_38c = DAT_fffffc74;
    FUN_0040bc80(0);
  }
  if ((DAT_00654fa8 === 0)) {
    for (/* cond: (local_8c < 0x1c) */); local_8c = (local_8c < 0x1c); local_8c = (local_8c + 1)) {
      uVar9 = FUN_00453e18(local_8c);
      if ((uVar9 === param_1)) {
        iVar6 = (local_8c + 0x27);
        FUN_004271e8(1, s32((DAT_0064c488 + iVar6 * 8), 0));
        FUN_0040bbb0();
        if ((0x16 < local_8c)) {
          FUN_0040bc10(0xf3);
          FUN_0040fe10();
        }
        FUN_0040ff60(2, DAT_00679640);
        if ((DAT_006d1da0 !== local_84)) {
          FUN_00511880(0x1a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 3, 0, iVar6, 0);
        }
        if ((DAT_00654fa8 === 0)) {
          FUN_0043c9d0(s_CAPTUREWONDER_006343c8);
          FUN_0059ec88((DAT_00645160 + iVar6 * 0x3c), 0, 0);
          local_38c = DAT_fffffc74;
          FUN_0040bc80(0);
        }
        else if ((DAT_00654fa8 === 0)) {
          FUN_0043c9d0(s_LOSTWONDER_006343d8);
          FUN_0059ec88((DAT_00645160 + iVar6 * 0x3c), 0, 0);
          local_38c = DAT_fffffc74;
          FUN_0040bc80(0);
        }
        if ((local_8c === 0x14)) {
          FUN_004ec312(param_2);
        }
      }
    }
  }
  local_74 = FUN_005adfa0(local_74, 0, s32((DAT_0064c6a2 + local_84 * 0x594), 0));
  w32((DAT_0064c6a2 + local_84 * 0x594), 0, (s32((DAT_0064c6a2 + local_84 * 0x594), 0) - local_74))
  ;
  if ((param_2 !== 0)) {
    w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + local_74))
    ;
  }
  if ((DAT_006d1da0 === local_84)) {
    FUN_00569363(1);
  }
  w16((DAT_0064f35c + param_1 * 0x58), 0, 0);
  w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) & -60))
  ;
  if ((0xff < _MEM[DAT_0064f379 + param_1 * 0x58])) {
    _MEM[DAT_0064c7f4 + (local_84 * 0x594 + s8(_MEM[DAT_0064f379 + param_1 * 0x58]))] = (_MEM[DAT_0064c7f4 + (local_84 * 0x594 + s8(_MEM[DAT_0064f379 + param_1 * 0x58]))] + 0xff);
  }
  if ((local_7c === 0)) {
    FUN_0043d289(param_1, 1, 0);
    FUN_0043d289(param_1, 4, 0);
    FUN_0043d289(param_1, 0xb, 0);
    FUN_0043d289(param_1, 7, 0);
  }
  if ((local_7c === 0)) {
    iVar6 = _rand();
    bVar3 = (((iVar6 >> 0x1f)) & 0xFF);
    for (/* cond: (local_70 < 5) */); local_70 = (local_70 < 5); local_70 = (local_70 + 1)) {
      _MEM[DAT_0064f374 + (param_1 * 0x58 + local_70)] = (_MEM[DAT_0064f374 + (param_1 * 0x58 + local_70)] & (((0xaa >> ((((((((iVar6) & 0xFF) ^ bVar3) - bVar3) & 1) ^ bVar3) - bVar3) & 0x1f))) & 0xFF));
    }
  }
  if ((1 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
    local_78 = 0;
    if ((param_2 === 0)) {
      iVar6 = FUN_005b8a81(iVar4, iVar5);
      for (/* cond: (local_3bc < 8) */); local_3bc = (local_3bc < 8); local_3bc = (local_3bc + 1)) {
        if ((_MEM[DAT_0064c932 + (local_3bc * 0x594 + iVar6)] !== 0)) {
          local_78 = 1;
        }
      }
    }
    if ((_MEM[DAT_00655c22 + param_2] !== 7)) {
      if ((_MEM[DAT_00655c22 + u8(DAT_00655c21)] < _MEM[DAT_00655c22 + param_2])) {
        uVar9 = _rand();
        uVar10 = (uVar9 >> 0x1f);
        if ((((((uVar9 ^ uVar10) - uVar10) & 1) ^ uVar10) !== uVar10)) {
 LAB_0057c990: :
      _MEM[DAT_0064f349 + param_1 * 0x58] = (_MEM[DAT_0064f349 + param_1 * 0x58] + 0xff);
    }
    if ((_MEM[DAT_0064f349 + param_1 * 0x58] === 0)) {
      FUN_004413d1(param_1, 0);
      param_1 = -1;
    }
  }
  if ((-1 < param_1)) {
    w16((DAT_0064c6ae + param_2 * 0x594), 0, DAT_00655af8);
    FUN_00492c15(param_2, 5, iVar4, iVar5, 4);
    FUN_005b9ec6();
    for (/* cond: (local_70 < 0x15) */); local_70 = (local_70 < 0x15); local_70 = (local_70 + 1)) {
      uVar8 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_70]) + iVar4));
      local_80 = (s8(_MEM[DAT_006283a0 + local_70]) + iVar5);
      iVar6 = FUN_004087c0(uVar8, local_80);
      if ((param_2 === 0)) {
        FUN_005b976d(uVar8, local_80, 1, 1, 1);
      }
    }
    FUN_005b9f1c();
    _MEM[DAT_0064f348 + param_1 * 0x58] = ((param_2) & 0xFF);
    FUN_0043cc00(param_1, local_84);
    if ((DAT_00627670 !== 0)) {
      FUN_004fc2bb((DAT_0064f360 + param_1 * 0x58), param_2, local_84);
    }
  }
  FUN_005b99e8(iVar4, iVar5, param_2, 1);
  if ((DAT_006d1da0 === local_84)) {
    FUN_0046e020(5, 0, 0, 0);
  }
  FUN_0040ff60(0, DAT_ffffff94);
  FUN_004271e8(3, s32(((DAT_00628420 + 0x2bc) + u8((local_7c === 0)) * -4), 0));
  FUN_004271e8(4, s32(((DAT_00628420 + 0x2c4) + u8((local_7c === 0)) * -4), 0));
  FUN_005b8b1a(iVar4, iVar5, param_2);
  FUN_005b8b1a(iVar4, iVar5, local_84);
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  if ((DAT_00654fa8 !== 0)) {
    if ((DAT_00654fa8 === 0)) {
      for (/* cond: (local_3d8 < 8) */); local_3d8 = (local_3d8 < 8); local_3d8 = (local_3d8 + 1)) {
        if ((((1 << (((local_3d8) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          if ((DAT_006d1da0 === local_3d8)) {
            FUN_0047cea6(iVar4, iVar5);
          }
          else if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_3d8 * 4), 0) * 0x54), 0), iVar4, iVar5, 0, 0, 0, 0, 0, 0);
          }
          if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + local_84 * 4)] & 8) === 0)) {
            if (((_MEM[DAT_0064c6c1 + (local_84 * 0x594 + param_2 * 4)] & 8) === 0)) {
              if ((iVar6 !== 0)) {
                uVar8 = FUN_00493c7d(param_2);
                FUN_0040ff60(1, uVar8);
                uVar8 = FUN_00410070(local_84);
                FUN_0040ff60(2, uVar8);
                if ((DAT_006d1da0 === local_3d8)) {
                  FUN_004eb80a(s_CITYCAPTURE2_0063440c, param_1, 0x46, 1, param_2);
                }
                else if ((2 < DAT_00655b02)) {
                  FUN_00511880(0x1e, s32((DAT_006ad30c + s32((DAT_006ad558 + local_3d8 * 4), 0) * 0x54), 0), 4, 1, param_2, param_1);
                }
              }
            }
            else {
              uVar8 = FUN_00493c7d(param_2);
              FUN_0040ff60(1, uVar8);
              uVar8 = FUN_00493c7d(local_84);
              FUN_0040ff60(2, uVar8);
              if ((DAT_006d1da0 === local_3d8)) {
                FUN_004eb80a(s_CITYLOSEALLY_006343fc, param_1, 0x46, 1, param_2);
              }
              else if ((2 < DAT_00655b02)) {
                FUN_00511880(0x1d, s32((DAT_006ad30c + s32((DAT_006ad558 + local_3d8 * 4), 0) * 0x54), 0), 4, 1, param_2, param_1);
              }
            }
          }
          else {
            uVar8 = FUN_00493c7d(param_2);
            FUN_0040ff60(1, uVar8);
            uVar8 = FUN_00410070(local_84);
            FUN_0040ff60(2, uVar8);
            if ((DAT_006d1da0 === local_3d8)) {
              FUN_004eb80a(s_CITYWINALLY_006343f0, param_1, 0x46, 1, param_2);
            }
            else if ((2 < DAT_00655b02)) {
              FUN_00511880(0x1c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_3d8 * 4), 0) * 0x54), 0), 5, 1, param_2, param_1);
            }
          }
        }
      }
    }
  }
  else {
    uVar8 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar8);
    FUN_00421da0(0, local_74);
    if ((DAT_006d1da0 === local_84)) {
      FUN_004105f8(iVar4, iVar5, param_2);
      FUN_0047cea6(iVar4, iVar5);
      FUN_004eb80a(s_CITYCAPTURE_006343e4, param_1, 0x46, 1, param_2);
    }
    if ((DAT_006d1da0 !== local_84)) {
      FUN_0046b14d(0x89, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), param_1, 0, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x8a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x71, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), iVar4, iVar5, param_2, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), iVar4, iVar5, 0, 0, 0, 0, 0, 0);
      FUN_00511880(0x1b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 4, 1, param_2, param_1);
    }
    if ((DAT_006d1da0 !== param_2)) {
      FUN_0046b14d(0x89, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), param_1, 0, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x8a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x71, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), iVar4, iVar5, param_2, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), iVar4, iVar5, 0, 0, 0, 0, 0, 0);
      FUN_00511880(0x1b, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 4, 1, param_2, param_1);
    }
  }
  if (((DAT_0064bc60 & 0x20) === 0)) {
    FUN_0057a27a(param_2, local_84);
  }
  if ((param_1 < 0));
 LAB_0057d48e: :
  local_3cc = (local_3cc + -1);
  if ((-1 < local_3cc)) {
    if ((u8(_MEM[DAT_00656100 + local_3cc * 0x20]) === param_1)) {
      if ((_MEM[DAT_006560f6 + local_3cc * 0x20] !== 9)) {
        if ((local_1c !== param_1)) {
          if ((iVar6 === 1)) {
            _MEM[DAT_00656100 + local_3cc * 0x20] = ((local_1c) & 0xFF);
            goto LAB_0057d48e;
          }
          w32((DAT_0064f344 + local_1c * 0x58), 0, (s32((DAT_0064f344 + local_1c * 0x58), 0) | 0x20));
        }
        FUN_005b6042(local_3cc, 1);
        local_3cc = ((DAT_00655b16) << 16 >> 16);
        goto LAB_0057d48e;
      }
      _MEM[DAT_00656100 + local_3cc * 0x20] = 0xff;
    }
    goto LAB_0057d48e;
  }
  if ((DAT_00655b08 !== 0)) {
    w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 1));
  }
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    _MEM[DAT_0064f379 + param_1 * 0x58] = 0;
    if ((param_2 === 0)) {
      _MEM[DAT_0064f379 + param_1 * 0x58] = 5;
      local_3cc = FUN_005b2e69(iVar4, iVar5);
      if ((-1 < local_3cc)) {
        _MEM[DAT_0064f379 + param_1 * 0x58] = _MEM[DAT_006560f6 + local_3cc * 0x20];
      }
    }
    _MEM[DAT_0064c7f4 + (param_2 * 0x594 + s8(_MEM[DAT_0064f379 + param_1 * 0x58]))] = (_MEM[DAT_0064c7f4 + (param_2 * 0x594 + s8(_MEM[DAT_0064f379 + param_1 * 0x58]))] + 1);
    FUN_00441b11(param_1, 0x63);
    goto LAB_0057da76;
  }
  FUN_0047cf22(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
  if ((iVar6 !== 0)) {
    if ((_MEM[DAT_0064f379 + param_1 * 0x58] < 0)) {
      if ((_MEM[DAT_0064f379 + param_1 * 0x58] < 1)) {
        local_3e0 = ((~s8(_MEM[DAT_0064f379 + param_1 * 0x58])) + 1);
      }
      else {
        local_3e0 = s8(_MEM[DAT_0064f379 + param_1 * 0x58]);
      }
      iVar6 = FUN_004c03ae(param_2, param_1, local_3e0);
      if ((iVar6 === 0)) {
 LAB_0057d7a9: :
    _MEM[DAT_0064f379 + param_1 * 0x58] = 0;
    local_18 = 0;
    for (/* cond: (-1 < local_3b0) */); -1 = (-1 < local_3b0); local_3b0 = (local_3b0 + -1)) {
      if ((iVar6 !== 0)) {
        local_14 = ((s8(_MEM[DAT_0064b1c5 + local_3b0 * 0x14]) << 3) / s8(_MEM[DAT_0064b1c8 + local_3b0 * 0x14]) | 0);
        if (((_MEM[DAT_0064b1bd + local_3b0 * 0x14] & 4) !== 0)) {
          local_14 = (local_14 + 1);
        }
        if ((local_18 < local_14)) {
          local_18 = local_14;
          _MEM[DAT_0064f379 + param_1 * 0x58] = ((local_3b0) & 0xFF);
        }
        break;
      }
    }
  }
  FUN_005b9ec6();
  for (/* cond: (local_70 < 8) */); local_70 = (local_70 < 8); local_70 = (local_70 + 1)) {
    uVar8 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_70]) + iVar4));
    local_80 = (s8(_MEM[DAT_00628360 + local_70]) + iVar5);
    iVar6 = FUN_004087c0(uVar8, local_80);
    if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(_MEM[(iVar6 + 4)])) === 0)) {
      FUN_005b976d(uVar8, local_80, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
      FUN_0047cea6(uVar8, local_80);
    }
  }
  FUN_005b9f1c();
  wv(DAT_0062edf8, 1);
  FUN_0050dada();
  FUN_00509590(param_1);
  FUN_0050db36();
  wv(DAT_0062edf8, 0);
 LAB_0057da76: :
  iVar6 = FUN_004aa378(local_84, param_2);
  if ((iVar6 !== 0)) {
    if (((u8(_MEM[DAT_0064c6b5 + local_84 * 0x594]) === u8(_MEM[DAT_0064c6b5 + param_2 * 0x594])) || ((u8(_MEM[DAT_0064c6b5 + local_84 * 0x594]) - u8(_MEM[DAT_0064c6b5 + param_2 * 0x594])) < 0))) {
      local_3e4 = ((~(u8(_MEM[DAT_0064c6b5 + local_84 * 0x594]) - u8(_MEM[DAT_0064c6b5 + param_2 * 0x594]))) + 1);
    }
    else {
      local_3e4 = (u8(_MEM[DAT_0064c6b5 + local_84 * 0x594]) - u8(_MEM[DAT_0064c6b5 + param_2 * 0x594]));
    }
    if (((u8(_MEM[DAT_00655c22 + local_84]) === u8(_MEM[DAT_00655c22 + param_2])) || ((u8(_MEM[DAT_00655c22 + local_84]) - u8(_MEM[DAT_00655c22 + param_2])) < 0))) {
      local_3e8 = ((~(u8(_MEM[DAT_00655c22 + local_84]) - u8(_MEM[DAT_00655c22 + param_2]))) + 1);
    }
    else {
      local_3e8 = (u8(_MEM[DAT_00655c22 + local_84]) - u8(_MEM[DAT_00655c22 + param_2]));
    }
    local_3b4 = ((((s8(_MEM[DAT_0064f349 + param_1 * 0x58]) + 5) + (((s8(_MEM[DAT_0064f349 + param_1 * 0x58]) + 5) >> 0x1f) & 7)) >> 3) * ((local_3e4 + local_3e8) + 1) / 2 | 0);
    if ((param_3 !== 0)) {
      local_3b4 = (local_3b4 / 2 | 0);
    }
    iVar6 = FUN_004bd9f0(local_84, 0x11);
    if ((iVar6 === 0)) {
      local_3b4 = (local_3b4 + -1);
    }
    iVar6 = FUN_004bd9f0(local_84, 0x22);
    if ((iVar6 === 0)) {
      iVar6 = FUN_004bd9f0(local_84, 0xf);
      if ((iVar6 === 0)) {
        local_3b4 = 0;
      }
      iVar6 = FUN_004bd9f0(local_84, 0x23);
      if ((iVar6 === 0)) {
        local_3b4 = 0;
      }
    }
    else {
      iVar6 = FUN_004bd9f0(param_2, 0x22);
      if ((iVar6 === 0)) {
        local_3b4 = (local_3b4 << 1);
      }
      else {
        local_3b4 = (local_3b4 + 1);
      }
    }
    iVar6 = (((u8(((s32((DAT_0064c6c0 + (local_84 * 0x594 + param_2 * 4)), 0) & 0x10) === 0)) - 1) & 2) + (u8(_MEM[DAT_0064c6be + param_2 * 0x594]) - 4));
    if ((iVar6 < 1)) {
      iVar6 = 0;
    }
    local_394 = 0;
    for (/* cond: (local_90 < local_3b4) */); local_90 = (local_90 < local_3b4); local_90 = (local_90 + 1)) {
      local_18 = 0;
      for (/* cond: (local_70 < 0x14) */); local_70 = (local_70 < 0x14); local_70 = (local_70 + 1)) {
        uVar8 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_70]) + iVar4));
        local_80 = (s8(_MEM[DAT_006283a0 + local_70]) + iVar5);
        iVar7 = FUN_004087c0(uVar8, local_80);
        if ((iVar7 < 0)) {
          bVar3 = FUN_005b89bb(uVar8, local_80);
          local_14 = s8(_MEM[DAT_00627cc9 + u8(bVar3) * 0x18]) * 2;
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if (((uVar9 & 0x10) !== 0)) {
            local_14 = (local_14 + 1);
          }
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if (((uVar9 & 0x20) !== 0)) {
            local_14 = (local_14 + 1);
          }
          bVar3 = FUN_005b94d5(uVar8, local_80);
          if (((bVar3 & 0x42) === 0x40)) {
            local_14 = (local_14 << 1);
          }
          if ((local_18 < local_14)) {
            local_18 = local_14;
            local_390 = local_80;
            local_98 = uVar8;
          }
        }
      }
      if ((-1 < local_3cc)) {
        if ((local_394 === 0)) {
          if ((DAT_006d1da0 === local_84)) {
            FUN_0046e020(0x22, 1, 0, 0);
          }
          if ((DAT_006d1da0 !== local_84)) {
            FUN_0046b14d(0x7a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 0x22, 1, 0, 0, 0, 0, 0, 0);
          }
        }
        local_394 = (local_394 + 1);
        _MEM[DAT_006560ff + local_3cc * 0x20] = 2;
        if ((iVar6 !== 0)) {
          if ((iVar6 < 1)) {
            local_3ec = 0;
          }
          else {
            local_3ec = _rand();
            local_3ec = (local_3ec % (iVar6 + 1));
          }
          if ((local_3ec !== 0)) {
            w16((DAT_006560f4 + local_3cc * 0x20), 0, (s16((DAT_006560f4 + local_3cc * 0x20), 0) | 0x2000));
          }
        }
        FUN_005b490e(local_3cc, param_2);
        FUN_0047cea6(local_98, local_390);
        if ((DAT_006d1da0 === local_84)) {
          FUN_0046e287(1);
        }
      }
    }
    if ((DAT_00654fa8 === 0)) {
      uVar8 = FUN_00410070(local_84);
      FUN_0040ff60(0, uVar8);
      FUN_0040ff60(1, DAT_ffffff94);
      if ((DAT_006d1da0 === local_84)) {
        FUN_004442e0(s_PARTISANS_0063441c, local_3cc);
      }
      if ((DAT_006d1da0 !== local_84)) {
        FUN_00511880(0x1f, s32((DAT_006ad30c + s32((DAT_006ad558 + local_84 * 4), 0) * 0x54), 0), 2, 0, local_3cc, 0);
      }
    }
  }
  if ((-1 < param_1)) {
    _MEM[DAT_0064f34a + param_1 * 0x58] = ((local_84) & 0xFF);
    _MEM[DAT_0064f34b + param_1 * 0x58] = ((DAT_00655af8) & 0xFF);
    uVar9 = FUN_00453e18(0xe);
    if ((uVar9 === param_1)) {
      FUN_004be6ba(param_2);
    }
  }
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  local_8 = -1;
  FUN_0057e29f();
  FUN_0057e2b5();
  return;
}


 export function FUN_0057e29f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0057e2b5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0057e2c3 (param_1)

 {
  let local_8;

  local_8 = s8(_MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]) * 8;
  if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
    local_8 = (local_8 + (local_8 >> 1));
  }
  if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x10) !== 0)) {
    local_8 = (local_8 + (local_8 >> 1));
  }
  return local_8;
}


 export function FUN_0057e33a (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let pbVar5;
  let uVar6;
  let local_8;

  iVar3 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar4 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  if ((param_2 !== 0)) {
    bVar2 = FUN_005b89bb(iVar3, iVar4);
    wv(DAT_006acb30, u8(bVar2));
    wv(DAT_006acb08, FUN_0043cf76(iVar3, iVar4));
  }
  cVar1 = _MEM[DAT_0064b1c5 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14];
  pbVar5 = FUN_005b8931(iVar3, iVar4);
  local_8 = (u8((_MEM[pbVar5] >>> 7)) + s8(_MEM[DAT_00627cc9 + DAT_006acb30 * 0x18])) * s8(cVar1) * 4;
  wv(DAT_006acb34, 2);
  if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 0)) {
    wv(DAT_006acb34, 3);
  }
  bVar2 = FUN_005b94d5(iVar3, iVar4);
  if (((bVar2 & 0x42) === 0x40)) {
    if ((param_3 < 0)) {
      wv(DAT_006acb34, 4);
    }
    else if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_3 * 0x20]) * 0x14] & 0x40) === 0)) {
      wv(DAT_006acb34, 4);
    }
  }
  if ((-1 < DAT_006acb08)) {
    if (((_MEM[DAT_0064b1bd + uVar6 * 0x14] & 0x10) === 0)) {
      if (((_MEM[DAT_0064b1bc + uVar6 * 0x14] & 0x10) === 0)) {
        wv(DAT_006acb34, (DAT_006acb34 << 2));
      }
      else {
        wv(DAT_006acb34, (DAT_006acb34 << 1));
      }
      goto LAB_0057e694;
    }
    iVar3 = FUN_0043d20a(DAT_006acb08, 8);
    if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 0)) {
      if ((param_3 < 0)) {
        wv(DAT_006acb34, 6);
      }
      else if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_3 * 0x20]) * 0x14] & 0x40) === 0)) {
        wv(DAT_006acb34, 6);
      }
    }
  }
  if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 0)) {
    wv(DAT_006acb34, 2);
  }
 LAB_0057e694: :
  if ((DAT_006acb34 !== 2)) {
    local_8 = (local_8 * DAT_006acb34 >> 1);
  }
  if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
    local_8 = (local_8 + (local_8 >> 1));
  }
  return local_8;
}


 export function FUN_0057e6e2 (param_1, param_2)

 {
  let sVar1;
  let sVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = param_1;
  if ((-1 < param_1)) {
    sVar1 = s16((DAT_006560f0 + param_1 * 0x20), 0);
    sVar2 = s16((DAT_006560f2 + param_1 * 0x20), 0);
    bVar3 = FUN_005b89bb(((sVar1) << 16 >> 16), ((sVar2) << 16 >> 16));
    wv(DAT_006acb30, u8(bVar3));
    wv(DAT_006acb08, FUN_0043cf76(((sVar1) << 16 >> 16), ((sVar2) << 16 >> 16)));
    for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1))
    {
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 0)) {
        local_10 = FUN_0057e33a(param_1, 0, param_2);
        if (((DAT_00655ae8 & 0x10) !== 0)) {
          iVar4 = FUN_005b29d7(param_1);
          iVar5 = FUN_005b29aa(param_1);
          local_10 = (iVar4 * local_10 / iVar5 | 0);
        }
        if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 4) !== 0)) {
          local_10 = (local_10 + 1);
        }
        if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 0x20) !== 0)) {
          if ((param_2 === -1)) {
            local_10 = (local_10 + 1);
          }
          else if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_2 * 0x20]) * 0x14] === 1)) {
            if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + param_2 * 0x20]) * 0x14] & 0x10) === 0)) {
              local_10 = local_10 * 3;
            }
            else {
              local_10 = local_10 * 5;
            }
          }
        }
        if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_2 * 0x20]) * 0x14] & 0x10) !== 0)) {
          local_10 = (local_10 << 1);
        }
        if ((-1 < DAT_006acb08)) {
          if ((param_2 === -1)) {
            local_10 = (local_10 / 2 | 0);
          }
          else if ((iVar4 === 0)) {
            local_10 = (local_10 << 1);
          }
          else {
            local_10 = (local_10 / 2 | 0);
          }
        }
        if ((local_8 <= local_10)) {
          local_8 = local_10;
          local_c = param_1;
        }
      }
    }
  }
  return local_c;
}


 export function FUN_0057e9f9 (param_1, param_2, param_3, param_4)

 {
  if ((_MEM[DAT_0064c7b6 + (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] !== 0xff)) {
    _MEM[DAT_0064c7b6 + (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] = (_MEM[DAT_0064c7b6 + (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] + 1);
  }
  if ((DAT_00655b02 < 3)) {
    FUN_0059c575(param_1, param_2, ((DAT_00655afa) << 16 >> 16), param_3, param_4);
  }
  else if (((u8(DAT_00655b0b) & (1 << (_MEM[DAT_006560f7 + param_1 * 0x20] & 0x1f))) !== 0)) {
    FUN_0046b14d(0x64, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4), 0) * 0x54), 0), param_1, param_2, ((DAT_00655afa) << 16 >> 16), param_3, param_4, 0, 0, 0);
  }
  wv(DAT_006acb0c, (DAT_006acb0c + 1));
  if ((DAT_00627670 !== 0)) {
    FUN_004fbd9d(_MEM[DAT_006560f6 + param_1 * 0x20], s8(_MEM[DAT_006560f7 + param_2 * 0x20]), s8(_MEM[DAT_006560f7 + param_1 * 0x20]));
  }
  FUN_005b4391(param_1, 1);
  return;
}


 export function FUN_0057eb94 (param_1, param_2, param_3, param_4)

 {
  let sVar1;

  wv(DAT_006acb0c, 0);
  param_1 = FUN_005b2d39(param_1);
  while ((-1 < param_1)) {
    sVar1 = s16((DAT_00656108 + param_1 * 0x20), 0);
    FUN_0057e9f9(param_1, param_2, param_3, param_4);
    param_1 = ((sVar1) << 16 >> 16);
  }
  return;
}


 export function FUN_0057ebfd (param_1)

 {
  if ((DAT_00654fa8 === 0)) {
    FUN_004271e8(0, s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0));
    if ((s8(_MEM[DAT_006560f7 + param_1 * 0x20]) === DAT_006d1da0)) {
      FUN_004442e0(s_PROMOTED_00634428, param_1);
    }
    else if ((2 < DAT_00655b02)) {
      FUN_00511880(0x20, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4), 0) * 0x54), 0), 1, 0, param_1, 0);
    }
  }
  return;
}


 export function FUN_0057ed3f (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_3d8;
  let local_3c8;
  let auStack_3c4;
  let auStack_3a4;
  let local_384;
  let auStack_380;
  let aiStack_360;
  let local_340;
  let local_33c;
  let aiStack_338;
  let local_318;
  let local_d8;
  let aiStack_d4;
  let local_b4;
  let auStack_b0;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0057f63e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  `eh_vector_constructor_iterator'(DAT_fffffce8, 0x48, 8, FUN_005bd630, FUN_005bd915);
  local_8 = 0;
  local_340 = 0;
  wv(DAT_006ad908, 1);
  wv(DAT_006c926c, 0);
  for (/* cond: (local_b4 < 8) */); local_b4 = (local_b4 < 8); local_b4 = (local_b4 + 1)) {
    w32(DAT_fffffcc8, local_b4, 0);
    if ((iVar1 !== 0)) {
      w32(DAT_fffffcc8, local_b4, 1);
      local_340 = 1;
      w32(DAT_ffffffd0, local_b4, s32(DAT_0066ca90, local_b4 * 0xfc));
      w32(DAT_ffffff2c, local_b4, s32(DAT_0066ca94, local_b4 * 0xfc));
      uVar2 = FUN_0047dfb0(0x20);
      w32(DAT_fffffc5c, local_b4, uVar2);
      uVar2 = FUN_0047dfb0(0x20);
      w32(DAT_fffffc3c, local_b4, uVar2);
      FUN_0047a6b0((DAT_fffffca0 + local_b4), (DAT_fffffc80 + local_b4), param_1, param_2);
      w32(DAT_fffffca0, local_b4, (s32(DAT_fffffca0, local_b4) + s32((DAT_0066cac0 + local_b4 * 0x3f0), 0)));
      FUN_004086c0((DAT_ffffff50 + local_b4 * 0x10), s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4), s32(DAT_fffffc5c, local_b4), s32(DAT_fffffc3c, local_b4));
      FUN_005bd65c(s32((DAT_0066cab0 + local_b4 * 0x3f0), 0), s32((DAT_0066cab4 + local_b4 * 0x3f0), 0));
      FUN_0056c5fc((DAT_0066c7a8 + local_b4 * 0x3f0), (DAT_fffffce8 + local_b4 * 0x48), s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4), s32(DAT_0066c8cc, local_b4 * 0xfc), s32(DAT_0066c8d0, local_b4 * 0xfc), 0, 0, 0, 0, s32(DAT_fffffc5c, local_b4), s32(DAT_fffffc3c, local_b4));
    }
  }
  if ((local_340 === 0)) {
    wv(DAT_006ad908, 0);
    local_3c8 = 0;
    local_8 = -1;
    FUN_0057f628();
    FUN_0057f648();
    return;
  }
  if ((param_3 !== 0)) {
    FUN_0046e020(param_3, 1, 0, 0);
  }
  local_384 = FUN_006e7f58();
  for (/* cond: (local_d8 < 8) */); local_d8 = (local_d8 < 8); local_d8 = (local_d8 + 1)) {
    for (/* cond: (local_b4 < 8) */); local_b4 = (local_b4 < 8); local_b4 = (local_b4 + 1)) {
      if ((s32(DAT_fffffcc8, local_b4) !== 0)) {
        iVar1 = FUN_0047c3e0(param_1, param_2);
        if ((iVar1 === 0)) {
          w32(DAT_fffffcc8, local_b4, 0);
        }
        else {
          if ((s32(DAT_0066ca94, local_b4 * 0xfc) !== s32(DAT_ffffff2c, local_b4))) {
            w32(DAT_ffffffd0, local_b4, s32(DAT_0066ca90, local_b4 * 0xfc));
            w32(DAT_ffffff2c, local_b4, s32(DAT_0066ca94, local_b4 * 0xfc));
            uVar2 = FUN_0047dfb0(0x20);
            w32(DAT_fffffc5c, local_b4, uVar2);
            uVar2 = FUN_0047dfb0(0x20);
            w32(DAT_fffffc3c, local_b4, uVar2);
            FUN_0047a6b0((DAT_fffffca0 + local_b4), (DAT_fffffc80 + local_b4), param_1, param_2);
            w32(DAT_fffffca0, local_b4, (s32(DAT_fffffca0, local_b4) + s32((DAT_0066cac0 + local_b4 * 0x3f0), 0)));
            FUN_004086c0((DAT_ffffff50 + local_b4 * 0x10), s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4), s32(DAT_fffffc5c, local_b4), s32(DAT_fffffc3c, local_b4));
            FUN_005bd65c(s32((DAT_0066cab0 + local_b4 * 0x3f0), 0), s32((DAT_0066cab4 + local_b4 * 0x3f0), 0));
            FUN_0056c5fc((DAT_0066c7a8 + local_b4 * 0x3f0), (DAT_fffffce8 + local_b4 * 0x48), s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4), s32(DAT_0066c8cc, local_b4 * 0xfc), s32(DAT_0066c8d0, local_b4 * 0xfc), 0, 0, 0, 0, s32(DAT_fffffc5c, local_b4), s32(DAT_fffffc3c, local_b4));
          }
          FUN_0047df20(((s16(DAT_0066ca8c, local_b4 * 0x1f8)) << 16 >> 16));
          FUN_005cef31(DAT_fffffc28, (DAT_0066c7a8 + local_b4 * 0x3f0), s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4));
          FUN_00408490((DAT_ffffff50 + local_b4 * 0x10));
        }
      }
    }
    do {
      FUN_00407ff0();
      local_33c = FUN_006e7f58();
      if ((DAT_006c926c !== 0));
    local_384 = local_33c;
    for (/* cond: (local_b4 < 8) */); local_b4 = (local_b4 < 8); local_b4 = (local_b4 + 1)) {
      if ((s32(DAT_fffffcc8, local_b4) !== 0)) {
        FUN_0056c5fc((DAT_fffffce8 + local_b4 * 0x48), (DAT_0066c7a8 + local_b4 * 0x3f0), 0, 0, 0, 0, s32(DAT_fffffca0, local_b4), s32(DAT_fffffc80, local_b4), s32(DAT_0066c8cc, local_b4 * 0xfc), s32(DAT_0066c8d0, local_b4 * 0xfc), s32(DAT_fffffc5c, local_b4), s32(DAT_fffffc3c, local_b4));
      }
    }
  }
  FUN_0046e287(0xa);
 LAB_0057f5f8: :
  FUN_0047df50();
  wv(DAT_006ad908, 0);
  local_8 = -1;
  FUN_0057f628();
  FUN_0057f648();
  return;
}


 export function FUN_0057f628 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((unaff_EBP + -0x314), 0x48, 8, FUN_005bd915);
  return;
}


 export function FUN_0057f648 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0057f657 (param_1, param_2)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_60;
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
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0057f9cb;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== 0)) {
    wv(DAT_006ad908, 1);
    local_4c = operator_new(0x48);
    local_8 = 0;
    if ((local_4c === 0)) {
      local_50 = 0;
    }
    else {
      local_50 = FUN_005bd630();
    }
    local_8 = -1;
    local_24 = local_50;
    FUN_004105f8(param_1, param_2, DAT_006d1da0);
    FUN_00484d52();
    FUN_0046e020(0x32, 0, 0, 0);
    if (((None & 0x10) !== 0)) {
      FUN_00407ff0();
      local_3c = FUN_006e7f58();
      do {
        FUN_00407ff0();
        if ((2 < DAT_00655b02)) {
          FUN_0047e94e(1, 0);
        }
        local_2c = FUN_006e7f58();
      } while (((local_2c - local_3c) < 0x157c));
    }
    local_38 = FUN_0047dfb0(0x5b);
    local_44 = FUN_0047dfb0(0x48);
    FUN_005bd65c(local_38, local_44);
    FUN_0047a6b0(DAT_ffffffb8, DAT_ffffffd8, param_1, param_2);
    local_30 = ((DAT_0066cab8 + local_48) - (local_38 >> 1));
    local_40 = ((DAT_0066cabc + local_28) - (local_44 >> 1));
    FUN_0056c5fc(DAT_0066c7a8, local_24, local_30, local_40, DAT_0066c8cc, DAT_0066c8d0, 0, 0, 0, 0, local_38, local_44);
    FUN_004086c0(DAT_ffffffe0, local_30, local_40, local_38, local_44);
    if ((local_20 < 0)) {
      local_20 = 0;
    }
    if ((local_1c < 0)) {
      local_1c = 0;
    }
    iVar1 = FUN_00407f90(DAT_ffffffe0);
    if ((0 < iVar1)) {
      local_3c = FUN_006e7f58();
      FUN_0047dff0();
      for (/* cond: (local_34 < 0xb) */); local_34 = (local_34 < 0xb); local_34 = (local_34 + 1)) {
        FUN_005cef31(DAT_ffffffa0, DAT_0066c7a8, local_30, local_40);
        FUN_00408490(DAT_ffffffe0);
        do {
          FUN_00407ff0();
          if ((2 < DAT_00655b02)) {
            FUN_0047e94e(1, 0);
          }
          local_2c = FUN_006e7f58();
        } while (((local_2c - local_3c) < 0x64));
        local_3c = local_2c;
        FUN_0056c5fc(local_24, DAT_0066c7a8, 0, 0, 0, 0, local_30, local_40, DAT_0066c8cc, DAT_0066c8d0, local_38, local_44);
      }
      FUN_0047df50();
      FUN_00408490(DAT_ffffffe0);
    }
    if ((local_24 !== 0)) {
      FUN_0040f010(1);
    }
    wv(DAT_006ad908, 0);
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_0057f9e3 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_14;
  let local_c;
  let local_8;

  iVar2 = FUN_005b8da4(param_2, param_3);
  uVar3 = FUN_00493c7d(param_1);
  FUN_0040ff60(0, uVar3);
  local_c = ((iVar2) & 0xFF);
  if ((DAT_006d1da0 === iVar2)) {
    if ((((1 << (local_c & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_004cc870(s_USEWEAPONS_00634434, 0x3e, 8);
    }
  }
  else {
    FUN_00511880(0x29, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 1, 0, 0, 0);
  }
  if ((param_4 !== 0)) {
    for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
      if ((iVar4 < 4)) {
        FUN_0040ff60(0, (DAT_0064f360 + local_14 * 0x58));
        if ((s8(_MEM[DAT_0064f348 + local_14 * 0x58]) === DAT_006d1da0)) {
          if (((u8(DAT_00655b0b) & (1 << (_MEM[DAT_0064f348 + local_14 * 0x58] & 0x1f))) !== 0)) {
            FUN_004cc870(DAT_00634440, 0x11, 8);
          }
        }
        else {
          FUN_00511880(0x2a, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(_MEM[DAT_0064f348 + local_14 * 0x58]) * 4), 0) * 0x54), 0), 1, 0, 0, 0);
        }
        if ((DAT_006d1da0 === param_1)) {
          if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            FUN_004cc870(DAT_00634444, 0x11, 8);
          }
        }
        else {
          FUN_00511880(0x2a, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 1, 0, 0, 0);
        }
        return 0;
      }
    }
  }
  if ((DAT_006d1da0 !== iVar2)) {
    FUN_0046b14d(0x7d, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), param_2, param_3, 0, 0, 0, 0, 0, 0);
  }
  FUN_0057f657(param_2, param_3);
  for (/* cond: (local_8 < 9) */); local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
    uVar3 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_2));
    cVar1 = _MEM[DAT_00628360 + local_8];
    iVar2 = FUN_004087c0(uVar3, (s8(cVar1) + param_3));
    if ((-1 < iVar2)) {
      if ((s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) !== param_1)) {
        w32((DAT_0064c6c0 + (s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) * 0x594 + param_1 * 4)), 0) | 0x110));
        w32((DAT_0064c6c0 + (s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) * 4 + param_1 * 0x594)), 0) | 0x20000));
        FUN_00456f20(s8(_MEM[DAT_006560f7 + iVar2 * 0x20]), param_1, 0x64);
      }
      FUN_005b47fa(iVar2, 1);
    }
  }
  FUN_005b9179(param_2, param_3);
  return 1;
}


 export function FUN_0057febc (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_14;

  local_14 = 0;
  while ((iVar1 <= u8(DAT_0064bcdb))) {
    if ((((DAT_00655b16) << 16 >> 16) <= local_14)) {
      iVar1 = FUN_005b8a1d(param_2, param_3);
      iVar2 = FUN_005b8a81(param_2, param_3);
      for (/* cond: (local_14 < ((DAT_00655b16) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b16) << 16 >> 16)); local_14 = (local_14 + 1)) {
        if ((iVar3 === iVar2)) {
          wv(DAT_0062d044, s8(_MEM[DAT_006560f7 + local_14 * 0x20]));
          wv(DAT_0062d03c, u8(_MEM[DAT_006560f6 + local_14 * 0x20]));
          wv(DAT_00673fa0, param_2);
          wv(DAT_00673fa4, param_3);
          iVar3 = FUN_005b2c3d(local_14);
          iVar3 = FUN_004abfe5(((s16((DAT_006560f0 + local_14 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_14 * 0x20), 0)) << 16 >> 16), iVar3 * 2);
          if ((iVar3 !== 8)) {
            _MEM[DAT_006560ff + local_14 * 0x20] = 0xb;
            w16((DAT_00656102 + local_14 * 0x20), 0, ((param_2) & 0xFFFF));
            w16((DAT_00656104 + local_14 * 0x20), 0, ((param_3) & 0xFFFF));
            _MEM[DAT_006560fc + local_14 * 0x20] = 0x4b;
          }
        }
      }
      return;
    }
    if ((iVar1 <= u8(DAT_0064bcdb)));
  }
  FUN_004ca39e(local_14, param_2, param_3);
  return;
}
