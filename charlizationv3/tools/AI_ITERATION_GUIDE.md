# AI Fidelity Iteration Guide

Instructions for a Claude Code coordinator instance to iteratively improve the
JS Civ2 AI toward faithful reproduction of original Civ2.exe behavior.

---

## Goal

Make `engine/ai/*.js` produce gameplay that closely matches original Civ2 MGE
AI behavior. The source of truth is the Ghidra-decompiled binary in
`reverse_engineering/decompiled/block_*.c` (~225K lines of C across 34 files).
A function index lives at `reverse_engineering/decompiled/FUNCTION_INDEX.txt`.

## The Iteration Loop

Every cycle follows this pattern:

```
1. SIMULATE  →  Run headless simulation, capture log
2. ANALYZE   →  Read the log, identify the worst behavioral gaps
3. RESEARCH  →  Find the decompiled C function(s) governing that behavior
4. FIX       →  Port/rewrite the JS to match the decompiled logic
5. VERIFY    →  Re-run simulation, confirm improvement, check for regressions
6. COMMIT    →  Commit with descriptive message (but NEVER push)
```

Repeat until the simulation shows Civ2-realistic gameplay across 100+ turns.

---

## 1. SIMULATE

Run the headless simulator from `charlizationv3/`:

```bash
node tools/simulate.js --turns 100 --players 4 --seed 42 --verbose
```

Key flags:
- `--turns N` — longer runs expose late-game gaps (economy, military, diplomacy)
- `--seed N` — deterministic maps for before/after comparison
- `--verbose` — logs every action + AI debug output (essential for diagnosis)
- `--no-file` — print to stdout only (skip if you want a saved log)

The simulator:
- Creates a new game with `generateMap()` + `initNewGame()`
- Runs all-AI turns via `runAiTurn()` + `applyAction()` loop
- Logs per-turn state summaries, every action, combat results, tech discoveries
- Produces a **FINAL SUMMARY** (per-civ stats) and **AI BEHAVIOR ANALYSIS** (warnings)

Logs are saved to `tools/sim-logs/`.

## 2. ANALYZE

Read the simulation log output. Focus on:

### Critical failures (game-breaking)
- Civs never founding cities
- END_TURN rejections (units stuck with moves)
- Crashes or infinite loops
- Civs eliminated in first 20 turns (unless via fair combat)

### Behavioral gaps vs Civ2.exe
- **Unit diversity**: Civ2 AI builds a mix of offensive, defensive, and settler units. All-warrior armies = broken.
- **City placement**: First city on turn 0-1. 3-5 cities by turn 50. Sites should have good food/shield potential.
- **Tech progression**: Should follow meaningful paths (not random). Civ2 AI uses leader personality to weight tech choices.
- **Government evolution**: Should transition from despotism to monarchy/republic by ~turn 40-60.
- **Military behavior**: Should attack when advantageous (ATK*HP vs DEF*HP*terrain), retreat when outmatched. Should not leave units idle.
- **Worker improvements**: Settlers/engineers should build roads, irrigation, mines — not just cities.
- **Diplomacy**: Should establish contact, propose treaties, declare wars based on relative strength.
- **Economy**: Should balance tax/science rates. Should sell useless buildings. Should rush-buy strategically.
- **Production oscillation**: Cities should not flip between items every turn, losing shields.

### Warning signs in logs
- "stuck units" = units in sentry/fortify outside cities, never waking up
- "idle turns" = AI produced zero meaningful actions
- "REJECTED" actions = AI generating invalid actions (rule violation)
- All cities building the same thing = broken scoring

## 3. RESEARCH — Finding the Right Decompiled Code

### Key AI functions in the binary

| Function | Address | Size | File | Purpose |
|----------|---------|------|------|---------|
| `ai_unit_turn_master` | 0x00538a29 | 44,777B | block_00530000.c | Master unit dispatcher — THE central AI function |
| `ai_choose_city_production` | 0x00498e8b | 29,400B | block_00490000.c | Master production scorer |
| `ai_diplomacy_negotiate` | 0x00460129 | ~16KB | block_00460000.c | Negotiation engine |
| `ai_evaluate_diplomacy` | 0x0045705e | 6,616B | block_00450000.c | Foreign policy evaluation |
| `process_diplomatic_contact` | 0x0055d8d8 | 7,326B | block_00550000.c | Civ-to-civ contact handler |
| `ai_diplomacy_turn_processing` | 0x00560084 | large | block_00560000.c | Per-turn diplomacy entry |
| `FUN_004bc480` | 0x004bc480 | 1,066B | block_004B0000.c | Assess military posture (1-7) |
| `FUN_004bc8aa` | 0x004bc8aa | 753B | block_004B0000.c | Assess city defense (1-7) |
| `FUN_004bcb9b` | 0x004bcb9b | 1,071B | block_004B0000.c | Assess economy (1-7) |
| `FUN_004bcfcf` | 0x004bcfcf | 724B | block_004B0000.c | Assess diplomacy (1-7) |
| `FUN_004bd2a3` | 0x004bd2a3 | 770B | block_004B0000.c | Assess tax rate (1-6) |
| `FUN_004bdb2c` | 0x004bdb2c | 2,869B | block_004B0000.c | Calculate tech value |
| `FUN_004c09b0` | 0x004c09b0 | 417B | block_004C0000.c | Pick research goal |
| `FUN_0055f5a3` | 0x0055f5a3 | 558B | block_00550000.c | Choose government |
| `FUN_005351aa` | 0x005351aa | 6,102B | block_00530000.c | Barbarian AI behavior |

### Key data addresses (DAT_ → JS mapping)

See the plan file at `.claude/plans/declarative-toasting-church.md` for the
full DAT_ address mapping table. The most important ones:

- Civ struct base: `DAT_0064c6a2` + civ*0x594 → `gameState.civs[i]`
- City struct base: `DAT_0064f348` + city*0x58 → `gameState.cities[i]`
- Unit type defs: `DAT_0064b1ca` + type*0x14 → `UNIT_ROLE[type]`, `UNIT_ATK[type]`, etc.
- Leader personalities: `DAT_006554f8` + leader*0x30 → `LEADER_PERSONALITY[idx]`
- Tech advance data: `DAT_0062768a` + tech*0x10 → `ADVANCE_COST[tech]`
- Unit `ai_role` byte: offset 0x0C in unit struct — ASCII activity codes ('7','?','!','U','H','h','D','t','F','b','A','3','2','d')

### How to navigate the decompiled C

The files are raw Ghidra output. Variables named `DAT_XXXXXXXX` are global
memory addresses. Functions named `FUN_XXXXXXXX` are by address. Key patterns:

- `(&DAT_0064c6a2)[civ * 0x594 + offset]` = accessing civ struct field
- `(&DAT_0064f348)[city * 0x58 + offset]` = accessing city struct field
- `(&DAT_006560ef)[unit * 0x20 + offset]` = accessing unit struct field
- `FUN_0043d20a(city, building)` = `city.buildings.has(building)`
- `FUN_004bd9f0(civ, tech)` = `civs[civ].techs.has(tech)`
- `FUN_00453e51(civ, wonder)` = `hasWonderEffect(gameState, wonder)`

### Agent research tips

When dispatching an agent to read decompiled code:
1. Tell them the **function address** and **which block file** it's in
2. Tell them to search for the function start: `void FUN_00XXXXXX(` or `int FUN_00XXXXXX(`
3. Give them the DAT_ mapping table so they can translate addresses to JS fields
4. Tell them which JS file they'll be modifying and its current structure
5. The decompiled C is **ugly** — lots of casts, pointer arithmetic, goto. The agent should focus on the **logic flow** (what decisions are made based on what conditions) rather than trying to port syntax literally.

## 4. FIX — Agent Dispatch Patterns

### JS AI Architecture (7 files, ~7,100 lines)

| File | Lines | Purpose | Key exports |
|------|-------|---------|-------------|
| `index.js` | 88 | Orchestrator — runs phases in order | `runAiTurn()` |
| `data.js` | 228 | Per-turn analytics (continents, power, military) | `computeAiData()`, `hasWonderEffect()` |
| `strategyai.js` | 784 | 5 assessment functions (1-7 scores) | `assessStrategy()` |
| `econai.js` | 1168 | Tech selection, rates, government, economy | `generateEconActions()` |
| `prodai.js` | 1493 | City production scoring + selection | `generateProductionActions()`, `generateRushBuyActions()` |
| `cityai.js` | 975 | Settler site selection, worker improvements | `generateSettlerActions()` |
| `unitai.js` | 1436 | Military movement, combat, exploration, cleanup | `generateMilitaryActions()`, `generateCleanupActions()` |
| `diplomai.js` | 955 | Treaty proposals, war declarations, contact | `generateDiplomacyActions()` |

### Phase execution order (in index.js)

```
0. assessStrategy()     → advisory (no actions), returns strategy object
1. generateEconActions() → SET_RESEARCH, CHANGE_RATES, REVOLUTION
2. generateDiplomacyActions() → PROPOSE_TREATY, DECLARE_WAR, RESPOND_TREATY
3. generateProductionActions() → CHANGE_PRODUCTION per city
   generateRushBuyActions()    → RUSH_BUY per city
4. generateSettlerActions()    → BUILD_CITY, MOVE_UNIT (settlers), WORKER_ORDER
5. generateMilitaryActions()   → MOVE_UNIT (combat), UNIT_ORDER
6. generateCleanupActions()    → skip/fortify units not handled above
```

### The action system constraint

All AI output must be action objects validated by `engine/rules.js` and applied
by `engine/reducer.js`. The full list of ~32 action types is in `engine/actions.js`.
The AI cannot directly mutate game state — only emit actions.

### `handledUnits` Set

The orchestrator tracks which unit indices got actions from phases 1-5.
Cleanup (phase 6) skips these. This prevents cleanup from overwriting earlier
phases' move/build actions with skip/sentry.

### Parallel agent patterns

**Independent agents** (can run in parallel):
- Strategy + Data changes (no downstream consumers in same round)
- Unit AI + Production AI (different action types, different units)

**Dependent agents** (must run sequentially):
- If agent A adds new exports to `data.js` or `defs.js`, agents B-E that import those must run after A
- If changing the `index.js` orchestrator, run after all module changes

### Agent prompt template

When dispatching a coding agent, include:

1. **What to fix**: The specific behavioral gap from the simulation
2. **Which file(s) to modify**: Exact paths
3. **Which decompiled function(s) to read**: Address, block file, line range if known
4. **The DAT_ mapping**: So they can translate addresses
5. **What NOT to change**: Other files, the action system, the orchestrator pattern
6. **Verification criteria**: What the simulation should show after the fix
7. **Key engine APIs available**: `validateAction()`, `applyAction()`, helpers in `defs.js`
8. **Engine files to read for context**: `rules.js`, `reducer.js`, `actions.js`, etc. (paths relative to `engine/`)

### Common pitfalls for agents

- **Don't invent heuristics** — port the actual Civ2 logic. If the decompiled code checks `militaryPosture > 4`, use that threshold, not a made-up one.
- **The decompiled C uses lots of magic numbers** — these ARE the Civ2 values. Port them as-is with comments noting the source function.
- **Stale snapshot problem**: AI actions are computed against initial state but applied sequentially. Each unit should get at most one action. Use `handledUnits` to prevent conflicts.
- **Don't break the cleanup phase**: Every unit must end the turn with orders or 0 movesLeft, or END_TURN is rejected.
- **Test with the simulator**, not manual play. `node tools/simulate.js --turns 50 --seed 42 --verbose --no-file` is fast enough to iterate.
- **Be aware of action validation**: The AI can generate any action object, but `rules.js` will reject invalid ones. Check rules.js for what's legal.

## 5. VERIFY

After fixes, re-run the simulation with the **same seed** to compare:

```bash
# Before fix (already saved)
# After fix
node tools/simulate.js --turns 100 --players 4 --seed 42 --verbose
```

Compare:
- Cities founded per civ (should be 3-8 by turn 100)
- Unit diversity (should have 3+ unit types by turn 50)
- Tech count (should have 10-15 techs by turn 100)
- Combat events (AI should attack when advantageous)
- No regressions (existing behavior shouldn't get worse)
- No new warnings in AI BEHAVIOR ANALYSIS section

## 6. COMMIT

Commit changes with descriptive messages. **NEVER push** — the user handles
pushes. Include what gap was fixed and what simulation improvement was observed.

---

## Priority Queue (known gaps, ranked)

Update this list as gaps are fixed or new ones discovered.

### P0 — Game-breaking
1. ~~Cleanup phase overwrites earlier actions~~ (FIXED: handledUnits Set)
2. ~~END_TURN rejections~~ (FIXED: force-skip retry in server.js)
3. ~~First city takes 9+ turns~~ (FIXED: immediate founding in cityai.js)

### P1 — Major behavioral gaps
4. **Stuck units outside cities**: Units get sentry/fortify outside cities and never wake up. Need wake-up logic (proximity to enemy, periodic re-evaluation).
5. **Low unit diversity**: AI builds almost exclusively Warriors. Production scoring doesn't differentiate roles well enough. Port `FUN_00498e8b` scoring.
6. **No tile improvements**: AI settlers found cities but workers don't build roads/irrigation/mines. `generateSettlerActions()` worker section needs work.
7. **No attacks**: AI units don't initiate combat even when advantageous. Port combat evaluation from `FUN_00538a29`.
8. **Government stagnation**: AI stays in Despotism forever. Port `FUN_0055f5a3` government choice.

### P2 — Meaningful behavior gaps
9. **Tech selection quality**: AI picks techs somewhat randomly. Port personality-weighted selection from `FUN_004bdb2c` + `FUN_004c09b0`.
10. **No exploration**: Units don't seek unexplored territory. Port explorer behavior from unit AI master.
11. **Diplomacy quality**: Treaties proposed/rejected without realistic evaluation. Port `FUN_0045705e`.
12. **Production oscillation**: Still some flip-flopping despite stickiness fix. Need full Civ2 scoring port.
13. **Economy management**: Tax/science rates not optimized. Port `FUN_004bd2a3` rate assessment.

### P3 — Polish
14. Naval AI (transport loading, sea movement)
15. Air unit AI (bomber/fighter behavior)
16. Diplomat/spy AI (infiltration targeting)
17. Space race production priorities
18. Barbarian-specific AI behavior (`FUN_005351aa`)
19. Wonder building priorities

---

## Reference: Engine File Quick Guide

Files the AI depends on (agents may need to read these for context):

| File | Key exports | Purpose |
|------|------------|---------|
| `engine/defs.js` | UNIT_NAMES, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_DOMAIN, UNIT_ROLE, UNIT_MOVE_POINTS, UNIT_PREREQS, IMPROVE_NAMES, IMPROVE_PREREQS, IMPROVE_MAINTENANCE, ADVANCE_NAMES, ADVANCE_PREREQS, WONDER_NAMES, WONDER_COST, GOVT_INDEX, CIV_COLORS, MOVEMENT_MULTIPLIER, BUSY_ORDERS, TERRAIN_DEFENSE, etc. | All game constants |
| `engine/rules.js` | `validateAction()` | Validates any action before application |
| `engine/reducer.js` | `applyAction()` | Applies validated action to state, returns new state |
| `engine/actions.js` | Action type constants + docs | The ~32 action types |
| `engine/movement.js` | `resolveDirection()`, `getMoveCost()` | Movement cost calculations |
| `engine/production.js` | `getProductionCost()`, tile yield functions | City production/yield math |
| `engine/happiness.js` | `computeHappiness()` | Full happiness calculation |
| `engine/research.js` | `getAvailableResearch()`, `calcResearchCost()` | Tech tree queries |
| `engine/combat.js` | Combat resolution helpers | ATK/DEF/HP calculations |
| `engine/pathfinding.js` | `bfs()`, path utilities | BFS pathfinding |
| `engine/state.js` | `createAccessors()`, tile conversion | Map accessor factory |
| `engine/init.js` | `initNewGame()` | Game initialization |
| `engine/visibility.js` | LOS/visibility calculations | What each civ can see |
| `engine/utils.js` | `getGovernment()` | Government helper |

---

## Lessons Learned

_Update this section as you discover what works and what doesn't._

1. **Always use `--seed 42`** (or another fixed seed) when comparing before/after. Random seeds make it impossible to tell if behavior changed or just the map.
2. **Run `--verbose`** when diagnosing — the debug log from AI modules (`[debug]` lines) shows why decisions were made.
3. **Parallel agents work well when files are independent** — e.g., prodai.js and unitai.js can be rewritten simultaneously. But coordinate if they share new imports from data.js/defs.js.
4. **Port thresholds and magic numbers verbatim** from the decompiled C. Civ2's AI was tuned over years; our invented heuristics are worse.
5. **The simulator is the single source of truth** for whether a change helped. Don't trust "it looks reasonable" — measure it.
6. **Agent context limits are real** — the decompiled C functions can be 500-1000+ lines. Give agents specific line ranges, not "read the whole file." For the 45KB `ai_unit_turn_master`, split into sections (settler behavior, combat, exploration, etc.) and dispatch separate agents.
7. **Check `rules.js` before generating new action types** — the AI can only emit actions that pass validation. If the decompiled AI does something our action system doesn't support, we need to add support first.
