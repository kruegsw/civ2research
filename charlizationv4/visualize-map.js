#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// visualize-map.js — Generate an HTML visualization of the v4 map
//
// Reads tile data from _MEM after map gen or save load, produces
// a self-contained HTML file with canvas rendering (same palette as
// the test-mapgen-blob visualizer).
//
// Usage:
//   node charlizationv4/init-game.js --turns 0 2>&1  # (generates map)
//   # or use this after init-game.js by importing this module
//
// Can also be run standalone after loading a save:
//   node charlizationv4/visualize-map.js --sav path/to/file.sav
//   node charlizationv4/visualize-map.js --init [--width W] [--height H]
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, _MEM } from './mem.js';
import { loopReset } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const args = process.argv.slice(2);
const savPath = args.find((a,i,arr) => arr[i-1] === '--sav') || args.find(a => a.endsWith('.sav'));
const doInit = args.includes('--init');
const getArg = (name, def) => {
  const i = args.indexOf('--' + name);
  return i >= 0 && i + 1 < args.length ? parseInt(args[i + 1]) : def;
};
const mapW = getArg('width', 40);
const mapH = getArg('height', 40);
const outFile = args.find((a,i,arr) => arr[i-1] === '--out') || 'charlizationv4/map.html';

initBinaryConstants();
const rPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
if (existsSync(rPath)) loadRules(readFileSync(rPath, 'utf8'));

if (savPath) {
  // Load from save file
  const { loadSav } = await import('./sav-loader.js');
  loadSav(new Uint8Array(readFileSync(savPath)));
  console.log('Loaded save:', savPath);
} else if (doInit) {
  // Generate fresh map from binary init
  const mw2 = mapW * 2;

  // Pre-zero
  wv(DAT_00628044, 1);
  for (let i = 0; i < 2048 * 0x20; i++) _MEM[DAT_006560f0 + i] = 0;
  w16(DAT_00655b16, 0, 0);
  w16(DAT_00655b18, 0, 0);
  for (let i = 0; i < 0xC0; i++) _MEM[globalThis.DAT_0064ba48 + i] = 0xFF;

  // Set map params
  wv(DAT_00655b02, 0);
  w16(DAT_006d1160, 0, mw2);
  w16(DAT_006d1162, 0, mapH);
  w16(DAT_006d1164, 0, mapW * mapH);
  w16(DAT_006d1166, 0, 0);
  w16(DAT_006d116a, 0, (mw2 + 3) >> 2);
  w16(DAT_006d116c, 0, mapH);
  wv(DAT_006d1168, Date.now() & 0x7FFF);
  wv(DAT_00655b0a, 0x7F);
  wv(DAT_00655b0b, 0);

  // Map gen
  const { FUN_00408d33 } = await import('./blocks/block_00400000.js');
  loopReset();
  try {
    FUN_00408d33(0);
    console.log('Map generated:', s16(DAT_006d1160, 0)/2, 'x', s16(DAT_006d1162, 0));
  } catch (e) {
    console.error('Map gen error:', e.message.substring(0, 200));
  }
} else {
  console.error('Usage: node visualize-map.js --sav <file> | --init [--width W] [--height H]');
  process.exit(1);
}

// Read map dimensions
const mw2 = s16(DAT_006d1160, 0);
const mh = s16(DAT_006d1162, 0);
const mw = mw2;  // doubled-X coordinate system
const tilePtr = v(globalThis.DAT_00636598);

if (tilePtr === 0 || mw2 === 0 || mh === 0) {
  console.error('No map data available');
  process.exit(1);
}

console.log(`Map: ${mw2/2}x${mh} (${mw2*mh/2} tiles), tile ptr=${tilePtr}`);

// Extract tile data
const tiles = [];
const counts = new Array(11).fill(0);
let rivers = 0;

for (let y = 0; y < mh; y++) {
  for (let x = (y & 1); x < mw; x += 2) {
    const off = tilePtr + ((mw2 & 0xFFFFFFFE) * y * 3) + ((x & 0xFFFFFFFE) * 3);
    const byte0 = _MEM[off];
    const byte1 = _MEM[off + 1];
    const byte2 = _MEM[off + 2];
    const byte3 = _MEM[off + 3];
    const byte4 = _MEM[off + 4];
    const byte5 = _MEM[off + 5];
    const terrain = byte0 & 0x0F;
    const hasRiver = !!(byte0 & 0x80);
    const bodyId = byte3 & 0x1F;

    tiles.push({ x, y, terrain, river: hasRiver, bodyId });
    counts[terrain]++;
    if (hasRiver) rivers++;
  }
}

const land = tiles.filter(t => t.terrain !== 10).length;
const total = tiles.length;

console.log(`Tiles: ${total} total, ${land} land (${(100*land/total).toFixed(1)}%), ${rivers} rivers`);
for (let i = 0; i < 11; i++) {
  if (counts[i] > 0) {
    const names = ['Desert','Plains','Grass','Forest','Hills','Mtn','Tundra','Glacier','Swamp','Jungle','Ocean'];
    console.log(`  ${names[i]}: ${counts[i]} (${(100*counts[i]/total).toFixed(1)}%)`);
  }
}

// Generate HTML
const TILE = 6;
const canvasW = (mw2 / 2) * TILE;
const canvasH = mh * TILE;

const tileJSON = JSON.stringify(tiles.map(t => [t.x, t.y, t.terrain, t.river ? 1 : 0, t.bodyId]));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Civ2 v4 Map — ${mw2/2}x${mh}</title>
<style>
body { margin: 0; background: #111; color: #ccc; font: 14px monospace; }
canvas { display: block; margin: 20px auto; border: 1px solid #444; }
#info { text-align: center; padding: 10px; }
</style>
</head>
<body>
<div id="info">
  <b>Civ2 v4 Binary Map Gen</b> — ${mw2/2}×${mh} — ${land} land tiles (${(100*land/total).toFixed(1)}%) — ${rivers} rivers
</div>
<canvas id="c" width="${canvasW}" height="${canvasH}"></canvas>
<script>
const COLORS = {
  0:'#e8d080',1:'#90b030',2:'#40a030',3:'#207820',4:'#906030',
  5:'#808080',6:'#a8c8c8',7:'#e0e8f0',8:'#408860',9:'#186818',10:'#2040a0'
};
const TILE = ${TILE};
const mw = ${mw2}, mh = ${mh};
const tiles = ${tileJSON};
const ctx = document.getElementById('c').getContext('2d');

for (const [x, y, terrain, river, bodyId] of tiles) {
  const px = Math.floor(x / 2) * TILE;
  const py = y * TILE;
  ctx.fillStyle = COLORS[terrain];
  ctx.fillRect(px, py, TILE, TILE);
  if (river) {
    ctx.fillStyle = 'rgba(0,100,255,0.5)';
    ctx.fillRect(px + 1, py + 1, TILE - 2, TILE - 2);
  }
}
</script>
</body>
</html>`;

writeFileSync(outFile, html);
console.log(`\nVisualization: ${outFile} (${(html.length/1024).toFixed(0)}KB)`);
