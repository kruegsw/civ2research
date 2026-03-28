# Game Initialization Sequence

> **Note:** This document uses a single observed session as an example (2026-03-28, Americans,
> Deity, Normal map, 5 civs). The **mechanisms** described (memory write order, struct layout,
> world gen timing, turn processing sequence) are universal and apply to all games. The
> **specific values** (unit positions, civ assignments, research amounts, seed) are
> session-specific and will differ each game.

## Timeline

| Time (ms) | Event |
|-----------|-------|
| ~0 | Process start, sniff-game.py begins polling at ~4500 Hz |
| ~4559336 | World generation fires — first memory writes |
| ~4559341 | World gen complete (~4.3ms total burst) |
| ~4559341+ | 3 fields begin cycling continuously (animation/timer) |
| ~5558759 | Turn 1 begins, snapshot saved |
| ~5558760 | AI civs process (Civ 0, Civ 4) |
| ~5558762 | Human turn begins (Civ 5) |

World gen triggered by clicking OK on "Select Your City Style" dialog.
"In the Beginning" dialog appeared ~4ms after world gen. OK on that dialog triggered Turn 1 at +999s.

---

## World Generation Memory Writes

Two write batches, ~2ms apart:

### Batch 1 (~4559336ms)
```
Civ 5: beakers 0→65535
Civ 6: gov Anarchy→Despotism, beakers 0→65535, tax 0%→40%
Civ 7: gov Anarchy→Despotism, beakers 0→65535, sci 0%→40%, tax 0%→40%
```

### Batch 2 (~4559338ms)
```
Civ 0: gov Anarchy→Despotism, beakers 0→65535, sci 0%→40%, tax 0%→40%
Civ 1: gov Anarchy→Despotism, beakers 0→65535, sci 0%→40%, tax 0%→40%
Civ 2: gov Anarchy→Despotism, beakers 0→65535, sci 0%→30%, tax 0%→60%
Civ 3: gov Anarchy→Despotism, beakers 0→65535, research 0→62, sci 0%→40%, tax 0%→50%, techs 0→1
Civ 4: gov Anarchy→Despotism, beakers 0→65535, research 0→39, sci 0%→20%, tax 0%→70%, techs 0→1
Civ 5: gov Anarchy→Despotism, research 0→39, sci 0%→40%, tax 0%→40%, techs 0→1
Civ 6: research 0→70, sci 0%→20%, tax 40%→70%, techs 0→1
UNIT CREATED: Settlers (civ 3) at (62,32) home=255
UNIT CREATED: Settlers (civ 4) at (39,39) home=255
UNIT CREATED: Settlers (civ 5) at (39,9) home=255
UNIT CREATED: Settlers (civ 6) at (70,10) home=255
UNIT CREATED: Settlers (civ 4) at (39,39) home=255
```

### Batch 3 (~4559341ms)
```
Civ 5: sci 40%→60%
UNIT CREATED: Settlers (civ 5) at (39,9) home=255
```

---

## Civ Initialization Table

| Civ | Type  | Gov init    | beakers→ | research | sci% | tax% | techs | Settlers |
|-----|-------|-------------|----------|----------|------|------|-------|----------|
| 0   | AI    | →Despotism  | 65535    | —        | 40%  | 40%  | —     | — |
| 1   | AI    | →Despotism  | 65535    | —        | 40%  | 40%  | —     | — |
| 2   | AI    | →Despotism  | 65535    | —        | 30%  | 60%  | —     | — |
| 3   | AI    | →Despotism  | 65535    | 62       | 40%  | 50%  | 1     | (62,32) |
| 4   | AI    | →Despotism  | 65535    | 39       | 20%  | 70%  | 1     | (39,39) |
| 5   | HUMAN | →Despotism  | 65535    | 39       | 60%  | 40%  | 1     | (39,9) ×2 |
| 6   | AI    | →Despotism  | 65535    | 70       | 20%  | 70%  | 1     | (70,10) |
| 7   | AI?   | →Despotism  | 65535    | —        | 40%  | 40%  | —     | — |

**Player = Civ 5 (HUMAN / Americans)**

### Field interpretations

- **beakers→65535** = 0xFFFF sentinel — "no current research target" initialized value, NOT accumulated beakers
- **research N** = beakers accumulated toward current research tech (randomized per civ at world gen)
- **techs→1** = likely a "bonus tech received" flag or a specific tech-count field, NOT total tech count
  - Player (Americans) has 3 default techs (Irrigation, Mining, Roads) which did NOT appear as techs→3
  - Civs 0,1,2,7 got techs=0; civs 3,4,5,6 got techs=1
  - Hypothesis: this field tracks "extra random techs assigned beyond civ defaults"
  - **TODO:** identify what tech was assigned to civs 3,4,5,6 (index not captured)

### Open questions / anomalies

1. **"chieftain" in snapshot filename** — `turn_0001_80x50_chieftain.bin` but Deity was selected
   - Difficulty byte at 0x00655B02 may be misread by sniff-game.py, or maps differently than expected
   - **TODO:** verify difficulty byte address and encoding

2. **Civs 0,1,2,7 have no Settlers** — 3 of these are likely Barbarians + 2 inactive/padding slots
   - Civ 0 = Barbarians (strong Civ2 convention) — no Settlers makes sense
   - Civs 1,2,7 = unclear; may be unassigned slots in a 5-civ game (8 slots total allocated)

3. **Duplicate Settlers creates** — Civ 4 Settlers at (39,39) and Civ 5 Settlers at (39,9) each appear twice
   - Civ 5 duplicate confirmed as 2 actual Settlers (player has 2 at Deity difficulty ✓)
   - Civ 4 duplicate may also be a second unit OR a write artifact

4. **Civ 5 beakers→65535 appeared in Batch 1, before gov change in Batch 2** — suggests init
   happens in two passes: first "beakers" field, then full struct write

5. **3 persistent changes/poll** after world gen, before Turn 1
   - These 3 fields cycle every poll (~0.2ms) even while modal dialog is open
   - Hypothesis: active unit animation frame counter(s) for the blinking Settlers

---

## Turn 1 Start

Triggered at ~5558759ms (clicking OK on "In the Beginning" dialog).

### Turn order observed
```
Turn 1 | Civ 0 (AI)   → no unit movements logged
Turn 1 | Civ 4 (AI)   → Settlers (civ 3): (62,32)→(64,32) VETERAN, Settlers (civ 4): (39,39)→(37,39) VETERAN
Turn 1 | Civ 5 (HUMAN)→ Settlers #2 at (39,9) processing begins
```

Notable: Civ 1, 2, 3, 6, 7 not explicitly logged in turn order — either processed silently or are inactive.

### AI rate adjustments at Turn 1 start
```
Civ 0: sci 40%→60%, tax 40%→20%
Civ 3: sci 40%→60%, tax 50%→30%
Civ 4: sci 20%→40%, tax 70%→50%
```
AI civs rebalance their sci/tax rates at start of their first turn (advisor function).

### AI Settlers are VETERAN
Both Civ 3 and Civ 4 Settlers logged as VETERAN on Turn 1. This may be:
- Deity/higher difficulty bonus (AIs start with veteran units)
- All starting Settlers are veteran by default in this version

**Note for future log readers:** `VETERAN!` appearing on a unit line in the log does NOT
mean the unit was just promoted. sniff-game.py logs this flag whenever the veteran bit is
set in the unit struct — it reflects the unit's current state, not a change event.
All starting Settlers (including the human player's) appear as VETERAN at Deity difficulty.

### Player starting state (Turn 1, 4000 B.C.)
- **2 Settlers** at (39,9) — both same tile
- **10,000 people** (standard 4000 B.C. start)
- **0 Gold**
- **Starting techs:** Irrigation, Mining, Roads (from "In the Beginning" dialog text)
- **Map:** 80×50 (confirmed from snapshot filename — note: 80 wide × 50 tall, not 50×80)

### Ambiguous log line: "Settlers (civ 5): VETERAN!" on Turn 2

At Turn 2 start the log shows `Settlers (civ 5): VETERAN!` with no coordinate change.
This is likely a polling artifact — sniff-game.py detected the veteran bit set on the
player's Settler without an associated position change. Not a meaningful game event;
ignore bare `VETERAN!` lines that have no move coordinates attached.

### Change count
- Pre-Turn 1: 3 changes/poll (animation only)
- Turn 1 active: 7 changes/poll (3 animation + 4 turn-state fields)

---

## Snapshot File

`turn_0001_80x50_chieftain.bin` — saved at start of Turn 1
- Path: likely in `charlizationv4/` or a snapshots subfolder
- Size: unknown — contains full memory snapshot of tracked regions at turn start
- "chieftain" label is a discrepancy — game was started at Deity difficulty
