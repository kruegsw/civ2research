/**
 * Civ2 MGE UI System — Binary-Extracted Reference Data (Part 2)
 * Source: civ2.exe decompilation (Ghidra)
 *
 * Covers 10 subsystems not in ui-constants.js (which has city dialog):
 *   1. Popup / Dialog Engine — @-directive parser, flags, stack, button types
 *   2. Dialog Framework — font sizing, window positioning, popup dimensions
 *   3. Government Council — 5 advisor types, panel layout, video system
 *   4. Turn Timer — hourglass icons, blink intervals, color thresholds
 *   5. Drawing Primitives — 3D border, fill, blit specifications
 *   6. Multiplayer Event Dispatch — ~100 event type catalog
 *   7. Cheat Mode Flags — god mode, observer, cheat toggles
 *   8. Terrain Editor — 33 terrain types, editor layout, data structures
 *   9. Game Setup Dialogs — difficulty, enemies, barbarity, rules, MP config
 *  10. Civ Selection — 21 leader entries, custom tribe, city style
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

// --- Popup Keyboard Navigation ---
// FUN_005a407f (popup_keyboard_handler), 2181 bytes
// Handles both tab-mode (flags_3E & 2) and grid-mode (flags & 0x41000 == 0x1000) navigation.
// Virtual key codes mapped to popup actions:
export const POPUP_KEYBOARD = {
  // Tab-mode keys (flags_3E & 2):
  tabNext:       [0xA2, 0xC1],   // Down / Numpad 2 — next tab item           // 0x005A407F
  tabPrev:       [0xA8, 0xC0],   // Up / Numpad 8 — previous tab item         // 0x005A407F
  tabSelect:     0xD1,           // Enter — select current tab item            // 0x005A407F
  // Grid/icon-mode keys (flags & 0x41000 == 0x1000):
  gridEnd:       [0xA1, 199],    // End / Numpad 1 — jump to last item         // 0x005A407F
  gridDown:      [0xA2, 0xC1],   // Down / Numpad 2 — move down by column     // 0x005A407F
  gridPageDown:  [0xA3, 0xC6],   // PgDn / Numpad 3 — page down               // 0x005A407F
  gridUp:        [0xA4, 0xC2],   // Up / Numpad 8 — move up by column         // 0x005A407F
  gridRight:     [0xA6, 0xC3],   // Right / Numpad 6 — move right by 1        // 0x005A407F
  gridLeft:      [0xA7, 0xC4],   // Left / Numpad 4 — move left by 1          // 0x005A407F
  gridHome:      [0xA8, 0xC0],   // Home / Numpad 7 — jump to first item      // 0x005A407F
  gridPageUp:    [0xA9, 0xC5],   // PgUp / Numpad 9 — page up                 // 0x005A407F
  gridSelect:    0xD1,           // Enter — confirm selection                  // 0x005A407F
  // Multi-column mode: Left/Right switch columns (param remapped to C0/C1)
  // In 2-column layout: gridRight → param=0xC3, gridLeft → param=0xC0
  sourceAddr: '0x005A407F',
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

  // --- Council Window Layout (FUN_00517158, 1307 bytes) ---
  // Draws border decorations, button grid, title text for council window
  windowLayout: {
    borderWidth: 'DAT_00633588',     // border thickness (used throughout)  // 0x00517158
    panelHeight: 'DAT_00633598',     // main panel height                   // 0x00517158
    panelWidth:  'DAT_0063359c',     // main panel width                    // 0x00517158
    borderColorOuter: 'DAT_00633594',// outer border palette color          // 0x00517158
    borderColorInner: 'DAT_00633590',// inner border palette color          // 0x00517158
    buttonGridColumns: 5,            // 5 advisor columns (loop < 5)        // 0x00517158
    buttonGridRows:    4,            // 4 button rows (loop < 4)            // 0x00517158
    buttonColumnStride: 0x5A,        // 90px column stride (+ panelWidth)   // 0x00517158
    buttonRowStride:    0x7A,        // 122px row stride (borderW*2 + 0x7A) // 0x00517158
    panelMargin:        0x1E,        // 30px margin from edge               // 0x00517158
    panelFillColor:     10,          // palette index 10 for panel fill     // 0x00517158
    textPanelFillColor: 0x1D,        // palette index 29 for text panel     // 0x00517158
    textPanelInset:     -2,          // InflateRect(-2,-2) for text area    // 0x00517158
    spriteResource:     0x4AC,       // DAT_00628420 + 0x4AC — title sprite // 0x00517158
    textShadowColor:    10,          // title text shadow (FUN_005c19ad)    // 0x00517158
    textForeColor:      0x1A,        // title text foreground color         // 0x00517158
    textShadowOffset:   { x: 1, y: 2 }, // shadow rendered at (+1,+2)      // 0x00517158
    textForeOffset:     { x: 0, y: 1 }, // foreground rendered at (+0,+1)  // 0x00517158
    eraSwitch:          'DAT_00628064',  // 1=ancient, 2=modern (layout order) // 0x00517158
    advisorTextAddr:    'DAT_00631b58',  // modern era advisor label text   // 0x00517158
  },
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
  // Advisor sound formula: sound = (byte)(DAT_0065514e[advisorIdx]) + 0xDC // 0x00515C15
  // Called via FUN_005bf5e1(sound, 10, 0xEC, buffer) at line 2019
  soundBase:     0xDC,           // 220 decimal — per-advisor sound base    // 0x00515C15
  soundVolume:   10,             // volume param                            // 0x00515C15
  soundParam:    0xEC,           // 3rd param to play_sound                 // 0x00515C15
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
  // Music formula: musicIdx = ((advisorLetterCode + DAT_006d1168) & 7) + 0x53
  musicBase:      0x53,     // base music index                             // 0x00515516
  musicMask:      7,        // & 7 — wraps offset to 0-7 range             // 0x00515516
  musicCivOffset: 'DAT_006d1168',  // per-civ music offset                 // 0x00515516
  waitDurationMs: 7000,     // ms wait between advisor segments             // 0x00515516

  // --- Additional constants from FUN_00515516 ---
  advisorStyleTable: 'DAT_00655142',  // civ style lookup per advisor       // 0x00515516
  advisorLetterTable:'DAT_0065514e',  // per-advisor letter code for music  // 0x00515516
  viewportRect: { left: 0, top: 0, right: 0x280, bottom: 0x1E0 },
                        // SetRect(0, 0, 640, 480) — council viewport      // 0x00515516
  blitParams:   { first: [4, 4], second: [4, 3] },
                        // thunk_FUN_005683c5 blit mode params              // 0x00515516
  closingSound: { id: 0x2712, volume: 10, param: 0xEC },
                        // FUN_005bf5e1(0x2712, 10, 0xEC, buffer)           // 0x00515516
  textColors:   { fg: 0x7C, bg: 0x81 },
                        // thunk_FUN_005baee0(0x7C, 0x81, 1, 1)            // 0x00515516
  stringId:     0x1C8,  // thunk_FUN_0040bc10(0x1C8) — label string        // 0x00515516
  fontParams:   { style: 0, size: 0x10, weight: 3 },
                        // thunk_FUN_0043c6c0(0, 16, 3)                     // 0x00515516
  bodyTextY:    0x48,   // Y offset for advisor body text                   // 0x00515516
  bodyTextWidth:0x280,  // width for body text (640px)                      // 0x00515516
  labelTextY:   0x1DC,  // Y position for bottom label                     // 0x00515516
  timerConstant:0x3C,   // thunk_FUN_0046e287(0x3C) — 60ms timer interval  // 0x00515516
  advisorTextFile: 'DAT_006558e8',  // advisor script file reference        // 0x00515516
  advisorTextKey:  'DAT_00631ab4',  // advisor text lookup key              // 0x00515516
  helpContextIds: {
    primary: 0x401A1E,  // SetDlgCtrlID help context                        // 0x00515516
    mpHelp:  0x403585,  // MP-specific help context (if DAT_00655b02 > 2)   // 0x00515516
  },
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
  // FUN_00516063: redraw range (0xCF < param_1) && (param_1 < 0xD3) — IDs 0xD0-0xD2
  redrawButtonRange: { min: 0xD0, max: 0xD2 },  // buttons that trigger redraw // 0x00516063
  comboBoxTriggers:  [0xCF, 0xD3],  // combo-box change triggers invalidate   // 0x00516063
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

// --- Council Cheat Ranges ---
// council_video_init (FUN_00516947) cheat dialog — overrides advisor recommendations
export const COUNCIL_CHEAT = {
  // COUNCILCHEAT0: select category (1-5), option 6 = change government style
  // COUNCILCHEAT1: advisor override values 1-7, category 5 limited to max 6  // 0x00516947
  advisorOverride: {
    min: 1,                      // minimum valid advisor override value       // 0x00516947
    max: 7,                      // maximum valid advisor override value       // 0x00516947
    category5Max: 6,             // category 5 (attitude) capped at 6         // 0x00516947
    // if ((0 < local_8c) && (local_8c < 8) && (iVar4 != 5 || local_8c < 7))
  },
  // COUNCILCHEAT2: government style override values 0-2                      // 0x00516947
  govtStyleOverride: {
    min: 0,                      // minimum valid government style            // 0x00516947
    max: 2,                      // maximum valid government style            // 0x00516947
    // if ((-1 < local_8c) && (local_8c < 3))
  },
  forceGovtFlag:     { offset: 0xE70, value: 1 },  // set when category 6 chosen // 0x00516947
  cheatDialogs: {
    selectCategory: 'COUNCILCHEAT0',  // pick advisor category or govt change // 0x00516947
    setOverride:    'COUNCILCHEAT1',  // set advisor recommendation override  // 0x00516947
    setGovtStyle:   'COUNCILCHEAT2',  // set government style override        // 0x00516947
  },
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

// --- Turn Timer Display Refresh ---
// timer_display_refresh (FUN_0051ea0c), 130 bytes — controls HUD timer redraw
export const TURN_TIMER_REFRESH = {
  // Cooldown between timer display refreshes: 0x961 = 2401ms
  // if (getTickCount() - DAT_006cec80 < 0x961) skip repaint                   // 0x0051EA0C
  cooldownMs:       0x961,       // 2401ms between display refreshes            // 0x0051EA0C
  redrawFlag:       0x400,       // DAT_006ad678[0xf] |= 0x400 to trigger redraw // 0x0051EA0C
  lastRefreshTime:  'DAT_006cec80',  // stored tick of last refresh             // 0x0051EA0C
  gameObjectArray:  'DAT_006ad678',  // game object — [0xf] = redraw flags      // 0x0051EA0C
  skipConditions: {
    noTimer:       'DAT_006ad698 == 0',   // timer disabled                     // 0x0051EA0C
    noActiveGame:  'DAT_006ad66c == 0',   // no active game                     // 0x0051EA0C
    invalidPlayer: 'DAT_006ad670 == -1',  // no valid current player            // 0x0051EA0C
  },
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

// --- MP Event Sound and Network Details ---
// Each entry documents the play_sound (thunk_FUN_0046e020) and net_send (thunk_FUN_0046b14d)
// calls made within dispatch_mp_event (FUN_00511ba2) for specific event cases.
export const MP_EVENT_DETAILS = {
  // sound = play_sound(soundId, ...), netMsg = net_send(msgType, ...)
  // ── Caravan/Trade ──
  0x0F: { sound: { id: 0x16, cond: 'default; 0x2A if piVar1[5]==0' },       // 0x00511BA2
          desc: 'caravan: sound = 0x16 (or 0x2A if supply)' },
  0x10: { sound: { id: 0x16, cond: 'default; 0x2A if piVar1[5]==0' },       // 0x00511BA2
          desc: 'food caravan: same sound logic as 0x0F' },
  // ── City Capture ──
  0x1B: { sound: 0x05,                                                       // 0x00511BA2
          desc: 'city capture: sound 5' },
  0x1C: { sound: 0x05,                                                       // 0x00511BA2
          desc: 'city captured by ally: sound 5' },
  0x1D: { sound: 0x05,                                                       // 0x00511BA2
          desc: 'city lost by ally: sound 5' },
  0x1E: { sound: 0x05,                                                       // 0x00511BA2
          desc: 'city capture variant: sound 5' },
  // ── Diplomacy/Parley ──
  0x3D: { netMsg: 0x80,                                                      // 0x00511BA2
          desc: 'parley request: sends 0x80 (diplomacy response)' },
  // ── Deserter ──
  0x23: { netMsg: 0x7B,                                                      // 0x00511BA2
          desc: 'deserter: sends 0x7B to source player' },
  0x24: { netMsg: 0x7B,                                                      // 0x00511BA2
          desc: 'deserter variant: sends 0x7B to source player' },
  // ── Can Escape ──
  0x17: { netMsg: 0x77,                                                      // 0x00511BA2
          desc: 'can_escape: sends 0x77 response' },
  // ── Manhattan Project ──
  0x46: { sound: 0x23,                                                       // 0x00511BA2
          desc: 'Manhattan Project: sound 0x23' },
  // ── Golden Age ──
  0x54: { sound: 0x3C,                                                       // 0x00511BA2
          desc: 'golden age: sound 0x3C' },
  // ── Espionage ──
  0x55: { sound: 0x44,                                                       // 0x00511BA2
          desc: 'enemy embassy: sound 0x44 (spy)' },
  0x56: { sound: 0x44,                                                       // 0x00511BA2
          desc: 'enemy investigate: sound 0x44 (spy)' },
  0x57: { sound: { id: 0x44, cond: 'no espionage tech; 0x27 if has it' },   // 0x00511BA2
          desc: 'steal tech: sound 0x44 or 0x27 depending on tech 0x23' },
  0x58: { sound: 0x44,                                                       // 0x00511BA2
          desc: 'foiled spy: sound 0x44' },
  0x59: { sound: { id: 0x44, cond: 'no espionage tech; 0x27 if has it' },   // 0x00511BA2
          desc: 'sabotage one: sound 0x44 or 0x27' },
  0x5A: { sound: { id: 0x44, cond: 'no espionage tech; 0x27 if has it' },   // 0x00511BA2
          desc: 'sabotage two: sound 0x44 or 0x27' },
  0x5B: { sound: 0x44,                                                       // 0x00511BA2
          desc: 'water supply sabotage: sound 0x44' },
  0x5E: { sound: 0x44,                                                       // 0x00511BA2
          desc: 'civil war: sound 0x44' },
  // ── Nuclear Events ──
  0x29: { sound: 0x3E,                                                       // 0x00511BA2
          desc: 'nuke explosion: sound 0x3E' },
  0x2A: { sound: 0x11,                                                       // 0x00511BA2
          desc: 'nuclear plant meltdown: sound 0x11' },
  0x5C: { sound: 0x3E,                                                       // 0x00511BA2
          desc: 'planted nuke: sound 0x3E' },
  0x5D: { sound: 0x3E,                                                       // 0x00511BA2
          desc: 'planted nuke variant: sound 0x3E' },
  // ── Uprising/Mine ──
  0x5F: { sound: 0x5D,                                                       // 0x00511BA2
          desc: 'upgrade mine: sound 0x5D' },
  0x60: { sound: 0x5D,                                                       // 0x00511BA2
          desc: 'diplomatic insult: sound 0x5D' },
  0x61: { sound: 0x5D,                                                       // 0x00511BA2
          desc: 'diplomatic retort: sound 0x5D' },
  // ── Turn Timer ──
  0x40: { netMsg: 0x56,                                                      // 0x00511BA2
          desc: 'turn timer client vote: sends 0x56 response' },
  0x43: { netMsg: 0x57,                                                      // 0x00511BA2
          desc: 'password master change: sends 0x57 response' },
  // ── Intelligence ──
  0x64: { netMsg: 0xA7, flag: 'DAT_0067ab65',                               // 0x00511BA2
          desc: 'reveal unit origins: sends 0xA7, sets flag' },
  0x65: { netMsg: 0xA5, flag: 'DAT_0067ab66',                               // 0x00511BA2
          desc: 'reveal city info: sends 0xA5, sets flag' },
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

// --- Message Options Bitmask ---
// DAT_00655af2 — controls which city/event notifications are shown
// Source: block_004E0000.c, message_options dialog + city processing checks
export const MESSAGE_OPTIONS = {
  globalAddr: 'DAT_00655af2',                                                // 0x004E0000
  savedCopy:  'DAT_0064bc22',    // DAT_0064bc22 = DAT_00655af2 on save     // 0x004E0000
  dialogKey:  'MESSAGEOPTIONS',  // GAME.TXT dialog key                      // 0x004E0000
  bits: {
    CITY_GROWTH:        0x001,   // bit 0 — suppress city growth message     // DAT_00655af2
    BUILDING_COMPLETE:  0x002,   // bit 1 — suppress building complete       // DAT_00655af2
    UNIT_BUILT:         0x004,   // bit 2 — suppress unit built              // DAT_00655af2
    PRODUCTION_COMPLETE:0x008,   // bit 3 — suppress production complete     // DAT_00655af2
    DISORDER:           0x010,   // bit 4 — suppress disorder notification   // DAT_00655af2
    WLTKD_START:        0x020,   // bit 5 — suppress WLtKD start            // DAT_00655af2
    WLTKD_END:          0x040,   // bit 6 — suppress WLtKD end              // DAT_00655af2
    // bit 7 (0x80): unused in message options dialog but checked in city processing
    POLLUTION:          0x100,   // bit 8 — suppress pollution notification  // DAT_00655af2
    UNKNOWN_200:        0x200,   // bit 9 — unknown / reserved               // DAT_00655af2
    SOUND_TOGGLE:       0x400,   // bit 10 — sound on/off toggle             // DAT_00655af2
  },
  // Dialog checkbox indices map 0-10 to bits 0-10
  // Note: when bit is SET, the notification is SUPPRESSED
  // In dialog: checked = notification ON → bit clear; unchecked → bit set
  // FUN_004e1452 (785 bytes): init uses thunk_FUN_0051d7d6 with inverted logic:
  //   checkbox 0 value = ~DAT_00655af2 & 1 (inverted: checked = suppression OFF)
  //   checkbox N value = (DAT_00655af2 & bit) == 0 (checked when bit clear)
  // On confirm: DAT_00655af2 = 0, then ORs each bit where checkbox is UNCHECKED
  functionAddr:    '0x004E1452',       // message_options_dialog function          // 0x004E1452
  checkboxInitFn:  'thunk_FUN_0051d7d6', // init checkbox (inverted logic)        // 0x004E1452
  checkboxReadFn:  'thunk_FUN_0051d817', // read checkbox result                  // 0x004E1452
};

// --- Game Options Dialog ---
// FUN_004e0ab0 (game_options_dialog), 386 bytes @ block_004E0000.c
// Presents 11 checkboxes controlling DAT_00655aea (master game options bitmask).
// Dialog key: GAMEOPTIONS. On confirm, clears bits with mask 0xFFFF8027,
// then re-sets each checked bit individually.
export const GAME_OPTIONS_DIALOG = {
  sourceAddr:    '0x004E0AB0',
  dialogKey:     'GAMEOPTIONS',                                                 // 0x004E0AB0
  globalAddr:    'DAT_00655aea',       // master game options bitmask            // 0x004E0AB0
  savedCopy:     'DAT_0064bc1e',       // DAT_0064bc1e = DAT_00655aea on apply  // 0x004E0AB0
  clearMask:     0xFFFF8027,           // bits cleared before re-applying        // 0x004E0AB0
  // 11 checkbox items, in dialog order (index 0-10):
  // thunk_FUN_004e0a8c(index, DAT_00655aea & flagBit) to init each checkbox
  // thunk_FUN_0051d817(index) to read back each checkbox after OK
  checkboxBits: {
    0:  { bit: 0x0010, desc: 'sound effects' },                                 // 0x004E0AB0
    1:  { bit: 0x0008, desc: 'music' },                                         // 0x004E0AB0
    2:  { bit: 0x4000, desc: 'always wait at end of turn' },                    // 0x004E0AB0
    3:  { bit: 0x2000, desc: 'move units with mouse' },                         // 0x004E0AB0
    4:  { bit: 0x1000, desc: 'enter closest city on keypress' },                // 0x004E0AB0
    5:  { bit: 0x0800, desc: 'popup caravan actions' },                         // 0x004E0AB0
    6:  { bit: 0x0400, desc: 'no pause after enemy moves' },                    // 0x004E0AB0
    7:  { bit: 0x0200, desc: 'fast piece slide' },                              // 0x004E0AB0
    8:  { bit: 0x0100, desc: 'instant advice' },                                // 0x004E0AB0
    9:  { bit: 0x0080, desc: 'tutorial help' },                                 // 0x004E0AB0
    10: { bit: 0x0040, desc: 'show enemy moves' },                              // 0x004E0AB0
  },
  // checkbox 1 (music) special: toggling on triggers FUN_005dde9d/5dde57/5ddd4e/FUN_0046e4a9
  // toggling off triggers thunk_FUN_0046e6a9
  // Version string shown in dialog via thunk_FUN_0040ff60(0, PTR_s_5_4_0f_...):
  versionStringAddr: 'PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c',          // 0x004E0AB0
  patchStringAddr:   'PTR_s_Patch_3_00627660',                                  // 0x004E0AB0
};

// --- Graphic Options Dialog ---
// FUN_004e0d71 (graphic_options_dialog), 423 bytes @ block_004E0000.c
// Presents 6 checkboxes controlling bits 16-21 of DAT_00655aea.
// Dialog key: GRAPHICOPTIONS. On confirm, clears bits with mask 0xFFC0FFFF.
export const GRAPHIC_OPTIONS_DIALOG = {
  sourceAddr:    '0x004E0D71',
  dialogKey:     'GRAPHICOPTIONS',                                              // 0x004E0D71
  globalAddr:    'DAT_00655aea',       // same master bitmask                   // 0x004E0D71
  savedCopy:     'DAT_0064bc1e',       // DAT_0064bc1e = DAT_00655aea on apply  // 0x004E0D71
  clearMask:     0xFFC0FFFF,           // bits cleared before re-applying        // 0x004E0D71
  // 6 checkbox items, in dialog order (index 0-5):
  checkboxBits: {
    0: { bit: 0x020000, desc: 'throne room' },                                  // 0x004E0D71
    1: { bit: 0x040000, desc: 'diplomacy screen' },                             // 0x004E0D71
    2: { bit: 0x200000, desc: 'animated heralds' },                             // 0x004E0D71
    3: { bit: 0x080000, desc: 'civilopedia for advances' },                     // 0x004E0D71
    4: { bit: 0x100000, desc: 'high council' },                                 // 0x004E0D71
    5: { bit: 0x010000, desc: 'wonder movies' },                                // 0x004E0D71
  },
  // checkbox 2 (animated heralds) has low-memory check:
  // thunk_FUN_00568176(0x800000) — checks if 8MB available
  // if not, shows LOWMEMORY dialog instead of enabling
  lowMemoryCheckBytes: 0x800000,       // 8MB threshold for heralds             // 0x004E0D71
  lowMemoryDialog:     'LOWMEMORY',    // @ s_LOWMEMORY_0062eb54               // 0x004E0D71
};

// --- Multiplayer Options Dialog ---
// FUN_004e0f18 (multiplayer_options_dialog), 1020 bytes @ block_004E0000.c
// Presents 2-4 checkboxes for MP game options (depending on game state).
// Uses two different GAME.TXT dialog keys depending on protocol level.
export const MULTIPLAYER_OPTIONS_DIALOG = {
  sourceAddr:    '0x004E0F18',
  // Dialog key selection: if (DAT_00655b02 >= 3 && DAT_006ad2f7 != 0) → MULTIPLAYEROPTIONS
  //                       else → MULTIPLAYEROPTIONS2 (fewer options)
  dialogKeys: {
    full:     'MULTIPLAYEROPTIONS',    // @ s_MULTIPLAYEROPTIONS_0062eb60       // 0x004E0F18
    limited:  'MULTIPLAYEROPTIONS2',   // @ s_MULTIPLAYEROPTIONS2_0062eb74      // 0x004E0F18
  },
  protocolVersionVar: 'DAT_00655b02',  // save format version                   // 0x004E0F18
  isHostVar:          'DAT_006ad2f7',  // nonzero = host player                 // 0x004E0F18
  // Checkbox state variables (ushort, not bitmask — each is 0/1):
  checkboxVars: {
    0: 'DAT_006665fa',                 // checkbox 0 value                      // 0x004E0F18
    1: 'DAT_006665fc',                 // checkbox 1 value                      // 0x004E0F18
    2: 'DAT_006665fe',                 // checkbox 2 (full dialog only)         // 0x004E0F18
    3: 'DAT_00666600',                 // checkbox 3 (full dialog only)         // 0x004E0F18
  },
  // Master copies (checkboxes 2-3 only apply when host, versioned):
  masterVars: {
    lockWhiteArea: 'DAT_00654fac',     // master copy of checkbox 2             // 0x004E0F18
    chatSound:     'DAT_00654fae',     // master copy of checkbox 3             // 0x004E0F18
  },
  // When checkboxes 2-3 change, server broadcasts change to clients:
  pmChange: {
    // Net messages: 0x350 - (checkbox2==0), 0x352 - (checkbox3==0)
    netMsgLockWhiteArea: { base: 0x350, formula: '0x350 - (val==0)' },         // 0x004E0F18
    netMsgChatSound:     { base: 0x352, formula: '0x352 - (val==0)' },         // 0x004E0F18
    // Server-side proposal dialog:
    serverDialog:        'PMCHANGESERVER',  // @ s_PMCHANGESERVER_0062eb8c      // 0x004E0F18
    rejectedDialog:      'PMCHANGENO',      // @ s_PMCHANGENO_0062eb9c          // 0x004E0F18
    acceptedDialog:      'PMCHANGEYES',     // @ s_PMCHANGEYES_0062eba8         // 0x004E0F18
    // Target player count: DAT_006ad308 - 1 (wait for all other clients)
    targetCountVar:      'DAT_006ad66c',    // set to DAT_006ad308 - 1          // 0x004E0F18
    responseCountVar:    'DAT_006ad670',    // incremented as clients respond    // 0x004E0F18
  },
  // MP events dispatched during PM change:
  mpEvents: {
    proposal: 0x43,                    // FUN_00511880(0x43, 0xff, 2, 0, 0, 0)  // 0x004E0F18
    rejected: 0x44,                    // FUN_00511880(0x44, 0xff, 0, 0, 0, 0)  // 0x004E0F18
    accepted: 0x45,                    // FUN_00511880(0x45, 0xff, 0, 0, 0, 0)  // 0x004E0F18
  },
  // Net messages sent to inform all clients:
  netMessages: {
    announceSettings: 0x1B,            // thunk_FUN_0046b14d(0x1b, ...)         // 0x004E0F18
    sendValues:       0x33,            // thunk_FUN_0046b14d(0x33, lockWhite, chatSound, retireAfterN, ...) // 0x004E0F18
    retireAfterNVar:  'DAT_00654c7c',  // retire after N turns setting          // 0x004E0F18
  },
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

// --- Cheat Edit Dialogs ---
// Debug/cheat mode editor dialogs for in-game modification of units, cities, civs, scenarios.
// Source: block_00550000.c — FUN_0055560f through FUN_005582ad

// cheat_set_game_year (FUN_00555a02), 137 bytes — DEBUG mode game year override
export const CHEAT_GAME_YEAR = {
  dialogSection:   'DEBUG',            // dialog section in GAME.TXT              // 0x00555A02
  dialogKey:       'GAMEYEAR',         // prompt key                              // 0x00555A02
  turnVar:         'DAT_00655af8',     // current game turn                       // 0x00555A02
  yearVar:         'DAT_00655afa',     // display year (recalculated from turn)   // 0x00555A02
  sourceAddr:      '0x00555A02',
};

// cheat_set_money (FUN_0055615c), 255 bytes — set civ treasury (cheat mode)
export const CHEAT_SET_MONEY = {
  dialogSection:   'DEBUG',            // dialog section in GAME.TXT              // 0x0055615C
  dialogKey:       'MONEY',            // prompt key                              // 0x0055615C
  maxGold:         30000,              // hard cap: gold clamped to 0..30000      // 0x0055615C
  minGold:         0,                  // minimum gold value                      // 0x0055615C
  treasuryOffset:  '+0x02 in civ record (DAT_0064c6a2 + civIdx * 0x594)',        // 0x0055615C
  sourceAddr:      '0x0055615C',
};

// cheat_edit_unit (FUN_0055625b), 1892 bytes — unit property editor
export const CHEAT_EDIT_UNIT = {
  dialogKey:       'UNITEDIT',         // GAME.TXT section key                    // 0x0055625B
  unitRecordBase:  'DAT_006560f0',     // unit records start                      // 0x0055625B
  unitRecordStride: 0x20,              // 32 bytes per unit record                // 0x0055625B
  fields: {
    position:      '+0x00 (x:int16, y:int16)',                                    // 0x0055625B
    flags:         '+0x04 (uint16)',     // bit 0x2000 = fortified                // 0x0055625B
    type:          '+0x06 (byte)',       // unit type index                       // 0x0055625B
    owner:         '+0x07 (byte)',       // civ index                             // 0x0055625B
    movesLeft:     '+0x08 (byte)',       // movement points remaining             // 0x0055625B
    hitpoints:     '+0x0a (byte)',       // current hitpoints                     // 0x0055625B
    homeCity:      '+0x10 (byte)',       // home city index (0xFF = none)         // 0x0055625B
    goto:          '+0x0f (byte)',       // goto mode flag (0x02 or 0xFF)         // 0x0055625B
    cargoSearch:   '+0x0d (byte)',       // supply search target type             // 0x0055625B
  },
  editOptions: [
    { id: 1, name: 'Toggle fortified',  bit: 0x2000 },                           // 0x0055625B
    { id: 2, name: 'Clear movement',    setsTo: 0 },                             // 0x0055625B
    { id: 3, name: 'Set hitpoints',     dialogKey: 'UNITHITPOINTS' },            // 0x0055625B
    { id: 4, name: 'Change home city',  dialogKey: 'EDITHOMECITY' },             // 0x0055625B
    { id: 5, name: 'Toggle goto',       values: [0x02, 0xFF] },                  // 0x0055625B
    { id: 6, name: 'Change cargo search', dialogKey: 'SUPPLYSEARCH', maxId: 0x10 }, // 0x0055625B
  ],
  supplySearchCount: 0x10,             // 16 supply search targets + "None"       // 0x0055625B
  supplyCancelId:    0x10,             // id 16 = "None" (clears supply search)   // 0x0055625B
  sourceAddr:        '0x0055625B',
};

// cheat_unit_icon_id (FUN_00555ced), 131 bytes — maps unit domain to minimap icon
export const CHEAT_UNIT_ICON_MAP = {
  defaultIcon:   0x29,   // fallback icon ID                                      // 0x00555CED
  domainIcons: {
    0: 0x6A,             // land unit icon (param_1 == 0)                         // 0x00555CED
    1: 0x7A,             // sea unit icon (param_1 == 1)                          // 0x00555CED
    2: 0x5E,             // air unit icon (param_1 == 2)                          // 0x00555CED
    4: 0x55,             // special unit icon (param_1 == 4)                      // 0x00555CED
    5: 0x2A,             // settler-class icon (param_1 == 5)                     // 0x00555CED
    0x15: 0x1D,          // nuke icon (param_1 == 0x15)                           // 0x00555CED
  },
  sourceAddr: '0x00555CED',
};

// cheat_edit_city (set_city_shields FUN_005569e3), 1357 bytes — city property editor
export const CHEAT_EDIT_CITY = {
  dialogKey:       'CITYEDIT',         // GAME.TXT section key                    // 0x005569E3
  cityRecordBase:  'DAT_0064f340',     // city records start                      // 0x005569E3
  cityRecordStride: 0x58,              // 88 bytes per city record                // 0x005569E3
  editOptions: [
    { id: 1, name: 'Set city size',    dialogKey: 'SETCITYSIZE' },               // 0x005569E3
    { id: 2, name: 'Clear wonders',    addrBase: 'DAT_00655be6', count: 0x1C },  // 0x005569E3
    { id: 3, name: 'Clear disorder',   mask: 0xFFFFFFFC },                       // 0x005569E3
    { id: 4, name: 'Copy city',        dialogKey: 'COPYCITY' },                  // 0x005569E3
    { id: 5, name: 'Set shields',      dialogKey: 'SETCITYSHIELDS' },            // 0x005569E3
    { id: 6, name: 'Toggle capital',   bit: 0x4000000 },                         // 0x005569E3
  ],
  wonderSlotCount: 0x1C,               // 28 wonder slots in DAT_00655be6         // 0x005569E3
  capitalFlag:     0x4000000,          // city flags bit for capital               // 0x005569E3
  copyFieldCount:  5,                  // 5 bytes copied for city type/buildings   // 0x005569E3
  sourceAddr:      '0x005569E3',
};

// cheat_edit_king (FUN_00556f54), 3764 bytes — civ/player property editor
export const CHEAT_EDIT_KING = {
  dialogKey:       'EDITKING',          // GAME.TXT section key                   // 0x00556F54
  editOptions: [
    { id: 1,  name: 'Edit treaties',     dialogKey: 'EDITTREATIES' },            // 0x00556F54
    { id: 2,  name: 'Edit last contact', dialogKey: 'LASTCONTACT' },             // 0x00556F54
    { id: 3,  name: 'Edit attitude',     dialogKey: 'EDITATTITUDE' },            // 0x00556F54
    { id: 4,  name: 'Edit betrayal',     dialogKey: 'EDITBETRAY' },              // 0x00556F54
    { id: 5,  name: 'Clear patience' },                                          // 0x00556F54
    { id: 6,  name: 'Reset all contacts to current turn' },                      // 0x00556F54
    { id: 7,  name: 'Show power graph',  fn: 'thunk_FUN_004c195e(civIdx, 1)' },  // 0x00556F54
    { id: 8,  name: 'Edit research progress', dialogKey: 'EDITPROGRESS' },       // 0x00556F54
    { id: 9,  name: 'Clear current research', setsTo: 0xFFFF },                  // 0x00556F54
    { id: 10, name: 'Edit leader name',  dialogKey: 'EDITKINGNAME', maxLen: 0x17 }, // 0x00556F54
    { id: 11, name: 'Copy techs from civ' },                                     // 0x00556F54
    { id: 12, name: 'Toggle human/AI',   flagBit: 0x200 },                       // 0x00556F54
  ],
  treatyEditBits: {
    // Treaty flag bits edited via checkbox dialog
    contact:     { bit: 0,  checkbox: 0, flagValue: 1 },                          // 0x00556F54
    ceasefire:   { bit: 1,  checkbox: 1, flagValue: 2 },                          // 0x00556F54
    peace:       { bit: 2,  checkbox: 2, flagValue: 4 },                          // 0x00556F54
    alliance:    { bit: 3,  checkbox: 3, flagValue: 8 },                          // 0x00556F54
    vendetta:    { bit: 13, checkbox: 4, flagValue: 0x2000 },                     // 0x00556F54
    embassy:     { bit: 4,  checkbox: 5, flagValue: 0x10 },                       // 0x00556F54
    mapShared:   { bit: 7,  checkbox: 6, flagValue: 0x80 },                       // 0x00556F54
  },
  clearTreatyMask: 0x60,               // clear ceasefire+peace before set        // 0x00556F54
  clearVendettaMask: 0x200E,           // clear vendetta+war group before set     // 0x00556F54
  humanAIFlag:     0x200,              // civ.flags bit 9: human/AI toggle        // 0x00556F54
  leaderNameMaxLen: 0x17,              // 23 character limit                      // 0x00556F54
  techCountField:  '+0x10 in civ record (DAT_0064c6b0)',                          // 0x00556F54
  techCopyCount:   0xD,                // 13 tech bytes copied per civ            // 0x00556F54
  // Human-controlled civ personality recalculation on toggle:
  // Uses leader personality at DAT_006554f8 + leaderIdx * 0x30
  personalityLeaderAddr: 'DAT_006554fc + leaderIdx * 0x30',                       // 0x00556F54
  personalityMappingAdj: '+0x15 to personality byte if human',                    // 0x00556F54
  sourceAddr:      '0x00556F54',
};

// cheat_edit_victory (FUN_00557e2c), 843 bytes — victory conditions editor
export const CHEAT_EDIT_VICTORY = {
  dialogKey:       'EDITVICTORY',       // GAME.TXT section key                   // 0x00557E2C
  fields: {
    totalPopulation: 'sum of city_population for all cities',                     // 0x00557E2C
    civPopulation:   'sum for selected civ only',                                 // 0x00557E2C
    conquestFlag:    { bit: 0x02, desc: 'conquest victory enabled' },             // 0x00557E2C
    scienceFlag:     { bit: 0x04, desc: 'science (spaceship) victory enabled' },  // 0x00557E2C
  },
  editOptions: [
    { id: 1, name: 'Toggle conquest',       flagBit: 0x02, addr: 'DAT_0064bc60' }, // 0x00557E2C
    { id: 2, name: 'Toggle science',        flagBit: 0x04, addr: 'DAT_0064bc60' }, // 0x00557E2C
    { id: 3, name: 'Select civ to display', fn: 'civ_picker_dialog' },            // 0x00557E2C
    { id: 4, name: 'Edit victory value',    dialogKey: 'EDITVICTORYOBJ' },        // 0x00557E2C
  ],
  victoryObjAddr:  'DAT_0064bcb4 (short[4], indices 4-7)',                        // 0x00557E2C
  sourceAddr:      '0x00557E2C',
};

// cheat_edit_rules (FUN_0055819b), 274 bytes — game rule toggles
export const CHEAT_EDIT_RULES = {
  dialogKey:       'EDITRULES',         // GAME.TXT section key                   // 0x0055819B
  ruleFlags: {
    flag0x10: { bit: 0x10, checkbox: 0, desc: 'rule flag bit 4' },               // 0x0055819B
    flag0x20: { bit: 0x20, checkbox: 1, desc: 'rule flag bit 5' },               // 0x0055819B
    flag0x40: { bit: 0x40, checkbox: 2, desc: 'rule flag bit 6' },               // 0x0055819B
    flag0x8000: { bit: 0x8000, checkbox: 3, desc: 'WW2/special scenario flag' }, // 0x0055819B
  },
  flagsAddr:       'DAT_0064bc60',     // scenario/game flags word                // 0x0055819B
  sourceAddr:      '0x0055819B',
};

// cheat_edit_scenario (FUN_005582ad), 1648 bytes — scenario editor
export const CHEAT_EDIT_SCENARIO = {
  dialogKey:       'EDITSCEN',          // GAME.TXT section key                   // 0x005582AD
  scenarioModeFlag: 0x80,              // DAT_00655af0 & 0x80                     // 0x005582AD
  editOptions: [
    { id: 1,  name: 'Edit paradigm',         dialogKey: 'EDITPARADIGM',   addr: 'DAT_0064bcb2' },
    { id: 2,  name: 'Edit increment',        dialogKey: 'EDITINCREMENT',  addr: 'DAT_0064bcb4' },
    { id: 3,  name: 'Edit start year',       dialogKey: 'EDITSTARTYEAR',  addr: 'DAT_0064bcb6' },
    { id: 4,  name: 'Edit max turns',        dialogKey: 'EDITMAXTURNS',   addr: 'DAT_0064bcb8' },
    { id: 5,  name: 'Reveal all terrain',    desc: 'Clear fog byte (0xF0 mask) for all tiles' },
    { id: 6,  name: 'Hide all terrain',      desc: 'Set fog byte to 0xF0 for unimproved tiles' },
    { id: 7,  name: 'Reset visibility',      desc: 'Reset fog-of-war per-civ; set all cities visible' },
    { id: 8,  name: 'Restore fog-of-war',    desc: 'Recalculate visibility from improvements' },
    { id: 9,  name: 'Edit scenario name',    dialogKey: 'SCENNAME', maxLen: 0x18 },
    { id: 10, name: 'Toggle tech paradigm',  flagBit: 0x01, addr: 'DAT_0064bc60' },
    { id: 11, name: 'Victory conditions',    fn: 'cheat_edit_victory()' },
    { id: 12, name: 'Game rules',            fn: 'cheat_edit_rules()' },
  ],
  fogByteMask:      0xF0,              // upper nibble = fog visibility            // 0x005582AD
  fogClearCheck:     0x03,             // tile improvement bits check               // 0x005582AD
  fogOfWarFlag:      0x08,             // DAT_0064bc60 |= 0x08 on visibility reset // 0x005582AD
  fogOfWarClear:     0xFFF7,           // DAT_0064bc60 &= 0xFFF7 on fog restore   // 0x005582AD
  scenarioNameAddr:  'DAT_0064bc62',   // scenario display name                    // 0x005582AD
  scenarioNameMaxLen: 0x18,            // 24 character limit                       // 0x005582AD
  tileRecordStride:  6,                // 6 bytes per map tile record              // 0x005582AD
  sourceAddr:        '0x005582AD',
};

// cheat_destroy_civ (FUN_00555a8b), 514 bytes — remove a civ from the game
export const CHEAT_DESTROY_CIV = {
  mpEventCode:     0x31,               // MP event: civ destroyed                  // 0x00555A8B
  mpProtocolLevel: 2,                  // only sent if DAT_00655b02 > 2            // 0x00555A8B
  process: [
    'Delete all cities belonging to target civ',
    'Call kill_civ(target, currentPlayer) to transfer units/territory',
    'Clear civ from active bitmask',
  ],
  cityDeleteFn:    'thunk_delete_city(cityIdx, 0)',                                // 0x00555A8B
  civKillFn:       'thunk_kill_civ(civIdx, currentPlayer)',                        // 0x00555A8B
  sourceAddr:      '0x00555A8B',
};

// resign_game (FUN_0055b6c7), 586 bytes — player resignation flow
export const RESIGN_GAME = {
  singlePlayerFlow: 'thunk_FUN_0046e6a9(); thunk_FUN_00484d3b(); — end game',    // 0x0055B6C7
  multiplayerFlow: {
    cancelTimer:    'stop and clear turn timer',                                   // 0x0055B6C7
    showDialog:     'show_dialog with civ name, adj, title, govt style',          // 0x0055B6C7
    soundEffect:    'play fanfare 0 or 1 depending on DAT_00654c76',              // 0x0055B6C7
    removeCivBit:   'clear civ bit from DAT_00655b0b',                            // 0x0055B6C7
    mpEventCivDeath: 0x31,             // broadcast civ death                      // 0x0055B6C7
    localTransfer:  'transfer to next AI via FUN_004e1763(civId, 0, 0)',           // 0x0055B6C7
    networkNotify:  'if host: send FUN_004b0b53(0xff, 2, 0, 0, 0) + event 0xA2', // 0x0055B6C7
    remoteHandoff:  'if client: call FUN_004824e3()',                              // 0x0055B6C7
  },
  mpEventResigned: 0xA2,              // MP event: player resigned to AI           // 0x0055B6C7
  sourceAddr:      '0x0055B6C7',
};


// ============================================================================
// 8. TERRAIN EDITOR
// ============================================================================

// --- Terrain Type Table ---
// terrain_editor_load_data (FUN_00519200), 493 bytes
// Loads 33 terrain types from the RULES.TXT terrain table into editor buffers.
export const TERRAIN_EDITOR_DATA = {
  terrainTypeCount: 0x21,      // 33 terrain types total                      // 0x00519200
  ruleTableStride:  0x18,      // 24-byte stride in DAT_00627cc4 table       // 0x00519200
  nameBufferSize:   0x28,      // 40-byte name buffer per terrain type       // 0x00519200
  nameTable:        'DAT_006a1d88',  // editor name buffer start              // 0x00519200
  editDataTable:    'DAT_006a2d28',  // expanded editor data (stride 0x58)   // 0x00519200
  editDataStride:   0x58,      // 88 bytes per terrain edit record           // 0x00519200
  ruleNameIdTable:  'DAT_00627cc4',  // string IDs for terrain names         // 0x00519200
  // Base terrain (types 0–10) have additional improvement data:
  baseTerrain: {
    maxIndex:      0xB,        // types < 0xB have improvement sub-table     // 0x00519200
    improvSlots:   2,          // 2 improvement slots per base terrain       // 0x00519200
    improvFields:  4,          // 4 fields per improvement slot              // 0x00519200
    defenseField:  'DAT_00627ccd',  // defense modifier                     // 0x00519200
  },
  // terrain_editor_save_data (FUN_005193ed) — reverse of load
  saveFn:           '0x005193ED',                                             // 0x005193ED
};

// --- Terrain Index Fixup ---
// terrain_index_collapse (FUN_005195c4) — removes gaps at indices 0xD, 0x18
// terrain_index_expand (FUN_005195f1) — re-inserts gaps
export const TERRAIN_INDEX_FIXUP = {
  gapA: 0xD,                  // index 13 skipped in compact list             // 0x005195C4
  gapB: 0x18,                 // index 24 skipped in compact list             // 0x005195C4
  collapseFn: '0x005195C4',   // remove gaps for combo box index             // 0x005195C4
  expandFn:   '0x005195F1',   // restore gaps for terrain table index        // 0x005195F1
};

// --- Terrain Editor Main Window ---
// terrain_editor_main (FUN_0051bba1), large
// Creates the terrain editor property sheet with GIF preview.
export const TERRAIN_EDITOR_WINDOW = {
  editorGif:       'EDITORPT.GIF',   // terrain preview image file           // 0x0051BBA1
  startControlId:  0xC9,             // first control ID (terrain type combo) // 0x0051ACDC
  controlIds: {
    terrainCombo:  0xC9,      // terrain type selector combo box              // 0x0051ACDC
    updateBtnA:    0xCF,      // triggers update_terrain_preview              // 0x0051ACDC
    updateBtnB:    0xD3,      // triggers update_terrain_preview              // 0x0051ACDC
  },
  buttonCheckIds:  [0xCF, 0xD3],    // buttons that trigger invalidate       // 0x0051ACDC
  controlCount:    0xF,              // 15 editor controls (loop 1..14)       // 0x0051961E
  controlTypeEdit: 9,                // control type: edit field              // 0x0051961E
  controlTypeCombo:0xC,              // control type: combo box               // 0x0051961E
  editorPointer:   'DAT_006a4f88',   // editor instance pointer              // 0x0051BBA1
  exitFlag:        'DAT_006a1d7c',   // 0 = close editor                     // 0x00519D67
  activeTerrIdx:   0x2EC,            // offset in editor for active terrain   // 0x0051BBA1
  terrEditSuffix:  0x2F8,            // field_2F8: editor mode flag           // 0x0051BBA1
  // File I/O: writes RULES.TXT via terrain_editor_save (show_messagebox_9D67)
  rulesSaveKey:    'TERRAIN',        // RULES.TXT section key                // 0x00519D67
  rulesSaveNotice: 'NOTICE',         // success notification key             // 0x00519D67
  // sourceAddr: '0x0051BBA1' (main), '0x00519D67' (save), '0x0051ACDC' (command handler)
};

// --- Terrain Editor Sub-dialogs ---
// Forest selection (FUN_0051a26c), Hills (param==4), Mountains (param==5),
// River (FUN_0051a678), Coast (FUN_0051a797), Misc (FUN_0051a8b7)
export const TERRAIN_EDITOR_DIALOGS = {
  forest:    { dialogKey: 'FOREST',    helpKey: 'HELPFOREST',    terrainIdx: 3 },  // 0x0051A26C
  hills:     { dialogKey: 'HILLS',     helpKey: 'HELPHILLS',     terrainIdx: 4 },  // 0x0051A26C
  mountains: { dialogKey: 'MOUNTAINS', helpKey: 'HELPMOUNTAINS', terrainIdx: 5 },  // 0x0051A26C
  river:     { dialogKey: 'RIVER',     helpKey: 'HELPRIVER' },                     // 0x0051A678
  coast:     { dialogKey: 'COAST',     helpKey: 'HELPCOAST' },                     // 0x0051A797
  misc:      { dialogKey: 'TERRMISC',  helpKey: 'HELPTERRMISC' },                  // 0x0051A8B7
  terrName:  { dialogKey: 'TERRNAME',  section: 'DEBUG' },                         // 0x00519E74
};


// ============================================================================
// 9. GAME SETUP DIALOGS
// ============================================================================

// --- MP Startup Config ---
// mp_startup_config (FUN_0051d9a0), 952 bytes
// Reads INI settings and launches the multiplayer type selection dialog.
export const MP_STARTUP_CONFIG = {
  iniSection:      'Civilization Gold',                                       // 0x0051D9A0
  iniFile:         'CIV.INI',         // Windows INI file                    // 0x0051D9A0
  netTimeoutKey:   'NetTimeOut',       // network timeout setting            // 0x0051D9A0
  netTimeoutDefault: 0x1E,            // 30 seconds default                  // 0x0051D9A0
  netTimeoutVar:   'DAT_006ad8b8',    // stored timeout value               // 0x0051D9A0
  adapterKey:      'Adapter',         // network adapter setting             // 0x0051D9A0
  maxPlayersKey:   'MaxPlayers',      // max player count setting            // 0x0051D9A0
  maxPlayersDefault: 7,               // default max players                 // 0x0051D9A0
  maxPlayersClamp: { min: 4, max: 7 }, // clamped to 4-7                    // 0x0051D9A0
  maxPlayersVar:   'DAT_006c3164',    // stored max players                  // 0x0051D9A0
  // MP type dialog: 'MULTITYPE2' key, 4 choices (0=IPX, 1=TCP new, 2=TCP load, 3=serial)
  mpTypeDialog:    'MULTITYPE2',      // GAME.TXT dialog key                 // 0x0051D9A0
  mpTypes: {
    0: 'IPX/SPX',                     // thunk_FUN_00419170                   // 0x0051D9A0
    1: 'TCP/IP new game',             // thunk_FUN_00444310(1)                // 0x0051D9A0
    2: 'TCP/IP load game',            // thunk_FUN_00444310(0)                // 0x0051D9A0
    3: 'serial (2-player)',           // DAT_006c3164=2, thunk_FUN_00444310(4) // 0x0051D9A0
  },
  devPath:         'D:\\Ss\\Franklinton\\startup_multip',                     // 0x0051D9A0
  soundId:         0x6A,              // sound played after type selection    // 0x0051D9A0
};

// --- Game Setup Dialog Sequence ---
// game_setup_dialogs (FUN_0051dd97), 3152 bytes
// Presents the series of game configuration dialogs for new game setup.
export const GAME_SETUP_DIALOGS = {
  // Dialog sequence and GAME.TXT section keys:
  dialogs: [
    { order: 1, key: 'DIFFICULTY',  setting: 'DAT_0064bc14', result: 'DAT_00655b08' }, // 0x0051DD97
    { order: 2, key: 'ENEMIES2',    setting: 'DAT_0064bc24', result: 'DAT_00655b0d' }, // 0x0051DD97
    { order: 3, key: 'BARBARITY',   setting: 'DAT_0064bc28', result: 'DAT_00655b09' }, // 0x0051DD97
    { order: 4, key: 'RULES',       setting: 'DAT_0064bc54' },                          // 0x0051DD97
    { order: 5, key: 'ADVANCED',    type: 'checkbox dialog' },                           // 0x0051DD97
    { order: 6, key: 'ACCELERATED', setting: 'DAT_0064bc56' },                           // 0x0051DD97
    { order: 7, key: 'ADVANCEDMP',  type: 'checkbox dialog' },                           // 0x0051DD97
  ],
  soundId:           0x6A,            // sound played after each dialog      // 0x0051DD97
  // Random enemies formula (when random option selected):
  randomEnemies:     'rand() % 5 + 2',  // 2 to 6 enemies                   // 0x0051DD97
  // Barbarity randomization based on difficulty:
  // diff < 2: rand()&1 + diff
  // diff < 5: rand()%3 + 1
  // diff >= 5: rand()&1 + 2

  // --- Advanced Rules Flag Bits (DAT_00655ae8) ---
  // Presented via ADVANCED checkbox dialog with 6 options:
  advancedRuleBits: {
    0: { bit: 0x10,   meaning: 'simplified combat (inverted: 0=on)' },       // 0x0051DD97
    1: { bit: 0x8000, meaning: 'bloodlust (always war)' },                    // 0x0051DD97
    2: { bit: null,    meaning: 'flat world (DAT_00631ee4)' },                // 0x0051DD97
    3: { bit: null,    meaning: 'accelerated startup (DAT_00631ee8)' },       // 0x0051DD97
    4: { bit: 0x80,   meaning: 'don\'t restart eliminated players' },         // 0x0051DD97
    5: { bit: 0x100,  meaning: 'simultaneous moves (obsolete flag)' },        // 0x0051DD97
  },
  defaultFlags:      0x3F,            // initial DAT_00655ae8 = 0x3F         // 0x0051DD97
  combinedDefault:   0x2F,            // after ADVANCED dialog = 0x2F        // 0x0051DD97

  // --- Advanced MP Rules ---
  // Presented via ADVANCEDMP checkbox dialog with 6-7 options:
  advancedMpKeys: {
    0: 'DAT_00654c74',  // reveal map                                         // 0x0051DD97
    1: 'DAT_00654c76',  // auto-save each turn                                // 0x0051DD97
    2: 'DAT_00654c78',  // disable unit cycling                                // 0x0051DD97
    3: 'DAT_00654c7a',  // auto-end turn                                       // 0x0051DD97
    4: 'DAT_00654fac',  // lock white area                                     // 0x0051DD97
    5: 'DAT_00654fae',  // chat sound                                          // 0x0051DD97
    6: 'DAT_00654c7c',  // retire after N turns (only if DAT_006c3160!=0)     // 0x0051DD97
  },
  timerDialogCtrlId: 0x364,           // control ID for turn timer embedded  // 0x0051DD97

  // --- Accelerated Startup Presets ---
  // 3 tech presets at indices 0x00, 0x15, 0x29 checked via FUN_00484fec
  acceleratedTechIds: [0x00, 0x15, 0x29],                                    // 0x0051DD97
  scientificMaxId:    0xFFFF,         // DAT_00655afc set to -1 (all techs) // 0x0051DD97
};

// --- Game Timer Dialog ---
// game_timer_dialog (FUN_0051ea8e), 1579 bytes
// Timer preset selection and custom timer input.
export const GAME_TIMER_DIALOG = {
  dialogKey:         'GAMETIMER',     // GAME.TXT section key                // 0x0051EA8E
  dialogKeyMP:       'GAMETIMER',     // variant for MP context              // 0x0051EA8E
  customDialogKey:   'CUSTOMGAMETIMER', // custom timer input dialog         // 0x0051EA8E
  timerVar:          'DAT_00654b70',  // turn timer total ms                 // 0x0051EA8E
  timerSelectionVar: 'DAT_006665d0',  // selected timer preset index         // 0x0051EA8E
  presets: {
    0:  0,                    // no timer                                      // 0x0051EA8E
    1:  30000,                // 30 seconds                                    // 0x0051EA8E
    2:  60000,                // 1 minute                                      // 0x0051EA8E
    3:  120000,               // 2 minutes                                     // 0x0051EA8E
    4:  180000,               // 3 minutes                                     // 0x0051EA8E
    5:  300000,               // 5 minutes                                     // 0x0051EA8E
    6:  'custom',             // launches CUSTOMGAMETIMER dialog               // 0x0051EA8E
  },
  customRange: { min: 10, max: 0xE10 },  // 10 to 3600 seconds              // 0x0051EA8E
  customMultiplier:  1000,    // input seconds × 1000 → ms                    // 0x0051EA8E
  // MP timer negotiation events (sent to server):
  mpEvents: {
    request:   0x40,          // NEWTURNTIMERSERVER — server proposal          // 0x0051EA8E
    rejected:  0x41,          // NEWTURNTIMERNO — server rejected              // 0x0051EA8E
    accepted:  0x42,          // NEWTURNTIMERYES — server accepted             // 0x0051EA8E
  },
  // Client-side vote (MP event 0x40):
  clientDialogKey:   'NEWTURNTIMERCLIENT',                                    // 0x00511BA2
  clientNetMsg:      0x56,    // net_send response to server                  // 0x00511BA2
  // Password master change (MP event 0x43):
  pmChangeKey:       'PMCHANGECLIENT',                                        // 0x00511BA2
  pmChangeNetMsg:    0x57,    // net_send response to server                  // 0x00511BA2
  // sourceAddr: '0x0051EA8E' (dialog), '0x00511BA2' (dispatch cases 0x40,0x43)
};


// ============================================================================
// 10. CIV SELECTION DIALOG
// ============================================================================

// --- Civilization Selection ---
// civ_selection_dialog (FUN_0051f19c), 9815 bytes
// Handles leader/tribe selection during game setup for all modes.
export const CIV_SELECTION = {
  leaderEntries:     0x15,            // 21 leader entries in selection list  // 0x0051F19C
  leaderTableBase:   'DAT_006554fe',  // leader civ index table              // 0x0051F19C
  leaderStride:      0x30,            // 48-byte stride per leader record    // 0x0051F19C
  // Leader record fields (offsets from DAT_006554fe + idx * 0x30):
  leaderFields: {
    civIndex:        0x00,    // byte: civ index (DAT_006554fe)               // 0x0051F19C
    isUsedFlag:      -0x02,   // byte: 0/1 is custom (DAT_006554fc)          // 0x0051F19C
    portraitId:      0x04,    // short: leader portrait string ID             // 0x0051F19C
    adjectiveId:     0x06,    // short: adjective string ID                   // 0x0051F19C
    nounId:          0x08,    // short: noun string ID                        // 0x0051F19C
    cityStyleId:     0x02,    // short: city style selection                  // 0x0051F19C
    cityNameIds:     { offset: 0x0E, count: 7, stride: 4 }, // city name IDs // 0x0051F19C
  },
  civRecordStride:   0x594,           // 1428 bytes per civ record           // 0x0051F19C
  civRecordLeaderOff:0xA6,            // civ_record + 0xA6 = leader index    // 0x0051F19C
  civNameStride:     0xF2,            // 242 bytes per civ name block        // 0x0051F19C
  takenBitmask:      'DAT_00655b0b',  // bitmask of claimed civ slots       // 0x0051F19C
  selectedCiv:       'DAT_00655b03',  // selected civ index                  // 0x0051F19C
  currentPlayer:     'DAT_006d1da0',  // current player civ index            // 0x0051F19C
  // Dialog sequence: GENDER → name input → CUSTOMTRIBE → CUSTOMTRIBE2 → CUSTOMCITY
  genderDialog:      'GENDER',        // first dialog: gender/tribe select   // 0x0051F19C
  customTribe:       'CUSTOMTRIBE',   // custom tribe name dialog            // 0x0051F19C
  customTribe2:      'CUSTOMTRIBE2',  // custom tribe adjectives dialog      // 0x0051F19C
  customCity:        'CUSTOMCITY',    // city name customization dialog      // 0x0051F19C
  maxJoinedMsg:      'JOINEDMAX',     // shown when all slots are taken      // 0x0051F19C
  emailDialog:       'EMAILADDRESS',  // PBEM email address input            // 0x0051F19C
  // City style selector:
  cityStyleCount:    4,               // 4 city style options                 // 0x0051F19C
  cityStyleSprite:   0x3D8,           // DAT_00628420 + 0x3D8 base offset   // 0x0051F19C
  cityStyleStride:   0x1E0,           // 480 bytes per city style preview    // 0x0051F19C
  // MP network messages used during selection:
  netMsgCivChosen:   0x30,            // sent to server when civ is chosen   // 0x0051F19C
  netMsgCivUnchoose: 0x31,            // sent to server to cancel selection  // 0x0051F19C
  // Connection messages:
  lostServerMsg:     'LOSTSERVER',    // shown on server disconnect          // 0x0051F19C
  serverQuitMsg:     'SERVERQUIT',    // shown on server quit                // 0x0051F19C
  alreadyChosenMsg:  'ALREADYCHOSEN', // shown when civ already taken        // 0x0051F19C
  connectFailMsg:    'SERVERCONNECTFAIL', // shown on connection failure     // 0x0051F19C
  // sourceAddr: '0x0051F19C'
};


// ============================================================================
// 11. SPACESHIP SYSTEM
// ============================================================================

// --- Spaceship Component Definitions ---
// Binary ref: FUN_00596b00 (component_cost), FUN_00596eec (recalc_spaceship),
//             FUN_005973fd (launch_spaceship), FUN_0059772c (spaceship_dialog),
//             FUN_00597d6f (AI_spaceship_build), FUN_00598197 (AI_add_component),
//             FUN_00598d45 (AI_should_build_spaceship) @ block_00590000.c
export const SPACESHIP_COMPONENTS = {
  // 6 component types indexed 0-5
  STRUCTURAL:   0,    // structural support frames
  FUEL:         1,    // fuel pods
  PROPULSION:   2,    // propulsion units
  HABITATION:   3,    // habitation modules
  LIFE_SUPPORT: 4,    // life support modules
  SOLAR_ENERGY: 5,    // solar energy modules

  // 3 categories grouping the 6 component types
  categories: {
    0: { name: 'structural',  indices: [0],       // @ FUN_00596c61 — param_2 == 0
         dialogKey: null },
    1: { name: 'components',  indices: [1, 2],    // @ FUN_00596c61 — param_2 == 1
         dialogKey: 'COMPONENT' },                // @ FUN_00598197: s_COMPONENT_00635004
    2: { name: 'modules',     indices: [3, 4, 5], // @ FUN_00596c61 — param_2 == 2
         dialogKey: 'MODULE' },                   // @ FUN_00598197: s_MODULE_00635010
  },

  // Component data is stored per-civ at DAT_0064caa8 + civId * 0x594
  // as 6 consecutive int16 values (one per component type)
  civRecordBase:   'DAT_0064caa8',  // @ FUN_0059772c — short[] per civ
  civRecordStride: 0x594,           // 1428 bytes per civ record
  componentCount:  6,               // @ FUN_00596eec — loop: local_1c < 6

  // Cost data array at DAT_00634f64 with stride 0xc (12 bytes per component)
  costArrayBase:   'DAT_00634f64',  // @ FUN_00596b00 — (&DAT_00634f64)[param_2 * 3]
  costArrayStride: 0xc,             // 12 bytes: cost(4), weight(4), civpedia_icon(4)

  // Weight data array at DAT_00634f68 (offset +4 within each 12-byte entry)
  weightArrayBase: 'DAT_00634f68',  // @ FUN_00596eec — *(int *)(&DAT_00634f68 + local_1c * 0xc)

  // Civilopedia icon IDs for component display
  iconArrayBase:   'DAT_00634f60',  // @ FUN_0059772c — *(int *)(&DAT_00634f60 + local_18 * 0xc)

  // sourceAddr: '0x00596B00' (cost), '0x00596EEC' (recalc), '0x0059772C' (dialog)
};

// --- Spaceship Weight Escalation ---
// Binary ref: FUN_00596e92 @ block_00590000.c
// Weight per part increases at thresholds: +1 base, +2 after 4th part, +3 after 6th part
export const SPACESHIP_WEIGHT_ESCALATION = {
  // Formula from FUN_00596e92:
  //   weight = 0
  //   for i in 0..count-1:
  //     weight += 1
  //     if i > 3: weight += 1   (extra +1 after 4th)
  //     if i > 5: weight += 1   (extra +1 after 6th)
  baseIncrementPerPart:  1,     // @ 0x00596e92 — iVar1 = local_8 + 1
  thresholdA:            4,     // @ 0x00596e92 — if (3 < local_c) iVar1 = local_8 + 2
  bonusA:                1,     // extra +1 per part after index 4
  thresholdB:            6,     // @ 0x00596e92 — if (5 < local_c) local_8 = local_8 + 1
  bonusB:                1,     // extra +1 per part after index 6
  // Total per-part weight: 1 (base) + 1 (if idx>3) + 1 (if idx>5)
  // sourceAddr: '0x00596E92'
};

// --- Spaceship Success Rate & Travel Time ---
// Binary ref: FUN_00596eec (recalc_spaceship) @ block_00590000.c
export const SPACESHIP_FORMULAS = {
  // Success rate starts at 100% and is modified by fuel/propulsion ratios
  baseSuccessRate: 100,          // @ 0x00596eec — DAT_006ad0ec = 100

  // Fuel ratio: (life_support_actual * 100) / max(fuel_actual + propulsion_actual, 1)
  // Propulsion ratio: (solar_energy_actual * 200) / max(fuel_actual + propulsion_actual, 1)

  // Mass penalty: if total mass (DAT_006ad0f4) > 0x96 (150), success drops
  massPenaltyThreshold: 0x96,    // @ 0x00596eec — if (0x96 < DAT_006ad0f4)
  massPenaltyFormula: '-(mass - 0x96) / 10',  // @ 0x00596eec — DAT_006ad0ec - (DAT_006ad0f4 + -0x96) / 10

  // Habitation flag: civ_byte & 8 (from Apollo Program wonder, advance ID 0x20)
  habitationFlag:      0x08,     // @ 0x00596eec — (bVar1 & 8) != 0
  habitationDiscount:  '3/4',    // @ 0x00596eec — local_c = (int)(local_c * 3) >> 2
  habitationAdvanceId: 0x20,     // @ 0x00596eec — thunk_FUN_004bd9f0(param_1, 0x20)

  // Cost scaling: when mass > 100, doubles and doubles again
  massScaleLoop: 'while (100 < local_c) { local_c >>= 1; local_8 <<= 1; }',

  // Global computed values:
  totalMassGlobal:     'DAT_006ad0e4',  // total spaceship mass
  successRateGlobal:   'DAT_006ad0ec',  // final success percentage (0-100)
  fuelRatioGlobal:     'DAT_006ad0f0',  // fuel ratio percentage
  propulsionRatioGlobal:'DAT_006ad0e8', // propulsion ratio percentage
  travelTimeGlobal:    'DAT_006ad0f4',  // travel time in tenths-of-years
  lifeSupportGlobal:   'DAT_006ad0dc',  // life support ratio
  arrivalFallback:     'DAT_006ad0e0',  // arrival year for "all built" scenario

  // sourceAddr: '0x00596EEC'
};

// --- Spaceship Dialog Icons ---
// Binary ref: FUN_0059772c (spaceship_dialog) @ block_00590000.c
// Civilopedia icon IDs used in the spaceship dialog display
export const SPACESHIP_DIALOG_ICONS = {
  structural:   0x22,  // @ 0x0059772c — thunk_FUN_0040bc10(0x22) — structural parts count
  fuelPercent:  0x42,  // @ 0x0059772c — thunk_FUN_0040bc10(0x42) — fuel ratio %
  propulsion:   0xcd,  // @ 0x0059772c — thunk_FUN_0040bc10(0xcd) — propulsion ratio %
  habitation:   0xce,  // @ 0x0059772c — thunk_FUN_0040bc10(0xce) — habitation population
  duration:     0xd1,  // @ 0x0059772c — thunk_FUN_0040bc10(0xd1) — travel duration
  lifeSupport:  0xc8,  // @ 0x0059772c — thunk_FUN_0040bc10(200) — life support % (200 = 0xc8)
  habitBonus:   0xeb,  // @ 0x0059772c — thunk_FUN_0040bc10(0xeb) — habitation bonus indicator
  mass:         0xcf,  // @ 0x0059772c — thunk_FUN_0040bc10(0xcf) — total mass display
  massUnits:    0xd2,  // @ 0x0059772c — thunk_FUN_0040bc10(0xd2) — mass units label
  successRate:  0xd0,  // @ 0x0059772c — thunk_FUN_0040bc10(0xd0) — success rate %
  arrival:      0xd3,  // @ 0x0059772c — thunk_FUN_0040bc10(0xd3) — arrival year (when launched)
  noArrival:    0xd4,  // @ 0x0059772c — thunk_FUN_0040bc10(0xd4) — no arrival (not launched)
  arrivalYear:  0xda,  // @ 0x0059772c — thunk_FUN_0040bc10(0xda) — arrival year number
  // sourceAddr: '0x0059772C'
};

// --- Spaceship Dialog Strings ---
// Binary ref: FUN_0059772c, FUN_00598b4e @ block_00590000.c
export const SPACESHIP_DIALOG_STRINGS = {
  SPACESHIP:    's_SPACESHIP_00634fb4',   // @ 0x0059772c — main spaceship dialog title
  LAUNCH:       's_LAUNCH_00634ffc',      // @ 0x0059772c — launch confirmation dialog
  SPACESHIPS:   's_SPACESHIPS_00635024',  // @ 0x00598b4e — spaceships overview dialog
  NOSPACESHIPS: 's_NOSPACESHIPS_00635030',// @ 0x00598b4e — no spaceships to display
  NOFURTHER:    's_NOFURTHER_00635018',   // @ 0x00598197 — no further components available
  LAUNCHED:     's_LAUNCHED_00634fa8',     // @ 0x005973fd — spaceship launched notification
  // sourceAddr: '0x0059772C' (dialog), '0x00598B4E' (overview), '0x005973FD' (launch)
};

// --- AI Spaceship Thresholds ---
// Binary ref: FUN_00598197 (AI_add_component), FUN_00597d6f (AI_spaceship_build)
//             @ block_00590000.c
export const SPACESHIP_AI_THRESHOLDS = {
  // Minimum success rate for AI to consider launching (from AI_add_component)
  minSuccessToLaunch:   0x27,    // @ 0x00598197 — if (0x27 < DAT_006ad0ec) — 39% minimum
  // Force launch threshold when under pressure
  forceLaunchSuccess:   0x4b,    // @ 0x00598197 — bVar2 = 0x4b < DAT_006ad0ec — 75% threshold

  // Travel time comparison: AI won't launch if arrival is > 14 turns past current best
  travelTimeDelta:      0x0e,    // @ 0x00597d6f — 0xe < (arrival - current_turn) — 14 turns

  // AI checks rivalry score at DAT_00655c22 per civ for competitive pressure
  rivalryScoreAddr:     'DAT_00655c22',  // @ 0x00598197 — (&DAT_00655c22)[param_1]

  // Diplomacy flags set when AI launches ahead of rivals:
  diplomacyFlags: {
    sneakAttack:      0x20,      // @ 0x005973fd — *(uint*) |= 0x20
    declareWar:       0x40,      // @ 0x005973fd — *(uint*) |= 0x40
    clearMask:        0xffffffd9,// @ 0x005973fd — *(uint*) &= 0xffffffd9
    warAndSneak:      0x80840,   // @ 0x005973fd — *(uint*) |= 0x80840
  },

  // sourceAddr: '0x00598197' (AI add), '0x00597D6F' (AI build), '0x005973FD' (launch)
};


// ============================================================================
// 12. MOVE_UNIT DIALOG STRINGS & CONSTANTS
// ============================================================================

// --- Move Unit Dialog Strings ---
// Binary ref: FUN_0059062c (move_unit) @ block_00590000.c
// String references used in move_unit for various movement outcomes
export const MOVE_UNIT_DIALOGS = {
  NOTONMAP:      's_NOTONMAP_00634d2c',      // unit is off map boundary
  AMPHIB:        's_AMPHIB_00634d4c',        // amphibious landing blocked
  NONCOMBAT:     's_NONCOMBAT_00634d54',     // non-combat unit can't attack
  FIGHTER:       's_FIGHTER_00634d60',        // fighter can't land here
  NOEXPEL:       's_NOEXPEL_00634dc4',       // can't expel unit from this tile
  EXPEL:         's_EXPEL_00634d68',         // confirm expel dialog
  ALLIEDREPAIR:  's_ALLIEDREPAIR_00634d3c',  // allied unit repaired
  FATIGUE:       's_FATIGUE_00634dcc',       // unit fatigued (insufficient MP)
  NOLANDFALL:    's_NOLANDFALL_00634dd4',    // no valid landfall for sea transport
  LANDFALL:      's_LANDFALL_00634de0',      // confirm landfall dialog
  OCCUPY:        's_OCCUPY_00634dec',        // can't occupy (non-military unit)
  LONGMOVE:      's_LONGMOVE_00634e60',      // long move confirmation dialog
  LANDING:       's_LANDING_00634df4',       // air unit landing notification
  TRIREME:       's_TRIREME_00634e58',       // trireme lost at sea notification
  UPMINE:        's_UPMINE_00634d80',        // upgrade mine (single player)
  UPMINE_MP1:    's_UPMINE_00634d70',        // upgrade mine (MP, local player expels)
  UPYOURS:       's_UPYOURS_00634d78',       // diplomatic insult (local player)
  UPYOURS_SP:    's_UPYOURS_00634dbc',       // diplomatic insult (single player)
  UPYOURS_MP:    's_UPYOURS_00634dac',       // diplomatic insult (MP local)
  UPYOURS_MP2:   's_UPYOURS_00634db4',       // diplomatic insult (MP remote)
  UPYOURSTOO:    's_UPYOURSTOO_00634d88',    // diplomatic retort (MP, local allied)
  UPYOURSTOO_SP: 's_UPYOURSTOO_00634da0',   // diplomatic retort (single player)
  UPYOURSTOO_MP: 's_UPYOURSTOO_00634d94',   // diplomatic retort (MP remote)
  // sourceAddr: '0x0059062C'
};

// --- Move Unit Gameplay Constants ---
// Binary ref: FUN_0059062c (move_unit) @ block_00590000.c
export const MOVE_UNIT_CONSTANTS = {
  // Long move detection: counter increments each move, +0x0f if backtracking,
  // triggers LONGMOVE dialog when counter exceeds '/' (0x2f = 47)
  longMoveThreshold:      0x2f,   // @ 0x0059062c — if ('/' < counter) show LONGMOVE dialog
  backtrackIncrement:     0x0f,   // @ 0x0059062c — counter += 0x0f when direction reverses
  longMoveCounterField:   'unit_record + 0x0e',  // DAT_006560fe offset in unit record

  // AI stuck detection: AI unit resets after 0x13 (19) unsuccessful move attempts
  aiStuckThreshold:       0x13,   // @ 0x0059062c — if (0x13 < counter) reset unit orders
  aiStuckCounterField:    'unit_record + 0x0e',  // same counter field

  // Movement cost: terrain cost × cosmic movement points (DAT_0064bcc8)
  cosmicMovementPoints:   'DAT_0064bcc8',  // @ 0x0059062c — movement points per turn
  cosmicTriremeLoss:      'DAT_0064bcc9',  // @ 0x0059062c — trireme loss denominator

  // Trireme loss at sea: 1/N chance per turn at sea without adjacent land
  // Modified by wonders: Lighthouse (0x4b) doubles denominator, Magellan's (0x39) halves it
  lighthouseWonderId:     0x4b,   // @ 0x0059062c — thunk_FUN_004bd9f0(uVar10, 0x4b)
  magellansWonderId:      0x39,   // @ 0x0059062c — thunk_FUN_004bd9f0(uVar10, 0x39)
  triremeLandScanDirs:    9,      // @ 0x0059062c — for (local_38 = 0; local_38 < 9; ...)
  triremeMinDenominator:  2,      // @ 0x0059062c — if (local_c4 < 3) local_c4 = 2

  // Allied repair: movement cost = hit_points / 10, doubled if near fortress
  alliedRepairDivisor:    10,     // @ 0x0059062c — local_14 = local_14 / 10
  alliedRepairFortressMultiplier: 2,  // @ 0x0059062c — local_14 = local_14 << 1
  alliedRepairFortressCheck: 2,   // @ 0x0059062c — thunk_FUN_0043d20a(iVar11, 2)

  // Air unit fuel threshold: unit type index < 0x1e plays landing sound, >= 0x1e plays crash
  airUnitTypeThreshold:   0x1e,   // @ 0x0059062c — if (unit_type < 0x1e) play 0x1a else 0x4e

  // Diplomacy bitmasks in civ record area (DAT_0064c6c0):
  diplomacyFlags: {
    warCeasefirePeace:  0xe,      // @ 0x0059062c — (&DAT_0064c6c0)[...] & 0xe — any active treaty
    warOrCeasefire:     6,        // @ 0x0059062c — & 6 — war or ceasefire
    alliance:           8,        // @ 0x0059062c — & 8 — alliance flag
    sneakAttackSet:     0x20,     // @ 0x0059062c — |= 0x20 — set sneak attack flag
    warDeclare:         0x40,     // @ 0x0059062c — |= 0x40 — declare war
    alliedFlag:         0x80,     // @ 0x0059062c — & 0x80 — allied visibility
    clearTreatyMask:    0xffffffd9, // @ 0x0059062c — &= 0xffffffd9 — clear peace/ceasefire
    fullWarPackage:     0x80840,  // @ 0x0059062c — |= 0x80840 — full war + sneak + hostile
  },

  // Network messages sent during movement:
  networkMessages: {
    UNIT_VISIBILITY:   0x71,  // @ 0x0059062c — thunk_FUN_0046b14d(0x71, ...) — tile visibility update
    TILE_REDRAW:       0x72,  // @ 0x0059062c — thunk_FUN_0046b14d(0x72, ...) — tile redraw
    AREA_REDRAW:       0x75,  // @ 0x0059062c — thunk_FUN_0046b14d(0x75, ...) — area redraw radius 1
    UNIT_MOVE:         0x70,  // @ 0x0059062c — thunk_FUN_0046b14d(0x70, ...) — unit move animation
    REALTIME_MOVE:     0x5a,  // @ 0x0059062c — thunk_FUN_0046b14d(0x5a, ...) — realtime move data
  },

  // Realtime move timeout: 0xe10 ticks (3600) waiting for server response
  realtimeMoveTimeout:    0xe10,  // @ 0x0059062c — while (iVar17 - iVar15 < 0xe10 && ...)
  serverTimeoutMsg:       's_SERVERCONNECTTIME_00634e3c',  // @ 0x0059062c

  // sourceAddr: '0x0059062C'
};


// ============================================================================
// 11. IMPROVEMENT / RULES EDITOR (Scenario Editor)
// ============================================================================

// --- Improvement/Wonder Editor Main ---
// FUN_004da107 @ 0x004DA107 (2205 bytes) — editor_main
// FUN_004d8bc0 @ 0x004D8BC0 (448 bytes) — editor_load_data
// FUN_004d8d80 @ 0x004D8D80 (332 bytes) — editor_populate_fields
// FUN_004d8ed6 @ 0x004D8ED6 (437 bytes) — editor_save_data
// FUN_004d90b0 @ 0x004D90B0 (328 bytes) — editor_write_improvements_section
// FUN_004d91f8 @ 0x004D91F8 (162 bytes) — editor_write_wonders_section
// FUN_004d93b9 @ 0x004D93B9 (390 bytes) — editor_rename_improvement
// FUN_004d9619 @ 0x004D9619 (250 bytes) — editor_misc_properties
// FUN_004d9718 @ 0x004D9718 (342 bytes) — editor_on_list_select
// FUN_004d986e @ 0x004D986E (551 bytes) — editor_create_field_controls
// FUN_004d9a9f @ 0x004D9A9F (244 bytes) — editor_create_dropdown
// FUN_004d9b93 @ 0x004D9B93 (1396 bytes) — editor_paint (renders pedia + fields)
export const IMPROVEMENT_EDITOR = {
  sourceAddr: '0x004DA107',

  // --- Entry Count and Layout ---
  entryCount:       0x43,    // 67 entries total (improvements + wonders)        // 0x004D8BC0
  wonderCutoff:     0x27,    // entries 0x00-0x26 are improvements,              // 0x004D91F8
                             // entries 0x27-0x42 are wonders
  initialSelection: 1,       // editor starts with entry 1 selected             // 0x004DA107
  listControlId:    0xC9,    // 201 — list control ID for improvement list       // 0x004D9718

  // --- Data Record Layout ---
  // Improvement names stored at DAT_006a1d88, stride 0x28 (40 bytes each)
  nameTable: {
    base: 'DAT_006a1d88',                                                        // 0x004D8BC0
    stride: 0x28,              // 40 bytes per name entry                        // 0x004D8BC0
    maxNameLength: 0x19,       // 25-char max copied via strncpy                 // 0x004D8BC0
  },
  // String table entries for improvement names at DAT_0064c488, stride 8
  stringTable: {
    base: 'DAT_0064c488',     // string table pointer per entry                 // 0x004D8BC0
    stride: 8,                 // 8 bytes per entry (pointer + 3 data bytes)     // 0x004D8BC0
  },
  // Numeric fields per entry at DAT_0064c48c/c48d/c48e, stride 8
  fieldOffsets: {
    field0: 'DAT_0064c48c',   // byte field 0 (e.g. cost)                       // 0x004D8BC0
    field1: 'DAT_0064c48d',   // byte field 1 (e.g. upkeep)                     // 0x004D8BC0
    field2: 'DAT_0064c48e',   // byte field 2 (e.g. prerequisite)               // 0x004D8BC0
    stride: 8,                 // same stride as string table                    // 0x004D8BC0
  },
  // Wonder-specific extra field at DAT_0064ba01 (only for entries >= 0x27)
  wonderExtraField: {
    base: 'DAT_0064ba01',     // wonder obsolescence tech                        // 0x004D8BC0
    note: 'only written for entries >= 0x27 (wonders)',                           // 0x004D8BC0
  },

  // --- Supplementary Data Tables ---
  // Improvement detail records at DAT_006a2d28 (stride 0x58 = 88 bytes)
  detailTable: {
    base: 'DAT_006a2d28',     // improvement detail records                      // 0x004D8BC0
    stride: 0x58,              // 88 bytes per record                            // 0x004D8BC0
  },
  // Tech list at DAT_006a2a00 (indexed by field * 4 + entryIndex * 0x58)
  techLookup: {
    base: 'DAT_006a2a00',                                                        // 0x004D8D80
  },

  // --- Editor Field Types ---
  // The editor uses two field types for editable columns:
  fieldTypes: {
    NUMERIC_INPUT:  9,         // text input field — uses atoi, sprintf          // 0x004D8D80
    DROPDOWN_LIST:  0xC,       // dropdown list — uses thunk_FUN_00418d60/90     // 0x004D8D80
    fieldTypeTable: 'DAT_0062e3c0',  // field type array, stride 8              // 0x004D8D80
    fieldParamTable:'DAT_0062e3c4',  // field param array (paired with type)    // 0x004D986E
  },
  // Editor has 5 columns (loop 1..4 for data fields, plus name at index 0)
  fieldCount:       5,         // loop local_460 = 0 to 4                        // 0x004DA107

  // --- Editor Validation ---
  // DAT_0062e3e8/DAT_0062e3f0 hold min/max for numeric fields
  numericValidation: {
    minTable: 'DAT_0062e3e8',                                                    // 0x004D8ED6
    maxTable: 'DAT_0062e3f0',                                                    // 0x004D8ED6
    clampFn: 'thunk_FUN_005adfa0(value, min, max)',                              // 0x004D8ED6
    offsetFromControlId: -0xCA,  // iVar1 = thunk_FUN_00418740() - 0xCA          // 0x004D8ED6
  },

  // --- Display Size ---
  displaySize: { width: 0x230, height: 0x17C },  // 560 x 380 pixels            // 0x004DA107

  // --- Sprite / Background ---
  editorGif:    'EDITORAS.GIF',   // background sprite                           // 0x004DA107
  gifLoadParams: { param1: 10, param2: 0xC0 },                                  // 0x004DA107

  // --- String Table Offsets (DAT_00628420 + offset) ---
  // These reference entries in the master string table for labels
  stringTableOffsets: {
    dialogTitle:   0x730,      // dialog title string                            // 0x004DA107
    renamePrompt:  0x7D8,      // "Rename" prompt label                          // 0x004D95C6
    pediaButton:   0x7C0,      // "Civilopedia" label (button 1)                 // 0x004D986E
    advancesButton:0x7C4,      // "Advances" label (button 2)                    // 0x004D986E
    effectsButton: 0x8EC,      // "Effects" label (button 3)                     // 0x004DA107
    miscButton:    0x3FC,      // "Misc" label (button 4)                        // 0x004DA107
    navPrev:       0x3F8,      // prev navigation button                         // 0x004DA107
    navNext:       0xA8,       // next navigation button                         // 0x004DA107
    wonderLabel:   0x8F0,      // wonder-specific label                          // 0x004DA107
    miscLabel:     0x7CC,      // misc properties label                          // 0x004DA107
  },

  // --- GAME.TXT Keys ---
  textFileKeys: {
    pedia:       'PEDIAIMPROVE', // civilopedia lookup for improvement            // 0x004D9B93
    pediaFile:   'PEDIA',        // pedia file section key                       // 0x004D9B93
    rename:      'IMPRNAME',     // rename dialog key                            // 0x004D93B9
    miscDialog:  'IMPRMISC',     // miscellaneous properties dialog              // 0x004D9619
    improvements:'IMPROVEMENTS', // improvements section header                   // 0x004D953F
    improve:     'IMPROVE',      // used with ENDWONDER for file I/O             // 0x004D929A
    endWonder:   'ENDWONDER',    // end-of-wonders marker                        // 0x004D929A
    notice:      'NOTICE',       // validation notice key                        // 0x004D929A
    debugSection:'DEBUG',        // parent dialog section                         // 0x004D93B9
  },

  // --- Pedia Text Rendering ---
  pediaArea: {
    bgColor:   0x29,         // background fill color                            // 0x004D9B93
    outlineColor: 10,        // outline rect color                               // 0x004D9B93
    offsetX:   0x32,         // pedia text area X offset from window left        // 0x004D9B93
    offsetY:   0xE8,         // pedia text area Y offset from window top         // 0x004D9B93
    width:     0x1CC,        // pedia area width                                 // 0x004D9B93
    height:    0x6E,         // pedia area height                                // 0x004D9B93
    caretChar: '^',          // skip caret prefix in pedia text lines            // 0x004D9B93
  },

  // --- Name Display ---
  nameDisplay: {
    boxOffset: { x: 0x20, y: 0x20 },  // name box position relative to window   // 0x004D9B93
    boxSize:   { w: 0x48, h: 0x28 },  // name box size                          // 0x004D9B93
    borderSize: 6,                      // 3D border depth                        // 0x004D9B93
    emptyEntryColor: 10,               // color when entry index == 0            // 0x004D9B93
  },

  // --- Improvement vs Wonder Distinction ---
  // Entries < 0x27 use FUN_0043c5f0 (city improvement view)
  // Entries >= 0x27 use FUN_0040f380 (wonder view)
  // Also: entries < 0x27 -> DAT_00645160 + idx*0x3c (improvement detail record)
  //        entries >= 0x27 -> DAT_00645a84 + (idx*4 - 0x9c)*0xf (wonder detail record)
  improvementDetailBase: 'DAT_00645160',
  improvementDetailStride: 0x3C,                                                 // 0x004D9B93
  wonderDetailBase: 'DAT_00645a84',
  wonderDetailFormula: '(idx * 4 - 0x9c) * 0xf',                                // 0x004D9B93

  // --- Misc Properties Sub-dialog ---
  // FUN_004d9619: option 0 -> DAT_00640b98 (5 params), options 1+ -> DAT_00647168
  miscProperties: {
    option0Base: 'DAT_00640b98',    // global misc properties                    // 0x004D9619
    option0ParamCount: 5,            // field count for option 0                  // 0x004D9619
    otherBase:  'DAT_00647168',      // per-improvement misc data                // 0x004D9619
    otherParamCount: 6,              // field count for options 1+                // 0x004D9619
    formula:    '(iVar1 * 4 - 4) * 0xF',  // offset formula for option > 0      // 0x004D9619
  },

  // --- Button Positions ---
  // Field control positions from DAT_0062e398/DAT_0062e39c (for dropdowns/inputs)
  fieldPositionTable: {
    base: 'DAT_0062e398',     // X positions, stride 8                           // 0x004D986E
    yBase:'DAT_0062e39c',     // Y positions, stride 8                           // 0x004D986E
    dropdownWidth: 200,        // dropdown list width param                      // 0x004D986E
    shift: 3,                  // width = this+0x2e8 << 3                        // 0x004D986E
  },
  // Dropdown label positions from DAT_0062e3b0/DAT_0062e3b4
  labelPositionTable: {
    base: 'DAT_0062e3b0',     // X positions, stride 8 (2 ints)                 // 0x004D9A9F
    yBase:'DAT_0062e3b4',     // Y positions, stride 8                           // 0x004D9A9F
    height: 0x30,              // label height                                   // 0x004D9A9F
  },

  // --- Tech List for Dropdown ---
  techEntryCount: 100,         // dropdown iterates 0..99 for tech list          // 0x004D986E
  techEntryBase: 'DAT_00627684',  // tech name table, stride 0x10               // 0x004D986E
};

// ============================================================================
// 13. MENU COMMAND IDS (WM_COMMAND dispatch table)
// ============================================================================

// Binary ref: FUN_004e2803 @ block_004E0000.c (4219 bytes)
// Main WM_COMMAND handler dispatching menu/toolbar commands
export const MENU_COMMAND_IDS = {
  // --- Game menu ---
  GAME_OPTIONS:     0x101,    // FUN_004e0ab0 — game options dialog (GAMEOPTIONS)
  GRAPHIC_OPTIONS:  0x102,    // FUN_004e0d71 — graphic options dialog (GRAPHICOPTIONS)
  MESSAGE_OPTIONS:  0x103,    // FUN_004e1452 — message options dialog (MESSAGEOPTIONS)
  CITY_REPORT_OPTIONS: 0x104, // FUN_004e0f18 — city report options
  MULTIPLAYER_OPTIONS: 0x105, // FUN_004259a6 — multiplayer options
  AUTOPILOT:        0x106,    // FUN_004e25ef — autopilot toggle
  SAVE_GAME:        0x110,    // save_game(0)
  LOAD_GAME:        0x120,    // FUN_004e068d — load game
  SET_PASSWORD:     0x130,    // FUN_00522b2b — set password
  RETIRE:           0x131,    // FUN_0049836a — retire (with current civ)
  REVOLUTION:       0x132,    // FUN_0055b2c6 — revolution (change government)

  // --- View menu ---
  SAVE_AND_QUIT:    0x1F0,    // FUN_004e22c9(1) — save and quit to menu
  QUIT_WITHOUT_SAVE:0x1F1,    // FUN_004e22c9(0) — quit without saving
  QUIT_HOTSEAT:     0x1F2,    // quit hotseat game (with confirmation)

  // --- Kingdom menu ---
  TAX_RATE:         0x201,    // FUN_0040ddc6 — tax rate dialog
  FIND_CITY:        0x205,    // FUN_0044cd9b — find city
  PALACE:           0x210,    // FUN_0040e017 — palace view
  REVOLUTION_KINGDOM: 0x220,  // FUN_0040e3b1 — revolution (Kingdom menu, confirms + sets anarchy)

  // --- View menu (continued) ---
  ZOOM_IN:          0x310,    // increment zoom level (DAT_0066CA8C + 1, max 8)
  ZOOM_OUT:         0x311,    // decrement zoom level (DAT_0066CA8C - 1, min -7)
  MAX_ZOOM_IN:      0x320,    // DAT_0066CA8C = 8
  ARRANGE:          0x321,    // reset zoom + center on capital
  MEDIUM_ZOOM:      0x322,    // DAT_0066CA8C = -3
  MAX_ZOOM_OUT:     0x324,    // DAT_0066CA8C = -7
  TOGGLE_MAP_GRID:  0x327,    // DAT_00655AEA ^= 0x20 — toggle grid overlay
  CENTER_VIEW:      0x328,    // FUN_004e02ef — center view on active unit
  TOGGLE_FOG:       0x330,    // FUN_004e2597 — toggle fog of war
  PLACE_POLLUTION:  0x340,    // FUN_00410402 — place pollution (cheat)

  // --- Advisors menu ---
  CITY_STATUS:      0x301,    // FUN_00489a0d(1) — city status advisor
  DEFENSE_MINISTER: 0x302,    // FUN_004897fa(0) — defense minister
  CIVILOPEDIA:      0x401,    // FUN_0058be56 — civilopedia
  DEMOGRAPHICS:     0x430,    // FUN_0058ddce — demographics
  SPACESHIP:        0x441,    // FUN_0058d60a — spaceship
  TOP_5_CITIES:     0x442,    // FUN_0058df7b — top 5 cities
  ATTITUDE_ADVISOR: 0x450,    // FUN_0058cce6 — attitude advisor
  TRADE_ADVISOR:    0x451,    // FUN_0058cde5 — trade advisor
  SCIENCE_ADVISOR:  0x460,    // FUN_0058c295 — science advisor
  HISTORIANS:       0x468,    // FUN_0058d442 — historians replay
  INTELLIGENCE:     0x470,    // FUN_0058bdfd — intelligence report
  MILITARY_ADVISOR: 0x480,    // FUN_0058bd60 — military advisor (losses)
  POWER_GRAPH:      0x490,    // FUN_0058bd84 — power graph

  // --- Reports menu ---
  WORLD_MAP:        0x500,    // FUN_00516570 — world map (shift=cheat view)
  SCIENCE_REPORT:   0x501,    // FUN_0042d71e — science report
  TAX_REPORT:       0x502,    // FUN_0042f079 — tax report
  MILITARY_REPORT:  0x503,    // FUN_004308ae — military report
  TRADE_REPORT:     0x504,    // FUN_0042e185 — trade report
  WONDER_REPORT:    0x505,    // FUN_0042cd2f — wonder report
  HAPPINESS_REPORT: 0x506,    // FUN_0042b67d — happiness report
  SCORE:            0x507,    // FUN_004b7eb6 — score (hall of fame)
  POLLUTION_REPORT: 0x508,    // FUN_0043856b — pollution report

  // --- Civilopedia categories ---
  PEDIA_ADVANCES:   0x410,    // FUN_0058c65e(5)
  PEDIA_CITY_IMPROVEMENTS: 0x411, // FUN_0058c65e(6)
  PEDIA_WONDERS:    0x412,    // FUN_0058c65e(7)
  PEDIA_UNITS:      0x413,    // FUN_0058c65e(8)
  PEDIA_GOVERNMENTS:0x417,    // FUN_0058c65e(10)
  PEDIA_TERRAIN:    0x418,    // FUN_0058c65e(4)
  PEDIA_GAME:       0x41B,    // FUN_0058df14 — game concepts
  PEDIA_MISC:       0x420,    // FUN_0058c65e(9)
  PEDIA_SEARCH:     0x421,    // FUN_0058cfcd — civilopedia search

  // --- Diplomacy ---
  FOREIGN_MINISTER: 0x440,    // FUN_0058d6af — foreign minister
  EMBASSY_REPORT:   0x445,    // FUN_0058cbe1 — embassy report

  // --- City/Unit ---
  CITY_LIST:        0x601,    // FUN_00431c73 — city list (shift=cheat edit)
  DEFENSE_REPORT:   0x602,    // FUN_00433122 — defense report (shift=cheat)
  PRODUCTION_REPORT:0x603,    // FUN_00435d15 — production report (shift=cheat)
  TRADE_ROUTES:     0x605,    // FUN_00434d8a — trade routes (shift=cheat)
  SPACESHIP_REPORT: 0x606,    // FUN_00598b4e — spaceship report (shift=cheat)

  // --- Cheat menu (requires DAT_00655AEA & 0x8000 and DAT_00655B02 == 0) ---
  CHEAT_MONEY:      0x701,    // FUN_00554297 — edit gold
  CHEAT_CREATE_UNIT:0x711,    // FUN_005551b3 — create unit
  CHEAT_REVEAL_MAP: 0x712,    // FUN_0055560f — reveal map
  CHEAT_SET_GOVT:   0x713,    // FUN_0055583f — set government
  CHEAT_TECH:       0x721,    // FUN_00555a02 — give/take technology
  CHEAT_FORCE_GOVT: 0x722,    // FUN_00555a8b — force government
  CHEAT_CHANGE_TERRAIN: 0x731,// FUN_00554423 — change terrain
  CHEAT_DESTROY_ALL:0x732,    // FUN_005545d3 — destroy all units
  CHEAT_CHANGE_MONEY:0x740,   // FUN_00554962 — change civ money
  CHEAT_EDIT_KING:  0x748,    // FUN_005549f — edit king
  CHEAT_SCENARIO:   0x750,    // FUN_00555cb1 — scenario params
  CHEAT_SAVE_MAP:   0x752,    // FUN_0055615c — save map
  CHEAT_SAVE_GIF:   0x755,    // FUN_0055625b — save as GIF
  CHEAT_SET_CITY:   0x760,    // set_city_shields — set city production
  CHEAT_GLOBAL_WARM:0x765,    // FUN_00556f54 — global warming
  CHEAT_EDIT_UNIT:  0x768,    // FUN_005582ad — edit unit
  CHEAT_EDIT_CITY:  0x770,    // FUN_0055891d — edit city

  // --- Help / Editor menu ---
  HELP_CONTENTS:    0x801,    // FUN_00553ff6 — help contents
  HELP_SEARCH:      0x802,    // FUN_00417566 — help search
  HELP_HOW:         0x803,    // FUN_00429e77 — how to play
  HELP_STRATEGY:    0x804,    // FUN_0058760d — strategy tips
  HELP_ABOUT:       0x805,    // FUN_004da9e2 — about dialog
  MP_ADMIN:         0x806,    // FUN_0051c635 — multiplayer admin panel
  DIPLOMACY_DEBUG:  0x807,    // FUN_004a5d92 — diplomacy debug dialog
  VIEW_REPLAY:      0x808,    // FUN_005b1a29 — view replay
  EVENT_EDITOR:     0x809,    // FUN_0054ffc8 — scenario event editor

  // --- Pedia / Advisor pages ---
  MP_COUNCIL:       0x901,    // FUN_004f7bd1(1,1) — advisor page 1 (council)
  ADVISOR_PAGE_2:   0x903,    // FUN_004f7bd1(2,1) — advisor page 2
  ADVISOR_PAGE_3:   0x905,    // FUN_004f7bd1(3,1) — advisor page 3
  ADVISOR_PAGE_4:   0x907,    // FUN_004f7bd1(4,1) — advisor page 4
  ADVISOR_PAGE_6:   0x909,    // FUN_004f7bd1(6,1) — advisor page 6
  ADVISOR_PAGE_5:   0x90B,    // FUN_004f7bd1(5,1) — advisor page 5
  ADVISOR_PAGE_7:   0x90D,    // FUN_004f7bd1(7,1) — advisor page 7 (shift+0x905 → FUN_004e01b0 cheat)
  CREDITS:          0x9F0,    // s_NEWCREDITS_0062ed20 — credits dialog (guard: DAT_00655b02 < 3)

  // --- Menu bar build function (FUN_004e3a86) ---
  // Menus are built in order: 1=Game, 2=Kingdom, 3=View, 4=Orders, 5=Advisors, 6=World, 7=Cheat, 8=Editor, 9=Pedia
  // Section string refs: s_KINGDOM_0062ed3c, s_ORDERS_0062ed4c, s_ADVISORS_0062ed54,
  //   s_WORLD_0062ed60, s_CHEAT_0062ed68, s_EDITOR_0062ed70, s_PEDIA_0062ed78
  // Accelerator key 0x3c (Ctrl) on: 0x401, 0x410, 0x411, 0x412, 0x413, 0x445
  // CheckState for 0x327 (grid toggle) from (DAT_00655aea & 0x20) >> 5
  // Cheat menu visible: (DAT_00655aea & 0x8000) != 0 AND DAT_00655b02 == 0
  // Editor enable check: DAT_00655af0 & 0x80 AND strcmp(DAT_0064bb08, DAT_00655020) != 0
  // 0x801 enable: DAT_00655b02 != 0 (scenario/MP context)
  // Timer 0x1BBC dispatched at top of FUN_004e3a86

  // --- Shift+cheat alternate handlers (World menu items) ---
  // 0x601 + shift+cheat → FUN_004e01b0 (edit city list cheat)
  // 0x602 + shift+cheat → FUN_004702e0 (defense edit cheat)
  // 0x603 + shift+cheat → FUN_00514e7b (production edit cheat)
  // 0x605 + shift+cheat → FUN_004710d0(-(DAT_006d1da0+1 & 7)) (trade route cheat)
  // 0x606 + shift+cheat → FUN_004710d0(DAT_006d1da0) (spaceship cheat)

  // --- Quit hotseat ---
  // 0x1F2 guarded by DAT_00655b02 == 1 (hotseat mode)
  // Dialog key: s_REALLYQUIT_0062ed14 → confirms, then FUN_0046e6a9 + FUN_00484d3b

  sourceAddr: '0x004E2803',
  menuBuildAddr: '0x004E3A86',
};

// --- Menu Enable/Disable State Machine ---
// FUN_004e4ceb (3761 bytes): called at turn start to enable/disable menu items
// based on game mode (SP/MP), unit state, terrain, and scenario flags.
// Uses thunk_FUN_005792e1(menuId, enabled) and thunk_FUN_005794cf(menuPos, enabled).
export const MENU_ENABLE_STATE = {
  sourceAddr: '0x004E4CEB',

  // --- Spaceship report: DAT_00655ae8 & 0x80 (scenario flag) ---
  spaceshipEnable: { menuId: 0x606, condition: 'DAT_00655ae8 & 0x80' },

  // --- Single-player enables (DAT_00655b02 == 0) ---
  singlePlayer: {
    enables: [0x130, 0x132, 0x507, 0x104, 0x105],  // set password, revolution, score, city report, MP options
    disables: [0x120, 0x9F0],                        // load game, credits
  },

  // --- Multiplayer enables (DAT_00655b02 != 0) ---
  multiplayer: {
    credits:  { menuId: 0x9F0, enabled: true },
    cityReport: { menuId: 0x104, enabled: false },
    mpOptions:  { menuId: 0x105, enabled: false },
    cheatMoney: { menuId: 0x701, condition: 'DAT_0062eb30 == 0' },
    loadGame:   { menuId: 0x120, enabled: true },
    password:   { menuId: 0x130, condition: 'DAT_00654c74 == 0 || DAT_00655b02 != 1' },
    findCity:   { menuId: 0x205, condition: 'DAT_00655b02 == 1 (hotseat only)' },
    score:      { menuId: 0x507, condition: 'DAT_00655b02 < 3 (not internet MP)' },
    revolution: { menuId: 0x132, condition: 'DAT_00655b02==2 OR DAT_006ad2f7==0' },
    saveGame:   { menuId: 0x110, condition: 'DAT_00655b02 == 2 (only PBEM)' },
    quitNoSave: { menuId: 0x1F1, enabled: false },
    saveAndQuit:{ menuId: 0x1F0, enabled: false },
  },

  // --- Advisor enables ---
  defenseMinister: { menuId: 0x302, condition: 'DAT_006d1da8 == 0 (no active unit)' },
  cityStatus:      { menuId: 0x301, condition: 'DAT_006d1da8 == 1 (unit active)' },

  // --- Revolution (Kingdom menu) enable: scenario mode + tech paradigm flag + government type ---
  revolutionKingdom: { menuId: 0x220, condition: '(DAT_00655af0 & 0x80)==0 || (DAT_0064bc60 & 0x10)==0 or govt!=0' },

  // --- Orders menu: disabled when no active unit or no units alive ---
  ordersMenu: {
    disableCondition: 'DAT_006d1da8==0 || DAT_00655b16==0 || DAT_00655afe<0 || no alive unit',
    affectedMenuPos: 4,  // thunk_FUN_005794cf(4, 1) = disable Orders menu
    scienceAdvisor: { menuId: 0x460, enabled: false },
    historians:     { menuId: 0x468, enabled: false },
  },

  // --- Unit-type dependent enables (when active unit exists) ---
  unitTypeEnables: {
    // Unit domain check: DAT_0064b1ca[unitType*0x14] == 5 (settler domain)
    settlerDomainId: 5,
    settlerMenuIds: {
      civilopedia:    { menuId: 0x401, condition: 'domain != settler' },
      pediaAdvances:  { menuId: 0x410, greyed: 'terrain-dependent' },
      pedaImprovements: { menuId: 0x411, greyed: 'improvement-dependent' },
      pediaWonders:   { menuId: 0x412, greyed: 'railroad-dependent' },
    },
    attitudeAdvisor: { menuId: 0x450, condition: 'domain == settler (settlers only)' },
    pediaTerrain:    { menuId: 0x418, techReq: 0x12 },  // requires Invention (0x12) tech
    pedaGovernments: { menuId: 0x417, techReq: 0x42 },  // requires tech 0x42
    demographics:    { menuId: 0x430, condition: 'domain == settler' },
    pediaGame:       { menuId: 0x41B, condition: 'domain != settler' },

    // --- Spaceship enable ---
    spaceship: { menuId: 0x441, condition: 'has tech 0xd AND unit flag bit 0x100 clear' },

    // --- Top 5 Cities ---
    top5Cities: { menuId: 0x442, condition: 'no city on tile (thunk_FUN_005b8ca6 < 0)' },

    // --- Embassy report (requires city on tile) ---
    embassy: { menuId: 0x445, condition: 'city exists at unit position' },

    // --- Build unit (requires available build type) ---
    pediaUnits: { menuId: 0x413, condition: 'thunk_FUN_004bfe5a returns 0 (can build)' },

    // --- Pedia search ---
    pediaSearch: { menuId: 0x421, condition: 'domain == settler; also if no moves or no road tech' },
  },

  // --- Cheat menu visibility ---
  cheatMenu: {
    menuPos: 7,
    visibleCondition: 'DAT_00655aea bit 15 (0x80 in byte 1) set AND DAT_00655b02 == 0',
    moneyEnable: { menuId: 0x701, condition: 'DAT_00655b02 != 0 AND DAT_0062eb30 == 0' },
  },

  // --- Editor menu ---
  editorMenu: {
    menuPos: 8,
    visibleCondition: 'DAT_00655aea bit 15 set AND DAT_00655b02==0 AND DAT_00655af0 & 0x80 AND strcmp(DAT_0064bb08, DAT_00655020) != 0',
    helpEnable: { menuId: 0x801, condition: 'DAT_00655b02 != 0' },
  },

  // --- Remote MP: orders menu disabled for other players ---
  remoteMpDisable: {
    condition: 'DAT_00655b02 > 2 AND DAT_006ad578 != DAT_006d1da0',
    affectedMenuPos: 4,  // Orders menu disabled
  },
};


// ============================================================================
// 13. SCENARIO EVENT SYSTEM
// ============================================================================

// --- Scenario Event Memory & Structure ---
// Binary ref: FUN_0054d7ef (trigger/action editor), FUN_0054f3b9 (event editor main),
//             show_messagebox_D4E6 (trigger picker) @ block_00540000.c
// Events are stored as a linked list in a preallocated 50,000-byte buffer.
export const SCENARIO_EVENT_SYSTEM = {
  memoryAllocation: 50000,          // @ FUN_00540000 — thunk_FUN_004fa5d9(50000)
  eventListHead: 'DAT_0064b99c',    // head of linked list                       // 0x00540000
  nextPointerOffset: 0x1BC,         // offset to next-event pointer in record    // 0x00473d5e (save)
  eventRecordSize: 0x1BC,           // 444 bytes of event data per record        // 0x00473d5e (save)

  // --- Trigger Types (bitmask, one bit per trigger) ---
  // 9 trigger types, tested as bit flags in trigger bitmask field
  triggerTypes: {
    TURN_INTERVAL:      0x001,      // fires every N turns                       // 0x0054d7ef
    UNIT_KILLED:        0x002,      // specific unit type killed                 // 0x0054d7ef
    NO_CITIES_LEFT:     0x004,      // civ has no remaining cities               // 0x0054d7ef
    CITY_TAKEN:         0x008,      // specific city captured                    // 0x0054d7ef
    TURN_NUMBER:        0x010,      // fires on exact turn number                // 0x0054d7ef
    NEGOTIATION:        0x020,      // diplomacy contact occurs                  // 0x0054d7ef
    SCENARIO_LOADED:    0x040,      // fires when scenario first loads           // 0x0054d7ef
    RECEIVED_TECH:      0x080,      // civ receives a technology                 // 0x0054d7ef
    RANDOM_TURN:        0x100,      // random chance each turn                   // 0x0054d7ef
  },
  triggerTypeCount: 9,              // bits 0-8 (values 1-0x100)                 // 0x0054d7ef

  // --- Action Types (bitmask, one bit per action) ---
  // 13 action types, tested as bit flags in action bitmask field
  actionTypes: {
    MOVE_UNIT:          0x0001,     // move unit to location                     // 0x0054d7ef
    CREATE_UNIT:        0x0002,     // create new unit                           // 0x0054d7ef
    CHANGE_MONEY:       0x0004,     // add/subtract gold                         // 0x0054d7ef
    MAKE_AGGRESSION:    0x0008,     // declare war between civs                  // 0x0054d7ef
    PLAY_CD_TRACK:      0x0010,     // play audio CD track                       // 0x0054d7ef
    CHANGE_TERRAIN:     0x0020,     // modify map terrain                        // 0x0054d7ef
    DESTROY_BUILDINGS:  0x0040,     // destroy city buildings                    // 0x0054d7ef
    GIVE_TECH:          0x0080,     // give technology to civ                    // 0x0054d7ef
    MODIFY_FLAG:        0x0100,     // modify scenario/game flag                 // 0x0054d7ef
    TRANSPORT:          0x0200,     // transport unit                            // 0x0054d7ef
    PLAY_WAV:           0x0400,     // play WAV sound file                       // 0x0054d7ef
    DISPLAY_TEXT:       0x0800,     // show text popup                           // 0x0054d7ef
    TAKE_TECH:          0x1000,     // remove technology from civ                // 0x0054d7ef
    NEGOTIATE:          0x2000,     // force diplomacy contact                   // 0x0054d7ef
  },
  actionTypeCount: 13,              // bits 0-12 (values 1-0x2000)               // 0x0054d7ef
  maxActionsPerEvent: 0x0D,         // 13 actions max per event                  // 0x0054d7ef

  // --- Negotiation Target Types ---
  negotiationTypes: {
    HUMAN:              1,          // triggers only for human players            // 0x0054d7ef
    COMPUTER:           2,          // triggers only for AI players              // 0x0054d7ef
    HUMAN_OR_COMPUTER:  4,          // triggers for either                       // 0x0054d7ef
  },

  // --- Special Target Civ IDs ---
  specialTargets: {
    ANYBODY:            -2,         // any civ                                   // 0x0054d7ef
    TRIGGER_ATTACKER:   -3,         // civ that triggered the event (attacker)   // 0x0054d7ef
    TRIGGER_RECEIVER:   -4,         // civ that was acted upon (receiver/defender) // 0x0054d7ef
  },

  // --- CD Track Range ---
  cdTrackRange: { min: 2, max: 0x18 },  // tracks 2-24                          // 0x0054d7ef

  // --- Event Record String Pointers ---
  // The event record contains up to 0x14 (20) string pointers at offsets 0x38..0x87
  stringSlots: 0x14,                // 20 string pointer slots per event         // 0x00473d5e (save)
  stringSlotBaseOffset: 0x38,       // first string pointer at record+0x38       // 0x00473d5e (save)

  // --- Linked List Structure ---
  prevPointerOffset: 0x1C0,         // offset to prev-event pointer in record    // 0x0054c36e (delete)
  // Record layout: [0x000..0x1BB] event data, [0x1BC] next ptr, [0x1C0] prev ptr

  // --- EVENTS.TXT File Format Keywords ---
  // Section delimiters (prefixed with '@' in file)
  fileKeywords: {
    BEGINEVENTS:  '@BEGINEVENTS',   // start of event block                      // 0x004F parser
    ENDEVENTS:    '@ENDEVENTS',     // end of event block                        // 0x004F parser
    IF:           '@IF',            // start of trigger section                  // 0x004F parser
    THEN:         '@THEN',          // start of action section                   // 0x004F parser
    ENDIF:        '@ENDIF',         // end of single event                       // 0x004F parser
    DEBUG:        '@DEBUG',         // enable parser debug output                // 0x004F parser
  },

  // --- Trigger Keywords (EVENTS.TXT) ---
  // These appear after @IF to define what fires the event
  triggerKeywords: {
    UNITKILLED:         'UNITKILLED',         // trigger type 0x01 (bit 0)       // 0x004F:4652
    CITYTAKEN:          'CITYTAKEN',          // trigger type 0x02 (bit 1)       // 0x004F:4989
    TURN:               'TURN',               // trigger type 0x04 (bit 2)       // 0x004F:5074
    TURNINTERVAL:       'TURNINTERVAL',       // trigger type 0x08 (bit 3)       // 0x004F:5119
    NEGOTIATION:        'NEGOTIATION',        // trigger type 0x10 (bit 4)       // 0x004F:4744
    SCENARIOLOADED:     'SCENARIOLOADED',     // trigger type 0x20 (bit 5)       // 0x004F:5202
    RANDOMTURN:         'RANDOMTURN',         // trigger type 0x40 (bit 6)       // 0x004F:5159
    NOSCHISM:           'NOSCHISM',           // trigger type 0x80 (bit 7)       // 0x004F:4879
    RECEIVEDTECHNOLOGY: 'RECEIVEDTECHNOLOGY', // trigger type 0x100 (bit 8)      // 0x004F:4924
  },

  // --- Action Keywords (EVENTS.TXT) ---
  // These appear after @THEN to define what happens when triggered
  actionKeywords: {
    TEXT:                  'TEXT',                  // action bit 0x0001           // 0x004F:5217
    MOVEUNIT:              'MOVEUNIT',              // action bit 0x0002          // 0x004F:5711
    CREATEUNIT:            'CREATEUNIT',            // action bit 0x0004          // 0x004F:5323
    CHANGEMONEY:           'CHANGEMONEY',           // action bit 0x0008          // 0x004F:5473
    PLAYWAVEFILE:          'PLAYWAVEFILE',          // action bit 0x0010          // 0x004F:5890
    MAKEAGGRESSION:        'MAKEAGGRESSION',        // action bit 0x0020          // 0x004F:5547
    JUSTONCE:              'JUSTONCE',              // action bit 0x0040          // 0x004F:5531
    PLAYCDTRACK:           'PLAYCDTRACK',           // action bit 0x0080          // 0x004F:5868
    DONTPLAYWONDERS:       'DONTPLAYWONDERS',       // action bit 0x0100          // 0x004F:5539
    CHANGETERRAIN:         'CHANGETERRAIN',         // action bit 0x0200          // 0x004F:5254
    DESTROYACIVILIZATION:  'DESTROYACIVILIZATION',  // action bit 0x0400          // 0x004F:5616
    GIVETECHNOLOGY:        'GIVETECHNOLOGY',        // action bit 0x0800          // 0x004F:5656
    HASTRIGGERED:          'HASTRIGGERED',          // action bit 0x2000          // 0x0054:482
    ENDTEXT:               'ENDTEXT',               // terminates TEXT block       // 0x004F:5225
  },

  // --- Trigger Sub-Parameter Keywords (EVENTS.TXT) ---
  // These appear as lines within a trigger block (e.g., "unit=Warriors")
  triggerParameterKeywords: {
    unit:         'unit=',          // unit type name (UNITKILLED)                // 0x004F:4671
    attacker:     'attacker=',      // attacking civ name (UNITKILLED, CITYTAKEN) // 0x004F:4694
    defender:     'defender=',      // defending civ name (UNITKILLED, CITYTAKEN, NOSCHISM) // 0x004F:4717
    city:         'city=',          // city name (CITYTAKEN)                      // 0x004F:5055
    turn:         'turn=',          // turn number or EVERY (TURN)               // 0x004F:5094
    interval:     'interval=',      // turn interval (TURNINTERVAL)              // 0x004F:5138
    talker:       'talker=',        // initiating civ (NEGOTIATION)              // 0x004F:4763
    talkertype:   'talkertype=',    // Human/Computer/HumanOrComputer            // 0x004F:4786
    listener:     'listener=',      // receiving civ (NEGOTIATION)               // 0x004F:4818
    listenertype: 'listenertype=',  // Human/Computer/HumanOrComputer            // 0x004F:4841
    receiver:     'receiver=',      // receiving civ (RECEIVEDTECHNOLOGY)         // 0x004F:4943
    technology:   'technology=',    // tech ID number (RECEIVEDTECHNOLOGY)        // 0x004F:4967
    denominator:  'denominator=',   // 1/N chance per turn (RANDOMTURN)           // 0x004F:5178
  },

  // --- Action Sub-Parameter Keywords (EVENTS.TXT) ---
  actionParameterKeywords: {
    unit:          'unit=',         // unit type (MOVEUNIT, CREATEUNIT)           // 0x004F:5345,5732
    owner:         'owner=',        // owning civ (MOVEUNIT, CREATEUNIT)          // 0x004F:5368,5756
    maprect:       'maprect',       // 4-corner rectangle (MOVEUNIT, CHANGETERRAIN) // 0x004F:5294,5781
    moveto:        'moveto',        // destination x,y (MOVEUNIT)                // 0x004F:5807
    numbertomove:  'numbertomove=', // count or ALL (MOVEUNIT)                   // 0x004F:5833
    veteran:       'veteran=',      // yes/true/no/false (CREATEUNIT)            // 0x004F:5391
    homecity:      'homecity=',     // home city name (CREATEUNIT)               // 0x004F:5412
    locations:     'locations',     // start of location list (CREATEUNIT)       // 0x004F:5426
    endlocations:  'endlocations',  // end of location list (CREATEUNIT)         // 0x004F:5441
    receiver:      'receiver=',     // target civ (CHANGEMONEY, GIVETECHNOLOGY)  // 0x004F:5492,5675
    amount:        'amount=',       // gold amount (CHANGEMONEY)                 // 0x004F:5515
    who:           'who=',          // aggressor civ (MAKEAGGRESSION)            // 0x004F:5566
    whom:          'whom=',         // target civ (MAKEAGGRESSION, DESTROYACIVILIZATION) // 0x004F:5589,5635
    terraintype:   'terraintype=',  // terrain ID 0-10 (CHANGETERRAIN)           // 0x004F:5274
    technology:    'technology=',   // tech ID (GIVETECHNOLOGY)                  // 0x004F:5695
  },

  // --- Special Unit Target ---
  specialUnitTarget: {
    ANYUNIT:  -2,                   // matches any unit type                     // 0x0054:1149
    keyword: 'ANYUNIT',             // EVENTS.TXT keyword                        // s_ANYUNIT_00632adc
  },

  // --- Special Turn Value ---
  specialTurnValue: {
    EVERY:    -1,                   // fires every turn (TURN trigger)           // 0x004F:5099
    keyword: 'EVERY',               // EVENTS.TXT keyword                        // s_EVERY_0062fae8
  },

  // --- Trigger Actor Type Keywords (NEGOTIATION talkertype/listenertype) ---
  triggerActorTypeKeywords: {
    HUMAN:           'Human',            // value 1                              // 0x004F:4789
    COMPUTER:        'Computer',         // value 2                              // 0x004F:4795
    HUMANORCOMPUTER: 'HumanOrComputer',  // value 4                              // 0x004F:4801
  },

  // --- Special Target Keywords (EVENTS.TXT output strings) ---
  specialTargetKeywords: {
    ANYBODY:          'ANYBODY',          // any civ (-2)                         // s_ANYBODY_00632aa4
    TRIGGERATTACKER:  'TRIGGERATTACKER',  // attacker civ (-3)                    // s_TRIGGERATTACKER_00632aac
    TRIGGERDEFENDER:  'TRIGGERDEFENDER',  // defender civ (-4 in attacker ctx)    // s_TRIGGERDEFENDER_00632abc
    TRIGGERRECEIVER:  'TRIGGERRECEIVER',  // receiver civ (-4 in receiver ctx)    // s_TRIGGERRECEIVER_00632acc
  },

  // --- Event Record Field Offsets (int32 array indices into record) ---
  // The event record is accessed as an array of uint32 (local_68[N])
  eventRecordFields: {
    triggerType:       0x00,        // trigger bitmask (1 int)                   // 0x004F parser
    actionBitmask:     0x01,        // action bitmask (1 int, OR'd per action)   // 0x004F parser
    // UNITKILLED trigger fields
    unitName:          0x02,        // char* — unit name string                  // 0x004F:4683
    unitTypeId:        0x03,        // int — unit type ID                        // 0x004F:4686
    // CITYTAKEN trigger fields
    cityName:          0x04,        // char* — city name string                  // 0x004F:5060
    // Attacker/Defender (shared by UNITKILLED, CITYTAKEN, NEGOTIATION)
    attackerName:      0x05,        // char* — attacker/talker civ name          // 0x004F:4706
    attackerId:        0x06,        // int — attacker/talker civ ID              // 0x004F:4709
    talkerType:        0x07,        // int — 1=Human, 2=Computer, 4=Both         // 0x004F:4791
    defenderName:      0x08,        // char* — defender/listener civ name        // 0x004F:4729
    defenderId:        0x09,        // int — defender/listener civ ID            // 0x004F:4732
    listenerType:      0x0A,        // int — 1=Human, 2=Computer, 4=Both         // 0x004F:4846
    // TURN / TURNINTERVAL fields
    turnNumber:        0x0B,        // int — turn number or interval             // 0x004F:5105,5149
    // RANDOMTURN fields
    denominator:       0x0C,        // int — 1/N chance (1-1000)                 // 0x004F:5188
    // RECEIVEDTECHNOLOGY trigger fields
    techId:            0x0D,        // int — technology ID                       // 0x004F:4977
    // TEXT action fields
    textLines:         0x0E,        // char*[20] — text line pointers (0x0E..0x21) // 0x004F:5229
    // MOVEUNIT action fields
    moveOwnerName:     0x22,        // char* — move unit owner name              // 0x004F:5769
    moveOwnerId:       0x23,        // int — move unit owner civ ID              // 0x004F:5772
    moveUnitName:      0x24,        // char* — move unit type name               // 0x004F:5745
    moveUnitTypeId:    0x25,        // int — move unit type ID                   // 0x004F:5748
    moveNumberToMove:  0x26,        // int — count (-2 = ALL)                    // 0x004F:5839,5852
    moveMapRect:       0x27,        // int[8] — 4 x,y pairs (0x27..0x2E)        // 0x004F:5795
    moveToX:           0x2F,        // int — destination X                       // 0x004F:5822
    moveToY:           0x30,        // int — destination Y                       // 0x004F:5824
    // MAKEAGGRESSION action fields
    aggrWhomName:      0x31,        // char* — target civ name                   // 0x004F:5601
    aggrWhomId:        0x32,        // int — target civ ID                       // 0x004F:5604
    aggrWhoName:       0x33,        // char* — aggressor civ name                // 0x004F:5578
    aggrWhoId:         0x34,        // int — aggressor civ ID                    // 0x004F:5581
    // CREATEUNIT action fields
    createOwnerName:   0x35,        // char* — create unit owner name            // 0x004F:5380
    createOwnerId:     0x36,        // int — create unit owner civ ID            // 0x004F:5383
    createUnitName:    0x37,        // char* — create unit type name             // 0x004F:5357
    createUnitTypeId:  0x38,        // int — create unit type ID                 // 0x004F:5360
    createLocations:   0x39,        // int[20] — up to 10 x,y pairs (0x39..0x4C) // 0x004F:5451
    createLocationCount: 0x4D,      // int — number of locations                 // 0x004F:5469
    createVeteran:     0x4E,        // int — 0=no, 1=yes                         // 0x004F:5396
    createHomecity:    0x4F,        // char* — home city name                    // 0x004F:5417
    // CHANGEMONEY action fields
    changeMoneyRecvName: 0x5D,      // char* — receiver civ name                 // 0x004F:5504
    changeMoneyRecvId:   0x5E,      // int — receiver civ ID                     // 0x004F:5507
    changeMoneyAmount:   0x5F,      // int — gold amount (+/-)                   // 0x004F:5520
    // NEGOTIATION trigger extra (stored in action bitmask area)
    negotiationFlag:   0x60,        // int — 0x1000 flag for negotiation trigger // 0x004F:4877
    // PLAYWAVEFILE action fields
    waveFileName:      0x61,        // char* — WAV file path                     // 0x004F:5904
    // PLAYCDTRACK action fields
    cdTrackNumber:     0x62,        // int — CD track number                     // 0x004F:5881
    // CHANGETERRAIN action fields
    changeTerrainType: 0x63,        // int — terrain type ID (0-10)              // 0x004F:5285
    changeTerrainRect: 0x64,        // int[8] — 4 x,y pairs (0x64..0x6B)        // 0x004F:5308
    // DESTROYACIVILIZATION action fields
    destroyCivId:      0x6C,        // int — target civ ID                       // 0x004F:5645
    // GIVETECHNOLOGY action fields
    giveTechId:        0x6D,        // int — technology ID                       // 0x004F:5699
    giveTechRecvId:    0x6E,        // int — receiver civ ID                     // 0x004F:5686
    // Linked list pointers
    nextEventPtr:      0x6F,        // void* — next event in list (offset 0x1BC) // 0x004F parser
    prevEventPtrByte:  0x1C0,       // void* — prev event in list (byte offset)  // 0x0054c36e
  },

  // --- Event Parameter Limits ---
  parameterLimits: {
    maxTextLines:          0x14,     // 20 text lines per TEXT action             // 0x004F:5226
    maxCreateLocations:    10,       // 10 location pairs for CREATEUNIT          // 0x004F:5431
    moveMapRectCorners:    4,        // 4 corner points for maprect               // 0x004F:5306,5793
    changeTerrainCorners:  4,        // 4 corner points for terrain maprect       // 0x004F:5306
    randomDenominatorMin:  1,        // minimum denominator for RANDOMTURN        // 0x004F:5189
    randomDenominatorMax:  1000,     // maximum denominator for RANDOMTURN        // 0x004F:5189
    moveNumberAll:         -2,       // numbertomove=ALL sentinel value           // 0x004F:5839
    turnEvery:             -1,       // turn=EVERY sentinel value                 // 0x004F:5099
    changeMoneyMin:        -30000,   // minimum gold change (0xFFFF8AD0)          // 0x0054:3031
    changeMoneyMax:        30000,    // maximum gold change                       // 0x0054:3031
  },

  // --- Trigger Help Keywords (editor help dialog) ---
  // FUN_0054b1d5 @ block_00540000.c — maps trigger index to help dialog key
  triggerHelpKeywords: {
    0: 'HELPUNITKILLED',             // help for UNITKILLED trigger               // s_HELPUNITKILLED_00632b48
    1: 'HELPCITYTAKEN',              // help for CITYTAKEN trigger                // s_HELPCITYTAKEN_00632b58
    2: 'HELPTURN',                   // help for TURN trigger                     // s_HELPTURN_00632b68
    3: 'HELPTURNINTERVAL',           // help for TURNINTERVAL trigger             // s_HELPTURNINTERVAL_00632b74
    4: 'HELPNEGOTIATION',            // help for NEGOTIATION trigger              // s_HELPNEGOTIATION_00632b88
    5: 'HELPSCENARIOLOADED',         // help for SCENARIOLOADED trigger           // s_HELPSCENARIOLOADED_00632b98
    6: 'HELPRANDOMTURN',             // help for RANDOMTURN trigger               // s_HELPRANDOMTURN_00632bac
    7: 'HELPNOSCHISM',               // help for NOSCHISM trigger                 // s_HELPNOSCHISM_00632bbc
    8: 'HELPRECEIVEDTECHNOLOGY',     // help for RECEIVEDTECHNOLOGY trigger       // s_HELPRECEIVEDTECHNOLOGY_00632bcc
  },

  // --- Action Help Keywords (editor help dialog) ---
  // FUN_0054b2ec @ block_00540000.c — maps action index to help dialog key
  actionHelpKeywords: {
    0:  'HELPTEXT',                  // help for TEXT action                       // s_HELPTEXT_00632bec
    1:  'HELPMOVEUNIT',              // help for MOVEUNIT action                  // s_HELPMOVEUNIT_00632bf8
    2:  'HELPCREATEUNIT',            // help for CREATEUNIT action                // s_HELPCREATEUNIT_00632c08
    3:  'HELPCHANGEMONEY',           // help for CHANGEMONEY action               // s_HELPCHANGEMONEY_00632c18
    4:  'HELPPLAYWAVEFILE',          // help for PLAYWAVEFILE action              // s_HELPPLAYWAVEFILE_00632c28
    5:  'HELPMAKEAGGRESSION',        // help for MAKEAGGRESSION action            // s_HELPMAKEAGGRESSION_00632c3c
    6:  'HELPJUSTONCE',              // help for JUSTONCE action                  // s_HELPJUSTONCE_00632c50
    7:  'HELPPLAYCDTRACK',           // help for PLAYCDTRACK action               // s_HELPPLAYCDTRACK_00632c60
    8:  'HELPDONTPLAYWONDERS',       // help for DONTPLAYWONDERS action           // s_HELPDONTPLAYWONDERS_00632c70
    9:  'HELPCHANGETERRAIN',         // help for CHANGETERRAIN action             // s_HELPCHANGETERRAIN_00632c84
    10: 'HELPDESTROYACIVILIZATION',  // help for DESTROYACIVILIZATION action      // s_HELPDESTROYACIVILIZATION_00632c98
    11: 'HELPGIVETECHNOLOGY',        // help for GIVETECHNOLOGY action            // s_HELPGIVETECHNOLOGY_00632cb4
  },

  // --- Event File Names ---
  eventFileNames: {
    eventsFile:    'EVENTS.',        // event file name prefix (+ extension)      // s_EVENTS__00632a20
    backupFile:    'EVENTS.BAK',     // backup before save                        // s_EVENTS_BAK_00632a28
    badEventsKey:  'BADEVENTSFILE',  // error message key for parse failure       // s_BADEVENTSFILE_00630868
    eventEditorKey:'EVENTS',         // editor dialog key                         // s_EVENTS_00632cd0
    triggerPickerKey: 'TRIGGERS',    // trigger picker dialog key                 // s_TRIGGERS_006331e8
  },

  // --- Parser State Machine ---
  // FUN_004f42f4 @ block_004F0000.c — states for EVENTS.TXT parsing
  parserStates: {
    INITIAL:             1,          // waiting for @IF or @BEGINEVENTS           // 0x004F:4567
    READING_TRIGGER:     2,          // inside @IF block, reading trigger keyword // 0x004F:4614
    READING_ACTIONS:     3,          // inside @THEN block, reading action keywords // 0x004F:4622
    EVENT_COMPLETE:      5,          // @ENDIF found, event finalized             // 0x004F:4630
    END_OF_FILE:         10,         // @ENDEVENTS found or EOF reached           // 0x004F:4644
  },

  // --- Editor Picker List Types ---
  // FUN_0054a912 @ block_00540000.c — param_3 selects which picker list to show
  pickerListTypes: {
    CIV_LIST:            0,          // civs 1-7 (default = 1)                    // 0x0054:1121
    UNIT_TYPE_LIST:      1,          // all 62 unit types                         // 0x0054:1133
    TECH_LIST:           2,          // all 100 technologies                      // 0x0054:1141
    UNIT_WITH_ANYUNIT:   3,          // ANYUNIT + all 62 unit types               // 0x0054:1148
    CIV_WITH_ANYBODY:    4,          // ANYBODY + civs 1-7 (default = -2)         // 0x0054:1157
    CIV_WITH_ATTACKDEF:  5,          // TRIGGERATTACKER + TRIGGERDEFENDER + civs   // 0x0054:1169
    CIV_WITH_RECEIVER:   6,          // TRIGGERRECEIVER + civs 1-7                // 0x0054:1182
    TERRAIN_LIST:        7,          // 11 terrain types (0-10)                   // 0x0054:1194
  },

  // sourceAddr: '0x0054D7EF' (editor), '0x0054F3B9' (main), '0x00473D5E' (save)
};

// --- Scenario Event Editor UI ---
// Binary ref: FUN_0054f3b9 @ block_00540000.c
export const SCENARIO_EVENT_EDITOR = {
  dialogDimensions: { width: 0x230, height: 0x17C },  // 560 x 380 pixels       // 0x0054f3b9
  progressBarWidth: 0x13B,          // 315 pixels — event list progress bar      // 0x0054f3b9

  // sourceAddr: '0x0054F3B9'
};

// --- Unit Type Editor ---
// Binary ref: FUN_005aef20 (load), FUN_005af140 (save) @ block_005A0000.c
export const UNIT_TYPE_EDITOR = {
  maxUnitTypes: 0x3E,               // 62 unit types                             // 0x005aef20
  gameRecordStride: 0x14,           // 20 bytes per unit type in game format     // 0x005aef20
  editorRecordStride: 0x58,         // 88 bytes per unit type in editor format   // 0x005aef20
  nameLength: 0x28,                 // 40 bytes per unit name buffer             // 0x005aef20

  // Unit type field offsets within game record (stride 0x14)
  unitTypeFieldOffsets: {
    name:        0x00,              // char* — unit name pointer                  // 0x005aef20
    prereqTech:  0x13,              // int8 — technology prerequisite             // 0x005aef20
    obsoleteTech:0x08,              // int8 — technology that obsoletes           // 0x005aef20
    domain:      0x12,              // int8 — 0=land, 1=sea, 2=air               // 0x005aef20
    role:        0x09,              // int8 — unit role/category                  // 0x005aef20
    attack:      0x0C,              // int8 — base attack strength               // 0x005aef20
    defense:     0x0D,              // int8 — base defense strength              // 0x005aef20
    moveRate:    0x0A,              // int8 — base movement points               // 0x005aef20
    hitpoints:   0x11,              // int8 — base hit points                    // 0x005aef20
    firepower:   0x10,              // int8 — base firepower                     // 0x005aef20
    cost:        0x0E,              // int8 — shield cost to build               // 0x005aef20
    flags:       0x0B,              // int8 — unit flags                         // 0x005aef20
  },

  // sourceAddr: '0x005AEF20' (load), '0x005AF140' (save)
};


// ============================================================================
// 15. MAP GENERATION CONSTANTS
// ============================================================================
// Binary ref: block_00400000.c — continent placement, terrain assignment,
//             climate zones, polar ice/glacier placement

export const MAP_GENERATION = {
  // --- Continent/Island Placement ---
  continentPlacement: {
    continentBlobSize: 0x30,       // 48 — blob growth iterations for continents
    islandBlobSize:    0x3F,       // 63 — blob growth iterations for islands
    maxIterations:     1024,       // max placement attempts before giving up
  },

  // --- Polar Ice / Glacier Placement ---
  // Polar ice (terrain type 7) and glacier (terrain type 6) at map edges
  polarTerrain: {
    ice:     7,                    // terrain type for Arctic ice
    glacier: 6,                    // terrain type for glacier
  },

  // --- Climate Zone Threshold ---
  climateZone: {
    // threshold = (mapHeight * 3) / 10
    numerator: 3,
    denominator: 10,
    note: 'Climate boundary = (mapHeight * 3) / 10 rows from equator',
  },

  sourceAddr: 'block_00400000.c (map generation functions)',
};


// ============================================================================
// 16. GAME SETUP DIALOG CONSTANTS
// ============================================================================
// Binary ref: FUN_0041cc04 @ block_00410000.c (new_game_setup)

export const GAME_SETUP = {
  // --- Player Count Range (Multiplayer) ---
  maxPlayers: {
    default: 7,
    min: 4,
    max: 7,
    serialMode: 2,
    sourceAddr: '0x0051D9A0',
  },

  // --- Difficulty / Barbarian / Gender ---
  difficultyCount: 6,              // 0=Chieftain..5=Deity
  barbarianLevels: 4,              // 0=None, 1=Roaming, 2=Restless, 3=Raging
  genderOptions: 2,                // 0=Male, 1=Female

  // --- Map Size Presets ---
  // See MAP_SIZE_PRESETS in ui-constants.js for full detail
  mapSizePresetCount: 3,           // Small, Medium, Large (+ Custom option)

  // --- Custom Land Dialog ---
  customLandDialog: 'CUSTOMLAND',  // @ s_CUSTOMLAND_0062555c

  // --- INI File Settings ---
  iniSection: 'Civilization Gold',
  iniKeys: {
    netTimeout: { key: 'NetTimeOut', default: 30 },
    adapter:    { key: 'Adapter',    default: 0 },
    maxPlayers: { key: 'MaxPlayers', default: 7 },
  },

  // --- Language Selection ---
  languages: {
    0: 'English',                      // @ s_English_00625364                         // 0x0041B177
    1: 'Francais',                     // @ s_Francais_0062536c                        // 0x0041B177
    2: 'Deutsch',                      // @ s_Deutsch_00625378                         // 0x0041B177
  },
  languageIniKey: 'Language Preference',  // @ s_Language_Preference_00625388           // 0x0041B177
  interDatFile: 'INTER.DAT',          // @ s_INTER_DAT_00625358 — language availability // 0x0041B177

  // --- New Game Setup Dialog Keys ---
  // Dialog keys used during the new-game setup wizard (FUN_0041ba52)
  setupDialogKeys: {
    difficulty:   'DIFFICULTY',        // @ s_DIFFICULTY_006254a8                      // 0x0041BA52
    enemies:      'ENEMIES',           // @ s_ENEMIES_006254b4                        // 0x0041BA52
    barbarity:    'BARBARITY',         // @ s_BARBARITY_006254bc                      // 0x0041BA52
    rules:        'RULES',             // @ s_RULES_006254c8                          // 0x0041BA52
    advanced:     'ADVANCED',          // @ s_ADVANCED_006254d0                        // 0x0041BA52
    accelerated:  'ACCELERATED',       // @ s_ACCELERATED_006254dc                    // 0x0041BA52
    gender:       'GENDER',            // @ s_GENDER_006254e8                         // 0x0041BA52
    customTribe:  'CUSTOMTRIBE',       // @ s_CUSTOMTRIBE_00625500                    // 0x0041BA52
    customTribe2: 'CUSTOMTRIBE2',      // @ s_CUSTOMTRIBE2_0062550c                   // 0x0041BA52
    customCity:   'CUSTOMCITY',        // @ s_CUSTOMCITY_00625524                     // 0x0041BA52
    opponent:     'OPPONENT',          // @ s_OPPONENT_00625530                        // 0x0041BA52
    sizeOfMap:    'SIZEOFMAP',         // @ s_SIZEOFMAP_0062553c                      // 0x0041BA52
    customLand:   'CUSTOMLAND',        // @ s_CUSTOMLAND_0062555c                     // 0x0041BA52
    hotSeatNot:   'HOTSEATNOT',        // @ s_HOTSEATNOT_006252B0                     // 0x0041BA52
  },

  // --- AI Opponent Auto-Selection ---
  // When choosing random opponents:
  //   difficulty < 2: opponents = rand()%5 + 2
  //   difficulty < 5: opponents = rand()%3 + 1
  //   difficulty >= 5: opponents = (rand() & 1) + 2
  maxLeaderEntries: 0x15,              // 21 civilizations to pick from                // 0x0041BA52
  leaderRecordStride: 0x30,            // 48 bytes per leader entry                    // 0x0041BA52
  leaderRecordBase: 'DAT_00655500',    // leader personality data base                 // 0x0041BA52

  // --- Sound during setup ---
  setupMenuSound: 0x6A,               // thunk_FUN_0046e020(0x6a, 0, 0, 0) after each dialog  // 0x0041BA52

  // --- Default game flags ---
  defaultGameFlags: 0x3F,             // DAT_00655ae8 = 0x3f at start of rules selection      // 0x0041BA52
  flatEarthFlag: 0x8000,              // bit 15: flat earth / cylinder world toggle           // 0x0041BA52
  bloodlustFlag: 0x10,                // bit 4: bloodlust (no spaceship win)                  // 0x0041BA52
  noSpecialResourcesFlag: 0x80,       // bit 7: no special resources                          // 0x0041BA52
  selectComputerOpponentsFlag: 0x100,  // bit 8: manually select computer opponents            // 0x0041BA52

  sourceAddr: '0x0041CC04, 0x0051D9A0, 0x0041BA52, 0x0041B177',
};


// ============================================================================
// 17. CURSOR MODES (Main Map Window)
// ============================================================================
// Binary ref: FUN_004135ab @ block_00410000.c:1890-1914

export const CURSOR_MODES = {
  GOTO_CURSOR:    0x1FE,           // goto cursor mode (waiting for destination)
  NORMAL:         0x201,           // normal/idle cursor (default)
  GOTO_ACTIVE:    0x202,           // goto: unit actively moving to destination
  GOTO_BLOCKED:   0x203,           // goto: movement blocked

  // Directional cursor: 500 + direction (0=N, 1=NE, 2=E, ...)
  // Computed in mouse-move handler at block_00410000.c:406:
  //   cursor = (direction + 1 & 7) + 500
  DIRECTIONAL_BASE: 500,

  // Goto-blocked detection (FUN_00410e0a @ 0x00410E0A):
  //   - If current unit move distance > cosmic param 19 (DAT_0064bcdb), cursor = 0x203
  //   - If tile occupied by enemy, cursor = 0x203
  gotoBlockedDistanceParam: 'DAT_0064bcdb',  // cosmic param 19 = movement range       // 0x00410402

  // Viewport mode cycling (case 4): viewport+0x2de = (viewport+0x2de + 1) & 3
  viewportModeCycleMax: 3,

  // Viewport state offsets within the map window object
  viewportOffsets: {
    zoomLevel:    0x2E4,               // zoom level (short)                           // 0x004135AB
    displayMode:  0x2DE,               // display mode / FOW bits (ushort)             // 0x004135AB
    activeView:   0x2DC,               // active view flag (short)                     // 0x004135AB
    viewportIdx:  0x2D8,               // viewport index (int, 0 = main)              // 0x004135AB
    cursorMode:   0x358,               // current cursor mode (int)                   // 0x00410402
  },

  sourceAddr: '0x004135AB, 0x00410402, 0x00410E0A',
};


// NOTE: TAX_RATE_DIALOG and MAP_SIZE_PRESETS are defined in ui-constants.js
// (the more detailed canonical versions with full binary address annotations).

// ============================================================================
// === TERRAIN EDITOR CONSTANTS ===
// Binary ref: block_00420000.c (lines ~3332-3348) — scenario editor initialization
// Surface dimensions, cell sizes, and resource references for the map editor.
// ============================================================================

export const TERRAIN_EDITOR = {
  // Editor surface dimensions (in pixels)
  surfaceWidth:  0x230,           // 560 pixels                              // 0x0042xxxx+0x2d8
  surfaceHeight: 0x17C,           // 380 pixels                              // 0x0042xxxx+0x2dc

  // Cell/tile rendering size
  cellWidth:     0x40,            // 64 pixels per cell                      // FUN_0042xxxx
  cellHeight:    0x40,            // 64 pixels per cell                      // FUN_0042xxxx

  // Editor GIF resource
  editorGif:     'EDITORSQ.GIF',  // @ s_EDITORSQ_GIF_00625ea4
  editorGifFrames: 10,
  editorGifPalette: 0xC0,

  // Tiles DLL reference
  tilesDll:      'TILES_DLL',     // @ s_TILES_DLL_00625ed4
  // Loaded via thunk_FUN_0043c3f0 during editor initialization

  // Credits screen special case
  creditsGif:    'scredits.gif',  // @ s_scredits_gif_00625ee0
  creditsMagic:  10000,           // param_1 == 10000 triggers credits GIF load
  creditsPalette: 0xC0,

  // Editor button ID
  buttonIdBase:  0xC9,            // 201: editor action button base

  // String IDs for editor labels
  labelStringIds: {
    terrainInfo:   0x864,         // terrain label (DAT_00628420 + 0x864)
    improvementInfo: 0x868,       // improvement label (DAT_00628420 + 0x868)
    resourceInfo:  0x86C,         // resource label (DAT_00628420 + 0x86C)
    mapEditorTitle: 0x738,        // map editor title (DAT_00628420 + 0x738)
  },

  sourceAddr: '0x0042xxxx (editor init in block_00420000.c)',
};

// ============================================================================
// === SUPPLY / DEMAND SEARCH DIALOGS ===
// Binary ref: block_00420000.c (lines ~4653-4785) — city trade display
// Dialog strings used in the city supply/demand trade route UI.
// ============================================================================

export const SUPPLY_DEMAND_DIALOGS = {
  showDialog:    'SUPPLYSHOW',    // @ s_SUPPLYSHOW_00625ef0 — display supply routes
  noneDialog:    'SUPPLYNONE',    // @ s_SUPPLYNONE_00625f00 — no supply available
  searchDialog:  'SUPPLYSEARCH',  // @ s_SUPPLYSEARCH_00625f0c — search for routes

  // Display flags
  showFlags: 0x40001,             // dialog display flags for SUPPLYSHOW/SUPPLYSEARCH

  sourceAddr: '0x0042xxxx (trade display in block_00420000.c)',
};

// ============================================================================
// === MILITARY ADVISOR BUILDING TYPES ===
// Binary ref: block_00420000.c — military advisor display
// The military advisor screen iterates over 0x27 (39) building types
// for counting per-city military infrastructure.
// ============================================================================

export const MILITARY_ADVISOR_BUILDINGS = {
  totalBuildingTypes: 0x27,       // 39 building types checked per city
  // Building string IDs used in advisor display
  buildingStringIds: {
    range1: { start: 0x84, end: 0x89, count: 6, desc: 'Basic building improvement names' },
    range2: { start: 0x16E, end: 0x171, count: 4, desc: 'Advanced building improvement names' },
  },
  // Scrollable list parameters
  scrollableList: {
    rowHeight_standard: 0x16,     // 22 pixels per row (standard list)
    rowHeight_extended: 0x18,     // 24 pixels per row (extended list with details)
  },

  sourceAddr: '0x0042xxxx (military advisor in block_00420000.c)',
};


// ============================================================================
// 20. KEYBOARD SHORTCUTS — MAP VIEW
// ============================================================================
// Binary ref: map_ascii @ 0x00411F91 (block_00410000.c:1124-1299)
//             FUN_00411bf5 @ 0x00411BF5 (block_00410000.c:1021-1119)
//             map_key @ 0x004125C6 (block_00410000.c:1304-1671)

/**
 * ASCII keypress handler for the main map view.
 *
 * map_ascii (0x00411F91) dispatches based on the typed character.
 * It first checks for city-window mode (DAT_00655aea & 0x40), then
 * falls through to global shortcuts. FUN_00411bf5 handles unit-specific
 * shortcuts when a unit is active.
 *
 * map_key (0x004125C6) handles virtual keycodes (numpad, function keys,
 * menu command IDs).
 */
export const KEYBOARD_SHORTCUTS = {
  // --- City Window Mode (DAT_00655aea & 0x40 set) ---
  // These fire when a city dialog is open
  cityWindow: {
    0x0D: 'close_city_dialog',         // Enter — thunk_citywin_BC4F(0)              // 0x00411F91
    0x45: 'close_city_dialog',         // 'E'                                        // 0x00411F91
    0x58: 'close_city_dialog',         // 'X'                                        // 0x00411F91
    0x65: 'close_city_dialog',         // 'e'                                        // 0x00411F91
    0x78: 'close_city_dialog',         // 'x'                                        // 0x00411F91
    0x41: 'change_production',         // 'A' / 'C' / 'a' / 'c' — thunk_city_button_change(0)  // 0x00411F91
    0x43: 'change_production',
    0x61: 'change_production',
    0x63: 'change_production',
    0x42: 'buy_production',            // 'B' / 'b' — thunk_city_button_buy(0)       // 0x00411F91
    0x62: 'buy_production',
    0x48: 'city_happy_advisor',        // 'H' / 'h' — thunk_citywin_BA6A(0)          // 0x00411F91
    0x68: 'city_happy_advisor',
    0x49: 'city_improvements',         // 'I' / 'i' — thunk_citywin_B9A4(0)          // 0x00411F91
    0x69: 'city_improvements',
    0x4D: 'city_map',                  // 'M' / 'm' — thunk_citywin_BA07(0)          // 0x00411F91
    0x6D: 'city_map',
    0x52: 'rename_city',               // 'R' / 'r' — thunk_city_button_rename(0)    // 0x00411F91
    0x72: 'rename_city',
    0x56: 'city_view',                 // 'V' / 'v' — thunk_city_button_view(0)      // 0x00411F91
    0x76: 'city_view',
  },

  // --- Global ASCII Shortcuts (map view, no city dialog) ---
  // These fire from map_ascii when not in city-window mode
  global: {
    0x43: 'center_on_capital',         // 'C' — thunk_FUN_0040e017()                 // 0x00411F91
    0x44: 'disband_unit',              // 'D' — thunk_FUN_0058c295()                 // 0x00411F91
    0x48: 'help_civilopedia',          // 'H' — thunk_FUN_0044cd9b(player)           // 0x00411F91
    0x52: 'revolution',                // 'R' — thunk_FUN_0040e3b1()                 // 0x00411F91
    0x53: 'save_game',                 // 'S' — thunk_save_game(0)                   // 0x00411F91
    0x54: 'tax_rate_dialog',           // 'T' — thunk_FUN_0040ddc6(player)           // 0x00411F91
    0x58: 'zoom_out_reset',            // 'X' — DAT_0066ca8c = -3; redraw            // 0x00411F91
    0x5A: 'zoom_in_to_cursor',         // 'Z' — zoom=0, center on cursor             // 0x00411F91
  },

  // --- Unit-Active Shortcuts (FUN_00411bf5) ---
  // These fire when a unit is selected (param_2 = VK code, param_1 = ASCII)
  unitActive: {
    0x0D: 'enter_city_or_info',        // Enter — enter city or show unit info        // 0x00411BF5
    0x20: 'skip_turn',                 // Space — thunk_FUN_0058bd60()                // 0x00411BF5
    0x42: 'build_city',                // 'B' — thunk_FUN_0058be56()                  // 0x00411BF5
    0x43: 'center_on_unit',            // 'C' — center map on selected unit            // 0x00411BF5
    0x45: 'explore',                   // 'E' — thunk_FUN_0058c65e(10)                // 0x00411BF5
    0x46: 'fortify_or_fortress',       // 'F' — fortify (or build fortress if settler) // 0x00411BF5
    0x47: 'goto',                      // 'G' — thunk_FUN_0058d6af()                  // 0x00411BF5
    0x48: 'home_city',                 // 'H' — thunk_FUN_0058cbe1()                  // 0x00411BF5
    0x49: 'irrigate',                  // 'I' — thunk_FUN_0058c65e(6)                 // 0x00411BF5
    0x4B: 'automation_settler',        // 'K' — thunk_FUN_0058df14()                  // 0x00411BF5
    0x4C: 'clear_orders',              // 'L' — thunk_FUN_0058df7b()                  // 0x00411BF5
    0x4D: 'mine',                      // 'M' — thunk_FUN_0058c65e(7)                 // 0x00411BF5
    0x4F: 'transform_terrain',         // 'O' — thunk_FUN_0058c65e(8)                 // 0x00411BF5
    0x50: 'pollution_or_pillage',      // 'P' — clean pollution (settler) or pillage   // 0x00411BF5
    0x51: 'end_turn_selection',        // 'Q' — end current turn selection             // 0x00411BF5
    0x52: 'road',                      // 'R' — thunk_FUN_0058c65e(5)                 // 0x00411BF5
    0x53: 'sentry',                    // 'S' — thunk_FUN_0058cde5()                  // 0x00411BF5
    0x55: 'unload',                    // 'U' — thunk_FUN_0058ddce()                  // 0x00411BF5
    0x57: 'wait',                      // 'W' — thunk_FUN_0058bdfd()                  // 0x00411BF5
  },

  // --- Shift+ASCII (Cheat/Debug) ---
  // From map_ascii inner bVar1==true block
  shiftGlobal: {
    0x41: 'select_all_units',          // 'A' — thunk_FUN_0058d442()                 // 0x00411F91
    0x54: 'tech_dialog',               // 'T' — thunk_FUN_004e2597()                 // 0x00411F91
    0x56: 'toggle_view_mode',          // 'V' — toggle strategic/normal view          // 0x00411F91
    0x58: 'shift_zoom_out',            // 'X' — zoom out (min -7)                     // 0x00411F91
    0x5A: 'shift_zoom_in',             // 'Z' — zoom in (max 8)                       // 0x00411F91
    0x59: 'cheat_mode_toggle',         // 'Y' — toggle DAT_00655b07 (cheat mode)      // 0x00411F91
  },

  // --- Virtual Key Codes (map_key @ 0x004125C6) ---
  // Numpad and directional key → direction mapping
  keyToDirection: {
    // Direction assignments: 0=N, 1=NE, 2=E, 3=SE, 4=S, 5=SW, 6=W, 7=NW
    0xA1: 4, 0xC7: 4,                 // Numpad 1 / Home+shift → direction 4 (S)    // 0x004125C6
    0xA2: 3, 0xC1: 3,                 // Numpad 2 / Down → direction 3 (SE)          // 0x004125C6
    0xA3: 2, 0xC6: 2,                 // Numpad 3 / PgDn → direction 2 (E)           // 0x004125C6
    0xA4: 5, 0xC2: 5,                 // Numpad 4 / Left → direction 5 (SW)          // 0x004125C6
    0xA6: 1, 0xC3: 1,                 // Numpad 6 / Right → direction 1 (NE)         // 0x004125C6
    0xA7: 6, 0xC4: 6,                 // Numpad 7 / Home → direction 6 (W)           // 0x004125C6
    0xA8: 7, 0xC0: 7,                 // Numpad 8 / Up → direction 7 (NW)            // 0x004125C6
    0xA9: 0, 0xC5: 0,                 // Numpad 9 / PgUp → direction 0 (N)           // 0x004125C6
  },

  // --- City View Numpad (in city dialog mode, DAT_00655aea & 0x40) ---
  cityViewKeys: {
    scrollDown: [0xA2, 0xA6, 0xC1, 0xC3],  // thunk_citywin_BD13 (next city)        // 0x004125C6
    scrollUp:   [0xA4, 0xA8, 0xC0, 0xC2],  // thunk_citywin_BF72 (prev city)        // 0x004125C6
  },

  // --- Menu Command IDs (map_key handles these from menu bar) ---
  menuCommands: {
    0xB0: 'find_city',                 // thunk_FUN_0042d71e                          // 0x004125C6
    0xB1: 'city_report',               // thunk_FUN_0042f079                          // 0x004125C6
    0xB2: 'science_report',            // thunk_FUN_004308ae                          // 0x004125C6
    0xB3: 'trade_report',              // thunk_FUN_0042e185                          // 0x004125C6
    0xB4: 'attitude_advisor',          // thunk_FUN_0042cd2f                          // 0x004125C6
    0xB5: 'wonders_of_world',          // thunk_FUN_0042b67d                          // 0x004125C6
    0xB6: 'top_5_cities',              // thunk_FUN_00431c73                          // 0x004125C6
    0xB7: 'demographics',              // thunk_FUN_00433122                          // 0x004125C6
    0xB8: 'spaceships',                // thunk_FUN_00435d15                          // 0x004125C6
    0xBA: 'intelligence_report',       // thunk_FUN_00434d8a                          // 0x004125C6
    0xBB: 'battle_log',                // thunk_FUN_00598b4e                          // 0x004125C6
    0xD2: 'open_city_dialog',          // thunk_citywin_994F                          // 0x004125C6
    0x243: 'scenario_editor',          // thunk_FUN_004b7eb6                          // 0x004125C6
    0x244: 'trade_routes',             // thunk_FUN_0043856b                          // 0x004125C6
    0x245: 'research_dialog',          // thunk_FUN_004e1452                          // 0x004125C6
    0x246: 'map_editor_toggle',        // thunk_FUN_00553ff6                          // 0x004125C6
    0x247: 'toggle_grid',              // DAT_00655aea ^= 0x20                        // 0x004125C6
    0x248: 'really_quit',              // s_REALLYQUIT dialog                         // 0x004125C6
    0x24B: 'scenario_parameters',      // thunk_FUN_00554297                          // 0x004125C6
    0x24C: 'set_game_year',            // thunk_FUN_004e068d                          // 0x004125C6
    0x24E: 'activate_unit',            // thunk_FUN_0058bd84                          // 0x004125C6
    0x24F: 'set_human_player',         // thunk_FUN_004e0ab0                          // 0x004125C6
    0x250: 'set_computer_player',      // thunk_FUN_004e0d71                          // 0x004125C6
    0x251: 'create_unit',              // thunk_FUN_004e22c9(0)                       // 0x004125C6
    0x252: 'create_unit_veteran',      // thunk_FUN_004e22c9(1)                       // 0x004125C6
    0x253: 'save_game_menu',           // thunk_save_game(0)                          // 0x004125C6
    0x254: 'load_scenario',            // thunk_FUN_0055b2c6                          // 0x004125C6
    0x257: 'palace_dialog',            // thunk_FUN_0049836a                          // 0x004125C6
    0x258: 'max_zoom_out',             // DAT_0066ca8c = 0xfff9 (-7)                 // 0x004125C6
    0x259: 'scenario_event_editor',    // thunk_FUN_004e0f18                          // 0x004125C6
    0x25A: 'max_zoom_in',              // DAT_0066ca8c = 8                            // 0x004125C6
    0x354: 'select_next_unit',         // thunk_FUN_00516570                          // 0x004125C6
  },

  // --- Cheat Menu Commands (require DAT_00655aea & 0x8000 and DAT_00655b02 == 0) ---
  cheatMenuCommands: {
    0x1B0: 'reveal_map',               // thunk_FUN_005551b3                          // 0x004125C6
    0x1B1: 'set_difficulty',           // thunk_FUN_0055560f                          // 0x004125C6
    0x1B2: 'edit_unit',                // thunk_FUN_0055583f                          // 0x004125C6
    0x1B3: 'edit_city',                // thunk_FUN_00555a02                          // 0x004125C6
    0x1B4: 'create_tech',              // thunk_FUN_00555a8b                          // 0x004125C6
    0x1B5: 'toggle_cheat_mode',        // thunk_FUN_00554423                          // 0x004125C6
    0x1B6: 'edit_terrain',             // thunk_FUN_00554962                          // 0x004125C6
    0x1B7: 'destroy_all_units',        // DAT_00633678 = -1; destroy                  // 0x004125C6
    0x1B8: 'edit_resources',           // thunk_FUN_0055615c                          // 0x004125C6
    0x331: 'debug_dialog',             // thunk_FUN_00417566                          // 0x004125C6
    0x332: 'goto_coordinate',          // thunk_FUN_00429e77                          // 0x004125C6
    0x333: 'military_advisor',         // thunk_FUN_0058760d                          // 0x004125C6
    0x334: 'ai_advisor',               // thunk_FUN_004da9e2                          // 0x004125C6
    0x335: 'multiplayer_admin',        // thunk_FUN_0051c635                          // 0x004125C6
    0x336: 'diplomacy_debug',          // thunk_FUN_004a5d92                          // 0x004125C6
    0x337: 'view_replay',              // thunk_FUN_005b1a29                          // 0x004125C6
    0x338: 'event_editor',             // thunk_FUN_0054ffc8                          // 0x004125C6
    0x343: 'set_city_shields',         // thunk_set_city_shields                      // 0x004125C6
    0x344: 'place_improvement',        // thunk_FUN_00555cb1                          // 0x004125C6
    0x34B: 'remove_improvement',       // thunk_FUN_00556f54                          // 0x004125C6
    0x350: 'set_city_population',      // thunk_FUN_005582ad                          // 0x004125C6
    0x353: 'set_city_food',            // thunk_FUN_0055891d                          // 0x004125C6
    0x355: 'edit_map',                 // thunk_FUN_0055625b                          // 0x004125C6
    0x3B5: 'toggle_ai_control',        // thunk_FUN_005545d3                          // 0x004125C6
    0x3B7: 'destroy_units_and_ai',     // thunk_FUN_0055499f                          // 0x004125C6
  },

  // --- Goto Timer ---
  // When the user clicks a unit and holds, after 400ms it enters goto mode
  gotoHoldTimerMs: 400,                // @ FUN_00410bc3: FUN_005d1f50(callback, 400, 1)  // 0x00410BC3

  sourceAddr: '0x00411F91, 0x00411BF5, 0x004125C6',
};


// ============================================================================
// 21. REVOLUTION INITIATION (Main Menu Handler)
// ============================================================================
// Binary ref: FUN_0040e3b1 @ 0x0040E3B1 (block_00400000.c:3714-3747)
// Complements REVOLUTION_DIALOG (section 4 above) which covers the govt picker.

/**
 * Revolution handler: allows the player to initiate a revolution (government change).
 *
 * Checks:
 *   - Multiplayer lock: (DAT_00655af0 & 0x80) && (DAT_0064bc60 & 0x10) → blocked
 *   - Already in anarchy: (civFlags & 8) → calls thunk_FUN_0055c69d(player, 1) to choose
 *   - Otherwise: shows REVOLUTION dialog, then STARTREV confirmation
 *
 * On confirming revolution:
 *   1. thunk_FUN_0046e020(0x3e, 1, 0, 0) — create "anarchy" event (sound 0x3e = 62)
 *   2. thunk_FUN_0055c066(player, 0)     — set government to anarchy
 *   3. thunk_FUN_004e4ceb()               — trigger AI recalculation
 */
export const REVOLUTION_INITIATION = {
  dialogs: {
    confirm:   'REVOLUTION',           // @ s_REVOLUTION_00624f34                     // 0x0040E3B1
    started:   'STARTREV',             // @ s_STARTREV_00624f40                       // 0x0040E3B1
  },

  // High-res check for dialog size:
  // (DAT_00633584 == 0) - 1U & 8 → pass 8 when high-res, 0 when standard
  highResDialogFlag: 8,                // @ 0x0040E3B1: (DAT_00633584 == 0) - 1U & 8

  // Sound event for entering anarchy
  anarchySoundId: 0x3E,                // 62 — thunk_FUN_0046e020(0x3e, 1, 0, 0)     // 0x0040E3B1

  // Civ data offsets used:
  civFlagOffset: 0x594,                // per-civ record stride                       // 0x0040E3B1
  governmentOffset: 'DAT_0064c6b5',   // government type within civ record            // 0x0040E3B1
  civFlagsWord: 'DAT_0064c6a0',       // civ flags (ushort) — bit 3 = in anarchy     // 0x0040E3B1
  anarchyFlag: 8,                      // bit 3 of civ flags = already in anarchy     // 0x0040E3B1

  // Government name table for dialog text
  govNameTable: 'DAT_0064b9a0',        // government name pointers (4 bytes per entry) // 0x0040E3B1
  govTitleTable: 'DAT_00646878',       // government title strings (0x3c per entry)   // 0x0040E3B1
  govTitleStride: 0x3C,                // 60 bytes per title entry                    // 0x0040E3B1

  // Multiplayer lock bits
  multiplayerLock: {
    flag: 0x80,                        // DAT_00655af0 & 0x80                          // 0x0040E3B1
    revolutionBit: 0x10,               // DAT_0064bc60 & 0x10                          // 0x0040E3B1
  },

  sourceAddr: '0x0040E3B1',
};


// ============================================================================
// 22. MAP GENERATION — TERRAIN ASSIGNMENT
// ============================================================================
// Binary ref: FUN_0040ac5a @ 0x0040AC5A (block_00400000.c:2480-2626)

/**
 * FUN_0040ac5a is the main terrain assignment loop for map generation.
 * It iterates up to 0x400 (1024) times, placing land blobs and converting
 * terrain types based on probability rolls.
 *
 * Blob growth uses a random walk with directional tables at DAT_0062833c/DAT_00628344.
 * After each blob, terrain types near the equator get desert conversion based on
 * climate zone threshold: (mapHeight * 3) / 10.
 *
 * The loop terminates when enough landmasses are placed:
 *   total = DAT_00624ee8 * 2 + DAT_00624ef4 * 2 + 0xc
 * where DAT_00624ee8 = large continent count, DAT_00624ef4 = small island count.
 */
export const MAP_GENERATION_TERRAIN = {
  // --- Iteration Limits ---
  maxPlacementAttempts: 0x400,         // 1024 — outer loop limit                     // 0x0040AC5A
  targetFormula: 'continents*2 + islands*2 + 12',  // termination condition            // 0x0040AC5A
  continentCountGlobal: 'DAT_00624ee8',// large continent count                       // 0x0040AC5A
  islandCountGlobal: 'DAT_00624ef4',  // small island count                          // 0x0040AC5A
  baseTarget: 0x0C,                    // 12 — base landmass count before scaling      // 0x0040AC5A

  // --- Blob Growth Minimum Threshold ---
  // A placed blob must be at least (5 - iteration/800) tiles to count
  blobMinSizeFormula: '5 - iteration / 800',  // @ 0x0040AC5A line 2600               // 0x0040AC5A

  // --- Terrain Type Conversions (during blob walk) ---
  // Switch on current terrain type, with random probability:
  terrainConversions: {
    // terrain 0 (Desert):   → 1 (Plains), or → 2 (Grassland) if rand()%10 > 1 or blob > 3
    0: { default: 1, convert: 2, probability: 'rand()%10 > 1 || blobSize > 3' },
    // terrain 1 (Plains):   → 2 (Grassland) if rand()%10 > 3
    1: { convert: 2, probability: 'rand()%10 > 3' },
    // terrain 3 (Tundra):   → 2 (Grassland) if rand()%10 > 2
    3: { convert: 2, probability: 'rand()%10 > 2' },
    // terrain 4 (Sea/Shore): always → 2 (Grassland)
    4: { convert: 2, always: true },
    // terrain 5 (?)        : always → 2 (Grassland)
    5: { convert: 2, always: true },
    // terrain 6 (Glacier):  → 1 (Plains)
    6: { convert: 1 },
    // terrain 7 (Arctic):   → 6 (Glacier)
    7: { convert: 6 },
    // terrain 8 (Swamp):    → 9 (Jungle) if rand()%10 > 3
    8: { convert: 9, probability: 'rand()%10 > 3' },
  },

  // --- Climate Zone Threshold for Desert Conversion ---
  // After blob placement, tiles near the equator with terrain 3 (Tundra)
  // and within (mapHeight*3)/10 of center get checked for desert conversion
  climateZone: {
    numerator: 3,
    denominator: 10,
    formula: 'abs(mapHeight/2 - tileY) < (mapHeight * 3) / 10',
    targetTerrain: 3,                  // Tundra tiles are candidates                 // 0x0040AC5A
  },

  // --- Directional Walk Tables ---
  directionTableX: 'DAT_0062833c',     // 4-entry dx table for blob walk              // 0x0040AC5A
  directionTableY: 'DAT_00628344',     // 4-entry dy table for blob walk              // 0x0040AC5A
  neighborCheckTable: {
    dx: 'DAT_00628370',                // 20-entry dx table for neighbor check         // 0x0040AC5A
    dy: 'DAT_006283a0',               // 20-entry dy table for neighbor check         // 0x0040AC5A
    count: 0x14,                       // 20 neighbors checked                        // 0x0040AC5A
  },

  // --- Random Blob Size for Island Placement (FUN_0040aaa4) ---
  // islandBlobSize = (rand() & 0xF) + 1, i.e. 1-16 tiles
  islandBlobSizeRange: { min: 1, max: 16 },  // @ FUN_0040AAA4                        // 0x0040AAA4

  // --- Continent Blob Size (FUN_0040a92f) ---
  // continentBlobSize = rand() % 0x30, halved if on special tile, + 1
  continentBlobSizeRange: { max: 0x30, note: 'rand() % 48, halved on special tile, + 1' },  // 0x0040A92F

  sourceAddr: '0x0040AC5A, 0x0040A92F, 0x0040AAA4',
};


// ============================================================================
// 23. EDITOR TAB SYSTEM — LIST CONTENTS
// ============================================================================
// Binary ref: FUN_00416354 @ 0x00416354 (block_00410000.c:2983-3048)

/**
 * The map/scenario editor uses a tabbed list control with 5 tabs (cases 0-4).
 * Each tab populates its list from different data sources.
 *
 * The list item area is 0xA0 (160) pixels wide.
 * List height = tab_count * 8 pixels (from viewport+0x2e8 << 3).
 *
 * Tab layout positions are stored in DAT_00625128/DAT_0062512c (8 bytes per tab).
 */
export const EDITOR_TAB_SYSTEM = {
  listWidth: 0xA0,                     // 160 pixels — list item area width            // 0x00416354
  listHeightFormula: 'tabCount * 8',   // list height = *(viewport+0x2e8) << 3         // 0x00416354

  tabs: {
    // Tab 0: Advances (100 entries from advance name table)
    0: {
      name: 'Advances',
      source: 'DAT_00627684',          // advance name pointers                       // 0x00416354
      stride: 0x10,                    // 16 bytes per advance record                 // 0x00416354
      count: 100,                      // 100 advance entries                         // 0x00416354
    },
    // Tab 1/2: "None" + "None" headers (from DAT_00628420 offsets) + 100 advances
    1: {
      name: 'Prerequisites (1)',
      headerSources: [0x7C0, 0x7C4],  // DAT_00628420 + offset → "None" string IDs    // 0x00416354
      source: 'DAT_00627684',
      count: 100,
    },
    2: {
      name: 'Prerequisites (2)',
      headerSources: [0x7C0, 0x7C4],  // same as tab 1                               // 0x00416354
      source: 'DAT_00627684',
      count: 100,
    },
    // Tab 3: 4 special items (from DAT_00628420 offsets 0x810-0x81c)
    3: {
      name: 'Epochs',
      headerSources: [0x810, 0x814, 0x818, 0x81C],  // 4 epoch-related strings        // 0x00416354
      count: 4,
    },
    // Tab 4: 5 special items (from DAT_00628420 offsets 0x820-0x830)
    4: {
      name: 'Flags',
      headerSources: [0x820, 0x824, 0x828, 0x82C, 0x830],  // 5 flag-related strings  // 0x00416354
      count: 5,
    },
  },

  // Tab selector button dimensions: 0x30 (48) pixels wide, tabCount+6 pixels tall
  tabButtonWidth: 0x30,                // @ FUN_00416734: 48 pixels per tab button     // 0x00416734
  tabButtonHeightFormula: 'tabCount + 6',

  // Tab layout positions (X,Y offsets per tab from DAT_00625128)
  tabPositionTable: 'DAT_00625128',    // 8 bytes per tab: {x: int32, y: int32}        // 0x00416354
  tabPositionStride: 8,                // bytes per entry                              // 0x00416354

  sourceAddr: '0x00416354, 0x00416734',
};


// ============================================================================
// 24. EDITOR RENDERING — LABEL STRING IDS
// ============================================================================
// Binary ref: FUN_00416828 @ 0x00416828 (block_00410000.c:3091-3165)

/**
 * The editor paint handler renders tab labels using string IDs from thunk_FUN_0040bc10.
 * These correspond to resource string table entries in the DLL.
 */
export const EDITOR_LABEL_IDS = {
  // Label string IDs rendered in editor tab headers
  tab0Label: 0x7E,                     // first two tab labels use 0x7E               // 0x00416828
  tab2Label: 0x1EB,                    // "Advances" tab label                        // 0x00416828
  tab3Label: 0x1EC,                    // "Epoch" tab label                           // 0x00416828
  tab4Label: 0x1ED,                    // tab 4 label                                 // 0x00416828
  tab5Label: 0x1EE,                    // tab 5 label                                 // 0x00416828
  titleLabel: 0x1EA,                   // editor title label                          // 0x00416828

  // Editor sprite cell position offsets
  spritePosX: 0x20,                    // sprite cell X offset from viewport           // 0x00416828
  spritePosY: 0x20,                    // sprite cell Y offset from viewport           // 0x00416828
  spriteWidth: 0x48,                   // 72 pixels — editor sprite cell width         // 0x00416828
  spriteHeight: 0x28,                  // 40 pixels — editor sprite cell height        // 0x00416828

  // Minimap overlay in editor: 0x29 × 0x12 = 41 × 18 tiles
  editorMinimapSize: {
    cols: 0x29,                        // 41 columns                                  // 0x00416828
    rows: 0x12,                        // 18 rows                                     // 0x00416828
  },

  // Annotation label Y offset from viewport bottom
  annotationYOffset: 0xE6,             // @ 0x00416828: y = viewport_y - tabHeight + 0xe6

  sourceAddr: '0x00416828',
};


// ============================================================================
// 24b. RULES EDITOR MAIN — DIALOG FRAME & BUTTONS
// ============================================================================
// Binary ref: FUN_00416c9e create_rules_editor @ 0x00416C9E (block_00410000.c:3174)

export const RULES_EDITOR_DIALOG = {
  // Dialog frame background sprite (via thunk_FUN_005534bc)
  dialogFrame: 0x734,                  // rules editor dialog frame background          // 0x00416c9e

  // Bottom toolbar buttons — same pattern as scenario editor
  buttons: {
    navA:    { id: 0x65, spriteOffset: 0x3f8, callback: 'LAB_00401e51' },            // 0x00416c9e
    navB:    { id: 0x65, spriteOffset: 0xa8,  callback: 'LAB_00402054' },            // 0x00416c9e
    actionA: { id: 0x66, spriteOffset: 0x8ec, callback: 'LAB_00403bb1' },            // 0x00416c9e
    actionB: { id: 0x66, spriteOffset: 0x3fc, callback: 'LAB_0040394a' },            // 0x00416c9e
    sideNav: { id: 0x65, spriteOffset: 0x7cc, callback: 'LAB_004019d3' },            // 0x00416c9e
  },

  // Window dimensions: 0x230 x 0x17c (560 x 380)
  windowSize: { width: 0x230, height: 0x17c },                                       // 0x00416c9e
  backgroundGif: 'EDITORPT_GIF',       // @ s_EDITORPT_GIF_00625258                    // 0x00416c9e
  initialButtonId: 0xc9,               // DAT_006a1d80 = 0xc9                           // 0x00416c9e

  sourceAddr: '0x00416C9E',
};


// ============================================================================
// 24c. TECH PREREQ LIST SPRITES
// ============================================================================
// Binary ref: FUN_00415b52 populate_tech_prereq_list @ 0x00415B52 (block_00410000.c:2730)

export const TECH_PREREQ_LIST_SPRITES = {
  // Section header sprites loaded when displaying tech prerequisite trees
  leadsToHeader:       0x808,          // "Leads to:" section header (improvements)     // 0x00415b52
  alsoLeadsToHeader:   0x80c,          // "Also leads to:" section header (other techs) // 0x00415b52
  prereqChainFormat:   0x1ec,          // prerequisite chain display format string       // 0x00415b52

  // Maximum entries per list: 0x3e (62) improvements, 100 advances
  improvementsMax: 0x3e,               // loop bound for improvement scan               // 0x00415b52
  advancesMax: 100,                    // loop bound for advance scan                   // 0x00415b52

  sourceAddr: '0x00415B52',
};


// ============================================================================
// 24d. CIVILOPEDIA EDIT & MAP LOAD DIALOG SPRITES
// ============================================================================
// Binary ref: FUN_004161b5 edit_civilopedia_entry @ 0x004161B5 (block_00410000.c:2914)
//             FUN_0041dd0e load_scenario_map @ 0x0041DD0E (block_00410000.c:6805)

export const EDITOR_MISC_DIALOG_SPRITES = {
  // Civilopedia edit window resource
  // @ FUN_004161b5: thunk_FUN_00428b0c(DAT_00628420 + 0x7d8, 0, &LAB_00401d8e)
  civilopediaEditWindow: 0x7d8,        // civilopedia entry edit window sprite          // 0x004161b5

  // Scenario map load dialog title
  // @ FUN_0041dd0e: thunk_FUN_00428b0c(DAT_00628420 + 0x40c, filename, ...)
  mapLoadDialogTitle: 0x40c,           // file open dialog title for scenario map load  // 0x0041dd0e

  // Custom city style icons (new_game_setup_wizard)
  // @ FUN_0041ba52: loop 0..3, DAT_00628420 + 0x3d8 + i*4
  cityStyleIconBase: 0x3d8,            // base offset for 4 city style icon sprites     // 0x0041ba52
  cityStyleIconStride: 4,              // 4 bytes between each style icon offset        // 0x0041ba52
  cityStyleIconCount: 4,               // 4 city styles                                 // 0x0041ba52

  sourceAddr: '0x004161B5, 0x0041DD0E, 0x0041BA52',
};


// ============================================================================
// 24e. CITY NAME EDITOR SPRITES
// ============================================================================
// Binary ref: FUN_0042903e city_name_editor_create_buttons @ 0x0042903E (block_00420000.c:3150)
//             FUN_004293a8 city_name_editor_paint @ 0x004293A8 (block_00420000.c:3213)
//             FUN_00429671 city_name_editor_open @ 0x00429671 (block_00420000.c:3276)

export const CITY_NAME_EDITOR_SPRITES = {
  // Dialog frame for city name editor (via thunk_FUN_005534bc)
  // @ FUN_00429671: DAT_00628420 + 0x738 — already documented as mapEditorTitle
  dialogFrame: 0x738,                  // city name editor dialog frame                 // 0x00429671

  // Additional button sprite unique to city name editor
  // @ FUN_00429671: DAT_00628420 + 0x8f0
  additionalButton: 0x8f0,            // extra editor navigation button sprite          // 0x00429671

  // Name set buttons — 3 sets of different sizes
  // @ FUN_0042903e: param_1 == 0 → set 0 (6 items), param_1 == 1 → set 1 (4 items), param_1 == 2 → set 2 (2 items)
  nameSetButtons: {
    set0: [0x834, 0x838, 0x83c, 0x840, 0x844, 0x848],  // 6 button sprites for name set 0    // 0x0042903e
    set1: [0x84c, 0x850, 0x854, 0x858],                 // 4 button sprites for name set 1    // 0x0042903e
    set2: [0x85c, 0x860],                                // 2 button sprites for name set 2    // 0x0042903e
  },

  // Column header labels in paint handler
  // @ FUN_004293a8: thunk_FUN_0040bc10(offset) for column headers
  columnHeaders: {
    column0: 0x864,                    // first column header label text                // 0x004293a8
    column1: 0x868,                    // second column header label text               // 0x004293a8
    column2: 0x86c,                    // third column header label text                // 0x004293a8
  },

  sourceAddr: '0x0042903E, 0x004293A8, 0x00429671',
};


// ============================================================================
// 25. PARITY CHECK (Tile Coordinate Validity)
// ============================================================================
// Binary ref: FUN_0040bcb0 @ 0x0040BCB0 (block_00400000.c:2705-2709)

/**
 * FUN_0040bcb0 validates tile coordinate parity for the isometric grid.
 * A tile at (x, y) is valid only if (x + y) is even (same parity).
 *
 * Implementation: return (-(y + x >> 1) - x & 2) == 0
 * This is equivalent to: return (x + y) % 2 == 0
 */
export const TILE_PARITY_CHECK = {
  // Coordinates are valid when (x + y) % 2 == 0
  // This is enforced by the isometric diamond grid
  formula: '(x + y) % 2 == 0',
  sourceAddr: '0x0040BCB0',
};


// ============================================================================
// 26. GAME INITIALIZATION CONSTANTS
// ============================================================================
// Binary ref: FUN_0041b4c0 @ 0x0041B4C0 (block_00410000.c:5774-5881)
//             FUN_0041b8b0 @ 0x0041B8B0 (block_00410000.c:5890-5906)
//             FUN_0041f69f @ block_00410000.c:7694+ (main game loop)

/**
 * Game initialization and main loop constants extracted from block_00410000.c.
 * FUN_0041b4c0 initializes the game engine, FUN_0041f69f is the main game loop.
 */
export const GAME_INIT = {
  // --- Multimedia Timer Resolution ---
  // timeBeginPeriod(4) at init, timeEndPeriod(4) at shutdown
  multimediaTimerPeriodMs: 4,          // @ FUN_0041b4c0 line 5790 / FUN_0041b8b0 line 5904

  // --- Player Slots ---
  maxPlayerSlots: 8,                   // 8 slots (0-7), slot 0 = barbarians          // 0x0041B4C0
  playerViewportStride: 0x3F0,         // 1008 bytes per viewport/player slot          // 0x0041B4C0
  playerViewportBase: 'DAT_0066ca84',  // base of per-player viewport array            // 0x0041B4C0

  // --- Unit Slots ---
  maxUnitSlots: 0x800,                 // 2048 unit slots                              // 0x0041F69F
  unitSlotStride: 0x20,                // 32 bytes per unit slot                       // 0x0041F69F
  unitSlotBase: 'DAT_0065610a',        // base of unit array                           // 0x0041F69F
  unitSlotInitValues: {
    active: 0,                         // *(DAT_0065610a + i*0x20) = 0                 // 0x0041F69F
    owner: 0xFFFF,                     // *(DAT_00656106 + i*0x20) = 0xFFFF            // 0x0041F69F
    location: 0xFFFF,                  // *(DAT_00656108 + i*0x20) = 0xFFFF            // 0x0041F69F
  },

  // --- City Slots ---
  maxCitySlots: 0x100,                 // 256 city slots                               // 0x0041F69F
  citySlotStride: 0x58,                // 88 bytes per city slot                       // 0x0041F69F

  // --- Event Memory ---
  eventMemoryAllocation: 50000,        // thunk_FUN_004fa5d9(50000) — event buffer     // 0x0041F69F

  // --- Civ Diplomacy Reset ---
  diplomacyResetSize: 0xC0,            // 192 bytes of diplomacy state, cleared to -1  // 0x0041F69F

  // --- INI Settings (Read During Init) ---
  iniFile: 'CIV.INI',                 // @ s_CIV_INI_* (multiple refs)                // 0x0041B4C0
  iniSection: 'Civilization Gold',     // @ s_Civilization_Gold_*                      // 0x0041B4C0
  iniKeys: {
    languagePreference: {
      key: 'Language Preference',      // @ s_Language_Preference_00625388              // 0x0041B177
      default: 0,
    },
    heraldWarningShown: {
      key: 'Herald Warning Shown',     // @ s_Herald_Warning_Shown_0062542c            // 0x0041B4C0
      default: 0,
    },
    simultaneous: {
      key: 'Simultaneous',             // @ s_Simultaneous_006257d4                    // 0x0041F69F
      default: -1,
      note: 'If > 0, enables simultaneous multiplayer mode',
    },
    maxPlayers: {
      key: 'MaxPlayers',               // @ s_MaxPlayers_00625830                      // 0x0041F69F
      default: -1,
      range: { min: 4, max: 7 },
    },
    netTimeout: {
      key: 'NetTimeOut',               // @ s_NetTimeOut_* (from GAME_SETUP)
      default: 30,
    },
  },

  // --- Resolution Threshold ---
  // If DAT_006acbb0 + screen_width > 1000, load high-res art
  highResThreshold: 1000,              // @ FUN_0041b4c0 line 5863                     // 0x0041B4C0
  highResArtIds: [0x18, 0x14, 0x18],   // 3 art resources loaded for high-res          // 0x0041B4C0
  highResDisplayMode: { columns: 3, rows: 2 },  // thunk_FUN_00421e40(3, 2)            // 0x0041B4C0

  // --- LABELS.TXT Parsing ---
  stringHeapSection: 'STRINGHEAP',     // @ s_STRINGHEAP_00625410                      // 0x0041B4C0
  nilString: '<nil>',                  // @ s_<nil>_0062541c — default empty string     // 0x0041B4C0

  // --- Flush Send Buffer Timeouts (Multiplayer) ---
  flushTimeouts: {
    gameStart: 180000,                 // 3 minutes — XD_FlushSendBuffer(180000)       // 0x0041F69F
    normalFlush: 5000,                 // 5 seconds — XD_FlushSendBuffer(5000)         // 0x0041F69F
  },

  // --- Simultaneous Tutorial Dialog ---
  simulTutorialDialog: 'SIMULTUT',     // @ s_SIMULTUT_0062587c                        // 0x0041F69F

  // --- Chat Log ---
  chatLogFile: 'chatlog.txt',          // @ s_chatlog_txt_00625888                     // 0x0041F69F

  sourceAddr: '0x0041B4C0, 0x0041B8B0, 0x0041F69F',
};


// ============================================================================
// 27. MULTIPLAYER LOBBY (block_00420000)
// ============================================================================
// Binary ref: block_00420000.c — DirectPlay lobby, session management, game profile

// --- Menu Enable/Disable Flag Matrix ---
// Timer callbacks that conditionally enable menu redraw based on network state globals.
// Each function checks specific global flags; if any are nonzero, sets
// DAT_006ad678[0xf] |= 0x400 to trigger UI invalidation.
export const MP_MENU_FLAGS = {
  redrawFlag: 0x400,             // ORed into DAT_006ad678[0xf] to force repaint  // 0x0042417A

  // FUN_0042417a: enables if any of these are nonzero                          // 0x0042417A
  networkEventGroup1: {
    fn: '0x0042417A',
    flags: ['DAT_006c8ff0', 'DAT_006c900c', 'DAT_006c8ff4', 'DAT_006c9024'],
    desc: 'general network error/state: data received, connection lost, data sent, timeout',
  },

  // FUN_0042433c: enables if any of these are nonzero                          // 0x0042433C
  networkEventGroup2: {
    fn: '0x0042433C',
    flags: ['DAT_006c8ff0', 'DAT_006c900c', 'DAT_006c9010'],
    desc: 'data received, connection lost, session lost',
  },

  // FUN_0042439c: enables if any of these are nonzero                          // 0x0042439C
  networkEventGroup3: {
    fn: '0x0042439C',
    flags: ['DAT_006c9038', 'DAT_006c900c'],
    desc: 'player joined/left, connection lost',
  },

  // FUN_004243ef: enables if any of these are nonzero                          // 0x004243EF
  networkEventGroup4: {
    fn: '0x004243EF',
    flags: ['DAT_006c902c', 'DAT_006c900c', 'DAT_006c8ff4'],
    desc: 'lobby message received, connection lost, data sent',
  },

  // Global addresses as network event codes:
  // DAT_006c8ff0 = data received event
  // DAT_006c8ff4 = data sent event
  // DAT_006c900c = connection lost event
  // DAT_006c9010 = session lost event
  // DAT_006c9024 = timeout event
  // DAT_006c902c = lobby message received event
  // DAT_006c9038 = player joined/left event
};

// --- Lobby Refresh Timer ---
// FUN_0042444f (called as FUN_00424446 thunk): periodic lobby UI refresh
export const LOBBY_REFRESH_TIMER = {
  // Timer condition: if DAT_006ad300 == -1, use timing threshold
  // threshold: 0x4d8 (1240ms) since last DAT_006ad674 timestamp               // 0x0042444F
  timingThresholdMs: 0x4D8,      // 1240ms — minimum interval between refreshes // 0x0042444F
  lastRefreshTime:   'DAT_006ad674',  // stored tick of last refresh            // 0x0042444F
  activeSessionVar:  'DAT_006ad300',  // -1 = no active session                 // 0x0042444F
  // When DAT_006ad300 != -1, always trigger redraw (active session mode)
  redrawFlag:        0x400,       // DAT_006ad678[0xf] |= 0x400                 // 0x0042444F
};

// --- Session Node Structure ---
// FUN_0042570c: session_cleanup — linked-list traversal with timeout expiry
// Session node layout (allocated on heap, linked list):
export const SESSION_NODE = {
  // Linked-list offsets within each session node:                               // 0x0042570C
  offsets: {
    next:        0x20,    // +0x20: pointer to next node                        // 0x0042570C
    prev:        0x24,    // +0x24: pointer to previous node                    // 0x0042570C
    timestamp:   0x28,    // +0x28: creation/update timestamp (tick count)      // 0x0042570C
    id:          0x2C,    // +0x2C: session ID (assigned from DAT_006ad108[1])  // 0x004257FE
    name:        0x70,    // +0x70: session/game name string                    // 0x004257FE
    host:        0x90,    // +0x90: host name string                            // 0x004257FE
    settings_b0: 0xB0,    // +0xB0: game settings field (short)                // 0x004257FE
    settings_b4: 0xB4,    // +0xB4: player bitmask                             // 0x004257FE
    settings_b5: 0xB5,    // +0xB5: additional settings                        // 0x004257FE
    timer:       0xB8,    // +0xB8: turn timer setting                         // 0x004257FE
    scenario:    0xBC,    // +0xBC: scenario flag                              // 0x004257FE
    // +0x110-0x120: various status flags                                      // 0x004257FE
  },
  // Timeout: DAT_006ad8b8 * 0x3c (timeout_seconds * 60) in ticks              // 0x0042570C
  timeoutFormula: 'DAT_006ad8b8 * 0x3C',  // timeout * 60 ticks               // 0x0042570C
  timeoutVar:     'DAT_006ad8b8',          // base timeout value in seconds    // 0x0042570C
  listHead:       'DAT_006c31d4',          // linked list head pointer          // 0x0042570C
};

// --- DirectPlay Lobby Opcodes ---
// XD_LobbySendMessage calls during lobby connection (block_00420000.c lines 1170-1178)
export const LOBBY_OPCODES = {
  announce: 1,          // XD_LobbySendMessage(1) — announce presence to lobby  // 0x00422228
  gameInfo: 3,          // XD_LobbySendMessage(3) — send game info to lobby     // 0x00422228
  // Called after XD_OpenConnection succeeds and DAT_006ad228 != -1
  connectionTimeout: 'DAT_006ad8b8 * 1000',  // ms — connection timeout        // 0x00422228
  connectionTimeoutVar: 'DAT_006ad8b8',       // base timeout in seconds       // 0x00422228
  waitDialogKey:     'WAITINGFORSERVER',       // shown during connection wait  // 0x00422228
};

// --- Game Profile Dialog Fields ---
// FUN_004259a6 (1423 bytes): game profile dialog — shows game settings summary
export const GAME_PROFILE_DIALOG = {
  dialogKey: 'GAMEPROFILE',                                                     // 0x004259A6
  // String IDs used for field labels
  stringIds: {
    password:   0x277,   // password field (0x277 if no password, 0x278 if set) // 0x004259A6
    difficulty: { base: 0x279, offset: 'DAT_00655b08' },  // 0x279 + difficulty level // 0x004259A6
    enemies:    { base: 0x27F, offset: 'DAT_00655b09' },  // 0x27F + enemy count // 0x004259A6
    noTimer:    0x285,   // displayed when DAT_00654b70 == 0 (no timer)         // 0x004259A6
    scenario:   0x34C,   // scenario name (fallback)                            // 0x004259A6
  },
  // Bitmask-to-count table: maps a bitmask to number of set bits
  // Used to count players from player bitmask                                  // 0x004259A6
  bitmaskToCount: [0, 1, 3, 7, 0x0F, 0x1F, 0x3F, 0x7F, 0xFF],
  // Timer display: DAT_00654b70 / 1000 → minutes:seconds
  timerVar: 'DAT_00654b70',      // timer duration in milliseconds              // 0x004259A6
  maxPlayers: 8,                  // player count loop (8 bits checked)          // 0x004259A6
};


// ============================================================================
// 29. DIPLOMACY DIALOG
// ============================================================================
// Binary ref: FUN_004548a9 (diplomacy_init) @ block_00450000.c (1506 bytes)
//             FUN_00454f83 (diplomacy_calc_state) @ block_00450000.c (414 bytes)
//             FUN_00455183 (diplomacy_load_map) @ block_00450000.c (401 bytes)
//             FUN_00455314 (diplomacy_populate_items) @ block_00450000.c (1694 bytes)

/**
 * The diplomacy dialog presents a multi-panel negotiation interface
 * with animated leader portraits, a world map background, and
 * trade/treaty item grids arranged in 4 rows of 4 columns.
 */
export const DIPLOMACY_DIALOG = {
  sourceAddr: '0x004548A9',

  // --- DLL and Resource Loading ---
  dllFile:         'cv_dll',           // @ s_cv_dll_00626a08 — leader video DLL  // 0x004548A9
  maxViewportWidth: 0x500,             // 1280px — clamped screen width            // 0x004548A9
  viewportHeight:   0x1E0,             // 480px — fixed viewport height            // 0x004548A9

  // --- Sound Resources ---
  // Three music tracks loaded via FUN_005bf5e1(id, volume, param, buffer)
  sounds: {
    intro:    { id: 300,   volume: 10, param: 0xEC },                             // 0x004548A9
    midTheme: { id: 0x131, volume: 10, param: 0xEC },   // 305 decimal            // 0x004548A9
    altTheme: { id: 0x136, volume: 10, param: 0xEC },   // 310 decimal            // 0x004548A9
  },

  // --- Button Grid Layout (4 rows of 4 columns each) ---
  // Rows are negotiation item categories. Each button is a clickable
  // trade/treaty option. Created via FUN_005cedad(buf, 9, x, y, w, h).
  buttonGrid: {
    columns: 4,                        // 4 buttons per row                        // 0x004548A9
    // Row 1 (top treaties): large buttons
    row1: { x: 1, y: 1, w: 0x9E, h: 0x72, xStride: 0x9F },                      // 0x004548A9
    // Row 2 (reciprocal): same size, y shifts +0x73 if > 1 era
    row2: { x: 1, y: 0x74, w: 0x9E, h: 0x72, xStride: 0x9F,
            eraShift: 0x73 },                                                      // 0x004548A9
    // Row 3 (small items): smaller buttons
    row3: { x: 1, y: 0x15A, w: 0x7B, h: 0x52, xStride: 0x7C },                  // 0x004548A9
    // Row 4 (small reciprocal): same small size, y shifts +0x53 if > 1 era
    row4: { x: 1, y: 0x1AD, w: 0x7B, h: 0x52, xStride: 0x7C,
            eraShift: 0x53 },                                                      // 0x004548A9
    // Button cell fill params: FUN_005cf467(7, 9) — colors 7 (bg) and 9 (border)
    fillColors: { background: 7, border: 9 },                                     // 0x004548A9
  },

  // --- City Record Access ---
  cityRecordStride: 0x58,              // 88 bytes per city record                 // 0x004548A9
  cityXOffset:      'DAT_0064f340',    // city X coordinate (short)                // 0x004548A9
  cityYOffset:      'DAT_0064f342',    // city Y coordinate (short)                // 0x004548A9
  cityOwnerOffset:  'DAT_0064f348',    // city owner byte                          // 0x004548A9
  civStyleFn:       'thunk_FUN_00568861', // maps civ index to city style          // 0x004548A9

  // --- Era/State Detection (FUN_00454f83) ---
  // Determines diplomacy era based on city's coastal access and capital flag.
  // Checks 9 neighbor tiles (DAT_00628350/DAT_00628360 direction tables).
  eraDetection: {
    neighborDirs:    9,                // scan 9 adjacent tiles                    // 0x00454F83
    dirTableX:       'DAT_00628350',   // dx table for neighbor scan               // 0x00454F83
    dirTableY:       'DAT_00628360',   // dy table for neighbor scan               // 0x00454F83
    capitalFlag:     0x80,             // city flags bit 7 = capital               // 0x00454F83
    // State 0 (capital): backdrop ID 0x3C, string IDs 0x18/0x1B
    // State 1 (coastal):  backdrop ID 0x39, string IDs 0x18/0x1B
    // State 2 (inland):   backdrop ID 0x3C, string IDs 0x18/0x1F
    states: {
      capital: { era: 0, backdrop: 0x3C, stringA: 0x18, stringB: 0x1B },          // 0x00454F83
      coastal: { era: 1, backdrop: 0x39, stringA: 0x18, stringB: 0x1B },          // 0x00454F83
      inland:  { era: 2, backdrop: 0x3C, stringA: 0x18, stringB: 0x1F },          // 0x00454F83
    },
  },

  // --- Map Background Loading (FUN_00455183) ---
  mapBackground: {
    mapDll:          's_00626a10',      // map background DLL resource              // 0x00455183
    mapOverlay:      's_00626a14',      // map overlay DLL resource                 // 0x00455183
    loadFlags:       0x800,            // DLL load flags                           // 0x00455183
    mapHeight:       0x1E0,            // 480px — map background height            // 0x00455183
    coastCheckItem:  0x19,             // improvement index for coast check        // 0x00455183
    defaultCityStyle: 3,               // fallback city style if coastal           // 0x00455183
    // Leader portrait sound: era * 5 + cityStyle + 0x154
    soundFormula:    'era * 5 + cityStyle + 0x154',                               // 0x00455183
    soundBase:       0x154,            // 340 decimal — base sound index           // 0x00455183
    helpContextId:   0x40271B,         // diplomacy help context                   // 0x00455183
  },

  // --- Negotiation Item Population (FUN_00455314) ---
  // Iterates 0x23 (35) city improvements, then 0x1C (28) wonders.
  itemPopulation: {
    improvementCount: 0x23,            // 35 improvement items iterated            // 0x00455314
    wonderCount:      0x1C,            // 28 wonder items (indexed 0..0x1B)        // 0x00455314
    wonderTable:      'DAT_00655be6',  // wonder ownership table (short[28])       // 0x00455314
    // Special case item indices in improvement loop:
    specialItems: {
      8:    { id: 0x35, hasFlag: true, desc: 'specific improvement item' },       // 0x00455314
      0x1C: { id: 0x23, desc: 'technology item' },                                // 0x00455314
      0x1E: { id: 0x36, hasFlag: true, desc: 'treaty item' },                    // 0x00455314
      0x1F: { id: 0x39, hasFlag: true, desc: 'pact item' },                      // 0x00455314
      0x22: { id: 0x37, hasFlag: true, desc: 'alliance item' },                  // 0x00455314
    },
    // Era 2 overrides:
    era2Overrides: {
      8:    { id: 0x34, hasFlag: true },                                          // 0x00455314
    },
    // Wonder loop special indices:
    wonderSpecialItems: {
      2:    { id1: 0x36, id2: 0x3A, desc: 'era-dependent wonder category' },     // 0x00455314
      3:    { id1: 4, id2: 3, id3: 0x3B, desc: 'era-dependent trade item' },     // 0x00455314
      6:    { id1: 1, id2: 0, desc: 'era-dependent diplomatic item' },            // 0x00455314
      0x13: { id1: 0x37, id2: 0x39, id3: 0x38, desc: 'era-dependent pact' },    // 0x00455314
    },
  },
};


// ============================================================================
// 30. FIND CITY DIALOG
// ============================================================================
// Binary ref: FUN_0040e017 @ block_00400000.c (886 bytes)

/**
 * The Find City dialog (menu command 0x205) presents a scrollable list
 * of all visible cities and navigates to the selected one.
 */
export const FIND_CITY_DIALOG = {
  sourceAddr: '0x0040E017',

  dialogKey:       'FINDCITY',         // @ s_FINDCITY_00624f24                   // 0x0040E017
  dialogFlags:     0x800001,           // thunk_FUN_0040ffa0 dialog mode flags    // 0x0040E017
  memoryAlloc:     0x4000,             // thunk_FUN_0059db08(0x4000) — 16KB       // 0x0040E017

  // --- City Iteration ---
  cityCountVar:    'DAT_00655b18',     // total city count                        // 0x0040E017
  cityRecordStride: 0x58,             // 88 bytes per city record                 // 0x0040E017
  cityPopulationOffset: 'DAT_0064f394',// +0x54: population (nonzero = active)    // 0x0040E017
  cityOwnerOffset: 'DAT_0064f348',    // +0x08: owner civ byte                    // 0x0040E017
  cityVisibilityOffset: 'DAT_0064f34c',// +0x0C: visibility bitmask per civ       // 0x0040E017
  cityNameOffset:  'DAT_0064f360',    // +0x20: city name string                  // 0x0040E017
  cityXOffset:     'DAT_0064f340',    // +0x00: city X coordinate (short)         // 0x0040E017
  cityYOffset:     'DAT_0064f342',    // +0x02: city Y coordinate (short)         // 0x0040E017

  // --- Visibility Conditions ---
  // A city is visible if:
  //   1. God mode (DAT_00655b07 != 0), OR
  //   2. Scenario mode with cheat flag: (DAT_00655af0 & 0x80) && (DAT_0064bc60 & 8), OR
  //   3. City is owned by current player (DAT_006d1da0), OR
  //   4. City's visibility bitmask includes current player bit
  cheatModeVar:    'DAT_00655b07',     // god mode flag                           // 0x0040E017
  scenarioModeFlag: 0x80,             // DAT_00655af0 & 0x80                      // 0x0040E017
  scenarioCheatBit: 0x08,             // DAT_0064bc60 & 0x08                      // 0x0040E017
  currentPlayerVar:'DAT_006d1da0',    // current player civ index                 // 0x0040E017

  // --- Foreign City Annotation ---
  // When a city belongs to a foreign civ, the civ name is appended
  foreignCivNameFn:'thunk_FUN_00493d13', // get civ name by index                 // 0x0040E017
  // Trade presence: string ID 0x1B0 shown if FUN_0043cef9(cityIdx) returns nonzero
  tradePresenceStringId: 0x1B0,       // thunk_FUN_0040bc10(0x1B0) — trade icon   // 0x0040E017
  tradePresenceFn: 'thunk_FUN_0043cef9', // check trade routes for city           // 0x0040E017
  // If trade count > 1, appends DAT_00624f30 + count label
  tradeCountLabel: 'DAT_00624f30',    // trade route count prefix string          // 0x0040E017

  // --- Result Handling ---
  // Selected city navigates viewport: thunk_FUN_00410402(cityX, cityY)
  navigateFn:      'thunk_FUN_00410402', // center map on city coordinates         // 0x0040E017
  // If the city has disorder and belongs to current player:
  disorderHandler: 'thunk_handle_city_disorder_00509590', // open city disorder    // 0x0040E017
  listContainer:   'DAT_00679640',     // listbox container                        // 0x0040E017
};
