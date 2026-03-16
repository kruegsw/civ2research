/**
 * Civ2 MGE Network/Multiplayer Protocol — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra)
 *
 * This module documents the complete Civ2 MGE multiplayer networking protocol
 * as extracted from the binary. Our WebSocket architecture replaces DirectPlay
 * but this reference captures all original protocol details for completeness.
 *
 * Key source functions:
 *   net_send_message    @ 0x0046B14D (6649B — master message dispatcher)
 *   network_poll        @ 0x0047E94E (huge — master message receiver/handler)
 *   diff_engine_*       @ 0x004B0905..0x004B3080 (state diff/sync engine)
 *   game_loop_mp_server @ 0x0048C9F3 (server turn loop)
 *   game_loop_mp_client @ 0x0048BFEC (client turn loop)
 *   mp_create_game      @ 0x0056E2E9 (session creation)
 *   mp_join_game        @ 0x00421FCD (8475B — connection lifecycle)
 */

// =============================================================================
// === Save Format Versions (determines game mode) ===
// =============================================================================
// Global: DAT_00655B02 (save_format_version)
// File extensions determined by set_save_extension @ 0x00473D5E
export const SAVE_FORMAT_VERSION = {
  SINGLE_PLAYER:  0,   // .sav — standard single player
  HOTSEAT:        1,   // .hot — hotseat multiplayer (was originally .sav too)
  PBEM:           2,   // .eml — play by email (originally .sav type)
  NETWORK_IPX:    3,   // .net — network multiplayer (IPX)
  NETWORK_TCP:    4,   // .net — network multiplayer (TCP/IP new game)
  NETWORK_TCP_LOAD: 5, // .net — network multiplayer (TCP/IP load game)
  NETWORK_SERIAL: 6,   // .net — network multiplayer (serial)
  // sourceAddr: '0x00473D5E' (set_save_extension), '0x00655B02' (global)
};

// Version check string used during session join
// Global: PTR_s_5_4_0f_Multiplayer_26_March_99
export const VERSION_STRING = '5_4_0f Multiplayer 26 March 99';
// sourceAddr: '0x00421FCD' (mp_join_game, version check at offset ~+332)

// =============================================================================
// === Message Packet Format ===
// =============================================================================
// All Civ2 network messages share this header format:
//   Offset 0x00: uint32  magic    = 0x66606660 (packet validation)
//   Offset 0x04: uint32  type     = message type ID (0x00–0xA8)
//   Offset 0x08: uint32  size     = total packet size in bytes (min 0x10)
//   Offset 0x0C: uint32  sequence = incrementing sequence number
//   Offset 0x10+: payload (variable, depends on type)
//
// Built by: net_msg_init_header @ 0x0046D5A0
// Validated by: network_poll @ 0x0047E94E (checks magic == 0x66606660)
export const PACKET_FORMAT = {
  MAGIC: 0x66606660,         // @ 0x0046D5A0 — written by net_msg_init_header
  HEADER_SIZE: 0x10,         // 16 bytes: magic(4) + type(4) + size(4) + seq(4)
  MIN_PACKET_SIZE: 0x10,     // minimum valid packet (header only)
  // sourceAddr: '0x0046D5A0' (init), '0x0047E94E' (validate)
};

// =============================================================================
// === Message Types — Complete Catalog ===
// =============================================================================
// Extracted from net_send_message @ 0x0046B14D (sender) and
// network_poll @ 0x0047E94E (receiver). ~170 opcodes documented.
//
// Categories:
//   0x00–0x0B: Connection lifecycle & session management
//   0x0E–0x16: Player join/leave/disconnect
//   0x17–0x24: Bulk data sync (rules, techs, units, etc.)
//   0x25–0x32: Game state, events, seat management
//   0x33–0x36: Position & config sync
//   0x37–0x5C: Unit/city CRUD operations (request→response pairs)
//   0x5D–0x69: Flow control, turn management, UI events
//   0x6A–0x6F: Game events, scenario flags, AI/save control
//   0x70–0x7D: Deferred rendering / draw queue commands
//   0x78–0x79: Combat animations
//   0x7A–0x7B: Sound/music
//   0x7E–0x86: Diplomacy, intelligence, advisors
//   0x87–0x8F: City operations, unit purge
//   0x90–0x98: Map/tile flag operations
//   0x99–0xA8: Embassy, tax rates, revolution, diplomacy exchanges
export const MESSAGE_TYPES = {
  // === Connection Lifecycle (0x00–0x0B) ===
  PING_KEEPALIVE:      { id: 0x00, sub: 1, payload: 'none', sourceAddr: '0x0047E94E case 0x00 sub 1' },
  STATE_SYNC_ACK:      { id: 0x00, sub: 2, payload: 'state sync data', sourceAddr: '0x0047E94E case 0x00 sub 2' },
  JOIN_ANNOUNCE:       { id: 0x01, payload: 'player name + version string', sourceAddr: '0x0046B14D case 1' },
  CHAT:                { id: 0x02, payload: 'chat text (broadcast)', sourceAddr: '0x0046B14D case 2' },
  GAME_SETTINGS:       { id: 0x04, payload: '624 bytes @ DAT_006AD308 (game config)', sourceAddr: '0x0046B14D case 4, 0x0047E94E case 0x04' },
  TICK:                { id: 0x05, payload: 'timer value', sourceAddr: '0x0046B14D case 5, 0x0047E94E case 0x05' },
  LOAD_INFO:           { id: 0x06, payload: 'load mode + filenames', sourceAddr: '0x0047E94E case 0x06' },
  SAVE_BLOCK_A:        { id: 0x07, payload: 'compressed save block part A', sourceAddr: '0x0047E94E case 0x07' },
  SAVE_BLOCK_B:        { id: 0x08, payload: 'compressed save block part B', sourceAddr: '0x0047E94E case 0x08' },
  SAVE_BLOCK_C:        { id: 0x09, payload: 'compressed save block part C', sourceAddr: '0x0047E94E case 0x09' },
  PARSE_BLOCK:         { id: 0x0A, payload: 'extract and parse save data', sourceAddr: '0x0047E94E case 0x0A' },
  SESSION_CANCEL:      { id: 0x0B, payload: 'none (session cancelled by host)', sourceAddr: '0x0056E2E9' },

  // === Player Join/Leave (0x0E–0x16) ===
  SERVER_QUIT_NOTIFY:  { id: 0x0E, payload: 'server quitting, all players notified', sourceAddr: '0x004824E3' },
  HOST_TRANSFER:       { id: 0x0F, payload: 'new host assignment', sourceAddr: '0x004824E3' },
  CLIENT_QUIT:         { id: 0x10, payload: 'client requesting disconnect', sourceAddr: '0x004828A5' },
  FULL_STATE_SYNC:     { id: 0x15, payload: 'delta-compressed game state blocks', sourceAddr: '0x0047E94E case 0x15' },
  SEAT_FINALIZE:       { id: 0x16, payload: 'seat assignment finalized', sourceAddr: '0x004824E3, 0x0047E94E case 0x2E' },

  // === Bulk Data Sync (0x17–0x24) ===
  // Each sends a memcpy-able block of game data to the target
  SYNC_COSMIC_RULES:   { id: 0x17, payload: '0x29 bytes scenario options', dataAddr: 'DAT_0064BCC8', size: 0x29, sourceAddr: '0x0046B14D case 0x17' },
  SYNC_TECH_TABLE:     { id: 0x18, payload: '0x640 bytes tech tree data', dataAddr: 'DAT_00627680', size: 0x640, sourceAddr: '0x0046B14D case 0x18' },
  SYNC_IMPROVEMENTS:   { id: 0x19, payload: '0x218 bytes improvement data', dataAddr: 'DAT_0064C488', size: 0x218, sourceAddr: '0x0046B14D case 0x19' },
  SYNC_WONDER_OBSOLETE:{ id: 0x1A, payload: '0x1C bytes wonder obsolete flags', dataAddr: 'DAT_0064BA28', size: 0x1C, sourceAddr: '0x0046B14D case 0x1A' },
  SYNC_UNIT_TYPES:     { id: 0x1B, payload: '0x4D8 bytes unit type definitions', dataAddr: 'DAT_0064B1B8', size: 0x4D8, sourceAddr: '0x0046B14D case 0x1B' },
  SYNC_TERRAIN:        { id: 0x1C, payload: '0x318 bytes terrain data', dataAddr: 'DAT_00627CC0', size: 0x318, sourceAddr: '0x0046B14D case 0x1C' },
  SYNC_GOVT_NAMES:     { id: 0x1D, payload: '0x1C bytes government names', dataAddr: 'DAT_0064B9A0', size: 0x1C, sourceAddr: '0x0046B14D case 0x1D' },
  SYNC_RESOURCES:      { id: 0x1E, payload: '0x38 bytes resource table', size: 0x38, sourceAddr: '0x0047E94E case 0x1E' },
  SYNC_WONDER_TABLE:   { id: 0x1F, payload: '0x3F0 bytes wonder data', size: 0x3F0, sourceAddr: '0x0047E94E case 0x1F' },
  SYNC_ALL_CIV_DATA:   { id: 0x20, payload: '0x7524 bytes (8 civs full data)', dataAddr: 'DAT_0064C6A0', size: 0x7524, sourceAddr: '0x0046B14D case 0x20' },
  SYNC_TRADE_ROUTES:   { id: 0x21, payload: '0x40 bytes trade route data', size: 0x40, sourceAddr: '0x0047E94E case 0x21' },
  SYNC_CITY_IMPROVE:   { id: 0x22, payload: '0x68 bytes city improvement data', size: 0x68, sourceAddr: '0x0047E94E case 0x22' },
  SYNC_DIFFICULTY:     { id: 0x23, payload: '0x18 bytes difficulty table', size: 0x18, sourceAddr: '0x0047E94E case 0x23' },
  SYNC_GOVERNMENT:     { id: 0x24, payload: '0x24 bytes government table', size: 0x24, sourceAddr: '0x0047E94E case 0x24' },

  // === Game State & Events (0x25–0x32) ===
  SYNC_EVENTS:         { id: 0x25, payload: 'event count + event records', sourceAddr: '0x0047E94E case 0x25' },
  GAME_STARTED:        { id: 0x28, payload: 'game state counter (1=starting, 2=all ready, 3=running)', sourceAddr: '0x0056E2E9, 0x0047E94E case 0x28' },
  ALIVE_BITMASK:       { id: 0x2A, payload: 'alive civ bitmask + player mask', sourceAddr: '0x0048DAB9, 0x0047E94E case 0x2A' },
  TURN_SIGNAL:         { id: 0x2B, payload: 'player slot ID (turn ready signal)', sourceAddr: '0x0048D9AD' },
  PLAYER_JOIN:         { id: 0x2E, payload: 'full resync handshake (server side)', sourceAddr: '0x0047E94E case 0x2E' },
  PLAYER_WAITING:      { id: 0x2F, payload: 'client waiting for join', sourceAddr: '0x0047E94E case 0x2F' },
  SEAT_CLAIM:          { id: 0x30, payload: 'civ slot claimed by player', sourceAddr: '0x0047E94E case 0x30' },
  SEAT_RELEASE:        { id: 0x31, payload: 'civ slot released', sourceAddr: '0x0047E94E case 0x31' },
  DISCONNECT:          { id: 0x32, payload: 'player disconnect notification', sourceAddr: '0x0047E94E case 0x32, 0x0056E2E9' },

  // === Position & Config (0x33–0x36) ===
  POSITION_SYNC:       { id: 0x33, payload: 'viewport_x, viewport_y, current_turn', sourceAddr: '0x00410000 block' },

  // === Unit Operations (0x37–0x5B) — Request→Response pairs ===
  // Server processes request, sends back response with same ID+1
  KILL_UNIT:           { id: 0x37, response: 0x38, payload: 'unit index', sourceAddr: '0x0047E94E case 0x37' },
  KILL_UNIT_ACK:       { id: 0x38, payload: 'unit index ack', sourceAddr: '0x0047E94E' },
  DELETE_CITY:         { id: 0x39, response: 0x3A, payload: 'city index', sourceAddr: '0x0047E94E case 0x39' },
  DELETE_CITY_ACK:     { id: 0x3A, payload: 'city index ack', sourceAddr: '0x0047E94E' },
  CREATE_CITY:         { id: 0x3B, response: 0x3C, payload: 'x, y, civ', sourceAddr: '0x0047E94E case 0x3B' },
  CREATE_CITY_ACK:     { id: 0x3C, payload: 'city ack', sourceAddr: '0x0047E94E' },
  CREATE_UNIT:         { id: 0x3D, response: 0x3E, payload: 'type, x, y, civ', sourceAddr: '0x0047E94E case 0x3D' },
  CREATE_UNIT_ACK:     { id: 0x3E, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  PICK_UP_UNIT:        { id: 0x3F, response: 0x40, payload: 'unit index', sourceAddr: '0x0047E94E case 0x3F' },
  PICK_UP_UNIT_ACK:    { id: 0x40, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  PLACE_UNIT:          { id: 0x41, response: 0x42, payload: 'unit index, x, y', sourceAddr: '0x0047E94E case 0x41' },
  PLACE_UNIT_ACK:      { id: 0x42, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  SET_UNIT_HOME:       { id: 0x43, response: 0x44, payload: 'unit index', sourceAddr: '0x0047E94E case 0x43' },
  SET_UNIT_HOME_ACK:   { id: 0x44, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  MOVE_UNIT:           { id: 0x45, response: 0x46, payload: 'unit index, x, y', sourceAddr: '0x0047E94E case 0x45' },
  MOVE_UNIT_ACK:       { id: 0x46, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  CITY_PRODUCTION:     { id: 0x47, response: 0x48, payload: 'city index, type, ...', sourceAddr: '0x0047E94E case 0x47' },
  CITY_PRODUCTION_ACK: { id: 0x48, payload: 'city ack', sourceAddr: '0x0047E94E' },
  ACTIVATE_UNIT:       { id: 0x49, response: 0x4A, payload: 'unit index, civ', sourceAddr: '0x0047E94E case 0x49' },
  ACTIVATE_UNIT_ACK:   { id: 0x4A, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  SLEEP_UNIT:          { id: 0x4B, response: 0x4C, payload: 'unit index', sourceAddr: '0x0047E94E case 0x4B' },
  SLEEP_UNIT_ACK:      { id: 0x4C, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  WAKE_UNIT:           { id: 0x4D, response: 0x4E, payload: 'unit index', sourceAddr: '0x0047E94E case 0x4D' },
  WAKE_UNIT_ACK:       { id: 0x4E, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  DISBAND_UNIT:        { id: 0x4F, response: 0x50, payload: 'unit index', sourceAddr: '0x0047E94E case 0x4F' },
  DISBAND_UNIT_ACK:    { id: 0x50, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  SET_GOTO:            { id: 0x51, payload: 'unit index, x, y, dir, mode', sourceAddr: '0x0047E94E case 0x51' },
  CANCEL_ORDERS:       { id: 0x52, response: 0x54, payload: 'unit index', sourceAddr: '0x0047E94E case 0x52' },
  SET_PRODUCTION:      { id: 0x53, payload: 'city index, item', sourceAddr: '0x0047E94E case 0x53' },
  CANCEL_ORDERS_ACK:   { id: 0x54, payload: 'unit ack', sourceAddr: '0x0047E94E' },
  TRADE_ROUTE:         { id: 0x55, payload: 'unit, commodity, src, dst, type', sourceAddr: '0x0047E94E case 0x55' },
  DEC_COUNTER_A:       { id: 0x56, payload: 'counter decrement; result=2 sets flag=-1', sourceAddr: '0x0047E94E case 0x56' },
  DEC_COUNTER_B:       { id: 0x57, payload: 'counter decrement variant', sourceAddr: '0x0047E94E case 0x57' },
  MAP_DATA:            { id: 0x59, payload: 'DAT_006D1190, size=DAT_006365F4*4', sourceAddr: '0x0046B14D case 0x59' },
  BRIBE_CAPTURE:       { id: 0x5A, response: 0x5B, payload: 'complex unit bribe/capture', sourceAddr: '0x0047E94E case 0x5A' },
  BRIBE_CAPTURE_ACK:   { id: 0x5B, payload: 'bribe ack', sourceAddr: '0x0047E94E' },

  // === State Diff (0x5C) ===
  STATE_DIFF:          { id: 0x5C, payload: 'delta-compressed state diff blocks (same handler as 0x15)', sourceAddr: '0x004B0B53, 0x0047E94E case 0x5C' },

  // === Flow Control (0x5D–0x69) ===
  HOLD_ON:             { id: 0x5D, payload: 'pause network processing', sourceAddr: '0x0047E94E case 0x5D' },
  HOLD_OFF:            { id: 0x5E, payload: 'resume network processing', sourceAddr: '0x0047E94E case 0x5E' },
  NEW_CIV:             { id: 0x5F, response: 0x61, payload: 'civ type', sourceAddr: '0x0047E94E case 0x5F' },
  KILL_CIV:            { id: 0x60, response: 0x62, payload: 'civ id, reason', sourceAddr: '0x0047E94E case 0x60' },
  NEW_CIV_ACK:         { id: 0x61, payload: 'new civ ack', sourceAddr: '0x0047E94E' },
  KILL_CIV_ACK:        { id: 0x62, payload: 'kill civ ack', sourceAddr: '0x0047E94E' },
  BRIBE_UNIT:          { id: 0x63, payload: 'transfer ownership, update counters', sourceAddr: '0x0047E94E case 0x63' },
  SPY_ACTION:          { id: 0x64, payload: 'spy action processing', sourceAddr: '0x0047E94E case 0x64' },
  WAIT_GAMEXMIT:       { id: 0x65, payload: 'block UI, show wait dialog (during join)', sourceAddr: '0x0047E94E case 0x65' },
  WAIT_GAMEXMIT_DONE:  { id: 0x66, payload: 'unblock UI after join resync', sourceAddr: '0x0047E94E case 0x66' },
  WONDER_CASCADE:      { id: 0x68, payload: 'chat text with civ name + turn num', sourceAddr: '0x004B4000 area, 0x0047E94E case 0x68' },
  NEW_TURN:            { id: 0x69, payload: 'flush draw queue, start new turn, invalidate UI', sourceAddr: '0x0046B14D case 0x69, 0x0047E94E case 0x69' },

  // === Game Events (0x6A–0x6F) ===
  GAME_EVENT:          { id: 0x6A, payload: 'event_id + strings + ints (dispatched to mp_event queue)', sourceAddr: '0x00511880, 0x0047E94E case 0x6A' },
  SCENARIO_FLAGS:      { id: 0x6B, payload: 'set scenario flags', sourceAddr: '0x0047E94E case 0x6B' },
  TOGGLE_AI:           { id: 0x6C, payload: 'toggle AI control for civ', sourceAddr: '0x0047E94E case 0x6C' },
  TOGGLE_SAVE_PROTECT: { id: 0x6D, payload: 'toggle save protection', sourceAddr: '0x0047E94E case 0x6D' },
  ENABLE_SAVE:         { id: 0x6E, payload: 'enable save mode', sourceAddr: '0x0047E94E case 0x6E' },
  DISABLE_SAVE:        { id: 0x6F, payload: 'disable save mode', sourceAddr: '0x0047E94E case 0x6F' },

  // === Deferred Rendering / Draw Queue (0x70–0x7D) ===
  DRAW_MOVE:           { id: 0x70, payload: 'enqueue unit move animation (may convert to 0x72 if no city capture)', sourceAddr: '0x0047E94E case 0x70' },
  DRAW_VISIBILITY:     { id: 0x71, payload: 'enqueue visibility update', sourceAddr: '0x0047E94E case 0x71' },
  DRAW_TILE:           { id: 0x72, payload: 'enqueue tile redraw (if visible)', sourceAddr: '0x0047E94E case 0x72' },
  DRAW_TILE_PAIR:      { id: 0x73, payload: 'enqueue tile redraw (if either tile visible)', sourceAddr: '0x0047E94E case 0x73' },
  DRAW_FULL_REDRAW:    { id: 0x74, payload: 'enqueue full map redraw', sourceAddr: '0x0047E94E case 0x74' },
  DRAW_AREA_A:         { id: 0x75, payload: 'enqueue area redraw variant A', sourceAddr: '0x0047E94E case 0x75' },
  DRAW_AREA_B:         { id: 0x76, payload: 'enqueue area redraw variant B', sourceAddr: '0x0047E94E case 0x76' },
  SET_ANIM_COUNTER:    { id: 0x77, payload: 'set animation frame counter', sourceAddr: '0x0047E94E case 0x77' },
  DRAW_EFFECT_A:       { id: 0x7C, payload: 'enqueue special effect A', sourceAddr: '0x0047E94E case 0x7C' },
  DRAW_EFFECT_B:       { id: 0x7D, payload: 'enqueue special effect B', sourceAddr: '0x0047E94E case 0x7D' },

  // === Combat (0x78–0x79) ===
  ATTACK_ANIM:         { id: 0x78, payload: 'play attack animation', sourceAddr: '0x0047E94E case 0x78' },
  DEFENSE_ANIM:        { id: 0x79, payload: 'play defense animation', sourceAddr: '0x0047E94E case 0x79' },

  // === Sound/Music (0x7A–0x7B) ===
  PLAY_SOUND:          { id: 0x7A, payload: 'sound effect ID', sourceAddr: '0x0047E94E case 0x7A' },
  SET_MUSIC:           { id: 0x7B, payload: 'music track', sourceAddr: '0x0047E94E case 0x7B' },

  // === Intelligence & Diplomacy (0x7E–0x86) ===
  TECH_EXCHANGE:       { id: 0x7E, payload: 'technology exchange', sourceAddr: '0x0047E94E case 0x7E' },
  INTEL_REPORT:        { id: 0x7F, payload: 'intelligence report', sourceAddr: '0x0047E94E case 0x7F' },
  DIALOG_RESULT:       { id: 0x80, payload: 'set dialog result flag', sourceAddr: '0x0047E94E case 0x80' },
  TURN_END_CONFIRM:    { id: 0x81, payload: 'confirm turn end (diplomacy cancel)', sourceAddr: '0x0047E94E case 0x81, block_004B0000 diplomacy' },
  DIPLO_MSG_A:         { id: 0x82, payload: 'diplomacy message object A', sourceAddr: '0x0047E94E case 0x82' },
  DIPLO_MSG_B:         { id: 0x83, payload: 'diplomacy message object B', sourceAddr: '0x0047E94E case 0x83' },
  DIPLO_MSG_C:         { id: 0x84, payload: 'diplomacy message object C', sourceAddr: '0x0047E94E case 0x84' },
  DIPLO_MSG_D:         { id: 0x85, payload: 'diplomacy message object D', sourceAddr: '0x0047E94E case 0x85' },
  FOREIGN_ADVISOR:     { id: 0x86, payload: 'foreign advisor report', sourceAddr: '0x0047E94E case 0x86' },

  // === City Operations (0x87–0x8A) ===
  CITY_WORKER_CHANGE:  { id: 0x87, payload: 'city index, tile x, tile y', sourceAddr: '0x0047E94E case 0x87' },
  CITY_SPECIALIST:     { id: 0x88, payload: 'city index (cycle specialist)', sourceAddr: '0x0047E94E case 0x88' },
  CITY_RENAME:         { id: 0x89, payload: 'city index + new name', sourceAddr: '0x0047E94E case 0x89' },
  CITY_REFRESH:        { id: 0x8A, payload: 'refresh city window if not open', sourceAddr: '0x0047E94E case 0x8A' },

  // === Civ Elimination (0x8C–0x8F) ===
  CIV_ELIMINATE_A:     { id: 0x8C, payload: 'civ elimination operation A', sourceAddr: '0x0047E94E case 0x8C' },
  CIV_ELIMINATE_B:     { id: 0x8D, payload: 'civ elimination operation B', sourceAddr: '0x0047E94E case 0x8D' },
  UNIT_PURGE_A:        { id: 0x8E, payload: 'unit purge operation A', sourceAddr: '0x0047E94E case 0x8E' },
  UNIT_PURGE_B:        { id: 0x8F, payload: 'unit purge operation B', sourceAddr: '0x0047E94E case 0x8F' },

  // === Map/Tile Operations (0x90–0x98) ===
  TILE_FLAG_OP:        { id: 0x90, payload: 'tile flag set/clear', note: 'ops 0x90-0x97 are individual tile flag operations', sourceAddr: '0x0047E94E case 0x90-0x97' },
  PER_CIV_CONTINENT:   { id: 0x98, payload: 'set per-civ per-continent flag', sourceAddr: '0x0047E94E case 0x98' },

  // === Embassy & Misc (0x99–0xA3) ===
  SET_EMBASSY:         { id: 0x99, payload: 'embassy marker', sourceAddr: '0x0047E94E case 0x99' },
  SCROLL_ANIM:         { id: 0x9A, payload: 'scroll animation coords', sourceAddr: '0x0047E94E case 0x9A' },
  SPACE_RACE:          { id: 0x9B, payload: 'space race event (delegate)', sourceAddr: '0x0047E94E case 0x9B' },
  SYNC_MARKER:         { id: 0x9C, payload: 'no-op (synchronization marker)', sourceAddr: '0x0047E94E case 0x9C' },
  TAX_RATE_A:          { id: 0x9D, payload: 'tax rate dialog A', sourceAddr: '0x0047E94E case 0x9D' },
  TAX_RATE_B:          { id: 0x9E, payload: 'tax rate dialog B', sourceAddr: '0x0047E94E case 0x9E' },
  REVOLUTION:          { id: 0x9F, payload: 'revolution event', sourceAddr: '0x0047E94E case 0x9F' },
  SENATE_OVERRIDE:     { id: 0xA0, payload: 'senate/spy override (delegate to remote)', sourceAddr: '0x0056xxxx block' },
  SPY_OPERATION:       { id: 0xA1, payload: 'spy operation (delegate to remote)', sourceAddr: '0x0056xxxx block' },
  COUNTER_OP:          { id: 0xA2, payload: 'counter operation', sourceAddr: '0x0047E94E case 0xA2' },
  DRAW_QUEUE_FORWARD:  { id: 0xA3, payload: 'forward to draw queue', sourceAddr: '0x0047E94E case 0xA3' },

  // === Diplomacy Exchanges (0xA4–0xA8) ===
  PEACE_PROPOSAL:      { id: 0xA4, payload: 'civ1, civ2 (ceasefire or break alliance)', sourceAddr: '0x0047E94E case 0xA4' },
  TECH_OFFER_ACCEPT:   { id: 0xA5, payload: 'accept tech offer (diplomacy button)', sourceAddr: '0x0047E94E case 0xA5, 0x0058xxxx' },
  TECH_OFFER_REJECT:   { id: 0xA6, payload: 'reject tech offer', sourceAddr: '0x0047E94E case 0xA6' },
  GOLD_OFFER_ACCEPT:   { id: 0xA7, payload: 'accept gold offer', sourceAddr: '0x0047E94E case 0xA7' },
  GOLD_OFFER_REJECT:   { id: 0xA8, payload: 'reject gold offer', sourceAddr: '0x0047E94E case 0xA8' },
};

// =============================================================================
// === Message Priority Queue ===
// =============================================================================
// Two-tier circular queue: alpha (priority) and primary
// Built in netmsg_enqueue @ 0x0051438F
export const MESSAGE_QUEUE = {
  ALPHA_SLOTS: 400,          // slots 0–399 (high priority)
  PRIMARY_SLOTS: 1600,       // slots 400–1999 (normal priority)
  TOTAL_SLOTS: 2000,         // 2000 slots × 12 bytes = 24000 bytes
  SLOT_SIZE: 12,             // bytes per slot: sender(4) + dataPtr(4) + size(4)
  // Alpha messages: type >= 0x2A AND type <= 0x66
  ALPHA_RANGE: { min: 0x2A, max: 0x66 },
  // Alpha dequeued first (priority), then primary
  // sourceAddr: '0x0051438F' (enqueue), '0x005149D6' (dequeue), '0x0051435F' (is_alpha)
};

// =============================================================================
// === State Diff Engine ===
// =============================================================================
// The diff engine maintains a mirror buffer of the entire game state.
// On each sync, it compares current state vs mirror DWORD-by-DWORD,
// builds diff packets (12-byte header + changed data), and sends via 0x5C.
//
// Core function: diff_engine_scan_and_send @ 0x004B0B53 (1888 bytes)
export const STATE_DIFF = {
  NUM_SECTIONS: 23,         // 0..22 registered sections (+ section 23 = events)
  MIRROR_ALIGNMENT: 4,      // all sections DWORD-aligned

  DIFF_PACKET_HEADER_SIZE: 12,  // section_id(4) + offset(4) + length(4)
  DIFF_MESSAGE_TYPE: 0x5C,     // sent via net_send_message type 0x5C

  // RLE compression used for full state serialization
  RLE_LITERAL_FLAG: 0x8000, // high bit set = literal run, length = value & 0x7FFF
  RLE_FILL_FLAG: 0x0000,   // high bit clear = fill run, followed by fill byte
  RLE_MIN_RUN_LENGTH: 4,   // runs < 4 bytes stored as literals

  // Checksum: simple DWORD/WORD/byte sum depending on alignment
  // @ 0x004B1396

  // Section save block types used in serialization:
  BLOCK_TYPE_GAME: 1,      // btGame — main game data
  BLOCK_TYPE_MAP: 12,      // btMapStruct — map structure

  // sourceAddr: '0x004B0B53' (scan_and_send), '0x004B0A41' (copy_sections),
  //             '0x004B0AD0' (invert_mirror), '0x004B263E' (rle_encode),
  //             '0x004B251A' (rle_decode), '0x004B1396' (checksum)
};

// Section headers used in serialized save/network data:
// Each section node is 0x14 bytes (20 bytes): type(4) + size(4) + checksum(4) + reserved(8)
export const SECTION_NODE_SIZE = 0x14;
// sourceAddr: '0x004B2123' (read_section_node), '0x004B153C' (serialize_game)

// =============================================================================
// === Diff Engine Section Registry ===
// =============================================================================
// Registered by diff_engine_init_sections @ 0x004B21D7
// Each entry: registerSection(address, size, index) @ 0x004B3080
// This is the authoritative mapping of runtime memory layout for save/load and network sync.
export const DIFF_SECTIONS = [
  { index:  0, name: 'gameFlags',       dataAddr: 'DAT_0062D0B8', size: 4,       note: 'Global game flags (4 bytes)' },
  { index:  1, name: 'gameState',       dataAddr: 'DAT_00655AE8', size: 0x14C,   note: 'Core game state (332 bytes)' },
  { index:  2, name: 'cosmicRules',     dataAddr: 'DAT_0064BCF8', size: 0x790,   note: 'COSMIC rules block (1936 bytes)' },
  { index:  3, name: 'civData',         dataAddr: 'DAT_0064C6A0', size: 0x2CA0,  note: '8 civ records × 0x594 = 11424 bytes' },
  { index:  4, name: 'randomSeeds',     dataAddr: 'DAT_00666130', size: 0x400,   note: 'Random seed table (1024 bytes)' },
  { index:  5, name: 'unitData',        dataAddr: 'DAT_006560F0', size: 0x10000, note: 'Unit array (up to 2048 units × 0x20, size varies)' },
  { index:  6, name: 'cityData',        dataAddr: 'DAT_0064F340', size: 0x5800,  note: 'City array (up to 256 cities × 0x58, size varies)' },
  { index:  7, name: 'leaderPortraits', dataAddr: 'DAT_006554F8', size: 0x3F0,   note: 'Leader portrait data (1008 bytes)' },
  { index:  8, name: 'tailData',        dataAddr: 'DAT_00655C38', size: 0x4B0,   note: 'Tail data block (1200 bytes)' },
  { index:  9, name: 'scenarioBlock',   dataAddr: 'DAT_0064BC60', size: 100,     note: 'Scenario block (100 bytes)' },
  { index: 10, name: 'engineConstants', dataAddr: 'DAT_00655128', size: 0x154,   note: 'Engine constants (340 bytes)' },
  { index: 11, name: 'mpTimingBlock',   dataAddr: 'DAT_00654B40', size: 0x494,   note: 'MP timing data (1172 bytes)' },
  { index: 12, name: 'mapHeader',       dataAddr: 'DAT_006D1160', size: 0x10,    note: 'Map header (16 bytes)' },
  { index: 13, name: 'mapTerrainA',     dataAddr: 'DAT_006365E0', sizeFormula: 'mapWidth × mapHeight', note: 'Map terrain layer A' },
  { index: 14, name: 'mapTerrainB',     dataAddr: 'DAT_006365E4', sizeFormula: 'mapWidth × mapHeight', note: 'Map terrain layer B' },
  { index: 15, name: 'mapVisibilityA',  dataAddr: 'DAT_006365C4', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer A' },
  { index: 16, name: 'mapVisibilityB',  dataAddr: 'DAT_006365C8', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer B' },
  { index: 17, name: 'mapVisibilityC',  dataAddr: 'DAT_006365CC', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer C' },
  { index: 18, name: 'mapVisibilityD',  dataAddr: 'DAT_006365D0', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer D' },
  { index: 19, name: 'mapVisibilityE',  dataAddr: 'DAT_006365D4', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer E' },
  { index: 20, name: 'mapVisibilityF',  dataAddr: 'DAT_006365D8', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer F' },
  { index: 21, name: 'mapVisibilityG',  dataAddr: 'DAT_006365DC', sizeFormula: 'numMapCells', note: 'Per-tile visibility layer G' },
  { index: 22, name: 'mapContinents',   dataAddr: 'DAT_00636598', sizeFormula: 'numMapCells × 6', note: 'Per-tile continent/zone data' },
  // Section 23 is registered separately but used in total size calc:
  { index: 23, name: 'eventsData',      dataAddr: 'DAT_0064B98C', size: 50000,   note: 'Scenario events (50000 bytes max)' },
];
// sourceAddr: '0x004B21D7' (diff_engine_init_sections)

// =============================================================================
// === DirectPlay / XD_ Configuration ===
// =============================================================================
// The XD_ prefix refers to Civ2's custom network abstraction layer wrapping DirectPlay.
export const DIRECTPLAY_CONFIG = {
  MAX_PLAYERS: 7,           // DAT_006C3164 default (clamped 4–7 in INI)
                             // Serial mode forces to 2
                             // @ 0x0051D9A0 (mp_startup_config)
  MAX_PLAYER_SLOTS: 8,      // 0–7, slot 0 = barbarians (not a human seat)
  HUMAN_SLOT_RANGE: [1, 7], // human players use slots 1–7

  // Connection types (from mp_startup_config switch)
  CONNECTION_IPX: 0,
  CONNECTION_TCP_NEW: 1,
  CONNECTION_TCP_LOAD: 2,
  CONNECTION_SERIAL: 3,

  // Timeouts
  NET_TIMEOUT_DEFAULT: 30,  // DAT_006AD8B8 default (seconds, from CIV.INI "NetTimeOut")
                             // @ 0x0051D9A0

  // Flush timeouts observed in binary:
  FLUSH_DEFAULT_MS: 5000,   // XD_FlushSendBuffer(5000) — most common
  FLUSH_LONG_MS: 60000,     // XD_FlushSendBuffer(60000) — end-of-turn sync, host transfer
  FLUSH_JOIN_MS: 180000,    // XD_FlushSendBuffer(180000) — session creation/join (3 minutes)

  // Timer intervals
  KEEPALIVE_INTERVAL_MS: 50,   // SetTimer callback at 50ms (mp_start_timer @ 0x00425607)
  SESSION_REFRESH_MS: 250,     // Session list refresh at 250ms (0xFA) (@ 0x00425695)
  INVALIDATE_INTERVAL_MS: 1200, // 0x4B0 — UI invalidation throttle (@ 0x0048237D)

  // Client timeout
  CLIENT_TIMEOUT_MS: 3599,  // 0xE0F — client polls server, retries after this (@ 0x0048DA51)
  TIMEOUT_FORMULA: 'timeout_secs * 60', // Session prune: stale if elapsed > timeout_secs * 60 ticks
                             // @ 0x0042570C (prune_stale_sessions), 0x0048276D (timer_check)

  // Dev build path found in binary:
  DEV_PATH: 'D:\\Ss\\Franklinton\\NetMessageQueu',  // @ 0x0051438F netmsg_enqueue source path

  // sourceAddr: '0x0051D9A0' (mp_startup_config), '0x00425607' (timer),
  //             '0x0048DA51' (client timeout), '0x0042570C' (session prune)
};

// CIV.INI settings read by mp_startup_config @ 0x0051D9A0
export const INI_SETTINGS = {
  section: 'Civilization Gold',
  keys: {
    NetTimeOut: { default: 30, global: 'DAT_006AD8B8', note: 'seconds' },
    Adapter:    { default: 0,  global: 'DAT_006AD2FC', note: 'network adapter index' },
    MaxPlayers: { default: 7,  global: 'DAT_006C3164', note: 'clamped 4-7' },
  },
  // sourceAddr: '0x0051D9A0'
};

// =============================================================================
// === Turn Synchronization ===
// =============================================================================
export const TURN_SYNC = {
  // Turn signal: client sends 0x2B to server when ready
  SIGNAL_MSG_TYPE: 0x2B,     // @ 0x0048D9AD (mp_send_turn_signal)

  // Server game loop (@ 0x0048C9F3):
  // 1. Process all AI civ turns
  // 2. For each human civ: send turn data, wait for 0x2B signal
  // 3. Check for disconnections between turns
  // 4. Sync state via diff engine after turn processing

  // Client game loop (@ 0x0048BFEC):
  // 1. Send 0x2B signal to indicate ready
  // 2. Wait for server state data (blocking poll)
  // 3. Process received turn, play human turn
  // 4. Send updated state back, loop

  // Host migration: if server drops, clients negotiate new host
  // via mp_client_transfer_server @ 0x004828A5
  HOST_MIGRATION: {
    CLIENT_QUIT_MSG: 0x10,
    RECONNECT_PAUSE_MS: 60,  // brief pause before reconnecting
    // sourceAddr: '0x004828A5'
  },

  // sourceAddr: '0x0048D9AD' (send_turn_signal), '0x0048C9F3' (server loop),
  //             '0x0048BFEC' (client loop)
};

// =============================================================================
// === Turn Timer ===
// =============================================================================
// Configured via game_timer_dialog @ 0x0051EA8E
export const TURN_TIMER = {
  GLOBAL: 'DAT_00654B70',   // turn timer in milliseconds
  PRESETS: {
    NONE:    0,              // no timer
    SEC_30:  30000,          // 30 seconds
    SEC_60:  60000,          // 60 seconds
    MIN_2:   120000,         // 2 minutes
    MIN_3:   180000,         // 3 minutes
    MIN_5:   300000,         // 5 minutes
    // Custom: 10–3600 seconds (entered as seconds, stored as ms)
  },
  CUSTOM_RANGE: { min: 10, max: 3600 }, // seconds
  NEGATIVE_EASTER_EGG: {
    // Entering a negative custom timer toggles DAT_00654FA8 and sets DAT_00654FAA
    flag: 'DAT_00654FA8',
    value: 'DAT_00654FAA',
  },
  // sourceAddr: '0x0051EA8E' (game_timer_dialog)
};

// =============================================================================
// === MP Event Queue ===
// =============================================================================
// Events are enqueued via enqueue_mp_event @ 0x00511880
// and dispatched via dispatch_mp_event @ 0x00511BA2 (7252 bytes, ~100 cases)
export const MP_EVENT_QUEUE = {
  SEND_MSG_TYPE: 0x6A,      // events sent via network message 0x6A
  LINKED_LIST_HEAD: 'DAT_00631130',
  LINKED_LIST_TAIL: 'DAT_00631134',
  NODE_SIZE: 0x1C,          // 28-byte node header + variable data
  // sourceAddr: '0x00511880' (enqueue), '0x00511BA2' (dispatch)
};

// Complete event type catalog (dispatch_mp_event cases):
export const MP_EVENT_TYPES = {
  0x00: 'RETIREDIE',          0x01: 'RETIREAI',
  0x02: 'BARBARIANS',         0x03: 'GLOBALWARMING',
  0x04: 'FEARWARMING',        0x05: 'END_GAME_SCORES',
  0x06: 'EAGLEHASLANDED',     0x07: 'SCENARIOENDS',
  0x08: 'SCENARIOEND',        0x09: 'PLANRETIRE',
  0x0A: 'DORETIRE',           0x0B: 'LAUNCHED',
  0x0C: 'SPACERETURNS',       0x0D: 'SPACEDESTROYED',
  0x0E: 'DESTROYED',          0x0F: 'CARAVAN',
  0x10: 'FOODCARAVAN',        0x11: 'STARTWONDER',
  0x12: 'WONWONDER',          0x13: 'WONDEROBSOLETE',
  0x14: 'WONDERCAPTURED',     0x15: 'WONDERDESTROYED',
  0x16: 'CITYCAPTURE',        0x17: 'CITYCAPTUREDBY',
  0x18: 'CAPITALCAPTURE',     0x19: 'CAPITALCAPTUREDBY',
  0x1A: 'PARADROP',           0x1B: 'FIRSTCONTACT',
  0x1C: 'PARLEYREQUEST',      0x1D: 'SPYTECHSTOLEN',
  0x1E: 'SABOTAGEPRODUCTION', 0x1F: 'MPSABOTAGEPRODUCTION',
  0x20: 'SUBVERTED',          0x21: 'EMBASSYESTABLISHED',
  0x22: 'MPEMBASSYESTABLISHED', 0x23: 'INVESTIGATE',
  0x24: 'NUCLEARPLANT',       0x25: 'NUKEEXPLODED',
  0x26: 'AIRLIFT',            0x27: 'MBRIBEDUNIT',
  0x28: 'MAQUEDUCT',          0x29: 'PIRACY',
  0x2A: 'TRADEROUTE',         0x2B: 'TRADEROUTEONLY',
  0x2C: 'CARAVANYIELDS',      0x2D: 'SCIENCEADVANCE',
  0x2E: 'TOOKOVER',           0x2F: 'CITYFLIPS',
  0x30: 'GOVTOVERTHROWN',     0x31: 'GOVTOVERTHROWN2',
  0x32: 'MPREVOLUTION',       0x33: 'MPREVOLUTION2',
  0x34: 'AMBASSADOREXPELLED', 0x35: 'LEAVETREATY',
  0x36: 'DECLAREWAR',         0x37: 'DECLAREWAR2',
  0x38: 'NUKEPACT',           0x39: 'NUKEPACT2',
  0x3A: 'HEADSTAX',           0x3B: 'NEWGOVT',
  0x3C: 'COUNCIL',            0x3D: 'SELECTADVANCE',
  0x3E: 'RESEARCHGOAL',       0x3F: 'NOP',
  0x40: 'STEALTECH',          0x41: 'CITYSIZE',
  0x42: 'SPYPOISONED',        0x43: 'ANARCHY',
  0x44: 'SETTINGUP',          0x45: 'SETTINGUP2',
  0x46: 'BUILDFORT',          0x47: 'BUILDROAD',
  0x48: 'BUILDIRRIG',         0x49: 'BUILDMINE',
  0x4A: 'BUILDAIRBASE',       0x4B: 'POLLUTION',
  0x4C: 'CHOPPEDFOREST',      0x4D: 'CLEARSWAMP',
  0x4E: 'CLEARJUNGLE',        0x4F: 'BUILDRAILROAD',
  0x50: 'BUILDTRANSFORMATION', 0x51: 'GOODYHUT',
  0x52: 'GOODYHUT2',          0x53: 'SPACEMISSION',
  0x54: 'SPACEMISSION2',      0x55: 'SPACEMISSION3',
  0x56: 'BRIBEUNIT',          0x57: 'INCITECITY',
  0x58: 'CITYACQUIRED',       0x59: 'CITYDESTROYED',
  0x5A: 'CITYRAZEDBY',        0x5B: 'CITYDESTROYEDBY',
  0x5C: 'PLANTEDNUKE',        0x5D: 'PLANTEDNUKE2',
  0x5E: 'CIVILWAR',           0x5F: 'UPMINE',
  0x60: 'UPYOURS',            0x61: 'UPYOURSTOO',
  0x62: 'MERCDECLARE',        0x63: 'TOOKCIV',
  0x64: 'REVEALUNITORIGINS',  0x65: 'REVEALCITYINFO',
};
// sourceAddr: '0x00511BA2' (dispatch_mp_event)

// =============================================================================
// === Multiplayer Chat System ===
// =============================================================================
export const CHAT = {
  // Chat window commands (chatwin_handle_command @ 0x004923F0)
  COMMANDS: {
    SEND_TO_CIV_A: 0x2B0,  // cycles through civs by adjective
    SEND_TO_CIV_B: 0x2B1,  // cycles through civs by leader title + noun
    MACRO_1: 0x2B2,         // loads chatmac1.txt
    MACRO_2: 0x2B3,         // loads chatmac2.txt
    MACRO_3: 0x2B4,         // loads chatmac3.txt
  },
  MACRO_FILES: ['chatmac1.txt', 'chatmac2.txt', 'chatmac3.txt'],
  MAX_CHAT_LENGTH: 256,     // buffer size for chat text (DAT_00679640)
  // Chat messages sent via network message type 0x68
  NETWORK_MSG_TYPE: 0x68,
  // Chat log saved to chatlog.txt on close (parleywin_destruct @ 0x004B4593)
  LOG_FILE: 'chatlog.txt',
  // Chat display size read from CIV.INI "ChatShowSize" key
  INI_KEY: 'ChatShowSize',
  // sourceAddr: '0x004923F0' (handle_command), '0x0049275A' (load_macro),
  //             '0x004B4593' (save log)
};

// =============================================================================
// === Multiplayer Password System ===
// =============================================================================
// Per-player passwords for hotseat/PBEM/network games
// Functions at 0x00498310..0x00498943
export const PASSWORD_SYSTEM = {
  MAX_SLOTS: 8,
  PASSWORD_LENGTH: 32,      // bytes per password slot
  TOTAL_BLOCK_SIZE: 256,    // 8 × 32 bytes @ DAT_00654B74
  FLAGS_A: 'DAT_00673D18',  // 8 ints: password-set flags
  FLAGS_B: 'DAT_00673D38',  // 8 ints: password-verified flags

  // Encryption: simple substitution cipher
  // encrypt @ 0x004988B8, decrypt @ 0x00498943
  ENCRYPTION: {
    // For each byte i (0..255):
    //   encrypt: XOR with position → rotate right 3 → XOR with previous output
    //   decrypt: reverse (iterate backwards, un-XOR previous, rotate left 3, un-XOR position)
    algorithm: 'position-XOR + rotate-right-3 + chaining',
    // sourceAddr: '0x004988B8' (encrypt), '0x00498943' (decrypt)
  },

  // Passwords stored at offset +720 from tail start in save file
  SAVE_OFFSET_FROM_TAIL: 720,

  // PBEM mode (save_format == 2) forces password setup on first turn
  // sourceAddr: '0x00498310' (check_or_set), '0x0049836A' (set),
  //             '0x004985F4' (verify), '0x00498784' (init)
};

// =============================================================================
// === Hotseat / PBEM Specifics ===
// =============================================================================
export const HOTSEAT = {
  SAVE_FORMAT: 1,           // save_format_version == 1
  FILE_EXTENSION: '.hot',
  // On quit: save/restore human_civs_bitmask via hotseat_active_mask
  // Password required per-player turn transition
  // Turn order: cycles through alive human civs
  // sourceAddr: '0x00484D85' (handle_quit_game)
};

export const PBEM = {
  SAVE_FORMAT: 2,           // save_format_version == 2
  FILE_EXTENSION: '.eml',
  // Email address input during civ selection (civ_selection_dialog @ 0x0051F19C)
  EMAIL_DIALOG: 'EMAILADDRESS',
  // Save filename format: CivName_YYYY_MM_DD_HH_MM_SS.eml (@ 0x0047758C)
  FILENAME_FORMAT: '<CivName>_<YYYY>_<MM>_<DD>_<HH>_<MM>_<SS>.eml',
  // On save completion: shows "EMAILSAVED" message
  SAVE_MESSAGE: 'EMAILSAVED',
  // Password mandatory: mp_handle_player_turn forces mp_set_password (@ 0x00498A5C)
  PASSWORD_FORCED: true,
  // sourceAddr: '0x0051F19C' (email dialog), '0x0047758C' (save_game),
  //             '0x00498A5C' (handle_player_turn)
};

// =============================================================================
// === Session Browser ===
// =============================================================================
// Session node structure (from mp_update_session_info @ 0x00424AE9)
export const SESSION_NODE = {
  hostName:       { offset: 0x70, type: 'string' },
  gameName:       { offset: 0x90, type: 'string' },
  versionStr:     { offset: 0xB0, type: 'string' },  // compared against VERSION_STRING
  difficulty:     { offset: 0xB2, type: 'uint16' },
  playerBitmask:  { offset: 0xB4, type: 'uint8' },   // bits = occupied civ slots
  joinedBitmask:  { offset: 0xB5, type: 'uint8' },   // bits = connected players
  turnTimer:      { offset: 0xB8, type: 'uint32' },   // milliseconds
  scenarioName:   { offset: 0xBC, type: 'string' },
  scenarioFlags:  { offset: 0x110, type: 'uint16' },
  mapWidth:       { offset: 0x11A, type: 'uint16' },  // displayed as mapWidth/2
  mapHeight:      { offset: 0x11C, type: 'uint16' },
  // Session info buttons (9 total): host, game name, scenario, difficulty,
  // map size, rules, barbarians, turn timer, player counts
  // sourceAddr: '0x00424AE9' (update_session_info), '0x004257FE' (rebuild_list)
};

// =============================================================================
// === Player Join Resync Sequence ===
// =============================================================================
// When a new player joins mid-game (network_poll case 0x2E):
export const JOIN_RESYNC_SEQUENCE = [
  { msg: 0x65, target: 0xFF, note: 'Show "WAITONGAMEXMIT" on all clients' },
  { msg: 0x33, target: 'seat', note: 'Send viewport position to new player' },
  { msg: 0x04, target: 0xFF, note: 'Send full player info to all' },
  { flush: 5000, note: 'XD_FlushSendBuffer(5000)' },
  { action: 'send_full_state', target: 0xFF, note: 'Diff engine full state sync' },
  { msg: 0x0A, target: 'seat', note: 'Send parsed save data to new player' },
  { msg: 0x25, target: 'seat', note: 'Send events to new player' },
  { action: 'resync_mp_status', target: 'seat', note: 'Resync MP status flags' },
  { msg: 0x28, target: 'seat', note: 'Send game started counter' },
  { msg: 0x16, target: 'seat', note: 'Finalize seat assignment' },
  { msg: 0x9C, target: 0xFF, note: 'Sync marker (no-op)' },
  // Flush with timeout loop (up to 18 seconds)
  { msg: 0x66, target: 0xFF, note: 'Unblock all clients' },
  // sourceAddr: '0x0047E94E case 0x2E'
];

// =============================================================================
// === Template String System ===
// =============================================================================
// Used for formatting MP dialog text (mp_format_template_string @ 0x00426FF0)
export const TEMPLATE_FORMAT = {
  STRING_SLOT: '%STRING0',   // %STRING0..%STRING9 → DIALOG_STRINGS[idx] (stride 0x104)
  NUMBER_SLOT: '%NUMBER0',   // %NUMBER0..%NUMBER9 → DIALOG_NUMBERS[idx] (stride 4)
  HEX_SLOT: '%HEX0',        // %HEX0..%HEX9 → DIALOG_NUMBERS[idx] as 4-digit hex
  LITERAL_PERCENT: '%%',     // literal %
  STRING_ARRAY: 'DAT_0063CC48', // stride 0x104 (260 bytes per slot, 10 slots)
  NUMBER_ARRAY: 'DAT_0063CC30', // stride 4 (int per slot, 10 slots)
  // sourceAddr: '0x00426FF0'
};

// =============================================================================
// === Deferred UI Operations ===
// =============================================================================
// When XD_FlushSendBuffer is in progress, UI operations are deferred
// and replayed later (network_poll unstacking logic @ 0x0047E94E)
export const DEFERRED_UI_OPS = {
  MAP_CLICK:          1,
  MAP_DOUBLE_CLICK:   2,
  MAP_KEY:            4,   // if keytype == 3: also map_ascii(char)
  CITY_SCREEN_CLICK:  5,
  CITY_MOUSE:         6,
  CITY_BUTTON_BUY:    7,
  CITY_BUTTON_CHANGE: 8,
  CITY_BUTTON_VIEW:   9,
  CITY_BUTTON_RENAME: 10,
  // sourceAddr: '0x0047E94E' (unstacking switch)
};
