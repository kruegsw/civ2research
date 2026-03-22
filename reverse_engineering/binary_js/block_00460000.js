// ═══════════════════════════════════════════════════════════════════
// block_00460000.js — Mechanical transpilation of block_00460000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00460000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00460000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let _DAT_00626a28 = 0;
let DAT_00627670 = 0;
let DAT_0064b120 = 0;
let DAT_0064b110 = 0;
let DAT_0064b0f0 = 0;
let DAT_0064c6bf = new Uint8Array(8 * 0x594);
let DAT_00626a1c = 0;
let DAT_00626a20 = 0;
let DAT_0064c6c0 = new Uint32Array(8 * 0x594);
let DAT_0064b138 = 0;
let DAT_0064ca82 = new Int16Array(8 * 0x594);
let DAT_00655af8 = 0;
let DAT_0064c6c1 = new Uint8Array(8 * 0x594);
let DAT_0064c6c2 = new Uint8Array(8 * 0x594);
let DAT_00655b08 = 0;
let DAT_0064caa2 = new Int16Array(8 * 0x594);
let DAT_00626a34 = 0;
let DAT_00626a30 = 0;
let DAT_00655b91 = 0;
let DAT_0064b104 = 0;
let DAT_0064b124 = 0;
let DAT_0064b118 = 0;
let DAT_00655af0 = 0;
let DAT_0064bc60 = 0;
let DAT_0064b0f8 = 0;
let DAT_0064b0ec = 0;
let DAT_00655b0a = 0;
let DAT_0064b130 = 0;
let DAT_0064b12c = 0;
let DAT_0064b148 = 0;
let DAT_00628420 = 0;
let DAT_006554fc = new Uint8Array(256 * 0x30);
let DAT_0064c6a6 = new Int16Array(8 * 0x594);
let DAT_0064c6a2 = new Int32Array(8 * 0x594);
let DAT_00655b44 = 0;
let DAT_0064c70e = new Uint16Array(8 * 0x594);
let DAT_0064c708 = new Int16Array(8 * 0x594);
let DAT_0064b0fc = 0;
let DAT_00627684 = new Uint8Array(256 * 0x10);
let DAT_0064b10c = 0;
let DAT_0064b134 = 0;
let DAT_0064b114 = 0;
let DAT_0064c6be = new Uint8Array(8 * 0x594);
let DAT_0064c6e8 = new Int8Array(8 * 0x594);
let DAT_00655c22 = new Uint8Array(8);
let DAT_0064c6b0 = new Uint8Array(8 * 0x594);
let DAT_0064b128 = 0;
let DAT_0064b11c = 0;
let DAT_0064b140 = 0;
let DAT_0064b0f4 = 0;
let DAT_0064b13c = 0;
let DAT_0064c6b5 = new Uint8Array(8 * 0x594);
let DAT_0064b108 = 0;
let DAT_0064b0e8 = 0;
let DAT_0064b144 = 0;
let DAT_0064c932 = new Uint8Array(8 * 0x594);
let DAT_0064c832 = new Uint16Array(8 * 0x594);
let DAT_0064c8b2 = new Uint16Array(8 * 0x594);
let DAT_0064b100 = 0;
let DAT_006d1da0 = 0;
let DAT_00654fa8 = 0;
let DAT_00655b07 = 0;
let DAT_00655aea = 0;
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_006ab5e8 = 0;
let DAT_006ab5e4 = 0;
let DAT_0062768e = new Int8Array(256 * 0x10);
let DAT_0062768f = new Int8Array(256 * 0x10);
let DAT_0063cc30 = new Uint32Array(8);
let DAT_0065610a = new Int32Array(256 * 0x20);
let DAT_006560f7 = new Int8Array(256 * 0x20);
let DAT_006560f0 = new Int16Array(256 * 0x20);
let DAT_006560f2 = new Int16Array(256 * 0x20);
let DAT_0064f348 = new Int8Array(256 * 0x58);
let DAT_0064b1ca = new Uint8Array(256 * 0x14);
let DAT_006560f6 = new Uint8Array(256 * 0x20);
let DAT_006560ff = new Uint8Array(256 * 0x20);
let DAT_006d1da8 = 0;
let DAT_00655afe = 0;
let DAT_0064b1b4 = 0;
let DAT_0064b1b0 = 0;
let DAT_0064f394 = new Int32Array(256 * 0x58);
let DAT_0064f340 = new Int16Array(256 * 0x58);
let DAT_0064f342 = new Int16Array(256 * 0x58);
let DAT_00655b16 = 0;
let DAT_00655b18 = 0;
let DAT_00655b02 = 0;
let DAT_006c31a9 = 0;
let DAT_0064c6e0 = new Uint8Array(8 * 0x594);
let DAT_0066be80 = new Uint32Array(8);
let DAT_0066be78 = 0;
let DAT_006365f4 = 0;
let DAT_006d1190 = 0;
let DAT_006ad640 = 0;
let DAT_006ad6ac = 0;
let DAT_006ad110 = 0;
let DAT_006ad2f7 = 0;
let DAT_00654fb0 = 0;
let DAT_006c9088 = 0;
let DAT_006c9078 = 0;
let DAT_006c907c = 0;
let DAT_00628468 = 0;
let DAT_00628424 = 0;
let DAT_0062841c = 0;
let DAT_0064bb08 = 0;
let DAT_00655020 = 0;
let DAT_006ad558 = new Uint32Array(256);
let DAT_006ad30c = new Uint8Array(256 * 0x54);
let DAT_0067a8c0 = 0;
let DAT_0066be90 = new Uint32Array(256);
let DAT_00656100 = new Int8Array(256 * 0x20);
let DAT_00635a18 = 0;
let DAT_00635a1c = 0;
let DAT_00635a20 = 0;
let DAT_00635a24 = 0;
let DAT_00635a28 = 0;
let DAT_00635a2c = 0;
let DAT_0067a994 = 0;
let DAT_0064b1b8 = new Uint8Array(256 * 0x14);
let DAT_0066ca84 = new Int16Array(8 * 0x3f0);
let DAT_0062af14 = 0;
let DAT_0062af10 = 0;
let DAT_0062b420 = 0;
let DAT_0062b42c = 0;
let DAT_0062b424 = 0;
let DAT_0062b428 = -1;
let DAT_0066bfc4 = 0;
let DAT_0066bfc0 = 0;
let DAT_00638b48 = 0;
let DAT_0066c408 = 0;
let DAT_0062804c = 0;
let DAT_006c9178 = 0;  // referenced by FUN_0046b14d for DAT_006c9088
let DAT_0064bcc8 = 0;

// String constants (stub)
const s_OUTAHERE_00626f94 = 'OUTAHERE';
const s_OUTAHERE_00626fb0 = 'OUTAHERE';
const s_OUTAHEREALLY_00626fa0 = 'OUTAHEREALLY';
const s_CANCELTREATY_00626fbc = 'CANCELTREATY';
const s_TRIBUTE_00626fcc = 'TRIBUTE';
const s_TAKECIV_00626fd4 = 'TAKECIV';
const s_OVERABARREL_00626fdc = 'OVERABARREL';
const s_BEGONE0_00626fe8 = 'BEGONE0';
const s_BEGONE1_00626ff0 = 'BEGONE1';
const s_PROVOKE_00626ff8 = 'PROVOKE';
const s_REJECT0_00627000 = 'REJECT0';
const s_CONTINUEWAR_006270e0 = 'CONTINUEWAR';
const s_PROPOSEALLIANCE_0062702c = 'PROPOSEALLIANCE';
const s_PERHAPSSOLIDARITY_0062703c = 'PERHAPSSOLIDARITY';
const s_PERHAPSDIDNTPROVE_00627050 = 'PERHAPSDIDNTPROVE';
const s_GRANTCEASE_00627064 = 'GRANTCEASE';
const s_WALLCEASE_00627070 = 'WALLCEASE';
const s_PROPOSECEASE_0062707c = 'PROPOSECEASE';
const s_WALLOVERCEASE_0062708c = 'WALLOVERCEASE';
const s_UNOVERCEASE_0062709c = 'UNOVERCEASE';
const s_OVERRULECEASE_006270a8 = 'OVERRULECEASE';
const s_GIVECIV_006270b8 = 'GIVECIV';
const s_GIVECASH_006270c0 = 'GIVECASH';
const s_GROVEL_006270cc = 'GROVEL';
const s_WORTHLESS_006270d4 = 'WORTHLESS';
const s_PROPOSEPEACE_006270ec = 'PROPOSEPEACE';
const s_WALLOVERPEACE_006270fc = 'WALLOVERPEACE';
const s_UNOVERPEACE_0062710c = 'UNOVERPEACE';
const s_OVERRULEPEACE_00627118 = 'OVERRULEPEACE';
const s_CASHFORPEACE_00627128 = 'CASHFORPEACE';
const s_NOPEACE_00627138 = 'NOPEACE';
const s_WALLOVERPEACE_00627140 = 'WALLOVERPEACE';
const s_UNOVERPEACE_00627150 = 'UNOVERPEACE';
const s_WALLOVERCEASE_0062715c = 'WALLOVERCEASE';
const s_UNOVERCEASE_0062716c = 'UNOVERCEASE';
const s_SENATEPEACE_00627178 = 'SENATEPEACE';
const s_SENATECEASE_00627184 = 'SENATECEASE';
const s_ATTITUDEALLY_00627190 = 'ATTITUDEALLY';
const s_ATTITUDEPEACE_006271a0 = 'ATTITUDEPEACE';
const s_ATTITUDE_006271b0 = 'ATTITUDE';
const s_HOWDYALLY_006271bc = 'HOWDYALLY';
const s_HOWDYPEACE_006271c8 = 'HOWDYPEACE';
const s_HOWDY_006271d4 = 'HOWDY';
const s_DOODYALLY_006271dc = 'DOODYALLY';
const s_DOODY_006271e8 = 'DOODY';
const s_WELCOMEALLY_006271f0 = 'WELCOMEALLY';
const s_WELCOMEPEACE_006271fc = 'WELCOMEPEACE';
const s_WELCOME_0062720c = 'WELCOME';
const s_NOTORIOUS_00627214 = 'NOTORIOUS';
const s_SMALL_0062722c = 'SMALL';
const s_PLEASECITY_00627244 = 'PLEASECITY';
const s_PLEASECITIES_00627234 = 'PLEASECITIES';
const s_ALLYPLEA_00627250 = 'ALLYPLEA';
const s_ALLYBRAG_0062725c = 'ALLYBRAG';
const s_PATIENCEALLY_00627268 = 'PATIENCEALLY';
const s_PATIENCE_00627278 = 'PATIENCE';
const s_CEASEEXPIRE_00627284 = 'CEASEEXPIRE';
const s_AMBASSADORS_00627290 = 'AMBASSADORS';
const s_SCHISM_0062729c = 'SCHISM';
const s_CANCELALLIANCE_0062831c = 'CANCELALLIANCE';
const s_ACCURSEDUN_00627020 = 'ACCURSEDUN';
const s_ACCURSEDWALL_00627010 = 'ACCURSEDWALL';
const s_LABELS_00628430 = 'LABELS';
const s_LABELS_00628428 = 'LABELS';
const s_LABELS_00628440 = 'LABELS';
const s_LABELS_00628438 = 'LABELS';
const s_VFWNOTREGISTERED_0062af4c = 'VFWNOTREGISTERED';
const s_AIRCOMBT_0062af70 = 'AIRCOMBT';
const s_CHEERS_0062b430 = 'CHEERS';
const DAT_00648018 = 0;
const DAT_00647748 = 0;
const DAT_006409d8 = 0;
const DAT_00644e48 = 0;
const DAT_00679640 = 0;
const PTR_s_TUTORIAL_00627678 = 0;


// ═══════════════════════════════════════════════════════════════════
// C standard library stubs
// ═══════════════════════════════════════════════════════════════════

function _rand() { return Math.floor(Math.random() * 0x7FFF); }
function _strcmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
function _strlen(s) { return s ? s.length : 0; }
function _atexit(fn) { /* no-op */ }
function _memset(obj, val, len) { /* no-op */ }
function _strncpy(dst, src, len) { /* no-op */ }
function _isdigit(c) { return c >= 0x30 && c <= 0x39 ? 1 : 0; }

// Win32 API stubs
function GetSystemMetrics() { return 0; }
function SetRect() { /* no-op */ }
function CreatePalette() { return null; }
function GetNearestPaletteIndex() { return 0; }
function DeleteObject() { /* no-op */ }
function MessageBoxA() { /* no-op */ }
function sndPlaySoundA() { /* no-op */ }
function timeGetTime() { return Date.now(); }
function XD_SendSecureData() { return 0; }
function XD_SendBroadcastData() { return 0; }
function operator_new(sz) { return new Uint8Array(sz); }
function operator_delete() { /* no-op */ }
function __fsopen() { return null; }
function _fread() { return 0; }
function _fwrite() { return 0; }
function _fclose() { /* no-op */ }
function _fputc() { return 0; }
function __filbuf() { return -1; }


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks not yet defined.
// These are called via thunk wrappers in the original binary.
// ═══════════════════════════════════════════════════════════════════

function FUN_0059df8a() { /* stub */ }
function FUN_004fbe84(p1, p2) { return 0; /* stub */ }
function FUN_0045705e(p1, p2) { /* stub */ }
function FUN_00456f8b(p1, p2) { return 0; /* stub */ }
function FUN_00458a3b(p1, p2) { /* stub */ }
function FUN_004941ee(p1) { /* stub */ }
function FUN_00421ea0(p1) { return 0; /* stub */ }
function FUN_00410030(p1, p2, p3) { return 0; /* stub */ }
function FUN_00458df9(p1, p2, p3, p4) { return 0; /* stub */ }
function handle_exchange_gift(p1, p2, p3, p4, p5, p6) { /* stub */ }
function FUN_00493c7d(p1) { return 0; /* stub */ }
function FUN_0040ff60(p1, p2) { /* stub */ }
function FUN_004271e8(p1, p2) { /* stub */ }
function FUN_0040bbb0() { /* stub */ }
function FUN_0040bbe0(p1) { /* stub */ }
function FUN_0040ff30(p1) { /* stub */ }
function FUN_00456f20(p1, p2, p3) { /* stub */ }
function FUN_0045ac71(p1, p2, p3) { /* stub */ }
function FUN_0056a65e(p1) { /* stub */ }
function FUN_0045b472(p1) { return 0; /* stub */ }
function FUN_004bd9f0(p1, p2) { return 0; /* stub */ }
function FUN_0059a791(p1, p2) { return 0; /* stub */ }
function FUN_00493b10(p1) { return 0; /* stub */ }
function FUN_00493ba6(p1) { return 0; /* stub */ }
function FUN_00410070(p1) { return 0; /* stub */ }
function FUN_00421da0(p1, p2) { /* stub */ }
function FUN_004bf05b(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_004bdb2c(p1, p2) { return 0; /* stub */ }
function FUN_005adfa0(p1, p2, p3) { return 0; /* stub */ }
function FUN_00453e51(p1, p2) { return 0; /* stub */ }
function FUN_0045a535(p1, p2) { /* stub */ }
function FUN_0055bef9(p1, p2) { return 0; /* stub */ }
function FUN_0045fd67(p1, p2) { /* stub */ }
function FUN_0045a7a8(p1, p2) { /* stub */ }
function FUN_0045a6ab(p1, p2) { /* stub */ }
function FUN_0055bbc0(p1, p2) { /* stub */ }
function FUN_0045fe19(p1, p2) { return 0; /* stub */ }
function FUN_0045dd7f(p1, p2) { /* stub */ }
function show_gift_menu(p1, p2) { /* stub */ }
function FUN_0045b4da(p1, p2, p3) { return 0; /* stub */ }
function FUN_0045918e() { /* stub */ }
function FUN_004442a0(p1, p2, p3) { /* stub */ }
function FUN_0043060b(p1, p2) { /* stub */ }
function FUN_004190d0(p1, p2) { /* stub */ }
function FUN_004fa4be(p1) { /* stub */ }
function FUN_004fa569() { /* stub */ }
function FUN_0044c730() { /* stub */ }
function FUN_0044ca60() { /* stub */ }
function FUN_005dcc10() { /* stub */ }
function FUN_0043d07a(p1, p2, p3, p4, p5) { return -1; /* stub */ }
function FUN_005b8a81(p1, p2) { return 0; /* stub */ }
function FUN_005b89e4(p1, p2) { return 0; /* stub */ }
function FUN_005b5bab(p1, p2) { /* stub */ }
function FUN_005b3ae0(p1, p2, p3, p4) { /* stub */ }
function FUN_0047cf9e(p1, p2) { /* stub */ }
function FUN_0044263f(p1, p2) { return 0; /* stub */ }
function FUN_005ae31d(p1, p2, p3, p4) { return 0; /* stub */ }
function FUN_004a7577(p1) { return 0; /* stub */ }
function FUN_00467580_store(p1, p2) { /* stub */ }
function FUN_005c62ee() { return 0; /* stub */ }
function FUN_004518d0() { /* stub */ }
function FUN_00451890(p1, p2) { /* stub */ }
function FUN_005dba95() { return 0; /* stub */ }
function FUN_005dbab8() { return 0; /* stub */ }
function FUN_00407f90(p1) { return 0; /* stub */ }
function FUN_00407fc0(p1) { return 0; /* stub */ }
function FUN_0040ef70(p1) { return 0; /* stub */ }
function FUN_0040efd0(p1) { return 0; /* stub */ }
function FUN_0052ec47(p1) { return 0; /* stub */ }
function FUN_00451830() { return 0; /* stub */ }
function FUN_00451860() { return 0; /* stub */ }
function FUN_00414d70(p1) { /* stub */ }
function FUN_005b6898(p1) { return ''; /* stub */ }
function FUN_0040ff00(p1) { /* stub */ }
function FUN_0052e971() { /* stub */ }
function FUN_0040f380() { /* stub */ }
function FUN_00428b0c(p1) { return ''; /* stub */ }
function FUN_004aef20(p1) { /* stub */ }
function FUN_0043c840(p1, p2) { /* stub */ }
function FUN_00564713(p1) { return 0; /* stub */ }
function FUN_005c5f20() { /* stub */ }
function FUN_00419ba0(p1) { /* stub */ }
function FUN_005dd27e() { /* stub */ }
function FUN_00408130(p1) { /* stub */ }
function FUN_005dd71e(p1) { /* stub */ }
function FUN_005dd377(p1) { return 0; /* stub */ }
function FUN_005c041f(p1) { /* stub */ }
function FUN_00450400() { /* stub */ }
function FUN_00408650() { /* stub */ }
function FUN_00419b80() { /* stub */ }
function FUN_004085f0() { /* stub */ }
function FUN_005dd3c2() { /* stub */ }
function FUN_00414ce0() { /* stub */ }
function FUN_005c61b0() { /* stub */ }
function FUN_00414d40() { /* stub */ }
function FUN_005dd51d() { /* stub */ }
function FUN_004503d0() { /* stub */ }
function FUN_00450340() { /* stub */ }
function FUN_004502b0() { /* stub */ }
function FUN_004502e0(p1) { /* stub */ }
function FUN_00564574() { return null; /* stub */ }
function FUN_00415133(p1) { return 0; /* stub */ }
function FUN_004af1d5(p1, p2) { /* stub */ }
function FUN_00407ff0() { /* stub */ }
function FUN_0047e94e(p1, p2) { /* stub */ }
function FUN_005d61ab(p1) { /* stub */ }
function FUN_005d6038(p1, p2, p3, p4) { /* stub */ }
function FUN_005dde9d() { /* stub */ }
function FUN_005de6fc(p1) { /* stub */ }
function FUN_005ddbc7(p1) { /* stub */ }
function FUN_005ddeff() { return -1; /* stub */ }
function FUN_005c71f3(p1, p2, p3, p4) { /* stub */ }
function FUN_005c738e(p1) { /* stub */ }
function FUN_005c72f8() { /* stub */ }
function FUN_005bb574() { /* stub */ }
function FUN_00408460() { /* stub */ }
function FUN_005c6480(p1, p2) { /* stub */ }
function FUN_005dce4f(p1) { return 0; /* stub */ }
function FUN_005dcdf9(p1) { return 0; /* stub */ }
function FUN_005dce29(p1) { /* stub */ }
function FUN_005dce96(p1) { return 0; /* stub */ }
function FUN_005c6b63(p1, p2, p3) { /* stub */ }
function FUN_005c6b93(p1, p2, p3, p4) { /* stub */ }
function FUN_005c1a62(p1, p2, p3) { /* stub */ }
function FUN_005dae6b(p1, p2, p3, p4) { /* stub */ }
function FUN_005d22f9(p1, p2, p3, p4) { /* stub */ }
function FUN_005d237d(p1, p2) { /* stub */ }
function FUN_005d2279(p1, p2) { /* stub */ }
function FUN_0059c0e1(p1, p2, p3, p4, p5, p6, p7, p8, p9) { return null; /* stub */ }
function FUN_0059c31f(p1) { /* stub */ }
function FUN_0040fb00() { return 0; /* stub */ }
function FUN_0040fc50(p1, p2, p3, p4) { /* stub */ }
function FUN_0040fd40(p1, p2) { /* stub */ }
function FUN_0040fcf0(p1) { /* stub */ }
function FUN_005db0d0(p1) { /* stub */ }
function FUN_0040fd80(p1) { /* stub */ }
function FUN_00451ac0(p1) { /* stub */ }
function FUN_00451930() { return 0; /* stub */ }
function FUN_004519b0(p1, p2, p3) { /* stub */ }
function FUN_00451a60(p1) { /* stub */ }
function FUN_004bb870(p1) { return 0; /* stub */ }
function FUN_00589ef8(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_004a2379(p1, p2) { return 0; /* stub */ }
function FUN_004a23fc(p1) { /* stub */ }
function FUN_004a2534() { return 0; /* stub */ }
function FUN_004a257a() { return 0; /* stub */ }
function FUN_004a2020() { /* stub */ }
function FUN_00428a95(p1) { return 0; /* stub */ }
function FUN_00511880(p1, p2, p3, p4, p5, p6) { /* stub */ }
function FUN_004b1a15(p1) { return 0; /* stub */ }
function FUN_004b1c11(p1) { return 0; /* stub */ }
function FUN_004b153c(p1) { return 0; /* stub */ }
function FUN_004b18e1(p1) { return 0; /* stub */ }
function FUN_00408490(p1) { /* stub */ }
function FUN_00552112() { /* stub */ }
function FUN_005dd010() { /* stub */ }
function FUN_005c64da() { /* stub */ }
function FUN_005bcaa7(p1) { /* stub */ }
function FUN_005f22d0(dst, src) { /* stub */ }
function FUN_005f22e0(p1, p2) { /* stub */ }
function FUN_005bb3f0(p1, p2, p3, p4, p5, p6, p7) { /* stub */ }
function FUN_00484d52() { /* stub */ }
function FUN_005c0d69(p1, p2, p3, p4) { /* stub */ }
function FUN_004087c0(p1, p2) { return 0; /* stub */ }
function FUN_005b50ad(p1, p2) { return 0; /* stub */ }
function FUN_005ae052(p1) { return p1; /* stub */ }
function FUN_005c00ce(p1) { /* stub */ }
function FUN_005c0073(p1) { /* stub */ }
function FUN_005c0333(p1, p2) { /* stub */ }
function FUN_005c19ad(p1) { /* stub */ }
function FUN_005c0f57(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_005cef31(p1, p2, p3, p4) { /* stub */ }
function FUN_005cd775(p1, p2) { /* stub */ }
function FUN_005c656b() { /* stub */ }
function FUN_005dd1a0() { /* stub */ }
function FUN_005c19d3(p1, p2) { return null; /* stub */ }
function FUN_005bd65c(p1, p2) { /* stub */ }
function FUN_005dea9e(p1) { /* stub */ }
function FUN_005deb12(p1) { /* stub */ }
function FUN_0043c5f0() { /* stub */ }
function FUN_00453c80() { /* stub */ }
function FUN_00453c40() { /* stub */ }
function FUN_005c19d3_write(p1, p2) { return null; /* stub */ }
function FID_conflict__memcpy(dst, src, len) { /* stub */ }
function FID_conflict___toupper_lk(c) { return c >= 0x61 && c <= 0x7a ? c - 0x20 : c; }
function CDialog_SetHelpID() { /* stub */ }
let DAT_0066ca54 = 0, DAT_0066ca58 = 0, DAT_0066ca5c = 0, DAT_0066ca68 = 0;
let _DAT_0066c990 = 0;
let DAT_0066bfd0 = 0;
let DAT_00628350 = new Int8Array(8);
let DAT_00628360 = new Int8Array(8);


// ═══════════════════════════════════════════════════════════════════
// FUN_00460104 — thunk to FUN_0059df8a
// Source: block_00460000.c @ 0x00460104, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00460104() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046011a — SEH cleanup (fs_offset restore)
// Source: block_00460000.c @ 0x0046011A, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046011a() {
  // SEH frame cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00460129 — ai_diplomacy_meeting (main AI diplomacy handler)
// Source: block_00460000.c @ 0x00460129, 16263 bytes
//
// The largest function in this block. Handles AI-to-human and
// AI-to-AI diplomacy: tribute demands, treaty proposals,
// ceasefire, peace, alliance, tech exchange, etc.
// ═══════════════════════════════════════════════════════════════════

export function FUN_00460129(param_1, param_2, param_3, param_4, param_5) {
  let cVar1;
  let bVar2;
  let bVar3 = false;
  let bVar4 = false;
  let bVar5 = false;
  let bVar6 = false;
  let bVar7 = false;
  let bVar8 = false;
  let bVar9 = false;
  let bVar10 = false;
  let bVar11 = false;
  let bVar17;
  let iVar13;
  let uVar14;
  let uVar15;
  let uVar16;
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
  let local_34 = 0;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  _DAT_00626a28 = 1;
  if ((DAT_00627670 !== 0) && (iVar13 = FUN_004fbe84(param_1, param_2), iVar13 === 0)) {
    _DAT_00626a28 = 0;
    return;
  }
  DAT_0064b120 = param_1;
  DAT_0064b110 = param_2;
  DAT_0064b0f0 = 0;
  if (param_5 === 0) {
    DAT_0064c6bf[param_2 * 0x594] = 0;
  }
  DAT_00626a1c = 0;
  DAT_00626a20 = 1;
  FUN_0045705e(param_1, param_2);
  DAT_00626a1c = 1;
  DAT_00626a20 = 0;
  DAT_0064b138 = ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 2) !== 0) ? 1 : 0;
  bVar17 = (DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 1) === 0;
  if (param_5 === 0) {
    DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
    FUN_00467750(param_2, param_1, 0x40002);
  } else {
    if (s8(DAT_0064c6bf[param_2 * 0x594]) < 0) {
      DAT_0064c6bf[param_2 * 0x594] = 0;
    }
    if ((DAT_0064c6c1[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
      let uVar12 = FUN_00456f8b(param_1, param_2);
      DAT_0064c6bf[param_2 * 0x594] = uVar12;
    }
    if ((DAT_0064c6c2[param_2 * 4 + param_1 * 0x594] & 1) === 0) {
      if (((3 < DAT_00655b08) && (iVar13 = FUN_004a7577(param_2), iVar13 !== 0)) &&
          (iVar13 = FUN_004a7577(param_1), iVar13 !== 0) &&
          ((DAT_0064caa2[param_1 * 0x594] < DAT_0064caa2[param_2 * 0x594]) &&
           ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0))) {
        FUN_00467825(param_2, param_1, 0x200000);
      }
    } else {
      DAT_0064c6bf[param_2 * 0x594] = 0;
      FUN_00467750(param_2, param_1, 0x200000);
    }
  }
  DAT_00626a34 = (param_5 !== 0) ? 1 : 0;

  // param_5 !== 0 block — AI initiated meeting
  let goto_LAB_00463d3b = false;
  if (param_5 !== 0) {
    if ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) {
      if (DAT_00626a30 === 0) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_004941ee(4);
      FUN_00421ea0(s_OUTAHERE_00626f94);
      bVar9 = true;
      goto_LAB_00463d3b = true;
    }
    if (!goto_LAB_00463d3b) {
      cVar1 = s8(DAT_0064c6bf[param_2 * 0x594]);
      iVar13 = FUN_00456f8b(param_1, param_2);
      if ((iVar13 <= cVar1) && ((DAT_0064c6c2[param_2 * 4 + param_1 * 0x594] & 0x80) !== 0)) {
        if (DAT_00626a30 === 0) {
          FUN_00458a3b(param_1, param_2);
        }
        if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
          FUN_004941ee(4);
          FUN_00421ea0(s_OUTAHERE_00626fb0);
        } else {
          FUN_004941ee(3);
          FUN_00410030(s_OUTAHEREALLY_00626fa0,
                       DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
        }
        bVar9 = true;
        goto_LAB_00463d3b = true;
      }
      if (!goto_LAB_00463d3b) {
        FUN_00458df9(param_1, param_2, param_3, param_4);
      }
    }
  }

  if (!goto_LAB_00463d3b) {
    FUN_00467825(param_1, param_2, 0x800000);
    bVar11 = true;
    local_34 = ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 0x40) !== 0) ? 1 : 0;
    FUN_00467750(param_2, param_1, 0x400000);
    if (((DAT_00655af0 & 0x80) !== 0) && (((DAT_0064bc60 | 0) & 0x8000) !== 0)) {
      if (((param_2 === 3) && (param_1 === 6)) || ((param_2 === 6 && (param_1 === 3)))) {
        DAT_0064b104 = 0;
        DAT_0064b124 = -1;
        DAT_0064b118 = 0;
        local_34 = 0;
      }
      if (((param_2 === 3) && (param_1 === 1)) || ((param_2 === 1 && (param_1 === 3)))) {
        DAT_0064b124 = -1;
        DAT_0064b104 = 0;
        local_34 = 0;
      }
    }
    handle_exchange_gift(param_1, param_2, param_3, param_4, 1, 0);

    if ((((DAT_0064b0f8 === 0) && (param_5 === 0)) &&
        ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 6) !== 0)) && (2 < DAT_0064b0ec)) {
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    FUN_00458a3b(param_1, param_2);
    if (((0 < DAT_0064b104) && (DAT_0064b104 < 8)) &&
       ((1 << (DAT_0064b104 & 0x1f) & DAT_00655b0a) === 0)) {
      DAT_0064b104 = -1;
    }
    if ((((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) && (DAT_0064b130 !== 0)) &&
       (DAT_0064b12c !== 0)) {
      DAT_0064b104 = -1;
    }
    if ((0 < DAT_0064b104) &&
       (((DAT_0064b148 !== 0 || ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0)) &&
        (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)))) {
      local_38 = 2;
      if ((DAT_0064c6c0[param_1 * 0x594 + DAT_0064b104 * 4] & 4) !== 0) {
        local_38 = 1;
      }
      if ((DAT_0064c6c0[param_1 * 0x594 + DAT_0064b104 * 4] & 8) !== 0) {
        local_38 = 0;
      }
      uVar15 = FUN_00493c7d(DAT_0064b104);
      FUN_0040ff60(1, uVar15);
      if (DAT_0064b0f8 === 0) {
        local_14 = 0x6d;
      } else {
        local_14 = 0x6c;
      }
      if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
        local_14 = 0x6e;
      }
      FUN_004271e8(2, DAT_00628420 + local_14 * 4);
      FUN_0040bbb0();
      FUN_0040bbe0(s_CANCELTREATY_00626fbc);
      FUN_0040ff30(local_38);
      iVar13 = FUN_00421ea0(DAT_00679640);
      if (iVar13 === 0) {
        if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
          FUN_00456f20(param_2, param_1, 5);
        } else {
          if (DAT_0064b148 !== 0) {
            FUN_00456f20(param_2, param_1, 0x14);
          }
          bVar3 = true;
        }
        DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] + 1) & 0xFF;
      } else {
        FUN_0045ac71(param_1, DAT_0064b104, param_2);
        bVar6 = true;
        DAT_0064b0f8 = 0;
        DAT_0064b0fc = -1;
        DAT_0064b104 = -1;
        if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
          uVar14 = _rand();
          uVar16 = uVar14 >> 31;
          if ((((uVar14 ^ uVar16) - uVar16) & 1 ^ uVar16) !== uVar16) {
            DAT_0064b118 = 0;
            if (DAT_0064b138 !== 0) {
              FUN_00467825(param_2, param_1, 2);
            }
          }
        } else {
          DAT_0064b118 = 0;
          bVar5 = true;
        }
      }
      FUN_00458a3b(param_1, param_2);
    }

    // Alliance check — ally demanded too much
    if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
      if ((4 < (u8(DAT_0064c6be[param_1 * 0x594]) -
                s8(DAT_0064c6e8[param_2 * 0x594 + param_1]))) && (!bVar5)) {
        bVar3 = true;
      }
      if (-1 < DAT_0064b124) {
        if (u8(DAT_00655c22[param_2]) < u8(DAT_00655c22[param_1])) {
          if ((u8(DAT_0064c6b0[param_2 * 0x594]) < u8(DAT_0064c6b0[param_1 * 0x594])) ||
             (DAT_0064c6a2[param_1 * 0x594] < DAT_0064c6a2[param_2 * 0x594])) {
            DAT_0064b118 = 0;
          }
        } else if ((u8(DAT_0064c6b0[param_2 * 0x594]) < u8(DAT_0064c6b0[param_1 * 0x594])) &&
                  (DAT_0064c6a2[param_1 * 0x594] < DAT_0064c6a2[param_2 * 0x594])) {
          DAT_0064b118 = 0;
        }
      }
      if ((DAT_0064b130 !== 0) && (DAT_0064b12c !== 0)) {
        bVar3 = true;
        DAT_0064b118 = 0;
      }
      if (((((DAT_00655af0 & 0x80) !== 0) && (((DAT_0064bc60 | 0) & 0x8000) !== 0)) && (param_2 === 6)) &&
         (param_1 === 7)) {
        DAT_0064b118 = 0;
        DAT_0064b124 = -1;
        bVar3 = true;
      }
    }

    // Tech exchange eligibility
    iVar13 = FUN_004bd9f0(param_1, 0x35);
    if ((iVar13 === 0) && (iVar13 = FUN_004bd9f0(param_1, 0), iVar13 === 0)) {
      iVar13 = FUN_004bd9f0(param_1, 0x11);
      if ((iVar13 === 0) && (iVar13 = FUN_004bd9f0(param_1, 0x51), iVar13 === 0)) {
        iVar13 = FUN_004bd9f0(param_1, 0x23);
        if ((iVar13 !== 0) && (iVar13 = FUN_004bd9f0(param_2, 0x23), iVar13 === 0)) {
          bVar4 = true;
        }
      } else {
        iVar13 = FUN_004bd9f0(param_2, 0x11);
        if ((iVar13 === 0) && (iVar13 = FUN_004bd9f0(param_2, 0x51), iVar13 === 0)) {
          bVar4 = true;
        }
      }
    } else {
      iVar13 = FUN_004bd9f0(param_2, 0x35);
      if ((iVar13 === 0) && (iVar13 = FUN_004bd9f0(param_2, 0), iVar13 === 0)) {
        bVar4 = true;
      }
    }
    if ((u8(DAT_0064c6b0[param_1 * 0x594]) <= u8(DAT_0064c6b0[param_2 * 0x594])) &&
       (iVar13 = FUN_004bd9f0(param_2, 0x11), iVar13 !== 0)) {
      bVar4 = false;
    }

    // Tribute demand
    if (((0 < DAT_0064b118) &&
        (((DAT_0064b148 === 2 || (bVar3)) &&
         (DAT_0064b118 <= DAT_0064c6a2[param_1 * 0x594])))) &&
       (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)) {
      if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
        iVar13 = (DAT_0064c6a2[param_1 * 0x594] / 2) | 0;
        if (iVar13 < 0x65) {
          iVar13 = 100;
        }
        if (iVar13 <= DAT_0064b118) {
          DAT_0064b118 = iVar13;
        }
      }
      uVar15 = FUN_00493b10(param_2);
      FUN_0040ff60(1, uVar15);
      uVar15 = FUN_00493ba6(param_2);
      FUN_0040ff60(2, uVar15);
      uVar15 = FUN_00410070(param_2);
      FUN_0040ff60(3, uVar15);
      FUN_004271e8(4, DAT_00628420 + 0x1a8 +
                  ((DAT_006554fc[DAT_0064c6a6[param_2 * 0x594] * 0x30] === 0) ? -4 : 0));
      FUN_00421da0(0, DAT_0064b118);
      FUN_0040bbb0();
      FUN_004941ee(4);
      FUN_0040bbe0(s_TRIBUTE_00626fcc);
      local_14 = FUN_0059a791(0, 3);
      if ((local_14 === 3) &&
         (DAT_0064c70e[param_2 * 0x594] < DAT_0064c70e[param_1 * 0x594])) {
        local_14 = 2;
      }
      if ((local_14 === 2) && (DAT_00655b44 === 0)) {
        local_14 = 1;
      }
      if (bVar4) {
        local_14 = 8;
      }
      if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
        local_14 = 9;
      }
      FUN_0040ff30(local_14);
      if (local_14 === 9) {
        local_70 = FUN_00410030(DAT_00679640,
                                DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
      } else {
        local_70 = FUN_00421ea0(DAT_00679640);
      }
      if (local_70 === 1) {
        DAT_0064c6a2[param_1 * 0x594] =
             DAT_0064c6a2[param_1 * 0x594] - DAT_0064b118;
        DAT_0064c6a2[param_2 * 0x594] =
             DAT_0064c6a2[param_2 * 0x594] + DAT_0064b118;
        DAT_0064b0f8 = 0;
        bVar5 = true;
        FUN_0056a65e(1);
        if (DAT_0064c6bf[param_2 * 0x594] !== 0) {
          DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] - 1) & 0xFF;
        }
        iVar13 = FUN_0045b472(DAT_0064b118);
        FUN_00456f20(param_2, param_1, -iVar13);
        FUN_00458a3b(param_1, param_2);
        if (DAT_0064b138 !== 0) {
          FUN_00467825(param_2, param_1, 2);
        }
      }
      DAT_0064b118 = 999;
    }

    // Take civ (technology demand)
    if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) &&
       (iVar13 = FUN_004679ab(DAT_0064b114), 3 < iVar13)) {
      bVar3 = true;
    }
    if ((((DAT_0064b148 !== 0) || (bVar3)) && (-1 < DAT_0064b124)) &&
       ((DAT_0064b118 !== 999 &&
        (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)))) {
      FUN_004271e8(1, DAT_00627684[DAT_0064b124 * 0x10]);
      uVar15 = FUN_00493b10(param_2);
      FUN_0040ff60(3, uVar15);
      uVar15 = FUN_00493ba6(param_2);
      FUN_0040ff60(2, uVar15);
      FUN_004271e8(4, DAT_00628420 + 0x1a8 +
                  ((DAT_006554fc[DAT_0064c6a6[param_2 * 0x594] * 0x30] === 0) ? -4 : 0));
      FUN_0040bbb0();
      FUN_0040bbe0(s_TAKECIV_00626fd4);
      local_14 = FUN_0059a791(0, 2);
      if ((bVar4) && (local_14 < 2)) {
        local_14 = 8;
      }
      if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
        local_14 = 9;
      }
      FUN_0040ff30(local_14);
      if (local_14 === 9) {
        local_70 = FUN_00410030(DAT_00679640,
                                DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
      } else {
        local_70 = FUN_00421ea0(DAT_00679640);
      }
      if (local_70 === 1) {
        FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
        iVar13 = FUN_004bdb2c(param_2, DAT_0064b124);
        FUN_00456f20(param_2, param_1, -(((iVar13 * 3) / 2) | 0));
        iVar13 = DAT_0064b10c;
        DAT_0064b124 = DAT_0064b10c;
        DAT_0064b10c = -1;
        if (((DAT_0064b134 === 0) || (DAT_0064b0f8 === 0)) || (iVar13 < 0)) {
          bVar5 = true;
        } else {
          FUN_004271e8(1, DAT_00627684[iVar13 * 0x10]);
          FUN_004941ee(4);
          iVar13 = FUN_00421ea0(s_OVERABARREL_00626fdc);
          if (iVar13 === 1) {
            FUN_004bf05b(param_2, DAT_0064b124, param_1, 0, 0);
            iVar13 = FUN_004bdb2c(param_2, DAT_0064b124);
            FUN_00456f20(param_2, param_1, -(((iVar13 * 3) / 2) | 0));
            DAT_0064b124 = -1;
            bVar5 = true;
          }
        }
        if (bVar5) {
          DAT_0064b0f8 = 0;
          if (DAT_0064b138 !== 0) {
            FUN_00467825(param_2, param_1, 2);
          }
          if (DAT_0064c6bf[param_2 * 0x594] !== 0) {
            DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] - 1) & 0xFF;
          }
        }
      } else if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) {
        FUN_00456f20(param_2, param_1,
                     (u8(DAT_0064c6be[param_1 * 0x594]) + 2) -
                     s8(DAT_0064c6e8[param_2 * 0x594 + param_1]));
        DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] + 1) & 0xFF;
      }
      FUN_00458a3b(param_1, param_2);
      DAT_0064b118 = 999;
    }

    // Begone / expulsion block
    if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0) &&
       ((((DAT_0064b0f8 !== 0 || (0x31 < DAT_0064b114)) || ((DAT_0064b130 !== 0 && (DAT_0064b12c !== 0))))
         && (!bVar5)))) {
      FUN_00458df9(param_1, param_2, param_3, param_4);
      if (DAT_00626a30 === 0) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_004941ee(4);
      if (DAT_0064b118 === 999) {
        FUN_00410030(s_BEGONE0_00626fe8,
                     DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
      } else {
        FUN_00410030(s_BEGONE1_00626ff0,
                     DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
      }
      FUN_00467ef2(param_2, param_1);
      DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
      if ((DAT_0064b130 !== 0) && (3 < DAT_00655b08)) {
        DAT_0064b0e8 = 1;
      }
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    // local_34 adjustment
    if ((local_34 === 0) || (DAT_0064b0f8 === 0)) {
      local_34 = 0;
    } else {
      local_34 = 1;
    }
    if (local_34 !== 0) {
      DAT_0064b0f8 = 0;
    }

    // Offer war provocation check
    if ((bVar17) && (!bVar5) && (DAT_0064b118 === 999) &&
        DAT_0064b0f8 === 0 &&
        (iVar13 = FUN_004679ab(DAT_0064b114),
         ((-(DAT_0064b13c === 0 ? 1 : 0) & 2) + 2) < iVar13) &&
        (iVar13 = FUN_00453e51(param_1, 6), iVar13 === 0) &&
        (iVar13 = FUN_00453e51(param_1, 0x18), iVar13 === 0)) {
      uVar14 = _rand();
      uVar16 = uVar14 >> 31;
      if (u8(DAT_0064c6b5[param_2 * 0x594]) <
          (6 - (((uVar14 ^ uVar16) - uVar16) & 1 ^ uVar16) - uVar16)) {
        DAT_0064b0f8 = 1;
      }
    }

    // Provoke / declare war
    if (((DAT_0064b0f8 !== 0) && (0x32 < DAT_0064b118)) &&
       (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) !== 0 ||
        (((iVar13 = FUN_00467af0(param_2, param_1), iVar13 === 0 && (0 < DAT_0064b108)) &&
         ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 1) === 0)))))) {
      FUN_00458df9(param_1, param_2, param_3, param_4);
      if (DAT_00626a30 === 0) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_0040bbb0();
      FUN_004941ee(4);
      FUN_0040bbe0(s_PROVOKE_00626ff8);
      uVar15 = FUN_0059a791(0, 2);
      FUN_0040ff30(uVar15);
      FUN_00467825(param_2, param_1, 0x2000);
      iVar13 = FUN_00467904(param_2, param_1);
      if (iVar13 < 0x4b) {
        FUN_00467933(param_2, param_1, 0x4b);
      }
      FUN_00410030(DAT_00679640, DAT_00644e48, 0);
      DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    if ((DAT_0064b0f8 !== 0) && (DAT_0064b118 === 999)) {
      if (DAT_00626a30 === 0) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_004941ee(4);
      FUN_00467825(param_2, param_1, 0x2000);
      iVar13 = FUN_00467904(param_2, param_1);
      if (iVar13 < 0x4b) {
        FUN_00467933(param_2, param_1, 0x4b);
      }
      FUN_00410030(s_REJECT0_00627000, DAT_00644e48, 0);
      DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    if ((DAT_0064b0f8 !== 0) &&
       (((DAT_0064b108 < 0 || ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 1) !== 0)) ||
        (param_5 !== 0)))) {
      FUN_00458df9(param_1, param_2, param_3, param_4);
      if (DAT_00626a30 === 0) {
        FUN_00458a3b(param_1, param_2);
      }
      FUN_004941ee(4);
      FUN_00467825(param_2, param_1, 0x2000);
      iVar13 = FUN_00467904(param_2, param_1);
      if (iVar13 < 0x4b) {
        FUN_00467933(param_2, param_1, 0x4b);
      }
      FUN_00410030(0x627008, DAT_00644e48, 0);
      DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    if (DAT_0064b0f8 !== 0) {
      goto_LAB_00463d3b = true;
    }
  }

  if (!goto_LAB_00463d3b) {
    // Accursed UN / walls check
    if (((DAT_0064b128 !== 0) && ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0)) &&
       (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)) {
      FUN_004941ee(4);
      iVar13 = FUN_00453e51(param_1, 6);
      if (iVar13 === 0) {
        FUN_00421ea0(s_ACCURSEDUN_00627020);
      } else {
        FUN_00421ea0(s_ACCURSEDWALL_00627010);
      }
    }

    // Alliance proposal
    if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) !== 0) &&
        ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) && (DAT_0064b11c === 0)) {
      local_44 = 0;
      for (local_6c = 1; local_6c < 8; local_6c = local_6c + 1) {
        if ((DAT_0064c6c0[local_6c * 4 + param_1 * 0x594] & 8) !== 0) {
          local_44 = local_44 + 1;
        }
      }
      let bVar3_local;
      if ((u8(DAT_00655c22[param_1]) < 6) && (u8(DAT_00655c22[param_2]) < 6)) {
        bVar3_local = true;
      } else {
        bVar3_local = false;
      }
      if (((bVar3_local) && (DAT_0064b104 < 1)) && (200 < DAT_00655af8)) {
        bVar2 = 8;
        for (local_6c = 1; local_6c < 8; local_6c = local_6c + 1) {
          if (((((param_2 !== local_6c) && (param_1 !== local_6c)) &&
               (((u8(DAT_00655c22[param_2]) <= u8(DAT_00655c22[local_6c])) &&
                (((u8(DAT_00655c22[param_1]) <= u8(DAT_00655c22[local_6c])) &&
                 (u8(DAT_00655c22[local_6c]) <= bVar2)))))) &&
              ((DAT_0064c6c0[local_6c * 4 + param_1 * 0x594] & 1) !== 0)) &&
             (((DAT_0064c6c1[local_6c * 4 + param_1 * 0x594] & 0x20) === 0 &&
              ((DAT_0064c6c0[local_6c * 4 + param_2 * 0x594] & 0x2008) === 0)))) {
            DAT_0064b104 = local_6c;
            bVar2 = u8(DAT_00655c22[local_6c]);
          }
        }
      }
      if ((DAT_0064b104 < 1) || ((DAT_0064c6c0[param_1 * 0x594 + DAT_0064b104 * 4] & 0xe) === 0)) {
        bVar4 = false;
      } else {
        bVar4 = true;
      }
      let _cond_a = (DAT_0064b0ec !== 0 || bVar3_local || bVar4) &&
                    (1 < DAT_0064b140 || bVar3_local) &&
                    (local_44 === 0 && (DAT_0064b114 < 0x19 || (DAT_0064b114 < 0x32 && bVar4))) &&
                    (bVar4 || bVar6 || bVar3_local) &&
                    ((u8(DAT_0064c6be[param_1 * 0x594]) - s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) < 4) &&
                    ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 2) === 0 && DAT_0064b0f4 < 2) &&
                    (u8(DAT_00655c22[param_1]) < 6 || u8(DAT_00655c22[param_2]) < 5);
      if (_cond_a) {
        iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4);
        _cond_a = iVar13 !== 0;
      }
      if (_cond_a) {
        iVar13 = FUN_00410030(s_PROPOSEALLIANCE_0062702c,
                              DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
        _cond_a = iVar13 === 0;
      }
      if (_cond_a) {
        bVar3 = true;
        if (-1 < DAT_0064b104) {
          bVar3 = false;
          uVar15 = FUN_00493c7d(DAT_0064b104);
          FUN_0040ff60(4, uVar15);
          FUN_004941ee(3);
          iVar13 = FUN_00421ea0(s_PERHAPSSOLIDARITY_0062703c);
          if (iVar13 === 1) {
            FUN_0045ac71(param_1, DAT_0064b104, param_2);
            DAT_0064c6c0[DAT_0064b104 * 4 + param_2 * 0x594] =
                 DAT_0064c6c0[DAT_0064b104 * 4 + param_2 * 0x594] | 0x80800;
            DAT_0064b104 = -1;
            bVar3 = true;
          } else {
            FUN_00456f20(param_2, param_1, 10);
            FUN_00458a3b(param_1, param_2);
            if (((DAT_0064b0ec === 0) ||
                (2 < (u8(DAT_0064c6be[param_1 * 0x594]) -
                      s8(DAT_0064c6e8[param_2 * 0x594 + param_1])))) ||
               (0x19 < DAT_0064b114)) {
              bVar3 = false;
              FUN_004941ee(4);
              FUN_00421ea0(s_PERHAPSDIDNTPROVE_00627050);
            }
          }
        }
        if (bVar3) {
          FUN_0045a535(param_1, param_2);
          FUN_00458a3b(param_1, param_2);
        }
        bVar8 = true;
      }
    }

    // Ceasefire proposal
    if (((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) &&
       (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)) {
      uVar15 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar15);
      if (bVar5) {
        local_70 = FUN_00410030(s_GRANTCEASE_00627064, DAT_00647748, 0);
      } else if ((DAT_0064b128 === 0) && (local_34 === 0)) {
        uVar15 = FUN_00410070(param_2);
        FUN_0040ff60(1, uVar15);
        local_70 = FUN_00410030(s_PROPOSECEASE_0062707c, DAT_00647748, 0);
      } else {
        local_70 = FUN_00410030(s_WALLCEASE_00627070, DAT_00647748, 0);
      }
      if (local_70 !== 0) {
        iVar13 = FUN_00453e51(param_2, 6);
        if ((iVar13 === 0) && (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 === 0)) {
          iVar13 = FUN_0055bef9(param_1, param_2);
          if (iVar13 === 0) {
            FUN_0045fd67(param_1, param_2);
          } else {
            FUN_00410030(s_OVERRULECEASE_006270a8, DAT_00647748, 0);
            local_70 = 0;
            bVar7 = true;
          }
        } else {
          uVar15 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar15);
          iVar13 = FUN_00453e51(param_2, 6);
          if (iVar13 === 0) {
            FUN_00410030(s_UNOVERCEASE_0062709c, DAT_00647748, 0);
          } else {
            FUN_00410030(s_WALLOVERCEASE_0062708c, DAT_00647748, 0);
          }
          local_70 = 0;
          bVar7 = true;
        }
      }
      local_50 = (u8(DAT_0064c6be[param_1 * 0x594]) -
                 s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) + 1;
      if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) {
        local_50 = local_50 * 2;
      }
      if (local_70 !== 0) {
        if (local_50 === 1 || local_50 - 1 < 0) {
          local_78 = 0;
        } else {
          local_78 = _rand();
          local_78 = local_78 % local_50;
        }
        if (local_78 === 0) {
          if (((local_70 !== 0) && (3 < DAT_0064b0ec)) && (-1 < DAT_0064b144)) {
            FUN_004271e8(1, DAT_00627684[DAT_0064b144 * 0x10]);
            FUN_004941ee(4);
            iVar13 = FUN_00410030(s_GIVECIV_006270b8, DAT_00647748, 0);
            if (iVar13 !== 0) {
              local_70 = 0;
              FUN_004bf05b(param_1, DAT_0064b144, param_2, 0, 0);
              bVar10 = true;
            }
          }
          if (local_70 !== 0) {
            local_14 = FUN_005adfa0(DAT_0064b0ec * 2 + -4, 0,
                                    (DAT_0064c6a2[param_2 * 0x594] / 0x32) | 0);
            local_14 = local_14 * 0x32;
            iVar13 = FUN_00453e51(param_2, 6);
            if ((iVar13 !== 0) || (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 !== 0)) {
              local_14 = (local_14 / 2) | 0;
            }
            if (local_14 !== 0) {
              FUN_00421da0(0, local_14);
              FUN_004941ee(4);
              iVar13 = FUN_00410030(s_GIVECASH_006270c0, DAT_00647748, 0);
              if (iVar13 !== 0) {
                DAT_0064c6a2[param_2 * 0x594] =
                     DAT_0064c6a2[param_2 * 0x594] - local_14;
                DAT_0064c6a2[param_1 * 0x594] =
                     DAT_0064c6a2[param_1 * 0x594] + local_14;
                local_70 = 0;
                FUN_0056a65e(1);
                bVar10 = true;
              }
            }
          }
          if (((local_70 !== 0) && (DAT_0064b0ec !== 0)) &&
             ((DAT_0064c708[param_2 * 0x594] < 2 &&
              ((iVar13 = FUN_00453e51(param_2, 6), iVar13 === 0 &&
               (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 === 0)))))) {
            FUN_00467580(0, DAT_0064c6a2[param_2 * 0x594]);
            FUN_004941ee(4);
            iVar13 = FUN_00410030(s_GROVEL_006270cc, DAT_00647748, 0);
            if (iVar13 !== 0) {
              local_70 = 0;
              DAT_0064c6a2[param_1 * 0x594] =
                   DAT_0064c6a2[param_1 * 0x594] +
                   DAT_0064c6a2[param_2 * 0x594];
              DAT_0064c6a2[param_2 * 0x594] = 0;
              FUN_0056a65e(1);
              bVar10 = true;
              for (local_60 = 0; local_60 < 100; local_60 = local_60 + 1) {
                iVar13 = FUN_004bd9f0(param_2, local_60);
                if (((iVar13 !== 0) && (iVar13 = FUN_004bd9f0(param_1, local_60), iVar13 === 0)) &&
                   ((DAT_0062768e[local_60 * 0x10] !== -2 ||
                    (DAT_0062768f[local_60 * 0x10] !== -2)))) {
                  FUN_004bf05b(param_1, local_60, param_2, 0, 0);
                }
              }
            }
          }
          if (local_70 === 0) {
            DAT_0064b108 = DAT_00655af8;
          }
        }
      }
      if (local_70 !== 0) {
        FUN_004941ee(4);
        FUN_00421ea0(s_CONTINUEWAR_006270e0);
        DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
        goto_LAB_00463d3b = true;
      }
      if (!goto_LAB_00463d3b) {
        bVar8 = true;
        FUN_0045a7a8(param_1, param_2);
        FUN_00458a3b(param_1, param_2);
        if (6 < (u8(DAT_0064c6be[param_1 * 0x594]) -
                 s8(DAT_0064c6e8[param_2 * 0x594 + param_1]))) {
          FUN_004941ee(4);
          FUN_00421ea0(s_WORTHLESS_006270d4);
        }
      }
    }
  }

  if (!goto_LAB_00463d3b) {
    // Peace proposal
    if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0) {
      local_10 = 3;
      if (DAT_0064c70e[param_1 * 0x594] * 2 < DAT_0064c70e[param_2 * 0x594]) {
        local_10 = 2;
      }
      if (((DAT_0064c70e[param_1 * 0x594] * 3) / 2) < DAT_0064c70e[param_2 * 0x594]) {
        local_10 = local_10 - 1;
      }
      if (DAT_0064c70e[param_2 * 0x594] < DAT_0064c70e[param_1 * 0x594]) {
        local_10 = local_10 + 1;
      }
      if (DAT_0064c70e[param_2 * 0x594] * 2 < DAT_0064c70e[param_1 * 0x594]) {
        local_10 = local_10 + 1;
      }
      if ((((DAT_0064b128 !== 0) ||
           (((bVar5 || (bVar17)) && ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 2) === 0)))) ||
          ((((DAT_0064b0ec !== 0 || (iVar13 = FUN_004679ab(DAT_0064b114), iVar13 <= local_10)) &&
            (DAT_0064b11c === 0)) &&
           (((u8(DAT_0064c6be[param_1 * 0x594]) -
              s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) + DAT_0064b0f4) <
            DAT_0064b0ec + 4)))) &&
         (iVar13 = FUN_00458df9(param_1, param_2, param_3, param_4), iVar13 !== 0)) {
        uVar15 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar15);
        local_70 = FUN_00410030(s_PROPOSEPEACE_006270ec, DAT_006409d8, 0);
        if (local_70 !== 0) {
          iVar13 = FUN_00453e51(param_2, 6);
          if ((iVar13 === 0) && (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 === 0)) {
            // LAB_00462bb9
            iVar13 = FUN_0055bef9(param_1, param_2);
            if (iVar13 === 0) {
              // LAB_00462c12
              if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x40) === 0) {
                FUN_0045fd67(param_1, param_2);
              }
            } else {
              if (bVar7) {
                uVar14 = _rand();
                uVar16 = uVar14 >> 31;
                if (((uVar14 ^ uVar16) - uVar16 & 1 ^ uVar16) === uVar16) {
                  // goto LAB_00462c12
                  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x40) === 0) {
                    FUN_0045fd67(param_1, param_2);
                  }
                } else {
                  FUN_00410030(s_OVERRULEPEACE_00627118, DAT_006409d8, 0);
                  local_70 = 0;
                }
              } else {
                FUN_00410030(s_OVERRULEPEACE_00627118, DAT_006409d8, 0);
                local_70 = 0;
              }
            }
          } else {
            if (bVar7) {
              uVar14 = _rand();
              uVar16 = uVar14 >> 31;
              if (((uVar14 ^ uVar16) - uVar16 & 1 ^ uVar16) === uVar16) {
                // goto LAB_00462bb9
                iVar13 = FUN_0055bef9(param_1, param_2);
                if (iVar13 === 0) {
                  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x40) === 0) {
                    FUN_0045fd67(param_1, param_2);
                  }
                } else {
                  FUN_00410030(s_OVERRULEPEACE_00627118, DAT_006409d8, 0);
                  local_70 = 0;
                }
              } else {
                iVar13 = FUN_00453e51(param_2, 6);
                if (iVar13 === 0) {
                  FUN_00410030(s_UNOVERPEACE_0062710c, DAT_006409d8, 0);
                } else {
                  FUN_00410030(s_WALLOVERPEACE_006270fc, DAT_006409d8, 0);
                }
                local_70 = 0;
              }
            } else {
              iVar13 = FUN_00453e51(param_2, 6);
              if (iVar13 === 0) {
                FUN_00410030(s_UNOVERPEACE_0062710c, DAT_006409d8, 0);
              } else {
                FUN_00410030(s_WALLOVERPEACE_006270fc, DAT_006409d8, 0);
              }
              local_70 = 0;
            }
          }
        }
        if (local_70 !== 0) {
          local_50 = (u8(DAT_0064c6be[param_1 * 0x594]) -
                     s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) + 1;
          if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) {
            local_50 = local_50 * 2;
          }
          if (local_50 === 1 || local_50 - 1 < 0) {
            local_7c = 0;
          } else {
            local_7c = _rand();
            local_7c = local_7c % local_50;
          }
          if (local_7c === 0) {
            local_14 = FUN_005adfa0(DAT_0064b0ec * 2 + -4, 0,
                                    (DAT_0064c6a2[param_2 * 0x594] / 0x32) | 0);
            local_14 = local_14 * 0x32;
            iVar13 = FUN_00453e51(param_2, 6);
            if ((iVar13 !== 0) || (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 !== 0)) {
              local_14 = (local_14 / 2) | 0;
            }
            if (local_14 !== 0) {
              FUN_00421da0(0, local_14);
              iVar13 = FUN_00410030(s_CASHFORPEACE_00627128, DAT_006409d8, 0);
              if (iVar13 !== 0) {
                DAT_0064c6a2[param_2 * 0x594] =
                     DAT_0064c6a2[param_2 * 0x594] - local_14;
                DAT_0064c6a2[param_1 * 0x594] =
                     DAT_0064c6a2[param_1 * 0x594] + local_14;
                local_70 = 0;
                bVar10 = true;
                FUN_0056a65e(1);
              }
            }
          }
        }
        bVar8 = true;
        if (local_70 === 0) {
          FUN_0045a6ab(param_1, param_2);
          FUN_00458a3b(param_1, param_2);
        } else {
          FUN_004941ee(4);
          FUN_00421ea0(s_NOPEACE_00627138);
        }
      }
    }

    // Farewell / greeting block
    if (((DAT_00626a30 !== 0) || (param_5 !== 0)) ||
       (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0 &&
        (((DAT_0064b0ec !== 0 || ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0)) ||
         ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 1) === 0)))))) {
      if (6 < (u8(DAT_0064c6be[param_1 * 0x594]) -
               s8(DAT_0064c6e8[param_2 * 0x594 + param_1]))) {
        local_4c = 0;
        for (local_6c = 1; local_6c < 8; local_6c = local_6c + 1) {
          if ((DAT_0064c6c0[local_6c * 4 + param_2 * 0x594] & 8) !== 0) {
            local_4c = local_4c + 1;
          }
        }
        if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) &&
           (((local_4c !== 0 || (DAT_0064b11c !== 0)) ||
            (DAT_0064c70e[param_1 * 0x594] < DAT_0064c70e[param_2 * 0x594])))) {
          DAT_0064b0e8 = 1;
        }
      }
      if (bVar17) {
        FUN_00458df9(param_1, param_2, param_3, param_4);
      }
      if (((DAT_00626a30 === 0) || (DAT_00626a34 === 0xffffffff)) && (param_5 === 0)) {
        if (DAT_0064b0e8 === 0) {
          iVar13 = FUN_00453e51(param_2, 6);
          if ((iVar13 === 0) && (iVar13 = FUN_00453e51(param_2, 0x18), iVar13 === 0)) {
            iVar13 = FUN_0055bef9(param_1, param_2);
            if (iVar13 === 0) {
              FUN_0045fd67(param_1, param_2);
            } else {
              uVar15 = FUN_00410070(param_2);
              FUN_0040ff60(1, uVar15);
              if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0) && (DAT_0064b0ec !== 0)) {
                FUN_00410030(s_SENATEPEACE_00627178, DAT_006409d8, 0);
                FUN_00467825(param_2, param_1, 4);
                DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8 + 0x10;
              }
              if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) {
                FUN_00410030(s_SENATECEASE_00627184, DAT_00647748, 0);
                FUN_00467825(param_2, param_1, 2);
                DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
              }
            }
          } else {
            uVar15 = FUN_00493c7d(param_2);
            FUN_0040ff60(1, uVar15);
            if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0) {
              if (DAT_0064b0ec !== 0) {
                iVar13 = FUN_00453e51(param_2, 6);
                if (iVar13 === 0) {
                  FUN_00410030(s_UNOVERPEACE_00627150, DAT_006409d8, 0);
                } else {
                  FUN_00410030(s_WALLOVERPEACE_00627140, DAT_006409d8, 0);
                }
                FUN_00467825(param_2, param_1, 4);
                DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8 + 0x10;
              }
              if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0) {
                iVar13 = FUN_00453e51(param_2, 6);
                if (iVar13 === 0) {
                  FUN_00410030(s_UNOVERCEASE_0062716c, DAT_00647748, 0);
                } else {
                  FUN_00410030(s_WALLOVERCEASE_0062715c, DAT_00647748, 0);
                }
                FUN_00467825(param_2, param_1, 2);
                DAT_0064ca82[param_2 * 2 + param_1 * 0x594] = DAT_00655af8;
              }
            }
          }
        }
      } else {
        if (DAT_00626a30 === 0) {
          FUN_00458a3b(param_1, param_2);
        }
        if (bVar8) {
          if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x810) === 0) ||
             (param_5 === 0)) {
            local_c = -1;
            cVar1 = -1;
            for (local_6c = 1; local_6c < 8; local_6c = local_6c + 1) {
              if ((((param_2 !== local_6c) && (param_1 !== local_6c)) &&
                  ((DAT_0064c6c1[local_6c * 4 + param_2 * 0x594] & 0x20) === 0)) &&
                 (s8(DAT_0064c6e8[param_1 * 0x594 + local_6c]) <= cVar1)) {
                local_c = local_6c;
                cVar1 = s8(DAT_0064c6e8[param_1 * 0x594 + local_6c]);
              }
            }
            if (-1 < local_c) {
              uVar15 = FUN_00493c7d(local_c);
              FUN_0040ff60(1, uVar15);
              DAT_0064c6e8[param_1 * 0x594 + local_c] =
                   (DAT_0064c6e8[param_1 * 0x594 + local_c] + 1) & 0xFF;
              FUN_0040bbb0();
              FUN_0040bbe0(s_NOTORIOUS_00627214);
              if ((DAT_0064c6c1[param_2 * 0x594 + local_c * 4] & 0x20) === 0) {
                if (DAT_0064c70e[param_1 * 0x594] < DAT_0064c70e[param_2 * 0x594]) {
                  FUN_004941ee(3);
                  FUN_0040bbe0(0x627228);
                } else {
                  FUN_004941ee(3);
                  FUN_0040bbe0(s_SMALL_0062722c);
                }
              } else {
                FUN_004941ee(4);
                FUN_0040bbe0(0x627220);
              }
              FUN_00421ea0(DAT_00679640);
            }
          }
        } else if ((DAT_0064b118 !== 999) || (bVar5)) {
          if (param_5 === 0) {
            local_14 = 0x71;
            if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0x10) === 0) {
              if (DAT_0064c70e[param_2 * 0x594] < DAT_0064c70e[param_1 * 0x594]) {
                local_14 = 0x70;
              }
              iVar13 = FUN_004679ab(DAT_0064b114);
              if ((iVar13 < 4) &&
                 ((u8(DAT_0064c6be[param_1 * 0x594]) -
                   s8(DAT_0064c6e8[param_2 * 0x594 + param_1])) < 3)) {
                local_14 = 0x70;
              }
              if (DAT_0064b0ec !== 0) {
                local_14 = 0x6f;
              }
            }
            FUN_004271e8(1, DAT_00628420 + local_14 * 4);
            uVar15 = FUN_00410070(param_1);
            FUN_0040ff60(2, uVar15);
            uVar15 = FUN_00493ba6(param_1);
            FUN_0040ff60(3, uVar15);
            uVar15 = FUN_00493b10(param_1);
            FUN_0040ff60(4, uVar15);
            FUN_004941ee(2);
            if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
              if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0) {
                FUN_00421ea0(s_WELCOME_0062720c);
              } else {
                FUN_00421ea0(s_WELCOMEPEACE_006271fc);
              }
            } else {
              FUN_00421ea0(s_WELCOMEALLY_006271f0);
            }
          } else {
            uVar15 = FUN_00493c7d(param_1);
            FUN_0040ff60(2, uVar15);
            if (s8(DAT_0064c6bf[param_2 * 0x594]) < 2) {
              FUN_004941ee(2);
              if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
                if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 4) === 0) {
                  FUN_00421ea0(s_HOWDY_006271d4);
                } else {
                  FUN_00421ea0(s_HOWDYPEACE_006271c8);
                }
              } else {
                FUN_00421ea0(s_HOWDYALLY_006271bc);
              }
            } else {
              FUN_004941ee(2);
              if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
                FUN_004941ee(3);
                FUN_00421ea0(s_DOODY_006271e8);
              } else {
                FUN_004941ee(2);
                FUN_00421ea0(s_DOODYALLY_006271dc);
              }
            }
          }
        } else {
          FUN_004941ee(4);
          if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
            if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 6) === 0) {
              FUN_00421ea0(s_ATTITUDE_006271b0);
            } else {
              FUN_00421ea0(s_ATTITUDEPEACE_006271a0);
            }
          } else {
            FUN_00421ea0(s_ATTITUDEALLY_00627190);
          }
        }

        // City request
        if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0xc) === 0) &&
           (FUN_0055bbc0(param_2, param_1), DAT_006ab5e8 !== 0)) {
          FUN_0040ff60(1, DAT_0064f360[DAT_006ab5e4 * 0x58]);
          uVar15 = FUN_00410070(param_2);
          FUN_0040ff60(2, uVar15);
          if (DAT_006ab5e4 < 2) {
            FUN_00421ea0(s_PLEASECITY_00627244);
          } else {
            FUN_00421ea0(s_PLEASECITIES_00627234);
          }
        }

        // Ally plea / brag
        if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
          local_1c = 0;
          if (0 < DAT_0064b0fc) {
            for (local_5c = 1; local_5c < 0x3f; local_5c = local_5c + 1) {
              if (((1 < DAT_0064c708[param_2 * 0x594]) <
                   u8(DAT_0064c932[param_2 * 0x594 + local_5c])) &&
                 (DAT_0064c832[local_5c * 2 + param_2 * 0x594] <
                  DAT_0064c8b2[local_5c * 2 + DAT_0064b0fc * 0x594])) {
                local_1c = local_1c + 1;
              }
            }
          }
          if (local_1c === 0) {
            if (0 < DAT_0064b100) {
              local_1c = 0;
              for (local_5c = 1; local_5c < 0x3f; local_5c = local_5c + 1) {
                if (((1 < DAT_0064c708[DAT_0064b100 * 0x594]) <
                     u8(DAT_0064c932[DAT_0064b100 * 0x594 + local_5c])) &&
                   (DAT_0064c832[local_5c * 2 + DAT_0064b100 * 0x594] <
                    DAT_0064c8b2[local_5c * 2 + param_2 * 0x594])) {
                  local_1c = local_1c + 1;
                }
              }
              if (local_1c !== 0) {
                uVar15 = FUN_00493c7d(DAT_0064b100);
                FUN_0040ff60(1, uVar15);
                FUN_004941ee(3);
                FUN_00421ea0(s_ALLYBRAG_0062725c);
              }
            }
          } else {
            uVar15 = FUN_00493c7d(DAT_0064b0fc);
            FUN_0040ff60(1, uVar15);
            FUN_004941ee(2);
            FUN_00421ea0(s_ALLYPLEA_00627250);
          }
        }

        // Negotiation loop
        do {
          if (s8(DAT_0064c6bf[param_2 * 0x594]) < 0) {
            DAT_0064c6bf[param_2 * 0x594] = 0;
          }
          iVar13 = FUN_0045fe19(param_1, param_2);
          if (iVar13 === 0) {
            bVar9 = true;
            goto_LAB_00463d3b = true;
            break;
          }
          if (iVar13 === 7) {
            FUN_0045dd7f(param_1, param_2);
          } else if (iVar13 === 8) {
            show_gift_menu(param_1, param_2);
          } else {
            iVar13 = FUN_0045b4da(param_1, param_2, iVar13);
            if (iVar13 !== 0) {
              goto_LAB_00463d3b = true;
              break;
            }
          }
          DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] + 1) & 0xFF;
          cVar1 = s8(DAT_0064c6bf[param_2 * 0x594]);
          iVar13 = FUN_00456f8b(param_1, param_2);
        } while (cVar1 < iVar13);

        if (!goto_LAB_00463d3b) {
          FUN_00458a3b(param_1, param_2);
          FUN_004941ee(3);
          if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
            FUN_00421ea0(s_PATIENCE_00627278);
          } else {
            FUN_00421ea0(s_PATIENCEALLY_00627268);
          }
        }
      }
    }
  }

  // LAB_00463d3b:
  FUN_00467750(param_2, param_1, 0x10000);
  if ((DAT_0064b0e8 === 0) ||
     ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x2008) !== 0)) {
    DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] =
         DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 0xffffffdf;
  } else {
    DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] =
         DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] | 0x20;
  }
  if (!bVar9) {
    DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] + 1) & 0xFF;
  }
  if ((bVar10) || (local_34 !== 0)) {
    while (iVar13 = FUN_00456f8b(param_1, param_2),
          s8(DAT_0064c6bf[param_2 * 0x594]) < (local_34 + iVar13)) {
      DAT_0064c6bf[param_2 * 0x594] = (DAT_0064c6bf[param_2 * 0x594] + 1) & 0xFF;
    }
  }
  FUN_0045918e();
  if (((DAT_0064b138 !== 0) && ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 2) === 0)) &&
     ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x200c) === 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar15);
    FUN_00410030(s_CEASEEXPIRE_00627284, DAT_00647748, 0);
  }
  if ((((DAT_00655b08 === 0) && ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) === 0)) &&
      (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) === 0 &&
       ((iVar13 = FUN_00453e51(DAT_006d1da0, 0x18), iVar13 === 0 &&
        (iVar13 = FUN_00453e51(DAT_006d1da0, 9), iVar13 === 0)))))) &&
     (iVar13 = FUN_004bd9f0(param_2, 0x58), iVar13 !== 0)) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(1, uVar15);
    FUN_004442a0(s_AMBASSADORS_00627290, 0x2e, 0);
    DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] =
         DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] | 0x80;
    FUN_0043060b(param_1, param_2);
  }
  if ((((DAT_00655aea & 2) !== 0) && (bVar11)) &&
     (((DAT_00626a30 !== 0 || (param_5 !== 0)) &&
      ((((DAT_00626a34 !== 0xffffffff && (4 < DAT_0064c708[param_2 * 0x594])) &&
        (u8(DAT_00655c22[param_1]) + 1 < u8(DAT_00655c22[param_2]))) &&
       ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) !== 0)))))) {
    uVar15 = FUN_00493c7d(param_2);
    FUN_0040ff60(0, uVar15);
    FUN_004190d0(PTR_s_TUTORIAL_00627678, s_SCHISM_0062729c);
  }
  _DAT_00626a28 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467580 — store_value_in_diplomacy_table
// Source: block_00460000.c @ 0x00467580, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467580(param_1, param_2) {
  DAT_0063cc30[param_1 * 4] = param_2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004675b0 — init_timer_and_atexit
// Source: block_00460000.c @ 0x004675B0, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004675b0() {
  FUN_004675ca();
  FUN_004675e9();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004675ca — init_timer
// Source: block_00460000.c @ 0x004675CA, 31 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004675ca() {
  FUN_004fa4be(50000);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004675e9 — register_cleanup_atexit
// Source: block_00460000.c @ 0x004675E9, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004675e9() {
  _atexit(FUN_00467606);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467606 — cleanup_handler
// Source: block_00460000.c @ 0x00467606, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467606() {
  FUN_004fa569();
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_00467620 — library init stub
// Source: block_00460000.c @ 0x00467620, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_00467620() {
  FUN_0046763a();
  FUN_00467654();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046763a — init_something
// Source: block_00460000.c @ 0x0046763A, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046763a() {
  FUN_0044c730();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467654 — register_cleanup_atexit_2
// Source: block_00460000.c @ 0x00467654, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467654() {
  _atexit(FUN_00467671);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467671 — cleanup_handler_2
// Source: block_00460000.c @ 0x00467671, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467671() {
  FUN_0044ca60();
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_0046768B — library init stub 2
// Source: block_00460000.c @ 0x0046768B, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_0046768B() {
  FUN_004676a5();
  FUN_004676bf();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004676a5 — init_timevec
// Source: block_00460000.c @ 0x004676A5, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004676a5() {
  FUN_005dcc10();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004676bf — register_timevec_cleanup
// Source: block_00460000.c @ 0x004676BF, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004676bf() {
  _atexit(FUN_004676dc);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004676dc — timevec_destructor
// Source: block_00460000.c @ 0x004676DC, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004676dc() {
  // _Timevec::~_Timevec — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467750 — clear_diplomacy_flags (symmetric)
// Source: block_00460000.c @ 0x00467750, 213 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467750(param_1, param_2, param_3) {
  if ((param_3 & 4) !== 0) {
    FUN_00467750(param_1, param_2, 8);
  }
  if ((param_3 & 0x2000) !== 0) {
    FUN_00467750(param_1, param_2, 0x1800);
  }
  if ((param_3 & 1) !== 0) {
    FUN_00467750(param_1, param_2, 0x2000);
  }
  DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] =
       DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & ~param_3;
  DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] =
       DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & ~param_3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467825 — set_diplomacy_flags (symmetric)
// Source: block_00460000.c @ 0x00467825, 223 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467825(param_1, param_2, param_3) {
  if ((param_3 & 8) !== 0) {
    FUN_00467825(param_1, param_2, 4);
  }
  if ((param_3 & 0xe) !== 0) {
    FUN_00467750(param_1, param_2, 0x2a60);
  }
  if ((param_3 & 0x2000) !== 0) {
    FUN_00467750(param_1, param_2, 0xe);
    param_3 = param_3 | 0x200000;
  }
  DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] =
       DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] | param_3;
  DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] =
       DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] | param_3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467904 — get_attitude_value
// Source: block_00460000.c @ 0x00467904, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467904(param_1, param_2) {
  return DAT_0064c6e0[param_1 * 0x594 + param_2];
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467933 — set_attitude_value (clamped 0-100)
// Source: block_00460000.c @ 0x00467933, 120 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467933(param_1, param_2, param_3) {
  let uVar1;

  if (((DAT_00655b02 !== 1) || ((1 << (param_1 & 0x1f) & DAT_006c31a9) === 0)) ||
     (DAT_006d1da0 === param_1)) {
    uVar1 = FUN_005adfa0(param_3, 0, 100);
    DAT_0064c6e0[param_1 * 0x594 + param_2] = uVar1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004679ab — attitude_to_level (thresholds)
// Source: block_00460000.c @ 0x004679AB, 178 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004679ab(param_1) {
  let uVar1;

  if (param_1 < 0) {
    uVar1 = 0;
  } else if (param_1 < 0xb) {
    uVar1 = 1;
  } else if (param_1 < 0x1a) {
    uVar1 = 2;
  } else if (param_1 < 0x27) {
    uVar1 = 3;
  } else if (param_1 < 0x3e) {
    uVar1 = 4;
  } else if (param_1 < 0x4b) {
    uVar1 = 5;
  } else if (param_1 < 0x5a) {
    uVar1 = 6;
  } else if (param_1 < 100) {
    uVar1 = 7;
  } else {
    uVar1 = 8;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467a5d — get_attitude_level (combined)
// Source: block_00460000.c @ 0x00467A5D, 41 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467a5d(param_1, param_2) {
  let uVar1;
  uVar1 = FUN_00467904(param_1, param_2);
  return FUN_004679ab(uVar1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467a86 — is_attitude_hostile
// Source: block_00460000.c @ 0x00467A86, 53 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467a86(param_1, param_2) {
  let iVar1;
  iVar1 = FUN_00467a5d(param_1, param_2);
  return iVar1 < 4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467abb — is_attitude_friendly
// Source: block_00460000.c @ 0x00467ABB, 53 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467abb(param_1, param_2) {
  let iVar1;
  iVar1 = FUN_00467a5d(param_1, param_2);
  return 4 < iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467af0 — is_at_war_or_willing
// Source: block_00460000.c @ 0x00467AF0, 191 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467af0(param_1, param_2) {
  let bVar1;
  let iVar2;

  if ((DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 0x20) === 0) {
    if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) === 0) {
      if ((u8(DAT_0064c6c0[param_1 * 0x594 + param_2 * 4]) & 5) === 1) {
        iVar2 = FUN_00467904(param_1, param_2);
        bVar1 = 0x31 < iVar2;
      } else {
        bVar1 = false;
      }
    } else {
      bVar1 = false;
    }
  } else {
    bVar1 = true;
  }
  return bVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467baf — relocate_units_after_alliance_break
// Source: block_00460000.c @ 0x00467BAF, 835 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467baf(param_1, param_2) {
  let iVar1, iVar2, iVar3, iVar4;
  let local_28, local_24, local_c, local_8;

  for (local_28 = 0; local_28 < DAT_00655b16; local_28 = local_28 + 1) {
    if ((DAT_0065610a[local_28 * 0x20] !== 0) &&
       (s8(DAT_006560f7[local_28 * 0x20]) === param_1)) {
      iVar1 = DAT_006560f0[local_28 * 0x20];
      iVar2 = DAT_006560f2[local_28 * 0x20];
      iVar3 = FUN_0043d07a(iVar1, iVar2, param_1, -1, param_2);
      if ((-1 < iVar3) && (s8(DAT_0064f348[iVar3 * 0x58]) === param_2)) {
        iVar3 = FUN_005b8a81(iVar1, iVar2);
        iVar4 = FUN_005b89e4(iVar1, iVar2);
        if ((iVar4 !== 0) ||
           ((DAT_0064c932[param_2 * 0x594 + iVar3] !== 0 &&
            (DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] !== 7)))) {
          if (iVar4 === 0) {
            local_24 = FUN_0043d07a(iVar1, iVar2, param_1, -1, -1);
          } else {
            local_8 = 9999;
            local_24 = -1;
            for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
              if ((((DAT_0064f394[local_c * 0x58] !== 0) &&
                   (s8(DAT_0064f348[local_c * 0x58]) === param_1)) &&
                  (iVar4 = FUN_0044263f(local_c, iVar3), iVar4 !== 0)) &&
                 (iVar4 = FUN_005ae31d(iVar1, iVar2,
                                       DAT_0064f340[local_c * 0x58],
                                       DAT_0064f342[local_c * 0x58]),
                 iVar4 < local_8)) {
                local_24 = local_c;
                local_8 = iVar4;
              }
            }
          }
          if ((-1 < local_24) &&
             (s8(DAT_006560f7[local_28 * 0x20]) === s8(DAT_0064f348[local_24 * 0x58]))) {
            FUN_005b5bab(local_28, 0);
            FUN_005b3ae0(local_28, DAT_0064f340[local_24 * 0x58],
                         DAT_0064f342[local_24 * 0x58], 1);
            if ((DAT_006d1da8 === 1) && (DAT_00655afe === local_28)) {
              DAT_0064b1b4 = DAT_0064f340[local_24 * 0x58];
              DAT_0064b1b0 = DAT_0064f342[local_24 * 0x58];
            }
            DAT_006560ff[local_28 * 0x20] = 0xff;
          }
        }
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00467ef2 — break_alliance
// Source: block_00460000.c @ 0x00467EF2, 632 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00467ef2(param_1, param_2) {
  let uVar1;
  let iVar2;

  FUN_00467750(param_1, param_2, 8);
  FUN_00467baf(param_1, param_2);
  FUN_00467baf(param_2, param_1);
  FUN_0047cf9e(DAT_006d1da0, 1);
  FUN_0040bbb0();
  FUN_0040bbe0(s_CANCELALLIANCE_0062831c);
  if (((DAT_006d1da0 === param_1) || (DAT_006d1da0 === param_2)) && (DAT_00654fa8 === 0)) {
    if (DAT_006d1da0 === param_1) {
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00410070(param_2);
      FUN_0040ff60(2, uVar1);
    } else {
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00410070(param_1);
      FUN_0040ff60(2, uVar1);
    }
    FUN_0040bbe0(0x62832c);
    FUN_00410030(DAT_00679640, DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
  } else {
    if ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) === 0 &&
        (iVar2 = FUN_00453e51(DAT_006d1da0, 0x18), iVar2 === 0) &&
        (iVar2 = FUN_00453e51(DAT_006d1da0, 9), iVar2 === 0) &&
        (DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) === 0 &&
        (iVar2 = FUN_00453e51(DAT_006d1da0, 0x18), iVar2 === 0) &&
        (iVar2 = FUN_00453e51(DAT_006d1da0, 9), iVar2 === 0) &&
        DAT_00655b07 === 0) {
      return;
    }
    if (DAT_00654fa8 === 0) {
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(1, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(2, uVar1);
      FUN_0040bbe0(0x628330);
      FUN_00410030(DAT_00679640, DAT_00648018 + ((DAT_00655b91 !== 0) - 1 & 0xffff7c80), 0);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004683f0 — list_dialog_init (UI — MFC dialog setup)
// Source: block_00460000.c @ 0x004683F0, 899 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004683f0(param_1, param_2, param_3) {
  // DEVIATION: MFC dialog list panel init (uses in_ECX this pointer, GetSystemMetrics, operator_new)
  // Sets up scrollable list panels for unit/city selection dialogs
  // In C: allocates CScrollBar and CListBox objects, sets panel rects, calls FUN_00469bdc/FUN_00468bb9
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00468797 — scroll_list_left
// Source: block_00460000.c @ 0x00468797, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00468797(param_1) {
  FUN_004687d3(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004687b5 — scroll_list_right
// Source: block_00460000.c @ 0x004687B5, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004687b5(param_1) {
  FUN_004687d3(1, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004687d3 — scroll_list_panel
// Source: block_00460000.c @ 0x004687D3, 97 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004687d3(param_1, param_2) {
  // DEVIATION: MFC dialog scroll handler (uses in_ECX this pointer via FUN_005c62ee)
  // In C: FUN_005c62ee() to get this ptr, FUN_004518d0(), stores param_2 in scroll offset, calls FUN_00468bb9
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00468834 — list_click_handler
// Source: block_00460000.c @ 0x00468834, 627 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00468834(param_1) {
  // DEVIATION: MFC list click handler (uses in_ECX this pointer via FUN_005c62ee)
  // In C: gets this ptr, subtracts 0x3fc from param_1 to get panel index, calls FUN_00468aa7 for hit test,
  // handles shift/ctrl selection, toggles selection bits, calls FUN_00468bb9 to repaint
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00468aa7 — list_hit_test
// Source: block_00460000.c @ 0x00468AA7, 274 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00468aa7(param_1, param_2, param_3) {
  // DEVIATION: MFC list hit test (uses in_ECX this pointer via FUN_005c62ee)
  // In C: computes which list row was clicked based on x/y coords and panel rect
  // Returns row index or negative error code (-1=above, -2=below, -3=left, -4=right)
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00468bb9 — repaint_list_panel
// Source: block_00460000.c @ 0x00468BB9, 1841 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00468bb9(param_1) {
  // DEVIATION: MFC list repaint (uses in_ECX this pointer via FUN_005c62ee, GDI drawing, SetRect)
  // In C: iterates visible list rows, draws unit sprites and names with colored selection highlighting
  // Calls FUN_005c0073, FUN_005c0333, FUN_005c0f57, FUN_005cd775, FUN_005cef31, etc.
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004692ea — list_sort_ascending_handler
// Source: block_00460000.c @ 0x004692EA, 219 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004692ea() {
  // DEVIATION: MFC list sort ascending handler (uses in_ECX this pointer via FUN_005c62ee)
  // In C: sets sort flag byte to 1, calls FUN_00453c80 twice, sends network msg 0xa7,
  // calls FUN_0046968b to sort, then FUN_00468bb9 to repaint
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004693c5 — list_sort_descending_handler
// Source: block_00460000.c @ 0x004693C5, 242 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004693c5() {
  // DEVIATION: MFC list sort descending handler (uses in_ECX this pointer via FUN_005c62ee)
  // In C: sets sort flag byte to 0, calls FUN_00453c40 twice, sends network msg 0xa8,
  // calls FUN_0046990a to alpha-sort, calls FUN_0046968b, then FUN_00468bb9 to repaint
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004694b7 — list_info_button_handler
// Source: block_00460000.c @ 0x004694B7, 144 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004694b7() {
  // DEVIATION: MFC list info button handler (uses in_ECX this pointer via FUN_005c62ee)
  // In C: calls FUN_00493c7d(DAT_006d1da0), FUN_00511880 for unit info dialog
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00469547 — sort_list_panel_0
// Source: block_00460000.c @ 0x00469547, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00469547() {
  FUN_0046957b(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00469561 — sort_list_panel_1
// Source: block_00460000.c @ 0x00469561, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00469561() {
  FUN_0046957b(1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046957b — sort_list_by_type
// Source: block_00460000.c @ 0x0046957B, 110 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046957b(param_1) {
  // DEVIATION: MFC list sort by type (uses in_ECX this pointer via FUN_005c62ee)
  // In C: FUN_004518d0(), FUN_0046990a(0, count-1, param_1), FUN_00468bb9(param_1)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004695e9 — sort_list_alpha_0
// Source: block_00460000.c @ 0x004695E9, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004695e9() {
  FUN_0046961d(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00469603 — sort_list_alpha_1
// Source: block_00460000.c @ 0x00469603, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00469603() {
  FUN_0046961d(1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046961d — sort_list_alphabetical
// Source: block_00460000.c @ 0x0046961D, 110 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046961d(param_1) {
  // DEVIATION: MFC list alphabetical sort (uses in_ECX this pointer via FUN_005c62ee)
  // In C: FUN_004518d0(), FUN_0046968b(0, count-1, param_1), FUN_00468bb9(param_1)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046968b — sort_list_by_type_impl
// Source: block_00460000.c @ 0x0046968B, 639 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046968b(param_1, param_2, param_3) {
  // DEVIATION: MFC list sort by unit type (uses in_ECX this pointer via FUN_005c62ee)
  // In C: bubble sort on unit list arrays at offsets 0x3f0, 0x43f8, 0x8400 from this pointer
  // Compares via DAT_0066be90 civ name strings indexed by DAT_006560f6 unit owner
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046990a — sort_list_alphabetical_impl
// Source: block_00460000.c @ 0x0046990A, 722 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046990a(param_1, param_2, param_3) {
  // DEVIATION: MFC list alphabetical sort (uses in_ECX this pointer via FUN_005c62ee)
  // In C: bubble sort on unit list arrays at offsets 0x3f0, 0x43f8, 0x8400 from this pointer
  // Compares via FUN_005b6898 unit name strings, sets DAT_0066be78=1
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00469bdc — populate_list_from_units
// Source: block_00460000.c @ 0x00469BDC, 1102 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00469bdc(param_1, param_2) {
  // DEVIATION: MFC list populate from units (uses in_ECX this pointer via FUN_005c62ee)
  // In C: iterates DAT_00655b16 units, checks ownership and visibility, populates list arrays
  // at offsets 0x3f0, 0x43f8, 0x8400. Calls FUN_005ae052, FUN_004087c0, FUN_005b89e4, FUN_005b50ad
  // then sorts via FUN_0046968b or FUN_0046990a based on DAT_0066be78
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046a740 — free_labels
// Source: block_00460000.c @ 0x0046A740, 77 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046a740() {
  if (DAT_0062841c !== 0) {
    FUN_0046ab00(DAT_0062841c);
    FUN_0046aaa0(DAT_0062841c);
    DAT_0062841c = 0;
  }
  DAT_00628424 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// load_labels_txt — load LABELS.TXT resource strings
// Source: block_00460000.c @ 0x0046A78D, 589 bytes
// ═══════════════════════════════════════════════════════════════════

export function load_labels_txt() {
  let iVar1;
  let uVar2;
  let local_c;
  let local_8;

  local_8 = -1;
  iVar1 = FUN_004a2379(s_LABELS_00628430, s_LABELS_00628428);
  if (iVar1 === 0) {
    FUN_004a23fc(1);
    DAT_00628424 = FUN_004a2534();
    DAT_0062841c = FUN_004bb870(0xde0);
    if (DAT_0062841c === 0) {
      FUN_00589ef8(-9, 4, 0, 0x378, 4);
    } else {
      DAT_00628420 = FUN_0046aad0(DAT_0062841c);
      if (DAT_00628420 === 0) {
        FUN_00589ef8(-10, 4, 0, DAT_0062841c, 0x378);
      } else {
        for (local_c = 0; local_c < DAT_00628424; local_c = local_c + 1) {
          uVar2 = FUN_004a257a();
          // DAT_00628420[local_c * 4] = uVar2; — pointer store
        }
        if (local_c < 0x378) {
          FUN_005f22d0(DAT_0064bb08, DAT_00655020);
          iVar1 = FUN_004a2379(s_LABELS_00628440, s_LABELS_00628438);
          if (iVar1 === 0) {
            FUN_004a23fc(1);
            iVar1 = FUN_004a2534();
            for (local_c = 0; local_c < DAT_00628424; local_c = local_c + 1) {
              FUN_004a23fc(1);
            }
            for (; local_c < iVar1; local_c = local_c + 1) {
              uVar2 = FUN_004a257a();
              // DAT_00628420[local_c * 4] = uVar2;
            }
          }
          if (local_c < 0x378) {
            uVar2 = FUN_00428a95('_ERROR_LABELS_TXT_');
            for (; local_c < 0x378; local_c = local_c + 1) {
              // DAT_00628420[local_c * 4] = uVar2;
            }
          }
        }
        local_8 = local_c;
      }
    }
  } else {
    FUN_00589ef8(-8, 4, 0, 0, 0);
  }
  FUN_004a2020();
  if (local_8 < 1) {
    FUN_0046a740();
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046aaa0 — free_memory_handle
// Source: block_00460000.c @ 0x0046AAA0, 28 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046aaa0(param_1) {
  FUN_005dce96(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046aad0 — lock_memory_handle
// Source: block_00460000.c @ 0x0046AAD0, 28 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046aad0(param_1) {
  return FUN_005dcdf9(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ab00 — unlock_memory_handle
// Source: block_00460000.c @ 0x0046AB00, 28 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ab00(param_1) {
  FUN_005dce29(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ab30 — get_this_pointer (returns ECX)
// Source: block_00460000.c @ 0x0046AB30, 25 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ab30() {
  return 0; // in_ECX — this pointer, no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ab49 — empty_function (no-op)
// Source: block_00460000.c @ 0x0046AB49, 22 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ab49() {
  // empty
}


// ═══════════════════════════════════════════════════════════════════
// InvalidateObjectCache — CRichEditDoc method (MFC)
// Source: block_00460000.c @ 0x0046AB5F, 35 bytes
// ═══════════════════════════════════════════════════════════════════

export function InvalidateObjectCache() {
  // DEVIATION: MFC CRichEditDoc::InvalidateObjectCache (uses this pointer at offset 0x12c0)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ab82 — remove_cache_entry
// Source: block_00460000.c @ 0x0046AB82, 107 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ab82(param_1) {
  // DEVIATION: MFC CRichEditDoc cache entry removal (uses in_ECX this pointer)
  // In C: shifts entries down in 0x18-byte cache array, decrements count at offset 0x12c0
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046abed — find_and_remove_cache_entry
// Source: block_00460000.c @ 0x0046ABED, 151 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046abed(param_1, param_2) {
  // DEVIATION: MFC find-and-remove cache entry (uses in_ECX this pointer)
  // In C: searches cache for entry matching param_1/param_2, removes via FUN_0046ab82
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ac89 — remove_cache_entries_by_id
// Source: block_00460000.c @ 0x0046AC89, 94 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ac89(param_1) {
  // DEVIATION: MFC remove cache entries by ID (uses in_ECX this pointer)
  // In C: iterates cache backwards, removes entries where offset 0x10 matches param_1
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ace7 — add_cache_entry
// Source: block_00460000.c @ 0x0046ACE7, 153 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ace7(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: MFC add cache entry (uses in_ECX this pointer)
  // In C: if count < 200, stores rect (param_3-6), param_1/param_2 in next slot, increments count
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ad85 — find_cache_entry_at_point
// Source: block_00460000.c @ 0x0046AD85, 259 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ad85(param_1, param_2, param_3, param_4) {
  // DEVIATION: MFC cache hit-test at point (uses in_ECX this pointer)
  // In C: searches cache for entry containing (param_1,param_2), returns index, optionally fills param_3/param_4
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046af70 — send_to_connections (network)
// Source: block_00460000.c @ 0x0046AF70, 305 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046af70(param_1, param_2) {
  // DEVIATION: binary network send to connections (uses in_ECX, XD_SendSecureData)
  // In C: validates param_1 range, sets sequence number, calls XD_SendSecureData, logs errors
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046b0a1 — send_broadcast (network)
// Source: block_00460000.c @ 0x0046B0A1, 124 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046b0a1(param_1) {
  // DEVIATION: binary network broadcast (uses in_ECX, XD_SendBroadcastData)
  // In C: sets sequence number, calls XD_SendBroadcastData, returns success/failure
  return true;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046b11d — send_simple_message (network)
// Source: block_00460000.c @ 0x0046B11D, 48 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046b11d(param_1, param_2) {
  FUN_0046b14d(param_1, 0, 0, 0, 0, 0, 0, 0, param_2, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046b14d — send_network_message (main dispatcher)
// Source: block_00460000.c @ 0x0046B14D, 6649 bytes
//
// Giant switch statement dispatching ~160 different network message
// types. Each case constructs a message and sends it.
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046b14d(param_1, param_2, param_3, param_4, param_5,
                             param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: binary network message dispatcher (~160 switch cases)
  // In C: giant switch on param_1, each case constructs a binary message struct
  // via FUN_0046d5a0/FUN_0046d5f0/FUN_0046d6a0/FUN_0046d720/etc., then sends
  // via FUN_0046af70 (point-to-point) or FUN_0046b0a1 (broadcast).
  // Some cases have side effects (DAT_006c9088++, DAT_00654fb0 updates for cases 0x30/0x31).
  // Not relevant for game logic transpilation — uses binary network protocol.
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d5a0 — init_message_header_simple
// Source: block_00460000.c @ 0x0046D5A0, 55 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d5a0(param_1) {
  // DEVIATION: init network message header (uses in_ECX this pointer)
  // In C: sets header magic 0x66606660, stores param_1 as msg type, size=0x10
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d5f0 — init_message_with_name
// Source: block_00460000.c @ 0x0046D5F0, 141 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d5f0(param_1, param_2) {
  // DEVIATION: init network message with name (uses in_ECX this pointer)
  // In C: calls FUN_0046d6a0(0), sets msg type, copies name strings, size=0x74
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d6a0 — init_message_extended
// Source: block_00460000.c @ 0x0046D6A0, 94 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d6a0(param_1) {
  // DEVIATION: init extended network message (uses in_ECX this pointer)
  // In C: calls FUN_0046d5a0, copies name string, size=0x30
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d720 — init_join_message
// Source: block_00460000.c @ 0x0046D720, 65 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d720() {
  // DEVIATION: init join network message (uses in_ECX this pointer)
  // In C: calls FUN_0046d5f0(2,...), FUN_0059c31f, size=0x198
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d780 — init_chat_message
// Source: block_00460000.c @ 0x0046D780, 169 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d780(param_1) {
  // DEVIATION: init chat network message (uses in_ECX this pointer)
  // In C: calls FUN_0046d5a0(0x2f), copies chat text, size=100
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d860 — init_rules_data_message
// Source: block_00460000.c @ 0x0046D860, 45 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d860() {
  // DEVIATION: init rules data network message (uses in_ECX, size=0x280)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d8a0 — init_scenario_message
// Source: block_00460000.c @ 0x0046D8A0, 45 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d8a0() {
  // DEVIATION: init scenario network message (uses in_ECX, size=0x21c)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d8e0 — init_save_data_message
// Source: block_00460000.c @ 0x0046D8E0, 60 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d8e0() {
  // DEVIATION: init save data network message (uses in_ECX, FUN_0059c31f, size=0x134)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d930 — init_turn_message
// Source: block_00460000.c @ 0x0046D930, 56 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d930(param_1) {
  // DEVIATION: init turn network message (uses in_ECX, size=0x14)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046d980 — display_network_popup
// Source: block_00460000.c @ 0x0046D980, 148 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046d980(param_1, param_2) {
  // DEVIATION: display network popup (Win32 UI — FUN_005bb3f0, FUN_005c041f, FUN_005c0d69)
  // In C: creates popup window with DAT_00628420 label text, calls FUN_00484d52, FUN_00450400
}


// ═══════════════════════════════════════════════════════════════════
// load_civ2_art_0046da40 — load_civ2_art (video/DLL loading)
// Source: block_00460000.c @ 0x0046DA40, 851 bytes
// ═══════════════════════════════════════════════════════════════════

export function load_civ2_art_0046da40() {
  // DEVIATION: Win32 video/art DLL loading (MFC CPropertySheet, SEH frames, FUN_005dd010, FUN_005c5f20)
  // In C: loads civ2art.dll, plays opening.avi, initializes graphics subsystem
  // Uses CPropertySheet::EnableStackedTabs, COleControlSite::SetDlgCtrlID, SEH cleanup chain
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046dd98 — destructor_stub_1
// Source: block_00460000.c @ 0x0046DD98, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046dd98() {
  // _Timevec destructor — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046dda4 — destructor_stub_2
// Source: block_00460000.c @ 0x0046DDA4, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046dda4() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ddb0 — destructor_stub_3
// Source: block_00460000.c @ 0x0046DDB0, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ddb0() {
  FUN_0044ca60();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ddbc — destructor_stub_4
// Source: block_00460000.c @ 0x0046DDBC, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ddbc() {
  FUN_005dd1a0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ddd2 — seh_frame_restore
// Source: block_00460000.c @ 0x0046DDD2, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ddd2() {
  // SEH frame restore — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046dde0 — video_timer_callback
// Source: block_00460000.c @ 0x0046DDE0, 69 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046dde0() {
  if (DAT_0062af14 !== 0) {
    InvalidateObjectCache();
    DAT_0062af10 = 1;
    FUN_0046e020(0x6b, 0, 1, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046de25 — video_resolution_change_handler
// Source: block_00460000.c @ 0x0046DE25, 119 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046de25(param_1) {
  if ((0xcf < param_1) && (param_1 < 0xd3)) {
    FUN_0046e020(0x6b, 0, 1, 0);
    DAT_0062af10 = 1;
    if (DAT_0062af14 !== 0) {
      InvalidateObjectCache();
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046dea1 — invalidate_video_cache
// Source: block_00460000.c @ 0x0046DEA1, 43 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046dea1() {
  if (DAT_0062af14 !== 0) {
    InvalidateObjectCache();
  }
}


// ═══════════════════════════════════════════════════════════════════
// EnableStackedTabs — CPropertySheet method (MFC)
// Source: block_00460000.c @ 0x0046DFF0, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function EnableStackedTabs(param_1) {
  // DEVIATION: MFC CPropertySheet::EnableStackedTabs (uses this pointer at offset 0x114)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e020 — play_sound_effect
// Source: block_00460000.c @ 0x0046E020, 601 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e020(param_1, param_2, param_3, param_4) {
  // DEVIATION: play sound effect (Win32 sndPlaySoundA, file I/O)
  // In C: stores params, looks up sound name from s_AIRCOMBT table, resolves .WAV path,
  // plays via sndPlaySoundA or FUN_005d6038, calls FUN_00407ff0
  DAT_0066bfc4 = param_1;
  DAT_0066bfc0 = param_2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e287 — delay_with_animation
// Source: block_00460000.c @ 0x0046E287, 109 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e287(param_1) {
  // DEVIATION: timer-based animation delay (Win32 timeGetTime busy-wait loop)
  // In C: loops calling FUN_00407ff0 + timeGetTime until (param_1 * 0x32 / 3) ms elapsed
  // Also calls FUN_0047e94e(1,0) if DAT_00655b02 > 2
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e2f4 — trigger_music_change
// Source: block_00460000.c @ 0x0046E2F4, 44 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e2f4() {
  DAT_0062b420 = 1;
  if (DAT_0062b42c !== 0) {
    FUN_0046e6c8();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e320 — pick_and_play_music_track
// Source: block_00460000.c @ 0x0046E320, 388 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e320() {
  let local_18, local_14, local_10, local_c, local_8;

  local_8 = 0;
  while (local_8 < 10) {
    local_8 = local_8 + 1;
    local_c = FUN_005ddeff();
    if (((local_c === 0x18) || (local_c === 0x12)) || (local_c === 0xc) || (local_c === 10)) break;
  }
  if ((local_c === 1) || (local_c === -1)) {
    DAT_0062b420 = 0;
  } else {
    while (true) {
      if (((local_c === 10) || (local_c === 0x12)) || ((local_c === 0x18 || (local_c === 0xc)))) {
        if (local_c === 4 || local_c - 4 < 0) {
          local_18 = 0;
        } else {
          local_18 = _rand();
          local_18 = local_18 % (local_c - 3);
        }
        local_10 = local_18 + 4;
        DAT_0062b424 = 0;
      } else {
        if (local_c === 2 || local_c - 2 < 0) {
          local_14 = 0;
        } else {
          local_14 = _rand();
          local_14 = local_14 % (local_c - 1);
        }
        local_10 = local_14 + 2;
        DAT_0062b424 = 1;
      }
      if (local_10 !== DAT_0062b428) break;
      DAT_0062b428 = -1;
    }
    DAT_0062b420 = 0;
    DAT_0062b428 = local_10;
    DAT_0062b42c = 1;
    FUN_005ddbc7(local_10);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e4a9 — check_cd_and_init_music
// Source: block_00460000.c @ 0x0046E4A9, 190 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e4a9() {
  let iVar1;

  FUN_005de6fc(0x403120);
  iVar1 = FUN_005ddeff();
  if ((iVar1 === -1) || (iVar1 === 1)) {
    DAT_0062b420 = 0;
  } else if ((iVar1 === 10) || (((iVar1 === 0x12 || (iVar1 === 0x18)) || (iVar1 === 0xc)))) {
    DAT_0062b42c = 1;
    DAT_0062b420 = 1;
    DAT_0062b424 = 0;
  } else {
    DAT_0062b42c = 1;
    DAT_0062b420 = 1;
    DAT_0062b424 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e571 — play_specific_music_track
// Source: block_00460000.c @ 0x0046E571, 312 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e571(param_1, param_2) {
  let local_c, local_8;

  if ((DAT_00655aea & 8) === 0) {
    if (DAT_0062b420 === 0) {
      FUN_0046e6a9();
    }
  } else if ((((DAT_0062b420 !== 0) || (param_2 !== 0)) || (DAT_0062b428 !== param_1)) &&
            (DAT_0062b424 === 0)) {
    local_8 = 0;
    while (local_8 < 10) {
      local_8 = local_8 + 1;
      local_c = FUN_005ddeff();
      if (((local_c === 0x18) || (local_c === 0x12)) || ((local_c === 0xc || (local_c === 10)))) break;
    }
    if ((local_c === 1) || (local_c === -1)) {
      DAT_0062b420 = 0;
    } else {
      DAT_0062b42c = 0;
      FUN_005dde9d();
      FUN_005de6fc(0x403120);
      FUN_005ddbc7(param_1);
      DAT_0062b428 = param_1;
      DAT_0062b42c = 1;
      DAT_0062b420 = 0;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e6a9 — stop_music
// Source: block_00460000.c @ 0x0046E6A9, 31 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e6a9() {
  FUN_005dde9d();
  DAT_0062b420 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e6c8 — music_state_machine
// Source: block_00460000.c @ 0x0046E6C8, 85 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e6c8() {
  if ((DAT_00655aea & 8) === 0) {
    if (DAT_0062b420 === 0) {
      FUN_0046e6a9();
    }
  } else if (DAT_0062b420 !== 0) {
    FUN_0046e320();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e8f0 — hex_string_to_int
// Source: block_00460000.c @ 0x0046E8F0, 173 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e8f0(param_1) {
  let cVar1;
  let _C;
  let iVar2;
  let local_8 = 0;
  let idx = 0;

  while (param_1[idx] !== '\0' && idx < param_1.length) {
    cVar1 = param_1.charCodeAt(idx);
    idx = idx + 1;
    _C = FID_conflict___toupper_lk(cVar1);
    iVar2 = _isdigit(_C);
    if (iVar2 === 0) {
      if ((_C < 0x41) || (0x46 < _C)) {
        // skip rest
        while (idx < param_1.length && param_1[idx] !== '\0') {
          idx = idx + 1;
        }
      } else {
        local_8 = local_8 * 0x10 + _C - 0x37;
      }
    } else {
      local_8 = local_8 * 0x10 + _C - 0x30;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_0046E9D0 — library init stub 3
// Source: block_00460000.c @ 0x0046E9D0, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_0046E9D0() {
  FUN_0046e9ea();
  FUN_0046ea04();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046e9ea — init_gfx_module
// Source: block_00460000.c @ 0x0046E9EA, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046e9ea() {
  FUN_005c64da();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ea04 — register_gfx_cleanup
// Source: block_00460000.c @ 0x0046EA04, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ea04() {
  _atexit(FUN_0046ea21);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ea21 — gfx_cleanup_handler
// Source: block_00460000.c @ 0x0046EA21, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ea21() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// handle_palette — palette initialization (Win32 GDI)
// Source: block_00460000.c @ 0x0046EA3B, 970 bytes
// ═══════════════════════════════════════════════════════════════════

export function handle_palette() {
  // DEVIATION: Win32 GDI palette initialization (CreatePalette, GetNearestPaletteIndex, DeleteObject)
  // In C: allocates palette data, creates 32-color LOGPALETTE, maps 236 greyscale entries,
  // stores index mapping in DAT_0066c408 memory handle
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ee1e — free_palette_handle
// Source: block_00460000.c @ 0x0046EE1E, 48 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ee1e() {
  if (DAT_0066c408 !== 0) {
    DAT_0066c408 = FUN_005dce96(DAT_0066c408);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ee4e — apply_palette_to_all_players
// Source: block_00460000.c @ 0x0046EE4E, 241 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ee4e() {
  let iVar1;
  let local_c;

  iVar1 = FUN_005dcdf9(DAT_0066c408);
  if (iVar1 !== 0) {
    for (local_c = 0; local_c < 8; local_c = local_c + 1) {
      if ((local_c === 0) || (DAT_0066ca84[local_c * 0x3f0] !== 0)) {
        FUN_005c1a62(iVar1, 10, 0xec);
      }
    }
    FUN_005c1a62(iVar1, 10, 0xec);
    FUN_005c1a62(iVar1, 10, 0xec);
    FUN_005c1a62(iVar1, 10, 0xec);
    FUN_005dce29(DAT_0066c408);
    FUN_0046f18f();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046ef3f — realize_palette_for_all_players
// Source: block_00460000.c @ 0x0046EF3F, 151 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046ef3f() {
  let local_8;

  for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (DAT_0066ca84[local_8 * 0x3f0] !== 0)) {
      FUN_005bb574();
    }
  }
  FUN_005bb574();
  FUN_005bb574();
  FUN_005bb574();
  FUN_00419b80();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046efd6 — fade_out_palette
// Source: block_00460000.c @ 0x0046EFD6, 153 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046efd6() {
  let local_8;

  DAT_0062804c = 0;
  if (DAT_00638b48 !== 0) {
    FUN_005c71f3(10, 0xec, 10, DAT_0066bfd0);
    FUN_0046f18f();
    local_8 = 10;
    while (-1 < local_8) {
      FUN_005c738e(local_8);
      FUN_0046e287(1);
      local_8 = local_8 - 1;
    }
    FUN_0046f108();
    FUN_0046ee4e();
    FUN_005c72f8();
    FUN_0046f108();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046f06f — fade_in_palette
// Source: block_00460000.c @ 0x0046F06F, 153 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046f06f() {
  let local_8;

  if (DAT_00638b48 !== 0) {
    FUN_005c71f3(10, 0xec, 10, DAT_0066bfd0);
    FUN_005c738e(0);
    FUN_0046ef3f();
    FUN_0046f18f();
    local_8 = 0;
    while (local_8 < 0xb) {
      FUN_005c738e(local_8);
      FUN_0046e287(1);
      local_8 = local_8 + 1;
    }
    FUN_005c72f8();
    FUN_0046f108();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046f108 — set_palette_flags
// Source: block_00460000.c @ 0x0046F108, 135 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046f108() {
  // DEVIATION: Win32 palette flag setting (uses in_ECX via FUN_0046f440, GDI palette API)
  // In C: gets palette ptr via FUN_0046f440, sets peFlags=4 for all 256 entries,
  // calls FUN_005c6480(10, 0xec)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046f18f — realize_palette_all
// Source: block_00460000.c @ 0x0046F18F, 151 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046f18f() {
  let local_8;

  for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (DAT_0066ca84[local_8 * 0x3f0] !== 0)) {
      FUN_00408460();
    }
  }
  FUN_00408460();
  FUN_00408460();
  FUN_00408460();
  FUN_00419b80();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0046f440 — get_this_pointer_2
// Source: block_00460000.c @ 0x0046F440, 25 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0046f440() {
  return 0; // returns in_ECX — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// load_bitmap — load 640x480x256 BMP file
// Source: block_00460000.c @ 0x0046F460, 1929 bytes
// ═══════════════════════════════════════════════════════════════════

export function load_bitmap(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 BMP file loading (fopen/fread, RLE decompression, palette extraction)
  // In C: opens .BMP file, reads 14-byte header, info header, 1024-byte palette,
  // validates 640x480x8bit format, optionally reads pixel data with RLE decompression
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// write_bitmap_data — write 640x480x256 BMP file
// Source: block_00460000.c @ 0x0046FBF3, 1027 bytes
// ═══════════════════════════════════════════════════════════════════

export function write_bitmap_data(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 BMP file writing (fopen/fwrite)
  // In C: writes BMP header, info header, palette, and pixel data to file
  return 0;
}
