#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# bench-replay-frida.sh — compare bare vs --replay-frida fidelity
# across multiple N-turn ranges from the same starting snapshot.
#
# Usage:
#   bash bench-replay-frida.sh <session_dir> <start_turn> [N1 N2 N3 ...]
#
# Example:
#   bash bench-replay-frida.sh snapshots/game_20260424_142140 10 2 5 10
# ═══════════════════════════════════════════════════════════════════

set -u
DIR="${1:-}"
START="${2:-}"
shift 2 2>/dev/null || true
if [ -z "$DIR" ] || [ -z "$START" ]; then
  echo "Usage: bash bench-replay-frida.sh <session_dir> <start_turn> [N1 N2 ...]" >&2
  exit 2
fi
Ns="${@:-2 5 10}"

START_FILE=$(printf "%s/turn_%04d_80x50_deity.bin" "$DIR" "$START")
TRACE="$DIR/civ2_trace.log"
if [ ! -f "$START_FILE" ]; then echo "Missing $START_FILE" >&2; exit 1; fi
if [ ! -f "$TRACE" ]; then echo "Missing $TRACE" >&2; exit 1; fi

printf "%-10s %-30s %-30s\n" "N (range)" "bare" "--replay-frida"
printf "%-10s %-30s %-30s\n" "---------" "------------------------------" "------------------------------"

for N in $Ns; do
  END=$((START + N))
  END_FILE=$(printf "%s/turn_%04d_80x50_deity.bin" "$DIR" "$END")
  if [ ! -f "$END_FILE" ]; then continue; fi

  # --no-v4-bridge: bypass v4 binary engine bridge (it can hang on
  # specific civ-mid-game state; bridge gives slightly higher fidelity
  # but bare-vs-frida comparison is unaffected by its absence).
  node dump-server-state.js "$START_FILE" --turns "$N" --no-v4-bridge 2>/dev/null > /tmp/v4_bare.json &
  pid_bare=$!
  python snapshot-to-state-json.py "$END_FILE" > /tmp/real.json
  wait $pid_bare || true

  node dump-server-state.js "$START_FILE" --turns "$N" --no-v4-bridge --replay-frida "$TRACE" 2>/dev/null > /tmp/v4_frida.json

  bare=$(python state-diff.py /tmp/v4_bare.json /tmp/real.json 2>&1 | grep "Matched:" | tail -1)
  frida=$(python state-diff.py /tmp/v4_frida.json /tmp/real.json 2>&1 | grep "Matched:" | tail -1)
  printf "%-10s %-30s %-30s\n" "N=$N ($START→$END)" "$bare" "$frida"
done
