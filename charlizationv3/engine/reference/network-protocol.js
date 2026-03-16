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
//   0x0B–0x16: Player join/leave/disconnect (incl. NOP/reserved 0x0B-0x14)
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

  // === Player Join/Leave (0x0B–0x16) ===
  SESSION_CANCEL_NOP:  { id: 0x0B, payload: 'none (NOP in network_poll)', sourceAddr: '0x0047E94E case 0x0B' },
  JOIN_REJECT:         { id: 0x0C, payload: 'none (sent to failed join client; NOP in receiver)', sourceAddr: '0x0047E94E case 0x2E reject path, case 0x0C' },
  RESERVED_0D:         { id: 0x0D, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x0D' },
  SERVER_QUIT_NOTIFY:  { id: 0x0E, payload: 'server quitting, all players notified; increments quit counter', sourceAddr: '0x004824E3, 0x0047E94E case 0x0E' },
  HOST_TRANSFER:       { id: 0x0F, payload: 'new host assignment; increments quit counter', sourceAddr: '0x004824E3, 0x0047E94E case 0x0F' },
  CLIENT_QUIT:         { id: 0x10, payload: 'client requesting disconnect; decrements DAT_006ad664', sourceAddr: '0x004828A5, 0x0047E94E case 0x10' },
  RESERVED_11:         { id: 0x11, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x11' },
  SESSION_INFO_REQ:    { id: 0x12, payload: 'request session info from host; server responds with 0x13', sourceAddr: '0x0047E94E case 0x12' },
  SESSION_INFO_RESP:   { id: 0x13, payload: 'session info response: copies host name, game name, session name, scenario name into DAT_006ad57c..DAT_006ad5fc and dialog object fields', sourceAddr: '0x0047E94E case 0x13' },
  RESERVED_14:         { id: 0x14, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x14' },
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
  RESERVED_26:         { id: 0x26, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x26' },
  RESERVED_27:         { id: 0x27, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x27' },
  GAME_STARTED:        { id: 0x28, payload: 'game state counter (1=starting, 2=all ready, 3=running)', sourceAddr: '0x0056E2E9, 0x0047E94E case 0x28' },
  ALIVE_BITMASK:       { id: 0x2A, payload: 'alive civ bitmask + player mask', sourceAddr: '0x0048DAB9, 0x0047E94E case 0x2A' },
  TURN_SIGNAL:         { id: 0x2B, payload: 'player slot ID (turn ready signal); server echoes 0x2C', sourceAddr: '0x0048D9AD, 0x0047E94E case 0x2B' },
  TURN_SIGNAL_ACK:     { id: 0x2C, payload: 'none (NOP — turn signal acknowledgement from server)', sourceAddr: '0x0047E94E case 0x2C' },
  TURN_DONE:           { id: 0x2D, payload: 'player civ ID; client signals turn processing complete; server sets DAT_006c3188[civ]=1 and calls process_disconnected_players', sourceAddr: '0x0048BFEC line 3809, 0x0047E94E case 0x2D' },
  PLAYER_JOIN:         { id: 0x2E, payload: 'full resync handshake (server side)', sourceAddr: '0x0047E94E case 0x2E' },
  PLAYER_WAITING:      { id: 0x2F, payload: 'client waiting for join', sourceAddr: '0x0047E94E case 0x2F, 0x0059BFE5' },
  SEAT_CLAIM:          { id: 0x30, payload: 'civ slot claimed by player', sourceAddr: '0x0047E94E case 0x30' },
  SEAT_RELEASE:        { id: 0x31, payload: 'civ slot released', sourceAddr: '0x0047E94E case 0x31' },
  DISCONNECT:          { id: 0x32, payload: 'player disconnect notification', sourceAddr: '0x0047E94E case 0x32, 0x0056E2E9' },

  // === Position & Config (0x33–0x36) ===
  POSITION_SYNC:       { id: 0x33, payload: 'viewport_x, viewport_y, current_turn', sourceAddr: '0x00410000 block' },
  CITY_PROCESS:        { id: 0x34, response: 0x35, payload: 'city index; server calls FUN_004e1763(cityIdx,0,0) then responds with 0x35', sourceAddr: '0x0047E94E case 0x34' },
  CITY_PROCESS_ACK:    { id: 0x35, payload: 'city process ack; sets DAT_006c90b4 = 1', sourceAddr: '0x0047E94E case 0x35' },

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
  MAP_VISIBILITY_RESET:{ id: 0x58, payload: 'none; resets all tile visibility and city ownership fields, rebuilds per-civ vis layers via FUN_004f1220', sourceAddr: '0x0047E94E case 0x58' },
  BRIBE_CAPTURE:       { id: 0x5A, response: 0x5B, payload: 'complex unit bribe/capture', sourceAddr: '0x0047E94E case 0x5A' },
  BRIBE_CAPTURE_ACK:   { id: 0x5B, payload: 'bribe ack; sets DAT_006c914c = 1', sourceAddr: '0x0047E94E case 0x5B' },

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

  // === Reserved (0x8B) ===
  RESERVED_8B:         { id: 0x8B, payload: 'none (NOP — reserved/unused)', sourceAddr: '0x0047E94E case 0x8B' },

  // === Civ Elimination (0x8C–0x8F) ===
  CIV_ELIMINATE_A:     { id: 0x8C, payload: 'civ elimination operation A', sourceAddr: '0x0047E94E case 0x8C' },
  CIV_ELIMINATE_B:     { id: 0x8D, payload: 'civ elimination operation B', sourceAddr: '0x0047E94E case 0x8D' },
  UNIT_PURGE_A:        { id: 0x8E, payload: 'unit purge operation A', sourceAddr: '0x0047E94E case 0x8E' },
  UNIT_PURGE_B:        { id: 0x8F, payload: 'unit purge operation B', sourceAddr: '0x0047E94E case 0x8F' },

  // === Map/Tile Operations (0x90–0x98) ===
  // Each opcode modifies a specific field of the 6-byte tile record.
  // See MAP_TILE_OPS below for full details of each function.
  TILE_IMPROVEMENTS:   { id: 0x90, payload: 'x, y, bitmask, set_or_clear', params: 5, note: 'tile byte 1 — set/clear improvement bits (irrigation, mine, road, railroad, fortress, airbase, pollution, farmland)', sourceAddr: '0x005B94FC' },
  TILE_TERRAIN:        { id: 0x91, payload: 'x, y, terrain_type', params: 4, note: 'tile byte 0 — set low nibble (terrain type 0-10)', sourceAddr: '0x005B9646' },
  TILE_VISIBILITY:     { id: 0x92, payload: 'x, y, bitmask, set_or_clear', params: 5, note: 'tile byte 4 — set/clear per-civ visibility bits', sourceAddr: '0x005B976D' },
  TILE_CONTINENT_EXT:  { id: 0x93, payload: 'x, y, continent_id', params: 4, note: 'tile byte 5 low nibble — continent ID extension', sourceAddr: '0x005B98B7' },
  TILE_UNIT_OWNER:     { id: 0x94, payload: 'x, y, owner_id', params: 4, note: 'tile byte 5 high nibble — unit owner (0-8, 0xF=none)', sourceAddr: '0x005B99E8' },
  TILE_CITY_ID:        { id: 0x95, payload: 'x, y, city_index', params: 4, note: 'tile byte 3 — city index (0xFF = none)', sourceAddr: '0x005B9B35' },
  TILE_RIVER_FLAG:     { id: 0x96, payload: 'x, y, river_bits', params: 4, note: 'tile byte 2 bits 5-7 — river/special flags', sourceAddr: '0x005B9C49' },
  TILE_CIV_VISIBILITY: { id: 0x97, payload: 'x, y, value, civ_id, set_mode', params: 6, note: 'per-civ visibility layer via FUN_005b898b (uses 3-param tile lookup)', sourceAddr: '0x005B9D81' },
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

  // --- NM_DATAGRAM name table ---
  // Used in debug logging: s_NM_DATAGRAM_00628470 + msgType * 0x20
  // Each entry is a 32-byte (0x20) string naming the message type.
  DATAGRAM_NAME_TABLE: {
    baseAddr:  'DAT_00628470',  // NM_DATAGRAM string table start            // 0x0051438F
    stride:    0x20,            // 32 bytes per entry                         // 0x0051438F
  },

  // --- Special message type handling in enqueue ---
  // Message types 0x2B and 0x2C bypass the normal queue and instead
  // increment global counters. 0x2B also triggers a net_send(0x2C).
  COUNTER_MSG_TYPES: {
    0x2B: {
      counter:     'DAT_006c908c',  // _DAT_006c908c++                       // 0x0051438F
      triggersMsg: 0x2C,            // also calls net_send(0x2C, sender, ...) // 0x0051438F
      desc: 'state confirmation: increment counter + echo 0x2C to sender',
    },
    0x2C: {
      counter:     'DAT_006c9090',  // DAT_006c9090++                        // 0x0051438F
      desc: 'state confirmation ack: increment counter only',
    },
  },

  // --- Watermark tracking ---
  maxAlphaWatermark:  'DAT_006ad694',  // peak alpha queue depth              // 0x0051438F
  maxPrimaryWatermark:'DAT_006ad690',  // peak primary queue depth            // 0x0051438F

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
  NUM_SECTIONS_TOTAL: 24,   // 0..23 including events section; loop bound is 0x18 (24)
  MIRROR_ALIGNMENT: 4,      // all sections DWORD-aligned

  DIFF_PACKET_HEADER_SIZE: 12,  // section_id(4) + offset(4) + length(4)
  DIFF_MESSAGE_TYPE: 0x5C,     // sent via net_send_message type 0x5C
  FULL_STATE_TYPE: 0x15,       // full state sync uses message type 0x15

  // Diff packet flags (@ 0x004B0B53 line ~477)
  DIFF_COMPRESSED_FLAG: 0x8000,  // section_id | 0x8000 = RLE-compressed diff payload

  // Maximum diff chunk size (@ 0x004B0B53 line ~448)
  MAX_DIFF_CHUNK_SIZE: 0x400,    // 1024 bytes; assert if exceeded

  // Diff engine scan parameters (@ 0x004B0B53)
  SCAN_FLAG_INVERT_MIRROR:   0x01, // param_2 bit 0: invert mirror before scan (force full diff)
  SCAN_FLAG_TIME_LIMIT:      0x04, // param_2 bit 2: use GetTickCount time limit
  SCAN_FLAG_ITERATION_LIMIT: 0x08, // param_2 bit 3: use param_3 as iteration countdown
  SCAN_FLAG_SKIP_MEMCPY:     0x10, // param_2 bit 4: don't copy changed data to mirror

  // Game state header embedded in section 1 mirror (@ 0x004B0B53 when section_id==1)
  // Copies current game state fields into mirror at fixed offsets:
  SECTION1_HEADER: {
    mapWidth:          { mirrorOffset: 0x16, globalAddr: 'DAT_00655AFE' },  // uint16
    mapHeight:         { mirrorOffset: 0x18, globalAddr: 'DAT_00655B00' },  // uint16
    saveFormatVersion: { mirrorOffset: 0x1A, globalAddr: 'DAT_00655B02' },  // byte
    field_0x1B:        { mirrorOffset: 0x1B, globalAddr: 'DAT_00655B03' },  // byte
    field_0x1C:        { mirrorOffset: 0x1C, globalAddr: 'DAT_00655B04' },  // byte
    field_0x1D:        { mirrorOffset: 0x1D, globalAddr: 'DAT_00655B05' },  // byte
    field_0x02:        { mirrorOffset: 0x02, globalAddr: 'DAT_00655AEA' },  // uint32
    field_0x0A:        { mirrorOffset: 0x0A, globalAddr: 'DAT_00655AF2' },  // uint16
  },
  // sourceAddr: '0x004B0B53 (offsets 353-392)'

  // Packet magic and message type for diff flush (@ 0x004B0B53 line ~364)
  DIFF_FLUSH_MAGIC: 0x66606660,     // DAT_00679FF0 = 0x66606660
  DIFF_FLUSH_MSG_FULL: 0x15,        // param_5=='\0' => type 0x15 (full state sync)
  DIFF_FLUSH_MSG_DELTA: 0x5C,       // param_5!='\0' => type 0x5C (delta diff)
  DIFF_FLUSH_TIMEOUT_MS: 5000,      // XD_FlushSendBuffer(5000) after intermediate flush
  // sourceAddr: '0x004B0B53 (lines 364-503)'

  // Minimum save format version for network diff (@ 0x004B0B53 line ~327)
  MIN_NETWORK_FORMAT: 3,            // DAT_00655B02 < 3 => skip diff entirely

  // RLE compression used for full state serialization
  RLE_LITERAL_FLAG: 0x8000, // high bit set = literal run, length = value & 0x7FFF
  RLE_FILL_FLAG: 0x0000,   // high bit clear = fill run, followed by fill byte
  RLE_MIN_RUN_LENGTH: 4,   // runs < 4 bytes stored as literals
  RLE_MAX_RUN_LENGTH: 0x7FFF, // 32767 bytes max per run segment (@ 0x004B263E)

  // Checksum algorithm (@ 0x004B1396 — 270 bytes)
  // Selects accumulation width based on data alignment:
  //   size % 4 == 0 → DWORD sum (int32 adds)
  //   size % 2 == 0 → WORD sum (uint16 adds)
  //   otherwise     → BYTE sum (uint8 adds)
  CHECKSUM_ALGORITHM: 'alignment-adaptive sum',

  // Section save block types used in serialization:
  BLOCK_TYPE_GAME: 1,      // btGame — main game data
  BLOCK_TYPE_MAP: 12,      // btMapStruct — map structure
  // @ parse_save_block (0x004B2010): expects btGame(1) then btMapStruct(12) in sequence

  // Dynamic section sizes (@ 0x004B14A4 — calc_total_state_size)
  // Section 5 (unitData): DAT_00655B16 * 0x20 (numUnits * 32 bytes per unit)
  // Section 6 (cityData): DAT_00655B18 * 0x58 (numCities * 88 bytes per city)
  // Plus fixed overhead of 0x1E0 (480) bytes for section headers: 24 sections * 0x14 bytes
  SECTION_HEADERS_OVERHEAD: 0x1E0,  // 480 bytes = 24 * 0x14
  // sourceAddr: '0x004B14A4'

  // sourceAddr: '0x004B0B53' (scan_and_send), '0x004B0A41' (copy_sections),
  //             '0x004B0AD0' (invert_mirror), '0x004B263E' (rle_encode),
  //             '0x004B251A' (rle_decode), '0x004B1396' (checksum),
  //             '0x004B14A4' (calc_total_state_size), '0x004B12B3' (section_has_changes)
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
  { index:  1, name: 'gameState',       dataAddr: 'DAT_00655AE8', size: 0x14C,   note: 'Core game state (332 bytes). NOTE: save file writes 0x14A (330 bytes) at SAVE_FORMAT.gameStateSize; diff engine registers 0x14C (332 bytes). The 2-byte difference is padding/alignment added for the runtime diff engine.' },
  { index:  2, name: 'cosmicRules',     dataAddr: 'DAT_0064BCF8', size: 0x790,   note: 'COSMIC rules block (1936 bytes)' },
  { index:  3, name: 'civData',         dataAddr: 'DAT_0064C6A0', size: 0x2CA0,  note: '8 civ records × 0x594 = 11424 bytes' },
  { index:  4, name: 'randomSeeds',     dataAddr: 'DAT_00666130', size: 0x400,   note: 'Random seed table (1024 bytes)' },
  { index:  5, name: 'unitData',        dataAddr: 'DAT_006560F0', size: 0x10000, note: 'Unit array (up to 2048 units × 0x20, size varies)' },
  { index:  6, name: 'cityData',        dataAddr: 'DAT_0064F340', size: 0x5800,  note: 'City array (up to 256 cities × 0x58, size varies)' },
  { index:  7, name: 'leaderPortraits', dataAddr: 'DAT_006554F8', size: 0x3F0,   note: 'Leader portrait data (1008 bytes)' },
  { index:  8, name: 'tailData',        dataAddr: 'DAT_00655C38', size: 0x4B0,   note: 'Tail data block (1200 bytes)' },
  { index:  9, name: 'scenarioBlock',   dataAddr: 'DAT_0064BC60', size: 100,     note: 'Scenario block (100 bytes)' },
  { index: 10, name: 'engineConstants', dataAddr: 'DAT_00655128', size: 0x154,   note: 'Engine constants (340 bytes). NOTE: save file writes 0x152 (338 bytes); diff engine registers 0x154 (340 bytes). Same 2-byte padding/alignment difference as gameState (0x14A save vs 0x14C diff).' },
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
    MaxPlayers: { default: 7,  global: 'DAT_006C3164', note: 'clamped 5-7 (binary check: 4 < local_308)' },
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

  // Client loop polling (@ 0x0048BFEC, inner while loop):
  // Condition: DAT_006c9038==0 && DAT_006ad698=='\0' && DAT_006c918c==0
  //            && DAT_006ad685=='\0' && DAT_00628044!='\0'
  // Calls: thunk_FUN_0047e94e(1,0) then thunk_FUN_0048da51(slotId)
  CLIENT_POLL_FLAGS: {
    turnDataReady:   'DAT_006c9038',  // nonzero = server sent turn data              // 0x0048BFEC
    hostMigration:   'DAT_006ad698',  // nonzero = host migration in progress         // 0x0048BFEC
    gameEnding:      'DAT_006c918c',  // nonzero = game ending                        // 0x0048BFEC
    forceQuit:       'DAT_006ad685',  // nonzero = forced quit                        // 0x0048BFEC
    connected:       'DAT_00628044',  // '\0' = disconnected                          // 0x0048BFEC
  },

  // Client timeout check (FUN_0048da51 @ 0x0048DA51, 104 bytes):
  // Polls elapsed time; if > 0xE0F ticks, either resends turn signal or
  // increments timeout counter (DAT_006c3168[player]) / stale counter (DAT_006c8fb4)
  CLIENT_POLL_TIMEOUT_TICKS: 0xE0F,    // 3599 ticks before timeout action            // 0x0048DA51
  CLIENT_TIMEOUT_COUNTER: 'DAT_006c3168',  // per-player timeout counter (stride 4)   // 0x0048DA51
  CLIENT_STALE_COUNTER: 'DAT_006c8fb4',   // global stale connection counter          // 0x0048DA51

  // Turn timer conversion (@ 0x0048BFEC, 0x0048C9F3):
  // DAT_00654b70 (milliseconds) is converted to seconds for the countdown display
  // DAT_00633a78 = DAT_00654b70 / 1000 (turn timer in seconds)
  TURN_TIMER_CONVERSION: {
    timerMs:  'DAT_00654b70',      // turn timer in milliseconds (from game setup)    // 0x0048BFEC
    timerSec: 'DAT_00633a78',      // turn timer in seconds (= timerMs / 1000)        // 0x0048BFEC
    sentinel: 0xFFFFFFFF,          // _DAT_0066c990 set to -1 when timer resets       // 0x0048BFEC
  },

  // Client turn-end sequence (@ 0x0048BFEC, lines 3793-3810):
  // After human turn processing completes:
  // 1. diff_engine_scan_and_send(0xFF, 2, 0, 0, 0)
  // 2. net_send(0xA2, 0, DAT_006d1da0, ...)       — counter operation
  // 3. XD_FlushSendBuffer(60000)                   — 60s flush timeout
  // 4. If disconnected: net_send(0x2D, 0, DAT_006d1da0, ...) — turn done signal
  //    XD_FlushSendBuffer(60000)
  CLIENT_TURN_END: {
    counterMsg:     0xA2,         // counter operation message                         // 0x0048BFEC
    turnDoneMsg:    0x2D,         // turn done signal (only if disconnected)           // 0x0048BFEC
    flushTimeout:   60000,        // 60 second flush timeout for turn-end sync         // 0x0048BFEC
  },

  // Host migration: if server drops, clients negotiate new host
  // via mp_client_transfer_server @ 0x004828A5
  HOST_MIGRATION: {
    CLIENT_QUIT_MSG: 0x10,
    RECONNECT_PAUSE_MS: 60,  // brief pause before reconnecting
    // sourceAddr: '0x004828A5'
  },

  // Dialog strings used in MP turn loops
  DIALOG_STRINGS: {
    OURTURNTOMOVE: 'OURTURNTOMOVE',     // client: "Your turn to move" (no casualties)  // 0x0048BFEC
    CASUALTY: 'CASUALTY',               // client/server: 1 combat casualty report      // 0x0048BFEC, 0x0048C9F3
    CASUALTIES: 'CASUALTIES',           // client/server: multiple combat casualties     // 0x0048BFEC, 0x0048C9F3
    CLIENTHOTWAIT: 'CLIENTHOTWAIT',     // client: waiting for server when not our turn  // 0x0048BFEC
    LOSTCLIENT: 'LOSTCLIENT',          // server: player disconnected during turn        // 0x0048C9F3
    NEWPLAYER: 'NEWPLAYER',            // server: new player joined mid-game             // 0x0048C9F3
  },

  // Server game loop timing (@ 0x0048C9F3):
  // Between each human player's turn:
  //   1. diff_engine_scan_and_send(0xFF, 2, 0, 0, 0)
  //   2. XD_FlushSendBuffer(60000)    — 60s flush timeout
  //   3. Drain queues: while (DAT_006c8fac != 0 || DAT_006c8fa0 != 0) poll(1,0)
  //   4. Process AI turn if turn==0
  //   5. Per human civ: send 0x69 (NEW_TURN), send 0x16 (SEAT_FINALIZE), then wait
  SERVER_LOOP_FLUSH_TIMEOUT: 60000,    // XD_FlushSendBuffer(60000) between turns      // 0x0048C9F3
  SERVER_LOOP_DRAIN_ADDRS: ['DAT_006c8fac', 'DAT_006c8fa0'], // queue drain loop       // 0x0048C9F3

  // Process disconnected players (FUN_0048de75 @ 0x0048DE75, 376 bytes):
  // Called from server turn loop and from 0x2D handler.
  // Scans player slots 1..6, finds players with DAT_006c3188[civ] != 0 (ready flag),
  // removes them from alive bitmask, sends 0x2A (ALIVE_BITMASK) + 0x04 (GAME_SETTINGS).
  PROCESS_DISCONNECTED: {
    readyFlagArray: 'DAT_006c3188',    // per-civ ready flag (stride 4)                // 0x0048DE75
    slotScanRange:  [1, 6],            // scan player slots 1 through 6                // 0x0048DE75
    messages: [0x2A, 0x04],            // ALIVE_BITMASK then GAME_SETTINGS              // 0x0048DE75
    sourceAddr: '0x0048DE75',
  },

  // sourceAddr: '0x0048D9AD' (send_turn_signal), '0x0048C9F3' (server loop),
  //             '0x0048BFEC' (client loop), '0x0048DA51' (client timeout),
  //             '0x0048DE75' (process disconnected)
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
  LINKED_LIST_HEAD: 'DAT_00631130',  // first node in queue                  // 0x00511A0E
  LINKED_LIST_TAIL: 'DAT_00631134',  // last node in queue                   // 0x00511A0E
  NODE_HEADER_SIZE: 0x1C,   // 28-byte node header + variable data           // 0x00511A0E
  // Node layout (FUN_00511a0e — mp_event_enqueue_local, 193 bytes):
  //   offset 0x00: uint32  next       — pointer to next node (linked list)
  //   offset 0x04: uint32  eventType  — MP event type code
  //   offset 0x08: uint32  param2     — second parameter
  //   offset 0x0C: uint32  strCount   — number of string params
  //   offset 0x10: uint32  intCount   — number of integer params
  //   offset 0x14: uint32  param5     — fifth parameter
  //   offset 0x18: uint32  dataSize   — size of appended data
  //   offset 0x1C+: byte[] data       — packed string + int params
  // String packing: each string is null-terminated, stride 0x104 in DAT_0063CC48
  // Int packing: each int is 4 bytes, stride 4 from DAT_0063CC30
  STRING_PARAM_STORE: 'DAT_0063CC48', // stride 0x104 (260 bytes per slot)  // 0x00511880
  INT_PARAM_STORE:    'DAT_0063CC30', // stride 4 (int per slot)            // 0x00511880
  MIN_SAVE_VERSION:   3,     // skip enqueue if save_format_version <= 2     // 0x00511880
  // Drain: FUN_00511acf iterates head→next, freeing each node
  // Dispatch: FUN_00511ba2 reads head, processes event, frees node
  // sourceAddr: '0x00511880' (enqueue), '0x00511A0E' (local enqueue),
  //             '0x00511ACF' (drain), '0x00511BA2' (dispatch)
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
  0x50: 'BUILDTRANSFORMATION', 0x51: 'MILITARYAID1',
  0x52: 'MILITARYAID2',       0x53: 'SPACEMISSION',
  // NOTE: 0x51/0x52 were previously misidentified as GOODYHUT/GOODYHUT2.
  // Binary confirms: s_MILITARYAID1_00633c2c @ block_00550000.c:6093
  //                  s_MILITARYAID2_00633c3c @ block_00550000.c:6113
  // These are allied military aid notifications, not goody hut events.
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

// --- MP Event Sprite Offsets ---
// dispatch_mp_event (FUN_00511ba2) loads DAT_00628420 sprite resources for certain events.
// thunk_FUN_0059f2a3 adds sprite to popup menu; thunk_FUN_0040bc80 sets timer delay.
export const MP_EVENT_SPRITES = {
  // Cases 0x40 (NEWTURNTIMERCLIENT) and 0x43 (PMCHANGECLIENT):
  // Both load two sprites then show a timed popup (0x28 = 40 ticks for turn timer, 0 for PM change)
  // @ FUN_00511ba2 cases 0x40, 0x43 (lines ~847, 862)
  turnTimerPopupA:     0xd50,   // DAT_00628420 + 0xd50 — MP turn timer notification icon A  // 0x00511BA2
  turnTimerPopupB:     0xd54,   // DAT_00628420 + 0xd54 — MP turn timer notification icon B  // 0x00511BA2
  turnTimerDelay:      0x28,    // thunk_FUN_0040bc80(0x28) — 40-tick display for turn timer // 0x00511BA2
  pmChangeDelay:       0x00,    // thunk_FUN_0040bc80(0) — immediate for PM change            // 0x00511BA2

  // Case 0x64 (REVEALUNITORIGINS): reveal hidden unit owners after spy mission
  // @ FUN_00511ba2 case 100 (lines ~1031-1035)
  revealUnitsA:        0xdd4,   // DAT_00628420 + 0xdd4 — reveal unit origins icon A         // 0x00511BA2
  revealUnitsB:        0xdd8,   // DAT_00628420 + 0xdd8 — shared reveal info icon            // 0x00511BA2

  // Case 0x65 (REVEALCITYINFO): reveal city info after spy mission
  // @ FUN_00511ba2 case 0x65 (lines ~1071-1075)
  revealCityA:         0xddc,   // DAT_00628420 + 0xddc — reveal city info icon A            // 0x00511BA2
  revealCityB:         0xdd8,   // DAT_00628420 + 0xdd8 — shared reveal info icon (same)     // 0x00511BA2

  revealDelay:         0x14,    // thunk_FUN_0040bc80(0x14) — 20-tick delay for reveal popups // 0x00511BA2
  // DAT_00631138: flag set to 1 during REVEALUNITORIGINS processing                         // 0x00511BA2
  // DAT_0063113c: flag set to 1 during REVEALCITYINFO processing                            // 0x00511BA2
};

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

// =============================================================================
// === Continent Identification Algorithm ===
// =============================================================================
// Binary ref: FUN_004b32fe @ 0x004B32FE (1853 bytes)
// Flood-fill zone assignment with zone merging for land and ocean tiles.
export const CONTINENT_IDENTIFICATION = {
  // Two passes: land (local_18=1) then ocean (local_18=0)
  passes: ['land', 'ocean'],

  // Working memory allocation
  ZONE_COUNT_BUFFER_SIZE: 0x20000,  // 131072 bytes for zone count array (@ 0x004B32FE: 0x20000)
  ZONE_MAP_BUFFER_SIZE: 'DAT_006d1164 * 4',  // per-tile zone assignment (uint16 per tile, doubled)

  // Zone limits
  MAX_ZONES: 0x3F,       // 63 zones per pass (indices 1..0x3E, with 0x3F as overflow bin)
  MAX_ZONE_ID: 0x7FFE,   // search for free slot up to 0x7FFE (@ line ~1429)

  // Minimum zone size thresholds for land pass (local_18 != 0)
  MIN_LAND_ZONE_SIZE: 9,   // zones with count < 9 tiles are merged into overflow (@ line ~1450)
  MIN_OCEAN_ZONE_SIZE: 0x10, // 16 tiles; ocean zones < 16 are split into new zone if room (@ line ~1491)

  // Overflow bin
  OVERFLOW_ZONE: 0x3F,    // zones too small get reassigned to zone 0x3F (@ line ~1462, 1499)

  // Output addresses
  landZoneSizes:  '@ DAT_00666134 (stride 0x10, 64 entries)',  // zone size per land zone
  oceanZoneSizes: '@ DAT_00666130 (stride 0x10, 64 entries)',  // zone size per ocean zone
  perTileContinentData: '@ DAT_00636598 + 3 (stride 6 per tile)',  // written byte per tile

  // Zone merging: when two adjacent zones are found, the smaller-ID zone absorbs the larger
  // All tiles of the absorbed zone are re-scanned and reassigned
  mergeAlgorithm: 'greedy merge on 3-neighbor scan (NW, N, NE) for each row',

  // Adjacency table built by FUN_004b315c after continent identification
  adjacencyTableAddress: '@ DAT_00666137 (stride 0x10, 64 entries × 8 neighbor bytes)',
  adjacencyAlgorithm: 'For each land tile, check 8 neighbors; if different zone, set bit in adjacency byte',

  // Return value: bitmask of passes that overflowed (bit 0 = ocean, bit 1 = land)
  returnOverflowBitmask: true,

  // Map iteration flag: DAT_00655ae8 & 0x8000 resets scan state each row
  mapWrapFlag: 0x8000,

  // sourceAddr: '0x004B32FE' (continent identification), '0x004B315C' (adjacency builder)
};

// =============================================================================
// === Parley / Diplomacy Window ===
// =============================================================================
// Binary ref: FUN_004b4108 @ 0x004B4108 (parleywin constructor, 1144 bytes)
// Binary ref: FUN_004b4735 @ 0x004B4735 (parleywin open, 1198 bytes)
// Binary ref: FUN_004b4593 @ 0x004B4593 (parleywin destructor, 370 bytes)
// Binary ref: FUN_004b81dd @ 0x004B81DD (parley state machine, 1177 bytes)
// Binary ref: FUN_004b8676 @ 0x004B8676 (parley dialog state set, 536 bytes)
export const PARLEY_WINDOW = {
  // Chat display buffer (allocated when mode == 4 / network chat)
  chatBuffer: {
    INI_KEY: 'ChatShowSize',
    INI_SECTION: 'Civilization Gold',
    MIN_SIZE: 0x2000,     // 8192 bytes minimum (@ 0x004B4735: DAT_0069b03c < 0x2000)
    MAX_SIZE: 0xE000,     // 57344 bytes maximum (@ 0x004B4735: 0xDFFF < DAT_0069b03c)
    DEFAULT_SIZE: 0x2000, // written if missing or below minimum
    DEFAULT_STRING: '8192', // INI string value for default
    MAX_STRING: '57344',   // INI string value for maximum
    globalAddress: 'DAT_0069b03c',
    bufferAddress: 'DAT_0062d870',
  },

  // Chat input buffer
  chatInputBuffer: {
    SIZE: 0x101,           // 257 bytes (@ 0x004B4735: operator_new(0x101))
    address: 'DAT_0062d86c',
  },

  // Chat log file (saved on destruct when mode == 4)
  chatLogFile: 'chatlog.txt',             // @ 0x004B4593: Realloc("chatlog.txt")
  chatLogSaveCondition: 'DAT_006665fc != 0 && DAT_0062d870 != NULL',

  // High-resolution mode threshold
  HIGH_RES_THRESHOLD: 999,  // DAT_006ab198 > 999 → high-res mode (@ 0x004B4C81)

  // Parley window dimensions (FUN_004b4cf0 @ 0x004B4CF0, 410 bytes)
  // Selected based on in_ECX+0x154 (high-res flag)
  windowDimensions: {
    lowRes:  { width: 0x208, height: 0x14f },  // 520 x 335 pixels
    highRes: { width: 800,   height: 0x1cc },   // 800 x 460 pixels
    // Final size adjusted by border/margin globals:
    //   width  += (DAT_0062d860 + DAT_0062d858) * 2 + 6
    //   height += DAT_0062d85c * 2 + in_ECX[300] * 2 + 0xe
    //   in_ECX[300] = DAT_0062d85c * 2 + DAT_0062d864 * 2 + fontHeight
    sourceAddr: '0x004B4CF0',
  },

  // Window modes (param passed to FUN_004b4735)
  modes: {
    1: 'diplomacy (single/hotseat AI negotiation)',
    2: 'diplomacy (PBEM AI negotiation)',
    3: 'diplomacy (AI-initiated)',
    4: 'network chat (multiplayer)',
  },

  // Parley dialog state machine (DAT_0067a994)
  // Set by FUN_004b8676 based on DAT_0067a9b0 value
  dialogStates: {
    0:  'initial offer (civA proposes to civB)',
    1:  'awaiting response',
    2:  'accept / counter-offer base',
    3:  'select proposal type (DAT_0067a9b0 == -1)',
    4:  'PARLEYCANCEL — negotiation cancelled',
    5:  'specific proposal (DAT_0067a9b0 == 3)',
    6:  'treaty proposal (DAT_0067a9b0 == 0)',
    7:  'demand/tribute type 0 (DAT_0067a9c8 == 0)',
    8:  'demand/tribute type 1 (DAT_0067a9c8 == 1)',
    9:  'demand/tribute type 2 (DAT_0067a9c8 == 2)',
    10: 'demand/tribute type 3 (DAT_0067a9c8 == 3)',
    11: 'demand/tribute type 4+ (DAT_0067a9c8 >= 4)',
    12: 'tech exchange (DAT_0067a9b0 == 1, no counter)',
    13: 'tech exchange with counter (DAT_0067a9b0 == 1, DAT_0067a9c4 != 0)',
    14: 'gold input mode',
    15: 'map trade (DAT_0067a9b0 == 4)',
  },
  dialogStateAddress: 'DAT_0067a994',

  // Treaty flag constants used in diplomacy state checks
  treatyFlags: {
    contact:    0x01,  // (&DAT_0064c6c0)[civA * 0x594 + civB * 4] & 1
    ceasefire:  0x02,  // & 2
    peace:      0x04,  // & 4
    alliance:   0x08,  // & 8
    hatred:     0x20,  // (&DAT_0064c6c1)[civA * 0x594 + civB * 4] & 0x20
    embassy:    0x80,  // (&DAT_0064c6c0)[civA * 0x594 + civB * 4] & 0x80
    nuclear:    0x100, // *(ushort*)(&DAT_0064c6a0 + param_1 * 0x594) & 0x100
    victorious: 0x80,  // *(ushort*)(&DAT_0064c6a0 + param_1 * 0x594) & 0x80
  },

  // Network message for closing negotiation
  CLOSE_NEGOTIATION_MSG: 0x81,  // @ 0x004B76D5: net_send_message(0x81, ...)

  // Diplomacy network signals (received in parley state machine)
  networkSignals: {
    DAT_006c91e4: 'parley cancel signal',
    DAT_006c91e8: 'parley proposal received',
    DAT_006c91ec: 'parley accept received',
    DAT_006c91f0: 'parley reject received',
    DAT_006c91f4: 'parley counter-offer received',
  },

  // Parley dialog template strings
  dialogTemplates: {
    PARLEYCANCEL:       'PARLEYCANCEL',        // @ 0x004B76D5
    PARLEYACCEPT:       'PARLEYACCEPT',         // @ 0x004B81DD
    PARLEYNOTHANKS:     'PARLEYNOTHANKS',       // @ 0x004B81DD
    PARLEYCOUNTEROFFER: 'PARLEYCOUNTEROFFER',   // @ 0x004B81DD
    PARLEYWAITING:      'PARLEYWAITING',        // (referenced elsewhere)
    CANCELALLIED:       'CANCELALLIED',         // @ 0x004B81DD: break alliance
    CANCELPEACE:        'CANCELPEACE',          // @ 0x004B81DD: break peace
    BREAKCEASE:         'BREAKCEASE',           // @ 0x004B81DD: break ceasefire
    NOFOREIGNHUMAN:     'NOFOREIGNHUMAN',       // @ 0x004B7EB6: no foreign civs to talk to
  },

  // Parley chat/advisor geometry (FUN_004b5c93 @ 0x004B5C93, 5967 bytes)
  chatGeometry: {
    // 3 advisor panels arranged left-to-right (loop local_2c = 0..2)
    advisorPanels: 3,
    // Panel data addresses: panel0 → DAT_00645120, panel1 → DAT_00648820, panel2 → DAT_00647788
    // Panel size scaled by: (panelWidth * in_ECX[300]) / 0x18
    // Chat area (mode == 4 / network chat):
    //   9-line display: yTop = in_ECX[0x14c] + (DAT_0062d85c + fontHeight) * -9
    //   height = fontHeight * 9 + DAT_0062d85c * 8
    // Non-chat diplomacy area:
    //   6-line display: yTop = in_ECX[0x14c] + (DAT_0062d85c + fontHeight) * -6
    //   height = DAT_0062d85c * 5 + fontHeight * 6
    // Font scaling: fontHeight obtained via thunk_FUN_0040ef70() (hi-res and lo-res both call it)
    chatLines: 9,       // network chat mode (mode == 4)
    diplomacyLines: 6,  // diplomacy mode (non-chat)

    // --- Widget IDs (thunk_FUN_0040f680 / thunk_FUN_004bb620 calls) ---
    // @ FUN_004b5c93: each widget is created with a numeric button/control ID
    widgetIds: {
      advisorImage:  1000,  // 1001, 1002, 1003 — per-panel (local_2c + 1 + 1000) via thunk_FUN_004519b0
      chatButton:    0x3ed, // @ line 3076: thunk_FUN_0040f680(parent, 0x3ed, rect, sprite)
      chatListbox:   0x3ee, // @ line 3137: thunk_FUN_004bb620(parent, 0x3ee, rect, ..., 0x122, 0)
      inputListbox:  0x3ef, // @ line 3205: thunk_FUN_004bb620(parent, 0x3ef, rect, ..., style, 0)
      scrollUp:      0x3f0, // @ line 3231: thunk_FUN_0040f680(parent, 0x3f0, rect, sprite)
      scrollDown:    0x41e, // @ line 3252: thunk_FUN_0040f680(parent, 0x41e, rect, sprite)
      mapButton:     0x431, // @ line 3288: thunk_FUN_0040f680(parent, 0x431, rect, sprite) — non-chat only
      proposalBtn:   0x432, // @ line 3311: thunk_FUN_0040f680(parent, 0x432, rect, sprite) — non-chat only
      demandBtn:     0x428, // @ line 3336: thunk_FUN_0040f680(parent, 0x428, rect, sprite) — non-chat only
      giftBtn:       0x3f1, // @ line 3357: thunk_FUN_0040f680(parent, 0x3f1, rect, sprite) — non-chat only
      endTurnBtn:    0x427, // @ line 3377: thunk_FUN_0040f680(parent, 0x427, rect, sprite) — non-chat only
      actionBtn1:    0x3f2, // @ line 3399: thunk_FUN_0040f680(parent, 0x3f2, rect, sprite) — non-chat only
      actionBtn2:    0x3f2, // @ line 3422: reused ID, different position
      actionBtn3:    0x3f2, // @ line 3443: reused ID, different position
      actionBtn4:    0x3f2, // @ line 3464: reused ID, different position
    },

    // --- Sprite Resource Table Offsets (DAT_00628420 + offset) ---
    // @ FUN_004b5c93: each button uses a sprite from the resource table
    spriteOffsets: {
      chatBtnNet:   0xb2c,  // @ line 3065: chat button sprite (mode == 4, network)
      chatBtnDiplo: 0xb30,  // @ line 3068: chat button sprite (non-network mode)
      scrollUp:     0xb34,  // @ line 3230: scroll up button
      scrollDown:   0xb38,  // @ line 3251: scroll down button
      mapButton:    0xdb4,  // @ line 3287: map view button (non-chat only)
      proposalBtn:  0xdb8,  // @ line 3310: proposal button (non-chat only)
      demandBtn:    0x1a0,  // @ line 3335: demand button (non-chat only)
      giftBtn:      0xb3c,  // @ line 3356: gift button (non-chat only)
      endTurnBtn:   0xd10,  // @ line 3376: end turn / pass button (non-chat only)
      actionBtn1:   0xb40,  // @ line 3398: action row button 1
      actionBtn2:   0xb44,  // @ line 3421: action row button 2
      actionBtn3:   0xb48,  // @ line 3442: action row button 3
      actionBtn4:   0xb4c,  // @ line 3463: action row button 4
    },

    // --- Listbox Styles ---
    chatListboxStyle:  0x122, // @ line 3137: chat log listbox style
    inputListboxChat:  0x200, // @ line 3194: input listbox style (chat mode == 4)
    inputListboxDiplo: 0x220, // @ line 3197: input listbox style (diplomacy mode)
    chatListboxMemory: 0x2000, // @ line 3138: thunk_FUN_004189c0(0x2000) — chat buffer
    inputListboxMemory: 0x100, // @ line 3206: thunk_FUN_004189c0(0x100) — input buffer

    // --- Layout Constants ---
    buttonRowThirds: 3,       // @ line 3327: action buttons arranged in width/3 columns
    scrollAreaFraction: 9,    // @ line 3221: scroll button width = chatArea / 9

    sourceAddr: '0x004B5C93',
  },

  // Diplomat meeting sound (played when entering diplomacy — drum roll variant)
  // Formula: ((DAT_006d1168 + param_1) & 7) + 0x53 → sound IDs 0x53-0x5A
  // param_1 = target civ ID, DAT_006d1168 = turn counter
  musicTrackFormula: '((DAT_006d1168 + param_1) & 7) + 0x53',  // @ 0x004B7EB6 line 3879

  // Network diplomacy proposal message type
  PROPOSAL_MSG_TYPE: 0x86,  // @ 0x004B81DD: DAT_0067a9dc + 4 = 0x86

  // sourceAddr: '0x004B4108' (constructor), '0x004B4735' (open),
  //             '0x004B4593' (destructor), '0x004B81DD' (state machine),
  //             '0x004B8676' (dialog state set), '0x004B7EB6' (enter diplomacy)
};

// =============================================================================
// === Wonder Viewer ===
// =============================================================================
// Binary ref: FUN_004bb8e0 @ 0x004BB8E0 (wonder viewer entry, 155 bytes)
// Binary ref: load_civ2_art_004bbb3f @ 0x004BBB3F (load civ2art.gif, 638 bytes)
// Binary ref: FUN_004bbdfb @ 0x004BBDFB (play wonder video, 699 bytes)
export const WONDER_VIEWER = {
  // civ2art.gif loading
  artGifDll: 'civ2_wonder.dll',           // @ 0x004BBB3F: resource DLL name
  artGifResourceBase: 20000,               // @ 0x004BBB3F: param_1 + 20000 (resource ID base)
  artGifResourceCount: 10,                 // @ 0x004BBB3F: 10 frames
  artGifFrameSize: { width: 0xEC, height: 0xF0 },  // 236 × 240 pixels (@ load params)
  tileSize: { width: 0x40, height: 0x20 },           // 64 × 32 tile size (@ FUN_005bd65c)
  wonderNameSource: '(&DAT_0064c5c0)[wonderIdx * 2]', // @ 0x004BBB3F: wonder name lookup

  // Wonder video playback
  videoDirPrefix: 'civ2_video_wonder',     // @ 0x004BBDFB: directory/file prefix
  videoExtension: '.avi',                  // inferred from VFW usage
  videoDisableFlags: {
    scenarioFlag40: 0x40,   // DAT_00655af0 & 0x40 → skip video
    scenarioFlag80: 0x80,   // DAT_00655af0 & 0x80 → skip video
  },
  saveFormatNetworkCheck: 'DAT_00655b02 > 2 → enable network sync after video',
  vfwNotRegisteredError: 'VFWNOTREGISTERED',  // @ 0x004BBDFB: shown if VFW init fails (error -0x7ffbfeac)

  // Window dimensions for wonder viewer
  windowSize: { width: 0x140, height: 0xF0 },  // 320 × 240 (@ load_civ2_art)
  globalCompactSize: 0x100000,              // GlobalCompact(1MB) before loading (@ 0x004BBB3F)

  // sourceAddr: '0x004BB8E0' (entry), '0x004BBB3F' (load art), '0x004BBDFB' (play video)
};

// =============================================================================
// === XD_ Socket Initialization (from net_connect @ FUN_0059adef) ===
// =============================================================================
// The XD_ library is Civ2's custom network abstraction. These are the port numbers
// and per-transport timeout values read from CIV.INI during connection setup.
// Binary ref: FUN_0059adef @ block_00590000.c
export const XD_SOCKET_CONFIG = {
  // Port numbers for TCP and IPX socket initialization
  TCP_PORT_1:       0x1381,     // @ 0x0059adef — XD_InitializeSocketsTCP(3, 0x1381, 0x1382, ...)
  TCP_PORT_2:       0x1382,     // @ 0x0059adef — second port argument
  IPX_PORT_1:       0x1381,     // @ 0x0059adef — XD_InitializeSocketsIPXSPX(3, 0x1381, 0x1382, ...)
  IPX_PORT_2:       0x1382,     // @ 0x0059adef — second port argument
  MAX_PLAYERS_ARG:  7,          // @ 0x0059adef — 5th arg to XD_Initialize* (max 7 players)
  INIT_MODE_ARG:    3,          // @ 0x0059adef — 1st arg to XD_Initialize* (protocol version/mode)

  // Connection type → save_format_version mapping
  connectionTypeToSaveFormat: {
    0: 3,  // TCP sockets (Internet or LAN) → NETWORK_IPX (save_format = 3) // case 0
    1: 3,  // IPX/SPX sockets              → NETWORK_IPX (save_format = 3) // case 1
    2: 5,  // Modem                        → NETWORK_TCP_LOAD (save_format = 5) // case 2
    3: 6,  // Serial/Direct                → NETWORK_SERIAL (save_format = 6)   // case 3
  },
  // Internet vs LAN is distinguished by ECX+0x1e8:
  //   0 → Internet (uses INTERNET_Timeout, default 60s)
  //   1 → LAN (uses TCPIP_Timeout, default 15s)

  // sourceAddr: '0x0059ADEF'
};

// =============================================================================
// === Per-Transport Timeout Configuration (from FUN_0059adef) ===
// =============================================================================
// Each transport reads its timeout from CIV.INI with a minimum enforced floor.
// If the INI value is missing (-1) or below the minimum, a default is written back.
// Binary ref: FUN_0059adef @ block_00590000.c
export const TRANSPORT_TIMEOUTS = {
  INTERNET: {
    iniKey:     'INTERNET_Timeout',  // @ 0x0059adef — GetPrivateProfileIntA key
    iniSection: 'Civilization Gold',
    defaultSec: 60,                  // @ 0x0059adef — 0x3c, written if missing or < 60
    minSec:     60,                  // @ 0x0059adef — floor: (int)UVar2 < 0x3c
    storageOffset: 0x7b0,           // @ 0x0059adef — stored at ECX+0x7b0
  },
  TCPIP: {
    iniKey:     'TCPIP_Timeout',     // @ 0x0059adef — LAN TCP/IP timeout
    iniSection: 'Civilization Gold',
    defaultSec: 15,                  // @ 0x0059adef — 0xf, written if missing or < 15
    minSec:     15,                  // @ 0x0059adef — floor: (int)UVar2 < 0xf
    storageOffset: 0x7b0,
  },
  IPXSPX: {
    iniKey:     'IPXSPX_Timeout',    // @ 0x0059adef — IPX/SPX timeout
    iniSection: 'Civilization Gold',
    defaultSec: 15,                  // @ 0x0059adef — 0xf
    minSec:     15,
    storageOffset: 0x7b0,
  },
  MODEM: {
    iniKey:     'MODEM_Timeout',     // @ 0x0059adef — modem timeout
    iniSection: 'Civilization Gold',
    defaultSec: 30,                  // @ 0x0059adef — 0x1e
    minSec:     30,
    storageOffset: 0x7b0,
  },
  DIRECT: {
    iniKey:     'DIRECT_Timeout',    // @ 0x0059adef — serial/direct timeout
    iniSection: 'Civilization Gold',
    defaultSec: 30,                  // @ 0x0059adef — 0x1e
    minSec:     30,
    storageOffset: 0x7b0,
  },
  // sourceAddr: '0x0059ADEF'
};

// =============================================================================
// === Oversized Message Callback ===
// =============================================================================
// Binary ref: FUN_0059a8bb (net_manager_construct) @ block_00590000.c
export const OVERSIZED_MESSAGE_CB = {
  threshold: 50000,    // @ 0x0059a8bb — XD_SetOversizedMessageCB(50000, FUN_0059c0a4)
                       // Messages larger than 50000 bytes trigger the oversized callback
                       // which logs: "Oversized XDaemon message: %ul bytes"
  // sourceAddr: '0x0059A8BB'
};

// =============================================================================
// === Combat Log Ring Buffer (from FUN_0059c575) ===
// =============================================================================
// Per-civilization combat log stored as a circular buffer for replay/history.
// Binary ref: FUN_0059c575 @ block_00590000.c
export const COMBAT_LOG = {
  maxEntries:      300,      // @ 0x0059c575 — wraps to 0 when index == 300
  entryStride:     0x22,     // @ 0x0059c575 — 34 bytes per entry
                             // Fields: unit_type(2), param4(2), param5(2), param3(2),
                             //         opponent_gov_type(2), opponent_name(0x18), null(1)
  perCivStride:    0x27d8,   // @ 0x0059c575 — 10200 bytes per civ (300 * 0x22)
  baseAddress:     'DAT_006af2a0',  // @ 0x0059c575 — combat log data array base
  writeIndexArray: 'DAT_006af280',  // @ 0x0059c575 — per-civ write index (stride 4)
  readIndexArray:  'DAT_006af260',  // @ 0x0059c575 — per-civ read index (stride 4)
  unreadCountArray:'DAT_006af220',  // @ 0x0059c575 — per-civ unread count (stride 4)
  // sourceAddr: '0x0059C575'
};

// =============================================================================
// === Network Header Object (from FUN_0059d080) ===
// =============================================================================
// Binary ref: FUN_0059d080 @ block_00590000.c
export const NET_HEADER_OBJECT = {
  objectSize:   0x118,    // @ 0x0059d080 — *(in_ECX + 8) = 0x118 — 280 bytes
  messageType:  0x2e,     // @ 0x0059d080 — thunk_FUN_0046d5a0(0x2e) — header init with type 0x2e
  playerSlots:  7,        // @ 0x0059d080 — loop: local_8 < 7; inner loop: local_c < 0x18
  slotStride:   0x18,     // @ 0x0059d080 — 24 bytes per player slot in header
  // sourceAddr: '0x0059D080'
};

// =============================================================================
// === Session Info Packet Fields (from FUN_0059c31f) ===
// =============================================================================
// Detailed field layout of the session info packet populated when hosting.
// Builds on SESSION_NODE offsets with source address and field origins.
// Binary ref: FUN_0059c31f @ block_00590000.c
export const SESSION_INFO_FIELDS = {
  // Player bitmask construction uses a lookup table for civ count:
  // [0x00, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f, 0xff]
  civCountBitmaskTable: [0x00, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f, 0xff],

  fields: {
    hostName:      { offset: 0x00,  size: 0x20, source: 'DAT_006665b0' },    // @ 0x0059c31f
    gameName:      { offset: 0x70,  size: 0x20, source: 'DAT_006ad59c' },    // @ 0x0059c31f
    sessionName:   { offset: 0x90,  size: 0x20, source: 'DAT_00666570' },    // @ 0x0059c31f
    versionStr:    { offset: 0x30,  source: 'PTR_s_5_4_0f_Multiplayer_26_March_99' }, // @ 0x0059c31f
    saveVersion:   { offset: 0xb0,  size: 2, source: 'DAT_00654c74' },       // @ 0x0059c31f
    difficulty:    { offset: 0xb2,  size: 1, source: 'DAT_00655b08' },       // @ 0x0059c31f
    barbarians:    { offset: 0xb3,  size: 1, source: 'DAT_00655b09' },       // @ 0x0059c31f
    playerBitmask: { offset: 0xb4,  size: 1, source: 'DAT_00655b0a or lookup' }, // @ 0x0059c31f
    joinedBitmask: { offset: 0xb5,  size: 1, source: 'lookup[DAT_006ad308]' },   // @ 0x0059c31f
    turnTimer:     { offset: 0xb8,  size: 4, source: 'DAT_00654b70' },       // @ 0x0059c31f
    scenarioName:  { offset: 0xbc,  source: 'DAT_0064bc62' },               // @ 0x0059c31f
    scenarioEdit:  { offset: 0x10c, size: 2, source: 'DAT_00654fae' },      // @ 0x0059c31f
    scenarioType:  { offset: 0x10e, size: 2, source: 'DAT_00654fac' },      // @ 0x0059c31f
    scenarioFlags: { offset: 0x110, size: 2, source: 'DAT_00655af0' },      // @ 0x0059c31f
    scenarioStart: { offset: 0x112, size: 2, source: 'DAT_00655afc' },      // @ 0x0059c31f
    ruleSet1:      { offset: 0x114, size: 2, source: 'DAT_0064bcb4' },      // @ 0x0059c31f
    ruleSet2:      { offset: 0x116, size: 2, source: 'DAT_0064bcb6' },      // @ 0x0059c31f
    turnNumber:    { offset: 0x118, size: 2, source: 'DAT_00655af8' },      // @ 0x0059c31f
    mapWidth:      { offset: 0x11a, size: 2, source: 'DAT_006d1160' },      // @ 0x0059c31f
    mapHeight:     { offset: 0x11c, size: 2, source: 'DAT_006d1162' },      // @ 0x0059c31f
    maxTechRate:   { offset: 0x11e, size: 2, source: 'DAT_00654c7c' },      // @ 0x0059c31f
  },
  // sourceAddr: '0x0059C31F'
};

// =============================================================================
// === LCG Random Number Generator (from FUN_0059a733) ===
// =============================================================================
// Civ2's network manager uses its own LCG (Linear Congruential Generator)
// separate from the C runtime rand(). Used for network-related randomization.
// Binary ref: FUN_0059a733 @ block_00590000.c
export const NETWORK_LCG_RANDOM = {
  multiplier:  0x19660d,     // @ 0x0059a733 — LCG multiplier (Numerical Recipes constant)
  increment:   0x3c6ef35f,   // @ 0x0059a733 — LCG increment
  stateAddr:   'DAT_00635094', // @ 0x0059a733 — LCG state variable
  // Formula: state = state * 0x19660d + 0x3c6ef35f
  // Returns: (float10)state / (float10)0xffffffff — value in [0.0, 1.0)
  // Range function (FUN_0059a791): min + random() * (max - min)
  // sourceAddr: '0x0059A733' (random), '0x0059A791' (range)
};

// =============================================================================
// === Message Count Tracking (from FUN_0059c276) ===
// =============================================================================
// Per-message-type send/receive counters, 0xA9 (169) slots covering all msg types.
// Binary ref: FUN_0059c276 @ block_00590000.c
export const MESSAGE_COUNTERS = {
  totalSlots:    0xA9,       // @ 0x0059c276 — loop: local_8 < 0xa9 (169 message types)
  baseAddress:   'DAT_006c8fe0', // @ 0x0059c276 — counter array base
  stride:        4,          // @ 0x0059c276 — 4 bytes per counter (uint32)
  // Reset to 0 during network initialization
  // sourceAddr: '0x0059C276'
};

// =============================================================================
// === Map Tile Operation Messages (0x90–0x97) ===
// =============================================================================
// Individual tile field modification messages sent over network.
// Each message modifies one field of the 6-byte tile record.
// Extracted from FUN_005b94fc, FUN_005b9646, FUN_005b976d, FUN_005b98b7,
// FUN_005b99e8, FUN_005b9b35, FUN_005b9c49, FUN_005b9d81 @ block_005B0000.c
export const MAP_TILE_OPS = {
  // Message format: (opcode, 0/0xFF, x, y, value, set_or_clear, flush_flag, ...)
  // 0 in slot 1 = from client, 0xFF = from server
  ops: {
    0x90: { field: 'improvements', byteOffset: 1, params: 5, note: 'tile byte 1 — set/clear bits (irrigation=0x01, mine=0x02, road=0x04, railroad=0x08, fortress=0x20, airbase=0x40, pollution=0x80, farmland via bit combos)', sourceAddr: '0x005B94FC' },
    0x91: { field: 'terrain',      byteOffset: 0, params: 4, note: 'tile byte 0 — set low nibble (terrain type 0-10)', sourceAddr: '0x005B9646' },
    0x92: { field: 'visibility',   byteOffset: 4, params: 5, note: 'tile byte 4 — set/clear per-civ visibility bits', sourceAddr: '0x005B976D' },
    0x93: { field: 'continentExt', byteOffset: 5, params: 4, note: 'tile byte 5 low nibble — continent ID extension (masked & 0x0F)', sourceAddr: '0x005B98B7' },
    0x94: { field: 'ownerUnit',    byteOffset: 5, params: 4, note: 'tile byte 5 high nibble — unit owner (shifted <<4, 0-8 valid, 0xF = none)', sourceAddr: '0x005B99E8' },
    0x95: { field: 'cityId',       byteOffset: 3, params: 4, note: 'tile byte 3 — city index (0xFF = none)', sourceAddr: '0x005B9B35' },
    0x96: { field: 'landmass',     byteOffset: 2, params: 4, note: 'tile byte 2 bits 5-7 — river/special flags (shifted <<5, masked & 0x07)', sourceAddr: '0x005B9C49' },
    0x97: { field: 'civVisLayer',  byteOffset: 'variable', params: 6, note: 'per-civ visibility layer byte — set/OR value at (x,y,civId) via FUN_005b898b 3-param tile lookup', sourceAddr: '0x005B9D81' },
  },
  // sourceAddr: '0x005B94FC'–'0x005B9D81'
};

// =============================================================================
// === Batch Map Update Protocol ===
// =============================================================================
// When multiple tile changes happen at once (e.g., nuclear fallout), the client
// batches them into a buffer and sends as message 0x59.
// Extracted from FUN_005b9ec6 (begin), FUN_005b9f1c (end), FUN_005b9fde (add),
// FUN_005ba206 (apply) @ block_005B0000.c
export const BATCH_MAP_UPDATE = {
  // --- Buffer structure ---
  BUFFER_ADDR: 'DAT_006D1190',
  BUFFER_SIZE: 0x400,           // @ FUN_005b9ec6: _memset(&DAT_006d1190, 0, 0x400)
  MAX_ENTRIES: 0x100,           // @ FUN_005b9fde: 0x100 - DAT_006365f4 < needed → flush
  ENTRY_COUNTER_ADDR: 'DAT_006365F4', // current write position (starts at 1)

  // --- Buffer layout ---
  // Offset 0: uint32 — total operation count (_DAT_006d1190)
  // Offset 4+: packed operations, each prefixed by an op type (0..7)
  // Op types correspond to MAP_TILE_OPS indices:
  //   type 0, 2: 5 DWORDs (x, y, value, set_or_clear) → maps to 0x90, 0x92
  //   type 1, 3, 4, 5, 6: 4 DWORDs (x, y, value) → maps to 0x91, 0x93, 0x94, 0x95, 0x96
  //   type 7: 6 DWORDs (x, y, value, civId, set_mode) → maps to 0x97
  opSizes: {
    0: 5, // improvements: op + x + y + mask + set_or_clear
    1: 4, // terrain: op + x + y + value
    2: 5, // visibility: op + x + y + mask + set_or_clear
    3: 4, // continentExt: op + x + y + value
    4: 4, // ownerUnit: op + x + y + value
    5: 4, // cityId: op + x + y + value
    6: 4, // landmass: op + x + y + value
    7: 6, // civVisLayer: op + x + y + value + civId + set_mode
  },

  // --- Size table at DAT_006365F8 (8 entries) ---
  // Contains entry sizes (in DWORDs) per op type, used for overflow check
  SIZE_TABLE_ADDR: 'DAT_006365F8',

  // --- Begin batch ---
  // @ FUN_005b9ec6: sets DAT_006AD699 = 0 (individual sends disabled),
  //   DAT_006AD69A = 1 (batch mode on), clears buffer, counter = 1
  beginFlags: {
    individualSend: 'DAT_006AD699',  // 0 during batch
    batchMode:      'DAT_006AD69A',  // 1 during batch
  },

  // --- End batch / flush ---
  // @ FUN_005b9f1c: sends message 0x59 if buffer has > 1 entries
  // Then switches back: DAT_006AD699 = 1, DAT_006AD69A = 0
  FLUSH_MESSAGE: 0x59,          // @ FUN_005b9f1c: thunk_FUN_0046b14d(0x59, ...)
  FLUSH_SEND_TIMEOUT: 5000,     // @ FUN_005b9f1c: XD_FlushSendBuffer(5000)
  MIN_ENTRIES_TO_SEND: 2,       // @ FUN_005b9f1c: if (1 < DAT_006365f4) → send

  // --- Server-side apply ---
  // @ FUN_005ba206: server receives 0x59, unpacks buffer, replays each op
  // with the corresponding tile modification function (thunk_FUN_005b94fc etc.)
  applyAssert: 'DAT_006AD2F7 != 0 (must be server)',

  // sourceAddr: '0x005B9EC6' (begin), '0x005B9F1C' (end), '0x005B9FDE' (add), '0x005BA206' (apply)
};

// =============================================================================
// === Server Response Timeout ===
// =============================================================================
// All unit CRUD operations (create, delete, pick_up, put_down, relocate,
// move_to_bottom, load_ship, stack_unit, delete_safely, delete_visible)
// use the same timeout constant when waiting for server response.
// Extracted from every client-side operation in block_005B0000.c.
export const SERVER_TIMEOUT = {
  TICKS: 0xE10,               // 3600 ticks — all unit operations use this value
  // Pattern: send request message, then poll:
  //   while (response == -2 && (now - start < 0xE10)) { poll(1,1); }
  //   if still -2: log("Connection to server lost"), show SERVERCONNECTTIME dialog
  //   DAT_00628044 = 0 (mark disconnected)

  // Messages using this timeout (request → response):
  messages: {
    createUnit:    { request: 0x3D, responseAddr: 'DAT_006C90D8', sourceAddr: '0x005B3D06' },
    deleteUnit:    { request: 0x37, responseAddr: 'DAT_006C90C0', sourceAddr: '0x005B4391' },
    pickUpUnit:    { request: 0x3F, responseAddr: 'DAT_006C90E0', sourceAddr: '0x005B319E' },
    putDownUnit:   { request: 0x41, responseAddr: 'DAT_006C90E8', sourceAddr: '0x005B345F' },
    relocateUnit:  { request: 0x45, responseAddr: 'DAT_006C90F8', sourceAddr: '0x005B36DF' },
    moveToBottom:  { request: 0x43, responseAddr: 'DAT_006C90F0', sourceAddr: '0x005B389F' },
    loadShip:      { request: 0x49, responseAddr: 'DAT_006C9108', sourceAddr: '0x005B542E' },
    stackUnit:     { request: 0x4B, responseAddr: 'DAT_006C9110', sourceAddr: '0x005B5BAB' },
    deleteSafely:  { request: 0x4D, responseAddr: 'DAT_006C9118', sourceAddr: '0x005B5D93' },
    deleteVisible: { request: 0x4F, responseAddr: 'DAT_006C9120', sourceAddr: '0x005B6042' },
  },

  // Response sentinel: -2 (0xFFFFFFFE) means "waiting for response"
  PENDING_SENTINEL: -2,

  // Post-timeout: drain network queues
  //   while (DAT_006C8FAC != 0 || DAT_006C8FA0 != 0) { poll(1,0); }
  QUEUE_DRAIN_ADDRS: ['DAT_006C8FAC', 'DAT_006C8FA0'],

  // Disconnection handling:
  DISCONNECT_FLAG: 'DAT_00628044',  // set to 0 on timeout
  ERROR_DIALOG: 'SERVERCONNECTTIME',

  // sourceAddr: '0x005B319E'–'0x005B6042' (all unit operations in block_005B0000.c)
};

// =============================================================================
// === Network Flush After Unit Operations ===
// =============================================================================
// After local unit operations, if in multiplayer (DAT_00655B02 >= 3),
// a diff sync + flush is performed.
// Extracted from all unit operations in block_005B0000.c.
export const NETWORK_UNIT_SYNC = {
  MP_THRESHOLD: 3,             // DAT_00655B02 >= 3 means network game
  DIFF_SYNC_CALL: 'thunk_FUN_004b0b53(0xFF, 2, 0, 0, 0)',  // full diff sync, section 2
  FLUSH_TIMEOUT: 5000,         // XD_FlushSendBuffer(5000) — 5 second timeout
  // sourceAddr: throughout block_005B0000.c
};

// =============================================================================
// === Server Quit / Host Transfer Protocol ===
// Binary ref: FUN_004824e3 @ 0x004824E3 (577 bytes) in block_00480000.c
// When the server/host quits, the game transfers hosting to the next player.
// =============================================================================
export const SERVER_QUIT_PROTOCOL = {
  // Player slot structure
  playerSlotStride: 0x54,        // 84 bytes per player slot                   // 0x004824e3
  playerSlotBase: 'DAT_006ad30c', // base address of slot array                // 0x004824e3
  socketMapAddr: 'DAT_006ad558',  // int[8]: socket handle per civ             // 0x004824e3
  maxSlots: 7,                    // loop limit: slots 1..6                     // 0x004824e3

  // Message IDs sent during server quit sequence
  messageIds: {
    disconnect:     0x0E,         // notify all players of disconnect           // 0x004824e3
    hostTransfer:   0x0F,         // transfer host role to next player          // 0x004824e3
    announceNewHost: 0x16,        // announce the new host to all               // 0x004824e3
    refreshState:   0x04,         // full game state refresh                    // 0x004824e3
  },

  // Flush timeout for server quit
  flushTimeout: 60000,            // XD_FlushSendBuffer(60000) — 60 second timeout // 0x004824e3

  // Wait dialog shown during host transfer
  waitDialogKey: 'SERVERQUITWAIT', // s_SERVERQUITWAIT_0062bf34               // 0x004824e3

  // Host transfer: find first non-empty slot, memcpy into slot 0
  transferLogic: {
    findFirstActive: 'scan slots 1..6, find first with DAT_006ad359[slot*0x54] != 0',
    copySize: 0x54,               // full slot copied to slot 0                // 0x004824e3
    clearEmptySocket: 0xFFFFFFFF, // socket set to -1 for vacated slot         // 0x004824e3
  },

  // Next turn player calculation after quit
  nextPlayerFormula: '((currentTurn + 1) absolute value) & 7',                 // 0x004824e3

  // sourceAddr: '0x004824E3'
};

// =============================================================================
// === Lobby Dialog String IDs ===
// Source: FUN_00421fcd and FUN_004259a6 @ block_00420000.c
// String IDs used in the multiplayer lobby for game profile display.
// These are game.txt string indices (thunk_FUN_004af14b calls).
// =============================================================================

export const LOBBY_DIALOG_STRINGS = {
  // --- Game profile display (FUN_00421fcd, lines ~1758-1840) ---
  gameProfile: {
    gameName:       0x26F,        // "Game name" label                       // 0x004259A6
    scenarioType:   0x270,        // "Scenario type" label                   // 0x004259A6
    difficulty:     { base: 0x279, formula: 'scenarioByte + 0x279' },        // difficulty name
    playerCount:    0x273,        // "Players" label                         // 0x004259A6
    aiPlayers:      { base: 0x27F, formula: 'aiCount + 0x27F' },            // AI player count text
    turnTimer:      0x276,        // "Turn timer" label                      // 0x004259A6
    mapSize:        0x36C,        // "Map size" label                        // 0x004259A6
    noTimer:        0x285,        // "No timer" text (turnTimer == 0)        // 0x004259A6
    noPassword:     0x34C,        // "(No password)" text                    // 0x004259A6
  },

  // --- Game status booleans ---
  gameStatus: {
    inProgress: { base: 0x277, formula: '(isInProgress == 0) + 0x277' },     // 0x277="In progress", 0x278="Open"
    goldTrading: { base: 0x34D, formula: '0x34E - (goldTrading == 0)' },     // 0x34D or 0x34E
    techTrading: { base: 0x34F, formula: '0x350 - (techTrading == 0)' },     // 0x34F or 0x350
    mapTrading:  { base: 0x351, formula: '0x352 - (mapTrading == 0)' },      // 0x351 or 0x352
  },

  // --- Lobby list header ---
  lobbyHeader:    0x286,          // "No games found" or list header string   // 0x004257FE

  sourceAddr: '0x00421FCD',
};

// =============================================================================
// === Seat Bitmask Table ===
// Source: FUN_004259a6 @ block_00420000.c (lines ~2152-2160)
// Maps player count (0-8) to a bitmask of occupied seat slots.
// Used for multiplayer seat assignment and player presence tracking.
// =============================================================================

export const SEAT_BITMASK_TABLE = {
  // Index = number of players, value = bitmask of valid seats
  table: [
    0x00,   // 0 players: no seats
    0x01,   // 1 player:  seat 0
    0x03,   // 2 players: seats 0-1
    0x07,   // 3 players: seats 0-2
    0x0F,   // 4 players: seats 0-3
    0x1F,   // 5 players: seats 0-4
    0x3F,   // 6 players: seats 0-5
    0x7F,   // 7 players: seats 0-6
    0xFF,   // 8 players: seats 0-7 (all)
  ],
  usage: 'Used in session join logic to determine which player slots are valid',
  sourceAddr: '0x004259A6',
};

// =============================================================================
// === Game Profile Session Fields ===
// Source: FUN_00421fcd @ block_00420000.c (lines ~1785-1840)
// Field offsets within the session record received from host, used to populate
// the lobby game profile display.
// =============================================================================

export const GAME_PROFILE_SESSION = {
  // Session record field offsets (from local_8 pointer)
  fields: {
    gameName:        { offset: 0x70,  type: 'char[]', desc: 'Game session name' },
    hostName:        { offset: 0x90,  type: 'char[]', desc: 'Host player name' },
    password:        { offset: 0xBC,  type: 'char[]', desc: 'Session password (empty = no password)' },
    passwordMaxLen:  0x19,                             // truncated at 25 chars
    isInProgress:    { offset: 0xB0,  type: 'int16',  desc: '0 = open, nonzero = in progress' },
    scenarioMode:    { offset: 0xB2,  type: 'byte',   desc: 'Scenario byte (copied to DAT_00655b08)' },
    difficulty:      { offset: 0xB3,  type: 'byte',   desc: 'Difficulty level (0-5)' },
    openSlotsMask:   { offset: 0xB4,  type: 'byte',   desc: 'Bitmask of open player slots' },
    filledSlotsMask: { offset: 0xB5,  type: 'byte',   desc: 'Bitmask of filled (seated) player slots' },
    goldTrading:     { offset: 0x10C, type: 'int16',  desc: '0 = disabled, nonzero = enabled' },
    techTrading:     { offset: 0x10E, type: 'int16',  desc: '0 = disabled, nonzero = enabled' },
    scenarioFlags:   { offset: 0x110, type: 'int16',  desc: 'Scenario flags (→ DAT_00655af0)' },
    scenarioExtra:   { offset: 0x112, type: 'int16',  desc: 'Extra scenario flags (→ DAT_00655afc)' },
    mapWidth:        { offset: 0x114, type: 'int16',  desc: 'Map width (→ DAT_0064bcb4)' },
    mapHeight:       { offset: 0x116, type: 'int16',  desc: 'Map height (→ DAT_0064bcb6)' },
    yearPerTurn:     { offset: 0x118, type: 'int16',  desc: 'Years per turn' },
    turnTimerH:      { offset: 0x11A, type: 'int16',  desc: 'Turn timer hours*2' },
    turnTimerM:      { offset: 0x11C, type: 'int16',  desc: 'Turn timer minutes' },
    mapTrading:      { offset: 0x11E, type: 'int16',  desc: '0 = disabled, nonzero = enabled' },
    turnTimerMs:     { offset: 0xB8,  type: 'int32',  desc: 'Turn timer in milliseconds (0 = no timer)' },
  },

  // Global addresses written from session data
  globals: {
    scenarioFlags: 'DAT_00655af0',
    scenarioExtra: 'DAT_00655afc',
    mapWidth:      'DAT_0064bcb4',
    mapHeight:     'DAT_0064bcb6',
    scenarioMode:  'DAT_00655b08',
  },

  // Timer display format: MM:SS (with zero-padding)
  timerDisplay: {
    conversion: 'turnTimerMs / 1000 → total seconds; / 60 = minutes; % 60 = seconds',
    zeroPad: true,
    separator: ':',      // DAT_00625d40
  },

  sourceAddr: '0x00421FCD',
};

// =============================================================================
// === Parley Window Stage Rendering ===
// Source: FUN_00529cc0 (12,096 bytes) @ block_00520000.c
// This is the parley (diplomacy) window's panel rendering function.
// The switch statement covers cases 0x01-0x14, each setting up a different
// panel/stage of the diplomacy conversation UI.
// =============================================================================

export const PARLEY_STAGE_RENDERING = {
  sourceAddr: '0x00529CC0',
  functionSize: 12096,

  // --- Object Layout ---
  // The parley window object is accessed via `in_ECX`; key field offsets:
  objectFields: {
    windowRect:    0x140,          // RECT (left, top, right, bottom)                 // in_ECX+0x140
    bottomEdge:    0x1E0,          // int -- bottom of conversation panel area        // in_ECX+0x1E0
    stageFlags:    0x1E4,          // int[2] -- per-side stage render flags (stride 4)// in_ECX+0x1E4+param_2*4
    listControl:   0x36C,          // ptr[2] -- per-side list control (stride 4)      // in_ECX+0x36C+param_2*4
    highResFlag:   0x154,          // int -- 0=lo-res, nonzero=hi-res mode            // in_ECX+0x154
    maxChoiceCount:0x10420,        // int[2] -- per-side max visible choices (stride 4)// in_ECX+0x10420+param_2*4
  },

  // --- Stage -> Max Choice Count ---
  // Several stages assign the max visible choice count for the list panel:
  stageMaxChoices: {
    stage_0x05: { peace: 4, war: 4 },        // case 5: always 4 list entries         // 0x00529cc0
    stage_0x08: { peace: 7, war: 6 },        // case 8: 7 if local_28==0, else 6      // 0x00529cc0
    stage_0x0c: 5,                            // case 0xc: always 5                    // 0x00529cc0
    stage_0x11: { peace: 7, war: 6 },        // case 0x11: 7 if local_28==0, else 6   // 0x00529cc0
  },

  // --- Stage -> List Control IDs ---
  // Each stage creates list/button controls with specific ID constants (param to FUN_005310a0):
  controlIds: {
    stage_0x02: 0x3F3,       // tech exchange list (7 columns)                        // 0x00529cc0
    stage_0x03: 0x3F4,       // propose treaty/demand list (player 0)                 // 0x00529cc0
    stage_0x04: 0x3F5,       // propose treaty/demand list (player 1)                 // 0x00529cc0
    stage_0x07: 0x3F7,       // demand response list                                 // 0x00529cc0
    stage_0x0a_button_accept:  0x400,  // accept button (+ param_2 offset)            // 0x00529cc0
    stage_0x0a_button_reject:  0x402,  // reject button (+ param_2 offset)            // 0x00529cc0
    stage_0x0b:              0x40C,    // tribute amount list                          // 0x00529cc0
    stage_0x0d: {                      // demand list with 2 buttons
      list:    0x424,                  // list control (+ param_2 offset)              // 0x00529cc0
      buttons: [0x400, 0x402],         // accept/reject (+ param_2 offset)            // 0x00529cc0
    },
    stage_0x0f:              0x41F,    // intelligence list (7 columns)                // 0x00529cc0
    stage_0x11: {                      // negotiation proposal with accept/reject
      accept:  0x408,                  // accept button (+ param_2 offset)            // 0x00529cc0
      reject:  0x40A,                  // reject button (+ param_2 offset)            // 0x00529cc0
    },
    stage_0x13:              0x426,    // tech list (scrollable, max 0x2000 entries)   // 0x00529cc0
    stage_0x14:              0x426,    // tech list variant (same control ID)          // 0x00529cc0
  },

  // --- Tech List Parameters ---
  techListMaxEntries: 0x2000,          // 8192 -- max entries in tech exchange list    // 0x00529cc0
  techListCallback: 'LAB_00402040',    // list item callback address                  // 0x00529cc0

  // --- GAME.TXT Text Resource Offsets ---
  // Text labels loaded via thunk_FUN_00428b0c(DAT_00628420 + offset)
  // These are offsets into the GAME.TXT string table used for diplomacy panel text.
  textOffsets: {
    // --- Stage 3 & 4: Treaty proposal labels ---
    treaty_ceasefire:   0xBAC,     // "Ceasefire" label                              // 0x00529cc0
    treaty_peace:       0xBB0,     // "Peace treaty" label                           // 0x00529cc0
    treaty_alliance:    0xBB4,     // "Alliance" label                               // 0x00529cc0
    treaty_withdraw:    0xBB8,     // "Withdraw troops" label (3000 decimal)         // 0x00529cc0
    treaty_end_embargo: 0xBBC,     // "End embargo" label                            // 0x00529cc0
    treaty_share_intel: 0xBC0,     // "Share intelligence" (stage 3 only)            // 0x00529cc0
    treaty_share_map:   0xBC4,     // "Share world map" (stage 4 only)               // 0x00529cc0
    treaty_extra:       0xD08,     // extra treaty option label                      // 0x00529cc0
    // --- Stage 5: Specific proposal labels ---
    proposal_tech:      0xBCC,     // "Advance" label                                // 0x00529cc0
    proposal_gold:      0xBD0,     // "Gold" label                                   // 0x00529cc0
    proposal_city:      0xBD4,     // "City" label                                   // 0x00529cc0
    proposal_unit:      0xBD8,     // "Unit" label                                   // 0x00529cc0
    // --- Stage 7: Demand list header ---
    demand_header:      0xBF0,     // demand list header                             // 0x00529cc0
    demand_item_1:      0xBF4,     // demand list entry 1                            // 0x00529cc0
    demand_item_2:      0xBF8,     // demand list entry 2                            // 0x00529cc0
    demand_item_3:      0xBFC,     // demand list entry 3                            // 0x00529cc0
    demand_item_4:      0xC00,     // demand list entry 4                            // 0x00529cc0
    demand_item_5:      0xC04,     // demand list entry 5                            // 0x00529cc0
    // --- Stage 8: Demand/negotiate heading ---
    negotiate_heading:  0xC08,     // negotiation heading text                       // 0x00529cc0
    // --- Player-side header labels ---
    player_0_header:    0xC0C,     // "Our offer:" or similar (player 0 side)        // 0x00529cc0
    player_1_header:    0xC10,     // "Their offer:" or similar (player 1 side)      // 0x00529cc0
    // --- Stage 9: Gold input ---
    gold_prompt_yours:  0xC14,     // "Your gold:" prompt (no counter)               // 0x00529cc0
    gold_prompt_counter:0xC18,     // "Your gold:" prompt (with counter)             // 0x00529cc0
    gold_prompt_theirs: 0xC1C,     // "Their gold:" prompt                           // 0x00529cc0
    gold_format:        0xC20,     // gold amount format string                      // 0x00529cc0
    // --- Stage 0x0a: Accept/reject buttons ---
    button_accept:      0xC28,     // "Accept" button label                          // 0x00529cc0
    button_reject:      0xC2C,     // "Reject" button label                          // 0x00529cc0
    // --- Stage 0x0b: Map trade labels ---
    map_header:         0xC30,     // "Share map" heading                            // 0x00529cc0
    map_option_1:       0xC34,     // map option 1                                   // 0x00529cc0
    map_option_2:       0xC38,     // map option 2                                   // 0x00529cc0
    // --- Stage 0x0d: Tribute demand labels ---
    tribute_item_1:     0xC3C,     // tribute entry 1                                // 0x00529cc0
    tribute_item_2:     0xC40,     // tribute entry 2                                // 0x00529cc0
    tribute_item_3:     0xC44,     // tribute entry 3                                // 0x00529cc0
    tribute_item_4:     0xC48,     // tribute entry 4                                // 0x00529cc0
    tribute_extra:      0xC4C,     // tribute extra option                           // 0x00529cc0
    // --- Stage 0x0c: Response selection ---
    response_opt_1:     0xC50,     // response option 1                              // 0x00529cc0
    response_opt_2:     0xC54,     // response option 2                              // 0x00529cc0
    response_opt_3:     0xC58,     // response option 3                              // 0x00529cc0
    response_extra:     0xD0C,     // extra response option                          // 0x00529cc0
    // --- Stage 0x0f: Intelligence report labels ---
    intel_header:       0xC5C,     // intelligence header                            // 0x00529cc0
    intel_subheader:    0xC60,     // intelligence sub-header                        // 0x00529cc0
    // --- Stage 0x11: No proposals label ---
    no_proposals:       0xC68,     // "No proposals" placeholder                     // 0x00529cc0
    // --- Stage 0x11: Negotiation accept/reject buttons ---
    negotiate_accept:   0xDC8,     // accept negotiation button (player 0)           // 0x00529cc0
    negotiate_reject_0: 0xDCC,     // reject button (player 0 / player 1)            // 0x00529cc0
    negotiate_accept_1: 0xDD0,     // accept negotiation button (player 0 variant)   // 0x00529cc0
  },

  // --- Rendering Constants ---
  rendering: {
    fontSizeId: 10,                // FUN_005c19ad(10) -- set font before each stage  // 0x00529cc0
    textAlignment: 5,              // centered text (param to FUN_005c0f57)           // 0x00529cc0
    insetMargin: 'DAT_0062d858',   // horizontal margin constant                     // 0x00529cc0
    lineSpacing: 'DAT_0062d85c',   // vertical line spacing constant                 // 0x00529cc0
    panelPadding: 10,              // thunk_FUN_00408700(&rect, 10) -- panel border   // 0x00529cc0
  },

  // --- Diplomacy State Check ---
  // DAT_0067a994 (parley dialog state) checked at stages 0x0a and 0x0b:
  // If DAT_0067a994 != 9, certain buttons are disabled for one-sided proposals.
  parleyStateDisableCheck: 9,      // state 9 = "demand/tribute type 2" -- buttons always shown // 0x00529cc0
};

// =============================================================================
// === Hotseat Setup Flow ===
// Source: FUN_005218cb (1764 bytes), FUN_00521fe0 (1591 bytes),
//         FUN_005227e3 (773 bytes) @ block_00520000.c
// Handles scenario loading, civ selection, and advanced MP options for hotseat.
// =============================================================================

export const HOTSEAT_SETUP_FLOW = {
  // --- FUN_005218cb: Scenario/Difficulty/MP Options Flow ---
  scenarioLoadDialog: {
    windowStyle: 0x4000,                // thunk_FUN_0059db08(0x4000) -- dialog style    // 0x005218CB
    soundBeforeLoad: { id: 0x6B, params: [0, 1, 0] },  // thunk_FUN_0046e020(0x6b,0,1,0) // 0x005218CB
    soundAfterLoad:  { id: 0x6A, params: [0, 0, 0] },  // thunk_FUN_0046e020(0x6a,0,0,0) // 0x005218CB
    scenarioLoadedDialog: 'SCENARIOLOADED',              // shown after scenario loaded  // 0x005218CB
    difficultyDialog:     'DIFFICULTY',                  // difficulty selection         // 0x005218CB
    advancedMpDialog:     'ADVANCEDMP',                  // advanced MP options          // 0x005218CB
    timerDialogCtrlId:    0x364,         // embedded timer control (if DAT_006c3160!=0) // 0x005218CB
  },

  // --- FUN_00521fe0: Civ Selection Flow for Hotseat ---
  civSelection: {
    windowStyle: 0x4000,                // dialog style                                // 0x00521FE0
    textIdBase: 0x25E,                  // string ID = playerIndex + 0x25E              // 0x00521FE0
    // "Select player 1", "Select player 2", etc.
    genderDialog: 'GENDER',             // gender/tribe selection                      // 0x00521FE0
    nameInputId: 0xC5,                  // string ID for "Enter name" text             // 0x00521FE0
    leaderInfoId: 0xC4,                 // string ID for "Leader info" text            // 0x00521FE0
    civFlagsGenderBit: 0x200,           // civ flags |= 0x200 for female, &= ~0x200 for male // 0x00521FE0
    portraitStride: 0x30,               // 48 bytes per leader portrait record         // 0x00521FE0
    portraitCityLegend: { offset: 0x0E, count: 7, stride: 4 }, // city name IDs       // 0x00521FE0
  },

  // --- FUN_005227e3: AI Player Count Selection for Hotseat ---
  aiPlayerSetup: {
    windowStyle: 0x4000,                // dialog style                                // 0x005227E3
    mpThreshold: 3,                     // if DAT_00655b02 < 3: hotseat path           // 0x005227E3
    dialog: 'HOTSEAT2',                 // GAME.TXT section for AI player count        // 0x005227E3
    // Additional AI player slot labels:
    aiSlotStringIds: {
      slot4: 0x365,                     // shown if DAT_006c3164 > 4                   // 0x005227E3
      slot5: 0x366,                     // shown if DAT_006c3164 > 5                   // 0x005227E3
      slot6: 0x367,                     // shown if DAT_006c3164 > 6                   // 0x005227E3
    },
    defaultAiCount: 'DAT_006665d8',     // selected AI player count (int16)            // 0x005227E3
    aiCountVar: 'DAT_00655b0d',         // number of AI players to create              // 0x005227E3
    maxPlayerSlots: 'DAT_006c3164',     // max player slots for this game mode         // 0x005227E3
  },

  // --- FUN_0052263c: Scroll Direction Cycling ---
  scrollDirectionCycle: {
    states: { 5: 7, 6: 5, 7: 6 },      // -1 input cycles: 5->7->6->5                // 0x0052263C
    action: 'thunk_FUN_0055a41d(2, 6, newState)',                                       // 0x0052263C
    eventCategory: 2,                    // first param to FUN_0055a41d                 // 0x0052263C
    eventType: 6,                        // second param to FUN_0055a41d                // 0x0052263C
  },

  // --- FUN_005226fa: Viewport Direction Cycling ---
  viewportDirectionCycle: {
    // State machine returns viewport scroll delta values:
    states: {
      1: { next: 3, value: -999 },       // initial -> skip (sentinel)                // 0x005226FA
      2: { next: 1, value: 'tileWidth' }, // right                                    // 0x005226FA
      3: { next: 4, value: '-tileWidth' },// left                                     // 0x005226FA
      4: { next: 2, value: -999 },        // end -> skip (sentinel)                   // 0x005226FA
    },
    sentinel: -999,                        // magic value = "skip this direction"       // 0x005226FA
    tileWidthFormula: '((DAT_006ab198 - 0x280 + (>>31 & 7)) >> 3) + 1',               // 0x005226FA
  },

  sourceAddr: '0x005218CB, 0x00521FE0, 0x005227E3, 0x0052263C, 0x005226FA',
};

// =============================================================================
// === Demographics Display ===
// =============================================================================
// Source: FUN_00433434 (6486 bytes) @ block_00430000.c
// Renders the demographics advisor screen with per-civ statistics.
// =============================================================================

export const DEMOGRAPHICS_DISPLAY = {
  sourceAddr: '0x00433434',
  functionSize: 6486,

  // Disease formula denominator guard (line 1591):
  // DAT_006a65f8 is used as a divisor in the disease calculation.
  // If DAT_006a65f8 < 2, it is clamped to 1 to prevent divide-by-zero.
  diseaseDenominatorGuard: {
    global: 'DAT_006a65f8',
    check: 'if (DAT_006a65f8 < 2) DAT_006a65f8 = 1',
    note: 'Prevents divide-by-zero in disease rate = DAT_006a65cc / DAT_006a65f8 - 0x14 + ...',
    sourceAddr: '0x00433434 line ~1591',
  },

  // Family size display format (lines 1844-1854):
  // Family size is stored as integer tenths (e.g., 32 = 3.2).
  // Displayed as: value/10 . value%10 (decimal point inserted manually)
  familySizeDisplay: {
    formula: 'familySize = (aiStack_174[civ] * 0x28) / aiStack_6c[civ] + 0x14',
    displayFormat: 'value/10 + "." + value%10',   // e.g., 32 → "3.2"
    decimalSeparator: 'DAT_0062607c',              // locale-dependent decimal point character
    stringId: 0x187,                                // label string for "Family Size"
    note: 'After display, value is divided by 10 again for ranking: local_e4[civ] = value / 10',
    sourceAddr: '0x00433434 lines ~1844-1854',
  },

  // Demographics column layout (3 columns for ranking display)
  columnWidths: {
    left:   'DAT_0063ec34 + 2',      // left column x-offset
    middle: 'DAT_0063ec34 + 0xb4',   // middle column x-offset (180px from base)
    right:  'DAT_0063ec34 + 0x142',  // right column x-offset (322px from base)
    rightEdge: 'DAT_0063ec3c + DAT_0063ec34 - 4',  // right edge boundary
    sourceAddr: '0x00433434 lines ~1647-1650',
  },
};

// =============================================================================
// === Military Advisor — Spaceship Sub-Panel ===
// =============================================================================
// Source: FUN_00434e39 (3769 bytes) @ block_00430000.c
// Renders the military advisor screen including the spaceship progress panel.
// =============================================================================

export const MILITARY_ADVISOR_DISPLAY = {
  sourceAddr: '0x00434E39',
  functionSize: 3769,

  // Spaceship sub-panel (lines 2209-2345):
  // Shown when DAT_00655af0 & 0x80 and DAT_0064bc60 & 2 (spaceship active)
  spaceshipPanel: {
    // 4 spaceship components with progress bars
    components: {
      0: { stringId: 0x1B3, note: 'Component type 0 (e.g., Structural)' },
      1: { stringId: 0x1B4, note: 'Component type 1 (e.g., Component)' },
      2: { stringId: 0x1B6, note: 'Component type 2 (e.g., Module)' },
      3: { stringId: 0x1B7, note: 'Component type 3 (e.g., Fuel)' },
    },
    // Progress count per component: (short)(&DAT_0064bcbc)[componentIndex]
    progressData: 'DAT_0064bcbc',
    // Current spaceship owner: DAT_0064bcba (0 = no owner; otherwise civ ID)
    ownerGlobal: 'DAT_0064bcba',
    // Active component label: stringId = DAT_00673f54 + 0x1B3
    activeComponentStringId: 'DAT_00673f54 + 0x1B3',
    // Panel font: 0x5e size, 0x12 weight, bold (1,1)
    fontSetup: { size: 0x5E, weight: 0x12, bold: true },
    // Panel vertical gap: 6px between component list and progress bar area
    verticalGap: 6,
    sourceAddr: '0x00434E39 lines ~2209-2283',
  },

  // Unit display section (when no spaceship — normal military advisor)
  unitDisplay: {
    leftColumn: 'DAT_0063ec34 + 2',    // same as demographics base + 2
    sourceAddr: '0x00434E39 line ~2028',
  },

  // Sprite resource table offsets (DAT_00628420 + offset)
  // @ FUN_00434e39 render_attitude_advisor
  spriteOffsets: {
    attitudeHeader: 0x55c,  // attitude advisor section header/title text
    govtTypeLabel:  0x670,  // government type label for attitude display
  },
};

// =============================================================================
// === Diplomacy Request Event (MP) ===
// =============================================================================
// Source: FUN_004308ae (3218 bytes) @ block_00430000.c
// Handles diplomacy initiation between players.
// =============================================================================

export const DIPLOMACY_REQUEST_EVENT = {
  sourceAddr: '0x004308AE',
  functionSize: 3218,

  // Network event 0x3d: diplomacy request sound/notification
  // Sent via FUN_00511880(0x3d, targetPlayer, 0, 0, civId, 0)
  // Only triggered when BOTH players are human AND MP mode > 2:
  //   condition1: (1 << param_1) & DAT_00655b0b != 0  (requesting civ is human)
  //   condition2: (1 << target)  & DAT_00655b0b != 0  (target civ is human)
  //   condition3: DAT_00655b02 > 2                     (network MP mode)
  networkEvent: {
    eventId: 0x3D,
    dispatchFunction: 'FUN_00511880',
    networkMsgType: 0x6A,       // FUN_00511880 wraps this as net_send_message(0x6a, ...)
    condition: 'Both civs human (DAT_00655b0b bits) AND DAT_00655b02 > 2 (network MP)',
    payload: 'diplomacy request with PARLEYWAITING dialog',
    sourceAddr: '0x004308AE line ~464',
  },
};
