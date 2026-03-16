/**
 * Civ2 MGE Cutscenes, Victory/Defeat Sequences & Score — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), blocks 0x00430000-0x005E0000
 *
 * Cutscene object: 0x137C bytes, contains:
 *   - surface, video, timer, string, GDI bitmap sub-objects
 *   - civ_id at +0xF18, font at +0xF1C, text buffer at +0xF24
 *   - text rect at +0x136C, blit surface at +0x4EC, cache at +0x534
 *
 * AVI playback via Video for Windows (VFW) with SMEDS wrapper layer.
 * HRESULT 0x80040154 = VFW_NOT_REGISTERED (missing codec).
 */

// === Game End Reasons ===
// Binary ref: DAT_0064B1AC (game_end_reason)
// Checked by show_victory_screen @ 0x0048B165
export const GAME_END_REASON = {
  NONE:            { value: 0, sourceAddr: '0x0064B1AC', desc: 'Game in progress' },
  SPACESHIP_SELF:  { value: 1, sourceAddr: '0x0048B1A0', desc: 'Player launched winning spaceship' },
  SPACESHIP_OTHER: { value: 2, sourceAddr: '0x0048B1A0', desc: 'Rival launched winning spaceship' },
  DOMINATION:      { value: 3, sourceAddr: '0x0048B1B0', desc: 'Domination victory (2/3 population + land)' },
  CONQUEST:        { value: 4, sourceAddr: '0x0048B1BC', desc: 'Conquest victory (all rivals eliminated)' },
  RETIREMENT:      { value: 5, sourceAddr: '0x0048B1C8', desc: 'Player retired or game ended at turn limit' },
};

// === Victory Screen Dispatch ===
// Binary ref: show_victory_screen @ 0x0048B165 (450 bytes)
// Dispatches to appropriate cutscene based on game_end_reason, then shows
// replay animation, score graph, hall of fame, and final ranking.
// In single player, conquest forces game end; other victories offer "KEEPPLAYING" dialog.
// game_flags bit 0x20 marks "keep playing" accepted (skips HOF on repeat).
export const VICTORY_DISPATCH = {
  sourceAddr: '0x0048B165',
  sizeBytes: 450,
  flow: [
    'switch(game_end_reason) → call cutscene',
    'show_replay_animation()',
    'if !(game_flags & 0x20): show_score_graph → show_hall_of_fame → show_final_ranking',
    'single_player: conquest=end, else show_dialog("KEEPPLAYING")',
    'multiplayer: always end',
    'game_flags |= 0x20; game_end_reason = 0',
  ],
  gameFlagKeepPlaying: 0x20,  // @ 0x0048B1F0
};

// === Victory Sequence (Spaceship Win) ===
// Binary ref: play_winner_video @ 0x004710D0 (606 bytes)
//             load_winner_art @ 0x00471565 (753 bytes)
//             show_winner_text @ 0x00471856 (936 bytes)
//             show_centauri_scrolltext @ 0x00471C2A (397 bytes)
// Negative civ_id → routes to show_beaten_cutscene (rival won)
export const VICTORY_SEQUENCE = {
  entryPoint:    '0x004710D0',
  sizeBytes:     606,
  globalPtr:     'DAT_0062B87C',   // cutscene object pointer

  // Video file
  video: {
    path:        'civ2_video\\winwin.avi',
    searchPath:  'civ2\\civ2.exe',  // CD search for video @ 0x00471580
    dllPath:     'civ2\\civ2art.dll',
    sourceAddr:  '0x00471580',
  },

  // Art resources
  art: {
    dllFile:     'civ2art.dll',
    sourceAddr:  '0x00471565',
  },

  // Timer setup
  timer: {
    intervalMs:  2000,              // @ 0x004715E0 — init_timer(2000, 10, 0xEC, ...)
    timerParam2: 10,
    timerParam3: 0xEC,
  },

  // Text display
  text: {
    fontIndex:   0,
    fontSize:    18,                // @ 0x0047186D — init_font(0, 18, 3)
    fontStyle:   3,
    textRect:    { left: 2, top: 100, right: 638, bottom: 480 }, // @ 0x00471640
    textColor:   0xF1,              // gold — main text @ 0x00471893 (shadow at color 0)
    shadowColor: 0x00,              // black shadow offset (+1,+1)

    // CENTAURI text from game.txt — 3 pages + scroll page
    sections: [
      { section: 'CENTAURI', page: 0, sourceAddr: '0x004718C0' },
      { section: 'CENTAURI', page: 1, sourceAddr: '0x004718C0' },
      { section: 'CENTAURI', page: 2, sourceAddr: '0x004718C0' },
    ],
    scrollSection: { section: 'CENTAURI3', sourceAddr: '0x00471C2A' },
    pageWaitMs:  360,               // wait(360ms) between pages

    // Format args for text substitution
    formatArgs: [
      { index: 0, value: 'leader_name',     source: 'civ_data[civ_id].+0xA4' },
      { index: 1, value: 'score_formatted', source: 'civ_data[civ_id].+0xA6, "0,000"' },
      { index: 2, value: 'nation_title',    source: 'get_nation_title(civ_id)' },
      { index: 3, value: 'leader_title',    source: 'civ_data[civ_id].+0xA2' },
      { index: 4, value: 'civ_name',        source: 'get_civ_name(civ_id)' },
    ],
  },

  // CENTAURI dialog (alternate path when load_winner_art succeeds with result 0)
  centauriDialog: {
    dialogSection: 'CENTAURI',
    sourceAddr:    '0x004711F0',
  },

  // Scroll text rendering
  scrollText: {
    startY:      12,                // @ 0x00471C60
    textColor:   0xFF,              // white — @ 0x00471C8F
    textStyle:   { color: 0xFF, shadow: 0, bold: 1, italic: 1 },
    sourceAddr:  '0x00471C2A',
  },
};

// === Defeat Sequence (Player Eliminated) ===
// Binary ref: play_loser_video @ 0x004702E0 (221 bytes)
//             load_loser_art @ 0x004705D7 (772 bytes)
//             show_loser_text @ 0x004708DB (817 bytes)
//             show_loser_text_page3 @ 0x00470C1C (338 bytes)
export const DEFEAT_SEQUENCE = {
  entryPoint:    '0x004702E0',
  sizeBytes:     221,
  globalPtr:     'DAT_0062B804',   // cutscene object pointer

  // Video file
  video: {
    path:        'loser.avi',       // no subdirectory — @ 0x004705F0
    dllPath:     'civ2art.dll',
    sourceAddr:  '0x004705D7',
  },

  // Timer setup
  timer: {
    intervalMs:  4000,              // @ 0x0047066B — init_timer(4000, 10, 0xEC, ...)
    timerParam2: 10,
    timerParam3: 0xEC,
  },

  // Text display
  text: {
    fontIndex:   0,
    fontSize:    18,                // @ 0x004706F0 — init_font(0, 18, 2)
    fontStyle:   2,
    textRect:    { left: 40, top: 100, right: 600, bottom: 480 }, // @ 0x004706CD
    textColor:   0xFF,              // white — main text @ 0x00470910
    shadowColor: 0x00,              // black shadow offset (+1,+1)

    // ARCHAEOLOGISTS text from game.txt — 3 pages + page 3 variant
    sections: [
      { section: 'ARCHAEOLOGISTS', page: 0, sourceAddr: '0x00470930' },
      { section: 'ARCHAEOLOGISTS', page: 1, sourceAddr: '0x00470930' },
      { section: 'ARCHAEOLOGISTS', page: 2, sourceAddr: '0x00470930' },
    ],
    extraPage: {
      section:   'ARCHAEOLOGISTS3',
      textRect:  { left: 0xE5, top: 0x4C, right: 200, bottom: 0x85 }, // @ 0x00470C80
      sourceAddr: '0x00470C1C',
    },
    pageWaitMs:  360,               // wait(360ms) between pages

    // Format args
    formatArgs: [
      { index: 0, value: 'first_tech_name', source: 'scan tech table for first tech civ has' },
      { index: 1, value: 'civ_name',        source: 'get_civ_name(civ_id)' },
    ],

    // First tech scan: iterates tech_id 0..99, finds first one civ has
    firstTechScan: {
      sourceAddr: '0x00470920',
      maxTechId:  99,
      techTable:  'DAT_00627684',
      note:       'CharLowerA applied to tech name',
    },
  },
};

// === Beaten Sequence (Rival Won Spaceship Race) ===
// Binary ref: show_beaten_cutscene @ 0x00471DD8 (1467 bytes)
// Called when play_winner_video receives negative civ_id
// Standalone — creates own stack-local cutscene objects (no video playback)
export const BEATEN_SEQUENCE = {
  entryPoint:    '0x00471DD8',
  sizeBytes:     1467,

  // No video — text-only cutscene with DLL art
  video:         null,

  // Art resources
  art: {
    dllPath:     'civ2\\civ2art.dll',
    sourceAddr:  '0x00471E20',
  },

  // Surface and timer
  surface: {
    width:       640,
    height:      240,
    rect:        { left: 0, top: 0, right: 640, bottom: 240 },
    inflateX:    -10,               // InflateRect(rect, -10, 0) — horizontal padding
    inflateY:    0,
  },
  timer: {
    intervalMs:  30000,             // @ 0x00471EC0 — very long timer
    timerParam2: 10,
    timerParam3: 0xEC,
  },

  // Text display
  text: {
    fontIndex:   0,
    fontSize:    18,                // @ 0x00471DF0
    fontStyle:   3,
    textColor:   0xFF,              // white main text
    shadowColor: 0x00,              // black shadow

    // CENTAURI_BEATEN text from game.txt — 5 pages
    sections: [
      { section: 'CENTAURI_BEATEN', page: 0, sourceAddr: '0x00471F10' },
      { section: 'CENTAURI_BEATEN', page: 1, sourceAddr: '0x00471F10' },
      { section: 'CENTAURI_BEATEN', page: 2, sourceAddr: '0x00471F10' },
      { section: 'CENTAURI_BEATEN', page: 3, sourceAddr: '0x00471F10' },
      { section: 'CENTAURI_BEATEN', page: 4, sourceAddr: '0x00471F10' },
    ],
    pageWaitMs:  360,

    // Same 5 format args as victory
    formatArgs: [
      { index: 0, value: 'leader_name',     source: 'leader_name(civ_data[civ_id].+0xA4)' },
      { index: 1, value: 'score_formatted', source: 'score_format(civ_data[civ_id].+0xA6, "0,000")' },
      { index: 2, value: 'nation_title',    source: 'get_nation_title(civ_id)' },
      { index: 3, value: 'leader_title',    source: 'leader_title(civ_data[civ_id].+0xA2)' },
      { index: 4, value: 'civ_name',        source: 'get_civ_name(civ_id)' },
    ],
  },
};

// === Wonder Movies ===
// Binary ref: wonder_view_play_video @ 0x004BBDFB (704 bytes)
//             show_wonder_or_advance @ 0x004D0208 (268 bytes, entry point)
//             show_wonder_movie @ 0x004D1725 (154 bytes)
//             play_wonder_video @ 0x004D5B21 (769 bytes, plays AVI in advance window)
//             load_civ2_art_wonder @ 0x004BBB3F (638 bytes, loads wonder art from DLL)
//
// Wonder video path: "civ2_video_wonder" + wonderNumber + ".avi"
//   - String "civ2_video_wonder" at 0x0062DAB8
//   - Extension ".avi" at 0x0062DACC
//   - wonderNumber is zero-padded if < 10 (checked at 0x004BBE18)
//   - Scenario flags 0x40/0x80 at DAT_00655AF0 prevent wonder video playback
//
// Wonder art from "civ2.wonder.dll":
//   - GIF resource ID = wonderNumber + 20000
//   - 10 animation frames per wonder
export const WONDER_MOVIES = {
  // Video playback — FUN_004bbdfb (wonder_view_play_video, 699 bytes)
  videoPlayer: {
    entryAddr:   '0x004BBDFB',
    sizeBytes:   699,
    pathPrefix:  'civ2_video_wonder',
    pathPrefixAddr: '0x0062DAB8',
    pathSuffix:  '.avi',
    pathSuffixAddr: '0x0062DACC',
    // Path format: "civ2_video_wonder" + (pad0 if <10) + wonderNumber + ".avi"
    // Examples: "civ2_video_wonder01.avi", "civ2_video_wonder27.avi"

    // @ FUN_004bbdfb line ~5327: video filename base string
    //   thunk_FUN_0043c840(local_88, s_civ2_video_wonder_0062dab8)
    filenameBase: 'civ2_video_wonder',  // @ 0x0062DAB8

    // @ FUN_004bbdfb line ~5337: video buffer size
    //   FUN_005dd2e3(DAT_0062dad4, 0x200, ...)  — 512-byte buffer for video init
    videoBufferSize: 0x200,         // 512 bytes

    // @ FUN_004bbdfb line ~5351: multiplayer video skip
    //   if (2 < DAT_00655b02) { ... } — skip video completion handling in MP
    //   DAT_00655b02 > 2 means multiplayer mode (LAN=3, hotseat=4, internet=5, direct=6)
    mpVideoSkip: {
      conditionAddr: 'DAT_00655B02',
      threshold: 2,                 // > 2 = multiplayer
      note: 'Wonder video completion effects skipped in multiplayer',
    },

    // @ FUN_004bbdfb line ~5364: VFW error code handling
    //   if (local_8 == -0x7ffbfeac) { ... } — 0x80040154 = VFW_NOT_REGISTERED
    //   Shows VFWNOTREGISTERED dialog when codec is missing
    vfwErrorCode: 0x80040154,       // HRESULT for VFW not registered (-0x7ffbfeac signed)
    vfwDialogKey: 'VFWNOTREGISTERED', // @ 0x0062DAD8: dialog string key
  },

  // Wonder art DLL — FUN_004bbb3f (load_civ2_art_wonder, 638 bytes)
  artDll: {
    dllFile:     'civ2.wonder.dll',
    resourceBase: 20000,            // GIF resource ID = wonderNumber + 20000
    frameCount:  10,                // 10 animation frames per wonder
    sourceAddr:  '0x004BBB3F',
    sizeBytes:   638,

    // @ FUN_004bbb3f line ~5188: wonder video window dimensions
    //   local_14 = 0x140, local_d8 = 0xf0  (320 x 240 pixels)
    windowWidth:  0x140,            // 320px
    windowHeight: 0xF0,             // 240px

    // @ FUN_004bbb3f line ~5199: palette surface dimensions
    //   FUN_005bd65c(0x40, 0x20)  (64 x 32 pixels)
    paletteSurfaceWidth:  0x40,     // 64px
    paletteSurfaceHeight: 0x20,     // 32px

    // @ FUN_004bbb3f line ~5205: wonder art resource loading
    //   FUN_005bf5e1(param_1 + 20000, 10, 0xec, surface)
    //   resource offset = wonderNumber + 20000, stride = 10, height = 0xec (236)
    resourceOffset: 20000,          // added to wonderNumber for GIF resource ID
    resourceStride: 10,             // bpp/palette param
    resourceHeight: 0xEC,           // 236px — art frame height

    // @ FUN_004bbb3f line ~5229: wonder-to-civ-style mapping
    //   DAT_0064c5c0[wonderNumber * 2] — maps wonder to civ architectural style
    //   Used for thunk_FUN_00428b0c() call to select style-appropriate rendering
    wonderStyleMapping: {
      addr:   'DAT_0064C5C0',
      stride: 2,                    // 2 bytes per entry (short)
      usage:  'DAT_0064c5c0[wonderNumber * 2] → civ style index for rendering',
    },
  },

  // Entry point dispatcher
  dispatcher: {
    sourceAddr:  '0x004D0208',
    sizeBytes:   268,
    note:        'Negative param = wonder movie, positive = advance animation',
    // param encoding: wonderId = -(param) + 1 when param < 0
  },

  // Advance window wonder flow
  advanceWindow: {
    showWonderMovie: '0x004D1725',  // sets display_mode=2, plays video, transitions to mode=3
    playWonderVideo: '0x004D5B21',  // actually plays the AVI in the advance window
    videoPlayerSize: 0x0A28,        // video player object size
    displayModes: {
      0: 'normal',                  // standard advance animation
      1: 'with_button',            // pollution mode, extra button
      2: 'video_transition',       // playing wonder video, will transition to mode 3
      3: 'wonder_movie',           // starfield animation + wonder view
    },
  },

  // Scenario prevention — FUN_004bbdfb lines ~5325
  // @ FUN_004bbdfb: if ((DAT_00655af0 & 0x40) == 0 AND (DAT_00655af0 & 0x80) == 0)
  //   Both flags must be clear for wonder video to play
  scenarioFlags: {
    preventVideo1: 0x40,            // DAT_00655AF0 bit 6 — disables wonder video if set
    preventVideo2: 0x80,            // DAT_00655AF0 bit 7 — disables wonder video if set
    flagAddr:      'DAT_00655AF0',
    sourceAddr:    '0x004BBDFB',    // checked at start of FUN_004bbdfb
    logic:         'video plays only if (DAT_00655af0 & 0x40) == 0 AND (DAT_00655af0 & 0x80) == 0',
  },

  // Starfield animation (wonder mode background)
  starfield: {
    sourceAddr:  '0x004D570B',
    sizeBytes:   1046,
    particleCount: 80,              // 0x50 star particles
    timerIntervalMs: 5,             // 5ms animation timer
    screenCenter: { x: 320, y: 240 },
    screenBounds: { width: 640, height: 480 },
    projection:  'perspective (x/z+centerX, y/z+centerY)',
  },

  // Typewriter text effect (advance animation)
  typewriter: {
    sourceAddr:  '0x004D4FD1',
    sizeBytes:   986,
    timerIntervalMs: 60,            // 60ms per character
    labelColor:  0xF9,              // label text
    valueColor:  0xFE,              // value text after ':'
    colonResets: true,              // ':' toggles from label to value color
  },

  // Pollution bar (shown after typewriter completes, not in wonder mode)
  pollutionBar: {
    thresholds: [
      { max: 40,  color: 0xF9, name: 'green' },   // < 0x28
      { max: 75,  color: 0xFB, name: 'yellow' },   // < 0x4B
      { max: Infinity, color: 0xFA, name: 'red' },
    ],
    barRect:     { left: 0, top: 0x1C1, right: 0x27F, bottom: 0x1DF },
    bgColor:     10,                // black background
  },
};

// === Intro Video ===
// Binary ref: play_opening_video @ 0x0046DA40 (851 bytes)
export const INTRO_SEQUENCE = {
  sourceAddr:    '0x0046DA40',
  sizeBytes:     851,
  video: {
    path:        'civ2\\video\\opening.avi',
    dllPath:     'civ2\\civ2art.dll',
  },
  surfaceWidth:  0x800,             // 2048px wide rendering surface
  callbacks: {
    onTimer:     'on_video_timer',
    onKey:       'on_video_key',
    onFrame:     'on_video_frame',
  },
  vfwError:      0x80040154,        // HRESULT for VFW_NOT_REGISTERED
  vfwDialogKey:  'VFWNOTREGISTERED',
};

// === Spaceship Launch Video ===
// Binary ref: play_wonder_video @ 0x004D5B21 (769 bytes)
//             spaceship_launch @ 0x005973FD (815 bytes, game logic)
// Note: The advance window's play_wonder_video function uses the path
// "civ2_video_launch.avi" which appears to be the spaceship launch AVI
// reused in the wonder/advance window context.
export const SPACESHIP_LAUNCH = {
  // Video playback (in advance window context)
  video: {
    path:        'civ2_video_launch.avi',
    sourceAddr:  '0x004D5B21',
    sizeBytes:   769,
    videoPlayerSize: 0x0A28,
  },

  // Game logic trigger
  launchLogic: {
    sourceAddr:  '0x005973FD',
    sizeBytes:   815,
    launchFlag:  2,                  // civ_ss[civ].flags |= 2
    launchTurnAddr: 'DAT_00655AFC',
    currentTurnAddr: 'DAT_00655AF8',
    mpNotification: 0x0B,           // send MP notification msg type
  },

  // AI behavior on launch
  aiBehavior: {
    productionOverride: 99,         // all cities switch to capitalization (item 99)
    diplomacyReactions: {
      // Rival AI reactions when human launches
      easyDifficulty:   'ceasefire via FUN_00467825',
      mediumDifficulty: 'set hatred flag (0x20)',
      hardDifficulty:   'declare war if not at war, else set hatred flag',
      difficultyThresholds: { ceasefire: 2, hatred: 4 },
    },
  },

  // Spaceship dialog
  dialog: {
    sourceAddr:  '0x0059772C',
    sizeBytes:   1567,
    dialogFlags: 0x2000,
    components:  ['structural', 'fuel', 'propulsion', 'hab', 'life', 'solar'],
    stats:       ['mass', 'fuel_ratio_%', 'energy_ratio_%', 'population_ratio_%',
                  'flight_time_turns.tenths', 'success_probability_%'],
  },
};

// === Score / Retirement Screen ===
// Binary ref: render_retirement_score @ 0x00435DC4 (1032 bytes)
//             show_retirement_dialog @ 0x004361CC (187 bytes)
//             render_hall_of_fame_list @ 0x004362E2 (2224 bytes)
export const SCORE_SCREEN = {
  // Score formula
  formula: {
    sourceAddr:  '0x00435DC4',
    sizeBytes:   1032,

    // scoreMult = difficulty + 4 + bonuses
    // bonuses: +1 if difficulty > 2, +1 if difficulty > 3, +2 if difficulty > 4
    // Effective multipliers by difficulty:
    //   Chieftain(0)=4, Warlord(1)=5, Prince(2)=6, King(3)=8, Emperor(4)=10, Deity(5)=12
    difficultyMultipliers: {
      0: 4,   // Chieftain: 0+4
      1: 5,   // Warlord:  1+4
      2: 6,   // Prince:   2+4
      3: 8,   // King:     3+4+1
      4: 10,  // Emperor:  4+4+1+1
      5: 12,  // Deity:    5+4+1+1+2 (note: adjusted, effective = difficulty+4+bonuses)
    },

    // rawScore = (scoreMult * max(approval1, approval2)) / 100
    approval1Addr: 'DAT_00673F88',
    approval2Addr: 'DAT_00673F7C',

    // Rank from triangular numbers: for level 1..24, if (level^2)/3 <= rawScore → rank = level-1
    rankCalculation: {
      maxRank:     23,
      // Rank thresholds: (level^2)/3 for level 1..24
      // level 1: 0, level 2: 1, level 3: 3, level 4: 5, level 5: 8,
      // level 6: 12, level 7: 16, level 8: 21, level 9: 27, level 10: 33,
      // level 11: 40, level 12: 48, level 13: 56, level 14: 65, level 15: 75,
      // level 16: 85, level 17: 96, level 18: 108, level 19: 120, level 20: 133,
      // level 21: 147, level 22: 161, level 23: 176, level 24: 192
      thresholds: [0, 1, 3, 5, 8, 12, 16, 21, 27, 33, 40, 48, 56, 65, 75, 85, 96, 108, 120, 133, 147, 161, 176, 192],
    },

    // Storage
    rankStorageAddr:  'DAT_0063E4EC',
    scoreStorageAddr: 'DAT_0063EA18',
  },

  // Rank titles
  rankTitles: {
    maleSection:   'MALEFAME',      // in game.txt
    femaleSection: 'FEMALEFAME',    // in game.txt
    genderFlagAddr: 'DAT_006554FC', // leader gender flag
    slot0:         'nation_name',   // first text_slot = nation name
  },

  // Retirement dialog
  dialog: {
    sourceAddr:  '0x004361CC',
    sizeBytes:   187,
    dimensions:  { x: 10, y: 10, width: 600, height: 400 },
    soundEffect: { soundId: 3, channel: 0 }, // victory/retirement sound on open
  },

  // Player civ reference
  playerCivAddr: 'DAT_0063EF6C',
};

// === Hall of Fame ===
// Binary ref: render_hall_of_fame_list @ 0x004362E2 (2224 bytes)
export const HALL_OF_FAME = {
  sourceAddr:    '0x004362E2',
  sizeBytes:     2224,

  // 6 records, each 72 (0x48) bytes, at DAT_0063F0C8
  dataAddr:      'DAT_0063F0C8',
  recordCount:   6,
  recordSize:    72,               // 0x48 bytes
  fileName:      'HALLFAME.DAT',

  // Record field layout (offsets within each 72-byte record)
  // Verified against FUN_00436f5a (populate record) and FUN_004362E2 (display)
  recordFields: {
    score:         { offset: 0x00, type: 'int16', desc: 'Score (negative = empty slot)' },
    civId:         { offset: 0x02, type: 'int16', desc: 'Civilization ID (low nibble=difficulty, bit 7=scenario/AC victory)' },
    turnNumber:    { offset: 0x04, type: 'int16', desc: 'Turn number (DAT_00655af8). Used in month calc: turn * |monthsPerTurn| + monthIndex - 1' },
    year:          { offset: 0x06, type: 'int16', desc: 'Year value (DAT_00655afa, init -4000 = 4000 BC)' },
    dateCalc:      { offset: 0x08, type: 'int16', desc: 'Date display value from FUN_0043cce5 (year/turn for display)' },
    yearsPerTurn:  { offset: 0x0A, type: 'int16', desc: 'Years per turn (0xFFFF if no Oedo Year; else DAT_00673f80)' },
    monthsPerTurn: { offset: 0x0C, type: 'int16', desc: 'Months per turn (DAT_0064bcb4). Negative = late-game monthly calendar' },
    monthIndex:    { offset: 0x0E, type: 'int16', desc: 'Month index (DAT_0064bcb6). Used with monthsPerTurn for month display' },
    bloodlustFlag: { offset: 0x10, type: 'int16', desc: 'Bloodlust flag (DAT_00655af0 & 0x80). Affects date/score display' },
    population:    { offset: 0x12, type: 'int16', desc: 'Total population (ranking value, DAT_0063ea18). Used for insertion sort' },
    gender:        { offset: 0x14, type: 'int16', desc: 'Leader gender (0=male MALEFAME, nonzero=female FEMALEFAME). From leader data table' },
    rankLevel:     { offset: 0x16, type: 'int16', desc: 'Rank level (0..23, clamped from DAT_0063e4ec)' },
    leaderName:    { offset: 0x18, type: 'char[24]', desc: 'Leader name string' },
    civName:       { offset: 0x30, type: 'char[24]', desc: 'Civilization name string' },
  },

  // Difficulty encoding in record
  difficultyEncoding: {
    mask:          0x0F,            // lower nibble = difficulty level
    scenarioFlag:  0x80,            // bit 7 = Alpha Centauri victory
    // Note: separate scenarioFlag field may exist for scenario indicator
  },

  // Selected slot tracking
  selectedSlotAddr: 'DAT_0063EFAC',
};

// === Council Advisor Videos ===
// Binary ref: show_council_dialog @ 0x00514E7B (119 bytes)
//             council_construct @ 0x00514F16 (295 bytes)
//             council_init @ 0x005151F4 (802 bytes)
//             council_play_video @ 0x00515516 (1122 bytes)
// Advisor video path: "civ2_video\\" + advisorName + ".avi"
export const COUNCIL_ADVISORS = {
  entryPoint:    '0x00514E7B',

  // DLL for advisor artwork
  artDll: {
    dllFile:     'civ2_mk.dll',
    sourceAddr:  '0x00514F60',
  },

  // Panel dimensions
  panel: {
    rect:        { left: 0xD0, top: 0x39, right: 0x1B1, bottom: 0x14C },
    // (208, 57, 433, 332) — advisor panel area
  },

  // Video playback
  videoPlayback: {
    sourceAddr:  '0x00515516',
    sizeBytes:   1122,
    advisorSlots: 12,               // iterates 12 advisor slots
    musicBase:   0x53,              // plays sound 0x53 + offset for each advisor
    waitMs:      7000,              // 7 seconds per advisor with message pump
    videoPathPattern: 'civ2_video\\{advisorName}.avi',
  },

  // Advisor data table
  advisorData: {
    baseAddr:    'DAT_0065515A',
    stride:      0x18,              // 24 bytes per advisor entry
    civStyleAddr: 'DAT_00655142',   // maps civ_id to civ style for advisor selection
  },

  // Label rendering
  labels: {
    sourceAddr:  '0x00515999',
    sizeBytes:   636,
    initialColor: 0x21,             // shadow text color for initial draw
    activeColor:  0x10,             // active advisor color
  },

  // Scroll animation
  scroll: {
    scrollDown:  '0x00515F3C',
    scrollUp:    '0x00516005',
    scrollSound: 0x6F,              // sound effect on scroll
    pixelsPerStep: 15,              // 15px per animation step
    stepDelayMs: 22,                // 22ms between steps via timeGetTime
    scrollTarget: 0x133,            // scroll until field_6FC >= 0x133 (307px)
  },
};

// === DLL Resource References ===
// All DLLs used by cutscene/video/animation systems
export const DLL_RESOURCES = {
  civ2art: {
    file:        'civ2art.dll',
    usedBy:      ['VICTORY_SEQUENCE', 'DEFEAT_SEQUENCE', 'BEATEN_SEQUENCE'],
    desc:        'Victory/defeat cutscene art (background images, text overlays)',
  },
  civ2WonderDll: {
    file:        'civ2.wonder.dll',
    usedBy:      ['WONDER_MOVIES'],
    desc:        'Wonder artwork GIF resources (10 frames each, resource ID = wonder+20000)',
  },
  ssDll: {
    file:        'ss.dll',
    usedBy:      ['WONDER_MOVIES'],
    desc:        'Throne room / advance window palette and sprites',
    sourceAddr:  '0x004D0B70',
  },
  civ2MkDll: {
    file:        'civ2_mk.dll',
    usedBy:      ['COUNCIL_ADVISORS'],
    desc:        'Council advisor artwork and backgrounds',
  },
};

// === Cutscene Object Layout ===
// Binary ref: ctor_cutscene_object @ 0x004703D4 (186 bytes)
//             dtor_cutscene_object @ 0x004704EC (127 bytes)
// Object size: 0x137C bytes (4988 decimal)
export const CUTSCENE_OBJECT = {
  totalSize:     0x137C,
  ctorAddr:      '0x004703D4',
  dtorAddr:      '0x004704EC',

  // Sub-object construction order (reversed for destruction)
  subObjects: [
    { name: 'base_class',  initFn: 'thunk_FUN_0044c730' },
    { name: 'surface',     initFn: 'FUN_005c64da' },
    { name: 'video',       initFn: 'FUN_005dd010' },
    { name: 'timer',       initFn: 'thunk_FUN_004502b0' },
    { name: 'string',      initFn: 'thunk_FUN_0043c690' },
    { name: 'gdi_bitmap',  initFn: 'FUN_005bd630' },
  ],

  // Key field offsets
  fields: {
    blitSurface: 0x4EC,
    cacheSurface: 0x534,
    videoTimerCb: 0xB8,
    civId:       0xF18,
    fontHandle:  0xF1C,
    textBuffer:  0xF24,
    textRect:    0x136C,
  },
};

// === Video Playback Constants ===
export const VIDEO_CONSTANTS = {
  // VFW error codes
  VFW_NOT_REGISTERED: 0x80040154,

  // Video player object
  playerObjectSize: 0x0A28,        // 2600 bytes

  // All video file paths used by the game
  videoPaths: {
    opening:     'civ2\\video\\opening.avi',     // intro
    winwin:      'civ2_video\\winwin.avi',        // victory
    loser:       'loser.avi',                     // defeat
    launch:      'civ2_video_launch.avi',         // spaceship launch
    // Wonder videos: "civ2_video_wonder" + N + ".avi" (N=00..27)
    wonderPattern: 'civ2_video_wonder{NN}.avi',
    // Advisor videos: "civ2_video\\" + advisorName + ".avi"
    advisorPattern: 'civ2_video\\{name}.avi',
  },
};
