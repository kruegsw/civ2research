// server.js — Civ2 Save Viewer HTTP Server
// Minimal static file server (no Express). Foundation for WebSocket later.

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = Number(process.env.PORT || 8788);
const DEBUG = process.env.DEBUG === "1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");

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

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  if (DEBUG) console.log(`HTTP ${req.method} ${urlPath}`);

  // Health check
  if (urlPath === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok");
    return;
  }

  // Saves directory listing (JSON API for client auto-detect)
  if (urlPath === "/saves/" || urlPath === "/saves") {
    handleSavesListing(res);
    return;
  }

  let rel = urlPath === "/" ? "/index.html" : urlPath;

  // Prevent directory traversal
  rel = path.posix.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(PUBLIC_DIR, rel);

  if (!filePath.startsWith(PUBLIC_DIR)) {
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

server.listen(PORT, () => {
  console.log(`Civ2 viewer server listening on http://localhost:${PORT}`);
});
