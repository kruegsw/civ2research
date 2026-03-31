# Game Logic Insights for Reimplementation

Living document. Updated during sniffing sessions with observations that inform the browser reimplementation. Focus is on BEHAVIOR and DESIGN, not raw byte data (see `byte_verification_plan.md` for that).

Source of truth hierarchy applies: decompiled C > observed behavior > inference.

---

## AI Behavior

### Movement & Targeting
- AI assigns `goto` (order 11) destinations to cities it hasn't diplomatically contacted — **fog-of-war cheat confirmed**. The AI reads the global game state directly, not its exploration map.
- AI uses two movement orders: `goto` (11) for multi-step pathing, `goto_ai` (27) for single-hop moves. The `goto_ai` destinations are always adjacent tiles, suggesting the AI re-evaluates each step.
- Multiple AI units converge on the same target coordinates, indicating a rally-point system (e.g., 3 Celtic warriors all goto (9,33) = Chicago).
- AI does NOT check land connectivity before assigning goto targets. Units march toward unreachable targets (peninsula cities) and get stuck. This is a **faithfully reproducible bug** — reproduce first, improve later.
- Transit state codes: -1200 (land movement animation), -600 (observed on sea units?), -800, -1400 (observed on various). Purpose of each TBD.

### Production
- AI switches production on city growth (e.g., Cardiff `build Warriors->Settlers` when size hits 2).
- AI production priorities shift based on game state — early game builds settlers/warriors, later builds military when threats detected.
- Unit created events show `home=` which tells us which city produced it.

### Diplomacy & Attitude
- Attitude values range observed: 10 (hostile) to 100 (friendly/max). Scale meaning not fully confirmed.
- France attitude toward player started at 10 (hostile), went to 20 after tribute, then to 100 after peace treaty. The jump from 20->100 seems abrupt.
- Zulu declared war despite having `peace` status — broke treaty. Gold jumped 156->206 right before war declaration (possibly tribute demand succeeded elsewhere).
- `border_friction` field exists but stayed at 0 during observed gameplay even with units near AI cities. May only increment during AI turn processing, or may require specific conditions.
- AI sends "Uncooperative Emissary" / "Enthusiastic Emissary" dialogs — title indicates disposition.

### Combat
- Order byte 16 (`assault`) appears on AI units right before combat — possibly an AI-specific attack order.
- Settlers with 0 attack still fight back defensively in combat (observed: Crusaders vs Settlers, settler dealt 2 damage).
- Damage is stored as accumulator (0 = full health, maxHp = dead). MaxHp in type table is RULES.TXT value * 10.
- Combat rounds are observable as individual HP changes in rapid succession (~680ms between rounds).

### Tech System
- **In-memory encoding**: per-civ tech_list[93] at civ struct offset 0x074. Each byte: **0xFF = not discovered**, **0-7 = has tech, acquired from civ N**. Self-researched techs store own civ index.
- **Save file encoding**: DIFFERENT — global bitmask at save offset 0x00A6, 100 bytes. Each byte is a bitmask where bit N = civ N has this tech. v3 parser handles this correctly.
- **New game init**: FUN_004a (block_004A0000.c:2715) sets ALL 100 tech slots to 0xFF, then FUN_004bf05b assigns starting techs with source = own civ index.
- **Starting tech algorithm** (block_004A0000.c:2729-2742): For each of 99 techs, if eligible: `rand() % (difficulty + 1)`. If non-zero, tech is granted. Chieftain (0) = never, Deity (5) = 83% chance per eligible tech. Eligibility requires `(human_mask & global_discovery_bitmask[tech]) != 0` — a human civ must already have the tech. This creates a cascading dependency during init.
- **Tech counter (offset 0x10)**: NOT a total tech count. Incremented by FUN_004bf05b (block_004B0000.c:6750-6751) only when `DAT_00655af8 != 0`. Used in research speed calculation (combined with offset 0x12) and AI diplomacy/combat decisions. All civs showed value=1 in fresh Deity game — timing of DAT_00655af8 relative to init needs further tracing.
- **Future tech counter (offset 0x11)**: Separate counter, only incremented for tech index 0x59 (89) or > 99. Used in science output: `future_techs * 5` added to research.
- **Tech trading**: FUN_004bf05b(receiving_civ, tech_id, giving_civ, 0, 0) — the tech byte stores which civ gave it.
- v4 transpiled blocks handle this correctly (1:1 C mapping). No code fix needed.

## Game Mechanics

### City Processing
- Wonder completion is **deferred** until the city is viewed/opened. Rush-buying sets shields to cost immediately, but the WONDER BUILT event fires only when city screen opens next turn.
- Hanging Gardens effect propagates to all cities immediately — Chicago unrest cleared when Washington's wonder completed.
- City growth resets food_box to 0. New cities start with 0 food, 0 shields.
- `improvements` bitfield: bit N = building N is present. Changes logged as `+Granary`, `-Library` etc.

### Turn Processing
- Turn order: all AI civs process in sequence (civ 0 through 7, skipping human), then human phase.
- Human civ appears to process twice — once for end-of-turn bookkeeping, then for active phase.
- AI turn processing is a burst: all gold, city, and unit changes happen within ~2ms per civ.
- `changes/poll = 0` when city dialog is open — game is paused during dialogs.

### Government
- All civs start in Anarchy, switch to Despotism on turn 1.
- Revolution: Despotism->Anarchy (instant on click), Anarchy->new_gov (after N turns).
- Government switch effects are immediate — Monarchy removes Despotism tile penalty, visible as `trade 3->5` in the same poll cycle.

### Science/Tax Rate Initialization (from decompiled source)
- **Default**: `new_civ()` sets sci=4 (40%), tax=4 (40%) for all civs (block_004A0000.c:2651-2652)
- **AI override** (line 2927-2930): `sci = DAT_006554fa[leader_id * 0x30] + 3`, `tax = 9 - sci`. Personality table at `DAT_006554fa`, stride 0x30 (48 bytes per leader). Signed byte — negative values produce low science.
- **Human player**: `FUN_004aa9c0()` (line 3607-3608) overrides with stored player defaults from `DAT_0064bc1a` (sci) and `DAT_0064bc1c` (tax), which default to sci=6, tax=4 (set at line 2179-2180).
- Constraint: `sci + tax + lux = 10` always enforced.
- Verified against live memory (session 4, Deity, 7 civs): all 7 rates match the formula exactly.

### Unit Orders
- Order mapping (from decompiled source):
  - 1=fortify (F key, in progress), 2=fortified (completed), 3=sleep (S key)
  - 4=build_fortress, 5=road (R key), 6=irrigate (I key), 7=mine (M key)
  - 8=transform (O key), 9=clean_pollution, 10=build_airbase
  - 11=goto, 27=goto_ai, 255=none
- I-key on forest = clear/plant (different action, same order byte 6 as irrigate? — needs recheck)
- Settler work orders depend on terrain context — same key produces different order bytes.

### Ships & Sea
- Trireme sinks when ending turn in open ocean (not adjacent to coast). Logged as UNIT KILLED with hp=0 and no enemy nearby. Game shows "Civ Rules: Triremes" dialog.
- Trireme `carry` field changes as units load/unload.

### New Game Initialization (from decompiled source, session 4)

Two distinct init paths exist in block_004A0000.c:

**Path A — Random map** (always runs):
1. `FUN_004aa9c0()` (line 3595) calls `new_civ()` for civs 0-7
2. `new_civ()` zeroes struct, sets gov=Despotism, sci=4, tax=4
3. Sets all 100 tech bytes to 0xFF (line 2716)
4. Random starting tech algorithm (lines 2729-2742), gated by `DAT_00655af8 != 0`
5. AI sci/tax rates overridden by leader personality table (lines 2927-2930)
6. Human sci/tax set from player defaults sci=6, tax=4 (line 3607-3608)
7. Settler creation at lines 2952-2959: 1 base + conditional extra based on `DAT_00655af8` thresholds (>0x14 = 2nd settler, >0x28 = warrior)

**Path B — Scenario/premade map** (conditional):
- Gated by `DAT_00631ee8 != 0` (block_00410000.c:4789)
- Calls `FUN_004a9785()` AFTER Path A completes
- Gives 4 hardcoded techs: Alphabet(1), Bronze Working(8), Ceremonial Burial(9), Horseback Riding(36)
- Creates starting city, sets gold = `(rand() % 50 + 25) * (difficulty + 1)`
- Sets `DAT_00655af8 = ((difficulty * 4 + 4) * 5 + 1)` at line 3187

**Verified in session 4**: Random map Deity game used Path A only. No civ had the 4 hardcoded techs, all had 0 gold. Path B was not executed (`DAT_00631ee8 = 0`).

**Key global: DAT_00655af8** — gates both starting tech assignment (line 2726) and the tech counter increment in FUN_004bf05b (line 6750). Incremented each turn (block_00480000.c:1816). Read as 1 in fresh game at Turn 0. Exact init timing vs new_civ() calls still needs tracing.

**Key global: DAT_00655b0b** — human player bitmask. Bit N = civ N is human. Read as 0x20 (civ 5) in session 4.

**Leader personality table: DAT_006554fa** — stride 0x30 (48 bytes per leader). First byte used for sci/tax formula. Signed byte values observed: -1 to 3. Full table structure TBD.

---

## Design Questions for Reimplementation

1. **AI fog-of-war cheat**: Reproduce faithfully for Phase 3 (headless fidelity). Consider making it optional or difficulty-dependent for Phase 4 (playable game).
2. **AI pathfinding bugs**: Units marching to unreachable targets. Reproduce for fidelity, but our Phase 4 could add connectivity checks.
3. **Deferred wonder completion**: Is this intentional design or an artifact of the city processing model? Our engine should handle it the same way.
4. **Attitude scale**: Is 100 = max friendly, or is it a default/neutral? Need more data points.
5. **Transit state codes**: What determines -1200 vs -600 vs -800 vs -1400? Is it unit type, terrain, or movement type?
6. **Combat randomness**: The round-by-round HP changes show the actual RNG outcomes. We need to verify our combat formula produces the same statistical distribution.
