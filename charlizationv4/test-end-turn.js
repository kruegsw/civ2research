#!/usr/bin/env node
// Self-contained test: starts server, connects, tests END_TURN, stops
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Fork the server as a child process
import { spawn } from 'child_process';
const server = spawn('node', [join(__dirname, 'server.js'),
  '--sav', join(__dirname, '..', '20260301_early-game-data', '20260301_research_02_early game few cities.sav')
], { stdio: ['pipe', 'pipe', 'pipe'] });

let serverReady = false;
server.stdout.on('data', (d) => {
  const line = d.toString().trim();
  console.log('[server]', line);
  if (line.includes('v4 server:')) serverReady = true;
});
server.stderr.on('data', (d) => console.error('[server err]', d.toString().trim()));

// Wait for server to be ready
await new Promise((resolve) => {
  const check = setInterval(() => {
    if (serverReady) { clearInterval(check); resolve(); }
  }, 200);
  setTimeout(() => { clearInterval(check); resolve(); }, 15000);
});

if (!serverReady) {
  console.error('Server failed to start');
  server.kill();
  process.exit(1);
}

console.log('\n--- Testing WebSocket ---');

const WebSocket = (await import('ws')).default;
const ws = new WebSocket('ws://localhost:4000');

await new Promise((resolve) => {
  ws.on('open', () => ws.send(JSON.stringify({ type: 'JOIN', civSlot: 1 })));

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    const s = msg.state;
    console.log(msg.type + ' turn=' + (s?.turn || '?'));

    if (s?.cities) {
      for (const c of s.cities) {
        const b = c.bytes;
        let name = '';
        for (let i = 0x20; i < 0x30; i++) { if (!b[i]) break; name += String.fromCharCode(b[i]); }
        const food = b[0x1a] | (b[0x1b] << 8);
        const shields = b[0x1c] | (b[0x1d] << 8);
        console.log(`  ${name} civ=${b[8]} size=${b[9]} food=${food} shields=${shields}`);
      }
    }

    if (msg.type === 'GAME_STATE' || (msg.type === 'STATE_UPDATE' && s.turn < 16)) {
      ws.send(JSON.stringify({ type: 'ACTION', action: { type: 'END_TURN' } }));
    } else {
      ws.close();
      resolve();
    }
  });

  ws.on('error', (e) => { console.error('WS Error:', e.message); resolve(); });
  setTimeout(resolve, 10000);
});

console.log('\n--- Done ---');
server.kill();
process.exit(0);
