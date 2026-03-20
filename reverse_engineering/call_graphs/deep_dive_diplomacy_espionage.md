# Deep Dive: Diplomacy & Espionage — Binary vs JS

Comparison of decompiled Civ2 MGE binary functions against
`charlizationv3/engine/diplomacy.js` (3085 lines) and
`charlizationv3/engine/espionage.js` (1096 lines).

---

## 1. process_diplomatic_contact — FUN_0055d8d8 (7326B)

### Binary Behavior

This is the master function called whenever two civs' units meet on the map.
It handles multiplayer negotiation handshake, first contact, AI-initiated
diplomacy, and the periodic auto-peace/auto-alliance logic.

**Key binary branches:**

1. **Guard checks**: Returns immediately if either civ is 0 (barbarian), or
   if the global diplomacy-enabled flag (`DAT_00655af8`) is 0.

2. **Multiplayer negotiation (DAT_00655b02 >= 3)**: Both civs are human in
   multiplayer. The binary opens a `PARLEYWAITING` dialog, waits for the
   other player to respond (`PARLEYOK`, `PARLEYGOAWAY`, `PARLEYBUSY`,
   `PARLEYCANCEL`), and routes to the full diplomacy screen
   (`FUN_004b7eb6`) if both agree. This is an entirely UI/network flow.

3. **First contact (bit 0x01 not set)**: Sets CONTACT flag (0x01) and
   RECENT_CONTACT (0x4000) via `FUN_00467825`. If first time ever meeting,
   also sets 0x4000 (periodic flag).

4. **Auto-peace negotiation**: Both AI civs evaluate whether to sign peace.
   Conditions checked:
   - Neither has `INTRUDER` flag (0x20)
   - Tech thresholds: civ has Invention (tech 6) or Fundamentalism (tech 0x18)
   - Expansionism > 4 AND NOT already has the "no-peace" flag (bit 8)
   - Calls `FUN_0055d1e2` (attitude/peace proposal evaluation)
   - If peace passes, sets PEACE flag (0x04)

5. **Auto-alliance formation**: If already at peace, evaluates alliance.
   Alliance requires finding a common enemy (`local_2c`). Scans all 7 civs
   for one that BOTH have ALLIANCE with neither, then enters alliance AND
   declares war on the common enemy. Calls `FUN_0055d685` (shared war
   obligations). Special NATO scenario check for civs 6+7.

6. **Alliance maintenance**: If already allied, checks for war endorsement
   overlap. May break alliance if too many mutual enemies (patience
   exceeded). Calls `FUN_00467750` to clear alliance flag.

7. **Periodic flag clearing**: Clears transient flags at intervals:
   - `turnNumber + civ1 + civ2 & 3 == 0`: potential re-contact check
   - Special scenario flag `DAT_00655af0 & 0x80`: Alpha Centauri scenario

### JS Implementation (diplomacy.js)

**processDiplomacyTimers()** (lines 462-662) handles the per-turn timer
portion. It covers:

- Ceasefire expiration (16 turns) — **matches binary**
- Military withdrawal deadline enforcement — **matches binary**
- Alliance shared visibility per-turn — **matches binary**
- Reputation decay (+1 per 16 turns) — **matches binary**
- Patience decay (-1 per 3 turns) — **matches binary**
- Periodic flag clearing (WAR_STARTED every 8, RECENT_CONTACT every 16,
  PERIODIC_FLAG_19/TRIBUTE_DEMANDED every 32) — **matches binary**
- Senate override toggle — **matches binary (1/3 chance per turn)**

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Multiplayer parley handshake | Full PARLEYWAITING/OK/GOAWAY/BUSY/CANCEL dialog flow via `FUN_00426fb0` | Not implemented (WebSocket architecture handles this differently) | **By design** — different MP architecture |
| Auto-peace between AI civs | `FUN_0055d1e2` evaluates peace based on tech, attitude, military | Not in processDiplomacyTimers; handled by diplomai.js AI logic separately | **Structural** — same outcome, different code path |
| Auto-alliance with common enemy | Scans for third-party enemy, forms alliance + joint war declaration | Alliance in formAlliance() checks existing wars but does NOT proactively find new common enemies | **GAP** — binary proactively seeks common enemies for alliance |
| NATO scenario (civs 6+7) | Special check `(DAT_00655af0 & 0x80)` for scenario-specific alliance | Not implemented | **Minor** — scenario-specific |
| Alliance break on too many wars | Breaks alliance if local_14 (mutual enemy count) exceeds patience | Not implemented — breakAlliance exists but not auto-triggered | **GAP** — binary auto-breaks strained alliances |
| First-contact flag setting | Sets 0x4000 + 0x0401 in one call | addTreatyFlag sets CONTACT + RECENT_CONTACT | **Match** |

---

## 2. diplo_declare_war — FUN_0045ac71 (1125B)

### Binary Behavior

Parameters: `(aggressor, target, thirdParty)`.

**Phase 1: Third-party tracking**
- If `thirdParty >= 0`: increments `warCount[thirdParty][aggressor]` (byte
  at offset 0x28 in the civ-pair record).

**Phase 2: Treaty-specific consequences (branched on existing flags)**

*Case A: Currently allied (flag & 0x08)*
- If government == 7 (democracy) AND tech count > 4 AND thirdParty < 0:
  increments `patience` counter.
- If difficulty > 0 AND no Statue of Liberty (tech 0x14): increments patience.
- If thirdParty >= 0 AND civ is human: decrements warCount for aggressor.
- Attitude adjustment: `adjust_attitude(thirdParty, aggressor, -25)` (0xFFFFFFE7 = -25 signed).
- Calls `FUN_00467ef2` to break the alliance (clear flag 0x08).
- If aggressor is human: sets VENDETTA flag (0x10) on both directions.

*Case B: At peace/ceasefire (flag & 0x06)*
- Both peace AND ceasefire: double reputation penalty.
  - patience incremented twice.
  - Government == 7 check + extra patience.
  - Attitude: thirdParty gets -15 on aggressor.
- Peace only (0x04): single patience increment, attitude -5.
- Ceasefire only (0x02): single patience increment, attitude -5.
- All cases: set WAR flag (0x2000), WAR_STARTED (0x800).
- If human aggressor: set VENDETTA (0x10) + betrayal flags (0x80800).
- Records contact turn.
- Calls `FUN_0045a8e3` (activate alliance wars).

*Case C: No treaty*
- If thirdParty < 0: patience increment.
- Attitude: thirdParty gets -25 on aggressor.
- Sets WAR (0x2000).

### JS Implementation (diplomacy.js declareWar(), lines 764-953)

**Reputation system**: JS adds a layered reputation system on top of the
binary's patience mechanism:
- Alliance break: -60 reputation + -5 incremental
- Peace break: -40 reputation + -3 incremental
- Ceasefire break: -20 reputation + -3 incremental
- No treaty: -80 reputation (if had contact) + -1 incremental

**Witness penalty**: JS adds -10 attitude for ALL contacted civs (not in
binary — binary only penalizes the thirdParty).

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Patience increment logic | Increments based on diffIdx > 0 AND !StatueOfLiberty, plus extra if thirdParty < 0 | Similar structure with hasStatueOfLiberty check (wonder 19) | **Match** (minor: JS checks wonder 19, binary checks tech 0x14 = wonder effect) |
| Attitude deltas | Alliance break: -25 to thirdParty. Peace break: -5. No treaty: -5 | Alliance break: -15 to thirdParty. Peace break: -5. No treaty: -25 | **DISCREPANCY** — alliance third-party penalty is -25 in binary, -15 in JS |
| Democracy patience check | Extra patience if govt==7 AND techCount>4 AND unprovoked | Not explicitly checked (government-aware but simplified) | **Minor gap** |
| VENDETTA flag (0x10) | Set on human aggressor for both directions | Set via ensureDiplomacy sneak flag (different representation) | **Structural** — same concept, different storage |
| WAR_STARTED (0x800) | Set when transitioning from peace/ceasefire to war | Set via addTreatyFlag cascade (WAR sets WAR_TRACKING) | **Match** |
| Witness penalty | Only thirdParty gets attitude hit | ALL contacted civs get -10 | **DISCREPANCY** — JS is more punitive to aggressors |
| Reputation system | Not present in binary (uses patience only) | Full reputation system with decay | **JS enhancement** — not in binary |
| Cancel trade routes | Not in this function | cancelTradeRoutes called | **JS enhancement** |
| Wake sleeping units | Not in this function | wakeUnitsNearEnemy called | **JS enhancement** |
| Alliance war cascade | Calls FUN_0045a8e3 | Calls activateAllianceWars | **Match** |

---

## 3. diplo_form_alliance — FUN_0045a535 (374B)

### Binary Behavior

Parameters: `(civA, civB)` — civA proposes, civB accepts.

1. **Attitude**: `adjust_attitude(civB, civA, -25)` — note binary uses
   negative = friendly, so this is +25 goodwill.
2. **Set alliance flag**: `FUN_00467825(civB, civA, 0x08)`.
3. **Run full negotiation state update**: `FUN_0045705e(civA, civB)` — the
   6616-byte function that evaluates tech exchange desirability, military
   comparisons, and sets multiple negotiation state variables.
4. **Reset patience counter**: `civB.patience = 0`.
5. **Set SPACESHIP_LAUNCHED flag**: `*(civ+0x6A0) |= 0x100`.
6. **Clear negotiation state**: `DAT_0064b0e8 = 0`.
7. **Record treaty turn**: `contactTurn[civA][civB] = currentTurn`.
8. **Set SPACESHIP_LAUNCHED on proposer**: `*(civA+0x6A0) |= 0x100`.
9. **Call `FUN_00458a3b`**: Some post-alliance processing.
10. **Display ALLIANCE message**.

### JS Implementation (diplomacy.js formAlliance(), lines 1144-1244)

- Attitude: `adjustAttitude(civB, civA, 25)` — **matches** (inverted scale).
- setTreaty to 'alliance' — **matches**.
- Reset patience — **matches**.
- Record treaty turn — **matches**.
- Share maps bidirectionally — **matches** binary `FUN_00458a3b` purpose.
- Auto-establish embassy both ways — **matches**.
- Enemy attitude adjustment: -25 toward each ally's enemies — **present**.
- Set NUKE_AWARENESS flag — **matches** binary 0x100 flag.
- **Alliance war cascade**: Scans all civs for existing wars and forces new
  ally to join them — **matches** binary `FUN_0045a8e3`.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| FUN_0045705e negotiation state | Full 6616B negotiation evaluation (tech exchange, military comparison, 63-tech scan for trade opportunities) | Not called — simplified alliance formation | **GAP** — binary evaluates negotiation leverage during alliance, JS skips this |
| SPACESHIP_LAUNCHED flag | Sets 0x100 on both civs | Sets NUKE_AWARENESS (same bit pattern) | **Match** — same flag, different name |
| FUN_00458a3b post-processing | Unknown processing (likely shared visibility + embassy) | shareMaps + embassy | **Match** (inferred) |
| Enemy attitude -25 | Not explicitly in FUN_0045a535 (happens in FUN_0045705e or cascade) | Explicit -25 for each ally's enemies | **Match** (different location) |

---

## 4. adjust_attitude — FUN_00456f20 (107B)

### Binary Behavior

Parameters: `(civA, civB, delta)`.

```c
currentAttitude = FUN_00467904(civA, civB);  // get current attitude
FUN_00467933(civA, civB, delta + currentAttitude);  // set new attitude
if (civA == activeDiploCiv && civB == activeTarget) {
    globalAttitudeVar += delta;  // update live negotiation display
}
FUN_00467904(civA, civB);  // re-read (possibly for clamping side effects)
```

This is extremely simple: read, add delta, write back. The clamping happens
inside `FUN_00467933` (the setter). The live negotiation display update is a
UI concern.

### JS Implementation (diplomacy.js adjustAttitude(), lines 324-339)

```js
civ.attitudes[targetCiv] = Math.max(0, Math.min(100, cur + delta));
```

Clamps to [0, 100].

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Clamp range | Clamped inside FUN_00467933 (setter) — exact range unknown from this function alone, but [0, 100] based on usage patterns | [0, 100] | **Match** (assumed) |
| Live negotiation display update | Updates global display variables | Not needed (client-server split) | **By design** |
| Re-read after write | Calls getter again after setter (likely for side effects or verification) | Not done | **Minor** |

---

## 5. spy_enters_city — FUN_004c6bf5 (10469B)

### Binary Behavior

This is the master spy/diplomat action dispatcher. Parameters:
`(unitIndex, cityIndex)`.

**Setup:**
- Reads spy's owner civ from unit record.
- Reads city owner from city record.
- `local_398` = unit subtype (diplomat=0x2F/47, spy=0x2F/47 with flag).
- `local_38c` = 1 if spy (has 0x2F flag), 0 if diplomat.
- Sets CONTACT flag between civs.

**Human player menu (if human controls spy):**
Opens `SPYMENU` dialog, then `SPYOPTIONS` property sheet with conditional
items:

| Menu Item | Condition |
|-----------|-----------|
| 0: Establish Embassy | Not at war AND no embassy already |
| 1: Investigate City | Always available |
| 2: Steal Technology | Available if city doesn't have "already stolen" flag (0x08), OR if spy |
| 3: Sabotage | Always available |
| 4: Poison Water | Spy only AND city size > 1 |
| 5: Plant Nuclear Device | Spy only AND has Manhattan Project (tech 0x49) AND Nuclear Fission (0x3A) AND Nuclear Bomb exists (building check) |
| 6: Incite Revolt | Available if `FUN_0043d20a(city, 1)` returns 0 (no defenders check?) |
| 7: Counter-Espionage | Multiplayer only AND human-controlled city AND not already counter-espionaged |

**AI decision logic (if AI controls spy):**
- Default mission = 2 (steal tech).
- If `embassyFlag & 0x10` AND rand()%3==0 AND spy: mission = 4 (poison).
- If peace treaty: force mission = 2.
- If difficulty >= 4 OR (difficulty==3 AND techCount>5): mission = 6 (incite).
  But only if city has `VENDETTA|EMBASSY` flag AND govt != 6 (democracy).
- If allied: force mission = 2.
- If city has walls (0x08) AND diplomat AND mission == 2: mission = 3 (sabotage),
  but only if no treaty exists; otherwise mission = 0 (embassy).

**Case 0: Establish Embassy**
- If embassy already exists: fall through to case 1.
- Sets EMBASSY flag (0x80) on `treatyFlags[targetCiv][spyCiv]`.
- Spy: increments experience counter.
- Diplomat: consumed (FUN_005b6042).
- Human spy: gets `FUN_0043060b` (embassy establishment notification).

**Case 1: Investigate City**
- Calls `thunk_handle_city_disorder_00509590` (force city screen).
- Diplomat: calls `FUN_004c5fae` (spy survival, consumed for diplomat).
- Spy: increments experience, survives with check.
- Sets city `investigatedFlag` (0x400000).

**Case 2: Steal Technology**
- Calls `FUN_004c654d` (pre-mission check — returns nonzero if blocked).
- Finds a random tech: iterates 100 techs starting from random offset.
  For each tech, checks: not future tech (-2), spy doesn't know it
  (`FUN_004bd9f0(spyCiv, tech) == 0`), target knows it
  (`FUN_004bd9f0(targetCiv, tech) != 0`).
- **Specific steal** (spy-only): `STEALSPECIFIC` dialog lets player choose.
  If specific steal AND city already stolen from (0x08 flag): harder detection.
- If no stealable tech: spy moves on (refunds moves), tries sabotage or embassy.
- On success: grants tech, handles detection, sets "already stolen" flag (0x08).

**Case 3: Sabotage**
- Calls `FUN_004c654d` (pre-mission check).
- Picks random building target: iterates buildings starting from random
  offset (0 to 0x26=38). Skips Palace (0), City Walls (1), and SDI Defense (0x11).
- If city has production in progress and sabotage hits it: resets shields.
- **Specific sabotage** (spy-only): `SABOTAGESPECIFIC` dialog with full
  building list. Extra detection checks for Palace/City Walls (+1 check)
  and SDI Defense (+2 checks).
- On success: destroys building via `FUN_0043d289`.

**Case 4: Poison Water Supply**
- Spy-only mission.
- If city size < 2: clear food storage.
- If city size >= 2: reduce size by 1.
- Calls `FUN_0043cc00(city, spyCiv)` — reassign citizens.
- 50% chance spy survives.

**Case 5: Plant Nuclear Device**
- Spy-only. Requires Manhattan Project + Nuclear Fission + nuclear bomb exists.
- **4 cumulative detection checks** (3 base + 1 if city has defenders).
  `FUN_004c64aa` called 3 times (or 4 with defenders).
- On success: places nuclear explosion at city via `FUN_0057f9e3`.
- If non-Fundamentalist: 50% chance (or 25% with veteran spy) of being
  blamed. If blamed: all civs get +100 attitude penalty AND
  CAPTURE_VENDETTA (0x2000) set.

**Case 6: Incite Revolt**
- Distance formula: `FUN_004c65d2(targetCiv, spyX, spyY)` returns distance
  to nearest palace. If distance < 2: revolt impossible.
- **Cost formula** (from binary):
  ```
  cost = citySize * (treasury + 1000) / (distance + 3)
  if cost < 0: cost = 30000
  if capital: cost /= 2
  if no defenders (FUN_0043d20a returns nonzero): cost /= 2
  if originalOwner == attacker: cost /= 2
  if spy: cost -= cost/6 (veteran: cost -= cost/3)
  ```
- Communism government: distance capped at 10.
- No treaty (bVar6): option to subvert (mission 1) or revolt (mission 2).
  - Subvert (mission 1): pay cost, transfer city ownership.
  - Revolt (mission 2): pay 2x cost, transfer city + set VENDETTA flag.
- `FUN_004c66ba` handles the actual city transfer.

**Case 7: Counter-Espionage**
- Sets counter-espionage status on unit: `experience = base + difficultyBonus + rand()%6`.
- Diplomat: base 5, Spy: base 10. Veteran: +2.
- Difficulty bonus from lookup table.
- Deducts counter-espionage strength from attacker's counter table.
- Assigns target city for surveillance.

### JS Implementation (espionage.js, lines 1-1096)

**Implemented missions:**
- Embassy (establishEmbassy, lines 643-684): No detection. Sets embassy flag. **Matches**.
- Investigate (investigateCity, lines 697-741): No detection. Returns city data. **Matches**.
- Steal Tech (stealTech, lines 756-824): 1 detection check. Random tech selection. **Matches** (but see gaps below).
- Sabotage Production (sabotageProduction, lines 838-893): 1 detection check. Resets shields. **Partial** — only resets shields, doesn't destroy buildings.
- Poison Water (poisonWater, lines 907-963): 1 detection check. Reduces city size by 1. **Matches**.
- Incite Revolt (inciteRevolt, lines 978-1054): Cost-based. Uses calcInciteCostEnhanced. **Matches**.
- Counter-Espionage (counterEspionage, lines 1067-1096): Sets flag on city. **Partial**.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Plant Nuclear Device (case 5) | Full implementation: 3-4 detection checks, nuclear explosion, blame mechanic, all-civ attitude penalty | **NOT IMPLEMENTED** | **Major gap** |
| Sabotage building destruction | Picks random building or specific building, destroys it | Only resets shields to 0 (production sabotage only) | **Major gap** — binary destroys actual buildings |
| Specific steal/sabotage (spy-only) | STEALSPECIFIC/SABOTAGESPECIFIC dialogs let spy choose target | Not implemented — always random | **Gap** |
| Extra detection for specific targets | Palace/Walls: +1 check. SDI: +2 checks | Not implemented (TODO comment at line 397) | **Gap** |
| Steal: "already stolen" flag (0x08) | City marked after first steal, making subsequent steals harder | Not tracked | **Gap** |
| AI mission selection logic | Complex priority: steal > poison > incite > sabotage with difficulty/treaty modifiers | Not in espionage.js (AI logic separate) | **Structural** — handled elsewhere |
| Counter-espionage experience formula | Base + difficulty table + rand()%6 | Simple flag set | **Gap** — binary has numeric strength |
| Spy vs diplomat menu restrictions | Spies get poison/nuke/specific options; diplomats don't | checkSpySurvival differentiates type 46 vs 47 | **Partial match** |
| Incite: Communism distance cap | Target govt communism: dist capped at 10 | **Matches** (line 288) | **Match** |
| Incite: courthouse effect | Courthouse (building 7) halves distance | **Matches** (line 291-293) | **Match** |
| Incite: original owner discount | cost /= 2 if originalOwner == spy.owner | **Matches** (line 312-313) | **Match** |
| Bribe: government cap check | Binary checks BRIBER's government for communism/republic cap | JS comment says "TARGET's government" but code checks `target.owner` — **contradicts itself** | **Possible bug** — comment says briber, code says target |

### Spy Survival Formula Comparison

**Binary (FUN_004c5fae):**
```
if diplomat (type 46): always consumed
if spy (type 47):
  base = 2 (success) or 3 (caught = successLevel < 0 means +1)
  if veteran: base *= 2
  if hard mission (successLevel > 0): base /= 2
  if base < 2 AND rand()%2: base++
  if base <= 1: consumed
  roll = rand() % base
  if roll != 0: survives + becomes veteran
```

**JS (checkSpySurvival, lines 131-166):**
```js
let survivalOdds = (successLevel < 0 ? 1 : 0) + 2;
if (veteran) survivalOdds *= 2;
if (successLevel > 0) survivalOdds = floor(survivalOdds / 2);
if (survivalOdds < 2 && coinFlip) survivalOdds++;
if (survivalOdds <= 1) return { survives: false };
const roll = rng.nextInt(survivalOdds);
return { survives: roll !== 0, becomesVeteran: roll !== 0 };
```

**Verdict**: **Match**. The formula is faithfully ported.

---

## 6. handle_city_capture — FUN_0057b5df (11451B) — Diplomatic Consequences

### Binary Behavior (diplomatic consequences only)

The full city capture function is in `citycapture.js`, but diplomatic
consequences are handled within it:

1. **Nuclear attack flag**: During nuclear capture, sets flags:
   - `treatyFlags[capturerCiv][defenderCiv] |= 0x110` (NUKE_AWARENESS + VENDETTA)
   - `treatyFlags[defenderCiv][capturerCiv] |= 0x20000` (NUCLEAR_ATTACK)
   - `adjust_attitude(defenderCiv, capturerCiv, 100)` — maximum hatred

2. **City capture vendetta**: When any city is captured, the binary sets
   CAPTURE_VENDETTA (0x1000) on `treatyFlags[defenderCiv][capturerCiv]`.

3. **Alliance obligations**: If the defender has allies, those allies should
   enter war with the capturer (via FUN_0045a8e3).

4. **Civil war check**: If the captured city is the capital (has Palace),
   triggers civil war evaluation (FUN_0057a904) which may split the
   defending civ into two.

### JS Implementation

**citycapture.js** handles the mechanical aspects (building destruction,
partisan spawning, civil war) but **does not directly handle diplomatic
consequences**. There is:
- `import { killCiv } from './diplomacy.js'` — used if defender loses all cities.
- No explicit calls to declareWar, adjustAttitude, or setTreatyFlags for
  capture vendetta.
- No nuclear capture attitude/flag handling.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| CAPTURE_VENDETTA (0x1000) | Set on defender toward capturer | **NOT IMPLEMENTED** in citycapture.js | **Major gap** |
| Nuclear capture flags | 0x110 + 0x20000 + attitude 100 | **NOT IMPLEMENTED** | **Major gap** |
| Alliance obligation on capture | Allies of defender join war against capturer | Not triggered from capture (only from declareWar) | **Gap** — depends on whether war was already declared before capture |
| Civil war split | FUN_0057a904 splits civ, new civ gets cities + units, new diplomatic relationships | handleCivilWar in citycapture.js exists | **Partial match** — needs verification |

---

## 7. Treaty Hierarchy

### Binary Treaty Flags (32-bit word per directional pair)

```
Bit 0 (0x01):   CONTACT
Bit 1 (0x02):   CEASEFIRE
Bit 2 (0x04):   PEACE
Bit 3 (0x08):   ALLIANCE
Bit 4 (0x10):   VENDETTA
Bit 5 (0x20):   INTRUDER (shared intelligence)
Bit 6 (0x40):   HOSTILITY
Bit 7 (0x80):   EMBASSY
Bit 8 (0x100):  NUKE_AWARENESS / SPACESHIP_LAUNCHED
Bit 10 (0x400): PERIODIC_10
Bit 11 (0x800): WAR_STARTED
Bit 12 (0x1000): CAPTURE_VENDETTA
Bit 13 (0x2000): WAR
Bit 14 (0x4000): RECENT_CONTACT
Bit 16 (0x10000): CAPTURE_NOTIFY
Bit 17 (0x20000): NUCLEAR_ATTACK
Bit 18 (0x40000): TRIBUTE_DEMANDED
Bit 19 (0x80000): PERIODIC_FLAG_19
Bit 21 (0x200000): WAR_TRACKING
Bit 22 (0x400000): MULTI_CAPTURE_VENDETTA
Bit 23 (0x800000): DIPLOMACY_ACTIVE
Bit 24 (0x1000000): SPY_MISSION_ACTIVE
```

### JS Treaty Flags (TF constants, diplomacy.js lines 30-54)

**All 24 flags are defined in JS**. The hierarchy is faithfully represented.

**Flag cascade rules (addTreatyFlag, lines 170-209):**
- ALLIANCE: also set PEACE + CONTACT
- PEACE: also set CONTACT, clear WAR/WAR_STARTED/HOSTILITY/INTRUDER
- CEASEFIRE: also set CONTACT, clear WAR/WAR_STARTED/HOSTILITY/INTRUDER
- WAR: clear CEASEFIRE/PEACE/ALLIANCE, set WAR_TRACKING

**Verdict**: **Match**. The treaty hierarchy and cascade rules are faithfully
ported.

---

## 8. Alliance War Cascade

### Binary (FUN_0045a8e3, 910B)

When `civA` declares war on `civB`, iterates all other civs (1-7):
- For each `ally` that is ALLIED with `civA` AND has CONTACT with `civB`
  AND is NOT already at war/ceasefire (flag & 0x2008 == 0):
  - If `civB` is human: displays `ACTIVATEALLY` message, sends MP notification.
  - If `civA` is human: displays `ALLYHELPS` message.
  - Adjusts attitude: `adjust_attitude(ally, civB, 100)` — maximum hatred.
  - Sets WAR flags: `treatyFlags[ally][civB] |= 0x2401` (WAR + PERIODIC_10 + CONTACT).
  - Sets betrayal flags: `treatyFlags[ally][civB] |= 0x80800` (WAR_STARTED + PERIODIC_FLAG_19).
  - Records contact turn.

### JS (activateAllianceWars, lines 1382-1443)

- Iterates civs 1-7: must be allied with civA, have contact with civB,
  not already at war or ceasefire.
- Sets treaty to 'war'.
- Adjusts attitude: -50 (not -100 as in binary).
- Records provoked/attacked flags.
- Recursive cascade check (binary doesn't do this — it's a single pass).

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Attitude penalty | +100 (binary max hatred) | -50 | **DISCREPANCY** — JS is less punitive |
| WAR_STARTED flag | Explicitly set (0x800) | Set via addTreatyFlag cascade | **Match** |
| Recursive cascade | Single pass (no recursion) | Recursive with processed-set guard | **JS enhancement** — binary doesn't recurse |
| MP notification | Sends event 0x38/0x39 via FUN_00511880 | Events pushed to turnEvents array | **Structural match** |

---

## 9. Attitude Calculation — Full 15-Phase Formula

### Binary (FUN_0045705e, 6616B — called from FUN_0045a535)

FUN_0045705e is the giant negotiation evaluation function. It computes
multiple variables including attitude score, tech exchange desirability,
and military comparison.

### JS (calcAttitudeScore, lines 2113-2238)

The JS implementation has a well-documented 15-phase formula with 29
modifiers:

| Phase | Content | Match? |
|-------|---------|--------|
| 2 | techRankCount, warCount, allianceStrength | **Match** |
| 3 | Alliance: treasury, tech, military comparisons | **Match** |
| 4 | Treaty status: ceasefire -2, non-alliance -1 | **Match** |
| 5 | Late-game power rank penalties | **Match** |
| 6 | Spaceship penalties | **Match** |
| 7-8 | Personality (expansionism*3 + militarism*2) + power differential | **Match** |
| 9 | Military power stacking (4x, 2x, 1.5x inferior) | **Match** |
| 10 | Peaceful strength bonus | **Match** |
| 11 | Great Wall/UN (wonder 6/24), Eiffel Tower (wonder 20) | **Match** |
| 12 | Tech leader bonus | **Match** |
| 13 | Tech count vs tolerance | **Match** |
| 14 | Alliance floor (clamp to 0 minimum) | **Match** |
| 15 | No-contact reset | **Match** |

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Full negotiation leverage evaluation | FUN_0045705e evaluates 63 techs for exchange desirability, compares military, treasury | calcAttitudeScore computes attitude only, not negotiation leverage | **Gap** — binary computes more in the same function |
| Attitude brackets | Used in FUN_00456f8b: <25→3, <60→2, >60→1, peace+1, alliance+2, intruder→2 | getAttitudeLevel uses 9 brackets (0-8) | **Different scale** — binary uses 1-8, JS uses 0-8 |
| LEADER_PERSONALITY lookup | Reads from personality table per civ rulesCivNumber | Uses LEADER_PERSONALITY[rulesCivNum] || [0,0,0] | **Match** |

---

## 10. Senate Restrictions (Democracy)

### Binary

- Democracy (govt 6): Senate can block war declarations.
- Republic (govt 5): Senate sometimes blocks.
- `FUN_0055bef9`: betrayal check uses patience counter * 15 + vendetta
  bonus + UN wonder bonus, compared against AI aggressiveness seed.
- Senate override toggle: random per turn, affects whether senate can be
  overridden.

### JS

- `shouldBetrayTreaty` (lines 2676-2716): Ported from FUN_0055bef9.
  Government check, patience * 15 + vendetta (25) + UN (50) threshold.
- Senate override toggle in `processDiplomacyTimers` (lines 643-659):
  1/3 chance per turn for republic/democracy civs.
- Espionage incident scandal: Democracy always triggers revolution,
  Republic 50% chance (lines 474-485).

**Verdict**: **Match** — senate restrictions are faithfully ported.

---

## 11. Shared Research / Tech Trading

### Binary

- FUN_0045705e (alliance evaluation): scans 63 techs to find tradeable ones.
  For each tech where `targetRank > 1` AND `targetHasTech < spyHasTech`:
  accumulates desire score weighted by tech epoch.
- Tech price: FUN_004591cb — techValue * 20, attitude scaling, difficulty
  multiplier, epoch scaling, treasury scaling, alliance discount.

### JS

- `calcTechSellPrice` (lines 2732-2774): techValue * 20, attitude > 50
  scaling, common-tech discount, treasury scaling, alliance discount.
- `calcTechPrice` (lines 2862-2893): Similar but with difficulty multiplier
  and epoch scaling.
- `wouldEnableWonder` (lines 2625-2649): Blocks trades that enable enemy
  wonder construction.
- Tech transfer via `executeTransaction` → `transferTechs`.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Tech desire score | 63-tech scan with weighted epoch scoring | Not implemented (AI handles separately) | **Structural** |
| Wonder-blocking trade check | Not clearly in FUN_004591cb | wouldEnableWonder implemented | **JS enhancement** |
| Two pricing functions | Single FUN_004591cb | Two functions: calcTechSellPrice + calcTechPrice | **Minor** — JS has redundancy |

---

## 12. Map Sharing

### Binary

- `FUN_004dd8ad`: shares map visibility from one civ to another.
  Iterates all tiles, sets visibility bit. Also shares sight radius
  around units and cities.

### JS

- `shareMaps` (lines 1828-1863): Iterates all tiles, sets visibility bit.
  Also shares sight radius around units (updateVisibility) and cities
  (radius 2).

**Verdict**: **Match**.

---

## 13. Gold/Unit/City Transfer

### Binary (FUN_004dd285 / FUN_004de0e2)

- Gold: direct treasury transfer, attitude bonus via FUN_0045b472
  (diminishing returns).
- Units: change owner, rehome to nearest city.
- Cities: change owner, destroy Palace/Temple/Courthouse/Cathedral,
  transfer garrison, update tile ownership.

### JS

- `transferGold` (lines 1624-1656): Treasury transfer + goldToAttitude
  (diminishing returns × 3/2). **Matches**.
- `transferUnits` (lines 1741-1825): Change owner, rehome, terrain
  compatibility check, stack splitting. **Enhanced** over binary.
- `transferCity` (lines 1886-2045): Change owner, destroy
  Palace/Temple/Courthouse/Cathedral (same set), transfer garrison,
  update tile ownership, handle wonders, palace relocation.
  **Matches** with enhancements.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Gold attitude formula | FUN_0045b472: first 50g/10, then 100g/(10+5n) | goldToAttitude × 3/2 | **Match** (with gift multiplier) |
| Buildings removed on transfer | Palace(1), Temple(4), Courthouse(7) + Barracks(2) in binary | Palace(1), Barracks(2), Temple(4), Courthouse(7) | **Match** |
| Unit terrain compatibility | Not checked (units stay put) | findCompatibleTile spiral search | **JS enhancement** |
| Stack splitting | Not handled | Explicit prevInStack/nextInStack update | **JS enhancement** |
| Palace relocation | Binary relocates to largest remaining city | Same (lines 2019-2034) | **Match** |

---

## 14. Embassy Effects

### Binary

- Embassy flag (0x80): set on `treatyFlags[targetCiv][spyCiv]`.
- Having embassy enables: intelligence viewing, diplomatic contact initiation,
  spy menu options.
- Embassy can be "expelled" by setting VENDETTA (0x10) which blocks the
  embassy's intelligence benefits.

### JS

- Embassy stored in `state.embassies` dictionary (separate from treatyFlags).
- `canViewIntelligence` (espionage.js lines 41-60): checks Espionage tech,
  Writing tech, or embassy flag.
- Embassy establishment via `establishEmbassy` mission.

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Embassy storage | Bit 0x80 in treatyFlags | Separate embassies dictionary | **Structural** — different storage, same semantics |
| Embassy expulsion | VENDETTA (0x10) blocks embassy | VENDETTA clearing in applyGovernmentChangeEffects | **Partial** — vendetta clears on govt change but not explicitly tied to embassy |
| Intelligence gating | Embassy OR Espionage tech | Embassy OR Espionage(27) OR Writing(88) | **Close match** — JS adds Writing tech |

---

## 15. Counter-Espionage

### Binary (case 7 in FUN_004c6bf5)

- Spy is stationed at a city for surveillance duty.
- Experience/strength formula:
  ```
  base = 5 (diplomat) or 10 (spy)
  difficultyBonus = lookup[difficulty + 9]  // table: [0,0,0,0,1,2,2,3,4,5,4,3,2,1,0]
  veteranBonus = 2 (if veteran spy with flag 0x2000)
  strength = base + difficultyBonus + rand()%6
  ```
- Deducts from attacker's counter-espionage strength table.
- Sets target city ID and mission flag (0x02) on unit.

### JS (counterEspionage, lines 1067-1096)

- Sets `counterEspionage: true` flag on city.
- Spy is consumed (set to gx=-1).

### Discrepancies

| Feature | Binary | JS | Gap |
|---------|--------|----|-----|
| Numeric strength | Calculated from base + difficulty + veteran + rand | Boolean flag only | **Major gap** — binary has graduated effectiveness |
| Spy persistence | Spy remains alive, stationed at city with special orders | Spy is consumed | **Major gap** — binary keeps spy alive for ongoing protection |
| Strength vs attacker | Deducts from attacker's counter-espionage table | No interaction with detection mechanics | **Major gap** |
| Detection bonus | Counter-espionage spy adds to city's detection chances | Not implemented | **Major gap** |

---

## Summary: Overall Fidelity Assessment

### Well-Matched (90%+)
- Treaty hierarchy and flag cascade rules
- Attitude calculation (15-phase formula)
- Spy survival formula
- Incite revolt cost formula (including all modifiers)
- Bribe cost formula
- Senate restrictions and betrayal checks
- Map sharing mechanics
- Gold/tech/city/unit transfer mechanics
- Ceasefire expiration and periodic flag clearing
- Reputation system (JS enhancement, no binary equivalent)

### Partial Match (60-80%)
- War declaration cascade — correct structure but different attitude deltas
- Alliance formation — correct but missing negotiation leverage evaluation
- Embassy mechanics — same concept, different storage
- AI mission selection — handled in separate AI module

### Major Gaps
1. **Plant Nuclear Device mission** — not implemented at all
2. **Sabotage building destruction** — only resets shields, doesn't destroy buildings
3. **Counter-espionage strength system** — boolean flag instead of numeric strength
4. **Capture vendetta flags** — not set on city capture
5. **Auto-alliance with common enemy** — binary proactively seeks, JS doesn't
6. **Auto-alliance break** — binary breaks strained alliances automatically
7. **Nuclear capture diplomatic flags** — not implemented
8. **Specific steal/sabotage targeting** — not implemented
9. **"Already stolen" tracking per city** — not tracked

### JS Enhancements (Not in Binary)
1. Reputation system with decay
2. Witness penalty (all contacted civs penalized on war declaration)
3. Recursive alliance war cascade
4. Unit terrain compatibility on transfer
5. Stack splitting on unit transfer
6. Wonder-blocking trade check
