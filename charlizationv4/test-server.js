import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8788');
ws.on('open', () => {
  ws.send(JSON.stringify({ type: 'JOIN', civSlot: 1 }));
});
ws.on('message', (raw) => {
  const msg = JSON.parse(raw);
  const s = msg.state;
  console.log(msg.type + ' turn=' + (s?.turn || '?'));
  if (s?.cities) {
    for (const c of s.cities) {
      const b = c.bytes;
      let name = '';
      for (let i = 0x20; i < 0x30; i++) { if (!b[i]) break; name += String.fromCharCode(b[i]); }
      console.log(`  ${name} civ=${b[8]} size=${b[9]} food=${b[0x1a]|(b[0x1b]<<8)} shields=${b[0x1c]|(b[0x1d]<<8)}`);
    }
  }
  if (msg.type === 'GAME_STATE') {
    ws.send(JSON.stringify({ type: 'ACTION', action: { type: 'END_TURN' } }));
  } else {
    ws.close();
    process.exit(0);
  }
});
ws.on('error', e => { console.log('Error:', e.message); process.exit(1); });
setTimeout(() => { console.log('TIMEOUT'); process.exit(1); }, 10000);
