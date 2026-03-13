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
//   { type:"PING" }
//   { type:"ACTION", roomId, action:{ type:"MOVE_UNIT"|... } }   // future
//   { type:"UPLOAD_SAV", roomId, data:<base64> }                  // future
//
// Protocol (server → client):
//   { type:"WELCOME", roomId, clientId, playerIndex, sessionId }
//   { type:"ROOM", roomId, clients, spectators, name, started, ready }
//   { type:"ROOM_LIST", rooms, users, yourClientId, sessionId }
//   { type:"STATE", roomId, version, state }                      // future: filtered per civ
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
import { filterStateForCiv } from "../engine/visibility.js";
import { createAccessors, tileToBytes } from "../engine/state.js";

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
    wsOpen: slot ? (slot.ws && slot.ws.readyState === 1) : false,
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

        // Check start condition: ≥2 occupied seats + all ready
        const occupied = [];
        for (let i = 0; i < room.seats.length; i++) {
          if (room.seats[i]) occupied.push(i);
        }
        const allReady = occupied.length >= 2 && occupied.every(i => room.ready[i]);

        if (allReady) {
          room.started = true;
          // Save sessions for all seated players (for reconnect)
          for (let i = 0; i < room.seats.length; i++) {
            const seat = room.seats[i];
            if (!seat) continue;
            const ci = clientInfo.get(seat.ws);
            if (ci && ci.sessionId) {
              sessions.set(ci.sessionId, { roomId, seatIndex: i, name: ci.name });
            }
          }

          // Initialize game
          startGame(roomId, room, occupied);
        }

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

        // Broadcast filtered state to each client
        sendGameStateToAll(actionRoomId, room);

        // Clear one-shot notifications after broadcast
        delete room.gameState.discoveredAdvance;
        delete room.gameState.combatResult;
        delete room.gameState.cityFounded;
        delete room.gameState.goodyHutResult;
        delete room.gameState.turnEvents;
        break;
      }

      case "RESTART_GAME": {
        const restartRoomId = info.roomId;
        if (!restartRoomId) break;
        const restartRoom = rooms.get(restartRoomId);
        if (!restartRoom) break;

        // Map size presets (doubled-X: display width = mw/2)
        const sizes = {
          small:  { width: 100, height: 50 },
          normal: { width: 160, height: 80 },
          large:  { width: 240, height: 120 },
        };
        const sz = sizes[msg.mapSize] || sizes.normal;

        // Re-build seat list from current seats
        const restartSeats = [];
        for (let i = 0; i < 8; i++) {
          if (restartRoom.seats[i]) restartSeats.push({ seatIndex: i, name: restartRoom.seats[i].name || `Player ${i}` });
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
        sendGameStartToAll(restartRoomId, restartRoom);
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
// Game initialization
// -----------------------------------------------------------------------------

function startGame(roomId, room, occupiedSeats) {
  const seatList = occupiedSeats.map(i => ({
    seatIndex: i,
    name: room.seats[i]?.name || `Player ${i}`,
  }));

  // Generate a new map for multiplayer
  startNewGame(roomId, room, seatList);

  // Build civNames lookup from merged civs array
  const civNames = {};
  if (room.gameState.civs) {
    for (let i = 0; i < 8; i++) civNames[i] = room.gameState.civs[i]?.name || `Civ ${i}`;
  }
  room.gameState.civNames = civNames;

  // Send GAME_START to each client with their filtered state
  sendGameStartToAll(roomId, room);
}

function startNewGame(roomId, room, seatList) {
  const mapResult = generateMap({ width: 100, height: 50 });
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
