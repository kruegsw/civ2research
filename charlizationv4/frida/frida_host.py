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


def tail_events_jsonl(session_dir_ref, stop_event, on_line, on_session_change):
    """Tail events.jsonl in the active session, invoking on_line for each
    new line. session_dir_ref is a mutable dict with key 'dir' so we can
    follow session rotation live: when a newer session appears, we close
    the current tail and move to the new one. on_session_change notifies
    the caller so it can swap the civ2_trace.log destination."""
    def current_dir():
        return session_dir_ref['dir']

    fh = None
    prev_dir = current_dir()
    while not stop_event.is_set():
        # Check for a newer session
        newest = newest_session()
        if newest and newest != prev_dir:
            if fh is not None:
                fh.close()
                fh = None
            session_dir_ref['dir'] = newest
            prev_dir = newest
            on_session_change(newest)

        if fh is None:
            events_path = prev_dir / 'events.jsonl'
            if not events_path.exists():
                time.sleep(0.5)
                continue
            fh = open(events_path, 'r', encoding='utf-8')
            fh.seek(0, os.SEEK_END)

        line = fh.readline()
        if not line:
            time.sleep(0.1)
            continue
        on_line(line.rstrip('\n'))
    if fh is not None:
        fh.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--session', type=str, default=None,
                    help='Path to snapshots/game_*/ dir (default: newest)')
    ap.add_argument('--process', type=str, default='civ2.exe',
                    help='Process name to attach to (default: civ2.exe)')
    ap.add_argument('--agent', type=str, default=str(Path(__file__).parent / 'trace_civ2.js'),
                    help='Path to the Frida JS agent')
    ap.add_argument('--hot', action='store_true',
                    help='Enable high-frequency hooks (crt_rand, ai_civ_has, '
                         'fun_d007e_hot, fun_city_owner_by_tech). Disabled by '
                         'default since they fire thousands of times per turn '
                         "and can hang Civ2's message loop → OS crash.")
    ap.add_argument('--slim', action='store_true',
                    help='Only attach AI-port-validation hooks (ai_research_pick, '
                         'ai_calc_tech_value, civ_turn_driver, mgl_active_civ_on). '
                         'Minimal Frida footprint; use for AI-port captures.')
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

    # Mutable ref so the tail thread can report session rotations back
    session_ref = {'dir': session_dir}
    trace_fh_ref = {'fh': None}  # reopened on session change
    trace_fh_lock = threading.Lock()

    def open_trace(dir_):
        path = dir_ / 'civ2_trace.log'
        with trace_fh_lock:
            if trace_fh_ref['fh'] is not None:
                trace_fh_ref['fh'].close()
            trace_fh_ref['fh'] = open(path, 'a', encoding='utf-8', buffering=1)
            print(f"[host] Writing to: {path}")

    open_trace(session_dir)

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
    trace_fh_ref['fh'].write(json.dumps({
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
    # Prepend the hot-hook toggle so the agent's attach loop can see it.
    agent_src = (
        f"const ENABLE_HOT_HOOKS = {str(bool(args.hot)).lower()};\n"
        f"const SLIM_HOOKS = {str(bool(args.slim)).lower()};\n"
        + agent_src
    )

    def emit(record):
        with trace_fh_lock:
            fh = trace_fh_ref['fh']
            if fh is not None:
                fh.write(json.dumps(record) + '\n')

    # Count Frida events so we can tell if the agent is working
    frida_counts = {'startup': 0, 'ready': 0, 'call': 0, 'return': 0, 'hook_failed': 0, 'other': 0}

    def on_message(message, data):
        if message['type'] == 'send':
            payload = message['payload']
            payload['source'] = 'frida'
            emit(payload)
            kind = payload.get('kind', 'other')
            frida_counts[kind if kind in frida_counts else 'other'] = \
                frida_counts.get(kind if kind in frida_counts else 'other', 0) + 1
            # Print diagnostic lines for setup events and failures
            if kind in ('startup', 'ready', 'hook_failed', 'error'):
                print(f"[frida] {kind}: {payload}", file=sys.stderr)
        elif message['type'] == 'error':
            print(f"[frida-error] {message.get('description','(no desc)')}", file=sys.stderr)
            if message.get('stack'):
                print(message['stack'], file=sys.stderr)
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

    def on_session_change(new_dir):
        print(f"[host] Session rotated → {new_dir}")
        open_trace(new_dir)
        emit({'kind': 'host_rotate', 'session': str(new_dir),
              'frida_t0_wall_ms': time.time() * 1000.0,
              'frida_t0_mono_s': time.perf_counter()})

    tail_t = threading.Thread(target=tail_events_jsonl,
                              args=(session_ref, stop_event, on_sniffer_line, on_session_change),
                              daemon=True)
    tail_t.start()

    print("[host] Running. Ctrl-C to stop.")
    try:
        last_print = time.time()
        while True:
            time.sleep(1)
            # Every 10s, print Frida event counts so user can tell if hooks fire
            if time.time() - last_print > 10:
                total = sum(frida_counts.values())
                if total == 0:
                    print("[host] WARNING: 0 Frida messages received. Agent may not have attached.", file=sys.stderr)
                else:
                    print(f"[host] Frida events: {dict(frida_counts)}", file=sys.stderr)
                last_print = time.time()
    except KeyboardInterrupt:
        pass
    finally:
        stop_event.set()
        try: script.unload()
        except Exception: pass
        try: session.detach()
        except Exception: pass
        with trace_fh_lock:
            if trace_fh_ref['fh'] is not None:
                trace_fh_ref['fh'].close()
        print("[host] Stopped.")


if __name__ == '__main__':
    main()
