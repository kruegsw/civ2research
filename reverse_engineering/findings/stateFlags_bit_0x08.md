# civ_struct stateFlags bit 0x08 analysis

**Semantic:** "Government assignment transaction complete" / "gov type slot
is valid and committed." NOT merely "recovered from revolution" as the
parser.js label suggests.

## Write sites

One SET site only: `FUN_0055c69d` at `block_00550000.c:5115`:

    if (param_2 != 0) {
        *(ushort *)(&DAT_0064c6a0 + param_1 * 0x594) |= 8;
    }

Bulk CLEAR site at `FUN_004741be` (game-load, `block_00470000.c:2214-2216`):
clears mask `0xff96` across civs 1..7 (includes bit 0x08).

## Callers of FUN_0055c69d

- `FUN_0040e3b1` (block_00400000.c:3743) — post-anarchy human gov assign
- `handle_incident_terror` (block_004C0000.c:1807) — senate scandal, clears
- `handle_city_disorder` (block_004E0000.c:5861) — city revolt, clears
- `FUN_0055f5a3` (block_00550000.c:5974) — gov evaluator result
- `FUN_00560084` (block_00560000.c:25, 31, 40) — **per-turn per-civ processor**
- `FUN_00560d95` (block_00560000.c:377) — diplomacy senate scandal

## FUN_00560084 per-turn logic (relevant subset)

    void FUN_00560084(int civ) {
      stateFlags &= 0xffb7;  // clear bits 0x48
      if ((&DAT_0064c6b5)[civ * 0x594] == '\0') {   // byte at civ+0x15 == 0
        if (!isHuman(civ) || (turn & 3) != 0) {
          if ((turn & 3) == 0 || FUN_00453e51(civ, 0x13) != 0) {
            FUN_0055c69d(civ, 1);    // SET bit 0x08
            if (isHuman(civ)) stateFlags &= 0xfffe;  // clear bit 0x01
          }
        }
        else if ((stateFlags & 1) == 0) {
          FUN_0055c69d(civ, 1);    // SET bit 0x08
        }
      }
      // senate override toggle (bit 0x04)
      if (civ != 0) {
        rand() % 100 -> civ + 0xB6  (unknown field)
        if (rand() % 3 == 0) stateFlags ^= 4;   // toggle bit 0x04
      }
      // ... more per-civ tick processing
    }

## Open questions

- What is the byte at civ_struct +0x15? The branch gate condition. Not in
  the byte_verification_plan yet.
- What is `FUN_00453e51(civ, 0x13)`? The second gate.
- Why does bit 0x08 get set for civ 7 on turn 1 of a fresh game but NOT
  for civ 2 or civ 5 (also AI civs founding their first city)?

Open-question resolution is the last 10% to port this bit's behavior
fully. The first 90% is: implement `FUN_00560084`'s per-turn tick in v3
as part of `processCivTurnStart` / `END_TURN`.

## civ_struct +0x15 byte resolved

Semantic: **Government transition state**.
- `0` = idle / normal (gate in FUN_00560084 opens)
- `1` = new civ initialized (set at `new_civ` / FUN_004a7ce9 line 2650)
- `2` = capital established (set at FUN_004a7ce9 line 3363 after
  `FUN_004bd9f0(civ, 0x36) != 0` — civ has Palace at city idx 54)

Also written raw via `FUN_00556230` (block_00550000.c:4913) as a
generic state setter.

## FUN_00453e51(civ, 0x13) resolved

```c
undefined4 FUN_00453e51(char civ, int tech_id) {
  // skip special-case branch for tech 0x14 with scenario flags
  int city_idx_or_unit = thunk_FUN_00453e18(tech_id);
  if (city_idx_or_unit < 0) return 0;
  if ((&DAT_0064f348)[city_idx_or_unit * 0x58] == civ) return 1;
  return 0;
}
```

`DAT_0064f348` is `city[0].owner` (city struct base 0x64f340 +
offset 0x08 = owner field). So this checks: "is city at index
`FUN_00453e18(0x13)` owned by this civ?"

`FUN_00453e18(0x13)` maps tech id 19 to some city index. Possibly:
- "Which city built the wonder tied to tech 19?" OR
- "Which city owns/first-researched tech 19?"

Tech 19 = Electronics in the alphabetized tech table. Irrelevant to
turn 1, so FUN_00453e18(0x13) almost certainly returns a sentinel
(-1 or similar) on turn 1 → `FUN_00453e51` returns 0 for all civs on
turn 1 → the `(turn & 3 == 0 || FUN_00453e51(...) != 0)` gate in
FUN_00560084 evaluates to FALSE on turn 1.

## So how does civ 7 get bit 0x08 on turn 1?

Outstanding mystery. Given:
- Turn 1: `(1 & 3) = 1 ≠ 0` → second-clause must be true
- `FUN_00453e51(7, 0x13)` almost certainly returns 0 for all civs at
  turn 1 (no Electronics yet, no wonder built)

Possible explanations:
1. A DIFFERENT call site sets bit 0x08 for civ 7 specifically at
   turn 1. FUN_00560084 isn't the only per-turn write path. There
   are 8 callers of FUN_0055c69d — one of the others fires.
2. An init-path call to FUN_0055c69d fires between turn 1 snapshot
   capture and turn 2 snapshot capture, for civ 7 specifically,
   tied to late-init of civs whose starting city isn't founded at
   the Phase-5 `new_civ()` time.

Worth further investigation only if the mismatch becomes a blocker.
For now, treat as a single known gap.
