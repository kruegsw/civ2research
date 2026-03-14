// server.js — Civ2 Game Server
// -----------------------------------------------------------------------------
// Responsibilities:
//   1) HTTP server:
//        - GET /health → "ok"
//        - serves static client files from ../public
//        - serves shared engine modules from ../engine via /engine/*
//        - serves saves/ directory listing as JSON
//
//   2) WebSocket server:
//        - rooms (multiple games in parallel)
//        - per-room authoritative state (the ONLY source of truth)
//        - seat assignment (playerIndex 0..7) or spectator (null)
//        - ready system: all seated players must ready up to start
//        - session persistence: reconnect reclaims seat during active game
//        - activity tracking: lastActivity per seat for idle detection
//
// Protocol (client → server):
//   { type:"JOIN", roomId, name?, sessionId? }
//   { type:"LEAVE_ROOM" }
//   { type:"CREATE_ROOM", name? }
//   { type:"READY" }
//   { type:"ADD_AI", seat? }            — room creator adds AI to seat (or first open)
//   { type:"REMOVE_AI", seat }          — room creator removes AI from seat
//   { type:"PING" }
//   { type:"SAY", text }
//   { type:"ACTION", roomId, action:{ type:"MOVE_UNIT"|... } }   // future
//   { type:"UPLOAD_SAV", roomId, data:<base64> }                  // future
//
// Protocol (server → client):
//   { type:"WELCOME", roomId, clientId, playerIndex, sessionId }
//   { type:"ROOM", roomId, clients, spectators, name, started, ready }
//   { type:"ROOM_LIST", rooms, users, yourClientId, sessionId }
//   { type:"STATE", roomId, version, state }                      // future: filtered per civ
//   { type:"MSG", roomId, from, name, seat, text, ts, isEvent? }
//   { type:"CHAT_HISTORY", roomId, messages }
//   { type:"REJECTED", roomId, reason }
//   { type:"ERROR", message }
// -----------------------------------------------------------------------------

import http from "http";
import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Civ2Parser } from "../engine/parser.js";
import { initFromSav, initNewGame } from "../engine/init.js";
import { generateMap } from "../engine/mapgen.js";
import { applyAction } from "../engine/reducer.js";
import { filterStateForCiv, computeLOS } from "../engine/visibility.js";
import { createAccessors, tileToBytes } from "../engine/state.js";
import { UNIT_NAMES, UNIT_ATK, UNIT_DEF, UNIT_HP, TERRAIN_DEFENSE, TERRAIN_NAMES, IMPROVE_NAMES, WONDER_NAMES, ADVANCE_NAMES } from "../engine/defs.js";
import { runAiTurn } from "../engine/ai/index.js";

const PORT = Number(process.env.PORT || 8788);
const DEBUG = process.env.DEBUG === "1";

// -----------------------------------------------------------------------------
// Static hosting config
// -----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const ENGINE_DIR = path.join(__dirname, "..", "engine");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".mjs":  "text/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif":  "image/gif",
  ".webp": "image/webp",
  ".svg":  "image/svg+xml; charset=utf-8",
  ".ico":  "image/x-icon",
  ".sav":  "application/octet-stream",
  ".scn":  "application/octet-stream",
  ".net":  "application/octet-stream",
};

// Directory listing for saves/ (returns JSON array of filenames)
function handleSavesListing(res) {
  const savesDir = path.join(PUBLIC_DIR, "saves");
  fs.readdir(savesDir, (err, entries) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const savFiles = entries.filter(f => /\.(sav|scn|net)$/i.test(f));
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    res.end(JSON.stringify(savFiles));
  });
}

// Resolve a URL path to a file, checking both public/ and engine/
function resolveFile(urlPath) {
  let rel = urlPath === "/" ? "/index.html" : urlPath;
  rel = path.posix.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");

  // /engine/* → serve from engine/ directory
  if (rel.startsWith("/engine/")) {
    const engineRel = rel.slice("/engine/".length);
    const filePath = path.join(ENGINE_DIR, engineRel);
    if (!filePath.startsWith(ENGINE_DIR)) return null;
    return filePath;
  }

  // Everything else → serve from public/
  const filePath = path.join(PUBLIC_DIR, rel);
  if (!filePath.startsWith(PUBLIC_DIR)) return null;
  return filePath;
}

// -----------------------------------------------------------------------------
// HTTP server
// -----------------------------------------------------------------------------

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  if (DEBUG) console.log(`HTTP ${req.method} ${urlPath}`);

  if (urlPath === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok");
    return;
  }

  if (urlPath === "/saves/" || urlPath === "/saves") {
    handleSavesListing(res);
    return;
  }

  const filePath = resolveFile(urlPath);
  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

// -----------------------------------------------------------------------------
// WebSocket server
// -----------------------------------------------------------------------------

const wss = new WebSocketServer({ server });

let nextClientId = 1;
const clientInfo = new Map();   // ws → { clientId, name, roomId, playerIndex, sessionId, lastActivity }
const rooms = new Map();        // roomId → { clients, seats, ready, state, name, started, ... }
const sessions = new Map();     // sessionId → { roomId, seatIndex, name }

function makeSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Remove a client from their current room (preserves seat in started games)
function leaveCurrentRoom(ws, info) {
  if (!info.roomId) return;
  const room = rooms.get(info.roomId);
  if (!room) { info.roomId = null; info.playerIndex = null; return; }

  room.clients.delete(ws);
  if (room.started && info.playerIndex != null) {
    // Active game: preserve seat for reconnect (session already saved)
    broadcastToRoom(info.roomId, roomRoster(info.roomId));
  } else {
    // Pre-game: free seat
    if (info.playerIndex != null && room.seats[info.playerIndex]?.clientId === info.clientId) {
      room.seats[info.playerIndex] = null;
      room.ready = room.ready.map(() => false);
      // Cancel countdown if one is active
      cancelCountdown(info.roomId, room);
    }
    if (room.clients.size === 0) {
      rooms.delete(info.roomId);
    } else {
      broadcastToRoom(info.roomId, roomRoster(info.roomId));
    }
  }
  info.roomId = null;
  info.playerIndex = null;
}

function broadcastToRoom(roomId, msg) {
  const room = rooms.get(roomId);
  if (!room) return;
  const str = JSON.stringify(msg);
  for (const ws of room.clients) {
    if (ws.readyState === 1) ws.send(str);
  }
}

function roomRoster(roomId) {
  const room = rooms.get(roomId);
  if (!room) return null;
  const clients = room.seats.map((slot, i) => ({
    seat: i,
    clientId: slot?.clientId ?? null,
    name: slot?.name ?? null,
    occupied: !!slot,
    ai: slot?.ai ?? false,
    wsOpen: slot ? (slot.ai || (slot.ws && slot.ws.readyState === 1)) : false,
    lastActivity: slot?.lastActivity ?? null,
    ready: room.ready[i],
  }));
  const spectators = [];
  for (const ws of room.clients) {
    const info = clientInfo.get(ws);
    if (info && info.playerIndex == null) {
      spectators.push({
        clientId: info.clientId,
        name: info.name,
        wsOpen: ws.readyState === 1,
      });
    }
  }
  return {
    type: "ROOM",
    roomId,
    clients,
    spectators,
    name: room.name,
    started: room.started,
    ready: room.ready,
  };
}

function broadcastRoomList() {
  const roomList = [];
  for (const [id, room] of rooms) {
    roomList.push({
      roomId: id,
      name: room.name,
      started: room.started,
      seatCount: room.seats.filter(s => s).length,
      spectatorCount: [...room.clients].filter(ws => {
        const info = clientInfo.get(ws);
        return info && info.playerIndex == null;
      }).length,
    });
  }
  const users = [];
  for (const [, info] of clientInfo) {
    users.push({ clientId: info.clientId, name: info.name });
  }
  // Send personalized ROOM_LIST with each client's sessionId
  for (const [ws, info] of clientInfo) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({
        type: "ROOM_LIST", rooms: roomList, users,
        yourClientId: info.clientId, sessionId: info.sessionId,
      }));
    }
  }
}

function cancelCountdown(roomId, room) {
  if (!room.countdownTimer) return;
  clearInterval(room.countdownTimer);
  room.countdownTimer = null;
  room.countdownSeconds = null;
  broadcastToRoom(roomId, { type: "COUNTDOWN_CANCEL" });
}

wss.on("connection", (ws) => {
  const clientId = nextClientId++;
  const sessionId = makeSessionId();
  clientInfo.set(ws, {
    clientId, name: `Player ${clientId}`,
    roomId: null, playerIndex: null,
    sessionId, lastActivity: Date.now(),
  });

  // Send initial room list with session ID
  const roomList = [];
  for (const [id, room] of rooms) {
    roomList.push({ roomId: id, name: room.name, started: room.started,
      seatCount: room.seats.filter(s => s).length });
  }
  ws.send(JSON.stringify({
    type: "ROOM_LIST", rooms: roomList, users: [],
    yourClientId: clientId, sessionId,
  }));

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch {
      ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON" }));
      return;
    }

    const info = clientInfo.get(ws);
    if (!info) return;

    // Update activity timestamp on every message
    info.lastActivity = Date.now();
    if (info.roomId && info.playerIndex != null) {
      const room = rooms.get(info.roomId);
      if (room && room.seats[info.playerIndex]) {
        room.seats[info.playerIndex].lastActivity = Date.now();
      }
    }

    if (DEBUG) console.log(`WS [${info.clientId}] ${msg.type}`, msg);

    switch (msg.type) {

      case "IDENTIFY": {
        if (msg.name) {
          info.name = msg.name;
          // Update seat name and broadcast so other clients see the change
          if (info.roomId && info.playerIndex != null) {
            const room = rooms.get(info.roomId);
            if (room && room.seats[info.playerIndex]) {
              room.seats[info.playerIndex].name = msg.name;
              broadcastToRoom(info.roomId, roomRoster(info.roomId));
            }
          }
          broadcastRoomList();
        }
        break;
      }

      case "CREATE_ROOM": {
        if (msg.playerName) info.name = msg.playerName;
        leaveCurrentRoom(ws, info);
        const roomId = `room_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const room = {
          clients: new Set([ws]),
          seats: [null, null, null, null, null, null, null, null],  // 8 civ slots
          ready: [false, false, false, false, false, false, false, false],
          state: null,        // game state set when .sav is loaded
          version: 0,
          name: msg.name || `Game ${roomId.slice(-4)}`,
          createdBy: info.clientId,
          started: false,
        };
        // Creator takes seat 0
        room.seats[0] = { ws, clientId: info.clientId, name: info.name, lastActivity: Date.now() };
        rooms.set(roomId, room);
        info.roomId = roomId;
        info.playerIndex = 0;

        ws.send(JSON.stringify({ type: "WELCOME", roomId, clientId: info.clientId, playerIndex: 0, sessionId: info.sessionId }));
        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "JOIN": {
        const { roomId, name, sessionId: msgSessionId } = msg;
        if (name) info.name = name;

        // Leave current room if switching (preserves seat in started games)
        if (info.roomId && info.roomId !== roomId) {
          leaveCurrentRoom(ws, info);
        }

        const room = rooms.get(roomId);
        if (!room) {
          ws.send(JSON.stringify({ type: "ERROR", message: `Room ${roomId} not found` }));
          break;
        }

        // Use client's sessionId or the one from the message
        const sessId = msgSessionId || info.sessionId;

        // Session reclaim: if sessionId maps to a seat in this room, reclaim it
        if (sessId && sessions.has(sessId)) {
          const sess = sessions.get(sessId);
          if (sess.roomId === roomId && typeof sess.seatIndex === "number") {
            const occupant = room.seats[sess.seatIndex];
            if (occupant) {
              // Close stale ws if it's a different connection still lingering
              if (occupant.ws && occupant.ws !== ws && occupant.ws.readyState === 1) {
                console.log(`[session] Closing stale ws for seat ${sess.seatIndex} (client ${occupant.clientId})`);
                try { occupant.ws.close(); } catch {}
              }
              // Reclaim the seat
              console.log(`[session] Reclaiming seat ${sess.seatIndex} for client ${info.clientId} (session ${sessId})`);
              room.seats[sess.seatIndex] = { ws, clientId: info.clientId, name: info.name || sess.name, lastActivity: Date.now() };
              info.playerIndex = sess.seatIndex;
              // Re-register session under new sessionId so future reconnects work
              if (info.sessionId !== sessId) {
                sessions.delete(sessId);
                sessions.set(info.sessionId, { roomId, seatIndex: sess.seatIndex, name: info.name || sess.name });
              }
            } else {
              console.log(`[session] Seat ${sess.seatIndex} is empty, cannot reclaim (session ${sessId})`);
            }
          } else {
            console.log(`[session] Session ${sessId} not for room ${roomId} (sess.roomId=${sess?.roomId})`);
          }
        } else if (sessId) {
          console.log(`[session] Unknown session ${sessId} — no reclaim`);
        }

        // Find first open seat (if not reclaimed above) — only during pre-game
        if (info.playerIndex == null && !room.started) {
          for (let i = 0; i < room.seats.length; i++) {
            if (!room.seats[i]) {
              room.seats[i] = { ws, clientId: info.clientId, name: info.name, lastActivity: Date.now() };
              info.playerIndex = i;
              break;
            }
          }
        }
        // If game started and no session reclaim, join as spectator (playerIndex stays null)

        room.clients.add(ws);
        info.roomId = roomId;

        ws.send(JSON.stringify({
          type: "WELCOME", roomId, clientId: info.clientId, playerIndex: info.playerIndex,
          sessionId: info.sessionId,
        }));
        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();

        // If game already started, send current state to reconnecting player
        if (room.started && room.gameState && room.mapBase) {
          const civSlot = room.gameState.seatCivMap?.[info.playerIndex] ?? null;
          const statePayload = buildStatePayload(room, civSlot);
          ws.send(JSON.stringify({
            type: "GAME_START",
            roomId,
            myCivSlot: civSlot,
            seatCivMap: room.gameState.seatCivMap,
            humanPlayers: room.gameState.humanPlayers,
            mapBase: {
              mw: room.mapBase.mw,
              mh: room.mapBase.mh,
              mapShape: room.mapBase.mapShape,
              mapSeed: room.mapBase.mapSeed,
              tileData: room.mapBase.tileData.map(tileToBytes),
              knownImprovements: room.mapBase.knownImprovements,
            },
            state: statePayload,
          }));
        }

        // Send chat history to joining client
        if (room.chatHistory && room.chatHistory.length > 0) {
          ws.send(JSON.stringify({
            type: 'CHAT_HISTORY',
            roomId,
            messages: room.chatHistory,
          }));
        }
        break;
      }

      case "LEAVE_ROOM": {
        if (!info.roomId) break;
        leaveCurrentRoom(ws, info);
        broadcastRoomList();
        break;
      }

      case "READY": {
        const roomId = info.roomId;
        if (!roomId) break;
        const room = rooms.get(roomId);
        if (!room || room.started) break;
        if (info.playerIndex == null) break;  // spectators can't ready

        room.ready[info.playerIndex] = !room.ready[info.playerIndex];

        // Check start condition: ≥2 occupied seats, ≥1 human, all humans ready
        // AI seats are always considered ready.
        const occupied = [];
        let humanCount = 0;
        for (let i = 0; i < room.seats.length; i++) {
          if (room.seats[i]) {
            occupied.push(i);
            if (!room.seats[i].ai) humanCount++;
          }
        }
        const allReady = occupied.length >= 2 && humanCount >= 1 &&
          occupied.every(i => room.seats[i].ai || room.ready[i]);

        if (allReady && !room.countdownTimer) {
          // Start countdown instead of immediately starting
          room.countdownSeconds = 5;
          broadcastToRoom(roomId, { type: "COUNTDOWN", seconds: 5 });
          room.countdownTimer = setInterval(() => {
            room.countdownSeconds--;
            if (room.countdownSeconds > 0) {
              broadcastToRoom(roomId, { type: "COUNTDOWN", seconds: room.countdownSeconds });
            } else {
              // Countdown reached 0 — start the game
              clearInterval(room.countdownTimer);
              room.countdownTimer = null;
              room.countdownSeconds = null;
              broadcastToRoom(roomId, { type: "COUNTDOWN", seconds: 0 });

              room.started = true;
              // Save sessions for all seated human players (for reconnect)
              for (let i = 0; i < room.seats.length; i++) {
                const seat = room.seats[i];
                if (!seat || seat.ai) continue;
                const ci = clientInfo.get(seat.ws);
                if (ci && ci.sessionId) {
                  sessions.set(ci.sessionId, { roomId, seatIndex: i, name: ci.name });
                }
              }

              // Re-gather occupied seats (may have changed)
              const finalOccupied = [];
              for (let i = 0; i < room.seats.length; i++) {
                if (room.seats[i]) finalOccupied.push(i);
              }

              // Initialize game
              startGame(roomId, room, finalOccupied);
              broadcastRoomList();
            }
          }, 1000);
        } else if (!allReady && room.countdownTimer) {
          // Someone un-readied during countdown — cancel it
          cancelCountdown(roomId, room);
        }

        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "ADD_AI": {
        const roomId = info.roomId;
        if (!roomId) break;
        const room = rooms.get(roomId);
        if (!room || room.started) break;

        // Only room creator (seat 0) can add AI
        if (info.playerIndex !== 0) {
          ws.send(JSON.stringify({ type: "ERROR", message: "Only the room creator can add AI players" }));
          break;
        }

        // Find target seat: specified seat or first open
        let targetSeat = typeof msg.seat === "number" ? msg.seat : -1;
        if (targetSeat >= 0 && targetSeat < 8) {
          if (room.seats[targetSeat]) {
            ws.send(JSON.stringify({ type: "ERROR", message: `Seat ${targetSeat} is already occupied` }));
            break;
          }
        } else {
          // Find first open seat
          targetSeat = -1;
          for (let i = 0; i < room.seats.length; i++) {
            if (!room.seats[i]) { targetSeat = i; break; }
          }
          if (targetSeat < 0) {
            ws.send(JSON.stringify({ type: "ERROR", message: "No open seats" }));
            break;
          }
        }

        room.seats[targetSeat] = { ai: true, name: "Computer", clientId: null, ws: null, lastActivity: Date.now() };
        // AI is always ready
        room.ready[targetSeat] = true;

        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "REMOVE_AI": {
        const roomId = info.roomId;
        if (!roomId) break;
        const room = rooms.get(roomId);
        if (!room || room.started) break;

        // Only room creator (seat 0) can remove AI
        if (info.playerIndex !== 0) {
          ws.send(JSON.stringify({ type: "ERROR", message: "Only the room creator can remove AI players" }));
          break;
        }

        const removeSeat = msg.seat;
        if (typeof removeSeat !== "number" || removeSeat < 0 || removeSeat >= 8) {
          ws.send(JSON.stringify({ type: "ERROR", message: "Invalid seat number" }));
          break;
        }

        if (!room.seats[removeSeat] || !room.seats[removeSeat].ai) {
          ws.send(JSON.stringify({ type: "ERROR", message: "Seat is not an AI player" }));
          break;
        }

        room.seats[removeSeat] = null;
        room.ready[removeSeat] = false;
        // Cancel countdown if conditions no longer met
        cancelCountdown(roomId, room);

        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "PING": {
        // Activity already updated at top of message handler.
        // Broadcast room roster so other clients see fresh lastActivity.
        if (info.roomId) {
          broadcastToRoom(info.roomId, roomRoster(info.roomId));
        }
        break;
      }

      case "ACTION": {
        const actionRoomId = info.roomId;
        if (!actionRoomId) break;
        const room = rooms.get(actionRoomId);
        if (!room || !room.gameState || !room.mapBase) {
          ws.send(JSON.stringify({ type: "REJECTED", roomId: actionRoomId, reason: "Game not started" }));
          break;
        }
        if (info.playerIndex == null) {
          ws.send(JSON.stringify({ type: "REJECTED", roomId: actionRoomId, reason: "Spectators cannot act" }));
          break;
        }

        // Map seat to civ slot
        const civSlot = room.gameState.seatCivMap?.[info.playerIndex];
        if (civSlot == null) {
          ws.send(JSON.stringify({ type: "REJECTED", roomId: actionRoomId, reason: "No civ assigned" }));
          break;
        }

        // Apply action through reducer (validates internally)
        const next = applyAction(room.gameState, room.mapBase, msg.action, civSlot);
        if (next === room.gameState) {
          ws.send(JSON.stringify({ type: "REJECTED", roomId: actionRoomId, reason: "Invalid action" }));
          break;
        }

        room.gameState = next;

        // Emit structured GAME_LOG messages for combat, turn events, tech, etc.
        emitGameLogs(actionRoomId, room);

        // Clear one-shot notifications after broadcast
        clearOneshotNotifications(room);

        // ── AI turn loop: auto-process consecutive AI civs after END_TURN ──
        if (msg.action.type === 'END_TURN') {
          processAiTurns(actionRoomId, room);
        }

        // Broadcast filtered state to each client (after all AI turns resolved)
        sendGameStateToAll(actionRoomId, room);
        break;
      }

      case "RESTART_GAME": {
        const restartRoomId = info.roomId;
        if (!restartRoomId) break;
        const restartRoom = rooms.get(restartRoomId);
        if (!restartRoom) break;

        // Parse map size: "WxH" display dimensions → doubled-X internal
        let sz;
        const m = String(msg.mapSize).match(/^(\d+)\s*[xX×]\s*(\d+)$/);
        if (m) {
          const w = Math.max(10, Math.min(300, parseInt(m[1])));
          const h = Math.max(10, Math.min(300, parseInt(m[2])));
          sz = { width: w * 2, height: h };
        } else {
          sz = { width: 40, height: 20 }; // default: Tiny (20×20)
        }

        // Re-build seat list from current seats
        const restartSeats = [];
        for (let i = 0; i < 8; i++) {
          if (restartRoom.seats[i]) restartSeats.push({ seatIndex: i, name: restartRoom.seats[i].name || `Player ${i}`, ai: restartRoom.seats[i].ai || false });
        }

        const mapResult = generateMap(sz);
        const { mapBase, gameState } = initNewGame(mapResult, restartSeats);
        restartRoom.mapBase = mapBase;
        restartRoom.gameState = gameState;

        // Build civNames
        const restartCivNames = {};
        if (gameState.civs) {
          for (let i = 0; i < 8; i++) restartCivNames[i] = gameState.civs[i]?.name || `Civ ${i}`;
        }
        restartRoom.gameState.civNames = restartCivNames;

        console.log(`[game] Room ${restartRoomId}: RESTART ${msg.mapSize} (${sz.width}×${sz.height}), ${restartSeats.length} players`);
        // Process AI turns if the initial activeCiv is AI-controlled
        processAiTurns(restartRoomId, restartRoom);
        sendGameStartToAll(restartRoomId, restartRoom);
        break;
      }

      case "SAY": {
        const ci = clientInfo.get(ws);
        if (!ci || !ci.roomId) break;
        const sayRoom = rooms.get(ci.roomId);
        if (!sayRoom) break;
        const text = (msg.text || '').trim().slice(0, 200);
        if (!text) break;

        const chatMsg = {
          from: ci.sessionId,
          name: ci.name || `Player ${ci.playerIndex}`,
          seat: ci.playerIndex,
          text,
          ts: Date.now(),
        };

        if (!sayRoom.chatHistory) sayRoom.chatHistory = [];
        sayRoom.chatHistory.push(chatMsg);
        if (sayRoom.chatHistory.length > 100) sayRoom.chatHistory.shift();

        // Broadcast MSG to all clients in room
        for (const client of sayRoom.clients) {
          if (client.readyState === 1) {
            client.send(JSON.stringify({ type: 'MSG', roomId: ci.roomId, ...chatMsg }));
          }
        }
        break;
      }

      default:
        ws.send(JSON.stringify({ type: "ERROR", message: `Unknown type: ${msg.type}` }));
    }
  });

  ws.on("close", () => {
    const info = clientInfo.get(ws);
    if (info) {
      leaveCurrentRoom(ws, info);
    }
    clientInfo.delete(ws);
    broadcastRoomList();
  });
});

// -----------------------------------------------------------------------------
// AI turn processing
// -----------------------------------------------------------------------------

/**
 * Process AI turns until the active civ is human (or we've looped all civs).
 * Called after a human END_TURN advances activeCiv to a potentially AI civ.
 *
 * Safety: max 7 iterations (one full cycle through all civ slots).
 */
function processAiTurns(roomId, room) {
  const humanPlayers = room.gameState.humanPlayers || 0;
  const MAX_ITERATIONS = 7; // prevent infinite loops

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    const activeCiv = room.gameState.turn.activeCiv;

    // If this civ is human, stop — it's their turn now
    if (humanPlayers & (1 << activeCiv)) break;

    // If civ is not alive, skip (END_TURN should have already skipped, but guard)
    if (!(room.gameState.civsAlive & (1 << activeCiv))) break;

    // Run AI for this civ
    console.log(`[ai] Room ${roomId}: running AI turn for civ ${activeCiv} (${room.gameState.civNames?.[activeCiv] || 'unknown'})`);

    const aiActions = runAiTurn(room.gameState, room.mapBase, activeCiv);

    // Apply each AI action through the reducer
    for (const action of aiActions) {
      const result = applyAction(room.gameState, room.mapBase, action, activeCiv);
      if (result !== room.gameState) {
        room.gameState = result;
        // Emit logs for AI actions (combat, events, etc.)
        emitGameLogs(roomId, room);
        clearOneshotNotifications(room);
      }
    }

    // End the AI civ's turn
    const endResult = applyAction(room.gameState, room.mapBase, { type: 'END_TURN' }, activeCiv);
    if (endResult !== room.gameState) {
      room.gameState = endResult;
      emitGameLogs(roomId, room);
      clearOneshotNotifications(room);
    } else {
      // END_TURN was rejected — this shouldn't happen, but break to avoid infinite loop
      console.warn(`[ai] Room ${roomId}: END_TURN rejected for AI civ ${activeCiv}, breaking loop`);
      break;
    }
  }
}

/**
 * Clear one-shot notification fields from game state after they've been emitted.
 */
function clearOneshotNotifications(room) {
  delete room.gameState.discoveredAdvance;
  delete room.gameState.combatResult;
  delete room.gameState.cityFounded;
  delete room.gameState.goodyHutResult;
  delete room.gameState.turnEvents;
}

// -----------------------------------------------------------------------------
// Game Log broadcast
// -----------------------------------------------------------------------------

/**
 * Broadcast a GAME_LOG message to all clients in a room.
 * Also stores it in chatHistory for reconnect replay.
 */
function broadcastGameLog(roomId, room, category, text, turn) {
  sendGameLog(room, category, text, turn);
}

/** Send a game log to all clients (or a filtered subset). */
function sendGameLog(room, category, text, turn, civSlots) {
  const msg = {
    type: 'GAME_LOG',
    category,
    text,
    turn: turn ?? 0,
    ts: Date.now(),
  };
  if (!room.chatHistory) room.chatHistory = [];
  room.chatHistory.push(msg);
  if (room.chatHistory.length > 200) room.chatHistory.shift();
  const json = JSON.stringify(msg);

  if (!civSlots) {
    // Broadcast to all
    for (const client of room.clients) {
      if (client.readyState === 1) client.send(json);
    }
  } else {
    // Send only to clients whose civ is in the allowed set
    const allowedSet = new Set(civSlots);
    for (const client of room.clients) {
      const ci = clientInfo.get(client);
      if (!ci || client.readyState !== 1) continue;
      if (ci.playerIndex == null) continue; // skip spectators for filtered logs
      const civSlot = room.gameState.seatCivMap?.[ci.playerIndex];
      if (civSlot != null && allowedSet.has(civSlot)) client.send(json);
    }
  }
}

/**
 * Build a detailed combat log string from the enriched combatResult.
 */
function formatCombatLog(cr, gs) {
  const atkName = UNIT_NAMES[cr.attacker] || `Unit ${cr.attacker}`;
  const defName = UNIT_NAMES[cr.defender] || `Unit ${cr.defender}`;
  const atkCivName = gs.civNames?.[cr.atkOwner] || `Civ ${cr.atkOwner}`;
  const defCivName = gs.civNames?.[cr.defOwner] || `Civ ${cr.defOwner}`;

  const atkBaseAtk = UNIT_ATK[cr.attacker] || 1;
  const defBaseDef = UNIT_DEF[cr.defender] || 1;
  const defMaxHpUnits = UNIT_HP[cr.defender] || 1;
  const atkMaxHpUnits = UNIT_HP[cr.attacker] || 1;

  // Build modifier descriptions for defender
  const defMods = [];
  const terrainMul = TERRAIN_DEFENSE[cr.defTerrain] ?? 2;
  const terrainName = TERRAIN_NAMES[cr.defTerrain] || 'Unknown';
  if (terrainMul > 2) defMods.push(`${terrainName} x${terrainMul / 2}`);
  if (cr.defVeteran) defMods.push('vet +50%');
  if (cr.defFortified) defMods.push('fort +50%');
  if (cr.defCityHasWalls) defMods.push('walls x3');
  if (cr.defHasFortress && !cr.defInCity) defMods.push('fortress x2');
  if (cr.defOnRiver && !cr.defInCity) defMods.push('river +50%');
  if (cr.defInCity && defMods.every(m => !m.startsWith('walls'))) defMods.push('in city');

  // Build modifier descriptions for attacker
  const atkMods = [];
  if (cr.atkVeteran) atkMods.push('vet +50%');

  const atkModStr = atkMods.length ? ` [${atkMods.join(', ')}]` : '';
  const defModStr = defMods.length ? ` [${defMods.join(', ')}]` : '';

  // HP info
  const atkStartHpDisp = cr.atkStartHp / 10;
  const defStartHpDisp = cr.defStartHp / 10;

  // Rounds summary
  const roundParts = [];
  let atkHpTrack = cr.atkStartHp;
  let defHpTrack = cr.defStartHp;
  for (let i = 0; i < cr.rounds.length; i++) {
    if (cr.rounds[i]) {
      defHpTrack -= cr.atkFp * 10;
      roundParts.push('A hit');
    } else {
      atkHpTrack -= cr.defFp * 10;
      roundParts.push('D hit');
    }
  }
  const roundsStr = roundParts.length <= 12
    ? roundParts.join(', ')
    : roundParts.slice(0, 10).join(', ') + ` ... (${roundParts.length} rounds)`;

  // Result
  const winner = cr.type === 'atkWin' || cr.type === 'capture';
  const remainingHp = winner
    ? Math.max(0, atkHpTrack) / 10
    : Math.max(0, defHpTrack) / 10;
  const resultStr = winner
    ? `${atkName} wins (${remainingHp}/${atkMaxHpUnits} hp)`
    : `${defName} holds (${remainingHp}/${defMaxHpUnits} hp)`;

  let line = `[Combat] ${atkCivName} ${atkName} (att:${atkBaseAtk}${atkModStr} hp:${atkStartHpDisp}/${atkMaxHpUnits})`;
  line += ` vs ${defCivName} ${defName} (def:${defBaseDef}${defModStr} hp:${defStartHpDisp}/${defMaxHpUnits})`;
  line += ` => ${resultStr}. Rounds: ${roundsStr}`;

  if (cr.atkVeteranPromo) line += ` | ${atkName} promoted to veteran!`;
  if (cr.defVeteranPromo) line += ` | ${defName} promoted to veteran!`;
  if (cr.type === 'capture') line += ` | ${cr.cityName} captured!`;

  return line;
}

/**
 * Find which civs can see a specific tile (via LOS).
 * Returns array of civSlot numbers.
 */
function civsWithLOS(room, gx, gy) {
  const mb = room.mapBase;
  const gs = room.gameState;
  const result = [];
  for (let civ = 1; civ < 8; civ++) {
    const los = computeLOS({ mw: mb.mw, mh: mb.mh, mapShape: mb.mapShape, cities: gs.cities, units: gs.units }, civ);
    const idx = gy * mb.mw + ((gx % mb.mw + mb.mw) % mb.mw);
    if (los[idx]) result.push(civ);
  }
  return result;
}

/**
 * Emit GAME_LOG messages for combat and turn events after reducer applies an action.
 * Location-specific events are only sent to civs with line of sight.
 */
function emitGameLogs(roomId, room) {
  const gs = room.gameState;
  const turnNum = gs.turn?.number ?? 0;

  // ── Combat result ──
  if (gs.combatResult) {
    const cr = gs.combatResult;
    const combatText = formatCombatLog(cr, gs);
    // Send to civs that can see the combat location
    const gx = cr.targetGx ?? cr.defGx ?? cr.gx;
    const gy = cr.targetGy ?? cr.defGy ?? cr.gy;
    if (gx != null && gy != null) {
      const viewers = civsWithLOS(room, gx, gy);
      sendGameLog(room, 'combat', combatText, turnNum, viewers);
    } else {
      sendGameLog(room, 'combat', combatText, turnNum);
    }
  }

  // ── Turn events ──
  if (gs.turnEvents) {
    for (const ev of gs.turnEvents) {
      const { category, text } = formatTurnEventLog(ev, gs);
      sendGameLog(room, category, text, turnNum);
    }
  }

  // ── Discovered advance — only the discovering civ sees this ──
  if (gs.discoveredAdvance) {
    const da = gs.discoveredAdvance;
    const civName = gs.civNames?.[da.civSlot] || `Civ ${da.civSlot}`;
    const advName = ADVANCE_NAMES[da.advanceId] || `Advance ${da.advanceId}`;
    sendGameLog(room, 'tech', `${civName} discovered ${advName}`, turnNum, [da.civSlot]);
  }

  // ── City founded — only civs with LOS on the tile ──
  if (gs.cityFounded) {
    const cf = gs.cityFounded;
    const city = gs.cities[cf.cityIndex];
    if (city) {
      const gx = city.gx ?? city.cx;
      const gy = city.gy ?? city.cy;
      const viewers = civsWithLOS(room, gx, gy);
      sendGameLog(room, 'city', `${cf.name} founded`, turnNum, viewers);
    }
  }
}

/**
 * Categorize and format a turn event for the game log.
 * Returns { category, text }.
 */
function formatTurnEventLog(ev, gs) {
  const civName = (slot) => gs.civNames?.[slot] || `Civ ${slot}`;
  switch (ev.type) {
    case 'cityGrowth':
      return { category: 'city', text: `${ev.cityName} has grown to size ${ev.newSize}` };
    case 'famine':
      return { category: 'city', text: `Famine in ${ev.cityName}! Population decreased to ${ev.newSize}` };
    case 'productionComplete': {
      const item = ev.item;
      let name;
      if (item.type === 'unit') name = UNIT_NAMES[item.id] || 'Unit';
      else if (item.type === 'building') name = IMPROVE_NAMES[item.id] || 'Building';
      else if (item.type === 'wonder') name = (WONDER_NAMES[item.id - 39] || 'Wonder');
      else name = 'Item';
      const cat = item.type === 'wonder' ? 'tech' : 'city';
      const bang = item.type === 'wonder' ? '!' : '';
      return { category: cat, text: `${ev.cityName} has built ${name}${bang}` };
    }
    case 'needsAqueduct':
      return { category: 'city', text: `${ev.cityName} needs an Aqueduct to grow beyond size 8` };
    case 'needsSewer':
      return { category: 'city', text: `${ev.cityName} needs a Sewer System to grow beyond size 12` };
    case 'warDeclared':
      return { category: 'diplomacy', text: `${civName(ev.aggressor)} declared war on ${civName(ev.target)}!` };
    case 'treatyAccepted': {
      const treatyName = ev.treaty === 'peace' ? 'Peace Treaty' : 'Ceasefire';
      return { category: 'diplomacy', text: `${civName(ev.civA)} and ${civName(ev.civB)} signed ${treatyName}` };
    }
    case 'civEliminated':
      return { category: 'diplomacy', text: `The ${civName(ev.civSlot)} civilization has been destroyed!` };
    case 'unitDisbanded': {
      const uName = UNIT_NAMES[ev.unitType] || 'Unit';
      return { category: 'general', text: `${uName} disbanded in ${ev.cityName} (insufficient support)` };
    }
    case 'anarchyEnded': {
      const govtName = (ev.government || 'despotism').charAt(0).toUpperCase() + (ev.government || 'despotism').slice(1);
      return { category: 'diplomacy', text: `Order restored: government is now ${govtName}` };
    }
    case 'unitCrashed': {
      const uName = UNIT_NAMES[ev.unitType] || 'Unit';
      return { category: 'general', text: `${uName} ran out of fuel and crashed!` };
    }
    case 'freeAdvance': {
      const advName = ADVANCE_NAMES[ev.advanceId] || `Advance ${ev.advanceId}`;
      const source = ev.source || 'Free Advance';
      return { category: 'tech', text: `${source}: ${advName} discovered` };
    }
    case 'tradeEstablished':
      return { category: 'city', text: `Trade route: ${ev.homeCityName} -> ${ev.destCityName} (${ev.income} gold/turn)` };
    case 'tributePaid':
      return { category: 'diplomacy', text: `${civName(ev.from)} paid ${ev.amount} gold tribute to ${civName(ev.to)}` };
    case 'cityIncited':
      return { category: 'diplomacy', text: `${ev.cityName} revolts!` };
    case 'techStolen': {
      const advName = ADVANCE_NAMES[ev.advanceId] || `Advance ${ev.advanceId}`;
      return { category: 'diplomacy', text: `Technology stolen from ${civName(ev.from)}: ${advName}` };
    }
    case 'citySabotaged':
      return { category: 'diplomacy', text: `${ev.cityName} sabotaged!` };
    case 'unitBribed':
      return { category: 'diplomacy', text: `Unit bribed for ${ev.cost} gold` };
    case 'mapShared':
      return { category: 'diplomacy', text: `Maps exchanged with ${civName(ev.targetCiv)}` };
    case 'barbarianGold':
      return { category: 'general', text: `Barbarian defeated! ${ev.gold} gold recovered` };
    case 'barbarianLeaderCaptured':
      return { category: 'general', text: `Barbarian leader captured! ${ev.gold} gold ransom` };
    default:
      return { category: 'general', text: `Event: ${ev.type}` };
  }
}

// -----------------------------------------------------------------------------
// Chat / event formatting (legacy — kept for backward compat)
// -----------------------------------------------------------------------------

function formatTurnEvent(ev, gs) {
  const civName = (slot) => gs.civNames?.[slot] || `Civ ${slot}`;
  switch (ev.type) {
    case 'cityGrowth': return `${ev.cityName} has grown to size ${ev.newSize}`;
    case 'famine': return `Famine in ${ev.cityName}! Population: ${ev.newSize}`;
    case 'productionComplete': {
      const UNIT_NAMES = ['Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen','Musketeers','Fanatics','Partisans','Alpine Troops','Riflemen','Marines','Paratroopers','Mech. Inf.','Horsemen','Chariot','Elephant','Crusaders','Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery','Howitzer','Fighter','Bomber','Helicopter','Stealth Fighter','Stealth Bomber','Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer','Cruiser','AEGIS Cruiser','Battleship','Submarine','Carrier','Transport','Cruise Msl.','Nuclear Msl.','Diplomat','Spy','Caravan','Freight','Explorer'];
      const IMPROVE_NAMES = ['Nothing','Palace','Barracks','Granary','Temple','Marketplace','Library','Courthouse','City Walls','Aqueduct','Bank','Cathedral','University','Colosseum','Factory','Mfg. Plant','SDI Defense','Recycling Center','Power Plant','Hydro Plant','Nuclear Plant','Stock Exchange','Sewer System','Supermarket','Superhighways','Research Lab','SAM Missile Battery','Coastal Fortress','Solar Plant','Harbor','Offshore Platform','Airport','Police Station','Port Facility','Mass Transit','SS Structural','SS Component','SS Module','Capitalization'];
      const WONDER_NAMES = ['Pyramids','Hanging Gardens','Colossus','Lighthouse','Great Library','Oracle','Great Wall',"Sun Tzu's War Academy","King Richard's Crusade","Marco Polo's Embassy","Michelangelo's Chapel","Copernicus' Observatory","Magellan's Expedition","Shakespeare's Theatre","Leonardo's Workshop","J.S. Bach's Cathedral","Isaac Newton's College","Adam Smith's Trading Co.","Darwin's Voyage","Statue of Liberty","Apollo Program","United Nations","Hoover Dam","Women's Suffrage","Manhattan Project","SETI Program","Cure for Cancer","Eiffel Tower"];
      const item = ev.item;
      let name;
      if (item.type === 'unit') name = UNIT_NAMES[item.id] || 'Unit';
      else if (item.type === 'building') name = IMPROVE_NAMES[item.id] || 'Building';
      else if (item.type === 'wonder') name = WONDER_NAMES[item.id - 39] || 'Wonder';
      else name = 'Item';
      return `${ev.cityName} completed ${name}`;
    }
    case 'warDeclared': return `${civName(ev.aggressor)} declared war on ${civName(ev.target)}!`;
    case 'treatyAccepted': return `${civName(ev.civA)} and ${civName(ev.civB)} signed ${ev.treaty}`;
    case 'civEliminated': return `${civName(ev.civSlot)} has been destroyed!`;
    case 'unitDisbanded': return `Unit disbanded in ${ev.cityName} (insufficient support)`;
    case 'anarchyEnded': return `Order restored: ${ev.government}`;
    case 'needsAqueduct': return `${ev.cityName} needs an Aqueduct to grow`;
    case 'needsSewer': return `${ev.cityName} needs a Sewer System to grow`;
    case 'unitCrashed': return `Unit ran out of fuel and crashed!`;
    case 'tributePaid': return `${civName(ev.from)} paid ${ev.amount} gold tribute to ${civName(ev.to)}`;
    case 'cityIncited': return `${ev.cityName} revolts!`;
    case 'techStolen': return `Technology stolen from ${civName(ev.from)}!`;
    case 'citySabotaged': return `${ev.cityName} sabotaged!`;
    case 'unitBribed': return `Unit bribed for ${ev.cost} gold`;
    case 'tradeEstablished': return `Trade: ${ev.homeCityName} → ${ev.destCityName} (${ev.income}g/turn)`;
    case 'mapShared': return `Maps exchanged with ${civName(ev.targetCiv)}`;
    case 'freeAdvance': return `Discovered ${ev.source}: new technology!`;
    default: return `Event: ${ev.type}`;
  }
}

// -----------------------------------------------------------------------------
// Game initialization
// -----------------------------------------------------------------------------

function startGame(roomId, room, occupiedSeats) {
  const seatList = occupiedSeats.map(i => ({
    seatIndex: i,
    name: room.seats[i]?.name || `Player ${i}`,
    ai: room.seats[i]?.ai || false,
  }));

  // Generate a new map for multiplayer
  startNewGame(roomId, room, seatList);

  // Build civNames lookup from merged civs array
  const civNames = {};
  if (room.gameState.civs) {
    for (let i = 0; i < 8; i++) civNames[i] = room.gameState.civs[i]?.name || `Civ ${i}`;
  }
  room.gameState.civNames = civNames;

  // Process AI turns if the initial activeCiv is AI-controlled
  processAiTurns(roomId, room);

  // Send GAME_START to each client with their filtered state
  sendGameStartToAll(roomId, room);
}

function startNewGame(roomId, room, seatList) {
  const mapResult = generateMap({ width: 40, height: 20 });
  const { mapBase, gameState } = initNewGame(mapResult, seatList);
  room.mapBase = mapBase;
  room.gameState = gameState;
  console.log(`[game] Room ${roomId}: generated new map (${mapResult.mw}×${mapResult.mh})`);
}

function sendGameStartToAll(roomId, room) {
  for (const ws of room.clients) {
    if (ws.readyState !== 1) continue;
    const ci = clientInfo.get(ws);
    if (!ci) continue;

    const civSlot = room.gameState.seatCivMap?.[ci.playerIndex] ?? null;
    // Build the state payload
    const statePayload = buildStatePayload(room, civSlot);
    ws.send(JSON.stringify({
      type: "GAME_START",
      roomId,
      myCivSlot: civSlot,
      seatCivMap: room.gameState.seatCivMap,
      humanPlayers: room.gameState.humanPlayers,
      mapBase: {
        mw: room.mapBase.mw,
        mh: room.mapBase.mh,
        mapShape: room.mapBase.mapShape,
        mapSeed: room.mapBase.mapSeed,
        tileData: room.mapBase.tileData,
        knownImprovements: room.mapBase.knownImprovements,
      },
      state: statePayload,
    }));
  }
}

function sendGameStateToAll(roomId, room) {
  for (const ws of room.clients) {
    if (ws.readyState !== 1) continue;
    const ci = clientInfo.get(ws);
    if (!ci) continue;

    const civSlot = room.gameState.seatCivMap?.[ci.playerIndex] ?? null;
    const statePayload = buildStatePayload(room, civSlot);
    ws.send(JSON.stringify({
      type: "STATE",
      roomId,
      version: room.gameState.version,
      state: statePayload,
      // Send updated visibility data (tileData byte[4] mutated by reducer)
      tileVisibility: room.mapBase.tileData.map(t => t.visibility),
      // Send updated tile data (improvements + terrain, mutated by worker orders)
      tileImprovements: room.mapBase.tileData.map(t => {
        const imp = t.improvements;
        return (imp.city ? 0x02 : 0) | (imp.irrigation ? 0x04 : 0) | (imp.mining ? 0x08 : 0) |
               (imp.road ? 0x10 : 0) | (imp.railroad ? 0x20 : 0) | (imp.fortress ? 0x40 : 0) |
               (imp.pollution ? 0x80 : 0);
      }),
      tileTerrains: room.mapBase.tileData.map(t => t.terrain),
      tileGoodyHuts: room.mapBase.tileData.map(t => t.goodyHut ? 1 : 0),
      tileOwnership: room.mapBase.tileData.map(t => t.tileOwnership),
    }));
  }
}

function buildStatePayload(room, civSlot) {
  // For now, send full state (FOW filtering can be enabled later)
  // Convert non-JSON-serializable types (Sets → arrays)
  const gs = room.gameState;
  const cities = gs.cities.map(c => ({
    ...c,
    buildings: c.buildings instanceof Set ? [...c.buildings] : c.buildings,
  }));
  return {
    units: gs.units,
    cities,
    civs: gs.civs,
    civTechCounts: gs.civTechCounts,
    civTechs: gs.civTechs ? gs.civTechs.map(s => s instanceof Set ? [...s] : s) : null,
    civsAlive: gs.civsAlive,
    playerCiv: gs.playerCiv,
    mapRevealed: gs.mapRevealed,
    turn: gs.turn,
    version: gs.version,
    seatCivMap: gs.seatCivMap,
    humanPlayers: gs.humanPlayers,
    civNames: gs.civNames,
    unitBySaveIndex: gs.unitBySaveIndex,
    allUnits: gs.allUnits,
    tail: gs.tail,
    header: gs.header,
    gameState: gs.gameState,
    validation: gs.validation,
    wonders: gs.wonders,
    difficulty: gs.difficulty,
    barbarianActivity: gs.barbarianActivity,
    discoveredAdvance: gs.discoveredAdvance,
    combatResult: gs.combatResult,
    cityFounded: gs.cityFounded,
    goodyHutResult: gs.goodyHutResult,
    turnEvents: gs.turnEvents,
    treaties: gs.treaties,
    treatyProposals: gs.treatyProposals,
    tributeDemands: gs.tributeDemands,
  };
}

// -----------------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------------

server.listen(PORT, () => {
  console.log(`Civ2 server listening on http://localhost:${PORT}`);
  console.log(`  WebSocket: ws://localhost:${PORT}`);
});
