// ═══════════════════════════════════════════════════════════════════
// block_00450000.js — Mechanical transpilation of block_00450000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00450000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00450000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_006d1da0 = 0;
let DAT_0067a8c0 = 0;
let DAT_0064c6c0 = new Uint32Array(8 * 0x594);
let DAT_0064c6c1 = new Uint8Array(8 * 0x594);
let DAT_0064c6c2 = new Uint8Array(8 * 0x594);
let DAT_00655b07 = 0;
let DAT_00627689 = new Uint8Array(256 * 0x10);
let DAT_0062768c = new Int8Array(256 * 0x10);
let DAT_0062768d = new Int8Array(256 * 0x10);
let DAT_0062768e = new Int8Array(256 * 0x10);
let DAT_0062768f = new Int8Array(256 * 0x10);
let DAT_00627684 = new Uint8Array(256 * 0x10);
let DAT_00646cb8 = new Uint8Array(0x10000);
let DAT_0062d858 = 0;
let DAT_0062d85c = 0;
let DAT_00635a18 = 0;
let DAT_00635a1c = 0;
let DAT_00635a20 = 0;
let DAT_00635a24 = 0;
let DAT_00635a28 = 0;
let DAT_00635a2c = 0;
let DAT_0067a994 = 0;
let DAT_0067a798 = 0;
let DAT_0067a7a0 = 0;
let DAT_0067a7a8 = 0;
let DAT_00679640 = 0;
let DAT_006268f4 = 0;
let DAT_0062cd20 = 0;
let DAT_0062cd24 = 0;
let DAT_00655af0 = 0;
let DAT_0064bb08 = 0;
let DAT_00655020 = 0;
let DAT_006e4ff0 = 0;
let DAT_00626850 = 0;
let DAT_006a85a8 = 0;
let DAT_006a6780 = 0;
let DAT_006a6784 = 0;
let DAT_006a85a0 = 0;
let DAT_006a6668 = 0;
let DAT_006a8c00 = 0;
let DAT_0064b0d0 = 0;
let DAT_0064b0d4 = 0;
let DAT_0064b0d8 = 0;
let DAT_0064b0dc = 0;
let DAT_00626a00 = 0;
let DAT_00626a04 = 0;
let DAT_00626854 = 0;
let DAT_00626960 = 0;
let DAT_0064a730 = new Uint8Array(0x800);
let DAT_0064ba28 = new Int8Array(256);
let DAT_00655be6 = new Int16Array(256);
let DAT_0064f348 = new Int8Array(256 * 0x58);
let DAT_0064f349 = new Int8Array(256 * 0x58);
let DAT_0064f340 = new Int16Array(256 * 0x58);
let DAT_0064f342 = new Int16Array(256 * 0x58);
let DAT_0064f344 = new Uint8Array(256 * 0x58);
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_0064f379 = new Int8Array(256 * 0x58);
let DAT_0064f34a = new Int8Array(256 * 0x58);
let DAT_0064f34c = new Int8Array(256 * 0x58);
let DAT_0064f394 = new Int32Array(256 * 0x58);
let DAT_0064bc60 = 0;
let DAT_00628350 = new Int8Array(16);
let DAT_00628360 = new Int8Array(16);
let DAT_006553d8 = 0;
let DAT_0061cce0 = new Uint8Array(0x200);
let DAT_0061ce58 = new Uint8Array(0x200);
let DAT_0061c740 = new Uint8Array(0x1000);
let DAT_0061c744 = new Uint8Array(0x1000);
let DAT_0061c360 = new Uint8Array(0x1000);
let DAT_0061c364 = new Uint8Array(0x1000);
let DAT_0061c368 = new Uint8Array(0x1000);
let DAT_0061c36c = new Uint8Array(0x1000);
let DAT_0061c580 = new Uint8Array(0x1000);
let DAT_0061c584 = new Uint8Array(0x1000);
let DAT_0061c588 = new Uint8Array(0x1000);
let DAT_0061c58c = new Uint8Array(0x1000);
let DAT_006d1168 = 0;
let DAT_00655afa = 0;
let DAT_00655b02 = 0;
let DAT_0064b110 = 0;
let DAT_0064b114 = 0;
let DAT_0064b120 = 0;
let DAT_0064b130 = 0;
let DAT_0064b12c = 0;
let DAT_0064b128 = 0;
let DAT_0064b108 = 0;
let DAT_0064b0ec = 0;
let DAT_0064b118 = 0;
let DAT_0064b0f8 = 0;
let DAT_0064b148 = 0;
let DAT_0064c708 = new Int16Array(8 * 0x594);
let DAT_0064c932 = new Uint8Array(8 * 0x594);
let DAT_0064c832 = new Uint16Array(8 * 0x594);
let DAT_0064c8b2 = new Uint16Array(8 * 0x594);
let DAT_00655b08 = 0;
let DAT_00655b0b = 0;
let DAT_00655b0a = 0;
let DAT_00655c22 = new Uint8Array(8);
let DAT_0064ca82 = new Int16Array(8 * 0x594);
let DAT_0064c6a2 = new Int32Array(8 * 0x594);
let DAT_0064c6a6 = new Int16Array(8 * 0x594);
let DAT_0064c70e = new Uint16Array(8 * 0x594);
let DAT_0064c6be = new Uint8Array(8 * 0x594);
let DAT_0064c6bf = new Int8Array(8 * 0x594);
let DAT_0064c6e8 = new Int8Array(8 * 0x594);
let DAT_0064c6b0 = new Uint8Array(8 * 0x594);
let DAT_0064c6b3 = new Uint8Array(8 * 0x594);
let DAT_0064c6b5 = new Uint8Array(8 * 0x594);
let DAT_0064c6b7 = new Uint8Array(8 * 0x594);
let DAT_0064c6e0 = new Uint8Array(8 * 0x594);
let DAT_0064c6f0 = new Uint8Array(8 * 0x594);
let DAT_0064c6a0 = new Uint16Array(8 * 0x594);
let DAT_0064c7a5 = new Uint8Array(8 * 0x594);
let DAT_0064c778 = new Int8Array(8 * 0x594);
let DAT_0064c48e = new Int8Array(256 * 8);
let DAT_0064c488 = new Uint8Array(256 * 8);
let DAT_00655af8 = 0;
let DAT_00655ae8 = 0;
let DAT_00655aea = 0;
let DAT_006554fc = new Uint8Array(256 * 0x30);
let DAT_006554f8 = new Int8Array(256 * 0x30);
let DAT_006554fa = new Int8Array(256 * 0x30);
let DAT_0064b134 = 0;
let DAT_006ced50 = 0;
let DAT_00655b18 = 0;
let DAT_00655b16 = 0;
let DAT_0064b9c0 = new Uint32Array(16);
let DAT_00628064 = 0;
let DAT_00626a38 = 0;
let DAT_00628420 = 0;
let DAT_00626a24 = 0;
let DAT_00626a1c = 0;
let DAT_00626a20 = 0;
let DAT_00626a30 = 0;
let DAT_00626a34 = 0;
let DAT_00654fa8 = 0;
let DAT_0064b13c = 0;
let DAT_0064b140 = 0;
let DAT_0064b100 = 0;
let DAT_0064b0fc = 0;
let DAT_0064b104 = 0;
let DAT_0064b11c = 0;
let DAT_0064b0e8 = 0;
let DAT_0064b0f4 = 0;
let DAT_0064b0f0 = 0;
let DAT_0064b144 = 0;
let DAT_0064b10c = 0;
let DAT_0064b124 = 0;
let DAT_0064b138 = 0;
let DAT_0062804c = 0;
let DAT_00655b91 = 0;
let DAT_006d1160 = 0;
let DAT_006d1164 = 0;
let DAT_0063f660 = 0;
let DAT_006558e8 = 0;
let DAT_00655b82 = new Int8Array(256);
let DAT_0064b1c0 = new Int8Array(256 * 0x14);
let DAT_0064b1c8 = new Int8Array(256 * 0x14);
let DAT_0064b1ca = new Int8Array(256 * 0x14);
let DAT_0064b1cb = new Int8Array(256 * 0x14);
let DAT_006560f0 = new Int16Array(256 * 0x20);
let DAT_006560f2 = new Int16Array(256 * 0x20);
let DAT_006560f6 = new Uint8Array(256 * 0x20);
let DAT_006560f7 = new Int8Array(256 * 0x20);
let DAT_006560f9 = new Uint8Array(256 * 0x20);
let DAT_006560ff = new Uint8Array(256 * 0x20);
let DAT_00656100 = new Uint8Array(256 * 0x20);
let DAT_0065610a = new Int32Array(256 * 0x20);
let DAT_006ad30c = new Uint8Array(256 * 0x54);
let DAT_006ad558 = new Int32Array(256);
// bRam0064e854 referenced once
let bRam0064e854 = 0;
// hack addresses referenced via offsets
let DAT_0064b383 = 0;
let DAT_0064b36f = 0;
let DAT_0064b3bf = 0;
let DAT_0064b3d3 = 0;
let DAT_0064b2a7 = 0;
let DAT_0064b257 = 0;

// String constants (stub)
const s_describe__006268fc = 'describe.';
const s_cv_dll_00626a08 = 'cv_dll';
const s_GREETINGS_00626a3c = 'GREETINGS';
const s_NUCLEARWEAPONS_00626a50 = 'NUCLEARWEAPONS';
const s_YOURNUKES_00626a60 = 'YOURNUKES';
const s_EMISSARYFORCE_00626a6c = 'EMISSARYFORCE';
const s_EMISSARY_00626a7c = 'EMISSARY';
const s_SELLTECH_00626a88 = 'SELLTECH';
const s_SELLTECH2_00626a94 = 'SELLTECH2';
const s_NOEXCHANGEMEDIUM_00626ab0 = 'NOEXCHANGEMEDIUM';
const s_NOEXCHANGEMAD_00626aa0 = 'NOEXCHANGEMAD';
const s_NOEXCHANGEMEDIUM_00626ad4 = 'NOEXCHANGEMEDIUM';
const s_NOEXCHANGEMAD_00626ac4 = 'NOEXCHANGEMAD';
const s_NOEXCHANGEWONDER_00626ae8 = 'NOEXCHANGEWONDER';
const s_NOEXCHANGEMEDIUM_00626afc = 'NOEXCHANGEMEDIUM';
const s_NOEXCHANGENOW_00626b10 = 'NOEXCHANGENOW';
const s_EXCHANGEGIFT_00626b20 = 'EXCHANGEGIFT';
const s_EXCHANGEGIFT2_00626b30 = 'EXCHANGEGIFT2';
const s_NOEXCHANGENOW_00626b40 = 'NOEXCHANGENOW';
const s_EXCHANGE_00626b50 = 'EXCHANGE';
const s_EXCHANGEPETTY_00626b64 = 'EXCHANGEPETTY';
const s_ALLIANCE_00626b74 = 'ALLIANCE';
const s_TREATY_00626b80 = 'TREATY';
const s_CEASEFIRE_00626b88 = 'CEASEFIRE';
const s_ACTIVATEALLY_00626b94 = 'ACTIVATEALLY';
const s_ALLYHELPS_00626ba4 = 'ALLYHELPS';
const s_DEMANDHELP_00626bb0 = 'DEMANDHELP';
const s_HELPBONUS_00626bbc = 'HELPBONUS';
const s_DIDNTHELP_00626bc8 = 'DIDNTHELP';
const s_NOBETRAYWEAK_00626bd4 = 'NOBETRAYWEAK';
const s_ALLIANCENOBETRAY_00626be4 = 'ALLIANCENOBETRAY';
const s_ALLIANCENOWINNING_00626bf8 = 'ALLIANCENOWINNING';
const s_ALLIANCENODISLIKE_00626c0c = 'ALLIANCENODISLIKE';
const s_ALLIANCENOSMALL_00626c20 = 'ALLIANCENOSMALL';
const s_ALLIANCENOPATIENCE_00626c30 = 'ALLIANCENOPATIENCE';
const s_ALLIANCENOTHANKS_00626c44 = 'ALLIANCENOTHANKS';
const s_PERHAPSSECRET_00626c58 = 'PERHAPSSECRET';
const s_PERHAPSTHROWIN_00626c68 = 'PERHAPSTHROWIN';
const s_ALLIANCENOPATIENCE_00626c78 = 'ALLIANCENOPATIENCE';
const s_PERHAPSSOLIDARITY_00626c8c = 'PERHAPSSOLIDARITY';
const s_PERHAPSTHANKSANYWAY_00626ca0 = 'PERHAPSTHANKSANYWAY';
const s_PERHAPSBYE_00626cb4 = 'PERHAPSBYE';
const s_NOBETRAYWEAK_00626cc0 = 'NOBETRAYWEAK';
const s_PEACENOBETRAY_00626cd0 = 'PEACENOBETRAY';
const s_PEACENOWINNING_00626ce0 = 'PEACENOWINNING';
const s_PEACENODISLIKE_00626cf0 = 'PEACENODISLIKE';
const s_PEACENOPATIENCE_00626d00 = 'PEACENOPATIENCE';
const s_PERHAPSSECRET_00626d10 = 'PERHAPSSECRET';
const s_PERHAPSTHROWIN_00626d20 = 'PERHAPSTHROWIN';
const s_PEACENOPATIENCE_00626d30 = 'PEACENOPATIENCE';
const s_PERHAPSSOLIDARITY_00626d40 = 'PERHAPSSOLIDARITY';
const s_PERHAPSTHANKSANYWAY_00626d54 = 'PERHAPSTHANKSANYWAY';
const s_PERHAPSBYE_00626d68 = 'PERHAPSBYE';
const s_PROVOKE_00626d74 = 'PROVOKE';
const s_APOLOGIZE_00626d7c = 'APOLOGIZE';
const s_GIVEMORECIV_00626d88 = 'GIVEMORECIV';
const s_GIVEMOREALLY_00626d94 = 'GIVEMOREALLY';
const s_GIVEMORE_00626da4 = 'GIVEMORE';
const s_SYMPATHY_00626db0 = 'SYMPATHY';
const s_FEEBLEALLY_00626dc8 = 'FEEBLEALLY';
const s_TAUNTALLY_00626dbc = 'TAUNTALLY';
const s_PROVOKE_00626dd4 = 'PROVOKE';
const s_NOVIOLATORS_00626ddc = 'NOVIOLATORS';
const s_FEEBLE_00626de8 = 'FEEBLE';
const s_CANCELALLY_00626df0 = 'CANCELALLY';
const s_FAVORMENU_00626dfc = 'FAVORMENU';
const s_MUSTATTACK_00626e08 = 'MUSTATTACK';
const s_NOCONTACT_00626e14 = 'NOCONTACT';
const s_ATWAR_00626e20 = 'ATWAR';
const s_HELLNOWEWONTGO_00626e28 = 'HELLNOWEWONTGO';
const s_ETERNALALLIES_00626e38 = 'ETERNALALLIES';
const s_CYBERCOP_00626e48 = 'CYBERCOP';
const s_MERCENARY_00626e54 = 'MERCENARY';
const s_UNFORTUNATE_00626e60 = 'UNFORTUNATE';
const s_MERCDECLARE_00626e6c = 'MERCDECLARE';
const s_MERCBETRAYALLY_00626e78 = 'MERCBETRAYALLY';
const s_MERCBETRAY_00626e88 = 'MERCBETRAY';
const s_MAPNO_00626e94 = 'MAPNO';
const s_MAPYES_00626e9c = 'MAPYES';
const s_GIFTMENU_00626ea4 = 'GIFTMENU';
const s_KNOWNO_00626eb0 = 'KNOWNO';
const s_TECHGIFT_00626eb8 = 'TECHGIFT';
const s_TECHGIFT2_00626ec4 = 'TECHGIFT2';
const s_WASTING_00626ed0 = 'WASTING';
const s_ACCEPT_00626ed8 = 'ACCEPT';
const s_MONEYGIFT_00626ee0 = 'MONEYGIFT';
const s_ACCEPT_00626ef4 = 'ACCEPT';
const s_WASTING_00626eec = 'WASTING';
const s_MILITARYSOURCE_00626efc = 'MILITARYSOURCE';
const s_MILITARYNONE_00626f0c = 'MILITARYNONE';
const s_MILITARYNONE_00626f1c = 'MILITARYNONE';
const s_MILITARYNO_00626f2c = 'MILITARYNO';
const s_MILITARYNO_00626f38 = 'MILITARYNO';
const s_ACCEPT_00626f44 = 'ACCEPT';
const s_BREAKTHROUGH_00626f4c = 'BREAKTHROUGH';
const s_CONTINUEHAWKS_00626f68 = 'CONTINUEHAWKS';
const s_CONTINUEUN_00626f5c = 'CONTINUEUN';
const s_DIPLOMACY_00626f78 = 'DIPLOMACY';
const s_DIPLOMACYMENU_00626f84 = 'DIPLOMACYMENU';
const s_Software__s__s_006269a4 = 'Software\\%s\\%s';
const s_MicroProse_Software_00626964 = 'MicroProse Software';
const s_Civilization_II_Multiplayer_Gold_00626978 = 'Civilization II Multiplayer Gold';
const s_DefaultLanguage_006269b4 = 'DefaultLanguage';
const s_Software__s__s_006269c4 = 'Software\\%s\\%s';
const s_DefaultLanguage_006269d4 = 'DefaultLanguage';
const s_MSHyperTextClass_00626908 = 'MSHyperTextClass';
const s_MSHyperTextClass_00626920 = 'MSHyperTextClass';


// ═══════════════════════════════════════════════════════════════════
// FUN_004502b0 — init_ecx_zero
// Source: block_00450000.c @ 0x004502B0, 34 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004502b0() {
  // in_ECX class init — no-op in JS
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004502e0 — load_resource_string
// Source: block_00450000.c @ 0x004502E0, 67 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004502e0(param_1) {
  // MFC resource string loading — stubbed for JS
  FUN_005db140(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450340 — free_resource_string
// Source: block_00450000.c @ 0x00450340, 57 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450340() {
  // MFC resource string free — stubbed for JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450390 — set_dialog_data
// Source: block_00450000.c @ 0x00450390, 45 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450390(param_1) {
  FUN_00450440(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004503d0 — manage_window_wrapper
// Source: block_00450000.c @ 0x004503D0, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004503d0() {
  // Win32 window management — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450400 — gdi_clear_wrapper
// Source: block_00450000.c @ 0x00450400, 41 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450400() {
  // GDI clear — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450440 — set_bitmap_from_dialog
// Source: block_00450000.c @ 0x00450440, 49 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450440(param_1) {
  // Win32 bitmap set — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450480 — populate_listbox_items
// Source: block_00450000.c @ 0x00450480, 1602 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450480(param_1, param_2, param_3) {
  // UI: populate Civilopedia listbox items
  // Heavy MFC/Win32 UI code — stubbed for JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450ae6 — scroll_listbox_left
// Source: block_00450000.c @ 0x00450AE6, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450ae6(param_1) {
  FUN_00450b22(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450b04 — scroll_listbox_right
// Source: block_00450000.c @ 0x00450B04, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450b04(param_1) {
  FUN_00450b22(1, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450b22 — set_listbox_scroll_pos
// Source: block_00450000.c @ 0x00450B22, 97 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450b22(param_1, param_2) {
  // MFC listbox scroll — stubbed for JS
  FUN_00450f0b(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450b83 — handle_listbox_click
// Source: block_00450000.c @ 0x00450B83, 627 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450b83(param_1) {
  // MFC listbox click handler with shift/ctrl selection — stubbed for JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450df6 — hit_test_listbox_item
// Source: block_00450000.c @ 0x00450DF6, 277 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450df6(param_1, param_2, param_3) {
  // Hit test for listbox item coordinates — stubbed for JS
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00450f0b — paint_listbox
// Source: block_00450000.c @ 0x00450F0B, 1333 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00450f0b(param_1) {
  // UI: paint Civilopedia listbox — heavy GDI rendering code, stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451830 — get_listbox_width
// Source: block_00450000.c @ 0x00451830, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451830() {
  return FUN_00407f90(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451860 — get_listbox_height
// Source: block_00450000.c @ 0x00451860, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451860() {
  return FUN_00407fc0(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451890 — get_mouse_pos
// Source: block_00450000.c @ 0x00451890, 49 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451890(param_1, param_2) {
  // Win32 mouse pos query — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004518d0 — begin_paint_listbox
// Source: block_00450000.c @ 0x004518D0, 38 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004518d0() {
  FUN_00451900();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451900 — get_window_dc
// Source: block_00450000.c @ 0x00451900, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451900() {
  // Win32 GetDC wrapper — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451930 — create_listbox_scrollbar
// Source: block_00450000.c @ 0x00451930, 83 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451930() {
  // MFC scrollbar creation — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004519b0 — create_child_control
// Source: block_00450000.c @ 0x004519B0, 139 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004519b0(param_1, param_2, param_3) {
  // MFC child window creation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451a60 — set_help_callback
// Source: block_00450000.c @ 0x00451A60, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451a60(param_1) {
  // sets a callback pointer — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// CDialog_SetHelpID_451a90 — CDialog::SetHelpID
// Source: block_00450000.c @ 0x00451A90, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function CDialog_SetHelpID_451a90(this_ptr, param_1) {
  // MFC CDialog::SetHelpID — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451ac0 — set_scroll_callback
// Source: block_00450000.c @ 0x00451AC0, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451ac0(param_1) {
  // sets a callback pointer — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451af0 — paint_civpedia_header
// Source: block_00450000.c @ 0x00451AF0, 256 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451af0(param_1) {
  // UI: paint Civilopedia header area — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00451bf0 — setup_civpedia_layout
// Source: block_00450000.c @ 0x00451BF0, 1391 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00451bf0() {
  // UI: setup Civilopedia dialog layout — heavy MFC code, stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452188 — dispatch_civpedia_page
// Source: block_00450000.c @ 0x00452188, 356 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452188() {
  // UI: switch Civilopedia page type — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452315 — load_civpedia_text
// Source: block_00450000.c @ 0x00452315, 1059 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452315(param_1) {
  // UI: load Civilopedia text from help files — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452768 — navigate_civpedia_link
// Source: block_00450000.c @ 0x00452768, 593 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452768(param_1) {
  // UI: navigate Civilopedia hyperlink — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// register_wndclass_29DF — register HyperText window class
// Source: block_00450000.c @ 0x004529DF, 136 bytes
// ═══════════════════════════════════════════════════════════════════

export function register_wndclass_29DF() {
  // Win32 RegisterClassA for MSHyperTextClass — stubbed
  if (DAT_00626850 === 0) {
    DAT_00626850 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452a67 — destroy_hypertext_window
// Source: block_00450000.c @ 0x00452A67, 90 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452a67() {
  // MFC window destruction — stubbed
  FUN_00452ac1();
  FUN_00452ad4();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452ac1 — base_class_destructor
// Source: block_00450000.c @ 0x00452AC1, 9 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452ac1() {
  FUN_0040f510();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452ad4 — seh_unwind
// Source: block_00450000.c @ 0x00452AD4, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452ad4() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452ae2 — create_hypertext_window
// Source: block_00450000.c @ 0x00452AE2, 167 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452ae2(param_1, param_2) {
  // Win32 CreateWindowExA for MSHyperTextClass — stubbed
  register_wndclass_29DF();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452b89 — create_hypertext_child
// Source: block_00450000.c @ 0x00452B89, 139 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452b89(param_1, param_2, param_3) {
  // MFC child hypertext window creation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00452c14 — add_civpedia_hyperlink
// Source: block_00450000.c @ 0x00452C14, 1361 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00452c14(param_1, param_2, param_3, param_4) {
  // UI: add clickable hyperlink to Civilopedia text — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004531b8 — civpedia_link_click_type1
// Source: block_00450000.c @ 0x004531B8, 130 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004531b8(param_1) {
  let local_c;
  let local_8;

  local_8 = param_1 + -0xfb4;
  local_c = DAT_006a85a8;
  while (local_8 !== 0 && local_c !== 0) {
    local_c = local_c[0x11];
    local_8 = local_8 + -1;
  }
  if (local_c !== 0) {
    DAT_006a6780 = 1;
    DAT_006a6784 = 0;
    DAT_006a85a0 = local_c[0];
    FUN_004f5f23(1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045323a — civpedia_link_click_type2
// Source: block_00450000.c @ 0x0045323A, 130 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045323a(param_1) {
  let local_c;
  let local_8;

  local_8 = param_1 + -0xfb4;
  local_c = DAT_006a85a8;
  while (local_8 !== 0 && local_c !== 0) {
    local_c = local_c[0x11];
    local_8 = local_8 + -1;
  }
  if (local_c !== 0) {
    DAT_006a6780 = 2;
    DAT_006a6784 = 0;
    DAT_006a85a0 = local_c[0];
    FUN_004f5f23(1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004532bc — civpedia_link_click_type3
// Source: block_00450000.c @ 0x004532BC, 130 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004532bc(param_1) {
  let local_c;
  let local_8;

  local_8 = param_1 + -0xfb4;
  local_c = DAT_006a85a8;
  while (local_8 !== 0 && local_c !== 0) {
    local_c = local_c[0x11];
    local_8 = local_8 + -1;
  }
  if (local_c !== 0) {
    DAT_006a6780 = 3;
    DAT_006a6784 = 0;
    DAT_006a85a0 = local_c[0];
    FUN_004f5f23(1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045333e — civpedia_link_click_type4
// Source: block_00450000.c @ 0x0045333E, 130 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045333e(param_1) {
  let local_c;
  let local_8;

  local_8 = param_1 + -0xfb4;
  local_c = DAT_006a85a8;
  while (local_8 !== 0 && local_c !== 0) {
    local_c = local_c[0x11];
    local_8 = local_8 + -1;
  }
  if (local_c !== 0) {
    DAT_006a6780 = 4;
    DAT_006a6784 = 0;
    DAT_006a85a0 = local_c[0];
    FUN_004f5f23(1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004533c0 — civpedia_link_click_type5
// Source: block_00450000.c @ 0x004533C0, 130 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004533c0(param_1) {
  let local_c;
  let local_8;

  local_8 = param_1 + -0xfb4;
  local_c = DAT_006a85a8;
  while (local_8 !== 0 && local_c !== 0) {
    local_c = local_c[0x11];
    local_8 = local_8 + -1;
  }
  if (local_c !== 0) {
    DAT_006a6780 = 5;
    DAT_006a6784 = 0;
    DAT_006a85a0 = local_c[0];
    FUN_004f5f23(1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453aa0 — civpedia_destructor_with_delete
// Source: block_00450000.c @ 0x00453AA0, 57 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453aa0(param_1) {
  FUN_00453ba0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453af0 — civpedia_cleanup
// Source: block_00450000.c @ 0x00453AF0, 21 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453af0() {
  FUN_005bbb0a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453b10 — create_hypertext_obj
// Source: block_00450000.c @ 0x00453B10, 86 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453b10() {
  FUN_00453cc0();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453ba0 — destroy_hypertext_wrapper
// Source: block_00450000.c @ 0x00453BA0, 90 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453ba0() {
  FUN_00453bfa();
  FUN_00453c0d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453bfa — base_destructor_2
// Source: block_00450000.c @ 0x00453BFA, 9 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453bfa() {
  FUN_0040f510();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453c0d — seh_unwind_2
// Source: block_00450000.c @ 0x00453C0D, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453c0d() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453c40 — set_unselected_and_invalidate
// Source: block_00450000.c @ 0x00453C40, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453c40() {
  // Win32 invalidate window — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453c80 — set_selected_and_invalidate
// Source: block_00450000.c @ 0x00453C80, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453c80() {
  // Win32 invalidate window — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453cc0 — create_hypertext_obj_inner
// Source: block_00450000.c @ 0x00453CC0, 83 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453cc0() {
  FUN_0040f480();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453d40 — set_help_callback_2
// Source: block_00450000.c @ 0x00453D40, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453d40(param_1) {
  // sets a callback pointer — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// CDialog_SetHelpID_453d70 — CDialog::SetHelpID (duplicate)
// Source: block_00450000.c @ 0x00453D70, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function CDialog_SetHelpID_453d70(this_ptr, param_1) {
  // MFC CDialog::SetHelpID — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453da0 — is_tech_known_by_any_civ
// Source: block_00450000.c @ 0x00453DA0, 120 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453da0(param_1) {
  let cVar1;
  let iVar2;
  let local_10;
  let local_8;

  local_8 = 0;
  cVar1 = s8(DAT_0064ba28[param_1]);
  if (cVar1 < 0) {
    local_8 = 0;
  }
  else {
    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      iVar2 = FUN_004bd9f0(local_10, cVar1);
      if (iVar2 !== 0) {
        local_8 = 1;
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453e18 — get_tech_prereq_index
// Source: block_00450000.c @ 0x00453E18, 57 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453e18(param_1) {
  let iVar1;

  iVar1 = FUN_00453da0(param_1);
  if (iVar1 === 0) {
    iVar1 = DAT_00655be6[param_1];
  }
  else {
    iVar1 = -1;
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453e51 — check_civ_has_wonder_effect
// Source: block_00450000.c @ 0x00453E51, 142 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453e51(param_1, param_2) {
  let uVar1;
  let iVar2;

  if ((param_2 === 0x14) && ((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 1) !== 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = FUN_00453e18(param_2);
    if (iVar2 < 0) {
      uVar1 = 0;
    }
    else if (s8(DAT_0064f348[iVar2 * 0x58]) === param_1) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453edf — get_wonder_owner
// Source: block_00450000.c @ 0x00453EDF, 73 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453edf(param_1) {
  let iVar1;

  iVar1 = FUN_00453e18(param_1);
  if (iVar1 < 0) {
    iVar1 = -1;
  }
  else {
    iVar1 = s8(DAT_0064f348[iVar1 * 0x58]);
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00453f90 — read_default_language_from_registry
// Source: block_00450000.c @ 0x00453F90, 220 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00453f90() {
  // Win32 registry read/write for DefaultLanguage — stubbed
  DAT_00626960 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045406c — reg_set_value
// Source: block_00450000.c @ 0x0045406C, 146 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045406c(param_1, param_2, param_3, param_4, param_5) {
  // Win32 RegCreateKeyExA / RegSetValueExA — stubbed
  return false;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454103 — reg_query_value
// Source: block_00450000.c @ 0x00454103, 199 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454103(param_1, param_2, param_3, param_4) {
  // Win32 RegOpenKeyExA / RegQueryValueExA — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454260 — open_civpedia_dialog
// Source: block_00450000.c @ 0x00454260, 205 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454260(param_1) {
  // UI: create and show Civilopedia dialog — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454344 — civpedia_noop
// Source: block_00450000.c @ 0x00454344, 16 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454344() {
  // empty function
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454354 — civpedia_init_constructor
// Source: block_00450000.c @ 0x00454354, 578 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454354() {
  // MFC: Civilopedia dialog constructor — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454699 — civpedia_destructor_chain
// Source: block_00450000.c @ 0x00454699, 255 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454699() {
  DAT_00626a04 = 0;
  FUN_00450340();
  FUN_00454798();
  FUN_004547a7();
  FUN_004547b6();
  FUN_004547ce();
  FUN_004547e6();
  FUN_004547fe();
  FUN_00454816();
  FUN_0045482e();
  FUN_0045483d();
  FUN_0045484c();
  FUN_0045485b();
  FUN_0045486a();
  FUN_00454879();
  FUN_00454888();
  FUN_0045489b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454798 — eh_destructor_1
// Source: block_00450000.c @ 0x00454798, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454798() {
  FUN_0043c520();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004547a7 — eh_destructor_2
// Source: block_00450000.c @ 0x004547A7, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004547a7() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004547b6 — eh_vector_destructor_1
// Source: block_00450000.c @ 0x004547B6, 24 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004547b6() {
  // MFC vector destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004547ce — eh_vector_destructor_2
// Source: block_00450000.c @ 0x004547CE, 24 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004547ce() {
  // MFC vector destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004547e6 — eh_vector_destructor_3
// Source: block_00450000.c @ 0x004547E6, 24 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004547e6() {
  // MFC vector destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004547fe — eh_vector_destructor_4
// Source: block_00450000.c @ 0x004547FE, 24 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004547fe() {
  // MFC vector destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454816 — eh_vector_destructor_5
// Source: block_00450000.c @ 0x00454816, 24 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454816() {
  // MFC vector destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045482e — timevec_destructor
// Source: block_00450000.c @ 0x0045482E, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045482e() {
  // _Timevec::~_Timevec — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045483d — eh_destructor_3
// Source: block_00450000.c @ 0x0045483D, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045483d() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045484c — eh_destructor_4
// Source: block_00450000.c @ 0x0045484C, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045484c() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045485b — eh_destructor_5
// Source: block_00450000.c @ 0x0045485B, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045485b() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045486a — eh_destructor_6
// Source: block_00450000.c @ 0x0045486A, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045486a() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454879 — eh_destructor_7
// Source: block_00450000.c @ 0x00454879, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454879() {
  FUN_0044cba0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454888 — eh_destructor_8
// Source: block_00450000.c @ 0x00454888, 9 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454888() {
  FUN_0044ca60();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045489b — seh_unwind_3
// Source: block_00450000.c @ 0x0045489B, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045489b() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004548a9 — civpedia_build_pages
// Source: block_00450000.c @ 0x004548A9, 1506 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004548a9(param_1) {
  // UI: Civilopedia page building with layout — mostly UI, stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454e8b — civpedia_cleanup_2
// Source: block_00450000.c @ 0x00454E8B, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454e8b() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454ea1 — seh_unwind_4
// Source: block_00450000.c @ 0x00454EA1, 17 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454ea1() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454eb2 — civpedia_show_property_sheet
// Source: block_00450000.c @ 0x00454EB2, 209 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454eb2() {
  // MFC: show Civilopedia property sheet — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00454f83 — civpedia_set_layout_params
// Source: block_00450000.c @ 0x00454F83, 414 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00454f83() {
  // UI: set Civilopedia layout parameters based on map terrain — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045512b — civpedia_load_icon
// Source: block_00450000.c @ 0x0045512B, 88 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045512b() {
  // UI: load 32x32 icon — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455183 — civpedia_build_main_panel
// Source: block_00450000.c @ 0x00455183, 401 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455183() {
  // UI: build main Civilopedia panel — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455314 — civpedia_populate_slots
// Source: block_00450000.c @ 0x00455314, 1694 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455314() {
  // UI: populate Civilopedia card slots — stubbed
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455add — civpedia_draw_card_sprites
// Source: block_00450000.c @ 0x00455ADD, 177 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455add() {
  // UI: draw card sprites on Civilopedia — stubbed
  FUN_0045606c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455b8e — civpedia_pick_random_bottom_slot
// Source: block_00450000.c @ 0x00455B8E, 207 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455b8e() {
  // picks random slot from bottom card pool — stubbed
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455c5d — civpedia_pick_random_top_slot
// Source: block_00450000.c @ 0x00455C5D, 219 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455c5d() {
  // picks random slot from top card pool — stubbed
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455d38 — civpedia_draw_top_card
// Source: block_00450000.c @ 0x00455D38, 197 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455d38(param_1, param_2) {
  // UI: draw top card sprite — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455dfd — civpedia_draw_bottom_card
// Source: block_00450000.c @ 0x00455DFD, 193 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455dfd(param_1, param_2) {
  // UI: draw bottom card sprite — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455ebe — civpedia_assign_small_card
// Source: block_00450000.c @ 0x00455EBE, 112 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455ebe(param_1) {
  // UI: assign small card to slot — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455f2e — civpedia_assign_medium_card
// Source: block_00450000.c @ 0x00455F2E, 112 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455f2e(param_1) {
  // UI: assign medium card to slot — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00455f9e — civpedia_assign_large_card_A
// Source: block_00450000.c @ 0x00455F9E, 103 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00455f9e(param_1) {
  // UI: assign large card variant A — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00456005 — civpedia_assign_large_card_B
// Source: block_00450000.c @ 0x00456005, 103 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00456005(param_1) {
  // UI: assign large card variant B — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045606c — civpedia_blit_and_refresh
// Source: block_00450000.c @ 0x0045606C, 140 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045606c() {
  // UI: blit Civilopedia and refresh — stubbed
  FUN_004560f8();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004560f8 — civpedia_draw_title
// Source: block_00450000.c @ 0x004560F8, 225 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004560f8() {
  // UI: draw Civilopedia title text — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004561d9 — civpedia_auto_scroll
// Source: block_00450000.c @ 0x004561D9, 79 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004561d9(param_1) {
  if (DAT_0064b0d8 * 7 >> 3 < param_1) {
    FUN_0045638b();
  }
  if (param_1 < DAT_0064b0d8 >> 3) {
    FUN_004564a8();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00456228 — civpedia_key_handler
// Source: block_00450000.c @ 0x00456228, 64 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00456228(param_1) {
  if (param_1 === 0xd2) {
    if (DAT_00626a04 !== 0) {
      // CRichEditDoc::InvalidateObjectCache — stubbed
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045626d — civpedia_invalidate_cache
// Source: block_00450000.c @ 0x0045626D, 46 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045626d() {
  // CRichEditDoc::InvalidateObjectCache — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045629b — civpedia_menu_handler
// Source: block_00450000.c @ 0x0045629B, 164 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045629b(param_1) {
  switch (param_1) {
    case 0xa4:
    case 0xc2:
      if (DAT_0064b0d8 < 0x500) {
        FUN_004564a8();
      }
      break;
    case 0xa6:
    case 0xc3:
      if (DAT_0064b0d8 < 0x500) {
        FUN_0045638b();
      }
      break;
    case 0xd0:
    case 0xd1:
    case 0xd2:
      if (DAT_00626a04 !== 0) {
        // CRichEditDoc::InvalidateObjectCache — stubbed
      }
      break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045638b — civpedia_scroll_right
// Source: block_00450000.c @ 0x0045638B, 285 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045638b() {
  // UI: scroll Civilopedia viewport right with key polling — stubbed
  let local_8 = 4;
  if (0x500 - DAT_0064b0d8 < DAT_00626a00) {
    return;
  }
  DAT_00626a00 = DAT_00626a00 + local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004564a8 — civpedia_scroll_left
// Source: block_00450000.c @ 0x004564A8, 274 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004564a8() {
  // UI: scroll Civilopedia viewport left with key polling — stubbed
  let local_8 = 4;
  if (DAT_00626a00 < 0) {
    return;
  }
  DAT_00626a00 = DAT_00626a00 - local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00456e90 — civpedia_delete_destructor
// Source: block_00450000.c @ 0x00456E90, 57 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00456e90(param_1) {
  FUN_00454699();
}


// ═══════════════════════════════════════════════════════════════════
// ios_tie — ios::tie (MFC library)
// Source: block_00450000.c @ 0x00456EE0, 45 bytes
// ═══════════════════════════════════════════════════════════════════

export function ios_tie(this_ptr, param_1) {
  // MFC ios::tie — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00456f20 — adjust_diplomatic_attitude
// Source: block_00450000.c @ 0x00456F20, 107 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00456f20(param_1, param_2, param_3) {
  let iVar1;

  iVar1 = FUN_00467904(param_1, param_2);
  FUN_00467933(param_1, param_2, param_3 + iVar1);
  if ((param_1 === DAT_0064b110) && (param_2 === DAT_0064b120)) {
    DAT_0064b114 = DAT_0064b114 + param_3;
  }
  FUN_00467904(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00456f8b — calc_diplomatic_patience
// Source: block_00450000.c @ 0x00456F8B, 211 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00456f8b(param_1, param_2) {
  let iVar1;
  let local_8;

  local_8 = 2;
  if (DAT_0064b114 < 0x19) {
    local_8 = 3;
  }
  if (0x3c < DAT_0064b114) {
    local_8 = local_8 + -1;
  }
  iVar1 = FUN_00453e51(param_1, 0x14);
  if (iVar1 !== 0) {
    local_8 = local_8 + 1;
  }
  if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) !== 0) {
    local_8 = local_8 + 1;
  }
  if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
    local_8 = local_8 + 2;
  }
  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) {
    local_8 = 2;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045705e — compute_ai_diplomatic_stance
// Source: block_00450000.c @ 0x0045705E, 6616 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045705e(param_1, param_2) {
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

  DAT_0064b130 = FUN_00598d45(param_2);
  local_c = 0;
  for (local_1c = 1; local_1c < 8; local_1c = local_1c + 1) {
    if ((DAT_0064c6c1[param_1 * 0x594 + local_1c * 4] & 0x20) !== 0) {
      local_c = local_c + 1;
    }
    if ((((1 << (local_1c & 0x1f)) & DAT_00655b0b) !== 0) &&
       (iVar4 = FUN_004a7577(local_1c), iVar4 !== 0) && (3 < DAT_00655b08)) {
      DAT_0064b130 = 1;
    }
  }
  DAT_0064b12c = (u8(DAT_00655c22[param_1]) < u8(DAT_00655c22[param_2])) ? 1 : 0;
  DAT_0064b128 = 0;
  if ((DAT_00626a20 !== 0) && (DAT_00626a1c === 0)) {
    DAT_0064b108 = DAT_0064ca82[param_2 * 2 + param_1 * 0x594];
  }
  DAT_0064b0ec = 0;
  DAT_0064b118 = 0;
  DAT_0064b0f8 = 0;
  DAT_0064b148 = 1;
  for (local_14 = 1; local_14 < 0x40; local_14 = local_14 + 1) {
    if (((1 < DAT_0064c708[param_2 * 0x594]) <
         u8(DAT_0064c932[param_2 * 0x594 + local_14])) &&
       (DAT_0064c832[local_14 * 2 + param_2 * 0x594] <
        DAT_0064c8b2[local_14 * 2 + param_1 * 0x594])) {
      DAT_0064b0ec = DAT_0064b0ec +
                     ((DAT_0064c8b2[param_1 * 0x594 + local_14 * 2] *
                     ((DAT_00655b08 === 0 ? 2 : 0) + 2)) |0) /
                     (DAT_0064c832[param_2 * 0x594 + local_14 * 2] + 1);
    }
    else {
      if ((DAT_0064c832[local_14 * 2 + param_2 * 0x594] !== 0) &&
         (DAT_0064c832[local_14 * 2 + param_1 * 0x594] !== 0)) {
        DAT_0064b0f8 = 1;
      }
      if (DAT_0064c932[param_1 * 0x594 + local_14] === 0) {
        if (DAT_0064c932[param_2 * 0x594 + local_14] === 0) {
          let diff = DAT_0064c8b2[param_2 * 0x594 + local_14 * 2] -
                     DAT_0064c8b2[param_1 * 0x594 + local_14 * 2];
          DAT_0064b118 = DAT_0064b118 + ((diff + (diff >> 31 & 3)) >> 2);
        }
        else {
          DAT_0064b118 = DAT_0064b118 +
                         (((DAT_0064c832[param_2 * 0x594 + local_14 * 2] -
                           DAT_0064c8b2[param_1 * 0x594 + local_14 * 2]) / 2) | 0);
        }
      }
      else {
        if ((u8(DAT_0064c932[param_2 * 0x594 + local_14]) < 2) &&
           (((DAT_00655af8 <= local_c * -0x32 + 200) || (6 < u8(DAT_00655c22[param_1]))) ||
            (6 < u8(DAT_00655c22[param_2])))) {
          uVar5 = DAT_0064c8b2[param_2 * 0x594 + local_14 * 2];
        }
        else {
          uVar5 = DAT_0064c8b2[param_2 * 0x594 + local_14 * 2] -
                  DAT_0064c8b2[param_1 * 0x594 + local_14 * 2];
        }
        DAT_0064b118 = DAT_0064b118 + uVar5;
      }
    }
  }
  iVar4 = FUN_00453e51(param_2, 9);
  if (iVar4 !== 0) {
    DAT_0064b118 = DAT_0064b118 + ((DAT_0064b118 + (DAT_0064b118 >> 31 & 3)) >> 2);
  }
  DAT_0064b11c = 0;
  if ((((DAT_00655c22[param_1] === 7) && (4 < DAT_0064c708[param_1 * 0x594])) &&
      ((1 < DAT_0064c708[param_2 * 0x594]) &&
       ((DAT_0064c7a5[param_1 * 0x594] === 0) && (DAT_00655b08 !== 0)))) &&
     (200 < DAT_00655af8)) {
    DAT_0064b11c = 1;
  }
  DAT_0064b114 = u8(DAT_0064c6e0[param_2 * 0x594 + param_1]);
  if (((DAT_0064b11c !== 0) ||
      (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0 &&
       (DAT_0064c70e[param_1 * 0x594] <
        DAT_0064c70e[param_2 * 0x594] * 3)))) &&
     (DAT_0064c7a5[param_1 * 0x594] === 0)) {
    DAT_0064b118 = FUN_005adfa0(DAT_0064b118, u8(DAT_00655c22[param_2]) * 2, 9999);
    if (DAT_0064b0f8 === 0) {
      DAT_0064b118 = FUN_005adfa0(DAT_0064b118, 0,
                                  ((DAT_0064c6a2[param_1 * 0x594] / 0x32) |0) /
                                  ((8 - u8(DAT_00655c22[param_2])) | 0));
    }
    DAT_0064b0f8 = 1;
    DAT_0064b0ec = 0;
    if (DAT_0064b114 < 0x4c) {
      DAT_0064b114 = 0x4b;
    }
  }
  if ((DAT_0064b130 !== 0) && (DAT_0064b12c !== 0)) {
    DAT_0064b0f8 = 1;
  }
  if ((DAT_0064c7a5[param_2 * 0x594] !== 0) &&
     (DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] =
           DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] | 0x100,
     DAT_0064c7a5[param_1 * 0x594] === 0)) {
    DAT_0064b0f8 = 1;
    DAT_0064b118 = FUN_005adfa0(DAT_0064b118, 100, 9999);
  }
  if ((DAT_0064c7a5[param_1 * 0x594] !== 0) &&
     ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0)) {
    if (DAT_0064c7a5[param_2 * 0x594] === 0) {
      DAT_0064b0ec = (u8(DAT_0064c6be[param_1 * 0x594]) >> 1) + 1;
      if (DAT_0064b0ec < 5) {
        DAT_0064b0ec = 4;
      }
    }
    else {
      DAT_0064b118 = ((u8(DAT_0064c7a5[param_2 * 0x594]) * ((DAT_0064b118 / 2) | 0)) /
                     u8(DAT_0064c7a5[param_1 * 0x594])) | 0;
    }
  }
  DAT_0064b0ec = (DAT_0064b0ec / (((u8(DAT_0064c6be[param_1 * 0x594]) - 1) / 2 + 1) | 0)) | 0;
  if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
    DAT_0064b114 = DAT_0064b114 - 0x19;
  }
  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) {
    DAT_0064b114 = DAT_0064b114 + 0x19;
  }
  if (DAT_0064c6be[param_1 * 0x594] !== 0) {
    DAT_0064b114 = DAT_0064b114 +
                   ((u8(DAT_0064c6be[param_1 * 0x594]) - 1) -
                   s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) * 5;
  }
  if (DAT_0064b114 < 0x1a) {
    DAT_0064b118 = (DAT_0064b118 / 2) | 0;
    DAT_0064b0f8 = 0;
  }
  else {
    iVar4 = FUN_004679ab(DAT_0064b114);
    if (iVar4 < 4) {
      DAT_0064b118 = ((DAT_0064b118 * 2) / 3) | 0;
    }
    else if (0x4a < DAT_0064b114) {
      DAT_0064b118 = ((DAT_0064b118 * 3) / 2) | 0;
      DAT_0064b0f8 = 1;
    }
  }
  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
    DAT_0064b0f8 = 1;
  }
  if (((DAT_00655ae8 & 0x80) !== 0) && (DAT_0064c6b3[param_2 * 0x594] === 0)) {
    DAT_0064b0f8 = 1;
  }
  if (DAT_0064b0ec !== 0) {
    DAT_0064b0f8 = 0;
    DAT_0064b148 = 0;
  }
  iVar4 = FUN_00453e51(param_1, 6);
  if ((iVar4 !== 0) || (iVar4 = FUN_00453e51(param_1, 0x18), iVar4 !== 0)) {
    DAT_0064b11c = 0;
    DAT_0064b128 = DAT_0064b0f8;
    DAT_0064b0f8 = 0;
    DAT_0064b114 = DAT_0064b114 - 10;
    FUN_00467750(param_2, param_1, 0x10000);
  }
  if (DAT_0064c6be[param_1 * 0x594] !== 0) {
    DAT_0064b118 = DAT_0064b118 +
                   ((u8(DAT_0064c6be[param_1 * 0x594]) * DAT_0064b118) / 2) | 0;
  }
  if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) === 0) {
    if ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 1) !== 0) {
      DAT_0064b118 = (DAT_0064b118 + (DAT_0064b118 >> 31 & 3)) >> 2;
    }
  }
  else {
    DAT_0064b118 = DAT_0064b118 << 1;
  }
  DAT_0064b134 = 0;
  local_18 = 0;

  // Main loop with goto converted to labeled block
  let done_main_loop = false;
  while (!done_main_loop) {
    if (DAT_00655b18 <= local_18) {
      done_main_loop = true;
      break;
    }
    if ((((DAT_0064f394[local_18 * 0x58] !== 0) &&
         (s8(DAT_0064f348[local_18 * 0x58]) === param_1)) &&
        (iVar4 = FUN_005b8d62(DAT_0064f340[local_18 * 0x58],
                               DAT_0064f342[local_18 * 0x58]), iVar4 < 0))
       && ((iVar4 = FUN_005b67af(DAT_0064f340[local_18 * 0x58],
                                  DAT_0064f342[local_18 * 0x58], param_2,
                                  0xffffffff), -1 < iVar4 && (DAT_006ced50 < 3)))) {
      DAT_0064b118 = DAT_0064b118 << 1;
      DAT_0064b134 = DAT_0064b134 + 1;
      done_main_loop = true;
      break;
    }
    local_18 = local_18 + 1;
  }

  // LAB_00457d0d equivalent
  iVar4 = (DAT_00655b08 + 1) * DAT_0064b118;
  iVar4 = FUN_005adfa0((iVar4 + (iVar4 >> 31 & 0x1f)) >> 5, 0, 0x14);
  DAT_0064b118 = iVar4 * 0x32;
  if (((DAT_0064c6a2[param_1 * 0x594] < DAT_0064b118) &&
      (DAT_0064b118 < DAT_0064c6a2[param_1 * 0x594] * 2)) &&
     (0x31 < DAT_0064c6a2[param_1 * 0x594])) {
    DAT_0064b118 = ((DAT_0064c6a2[param_1 * 0x594] / 0x32) | 0) * 0x32;
  }
  if ((DAT_0064b118 === 0) ||
     (DAT_0064c70e[param_2 * 0x594] * 3 <
      DAT_0064c70e[param_1 * 0x594])) {
    DAT_0064b0f8 = 0;
  }
  if (9 < DAT_0064c6f0[param_2 * 0x594 + param_1]) {
    DAT_0064c6f0[param_2 * 0x594 + param_1] = 0;
    DAT_0064b0f8 = 0;
  }
  if (DAT_0064b0f8 === 0) {
    if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
      DAT_0064b148 = 0;
    }
  }
  else {
    DAT_0064b148 = 2;
  }
  DAT_0064b13c = DAT_0064b0f8;
  DAT_0064b140 = 0;
  if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) {
    DAT_0064b140 = -2;
  }
  if (((DAT_00655ae8 & 0x80) !== 0) && (DAT_0064c6b3[param_2 * 0x594] === 0)) {
    DAT_0064b140 = DAT_0064b140 + -1;
  }
  if (DAT_0064c6be[param_1 * 0x594] !== 0) {
    DAT_0064b140 = DAT_0064b140 - ((u8(DAT_0064c6be[param_1 * 0x594]) - 1) / 2) | 0;
  }
  DAT_0064b100 = -1;
  DAT_0064b0fc = -1;
  DAT_0064b104 = -1;
  uVar2 = 0;
  uVar3 = 9999;
  local_20 = 0;
  for (local_1c = 1; local_1c < 8; local_1c = local_1c + 1) {
    if ((param_1 !== local_1c) && (param_2 !== local_1c)) {
      if ((DAT_0064c6c0[param_2 * 0x594 + local_1c * 4] & 8) !== 0) {
        if (u8(DAT_00655c22[param_2]) < u8(DAT_00655c22[param_1])) {
          DAT_0064b140 = DAT_0064b140 + -1;
        }
        if ((((DAT_00655c22[param_1] === 7) &&
             (4 < DAT_0064c708[param_1 * 0x594])) && (200 < DAT_00655af8)) &&
           ((DAT_00655b08 !== 0 && ((DAT_0064c6c0[param_1 * 4 + local_1c * 0x594] & 1) !== 0)))) {
          if (DAT_0064b0ec === 0) {
            if (((DAT_0064c6c1[param_1 * 4 + local_1c * 0x594] & 0x20) !== 0) &&
               (iVar4 = FUN_00453e51(param_1, 6), iVar4 === 0) &&
               (iVar4 = FUN_00453e51(param_1, 0x18), iVar4 === 0)) {
              DAT_0064b0f8 = 1;
            }
          }
          else {
            DAT_0064b0ec = FUN_005adfa0(DAT_0064b0ec + -4, 0, 99);
          }
        }
      }
      if ((DAT_0064c6c1[param_2 * 0x594 + local_1c * 4] & 8) !== 0) {
        local_20 = local_20 + 1;
      }
      iVar4 = FUN_00467af0(param_2, local_1c);
      if (iVar4 !== 0) {
        if (DAT_0064c70e[local_1c * 0x594] * 4 -
            DAT_0064c70e[param_2 * 0x594] !== 0 &&
            DAT_0064c70e[param_2 * 0x594] <=
            DAT_0064c70e[local_1c * 0x594] * 4) {
          DAT_0064b140 = DAT_0064b140 + 1;
        }
        if (DAT_0064c70e[param_2 * 0x594] <
            DAT_0064c70e[local_1c * 0x594]) {
          DAT_0064b140 = DAT_0064b140 + 1;
        }
        if (((DAT_0064c6c0[param_1 * 0x594 + local_1c * 4] & 1) !== 0) &&
           ((DAT_0064c6c1[param_1 * 0x594 + local_1c * 4] & 0x20) === 0)) {
          DAT_0064b104 = local_1c;
        }
        if (((DAT_0064c6c1[param_2 * 0x594 + local_1c * 4] & 0x20) !== 0) &&
           ((DAT_0064c6c1[param_2 * 0x594 + local_1c * 4] & 2) !== 0)) {
          if (uVar2 < DAT_0064c70e[local_1c * 0x594]) {
            uVar2 = DAT_0064c70e[local_1c * 0x594];
            DAT_0064b0fc = local_1c;
          }
          if (DAT_0064c70e[local_1c * 0x594] < uVar3) {
            uVar3 = DAT_0064c70e[local_1c * 0x594];
            DAT_0064b100 = local_1c;
          }
        }
      }
    }
  }
  if (local_20 === 0) {
    FUN_00467750(param_2, param_1, 0x100000);
  }
  DAT_0064b140 = DAT_0064b140 -
                 s8(DAT_006554f8[DAT_0064c6a6[param_2 * 0x594] * 0x30]);
  if (DAT_0064c70e[param_1 * 0x594] <
      DAT_0064c70e[param_2 * 0x594]) {
    DAT_0064b140 = DAT_0064b140 + -1;
  }
  iVar4 = FUN_00467af0(param_2, param_1);
  if (((((iVar4 !== 0 ? 1 : 0) < DAT_0064b140) && (DAT_0064b11c === 0)) &&
      ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x808) === 0)) &&
     (DAT_0064b0f8 = 0, ((DAT_00655af8 + param_2 + param_1) & 0x20) !== 0)) {
    DAT_0064b118 = 0;
  }
  DAT_0064b0f4 = 0;
  for (local_18 = 0; local_18 < DAT_00655b18; local_18 = local_18 + 1) {
    if (((DAT_0064f394[local_18 * 0x58] !== 0) &&
        (s8(DAT_0064f34a[local_18 * 0x58]) === param_2)) &&
       (s8(DAT_0064f348[local_18 * 0x58]) === param_1)) {
      DAT_0064b0f4 = DAT_0064b0f4 + 1;
    }
  }
  // Remaining complex condition checks for DAT_0064b0e8 ...
  // (extremely long diplomatic logic — abbreviated but all variables set)
  DAT_0064b0e8 = 0;
  let _condA = (DAT_00626a1c === 0) ||
               (6 < (u8(DAT_0064c6be[param_1 * 0x594]) - s8(DAT_0064c6e8[param_2 * 0x594 + param_1])));
  let _condB = ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) === 0) || (4 < DAT_0064b0f4);
  let _condC = ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0);
  let _condD = (DAT_0064b0f8 !== 0) || ((DAT_0064b130 !== 0) && (2 < DAT_00655b08));
  let _condE = (DAT_0064b128 !== 0) &&
               (6 < (u8(DAT_0064c6be[param_1 * 0x594]) - s8(DAT_0064c6e8[param_2 * 0x594 + param_1]))) &&
               ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0);
  let _condF = (DAT_0064c70e[param_2 * 0x594] < DAT_0064c70e[param_1 * 0x594]) ||
               ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) ||
               (6 < (u8(DAT_0064c6be[param_1 * 0x594]) - s8(DAT_0064c6e8[param_2 * 0x594 + param_1])));
  if (_condA && _condB && _condC && (_condD || _condE) && _condF) {
    DAT_0064b0e8 = 1;
  }
  if (DAT_0064b0e8 !== 0) {
    DAT_0064b0f8 = 0;
    DAT_0064b148 = 0;
    if (0x1d < DAT_0064b114) {
      DAT_0064b114 = 0x1e;
    }
  }
  // Scenario flags check
  if (((DAT_00655af0 & 0x80) !== 0) && (((DAT_0064bc60 & 0x8000) >>> 0) !== 0)) {
    if (param_2 === 6) {
      if (param_1 === 7) {
        if ((bRam0064e854 & 8) !== 0) {
          DAT_0064b0f8 = 1;
        }
      }
      else if (param_1 === 1) {
        DAT_0064b0f8 = 0;
      }
      else if (param_1 === 3) {
        DAT_0064b0f8 = 1;
      }
      else {
        DAT_0064b0f8 = 0;
      }
    }
    if ((param_2 === 3) && ((param_1 === 6 || (param_1 === 1)))) {
      DAT_0064b0f8 = 1;
    }
  }
  // Hawks / war declaration check
  if (((((DAT_00626a20 !== 0) &&
        (cVar1 = s8(DAT_0064c6bf[param_2 * 0x594]), iVar4 = FUN_00456f8b(param_1, param_2),
        cVar1 < iVar4)) && (4 < u8(DAT_0064c6b5[param_2 * 0x594]))) &&
      ((DAT_0064b0f8 !== 0 &&
       (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594]) & 0x400008) === 0)))) &&
     (((DAT_00655af0 & 0x80) === 0 || ((DAT_0064bc60 & 1) === 0)))) {
    if ((((DAT_0064c70e[param_2 * 0x594] * 2 <
          DAT_0064c70e[param_1 * 0x594] * 3) && (DAT_0064b11c === 0)) &&
       ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) === 0))) {
      DAT_0064b0f8 = 0;
    }
    else {
      FUN_0055f5a3(param_2, 1);
    }
  }
  if ((DAT_0064b0ec === 0) && (DAT_0064b114 < 2)) {
    DAT_0064b114 = 1;
  }
  if (((DAT_0064c6c1[param_2 * 4 + param_1 * 0x594] & 0x20) === 0) &&
     (0x62 < DAT_0064b114)) {
    DAT_0064b114 = 99;
  }
  if ((((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) !== 0) || (DAT_0064b148 === 0)) &&
     (0x49 < DAT_0064b114)) {
    DAT_0064b114 = 0x4a;
  }
  if (((DAT_0064c6c1[param_2 * 4 + param_1 * 0x594] & 0x20) !== 0) &&
     (DAT_0064b114 < 0x1b)) {
    DAT_0064b114 = 0x1a;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00458a3b — show_diplomacy_attitude_header
// Source: block_00450000.c @ 0x00458A3B, 118 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00458a3b(param_1, param_2) {
  // UI: display diplomacy attitude header — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00458ab1 — show_greeting_dialog
// Source: block_00450000.c @ 0x00458AB1, 804 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00458ab1(param_1, param_2) {
  // UI: show diplomatic greeting dialog — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00458dd5 — diplomacy_cleanup_1
// Source: block_00450000.c @ 0x00458DD5, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00458dd5() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00458deb — seh_unwind_5
// Source: block_00450000.c @ 0x00458DEB, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00458deb() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00458df9 — ai_diplomacy_encounter
// Source: block_00450000.c @ 0x00458DF9, 880 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00458df9(param_1, param_2, param_3, param_4) {
  // AI: diplomacy encounter logic — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00459169 — diplomacy_cleanup_2
// Source: block_00450000.c @ 0x00459169, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00459169() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045917f — seh_unwind_6
// Source: block_00450000.c @ 0x0045917F, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045917f() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045918e — reset_diplomacy_state
// Source: block_00450000.c @ 0x0045918E, 61 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045918e() {
  DAT_00626a24 = 0;
  DAT_00626a30 = 0;
  DAT_00626a34 = 0;
  DAT_00626a1c = 0;
  FUN_00494148();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004591cb — try_sell_tech_to_ai
// Source: block_00450000.c @ 0x004591CB, 832 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004591cb(param_1, param_2, param_3) {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;

  if (DAT_0064b144 < 0) {
    uVar1 = 0;
  }
  else {
    local_c = FUN_004bdb2c(param_2, DAT_0064b144);
    local_c = local_c * 0x14;
    if (0x32 < DAT_0064b114) {
      local_c = ((DAT_0064b114 * local_c) / 0x32) | 0;
    }
    if ((((DAT_00655c22[param_1] === 7) && (4 < DAT_0064c708[param_1 * 0x594])) &&
        (200 < DAT_00655af8)) && (DAT_00655b08 !== 0)) {
      local_c = local_c << 1;
    }
    iVar2 = FUN_005ae006(s8(DAT_00655b82[DAT_0064b144]));
    iVar2 = iVar2 + -1;
    if (iVar2 < 2) {
      iVar2 = 1;
    }
    iVar2 = (local_c / iVar2) | 0;
    local_c = iVar2 * 10;
    if (0x5dc < DAT_0064c6a2[param_1 * 0x594]) {
      local_c = ((iVar2 * 0x1e) / 2) | 0;
    }
    if (3000 < DAT_0064c6a2[param_1 * 0x594]) {
      local_c = ((local_c * 3) / 2) | 0;
    }
    if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
      if (u8(DAT_0064c6b0[param_1 * 0x594]) < u8(DAT_0064c6b0[param_2 * 0x594])) {
        local_c = (local_c / 2) | 0;
      }
      else {
        local_c = local_c - ((local_c + (local_c >> 31 & 3)) >> 2);
      }
      if (u8(DAT_0064c6b0[param_1 * 0x594]) + 4 < u8(DAT_0064c6b0[param_2 * 0x594])) {
        local_c = (local_c / 2) | 0;
      }
    }
    if (local_c < 0) {
      local_c = 30000;
    }
    if (local_c < 100) {
      local_c = 100;
    }
    if (DAT_0064c6a2[param_1 * 0x594] < local_c) {
      uVar1 = 0;
    }
    else {
      FUN_004271e8(1, DAT_00627684[DAT_0064b144 * 0x10]);
      FUN_00421da0(0, local_c);
      if (param_3 < 2) {
        local_10 = FUN_00421ea0(s_SELLTECH_00626a88);
      }
      else {
        local_10 = FUN_00421ea0(s_SELLTECH2_00626a94);
      }
      if (local_10 === 1) {
        DAT_0064c6a2[param_1 * 0x594] =
             DAT_0064c6a2[param_1 * 0x594] - local_c;
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


// ═══════════════════════════════════════════════════════════════════
// handle_exchange_gift — AI tech/gold exchange negotiation
// Source: block_00450000.c @ 0x0045950B, 4096 bytes
// ═══════════════════════════════════════════════════════════════════

export function handle_exchange_gift(param_1, param_2, param_3, param_4, param_5, param_6) {
  // AI: complex tech exchange / gift negotiation — very large function
  // Contains diplomacy state manipulation, tech trading, gold exchange
  // Stubbed — full logic would require complete integration
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a510 — diplomacy_cleanup_3
// Source: block_00450000.c @ 0x0045A510, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a510() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a526 — seh_unwind_7
// Source: block_00450000.c @ 0x0045A526, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a526() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a535 — declare_alliance
// Source: block_00450000.c @ 0x0045A535, 374 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a535(param_1, param_2) {
  FUN_00456f20(param_2, param_1, 0xffffffe7);
  FUN_00467825(param_2, param_1, 8);
  FUN_0045705e(param_1, param_2);
  DAT_0064c6bf[param_2 * 0x594] = 0;
  DAT_0064c6a0[param_2 * 0x594] =
       DAT_0064c6a0[param_2 * 0x594] | 0x100;
  DAT_0064b0e8 = 0;
  DAT_0064ca82[param_1 * 0x594 + param_2 * 2] = DAT_00655af8;
  DAT_0064c6a0[param_1 * 0x594] =
       DAT_0064c6a0[param_1 * 0x594] | 0x100;
  FUN_00458a3b(param_1, param_2);
  FUN_004941ee(2);
  FUN_00410030(s_ALLIANCE_00626b74, 0, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a6ab — declare_peace_treaty
// Source: block_00450000.c @ 0x0045A6AB, 253 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a6ab(param_1, param_2) {
  let uVar1;

  FUN_00467825(param_2, param_1, 0x4004);
  uVar1 = FUN_00467904(param_2, param_1, 0, 0x32);
  uVar1 = FUN_005adfa0(uVar1);
  FUN_00467933(param_2, param_1, uVar1);
  FUN_0045705e(param_1, param_2);
  DAT_0064c6bf[param_2 * 0x594] = 0;
  DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
  FUN_00458a3b(param_1, param_2);
  FUN_004941ee(2);
  FUN_00410030(s_TREATY_00626b80, 0, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a7a8 — declare_ceasefire
// Source: block_00450000.c @ 0x0045A7A8, 315 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a7a8(param_1, param_2) {
  let uVar1;
  let local_8;

  FUN_00467825(param_2, param_1, 0x4002);
  FUN_00467750(param_2, param_1, 0x40000);
  uVar1 = FUN_00467904(param_2, param_1, 0, 0x32);
  uVar1 = FUN_005adfa0(uVar1);
  FUN_00467933(param_2, param_1, uVar1);
  FUN_0045705e(param_1, param_2);
  DAT_0064ca82[param_1 * 0x594 + param_2 * 2] = DAT_00655af8;
  FUN_00458a3b(param_1, param_2);
  FUN_004941ee(2);
  FUN_00410030(s_CEASEFIRE_00626b88, 0, 0);
  for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
    DAT_0064c6c0[param_1 * 4 + local_8 * 0x594] =
         DAT_0064c6c0[param_1 * 4 + local_8 * 0x594] & 0xfffff7ff;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045a8e3 — check_alliance_cascade_war
// Source: block_00450000.c @ 0x0045A8E3, 910 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045a8e3(param_1, param_2) {
  // AI: cascade war declarations through alliances — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045ac71 — declare_war_on_civ
// Source: block_00450000.c @ 0x0045AC71, 1125 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045ac71(param_1, param_2, param_3) {
  // AI: declare war on civ, adjust reputation, handle alliances — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045b0d6 — demand_help_from_ally
// Source: block_00450000.c @ 0x0045B0D6, 919 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045b0d6(param_1, param_2) {
  // AI: demand help from ally in war — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045b472 — calculate_gold_tribute_value
// Source: block_00450000.c @ 0x0045B472, 104 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045b472(param_1) {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = 10;
  local_10 = 0x32;
  while (0 < param_1) {
    iVar1 = FUN_005adfa0(param_1, 0, local_10);
    local_c = local_c + ((iVar1 / local_8) | 0);
    local_8 = local_8 + 5;
    param_1 = param_1 - local_10;
    local_10 = 100;
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045b4da — ai_respond_to_diplomatic_proposal
// Source: block_00450000.c @ 0x0045B4DA, 10271 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045b4da(param_1, param_2, param_3) {
  // AI: respond to player's diplomatic proposal (alliance, peace, tribute, etc.)
  // This is the core AI diplomacy response function — extremely large
  // Stubbed for JS transpilation
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045dd7f — ai_grant_favor_dialog
// Source: block_00450000.c @ 0x0045DD7F, 4878 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045dd7f(param_1, param_2) {
  // AI: favor menu dialog — exchange tech, declare war on 3rd party, share map
  // Stubbed for JS transpilation
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045f08d — diplomacy_cleanup_4
// Source: block_00450000.c @ 0x0045F08D, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045f08d() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045f0a3 — seh_unwind_8
// Source: block_00450000.c @ 0x0045F0A3, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045f0a3() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// show_gift_menu — player gift menu dialog
// Source: block_00450000.c @ 0x0045F0B1, 3218 bytes
// ═══════════════════════════════════════════════════════════════════

export function show_gift_menu(param_1, param_2) {
  // UI: show gift menu for player to gift tech/gold/units to AI
  // Stubbed — large mixed UI+game logic function
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045fd43 — diplomacy_cleanup_5
// Source: block_00450000.c @ 0x0045FD43, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045fd43() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045fd59 — seh_unwind_9
// Source: block_00450000.c @ 0x0045FD59, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045fd59() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045fd67 — show_continue_war_warning
// Source: block_00450000.c @ 0x0045FD67, 178 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045fd67(param_1, param_2) {
  let uVar1;
  let iVar2;

  if ((4 < u8(DAT_0064c6b5[param_1 * 0x594])) &&
     (((DAT_00655af0 & 0x80) === 0 || ((DAT_0064bc60 & 1) === 0)) && (DAT_00654fa8 === 0))) {
    uVar1 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar1);
    iVar2 = FUN_00453e51(param_1, 0x18);
    if (iVar2 === 0) {
      FUN_00421ea0(s_CONTINUEHAWKS_00626f68);
    }
    else {
      FUN_00421ea0(s_CONTINUEUN_00626f5c);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0045fe19 — show_diplomacy_main_menu
// Source: block_00450000.c @ 0x0045FE19, 747 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0045fe19(param_1, param_2) {
  // UI: show main diplomacy menu — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00460104 — diplomacy_cleanup_6
// Source: block_00450000.c @ 0x00460104 (referenced but not in this block)
// ═══════════════════════════════════════════════════════════════════

export function FUN_00460104() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046011a — seh_unwind_10
// Source: block_00450000.c @ 0x0046011A (referenced but not in this block)
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046011a() {
  // SEH unwind — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// STUB: External functions called from this block.
// These would be imported from other block modules in a full build.
// ═══════════════════════════════════════════════════════════════════

function FUN_005db55b() {}
function FUN_005db140() { return 0; }
function FUN_005bcdc3() {}
function FUN_005bd0e7() {}
function FUN_005c62ee() { return 0; }
function FUN_005c5b7f() {}
function FUN_005c00ce() {}
function FUN_005c0073() {}
function FUN_005c0333() {}
function FUN_005c19ad() {}
function FUN_005c0f57() {}
function FUN_005c11b2() {}
function FUN_005cef31() {}
function FUN_005c0593() {}
function FUN_005bb574() {}
function FUN_005bb4ae() {}
function FUN_005c5fc4() {}
function FUN_005c61b0() {}
function FUN_005c1020() {}
function FUN_005c8c83() {}
function FUN_005c9499() { return 0; }
function FUN_005bd48f() {}
function FUN_005bd630() {}
function FUN_005c64da() {}
function FUN_005c656b() {}
function FUN_005bd915() {}
function FUN_005bbb0a() {}
function FUN_005bcaa7() {}
function FUN_005dcb8c() {}
function FUN_005bf5e1() { return 0; }
function FUN_005cedad() {}
function FUN_005cf467() {}
function FUN_005bd65c() {}
function FUN_005db0d0() {}
function FUN_005dba95() { return 0; }
function FUN_005dbab8() { return 0; }
function FUN_005f35f0() {}
function FUN_005f22d0() {}
function FUN_005f22e0() {}
function FUN_0040f380() {}
function FUN_0040f480() {}
function FUN_0040f510() {}
function FUN_0040f610() {}
function FUN_0040f730() {}
function FUN_0040f810() {}
function FUN_00407f90() { return 0; }
function FUN_00407fc0() { return 0; }
function FUN_0040bbb0() {}
function FUN_0040bbe0() {}
function FUN_0040bc10() {}
function FUN_0040bc80() { return 0; }
function FUN_0040ef70() { return 0; }
function FUN_0040efd0() { return 0; }
function FUN_0040fb00() { return 0; }
function FUN_0040fc50() {}
function FUN_0040fcf0() {}
function FUN_0040fd40() {}
function FUN_0040fd80() {}
function FUN_0040fe10() {}
function FUN_0040fe40() {}
function FUN_0040ff00() {}
function FUN_0040ff30() {}
function FUN_0040ff60() {}
function FUN_0040ffa0() {}
function FUN_00408130() {}
function FUN_004083f0() {}
function FUN_00408460() {}
function FUN_00408490() {}
function FUN_004085f0() {}
function FUN_00408650() {}
function FUN_004087c0() { return 0; }
function FUN_00410030() { return 0; }
function FUN_00410070() { return 0; }
function FUN_004105f8() { return 0; }
function FUN_00414be0() {}
function FUN_00414ce0() {}
function FUN_00414d10() { return 0; }
function FUN_00414d40() {}
function FUN_00415133() { return 0; }
function FUN_00418a30() {}
function FUN_00419b80() {}
function FUN_00419ba0() {}
function FUN_00421da0() {}
function FUN_00421ea0() { return 0; }
function FUN_00421f10() {}
function FUN_004271e8() {}
function FUN_00428b0c() { return 0; }
function FUN_0043060b() {}
function FUN_0043c520() {}
function FUN_0043c5f0() {}
function FUN_0043c690() {}
function FUN_0043c6c0() {}
function FUN_0043c840() {}
function FUN_0043c8a0() {}
function FUN_0043c9d0() {}
function FUN_0043cc00() {}
function FUN_0043d07a() { return 0; }
function FUN_0043d20a() { return 0; }
function FUN_0044c730() {}
function FUN_0044c5a0() {}
function FUN_0044ca60() {}
function FUN_0044cba0() {}
function FUN_00448f92() { return 0; }
function FUN_004679ab() { return 0; }
function FUN_00467750() {}
function FUN_00467825() {}
function FUN_00467904() { return 0; }
function FUN_00467933() {}
function FUN_00467af0() { return 0; }
function FUN_00467ef2() {}
function FUN_0047cea6() {}
function FUN_0047cf9e() {}
function FUN_00493b10() { return 0; }
function FUN_00493ba6() { return 0; }
function FUN_00493c7d() { return 0; }
function FUN_00493f0f() {}
function FUN_00494148() {}
function FUN_004941ee() {}
function FUN_004a2020() {}
function FUN_004a2379() { return 0; }
function FUN_004a23fc() {}
function FUN_004a7577() { return 0; }
function FUN_004aef20() {}
function FUN_004af14b() {}
function FUN_004b0b53() {}
function FUN_004bd9f0() { return 0; }
function FUN_004bdaa5() { return 0; }
function FUN_004bdb2c() { return 0; }
function FUN_004bf05b() {}
function FUN_004f4793() {}
function FUN_004f5f23() {}
function FUN_00511880() {}
function FUN_0052e971() {}
function FUN_0055f5a3() {}
function FUN_0056a65e() {}
function FUN_00564713() { return 0; }
function FUN_00568861() { return 0; }
function FUN_00569363() {}
function FUN_00598d45() { return 0; }
function FUN_0059a791() { return 0; }
function FUN_0059d3e1() {}
function FUN_0059d5f5() {}
function FUN_0059db08() {}
function FUN_0059df8a() {}
function FUN_0059e783() {}
function FUN_0059edf0() {}
function FUN_005adfa0() { return 0; }
function FUN_005adfd9() {}
function FUN_005ae006() { return 0; }
function FUN_005ae052() { return 0; }
function FUN_005b2e69() { return 0; }
function FUN_005b319e() {}
function FUN_005b345f() {}
function FUN_005b36df() {}
function FUN_005b67af() { return 0; }
function FUN_005b6aea() { return 0; }
function FUN_005b8931() { return 0; }
function FUN_005b898b() { return 0; }
function FUN_005b89e4() { return 0; }
function FUN_005b8d62() { return 0; }
function FUN_005b976d() {}
function FUN_005b9d81() {}
function FUN_005b9ec6() {}
function FUN_005b9f1c() {}
function FUN_005a9780() {}
function FUN_00426ff0() {}
function _rand() { return Math.floor(Math.random() * 0x7FFF); }
