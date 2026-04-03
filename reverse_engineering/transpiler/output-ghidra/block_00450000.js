// Block 0x00450000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 136

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00408130, FUN_004083f0, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408650, FUN_004087c0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040bc80, FUN_0040ef70, FUN_0040efd0, FUN_0040f380, FUN_0040f480, FUN_0040f510 } from './block_00400000.js';
import { FUN_0040f610, FUN_0040f730, FUN_0040f810, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0 } from './block_00400000.js';
import { FUN_0040fd40, FUN_0040fd80, FUN_0040fe10, FUN_0040fe40, FUN_0040ff00, FUN_0040ff30 } from './block_00400000.js';
import { FUN_0040ff60, FUN_0040ffa0, SetDlgCtrlID } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_004105f8, FUN_00414be0, FUN_00414ce0, FUN_00414d10 } from './block_00410000.js';
import { FUN_00414d40, FUN_00415133, FUN_00418a30, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421ea0, FUN_00421f10, FUN_00426ff0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043060b, FUN_0043c520, FUN_0043c5f0, FUN_0043c690, FUN_0043c6c0, FUN_0043c840 } from './block_00430000.js';
import { FUN_0043c8a0, FUN_0043c9d0, FUN_0043cc00, FUN_0043d07a, FUN_0043d20a } from './block_00430000.js';
import { FUN_00448f92, FUN_0044c5a0, FUN_0044c730, FUN_0044ca60, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00460104, FUN_0046011a, FUN_00467750, FUN_00467825, FUN_00467904, FUN_00467933 } from './block_00460000.js';
import { FUN_004679ab, FUN_00467af0, FUN_00467ef2 } from './block_00460000.js';
import { FUN_0047cea6, FUN_0047cf9e } from './block_00470000.js';
import { FUN_00490590, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00493f0f, FUN_00494148 } from './block_00490000.js';
import { FUN_004941ee } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a69b0, FUN_004a7577, FUN_004aef20 } from './block_004A0000.js';
import { FUN_004af14b } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bd9f0, FUN_004bdaa5, FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004f4793, FUN_004f5f23 } from './block_004F0000.js';
import { FUN_0050c679 } from './block_00500000.js';
import { FUN_00511880, FUN_00518f00 } from './block_00510000.js';
import { FUN_005261a0, FUN_0052630d, FUN_0052e971 } from './block_00520000.js';
import { FUN_0055f5a3 } from './block_00550000.js';
import { FUN_00564713, FUN_00564d00, FUN_00564e6d, FUN_005666da, FUN_00568861, FUN_00569363 } from './block_00560000.js';
import { FUN_0056a65e } from './block_00560000.js';
import { FUN_0057a27a } from './block_00570000.js';
import { FUN_00598d45, FUN_00599a20, FUN_00599b8d, FUN_0059a6f0, FUN_0059a791, FUN_0059d3e1 } from './block_00590000.js';
import { FUN_0059d5f5, FUN_0059db08, FUN_0059df8a, FUN_0059e783, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a9780, FUN_005ac840, FUN_005ac9ad, FUN_005adfa0, FUN_005adfd9, FUN_005ae006 } from './block_005A0000.js';
import { FUN_005ae052 } from './block_005A0000.js';
import { FUN_005b2e69, FUN_005b319e, FUN_005b345f, FUN_005b36df, FUN_005b67af, FUN_005b6aea } from './block_005B0000.js';
import { FUN_005b8931, FUN_005b898b, FUN_005b89e4, FUN_005b8d62, FUN_005b976d, FUN_005b9d81 } from './block_005B0000.js';
import { FUN_005b9ec6, FUN_005b9f1c, FUN_005bb4ae, FUN_005bb574, FUN_005bbb0a, FUN_005bc44d } from './block_005B0000.js';
import { FUN_005bc763, FUN_005bcaa7, FUN_005bcdc3, FUN_005bd0e7, FUN_005bd48f, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd65c, FUN_005bd915, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c0593, FUN_005c0f57, FUN_005c1020 } from './block_005C0000.js';
import { FUN_005c11b2, FUN_005c19ad, FUN_005c5b7f, FUN_005c5fc4, FUN_005c61b0, FUN_005c62ee } from './block_005C0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005c8b00, FUN_005c8be1, FUN_005c8c83, FUN_005c9499 } from './block_005C0000.js';
import { FUN_005cedad, FUN_005cef31, FUN_005cf467, InvalidateObjectCache } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005db0d0, FUN_005db140, FUN_005db55b, FUN_005dba95, FUN_005dbab8 } from './block_005D0000.js';
import { FUN_005dcb8c, ~_Timevec } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0, __chdir, _fgets, _memset } from './block_005F0000.js';
import { _rand, _sprintf, _strcmp, _strlen, _strncpy, _strrchr } from './block_005F0000.js';
import { `eh_vector_constructor_iterator', `eh_vector_destructor_iterator', operator_delete, operator_new } from './block_005F0000.js';

const DAT_00000004 = globalThis.DAT_00000004, DAT_0000000c = globalThis.DAT_0000000c, DAT_00000014 = globalThis.DAT_00000014, DAT_0061c360 = globalThis.DAT_0061c360, DAT_0061c364 = globalThis.DAT_0061c364, DAT_0061c368 = globalThis.DAT_0061c368;
const DAT_0061c36c = globalThis.DAT_0061c36c, DAT_0061c580 = globalThis.DAT_0061c580, DAT_0061c584 = globalThis.DAT_0061c584, DAT_0061c588 = globalThis.DAT_0061c588, DAT_0061c58c = globalThis.DAT_0061c58c, DAT_0061c740 = globalThis.DAT_0061c740;
const DAT_0061c744 = globalThis.DAT_0061c744, DAT_0061cce0 = globalThis.DAT_0061cce0, DAT_0061ce58 = globalThis.DAT_0061ce58, DAT_00626854 = globalThis.DAT_00626854, DAT_006268f4 = globalThis.DAT_006268f4, DAT_0062691c = globalThis.DAT_0062691c;
const DAT_006269e4 = globalThis.DAT_006269e4, DAT_00626a10 = globalThis.DAT_00626a10, DAT_00626a14 = globalThis.DAT_00626a14, DAT_00626a38 = globalThis.DAT_00626a38, DAT_00626a48 = globalThis.DAT_00626a48, DAT_00626a4c = globalThis.DAT_00626a4c;
const DAT_00626b5c = globalThis.DAT_00626b5c, DAT_00626b60 = globalThis.DAT_00626b60, DAT_00627684 = globalThis.DAT_00627684, DAT_00627689 = globalThis.DAT_00627689, DAT_0062768c = globalThis.DAT_0062768c, DAT_0062768d = globalThis.DAT_0062768d;
const DAT_0062768e = globalThis.DAT_0062768e, DAT_0062768f = globalThis.DAT_0062768f, DAT_00628350 = globalThis.DAT_00628350, DAT_00628360 = globalThis.DAT_00628360, DAT_0062cd24 = globalThis.DAT_0062cd24, DAT_006409d8 = globalThis.DAT_006409d8;
const DAT_00644e48 = globalThis.DAT_00644e48, DAT_00646cb8 = globalThis.DAT_00646cb8, DAT_00647748 = globalThis.DAT_00647748, DAT_00648018 = globalThis.DAT_00648018, DAT_0064a730 = globalThis.DAT_0064a730, DAT_0064b0d0 = globalThis.DAT_0064b0d0;
const DAT_0064b10c = globalThis.DAT_0064b10c, DAT_0064b124 = globalThis.DAT_0064b124, DAT_0064b1c0 = globalThis.DAT_0064b1c0, DAT_0064b1c8 = globalThis.DAT_0064b1c8, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b1cb = globalThis.DAT_0064b1cb;
const DAT_0064b9c0 = globalThis.DAT_0064b9c0, DAT_0064ba28 = globalThis.DAT_0064ba28, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064c488 = globalThis.DAT_0064c488, DAT_0064c48e = globalThis.DAT_0064c48e, DAT_0064c6a0 = globalThis.DAT_0064c6a0;
const DAT_0064c6a2 = globalThis.DAT_0064c6a2, DAT_0064c6a6 = globalThis.DAT_0064c6a6, DAT_0064c6b0 = globalThis.DAT_0064c6b0, DAT_0064c6b3 = globalThis.DAT_0064c6b3, DAT_0064c6b5 = globalThis.DAT_0064c6b5, DAT_0064c6b7 = globalThis.DAT_0064c6b7;
const DAT_0064c6be = globalThis.DAT_0064c6be, DAT_0064c6bf = globalThis.DAT_0064c6bf, DAT_0064c6c0 = globalThis.DAT_0064c6c0, DAT_0064c6c1 = globalThis.DAT_0064c6c1, DAT_0064c6c2 = globalThis.DAT_0064c6c2, DAT_0064c6e0 = globalThis.DAT_0064c6e0;
const DAT_0064c6e8 = globalThis.DAT_0064c6e8, DAT_0064c6f0 = globalThis.DAT_0064c6f0, DAT_0064c708 = globalThis.DAT_0064c708, DAT_0064c70e = globalThis.DAT_0064c70e, DAT_0064c778 = globalThis.DAT_0064c778, DAT_0064c7a5 = globalThis.DAT_0064c7a5;
const DAT_0064c832 = globalThis.DAT_0064c832, DAT_0064c8b2 = globalThis.DAT_0064c8b2, DAT_0064c932 = globalThis.DAT_0064c932, DAT_0064ca82 = globalThis.DAT_0064ca82, DAT_0064f340 = globalThis.DAT_0064f340, DAT_0064f342 = globalThis.DAT_0064f342;
const DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f349 = globalThis.DAT_0064f349, DAT_0064f34a = globalThis.DAT_0064f34a, DAT_0064f34c = globalThis.DAT_0064f34c, DAT_0064f360 = globalThis.DAT_0064f360;
const DAT_0064f379 = globalThis.DAT_0064f379, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00655020 = globalThis.DAT_00655020, DAT_006553d8 = globalThis.DAT_006553d8, DAT_006554f8 = globalThis.DAT_006554f8, DAT_006554fa = globalThis.DAT_006554fa;
const DAT_006554fc = globalThis.DAT_006554fc, DAT_006558e8 = globalThis.DAT_006558e8, DAT_00655b82 = globalThis.DAT_00655b82, DAT_00655be6 = globalThis.DAT_00655be6, DAT_00655c22 = globalThis.DAT_00655c22, DAT_006560f0 = globalThis.DAT_006560f0;
const DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f6 = globalThis.DAT_006560f6, DAT_006560f7 = globalThis.DAT_006560f7, DAT_006560f9 = globalThis.DAT_006560f9, DAT_006560ff = globalThis.DAT_006560ff, DAT_00656100 = globalThis.DAT_00656100;
const DAT_0065610a = globalThis.DAT_0065610a, DAT_0067963f = globalThis.DAT_0067963f, DAT_00679640 = globalThis.DAT_00679640, DAT_0067a798 = globalThis.DAT_0067a798, DAT_0067a7a0 = globalThis.DAT_0067a7a0, DAT_0067a7a8 = globalThis.DAT_0067a7a8;
const DAT_006a6668 = globalThis.DAT_006a6668, DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad558 = globalThis.DAT_006ad558, DAT_ffffeef4 = globalThis.DAT_ffffeef4, DAT_fffffbec = globalThis.DAT_fffffbec;
const DAT_fffffbf0 = globalThis.DAT_fffffbf0, DAT_fffffef8 = globalThis.DAT_fffffef8, DAT_ffffff1c = globalThis.DAT_ffffff1c, DAT_ffffff70 = globalThis.DAT_ffffff70, DAT_ffffff90 = globalThis.DAT_ffffff90, DAT_ffffffd0 = globalThis.DAT_ffffffd0;
const DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec;
const DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4, DAT_fffffff8 = globalThis.DAT_fffffff8, s_ACCEPT_00626ed8 = globalThis.s_ACCEPT_00626ed8, s_ACCEPT_00626ef4 = globalThis.s_ACCEPT_00626ef4, s_ACCEPT_00626f44 = globalThis.s_ACCEPT_00626f44;
const s_ACTIVATEALLY_00626b94 = globalThis.s_ACTIVATEALLY_00626b94, s_ALLIANCENOBETRAY_00626be4 = globalThis.s_ALLIANCENOBETRAY_00626be4, s_ALLIANCENODISLIKE_00626c0c = globalThis.s_ALLIANCENODISLIKE_00626c0c, s_ALLIANCENOPATIENCE_00626c30 = globalThis.s_ALLIANCENOPATIENCE_00626c30, s_ALLIANCENOPATIENCE_00626c78 = globalThis.s_ALLIANCENOPATIENCE_00626c78, s_ALLIANCENOSMALL_00626c20 = globalThis.s_ALLIANCENOSMALL_00626c20;
const s_ALLIANCENOTHANKS_00626c44 = globalThis.s_ALLIANCENOTHANKS_00626c44, s_ALLIANCENOWINNING_00626bf8 = globalThis.s_ALLIANCENOWINNING_00626bf8, s_ALLIANCE_00626b74 = globalThis.s_ALLIANCE_00626b74, s_ALLYHELPS_00626ba4 = globalThis.s_ALLYHELPS_00626ba4, s_APOLOGIZE_00626d7c = globalThis.s_APOLOGIZE_00626d7c, s_ATWAR_00626e20 = globalThis.s_ATWAR_00626e20;
const s_BREAKTHROUGH_00626f4c = globalThis.s_BREAKTHROUGH_00626f4c, s_CANCELALLY_00626df0 = globalThis.s_CANCELALLY_00626df0, s_CEASEFIRE_00626b88 = globalThis.s_CEASEFIRE_00626b88, s_CONTINUEHAWKS_00626f68 = globalThis.s_CONTINUEHAWKS_00626f68, s_CONTINUEUN_00626f5c = globalThis.s_CONTINUEUN_00626f5c, s_CYBERCOP_00626e48 = globalThis.s_CYBERCOP_00626e48;
const s_Civilization_II_Multiplayer_Gold_00626978 = globalThis.s_Civilization_II_Multiplayer_Gold_00626978, s_DEMANDHELP_00626bb0 = globalThis.s_DEMANDHELP_00626bb0, s_DIDNTHELP_00626bc8 = globalThis.s_DIDNTHELP_00626bc8, s_DIPLOMACYMENU_00626f84 = globalThis.s_DIPLOMACYMENU_00626f84, s_DIPLOMACY_00626f78 = globalThis.s_DIPLOMACY_00626f78, s_DefaultLanguage_006269b4 = globalThis.s_DefaultLanguage_006269b4;
const s_DefaultLanguage_006269d4 = globalThis.s_DefaultLanguage_006269d4, s_EMISSARYFORCE_00626a6c = globalThis.s_EMISSARYFORCE_00626a6c, s_EMISSARY_00626a7c = globalThis.s_EMISSARY_00626a7c, s_ETERNALALLIES_00626e38 = globalThis.s_ETERNALALLIES_00626e38, s_EXCHANGEGIFT2_00626b30 = globalThis.s_EXCHANGEGIFT2_00626b30, s_EXCHANGEGIFT_00626b20 = globalThis.s_EXCHANGEGIFT_00626b20;
const s_EXCHANGEPETTY_00626b64 = globalThis.s_EXCHANGEPETTY_00626b64, s_EXCHANGE_00626b50 = globalThis.s_EXCHANGE_00626b50, s_FAVORMENU_00626dfc = globalThis.s_FAVORMENU_00626dfc, s_FEEBLEALLY_00626dc8 = globalThis.s_FEEBLEALLY_00626dc8, s_FEEBLE_00626de8 = globalThis.s_FEEBLE_00626de8, s_GIFTMENU_00626ea4 = globalThis.s_GIFTMENU_00626ea4;
const s_GIVEMOREALLY_00626d94 = globalThis.s_GIVEMOREALLY_00626d94, s_GIVEMORECIV_00626d88 = globalThis.s_GIVEMORECIV_00626d88, s_GIVEMORE_00626da4 = globalThis.s_GIVEMORE_00626da4, s_GREETINGS_00626a3c = globalThis.s_GREETINGS_00626a3c, s_HELLNOWEWONTGO_00626e28 = globalThis.s_HELLNOWEWONTGO_00626e28, s_HELPBONUS_00626bbc = globalThis.s_HELPBONUS_00626bbc;
const s_KNOWNO_00626eb0 = globalThis.s_KNOWNO_00626eb0, s_MAPNO_00626e94 = globalThis.s_MAPNO_00626e94, s_MAPYES_00626e9c = globalThis.s_MAPYES_00626e9c, s_MERCBETRAYALLY_00626e78 = globalThis.s_MERCBETRAYALLY_00626e78, s_MERCBETRAY_00626e88 = globalThis.s_MERCBETRAY_00626e88, s_MERCDECLARE_00626e6c = globalThis.s_MERCDECLARE_00626e6c;
const s_MERCENARY_00626e54 = globalThis.s_MERCENARY_00626e54, s_MILITARYNONE_00626f0c = globalThis.s_MILITARYNONE_00626f0c, s_MILITARYNONE_00626f1c = globalThis.s_MILITARYNONE_00626f1c, s_MILITARYNO_00626f2c = globalThis.s_MILITARYNO_00626f2c, s_MILITARYNO_00626f38 = globalThis.s_MILITARYNO_00626f38, s_MILITARYSOURCE_00626efc = globalThis.s_MILITARYSOURCE_00626efc;
const s_MONEYGIFT_00626ee0 = globalThis.s_MONEYGIFT_00626ee0, s_MSHyperTextClass_00626908 = globalThis.s_MSHyperTextClass_00626908, s_MSHyperTextClass_00626920 = globalThis.s_MSHyperTextClass_00626920, s_MUSTATTACK_00626e08 = globalThis.s_MUSTATTACK_00626e08, s_MicroProse_Software_00626964 = globalThis.s_MicroProse_Software_00626964, s_NOBETRAYWEAK_00626bd4 = globalThis.s_NOBETRAYWEAK_00626bd4;
const s_NOBETRAYWEAK_00626cc0 = globalThis.s_NOBETRAYWEAK_00626cc0, s_NOCONTACT_00626e14 = globalThis.s_NOCONTACT_00626e14, s_NOEXCHANGEMAD_00626aa0 = globalThis.s_NOEXCHANGEMAD_00626aa0, s_NOEXCHANGEMAD_00626ac4 = globalThis.s_NOEXCHANGEMAD_00626ac4, s_NOEXCHANGEMEDIUM_00626ab0 = globalThis.s_NOEXCHANGEMEDIUM_00626ab0, s_NOEXCHANGEMEDIUM_00626ad4 = globalThis.s_NOEXCHANGEMEDIUM_00626ad4;
const s_NOEXCHANGEMEDIUM_00626afc = globalThis.s_NOEXCHANGEMEDIUM_00626afc, s_NOEXCHANGENOW_00626b10 = globalThis.s_NOEXCHANGENOW_00626b10, s_NOEXCHANGENOW_00626b40 = globalThis.s_NOEXCHANGENOW_00626b40, s_NOEXCHANGEWONDER_00626ae8 = globalThis.s_NOEXCHANGEWONDER_00626ae8, s_NOVIOLATORS_00626ddc = globalThis.s_NOVIOLATORS_00626ddc, s_NUCLEARWEAPONS_00626a50 = globalThis.s_NUCLEARWEAPONS_00626a50;
const s_PEACENOBETRAY_00626cd0 = globalThis.s_PEACENOBETRAY_00626cd0, s_PEACENODISLIKE_00626cf0 = globalThis.s_PEACENODISLIKE_00626cf0, s_PEACENOPATIENCE_00626d00 = globalThis.s_PEACENOPATIENCE_00626d00, s_PEACENOPATIENCE_00626d30 = globalThis.s_PEACENOPATIENCE_00626d30, s_PEACENOWINNING_00626ce0 = globalThis.s_PEACENOWINNING_00626ce0, s_PERHAPSBYE_00626cb4 = globalThis.s_PERHAPSBYE_00626cb4;
const s_PERHAPSBYE_00626d68 = globalThis.s_PERHAPSBYE_00626d68, s_PERHAPSSECRET_00626c58 = globalThis.s_PERHAPSSECRET_00626c58, s_PERHAPSSECRET_00626d10 = globalThis.s_PERHAPSSECRET_00626d10, s_PERHAPSSOLIDARITY_00626c8c = globalThis.s_PERHAPSSOLIDARITY_00626c8c, s_PERHAPSSOLIDARITY_00626d40 = globalThis.s_PERHAPSSOLIDARITY_00626d40, s_PERHAPSTHANKSANYWAY_00626ca0 = globalThis.s_PERHAPSTHANKSANYWAY_00626ca0;
const s_PERHAPSTHANKSANYWAY_00626d54 = globalThis.s_PERHAPSTHANKSANYWAY_00626d54, s_PERHAPSTHROWIN_00626c68 = globalThis.s_PERHAPSTHROWIN_00626c68, s_PERHAPSTHROWIN_00626d20 = globalThis.s_PERHAPSTHROWIN_00626d20, s_PROVOKE_00626d74 = globalThis.s_PROVOKE_00626d74, s_PROVOKE_00626dd4 = globalThis.s_PROVOKE_00626dd4, s_SELLTECH2_00626a94 = globalThis.s_SELLTECH2_00626a94;
const s_SELLTECH_00626a88 = globalThis.s_SELLTECH_00626a88, s_SYMPATHY_00626db0 = globalThis.s_SYMPATHY_00626db0, s_Software\%s\%s_006269a4 = globalThis.s_Software\%s\%s_006269a4, s_Software\%s\%s_006269c4 = globalThis.s_Software\%s\%s_006269c4, s_TAUNTALLY_00626dbc = globalThis.s_TAUNTALLY_00626dbc, s_TECHGIFT2_00626ec4 = globalThis.s_TECHGIFT2_00626ec4;
const s_TECHGIFT_00626eb8 = globalThis.s_TECHGIFT_00626eb8, s_TREATY_00626b80 = globalThis.s_TREATY_00626b80, s_UNFORTUNATE_00626e60 = globalThis.s_UNFORTUNATE_00626e60, s_WASTING_00626ed0 = globalThis.s_WASTING_00626ed0, s_WASTING_00626eec = globalThis.s_WASTING_00626eec, s_YOURNUKES_00626a60 = globalThis.s_YOURNUKES_00626a60;
const s_cv.dll_00626a08 = globalThis.s_cv.dll_00626a08, s_describe._006268fc = globalThis.s_describe._006268fc;


 export function FUN_004502b0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  return in_ECX;
}


 export function FUN_004502e0 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005db55b(s32(in_ECX, 0));
  }
  iVar1 = FUN_005db140(param_1);
  w32(in_ECX, 0, iVar1);
  return;
}


 export function FUN_00450340 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005db55b(s32(in_ECX, 0));
  }
  w32(in_ECX, 0, 0);
  return;
}


 export function FUN_00450390 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, param_1);
  FUN_00450440(param_1);
  return;
}


 export function FUN_004503d0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc44d(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00450400 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc763(s32((in_ECX + 8), 0), 0, 0);
  return;
}


 export function FUN_00450440 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bcdc3(s32((in_ECX + 8), 0), s32((param_1 + 0x404), 0));
  return;
}


 export function FUN_00450480 (in_ECX, param_1, param_2, param_3)

 {
  let piVar1;
  let iVar2;
  let iVar3;
  let pvVar4;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_44;
  let local_40;
  let local_3c;
  let local_34;
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
  puStack_c = LAB_00450acc;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_18 = 0;
  local_28 = s32(param_1, 0);
  local_24 = s32(param_1, 1);
  local_20 = s32(param_1, 2);
  local_1c = s32(param_1, 3);
  iVar2 = FUN_00453e51(DAT_006d1da0, 0x18);
  if ((DAT_00655b07 === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = 1;
  }
  w32(((in_ECX + 0x3e8) + param_2 * 4), 0, 0);
  local_14 = DAT_006d1da0;
  if ((local_18 !== 0)) {
    local_14 = DAT_0067a8c0;
  }
  for (/* cond: (local_2c < 0x64) */); local_2c = (local_2c < 0x64); local_2c = (local_2c + 1)) {
    if ((param_3 === 0)) {
      iVar2 = FUN_004bd9f0(DAT_006d1da0, local_2c);
      if ((iVar2 === 0)) {
        w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x3f0) + in_ECX), 0, local_2c);
        w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x8400) + in_ECX), 0, 0);
        piVar1 = ((in_ECX + 0x3e8) + param_2 * 4);
        w32(piVar1, 0, (s32(piVar1, 0) + 1));
      }
    }
    else if ((iVar2 === 0)) {
      if ((_MEM[DAT_00627689 + local_2c * 0x10] === 1)) {
        w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x3f0) + in_ECX), 0, local_2c);
        w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x8400) + in_ECX), 0, 0);
        piVar1 = ((in_ECX + 0x3e8) + param_2 * 4);
        w32(piVar1, 0, (s32(piVar1, 0) + 1));
      }
    }
    else {
      w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x3f0) + in_ECX), 0, local_2c);
      w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x8400) + in_ECX), 0, 0);
      piVar1 = ((in_ECX + 0x3e8) + param_2 * 4);
      w32(piVar1, 0, (s32(piVar1, 0) + 1));
    }
  }
  if ((s32(((in_ECX + 0x3e8) + param_2 * 4), 0) < 1)) {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, -1);
  }
  else {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, 0);
  }
  w32(((in_ECX + 0x3e0) + param_2 * 4), 0, 3);
  iVar2 = (param_2 * 0x10 + in_ECX);
  w32((iVar2 + 0x3c0), 0, s32(param_1, 0));
  w32((iVar2 + 0x3c4), 0, s32(param_1, 1));
  w32((iVar2 + 0x3c8), 0, s32(param_1, 2));
  w32((iVar2 + 0x3cc), 0, s32(param_1, 3));
  if ((s32(((in_ECX + 0x10420) + param_2 * 4), 0) < s32(((in_ECX + 0x3e8) + param_2 * 4), 0))) {
    iVar3 = FUN_006e7d8c(2);
    iVar2 = local_20;
    piVar1 = ((param_2 * 0x10 + 0x3c8) + in_ECX);
    w32(piVar1, 0, (s32(piVar1, 0) - iVar3));
    local_28 = FUN_006e7d8c(2);
    local_28 = (iVar2 - local_28);
    pvVar4 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar4 === 0)) {
      local_34 = 0;
    }
    else {
      local_34 = FUN_0040fb00();
    }
    local_8 = -1;
    w32(((in_ECX + 0x37c) + param_2 * 4), 0, local_34);
    if ((in_ECX === 0)) {
      local_40 = 0;
    }
    else {
      local_40 = (in_ECX + 0x48);
    }
    FUN_0040fc50(local_40, (param_2 + 0x411), DAT_ffffffd8, 1);
    FUN_0040fd40(0, ((s32(((in_ECX + 0x3e8) + param_2 * 4), 0) + -1) - s32(((in_ECX + 0x10420) + param_2 * 4), 0)));
    FUN_0040fcf0(0);
    FUN_005db0d0(s32(((in_ECX + 0x10420) + param_2 * 4), 0));
    FUN_0040fd80((LAB_0040349f + ((u8((param_2 === 0)) - 1) & -0x22c9)));
    FUN_00451ac0((LAB_0040349f + ((u8((param_2 === 0)) - 1) & -0x22c9)));
  }
  pvVar4 = operator_new(0x40);
  local_8 = 1;
  if ((pvVar4 === 0)) {
    local_3c = 0;
  }
  else {
    local_3c = FUN_00451930();
  }
  local_8 = -1;
  w32(((in_ECX + 0x384) + param_2 * 4), 0, local_3c);
  if ((in_ECX === 0)) {
    local_44 = 0;
  }
  else {
    local_44 = (in_ECX + 0x48);
  }
  FUN_004519b0(local_44, (param_2 + 0x413), ((param_2 * 0x10 + in_ECX) + 0x3c0));
  FUN_00451a60(LAB_004017da);
  in_ECX = (in_ECX + 0x384);
  FUN_00450f0b(param_2);
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00450ae6 (param_1)

 {
  FUN_00450b22(0, param_1);
  return;
}


 export function FUN_00450b04 (param_1)

 {
  FUN_00450b22(1, param_1);
  return;
}


 export function FUN_00450b22 (param_1, param_2)

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
  FUN_00450f0b(param_1);
  return;
}


 export function FUN_00450b83 (param_1)

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
  local_c = (param_1 + -0x413);
  FUN_00451890(DAT_fffffff0, DAT_ffffffec);
  if ((iVar2 < s32(((local_8 + 0x3e8) + local_c * 4), 0))) {
    iVar3 = FUN_005dba95();
    if ((iVar3 === 0)) {
      iVar3 = FUN_005dbab8();
      if ((iVar3 === 0)) {
        for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0));
            local_18 = (local_18 + 1)) {
          if ((local_18 !== iVar2)) {
            w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 0);
          }
        }
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((iVar2 * 4 + local_c * 0x2004) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
      else {
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((iVar2 * 4 + local_c * 0x2004) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
    }
    else {
      for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)); local_18 = (local_18 + 1))
      {
        w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 0);
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
        w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 1);
      }
    }
    FUN_00450f0b(local_c);
  }
  return;
}


 export function FUN_00450df6 (param_1, param_2, param_3)

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
      iVar1 = (((param_2 - iVar1) / (iVar2 / (s32(((local_8 + 0x10420) + param_3 * 4), 0) + 1) | 0) | 0) + s32(((local_8 + 0x10410) + param_3 * 4), 0));
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


 export function FUN_00450f0b (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
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
  local_1c = (local_1c / (s32(((local_34 + 0x10420) + param_1 * 4), 0) + 1) | 0);
  iVar1 = (local_1c / 2 | 0);
  iVar2 = FUN_0040ef70();
  local_60 = (iVar1 - (iVar2 / 2 | 0));
  w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
  local_54 = 0;
  do {
    if ((s32(((local_34 + 0x3e8) + param_1 * 4), 0) <= local_54)) {
 LAB_00451089: :
      for (/* cond: (local_54 < (s32(((local_34 + 0x10420) + param_1 * 4), 0) + 1)) */); local_54 = (local_54 < (s32(((local_34 + 0x10420) + param_1 * 4), 0) + 1));
          local_54 = (local_54 + 1)) {
        local_50 = ((s32(((param_1 * 0x10 + 0x3c4) + local_34), 0) + local_54 * local_1c) + DAT_0062d85c);
        FUN_006e7d90(DAT_ffffffd4, local_4c, local_50, (local_4c + local_48), (local_50 + local_1c));
        if (((s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) < s32(((local_34 + 0x3e8) + param_1 * 4), 0))) {
          local_30 = s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0x8400) + local_34), 0);
          if ((local_30 === 0)) {
            local_38 = DAT_00635a1c;
            local_44 = DAT_00635a20;
          }
          else {
            local_38 = DAT_00635a28;
            local_44 = DAT_00635a2c;
          }
          local_5c = s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0x3f0) + local_34), 0);
          local_3c = (DAT_00646cb8 + (s8(_MEM[DAT_0062768c + local_5c * 0x10]) * 0xf0 + s8(_MEM[DAT_0062768d + local_5c * 0x10]) * 0x3c));
          iVar1 = FUN_00451830();
          local_40 = (DAT_0062d858 * 3 + iVar1 * 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_78 = DAT_00635a18;
          }
          else {
            local_78 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_78);
          if ((s32(((local_34 + 0x10410) + param_1 * 4), 0) === -1)) {
            FUN_0040bbb0();
            if ((DAT_0067a994 === 7)) {
              FUN_0040bc10(0x36b);
            }
            else {
              FUN_0040bc10(0x36a);
            }
            w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
            iVar1 = FUN_00407f90(((param_1 * 0x10 + local_34) + 0x3c0));
            iVar2 = FUN_0040efd0(DAT_00679640);
            local_40 = ((iVar1 - iVar2) / 2 | 0);
          }
          else {
            local_58 = FUN_00451830();
            local_58 = (local_58 + DAT_0062d858 * 2);
            local_7c = local_58;
            if ((((s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_54) & 1) === 0)) {
              local_7c = DAT_0062d858;
            }
            iVar2 = (local_50 + (local_1c / 2 | 0));
            iVar1 = FUN_00451860();
            FUN_005cef31(DAT_ffffff90, DAT_0067a7a8, (local_4c + local_7c), (iVar2 - (iVar1 / 2 | 0)));
            FUN_0040bbb0();
            uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_5c * 0x10), 0));
            FUN_0040bbe0(uVar3);
          }
          if ((local_44 !== local_38)) {
            FUN_005c19ad(local_44);
            FUN_005c0f57(local_8, DAT_00679640, ((local_4c + local_40) + 2), ((local_50 + local_60) + 1), 5);
            FUN_005c19ad(local_38);
            FUN_005c0f57(local_8, DAT_00679640, ((local_4c + local_40) + 1), (local_50 + local_60), 5);
          }
          FUN_005c19ad(local_38);
          FUN_005c0f57(local_8, DAT_00679640, (local_4c + local_40), (local_50 + local_60), 5);
        }
      }
      FUN_005c0073(DAT_ffffffe8);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    if ((s32((((param_1 * 0x2004 + local_54 * 4) + 0x8400) + local_34), 0) !== 0)) {
      w32(((local_34 + 0x1e4) + param_1 * 4), 0, 1);
      goto LAB_00451089;
    }
    local_54 = (local_54 + 1);
  } ( true );
}


 export function FUN_00451830 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00407f90((in_ECX + 0x10));
  return;
}


 export function FUN_00451860 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00407fc0((in_ECX + 0x10));
  return;
}


 export function FUN_00451890 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00414d10(param_1, param_2);
  FUN_005bd48f(uVar1);
  return;
}


 export function FUN_004518d0 ()

 {
  FUN_00451900();
  FUN_005c5b7f();
  return;
}


 export function FUN_00451900 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bd0e7(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00451930 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045197d;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004519b0 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 1, param_2, param_3);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32((in_ECX + 0x38), 0, 0);
  w32((in_ECX + 0x3c), 0, 0);
  uVar1 = FUN_005c8be1(param_3, in_ECX);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_00451a60 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */  /* CDialog::SetHelpID(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function SetHelpID (this, param_1)

 {
  w32((this + 0x3c), 0, param_1);
  return;
}


 export function FUN_00451ac0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 export function FUN_00451af0 (in_ECX, param_1)

 {
  let xLeft;
  let yTop;
  let iVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  FUN_005c19ad(0xa);
  xLeft = (s32((in_ECX + 0x5f8), 0) + DAT_0062d858);
  yTop = (s32((in_ECX + 0x5fc), 0) + DAT_0062d85c);
  iVar1 = FUN_00407f90((in_ECX + 0x5f8));
  iVar1 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) - DAT_0062d858);
  iVar2 = FUN_0040ef70();
  iVar3 = FUN_0040ef70();
  local_8 = ((iVar2 * 9 + iVar3) + DAT_0062d85c * 0xd);
  FUN_006e7d90(DAT_ffffffe8, xLeft, yTop, (iVar1 + xLeft), (local_8 + yTop));
  FUN_005a9780(DAT_006a6668);
  FUN_00452188(UNNAMED, UNNAMED, UNNAMED, UNNAMED, param_1);
  FUN_00408490((in_ECX + 0x608));
  return;
}


 export function FUN_00451bf0 (in_ECX)

 {
  let iVar1;
  let pvVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_40;
  let local_3c;
  let local_38;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00452170;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_0043c5f0();
  FUN_00418a30(DAT_00626854);
  if ((s32((in_ECX + 0x1b20), 0) !== 0)) {
    if ((s32((in_ECX + 0x1b20), 0) !== 0)) {
      FUN_00453aa0(1);
    }
    w32((in_ECX + 0x1b20), 0, 0);
  }
  iVar1 = s32((in_ECX + 0x11c), 0);
  if ((iVar1 === 0)) {
    w32((in_ECX + 0x1b24), 0, s32((in_ECX + 0x5f8), 0));
    w32((in_ECX + 0x1b28), 0, s32((in_ECX + 0x5fc), 0));
    w32((in_ECX + 0x1b2c), 0, s32((in_ECX + 0x600), 0));
    w32((in_ECX + 0x1b30), 0, s32((in_ECX + 0x604), 0));
    iVar1 = FUN_006e7d8c(3);
    w32((in_ECX + 0x1b30), 0, (s32((in_ECX + 0x1b30), 0) - iVar1));
    if ((s32((in_ECX + 0x118), 0) === 8)) {
      FUN_0040f380();
      FUN_0040f380();
    }
    else if ((s32((in_ECX + 0x118), 0) === 1)) {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
      if ((s32((in_ECX + 0x1b20), 0) === 0)) {
        local_20 = s32((in_ECX + 0x5f8), 0);
        local_1c = s32((in_ECX + 0x5fc), 0);
        local_18 = s32((in_ECX + 0x600), 0);
        local_14 = s32((in_ECX + 0x604), 0);
        iVar1 = FUN_006e7d8c(3);
        local_14 = (local_14 - iVar1);
        pvVar2 = operator_new(0x40);
        local_8 = 0;
        if ((pvVar2 === 0)) {
          local_30 = 0;
        }
        else {
          local_30 = FUN_00451930();
        }
        local_8 = -1;
        w32((in_ECX + 0x1b20), 0, local_30);
        if ((in_ECX === 0)) {
          local_3c = 0;
        }
        else {
          local_3c = (in_ECX + 0x48);
        }
        FUN_004519b0(local_3c, 0xfa9, DAT_ffffffe0);
        FUN_00451a60(LAB_00402270);
        in_ECX = (in_ECX + 0x1b20);
        FUN_0040f380();
      }
    }
    else {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
      if ((s32((in_ECX + 0x1b20), 0) === 0)) {
        local_20 = s32((in_ECX + 0x5f8), 0);
        local_1c = s32((in_ECX + 0x5fc), 0);
        local_18 = s32((in_ECX + 0x600), 0);
        local_14 = s32((in_ECX + 0x604), 0);
        iVar1 = FUN_006e7d8c(3);
        local_14 = (local_14 - iVar1);
        pvVar2 = operator_new(0x40);
        local_8 = 1;
        if ((pvVar2 === 0)) {
          local_38 = 0;
        }
        else {
          local_38 = FUN_00451930();
        }
        local_8 = -1;
        w32((in_ECX + 0x1b20), 0, local_38);
        if ((in_ECX === 0)) {
          local_40 = 0;
        }
        else {
          local_40 = (in_ECX + 0x48);
        }
        FUN_004519b0(local_40, 0xfa9, DAT_ffffffe0);
        FUN_00451a60(LAB_00402270);
        in_ECX = (in_ECX + 0x1b20);
        FUN_0040f380();
      }
    }
  }
  else if ((iVar1 === 1)) {
    if ((s32((in_ECX + 0x118), 0) === 7)) {
      FUN_0040f380();
      FUN_0040f380();
    }
    else if ((s32((in_ECX + 0x118), 0) === 1)) {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
    }
    else {
      FUN_0040f380();
      FUN_0040f380();
      FUN_0040f380();
    }
  }
  else if ((iVar1 === 2)) {
    FUN_0040f380();
    FUN_0040f380();
  }
  FUN_00453af0();
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00452188 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let in_stack_00000014;

  /* switch */ () {
  case 0 :
    break;
  case 1 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_00564d00(DAT_00000004);
    }
    else {
      FUN_00564e6d();
    }
    break;
  case 2 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_00599a20(DAT_00000004);
    }
    else {
      FUN_00599b8d();
    }
    break;
  case 3 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_005261a0(DAT_00000004);
    }
    else {
      FUN_0052630d();
    }
    break;
  case 4 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_005ac840(DAT_00000004);
    }
    else {
      FUN_005ac9ad();
    }
    break;
  case 5 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_00490590(DAT_00000004);
    }
    break;
  case 6 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_00518f00(DAT_00000004);
    }
    break;
  case 7 :
    if ((s32((in_ECX + 0x11c), 0) === 0)) {
      FUN_004a69b0(DAT_00000004);
    }
    break;
  case 8 :
    FUN_005666da();
  }
  return;
}


 export function FUN_00452315 (param_1)

 {
  let bVar1;
  let iVar2;
  let pcVar3;
  let sVar4;
  let sVar5;
  let extraout_ECX;
  let local_1110;
  let local_110c;
  let local_10c;
  let local_108;
  let local_106;
  let uStackY_20;

  FUN_005f35f0();
  FUN_004aef20();
  FUN_004f4793();
  FUN_00453af0();
  /* switch */ (s32((extraout_ECX + 0x118), 0) ( *) ((extraout_ECX + 0x118)  )) {
  case 1 :
    param_1 = s32(((extraout_ECX + 0x65c) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 2 :
    param_1 = s32(((extraout_ECX + 0x980) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 3 :
    param_1 = s32(((extraout_ECX + 0xabc) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 4 :
    param_1 = s32(((extraout_ECX + 0xba0) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 5 :
    param_1 = s32(((extraout_ECX + 0xdd0) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 6 :
    param_1 = s32(((extraout_ECX + 0xd94) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  case 7 :
    param_1 = s32(((extraout_ECX + 0xedc) + param_1 * 4), 0);
    FUN_005f22d0();
    break;
  default :
    FUN_005f22d0();
  }
  iVar2 = FUN_004a2379();
  if ((iVar2 === 0)) {
    local_1110 = (param_1 + 1);
    local_106 = 0;
    bVar1 = 1;
    do {
      while ((iVar2 !== 0)) {
        if ((local_1110 === 0));
        uStackY_20 = 0x452550;
        _strncpy(DAT_fffffef8, DAT_00679640, 2);
        iVar2 = _strcmp(DAT_fffffef8, DAT_006268f4);
        if ((iVar2 !== 0));
      }
    } while ((UNNAMED !== 0x40));
    bVar1 = 0;
 LAB_0045259e: :
    if (bVar1) {
      FUN_004aef20();
      do {
        do {
          if ((!bVar1)) {
            FUN_004a2020();
            goto LAB_00452724;
          }
          if (((s32(DAT_0000000c, 0) & 0x10) !== 0));
          pcVar3 = _fgets(DAT_00679640, 0x800, DAT_0062cd20);
          if ((DAT_00679640 === 0x40));
        local_10c = _strrchr(DAT_00679640, 0xa);
        if ((local_10c !== 0)) {
          _MEM[local_10c] = 0;
          FUN_005f22e0();
        }
        sVar4 = _strlen(DAT_ffffeef4);
        sVar5 = _strlen(DAT_00679640);
        if ((0xffe < (sVar4 + sVar5))) {
          sVar4 = _strlen(DAT_ffffeef4);
          _MEM[(0x67a63f - sVar4)] = 0;
        }
        FUN_005f22e0();
        sVar4 = _strlen(DAT_ffffeef4);
      } while ((sVar4 !== 0xfff));
    }
    else {
      FUN_0040bc10();
      FUN_005f22d0();
    }
 LAB_00452724: :
    FUN_00418a30();
    FUN_0040f380();
  }
  return;
}


 export function FUN_00452768 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_10c;
  let local_108;

  if ((iVar1 !== 0)) {
    __chdir(DAT_0064bb08);
    FUN_005f22d0(DAT_fffffef8, s_describe._006268fc);
    FUN_005f22e0(DAT_fffffef8, DAT_0062cd24);
    iVar1 = FUN_00415133(DAT_fffffef8);
    if ((iVar1 === 0)) {
      FUN_00453c40();
      __chdir(DAT_00655020);
      return;
    }
    __chdir(DAT_00655020);
  }
  /* switch */ (s32((in_ECX + 0x118), 0) ( *) ((in_ECX + 0x118)  )) {
  case 1 :
    local_10c = s32(((in_ECX + 0x65c) + param_1 * 4), 0);
    break;
  case 2 :
    local_10c = s32(((in_ECX + 0x980) + param_1 * 4), 0);
    break;
  case 3 :
    local_10c = s32(((in_ECX + 0xabc) + param_1 * 4), 0);
    break;
  case 4 :
    local_10c = s32(((in_ECX + 0xba0) + param_1 * 4), 0);
    break;
  case 5 :
    local_10c = s32(((in_ECX + 0xdd0) + param_1 * 4), 0);
    break;
  case 6 :
    local_10c = s32(((in_ECX + 0xd94) + param_1 * 4), 0);
    break;
  case 7 :
    local_10c = s32(((in_ECX + 0xedc) + param_1 * 4), 0);
  }
  if ((local_10c < 0)) {
    if ((s32((in_ECX + 0x118), 0) === 1)) {
      FUN_00453c40();
    }
    else {
      FUN_00453c40();
    }
  }
  else if ((s32((in_ECX + 0x118), 0) === 1)) {
    FUN_00453c80();
  }
  else {
    FUN_00453c80();
  }
  return;
}


 export function FUN_004529df ()

 {
  let local_2c;

  if ((DAT_00626850 === 0)) {
    wv(DAT_00626850, 1);
    local_2c = 0x88;
    local_2c = FUN_005c9307;
    local_2c = 0;
    local_2c = 0x10;
    local_2c = DAT_006e4ff0;
    local_2c = 0;
    local_2c = FUN_006e7dac(DAT_006e4ff0, 0x212);
    local_2c = 0;
    local_2c = 0;
    local_2c = s_MSHyperTextClass_00626908;
    FUN_006e7da8(DAT_ffffffd4);
  }
  return;
}


 export function FUN_00452a67 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00452aca;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005c8c83(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_00452ac1();
  FUN_00452ad4();
  return;
}


 export function FUN_00452ac1 ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_00452ad4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00452ae2 (param_1, param_2)

 {
  let iVar1;
  let nWidth;
  let pHVar2;
  let hMenu;
  let hInstance;
  let lpParam;

  FUN_004529df();
  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  pHVar2 = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  nWidth = FUN_00407f90(param_1);
  pHVar2 = FUN_006e7d50(4, s_MSHyperTextClass_00626920, DAT_0062691c, 0x50000000, s32(param_1, 0), s32(param_1, 1), nWidth, iVar1, pHVar2, hMenu, hInstance, lpParam);
  iVar1 = FUN_005c9499(pHVar2, param_2);
  w32((iVar1 + 0x2c), 0, 1);
  FUN_006e7db0(pHVar2, -4, 0x5c8caf);
  return pHVar2;
}


 export function FUN_00452b89 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 1, param_2, param_3);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32((in_ECX + 0x38), 0, 0);
  w32((in_ECX + 0x3c), 0, 0);
  uVar1 = FUN_00452ae2(param_3, in_ECX);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_00452c14 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  let sVar3;
  let pvVar4;
  // in_ECX promoted to parameter;
  let iVar5;
  let unaff_FS_OFFSET;
  let local_34;
  let local_2c;
  let local_24;
  let local_1c;
  let local_18;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045319e;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  /* switch */ () {
  case 0 :
    for (/* cond: (s32(((in_ECX + 0x7ec) + local_24 * 4), 0) !== param_1) */);
        (local_24 = (local_24 < s32((in_ECX + 0x658), 0)) && (in_ECX = (in_ECX + 0x7ec))
        ); local_24 = (local_24 + 1)) {
    }
    if ((s32((in_ECX + 0x658), 0) === local_24));
        (local_24 = (local_24 < s32((in_ECX + 0x97c), 0)) && (in_ECX = (in_ECX + 0xa1c))
        ); local_24 = (local_24 + 1)) {
    }
    if ((s32((in_ECX + 0x97c), 0) === local_24));
        (local_24 = (local_24 < s32((in_ECX + 0xab8), 0)) && (in_ECX = (in_ECX + 0xb2c))
        ); local_24 = (local_24 + 1)) {
    }
    if ((s32((in_ECX + 0xab8), 0) === local_24));
        (local_24 = (local_24 < s32((in_ECX + 0xb9c), 0)) && (in_ECX = (in_ECX + 0xc98))
        ); local_24 = (local_24 + 1)) {
    }
    if ((s32((in_ECX + 0xb9c), 0) === local_24));
        (local_24 = (local_24 < s32((in_ECX + 0xdcc), 0)) && (in_ECX = (in_ECX + 0xe54))
        ); local_24 = (local_24 + 1)) {
    }
    if ((s32((in_ECX + 0xdcc), 0) === local_24)) {
    iVar1 = FUN_0040efd0(DAT_00679640);
    iVar2 = FUN_00407f90(DAT_00000014);
    if ((iVar1 <= iVar2));
    _MEM[DAT_0067963f + sVar3] = 0;
  }
  if ((iVar1 !== 0)) {
    FUN_005c19ad(0x6a);
  }
  else {
    FUN_005c19ad(0x55);
  }
  iVar1 = FUN_0040ef70();
  iVar5 = ((param_3 + iVar1) + -2);
  iVar1 = FUN_0040efd0(DAT_00679640);
  iVar1 = (param_2 + iVar1);
  iVar2 = FUN_0040ef70(iVar1, iVar5);
  FUN_005c11b2(param_2, ((param_3 + iVar2) + -2), iVar1, iVar5);
  FUN_005c19ad(0xa);
  FUN_005c0f57(DAT_0067a798, DAT_00679640, (param_2 + 1), param_3, 5);
  if ((iVar1 !== 0)) {
    FUN_005c19ad(0x6a);
  }
  else {
    FUN_005c19ad(0x55);
  }
  FUN_005c0f57(DAT_0067a798, DAT_00679640, param_2, param_3, 5);
  FUN_005c19ad(0xa);
  pvVar4 = operator_new(0x48);
  local_8 = 0;
  if ((pvVar4 === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = FUN_00453b10();
  }
  local_8 = -1;
  w32(local_2c, 0, local_24);
  w32(local_2c, 0x11, 0);
  local_1c = 0;
  if ((s32((in_ECX + 0x1f40), 0) === 0)) {
    w32((in_ECX + 0x1f40), 0, local_2c);
  }
  else {
    local_1c = 1;
    for (/* cond: (s32((local_18 + 0x44), 0) !== 0) */); local_18 = (local_18 + 0x44);
        local_18 = s32((local_18 + 0x44), 0)) {
      local_1c = (local_1c + 1);
    }
    w32((local_18 + 0x44), 0, local_2c);
  }
  if ((in_ECX === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = (in_ECX + 0x48);
  }
  FUN_00452b89(local_34, (local_1c + 0xfb4), DAT_00000014);
  /* switch */ () {
  case 0 :
    FUN_00453d40(LAB_00401c76);
    local_2c = (local_2c + 1);
    break;
  case 1 :
    FUN_00453d40(LAB_004019ce);
    local_2c = (local_2c + 1);
    break;
  case 2 :
    FUN_00453d40(LAB_00403729);
    local_2c = (local_2c + 1);
    break;
  case 3 :
    FUN_00453d40(LAB_00402333);
    local_2c = (local_2c + 1);
    break;
  case 4 :
    FUN_00453d40(LAB_004019b0);
    local_2c = (local_2c + 1);
  }
  FUN_0040f380();
 switchD_00452e28_default: :
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004531b8 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = (param_1 + -0xfb4);
  for (/* cond: (local_c !== 0) */); (local_8 = (local_8 !== 0) && (local_c = (local_c !== 0)));
      local_c = s32(local_c, 0x11)) {
    local_8 = (local_8 + -1);
  }
  if ((local_c !== 0)) {
    wv(DAT_006a6780, 1);
    wv(DAT_006a6784, 0);
    wv(DAT_006a85a0, s32(local_c, 0));
    FUN_004f5f23(1);
  }
  return;
}


 export function FUN_0045323a (param_1)

 {
  let local_c;
  let local_8;

  local_8 = (param_1 + -0xfb4);
  for (/* cond: (local_c !== 0) */); (local_8 = (local_8 !== 0) && (local_c = (local_c !== 0)));
      local_c = s32(local_c, 0x11)) {
    local_8 = (local_8 + -1);
  }
  if ((local_c !== 0)) {
    wv(DAT_006a6780, 2);
    wv(DAT_006a6784, 0);
    wv(DAT_006a85a0, s32(local_c, 0));
    FUN_004f5f23(1);
  }
  return;
}


 export function FUN_004532bc (param_1)

 {
  let local_c;
  let local_8;

  local_8 = (param_1 + -0xfb4);
  for (/* cond: (local_c !== 0) */); (local_8 = (local_8 !== 0) && (local_c = (local_c !== 0)));
      local_c = s32(local_c, 0x11)) {
    local_8 = (local_8 + -1);
  }
  if ((local_c !== 0)) {
    wv(DAT_006a6780, 3);
    wv(DAT_006a6784, 0);
    wv(DAT_006a85a0, s32(local_c, 0));
    FUN_004f5f23(1);
  }
  return;
}


 export function FUN_0045333e (param_1)

 {
  let local_c;
  let local_8;

  local_8 = (param_1 + -0xfb4);
  for (/* cond: (local_c !== 0) */); (local_8 = (local_8 !== 0) && (local_c = (local_c !== 0)));
      local_c = s32(local_c, 0x11)) {
    local_8 = (local_8 + -1);
  }
  if ((local_c !== 0)) {
    wv(DAT_006a6780, 4);
    wv(DAT_006a6784, 0);
    wv(DAT_006a85a0, s32(local_c, 0));
    FUN_004f5f23(1);
  }
  return;
}


 export function FUN_004533c0 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = (param_1 + -0xfb4);
  for (/* cond: (local_c !== 0) */); (local_8 = (local_8 !== 0) && (local_c = (local_c !== 0)));
      local_c = s32(local_c, 0x11)) {
    local_8 = (local_8 + -1);
  }
  if ((local_c !== 0)) {
    wv(DAT_006a6780, 5);
    wv(DAT_006a6784, 0);
    wv(DAT_006a85a0, s32(local_c, 0));
    FUN_004f5f23(1);
  }
  return;
}


 export function FUN_00453aa0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00453ba0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_00453af0 ()

 {
  FUN_005bbb0a();
  return;
}


 export function FUN_00453b10 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00453b63;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00453cc0();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00453ba0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00453c03;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005c8c83(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_00453bfa();
  FUN_00453c0d();
  return;
}


 export function FUN_00453bfa ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_00453c0d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00453c40 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, 0);
  FUN_005c8b00(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_00453c80 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, 1);
  FUN_005c8b00(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_00453cc0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00453d0d;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00453d40 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */  /* CDialog::SetHelpID(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function SetHelpID (this, param_1)

 {
  w32((this + 0x3c), 0, param_1);
  return;
}


 export function FUN_00453da0 (param_1)

 {
  let cVar1;
  let iVar2;
  let local_10;
  let local_8;

  local_8 = 0;
  cVar1 = _MEM[DAT_0064ba28 + param_1];
  if ((s8(cVar1) < 0)) {
    local_8 = 0;
  }
  else {
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      iVar2 = FUN_004bd9f0(local_10, s8(cVar1));
      if ((iVar2 !== 0)) {
        local_8 = 1;
      }
    }
  }
  return local_8;
}


 export function FUN_00453e18 (param_1)

 {
  let iVar1;

  iVar1 = FUN_00453da0(param_1);
  if ((iVar1 === 0)) {
    iVar1 = ((s16((DAT_00655be6 + param_1 * 2), 0)) << 16 >> 16);
  }
  else {
    iVar1 = -1;
  }
  return iVar1;
}


 export function FUN_00453e51 (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  if (((DAT_0064bc60 & 1) !== 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = FUN_00453e18(param_2);
    if ((iVar2 < 0)) {
      uVar1 = 0;
    }
    else if ((_MEM[DAT_0064f348 + iVar2 * 0x58] === param_1)) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_00453edf (param_1)

 {
  let iVar1;

  iVar1 = FUN_00453e18(param_1);
  if ((iVar1 < 0)) {
    iVar1 = -1;
  }
  else {
    iVar1 = s8(_MEM[DAT_0064f348 + iVar1 * 0x58]);
  }
  return iVar1;
}


 export function FUN_00453f90 ()

 {
  let local_414;
  let local_410;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 1;
  _sprintf(DAT_fffffbf0, s_Software\%s\%s_006269a4, s_MicroProse_Software_00626964, s_Civilization_II_Multiplayer_Gold_00626978);
  local_c = FUN_00454103(DAT_fffffbf0, s_DefaultLanguage_006269b4, DAT_fffffff0, DAT_fffffbec);
  if ((local_10 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = s32(local_c, 0);
  }
  if ((local_8 === 0)) {
    local_8 = 1;
  }
  _sprintf(DAT_fffffbf0, s_Software\%s\%s_006269c4, s_MicroProse_Software_00626964, s_Civilization_II_Multiplayer_Gold_00626978);
  FUN_0045406c(DAT_fffffbf0, s_DefaultLanguage_006269d4, DAT_fffffff8, 4, 4);
  wv(DAT_00626960, local_8);
  return;
}


 export function FUN_0045406c (param_1, param_2, param_3, param_4, param_5)

 {
  let LVar1;
  let bVar2;
  let local_10;
  let local_c;
  let local_8;

  LVar1 = FUN_006e78ec(-0x7ffffffe, param_1, 0, DAT_006269e4, 0, 0x20006, 0, DAT_fffffff0, DAT_fffffff4);
  if ((LVar1 === 0)) {
    local_8 = FUN_006e78f8(local_10, param_2, 0, param_5, param_3, param_4);
    FUN_006e78f0(local_10);
    bVar2 = (local_8 === 0);
  }
  else {
    FUN_006e78f0(local_10);
    bVar2 = 0;
  }
  return bVar2;
}


 export function FUN_00454103 (param_1, param_2, param_3, param_4)

 {
  let LVar1;
  let puVar2;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0x800;
  _memset(DAT_0064a730, 0, 0x800);
  w32(param_3, 0, 0);
  w32(param_4, 0, 0);
  LVar1 = FUN_006e78f4(-0x7ffffffe, param_1, 0, 0x20019, DAT_fffffff4);
  if ((LVar1 === 0)) {
    LVar1 = FUN_006e78e8(local_c, param_2, 0, DAT_fffffff8, DAT_0064a730, DAT_fffffff0);
    if ((LVar1 === 0)) {
      w32(param_4, 0, local_8);
      w32(param_3, 0, local_10);
      FUN_006e78f0(local_c);
      puVar2 = DAT_0064a730;
    }
    else {
      FUN_006e78f0(local_c);
      puVar2 = 0;
    }
  }
  else {
    FUN_006e78f0(local_c);
    puVar2 = 0;
  }
  return puVar2;
}


 export function FUN_00454260 (param_1)

 {
  let pvVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_1c;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045432c;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  pvVar1 = operator_new(0x1cb4);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_1c = 0;
  }
  else {
    local_1c = FUN_00454354();
  }
  local_8 = -1;
  if ((local_1c !== 0)) {
    iVar2 = FUN_004548a9(param_1);
    if ((iVar2 !== 0)) {
      FUN_00454eb2();
    }
    if ((local_1c !== 0)) {
      FUN_00456e90(1);
    }
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00454344 ()

 {
  return;
}


 export function FUN_00454354 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00454680;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_0044c5a0();
  local_8 = 1;
  FUN_005bd630();
  local_8 = 2;
  FUN_005c64da();
  local_8 = 3;
  FUN_005bd630();
  local_8 = 4;
  FUN_005bd630();
  local_8 = 5;
  FUN_004502b0();
  local_8 = 6;
  `eh_vector_constructor_iterator'((in_ECX + 0x6dc), 0x3c, 0x3c, CString, FUN_005cde4d)
  ;
  local_8 = 7;
  `eh_vector_constructor_iterator'((in_ECX + 0x15dc), 0x3c, 4, CString, FUN_005cde4d);
  local_8 = 8;
  `eh_vector_constructor_iterator'((in_ECX + 0x16cc), 0x3c, 4, CString, FUN_005cde4d);
  local_8 = 9;
  `eh_vector_constructor_iterator'((in_ECX + 0x17bc), 0x3c, 4, CString, FUN_005cde4d);
  local_8 = 0xa;
  `eh_vector_constructor_iterator'((in_ECX + 0x18ac), 0x3c, 4, CString, FUN_005cde4d);
  local_8 = 0xb;
  FUN_005bd630();
  local_8 = 0xc;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 0xd);
  FUN_005bcaa7(DAT_0064b0d0);
  wv(DAT_00626a00, ((0x500 - DAT_0064b0d8) / 2 | 0));
  FUN_005dcb8c(DAT_0061cce0, (in_ECX + 0x19f8), 0x174);
  FUN_005dcb8c(DAT_0061ce58, (in_ECX + 0x1b6c), 0x120);
  wv(DAT_00626a04, in_ECX);
  for (/* cond: (local_14 < 0x3c) */); local_14 = (local_14 < 0x3c); local_14 = (local_14 + 1)) {
    w32(((in_ECX + 0x14ec) + local_14 * 4), 0, 0);
  }
  FUN_0043c6c0(0, 0x24, 1);
  FUN_006e7d90((in_ECX + 0x1c98), 0, 0, DAT_0064b0d8, 0x28);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00454699 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00454891;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 0xd;
  wv(DAT_00626a04, 0);
  FUN_00450340();
  local_8 = 0xc;
  FUN_00454798();
  local_8 = 0xb;
  FUN_004547a7();
  local_8 = 0xa;
  FUN_004547b6();
  local_8 = 9;
  FUN_004547ce();
  local_8 = 8;
  FUN_004547e6();
  local_8 = 7;
  FUN_004547fe();
  local_8 = 6;
  FUN_00454816();
  local_8 = 5;
  FUN_0045482e();
  local_8 = 4;
  FUN_0045483d();
  local_8 = 3;
  FUN_0045484c();
  local_8 = 2;
  FUN_0045485b();
  local_8 = 1;
  FUN_0045486a();
  local_8 = (0 << 8);
  FUN_00454879();
  local_8 = -1;
  FUN_00454888();
  FUN_0045489b();
  return;
}


 export function FUN_00454798 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004547a7 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004547b6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x18ac), 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_004547ce (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x17bc), 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_004547e6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x16cc), 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_004547fe (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x15dc), 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_00454816 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x6dc), 0x3c, 0x3c, FUN_005cde4d);
  return;
}


 export function FUN_0045482e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0045483d ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0045484c ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0045485b ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0045486a ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00454879 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_00454888 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_0045489b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004548a9 (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_e4;
  let local_9c;
  let local_98;
  let local_94;
  let local_90;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00454e97;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  w32((in_ECX + 0x1c90), 0, param_1);
  FUN_004aef20(DAT_ffffff70);
  FUN_0043c840(DAT_ffffff70, s_cv.dll_00626a08);
  iVar1 = FUN_00564713(DAT_ffffff70);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  FUN_004502e0(DAT_ffffff70);
  FUN_00454f83();
  uVar2 = FUN_00568861(s8(_MEM[DAT_0064f348 + param_1 * 0x58]));
  w32((in_ECX + 0x1c94), 0, uVar2);
  if ((DAT_0064b0d8 < 0x500)) {
    FUN_005bd65c(DAT_0064b0d8, 0x1e0);
  }
  else {
    FUN_005bd65c(0x500, 0x1e0);
  }
  iVar1 = FUN_005bf5e1(0x12c, 0xa, 0xec, (in_ECX + 0x214));
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  iVar1 = FUN_005bf5e1(0x131, 0xa, 0xec, (in_ECX + 0x214));
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  iVar1 = FUN_005bf5e1(0x136, 0xa, 0xec, (in_ECX + 0x214));
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  local_94 = 1;
  local_9c = 1;
  for (/* cond: (local_98 < 4) */); local_98 = (local_98 < 4); local_98 = (local_98 + 1)) {
    FUN_005cedad(DAT_ffffff1c, 9, local_94, local_9c, 0x9e, 0x72);
    FUN_005cf467(7, 9);
    local_94 = (local_94 + 0x9f);
  }
  local_94 = 1;
  local_9c = 0x74;
  iVar1 = FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]));
  if ((1 < iVar1)) {
    local_9c = (local_9c + 0x73);
  }
  for (/* cond: (local_98 < 4) */); local_98 = (local_98 < 4); local_98 = (local_98 + 1)) {
    FUN_005cedad(DAT_ffffff1c, 9, local_94, local_9c, 0x9e, 0x72);
    FUN_005cf467(7, 9);
    local_94 = (local_94 + 0x9f);
  }
  local_94 = 1;
  local_9c = 0x15a;
  for (/* cond: (local_98 < 4) */); local_98 = (local_98 < 4); local_98 = (local_98 + 1)) {
    FUN_005cedad(DAT_ffffff1c, 9, local_94, local_9c, 0x7b, 0x52);
    FUN_005cf467(7, 9);
    local_94 = (local_94 + 0x7c);
  }
  local_94 = 1;
  local_9c = 0x1ad;
  iVar1 = FUN_00448f92(s8(_MEM[DAT_0064f348 + param_1 * 0x58]));
  if ((1 < iVar1)) {
    local_9c = (local_9c + 0x53);
  }
  for (/* cond: (local_98 < 4) */); local_98 = (local_98 < 4); local_98 = (local_98 + 1)) {
    FUN_005cedad(DAT_ffffff1c, 9, local_94, local_9c, 0x7b, 0x52);
    FUN_005cf467(7, 9);
    local_94 = (local_94 + 0x7c);
  }
  iVar1 = FUN_0045512b();
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  iVar1 = FUN_00455183();
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  iVar1 = FUN_00455314();
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00454e8b();
    FUN_00454ea1(unaff_ESI);
    return;
  }
  FUN_00455add();
  local_8 = -1;
  FUN_00454e8b();
  FUN_00454ea1(unaff_ESI);
  return;
}


 export function FUN_00454e8b ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00454ea1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00454eb2 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0x214));
  FUN_004085f0();
  FUN_00419b80();
  FUN_00414ce0();
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x100);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x100);
  FUN_00414d40();
  FUN_004503d0();
  FUN_00419b80();
  FUN_00450390(DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
  return;
}


 export function FUN_00454f83 (in_ECX)

 {
  let cVar1;
  let sVar2;
  let sVar3;
  let uVar4;
  let iVar5;
  let pbVar6;
  // in_ECX promoted to parameter;
  let local_8;

  sVar2 = s16((DAT_0064f340 + s32((in_ECX + 0x1c90), 0) * 0x58), 0);
  sVar3 = s16((DAT_0064f342 + s32((in_ECX + 0x1c90), 0) * 0x58), 0);
  if (((_MEM[DAT_0064f344 + s32((in_ECX + 0x1c90), 0) * 0x58] & 0x80) === 0)) {
    for (/* cond: (local_8 < 9) */); local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
      uVar4 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + ((sVar2) << 16 >> 16)));
      cVar1 = _MEM[DAT_00628360 + local_8];
      iVar5 = FUN_004087c0(uVar4, (s8(cVar1) + ((sVar3) << 16 >> 16)));
      if (((_MEM[pbVar6] & 0x80) !== 0)) {
        w32((in_ECX + 0x19e8), 0, 0x39);
        w32((in_ECX + 0x19e4), 0, 1);
        w32((in_ECX + 0x19ec), 0, 0x18);
        w32((in_ECX + 0x19f0), 0, 0x1b);
        return;
      }
    }
    w32((in_ECX + 0x19e8), 0, 0x3c);
    w32((in_ECX + 0x19e4), 0, 2);
    w32((in_ECX + 0x19ec), 0, 0x18);
    w32((in_ECX + 0x19f0), 0, 0x1f);
  }
  else {
    w32((in_ECX + 0x19e8), 0, 0x3c);
    w32((in_ECX + 0x19e4), 0, 0);
    w32((in_ECX + 0x19ec), 0, 0x18);
    w32((in_ECX + 0x19f0), 0, 0x1b);
  }
  return;
}


 export function FUN_0045512b ()

 {
  let iVar1;

  FUN_005bd65c(0x20, 0x20);
  iVar1 = FUN_005bf5e1(0x18f, 0xa, 0x20, DAT_006a8c00);
  return (iVar1 !== 0);
}


 export function FUN_00455183 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_8;

  FUN_005c5fc4(DAT_00626a10, 0x800, DAT_0064b0d0, DAT_0064b0d4, (DAT_0064b0d8 - DAT_0064b0d0), ((DAT_0064b0dc - DAT_0064b0d4) + 5), DAT_006a8c00, DAT_006553d8);
  FUN_00419ba0(0);
  FUN_005bb4ae(DAT_00626a14, 0x800, 0, ((DAT_0064b0dc + -0x1e0) >> 1), (DAT_0064b0d8 - DAT_0064b0d0), 0x1e0, (in_ECX + 0x214), in_ECX);
  iVar1 = FUN_0043d20a(s32((in_ECX + 0x1c90), 0), 0x19);
  if ((iVar1 === 0)) {
    local_8 = FUN_00568861(s8(_MEM[DAT_0064f348 + s32((in_ECX + 0x1c90), 0) * 0x58]));
  }
  else {
    local_8 = 3;
  }
  iVar1 = FUN_005bf5e1(((s32((in_ECX + 0x19e4), 0) * 5 + local_8) + 0x154), 0xa, 0xec, (in_ECX + 0x214));
  if ((iVar1 !== 0)) {
    in_ECX = (in_ECX + 0x110);
    FUN_00408130(LAB_00402a77);
    in_ECX = (in_ECX + 0x110);
    FUN_00414be0(LAB_00403189);
    FUN_0045606c();
  }
  return (iVar1 !== 0);
}


 export function FUN_00455314 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  w32((in_ECX + 0x19f4), 0, (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x1c90), 0) * 0x58]) + 2));
  FUN_0059a6f0(((((s16((DAT_0064f340 + s32((in_ECX + 0x1c90), 0) * 0x58), 0)) << 16 >> 16) * 0x100 + ((s16((DAT_0064f342 + s32((in_ECX + 0x1c90), 0) * 0x58), 0)) << 16 >> 16)) + ((DAT_006d1168) & 0xFFFF)));
  for (/* cond: (local_8 < 0x23) */); local_8 = (local_8 < 0x23); local_8 = (local_8 + 1)) {
    w32((in_ECX + 0x1c8c), 0, 0);
    iVar1 = s32((in_ECX + 0x19e4), 0);
    if ((iVar1 === 0)) {
      /* switch */ () {
      case 8 :
        w32((in_ECX + 0x1c8c), 0, 1);
        local_c = 0x35;
        break;
      default :
        local_c = FUN_00455c5d();
 joined_r0x00455451: :
        if ((local_c === -1));
        break;
      case 0x1e :
        w32((in_ECX + 0x1c8c), 0, 1);
        local_c = 0x36;
        break;
      case 0x1f :
        w32((in_ECX + 0x1c8c), 0, 1);
        local_c = 0x39;
        break;
      case 0x22 :
        w32((in_ECX + 0x1c8c), 0, 1);
        local_c = 0x37;
      }
 LAB_00455628: :
      iVar1 = FUN_0043d20a(s32((in_ECX + 0x1c90), 0), local_8);
      if ((iVar1 === 0)) {
        if ((s32((in_ECX + 0x19f4), 0) === 0)) {
          FUN_00456005(local_c);
        }
        else {
          FUN_00455f2e(local_c);
        }
      }
      else {
        FUN_00455d38(local_c, local_8);
        FUN_0059a791(0, 0);
      }
    }
    else {
      if ((iVar1 !== 1)) {
        if ((iVar1 === 2)) {
          /* switch */ () {
          case 8 :
            w32((in_ECX + 0x1c8c), 0, 1);
            local_c = 0x34;
            break;
          default :
            local_c = FUN_00455c5d();
            goto joined_r0x00455451;
          case 0x1c :
          case 0x1e :
          case 0x1f :
          case 0x22 :
            goto LAB_0045539c;
          }
        }
        goto LAB_00455628;
      }
      /* switch */ () {
      case 8 :
        w32((in_ECX + 0x1c8c), 0, 1);
        local_c = 0x35;
        goto LAB_00455628;
      default :
        local_c = FUN_00455c5d();
        if ((local_c !== -1)) {
    if ((s32((in_ECX + 0x19f4), 0) === 0)) {
      FUN_00456005(iVar1);
    }
    else {
      FUN_00455f2e(iVar1);
    }
  }
  w32((in_ECX + 0x19f4), 0, (s8(_MEM[DAT_0064f349 + s32((in_ECX + 0x1c90), 0) * 0x58]) + 2));
  local_8 = 0;
  local_c = -1;
  do {
    if ((0x1b < local_8)) {
      while ((iVar1 !== -1)) {
        if ((s32((in_ECX + 0x19f4), 0) === 0)) {
          FUN_00455f9e(iVar1);
        }
        else {
          FUN_00455ebe(iVar1);
        }
      }
      FUN_004083f0();
      FUN_004083f0();
      return 1;
    }
    w32((in_ECX + 0x1c8c), 0, 0);
    iVar1 = s32((in_ECX + 0x19e4), 0);
    if ((iVar1 !== 0)) {
      if ((iVar1 === 1)) {
        /* switch */ () {
        case 2 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 0x36;
          break;
        case 3 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 4;
          break;
        default :
          local_c = FUN_00455b8e();
          goto joined_r0x004557ba;
        case 6 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 1;
          break;
        case 0x13 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 0x37;
        }
      }
      else if ((iVar1 === 2)) {
        /* switch */ () {
        case 2 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 0x36;
          break;
        case 3 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 3;
          break;
        default :
          local_c = FUN_00455b8e();
          if ((local_c === -1));
          local_c = 0;
          break;
        case 0x13 :
          w32((in_ECX + 0x1c8c), 0, 1);
          local_c = 0x39;
        }
      }
      goto LAB_004559fe;
    }
    /* switch */ () {
    case 2 :
      w32((in_ECX + 0x1c8c), 0, 1);
      local_c = 0x3a;
      break;
    case 3 :
      w32((in_ECX + 0x1c8c), 0, 1);
      local_c = 0x3b;
      break;
    default :
      local_c = FUN_00455b8e();
 joined_r0x004557ba: :
      if ((local_c !== -1));
      local_c = 1;
      break;
    case 0x13 :
      w32((in_ECX + 0x1c8c), 0, 1);
      local_c = 0x38;
    }
 LAB_004559fe: :
    if ((((s16((DAT_00655be6 + local_8 * 2), 0)) << 16 >> 16) === s32((in_ECX + 0x1c90), 0))) {
      FUN_00455dfd(local_c, local_8);
      FUN_0059a791(0, 0);
    }
    else if ((s32((in_ECX + 0x19f4), 0) === 0)) {
      FUN_00455f9e(local_c);
    }
    else {
      FUN_00455ebe(local_c);
    }
 LAB_00455711: :
    local_8 = (local_8 + 1);
  } ( true );
}


 export function FUN_00455add (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  for (/* cond: (local_8 < s32((in_ECX + 0x19e8), 0)) */); local_8 = (local_8 < s32((in_ECX + 0x19e8), 0)); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 0x14ec) + local_8 * 4), 0) !== 0)) {
      FUN_005cef31(DAT_ffffffe8, (in_ECX + 0x1cc), s32((DAT_0061c740 + (local_8 * 8 + s32((in_ECX + 0x19e4), 0) * 0x1e0)), 0), s32((DAT_0061c744 + (local_8 * 8 + s32((in_ECX + 0x19e4), 0) * 0x1e0)), 0))
      ;
    }
  }
  FUN_0045606c();
  return;
}


 export function FUN_00455b8e (in_ECX)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x19ec), 0) === 0)) {
    uVar1 = -1;
  }
  else {
    iVar2 = (s32((in_ECX + 0x19ec), 0) * 3 + -3);
    iVar2 = FUN_0059a791(((iVar2 + ((iVar2 >> 0x1f) & 3)) >> 2), (s32((in_ECX + 0x19ec), 0) + -1));
    uVar1 = s32((((s32((in_ECX + 0x19e4), 0) * 0x60 + iVar2 * 4) + 0x1b6c) + in_ECX), 0);
    w32((in_ECX + 0x19ec), 0, (s32((in_ECX + 0x19ec), 0) + -1));
    w32((((s32((in_ECX + 0x19e4), 0) * 0x60 + iVar2 * 4) + 0x1b6c) + in_ECX), 0, s32((((s32((in_ECX + 0x19e4), 0) * 0x60 + s32((in_ECX + 0x19ec), 0) * 4) + 0x1b6c) + in_ECX), 0));
  }
  return uVar1;
}


 export function FUN_00455c5d (in_ECX)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x19f0), 0) === 0)) {
    uVar1 = -1;
  }
  else {
    iVar2 = (s32((in_ECX + 0x19f0), 0) * 3 + -3);
    iVar2 = FUN_0059a791(((iVar2 + ((iVar2 >> 0x1f) & 3)) >> 2), (s32((in_ECX + 0x19f0), 0) + -1));
    uVar1 = s32((((iVar2 * 4 + s32((in_ECX + 0x19e4), 0) * 0x7c) + 0x19f8) + in_ECX), 0);
    w32((in_ECX + 0x19f0), 0, (s32((in_ECX + 0x19f0), 0) + -1));
    w32((((iVar2 * 4 + s32((in_ECX + 0x19e4), 0) * 0x7c) + 0x19f8) + in_ECX), 0, s32((((s32((in_ECX + 0x19e4), 0) * 0x7c + s32((in_ECX + 0x19f0), 0) * 4) + 0x19f8) + in_ECX), 0));
  }
  return uVar1;
}


 export function FUN_00455d38 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((-1 < param_1)) {
    FUN_005cedad((in_ECX + 0x648), 9, s32((DAT_0061c360 + (param_2 + -1) * 0x10), 0), s32((DAT_0061c364 + (param_2 + -1) * 0x10), 0), s32((DAT_0061c368 + (param_2 + -1) * 0x10), 0), s32((DAT_0061c36c + (param_2 + -1) * 0x10), 0));
    FUN_005cf467(7, 9);
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((param_1 * 0x3c + in_ECX) + 0x6dc));
  }
  return;
}


 export function FUN_00455dfd (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((-1 < param_1)) {
    FUN_005cedad((in_ECX + 0x690), 9, s32((DAT_0061c580 + param_2 * 0x10), 0), s32((DAT_0061c584 + param_2 * 0x10), 0), s32((DAT_0061c588 + param_2 * 0x10), 0), s32((DAT_0061c58c + param_2 * 0x10), 0));
    FUN_005cf467(7, 9);
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((param_1 * 0x3c + in_ECX) + 0x6dc));
  }
  return;
}


 export function FUN_00455ebe (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0059a791(0, 3);
  if ((param_1 !== -1)) {
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((iVar1 * 0x3c + in_ECX) + 0x18ac));
  }
  return;
}


 export function FUN_00455f2e (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0059a791(0, 3);
  if ((param_1 !== -1)) {
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((iVar1 * 0x3c + in_ECX) + 0x16cc));
  }
  return;
}


 export function FUN_00455f9e (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0059a791(0, 3);
  if ((param_1 !== -1)) {
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((iVar1 * 0x3c + in_ECX) + 0x17bc));
  }
  return;
}


 export function FUN_00456005 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0059a791(0, 3);
  if ((param_1 !== -1)) {
    w32(((in_ECX + 0x14ec) + param_1 * 4), 0, ((iVar1 * 0x3c + in_ECX) + 0x15dc));
  }
  return;
}


 export function FUN_0045606c (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_006e7d90(DAT_ffffffdc, 0, 0, DAT_0064b0d8, 0x1e0);
  FUN_006e7d90(DAT_ffffffec, DAT_00626a00, 0, (DAT_0064b0d8 + DAT_00626a00), 0x1e0);
  FUN_005c0593((in_ECX + 0xb8), DAT_ffffffec, DAT_ffffffdc);
  FUN_004560f8();
  FUN_005bb574();
  FUN_00419b80();
  return;
}


 export function FUN_004560f8 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0040bbb0();
  FUN_0040bbe0((DAT_0064f360 + s32((in_ECX + 0x1c90), 0) * 0x58));
  FUN_0040fe40();
  FUN_0040fe10();
  FUN_00421f10(((DAT_00655afa) << 16 >> 16));
  FUN_005c19ad(0xa);
  FUN_006e7da4((in_ECX + 0x1c98), 1, 1);
  FUN_005c1020((in_ECX + 0x1ca8), DAT_00679640, (in_ECX + 0x1c98), 0);
  FUN_005c19ad(0x1a);
  FUN_006e7da4((in_ECX + 0x1c98), -1, -1);
  FUN_005c1020((in_ECX + 0x1ca8), DAT_00679640, (in_ECX + 0x1c98), 0);
  return;
}


 export function FUN_004561d9 (param_1)

 {
  if (((DAT_0064b0d8 * 7 >> 3) < param_1)) {
    FUN_0045638b();
  }
  if ((param_1 < (DAT_0064b0d8 >> 3))) {
    FUN_004564a8();
  }
  return;
}


 export function FUN_00456228 (param_1)

 {
  if ((param_1 === 0xd2)) {
    wv(DAT_00626a04, InvalidateObjectCache(DAT_00626a04));
  }
  return;
}


 export function FUN_0045626d ()

 {
  if ((DAT_00626a04 !== 0)) {
    wv(DAT_00626a04, (DAT_00626a04 + 0x100));
  }
  return;
}


 export function FUN_0045629b (param_1)

 {
  /* switch */ () {
  case 0xa4 :
  case 0xc2 :
    if ((DAT_0064b0d8 < 0x500)) {
      FUN_004564a8();
    }
    break;
  case 0xa6 :
  case 0xc3 :
    if ((DAT_0064b0d8 < 0x500)) {
      FUN_0045638b();
    }
    break;
  case 0xd0 :
  case 0xd1 :
  case 0xd2 :
    if ((DAT_00626a04 !== 0)) {
      wv(DAT_00626a04, (DAT_00626a04 + 0x100));
    }
  }
  return;
}


 export function FUN_0045638b (in_ECX)

 {
  let SVar1;
  // in_ECX promoted to parameter;
  let local_30;
  let local_28;
  let local_18;
  let local_8;

  local_8 = 4;
  FUN_006e7d90(DAT_ffffffd8, 0, 0, DAT_0064b0d8, 0x1e0);
  FUN_006e7d90(DAT_ffffffe8, DAT_00626a00, 0, (DAT_0064b0d8 + DAT_00626a00), 0x1e0);
  FUN_006e7d54(DAT_ffffffd0);
  while ((UNNAMED <= (DAT_0064b0d8 * 7 >> 3))) {
    if (((0x500 - DAT_0064b0d8) < DAT_00626a00)) {
      return;
    }
    SVar1 = FUN_006e7d64(0x66);
    if ((UNNAMED <= (DAT_0064b0d8 * 7 >> 3)));
    FUN_004560f8();
    FUN_00408460();
    wv(DAT_00626a00, (DAT_00626a00 + local_8));
    FUN_006e7da4(DAT_ffffffe8, local_8, 0);
    FUN_006e7d54(DAT_ffffffd0);
  }
  return;
}


 export function FUN_004564a8 (in_ECX)

 {
  let SVar1;
  // in_ECX promoted to parameter;
  let local_30;
  let local_28;
  let local_18;
  let local_8;

  local_8 = 4;
  FUN_006e7d90(DAT_ffffffd8, 0, 0, DAT_0064b0d8, 0x1e0);
  FUN_006e7d90(DAT_ffffffe8, DAT_00626a00, 0, (DAT_0064b0d8 + DAT_00626a00), 0x1e0);
  FUN_006e7d54(DAT_ffffffd0);
  while (((DAT_0064b0d8 >> 3) <= UNNAMED)) {
    if ((DAT_00626a00 < 0)) {
      return;
    }
    SVar1 = FUN_006e7d64(0x64);
    if (((DAT_0064b0d8 >> 3) <= UNNAMED));
    FUN_004560f8();
    FUN_00408460();
    wv(DAT_00626a00, (DAT_00626a00 - local_8));
    FUN_006e7da4(DAT_ffffffe8, (-local_8), 0);
    FUN_006e7d54(DAT_ffffffd0);
  }
  return;
}


 export function FUN_00456e90 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00454699();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* class */  /* ostream */  /* * */  /* __thiscall */  /* ios::tie(class */  /* ostream */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function tie (this, param_1)

 {
  let poVar1;

  poVar1 = s32((this + 0x20), 0);
  w32((this + 0x20), 0, param_1);
  return poVar1;
}


 export function FUN_00456f20 (param_1, param_2, param_3)

 {
  let iVar1;

  iVar1 = FUN_00467904(param_1, param_2);
  FUN_00467933(param_1, param_2, (param_3 + iVar1));
  if ((param_2 === DAT_0064b120)) {
    wv(DAT_0064b114, (DAT_0064b114 + param_3));
  }
  FUN_00467904(param_1, param_2);
  return;
}


 export function FUN_00456f8b (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = 2;
  if ((DAT_0064b114 < 0x19)) {
    local_8 = 3;
  }
  if ((0x3c < DAT_0064b114)) {
    local_8 = (local_8 + -1);
  }
  iVar1 = FUN_00453e51(param_1, 0x14);
  if ((iVar1 !== 0)) {
    local_8 = (local_8 + 1);
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) !== 0)) {
    local_8 = (local_8 + 1);
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
    local_8 = (local_8 + 2);
  }
  if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
    local_8 = 2;
  }
  return local_8;
}


 export function FUN_0045705e (param_1, param_2)

 {
  let cVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;

  wv(DAT_0064b130, FUN_00598d45(param_2));
  local_c = 0;
  for (/* cond: (local_1c < 8) */); local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
    if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + local_1c * 4)] & 0x20) !== 0)) {
      local_c = (local_c + 1);
    }
    if ((3 < DAT_00655b08)) {
      wv(DAT_0064b130, 1);
    }
  }
  wv(DAT_0064b12c, u8((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])));
  wv(DAT_0064b128, 0);
  if ((DAT_00626a1c === 0)) {
    wv(DAT_0064b108, ((s16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0)) << 16 >> 16));
  }
  wv(DAT_0064b0ec, 0);
  wv(DAT_0064b118, 0);
  wv(DAT_0064b0f8, 0);
  wv(DAT_0064b148, 1);
  for (/* cond: (local_14 < 0x40) */); local_14 = (local_14 < 0x40); local_14 = (local_14 + 1)) {
    if ((s16((DAT_0064c832 + (local_14 * 2 + param_2 * 0x594)), 0) < s16((DAT_0064c8b2 + (local_14 * 2 + param_1 * 0x594)), 0))) {
      wv(DAT_0064b0ec, (DAT_0064b0ec + (((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) * (((-u8((DAT_00655b08 === 0))) & 2) + 2) / (((s16((DAT_0064c832 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) + 1) | 0)));
    }
    else {
      if ((s16((DAT_0064c832 + (local_14 * 2 + param_1 * 0x594)), 0) !== 0)) {
        wv(DAT_0064b0f8, 1);
      }
      if ((_MEM[DAT_0064c932 + (param_1 * 0x594 + local_14)] === 0)) {
        if ((_MEM[DAT_0064c932 + (param_2 * 0x594 + local_14)] === 0)) {
          wv(DAT_0064b118, (DAT_0064b118 + (((((s16((DAT_0064c8b2 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) - ((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_14 * 2)), 0)) & 0xFFFF)) + (((((s16((DAT_0064c8b2 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) - ((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_14 * 2)), 0)) & 0xFFFF)) >> 0x1f) & 3)) >> 2)));
        }
        else {
          wv(DAT_0064b118, (DAT_0064b118 + ((((s16((DAT_0064c832 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) - ((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_14 * 2)), 0)) & 0xFFFF)) / 2 | 0)))
          ;
        }
      }
      else {
        if ((6 < _MEM[DAT_00655c22 + param_2])) {
          uVar5 = ((s16((DAT_0064c8b2 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF);
        }
        else {
          uVar5 = (((s16((DAT_0064c8b2 + (param_2 * 0x594 + local_14 * 2)), 0)) & 0xFFFF) - ((s16((DAT_0064c8b2 + (param_1 * 0x594 + local_14 * 2)), 0)) & 0xFFFF));
        }
        wv(DAT_0064b118, (DAT_0064b118 + uVar5));
      }
    }
  }
  iVar4 = FUN_00453e51(param_2, 9);
  if ((iVar4 !== 0)) {
    wv(DAT_0064b118, (DAT_0064b118 + ((DAT_0064b118 + ((DAT_0064b118 >> 0x1f) & 3)) >> 2)));
  }
  wv(DAT_0064b11c, 0);
  if ((0xc8 < DAT_00655af8)) {
    wv(DAT_0064b11c, 1);
  }
  wv(DAT_0064b114, u8(_MEM[DAT_0064c6e0 + (param_2 * 0x594 + param_1)]));
  if ((_MEM[DAT_0064c7a5 + param_1 * 0x594] === 0)) {
    wv(DAT_0064b118, FUN_005adfa0(DAT_0064b118, u8(_MEM[DAT_00655c22 + param_2]) * 2, 0x270f));
    if ((DAT_0064b0f8 === 0)) {
      wv(DAT_0064b118, FUN_005adfa0(FUN_005adfa0(DAT_0064b118, u8(_MEM[DAT_00655c22 + param_2]) * 2, 0x270f), 0, ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x32 | 0) / (8 - u8(_MEM[DAT_00655c22 + param_2])) | 0)));
    }
    wv(DAT_0064b0f8, 1);
    wv(DAT_0064b0ec, 0);
    if ((DAT_0064b114 < 0x4c)) {
      wv(DAT_0064b114, 0x4b);
    }
  }
  if ((DAT_0064b12c !== 0)) {
    wv(DAT_0064b0f8, 1);
  }
  if ((_MEM[DAT_0064c7a5 + param_1 * 0x594] === 0)) {
    wv(DAT_0064b0f8, 1);
    wv(DAT_0064b118, FUN_005adfa0(DAT_0064b118, 0x64, 0x270f));
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
    if ((_MEM[DAT_0064c7a5 + param_2 * 0x594] === 0)) {
      wv(DAT_0064b0ec, ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) >> 1) + 1));
      if ((((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) >> 1) + 1) < 5)) {
        wv(DAT_0064b0ec, 4);
      }
    }
    else {
      wv(DAT_0064b118, (u8(_MEM[DAT_0064c7a5 + param_2 * 0x594]) * (DAT_0064b118 / 2 | 0) / u8(_MEM[DAT_0064c7a5 + param_1 * 0x594]) | 0));
    }
  }
  wv(DAT_0064b0ec, (DAT_0064b0ec / (((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - 1) / 2 | 0) + 1) | 0));
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
    wv(DAT_0064b114, (DAT_0064b114 - 0x19));
  }
  if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
    wv(DAT_0064b114, (DAT_0064b114 + 0x19));
  }
  if ((_MEM[DAT_0064c6be + param_1 * 0x594] !== 0)) {
    wv(DAT_0064b114, (DAT_0064b114 + ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - 1) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) * 5));
  }
  if ((DAT_0064b114 < 0x1a)) {
    wv(DAT_0064b118, (DAT_0064b118 / 2 | 0));
    wv(DAT_0064b0f8, 0);
  }
  else {
    iVar4 = FUN_004679ab(DAT_0064b114);
    if ((iVar4 < 4)) {
      wv(DAT_0064b118, (DAT_0064b118 * 2 / 3 | 0));
    }
    else if ((0x4a < DAT_0064b114)) {
      wv(DAT_0064b118, (DAT_0064b118 * 3 / 2 | 0));
      wv(DAT_0064b0f8, 1);
    }
  }
  if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
    wv(DAT_0064b0f8, 1);
  }
  if ((_MEM[DAT_0064c6b3 + param_2 * 0x594] === 0)) {
    wv(DAT_0064b0f8, 1);
  }
  if ((DAT_0064b0ec !== 0)) {
    wv(DAT_0064b0f8, 0);
    wv(DAT_0064b148, 0);
  }
  iVar4 = FUN_00453e51(param_1, 6);
  if ((iVar4 !== 0)) {
    wv(DAT_0064b11c, 0);
    wv(DAT_0064b128, DAT_0064b0f8);
    wv(DAT_0064b0f8, 0);
    wv(DAT_0064b114, (DAT_0064b114 - 0xa));
    FUN_00467750(param_2, param_1, 0x10000);
  }
  if ((_MEM[DAT_0064c6be + param_1 * 0x594] !== 0)) {
    wv(DAT_0064b118, (DAT_0064b118 + (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) * DAT_0064b118 / 2 | 0)));
  }
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) === 0)) {
    if (((_MEM[DAT_0064c6c2 + (param_1 * 4 + param_2 * 0x594)] & 1) !== 0)) {
      wv(DAT_0064b118, ((DAT_0064b118 + ((DAT_0064b118 >> 0x1f) & 3)) >> 2));
    }
  }
  else {
    wv(DAT_0064b118, (DAT_0064b118 << 1));
  }
  wv(DAT_0064b134, 0);
  local_18 = 0;
  do {
    if ((((DAT_00655b18) << 16 >> 16) <= local_18)) {
 LAB_00457d0d: :
      iVar4 = (u8(DAT_00655b08) + 1) * DAT_0064b118;
      iVar4 = FUN_005adfa0(((iVar4 + ((iVar4 >> 0x1f) & 0x1f)) >> 5), 0, 0x14);
      wv(DAT_0064b118, iVar4 * 0x32);
      if ((0x31 < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
        wv(DAT_0064b118, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x32 | 0) * 0x32);
      }
      if ((((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) * 3 < ((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF))) {
        wv(DAT_0064b0f8, 0);
      }
      if ((9 < _MEM[DAT_0064c6f0 + (param_2 * 0x594 + param_1)])) {
        _MEM[DAT_0064c6f0 + (param_2 * 0x594 + param_1)] = 0;
        wv(DAT_0064b0f8, 0);
      }
      if ((DAT_0064b0f8 === 0)) {
        if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
          wv(DAT_0064b148, 0);
        }
      }
      else {
        wv(DAT_0064b148, 2);
      }
      wv(DAT_0064b13c, DAT_0064b0f8);
      wv(DAT_0064b140, 0);
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) !== 0)) {
        wv(DAT_0064b140, -2);
      }
      if ((_MEM[DAT_0064c6b3 + param_2 * 0x594] === 0)) {
        wv(DAT_0064b140, (DAT_0064b140 + -1));
      }
      if ((_MEM[DAT_0064c6be + param_1 * 0x594] !== 0)) {
        wv(DAT_0064b140, (DAT_0064b140 - ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - 1) / 2 | 0)));
      }
      wv(DAT_0064b100, -1);
      wv(DAT_0064b0fc, -1);
      wv(DAT_0064b104, -1);
      uVar2 = 0;
      uVar3 = 0x270f;
      local_20 = 0;
      for (/* cond: (local_1c < 8) */); local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
        if ((param_2 !== local_1c)) {
          if (((_MEM[DAT_0064c6c0 + (param_2 * 0x594 + local_1c * 4)] & 8) !== 0)) {
            if ((_MEM[DAT_00655c22 + param_2] < _MEM[DAT_00655c22 + param_1])) {
              wv(DAT_0064b140, (DAT_0064b140 + -1));
            }
            if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + local_1c * 0x594)] & 1) !== 0)) {
              if ((DAT_0064b0ec === 0)) {
                if ((iVar4 === 0)) {
                  wv(DAT_0064b0f8, 1);
                }
              }
              else {
                wv(DAT_0064b0ec, FUN_005adfa0((DAT_0064b0ec + -4), 0, 0x63));
              }
            }
          }
          if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + local_1c * 4)] & 8) !== 0)) {
            local_20 = (local_20 + 1);
          }
          iVar4 = FUN_00467af0(param_2, local_1c);
          if ((iVar4 !== 0)) {
            if ((((((s16((DAT_0064c70e + local_1c * 0x594), 0)) & 0xFFFF) * 4 - ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF)) !== 0) && (((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) <= ((s16((DAT_0064c70e + local_1c * 0x594), 0)) & 0xFFFF) * 4))) {
              wv(DAT_0064b140, (DAT_0064b140 + 1));
            }
            if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + local_1c * 0x594), 0))) {
              wv(DAT_0064b140, (DAT_0064b140 + 1));
            }
            if (((_MEM[DAT_0064c6c1 + (param_1 * 0x594 + local_1c * 4)] & 0x20) === 0)) {
              wv(DAT_0064b104, local_1c);
            }
            if (((_MEM[DAT_0064c6c1 + (param_2 * 0x594 + local_1c * 4)] & 2) !== 0)) {
              if ((uVar2 < s16((DAT_0064c70e + local_1c * 0x594), 0))) {
                uVar2 = s16((DAT_0064c70e + local_1c * 0x594), 0);
                wv(DAT_0064b0fc, local_1c);
              }
              if ((s16((DAT_0064c70e + local_1c * 0x594), 0) < uVar3)) {
                uVar3 = s16((DAT_0064c70e + local_1c * 0x594), 0);
                wv(DAT_0064b100, local_1c);
              }
            }
          }
        }
      }
      if ((local_20 === 0)) {
        FUN_00467750(param_2, param_1, 0x100000);
      }
      wv(DAT_0064b140, (DAT_0064b140 - s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30])));
      if ((s16((DAT_0064c70e + param_1 * 0x594), 0) < s16((DAT_0064c70e + param_2 * 0x594), 0))) {
        wv(DAT_0064b140, ((DAT_0064b140 - s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30])) + -1));
      }
      iVar4 = FUN_00467af0(param_2, param_1);
      if (((((((DAT_00655af8) << 16 >> 16) + param_2) + param_1) & 0x20) !== 0)) {
        wv(DAT_0064b118, 0);
      }
      wv(DAT_0064b0f4, 0);
      for (/* cond: (local_18 < ((DAT_00655b18) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_00655b18) << 16 >> 16)); local_18 = (local_18 + 1)) {
        if ((s8(_MEM[DAT_0064f348 + local_18 * 0x58]) === param_1)) {
          wv(DAT_0064b0f4, (DAT_0064b0f4 + 1));
        }
      }
      if ((6 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
        wv(DAT_0064b0e8, 1);
      }
      if ((DAT_0064b0e8 !== 0)) {
        wv(DAT_0064b0f8, 0);
        wv(DAT_0064b148, 0);
        if ((0x1d < DAT_0064b114)) {
          wv(DAT_0064b114, 0x1e);
        }
      }
      if (((((DAT_0064bc60) << 16 >> 16) & 0x8000) !== 0)) {
        if ((param_2 === 6)) {
          if ((param_1 === 7)) {
            if (((UNK_0064e854 & 8) !== 0)) {
              wv(DAT_0064b0f8, 1);
            }
          }
          else if ((param_1 === 1)) {
            wv(DAT_0064b0f8, 0);
          }
          else if ((param_1 === 3)) {
            wv(DAT_0064b0f8, 1);
          }
          else {
            wv(DAT_0064b0f8, 0);
          }
        }
        if ((param_1 === 1)) {
          wv(DAT_0064b0f8, 1);
        }
      }
      if (((DAT_0064bc60 & 1) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) === 0)) {
          wv(DAT_0064b0f8, 0);
        }
        else {
          FUN_0055f5a3(param_2, 1);
        }
      }
      if ((DAT_0064b114 < 2)) {
        wv(DAT_0064b114, 1);
      }
      if ((0x62 < DAT_0064b114)) {
        wv(DAT_0064b114, 0x63);
      }
      if ((0x49 < DAT_0064b114)) {
        wv(DAT_0064b114, 0x4a);
      }
      if ((DAT_0064b114 < 0x1b)) {
        wv(DAT_0064b114, 0x1a);
      }
      return;
    }
    if ((DAT_006ced50 < 3)) {
      wv(DAT_0064b118, (DAT_0064b118 << 1));
      wv(DAT_0064b134, (DAT_0064b134 + 1));
      goto LAB_00457d0d;
    }
    local_18 = (local_18 + 1);
  } ( true );
}


 export function FUN_00458a3b (param_1, param_2)

 {
  let iVar1;
  let uVar2;

  FUN_0040bbb0();
  iVar1 = FUN_004679ab(DAT_0064b114);
  FUN_0040ff00(s32((DAT_0064b9c0 + iVar1 * 4), 0));
  if ((DAT_00628064 === 2)) {
    FUN_0040bbe0(DAT_00626a38);
  }
  FUN_0040fe10();
  uVar2 = FUN_00410070(param_2);
  FUN_0040bbe0(uVar2);
  FUN_0040ff60(0, DAT_00679640);
  return;
}


 export function FUN_00458ab1 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_20;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00458de1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  wv(DAT_00626a24, 1);
  if (((DAT_00655aea+2 & 4) !== 0)) {
    FUN_005bcaa7(DAT_ffffffe0);
    iVar1 = FUN_005adfa0(((local_18 + -0x280) / 3 | 0), 1, 0x270f);
    iVar2 = FUN_005adfa0(((local_14 + -0x1e0) / 3 | 0), 1, 0x270f);
    FUN_0059d3e1((-iVar1), (-iVar2));
    FUN_0059e783((-iVar1), (-iVar2));
    FUN_00493f0f(param_1, param_2);
  }
  FUN_00458a3b(param_1, param_2);
  uVar3 = FUN_00493b10(param_2);
  FUN_0040ff60(1, uVar3);
  uVar3 = FUN_00493ba6(param_2);
  FUN_0040ff60(2, uVar3);
  uVar3 = FUN_00493c7d(param_2);
  FUN_0040ff60(3, uVar3);
  FUN_004271e8(5, s32(((DAT_00628420 + 0x1a8) + u8((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30] === 0)) * -4), 0));
  uVar3 = FUN_00493c7d(param_1);
  FUN_0040ff60(6, uVar3);
  FUN_0040bbb0();
  FUN_0040bbe0(s_GREETINGS_00626a3c);
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) === 0)) {
    FUN_0040bbe0(DAT_00626a4c);
  }
  else {
    FUN_0040bbe0(DAT_00626a48);
  }
  uVar3 = FUN_0059a791(0, 3);
  FUN_0040ff30(uVar3);
  FUN_0043c9d0(DAT_00679640);
  if ((_MEM[DAT_0064c7a5 + param_2 * 0x594] !== 0)) {
    FUN_0040ffa0(s_NUCLEARWEAPONS_00626a50, 0x8000);
  }
  FUN_0040bc80(0);
  if (((s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) & 0x104) !== 0x100)) {
    FUN_0040bbb0();
    FUN_0040bbe0(s_YOURNUKES_00626a60);
    FUN_0040ff30((2 - u8((_MEM[DAT_0064c7a5 + param_2 * 0x594] === 0))));
    FUN_00421ea0(DAT_00679640);
    w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x100));
  }
  local_8 = -1;
  FUN_00458dd5();
  FUN_00458deb();
  return;
}


 export function FUN_00458dd5 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00458deb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00458df9 (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00459175;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  bVar1 = 0;
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_00654fa8 !== 0)) {
    wv(DAT_00626a34, -1);
    local_8 = -1;
    FUN_00459169();
    FUN_0045917f();
    return;
  }
  if ((DAT_00626a30 !== 0)) {
    local_8 = -1;
    FUN_00459169();
    FUN_0045917f();
    return;
  }
  wv(DAT_00626a30, 1);
  do {
    if ((DAT_00626a34 !== 0)) {
 LAB_0045910f: :
      if ((DAT_00626a34 !== -1)) {
        FUN_00458ab1(param_1, param_2);
      }
      local_8 = -1;
      FUN_00459169();
      FUN_0045917f();
      return;
    }
    if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 1) === 0)) {
      bVar1 = 1;
    }
    FUN_0045705e(param_1, param_2);
    iVar2 = FUN_004087c0(param_3, param_4);
    if ((iVar2 === 0)) {
      FUN_0047cea6(param_3, param_4);
    }
    FUN_00458a3b(param_1, param_2);
    if (bVar1) {
      uVar3 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar3);
      FUN_00421ea0(s_EMISSARYFORCE_00626a6c);
      goto LAB_0045910f;
    }
    uVar3 = FUN_00493ba6(param_2);
    FUN_0040ff60(1, uVar3);
    uVar3 = FUN_00493b10(param_2);
    FUN_0040ff60(2, uVar3);
    uVar3 = FUN_00493c7d(param_2);
    FUN_0040ff60(3, uVar3);
    FUN_004271e8(4, s32(((DAT_00628420 + 0x1d8) + u8((_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30] === 0)) * -4), 0));
    FUN_0043c9d0(s_EMISSARY_00626a7c);
    if ((iVar2 !== 0)) {
      uVar5 = 0;
      uVar4 = 2;
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x1a0), 0), 2, 0);
      FUN_0059edf0(uVar3, uVar4, uVar5);
    }
    iVar2 = FUN_0040bc80(0);
    wv(DAT_00626a34, (-iVar2));
    if (((-iVar2) !== -2));
    wv(DAT_00626a34, 0);
  } /* goto */ ( true );
}


 export function FUN_00459169 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0045917f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0045918e ()

 {
  wv(DAT_00626a24, 0);
  wv(DAT_00626a30, 0);
  wv(DAT_00626a34, 0);
  wv(DAT_00626a1c, 0);
  FUN_00494148();
  return;
}


 export function FUN_004591cb (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;

  if ((DAT_0064b144 < 0)) {
    uVar1 = 0;
  }
  else {
    local_c = FUN_004bdb2c(param_2, DAT_0064b144);
    local_c = local_c * 0x14;
    if ((0x32 < DAT_0064b114)) {
      local_c = (DAT_0064b114 * local_c / 0x32 | 0);
    }
    if ((DAT_00655b08 !== 0)) {
      local_c = (local_c << 1);
    }
    iVar2 = FUN_005ae006(s8(_MEM[DAT_00655b82 + DAT_0064b144]));
    iVar2 = (iVar2 + -1);
    if ((iVar2 < 2)) {
      iVar2 = 1;
    }
    iVar2 = (local_c / iVar2 | 0);
    local_c = iVar2 * 0xa;
    if ((0x5dc < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
      local_c = (iVar2 * 0x1e / 2 | 0);
    }
    if ((0xbb8 < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
      local_c = (local_c * 3 / 2 | 0);
    }
    if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) !== 0)) {
      if ((_MEM[DAT_0064c6b0 + param_1 * 0x594] < _MEM[DAT_0064c6b0 + param_2 * 0x594])) {
        local_c = (local_c / 2 | 0);
      }
      else {
        local_c = (local_c - ((local_c + ((local_c >> 0x1f) & 3)) >> 2));
      }
      if (((u8(_MEM[DAT_0064c6b0 + param_1 * 0x594]) + 4) < u8(_MEM[DAT_0064c6b0 + param_2 * 0x594]))) {
        local_c = (local_c / 2 | 0);
      }
    }
    if ((local_c < 0)) {
      local_c = 0x7530;
    }
    if ((local_c < 0x64)) {
      local_c = 0x64;
    }
    if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < local_c)) {
      uVar1 = 0;
    }
    else {
      FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b144 * 0x10), 0));
      FUN_00421da0(0, local_c);
      if ((param_3 < 2)) {
        local_10 = FUN_00421ea0(s_SELLTECH_00626a88);
      }
      else {
        local_10 = FUN_00421ea0(s_SELLTECH2_00626a94);
      }
      if ((local_10 === 1)) {
        w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - local_c));
        FUN_00569363(1);
        FUN_004bf05b(param_1, DAT_0064b144, param_2, 0, 0);
        FUN_00458a3b(param_1, param_2);
        uVar1 = 1;
      }
      else {
        uVar1 = 1;
      }
    }
  }
  return uVar1;
}


 export function FUN_0045950b (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let bVar1;
  let cVar2;
  let uVar3;
  let bVar4;
  let bVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let unaff_FS_OFFSET;
  let local_39c;
  let local_398;
  let local_394;
  let local_388;
  let local_384;
  let local_380;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045a51c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
    bVar5 = 0;
  }
  else {
    bVar5 = 1;
  }
  do {
    local_398 = 0;
    local_394 = 0;
    local_20 = 0;
    local_7c = 0;
    local_39c = 0;
    local_78 = -1;
    local_380 = -1;
    wv(DAT_0064b10c, -1);
    wv(DAT_0064b124, -1);
    wv(DAT_0064b144, -1);
    for (/* cond: (local_388 < 0x64) */); local_388 = (local_388 < 0x64); local_388 = (local_388 + 1)) {
      if ((_MEM[DAT_0062768f + local_388 * 0x10] !== 0xfe)) {
        iVar6 = FUN_004bd9f0(param_1, local_388);
        iVar7 = FUN_004bd9f0(param_2, local_388);
        if ((local_380 < 0)) {
          local_380 = local_388;
        }
        if ((iVar6 === 0)) {
          for (/* cond: (local_74 < 0x1c) */); local_74 = (local_74 < 0x1c); local_74 = (local_74 + 1)) {
            if ((_MEM[DAT_0064c6b7 + (param_2 * 0x594 + local_18)] < _MEM[DAT_0064c6b7 + (param_1 * 0x594 + local_18)])) {
              for (/* cond: (local_384 < ((DAT_00655b18) << 16 >> 16)) */); local_384 = (local_384 < ((DAT_00655b18) << 16 >> 16)); local_384 = (local_384 + 1)) {
                if ((s8(_MEM[DAT_0064f379 + local_384 * 0x58]) === (-(local_74 + 0x27)))) {
                  local_78 = local_74;
                  break;
                }
              }
            }
          }
          local_14 = FUN_004bdb2c(param_1, local_388);
          if ((local_20 <= local_14)) {
            wv(DAT_0064b144, local_388);
            local_20 = local_14;
          }
        }
        if ((iVar7 === 0)) {
          local_14 = FUN_004bdb2c(param_2, local_388);
          if ((local_14 < local_394)) {
            if ((local_398 <= local_14)) {
              wv(DAT_0064b10c, local_388);
              local_398 = local_14;
            }
          }
          else {
            if ((-1 < DAT_0064b124)) {
              wv(DAT_0064b10c, DAT_0064b124);
              local_398 = local_394;
            }
            wv(DAT_0064b124, local_388);
            local_394 = local_14;
          }
        }
      }
    }
    if ((param_6 !== 0)) {
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    FUN_00458a3b(param_1, param_2);
    uVar8 = FUN_00410070(param_2);
    FUN_0040ff60(1, uVar8);
    if ((!bVar5)) {
      if ((DAT_0064b0f4 !== 0)) {
        if ((param_5 === 0)) {
          iVar6 = FUN_0059a791(0, 2);
          if ((iVar6 === 0)) {
            FUN_004941ee(3);
            FUN_00421ea0(s_NOEXCHANGEMEDIUM_00626ab0);
          }
          else {
            FUN_004941ee(4);
            FUN_00421ea0(s_NOEXCHANGEMAD_00626aa0);
          }
        }
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
      if ((5 < iVar6)) {
        if ((param_5 === 0)) {
          iVar6 = FUN_0059a791(0, 2);
          if ((iVar6 === 0)) {
            FUN_004941ee(3);
            FUN_00421ea0(s_NOEXCHANGEMEDIUM_00626ad4);
          }
          else {
            FUN_004941ee(4);
            FUN_00421ea0(s_NOEXCHANGEMAD_00626ac4);
          }
        }
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
    }
    if ((3 < DAT_00655b08)) {
      if ((param_5 !== 0)) {
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
      FUN_004271e8(1, s32((DAT_0064c488 + (local_78 + 0x27) * 8), 0));
      FUN_00421ea0(s_NOEXCHANGEWONDER_00626ae8);
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    if ((local_39c < local_7c)) {
      if ((param_5 === 1)) {
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
      uVar3 = s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0);
      iVar6 = FUN_004679ab(DAT_0064b114);
      if ((!bVar5)) {
        iVar6 = FUN_004591cb(param_1, param_2, param_5);
        if ((iVar6 !== 0)) {
          local_8 = -1;
          FUN_0045a510();
          FUN_0045a526();
          return;
        }
        if ((param_5 !== 0)) {
          local_8 = -1;
          FUN_0045a510();
          FUN_0045a526();
          return;
        }
        uVar8 = FUN_00410070(param_1);
        FUN_0040ff60(1, uVar8);
        FUN_004941ee(3);
        FUN_00421ea0(s_NOEXCHANGEMEDIUM_00626afc);
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
    }
    if ((DAT_0064b124 !== 0x22)) {
      if ((param_5 !== 1)) {
        iVar6 = FUN_004591cb(param_1, param_2, param_5);
        if ((iVar6 !== 0)) {
          local_8 = -1;
          FUN_0045a510();
          FUN_0045a526();
          return;
        }
        if ((param_5 === 0)) {
          FUN_00421ea0(s_NOEXCHANGENOW_00626b10);
        }
      }
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    if ((param_5 === 3)) {
      FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b144 * 0x10), 0));
      FUN_004941ee(3);
      if ((param_5 < 2)) {
        FUN_00421ea0(s_EXCHANGEGIFT_00626b20);
      }
      else {
        FUN_00421ea0(s_EXCHANGEGIFT2_00626b30);
      }
      FUN_004bf05b(param_1, DAT_0064b144, param_2, 0, 0);
      wv(DAT_0064b144, -1);
      if ((1 < param_5)) {
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 2);
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    if ((DAT_0064b124 < 0)) {
      if ((param_5 !== 1)) {
        iVar6 = FUN_004591cb(param_1, param_2, param_5);
        if ((iVar6 !== 0)) {
          local_8 = -1;
          FUN_0045a510();
          FUN_0045a526();
          return;
        }
        if ((param_5 === 0)) {
          FUN_00421ea0(s_NOEXCHANGENOW_00626b40);
        }
      }
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    if ((1 < param_5)) {
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    iVar6 = FUN_00458df9(param_1, param_2, param_3, param_4);
    if ((iVar6 === 0)) {
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b144 * 0x10), 0));
    uVar8 = FUN_00410070(param_1);
    FUN_0040ff60(2, uVar8);
    FUN_004271e8(3, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
    if ((DAT_0064b10c < 0)) {
      if ((-1 < local_380)) {
        FUN_004271e8(4, s32((DAT_00627684 + local_380 * 0x10), 0));
      }
    }
    else {
      FUN_004271e8(4, s32((DAT_00627684 + DAT_0064b10c * 0x10), 0));
    }
    FUN_0040bbb0();
    FUN_0040bbe0(s_EXCHANGE_00626b50);
    if ((iVar6 < 5)) {
      FUN_0040bbe0(DAT_00626b60);
    }
    else {
      FUN_0040bbe0(DAT_00626b5c);
    }
    FUN_0059d5f5();
    FUN_0043c9d0(DAT_00679640);
    if ((DAT_0064b10c !== DAT_0064b124)) {
      FUN_004aef20(DAT_ffffff90);
      FUN_004af14b(DAT_ffffff90, 0x6b);
      FUN_00426ff0(DAT_ffffff90, DAT_00679640);
      FUN_0059edf0(DAT_00679640, 2, 0);
    }
    iVar6 = FUN_0040bc80(0);
    if ((iVar6 === 0)) {
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
    local_1c = local_394 * 2;
    if ((iVar6 === 2)) {
      iVar6 = FUN_004bd9f0(param_2, DAT_0064b10c);
      if ((4 < iVar6)) {
        FUN_004941ee(3);
        FUN_00421ea0(s_EXCHANGEPETTY_00626b64);
        _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
        local_8 = -1;
        FUN_0045a510();
        FUN_0045a526();
        return;
      }
      FUN_005adfd9(DAT_0064b124, DAT_0064b10c);
      local_1c = local_398;
    }
    FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
    FUN_0057a27a(param_1, param_2);
    wv(DAT_0064b124, DAT_0064b10c);
    wv(DAT_0064b10c, -1);
    FUN_00456f20(param_2, param_1, (-local_1c));
    w16((DAT_0064c6a0 + param_2 * 0x594), 0, (s16((DAT_0064c6a0 + param_2 * 0x594), 0) | 0x80));
    w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 0x80));
    wv(DAT_0064b0f8, 0);
    if ((param_5 === 0)) {
      local_8 = -1;
      FUN_0045a510();
      FUN_0045a526();
      return;
    }
  } while ( true );
}


 export function FUN_0045a510 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0045a526 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0045a535 (param_1, param_2)

 {
  let uVar1;

  FUN_00456f20(param_2, param_1, -25);
  FUN_00467825(param_2, param_1, 8);
  FUN_0045705e(param_1, param_2);
  _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
  w16((DAT_0064c6a0 + param_2 * 0x594), 0, (s16((DAT_0064c6a0 + param_2 * 0x594), 0) | 0x100));
  wv(DAT_0064b0e8, 0);
  w16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0, DAT_00655af8);
  w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 0x100));
  FUN_00458a3b(param_1, param_2);
  uVar1 = FUN_00410070(param_2);
  FUN_0040ff60(1, uVar1);
  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(2, uVar1);
  FUN_004941ee(2);
  FUN_00410030(s_ALLIANCE_00626b74, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
  return;
}


 export function FUN_0045a6ab (param_1, param_2)

 {
  let uVar1;

  FUN_00467825(param_2, param_1, 0x4004);
  uVar1 = FUN_00467904(param_2, param_1, 0, 0x32);
  uVar1 = FUN_005adfa0(uVar1);
  FUN_00467933(param_2, param_1, uVar1);
  FUN_0045705e(param_1, param_2);
  _MEM[DAT_0064c6bf + param_2 * 0x594] = 0;
  w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
  FUN_00458a3b(param_1, param_2);
  uVar1 = FUN_00410070(param_2);
  FUN_0040ff60(1, uVar1);
  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(2, uVar1);
  FUN_004941ee(2);
  FUN_00410030(s_TREATY_00626b80, DAT_006409d8, 0);
  return;
}


 export function FUN_0045a7a8 (param_1, param_2)

 {
  let uVar1;
  let local_8;

  FUN_00467825(param_2, param_1, 0x4002);
  FUN_00467750(param_2, param_1, 0x40000);
  uVar1 = FUN_00467904(param_2, param_1, 0, 0x32);
  uVar1 = FUN_005adfa0(uVar1);
  FUN_00467933(param_2, param_1, uVar1);
  FUN_0045705e(param_1, param_2);
  w16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0, DAT_00655af8);
  FUN_00458a3b(param_1, param_2);
  uVar1 = FUN_00410070(param_2);
  FUN_0040ff60(1, uVar1);
  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(2, uVar1);
  FUN_004941ee(2);
  FUN_00410030(s_CEASEFIRE_00626b88, DAT_00647748, 0);
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    w32((DAT_0064c6c0 + (param_1 * 4 + local_8 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + local_8 * 0x594)), 0) & -0x801));
  }
  return;
}


 export function FUN_0045a8e3 (param_1, param_2)

 {
  let uVar1;
  let local_8;

  if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 1) !== 0)) {
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if (((_MEM[DAT_0064c6c0 + (local_8 * 0x594 + param_2 * 4)] & 1) !== 0)) {
        uVar1 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar1);
        uVar1 = FUN_00493c7d(local_8);
        FUN_0040ff60(2, uVar1);
        uVar1 = FUN_00493c7d(param_2);
        FUN_0040ff60(3, uVar1);
        if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
              if ((DAT_006d1da0 === param_1)) {
                FUN_00410030(s_ALLYHELPS_00626ba4, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
              }
              else if ((2 < DAT_00655b02)) {
                FUN_00511880(0x39, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 4, 0, 0, 0);
              }
            }
            FUN_00467825(local_8, param_2, 0x2401);
            w32((DAT_0064c6c0 + (local_8 * 0x594 + param_2 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_2 * 4)), 0) | 0x80800));
          }
        }
        else {
          if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
            if ((DAT_006d1da0 === param_2)) {
              FUN_00410030(s_ACTIVATEALLY_00626b94, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            }
            else if ((2 < DAT_00655b02)) {
              FUN_00511880(0x38, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 4, 0, 0, 0);
            }
          }
          FUN_00456f20(local_8, param_2, 0x64);
          FUN_00467825(local_8, param_2, 0x2401);
          w32((DAT_0064c6c0 + (local_8 * 0x594 + param_2 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_2 * 4)), 0) | 0x80800));
          w32((DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)), 0, (s32((DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)), 0) | 0x80800));
          w16((DAT_0064ca82 + (param_2 * 0x594 + local_8 * 2)), 0, DAT_00655af8);
        }
      }
    }
  }
  return;
}


 export function FUN_0045ac71 (param_1, param_2, param_3)

 {
  let iVar1;

  if ((-1 < param_3)) {
    _MEM[DAT_0064c6e8 + (param_3 * 0x594 + param_1)] = (_MEM[DAT_0064c6e8 + (param_3 * 0x594 + param_1)] + 1)
    ;
  }
  if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 8) === 0)) {
    if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 6) === 0)) {
      if ((-1 < param_3)) {
        FUN_00456f20(param_3, param_1, -5);
      }
    }
    else {
      if (((_MEM[DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)] & 2) !== 0)) {
        if ((param_3 < 0)) {
          _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
        }
        if ((iVar1 === 0)) {
          _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
        }
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          _MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] = (_MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] + 0xff);
        }
      }
      if ((param_3 < 0)) {
        _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
      }
      if ((iVar1 === 0)) {
        _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
      }
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        _MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] = (_MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] + 0xff)
        ;
      }
      if ((-1 < param_3)) {
        FUN_00456f20(param_3, param_1, -15);
      }
    }
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      w32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0) | 0x10));
    }
    FUN_00467825(param_1, param_2, 0x2000);
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      w32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_2 * 4 + param_1 * 0x594)), 0) | 0x80800));
      w16((DAT_0064ca82 + (param_2 * 2 + param_1 * 0x594)), 0, DAT_00655af8);
      FUN_0045a8e3(param_2, param_1);
    }
  }
  else {
    if ((iVar1 === 0)) {
      _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
    }
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      _MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] = (_MEM[DAT_0064c6e8 + (param_1 * 0x594 + param_2)] + 0xff);
    }
    if ((-1 < param_3)) {
      FUN_00456f20(param_3, param_1, -25);
    }
    FUN_00467ef2(param_1, param_2);
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      w32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0) | 0x10));
    }
  }
  return;
}


 export function FUN_0045b0d6 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = DAT_006d1da0;
  local_8 = ((DAT_006d1da0) & 0xFF);
  if (((s32((DAT_0064c6c0 + (param_2 * 4 + DAT_006d1da0 * 0x594)), 0) & 0x2008) === 0)) {
    iVar2 = FUN_00458df9(DAT_006d1da0, param_1, -1, -1);
    if ((iVar2 === 0)) {
      FUN_00456f20(param_1, iVar1, 0x64);
    }
    else {
      uVar3 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar3);
      local_18 = FUN_00410030(s_DEMANDHELP_00626bb0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
      if ((local_18 !== 1)) {
        local_10 = 0;
        for (/* cond: (local_c < 0x3f) */); local_c = (local_c < 0x3f); local_c = (local_c + 1)) {
          if ((s16((DAT_0064c832 + (local_c * 2 + param_1 * 0x594)), 0) < s16((DAT_0064c8b2 + (local_c * 2 + param_2 * 0x594)), 0))) {
            local_10 = (local_10 + (((s16((DAT_0064c8b2 + (local_c * 2 + param_2 * 0x594)), 0)) & 0xFFFF) * (((-u8((DAT_00655b08 === 0))) & 2) + 2) / (((s16((DAT_0064c832 + (local_c * 2 + param_1 * 0x594)), 0)) & 0xFFFF) + 1) | 0));
          }
        }
        if ((local_10 !== 0)) {
          iVar4 = FUN_005adfa0(local_10, 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x32 | 0));
          iVar2 = iVar4 * 0x32;
          if ((iVar2 !== 0)) {
            FUN_00421da0(0, iVar2);
            local_18 = FUN_00410030(s_HELPBONUS_00626bbc, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            if ((local_18 === 1)) {
              w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + iVar4 * -50));
              w32((DAT_0064c6a2 + iVar1 * 0x594), 0, (s32((DAT_0064c6a2 + iVar1 * 0x594), 0) + iVar2));
              FUN_00569363(1);
            }
          }
        }
      }
      if ((local_18 === 1)) {
        FUN_0045ac71(iVar1, param_2, param_1);
      }
      else {
        FUN_00410030(s_DIDNTHELP_00626bc8, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        if ((DAT_0064b114 < 0x33)) {
          FUN_00456f20(param_1, iVar1, 0x64);
        }
        else {
          FUN_00467ef2(iVar1, param_1);
        }
      }
    }
    FUN_0045918e();
  }
  return;
}


 export function FUN_0045b472 (param_1)

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = 0xa;
  local_10 = 0x32;
  while ((0 < param_1)) {
    iVar1 = FUN_005adfa0(param_1, 0, local_10);
    local_c = (local_c + (iVar1 / local_8 | 0));
    local_8 = (local_8 + 5);
    param_1 = (param_1 - local_10);
    local_10 = 0x64;
  }
  return local_c;
}


 export function FUN_0045b4da (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let uVar4;
  let bVar5;
  let uVar6;
  let uVar7;
  let iVar8;
  let uVar9;
  let uVar10;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  uVar4 = 0;
  bVar3 = 0;
  local_1c = 0;
  wv(DAT_0062804c, 0);
  /* switch */ () {
  case 1 :
    local_38 = 0;
    for (/* cond: (local_4c < 8) */); local_4c = (local_4c < 8); local_4c = (local_4c + 1)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + local_4c * 4)] & 8) !== 0)) {
        local_38 = (local_38 + 1);
      }
    }
    local_14 = u8((DAT_0064b104 === -1));
    if ((DAT_00655b08 < 2)) {
      local_14 = (local_14 - 1);
    }
    if ((_MEM[DAT_00655c22 + param_1] < 5)) {
      if ((local_38 === 0)) {
        local_14 = (local_14 - 1);
      }
      local_14 = (local_14 - 1);
    }
    if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
      if ((5 < _MEM[DAT_00655c22 + param_2])) {
        local_14 = (local_14 + 1);
      }
      if ((6 < _MEM[DAT_00655c22 + param_2])) {
        local_14 = (local_14 + 1);
      }
      if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
        local_14 = (local_14 - 1);
      }
    }
    if ((DAT_0064b11c === 0)) {
      if ((2 < (u8(_MEM[DAT_00655c22 + param_1]) - u8(_MEM[DAT_00655c22 + param_2])))) {
        local_14 = (local_14 - 1);
      }
    }
    else {
      local_14 = (local_14 + 1);
    }
    if ((DAT_0064b0ec !== 0)) {
      local_14 = (local_14 - 1);
    }
    bVar2 = (local_14 < DAT_0064b140);
    iVar8 = FUN_004679ab(DAT_0064b114);
    bVar2 = ((DAT_00655b08 === 0) || ((iVar8 < 4) && bVar2));
    if ((local_38 !== 0)) {
      bVar2 = 0;
    }
    if (((((-u8((DAT_00655b08 === 0))) & 2) + 2) < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      bVar2 = 0;
    }
    if ((u8(_MEM[DAT_00655c22 + param_1]) * 0x14 < ((DAT_00655af8) << 16 >> 16))) {
      bVar2 = 1;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 1) !== 0)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 4) === 0)) {
        local_14 = (((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) << 1);
      }
      else {
        local_14 = (((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) * 3 / 2 | 0);
      }
      if ((local_14 <= ((s16((DAT_0064c70e + DAT_0064b104 * 0x594), 0)) & 0xFFFF))) {
        bVar2 = 1;
        local_1c = 2;
      }
    }
    if ((iVar8 < 5)) {
      local_18 = 8;
      local_3c = -1;
      for (/* cond: (local_4c < 8) */); local_4c = (local_4c < 8); local_4c = (local_4c + 1)) {
        if (((u8(_MEM[DAT_00655c22 + local_4c]) - local_c) < local_18)) {
          local_3c = local_4c;
          local_18 = (u8(_MEM[DAT_00655c22 + local_4c]) - local_c);
        }
      }
      if ((_MEM[DAT_00655c22 + DAT_0064b104] !== 7)) {
        local_3c = DAT_0064b104;
      }
      if ((0 < local_3c)) {
        wv(DAT_0064b104, local_3c);
        bVar2 = 1;
        local_1c = (local_1c | 4);
      }
    }
    if ((4 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      bVar2 = 0;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 8) !== 0)) {
      bVar2 = 1;
      local_1c = (local_1c | 1);
    }
    if ((0x4b < DAT_0064b114)) {
      bVar2 = 0;
    }
    if ((DAT_00655b08 !== 0)) {
      bVar2 = 0;
    }
    FUN_00458a3b(param_1, param_2);
    uVar7 = FUN_00410070(param_1);
    FUN_0040ff60(1, uVar7);
    uVar7 = FUN_00410070(param_2);
    FUN_0040ff60(2, uVar7);
    if (bVar2) {
      bVar2 = 1;
      if ((0 < DAT_0064b124)) {
        FUN_004271e8(3, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
        FUN_0040bbb0();
        FUN_004941ee(3);
        FUN_0040bbe0(s_PERHAPSSECRET_00626c58);
        uVar7 = FUN_0059a791(0, 1);
        FUN_0040ff30(uVar7);
        iVar8 = FUN_00421ea0(DAT_00679640);
        if ((iVar8 === 0)) {
          bVar2 = 0;
        }
        else {
          bVar3 = 1;
          FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
          iVar8 = FUN_004bdb2c(param_2, DAT_0064b124);
          FUN_00456f20(param_2, param_1, iVar8 * -2);
          FUN_00458a3b(param_1, param_2);
          wv(DAT_0064b124, DAT_0064b10c);
          wv(DAT_0064b10c, -1);
        }
      }
      if (bVar2) {
        iVar8 = (((s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x32 | 0) * ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) / ((((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) + ((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF)) + 1) | 0) + u8(_MEM[DAT_0064c6be + param_1 * 0x594]) * 2);
        local_48 = iVar8 * 0x32;
        if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
          local_48 = iVar8 * 0x64;
        }
        for (/* cond: (s32((DAT_0064c6a2 + param_1 * 0x594), 0) < local_48) */); wv(DAT_0064c6a2, DAT_0064c6a2); local_48 = (local_48 + -50)) {
        }
        if ((0 < local_48)) {
          FUN_00421da0(0, local_48);
          FUN_0040bbb0();
          FUN_004941ee(3);
          FUN_0040bbe0(s_PERHAPSTHROWIN_00626c68);
          uVar7 = FUN_0059a791(0, 1);
          FUN_0040ff30(uVar7);
          FUN_004941ee(3);
          iVar8 = FUN_00421ea0(DAT_00679640);
          if ((iVar8 === 0)) {
            bVar2 = 0;
          }
          else {
            w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - local_48));
            w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + local_48));
            bVar3 = 1;
            iVar8 = FUN_0045b472(local_48);
            FUN_00456f20(param_2, param_1, (-iVar8));
            FUN_0056a65e(1);
            FUN_00458a3b(param_1, param_2);
          }
        }
      }
      if (bVar2) {
        if ((0 < DAT_0064b104)) {
          uVar7 = FUN_00493c7d(DAT_0064b104);
          FUN_0040ff60(4, uVar7);
          FUN_004941ee(3);
          iVar8 = FUN_00421ea0(s_PERHAPSSOLIDARITY_00626c8c);
          if ((iVar8 === 0)) {
            if ((DAT_0064b0e8 !== 0)) {
              _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
              FUN_004941ee(3);
              if (bVar3) {
                FUN_00421ea0(s_PERHAPSTHANKSANYWAY_00626ca0);
                return 0;
              }
              FUN_00421ea0(s_PERHAPSBYE_00626cb4);
              return 1;
            }
          }
          else {
            FUN_0045ac71(param_1, DAT_0064b104, param_2);
            if (((local_1c & 4) !== 0)) {
              FUN_00467825(param_2, DAT_0064b104, 0x2001);
              FUN_00467825(param_1, DAT_0064b104, 1);
            }
            w32((DAT_0064c6c0 + (param_2 * 0x594 + DAT_0064b104 * 4)), 0, (s32((DAT_0064c6c0 + (param_2 * 0x594 + DAT_0064b104 * 4)), 0) | 0x80800));
            wv(DAT_0064b104, -1);
          }
        }
        FUN_0045a535(param_1, param_2);
      }
      else {
        FUN_004941ee(3);
        FUN_00421ea0(s_ALLIANCENOPATIENCE_00626c78);
      }
    }
    else if ((DAT_0064b0f4 === 0)) {
      if ((_MEM[DAT_00655c22 + param_1] < 5)) {
        iVar8 = FUN_004679ab(DAT_0064b114);
        if ((iVar8 < 4)) {
          if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
            FUN_004941ee(3);
            FUN_00421ea0(s_ALLIANCENOSMALL_00626c20);
          }
          else if ((_MEM[DAT_0064c6bf + param_2 * 0x594] < 3)) {
            FUN_004941ee(3);
            FUN_00421ea0(s_ALLIANCENOTHANKS_00626c44);
          }
          else {
            FUN_004941ee(3);
            FUN_00421ea0(s_ALLIANCENOPATIENCE_00626c30);
          }
        }
        else {
          FUN_004941ee(4);
          FUN_00421ea0(s_ALLIANCENODISLIKE_00626c0c);
        }
      }
      else {
        FUN_004941ee(4);
        FUN_00421ea0(s_ALLIANCENOWINNING_00626bf8);
      }
    }
    else {
      if ((iVar8 !== 0)) {
        FUN_004941ee(3);
        FUN_00421ea0(s_NOBETRAYWEAK_00626bd4);
      }
      else {
        FUN_004941ee(4);
        FUN_00421ea0(s_ALLIANCENOBETRAY_00626be4);
      }
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
    }
    break;
  case 2 :
    bVar5 = ((DAT_0064b11c === 0) && ((DAT_0064b114 < 0x33) && ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) <= (((-u8((DAT_00655b08 === 0))) & 2) + 4))));
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 1) !== 0)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 4) === 0)) {
        local_14 = (((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) << 1);
      }
      else {
        local_14 = (((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) * 3 / 2 | 0);
      }
      if ((local_14 <= ((s16((DAT_0064c70e + DAT_0064b104 * 0x594), 0)) & 0xFFFF))) {
        bVar5 = 3;
      }
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + DAT_0064b104 * 4)] & 8) !== 0)) {
      bVar5 = (bVar5 | 4);
    }
    if ((6 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      bVar5 = 0;
    }
    if ((0x4b < DAT_0064b114)) {
      bVar5 = 0;
    }
    iVar8 = FUN_00453e51(param_1, 6);
    if ((iVar8 !== 0)) {
      bVar5 = (bVar5 | 8);
    }
    if ((bVar5 === 0)) {
      if ((DAT_0064b0f4 < 2)) {
        if ((u8(_MEM[DAT_00655c22 + param_1]) <= (u8(_MEM[DAT_00655c22 + param_2]) + 2))) {
          if ((DAT_0064b114 < 0x1a)) {
            FUN_004941ee(3);
            FUN_00421ea0(s_PEACENOPATIENCE_00626d00);
          }
          else {
            FUN_004941ee(4);
            FUN_00421ea0(s_PEACENODISLIKE_00626cf0);
          }
        }
        else {
          FUN_004941ee(4);
          FUN_00421ea0(s_PEACENOWINNING_00626ce0);
        }
      }
      else {
        if ((iVar8 !== 0)) {
          FUN_004941ee(3);
          FUN_00421ea0(s_NOBETRAYWEAK_00626cc0);
        }
        else {
          FUN_004941ee(4);
          FUN_00421ea0(s_PEACENOBETRAY_00626cd0);
        }
        _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
      }
    }
    else {
      if ((0 < DAT_0064b124)) {
        FUN_004271e8(3, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
        FUN_004941ee(3);
        FUN_0040bbb0();
        FUN_0040bbe0(s_PERHAPSSECRET_00626d10);
        uVar7 = FUN_0059a791(0, 1);
        FUN_0040ff30(uVar7);
        iVar8 = FUN_00421ea0(DAT_00679640);
        if ((iVar8 === 0)) {
          bVar5 = (bVar5 & 8);
        }
        else {
          bVar3 = 1;
          FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
          iVar8 = FUN_004bdb2c(param_2, DAT_0064b124);
          FUN_00456f20(param_2, param_1, iVar8 * -2);
          FUN_00458a3b(param_1, param_2);
          wv(DAT_0064b124, DAT_0064b10c);
          wv(DAT_0064b10c, -1);
        }
      }
      if ((bVar5 !== 0)) {
        iVar8 = (((s32((DAT_0064c6a2 + param_1 * 0x594), 0) / 0x32 | 0) * ((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) / ((((s16((DAT_0064c70e + param_2 * 0x594), 0)) & 0xFFFF) + ((s16((DAT_0064c70e + param_1 * 0x594), 0)) & 0xFFFF)) + 1) | 0) + u8(_MEM[DAT_0064c6be + param_1 * 0x594]));
        local_48 = iVar8 * 0x32;
        if ((s16((DAT_0064c70e + param_2 * 0x594), 0) < s16((DAT_0064c70e + param_1 * 0x594), 0))) {
          local_48 = iVar8 * 0x64;
        }
        for (/* cond: (s32((DAT_0064c6a2 + param_1 * 0x594), 0) < local_48) */); wv(DAT_0064c6a2, DAT_0064c6a2); local_48 = (local_48 + -50)) {
        }
        if ((0 < local_48)) {
          FUN_00421da0(0, local_48);
          FUN_004941ee(3);
          FUN_0040bbb0();
          FUN_0040bbe0(s_PERHAPSTHROWIN_00626d20);
          uVar7 = FUN_0059a791(0, 1);
          FUN_0040ff30(uVar7);
          iVar8 = FUN_00421ea0(DAT_00679640);
          if ((iVar8 === 0)) {
            bVar5 = (bVar5 & 8);
          }
          else {
            w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - local_48));
            w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + local_48));
            bVar3 = 1;
            iVar8 = FUN_0045b472(local_48);
            FUN_00456f20(param_2, param_1, (-iVar8));
            FUN_00458a3b(param_1, param_2);
            FUN_0056a65e(1);
          }
        }
      }
      if ((bVar5 === 0)) {
        FUN_004941ee(3);
        FUN_00421ea0(s_PEACENOPATIENCE_00626d30);
      }
      else {
        if ((0 < DAT_0064b104)) {
          uVar7 = FUN_00493c7d(DAT_0064b104);
          FUN_0040ff60(4, uVar7);
          FUN_004941ee(3);
          iVar8 = FUN_00421ea0(s_PERHAPSSOLIDARITY_00626d40);
          if ((iVar8 === 0)) {
            if ((3 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
              _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
              FUN_004941ee(3);
              if (bVar3) {
                FUN_00421ea0(s_PERHAPSTHANKSANYWAY_00626d54);
                return 0;
              }
              FUN_00421ea0(s_PERHAPSBYE_00626d68);
              return 1;
            }
          }
          else {
            FUN_0045ac71(param_1, DAT_0064b104, param_2);
            wv(DAT_0064b104, -1);
          }
        }
        FUN_0045a6ab(param_1, param_2);
      }
    }
    break;
  case 3 :
  case 4 :
  case 5 :
    cVar1 = _MEM[DAT_0064c6bf + param_2 * 0x594];
    if ((param_3 < 5)) {
      uVar6 = FUN_00456f8b(param_1, param_2);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = uVar6;
    }
    else {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
    }
    FUN_00458a3b(param_1, param_2);
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x60) !== 0)) {
      FUN_00458a3b(param_1, param_2);
      FUN_0040bbb0();
      FUN_0040bbe0(s_PROVOKE_00626d74);
      uVar7 = FUN_0059a791(0, 2);
      FUN_0040ff30(uVar7);
      wv(DAT_0064b0e8, 0);
      FUN_004941ee(4);
      FUN_00467825(param_2, param_1, 0x2000);
      w16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0, DAT_00655af8);
      FUN_00410030(DAT_00679640, DAT_00644e48, 0);
      return 1;
    }
    if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
      wv(DAT_0064b0ec, (u8(_MEM[DAT_00655c22 + param_2]) - u8(_MEM[DAT_00655c22 + param_1])));
    }
    local_10 = FUN_005adfa0(DAT_0064b0ec, 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) / 0x32 | 0));
    local_10 = local_10 * 0x32;
    if (((((DAT_00655af8) << 16 >> 16) - DAT_0064b108) < 8)) {
      local_10 = 0;
      wv(DAT_0064b144, -1);
    }
    if (((((DAT_00655af8) << 16 >> 16) - DAT_0064b108) < 0x10)) {
      local_10 = (local_10 / 2 | 0);
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 0x594 + param_2 * 4)] & 4) === 0)) {
      local_10 = (local_10 / 2 | 0);
    }
    iVar8 = FUN_00453e51(param_2, 6);
    if ((iVar8 !== 0)) {
      local_10 = 0;
    }
    if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
      local_10 = 0;
      wv(DAT_0064b0ec, 1);
    }
    local_58 = 0;
    iVar8 = FUN_00453e51(param_1, 6);
    if ((iVar8 === 0)) {
      bVar3 = 0;
    }
    else {
      bVar3 = 1;
    }
    if ((6 < (u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])))) {
      bVar3 = 0;
    }
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
      if ((!bVar3)) {
        uVar9 = _rand();
        uVar10 = (uVar9 >> 0x1f);
        if ((0x19 < DAT_0064b114)); local_50 = (local_50 < ((DAT_00655b16) << 16 >> 16)); local_50 = (local_50 + 1)) {
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_50 * 0x20]) * 0x14] < 6)) {
          local_34 = ((s16((DAT_006560f0 + local_50 * 0x20), 0)) << 16 >> 16);
          local_40 = ((s16((DAT_006560f2 + local_50 * 0x20), 0)) << 16 >> 16);
          iVar8 = FUN_005b89e4(local_34, local_40);
          if ((-1 < iVar8)) {
            FUN_005b36df(local_50, ((s16((DAT_0064f340 + iVar8 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar8 * 0x58), 0)) << 16 >> 16), 1);
            _MEM[DAT_006560f9 + local_50 * 0x20] = 0;
            _MEM[DAT_006560ff + local_50 * 0x20] = 0xff;
            FUN_0047cea6(local_34, local_40);
            local_58 = (local_58 + 1);
          }
        }
      }
    }
 LAB_0045d5d2: :
    if ((param_3 === 5)) {
      FUN_00456f20(param_2, param_1, 2);
    }
    else {
      local_54 = 0xa;
      if ((param_3 === 3)) {
        if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
          local_54 = 5;
        }
        if ((_MEM[DAT_00655c22 + param_1] < 4)) {
          local_54 = 0;
        }
      }
      FUN_00456f20(param_2, param_1, local_54);
    }
    if ((local_58 !== 0)) {
      FUN_004941ee(3);
      FUN_00410030(s_APOLOGIZE_00626d7c, DAT_006409d8, 0);
      if ((param_3 === 5)) {
        return 0;
      }
    }
    if ((param_3 === 5)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
        if ((param_3 === 5)) {
          if ((local_58 === 0)) {
            FUN_004941ee(3);
            if ((param_3 === 5)) {
              FUN_00421ea0(s_NOVIOLATORS_00626ddc);
            }
            else {
              FUN_00421ea0(s_FEEBLE_00626de8);
            }
          }
        }
        else {
          uVar4 = 1;
          FUN_00458a3b(param_1, param_2);
          FUN_0040bbb0();
          FUN_0040bbe0(s_PROVOKE_00626dd4);
          uVar7 = FUN_0059a791(0, 2);
          FUN_0040ff30(uVar7);
          wv(DAT_0064b0e8, 0);
          FUN_004941ee(4);
          FUN_00467825(param_2, param_1, 0x2000);
          FUN_00410030(DAT_00679640, DAT_00644e48, 0);
          w16((DAT_0064ca82 + (param_1 * 0x594 + param_2 * 2)), 0, DAT_00655af8);
        }
      }
      else {
        iVar8 = FUN_0045950b(param_1, param_2, local_34, local_40, ((cVar1 < 2) + 2), 0);
        if ((iVar8 === 0)) {
          if ((_MEM[DAT_00655c22 + param_1] < 4)) {
            FUN_004941ee(3);
            FUN_00410030(s_SYMPATHY_00626db0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
          }
          else if ((DAT_0064b11c === 0)) {
            if ((local_58 === 0)) {
              FUN_004941ee(3);
              FUN_00410030(s_FEEBLEALLY_00626dc8, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            }
          }
          else {
            FUN_004941ee(4);
            FUN_00410030(s_TAUNTALLY_00626dbc, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            FUN_00467ef2(param_1, param_2);
            uVar4 = 1;
          }
        }
      }
    }
    else {
      if ((_MEM[DAT_0064c6b0 + param_2 * 0x594] <= _MEM[DAT_0064c6b0 + param_1 * 0x594])) {
        FUN_00421da0(0, local_10);
        FUN_004941ee(2);
        if ((param_3 === 3)) {
          FUN_00410030(s_GIVEMOREALLY_00626d94, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        }
        else {
          FUN_00421ea0(s_GIVEMORE_00626da4);
        }
        w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + local_10));
        w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) - local_10));
        FUN_0056a65e(1);
      }
      else {
        FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b144 * 0x10), 0));
        FUN_004941ee(2);
        FUN_00421ea0(s_GIVEMORECIV_00626d88);
        FUN_004bf05b(param_1, DAT_0064b144, param_2, 0, 0);
        wv(DAT_0064b144, -1);
      }
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) === 0)) {
        if ((DAT_0064b138 === 0)) {
          FUN_00467825(param_2, param_1, 0x40000);
        }
        FUN_00467825(param_2, param_1, 2);
      }
    }
    break;
  case 6 :
    FUN_00467750(param_2, param_1, 8);
    FUN_00456f20(param_2, param_1, 0x32);
    FUN_0045705e(param_1, param_2);
    FUN_00458a3b(param_1, param_2);
    FUN_004941ee(4);
    FUN_00410030(s_CANCELALLY_00626df0, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
    _MEM[DAT_0064c6be + param_1 * 0x594] = (_MEM[DAT_0064c6be + param_1 * 0x594] + 1);
    FUN_00467ef2(param_1, param_2);
  }
  return uVar4;
}


 export function FUN_0045dd7f (param_1, param_2)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let uVar7;
  let pbVar8;
  let uVar9;
  let unaff_FS_OFFSET;
  let uVar10;
  let local_33c;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_320;
  let local_314;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045f099;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
 LAB_0045ddb7: :
  do {
    FUN_00458a3b(param_1, param_2);
    iVar4 = FUN_00421ea0(s_FAVORMENU_00626dfc);
    if ((iVar4 === 0)) {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      local_8 = -1;
      FUN_0045f08d();
      FUN_0045f0a3();
      return;
    }
    if ((iVar4 === 1)) {
      iVar5 = FUN_0045950b(param_1, param_2, -1, -1, 0, 0);
      if (((s8(cVar1) + 1) < iVar5)) {
        _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 1);
        goto LAB_0045ddb7;
      }
      FUN_004b0b53(0xff, 2, 0, 0, 0);
    }
    if ((iVar4 !== 2));
    for (/* cond: (local_338 < 8) */); local_338 = (local_338 < 8); local_338 = (local_338 + 1)) {
      if ((local_338 !== param_1)) {
        uVar10 = 0;
        iVar5 = local_338;
        uVar6 = FUN_00493c7d(local_338, local_338, 0);
        FUN_0059edf0(uVar6, iVar5, uVar10);
      }
    }
    iVar5 = FUN_0040bc80(0);
    if ((iVar5 !== 0)) {
      uVar6 = FUN_00493c7d(iVar5);
      FUN_0040ff60(1, uVar6);
      if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)] & 1) === 0)) {
        FUN_004941ee(3);
        FUN_00421ea0(s_NOCONTACT_00626e14);
        local_8 = -1;
        FUN_0045f08d();
        FUN_0045f0a3();
        return;
      }
      if (((_MEM[DAT_0064c6c1 + (iVar5 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
        FUN_004941ee(3);
        FUN_00421ea0(s_ATWAR_00626e20);
        local_8 = -1;
        FUN_0045f08d();
        FUN_0045f0a3();
        return;
      }
      local_14 = FUN_005adfa0(((((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) + (s32((DAT_0064c6a2 + param_2 * 0x594), 0) / 0x64 | 0)) - u8(_MEM[DAT_0064c6be + iVar5 * 0x594])) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) * (((s16((DAT_0064c70e + iVar5 * 0x594), 0)) & 0xFFFF) >> 1) / 0x32 | 0), 2, 0x1f4);
      local_14 = local_14 * 0x32;
      if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)] & 6) === 0)) {
        local_14 = (local_14 - (local_14 / 3 | 0));
      }
      if ((s32((DAT_0064c6a2 + param_2 * 0x594), 0) < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
        local_14 = (local_14 + (local_14 / 3 | 0));
      }
      if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)] & 8) !== 0)) {
        if ((0x1b58 < local_14)) {
          local_14 = 0x1b58;
        }
        local_14 = FUN_005adfa0(local_14 * 3, 0x1f4, 0x61a8);
      }
      if ((4 < s16((DAT_0064c708 + iVar5 * 0x594), 0))) {
        local_14 = (local_14 / 2 | 0);
      }
      if (((_MEM[DAT_0064c6c1 + (iVar5 * 4 + param_1 * 0x594)] & 0x20) === 0)) {
        local_14 = (local_14 + (local_14 / 3 | 0));
      }
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
        bVar3 = 1;
        for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
          if (((_MEM[DAT_0064c6c1 + (local_18 * 4 + param_2 * 0x594)] & 0x20) !== 0)) {
            bVar3 = 0;
          }
        }
        if (bVar3) {
          local_14 = (local_14 - ((local_14 + ((local_14 >> 0x1f) & 3)) >> 2));
        }
        if (((_MEM[DAT_0064c6c1 + (iVar5 * 0x594 + param_1 * 4)] & 0x10) !== 0)) {
          local_14 = (local_14 - ((local_14 + ((local_14 >> 0x1f) & 3)) >> 2));
        }
        if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + param_2])) {
          local_14 = (local_14 - (local_14 / 3 | 0));
        }
      }
      if (((_MEM[DAT_0064c6c2 + (iVar5 * 0x594 + param_1 * 4)] & 2) !== 0)) {
        if (((_MEM[DAT_0064c6c2 + (iVar5 * 4 + param_1 * 0x594)] & 2) === 0)) {
          local_14 = (local_14 / 2 | 0);
        }
        if ((_MEM[DAT_00655c22 + param_1] < _MEM[DAT_00655c22 + iVar5])) {
          local_14 = (local_14 / 2 | 0);
        }
      }
      local_14 = FUN_005adfa0((local_14 / 0x64 | 0), 1, 0x1f4);
      local_14 = local_14 * 0x32;
      FUN_00421da0(0, local_14);
      local_324 = ((u8(_MEM[DAT_0064c6be + param_1 * 0x594]) - s8(_MEM[DAT_0064c6e8 + (param_2 * 0x594 + param_1)])) - s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16) * 0x30]));
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 0x10) !== 0)) {
        local_324 = (local_324 + 2);
      }
      if (((_MEM[DAT_0064c6c1 + (iVar5 * 4 + param_1 * 0x594)] & 0x20) === 0)) {
        local_324 = (local_324 + 1);
      }
      if ((_MEM[DAT_00655c22 + iVar5] < _MEM[DAT_00655c22 + param_1])) {
        local_324 = (local_324 + 1);
      }
      if ((_MEM[DAT_00655c22 + param_2] < _MEM[DAT_00655c22 + param_1])) {
        local_324 = (local_324 + 1);
      }
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) !== 0)) {
        local_324 = (local_324 / 2 | 0);
      }
      if ((_MEM[DAT_00655c22 + iVar5] < _MEM[DAT_00655c22 + param_1])) {
        FUN_004941ee(3);
        FUN_00421ea0(s_HELLNOWEWONTGO_00626e28);
        local_8 = -1;
        FUN_0045f08d();
        FUN_0045f0a3();
        return;
      }
      if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)] & 8) === 0)) {
        if ((DAT_0064b10c < 0)) {
          local_334 = FUN_00421ea0(s_MERCENARY_00626e54);
        }
        else {
          local_14 = -1;
          FUN_004271e8(2, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
          FUN_004271e8(3, s32((DAT_00627684 + DAT_0064b10c * 0x10), 0));
          local_334 = FUN_00421ea0(s_CYBERCOP_00626e48);
        }
      }
      else {
        FUN_004941ee(4);
        local_334 = FUN_00421ea0(s_ETERNALALLIES_00626e38);
      }
      if ((local_334 === 0)) {
        local_8 = -1;
        FUN_0045f08d();
        FUN_0045f0a3();
        return;
      }
      if ((local_14 < 0)) {
        FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
        FUN_004bf05b(param_2, DAT_0064b10c, param_1, 0, 0);
        wv(DAT_0064b124, -1);
        wv(DAT_0064b10c, -1);
      }
      else {
        if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < local_14)) {
          FUN_004941ee(3);
          FUN_00421ea0(s_UNFORTUNATE_00626e60);
          local_8 = -1;
          FUN_0045f08d();
          FUN_0045f0a3();
          return;
        }
        w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - local_14));
        w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + local_14));
      }
      FUN_0056a65e(1);
      FUN_00467825(param_2, iVar5, 0x2401);
      w32((DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (iVar5 * 4 + param_2 * 0x594)), 0) | 0x80800));
      w32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0) | 0x100000));
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      uVar6 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar6);
      uVar6 = FUN_00493c7d(iVar5);
      FUN_0040ff60(2, uVar6);
      FUN_00421ea0(s_MERCDECLARE_00626e6c);
      if ((2 < DAT_00655b02)) {
        if ((DAT_006d1da0 !== param_2)) {
          FUN_00511880(0x62, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
        }
        local_338 = ((iVar5) & 0xFF);
        if ((DAT_006d1da0 !== iVar5)) {
          FUN_00511880(0x62, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar5 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
        }
      }
      uVar6 = FUN_00410070(iVar5);
      FUN_0040ff60(1, uVar6);
      if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_1 * 0x594)] & 8) === 0)) {
        if (((_MEM[DAT_0064c6c0 + (iVar5 * 4 + param_1 * 0x594)] & 4) !== 0)) {
          uVar7 = _rand();
          uVar9 = (uVar7 >> 0x1f);
          if ((((((uVar7 ^ uVar9) - uVar9) & 1) ^ uVar9) === uVar9)) {
            FUN_00456f20(iVar5, param_1, 0x19);
            FUN_004941ee(4);
            FUN_00421ea0(s_MERCBETRAY_00626e88);
            FUN_00467825(param_1, iVar5, 0x2000);
            w32((DAT_0064c6c0 + (iVar5 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (iVar5 * 0x594 + param_1 * 4)), 0) | 0x10));
          }
        }
      }
      else {
        uVar7 = _rand();
        uVar9 = (uVar7 >> 0x1f);
        if ((((((uVar7 ^ uVar9) - uVar9) & 1) ^ uVar9) === uVar9)) {
          FUN_00456f20(iVar5, param_1, 0x19);
          FUN_004941ee(4);
          FUN_00421ea0(s_MERCBETRAYALLY_00626e78);
          FUN_00467ef2(param_1, iVar5);
        }
      }
      FUN_004b0b53(0xff, 2, 0, 0, 0);
 LAB_0045eb0a: :
      if ((iVar4 === 3)) {
        if ((iVar4 === 0)) {
          uVar6 = FUN_00410070(param_1);
          FUN_0040ff60(1, uVar6);
          FUN_004941ee(3);
          FUN_00421ea0(s_MAPNO_00626e94);
          local_8 = -1;
          FUN_0045f08d();
          FUN_0045f0a3();
          return;
        }
        FUN_004941ee(2);
        FUN_00421ea0(s_MAPYES_00626e9c);
        _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 2);
        uVar7 = (1 << (((param_2) & 0xFF) & 0x1f));
        uVar9 = (1 << (((param_1) & 0xFF) & 0x1f));
        local_320 = 0;
        local_314 = 0;
        FUN_005b9ec6();
        for (/* cond: (local_18 < ((DAT_006d1164) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_006d1164) << 16 >> 16)); local_18 = (local_18 + 1)) {
          iVar4 = FUN_005b8931(local_314, local_320);
          if (((uVar7 & u8(_MEM[(iVar4 + 4)])) === 0)) {
            if ((param_1 !== 0)) {
              iVar4 = FUN_005b8931(local_314, local_320, param_2, 1, 1);
              bVar2 = _MEM[(iVar4 + 1)];
              pbVar8 = FUN_005b898b(local_314, local_320, param_1);
              FUN_005b9d81(local_314, local_320, (bVar2 & _MEM[pbVar8]));
            }
          }
          else {
            FUN_005b976d(local_314, local_320, uVar9, 1, 1);
            if ((param_1 !== 0)) {
              iVar4 = FUN_005b8931(local_314, local_320, param_1, 1, 1);
              bVar2 = _MEM[(iVar4 + 1)];
              pbVar8 = FUN_005b898b(local_314, local_320, param_2);
              FUN_005b9d81(local_314, local_320, (bVar2 & _MEM[pbVar8]));
            }
          }
          local_314 = (local_314 + 2);
          if ((((DAT_006d1160) << 16 >> 16) <= local_314)) {
            local_320 = (local_320 + 1);
            local_314 = (local_320 & 1);
          }
        }
        FUN_005b9f1c();
        for (/* cond: (local_33c < ((DAT_00655b16) << 16 >> 16)) */); local_32c = ((uVar7) & 0xFF), local_33c = (local_33c < ((DAT_00655b16) << 16 >> 16));
            local_33c = (local_33c + 1)) {
          if ((s32((DAT_0065610a + local_33c * 0x20), 0) !== 0)) {
            if ((s8(_MEM[DAT_006560f7 + local_33c * 0x20]) !== param_2)) {
              if ((s8(_MEM[DAT_006560f7 + local_33c * 0x20]) === param_1)) {
                _MEM[DAT_006560f9 + local_33c * 0x20] = (_MEM[DAT_006560f9 + local_33c * 0x20] | local_32c);
              }
            }
            else {
              local_330 = ((uVar9) & 0xFF);
              _MEM[DAT_006560f9 + local_33c * 0x20] = (_MEM[DAT_006560f9 + local_33c * 0x20] | local_330);
            }
          }
        }
        for (/* cond: (local_328 < ((DAT_00655b18) << 16 >> 16)) */); local_328 = (local_328 < ((DAT_00655b18) << 16 >> 16)); local_328 = (local_328 + 1)) {
          if ((s32((DAT_0064f394 + local_328 * 0x58), 0) !== 0)) {
            if ((s8(_MEM[DAT_0064f348 + local_328 * 0x58]) !== param_2)) {
              if ((s8(_MEM[DAT_0064f348 + local_328 * 0x58]) === param_1)) {
                _MEM[DAT_0064f34c + local_328 * 0x58] = (_MEM[DAT_0064f34c + local_328 * 0x58] | local_32c);
              }
            }
            else {
              FUN_0043cc00(local_328, param_1);
            }
          }
        }
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0047cf9e(DAT_006d1da0, 1);
      }
      local_8 = -1;
      FUN_0045f08d();
      FUN_0045f0a3();
      return;
    }
  } while ( true );
}


 export function FUN_0045f08d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0045f0a3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0045f0b1 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let uVar8;
  let unaff_FS_OFFSET;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_320;
  let local_20;
  let local_1c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0045fd4f;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_00458a3b(param_1, param_2);
  iVar2 = FUN_00421ea0(s_GIFTMENU_00626ea4);
  if ((iVar2 === 0)) {
    _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
    local_8 = -1;
    FUN_0045fd43();
    FUN_0045fd59();
    return;
  }
  if ((iVar2 === 1)) {
    FUN_0045950b(param_1, param_2, -1, -1, 0, 1);
    if ((DAT_0064b124 < 0)) {
      uVar3 = FUN_00493c7d(param_1);
      FUN_0040ff60(1, uVar3);
      FUN_004941ee(4);
      FUN_00421ea0(s_KNOWNO_00626eb0);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    FUN_004271e8(1, s32((DAT_00627684 + DAT_0064b124 * 0x10), 0));
    if ((DAT_0064b10c < 0)) {
      local_338 = FUN_00421ea0(s_TECHGIFT_00626eb8);
    }
    else {
      FUN_004271e8(2, s32((DAT_00627684 + DAT_0064b10c * 0x10), 0));
      local_338 = FUN_00421ea0(s_TECHGIFT2_00626ec4);
    }
    if ((local_338 !== 0)) {
      if ((local_338 === 1)) {
        local_14 = FUN_004bdb2c(param_2, DAT_0064b124);
        local_14 = (local_14 << 2);
        FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
      }
      else {
        local_14 = FUN_004bdb2c(param_2, DAT_0064b124);
        local_14 = local_14 * 2;
        FUN_004bf05b(param_2, DAT_0064b10c, param_1, 0, 0);
      }
      FUN_00456f20(param_2, param_1, (-local_14));
      FUN_00458a3b(param_1, param_2);
      uVar3 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar3);
      FUN_004941ee(2);
      FUN_00421ea0(s_ACCEPT_00626ed8);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] - (((DAT_0064b0f0) & 0xFF) + 2));
      wv(DAT_0064b0f0, (DAT_0064b0f0 + 1));
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    FUN_004941ee(4);
    FUN_00421ea0(s_WASTING_00626ed0);
    local_8 = -1;
    FUN_0045fd43();
    FUN_0045fd59();
    return;
  }
  if ((iVar2 === 2)) {
    FUN_0043c9d0(s_MONEYGIFT_00626ee0);
    iVar2 = s32((DAT_0064c6a2 + param_1 * 0x594), 0);
    local_1c = 0;
    for (/* cond: (local_20 < 5) */); local_20 = (local_20 < 5); local_20 = (local_20 + 1)) {
      iVar4 = local_20 * (iVar2 / 0x32 | 0);
      iVar4 = ((iVar4 + ((iVar4 >> 0x1f) & 3)) >> 2) * 0x32;
      if ((local_1c !== iVar4)) {
        FUN_0040bbb0();
        FUN_0040bc10(0x72);
        FUN_0040fe10();
        FUN_0043c8a0(iVar4);
        FUN_0059edf0(DAT_00679640, iVar4, 0);
        local_1c = iVar4;
      }
    }
    iVar2 = FUN_0040bc80(0);
    if ((iVar2 !== 0)) {
      w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) - iVar2));
      w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) + iVar2));
      FUN_0056a65e(1);
      iVar2 = FUN_0045b472(iVar2);
      FUN_00456f20(param_2, param_1, (-(iVar2 * 3 / 2 | 0)));
      FUN_00458a3b(param_1, param_2);
      uVar3 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar3);
      FUN_004941ee(2);
      FUN_00421ea0(s_ACCEPT_00626ef4);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] - (((DAT_0064b0f0) & 0xFF) + 2));
      wv(DAT_0064b0f0, (DAT_0064b0f0 + 1));
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    FUN_004941ee(4);
    FUN_00421ea0(s_WASTING_00626eec);
    local_8 = -1;
    FUN_0045fd43();
    FUN_0045fd59();
    return;
  }
  if ((iVar2 === 3)) {
    local_32c = 0;
    FUN_0040ffa0(s_MILITARYSOURCE_00626efc, 1);
    for (/* cond: (local_334 < ((DAT_00655b18) << 16 >> 16)) */); local_334 = (local_334 < ((DAT_00655b18) << 16 >> 16)); local_334 = (local_334 + 1)) {
      if ((s8(_MEM[DAT_0064f348 + local_334 * 0x58]) === param_1)) {
        FUN_0059edf0((DAT_0064f360 + local_334 * 0x58), local_334, 0);
        local_32c = (local_32c + 1);
      }
    }
    if ((local_32c === 0)) {
      FUN_00421ea0(s_MILITARYNONE_00626f0c);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    iVar2 = FUN_0040bc80(0);
    if ((iVar2 < 0)) {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    iVar4 = FUN_005b2e69(((s16((DAT_0064f340 + iVar2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16));
    if ((iVar4 < 0)) {
      FUN_00421ea0(s_MILITARYNONE_00626f1c);
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    iVar5 = FUN_0043d07a(((s16((DAT_0064f340 + iVar2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16), param_2, -1, -1);
    if ((s16((DAT_0064c70e + param_1 * 0x594), 0) < s16((DAT_0064c70e + param_2 * 0x594), 0))) {
      uVar3 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar3);
      FUN_004941ee(4);
      FUN_00421ea0(s_MILITARYNO_00626f2c);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    FUN_0040bbb0();
    FUN_0040bc10(0x77);
    FUN_0040fe10();
    FUN_0040bbe0((DAT_0064f360 + iVar2 * 0x58));
    iVar4 = FUN_005b6aea(iVar4, DAT_00679640, 1);
    if ((iVar4 < 0)) {
      _MEM[DAT_0064c6bf + param_2 * 0x594] = (_MEM[DAT_0064c6bf + param_2 * 0x594] + 0xff);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    if ((iVar6 !== 0)) {
      uVar3 = FUN_00410070(param_2);
      FUN_0040ff60(1, uVar3);
      FUN_004941ee(4);
      FUN_00421ea0(s_MILITARYNO_00626f38);
      local_8 = -1;
      FUN_0045fd43();
      FUN_0045fd59();
      return;
    }
    FUN_005b319e(iVar4, 1);
    _MEM[DAT_0064c778 + (param_1 * 0x594 + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]))] = (_MEM[DAT_0064c778 + (param_1 * 0x594 + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]))] + 0xff);
    _MEM[DAT_006560f7 + iVar4 * 0x20] = ((param_2) & 0xFF);
    _MEM[DAT_006560f9 + iVar4 * 0x20] = 0;
    _MEM[DAT_0064c778 + (param_2 * 0x594 + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]))] = (_MEM[DAT_0064c778 + (param_2 * 0x594 + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]))] + 1);
    FUN_005b345f(iVar4, ((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16), 1);
    _MEM[DAT_00656100 + iVar4 * 0x20] = 0xff;
    local_320 = s8(_MEM[DAT_0064b1c8 + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]) * 0x14]) * 3;
    iVar6 = FUN_004bd9f0(param_2, s8(_MEM[DAT_0064b1cb + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]) * 0x14]));
    if ((iVar6 !== 0)) {
      local_320 = (local_320 / 2 | 0);
    }
    FUN_0050c679(iVar5);
    FUN_0047cea6(((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
    FUN_0050c679(iVar2);
    FUN_0047cea6(((s16((DAT_0064f340 + iVar2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16));
    FUN_00456f20(param_2, param_1, (-local_320));
    uVar3 = FUN_00410070(param_2);
    FUN_0040ff60(1, uVar3);
    FUN_004941ee(2);
    FUN_00421ea0(s_ACCEPT_00626f44);
    iVar2 = FUN_004bd9f0(param_2, s8(_MEM[DAT_0064b1cb + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]) * 0x14]));
    if ((iVar2 === 0)) {
      cVar1 = _MEM[DAT_0064b1cb + u8(_MEM[DAT_006560f6 + iVar4 * 0x20]) * 0x14];
      local_328 = -1;
      for (/* cond: (local_330 < 0x64) */); local_330 = (local_330 < 0x64); local_330 = (local_330 + 1)) {
        iVar2 = FUN_004bd9f0(param_2, local_330);
        if ((iVar2 !== 0)) {
          local_328 = local_330;
          break;
        }
      }
      if ((0 < local_328)) {
        uVar7 = _rand();
        uVar8 = (uVar7 >> 0x1f);
        if ((((((uVar7 ^ uVar8) - uVar8) & 1) ^ uVar8) === uVar8)) {
          uVar3 = FUN_00410070(param_2);
          FUN_0040ff60(1, uVar3);
          FUN_00421ea0(s_BREAKTHROUGH_00626f4c);
          FUN_004bf05b(param_2, local_328, param_1, 0, 0);
        }
      }
    }
  }
  local_8 = -1;
  FUN_0045fd43();
  FUN_0045fd59();
  return;
}


 export function FUN_0045fd43 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0045fd59 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0045fd67 (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  if ((DAT_00654fa8 === 0)) {
    uVar1 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar1);
    iVar2 = FUN_00453e51(param_1, 0x18);
    if ((iVar2 === 0)) {
      FUN_00421ea0(s_CONTINUEHAWKS_00626f68);
    }
    else {
      FUN_00421ea0(s_CONTINUEUN_00626f5c);
    }
  }
  return;
}


 export function FUN_0045fe19 (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00460110;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_00458a3b(param_1, param_2);
  FUN_0043c9d0(s_DIPLOMACY_00626f78);
  iVar3 = FUN_004a2379(DAT_006558e8, s_DIPLOMACYMENU_00626f84);
  if ((iVar3 === 0)) {
    FUN_004a23fc(1);
    FUN_0059edf0(DAT_00679640, 0, 0);
    bVar2 = 0;
    bVar1 = 0;
    if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
      if (((_MEM[DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)] & 4) !== 0)) {
        bVar1 = 1;
      }
    }
    else {
      bVar2 = 1;
    }
    FUN_004a23fc(1);
    if (bVar1) {
      FUN_0059edf0(DAT_00679640, 1, 0);
    }
    FUN_004a23fc(1);
    if ((!bVar2)) {
      FUN_0059edf0(DAT_00679640, 2, 0);
    }
    FUN_004a23fc(1);
    if (bVar2) {
      FUN_0059edf0(DAT_00679640, 3, 0);
    }
    FUN_004a23fc(1);
    if ((_MEM[DAT_0064c6b5 + param_1 * 0x594] < 5)) {
      FUN_0059edf0(DAT_00679640, 4, 0);
    }
    FUN_004a23fc(1);
    if (((_MEM[DAT_0064c6c1 + (param_1 * 4 + param_2 * 0x594)] & 0x40) === 0)) {
      FUN_0059edf0(DAT_00679640, 5, 0);
    }
    FUN_004a23fc(1);
    if (bVar2) {
      FUN_0059edf0(DAT_00679640, 6, 0);
    }
    FUN_004a23fc(1);
    FUN_0059edf0(DAT_00679640, 7, 0);
    FUN_004a23fc(1);
    FUN_0059edf0(DAT_00679640, 8, 0);
    FUN_0040bc80(0);
  }
  FUN_004a2020();
  local_8 = -1;
  FUN_00460104();
  FUN_0046011a();
  return;
}
