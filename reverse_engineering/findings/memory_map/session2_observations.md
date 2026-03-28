# Session 2 Observations — Game State Analysis

Deity, 3 civs, 80×50 map. Captured 2026-03-28.

---

## Unit Movement: (-1200, -1200) Transit State

When a unit moves, the game briefly sets its position to **(-1200, -1200)** before
placing it at the destination:

```
Settlers (civ 5): (22,34)→(-1200,-1200)   ← "picked up"
Settlers (civ 5): (-1200,-1200)→(23,33)   ← "placed down"
```

-1200 (0xFB50 as i16) is likely a sentinel meaning "unit in transit / being animated".
This happens for every move, not just founding. Visible at our ~4000 Hz polling rate.

**Implication:** When reading unit positions, treat (-1200, -1200) as "currently moving".

---

## Turn Processing Order

Turn 2 showed this sequence:
```
Turn 2 | Civ 5 (HUMAN)    ← end-of-turn processing for human
Turn 2 | Civ 3 (AI)        ← AI civ processes
Turn 2 | Civ 5 (HUMAN)    ← human gets control back
```

The human civ appears **twice** — once at the start (end-of-turn bookkeeping)
and again after all AI civs process (active unit phase begins).

---

## Beakers Sentinel: 0xFFFF = No Research Target

- World gen sets all civs to beakers=65535 (0xFFFF)
- Selecting a research target changes it to 1 (accumulated beakers)
- `Civ 2: beakers 65535→1` happened when AI selected research on Turn 2
- `Civ 5: beakers 65535→1` happened when human selected from tech picker dialog

---

## AI Behavior (Turn 2)

- **Civ 2:** Earned 1 gold (from Babylon city), started research (beakers 65535→1)
- **Civ 3:** Moved Settler from (34,10) to (33,11) — heading SW, still exploring

---

## Changes/Poll as Game State Indicator

| State | Changes/poll | Notes |
|-------|-------------|-------|
| City window open | 0 | Game fully paused during city view |
| Turn 1, pre-city | 0 | No animation until unit active |
| Settler active | 6 | Animation counters cycling |
| After research selected | 8 | Additional fields cycling |
| After goody hut (50g) | 11 | More state cycling |

The count increases as more game objects exist. Could be useful for detecting
game state (paused vs active vs AI processing).

---

## Goody Hut Reward

Moving onto a goody hut tile:
1. Unit position goes to (-1200,-1200) transit
2. Unit placed at destination
3. Reward applied: `Civ 5: gold 0→50`
4. Dialog shown: "Village" (540×152)

Gold change happens in the same poll cycle as unit placement.

---

## City Founding Sequence (Detailed)

1. Press B → `NEW CITY: (civ 5) at (22,34)` — city struct written immediately
2. Second Settler repositioned via (-1200,-1200) transit → (23,33)
3. Founding Settler consumed: `UNIT KILLED: Settlers (civ 5) at (22,34)`
4. Changes/poll goes from idle to active

---

## City Production: Warriors (Turns 2-6)

Washington producing Warriors (cost 10 shields):

| Turn | Shields | Change | Note |
|------|---------|--------|------|
| T2 | 0→2 | +2 | Production started |
| T3 | 2→4 | +2 | |
| T4 | 4→6 | +2 | |
| T5 | 6→8 | +2 | |
| T6 | 8→0 | +2 (=10 total) | Warriors completed, shields reset |

**Warriors cost = 10 shields confirmed.** (RULES.TXT cost=1, ×10 shield rows = 10)

The snapshot `shld` field stores **accumulated** shields, not the threshold.
On completion, shields reset to 0 (or overflow if excess).

### Shield Overflow

Babylon (Civ 2, AI) also built Warriors with 3 shields/turn:
```
shld: 0→3→6→9→1→4
```
At shld=9, city produced 3 more = 12 total. Warriors costs 10.
**2 shields carried forward** (12-10=2, but shows as 1 — may round down or lose 1).

### Unit Home City

- `UNIT CREATED: Warriors (civ 5) at (22,34) home=1` — home=city index
- Starting Settlers had `home=255` — sentinel for "no home city"

---

## AI Behavior (Turns 2-6)

### Civ 2 (Babylon)
- Income: +1 gold/turn, +3 shields/turn, +3 trade/turn
- Built Warriors by Turn 4-5, set order to sentry→fortress (fortify)
- beakers 65535→65 on Turn 5 — started research with 65 beakers (not 0!)
  This may mean beakers accumulate even without a target, or AI selected
  research mid-turn and got a burst

### Civ 3 (Berlin)
- Founded Berlin on Turn 3 at (33,11)
- Adjusted rates: sci 60%→50%, tax 30%→40% (after founding)
- Earning +1 gold/turn from Turn 6
- research went DOWN 34→33 on Turn 3 — possibly recalculated on city founding

---

## Food Accumulation

| City | Rate | Notes |
|------|------|-------|
| Washington (civ 5) | +2/turn | Size 1 |
| New York (civ 5) | +1/turn | Size 1, founded Turn 4 |
| Babylon (civ 2) | +2/turn | AI city |
| Berlin (civ 3) | +2/turn | AI city, founded Turn 3 |
