# Phase 7: Complete Gap List — All JS Code Gaps That Can Be Fixed

Every discrepancy found across all 34 blocks, organized by category.
Items marked ✅ were fixed during this audit session.

---

## A. FIXED THIS SESSION (~35 fixes)

### Trade Routes (reducer.js)
1. ✅ Trade revenue: full amount to BOTH treasury AND research (was 50/50 split)
2. ✅ Trade diplomatic effect: bidirectional attitude -10 (was one-way)
3. ✅ Difficulty modifier on trade distance (Restless Tribes ×4/5, Deity ×5/4)
4. ✅ Railroad/Airport trade distance bonus (per-city check, not flat tech)
5. ✅ Pre-200AD revenue doubling without Alphabet/Writing
6. ✅ Communism tech -33% trade penalty
7. ✅ Democracy tech -33% trade penalty
8. ✅ Demand match owner-dependent formula variant
9. ✅ Trade route replacement value formula (continent/owner weighted)

### Diplomacy (diplomacy.js)
10. ✅ Patience threshold: war resets to base value
11. ✅ Gold-to-attitude: diminishing returns formula (50g=5att, then 100g batches)
12. ✅ Tech sell pricing formula added (techValue×20 with cascading multipliers)
13. ✅ Gold gift attitude: uses diminishing returns ×3/2
14. ✅ Tech gift attitude: uses techValue×4
15. ✅ PEACE_CLEARS mask: binary uses 0x2a60 (WAR|WAR_STARTED|0x200|HOSTILITY|INTRUDER)
16. ✅ Attitude range clamped to [0, 100] (was [-100, 100])
17. ✅ shouldProvoke() function added (attitude > 49 in contact-only status)
18. ✅ Government change: clear VENDETTA flag (was clearing EMBASSY)
19. ✅ Map sharing: also shares unit/city sight radius visibility
20. ✅ New civ attitude: difficulty-scaled for human targets

### Combat (combat.js)
21. ✅ Submarine defender selection: check air domain (was sea domain)

### Production (production.js)
22. ✅ Oil supply: global nuclear flag (anyoneHasTech, not per-civ)
23. ✅ Oil supply: continent modifiers (×3 for cont 17, +50% for (cont-1)%8==0)

### Movement (reduce/move-unit.js)
24. ✅ Goto cancellation on enemy sighting (non-air units)
25. ✅ Sentry wake on enemy sighting

### Scoring (spaceship.js)
26. ✅ Wonder score multiplier ×20 (was ×5)
27. ✅ Late-game science bonus (after turn 200: clamp(numAdvances×3, 0, 100))
28. ✅ Pollution penalty: per-polluted-tile ×10 (was global/numCivs)

### Healing (reduce/end-turn.js)
29. ✅ Near-city healing bonus: ground units within distance 3 get +1 (+2 with barracks)
30. ✅ Global warming severe degradation: tiles with many land neighbors get worse terrain + road/fortress cleared
31. ✅ Treasury cap [0, 30000]

### Espionage (espionage.js)
32. ✅ Bribe cost: check TARGET's government for Communism cap (was spy's)

### Building Sale (reducer.js)
33. ✅ Sell building: full shield cost refund (was half)

### City Turn (cityturn.js — prior session)
34. ✅ Railroad +50% food bonus
35. ✅ Treaty cleanup on civ death
36. ✅ Marco Polo contact-setting on wonder completion
37. ✅ Specialist auto-fill on growth + correct famine removal priority

---

## B. UNFIXED GAPS — Game Logic (fixable, not yet done)

### Combat System (combat.js, move-unit.js)
38. SDI should CANCEL missile attacks entirely when within 4 tiles, not just ×2 defense
39. Diplomat/spy at target tile can intercept and cancel combat entirely
40. Unit flag 0x10 second +50% attack bonus (elite/commando tier — verify if real)
41. HP weighting in defender selection should be gated on game_flags & 0x10
42. Post-combat AI retaliation (nearby units counterattack or settlers flee)

### Diplomacy — Full Evaluation Pipeline (diplomacy.js, ai/diplomai.js)
43. Full diplomacy evaluation (FUN_0045705e, 6616B) only ~25-30% ported — missing:
    - Tech desire calculation (military unit advantage with epoch scaling)
    - Tribute demand (multi-stage: treasury, difficulty, epoch, personality)
    - Unit-on-border threat detection
    - Nuclear threat evaluation (atom bomb parity)
    - Alliance opposition scoring (multi-factor third-party scan)
    - Attitude clamping ranges (different for vendetta/normal/allied)
44. AI alliance solicitation not ported (tech-for-alliance trades, crusade proposals)
45. AI attitude scoring missing 3-tier military ratio (4x/2x/1.5x), neighbor city assessment, leader personality multipliers
46. Tech era classification (ancient/industrial/modern) not ported
47. Reputation system differs: binary uses per-pair patience counter, JS uses global reputation score
48. Wonder-blocking in tech exchange (refuses tech if target has unbuilt wonder needing it)
49. Contact frequency formula: binary uses (year+civA+civB)&3, JS uses turnNumber%4
50. Betrayal threshold formula (counter×15 + vendetta/wonder bonuses) not ported

### Trade Route Details (reducer.js)
51. Random modifier on trade revenue (binary uses rand(), JS is deterministic — acceptable)
52. Wonder-group completion bonus (rare edge case)
53. Trade connectivity map (FUN_0055bbc0) not computed

### City Management
54. Building upkeep: binary sells building causing deficit (iteration order), JS sells cheapest
55. Building upkeep: binary applies gold_multiplier to refund, JS uses raw cost
56. City turn attitude scoring: 6 penalty categories per city turn (waste, corruption, size, discovery, trade, luxuries vs government benchmarks)
57. Government-change production reset for all cities (NOT PORTED)

### Scoring (spaceship.js)
58. Population score: binary includes secondary terms beyond city.size (bytes 74-75)
59. Victory type modifiers (Standard ×5/4, Fundamentalist ×4/5)
60. AI scenario scoring path

### Civ Init/Kill (init.js, diplomacy.js)
61. New civ tech granting: binary grants techs based on how many other civs know them; JS uses static no-prereq pool
62. Kill civ: destroyedCivRulesIds writes slot index instead of rules civ number
63. Kill civ: missing bribed-unit repatriation on death

### Scenario Events (events.js)
64. TRIGGERDEFENDER/TRIGGERRECEIVER both map to -4 in binary, JS uses -3 for all
65. "ANYUNIT" wildcard (-2) not supported in unit name resolution
66. Event change_money: binary clamps treasury to [0,30000] — JS now has cap but event handler may not
67. Event move_unit: binary only moves AI units with goto orders, JS teleports all units
68. Event change_terrain: binary destroys cities/units in region first, JS does not

### Movement & Visibility
69. Per-civ tile memory (fog-of-war snapshot per civ)
70. Extended attacker/air visibility radius (tiles 8-24 in city spiral)
71. Proximity-based treaty violation diplomatic incidents
72. Barbarian terrain recording
73. Allied territory repair during movement (deducts MP, heals)

### Unit Management (reduce/helpers.js)
74. Unit caps not enforced (2048 max, 1948 per-civ)
75. Transport loading two-pass logic (own units first, then allied)
76. Sea unit movement bonuses (Lighthouse/Nuclear Power/Magellan) may be incomplete

### Espionage (espionage.js)
77. Senate scandal on espionage incidents (Republic/Democracy → forced revolution)
78. Counter-intelligence strength formula differs (base 5/10 + difficulty bonus + rand()%6)
79. Airlift shot-down risk missing
80. Darwin's Voyage "revolution pending" flag for immediate second tech

### Barbarians
81. Continent matching for city-based barbarian spawning
82. War trigger uses city count instead of binary's militarism rating
83. Full barbarian unit AI (6.1KB FUN_005351aa) not ported

### Year Calculation
84. Year table should be difficulty-dependent (currently Prince-level only)

### Map/Terrain
85. Terrain type changes from irrigation/mining negative work values (e.g., irrigating plains→grassland)
86. Farmland creation from re-irrigation on irrigated+road tile
87. Special resource placement formula differs from binary

### Diplomacy Transactions (diplomacy.js)
88. City transfer: preserve and reassign trade routes (currently cleared)
89. Unit transfer: stack splitting for multi-unit stacks
90. Unit transfer: terrain-compatible placement validation (45-tile search)

### Build Checks (buildcheck.js)
91. Range >= 99 units need SpaceFlight tech check
92. Settler city-flag check for buildability
93. Spaceship part build order not enforced (requires prior parts)

### Research (research.js)
94. AI base research cost formula differs (binary: 14-diff for human, diff×2+6 for AI)
95. Bloodlust scenario flag (DAT_00655af0 & 8) scales cost by 4/5

---

## C. N/A — Not Applicable to JS Architecture

- Rules.txt parsing (JS hardcodes in defs.js)
- Win32 UI dialogs, DirectDraw rendering, sound/music
- Network protocol (binary uses DirectPlay; JS uses WebSocket)
- Scenario editor (RULES.TXT/EVENTS.TXT editors)
- SMEDS32 graphics engine (sprites, palettes, fonts, video)
- CRT library functions (memory, string, file I/O)
- Password system (server-authoritative auth in JS)
- CITYPREF.TXT autobuild (human players use direct UI)
- Tutorial/advisor messages (UI feature)
- Power graph display (150-turn history, display-only)
- Historian reports (display-only)

---

## Summary

| Category | Count |
|----------|-------|
| Fixed this session | 37 |
| Unfixed game logic gaps | 58 |
| N/A (architecture) | ~50+ |
| **Total discrepancies** | **~95** |
