#!/usr/bin/env python3
"""
frida_host.py — attaches the trace_civ2.js Frida agent to civ2.exe and
merges its event stream into the active sniffer session's events.jsonl
(copy) + Frida events, written as civ2_trace.log.

Usage:
  python frida_host.py [--session SESSION_DIR]

If --session is omitted, auto-follows the newest snapshots/game_* dir.

Output file layout (per session):
  snapshots/game_YYYYMMDD_HHMMSS/
    events.jsonl          ← sniffer poll-based events (as before)
    civ2_trace.log        ← merged stream: events.jsonl lines + Frida events

Each line is JSON. Sniffer lines are passed through unchanged. Frida
lines are tagged {"source": "frida", ...}.

Time base:
  - Sniffer uses time.perf_counter() (monotonic, starts at ~0 at t0).
  - Frida uses Date.now() (wall-clock ms).
  - On startup we measure both and compute an offset so Frida times
    are expressed in sniffer-compatible ms.

Prereqs:
  pip install frida frida-tools
"""

import argparse
import json
import os
import sys
import time
import threading
from pathlib import Path

try:
    import frida
except ImportError:
    print("frida not installed. Run: pip install frida frida-tools", file=sys.stderr)
    sys.exit(2)


SNAPSHOT_ROOT = Path(__file__).resolve().parent.parent / 'snapshots'


def newest_session():
    """Return the path to the newest snapshots/game_* directory."""
    games = sorted([p for p in SNAPSHOT_ROOT.iterdir() if p.is_dir() and p.name.startswith('game_')])
    return games[-1] if games else None


def tail_events_jsonl(session_dir, stop_event, on_line):
    """Tail events.jsonl in the active session, invoking on_line for each
    new line (byte-for-byte). Starts at current end-of-file so only new
    events are forwarded — the file already exists when we start."""
    events_path = session_dir / 'events.jsonl'
    # Wait for file to exist
    while not events_path.exists() and not stop_event.is_set():
        time.sleep(0.2)
    if stop_event.is_set():
        return
    # Start at current end
    with open(events_path, 'r', encoding='utf-8') as f:
        f.seek(0, os.SEEK_END)
        while not stop_event.is_set():
            line = f.readline()
            if not line:
                time.sleep(0.05)
                continue
            on_line(line.rstrip('\n'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--session', type=str, default=None,
                    help='Path to snapshots/game_*/ dir (default: newest)')
    ap.add_argument('--process', type=str, default='civ2.exe',
                    help='Process name to attach to (default: civ2.exe)')
    ap.add_argument('--agent', type=str, default=str(Path(__file__).parent / 'trace_civ2.js'),
                    help='Path to the Frida JS agent')
    args = ap.parse_args()

    # Resolve session dir
    if args.session:
        session_dir = Path(args.session)
    else:
        session_dir = newest_session()
        if session_dir is None:
            print(f"No session found under {SNAPSHOT_ROOT}", file=sys.stderr)
            sys.exit(1)
    print(f"[host] Session: {session_dir}")

    trace_path = session_dir / 'civ2_trace.log'
    trace_fh = open(trace_path, 'a', encoding='utf-8', buffering=1)  # line-buffered
    print(f"[host] Writing to: {trace_path}")

    # Time base: record wall-clock (ms) and monotonic (s) at startup so
    # we can translate Frida's Date.now() into sniffer-equivalent ms.
    t0_wall_ms = time.time() * 1000.0
    t0_mono_s = time.perf_counter()
    # Each sniffer event has time_ms already in perf_counter-relative ms.
    # Each Frida event has time_ms in Date.now() ms. We convert Frida →
    # sniffer via: sniffer_ms = frida_wall_ms - t0_wall_ms + t0_mono_ms
    # BUT the sniffer's t0 isn't known to us. So instead we emit Frida
    # events with a `wall_ms` field unchanged, and include a header line
    # with our t0_wall_ms so downstream tools can align.
    trace_fh.write(json.dumps({
        'kind': 'host_start',
        'session': str(session_dir),
        'frida_t0_wall_ms': t0_wall_ms,
        'frida_t0_mono_s': t0_mono_s,
    }) + '\n')

    # Attach Frida
    try:
        session = frida.attach(args.process)
    except frida.ProcessNotFoundError:
        print(f"[host] Process '{args.process}' not running. Start Civ2 first.", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"[host] Frida attach failed: {e}", file=sys.stderr)
        sys.exit(1)

    with open(args.agent, 'r', encoding='utf-8') as f:
        agent_src = f.read()

    # Serialization: both threads append to trace_fh. Use a lock.
    lock = threading.Lock()

    def emit(record):
        with lock:
            trace_fh.write(json.dumps(record) + '\n')

    def on_message(message, data):
        if message['type'] == 'send':
            payload = message['payload']
            payload['source'] = 'frida'
            emit(payload)
        elif message['type'] == 'error':
            print(f"[frida-error] {message.get('description','(no desc)')}", file=sys.stderr)
        else:
            print(f"[frida-msg] {message}", file=sys.stderr)

    script = session.create_script(agent_src)
    script.on('message', on_message)
    script.load()

    # Tail events.jsonl in a background thread
    stop_event = threading.Event()

    def on_sniffer_line(line):
        # Try to parse; if it's JSON, mark source and re-emit.
        try:
            obj = json.loads(line)
            obj.setdefault('source', 'sniffer')
            emit(obj)
        except json.JSONDecodeError:
            # Pass through raw
            emit({'source': 'sniffer', 'raw': line})

    tail_t = threading.Thread(target=tail_events_jsonl,
                              args=(session_dir, stop_event, on_sniffer_line),
                              daemon=True)
    tail_t.start()

    print("[host] Running. Ctrl-C to stop.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        stop_event.set()
        script.unload()
        session.detach()
        trace_fh.close()
        print("[host] Stopped.")


if __name__ == '__main__':
    main()
