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
//        - turn enforcement (only activeCiv can act)
//
// Protocol (client → server):
//   { type:"JOIN", roomId, name?, sessionId? }
//   { type:"LEAVE_ROOM" }
//   { type:"CREATE_ROOM", name? }
//   { type:"ACTION", roomId, action:{ type:"MOVE_UNIT"|... } }   // future
//   { type:"UPLOAD_SAV", roomId, data:<base64> }                  // future
//
// Protocol (server → client):
//   { type:"WELCOME", roomId, clientId, playerIndex }
//   { type:"ROOM", roomId, clients, spectators, name, started }
//   { type:"ROOM_LIST", rooms, users, yourClientId }
//   { type:"STATE", roomId, version, state }                      // future: filtered per civ
//   { type:"REJECTED", roomId, reason }
//   { type:"ERROR", message }
// -----------------------------------------------------------------------------

import http from "http";
import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
const clientInfo = new Map();   // ws → { clientId, name, roomId, playerIndex }
const rooms = new Map();        // roomId → { clients, seats, state, name, started, ... }
const sessions = new Map();     // sessionId → { roomId, seatIndex, name }

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
    wsOpen: slot ? slot.ws.readyState === 1 : false,
    lastActivity: slot?.lastActivity ?? null,
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
  const str = JSON.stringify({ type: "ROOM_LIST", rooms: roomList, users });
  for (const [ws] of clientInfo) {
    if (ws.readyState === 1) ws.send(str);
  }
}

wss.on("connection", (ws) => {
  const clientId = nextClientId++;
  clientInfo.set(ws, { clientId, name: `Player ${clientId}`, roomId: null, playerIndex: null });

  // Send room list on connect
  const info = clientInfo.get(ws);
  const roomList = [];
  for (const [id, room] of rooms) {
    roomList.push({ roomId: id, name: room.name, started: room.started,
      seatCount: room.seats.filter(s => s).length });
  }
  ws.send(JSON.stringify({ type: "ROOM_LIST", rooms: roomList, users: [], yourClientId: clientId }));

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch {
      ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON" }));
      return;
    }

    const info = clientInfo.get(ws);
    if (!info) return;

    if (DEBUG) console.log(`WS [${info.clientId}] ${msg.type}`, msg);

    switch (msg.type) {

      case "CREATE_ROOM": {
        const roomId = `room_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const room = {
          clients: new Set([ws]),
          seats: [null, null, null, null, null, null, null, null],  // 8 civ slots
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
        if (msg.name) info.name = msg.name;

        ws.send(JSON.stringify({ type: "WELCOME", roomId, clientId: info.clientId, playerIndex: 0 }));
        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "JOIN": {
        const { roomId, name, sessionId } = msg;
        if (name) info.name = name;

        const room = rooms.get(roomId);
        if (!room) {
          ws.send(JSON.stringify({ type: "ERROR", message: `Room ${roomId} not found` }));
          break;
        }

        // Session reclaim: if sessionId maps to a seat in this room, reclaim it
        if (sessionId && sessions.has(sessionId)) {
          const sess = sessions.get(sessionId);
          if (sess.roomId === roomId && room.seats[sess.seatIndex] && !room.seats[sess.seatIndex].ws.readyState === 1) {
            room.seats[sess.seatIndex] = { ws, clientId: info.clientId, name: info.name, lastActivity: Date.now() };
            info.playerIndex = sess.seatIndex;
          }
        }

        // Find first open seat (if not reclaimed above)
        if (info.playerIndex == null) {
          for (let i = 0; i < room.seats.length; i++) {
            if (!room.seats[i]) {
              room.seats[i] = { ws, clientId: info.clientId, name: info.name, lastActivity: Date.now() };
              info.playerIndex = i;
              break;
            }
          }
        }
        // If no seat available, join as spectator (playerIndex stays null)

        room.clients.add(ws);
        info.roomId = roomId;

        ws.send(JSON.stringify({
          type: "WELCOME", roomId, clientId: info.clientId, playerIndex: info.playerIndex,
        }));
        broadcastToRoom(roomId, roomRoster(roomId));
        broadcastRoomList();
        break;
      }

      case "LEAVE_ROOM": {
        const roomId = info.roomId;
        if (!roomId) break;
        const room = rooms.get(roomId);
        if (room) {
          room.clients.delete(ws);
          // Free seat if seated
          if (info.playerIndex != null && room.seats[info.playerIndex]?.clientId === info.clientId) {
            room.seats[info.playerIndex] = null;
          }
          // Delete empty rooms
          if (room.clients.size === 0) {
            rooms.delete(roomId);
          } else {
            broadcastToRoom(roomId, roomRoster(roomId));
          }
        }
        info.roomId = null;
        info.playerIndex = null;
        broadcastRoomList();
        break;
      }

      // TODO: ACTION handler
      // case "ACTION": {
      //   const room = rooms.get(msg.roomId);
      //   if (!room || !room.state) break;
      //   if (info.playerIndex == null) {
      //     ws.send(JSON.stringify({ type: "REJECTED", roomId: msg.roomId, reason: "Spectators cannot act" }));
      //     break;
      //   }
      //   // Validate: is it this player's turn?
      //   // if (room.state.activeCiv !== info.playerIndex) { reject }
      //   // const next = applyAction(room.state, msg.action);
      //   // if (next === room.state) { reject — invalid action }
      //   // room.state = next;
      //   // room.version++;
      //   // For each client in room:
      //   //   const filtered = filterStateForCiv(room.state, clientPlayerIndex);
      //   //   client.send({ type: "STATE", roomId, version, state: filtered });
      //   break;
      // }

      default:
        ws.send(JSON.stringify({ type: "ERROR", message: `Unknown type: ${msg.type}` }));
    }
  });

  ws.on("close", () => {
    const info = clientInfo.get(ws);
    if (info && info.roomId) {
      const room = rooms.get(info.roomId);
      if (room) {
        room.clients.delete(ws);
        // Don't free seat during active game (allow reconnect)
        if (!room.started && info.playerIndex != null && room.seats[info.playerIndex]?.clientId === info.clientId) {
          room.seats[info.playerIndex] = null;
        }
        if (room.clients.size === 0 && !room.started) {
          rooms.delete(info.roomId);
        } else {
          broadcastToRoom(info.roomId, roomRoster(info.roomId));
        }
      }
    }
    clientInfo.delete(ws);
    broadcastRoomList();
  });
});

// -----------------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------------

server.listen(PORT, () => {
  console.log(`Civ2 server listening on http://localhost:${PORT}`);
  console.log(`  WebSocket: ws://localhost:${PORT}`);
});
