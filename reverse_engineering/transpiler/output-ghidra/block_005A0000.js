// Block 0x005A0000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 111

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408330, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408680, FUN_004086c0, FUN_00408d33, FUN_0040bbb0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040bc80, FUN_0040ef50, FUN_0040ef70, FUN_0040efd0, FUN_0040f380, FUN_0040f570 } from './block_00400000.js';
import { FUN_0040f680, FUN_0040f7d0, FUN_0040f840, FUN_0040f880, FUN_0040f930, FUN_0040f9d0 } from './block_00400000.js';
import { FUN_0040fad0, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80 } from './block_00400000.js';
import { FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60 } from './block_00400000.js';
import { FUN_0040ffa0, SetDlgCtrlID } from './block_00400000.js';
import { FUN_00410030, FUN_00410402, FUN_00413476, FUN_00414be0, FUN_00414c20, FUN_00414c60 } from './block_00410000.js';
import { FUN_00414ca0, FUN_00414ce0, FUN_00414d10, FUN_00414d40, FUN_00418740, FUN_00418770 } from './block_00410000.js';
import { FUN_00418870, FUN_004189c0, FUN_00418a30, FUN_00418a70, FUN_00418ce0, FUN_00418d20 } from './block_00410000.js';
import { FUN_00418d60, FUN_00418d90, FUN_00418e00, FUN_00418ea0, FUN_00418f40, FUN_00419020 } from './block_00410000.js';
import { FUN_004190a0, FUN_004190d0, FUN_00419b80, FUN_00419c8b, FUN_0041a046, FUN_0041a422 } from './block_00410000.js';
import { FUN_0041a5c4, FUN_0041b8ff, FUN_0041d417, FUN_0041d7ea, FUN_0041dd0e, FUN_0041e864 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421da0, FUN_00421e70, FUN_00426fb0, FUN_00426ff0 } from './block_00420000.js';
import { FUN_00428b0c, FUN_0042a768 } from './block_00420000.js';
import { FUN_0043856b, FUN_0043c7c0, FUN_0043ca10 } from './block_00430000.js';
import { FUN_00447210, FUN_004472f0, FUN_0044c5a0, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00451830, FUN_00451860, FUN_004518d0, FUN_004519b0, FUN_00451a60, FUN_00451ac0 } from './block_00450000.js';
import { FUN_00451bf0, FUN_00452768, FUN_00452c14, FUN_00453af0, FUN_00453ba0, SetHelpID } from './block_00450000.js';
import { tie } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e020 } from './block_00460000.js';
import { FUN_00472cf0, FUN_00477d8c, FUN_0047cf9e, FUN_0047df20, FUN_0047df50, FUN_0047e94e } from './block_00470000.js';
import { GetActiveView } from './block_00470000.js';
import { FUN_004824e3, FUN_004828a5, FUN_00486e6f, FUN_00487007, FUN_0048710a, FUN_00487371 } from './block_00480000.js';
import { FUN_00489553, FUN_004897fa, FUN_0048a416, FUN_0048a92d, FUN_0048aa24, FUN_0048aedc } from './block_00480000.js';
import { FUN_0048b165, FUN_0048d9ad, FUN_0048da51, FUN_0048dab9 } from './block_00480000.js';
import { FUN_004923c0, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497d00 } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a6980, FUN_004a73d9, FUN_004a9785 } from './block_004A0000.js';
import { FUN_004aa9c0, FUN_004aef20, FUN_004aef36 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bb540, FUN_004bb5e0, FUN_004bb800 } from './block_004B0000.js';
import { FUN_004ccab9, FUN_004ccdb6, FUN_004ccdef, FUN_004ccf2d, FUN_004cefe9 } from './block_004C0000.js';
import { FUN_004e4ceb, FUN_004e7240 } from './block_004E0000.js';
import { FUN_004f4793, FUN_004f6244, FUN_004f6564, FUN_004f6646, FUN_004f7bd1, FUN_004f8a9b } from './block_004F0000.js';
import { FUN_004fba0c, FUN_004fba9c, FUN_004fbb2f, FUN_004fbbdd } from './block_004F0000.js';
import { FUN_0051d63b, FUN_0051d7bc, FUN_0051d7d6, FUN_0051d817, FUN_0051dd97, FUN_0051f19c } from './block_00510000.js';
import { FUN_005218cb, FUN_00521fe0, FUN_0052263c, FUN_005226fa, FUN_005227e3, FUN_00522dfa } from './block_00520000.js';
import { FUN_00522f8f } from './block_00520000.js';
import { FUN_00530eb0, FUN_00531010, FUN_005310a0, FUN_005311b0, FUN_005311e0 } from './block_00530000.js';
import { FUN_00543cd6, FUN_0054a4c4 } from './block_00540000.js';
import { FUN_00551d80, FUN_00551dc0, FUN_00552112, FUN_0055a567, FUN_0055a930, FUN_0055ae80 } from './block_00550000.js';
import { FUN_0055af2e } from './block_00550000.js';
import { FUN_00568e86, FUN_00569363, FUN_0056a65e } from './block_00560000.js';
import { FUN_00573e59, width } from './block_00570000.js';
import { FUN_00589ef8, FUN_0058b47e } from './block_00580000.js';
import { FUN_0059b293, FUN_0059c276, FUN_0059c2b8, FUN_0059d3c9, FUN_0059db08, FUN_0059db65 } from './block_00590000.js';
import { FUN_0059df8a, FUN_0059dfb9, FUN_0059e18b, FUN_0059e448, FUN_0059e4e6, FUN_0059e5c9 } from './block_00590000.js';
import { FUN_0059e648, FUN_0059e6a9, FUN_0059e6ff, FUN_0059e783, FUN_0059ea99, FUN_0059ec88 } from './block_00590000.js';
import { FUN_0059edf0, FUN_0059f026, FUN_0059f06d, FUN_0059f2a3, FUN_0059f3d7, FUN_0059f64a } from './block_00590000.js';
import { FUN_0059fb78, FUN_0059fc19, FUN_0059fcba, FUN_0059fd2a } from './block_00590000.js';
import { FUN_005b09dc, FUN_005b6787, FUN_005bb3f0, FUN_005bb4ae, FUN_005bc9a3 } from './block_005B0000.js';
import { FUN_005c0034, FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c041f, FUN_005c0593 } from './block_005C0000.js';
import { FUN_005c0d69, FUN_005c0f57, FUN_005c1167, FUN_005c11b2, FUN_005c19ad, FUN_005c61b0 } from './block_005C0000.js';
import { FUN_005cd775, FUN_005cda06, FUN_005cef31, GetCheckStyle, InvalidateObjectCache, delbuf } from './block_005C0000.js';
import { EnableStackedTabs, FUN_005d23bb, FUN_005d25a8, FUN_005d25c0, FUN_005d268e, FUN_005d3cff } from './block_005D0000.js';
import { FUN_005d3d62, FUN_005d4014, FUN_005d4167, FUN_005d8236, FUN_005dae6b, FUN_005db0d0 } from './block_005D0000.js';
import { ~_Timevec } from './block_005D0000.js';
import { FID_conflict:__toupper_lk, FUN_005f22d0, FUN_005f22e0, __chdir, __strcmpi, __strnicmp } from './block_005F0000.js';
import { _atoi, _fputs, _isalpha, _isdigit, _memset, _rand } from './block_005F0000.js';
import { _sprintf, _strchr, _strcmp, _strlen, _strncpy, `eh_vector_constructor_iterator' } from './block_005F0000.js';
import { `eh_vector_destructor_iterator', operator_delete, operator_new } from './block_005F0000.js';
// Unresolved: XD_FlushSendBuffer

const DAT_00627684 = globalThis.DAT_00627684, DAT_0062cd24 = globalThis.DAT_0062cd24, DAT_006359d4 = globalThis.DAT_006359d4, DAT_00635a58 = globalThis.DAT_00635a58, DAT_00635b70 = globalThis.DAT_00635b70, DAT_00635b84 = globalThis.DAT_00635b84;
const DAT_00635bb8 = globalThis.DAT_00635bb8, DAT_00635bbc = globalThis.DAT_00635bbc, DAT_00635d94 = globalThis.DAT_00635d94, DAT_00635d98 = globalThis.DAT_00635d98, DAT_00635d9c = globalThis.DAT_00635d9c, DAT_00635da0 = globalThis.DAT_00635da0;
const DAT_00635da4 = globalThis.DAT_00635da4, DAT_00635da8 = globalThis.DAT_00635da8, DAT_00635de0 = globalThis.DAT_00635de0, DAT_00635e60 = globalThis.DAT_00635e60, DAT_00635eb8 = globalThis.DAT_00635eb8, DAT_00635ed8 = globalThis.DAT_00635ed8;
const DAT_00635f08 = globalThis.DAT_00635f08, DAT_00635f0c = globalThis.DAT_00635f0c, DAT_00635f10 = globalThis.DAT_00635f10, DAT_00635f14 = globalThis.DAT_00635f14, DAT_00635f18 = globalThis.DAT_00635f18, DAT_00635f1c = globalThis.DAT_00635f1c;
const DAT_00635f20 = globalThis.DAT_00635f20, DAT_00635f24 = globalThis.DAT_00635f24, DAT_00635f28 = globalThis.DAT_00635f28, DAT_00635f2c = globalThis.DAT_00635f2c, DAT_00635f30 = globalThis.DAT_00635f30, DAT_00635f34 = globalThis.DAT_00635f34;
const DAT_00635f38 = globalThis.DAT_00635f38, DAT_00635f40 = globalThis.DAT_00635f40, DAT_00635fbc = globalThis.DAT_00635fbc, DAT_0063cc48 = globalThis.DAT_0063cc48, DAT_0063fc58 = globalThis.DAT_0063fc58, DAT_00641848 = globalThis.DAT_00641848;
const DAT_0064b1b8 = globalThis.DAT_0064b1b8, DAT_0064b1bc = globalThis.DAT_0064b1bc, DAT_0064b1bd = globalThis.DAT_0064b1bd, DAT_0064b1c0 = globalThis.DAT_0064b1c0, DAT_0064b1c1 = globalThis.DAT_0064b1c1, DAT_0064b1c2 = globalThis.DAT_0064b1c2;
const DAT_0064b1c3 = globalThis.DAT_0064b1c3, DAT_0064b1c4 = globalThis.DAT_0064b1c4, DAT_0064b1c5 = globalThis.DAT_0064b1c5, DAT_0064b1c6 = globalThis.DAT_0064b1c6, DAT_0064b1c7 = globalThis.DAT_0064b1c7, DAT_0064b1c8 = globalThis.DAT_0064b1c8;
const DAT_0064b1c9 = globalThis.DAT_0064b1c9, DAT_0064b1ca = globalThis.DAT_0064b1ca, DAT_0064b1cb = globalThis.DAT_0064b1cb, DAT_0064ba48 = globalThis.DAT_0064ba48, DAT_0064bb08 = globalThis.DAT_0064bb08, DAT_0064f340 = globalThis.DAT_0064f340;
const DAT_0064f342 = globalThis.DAT_0064f342, DAT_0064f344 = globalThis.DAT_0064f344, DAT_0064f348 = globalThis.DAT_0064f348, DAT_0064f394 = globalThis.DAT_0064f394, DAT_00654b60 = globalThis.DAT_00654b60, DAT_00654da4 = globalThis.DAT_00654da4;
const DAT_00655020 = globalThis.DAT_00655020, DAT_006553d8 = globalThis.DAT_006553d8, DAT_006560f0 = globalThis.DAT_006560f0, DAT_006560f2 = globalThis.DAT_006560f2, DAT_006560f7 = globalThis.DAT_006560f7, DAT_0065610a = globalThis.DAT_0065610a;
const DAT_00666590 = globalThis.DAT_00666590, DAT_00679640 = globalThis.DAT_00679640, DAT_0067a798 = globalThis.DAT_0067a798, DAT_006a1d88 = globalThis.DAT_006a1d88, DAT_006a1daf = globalThis.DAT_006a1daf, DAT_006a2a00 = globalThis.DAT_006a2a00;
const DAT_006a2d28 = globalThis.DAT_006a2d28, DAT_006a2d2c = globalThis.DAT_006a2d2c, DAT_006a2d30 = globalThis.DAT_006a2d30, DAT_006a2d34 = globalThis.DAT_006a2d34, DAT_006a2d38 = globalThis.DAT_006a2d38, DAT_006a2d3c = globalThis.DAT_006a2d3c;
const DAT_006a2d40 = globalThis.DAT_006a2d40, DAT_006a2d44 = globalThis.DAT_006a2d44, DAT_006a2d48 = globalThis.DAT_006a2d48, DAT_006a2d4c = globalThis.DAT_006a2d4c, DAT_006a2d50 = globalThis.DAT_006a2d50, DAT_006a2d54 = globalThis.DAT_006a2d54;
const DAT_006a2d58 = globalThis.DAT_006a2d58, DAT_006a6668 = globalThis.DAT_006a6668, DAT_006a66b0 = globalThis.DAT_006a66b0, DAT_006a8c00 = globalThis.DAT_006a8c00, DAT_006ad30c = globalThis.DAT_006ad30c, DAT_006ad35c = globalThis.DAT_006ad35c;
const DAT_006ad558 = globalThis.DAT_006ad558, DAT_006ad644 = globalThis.DAT_006ad644, DAT_006af220 = globalThis.DAT_006af220, DAT_006af240 = globalThis.DAT_006af240, DAT_006cec90 = globalThis.DAT_006cec90, DAT_006cecb0 = globalThis.DAT_006cecb0;
const DAT_006ced20 = globalThis.DAT_006ced20, DAT_fffffb68 = globalThis.DAT_fffffb68, DAT_fffffb78 = globalThis.DAT_fffffb78, DAT_fffffb88 = globalThis.DAT_fffffb88, DAT_fffffba0 = globalThis.DAT_fffffba0, DAT_fffffbcc = globalThis.DAT_fffffbcc;
const DAT_fffffbf4 = globalThis.DAT_fffffbf4, DAT_fffffcdc = globalThis.DAT_fffffcdc, DAT_fffffcec = globalThis.DAT_fffffcec, DAT_fffffe84 = globalThis.DAT_fffffe84, DAT_fffffed8 = globalThis.DAT_fffffed8, DAT_fffffeec = globalThis.DAT_fffffeec;
const DAT_ffffff1c = globalThis.DAT_ffffff1c, DAT_ffffff4c = globalThis.DAT_ffffff4c, DAT_ffffff70 = globalThis.DAT_ffffff70, DAT_ffffff7c = globalThis.DAT_ffffff7c, DAT_ffffff94 = globalThis.DAT_ffffff94, DAT_ffffffa4 = globalThis.DAT_ffffffa4;
const DAT_ffffffb4 = globalThis.DAT_ffffffb4, DAT_ffffffc4 = globalThis.DAT_ffffffc4, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0;
const DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, PTR_DAT_00635a48 = globalThis.PTR_DAT_00635a48, s_%s_-_%s_00635fc4 = globalThis.s_%s_-_%s_00635fc4, s_ABILITIES_00635fcc = globalThis.s_ABILITIES_00635fcc;
const s_BUTTON_00635b94 = globalThis.s_BUTTON_00635b94, s_CASUALTIES_00635ca4 = globalThis.s_CASUALTIES_00635ca4, s_CASUALTIES_00635d48 = globalThis.s_CASUALTIES_00635d48, s_CASUALTY_00635c98 = globalThis.s_CASUALTY_00635c98, s_CASUALTY_00635d3c = globalThis.s_CASUALTY_00635d3c, s_CHECKBOX_00635bd0 = globalThis.s_CHECKBOX_00635bd0;
const s_CLIENTHOTWAIT_00635cf0 = globalThis.s_CLIENTHOTWAIT_00635cf0, s_COLUMNS_00635b9c = globalThis.s_COLUMNS_00635b9c, s_Client:_%s_(%d)_00635c78 = globalThis.s_Client:_%s_(%d)_00635c78, s_Client:_%s_(%d)_00635ce0 = globalThis.s_Client:_%s_(%d)_00635ce0, s_D:\Ss\Franklinton\Popup_1.cpp_00635b20 = globalThis.s_D:\Ss\Franklinton\Popup_1.cpp_00635b20, s_DEBUG_006359dc = globalThis.s_DEBUG_006359dc;
const s_DEFAULT_00635bec = globalThis.s_DEFAULT_00635bec, s_EMAILADDRESS_00635de4 = globalThis.s_EMAILADDRESS_00635de4, s_EMAILNOT_00635dd4 = globalThis.s_EMAILNOT_00635dd4, s_Error_updating_EVENTS.%s_00635f4c = globalThis.s_Error_updating_EVENTS.%s_00635f4c, s_Error_updating_RULES.%s_00635f80 = globalThis.s_Error_updating_RULES.%s_00635f80, s_File_I/O_Error_00635f68 = globalThis.s_File_I/O_Error_00635f68;
const s_File_I/O_Error_00635f98 = globalThis.s_File_I/O_Error_00635f98, s_HEIGHT_00635ba4 = globalThis.s_HEIGHT_00635ba4, s_LENGTH_00635bc8 = globalThis.s_LENGTH_00635bc8, s_LISTBOX_00635bdc = globalThis.s_LISTBOX_00635bdc, s_NOTICE_00635f44 = globalThis.s_NOTICE_00635f44, s_OPTIONS_00635b74 = globalThis.s_OPTIONS_00635b74;
const s_OURTURNTOMOVE_00635cb0 = globalThis.s_OURTURNTOMOVE_00635cb0, s_OURTURNTOMOVE_00635d54 = globalThis.s_OURTURNTOMOVE_00635d54, s_PBEM1_00635dcc = globalThis.s_PBEM1_00635dcc, s_PEDIAUNITFACTS_00635db4 = globalThis.s_PEDIAUNITFACTS_00635db4, s_PEDIA_00635dac = globalThis.s_PEDIA_00635dac, s_PROMPT_00635b7c = globalThis.s_PROMPT_00635b7c;
const s_SMALLFONT_00635bac = globalThis.s_SMALLFONT_00635bac, s_SYSTEM_00635be4 = globalThis.s_SYSTEM_00635be4, s_Server:_%s_(%d)_00635c68 = globalThis.s_Server:_%s_(%d)_00635c68, s_Server:_%s_(%d)_00635cd0 = globalThis.s_Server:_%s_(%d)_00635cd0, s_TITLE_00635b8c = globalThis.s_TITLE_00635b8c, s_UNITNAME_00635fa8 = globalThis.s_UNITNAME_00635fa8;
const s_UNITS_00635f78 = globalThis.s_UNITS_00635f78, s_UNITS_00635fb4 = globalThis.s_UNITS_00635fb4, s_WAITAIMOVES_00635d30 = globalThis.s_WAITAIMOVES_00635d30, s_WAITHUMANMOVES_00635cc0 = globalThis.s_WAITHUMANMOVES_00635cc0, s_WAITHUMANMOVES_00635d00 = globalThis.s_WAITHUMANMOVES_00635d00, s_WAITPRODUCTION_00635c88 = globalThis.s_WAITPRODUCTION_00635c88;
const s_WAITPRODUCTION_00635d10 = globalThis.s_WAITPRODUCTION_00635d10, s_WAITPRODUCTION_00635d20 = globalThis.s_WAITPRODUCTION_00635d20, s_WIDTH_00635bc0 = globalThis.s_WIDTH_00635bc0, s_popupStackIndex_>=_0_&&_popupSta_00635b40 = globalThis.s_popupStackIndex_>=_0_&&_popupSta_00635b40;


 export function FUN_005a0fea (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let sVar3;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  while ((_MEM[param_1] !== 0)) {
    iVar1 = s32(((in_ECX + 0x1e8) + s32((in_ECX + 0x48), 0) * 4), 0);
    iVar2 = FUN_0040efd0(param_1);
    if ((iVar2 <= (iVar1 + -6)));
    _MEM[param_1 + (sVar3 - 1)] = 0;
  }
  if ((param_4 === 0)) {
    local_8 = s32((in_ECX + 0x94), 0);
    local_c = s32((in_ECX + 0x98), 0);
  }
  else {
    local_8 = s32((in_ECX + 0xa0), 0);
    local_c = s32((in_ECX + 0xa4), 0);
  }
  if ((local_c !== local_8)) {
    FUN_005c19ad(local_c);
    FUN_005c0f57(s32((in_ECX + 0x10), 0), param_1, (param_2 + 2), (param_3 + 1), 5);
    FUN_005c19ad(local_8);
    FUN_005c0f57(s32((in_ECX + 0x10), 0), param_1, (param_2 + 1), param_3, 5);
  }
  if ((param_5 === 0)) {
    FUN_005c19ad(local_8);
  }
  else {
    FUN_005c19ad(s32((in_ECX + 0x6c), 0));
  }
  FUN_005c0f57(s32((in_ECX + 0x10), 0), param_1, param_2, param_3, 5);
  return;
}


 export function FUN_005a1148 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let pcVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = 0;
  pcVar2 = _strchr(param_1, 0x7c);
  if ((pcVar2 !== 0)) {
    local_8 = (pcVar2 + 1);
    _MEM[pcVar2] = 0;
  }
  FUN_005a0fea(param_1, (s32(((in_ECX + 0x208) + s32((in_ECX + 0x48), 0) * 4), 0) + param_2), param_3, param_4, param_5);
  if ((local_8 !== 0)) {
    iVar1 = s32(((in_ECX + 0x1e8) + s32((in_ECX + 0x48), 0) * 4), 0);
    iVar3 = FUN_0040efd0(local_8);
    FUN_005a0fea(local_8, (((iVar1 + param_2) + -4) - iVar3), param_3, param_4, param_5);
    _MEM[pcVar2] = 0x7c;
  }
  return;
}


 export function FUN_005a120b (in_ECX, param_1, param_2)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;
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

  if ((param_1 === 0)) {
    local_18 = 0;
  }
  else if ((s32(in_ECX, 0xa) === 0)) {
    local_18 = 0;
  }
  else {
    iVar1 = FUN_0059fb78(s32(in_ECX, (s32(param_1, 3) + 0x84)));
    iVar2 = FUN_0059fb78(param_1);
    iVar1 = (iVar2 - iVar1);
    if ((((s32(in_ECX, (s32(param_1, 3) + 0x17)) * s32(in_ECX, 0xe) - iVar1) === 0) || (s32(in_ECX, (s32(param_1, 3) + 0x17)) * s32(in_ECX, 0xe) < iVar1))) {
      local_18 = 0;
    }
    else {
      local_24 = (iVar1 / s32(in_ECX, (s32(param_1, 3) + 0x17)) | 0);
      local_2c = (iVar1 % s32(in_ECX, (s32(param_1, 3) + 0x17)));
      local_20 = (s32(in_ECX, (s32(param_1, 3) + 0x7a)) * local_24 + s32(in_ECX, (s32(param_1, 3) + 0x74)));
      local_28 = (s32(in_ECX, (s32(param_1, 3) + 0x7c)) * local_2c + s32(in_ECX, (s32(param_1, 3) + 0x76)));
      FUN_004086c0(DAT_ffffffec, local_20, local_28, s32(in_ECX, (s32(param_1, 3) + 0x7a)), s32(in_ECX, (s32(param_1, 3) + 0x7c)));
      local_18 = u8((s32(in_ECX, 0x88) === param_1));
      if ((local_18 === 0)) {
        local_1c = s32(in_ECX, 0x24);
      }
      else {
        local_1c = s32(in_ECX, 0x27);
      }
      local_3c = local_14;
      local_38 = local_10;
      local_34 = local_c;
      local_30 = local_8;
      if ((in_ECX !== -0x208)) {
        local_3c = (local_14 + s32(in_ECX, (s32(param_1, 3) + 0x82)));
      }
      if ((iVar2 === 0)) {
        if ((local_18 !== 0)) {
          FUN_005a99fc(s32(in_ECX, 0), DAT_ffffffc4, s32(in_ECX, 0x1e), s32(in_ECX, 0x1f));
          FUN_004bb800(DAT_ffffffc4, 1, 1);
        }
        FUN_0040fdb0(s32(in_ECX, 0), DAT_ffffffc4, local_1c);
        FUN_005a1148(s32(param_1, 2), (local_20 + 2), local_28, local_18, (s32(param_1, 0) & 1));
      }
      if ((param_2 !== 0)) {
        FUN_00408490(DAT_ffffffec);
      }
    }
  }
  return local_18;
}


 export function FUN_005a14d2 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let uVar5;
  let local_2c;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  uVar1 = s32(in_ECX, 0x12);
  for (/* cond: (local_24 < 2) */); local_24 = (local_24 < 2); local_24 = (local_24 + 1)) {
    if (((_MEM[(in_ECX + 0x3e)] & 0x40) !== 0)) {
      w32(in_ECX, 0x12, local_24);
      w32(in_ECX, (s32(in_ECX, 0x12) + 0x6e), 0);
      iVar2 = s32(in_ECX, 0x12);
      local_14 = s32(in_ECX, (iVar2 * 4 + 0x56));
      local_10 = s32(in_ECX, (iVar2 * 4 + 0x57));
      local_c = s32(in_ECX, (iVar2 * 4 + 0x58));
      local_8 = s32(in_ECX, (iVar2 * 4 + 0x59));
      if ((s32(in_ECX, 0x92) !== 0)) {
        FUN_0040fdb0(s32(in_ECX, 0), (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x56)), s32(in_ECX, 0x24));
      }
      FUN_0043c7c0(s32(in_ECX, 0), (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x4e)), s32(in_ECX, 0x1f));
      FUN_005c0073(DAT_ffffffec);
      if ((s32(in_ECX, 0xa) !== 0)) {
        local_1c = s32((DAT_006cec84 + 0x228), 0);
        iVar2 = FUN_0059fb78(s32(in_ECX, (s32(in_ECX, 0x12) + 0x84)));
        local_2c = 0;
        for (/* cond: (local_18 < s32(in_ECX, 0xa)) */); (local_1c = (local_1c !== 0) && (local_18 = (local_18 < s32(in_ECX, 0xa)))); local_18 = (local_18 + 1))
        {
          if ((s32(in_ECX, 0x12) === s32((local_1c + 0xc), 0))) {
            if ((local_2c < (s32(in_ECX, (s32(in_ECX, 0x12) + 0x17)) * s32(in_ECX, 0xe) + iVar2))) {
              uVar5 = 0;
              uVar3 = FUN_0059fc19(local_2c);
              uVar4 = FUN_005a120b(uVar3, uVar5);
              w32(in_ECX, (s32(in_ECX, 0x12) + 0x6e), (s32(in_ECX, (s32(in_ECX, 0x12) + 0x6e)) | uVar4));
              local_10 = (local_10 + s32(in_ECX, (s32(in_ECX, 0x12) + 0x7c)));
            }
            local_2c = (local_2c + 1);
          }
          local_1c = s32((local_1c + 0x10), 0);
        }
        if ((0 < iVar2)) {
          FUN_0040fdb0(s32(in_ECX, 0), DAT_ffffffec, s32(in_ECX, 0x24));
        }
      }
      FUN_005c0034();
      FUN_00408490((in_ECX + (s32(in_ECX, 0x12) * 4 + 0x4e)));
    }
  }
  w32(in_ECX, 0x12, uVar1);
  return;
}


 export function FUN_005a1766 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 1)) {
    param_1 = (param_1 / s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0) | 0);
  }
  return param_1;
}


 export function FUN_005a17a4 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 1)) {
    param_1 = (param_1 - (param_1 % s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0)));
  }
  return param_1;
}


 export function FUN_005a17e9 (in_ECX, param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let local_10;

  bVar1 = 0;
  if ((s32((in_ECX + 0x220), 0) !== param_1)) {
    local_10 = FUN_0059fb78(s32(((in_ECX + 0x210) + s32((in_ECX + 0x48), 0) * 4), 0));
    iVar2 = FUN_0059fb78(param_1);
    if ((iVar2 < local_10)) {
      bVar1 = 1;
      local_10 = iVar2;
    }
    while (((s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0) * s32((in_ECX + 0x38), 0) + local_10) <= iVar2)) {
      if ((s32((in_ECX + 0x38), 0) === 1)) {
        local_10 = (local_10 + 1);
      }
      else {
        local_10 = (local_10 + s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0));
      }
      bVar1 = 1;
    }
    uVar3 = FUN_005a17a4((s32((in_ECX + 0x28), 0) + -1));
    uVar3 = FUN_005a1a44(local_10, 0, uVar3);
    uVar3 = FUN_0059fc19(uVar3);
    w32(((in_ECX + 0x210) + s32((in_ECX + 0x48), 0) * 4), 0, uVar3);
    uVar3 = s32((in_ECX + 0x220), 0);
    w32((in_ECX + 0x220), 0, param_1);
    if ((param_2 === 0)) {
      if ((s32(((in_ECX + 0x284) + s32((in_ECX + 0x48), 0) * 4), 0) !== 0)) {
        uVar4 = FUN_0059fb78(s32(((in_ECX + 0x210) + s32((in_ECX + 0x48), 0) * 4), 0));
        FUN_0040fcf0(uVar4);
      }
      if ((s32(((in_ECX + 0x28c) + s32((in_ECX + 0x48), 0) * 4), 0) !== 0)) {
        uVar4 = FUN_0059fcba(s32(((in_ECX + 0x210) + s32((in_ECX + 0x48), 0) * 4), 0));
        FUN_0040fcf0(uVar4);
      }
    }
    if ((param_2 !== 0)) {
      if (bVar1) {
        FUN_005a14d2();
        if ((s32((in_ECX + 0x24c), 0) !== 0)) {
          in_ECX = (in_ECX + 0x24c);
        }
      }
      else {
        FUN_005a120b(uVar3, 1);
        FUN_005a120b(param_1, 1);
        if ((s32((in_ECX + 0x24c), 0) !== 0)) {
          in_ECX = (in_ECX + 0x24c);
        }
      }
    }
  }
  return;
}


 export function FUN_005a1a44 (param_1, param_2, param_3)

 {
  if ((param_2 <= param_1)) {
    param_2 = param_1;
  }
  if ((param_2 <= param_3)) {
    param_3 = param_2;
  }
  return param_3;
}


 export function FUN_005a1a7d (in_ECX, param_1, param_2)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  FUN_005a1caf(param_1, param_2);
  if ((s32(((in_ECX + 0x28c) + s32((in_ECX + 0x48), 0) * 4), 0) !== 0)) {
    if ((param_1 < s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x158) + in_ECX), 0))) {
      return -3;
    }
    if ((s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x160) + in_ECX), 0) <= param_1)) {
      return -4;
    }
  }
  if ((param_2 < s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x15c) + in_ECX), 0))) {
    uVar1 = -1;
  }
  else if ((param_2 < s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x164) + in_ECX), 0))) {
    if ((param_1 < s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x158) + in_ECX), 0))) {
      uVar1 = -3;
    }
    else if ((param_1 < s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x160) + in_ECX), 0))) {
      iVar2 = FUN_0059fb78(s32(((in_ECX + 0x210) + s32((in_ECX + 0x48), 0) * 4), 0));
      uVar1 = FUN_005a1a44(((s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0) * ((param_1 - s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x158) + in_ECX), 0)) / s32(((in_ECX + 0x1e8) + s32((in_ECX + 0x48), 0) * 4), 0) | 0) + ((param_2 - s32(((s32((in_ECX + 0x48), 0) * 0x10 + 0x15c) + in_ECX), 0)) / s32(((in_ECX + 0x1f0) + s32((in_ECX + 0x48), 0) * 4), 0) | 0)) + iVar2), 0, (s32((in_ECX + 0x28), 0) + -1));
    }
    else {
      uVar1 = -4;
    }
  }
  else {
    uVar1 = -2;
  }
  return uVar1;
}


 export function FUN_005a1c52 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
    if ((s32((local_c + 0xc), 0) === param_1)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_005a1caf (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x48), 0);
  if (((_MEM[(in_ECX + 0x3e)] & 0x40) === 0)) {
    w32((in_ECX + 0x48), 0, 0);
  }
  else {
    w32((in_ECX + 0x48), 0, 0);
    if ((s32((in_ECX + 0x150), 0) < param_1)) {
      w32((in_ECX + 0x48), 0, uVar1);
    }
  }
  return;
}


 export function FUN_005a1da3 (param_1)

 {
  let iVar1;

  if ((DAT_006cec84 !== 0)) {
    w32((DAT_006cec84 + 0x48), 0, 0);
    iVar1 = FUN_0059fc19(param_1);
    if ((s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) !== iVar1)) {
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, iVar1);
      FUN_005a14d2();
    }
  }
  return;
}


 export function FUN_005a1e28 (in_ECX)

 {
  let uVar1;
  let pvVar2;
  let pCVar3;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
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
  puStack_c = LAB_005a20db;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((s32(in_ECX, 0) === 0)) {
    pvVar2 = operator_new(0x114);
    local_8 = 0;
    if ((pvVar2 === 0)) {
      local_2c = 0;
    }
    else {
      local_2c = FUN_0044c5a0();
    }
    local_8 = -1;
    w32(in_ECX, 0, local_2c);
    local_14 = 0;
    local_18 = s32(in_ECX, 0x4d);
    if ((local_18 === 0)) {
      local_18 = DAT_ffffffec;
    }
    if (((_MEM[(in_ECX + 0x3e)] & 1) === 0)) {
      local_24 = 0xc02;
    }
    else {
      local_24 = 0x842;
    }
    if ((DAT_006359c4 === 0)) {
      if ((DAT_00634718 === 0)) {
        local_1c = 0;
      }
      else {
        local_1c = DAT_006553d8;
      }
    }
    else {
      local_1c = DAT_006359c4;
    }
    if ((DAT_006359c0 === 0)) {
      local_20 = DAT_006a8c00;
    }
    else {
      local_20 = DAT_006359c0;
    }
    if ((local_1c === 0)) {
      FUN_005bb3f0(local_18, local_24, s32(in_ECX, 0x38), s32(in_ECX, 0x39), s32(in_ECX, 0x10), s32(in_ECX, 0x11), DAT_006a8c00);
    }
    else {
      FUN_005bb4ae(local_18, local_24, s32(in_ECX, 0x38), s32(in_ECX, 0x39), s32(in_ECX, 0x10), s32(in_ECX, 0x11), local_20, local_1c);
    }
    if (((_MEM[(in_ECX + 0x3e)] & 1) === 0)) {
      FUN_00497d00(s32(in_ECX, 0x34));
    }
    pCVar3 = GetActiveView(s32(in_ECX, 0));
    if ((s32(in_ECX, 0x10) <= pCVar3)) {
      pCVar3 = GetActiveView(s32(in_ECX, 0));
      w32(in_ECX, 0x10, pCVar3);
    }
    pCVar3 = GetActiveView(s32(in_ECX, 0));
    if ((s32(in_ECX, 0x11) <= pCVar3)) {
      pCVar3 = GetActiveView(s32(in_ECX, 0));
      w32(in_ECX, 0x11, pCVar3);
    }
    in_ECX = s32(in_ECX, 0);
    if ((DAT_00635a3c === 0)) {
      if ((DAT_00635a40 !== 0)) {
        in_ECX = s32(in_ECX, 0);
      }
    }
    else {
      in_ECX = s32(in_ECX, 0);
      wv(DAT_00635a3c, 0);
    }
    if ((DAT_00635a44 !== 0)) {
      FUN_00408330(DAT_00635a44);
      wv(DAT_00635a44, 0);
    }
    uVar1 = 1;
  }
  else {
    uVar1 = 0;
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return uVar1;
}


 export function FUN_005a20f4 ()

 {
  if ((DAT_006cec84 !== 0)) {
    FUN_005a577e();
  }
  return;
}


 export function FUN_005a211c (in_ECX)

 {
  let uVar1;
  let pvVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar6;
  let local_198;
  let local_194;
  let local_190;
  let local_18c;
  let local_188;
  let local_184;
  let local_180;
  let local_17c;
  let local_178;
  let local_174;
  let local_170;
  let local_16c;
  let local_164;
  let local_15c;
  let local_154;
  let local_14c;
  let local_144;
  let local_13c;
  let local_134;
  let local_12c;
  let local_124;
  let local_11c;
  let local_104;
  let local_fc;
  let local_f8;
  let local_e8;
  let local_e4;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005a3b96;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_d4 = 0;
  if ((in_ECX !== DAT_006cec84)) {
    if ((0xf < DAT_00635a9c)) {
      FUN_005dae6b(7, s_popupStackIndex_>=_0_&&_popupSta_00635b40, s_D:\Ss\Franklinton\Popup_1.cpp_00635b20, 0xc75);
    }
    wv(DAT_00635a9c, (DAT_00635a9c + 1));
    wv(DAT_006ad678, in_ECX);
    wv(DAT_006cec84, in_ECX);
    w32(DAT_00635a58, (DAT_00635a9c + 1), in_ECX);
  }
  if (((_MEM[(in_ECX + 0x3d)] & 2) === 0)) {
    local_bc = 0;
    FUN_005d4167(s32(DAT_006cec84, 2));
    FUN_005d8236(DAT_006cec90);
    FUN_005d25a8(s32(DAT_006cec84, 2));
    FUN_005d268e(DAT_006cec90);
    uVar1 = s32(in_ECX, 0xf);
    local_cc = (s32(in_ECX, 0xf) & 0x1000);
    if ((local_cc === 0)) {
      if ((0x28 < s32(in_ECX, 0xa))) {
        if ((DAT_0062f004 === 0)) {
          FUN_00589ef8(-14, 9, 0, 0x28, s32(in_ECX, 0xa));
        }
        else {
          w32(in_ECX, 0xa, 0x28);
        }
      }
      for (/* cond: (local_c8 !== 0) */); local_c8 = (local_c8 !== 0); local_c8 = s32(local_c8, 4))
      {
        w32(DAT_ffffff4c, local_d4, s32(local_c8, 2));
        local_d4 = (local_d4 + 1);
      }
    }
    if ((s32(in_ECX, 0xa) !== 0)) {
      if ((local_cc === 0)) {
        if (((uVar1 & 4) === 0)) {
          pvVar2 = operator_new(0x50);
          local_8 = 7;
          if ((pvVar2 === 0)) {
            local_154 = 0;
          }
          else {
            local_154 = FUN_00531010();
          }
          local_8 = -1;
          w32(in_ECX, 0x9a, local_154);
          iVar5 = s32(in_ECX, 0xe);
          if ((iVar5 < 2)) {
            iVar5 = 1;
          }
          FUN_004086c0(DAT_ffffff1c, s32(in_ECX, 0x3c), s32(in_ECX, 0x3d), s32(in_ECX, 0x46), s32(in_ECX, 0x2d) * (((s32(in_ECX, 0xe) + -1) + s32(in_ECX, 0xa)) / iVar5 | 0));
          if ((s32(in_ECX, 0) === 0)) {
            local_18c = 0;
          }
          else {
            local_18c = (s32(in_ECX, 0) + 0x48);
          }
          FUN_005310a0(local_18c, 0xc8, DAT_ffffff1c, s32(in_ECX, 0xe), s32(in_ECX, 0xa), DAT_ffffff4c);
          local_c8 = s32(in_ECX, 0x8a);
          local_104 = 0;
          for (/* cond: (local_c8 !== 0) */); local_c8 = (local_c8 !== 0); local_c8 = s32(local_c8, 4)) {
            if ((s32(in_ECX, 0x88) === local_c8)) {
              FUN_004472f0(local_104);
            }
            if (((s32(local_c8, 0) & 1) !== 0)) {
              FUN_00447210(local_104);
            }
            local_104 = (local_104 + 1);
          }
          FUN_005311b0(LAB_004012ad);
          FUN_005311e0(FUN_005a3bae);
        }
        else {
          iVar5 = s32(in_ECX, 0xa);
          local_14c = operator_new((iVar5 * 0x3c + 4));
          local_8 = 6;
          if ((local_14c === 0)) {
            local_14c = 0;
          }
          else {
            w32(local_14c, 0, iVar5);
            `eh_vector_constructor_iterator'((local_14c + 1), 0x3c, s32(local_14c, 0), thunk_FUN_0040f8b0, thunk_FUN_0040f930);
            local_14c = (local_14c + 1);
          }
          local_8 = -1;
          w32(in_ECX, 0x9b, local_14c);
          iVar5 = s32(in_ECX, 0x3c);
          local_f8 = s32(in_ECX, 0x3d);
          local_c0 = 0;
          for (/* cond: (local_c8 !== 0) */); local_c8 = (local_c8 !== 0);
              local_c8 = s32(local_c8, 4)) {
            if ((s32(in_ECX, 0) === 0)) {
              local_188 = 0;
            }
            else {
              local_188 = (s32(in_ECX, 0) + 0x48);
            }
            FUN_0040f9d0(local_188, (local_c0 + 0xc8), iVar5, local_f8, s32(local_c8, 2));
            FUN_0040fad0((s32(local_c8, 0) & 4));
            if (((s32(local_c8, 0) & 1) !== 0)) {
              FUN_005a9640();
            }
            local_f8 = (local_f8 + s32(in_ECX, 0x2d));
            local_c0 = (local_c0 + 1);
          }
        }
      }
      else {
        w32(in_ECX, 0x12, 0);
        if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
          if (((_MEM[(in_ECX + 0x3f)] & 1) !== 0)) {
            if ((s32(in_ECX, 0xe) === 1)) {
              pvVar2 = operator_new(0x40);
              local_8 = 1;
              if ((pvVar2 === 0)) {
                local_124 = 0;
              }
              else {
                local_124 = FUN_0040fb00();
              }
              local_8 = -1;
              w32(in_ECX, (s32(in_ECX, 0x12) + 0xa1), local_124);
              if ((s32(in_ECX, 0) === 0)) {
                local_174 = 0;
              }
              else {
                local_174 = (s32(in_ECX, 0) + 0x48);
              }
              FUN_0040fc50(local_174, 0xb, (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x5e)), 1);
              iVar5 = FUN_005a1c52(s32(in_ECX, 0x12));
              FUN_0040fd40(0, (iVar5 + -1));
              uVar3 = FUN_0059fb78(s32(in_ECX, (s32(in_ECX, 0x12) + 0x84)));
              FUN_0040fcf0(uVar3);
              FUN_005db0d0((s32(in_ECX, (s32(in_ECX, 0x12) + 0x17)) + -1));
              FUN_0040fd80(LAB_004036c0);
              FUN_00451ac0(LAB_004036c0);
            }
            else {
              pvVar2 = operator_new(0x40);
              local_8 = 2;
              if ((pvVar2 === 0)) {
                local_12c = 0;
              }
              else {
                local_12c = FUN_0040fb00();
              }
              local_8 = -1;
              w32(in_ECX, (s32(in_ECX, 0x12) + 0xa3), local_12c);
              if ((s32(in_ECX, 0) === 0)) {
                local_178 = 0;
              }
              else {
                local_178 = (s32(in_ECX, 0) + 0x48);
              }
              FUN_0040fc50(local_178, 0xc, (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x66)), 0);
              iVar5 = FUN_005a1c52(s32(in_ECX, 0x12));
              uVar3 = FUN_005a1766((iVar5 + -1));
              FUN_0040fd40(0, uVar3);
              uVar3 = FUN_0059fb78(s32(in_ECX, (s32(in_ECX, 0x12) + 0x84)));
              uVar3 = FUN_005a1766(uVar3);
              FUN_0040fcf0(uVar3);
              FUN_005db0d0(s32(in_ECX, 0xe));
              FUN_0040fd80(FUN_005a5494);
              FUN_00451ac0(FUN_005a5494);
            }
          }
          FUN_00414c20(FUN_005a4df3);
          FUN_00414c60(FUN_005a535e);
          FUN_00414be0(FUN_005a4edf);
          FUN_00414ca0(FUN_005a53b8);
        }
        else {
          pvVar2 = operator_new(0x3c);
          local_8 = 0;
          if ((pvVar2 === 0)) {
            local_11c = 0;
          }
          else {
            local_11c = FUN_00418e00();
          }
          local_8 = -1;
          w32(in_ECX, (s32(in_ECX, 0x12) + 0x9e), local_11c);
          FUN_004086c0(DAT_ffffff1c, s32(in_ECX, 0x3c), s32(in_ECX, 0x3d), s32(in_ECX, (s32(in_ECX, 0x12) + 0x13)), s32(in_ECX, (s32(in_ECX, 0x12) + 0x15)));
          if ((s32(in_ECX, 0) === 0)) {
            local_170 = 0;
          }
          else {
            local_170 = (s32(in_ECX, 0) + 0x48);
          }
          FUN_00418f40(local_170, 0xa, DAT_ffffff1c);
          local_c8 = s32(in_ECX, 0x8a);
          local_104 = 0;
          for (/* cond: (local_c8 !== 0) */); local_c8 = (local_c8 !== 0); local_c8 = s32(local_c8, 4)) {
            if ((s32(in_ECX, 0x12) === s32(local_c8, 3))) {
              FUN_00419020(s32(local_c8, 2));
              if ((s32(in_ECX, 0x88) === local_c8)) {
                FUN_00551d80(local_104);
              }
              local_104 = (local_104 + 1);
            }
          }
          FUN_00551dc0(FUN_005a3c83);
        }
        if (((_MEM[(in_ECX + 0x3e)] & 0x40) !== 0)) {
          w32(in_ECX, 0x12, 1);
          if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
            if (((_MEM[(in_ECX + 0x3f)] & 1) !== 0)) {
              if ((s32(in_ECX, 0xe) === 1)) {
                pvVar2 = operator_new(0x40);
                local_8 = 4;
                if ((pvVar2 === 0)) {
                  local_13c = 0;
                }
                else {
                  local_13c = FUN_0040fb00();
                }
                local_8 = -1;
                w32(in_ECX, (s32(in_ECX, 0x12) + 0xa1), local_13c);
                if ((s32(in_ECX, 0) === 0)) {
                  local_180 = 0;
                }
                else {
                  local_180 = (s32(in_ECX, 0) + 0x48);
                }
                FUN_0040fc50(local_180, 0xb, (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x5e)), 1);
                iVar5 = FUN_005a1c52(s32(in_ECX, 0x12));
                FUN_0040fd40(0, (iVar5 + -1));
                uVar3 = FUN_0059fb78(s32(in_ECX, (s32(in_ECX, 0x12) + 0x84)));
                FUN_0040fcf0(uVar3);
                FUN_005db0d0((s32(in_ECX, (s32(in_ECX, 0x12) + 0x17)) + -1));
                FUN_0040fd80(FUN_005a552c);
                FUN_00451ac0(FUN_005a552c);
              }
              else {
                pvVar2 = operator_new(0x40);
                local_8 = 5;
                if ((pvVar2 === 0)) {
                  local_144 = 0;
                }
                else {
                  local_144 = FUN_0040fb00();
                }
                local_8 = -1;
                w32(in_ECX, (s32(in_ECX, 0x12) + 0xa3), local_144);
                if ((s32(in_ECX, 0) === 0)) {
                  local_184 = 0;
                }
                else {
                  local_184 = (s32(in_ECX, 0) + 0x48);
                }
                FUN_0040fc50(local_184, 0xc, (in_ECX + (s32(in_ECX, 0x12) * 4 + 0x66)), 0);
                iVar5 = FUN_005a1c52(s32(in_ECX, 0x12));
                uVar3 = FUN_005a1766((iVar5 + -1));
                FUN_0040fd40(0, uVar3);
                uVar3 = FUN_0059fb78(s32(in_ECX, (s32(in_ECX, 0x12) + 0x84)));
                uVar3 = FUN_005a1766(uVar3);
                FUN_0040fcf0(uVar3);
                FUN_005db0d0(s32(in_ECX, 0xe));
                FUN_0040fd80(FUN_005a55b1);
                FUN_00451ac0(FUN_005a55b1);
              }
            }
          }
          else {
            pvVar2 = operator_new(0x3c);
            local_8 = 3;
            if ((pvVar2 === 0)) {
              local_134 = 0;
            }
            else {
              local_134 = FUN_00418e00();
            }
            local_8 = -1;
            w32(in_ECX, (s32(in_ECX, 0x12) + 0x9e), local_134);
            FUN_004086c0(DAT_ffffff1c, s32(in_ECX, 0x3c), s32(in_ECX, 0x3d), s32(in_ECX, (s32(in_ECX, 0x12) + 0x13)), s32(in_ECX, (s32(in_ECX, 0x12) + 0x15)));
            if ((s32(in_ECX, 0) === 0)) {
              local_17c = 0;
            }
            else {
              local_17c = (s32(in_ECX, 0) + 0x48);
            }
            FUN_00418f40(local_17c, 0xa, DAT_ffffff1c);
            local_c8 = s32(in_ECX, 0x8a);
            local_104 = 0;
            for (/* cond: (local_c8 !== 0) */); local_c8 = (local_c8 !== 0); local_c8 = s32(local_c8, 4)) {
              if ((s32(in_ECX, 0x12) === s32(local_c8, 3))) {
                FUN_00419020(s32(local_c8, 2));
                if ((s32(in_ECX, 0x88) === local_c8)) {
                  FUN_00551d80(local_104);
                }
                local_104 = (local_104 + 1);
              }
            }
            FUN_00551dc0(FUN_005a3c83);
          }
          w32(in_ECX, 0x12, 0);
        }
      }
    }
    if ((s32(in_ECX, 0xa) === 0)) {
      iVar5 = s32(in_ECX, 0xb);
      local_15c = operator_new((iVar5 * 0x40 + 4));
      local_8 = 8;
      if ((local_15c === 0)) {
        local_15c = 0;
      }
      else {
        w32(local_15c, 0, iVar5);
        `eh_vector_constructor_iterator'((local_15c + 1), 0x40, s32(local_15c, 0), thunk_FUN_00451930, thunk_FUN_00453ba0);
        local_15c = (local_15c + 1);
      }
      local_8 = -1;
      w32(in_ECX, 0xa0, local_15c);
      iVar5 = s32(in_ECX, 0x40);
      local_f8 = s32(in_ECX, 0x41);
      local_c4 = s32(in_ECX, 0x8d);
      local_c0 = 0;
      for (/* cond: (local_c4 !== 0) */); local_c4 = (local_c4 !== 0); local_c4 = s32((local_c4 + 0x10), 0)) {
        local_b8 = FUN_00472cf0(s32(in_ECX, 0x48), s32(in_ECX, 0x4c));
        uVar3 = FUN_004bb540(s32(in_ECX, 0x4c));
        iVar4 = FUN_00472cf0(uVar3);
        FUN_004086c0(DAT_ffffff1c, iVar5, local_f8, local_b8, iVar4);
        if ((s32(in_ECX, 0) === 0)) {
          local_190 = 0;
        }
        else {
          local_190 = (s32(in_ECX, 0) + 0x48);
        }
        FUN_004519b0(local_190, (local_c0 + 0x12c), DAT_ffffff1c);
        FUN_00451a60(FUN_005a3cca);
        in_ECX = (in_ECX + 0xa0);
        local_f8 = (local_f8 + (s32(in_ECX, 0x30) + iVar4));
        local_c0 = (local_c0 + 1);
      }
    }
    if ((s32(in_ECX, 0x8e) !== 0)) {
      local_fc = s32(in_ECX, 0x8e);
      iVar5 = s32(in_ECX, 9);
      local_164 = operator_new((iVar5 * 0x48 + 4));
      local_8 = 9;
      if ((local_164 === 0)) {
        local_164 = 0;
      }
      else {
        w32(local_164, 0, iVar5);
        `eh_vector_constructor_iterator'((local_164 + 1), 0x48, s32(local_164, 0), thunk_FUN_004187a0, thunk_FUN_00418870);
        local_164 = (local_164 + 1);
      }
      local_8 = -1;
      w32(in_ECX, 0x9c, local_164);
      local_c0 = 0;
      for (/* cond: (local_fc !== 0) */); local_fc = (local_fc !== 0); local_fc = s32((local_fc + 0x18), 0)) {
        if ((s32(in_ECX, 0) === 0)) {
          local_194 = 0;
        }
        else {
          local_194 = (s32(in_ECX, 0) + 0x48);
        }
        uVar3 = s32((local_fc + 0x14), 0);
        uVar6 = s32((local_fc + 4), 0);
        iVar5 = FUN_0059e448(uVar6, uVar3);
        FUN_005d25c0(local_194, 0x14, (s32(in_ECX, 0x42) + s32(in_ECX, 0x44)), (iVar5 * local_c0 + s32(in_ECX, 0x43)), uVar6, uVar3);
        if ((2 < DAT_00655b02)) {
          FUN_00530eb0(LAB_00402793);
        }
        FUN_004189c0(s32((local_fc + 8), 0));
        local_c0 = (local_c0 + 1);
      }
    }
    if (((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) !== 0)) {
      iVar5 = s32(in_ECX, 0xc);
      iVar4 = s32(in_ECX, 0xd);
      local_16c = operator_new(((iVar5 + iVar4) * 0x3c + 4));
      local_8 = 0xa;
      if ((local_16c === 0)) {
        local_16c = 0;
      }
      else {
        w32(local_16c, 0, (iVar5 + iVar4));
        `eh_vector_constructor_iterator'((local_16c + 1), 0x3c, s32(local_16c, 0), thunk_FUN_0040f3e0, thunk_FUN_0040f570);
        local_16c = (local_16c + 1);
      }
      local_8 = -1;
      w32(in_ECX, 0x9d, local_16c);
    }
    for (/* cond: (local_c0 < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))) */); local_c0 = (local_c0 < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))); local_c0 = (local_c0 + 1)) {
      if ((local_c0 < s32(in_ECX, 0xc))) {
        local_d0 = s32(in_ECX, (local_c0 * 2 + 0xab));
        local_e8 = s32(PTR_DAT_00635a48, local_d0);
      }
      else {
        local_d0 = -1;
        local_e8 = s32(in_ECX, ((local_c0 - s32(in_ECX, 0xc)) + 0xa5));
      }
      uVar3 = FUN_0059e648();
      FUN_004086c0(DAT_ffffff1c, s32(in_ECX, (local_c0 * 2 + 0xac)), s32(in_ECX, 0x45), s32(in_ECX, 0x4b), uVar3);
      if ((s32(in_ECX, 0) === 0)) {
        local_198 = 0;
      }
      else {
        local_198 = (s32(in_ECX, 0) + 0x48);
      }
      FUN_0040f680(local_198, (local_c0 + 0x64), DAT_ffffff1c, local_e8);
      if (((_MEM[(in_ECX + 0xf)] & 1) === 0)) {
        FUN_0040f840();
      }
      if ((local_d0 === 0)) {
        FUN_0040f7d0();
      }
      FUN_0040f880(FUN_005a3e56);
    }
    in_ECX = s32(in_ECX, 0);
    tie(FUN_005a49c1);
    w32(in_ECX, 0xf, (s32(in_ECX, 0xf) | 0x200));
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_005a3bae (param_1, param_2)

 {
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  if ((DAT_006cec84 !== 0)) {
    local_c = 0;
    for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x10), 0))
    {
      if ((param_2 === local_c)) {
        local_10 = local_8;
      }
      local_c = (local_c + 1);
    }
    w32((DAT_006cec84 + 0xd8), 0, -1);
    if ((local_10 !== 0)) {
      w32((DAT_006cec84 + 0xd8), 0, s32((local_10 + 4), 0));
    }
    w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x2000));
    FUN_005a3c58();
  }
  return;
}


 export function FUN_005a3c58 ()

 {
  w32(DAT_006cec84, 0xf, (s32(DAT_006cec84, 0xf) | 0x400));
  wv(DAT_006cec84, s32(DAT_006cec84, 0));
  return;
}


 export function FUN_005a3c83 ()

 {
  if (((_MEM[(DAT_006cec84 + 0x3d)] & 4) === 0)) {
    w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x2000));
    FUN_005a3c58();
  }
  return;
}


 export function FUN_005a3cca (param_1)

 {
  let bVar1;
  let iVar2;
  let local_c;
  let local_8;

  bVar1 = 0;
  local_c = s32((DAT_006cec84 + 0x234), 0);
  if ((local_c !== 0)) {
    for (/* cond: (local_8 < (param_1 + -0x12c)) */); local_8 = (local_8 < (param_1 + -0x12c)); local_8 = (local_8 + 1)) {
      local_c = s32(local_c, 4);
      if ((local_c === 0)) {
        return;
      }
    }
    w32((DAT_006cec84 + 0xd8), 0, s32(local_c, 0));
    if (((_MEM[(DAT_006cec84 + 0x3e)] & 2) !== 0)) {
      bVar1 = 1;
    }
    if ((s32((DAT_006cec84 + 0x23c), 0) === 0)) {
      if (bVar1) {
        FUN_005a577e();
      }
    }
    else {
      iVar2 = s32((DAT_006cec84 + 0x23c), 0)(s32(local_c, 0));
      FUN_005a577e();
      if ((iVar2 !== 0)) {
        w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x2000));
        FUN_005a3c58();
      }
    }
  }
  return;
}


 export function FUN_005a3df3 ()

 {
  let iVar1;

  if ((s32((DAT_006cec84 + 0x240), 0) !== 0)) {
    iVar1 = s32((DAT_006cec84 + 0x240), 0)(0);
    if ((iVar1 === 0)) {
      FUN_005a577e();
    }
    else {
      w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x2000));
      FUN_005a3c58();
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005a3e56 (param_1)

 {
  let uVar1;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  if ((DAT_006cec84 !== 0)) {
    _DAT_006cec80 = FUN_00421bb0();
    param_1 = (param_1 + -100);
    if ((param_1 < s32((DAT_006cec84 + 0x30), 0))) {
      local_18 = s32(((DAT_006cec84 + 0x2ac) + param_1 * 8), 0);
    }
    else {
      w32((DAT_006cec84 + 0xdc), 0, ((param_1 - s32((DAT_006cec84 + 0x30), 0)) + 1));
      local_18 = 0;
    }
    if ((local_18 === 1)) {
      w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x80));
    }
    if ((s32((DAT_006cec84 + 0x224), 0) !== 0)) {
      local_8 = s32((DAT_006cec84 + 0x234), 0);
      local_20 = 0;
      for (/* cond: (s32((DAT_006cec84 + 0x224), 0) !== local_8) */); (local_8 = (local_8 !== 0) && (wv(DAT_006cec84, (DAT_006cec84 + 0x224))));
          local_8 = s32((local_8 + 0x10), 0)) {
        local_20 = (local_20 + 1);
      }
      if ((local_8 !== 0)) {
        FUN_005a3cca((local_20 + 0x12c));
      }
    }
    if ((local_18 === 2)) {
      w32((DAT_006cec84 + 0xd8), 0, -1);
    }
    else {
      if ((s32((DAT_006cec84 + 0x28), 0) !== 0)) {
        w32((DAT_006cec84 + 0xd8), 0, 0);
      }
      if (((s32((DAT_006cec84 + 0x3c), 0) & 0x1004) === 0)) {
        local_14 = 0;
        local_1c = 0;
        local_c = s32((DAT_006cec84 + 0x228), 0);
        uVar1 = GetCheckStyle(s32((DAT_006cec84 + 0x268), 0));
        for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
          if ((uVar1 === local_14)) {
            local_1c = local_c;
          }
          local_14 = (local_14 + 1);
        }
        if ((local_1c !== 0)) {
          w32((DAT_006cec84 + 0xd8), 0, s32((local_1c + 4), 0));
        }
      }
    }
    FUN_005a3c58();
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005a407f (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let local_c;
  let local_8;

  if ((DAT_006cec84 === 0)) {
    return;
  }
  if ((s32((DAT_006cec84 + 0x24), 0) !== 0)) {
    _DAT_006cec80 = FUN_00421bb0();
  }
  if (((_MEM[(DAT_006cec84 + 0x3e)] & 2) !== 0)) {
    /* switch */ () {
    case 0xa2 :
    case 0xc1 :
      w32((DAT_006cec84 + 0x224), 0, s32((s32((DAT_006cec84 + 0x224), 0) + 0x10), 0))
      ;
      if ((s32((DAT_006cec84 + 0x224), 0) === 0)) {
        w32((DAT_006cec84 + 0x224), 0, s32((DAT_006cec84 + 0x234), 0));
      }
      FUN_005a577e();
      break;
    case 0xa8 :
    case 0xc0 :
      for (/* cond: (s32((local_c + 0x10), 0) !== 0) */);
          ((local_c = (local_c !== 0) && (local_c = (local_c + 0x10))) &&
          (local_c = (local_c + 0x10))); local_c = s32((local_c + 0x10), 0)) {
      }
      w32((DAT_006cec84 + 0x224), 0, local_c);
      FUN_005a577e();
      break;
    case 0xd1 :
      if ((s32((DAT_006cec84 + 0x224), 0) !== 0)) {
        FUN_005a3cca(s32(s32((DAT_006cec84 + 0x224), 0), 0));
      }
    }
  }
  if (((s32((DAT_006cec84 + 0x3c), 0) & 0x41000) !== 0x1000)) {
    return;
  }
  if ((s32((DAT_006cec84 + 0x28), 0) === 0)) {
    param_1 = 0;
  }
  do {
    /* switch */ () {
    case 0xa1 :
    case 199 :
      iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
      iVar3 = FUN_005a1c52(s32((DAT_006cec84 + 0x48), 0));
      if (((iVar3 + -1) <= iVar2)) {
        return;
      }
      iVar2 = FUN_005a1c52(s32((DAT_006cec84 + 0x48), 0));
      uVar4 = FUN_0059fc19((iVar2 + -1));
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar4);
      FUN_005a17e9(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0), 0);
      FUN_005a14d2();
      return;
    case 0xa2 :
    case 0xc1 :
      local_8 = s32((DAT_006cec84 + 0x220), 0);
      goto LAB_005a43d9;
    case 0xa3 :
    case 0xc6 :
      if ((s32((DAT_006cec84 + 0x38), 0) < 2)) {
        iVar3 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
        iVar2 = s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0);
        iVar1 = FUN_005a1c52(s32((DAT_006cec84 + 0x48), 0));
        if (((iVar2 + iVar3) < iVar1)) {
          uVar5 = 1;
          uVar4 = FUN_0059fc19((iVar3 + s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
          FUN_005a17e9(uVar4, uVar5);
          return;
        }
        iVar2 = FUN_005a1c52(s32((DAT_006cec84 + 0x48), 0));
        uVar5 = 1;
        uVar4 = FUN_0059fc19((iVar2 + -1));
        FUN_005a17e9(uVar4, uVar5);
        return;
      }
      param_1 = 0xc3;
      break;
    case 0xa4 :
    case 0xc2 :
      if ((s32((DAT_006cec84 + 0x38), 0) !== 1)) {
        iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
        iVar3 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
        if (((s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) + iVar3) <= iVar2)) {
          uVar5 = 1;
          uVar4 = FUN_0059fc19((iVar2 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
          FUN_005a17e9(uVar4, uVar5);
          return;
        }
        if ((iVar2 < s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0))) {
          return;
        }
        iVar2 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
        uVar4 = FUN_0059fc19((iVar2 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
        w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar4);
        iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
        uVar5 = 0;
        uVar4 = FUN_0059fc19((iVar2 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
        FUN_005a17e9(uVar4, uVar5);
        FUN_005a14d2();
        return;
      }
      param_1 = 0xc0;
      break;
    default :
      return;
    case 0xa6 :
    case 0xc3 :
      if ((s32((DAT_006cec84 + 0x38), 0) !== 1)) {
        iVar3 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
        iVar2 = s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0);
        iVar1 = FUN_005a1c52(s32((DAT_006cec84 + 0x48), 0));
        if ((iVar1 <= (iVar2 + iVar3))) {
          return;
        }
        uVar5 = 1;
        uVar4 = FUN_0059fc19((iVar3 + s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
        FUN_005a17e9(uVar4, uVar5);
        return;
      }
      param_1 = 0xc1;
      break;
    case 0xa7 :
    case 0xc4 :
      iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
      if ((iVar2 < 1)) {
        return;
      }
      uVar4 = FUN_0059fc19(0);
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar4);
      FUN_005a17e9(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0), 0);
      FUN_005a14d2();
      return;
    case 0xa8 :
    case 0xc0 :
      local_8 = s32((DAT_006cec84 + 0x220), 0);
      goto LAB_005a4287;
    case 0xa9 :
    case 0xc5 :
      if ((s32((DAT_006cec84 + 0x38), 0) < 2)) {
        iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
        if ((s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) <= iVar2)) {
          uVar5 = 1;
          uVar4 = FUN_0059fc19((iVar2 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
          FUN_005a17e9(uVar4, uVar5);
          return;
        }
        uVar5 = 1;
        uVar4 = FUN_0059fc19(0);
        FUN_005a17e9(uVar4, uVar5);
        return;
      }
      param_1 = 0xc2;
    }
  } while ( true );
  while ((s32((DAT_006cec84 + 0x48), 0) !== s32((local_8 + 0xc), 0))) {
 LAB_005a4287: :
    if ((s32((local_8 + 0x14), 0) === 0)) {
    return;
  }
  if ((s32((DAT_006cec84 + 0x220), 0) === local_8)) {
    return;
  }
  if ((s32((DAT_006cec84 + 0x38), 0) !== 1)) {
    iVar2 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
    iVar3 = FUN_0059fb78(local_8);
    if ((iVar3 < iVar2)) {
      iVar2 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
      uVar4 = FUN_0059fc19((iVar2 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar4);
      FUN_005a17e9(local_8, 0);
      FUN_005a14d2();
      return;
    }
  }
  FUN_005a17e9(local_8, 1);
  return;
  while ((s32((DAT_006cec84 + 0x48), 0) !== s32((local_8 + 0xc), 0))) {
 LAB_005a43d9: :
    if ((s32((local_8 + 0x10), 0) === 0)) {
    FUN_005a17e9(local_8, 1);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005a49c1 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;

  if ((iVar1 !== 0)) {
    _DAT_006cec80 = FUN_00421bb0();
    uVar2 = FID_conflict:__toupper_lk(u8(param_1));
    if (((s32((DAT_006cec84 + 0x3c), 0) & 0x41000) === 0x1000)) {
      local_10 = s32((DAT_006cec84 + 0x220), 0);
      local_18 = 0;
      local_c = 0;
      do {
        do {
          local_10 = s32((local_10 + 0x10), 0);
          if ((local_10 === 0)) {
            local_10 = s32((DAT_006cec84 + 0x228), 0);
          }
        } while ((s32((DAT_006cec84 + 0x48), 0) !== s32((local_10 + 0xc), 0)));
        uVar3 = FID_conflict:__toupper_lk(s8(_MEM[s32((local_10 + 8), 0)]));
        if ((uVar3 === (uVar2 & 0xff))) {
          local_18 = local_10;
        }
      } while ((local_c < 0x7d0));
      if ((local_18 !== 0)) {
        iVar1 = FUN_0059fb78(local_18);
        local_c = 0;
        while ((iVar1 < iVar5)) {
          iVar4 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
          iVar5 = (s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * s32((DAT_006cec84 + 0x38), 0) + iVar4);
          if ((iVar1 < iVar5)) {
            uVar6 = FUN_0059fc19((iVar4 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar6);
            local_c = (local_c + 1);
          }
          else {
            if ((iVar1 < iVar5)) {
              return;
            }
            uVar6 = FUN_0059fc19((iVar4 + s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0)));
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar6);
            local_c = (local_c + 1);
          }
        }
        if ((local_c === 0)) {
          FUN_005a17e9(local_18, 1);
        }
        else {
          FUN_005a17e9(local_18, 0);
          FUN_005a14d2();
        }
      }
    }
    else if (((_MEM[(DAT_006cec84 + 0x3e)] & 2) === 0)) {
      if ((s32((DAT_006cec84 + 0x34), 0) !== 0)) {
        local_1c = -1;
        for (/* cond: (local_c < s32((DAT_006cec84 + 0x34), 0)) */); local_c = (local_c < s32((DAT_006cec84 + 0x34), 0)); local_c = (local_c + 1)) {
          uVar3 = FID_conflict:__toupper_lk(s8(_MEM[s32(((DAT_006cec84 + 0x294) + local_c * 4), 0)]));
          if ((uVar3 === (uVar2 & 0xff))) {
            local_1c = local_c;
            break;
          }
        }
        if ((-1 < local_1c)) {
          FUN_004bb5e0();
          FUN_005a3e56(((s32((DAT_006cec84 + 0x30), 0) + local_c) + 0x64));
          return;
        }
      }
      if ((s32((DAT_006cec84 + 0x28), 0) !== 0)) {
        local_18 = 0;
        local_1c = 0;
        for (/* cond: (local_10 !== 0) */); local_10 = (local_10 !== 0);
            local_10 = s32((local_10 + 0x10), 0)) {
          uVar3 = FID_conflict:__toupper_lk(s8(_MEM[s32((local_10 + 8), 0)]));
          if ((uVar3 === (uVar2 & 0xff))) {
            local_18 = local_10;
            break;
          }
          local_1c = (local_1c + 1);
        }
        if ((local_18 !== 0)) {
          if (((_MEM[(DAT_006cec84 + 0x3d)] & 0x10) === 0)) {
            if (((_MEM[(DAT_006cec84 + 0x3c)] & 4) === 0)) {
              FUN_004472f0(local_1c);
            }
          }
          else {
            FUN_00551d80(local_1c);
          }
        }
      }
    }
    else {
      FUN_005a3c58();
    }
  }
  return;
}


 export function FUN_005a4df3 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let uVar3;

  if ((DAT_006cec84 !== 0)) {
    FUN_005a1caf(param_1, param_2);
    w32(((DAT_006cec84 + 0x218) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, 0);
    if ((-1 < iVar1)) {
      w32(((DAT_006cec84 + 0x218) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, 1);
      FUN_00414ce0();
      uVar3 = 1;
      uVar2 = FUN_0059fc19(iVar1);
      FUN_005a17e9(uVar2, uVar3);
    }
  }
  return;
}


 export function FUN_005a4edf (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let local_8;

  if ((s32(((DAT_006cec84 + 0x218) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) !== 0)) {
    iVar2 = FUN_005a1a7d(param_1, param_2);
    if ((iVar2 < 0)) {
      if ((s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * s32((DAT_006cec84 + 0x38), 0) < s32((DAT_006cec84 + 0x28), 0))) {
        iVar4 = FUN_0059fb78(s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
        /* switch */ () {
        case -4 :
          if ((iVar4 < iVar2)) {
            iVar2 = s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0);
            iVar1 = s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0);
            iVar5 = FUN_005a1766((s32((DAT_006cec84 + 0x28), 0) + -1));
            iVar2 = FUN_005a1a44((iVar4 + iVar2), 0, iVar1 * iVar5);
            iVar4 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
            for (/* cond: ((s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) + local_8) < (s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * s32((DAT_006cec84 + 0x38), 0) + iVar2)) */);
                wv(DAT_006cec84, (DAT_006cec84 + 0x5c));
                local_8 = (local_8 + s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0))) {
            }
            uVar3 = FUN_005a1a44(local_8, 0, (s32((DAT_006cec84 + 0x28), 0) + -1));
            uVar3 = FUN_0059fc19(uVar3);
            w32((DAT_006cec84 + 0x220), 0, uVar3);
            uVar3 = FUN_0059fc19(iVar2);
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar3);
            FUN_005a14d2();
          }
          break;
        case -3 :
          if ((0 < iVar4)) {
            iVar4 = (iVar4 - s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0));
            if ((iVar4 < 1)) {
              iVar4 = 0;
            }
            uVar3 = FUN_0059fc19(iVar4);
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar3);
            iVar2 = FUN_0059fb78(s32((DAT_006cec84 + 0x220), 0));
            uVar3 = FUN_0059fc19((iVar4 + (iVar2 % s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0))));
            w32((DAT_006cec84 + 0x220), 0, uVar3);
            FUN_005a14d2();
          }
          break;
        case -2 :
          if ((s32((DAT_006cec84 + 0x38), 0) === 1)) {
            uVar3 = FUN_0059fc19((iVar4 + 1));
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, uVar3);
            uVar3 = FUN_005a1a44(((s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * s32((DAT_006cec84 + 0x38), 0) + (iVar4 + 1)) + -1), 0, (s32((DAT_006cec84 + 0x28), 0) + -1));
            uVar3 = FUN_0059fc19(uVar3);
            w32((DAT_006cec84 + 0x220), 0, uVar3);
            FUN_005a14d2();
          }
          break;
        case -1 :
          if ((s32((DAT_006cec84 + 0x38), 0) === 1)) {
            uVar3 = FUN_0059fc19((iVar4 + -1));
            w32((DAT_006cec84 + 0x220), 0, uVar3);
            w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, s32((DAT_006cec84 + 0x220), 0));
            FUN_005a14d2();
          }
        }
      }
    }
    else {
      uVar6 = 1;
      uVar3 = FUN_0059fc19(iVar2);
      FUN_005a17e9(uVar3, uVar6);
    }
  }
  return;
}


 export function FUN_005a535e (param_1, param_2)

 {
  if ((DAT_006cec84 !== 0)) {
    FUN_005a4edf(param_1, param_2);
    w32(((DAT_006cec84 + 0x218) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, 0);
    FUN_00414d40();
  }
  return;
}


 export function FUN_005a53b8 (param_1, param_2)

 {
  let iVar1;

  if ((-1 < iVar1)) {
    w32(((DAT_006cec84 + 0x218) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, 1);
    FUN_005a535e(param_1, param_2);
    w32((DAT_006cec84 + 0x3c), 0, (s32((DAT_006cec84 + 0x3c), 0) | 0x2000));
    FUN_005a3c58();
  }
  return;
}


 export function FUN_005a5494 (param_1)

 {
  let iVar1;

  if ((DAT_006cec84 !== 0)) {
    w32((DAT_006cec84 + 0x48), 0, 0);
    iVar1 = FUN_0059fc19(s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * param_1);
    if ((s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) !== iVar1)) {
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, iVar1);
      FUN_005a14d2();
    }
  }
  return;
}


 export function FUN_005a552c (param_1)

 {
  let iVar1;

  if ((DAT_006cec84 !== 0)) {
    w32((DAT_006cec84 + 0x48), 0, 1);
    iVar1 = FUN_0059fc19(param_1);
    if ((s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) !== iVar1)) {
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, iVar1);
      FUN_005a14d2();
    }
  }
  return;
}


 export function FUN_005a55b1 (param_1)

 {
  let iVar1;

  if ((DAT_006cec84 !== 0)) {
    w32((DAT_006cec84 + 0x48), 0, 1);
    iVar1 = FUN_0059fc19(s32(((DAT_006cec84 + 0x5c) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) * param_1);
    if ((s32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0) !== iVar1)) {
      w32(((DAT_006cec84 + 0x210) + s32((DAT_006cec84 + 0x48), 0) * 4), 0, iVar1);
      FUN_005a14d2();
    }
  }
  return;
}


 export function FUN_005a5649 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 1) === 0)) {
    if ((param_2 !== 1)) {
      if ((param_2 !== 2)) {
        FUN_0040fdb0(s32(in_ECX, 0), param_1, s32(in_ECX, 0x1d));
      }
      else {
        uVar1 = FUN_00407fc0(param_1, 0, 0);
        uVar1 = FUN_00407f90(param_1, uVar1);
        FUN_005a9b5d(s32(in_ECX, 0), DAT_00635aa4, s32(param_1, 0), s32(param_1, 1), uVar1);
      }
    }
    else {
      uVar1 = FUN_00407fc0(param_1, 0, 0);
      uVar1 = FUN_00407f90(param_1, uVar1);
      FUN_005a9b5d(s32(in_ECX, 0), DAT_00635aa0, s32(param_1, 0), s32(param_1, 1), uVar1);
    }
  }
  else {
    uVar1 = FUN_00407fc0(param_1);
    uVar1 = FUN_00407f90(param_1, uVar1);
    FUN_0055a930(s32(in_ECX, 1), s32(in_ECX, 0), s32(param_1, 0), s32(param_1, 1), uVar1);
  }
  return;
}


 export function FUN_005a577e (in_ECX)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let extraout_EAX;
  let iVar4;
  let extraout_EAX_00;
  // in_ECX promoted to parameter;
  let local_5c;
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
  let local_8;

  local_30 = 0;
  if (((_MEM[(in_ECX + 0xf)] & 0x20) === 0)) {
    iVar1 = FUN_0059fd2a();
    if ((iVar1 !== 0)) {
      return;
    }
    local_30 = FUN_005a1e28();
    FUN_005a211c();
  }
  if (((_MEM[(in_ECX + 0x3d)] & 0x40) === 0)) {
    FUN_004086c0(DAT_ffffffec, s32(in_ECX, 0x3a), s32(in_ECX, 0x3b), s32(in_ECX, 0x10), s32(in_ECX, 0x11));
    if ((s32(in_ECX, 0x33) !== 0)) {
      for (/* cond: (local_1c < s32(in_ECX, 0x32)) */); local_1c = (local_1c < s32(in_ECX, 0x32)); local_1c = (local_1c + 1)) {
        FUN_005a99fc(s32(in_ECX, 0), DAT_ffffffec, s32(in_ECX, 0x1e), s32(in_ECX, 0x1f));
        FUN_004bb800(DAT_ffffffec, 1, 1);
      }
      FUN_005a5649(DAT_ffffffec, 1);
      FUN_004bb800(DAT_ffffffec, (s32(in_ECX, 0x33) + s32(in_ECX, 0x32) * -2), 0);
      local_10 = (local_10 + (s32(in_ECX, 0x34) + s32(in_ECX, 0x32) * -2));
      local_8 = (local_8 - ((s32(in_ECX, 0x35) - s32(in_ECX, 0x34)) + s32(in_ECX, 0x32) * -2));
      for (/* cond: (local_1c < s32(in_ECX, 0x32)) */); local_1c = (local_1c < s32(in_ECX, 0x32)); local_1c = (local_1c + 1)) {
        FUN_005a99fc(s32(in_ECX, 0), DAT_ffffffec, s32(in_ECX, 0x1f), s32(in_ECX, 0x1e));
        FUN_004bb800(DAT_ffffffec, 1, 1);
      }
    }
    FUN_005a5649(DAT_ffffffec, 2);
  }
  if (((_MEM[(in_ECX + 0x3e)] & 1) === 0)) {
    iVar1 = s32(in_ECX, 0x10);
    iVar2 = FUN_0040efd0(s32(in_ECX, 0x4d));
    local_24 = ((iVar1 >> 1) - ((iVar2 + 4) >> 1));
    local_2c = (s32(in_ECX, 0x32) + s32(in_ECX, 0x2e));
    FUN_005c19ad(s32(in_ECX, 0x23));
    FUN_005c0f57(s32(in_ECX, 3), s32(in_ECX, 0x4d), (local_24 + 2), (local_2c + 1), 5);
    FUN_005c19ad(s32(in_ECX, 0x22));
    FUN_005c0f57(s32(in_ECX, 3), s32(in_ECX, 0x4d), (local_24 + 1), local_2c, 5);
    FUN_005c0f57(s32(in_ECX, 3), s32(in_ECX, 0x4d), local_24, local_2c, 5);
  }
  FUN_0059f64a(1);
  if ((s32(in_ECX, 0xb) !== 0)) {
    FUN_0047df20(s32(in_ECX, 0x4c));
    local_34 = s32(in_ECX, 0x40);
    local_38 = s32(in_ECX, 0x41);
    for (/* cond: (local_20 !== 0) */); local_20 = (local_20 !== 0);
        local_20 = s32(local_20, 4)) {
      uVar3 = FUN_004a6980(s32(in_ECX, 0x4c));
      local_18 = FUN_00472cf0(uVar3);
      uVar3 = FUN_004bb540(s32(in_ECX, 0x4c));
      local_40 = FUN_00472cf0(uVar3);
      if ((s32(in_ECX, 0x91) === 0)) {
        FUN_005cef31(DAT_ffffffa4, s32(in_ECX, 0), local_34, local_38);
      }
      else {
        in_ECX = (in_ECX + 0x91);
      }
      if ((s32(in_ECX, 0x89) === local_20)) {
        FUN_00408680(DAT_ffffffec, (local_34 + -1), (local_38 + -1), (local_18 + local_34), (local_40 + local_38));
        FUN_0043c7c0(s32(in_ECX, 0), DAT_ffffffec, s32(in_ECX, 0x1c));
      }
      iVar1 = local_40;
      if ((s32(local_20, 2) !== 0)) {
        local_44 = ((s32(in_ECX, 0x31) + local_18) + local_34);
        in_ECX = (in_ECX + 2);
        local_28 = (((iVar1 - extraout_EAX) >> 1) + local_38);
        FUN_005a9730(s32(local_20, 2), local_44, local_28, 0);
      }
      local_38 = ((local_38 + local_40) + s32(in_ECX, 0x30));
    }
    FUN_0047df50();
  }
  if ((s32(in_ECX, 9) !== 0)) {
    local_3c = s32(in_ECX, 0x8e);
    local_1c = 0;
    for (/* cond: (local_3c !== 0) */); local_3c = (local_3c !== 0); local_3c = s32((local_3c + 0x18), 0)) {
      FUN_005c19ad(s32(in_ECX, 0x19));
      uVar3 = 5;
      iVar2 = FUN_0059e448(5);
      iVar2 = iVar2 * local_1c;
      iVar4 = FUN_0059e448();
      iVar1 = s32(in_ECX, 0x43);
      in_ECX = (in_ECX + 2);
      FUN_005c0d69(s32((local_3c + 0x10), 0), s32(in_ECX, 0x42), (((iVar2 + (iVar4 >> 1)) + iVar1) - (extraout_EAX_00 >> 1)), uVar3);
      local_1c = (local_1c + 1);
    }
  }
  if (((s32(in_ECX, 0xf) & 0x41000) === 0x1000)) {
    FUN_005a14d2();
  }
  if ((local_30 === 0)) {
    FUN_00408460();
    if ((s32(in_ECX, 0xa) !== 0)) {
      if (((_MEM[(in_ECX + 0x3d)] & 0x10) === 0)) {
        if (((_MEM[(in_ECX + 0xf)] & 4) === 0)) {
          FUN_005d4014();
        }
        else {
          for (/* cond: (local_1c < s32(in_ECX, 0xa)) */); local_1c = (local_1c < s32(in_ECX, 0xa)); local_1c = (local_1c + 1)) {
            FUN_0040f380();
          }
        }
      }
      else if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
        local_48 = s32(in_ECX, 0x12);
        for (/* cond: (local_4c < 2) */); local_4c = (local_4c < 2); local_4c = (local_4c + 1)) {
          if (((_MEM[(in_ECX + 0x3e)] & 0x40) !== 0)) {
            w32(in_ECX, 0x12, local_4c);
            if ((s32(in_ECX, (s32(in_ECX, 0x12) + 0xa1)) !== 0)) {
              FUN_0040f380();
            }
            if ((s32(in_ECX, (s32(in_ECX, 0x12) + 0xa3)) !== 0)) {
              FUN_0040f380();
            }
          }
        }
        w32(in_ECX, 0x12, local_48);
      }
    }
    if ((s32(in_ECX, 9) !== 0)) {
      for (/* cond: (local_1c < s32(in_ECX, 9)) */); local_1c = (local_1c < s32(in_ECX, 9)); local_1c = (local_1c + 1)) {
        FUN_0040f380();
      }
    }
    if (((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) !== 0)) {
      for (/* cond: (local_1c < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))) */); local_1c = (local_1c < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))); local_1c = (local_1c + 1)) {
        FUN_0040f380();
      }
    }
    if ((s32(in_ECX, 0xa) === 0)) {
      for (/* cond: (local_1c < s32(in_ECX, 0xb)) */); local_1c = (local_1c < s32(in_ECX, 0xb)); local_1c = (local_1c + 1)) {
        FUN_0040f380();
      }
    }
  }
  else {
    FUN_004085f0();
  }
  w32(in_ECX, 0xf, (s32(in_ECX, 0xf) | 0x20));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005a5f34 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let BVar2;
  // in_ECX promoted to parameter;
  let local_114;
  let local_90;
  let local_c;
  let local_8;

  if ((DAT_00635a9c !== 0x10)) {
    if ((param_2 === 0)) {
      _DAT_006cec80 = FUN_00421bb0();
    }
    else {
      _DAT_006cec80 = FUN_00421bb0();
      _DAT_006cec80 = ((param_2 * 0x3c + -0x4b0) + FUN_00421bb0());
    }
    if ((DAT_006252c4 !== 0)) {
      iVar1 = FUN_00414d10();
      BVar2 = FUN_006e7d4c(s32((iVar1 + 4), 0));
      if ((BVar2 !== 0)) {
        FUN_004e7240();
      }
    }
    w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) & -0x2001));
    if (((_MEM[(in_ECX + 0x3d)] & 0x40) !== 0)) {
      w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 0x10000));
    }
    FUN_005a577e();
    if (((_MEM[(in_ECX + 0x3c)] & 8) === 0)) {
      if ((s32((in_ECX + 0x250), 0) === 0)) {
        FUN_005c61b0();
        while (((_MEM[(in_ECX + 0x3d)] & 4) === 0)) {
          FUN_0040ef50();
        }
      }
      else {
        while (((_MEM[(in_ECX + 0x3d)] & 4) === 0)) {
          iVar1 = s32((in_ECX + 0x250), 0)(in_ECX);
          if ((iVar1 !== 0)) {
            FUN_005a3c58();
          }
        }
      }
      if ((s32((in_ECX + 0x270), 0) !== 0)) {
        FUN_00418a70(param_1);
      }
      if ((1 < s32((in_ECX + 0x24), 0))) {
        for (/* cond: (local_8 < s32((in_ECX + 0x24), 0)) */); local_8 = (local_8 < s32((in_ECX + 0x24), 0)); local_8 = (local_8 + 1)) {
          FUN_00418a70((DAT_0063cc48 + local_8 * 0x104));
        }
      }
      if (((_MEM[(in_ECX + 0x3d)] & 0x10) === 0)) {
        if (((_MEM[(in_ECX + 0x3c)] & 4) !== 0)) {
          local_c = s32((in_ECX + 0x228), 0);
          local_8 = 0;
          for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32(local_c, 4)) {
            w32(local_c, 0, (s32(local_c, 0) & -5));
            iVar1 = width((s32((in_ECX + 0x26c), 0) + local_8 * 0x3c));
            if ((iVar1 !== 0)) {
              w32(local_c, 0, (s32(local_c, 0) | 4));
            }
            local_8 = (local_8 + 1);
          }
        }
      }
      else if ((s32((in_ECX + 0xd8), 0) === 0)) {
        if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
          w32((in_ECX + 0xd8), 0, s32((s32((in_ECX + 0x220), 0) + 4), 0));
        }
        else {
          FUN_005a96b0(DAT_ffffff70);
          w32((in_ECX + 0xd8), 0, s32((s32((in_ECX + 0x228), 0) + 4), 0));
          local_c = s32((in_ECX + 0x228), 0);
          local_8 = 0;
          for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32(local_c, 4)) {
            FUN_005a9670(local_8, DAT_fffffeec);
            iVar1 = _strcmp(DAT_ffffff70, DAT_fffffeec);
            if ((iVar1 === 0)) {
              w32((in_ECX + 0xd8), 0, s32(local_c, 1));
            }
            local_8 = (local_8 + 1);
          }
        }
      }
      if (((_MEM[(in_ECX + 0x3d)] & 8) === 0)) {
        FUN_0059db65();
        FUN_00421bd0();
        FUN_00407ff0();
        FUN_00419b80();
        FUN_00407ff0();
      }
    }
  }
  return s32((in_ECX + 0xd8), 0);
}


 export function FUN_005a632a (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  let sVar2;
  // in_ECX promoted to parameter;
  let local_17c;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_78 = 1;
  local_7c = 1;
  local_10 = 0;
  FUN_005f22d0(DAT_006cecb0, param_2);
  iVar1 = FUN_004a2379(param_1, param_2);
  if ((iVar1 === 0)) {
    if (((param_8 & 0x8000) === 0)) {
      FUN_0059dfb9(param_5, param_6, param_7, param_8);
    }
    else {
      w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | param_8));
    }
    local_74 = u8((param_4 !== 0));
    if ((local_74 !== 0)) {
      FUN_005f22d0(DAT_ffffff94, param_4);
    }
    do {
      local_70 = FUN_004a23fc(1);
      if ((local_70 === 0)) {
        local_7c = 3;
      }
      else {
        sVar2 = _strlen(local_70);
        if ((sVar2 === 0)) {
          if (((param_8 & 0x4000000) === 0)) {
            local_7c = (local_7c + 1);
          }
          else {
            FUN_0059e18b(DAT_00635b70, -1, -1, -1, 0);
          }
        }
        else if ((_MEM[local_70] === 0x40)) {
          local_18 = (local_70 + 1);
          iVar1 = __strcmpi(local_18, s_OPTIONS_00635b74);
          if ((iVar1 === 0)) {
            local_7c = 2;
          }
          else {
            iVar1 = __strcmpi(local_18, DAT_00635b84);
            if ((iVar1 === 0)) {
              local_7c = 1;
            }
            else {
              iVar1 = __strnicmp(local_18, s_TITLE_00635b8c, 5);
              if ((iVar1 === 0)) {
                for (/* cond: (_MEM[local_18] !== 0x3d) */); (local_18 = _MEM[local_18] && (local_18 = _MEM[local_18])); local_18 = (local_18 + 1)) {
                }
                if ((_MEM[local_18] !== 0)) {
                  local_18 = (local_18 + 1);
                }
                FUN_00426ff0(local_18, DAT_fffffe84);
                FUN_0059e6a9(DAT_fffffe84);
              }
              else {
                iVar1 = __strnicmp(local_18, s_BUTTON_00635b94, 6);
                if ((iVar1 === 0)) {
                  for (/* cond: (_MEM[local_18] !== 0x3d) */); (local_18 = _MEM[local_18] && (local_18 = _MEM[local_18])); local_18 = (local_18 + 1)) {
                  }
                  if ((_MEM[local_18] !== 0)) {
                    local_18 = (local_18 + 1);
                  }
                  FUN_00426ff0(local_18, DAT_fffffe84);
                  FUN_0059f2a3(DAT_fffffe84);
                }
                else {
                  iVar1 = __strnicmp(local_18, s_COLUMNS_00635b9c, 7);
                  if ((iVar1 === 0)) {
                    while ((iVar1 === 0)) {
                      local_18 = (local_18 + 1);
                    }
                    local_c = _atoi(local_18);
                    FUN_0059e4e6(local_c);
                  }
                  else {
                    iVar1 = __strnicmp(local_18, s_HEIGHT_00635ba4, 6);
                    if ((iVar1 === 0)) {
                      while ((iVar1 === 0)) {
                        local_18 = (local_18 + 1);
                      }
                      local_c = _atoi(local_18);
                      in_ECX = delbuf(in_ECX, local_c);
                    }
                    else {
                      iVar1 = __strcmpi(local_18, s_SMALLFONT_00635bac);
                      if ((iVar1 !== 0)) {
                        iVar1 = __strnicmp(local_18, DAT_00635bb8, 1);
                        if ((iVar1 === 0)) {
                          while ((_MEM[local_18] !== 0x2d)) {
                            local_18 = (local_18 + 1);
                          }
                          iVar1 = _atoi(local_18);
                          w32((in_ECX + 0x18), 0, iVar1);
                        }
                        else {
                          iVar1 = __strnicmp(local_18, DAT_00635bbc, 1);
                          if ((iVar1 === 0)) {
                            while ((_MEM[local_18] !== 0x2d)) {
                              local_18 = (local_18 + 1);
                            }
                            iVar1 = _atoi(local_18);
                            w32((in_ECX + 0x14), 0, iVar1);
                          }
                          else {
                            iVar1 = __strnicmp(local_18, s_WIDTH_00635bc0, 5);
                            if ((iVar1 === 0)) {
                              while ((iVar1 === 0)) {
                                local_18 = (local_18 + 1);
                              }
                              local_c = _atoi(local_18);
                              FUN_0059e6ff(local_c);
                            }
                            else {
                              iVar1 = __strnicmp(local_18, s_LENGTH_00635bc8, 6);
                              if ((iVar1 === 0)) {
                                while ((iVar1 === 0)) {
                                  local_18 = (local_18 + 1);
                                }
                                if ((param_3 === 0)) {
                                  param_3 = _atoi(local_18);
                                }
                              }
                              else {
                                iVar1 = __strnicmp(local_18, s_CHECKBOX_00635bd0, 7);
                                if ((iVar1 === 0)) {
                                  w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 5));
                                }
                                else {
                                  iVar1 = __strnicmp(local_18, s_LISTBOX_00635bdc, 7);
                                  if ((iVar1 === 0)) {
                                    while ((iVar1 === 0)) {
                                      local_18 = (local_18 + 1);
                                    }
                                    local_1c = _atoi(local_18);
                                    if ((local_1c === 0)) {
                                      local_1c = 0x10;
                                    }
                                    FUN_0059e5c9(local_1c, s32((in_ECX + 0x11c), 0), 0);
                                  }
                                  else {
                                    iVar1 = __strnicmp(local_18, s_SYSTEM_00635be4, 6);
                                    if ((iVar1 === 0)) {
                                      w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 0x40000));
                                    }
                                    else {
                                      iVar1 = __strnicmp(local_18, s_DEFAULT_00635bec, 7);
                                      if ((iVar1 === 0)) {
                                        if ((local_74 === 0)) {
                                          while ((iVar1 === 0)) {
                                            local_18 = (local_18 + 1);
                                          }
                                          if ((param_3 === 0)) {
                                            param_3 = _atoi(local_18);
                                          }
                                        }
                                        else {
                                          for (/* cond: (_MEM[local_18] !== 0x3d) */); (local_18 = _MEM[local_18] && (local_18 = _MEM[local_18]));
                                              local_18 = (local_18 + 1)) {
                                          }
                                          if ((_MEM[local_18] !== 0)) {
                                            local_18 = (local_18 + 1);
                                          }
                                          sVar2 = _strlen(param_4);
                                          if ((sVar2 === 0)) {
                                            FUN_005f22d0(DAT_ffffff94, local_18);
                                          }
                                        }
                                      }
                                      else if ((_MEM[local_18] !== 0x40)) {
                                        local_7c = 3;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        else if ((local_7c === 1)) {
          FUN_00426ff0(local_70, DAT_fffffe84);
          FUN_0059e18b(DAT_fffffe84, -1, -1, -1, 0);
        }
        else if ((local_7c === 2)) {
          FUN_00426ff0(local_70, DAT_fffffe84);
          if ((local_74 === 0)) {
            if (((_MEM[in_ECX + 0x3c] & 4) === 0)) {
              local_14 = FUN_0059edf0(DAT_fffffe84, local_10, 0);
            }
            else {
              local_14 = FUN_0059f026(DAT_fffffe84, local_10, 0);
            }
            if ((param_3 === local_10)) {
              w32((in_ECX + 0x220), 0, local_14);
            }
            local_10 = (local_10 + 1);
          }
          else {
            if ((param_3 === 0)) {
              param_3 = 5;
            }
            local_8 = DAT_ffffff94;
            if ((s32((in_ECX + 0x24), 0) !== 0)) {
              local_8 = (DAT_0063cc48 + s32((in_ECX + 0x24), 0) * 0x104);
            }
            FUN_0059f06d(DAT_fffffe84, local_8, param_3);
          }
        }
      }
    } while ((local_7c < 3));
    local_78 = 0;
  }
  else if (((param_8 & 0x8000) === 0)) {
    FUN_0059dfb9(param_5, param_6, param_7, param_8);
  }
  return local_78;
}


 export function FUN_005a6c23 (param_1)

 {
  wv(DAT_006359c8, DAT_006359c4);
  wv(DAT_006359c4, param_1);
  return;
}


 export function FUN_005a6c45 ()

 {
  wv(DAT_006359c4, DAT_006359c8);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoIndexFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoRelationFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CODBCFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CString::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:`vector_deleting_destructor' (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if (((param_1 & 2) === 0)) {
    FUN_0040f930();
    if (((param_1 & 1) !== 0)) {
      operator_delete(in_ECX);
    }
  }
  else {
    `eh_vector_destructor_iterator'(in_ECX, 0x3c, s32((in_ECX + -4), 0), thunk_FUN_0040f930);
    operator_delete((in_ECX + -4));
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoIndexFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoRelationFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CODBCFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CString::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:`vector_deleting_destructor' (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if (((param_1 & 2) === 0)) {
    FUN_00418870();
    if (((param_1 & 1) !== 0)) {
      operator_delete(in_ECX);
    }
  }
  else {
    `eh_vector_destructor_iterator'(in_ECX, 0x48, s32((in_ECX + -4), 0), thunk_FUN_00418870);
    operator_delete((in_ECX + -4));
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoIndexFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoRelationFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CODBCFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CString::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:`vector_deleting_destructor' (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if (((param_1 & 2) === 0)) {
    FUN_0040f570();
    if (((param_1 & 1) !== 0)) {
      operator_delete(in_ECX);
    }
  }
  else {
    `eh_vector_destructor_iterator'(in_ECX, 0x3c, s32((in_ECX + -4), 0), thunk_FUN_0040f570);
    operator_delete((in_ECX + -4));
  }
  return in_ECX;
}


 export function FUN_005a94d0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00418ea0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoIndexFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDaoRelationFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CODBCFieldInfo::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CString::`vector */  /* deleting */  /* destructor'(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:`vector_deleting_destructor' (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if (((param_1 & 2) === 0)) {
    FUN_00453ba0();
    if (((param_1 & 1) !== 0)) {
      operator_delete(in_ECX);
    }
  }
  else {
    `eh_vector_destructor_iterator'(in_ECX, 0x40, s32((in_ECX + -4), 0), thunk_FUN_00453ba0);
    operator_delete((in_ECX + -4));
  }
  return in_ECX;
}


 export function FUN_005a95b0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0044cba0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_005a9600 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc9a3(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_005a9640 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, 0);
  return;
}


 export function FUN_005a9670 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005d3cff(s32((in_ECX + 0x1c), 0), param_1, param_2);
  return;
}


 export function FUN_005a96b0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d3d62(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_005a96f0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return ((_MEM[(in_ECX + 0x3d)] & 1) !== 0);
}


 export function FUN_005a9730 (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  FUN_0059f3d7(s32((in_ECX + 8), 0), param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_005a9780 (param_1)

 {
  wv(DAT_00635c64, param_1);
  return;
}


 export function FUN_005a9798 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005c19ad(param_6);
  FUN_005c11b2(param_2, param_3, param_4, param_5);
  return;
}


 export function FUN_005a97cc (param_1, param_2, param_3, param_4, param_5)

 {
  let local_14;

  FUN_00408680(DAT_ffffffec, param_2, param_4, (param_3 + 1), (param_4 + 1));
  FUN_0040fdb0(param_1, DAT_ffffffec, param_5);
  return;
}


 export function FUN_005a9811 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_14;

  FUN_00408680(DAT_ffffffec, param_2, param_3, (param_4 + param_2), (param_3 + 1));
  FUN_0040fdb0(param_1, DAT_ffffffec, param_5);
  return;
}


 export function FUN_005a9858 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_14;

  FUN_00408680(DAT_ffffffec, param_2, param_3, (param_2 + 1), (param_4 + 1));
  FUN_0040fdb0(param_1, DAT_ffffffec, param_5);
  return;
}


 export function FUN_005a989d (param_1, param_2, param_3, param_4, param_5)

 {
  let local_14;

  FUN_00408680(DAT_ffffffec, param_2, param_3, (param_2 + 1), (param_4 + param_3));
  FUN_0040fdb0(param_1, DAT_ffffffec, param_5);
  return;
}


 export function FUN_005a98e4 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005a97cc(param_1, param_2, param_4, param_3, param_6);
  FUN_005a97cc(param_1, param_2, param_4, param_5, param_6);
  FUN_005a9858(param_1, param_2, param_3, param_5, param_6);
  FUN_005a9858(param_1, param_4, param_3, param_5, param_6);
  return;
}


 export function FUN_005a9964 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005a97cc(param_1, param_2, ((param_4 + param_2) + -1), param_3, param_6);
  FUN_005a97cc(param_1, param_2, ((param_4 + param_2) + -1), ((param_5 + param_3) + -1), param_6);
  FUN_005a9858(param_1, param_2, param_3, ((param_5 + param_3) + -1), param_6);
  FUN_005a9858(param_1, ((param_4 + param_2) + -1), param_3, ((param_5 + param_3) + -1), param_6);
  return;
}


 export function FUN_005a99fc (param_1, param_2, param_3, param_4)

 {
  FUN_005a97cc(param_1, s32(param_2, 0), (s32(param_2, 2) + -1), s32(param_2, 1), param_3);
  FUN_005a9858(param_1, s32(param_2, 0), s32(param_2, 1), (s32(param_2, 3) + -1), param_3);
  FUN_005a97cc(param_1, s32(param_2, 0), (s32(param_2, 2) + -1), (s32(param_2, 3) + -1), param_4);
  FUN_005a9858(param_1, (s32(param_2, 2) + -1), s32(param_2, 1), (s32(param_2, 3) + -1), param_4);
  return;
}


 export function FUN_005a9aa3 (param_1, param_2)

 {
  FUN_005c041f(param_2);
  return;
}


 export function FUN_005a9abf (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let local_14;

  FUN_004086c0(DAT_ffffffec, param_2, param_3, param_4, param_5);
  FUN_005c0333(DAT_ffffffec, param_6);
  return;
}


 export function FUN_005a9afe (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, param_3, param_4, param_7, param_8);
  FUN_004086c0(DAT_ffffffdc, param_5, param_6, param_7, param_8);
  FUN_005c0593(param_2, DAT_ffffffec, DAT_ffffffdc);
  return;
}


 export function FUN_005a9b5d (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  let pCVar2;
  let pCVar3;
  let pCVar4;
  let pCVar5;
  let pCVar6;
  let pCVar7;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_8;

  pCVar2 = GetActiveView(param_2);
  pCVar3 = GetActiveView(param_2);
  if ((pCVar3 !== 0)) {
    if (((param_3 === param_7) || ((param_3 - param_7) < 0))) {
      local_34 = ((~(param_3 - param_7)) + 1);
    }
    else {
      local_34 = (param_3 - param_7);
    }
    if (((param_4 === param_8) || ((param_4 - param_8) < 0))) {
      local_38 = ((~(param_4 - param_8)) + 1);
    }
    else {
      local_38 = (param_4 - param_8);
    }
    local_2c = (local_38 % pCVar3);
    pCVar4 = (param_3 + param_5);
    pCVar5 = (param_4 + param_6);
    local_8 = param_4;
    while ((local_8 < pCVar5)) {
      local_30 = param_3;
      local_28 = (local_34 % pCVar2);
      while ((local_30 < pCVar4)) {
        pCVar6 = (pCVar2 + (local_30 - local_28));
        if ((pCVar4 <= (pCVar2 + (local_30 - local_28)))) {
          pCVar6 = pCVar4;
        }
        pCVar7 = (pCVar3 + (local_8 - local_2c));
        if ((pCVar5 <= (pCVar3 + (local_8 - local_2c)))) {
          pCVar7 = pCVar5;
        }
        FUN_005a9afe(param_2, param_1, local_28, local_2c, local_30, local_8, (pCVar6 - local_30), (pCVar7 - local_8));
        iVar1 = (local_30 - local_28);
        local_28 = 0;
        local_30 = (pCVar2 + iVar1);
      }
      iVar1 = (local_8 - local_2c);
      local_2c = 0;
      local_8 = (pCVar3 + iVar1);
    }
  }
  return;
}


 export function FUN_005a9ce9 (param_1, param_2, param_3, param_4)

 {
  FUN_005a97cc(param_1, s32(param_2, 0), (s32(param_2, 2) + -1), s32(param_2, 1), param_3);
  FUN_005a97cc(param_1, s32(param_2, 0), (s32(param_2, 2) + -1), (s32(param_2, 3) + -1), param_4);
  FUN_005a9858(param_1, s32(param_2, 0), s32(param_2, 1), (s32(param_2, 3) + -1), param_3);
  FUN_005a9858(param_1, (s32(param_2, 2) + -1), s32(param_2, 1), (s32(param_2, 3) + -1), param_4);
  FUN_004bb800(param_2, 1, 1);
  return;
}


 export function FUN_005a9f30 ()

 {
  let bVar1;
  let local_c;

  FUN_0047e94e(1, 0);
  if ((DAT_006ad308 < 2)) {
    bVar1 = 1;
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((s32((DAT_006ced20 + local_c * 4), 0) === 0)) {
        bVar1 = 0;
        break;
      }
    }
    if (bVar1) {
      w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
      wv(DAT_006ad678, s32(DAT_006ad678, 0));
    }
  }
  return;
}


 export function FUN_005aa004 ()

 {
  let bVar1;
  let local_c;

  FUN_0047e94e(1, 0);
  if ((DAT_006ad308 < 2)) {
    bVar1 = 1;
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((s32((DAT_006ced20 + local_c * 4), 0) === 0)) {
        bVar1 = 0;
        break;
      }
    }
    if ((DAT_006ad308 < 2)) {
      w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
      wv(DAT_006ad678, s32(DAT_006ad678, 0));
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005aa0e5 ()

 {
  let bVar1;
  let SVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_248;
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
  puStack_c = LAB_005ab08b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  uVar3 = FUN_00493c7d(DAT_006d1da0, DAT_006d1da0);
  FUN_005d23bb(s_Server:_%s_(%d)_00635c68, uVar3);
  for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
    if ((((1 << (((local_330) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      uVar3 = FUN_00493c7d(local_330, local_330);
      FUN_005d23bb(s_Client:_%s_(%d)_00635c78, uVar3);
    }
  }
  FUN_0059c2b8();
  FUN_00487007();
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  FUN_004897fa(1);
  FUN_00413476();
  local_18 = 0;
  for (/* cond: (local_328 < ((DAT_00655b16) << 16 >> 16)) */); local_328 = (local_328 < ((DAT_00655b16) << 16 >> 16)); local_328 = (local_328 + 1)) {
    if ((s8(_MEM[DAT_006560f7 + local_328 * 0x20]) === DAT_006d1da0)) {
      FUN_00410402(((s16((DAT_006560f0 + local_328 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_328 * 0x20), 0)) << 16 >> 16));
      local_18 = (local_18 + 1);
      break;
    }
  }
  if ((local_18 === 0)) {
    for (/* cond: (local_328 < ((DAT_00655b18) << 16 >> 16)) */); local_328 = (local_328 < ((DAT_00655b18) << 16 >> 16)); local_328 = (local_328 + 1)) {
      if ((s8(_MEM[DAT_0064f348 + local_328 * 0x58]) === DAT_006d1da0)) {
        FUN_00410402(((s16((DAT_0064f340 + local_328 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_328 * 0x58), 0)) << 16 >> 16));
        break;
      }
    }
  }
  bVar1 = DAT_00628048;
  if ((DAT_00628048 !== 0)) {
    do {
      if ((((1 << (DAT_00628048 & 0x1f)) & u8(DAT_00655b0a)) !== 0));
      if (((DAT_00628048 + 1) === 8)) {
        wv(DAT_00628048, 0);
      }
    } while ((DAT_00628048 !== bVar1));
    wv(DAT_0064b1ac, 1);
  }
 LAB_005aa3dc: :
  do {
    wv(DAT_00655b0b, (DAT_006c31a8 | DAT_00655b0b));
    wv(DAT_006c31a8, 0);
    _memset(DAT_0064ba48, -1, 0xc0);
    FUN_0048710a(-3);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
    FUN_0048a92d();
    if ((DAT_00628048 === 0)) {
      FUN_00487371(-3);
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0xea60);
    }
    iVar4 = FUN_0048aedc();
    if ((DAT_0064b1ac !== 0)) {
      wv(DAT_00628044, 0);
      break;
    }
    if ((DAT_0062c488 !== 0)) {
      FUN_004fba0c(((DAT_00655af8) << 16 >> 16));
      FUN_004fba9c(((DAT_00655af8) << 16 >> 16));
      FUN_004fbb2f(((DAT_00655af8) << 16 >> 16));
      FUN_004fbbdd();
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_00655b0b, ((DAT_006c31a8 | DAT_00655b0b) & ((DAT_00654fb0) & 0xFF)));
    wv(DAT_006c31a8, 0);
    wv(DAT_006ad699, 0);
    for (/* cond: (local_330 < 8) */); (wv(DAT_00628044, (DAT_00628044 !== 0)) && (local_330 = (local_330 < 8))); local_330 = (local_330 + 1)) {
      wv(DAT_00655b05, ((local_330) & 0xFF));
      if ((((1 << (((local_330) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_00489553(local_330);
        FUN_004b0b53(0xff, 2, 0, 0, 0);
      }
    }
    wv(DAT_006ad699, 1);
    XD_FlushSendBuffer(0xea60);
    FUN_0059c276();
    for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
      w32((DAT_006ced20 + local_330 * 4), 0, 0);
    }
    FUN_0046b14d(0x8b, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    wv(DAT_006d1da0, s32(DAT_006ad35c, DAT_006ad304 * 0x15));
    wv(DAT_00655b03, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
    wv(DAT_00655b05, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
    if ((DAT_00628048 === 0)) {
      FUN_00486e6f();
    }
    FUN_00489553(DAT_006d1da0);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    w32((DAT_006ced20 + DAT_006d1da0 * 4), 0, (s32((DAT_006ced20 + DAT_006d1da0 * 4), 0) + 1));
    wv(DAT_00635a3c, LAB_00403233);
    FUN_00410030(s_WAITPRODUCTION_00635c88, DAT_0063fc58, 0);
    local_2c = 0;
 LAB_005aa732: :
    if ((local_2c === 0)) {
      FUN_0047e94e(1, 0);
      if ((DAT_006ad308 < 2)) {
        local_2c = 1;
        goto LAB_005aa7ee;
      }
      local_2c = 1;
      for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
        if ((s32((DAT_006ced20 + local_330 * 4), 0) === 0)) {
          local_2c = 0;
          break;
        }
      }
      goto LAB_005aa732;
    }
 LAB_005aa7ee: :
    wv(DAT_006c9210, 0);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    FUN_0046b14d(0x8d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    wv(DAT_006d1da0, s32(DAT_006ad35c, DAT_006ad304 * 0x15));
    wv(DAT_00655b03, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
    wv(DAT_006ad699, 0);
    if ((DAT_00628048 === 0)) {
      FUN_0048710a(-1);
    }
    for (/* cond: (local_330 < 8) */); (wv(DAT_00628044, (DAT_00628044 !== 0)) && (local_330 = (local_330 < 8))); local_330 = (local_330 + 1)) {
      if ((((1 << (((local_330) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        wv(DAT_00655b05, ((local_330) & 0xFF));
        _DAT_006ad578 = local_330;
        FUN_004e4ceb();
        FUN_00568e86(local_330);
        if ((DAT_0062c488 !== 0)) {
          FUN_00413476();
          FUN_0047cf9e(DAT_006d1da0, 1);
          FUN_00419b80();
        }
        FUN_00543cd6();
      }
    }
    for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
      w32((DAT_006ced20 + local_330 * 4), 0, 0);
      w32((DAT_006ad644 + local_330 * 4), 0, 0);
    }
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x8e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    wv(DAT_00655b05, ((DAT_006d1da0) & 0xFF));
    wv(DAT_006ad699, 1);
    if ((DAT_00628044 === 0)) {
      FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
      break;
    }
    if ((DAT_00654fa8 === 0)) {
      FUN_0041b8ff(DAT_006d1da0);
      w16((DAT_00654b60 + DAT_006d1da0 * 2), 0, 1);
    }
    if ((DAT_00654b70 !== 0)) {
      wv(DAT_00633a78, (DAT_00654b70 / 0x3e8 | 0));
      _DAT_0066c990 = -1;
    }
    _DAT_006ad578 = DAT_006d1da0;
    FUN_004e4ceb();
    _DAT_0066c990 = -1;
    FUN_00552112();
    local_28 = DAT_0066ca54;
    local_24 = DAT_0066ca58;
    local_20 = DAT_0066ca5c;
    local_1c = DAT_0066ca68;
    FUN_00408490(DAT_ffffffd8);
    FUN_00413476();
    FUN_0047cf9e(DAT_006d1da0, 1);
    FUN_00568e86(DAT_006d1da0);
    local_14 = (s32((DAT_006af220 + DAT_006d1da0 * 4), 0) - s32((DAT_006af240 + DAT_006d1da0 * 4), 0));
    if ((DAT_00654fa8 === 0)) {
      wv(DAT_00635a3c, LAB_00403c74);
      uVar3 = FUN_00493ba6(DAT_006d1da0);
      FUN_0040ff60(0, uVar3);
      uVar3 = FUN_00493b10(DAT_006d1da0);
      FUN_0040ff60(1, uVar3);
      if ((s32((DAT_006af240 + DAT_006d1da0 * 4), 0) < s32((DAT_006af220 + DAT_006d1da0 * 4), 0))) {
        w32((DAT_006af240 + DAT_006d1da0 * 4), 0, s32((DAT_006af220 + DAT_006d1da0 * 4), 0));
        FUN_00421da0(0, local_14);
        if ((local_14 === 1)) {
          FUN_0043ca10(DAT_006359d4, s_CASUALTY_00635c98);
        }
        else {
          FUN_0043ca10(DAT_006359d4, s_CASUALTIES_00635ca4);
        }
        FUN_0059ec88(DAT_0063fc58, 0, 0);
        local_324 = DAT_fffffcdc;
        FUN_00421bd0();
        FUN_0046e020(0x30, 0, 0, 0);
        FUN_0040bc80(0);
        if ((local_248 !== 0)) {
          FUN_0043856b(DAT_006d1da0);
        }
      }
      else {
        FUN_0043ca10(DAT_006359d4, s_OURTURNTOMOVE_00635cb0);
        FUN_0059ec88(DAT_0063fc58, 0, 0);
        local_324 = DAT_fffffcdc;
        FUN_00421bd0();
        FUN_0046e020(0x30, 0, 0, 0);
        FUN_0040bc80(0);
      }
    }
    if ((DAT_00654fa8 === 0)) {
      FUN_0048aa24();
      if ((DAT_00654b70 !== 0)) {
        FUN_0055af2e(1);
      }
      FUN_0048a416();
    }
    else {
      _DAT_00673b08 = u8(DAT_00655b0b);
      wv(DAT_00655b0b, 0);
      if ((DAT_00654b70 !== 0)) {
        FUN_0055af2e(1);
      }
      FUN_00543cd6();
      wv(DAT_00655b0b, ((None) & 0xFF));
      SVar2 = FUN_006e7d64(0x1b);
      if (((((SVar2) << 16 >> 16) & 0x8001) !== 0)) {
        wv(DAT_00654faa, 1);
      }
      wv(DAT_00654faa, (DAT_00654faa + 0xffff));
      if (((DAT_00654faa + 0xffff) === 0)) {
        wv(DAT_00654fa8, 0);
      }
    }
    if ((DAT_00654b70 !== 0)) {
      FUN_0055ae80(1);
    }
    FUN_0056a65e(1);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    wv(DAT_00654fa4, 0);
    wv(DAT_00628048, 0);
    wv(DAT_00654fa6, 0);
    wv(DAT_0062c488, 0);
    wv(DAT_00655aee, (DAT_00655aee & 0xfffe));
    w32((DAT_006ced20 + DAT_006d1da0 * 4), 0, (s32((DAT_006ced20 + DAT_006d1da0 * 4), 0) + 1));
    XD_FlushSendBuffer(0xea60);
    wv(DAT_00635a3c, LAB_004030ee);
    FUN_00410030(s_WAITHUMANMOVES_00635cc0, DAT_0063fc58, 0);
    local_30 = 0;
 LAB_005aae35: :
    if ((local_30 === 0)) {
      FUN_0047e94e(1, 0);
      if ((DAT_006ad308 < 2)) {
        local_30 = 1;
        goto LAB_005aaef1;
      }
      local_30 = 1;
      for (/* cond: (local_330 < 8) */); local_330 = (local_330 < 8); local_330 = (local_330 + 1)) {
        if ((s32((DAT_006ced20 + local_330 * 4), 0) === 0)) {
          local_30 = 0;
          break;
        }
      }
      goto LAB_005aae35;
    }
 LAB_005aaef1: :
    wv(DAT_006c921c, 0);
    FUN_0048dab9();
    if ((None === DAT_006d1da0)) {
      for (/* cond: (local_328 < ((DAT_00655b16) << 16 >> 16)) */); local_328 = (local_328 < ((DAT_00655b16) << 16 >> 16)); local_328 = (local_328 + 1)) {
        if ((s8(_MEM[DAT_006560f7 + local_328 * 0x20]) === local_330)) {
          FUN_005b6787(local_328);
        }
      }
      local_32c = ((DAT_00655b18) << 16 >> 16);
      while ((-1 < local_32c)) {
        if ((s32((DAT_0064f394 + local_32c * 0x58), 0) !== 0)) {
          w32((DAT_0064f344 + local_32c * 0x58), 0, (s32((DAT_0064f344 + local_32c * 0x58), 0) & -0x400001));
        }
      }
    }
    FUN_00453af0();
    if ((DAT_00628044 === 0)) {
      wv(DAT_00628044, 0);
      break;
    }
  } while ((DAT_00628044 !== 0));
  FUN_0055ae80(0);
  FUN_004824e3();
  if ((DAT_0064b1ac !== 0)) {
    FUN_0048b165();
  }
  local_8 = -1;
  FUN_005ab07f();
  FUN_005ab095();
  return;
}


 export function FUN_005ab07f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005ab095 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005ab0a3 ()

 {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c);
  if ((DAT_006c8fb4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_005ab120 ()

 {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c);
  if ((DAT_006c8fb4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_005ab19d ()

 {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c);
  if ((DAT_006c8fb4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 export function FUN_005ab23a ()

 {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c);
  if ((DAT_006c8fb4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    wv(DAT_006ad678, s32(DAT_006ad678, 0));
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005ab2d5 ()

 {
  let cVar1;
  let SVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_31c;
  let local_318;
  let local_314;
  let local_238;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005abfe7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = 1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_20 = 1;
  uVar3 = FUN_00493c7d(DAT_006ad35c, DAT_006ad35c);
  FUN_005d23bb(s_Server:_%s_(%d)_00635cd0, uVar3);
  for (/* cond: (local_31c < 8) */); local_31c = (local_31c < 8); local_31c = (local_31c + 1)) {
    if ((((1 << (((local_31c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      uVar3 = FUN_00493c7d(local_31c, local_31c);
      FUN_005d23bb(s_Client:_%s_(%d)_00635ce0, uVar3);
    }
  }
  FUN_0059c2b8();
  wv(DAT_006d1da0, s32(DAT_006ad35c, DAT_006ad304 * 0x15));
  wv(DAT_00628048, DAT_00654fa4);
  wv(DAT_0062c488, ((DAT_00654fa6) << 16 >> 16));
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  wv(DAT_00655b03, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
  wv(DAT_00655b05, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
  FUN_00413476();
  local_1c = 0;
  for (/* cond: (local_318 < ((DAT_00655b16) << 16 >> 16)) */); local_318 = (local_318 < ((DAT_00655b16) << 16 >> 16)); local_318 = (local_318 + 1)) {
    if ((s8(_MEM[DAT_006560f7 + local_318 * 0x20]) === s32(DAT_006ad35c, DAT_006ad304 * 0x15))) {
      FUN_00410402(((s16((DAT_006560f0 + local_318 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_318 * 0x20), 0)) << 16 >> 16));
      local_1c = (local_1c + 1);
      break;
    }
  }
  if ((local_1c === 0)) {
    for (/* cond: (local_318 < ((DAT_00655b18) << 16 >> 16)) */); local_318 = (local_318 < ((DAT_00655b18) << 16 >> 16)); local_318 = (local_318 + 1)) {
      if ((s8(_MEM[DAT_0064f348 + local_318 * 0x58]) === DAT_006d1da0)) {
        FUN_00410402(((s16((DAT_0064f340 + local_318 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_318 * 0x58), 0)) << 16 >> 16));
        break;
      }
    }
  }
  FUN_00569363(1);
  FUN_00568e86(DAT_006d1da0);
  FUN_004897fa(1);
  cVar1 = DAT_00628048;
  if ((((1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    FUN_0048d9ad(DAT_006ad35c);
    wv(DAT_00635a3c, LAB_00401c35);
    FUN_00426fb0(s_CLIENTHOTWAIT_00635cf0, 0x2000000, DAT_0063fc58, 0);
    cVar1 = DAT_00628048;
  }
 LAB_005ab60f: :
  do {
    wv(DAT_00628048, cVar1);
    for (/* cond: (local_318 < ((DAT_00655b16) << 16 >> 16)) */); local_318 = (local_318 < ((DAT_00655b16) << 16 >> 16)); local_318 = (local_318 + 1)) {
      if ((s8(_MEM[DAT_006560f7 + local_318 * 0x20]) === DAT_006d1da0)) {
        FUN_005b6787(local_318);
      }
    }
    if ((local_14 === 0)) {
      FUN_0048d9ad(DAT_006ad35c);
      wv(DAT_00635a3c, LAB_00402450);
      FUN_00410030(s_WAITHUMANMOVES_00635d00, DAT_0063fc58, 0);
    }
    FUN_0048d9ad(DAT_006ad35c);
    while ((DAT_00628044 !== 0)) {
      FUN_0047e94e(1, 0);
      FUN_0048da51(DAT_006ad35c);
      iVar4 = FUN_0048dab9();
      if ((iVar4 !== 0)) {
        local_8 = -1;
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
    }
    if ((DAT_006ad698 !== 0)) {
      iVar4 = FUN_004828a5();
      if ((iVar4 === 0)) {
        local_8 = -1;
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
      if ((DAT_006ad2f7 !== 0)) {
        local_8 = -1;
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
      if ((DAT_00628044 !== 0)) {
      wv(DAT_006c9038, 0);
      wv(DAT_006c920c, 0);
      wv(DAT_006d1da0, s32(DAT_006ad35c, DAT_006ad304 * 0x15));
      wv(DAT_00655b03, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
      wv(DAT_00655b05, ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF));
      if ((DAT_00654b70 !== 0)) {
        wv(DAT_00633a78, (DAT_00654b70 / 0x3e8 | 0));
        _DAT_0066c990 = -1;
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
      _DAT_006ad578 = DAT_006d1da0;
      FUN_00413476();
      FUN_0047cf9e(DAT_006d1da0, 1);
      FUN_00569363(1);
      FUN_00568e86(DAT_006d1da0);
      if ((DAT_00654fa8 === 0)) {
        if ((DAT_00628048 === 0)) {
          FUN_00486e6f();
        }
        if ((DAT_0062c488 !== 0)) {
          FUN_00489553(DAT_006d1da0);
          FUN_004b0b53(0xff, 2, 0, 0, 0);
        }
        XD_FlushSendBuffer(0xea60);
        FUN_0048aa24();
        FUN_0046b14d(0x8c, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0048d9ad(DAT_006ad35c);
        wv(DAT_00635a3c, LAB_004028c4);
        FUN_00410030(s_WAITPRODUCTION_00635d20, DAT_0063fc58, 0);
        while ((DAT_00628044 !== 0)) {
          FUN_0047e94e(1, 0);
          FUN_0048da51(DAT_006ad35c);
          iVar4 = FUN_0048dab9();
          if ((iVar4 !== 0)) {
            local_8 = -1;
            FUN_005abfdb();
            FUN_005abff1();
            return;
          }
        }
        if ((DAT_00628044 !== 0)) {
          wv(DAT_006c9214, 0);
          FUN_0048d9ad(DAT_006ad35c);
          wv(DAT_00635a3c, LAB_00401695);
          FUN_00410030(s_WAITAIMOVES_00635d30, DAT_0063fc58, 0);
          while ((DAT_00628044 !== 0)) {
            FUN_0047e94e(1, 0);
            FUN_0048da51(DAT_006ad35c);
            iVar4 = FUN_0048dab9();
            if ((iVar4 !== 0)) {
              local_8 = -1;
              FUN_005abfdb();
              FUN_005abff1();
              return;
            }
          }
          if ((DAT_00628044 !== 0)) {
            wv(DAT_006c9218, 0);
            if ((DAT_00654fa8 === 0)) {
              FUN_0041b8ff(DAT_006d1da0);
              w16((DAT_00654b60 + DAT_006d1da0 * 2), 0, 1);
            }
            local_18 = (s32((DAT_006af220 + DAT_006d1da0 * 4), 0) - s32((DAT_006af240 + DAT_006d1da0 * 4), 0));
            if ((DAT_00654fa8 === 0)) {
              wv(DAT_00635a3c, LAB_00403c74);
              uVar3 = FUN_00493ba6(DAT_006d1da0);
              FUN_0040ff60(0, uVar3);
              uVar3 = FUN_00493b10(DAT_006d1da0);
              FUN_0040ff60(1, uVar3);
              if ((local_18 < 1)) {
                FUN_0043ca10(DAT_006359d4, s_OURTURNTOMOVE_00635d54);
                FUN_0059ec88(DAT_0063fc58, 0, 0);
                local_314 = DAT_fffffcec;
                FUN_00421bd0();
                FUN_0046e020(0x30, 0, 0, 0);
                FUN_0040bc80(0);
              }
              else {
                w32((DAT_006af240 + DAT_006d1da0 * 4), 0, s32((DAT_006af220 + DAT_006d1da0 * 4), 0));
                FUN_00421da0(0, local_18);
                if ((local_18 === 1)) {
                  FUN_0043ca10(DAT_006359d4, s_CASUALTY_00635d3c);
                }
                else {
                  FUN_0043ca10(DAT_006359d4, s_CASUALTIES_00635d48);
                }
                FUN_0059ec88(DAT_0063fc58, 0, 0);
                local_314 = DAT_fffffcec;
                FUN_00421bd0();
                FUN_0046e020(0x30, 0, 0, 0);
                FUN_0040bc80(0);
                if ((local_238 !== 0)) {
                  FUN_0043856b(DAT_006d1da0);
                }
              }
            }
            if ((DAT_00654b70 !== 0)) {
              FUN_0055af2e(1);
            }
            FUN_0048a416();
          }
          else {
            wv(DAT_006c918c, 0);
          }
        }
        else {
          local_20 = 0;
        }
      }
      else {
        _DAT_00673b08 = u8(DAT_00655b0b);
        wv(DAT_00655b0b, 0);
        if ((DAT_0062c488 !== 0)) {
          FUN_00489553(DAT_006d1da0);
        }
        FUN_0046b14d(0x8c, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0048d9ad(DAT_006ad35c);
        wv(DAT_00635a3c, LAB_004028c4);
        FUN_00410030(s_WAITPRODUCTION_00635d10, DAT_0063fc58, 0);
        while ((DAT_00628044 !== 0)) {
          FUN_0047e94e(1, 0);
          FUN_0048da51(DAT_006ad35c);
          iVar4 = FUN_0048dab9();
          if ((iVar4 !== 0)) {
            local_8 = -1;
            FUN_005abfdb();
            FUN_005abff1();
            return;
          }
        }
        if ((DAT_00628044 !== 0)) {
          wv(DAT_006c9214, 0);
          if ((DAT_00654b70 !== 0)) {
            FUN_0055af2e(1);
          }
          FUN_00543cd6();
          wv(DAT_00655b0b, ((None) & 0xFF));
          SVar2 = FUN_006e7d64(0x1b);
          if (((((SVar2) << 16 >> 16) & 0x8001) !== 0)) {
            wv(DAT_00654faa, 1);
          }
        }
        else {
          local_20 = 0;
        }
      }
    }
    else {
      local_20 = 0;
    }
    FUN_0055ae80(1);
    FUN_0056a65e(1);
    FUN_00453af0();
    if ((DAT_0064b1ac !== 0)) {
      wv(DAT_00628044, 0);
    }
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x8f, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    wv(DAT_00654fa4, 0);
    wv(DAT_00628048, 0);
    wv(DAT_00654fa6, 0);
    wv(DAT_0062c488, 0);
    local_14 = 0;
    cVar1 = 0;
    if ((DAT_00628044 === 0)) {
      FUN_0046b14d(0x2d, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
      XD_FlushSendBuffer(0xea60);
      FUN_0059b293(1);
      if ((DAT_0064b1ac !== 0)) {
        FUN_0048b165();
      }
      local_8 = -1;
      FUN_005abfdb();
      FUN_005abff1();
      return;
    }
  } while ( true );
}


 export function FUN_005abfdb ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005abff1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005ac840 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xb9c), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0xb9c), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  for (/* cond: (local_8 < s32((in_ECX + 0xb9c), 0)) */); local_8 = (local_8 < s32((in_ECX + 0xb9c), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0xc98) + local_8 * 4), 0));
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


 export function FUN_005ac9ad (in_ECX)

 {
  let iVar1;
  let extraout_EAX;
  let sVar2;
  // in_ECX promoted to parameter;
  let iVar3;
  let local_498;
  let local_488;
  let local_478;
  let local_468;
  let local_460;
  let local_450;
  let local_44c;
  let local_448;
  let local_444;
  let local_440;
  let local_43c;
  let local_438;
  let local_434;
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

  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_8 = DAT_0067a798;
  local_44 = s32((in_ECX + 0x5f8), 0);
  local_30 = 0xa;
  local_40 = FUN_00407f90((in_ECX + 0x5f8));
  local_440 = (local_40 / 2 | 0);
  local_1c = FUN_00407fc0((in_ECX + 0x5f8));
  local_1c = (local_1c / 0xc | 0);
  local_44c = FUN_0040ef70();
  local_48 = (s32((in_ECX + 0x5fc), 0) + 0xf);
  local_448 = s32(((in_ECX + 0xc98) + s32((in_ECX + 0x120), 0) * 4), 0);
  local_44 = (local_44 + local_30);
  FUN_005cda06(DAT_ffffffe0, DAT_ffffffdc);
  FUN_005cd775(2, 1);
  local_438 = FUN_00451830();
  local_438 = (local_438 + DAT_0062d858 * 2);
  iVar3 = (local_48 + (local_1c / 2 | 0));
  iVar1 = FUN_00451860();
  FUN_005cef31(DAT_fffffb78, DAT_006a6668, local_44, (iVar3 - (iVar1 / 2 | 0)));
  FUN_005cd775(local_20, local_24);
  local_2c = DAT_00635a1c;
  FUN_005c19ad(DAT_00635a1c);
  iVar1 = FUN_00451830();
  local_44 = (local_44 + ((local_438 + iVar1) + 0x32));
  local_48 = FUN_00451860();
  local_48 = (s32((in_ECX + 0x5fc), 0) + local_48);
  FUN_0040bbb0();
  FUN_0040bc10(0x79);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_44 = (local_44 + (iVar1 + 5));
  FUN_0040bbb0();
  if ((_MEM[DAT_0064b1cb + local_448 * 0x14] < 0)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  }
  else {
    FUN_0040ff00(s32((DAT_00627684 + s8(_MEM[DAT_0064b1cb + local_448 * 0x14]) * 0x10), 0));
    local_450 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_fffffba0, local_44, local_48, ((local_450 + local_44) + 5), (extraout_EAX + local_48));
    FUN_00452c14(s8(_MEM[DAT_0064b1cb + local_448 * 0x14]), local_44, local_48, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
  }
  local_3c = (local_440 + -75);
  local_44 = (s32((in_ECX + 0x5f8), 0) + local_30);
  iVar1 = FUN_00451860();
  local_48 = ((iVar1 * 2 + s32((in_ECX + 0x5fc), 0)) + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x84);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  if ((_MEM[DAT_0064b1c8 + local_448 * 0x14] < 0)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  }
  else {
    _sprintf(DAT_00679640, DAT_00635d94, s8(_MEM[DAT_0064b1c8 + local_448 * 0x14]) * 0xa);
    FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
    iVar1 = FUN_0040efd0(DAT_00679640);
    local_44 = ((local_3c + iVar1) + 5);
    iVar3 = (local_48 + (local_1c / 2 | 0));
    iVar1 = FUN_00451860();
    FUN_005cef31(DAT_fffffb68, DAT_006a6668, local_44, ((iVar3 + -2) - (iVar1 / 2 | 0)));
  }
  local_44 = (s32((in_ECX + 0x5f8), 0) + local_30);
  local_48 = (local_48 + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x7f);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635d98, s8(_MEM[DAT_0064b1c4 + local_448 * 0x14]));
  FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  local_48 = (local_48 + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x80);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635d9c, s8(_MEM[DAT_0064b1c5 + local_448 * 0x14]));
  FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  local_48 = (local_48 + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x82);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635da0, (s8(_MEM[DAT_0064b1c6 + local_448 * 0x14]) / 0xa | 0));
  FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  local_48 = (local_48 + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x83);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635da4, s8(_MEM[DAT_0064b1c7 + local_448 * 0x14]));
  FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  local_48 = (local_48 + local_44c);
  FUN_0040bbb0();
  FUN_0040bc10(0x81);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_44, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635da8, (s8(_MEM[DAT_0064b1c2 + local_448 * 0x14]) / 3 | 0));
  FUN_005c0f57(local_8, DAT_00679640, local_3c, local_48, 5);
  local_444 = s_PEDIA_00635dac;
  FUN_0040bbb0();
  FUN_0040ff30(local_448);
  local_43c = 0;
  local_34 = 0;
  local_28 = 7;
  local_4c = 0;
  iVar1 = FUN_004a2379(local_444, s_PEDIAUNITFACTS_00635db4);
  if ((iVar1 === 0)) {
    local_468 = 0;
    FUN_004aef20(DAT_fffffbcc);
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 1) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 2) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 4) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 8) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 0x10) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 0x20) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 0x40) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bc + local_448 * 0x14] & 0x80) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 1) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 2) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 4) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 8) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 0x10) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 0x20) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    local_38 = FUN_004a23fc(1);
    if (((_MEM[DAT_0064b1bd + local_448 * 0x14] & 0x40) !== 0)) {
      if ((local_468 === 0)) {
        FUN_005f22d0(DAT_fffffbcc, (local_38 + 1));
        local_468 = 1;
      }
      else {
        FUN_005f22e0(DAT_fffffbcc, (local_38 + 1));
      }
      FUN_004aef36(DAT_fffffbcc);
    }
    FUN_004a2020();
    local_44 = (s32((in_ECX + 0x5f8), 0) + local_440);
    iVar1 = FUN_00451860();
    local_48 = ((iVar1 * 2 + s32((in_ECX + 0x5fc), 0)) + local_44c);
    sVar2 = _strlen(DAT_fffffbcc);
    if ((sVar2 !== 0)) {
      iVar1 = s32((in_ECX + 0x604), 0);
      iVar3 = FUN_00407f90((in_ECX + 0x5f8));
      FUN_006e7d90(DAT_fffffb88, local_44, local_48, (local_44 + (iVar3 / 2 | 0)), iVar1);
      FUN_005c1167(local_8, DAT_fffffbcc, DAT_fffffb88, 5);
    }
  }
  FUN_00452768(s32((in_ECX + 0x120), 0));
  FUN_005c0073(DAT_ffffffe8);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_005ad998 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_006ad908 === 0)) {
    for (/* cond: (s32(((in_ECX + 0xc98) + local_8 * 4), 0) !== param_1) */);
        (local_8 = (local_8 < s32((in_ECX + 0xb9c), 0)) && (in_ECX = (in_ECX + 0xc98)));
        local_8 = (local_8 + 1)) {
    }
    if ((s32((in_ECX + 0xb9c), 0) !== local_8)) {
      FUN_004f7bd1(4, 0);
      w32((in_ECX + 0x120), 0, local_8);
      w32((in_ECX + 0x1f38), 0, local_8);
      w32((in_ECX + 0x124), 0, 1);
      w32((in_ECX + 0x11c), 0, 1);
      FUN_004f4793();
      FUN_00451bf0();
      uVar1 = FUN_004f8a9b(DAT_006a7d50, local_8);
      FUN_005f22d0((in_ECX + 0x618), uVar1);
      FUN_004f6244();
      FUN_005ac9ad();
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


 export function FUN_005adfa0 (param_1, param_2, param_3)

 {
  if ((param_2 <= param_1)) {
    param_2 = param_1;
  }
  if ((param_2 <= param_3)) {
    param_3 = param_2;
  }
  return param_3;
}


 export function FUN_005adfd9 (param_1, param_2)

 {
  let uVar1;

  uVar1 = s32(param_1, 0);
  w32(param_1, 0, s32(param_2, 0));
  w32(param_2, 0, uVar1);
  return;
}


 export function FUN_005ae006 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    if (((param_1 & 1) !== 0)) {
      local_8 = (local_8 + 1);
    }
    param_1 = (param_1 >> 1);
  }
  return local_8;
}


 export function FUN_005ae052 (param_1)

 {
  if (((DAT_00655ae8 & 0x8000) === 0)) {
    if ((param_1 < 0)) {
      param_1 = (((DAT_006d1160) << 16 >> 16) + param_1);
    }
    else if ((((DAT_006d1160) << 16 >> 16) <= param_1)) {
      param_1 = (param_1 - ((DAT_006d1160) << 16 >> 16));
    }
  }
  return param_1;
}


 export function FUN_005ae0b0 (param_1)

 {
  if (((DAT_00655ae8 & 0x8000) === 0)) {
    if ((param_1 < 0)) {
      param_1 = (((DAT_006d116a) << 16 >> 16) + param_1);
    }
    else if ((((DAT_006d116a) << 16 >> 16) <= param_1)) {
      param_1 = (param_1 - ((DAT_006d116a) << 16 >> 16));
    }
  }
  return param_1;
}


 export function FUN_005ae10e (param_1, param_2)

 {
  let local_8;

  if (((param_1 === param_2) || ((param_1 - param_2) < 0))) {
    local_8 = ((~(param_1 - param_2)) + 1);
  }
  else {
    local_8 = (param_1 - param_2);
  }
  if (((((DAT_006d1160) << 16 >> 16) >> 1) < local_8)) {
    local_8 = (((DAT_006d1160) << 16 >> 16) - local_8);
  }
  return local_8;
}


 export function FUN_005ae17d (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005ae10e(param_1, param_2);
  return ((iVar1 + 1) >> 1);
}


 export function FUN_005ae1b0 (param_1, param_2, param_3, param_4)

 {
  let local_c;
  let local_8;

  if (((param_1 === param_3) || ((param_1 - param_3) < 0))) {
    local_8 = ((~(param_1 - param_3)) + 1);
  }
  else {
    local_8 = (param_1 - param_3);
  }
  if (((((DAT_006d1160) << 16 >> 16) >> 1) < local_8)) {
    local_8 = (((DAT_006d1160) << 16 >> 16) - local_8);
  }
  if (((param_2 === param_4) || ((param_2 - param_4) < 0))) {
    local_c = ((~(param_2 - param_4)) + 1);
  }
  else {
    local_c = (param_2 - param_4);
  }
  return ((local_c + local_8) >> 1);
}


 export function FUN_005ae24d (param_1, param_2)

 {
  if ((param_1 < 1)) {
    param_1 = ((~param_1) + 1);
  }
  if ((param_2 < 1)) {
    param_2 = ((~param_2) + 1);
  }
  return ((param_1 + param_2) >> 1);
}


 export function FUN_005ae296 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  if ((param_1 < 1)) {
    param_1 = ((~param_1) + 1);
  }
  if ((param_2 < 1)) {
    param_2 = ((~param_2) + 1);
  }
  iVar1 = ((param_2 + param_1) >> 1);
  if ((param_2 < param_1)) {
    local_8 = (param_1 - (((iVar1 - param_2) + 1) >> 1));
  }
  else {
    local_8 = (param_2 - (((iVar1 - param_1) + 1) >> 1));
  }
  return local_8;
}


 export function FUN_005ae31d (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let local_c;

  uVar1 = FUN_005ae10e(param_1, param_3);
  if (((param_2 === param_4) || ((param_2 - param_4) < 0))) {
    local_c = ((~(param_2 - param_4)) + 1);
  }
  else {
    local_c = (param_2 - param_4);
  }
  FUN_005ae296(uVar1, local_c);
  return;
}


 export function FUN_005ae37b (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  if ((((param_2 - 1) & 7) === param_1)) {
    local_8 = 1;
  }
  return local_8;
}


 export function FUN_005ae3bf (param_1, param_2, param_3)

 {
  w32(param_2, 0, (param_1 >> 3));
  w32(param_3, 0, (1 << (((param_1) & 0xFF) & 7)));
  return;
}


 export function FUN_005ae3ec (param_1, param_2)

 {
  let local_8;

  if ((param_2 !== 0)) {
    if ((param_2 < 1)) {
      local_8 = ((param_2) & 0xFF);
      if ((param_2 < 1)) {
        local_8 = ((~((param_2) & 0xFF)) + 1);
      }
      param_1 = (param_1 >> (local_8 & 0x1f));
    }
    else {
      param_1 = (param_1 << (((param_2) & 0xFF) & 0x1f));
    }
  }
  return param_1;
}


 export function FUN_005ae580 ()

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_310;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005aebfb;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  for (/* cond: (local_310 < 8) */); local_310 = (local_310 < 8); local_310 = (local_310 + 1)) {
    w16((DAT_00654b60 + local_310 * 2), 0, 0);
    _MEM[DAT_00654da4 + local_310 * 0x20] = 0;
  }
  wv(DAT_00654b70, 0);
  wv(DAT_00655b02, 2);
 LAB_005ae610: :
  wv(DAT_00631eec, 3);
  FUN_0052263c(-1, 0);
  FUN_0040ffa0(s_PBEM1_00635dcc, 1);
  FUN_0059ea99(((DAT_00666542) << 16 >> 16));
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  iVar1 = (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1));
  uVar2 = FUN_005226fa(0, iVar1);
  FUN_0059e783(uVar2, iVar1);
  iVar1 = FUN_0040bc80(0);
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  if ((iVar1 < 0)) {
    local_8 = -1;
    FUN_005aebef();
    FUN_005aec05();
    return;
  }
  wv(DAT_00666542, ((iVar1) & 0xFFFF));
  if ((iVar1 < 3)) {
    __chdir(DAT_00655020);
    FUN_0041e864(1);
  }
  wv(DAT_00627670, 0);
  /* switch */ () {
  case 0 :
    iVar1 = FUN_0041d417();
    if ((iVar1 !== 0));
    iVar1 = _rand();
    wv(DAT_00624ee8, ((iVar1 % 3) + -1));
    wv(DAT_00624eec, 0);
    iVar1 = _rand();
    if (((iVar1 % 3) === 0)) {
      wv(DAT_00624eec, ((iVar1 % 3) + -1));
    }
    iVar1 = _rand();
    wv(DAT_00624ef0, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef4, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef8, ((iVar1 % 3) + -1));
    iVar1 = FUN_0051dd97(0, 2);
    break;
  case 1 :
    iVar1 = FUN_0041dd0e();
    if ((iVar1 !== 0));
    if ((DAT_006d1166 !== 0)) {
      local_18 = 2;
    }
    iVar1 = _rand();
    wv(DAT_00624ee8, ((iVar1 % 3) + -1));
    wv(DAT_00624eec, 0);
    iVar1 = _rand();
    if (((iVar1 % 3) === 0)) {
      wv(DAT_00624eec, ((iVar1 % 3) + -1));
    }
    iVar1 = _rand();
    wv(DAT_00624ef0, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef4, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef8, ((iVar1 % 3) + -1));
    iVar1 = FUN_0051dd97(local_18, 2);
    break;
  case 2 :
    iVar1 = FUN_0041d417();
    if ((iVar1 !== 0));
    iVar1 = FUN_0041d7ea();
    if ((iVar1 !== 0));
    break;
  case 3 :
    wv(DAT_006a9110, 0);
    iVar1 = FUN_005218cb(2);
    if ((iVar1 === 0)) {
      if ((0 !== 0)) {
        wv(DAT_00655aea, (DAT_00655aea & -0x10001));
      }
      wv(DAT_00655b02, 2);
      iVar1 = FUN_005227e3();
      if ((iVar1 === 0)) {
        FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      }
      else {
        iVar1 = FUN_00521fe0(iVar1);
        if ((iVar1 === 0)) {
          FUN_004a73d9();
          local_8 = -1;
          FUN_005aebef();
          FUN_005aec05();
          return;
        }
        FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      }
    }
    else {
      FUN_005f22d0(DAT_0064bb08, DAT_00655020);
    }
    goto LAB_005ae610;
  case 4 :
    goto switchD_005aea9a_caseD_4;
  default :
    goto switchD_005aea9a_default;
  }
  if ((iVar1 === 0)) {
 switchD_005aea9a_default: :
    wv(DAT_00655b0a, 0);
    wv(DAT_00655b0b, 0);
    iVar1 = FUN_005227e3();
    if ((iVar1 !== 0)) {
      FUN_00522dfa();
      local_310 = 0;
      do {
        if ((iVar1 <= local_310)) {
          FUN_00522f8f(iVar1);
          FUN_004a73d9();
          FUN_0041a046(1);
          FUN_0041a5c4(1);
          FUN_0041a422(1);
          FUN_00419c8b();
          FUN_00408d33(local_18);
          FUN_004aa9c0();
          if ((DAT_00631ee8 !== 0)) {
            FUN_004a9785((DAT_00631ee8 + -1));
          }
          wv(DAT_00655b02, 2);
          if ((DAT_00628048 !== 0)) {
            wv(DAT_00655b03, DAT_00628048);
            wv(DAT_006d1da0, s8(DAT_00628048));
          }
          local_8 = -1;
          FUN_005aebef();
          FUN_005aec05();
          return;
        }
        while ((iVar3 !== 0)) {
          local_310 = (local_310 + -1);
          if ((local_310 < 0));
      } ( true );
    }
  }
  goto LAB_005ae610;
 switchD_005aea9a_caseD_4: :
  wv(DAT_006a9110, 0);
  iVar1 = FUN_00477d8c(0, 2, 1);
  if ((iVar1 === 0)) {
    if ((DAT_00655b02 === 2)) {
      FUN_004a73d9();
      local_8 = -1;
      FUN_005aebef();
      FUN_005aec05();
      return;
    }
    FUN_00410030(s_EMAILNOT_00635dd4, DAT_0063fc58, 0);
    if ((0 !== 0)) {
      wv(DAT_00655aea, (DAT_00655aea & -0x10001));
    }
  }
  else if ((0 !== 0)) {
    wv(DAT_00655aea, (DAT_00655aea & -0x10001));
  }
  goto LAB_005ae610;
}


 export function FUN_005aebef ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005aec05 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005aec14 (param_1, param_2)

 {
  let unaff_FS_OFFSET;
  let local_410;
  let local_40c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005aed19;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((param_2 === 0)) {
    local_410 = DAT_00635de0;
  }
  else {
    local_410 = DAT_00666590;
  }
  FUN_005a632a(DAT_006359d4, s_EMAILADDRESS_00635de4, 0x1f, local_410, 0, 0, 0, 1);
  local_14 = FUN_005a5f34(DAT_fffffbf4, 0);
  if ((local_14 === 0)) {
    FUN_005f22d0((DAT_00654da4 + param_1 * 0x20), DAT_fffffbf4);
    if ((param_2 !== 0)) {
      FUN_005f22d0(DAT_00666590, DAT_fffffbf4);
    }
  }
  local_8 = -1;
  FUN_005aed0d();
  FUN_005aed23();
  return;
}


 export function FUN_005aed0d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005aed23 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005aef20 ()

 {
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
    _Count = 0x28;
    _Source = FUN_00428b0c(s32((DAT_0064b1b8 + local_8 * 0x14), 0));
    _strncpy((DAT_006a1d88 + local_8 * 0x28), _Source, _Count);
    _MEM[DAT_006a1daf + local_8 * 0x28] = 0;
    w32((DAT_006a2d28 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1cb + local_8 * 0x14]));
    w32((DAT_006a2d2c + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c0 + local_8 * 0x14]));
    w32((DAT_006a2d30 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1ca + local_8 * 0x14]));
    w32((DAT_006a2d34 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c1 + local_8 * 0x14]));
    w32((DAT_006a2d38 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c8 + local_8 * 0x14]));
    w32((DAT_006a2d3c + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c9 + local_8 * 0x14]));
    w32((DAT_006a2d40 + local_8 * 0x58), 0, (s8(_MEM[DAT_0064b1c2 + local_8 * 0x14]) / u8(DAT_0064bcc8) | 0));
    w32((DAT_006a2d44 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c3 + local_8 * 0x14]));
    w32((DAT_006a2d48 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c4 + local_8 * 0x14]));
    w32((DAT_006a2d4c + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c5 + local_8 * 0x14]));
    w32((DAT_006a2d50 + local_8 * 0x58), 0, (s8(_MEM[DAT_0064b1c6 + local_8 * 0x14]) / 0xa | 0));
    w32((DAT_006a2d54 + local_8 * 0x58), 0, s8(_MEM[DAT_0064b1c7 + local_8 * 0x14]));
    w32((DAT_006a2d58 + local_8 * 0x58), 0, s32((DAT_0064b1bc + local_8 * 0x14), 0));
  }
  return;
}


 export function FUN_005af140 ()

 {
  let _Dest;
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
    _Count = 0xf;
    _Source = (DAT_006a1d88 + local_8 * 0x28);
    _Dest = FUN_00428b0c(s32((DAT_0064b1b8 + local_8 * 0x14), 0));
    _strncpy(_Dest, _Source, _Count);
    _MEM[DAT_0064b1cb + local_8 * 0x14] = _MEM[DAT_006a2d28 + local_8 * 0x58];
    _MEM[DAT_0064b1c0 + local_8 * 0x14] = _MEM[DAT_006a2d2c + local_8 * 0x58];
    _MEM[DAT_0064b1ca + local_8 * 0x14] = _MEM[DAT_006a2d30 + local_8 * 0x58];
    _MEM[DAT_0064b1c1 + local_8 * 0x14] = _MEM[DAT_006a2d34 + local_8 * 0x58];
    _MEM[DAT_0064b1c8 + local_8 * 0x14] = _MEM[DAT_006a2d38 + local_8 * 0x58];
    _MEM[DAT_0064b1c9 + local_8 * 0x14] = _MEM[DAT_006a2d3c + local_8 * 0x58];
    _MEM[DAT_0064b1c2 + local_8 * 0x14] = ((s32((DAT_006a2d40 + local_8 * 0x58), 0)) & 0xFF) * DAT_0064bcc8;
    _MEM[DAT_0064b1c3 + local_8 * 0x14] = _MEM[DAT_006a2d44 + local_8 * 0x58];
    _MEM[DAT_0064b1c4 + local_8 * 0x14] = _MEM[DAT_006a2d48 + local_8 * 0x58];
    _MEM[DAT_0064b1c5 + local_8 * 0x14] = _MEM[DAT_006a2d4c + local_8 * 0x58];
    _MEM[DAT_0064b1c6 + local_8 * 0x14] = ((s32((DAT_006a2d50 + local_8 * 0x58), 0)) & 0xFF) * 0xa;
    _MEM[DAT_0064b1c7 + local_8 * 0x14] = _MEM[DAT_006a2d54 + local_8 * 0x58];
    w32((DAT_0064b1bc + local_8 * 0x14), 0, s32((DAT_006a2d58 + local_8 * 0x58), 0));
  }
  return;
}


 export function FUN_005af343 ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_8;

  for (/* cond: (local_14 < 0xd) */); local_14 = (local_14 < 0xd); local_14 = (local_14 + 1)) {
    if ((s32((DAT_00635e60 + local_14 * 8), 0) === 9)) {
      iVar1 = FUN_00418740();
      _sprintf(DAT_fffffff0, DAT_00635f08, s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0));
      FUN_00418a30(DAT_fffffff0);
    }
    else if ((s32((DAT_00635e60 + local_14 * 8), 0) === 0xc)) {
      iVar1 = FUN_00418740();
      local_8 = s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0);
      if ((local_14 === 2)) {
        local_8 = (local_8 + 2);
      }
      FUN_00418d90(local_8);
    }
  }
  return;
}


 export function FUN_005af4ae ()

 {
  let iVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  for (/* cond: (local_18 < 0xd) */); local_18 = (local_18 < 0xd); local_18 = (local_18 + 1)) {
    if ((s32((DAT_00635e60 + local_18 * 8), 0) === 9)) {
      iVar1 = FUN_00418740();
      iVar1 = (iVar1 + -0xca);
      FUN_00418a70(DAT_fffffff0);
      local_8 = _atoi(DAT_fffffff0);
      uVar2 = FUN_005adfa0(local_8, s32((DAT_00635eb8 + iVar1 * 4), 0), s32((DAT_00635ed8 + iVar1 * 4), 0));
      w32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, uVar2);
      if ((s32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0) !== local_8)) {
        local_14 = (local_14 + 1);
      }
    }
    else if ((s32((DAT_00635e60 + local_18 * 8), 0) === 0xc)) {
      local_8 = FUN_00418d60();
      if ((local_18 === 2)) {
        local_8 = (local_8 + -2);
      }
      iVar1 = FUN_00418740();
      w32((DAT_006a2a00 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, local_8);
    }
  }
  return local_14;
}


 export function FUN_005af682 ()

 {
  FUN_005b09dc();
  return;
}


 export function FUN_005af69d (param_1)

 {
  let pcVar1;
  let sVar2;
  let local_10;
  let local_c;
  let local_8;

  for (/* cond: (local_c < 0x3e) */); local_c = (local_c < 0x3e); local_c = (local_c + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_0064b1b8 + local_c * 0x14), 0));
    FUN_005f22e0(DAT_00679640, DAT_00635f0c);
    pcVar1 = FUN_00428b0c(s32((DAT_0064b1b8 + local_c * 0x14), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0xd)) {
      pcVar1 = FUN_00428b0c(s32((DAT_0064b1b8 + local_c * 0x14), 0));
      local_10 = _strlen(pcVar1);
    }
    else {
      local_10 = 0xd;
    }
    FUN_004190a0((0xd - local_10));
    FUN_004ccdef(s8(_MEM[DAT_0064b1c0 + local_c * 0x14]), 1);
    FUN_004ccdb6(s8(_MEM[DAT_0064b1c1 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f10);
    FUN_004ccdb6((s8(_MEM[DAT_0064b1c2 + local_c * 0x14]) / u8(DAT_0064bcc8) | 0));
    FUN_005f22e0(DAT_00679640, DAT_00635f14);
    FUN_0040ff30(s8(_MEM[DAT_0064b1c3 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f18);
    FUN_004ccdb6(s8(_MEM[DAT_0064b1c4 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f1c);
    FUN_0040ff30(s8(_MEM[DAT_0064b1c5 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f20);
    if ((_MEM[DAT_0064b1c5 + local_c * 0x14] < 0xa)) {
      FUN_0040fe10();
    }
    FUN_004ccdb6((s8(_MEM[DAT_0064b1c6 + local_c * 0x14]) / 0xa | 0));
    FUN_005f22e0(DAT_00679640, DAT_00635f24);
    FUN_0040ff30(s8(_MEM[DAT_0064b1c7 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f28);
    FUN_004ccdb6(s8(_MEM[DAT_0064b1c8 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f2c);
    FUN_0040ff30(s8(_MEM[DAT_0064b1c9 + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f30);
    FUN_004ccdb6(s8(_MEM[DAT_0064b1ca + local_c * 0x14]));
    FUN_005f22e0(DAT_00679640, DAT_00635f34);
    FUN_004ccdef(s8(_MEM[DAT_0064b1cb + local_c * 0x14]), 1);
    FUN_0040fe10();
    for (/* cond: (-1 < local_8) */); -1 = (-1 < local_8); local_8 = (local_8 + -1)) {
      FUN_005f22e0(DAT_00679640, (DAT_00635f38 + ((u8(((s32((DAT_0064b1bc + local_c * 0x14), 0) & (1 << (((local_8) & 0xFF) & 0x1f))) !== 0)) - 1) & 4)));
    }
    FUN_005f22e0(DAT_00679640, DAT_00635f40);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_005af9e3 ()

 {
  let iVar1;
  let hWnd;
  let pcVar2;
  let uVar3;
  let pcVar4;
  let UVar5;
  let local_50;
  let local_4c;
  let local_2c;
  let local_c;
  let local_8;

  iVar1 = FUN_005af4ae();
  if ((iVar1 === 0)) {
    local_8 = 0;
    for (/* cond: (local_c < 0x3e) */); local_c = (local_c < 0x3e); local_c = (local_c + 1)) {
      pcVar4 = (DAT_006a1d88 + local_c * 0x28);
      pcVar2 = FUN_00428b0c(s32((DAT_0064b1b8 + local_c * 0x14), 0));
      iVar1 = _strcmp(pcVar2, pcVar4);
      if ((iVar1 !== 0)) {
        uVar3 = FUN_00428b0c(s32((DAT_0064b1b8 + local_c * 0x14), 0), (DAT_006a1d88 + local_c * 0x28));
        iVar1 = FUN_004cefe9(uVar3);
        local_8 = (local_8 + iVar1);
      }
    }
    if ((local_8 !== 0)) {
      iVar1 = FUN_0054a4c4();
      if ((iVar1 === 0)) {
        _sprintf(DAT_ffffffd4, s_Error_updating_EVENTS.%s_00635f4c, DAT_0062cd24);
        UVar5 = 0x10;
        pcVar2 = s_File_I/O_Error_00635f68;
        pcVar4 = DAT_ffffffd4;
        iVar1 = FUN_00414d10();
        FUN_006e7dd4(s32((iVar1 + 4), 0), pcVar4, pcVar2, UVar5);
      }
    }
    FUN_005af140();
    FUN_004ccab9(s_UNITS_00635f78, LAB_004036de);
    iVar1 = FUN_004ccf2d();
    if ((iVar1 === 0)) {
      _sprintf(DAT_ffffffb4, s_Error_updating_RULES.%s_00635f80, DAT_0062cd24);
      UVar5 = 0x10;
      pcVar2 = s_File_I/O_Error_00635f98;
      pcVar4 = DAT_ffffffb4;
      iVar1 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar1 + 4), 0), pcVar4, pcVar2, UVar5);
    }
    wv(DAT_006a1d7c, 0);
    wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
    FUN_004e4ceb();
  }
  else {
    FUN_005af343();
    FUN_005af682();
    if ((DAT_006a4f88 === 0)) {
      local_50 = 0;
    }
    else {
      local_50 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_50);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00635f44);
    FUN_0059d3c9(0);
    hWnd = FUN_00418770();
    FUN_006e7d94(hWnd);
  }
  return;
}


 export function FUN_005afbca ()

 {
  let sVar1;
  let local_12c;
  let local_128;
  let local_11a;
  let local_114;
  let local_10;
  let local_c;
  let local_8;

  local_10 = s32((DAT_006a4f88 + 0x2ec), 0);
  _strncpy(DAT_fffffed8, (DAT_006a1d88 + local_10 * 0x28), 0xf);
  local_11a = 0;
  do {
    if ((DAT_006a4f88 === 0)) {
      local_12c = 0;
    }
    else {
      local_12c = (DAT_006a4f88 + 0x48);
    }
    FUN_005a6c23(local_12c);
    local_8 = FUN_0051d63b(s_DEBUG_006359dc, s_UNITNAME_00635fa8, 0xe, DAT_fffffed8, DAT_fffffeec);
    FUN_005a6c45();
    if ((local_8 === -1));
  } while ((sVar1 === 0));
  if ((-1 < local_8)) {
    FUN_005f22d0((DAT_006a1d88 + local_10 * 0x28), DAT_fffffeec);
    local_c = FUN_00418d60();
    FUN_00418d20();
    for (/* cond: (local_10 < 0x3e) */); local_10 = (local_10 < 0x3e); local_10 = (local_10 + 1)) {
      FUN_00418ce0((DAT_006a1d88 + local_10 * 0x28));
    }
    FUN_00418d90(local_c);
    FUN_005af682();
  }
  return;
}


 export function FUN_005afd3b ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_00635fbc, s_UNITS_00635fb4);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_005afd9a ()

 {
  wv(DAT_006a1d7c, 0);
  wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
  return;
}


 export function FUN_005afdc2 ()

 {
  let uVar1;

  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 0xb, LAB_0040177b);
  FUN_00573e59((DAT_00641848 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c), uVar1);
  FUN_005af682();
  return;
}


 export function FUN_005afe15 ()

 {
  let uVar1;
  let local_84;

  FUN_005af4ae();
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x7dc), 0), (DAT_006a1d88 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x28));
  _sprintf(DAT_ffffff7c, s_%s_-_%s_00635fc4, uVar1);
  FUN_0058b47e(DAT_ffffff7c, s32((DAT_006a4f88 + 0x2ec), 0));
  return;
}


 export function FUN_005afe84 (param_1, param_2)

 {
  FUN_0051d7d6(param_1, (param_2 !== 0));
  return;
}


 export function FUN_005afea8 ()

 {
  let iVar1;
  let iVar2;
  let local_10;
  let local_8;

  iVar1 = s32((DAT_006a4f88 + 0x2ec), 0);
  FUN_0051d7bc();
  FUN_005afe84(0, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 1));
  FUN_005afe84(1, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 2));
  FUN_005afe84(2, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 4));
  FUN_005afe84(3, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 8));
  FUN_005afe84(4, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x10));
  FUN_005afe84(5, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x20));
  FUN_005afe84(6, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x40));
  FUN_005afe84(7, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x80));
  FUN_005afe84(8, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x100));
  FUN_005afe84(9, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x200));
  FUN_005afe84(0xa, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x400));
  FUN_005afe84(0xb, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x800));
  FUN_005afe84(0xc, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x1000));
  FUN_005afe84(0xd, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x2000));
  FUN_005afe84(0xe, (s32((DAT_006a2d58 + iVar1 * 0x58), 0) & 0x4000));
  FUN_0040ff60(0, (DAT_006a1d88 + iVar1 * 0x28));
  if ((DAT_006a4f88 === 0)) {
    local_10 = 0;
  }
  else {
    local_10 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_10);
  iVar2 = FUN_00421e70(s_ABILITIES_00635fcc, 1);
  if ((iVar2 === 0)) {
    iVar2 = FUN_0051d817(0);
    local_8 = u8((iVar2 !== 0));
    iVar2 = FUN_0051d817(1);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 2);
    }
    iVar2 = FUN_0051d817(2);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 4);
    }
    iVar2 = FUN_0051d817(3);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 8);
    }
    iVar2 = FUN_0051d817(4);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x10);
    }
    iVar2 = FUN_0051d817(5);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x20);
    }
    iVar2 = FUN_0051d817(6);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x40);
    }
    iVar2 = FUN_0051d817(7);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x80);
    }
    iVar2 = FUN_0051d817(8);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x100);
    }
    iVar2 = FUN_0051d817(9);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x200);
    }
    iVar2 = FUN_0051d817(0xa);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x400);
    }
    iVar2 = FUN_0051d817(0xb);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x800);
    }
    iVar2 = FUN_0051d817(0xc);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x1000);
    }
    iVar2 = FUN_0051d817(0xd);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x2000);
    }
    iVar2 = FUN_0051d817(0xe);
    if ((iVar2 !== 0)) {
      local_8 = (local_8 | 0x4000);
    }
    w32((DAT_006a2d58 + iVar1 * 0x58), 0, local_8);
  }
  FUN_0059d3c9(0);
  return;
}
