#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// watch-ai-decisions.js — Real-time AI decision stream viewer.
//
// WHAT THIS IS
// ────────────
// Tails the `events.jsonl` file in the newest Civ2 snapshot session
// directory and prints each captured event as a human-readable
// narrative line. Run it alongside a live sniff-game.py session and
// watch the AI decisions scroll by as you (and the AI civs) take turns.
//
// Each line in events.jsonl represents a state change observed in
// civ2.exe's memory — i.e., the OUTCOME of an AI (or human) decision.
// This viewer flattens those entries into:
//
//     Turn 6 [Americans ] built Warriors at (53,43)
//     Turn 5 [Aztecs    ] rates → tax=40% sci=50% lux=10%
//     Turn 5 [Aztecs    ] discovered Bronze Working
//     Turn 5 [Aztecs    ] research target cleared
//     Turn 6 [Carthaginians] Warriors @ (65,23): fortify → fortified
//     Turn 6 [Americans ] +1 gold (0 → 1)
//
// HOW IT FITS IN
// ──────────────
// - sniff-game.py polls civ2.exe memory continuously and, on each
//   state change, appends a JSON event to `events.jsonl` in the
//   current session directory (charlizationv4/snapshots/game_*/).
// - The v3 harness (dump-server-state.js --replay) consumes these
//   events to replay real Civ2's AI decisions through the JS engine
//   — that's how we get the 179/179 fidelity match per turn.
// - This viewer is a purely observational tool: it does not modify
//   events.jsonl, does not attach to civ2.exe, does not run the
//   harness. It just reads and pretty-prints new lines as they land.
//
// EVENT TYPES (from sniff-game.py::emit_action_events)
// ────────────────────────────────────────────────────
// - TURN_ADVANCED    global turn counter bump
// - UNIT_CREATED     city finished a unit / barb spawned / etc.
// - UNIT_KILLED      unit destroyed (combat, disband, starvation)
// - UNIT_MOVED       unit changed position
// - UNIT_ORDER       order byte changed (fortify, road, irrigate…)
// - CITY_FOUNDED     settler became a city
// - CITY_DESTROYED   city razed, starved, captured
// - RATE_CHANGED     civ's tax/sci/lux allocation changed
// - GOV_CHANGED      government type changed
// - RESEARCH_PICKED  new research target
// - TECH_DISCOVERED  tech completed
// - GOLD_CHANGED     treasury changed
// - FLAGS_CHANGED    civ state-flag bits (senate override, etc.)
//
// WHAT IS NOT CAPTURED
// ────────────────────
// The AI's internal REASONING — why it picked building X over Y,
// why it declared war, why it moved unit to tile Z. The sniffer
// observes OUTPUTS, not deliberation. To see reasoning you would
// need to hook the decision functions themselves (FUN_0053184D,
// FUN_004C195E etc.) and dump their scoring tables / branch
// conditions. That is a separate project.
//
// USAGE
// ─────
//     node charlizationv4/watch-ai-decisions.js
//       └─ watches the newest session under snapshots/
//
//     node charlizationv4/watch-ai-decisions.js --session game_20260418_194854
//       └─ watches a specific session
//
//     node charlizationv4/watch-ai-decisions.js --from-start
//       └─ replay the entire file, then continue tailing
//
//     node charlizationv4/watch-ai-decisions.js --no-color
//       └─ plain text, no ANSI colors (for piping / Windows cmd)
//
// Ctrl+C to stop.
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, readdirSync, statSync, existsSync, openSync, readSync, closeSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = join(__dirname, 'snapshots');

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const sessionArg = args.indexOf('--session') >= 0 ? args[args.indexOf('--session') + 1] : null;
const fromStart  = args.includes('--from-start');
const noColor    = args.includes('--no-color') || !process.stdout.isTTY;

// ── ANSI color helpers ──────────────────────────────────────────────
// Skipped entirely when --no-color or when stdout isn't a TTY.
const RESET = noColor ? '' : '\x1b[0m';
const DIM   = noColor ? '' : '\x1b[2m';
const BOLD  = noColor ? '' : '\x1b[1m';
const c = (n, s) => noColor ? s : `\x1b[38;5;${n}m${s}\x1b[0m`;
// Civ-slot palette. Slot 0 = barbarians (red), then distinct colors per civ.
const CIV_COLORS = [196, 214, 220, 118, 51, 45, 165, 201];
const colorCiv = (slot, text) => c(CIV_COLORS[slot % CIV_COLORS.length], text);

// ── Name tables (copied from sniff-game.py — keep in sync) ─────────
// LEADER_CIVS is the civ name for leader_graphic_id (0-based). A real
// game assigns N civs from this list, so slot 1 in the game might be
// any of these names. We can't reliably map slot → name without the
// snapshot, so the script reads the freshest snapshot to build a
// slot → name table before watching.
const LEADER_CIVS = [
  'Romans','Babylonians','Germans','Egyptians','Americans','Greeks','Indians',
  'Russians','Zulus','French','Aztecs','Chinese','English','Mongols',
  'Celts','Japanese','Vikings','Spanish','Persians','Carthaginians','Sioux',
  'Arabs','Incas',
];
const UNIT_NAMES = [
  'Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen',
  'Musketeers','Fanatics','Partisans','Alpine','Riflemen','Marines',
  'Paratroopers','Mech Inf','Horsemen','Chariot','Elephant','Crusaders',
  'Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery',
  'Howitzer','Fighter','Bomber','Helicopter','Stealth F','Stealth B',
  'Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer',
  'Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport',
  'Cruise Msl','Nuclear Msl','Diplomat','Spy','Caravan','Freight','Explorer',
];
const TECH_NAMES = [
  'Advanced Flight','Alphabet','Amphibious War','Astronomy','Atomic Theory',
  'Automobile','Banking','Bridge Building','Bronze Working','Ceremonial Burial',
  'Chemistry','Chivalry','Code of Laws','Combined Arms','Combustion',
  'Communism','Computers','Conscription','Construction','The Corporation',
  'Currency','Democracy','Economics','Electricity','Electronics',
  'Engineering','Environmentalism','Espionage','Explosives','Feudalism',
  'Flight','Fundamentalism','Fusion Power','Genetic Engineering','Guerrilla War',
  'Gunpowder','Horseback Riding','Industrialization','Invention','Iron Working',
  'Labor Union','The Laser','Leadership','Literacy','Machine Tools',
  'Magnetism','Map Making','Masonry','Mass Production','Mathematics',
  'Medicine','Metallurgy','Miniaturization','Mobile Warfare','Monarchy',
  'Monotheism','Mysticism','Navigation','Nuclear Fission','Nuclear Power',
  'Philosophy','Physics','Plastics','Plumbing','Polytheism',
  'Pottery','Radio','Railroad','Recycling','Refining',
  'Refrigeration','The Republic','Robotics','Rocketry','Sanitation',
  'Seafaring','Space Flight','Stealth','Steam Engine','Steel',
  'Superconductor','Tactics','Theology','Theory of Gravity','Trade',
  'University','Warrior Code','The Wheel','Writing','Future Tech',
];
const GOV_NAMES = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy'];
const ORDER_NAMES = {
  0: 'none', 1: 'fortify', 2: 'fortified', 3: 'sleep',
  4: 'build fortress', 5: 'road', 6: 'irrigate', 7: 'mine',
  8: 'transform', 9: 'clean pollution', 10: 'build airbase',
  11: 'goto', 255: 'none',
};

// ── Helpers ────────────────────────────────────────────────────────

// Find the newest session directory under snapshots/ by mtime.
function findNewestSession() {
  const entries = readdirSync(SNAPSHOTS_DIR)
    .filter(n => n.startsWith('game_'))
    .map(n => ({ name: n, path: join(SNAPSHOTS_DIR, n), mtime: statSync(join(SNAPSHOTS_DIR, n)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return entries[0]?.name ?? null;
}

// Best-effort slot → civ name map. We read the freshest CIV2SNAP
// binary in the session dir and parse each civ's leader_graphic_id
// at offset 0xA6 inside the civ record. This is the same field the
// sniffer uses to resolve civ names for its own game.log narration.
function buildCivNameMap(sessionDir) {
  const names = new Array(8).fill(null).map((_, i) => `civ ${i}`);
  if (!existsSync(sessionDir)) return names;
  const bins = readdirSync(sessionDir)
    .filter(n => /^turn_\d+_[^_]+_\w+\.bin$/.test(n) && !n.includes('_0x0_'))
    .sort();
  if (bins.length === 0) return names;
  const path = join(sessionDir, bins[bins.length - 1]);
  try {
    const buf = readFileSync(path);
    if (buf.slice(0, 8).toString('ascii') !== 'CIV2SNAP') return names;
    // Walk the region table (same layout as load-snapshot.js).
    const dv  = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const regionCount = dv.getUint32(8, true);
    let tableOff = 12;
    let dataOff = 12 + regionCount * 24;
    for (let i = 0; i < regionCount; i++) {
      let name = '';
      for (let j = 0; j < 16; j++) {
        const ch = buf[tableOff + j];
        if (ch === 0) break;
        name += String.fromCharCode(ch);
      }
      const size = dv.getUint32(tableOff + 20, true);
      if (name === 'civs') {
        // 8 civ records × 0x594 bytes each. Leader gid is a signed 16
        // at data-block offset 0x06, which is header+0x06 = 0xA6 in the
        // raw record. Snapshot `civs` region starts at civ 0 base,
        // so record offset = slot * 0x594.
        for (let slot = 1; slot < 8; slot++) {
          const recOff = dataOff + slot * 0x594;
          if (recOff + 0xA6 + 2 > buf.length) break;
          const gid = dv.getInt16(recOff + 0xA6, true);
          if (gid >= 0 && gid < LEADER_CIVS.length) {
            names[slot] = LEADER_CIVS[gid];
          }
        }
        break;
      }
      tableOff += 24;
      dataOff += size;
    }
  } catch (_) { /* fall through with placeholder names */ }
  return names;
}

// Pad civ name to a fixed width so the log aligns as a column.
const CIV_COL_WIDTH = 14;
function padName(name) {
  if (name.length > CIV_COL_WIDTH) return name.slice(0, CIV_COL_WIDTH);
  return name + ' '.repeat(CIV_COL_WIDTH - name.length);
}

// Turn one event object into a single line of prose. The shapes
// originate in sniff-game.py::emit_action_events — keep this function
// in sync with changes there (or treat unknown types gracefully).
function formatEvent(ev, civNames) {
  const turnStr = `T${String(ev.turn).padStart(3, ' ')}`;
  const slot = ev.civ ?? ev.owner;
  const civName = slot != null ? padName(civNames[slot] ?? `civ ${slot}`) : padName('');
  const civ = slot != null ? colorCiv(slot, civName) : civName;
  const prefix = `${DIM}${turnStr}${RESET} [${civ}]`;

  switch (ev.event) {
    case 'TURN_ADVANCED':
      // Separator so each turn is visually distinct in the stream.
      return `\n${DIM}─────────────────────────────────────────${RESET}\n` +
             `${BOLD}${turnStr}${RESET} ═══ TURN ADVANCED → year ${ev.currentYear}, active civ ${ev.activeCiv} ═══`;
    case 'UNIT_CREATED': {
      const u = UNIT_NAMES[ev.type] ?? `type${ev.type}`;
      return `${prefix} built ${BOLD}${u}${RESET} at (${ev.x},${ev.y})`;
    }
    case 'UNIT_KILLED': {
      const u = UNIT_NAMES[ev.type] ?? `type${ev.type}`;
      return `${prefix} lost ${u} at (${ev.x},${ev.y})`;
    }
    case 'UNIT_MOVED': {
      const [fx, fy] = ev.from || [];
      const [tx, ty] = ev.to || [];
      return `${prefix} unit #${ev.uid} moved (${fx},${fy}) → (${tx},${ty})`;
    }
    case 'UNIT_ORDER': {
      const ord = ev.orderName ?? ORDER_NAMES[ev.order] ?? `order${ev.order}`;
      return `${prefix} unit #${ev.uid} @ slot ${ev.slot}: ${BOLD}${ord}${RESET}`;
    }
    case 'CITY_FOUNDED':
      return `${prefix} founded ${BOLD}${ev.name}${RESET} at (${ev.x},${ev.y})`;
    case 'CITY_DESTROYED':
      return `${prefix} lost city ${ev.name} at (${ev.x},${ev.y})`;
    case 'RATE_CHANGED':
      return `${prefix} rates → tax=${ev.tax}% sci=${ev.sci}% lux=${ev.lux}%`;
    case 'GOV_CHANGED': {
      const fromG = GOV_NAMES[ev.from] ?? `gov${ev.from}`;
      const toG   = GOV_NAMES[ev.to]   ?? `gov${ev.to}`;
      return `${prefix} government ${fromG} → ${BOLD}${toG}${RESET}`;
    }
    case 'RESEARCH_PICKED': {
      if (ev.techId === 255 || ev.techId == null) {
        return `${prefix} research target cleared`;
      }
      const t = TECH_NAMES[ev.techId] ?? `tech${ev.techId}`;
      return `${prefix} now researching ${BOLD}${t}${RESET}`;
    }
    case 'TECH_DISCOVERED': {
      const t = TECH_NAMES[ev.techId] ?? `tech${ev.techId}`;
      return `${prefix} ${BOLD}discovered ${t}${RESET} 🔬`;
    }
    case 'GOLD_CHANGED': {
      const delta = (ev.to ?? 0) - (ev.from ?? 0);
      const sign  = delta >= 0 ? '+' : '';
      return `${prefix} treasury ${ev.from} → ${ev.to} (${sign}${delta})`;
    }
    case 'FLAGS_CHANGED':
      // Flags are bitfield noise for most viewers — dim them so they
      // don't dominate the stream. Keep them in so fidelity hunters
      // can eyeball the capture stream for missing/extra events.
      return `${DIM}${prefix} flags 0x${(ev.from ?? 0).toString(16)} → 0x${(ev.to ?? 0).toString(16)}${RESET}`;
    default:
      return `${prefix} ${DIM}${ev.event}${RESET} ${JSON.stringify(ev)}`;
  }
}

// ── Main ──────────────────────────────────────────────────────────
const sessionName = sessionArg || findNewestSession();
if (!sessionName) {
  console.error('No snapshot session found under', SNAPSHOTS_DIR);
  console.error('Run sniff-game.py first to start capturing events.');
  process.exit(1);
}
const sessionDir  = join(SNAPSHOTS_DIR, sessionName);
const eventsPath  = join(sessionDir, 'events.jsonl');

console.log(`${BOLD}watch-ai-decisions${RESET} — session ${c(51, sessionName)}`);
console.log(`Events: ${eventsPath}`);

const civNames = buildCivNameMap(sessionDir);
console.log(`Civs: ${civNames.map((n, i) => i === 0 ? '' : colorCiv(i, n)).filter(Boolean).join(', ')}`);
console.log(`${DIM}(Ctrl+C to stop)${RESET}\n`);

// Tail loop — poll by file size delta. We keep a running byte offset;
// on each poll we read the tail of the file from that offset and split
// newly-appended content on newlines. Partial lines (no trailing \n)
// are held back until the next poll. This handles the sniffer writing
// one event per line with an atomic append.
let position = 0;
let partial = '';

// --from-start: re-play the whole file first. Without that flag we
// skip past any pre-existing content and only stream new events.
if (!fromStart && existsSync(eventsPath)) {
  position = statSync(eventsPath).size;
}

function pollOnce() {
  if (!existsSync(eventsPath)) return;
  const size = statSync(eventsPath).size;
  if (size < position) {
    // File shrunk / rotated (shouldn't happen in the sniffer's append-
    // only flow, but handle it gracefully by restarting from 0).
    position = 0;
    partial = '';
  }
  if (size === position) return;
  const fd = openSync(eventsPath, 'r');
  const chunkSize = size - position;
  const buf = Buffer.alloc(chunkSize);
  readSync(fd, buf, 0, chunkSize, position);
  closeSync(fd);
  position = size;
  const text = partial + buf.toString('utf8');
  const lines = text.split('\n');
  partial = lines.pop(); // last element is '' (clean ends) or a partial line
  for (const line of lines) {
    if (!line.trim()) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    console.log(formatEvent(ev, civNames));
  }
}

// Poll every 250ms. Sniffer writes events with sub-second latency;
// 250ms feels snappy without hammering the disk. Adjust if needed.
const INTERVAL_MS = 250;
setInterval(pollOnce, INTERVAL_MS);
pollOnce(); // initial read (catches any backlog from --from-start)

// Heartbeat every 30s so the user knows the tail is alive even if no
// events are firing (e.g., they're on a dialog and haven't ended turn).
setInterval(() => {
  process.stdout.write(`${DIM}[heartbeat ${new Date().toLocaleTimeString()} — still watching]${RESET}\n`);
}, 30_000);
