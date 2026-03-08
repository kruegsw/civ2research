// ═══════════════════════════════════════════════════════════════════
// transport.js — WebSocket client transport (client only)
//
// Adapted from Trevdor's transport.js. Game-agnostic connection
// management with auto-reconnect, session persistence, and mobile
// recovery. No game logic — just reliable message delivery.
// ═══════════════════════════════════════════════════════════════════

export function createTransport({
  url = "ws://localhost:8788",
  name = "player",
  sessionId = null,
  onMessage = () => {},
  onOpen = () => {},
  onClose = () => {},
  onError = () => {},
  reconnect = true,
  reconnectDelayMs = 500,
  connectTimeoutMs = 5000,
} = {}) {
  let ws = null;
  let closedByUser = false;
  let currentRoomId = null;
  let connectTimer = null;
  let generation = 0;    // increments on each connect(); stale sockets ignore their close handler
  let retryCount = 0;

  function connect() {
    const gen = ++generation;
    clearTimeout(connectTimer);

    // Abandon any previous socket without triggering its reconnect logic
    if (ws) {
      try { ws.close(); } catch {}
      ws = null;
    }

    ws = new WebSocket(url);

    // Kill and retry if still CONNECTING after timeout (mobile throttling)
    connectTimer = setTimeout(() => {
      if (gen === generation && ws && ws.readyState === 0) {
        try { ws.close(); } catch {}
      }
    }, connectTimeoutMs);

    ws.addEventListener("open", () => {
      if (gen !== generation) return;
      clearTimeout(connectTimer);
      retryCount = 0;
      // Auto-rejoin on reconnect (mid-game WS drop recovery)
      if (currentRoomId) {
        const joinMsg = { type: "JOIN", roomId: currentRoomId, name };
        if (sessionId) joinMsg.sessionId = sessionId;
        sendRaw(joinMsg);
      }
      onOpen();
    });

    ws.addEventListener("message", (e) => {
      if (gen !== generation) return;
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        onMessage({ type: "RAW", data: e.data });
        return;
      }
      onMessage(msg);
    });

    ws.addEventListener("close", () => {
      if (gen !== generation) return;
      clearTimeout(connectTimer);
      onClose();
      if (!closedByUser && reconnect) {
        const delay = retryCount < 5 ? 100 : reconnectDelayMs;
        retryCount++;
        setTimeout(connect, delay);
      }
    });

    ws.addEventListener("error", (err) => {
      if (gen !== generation) return;
      onError(err);
    });
  }

  function joinRoom(roomId) {
    currentRoomId = roomId;
    const joinMsg = { type: "JOIN", roomId, name };
    if (sessionId) joinMsg.sessionId = sessionId;
    return sendRaw(joinMsg);
  }

  function leaveRoom() {
    sendRaw({ type: "LEAVE_ROOM" });
    currentRoomId = null;
  }

  function send(type, payload = {}) {
    return sendRaw({ type, ...payload });
  }

  function sendRaw(obj) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify(obj));
    return true;
  }

  function isOpen() {
    return !!ws && ws.readyState === WebSocket.OPEN;
  }

  function close() {
    closedByUser = true;
    generation++;
    clearTimeout(connectTimer);
    try { ws?.close(); } catch {}
  }

  // Mobile recovery: reconnect on tab switch, bfcache restore, focus
  if (typeof document !== "undefined") {
    function ensureConnected() {
      if (!closedByUser && (!ws || ws.readyState > 1)) {
        connect();
      }
    }
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") ensureConnected();
    });
    window.addEventListener("pageshow", ensureConnected);
    window.addEventListener("focus", ensureConnected);
  }

  function setSessionId(id) { sessionId = id; }
  function setName(n)       { name = n; }
  function setRoomId(id)    { currentRoomId = id; }
  function getRoomId()      { return currentRoomId; }

  return {
    connect,
    joinRoom,
    leaveRoom,
    send,
    sendRaw,
    isOpen,
    close,
    setSessionId,
    setName,
    setRoomId,
    getRoomId,
  };
}
