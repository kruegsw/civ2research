/**
 * Civ2 MGE Animation Constants — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), cross-referenced with Civ2-clone (C#)
 *
 * Every constant includes its binary address for traceability.
 * Values extracted from FUN_0057ed3f, FUN_0057f657, block_004D0000,
 * block_005D0000, and Civ2-clone AttackAnimation/MoveAnimation/WaitingView.
 */

// ═══════════════════════════════════════════════════════════════════
// COMBAT ANIMATION
// Binary ref: FUN_0057ed3f @ block_00570000.c (animate_combat_movement)
// ═══════════════════════════════════════════════════════════════════

export const COMBAT_MOVEMENT_ANIMATION = {
  // --- Unit movement animation during combat ---
  framesPerMove: 8,              // @ 0x0057ed3f — outer loop: local_d8 < 8
  msPerFrame: 64,                // @ 0x0057f4e6 — timeGetTime comparison: < 0x40 (64 decimal)
  totalDurationMs: 512,          // 8 frames × 64ms = 512ms total
  viewportContexts: 8,           // @ 0x0057ee26 — up to 8 simultaneous viewport render contexts
  renderContextSize: 0x48,       // @ 0x0057ee43 — _eh_vector_constructor_iterator_ stride = 0x48 (72 bytes)
  playerWindowStride: 0x3F0,     // @ 0x0057ee33 — per-civ viewport array stride
  postAnimDelay: 10,             // @ 0x0057f5e6 — play_delay_animation(10) after combat move
  animInProgressFlag: 'DAT_006ad908', // @ 0x0057ee64 — set to 1 during animation, 0 after
};

// --- Battle explosion animation (from Civ2-clone AttackAnimation) ---
// The binary uses the draw queue (0x73 opcode) to trigger combat animations.
// Per the Civ2-clone: each combat round shows 5 explosion frames.
export const COMBAT_BATTLE_ANIMATION = {
  msPerFrame: 70,                // Civ2-clone: AttackAnimation interval = 70ms
                                 // Binary ref: draw queue opcode 0x73 @ 0x0047e2b3
  framesPerExplosion: 5,         // Civ2-clone: explosion += 5 per round (AttackAnimation.cs:43)
  // The binary's battle animation sprites come from the active unit's BattleAnim sprite set
  // (loaded from UNITS.GIF or equivalent sprite sheet)
};

// ═══════════════════════════════════════════════════════════════════
// UNIT MOVEMENT ANIMATION
// Binary ref: FUN_0057ed3f uses same 8-frame / 64ms timing for unit moves
// Cross-ref: Civ2-clone MoveAnimation.cs
// ═══════════════════════════════════════════════════════════════════

export const MOVEMENT_ANIMATION = {
  framesPerTile: 8,              // @ 0x0057ed3f — outer loop count = 8
                                 // Civ2-clone: noFramesForOneMove = 8 (MoveAnimation.cs:16)
  msPerFrame: 30,                // Civ2-clone: MoveAnimation interval = 30ms
                                 // Binary uses 64ms for combat moves; normal moves use
                                 // the message-pump timing which is faster
  totalDurationMs: 240,          // 8 × 30ms = 240ms per tile traversal (Civ2-clone timing)
  cityEntryFrames: 7,            // Civ2-clone: noFramesForOneMove - 1 when entering city
                                 // (MoveAnimation.cs:56 — last frame is blank for city entry)
  // Interpolation: linear tile-to-tile with sub-pixel offset per frame
  // Formula (Civ2-clone MoveAnimation.cs:59):
  //   offsetX = (deltaX * tileWidth) / framesPerTile * frameIndex
  //   offsetY = (deltaY * tileHeight) / framesPerTile * frameIndex
  //   where tileWidth = 4 * (zoom + 8), tileHeight = 2 * (zoom + 8)
};

// ═══════════════════════════════════════════════════════════════════
// NUKE EXPLOSION ANIMATION
// Binary ref: FUN_0057f657 @ block_00570000.c (animate_nuke_explosion)
// ═══════════════════════════════════════════════════════════════════

export const NUKE_ANIMATION = {
  totalFrames: 11,               // @ 0x0057f897 — loop: local_34 < 0xb (11 decimal)
  msPerFrame: 100,               // @ 0x0057f8be — timeGetTime comparison: < 100 (decimal)
  totalDurationMs: 1100,         // 11 × 100ms = 1100ms
  spriteWidth: 0x5B,             // @ 0x0057f880 — scale_sprite(0x5B) = 91 pixels at zoom 0
  spriteHeight: 0x48,            // @ 0x0057f886 — scale_sprite(0x48) = 72 pixels at zoom 0
  spriteSource: 'Tiles.dll #85', // DLL resource for nuke mushroom cloud frames
  preDelay: {
    enabled: 'DAT_00655aea & 0x10', // @ 0x0057f86b — animation detail flag
    durationMs: 5500,            // @ 0x0057f878 — wait loop: < 0x157c (5500 decimal)
                                 // Only when detailed animation mode is enabled
  },
  soundId: 0x32,                 // @ 0x0057f867 — play_sound(0x32) = nuke explosion sound (id 50)
  animInProgressFlag: 'DAT_006ad908', // @ 0x0057f855 — same flag as combat animation
};

// ═══════════════════════════════════════════════════════════════════
// UNIT SELECTION / BLINKING CURSOR
// Cross-ref: Civ2-clone UnitReadyView.cs, WaitingView.cs
// ═══════════════════════════════════════════════════════════════════

export const CURSOR_BLINK = {
  unitReadyIntervalMs: 150,      // Civ2-clone: UnitReadyView interval = 150ms
                                 // Two-frame animation: unit visible → unit hidden → repeat
  waitingViewIntervalMs: 200,    // Civ2-clone: WaitingView interval = 200ms
                                 // "View piece" cursor blinks at this rate
  // Binary ref: cursor bitmaps rebuilt in recalc_viewport_geometry @ 0x00479fbe
  // via resize_cursor_bitmaps when zoom changes
};

// ═══════════════════════════════════════════════════════════════════
// WONDER / ADVANCE ANIMATION (Throne Room / Starfield)
// Binary ref: block_004D0000 (wonder window system)
// ═══════════════════════════════════════════════════════════════════

export const WONDER_ANIMATION = {
  starfield: {
    timerIntervalMs: 5,          // @ 0x004d0ea6 — create_timer(star_anim_callback, 5ms, -1)
                                 // 200 FPS starfield particle animation
    particleCount: 80,           // @ 0x004d570b — loop 0 to 0x4f (80 particles)
    particleStride: 12,          // @ 0x004d570b — 12 bytes per star: x(4), y(4), z(4)
    particleDataOffset: 0x1DB8,  // @ 0x004d570b — stars array at this->+0x1db8
    xVelocity: 250,              // @ 0x004d63fb — stars[i].x += 0xfa (250) per tick
    yVelocity: 300,              // @ 0x004d63fb — stars[i].y += 300 per tick
    zApproachRate: 1,            // @ 0x004d63fb — stars[i].z -= 1 per tick (camera approach)
    xRange: [-32000, 32000],     // @ 0x004d570b — random init range
    yRange: [-24000, 24000],     // @ 0x004d570b — random init range
    zRange: [1, 100],            // @ 0x004d570b — initial z range
    zRespawnRange: [50, 100],    // @ 0x004d63fb — respawn z range (closer start)
    screenCenter: { x: 320, y: 240 }, // @ 0x004d570b — 0x140, 0xf0
    screenBounds: { w: 640, h: 480 }, // @ 0x004d570b — 0x280, 0x1e0
    starColor: 0x29,             // @ 0x004d570b — palette index for star pixel
    bgColor: 10,                 // @ 0x004d570b — palette index for background
    // Perspective projection: screen_x = star.x / star.z + 320
    //                        screen_y = star.y / star.z + 240
  },

  typewriter: {
    normalIntervalMs: 60,        // @ 0x004d0ea6 — create_timer(typewriter_callback, 60ms, -1)
                                 // Used for initial advance text display
    fastIntervalMs: 10,          // @ 0x004d13b8 — create_timer(typewriter_callback, 10ms, -1)
                                 // Used for between-turns advance animation (faster)
    textCursorStart: { x: 10, y: 0x28 },  // @ 0x004d0517 — initial cursor pos (10, 40)
    wonderTextStart: { x: 10, y: 0x73 },   // @ 0x004d570b — wonder mode starts at y=115
    labelColor: 0xF9,            // @ 0x004d4fd1 — green label text
    valueColor: 0xFE,            // @ 0x004d4fd1 — white value text
  },

  autoClose: {
    delayMs: 500,                // @ 0x004d4fd1 — create_timer(auto_close_callback, 500ms, -1)
                                 // Auto-close timer after typewriter finishes (display_mode == 1)
  },

  windowInvalidation: {
    thresholdMs: 1201,           // @ 0x004d0160 — 0x4b1 (1201 decimal)
                                 // Wonder window cache invalidation threshold
  },
};

// ═══════════════════════════════════════════════════════════════════
// CUTSCENE TIMERS (Loser / Winner / Beaten)
// Binary ref: block_00470000
// ═══════════════════════════════════════════════════════════════════

export const CUTSCENE_TIMERS = {
  loser: {
    videoTimerMs: 4000,          // @ 0x004705d7 — init_timer(4000, 10, 0xEC, this->+0xB8)
    textPageDelayMs: 360,        // @ 0x004708db — wait(360ms) between text pages
    textRect: { x: 40, y: 100, w: 560, h: 380 }, // @ 0x004708db — SetRect(40,100,600,480)
    fontSize: 18,                // @ 0x004705d7 — init_font(0, 18, 2)
    textColor: 0xFF,             // @ 0x004708db — white text
    shadowColor: 0x00,           // @ 0x004708db — black shadow
  },
  winner: {
    videoTimerMs: 2000,          // @ 0x00471565 — init_timer(2000, 10, 0xEC, this->+0xB8)
    textPageDelayMs: 360,        // @ 0x00471856 — wait(360ms) between text pages
    textRect: { x: 2, y: 100, w: 636, h: 380 },  // @ 0x00471565 — SetRect(2,100,638,480)
    fontSize: 18,                // @ 0x00471565 — init_font(0, 18, 3)
    textColor: 0xF1,             // @ 0x00471856 — gold text color
  },
  beaten: {
    videoTimerMs: 30000,         // @ 0x00471dd8 — init_timer(30000, 10, 0xEC, ...)
    textPageDelayMs: 360,        // @ 0x00471dd8 — wait(360ms) between text pages
    textPageCount: 5,            // @ 0x00471dd8 — 5 pages of "CENTAURI_BEATEN" text
    surfaceSize: { w: 640, h: 240 }, // @ 0x00471dd8 — SetRect(0,0,640,240)
  },
};

// ═══════════════════════════════════════════════════════════════════
// TIMER SYSTEM (Windows multimedia timer layer)
// Binary ref: block_005D0000 — PC Timer infrastructure
// ═══════════════════════════════════════════════════════════════════

export const TIMER_SYSTEM = {
  // Civ2 uses a custom timer DLL (timerdll.dll) or falls back to Win32 SetTimer
  timerDll: 'timerdll.dll',      // @ 0x005d4320 — LoadLibraryA("timerdll.dll")
  timerResolutionMs: 5,          // @ 0x005d4320 — timeBeginPeriod(5) — minimum timer resolution
  testIntervalMs: 100,           // @ 0x005d4320 — timeSetEvent(100,5,...) — test timer at init
  // All game timers pass through FUN_005d44be which routes to either
  // timeSetEvent (high-res multimedia timer) or SetTimer (standard Win32)
  // based on the DAT_006383bc / DAT_00637ef8 capability flags.
};

// ═══════════════════════════════════════════════════════════════════
// DRAW QUEUE (Stacked Draw system for multiplayer animation sync)
// Binary ref: FUN_0047e0e5 (enqueue) / FUN_0047e2b3 (dequeue) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const DRAW_QUEUE = {
  maxEntries: 100,               // @ 0x0047e0e5 — circular queue with 100 slots
  entryStride: 0x40,             // @ 0x0047e0e5 — 64 bytes per queue entry
  unitMoveExtraBytes: 0x20,      // @ 0x0047e0e5 — unit move (0x70) copies 32 extra bytes
  // Opcodes:
  opcodes: {
    UNIT_MOVE: 0x70,             // unit move + combat
    VISIBILITY_UPDATE: 0x71,     // tile visibility change
    REDRAW_TILES: 0x72,          // tile redraw
    ANIMATION: 0x73,             // combat animation
    FULL_REDRAW: 0x74,           // full viewport redraw
    AREA_REDRAW_R1: 0x75,        // area redraw radius 1
    AREA_REDRAW_CUSTOM: 0x76,    // area redraw custom radius
    ATTACK_ANIM: 0x78,           // play attack animation
    DEFENSE_ANIM: 0x79,          // play defense animation
    SPECIAL_EFFECT_1: 0x7C,      // special effect type 1
    SPECIAL_EFFECT_2: 0x7D,      // special effect type 2
    COUNTER: 0xA3,               // wrap counter increment
  },
  // Network poll processes 1-2 batches when queue < 34 entries
  batchThreshold: 34,            // @ 0x0047e94e — if queue_count < 34: process 1 batch
};

// ═══════════════════════════════════════════════════════════════════
// VIDEO PLAYBACK
// Binary ref: FUN_00559ded @ block_00550000.c (video_init_playback_params)
// ═══════════════════════════════════════════════════════════════════

export const VIDEO_PLAYBACK = {
  defaultSpeed: 100,             // @ 0x00559ded — playback speed parameter = 100 (1.0x)
  windowPadding: 0x10,           // @ 0x0055a10d — video window rect padding = 16px
  videoPlayerObjectSize: 0xA28,  // @ 0x004d5b21 — allocate video player = 2600 bytes
  vfwNotRegisteredError: 0x80040154, // @ 0x004d5b21 — Video for Windows not registered
};

// ═══════════════════════════════════════════════════════════════════
// MUSIC / SOUND
// Binary ref: block_004E0000 — music initialization
// ═══════════════════════════════════════════════════════════════════

export const SOUND_TIMING = {
  musicInitRetryDelayMs: 200,    // @ 0x004e2740 — Sleep(200) between CD music detection retries
  musicInitMaxRetries: 5,        // @ 0x004e2740 — retry loop: local_14 < 5
};

// ═══════════════════════════════════════════════════════════════════
// TERRAIN SPRITE SHEET LAYOUT (from terrain loading @ FUN_00570780)
// Binary ref: FUN_00570780 @ block_00570000.c (sprited_process_terrain1)
// ═══════════════════════════════════════════════════════════════════

export const TERRAIN_SPRITE_LAYOUT = {
  // TERRAIN1 sprite sheet coordinates
  terrain1: {
    baseTerrainStartX: 1,        // @ 0x00570780 — initial x=1
    baseTerrainStartY: 1,        // @ 0x00570780 — initial y=1
    tileStepY: 0x21,             // @ 0x00570780 — y += 0x21 (33px) per terrain row
    terrainCount: 11,            // @ 0x00570780 — 0xb terrain types (0-10)
    secondColumnX: 0x83,         // @ 0x00570780 — local_55c = 0x83 (131px)
    thirdColumnX: 0xC4,          // @ 0x00570780 — local_560 = 0xC4 (196px)

    // Special terrain rows
    specialStartX: 0x1C8,        // @ 0x00570780 — local_554 = 0x1C8 (456px)
    specialStartY: 100,          // @ 0x00570780 — local_558 = 100
    specialCount: 3,             // @ 0x00570780 — loop: local_14 < 3

    // Road/railroad overlay rows
    overlayStartX: 1,            // @ 0x00570780 — local_554 = 1
    overlayStartY: 0x16C,        // @ 0x00570780 — local_558 = 0x16C (364px)
    overlayCount: 9,             // @ 0x00570780 — loop: local_14 < 9
    overlayStepX: 0x41,          // @ 0x00570780 — local_554 += 0x41 (65px)
  },
};

// ═══════════════════════════════════════════════════════════════════
// ANIMATION DETAIL FLAGS
// Binary ref: DAT_00655aea — controls animation fidelity
// ═══════════════════════════════════════════════════════════════════

export const ANIMATION_FLAGS = {
  address: 'DAT_00655aea',
  flags: {
    DETAILED_NUKE: 0x10,         // @ 0x0057f86b — enables 5.5s pre-delay for nuke animation
    // Additional flags from save file GAME section:
    // terrainAnimationLockout, unitAnimationLockout (per Civ2-clone Read.ClassicSav.cs:1082)
  },
};

// ═══════════════════════════════════════════════════════════════════
// MINIMAP
// Binary ref: Civ2-clone MinimapPanel.cs
// ═══════════════════════════════════════════════════════════════════

export const MINIMAP_ANIMATION = {
  globeRotationStepMs: 1000,     // Civ2-clone: _globeRotation_dt = 1000ms
};
