# Deep Dive: FUN_0059062c (move_unit) vs JS Implementation

**Binary function**: `FUN_0059062c` at 0x0059062C, 17,963 bytes (~1,230 lines of decompiled C)
**JS files**: `engine/reduce/move-unit.js`, `engine/movement.js`, `engine/rules.js`, `engine/combat.js`

---

## Architecture Overview

The binary has a **single monolithic function** that handles ALL movement logic in one place:
guard checks, destination calculation, domain-specific rules, ZOC, diplomat/spy actions,
caravan trade, allied repair, movement cost, probabilistic movement, combat initiation,
actual tile update, visibility, transport, air fuel, trireme sinking, goody huts, LONGMOVE
tracking, and multiplayer sync.

The JS splits this across:
- `rules.js:validateAction()` — pre-move validation (ZOC, domain checks, transport capacity)
- `reduce/move-unit.js:handleMoveUnit()` — actual state mutation (combat, movement, goody huts)
- `movement.js:moveCost()` — terrain cost calculation
- `movement.js:calcEffectiveMovementPoints()` — damage-based MP reduction
- `movement.js:isZOCBlocked()` — zone of control check
- `movement.js:checkTriremeSinking()` — trireme death check (called from end-turn.js)
- `movement.js:checkAirFuel()` — air unit fuel (called from end-turn.js)
- `combat.js:resolveCombat()` — round-by-round combat
- `combat.js:calcStackBestDefender()` — best defender selection

---

## Branch-by-Branch Comparison

### 1. Reentry Guard (Binary lines 112-124)

**Binary**: Sets `DAT_00634ca0 = 1` to prevent recursive calls. Returns 0 if guard already set,
unit is dead (`DAT_0065610a == 0`), or unit coordinates < 0.

**JS**: No explicit reentry guard. The server-authoritative model prevents concurrent mutations
since the reducer is synchronous.

**Verdict**: N/A (different architecture). No functional gap.

---

### 2. Destination Calculation (Binary lines 134-143)

**Binary**: If `direction >= 0`, computes dst via direction offset tables (`DAT_00628350`/`DAT_00628360`)
with horizontal wrapping via `FUN_005ae052`. If `direction < 0`, dst = src (in-place operations like
paradrop landing).

**JS**: `resolveDirection()` in movement.js handles the 8-direction offset tables with wrapping.
The `direction < 0` case (in-place action) is not used since JS dispatches paradrop/airlift as
separate action types.

**Verdict**: MATCH for normal movement. The direction < 0 path is irrelevant (different action model).

---

### 3. Terrain/Owner Lookup (Binary lines 144-191)

**Binary**: Gets source terrain, destination terrain, checks `is_ocean` (terrain == 10), gets
destination tile owner via `FUN_005b8da4`, gets top unit at dest via `FUN_005b2e69`, gets city
at dest via `FUN_0043cf76`. Sets `DAT_006ad0d0` (is_active_player) for UI gating.

**JS**: `handleMoveUnit()` does equivalent lookups: `mapBase.getTerrain()`, `state.units` scanning
for enemies, `state.cities.find()` for enemy city. Visibility owner calculation uses `tile.tileOwnership`.

**Verdict**: MATCH. Functionally equivalent using different data structures.

---

### 4. Multiplayer Map Lock (Binary lines 163-173)

**Binary**: If save_version > 2 AND multiplayer AND human civ, calls `FUN_00594d42(mp_lock_map)`.
If lock fails, skips the move. After move completes, calls `FUN_0059511c(mp_unlock_map)`.

**JS**: Not implemented. Server-authoritative WebSocket model eliminates need for tile locking.

**Verdict**: N/A (architectural difference). No gap.

---

### 5. ZOC Check (Binary lines 194-211)

**Binary**: For land units (domain == 0) when no unit at destination:
- Calls `FUN_005b4d8c` twice: checks ZOC at source tile AND destination tile.
- If BOTH are blocked, AND not on ocean, AND unit lacks amphibious flag (flags & 4 == 0):
  reject move.
- The ZOC check function examines adjacent enemy combat units.

**JS**: `isZOCBlocked()` in movement.js:
- Checks if unit ignores ZOC (`UNIT_IGNORE_ZOC[type]`).
- Checks if source is adjacent to enemy combat unit of same domain.
- If so, checks if destination has friendly presence (unit or city) or is NOT adjacent to enemy.
- Called from `rules.js:validateAction()`.

**Discrepancies**:
1. **Binary checks domain match**: `FUN_005b4d8c` checks for enemy units on same domain.
   JS `hasEnemyCombatUnit()` also checks `UNIT_DOMAIN[u.type] === domain`. MATCH.
2. **Binary has "on ocean" exception**: If source tile is ocean (terrain==10), ZOC doesn't apply.
   JS does not explicitly check for this — but land units on ocean would be on a transport,
   and the transport boarding/disembark logic runs first. **MINOR GAP**: If a land unit is
   somehow on ocean (carried), the binary exempts them from ZOC. JS doesn't have this check
   explicitly but effectively doesn't need it since land-from-ocean is handled as disembark.
3. **Binary has amphibious flag exception**: Units with `flags & 4` skip ZOC. JS doesn't check
   this flag. **GAP**: If any unit type has the amphibious flag, it would still be ZOC-blocked in JS.
   In standard Civ2, Marines (type 12) have the amphib flag. JS would incorrectly block Marines
   from moving through enemy ZOC when landing from sea.

**Verdict**: PARTIAL MATCH. Missing amphibious flag ZOC bypass for Marines.

---

### 6. Diplomat/Spy Entering Enemy City (Binary lines 212-231)

**Binary**: If unit role == 7 (diplomat/spy) AND destination has enemy city:
- If city owner is not the same civ AND city owner is human:
  Calls `FUN_0058fedb` (diplomat_vs_city) which opens the bribery/sabotage dialog.
- This immediately diverts the move — the unit enters the city and triggers espionage.

**JS**: Diplomat/spy entry is handled as separate action types (`STEAL_TECH`, `SABOTAGE_CITY`,
`INCITE_REVOLT`, etc.) dispatched from the client. `rules.js` allows non-combat units (type 46/47)
to enter enemy cities via a specific exemption at line 152.

**Verdict**: DIFFERENT MODEL. Binary auto-triggers espionage dialog on move. JS requires explicit
espionage action after positioning. Functional outcome is the same (player chooses espionage action),
but the interaction flow differs.

---

### 7. Caravan/Freight Entering City (Binary lines 232-257)

**Binary**: If unit role == 6 (caravan/freight) AND destination has foreign owner:
- If there's a city at dest: calls `FUN_004c6bf5` (caravan_trade) for trade route.
- If there's a unit but no city: calls `FUN_004c9ebd` (caravan_vs_unit) for supply delivery.

**JS**: Caravan help wonder is a separate action type (`CARAVAN_HELP_WONDER`). Trade route
establishment is handled via `ESTABLISH_TRADE` action. No auto-trigger on movement.

**Verdict**: DIFFERENT MODEL. Same as diplomat — binary auto-triggers, JS requires explicit action.

---

### 8. Allied Repair (Binary lines 258-287)

**Binary**: When moving to a city owned by an ally (treaty flag & 8 = alliance):
- Deducts HP proportional to repair: `hp = get_max_hp(unit) / 10`. If city has airport
  (building 2), doubles the deduction. Calls `FUN_005adfa0` to clamp.
- Subtracts from unit's damage counter.
- Shows "ALLIEDREPAIR" message.
- Move is consumed — unit doesn't actually enter the tile normally.

**JS**: **NOT IMPLEMENTED**. No allied territory repair mechanic exists in the JS engine.

**Verdict**: MISSING. Units cannot heal in allied cities in JS.

---

### 9. Land Unit vs Ocean (Transport Boarding) (Binary lines 289-294)

**Binary**: If domain == 0, destination is ocean, AND destination has friendly transport:
- Checks `FUN_005b50ad(dst_unit, 6)` — counts units with role 6 (transport capacity check).
- If transport has capacity, sets `bVar5 = true` for later boarding logic.
- If no transport or dst_owner != unit_owner: reject move.

**JS**: `handleMoveUnit()` at line 663: `findAvailableTransport()` checks for sea units
(domain 2) with `UNIT_CARRY_CAP` at destination. If found, moves unit to transport tile
and deducts 1 MP.

**Discrepancies**:
1. **Binary only allows boarding own transports**: Checks `dst_owner == owner`.
   JS `findAvailableTransport()` also checks `u.owner !== owner`. MATCH.
2. **Binary does actual boarding later** (around line 1194-1212): unloads from current stack,
   finds matching transport via domain check, boards. JS does immediate position update at line 670.

**Verdict**: MATCH functionally. Different timing but same result.

---

### 10. Enemy Unit at Destination — Expulsion/Diplomacy (Binary lines 295-548)

**Binary**: Complex branching when enemy unit is at destination:

**A. Non-amphibious landing block** (lines 297-304): If src is ocean AND domain == 0
AND no amphibious flag: show "AMPHIB" message, reject.

**B. Submarine check** (lines 306-309): If dest is NOT ocean AND unit has submarine flag
(flags & 8): reject (submarine can't go on land).

**C. Enemy transport/diplomat expel** (lines 310-323): If enemy unit is a submarine AND
only 1 unit AND NOT the same civ AND is human: auto-capture/expel the submarine.

**D. Caravan/freight vs enemy unit** (line 324-329): Unit with role 6 entering enemy unit
tile gets order cleared and `local_f0` set (can move through?).

**E. Non-combat rejection** (lines 330-341): If unit has attack == 0: show "NONCOMBAT" message, reject.

**F. Fighter-only no-land-target check** (lines 342-354): If no city AND no airbase AND enemy unit
has "no land" flag AND unit lacks paradrop flag: show "FIGHTER" message, reject.

**G. Diplomat expel logic** (lines 355-548): When enemy unit is a diplomat (role 6) at destination
with peace/ceasefire treaty: elaborate expulsion mechanic with city-finding, treaty hatred escalation,
war declaration. Sets treaty flags (0x20 → 0x40 → 0x40+clear peace). Calls `FUN_00598d45`
(spaceship AI should-start check) and `FUN_00456f20` (treaty modification).

**JS**: `handleMoveUnit()` combat path (lines 268-653):
- Establishes contact and auto-declares war.
- Checks senate veto before attacking.
- SDI missile interception check.
- Diplomat/spy intercept (consuming defender diplomat to cancel combat).
- Best defender selection, full combat resolution.
- Stack wipe logic.

**Discrepancies**:
1. **Amphibious landing block**: Binary blocks non-amphib land units from attacking from sea.
   JS handles amphibious attack via `isAmphibious` flag passed to `resolveCombat()` — but
   the binary's **hard block** for non-amphibious units attacking from ocean is in `rules.js`
   line 145: `if (hasEnemy && domain === 0 && terrain === 10) return 'Cannot attack units at sea'`.
   **MATCH** — JS blocks ALL land-from-sea attacks, which is stricter than binary (which allows
   units with amphib flag).
   **GAP**: Marines should be able to attack from sea. JS blocks them.

2. **Submarine movement restriction**: Binary prevents submarine-flagged units from entering land.
   JS has no submarine-specific movement restriction in rules.js.
   **GAP**: Submarines can be moved onto land tiles in JS.

3. **Diplomat expulsion mechanic**: Entire expulsion system (expelling enemy diplomats from your
   territory under treaties) is **NOT IMPLEMENTED** in JS.

4. **Treaty hatred escalation** (lines 537-546): Binary has a 3-stage escalation:
   - First offense: set flag 0x20
   - If 0x20 already set: set 0x40, clear peace flags (0x26 → 0x00, 0x40)
   This graduated response system is **NOT IMPLEMENTED** in JS.

5. **Non-combat unit rejection**: Binary shows "NONCOMBAT" and rejects. JS `rules.js` line 144
   does the same: `'Non-combat unit cannot attack'`. MATCH.

6. **Fighter can't attack ground without airbase/city**: Binary checks for this.
   JS doesn't have this specific check. **GAP**: Fighters can attack ground units in open
   terrain in JS (binary forbids this without airbase/city).

**Verdict**: SIGNIFICANT GAPS in diplomat expulsion, treaty escalation, amphibious attack rules,
submarine movement, and fighter ground-attack restrictions.

---

### 11. Fatigue Check (Binary lines 552-567)

**Binary**: Before calculating movement cost, checks if `get_unit_moves_remaining(unit) < COSMIC`.
- If human AND interactive: shows "FATIGUE" dialog — user can cancel.
- If AI AND moves_remaining < COSMIC-1: reject move entirely.
- If AI AND moves_remaining == COSMIC-1: allow (last move point).

**JS**: No explicit fatigue dialog. The `movesLeft <= 0` check in `rules.js` line 118 prevents
moves when fully exhausted. The probabilistic movement check (line 707) handles partial-MP moves.

**Discrepancies**:
1. **Binary allows moves with 0 remaining MP via FATIGUE dialog** (player confirmation).
   JS rejects any move with `movesLeft <= 0`. **GAP**: Binary allows one-more-move-with-confirmation.
2. **AI fatigue threshold**: Binary allows AI to move with exactly COSMIC-1 moves left.
   JS AI always follows the same rules. **MINOR GAP**.

**Verdict**: PARTIAL MATCH. Missing fatigue dialog for low-MP moves.

---

### 12. Movement Cost Calculation (Binary lines 675-711)

**Binary** (domain == 0, land units):
```
if both src AND dst have road or railroad:
    if both have railroad: cost = 0
    else: cost = 1 (road cost, 1/3 MP)
elif unit has all-terrain flag (flags & 2):
    cost = 1
elif both src AND dst have river AND tiles are adjacent (|dy|==1):
    cost = 1
else:
    cost = terrain_table[dst_terrain] * COSMIC
```
For sea/air (domain != 0): `cost = COSMIC`

**JS** `moveCost()` (movement.js lines 212-245):
```js
if (domain === 1) return MOVEMENT_MULTIPLIER;  // air
if (domain === 2) return MOVEMENT_MULTIPLIER;  // sea
if (fromImp.railroad && toImp.railroad) return 0;  // railroad
// Road/river check
const isDiagonal = (dgy === 1 || dgy === -1);
const fromHasRoad = fromImp.road || fromImp.railroad || (isDiagonal && hasRiver(from));
const toHasRoad = toImp.road || toImp.railroad || (isDiagonal && hasRiver(to));
if (fromHasRoad && toHasRoad) return 1;
// Base terrain cost
return TERRAIN_MOVE_COST[terrain] * MOVEMENT_MULTIPLIER;
// Alpine Troops exception for hills/mountains
```

**Discrepancies**:
1. **All-terrain flag**: Binary checks `flags & 2` (the all-terrain movement flag). JS checks
   only for Alpine Troops (type 10) specifically for hills/mountains. The binary's all-terrain
   flag gives cost=1 on ALL terrain types. **GAP**: If any unit besides Alpine Troops had the
   all-terrain flag, JS wouldn't handle it. Also, Alpine Troops in binary get cost=1 on ALL
   terrain, while JS only reduces hills/mountains.
   **SIGNIFICANT GAP**: Alpine Troops crossing forest (cost 2) would cost 1 in binary but 2
   (6 thirds) in JS.

2. **River adjacency check**: Binary checks `|dy| == 1` for river connectivity. JS checks
   `isDiagonal` which is `dgy === 1 || dgy === -1`. MATCH — same logic.

3. **Road priority**: Binary checks road/railroad first, then all-terrain, then river, then
   base terrain. JS checks railroad, then road+river combined, then base. The priority order
   differs slightly but since lower costs take precedence in both, the result is the same.

4. **Sea/air cost**: Binary uses `COSMIC` (3). JS uses `MOVEMENT_MULTIPLIER` (3). MATCH.

**Verdict**: PARTIAL MATCH. Alpine Troops all-terrain flag not fully ported.

---

### 13. Probabilistic Movement Check (Binary lines 712-729)

**Binary**:
```
if remaining_moves < cost AND domain == 0 AND unit.moved_this_turn:
    if human OR interactive:
        random = rand() % cost
        if remaining_moves <= random:
            exhaust unit moves
            goto CLEANUP (movement fails)
```

**JS** (move-unit.js lines 707-720):
```js
if (domain === 0 && cost > 1 && unit.movesLeft < cost) {
    const totalMP = calcEffectiveMovementPoints(unit);
    if (unit.movesLeft < totalMP) {
        const roll = state.rng.nextInt(cost);
        if (unit.movesLeft <= roll) {
            unit.movesLeft = 0;
            state.units[unitIndex] = unit;
            return;
        }
    }
}
```

**Discrepancies**:
1. **"moved this turn" check**: Binary checks `unit.moved_this_turn` (unit+0x08 != 0).
   JS checks `unit.movesLeft < totalMP` (less than full MP = has moved). Functionally
   equivalent — both detect that the unit has already spent some movement this turn.
2. **Cost threshold**: JS adds `cost > 1` guard. Binary doesn't — but `cost > remaining_moves`
   with `remaining_moves >= 1` means cost >= 2 implicitly. MATCH.
3. **Random implementation**: Binary uses `_rand()`. JS uses `state.rng.nextInt(cost)`.
   Both produce uniform [0, cost) distribution. MATCH.
4. **Comparison operator**: Binary: `remaining_moves <= random`. JS: `unit.movesLeft <= roll`.
   MATCH.

**Verdict**: MATCH. This is the one branch explicitly noted as ported in the pseudocode doc.

---

### 14. Combat Initiation via FUN_00580341 (Binary lines 571-593)

**Binary**: After passing all checks, calls `FUN_00580341(unit, direction, 1)` which is the
master combat resolution function. Returns 0 for success (moved or fought), nonzero for failure.
If flags & 2 (AI evaluation mode): loops back for continued movement.

**JS**: Combat is initiated directly in `handleMoveUnit()` when `enemiesAtDest.length > 0`.
Calls `resolveCombat()` which is a port of the combat resolution portion of FUN_00580341.

**Discrepancies**:
1. **AI evaluation mode (flags & 2)**: Binary has a separate code path for AI evaluation
   that can loop and continue moving after combat. JS has no equivalent — AI movement is
   handled differently.
2. **Return value semantics**: Binary returns `local_f0` (1=moved, 0=failed). JS has no
   return value — state is mutated in place.

**Verdict**: MATCH for player-initiated combat. AI evaluation mode is N/A (different AI system).

---

### 15. Sea/Air Unit Attacking City (Binary lines 632-663)

**Binary**: When destination has enemy city and unit is sea/air domain:
- If unit attack < threshold (specifically `< 'c'` = 99): show "OCCUPY" message (can't
  capture city, can only bombard).
- If flags & 2 (AI mode): call `FUN_0057f9e3` for combat evaluation.
- Otherwise: set `local_f0 = 1`, mark as moved.

**JS**: `rules.js` has the check at line 135-138: sea units can enter coastal city tiles.
The actual city capture logic in `handleMoveUnit()` at line 760 checks `UNIT_ATK[unit.type] > 0`.
The BOMBARD action is handled separately.

**Discrepancies**:
1. **"Cannot occupy" threshold**: Binary uses attack < 99 specifically. JS uses a simple
   `UNIT_ATK > 0` check. **MINOR GAP**: Any sea/air unit with attack > 0 but < 99 would
   be treated differently.
2. **Bombardment**: Binary handles bombardment within move_unit. JS has a separate `BOMBARD`
   action type. Same functionality, different dispatch.

**Verdict**: PARTIAL MATCH. The occupy threshold difference is minor.

---

### 16. Treaty Violation Check (Binary lines 664-673)

**Binary**: Before attacking an enemy city, if treaty has flags & 0x0E (ceasefire | peace | alliance):
- If human: calls `FUN_00579ed0` (treaty violation dialog) — player must confirm breaking treaty.
- If AI: clears orders, doesn't attack.

**JS**: `handleMoveUnit()` lines 279-293 handle treaty checking:
- Senate veto check via `checkSenateVeto()`.
- Declares war via `diplomacyDeclareWar()`.
- Treaty violation tracked via `isTreatyViolation` flag.

**Discrepancies**:
1. **Player confirmation dialog**: Binary shows an explicit dialog. JS auto-declares war without
   player confirmation (the client should show a dialog but server-side proceeds automatically).
   **GAP**: JS lacks the server-side treaty violation blocking (client is trusted to have shown
   the dialog).
2. **Senate veto**: JS implements this via `checkSenateVeto()`. MATCH.

**Verdict**: PARTIAL MATCH. Missing treaty violation confirmation enforcement server-side.

---

### 17. Damage-Based Speed Reduction (Binary via FUN_005b2a39)

**Binary** `calc_unit_movement_points`:
```
if unit.damage != 0 AND domain != SEA:
    reduced = (hp_remaining * base_moves) / max_hp
    round up to next COSMIC multiple
    minimum = COSMIC * (2 if AIR else 1)
    result = max(reduced, minimum)
```

**JS** `calcEffectiveMovementPoints()` (movement.js lines 22-30):
```js
const effectiveMP = Math.ceil(baseMP * currentHP / maxHP);
return Math.max(effectiveMP, MOVEMENT_MULTIPLIER);
```

**Discrepancies**:
1. **COSMIC rounding**: Binary rounds up to nearest `COSMIC` (3) multiple. JS uses `Math.ceil`
   which rounds to nearest integer. **GAP**: A unit with 5/10 HP and 6 base moves:
   - Binary: (5 * 6) / 10 = 3 → already COSMIC multiple → 3.
   - JS: ceil(5 * 6 / 10) = ceil(3) = 3. MATCH for this case.
   But 7/10 HP with 6 base: Binary: (7*6)/10 = 4.2 → round to COSMIC: 6. JS: ceil(4.2) = 5.
   **DISCREPANCY**: Binary gives 6, JS gives 5.

2. **Minimum for air units**: Binary uses `2 * COSMIC` (6) minimum for air. JS uses
   `MOVEMENT_MULTIPLIER` (3) for all. **GAP**: Air units with heavy damage get too-low MP in JS.

3. **Sea units exempt**: Binary skips damage reduction for sea domain entirely. JS applies
   reduction to all domains. **GAP**: Damaged sea units in JS are slower than they should be.

**Verdict**: SIGNIFICANT GAPS in rounding, air minimum, and sea exemption.

---

### 18. Visibility Update During Move (Binary lines 788-841)

**Binary**: Builds two arrays `aiStack_a0[8]` and `aiStack_80[8]` for each civ:
- `aiStack_a0[civ]`: whether this civ can see the move happening (based on visibility of
  either source or dest tile).
- `aiStack_80[civ]`: whether to show animation to this civ.
- Special handling for active player: checks Shift key to suppress animation.
- Per-civ visibility check includes checking if civ has units adjacent to destination.

**JS**: `updateVisibility()` called once after move completes (line 798). Uses a simpler
model — updates visibility bits for the moving civ only.

**Discrepancies**:
1. **Per-civ visibility during move**: Binary tracks 7 other civs' ability to see the move.
   JS only updates the moving civ's visibility. **GAP**: Other civs don't get fog-of-war
   updates from enemy movement. However, in the server-authoritative model, visibility is
   computed server-side for each client.
2. **Adjacent-unit reveals**: Binary checks if civs have units adjacent to dst to determine
   if they should see the move. JS doesn't have this mechanic.

**Verdict**: DIFFERENT MODEL. Server computes visibility per-client on send. Not a functional gap.

---

### 19. Continental Threat Tracking (Binary lines 995-999)

**Binary**: After successful land movement:
```
if domain == 0 AND src is land:
    continent = get_continent(dst_x, dst_y)
    civ_threat[owner][continent] += 1
```
This tracks how many units each civ has per continent for AI threat assessment.

**JS**: **NOT IMPLEMENTED**. The AI system uses different threat assessment.

**Verdict**: MISSING (AI-related). Low priority for multiplayer engine.

---

### 20. City Combat (Binary lines 1000-1004)

**Binary**: After moving onto enemy city tile:
```
if city at dest AND city.owner != unit.owner:
    unit.moves = 0
    call FUN_0057b5df(city, owner, 0)  // city_combat
```
This triggers the city capture sequence.

**JS**: `handleMoveUnit()` lines 758-791: Detects `enemyCity` at destination and calls
`captureCity()`. Also handles treaty-breaking flags, civ elimination, barbarian uprising.

**Verdict**: MATCH functionally. Both trigger city capture on moving to undefended enemy city.

---

### 21. Air Unit Fuel Check (Binary lines 1046-1103)

**Binary**: After air unit moves:
- Checks if landed on a city (`FUN_005b8ca6`) or airbase/carrier (`FUN_005b8d15`).
- If landed: resets fuel counter, exhausts movement, enters "in base" state.
- If NOT landed and unit has fuel counter (domain == 1):
  - Increments fuel counter.
  - If fuel exceeded max (from unit_types): DESTROY UNIT.
  - Plays crash sound, shows dialog.
  - If unit is a carrier fighter type: checks for carrier in stack.

**JS**: `checkAirFuel()` in movement.js — but this is called from `end-turn.js`, NOT from
move-unit. It checks for base (city/carrier/airbase) and decrements fuel per turn.

**Discrepancies**:
1. **Timing**: Binary checks fuel after EVERY move. JS checks once per turn.
   **SIGNIFICANT GAP**: In the binary, an air unit with fuel=1 that takes off and moves
   to a non-base tile immediately loses 1 fuel. If it started with 1 fuel, it crashes after
   one movement. In JS, it survives until end of turn. This is a game-balance difference.
2. **Auto-landing**: Binary auto-exhausts moves when landing at a base, entering "landed" state.
   JS doesn't have this mechanic. **GAP**: Air units at a base in JS can still be moved
   (they shouldn't need to "take off" again, but the fuel reset timing differs).

**Verdict**: SIGNIFICANT GAP. Fuel should be checked per-move, not per-turn.

---

### 22. Trireme Sinking (Binary lines 1106-1153)

**Binary**: After sea unit moves with trireme flag AND out of moves:
```
survival_chance = COSMIC[1]  // DAT_0064bcc9
if has_tech(owner, 0x4B):   // Navigation
    survival_chance *= 2
    if < 3: survival_chance = 2
if has_tech(owner, 0x39):   // Magnetism
    survival_chance *= 2

random = rand() % survival_chance
if random == 0:
    // Check if adjacent to ANY non-ocean tile
    for 9 neighbors:
        if on-map AND terrain != ocean:
            safe = true; break
    if not safe: destroy unit, show "TRIREME"
```

**JS** `checkTriremeSinking()` (movement.js lines 49-74):
- Only for type 32 (Trireme).
- Checks Astronomy tech (ID 3) — if has tech, skip.
- Checks Lighthouse (wonder 3) and Magellan's (wonder 12).
- Checks adjacency to land. If all-ocean: 50% chance of sinking.

**Discrepancies**:
1. **Timing**: Binary checks after each move (when out of MP). JS checks in end-turn.
   **MINOR GAP**: Binary trireme can sink mid-turn if it runs out of MP.
2. **Survival formula**: Binary uses `COSMIC[1]` (default 2) with Navigation (2x) and
   Magnetism (2x) multipliers, giving survival rates of 1/2, 1/4, 1/8.
   JS uses fixed 50% chance, checking Astronomy tech and wonders instead.
   **SIGNIFICANT GAP**: Completely different survival formula. Binary uses Navigation and
   Magnetism techs. JS uses Astronomy tech and wonders (Lighthouse, Magellan's).
3. **Wonder protection**: Binary doesn't check Lighthouse/Magellan for trireme protection.
   JS does. **GAP in opposite direction**: JS gives trireme protection that binary doesn't.

**Verdict**: SIGNIFICANT DISCREPANCY. Different formula, different techs checked, different timing.

---

### 23. Goody Hut Processing (Binary lines 1154-1157)

**Binary**: After successful land movement:
```
if goody_hut_at_dest AND domain == 0:
    call FUN_0058f040(unit)
```

**JS**: `handleMoveUnit()` lines 845-857: Checks `tile.goodyHut`, consumes it, calls
`resolveGoodyHut()`.

**Discrepancies**:
1. **Domain check**: Binary only processes goody huts for land units. JS doesn't check domain.
   **MINOR GAP**: Air units could trigger goody huts in JS (binary prevents this).
2. **Barbarian exclusion**: JS checks `civSlot > 0` (non-barbarian). Binary has similar check
   inside FUN_0058f040. MATCH.

**Verdict**: PARTIAL MATCH. Missing domain check (air units shouldn't trigger huts).

---

### 24. Transport Boarding from Shore (Binary lines 1194-1212)

**Binary**: If `bVar5` was set (transport boarding path from branch 9):
- Unloads unit from current stack.
- Exhausts movement.
- Iterates destination stack to find a transport (domain == 2) with remaining capacity.
- Calls `FUN_005b542e(unit, 0, 0)` to set the unit onto the transport.
- Sets `DAT_00655afe = transport_id`.

**JS**: Transport boarding is handled inline in `handleMoveUnit()` at lines 663-683.
Simply updates position and deducts 1 MP.

**Verdict**: MATCH functionally. Different implementation details but same game effect.

---

### 25. LONGMOVE Counter (Binary lines 1213-1234)

**Binary**: If unit has goto order OR `flags & 0x8000`:
- Increments `unit.move_counter` (DAT_006560fe) by 1.
- If moving in reverse direction: adds 15.
- If counter > 47 ('/'): shows "LONGMOVE" dialog (player can cancel goto).
- This prevents infinite loops in pathfinding.

**JS**: **NOT IMPLEMENTED**. No LONGMOVE counter or dialog exists. Goto orders don't have
infinite-loop protection.

**Verdict**: MISSING. Low priority (client-side UX feature).

---

### 26. Cleanup/Failure Path (Binary lines 1238-1280)

**Binary**: On failure (local_f0 == 0):
- Clears unit orders to 0xFF (idle).
- If unit had `flags & 0x8000` (goto): exhausts movement.
- For certain AI units: resets to fortify if "was fortified" flag was set.
- On success: clears the "was fortified" flag.
- Resets reentry guard.

**JS**: Failure handling is implicit — `handleMoveUnit()` returns early without modifying state.
Success clears orders if they were sleep/fortify/sentry (line 731).

**Discrepancies**:
1. **Order clearing on failure**: Binary clears to idle (0xFF). JS doesn't modify orders on
   rejected moves. **MINOR GAP**: Failed goto moves in binary clear the goto, JS doesn't.
2. **AI fortify reset**: Binary has special AI logic. N/A for JS multiplayer.
3. **AI retry counter** (lines 1260-1268): Binary increments a counter on failed AI moves and
   exhausts MP after 19 failures. Prevents AI infinite loops. N/A for JS.

**Verdict**: PARTIAL MATCH. Missing order-clearing-on-failure for goto units.

---

### 27. Stack Movement (Not in move_unit directly)

**Binary**: `move_unit` handles single-unit movement. Stack movement (moving all units) is
handled by the caller iterating the stack and calling move_unit for each unit.

**JS**: Sea transport auto-moves cargo at lines 742-755. No explicit "stack move" — each unit
moves individually.

**Verdict**: MATCH for transport cargo movement. Stack movement is caller's responsibility in both.

---

### 28. Submarine Visibility (Binary lines 772-787)

**Binary**: Before/after movement, updates submarine visibility. If an enemy city can see the
submarine's tiles (via `FUN_005b8b65`), makes the submarine visible to that civ:
```
if owner == 0 (barbarian) AND dst is land:
    if active_player can see tile AND sub not already visible:
        make sub visible to active player
```
Also checks alliance/war status for revealing subs near cities.

**JS**: Submarine visibility is not specifically handled. The general visibility system doesn't
distinguish submarine stealth.

**Verdict**: MISSING. Submarine stealth/visibility not implemented.

---

### 29. Paratroop Landing (Binary lines 595-631)

**Binary**: Special case for air domain (domain == 2) units approaching enemy coast:
- If domain == 2 AND dest is NOT ocean AND no city/airbase:
  - Enters "LANDFALL" path: finds a land unit in the carrier's stack with enough MP.
  - Shows "LANDFALL" confirmation dialog.
  - Switches the active unit to the land unit for disembarkation.

**JS**: Paratroop landing is a separate action type (`PARADROP`). The carrier-approaching-coast
landfall mechanic is not implemented as part of movement.

**Verdict**: DIFFERENT MODEL. The binary's landfall mechanic (automatically offering to
disembark land units when a carrier moves to coast) is not in JS. In JS, players must
explicitly order units to disembark.

---

### 30. Railroad Infinite Movement (Binary lines 678-706)

**Binary**: When both source and destination tiles have railroad: cost = 0.
This means units can move unlimited tiles on railroad in a single turn.

**JS**: `moveCost()` line 224: `if (fromImp.railroad && toImp.railroad) return 0;`

**Verdict**: EXACT MATCH.

---

## Summary Table

| Feature | Binary | JS | Status |
|---------|--------|-----|--------|
| Reentry guard | DAT_00634ca0 | Server-auth model | N/A |
| Direction calculation | Offset tables + wrap | resolveDirection() | MATCH |
| Multiplayer tile lock | mp_lock/unlock | Server-auth | N/A |
| ZOC check | FUN_005b4d8c both tiles | isZOCBlocked() | PARTIAL (missing amphib bypass) |
| Diplomat/spy auto-trigger | Role 7 → city dialog | Separate action | Different model |
| Caravan/freight auto-trigger | Role 6 → trade route | Separate action | Different model |
| Allied repair | HP deduction, airport 2x | Not implemented | **MISSING** |
| Transport boarding | bVar5 path, capacity | findAvailableTransport | MATCH |
| Diplomat expulsion | Complex treaty-based | Not implemented | **MISSING** |
| Treaty hatred escalation | 3-stage (0x20→0x40→war) | Simple declare-war | **MISSING** |
| Non-combat rejection | Attack == 0 | rules.js check | MATCH |
| Fighter ground-attack block | No city/airbase check | Not checked | **MISSING** |
| Fatigue dialog | COSMIC threshold + dialog | movesLeft <= 0 | PARTIAL |
| Movement cost (road/rail) | Road=1, Rail=0 | Same | MATCH |
| Movement cost (river) | |dy|==1 + both river | isDiagonal + hasRiver | MATCH |
| Movement cost (all-terrain) | flags & 2 → cost=1 ALL | Alpine type 10 only H/M | **PARTIAL** |
| Probabilistic movement | rand() % cost | rng.nextInt(cost) | MATCH |
| Combat initiation | FUN_00580341 | resolveCombat() | MATCH |
| City attack (sea/air) | Attack < 99 check | UNIT_ATK > 0 | PARTIAL |
| Treaty violation dialog | Player confirmation | Auto-declare | PARTIAL |
| Damage-based MP | COSMIC rounding, min air×2 | Math.ceil, min×1 | **SIGNIFICANT GAP** |
| Visibility per-civ | 7-civ array, adj check | Single civ update | Different model |
| Continental threat | civ_threat[civ][cont]++ | Not implemented | MISSING (AI) |
| City capture | FUN_0057b5df | captureCity() | MATCH |
| Air fuel check | Per-move | Per-turn (end-turn) | **SIGNIFICANT GAP** |
| Trireme sinking | COSMIC[1], Nav/Mag techs | 50%, Astro/wonders | **SIGNIFICANT GAP** |
| Goody huts | Domain == 0 only | No domain check | PARTIAL |
| Transport boarding | Post-move stack ops | Inline position update | MATCH |
| LONGMOVE counter | 47 moves → dialog | Not implemented | MISSING |
| Submarine visibility | Stealth + reveal logic | Not implemented | **MISSING** |
| Paratroop/landfall | Carrier coast → dialog | Separate PARADROP action | Different model |
| Railroad infinite | cost = 0 | cost = 0 | MATCH |
| Stack movement | Caller iterates | Transport auto-cargo | MATCH |
| Failure cleanup | Clear orders, exhaust MP | Return early (no change) | PARTIAL |
| Amphibious attack | Allow with flag, block w/o | Block ALL from sea | **GAP** (Marines) |
| Submarine land block | Prevent sub on land | Not checked | **MISSING** |

---

## Priority Fixes

### Critical (Game Balance)
1. **Damage-based MP reduction**: Fix COSMIC rounding, add air minimum (2×COSMIC), exempt sea units
2. **Air fuel per-move**: Move fuel check from end-turn to move-unit (or both)
3. **Trireme sinking formula**: Use COSMIC[1] with Navigation/Magnetism tech multipliers
4. **Amphibious attack**: Allow Marines (type 12, amphib flag) to attack from sea

### High (Correctness)
5. **Alpine Troops all-terrain**: cost=1 for ALL terrain, not just hills/mountains
6. **Fighter ground-attack block**: Fighters can't attack ground units without city/airbase
7. **Submarine movement**: Block submarine-flagged units from entering non-ocean tiles
8. **Goody hut domain check**: Only land units (domain 0) trigger goody huts

### Medium (Feature Completeness)
9. **Allied repair**: Implement HP repair when entering allied city
10. **Diplomat expulsion**: Full treaty-based expulsion mechanic
11. **Treaty hatred escalation**: 3-stage treaty violation tracking
12. **Submarine visibility**: Stealth mechanics for submarine units

### Low (UX/Polish)
13. **LONGMOVE counter**: Infinite loop protection for goto orders
14. **Fatigue dialog**: Allow one-more-move with confirmation at low MP
15. **Landfall dialog**: Auto-offer disembark when carrier reaches coast
