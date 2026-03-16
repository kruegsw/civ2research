/**
 * Civ2 MGE UI System — Binary-Extracted Reference Data (Part 2)
 * Source: civ2.exe decompilation (Ghidra)
 *
 * Covers 6 subsystems not in ui-constants.js (which has city dialog):
 *   1. Popup / Dialog Engine — @-directive parser, flags, stack, button types
 *   2. Dialog Framework — font sizing, window positioning, popup dimensions
 *   3. Government Council — 5 advisor types, panel layout, video system
 *   4. Turn Timer — hourglass icons, blink intervals, color thresholds
 *   5. Drawing Primitives — 3D border, fill, blit specifications
 *   6. Multiplayer Event Dispatch — ~100 event type catalog
 *
 * Every constant includes its binary address as a comment.
 */

// ============================================================================
// 1. POPUP / DIALOG ENGINE
// ============================================================================

// --- Popup @-Directive System ---
// Core parser: FUN_005a632a (popup_parse_text_file), 2287 bytes
// Processes game text files (GAME.TXT, KING.TXT, etc.) for all in-game dialogs.
export const POPUP_DIRECTIVES = {
  // @-directives recognized by the parser                                  // 0x005A632A
  OPTIONS:   '@OPTIONS',   // switch to options/prompt mode (mode=2)        // 0x005A632A
  PROMPT:    '@PROMPT',    // same as @OPTIONS                              // 0x005A632A
  BODY:      '@BODY',      // switch to body text mode (mode=1)             // 0x005A632A
  TITLE:     '@TITLE=',    // set popup title text                          // 0x005A632A
  BUTTON:    '@BUTTON=',   // add custom button with label                  // 0x005A632A
  COLUMNS:   '@COLUMNS=',  // set number of columns (multi-column list)     // 0x005A632A
  HEIGHT:    '@HEIGHT=',   // set item row height                           // 0x005A632A
  SMALLFONT: '@SMALLFONT', // switch to 2/3-size font                       // 0x005A632A
  X:         '@X=',        // set popup X position                          // 0x005A632A
  Y:         '@Y=',        // set popup Y position                          // 0x005A632A
  WIDTH:     '@WIDTH=',    // set popup width                               // 0x005A632A
  LENGTH:    '@LENGTH=',   // set default selection / input length           // 0x005A632A
  CHECKBOX:  '@CHECKBOX',  // enable checkbox mode (flags |= 5)             // 0x005A632A
  LISTBOX:   '@LISTBOX=',  // create listbox with N items (default 16)      // 0x005A632A
  SYSTEM:    '@SYSTEM',    // system popup flag (flags |= 0x40000)          // 0x005A632A
  DEFAULT:   '@DEFAULT=',  // set default text or selection index            // 0x005A632A
};

// --- Popup Parse Modes ---
// popup_parse_text_file internal state machine                              // 0x005A632A
export const POPUP_PARSE_MODES = {
  BODY:    1,   // body text lines → add_text_item(buf, -1, -1, -1, 0)     // 0x005A632A
  OPTIONS: 2,   // option lines → add_option or add_checkbox_option         // 0x005A632A
  DONE:    3,   // parsing complete                                         // 0x005A632A
  // Blank line advances mode (1→2→3) unless BLANK_LINE_MODE flag set
};

// --- Popup Flag Bits (main flags dword) ---
// Used throughout popup_init_controls (FUN_005a211c) and popup_paint (FUN_005a577e)
export const POPUP_FLAGS = {
  CHECKBOX_MODE:     0x00000005,  // checkbox-style item selection          // 0x005A632A
  HIDDEN:            0x00000008,  // popup hidden, skip paint               // 0x005A5F34
  PAINTED:           0x00000020,  // first paint completed                  // 0x005A577E
  HELP_PRESSED:      0x00000080,  // help button was pressed                // 0x005A3E56
  CONTROLS_INIT:     0x00000200,  // sub-controls created                   // 0x005A211C
  DIRTY:             0x00000400,  // needs repaint                          // 0x005A3C58
  GRID_MODE:         0x00001000,  // icon grid mode (not list)              // 0x005A211C
  CONFIRMED:         0x00002000,  // selection confirmed (dismiss)          // 0x005A3BAE
  ICON_MODE:         0x00004000,  // icon-list control mode                 // 0x005A211C
  EMBEDDED:          0x00010000,  // embedded in parent                     // 0x005A5F34
  SYSTEM_POPUP:      0x00040000,  // system-level popup                     // 0x005A632A
  BLANK_LINE_MODE:   0x04000000,  // blank lines add items instead of
                                  // advancing parse mode                    // 0x005A632A
};

// --- Popup Flag Bits (byte at +0x3D) ---
// Secondary flag byte used for modal behavior
export const POPUP_FLAGS_3D = {
  NO_DISMISS:        0x02,  // suppress standard dismiss                   // 0x005A211C
  DISMISSED:         0x04,  // popup has been dismissed                    // 0x005A5F34
  MINIMIZE:          0x08,  // minimize on close (don't destroy)           // 0x005A5F34
  CHECKBOX_RESULT:   0x10,  // read checkbox state for result              // 0x005A5F34
  EMBEDDED_CLIP:     0x40,  // skip border drawing for embedded popups     // 0x005A577E
};

// --- Popup Flag Bits (byte at +0x3E) ---
// Tertiary flag byte for layout
export const POPUP_FLAGS_3E = {
  FULLSCREEN:        0x01,  // fullscreen style (0x842 vs 0xC02)          // 0x005A1E28
  TAB_MODE:          0x02,  // tab-based navigation                       // 0x005A3CCA
  DUAL_PANE:         0x40,  // dual-pane layout                           // 0x005A14D2
};

// --- Popup Stack ---
// Fixed-depth stack for nested popups.
// popup_show_modal (FUN_005a5f34) checks max depth;
// popup_init_controls (FUN_005a211c) pushes/pops.
export const POPUP_STACK = {
  maxDepth:          16,     // ASSERT in popup_init_controls              // 0x005A211C
  stackBase:         'DAT_00635a58',  // popup stack array                 // 0x005A211C
  stackIndex:        'DAT_00635a9c',  // current stack depth               // 0x005A211C
  globalPopup:       'DAT_006cec84',  // active popup pointer              // 0x005A211C
  lastClickTick:     'DAT_006cec80',  // tick count of last button click   // 0x005A3E56
};

// --- Popup Struct Key Offsets ---
// Fields in the popup struct (this / in_ECX)
export const POPUP_STRUCT_OFFSETS = {
  highlightColor:    0x6C,   // selected item highlight color              // 0x005A0FEA
  fgColor:           0x94,   // foreground text color                      // 0x005A0FEA
  shadowColor:       0x98,   // shadow text color                          // 0x005A0FEA
  altFgColor:        0xA0,   // alternate foreground color                 // 0x005A0FEA
  altShadowColor:    0xA4,   // alternate shadow color                     // 0x005A0FEA
  paneClipRect0:     0x138,  // pane 0 clip rect (4 ints)                  // 0x005A1CAF
  paneClipRect1:     0x148,  // pane 1 clip rect (4 ints)                  // 0x005A1CAF
  paneHitRect0:      0x158,  // pane 0 hit-test rect                       // 0x005A1A7D
  paneHitRect1:      0x164,  // pane 1 hit-test rect                       // 0x005A1A7D
  itemListHead:      0x228,  // linked list of items                       // 0x005A14D2
  buttonTypes:       0x2AC,  // button type array (stride 8)               // 0x005A3E56
  flagsByte3D:       0x3D,   // secondary flags                            // 0x005A5F34
  flagsByte3E:       0x3E,   // tertiary flags                             // 0x005A1E28
};

// --- Popup Text Shadow ---
// Shadow drawn at (+2, +1), text at (+1, 0), then at (+0, 0)
// FUN_005a0fea (popup_draw_text_truncated) and FUN_005a577e (popup_paint)
export const POPUP_TEXT_SHADOW = {
  shadowDx: 2,               // shadow X offset from text                  // 0x005A0FEA
  shadowDy: 1,               // shadow Y offset from text                  // 0x005A0FEA
  textDx:   1,               // intermediate X offset                      // 0x005A0FEA
  textDy:   0,               // intermediate Y offset                      // 0x005A0FEA
};

// --- Popup Hit-Test Return Codes ---
// popup_hittest (FUN_005a1a7d) returns negative for out-of-bounds
export const POPUP_HITTEST_CODES = {
  ABOVE_PANE:   -1,           // y < pane.top                              // 0x005A1A7D
  BELOW_PANE:   -2,           // y >= pane.bottom                          // 0x005A1A7D
  LEFT_OF_PANE: -3,           // x < pane.left                             // 0x005A1A7D
  RIGHT_OF_PANE:-4,           // x >= pane.right                           // 0x005A1A7D
};

// --- Popup Scroll / Search Limits ---
export const POPUP_LIMITS = {
  autoScrollThreshold: 40,    // items > 40 → auto-resize scroll region    // 0x005A211C
  maxAlphaSearch:      2000,  // max items searched in alpha-key handler   // 0x005A49C1
};

// --- Popup Control ID Ranges ---
// Control IDs assigned by popup_init_controls (FUN_005a211c)
export const POPUP_CONTROL_IDS = {
  standardButtons: { base: 100 },     // 100+i                            // 0x005A211C
  radioButtons:    { base: 20 },      // 20+i                             // 0x005A211C
  tabButtons:      { base: 300 },     // 300+i                            // 0x005A3CCA
  checkboxItems:   { base: 200 },     // 200+i                            // 0x005A211C
};

// --- Popup Button Types ---
// popup_on_button_click (FUN_005a3e56) interprets button_type field
export const POPUP_BUTTON_TYPES = {
  CANCEL:   0,   // cancel / close                                         // 0x005A3E56
  HELP:     1,   // help button (flags |= 0x80)                            // 0x005A3E56
  OK:       2,   // OK / confirm                                           // 0x005A3E56
};

// --- Popup Background Styles ---
// popup_draw_background (FUN_005a5649) uses style param
export const POPUP_BG_STYLES = {
  OUTER: 1,      // tiled with DAT_00635aa0 bitmap                         // 0x005A5649
  INNER: 2,      // tiled with DAT_00635aa4 bitmap                         // 0x005A5649
};

// --- Popup Border Rendering ---
// popup_paint (FUN_005a577e) draws N nested 3D borders
export const POPUP_BORDER = {
  outerOrder: 'light_then_dark',  // raised look — top/left light          // 0x005A577E
  innerOrder: 'dark_then_light',  // sunken look — top/left dark           // 0x005A577E
  insetPerLevel: 1,               // shrink rect by 1px per border level   // 0x005A577E
};

// --- Popup Split Text ---
// popup_draw_split_text (FUN_005a1148) splits on '|' character
export const POPUP_SPLIT_TEXT = {
  separator:     '|',             // pipe character splits left/right       // 0x005A1148
  rightPadding:  4,               // right-justified part offset by 4px     // 0x005A1148
  truncPadding:  6,               // truncation margin in column width      // 0x005A0FEA
};

// --- Popup Parent Surface Stack ---
// popup_push_parent_surface (FUN_005a6c23) / popup_pop_parent_surface (FUN_005a6c45)
export const POPUP_SURFACE_STACK = {
  currentSurface: 'DAT_006359c4',   // active parent surface               // 0x005A6C23
  savedSurface:   'DAT_006359c8',   // saved parent surface                // 0x005A6C23
};


// ============================================================================
// 2. DIALOG FRAMEWORK
// ============================================================================

// --- Era / Resolution Detection ---
// init_dialog_metrics (FUN_00551fed), 269 bytes
export const ERA_THRESHOLDS = {
  highResBreakpoint: 999,    // screenWidth > 999 → high-res mode          // 0x00551FED
  lowResFontSize:    0x10,   // 16px font for screens <= 999px             // 0x00551FED
  highResFontSize:   0x18,   // 24px font for screens > 999px              // 0x00551FED
  smallFontRatio:    2/3,    // 2/3 size for @SMALLFONT                    // 0x00551FED
  fontCount:         3,      // 3 fonts created: full, 2/3, full           // 0x00551FED
  // Global variables set by init_dialog_metrics:
  screenWidthVar:    'DAT_006ab198',  // screenWidth                       // 0x00551FED
  screenHeightVar:   'DAT_006ab19c',  // screenHeight                      // 0x00551FED
  fontSizeVar:       'DAT_00633580',  // dialog_font_size                  // 0x00551FED
  highResFlagVar:    'DAT_00633584',  // 1 if high-res, 0 otherwise        // 0x00551FED
  borderVar:         'DAT_00633588',  // border thickness                  // 0x00551FED
  spacingVar:        'DAT_0063358c',  // inner spacing                     // 0x00551FED
  // Derived layout metrics:
  headerWidthFormula:  'fontHeight + 2*spacing + 2*border',                // 0x00551FED
  contentStartFormula: '2*border + 2*spacing',                             // 0x00551FED
  headerWidthVar:    'DAT_00633598',                                       // 0x00551FED
  contentStartVar:   'DAT_0063359c',                                       // 0x00551FED
  frameWidth2xVar:   'DAT_006335a0',  // SM_CXDLGFRAME * 2                // 0x00551FED
  frameHeight2xVar:  'DAT_006335a4',  // SM_CYDLGFRAME * 2                // 0x00551FED
};

// --- Dialog Title Bar ---
// dialog_paint_titlebar (FUN_00552112), 3401 bytes
export const DIALOG_TITLEBAR = {
  maxTitleLength:    0x83,    // 131 chars max (strncpy limit)              // 0x0055324C
  maxButtons:        6,       // up to 6 titlebar buttons                   // 0x00552ED2
  buttonIdBase:      1000,    // Win32 control ID = 1000 + index            // 0x00552ED2
  spriteScaleRef:    0x18,    // sprite scaling denominator (24)            // 0x00552ED2
  // Sprite scaling formula: sprW = (original_w * titlebar_h) / 0x18
  //                         sprH = (original_h * titlebar_h) / 0x18       // 0x00552ED2
  timerFormatMSS:    true,    // countdown displayed as M:SS                // 0x00552112
  titleShadowColor:  0x0A,    // palette index for title shadow             // 0x00552112
  titleMainColor:    0x1A,    // palette index for title text               // 0x00552112
};

// --- Window Position Codes ---
// calc_window_position (FUN_0055a192), 407 bytes
// 10-case switch for popup/advisor window placement
export const WINDOW_POSITION_CODES = {
  ORIGIN:        0,   // x=0 or y=0                                        // 0x0055A192
  LEFT_MARGIN:   1,   // (screenWidth - 640) / 8                            // 0x0055A192
  H_CENTER:      2,   // (screenWidth - popupWidth) / 2                     // 0x0055A192
  RIGHT_MARGIN:  3,   // screenWidth - margin - popupWidth                  // 0x0055A192
  RIGHT_ALIGN:   4,   // screenWidth - popupWidth                           // 0x0055A192
  V_ORIGIN:      5,   // y=0 (same as 0)                                    // 0x0055A192
  TOP_MARGIN:    6,   // (screenHeight - 480) / 8                           // 0x0055A192
  V_CENTER:      7,   // (screenHeight - popupHeight) / 2                   // 0x0055A192
  BOTTOM_MARGIN: 8,   // screenHeight - margin - popupHeight                // 0x0055A192
  BOTTOM_ALIGN:  9,   // screenHeight - popupHeight                         // 0x0055A192
  // Margin formula: margin = (screenDim - baseDim) / 8
  baseWidth:  640,                                                          // 0x0055A192
  baseHeight: 480,                                                          // 0x0055A192
  marginDivisor: 8,                                                         // 0x0055A192
};

// --- Popup Type Dimensions ---
// get_popup_dimensions (FUN_0055a329), 244 bytes
// Maps popup type ID to fixed width x height in pixels
export const POPUP_DIMENSIONS = [
  null,                                              // type 0: unused
  { type: 1,  width: 0x178, height: 0xE3  },        // 376 x 227          // 0x0055A329
  { type: 2,  width: 0x247, height: 0x101 },        // 583 x 257          // 0x0055A329
  { type: 3,  width: 0x247, height: 0x101 },        // (same as 2)        // 0x0055A329
  { type: 4,  width: 0x247, height: 0x101 },        //                    // 0x0055A329
  { type: 5,  width: 0x247, height: 0x101 },        //                    // 0x0055A329
  { type: 6,  width: 0x248, height: 0x102 },        // 584 x 258          // 0x0055A329
  { type: 7,  width: 0x248, height: 0x102 },        //                    // 0x0055A329
  { type: 8,  width: 0x248, height: 0x102 },        //                    // 0x0055A329
  { type: 9,  width: 0x248, height: 0x102 },        //                    // 0x0055A329
  { type: 10, width: 0x196, height: 0x102 },        // 406 x 258          // 0x0055A329
  { type: 11, width: 0x196, height: 0x102 },        //                    // 0x0055A329
  { type: 12, width: 0x196, height: 0x102 },        //                    // 0x0055A329
  { type: 13, width: 0x196, height: 0x102 },        //                    // 0x0055A329
];

// --- Dialog Create Flags ---
// dialog_create (FUN_005534bc), 2164 bytes
export const DIALOG_CREATE_FLAGS = {
  CENTER:           0x01,   // center dialog on screen                      // 0x005534BC
  MIN_WIDTH:        0x02,   // enforce minimum width                        // 0x005534BC
  MIN_HEIGHT:       0x04,   // enforce minimum height                       // 0x005534BC
  ENABLE_SCROLLBAR: 0x08,   // enable scrollbar                             // 0x005534BC
};

// --- Dialog Background Surface ---
// set_dialog_background (FUN_005520fa), 24 bytes
export const DIALOG_BACKGROUND = {
  surfaceVar: 'DAT_0063357c',  // background surface pointer               // 0x005520FA
};


// ============================================================================
// 3. DRAWING PRIMITIVES
// ============================================================================

// --- Drawing Function Address Catalog ---
// All in RENDERING.Drawing section of block_005A0000
export const DRAWING_FUNCTIONS = {
  prepare_surface:      { addr: '0x005A9780', desc: 'set DAT_00635c64 = surface' },
  draw_colored_rect:    { addr: '0x005A9798', desc: 'set_color + fill_rect(x,y,w,h)' },
  draw_hline:           { addr: '0x005A97CC', desc: 'horizontal line as 1px-tall rect (x1,x2,y,color)' },
  draw_hline_width:     { addr: '0x005A9811', desc: 'hline by width (x,y,width,color)' },
  draw_vline:           { addr: '0x005A9858', desc: 'vertical line as 1px-wide rect (x,y1,y2,color)' },
  draw_vline_height:    { addr: '0x005A989D', desc: 'vline by height (x,y,height,color)' },
  draw_rect_outline:    { addr: '0x005A98E4', desc: '4 lines forming rectangle outline (l,t,r,b,color)' },
  draw_rect_outline_wh: { addr: '0x005A9964', desc: 'outline using x,y,w,h params' },
  draw_3d_border:       { addr: '0x005A99FC', desc: 'raised 3D border: light top+left, dark bottom+right' },
  set_brush_color:      { addr: '0x005A9AA3', desc: 'set GDI brush color' },
  fill_rect_xywh:       { addr: '0x005A9ABF', desc: 'fill rect using x,y,w,h (SetRect + fill)' },
  blit_rect_to_rect:    { addr: '0x005A9AFE', desc: 'BitBlt from src rect to dst rect' },
  tile_bitmap:          { addr: '0x005A9B5D', desc: 'tile bitmap across region with wrap' },
  draw_3d_border_inset: { addr: '0x005A9CE9', desc: '3D border + InflateRect(-1,-1)' },
};

// --- 3D Border Specification ---
// draw_3d_border (FUN_005a99fc)
// Draws a single-pixel 3D border for raised/sunken appearance
export const DRAW_3D_BORDER = {
  // Top edge:    hline(left, right-1, top, light_color)                   // 0x005A99FC
  // Left edge:   vline(left, top, bottom-1, light_color)                  // 0x005A99FC
  // Bottom edge: hline(left, right-1, bottom-1, dark_color)               // 0x005A99FC
  // Right edge:  vline(right-1, top, bottom-1, dark_color)                // 0x005A99FC
  lightEdges: ['top', 'left'],      // raised appearance
  darkEdges:  ['bottom', 'right'],  // shadow appearance
  // For sunken look: swap light and dark colors
};


// ============================================================================
// 4. GOVERNMENT COUNCIL
// ============================================================================

// --- 5 Advisor Types ---
// parse_advisor_letter (FUN_00518392), get_advisor_recommendation (FUN_00518582)
export const ADVISOR_TYPES = {
  MILITARY:  0,   // letter 'M'/'m'                                        // 0x00518392
  SCIENCE:   1,   // letter 'S'/'s'                                        // 0x00518392
  TRADE:     2,   // letter 'T'/'t'                                        // 0x00518392
  FOREIGN:   3,   // letter 'F'/'f'                                        // 0x00518392
  ATTITUDE:  4,   // letter 'A'/'a'                                        // 0x00518392
  END:      -1,   // letter 'E' — end marker in script files               // 0x005179A3
};

// --- Advisor Letter Code Map ---
// council_parse_advisor_script (FUN_005179a3) parses advisor script files
export const ADVISOR_LETTER_CODES = {
  'M': 0,   // military                                                    // 0x005179A3
  'S': 1,   // science                                                     // 0x005179A3
  'T': 2,   // trade                                                       // 0x005179A3
  'F': 3,   // foreign                                                     // 0x005179A3
  'A': 4,   // attitude                                                    // 0x005179A3
  'E': -1,  // end                                                         // 0x005179A3
  'R': 'random_check',  // random check directive                          // 0x005179A3
};

// --- Advisor Recommendation Dispatch ---
// get_advisor_recommendation (FUN_00518582), 177 bytes
// Reads government type from *(DAT_00631acc + 0xE54) and dispatches
export const ADVISOR_DISPATCH = {
  0: { fn: '0x004BC480', name: 'military_advisor' },                       // 0x00518582
  1: { fn: '0x004BC8AA', name: 'science_advisor' },                        // 0x00518582
  2: { fn: '0x004BCB9B', name: 'trade_advisor' },                          // 0x00518582
  3: { fn: '0x004BCFCF', name: 'foreign_advisor' },                        // 0x00518582
  4: { fn: '0x004BD2A3', name: 'attitude_advisor' },                       // 0x00518582
  govtTypeOffset: 0xE54,   // government type read from this+0xE54         // 0x00518582
};

// --- Council Advisor Dialog Panel ---
// council_construct (FUN_00514f16)
export const COUNCIL_ADVISOR_PANEL = {
  rect: { left: 0xD0, top: 0x39, right: 0x1B1, bottom: 0x14C },
  // 0xD0=208, 0x39=57, 0x1B1=433, 0x14C=332
  // Panel size: 225 x 275 pixels                                           // 0x00514F16
  dllFile: 'civ2_mk.dll',                                                  // 0x00514F16
  globalPointer: 'DAT_00631a98',   // this pointer stored here             // 0x00514F16
};

// --- Council Render Context ---
// council_init (FUN_005151f4), 802 bytes
export const COUNCIL_RENDER = {
  surfaceSize: { width: 640, height: 480 },                                // 0x005151F4
  contextSize: { width: 297, height: 173 },                                // 0x005151F4
  contextOffset: 0x600,    // render context at this+0x600                  // 0x005151F4
  civStyleLookup: 'DAT_00655142',  // civ style for matching civId         // 0x005151F4
};

// --- Council Label Colors ---
// council_draw_label (FUN_00515999), 636 bytes
export const COUNCIL_LABEL_COLORS = {
  initialShadowColor: 0x21,   // shadow-only text (initial mode)           // 0x00515999
  activeNormalColor:  0x10,   // normal text color (active mode)           // 0x00515999
  nameTableStride:    0x18,   // stride in advisor name table              // 0x00515999
  nameTableAddr:      'DAT_0065515a',                                      // 0x00515999
};

// --- Council Advisor Background Sprite ---
// council_load_advisor_bg (FUN_00515c15), 385 bytes
export const COUNCIL_ADVISOR_BG = {
  renderSize: { width: 42, height: 64 },                                   // 0x00515C15
  paletteOffset: 'DAT_0065514e',                                           // 0x00515C15
};

// --- Council Scroll Animation ---
// council_scroll_down_anim (FUN_00515f3c), council_scroll_up_anim (FUN_00516005)
export const COUNCIL_SCROLL_ANIM = {
  down: {
    target:    0x133,   // 307px — scroll until field_6FC >= this           // 0x00515F3C
    step:      15,      // pixels per frame                                 // 0x00515F3C
    delayMs:   22,      // ms between frames (timeGetTime)                  // 0x00515F3C
    soundId:   0x6F,    // sound played on scroll start                     // 0x00515F3C
  },
  up: {
    target:    -0xAD,   // -173px — scroll until field_6FC <= this          // 0x00516005
    step:      -4,      // pixels per frame                                 // 0x00516005
  },
};

// --- Council Video Playback (Advisor Dialog) ---
// council_play_video (FUN_00515516), 1122 bytes
export const COUNCIL_VIDEO_PLAYBACK = {
  advisorSlots:   12,       // 12 advisor slots iterated                    // 0x00515516
  musicBase:      0x53,     // music index = 0x53 + offset                  // 0x00515516
  waitDurationMs: 7000,     // ms wait between advisor segments             // 0x00515516
};

// --- Government Council Video System ---
// council_video_init (FUN_00516947), 1672 bytes
export const GOVT_COUNCIL_VIDEO = {
  advisorCount:    5,              // 5 advisor panels                      // 0x00516947
  videoPath:       'civ2_video\\', // video file prefix                     // 0x00516947
  videoExtension:  '.avi',         // advisor video format                  // 0x00516947
  resultSlotOffset:0xE58,          // advisor results at this+0xE58        // 0x00516947
  cheatStrings:    ['COUNCILCHEAT0', 'COUNCILCHEAT1', 'COUNCILCHEAT2'],    // 0x00516947
  closeButtonId:   0xCA,           // close button control ID               // 0x005181D8
  panelSpacing:    0x5A,           // 90px — panel column stride            // 0x00518342
  globalPointer:   'DAT_00631acc', // this pointer stored here             // 0x0051661A
  fieldInit:       { offset: 0x46B, value: 0xB0 },                        // 0x0051661A
  buttonCheckIds:  [0xCF, 0xD3],   // button IDs that trigger invalidate   // 0x00516063
};

// --- Council Speech Rendering ---
// council_render_speech (FUN_00517dd3), 529 bytes
export const COUNCIL_SPEECH = {
  shadowColor:   0x25,     // speech text shadow color                      // 0x00517DD3
  normalColor:   0x0A,     // speech text foreground color                  // 0x00517DD3
  fontSize:      14,       // font size for speech text                     // 0x00517DD3
  maxSlots:      3,        // 3 speech text slots                           // 0x005179A3
  slotSize:      255,      // bytes per speech slot                         // 0x005179A3
  slotOffset:    0xEA8,    // speech text stored at this+0xEA8              // 0x005179A3
};

// --- Council Video Position ---
// council_position_video (FUN_00518342), 80 bytes
export const COUNCIL_VIDEO_POSITION = {
  // x = (panelWidth + 0x5A) * panelIdx + panelWidth + 1                   // 0x00518342
  panelStride: 0x5A,       // 90px stride                                  // 0x00518342
  xOffset:     1,          // +1 pixel offset                               // 0x00518342
  yOffset:     1,          // +1 pixel below panel top                      // 0x00518342
  maxPanels:   5,          // panels 0-4                                    // 0x00518342
};

// --- Government Types & Tech Prerequisites ---
// check_govt_available (FUN_0055c277), 323 bytes
export const GOVERNMENT_TYPES = {
  ANARCHY:         0,   // no tech required                                 // 0x0055C277
  DESPOTISM:       1,   // default starting government                      // 0x0055C277
  MONARCHY:        2,   // requires tech 0x36 (54 = Monarchy)               // 0x0055C277
  COMMUNISM:       3,   // requires tech 0x0F (15 = Communism)              // 0x0055C277
  FUNDAMENTALISM:  4,   // requires tech 0x1F (31 = Fundamentalism)         // 0x0055C277
  REPUBLIC:        5,   // requires tech 0x47 (71 = Code of Laws)           // 0x0055C277
  DEMOCRACY:       6,   // requires tech 0x15 (21 = Democracy)              // 0x0055C277
};

export const GOVT_TECH_PREREQUISITES = {
  2: 0x36,   // Monarchy → tech 54                                         // 0x0055C277
  3: 0x0F,   // Communism → tech 15                                        // 0x0055C277
  4: 0x1F,   // Fundamentalism → tech 31                                   // 0x0055C277
  5: 0x47,   // Republic → tech 71 (Code of Laws)                          // 0x0055C277
  6: 0x15,   // Democracy → tech 21                                        // 0x0055C277
  // Statue of Liberty (wonder 0x13 = 19) bypasses all tech requirements   // 0x0055C277
  statueOfLibertyWonderId: 0x13,                                            // 0x0055C277
  fundamentalismDisabledFlag: 'DAT_00627879',  // RULES.TXT toggle          // 0x0055C277
};

// --- Government Change Effects ---
// set_government_type (FUN_0055c066), 529 bytes
export const GOVT_CHANGE = {
  civRecordGovtOffset: 0xB5, // government type byte in civ record         // 0x0055C066
  embassyBit:          0x10, // treaty flag cleared on govt change          // 0x0055C066
  recalcNeededFlag:    0x04, // bit cleared from DAT_00655aee              // 0x0055C066
  // Production reassignment on losing Fundamentalism:
  fundamentalismProd:  8,    // Fanatics (Fundamentalism-only unit)         // 0x0055C066
  fallbackProd:        11,   // fallback when Fundamentalism lost           // 0x0055C066
  fundamentalismGovt:  4,    // govt type 4 = Fundamentalism               // 0x0055C066
};

// --- Revolution Dialog ---
// revolution_dialog (FUN_0055c3d3), 678 bytes
export const REVOLUTION_DIALOG = {
  dialogKey:       'PICKGOVT',    // GAME.TXT section key                  // 0x0055C3D3
  soundId:         0x14,          // sound played on govt change            // 0x0055C3D3
  messageKey:      'NEWGOVT',     // announcement message key              // 0x0055C3D3
  tutorialKey:     'DEMOCRATS',   // tutorial for first republic/democracy // 0x0055C3D3
  tutorialFlag:    0x20,          // bit set in DAT_00655af4               // 0x0055C3D3
  tutorialGovtMin: 5,             // trigger tutorial for govt > 4         // 0x0055C3D3
  mpEventCode:     0x9F,          // MP event for remote govt change       // 0x0055C3D3
};

// --- AI Revolution Notification ---
// ai_revolution_notification (FUN_0055c69d), 1336 bytes
export const AI_REVOLUTION = {
  revolutionFlag:      0x08,      // civ.flags bit: revolution pending     // 0x0055C69D
  notificationFlag:    0x01,      // civ.flags bit: already notified       // 0x0055C69D
  overthrownMsgKey:    'OVERTHROWN',   // first notification message       // 0x0055C69D
  changedMsgKey:       'CHANGED',      // second notification message      // 0x0055C69D
  marcoPoloWonderId:   0x18,      // 24 — Marco Polo Embassy wonder       // 0x0055C69D
  intelAgencyWonderId: 9,         // Intelligence Agency wonder            // 0x0055C69D
  // AI personality formula on govt change:
  // adjustedGovt = (newGovt < 4) ? newGovt : newGovt - 1
  // personality = 4 - (adjustedGovt >> 1)                                 // 0x0055C69D
};


// ============================================================================
// 5. TURN TIMER
// ============================================================================

// --- Turn Timer Core ---
// turn_timer_tick (FUN_0055b0fb), 459 bytes
export const TURN_TIMER = {
  tickIntervalMs:    500,     // timer fires every 500ms                    // 0x0055AF2E
  blinkToggleVar:    'DAT_006ab5ac',  // alternates 0/1 each tick          // 0x0055B0FB

  // Hourglass color thresholds (percentage of time remaining)
  redThreshold:      33,      // pct < 33 → red hourglass                   // 0x0055B0FB
  yellowThreshold:   66,      // pct < 66 → yellow hourglass                // 0x0055B0FB
  // pct >= 66 → green hourglass

  // Hourglass icon IDs (sprite indices)
  redIcon:           0x6A,    // red hourglass                               // 0x0055B0FB
  yellowIcon:        0x7A,    // yellow hourglass                            // 0x0055B0FB
  greenIcon:         0x2A,    // green hourglass                             // 0x0055B0FB
  hiddenIcon:        -1,      // hide icon on blink-off cycle                // 0x0055B0FB

  // Flash conditions: blink when in red zone OR < 30 seconds remaining
  flashThresholdSec: 30,      // forced blinking below 30 seconds            // 0x0055B0FB

  // Percentage calculation formula:
  // pct = (turn_timer_remaining * 100000) / turn_timer_total_ms            // 0x0055B0FB
  pctMultiplier:     100000,

  // Timer lifecycle function addresses
  startFn:           '0x0055AF2E',  // start_turn_timer (280 bytes)
  stopFn:            '0x0055AE80',  // stop_turn_timer (174 bytes)
  resumeFn:          '0x0055B046',  // resume_turn_timer (181 bytes)
  tickFn:            '0x0055B0FB',  // turn_timer_tick (459 bytes)
  endTurnFn:         '0x0055B2C6',  // end_turn_prompt (258 bytes)
};

// --- Timer MP Event Codes ---
// Sent via enqueue_mp_event for timer state changes
export const TIMER_MP_EVENTS = {
  END_TURN:  0x6C,   // end turn submitted with timer value                 // 0x0055B2C6
  STARTED:   0x6D,   // timer started                                       // 0x0055AF2E
  STOPPED:   0x6E,   // timer stopped                                       // 0x0055AE80
  RESUMED:   0x6F,   // timer resumed                                       // 0x0055B046
};

// --- Timer Global Variables ---
export const TIMER_GLOBALS = {
  handle:        'DAT_00633a74',   // timer handle (kill_timer target)      // 0x0055AE80
  remaining:     'DAT_00633a78',   // remaining seconds                     // 0x0055AF2E
  lastTick:      'DAT_00633a7c',   // get_tick_count() at last update       // 0x0055AF2E
  totalMs:       'DAT_00654b70',   // total timer duration in milliseconds  // 0x00554297
  savedTimer:    'DAT_00654c7e',   // saved timer value (cheat mode swap)   // 0x00554297
  pendingAction: 'DAT_0064b9bc',   // cleared when timer expires            // 0x0055B0FB
  turnDoneFlag:  'DAT_0066c988',   // 0=done, 1=counting                   // 0x0055B2C6
  displayCache:  'DAT_0066c990',   // -1 initially                          // 0x0055AF2E
};

// --- Hourglass UI Update ---
// update_hourglass_ui called from turn_timer_tick and stop_turn_timer
export const HOURGLASS_UI = {
  updateFn:       '0x0056AC67',    // update_hourglass_ui(pct, icon)        // 0x0055AE80
  resetPct:       100,             // reset to 100% on stop                  // 0x0055AE80
  resetIcon:      -1,              // hidden icon on stop                    // 0x0055AE80
};

// --- Drag Timer ---
// restart_drag_timer (FUN_0055b3fd), check_drag_timeout_mp (FUN_0055b5fa)
export const DRAG_TIMER = {
  handle:          'DAT_00633a80',   // drag timer handle                   // 0x0055B3C8
  intervalMs:      500,              // 500ms repeating timer                // 0x0055B3FD
  dragTimeoutMs:   620,              // ms before auto-cancel drag          // 0x0055B5FA
  invalidateMs:    124,              // ms before forced redraw             // 0x0055B677
  inProgressFlag:  'DAT_00633a84',   // 1 if drag active                   // 0x0055B47E
  startTimeVar:    'DAT_00633a88',   // drag start tick count               // 0x0055B47E
  sourceWindowVar: 'DAT_00633a90',   // captured window handle              // 0x0055B47E
  mpEventEnter:    0x5D,             // MP event on drag start              // 0x0055B47E
  mpEventExit:     0x5E,             // MP event on drag end                // 0x0055B515
  flushTimeoutMs:  5000,             // flush_send_buffer timeout           // 0x0055B47E
};


// ============================================================================
// 6. MULTIPLAYER EVENT DISPATCH
// ============================================================================

// --- MP Event Type Catalog ---
// dispatch_mp_event (FUN_00511ba2), 7252 bytes — ~100 event type cases
// Each event maps to a GAME.TXT section key shown via show_dialog/show_msg/show_animated
export const MP_EVENT_TYPES = {
  // ── Retirement / Game End ──
  0x00: { key: 'RETIREDIE',        desc: 'player died' },                  // 0x00511BA2
  0x01: { key: 'RETIREAI',         desc: 'player resigned to AI' },        // 0x00511BA2
  0x05: { key: null,               desc: 'end_game_scores()' },            // 0x00511BA2
  0x07: { key: 'SCENARIOENDS',     desc: 'scenario time limit' },          // 0x00511BA2
  0x08: { key: 'SCENARIOEND',      desc: 'scenario end' },                 // 0x00511BA2
  0x09: { key: 'PLANRETIRE',       desc: 'planning retirement' },          // 0x00511BA2
  0x0A: { key: 'DORETIRE',         desc: 'executing retirement' },         // 0x00511BA2

  // ── Barbarians ──
  0x02: { key: 'BARBARIANS',       desc: 'barbarian event (animated)' },   // 0x00511BA2

  // ── Global Events ──
  0x03: { key: 'GLOBALWARMING',    desc: 'global warming occurred' },      // 0x00511BA2
  0x04: { key: 'FEARWARMING',      desc: 'fear of global warming' },       // 0x00511BA2

  // ── Space Race ──
  0x06: { key: 'EAGLEHASLANDED',   desc: 'space ship arrived' },           // 0x00511BA2
  0x0B: { key: 'LAUNCHED',         desc: 'spaceship launched' },           // 0x00511BA2
  0x0C: { key: 'SPACERETURNS',     desc: 'spaceship returns' },            // 0x00511BA2
  0x0D: { key: 'SPACEDESTROYED',   desc: 'spaceship destroyed' },          // 0x00511BA2
  0x53: { key: 'SPACEMISSION',     desc: 'space mission event' },          // 0x00511BA2
  0x54: { key: 'SPACEMISSION2',    desc: 'space mission variant 2' },      // 0x00511BA2
  0x55: { key: 'SPACEMISSION3',    desc: 'space mission variant 3' },      // 0x00511BA2

  // ── City Capture / Destruction ──
  0x0E: { key: 'DESTROYED',        desc: 'civ destroyed' },                // 0x00511BA2
  0x16: { key: 'CITYCAPTURE',      desc: 'city captured (dialog)' },       // 0x00511BA2
  0x17: { key: 'CITYCAPTUREDBY',   desc: 'city captured by (dialog)' },    // 0x00511BA2
  0x18: { key: 'CAPITALCAPTURE',   desc: 'capital captured (dialog)' },    // 0x00511BA2
  0x19: { key: 'CAPITALCAPTUREDBY',desc: 'capital captured by (dialog)' }, // 0x00511BA2
  0x2E: { key: 'TOOKOVER',         desc: 'took over city + state change' },// 0x00511BA2
  0x2F: { key: 'CITYFLIPS',        desc: 'city flips to another civ' },    // 0x00511BA2
  0x58: { key: 'CITYACQUIRED',     desc: 'city acquired' },                // 0x00511BA2
  0x59: { key: 'CITYDESTROYED',    desc: 'city destroyed' },               // 0x00511BA2
  0x5A: { key: 'CITYRAZEDBY',      desc: 'city razed by' },                // 0x00511BA2
  0x5B: { key: 'CITYDESTROYEDBY',  desc: 'city destroyed by' },            // 0x00511BA2
  0x5E: { key: 'CIVILWAR',         desc: 'civil war (animated)' },         // 0x00511BA2
  0x62: { key: 'MERCDECLARE',      desc: 'mercenary declaration' },         // 0x00511BA2
  0x63: { key: 'TOOKCIV',          desc: 'took over entire civilization' }, // 0x00511BA2

  // ── Trade / Caravans ──
  0x0F: { key: 'CARAVAN',          desc: 'caravan event (animated + sound)' }, // 0x00511BA2
  0x10: { key: 'FOODCARAVAN',      desc: 'food caravan (animated + sound)' }, // 0x00511BA2
  0x2A: { key: 'TRADEROUTE',       desc: 'trade route established' },       // 0x00511BA2
  0x2B: { key: 'TRADEROUTEONLY',   desc: 'trade route only' },              // 0x00511BA2
  0x2C: { key: 'CARAVANYIELDS',    desc: 'caravan yields' },                // 0x00511BA2

  // ── Wonders ──
  0x11: { key: 'STARTWONDER',      desc: 'wonder construction started' },   // 0x00511BA2
  0x12: { key: 'WONWONDER',        desc: 'wonder completed' },              // 0x00511BA2
  0x13: { key: 'WONDEROBSOLETE',   desc: 'wonder made obsolete' },          // 0x00511BA2
  0x14: { key: 'WONDERCAPTURED',   desc: 'wonder captured' },               // 0x00511BA2
  0x15: { key: 'WONDERDESTROYED',  desc: 'wonder destroyed' },              // 0x00511BA2

  // ── Military Operations ──
  0x1A: { key: 'PARADROP',         desc: 'paradrop (animated + sound 0x3D)' }, // 0x00511BA2
  0x26: { key: 'AIRLIFT',          desc: 'airlift (animated + sound 0x3D)' },  // 0x00511BA2
  0x29: { key: 'PIRACY',           desc: 'piracy (animated)' },              // 0x00511BA2

  // ── Diplomacy ──
  0x1B: { key: 'FIRSTCONTACT',     desc: 'first contact + init embassy' },  // 0x00511BA2
  0x1C: { key: 'PARLEYREQUEST',    desc: 'parley request + diplomacy' },    // 0x00511BA2
  0x34: { key: 'AMBASSADOREXPELLED', desc: 'ambassador expelled' },         // 0x00511BA2
  0x35: { key: 'LEAVETREATY',      desc: 'leave treaty + treaty change' },  // 0x00511BA2
  0x36: { key: 'DECLAREWAR',       desc: 'declare war' },                   // 0x00511BA2
  0x37: { key: 'DECLAREWAR2',      desc: 'declare war variant' },           // 0x00511BA2
  0x38: { key: 'NUKEPACT',         desc: 'nuclear non-proliferation pact' },// 0x00511BA2
  0x39: { key: 'NUKEPACT2',        desc: 'nuclear pact variant' },          // 0x00511BA2

  // ── Espionage ──
  0x1D: { key: 'SPYTECHSTOLEN',    desc: 'tech stolen (+ sound 0x21)' },    // 0x00511BA2
  0x1E: { key: 'SABOTAGEPRODUCTION', desc: 'sabotage production' },         // 0x00511BA2
  0x1F: { key: 'MPSABOTAGEPRODUCTION', desc: 'MP sabotage production' },    // 0x00511BA2
  0x20: { key: 'SUBVERTED',        desc: 'city subverted' },                // 0x00511BA2
  0x21: { key: 'EMBASSYESTABLISHED', desc: 'embassy established' },         // 0x00511BA2
  0x22: { key: 'MPEMBASSYESTABLISHED', desc: 'MP embassy established' },    // 0x00511BA2
  0x23: { key: 'INVESTIGATE',      desc: 'investigation' },                 // 0x00511BA2
  0x27: { key: 'MBRIBEDUNIT',      desc: 'bribed unit message' },           // 0x00511BA2
  0x40: { key: 'STEALTECH',        desc: 'steal tech (animated)' },         // 0x00511BA2
  0x42: { key: 'SPYPOISONED',      desc: 'spy poisoned' },                  // 0x00511BA2
  0x56: { key: 'BRIBEUNIT',        desc: 'bribe unit (animated)' },         // 0x00511BA2
  0x57: { key: 'INCITECITY',       desc: 'incite city revolt (animated)' }, // 0x00511BA2
  0x5C: { key: 'PLANTEDNUKE',      desc: 'nuclear device planted' },        // 0x00511BA2
  0x5D: { key: 'PLANTEDNUKE2',     desc: 'nuclear device variant' },        // 0x00511BA2
  0x64: { key: 'REVEALUNITORIGINS', desc: 'intel: reveal unit origins' },   // 0x00511BA2
  0x65: { key: 'REVEALCITYINFO',   desc: 'intel: reveal city info' },       // 0x00511BA2

  // ── Nuclear Events ──
  0x24: { key: 'NUCLEARPLANT',     desc: 'nuclear plant meltdown (+ sound 0x57)' }, // 0x00511BA2
  0x25: { key: 'NUKEEXPLODED',     desc: 'nuclear explosion' },             // 0x00511BA2

  // ── Government Changes ──
  0x30: { key: 'GOVTOVERTHROWN',   desc: 'government overthrown' },         // 0x00511BA2
  0x31: { key: 'GOVTOVERTHROWN2',  desc: 'government overthrown variant' }, // 0x00511BA2
  0x32: { key: 'MPREVOLUTION',     desc: 'MP revolution' },                 // 0x00511BA2
  0x33: { key: 'MPREVOLUTION2',    desc: 'MP revolution + UI' },            // 0x00511BA2
  0x3A: { key: 'HEADSTAX',         desc: 'heads tax event' },               // 0x00511BA2
  0x3B: { key: 'NEWGOVT',          desc: 'new government + set change' },   // 0x00511BA2
  0x3C: { key: null,               desc: 'show_council(civId)' },           // 0x00511BA2

  // ── Research ──
  0x2D: { key: 'SCIENCEADVANCE',   desc: 'science advance + tech unlock' }, // 0x00511BA2
  0x3D: { key: null,               desc: 'select_next_advance("ADVANCE")' },// 0x00511BA2
  0x3E: { key: 'RESEARCHGOAL',     desc: 'research goal notification' },    // 0x00511BA2

  // ── City Growth / Events ──
  0x28: { key: 'MAQUEDUCT',        desc: 'aqueduct needed' },               // 0x00511BA2
  0x41: { key: 'CITYSIZE',         desc: 'city size change + growth UI' },  // 0x00511BA2
  0x43: { key: 'ANARCHY',          desc: 'anarchy message' },               // 0x00511BA2

  // ── Worker / Settler Actions ──
  0x44: { key: 'SETTINGUP',        desc: 'settler setting up' },            // 0x00511BA2
  0x45: { key: 'SETTINGUP2',       desc: 'settler setting up variant' },    // 0x00511BA2
  0x46: { key: 'BUILDFORT',        desc: 'build fortress' },                // 0x00511BA2
  0x47: { key: 'BUILDROAD',        desc: 'build road' },                    // 0x00511BA2
  0x48: { key: 'BUILDIRRIG',       desc: 'build irrigation' },              // 0x00511BA2
  0x49: { key: 'BUILDMINE',        desc: 'build mine' },                    // 0x00511BA2
  0x4A: { key: 'BUILDAIRBASE',     desc: 'build airbase' },                 // 0x00511BA2
  0x4B: { key: 'POLLUTION',        desc: 'clean pollution' },               // 0x00511BA2
  0x4C: { key: 'CHOPPEDFOREST',    desc: 'chopped forest' },                // 0x00511BA2
  0x4D: { key: 'CLEARSWAMP',       desc: 'clear swamp' },                   // 0x00511BA2
  0x4E: { key: 'CLEARJUNGLE',      desc: 'clear jungle' },                  // 0x00511BA2
  0x4F: { key: 'BUILDRAILROAD',    desc: 'build railroad' },                // 0x00511BA2
  0x50: { key: 'BUILDTRANSFORMATION', desc: 'terrain transformation' },     // 0x00511BA2

  // ── Goody Huts ──
  0x51: { key: 'GOODYHUT',         desc: 'goody hut discovery' },           // 0x00511BA2
  0x52: { key: 'GOODYHUT2',        desc: 'goody hut barbarian variant' },   // 0x00511BA2

  // ── Miscellaneous ──
  0x3F: { key: null,               desc: 'blank/nop case' },                // 0x00511BA2
  0x5F: { key: 'UPMINE',           desc: 'upgrade mine (animated)' },       // 0x00511BA2
  0x60: { key: 'UPYOURS',          desc: 'diplomatic insult (animated)' },  // 0x00511BA2
  0x61: { key: 'UPYOURSTOO',       desc: 'diplomatic retort (animated)' },  // 0x00511BA2
};

// --- MP Event System Infrastructure ---
// enqueue_mp_event (FUN_00511880), dispatch_mp_event (FUN_00511ba2)
export const MP_EVENT_SYSTEM = {
  enqueueFn:        '0x00511880',   // enqueue_mp_event (398 bytes)         // 0x00511880
  dispatchFn:       '0x00511BA2',   // dispatch_mp_event (7252 bytes)       // 0x00511BA2
  stringParamStore: 'DAT_0063cc48', // string params (stride 0x104)         // 0x00511880
  intParamStore:    'DAT_0063cc30', // int params                           // 0x00511880
  networkMsgType:   0x6A,           // enqueue uses msg type 0x6A           // 0x00511880
  minSaveVersion:   3,              // skip if save_format_version <= 2     // 0x00511880
  // Game logic side effects in specific event cases:
  revealUnitFlag:   'DAT_0067ab65', // set by event 0x64                   // 0x00511BA2
  revealCityFlag:   'DAT_0067ab66', // set by event 0x65                   // 0x00511BA2
  intelTechIds:     [0x0E, 0x0F],   // tech IDs 14,15 checked in 0x64/65  // 0x00511BA2
};

// --- Network Message Queue ---
// netmsg_queue_construct (FUN_00514220), netmsg_enqueue (FUN_0051438f),
// netmsg_dequeue (FUN_005149d6)
export const NETMSG_QUEUE = {
  totalSlots:    2000,               // 2000 total queue slots              // 0x00514220
  slotSize:      12,                 // 12 bytes: sender, dataPtr, size    // 0x00514220
  queueMemory:   24000,             // 2000 * 12 = 24000 bytes             // 0x00514220
  alphaRange:    { start: 0, end: 399, count: 400 },   // priority slots  // 0x00514272
  primaryRange:  { start: 400, end: 1999, count: 1600 }, // normal slots  // 0x00514272
  alphaMsgRange: { min: 0x2A, max: 0x66 },  // msg types → alpha queue    // 0x0051435F
  dequeueOrder:  'alpha first, then primary',                               // 0x005149D6
  maxAlphaWatermark:  'DAT_006ad694',                                       // 0x0051438F
  maxPrimaryWatermark:'DAT_006ad690',                                       // 0x0051438F
  devPath:       'D:\\Ss\\Franklinton\\NetMessageQueu',                     // 0x0051438F
};


// ============================================================================
// 7. CHEAT MODE FLAGS
// ============================================================================

// toggle_cheat_mode (FUN_00553ff6), toggle_cheat_multiplayer (FUN_00554297)
export const CHEAT_FLAGS = {
  cheatModeBit:    0x10,      // DAT_00655af0 ^= 0x10                       // 0x00553FF6
  extendedCheat:   0x8000,    // DAT_00655aea ^= 0x8000                     // 0x00553FF6
  scenarioMode:    0x80,      // DAT_00655af0 & 0x80 triggers scenario      // 0x00553FF6
  // Multiplayer cheat: swaps turn timer
  mpCheatTimerSave:'DAT_00654c7e',   // saved timer on cheat enable         // 0x00554297
  mpCheatTimerVar: 'DAT_00654b70',   // timer cleared on cheat enable       // 0x00554297
  // Password check: players with passwords block cheat mode
  passwordArray:   'DAT_00673d38',   // 8 player password slots             // 0x00554297
  passwordBlockMsg:['PASSWORDNOCHEAT1', 'PASSWORDNOCHEAT2'],                // 0x00554297
  // Special player modes (cheat_change_player FUN_0055560f)
  kingOfKingsValue: 0x62,     // god mode value                              // 0x0055560F
  observerValue:    99,       // observer mode value                         // 0x0055560F
  godModeFlag:      'DAT_00655b07',                                         // 0x0055560F
  observerFlag:     'DAT_00655b06',                                         // 0x0055560F
  currentPlayerVar: 'DAT_006d1da0',                                         // 0x0055560F
};
