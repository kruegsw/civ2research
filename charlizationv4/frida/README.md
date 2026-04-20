# Frida tracing (civ2_trace.log)

Per-function-call tracing of civ2.exe via Frida dynamic instrumentation.
Merges its output with the sniffer's `events.jsonl` into a single
`civ2_trace.log` per session.

## Prereqs

```bash
pip install frida frida-tools
```

## Usage

1. Start Civ2.exe.
2. Start the sniffer as usual (`python charlizationv4/sniff-game.py`) so a
   new `snapshots/game_YYYYMMDD_HHMMSS/` session dir is created.
3. In a second terminal, run:

   ```bash
   python charlizationv4/frida/frida_host.py
   ```

   The host auto-follows the newest session dir and attaches to civ2.exe.
   It writes merged events to `<session>/civ2_trace.log`.

4. Play. The trace log accumulates:
   - `{"source":"sniffer", ...}` lines — forwarded from `events.jsonl`.
   - `{"source":"frida", "kind":"call", "fn":"...", ...}` — function
     entries from the Frida agent.
   - `{"source":"frida", "kind":"return", "fn":"...", "retval":...}` —
     returns from functions tagged `readRet`.

5. Ctrl-C to stop the host (or close Civ2 — Frida detaches automatically
   when the process exits).

## Example events

```json
{"source":"sniffer","time_ms":15698.7,"turn":1,"event":"CITY_FOUNDED","cityIdx":0,"x":67,"y":7,"owner":2,"name":""}
{"source":"frida","kind":"call","fn":"create_city","va":"0x43f8b0","time_ms":1745168234123,"args":[134,14,2],"named":{"x":134,"y":14,"owner":2}}
{"source":"frida","kind":"return","fn":"create_city","retval":0,"dur_ms":3,"time_ms":1745168234126}
```

## Extending hooks

Edit `trace_civ2.js`, add entries to the `TARGETS` array:

```javascript
{ va: 0x00561234, name: 'some_function', args: 2, argNames: ['civSlot','something'] }
```

Use Ghidra (or grep `reverse_engineering/decompiled/`) to find addresses.
Re-run the host — the JS reloads on every attach.

## Time base

- Sniffer events carry `time_ms` from `time.perf_counter()` (monotonic,
  session-relative).
- Frida events carry `time_ms` from `Date.now()` (wall-clock ms).
- The host writes a `host_start` header record with both t0 values so
  downstream analysis tools can align the two time bases.

## Known limitations

- Addresses in `TARGETS` are hardcoded for the specific civ2.exe the
  user has. If the exe is patched or a different version, VAs may
  drift — verify via Ghidra.
- IAT-hooked functions (GDI/USER32) won't appear here — those go
  through `ddraw_proxy` into `ddraw_log.txt`.
- Frida adds a small per-hook overhead (~µs). For 50+ hooks on very
  hot functions, the game may slow perceptibly — drop hooks you don't
  need.
