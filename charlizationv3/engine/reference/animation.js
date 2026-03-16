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

  // --- Combat animation frame count (from FUN_00580341 @ block_00580000.c) ---
  // local_2c = 10 >> local_cc; where local_cc is 1 if BOTH units have
  // movement < 0x1E (30 = pre-gunpowder era), otherwise 0.
  // This halves the animation frame count for ancient-vs-ancient combat.
  ancientEraThreshold: 0x1E,     // @ 0x00580341: if attacker.move < 0x1e AND defender.move < 0x1e
  framesModern: 10,              // 10 >> 0 = 10 frames per combat round (default)
  framesAncient: 5,              // 10 >> 1 = 5 frames per combat round (both ancient)

  // --- Post-explosion delay for heavy units ---
  // @ 0x00580341 line ~672: if unit type > 0x17 (tank-era+): play LARGEXPL (0x1C)
  //   then thunk_FUN_0046e287(0x14) — 20-tick delay after large explosion sound
  postLargeExplosionDelay: 0x14, // 20 ticks (~333ms at 60fps) after LARGEXPL sound for heavy units

  // --- Carrier aircraft skip ---
  // @ 0x00580341: if (DAT_0064b1bd[attacker.type * 0x14] & 0x10) != 0 => skip normal animation
  // Units with "can carry aircraft" flag (0x10 in flagsB) use a simplified combat path
  carrierAircraftFlag: 0x10,     // flagsB bit: skip normal combat animation for carriers

  // --- Draw queue opcode 0x73 (ANIMATION) payload format ---
  // Sent to all remote players in multiplayer after normal combat resolution.
  // Binary ref: block_00580000.c lines 698-707
  //   C: thunk_FUN_0046b14d(0x73, socketFd, attackerUnitId, attackerDestX, attackerDestY,
  //                          defenderX, defenderY, 0, 0, 0);
  // Parameters (10 total including opcode):
  //   [0] opcode:     0x73 (ANIMATION)
  //   [1] socketFd:   remote player's socket descriptor
  //   [2] unitId:     attacker unit ID (uVar11 — the attacking unit index)
  //   [3] destX:      attacker's destination X (iVar10 — tile attacker moves to)
  //   [4] destY:      attacker's destination Y (iVar8 — Y of destination)
  //   [5] targetX:    defender's X position (iVar9 — from param_2 decomposition)
  //   [6] targetY:    0 (unused)
  //   [7] reserved1:  0
  //   [8] reserved2:  0
  //   [9] reserved3:  0
  // Condition: only sent when DAT_00655b02 > 2 (multiplayer with 3+ players)
  //   AND the remote player has visibility (aiStack_58[playerId] != 0).
  // Preceded by: thunk_FUN_004b0b53(0xff, 2, 0, 0, 0) — flush/sync draw queue.
  opcodeAnimationPayload: { opcode: 0x73, params: ['socketFd', 'unitId', 'destX', 'destY', 'targetX', 'targetY', '0', '0', '0'] },
};

// ═══════════════════════════════════════════════════════════════════
// NUCLEAR / LONG-RANGE ATTACK PATH
// Binary ref: block_00580000.c lines 709-733 (inside combat resolution function)
// ═══════════════════════════════════════════════════════════════════

// When the attacker's attack stat > 98 (0x62 = 'b'), the normal combat
// animation is skipped entirely and the nuclear/missile path is taken instead.
//
// C: if ('b' < (char)(&DAT_0064b1c4)[unitTypeIndex * 0x14])
//      — DAT_0064b1c4 is the attack stat in the unit type table (stride 0x14)
//
// Flow:
//   1. DAT_00633e48 = -1 (0xffffffff) — sets combat result to "no normal rounds"
//   2. iVar13 = thunk_FUN_0057f9e3(targetCivId, attackerUnitId, attackerDestPos, 1)
//      — FUN_0057f9e3 executes the nuclear/missile strike animation & damage
//      — param4 = 1 indicates "actual attack" (vs. 0 for preview)
//   3. If strike succeeds (iVar13 == 0):
//      a. thunk_FUN_005b4391(attackerSlotId, 1) — kill/consume the attacking unit
//      b. thunk_FUN_0047cea6(defenderX, defenderY) — redraw target tile
//      c. In multiplayer (DAT_00655b02 > 2):
//         - thunk_FUN_004b0b53(0xff, 2, 0, 0, 0) — flush draw queue
//         - Opcode 0x72 (REDRAW_TILES) sent to all remote players:
//           thunk_FUN_0046b14d(0x72, socketFd, defenderX, defenderY, 0,0,0,0,0,0)
//           @ block_00580000.c:719-721
//   4. If strike fails (iVar13 != 0):
//      a. (&DAT_0064c6f0)[targetCiv * 0x594 + unitSlot] = 0 — clear unit entry
//   5. If failed AND attacker is human AND DAT_006acb08 >= 0:
//      a. thunk_FUN_0057febc(targetCivId, attackerUnitId, attackerDestPos)
//         — shows the failed-strike aftermath to the player
//
// Key constant:
//   attackThreshold: 98 (0x62 = ASCII 'b') — any unit with attack > 98 uses
//   the nuclear path. In standard Civ2, only Nuclear Missile (attack=99) qualifies.
//   sourceAddr: block_00580000.c:709

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

// ═══════════════════════════════════════════════════════════════════
// MOVEMENT SOUND IDs (from move_unit @ FUN_0059062c)
// Binary ref: block_00590000.c — thunk_FUN_0046e020(soundId, ...)
// ═══════════════════════════════════════════════════════════════════

export const MOVE_UNIT_SOUNDS = {
  // Sound IDs passed to play_sound (thunk_FUN_0046e020) during unit movement
  BLOCKED:         0x69,  // @ 0x0059062c — can't move / ZOC blocked / non-combat unit blocked
                          // C: thunk_FUN_0046e020(0x69,1,0,0) and thunk_FUN_0046e020(0x69,0,0,0)
  ALLIED_REPAIR:   0x68,  // @ 0x0059062c — allied unit repair in allied city
                          // C: thunk_FUN_0046e020(0x68,1,0,0)
  UNIT_EXPELLED:   0x5d,  // @ 0x0059062c — unit captured/expelled from tile (spy, settler, etc.)
                          // C: thunk_FUN_0046e020(0x5d,0,0,0)
  AIR_LANDING:     0x1a,  // @ 0x0059062c — air unit landing sound (unit type index < 0x1e)
                          // C: thunk_FUN_0046e020(0x1a,0,0,0)
  AIR_CRASH:       0x4e,  // @ 0x0059062c — air unit crash / out of fuel (unit type index >= 0x1e)
                          // C: thunk_FUN_0046e020(0x4e,0,0,0)
  TRIREME_LOST:    0x09,  // @ 0x0059062c — trireme lost at sea
                          // C: thunk_FUN_0046e020(9,1,0,0)
  UNIT_MOVE:       0x63,  // @ 0x0059062c — standard unit movement animation sound (decimal 99)
                          // C: thunk_FUN_0046e020(99,1,0,0)
};

// ═══════════════════════════════════════════════════════════════════
// MOVE_UNIT ANIMATION DELAYS (from move_unit @ FUN_0059062c)
// Binary ref: block_00590000.c — thunk_FUN_0046e287(ticks)
// ═══════════════════════════════════════════════════════════════════

export const MOVE_UNIT_DELAYS = {
  // Delay values passed to play_delay_animation (thunk_FUN_0046e287) during movement
  POST_EXPEL_DELAY:       10,   // @ 0x0059062c — after expelling/capturing unit from city/tile
                                // C: thunk_FUN_0046e287(10) — appears in naval boarding and city capture paths
  POST_DIPLOMACY_DELAY:   0x14, // @ 0x0059062c — after diplomat enters foreign city (20 ticks)
                                // C: thunk_FUN_0046e287(0x14)
  POST_MOVE_VISIBLE:      10,   // @ 0x0059062c — delay after visible unit movement when no animation flags
                                // C: thunk_FUN_0046e287(10) — when (DAT_00655aea._1_1_ & 0x10) == 0
  POST_MOVE_FAST:         0x0f, // @ 0x0059062c — delay after visible unit movement with animation flags (15 ticks)
                                // C: thunk_FUN_0046e287(0xf) — when (DAT_00655aea._1_1_ & 0x10) != 0

  // Shift-key check during movement: GetAsyncKeyState(0x10)
  // If Shift is held, the local player skips the movement animation
  // (aiStack_80[DAT_006d1da0] = 0) — used for "quick move" when holding Shift
  SHIFT_KEY_VK:           0x10, // @ 0x0059062c — VK_SHIFT virtual key code for GetAsyncKeyState
};

// ═══════════════════════════════════════════════════════════════════
// NETWORK DISCONNECT DELAY
// Binary ref: FUN_0059b293 @ block_00590000.c (disconnect_from_network)
// ═══════════════════════════════════════════════════════════════════

export const NETWORK_DISCONNECT_DELAY = {
  ticks: 0x78,    // @ 0x0059b293 — 120 ticks delay after network disconnection
                  // C: thunk_FUN_0046e287(0x78) — "Disconnection delay: 2 seconds"
};

// ═══════════════════════════════════════════════════════════════════
// COMBAT ATTACK SOUNDS — Full dispatch table from FUN_00580341
// Binary ref: block_00580000.c lines 584-679
// Source: FUN_00580341 — combat initiation sound selection
//
// bVar6 = unit type byte from DAT_006560f6[attacker * 0x20]
// DAT_0064b1c1[type * 0x14] = domain (0=ground, 1=air, 2=sea) [binary convention; JS engine remaps to 0=land, 1=sea, 2=air]
// DAT_0064b1bc[type * 0x14] bit 3 = stealth flag
// DAT_0064b1bd[type * 0x14] bit 4 (0x10) = "can carry aircraft" flag
// DAT_0064b1c3[type * 0x14] = bombard range (0 = no bombard)
// DAT_0064b1c4[type * 0x14] = attack range (< 0x63 = short-range)
// DAT_0064b1c6[type * 0x14] = movement points (< 0x1E = ancient era)
//
// The function also sets local_ac (animation offset) for certain branches,
// which is used later for combat movement animation frame selection.
//
// Network: After sound selection, opcode 0x9A is sent to all remote
// players in the game (DAT_00655b02 > 2) to synchronize the combat
// sound. See "COMBAT_SOUND_NETWORK_SYNC" below.
// ═══════════════════════════════════════════════════════════════════

export const COMBAT_ATTACK_SOUNDS = {
  // --- Priority 1: Unit-specific sounds (checked first via if/else chain) ---
  // Missile/nuke unit types with dedicated sound IDs
  unitSpecific: {
    0x36: { soundId: 0x7D, channel: 1, note: 'Nuke variant 1' },
    0x37: { soundId: 0x7E, channel: 1, note: 'Nuke variant 2' },
    0x38: { soundId: 0x7F, channel: 1, note: 'Nuke variant 3' },
    0x39: { soundId: 0x80, channel: 1, note: 'Nuke variant 4' },
    0x3A: { soundId: 0x81, channel: 1, note: 'Nuke variant 5' },
    0x3B: { soundId: 0x82, channel: 1, note: 'Nuke variant 6' },
    0x3C: { soundId: 0x83, channel: 1, note: 'Nuke variant 7' },
    0x3D: { soundId: 0x84, channel: 1, note: 'Nuke variant 8' },
    0x33: { soundId: 0x65, channel: 1, note: 'Scenario slot 51 (missile sound 1)' },
    0x34: { soundId: 0x66, channel: 1, note: 'Scenario slot 52 (missile sound 2)' },
    0x35: { soundId: 0x67, channel: 1, note: 'Scenario slot 53 (missile sound 3)' },
    sourceAddr: '0x00580341 lines 584-615',
  },

  // --- Priority 2: Carrier aircraft flag (flagsB bit 0x10) ---
  // If attacker has "can carry aircraft" flag, skip normal sound dispatch entirely.
  // Instead, check attack range: if range < 99 (0x63), play short-range bombardment sound.
  carrierAircraft: {
    flag: 0x10,                        // DAT_0064b1bd[type * 0x14] & 0x10
    shortRangeSoundId: 0x29,           // @ line 678 — CIVDISOR.WAV (range < 0x63)
    shortRangeThreshold: 0x63,         // 99 decimal — DAT_0064b1c4 < 'c'
    note: 'Units with carrier flag skip normal combat animation sound path',
    sourceAddr: '0x00580341 lines 617, 677-679',
  },

  // --- Priority 3: Domain-based dispatch ---

  // Air domain (domain == 1 in binary: 0=ground, 1=air, 2=sea)
  air: {
    // Sea vs sea (defender also sea domain)
    vsSeaAncient:   { soundId: 0x00, channel: 0, note: 'AIRCOMBT — ancient sea unit (type < 0x1E) vs sea' },
    vsSeaModern:    { soundId: 0x52, channel: 0, note: 'BOATSINK dup — modern sea unit (type >= 0x1E) vs sea' },
    // Sea vs land (defender is not sea domain)
    noBombard:      { soundId: 0x21, channel: 1, note: 'CATHEDRL — sea unit with bombard range == 0 (immobile naval)' },
    bombardAncient: { soundId: 0x18, channel: 1, note: 'AIRPLANE — ranged sea unit, ancient (type < 0x1E)' },
    bombardModern:  { soundId: 0x50, channel: 1, note: 'AIRPLANE dup — ranged sea unit, modern (type >= 0x1E)' },
    eraThreshold: 0x1E,                // @ lines 620, 630 — unit type index boundary
    sourceAddr: '0x00580341 lines 618-635',
  },

  // Sea domain (domain == 2 in binary: 0=ground, 1=air, 2=sea)
  sea: {
    // Stealth aircraft (flagsA bit 3 set: DAT_0064b1bc & 8)
    stealth:     { soundId: 0x4D, channel: 1, note: 'FEEDBK08 — submarine/stealth sound' },
    // Non-stealth aircraft
    defaultAnimOffset: 6,              // @ line 639 — local_ac = 6 for standard air units
    navalHeavy: {
      types: [0x25, 0x26, 0x27, 0x28],// @ line 640 — Destroyer, Cruiser, AEGIS Cruiser, Battleship
      animOffset: 0x2E,                // @ line 641 — local_ac = 0x2E for these types
      note: 'Destroyer-Battleship use extended animation offset (46 frames)',
    },
    sourceAddr: '0x00580341 lines 637-646',
  },

  // Ground domain (domain == 0, no carrier flag)
  ground: {
    // Specific ground unit type mappings (checked in if/else order)
    elephant:     { types: [0x11],                        soundId: 0x19, channel: 1, note: 'MISSILE — Elephant' },
    horseback:    { types: [0x0F, 0x10, 0x13, 0x12],     soundId: 0x4A, channel: 1, note: 'FEEDBK05 — mounted units (Horsemen, Chariot, Knights, Crusaders)' },
    dragoonCav:   { types: [0x14, 0x15],                  soundId: 0x0C, channel: 1, note: 'SUBMRINE — Dragoons, Cavalry' },
    musketeer:    { types: [0x07, 0x0B, 0x0A, 0x09],     soundId: 0x22, channel: 1, note: 'MRKTPLCE — Musketeers, Riflemen, Alpine Troops, Partisans' },
    fanatics:     { types: [0x08, 0x0D, 0x0C, 0x0E],     soundId: 0x26, channel: 1, note: 'BLDSPCSH — Fanatics, Paratroopers, Marines, Mech. Infantry' },
    // Tank-era range check (0x16 <= type <= 0x1A)
    tankEra: {
      typeRange: [0x16, 0x1A],         // @ line 663 — bVar6 >= 0x16 AND bVar6 <= 0x1A
      catapult: { type: 0x17, soundId: 0x0A, channel: 1, note: 'TANKMOTR — type 0x17 (Catapult)' },
      heavyTank: {
        condition: 'type > 0x17',      // @ line 671 — types 0x18, 0x19, 0x1A
        soundId: 0x1C,                 // LARGEXPL
        postDelay: 0x14,               // @ line 673 — thunk_FUN_0046e287(0x14) = 20 ticks
        note: 'Heavy tank types play LARGEXPL + 20-tick delay',
      },
      animOffset: 0x28,                // @ line 670 — local_ac = 0x28 for all tank-era
    },
    // Default fallback for unclassified ground units
    defaultInfantry: { soundId: 0x49, channel: 1, note: 'FEEDBK04 — default infantry/misc' },
    sourceAddr: '0x00580341 lines 648-675',
  },

  // --- Post-combat resolution sounds (lines 880-903) ---
  // Played after combat rounds resolve, based on outcome and unit era.
  // Condition tree:
  //   if (local_ac != 0): naval/aircraft explosion → 0x23
  //   else if (dead unit type < 0x1E): ancient death → 0x17
  //   else: modern death → 0x4F
  postCombat: {
    navalAircraftExplosion: { soundId: 0x23, channel: 1, note: 'NEWBANK — when local_ac != 0 (naval/air unit fought)' },
    ancientUnitDeath:       { soundId: 0x17, channel: 1, note: 'JETSPUTR — dead unit type < 0x1E (ancient era)' },
    modernUnitDeath:        { soundId: 0x4F, channel: 1, note: 'JETSPUTR dup — dead unit type >= 0x1E (modern era)' },
    eraThreshold: 0x1E,
    sourceAddr: '0x00580341 lines 886-903',
    note: 'local_c0 == 0 means attacker died; != 0 means defender died. The dead unit type determines ancient vs modern sound.',
  },
};

// ═══════════════════════════════════════════════════════════════════
// COMBAT NOTIFICATION STRINGS — Dialog keys and AI message IDs
// Binary ref: FUN_00580341 @ block_00580000.c lines 357-577
//
// These are the 8 combat event notification strings displayed to
// players during combat resolution. Each has:
//   - A dialog key string (looked up in GAME.TXT / labels.txt)
//   - An AI message ID sent via thunk_FUN_00511880 for remote players
//   - A display function for the local player
//
// Local display: thunk_FUN_004442e0(stringKey, unitId) or
//                thunk_FUN_004cc870(stringKey, param, 8) for BATTERY variants
// Remote notify: thunk_FUN_00511880(msgId, targetSocket, viewType, 0, unitParam, 0)
// ═══════════════════════════════════════════════════════════════════

export const COMBAT_NOTIFICATION_STRINGS = {
  SNEAK: {
    dialogKey: 'SNEAK',
    stringAddr: 's_SNEAK_00634454',
    aiMessageId: 0x2E,
    viewType: 1,                       // thunk_FUN_00511880 param3
    condition: 'Attacker breaks peace (no ceasefire treaty with defender) — sneak attack',
    localDisplay: 'thunk_FUN_004442e0(s_SNEAK_00634454, param_1)',
    sourceAddr: '0x00580341 lines 359-369',
  },
  BREAKCEASE: {
    dialogKey: 'BREAKCEASE',
    stringAddr: 's_BREAKCEASE_00634448',
    aiMessageId: 0x2D,
    viewType: 1,
    condition: 'Attacker breaks ceasefire treaty with defender (diplomacy bits 2+4 in contact flags)',
    localDisplay: 'thunk_FUN_004442e0(s_BREAKCEASE_00634448, param_1)',
    sourceAddr: '0x00580341 lines 372-382',
  },
  MISSILEATTACK: {
    dialogKey: 'MISSILEATTACK',
    stringAddr: 's_MISSILEATTACK_0063445c',
    aiMessageId: 0x2F,
    viewType: 1,
    condition: 'Carrier aircraft (flagsB & 0x10) with short range (< 0x63) attacks city; city found on target tile',
    localDisplay: 'thunk_FUN_004442e0(s_MISSILEATTACK_0063445c, param_1)',
    sourceAddr: '0x00580341 lines 456-472',
  },
  PEARLHARBOR: {
    dialogKey: 'PEARLHARBOR',
    stringAddr: 's_PEARLHARBOR_0063446c',
    aiMessageId: 0x30,
    viewType: 3,
    condition: 'Surprise naval/air attack on a city (local_10 != 0): attacker and defender city info shown',
    localDisplay: 'thunk_FUN_004442e0(s_PEARLHARBOR_0063446c, param_1)',
    sourceAddr: '0x00580341 lines 474-495',
  },
  BATTERY: {
    dialogKey: 'BATTERY',
    stringAddr: 's_BATTERY_00634484',
    aiMessageId: 0x32,
    viewType: 3,
    condition: 'Coastal bombardment with no land attacker (local_24 == 0) OR bombarding unit is Elephant (0x11)',
    localDisplay: 'thunk_FUN_004cc870(s_BATTERY_00634484, local_b8, 8)',
    sourceAddr: '0x00580341 lines 500-514',
  },
  BATTERY2: {
    dialogKey: 'BATTERY2',
    stringAddr: 's_BATTERY2_00634478',
    aiMessageId: 0x31,
    viewType: 4,
    condition: 'Coastal bombardment with land attacker present (local_24 != 0 AND unit != Elephant)',
    localDisplay: 'thunk_FUN_004cc870(s_BATTERY2_00634478, local_b8, 8)',
    sourceAddr: '0x00580341 lines 517-533',
    note: 'BATTERY2 adds a third text substitution (city name via DAT_0064c510) vs plain BATTERY',
  },
  SCRAMBLE: {
    dialogKey: 'SCRAMBLE',
    stringAddr: 's_SCRAMBLE_0063448c',
    aiMessageId: 0x33,
    viewType: 3,
    condition: 'Air defense scramble: defender aircraft launches to intercept (local_28 != 0)',
    localDisplay: 'thunk_FUN_004442e0(s_SCRAMBLE_0063448c, local_c)',
    sourceAddr: '0x00580341 lines 536-556',
  },
  AMPHIBMOTIZE: {
    dialogKey: 'AMPHIBMOTIZE',
    stringAddr: 's_AMPHIBMOTIZE_00634498',
    aiMessageId: 0x34,
    viewType: 3,
    condition: 'Amphibious assault: ground unit (domain == 0) attacks from sea (thunk_FUN_005b89e4 returns nonzero)',
    localDisplay: 'thunk_FUN_004442e0(s_AMPHIBMOTIZE_00634498, param_1)',
    sourceAddr: '0x00580341 lines 558-578',
  },
};

// ═══════════════════════════════════════════════════════════════════
// COMBAT SOUND NETWORK SYNC — Opcode 0x9A
// Binary ref: FUN_00580341 @ block_00580000.c lines 683-693
//
// In multiplayer (DAT_00655b02 > 2), after the attacking player selects
// the combat sound locally, opcode 0x9A is broadcast to all other
// players who can see the combat (aiStack_58[player] != 0 and
// player != DAT_006d1da0).
//
// The opcode carries:
//   thunk_FUN_0046b14d(0x9A, targetSocket,
//       DAT_0066bfc4,  -- soundId selected by local dispatch (-1 if none)
//       DAT_0066bfc0,  -- secondary sound param (0xFFFFFFFF default)
//       0, 0, 0, 0, 0, 0)
//
// This is immediately followed by opcode 0x70 (UNIT_MOVE) which sends
// the actual combat movement data to the remote player.
//
// Post-combat: opcode 0x7A is sent (lines 904-911) to sync the
// post-combat resolution sound (explosion/death) to remote players,
// carrying the same DAT_0066bfc4/DAT_0066bfc0 pair.
// ═══════════════════════════════════════════════════════════════════

export const COMBAT_SOUND_NETWORK_SYNC = {
  attackSoundOpcode: 0x9A,             // @ line 686 — pre-combat sound sync
  resolutionSoundOpcode: 0x7A,         // @ line 907 — post-combat sound sync
  soundIdGlobal: 'DAT_0066bfc4',       // initialized to -1 (0xFFFFFFFF), set by play_sound_effect
  soundParamGlobal: 'DAT_0066bfc0',    // initialized to 0xFFFFFFFF
  condition: 'DAT_00655b02 > 2 (network multiplayer with 3+ connection slots)',
  broadcastFilter: 'DAT_006d1da0 != player AND aiStack_58[player] != 0 (player can see combat)',
  sourceAddr: '0x00580341 lines 683-693 (attack), lines 904-911 (resolution)',
};
