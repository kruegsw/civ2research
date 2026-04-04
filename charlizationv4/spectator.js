#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// v4 spectator — runs all-AI game, serves state as .sav files
//
// The v3 client already renders .sav files. This server:
//   1. Generates a game via v4 binary (map gen + civ init)
//   2. Runs AI turns automatically
//   3. Serves the game state as a .sav file at /saves/game.sav
//   4. Serves the v3 client which auto-loads it
//
// Usage: node charlizationv4/spectator.js [--speed MS] [--width W] [--height H]
// ═══════════════════════════════════════════════════════════════════

import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

// ── v4 engine ──
import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, ptrAdd, _MEM } from './mem.js';
import { loopReset } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { buildSav } from './sav-from-mem.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.env.PORT || 8788);
const args = process.argv.slice(2);
const getArg = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? parseInt(args[i + 1]) : def; };
const TURN_SPEED = getArg('speed', 2000);
const MAP_W = getArg('width', 50);
const MAP_H = getArg('height', 50);

// ── Initialize engine ──
initBinaryConstants();
const rulesPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
loadRules(readFileSync(rulesPath, 'utf8'));
console.log('v4 engine initialized');

// ── Initialize game — load from .sav or init ──
const savArg = args.find((a,i,arr) => arr[i-1] === '--sav') || args.find(a => a.endsWith('.sav'));
let mw, mh, mw2;

if (savArg) {
  const { loadSav } = await import('./sav-loader.js');
  const savBuf = new Uint8Array(readFileSync(savArg));
  loadSav(savBuf);
  mw2 = s16(DAT_006d1160, 0); mh = s16(DAT_006d1162, 0); mw = mw2 / 2;
  console.log(`Loaded save: ${savArg}`);
} else {
  mw = MAP_W; mh = MAP_H; mw2 = mw * 2;
  wv(DAT_00628044, 1);
  for (let i = 0; i < 2048 * 0x20; i++) _MEM[DAT_006560f0 + i] = 0;
  w16(DAT_00655b16, 0, 0); w16(DAT_00655b18, 0, 0);
  wv(globalThis.DAT_00627fd8, 1);
  _MEM[DAT_00655b02] = 0;
  _MEM[DAT_00655b02 + 2] = 3;
  _MEM[DAT_00655b02 + 6] = 3;
  w16(DAT_006d1160, 0, mw2); w16(DAT_006d1162, 0, mh);
  wv(DAT_006d1168, Date.now() & 0x7FFF);
  _MEM[DAT_00655b0a] = 0x7E;
  _MEM[DAT_00655b0b] = 0;

  const { FUN_00408d33 } = await import('./blocks/block_00400000.js');
  loopReset(); try { FUN_00408d33(0); } catch(e) { console.error('Map gen:', e.message?.substring(0,80)); }

  const { FUN_004aa9c0 } = await import('./blocks/block_004A0000.js');
  loopReset(); FUN_004aa9c0();
  w16(DAT_00655af8, 0, 1);

  for (let i = 0; i < s16(DAT_00655b16, 0); i++) {
    const b = i * 0x20;
    if (s32(DAT_0065610a, b) == 0) continue;
    const owner = _MEM[DAT_006560f0 + b + 7];
    w16(globalThis.DAT_00627fe0, s16(DAT_0064c6a6, owner * 0x594) * 2, s16(DAT_006560f0, b));
    w16(globalThis.DAT_00628010, s16(DAT_0064c6a6, owner * 0x594) * 2, s16(DAT_006560f0, b + 2));
  }
}

console.log(`Game: ${mw}x${mh}, ${s16(DAT_00655b16, 0)} units, ${s16(DAT_00655b18, 0)} cities`);

// ── Headless turn runner (skips UI-only functions that hang/slow down) ──
const { FUN_00488cef, FUN_00489292 } = await import('./blocks/block_00480000.js');
const { FUN_004f0a9c } = await import('./blocks/block_004F0000.js');
const { FUN_00560084 } = await import('./blocks/block_00560000.js');
const { FUN_0053184d } = await import('./blocks/block_00530000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');
console.log('Turn pipeline loaded');

function runTurnHeadless(civ) {
  wv(DAT_00655b05, civ); wv(DAT_006d1da0, civ); loopReset();
  if (s32(DAT_0064c6a2, civ*0x594) > 30000) w32(ptrAdd(DAT_0064c6a2, civ*0x594), 0, 30000);
  if (s32(DAT_0064c6a2, civ*0x594) < 0) w32(ptrAdd(DAT_0064c6a2, civ*0x594), 0, 0);
  try { FUN_00488cef(civ); } catch(e) {}
  let idx = s16(DAT_00655b18, 0);
  while (--idx >= 0) {
    if (s32(DAT_0064f394, idx*0x58) !== 0 && _MEM[DAT_0064f348+idx*0x58] === (civ&0xFF))
      try { FUN_004f0a9c(idx); } catch(e) {}
  }
  try { FUN_00560084(civ); } catch(e) {}
  try { FUN_0053184d(civ); } catch(e) {}
  try { FUN_00489292(civ, 0); } catch(e) {}
  // FUN_00543cd6 skipped — its rendering trampoline stalls for 20s on some turns
}

// ── Auto-run turns ──
let currentSav = buildSav();
console.log(`Initial .sav: ${currentSav.length} bytes`);

setInterval(() => {
  const alive = _MEM[DAT_00655b0a];
  const s = Date.now();
  for (let civ = 1; civ < 8; civ++) {
    if (!(alive & (1 << civ))) continue;
    runTurnHeadless(civ);
  }
  wv(DAT_00655af8, s16(DAT_00655af8, 0) + 1);
  currentSav = buildSav();
  const t = s16(DAT_00655af8, 0);
  const units = s16(DAT_00655b16, 0);
  const cities = s16(DAT_00655b18, 0);
  console.log(`Turn ${t} (${Date.now()-s}ms): ${units}U ${cities}C sav=${currentSav.length}b`);
}, TURN_SPEED);

// ── HTTP server ──
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.gif':'image/gif','.json':'application/json','.sav':'application/octet-stream','.ico':'image/x-icon'};
const publicDir = join(__dirname, '..', 'charlizationv3', 'public');
const engineDir = join(__dirname, '..', 'charlizationv3', 'engine');

const httpServer = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  // Health check
  if (url.pathname === '/health') { res.end('ok'); return; }

  // Save file listing — serve our auto-game
  if (url.pathname === '/saves/') {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(['game.sav']));
    return;
  }

  // Serve the current game state as a .sav file
  if (url.pathname === '/saves/game.sav') {
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': currentSav.length,
      'Cache-Control': 'no-cache',
    });
    res.end(Buffer.from(currentSav));
    return;
  }

  // Auto-refresh viewer page
  if (url.pathname === '/watch') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(`<!DOCTYPE html><html><head><title>v4 Spectator</title>
<style>body{margin:0;background:#111;color:#ccc;font:14px monospace}
#info{padding:8px;background:#222}canvas{display:block}</style></head>
<body><div id="info">Loading...</div><canvas id="c"></canvas>
<script type="module">
const COLORS={0:'#e8d080',1:'#90b030',2:'#40a030',3:'#207820',4:'#906030',5:'#808080',6:'#a8c8c8',7:'#e0e8f0',8:'#408860',9:'#186818',10:'#2040a0'};
const CIV_COLORS=['#888','#fff','#00f','#0a0','#ff0','#f80','#f0f','#0ff'];
const TILE=6;
async function refresh(){
  const r=await fetch('/saves/game.sav',{cache:'no-store'});
  const buf=new Uint8Array(await r.arrayBuffer());
  const tr=await fetch('/turn',{cache:'no-store'});
  const info=await tr.json();
  // Parse minimal sav
  const mw2=buf[13702]|(buf[13703]<<8), mh=buf[13704]|(buf[13705]<<8);
  const ms=buf[13706]|(buf[13707]<<8);
  const mw=mw2/2;
  const tileOff=13702+14+7*ms;
  const totalUnits=buf[0x3A]|(buf[0x3B]<<8);
  const totalCities=buf[0x3C]|(buf[0x3D]<<8);
  const qw=buf[13712]|(buf[13713]<<8), qh=buf[13714]|(buf[13715]<<8);
  const unitOff=tileOff+ms*6+qw*qh*2+1024;
  const cityOff=unitOff+totalUnits*32;
  // Draw map
  const canvas=document.getElementById('c');
  canvas.width=mw*TILE; canvas.height=mh*TILE;
  const ctx=canvas.getContext('2d');
  for(let y=0;y<mh;y++){
    for(let gx=0;gx<mw;gx++){
      const dx=gx*2+(y%2);
      const off=tileOff+(mw2&~1)*y*3+(dx&~1)*3;
      const terrain=buf[off]&0x0F;
      const river=buf[off]&0x80;
      ctx.fillStyle=COLORS[terrain]||'#000';
      ctx.fillRect(gx*TILE,y*TILE,TILE,TILE);
      if(river){ctx.fillStyle='rgba(0,100,255,0.4)';ctx.fillRect(gx*TILE+1,y*TILE+1,TILE-2,TILE-2);}
    }
  }
  // Draw cities
  for(let i=0;i<totalCities;i++){
    const off=cityOff+i*88;
    const cx=buf[off]|(buf[off+1]<<8), cy=buf[off+2]|(buf[off+3]<<8);
    const owner=buf[off+8], size=buf[off+9];
    if(size===0)continue;
    const gx=Math.floor(cx/2);
    ctx.fillStyle=CIV_COLORS[owner]||'#fff';
    ctx.fillRect(gx*TILE+1,cy*TILE+1,TILE-2,TILE-2);
    ctx.fillStyle='#000';ctx.font='5px sans-serif';
    ctx.fillText(size,gx*TILE+1,cy*TILE+TILE-1);
  }
  // Draw units
  for(let i=0;i<totalUnits;i++){
    const off=unitOff+i*32;
    const id=buf[off+26]|(buf[off+27]<<8)|(buf[off+28]<<16)|(buf[off+29]<<24);
    if(id===0)continue;
    const cx=buf[off]|(buf[off+1]<<8), cy=buf[off+2]|(buf[off+3]<<8);
    if(cx>60000)continue; // transit state
    const owner=buf[off+7];
    const gx=Math.floor(cx/2);
    ctx.strokeStyle=CIV_COLORS[owner]||'#fff';
    ctx.strokeRect(gx*TILE,cy*TILE,TILE,TILE);
  }
  document.getElementById('info').textContent='Turn '+info.turn+' | '+info.units+' units | '+info.cities+' cities';
}
refresh();
setInterval(refresh,3000);
</script></body></html>`);
    return;
  }

  // Current turn info (JSON)
  if (url.pathname === '/turn') {
    const t = s16(DAT_00655af8, 0);
    const units = s16(DAT_00655b16, 0);
    const cities = s16(DAT_00655b18, 0);
    res.writeHead(200, {'Content-Type':'application/json','Cache-Control':'no-cache'});
    res.end(JSON.stringify({ turn: t, units, cities, savSize: currentSav.length }));
    return;
  }

  // Engine modules
  if (url.pathname.startsWith('/engine/')) {
    const fp = join(engineDir, url.pathname.substring(8));
    if (existsSync(fp) && statSync(fp).isFile()) {
      res.writeHead(200, {'Content-Type': MIME[extname(fp)] || 'text/plain'});
      res.end(readFileSync(fp)); return;
    }
  }

  // Static files from v3 public/
  let fp = join(publicDir, url.pathname === '/' ? 'index.html' : url.pathname);
  if (existsSync(fp) && statSync(fp).isFile()) {
    res.writeHead(200, {'Content-Type': MIME[extname(fp)] || 'application/octet-stream'});
    res.end(readFileSync(fp));
  } else {
    res.writeHead(404); res.end('Not found');
  }
});

// Absorb WebSocket connections so client stops spamming errors
const wss = new (await import('ws')).WebSocketServer({ server: httpServer });
wss.on('connection', (ws) => { ws.on('message', () => {}); });

httpServer.listen(PORT, () => {
  console.log(`v4 spectator: http://localhost:${PORT}`);
  console.log(`  ${mw}x${mh} map, ${TURN_SPEED}ms/turn`);
  console.log(`  .sav at: http://localhost:${PORT}/saves/game.sav`);
  console.log(`  Open the page, select game.sav from the dropdown`);
});
